# Figures

Two types belong to this atlas. Both are implemented in `assets/js/widgets/europe.js` and listed in `data/widgets-local.json`. `tools/mkatlas.py` merges that file into `data/widgets.json`. Do not edit `data/widgets.json` by hand.

`timeline` draws the events the lesson lists. `series` draws the year–value points the lesson lists. Neither invents a year or a value. Negative years are BCE. The integer 0 is not a historical year: the readout says that the year after 1 BCE is 1 CE, and the distance across that gap is computed without a year 0 (from year A BCE to year B CE the elapsed count is A + B − 1).

Also available, from the shared engine: `plot`, `distribution`, `graph`, `venn`. A `distribution` in this atlas is a sketch of a range of estimates. The caption must say it is not a census. Do not add a figure type, and do not name one `limit`.

Captions say what to move (the year, the window, a node) and what to notice.
