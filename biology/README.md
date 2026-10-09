# Biology Atlas

A detailed, interactive course through university biology — from molecules and cells to genetics
and genomics, microbes, plants and animals, the brain and behaviour, evolution, ecology and the
quantitative tools of modern biology — in English and Simplified Chinese, on the same engine as
[Maths Atlas](../maths/). Plain PHP, no framework and no database.

**Status: curriculum skeleton.** All 21 courses and 187 chapters are defined, with chapter titles,
summaries and prerequisites. Course overviews, outcomes, history and references, the lessons
themselves, the timeline, the Chinese translation and biology-specific figures are still to be
written; chapters without a lesson show as "to be written". Every lesson is written by hand to the
standard in `tools/CONTENT_GUIDE.md` — never generated from a template or a script.

| Year | Courses |
|---|---|
| Year 1 | Cell Biology, Biochemistry and Metabolism, Principles of Genetics, Evolutionary Biology, The Diversity of Life, Biostatistics and Experimental Design |
| Year 2 | Molecular Biology of the Gene, Microbiology, Plant Biology, Animal Physiology, Ecology, Population and Quantitative Genetics |
| Year 3 | Developmental Biology, Neuroscience, Animal Behaviour, Genomics and Epigenomics, Structural Biology, Bioinformatics, Conservation Biology |
| Year 4 | Systems and Mathematical Biology, Biotechnology and Synthetic Biology |

Areas: molecules and cells, genetics and genomics, organisms, brain and behaviour, evolution and
diversity, ecology and environment, and quantitative biology.

Human anatomy, medical physiology, immunology, pathology and clinical microbiology belong to
[Medicine Atlas](../medicine/); this atlas stays organismal, comparative and evolutionary, and
gives no medical advice.

## Writing it

- Lessons and course records: `tools/CONTENT_GUIDE.md` (depth targets, accuracy, notation, and the
  biosafety and no-medical-advice rules for content agents).
- Figures: `tools/WIDGET_GUIDE.md` (API, conventions, and the plan for biology figures such as
  Punnett squares, pedigrees, genetic drift, enzyme kinetics, population models, membrane
  potentials, sequence alignment and phylogenetic trees).
- Chinese: `tools/TRANSLATION_GUIDE_ZH.md` (markup rules, typography, species and gene names, and
  biology terminology).

```sh
bash tools/check.sh [--lang=en|zh] [course …]   # typeset, validate and report depth
tools/build.sh                                  # full build and cache warm-up
node tools/labcheck.js [--lessons] [--zh]       # load figures and report errors
```

`tools/check.php` lists every missing lesson and empty course field as a warning: its output is the
to-do list.
