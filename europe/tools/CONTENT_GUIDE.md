# European History Atlas — content guide

European History Atlas (`/learn/europe/`) is a survey of European history for self-study. Every chapter is a long lesson: a question, the terms, a claim that can be checked, the evidence and its limits, a worked case, an interactive figure, and exercises with full solutions.

The reference for markup is `/home/c2h2/learn/maths/content/en/calculus-1/limits.md`, and the depth rules below are the ones `tools/check.php` enforces. In this atlas a `:::theorem` block is displayed as **Claim** and a `:::proof` as **Argument**.

Read `tools/CHRONOLOGY.md` and `tools/BRIEFS.md` before writing. The brief says what the chapter has to teach. The chronology is the only list of years and quantities you may treat as settled.

**For study. Not a national myth, and not advice about a live political dispute.** Describe claims, including ones you reject, in the form a reader can check. Do not tell the reader which party, union or state to support.

The Chinese translation is not part of this pass. Do not add files under `content/zh/`.

## 1. Files

```
content/en/<course>/course.json    already written — do not restructure it
content/en/<course>/<chapter>.md   one lesson per chapter, in course.json order
tools/CHRONOLOGY.md                the only settled years and quantities
tools/BRIEFS.md                    what each chapter must teach, and the figure to paste
```

Do not rename, add, remove or reorder courses or chapters.

Write every lesson properly. Never pad with filler. The checker rejects "the one that the … is for" and a lesson that opens with "This lesson defines the".

## 2. Depth (tools/check.php)

Counted on **paragraphs and list items only**. Headings and display math do not count. Aim for **3,200–4,800** words.

- **≥ 3** numbered blocks in total (`:::definition`, `:::theorem`, `:::proposition`, `:::lemma`, `:::corollary`). Use `:::definition` for a term and `:::theorem` for a claim. Every claim needs a `:::proof` that says what evidence supports it and what would count against it. A proof here is an argument, not a deduction from axioms.
- **≥ 4** `:::example` blocks, each with a `:::solution`. Good examples are a date to compute, a short invented chronicle sentence to read against its limits, or two real dated events set side by side. Invented sentences must be labelled as invented. Real dates must come from the chronology.
- **≥ 8** `:::exercise` blocks under `## Exercises`, each with a `:::solution`. About 3 at `{level=1}`, 3 at `{level=2}`, 2 at `{level=3}`. Add `:::hint` on the level-3 items. Use `check="…"` only when the answer is a single token, and make the solution produce that exact string.
- **≥ 1** `:::widget` and **≥ 1** `:::quiz` (two is better). Paste the widget from the brief. You may change the caption's wording, not the years or the type.
- **≥ 1** `:::warning`, naming a myth or a confusion the chapter exists to stop.
- One `:::history` block. Its years and names must match `course.json` or `tools/CHRONOLOGY.md`. No invented quotations.
- A `:::summary` of 5–8 bullets immediately before `## Exercises`.
- A short `## Where this leads` with `[[course/chapter]]` links.

Do not write "Claim [[#id]]", "Theorem [[#id]]" or "Definition [[#id]]". Write `[[#id]]` alone. The page prints the label.

## 3. Facts

- A year numeral in the lesson (1000 through 2026, or a BCE year such as 490) must appear in `tools/CHRONOLOGY.md`. If a date is missing, leave it out or say that the date is disputed and give no substitute numeral.
- Do not invent a quotation, a speech, or words "said" by a historical person. Paraphrase, and say that you are paraphrasing.
- Do not invent a casualty total, a population, or a percentage. Quantities in the chronology may be used, with the warning printed beside them there. "Many", "a large part" and "historians disagree" are allowed. A false precision is not.
- Where the chronology says historians disagree, the lesson must say so in the prose, not only in a footnote.
- There is no year 0. The year after 1 BCE is 1 CE. The elapsed count from year A BCE to year B CE is A + B − 1.
- The public timeline prints negative years as BC. The lessons say BCE for the same numbers.
- British spelling (behaviour, modelling, honour, defence, labour). Voice: "we" for the argument, "you" for an instruction to the reader.
- Bold a term on first definition.
- No literal `$` in prose. This is not a finance text. If a sum of money is unavoidable, write "livres" or "pounds" in words.
- No h1. Sections are `##`.
- Original prose. Do not paste a textbook paragraph.
- Link inside the atlas with `[[course/chapter]]`.
- Recent events (Brexit, the full-scale invasion of Ukraine) stay inside the postwar brief. State the dated institutional facts. Say, where the brief says so, that as of 2026 the event is not a closed past. Do not urge a policy.

## 4. Violence, slavery, genocide

These are part of the history and must be taught. Teach them as history: who had power, what the sources show, what the legal or moral categories were, and what is still argued.

Do not describe a killing method, a weapon, or a camp procedure in operational detail. Name the crime, the dates, the evidence, and the scale only as the chronology allows. Do not linger on suffering for effect.

The Atlantic trade in enslaved people is told from the Slave Voyages estimates named in the chronology. It is not the only slave trade in world history. Say so when the brief says so.

## 5. Markup skeleton

```
Opening paragraphs with no heading. The first sentence is the question, not a definition.

## First distinction

:::definition Name {#def-short}
The term, and what it does not mean.
:::

:::theorem The claim in one sentence {#thm-short}
The claim, with its limit in the same block.
:::
:::proof
The evidence, then what would count against the claim.
:::

:::quiz
One question, ending with a question mark.
- [ ] a wrong answer a textbook myth would suggest
- [x] the right answer
- [ ] another wrong answer
:::solution
Why, in a few sentences. The solution stays inside the quiz: do not put a lone ::: between the options and :::solution.
:::
:::

:::example A span of years {#ex-span}
The problem, with every input written out.
:::solution
The steps, ending at the number.
:::
:::

An exercise with a hint needs the hint closed before the solution, and the exercise closed after it:

:::exercise A harder question {level=3}
The problem.
:::hint
The nudge.
:::
:::solution
The answer.
:::
:::

:::widget timeline
start: 1789
end: 1815
window: 2
events: 1789,Bastille; 1792,Republic
caption: Move the year. Say what the reader should notice. Negative years are BCE.
:::

:::warning The usual myth
What people repeat, and why it fails.
:::

:::history
Two or three accurate sentences. No fake quotations.
:::

## Where this leads

One paragraph with [[other/chapter]] links.

:::summary
- Five to eight bullets.
:::

## Exercises

:::exercise A count {level=1 check="43"}
Ask for one number. Say "(Enter the number of years.)" if you set check.
:::solution
Work.
:::
:::
```

Widgets that exist: `timeline`, `series`, `plot`, `distribution`, `graph`, `venn`. Do not invent a type. Do not use a type named `limit`.

```
:::widget series
points: 1801,8892536; 1851,17927609; 1901,32527843
ylabel: people
caption: Move the year. The dot is the nearest recorded figure. The line does not invent a population for the years in between.
:::

:::widget graph
nodes: A; B; C
edges: A-B; B-C
algorithm: none
caption: Drag a node. The edges are the links named in the lesson, not a claim that no other links existed.
:::

:::widget venn
sets: 3
expr: A & B
labels: Citizens; Adults; Men
caption: The shaded region is the intersection named in the lesson.
:::
```

`caption` is allowed on every widget. A caption says what to move and what to notice.

## 6. Check

```
cd /home/c2h2/learn/europe
php tools/check.php <course> --lang=en
```

Fix every ERROR. Clear depth warnings on any lesson you claim is finished. A missing Chinese lesson is expected: pass `--lang=en`.
