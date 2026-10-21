Your blood contains about $0.024\ \mathrm{mol\,dm^{-3}}$ of hydrogen carbonate and is bathed in carbon dioxide at a partial pressure your lungs control; the two together hold the pH between $7.35$ and $7.45$ while your muscles pour lactic acid into it by the gram every hour of exercise. A fall below $7.35$ is acidosis, above $7.45$ alkalosis, and either can be fatal within minutes — yet a glass of orange juice, whose pH is nearer $3.5$, passes into the same bloodstream without moving its pH by a hundredth of a unit. The reason is a **buffer**, and the quantitative tool that explains it — and that also explains every titration curve, every indicator, and the difference between an equivalence point and an end point — is the equilibrium chemistry of the previous chapter turned into a handful of decisions you can make in your sleep. Buffers and titrations are the same subject seen from two ends: a buffer is what a solution does when you add a little titrant, and a titration curve is what happens when you keep adding it.

## How a buffer works

::: definition Buffer solution {#def-buffer}
A **buffer solution** is one that resists a change of pH when small amounts of strong acid or strong base are added, or when it is diluted. A buffer is made from a **conjugate acid–base pair present in comparable amounts**: either a weak acid with its salt ($\mathrm{CH_3COOH}$ with $\mathrm{CH_3COONa}$), or a weak base with its salt ($\mathrm{NH_3}$ with $\mathrm{NH_4Cl}$). The resistance is not magic but the common-ion effect at work: the mixture contains a large reserve of the base form, ready to consume any added $\mathrm{H_3O^+}$, and a large reserve of the acid form, ready to consume any added $\mathrm{OH^-}$, and both reserves are far larger than anything you add.
:::

Write what happens when acid is added to an ethanoate buffer. The added hydronium cannot accumulate, because ethanoate ions are everywhere and the reaction $\mathrm{CH_3COO^- + H_3O^+ \rightarrow CH_3COOH + H_2O}$ has an equilibrium constant of $1/K_\mathrm{a} = 5.6\times10^{4}$ — it is, for practical purposes, complete. Added hydroxide is destroyed symmetrically by the ethanoic acid, $\mathrm{CH_3COOH + OH^- \rightarrow CH_3COO^- + H_2O}$, with $K = K_\mathrm{a}/K_\mathrm{w} = 1.8\times10^{9}$. What changes is not the hydronium concentration but the **ratio** of the two buffer components, and — as the next result shows — the pH depends only on that ratio.

::: proposition The Henderson–Hasselbalch equation {#prop-henderson-hasselbalch}
For a buffer made from a weak acid $\mathrm{HA}$ of concentration $[\mathrm{HA}]$ and its conjugate base $\mathrm{A^-}$ of concentration $[\mathrm{A^-}]$,
$$
\mathrm{pH} = \mathrm{p}K_\mathrm{a} + \log_{10}\frac{[\mathrm{A^-}]}{[\mathrm{HA}]}.
$$
The equation holds when both components are present at concentrations large compared with $[\mathrm{H_3O^+}]$ and $[\mathrm{OH^-}]$ (roughly, both above $10^{-3}\ \mathrm{mol\,dm^{-3}}$) and the acid is weak enough that its dissociation is a small correction ($C/K_\mathrm{a} \ge 100$). Under those conditions the equilibrium concentrations are the analytical ones: you may plug in what you mixed.
:::

::: proof The Henderson–Hasselbalch equation {#proof-hh}
Start from the definition of the acid dissociation constant,
$$
K_\mathrm{a} = \frac{[\mathrm{H_3O^+}][\mathrm{A^-}]}{[\mathrm{HA}]}.
$$
Solve for the hydronium concentration, $[\mathrm{H_3O^+}] = K_\mathrm{a}\,[\mathrm{HA}]/[\mathrm{A^-}]$, and take $-\log_{10}$ of both sides:
$$
\mathrm{pH} = -\log_{10}K_\mathrm{a} - \log_{10}\frac{[\mathrm{HA}]}{[\mathrm{A^-}]} = \mathrm{p}K_\mathrm{a} + \log_{10}\frac{[\mathrm{A^-}]}{[\mathrm{HA}]}.
$$
Where does the approximation hide? In replacing the equilibrium $[\mathrm{A^-}]$ and $[\mathrm{HA}]$ by the analytical concentrations. The acid's own dissociation converts $x$ of $\mathrm{HA}$ into $\mathrm{A^-}$, where $x = [\mathrm{H_3O^+}] \approx K_\mathrm{a}[\mathrm{HA}]/[\mathrm{A^-}]$; the correction is negligible precisely when $x$ is small compared with both concentrations, which is the stated condition. Water's own ions enter the same way: if the buffer is so dilute that $[\mathrm{H_3O^+}]$ or $[\mathrm{OH^-}]$ is comparable with the component concentrations, the charge balance forces a correction and the equation fails.
:::

::: example Preparing a buffer of given pH {#ex-buffer-prep}
You need $250\ \mathrm{cm^3}$ of an ethanoate buffer at $\mathrm{pH}\ 5.00$, and the laboratory has $0.100\ \mathrm{mol\,dm^{-3}}$ ethanoic acid and $0.100\ \mathrm{mol\,dm^{-3}}$ sodium ethanoate. What volumes do you mix? ($\mathrm{p}K_\mathrm{a} = 4.76$.)
::: solution
Rearrange the Henderson–Hasselbalch equation to the ratio you need:
$$
\frac{[\mathrm{A^-}]}{[\mathrm{HA}]} = 10^{\,\mathrm{pH} - \mathrm{p}K_\mathrm{a}} = 10^{\,5.00 - 4.76} = 10^{0.24} = 1.74.
$$
Because both stock solutions have the same concentration, the concentration ratio equals the volume ratio, so with $V_\mathrm{b}$ the ethanoate volume,
$$
\frac{V_\mathrm{b}}{250 - V_\mathrm{b}} = 1.74
\qquad\Longrightarrow\qquad
V_\mathrm{b} = 250\times\frac{1.74}{2.74} = 159\ \mathrm{cm^3},
$$
and $91\ \mathrm{cm^3}$ of acid. Mix and check the ratio: $159/91 = 1.75$, $\log_{10}1.75 = 0.24$, $\mathrm{pH} = 5.00$. Note the two decisions the problem forced: the $\mathrm{p}K_\mathrm{a}$ must be within about one unit of the target pH (here $4.76$ versus $5.00$ — comfortable), and only the **ratio** matters, not the absolute concentrations, which you choose separately when you decide how much capacity you need.
:::
:::

The equation says something you can feel but rarely state: **diluting a buffer changes its pH not at all**, because the ratio of moles is unchanged by adding water. What dilution does destroy is the buffer's capacity to resist, and the right way to measure that resistance is the buffer capacity.

::: proposition Buffer capacity {#prop-buffer-capacity}
The **buffer capacity** $\beta$ is the amount of strong base (in $\mathrm{mol\,dm^{-3}}$) that must be added to raise the pH of the solution by one unit, $\beta = \mathrm{d}C_\mathrm{b}/\mathrm{d}(\mathrm{pH})$. For a buffer of total concentration $C = [\mathrm{HA}] + [\mathrm{A^-}]$,
$$
\beta = 2.303\left([\mathrm{H_3O^+}] + [\mathrm{OH^-}] + C\,\frac{K_\mathrm{a}[\mathrm{H_3O^+}]}{(K_\mathrm{a} + [\mathrm{H_3O^+}])^{2}}\right).
$$
The buffer term is maximal at $\mathrm{pH} = \mathrm{p}K_\mathrm{a}$, where $\beta_\mathrm{max} = 2.303\,C/4 \approx 0.576\,C$, and has fallen to one third of that value at $\mathrm{pH} = \mathrm{p}K_\mathrm{a} \pm 1$ and to one twenty-third at $\pm 2$. This is the quantitative content of the rule that a buffer is useful only within one pH unit of its $\mathrm{p}K_\mathrm{a}$.
:::

::: proof Where the capacity is greatest {#proof-capacity}
Add $\mathrm{d}n$ moles of strong base per litre to a buffer: it converts $\mathrm{d}n$ of $\mathrm{HA}$ into $\mathrm{A^-}$, so $[\mathrm{A^-}]$ rises by $\mathrm{d}n$. Write $r = [\mathrm{A^-}]/[\mathrm{HA}]$, so that $[\mathrm{A^-}] = Cr/(1+r)$; differentiating, $\mathrm{d}[\mathrm{A^-}] = C\,\mathrm{d}r/(1+r)^2 = \mathrm{d}n$, while the Henderson–Hasselbalch equation gives $\mathrm{d}(\mathrm{pH}) = \mathrm{d}(\log_{10} r) = \mathrm{d}r/(r\ln 10)$. Therefore
$$
\beta = \frac{\mathrm{d}n}{\mathrm{d}(\mathrm{pH})} = \frac{C\,r}{(1+r)^2}\ln 10 = 2.303\,C\,\frac{r}{(1+r)^2}.
$$
Writing $r = K_\mathrm{a}/[\mathrm{H_3O^+}]$ turns the last factor into $K_\mathrm{a}[\mathrm{H_3O^+}]/(K_\mathrm{a} + [\mathrm{H}_3\mathrm{O}^+)^2$, and the factor $r/(1+r)^2$ is maximal where $r = 1$, that is at $\mathrm{pH} = \mathrm{p}K_\mathrm{a}$, with value $1/4$. At $r = 10$ or $r = 1/10$ (one pH unit away) it is $10/121 = 0.083$, one third of $1/4$; at two units away, $100/10201 = 0.0098$. The water terms $[\mathrm{H_3O^+}] + [\mathrm{OH^-}]$ are the capacity of the solvent itself, negligible in the middle of the scale but dominant outside the buffer range — they are why even pure water has *some* capacity, and why a "buffer" two units off its $\mathrm{p}K_\mathrm{a}$ is really just dilute salt solution.
:::

::: widget plot
f: 2.303*C*10^(-4.76-x)/((10^(-4.76)+10^(-x))^2)
x: 0, 14
y: 0, 0.3
sliders: C=0.1:0.01:0.5:0.01
labels: \text{buffer capacity}
caption: The buffer capacity $\beta$ of an ethanoate buffer ($\mathrm{p}K_\mathrm{a} = 4.76$) of total concentration $C$ set by the slider, as a function of pH. The curve peaks at $\mathrm{pH} = \mathrm{p}K_\mathrm{a}$ with $\beta_\mathrm{max} = 0.576\,C$ and falls to a third of its peak one pH unit either side — the bell shape that makes "$\mathrm{p}K_\mathrm{a} \pm 1$" the working range of every buffer you will ever choose. The water term is omitted, which is why the curve tails to zero at both ends instead of rising again at $\mathrm{pH} < 2$ and $\mathrm{pH} > 12$.
:::

::: example How much acid can the buffer swallow? {#ex-capacity}
A $1.00\ \mathrm{dm^3}$ flask holds $0.100\ \mathrm{mol\,dm^{-3}}$ each in ethanoic acid and sodium ethanoate ($\mathrm{pH} = 4.76$). What volume of $1.00\ \mathrm{mol\,dm^{-3}}$ $\mathrm{HCl}$ changes its pH by $0.10$ units?
::: solution
Adding $x$ mol of $\mathrm{HCl}$ converts $x$ of $\mathrm{A^-}$ into $\mathrm{HA}$, so the ratio becomes $(0.100 - x)/(0.100 + x)$. A fall of $0.10$ pH units means
$$
\frac{0.100 - x}{0.100 + x} = 10^{-0.10} = 0.794
\qquad\Longrightarrow\qquad
0.100 - 0.0794 = x(1 + 0.794),
$$
so $x = 0.0206/1.794 = 0.0115\ \mathrm{mol}$ — $11.5\ \mathrm{cm^3}$ of the acid. The same buffer would be exhausted entirely (every last ethanoate ion protonated) by $0.100\ \mathrm{mol}$, ten times more; within its range it spends acid slowly, and the $0.10$-unit change has used only one ninth of its reserve. Add the same $11.5\ \mathrm{cm^3}$ of acid to $1.00\ \mathrm{dm^3}$ of pure water and the pH falls from $7.00$ to $1.94$ — the comparison is the whole point of a buffer.
:::
:::

::: warning A buffer is not infinite, and Henderson–Hasselbalch is not universal {#warn-buffer-limits}
Three failures await the careless. **Capacity is finite**: the buffer of the example above stops being a buffer the moment the added acid exceeds $0.100\ \mathrm{mol}$, and the pH then collapses as if the buffer had never existed. **The equation has a dilution limit**: take an equimolar ethanoate buffer and dilute it, and Henderson–Hasselbalch predicts $\mathrm{pH} = 4.76$ forever, but the exact treatment (charge and mass balance, including water) gives $4.76$ at $10^{-3}\ \mathrm{mol\,dm^{-3}}$ per component, $4.86$ at $10^{-4}$, and $5.27$ at $10^{-5}$ — below about $10^{-3}\ \mathrm{mol\,dm^{-3}}$ per component the water autoionisation has taken over and the "buffer" is buffering nothing. **And a buffer does not fix pH, it slows it**: a buffer whose ratio has drifted from $1.00$ to $0.79$ has moved $0.10$ pH units, exactly as arithmetic says; resistance means *small change per mole added*, not *no change*.
:::

::: quiz
Two ethanoate buffers are prepared: A is $0.10\ \mathrm{mol\,dm^{-3}}$ in acid and $0.10\ \mathrm{mol\,dm^{-3}}$ in ethanoate; B is the same mixture diluted tenfold to $0.010\ \mathrm{mol\,dm^{-3}}$ each. Which statement is correct?
- [x] A and B have the same pH, but A neutralises ten times as much added acid before exhausting.
- [ ] B has the higher pH because it is more dilute and therefore more nearly neutral.
- [ ] A and B behave identically in every respect, including their response to added acid.
- [ ] B has the lower pH because dilution shifts the acid dissociation to the right.
::: solution
The Henderson–Hasselbalch equation contains only the ratio $[\mathrm{A^-}]/[\mathrm{HA}]$, which dilution leaves at $1.00$ for both, so both sit at $\mathrm{pH} = \mathrm{p}K_\mathrm{a} = 4.76$ (at these concentrations the exact treatment agrees to $0.01$ units). But the reserves — the amounts of $\mathrm{HA}$ and $\mathrm{A^-}$ available to consume added base or acid — are ten times larger in A: buffer capacity is proportional to total concentration $C$, and dilution spends it without moving the pH.
:::
:::

## Choosing a buffer, and the buffers of the blood

The design rules follow from the capacity curve. Pick an acid with $\mathrm{p}K_\mathrm{a}$ within one unit of the target pH — within $0.1$ if you can, since the capacity is then within $98\ \%$ of its maximum — and use total concentrations of $0.05$–$0.25\ \mathrm{mol\,dm^{-3}}$: lower and the capacity is poor and the dilution limit approaches, higher and you salt the solution about, changing its ionic strength and with it the activity coefficients the concentration-based $\mathrm{p}K_\mathrm{a}$ quietly assumes. Common choices: ethanoate for $\mathrm{pH}\ 3.8$–$5.6$, phosphate ($\mathrm{p}K_\mathrm{a2} = 7.20$) for $6.2$–$8.2$, ammonium ($\mathrm{p}K_\mathrm{a} = 9.25$) for $8.3$–$10.2$, carbonate/bicarbonate ($\mathrm{p}K_\mathrm{a1} = 6.35$) for the unusual case below.

The blood carbonate system is the textbook example of a buffer with a twist. Dissolved carbon dioxide is a weak acid ($\mathrm{CO_2 + H_2O \rightleftharpoons H^+ + HCO_3^-}$, apparent $\mathrm{p}K_\mathrm{a1} = 6.35$ at body temperature) and hydrogen carbonate its conjugate base — but the acid component is in equilibrium with a *gas*, and the lungs hold that gas at a fixed partial pressure. The buffer is therefore **open**: the $\mathrm{CO_2}$ concentration does not change when metabolic acid is added, because the excess is breathed out.

::: example The pH of your blood {#ex-blood}
Arterial blood plasma holds $[\mathrm{HCO_3^-}] = 24\ \mathrm{mmol\,dm^{-3}}$ and, at $\mathrm{p_{CO_2}} = 5.3\ \mathrm{kPa}$, $[\mathrm{CO_2}] = 1.2\ \mathrm{mmol\,dm^{-3}}$. Find its pH.
::: solution
Treat dissolved $\mathrm{CO_2}$ as the acid component and apply Henderson–Hasselbalch with the apparent constant:
$$
\mathrm{pH} = 6.35 + \log_{10}\frac{24}{1.2} = 6.35 + \log_{10}20 = 6.35 + 1.30 = 7.40.
$$
The number is exactly the physiological one, and the structure of the calculation is the physiology: the ratio is twenty to one, heavily biased to the base, because the acid component is a gas the lungs can vent. Hyperventilate and $\mathrm{p_{CO_2}}$ falls, the ratio rises, and you become alkaline within minutes — which is why breathing into a paper bag (rebreathing $\mathrm{CO_2}$) was the folk remedy for the tingling of a panic attack. The kidneys control the other component more slowly, over hours to days, which is why respiratory disturbances are fast and metabolic ones are slow.
:::
:::

::: history
The quantitative theory of buffers grew directly out of the pH concept. S. P. L. Sørensen introduced the hydrogen-ion concentration scale at the Carlsberg Laboratory in 1909, and in 1908 the Boston chemist Lawrence Joseph Henderson had already written the equilibrium-ratio equation for the blood carbonate system in his book *The Blood*; in 1916 the Danish physiologist Karl Albert Hasselbalch, studying the same blood problem, restated Henderson's equation in logarithmic form using Sørensen's pH — the Henderson–Hasselbalch equation, one of very few in science that credits its two authors across a decade and a language barrier. Buffer capacity as a defined quantity came later still, standardised in the mid-twentieth century as analytical and biological work demanded buffers that could be specified rather than merely mixed.
:::

## Strong acid with strong base: the shape of a titration

::: definition Titration vocabulary {#def-titration-terms}
A **titration** is the controlled addition of a solution of known concentration, the **titrant**, from a burette to a measured volume of the solution analysed, until the reaction is **stoichiometrically complete**: the **equivalence point** (or stoichiometric point) is the volume at which the moles of titrant exactly match the moles of analyte by the balanced equation. The **end point** is the volume at which the indicator changes colour; the titration is right when the two coincide. A **titration curve** plots pH against titrant volume.
:::

::: proposition The strong-acid/strong-base curve {#prop-strong-curve}
Titration of $25.0\ \mathrm{cm^3}$ of $0.100\ \mathrm{mol\,dm^{-3}}$ $\mathrm{HCl}$ with $0.100\ \mathrm{mol\,dm^{-3}}$ $\mathrm{NaOH}$ passes through three regimes: before the equivalence point the pH is set by the unneutralised acid, at the equivalence point ($25.0\ \mathrm{cm^3}$) it is $7.00$ because only $\mathrm{NaCl}$ remains, and beyond it by the excess of $\mathrm{OH^-}$. Between $99.9\ \%$ and $100.1\ \%$ of the equivalence volume — two drops — the pH leaps from $4.30$ to $9.70$. That **steep region** is the whole reason indicators work: any indicator whose transition range falls inside it changes colour within a drop of the equivalence point.
:::

::: example Points on the strong-versus-strong curve {#ex-strong-curve}
Compute the pH of the titration of $25.0\ \mathrm{cm^3}$ of $0.100\ \mathrm{mol\,dm^{-3}}$ $\mathrm{HCl}$ with $0.100\ \mathrm{mol\,dm^{-3}}$ $\mathrm{NaOH}$ after additions of $0$, $10.0$, $24.0$, $25.0$ and $26.0\ \mathrm{cm^3}$.
::: solution
Before equivalence, $[\mathrm{H_3O^+}] = (n_\mathrm{HCl} - n_\mathrm{NaOH})/V_\mathrm{total}$:
$$
\begin{aligned}
V = 0: && [\mathrm{H_3O^+}] = 0.100, && \mathrm{pH} = 1.00;\\
V = 10.0: && \frac{(2.50 - 1.00)\ \mathrm{mmol}}{35.0\ \mathrm{cm^3}} = 0.0429, && \mathrm{pH} = 1.37;\\
V = 24.0: && \frac{0.10\ \mathrm{mmol}}{49.0\ \mathrm{cm^3}} = 2.0\times10^{-3}, && \mathrm{pH} = 2.69;
\end{aligned}
$$
at $V = 25.0$ the solution is pure brine, $\mathrm{pH} = 7.00$; and at $V = 26.0$ the excess hydroxide is $(2.60 - 2.50)\ \mathrm{mmol}/51.0\ \mathrm{cm^3} = 1.96\times10^{-3}\ \mathrm{mol\,dm^{-3}}$, so $\mathrm{pOH} = 2.71$ and $\mathrm{pH} = 11.29$. Watch the curve accelerate: the last centimetre before equivalence costs $4.3$ pH units, and the first centimetre past it costs $4.3$ more. Halving both concentrations flattens the jump to $5.30$–$8.70$; at $10^{-4}\ \mathrm{mol\,dm^{-3}}$ there is no jump at all, and no titration — the steep region is a concentration effect.
:::
:::

## Weak acid with strong base: where the pKa hides

The weak-acid curve is the strong-acid curve with a ramp bolted on. Before the equivalence point you are *making* the conjugate base as you titrate, so the solution is an ethanoate/ethanoic-acid buffer at every point of the first $25\ \mathrm{cm^3}$ — and the Henderson–Hasselbalch equation reads the curve like a gauge.

::: proposition The half-equivalence point {#prop-half-equivalence}
At the half-equivalence point of a weak-acid titration — when exactly half the acid has been neutralised — $[\mathrm{A^-}] = [\mathrm{HA}]$ and the Henderson–Hasselbalch equation collapses to
$$
\mathrm{pH} = \mathrm{p}K_\mathrm{a}.
$$
The same holds for a weak base titrated with strong acid at its half-equivalence point, where $\mathrm{pOH} = \mathrm{p}K_\mathrm{b}$. This is the standard experimental route to a $\mathrm{p}K_\mathrm{a}$ from a titration curve, and it is exact within the same limits as Henderson–Hasselbalch itself.
:::

::: proof The half-equivalence identity {#proof-halfway}
At half-neutralisation the stoichiometry has converted exactly half the analytical acid into conjugate base, so $[\mathrm{A^-}] = [\mathrm{HA}] = C/2$ (both large compared with $[\mathrm{H_3O^+}]$, since the solution is still buffered and mildly acidic). The ratio in the Henderson–Hasselbalch equation is $1$, its logarithm is $0$, and $\mathrm{pH} = \mathrm{p}K_\mathrm{a}$. Equivalently, from $K_\mathrm{a} = [\mathrm{H_3O^+}][\mathrm{A^-}]/[\mathrm{HA}]$ the ratio cancels and $[\mathrm{H_3O^+}] = K_\mathrm{a}$ directly. The identity fails only where Henderson–Hasselbalch fails: extremely dilute or extremely weak acids, where water's own ions distort the ratio.
:::

::: example The whole weak-acid curve {#ex-weak-curve}
Titrate $25.0\ \mathrm{cm^3}$ of $0.100\ \mathrm{mol\,dm^{-3}}$ ethanoic acid ($\mathrm{p}K_\mathrm{a} = 4.76$) with $0.100\ \mathrm{mol\,dm^{-3}}$ $\mathrm{NaOH}$. Compute the pH at $0$, $12.5$, $25.0$ and $30.0\ \mathrm{cm^3}$.
::: solution
**Start** ($0\ \mathrm{cm^3}$): a plain weak acid, $[\mathrm{H_3O^+}] = \sqrt{K_\mathrm{a}C} = \sqrt{1.8\times10^{-5}\times0.100} = 1.34\times10^{-3}$, $\mathrm{pH} = 2.87$.
**Halfway** ($12.5\ \mathrm{cm^3}$): the half-equivalence identity gives $\mathrm{pH} = \mathrm{p}K_\mathrm{a} = 4.76$.
**Equivalence** ($25.0\ \mathrm{cm^3}$): no acid remains — only $2.50\ \mathrm{mmol}$ of ethanoate in $50.0\ \mathrm{cm^3}$, i.e. $0.0500\ \mathrm{mol\,dm^{-3}}$ of a weak *base* with $K_\mathrm{b} = K_\mathrm{w}/K_\mathrm{a} = 5.6\times10^{-10}$:
$$
[\mathrm{OH^-}] = \sqrt{K_\mathrm{b}C} = \sqrt{5.6\times10^{-10}\times0.0500} = 5.3\times10^{-6},
$$
$\mathrm{pOH} = 5.28$, $\mathrm{pH} = 8.72$ — **basic at the equivalence point**, because the conjugate base of the analyte is what is left.
**Past equivalence** ($30.0\ \mathrm{cm^3}$): excess hydroxide dominates the weak base, $(3.00 - 2.50)\ \mathrm{mmol}/55.0\ \mathrm{cm^3} = 9.1\times10^{-3}$, $\mathrm{pOH} = 2.04$, $\mathrm{pH} = 11.96$. The curve starts higher than the strong-acid curve, runs flat through the buffer region, ends basic, and its steep region spans roughly $7$–$10$ — which already tells you which indicator to use.
:::
:::

::: widget newton
f: 10^(-x) + 0.05 - 10^(x-14) - 0.05*10^(-4.76)/(10^(-4.76)+10^(-x))
method: newton
x0: 8
caption: Newton's method solving the *exact* titration equation for the pH (the variable $x$) at the equivalence point of the titration of $25.0\ \mathrm{cm^3}$ of $0.100\ \mathrm{mol\,dm^{-3}}$ ethanoic acid with $0.100\ \mathrm{mol\,dm^{-3}}$ $\mathrm{NaOH}$, starting from $x_0 = 8$. The equation is the charge balance $[\mathrm{H_3O^+}] + [\mathrm{Na^+}] = [\mathrm{OH^-}] + [\mathrm{A^-}]$ with $[\mathrm{Na^+}] = [\mathrm{A^-}] + [\mathrm{HA}] = 0.05\ \mathrm{mol\,dm^{-3}}$ and the exact dissociation fraction $K_\mathrm{a}/(K_\mathrm{a} + [\mathrm{H_3O^+}])$ — no hydrolysis approximation anywhere. The iteration converges on $\mathrm{pH} = 8.73$, matching the square-root hydrolysis answer $8.72$ to a hundredth of a unit — the reassurance that the approximation was legitimate here.
:::

Mirror the picture for a **weak base titrated with a strong acid**: ammonia $+\ \mathrm{HCl}$ starts basic ($\mathrm{pH}\ 11.13$ for $0.100\ \mathrm{mol\,dm^{-3}}$), passes its half-equivalence at $\mathrm{pOH} = \mathrm{p}K_\mathrm{b} = 4.74$, and reaches an equivalence point at $\mathrm{pH} = 5.28$ — acidic, because the solution is now $0.050\ \mathrm{mol\,dm^{-3}}$ $\mathrm{NH_4^+}$, a weak acid. The steep region lies in the acid range, so phenolphthalein would change colour a full half-burette early; methyl orange is the right choice. The rule generalises: **the equivalence point lies on the side of the stronger partner's conjugate** — basic when a weak acid is titrated with strong base, acid when a weak base is titrated with strong acid, neutral only when both partners are strong.

A **polyprotic acid** gives a curve with one step per proton, provided successive constants differ by more than about $10^{4}$. Phosphoric acid ($\mathrm{p}K_\mathrm{a}$ $2.15$, $7.20$, $12.35$) shows two clean equivalence points at $\mathrm{pH} = \tfrac{1}{2}(\mathrm{p}K_\mathrm{a1} + \mathrm{p}K_\mathrm{a2}) = 4.67$ (the amphiprotic $\mathrm{H_2PO_4^-}$) and $\mathrm{pH} = \tfrac{1}{2}(\mathrm{p}K_\mathrm{a2} + \mathrm{p}K_\mathrm{a3}) = 9.78$ ($\mathrm{HPO_4^{2-}}$); the third proton is far too weakly acidic to titrate in water at all. Carbonate titrated with $\mathrm{HCl}$ offers the same arithmetic in reverse: the first equivalence point is hydrogen carbonate at $\mathrm{pH} = \tfrac{1}{2}(6.35 + 10.33) = 8.34$ (phenolphthalein's range — the classic "phenolphthalein alkalinity" of water analysis) and the second is carbonic acid near $\mathrm{pH}\ 3.9$ (methyl orange).

::: warning The equivalence point is not pH 7, and the end point is not the equivalence point {#warn-equivalence}
"The pH is $7$ at the equivalence point" is true only for strong acid versus strong base, and memorising it as a law is the most durable misconception in this chapter: the equivalence point is *wherever the stoichiometry lands*, $8.72$ for ethanoic acid, $5.28$ for ammonia, $8.34$ for carbonate. And the **end point** is a different object entirely — the volume at which your chosen indicator visibly changes, which matches the equivalence point only if the indicator's transition range sits inside the steep region. Choose phenolphthalein for ammonia versus $\mathrm{HCl}$ and you will report a volume near half of the true one with a straight face and a perfectly reproducible colour change.
:::

## Indicators: equilibrium in two colours

::: definition Acid–base indicator {#def-indicator}
An **acid–base indicator** is a weak organic acid or base whose two forms have different colours: $\mathrm{HIn}$ (the acid colour) and $\mathrm{In^-}$ (the base colour), with $\mathrm{p}K_\mathrm{In}$ in the range of interest. The human eye distinguishes the colours reliably only when one form is about ten times the other, so the **transition range** is $\mathrm{pH} = \mathrm{p}K_\mathrm{In} \pm 1$, roughly $8.3$–$10.0$ for phenolphthalein ($9.4$), $6.0$–$7.6$ for bromothymol blue ($7.1$) and $3.1$–$4.4$ for methyl orange ($3.7$).
:::

| Indicator | $\mathrm{p}K_\mathrm{In}$ | Transition range | Acid colour → base colour |
|---|---|---|---|
| Methyl orange | $3.7$ | $3.1$–$4.4$ | red → yellow |
| Bromothymol blue | $7.1$ | $6.0$–$7.6$ | yellow → blue |
| Phenolphthalein | $9.4$ | $8.3$–$10.0$ | colourless → pink |

::: widget plot
f: 1/(1+10^(pKaIn-x)); 1/(1+10^(x-pKaIn))
x: 0, 14
y: 0, 1.05
sliders: pKaIn=9.4:2:12:0.1
labels: \text{HIn}; \text{In}^-
caption: The fraction of an indicator present as the acid form $\mathrm{HIn}$ and the base form $\mathrm{In^-}$ as a function of pH, for $\mathrm{p}K_\mathrm{In}$ set by the slider (start at phenolphthalein, $9.4$). The colour changes where the curves cross — visibly only between the points where the ratio passes $1:10$ and $10:1$, the $\mathrm{p}K_\mathrm{In} \pm 1$ transition range. An indicator is useful when its crossing sits inside the titration's steep region, and the steep region of a weak-acid titration narrows as the acid weakens: above $\mathrm{p}K_\mathrm{a} \approx 11$ no jump is left steep enough for *any* indicator, and the titration cannot be done in water by eye.
:::

::: example Choosing the indicator {#ex-indicator-choice}
Which of the three indicators above suits (a) ethanoic acid versus $\mathrm{NaOH}$, (b) ammonia versus $\mathrm{HCl}$, (c) $\mathrm{HCl}$ versus $\mathrm{NaOH}$ at $0.1\ \mathrm{mol\,dm^{-3}}$?
::: solution
Match transition range to steep region. (a) The equivalence point is $8.72$ and the jump spans about $7$–$10$: **phenolphthalein** ($8.3$–$10.0$) lands inside it; methyl orange would have changed colour back at the start of the buffer region. (b) The equivalence point is $5.28$ with an acid-range jump: **methyl orange** ($3.1$–$4.4$) — or, better still, methyl red; bromothymol blue and phenolphthalein both change far too early. (c) The jump is $4.30$–$9.70$, so **all three work**; bromothymol blue, whose $\mathrm{p}K_\mathrm{In}$ is nearest $7$, gives the sharpest eye. The general method: sketch or compute the curve, find the steep region, pick the indicator whose $\mathrm{p}K_\mathrm{In}$ lies inside it.
:::
:::

A word on the bench, since this chapter's experiments are the first titrations of the year: dilute hydrochloric acid and sodium hydroxide are irritants and the sodium hydroxide is corrosive to eyes — goggles throughout, and mop spills with water. Concentrated ammonia and the organic indicator solutions are used in a fume cupboard, and all practical work is done under supervision and after a risk assessment, as always.

::: quiz
A weak acid $\mathrm{HA}$ is titrated with $\mathrm{NaOH}$, and the pH is found to be $5.60$ when $18.0\ \mathrm{cm^3}$ of base has been added; the equivalence point is at $36.0\ \mathrm{cm^3}$. What is $\mathrm{p}K_\mathrm{a}$?
- [x] $5.60$ — the half-equivalence point is at $18.0\ \mathrm{cm^3}$, where $\mathrm{pH} = \mathrm{p}K_\mathrm{a}$.
- [ ] $7.00$ — at any point before equivalence the pH approaches neutrality.
- [ ] $8.40$ — double the pH at half-neutralisation.
- [ ] It cannot be determined without the concentrations.
::: solution
$18.0\ \mathrm{cm^3}$ is exactly half of $36.0\ \mathrm{cm^3}$, so half the acid has been neutralised, $[\mathrm{A^-}] = [\mathrm{HA}]$, and the Henderson–Hasselbalch equation gives $\mathrm{pH} = \mathrm{p}K_\mathrm{a} = 5.60$ — no concentrations needed, which is precisely why the half-equivalence trick is the standard way to read a $\mathrm{p}K_\mathrm{a}$ off a curve.
:::
:::

## Where this leads

Buffers and titration curves are the analytical backbone of every later aqueous course. The same ICE-table logic extended to slightly soluble salts is [[general-chemistry-2/solubility-equilibria]]; the thermodynamic meaning of the constants you have been looking up is in [[general-chemistry-2/entropy-free-energy]] and [[thermodynamics/ions-in-solution]]; the acid–base foundations are [[general-chemistry-2/acids-bases]] and the equilibrium machinery [[general-chemistry-2/chemical-equilibrium]]; stoichiometry of the titration itself rests on [[general-chemistry-1/solutions-reactions]]. For the full treatment of curve calculation, gran plots and non-aqueous titration, see [[analytical-chemistry/equilibria-in-analysis]] and [[analytical-chemistry/classical-analysis]].

::: summary
- A buffer is a conjugate pair in comparable amounts; it works by converting added strong acid or base into changes of *ratio*, not of hydronium.
- The Henderson–Hasselbalch equation, $\mathrm{pH} = \mathrm{p}K_\mathrm{a} + \log_{10}([\mathrm{A^-}]/[\mathrm{HA}])$, follows from $K_\mathrm{a}$ and holds while both components are large compared with $[\mathrm{H_3O^+}]$ and $[\mathrm{OH^-}]$; dilution moves the pH not at all until that condition fails.
- Buffer capacity peaks at $\mathrm{pH} = \mathrm{p}K_\mathrm{a}$ at $0.576\,C$ and falls to a third at $\mathrm{p}K_\mathrm{a} \pm 1$: choose buffers by $\mathrm{p}K_\mathrm{a}$, size them by $C$.
- Blood is an open carbonate buffer: $\mathrm{pH} = 6.35 + \log_{10}(24/1.2) = 7.40$, with the lungs holding the acid component constant.
- Titration curves have three regimes — buffer region, equivalence point, excess titrant — and the equivalence point sits on the side of the stronger partner's conjugate: $7.00$, $8.72$, $5.28$ for strong–strong, weak-acid, weak-base titrations.
- At half-equivalence $\mathrm{pH} = \mathrm{p}K_\mathrm{a}$: the cheapest measurement in chemistry.
- Indicators change over $\mathrm{p}K_\mathrm{In} \pm 1$ and must be chosen so that range lies inside the curve's steep region; end point is not equivalence point.
:::

## Exercises

::: exercise pH from the ratio {level=1 check="4.46"}
A buffer is $0.20\ \mathrm{mol\,dm^{-3}}$ in ethanoic acid and $0.10\ \mathrm{mol\,dm^{-3}}$ in sodium ethanoate ($\mathrm{p}K_\mathrm{a} = 4.76$). Find its pH. (Enter the pH.)
::: solution
$\mathrm{pH} = 4.76 + \log_{10}(0.10/0.20) = 4.76 - 0.30 = 4.46$. More acid than base, so the pH sits below the $\mathrm{p}K_\mathrm{a}$ — the sign of the log term is the most common slip.
:::
:::

::: exercise Ratio for a target pH {level=1 check="2.75"}
What ratio $[\mathrm{A^-}]/[\mathrm{HA}]$ does an ethanoate buffer need for $\mathrm{pH}\ 5.20$? ($\mathrm{p}K_\mathrm{a} = 4.76$; enter the ratio.)
::: solution
$[\mathrm{A^-}]/[\mathrm{HA}] = 10^{\,5.20 - 4.76} = 10^{0.44} = 2.75$. Two parts base to one part acid.
:::
:::

::: exercise Half-equivalence reading {level=1 check="3.75"}
Methanoic (formic) acid, $\mathrm{p}K_\mathrm{a} = 3.75$, is titrated with $\mathrm{NaOH}$. What is the pH when half the acid has been neutralised? (Enter the pH.)
::: solution
At half-equivalence $[\mathrm{A^-}] = [\mathrm{HA}]$, so $\mathrm{pH} = \mathrm{p}K_\mathrm{a} = 3.75$, whatever the concentrations.
:::
:::

::: exercise Buffer against added acid {level=2 check="4.67"}
To $1.00\ \mathrm{dm^3}$ of an equimolar ethanoate buffer, $0.100\ \mathrm{mol\,dm^{-3}}$ in each component, $0.010\ \mathrm{mol}$ of $\mathrm{HCl}$ is added with negligible volume change. Find the new pH. ($\mathrm{p}K_\mathrm{a} = 4.76$; enter the pH.)
::: solution
The acid converts $0.010\ \mathrm{mol}$ of $\mathrm{A^-}$ into $\mathrm{HA}$: the amounts become $0.090$ and $0.110\ \mathrm{mol}$. $\mathrm{pH} = 4.76 + \log_{10}(0.090/0.110) = 4.76 - 0.087 = 4.67$. Ten millimoles of strong acid — enough to drop pure water to $\mathrm{pH}\ 2$ — cost $0.09$ units.
:::
:::

::: exercise Equivalence point of a weak acid {level=2 check="8.22"}
$25.0\ \mathrm{cm^3}$ of $0.100\ \mathrm{mol\,dm^{-3}}$ methanoic acid ($\mathrm{p}K_\mathrm{a} = 3.75$) is titrated with $0.100\ \mathrm{mol\,dm^{-3}}$ $\mathrm{NaOH}$. Find the pH at the equivalence point. (Enter the pH.)
::: solution
At equivalence the flask holds $2.50\ \mathrm{mmol}$ of methanoate in $50.0\ \mathrm{cm^3}$: $C = 0.0500\ \mathrm{mol\,dm^{-3}}$, $K_\mathrm{b} = 10^{-14}/10^{-3.75} = 5.6\times10^{-11}$. $[\mathrm{OH^-}] = \sqrt{5.6\times10^{-11}\times0.0500} = 1.7\times10^{-6}$, $\mathrm{pOH} = 5.78$, $\mathrm{pH} = 8.22$. Formate is a weaker base than ethanoate, so its equivalence point is less strongly basic than ethanoate's $8.72$.
:::
:::

::: exercise Equivalence point of a weak base {level=2 check="5.28"}
$25.0\ \mathrm{cm^3}$ of $0.100\ \mathrm{mol\,dm^{-3}}$ ammonia ($K_\mathrm{b} = 1.8\times10^{-5}$) is titrated with $0.100\ \mathrm{mol\,dm^{-3}}$ $\mathrm{HCl}$. Find the pH at the equivalence point. (Enter the pH.)
::: solution
The product is $0.0500\ \mathrm{mol\,dm^{-3}}$ $\mathrm{NH_4^+}$ with $K_\mathrm{a} = K_\mathrm{w}/K_\mathrm{b} = 5.6\times10^{-10}$: $[\mathrm{H_3O^+}] = \sqrt{5.6\times10^{-10}\times0.0500} = 5.3\times10^{-6}$, $\mathrm{pH} = 5.28$. Acidic, as promised — methyl orange territory.
:::
:::

::: exercise Design a buffer {level=3}
You must prepare $250\ \mathrm{cm^3}$ of buffer at $\mathrm{pH}\ 5.00$ from $0.200\ \mathrm{mol\,dm^{-3}}$ ethanoic acid and $0.200\ \mathrm{mol\,dm^{-3}}$ sodium ethanoate ($\mathrm{p}K_\mathrm{a} = 4.76$). What volumes do you mix, what are the final component concentrations, and what happens to the pH if the mixture is then diluted to $1.00\ \mathrm{dm^3}$?
::: solution
The required ratio is $10^{\,5.00-4.76} = 1.74$. With equal stock concentrations the volume ratio equals the ratio, so $V_\mathrm{b} = 250\times1.74/2.74 = 159\ \mathrm{cm^3}$ of ethanoate and $91\ \mathrm{cm^3}$ of acid. The concentrations are $0.200\times159/250 = 0.127\ \mathrm{mol\,dm^{-3}}$ ethanoate and $0.073\ \mathrm{mol\,dm^{-3}}$ acid — comfortably above the $10^{-3}$ dilution limit, so the buffer is sound. Dilution to $1.00\ \mathrm{dm^3}$ leaves the ratio at $1.74$ and the pH at $5.00$ (Henderson–Hasselbalch is dilution-invariant), but it cuts the capacity fourfold: $0.010\ \mathrm{mol\,dm^{-3}}$ of added $\mathrm{HCl}$ moves the original buffer by $0.09$ units and the diluted one by $0.35$. Capacity is a concentration; pH is a ratio — design with both in mind.
:::
:::

::: exercise When Henderson–Hasselbalch fails {level=3 check="5.27"}
An equimolar ethanoate buffer is prepared at $1.0\times10^{-5}\ \mathrm{mol\,dm^{-3}}$ in *each* component. Henderson–Hasselbalch predicts $\mathrm{pH} = 4.76$. Solve the exact system — charge balance $[\mathrm{Na^+}] + [\mathrm{H_3O^+}] = [\mathrm{A^-}] + [\mathrm{OH^-}]$, mass balance $[\mathrm{HA}] + [\mathrm{A^-}] = 2.0\times10^{-5}$, $K_\mathrm{a} = 1.8\times10^{-5}$, $K_\mathrm{w} = 10^{-14}$ — for the true pH. (Enter the pH.)
::: hint
Eliminate $[\mathrm{A^-}] = 2.0\times10^{-5}K_\mathrm{a}/(K_\mathrm{a} + [\mathrm{H_3O^+}])$ and $[\mathrm{OH^-}] = K_\mathrm{w}/[\mathrm{H_3O^+}]$ into the charge balance and solve the resulting equation numerically (the widget in this lesson does exactly this).
:::
::: solution
With $h = [\mathrm{H_3O^+}]$ the charge balance reads $1.0\times10^{-5} + h = \dfrac{2.0\times10^{-5}\times1.8\times10^{-5}}{1.8\times10^{-5} + h} + \dfrac{10^{-14}}{h}$, whose solution is $h = 5.4\times10^{-6}$, $\mathrm{pH} = 5.27$. The prediction of $4.76$ is off by half a unit: at this dilution the buffer components ($10^{-5}\ \mathrm{mol\,dm^{-3}}$) are only twice the hydronium they are supposed to dwarf, water's hydroxide is no longer negligible, and the "buffer" has almost no capacity — it is a salt solution with delusions. This is the dilution limit of the warning, quantified.
:::
:::

::: exercise The carbonate curve {level=3}
$25.0\ \mathrm{cm^3}$ of $0.100\ \mathrm{mol\,dm^{-3}}$ $\mathrm{Na_2CO_3}$ is titrated with $0.100\ \mathrm{mol\,dm^{-3}}$ $\mathrm{HCl}$. Find the pH at the first and second equivalence points (carbonic acid: $\mathrm{p}K_\mathrm{a1} = 6.35$, $\mathrm{p}K_\mathrm{a2} = 10.33$), and say which indicator suits each.
::: hint
At the first equivalence point every carbonate ion has become hydrogen carbonate — an amphiprotic species; show that its pH is $\tfrac{1}{2}(\mathrm{p}K_\mathrm{a1} + \mathrm{p}K_\mathrm{a2})$ independently of concentration. At the second, you have carbonic acid, $\mathrm{H_2CO_3}$, at its analytical concentration.
:::
::: solution
**First equivalence** ($25.0\ \mathrm{cm^3}$ of $\mathrm{HCl}$): the solution is $\mathrm{HCO_3^-}$. For an amphiprotic species the proton condition, $[\mathrm{H_2CO_3}] \approx [\mathrm{CO_3^{2-}}]$ (both small), gives $[\mathrm{H_3O^+}]^2 = K_\mathrm{a1}K_\mathrm{a2}$, so $\mathrm{pH} = \tfrac{1}{2}(6.35 + 10.33) = 8.34$ — phenolphthalein's range, which is exactly why "phenolphthalein alkalinity" measures carbonate to bicarbonate. **Second equivalence** ($50.0\ \mathrm{cm^3}$ added, $75.0\ \mathrm{cm^3}$ total): $2.50\ \mathrm{mmol}$ of $\mathrm{H_2CO_3}$ in $75.0\ \mathrm{cm^3}$, $C = 0.0333\ \mathrm{mol\,dm^{-3}}$, a weak acid: $[\mathrm{H_3O^+}] = \sqrt{10^{-6.35}\times0.0333} = 1.2\times10^{-4}$, $\mathrm{pH} = 3.91$ — methyl orange. Two equivalence points, two indicators, one burette: this is the classical double-indicator carbonate analysis of washing soda, and every number in it came from the two rules of this chapter.
:::
:::
