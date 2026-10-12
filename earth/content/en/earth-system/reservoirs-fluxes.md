The atmosphere now holds about $899$ gigatonnes of carbon as carbon dioxide (Global Carbon Project; the 2023 annual mean at Mauna Loa was $421\ \mathrm{ppm}$). Every year, photosynthesis and respiration move about $120\ \mathrm{Gt\,C}$ between the air and the land, and the ocean exchanges about $90\ \mathrm{Gt\,C}$ with it. Divide one by the other and you find that a carbon atom spends, on average, about six years in the atmosphere before being taken up. So why does everybody say that the carbon dioxide we emit stays there for centuries?

The answer is the first lesson in Earth system bookkeeping: **turnover time is not adjustment time**. The six-year figure counts how fast molecules pass through a reservoir that is nearly in balance; the centuries-long figure describes how fast the *amount in the reservoir* returns to normal after you have added to it. Getting these two straight, and learning to tell them apart in a world where both numbers are quoted in the same paragraph, is what this chapter is for.

Earth system science deals in quantities too big to weigh and processes too slow to watch. Its method is the **box model**: draw the planet as a few boxes joined by arrows, write down how much each box holds and how fast each arrow runs, and ask what happens. From three numbers — reservoir, flux, residence time — and one idea — feedback — you can reason about the lifetime of a greenhouse gas, the size of a coral reef's response to nutrient runoff, the recovery of a fishery and the stability of the climate.

## Reservoirs, fluxes and residence times

::: definition Reservoir, flux and budget {#def-reservoir}
A **reservoir** (or **pool**, or **box**) is a quantity of some material or of energy held in a defined place at a defined time, with units such as $\mathrm{Gt\,C}$, $\mathrm{km^3}$, $\mathrm{TW}$ or $\mathrm{mol\,N}$. A **flux** is the amount crossing a boundary per unit time ($\mathrm{Gt\,C\,yr^{-1}}$, $\mathrm{Sv} = 10^{6}\ \mathrm{m^3\,s^{-1}}$, $\mathrm{W}$). The **budget** (or **mass balance**) of a reservoir is

$$
\frac{\mathrm{d}R}{\mathrm{d}t} = \sum \text{inputs} - \sum \text{outputs},
$$

where $R$ is the size of the reservoir.
:::

The budget equation is the whole of the physics in a box model: conservation of mass (or energy) applied to a box. Everything else is measurement. Two conventions are worth fixing now. First, always state the units of the reservoir and of the flux together, and check that $\mathrm{d}R/\mathrm{d}t$ comes out in the units of the flux; a factor of $3.664$ (the ratio of the molar masses of $\mathrm{CO_2}$ and C) is one of the most common errors in the climate literature aimed at non-specialists, since $1\ \mathrm{Gt\,C} = 3.664\ \mathrm{Gt\,CO_2}$. Second, a flux is only meaningful with its direction: "the ocean carbon flux is $90\ \mathrm{Gt\,C\,yr^{-1}}$" is ambiguous, because the ocean both takes up and gives up about that much each year.

::: definition Residence time {#def-residence}
For a well-mixed reservoir of size $R$ with total throughput $F$ (the sum of the fluxes leaving it, in a steady state equal to the sum entering it), the **residence time** is

$$
\tau = \frac{R}{F}.
$$

The **turnover time** is defined the same way. The **transit time** of a particle is the time an individual particle spends in the box, and the **age** of the material in the box is the mean time since that material entered it.
:::

::: proposition Residence time and the exponential escape {#prop-residence}
Suppose a reservoir of size $R$ is well mixed and material leaves it at a total rate $F$. Then the amount of a tracer injected at $t = 0$ decays as

$$
m(t) = m_0\,e^{-t/\tau}, \qquad \tau = \frac{R}{F},
$$

and $\tau$ is the mean time a molecule spends in the reservoir. After one $\tau$, $37\%$ remains; after $3\tau$, $5\%$; after $5\tau$, $0.7\%$.
:::

::: proof
Because the reservoir is well mixed, the fraction of the tracer in the outflow equals the fraction of the tracer in the whole box, $m/R$. So the tracer leaves at rate $F \times (m/R)$:
$$
\frac{\mathrm{d}m}{\mathrm{d}t} = -\frac{F}{R}m = -\frac{m}{\tau}.
$$
This is the radioactive-decay equation with decay constant $1/\tau$; separating variables and integrating from $m_0$ gives $m = m_0 e^{-t/\tau}$. The mean lifetime is $\int_0^\infty t\,(-\mathrm{d}m/\mathrm{d}t)\,\mathrm{d}t / m_0 = (F/R)\int_0^\infty t\,e^{-t/\tau}\mathrm{d}t = \tau$, using $\int_0^\infty t e^{-t/\tau}\mathrm{d}t = \tau^2$.
:::

The exponential is the reason residence times are so easy to misread. A reservoir with $\tau = 10$ years is not empty in 10 years: it still holds $37\%$ of the perturbation, and after a century it holds $0.005\%$.

::: example Residence times of water {#ex-water-tau}
The atmosphere holds $12{,}700\ \mathrm{Gt}$ of water (as vapour) and global precipitation averages $492{,}000\ \mathrm{Gt\,yr^{-1}}$ (Shiklomanov's global water balance). Find the residence time of water in the atmosphere. Compare it with the global ocean, which holds $1.338\times10^{9}\ \mathrm{km^3}$ and loses $413{,}000\ \mathrm{Gt\,yr^{-1}}$ to evaporation.
::: solution
$$
\tau_\text{atm} = \frac{12{,}700\ \mathrm{Gt}}{492{,}000\ \mathrm{Gt\,yr^{-1}}} = 0.0258\ \mathrm{yr} = 9.4\ \mathrm{days}.
$$

For the ocean, $1.338\times10^{9}\ \mathrm{km^3}$ of seawater at $1028\ \mathrm{kg\,m^{-3}}$ is $1.376\times10^{21}\ \mathrm{Gt}$, so

$$
\tau_\text{ocean} = \frac{1.376\times10^{21}}{413{,}000} = 3.3\times10^{6}\ \mathrm{yr}.
$$

A water molecule therefore cycles through the air in about a week but sits in the middle of the ocean for millions of years. Table: the main water reservoirs and their residence times.

| Reservoir | Size ($10^3\ \mathrm{km^3}$) | Residence time |
|---|---|---|
| Ocean | 1,338,000 | $\sim3.3$ Myr (mean over all waters) |
| Ice sheets and glaciers | 24,064 | $10^2$–$10^4$ yr (mean age of the Greenland ice $\sim2$ kyr, the Antarctic $\sim16$ kyr) |
| Groundwater (fresh) | 10,530 | $10^2$–$10^4$ yr |
| Soil moisture | 165 | 1–6 months |
| Atmosphere | 12.7 | 9 days |
| Rivers | 2.1 | 16 days |

Sizes from the US Geological Survey and Shiklomanov's global water balance. The order of the reservoirs by size is not the order by residence time, and neither is the order by flux.
:::
:::

::: example Carbon in the atmosphere {#ex-co2-tau}
Take the atmospheric carbon reservoir at $899\ \mathrm{Gt\,C}$ (the 2024 global annual mean of $422.8\ \mathrm{ppm}$; NOAA Global Monitoring Laboratory), the land–atmosphere exchange at $120\ \mathrm{Gt\,C\,yr^{-1}}$ and the ocean–atmosphere exchange at $90\ \mathrm{Gt\,C\,yr^{-1}}$. Find the residence time of carbon in the atmosphere. Then find the rate of rise in $\mathrm{ppm\,yr^{-1}}$ if $11.2\ \mathrm{Gt\,C\,yr^{-1}}$ were emitted and no carbon were removed at all.
::: solution
Total throughput $F = 120 + 90 = 210\ \mathrm{Gt\,C\,yr^{-1}}$, so

$$
\tau = \frac{899}{210} = 4.3\ \mathrm{yr}.
$$

That number is real — it is the mean time a carbon atom spends in the atmosphere — and it is also the most misused number in climate science (see the warning below). For the second part, the atmosphere contains $2.13\ \mathrm{Gt\,C}$ per ppm (from the atmospheric mass $5.135\times10^{18}\ \mathrm{kg}$ and the molar masses of carbon and air), so with no removal at all

$$
\frac{\mathrm{d}C}{\mathrm{d}t} = \frac{11.2\ \mathrm{Gt\,C\,yr^{-1}}}{2.13\ \mathrm{Gt\,C\,ppm^{-1}}} = 5.3\ \mathrm{ppm\,yr^{-1}} .
$$

The observed rise averaged $2.5\ \mathrm{ppm\,yr^{-1}}$ over 2013–2022 (Global Carbon Budget 2023; NOAA Global Monitoring Laboratory), so the land and ocean together are removing a little over half of what we emit.
:::
:::

::: warning Turnover time is not adjustment time
"The atmospheric residence time of carbon dioxide is five years, so emissions are harmless." Every part of that sentence is wrong, and the error is instructive. The five-year figure is a **turnover time**: it counts molecules leaving a reservoir that is also being refilled, and it is dominated by the huge fast exchange with the land biosphere, which takes up carbon as fast as it releases it. A **perturbation** — the excess we add — cannot leave by that route, because for every extra molecule photosynthesis removes, resorption and decay return one. The excess can only be removed by processes that respond to the excess itself: carbonate chemistry at the sea surface (which is buffered, so it takes up only about one molecule in ten of the increase), and silicate weathering on land, which is far slower still. That is why the perturbation has a multi-century tail even though the turnover time is a few years. The same trap catches other reservoirs: a lake may exchange all its water in a season yet keep a phosphorus enrichment for decades.
:::

::: definition Steady state {#def-steady-state}
A reservoir is in a **steady state** when inputs equal outputs, so that $\mathrm{d}R/\mathrm{d}t = 0$ and its size is constant in time. It is in **dynamic equilibrium** if, in addition, the fluxes themselves are not changing. A steady state need not be an equilibrium in the thermodynamic sense: a box can be far from chemical equilibrium and still be in a steady state, as the oxidising atmosphere is.
:::

::: proposition Relaxation to a new steady state {#prop-relax}
Let a well-mixed reservoir of size $R$ be in a steady state with total input and output flux $F$, so that $\tau = R/F$. If the input is suddenly increased by a constant $\Delta F$ and the output remains proportional to the amount present, the reservoir approaches its new steady state exponentially:

$$
R(t) = R_\infty - \left(R_\infty - R_0\right)e^{-t/\tau}, \qquad R_\infty = R_0 + \tau\,\Delta F .
$$

The perturbation decays with the same time constant $\tau$: it takes about $2.3\tau$ to get $90\%$ of the way there and $4.6\tau$ to get $99\%$ of the way.
:::

::: proof
The budget is $\mathrm{d}R/\mathrm{d}t = (F + \Delta F) - (F/R_0)R$, where the output flux is written as proportional to $R$ with the constant fixed by the original steady state. Rearranging,
$$
\frac{\mathrm{d}R}{\mathrm{d}t} = \frac{1}{\tau}\left(R_0 + \tau\Delta F - R\right) = \frac{R_\infty - R}{\tau},
$$
using $\tau = R_0/F$. Writing $u = R_\infty - R$ gives $\mathrm{d}u/\mathrm{d}t = -u/\tau$, so $u = u_0 e^{-t/\tau}$, which is the stated result. The time to close $90\%$ of the gap satisfies $e^{-t/\tau} = 0.1$, so $t = \tau\ln 10 = 2.3\tau$; for $99\%$, $t = \tau\ln 100 = 4.6\tau$.
:::

This is the single most useful result in the chapter. It says that a reservoir's memory is set by $\tau$, and that "the emissions stop" and "the concentration recovers" are separated by several residence times.

::: widget odesolver
f: 11 - y/100
y0: 592
t: 0, 400
exact: 1100 - 508*exp(-t/100)
h: 5
caption: A toy atmosphere: carbon enters at $11\ \mathrm{Gt\,C\,yr^{-1}}$ and leaves in proportion to the amount present, with a perturbation-adjustment time of $100$ years. Start at the pre-industrial $592\ \mathrm{Gt\,C}$ and watch it approach the new steady state at $1100\ \mathrm{Gt\,C}$ ($517\ \mathrm{ppm}$). Notice that after one $\tau$ the system is only $63\%$ of the way there, and that the exact curve and the coarse-step numerical curves disagree most where the curvature is greatest.
:::

::: quiz
A reservoir holds $200$ units and has an input of $20$ units per year and an output of $10$ units per year. What can you say about its residence time?
- [ ] $\tau = 10$ years, using the input.
- [ ] $\tau = 20$ years, using the output.
- [x] The residence time is not defined, because the reservoir is not in a steady state.
- [ ] $\tau = 200/30$ years, using the sum of the fluxes.
::: solution
$\tau = R/F$ is defined for a reservoir in steady state, where input equals output and $F$ is unambiguous. Here the reservoir is growing at $10$ units per year and would double in 20 years, so the question "how long does a molecule stay?" has no single answer without a model of how the fluxes depend on $R$. Always check the budget before quoting a residence time.
:::
:::

## Putting boxes together

Real reservoirs are connected, and the interesting behaviour appears when you connect two boxes.

::: example Two boxes: ocean surface and atmosphere {#ex-twobox}
Let the atmosphere hold $C_a$ and the surface ocean $C_s = 930\ \mathrm{Gt\,C}$, with exchange in both directions proportional to the amount in the box that loses the carbon, and an exchange flux of $90\ \mathrm{Gt\,C\,yr^{-1}}$ at the pre-industrial state ($C_a^0 = 592\ \mathrm{Gt\,C}$). Add $11.2\ \mathrm{Gt\,C\,yr^{-1}}$ of emissions to the atmosphere. What fraction of the emitted carbon ends up in the atmosphere in the end, and how long does equilibration take?
::: solution
The exchange rate constants are $k_a = 90/592 = 0.152\ \mathrm{yr^{-1}}$ (atmosphere to surface ocean) and $k_s = 90/930 = 0.097\ \mathrm{yr^{-1}}$. In the final steady state the *extra* flux each way must again balance, so the excess in each box is proportional to its size:

$$
\frac{\Delta C_a}{\Delta C_s} = \frac{k_s}{k_a} = \frac{930}{592} = 1.57 .
$$

The atmosphere therefore keeps $1.57/(1.57 + 1) = 61\%$ of the excess and the surface ocean takes $39\%$. (The real ocean takes much more, because the excess is carried into the interior by circulation and buffered by carbonate ions, so the whole ocean can absorb several times what the surface layer alone takes; that is why the true airborne fraction is nearer $45\%$ and falls over time.) The relaxation rate is the sum of the two rate constants, $k_a + k_s = 0.249\ \mathrm{yr^{-1}}$, so the exchange equilibrates with a time constant of $1/0.249 = 4.0\ \mathrm{yr}$ and is $99\%$ complete in $4.6 \times 4.0 = 18\ \mathrm{yr}$. That is why the surface ocean exchanges with the air on a decadal scale — and why the deep ocean, which takes centuries, sets the real timescale for the excess to disappear.
:::
:::

::: example A chain of boxes: the slow carbon cycle {#ex-chain}
Carbon leaves the atmosphere as carbonate in the sea, is buried in sediment, is subducted, and is returned by volcanism. Take the flux through this loop at $0.15\ \mathrm{Gt\,C\,yr^{-1}}$ (carbonate burial, balanced by volcanic and mid-ocean-ridge emissions) and the reservoir it passes through, the ocean's dissolved inorganic carbon, at $38{,}000\ \mathrm{Gt\,C}$. Estimate the residence time of carbon with respect to this loop, and say how long it would take to remove the $1000\ \mathrm{Gt\,C}$ emitted to date by the industrial era.
::: solution
$$
\tau = \frac{38{,}000\ \mathrm{Gt\,C}}{0.15\ \mathrm{Gt\,C\,yr^{-1}}} \approx 2.5\times10^{5}\ \mathrm{yr}.
$$

Removing $1000\ \mathrm{Gt\,C}$ at $0.15\ \mathrm{Gt\,C\,yr^{-1}}$ would take $1000/0.15 = 6700$ years if the flux were unchanged. It is not: the weathering flux responds only weakly to higher $\mathrm{CO_2}$, so the removal is faster at first (the ocean and land sinks take up about half of the excess within a few decades) and then very slow, leaving perhaps a fifth of the excess in the air after a thousand years and a few per cent after a hundred thousand. This is the difference between the fast cycle, which redistributes carbon, and the slow cycle, which is the only one that can get rid of it — and the reason that "the Earth will take the carbon back" is true on a timescale no civilisation operates on.
:::
:::

::: widget plot
f: 1/(1-x)
x: -1, 0.85
y: 0, 8
hlines: 1
vlines: 0
caption: The feedback amplification factor $1/(1 - f)$ against the net feedback $f$. At $f = 0$ there is no feedback and the factor is 1; at $f = 0.5$ the response is doubled; at $f = 0.9$ it is ten times the unperturbed response. As $f$ approaches 1 the curve runs away — that is what "runaway" means mathematically. Negative feedbacks ($f < 0$) push the factor below 1.
:::

## Feedbacks

::: definition Feedback, gain and amplification {#def-feedback}
A **feedback** operates when a change in a system variable alters some flux that in turn changes that variable. If the returned change has the same sign as the original, the feedback is **positive** (or reinforcing); if opposite, **negative** (or balancing). Write the total response as the response to the initial perturbation plus a fraction $f$ of itself,

$$
\Delta X = \Delta X_0 + f\,\Delta X \quad\Longrightarrow\quad \Delta X = \frac{\Delta X_0}{1 - f},
$$

so that $A = 1/(1 - f)$ is the **amplification factor** and $g = f/(1-f)$ the **gain**. For a climate feedback, $f$ is usually written as a sum of feedback parameters $\lambda_i$ relative to the Planck response: $A = -\lambda_0/(\lambda_0 + \sum_i\lambda_i)$.
:::

::: proposition Stability of a linear feedback {#prop-stability}
The system $\Delta X = \Delta X_0 + f\Delta X$ is stable (the iteration converges) if and only if $f < 1$. For $0 < f < 1$ the response is finite but larger than the initial perturbation; for $f < 0$ it is smaller; for $f \ge 1$ the response grows without bound.
:::

::: proof
Iterate: after $n$ passes the perturbation is $\Delta X_0(1 + f + f^2 + \dots + f^{n-1}) = \Delta X_0(1 - f^n)/(1 - f)$. This has a finite limit as $n\to\infty$ exactly when $f^n$ does, which requires $-1 < f < 1$ for the geometric series to converge (a feedback with $-1 < f < 0$ oscillates while shrinking). At $f \ge 1$ the partial sums grow without bound, and at $f = 1$ the response is infinite: the system has no restoring mechanism at all. Physically, $f$ is a ratio of the feedback flux to the flux that removes the perturbation, so $f \to 1$ means the removal flux is exactly cancelled.
:::

::: example Water vapour: the strongest positive feedback {#ex-wv}
In a warming world a warmer atmosphere holds more water vapour, which is itself a greenhouse gas. Suppose a doubling of $\mathrm{CO_2}$ would, on its own, warm the surface by $1.2\ ^\circ\mathrm{C}$, and that water vapour adds $0.7\ ^\circ\mathrm{C}$ per degree of surface warming while clouds, lapse rate and surface albedo together remove $0.5\ ^\circ\mathrm{C}$ per degree. Find the net feedback, the amplification and the equilibrium warming.
::: solution
The net feedback parameter is $f = 0.7 - 0.5 = 0.2\ \mathrm{K\,K^{-1}}$, so

$$
A = \frac{1}{1 - 0.2} = 1.25, \qquad \Delta T = 1.25 \times 1.2 = 1.5\ ^\circ\mathrm{C}.
$$

Check by iterating: $1.2 \to 1.2 + 0.2\times1.2 = 1.44 \to 1.464 \to \dots \to 1.5$. The numbers here are chosen to be simple; the assessed values (IPCC AR6 Working Group I, 2021, Chapter 7), written with the convention that a *negative* parameter is stabilising, are $\lambda_0 = -3.22\ \mathrm{W\,m^{-2}\,K^{-1}}$ for the Planck response, $-1.30$ *likely* $-1.80$ to $-0.90$ for water vapour plus lapse rate, $+1.0$ *likely* $+0.3$ to $+2.0$ for clouds and $+0.1$ for surface albedo. The lesson is not the arithmetic but the structure: individual feedbacks are large and partly cancel, which is why the net is uncertain.
:::
:::

::: quiz
A reservoir has a net feedback of $f = 1.2$. What does the linear feedback model predict?
- [ ] A response $1.2$ times the unperturbed response.
- [ ] A response that oscillates and dies away.
- [x] No steady state: the response grows without bound.
- [ ] A response $0.83$ times the unperturbed response.
::: solution
The amplification $1/(1 - f)$ is negative for $f > 1$, which is the algebraic signal that the geometric series $1 + f + f^2 + \dots$ does not converge. Physically, the feedback flux exceeds the flux that removes the perturbation, so there is no state the system can settle into: the model is telling you that some other process, left out of the bookkeeping, must become important. Real systems are full of such limits — they are called *tipping points* when the omitted process moves the system to a different regime.
:::
:::

::: example A negative feedback that has saved the planet repeatedly {#ex-weathering}
The flux of carbon dioxide removed by silicate weathering roughly doubles for each $10\ \mathrm{K}$ of warming in the range relevant to the geological thermostat. If the removal flux is $0.3\ \mathrm{Gt\,C\,yr^{-1}}$ at $15\ ^\circ\mathrm{C}$ global mean surface temperature, write the flux as $F(T) = F_0 Q^{(T - 15)/10}$ with $Q = 2$, and find the change in removal flux for a $5\ \mathrm{K}$ warming. What sign of feedback is this, and what does it imply over millions of years?
::: solution
$$
\frac{\Delta F}{F_0} = Q^{5/10} - 1 = 2^{0.5} - 1 = 0.41,
$$

so the removal flux rises by $41\%$, from $0.3$ to $0.42\ \mathrm{Gt\,C\,yr^{-1}}$ — an extra $0.12\ \mathrm{Gt\,C\,yr^{-1}}$, which is about $1\%$ of the present anthropogenic emission. The feedback is strongly negative in *sign* (warming increases the removal of the greenhouse gas that caused it) but far too slow to matter on century timescales. Over millions of years it dominates: it is the reason the Phanerozoic stayed ice-free or glaciated but never boiled, and it is why the excess carbon dioxide of the industrial era will eventually be removed, in the same way, in a few hundred thousand years.
:::
:::

::: intuition What a box model can and cannot do
A box model conserves mass by construction, so it is a good instrument for asking "where did it go?" and "how long until it is gone?". It cannot tell you the size of a flux or the strength of a feedback: those are measurements, or the output of a process model, and box models are routinely accused of hiding ignorance in a well-mixed assumption. Two cautions. First, real reservoirs are not well mixed — the atmosphere is, in a year; the ocean takes a thousand years to ventilate; a peat profile turns over from the top down. Second, fluxes are rarely proportional to the reservoir size: a fishery, a soil carbon pool or the weathering flux can switch regime, saturate, or run away. When a box model's answer depends on a linear flux law, say so.
:::

::: warning "The system is in balance" is not a claim that nothing is changing
Steady state means $\mathrm{d}R/\mathrm{d}t = 0$, nothing more. The pre-industrial carbon cycle was in a steady state with gross fluxes of hundreds of $\mathrm{Gt\,C\,yr^{-1}}$; that told us nothing about how it would respond to emissions. Conversely, a reservoir can be growing while its fluxes are unbalanced by a fraction of a per cent: the atmosphere gains about $5\ \mathrm{Gt\,C\,yr^{-1}}$ out of a throughput of $210$, an imbalance of $2\%$, and that is enough to change the climate. Always ask what the imbalance is *relative to*, and whether the fluxes are measured or inferred as a residual.
:::

::: history
The box model is older than the data. In 1896 Svante Arrhenius computed the temperature effect of carbon dioxide using a model in which the ocean and atmosphere exchanged the gas and the ocean's content was set by solubility — a two-box model with a chemical constraint, and the first quantitative climate model. In 1957 Roger Revelle and Hans Suess used the carbonate chemistry of seawater to argue that the surface ocean's capacity to absorb extra carbon dioxide was small — the "Revelle factor" — and Charles Keeling's measurements from 1958 showed that it was also being used up. The language of feedbacks came from control theory, and entered climate science with the numerical models of the 1960s: Syukuro Manabe and Richard Wetherald's 1967 model included water vapour feedback and produced $2.9\ ^\circ\mathrm{C}$ for a doubling of carbon dioxide, a number that has proved remarkably durable. The 1979 report of an advisory committee to the US National Academy of Sciences, chaired by Jule Charney, put the range at $1.5$–$4.5\ ^\circ\mathrm{C}$; forty-five years and many models later, IPCC AR6 (2021) still gives $3\ ^\circ\mathrm{C}$ *likely* $2.5$–$4.5\ ^\circ\mathrm{C}$ as the best estimate. The bookkeeping has improved enormously; the feedbacks remain the hard part.
:::

## Where this leads

The box-model language runs through the whole atlas. Residence times organise the water cycle ([[earth-system/water-cycle]]) and the carbon cycle ([[earth-system/carbon-cycle]]), and reappear as groundwater ages ([[hydrology/groundwater-flow]]), ice-core gas ages ([[palaeoclimate/ice-cores]]) and radiometric clocks ([[earth-history/geological-time]]). Feedbacks organise the climate: the feedback framework above is used almost unchanged in [[climate-system/feedbacks-sensitivity]], where the parameters $\lambda_i$ are estimated from models and observations, and in [[climate-change/emissions-budgets]] when we ask how much warming a given cumulative emission implies. The next chapter applies the same budget thinking to energy rather than matter.

::: summary
- A **reservoir** holds, a **flux** moves, and the **budget** $\mathrm{d}R/\mathrm{d}t = \text{in} - \text{out}$ is the only physics a box model adds.
- For a well-mixed reservoir in steady state, $\tau = R/F$, and a perturbation decays as $e^{-t/\tau}$: $37\%$ after one $\tau$, $5\%$ after three, $0.7\%$ after five.
- Turnover time (how fast molecules cycle) and adjustment time (how fast the amount recovers) are different quantities; for carbon dioxide they differ by more than an order of magnitude.
- A step change in input is followed by exponential approach to the new steady state, $90\%$ in $2.3\tau$ and $99\%$ in $4.6\tau$.
- Connecting boxes splits a perturbation in proportion to their sizes and sets the equilibration rate by the sum of the exchange rate constants.
- A feedback with net strength $f$ amplifies the response by $1/(1 - f)$; the system is stable only for $f < 1$.
- Climate feedbacks are individually large and partly cancelling, which is why the net — and hence climate sensitivity — is uncertain.
:::

## Exercises

::: exercise A reservoir in balance {level=1 check="579"}
A lake holds $5.0\times10^{9}\ \mathrm{m^3}$ of water and receives $100\ \mathrm{m^3\,s^{-1}}$ from rivers. In steady state, what is its residence time in days?
::: solution
In steady state the outflow equals the inflow, $F = 100\ \mathrm{m^3\,s^{-1}}$, so
$$
\tau = \frac{5.0\times10^{9}}{100} = 5.0\times10^{7}\ \mathrm{s} = \frac{5.0\times10^{7}}{86400} = 579\ \mathrm{days},
$$
about a year and a half. A lake with a residence time of this kind is easily flushed by a single storm season; one with $\tau$ of several years integrates its catchment over many years and is far more sensitive to eutrophication.
:::
:::

::: exercise Convert the units {level=1 check="36.6"}
A power station emits $10\ \mathrm{Gt\,C}$ over a century. Express the total in $\mathrm{Gt\,CO_2}$, and the mean rate in $\mathrm{Gt\,CO_2\,yr^{-1}}$.
::: solution
$1\ \mathrm{Gt\,C} = 44.01/12.011 = 3.664\ \mathrm{Gt\,CO_2}$, so $10\ \mathrm{Gt\,C} = 36.6\ \mathrm{Gt\,CO_2}$, and the mean rate is $0.37\ \mathrm{Gt\,CO_2\,yr^{-1}}$.
:::
:::

::: exercise Decay of a tracer {level=1 check="60"}
A tracer injected into a reservoir with $\tau = 20\ \mathrm{yr}$ decays as $e^{-t/\tau}$. After how many years does $5\%$ remain?
::: solution
$e^{-t/20} = 0.05$ gives $t = 20\ln 20 = 20\times3.00 = 60\ \mathrm{yr}$, i.e. three residence times.
:::
:::

::: exercise Groundwater {level=2 check="1200"}
Fresh groundwater holds $10.53\times10^{6}\ \mathrm{km^3}$ and is recharged at $8800\ \mathrm{km^3\,yr^{-1}}$ (US Geological Survey estimates). Find the mean residence time in years.
::: solution
$\tau = 10.53\times10^{6}/8800 = 1197\ \mathrm{yr}$, about $1200$ years. Note that this is a mean over a distribution that spans decades in shallow aquifers and millions of years in deep basins: bomb-tritium and $^{14}\mathrm{C}$ measurements show exactly that spread ([[hydrology/groundwater-flow]]).
:::
:::

::: exercise A growing reservoir {level=2 check="80"}
A reservoir of $800$ units receives $50$ and loses $45$ units per year, both fluxes constant. How many years until it has grown by $50\%$? Is $\tau = R/F$ meaningful here?
::: solution
$\mathrm{d}R/\mathrm{d}t = 5\ \mathrm{units\,yr^{-1}}$, so the additional $400$ units take $400/5 = 80\ \mathrm{yr}$. The residence time is not defined in the usual sense, because the reservoir is not in a steady state; if you must characterise its flushing, use the output flux, $\tau = 800/45 = 18\ \mathrm{yr}$, and say which convention you used.
:::
:::

::: exercise Two-box relaxation {level=2}
Two boxes of sizes $A = 600$ and $B = 2400$ units are connected by an exchange flux of $120\ \mathrm{units\,yr^{-1}}$ in each direction at equilibrium. Find the two rate constants and the time constant for the exchange, and work out how a small addition of $100$ units to $A$ is shared between the boxes in the end.
::: solution
$k_A = 120/600 = 0.20\ \mathrm{yr^{-1}}$, $k_B = 120/2400 = 0.05\ \mathrm{yr^{-1}}$. The exchange equilibrates at the sum, $0.25\ \mathrm{yr^{-1}}$, so the time constant is $4\ \mathrm{yr}$ and $99\%$ equilibration takes $18\ \mathrm{yr}$. In the final state the excess fluxes balance, $k_A\Delta A = k_B\Delta B$, so $\Delta B/\Delta A = k_A/k_B = 4$: box $B$ keeps $80\%$ of the excess and $A$ only $20\%$. The intuition "the bigger box takes more" is right, but the ratio is set by the rate constants, not by the sizes alone — here the two are proportional because the exchange flux is the same in both directions at equilibrium.
:::
:::

::: exercise Feedback arithmetic {level=2 check="4"}
A perturbation of $2.0\ \mathrm{W\,m^{-2}}$ is applied to a system whose net feedback is $f = 0.75$. Find the amplification factor and the response relative to the no-feedback response.
::: solution
$A = 1/(1 - 0.75) = 4$. The response is four times the no-feedback response. If the no-feedback response were $0.8\ \mathrm{K}$, the actual response would be $3.2\ \mathrm{K}$.
:::
:::

::: exercise The airborne fraction {level=3}
Over 2010–2019, global emissions averaged $9.6\ \mathrm{Gt\,C\,yr^{-1}}$ from fossil fuels and industry and $1.6\ \mathrm{Gt\,C\,yr^{-1}}$ from land-use change; the ocean took up $2.6 \pm 0.4$ and the land $3.1 \pm 0.6\ \mathrm{Gt\,C\,yr^{-1}}$ (Global Carbon Budget 2022). Find the flux accumulating in the atmosphere in $\mathrm{Gt\,C\,yr^{-1}}$, the airborne fraction, and the corresponding rate of rise in $\mathrm{ppm\,yr^{-1}}$.
::: solution
$$
\frac{\mathrm{d}R}{\mathrm{d}t} = (9.6 + 1.6) - (2.6 + 3.1) = 11.2 - 5.7 = 5.5\ \mathrm{Gt\,C\,yr^{-1}},
$$

with an uncertainty of about $\pm 0.8$ from the two sinks. The airborne fraction is $5.5/11.2 = 49\%$. At $2.13\ \mathrm{Gt\,C\,ppm^{-1}}$ this is $5.5/2.13 = 2.6\ \mathrm{ppm\,yr^{-1}}$, close to the $2.5\ \mathrm{ppm\,yr^{-1}}$ observed (NOAA Global Monitoring Laboratory, Mauna Loa). The small discrepancy is the usual one: the sink terms are inferred as residuals from an emissions inventory and an atmospheric growth rate, not measured directly, so the budget closes by construction to within the stated uncertainties.
:::
:::

::: exercise How long after emissions stop? {level=3}
Use [[#prop-relax]] for an atmosphere in which the excess carbon dioxide is removed with an effective time constant of $\tau = 150\ \mathrm{yr}$ (a crude stand-in for ocean uptake and carbonate neutralisation). If emissions cease abruptly with $1000\ \mathrm{Gt\,C}$ of excess in the air, how long until the excess is below $100\ \mathrm{Gt\,C}$? Compare with $\tau$.
::: solution
$1000\,e^{-t/150} = 100$ gives $t = 150\ln 10 = 345\ \mathrm{yr}$. That is $2.3\tau$, as the proposition predicts. The comparison to make is with the turnover time of atmospheric carbon, about $4$–$5$ years: the two differ by a factor of about $70$. A real Earth-system model gives a shorter initial drop (the land and surface ocean take up carbon quickly while the concentration gradient is steep) and a much longer tail than a single exponential, because the deep ocean and carbonate chemistry respond on $10^3$–$10^5$ year timescales.
:::
:::

::: exercise A model with a threshold {level=3}
Soil organic carbon $S$ loses carbon by decomposition at a rate proportional to $S$ with $\tau = 25\ \mathrm{yr}$, and gains it from plant litter at a flux $L$. (a) If $L = 60\ \mathrm{Gt\,C\,yr^{-1}}$, what is the steady-state stock? (b) If warming reduces $L$ to $50\ \mathrm{Gt\,C\,yr^{-1}}$, what is the new stock and how long to reach $90\%$ of the change? (c) If instead decomposition accelerates so that $\tau$ falls to $20\ \mathrm{yr}$ with $L = 60$ unchanged, what is the new stock?
::: solution
(a) $S_\infty = L\tau = 60\times25 = 1500\ \mathrm{Gt\,C}$, comparable with the assessed global soil stock to $1\ \mathrm{m}$ depth ($1500$–$2400\ \mathrm{Gt\,C}$, depending on how much permafrost is counted).
(b) $S_\infty = 50\times25 = 1250\ \mathrm{Gt\,C}$, a loss of $250\ \mathrm{Gt\,C}$; $90\%$ of the change takes $2.3\tau = 58\ \mathrm{yr}$.
(c) $S_\infty = 60\times20 = 1200\ \mathrm{Gt\,C}$: a further $300\ \mathrm{Gt\,C}$ could be released by a change in turnover alone, with no change in the input at all. This is why "soil carbon is a sink" and "soil carbon is stable" are not the same claim, and why permafrost thaw — which changes $\tau$, not $L$ — is a feedback rather than a forcing.
:::
:::
