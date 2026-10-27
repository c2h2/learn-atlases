A team builds a ward app for nurses to record the medicines they give. The specification came from a meeting with the hospital's pharmacy and IT departments, the app passes every test, and it is fast. Three weeks after launch, the nurses on one ward are writing doses on the backs of their gloves and typing them in at the end of the shift. Nobody asked them to; nobody predicted it. The app needs two free hands and a login on a shared tablet that locks after a minute, and nurses at a bedside have neither free hands nor a minute — they are holding a patient's arm. Nothing in the specification was wrong. It simply described a job that nobody actually does in the way the meeting imagined.

**User-centred design** (UCD) is the discipline of avoiding that outcome: of finding out who will use a system, what they are trying to do, and in what circumstances, *before* and *while* designing it, and of testing designs with those people rather than with the people who built them. [[software-engineering/requirements]] described elicitation — interviews, observation, workshops — from the developer's side. This chapter goes deeper into the human side: what usability means and how it is specified, the human-centred design process, field methods for understanding users and their work, how to analyse what you learn with known reliability, how to describe users and tasks (personas, scenarios, hierarchical task analysis), and the design principles Don Norman distilled from everyday failures.

## What usability is

"Easy to use" is not a requirement anyone can test. The international standard on usability gives the word a definition with three measurable components, each relative to a specific situation.

::: definition Usability {#def-usability}
**Usability** is the extent to which a system, product or service can be used by **specified users** to achieve **specified goals** with **effectiveness**, **efficiency** and **satisfaction** in a **specified context of use** (ISO 9241-11:2018). Here

- **effectiveness** is the accuracy and completeness with which users achieve their goals (for instance, task completion rate and error rate);
- **efficiency** is the resources used in relation to the results achieved (time, effort, cost);
- **satisfaction** is the extent to which the user's physical, cognitive and emotional responses meet their needs and expectations (often measured by questionnaires such as SUS — [[hci/usability-evaluation]]);
- the **context of use** comprises the users, their goals and tasks, the resources available, and the technical, physical, social, cultural and organisational environments.
:::

The definition makes usability a property of a *system in a context*, not of a system alone. An app can be highly usable by a pharmacist at a desk and unusable by a nurse at a bedside. It also makes usability measurable: "a trained nurse shall record a single dose in under 15 seconds with one hand, with no more than 1 recording error in 200 doses" is a verifiable usability requirement in the sense of [[software-engineering/requirements#def-verifiable]].

**User experience** (UX) is a broader term, defined in ISO 9241-210 as a user's perceptions and responses resulting from the use and/or anticipated use of a system — including emotions, beliefs and preferences before, during and after use. Usability is one part of it; trust, pleasure, meaning and the brand around a product are others.

## The human-centred design process

In 1985 John Gould and Clayton Lewis published "Designing for usability: key principles and what designers think" in *Communications of the ACM*. They proposed three principles — **early focus on users and tasks**, **empirical measurement** of use of simulations and prototypes, and **iterative design** — and then surveyed 447 system designers, finding that most of them, when asked how they would design a system, mentioned none or only one of these principles. The principles sound obvious; the survey showed they were not practised. They are now codified in an international standard.

::: definition Human-centred design {#def-hcd}
**Human-centred design** (ISO 9241-210:2019) is an approach to interactive system development that aims to make systems usable and useful by focusing on the users, their needs and requirements, and by applying human factors, usability knowledge and techniques. Its principles are that:

1. the design is based on an explicit understanding of users, tasks and environments;
2. users are involved throughout design and development;
3. the design is driven and refined by user-centred evaluation;
4. the process is iterative;
5. the design addresses the whole user experience;
6. the design team includes multidisciplinary skills and perspectives.

Its four linked activities, repeated until the design meets its requirements, are: **understand and specify the context of use**; **specify the user requirements**; **produce design solutions**; and **evaluate the designs against the requirements**.
:::

The cycle is the same shape as an agile iteration ([[software-engineering/software-process]]) and fits into one well, provided user research and evaluation are part of each iteration rather than a phase at the start. The rest of this chapter covers the first two activities; [[hci/prototyping]] covers the third, and [[hci/usability-evaluation]] and [[hci/experiments]] the fourth.

::: warning "I am a user too, so I know what users want"
Developers are almost never representative users. They know how the system works internally (so its conceptual model is obvious to them), they are usually expert computer users, and they are unusually tolerant of complexity. They also cannot *forget* what they know in order to see the interface as a newcomer does — psychologists call this the **curse of knowledge**. The same caution applies to managers and "power users" who speak for others. Test with people who match the specified users, in their context, and treat your own reactions as hypotheses.
:::

## Understanding users and their work

Field methods differ in what they reveal. A useful division is between what people **say** (interviews, surveys, focus groups) and what they **do** (observation, contextual inquiry, logs and analytics); people's accounts of their own behaviour are systematically incomplete, because much skilled work is tacit and routine, and because people report what they believe they *should* do.

| method | what you learn | typical scale | main weakness |
|---|---|---|---|
| semi-structured interview | goals, motivations, vocabulary, problems | 5–20 people | reports, not behaviour |
| contextual inquiry | real work practice, workarounds, environment | 5–15 sessions | time-consuming, observer effect |
| diary study | behaviour over days or weeks | 10–30 people | burden on participants, drop-out |
| survey | how common attitudes and behaviours are | 100s–1000s | can only ask what you already know to ask |
| analytics and logs | what users actually do in an existing system | everyone | shows *what*, not *why* |

### Interviews

A **semi-structured interview** follows a prepared guide of open questions but lets the interviewer pursue whatever turns out to be interesting. Good interview questions ask about **specific past events** rather than generalisations or hypotheticals ("Tell me about the last time you gave a medicine at night" rather than "How do you usually record doses?" or "Would you use a voice feature?"), are **open** rather than yes/no, and are **neutral** rather than leading. People are poor predictors of their own future behaviour and generous with hypothetical approval, so "would you use…?" questions mostly measure politeness.

::: example Fixing an interview guide {#ex-interview}
A student drafts these questions for parents who use a school's online payment system. Identify the problem with each and rewrite it.

1. "Don't you find the payment page confusing?"
2. "How often do you pay for school trips?"
3. "Would you like the app to remind you about payments?"
4. "Do you use the website or the app?"
::: solution
1. *Leading*: it suggests the expected answer and invites agreement. Rewrite: "Walk me through the last time you paid for something on the school system. What happened?" — then probe at each step ("What did you expect to happen there?").
2. *Generalisation*: people estimate frequencies badly, and the answer will be a guess. Ask about the concrete recent past ("When did you last pay for something? And before that?"), or measure frequency from payment logs, which answer this question far better than any interview.
3. *Hypothetical and leading*: almost everyone says yes to a free feature. Ask about the problem instead: "Have you ever missed a payment deadline? Tell me about it." If missed deadlines are common and painful, reminders may help; the interview has found a need, not validated a solution.
4. *Closed* (yes/no or either/or) and of little use on its own. Ask "Where were you, and what device were you using, the last time you paid?" — the context (a phone at the school gate, on a bus) is the valuable part.
:::
:::

### Contextual inquiry

Hugh Beyer and Karen Holtzblatt's **contextual inquiry** (from their book *Contextual Design*, 1998) combines observation and interview. The researcher watches a person doing their real work in their real place, and asks about it as it happens, adopting the relationship of an **apprentice** learning from a **master** craftsperson. Four principles guide it: **context** (go to where the work is), **partnership** (the participant leads, the researcher follows), **interpretation** (share your interpretations with the participant so they can correct them) and **focus** (know which aspects of the work you are there to study). Contextual inquiry is how one discovers gloves used as notepads: the nurse would not mention it in an interview, because it is not part of how the job is *supposed* to be done.

### Surveys and how many to ask

Surveys measure how *common* something is — once you know what to ask, typically from interviews. Their precision depends on the number of responses, through a standard result of sampling theory ([Maths Atlas: confidence intervals](/learn/maths/lesson.php?c=statistics&l=confidence-intervals)).

::: proposition Margin of error of a proportion {#prop-moe}
Suppose $n$ respondents are a simple random sample from a large population in which a proportion $p$ would answer "yes", and let $\hat p$ be the sample proportion. By the normal approximation to the binomial, an approximate 95% confidence interval for $p$ is $\hat p \pm 1.96\sqrt{\hat p(1-\hat p)/n}$. The half-width (the **margin of error**) is at most $0.98/\sqrt{n}$, and to guarantee a margin of at most $m$ whatever $p$ is, it suffices that

$$
n \ge \left(\frac{1.96}{2m}\right)^2.
$$ {#eq-survey-n}
:::

::: proof
The number of "yes" answers is binomial with mean $np$ and variance $np(1-p)$, so $\hat p$ has mean $p$ and standard deviation $\sqrt{p(1-p)/n}$; for large $n$ it is approximately normal, and $\Prob(\lvert \hat p - p\rvert \le 1.96\,\sigma) \approx 0.95$. The function $p(1-p)$ has derivative $1 - 2p$, which vanishes at $p = 1/2$, where it attains its maximum $1/4$. Hence the margin $1.96\sqrt{p(1-p)/n} \le 1.96 \sqrt{1/(4n)} = 0.98/\sqrt n$, and this is $\le m$ exactly when $n \ge (0.98/m)^2 = (1.96/2m)^2$.
:::

For a margin of $\pm 5$ percentage points, $n \ge (1.96/0.1)^2 = 384.16$, so 385 responses; for $\pm 10$ points, 97. The margin shrinks only with $\sqrt n$: halving it costs four times as many responses.

::: widget plot
f: 100*1.96*sqrt(p*(1-p)/x); 100*0.98/sqrt(x)
x: 10, 1000
y: 0, 30
sliders: p=0.5:0.01:0.99:0.01
labels: \text{margin at } p; \text{worst case } 0.98/\sqrt{n}
caption: The 95% margin of error, in percentage points, against the number of responses $n$, for a true proportion $p$ (first curve) and in the worst case $p = 1/2$ (second curve, [[#prop-moe]]). Move $p$ towards 0 or 1: rare answers are measured more precisely in absolute terms. The curve flattens quickly — going from 400 to 1,000 responses only narrows the margin from about 5 to about 3 points.
:::

::: warning "We had 5,000 responses, so the result is accurate"
[[#prop-moe]] assumes a **random sample**. A survey linked from a product's help page reaches people who visit the help page — disproportionately people having problems — and those who choose to answer are self-selected again. No sample size corrects that bias: 5,000 self-selected responses give a very precise estimate of the wrong quantity. Report how respondents were recruited, the response rate, and how respondents differ from the population, and treat the margin of error as a lower bound on the uncertainty.
:::

### How many interviews?

Qualitative research does not estimate proportions, so the margin of error does not apply; but a related calculation tells you whether you are likely to *meet* a kind of user or problem at all.

::: proposition Chance of observing a pattern {#prop-detect}
Suppose a fraction $p$ of the user population has some need, habit or problem, and you study $n$ users chosen independently at random. The probability that at least one of them has it is

$$
P_n = 1 - (1-p)^n,
$$ {#eq-detect}

and $P_n \ge c$ exactly when $n \ge \ln(1-c) / \ln(1-p)$.
:::

::: proof
Each participant lacks the pattern with probability $1 - p$, independently, so all $n$ lack it with probability $(1-p)^n$, and the complement is $1 - (1-p)^n$. The inequality $1 - (1-p)^n \ge c$ is $(1-p)^n \le 1-c$; taking natural logarithms, $n \ln(1-p) \le \ln(1-c)$, and dividing by $\ln(1-p) < 0$ reverses it.
:::

::: example Interviewing for rare needs {#ex-rare}
About 10% of a bank's customers manage money on behalf of someone else (an elderly parent, say). How many randomly chosen customers must you interview to have a 90% chance of meeting at least one of them? What does this suggest about recruitment?
::: solution
By [[#prop-detect]], $n \ge \ln 0.1 / \ln 0.9 = 21.85$, so $n = 22$: indeed $1 - 0.9^{22} \approx 0.902$ and $1 - 0.9^{21} \approx 0.891$. And one interview with a single carer is hardly enough to understand their needs. So do not rely on random recruitment for important minority groups: **recruit purposively** — deliberately include several carers, several screen-reader users, several people with low literacy — because the purpose of qualitative research is to cover the range of situations, not to measure how common they are. The same formula will reappear in [[hci/usability-evaluation]] as the Nielsen–Landauer model of finding usability problems, with its assumptions examined.
:::
:::

Empirically, Greg Guest, Arwen Bunce and Laura Johnson ("How many interviews are enough?", *Field Methods*, 2006) coded 60 interviews with women in two West African countries and found that most of the codes they eventually used had appeared within the first twelve interviews. They stress that this applies to a fairly homogeneous group asked focused questions; diverse populations and broad questions need more. The honest rule is to keep going until new sessions stop changing what you know (**saturation**), and to cover each distinct user group separately.

## Making sense of what you learn

Field research produces hours of recordings and pages of notes. Two widely used analysis methods turn them into findings.

An **affinity diagram** (from Jiro Kawakita's KJ method) puts each observation on its own note and has the team group the notes *bottom-up* into clusters, name each cluster, and then group the clusters, so that themes emerge from the data rather than from a framework decided in advance. **Thematic analysis** (Virginia Braun and Victoria Clarke, 2006, in *Qualitative Research in Psychology*) is a more formal version: familiarise yourself with the data, generate initial **codes** (short labels for segments of text), search for themes among the codes, review them, define and name them, and write up.

When several analysts code the same material, or when codes will be counted, you need to know whether the codes are applied consistently. Raw percentage agreement overstates reliability, because coders who assign codes at random agree some of the time.

::: definition Cohen's kappa {#def-kappa}
Two coders each assign one of $k$ categories to the same $n$ items. Let $p_o$ be the proportion of items on which they agree, and let $a_j$ and $b_j$ be the numbers of items the first and second coder put in category $j$. The **chance agreement** is $p_e = \sum_j a_j b_j / n^2$, and **Cohen's kappa** is

$$
\kappa = \frac{p_o - p_e}{1 - p_e} \quad (p_e < 1).
$$
:::

::: proposition Interpreting kappa {#prop-kappa}
$\kappa = 1$ if and only if the coders agree on every item. If the coders assign categories independently with fixed marginal frequencies, the expected observed agreement is $p_e$, so $\kappa$ measures agreement beyond chance as a fraction of the maximum possible beyond chance; $\kappa < 0$ means less agreement than chance.
:::

::: proof
$\kappa = 1$ iff $p_o - p_e = 1 - p_e$ iff $p_o = 1$. If the two coders label independently, picking category $j$ with probabilities $a_j/n$ and $b_j/n$, they agree on a given item in category $j$ with probability $(a_j/n)(b_j/n)$; summing over $j$, the expected proportion of agreements is $\sum_j a_j b_j / n^2 = p_e$, giving expected $\kappa = 0$. The numerator $p_o - p_e$ is the agreement achieved beyond chance and the denominator $1 - p_e$ the most that could be achieved beyond chance, so $\kappa$ is their ratio; it is negative iff $p_o < p_e$.
:::

::: example Agreement between coders {#ex-kappa}
Two researchers independently coded 40 excerpts from nurse interviews as *Workaround* (W), *Trust in the system* (T) or *Cost of time* (C). The cross-tabulation (rows: coder 1; columns: coder 2) is

| | W | T | C |
|---|---|---|---|
| **W** | 14 | 2 | 1 |
| **T** | 1 | 9 | 3 |
| **C** | 0 | 2 | 8 |

Compute their percentage agreement and kappa.
::: solution
The diagonal gives $p_o = (14 + 9 + 8)/40 = 31/40 = 0.775$. The row totals are $17, 13, 10$ and the column totals $15, 13, 12$, so $p_e = (17 \cdot 15 + 13 \cdot 13 + 10 \cdot 12)/40^2 = 544/1600 = 0.34$, and

$$
\kappa = \frac{0.775 - 0.34}{1 - 0.34} = \frac{0.435}{0.66} \approx 0.659.
$$

A program to check it:

```python
from collections import Counter

def cohen_kappa(a, b):
    """Cohen's kappa for two coders' labels a[i], b[i] of the same items."""
    n = len(a)
    p_o = sum(x == y for x, y in zip(a, b)) / n          # observed agreement
    ca, cb = Counter(a), Counter(b)
    p_e = sum(ca[k] * cb[k] for k in ca) / n**2          # agreement expected by chance
    return p_o, p_e, (p_o - p_e) / (1 - p_e)

table = {("W", "W"): 14, ("W", "T"): 2, ("W", "C"): 1,
         ("T", "W"): 1,  ("T", "T"): 9, ("T", "C"): 3,
         ("C", "W"): 0,  ("C", "T"): 2, ("C", "C"): 8}
a, b = [], []
for (x, y), k in table.items():
    a += [x] * k
    b += [y] * k
p_o, p_e, kappa = cohen_kappa(a, b)
print(f"n = {len(a)}, observed = {p_o:.3f}, chance = {p_e:.4f}, kappa = {kappa:.3f}")
```

```console
$ python3 kappa.py
n = 40, observed = 0.775, chance = 0.3400, kappa = 0.659
```

Benchmarks such as Landis and Koch's (1977), which call 0.61–0.80 "substantial", are conventions without empirical basis; more useful is to look at *where* coders disagree. Here most disagreements (5 of 9) are between T and C: the two definitions of "trust" and "cost of time" overlap, and the codebook needs a sharper rule ("a complaint about delay is C unless the nurse doubts the recorded data"). Agreement is a tool for improving codes, not a certificate.
:::
:::

## Describing users and tasks

Research findings must be turned into forms that a design team can use every day.

**Personas**, popularised by Alan Cooper in *The Inmates Are Running the Asylum* (1999), are archetypal users described as specific people — a name, a photograph, goals, frustrations, skills and context — synthesised from research. A persona gives a team a shared answer to "who are we designing for?", and replaces the "elastic user" who bends to justify whatever feature someone wants. John Pruitt and Jonathan Grudin ("Personas: practice and theory", 2003) reported that personas were useful at Microsoft mainly as a communication device, and that they work only when grounded in data and kept alive throughout a project; personas invented in a meeting are stereotypes with names. They can also encode bias: if every persona is young, sighted and fluent in English, the team will design for those people only.

**Scenarios** are stories of a persona pursuing a goal in a context, written before the design exists (a *problem scenario*) or describing how a proposed design would be used (an *activity scenario*); John Carroll's *Making Use* (2000) developed scenario-based design. **Journey maps** lay out a user's steps, touchpoints and feelings over a longer episode — buying a house, recovering from an illness — across many systems, showing where the experience breaks.

### Hierarchical task analysis

**Task analysis** describes what users do to achieve their goals, in enough detail to design for it. The most widely used form was introduced by John Annett and Keith Duncan in 1967.

::: definition Hierarchical task analysis {#def-hta}
A **hierarchical task analysis** (HTA) describes a goal as a tree. Each node is a (sub)goal; its children are the subgoals that achieve it, numbered $1, 2, \dots$ (written $1.1, 1.2, \dots$ below goal 1, and so on); and each non-leaf node carries a **plan** stating in which order and under what conditions its children are carried out (in sequence, as needed, in any order, repeated until a condition holds). Decomposition stops when a subgoal is a simple action whose difficulty or risk does not justify further detail.
:::

::: example An HTA for a ticket machine {#ex-hta}
Write a hierarchical task analysis for buying a single train ticket at a station machine, and use it to find design problems.
::: solution
```text
0. Buy a single ticket to a destination
   Plan 0: do 1-2-3-4 in order; if the payment fails, repeat 3 or abandon.
   1. Choose the destination
      Plan 1: do 1.1; if the destination is not listed, do 1.2 then 1.1.
      1.1 Select the destination from the list of popular stations
      1.2 Search for the destination by typing its name
   2. Choose the ticket
      Plan 2: do 2.1-2.2-2.3 in order.
      2.1 Choose single or return
      2.2 Choose the ticket type (off-peak, anytime, advance)
      2.3 Add a railcard discount, if held
   3. Pay
      Plan 3: do 3.1 or 3.2.
      3.1 Pay by card (insert or tap; enter PIN if asked)
      3.2 Pay by cash (insert coins and notes; take change)
   4. Collect the ticket (and receipt; and card, if inserted)
```

Walking through the tree raises questions a feature list would not. Step 2.2 asks travellers to choose a fare type, which requires knowledge of fare rules most occasional travellers lack — so the machine should explain the options in terms of *their* journey ("valid on trains after 09:30") or default to the cheapest valid one. Step 2.3 comes *after* the fare is chosen, so a railcard holder only learns the discounted price at the end, and may have chosen a different fare had they known. Step 4 hides the classic **post-completion error**: once the goal "buy a ticket" is achieved, people forget the subsidiary step "take my card" — which is why well-designed machines return the card *before* dispensing the ticket. The structure also suggests measurable usability requirements: for instance, 90% of first-time users should complete goal 0 within 90 seconds.
:::
:::

## Design principles from everyday things

Don Norman's *The Design of Everyday Things* (first published in 1988 as *The Psychology of Everyday Things*, revised and expanded 2013) explains why people struggle with doors, taps, stoves and software alike, and distils the explanation into a handful of principles.

::: definition Norman's design principles {#def-norman}
- An **affordance** is a relationship between the properties of an object and the capabilities of an agent that determines how the object could be used: a flat plate affords pushing, a knob affords turning. The term comes from James Gibson's ecological psychology (1977, 1979).
- A **signifier** is a perceivable signal of where and how to act: a handle's shape, a label, an underlined link, an icon on a button. Norman introduced the term in the 2013 edition because designers had come to say "affordance" when they meant "signifier".
- A **mapping** is the relationship between controls and their effects; a **natural mapping** uses spatial analogy or cultural standards so that it needs no label.
- **Feedback** communicates the result of an action, immediately and informatively.
- **Constraints** — physical, cultural, semantic and logical — limit the possible actions so that the wrong ones are impossible or unlikely.
- A good **conceptual model** of the system, conveyed through its system image, lets users predict the effects of their actions.
:::

The famous **Norman door** — one whose design signals the wrong action, typically a pull handle on a door that must be pushed — is a failure of signifiers: the door affords both actions, but its handle signifies only one, and the wrong one. A "PUSH" sign is a symptom: when a simple thing needs a label, its design has failed. In software, the "flat design" fashion of the 2010s removed many signifiers (borders around buttons, underlines on links), and users had to discover by trial which elements were interactive.

::: example Mapping the burners of a stove {#ex-stove}
A cooker has four burners in a $2 \times 2$ square and four knobs in a row along the front. How many ways are there to assign knobs to burners, and how would you make the right one obvious?
::: solution
Any bijection from knobs to burners is possible, so there are $4! = 24$ mappings, and with knobs in a row and burners in a square none of them is natural: users must learn the mapping from labels or by trial — often by burning something. Natural mappings remove the ambiguity: arrange the knobs in the same $2 \times 2$ pattern as the burners, or stagger the burners from left to right so that the knob order matches the left-to-right order of the burners, or place each knob next to its burner. Labels are a fall-back with a cost: each use requires reading and translating.
:::
:::

::: quiz
A file-sharing app shows a cloud icon beside each file. Some users think tapping it uploads the file; others think it shows that the file is already stored online. In Norman's terms, what has gone wrong?
- [ ] The icon lacks an affordance.
- [x] The icon is an ambiguous signifier: it does not signal whether it is a control or a status indicator.
- [ ] The app lacks a constraint that would prevent tapping.
- [ ] The feedback after tapping is too slow.
::: solution
An icon on a touch screen affords tapping no matter what it looks like — every pixel does. What the users lack is a clear **signifier** of what kind of thing the icon is and what tapping would do. Remedies: distinguish status indicators visually from controls (a control looks pressable and has a label or accessible name such as "Upload"), change the icon with the state (a cloud with a tick once uploaded) and give **feedback** when the state changes.
:::
:::

These principles help with *diagnosis* — why did people struggle? — but they do not replace observation of real users: a designer can satisfy every principle and still build the wrong thing. They reappear as Nielsen's usability heuristics in [[hci/usability-evaluation]], and Norman's gulfs of execution and evaluation, which describe the gap between what users want to do and what the system lets them do, are treated in [[hci/interaction-techniques]].

## From research to requirements

Research is only useful if it changes what is built. The outputs of this chapter feed directly into requirements engineering: personas and scenarios become the *roles* and *benefits* of user stories; hierarchical task analyses become use cases and their extensions; observed problems become measurable usability requirements ([[#def-usability]]); and findings about the context of use — one-handed, noisy, interrupted, shared devices — become constraints. In the ward-app example, the observations "both hands are busy" and "the tablet is shared and locks" lead to requirements such as "a dose can be recorded with one hand by scanning the patient's wristband and the medicine", "recording a dose requires no login beyond a badge tap", and "a nurse who is interrupted mid-entry can resume within 10 minutes without re-entering data". No amount of testing against the original specification would have produced them.

::: history
Human factors began in the Second World War, when Alphonse Chapanis and others traced many aircraft accidents to cockpit controls that were easy to confuse — identical levers for flaps and landing gear — and solved them by shape coding. Henry Dreyfuss's *Designing for People* (1955) brought anthropometric data to industrial design. In computing, John Gould and Clayton Lewis's 1985 article set out the principles of early focus on users, empirical measurement and iterative design; Don Norman and Stephen Draper's edited book *User Centered System Design* (1986) named the approach; and Norman's *The Psychology of Everyday Things* (1988) gave it a popular voice. Hugh Beyer and Karen Holtzblatt's *Contextual Design* (1998), Alan Cooper's personas (1999) and John Carroll's scenario-based design (2000) gave practitioners methods. ISO 13407 (1999) standardised human-centred design; it was replaced by ISO 9241-210 in 2010 and revised in 2019, and the usability definition of ISO 9241-11 (1998) was revised in 2018.
:::

## Where this leads

Understanding users is the first step; [[hci/prototyping]] turns that understanding into designs cheap enough to throw away, and [[hci/usability-evaluation]] checks them with users. The precise measurement of effectiveness, efficiency and satisfaction is the subject of [[hci/experiments]], and the requirement that "specified users" include disabled people is developed in [[hci/accessibility-ethics]]. The software side of the same work — writing requirements down, tracing them to tests — is in [[software-engineering/requirements]].

::: summary
- **Usability** ([[#def-usability]]) is effectiveness, efficiency and satisfaction for specified users, goals and context; it is measurable and context-dependent. UX is broader.
- **Human-centred design** ([[#def-hcd]]) rests on early focus on users, involvement throughout, evaluation-driven iteration and a multidisciplinary team (Gould and Lewis 1985; ISO 9241-210:2019).
- Combine methods that show what people **say** and what they **do**; ask about specific past events, not hypotheticals; contextual inquiry reveals tacit practice and workarounds.
- Survey margins of error shrink like $1/\sqrt n$ ([[#prop-moe]]) but only for random samples; $1 - (1-p)^n$ ([[#prop-detect]]) shows why rare user groups must be recruited deliberately.
- Analyse qualitative data with affinity diagrams or thematic analysis; check coding reliability with **Cohen's kappa** ([[#def-kappa]]), and use disagreements to sharpen codes.
- Describe users with research-based **personas** and **scenarios**, and work with **hierarchical task analysis** ([[#def-hta]]) to find problems such as post-completion errors.
- Norman's principles — affordances, **signifiers**, mappings, feedback, constraints and conceptual models ([[#def-norman]]) — diagnose everyday design failures.
:::

## Exercises

::: exercise Responses needed {level=1 check="97"}
How many responses does a simple random sample need to guarantee a 95% margin of error of at most 10 percentage points, whatever the true proportion? (Enter the smallest whole number.)
::: solution
By [[#eq-survey-n]], $n \ge (1.96/0.2)^2 = 96.04$, so $n = 97$.
:::
:::

::: exercise Classify the measure {level=1}
Classify each measure as effectiveness, efficiency or satisfaction ([[#def-usability]]): (a) the percentage of participants who booked the correct appointment; (b) mean time to book; (c) a questionnaire score; (d) the number of errors per task; (e) the number of clicks per booking; (f) the proportion of participants who say they would use the system again.
::: solution
(a) Effectiveness (completeness and accuracy of goal achievement). (b) Efficiency (time per result). (c) Satisfaction. (d) Effectiveness (accuracy) — errors that are recovered from also cost time, so they affect efficiency too. (e) Efficiency (effort per result), though clicks are a weak proxy: three easy clicks can beat one hard one. (f) Satisfaction (a stated attitude), not a measure of actual future use.
:::
:::

::: exercise Kappa from counts {level=1 check="0.6"}
Two coders classify 100 comments as positive or negative. They agree on 80. Coder 1 calls 50 positive and coder 2 calls 50 positive. What is Cohen's kappa? (Enter the number.)
::: solution
$p_o = 0.8$ and $p_e = (50 \cdot 50 + 50 \cdot 50)/100^2 = 0.5$, so $\kappa = (0.8 - 0.5)/(1 - 0.5) = 0.6$ ([[#def-kappa]]).
:::
:::

::: exercise Detecting a rare need {level=2 check="14"}
Twenty per cent of users of a travel app book on behalf of a group. How many randomly recruited participants do you need for at least a 95% chance that at least one of them does so? (Enter the smallest whole number.)
::: solution
By [[#prop-detect]], $n \ge \ln 0.05 / \ln 0.8 \approx 13.4$, so $n = 14$; check: $1 - 0.8^{14} \approx 0.956$ and $1 - 0.8^{13} \approx 0.945$. Better still, recruit several group bookers deliberately.
:::
:::

::: exercise An HTA for a password reset {level=2}
Write a hierarchical task analysis, with plans, for resetting a forgotten password on a website by e-mail, and identify two places where users commonly fail.
::: solution
```text
0. Regain access to the account
   Plan 0: do 1-2-3-4; if the e-mail does not arrive within a few minutes, do 5.
   1. Request a reset
      1.1 Find the "Forgot password?" link
      1.2 Enter the e-mail address or username
   2. Retrieve the reset e-mail
      Plan 2: do 2.1; if not found, do 2.2.
      2.1 Switch to the mail program and open the message
      2.2 Look in the spam folder
   3. Set a new password
      3.1 Follow the link (before it expires)
      3.2 Enter a new password meeting the rules (and confirm it)
   4. Sign in with the new password
   5. Contact support
```

Typical failures: at 1.2, users who have several addresses do not know which one the account uses, and good designs accept either address or username and never reveal whether an account exists (a security requirement); at 2, switching devices or apps loses context, and the message lands in spam; at 3.1, links expire or are opened on a different device; at 3.2, rules are revealed only after a rejected attempt — show them in advance; and at 4, some sites do not sign the user in automatically after the reset, adding a needless step.
:::
:::

::: exercise Signifier or affordance? {level=2}
For each, say whether the problem lies mainly in affordances, signifiers, mapping, feedback or constraints, and suggest a fix: (a) a light switch panel with six identical switches for six lights in a room; (b) a "Save" button that does nothing visible when pressed; (c) a date field that accepts "31/02/2026"; (d) a scrollable list whose last visible row is cut exactly at a row boundary, so users do not realise it scrolls.
::: solution
(a) **Mapping**: identical switches in a row give no clue which light each controls; arrange them in a plan of the room, or label them. (b) **Feedback**: show a confirmation ("Saved 10:42"), or change the button state. (c) Missing **constraint**: a date picker or validation that makes impossible dates impossible to enter, with an explanation. (d) Missing **signifier**: show a partial row, a scrollbar or a fade at the edge to signal that more content exists.
:::
:::

::: exercise Why percentage agreement misleads {level=3}
Two coders label 100 support tickets as "urgent" or "not urgent". Each labels 90 as "not urgent". (a) Show that if they labelled independently at those rates their expected percentage agreement would be 82%. (b) They actually agree on 84 tickets. Compute kappa and comment. (c) Prove that for two categories with both coders having the same marginal proportion $q$ of the first category, $p_e = q^2 + (1-q)^2 \ge 1/2$, so percentage agreement of at least 50% can always be achieved by chance.
::: solution
(a) $p_e = 0.1 \times 0.1 + 0.9 \times 0.9 = 0.01 + 0.81 = 0.82$. (b) $\kappa = (0.84 - 0.82)/(1 - 0.82) = 0.02/0.18 \approx 0.11$. Although 84% agreement sounds high, it is barely above chance: the coders almost never agree on *which* tickets are urgent, which is the only thing that matters. (c) $q^2 + (1-q)^2 = 2q^2 - 2q + 1 = 2(q - \tfrac12)^2 + \tfrac12 \ge \tfrac12$, with equality iff $q = 1/2$. So two coders with equal marginals agree by chance at least half the time, and more when one category dominates — exactly the situation of rare but important categories. Report kappa (or a related chance-corrected index) and the confusion table, not raw agreement.
:::
:::

::: exercise A field study plan {level=3}
You are asked to redesign the app that delivery drivers use to record parcel deliveries. Write a research plan: which methods, which participants and how many, what you will look for, how you will analyse the data, and what deliverables you will hand to the design team. Justify each choice using this chapter.
::: solution
A good plan includes: (1) **Contextual inquiry** — ride along with 6–10 drivers on real rounds ([[#def-hcd]], principle 1), chosen purposively to cover routes (urban flats, rural houses), experience (new and veteran), devices and any drivers with relevant impairments or limited English ([[#ex-rare]]); observe one-handed use, gloves, rain and glare, time pressure, and workarounds such as photos in personal phones. (2) **Short interviews** at the end of each shift about specific events ("tell me about the last failed delivery"), avoiding hypotheticals ([[#ex-interview]]). (3) **Logs** from the existing app for frequencies — how often each screen is used, where drivers back out, time per delivery — because these are what logs measure well. (4) Optionally a **survey** of all drivers later, to measure how common the problems found are, with the sampling caveats of [[#prop-moe]]. Analysis: affinity diagramming of observation notes as a team, then a codebook applied by two researchers to a subset with kappa computed and disagreements resolved ([[#def-kappa]]). Deliverables: 2–4 research-based personas, problem scenarios, an HTA of a delivery including exceptions ([[#def-hta]]), a list of observed problems ranked by frequency and severity, and measurable usability requirements ("record a delivery with one gloved hand in under 10 seconds"). Ethics: informed consent, no recording of customers without permission, and an assurance that findings will not be used to rate individual drivers.
:::
:::
