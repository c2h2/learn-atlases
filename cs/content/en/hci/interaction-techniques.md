An e-mail program offers three ways to archive a message: choose *Archive* from the *Message* menu, click an archive button on the toolbar, or press a keyboard shortcut. Each is "one action" in a feature list, yet for a person who archives a hundred messages a day the difference between them is several minutes, every day, for years. Which is fastest, by how much, and for whom? We can answer before running a single test: with the times of [[hci/human-factors]] added up operator by operator, the **keystroke-level model** predicts that the menu takes about three times as long as the shortcut for an expert — and also tells us why the shortcut is useless to anyone who has not learned it.

This chapter is about **interaction techniques**, the building blocks from which interfaces are made: direct manipulation of visible objects, menus, forms and text entry, and touch, gesture and voice. For each we ask what the user must do, how long and how error-prone it is, and how it supports the progression from novice to expert. Two ideas organise the chapter. Norman's **gulfs of execution and evaluation** describe what any interaction technique must bridge, and the **keystroke-level model** and **GOMS** turn the human performance laws of [[hci/human-factors]] into quantitative predictions for comparing designs.

## Direct manipulation and the two gulfs

Before the 1980s most people used computers through command languages: you remembered a command and its syntax, typed it, and read a textual response. Ben Shneiderman, describing the new screen editors, spreadsheets and video games that people found easy and even enjoyable, named their common style.

::: definition Direct manipulation {#def-direct-manipulation}
An interface uses **direct manipulation** (Shneiderman, *IEEE Computer*, 1983) when it has

1. a **continuous representation** of the objects and actions of interest;
2. **physical actions** — pointing, dragging, pressing labelled buttons — instead of typed commands with complex syntax;
3. **rapid, incremental, reversible** operations whose effect on the object of interest is **immediately visible**.
:::

Dragging a file to a folder, resizing a photo by its corner, moving a cell range in a spreadsheet and scrubbing through a video are direct manipulation. Its strengths follow from [[hci/human-factors]]: recognition instead of recall, actions that map spatially onto their effects, and feedback within one perceptual cycle, so that errors are noticed and undone at once. Its weaknesses are just as real: it is slow for repetitive or bulk operations ("rename these 300 files"), it cannot easily express abstractions ("every file modified last week"), and pointing and dragging are hard or impossible for many people with motor or visual impairments ([[hci/accessibility-ethics]]). Good interfaces combine it with commands, shortcuts and scripting.

Edwin Hutchins, James Hollan and Don Norman ("Direct manipulation interfaces", 1985) explained *why* direct manipulation feels direct by analysing the distance a user must cross between their intentions and the system.

::: definition Gulfs of execution and evaluation {#def-gulfs}
The **gulf of execution** is the gap between what a user wants to do and the actions the system provides for doing it: the effort needed to form an intention, translate it into a sequence of the system's actions and carry them out. The **gulf of evaluation** is the gap between the system's state and the user's understanding of it: the effort needed to perceive the system's output, interpret it and compare it with the goal. Norman's **seven stages of action** divide one cycle into the goal, three stages of execution (plan, specify, perform) and three of evaluation (perceive, interpret, compare).
:::

Interaction techniques bridge the gulf of execution with signifiers, natural mappings and constraints, and the gulf of evaluation with feedback and a visible system state ([[hci/user-centred-design#def-norman]]). Direct manipulation narrows both: the action *is* the intention ("put this here"), and its result is visible where the user is already looking.

::: example Diagnosing a thermostat app {#ex-gulfs}
A heating app lets users set a weekly schedule. To lower the temperature on Friday evenings, users must open *Settings*, choose *Programs*, select *Program 3*, find the Friday row, and edit a start time and a "setback" value. After saving, the app shows the current temperature only. Users frequently believe they have changed the schedule when they have not. Analyse the gulfs and suggest changes.
::: solution
*Execution*: the user's goal ("cooler on Friday evenings") must be translated into the system's concepts (programs, setback values) that do not appear in the goal, through a deep path whose labels give no hint of the destination. *Evaluation*: after saving, nothing shows the schedule, so the user cannot perceive whether the change took effect, and "Program 3" is opaque even if they could. Bridging execution: show the schedule as a week-long timeline of temperatures that can be edited directly (drag the Friday evening segment down — direct manipulation in Shneiderman's sense, [[#def-direct-manipulation]]), with terms from the user's vocabulary. Bridging evaluation: after an edit, show the updated timeline with the changed segment highlighted and a confirmation such as "Fridays 18:00–23:00: 17 °C". Then test the new design: whether users can now *predict* what the heating will do is the real measure.
:::
:::

## Predicting performance: the keystroke-level model

Card, Moran and Newell's **keystroke-level model** (*Communications of the ACM*, 1980) predicts how long an expert takes to do a routine task with a given method, by decomposing the method into primitive operators and adding their times.

::: definition Keystroke-level model {#def-klm}
In the **keystroke-level model** (KLM), the execution time of a method is $T = \sum_i t(o_i)$ for its sequence of operators $o_1 o_2 \dots$, with these operators and times (Card, Moran and Newell, 1980):

| operator | meaning | time |
|---|---|---|
| $K$ | press a key or button | 0.08 s (best typist, 135 wpm); 0.12 s (good, 90 wpm); **0.20 s (average skilled, 55 wpm)**; 0.28 s (average non-secretarial, 40 wpm); 0.50 s (typing random letters); 0.75 s (typing complex codes); 1.20 s (worst typist, unfamiliar with keyboard) |
| $P$ | point with a mouse to a target on a display | 1.10 s |
| $H$ | home the hand(s) on the keyboard or another device | 0.40 s |
| $D(n_D, l_D)$ | draw $n_D$ straight-line segments of total length $l_D$ cm | $0.9\,n_D + 0.16\,l_D$ s |
| $M$ | mentally prepare for the next physical action | 1.35 s |
| $R(t)$ | wait $t$ for the system to respond (only the part during which the user cannot act) | $t$ |
:::

The values are averages from the authors' experiments and earlier literature, and $P = 1.10$ s is itself an average of Fitts's law over typical distances and sizes; where a target's distance and width are known, the Fitts prediction of [[hci/human-factors#def-fitts]] is better. Later practitioners' guides, notably David Kieras's, separate a mouse button press or release ($B = 0.1$ s, so a click is $BB = 0.2$ s) from a keystroke.

The hardest part of the model is placing the $M$ operators. Card, Moran and Newell gave heuristic rules: insert an $M$ before every keystroke that is not part of a typed string and before every pointing operation that selects a command (rule 0), and then delete it where the action is fully anticipated by the previous one — for instance, the click that follows pointing to a button (rule 1), the characters after the first in a command name typed as a unit (rule 2), and keystrokes that terminate a string whose end the user already knows (rules 3 and 4). Applying the rules takes judgement, and different analysts place $M$s differently; we will see that this matters.

::: example Three ways to archive a message {#ex-klm-archive}
Predict the expert execution time of archiving the current message, starting and ending with the hands on the keyboard, (a) through the *Message* menu with the mouse, (b) with a toolbar button, (c) with a two-key shortcut such as Ctrl+E, and (d) with that shortcut when the hand starts on the mouse.
::: solution
Encode each method as operators. (a) Move the hand to the mouse ($H$), decide ($M$), point to *Message* ($P$), click ($K$), find the item in the opened menu ($M$), point to it ($P$), click ($K$), return to the keyboard ($H$). (b) $H\,M\,P\,K\,H$. (c) $M\,K\,K$ (by rule 2 only one $M$ for the chord). (d) $H\,M\,K\,K\,H$, if the hand must go back to the mouse afterwards.

```python
# Keystroke-Level Model operator times in seconds (Card, Moran & Newell, 1980).
OPS = {"K": 0.20,   # keystroke or button press, average skilled typist (55 wpm)
       "P": 1.10,   # point with a mouse to a target on the screen
       "H": 0.40,   # home the hand between keyboard and mouse
       "M": 1.35}   # mental preparation

def klm(sequence):
    """Predicted execution time of a string of operators such as 'HMPK'."""
    return sum(OPS[op] for op in sequence.replace(" ", ""))

methods = {
    "menu: Message > Archive":  "H M P K M P K H",   # hand to mouse, open menu, choose item, back
    "toolbar button":           "H M P K H",
    "keyboard shortcut":        "M K K",             # e.g. Ctrl+E as two keystrokes
    "shortcut, hands on mouse": "H M K K H",
}
for name, seq in methods.items():
    print(f"{name:26} {seq:18} {klm(seq):.2f} s")
```

```console
$ python3 klm.py
menu: Message > Archive    H M P K M P K H    6.10 s
toolbar button             H M P K H          3.45 s
keyboard shortcut          M K K              1.75 s
shortcut, hands on mouse   H M K K H          2.55 s
```

The shortcut is predicted to be about 3.5 times faster than the menu for an expert. Notice how much the result depends on $M$: if an expert's choice of *Archive* within the open menu is fully anticipated (rule 1), the second $M$ disappears and the menu takes $6.10 - 1.35 = 4.75$ s. The *ranking* of the methods survives any reasonable placement of $M$s, which is the kind of conclusion the KLM supports well. At 100 archives a day, the difference between menu and shortcut is $100 \times (4.75 \text{ to } 6.10 - 1.75) \approx 5$–7 minutes a day.
:::
:::

::: proposition Break-even for a shortcut {#prop-breakeven}
Suppose learning a shortcut costs a one-off time $L$, and thereafter saves $\Delta$ seconds per use compared with the menu, and the user performs the action $u$ times per day. Learning pays off after $L/(u\Delta)$ days. If the user forgets the shortcut with probability $\phi$ per day independently and must relearn it, the expected saving per day is $u\Delta - \phi L$, which is positive if and only if $\phi < u\Delta / L$.
:::

::: proof
After $d$ days the time saved is $d\,u\Delta$ and the cost $L$; they balance at $d = L/(u\Delta)$. With forgetting, each day the user incurs the relearning cost $L$ with probability $\phi$, an expected cost $\phi L$, against the expected saving $u\Delta$ (ignoring the uses lost while the shortcut is forgotten, which only strengthens the condition). The expected net saving $u\Delta - \phi L$ is positive iff $\phi < u\Delta/L$.
:::

The proposition explains a familiar fact: rarely used shortcuts are not worth learning, which is why menus that *display* shortcuts next to their items matter — they turn every menu use into a free rehearsal. Despite this, many experienced users keep using menus for actions they perform often; Lane, Napier, Peres and Sándor (2005) observed this with Microsoft Word users, a reminder that predicted savings do not change habits by themselves.

### GOMS

The KLM evaluates one *method*. **GOMS** (Card, Moran and Newell, 1983) models how a skilled user chooses among methods to achieve goals.

::: definition GOMS {#def-goms}
A **GOMS** model of a task consists of **Goals** (what the user wants to achieve, organised hierarchically), **Operators** (elementary perceptual, motor or cognitive actions), **Methods** (sequences of subgoals and operators that achieve a goal) and **Selection rules** (conditions that choose among alternative methods for a goal, such as "if the target is visible on screen, point at it; otherwise use search").
:::

Several variants exist. The original **CMN-GOMS** is an informal hierarchical outline; the KLM is its simplest special case. **NGOMSL** (Kieras) writes methods in a structured natural language whose number of statements predicts learning time. **CPM-GOMS** (Bonnie John) schedules perceptual, cognitive and motor operators in parallel on a critical-path chart. In **Project Ernestine** (Wayne Gray, Bonnie John and Michael Atwood, *Human–Computer Interaction*, 1993), CPM-GOMS models predicted that a new telephone-operator workstation, introduced because it was expected to be faster, would in fact make each call slightly *slower* — because its improvements lay off the critical path while it added keystrokes on it. A field trial with real operators confirmed the slowdown. At the scale of a national telephone company, fractions of a second per call meant large costs; the case remains the best-known demonstration that cognitive models can pay their way.

::: warning "The KLM predicts how long the task will take users"
The keystroke-level model predicts the **error-free execution time of skilled users** who already know the method. It says nothing about the time to learn the method, to find out that it exists, to recover from errors (which in real use can account for a large share of the time), or to decide what to do in the first place; it assumes the user is not interrupted, tired or distracted. Use it to compare methods for experts and to find needless operators, and test with real users for everything else.
:::

## Menus

A menu is a list of commands or options from which the user selects by recognition. Its design questions are its *structure* (how many items per level, how many levels), its *order* (alphabetical, by frequency, by category) and its *form* (linear, pie, marking).

### Breadth versus depth

A hierarchy of $N$ items can be broad and shallow or narrow and deep. Experiments consistently favour breadth: Kiger (1984) compared five structures for 64 items, from $2^6$ (six levels of two) to $64^1$, and found that two levels of eight ($8^2$) was fastest and most preferred, with the deepest structure worst; Landauer and Nachbar (1985) found that time per level grew with the logarithm of the number of items, as the Hick–Hyman and Fitts laws predict, so that broad menus were faster overall. A short calculation shows why.

::: proposition Optimal menu breadth {#prop-breadth}
A hierarchy of $N$ items with $n$ items per level has depth $d = \log N / \log n$ (treated as continuous). If selecting at one level takes $a + b \log_2 n$ (a fixed cost $a$ per level plus a logarithmic choice and pointing cost), the total time

$$
T(n) = \frac{\log_2 N}{\log_2 n}\,(a + b \log_2 n) = \log_2 N \left(\frac{a}{\log_2 n} + b\right)
$$

is strictly decreasing in $n$: the broadest menu is fastest. If instead each level is scanned item by item, $a + c\,n$, then $T(n) = \ln N \cdot (a + cn)/\ln n$, which is minimised where $n(\ln n - 1) = a/c$.
:::

::: proof
The depth $d$ satisfies $n^d = N$, so $d = \log N/\log n$ in any base. In the logarithmic case, $T(n) = d\,(a + b\log_2 n) = \log_2 N\,\bigl(a/\log_2 n + b\bigr)$; since $a > 0$ and $\log_2 n$ increases, $a/\log_2 n$ decreases, so $T$ is strictly decreasing for $n > 1$. In the linear case, $T(n) = \ln N \cdot g(n)$ with $g(n) = (a + cn)/\ln n$, and

$$
g'(n) = \frac{c \ln n - (a + cn)/n}{(\ln n)^2},
$$

which is zero exactly when $c\,n\ln n = a + cn$, that is $n(\ln n - 1) = a/c$. The left side increases for $n > 1$, so the root is unique; $g' < 0$ below it and $g' > 0$ above it, so it is the minimum.
:::

::: example Breadth for a large catalogue {#ex-breadth}
A catalogue has $N = 4096$ items. Compare the predicted times for breadths 2, 4, 8, 16, 64 and 4096 under both models of [[#prop-breadth]], with $a = 1$ s per level, $b = 0.15$ s/bit and $c = 0.1$ s per item, and find the optimal breadth for the linear model.
::: solution
```python
from math import log, log2

N = 4096                       # items in the hierarchy
def t_log(n, a=1.0, b=0.15):   # per-level time if choice is logarithmic (Hick-Hyman + Fitts)
    return (log(N) / log(n)) * (a + b * log2(n))
def t_lin(n, a=1.0, c=0.1):    # per-level time if users scan items one by one
    return (log(N) / log(n)) * (a + c * n)
for n in [2, 4, 8, 16, 64, 4096]:
    print(f"breadth {n:5}: depth {log(N)/log(n):5.2f}  log-model {t_log(n):6.2f} s  linear-model {t_lin(n):7.2f} s")
# optimum of the linear model: n (ln n - 1) = a/c, solved by bisection
lo, hi = 2.0, 1000.0
for _ in range(100):
    mid = (lo + hi) / 2
    if mid * (log(mid) - 1) < 10: lo = mid
    else: hi = mid
print(f"linear-model optimum: n = {lo:.3f}")
```

```console
$ python3 menu.py
breadth     2: depth 12.00  log-model  13.80 s  linear-model   14.40 s
breadth     4: depth  6.00  log-model   7.80 s  linear-model    8.40 s
breadth     8: depth  4.00  log-model   5.80 s  linear-model    7.20 s
breadth    16: depth  3.00  log-model   4.80 s  linear-model    7.80 s
breadth    64: depth  2.00  log-model   3.80 s  linear-model   14.80 s
breadth  4096: depth  1.00  log-model   2.80 s  linear-model  410.60 s
linear-model optimum: n = 8.644
```

With practised users (logarithmic choice) a single list of 4096 items would be fastest — but nobody is practised on 4096 items, and nobody can point to one in a single screen. With scanning, about 8 or 9 items per level is optimal, and the curve is flat between 4 and 16. Real menus sit between the models: users scan unfamiliar menus and recall familiar ones. Good structure (meaningful groups, separators, alphabetical order for long lists of names) makes even broad menus scannable, which is why the experiments favour breadth.
:::
:::

::: widget plot
f: (log(4096)/log(x))*(a + c*x); (log(4096)/log(x))*(a + b*log2(x))
x: 2, 64
y: 0, 20
sliders: a=1:0.2:3:0.1; b=0.15:0.05:0.5:0.05; c=0.1:0.02:0.5:0.02
labels: \text{scanning: } a + c\,n \text{ per level}; \text{logarithmic: } a + b\log_2 n \text{ per level}
caption: Total selection time (s) for a 4096-item hierarchy against the number of items per level $n$, under the two models of [[#prop-breadth]]. The logarithmic model always favours breadth; the scanning model has a minimum where $n(\ln n - 1) = a/c$. Increase the per-level cost $a$ (slow page loads, say): the optimum moves to broader menus. Increase the scanning cost $c$: it moves to narrower ones.
:::

### Pie and marking menus

A **pie menu** arranges items as wedges around the pointer, so that every item is at the same short distance and selection depends on *direction*, a large angular target. Callahan, Hopkins, Weiser and Shneiderman (CHI 1988) found pie menus faster than linear menus, with fewer errors, for eight items. **Marking menus** (Gordon Kurtenbach and William Buxton, 1993–94) add a smooth path from novice to expert: a novice presses, waits, sees the pie and selects; an expert, who has learned the directions, makes the same stroke without waiting, and the menu never appears. Because the novice's action *rehearses* the expert's, learning comes free — the same idea as menus that display shortcuts. In "The limits of expert performance using hierarchic marking menus" (CHI 1993), Kurtenbach and Buxton found that accuracy falls as menus get broader and deeper, with eight-item menus remaining usable to a depth of about two levels.

::: quiz
A drawing app has a 12-item toolbar along the top of the screen. The designers consider replacing it with a pie menu that opens at the pointer on a right-click. According to Fitts's law and the KLM, what is the main source of the pie menu's advantage, and its main cost?
- [x] Advantage: items are close to the pointer and have large angular targets. Cost: the menu is invisible until opened, so items must be recalled or revealed by an extra action.
- [ ] Advantage: fewer items per level. Cost: more levels.
- [ ] Advantage: the toolbar occupies screen space. Cost: none.
- [ ] Advantage: pie menus use the Hick–Hyman law. Cost: they violate Fitts's law.
::: solution
The pie menu opens where the pointer already is, so $D$ is small and each wedge is a wide target in the direction of motion: a low index of difficulty ([[hci/human-factors#def-fitts]]). A toolbar at the screen edge is far away but has the edge advantage. The cost is that a pie menu is hidden: an extra click to open it, and items that are not visible cannot be recognised at a glance, a cost in discoverability for novices. Marking menus reduce it by letting experts skip the display.
:::
:::

## Forms and text entry

**Forms** collect structured input, and most of their usability problems are problems of the gulf of execution: users do not know what is expected ("Date of birth" — in what format?), or are rejected for typing valid information in an unexpected form (spaces in a card number, a postcode in lower case). Good practice follows from the principles of [[hci/user-centred-design#def-norman]]: put a visible label on every field (placeholders that vanish while typing are not labels); accept every reasonable format and normalise it, rather than demanding one; use constraints such as date pickers and menus only when they are faster than typing; validate early and specifically, next to the field, saying how to fix the problem; never clear what the user has typed after an error; and ask only for what you need. Many of these are also accessibility requirements in [[hci/accessibility-ethics]].

**Text entry** is measured with standard metrics, because claims about "fast keyboards" are otherwise impossible to compare.

::: definition Text-entry speed and error rate {#def-text-entry}
If a participant transcribes a **presented** phrase $P$ and produces the **transcribed** text $T$ in $S$ seconds, measured from the first keystroke to the last, the **entry rate** is

$$
\text{wpm} = \frac{\lvert T\rvert - 1}{S} \times 60 \times \frac15,
$$ {#eq-wpm}

where a "word" is defined as five characters including spaces, and $\lvert T\rvert - 1$ is used because timing starts at the first character. The **minimum string distance (MSD) error rate** is $\mathrm{MSD}(P, T) / \max(\lvert P\rvert, \lvert T\rvert)$, where MSD is the Levenshtein edit distance: the minimum number of character insertions, deletions and substitutions turning $P$ into $T$. **Keystrokes per character** (KSPC) is the number of keystrokes, including corrections, divided by the number of characters produced.
:::

These definitions follow I. Scott MacKenzie and R. William Soukoreff (MSD error rate, 2001; KSPC, MacKenzie 2002). The MSD error rate measures only errors left in the text; errors made and corrected show up in KSPC and in the "total error rate" of Soukoreff and MacKenzie (2003).

::: example Measuring a transcription {#ex-wpm}
A participant asked to type `the quick brown fox jumps over the lazy dog` produced `the quikc brown fox jumps ovr the lazy dog` in 9.6 seconds. Compute the entry rate and the MSD error rate.
::: solution
The edit distance is computed by dynamic programming ([[algorithms]]):

```python
def msd(a, b):
    """Minimum string distance (Levenshtein): insertions, deletions, substitutions."""
    prev = list(range(len(b) + 1))
    for i, ca in enumerate(a, 1):
        cur = [i]
        for j, cb in enumerate(b, 1):
            cur.append(min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (ca != cb)))
        prev = cur
    return prev[-1]

def wpm(transcribed, seconds):
    """Words per minute, a 'word' being 5 characters; timing starts at the first key."""
    return (len(transcribed) - 1) / seconds * 60 / 5

presented   = "the quick brown fox jumps over the lazy dog"
transcribed = "the quikc brown fox jumps ovr the lazy dog"
seconds = 9.6
d = msd(presented, transcribed)
print(f"length P = {len(presented)}, T = {len(transcribed)}, MSD = {d}")
print(f"speed = {wpm(transcribed, seconds):.1f} wpm")
print(f"MSD error rate = {100 * d / max(len(presented), len(transcribed)):.2f}%")
```

```console
$ python3 textentry.py
length P = 43, T = 42, MSD = 3
speed = 51.3 wpm
MSD error rate = 6.98%
```

By [[#eq-wpm]], $(42 - 1)/9.6 \times 12 = 51.25$ wpm. The transposition "ck" → "kc" costs two substitutions in Levenshtein distance and the missing "e" one deletion, so MSD $= 3$ and the error rate is $3/43 \approx 7.0\%$. (A transposition-aware distance would count the swap once; which to use is a choice the study must report.)
:::
:::

## Touch, gesture and voice

### Touch

A finger is a large, imprecise pointer that hides what it touches. The contact area of a fingertip is around a centimetre across, and users perceive the touched point differently from where the sensor registers it (Christian Holz and Patrick Baudisch modelled this offset in their 2010 CHI paper "The generalized perceived input point model"). Targets must therefore be much larger than for a mouse. Pekka Parhi, Amy Karlson and Benjamin Bederson's study of one-handed thumb use (MobileHCI 2006) found error rates leveled off at targets of about 9.2 mm for single taps and 9.6 mm for sequences of taps. Platform guidelines, as of 2026, recommend minimum touch targets of 44 × 44 points (Apple; about 7 mm on typical iPhone screens) and 48 × 48 density-independent pixels (Android Material Design; $48/160$ inch $\approx 7.6$ mm nominally), while WCAG 2.2's success criterion 2.5.8 sets a lower legal floor of 24 × 24 CSS pixels, or enough spacing around smaller targets ([[hci/accessibility-ethics]]).

Touch screens also changed the techniques. **Hover** — the state a mouse pointer has above a target — does not exist, so tooltips and hover menus fail. **Gestures** such as swipes, pinches and long presses are fast once known but invisible: nothing on the screen signifies that a list item can be swiped to delete it, so gesture-only functions must also be available through a visible control. And touch has no physical feedback, so visual, auditory or haptic **feedback** within about 100 ms ([[hci/human-factors#def-mhp]]) is essential.

### Steering through tunnels

Fitts's law covers aimed movements to a target. Many interactions instead require moving *along* a constrained path: navigating a cascading menu without slipping off into a neighbouring item, dragging a slider, drawing within a lane. Johnny Accot and Shumin Zhai (CHI 1997) derived a law for these tasks from Fitts's law.

::: proposition Steering law {#prop-steering}
Suppose that passing through a straight tunnel of length $A$ and width $W$ is equivalent to crossing $N$ successive goals of width $W$ spaced $A/N$ apart, each obeying Fitts's law with index of difficulty $\log_2(A/(NW) + 1)$. As $N \to \infty$ the total index of difficulty tends to

$$
ID_{\text{steer}} = \frac{1}{\ln 2}\cdot\frac{A}{W},
$$

so steering time is linear in $A/W$: $T = a + b\,A/W$. For a curved path $C$ of varying width $W(s)$ the same argument gives $T = a + b\int_C \frac{ds}{W(s)}$.
:::

::: proof
The total index for $N$ goals is $N \log_2\bigl(1 + \tfrac{A}{NW}\bigr)$. Write $x = A/W$ and use $\log_2 y = \ln y/\ln 2$. Since $\ln(1 + u) = u - u^2/2 + O(u^3)$ as $u \to 0$,

$$
N \ln\Bigl(1 + \frac{x}{N}\Bigr) = x - \frac{x^2}{2N} + O\Bigl(\frac{1}{N^2}\Bigr) \to x \quad (N \to \infty),
$$

so $N \log_2(1 + x/N) \to x/\ln 2$. Time is linear in the index, so $T = a + b'\,x/\ln 2 = a + b\,A/W$ with $b = b'/\ln 2$. For a curved tunnel, split it into short pieces of length $ds$ on which $W$ is nearly constant; each contributes $ds/(W(s) \ln 2)$, and summing gives the integral.
:::

The derivation is a heuristic argument; Accot and Zhai's experiments confirmed the linear law for straight and curved tunnels, with very good fits. The contrast with Fitts's law is striking: halving the width of a tunnel *doubles* the difficulty, whereas halving a target's width adds only one bit. Cascading menus, whose submenus open only while the pointer stays in a narrow horizontal tunnel, are steering tasks — which is why good implementations tolerate a diagonal movement towards the open submenu instead of closing it.

### Voice and conversation

Voice interfaces remove the screen altogether. Their gulf of execution is wide in a new way: users cannot see what commands exist or what the system can understand, so discoverability depends on prompts, examples and graceful handling of the unexpected. Speech is serial and transient, which brings back the working-memory limits of [[hci/human-factors]] (a spoken list of options must be short), and recognition errors are inevitable, so confirmations must be cheap for low-risk actions and explicit for high-risk ones ("Transfer £500 to Alex — is that right?"). Speaking is also public and can be overheard, which matters for privacy. As of 2026, conversational assistants built on large language models handle open-ended requests far better than earlier command grammars, but they add new evaluation problems — plausible but wrong answers, and responses that vary from one attempt to the next — that are treated in the [LLM Atlas](/learn/llm/).

::: history
Ivan Sutherland's Sketchpad (MIT, 1963) introduced interactive graphics with a light pen: pointing at and dragging displayed objects, constraints and copies. Douglas Engelbart's team at SRI invented the mouse (built by William English; Engelbart's patent was granted in 1970) and demonstrated it with hypertext, windows and shared editing in the December 1968 "Mother of All Demos". The Xerox Alto (1973) and Xerox Star (1981) built the desktop of windows, icons, menus and pointer that Apple's Lisa (1983) and Macintosh (1984) brought to a wide market. Card, Moran and Newell's keystroke-level model appeared in 1980 and their GOMS framework in 1983, the same year that Shneiderman named direct manipulation. Pie menus were evaluated by Callahan and colleagues in 1988, marking menus by Kurtenbach and Buxton in 1993–94 and the steering law by Accot and Zhai in 1997. Multi-touch input was explored in research from the 1980s (Lee, Buxton and Smith described a multi-touch tablet in 1985), and reached mass-market phones with the iPhone in 2007.
:::

## Where this leads

The techniques of this chapter are arranged on screen and made legible by [[hci/visual-design]]. Predictions from the KLM, Fitts's law and the steering law are hypotheses to be checked by [[hci/usability-evaluation]] and, when the difference matters, by controlled experiments ([[hci/experiments]]), and every technique has to work for people who cannot see the screen, hold a mouse or hear the prompt ([[hci/accessibility-ethics]]). Navigation structure as a state machine is in [[hci/prototyping#def-nav-model]].

::: summary
- **Direct manipulation** ([[#def-direct-manipulation]]) — visible objects, physical actions, rapid reversible feedback — narrows Norman's **gulfs of execution and evaluation** ([[#def-gulfs]]) but is weak for bulk operations and abstraction.
- The **keystroke-level model** ([[#def-klm]]) adds operator times ($K$ 0.2 s for an average skilled typist, $P$ 1.1 s, $H$ 0.4 s, $M$ 1.35 s) to predict expert, error-free execution time; placing $M$ needs judgement, so trust rankings more than absolute times.
- **GOMS** ([[#def-goms]]) adds goals, methods and selection rules; Project Ernestine showed cognitive models paying their way.
- Shortcuts pay only if used often enough ([[#prop-breakeven]]); show them in menus so that novice use rehearses expert use, as **marking menus** do.
- For menus, **breadth beats depth** when choice is logarithmic; with item-by-item scanning the optimum breadth solves $n(\ln n - 1) = a/c$ ([[#prop-breadth]]).
- Text entry is compared by **wpm**, **MSD error rate** and **KSPC** ([[#def-text-entry]]).
- Touch needs targets of about 7–10 mm, visible alternatives to gestures, and fast feedback; steering through tunnels costs time linear in $A/W$ ([[#prop-steering]]).
:::

## Exercises

::: exercise A KLM sum {level=1 check="4.8"}
Using the operator times of [[#def-klm]] with $K = 0.20$ s, predict the time for the method $M\,P\,K\,M\,K\,K\,K\,K$ (point at a field, click, then type a four-digit code as one unit). (Enter the time in seconds.)
::: solution
The string has $M$ twice, $P$ once and $K$ five times (one click and four digits): $2 \times 1.35 + 1.10 + 5 \times 0.20 = 2.70 + 1.10 + 1.00 = 4.80$ s. The two mental operators are more than half the total, which is typical of KLM analyses.
:::
:::

::: exercise Entry rate {level=1 check="30"}
A participant transcribes a 26-character phrase in 10 seconds (first to last keystroke). What is the entry rate in words per minute? (Enter the number.)
::: solution
By [[#eq-wpm]], $(26 - 1)/10 \times 60/5 = 2.5 \times 12 = 30$ wpm.
:::
:::

::: exercise Tunnels versus targets {level=1}
By what factor does steering time's index of difficulty change when a tunnel's width is halved? By how much does a Fitts target's index change when its width is halved (for $D \gg W$)? What does this imply for cascading menus?
::: solution
Steering: $ID \propto A/W$, so halving $W$ **doubles** the index ([[#prop-steering]]). Fitts: $\log_2(D/W + 1) \approx \log_2(D/W)$ increases by $\log_2 2 = 1$ bit when $W$ halves. Narrow paths are far more costly than small targets, so cascading menus with narrow items and long horizontal paths to the submenu are slow and error-prone; tolerate diagonal movement, open submenus quickly, and keep the path short.
:::
:::

::: exercise Break-even {level=2 check="40"}
Learning a shortcut takes about 2 minutes of practice. It saves 3 seconds per use and the user uses it once a day. After how many days does learning pay off, ignoring forgetting? (Enter the number of days.)
::: solution
By [[#prop-breakeven]], $L/(u\Delta) = 120/(1 \times 3) = 40$ days. If the user forgets the shortcut more often than $u\Delta/L = 3/120 = 1/40$ per day — once every 40 days — learning never pays.
:::
:::

::: exercise Recount and compare {level=2}
Model with the KLM the task "change the font size of a selected word to 14 pt" in two ways: (a) open a font-size drop-down with the mouse and choose 14 from the list; (b) click into the font-size box, type `14` and press Enter. The hands start on the keyboard. Which is faster, and how sensitive is your answer to $M$ placement?
::: solution
(a) $H\,M\,P\,K\,M\,P\,K\,H$ — move to mouse, decide, point at the drop-down, click, find "14" in the list, point, click, return: $2 \times 0.40 + 2 \times 1.35 + 2 \times 1.10 + 2 \times 0.20 = 0.80 + 2.70 + 2.20 + 0.40 = 6.10$ s. (b) $H\,M\,P\,K\,H\,M\,K\,K\,K$ — move to mouse, decide, point at the box, click, return to keyboard, then type `14` as one unit ($M$ once by rule 2) and Enter (no $M$: a terminator, rule 4): $2 \times 0.40 + 2 \times 1.35 + 1.10 + 4 \times 0.20 = 0.80 + 2.70 + 1.10 + 0.80 = 5.40$ s. Typing wins by 0.7 s. If the second $M$ in (a) is dropped (the user knows where 14 is), (a) becomes 4.75 s and wins instead; so the ranking is *not* robust to $M$ placement here, and a test with real users — or a shortcut that avoids the mouse entirely ($M\,K\,K\,K\,K\,K$ for a key chord that focuses the box plus `14` Enter: about 2.35 s) — settles it.
:::
:::

::: exercise Error rate with corrections {level=2}
Two keyboards are compared. On keyboard A, participants reach 40 wpm with an MSD error rate of 1% and KSPC of 1.05; on keyboard B, 45 wpm with an MSD error rate of 1% and KSPC of 1.30. Interpret the numbers. Which keyboard is better?
::: solution
Both leave the same proportion of errors in the final text (1%), but on B participants pressed 30% more keys than characters produced, against 5% on A: they made many more errors and corrected them ([[#def-text-entry]]). Despite that, B is faster. Which is "better" depends on the use: B's correction effort may be tiring and frustrating over long sessions, and in contexts where corrections are costly (no backspace, eyes-free entry) its high raw error rate would hurt. Report all three measures, the learning curve over several sessions (new keyboards improve with practice) and subjective workload, and compare per participant with a within-subjects test ([[hci/experiments]]).
:::
:::

::: exercise The linear-scan optimum {level=3}
Show that the optimal breadth $n^*$ in the scanning model of [[#prop-breadth]] satisfies $n^* \approx (a/c)/\ln(a/c)$ to leading order for large $a/c$, and check the approximation against the exact root for $a/c = 10$ and $a/c = 100$. Interpret: what happens to the optimal menu as the fixed per-level cost (for instance a slow page load) grows?
::: solution
Let $k = a/c$ and $n(\ln n - 1) = k$. For large $k$, $n$ is large and $\ln n - 1 \approx \ln n$; then $n \ln n \approx k$, whose solution satisfies $\ln n \approx \ln k - \ln\ln n \approx \ln k$ to leading order, so $n \approx k/\ln k$. Numerically:

```python
from math import log
def root(k):
    lo, hi = 2.0, 1e9
    for _ in range(200):
        mid = (lo + hi) / 2
        lo, hi = (mid, hi) if mid * (log(mid) - 1) < k else (lo, mid)
    return lo
for k in (10, 100, 10000):
    print(k, round(root(k), 2), round(k / log(k), 2), round(k / (log(k) - 1), 2))
```

```console
$ python3 optimum.py
10 8.64 4.34 7.68
100 37.94 21.71 27.74
10000 1572.26 1085.74 1217.98
```

The leading-order approximation $k/\ln k$ has the right growth rate (the ratio of root to approximation tends to 1) but converges very slowly, because the neglected terms $-1$ and $\ln \ln n$ are small only relative to $\ln n$; $k/(\ln k - 1)$ is better for moderate $k$ but also falls behind as $k$ grows. Asymptotic formulas like these show the shape of the dependence; for actual numbers, solve the equation numerically, as here. Interpretation: $n^*$ grows almost linearly with $k = a/c$, so when each level is expensive (a page load, a spoken prompt — though spoken prompts also make $c$ large) menus should be broad and shallow, and when scanning each item is expensive, narrower.
:::
:::

::: exercise A text-entry analysis tool {level=3}
Extend the program of [[#ex-wpm]] to read a list of (presented, transcribed, seconds, keystrokes) records for one participant and report mean wpm, mean MSD error rate and mean KSPC. Test it on the record of [[#ex-wpm]] with 47 keystrokes and on a perfect record you construct. Why should you average per phrase and then over phrases, rather than pooling all characters?
::: solution
```python
from statistics import mean

def msd(a, b):
    prev = list(range(len(b) + 1))
    for i, ca in enumerate(a, 1):
        cur = [i]
        for j, cb in enumerate(b, 1):
            cur.append(min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (ca != cb)))
        prev = cur
    return prev[-1]

def summarise(records):
    """records: (presented, transcribed, seconds, keystrokes) per phrase."""
    rates = [(len(t) - 1) / s * 12 for p, t, s, k in records]
    errors = [msd(p, t) / max(len(p), len(t)) for p, t, s, k in records]
    kspc = [k / len(t) for p, t, s, k in records]
    return mean(rates), 100 * mean(errors), mean(kspc)

records = [
    ("the quick brown fox jumps over the lazy dog",
     "the quikc brown fox jumps ovr the lazy dog", 9.6, 47),
    ("hello world", "hello world", 2.0, 11),        # perfect: KSPC 1, no errors
]
wpm, err, kspc = summarise(records)
print(f"{wpm:.2f} wpm, {err:.2f}% MSD error, KSPC {kspc:.3f}")
```

```console
$ python3 summary.py
55.62 wpm, 3.49% MSD error, KSPC 1.060
```

Check by hand: the perfect phrase gives $(11 - 1)/2 \times 12 = 60$ wpm, no errors and KSPC $11/11 = 1$; the first gives $51.25$ wpm, $3/43 \approx 6.98\%$ and KSPC $47/42 \approx 1.119$. The means are $(51.25 + 60)/2 = 55.625$ wpm, $6.98/2 \approx 3.49\%$ and $(1.119 + 1)/2 \approx 1.060$, matching the output.

*Why average per phrase*: phrases differ in length, and pooling all characters weights long phrases more heavily; the standard practice (MacKenzie and Soukoreff) is to compute each measure per phrase, then average per participant, so that each participant contributes equally to the comparison between conditions.
:::
:::
