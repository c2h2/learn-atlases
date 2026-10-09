# Earth & Climate Atlas

A detailed, interactive course through university Earth and climate science — minerals, rocks and
plate tectonics, landscapes and water, the atmosphere and weather, the oceans and ice, Earth history
and the cycles of the elements, and the climate system, past and present — in English and
Simplified Chinese, on the same engine as [Maths Atlas](../maths/). Plain PHP, no framework and no
database.

**Status: curriculum skeleton.** All 24 courses and 216 chapters are defined, with taglines,
summaries, chapter summaries and prerequisites. Lessons, course overviews, outcomes, history,
references, the timeline, the Chinese course overlays and Earth- and climate-specific figures are
still to be written; missing chapters show as "to be written". The site title says "(skeleton)"
while `MA_SKELETON` in `inc/bootstrap.php` is `true`.

| Year | Courses |
|---|---|
| 1 | The Earth System, Physical Geology, Earth History, Meteorology |
| 2 | Mineralogy and Petrology, Structural Geology, Sedimentology, Geomorphology, Atmospheric Dynamics, Oceanography, Geochemistry, Remote Sensing and GIS |
| 3 | Geophysics, Hydrology, Glaciology, Atmospheric Chemistry, The Climate System, Palaeoclimate, Biogeochemistry, Natural Hazards |
| 4 | Climate Modelling, Climate Change, Earth Resources, Planetary Science |

Areas: Earth system and methods, solid Earth, surface processes and water, atmosphere and weather,
oceans and ice, climate, and Earth history and life. The map (`map.php`) suggests five pathways:
geology, climate science, water and environment, geophysics and planets, and oceans and ice.

Climate lessons follow the assessed literature (IPCC and the primary datasets) with dated
observations and stated uncertainty ranges, and keep physical science separate from policy choices;
hazard lessons are for education and never replace official warnings.

## Writing it

- Lessons and course records: `tools/CONTENT_GUIDE.md` (depth targets, climate-science and hazard
  rules, units and notation). Every lesson is written by hand; a chapter that is not written stays
  "to be written".
- Figures: `tools/WIDGET_GUIDE.md` (API, conventions, and the plan for Earth and climate figures
  such as an energy-balance model, greenhouse layers, the Keeling curve, insolation and orbital
  cycles, plate motion, seismic rays, radiometric decay, groundwater flow and a world map).
- Chinese: `tools/TRANSLATION_GUIDE_ZH.md` (markup rules, typography, mathematics and Earth and
  climate terminology).

```sh
bash tools/check.sh [--lang=en|zh] [course …]   # typeset, validate and report depth
tools/build.sh                                  # full build and cache warm-up
node tools/labcheck.js [--lessons] [--zh]       # load figures and report errors
```

`tools/check.php` lists every missing lesson and empty course field as a warning: its output is the
to-do list.
