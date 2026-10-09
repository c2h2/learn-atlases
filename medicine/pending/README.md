# pending — generated filler, kept out of the site

Everything in this tree is **machine-generated placeholder text** from the original curriculum
skeleton ("The heart, and the one that the blood is for, is the one that the limit is for…"). It is
not a draft, contains no facts, and was being served to readers, so it has been removed from
`content/`. `tools/check.php` recognises the same patterns and rejects them as `ERROR … generated
filler`, so it cannot creep back.

Layout mirrors the site:

```
pending/en/<course>/<chapter>.md      lesson to be written by hand (tools/CONTENT_GUIDE.md)
pending/zh/<course>/<chapter>.md      its Chinese translation (tools/TRANSLATION_GUIDE_ZH.md)
pending/zh/<course>/course.json       Chinese course overlay
pending/tools/*.py                    the generators that produced the Chinese filler — retired;
                                      Chinese is now translated by hand, never generated
```

Nothing here is referenced by the engine. Do **not** copy text out of these files: when a lesson is
written, the file simply stops existing here. To see the old skeleton for a chapter (its heading
list is the only part with any information), look at `pending/en/<course>/<chapter>.md`.

Progress: `php tools/check.php` — every remaining `warn … lesson not written yet` and every
`warn … add at least 3 history events` is a piece of this directory still to be replaced by writing.
