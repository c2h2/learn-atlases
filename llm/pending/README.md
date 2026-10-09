# pending — generated placeholders, kept out of the site

Everything in this tree is **machine-generated placeholder text** that stood in for the LLM Atlas
lessons until 2026-10-09. It contains no checked facts and was being served to readers, so it has
been removed from `content/`:

- **130 lessons** built from a term list per chapter: definitions of a few terms, stock examples,
  and quizzes and exercises with no answers, 16–831 words each.
- **The seven Reasoning lessons**, about 3,000 words each. They are an anatomy lesson with its nouns
  swapped, and read as nonsense ("The chain of thought, and the one that the scratchpad is for, is
  the one that the limit is for…").
- **`en/<course>/course.json`**: the generated course records. Seventeen nest an overview, outcomes,
  history and references inside the `overview` field; Reasoning's is in the nonsense style.
  `content/` has the curriculum back as it was before the generator ran.
- **`tools/`**: the scripts and term lists that produced them, retired. Each script stops at its
  first line.

Layout mirrors the site:

```
pending/en/<course>/<chapter>.md      lesson to be written by hand (tools/CONTENT_GUIDE.md)
pending/en/<course>/course.json       the generated course record
pending/tools/                        the retired generators
```

Nothing here is referenced by the engine. Do **not** copy text out of these files. `tools/check.php`
recognises both kinds of placeholder and rejects them as `ERROR … generated filler`, so they cannot
creep back. When a lesson is written, delete its file here.

Progress: `php tools/check.php`. Each `warn … lesson not written yet` is a file here still to be
replaced by writing.
