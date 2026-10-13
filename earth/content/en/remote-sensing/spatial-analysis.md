Everything previous produced surfaces: classifications, indices, elevations, temperatures. This chapter is about extracting meaning from them — combining layers, summarising regions, estimating values where nothing was measured, and testing whether the patterns that emerge are real. Spatial analysis has one law and several curses. The law, from Tobler in 1970, is that everything is related to everything else but near things are more related than distant things; the curses follow from it — autocorrelation that inflates significance, aggregation choices that manufacture correlations, and interpolation that launders guesses into maps. Learning to see through the curses is the difference between a spatial analyst and a person who runs tools.

::: definition Map algebra, overlay and neighbourhood {#def-map-algebra}
**Map algebra**, formalised in the 1960s at the Harvard Laboratory for Computer Graphics and Spatial Analysis in the line of the Odyssey system and given its modern textbook form by Dana Tomlin in 1990, treats rasters as matrices and maps as functions: pixelwise arithmetic and logic (the NDVI difference of two dates), **local** operators combining co-located pixels of several layers (suitability scoring), **focal** operators that slide a window over a surface (3 by 3 mean filters, slope from a 3 by 3 neighbourhood, distance transforms), **zonal** operators that summarise one raster over regions defined by another (mean rainfall per watershed, pixel counts per land-cover class), and **regional** operators treating the whole map as one zone. The **D8 flow-direction** cascade — accumulate drainage, extract channels, delineate basins — is a focal-network operator so fundamental that it underlies most hydrological use of elevation, and its variants (D-infinity, multiple-flow) exist because a single downhill direction is a crude model of a curved surface. Overlay, the union and intersection of thematic layers, is the same machinery for vectors, with the topology lessons of the previous chapter deciding whether the result is clean or full of slivers. The engineering rule: every operator propagates its inputs' errors, and a chain of five careless operations manufactures a map whose uncertainty nobody can account for — keep the algebra shallow and the error terms visible. {#def-map-algebra}

:::
::: definition Interpolation: estimating unsampled places {#def-interpolation}
Interpolation fills a surface from scattered samples — temperature from stations, concentration from wells, elevation from soundings. **Deterministic** methods impose geometry: nearest neighbour, bilinear and bicubic resampling on regular grids, and **inverse distance weighting** (Donald Shepard's 1968 formulation, standard in the Harvard Laboratory's systems), where the estimate is a distance-weighted mean with weights proportional to distance to the minus p — sharp near samples, flat between them, and guaranteed to pass through every sample. **Geostatistical** methods start from a model of spatial covariance: the **variogram** plots half the squared difference between sample pairs against their separation, revealing a **nugget** (measurement noise plus sub-sample variation), a **sill** (the total variance) and a **range** (the distance beyond which samples are uncorrelated). **Kriging**, developed by Danie Krige for Transvaal gold grades in the 1950s and formalised by Georges Matheron in the 1960s, then solves for the weights that give the best linear unbiased estimate under that variogram — and, uniquely, returns an **estimation variance** at every predicted location, so the map carries its own uncertainty sheet. Ordinary kriging assumes an unknown constant mean; kriging with external drift or universal kriging lets covariates (elevation, distance to coast) carry the trend, which is how rainfall atlases are actually made (see [[hydrology/precipitation-evaporation]]). The curses: interpolation between samples is only as good as the sampling design; extrapolating beyond the sample hull is fiction with a colour ramp; and the smoothness of the estimated surface systematically underestimates the variance of extremes — a kriged rainfall map will never show the storm cell that the network missed. {#def-interpolation}

:::
::: definition Spatial autocorrelation and pattern statistics {#def-autocorrelation}
Are the mapped patterns real? **Spatial autocorrelation** — the degree to which neighbouring values resemble each other — is summarised by **Moran's I**, introduced by Patrick Moran in 1950 out of Wishart's lattice statistics and the analysis of agricultural field trials, and carried into geography by Peter Haggett's generation and into spatial statistics by Arthur Getis and J. K. Ord: I near +1 means clustering of similar values, near the expectation of minus one over n minus one means randomness, and negative values mean checkerboard regularity. **Getis-Ord** statistics answer the complementary question, locating hot spots rather than measuring global tendency, and **LISA** (Anselin's 1995 local indicators) decompose the global index into per-location contributions so that maps can show where clustering lives. **Ripley's K** and pair-correlation functions do the same for point patterns — earthquake epicentres, tree stems, crater inventories — testing clustering against complete spatial randomness across scales. **Geographically weighted regression** fits local regressions whose coefficients vary across the map, the statistical sibling of the thematic map. The curses come with the tools: **pseudoreplication** — treating autocorrelated samples as independent inflates significance, and the effective sample size can be a fraction of the count; the **ecological fallacy** — correlations of aggregated areal data need not hold for individuals; and the **modifiable areal unit problem** (named by Stanley Openshaw in 1984) — results change with the zoning, so a correlation that appears only at district scale is a property of the districts as much as of the world. The discipline: report the effective sample size, test sensitivity to aggregation, and never read a p-value from spatial data without a variogram or a spatial-regression check in the appendix (the statistics are developed further in [[climate-system/climate-statistics]]). {#def-autocorrelation}

:::
::: example Difference of NDVI: the simplest change map {#ex-ndvi-diff}
Two dry-season NDVI scenes, five years apart, subtracted pixel for pixel: the map shows the irrigated perimeter of a lake's shrinkage in negative values and the new canal command area in positive ones. It takes one line of code and it is wrong in four known ways. The dates differ in phenology — the "change" includes a late monsoon, not a land-use decision — so change should be measured on same-season composites, not single scenes (see [[remote-sensing/image-processing]]). The atmospheres differ — a thin haze depresses the red-band reflectance and mints fake browning, which is why surface reflectance and not radiance is the difference's input. The pixels misregister by half a pixel — edge pixels of fields light up in the difference regardless of what happened in the fields — so sub-pixel co-registration comes before subtraction. And the difference's noise grows as the sum of the two scenes' noise: the speckle-like texture along field boundaries is the error budget of the operation, and thresholds on the difference must exceed it, which is precisely the minimum-detectable-change logic of the classification chapter. The example generalises: every map-algebra expression is an error-propagation statement whether the author writes one or not. {#ex-ndvi-diff}

:::
::: example Zonal statistics: the mean that lies three ways {#ex-zonal}
"Mean population-weighted night-time light intensity per district" looks like one tool call. The first trap is the **areal weighting problem**: district boundaries cut through pixels, and a naive mean over pixel centres weights a district's few full pixels the same as a boundary pixel's sliver of a city — the fix is area-weighted zonal statistics or, better, dasymetric resampling of the coarse data onto a common fine grid before any zone touches it. The second trap is **NoData**: masked cloud pixels inside a mountain watershed silently drop out of most tools' means, so the "mean elevation of the basin" becomes the mean of the cloud-free parts — always count the valid pixels and report the coverage fraction beside every zonal number. The third trap is the **change of zones**: the 2014 district boundaries do not summarise the 2009 census, and a decade of district splits turns a time series into a comparison of different geographies — the areal-unit cousin of the station-siting artefact in climate trend analysis. The professional pattern: standardise everything to one grid, one zone vintage and one mask policy before computing, and let the summary table carry the coverage statistics that qualify it. {#ex-zonal}

:::
::: example A rainfall atlas: IDW versus the orography {#ex-rainfall-atlas}
A meteorological service drafts its normal-period rainfall atlas from 120 stations in a country with a 2000-metre coastal range. Inverse distance weighting produces concentric bull's-eyes around the mountaintop station and flat plains elsewhere — geometrically correct, physically absurd, because rain follows the relief and the relief is not in the distance weights. Ordinary kriging does better, honouring the variogram's range so that influence fades by 40 kilometres, but it still cannot see the mountain: its trend assumption is a flat unknown mean. Kriging with external drift, using a digital elevation model as the covariate with a signed altitude coefficient fitted from the stations themselves, moves the high-rainfall contour onto the windward slope where the clouds actually break — and its estimation-variance surface honestly shows the leeward interior as three times as uncertain as the instrumented coast. This is the standard recipe of mountain rainfall climatology, and its failure mode is instructive: when a service publishes only the estimate layer and not the variance layer, downstream hydrological models treat the extrapolated desert as measured fact, and the water-resource allocations built on it inherit the fiction. {#ex-rainfall-atlas}

:::
::: example The regression that found significance everywhere {#ex-spatial-regression}
A study regresses childhood asthma rates on traffic density across 300 census tracts and reports R-squared of 0.6 with every coefficient significant at the first per cent. An ecological fallacy on top of an autocorrelation fallacy on top of a zoning fallacy, all before the discussion section. Asthma is diagnosed in individuals; tracts average families, and the tract-level slope need not equal — here plainly does not equal — the individual one. Traffic density and asthma both cluster spatially, so the residuals are autocorrelated: a variogram of the residuals shows structure to 2 kilometres, the effective sample size is a fraction of 300, and the true standard errors are double the reported ones. And the tract boundaries are administrative: re-aggregate the same data to municipalities and the coefficient moves by a third — pure modifiable-areal-unit effect. The defensible version of the study exists and is boring: individual-level data where possible, a spatial-error or spatial-lag model fitted to the residuals' variogram, sensitivity analysis across two or three zonings, and conclusions phrased at the level the data can carry. The published version is the one that gets cited in the news; the defensible version is the one that does not mislead the next health survey, which is the audience that matters. {#ex-spatial-regression}

:::
::: history From overlay to spatial statistics {#history-spatial-analysis}
The lineage runs from manual overlay to the analysis cube. Ian McHarg's planning ecology in the 1960s — the Design with Nature method of transparent thematic overlays — and the Harvard Laboratory for Computer Graphics and Spatial Analysis, whose SYMAP mapping program around 1960 and Odyssey GIS of the late 1960s automated the overlay and taught a generation that maps are data, is the founding story. The 1970s brought the quantitative revolution's statistical apparatus into geography — Cliff and Ord's spatial autocorrelation theory, Tobler's first law and his diffusion models, the first national rainfall kriging experiments in South Africa after Krige and Matheron's mining-statistics synthesis of the 1950s and 1960s — while the remote-sensing community built the digital classification and image-enhancement machinery at Purdue, Michigan and Goddard that this book's earlier chapters trace. The 1980s standardised the toolkit: Tomlin's map algebra, Anselin's spatial econometrics software, the explosion of geographic information systems science at Santa Barbara, and the modifiable-areal-unit and ecological-fallacy critiques that matured the statistical caution. The 1990s and 2000s were the era of the raster: ArcInfo and then ArcGIS made focal and zonal operators a menu item, the raster calculator democratised map algebra, and LiDAR and IfSAR elevation put geomorphometric analysis — flow accumulation, curvature, wetness indices — into routine use across the earth sciences (see [[geomorphology/drainage-basins]]). The 2010s and 2020s returned the analysis to the statistics: spatial and spatiotemporal models with explicit error structure, open-source stacks from GeoPandas to Google Earth Engine making planet-scale focal and zonal work ordinary, and the reproducibility movement insisting that the analysis script, not the colourful output, is the publication. {#history-spatial-analysis}

:::
::: widget plot {#wd-variogram}
f: 1.5*x - 0.5*x*x*x
x: 0, 1.4
y: 0, 1.2
labels: Separation h / range, Semivariance / sill
caption: The spherical variogram model: semivariance rises with sample separation to the range, then flattens at the sill. Below the range, pairs are correlated and interpolation pays; beyond it, a distant sample adds nothing to the estimate.
:::

::: quiz {#quiz-kriging-variance}
What does kriging provide that inverse distance weighting cannot?
- [ ] A surface that passes through every sample point
- [x] An estimation variance from a fitted covariance model
- [ ] A sharper surface around high values
- [ ] Automatic handling of trends in the data

::: solution
Both interpolate through the samples; only kriging's model-based weights come with an estimation variance at every location — the uncertainty sheet that makes the map usable for decisions. IDW has no error model at all, and neither method handles trends without an explicit drift term.
:::
:::

::: quiz {#quiz-maup}
A correlation between two variables computed on 500 small zones vanishes when the same data are aggregated to 50 large zones. This is best diagnosed as:
- [ ] A computation error in one of the two runs
- [x] The modifiable areal unit problem — correlation is a property of the zoning as well as the data
- [ ] Evidence that the small-zone result was fabricated
- [ ] Sampling noise that aggregation always removes

::: solution
The modifiable areal unit problem: aggregate values and their covariation depend on how zones are drawn, so results can legitimately change with scale and boundary. Both runs can be arithmetically correct; the honest report shows both and discusses what the zoning assumes.
:::
:::

::: exercise {level=1 check="9"}
How many cells does a 3 by 3 focal window read on each placement, counting the centre cell? {#ex-window-cells}

::: solution
Nine: eight neighbours plus the centre — the Moore neighbourhood plus itself, which is why 3 by 3 filters, slope kernels and the D8 parent-cell choice all revolve around this one geometry. {#ex-window-cells}
:::
:::
::: exercise {level=1 check="25"}
A zone covers four pixels of a temperature raster with values 20, 22, 26 and 32. What is the unweighted zonal mean in degrees Celsius? {#ex-zonal-mean}

::: solution
(20 + 22 + 26 + 32) / 4 = 100 / 4 = 25. Note what the unweighted mean assumes: every pixel centre counts equally, which is wrong if the zone boundary cuts pixels — the area-weighted mean would weight partial pixels by their covered fraction. {#ex-zonal-mean}
:::
:::
::: exercise {level=1 check="5"}
Two raster cells are separated by 3 columns and 4 rows of 10 m pixels. What is their Euclidean distance in metres? {#ex-euclid}

::: solution
The cell offset is 30 by 40 m, so the distance is the 3-4-5 triangle scaled: 50 m. The same Pythagorean step underlies distance transforms, the distance term in inverse distance weighting and the pair separations in a variogram. {#ex-euclid}
:::
:::

::: exercise {level=2 check="0.8"}
Predict a point by inverse distance weighting with power 2 from two samples: 40 millimetres of rain at 100 m and 20 millimetres at 200 m. What weight (as a decimal) does the nearer sample receive? {#ex-idw-weight}

::: solution
Weights are proportional to distance to the minus 2: w1 = 1/10000, w2 = 1/40000; normalising, w1 = (1/10000) / (1/10000 + 1/40000) = 4/5 = 0.8. The estimate is then 0.8 times 40 plus 0.2 times 20 = 36 millimetres — closer to the near sample, as the method promises, with no statement whatsoever about how wrong it might be. {#ex-idw-weight}
:::
:::
::: exercise {level=2 check="-0.01"}
Moran's I for a random field of n = 101 locations has expectation -1/(n-1). What is that expectation? {#ex-moran-ei}

::: solution
-1/100 = -0.01. Observed values far above zero indicate clustering of similar values, far below indicates regular spacing, and the neighbourhood of -0.01 is the randomness benchmark — which is why reporting I without its expectation and variance under a stated null model is decoration, not inference. {#ex-moran-ei}
:::
:::
::: exercise {level=2 check="0.2"}
NDVI falls from 0.65 to 0.45 between two same-season composites over a 5000-hectare plot. Report the difference (as a positive magnitude) and the hectares of loss if the change is uniform. {#ex-ndvi-change}

::: solution
The difference is 0.2 NDVI units over the whole 5000 hectares if uniform — but uniformity is exactly what a difference map tests: the per-pixel histogram of the difference separates a genuine partial dieback from a boundary-shift artefact, and only the spatial pattern tells the two stories apart. {#ex-ndvi-change}
:::
:::

::: exercise {level=3 check="0.75"}
A variogram has nugget 0.2, partial sill 0.8 and range 500 m. Using the spherical model gamma(h) = c0 + c times (1.5 times h/range - 0.5 times (h/range) cubed), what is the semivariance at 250 m? {#ex-variogram}

::: solution
h/range = 0.5, so the bracket is 1.5 times 0.5 minus 0.5 times 0.125 = 0.75 minus 0.0625 = 0.6875; gamma = 0.2 + 0.8 times 0.6875 = 0.2 + 0.55 = 0.75. Half the sill-plus-nugget structure is already spent at half the range — the practical reading is that samples 250 m apart still share most of their information, and kriging will lean on them hard. {#ex-variogram}
:::
:::
::: exercise {level=3 check="33.3"}
One hundred soil samples have a spatial-autocorrelation coefficient (lag-1 variogram-based proxy) of rho = 0.5, giving effective sample size n times (1 - rho) / (1 + rho). What is the effective n to one decimal place? {#ex-eff-n}

::: solution
100 times 0.5 / 1.5 = 33.3. Standard errors computed as if the samples were independent are too small by roughly the square root of 100/33.3, about a factor of 1.7 — the arithmetic behind the pseudoreplication warning, and the reason variograms belong in the appendix of every field-survey paper. {#ex-eff-n}
:::
:::
::: exercise {level=3 check="20"}
A 30 m digital elevation model drops 12 m between the centres of cells two columns apart. What is the percent slope between them? {#ex-slope-pct}

::: solution
The horizontal run is 2 times 30 = 60 m; slope percent = 100 times rise over run = 100 times 12 / 60 = 20 per cent, about 11 degrees. The same two-cell logic, applied over the full 3 by 3 neighbourhood with the Horn kernel, is what the slope and aspect tools actually compute — and its sensitivity to elevation noise is why LiDAR-derived slope maps look smoother than stereo-derived ones at the same grid spacing. {#ex-slope-pct}
:::
:::

::: warning Four analytical fallacies {#warning-spatial-analysis}
**"The map shows..." — it shows the pipeline.** Every surface is the residue of correction, resampling, compositing and interpolation choices; the smooth gradient on the rainfall map is the variogram's, not the atmosphere's, and the sharp irrigation boundary is the co-registration's. State the chain or the map says nothing. **"More samples mean better estimates."** Under autocorrelation, the hundredth soil core 20 metres from the ninety-ninth adds almost no information; design for spacing against the variogram's range, and report effective sample size, not sample count. **"Significant means real."** Spatial p-values assume away the correlation that made the map interesting; without a spatial-error model or a permutation test on the actual pattern, significance is an artefact of the zoning that produced the numbers. **"Aggregation hides the noise."** It manufactures new signal: correlations appear and vanish with the boundaries (the modifiable areal unit problem), and the ecological fallacy waits for whoever forgets that district averages describe no actual district-dweller — a caution that carries over to every areal statistic in applied earth science (compare [[climate-system/climate-statistics]]). {#warning-spatial-analysis}
:::

::: summary {#summary-spatial-analysis}
Map algebra turns surfaces into a calculational language — local, focal, zonal and regional operators — in which every expression is also an error-propagation statement. Interpolation estimates unsampled places from Tobler's law: inverse distance weighting for geometry's honest blunt work, kriging when a fitted variogram can carry both the estimate and its variance, and covariate drift when the physics (relief, distance to coast) is known. Pattern statistics — Moran's I, Getis-Ord, Ripley's K, local decomposition — test whether mapped structure exceeds randomness, while the curses of spatial statistics (pseudoreplication, the ecological fallacy, the modifiable areal unit problem) decide whether the test means anything. The craft is one notch humbler than the toolbox: state the pipeline, honour the variogram, qualify the zoning, and publish the variance layer beside the estimate, because a surface without its uncertainty is not an analysis but an opinion with a colour ramp. {#summary-spatial-analysis}
:::
