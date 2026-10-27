Two programs put a menu bar at the top of the screen. In the first, the bar belongs to the window, a few pixels below the window's title. In the second, it sits at the very top edge of the display. Move the mouse to "File" in each and time yourself: the second is noticeably faster, even though it is usually *farther* away. The reason is that the pointer stops at the edge of the screen, so you can throw it upwards as hard as you like and still land on the bar — the target is, in effect, infinitely tall. A one-line law of human motor performance, Fitts's law, predicts the difference, and it predicts it well enough to be used in design reviews and device evaluations.

This chapter is about the people on the other side of the screen, treated as the engineering component they are: a perceptual system with limited acuity and attention, a memory with a small working store and a vast but unreliable long-term one, and a motor system whose speed trades off against accuracy in a lawful way. We meet the **Model Human Processor**, the classic engineering summary of these facts; then vision and visual attention, memory and mental models, and two quantitative laws — the **Hick–Hyman law** for choosing and **Fitts's law** for pointing — with their derivations, their fitted constants and, just as important, their limits. Later chapters use these results constantly: [[hci/interaction-techniques]] builds keystroke-level models on them, [[hci/visual-design]] builds on vision and colour, and [[hci/experiments]] shows how to measure them properly.

## The human as an information processor

Psychology has many models of the mind; interface designers need one that predicts *times* and *errors* well enough to compare two designs before building them. Stuart Card, Thomas Moran and Allen Newell assembled such a model from decades of experimental results in *The Psychology of Human–Computer Interaction* (1983).

::: definition Model Human Processor {#def-mhp}
The **Model Human Processor** (MHP) describes a person as three processors with associated memories:

- a **perceptual processor** that turns sensory input into representations in short-lived **visual** and **auditory image stores**, with cycle time $\tau_P$;
- a **cognitive processor** that works on the contents of **working memory**, retrieving from and storing into **long-term memory**, with cycle time $\tau_C$;
- a **motor processor** that turns decisions into movements, with cycle time $\tau_M$.

Card, Moran and Newell give each parameter a typical value and a range observed across studies:

| parameter | typical value | range |
|---|---|---|
| perceptual cycle $\tau_P$ | 100 ms | 50–200 ms |
| cognitive cycle $\tau_C$ | 70 ms | 25–170 ms |
| motor cycle $\tau_M$ | 70 ms | 30–100 ms |
| working-memory capacity | 3 chunks (7 with help from long-term memory) | 2.5–4.1 (5–9) chunks |

The visual image store holds an unprocessed image for roughly 200 ms; the auditory store holds sound for about 1.5 s.
:::

The model is deliberately crude — three serial processors, fixed cycle times — and that is its strength: it lets you add up times. The three versions of every parameter (a "Fastman", "Middleman" and "Slowman" reading of the ranges) let you bound a prediction rather than give a single number.

::: example Simple reaction time {#ex-reaction}
A monitoring tool lights a red indicator when a server fails, and the operator must press a key as soon as it appears. What response time does the Model Human Processor predict, and in what range?
::: solution
The light must be perceived (one perceptual cycle), recognised as the signal to respond (one cognitive cycle) and the key pressed (one motor cycle):

$$
T = \tau_P + \tau_C + \tau_M = 100 + 70 + 70 = 240 \text{ ms},
$$

with range $50 + 25 + 30 = 105$ ms to $200 + 170 + 100 = 470$ ms. Measured simple reaction times to a visual stimulus are indeed typically around 200–250 ms for alert young adults. If the operator must instead *choose* among several keys depending on which light appears, the time grows with the number of alternatives — the Hick–Hyman law below.
:::
:::

The perceptual cycle also explains a rule of thumb for system response times. Events less than about one perceptual cycle apart tend to fuse into one percept, so feedback that arrives within about 100 ms of an action feels like a direct consequence of it; Card, Robertson and Mackinlay (1991) used this to argue that interactive animation needs updates at least every 100 ms. Robert Miller's 1968 paper "Response time in man–computer conversational transactions" proposed a scale that Jakob Nielsen later popularised as three limits: about **0.1 s** for the feeling of instantaneous response, about **1 s** for the user's flow of thought to stay uninterrupted, and about **10 s** for attention to stay on the task at all. These are design guidelines distilled from experience and experiments, not constants of nature — but they explain why a progress indicator is needed for operations longer than a second or so.

::: warning "The MHP is a model of the brain"
The Model Human Processor is an *engineering approximation*: a way of organising empirical regularities so that times can be added. It does not claim that the brain contains three serial processors with fixed clocks, and cognitive neuroscience shows massive parallelism instead. Use it for what it does well — order-of-magnitude predictions for skilled, routine, error-free behaviour — and do not use it to predict learning, problem solving, fatigue or errors, which it does not model.
:::

## Seeing

Almost every interface is seen before it is used, so the properties of human vision constrain everything from text size to the placement of error messages.

### Visual angle and acuity

The size of an object *on the retina* depends on its size and its distance, so vision scientists measure size as an angle.

::: definition Visual angle {#def-visual-angle}
An object of height $h$ seen face-on at distance $d$ subtends the **visual angle**

$$
\theta = 2 \arctan\frac{h}{2d} \approx \frac{h}{d} \text{ radians} \quad (h \ll d).
$$ {#eq-visual-angle}

Angles are given in degrees, minutes of arc ($1° = 60'$) and seconds of arc ($1' = 60''$).
:::

A useful landmark: an object of 1 cm at 57.3 cm subtends almost exactly $1°$, since $57.3 \approx 180/\pi$. Your thumbnail at arm's length is about $1.5°$–$2°$.

::: example How large is screen text on the retina? {#ex-visual-angle}
Capital letters on a laptop are about 2.5 mm high, read from 50 cm. What visual angle do they subtend? Normal ("20/20") visual acuity is conventionally defined by resolving detail of one minute of arc; Snellen chart letters for that acuity subtend $5'$. How much margin does the text have?
::: solution
By [[#eq-visual-angle]], $\theta = 2\arctan(2.5 / 1000)$. In minutes of arc,

$$
\theta = 2 \arctan(0.0025) \times \frac{180}{\pi} \times 60 \approx 17.2'.
$$

That is about $3.4$ times the height of a threshold Snellen letter, comfortable for a reader with normal acuity but not for one whose acuity is $20/80$ (letters must then subtend $20'$). Small text is not only an aesthetic choice: it excludes people, which is why [[hci/accessibility-ethics]] requires that text can be enlarged.
:::
:::

Acuity is high only in the **fovea**, the central $1°$–$2°$ of vision; it falls off steeply outside it. The eyes therefore move in rapid jumps (**saccades**) between **fixations** that last, in reading, typically a quarter of a second (Keith Rayner's 1998 review in *Psychological Bulletin* puts mean fixation durations in silent reading around 225–250 ms). Two consequences for design: a user looking at a form field will not *read* an error message on the other side of the screen, though peripheral vision may notice that something changed; and motion and flicker in the periphery capture attention strongly, which is why a blinking banner is so distracting.

### What attention picks out

Some visual properties are processed in parallel across the whole visual field. A single red item among grey ones, or a tilted line among upright ones, "pops out": the time to find it hardly depends on how many distractors there are. Anne Treisman and Garry Gelade's **feature integration theory** (1980) explained this: simple features such as colour, orientation and size are registered in parallel, but *conjunctions* of features (a red *and* tilted line among red upright and grey tilted ones) require serial, item-by-item attention, so search time grows linearly with the number of items.

::: definition Pre-attentive feature and visual search {#def-preattentive}
A **pre-attentive feature** is a visual property — such as hue, luminance, orientation, size, motion or enclosure — whose presence in a single item can be detected in roughly constant time regardless of the number of other items. In **serial search**, time to find a target grows approximately linearly with the number of items, $T \approx a + b\,n$, with a slope $b$ of tens of milliseconds per item; when the target is absent the whole display must be checked, so the slope is roughly twice as large.
:::

The design lesson is to encode the *one thing a user must find* with a pre-attentive feature that nothing else on the screen uses — and to remember that if everything is highlighted, nothing is.

Attention is also narrower than people believe. In **change blindness** experiments, observers fail to notice large changes to a scene made during a blink, a saccade or a brief flicker: Daniel Simons and Daniel Levin (1998) showed that about half of the pedestrians giving directions to a stranger did not notice when the stranger was replaced by a different person during a brief interruption. In **inattentional blindness**, people engaged in a demanding task fail to see an unexpected object in plain view: in Simons and Christopher Chabris's 1999 study, roughly half of the observers counting basketball passes did not notice a person in a gorilla suit walking through the scene. Both results come with caveats — the rates depend heavily on the task and the display — but the lesson for interfaces is robust: a change that the designer finds obvious, such as a status message appearing in a corner, may simply not be seen.

::: quiz
A dashboard shows 40 small status tiles. Healthy tiles are green squares; failed tiles are red squares; tiles that are failing *and* unacknowledged are red circles. An operator must find unacknowledged failures. Which change most reliably makes them easy to find?
- [ ] Make unacknowledged failures red triangles instead of red circles.
- [x] Give unacknowledged failures a feature no other tile has, such as a much larger size or a slow flash.
- [ ] Add a text label "UNACK" to those tiles.
- [ ] Sort the tiles alphabetically by server name.
::: solution
Among red squares, a red circle is distinguished by *shape* alone, and the operator must find it among other red tiles; shape differences like these are weak pop-out cues, and with many similar tiles search becomes slow and serial. A text label must be read, which also requires serial search. A unique, strong pre-attentive feature — large size, a unique luminance, or motion (used sparingly, since it is very distracting) — makes the target pop out regardless of the number of tiles. Sorting by name does not help find a state.
:::
:::

## Remembering

Memory researchers distinguish **sensory stores**, which hold raw input for a fraction of a second (George Sperling's 1960 partial-report experiments revealed the visual store); **working memory**, the small store in which we hold and manipulate what we are currently thinking about; and **long-term memory**, effectively unlimited but slow to write and unreliable to read. Alan Baddeley and Graham Hitch's 1974 model divides working memory further into a phonological loop (inner speech), a visuospatial sketchpad and a central executive that directs attention.

### How much working memory holds

George Miller's paper "The magical number seven, plus or minus two: some limits on our capacity for processing information" (*Psychological Review*, 1956) is one of the most cited — and most misquoted — papers in psychology. Read carefully, it makes three points. First, in **absolute judgement** tasks (identify which of $n$ tones, or of $n$ positions on a line, you just experienced) people transmit at most about 2.5 bits per dimension, about six or seven categories. Second, **immediate memory span** — the length of a list you can repeat back straight away — is also about seven items, but it is measured in **chunks**, not bits: you can recall about as many words as letters, even though a word carries far more information. Third, Miller explicitly suggested that the coincidence of the two sevens might be just that, a coincidence. The paper's lasting contribution is chunking, not the number.

::: definition Chunk {#def-chunk}
A **chunk** is a unit of information that is already a single familiar pattern in long-term memory, and so occupies one slot of working memory regardless of how many symbols it contains. Whether a string is one chunk or several depends on the person: "BBC" is one chunk to a British reader and three letters to someone who has never heard of it.
:::

Later work measured capacity with chunking and rehearsal prevented, and found it smaller. Nelson Cowan's review "The magical number 4 in short-term memory" (*Behavioral and Brain Sciences*, 2001) concluded that adults can hold about **three to five chunks** in the focus of attention, and that span measurements near seven arise when people combine items into larger chunks or rehearse them. Span also depends on the material: digits are easier than letters, short words than long words (people hold about as much as they can say in roughly two seconds, the "word-length effect" of Baddeley, Thomson and Buchanan, 1975).

::: example Chunking a verification code {#ex-chunking}
A bank sends a 16-character recovery code `7KQ9MX2RP4TLW8HZ` that users must copy from one device to another. Estimate how many glances at the source a user will need, and redesign the code to need fewer.
::: solution
Random letters and digits are each one chunk for almost everyone. With a working memory of about four chunks ([[#def-chunk]], Cowan's estimate), copying needs about $16 / 4 = 4$ glances, each followed by a search for the place one left off — itself an opportunity for an error.

Three redesigns help. (1) **Group** the code visibly: `7KQ9 MX2R P4TL W8HZ`. Each group of four fits working memory, and the gaps make the place easy to find again. (2) **Remove confusable characters** (0/O, 1/I/l, 5/S, 8/B): copying errors fall and the code can be checked for illegal characters. (3) If the code need not be random characters, **encode it as words** from a fixed list. The original carries $16 \log_2 36 \approx 82.7$ bits; words from a list of $2^{16} = 65{,}536$ carry 16 bits each, so six words (96 bits) are at least as strong — and each word is one familiar chunk, so six words are easier to copy than sixteen random characters. The best redesign is to avoid copying altogether (a QR code, or a link between devices).
:::
:::

::: warning "Never put more than seven items in a menu"
This rule, often attributed to Miller, misapplies his result. A menu is **visible**: the user recognises items rather than recalling them, so working-memory span does not limit its length. Long, well-organised menus are often faster than deep hierarchies of short ones (see the breadth–depth results in [[hci/interaction-techniques]]). Miller's paper is relevant when people must *hold* items in mind — a spoken telephone menu with nine options, or instructions on one screen that must be remembered on the next — and even there Cowan's estimate of about four chunks is the safer design target.
:::

### Recognition, recall and long-term memory

Retrieving information from long-term memory without cues (**recall**) is much harder than identifying it when it is presented (**recognition**). This asymmetry is the strongest argument for graphical menus over command lines for occasional users, and for showing recent files, auto-completion and examples: the interface supplies cues, and the user only has to recognise. Experts, for whom commands are well-learned chunks, gain from recall-based interfaces because typing a command avoids a slow visual search — a trade-off that keyboard shortcuts and command palettes try to have both ways.

### Mental models

People do not operate systems by consulting a specification; they act on a **mental model**, an internal and usually simplified theory of how the system works, formed from experience, explanation and the appearance of the system itself. Don Norman distinguished the designer's **conceptual model**, the user's mental model, and the **system image** — everything the system shows and does — through which alone the designer can influence the user's model.

Willett Kempton's study "Two theories of home heat control" (*Cognitive Science*, 1986) is the classic example. Many householders held a **valve theory** of the thermostat: turning it higher makes the heating work harder, like opening a tap, so setting it to maximum warms the house faster. The correct **feedback theory** says the thermostat is a switch that turns the heating fully on until the set temperature is reached, so setting it high only overshoots. Kempton found that the valve theory, though wrong, predicted some behaviours that saved energy — people turned it down sharply at night — and that it persisted because nothing in the system image contradicted it. The design lesson: if the interface does not show how the system works, people will invent a model, and the model they invent may be wrong in ways that matter.

## Choosing: the Hick–Hyman law

When a person must choose among several possible responses, each tied to a different stimulus, the decision takes longer the more alternatives there are. William Hick (1952) found the growth logarithmic, and Ray Hyman (1953) showed that what matters is not the number of alternatives but the **information** in the choice, in Shannon's sense ([Maths Atlas: probability spaces](/learn/maths/lesson.php?c=probability&l=probability-spaces)).

::: definition Hick–Hyman law {#def-hick}
If a person must respond to one of $n$ stimuli occurring with probabilities $p_1, \dots, p_n$, each with its own response, the mean **choice reaction time** is

$$
T = a + b\,H, \qquad H = \sum_{i=1}^{n} p_i \log_2 \frac{1}{p_i} \text{ bits},
$$ {#eq-hick}

where $a$ and $b$ are constants fitted to the person and task. For $n$ equally likely alternatives $H = \log_2 n$; Hick's own fit used $\log_2(n+1)$, the extra alternative accounting for uncertainty about whether a stimulus will occur at all. Card, Moran and Newell give $b \approx 150$ ms/bit (range 0–157 ms/bit) as a typical value.
:::

The entropy $H$ is maximal, $\log_2 n$, when the alternatives are equally likely; skewed probabilities lower it and speed up the average decision, because people learn to prepare for the likely stimuli.

::: example Uneven choices {#ex-hick}
A support agent classifies incoming tickets into four queues: Billing (50% of tickets), Login (25%), Bug (12.5%) and Other (12.5%), pressing one of four keys. Compare the information per decision with that for four equally likely queues, and predict the difference in mean decision time with $b = 150$ ms/bit.
::: solution
By [[#eq-hick]],

$$
H = 0.5 \log_2 2 + 0.25 \log_2 4 + 2 \times 0.125 \log_2 8 = 0.5 + 0.5 + 0.75 = 1.75 \text{ bits},
$$

against $\log_2 4 = 2$ bits for equal frequencies. The predicted difference is $0.25 \times 150 \approx 38$ ms per decision: real, but small next to the time to read a ticket. The law predicts the *choice* component only.
:::
:::

The law is often over-applied. It describes situations in which the stimulus–response mapping is well practised and the cost is in *deciding*; it says nothing about visual search through unfamiliar items, which is roughly linear in the number of items ([[#def-preattentive]]). For a novice scanning an unfamiliar menu, search time grows linearly with its length; as the user learns where items are, it approaches the logarithmic Hick–Hyman behaviour (Andy Cockburn, Carl Gutwin and Saul Greenberg modelled this transition in their 2007 CHI paper "A predictive model of menu performance").

## Pointing: Fitts's law

In 1954 Paul Fitts asked people to tap alternately between two metal plates of width $W$ whose centres were a distance $D$ apart, as fast as they could while still hitting them. Movement time grew linearly with the logarithm of $D/W$: doubling the distance cost the same as halving the width. Fitts, inspired by Shannon, called the logarithm an **index of difficulty** in bits.

::: definition Fitts's law (Shannon formulation) {#def-fitts}
For a rapid aimed movement of amplitude $D$ to a target of width $W$ measured along the line of motion, the **index of difficulty** is

$$
ID = \log_2\left(\frac{D}{W} + 1\right) \text{ bits},
$$ {#eq-fitts-id}

and the mean **movement time** is

$$
MT = a + b \cdot ID,
$$ {#eq-fitts}

where the intercept $a$ (s) and slope $b$ (s/bit) are fitted by linear regression for a given device, limb and task. This "Shannon formulation" was advocated by I. Scott MacKenzie (1989, 1992); Fitts's original index was $\log_2(2D/W)$.
:::

MacKenzie preferred the Shannon form for three reasons: it fits data at least as well, it follows Shannon's channel-capacity theorem more closely, and it never goes negative — Fitts's form gives a negative index when $W > 2D$, which happens with large, close targets. In practice the two indices differ by less than one bit whenever $D \ge W$ ([[#ex-forms]]).

### Why a logarithm? The iterative-corrections model

Why should time grow with the *logarithm* of $D/W$? A simple answer, due to Crossman and Goodeve (presented in 1963, published in 1983) and Keele (1968), is that an aimed movement is a sequence of corrections, each of which reduces the remaining error by a fixed factor.

::: proposition Fitts's law from iterative corrections {#prop-iterative}
Suppose an aimed movement consists of submovements, each taking the same time $t$, and that each submovement covers the remaining distance with a constant relative error $\varepsilon$ ($0 < \varepsilon < 1$): if $x_i$ is the distance to the target centre after $i$ submovements, then $x_{i+1} = \varepsilon x_i$, with $x_0 = D$. Suppose the movement ends as soon as the pointer is within $W/2$ of the centre, and that starting takes a fixed time $a$. Then the movement time is, up to rounding to a whole number of submovements,

$$
MT = a + b \log_2 \frac{2D}{W}, \qquad b = \frac{t}{\log_2 (1/\varepsilon)}.
$$
:::

::: proof
By induction $x_n = \varepsilon^n D$. The movement ends after the smallest $n$ with $\varepsilon^n D \le W/2$. Taking base-2 logarithms of $\varepsilon^n D \le W/2$ gives $n \log_2 \varepsilon \le \log_2 (W / 2D)$, and dividing by $\log_2 \varepsilon < 0$ reverses the inequality:

$$
n \ge \frac{\log_2(2D/W)}{\log_2(1/\varepsilon)}.
$$

So $n = \lceil \log_2(2D/W) / \log_2(1/\varepsilon) \rceil$, and $MT = a + n t$. Ignoring the ceiling (averaging over many movements and distances smooths it), $MT = a + \bigl(t / \log_2(1/\varepsilon)\bigr) \log_2(2D/W)$.
:::

The model explains the form of the law and why $b$ depends on the device: a device that lets each correction be more accurate (smaller $\varepsilon$) or faster (smaller $t$) has a smaller slope. If each correction took one Model Human Processor cycle, $t = \tau_P + \tau_C + \tau_M = 240$ ms, and reduced the error to 7% of its previous value, then $b = 0.24 / \log_2(1/0.07) \approx 63$ ms/bit — the right order of magnitude for measured slopes.

As a *mechanism*, however, the model is wrong in detail. Langolf, Chaffin and Foulke (1976) and later kinematic recordings showed that most aimed movements consist of one large ballistic submovement followed by at most one or two corrections, not a long geometric sequence. David Meyer and colleagues' **stochastic optimised-submovement model** (*Psychological Review*, 1988) instead assumes a primary movement whose endpoint spread grows with its speed, and an optimal trade-off between moving fast and needing a correction; it predicts $MT = a + b\sqrt{D/W}$ for two submovements, a curve that is almost indistinguishable from the logarithm over the range of $D/W$ found in experiments. Fitts's law is best regarded as an excellent *empirical* regularity with several candidate explanations.

::: widget plot
f: a + b*log2(x/w + 1); a + b*log2(x/(4*w) + 1)
x: 0, 1000
y: 0, 1400
sliders: w=16:4:64:4; a=100:0:300:10; b=150:50:250:10
labels: \text{width } W; \text{width } 4W
caption: Predicted movement time (ms) against distance $D$ (pixels) for a target of width $W$ (first curve) and one four times as wide (second curve), with intercept $a$ and slope $b$. The curves are logarithmic: the first hundred pixels cost far more than the next hundred. Quadrupling the width saves exactly $b \log_2 4 = 2b$ ms once $D \gg W$. Increase $b$ to model a slower device and watch the gap widen.
:::

### Fitting the law

The constants $a$ and $b$ are found by measuring several $(D, W)$ conditions and fitting a straight line to mean movement time against $ID$ by least squares ([Maths Atlas: regression](/learn/maths/lesson.php?c=statistics&l=regression)).

::: example Fitting $a$ and $b$ {#ex-fitts-fit}
In an illustrative (invented) pointing session, six conditions gave these mean movement times. Fit [[#eq-fitts]].

| $D$ (px) | $W$ (px) | $MT$ (ms) |
|---|---|---|
| 64 | 32 | 334 |
| 128 | 32 | 452 |
| 256 | 32 | 603 |
| 128 | 8 | 745 |
| 256 | 8 | 853 |
| 512 | 8 | 1013 |

::: solution
Compute $ID = \log_2(D/W + 1)$ for each row and regress $MT$ on it:

```python
from math import log2

# Illustrative mean movement times (ms) for six (D, W) conditions.
conds = [(64, 32, 334), (128, 32, 452), (256, 32, 603),
         (128, 8, 745), (256, 8, 853), (512, 8, 1013)]
ids = [log2(d / w + 1) for d, w, _ in conds]
mts = [t for _, _, t in conds]
n = len(ids)
mx, my = sum(ids) / n, sum(mts) / n
sxy = sum((x - mx) * (y - my) for x, y in zip(ids, mts))
sxx = sum((x - mx) ** 2 for x in ids)
b = sxy / sxx
a = my - b * mx
ss_res = sum((y - (a + b * x)) ** 2 for x, y in zip(ids, mts))
ss_tot = sum((y - my) ** 2 for y in mts)
for (d, w, t), x in zip(conds, ids):
    print(f"D={d:4d} W={w:3d} ID={x:.3f} MT={t} pred={a + b * x:.0f}")
print(f"a = {a:.1f} ms, b = {b:.1f} ms/bit, R^2 = {1 - ss_res / ss_tot:.4f}")
print(f"1/b = {1000 / b:.2f} bits/s")
```

```console
$ python3 fitreg.py
D=  64 W= 32 ID=1.585 MT=334 pred=346
D= 128 W= 32 ID=2.322 MT=452 pred=457
D= 256 W= 32 ID=3.170 MT=603 pred=586
D= 128 W=  8 ID=4.087 MT=745 pred=724
D= 256 W=  8 ID=5.044 MT=853 pred=869
D= 512 W=  8 ID=6.022 MT=1013 pred=1017
a = 106.2 ms, b = 151.3 ms/bit, R^2 = 0.9964
1/b = 6.61 bits/s
```

The fit is $MT \approx 106 + 151 \cdot ID$ ms. Note that $(128, 32)$ and $(256, 8)$ have different distances *and* widths but the law predicts them from $ID$ alone. A very high $R^2$ on condition *means* is typical of Fitts's law studies and should not impress you too much: means average away almost all variability, and six points on a line fit well under many models ([[hci/experiments]]).
:::
:::

::: widget regression
points: 1.585,334; 2.322,452; 3.170,603; 4.087,745; 5.044,853; 6.022,1013
degree: 1
residuals: true
caption: The six condition means of [[#ex-fitts-fit]], movement time (ms) against index of difficulty (bits), with the least-squares line. Drag a point to see how much one condition moves the slope — and why studies use several distances and widths spread over a wide range of $ID$.
:::

### Effective width and throughput

People do not hit targets exactly as instructed. Some participants play safe and land near the centre; others go fast and miss more often. The *nominal* width $W$ then misdescribes the accuracy actually achieved, and comparisons between devices or people become unfair. Welford's adjustment, recommended by ISO 9241-9 (2000) and its successor ISO 9241-411 (2012) and set out by Soukoreff and MacKenzie (2004), replaces $W$ by the **effective width** computed from the spread of the endpoints.

::: definition Effective width and throughput {#def-throughput}
Let $s_x$ be the standard deviation of the selection endpoints measured along the axis of movement in one condition. The **effective width** is $W_e = 4.133\,s_x$, the **effective distance** $D_e$ is the mean actual movement amplitude, and the **effective index of difficulty** is $ID_e = \log_2(D_e/W_e + 1)$. The **throughput** of the condition is

$$
TP = \frac{ID_e}{MT} \text{ bits/s},
$$ {#eq-throughput}

and a participant's throughput is the mean over conditions; a device's throughput is the mean over participants.
:::

Where does 4.133 come from? It is the width of a uniform distribution with the same information content as normally distributed endpoints.

::: proposition The constant 4.133 {#prop-4133}
The differential entropy of a normal distribution with standard deviation $\sigma$ equals that of a uniform distribution of width $\sqrt{2\pi e}\,\sigma \approx 4.133\,\sigma$. An interval of this width centred on the mean contains about 96% of the normal distribution.
:::

::: proof
The differential entropy of a density $f$ is $h = -\int f(x) \log_2 f(x)\,dx$. For the uniform density $1/w$ on an interval of width $w$, $h = \log_2 w$. For the normal density $f(x) = (2\pi\sigma^2)^{-1/2} e^{-(x-\mu)^2/2\sigma^2}$,

$$
-\log_2 f(x) = \tfrac12 \log_2(2\pi\sigma^2) + \frac{(x-\mu)^2}{2\sigma^2}\log_2 e,
$$

and taking expectations, with $\E[(X-\mu)^2] = \sigma^2$, gives $h = \tfrac12 \log_2(2\pi\sigma^2) + \tfrac12 \log_2 e = \log_2\bigl(\sigma\sqrt{2\pi e}\bigr)$. The entropies are equal when $w = \sqrt{2\pi e}\,\sigma$, and $\sqrt{2\pi e} = 4.1327\ldots$. The interval $\mu \pm 2.066\sigma$ has probability $2\Phi(2.066) - 1 \approx 0.961$.
:::

So a participant whose errors are normally distributed and who misses about 4% of the time is using exactly the nominal width; one who never misses is "wasting" accuracy and gets credit for a smaller effective target; one who misses often is penalised with a wider one. Throughput then becomes reasonably stable across speed–accuracy strategies, which is why it — not movement time — is the standard measure for comparing pointing devices.

::: example Computing throughput {#ex-throughput}
In one condition ($D = 256$, $W = 32$ pixels) a participant made ten selections with these movement times (ms) and endpoint offsets (pixels, positive = overshoot) along the axis of movement. Compute $ID$, $W_e$, $ID_e$ and the throughput.

| trial | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|---|---|---|---|---|---|---|---|---|---|---|
| $MT$ | 612 | 655 | 590 | 701 | 634 | 580 | 668 | 642 | 619 | 699 |
| $dx$ | 3 | −7 | 11 | −2 | 9 | −12 | 5 | −4 | 14 | −6 |

::: solution
```python
from math import log2
from statistics import mean, stdev

D, W = 256, 32
times = [612, 655, 590, 701, 634, 580, 668, 642, 619, 699]
dx    = [  3,  -7,  11,  -2,   9, -12,   5,  -4,  14,  -6]

ID = log2(D / W + 1)                 # nominal index of difficulty (bits)
We = 4.133 * stdev(dx)               # effective width (sample SD)
De = D + mean(dx)                    # effective distance
IDe = log2(De / We + 1)              # effective index of difficulty
MT = mean(times) / 1000              # mean movement time (s)
print(f"ID  = {ID:.3f} bits")
print(f"SDx = {stdev(dx):.3f} px, We = {We:.2f} px, De = {De:.1f} px")
print(f"IDe = {IDe:.3f} bits, MT = {MT:.3f} s")
print(f"TP  = {IDe / MT:.2f} bits/s")
```

```console
$ python3 fitts.py
ID  = 3.170 bits
SDx = 8.621 px, We = 35.63 px, De = 257.1 px
IDe = 3.038 bits, MT = 0.640 s
TP  = 4.75 bits/s
```

The endpoints are slightly more spread than a 4%-error performer's would be, so $W_e = 35.6$ px exceeds $W = 32$ and $ID_e = 3.04$ bits is a little below the nominal 3.17. The throughput is $4.75$ bits/s. Mouse throughputs reported in the literature are mostly in the range of about 3.7 to 4.9 bits/s (Soukoreff and MacKenzie, 2004, surveying studies that used this method), so this is a plausible mouse user. Throughputs from different studies can only be compared when they are computed the same way.
:::
:::

### What Fitts's law tells designers

The law turns into design rules once you remember that $W$ is measured *along the direction of approach*, and that it can be enlarged without making a target look bigger.

::: example Targets at the screen edge {#ex-edge}
A menu bar 20 pixels tall is 400 pixels above the pointer. Compare its index of difficulty when it is inside a window with that when it is at the top edge of the screen, where the pointer cannot overshoot.
::: solution
Inside the window the target height along the approach is $W = 20$: $ID = \log_2(400/20 + 1) = \log_2 21 \approx 4.39$ bits. At the screen edge, any upward movement that reaches the bar stops on it, so overshooting is impossible and the effective $W$ is limited only by how far the user would push. Even crediting a modest effective height of 200 pixels, $ID = \log_2(400/200 + 1) = \log_2 3 \approx 1.58$ bits — about 2.8 bits less, or roughly 0.4 s saved per selection with $b = 150$ ms/bit. Corners are even better: two edges stop the pointer. This is the explanation of the opening puzzle, and of why many systems put frequently used targets on screen edges and corners.
:::
:::

Other consequences: put frequently used targets **near** where the pointer already is (context menus appear at the pointer, so $D \approx 0$); make them **large** in the direction of approach; prefer **pie menus**, whose wedge-shaped items all lie at the same short distance with wide angular targets (Callahan, Hopkins, Weiser and Shneiderman, CHI 1988, found them faster than linear menus with fewer errors); and remember that tiny gaps *between* targets matter, since a gap that triggers nothing makes the effective target smaller. The law has well-documented limits: it applies to rapid, aimed movements to visible targets with a known position; in two dimensions the definition of $W$ needs care (MacKenzie and Buxton, 1992, compared several choices, such as the smaller of width and height); it does not cover the time to *find* the target, to decide, or to correct an error; and it is fitted per device and per population, so a slope measured on students says little about older adults or people with tremor.

::: history
Paul Fitts published "The information capacity of the human motor system in controlling the amplitude of movement" in the *Journal of Experimental Psychology* in 1954, and the Hick–Hyman law appeared in William Hick's "On the rate of gain of information" (1952) and Ray Hyman's "Stimulus information as a determinant of reaction time" (1953) — all three inspired by Claude Shannon's information theory of 1948. George Miller's "magical number seven" followed in 1956. Fitts's law entered computing with Stuart Card, William English and Betty Burr's 1978 evaluation of pointing devices for text selection at Xerox PARC, which found the mouse fastest of the four devices tested and its performance limited by the human, not the device — a result that helped bring the mouse into Xerox's products. Card, Moran and Newell's *The Psychology of Human–Computer Interaction* (1983) collected these laws into the Model Human Processor. MacKenzie's 1992 review in *Human–Computer Interaction* made the Shannon formulation the standard, and ISO 9241-9 (2000) standardised throughput-based device evaluation; Nelson Cowan's 2001 review revised the capacity of working memory down to about four chunks.
:::

## Where this leads

The times of this chapter are the operators of the **keystroke-level model** and of GOMS in [[hci/interaction-techniques]], where Fitts's law also explains menu design, touch target sizes and the steering law. Vision, colour perception and pre-attentive features underpin [[hci/visual-design]]. The care needed to fit and compare these laws — participants, designs, regression and its pitfalls — is the subject of [[hci/experiments]], and the variation between people that the "typical" constants hide is a central concern of [[hci/accessibility-ethics]].

::: summary
- The **Model Human Processor** ([[#def-mhp]]) models a user as perceptual, cognitive and motor processors with cycle times of about 100, 70 and 70 ms; it is an engineering approximation for adding up times of skilled behaviour, with ranges, not a model of the brain.
- Size on the retina is a **visual angle** ([[#def-visual-angle]]); acuity is high only in the fovea, attention is narrow, and **pre-attentive features** ([[#def-preattentive]]) are the way to make one item findable at a glance.
- Working memory holds about **three to five chunks** (Cowan 2001); Miller's 1956 "seven" was measured with chunking and rehearsal and is often misapplied, for instance to visible menus. Design for recognition rather than recall.
- Users act on **mental models**; the system image is the designer's only channel to them.
- The **Hick–Hyman law** $T = a + bH$ ([[#def-hick]]) relates choice time to the information in the choice, for practised mappings; unfamiliar visual search is linear instead.
- **Fitts's law** $MT = a + b \log_2(D/W + 1)$ ([[#def-fitts]]) follows from an iterative-corrections model ([[#prop-iterative]]), though the real mechanism is different; constants must be fitted.
- Compare devices by **throughput** with the effective width $W_e = 4.133\,s_x$ ([[#def-throughput]], [[#prop-4133]]); design with large, near and edge targets.
:::

## Exercises

::: exercise Index of difficulty {level=1 check="4"}
A button 40 pixels wide is 600 pixels from the pointer, along the direction of motion. What is its index of difficulty in the Shannon formulation? (Enter the number of bits.)
::: solution
By [[#eq-fitts-id]], $ID = \log_2(600/40 + 1) = \log_2 16 = 4$ bits.
:::
:::

::: exercise Predicted time {level=1 check="700"}
With $a = 100$ ms and $b = 150$ ms/bit, predict the movement time to the button of the previous exercise. (Enter the time in ms.)
::: solution
$MT = 100 + 150 \times 4 = 700$ ms.
:::
:::

::: exercise Information in a choice {level=1 check="1.5"}
An operator responds to three alarms with probabilities $1/2$, $1/4$ and $1/4$. How much information (bits) does each decision carry, according to the Hick–Hyman law? (Enter the number of bits.)
::: solution
$H = \tfrac12 \log_2 2 + 2 \times \tfrac14 \log_2 4 = 0.5 + 1 = 1.5$ bits ([[#eq-hick]]).
:::
:::

::: exercise Minimum letter height {level=2 check="1200*tan(0.15*pi/180)"}
A kiosk will be read from 60 cm. The design team wants capital letters to subtend at least $0.3°$ of visual angle. What is the minimum letter height in mm? (Enter the height in millimetres.)
::: solution
Invert [[#eq-visual-angle]]: $h = 2d \tan(\theta/2) = 2 \times 600 \times \tan(0.15°) \approx 3.14$ mm. The small-angle approximation $h \approx d\theta = 600 \times 0.3 \times \pi/180 \approx 3.14$ mm agrees to three figures. ($0.3° = 18'$, a little over three times a threshold Snellen letter.)
:::
:::

::: exercise Effective width {level=2 check="4.133*5"}
In one condition the endpoint standard deviation along the axis of movement is 5 pixels. What is the effective width? If the nominal width was 24 pixels, was the participant more or less accurate than the 4% error rate the effective-width method assumes? (Enter the effective width in pixels.)
::: solution
$W_e = 4.133 \times 5 = 20.665$ pixels ([[#def-throughput]]). This is smaller than the nominal 24 pixels, so the participant was *more* accurate than needed (they would miss less than about 4% of the time if the endpoints are normal); the effective index of difficulty, and hence their throughput, is correspondingly larger than the nominal values suggest.
:::
:::

::: exercise Menus and memory {level=2}
A voice-response telephone system offers callers nine options in one spoken menu ("press 1 for…"). A colleague says that "Miller's 7 ± 2" justifies nine items. Evaluate the argument, and propose a design.
::: solution
The argument is weak twice over. First, Miller's span of about seven was measured with rehearsal and chunking; Cowan's (2001) estimate for capacity without them is three to five chunks, and a caller listening to option 7 is not rehearsing options 1–6. Second, each option ("for billing enquiries, press 4") is several words and not one chunk, and the caller must simultaneously compare each option with their goal. Unlike a visual menu, a spoken menu cannot be re-scanned, so memory really does limit it. Better designs: put the most frequent options first (most callers can then stop listening early), keep spoken menus to about four options, let callers say what they want in their own words (with a fallback), allow "repeat" and "agent" at any time, and test with real callers.
:::
:::

::: exercise Comparing devices {level=2}
A study compares a touchpad and a mouse with 12 participants. The touchpad's mean movement time is lower, but its error rate is 14% against the mouse's 4%. Explain why movement time alone is a poor basis for comparison and how throughput addresses the problem. What else would you report?
::: solution
Movement time trades against accuracy: a participant can always go faster by being less careful. With a 14% error rate the touchpad users were operating at a different point on the speed–accuracy trade-off, so lower times do not show a better device. Throughput ([[#def-throughput]]) uses the effective width computed from the observed endpoint spread, so a fast but sloppy strategy produces a wide $W_e$ and a small $ID_e$, and the quotient $ID_e / MT$ is roughly invariant to the strategy ([[#prop-4133]] gives the information-theoretic basis). You should still report error rates, movement times and throughput per device, the variability between participants, the order of conditions (counterbalanced, since participants learn), and a paired statistical comparison of per-participant throughputs ([[hci/experiments]]).
:::
:::

::: exercise Three indices {level=3 #ex-forms}
Compare Fitts's original index $\log_2(2D/W)$, Welford's $\log_2(D/W + 0.5)$ and the Shannon index $\log_2(D/W + 1)$. Prove that for $D \ge W$ the Shannon and Fitts indices differ by less than 1 bit, determine how the three are ordered for $D > W$, and find the limits of the pairwise differences as $D/W \to \infty$.
::: solution
Write $r = D/W \ge 1$. Then

$$
\log_2(2r) - \log_2(r + 1) = \log_2\frac{2r}{r+1}.
$$

For $r \ge 1$, $2r \ge r + 1$, so the difference is $\ge 0$; and $2r/(r+1) < 2$ always, so it is $< 1$ bit. Hence $0 \le \log_2(2r) - \log_2(r+1) < 1$, with equality on the left only at $r = 1$. For the ordering: $r + 0.5 < r + 1$, so Welford's index is always below the Shannon index. Fitts's index exceeds Shannon's for $r > 1$ (shown above) and equals it at $r = 1$. So for $r > 1$: Welford < Shannon < Fitts. All three differences are logarithms of ratios that tend to 1: $(r+1)/(r+0.5) \to 1$ and $2r/(r+1) \to 2$ — so in fact the Fitts–Shannon difference tends to **1 bit**, not 0, while the Shannon–Welford difference tends to 0. (A constant offset of 1 bit only changes the fitted intercept $a$, not the slope $b$, which is why the forms fit large-$r$ data about equally well; they differ for small $r$, where Fitts's form goes negative for $r < 1/2$.)
:::
:::

::: exercise Throughput from two-dimensional data {level=3}
In real experiments the pointer starts and ends anywhere in the plane. Given, for each trial, the start point $s$, the target centre $t$, the selection point $p$ and the movement time, the endpoint deviation along the task axis is the projection of $p - t$ onto the unit vector from $s$ to $t$, and the actual amplitude is the projection of $p - s$. Write a function that computes the throughput of one condition from such records, and test it on a case you can check by hand.
::: solution
```python
from math import hypot, log2
from statistics import mean, stdev

def throughput(trials):
    """trials: list of (start, target, selection, time_s), points as (x, y).
    Returns (IDe, mean time, throughput) for one condition."""
    dx, amp, times = [], [], []
    for (sx, sy), (tx, ty), (px, py), mt in trials:
        L = hypot(tx - sx, ty - sy)
        ux, uy = (tx - sx) / L, (ty - sy) / L         # unit vector of the task axis
        dx.append((px - tx) * ux + (py - ty) * uy)    # signed deviation along the axis
        amp.append((px - sx) * ux + (py - sy) * uy)   # actual movement amplitude
        times.append(mt)
    We = 4.133 * stdev(dx)
    IDe = log2(mean(amp) / We + 1)
    return IDe, mean(times), IDe / mean(times)

# Check: movements along the x-axis from (0,0) to (100,0), deviations -2, 0, +2.
# Rotate the same data by 90 degrees: the answer must not change.
a = [((0, 0), (100, 0), (100 + d, 7), 0.5) for d in (-2, 0, 2)]
b = [((0, 0), (0, 100), (-7, 100 + d), 0.5) for d in (-2, 0, 2)]
print(throughput(a))
print(throughput(b))
print(log2(100 / (4.133 * 2) + 1) / 0.5)              # hand computation
```

```console
$ python3 tp2d.py
(3.7112470742467, 0.5, 7.4224941484934)
(3.7112470742467, 0.5, 7.4224941484934)
7.4224941484934
```

The deviations $-2, 0, 2$ have sample standard deviation 2, so $W_e = 8.266$, the mean amplitude is 100 and $ID_e = \log_2(100/8.266 + 1) \approx 3.71$ bits, matching the program; the perpendicular offset of 7 pixels is correctly ignored, and rotating the layout changes nothing. In a real study you would compute this per participant and condition, average over conditions for each participant, and then compare devices across participants.
:::
:::
