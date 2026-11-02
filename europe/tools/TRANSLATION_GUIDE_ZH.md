# European History Atlas — Chinese translation guide (简体中文)

Translation layout follows `../../economics/tools/TRANSLATION_GUIDE_ZH.md` (typography contract:
full-width punctuation, half-width digits, no spaces between CJK and formulas/numbers), plus the
rules in this file. Where the two conflict, this file governs — the economics guide was written for
a finance atlas and some of its habits (a notice sentence appended to `summary`, Latin-only widget
labels) do **not** apply here.

## What the engine already translates

`inc/lang/zh.php` carries the site strings, the atlas notice, and the block display names:
`:::theorem` prints **论断** (Claim), `:::proof` prints **论证** (Argument), `:::warning` → 注意,
`:::quiz` → 小测验, `:::summary` → 小结, `:::history` → 历史注记, etc. Do not add any notice
sentence to the zh `course.json` overlay — the atlas notice ("本图谱是供学习的历史，不是民族神话…")
is rendered by the theme, not by the course record. This differs from the quant atlas.

## course.json overlay

`content/zh/<course>/course.json` carries translatable values only, index-aligned with the English:
`title`, `full_title`, `tagline`, `summary`, `overview[]`, `outcomes[]`,
`chapters[{title,summary}]`, `history[{title,detail,people}]`, `references[{note}]`.
Never write `year`, `slug`, `requires`, `order`, `area`, `level` into the overlay — the merge
(`inc/i18n.php::overlay()`) keeps them from the English record. `people` stays Latin.

## Lesson body

- Mirror the English exactly: same blocks, same `{#anchor}`s, same `{level=…}` and `check="…"`
  values, same `[[…]]` links, same blank-line structure (mirrored doubled blanks included) — the
  zh file must have the **exact same `wc -l`** as the en file.
- Years: keep every numeral exactly as printed. In prose render BCE as 公元前 and CE as 公元
  (公元前490年, 公元476年). The timeline widget prints negative years as BC; the lesson text says
  BCE — keep that asymmetry. Never add a year the English lesson does not print.
- Vocabulary for the atlas's own words: claim → 论断, argument → 论证, evidence → 证据,
  (historical) source → 史料, primary/secondary source → 一手/二手史料, period label → 时代标签,
  chronology → 年表. `myth` is polysemous: a false belief the chapter debunks → 迷思; Greek or
  other traditional myths → 神话. Choose by sense, never mechanically.
- There is no year 0: keep the English's arithmetic and its explanation (1 BCE → 1 CE;
  elapsed A + B − 1) exactly.
- No literal `$` in prose (this is not a finance text); money stays in words (里夫尔, 英镑).
- Violence, slavery and genocide stay in the flat register of the English: who had power, what the
  sources show, what is still argued. No added colour, no euphemistic softening.
- Hedge for hedge: "historians disagree", "the chronology says", "Many" must not be strengthened
  or dropped. Where the English says a date is disputed, the Chinese must say it too.

## Widgets

Translate display text only: `caption:` values, timeline event labels after the comma
(`800,加冕`), `labels:` on venn, `ylabel:` on series. Keep verbatim: keys, `type`, `algorithm`,
`expr`, every year, every number, every `points:`/`events:` numeral.

## Names

Personal and place names: established Chinese rendering with the Latin in parentheses on first
mention in a lesson — 亚里士多德（Aristotle）, 凡尔登（Verdun）. Follow the standard
《世界人名翻译大辞典》 forms where they exist. Translated book titles keep the original in
parentheses; journal and series titles stay Latin. Latin technical phrases (res publica, SPQR)
may keep Latin with a Chinese gloss on first use.

## Check

    cd /home/c2h2/learn/europe
    php tools/check.php <course>          # both languages once the zh lessons exist

0 errors and 0 warnings is the gate for a finished course (the en side is already clean).
