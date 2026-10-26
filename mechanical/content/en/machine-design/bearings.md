Every rotating shaft has to be held in place by something that lets it turn. That something is a bearing, and there are two fundamentally different ways to build one. In a **rolling bearing** the shaft and the housing are separated by balls or rollers running between hardened rings; the surfaces roll rather than slide, so friction is low even when starting from rest. In a **journal bearing** (plain or sliding bearing) the shaft — the journal — turns inside a bore with a small clearance, and the gap is filled with oil; when the shaft turns fast enough, it drags oil into the narrowing part of the gap and builds up a pressure that lifts the shaft off the bore, so that the surfaces never touch.

The two kinds fail in different ways and are designed by different methods. A rolling bearing that is properly lubricated and kept clean eventually fails by **rolling-contact fatigue**: after many millions of stress cycles under the balls or rollers, a crack starts just below a raceway surface and a flake of metal spalls out. Its design is statistical: the life of nominally identical bearings scatters over a range of ten to one or more, and bearings are chosen from catalogues for a stated life at a stated reliability. A journal bearing with a full oil film has, in principle, no wear and no fatigue life at all; it fails when the film becomes too thin, the oil too hot or the load too high for the film to carry. Its design is fluid mechanics: the lubrication theory of Osborne Reynolds.

The first half of this chapter treats rolling bearings, the second hydrodynamic journal bearings. The shaft analysis that supplies the bearing loads is in [[machine-design/shafts]]; the fatigue ideas behind the life equation are those of [[machine-design/fatigue]]; dry friction is treated in [[statics/friction]] and viscosity in [[fluid-mechanics/fluid-properties]].

Real bearing selection follows the bearing manufacturer's catalogue and the current standards — ISO 281:2007 (dynamic load ratings and rating life), ISO 76:2006 (static load ratings) and, for plain bearings, the ISO 7902 series and similar guidance. This chapter teaches the principles behind them; it is no substitute for them. Notation follows Budynas and Nisbett, *Shigley's Mechanical Engineering Design*, Chapters 11 and 12, with the ISO symbols where catalogues use them.

## Rolling bearings: parts and types

A rolling bearing has four parts: an **inner ring**, usually a press fit on the shaft; an **outer ring**, fitted in the housing; the **rolling elements** (balls, cylindrical, tapered, spherical or needle rollers) running in grooves or tracks called **raceways**; and a **cage** (separator) that keeps the elements evenly spaced. Many bearings also carry seals or shields and are greased for life.

The geometry of the contact decides what loads a bearing can carry. A ball touches a raceway at a point that spreads under load into a small ellipse; a roller touches along a line. Line contact carries more load in the same space, but is less tolerant of misalignment. The direction of the contact — the **contact angle** between the line through the contact points and the radial plane — decides how much axial load the bearing can carry: a contact angle of zero gives a purely radial bearing, a large one a bearing designed for thrust.

| type | radial load | axial load | remarks |
|---|---|---|---|
| deep-groove ball | moderate | moderate, both directions | the most common type; quiet, suited to high speeds, little tolerance of misalignment |
| angular-contact ball | moderate | high, one direction | contact angle typically $15°$–$40°$; used in pairs, often preloaded, in spindles and pumps |
| self-aligning ball | moderate | light | spherical outer raceway lets the inner ring tilt; tolerates shaft deflection and misalignment |
| cylindrical roller | high | none (or light, with flanged rings) | line contact; allows axial movement of the shaft, so used as the "floating" bearing |
| tapered roller | high | high, one direction | rollers and raceways are cones meeting at a point on the axis; used in pairs in wheel hubs and gearboxes |
| spherical roller | very high | moderate | self-aligning; heavy machinery, shock loads, deflecting shafts |
| needle roller | high for its size | none | very small radial section; often runs directly on a hardened shaft |
| thrust ball or roller | none | high | for purely axial loads at moderate speed |

The table is qualitative: actual capacities and speed limits are in the manufacturers' catalogues. A shaft is normally carried by two bearings, one **locating** (fixed axially, taking the axial load in both directions) and one **non-locating** (free to slide axially, or with a cylindrical roller bearing that allows axial movement internally), so that thermal expansion of the shaft does not load the bearings against each other.

## Rolling-contact fatigue and the rating life

Each time a ball rolls over a point on a raceway, that point sees a sharp pulse of Hertzian contact stress, typically $1$–$3\ \mathrm{GPa}$ in service. The largest shear stress lies a short distance below the surface, at a depth comparable to the half-width of the contact, and it is there, at an inclusion or other weak spot in the steel, that a fatigue crack begins. The crack grows towards the surface and a pit or flake breaks out — **spalling** — after which the bearing becomes noisy and rough and is said to have failed.

Two features of this process shape the design method: life falls steeply as load rises, and it is highly random, depending on where the weakest flaws in the stressed steel happen to lie. In a batch of identical bearings under the same load the longest lives can exceed ten times the shortest, so only the distribution of lives can be predicted.

::: definition Rating life and basic dynamic load rating {#def-rating-life}
The **rating life** $L_{10}$ of a group of apparently identical rolling bearings running under the same conditions is the number of revolutions (or the number of hours at a given constant speed) that $90\,\%$ of the group will complete or exceed before the first evidence of rolling-contact fatigue. It is the life at $90\,\%$ reliability; $10\,\%$ of the bearings are expected to fail sooner.

The **basic dynamic load rating** $C$ (ISO 281:2007; written $C_{10}$ by Budynas and Nisbett) is the constant stationary load — radial for a radial bearing, central axial for a thrust bearing — under which the rating life is one million revolutions. It is listed in every catalogue. It is a reference value for calculating life, not a load the bearing can safely carry: a bearing run continuously at $P = C$ would have a rating life of only $10^6$ revolutions.
:::

The relation between load and life comes from endurance tests: on log–log axes, life against load is a straight line, the same kind of power law as the high-cycle S–N line of fatigue. The ISO 281 form is
$$
L_{10} = \left(\frac{C}{P}\right)^{p}\quad\left[10^6\ \text{revolutions}\right], \qquad p = 3 \ \text{for ball bearings}, \quad p = \frac{10}{3}\ \text{for roller bearings},
$$ {#eq-l10}
where $P$ is the equivalent dynamic load (defined below) in the same units as $C$. The exponents rest on the theory of G. Lundberg and A. Palmgren (1947 for ball bearings, 1952 for roller bearings), which combined Hertzian contact stresses with a Weibull model of the probability that the stressed volume contains a fatal flaw, and fitted the result to SKF's endurance tests. For point contact their theory gives an exponent of 3; for ideal line contact it gives 4, and ISO 281 adopts $10/3$ for roller bearings because real rollers are crowned and work partly in point and partly in line contact. The equation is empirical and applies only where fatigue governs: it assumes adequate lubrication, cleanliness and correct fitting, and a load neither so small that the rolling elements skid nor so large that plastic deformation and other failure modes intrude; catalogues state the limits for each bearing type.

With a constant speed $n$ in rev/min, the rating life in hours is
$$
L_{10h} = \frac{10^6}{60\,n}\left(\frac{C}{P}\right)^{p}.
$$ {#eq-l10h}

Because the life varies as a power of load, the load ratio $C/P$ is what matters. Doubling the load cuts the life of a ball bearing by a factor $2^3 = 8$, that of a roller bearing by $2^{10/3} = 10.1$. Conversely, a modest increase in bearing size — and so in $C$ — buys a large increase in life.

::: widget plot
f: 3*log10(x); (10/3)*log10(x)
x: 1, 20
y: 0, 4.5
hlines: 3
labels: \text{ball},\ p = 3; \text{roller},\ p = 10/3
caption: The rating life $\log_{10}L_{10}$ ($L_{10}$ in millions of revolutions) against the load ratio $C/P$ from [[#eq-l10]]. Both curves pass through $L_{10} = 1$ (one million revolutions) at $C/P = 1$. The horizontal line marks $10^9$ revolutions, which a ball bearing reaches at $C/P = 10$ and a roller bearing at $C/P = 7.9$. Move along either curve and notice that each doubling of $C/P$ adds $0.90$ (ball) or $1.00$ (roller) to $\log_{10}L_{10}$ — a factor of 8 or 10 in life. The roller curve is steeper: at the same $C/P$ above 1 a roller bearing lives longer, but it also loses life faster when overloaded.
:::

::: example Rating life of a ball and a roller bearing {#ex-life}
A deep-groove ball bearing with $C = 25.5\ \mathrm{kN}$ (the 02-series, $35\ \mathrm{mm}$ bore bearing of Budynas and Nisbett, Table 11-2) carries a steady radial load of $3.0\ \mathrm{kN}$ at $1500\ \mathrm{rev/min}$. Find its rating life in revolutions and hours. Compare a roller bearing with the same $C$, and the effect of doubling the load on each.
::: solution
**Ball bearing.** For a purely radial load, $P = F_r = 3.0\ \mathrm{kN}$, so $C/P = 25.5/3.0 = 8.5$. From [[#eq-l10]] with $p = 3$,
$$
L_{10} = 8.5^3 = 614.1\times10^6\ \text{rev}, \qquad L_{10h} = \frac{614.1\times10^6}{60\times1500\ \mathrm{rev/h}} = 6824\ \mathrm{h}.
$$
**Roller bearing with the same rating.** With $p = 10/3$: $L_{10} = 8.5^{10/3} = 1253\times10^6\ \text{rev}$, $L_{10h} = 13\,930\ \mathrm{h}$, about twice as long.

**Doubled load.** At $P = 6.0\ \mathrm{kN}$ the ball bearing's life falls by $8$ to $76.8\times10^6$ rev ($853\ \mathrm{h}$); the roller bearing's by $10.1$ to $124\times10^6$ rev ($1381\ \mathrm{h}$).

**Sanity check.** $6824\ \mathrm{h}$ is about $3\tfrac12$ years of single-shift work — reasonable for a light-duty machine, short for one running day and night (compare the recommended lives in [[#alg-select]]). Units: $C/P$ is dimensionless and the life comes out in units of $10^6$ revolutions, as [[#eq-l10]] requires.
:::
:::

::: warning Load ratings are not all defined on the same basis
- Check what life a catalogue's rating refers to. ISO 281 ratings are for $10^6$ revolutions; some manufacturers of tapered roller bearings have listed ratings for $90\times10^6$ revolutions, which are much smaller numbers for the same bearing. Using such a rating in [[#eq-l10]] without conversion underestimates the life by a factor of $90$.
- $C$ is not a safe working load. A bearing at $P = C$ has a rating life of only one million revolutions; long lives need $P$ to be a small fraction of $C$ (a tenth gives $10^9$ revolutions for a ball bearing).
- Use the right exponent. Using $p = 3$ for a roller bearing, or $10/3$ for a ball bearing, changes the predicted life by $C/P$ to the power $1/3$ — about a factor of 2 at $C/P = 8$.
- Speed in rev/min goes with the factor $60$ in [[#eq-l10h]]; a speed in rev/s or rad/s needs a different factor.
:::

## Scatter and reliability

::: definition Weibull distribution of bearing life {#def-weibull}
Let $x = L/L_{10}$ be the life measured in units of the rating life. Bearing lives are well described by the **three-parameter Weibull distribution**, in which the reliability — the probability that a bearing survives beyond life $x$ — is
$$
R(x) = \exp\left[-\left(\frac{x - x_0}{\theta - x_0}\right)^{b}\right], \qquad x \ge x_0,
$$ {#eq-weibull}
with $R = 1$ for $x < x_0$. Here $x_0$ is the **guaranteed** (minimum) life, $\theta$ the **characteristic life** (at which $R = e^{-1} = 0.368$) and $b$ the **shape parameter** (Weibull slope), which describes the scatter: the larger $b$, the less the scatter.
:::

Budynas and Nisbett (Chapter 11) quote, for the catalogue data of one manufacturer, the parameters
$$
x_0 = 0.02, \qquad \theta - x_0 = 4.439, \qquad b = 1.483,
$$ {#eq-weibull-params}
which give $R(1) = 0.899$, i.e. $90\,\%$ survival at the rating life, as they must. These are empirical values for that data set: other manufacturers and bearing types give somewhat different parameters.

ISO 281:2007 handles reliability through a **life modification factor for reliability** $a_1$: the life $L_{nm}$ reached by $(100 - n)\,\%$ of the bearings is $a_1$ times the rating life. The 2007 standard (also JIS B 1518:2013, which follows it) tabulates

| reliability $R$ | $90\,\%$ | $95\,\%$ | $96\,\%$ | $97\,\%$ | $98\,\%$ | $99\,\%$ | $99.9\,\%$ | $99.95\,\%$ |
|---|---|---|---|---|---|---|---|---|
| $a_1$ | $1$ | $0.64$ | $0.55$ | $0.47$ | $0.37$ | $0.25$ | $0.093$ | $0.077$ |

These values follow from a Weibull distribution of slope $1.5$ with a guaranteed life of $0.05\,L_{10}$:
$$
a_1 = 0.95\left(\frac{\ln(1/R)}{\ln(1/0.9)}\right)^{2/3} + 0.05.
$$ {#eq-a1}
(For example, $R = 0.99$: $\ln(1/0.99)/\ln(1/0.9) = 0.0954$, which to the power $2/3$ is $0.209$, so $a_1 = 0.95\times0.209 + 0.05 = 0.248$, tabulated as $0.25$.) Earlier editions of ISO 281 used the two-parameter form without the $0.05$, which gives $0.21$ at $99\,\%$; that older value still appears in some books and software.

::: widget plot
f: if(x > 0.02, exp(-((x - 0.02)/4.439)^1.483), 1); if(x > 0.05, exp(-0.10536*((x - 0.05)/0.95)^1.5), 1)
x: 0, 6
y: 0, 1
hlines: 0.9; 0.99
vlines: 1
labels: \text{Weibull, Budynas and Nisbett parameters}; \text{ISO 281:2007}\ a_1\ \text{relation}
caption: Reliability $R$ against life $x = L/L_{10}$ for the Weibull parameters [[#eq-weibull-params]] and for the relation behind ISO 281's $a_1$ factor [[#eq-a1]] (solved for $R$). Both pass through $R = 0.9$ at $x = 1$. Follow the curves up to the line $R = 0.99$: the life drops to about a quarter of $L_{10}$ (ISO, $0.25$) or a little less (Weibull, $0.22$). Follow them down to $R = 0.5$: half of all bearings outlive about $3.4$–$3.5\,L_{10}$ — the median life is several times the rating life. The two models differ most in the far tails, where little test data exists.
:::

The Weibull model turns into a selection formula once it is combined with the load–life equation.

::: proposition Required load rating for a given life and reliability {#prop-c10}
A bearing must survive $x_D$ million revolutions under a design load $F_D$ with reliability $R_D$. If its lives follow [[#eq-weibull]] with parameters independent of load, and its rating life follows [[#eq-l10]], the catalogue rating must satisfy
$$
C_{10} \ge a_f\,F_D\left[\frac{x_D}{x_0 + (\theta - x_0)\left[\ln(1/R_D)\right]^{1/b}}\right]^{1/p},
$$ {#eq-c10}
where $a_f \ge 1$ is an application factor on the load. With the ISO factor instead, $C \ge a_f F_D\,(x_D/a_1)^{1/p}$.
:::

::: proof
**Assumptions.** The rating $C_{10}$ corresponds to a rating life of $10^6$ revolutions; [[#eq-l10]] holds over the load range of interest; the life distribution, expressed in units of $L_{10}$, has the same Weibull parameters at every load (the scatter scales with the rating life); the actual load is the design load multiplied by $a_f$.

At the load $a_fF_D$ the rating life is $L_{10} = (C_{10}/a_fF_D)^p$ million revolutions. The required life, in units of this rating life, is $x = x_D/L_{10}$. The reliability at that life, from [[#eq-weibull]], is at least $R_D$ when
$$
\left(\frac{x - x_0}{\theta - x_0}\right)^b \le \ln\frac{1}{R_D} \iff x \le x_0 + (\theta - x_0)\left[\ln(1/R_D)\right]^{1/b}.
$$
Substituting $x = x_D(a_fF_D/C_{10})^p$ and solving for $C_{10}$ gives [[#eq-c10]]. The ISO form follows in the same way, with $x \le a_1$ in place of the bracket.
:::

For $R_D = 0.99$ the denominator in [[#eq-c10]] is $0.02 + 4.439\times0.01005^{0.6743} = 0.220$, so a ball bearing needs a rating $(1/0.220)^{1/3} = 1.66$ times that needed at $90\,\%$ reliability for the same life. Because a machine usually depends on several bearings, a further rule is needed.

::: proposition Reliability of a set of bearings {#prop-system}
If a machine fails when any one of its $k$ bearings fails, and the bearings fail independently with reliabilities $R_1, \dots, R_k$ at the design life, the reliability of the set is
$$
R = R_1R_2\cdots R_k.
$$ {#eq-system}
For $k$ equally reliable bearings and a target $R$ for the set, each bearing needs $R_i = R^{1/k}$.
:::

::: proof
**Assumptions.** Failures are statistically independent (one bearing's failure does not change the others' probabilities) and any failure stops the machine (a series system). The machine survives only if every bearing survives; for independent events the probability of all of them is the product of their probabilities.
:::

A gearbox with four bearings and a target of $96\,\%$ for the set needs each bearing to reach $0.96^{1/4} = 0.9898$, i.e. about $99\,\%$. And a machine of four bearings each selected for $L_{10}$ has a reliability of only $0.9^4 = 0.66$ at that life — one in three machines will have had a bearing failure.

## Combined loads: the equivalent dynamic load

Most bearings carry both a radial force $F_r$ and an axial force $F_a$. Since the load ratings are defined for pure radial (or pure axial) loads, the combination is replaced by a single **equivalent dynamic load** $P$: the constant radial load that would give the same life as the actual combined load.

::: definition Equivalent dynamic load {#def-equivalent}
$$
P = X F_r + Y F_a,
$$ {#eq-p}
where $X$ is the **radial load factor** and $Y$ the **axial load factor**. For radial bearings there is a limiting ratio $e$: if $F_a/F_r \le e$, the axial load has a negligible effect and $X = 1$, $Y = 0$, so $P = F_r$; if $F_a/F_r > e$, other values apply. The factors depend on the bearing type and internal geometry and are given in ISO 281 and in each catalogue.
:::

For deep-groove ball bearings, the axial load changes the contact angle, so $e$ and $Y$ depend on how heavy the axial load is relative to the bearing's size — measured by $F_a/C_0$, with $C_0$ the static load rating defined below. An excerpt from Budynas and Nisbett, Table 11-1 (deep-groove ball bearings, after ISO 281), for $F_a/F_r > e$, where $X = 0.56$:

| $F_a/C_0$ | $0.014$ | $0.028$ | $0.056$ | $0.084$ | $0.110$ | $0.17$ | $0.28$ | $0.42$ | $0.56$ |
|---|---|---|---|---|---|---|---|---|---|
| $e$ | $0.19$ | $0.22$ | $0.26$ | $0.28$ | $0.30$ | $0.34$ | $0.38$ | $0.42$ | $0.44$ |
| $Y$ | $2.30$ | $1.99$ | $1.71$ | $1.55$ | $1.45$ | $1.31$ | $1.15$ | $1.04$ | $1.00$ |

Values in between are found by linear interpolation. Catalogues give equivalent tables, sometimes with an extra factor for the bearing's internal clearance; use the table that belongs to the bearing being selected.

Angular-contact and tapered roller bearings have a further feature: because the contact is inclined, a radial load produces an **induced axial force** inside the bearing. These bearings are therefore mounted in opposed pairs, and the axial load on each is found from the induced forces of both together with the external thrust. Budynas and Nisbett (§11-9) give the procedure used by one manufacturer of tapered roller bearings, in which the induced force is $0.47F_r/K$ with $K$ a factor for the bearing's cone angle (about $1.5$ for a radial bearing); the catalogue of the bearing in question gives the procedure to use.

::: example Equivalent load and life under a combined load {#ex-equivalent}
A deep-groove ball bearing of the 02-series with a $65\ \mathrm{mm}$ bore has $C = 55.9\ \mathrm{kN}$ and $C_0 = 34.0\ \mathrm{kN}$ (Budynas and Nisbett, Table 11-2). It carries $F_r = 7.0\ \mathrm{kN}$ and $F_a = 3.0\ \mathrm{kN}$ at $500\ \mathrm{rev/min}$. Find the equivalent load and the rating life in hours.
::: solution
**Size of the axial load.** $F_a/C_0 = 3.0/34.0 = 0.0882$, between the table entries $0.084$ and $0.110$. Interpolating,
$$
e = 0.28 + 0.02\times\frac{0.0882 - 0.084}{0.110 - 0.084} = 0.283, \qquad Y = 1.55 - 0.10\times\frac{0.0882 - 0.084}{0.026} = 1.534.
$$
**Which branch?** $F_a/F_r = 3.0/7.0 = 0.429 > e = 0.283$, so $X = 0.56$, $Y = 1.534$.

**Equivalent load.** From [[#eq-p]],
$$
P = 0.56\times7.0 + 1.534\times3.0 = 3.92 + 4.60 = 8.52\ \mathrm{kN}.
$$
**Life.** $C/P = 55.9/8.52 = 6.56$; $L_{10} = 6.56^3 = 282\times10^6$ rev, and $L_{10h} = 282\times10^6/(60\times500) = 9410\ \mathrm{h}$.

**Sanity check.** $P$ is larger than $F_r$ but smaller than the arithmetic sum $F_r + F_a = 10\ \mathrm{kN}$: the axial load counts for about one and a half times its own size here, the radial load for about half. Had the axial load been ignored, $C/P = 7.99$ and the life would have been predicted as $17\,000\ \mathrm{h}$ — almost twice the true value.
:::
:::

When the load or speed varies during a duty cycle, the same fatigue reasoning that underlies Miner's rule ([[machine-design/fatigue]]) gives a single equivalent load.

::: proposition Equivalent load for a duty cycle {#prop-duty}
If a bearing spends fractions $\alpha_1, \alpha_2, \dots$ of its revolutions ($\sum\alpha_i = 1$) at constant equivalent loads $P_1, P_2, \dots$, its rating life is that under the constant load
$$
P_\text{eq} = \left(\sum_i \alpha_i P_i^{\,p}\right)^{1/p}.
$$ {#eq-peq}
:::

::: proof
**Assumptions.** Damage accumulates linearly (the Palmgren–Miner rule, which Palmgren proposed for exactly this problem in 1924): a revolution at load $P_i$ uses up a fraction $1/L_i$ of the life, where $L_i = (C/P_i)^p$ is the rating life at that load; the order of the loads does not matter.

In a total of $L$ revolutions, $\alpha_iL$ are made at $P_i$, and failure (at $90\,\%$ reliability) occurs when the damage sums to one:
$$
\sum_i \frac{\alpha_iL}{L_i} = L\sum_i\frac{\alpha_iP_i^{\,p}}{C^p} = 1 \quad\Longrightarrow\quad L = \frac{C^p}{\sum_i\alpha_iP_i^{\,p}} = \left(\frac{C}{P_\text{eq}}\right)^p,
$$
with $P_\text{eq}$ as in [[#eq-peq]]. Note that the weights are fractions of **revolutions**, not of time: a period at high speed counts for more.
:::

## Static load rating

A bearing that rotates slowly, oscillates through small angles or stands still under load (a crane hook, a slewing ring, a machine in transport) does not fail by fatigue but by **brinelling**: permanent dents in the raceways, which later make the bearing rough and noisy. Heavy shock loads on a rotating bearing do the same.

::: definition Static load rating and static safety factor {#def-static}
The **basic static load rating** $C_0$ (ISO 76:2006) is the static load that produces, at the centre of the most heavily loaded contact, a calculated contact stress of $4600\ \mathrm{MPa}$ for self-aligning ball bearings, $4200\ \mathrm{MPa}$ for other ball bearings and $4000\ \mathrm{MPa}$ for roller bearings. At these stresses the total permanent deformation of rolling element and raceway is about $0.0001$ of the rolling-element diameter, which experience shows does not impair normal running.

The **equivalent static load** is $P_0 = X_0F_r + Y_0F_a$ with static factors from the catalogue (for deep-groove ball bearings, $X_0 = 0.6$, $Y_0 = 0.5$, with $P_0 = F_r$ if that is larger). The **static safety factor** is
$$
s_0 = \frac{C_0}{P_0},
$$ {#eq-s0}
computed with the largest load that can occur, including shocks.
:::

The required $s_0$ depends on bearing type, how smooth the load is and how quietly the bearing must run. Catalogue guide values are typically around $1$–$2$ for general machinery, higher for shock loads or where low noise matters, and below 1 for slowly rotating bearings where some permanent deformation can be tolerated. Use the guide values of the manufacturer whose bearing is selected.

## Modified rating life: beyond fatigue of clean steel

The rating life describes fatigue of standard bearing steel under good conditions. Field lives differ, often by large factors, because of the lubricant film, contamination and the stress level relative to the steel's fatigue limit. ISO 281:2007 standardised the **modified rating life**
$$
L_{nm} = a_1\,a_\text{ISO}\,L_{10},
$$ {#eq-lnm}
in which $a_1$ is the reliability factor above and $a_\text{ISO}$ is a **life modification factor** that depends on three things:

- the **viscosity ratio** $\kappa = \nu/\nu_1$, the actual kinematic viscosity of the lubricant at operating temperature divided by the viscosity needed to separate the surfaces at that speed and size: a thicker elastohydrodynamic film protects the surfaces;
- the **contamination factor** $e_C$, which falls from 1 for very clean conditions as particles in the lubricant dent the raceways and start cracks;
- the ratio of the **fatigue load limit** $C_u$ (the load below which the steel would not fatigue, following the model of E. Ioannides and T. A. Harris, 1985) to the equivalent load $P$.

The factor is read from charts in the standard and catalogues; it can be well above 1 for clean, well-lubricated, lightly loaded bearings and well below 1 for dirty or poorly lubricated ones. Many designers therefore select on $L_{10}$ with recommended lives from experience and then check $L_{nm}$ with the manufacturer's tools. Wear, corrosion, false brinelling, electrical erosion and seal failure can end a life that no fatigue equation predicts.

## Selecting a rolling bearing

Selection is a procedure that runs from the loads to a catalogue number and then checks the result.

::: algorithm Selecting a rolling bearing {#alg-select}
1. **Loads and speeds.** From the shaft analysis find the radial and axial reactions at each bearing for each operating condition, the speeds and the fraction of revolutions spent in each condition; combine them with [[#eq-peq]] if the load varies.
2. **Type and arrangement.** Choose the type from the load directions, speed, misalignment and space (see the table of types), and decide which bearing locates the shaft axially.
3. **Design life and reliability.** Choose the required life $L_D$ in hours from the duty (the table below or the catalogue's guidance) and convert it to revolutions, $x_D = 60\,n\,L_D/10^6$. Choose the reliability for each bearing with [[#eq-system]].
4. **Application factor.** Multiply the loads by an application factor $a_f$ for shocks and loads that the analysis does not capture (table below).
5. **Required rating.** Compute $C_{10}$ from [[#eq-c10]] (or with $a_1$); for combined loads, guess $X$ and $Y$ (for example $X = 0.56$, $Y = 1.5$), select, then recompute $P$ with the selected bearing's $C_0$ and iterate.
6. **Select** the smallest bearing in the chosen series whose rating is at least the required value and whose bore suits the shaft.
7. **Check** the static safety factor [[#eq-s0]] at the peak load, the speed against the catalogue's limiting speed, the lubricant viscosity and cleanliness ($a_\text{ISO}$), the fits and the shaft shoulder heights.
:::

Recommended design lives come from experience, not theory. Budynas and Nisbett (Table 11-4) give the following ranges:

| type of application | life ($10^3\ \mathrm{h}$) |
|---|---|
| instruments and apparatus for infrequent use | up to $0.5$ |
| aircraft engines | $0.5$–$2$ |
| machines for short or intermittent operation, where service interruption is of minor importance | $4$–$8$ |
| machines for intermittent service, where reliable operation is of great importance | $8$–$14$ |
| machines for 8-hour service that are not always fully utilised | $14$–$20$ |
| machines for 8-hour service that are fully utilised | $20$–$30$ |
| machines for continuous 24-hour service | $50$–$60$ |
| machines for continuous 24-hour service where reliability is of extreme importance | $100$–$200$ |

Bearing manufacturers publish similar guide tables. Industrial electric motors and gear drives typically fall in the single-shift or continuous-service rows — a few tens of thousands of hours; the $100\,000\ \mathrm{h}$ class is for continuous-duty machines whose stoppage is very costly (power-station auxiliaries, paper machines). Budynas and Nisbett (Table 11-5) give these application factors:

| type of application | $a_f$ |
|---|---|
| precision gearing | $1.0$–$1.1$ |
| commercial gearing | $1.1$–$1.3$ |
| applications with poor bearing seals | $1.2$ |
| machinery with no impact | $1.0$–$1.2$ |
| machinery with light impact | $1.2$–$1.5$ |
| machinery with moderate impact | $1.5$–$3.0$ |

::: example Selecting a bearing for a gear shaft {#ex-select}
A shaft of a commercial gear drive running at $960\ \mathrm{rev/min}$, single shift, fully utilised, has a radial reaction of $2.5\ \mathrm{kN}$ at one bearing, with no significant axial load. Select a deep-groove ball bearing of the 02-series from Budynas and Nisbett, Table 11-2 (bores $60\ \mathrm{mm}$: $C_{10} = 47.5\ \mathrm{kN}$, $C_0 = 28.0\ \mathrm{kN}$; $65\ \mathrm{mm}$: $55.9\ \mathrm{kN}$, $34.0\ \mathrm{kN}$) for $99\,\%$ reliability.
::: solution
**Life.** Single shift, fully utilised: take $L_D = 20\,000\ \mathrm{h}$, the bottom of the $20$–$30\times10^3\ \mathrm{h}$ range. Then $x_D = 60\times960\times20\,000/10^6 = 1152$ million revolutions.

**Application factor.** Commercial gearing: $a_f = 1.2$, so the design load is $1.2\times2.5 = 3.0\ \mathrm{kN}$.

**Required rating, Weibull model.** From [[#eq-c10]] with $p = 3$ and the parameters [[#eq-weibull-params]], the denominator is $0.02 + 4.439\times(\ln(1/0.99))^{1/1.483} = 0.2196$:
$$
C_{10} \ge 3.0\left(\frac{1152}{0.2196}\right)^{1/3} = 3.0\times17.38 = 52.1\ \mathrm{kN}.
$$
**Required rating, ISO factor.** With $a_1 = 0.25$: $C \ge 3.0\times(1152/0.25)^{1/3} = 3.0\times16.64 = 49.9\ \mathrm{kN}$.

**Selection.** The $60\ \mathrm{mm}$ bearing ($47.5\ \mathrm{kN}$) is too small by either model; the $65\ \mathrm{mm}$ bearing ($55.9\ \mathrm{kN}$) satisfies both. Its rating life at $3.0\ \mathrm{kN}$ is $(55.9/3.0)^3 = 6470$ million revolutions, so $x = 1152/6470 = 0.178$, and [[#eq-weibull]] gives $R = 0.993$.

**Static check.** $P_0 = F_r = 2.5\ \mathrm{kN}$ (no axial load), $s_0 = 34.0/2.5 = 13.6$ — static load is no concern.

**Sanity check.** At $90\,\%$ reliability the required rating would have been $3.0\times1152^{1/3} = 31.4\ \mathrm{kN}$; asking for $99\,\%$ costs a factor of $1.66$ in rating, consistent with the remark after [[#prop-c10]]. In practice the bore would also have to suit the shaft diameter from [[machine-design/shafts]]; if the shaft is smaller, a bearing of a heavier series (03) with a smaller bore and the same rating is the alternative.
:::
:::

## Journal bearings and hydrodynamic lubrication

A journal bearing is a shaft in a hole with oil in the gap — a crankshaft main bearing, a turbine bearing. When the shaft is at rest it sits on the bottom of the bore, metal on metal. As it starts to turn it climbs a little up the bore and rubs (**boundary lubrication**: thin adsorbed films of lubricant and additives on the surfaces carry the load, friction coefficient of the order of $0.05$–$0.15$). As the speed rises, the rotating journal drags oil into the converging gap ahead of the minimum clearance. The oil cannot escape fast enough, its pressure rises, and at a high enough speed the pressure carries the whole load: the journal floats on a film a few to a few tens of micrometres thick. This is **hydrodynamic** (full-film) lubrication. Friction is then purely viscous shear of the oil, with coefficients of the order of $0.001$–$0.01$, and in principle there is no wear. Between the two lies **mixed lubrication**, where the film carries part of the load and asperities the rest.

R. Stribeck's experiments on journal and rolling bearings (presented in 1901 and published in 1902) showed the friction coefficient falling steeply from its boundary value as speed rose, passing through a minimum and then rising slowly. Later work, notably M. D. Hersey's (1914), showed that the data for different loads, speeds and oils collapse onto one curve when plotted against the dimensionless group $\mu N/P$ — viscosity times speed divided by the load per unit projected area. The curve is called the **Stribeck curve**. To the right of its minimum (full film) friction rises with $\mu N/P$; this region is thermally stable, since a hotter bearing has thinner oil and less friction. To the left the film breaks down. Bearings are designed to run well to the right of the minimum.

::: definition Viscosity {#def-viscosity}
In a Newtonian fluid sheared between two parallel plates a distance $h$ apart, one moving at speed $U$ relative to the other, the shear stress is
$$
\tau = \mu\frac{du}{dy} = \mu\frac{U}{h},
$$ {#eq-newton}
where $\mu$ is the **dynamic viscosity** in $\mathrm{Pa\,s}$ ($1\ \mathrm{mPa\,s} = 1\ \mathrm{cP}$). The **kinematic viscosity** is $\nu = \mu/\rho$ in $\mathrm{m^2/s}$ (catalogues use $\mathrm{mm^2/s} = \mathrm{cSt}$). Industrial oils are sold by **ISO viscosity grade** (ISO 3448): ISO VG 32, for example, has a kinematic viscosity of $32\ \mathrm{mm^2/s}$ ($\pm10\,\%$) at $40\ \mathrm{°C}$.
:::

Viscosity falls steeply with temperature — a typical mineral oil loses about half its viscosity for every $20\ \mathrm{°C}$ rise in the usual operating range — so the viscosity in every bearing calculation must be taken at the oil's operating temperature in the film, not at $40\ \mathrm{°C}$. Finding that temperature is itself part of the design (see below).

### Petroff's equation

The simplest bearing is one with no load at all: the journal concentric with the bore, and the oil sheared uniformly. N. P. Petrov analysed this case in 1883, and his result still gives a useful estimate of friction in lightly loaded bearings.

::: proposition Petroff's equation {#prop-petroff}
A journal of radius $r$ and length $l$ turns at $N$ rev/s, concentric with a bearing of radial clearance $c$, the clearance being filled with oil of viscosity $\mu$. The friction torque is
$$
T = \frac{4\pi^2r^3l\mu N}{c},
$$ {#eq-petroff-torque}
and, defining the friction coefficient by $T = fWr$ for a load $W$ and the unit load $P = W/(2rl)$ on the projected area,
$$
f = 2\pi^2\,\frac{\mu N}{P}\,\frac{r}{c}.
$$ {#eq-petroff}
:::

::: proof
**Assumptions.** The journal is concentric with the bore (no eccentricity, as for a vanishingly small load), so the film thickness is the radial clearance $c$ everywhere; $c \ll r$, so the film may be treated as flat; the flow is laminar and the velocity varies linearly across the film; the oil is Newtonian with constant viscosity and fills the whole clearance; there is no flow along the axis and end effects are neglected.

The surface speed of the journal is $U = 2\pi rN$. By [[#eq-newton]] the shear stress on the journal surface is $\tau = \mu U/c = 2\pi r\mu N/c$. It acts over the area $2\pi rl$, giving a friction force $F = \tau\cdot2\pi rl = 4\pi^2r^2l\mu N/c$, whose moment about the axis is
$$
T = Fr = \frac{4\pi^2r^3l\mu N}{c}.
$$
Now let a small load $W$ act, with $P = W/(2rl)$, so $W = 2rlP$. Then $f = T/(Wr) = 4\pi^2r^3l\mu N/(c\cdot2r^2lP) = 2\pi^2(\mu N/P)(r/c)$.
:::

Petroff's equation contains the essential groups. The friction coefficient depends on $\mu N/P$, the Hersey group of the Stribeck curve, and on the clearance ratio $r/c$ (typically $500$–$1000$; equivalently $c/r$ of about $0.001$–$0.002$). It cannot tell how much load a bearing can carry — a concentric journal generates no pressure — but it is the limit approached by real bearings when the load is light.

::: example Friction and power loss by Petroff's equation {#ex-petroff}
A lightly loaded bearing has $d = 50\ \mathrm{mm}$ ($r = 25\ \mathrm{mm}$), $l = 40\ \mathrm{mm}$, radial clearance $c = 0.030\ \mathrm{mm}$ and carries $W = 400\ \mathrm{N}$ at $1500\ \mathrm{rev/min}$. The oil viscosity at the film temperature is $\mu = 10\ \mathrm{mPa\,s}$. Estimate the friction coefficient, the friction torque and the power lost.
::: solution
**Groups.** $N = 1500/60 = 25\ \mathrm{rev/s}$; $P = W/(2rl) = 400/(0.050\times0.040) = 200\ \mathrm{kPa}$; $r/c = 25/0.030 = 833.3$;
$$
\frac{\mu N}{P} = \frac{0.010\ \mathrm{Pa\,s}\times25\ \mathrm{s^{-1}}}{200\,000\ \mathrm{Pa}} = 1.25\times10^{-6}.
$$
**Friction coefficient.** From [[#eq-petroff]], $f = 2\pi^2\times1.25\times10^{-6}\times833.3 = 0.0206$.

**Torque and power.** $T = fWr = 0.0206\times400\times0.025 = 0.206\ \mathrm{N\,m}$ (equal, as it must be, to [[#eq-petroff-torque]]: $4\pi^2\times0.025^3\times0.040\times0.010\times25/(3.0\times10^{-5}) = 0.206\ \mathrm{N\,m}$). The power dissipated is $T\omega = 0.206\times2\pi\times25 = 32\ \mathrm{W}$, all of which heats the oil.

**Sanity check.** The Sommerfeld number defined below is $S = (r/c)^2\mu N/P = 0.868$, large, so the load is indeed light. A numerical solution of Reynolds' equation for this bearing ($l/d = 0.8$) gives an eccentricity ratio of about $0.2$ and $(r/c)f \approx 18$, i.e. $f \approx 0.022$ — Petroff's estimate is about $6\,\%$ low, the price of ignoring the eccentricity. Note that $f = 0.02$ is not small: at light load the friction force is set by the shearing of the oil, not by the load, so the friction *coefficient* is large even though the friction *force* is small.
:::
:::

### Reynolds' equation

What carries the load is the pressure in the film. Under load the journal moves off centre by the **eccentricity** $e$; the film is then thinnest at one point and the oil, dragged round by the journal, is squeezed through the narrowing gap ahead of it.

::: definition Eccentricity ratio and film thickness {#def-eccentricity}
With radial clearance $c$ and eccentricity $e$ between the journal and bearing centres, the **eccentricity ratio** is $\varepsilon = e/c$ ($0 \le \varepsilon < 1$). Measuring the angle $\theta$ from the position of the thickest film in the direction of rotation, the film thickness is, to first order in $c/r$,
$$
h(\theta) = c\,(1 + \varepsilon\cos\theta),
$$ {#eq-film}
and the **minimum film thickness** is $h_0 = c(1 - \varepsilon)$, at $\theta = \pi$. The **attitude angle** $\phi$ is the angle between the load line and the line of centres.
:::

::: proposition Reynolds' equation for a journal bearing {#prop-reynolds}
For a steadily loaded bearing with the journal surface moving at speed $U$ in the circumferential direction $x$ and the bearing stationary, the pressure $p(x, z)$ in the film satisfies
$$
\frac{\partial}{\partial x}\left(h^3\frac{\partial p}{\partial x}\right) + \frac{\partial}{\partial z}\left(h^3\frac{\partial p}{\partial z}\right) = 6\mu U\frac{\partial h}{\partial x},
$$ {#eq-reynolds}
where $z$ is the axial coordinate and $h(x)$ is given by [[#eq-film]] with $x = r\theta$.
:::

::: proof
**Assumptions (the lubrication approximation).** The film is thin, $h \ll r$ and $h \ll l$, so its curvature can be ignored and $x$, $y$ (across the film), $z$ treated as Cartesian; the flow is laminar and inertia and body forces are negligible compared with viscous forces (small reduced Reynolds number $\rho Uh^2/(\mu l)$); the lubricant is Newtonian, incompressible and of constant viscosity; the pressure does not vary across the film, $\partial p/\partial y = 0$; there is no slip at the surfaces; the motion is steady.

**Velocity.** With these assumptions the Navier–Stokes equations ([[fluid-mechanics/navier-stokes]]) reduce to $\partial p/\partial x = \mu\,\partial^2u/\partial y^2$ and $\partial p/\partial z = \mu\,\partial^2w/\partial y^2$. Integrating twice across the film with $u = U$, $w = 0$ on the journal ($y = 0$) and $u = w = 0$ on the bearing ($y = h$):
$$
u = U\left(1 - \frac{y}{h}\right) + \frac{1}{2\mu}\frac{\partial p}{\partial x}\left(y^2 - hy\right), \qquad w = \frac{1}{2\mu}\frac{\partial p}{\partial z}\left(y^2 - hy\right).
$$
**Flow rates.** Integrating across the film gives the flows per unit width:
$$
q_x = \int_0^h u\,dy = \frac{Uh}{2} - \frac{h^3}{12\mu}\frac{\partial p}{\partial x}, \qquad q_z = -\frac{h^3}{12\mu}\frac{\partial p}{\partial z}.
$$
The first term of $q_x$ is the **drag** (Couette) flow, the second the **pressure** (Poiseuille) flow.

**Continuity.** For an incompressible fluid in a steady film, the net flow out of a small column $dx\,dz$ through the full film thickness must vanish: $\partial q_x/\partial x + \partial q_z/\partial z = 0$. Substituting,
$$
\frac{U}{2}\frac{\partial h}{\partial x} - \frac{\partial}{\partial x}\left(\frac{h^3}{12\mu}\frac{\partial p}{\partial x}\right) - \frac{\partial}{\partial z}\left(\frac{h^3}{12\mu}\frac{\partial p}{\partial z}\right) = 0,
$$
and multiplying by $12\mu$ gives [[#eq-reynolds]].
:::

The right-hand side is the source of pressure: where the film converges in the direction of motion ($\partial h/\partial x < 0$) the drag flow would decrease along $x$, so a pressure gradient must build up to push the difference through. Where the film diverges, the equation predicts sub-ambient pressure, which a real oil film cannot sustain: it **cavitates** (releases dissolved air and vapour) and the pressure stays near ambient. Solutions therefore impose boundary conditions: $p = 0$ (gauge) at the bearing ends; and either the **half-Sommerfeld** condition (simply set negative pressures to zero) or the more realistic **Reynolds** (Swift–Stieber) condition, in which the film ends where both $p$ and $\partial p/\partial\theta$ vanish.

Analytical solutions exist only in limits. For an infinitely long bearing ($\partial/\partial z = 0$), A. Sommerfeld solved the equation in closed form in 1904. For a short bearing, in which the axial term dominates, the circumferential term can be dropped and the equation integrated directly (the short-bearing theory, [[#ex-short]]). For real proportions ($l/d$ from about $0.25$ to $1$) the equation is solved numerically.

### The Sommerfeld number

Reynolds' equation contains many parameters — $r$, $c$, $l$, $\mu$, $N$, $W$ — but they combine into very few groups.

::: proposition Dimensionless bearing characteristics {#prop-sommerfeld}
For a bearing of given $l/d$ with given boundary conditions, the eccentricity ratio $\varepsilon$, the attitude angle $\phi$, the friction variable $(r/c)f$ and the dimensionless flows depend only on the **Sommerfeld number**
$$
S = \left(\frac{r}{c}\right)^2\frac{\mu N}{P}, \qquad P = \frac{W}{2rl},\quad N\ \text{in rev/s}.
$$ {#eq-sommerfeld}
:::

::: proof
**Assumptions.** Those of [[#prop-reynolds]], with the pressure boundary conditions fixed (ambient at the ends, half-Sommerfeld or Reynolds condition in the divergent region).

Introduce $\theta = x/r$, $\zeta = z/r$, $H = h/c = 1 + \varepsilon\cos\theta$ and the dimensionless pressure $\bar p = p\,c^2/(6\mu Ur)$. Since $\partial/\partial x = (1/r)\,\partial/\partial\theta$ and $\partial/\partial z = (1/r)\,\partial/\partial\zeta$, the left side of [[#eq-reynolds]] becomes $(c^3/r^2)(6\mu Ur/c^2)\left[\partial_\theta(H^3\partial_\theta\bar p) + \partial_\zeta(H^3\partial_\zeta\bar p)\right]$ and the right side $6\mu U(c/r)\,dH/d\theta$. The factors $6\mu Uc/r$ cancel:
$$
\frac{\partial}{\partial\theta}\left(H^3\frac{\partial\bar p}{\partial\theta}\right) + \frac{\partial}{\partial\zeta}\left(H^3\frac{\partial\bar p}{\partial\zeta}\right) = \frac{dH}{d\theta}, \qquad |\zeta| \le \frac{l}{2r} = \frac{l}{d}.
$$
This problem contains only $\varepsilon$ and $l/d$, so its solution $\bar p(\theta, \zeta)$ and every integral of it depend only on $\varepsilon$ and $l/d$. The load is $W = (6\mu Ur^3/c^2)\,\bar W(\varepsilon, l/d)$, where $\bar W$ is the magnitude of $\iint\bar p\,(\cos\theta, \sin\theta)\,d\theta\,d\zeta$. With $U = 2\pi rN$ and $W = 2rlP$,
$$
\frac{1}{\bar W} = \frac{6\mu Ur^3}{c^2W} = \frac{6\cdot2\pi rN\mu r^3}{c^2\cdot2rlP} = 6\pi\,\frac{r}{l}\left(\frac{r}{c}\right)^2\frac{\mu N}{P} = 6\pi\frac{r}{l}\,S,
$$
so $S = l/(6\pi r\bar W)$ is a function of $\varepsilon$ and $l/d$ alone; inverting, $\varepsilon$ is a function of $S$ and $l/d$. The friction force, from the shear stress $\tau = \mu U/h + (h/2r)\,\partial p/\partial\theta$ integrated over the journal, scales as $\mu Ur^2/c$ times a function of $\varepsilon$ and $l/d$, so $f = F/W$ times $r/c$ is again a function of $S$ and $l/d$ only. The same argument applies to the flows, scaled by $rcNl$.
:::

The Sommerfeld number is, apart from constants, the reciprocal of a dimensionless load. A large $S$ (light load, high speed, viscous oil) means a nearly concentric journal; a small $S$ means a heavily loaded bearing with a thin film. Petroff's equation, rewritten with [[#eq-sommerfeld]], is simply
$$
\frac{r}{c}f = 2\pi^2 S,
$$ {#eq-petroff-s}
the large-$S$ limit of the exact relation.

::: widget plot
f: 2*pi^2*k*x*1e-6
x: 0, 2.5
y: 0, 0.1
sliders: k=833:400:2000:1
points: 1.25,0.0206
labels: f = 2\pi^2 (r/c)(\mu N/P)
caption: Petroff's friction coefficient [[#eq-petroff]] against the Hersey group $\mu N/P$ (horizontal axis in units of $10^{-6}$), for a clearance ratio $r/c = k$. The marked point is the bearing of [[#ex-petroff]] ($\mu N/P = 1.25\times10^{-6}$, $r/c = 833$, $f = 0.0206$). Increase $k$ — a tighter clearance — and the line steepens: friction rises in proportion to $r/c$. This straight line is the right-hand, full-film branch of the Stribeck curve in its lightly loaded limit. At small $\mu N/P$ a real bearing departs from it: first the eccentricity grows and friction falls less than in proportion (the exact $(r/c)f$ lies above $2\pi^2S$), then the film breaks down and friction rises steeply into the mixed and boundary regimes, which no hydrodynamic theory describes.
:::

### Design charts and their use

In 1958 A. A. Raimondi and J. Boyd published numerical solutions of Reynolds' equation for finite journal bearings, with the Reynolds boundary condition, for $l/d = \tfrac14$, $\tfrac12$, $1$ and the infinitely long bearing. Their charts and tables, reproduced in Budynas and Nisbett, Chapter 12, give as functions of $S$ and $l/d$: the minimum-film-thickness variable $h_0/c$ (and so $\varepsilon$), the attitude angle $\phi$, the friction variable $(r/c)f$, the flow variable $Q/(rcNl)$, the fraction of the flow leaving at the ends $Q_s/Q$, the ratio of mean to maximum film pressure $P/p_\text{max}$, and the positions of the maximum pressure and of the film's end. Charts must be read from the printed source; never guess a reading.

As an illustration of what such a solution gives, the following values for $l/d = 1$ were computed for this chapter by a finite-difference solution of [[#eq-reynolds]] with the Reynolds boundary condition; they agree with Raimondi and Boyd's published table to within about $1$–$2\,\%$:

| $\varepsilon$ | $0.2$ | $0.4$ | $0.6$ | $0.8$ | $0.9$ |
|---|---|---|---|---|---|
| $S$ | $0.632$ | $0.261$ | $0.121$ | $0.0446$ | $0.0188$ |
| $\phi$ | $74°$ | $63°$ | $51°$ | $36°$ | $26°$ |
| $(r/c)f$ | $12.8$ | $5.79$ | $3.22$ | $1.70$ | $1.05$ |
| $2\pi^2S$ (Petroff) | $12.5$ | $5.15$ | $2.39$ | $0.88$ | $0.37$ |

The last row shows Petroff's estimate falling increasingly below the true friction as the load rises and the journal becomes more eccentric.

The analysis of an existing bearing uses these data with a heat balance. The power lost, $fWr\cdot2\pi N$, heats the oil; the oil's temperature rise depends on the flow through the bearing; and the viscosity depends on the temperature. Since the viscosity is needed to find $S$ and $S$ to find the flow and the friction, the calculation is iterated: guess an average film temperature, read $\mu$, compute $S$, find $(r/c)f$ and the flows, compute the temperature rise, and repeat until the assumed and computed temperatures agree. Budynas and Nisbett (Chapter 12) set out this procedure in full.

Design criteria for steadily loaded bearings are a matter of experience. Those of P. R. Trumpler (1966), as quoted by Budynas and Nisbett, include a minimum film thickness $h_0 \ge 0.005\ \mathrm{mm} + 0.00004\,d$ (from his inch formula $0.0002 + 0.00004\,d$ in inches), a maximum starting unit load of about $2\ \mathrm{MPa}$, a maximum film temperature of about $120\ \mathrm{°C}$ and a design factor of 2 on the running load. Typical design proportions are $l/d$ from about $0.5$ to $1$ and $c/r$ about $0.001$.

::: example Analysing a hydrodynamic bearing {#ex-journal}
A bearing with $d = 50\ \mathrm{mm}$, $l = 50\ \mathrm{mm}$ and radial clearance $c = 0.025\ \mathrm{mm}$ carries $W = 5.0\ \mathrm{kN}$ at $1800\ \mathrm{rev/min}$. The average film temperature is such that $\mu = 8.0\ \mathrm{mPa\,s}$. Find the Sommerfeld number, the minimum film thickness and the friction power, and judge the design. Use the $l/d = 1$ data of the table above.
::: solution
**Groups.** $r/c = 25/0.025 = 1000$; $N = 30\ \mathrm{rev/s}$; $P = W/(2rl) = 5000/(0.050\times0.050) = 2.0\ \mathrm{MPa}$:
$$
S = (1000)^2\times\frac{0.0080\times30}{2.0\times10^6} = 10^6\times1.2\times10^{-7} = 0.120.
$$
**Eccentricity and film.** From the table, $S = 0.120$ for $l/d = 1$ corresponds to $\varepsilon \approx 0.60$ (at $\varepsilon = 0.6$, $S = 0.121$). So $h_0 = c(1 - \varepsilon) = 0.025\times0.40 = 0.010\ \mathrm{mm} = 10\ \mu\mathrm{m}$, and the attitude angle is about $51°$.

**Friction.** $(r/c)f \approx 3.22$, so $f = 0.00322$; torque $fWr = 0.00322\times5000\times0.025 = 0.40\ \mathrm{N\,m}$; power $0.40\times2\pi\times30 = 76\ \mathrm{W}$. (Petroff would give $f = 2\pi^2\times0.120/1000 = 0.00237$, $26\,\%$ low.)

**Judgement.** Trumpler's film criterion requires $h_0 \ge 0.005 + 0.00004\times50 = 0.0070\ \mathrm{mm}$: the $10\ \mu\mathrm{m}$ film passes, but with less than the factor of 2 on load that the same criteria ask for, since at twice the load ($S = 0.060$) the table gives $\varepsilon$ between $0.6$ and $0.8$, roughly $0.75$, and $h_0 \approx 6\ \mu\mathrm{m}$. The unit load of $2\ \mathrm{MPa}$ is at the starting limit. The surfaces must be finished well enough that their combined roughness is a small fraction of $10\ \mu\mathrm{m}$. The design is marginal; a more viscous oil or a longer bearing would help.

**Sanity check.** $\varepsilon = 0.6$ is in the usual operating range for loaded bearings, and $f \approx 0.003$ is typical of full-film lubrication — an order of magnitude below boundary friction.
:::
:::

::: warning Slips that wreck journal-bearing calculations
- **Speed in rev/s.** $N$ in [[#eq-sommerfeld]] and [[#eq-petroff]] is in revolutions per second. Using rev/min makes $S$ sixty times too large; using rad/s makes it $2\pi$ times too large.
- **Radial versus diametral clearance.** $c$ is the radial clearance, half the difference of the bore and journal diameters. Using the diametral clearance makes $S$ four times too small.
- **Projected area.** $P = W/(2rl) = W/(ld)$, the load per unit projected area, not per unit surface area.
- **Viscosity units and temperature.** $\mu$ in $\mathrm{Pa\,s}$ (not centipoise, not $\mathrm{mm^2/s}$), at the operating film temperature. A viscosity read at $40\ \mathrm{°C}$ for a bearing running at $70\ \mathrm{°C}$ can overstate $S$ by a factor of 3.
- **Starting and stopping.** Hydrodynamic theory says nothing about the start, when the bearing runs in boundary lubrication; bearing materials (white metal, bronze, aluminium alloys) are chosen for their tolerance of rubbing and embedded dirt.
:::

::: history
Systematic study of bearing friction began in the 1880s. In experiments for the Institution of Mechanical Engineers reported from 1883, Beauchamp Tower found that a well-lubricated journal bearing ran with very low friction and that the oil in the gap was under considerable pressure — enough, famously, to push out a plug inserted in an oil hole in the loaded zone. In the same year N. P. Petrov in Russia published his analysis of viscous friction in a concentric bearing. Osborne Reynolds explained Tower's results in his paper of 1886 in the *Philosophical Transactions of the Royal Society*, deriving the equation of thin-film flow that bears his name, and A. Sommerfeld solved it for the long journal bearing in 1904, introducing the parameter now called the Sommerfeld number. R. Stribeck's friction measurements (1901–1902) gave the curve named after him. A. A. Raimondi and J. Boyd's numerical solutions for finite bearings (1958) are the basis of the design charts still printed in textbooks.

On the rolling side, Sven Wingquist, an engineer at a textile mill in Gothenburg, patented the self-aligning ball bearing in 1907; SKF was founded the same year to make it. A. Palmgren of SKF proposed the linear damage rule for bearings in 1924, and G. Lundberg and A. Palmgren published their statistical theory of rolling-contact fatigue in 1947 (ball bearings) and 1952 (roller bearings). It became the basis of the international standard for dynamic load ratings, now ISO 281:2007, whose modified-life method also draws on the fatigue-limit model of E. Ioannides and T. A. Harris (1985).
:::

::: quiz
The radial load on a cylindrical roller bearing is increased by $25\,\%$. By roughly what factor does its rating life change?
- [ ] $0.80$
- [ ] $0.64$
- [x] $0.48$
- [ ] $0.51$
::: solution
$L_{10} \propto P^{-10/3}$, so the life is multiplied by $1.25^{-10/3} = 0.475$. For a ball bearing the factor would be $1.25^{-3} = 0.512$ — the fourth option, the trap for using the wrong exponent.
:::
:::

::: quiz
The speed of a hydrodynamic journal bearing is doubled while the load, oil temperature and dimensions stay the same. Which statement is correct?
- [ ] The Sommerfeld number halves and the film becomes thinner.
- [x] The Sommerfeld number doubles, the eccentricity ratio falls and the minimum film becomes thicker.
- [ ] The Sommerfeld number is unchanged because it depends only on geometry.
- [ ] The friction coefficient halves, as Petroff's equation predicts.
::: solution
$S = (r/c)^2\mu N/P$ is proportional to $N$, so it doubles; a larger $S$ means a less eccentric journal and a thicker film. By Petroff's equation the friction coefficient would double, not halve — though in practice the extra heat lowers the viscosity and part of the gain in $S$ is lost, which is why the temperature iteration is needed.
:::
:::

::: summary
- Rolling bearings fail by rolling-contact fatigue; lives scatter widely and are specified statistically. The rating life $L_{10}$ is the life reached by $90\,\%$ of bearings.
- Load–life relation (ISO 281): $L_{10} = (C/P)^p$ million revolutions, $p = 3$ for ball, $10/3$ for roller bearings; in hours, $L_{10h} = 10^6(C/P)^p/(60n)$.
- Reliability: Weibull distribution, e.g. $x_0 = 0.02$, $\theta - x_0 = 4.439$, $b = 1.483$ (Budynas and Nisbett), or ISO 281's $a_1$ ($0.64$ at $95\,\%$, $0.25$ at $99\,\%$). Required rating [[#eq-c10]]. A set of $k$ bearings has reliability $\prod R_i$.
- Combined loads: $P = XF_r + YF_a$ with catalogue $X$, $Y$, $e$; duty cycles: $P_\text{eq} = (\sum\alpha_iP_i^p)^{1/p}$, weighted by revolutions.
- Static capacity: $C_0$ (ISO 76), $s_0 = C_0/P_0$ against the peak load. Modified life $L_{nm} = a_1a_\text{ISO}L_{10}$ accounts for lubrication, contamination and the fatigue load limit.
- Selection: loads → type → life (from experience, e.g. $20$–$30\times10^3\ \mathrm{h}$ for fully used single-shift machines, $50$–$60\times10^3\ \mathrm{h}$ for continuous duty) → application factor → required $C$ → catalogue → checks.
- Journal bearings: boundary, mixed and full-film regimes along the Stribeck curve of $f$ against $\mu N/P$. Petroff: $f = 2\pi^2(\mu N/P)(r/c)$, the light-load limit.
- Reynolds' equation $\partial_x(h^3\partial_xp) + \partial_z(h^3\partial_zp) = 6\mu U\,\partial_xh$ governs the film; for given $l/d$ every performance variable depends only on $S = (r/c)^2\mu N/P$, which is how the Raimondi–Boyd charts are organised. Viscosity must be taken at the film temperature, found by iteration.
:::

## Exercises

::: exercise Effect of doubling the load {level=1 check="0.125"}
The load on a deep-groove ball bearing is doubled. By what factor is its rating life multiplied? (Enter the factor.)
::: solution
$L_{10} \propto P^{-3}$, so the factor is $2^{-3} = 0.125$. For a roller bearing it would be $2^{-10/3} = 0.099$.
:::
:::

::: exercise Rating life in hours {level=1 check="6000"}
A ball bearing with $C = 30\ \mathrm{kN}$ carries a radial load of $5\ \mathrm{kN}$ at $600\ \mathrm{rev/min}$. Find its rating life. (Enter the life in hours.)
::: solution
$C/P = 6$, $L_{10} = 6^3 = 216\times10^6$ rev. At $600\times60 = 36\,000$ rev/h, $L_{10h} = 216\times10^6/36\,000 = 6000\ \mathrm{h}$.
:::
:::

::: exercise Sommerfeld number {level=1 check="0.5"}
A journal bearing has $r/c = 1000$, oil of viscosity $\mu = 0.020\ \mathrm{Pa\,s}$ at its film temperature, runs at $1500\ \mathrm{rev/min}$ and carries a unit load $P = 1.0\ \mathrm{MPa}$. Find the Sommerfeld number. (Enter $S$.)
::: solution
$N = 25\ \mathrm{rev/s}$. $S = 10^6\times0.020\times25/10^6 = 0.5$. A common slip is to use $1500$ rev/min, which gives $30$.
:::
:::

::: exercise Required load rating {level=2 check="30"}
A ball bearing must give a rating life of $24\,000\ \mathrm{h}$ at $1200\ \mathrm{rev/min}$ under an equivalent load of $2.5\ \mathrm{kN}$ ($a_f = 1$, $90\,\%$ reliability). Find the required basic dynamic load rating. (Enter $C$ in kN.)
::: solution
$x_D = 24\,000\times60\times1200/10^6 = 1728$ million revolutions. $C = P\,x_D^{1/3} = 2.5\times1728^{1/3} = 2.5\times12 = 30\ \mathrm{kN}$.
:::
:::

::: exercise Equivalent load {level=2 check="5.44"}
A ball bearing carries $F_r = 4.0\ \mathrm{kN}$ and $F_a = 2.0\ \mathrm{kN}$. The catalogue gives $e = 0.30$ for this bearing at this axial load, with $X = 0.56$ and $Y = 1.6$ when $F_a/F_r > e$. Find the equivalent dynamic load. (Enter $P$ in kN.)
::: solution
$F_a/F_r = 0.5 > 0.30$, so $P = 0.56\times4.0 + 1.6\times2.0 = 2.24 + 3.20 = 5.44\ \mathrm{kN}$. If $F_a/F_r$ had been below $e$, $P$ would simply be $F_r$.
:::
:::

::: exercise Life at higher reliability {level=2 check="18500"}
A bearing has a rating life of $50\,000\ \mathrm{h}$. Using ISO 281's factor $a_1$ and taking $a_\text{ISO} = 1$, find the life that $98\,\%$ of such bearings will reach. (Enter the life in hours.)
::: solution
$a_1 = 0.37$ at $98\,\%$, so $L_{2m} = 0.37\times50\,000 = 18\,500\ \mathrm{h}$. Check with [[#eq-a1]]: $\ln(1/0.98)/\ln(1/0.9) = 0.1917$, to the power $2/3$ is $0.3326$, and $0.95\times0.3326 + 0.05 = 0.366$.
:::
:::

::: exercise A duty cycle {level=2}
A ball bearing with $C = 20\ \mathrm{kN}$ runs $90\,\%$ of its revolutions at $P = 2\ \mathrm{kN}$ and $10\,\%$ at $P = 4\ \mathrm{kN}$. Find the equivalent load and the rating life in revolutions. What fraction of the damage is done during the $10\,\%$ at the higher load?
::: solution
From [[#eq-peq]]: $P_\text{eq} = (0.9\times2^3 + 0.1\times4^3)^{1/3} = (7.2 + 6.4)^{1/3} = 13.6^{1/3} = 2.387\ \mathrm{kN}$. $L_{10} = (20/2.387)^3 = 588\times10^6$ rev. The damage fractions are proportional to $\alpha_iP_i^3$: $6.4/13.6 = 47\,\%$ of the damage is done in $10\,\%$ of the revolutions. Short periods of high load matter much more than their duration suggests.
:::
:::

::: exercise Bearing set reliability {level=2}
A conveyor drive has six bearings, all selected for the same life with $R = 0.99$ each. (a) What is the reliability of the set at that life? (b) What must each bearing's reliability be for the set to reach $95\,\%$? (c) By what factor must the rating of each ball bearing be increased, relative to $L_{10}$ selection, to achieve (b)? Use the Weibull parameters [[#eq-weibull-params]].
::: solution
(a) $0.99^6 = 0.941$. (b) $R_i = 0.95^{1/6} = 0.99149$. (c) $\ln(1/0.99149) = 0.008549$; $0.008549^{1/1.483} = 0.0403$; the bracket in [[#eq-c10]] is $0.02 + 4.439\times0.0403 = 0.199$, and the rating factor is $(1/0.199)^{1/3} = 1.71$.
:::
:::

::: exercise Petroff power loss {level=2}
A turbine bearing has $d = 200\ \mathrm{mm}$, $l = 150\ \mathrm{mm}$, $c/r = 0.0015$, runs at $3000\ \mathrm{rev/min}$ with oil of $\mu = 15\ \mathrm{mPa\,s}$ and carries $W = 20\ \mathrm{kN}$. Estimate the friction coefficient and the friction power by Petroff's equation, and the Sommerfeld number. Is Petroff's estimate likely to be accurate here?
::: solution
$r = 0.1\ \mathrm{m}$, $c = 0.15\ \mathrm{mm}$, $r/c = 666.7$, $N = 50\ \mathrm{rev/s}$, $P = 20\,000/(0.2\times0.15) = 0.667\ \mathrm{MPa}$. $\mu N/P = 0.015\times50/666\,700 = 1.125\times10^{-6}$. $f = 2\pi^2\times1.125\times10^{-6}\times666.7 = 0.0148$. Torque $fWr = 0.0148\times20\,000\times0.1 = 29.6\ \mathrm{N\,m}$, power $29.6\times2\pi\times50 = 9.3\ \mathrm{kW}$. $S = 666.7^2\times1.125\times10^{-6} = 0.50$: moderately loaded. A numerical solution of Reynolds' equation for $l/d = 0.75$ at $S = 0.5$ gives $\varepsilon \approx 0.35$ and $(r/c)f \approx 10.7$, about $8\,\%$ above Petroff's $2\pi^2S = 9.9$, so the estimate is reasonable for a first look. The $9\ \mathrm{kW}$ must be removed by a forced oil supply.
:::
:::

::: exercise Short-bearing theory {#ex-short level=3}
For a short bearing ($l/d$ small), the circumferential pressure-flow term in [[#eq-reynolds]] is negligible compared with the axial one. (a) Integrate the reduced equation $\partial_z(h^3\partial_zp) = 6\mu U\,dh/dx$ with $p = 0$ at $z = \pm l/2$ to find $p(\theta, z)$. (b) Using the half-Sommerfeld condition ($p = 0$ for $\pi < \theta < 2\pi$), show that the load is
$$
W = \frac{\mu Ul^3}{4c^2}\,\frac{\varepsilon}{(1 - \varepsilon^2)^2}\sqrt{\pi^2(1 - \varepsilon^2) + 16\varepsilon^2}
$$
and hence that $S\,(l/d)^2 = (1 - \varepsilon^2)^2/\big(\pi\varepsilon\sqrt{\pi^2(1 - \varepsilon^2) + 16\varepsilon^2}\big)$. (c) Evaluate $S$ for $l/d = 0.25$ and $\varepsilon = 0.6$, and comment on the comparison with a full numerical solution, which gives $S \approx 1.08$.
::: solution
(a) $h$ does not depend on $z$, so $h^3\,\partial p/\partial z = 6\mu U(dh/dx)\,z + A$; symmetry about $z = 0$ gives $A = 0$. Integrating again with $p(\pm l/2) = 0$:
$$
p = \frac{3\mu U}{h^3}\frac{dh}{dx}\left(z^2 - \frac{l^2}{4}\right) = \frac{3\mu U\varepsilon\sin\theta}{rc^2(1 + \varepsilon\cos\theta)^3}\left(\frac{l^2}{4} - z^2\right),
$$
using $dh/dx = -(c\varepsilon/r)\sin\theta$. It is positive for $0 < \theta < \pi$ (converging film).

(b) $\int_{-l/2}^{l/2}(l^2/4 - z^2)\,dz = l^3/6$, so after integrating over $z$ (and multiplying by $r$ for the arc length $r\,d\theta$) the common factor is $K_0 = \dfrac{3\mu U\varepsilon}{rc^2}\cdot\dfrac{l^3}{6}\cdot r = \dfrac{\mu U\varepsilon l^3}{2c^2}$. The load components along and perpendicular to the line of centres are $W_\parallel = -K_0\int_0^\pi\dfrac{\sin\theta\cos\theta}{(1 + \varepsilon\cos\theta)^3}d\theta$ and $W_\perp = K_0\int_0^\pi\dfrac{\sin^2\theta}{(1 + \varepsilon\cos\theta)^3}d\theta$. With the standard integrals $\int_0^\pi\sin\theta\cos\theta\,(1 + \varepsilon\cos\theta)^{-3}d\theta = -2\varepsilon/(1 - \varepsilon^2)^2$ and $\int_0^\pi\sin^2\theta\,(1 + \varepsilon\cos\theta)^{-3}d\theta = \pi/[2(1 - \varepsilon^2)^{3/2}]$:
$$
W_\parallel = \frac{\mu Ul^3\varepsilon^2}{c^2(1 - \varepsilon^2)^2}, \qquad W_\perp = \frac{\pi\mu Ul^3\varepsilon}{4c^2(1 - \varepsilon^2)^{3/2}}.
$$
Then $W = \sqrt{W_\parallel^2 + W_\perp^2} = \dfrac{\mu Ul^3\varepsilon}{4c^2(1 - \varepsilon^2)^2}\sqrt{16\varepsilon^2 + \pi^2(1 - \varepsilon^2)}$. With $U = 2\pi rN$ and $W = 2rlP$, $S = (r/c)^2\mu N/P = (r/c)^2\mu N\cdot2rl/W$; substituting $W$ gives $S = \dfrac{4r^2}{l^2}\dfrac{(1 - \varepsilon^2)^2}{\pi\varepsilon\sqrt{\pi^2(1 - \varepsilon^2) + 16\varepsilon^2}}$, and $4r^2/l^2 = (d/l)^2$. The attitude angle is $\tan\phi = W_\perp/W_\parallel = \pi\sqrt{1 - \varepsilon^2}/(4\varepsilon)$.

(c) $\varepsilon = 0.6$: $\sqrt{\pi^2\times0.64 + 16\times0.36} = 3.475$; $S(l/d)^2 = 0.4096/(\pi\times0.6\times3.475) = 0.0625$; with $(l/d)^2 = 1/16$, $S = 1.00$. The full solution gives $S \approx 1.08$: short-bearing theory overestimates the load capacity by about $8\,\%$ here, because the circumferential pressure flow it neglects lets some oil escape. The error grows with $l/d$; at $l/d = 1$ the theory is not adequate.
:::
:::

::: exercise Choosing and justifying a bearing arrangement {level=3}
A centrifugal pump shaft runs continuously at $2900\ \mathrm{rev/min}$. The impeller end bearing carries a radial load of $3.0\ \mathrm{kN}$; the other bearing a radial load of $1.5\ \mathrm{kN}$ and the whole hydraulic thrust of $1.2\ \mathrm{kN}$. Unplanned stoppages are expensive. Propose a bearing arrangement (types, which bearing locates), a design life and reliability, and the required load ratings. Then discuss what else you would check, and whether a hydrodynamic bearing would be a better choice.
::: solution
This is open-ended; one reasonable answer follows.

**Arrangement.** Locating bearing at the thrust end: a deep-groove ball bearing (or a pair of angular-contact bearings if the thrust were larger or reversing); non-locating bearing at the impeller end: a deep-groove ball bearing free to slide in its housing, or a cylindrical roller bearing, to allow thermal expansion.

**Life and reliability.** Continuous 24-hour service: $50$–$60\times10^3\ \mathrm{h}$ from the table; since stoppages are expensive, take $60\,000\ \mathrm{h}$ and $R = 0.99$ per bearing (about $0.98$ for the pair). Application factor: rotating machinery with little impact, $a_f = 1.2$. Life: $x_D = 60\times2900\times60\,000/10^6 = 10\,440$ million revolutions.

**Impeller-end bearing (ball, radial only).** $C \ge 1.2\times3.0\times(10\,440/0.2196)^{1/3} = 3.6\times36.2 = 130\ \mathrm{kN}$ by [[#eq-c10]] — a large bearing; with a cylindrical roller bearing ($p = 10/3$), $C \ge 3.6\times(47\,540)^{0.3} = 3.6\times25.3 = 91\ \mathrm{kN}$.

**Thrust-end bearing.** Guess $X = 0.56$, $Y = 1.5$: $P = 0.56\times1.5 + 1.5\times1.2 = 2.64\ \mathrm{kN}$; with $a_f$, $3.17\ \mathrm{kN}$ and $C \ge 3.17\times36.2 = 115\ \mathrm{kN}$. Select from a catalogue, then recompute $Y$ from that bearing's $C_0$ and iterate.

**Further checks.** The ratings are large because of the long life at high speed: check limiting speeds; see whether $L_{nm}$ with clean oil lubrication ($a_\text{ISO} > 1$) permits smaller bearings; check static safety for thrust surges; specify fits and lubrication.

**Hydrodynamic alternative.** A plain bearing has no fatigue limit and damps vibration, but needs a reliable oil supply, a thrust bearing and care at start-up. Small pumps use rolling bearings; large boiler-feed pumps commonly use hydrodynamic journal and tilting-pad thrust bearings.
:::
:::
