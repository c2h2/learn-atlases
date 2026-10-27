Put a zinc rod in zinc sulfate solution, a copper rod in copper(II) sulfate solution, join the two solutions with a strip of filter paper soaked in potassium nitrate, and connect a high-resistance voltmeter across the metals. It reads $1.10\ \mathrm{V}$. Nothing visible is happening — the voltmeter draws almost no current, so almost no zinc dissolves and almost no copper is deposited — yet that number is a precise thermodynamic measurement. It tells you the Gibbs energy of the reaction $\mathrm{Zn(s)} + \mathrm{Cu^{2+}(aq)} \rightarrow \mathrm{Zn^{2+}(aq)} + \mathrm{Cu(s)}$ to four significant figures, without a calorimeter and without waiting for equilibrium. Warm the cell by ten degrees and the reading drifts by about a millivolt; that drift is the reaction entropy. Change the concentrations and the reading follows a logarithmic law; that law is the activity of the ions.

The introductory treatment in [[general-chemistry-2/electrochemistry-intro]] gave the working rules: standard potentials, $\Delta_\mathrm{r}G = -nFE$, the Nernst equation with concentrations. This chapter rebuilds them on the thermodynamics of [[thermodynamics/free-energy]] and [[thermodynamics/ions-in-solution]], so that each rule comes with its conditions. We shall see why a cell potential is defined at zero current, what exactly the electrons "feel" in a metal (the electrochemical potential), how temperature coefficients give entropies and enthalpies, how Harned's cell turned the voltmeter into the most accurate instrument for activity coefficients, and how half-cell potentials may — and may not — be combined. Everything is at constant temperature and pressure, with $p^\circ = 1\ \mathrm{bar}$, molality standard states $b^\circ = 1\ \mathrm{mol\,kg^{-1}}$ for solutes, and standard potentials taken from the CRC *Handbook of Chemistry and Physics* electrochemical series (which follows Bard, Parsons and Jordan, *Standard Potentials in Aqueous Solution*).

## Cells, electrodes and the sign convention

A **galvanic cell** converts the Gibbs energy of a redox reaction into electrical work by forcing the electrons to travel from the reductant to the oxidant through an external circuit. Each **electrode** is an electronic conductor (a metal or graphite) in contact with an ionic conductor (the electrolyte); oxidation happens at the **anode** and reduction at the **cathode**. An **electrolytic cell** runs a reaction backwards by applying an external voltage; the same electrode can be anode in one mode and cathode in the other, which is why the names are attached to the *process* (oxidation or reduction), never to the sign of the terminal.

::: definition Cell diagram and cell potential {#def-cell}
A cell is written as a **cell diagram** from left to right, with a single vertical bar $|$ for a phase boundary, a dashed bar $\vdots$ for a liquid junction between miscible solutions, and a double bar $\Vert$ for a junction whose potential is assumed to have been eliminated (a salt bridge). For example,
$$
\mathrm{Zn(s)\,|\,ZnSO_4(aq)\,\Vert\,CuSO_4(aq)\,|\,Cu(s)} .
$$
The **cell reaction** is defined as the reaction that would occur if *reduction took place at the right-hand electrode* and oxidation at the left. The **cell potential** (IUPAC: the *electric potential difference of the cell*, formerly the EMF) is the potential of the right-hand terminal minus that of the left-hand terminal, measured with both terminals of the same metal **in the limit of zero current**:
$$
E_\mathrm{cell} = \phi_\mathrm{R} - \phi_\mathrm{L} = E_\mathrm{R} - E_\mathrm{L},
$$
where $E_\mathrm{R}$ and $E_\mathrm{L}$ are the **electrode potentials** (reduction potentials) of the two electrodes, each measured against the standard hydrogen electrode $\mathrm{Pt\,|\,H_2(g, 1\ bar)\,|\,H^+(aq, a = 1)}$, whose potential is zero by convention at every temperature.
:::

Three points in this definition carry weight. First, the cell reaction is a *convention* tied to the diagram: if $E_\mathrm{cell} > 0$, the reaction as written is spontaneous; if the diagram is written the other way round, the reaction and the sign both reverse, and nothing physical has changed. Second, the zero-current condition is essential. A cell delivering current loses potential to the resistance of its electrolyte and to the kinetics of its electrodes ([[electrochemistry/electrode-kinetics]]); only at zero current is the cell in a state of *constrained equilibrium* — every interface is at equilibrium, and only the overall reaction is held back by the open circuit. Modern instruments approximate this with input impedances above $10^{12}\ \Omega$; historically Poggendorff's compensation method balanced the cell against a known potential so that exactly no current flowed. Third, the terminals must be of the same metal, because the potential difference between two *different* metals includes their contact potential; joining copper leads to both electrodes removes it.

The single electrode potential is not measurable in isolation — any voltmeter needs a second contact with the solution, which is itself an electrode. Tables of potentials are therefore relative to the hydrogen electrode. An estimate of the "absolute" potential of the standard hydrogen electrode on the vacuum scale, $4.44\ \mathrm{V}$, was recommended by IUPAC (Trasatti, 1986); it involves non-thermodynamic assumptions and is never needed for cell calculations.

## The electrochemical potential

Why should a reaction's Gibbs energy appear as a voltage at all? Because charged particles respond to both chemistry and electricity, and in a cell the two are balanced against each other.

::: definition Electrochemical potential {#def-echem-potential}
For a species $i$ of charge number $z_i$ in a phase $\alpha$ at inner (Galvani) electric potential $\phi^\alpha$, the **electrochemical potential** is
$$
\tilde\mu_i^\alpha = \mu_i^\alpha + z_i F\phi^\alpha ,
$$ {#eq-echem}
where $\mu_i^\alpha = \mu_i^{\circ} + RT\ln a_i^\alpha$ is the chemical potential and $F = N_\mathrm{A}e = 96\,485\ \mathrm{C\,mol^{-1}}$ is the Faraday constant. It is the molar Gibbs energy of adding species $i$ to the phase, including the electrical work $z_iF\phi$ of bringing its charge to the potential of the phase. For a neutral species $\tilde\mu_i = \mu_i$. At equilibrium between phases $\alpha$ and $\beta$ that both contain $i$, $\tilde\mu_i^\alpha = \tilde\mu_i^\beta$; for a reaction involving charged species, $\sum_i \nu_i\tilde\mu_i = 0$.
:::

The equilibrium condition is the familiar $\sum\nu_i\mu_i = 0$ of [[thermodynamics/reaction-equilibrium]], extended to charged species. It immediately explains why an interface between a metal and a solution acquires a potential difference: if zinc atoms leave the metal as $\mathrm{Zn^{2+}}$ ions, leaving electrons behind, the metal becomes negative and the solution positive until the electrical term halts further dissolution. Only a minute amount of charge — far too little to analyse chemically — is needed to set up a potential difference of a volt across the nanometre-thick interface; [[electrochemistry/double-layer]] looks at that interface in detail.

::: proposition Cell potential and reaction Gibbs energy {#prop-dg}
For a cell at constant temperature and pressure in which the cell reaction, as written, transfers $\nu$ moles of electrons per mole of reaction ($\nu$ is the charge number of the cell reaction, a pure number), the zero-current cell potential and the reaction Gibbs energy are related by
$$
\Delta_\mathrm{r}G = -\nu F E_\mathrm{cell}, \qquad \Delta_\mathrm{r}G^\circ = -\nu FE^\circ_\mathrm{cell} .
$$ {#eq-dg}
The relation holds for any cell in which every interface is at equilibrium and liquid-junction potentials are absent or negligible.
:::

::: proof
*Route 1: reversible work.* At constant $T$ and $p$, the maximum non-expansion work a system can do equals the decrease in its Gibbs energy, $w_\mathrm{e,max} = \Delta G$ with $w$ the work done *on* the system ([[thermodynamics/free-energy]]). Let the cell reaction advance by $\mathrm{d}\xi$. A charge $\nu F\,\mathrm{d}\xi$ passes from the left terminal to the right through the external circuit — that is, electrons (charge $-\nu F\,\mathrm{d}\xi$) flow from left to right. The work done on the cell in moving a charge $Q$ from potential $\phi_\mathrm{L}$ to $\phi_\mathrm{R}$ outside it is $-Q(\phi_\mathrm{R} - \phi_\mathrm{L})$, so $\mathrm{d}w_\mathrm{e} = -\nu FE_\mathrm{cell}\,\mathrm{d}\xi$. The work is the maximum (reversible) value only when the current is infinitesimal, i.e. at the zero-current potential. Hence $\mathrm{d}G = -\nu FE_\mathrm{cell}\,\mathrm{d}\xi$, and $\Delta_\mathrm{r}G = (\partial G/\partial\xi)_{T,p} = -\nu FE_\mathrm{cell}$.

*Route 2: electrochemical potentials.* Write the cell reaction as the sum of the two electrode reactions, with $\nu$ electrons appearing at the left electrode and consumed at the right. Each electrode is at equilibrium, so for the right-hand electrode $\sum_\mathrm{R}\nu_i\mu_i - \nu\tilde\mu_\mathrm{e}^\mathrm{R} = 0$ (summing over its neutral and ionic species with their electrochemical potentials), and similarly on the left. Adding the two, the ionic electrical terms cancel because both electrodes share the same electrolyte (no junction), leaving $\Delta_\mathrm{r}G = \nu(\tilde\mu_\mathrm{e}^\mathrm{R} - \tilde\mu_\mathrm{e}^\mathrm{L})$. With identical metal terminals the chemical potentials of the electrons are equal, and [[#eq-echem]] with $z = -1$ gives $\tilde\mu_\mathrm{e}^\mathrm{R} - \tilde\mu_\mathrm{e}^\mathrm{L} = -F(\phi_\mathrm{R} - \phi_\mathrm{L}) = -FE_\mathrm{cell}$. Therefore $\Delta_\mathrm{r}G = -\nu FE_\mathrm{cell}$. The standard form follows with all species in their standard states.
:::

Two consequences deserve emphasis. The cell potential is **intensive**: doubling every stoichiometric coefficient doubles both $\Delta_\mathrm{r}G$ and $\nu$, and leaves $E$ unchanged. And a measured potential gives an equilibrium constant directly, since $\Delta_\mathrm{r}G^\circ = -RT\ln K$:
$$
\ln K = \frac{\nu FE^\circ_\mathrm{cell}}{RT}, \qquad \log K = \frac{\nu E^\circ_\mathrm{cell}}{0.05916\ \mathrm{V}}\quad (298.15\ \mathrm{K}) .
$$ {#eq-lnK}
At $25\,^\circ\mathrm{C}$, $RT/F = 25.693\ \mathrm{mV}$ and $(\ln 10)RT/F = 59.16\ \mathrm{mV}$ — every $59\ \mathrm{mV}$ of standard potential per electron is one power of ten in $K$.

::: example The Daniell cell {#ex-daniell}
For $\mathrm{Zn(s)\,|\,Zn^{2+}(aq)\,\Vert\,Cu^{2+}(aq)\,|\,Cu(s)}$, with $E^\circ(\mathrm{Cu^{2+}/Cu}) = +0.340\ \mathrm{V}$ and $E^\circ(\mathrm{Zn^{2+}/Zn}) = -0.762\ \mathrm{V}$ (CRC), find the cell reaction, $E^\circ_\mathrm{cell}$, $\Delta_\mathrm{r}G^\circ$ and $K$ at $25\,^\circ\mathrm{C}$.
::: solution
Reduction at the right: $\mathrm{Cu^{2+} + 2e^- \rightarrow Cu}$; oxidation at the left: $\mathrm{Zn \rightarrow Zn^{2+} + 2e^-}$. The cell reaction is $\mathrm{Zn(s) + Cu^{2+}(aq) \rightarrow Zn^{2+}(aq) + Cu(s)}$ with $\nu = 2$.
$$
E^\circ_\mathrm{cell} = E^\circ_\mathrm{R} - E^\circ_\mathrm{L} = 0.340 - (-0.762) = 1.102\ \mathrm{V}.
$$
$$
\Delta_\mathrm{r}G^\circ = -\nu FE^\circ = -2 \times 96\,485\ \mathrm{C\,mol^{-1}} \times 1.102\ \mathrm{V} = -2.127\times10^{5}\ \mathrm{J\,mol^{-1}} = -212.7\ \mathrm{kJ\,mol^{-1}}
$$
(using $1\ \mathrm{C\,V} = 1\ \mathrm{J}$). From [[#eq-lnK]], $\log K = 2 \times 1.102/0.05916 = 37.26$, so $K = 1.8\times10^{37}$. The reaction goes to completion in any practical sense: at equilibrium the ratio $a(\mathrm{Zn^{2+}})/a(\mathrm{Cu^{2+}})$ is $10^{37}$. Note that $K$ is so large that it could never be measured by analysing an equilibrium mixture — there would be no $\mathrm{Cu^{2+}}$ left to detect. The cell measures it at zero current, far from equilibrium, which is the great power of the method.
:::
:::

## The Nernst equation

::: proposition The Nernst equation {#prop-nernst}
For a cell reaction $\sum_i\nu_i\mathrm{X}_i = 0$ with charge number $\nu$, at constant $T$ and $p$ and in the absence of junction potentials,
$$
E_\mathrm{cell} = E^\circ_\mathrm{cell} - \frac{RT}{\nu F}\ln Q, \qquad Q = \prod_i a_i^{\nu_i},
$$ {#eq-nernst}
where the $a_i$ are activities (for solutes $a_i = \gamma_i b_i/b^\circ$, for gases $a_i = f_i/p^\circ \approx p_i/p^\circ$, and $a = 1$ for pure solids and liquids). For a single electrode with reduction half-reaction $\mathrm{Ox} + \nu\mathrm{e^-} \rightarrow \mathrm{Red}$ (including any $\mathrm{H^+}$ or $\mathrm{H_2O}$), the same equation gives the electrode potential with $Q$ the activity quotient of the half-reaction, electrons omitted.
:::

::: proof
From [[thermodynamics/reaction-equilibrium]], $\Delta_\mathrm{r}G = \Delta_\mathrm{r}G^\circ + RT\ln Q$, which follows from $\Delta_\mathrm{r}G = \sum\nu_i\mu_i$ and $\mu_i = \mu_i^\circ + RT\ln a_i$. Divide by $-\nu F$ and use [[#eq-dg]] for both $\Delta_\mathrm{r}G$ and $\Delta_\mathrm{r}G^\circ$:
$$
E_\mathrm{cell} = -\frac{\Delta_\mathrm{r}G}{\nu F} = -\frac{\Delta_\mathrm{r}G^\circ}{\nu F} - \frac{RT}{\nu F}\ln Q = E^\circ_\mathrm{cell} - \frac{RT}{\nu F}\ln Q .
$$
For a single electrode, consider the cell with the standard hydrogen electrode on the left. Its cell reaction is the half-reaction combined with $\tfrac{\nu}{2}\mathrm{H_2} \rightarrow \nu\mathrm{H^+}$, whose species all have unit activity, so the hydrogen terms contribute nothing to $Q$, and $E_\mathrm{cell}$ is the electrode potential by [[#def-cell]].
:::

At equilibrium $E_\mathrm{cell} = 0$ and $Q = K$, recovering [[#eq-lnK]]. A flat battery is a cell at equilibrium: its reaction still has a large $K$, but the activities have run to the point where $Q = K$.

::: widget plot
f: E0 - 0.0591563*(T/298.15)/n*x
x: -6, 6
y: -0.4, 1.6
sliders: E0=1.102:0:1.5:0.001; n=2:1:4:1; T=298.15:273:373:1
labels: E_\mathrm{cell}\ (\mathrm{V})
hlines: 0
caption: The Nernst equation [[#eq-nernst]] as cell potential against $\log_{10}Q$ ($x$). The default is the Daniell cell ($E^\circ = 1.102\ \mathrm{V}$, $\nu = 2$): the line falls by $59.16/\nu\ \mathrm{mV}$ per decade of $Q$ at $25\,^\circ\mathrm{C}$, so six decades of concentration change the voltage by only $0.18\ \mathrm{V}$. The line crosses zero at $\log Q = \log K = 37$, far off the right of the plot. Increase $\nu$ to see the slope fall; raise $T$ to see it steepen in proportion to $T$ (the temperature dependence of $E^\circ$ itself is not included here — it is the subject of the next section).
:::

The logarithm explains the robustness of batteries: a cell's voltage hardly moves while its reactants are consumed, and falls steeply only near exhaustion. It also explains the *sensitivity* of potentiometry. Each decade of activity of a singly charged ion moves an electrode by $59\ \mathrm{mV}$, and potentials can be read to $0.1\ \mathrm{mV}$, so ion-selective electrodes measure $\log a$ over many decades ([[analytical-chemistry/electroanalytical]]).

::: example A cell with a gas and an acid {#ex-harned-cell}
Find the potential at $25\,^\circ\mathrm{C}$ of
$$
\mathrm{Pt\,|\,H_2(g, 1.00\ bar)\,|\,HCl(aq, 0.0100\ mol\,kg^{-1})\,|\,AgCl(s)\,|\,Ag(s)},
$$
given $E^\circ(\mathrm{AgCl/Ag,Cl^-}) = +0.22233\ \mathrm{V}$ and the measured mean activity coefficient $\gamma_\pm(\mathrm{HCl}) = 0.904$ at this molality (Harned and Owen).
::: solution
Right: $\mathrm{AgCl(s) + e^- \rightarrow Ag(s) + Cl^-(aq)}$. Left (oxidation): $\tfrac{1}{2}\mathrm{H_2(g) \rightarrow H^+(aq) + e^-}$. The cell reaction, with $\nu = 1$, is
$$
\tfrac{1}{2}\mathrm{H_2(g)} + \mathrm{AgCl(s)} \rightarrow \mathrm{Ag(s)} + \mathrm{H^+(aq)} + \mathrm{Cl^-(aq)} .
$$
$E^\circ_\mathrm{cell} = 0.22233 - 0 = 0.22233\ \mathrm{V}$. The quotient is $Q = a_{\mathrm{H^+}}a_{\mathrm{Cl^-}}/(p_{\mathrm{H_2}}/p^\circ)^{1/2} = a_\pm^2 = (\gamma_\pm b/b^\circ)^2$, because the solids have unit activity and the hydrogen is at $1\ \mathrm{bar}$. Then
$$
E = E^\circ - \frac{RT}{F}\ln(\gamma_\pm b/b^\circ)^2 = 0.22233\ \mathrm{V} - 2(0.025693\ \mathrm{V})\ln(0.904\times0.0100) = 0.22233 + 0.24181 = 0.4641\ \mathrm{V}.
$$
Notice that the individual ionic activities never appear — only their product, the measurable $a_\pm^2$ of [[thermodynamics/ions-in-solution]]. Had we ignored activity coefficients ($\gamma_\pm = 1$) we should have predicted $0.4590\ \mathrm{V}$, $5\ \mathrm{mV}$ too low; a modern voltmeter reads to $0.01\ \mathrm{mV}$, so the cell is a sensitive probe of $\gamma_\pm$.
:::
:::

### Measuring standard potentials and activity coefficients

The previous example can be run backwards. Measure $E$ at several molalities and the Nernst equation, rearranged, reads
$$
E + \frac{2RT}{F}\ln\frac{b}{b^\circ} = E^\circ - \frac{2RT}{F}\ln\gamma_\pm .
$$
The left side is known from experiment; the right contains two unknowns. The Debye–Hückel limiting law ([[thermodynamics/ions-in-solution]]) gives $\ln\gamma_\pm = -(\ln 10)A\sqrt{b/b^\circ}$ for a $1{:}1$ electrolyte at low molality, so the left side, plotted against $\sqrt{b}$, should approach a straight line of slope $2(\ln 10)ART/F = 0.0602\ \mathrm{V}$ whose intercept at $b = 0$ is $E^\circ$. Once $E^\circ$ is fixed, every measured $E$ gives $\gamma_\pm$ at its molality. This is how Harned and Ehlers established $E^\circ(\mathrm{AgCl/Ag})$ in 1932–1933, and how much of the activity-coefficient data in the tables of Harned and Owen and of Robinson and Stokes were obtained.

::: example Extrapolating to $E^\circ$ {#ex-extrapolation}
Measurements on the cell of [[#ex-harned-cell]] at $25\,^\circ\mathrm{C}$ give the following values of $E' = E + (2RT/F)\ln(b/b^\circ)$:

| $b/(\mathrm{mol\,kg^{-1}})$ | $0.001$ | $0.005$ | $0.010$ | $0.020$ |
|---|---|---|---|---|
| $\sqrt{b/b^\circ}$ | $0.0316$ | $0.0707$ | $0.1000$ | $0.1414$ |
| $E'/\mathrm{mV}$ | $224.16$ | $226.17$ | $227.52$ | $229.19$ |

Find $E^\circ$, and $\gamma_\pm$ at $b = 0.020\ \mathrm{mol\,kg^{-1}}$.
::: solution
A least-squares line through the four points (the figure below does the fit) has slope $45.8\ \mathrm{mV}$ per unit $\sqrt{b}$ and intercept $222.8\ \mathrm{mV}$. The slope is lower than the limiting-law value of $60.2\ \mathrm{mV}$ because $\gamma_\pm$ already falls more slowly than the limiting law above $b \approx 0.005$; using only the two lowest points, where the limiting law is best, gives slope $51.4\ \mathrm{mV}$ and intercept $222.5\ \mathrm{mV}$. The accepted value, from careful extrapolations with the extended Debye–Hückel equation, is $E^\circ = 222.33\ \mathrm{mV}$, and the data here were built from it: the straight-line extrapolation in $\sqrt{b}$ overshoots by a few tenths of a millivolt, which is why careful work uses the extended law.

With $E^\circ = 0.22233\ \mathrm{V}$, at $b = 0.020\ \mathrm{mol\,kg^{-1}}$:
$$
\ln\gamma_\pm = \frac{E^\circ - E'}{2RT/F} = \frac{(0.22233 - 0.22919)\ \mathrm{V}}{0.051386\ \mathrm{V}} = -0.1335, \qquad \gamma_\pm = 0.875 .
$$
The limiting law alone would give $\log\gamma_\pm = -0.509\sqrt{0.020} = -0.0720$, $\gamma_\pm = 0.847$; the measurement is more accurate than the theory at this molality.
:::
:::

::: widget regression
points: 0.0316,224.16; 0.0707,226.17; 0.1,227.52; 0.1414,229.19
degree: 1
x: 0, 0.16
y: 221, 231
caption: The extrapolation of [[#ex-extrapolation]]: $E' = E + (2RT/F)\ln b$ in millivolts against $\sqrt{b}$ for the cell $\mathrm{Pt\,|\,H_2\,|\,HCl(aq)\,|\,AgCl\,|\,Ag}$. The intercept of the least-squares line estimates $E^\circ(\mathrm{AgCl/Ag})$. Drag the highest-molality point away and watch the intercept move towards $222.3\ \mathrm{mV}$: points at low molality, where the limiting law holds, carry the information, but they are also the hardest to measure precisely — the classic tension of every extrapolation to infinite dilution.
:::

## Temperature coefficients: entropy and enthalpy from a voltmeter

Because $\Delta_\mathrm{r}G$ is known as a function of temperature, so are its derivatives.

::: proposition Thermodynamic functions from the cell potential {#prop-temp}
At constant pressure, for a cell reaction with charge number $\nu$,
$$
\Delta_\mathrm{r}S = \nu F\left(\frac{\partial E_\mathrm{cell}}{\partial T}\right)_p, \qquad
\Delta_\mathrm{r}H = -\nu F\left[E_\mathrm{cell} - T\left(\frac{\partial E_\mathrm{cell}}{\partial T}\right)_p\right], \qquad
\Delta_\mathrm{r}C_p = \nu FT\left(\frac{\partial^2 E_\mathrm{cell}}{\partial T^2}\right)_p .
$$ {#eq-temp}
The same relations hold for the standard quantities with $E^\circ$.
:::

::: proof
For the reaction, $(\partial\Delta_\mathrm{r}G/\partial T)_p = -\Delta_\mathrm{r}S$, the reaction form of $(\partial G/\partial T)_p = -S$ ([[thermodynamics/free-energy]]). Substituting $\Delta_\mathrm{r}G = -\nu FE$, with $\nu$ and $F$ independent of temperature, gives $-\nu F(\partial E/\partial T)_p = -\Delta_\mathrm{r}S$, the first result. Then $\Delta_\mathrm{r}H = \Delta_\mathrm{r}G + T\Delta_\mathrm{r}S = -\nu FE + \nu FT(\partial E/\partial T)_p$, the second; it is the Gibbs–Helmholtz equation in electrochemical form. Finally $\Delta_\mathrm{r}C_p = (\partial\Delta_\mathrm{r}H/\partial T)_p$; differentiating the second result, the terms $-\nu F\,\partial E/\partial T$ and $+\nu F\,\partial E/\partial T$ cancel and $\nu FT\,\partial^2E/\partial T^2$ remains. (Equivalently, $\Delta_\mathrm{r}C_p = T(\partial\Delta_\mathrm{r}S/\partial T)_p$.)
:::

The first equation is remarkable: an entropy, usually obtained from heat capacities integrated from near absolute zero, is read from the slope of a voltage against temperature. The heat exchanged with the surroundings by a cell working reversibly is $q_\mathrm{rev} = T\Delta_\mathrm{r}S$ per mole of reaction; a cell whose potential *rises* with temperature absorbs heat while it works reversibly and turns more than its reaction enthalpy into electrical work, the balance coming from the surroundings. Helmholtz made exactly this point in 1882, correcting the earlier belief (of Thomson and others) that the electrical work of a cell equals its heat of reaction.

::: example Thermodynamics of the silver–silver chloride cell {#ex-temp}
For the cell of [[#ex-harned-cell]], $E^\circ = 0.22233\ \mathrm{V}$ and $(\partial E^\circ/\partial T)_p = -6.45\times10^{-4}\ \mathrm{V\,K^{-1}}$ at $298.15\ \mathrm{K}$ (from the measurements of Bates and Bower, 1954). Find $\Delta_\mathrm{r}G^\circ$, $\Delta_\mathrm{r}S^\circ$ and $\Delta_\mathrm{r}H^\circ$ for $\tfrac{1}{2}\mathrm{H_2(g) + AgCl(s) \rightarrow Ag(s) + H^+(aq) + Cl^-(aq)}$, and compare with calorimetric tables.
::: solution
With $\nu = 1$:
$$
\begin{aligned}
\Delta_\mathrm{r}G^\circ &= -FE^\circ = -96\,485 \times 0.22233\ \mathrm{J\,mol^{-1}} = -21.45\ \mathrm{kJ\,mol^{-1}},\\
\Delta_\mathrm{r}S^\circ &= F\,\frac{\partial E^\circ}{\partial T} = 96\,485 \times (-6.45\times10^{-4})\ \mathrm{J\,K^{-1}\,mol^{-1}} = -62.2\ \mathrm{J\,K^{-1}\,mol^{-1}},\\
\Delta_\mathrm{r}H^\circ &= \Delta_\mathrm{r}G^\circ + T\Delta_\mathrm{r}S^\circ = -21.45 + 298.15\times(-0.0622)\ \mathrm{kJ\,mol^{-1}} = -40.0\ \mathrm{kJ\,mol^{-1}}.
\end{aligned}
$$
From the NBS tables of standard entropies ($S^\circ/\mathrm{J\,K^{-1}\,mol^{-1}}$: $\mathrm{Ag}$ 42.55, $\mathrm{Cl^-(aq)}$ 56.5, $\mathrm{AgCl}$ 96.2, $\mathrm{H_2}$ 130.68, $\mathrm{H^+(aq)}$ 0 by convention), $\Delta_\mathrm{r}S^\circ = 42.55 + 56.5 - 96.2 - \tfrac{1}{2}(130.68) = -62.5\ \mathrm{J\,K^{-1}\,mol^{-1}}$. From enthalpies of formation ($\mathrm{Cl^-(aq)}$ $-167.16$, $\mathrm{AgCl}$ $-127.07\ \mathrm{kJ\,mol^{-1}}$), $\Delta_\mathrm{r}H^\circ = -40.09\ \mathrm{kJ\,mol^{-1}}$. The electrical and calorimetric routes agree within their uncertainties. The negative entropy reflects half a mole of gas consumed and two ions created that order the water around them. Because $T\Delta_\mathrm{r}S^\circ < 0$, the reversible cell releases $18.5\ \mathrm{kJ}$ of heat per mole even while it does $21.45\ \mathrm{kJ}$ of electrical work.
:::
:::

::: quiz
A cell has $E_\mathrm{cell} = 1.20\ \mathrm{V}$ and $(\partial E/\partial T)_p = +0.20\ \mathrm{mV\,K^{-1}}$. Running reversibly at $25\,^\circ\mathrm{C}$, it
- [ ] releases heat, because every spontaneous reaction is exothermic
- [x] absorbs heat from the surroundings, and its electrical work exceeds $-\Delta_\mathrm{r}H$
- [ ] exchanges no heat, because reversible processes are adiabatic
- [ ] has $\Delta_\mathrm{r}S < 0$, because $E > 0$
::: solution
$q_\mathrm{rev} = T\Delta_\mathrm{r}S = \nu FT(\partial E/\partial T)_p > 0$, so heat flows *in*. The electrical work done by the cell is $-\Delta_\mathrm{r}G = -\Delta_\mathrm{r}H + T\Delta_\mathrm{r}S$, larger than $-\Delta_\mathrm{r}H$ by the heat absorbed. The sign of $E$ fixes the sign of $\Delta_\mathrm{r}G$, not of $\Delta_\mathrm{r}S$.
:::
:::

::: warning The cell potential is not a measure of the enthalpy {#warn-enthalpy}
It is tempting to read $\nu FE$ as "the energy released by the reaction". It is the *Gibbs* energy, and differs from $-\Delta_\mathrm{r}H$ by $T\Delta_\mathrm{r}S$, which can be large: for the hydrogen–oxygen fuel cell producing liquid water, $-\Delta_\mathrm{r}G^\circ = 237.1\ \mathrm{kJ\,mol^{-1}}$ but $-\Delta_\mathrm{r}H^\circ = 285.8\ \mathrm{kJ\,mol^{-1}}$, and no fuel cell, however perfect, converts more than $83\,\%$ of the enthalpy into work at $25\,^\circ\mathrm{C}$ ([[electrochemistry/fuel-cells-electrolysis]]). A related slip is to compute $\Delta_\mathrm{r}S$ from $\Delta_\mathrm{r}H/T$; the entropy needs the temperature *coefficient* of $E$, not $E$ itself. The reaction entropy is zero only when the cell potential is independent of temperature.
:::

## Combining electrode potentials

Potentials of half-reactions are tabulated, but you will often need one that is not in the table — for a different oxidation state, a different reference, or an insoluble salt.

::: proposition Combining half-reaction potentials {#prop-combine}
If a half-reaction (3) with $\nu_3$ electrons is the sum of half-reactions (1) and (2) with $\nu_1$ and $\nu_2$ electrons, then $\nu_3 = \nu_1 + \nu_2$ and
$$
E^\circ_3 = \frac{\nu_1E^\circ_1 + \nu_2E^\circ_2}{\nu_1 + \nu_2} .
$$ {#eq-combine}
If instead the electrons cancel, so that (1) minus (2) is a complete reaction with $\nu$ electrons transferred, its standard potential is $E^\circ_1 - E^\circ_2$, and potentials may simply be subtracted.
:::

::: proof
Gibbs energies are extensive state functions, so they add with the reactions: $\Delta_\mathrm{r}G^\circ_3 = \Delta_\mathrm{r}G^\circ_1 + \Delta_\mathrm{r}G^\circ_2$. Each half-reaction potential is defined through its cell against the hydrogen electrode, so $\Delta_\mathrm{r}G^\circ_k = -\nu_kFE^\circ_k$ (the hydrogen half-reactions also add). Then $-\nu_3FE^\circ_3 = -\nu_1FE^\circ_1 - \nu_2FE^\circ_2$, giving [[#eq-combine]]. When the electrons cancel, both half-reactions carry the same $\nu$ and $\Delta_\mathrm{r}G^\circ = -\nu F(E^\circ_1 - E^\circ_2)$.
:::

::: example Iron(III) to iron {#ex-combine}
Given $E^\circ(\mathrm{Fe^{3+}/Fe^{2+}}) = +0.771\ \mathrm{V}$ and $E^\circ(\mathrm{Fe^{2+}/Fe}) = -0.447\ \mathrm{V}$ (CRC), find $E^\circ(\mathrm{Fe^{3+}/Fe})$.
::: solution
$\mathrm{Fe^{3+} + e^- \rightarrow Fe^{2+}}$ ($\nu_1 = 1$) plus $\mathrm{Fe^{2+} + 2e^- \rightarrow Fe}$ ($\nu_2 = 2$) gives $\mathrm{Fe^{3+} + 3e^- \rightarrow Fe}$ ($\nu_3 = 3$):
$$
E^\circ_3 = \frac{1(0.771) + 2(-0.447)}{3}\ \mathrm{V} = \frac{-0.123}{3}\ \mathrm{V} = -0.041\ \mathrm{V} .
$$
(The CRC table lists $-0.037\ \mathrm{V}$; the difference reflects the uncertainty in the iron data.) Adding the two potentials, $0.771 - 0.447 = 0.324\ \mathrm{V}$, is wrong: potentials are intensive, Gibbs energies are not, and it is the $\nu E^\circ$ products that add. Diagrams that plot $\nu E^\circ$ against oxidation state (Frost diagrams) exploit exactly this additivity: the slope of the line joining two states is the potential of the couple.
:::
:::

The same reasoning converts a potential into a solubility product. The couple $\mathrm{AgCl/Ag}$ is $\mathrm{Ag^+/Ag}$ with the silver ion held at the tiny activity fixed by $K_\mathrm{sp}$: subtracting $\mathrm{AgCl + e^- \rightarrow Ag + Cl^-}$ ($E^\circ = 0.2223\ \mathrm{V}$) from $\mathrm{Ag^+ + e^- \rightarrow Ag}$ ($0.7996\ \mathrm{V}$) leaves $\mathrm{AgCl \rightarrow Ag^+ + Cl^-}$, a reaction with no net electron transfer whose $\Delta_\mathrm{r}G^\circ = -F(0.2223 - 0.7996)$ is positive. Thus $\ln K_\mathrm{sp} = (0.2223 - 0.7996)\ \mathrm{V}/(RT/F) = -22.47$ and $K_\mathrm{sp} = 1.7\times10^{-10}$, in agreement with solubility measurements ($1.8\times10^{-10}$). Electrodes of the second kind such as $\mathrm{Ag|AgCl|Cl^-}$ and the calomel electrode $\mathrm{Hg|Hg_2Cl_2|Cl^-}$ are stable references precisely because a sparingly soluble salt fixes the metal-ion activity.

::: definition Formal potential {#def-formal}
The **formal potential** $E^{\circ\prime}$ of a couple is the electrode potential measured when the *analytical* (total) concentrations of the oxidised and reduced forms are equal, in a specified medium (e.g. $1\ \mathrm{mol\,dm^{-3}}$ $\mathrm{HClO_4}$, or a buffer of given pH). It absorbs activity coefficients, complexation and acid–base side equilibria into a single number, so that in that medium
$$
E = E^{\circ\prime} - \frac{RT}{\nu F}\ln\frac{c_\mathrm{Red}}{c_\mathrm{Ox}} .
$$
For $\mathrm{Fe^{3+}/Fe^{2+}}$, $E^{\circ\prime} \approx 0.73\ \mathrm{V}$ in $1\ \mathrm{mol\,dm^{-3}}$ $\mathrm{HClO_4}$, lower than $E^\circ = 0.771\ \mathrm{V}$, and lower still in chloride, sulfate and phosphate media, where iron(III) is complexed more strongly than iron(II). In biochemistry the formal potential at pH 7 is written $E^{\circ\prime}$ or $E_\mathrm{m,7}$.
:::

The formal potential is what a voltammogram measures ([[electrochemistry/voltammetry]]), and the number you should use whenever you work in a fixed background electrolyte; the standard potential is the number you need for thermodynamic tables.

## Potential and pH: the stability window of water

Many half-reactions involve $\mathrm{H^+}$ or $\mathrm{OH^-}$, so their potentials depend on pH. For $\mathrm{Ox} + m\mathrm{H^+} + \nu\mathrm{e^-} \rightarrow \mathrm{Red}$, the Nernst equation at $25\,^\circ\mathrm{C}$ gives
$$
E = E^\circ - \frac{0.05916\ \mathrm{V}}{\nu}\log\frac{a_\mathrm{Red}}{a_\mathrm{Ox}} - \frac{m}{\nu}(0.05916\ \mathrm{V})\,\mathrm{pH} ,
$$
a line of slope $-59.16\,m/\nu\ \mathrm{mV}$ per pH unit. Water itself has two such couples:
$$
\mathrm{O_2(g)} + 4\mathrm{H^+} + 4\mathrm{e^-} \rightarrow 2\mathrm{H_2O(l)}, \quad E^\circ = 1.229\ \mathrm{V}; \qquad 2\mathrm{H^+} + 2\mathrm{e^-} \rightarrow \mathrm{H_2(g)}, \quad E^\circ = 0 .
$$
With the gases at $1\ \mathrm{bar}$ both lines have slope $-59.16\ \mathrm{mV}$ per pH and are $1.229\ \mathrm{V}$ apart at every pH. Above the upper line, water is thermodynamically oxidised to oxygen; below the lower line it is reduced to hydrogen. Between them lies the **stability window** of water, the region in which any aqueous chemistry is thermodynamically possible without decomposing the solvent.

::: widget plot
f: 1.229 - 0.0591563*x; -0.0591563*x; E1 + 0*x
x: 0, 14
y: -1, 1.5
sliders: E1=0.771:-1:1.5:0.001
labels: \mathrm{O_2/H_2O}; \mathrm{H^+/H_2}; \text{a pH-independent couple}
caption: The stability window of water at $25\,^\circ\mathrm{C}$ with $p(\mathrm{O_2}) = p(\mathrm{H_2}) = 1\ \mathrm{bar}$: electrode potential (vs SHE) against pH. A couple that involves no protons is a horizontal line; set the slider to its standard potential. $\mathrm{Fe^{3+}/Fe^{2+}}$ ($0.771\ \mathrm{V}$) lies inside the window at low pH, so iron(III) solutions are stable in acid. $\mathrm{Co^{3+}/Co^{2+}}$ ($1.92\ \mathrm{V}$) lies above it: aqueous cobalt(III) oxidises water. $\mathrm{Zn^{2+}/Zn}$ ($-0.762\ \mathrm{V}$) lies below it: zinc should liberate hydrogen from water at any pH — that it does so slowly is kinetics, not thermodynamics. Diagrams of this kind for whole elements are Pourbaix diagrams, used in [[electrochemistry/corrosion]].
:::

The width of $1.23\ \mathrm{V}$ is a thermodynamic statement only. In practice, the evolution of hydrogen and oxygen needs extra driving potential (overpotential) that depends strongly on the electrode material, which is why aqueous lead–acid batteries can sustain $2.0\ \mathrm{V}$ and why water-in-salt electrolytes reach about $3\ \mathrm{V}$; the kinetic reasons are explained in [[electrochemistry/electrode-kinetics]] and their consequences in [[electrochemistry/batteries]].

## Concentration cells and liquid junctions

A cell can generate a voltage with no net chemical reaction at all. In the **concentration cell**
$$
\mathrm{Ag(s)\,|\,AgNO_3(aq, b_\mathrm{L})\,\Vert\,AgNO_3(aq, b_\mathrm{R})\,|\,Ag(s)}
$$
the cell reaction is the transfer $\mathrm{Ag^+(R) \rightarrow Ag^+(L)}$, $E^\circ_\mathrm{cell} = 0$, and $E = (RT/F)\ln(a_\mathrm{R}/a_\mathrm{L})$: the Gibbs energy of dilution appears as a voltage. Biology runs on such cells — a nerve cell's resting potential is a concentration cell for $\mathrm{K^+}$ across the membrane, roughly $(RT/F)\ln(c_\mathrm{out}/c_\mathrm{in})$ for the ion the membrane lets through.

Wherever two different electrolyte solutions meet, the ions diffuse across the boundary at different speeds, and the faster ions run ahead and set up a **liquid-junction potential**. Hydrochloric acid in contact with a more dilute hydrochloric acid gives a junction potential of tens of millivolts because $\mathrm{H^+}$ is about five times as mobile as $\mathrm{Cl^-}$. A **salt bridge** filled with concentrated potassium chloride (or potassium nitrate) reduces the junction potential to a few millivolts, because the bridge ions dominate the transport across both junctions and $\mathrm{K^+}$ and $\mathrm{Cl^-}$ have almost equal mobilities. The theory, with transport numbers, is in [[electrochemistry/conductivity]]. Cells *without* liquid junction, like Harned's, use a single electrolyte with two electrodes each reversible to one of its ions; they are the only cells whose potentials are exactly thermodynamic.

::: history From Volta's pile to Harned's cell {#hist-cells}
Alessandro Volta described his pile of zinc and silver (or copper) discs separated by brine-soaked cloth in a letter to the Royal Society in 1800; it was the first source of continuous current, and within weeks Nicholson and Carlisle used one to decompose water. John Frederic Daniell's cell of 1836, with copper in copper sulfate and zinc in dilute acid separated by a porous pot, gave a steady voltage for telegraphy, because it avoided the hydrogen bubbles that polarised Volta's design. The thermodynamic interpretation took half a century: J. Willard Gibbs's *On the Equilibrium of Heterogeneous Substances* (1876–1878) and Hermann von Helmholtz's 1882 paper on the thermodynamics of chemical processes showed that the cell potential measures the free energy, not the heat, of reaction, which is the content of [[#prop-temp]]. Walther Nernst's 1889 paper on the electromotive activity of ions gave the logarithmic dependence on concentration, from van 't Hoff's osmotic analogy. Gilbert N. Lewis introduced activity in 1907 so that the Nernst equation would hold exactly. Herbert Harned and Russell Ehlers' measurements of the hydrogen–silver chloride cell (*J. Am. Chem. Soc.*, 1932–1933) fixed $E^\circ(\mathrm{AgCl/Ag})$ from 0 to $60\,^\circ\mathrm{C}$ and made cells without liquid junction the reference method for activity coefficients and, later, for the pH scale.
:::

## Where this leads

Every later chapter of this course is a departure from the zero-current equilibrium treated here. The next chapter, [[electrochemistry/conductivity]], follows ions as they carry current through the electrolyte, and explains liquid-junction potentials. [[electrochemistry/double-layer]] looks inside the interface where the electrochemical potential is balanced; [[electrochemistry/electrode-kinetics]] asks how fast that balance is restored when current is drawn, so that the voltage of a working cell falls below $E_\mathrm{cell}$; [[electrochemistry/voltammetry]] uses the Nernst equation at the electrode surface as a boundary condition. The thermodynamic ceiling on a battery's voltage and energy ([[electrochemistry/batteries]]), the minimum voltage for electrolysis and the efficiency limit of fuel cells ([[electrochemistry/fuel-cells-electrolysis]]), and the Pourbaix diagrams of corrosion ([[electrochemistry/corrosion]]) all start from [[#eq-dg]] and [[#eq-nernst]]. In analysis the same equation becomes potentiometry and pH measurement ([[analytical-chemistry/electroanalytical]]), and in biochemistry it gives the redox potentials that order the electron-transport chain ([[biochemistry/oxidative-phosphorylation]]).

::: summary
- A cell potential is the potential of the right-hand terminal minus the left, measured at zero current so that every interface is at equilibrium; the cell reaction is defined with reduction on the right, and $E_\mathrm{cell} = E_\mathrm{R} - E_\mathrm{L}$ on the hydrogen scale.
- Charged species obey equilibrium in terms of the electrochemical potential $\tilde\mu_i = \mu_i + z_iF\phi$; from it, or from maximum non-expansion work, $\Delta_\mathrm{r}G = -\nu FE_\mathrm{cell}$, and $\ln K = \nu FE^\circ/RT$ (59.16 mV per decade per electron at $25\,^\circ\mathrm{C}$).
- The Nernst equation $E = E^\circ - (RT/\nu F)\ln Q$ holds with activities; cells without liquid junction, such as $\mathrm{Pt|H_2|HCl|AgCl|Ag}$, measure $a_\pm$ and, by extrapolation to infinite dilution, $E^\circ$.
- Temperature coefficients give $\Delta_\mathrm{r}S = \nu F(\partial E/\partial T)_p$, $\Delta_\mathrm{r}H = -\nu F[E - T(\partial E/\partial T)_p]$ and $\Delta_\mathrm{r}C_p = \nu FT(\partial^2E/\partial T^2)_p$; the electrical work of a cell is $-\Delta_\mathrm{r}G$, not $-\Delta_\mathrm{r}H$.
- Half-reaction potentials combine by adding $\nu E^\circ$, not $E^\circ$; the same rule turns potentials into solubility products and disproportionation constants.
- Formal potentials include the medium's activity coefficients and side equilibria; potentials of proton-coupled couples fall by $59.16\,m/\nu$ mV per pH unit, and water is thermodynamically stable only within a $1.23\ \mathrm{V}$ window.
- Liquid junctions add a non-thermodynamic potential; salt bridges of concentrated KCl reduce it to a few millivolts.
:::

## Exercises

::: exercise Zinc–silver cell {level=1 check="-301.4"}
For $\mathrm{Zn(s)\,|\,Zn^{2+}(aq)\,\Vert\,Ag^+(aq)\,|\,Ag(s)}$ take $E^\circ(\mathrm{Ag^+/Ag}) = +0.800\ \mathrm{V}$ and $E^\circ(\mathrm{Zn^{2+}/Zn}) = -0.762\ \mathrm{V}$. Write the cell reaction and find $\Delta_\mathrm{r}G^\circ$ at $25\,^\circ\mathrm{C}$. (Enter $\Delta_\mathrm{r}G^\circ$ in $\mathrm{kJ\,mol^{-1}}$.)
::: solution
Reduction on the right: $2\mathrm{Ag^+ + 2e^- \rightarrow 2Ag}$; oxidation on the left: $\mathrm{Zn \rightarrow Zn^{2+} + 2e^-}$. Cell reaction $\mathrm{Zn(s) + 2Ag^+(aq) \rightarrow Zn^{2+}(aq) + 2Ag(s)}$, $\nu = 2$. $E^\circ_\mathrm{cell} = 0.800 - (-0.762) = 1.562\ \mathrm{V}$ — the silver potential is *not* doubled even though two silver ions react. $\Delta_\mathrm{r}G^\circ = -2\times96\,485\times1.562\ \mathrm{J\,mol^{-1}} = -301.4\ \mathrm{kJ\,mol^{-1}}$.
:::
:::

::: exercise A Daniell cell off standard conditions {level=1 check="1.043"}
Find the potential of the Daniell cell ($E^\circ = 1.102\ \mathrm{V}$) at $25\,^\circ\mathrm{C}$ when $a(\mathrm{Zn^{2+}}) = 0.10$ and $a(\mathrm{Cu^{2+}}) = 0.0010$. (Enter $E_\mathrm{cell}$ in V.)
::: solution
$Q = a(\mathrm{Zn^{2+}})/a(\mathrm{Cu^{2+}}) = 0.10/0.0010 = 100$ and $\nu = 2$, so
$$
E = 1.102\ \mathrm{V} - \frac{0.025693\ \mathrm{V}}{2}\ln 100 = 1.102 - 0.0592 = 1.043\ \mathrm{V}.
$$
Two decades of $Q$ with two electrons cost one "59 mV".
:::
:::

::: exercise Equilibrium constant from potentials {level=1 check="20.96"}
For $\mathrm{Sn^{2+}(aq) + 2Fe^{3+}(aq) \rightarrow Sn^{4+}(aq) + 2Fe^{2+}(aq)}$, with $E^\circ(\mathrm{Fe^{3+}/Fe^{2+}}) = 0.771\ \mathrm{V}$ and $E^\circ(\mathrm{Sn^{4+}/Sn^{2+}}) = 0.151\ \mathrm{V}$, find $\log K$ at $25\,^\circ\mathrm{C}$. (Enter $\log_{10}K$.)
::: solution
The electrons cancel with $\nu = 2$: $E^\circ = 0.771 - 0.151 = 0.620\ \mathrm{V}$. Then $\log K = \nu E^\circ/0.05916\ \mathrm{V} = 2\times0.620/0.05916 = 20.96$, $K = 9\times10^{20}$. Tin(II) reduces iron(III) quantitatively, which is why it is used to pre-reduce iron before a dichromate titration.
:::
:::

::: exercise The Weston standard cell {level=2 check="-198.9"}
The Weston cell, $\mathrm{Cd(Hg)\,|\,CdSO_4(sat)\,|\,Hg_2SO_4(s)\,|\,Hg(l)}$, has cell reaction $\mathrm{Cd(Hg) + Hg_2SO_4(s) + \tfrac{8}{3}H_2O(l) \rightarrow CdSO_4\cdot\tfrac{8}{3}H_2O(s) + 2Hg(l)}$ with $\nu = 2$. At $20\,^\circ\mathrm{C}$ its potential is $1.01864\ \mathrm{V}$ and its temperature coefficient $-4.06\times10^{-5}\ \mathrm{V\,K^{-1}}$. Find $\Delta_\mathrm{r}S$ and $\Delta_\mathrm{r}H$. (Enter $\Delta_\mathrm{r}H$ in $\mathrm{kJ\,mol^{-1}}$.)
::: solution
$\Delta_\mathrm{r}S = \nu F(\partial E/\partial T)_p = 2\times96\,485\times(-4.06\times10^{-5}) = -7.83\ \mathrm{J\,K^{-1}\,mol^{-1}}$.
$$
\Delta_\mathrm{r}H = -\nu F\left[E - T\frac{\partial E}{\partial T}\right] = -2\times96\,485\times\left[1.01864 + 293.15\times4.06\times10^{-5}\right]\ \mathrm{J\,mol^{-1}} = -198.9\ \mathrm{kJ\,mol^{-1}} .
$$
The tiny temperature coefficient — $41\ \mu\mathrm{V}$ per kelvin — is what made the Weston cell the international voltage standard from 1911 until the Josephson effect replaced it; a small $\Delta_\mathrm{r}S$ is the thermodynamic requirement for a good standard.
:::
:::

::: exercise A concentration cell {level=2 check="53.8"}
Ignoring the junction potential, find the potential at $25\,^\circ\mathrm{C}$ of $\mathrm{Ag\,|\,AgNO_3(0.010\ mol\,kg^{-1})\,\Vert\,AgNO_3(0.100\ mol\,kg^{-1})\,|\,Ag}$, taking $\gamma_\pm = 0.90$ and $0.73$ in the two solutions and $\gamma_{\mathrm{Ag^+}} = \gamma_\pm$. (Enter $E$ in mV.)
::: solution
Cell reaction: $\mathrm{Ag^+(R) \rightarrow Ag^+(L)}$, $\nu = 1$, $E^\circ = 0$. $a_\mathrm{R} = 0.73\times0.100 = 0.073$, $a_\mathrm{L} = 0.90\times0.010 = 0.0090$.
$$
E = \frac{RT}{F}\ln\frac{a_\mathrm{R}}{a_\mathrm{L}} = 25.693\ \mathrm{mV}\times\ln\frac{0.073}{0.0090} = 25.693\times2.093\ \mathrm{mV} = 53.8\ \mathrm{mV}.
$$
With concentrations alone the answer would be $59.2\ \mathrm{mV}$. The assumption $\gamma_{\mathrm{Ag^+}} = \gamma_\pm$ is a non-thermodynamic convention, and so, strictly, is the neglect of the junction — which is why concentration cells with transference are analysed together with transport numbers.
:::
:::

::: exercise Disproportionation of copper(I) {level=2 check="0.527"}
Given $E^\circ(\mathrm{Cu^{2+}/Cu}) = 0.340\ \mathrm{V}$ and $E^\circ(\mathrm{Cu^{2+}/Cu^+}) = 0.153\ \mathrm{V}$, find $E^\circ(\mathrm{Cu^+/Cu})$ and the equilibrium constant of $2\mathrm{Cu^+(aq) \rightleftharpoons Cu^{2+}(aq) + Cu(s)}$ at $25\,^\circ\mathrm{C}$. (Enter $E^\circ(\mathrm{Cu^+/Cu})$ in V.)
::: solution
$\mathrm{Cu^{2+} + 2e^- \rightarrow Cu}$ is the sum of $\mathrm{Cu^{2+} + e^- \rightarrow Cu^+}$ and $\mathrm{Cu^+ + e^- \rightarrow Cu}$, so by [[#eq-combine]] $2(0.340) = 1(0.153) + 1\cdot E^\circ(\mathrm{Cu^+/Cu})$ and $E^\circ(\mathrm{Cu^+/Cu}) = 0.680 - 0.153 = 0.527\ \mathrm{V}$. The disproportionation is $\mathrm{Cu^+/Cu}$ minus $\mathrm{Cu^{2+}/Cu^+}$ with $\nu = 1$: $E^\circ = 0.527 - 0.153 = 0.374\ \mathrm{V}$, $K = \exp(0.374/0.025693) = 2.1\times10^{6}$. Simple copper(I) salts disproportionate in water unless the copper(I) is stabilised by complexation or precipitation (as $\mathrm{CuCl}$ or $\mathrm{CuI}$).
:::
:::

::: exercise Oxygen in neutral water {level=3 check="0.805"}
Find the equilibrium potential of the oxygen electrode $\mathrm{O_2 + 4H^+ + 4e^- \rightarrow 2H_2O}$ ($E^\circ = 1.229\ \mathrm{V}$) at $25\,^\circ\mathrm{C}$ in air-saturated water ($p(\mathrm{O_2}) = 0.21\ \mathrm{bar}$) at pH 7.00. Then explain why this number is the thermodynamic driving force for the corrosion of iron in neutral water. (Enter $E$ in V vs SHE.)
::: hint
Write $Q = 1/[(p_{\mathrm{O_2}}/p^\circ)\,a_{\mathrm{H^+}}^4]$ and separate the pH term.
:::
::: solution
$$
E = E^\circ - \frac{0.05916\ \mathrm{V}}{4}\log\frac{1}{(p_{\mathrm{O_2}}/p^\circ)\,a_{\mathrm{H^+}}^{4}} = 1.229 + \frac{0.05916}{4}\log 0.21 - 0.05916\,\mathrm{pH} = 1.229 - 0.0100 - 0.4141 = 0.805\ \mathrm{V}.
$$
The partial pressure of oxygen matters little (a fifth of a bar costs $10\ \mathrm{mV}$); the pH matters a great deal. The couple $\mathrm{Fe^{2+}/Fe}$ sits near $-0.45\ \mathrm{V}$ (lower still at the micromolar iron concentrations of natural water), so the cell iron | water | oxygen has a potential above $1.2\ \mathrm{V}$, and $\Delta_\mathrm{r}G$ for $2\mathrm{Fe} + \mathrm{O_2} + 4\mathrm{H^+} \rightarrow 2\mathrm{Fe^{2+}} + 2\mathrm{H_2O}$ is strongly negative. Corrosion is therefore always favoured; whether it is fast is the question of [[electrochemistry/corrosion]].
:::
:::

::: exercise Heat capacity of reaction from a cubic fit {level=3 check="-171.5"}
Bates and Bower (1954) represented $E^\circ(\mathrm{AgCl/Ag})$ between 0 and $95\,^\circ\mathrm{C}$ by
$$
E^\circ/\mathrm{V} = 0.23659 - 4.8564\times10^{-4}\,t - 3.4205\times10^{-6}\,t^2 + 5.869\times10^{-9}\,t^3 ,
$$
with $t$ the Celsius temperature. Derive $\Delta_\mathrm{r}C_p^\circ$ for $\tfrac{1}{2}\mathrm{H_2 + AgCl \rightarrow Ag + H^+ + Cl^-}$ from [[#eq-temp]], evaluate it at $25\,^\circ\mathrm{C}$, and comment on its size. (Enter $\Delta_\mathrm{r}C_p^\circ$ in $\mathrm{J\,K^{-1}\,mol^{-1}}$.)
::: hint
$\mathrm{d}t = \mathrm{d}T$, so derivatives in $t$ and $T$ are equal; but the factor $T$ in $\Delta_\mathrm{r}C_p = \nu FT\,\partial^2E/\partial T^2$ is the thermodynamic temperature.
:::
::: solution
Differentiate twice: $\mathrm{d}^2E^\circ/\mathrm{d}t^2 = -2(3.4205\times10^{-6}) + 6(5.869\times10^{-9})t\ \mathrm{V\,K^{-2}}$. At $t = 25$: $-6.841\times10^{-6} + 8.80\times10^{-7} = -5.961\times10^{-6}\ \mathrm{V\,K^{-2}}$. (Check the first derivative too: $-4.8564\times10^{-4} - 1.710\times10^{-4} + 1.10\times10^{-5} = -6.457\times10^{-4}\ \mathrm{V\,K^{-1}}$, the value used in [[#ex-temp]].) With $\nu = 1$ and $T = 298.15\ \mathrm{K}$:
$$
\Delta_\mathrm{r}C_p^\circ = FT\frac{\partial^2E^\circ}{\partial T^2} = 96\,485\times298.15\times(-5.961\times10^{-6})\ \mathrm{J\,K^{-1}\,mol^{-1}} = -171.5\ \mathrm{J\,K^{-1}\,mol^{-1}} .
$$
Calorimetric tables give about $-176\ \mathrm{J\,K^{-1}\,mol^{-1}}$, dominated by the large negative partial molar heat capacity of $\mathrm{Cl^-(aq)}$ ($-136\ \mathrm{J\,K^{-1}\,mol^{-1}}$): forming ions *lowers* the heat capacity because the hydration shells they order melt less readily as the temperature rises. That a second derivative of a voltage reproduces a heat capacity to a few per cent shows how precise cell measurements are — and also how sensitive second derivatives are to the form of the fitting function.
:::
:::

::: exercise An activity coefficient from the voltmeter {level=3 check="0.796"}
The cell $\mathrm{Pt\,|\,H_2(1\ bar)\,|\,HCl(0.100\ mol\,kg^{-1})\,|\,AgCl\,|\,Ag}$ has $E = 0.35237\ \mathrm{V}$ at $25\,^\circ\mathrm{C}$. With $E^\circ = 0.22233\ \mathrm{V}$, find $\gamma_\pm(\mathrm{HCl})$, and compare it with the Davies equation $\log\gamma_\pm = -0.509\left(\sqrt{I}/(1 + \sqrt{I}) - 0.30I\right)$. (Enter $\gamma_\pm$ from the cell.)
::: solution
From [[#ex-harned-cell]], $E = E^\circ - (2RT/F)\ln(\gamma_\pm b/b^\circ)$, so
$$
\ln(\gamma_\pm b/b^\circ) = \frac{E^\circ - E}{2RT/F} = \frac{0.22233 - 0.35237}{0.051386} = -2.5307,
$$
$\gamma_\pm b/b^\circ = 0.07962$ and $\gamma_\pm = 0.796$. Davies, with $I = 0.100$: $\sqrt{I} = 0.3162$, $\log\gamma_\pm = -0.509(0.2403 - 0.0300) = -0.1070$, $\gamma_\pm = 0.782$. The Davies equation underestimates by under $2\,\%$ — good for a one-parameter-free formula at $I = 0.1$ — while the cell, read to $0.01\ \mathrm{mV}$, fixes $\gamma_\pm$ to about $0.02\,\%$. One millivolt of error in $E$ would change $\gamma_\pm$ by $2\,\%$, so careful thermostatting and pure hydrogen matter.
:::
:::
