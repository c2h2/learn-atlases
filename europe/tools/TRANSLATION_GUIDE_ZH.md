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

## House headings and fixed sentences

`## Exercises` → `## 习题`; `## Where this leads` → `## 通向何处`. The invented-sentence lead is
verbatim 「下面这句话为示例而虚构。它不是史料。」 wherever the English marks an invented example.
Quotes in prose are curly “…” (balanced per file); straight ASCII `"` only inside `check="…"`
and structural widget lines.

## Verification battery (every lesson, every overlay)

    # 1. exact line count + blank-line positions vs en (diff must be empty)
    # 2. punctuation, BOTH directions (forward grep alone misses digit/Latin between: 711,得)
    grep -Pn '[\x{4e00}-\x{9fff}][,;:!?]' f.md   # and reverse: '[,;:!?][\x{4e00}-\x{9fff}]'
    #    exempt only ^\s*(events|labels|points|nodes|edges|series|expr|ylabel|…): lines —
    #    those keep ASCII delimiters and their labels stay comma-free
    # 3. stranded English (space-flanked words slip adjacency checks):
    grep -Pn '[\x{4e00}-\x{9fff}] [a-zA-Z]{2,}|[a-zA-Z]{2,} [\x{4e00}-\x{9fff}]' f.md
    #    legal only in （glosses）, *italics*, [[links]], {#anchors}, :::block headers, check=, widgets
    # 4. per-year numeral reconciliation — en must equal zh per year:
    grep -oP '(?<!\d)[12]\d{3}(?!\d)' f.md | sort | uniq -c        # run on en and zh, diff
    #    do NOT use \b — GNU grep treats CJK as word characters, so 公元1804年 never matches
    #    Dropped years and added years are both defects (see the years rule above).
    # 5. overlay JSON: value-level scan of decoded strings (raw-file grep false-positives on
    #    JSON structural ASCII); people byte-identical; lengths index-aligned.

## Check

    cd /home/c2h2/learn/europe
    php tools/check.php <course>          # both languages once the zh lessons exist
    node tools/build.js --quiet --lang=zh <course>

0 errors and 0 warnings from the checker is the gate for a finished course (the en side is
already clean). For the BUILD, zh must reproduce the English baseline exactly — en itself has
word-check exercises the expression parser rejects (greece 3, reformations 2, wars 1 at
genocide.md, christendom 1); zero-error courses must build at zero.

## Style review rules (2026-11-03)

A review of the first complete zh pass found accurate but calqued prose. These rules apply to all
new and revised zh text:

- **Years:** write four-digit years without 公元 (1534年, 1789–1848年). Keep 公元 only for
  years below 1000 (公元476年, 公元800年) and always write 公元前 for BCE.
- **No article calques:** drop 一个/一部/一种/那个 where English "a/the" carries no counting
  sense ("一部法令不是一个堂区的日记" → "法令不等于堂区的日记").
- **诸 is not a plural marker.** Leave plurals unmarked, or use 各、历次、这些、多个. Keep
  genuine words (诸侯、诸神). Titles: 希腊世界, 罗马世界, 宗教改革, 革命时代, 国家与帝国.
- **Terms:** genocide 种族灭绝 (legal names keep 灭绝种族罪, 《防止及惩治灭绝种族罪公约》);
  English Reformation "settlement" 宗教安排, never 解决方案; Reformed (church) 改革宗;
  partitions of Poland 历次瓜分; public "argument" about Europe 争论 (the atlas's own
  claim/argument pair stays 论断/论证).
- Join choppy sentences and break 它……它…… chains the way a Chinese editor would, within the
  same line, without changing any fact or hedge.
