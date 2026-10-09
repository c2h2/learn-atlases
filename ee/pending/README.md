# pending — generated filler, kept out of the site

Everything in this tree is **machine-generated placeholder text** that stood in for lessons and
course records until 2026-10-09. The lessons keep real formulas and the block structure, but the
prose around them is generated nonsense ("The DFT, and the one that the N point is for, is the N
sample…"). The course records mix the same phrasing with invented details: wrong dates, people and
books. It was being served to readers, so it has been removed from `content/`. `tools/check.php`
recognises the phrasing and rejects it as `ERROR … generated filler`, so it cannot creep back.

Layout mirrors the site:

```
pending/en/<course>/<chapter>.md      lesson to be written by hand (tools/CONTENT_GUIDE.md)
pending/en/<course>/course.json       the generated course record
```

Nothing here is referenced by the engine. Do **not** copy text out of these files. The formulas and
section headings may help as an outline, but every sentence, date, name and reference has to be
written and checked afresh. When a lesson is written, delete its file here.

The generator also rewrote parts of the curriculum. Semiconductor Devices became "SEMI" with new
chapter slugs, Digital Logic moved to year 2 and required DSP, and orders and prerequisites changed
elsewhere. `content/` has the original curriculum again, so the files in
`pending/en/semiconductor-devices/` are named after chapters that no longer exist.

Still in `content/`: all of Circuit Analysis I, and the course record and first two lessons of
Circuit Analysis II, which read as written by hand. Their history and references were corrected on
2026-10-09. They have not been reviewed in depth.

Progress: `php tools/check.php`. Each `warn … lesson not written yet` is a file here still to be
replaced by writing.
