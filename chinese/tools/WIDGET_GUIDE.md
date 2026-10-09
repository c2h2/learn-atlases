# Chinese Atlas — interactive figure guide

Figures are small JavaScript programs that turn a `::: widget <type>` block in a lesson into an
interactive diagram. Lessons are written by other people against the **catalogue**
`data/widgets.json`: every type, its keys, their types and defaults. Implement each type exactly as
catalogued; it is the contract.

Reference implementations: `plot`, `riemann`, `taylor` in `assets/js/widgets/calculus.js`. Read them
and `assets/js/plot.js` before writing anything. The engine and figure files are copied from Maths
Atlas; this atlas's catalogue keeps the 7 types useful here (below). Figures of our own still have to
be built — see the plan at the end.

**The engine copy is generated.** `python3 tools/mkatlas.py tools/atlas-specs/chinese.json` (run from
the repository root) copies the Maths Atlas engine into this directory again and rewrites
`data/widgets.json` (the maths catalogue filtered to the spec's `widgets`), the Lab groups in `lab.php`
(from the spec's `lab_groups`) and `inc/lang/zh-figures.php`. New files of our own, such as
`assets/js/widgets/script.js`, survive a refresh; edits to copied files do not. Fixes to shared code go
into `/learn/maths/` (or the generator), never into the copies here.

## Files and loading

- `assets/js/core.js` — `MA` namespace: `MA.el` (DOM/SVG builder), `MA.t` (translation), `MA.fmt`
  (number formatting), `MA.tex(el, tex)` / `MA.texEl(tex)` (KaTeX), `MA.isDark()`, `MA.cssVar(name)`,
  `MA.tip` (tooltip).
- `assets/js/expr.js` — expression language (`MA.expr.parse`, `compile`, `value`). Also runs in node
  for validation.
- `assets/js/plot.js` — `MA.widget(type, factory)` registry, `MA.cfg` parsers, `MA.Plot` (SVG
  plotting), `MA.ui` (controls), `MA.num` (numerics, seeded rng), `MA.anim` (animation loop).
- `assets/js/widgets/<file>.js` — one file per group, named by the catalogue's `file` field. A lesson
  page loads only the files whose types it uses. Wrap each file in an IIFE like calculus.js and
  register with `MA.widget('type', (stage, cfg, ctx) => { … })`.

## The factory

```js
MA.widget('pingze', (stage, cfg, ctx) => {
  // stage: empty <div> inside <figure class="widget">; append your drawing, controls, info rows
  // cfg: {key: "string"} exactly as written by the author (all values are strings)
  // ctx: {fig, id}
});
```

- Parse every value with `MA.cfg`: `num`, `int`, `bool`, `range`, `list`, `points`, `sliders`,
  `expr(src, vars)`, `str`, `has`. Apply catalogue defaults when a key is absent.
- Throw `new Error('readable message')` for bad input; the framework shows it inside the figure.
- Optional `cfg.title` → `MA.ui.title(stage, cfg.title)`. `caption` is handled by the page.
- **Chinese text in a figure's settings is data**: a character, a poem, a sentence to analyse. Never
  pass it through `MA.t`; it appears unchanged on English pages, where the interface around it is in
  English.

## Drawing with MA.Plot

```js
const P = new MA.Plot(stage, { x: [0, 1], y: [1, 5], equal: false, width: 640, height: 400 });
P.fn(x => 5, { color: 'var(--series-1)' });   P.path(points, opts);   P.poly(points, opts);
P.line(x1, y1, x2, y2, opts);  P.rect(x, y, w, h, opts);  P.dot(x, y, { r, hollow });  P.text(x, y, '字', { anchor: 'middle' });
const h = P.handle(x, y, { constrain: (x, y) => [x, y], onDrag: (x, y) => redraw() });   // draggable, keyboard-accessible
P.onHover((x, y) => ...);  P.onClick((x, y) => ...);  const read = P.readout();  P.clear();  P.setView([x0, x1], [y0, y1]);
```

Options: `color`, `width`, `dash`, `opacity`, `fill`, `fillOpacity`, `layer` (`fill` < `curves` <
`marks` < `labels` < `top`). Default view box 640×400. Most figures here are diagrams rather than
plots (a character grid, a tree, a timeline, a poem with marks beside each character): draw them as
SVG with `MA.el`, or on an `MA.Plot` with hidden axes. Text-heavy figures (a passage with glosses, a
sentence with its constituents marked) are HTML with spans, not SVG, so that they wrap on narrow
screens.

## Controls and read-outs (MA.ui)

```js
const bar = MA.ui.bar(stage);
MA.ui.slider(bar, { label: 'n', min: 1, max: 100, step: 1, value: 6, fmt: v => String(v), onInput: v => {} });
MA.ui.select(bar, { label, options: [['pingshui', MA.t('Pingshui rhymes')], ...], value, onChange });
MA.ui.seg(bar, { label, options, value, onChange });  MA.ui.toggle(bar, { label, value, onChange });
MA.ui.button(bar, { label, onClick, primary });       MA.ui.text(bar, { label, value, onChange: s => errorOrNull });
const info = MA.ui.info(stage); info.set(MA.ui.kv('Tone', '214'), 'text');
MA.ui.legend(stage, [{ label: MA.t('level'), color: 'var(--series-1)' }]);
```

Interface strings are written in English and go through `MA.t('English text')`; their Chinese
versions live in the figure string table (`inc/lang/zh-figures.php`, which the generator currently
overwrites — see the plan). Keep strings short and use `%d`/`%s` for numbers.

## Visual and behavioural conventions

- Colours only from CSS variables so dark mode works: `var(--series-1..4)` for data, `var(--ink)`,
  `var(--ink-2)`, `var(--ink-3)` for neutral lines and text, `var(--accent)` for handles,
  `var(--good)`/`var(--bad)` for right/wrong, `var(--plot-bg)`, `var(--grid)`, `var(--rule)`. Never
  hard-code hex colours. Never use colour alone to carry a distinction (平/仄, right/wrong, 声旁/形旁):
  add a shape (○/●), a weight or a label.
- **Han characters.** Text uses the page font stack (`var(--font)`: system fonts such as PingFang SC,
  Microsoft YaHei or Noto Sans CJK SC), so metrics differ between devices: measure with `getBBox()` or
  `getComputedTextLength()` rather than assuming widths. At least 13 px for running Han text and
  16 px or more where strokes must be seen; never synthesise bold or italic for Han characters, never
  letter-space them. Pinyin needs the tone-marked vowels (ā á ǎ à … ǖ ǘ ǚ ǜ) — check they render.
- **Vertical text** (竖排) only when the layout is the point (a page of a 古籍, a calligraphy scroll):
  SVG `writing-mode: vertical-rl` with `text-orientation: upright`; punctuation turns in vertical
  text, and browsers differ — test in Chromium and Safari.
- Everything a reader can change updates immediately, but keep each redraw fast (< ~16 ms typical).
  Animations (stroke order, sound change) use `MA.anim`, stop when finished, have a pause and a
  step control, and start paused when the reader prefers reduced motion.
- Randomised drills use `MA.num.rng(seed)` so that a fresh page shows the same items, plus a "New
  set" button.
- Mobile: figures work at 320 px; controls wrap; dragging and tracing work through pointer events.
- Accessibility: meaningful `aria-label`s, keyboard operation for everything draggable, results in
  `MA.ui.info` rows (aria-live). Drag-and-drop tasks (sorting characters, building a tree) also work
  by keyboard or by tapping.
- Robustness: no input — however long, empty or strange the pasted text — may throw from an event
  handler; clamp, skip and show a short message. Characters a figure has no data for are shown as
  "no data", never guessed.

## Typefaces, sound and maps

**Typefaces.** Figures that show a character as a model to look at or write (stroke order, 米字格,
calligraphy) look better in a Kai face than in the system sans-serif. LXGW WenKai (霞鹜文楷) and
Source Han Serif (思源宋体) are under the SIL Open Font Licence: subset to the characters used, host
in `assets/fonts/`, list in `THIRD-PARTY-NOTICES.md`. A typeface is not calligraphy: models of the
great calligraphers are drawn for the atlas (below), not imitated with a font. Phonetic figures that
show IPA have the same problem as the English atlas: the self-hosted Archivo subset lacks most IPA
symbols, so transcriptions fall back to system fonts until an IPA-capable OFL font (Charis SIL,
Gentium Plus) is added.

**Sound.** No atlas plays sound yet. Tones, sandhi and initials would gain from it; follow the English
atlas's rules for the shared audio helper (`/learn/english/tools/WIDGET_GUIDE.md`): only on a button
press, never autoplay; recorded files made for the atlas or under a licence that allows
redistribution; the browser's `speechSynthesis` only with `localService` voices (zh-CN for
Putonghua), labelled as synthetic, and never for isolated tones, dialect forms or reconstructed
pronunciations. Dialect recordings need the speaker's informed consent and a licence that allows
publication; no microphone input in the first version.

**Maps of China.** Under China's map regulations (《地图管理条例》, in force since 2016, and the rules on
map review) a map showing China's territory that is published or displayed to the public — online
included — must pass map review and carry its 审图号; unmodified maps from the Ministry of Natural
Resources' standard map service (标准地图服务) may be used with their 审图号 shown. World datasets
such as Natural Earth (vendored for the Peptide Atlas in `/learn/peptides/`) do not draw China's
boundaries as the regulations require and must not be used for maps of China. Therefore:
**no geographic maps of China** in this atlas without that review. Dialect groups, the distribution of
a feature and poets' journeys are shown as schematic, non-geographic diagrams (trees, grids, lists,
timelines with place names) that draw no outlines, coasts or borders. If a real map becomes
indispensable, ask before building it.

## Data and licences

Everything runs in the browser on small, built-in data: no network calls, no web services, no
analytics. Text the reader pastes (a poem to scan, a passage to count) is processed in the page and
never sent anywhere; drafts may be kept in `localStorage` only.

The repository is dedicated to the public domain (CC0). Data under permissive licences can be bundled
with a notice in `THIRD-PARTY-NOTICES.md`; copyleft and ShareAlike data cannot become CC0 and is used
to check, not embedded — unless it is kept in its own directory under its own licence, which needs a
decision first. The sources most likely to be wanted:

| data | licence | what it means here |
|---|---|---|
| Unihan database (radicals, stroke counts, readings, traditional/simplified and variant links) | Unicode License (permissive) | may be bundled, with the notice |
| OpenCC conversion tables (繁简, regional variants) | Apache License 2.0 | may be bundled, with the licence and its NOTICE |
| Make Me a Hanzi stroke graphics and medians; hanzi-writer-data (derived from it) | Arphic Public License (derived from Arphic's AR PL fonts); the dictionary part of Make Me a Hanzi has other licences | a copyleft font licence, not CC0: only in a separate directory under that licence, after a decision; the hanzi-writer library itself is MIT. Check each character's stroke order against the current national standard (《通用规范汉字笔顺规范》 at the time of writing). Alternative: draw the strokes of the characters a lesson uses |
| CHISE IDS and cjkvi-ids (component decompositions) | GPL | check against them; write our own decompositions for the characters taught |
| CC-CEDICT | CC BY-SA 4.0 | check only |
| 《通用规范汉字表》, 《简化字总表》, 《现代汉语常用字表》 | official documents (not protected by copyright in China) | lists may be compiled from them, citing the document |
| rhyme membership (平水韵), 《钦定词谱》 (1715), 《广韵》 (1008), 《韵镜》 | the works are public domain | compile the tables ourselves from an early edition or a plain transcription; digitised tables found online usually carry no licence (all rights reserved) and are used only to check |
| modern 词谱 and 韵书 (龙榆生《唐宋词格律》, 王力《诗词格律》, modern 新韵 books) | in copyright | not copied; patterns are derived from 《钦定词谱》 and the poems themselves |
| reconstructions of Middle and Old Chinese (王力, 李方桂, 郑张尚芳, Baxter–Sagart) | scholarly works | short tables of our own selection, citing the system; full lists not embedded unless their licence allows |
| 《全唐诗》, 《全宋词》 texts | the texts are public domain; 《全宋词》 is a modern compilation (唐圭璋, d. 1990) whose editorial work is protected | take poems from public-domain sources; community digital collections: check their licence and their text (OCR errors, mixed character forms) |
| dialect data (《汉语方音字汇》, 《方言调查字表》, atlases) | in copyright | small tables of our own, cited; no copied tables or maps |
| images of inscriptions, rubbings and calligraphy | the works are public domain; photographs and scans may not be | own SVG drawings from several published forms (cited), or open-access images under CC0 or a public-domain mark, credited |

Facts taken from a study (frequency counts, tone values of a dialect) are cited in the figure's
caption or info row.

## Testing

Every type has a live page: `http://f.g77k.com/learn/chinese/lab.php?w=<type>` (Chinese by default;
`&lang=en` for the English interface; `&cfg=` with URL-encoded `key: value` lines tests other
settings). From this machine:

```
cd /var/www/f.g77k.com/learn/chinese
node tools/shot.js "lab.php?w=plot" /tmp/.../plot.png            # prints JS errors + figure state
node tools/shot.js "lab.php?w=plot" /tmp/.../plot-dark.png --dark
node tools/labcheck.js [type …] [--dark] [--zh]                  # load Lab pages and report errors
node tools/labcheck.js --lessons --zh                           # every figure in every Chinese lesson
```

Pages here open in Chinese in the headless browser too, with or without `--zh`; to see the English
interface, add `&lang=en` to the page given to `tools/shot.js`. Look at every screenshot (light and
dark, Chinese and English), test several catalogue options, and fix all errors.

## Kept figure types

| type | file | use in this atlas |
|---|---|---|
| `plot` | calculus | Tone contours on Chao's five-level scale as functions of time (`f: 5; 3 + 2x; if(x < 0.5, 2 - 2x, 1 + 6(x - 0.5)); 5 - 4x` on `x: 0, 1` for 55, 35, 214, 51), dialect tones by changing the values; Zipf's law for characters (plot the logarithms — the type has no log axes); coverage curves from a formula. |
| `distribution` | prob | Sampling models for 评估信息: the spread of a binomial count, why small polls mislead, the normal approximation. |
| `markov` | prob | Next-character or next-word prediction from a small hand-made transition table (states are characters or words), as an introduction to n-gram models; not a model of a whole corpus. |
| `bayes` | prob | Base rates (`mode: test`): a reliable-seeming test or rumour about a rare event; updating a belief with evidence (`mode: beta`). |
| `graph` | discrete | Trees and networks with fixed positions (`A@x,y`) and directed edges (`A>B`): component trees (字 → 部件), a phonetic series (青 → 清 请 情 晴 精), the Sino-Tibetan family, immediate-constituent trees, argument maps, the characters of a novel. Node names may be Chinese. |
| `venn` | discrete | Relations between concepts (全同, 属种, 交叉, 全异 — Euler diagrams drawn as Venn regions), the four categorical propositions, three sets for a syllogism. |
| `truthtable` | discrete | 联言, 选言 and 假言 propositions, 充分条件 and 必要条件, equivalences (p → q and ¬q → ¬p), the 二难推理. |

## Planned Chinese figure types

None of these exists yet. Before the first one is built, the generator needs a way to keep
atlas-specific figures: today `tools/mkatlas.py` accepts only types from the Maths Atlas catalogue and
rewrites `data/widgets.json`, the Lab groups and `inc/lang/zh-figures.php` on every run. Once it merges
an atlas-local catalogue (keys, defaults, `zh`/`zh_desc`, an `example` per type), Lab groups and figure
strings, build the types below in new group files, put their interface strings through `MA.t`, and
test each on its Lab page.

Priority 1 is what the first lessons of each area need; "audio" says whether a figure needs the
audio helper (required / optional / none).

### Characters — `script.js`

| priority | type | courses | the reader … | data and source | audio |
|---|---|---|---|---|---|
| 1 | `stroke-order` | chinese-characters, calligraphy | plays a character stroke by stroke (pause, step, repeat), sees each stroke's name (横, 竖, 撇, 捺, 点, 折 …) and number, then traces it in a grid with feedback on order and direction | strokes drawn for the atlas for the characters taught, following the national stroke-order standard; or Make Me a Hanzi data under its own licence (see the licence table) | none |
| 1 | `script-evolution` | chinese-characters, calligraphy | sees one character in 甲骨文, 金文, 小篆, 隶书 and 楷书 side by side, follows what each stroke became (隶变), and reads a note on the analysis | own SVG drawings from several published forms, each source cited; never scans | none |
| 1 | `components` | chinese-characters, modern-vocabulary | splits a character into components with an IDS tree (⿰ ⿱ ⿵ …), sees its radical in the 201-radical system and which component carries meaning or sound | our own decompositions for the characters taught; radical and stroke counts from Unihan or 《通用规范汉字表》; CHISE / cjkvi-ids only to check | none |
| 2 | `phonetic-series` | chinese-characters, phonology | explores a phonetic series (青: 清 请 情 晴 精 睛 …; 工: 江 红 空 …) and sees how far the phonetic still predicts the modern reading, with Middle Chinese readings for comparison | own lists; modern readings from 《现代汉语词典》; Middle Chinese in one cited system | optional |
| 2 | `simplification` | chinese-characters | sees traditional and simplified forms and the method of each simplification (省略, 草书楷化, 同音代替 …), including one-to-many cases (发 ← 發/髮, 干 ← 乾/幹) | 《简化字总表》; OpenCC tables to check (or bundled with notice) | none |
| 2 | `grid` | calligraphy, chinese-characters | writes over a model character in a 米字格 or 田字格 with finger or mouse; overlays the model to compare proportion and balance | model glyphs from an OFL Kai typeface or drawn for the atlas; nothing leaves the browser | none |

### Modern Chinese — `mandarin.js`

| priority | type | courses | the reader … | data and source | audio |
|---|---|---|---|---|---|
| 1 | `initials` | sounds-of-mandarin, linguistics, dialects | explores the 21 consonant initials in a place × manner grid with IPA, aspirated and unaspirated pairs, and the common dialect confusions (n/l, zh/z, f/h, front and back nasals) marked | standard phonetic description (黄伯荣、廖序东; 林焘、王理嘉《语音学教程》) drawn for the atlas | optional |
| 1 | `vowel-chart` | sounds-of-mandarin, linguistics | sees the simple finals (a o e ê i u ü -i[ɿ] -i[ʅ] er) on a 舌位图, and how the letters of Pinyin map onto several sounds | standard descriptions; positions schematic, labelled as such | optional |
| 1 | `tones` | sounds-of-mandarin, poetry-metrics, dialects | sees the four tones as contours on Chao's scale, types a phrase and watches sandhi applied (上声变调, 一 and 不, 轻声), and switches to the tone values of a dialect | rules; dialect tone values from cited sources | optional (synthetic speech only for whole words) |
| 2 | `syllables` | sounds-of-mandarin | builds syllables from initial + final + tone and sees which combinations exist (the 普通话音节表), with the spelling rules of Pinyin (ü after j q x, y/w, iou → iu) | the syllable inventory (facts); 《汉语拼音方案》 | optional |
| 1 | `ic-analysis` | modern-grammar, linguistics | cuts a phrase or sentence into immediate constituents layer by layer, labels each relation (主谓, 动宾, 偏正, 中补, 联合) and compares the two analyses of an ambiguous phrase (咬死了猎人的狗) | sentences written for the atlas with model analyses; the lesson names the grammar system | none |
| 2 | `constituents` | modern-grammar, foundations-of-writing | marks subject, predicate, object, 定语, 状语 and 补语 with the school bracket notation, and switches to the layered view | as above | none |
| 2 | `faulty-sentence` | modern-grammar, rhetoric, foundations-of-writing | finds the error in a sentence, names its type (搭配不当, 成分残缺或赘余, 语序不当, 关联词语不当, 歧义) and compares a correction | sentences written for the atlas — never exam items | none |
| 2 | `char-frequency` | modern-vocabulary, linguistics, chinese-characters | pastes a text or picks a built-in one and sees character and word frequencies, the rank–frequency curve on log axes, and how many characters cover 80%, 90% and 99% of the text | the reader's text (never sent anywhere); built-in public-domain texts; published coverage figures cited | none |
| 3 | `word-formation` | modern-vocabulary | sorts compounds into 联合, 偏正, 补充, 动宾 and 主谓 and sees affixed and reduplicated forms | words chosen for the atlas | none |

### Classical Chinese — `classical.js`

| priority | type | courses | the reader … | data and source | audio |
|---|---|---|---|---|---|
| 1 | `gloss` | classical-chinese-1, classical-chinese-2, pre-qin-literature | reads a passage of 文言 and hovers or taps a word for its gloss, its 古今异义, 词类活用 or 通假 note, and the clause-by-clause modern translation alongside | public-domain texts; glosses and translations written for the atlas (not copied from modern editions) | none |
| 2 | `punctuate` | classical-chinese-1 | punctuates an unpunctuated passage by tapping between characters, then compares with a reference punctuation that accepts the usual alternatives | public-domain texts with our own reference punctuation | none |
| 2 | `fanqie` | phonology, classical-chinese-2 | enters a 反切 (上字 + 下字) and sees the initial taken from the first and the final and tone from the second, then the regular development to Putonghua and where it fails | 《广韵》 entries compiled for the atlas from a public-domain edition; digital datasets only if their licence allows | none |
| 3 | `rhyme-table` | phonology | browses a rhyme table (等韵图) — initials across, divisions and tones down — for one 摄, with the characters in their cells and a reconstruction in one cited system | 《韵镜》 (public domain), transcribed for the atlas | none |
| 2 | `sound-change` | phonology, history-of-chinese, dialects | follows the readings of chosen characters from Middle Chinese to Putonghua and to dialects, watching 浊音清化, 入派三声 and palatalisation happen | small tables of our own, cited; reconstructions labelled as hypotheses | none |

### Poetry — `poetry.js`

| priority | type | courses | the reader … | data and source | audio |
|---|---|---|---|---|---|
| 1 | `pingze` | poetry-metrics, tang-literature, song-literature | picks or pastes a poem and sees each character marked ○/● (入声 flagged), the rhyme words and their 平水韵 group, and a check against the regulated patterns: 粘, 对, 孤平, 三平尾; 多音字 are marked uncertain rather than guessed | a 平水韵 table compiled from a public-domain rhyme book; the reader can choose a modern 新韵 instead | none |
| 2 | `cipu` | poetry-metrics, song-literature | chooses a 词牌 and sees its pattern (lines, 平仄, rhyme positions, stanzas) beside a poem written to it, with the places where poets departed from it | patterns from 《钦定词谱》 (1715); modern 词谱 books are not copied | none |
| 3 | `couplet` | poetry-metrics | aligns the two lines of a couplet and sees the opposition of word class, meaning and tone character by character | couplets from public-domain poems | none |

### Literature — `literature.js`

| priority | type | courses | the reader … | data and source | audio |
|---|---|---|---|---|---|
| 1 | `periods` | pre-qin-literature, han-to-nanbeichao, tang-literature, song-literature, yuan-ming-qing, modern-literature, contemporary-literature | moves along a timeline of dynasties and periods with the writers and works of the course placed on it, and filters by genre | standard chronology (dynasty dates by the mainland convention, stated); writers' dates from the standard histories | none |
| 2 | `itinerary` | tang-literature, song-literature | follows a poet's life (李白, 杜甫, 苏轼) as a timeline of places and poems — not a geographic map (see "Maps of China") | the standard chronologies (年谱) of each poet, cited | none |
| 2 | `characters-network` | yuan-ming-qing, modern-literature | explores the people of a novel (《红楼梦》, 《水浒传》, 《家》) as a network of family and social relations, filtered by chapter | relations compiled for the atlas from the texts | none |

### Reasoning and writing — `reasoning.js`

| priority | type | courses | the reader … | data and source | audio |
|---|---|---|---|---|---|
| 1 | `concepts` | logic | places two concepts and sees their relation (全同, 真包含, 真包含于, 交叉, 全异) as an Euler diagram, then checks a definition or a division for the common errors | examples written for the atlas | none |
| 1 | `syllogism` | logic | builds a categorical syllogism and sees its figure and mood, the distribution of terms, which rules it breaks (中项不周延 …) and a three-set diagram | rules of traditional logic | none |
| 2 | `argument-map` | argumentative-writing, logic, academic-writing | arranges a passage's claim, reasons, evidence, objections and rebuttals into a map and compares it with a model (a static version can use `graph`) | passages written for the atlas | none |
| 2 | `citation` | academic-writing | fills in the fields of a source and sees the reference formatted under GB/T 7714—2015 (顺序编码制 or 著者-出版年制), with the document-type codes ([M], [J], [D], [EB/OL] …) | the rules of the standard, summarised | none |
| 3 | `document-format` | applied-writing | sees the parts of an official document laid out on a page under GB/T 9704—2012 (版头, 主体, 版记; 发文字号, 标题, 主送机关 …) and clicks each for its rule | the rules of the standard, summarised; sample documents written for the atlas | none |

### Dialects — `dialects.js`

| priority | type | courses | the reader … | data and source | audio |
|---|---|---|---|---|---|
| 2 | `dialect-compare` | dialects, phonology, linguistics | chooses characters and compares their readings across dialect points (北京, 济南, 西安, 太原, 上海, 苏州, 长沙, 南昌, 梅县, 广州, 厦门, 福州) in IPA with tone values, grouped by the sound correspondences | a small table of our own, checked against cited sources; never copied wholesale | optional (recordings with consent only) |
| 2 | `dialect-groups` | dialects | explores the classification of the dialects as a tree of groups and subgroups with their defining features — a schematic diagram, not a map | 《中国语言地图集》 classification, cited and described in our own words | none |
