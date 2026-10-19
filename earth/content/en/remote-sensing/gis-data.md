A classification map is not information until someone can find it, open it, trust it and analyse it. The previous chapters produced maps; this chapter is about the containers — the data models, formats, databases and standards that turn a classified raster or a digitised field boundary into something a colleague in another country, another software and another decade can actually use. The history of GIS is partly a history of formats: the coverage and the shapefile, the geodatabase and the GeoPackage, the Web Map Service and the cloud-native array. Each generation was a bet about who would hold the data, how it would be updated and what "the current version" means. The current bet — cloud object storage, JSON metadata and chunked arrays — is the most consequential since the 1990s, and this chapter gives the reasoning to place that bet well rather than by fashion.

::: definition Vector data models: geometry, attributes, topology {#def-vector-model}
A **vector** dataset represents the world as discrete geometric objects: points (a gauge), lines (a river, a road), polygons (a field, a flood extent). Each geometry carries **attributes** — a table row of typed fields — and the pair is stored in one of two philosophies. The **spaghetti** model stores each polygon's coordinates independently; overlays between layers create tiny sliver polygons from digitising differences, and "which polygons touch" requires expensive coordinate comparison. The **topological** model stores nodes, arcs and polygons explicitly with adjacency tables — the ESRI coverage of 1982 and the TIN of the same era — so that shared boundaries are stored once, gaps and overlaps are impossible by construction, and network traversal (river routing, utility tracing) is natural; the price is a harder editing workflow. **Simple Features** (ISO 19125, OpenGIS 1999) made a pragmatic compromise for interchange: geometries as coordinate sequences with well-defined predicates (intersects, contains, within) evaluated computationally, topology asserted when needed rather than stored always. The 2020s analytics stack adds a columnar twist: **GeoParquet** keeps Simple Features geometries in encoded columnar form so that a query can read the bounding-box statistics of a million polygons without touching the geometries themselves — the spatial index becomes a file format feature. Geometry **validity** is a first-class concern: self-intersecting polygons, interior rings outside exteriors and duplicate consecutive vertices are common in real data and silently break area, buffering and overlay; validity checks and repair (make-valid operations) are a standard pipeline stage, and the OGC Simple Features validity rules are the usual contract. {#def-vector-model}

:::
::: definition Topology, validity and spatial indexing {#def-topology-index}
Three properties decide whether vector data is usable. **Topological consistency**: shared boundaries stored once, no gaps or overlaps between neighbouring polygons, no dangling or double-node lines — the cadastral requirement since the 1980s and the reason survey-grade datasets still ship as topological models. **Geometric validity**: polygons whose rings close, do not self-intersect and contain their holes; validity is decidable per geometry and repairable automatically, but repair changes coordinates, so the rule is to validate on ingest and record what was repaired. **Spatial indexing**: the R-tree and its variants — the GIST and GIN index types of PostGIS, the hierarchical and quadtree grids of raster catalogs — organise geometries by minimum bounding rectangle so that "which of ten million parcels touch this line" costs a few hundred rectangle tests instead of ten million polygon intersections. The index answers the bounding-box question; the exact predicate runs only on the handful of candidates it returns. Two operational rules follow: every spatial column gets an index, and every query that filters by geometry is written so the index can be used — a bounding-box predicate first, the expensive exact test second. An unindexed spatial join over a national parcel layer is the difference between a query that finishes and one that never does. {#def-topology-index}

:::
::: definition Raster data: stacks, arrays and analysis-ready access {#def-raster-access}
Raster data organisation runs from the single file to the service. The classic **Band Interleaved by Pixel** versus **Band Interleaved by Line** versus **Band Sequential** choices in GeoTIFF decide which reads are fast: analysis that uses all bands of one scene wants pixel interleave; a time series of one band across scenes wants each scene's band contiguous, or better, a **Virtual Raster** (VRT) XML that stitches scenes and subsets bands without copying bytes. The **Cloud Optimised GeoTIFF (COG)** standardises the internal layout — 8-bit-aligned tiles, overviews as internal pyramids, a well-ordered tag block — so that any HTTP client can request exactly the byte ranges of the tiles it needs: a 30-metre window from a 10-gigabyte scene costs one short request instead of downloading the scene. **Zarr and netCDF** serve the array world: chunked N-dimensional arrays in object storage with per-chunk compression, the native form of climate models and of the datacube platforms, with **xarray** as the de-facto client. **STAC** (SpatioTemporal Asset Catalog) supplies the missing card catalogue: JSON items describing each scene's footprint, date, instruments and links, indexed so that "all Sentinel-2 scenes under 20 per cent cloud over this basin in 2024" is a query, not a directory walk. **Analysis-Ready Earth Observation (ARD)** closes the loop: products pre-corrected to surface reflectance, co-registered and cloud-masked, plus **cloud-free composites** (median or percentile mosaics over a season) so that analysis reads observations, not raw orbits. The 2020s platform trinity — STAC for discovery, COG or Zarr for access, server-side computation (batch processors, user-defined functions at the data) — is how the Landsat and Sentinel archives, the planetary computer programmes and the commercial archives converged. {#def-raster-access}

:::
::: example Choosing a format: GeoPackage, GeoParquet, PostGIS {#ex-formats}
The format decision reduces to a short honest summary. **GeoPackage** for desktop editing and offline fieldwork: one SQLite file, no size ceiling, proper types and indexes — the pragmatic default when someone must edit on a phone in a forest. **GeoParquet** for analytics: columnar compression and bounding-box statistics, read by a dataframe without loading the geometries — the 2021-onward default of the Python stack. **PostGIS** as the system of record: concurrent editors, referential integrity, transactional versioned editing and spatial SQL — the only correct answer when several people update the same layer this afternoon. **GeoJSON** for web transport, with its precision and size caveats, and plain CSV with latitude and longitude columns as the universal donor for point data. The **Shapefile** — 63-character field names, a 2-gigabyte ceiling, Latin-1 assumptions — survives only as an interchange format, as its own ecosystem's maintainers now advise; the 2020s saw statistical agencies and cadastral services publish formal deprecation notices. The decision rule: pick by the workflow's bottleneck — editing, analytics or sharing — never by habit, and always record the coordinate reference system and the validity status alongside the file. {#ex-formats}

:::
::: example Slivers: when two classifications disagree about a boundary {#ex-slivers}
Two flood-extent mappings of the same event — one radar-derived, one field-surveyed — differ by metres along their edges. Union them without care and the overlay produces hundreds of sliver polygons: thin, elongated fragments with areas of tens of square metres and perimeters of hundreds. A naive area summary reports the union as 12 per cent larger than either input, and a change map reports 12 per cent of the floodplain as newly flooded. The diagnosis is geometric: slivers have extreme perimeter-to-area ratios, far outside the shape statistics of real polygons. The remedies, in order of preference: snap the inputs to a common grid before overlay (a tolerance of half the positional uncertainty), use topology-aware overlay that collapses slivers below a threshold area, or carry both boundaries as a fuzzy zone and never force a single line. The reporting rule: any polygon layer entering a statistical pipeline gets a shape audit first — area distribution, perimeter-to-area outliers, duplicate and near-duplicate geometries — because a sliver in a summary table is invisible and wrong in exactly the way that matters. {#ex-slivers}

:::
::: example Spatial SQL: the query that replaced the script {#ex-sql}
The question: how many health clinics lie within 5 kilometres of a mapped 100-year flood extent, by district? The scripted approach downloads both layers, loops over clinics in Python, and re-runs monthly as the clinic registry updates. The database approach keeps both layers in PostGIS with spatial indexes and asks once: a join on ST_DWithin between clinic points and the flood polygon, grouped by district, executing in seconds over a national registry because the R-tree prunes to a handful of candidates per clinic. The SQL also states its own assumptions — the distance is geodesic (geography cast, not planar metres on the wrong projection, per [[remote-sensing/maps-projections]]), the flood layer is the current version, and the registry's timestamp is recorded in the result. The general lesson from three decades of GIS scripting: analysis that runs where the data lives is faster, fresher and auditable; the spatial database is not a fancy file cabinet but the place where the question gets asked. The 2020s extension is the same argument in the cloud: server-side functions evaluating STAC queries against object storage, with the data never moving. {#ex-sql}

:::
::: example Budgeting an analysis-ready archive {#ex-ard-budget}
A national forestry service plans a yearly monitoring system on Sentinel-2 ARD: 2500 scenes per year covering the territory, each 10980 by 10980 pixels in 13 bands at 16 bits, kept as COG with per-scene cloud masks. Raw volume is about 3 gigabytes per scene — 1.2e8 pixels times 13 bands times 2 bytes — roughly 8 terabytes per year uncompressed; cloud-optimised compression (deflate or Zstd on reflectance data) brings it to 3 to 4 terabytes, and a hot-plus-archive tier split is affordable in the public cloud — a far cry from the tape-library procurement the same calculation implied in 2010, when this volume demanded a dedicated storage project. The budget that matters, though, is the access pattern: a province-level monthly greenness compositing job reads about 40 per cent of each scene's pixels; with COG range requests the same job over HTTP costs cents per run, whereas a design that downloads whole scenes pays for 2500 full transfers monthly whether it needs the pixels or not. The architecture lesson generalises: in the array era, the cost driver is the mismatch between the chunk layout and the read pattern — design chunks to match the window you actually query, the same rule that governed tape blocking in 1975, now priced per request. {#ex-ard-budget}

:::
::: history From core systems to the open-data cube {#history-gis-data}
The first geographic information systems were core systems of the 1960s: the Canada Geographic Information System built for the Canada Land Inventory from 1963, Roger Tomlinson's core-system architecture with its layered themes and scan-based topology, and the Harvard Structural Analysis Group experiments that coined the term "cartographic computing" and produced SYMAP, POLYVRT and the Odyssey prototypes. The 1970s saw the first commercial systems and the first national digital cadastral efforts; the 1980s brought ESRI's coverage and ARC/INFO, the Cornell LISC and GRID lineage, and the USGS Digital Line Graphs and Digital Elevation Models that made "national spatial data" a standing government function. The 1990s were the decade of standards and the web: the Open Geospatial Consortium founded in 1994, Simple Features adopted as ISO 19125, the NCGIA and then UCSB's Spatial Analysis Research Center formalising spatial statistics, the US Federal Geographic Data Committee and the National Spatial Data Infrastructure framework of 1994, MapServer from 1995 and the WMS specification of 2000 putting maps on browsers, and the shapefile — an accidental 1998 interchange format from an unpublished ArcExport internal structure — becoming the most-used and most-criticised container in the field. OpenStreetMap founded in 2004 proved volunteered geographic information; PostGIS, first released in 2001, put the same data into spatial SQL. The 2010s moved the stack to the cloud: Amazon's Public Dataset program hosting Landsat from 2015, Microsoft's Planetary Computer and the Spatiotemporal Asset Catalog specifications from 2018, Cloud Optimised GeoTIFF and Zarr becoming the access defaults, xarray and the Open Data Cube making analysis-ready arrays the programming model, and GeoParquet from 2021 joining the analytics layer. The 2020s debates are governance-shaped: the European Union's revision of its geospatial-data legislation, the OGC's efforts to standardise the cloud-native stack, and the question of whether foundation models consuming open Earth-observation archives shift the balance between the agencies that hold the data and the platforms that hold the compute. {#history-gis-data}

:::
::: widget plot {#wd-index-scaling}
f: log2(x)
x: 1, 1000000
y: 0, 20
labels: Number of records, Comparisons (log2)
caption: Indexed spatial search grows as the logarithm of the record count: a million-row parcel table needs roughly twenty bounding-box tests per query instead of a million — the reason every spatial column is indexed and every spatial query is written index-first.
:::

::: quiz {#quiz-topology-storage}
In a topological vector model, a boundary shared by two parcels is stored:
- [ ] Once per polygon, as duplicate coordinate lists
- [x] Once, as an arc referenced by both polygons
- [ ] Only in the attribute table
- [ ] In the raster grid

::: solution
Once, as an arc referenced by both polygons — which is exactly why gaps and overlaps are impossible by construction in a topological model, and why coordinate-duplication (spaghetti) layers can hide slivers between "adjacent" polygons.
:::
:::

::: quiz {#quiz-ard-value}
The core practical value of analysis-ready, cloud-hosted imagery (ARD with STAC and COG or Zarr access) is that:
- [ ] It improves the spatial resolution of the sensors
- [x] Analyses read corrected observations directly, with discovery by query and partial reads, instead of downloading and pre-processing whole scenes
- [ ] It removes the need for cloud masks
- [ ] It guarantees identical values across all sensors

::: solution
The value is workflow, not physics: pre-correction plus machine-readable discovery plus byte-range access collapses the pipeline between archive and answer. Cloud masks still exist (they are part of ARD), cross-sensor harmonisation is a separate problem, and resolution is whatever the sensor delivered.
:::
:::

::: exercise {level=1 check="3"}
Name the three files that together form the minimum readable Shapefile set, and state what each holds. {#ex-shp-trio}

::: solution
The .shp file (geometry), the .shx file (shape index) and the .dbf file (attribute table). Practically a fourth, the .prj sidecar carrying the coordinate reference system, is mandatory in real work because a shapefile without one is a spatial ambiguity, and .cpg records the text encoding — but the minimum readable trio is three files. {#ex-shp-trio}
:::
:::
::: exercise {level=1 check="1000000"}
A raster covers a 10 km by 10 km area at 10 m resolution. How many pixels does it contain? {#ex-pixel-count}

::: solution
10 km is 10000 m, so each side is 10000 / 10 = 1000 pixels: 1000 by 1000 = 1000000 pixels, one million. {#ex-pixel-count}
:::
:::
::: exercise {level=1 check="18"}
What is the uncompressed size in megabytes of a single-band 16-bit raster of 3000 by 3000 pixels? {#ex-file-size}

::: solution
3000 by 3000 is 9e6 pixels at 2 bytes each: 18e6 bytes, about 18 megabytes (using 1 MB = 1e6 bytes; about 17 MiB). {#ex-file-size}
:::
:::

::: exercise {level=2 check="20"}
An R-tree index over one million records needs on the order of log2(N) bounding-box tests per query. How many is that for N = 1000000? {#ex-rtree-log}

::: solution
log2(1000000) is about 20 — twenty rectangle tests instead of a million, which is the whole argument for indexing spatial columns. {#ex-rtree-log}
:::
:::
::: exercise {level=2 check="100000000"}
Two point layers each hold 10000 points. A brute-force nearest-neighbour join evaluates every pair. How many distance computations does that require, and why does the indexed version avoid it? {#ex-brute-force}

::: solution
10000 times 10000 = 100000000, one hundred million pairs. With an R-tree on one layer, each query point probes the index, retrieves a handful of bounding-box candidates, and computes a handful of exact distances — about 10000 times twenty tests instead of the full product. {#ex-brute-force}
:::
:::
::: exercise {level=2 check="111"}
How many 30 m by 30 m pixels are needed to cover a 10-hectare fire perimeter, to the nearest whole pixel? {#ex-pixels-for-ha}

::: solution
10 hectares is 100000 square metres; each pixel is 900 square metres; 100000 / 900 = 111.1, so about 111 pixels — which is why 30 m sensors map fire perimeters of this size with only just enough pixels to measure them, and why burn-scars below a few hectares carry large area uncertainty at this resolution. {#ex-pixels-for-ha}
:::
:::

::: exercise {level=3 check="0.5"}
An overlay sliver is 4 m wide and 10 km long (a thin rectangle). Compute its perimeter-to-area ratio in units of per metre. {#ex-sliver-shape}

::: solution
Perimeter = 2 times (4 + 10000) = 20008 m; area = 4 times 10000 = 40000 square metres; ratio = 20008 / 40000 = 0.5 per metre. A compact square of the same area has perimeter 4 times 200 = 800 m and a ratio of 0.02 — a 25-fold difference, which is why the perimeter-to-area statistic is an effective sliver detector. {#ex-sliver-shape}
:::
:::
::: exercise {level=3 check="10"}
The same sliver in the previous exercise is 5 m wide and 20 km long. What is its area in hectares? {#ex-sliver-area}

::: solution
5 m times 20000 m = 100000 square metres = 10 hectares. Ten hectares of phantom area appears in every summary of the overlay unless the slivers are detected and collapsed — comparable to the real field it fakes at the edge of the map. {#ex-sliver-area}
:::
:::
::: exercise {level=3 check="6.4"}
A decade archive holds 20000 scenes of 800 MB each. Compression on the archived format achieves a factor of 0.4 of raw size. What is the archived volume in terabytes (1 TB = 1e12 bytes)? {#ex-archive-tb}

::: solution
20000 times 800e6 bytes = 1.6e13 bytes = 16 TB raw; times 0.4 = 6.4 TB archived. Affordable as object storage at 2020s prices; the same calculation in 2010 justified a multi-year infrastructure programme, which is the economic history of why open archives happened when they did. {#ex-archive-tb}
:::
:::

::: warning Four data fallacies {#warning-gis-data}
**"The file I opened is the data."** It is a container with unstated assumptions: the projection may be missing or wrong, the encoding may have mangled place-names, the validity of the geometries is unknown and the version is whoever exported it last. Sidecar files and metadata exist to carry these assumptions; a dataset without them is a rumour. **"An index makes queries fast."** An index makes the bounding-box filter fast; a query that applies its expensive predicate before the index can be engaged, or that selects most of the table anyway, still crawls — plan before optimising. **"Cloud-native means free."** Object storage makes bytes cheap to keep and expensive to misuse: egress fees, request charges and naive full-scene downloads are the new tape mounts, and a pipeline's request pattern is now part of its design review. **"A standard format guarantees interoperability."** Formats interoperate; semantics do not. Two datasets in identical GeoPackage form can disagree on datum, on class definitions, on what "flood extent" includes at the edges — the previous chapters' uncertainty and ontology lessons reappear as schema reviews, and the most valuable metadata field is often the definition of the classes themselves. {#warning-gis-data}
:::

::: summary {#summary-gis-data}
Vector data stores objects with geometry and attributes; topology decides whether shared boundaries are stored once and whether slivers are possible, and validity and spatial indexes are the practical price of usable vector data. Raster data has converged on cloud-native organisation — COG and Zarr for byte-range access, STAC for discovery, ARD and composites for analysis-ready content — with the same old rule that chunk layout must match the read pattern. Formats are workflow choices: GeoPackage for editing, GeoParquet for analytics, PostGIS as the system of record, and legacy containers only where interchange demands. Spatial SQL moves the question to the data, which is faster, fresher and auditable. And underneath all of it the governance questions — who curates, who versions, who publishes, under what licence and with what class definitions — decide whether a spatial data infrastructure serves its users or decorates its servers. {#summary-gis-data}
:::
