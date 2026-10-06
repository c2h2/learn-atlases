# LLM Atlas

A detailed, interactive course on large language models — how they work, how they are trained and
used, and how to make them safe — in English and Simplified Chinese, on the same engine as
[Maths Atlas](../maths/). Plain PHP, no framework and no database.

**Status: curriculum skeleton.** All 18 courses and 137 chapters are defined, with chapter summaries
and prerequisites. Lessons, course overviews, outcomes, history, references, the timeline and
LLM-specific figures are still to be written; missing chapters show as "in preparation".

| Stage | Courses |
|---|---|
| Foundations | Mathematics for Machine Learning, Machine Learning Fundamentals, Neural Networks, Text and Language |
| Core | Sequence Models, The Transformer, Pretraining, Prompting and Retrieval, Language Models and Society |
| Advanced | Scaling, Post-training, Reasoning, Inference, Agents, Multimodal Models, Evaluation |
| Frontier | Interpretability, AI Safety |

Areas: maths and ML foundations, language modelling, pretraining and scaling, post-training and
reasoning, inference and systems, applications, and evaluation, safety and society.

## Writing it

- Lessons and course records: `tools/CONTENT_GUIDE.md` (depth targets, accuracy and neutrality rules, notation).
- Figures: `tools/WIDGET_GUIDE.md` (API, conventions, and the plan for LLM figures such as a
  tokeniser, sampling, attention maps and a small network playground).
- Chinese: `tools/TRANSLATION_GUIDE_ZH.md` (markup rules, typography, mathematics and LLM terminology).

```sh
bash tools/check.sh [--lang=en|zh] [course …]   # typeset, validate and report depth
tools/build.sh                                  # full build and cache warm-up
node tools/labcheck.js [--lessons] [--zh]       # load figures and report errors
```

`tools/check.php` lists every missing lesson and empty course field as a warning: its output is the
to-do list.
