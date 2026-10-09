# English Atlas — interactive figure guide

Figures are small JavaScript programs that turn a `:::widget <type>` block in a lesson into an
interactive diagram. Lessons are written by other people against the **catalogue**
`data/widgets.json`: every type, its keys, their types and defaults. Implement each type exactly
as catalogued; it is the contract.

Reference implementations: `plot`, `riemann`, `taylor` in `assets/js/widgets/calculus.js`.
Read them and `assets/js/plot.js` before writing anything. The engine and figure files are copied
from Maths Atlas; the English catalogue keeps the 7 types useful here (below). English-specific
types still have to be built — see the plan at the end.

**The engine copy is generated.** `python3 tools/mkatlas.py tools/atlas-specs/english.json` (run
from the repository root) copies the Maths Atlas engine into this directory again and rewrites
`data/widgets.json` (the maths catalogue filtered to the spec's `widgets`), the Lab groups in
`lab.php` (from the spec's `lab_groups`) and `inc/lang/zh-figures.php`. New files of our own, such as
`assets/js/widgets/sounds.js`, survive a refresh; edits to copied files do not. Fixes to shared code
go into `/learn/maths/` (or the generator), never into the copies here.

## Files and loading

- `assets/js/core.js` — `MA` namespace: `MA.el` (DOM/SVG builder), `MA.t` (translation), `MA.fmt`
  (number formatting with a real minus sign), `MA.tex(el, tex)` / `MA.texEl(tex)` (KaTeX),
  `MA.isDark()`, `MA.cssVar(name)`, `MA.tip` (tooltip).
- `assets/js/expr.js` — expression language (`MA.expr.parse`, `compile`, `compileC` for complex,
  `taylor`, `toTeX`, `value`). Also runs in node for validation.
- `assets/js/plot.js` — `MA.widget(type, factory)` registry, `MA.cfg` parsers, `MA.Plot` (SVG
  plotting), `MA.ui` (controls), `MA.num` (integrate, deriv, bisect, roots, rk4, seeded rng, normal),
  `MA.anim` (animation loop), `MA.autoRange`.
- `assets/js/widgets/<file>.js` — one file per group, named by the catalogue's `file` field.
  A lesson page loads only the files whose types it uses. Wrap each file in an IIFE like
  calculus.js and register with `MA.widget('type', (stage, cfg, ctx) => { … })`.

## The factory

```js
MA.widget('riemann', (stage, cfg, ctx) => {
  // stage: empty <div> inside <figure class="widget">; append your plot, controls, info rows
  // cfg: {key: "string"} exactly as written by the author (all values are strings)
  // ctx: {fig, id}
});
```

- Parse every value with `MA.cfg`: `num` (accepts `pi/2`), `int`, `bool`, `range`, `list`,
  `points`, `sliders`, `expr(src, vars)` → `{f, ast}`, `str`, `has`. Apply catalogue defaults
  when a key is absent.
- Throw `new Error('readable message')` for bad input; the framework shows it inside the figure.
- Optional `cfg.title` → `MA.ui.title(stage, cfg.title)`. `caption` is handled by the page.
- English text in a figure's settings (`nodes: the; cat; sat`, a sentence to analyse) is data:
  never pass it through `MA.t`, and never translate it in the Chinese lessons.

## Drawing with MA.Plot

```js
const P = new MA.Plot(stage, { x: [-5, 5], y: [-3, 3], equal: false, piTicks: false, width: 640, height: 400 });
P.fn(x => Math.sin(x), { color: 'var(--series-1)' });      // graph, breaks at asymptotes
P.param(fx, fy, t0, t1, opts);  P.path(points, opts);  P.area(f, a, b, { g });  P.poly(points, opts);
P.line(x1, y1, x2, y2, opts);   P.arrow(...);  P.slopeLine(x, y, m);  P.vline(x);  P.hline(y);
P.rect(x, y, w, h, opts);  P.dot(x, y, { r, hollow });  P.circle(x, y, r);  P.text(x, y, 'str', { dx, dy, anchor });
P.tex(x, y, '\\frac{1}{2}', { anchor: 'middle' });
const h = P.handle(x, y, { constrain: (x, y) => [x, f(x)], onDrag: (x, y) => redraw() });   // draggable, keyboard-accessible
P.onHover((x, y) => ...);  P.onClick((x, y) => ...);  const read = P.readout(); read('x = 1.2');
P.clear();  // clears data layers (keeps axes)      P.setView([x0, x1], [y0, y1]);  P.X(x), P.Y(y), P.inv(px, py)
```

Options: `color`, `width`, `dash` (`true` or `'4 3'`), `opacity`, `fill`, `fillOpacity`, `layer`
(`fill` < `curves` < `marks` < `labels` < `top`). Default view box 640×400. Many English figures
are diagrams rather than plots (a vowel chart, a tree, a timeline, a sentence with marks above
it): draw them as SVG with `MA.el`, in the same coordinate habits, or on an `MA.Plot` with hidden
axes. Text-heavy figures (a passage with reference chains, a sentence pair) are HTML with spans,
not SVG, so that they wrap on narrow screens.

## Controls and read-outs (MA.ui)

```js
const bar = MA.ui.bar(stage);                       // a row of controls under the plot
MA.ui.slider(bar, { label: 'n', min: 1, max: 100, step: 1, value: 6, fmt: v => String(v), onInput: v => {} });
MA.ui.select(bar, { label, options: [['gb', MA.t('General British')], ...], value, onChange });
MA.ui.seg(bar, { label, options, value, onChange });  MA.ui.toggle(bar, { label, value, onChange });
MA.ui.button(bar, { label, onClick, primary });       MA.ui.text(bar, { label, value, onChange: s => errorOrNull });
const info = MA.ui.info(stage); info.set(MA.ui.kv('Tense', 'present perfect'), 'text');
MA.ui.legend(stage, [{ label: 'GB', color: 'var(--series-1)' }]);
```

Use `MA.t('English text')` for every visible interface string (translated later); keep strings
short and use `%d`/`%s` for numbers.

## Visual and behavioural conventions

- Colours only from CSS variables so dark mode works: `var(--series-1..4)` for data,
  `var(--ink)`, `var(--ink-2)`, `var(--ink-3)` for neutral lines and text, `var(--accent)` for
  handles, `var(--good)`/`var(--bad)` for right/wrong, `var(--plot-bg)` for backgrounds,
  `var(--grid)`, `var(--rule)`. Never hard-code hex colours. Never use colour alone to carry a
  distinction (stressed/unstressed, right/wrong): add a shape, weight or label.
- Everything a reader can change updates immediately, but keep each redraw fast (< ~16 ms
  typical). Animations use `MA.anim`, stop when finished, and start paused when the reader prefers
  reduced motion.
- Randomised figures (a drill that picks words) use `MA.num.rng(seed)` so that a fresh page shows
  the same items, plus a "New set" button.
- Mobile: figures work at 320 px; controls wrap; dragging works through pointer events.
- Accessibility: meaningful `aria-label`s, keyboard operation for everything draggable, results in
  `MA.ui.info` rows (aria-live). Drag-and-drop tasks (sorting nouns, building a tree) also work
  by keyboard or by tapping.
- Robustness: no input — however long, empty or strange the pasted text — may throw from an event
  handler; clamp, skip and show a short message.

## Two dependencies before most English figures

**IPA font.** The self-hosted Archivo and JetBrains Mono subsets lack most IPA symbols (Archivo
has ð, æ, ə and ŋ but not ʃ θ ʒ ɪ ʊ ɔ ɑ ʌ ɜ ɒ ɡ ɹ ʔ ɾ ɐ ː ˈ ˌ), so transcriptions fall back to
system fonts. Self-host an IPA-capable font under the SIL Open Font Licence (Charis SIL or
Gentium Plus, subset to the symbols used, listed in the root `THIRD-PARTY-NOTICES.md`) and give
every transcription in a figure that font. All figures that show transcriptions depend on it.

**Audio.** No atlas plays sound yet. Build one small shared helper, used by every figure that
speaks, with these rules:

- Sound plays only when the reader presses a button: never autoplay, never loop.
- Recorded or generated files are the reliable option: store them in `assets/audio/` (short Ogg
  Opus or MP3 files), made for the atlas or taken from a source whose licence allows
  redistribution, credited in `THIRD-PARTY-NOTICES.md`, with the speaker's accent (GB, GA, other)
  stated.
- The browser's `speechSynthesis` costs nothing to host but varies between devices, may have no
  English voice at all, and some voices are online services that would send the text off the site
  (the atlases promise to keep no data about readers): use only voices with `localService` true,
  match `en-GB` or `en-US` to the model being taught, label the result as synthetic speech, and
  say plainly when no suitable voice is available.
- Synthetic voices are fine for words and sentences, not for isolated sounds, minimal-pair
  drills or reconstructed historical pronunciation.
- No microphone input in the first version (recording and analysing the reader's voice raises
  privacy questions and needs its own design).

## Data and licences

- Everything runs in the browser on small, built-in data. No network calls, no web services,
  no analytics. Text the reader pastes (for Zipf, coverage or readability figures) is processed
  in the page and never sent anywhere; drafts may be kept in `localStorage` only.
- The repository is CC0. Code and data under permissive licences (MIT, BSD, ISC, the SIL OFL) can
  be bundled with a notice in `THIRD-PARTY-NOTICES.md`. ShareAlike data (Wiktionary, many open word
  lists) is used to check facts, not embedded. Facts taken from a study (formant means, dictionary
  counts) are cited in the figure's caption or info row.
- Example texts are public domain or written for the atlas (see `tools/CONTENT_GUIDE.md` §6).

## Testing

Every type has a live page: `http://f.g77k.com/learn/english/lab.php?w=<type>` (renders the
catalogue `example`; `&cfg=` with URL-encoded `key: value` lines tests other settings).
From this machine:

```
cd /var/www/f.g77k.com/learn/english
node tools/shot.js "lab.php?w=plot" /tmp/.../plot.png            # prints JS errors + figure state
node tools/shot.js "lab.php?w=plot" /tmp/.../plot-dark.png --dark
node tools/labcheck.js [type …] [--dark] [--zh]                  # load Lab pages and report errors
node tools/labcheck.js --lessons [--zh]                         # every figure in every written lesson
```

Look at every screenshot (light and dark, English and Chinese), test several catalogue options,
and fix all errors.

## Kept figure types

| type | file | use in this atlas |
|---|---|---|
| `plot` | calculus | Curves with sliders: forgetting and spacing models (Ebbinghaus 1885; Murre & Dros 2015), Zipf's law $f \propto 1/r^{s}$ (plot the logarithms — the type has no log axes), coverage curves from a formula. |
| `fourier` | fourier | A periodic wave built from harmonics, as in the buzz of the vocal folds that vowels shape; illustrative only (it is not speech, and plays no sound). |
| `distribution` | prob | Models of word length and sentence length compared with counts from a cited text. |
| `markov` | prob | Next-word prediction from a small hand-made transition table (states are words), as in Shannon's (1948) approximations to English. |
| `graph` | discrete | Trees and networks with fixed positions (`A@x,y`): language families, word families, simple sentence trees, argument structure (directed edges `A>B`). |
| `venn` | discrete | Meaning relations (hyponymy, overlapping near-synonyms) and quantifiers (*all*, *some*, *no*). |
| `truthtable` | discrete | The logic of *and*, *or*, *not*, *if … then* and *unless*; inclusive and exclusive *or*; contrapositives in academic argument. |

## Planned English figure types

None of these exists yet. Before the first one is built, the generator needs a way to keep
atlas-specific figures: today `tools/mkatlas.py` accepts only types from the Maths Atlas catalogue
and rewrites `data/widgets.json`, the Lab groups and `inc/lang/zh-figures.php` on every run. Once it
merges an atlas-local catalogue (keys, defaults, `zh`/`zh_desc`, an `example` per type), Lab
groups and figure strings, build the types below in new group files, put their strings through
`MA.t`, and test each on its Lab page.

Priority 1 is what the first lessons of each area need; "audio" says whether the figure needs the
audio helper (required / optional / none). Every figure that shows transcriptions needs the IPA
font.

### Pronunciation — `sounds.js`

| priority | type | courses | the reader … | data and source | audio |
|---|---|---|---|---|---|
| 1 | `vowel-chart` | sounds-of-english, connected-speech, linguistics, world-englishes | clicks a vowel on the vowel quadrilateral to see its symbol, its Wells keyword (KIT, FLEECE …), example words and lip and tongue position; switches between GB and GA; compares two vowels (*ship*–*sheep*) | positions from mean formant values in a cited study (e.g. Deterding 1997 for southern British English, Hillenbrand et al. 1995 for American English) or the conventional chart; lexical sets from Wells (1982) | optional |
| 1 | `consonant-chart` | sounds-of-english, linguistics | explores a place × manner grid with voiceless/voiced pairs; sounds Mandarin lacks (/θ/, /ð/, /v/, /ʒ/ …) and sounds Pinyin spells differently are marked; clicking gives example words and how the sound is made | standard phonetic facts, drawn for the atlas (the International Phonetic Association's own chart is CC BY-SA and is not copied) | optional |
| 1 | `vocal-tract` | sounds-of-english | chooses a sound and sees a section of the mouth and throat: lips, tongue, soft palate, and whether the vocal folds vibrate | hand-drawn SVG shapes | none |
| 2 | `minimal-pairs` | sounds-of-english, connected-speech | hears one word of a pair (*ship*/*sheep*, *light*/*right*, *thin*/*sin*, *van*/*fan*, *bed*/*bad*, *cap*/*cab*) and says which it was; without audio, compares transcriptions and mouth positions | hand-made pair lists | required (recorded) |
| 2 | `syllable` | sounds-of-english, linguistics | chooses or types a word and sees it split into syllables (onset, nucleus, coda), with the consonant clusters Mandarin syllables do not allow highlighted | hand-made word list with transcriptions checked against a pronouncing dictionary; for a larger GA list, CMUdict (BSD-style licence) | optional |
| 2 | `stress-pattern` | sounds-of-english, connected-speech, word-formation | sees words as stress patterns (Oo, oO, oOo), moves the stress and sees how meaning or word class changes (*record* the noun and the verb; *photograph*, *photography*, *photographic*) | hand-made | optional |
| 2 | `intonation` | connected-speech, listening-and-conversation, pragmatics | places the nucleus and chooses a fall, rise or fall-rise on a short utterance; a stylised pitch line shows the contour and a note gives the meaning (statement, question, reservation, politeness) | stylised contours following a standard description (Wells, *English Intonation*); pitch tracks from the atlas's own recordings later | optional |
| 3 | `linking` | connected-speech, listening-and-conversation | switches a sentence between careful and connected speech and sees linking, weak forms, elision and assimilation marked above the words | hand-made | optional |

### Grammar — `grammar.js`

| priority | type | courses | the reader … | data and source | audio |
|---|---|---|---|---|---|
| 1 | `tense-timeline` | tense-and-aspect, complex-sentences | drags the event time (E) and reference time (R) relative to the speech time (S) on a timeline, after Reichenbach (1947); the figure names the form, shows an example and notes how Chinese might express the same meaning (with 了, 过, 着 or a time word — rarely one to one) | rules | none |
| 1 | `aspect` | tense-and-aspect | compares simple, progressive and perfect as frames around a reference point: an action in progress interrupted, an action completed before a point, a state continuing up to now | rules | none |
| 1 | `article-chooser` | nouns-and-articles, core-grammar | answers questions about a noun in context (countable? singular? known to the listener? generic?) and sees *a/an*, *the* or no article chosen with the reason, and the fixed expressions that break the pattern (*go to school*; BrE *in hospital*, AmE *in the hospital*) | hand-made examples | none |
| 1 | `sentence-tree` | complex-sentences, linguistics, translation | groups the words of a sentence into phrases and labels them (NP, VP, PP, clause) to build a tree; compares the two trees of an ambiguous sentence (*I saw the man with the telescope*) | hand-made sentences with model trees; the lesson states which grammar's analysis it follows | none |
| 2 | `clause-pattern` | core-grammar, verb-patterns, complex-sentences | marks subject, verb, object, complement and adverbial and sees the clause pattern (Quirk et al.'s seven: SV, SVO, SVC, SVA, SVOO, SVOC, SVOA) | hand-made annotated sentences | none |
| 2 | `countability` | nouns-and-articles, core-vocabulary | sorts nouns into countable, uncountable, and both with a change of meaning (*paper*/*a paper*, *chicken*/*a chicken*) | hand-made list, checked against learner's dictionaries' [C]/[U] labels | none |
| 2 | `conditionals` | complex-sentences, modality | picks real or unreal and past, present or future time in a grid and sees the form and examples, including mixed conditionals | rules | none |
| 2 | `modal-scale` | modality, academic-writing, pragmatics | slides along a scale of certainty (or of obligation) and sees which forms fit (*might*, *may*, *could*, *should*, *will*, *must*; *must have been* …), with their overlaps and register | reference grammars; marked as approximate | none |

### Vocabulary — `words.js`

| priority | type | courses | the reader … | data and source | audio |
|---|---|---|---|---|---|
| 1 | `word-builder` | word-formation, core-vocabulary, collocation-and-register | combines prefixes, roots and suffixes; sees which words exist, their meaning and word class, and where the stress moves | hand-made morpheme and word lists checked in dictionaries | optional |
| 1 | `zipf` | core-vocabulary, reading-skills, linguistics | pastes a text or picks a built-in one and sees rank against frequency on logarithmic axes with a fitted slope, the most frequent words, and the numbers of types and tokens | the reader's own text (never sent anywhere); built-in public-domain texts (Project Gutenberg transcriptions, licence header removed, after checking the dates rule of `tools/CONTENT_GUIDE.md` §6) | none |
| 1 | `coverage` | core-vocabulary, reading-skills, academic-reading | sees what percentage of the running words in a text its N most frequent words cover, against the 95% and 98% thresholds discussed by Laufer (1989) and Hu & Nation (2000) | computed from the text | none |
| 2 | `spacing` | core-vocabulary | places review sessions on a timeline and watches a modelled retention curve; compares massed and spaced reviews | a simple exponential forgetting model, labelled as a model (Ebbinghaus 1885; Murre & Dros 2015; Cepeda et al. 2006 on spacing) | none |
| 2 | `collocation` | collocation-and-register, translation | chooses a node word (*strong*, *powerful*, *make*, *do*) and sees its collocates ranked by association measures (MI, t-score, logDice), with why the rankings differ | counts from a built-in public-domain corpus (old texts — say so), or published figures cited as facts; the BNC and COCA cannot be redistributed | none |

### Reading and writing — `texts.js`

| priority | type | courses | the reader … | data and source | audio |
|---|---|---|---|---|---|
| 2 | `cohesion` | reading-skills, sentences-and-paragraphs, academic-reading | clicks pronouns and other referring expressions in a passage to see the chains they form, with connectives coloured by function (addition, contrast, cause, sequence) | passages written for the atlas; categories after Halliday & Hasan (1976) | none |
| 2 | `argument-map` | academic-reading, essay-writing, presentations-and-discussion | arranges a passage's claim, reasons, evidence, objections and rebuttals into a map and compares it with a model map | passages written for the atlas (a static version can use `graph` with directed edges) | none |
| 2 | `readability` | reading-skills, essay-writing, style-and-rhetoric | pastes a text and sees sentence and word length, syllables per word, Flesch Reading Ease and the Flesch–Kincaid grade, with their limits stated: they count length, not meaning, and were made for native-speaker school texts | formulas (Flesch 1948; Kincaid et al. 1975); syllable counts are approximate | none |
| 2 | `scansion` | reading-literature, connected-speech | marks the stressed syllables in a line of verse and sees the feet and the metre named (iambic pentameter …), compared with an annotated scansion that accepts the usual alternatives | public-domain lines (Shakespeare, Wordsworth, Keats …) scanned by the author of the lesson | optional |
| 3 | `essay-planner` | essay-writing, academic-writing | fills in a plan — thesis, topic sentences, support, counter-argument, conclusion — with a word budget for each part | none; drafts stay in the browser (`localStorage`) | none |

### Language studies — `language.js`

| priority | type | courses | the reader … | data and source | audio |
|---|---|---|---|---|---|
| 1 | `vowel-shift` | history-of-english, sounds-of-english | plays the Great Vowel Shift (c. 1400–1700) on a vowel chart: the long vowels rise and the highest become diphthongs; *bite*, *meet*, *meat*, *mate*, *boot*, *boat*, *house* show Middle English and modern pronunciations and why the spelling no longer fits | standard histories (Baugh & Cable; Lass in *The Cambridge History of the English Language*, vol. III); say that the order and causes are debated and that reconstructions are hypotheses | optional, labelled as reconstruction |
| 1 | `alignment` | translation, complex-sentences | hovers over a phrase in an English sentence to see its counterpart in the Chinese translation; lines show reordering (modifiers after the noun in English, before it in Chinese), connectives that Chinese leaves implicit (hypotaxis and parataxis) and passives turned active | sentence pairs written for the atlas; machine translations only when labelled as such | none |
| 2 | `language-tree` | history-of-english, linguistics | explores the Indo-European family down to English, with cognates (*father*, German *Vater*, Latin *pater*, Sanskrit *pitár-*) and the correspondences of Grimm's law; Chinese appears in its own family (Sino-Tibetan) for contrast | standard references (Fortson, *Indo-European Language and Culture*; Mallory & Adams) | none |
| 2 | `word-origins` | history-of-english, word-formation | compares the sources of English words (Germanic, French, Latin, Greek, other) counted two ways — dictionary headwords and running text — which give very different pictures | dictionary counts from Finkenstaedt & Wolff (1973), cited; running-text counts computed from a public-domain sample with etymologies checked in a cited dictionary | none |
| 2 | `english-map` | world-englishes, history-of-english | sees countries shaded by the status of English (official, co-official, widely learned) with Kachru's circles and dated estimates of speakers | D3 7.9.0 is already in `assets/vendor/`; TopoJSON 3.0.2 and Natural Earth's `countries-110m.json` (via world-atlas) are vendored in `/learn/peptides/` and can be copied with their notices; statuses and numbers from cited sources (Crystal, *English as a Global Language*; national censuses — Ethnologue's tables are proprietary). Borders are politically sensitive: prefer a tile or dot map, or draw no disputed boundaries and label no disputed areas | none |
| 2 | `kachru-circles` | world-englishes, pragmatics | sees the inner, outer and expanding circles with example countries; clicking one gives its history and the status of English there, with the critiques of the model and the alternatives (Schneider's dynamic model, English as a lingua franca) | Kachru (1985); Schneider (2007); Jenkins, *Global Englishes* | none |
| 2 | `politeness-scale` | pragmatics, everyday-english, presentations-and-discussion | slides a request from direct to indirect (*Close the window.* → *Could you possibly close the window?* → *It's cold in here.*), sees the strategy (Brown & Levinson's bald on record, positive and negative politeness, off record) and how distance, power and the size of the request change the choice | written for the atlas; the notes say that norms vary within every culture and avoid national stereotypes | optional |
| 3 | `dialogue` | everyday-english, listening-and-conversation | steps through a dialogue turn by turn, choosing what to say at decision points and seeing why each choice fits or not | dialogues written for the atlas | optional |
