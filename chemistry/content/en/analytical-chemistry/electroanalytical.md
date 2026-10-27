A pH meter is the most widely used analytical instrument in the world, and most people who use one think of it as a device that "reads pH". It is really a voltmeter of very high input resistance, measuring the potential difference between two electrodes immersed in the sample — a few hundred millivolts at most, changing by about $59\ \mathrm{mV}$ for every factor of ten in the activity of hydrogen ions. The same principle, with a different membrane, measures fluoride in drinking water, potassium and sodium in blood, and nitrate in soil extracts. And if instead of merely *measuring* a potential we *impose* one and measure the current that flows, the electrode becomes a sensor whose signal is proportional to concentration, capable — after a few minutes of preconcentration — of detecting lead at the part-per-billion level. Count the electrons, finally, and Faraday's law gives an absolute method needing no calibration at all.

This chapter covers the three branches of **electroanalytical chemistry**: **potentiometry** (potential at zero current, which measures activities), **voltammetry and amperometry** (current under an imposed potential, which measures concentrations through rates of mass transport), and **coulometry** (total charge, which measures amounts). The thermodynamics of cells — cell notation, standard potentials and the Nernst equation — are those of [[general-chemistry-2/electrochemistry-intro]]; we build on them here, with the statistics of [[analytical-chemistry/statistics-calibration]] for calibration. The fuller theory of electrode kinetics and the double layer belongs to [[electrochemistry/electrode-kinetics]] and [[electrochemistry/voltammetry]].

## Electrodes and cells for analysis

A potentiometric cell consists of two half-cells. The **indicator electrode** responds to the analyte; the **reference electrode** has a potential that is constant and independent of the sample. What we measure is
$$
E_\mathrm{cell} = E_\mathrm{ind} - E_\mathrm{ref} + E_\mathrm{j},
$$
where $E_\mathrm{j}$ is a **liquid-junction potential** at the boundary between the reference electrode's filling solution and the sample.

::: definition Reference electrodes {#def-reference-electrode}
A **reference electrode** is a half-cell of fixed, reproducible potential. The primary reference, the **standard hydrogen electrode** (SHE: platinised platinum, $\mathrm{H_2}$ at $1\ \mathrm{bar}$, $a_\mathrm{H^+} = 1$), defines zero but is inconvenient. In practice one uses:

- the **silver–silver chloride electrode**, $\mathrm{Ag}\,|\,\mathrm{AgCl(s)}\,|\,\mathrm{KCl(aq)}$, with half-reaction $\mathrm{AgCl(s)} + \mathrm{e^-} \rightleftharpoons \mathrm{Ag(s)} + \mathrm{Cl^-(aq)}$ and potential $E = E^\circ - 0.05916\log a_\mathrm{Cl^-}$; with saturated KCl, $E = +0.197\ \mathrm{V}$ against SHE at $25\ ^\circ\mathrm{C}$;
- the **saturated calomel electrode** (SCE), $\mathrm{Hg}\,|\,\mathrm{Hg_2Cl_2(s)}\,|\,\mathrm{KCl(sat)}$, $E = +0.241\ \mathrm{V}$ against SHE at $25\ ^\circ\mathrm{C}$, now largely replaced because of the toxicity of mercury.

The potential is fixed because the chloride activity of the filling solution is fixed. The filling solution contacts the sample through a porous frit or ceramic plug, the liquid junction.
:::

A liquid-junction potential arises because ions diffuse across the junction at different rates: if $\mathrm{H^+}$ diffuses from an acid sample into the KCl faster than $\mathrm{Cl^-}$ does, a charge separation and a potential develop. The junction is made with concentrated KCl because $\mathrm{K^+}$ and $\mathrm{Cl^-}$ have almost equal mobilities, which keeps $E_\mathrm{j}$ to a few millivolts for most samples. But a few millivolts is not negligible: $1\ \mathrm{mV}$ corresponds to $0.017$ pH units, or a $4\ \%$ error in the activity of a singly charged ion.

## Ion-selective electrodes

An **ion-selective electrode** (ISE) has a membrane that allows one ion to cross its surface far more readily than others. The membrane separates the sample from an internal filling solution of fixed composition. Charge separation at each surface, as the selected ion partitions between solution and membrane, produces a **membrane potential** that depends on the ratio of the ion's activities on the two sides.

::: proposition The response of an ion-selective electrode {#prop-ise}
For an electrode selective to ion $i$ of charge $z_i$, in a sample that also contains interfering ions $j$ of charge $z_j$, the cell potential at temperature $T$ is described by the **Nikolsky–Eisenman equation**
$$
E = \text{constant} + \frac{RT\ln 10}{z_iF}\log_{10}\Big(a_i + \sum_j k_{ij}\,a_j^{\,z_i/z_j}\Big),
$$ {#eq-nikolsky}
where $k_{ij}$ is the **potentiometric selectivity coefficient** (small for a good electrode) and the constant includes the reference potentials and the internal solution. In the absence of interference, the response is **Nernstian**: $59.16/z_i\ \mathrm{mV}$ per decade of $a_i$ at $25\ ^\circ\mathrm{C}$. The interference term is semi-empirical.
:::

::: proof
Consider first a membrane permeable only to ion $i$. At equilibrium between the sample (phase s) and the membrane surface (phase m), the electrochemical potential of $i$ is the same in both: $\mu_i^\circ(\mathrm{s}) + RT\ln a_i(\mathrm{s}) + z_iF\phi(\mathrm{s}) = \mu_i^\circ(\mathrm{m}) + RT\ln a_i(\mathrm{m}) + z_iF\phi(\mathrm{m})$. Solving for the interfacial potential difference,
$$
\phi(\mathrm{m}) - \phi(\mathrm{s}) = \frac{\mu_i^\circ(\mathrm{s}) - \mu_i^\circ(\mathrm{m})}{z_iF} + \frac{RT}{z_iF}\ln\frac{a_i(\mathrm{s})}{a_i(\mathrm{m})} .
$$
The same holds at the inner surface with the internal solution. If the membrane's own activity of $i$ is fixed (it is a solid or a saturated phase), the two interfacial potentials combine to $E_\mathrm{mem} = (RT/z_iF)\ln[a_i(\mathrm{s})/a_i(\mathrm{int})]$, and with fixed $a_i(\mathrm{int})$ this is a constant plus $(RT\ln10/z_iF)\log_{10}a_i(\mathrm{s})$. At $298.15\ \mathrm{K}$, $RT\ln10/F = 8.3145\times298.15\times2.3026/96\,485 = 0.05916\ \mathrm{V}$. If an ion $j$ can also exchange at the surface, the surface sites are shared by $i$ and $j$ according to an ion-exchange equilibrium, and the membrane potential depends on a weighted sum of their activities. For ions of equal charge this gives exactly $a_i + k_{ij}a_j$, with $k_{ij}$ the product of the exchange constant and a ratio of mobilities in the membrane (the Eisenman treatment of glass); the exponent $z_i/z_j$ for unequal charges is an empirical generalisation.
:::

The variety of membranes is large. The **glass electrode** for $\mathrm{H^+}$ (next section), and sodium-selective glasses. **Crystalline membranes**: a single crystal of $\mathrm{LaF_3}$ doped with $\mathrm{EuF_2}$ (to create fluoride vacancies through which $\mathrm{F^-}$ moves) for fluoride; pressed $\mathrm{Ag_2S}$ for silver and sulfide, or mixed with $\mathrm{AgCl}$, $\mathrm{AgBr}$ or $\mathrm{CuS}$ for the other halides or copper. **Liquid and polymer membranes**: plasticised PVC containing an ion carrier (**ionophore**), such as the antibiotic valinomycin, whose cavity fits $\mathrm{K^+}$ about ten thousand times better than $\mathrm{Na^+}$; these electrodes measure potassium in blood in every hospital laboratory.

::: widget plot
f: 59.16*log10(10^x + 10^lk*aj/1000)
x: -7, -1
y: -400, 0
sliders: lk=-4:-6:0:0.1; aj=140:1:1000:1
labels: E \ (\mathrm{mV}) - \text{const}
caption: The response [[#eq-nikolsky]] of an electrode selective to a singly charged ion $i$, against $\log_{10}a_i$ ($x$), in the presence of an interferent $j$ of the same charge at activity $a_j$ (slider, in $\mathrm{mmol\,dm^{-3}}$; the default $140$ is the sodium level of blood plasma) with selectivity coefficient $k_{ij} = 10^{\mathrm{lk}}$. At high $a_i$ the line has the Nernstian slope of $59.16\ \mathrm{mV}$ per decade; at low $a_i$ the electrode reads the interferent instead and the line flattens. The bend falls where $a_i \approx k_{ij}a_j$: with $\log k_{ij} = -4$ and $a_j = 0.14\ \mathrm{mol\,dm^{-3}}$, near $a_i = 1.4\times10^{-5}$. Slide $\log k_{ij}$ to $-2$ and the electrode is useless below $10^{-3}$: selectivity decides the lower limit far more often than electrical noise does.
:::

::: example Sodium interference at a potassium electrode {#ex-selectivity}
A valinomycin potassium electrode has $k_{\mathrm{K,Na}} = 1.0\times10^{-4}$ (a representative value). In a blood plasma sample with $a_{\mathrm{K^+}} = 3.0\times10^{-3}$ and $a_{\mathrm{Na^+}} = 0.105$ (activities, i.e. concentrations of about $4$ and $140\ \mathrm{mmol\,dm^{-3}}$ multiplied by $\gamma \approx 0.75$), what relative error does sodium cause if the electrode is calibrated in pure potassium solutions? What if $k_{\mathrm{K,Na}}$ were $1.0\times10^{-2}$?
::: solution
The electrode responds to $a_\mathrm{K} + k\,a_\mathrm{Na} = 3.0\times10^{-3} + 1.0\times10^{-4}\times0.105 = 3.0\times10^{-3} + 1.05\times10^{-5}$. The apparent potassium activity is high by $1.05\times10^{-5}/3.0\times10^{-3} = 0.35\ \%$ — acceptable. With $k = 1.0\times10^{-2}$ the term is $1.05\times10^{-3}$ and the error $35\ \%$ — clinically disastrous, since the normal plasma potassium range is only about $3.5$ to $5\ \mathrm{mmol\,dm^{-3}}$. This is why the discovery of highly selective ionophores, not better voltmeters, made clinical potassium electrodes possible. Clinical analysers also calibrate in solutions with sodium at plasma levels, which removes most of the remaining bias.
:::
:::

## The glass electrode and the measurement of pH

The glass pH electrode is a thin bulb of a special silicate glass containing an internal buffer and an internal $\mathrm{Ag/AgCl}$ wire. The outer few nanometres of the glass are hydrated into a gel layer in which $\mathrm{H^+}$ exchanges with the sodium or lithium ions of the glass; charge is carried through the dry interior by the alkali metal ions. The surface exchange equilibrium makes the membrane potential depend on $a_\mathrm{H^+}$ outside — [[#prop-ise]] with $i = \mathrm{H^+}$. Modern **combination electrodes** build the reference electrode into a concentric outer jacket, with the junction as a small ring or frit near the bulb.

Two departures from ideal behaviour bound the useful range. Above about pH 11–12, where $a_\mathrm{H^+}$ is tiny and $\mathrm{Na^+}$ is often abundant, sodium ions compete for the surface sites and the electrode reads *low* (the **alkaline** or sodium error, the interference term of [[#eq-nikolsky]]). In very strong acid, below about pH 0.5, the electrode reads *high* (the **acid error**), partly because the activity of water in the gel layer falls.

Because single-ion activities cannot be measured thermodynamically, pH is defined operationally, through comparison with standard buffers whose pH values have been assigned by national metrology institutes.

::: definition Operational definition of pH {#def-ph-operational}
If a cell consisting of a glass electrode and a reference electrode gives potential $E_\mathrm{S}$ in a standard buffer of assigned value $\mathrm{pH(S)}$, and $E_\mathrm{X}$ in the sample, then
$$
\mathrm{pH(X)} = \mathrm{pH(S)} - \frac{(E_\mathrm{X} - E_\mathrm{S})F}{RT\ln10},
$$ {#eq-ph-operational}
with the sign convention that $E$ increases as $a_\mathrm{H^+}$ increases. In practice the slope is measured with two buffers that bracket the sample, and expressed as a percentage of the theoretical value $RT\ln10/F$ ($59.16\ \mathrm{mV}$ at $25\ ^\circ\mathrm{C}$). Common primary buffers at $25\ ^\circ\mathrm{C}$ are potassium hydrogen phthalate ($0.05\ \mathrm{mol\,kg^{-1}}$, pH $4.005$), the equimolal phosphate buffer ($0.025\ \mathrm{mol\,kg^{-1}}$ each of $\mathrm{KH_2PO_4}$ and $\mathrm{Na_2HPO_4}$, pH $6.865$) and borax ($0.01\ \mathrm{mol\,kg^{-1}}$, pH $9.180$).
:::

::: example A two-point calibration {#ex-ph-calibration}
At $25\ ^\circ\mathrm{C}$ a pH cell reads $+170.2\ \mathrm{mV}$ in the phthalate buffer (pH $4.005$) and $+3.0\ \mathrm{mV}$ in the phosphate buffer (pH $6.865$). A sample gives $+81.5\ \mathrm{mV}$. Find the slope (in $\mathrm{mV}$ per pH unit and as a percentage of the Nernstian value) and the pH of the sample.
::: solution
Slope: $(170.2 - 3.0)/(6.865 - 4.005) = 167.2/2.860 = 58.46\ \mathrm{mV}$ per pH unit, or $58.46/59.16 = 98.8\ \%$ of the theoretical value — typical of a healthy electrode (most manufacturers recommend replacing an electrode whose slope falls below about $95\ \%$). From [[#eq-ph-operational]] with the phosphate buffer as reference:
$$
\mathrm{pH(X)} = 6.865 - \frac{81.5 - 3.0}{58.46} = 6.865 - 1.343 = 5.52 .
$$
Two decimals are honest: with junction potentials of a millivolt or so and buffers certified to $\pm0.005$–$0.01$, routine pH measurements are rarely better than $\pm0.02$.
:::
:::

::: warning What a pH meter cannot do {#warn-ph}
Three habits produce wrong pH values with perfectly good electrodes. First, calibrating at one temperature and measuring at another: the slope changes ($61.5\ \mathrm{mV}$ at $37\ ^\circ\mathrm{C}$) and so do the pH values of the buffers and the sample itself; automatic temperature compensation corrects only the slope. Second, measuring outside the calibrated range or in a very different matrix: a buffer of ionic strength $0.1$ and a sample of seawater ($I \approx 0.7$) or $80\ \%$ ethanol have different liquid-junction potentials, and the error is not shown by the meter. Third, believing the third decimal: the meter displays $5.523$, but the quantity defined by [[#eq-ph-operational]] is uncertain by about $\pm0.02$ in routine work. And remember that the electrode measures (approximately) activity: the pH of $0.1\ \mathrm{mol\,dm^{-3}}$ HCl is about $1.1$, not $1.00$.
:::

## Calibrating ion-selective electrodes

ISEs are calibrated like any relative method, except that the response is linear in $\log a$. A calibration line of $E$ against $\log c$ in standards of the same ionic strength as the samples converts activity coefficients into a constant: **total ionic strength adjustment buffer** (TISAB) is added to both standards and samples in fluoride measurements; it fixes $I$ at a high value, buffers the pH near 5 (where neither $\mathrm{HF}$ nor $\mathrm{OH^-}$ interference matters), and contains a chelating agent that releases fluoride from aluminium and iron complexes.

Where the matrix cannot be matched, the **known-addition** method (the potentiometric version of standard addition) is used. If the potential of a sample of volume $V_x$ changes by $\Delta E$ when a small volume $V_\mathrm{s}$ of standard of concentration $c_\mathrm{s}$ is added, and the electrode slope is $S$, then for a Nernstian response at constant activity coefficient
$$
\lvert\Delta E\rvert = S\log_{10}\frac{c_xV_x + c_\mathrm{s}V_\mathrm{s}}{c_x(V_x + V_\mathrm{s})},
$$ {#eq-known-addition}
which is solved for $c_x$ ([[#exr-known-addition]]).

## Potentiometric titrations and Gran plots

An indicator or ion-selective electrode can follow a titration in place of a coloured indicator. The end point is the point of maximum slope $\dd E/\dd V$ on the curve, found from the first or second derivative of the data. A more precise approach uses the data *before* the end point, where the measurements are most stable.

::: proposition Gran's method for a weak acid {#prop-gran}
In the titration of a weak acid HA with a strong base, in the buffer region where $[\mathrm{H^+}]$ and $[\mathrm{OH^-}]$ are negligible compared with $[\mathrm{HA}]$ and $[\mathrm{A^-}]$,
$$
V_\mathrm{b}\,10^{-\mathrm{pH}} = \frac{\gamma_{\mathrm{HA}}}{\gamma_{\mathrm{A^-}}}K_\mathrm{a}\,(V_\mathrm{e} - V_\mathrm{b}) .
$$ {#eq-gran}
A plot of $V_\mathrm{b}\,10^{-\mathrm{pH}}$ against $V_\mathrm{b}$ (a **Gran plot**) is a straight line that meets the $V_\mathrm{b}$ axis at the equivalence volume $V_\mathrm{e}$; its slope is $-K_\mathrm{a}\gamma_{\mathrm{HA}}/\gamma_{\mathrm{A^-}}$.
:::

::: proof
After adding $V_\mathrm{b}$ of base of concentration $C_\mathrm{b}$, the amount of $\mathrm{A^-}$ formed is $C_\mathrm{b}V_\mathrm{b}$ and the amount of HA left is $C_\mathrm{b}(V_\mathrm{e} - V_\mathrm{b})$, since $C_\mathrm{b}V_\mathrm{e}$ is the original amount of acid. Both are in the same volume, so their ratio of concentrations is $V_\mathrm{b}/(V_\mathrm{e} - V_\mathrm{b})$. The thermodynamic acid constant is
$$
K_\mathrm{a} = \frac{a_\mathrm{H^+}\gamma_{\mathrm{A^-}}[\mathrm{A^-}]}{\gamma_{\mathrm{HA}}[\mathrm{HA}]} = 10^{-\mathrm{pH}}\frac{\gamma_{\mathrm{A^-}}}{\gamma_{\mathrm{HA}}}\cdot\frac{V_\mathrm{b}}{V_\mathrm{e} - V_\mathrm{b}},
$$
taking $\mathrm{pH} = -\log a_\mathrm{H^+}$. Rearranging gives [[#eq-gran]]. If the ionic strength is roughly constant during the titration, the activity-coefficient ratio is constant and the plot is linear.
:::

::: widget regression
points: 4.0,3.733; 5.0,3.083; 6.0,2.501; 7.0,1.884; 8.0,1.268
degree: 1
x: 0, 11
y: 0, 7
caption: A Gran plot for the titration of $50.00\ \mathrm{cm^3}$ of a weak acid with $0.1000\ \mathrm{mol\,dm^{-3}}$ NaOH ([[#ex-gran]]): $10^4\,V_\mathrm{b}10^{-\mathrm{pH}}$ (vertical, in $\mathrm{cm^3}$) against $V_\mathrm{b}$ in $\mathrm{cm^3}$. The least-squares line through the five buffer-region points, extended to the right, meets the axis near $10.07\ \mathrm{cm^3}$, the equivalence volume. Drag a point and see how much the intercept depends on any one reading — far less than a derivative end point depends on the few points nearest the jump.
:::

::: example Equivalence volume and $K_\mathrm{a}$ from a Gran plot {#ex-gran}
$50.00\ \mathrm{cm^3}$ of a weak acid is titrated with $0.1000\ \mathrm{mol\,dm^{-3}}$ NaOH, and the following pH values are recorded: $V_\mathrm{b} = 4.00$, $5.00$, $6.00$, $7.00$, $8.00\ \mathrm{cm^3}$; pH $= 4.03$, $4.21$, $4.38$, $4.57$, $4.80$. Find $V_\mathrm{e}$ and $\mathrm{p}K_\mathrm{a}$ (take $\gamma_{\mathrm{HA}}/\gamma_{\mathrm{A^-}} = 1$).
::: solution
The Gran function $V_\mathrm{b}10^{-\mathrm{pH}}$ is $3.733$, $3.083$, $2.501$, $1.884$, $1.268$ (all $\times10^{-4}\ \mathrm{cm^3}$). The least-squares line is
$$
V_\mathrm{b}10^{-\mathrm{pH}} = 6.171\times10^{-4} - 6.129\times10^{-5}\,V_\mathrm{b} .
$$
The intercept on the $V_\mathrm{b}$ axis is $6.171\times10^{-4}/6.129\times10^{-5} = 10.07\ \mathrm{cm^3}$, so the acid concentration is $10.07\times0.1000/50.00 = 0.0201\ \mathrm{mol\,dm^{-3}}$. The slope gives $K_\mathrm{a} = 6.13\times10^{-5}$, $\mathrm{p}K_\mathrm{a} = 4.21$.

These data were generated for an acid with $V_\mathrm{e} = 10.00\ \mathrm{cm^3}$ and $\mathrm{p}K_\mathrm{a} = 4.20$, then rounded to two decimals in pH. The $0.7\ \%$ error in $V_\mathrm{e}$ comes mainly from the approximation in [[#prop-gran]]: near pH 4, $[\mathrm{H^+}] \approx 10^{-4}$ is not negligible against $[\mathrm{HA}] \approx 10^{-2}$, which is why Gran plots for weak acids work best in the later part of the buffer region, or with a corrected Gran function.
:::
:::

## Voltammetry and amperometry

In voltammetry we control the potential of a **working electrode** and measure the current through it. A three-electrode cell is used: the potential of the working electrode is controlled against a reference electrode, through which essentially no current passes, while the current flows between the working and an inert **counter (auxiliary) electrode**. A potentiostat does this electronically.

When the working-electrode potential is made negative enough to reduce an analyte O ($\mathrm{O} + n\mathrm{e^-} \rightarrow \mathrm{R}$), O is consumed at the surface and the current is limited by how fast fresh O reaches the electrode. In an unstirred solution with excess **supporting electrolyte** (which carries the current through the solution, so that O does not migrate in the field), O arrives only by **diffusion**, and a depletion layer grows outward from the electrode.

::: proposition The Cottrell equation {#prop-cottrell}
If at time $t = 0$ the potential of a planar electrode of area $A$ is stepped to a value at which the surface concentration of O falls to zero, in an unstirred solution of bulk concentration $c$ and diffusion coefficient $D$, the diffusion-limited current is
$$
i(t) = nFAc\sqrt{\frac{D}{\pi t}} .
$$ {#eq-cottrell}
The current is proportional to concentration, and decays as $t^{-1/2}$ as the depletion layer thickens.
:::

::: proof
Fick's second law in one dimension, $\partial c/\partial t = D\,\partial^2c/\partial x^2$, describes $c(x,t)$ at distance $x$ from the electrode. The conditions are $c(x,0) = c$ (uniform at the start), $c(0,t) = 0$ for $t > 0$ (every molecule reaching the surface reacts), and $c(\infty,t) = c$. The solution of this classic problem is
$$
c(x,t) = c\,\erf\!\left(\frac{x}{2\sqrt{Dt}}\right),
$$
as can be checked by substitution, using $\frac{\dd}{\dd u}\erf u = \frac{2}{\sqrt{\pi}}e^{-u^2}$. The flux of O to the surface is $J = D\,(\partial c/\partial x)_{x=0} = Dc\cdot\frac{2}{\sqrt{\pi}}\cdot\frac{1}{2\sqrt{Dt}} = c\sqrt{D/(\pi t)}$. Each mole arriving carries $nF$ of charge, so $i = nFAJ$, which is [[#eq-cottrell]]. The length $\sqrt{\pi Dt}$ is the effective thickness of the depletion layer: about $56\ \mu\mathrm{m}$ after one second for a typical small molecule with $D = 1\times10^{-5}\ \mathrm{cm^2\,s^{-1}}$.
:::

::: widget plot
f: 96485*0.0707*c*1e-6*sqrt(D*1e-5/(pi*x))*1e6
x: 0.02, 2
y: 0, 100
sliders: c=1:0.1:5:0.1; D=1:0.3:3:0.1
labels: i \ (\mu\mathrm{A})
caption: The Cottrell current [[#eq-cottrell]] after a potential step, in microamperes, against time $t$ in seconds ($x$), for $n = 1$ at a disc of diameter $3\ \mathrm{mm}$ ($A = 0.0707\ \mathrm{cm^2}$). Sliders set the concentration $c$ (in $\mathrm{mmol\,dm^{-3}}$) and $D$ (in units of $10^{-5}\ \mathrm{cm^2\,s^{-1}}$). Doubling $c$ doubles the current at every time — the basis of quantitative voltammetry. Doubling $D$ raises it only by $\sqrt{2}$. The steep early part is where the charging of the double layer, not shown here, also contributes, which is why measurements are taken after some milliseconds.
:::

::: example A chronoamperometric measurement {#ex-cottrell}
A potential step at a $3.0\ \mathrm{mm}$ diameter disc ($A = 0.0707\ \mathrm{cm^2}$) reduces a species with $n = 1$ and $D = 1.0\times10^{-5}\ \mathrm{cm^2\,s^{-1}}$, present at $1.0\ \mathrm{mmol\,dm^{-3}}$. Find the current $0.10\ \mathrm{s}$ and $1.0\ \mathrm{s}$ after the step.
::: solution
In consistent units, $c = 1.0\ \mathrm{mmol\,dm^{-3}} = 1.0\times10^{-6}\ \mathrm{mol\,cm^{-3}}$. At $t = 1.0\ \mathrm{s}$:
$$
i = 1\times96\,485\times0.0707\times1.0\times10^{-6}\times\sqrt{\frac{1.0\times10^{-5}}{\pi\times1.0}} = 6.82\times10^{-3}\times1.784\times10^{-3} = 1.22\times10^{-5}\ \mathrm{A},
$$
$12\ \mu\mathrm{A}$. At $0.10\ \mathrm{s}$ the current is $\sqrt{10}$ times larger, $38\ \mu\mathrm{A}$. The commonest slip is to use $\mathrm{mol\,dm^{-3}}$ with $\mathrm{cm^2}$: that gives a current $1000$ times too large.
:::
:::

In **linear-sweep** and **cyclic voltammetry** the potential is swept at a rate $v$ and the current passes through a peak as the surface concentration falls to zero and the depletion layer then grows. For a fast (reversible) electron transfer at $25\ ^\circ\mathrm{C}$, the peak current is given by the **Randles–Ševčík equation**,
$$
i_\mathrm{p} = 0.4463\,nFAc\sqrt{\frac{nFvD}{RT}} = (2.69\times10^{5})\,n^{3/2}AD^{1/2}v^{1/2}c
$$
(with $A$ in $\mathrm{cm^2}$, $D$ in $\mathrm{cm^2\,s^{-1}}$, $v$ in $\mathrm{V\,s^{-1}}$ and $c$ in $\mathrm{mol\,cm^{-3}}$). The proportionality to $c$ makes the peak height a calibration signal; the proportionality to $\sqrt{v}$ is the test that the current is diffusion-controlled. Cyclic voltammetry is above all a tool for studying mechanisms, and is treated in [[electrochemistry/voltammetry]].

For trace analysis, two improvements matter. **Pulse methods** (differential pulse and square-wave voltammetry) sample the current just before and at the end of each small potential pulse and record the difference, discriminating against the capacitive charging current that decays much faster than the faradaic current; detection limits fall to about $10^{-7}$–$10^{-8}\ \mathrm{mol\,dm^{-3}}$. **Stripping voltammetry** adds preconcentration. In **anodic stripping voltammetry**, metal ions such as $\mathrm{Pb^{2+}}$, $\mathrm{Cd^{2+}}$, $\mathrm{Cu^{2+}}$ and $\mathrm{Zn^{2+}}$ are reduced for several minutes at a negative potential into a thin film (traditionally mercury, now often bismuth or gold) on a stirred electrode; the potential is then scanned positive, and each metal is oxidised back into solution at its characteristic potential, giving a sharp peak. Because minutes of deposition are compressed into a stripping peak lasting seconds, detection limits reach $10^{-10}\ \mathrm{mol\,dm^{-3}}$ — competitive with plasma mass spectrometry for these elements, with equipment that fits in a field case.

**Amperometric sensors** hold the potential constant and read a current proportional to concentration. The Clark oxygen electrode reduces $\mathrm{O_2}$ that diffuses through a gas-permeable membrane; the glucose meters used by people with diabetes use an enzyme (glucose oxidase or dehydrogenase) and a mediator to turn glucose into a current at a screen-printed electrode. Amperometric detectors also follow the effluent of liquid chromatographs ([[analytical-chemistry/chromatography]]).

## Coulometry

Coulometric methods measure the total charge needed to convert the analyte completely, and convert it to an amount with Faraday's law, $n = Q/(zF)$. Since the faraday is a fundamental constant and charge is measured with high accuracy, coulometry is an absolute method like gravimetry.

::: proposition Faraday's law for coulometric analysis {#prop-coulometry}
If an electrode reaction involving $z$ electrons per formula unit of analyte proceeds with $100\ \%$ current efficiency, the amount of analyte converted by a charge $Q$ is
$$
n = \frac{Q}{zF}, \qquad Q = \int_0^t i\,\dd t \quad (= it \text{ at constant current}).
$$ {#eq-coulometry}
:::

::: proof
Each formula unit of analyte exchanges $z$ electrons with the electrode, so the charge transferred is $zeN = zF\,n$ for $n$ moles ($F = eN_\mathrm{A}$). The condition of $100\ \%$ current efficiency means that no charge is consumed by other reactions (such as reduction of water or oxygen), so all of the measured $Q$ corresponds to the analyte. The total charge is the time integral of the current.
:::

There are two modes. In **controlled-potential coulometry**, the working-electrode potential is held where only the analyte reacts, and the current decays exponentially as the analyte is used up; the charge is integrated until the current reaches background. In **constant-current coulometric titration**, a reagent is generated electrically at constant current from a precursor in large excess, and the time to the end point is measured. Electrogenerated titrants include $\mathrm{OH^-}$ and $\mathrm{H^+}$ (from water), $\mathrm{Ag^+}$ (from a silver anode, for halides), $\mathrm{Br_2}$ and $\mathrm{I_2}$ (from bromide and iodide). The most important application is the **Karl Fischer** determination of water, in which iodine generated at an anode reacts with water and sulfur dioxide in a basic alcoholic medium (one $\mathrm{I_2}$ per $\mathrm{H_2O}$), the end point being detected amperometrically when free iodine appears.

::: example Water by coulometric Karl Fischer titration {#ex-karl-fischer}
A $2.000\ \mathrm{g}$ sample of a pharmaceutical powder is added to a Karl Fischer cell. Iodine is generated at a constant $10.0\ \mathrm{mA}$ ($2\,\mathrm{I^-} \rightarrow \mathrm{I_2} + 2\,\mathrm{e^-}$), and the end point is reached after $120.0\ \mathrm{s}$ (corrected for drift). Find the mass of water and its mass fraction in $\mathrm{mg\,kg^{-1}}$.
::: solution
$Q = 0.0100\ \mathrm{A}\times120.0\ \mathrm{s} = 1.200\ \mathrm{C}$. Two electrons per $\mathrm{I_2}$, one $\mathrm{I_2}$ per $\mathrm{H_2O}$, so $z = 2$ per water molecule and
$$
n(\mathrm{H_2O}) = \frac{1.200}{2\times96\,485} = 6.219\times10^{-6}\ \mathrm{mol}, \qquad m = 6.219\times10^{-6}\times18.015 = 1.120\times10^{-4}\ \mathrm{g} = 112.0\ \mu\mathrm{g}.
$$
The mass fraction is $112.0\ \mu\mathrm{g}/2.000\ \mathrm{g} = 56.0\ \mathrm{mg\,kg^{-1}}$ ($0.0056\ \%$). Each microgram of water needs about $10.7\ \mu\mathrm{C}$, a quantity a constant-current source delivers with high precision, which is why coulometric Karl Fischer is the method of choice for water at the part-per-million level; volumetric Karl Fischer, with a standardised iodine reagent from a burette, is used for larger amounts.
:::
:::

::: quiz
A chemist measures a cyclic voltammogram at $0.10\ \mathrm{V\,s^{-1}}$ and finds a peak current of $20\ \mu\mathrm{A}$. At $0.40\ \mathrm{V\,s^{-1}}$, for the same solution and a diffusion-controlled reversible process, the peak current should be about:
- [ ] $20\ \mu\mathrm{A}$, because the concentration has not changed.
- [x] $40\ \mu\mathrm{A}$.
- [ ] $80\ \mu\mathrm{A}$.
- [ ] $10\ \mu\mathrm{A}$, because the depletion layer has less time to form.
::: solution
The Randles–Ševčík equation gives $i_\mathrm{p} \propto v^{1/2}$; a fourfold increase in $v$ doubles the peak current. A faster sweep gives the depletion layer *less* time to grow, so it is thinner, the concentration gradient is steeper and the current is *larger* — the opposite of the last option. A current proportional to $v$ (not $\sqrt{v}$) would point to an adsorbed species rather than a diffusing one.
:::
:::

## Where this leads

Potentiometric sensors and amperometric detectors return as chromatographic detectors in [[analytical-chemistry/chromatography]]. The theory of electrode kinetics behind voltammetric peak shapes — the Butler–Volmer equation, irreversible and quasi-reversible waves, the double layer — is developed in [[electrochemistry/electrode-kinetics]], [[electrochemistry/double-layer]] and [[electrochemistry/voltammetry]]. Biosensors and environmental monitoring of metals by stripping methods appear in [[environmental-chemistry/environmental-monitoring]]. The ionophores behind potassium electrodes are an example of the host–guest chemistry of [[coordination-chemistry/complex-stability]].

::: history
Walther Nernst published the equation relating electrode potential to concentration in 1889. Max Cremer observed the response of thin glass membranes to acidity in 1906, and Fritz Haber and Zygmunt Klemensiewicz turned it into a usable glass electrode in 1909, the same year Søren Sørensen introduced the pH scale at the Carlsberg Laboratory. Arnold Beckman's company sold the first commercial pH meter with a vacuum-tube amplifier in the mid-1930s. Jaroslav Heyrovský invented polarography with the dropping mercury electrode in 1922 and received the 1959 Nobel Prize in Chemistry for it. Frederick Cottrell derived the potential-step current in 1903; Gunnar Gran introduced his linearisation of titration curves in 1950 and 1952. Karl Fischer published his reagent for water in 1935. Martin Frant and James Ross described the lanthanum fluoride electrode in *Science* in 1966, and Leland Clark's membrane-covered oxygen electrode (1956) and his glucose enzyme electrode with Champ Lyons (1962) began the field of biosensors.
:::

::: summary
- Potentiometry measures activities at zero current with an indicator and a reference electrode ($\mathrm{Ag/AgCl}$ $+0.197\ \mathrm{V}$, SCE $+0.241\ \mathrm{V}$ against SHE at 25 °C); liquid-junction potentials of a few millivolts limit accuracy.
- An ISE responds as $E = \text{const} + (59.16/z_i)\log(a_i + \sum k_{ij}a_j^{z_i/z_j})\ \mathrm{mV}$; selectivity coefficients set the lower limit in real samples.
- pH is defined operationally against standard buffers; a two-buffer calibration gives the slope (ideally $59.16\ \mathrm{mV}$ at 25 °C); routine pH is good to about $\pm0.02$.
- ISEs are calibrated in matched ionic strength (TISAB) or by known addition; potentiometric end points are located by maximum slope or, better, by Gran plots.
- At a potential step the diffusion-limited current is $i = nFAc\sqrt{D/(\pi t)}$; cyclic-voltammetry peaks scale with $\sqrt{v}$ and $c$; pulse and stripping methods reach trace levels.
- Coulometry is absolute: $n = Q/(zF)$ at $100\ \%$ current efficiency; Karl Fischer coulometry measures water at the ppm level.
:::

## Exercises

::: exercise Changing reference electrodes {level=1 check="-0.406"}
A potential is measured as $-0.450\ \mathrm{V}$ against a saturated calomel electrode. Express it against SHE and against $\mathrm{Ag/AgCl}$ (saturated KCl), at $25\ ^\circ\mathrm{C}$. (Enter the value against $\mathrm{Ag/AgCl}$ in V.)
::: solution
Against SHE: $-0.450 + 0.241 = -0.209\ \mathrm{V}$. Against $\mathrm{Ag/AgCl}$: $-0.209 - 0.197 = -0.406\ \mathrm{V}$. A number line with SHE at $0$, $\mathrm{Ag/AgCl}$ at $+0.197$ and SCE at $+0.241$ makes such conversions hard to get wrong.
:::
:::

::: exercise The Nernstian slope at body temperature {level=1 check="61.54"}
Calculate the theoretical slope $RT\ln10/F$ of a pH electrode at $37.0\ ^\circ\mathrm{C}$. (Enter it in mV per pH unit.)
::: solution
$T = 310.15\ \mathrm{K}$; $8.3145\times310.15\times2.30259/96\,485 = 0.06154\ \mathrm{V} = 61.54\ \mathrm{mV}$ per pH unit, compared with $59.16$ at $25\ ^\circ\mathrm{C}$. Blood-gas analysers are thermostatted at $37\ ^\circ\mathrm{C}$ for this and for physiological reasons.
:::
:::

::: exercise Coulometric titration of an acid {level=1 check="8.08"}
Hydroxide ions are generated at a cathode ($2\,\mathrm{H_2O} + 2\,\mathrm{e^-} \rightarrow \mathrm{H_2} + 2\,\mathrm{OH^-}$) at a constant $25.0\ \mathrm{mA}$ to titrate $10.00\ \mathrm{cm^3}$ of a dilute HCl solution. The end point is reached after $312\ \mathrm{s}$. Find the HCl concentration. (Enter it in $\mathrm{mmol\,dm^{-3}}$.)
::: solution
$Q = 0.0250\times312 = 7.80\ \mathrm{C}$; one $\mathrm{OH^-}$ per electron, so $n = 7.80/96\,485 = 8.08\times10^{-5}\ \mathrm{mol}$ in $10.00\ \mathrm{cm^3}$: $8.08\ \mathrm{mmol\,dm^{-3}}$. The anode must be isolated from the solution (or a sacrificial silver anode used), or the acid generated there would cancel the base.
:::
:::

::: exercise pH from a calibration {level=2 check="9.73"}
Using the calibration of [[#ex-ph-calibration]] (slope $58.46\ \mathrm{mV}$; $+3.0\ \mathrm{mV}$ at pH $6.865$), what is the pH of a sample reading $-164.5\ \mathrm{mV}$? Why should the electrode be recalibrated with the borax buffer before this result is trusted? (Enter the pH.)
::: solution
$\mathrm{pH} = 6.865 - (-164.5 - 3.0)/58.46 = 6.865 + 2.865 = 9.73$. The sample lies outside the range bracketed by the calibration buffers (4.0–6.9). Electrode slopes are not always exactly constant over the whole range, and errors grow with the distance of extrapolation; a borax (pH 9.18) or carbonate (10.01) buffer should be used to bracket it.
:::
:::

::: exercise Is the electrode good enough? {level=2 check="0.50"}
A sodium ISE is to measure sodium in a sample with $a_{\mathrm{Na^+}} = 2.0\times10^{-3}$ and $a_{\mathrm{K^+}} = 4.0\times10^{-3}$. What is the largest selectivity coefficient $k_{\mathrm{Na,K}}$ that keeps the bias from potassium below $1\ \%$? What potential difference, in mV, does a $1\ \%$ bias in activity represent? (Enter the largest $k$ multiplied by $100$.)
::: solution
The bias is $k\,a_\mathrm{K}/a_\mathrm{Na} \le 0.01$, so $k \le 0.01\times(2.0\times10^{-3})/(4.0\times10^{-3}) = 5.0\times10^{-3}$, i.e. $100k = 0.50$. A $1\ \%$ change in activity corresponds to $59.16\log_{10}1.01 = 0.26\ \mathrm{mV}$ — comparable to the variation of liquid-junction potentials between samples, so a $1\ \%$ bias is at the limit of what direct potentiometry can resolve anyway.
:::
:::

::: exercise Fluoride by known addition {#exr-known-addition level=2 check="0.679"}
To $50.00\ \mathrm{cm^3}$ of a diluted mouthwash in TISAB, $0.500\ \mathrm{cm^3}$ of $0.100\ \mathrm{mol\,dm^{-3}}$ NaF is added, and the potential of a fluoride ISE changes by $23.0\ \mathrm{mV}$. The electrode slope is $59.16\ \mathrm{mV}$ per decade. Find the fluoride concentration in the diluted sample. (Enter it in $\mathrm{mmol\,dm^{-3}}$.)
::: hint
Solve [[#eq-known-addition]] numerically, or rearrange: $10^{\Delta E/S}(V_x + V_\mathrm{s})c_x = c_xV_x + c_\mathrm{s}V_\mathrm{s}$.
:::
::: solution
$10^{23.0/59.16} = 10^{0.3888} = 2.448$. Then $c_x[2.448\times50.50 - 50.00] = 0.100\times0.500$, i.e. $c_x\times73.62 = 0.0500$ and $c_x = 6.79\times10^{-4}\ \mathrm{mol\,dm^{-3}} = 0.679\ \mathrm{mmol\,dm^{-3}}$ ($12.9\ \mathrm{mg\,dm^{-3}}$ of fluoride). The addition roughly two-and-a-half-folded the concentration — large enough to give a well-measured $\Delta E$, small enough not to change the ionic strength appreciably.
:::
:::

::: exercise A diffusion coefficient from chronoamperometry {level=3 check="1.23"}
After a potential step at an electrode of area $0.0314\ \mathrm{cm^2}$ in a $2.00\ \mathrm{mmol\,dm^{-3}}$ solution of a species reduced with $n = 1$, a plot of $i$ against $t^{-1/2}$ is linear with $i\,t^{1/2} = 1.20\times10^{-5}\ \mathrm{A\,s^{1/2}}$. Find $D$. (Enter $D$ in units of $10^{-5}\ \mathrm{cm^2\,s^{-1}}$.)
::: hint
Square the Cottrell equation: $D = \pi\,(it^{1/2})^2/(nFAc)^2$, with $c$ in $\mathrm{mol\,cm^{-3}}$.
:::
::: solution
$nFAc = 96\,485\times0.0314\times2.00\times10^{-6} = 6.059\times10^{-3}\ \mathrm{C\,cm^{-1}}$. Then $it^{1/2}/(nFAc) = 1.20\times10^{-5}/6.059\times10^{-3} = 1.981\times10^{-3}\ \mathrm{cm\,s^{-1/2}}$, and $D = \pi\times(1.981\times10^{-3})^2 = 1.23\times10^{-5}\ \mathrm{cm^2\,s^{-1}}$ — typical of a small ion in water. Fitting $i$ against $t^{-1/2}$ rather than reading one point averages out noise and reveals deviations at short times (double-layer charging) and long times (convection).
:::
:::

::: exercise Analysing a potentiometric titration {level=3 check="10.06"}
Show that for the titration of a weak acid the Gran function becomes $V_\mathrm{b}10^{-\mathrm{pH}} = K_\mathrm{a}(V_\mathrm{e} - V_\mathrm{b})$ when activity coefficients are ignored, and explain why the points nearest the start of the titration are excluded. Using the data of [[#ex-gran]], verify the intercept by computing it from the first and last points only. (Enter $V_\mathrm{e}$ from the two-point line in $\mathrm{cm^3}$.)
::: solution
The derivation is that of [[#prop-gran]] with $\gamma_{\mathrm{HA}} = \gamma_{\mathrm{A^-}} = 1$. Points near the start are excluded because there $[\mathrm{A^-}]$ is small and the acid's own dissociation (the $[\mathrm{H^+}]$ term neglected in setting $[\mathrm{A^-}] \propto V_\mathrm{b}$) is a large fraction of it, so the line curves. From the first and last points, slope $= (1.268 - 3.733)\times10^{-4}/(8.00 - 4.00) = -6.163\times10^{-5}$, and the intercept on the $V_\mathrm{b}$ axis is $4.00 + 3.733\times10^{-4}/6.163\times10^{-5} = 4.00 + 6.06 = 10.06\ \mathrm{cm^3}$, consistent with the least-squares value $10.07$ to within the rounding of the pH readings.
:::
:::
