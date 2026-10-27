A team tests its new booking site with five users, as a well-known rule of thumb recommends. Four of the five complete every task; the team fixes the three problems they saw and ships. Within a week, support calls show that a large share of real customers cannot change a booking — a task none of the five test users happened to attempt in the way customers do, and a problem that only appears for people with more than one booking. Was five users the wrong number? Partly. The "five users" rule rests on a mathematical model with assumptions — that every problem is equally easy to find, that the tasks cover what people actually do, that the test users are like the real ones — and when those assumptions fail, the rule fails with them.

**Usability evaluation** is the systematic assessment of how well an interface supports its users, and the search for the problems that stop it doing better. This chapter covers the two great families of methods: **inspection** methods, in which experts examine a design without users — Nielsen's heuristic evaluation and the cognitive walkthrough — and **usability testing**, in which representative users attempt real tasks while we observe. We then take the quantitative questions seriously: how to report a task success rate from nine participants, how many participants a test needs according to the Nielsen–Landauer model and why that model is optimistic, and how to score and interpret the System Usability Scale. Controlled comparisons between designs, with their statistics, are the subject of [[hci/experiments]].

## Kinds of evaluation

::: definition Formative and summative evaluation {#def-formative}
**Formative** evaluation is done during design to find and understand problems so that they can be fixed; its main output is a list of problems with their causes and severities. **Summative** evaluation measures how good a design is, usually against a requirement or a competitor; its main output is measurements — success rates, times, errors, satisfaction scores — with their uncertainty.
:::

The same method can serve either purpose, but the design of the study differs: a formative test changes the tasks and even the prototype between sessions when a problem is obvious; a summative one fixes everything in advance so that the numbers mean something. Most of the problems in practice come from confusing the two — computing averages from a formative test with three participants, or running a large summative test before the design has had any formative testing.

Methods also differ in who supplies the judgement. **Analytic** (inspection) methods rely on experts and models: heuristic evaluation, cognitive walkthroughs, and the predictive models of [[hci/interaction-techniques]]. **Empirical** methods rely on users: usability tests, field studies and analytics. Inspections are fast and cheap and need no recruitment; they find problems that experts can recognise, and they miss problems that depend on what real users know and want.

## Heuristic evaluation

Jakob Nielsen and Rolf Molich introduced **heuristic evaluation** in 1990: a small number of evaluators independently examine an interface and judge its compliance with a short list of recognised usability principles, the **heuristics**. Nielsen refined the list in 1994 by factor-analysing a large set of usability problems.

::: definition Nielsen's ten usability heuristics {#def-heuristics}
1. **Visibility of system status** — keep users informed about what is going on, with appropriate feedback within reasonable time.
2. **Match between system and the real world** — speak the users' language and follow real-world conventions.
3. **User control and freedom** — provide clearly marked exits, undo and redo.
4. **Consistency and standards** — the same words and actions should mean the same thing; follow platform conventions.
5. **Error prevention** — eliminate error-prone conditions or ask for confirmation before committing.
6. **Recognition rather than recall** — make objects, actions and options visible; do not make users remember information between screens.
7. **Flexibility and efficiency of use** — provide accelerators for experts that novices need not see.
8. **Aesthetic and minimalist design** — do not show information that is irrelevant or rarely needed.
9. **Help users recognise, diagnose and recover from errors** — express error messages in plain language, indicate the problem precisely and suggest a solution.
10. **Help and documentation** — make any necessary help easy to search, focused on the user's task, and concrete.
:::

Many heuristics restate principles met earlier: visibility and feedback ([[hci/user-centred-design#def-norman]]), recognition over recall ([[hci/human-factors]]), and accelerators that novices can grow into ([[hci/interaction-techniques#prop-breakeven]]). The procedure matters as much as the list. Each evaluator inspects the interface alone, usually twice — once to get a feel for the flow, once to examine each element — and records each problem with the heuristic it violates, where it occurs and why it is a problem. Only then are the lists merged, duplicates removed, and each problem rated for severity.

::: definition Severity rating {#def-severity}
In Nielsen's scale the **severity** of a usability problem is rated from 0 to 4: 0, not a usability problem; 1, cosmetic only — fix if time allows; 2, minor — low priority; 3, major — important to fix; 4, catastrophe — must be fixed before release. Raters consider the problem's **frequency** (how many users meet it), **impact** (how hard it is to overcome) and **persistence** (whether users overcome it once or are bothered repeatedly).
:::

::: example A heuristic evaluation of a checkout {#ex-heuristic}
A checkout page has these features: (i) after "Place order" is clicked, the button does nothing visible for six seconds while payment is authorised; (ii) the error "Error 402: invalid input" appears at the top of the page when a card is declined; (iii) the delivery-date field requires the format `YYYY-MM-DD`; (iv) there is no way back to the basket except the browser's back button, which empties the form; (v) the order summary uses "Qty" on one screen and "Amount" on another. List the problems with the heuristics they violate and a severity.
::: solution
| problem | heuristic | severity |
|---|---|---|
| (i) no feedback during a 6-s wait; users click again and may order twice | 1 visibility of system status; 5 error prevention | 4 — duplicate payments are costly and common |
| (ii) declined card reported as a cryptic code far from the card field | 9 recover from errors; 2 match the real world | 3 — users cannot tell what to do |
| (iii) rigid date format | 5 error prevention; 2 match | 2 — irritating, recoverable; use a date picker or accept common formats |
| (iv) no exit to the basket without losing data | 3 user control and freedom | 3 — users abandon rather than retype |
| (v) inconsistent label for quantity | 4 consistency and standards | 1 — cosmetic, but cheap to fix |

The ratings are judgements; another evaluator might rate (iii) a 3 for an audience unfamiliar with ISO dates. The fixes for (i) are both a visible "Processing payment…" state and disabling the button — and, on the server, idempotent order submission, since no interface change fully prevents double submission ([[distributed-systems]] discusses idempotency).
:::
:::

How many evaluators? Individual evaluators find only a fraction of the problems, and different evaluators find different ones, so aggregating several pays. Nielsen recommended three to five. But the agreement between evaluators is lower than practitioners tend to assume: Morten Hertzum and Niels Jacobsen ("The evaluator effect: a chilling fact about usability evaluation methods", *International Journal of Human–Computer Interaction*, 2001) reviewed eleven studies of heuristic evaluation, cognitive walkthrough and think-aloud testing and found that the average agreement between any two evaluators analysing the *same* sessions or interface ranged from 5% to 65%. Which problems a study reports depends substantially on who is looking. The practical response is to use several evaluators, define problems carefully, and treat any single list of problems as a sample, not the truth.

## Cognitive walkthrough

Heuristic evaluation looks at an interface as a whole; the **cognitive walkthrough** (Cathleen Wharton, John Rieman, Clayton Lewis and Peter Polson, 1994) looks at it through the eyes of a first-time user performing a specific task, step by step. It is grounded in a theory of exploratory learning: novices choose the action whose label best matches their current goal.

::: definition Cognitive walkthrough {#def-walkthrough}
Given a user profile, a task, and the correct sequence of actions to complete it, a **cognitive walkthrough** asks four questions at every action:

1. Will the user try to achieve the right effect? (Does their goal at this point lead them to want this action's effect?)
2. Will the user notice that the correct action is available?
3. Will the user associate the correct action with the effect they are trying to achieve?
4. If the correct action is performed, will the user see that progress is being made towards the task?

Each "no" is recorded as a **failure story** — a plausible reason why the user would fail — and is a usability problem.
:::

::: example Walking through a smart-speaker setup {#ex-walkthrough}
A new smart speaker is set up through a phone app. The correct steps for a first-time user are: (1) open the app and tap the "+" icon in the top corner; (2) choose "Add device"; (3) hold the speaker's top button for 5 seconds until the light ring turns orange; (4) select the home Wi-Fi network and enter its password. Walk through the task for a user who has never used a smart-home app.
::: solution
**Step 1**, tap "+". Q1: yes — the user wants to add the speaker. Q2: doubtful — a small icon in a corner, and the app opens on an empty "Rooms" screen; the user may look for "Set up speaker" in the menus. Q3: "+" plausibly means "add", so if noticed, yes. Q4: yes, a menu opens. *Failure story*: the user does not notice the "+"; fix by showing a prominent "Set up a new device" button when the home is empty.

**Step 2**, "Add device". Q1–Q4: yes, the label matches the goal.

**Step 3**, hold the button for 5 s. Q1: no — the user's goal is to set up the speaker *in the app*; nothing in their goal suggests doing something to the speaker. Q2: only if the app says so. Q3: a 5-second hold is not discoverable; a short press does something else (pause). Q4: the orange light is the only feedback, and the user must know orange means "ready". *Failure story*: the user waits for the app to find the speaker; fix with an illustrated instruction in the app ("Press and hold the top button until the light turns orange"), a countdown, and the app confirming "Speaker found" when it detects it.

**Step 4**, Wi-Fi. Q1: yes. Q2: yes. Q3: yes, if the list shows the user's network name; it fails for a network that is hidden or on 5 GHz only, if the speaker supports only 2.4 GHz — a domain problem worth an explicit message. Q4: a progress indicator is needed; connection takes tens of seconds.

The walkthrough found the two classic problems of setup flows — an invisible entry point and a step that happens outside the interface — without any participant.
:::
:::

## Usability testing

In a **usability test**, representative users attempt realistic tasks with the system while an observer records what happens. The method is old and simple and remains the most informative evaluation technique available.

::: definition Usability test {#def-usability-test}
A **usability test** consists of **participants** recruited to match the specified users; **tasks** that reflect their real goals, phrased without interface vocabulary ("You want to see a dentist next week; book an appointment", not "Use the Booking menu"); a **moderator** who introduces the session, gives tasks and prompts without helping; and **measures** — task success, time on task, errors, and observations of difficulties, often collected with the **think-aloud** protocol, in which participants say what they are thinking as they work.
:::

The think-aloud method comes from K. Anders Ericsson and Herbert Simon's work on verbal protocols (*Psychological Review*, 1980; *Protocol Analysis*, 1984/1993), which argued that *concurrent* verbalisation of what is already in attention changes the thought process little, whereas *explanations* ("why did you do that?") demanded during a task alter it. Usability practitioners usually use a more relaxed, conversational version; Ted Boren and Judith Ramey (*IEEE Transactions on Professional Communication*, 2000) described practice and proposed a principled middle ground, with the moderator acknowledging rather than questioning. Tests can be **moderated** (in person or remotely) or **unmoderated** (participants record themselves with an online tool); unmoderated tests scale cheaply but lose the ability to probe.

Testing involves people, so it is subject to research ethics: **informed consent** (what will happen, what is recorded, how data will be used and stored, the right to stop at any time without penalty), protection of personal data, and care not to distress participants — people blame themselves when they fail, so moderators tell them, and mean it, that the system is being tested, not them.

::: warning "Ask users what they want and do what they say"
In a test, observe **behaviour** first and treat opinions with care. Participants often rate a system they struggled with as easy (they blame themselves, or want to please the moderator), suggest solutions that would not solve their problem, and predict their future behaviour poorly. The most reliable data are what participants *did*: where they looked, what they clicked, where they hesitated, what they said they expected. Ask "what did you expect to happen?" rather than "how would you improve this?", and translate observed difficulties into design changes yourself.
:::

### Reporting success rates from small samples

A summative test reports, for each task, the proportion of participants who succeeded. With small $n$ the uncertainty is large and the usual textbook interval misbehaves.

::: definition Adjusted Wald interval {#def-adjusted-wald}
For $x$ successes in $n$ trials, the **Wald** 95% interval is $\hat p \pm 1.96\sqrt{\hat p(1-\hat p)/n}$ with $\hat p = x/n$. The **adjusted Wald** (Agresti–Coull) interval adds $z^2/2 \approx 1.92$ successes and $z^2/2$ failures before computing it: with $\tilde n = n + z^2$ and $\tilde p = (x + z^2/2)/\tilde n$,

$$
\tilde p \pm z\sqrt{\frac{\tilde p (1 - \tilde p)}{\tilde n}}, \qquad z = 1.96,
$$

truncated to $[0, 1]$.
:::

Alan Agresti and Brent Coull (*The American Statistician*, 1998) showed that the plain Wald interval's actual coverage can fall far below 95% for small $n$ or $p$ near 0 or 1, and that the adjusted interval comes much closer; Jeff Sauro and James Lewis (2005) recommended it for usability tests after simulations with the small samples and high success rates typical of the field. The plain Wald interval for 9 successes out of 9 is the absurd $[1, 1]$.

::: example Nine participants {#ex-success-ci}
In a summative test, 7 of 9 participants completed the "change booking" task. Give a 95% interval for the success rate in the user population, and compare with the plain Wald interval. Do the same for 9 of 9 and 4 of 5.
::: solution
```python
from math import sqrt

def adjusted_wald(x, n, z=1.96):
    """Adjusted Wald (Agresti-Coull) interval for a proportion x/n."""
    n_adj = n + z * z
    p_adj = (x + z * z / 2) / n_adj
    half = z * sqrt(p_adj * (1 - p_adj) / n_adj)
    return max(0.0, p_adj - half), min(1.0, p_adj + half)

def wald(x, n, z=1.96):
    p = x / n
    half = z * sqrt(p * (1 - p) / n)
    return max(0.0, p - half), min(1.0, p + half)

for x, n in [(7, 9), (9, 9), (4, 5)]:
    lo, hi = adjusted_wald(x, n)
    wl, wh = wald(x, n)
    print(f"{x}/{n}: adjusted Wald {lo:.3f}-{hi:.3f}   plain Wald {wl:.3f}-{wh:.3f}")
```

```console
$ python3 wald.py
7/9: adjusted Wald 0.443-0.947   plain Wald 0.506-1.000
9/9: adjusted Wald 0.655-1.000   plain Wald 1.000-1.000
4/5: adjusted Wald 0.360-0.980   plain Wald 0.449-1.000
```

For 7/9: $\tilde n = 9 + 3.8416 = 12.8416$, $\tilde p = 8.9208/12.8416 \approx 0.695$, half-width $1.96\sqrt{0.695 \times 0.305/12.84} \approx 0.252$, giving about 44% to 95%. Even "everyone succeeded" with 9 participants is compatible with a true success rate as low as about 66%. Small tests are excellent at finding problems and poor at measuring rates — report the interval, not "78% success", and do not compare two designs' rates from such samples without the methods of [[hci/experiments]].
:::
:::

## How many participants? The Nielsen–Landauer model

Formative tests aim to find problems, and each additional participant finds fewer new ones. Jakob Nielsen and Thomas Landauer ("A mathematical model of the finding of usability problems", INTERCHI 1993) modelled this.

::: definition Nielsen–Landauer model {#def-nielsen-landauer}
An interface has $N$ usability problems. Each participant (or evaluator) independently detects each problem with the same probability $\lambda$. The expected number of distinct problems found by $n$ participants is

$$
\text{Found}(n) = N\bigl(1 - (1 - \lambda)^n\bigr).
$$ {#eq-nielsen-landauer}
:::

::: proposition Diminishing returns {#prop-diminishing}
Under the model of [[#def-nielsen-landauer]], the $n$-th participant finds on average $N\lambda(1 - \lambda)^{n-1}$ new problems, a geometrically decreasing sequence, and the smallest $n$ for which the expected proportion found is at least $c$ is $\lceil \ln(1 - c)/\ln(1 - \lambda) \rceil$.
:::

::: proof
A problem is undetected by $n$ independent participants with probability $(1 - \lambda)^n$, so by linearity of expectation the expected number found is $N(1 - (1-\lambda)^n)$. The increment from $n - 1$ to $n$ participants is $N[(1-\lambda)^{n-1} - (1 - \lambda)^n] = N\lambda(1 - \lambda)^{n-1}$. The proportion condition $1 - (1 - \lambda)^n \ge c$ rearranges as in [[hci/user-centred-design#prop-detect]], which is the same formula applied to problems instead of user groups.
:::

Across eleven studies, Nielsen and Landauer estimated $\lambda$ values averaging 0.31. With $\lambda = 0.31$, five participants find on average $1 - 0.69^5 \approx 84\%$ of the problems, which is the source of Nielsen's widely quoted advice ("Why you only need to test with 5 users", 2000) — advice that, it is often forgotten, recommended *several small tests* with fixes in between, not one test of five users.

::: widget plot
f: 100*(1 - (1 - L)^x)
x: 0, 20
y: 0, 100
sliders: L=0.31:0.02:0.8:0.01
labels: \text{expected \% of problems found}
hlines: 85
vlines: 5
caption: The Nielsen–Landauer curve [[#eq-nielsen-landauer]] as a percentage of all problems, against the number of participants, for detection probability $\lambda$ (slider $L$). At $\lambda = 0.31$ five participants reach about 84%. Move $L$ to 0.1 and five participants find only 41%; reaching 85% needs 19. The whole argument hangs on $\lambda$.
:::

### What the model assumes, and how it fails

The model's conclusions are only as good as four assumptions, all of which are often false.

1. **Equal detectability.** All problems have the same $\lambda$. In reality some problems hit almost everyone and some only a few people.
2. **Independence.** Participants detect problems independently. Participants recruited from the same group and given the same tasks tend to fail in the same places.
3. **Fixed set.** $N$ is fixed and well defined. But which problems exist depends on the **tasks** given and the **participants** recruited: no number of participants finds a problem in a task nobody is asked to do, or one that only affects screen-reader users if none is recruited.
4. **Known $\lambda$.** $\lambda$ can be estimated from the study itself. Estimated naively it is biased upwards, because problems that nobody found do not appear in the data.

The first assumption fails in a direction we can prove.

::: proposition Heterogeneity makes the model optimistic {#prop-heterogeneity}
Suppose problem $i$ has its own detection probability $p_i$, and let $\bar p = \frac1N \sum_i p_i$. Then the expected proportion found by $n \ge 1$ participants satisfies

$$
\frac1N \sum_{i=1}^{N} \bigl(1 - (1 - p_i)^n\bigr) \le 1 - (1 - \bar p)^n,
$$

with equality for $n \ge 2$ only if all $p_i$ are equal. So the homogeneous model with the average detection rate overestimates the proportion of problems found.
:::

::: proof
The function $g(p) = (1 - p)^n$ is convex on $[0, 1]$ for $n \ge 1$, since $g''(p) = n(n-1)(1-p)^{n-2} \ge 0$, and strictly convex for $n \ge 2$. By Jensen's inequality, $\frac1N \sum_i g(p_i) \ge g(\bar p)$, with equality under strict convexity only if all $p_i$ are equal. Subtracting both sides from 1 gives the claim.
:::

::: example How optimistic is the model? {#ex-nl-sim}
Simulate an interface with 200 problems whose detection probabilities vary (drawn from a beta distribution with mean about 0.31, so that most problems are hard to find and a few are very easy). Compare the share that 5 participants actually find with the homogeneous model's prediction, and see what happens when $\lambda$ is estimated from the 5-participant data as testers usually do — the mean proportion of participants who found each *observed* problem.
::: solution
```python
import random
from statistics import mean

rng = random.Random(2026)
N = 200                                     # problems in the interface
# Heterogeneous detectabilities with mean about 0.31: many hard problems, a few easy ones.
p = [rng.betavariate(0.62, 1.38) for _ in range(N)]
print(f"mean detectability {mean(p):.3f}")

def study(n):
    """Simulate one test with n users: detection counts per problem."""
    return [sum(rng.random() < pi for _ in range(n)) for pi in p]

n = 5
found_true = mean(1 - (1 - pi) ** n for pi in p)        # expected share found by n users
print(f"homogeneous model 1-(1-{mean(p):.2f})^5 = {1 - (1 - mean(p)) ** n:.3f}")
print(f"heterogeneous truth E[1-(1-p)^5]      = {found_true:.3f}")

estimates, shares = [], []
for _ in range(1000):
    counts = study(n)
    seen = [c for c in counts if c > 0]
    estimates.append(mean(c / n for c in seen))          # naive estimate of lambda
    shares.append(len(seen) / N)
lam = mean(estimates)
print(f"naive lambda estimate from 5-user studies: {lam:.3f}")
print(f"model then claims 5 users found {1 - (1 - lam) ** n:.3f}; they found {mean(shares):.3f}")
```

```console
$ python3 nl.py
mean detectability 0.314
homogeneous model 1-(1-0.31)^5 = 0.848
heterogeneous truth E[1-(1-p)^5]      = 0.644
naive lambda estimate from 5-user studies: 0.488
model then claims 5 users found 0.965; they found 0.643
```

Two errors compound. Heterogeneity alone ([[#prop-heterogeneity]]) lowers the true share found from the model's 85% to 64%. And the naive estimate of $\lambda$ from the five-user data is 0.49, not 0.31, because the 36% of problems nobody found are invisible to it; plugging it into the model, the team would believe it had found 97% of the problems. James Lewis (2001, *International Journal of Human–Computer Interaction*) analysed this small-sample inflation and proposed corrections; the simulation shows why they are needed. (The beta distribution here is an assumption chosen for illustration; real detectability distributions vary by product and method.)
:::
:::

Empirical studies point the same way. Jared Spool and Will Schroeder (CHI 2001 extended abstracts) tested four e-commerce sites with 49 users on open-ended shopping tasks and found that the first five users found only about 35% of the problems eventually found. Laura Faulkner (*Behavior Research Methods, Instruments, and Computers*, 2003) drew many random groups of five from 60 participants testing one application and found that, while groups of five found 85% of the problems on average, some found as few as 55%; groups of 20 never found fewer than 95%. Rolf Molich's **Comparative Usability Evaluation** studies (from 1998 onward) had many professional teams evaluate the same website, and the teams reported strikingly different sets of problems, most of them reported by only one team.

The sensible conclusions are these. For **formative** testing of a specific set of tasks, small rounds of five or so participants per distinct user group, repeated after fixes, are an efficient use of effort ([[hci/prototyping#prop-iteration]]). For **coverage** of a large system, vary the tasks and participants across rounds, since no number of participants finds problems in untested tasks. For **summative** claims — "the success rate is above 90%" — compute the sample size from the precision needed, as in [[#ex-success-ci]], not from the Nielsen–Landauer curve. And never present "five users find 85% of problems" as a fact about your product.

::: quiz
A team tested an expense-reporting app with 6 participants, all from the finance department, on 4 tasks. They found 18 problems, and the average problem was found by 3 of the 6 participants. They conclude, using $\lambda = 0.5$ and [[#eq-nielsen-landauer]], that they have found $1 - 0.5^6 \approx 98\%$ of the problems. What is wrong? (Select all that apply.)
- [x] $\lambda$ estimated from the found problems is biased upwards, since problems nobody found are missing from the average.
- [x] Problems in tasks not tested, or met only by other kinds of user, are not in the model's $N$ at all.
- [x] Participants from one department are likely to share knowledge and fail in similar ways, violating independence.
- [ ] Nothing: with $\lambda = 0.5$ six participants are enough.
::: solution
All three objections apply. The estimate of $\lambda$ conditions on detection ([[#ex-nl-sim]]); the "98%" refers at best to problems discoverable with these four tasks by people like these participants; and homogeneous participants inflate apparent agreement. A better statement: "six finance staff on four core tasks found 18 problems; the most frequent were …; other user groups (employees outside finance, approvers, mobile users) and tasks (correcting a rejected claim, multi-currency expenses) remain untested."
:::
:::

## Questionnaires: the System Usability Scale

Satisfaction is measured with standardised questionnaires, whose wording and scoring have been validated so that results are comparable. The most widely used is John Brooke's **System Usability Scale**, devised at Digital Equipment Corporation in 1986 and published in 1996, which he called a "quick and dirty" scale — though decades of use have shown it to be reliable.

::: definition System Usability Scale {#def-sus}
The **System Usability Scale** (SUS) has ten statements, each answered on a five-point scale from 1 (strongly disagree) to 5 (strongly agree):

1. I think that I would like to use this system frequently.
2. I found the system unnecessarily complex.
3. I thought the system was easy to use.
4. I think that I would need the support of a technical person to be able to use this system.
5. I found the various functions in this system were well integrated.
6. I thought there was too much inconsistency in this system.
7. I would imagine that most people would learn to use this system very quickly.
8. I found the system very cumbersome to use.
9. I felt very confident using the system.
10. I needed to learn a lot of things before I could get going with this system.

Odd-numbered items are positive and even-numbered items negative. With responses $r_1, \dots, r_{10}$, the **SUS score** is

$$
\text{SUS} = 2.5\left(\sum_{i \text{ odd}} (r_i - 1) + \sum_{i \text{ even}} (5 - r_i)\right).
$$ {#eq-sus}
:::

::: proposition Range of SUS {#prop-sus-range}
Every SUS score lies in $\set{0, 2.5, 5, \dots, 100}$; it is 100 exactly when every positive item is answered 5 and every negative item 1, and 0 in the opposite case.
:::

::: proof
Each odd item contributes $r_i - 1 \in \set{0, \dots, 4}$ and each even item $5 - r_i \in \set{0, \dots, 4}$, so the bracket is an integer from 0 to $10 \times 4 = 40$, and $2.5 \times 40 = 100$. Every contribution is maximal (4) exactly when odd items are 5 and even items 1, and minimal (0) exactly in the opposite case. The bracket takes every integer value from 0 to 40 (change one item at a time), so the score takes every multiple of 2.5 from 0 to 100.
:::

::: example Scoring SUS {#ex-sus}
Five participants answered SUS after a test. Compute their scores and the mean.

| | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|---|---|---|---|---|---|---|---|---|---|---|
| P1 | 4 | 2 | 4 | 1 | 4 | 2 | 5 | 2 | 4 | 2 |
| P2 | 3 | 3 | 4 | 2 | 3 | 3 | 4 | 3 | 3 | 3 |
| P3 | 5 | 1 | 5 | 1 | 4 | 1 | 5 | 1 | 5 | 2 |
| P4 | 2 | 4 | 2 | 3 | 3 | 4 | 3 | 4 | 2 | 4 |
| P5 | 4 | 2 | 3 | 2 | 4 | 2 | 4 | 2 | 4 | 3 |

::: solution
For P1: odd items $4, 4, 4, 5, 4$ contribute $3 + 3 + 3 + 4 + 3 = 16$; even items $2, 1, 2, 2, 2$ contribute $3 + 4 + 3 + 3 + 3 = 16$; SUS $= 2.5 \times 32 = 80$.

```python
def sus(responses):
    """SUS score from ten responses on a 1-5 scale, item 1 first."""
    assert len(responses) == 10 and all(1 <= r <= 5 for r in responses)
    odd = sum(r - 1 for r in responses[0::2])    # items 1, 3, 5, 7, 9 (positive)
    even = sum(5 - r for r in responses[1::2])   # items 2, 4, 6, 8, 10 (negative)
    return 2.5 * (odd + even)

participants = {
    "P1": [4, 2, 4, 1, 4, 2, 5, 2, 4, 2],
    "P2": [3, 3, 4, 2, 3, 3, 4, 3, 3, 3],
    "P3": [5, 1, 5, 1, 4, 1, 5, 1, 5, 2],
    "P4": [2, 4, 2, 3, 3, 4, 3, 4, 2, 4],
    "P5": [4, 2, 3, 2, 4, 2, 4, 2, 4, 3],
}
scores = {p: sus(r) for p, r in participants.items()}
for p, s in scores.items():
    print(p, s)
print("mean", sum(scores.values()) / len(scores))
```

```console
$ python3 sus.py
P1 80.0
P2 57.5
P3 95.0
P4 32.5
P5 70.0
mean 67.0
```

The mean is 67, with a wide spread (32.5 to 95) — with five participants, the mean's 95% interval is very wide, so the result says little on its own.
:::
:::

How should a SUS score be interpreted? Not as a percentage: 67 does not mean "67% usable". Jeff Sauro's analysis of about 500 studies (*A Practical Guide to the System Usability Scale*, 2011) put the average SUS score at about **68**, so 67 is roughly average, and Sauro and Lewis convert scores to percentile ranks against that database. Aaron Bangor, Philip Kortum and James Miller (*International Journal of Human–Computer Interaction*, 2008) related scores to adjective ratings ("good", "excellent"). Both benchmarks come from particular collections of products and should be used as rough guides. SUS is most useful for *comparison* — two designs, two versions, a product against its competitor — with the statistical care of [[hci/experiments]].

::: history
Usability testing grew out of human factors laboratories in the 1970s and 1980s; IBM and Digital Equipment Corporation built usability labs with one-way mirrors and video cameras, and John Gould and Clayton Lewis made empirical measurement one of their three principles in 1985. Ericsson and Simon's verbal-protocol work (1980) gave think-aloud its theoretical basis, and Clayton Lewis brought it into interface evaluation at IBM in the early 1980s. Jakob Nielsen and Rolf Molich introduced heuristic evaluation in 1990 and Nielsen revised the heuristics in 1994; Peter Polson, Clayton Lewis, John Rieman and Cathleen Wharton developed the cognitive walkthrough from 1990 to 1994. John Brooke's SUS was published in 1996, Nielsen and Landauer's model in 1993, and Hertzum and Jacobsen's review of the evaluator effect in 2001. ISO 9241-11 (1998, revised 2018) defined the effectiveness, efficiency and satisfaction that these methods measure.
:::

## Where this leads

When the question is "is design A better than design B?", inspection and small tests are not enough: [[hci/experiments]] covers controlled experiments, their statistics, and A/B testing at scale. Evaluation with and by disabled people, and automated and manual accessibility evaluation against WCAG, are in [[hci/accessibility-ethics]]. The problems found here feed the iterative loop of [[hci/prototyping]].

::: summary
- **Formative** evaluation finds problems; **summative** evaluation measures ([[#def-formative]]). Do not compute rates from formative tests.
- **Heuristic evaluation** ([[#def-heuristics]]) uses several independent evaluators and Nielsen's ten heuristics, with **severity** ratings ([[#def-severity]]); the **evaluator effect** means any single problem list is a sample.
- The **cognitive walkthrough** ([[#def-walkthrough]]) asks four questions at each step of a task for a first-time user, and finds invisible entry points and off-screen steps.
- **Usability tests** ([[#def-usability-test]]) observe representative participants on realistic tasks, usually with think-aloud; trust behaviour over opinion, and obtain informed consent.
- Report success rates with the **adjusted Wald interval** ([[#def-adjusted-wald]]): 9/9 is compatible with a true rate near 66%.
- The **Nielsen–Landauer model** $N(1 - (1-\lambda)^n)$ ([[#def-nielsen-landauer]]) gives "five users find about 85%" only for $\lambda \approx 0.31$, equal detectability, independence and a fixed task set; heterogeneity makes it optimistic ([[#prop-heterogeneity]]) and naive estimates of $\lambda$ are inflated ([[#ex-nl-sim]]).
- **SUS** ([[#def-sus]]) scores from 0 to 100 by [[#eq-sus]]; about 68 is average, and it is not a percentage.
:::

## Exercises

::: exercise A SUS score {level=1 check="75"}
A participant answers the ten SUS items $4, 2, 4, 2, 4, 2, 4, 2, 4, 2$. What is their SUS score? (Enter the score.)
::: solution
Each odd item contributes $4 - 1 = 3$ and each even item $5 - 2 = 3$, so the bracket in [[#eq-sus]] is $10 \times 3 = 30$ and the score is $2.5 \times 30 = 75$.
:::
:::

::: exercise Five users {level=1 check="1 - 0.69^5"}
Under the Nielsen–Landauer model with $\lambda = 0.31$, what proportion of problems do five participants find on average? (Enter the proportion as a number between 0 and 1.)
::: solution
$1 - (1 - 0.31)^5 = 1 - 0.69^5 \approx 1 - 0.156 = 0.844$ ([[#eq-nielsen-landauer]]).
:::
:::

::: exercise Name the heuristic {level=1}
Which of Nielsen's heuristics ([[#def-heuristics]]) does each violate? (a) A file upload shows no progress for a 2-minute upload. (b) A form asks for your customer number, which is printed only on a letter you received last year. (c) "Delete" and "Archive" use the same icon in different screens. (d) A deleted message cannot be restored. (e) An error says "Exception in thread main".
::: solution
(a) 1, visibility of system status. (b) 6, recognition rather than recall (and arguably 2: use information the user has, such as e-mail address). (c) 4, consistency and standards (and 5, error prevention, since confusion leads to accidental deletion). (d) 3, user control and freedom (no undo). (e) 9, help users recognise, diagnose and recover from errors; also 2, the system's language rather than the user's.
:::
:::

::: exercise Participants for a target {level=2 check="9"}
If $\lambda = 0.2$, how many participants does the Nielsen–Landauer model say are needed to find, on average, at least 85% of the problems? (Enter the smallest whole number.)
::: solution
By [[#prop-diminishing]], $n \ge \ln 0.15/\ln 0.8 \approx 8.50$, so $n = 9$; check: $1 - 0.8^8 \approx 0.832$ and $1 - 0.8^9 \approx 0.866$.
:::
:::

::: exercise Interval for a success rate {level=2}
In a test, 5 of 8 participants completed a task. Compute the adjusted Wald 95% interval ([[#def-adjusted-wald]]) and explain what it does and does not let you conclude about whether the design meets a requirement of "at least 80% of users complete the task".
::: solution
$\tilde n = 8 + 3.8416 = 11.8416$; $\tilde p = (5 + 1.9208)/11.8416 \approx 0.5844$; half-width $1.96\sqrt{0.5844 \times 0.4156/11.8416} \approx 1.96 \times 0.1432 \approx 0.281$. The interval is about $0.304$ to $0.865$. It includes 80%, so the data do not show that the requirement is *failed*, and they certainly do not show it is met; the plausible success rates range from about 30% to 87%. A summative claim needs a larger sample, chosen to make the interval narrow enough; formatively, the three failures are what matters — why did they fail?
:::
:::

::: exercise Walkthrough a ticket purchase {level=2}
Carry out a cognitive walkthrough ([[#def-walkthrough]]) of steps 2.2 and 4 of the ticket-machine HTA in [[hci/user-centred-design#ex-hta]] for an occasional traveller, writing failure stories and fixes.
::: solution
*Step 2.2, choose the ticket type.* Q1: the traveller wants "a ticket for this trip", not a fare type, so they may not form the goal of choosing one at all — failure story: they accept the default "Anytime" fare and pay more than needed. Q2: the options are visible. Q3: "Off-peak" and "Advance" are railway jargon; the traveller cannot associate them with "cheapest valid ticket for leaving now". Q4: the price changes, but without explanation of conditions. Fix: describe options by their consequence ("valid on any train today: £24.50; valid after 09:30: £15.20"), default to the cheapest valid fare, warn when a cheaper fare is valid.

*Step 4, collect the ticket and card.* Q1: after the ticket is printed the goal is satisfied; the subgoal "take my card" is no longer active — the post-completion error. Q2: the card slot may be far from the ticket tray. Q3: yes, if noticed. Q4: the machine's "Thank you" signals completion even though the card is still in it. Fix: return the card before printing the ticket, with a beep and a message ("Please take your card"), or use contactless payment so the card never leaves the hand.
:::
:::

::: exercise Proving the SUS mean bound {level=3}
Let $\bar r_i$ be the mean response to item $i$ over a group of participants. Show that the mean SUS score of the group equals $2.5\left(\sum_{i \text{ odd}}(\bar r_i - 1) + \sum_{i \text{ even}}(5 - \bar r_i)\right)$, and deduce that a group's mean SUS can be computed from item means alone. Then show by example that a group's median SUS *cannot* be computed from item medians.
::: solution
The SUS score is an affine function of the responses: $\text{SUS}(r) = 2.5\left(\sum_{\text{odd}} r_i - \sum_{\text{even}} r_i\right) + 2.5(5 \times 5 - 5) = 2.5\left(\sum_{\text{odd}} r_i - \sum_{\text{even}} r_i + 20\right)$. The mean of an affine function is the same affine function of the means (linearity of expectation over the participants), which gives the formula. For medians, let participant A answer all items 3 (SUS 50), B answer odd items 5 and even items 1 (SUS 100), and C answer odd items 5 and even items 5 (SUS 50). SUS scores are 50, 100, 50, with median 50. Item medians: odd items have responses $3, 5, 5$, median 5; even items $3, 1, 5$, median 3. Plugging the medians into [[#eq-sus]]: $2.5(5 \times 4 + 5 \times 2) = 75 \ne 50$. Medians do not commute with the sum, so always compute each participant's score first.
:::
:::

::: exercise Estimating the number of problems {level=3}
Two evaluators independently inspect an interface. Evaluator A finds 20 problems, B finds 15, and 10 are found by both. Assuming every problem is equally likely to be found by a given evaluator and evaluators are independent, estimate the total number of problems $N$ (the Lincoln–Petersen capture–recapture estimator). Derive the estimator, compute it, and explain how the heterogeneity of [[#prop-heterogeneity]] biases it.
::: solution
Let $\lambda_A$ and $\lambda_B$ be the detection probabilities. Then $\E[n_A] = N\lambda_A$, $\E[n_B] = N\lambda_B$ and, by independence, $\E[n_{AB}] = N\lambda_A\lambda_B$. Replacing expectations by observed counts and eliminating $\lambda_A = n_A/N$ and $\lambda_B = n_B/N$ gives $n_{AB} = n_A n_B / N$, so

$$
\hat N = \frac{n_A\,n_B}{n_{AB}} = \frac{20 \times 15}{10} = 30.
$$

So about 30 problems exist, of which $20 + 15 - 10 = 25$ were found; the team has found about 83%. Heterogeneity biases $\hat N$ **downwards**: easy problems are found by both evaluators, so the overlap $n_{AB}$ is larger than independence with a common rate predicts, and hard problems, found by neither, are under-represented. The true $N$ is likely larger than 30. Positive correlation between evaluators (shared training, shared tasks) has the same effect. Capture–recapture methods from ecology that model heterogeneity (such as Chao's estimators) reduce but cannot remove this bias.
:::
:::
