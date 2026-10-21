A cell made from a beaker of copper sulfate, a beaker of zinc sulfate, a strip of each metal and a soaked piece of filter paper will light a light-emitting diode, and it will do so for hours. Nothing in the beakers looks like a battery — no acid fumes, no moving parts — yet electrons leave the zinc, cross a wire, pass through the diode and arrive at the copper, driven by nothing but the difference in the hold that two metals take on their own electrons. The same electron bookkeeping explains why a nail rusts in a wet corner, why a ship's hull carries lumps of zinc bolted to it, why your phone runs on a lithium compound rather than on lithium metal, and why aluminium waited until 1886 to be isolated although clay is the fifth most abundant substance in the crust. Electrochemistry is the chemistry of electron transfer done in two places at once, and its central quantity — the electrode potential — is nothing more than a measure of how strongly a species wants electrons, calibrated against hydrogen and read off a table.

## Oxidation states: the bookkeeping of electrons

::: definition Oxidation state {#def-oxidation-state}
The **oxidation state** (oxidation number) of an atom in a substance is the charge it would carry if every bond were broken ionically, the bonding electrons assigned to the more electronegative partner. The rules, in order of priority: the oxidation state of a free element is $0$; of a monatomic ion it equals its charge; fluorine is $-1$ in all its compounds; hydrogen is $+1$ with nonmetals and $-1$ in metal hydrides such as $\mathrm{NaH}$; oxygen is $-2$ except in peroxides ($-1$, e.g. $\mathrm{H_2O_2}$), superoxides ($-\tfrac{1}{2}$) and fluorides (positive); the oxidation states in a neutral formula sum to $0$ and in an ion to the charge. **Oxidation** is an increase of oxidation state (loss of electrons), **reduction** a decrease (gain of electrons); the **oxidising agent** is reduced, the **reducing agent** is oxidised.
:::

::: example Assigning oxidation states {#ex-ox-assign}
Give the oxidation state of the marked element: $\mathrm{Cr_2O_7^{2-}}$ (Cr), $\mathrm{MnO_4^-}$ (Mn), $\mathrm{H_2O_2}$ (O), $\mathrm{Na_2S_2O_3}$ (average S), $\mathrm{NH_4^+}$ (N).
::: solution
Oxygen is $-2$ and the ion's states sum to its charge, so for dichromate, $2x + 7(-2) = -2$ gives $x = +6$: chromium(VI), and the oxidising power of acidified dichromate is the ease with which it retreats to $\mathrm{Cr^{3+}}$. For permanganate, $x + 4(-2) = -1$ gives $x = +7$ — manganese at its maximum. In peroxide the O–O bond joins like atoms, so each oxygen keeps one shared pair: $2x + 2(+1) = 0$ gives $x = -1$, not $-2$. In thiosulfate, $2x + 3(-2) = -2$ gives the *average* $x = +2$; the two sulfurs are actually different (about $-2$ and $+6$ — the central sulfur replaces one oxygen of sulfate), which is a warning that averages can hide chemistry. In ammonium, $x + 4(+1) = +1$ gives $x = -3$: nitrogen at its lowest.
:::
:::

Oxidation states never change one at a time: if one species is oxidised, another is reduced, and the electrons lost must equal the electrons gained. That single sentence is the whole of redox stoichiometry; everything else is bookkeeping.

::: algorithm Balancing a redox equation (half-reaction method) {#alg-balance-redox}
In acid solution: **(1)** write the two half-reactions with the element oxidised and the element reduced, ignoring everything else; **(2)** balance each half-reaction for atoms other than O and H; **(3)** balance O by adding $\mathrm{H_2O}$; **(4)** balance H by adding $\mathrm{H^+}$; **(5)** balance charge by adding electrons to the more positive side; **(6)** multiply the halves so the electrons cancel and add. In base solution, finish the same balancing in acid and then add $\mathrm{OH^-}$ to both sides in a number equal to the $\mathrm{H^+}$ present, converting each $\mathrm{H^+ + OH^-}$ pair into $\mathrm{H_2O}$ and cancelling waters. Check at the end that both atoms *and charge* balance.
:::

::: example Balancing in acid: permanganate and iron(II) {#ex-balance-acid}
Balance $\mathrm{MnO_4^- + Fe^{2+} \rightarrow Mn^{2+} + Fe^{3+}}$ in acid solution.
::: solution
Reduction half: Mn goes $+7 \rightarrow +2$. Balance O with water, $\mathrm{MnO_4^- \rightarrow Mn^{2+} + 4\,H_2O}$; balance H with protons, $\mathrm{MnO_4^- + 8\,H^+ \rightarrow Mn^{2+} + 4\,H_2O}$; balance charge ($+7$ left, $+2$ right) with five electrons, $\mathrm{MnO_4^- + 8\,H^+ + 5\,e^- \rightarrow Mn^{2+} + 4\,H_2O}$. Oxidation half: $\mathrm{Fe^{2+} \rightarrow Fe^{3+} + e^-}$. Multiply it by five and add:
$$
\mathrm{MnO_4^- + 5\,Fe^{2+} + 8\,H^+ \rightarrow Mn^{2+} + 5\,Fe^{3+} + 4\,H_2O}.
$$
Check: charge $-1 + 10 + 8 = +17$ left, $+2 + 15 = +17$ right; all atoms balance. The five-to-one ratio is what makes permanganate a self-indicating titrant for iron: one drop past the equivalence point leaves the pink of unreacted $\mathrm{MnO_4^-}$.
:::
:::

::: example Balancing in base: permanganate to manganese dioxide {#ex-balance-base}
Balance $\mathrm{MnO_4^- + SO_3^{2-} \rightarrow MnO_2 + SO_4^{2-}}$ in basic solution.
::: solution
Balance as if in acid. Reduction: $\mathrm{MnO_4^-}$ to $\mathrm{MnO_2}$ (Mn $+7 \rightarrow +4$): $\mathrm{MnO_4^- + 4\,H^+ + 3\,e^- \rightarrow MnO_2 + 2\,H_2O}$. Oxidation: $\mathrm{SO_3^{2-} + H_2O \rightarrow SO_4^{2-} + 2\,H^+ + 2\,e^-}$. Electrons: multiply the first by 2, the second by 3, add, and cancel $6\,\mathrm{H^+}$ against $6\,\mathrm{H^+}$: $\mathrm{2\,MnO_4^- + 3\,SO_3^{2-} + 2\,H^+ \rightarrow 2\,MnO_2 + 3\,SO_4^{2-} + H_2O}$. Now convert to base: add $2\,\mathrm{OH^-}$ to both sides, absorb the $2\,\mathrm{H^+}$ into water:
$$
\mathrm{2\,MnO_4^- + 3\,SO_3^{2-} + H_2O \rightarrow 2\,MnO_2 + 3\,SO_4^{2-} + 2\,OH^-}.
$$
Check charge: $-2 - 6 = -8$ left, $-6 - 2 = -8$ right; O: $8 + 9 + 1 = 18$ left, $4 + 12 + 2 = 18$ right. The brown precipitate of $\mathrm{MnO_2}$ instead of the colourless $\mathrm{Mn^{2+}}$ is the visible sign that permanganate's appetite for electrons depends on the supply of protons — a point the Nernst equation will make quantitative.
:::
:::

::: quiz
In the reaction $\mathrm{Cr_2O_7^{2-} + 3\,SO_2 + 2\,H^+ \rightarrow 2\,Cr^{3+} + 3\,SO_4^{2-} + H_2O}$, which species is the oxidising agent?
- [x] $\mathrm{Cr_2O_7^{2-}}$: chromium falls from $+6$ to $+3$, so the dichromate gains electrons.
- [ ] $\mathrm{SO_2}$: sulfur is oxidised, and what is oxidised oxidises the other side.
- [ ] $\mathrm{H^+}$: it supplies the protons the reaction needs.
- [ ] $\mathrm{Cr^{3+}}$: it is the product with the lower charge.
::: solution
The oxidising agent is the species that is *reduced*: chromium's oxidation state falls $+6 \rightarrow +3$, so dichromate is the oxidant and $\mathrm{SO_2}$ (S: $+4 \rightarrow +6$) is the reductant. Protons are neither — their oxidation state never changes. A product cannot be the agent of the reaction that made it.
:::
:::

## Galvanic cells: separating the half-reactions

::: definition Galvanic cell, electrodes and salt bridge {#def-galvanic-cell}
A **galvanic (voltaic) cell** is a set-up in which a spontaneous redox reaction is split into two **half-reactions** occurring at separate **electrodes**, so that the electrons are forced through an external circuit and can do electrical work. Oxidation occurs at the **anode** (for a galvanic cell, the negative electrode) and reduction at the **cathode** (the positive one) — a definition that holds in every electrochemical cell, galvanic or electrolytic, because *anode* simply means "the electrode where oxidation happens". A **salt bridge** (or porous membrane) completes the circuit by letting ions drift between the compartments — anions towards the anode, cations towards the cathode — without letting the solutions mix, which would short-circuit the cell by letting the reactants meet directly.
:::

The Daniell cell is written in **cell notation** as

$$
\mathrm{Zn(s)\;|\;Zn^{2+}(aq)\;\|\;Cu^{2+}(aq)\;|\;Cu(s)},
$$

reading left to right: anode, then cathode; a single bar is a phase boundary, a double bar a salt bridge. By this convention the cell reaction is always the one written left-to-right, and a positive measured voltage means it is spontaneous as written.

::: definition Standard electrode potential {#def-standard-potential}
Every electrode potential is a difference of potential across the metal–solution interface, and no voltmeter can read a single interface alone — you always measure a *pair*. The **standard hydrogen electrode** (SHE), $\mathrm{Pt(s)\;|\;H_2(g,\ 1\ bar)\;|\;H^+(aq,\ 1\ mol\,dm^{-3})}$, is therefore *defined* to have $E^\circ = 0.00\ \mathrm{V}$ at all temperatures, and every other standard electrode potential $E^\circ$ is the voltage of a cell made from the electrode in question (all solutes $1\ \mathrm{mol\,dm^{-3}}$, gases $1\ \mathrm{bar}$, usually $298.15\ \mathrm{K}$) against the SHE. Tabulated values are always written as **reductions**: $\mathrm{Cu^{2+} + 2\,e^- \rightarrow Cu}$, $E^\circ = +0.34\ \mathrm{V}$; $\mathrm{Zn^{2+} + 2\,e^- \rightarrow Zn}$, $E^\circ = -0.76\ \mathrm{V}$ (standard tabulated data). The more positive $E^\circ$, the stronger the oxidising agent on the left of its half-equation; the more negative, the stronger the reducing agent on the right.
:::

::: proposition The cell potential {#prop-cell-potential}
For any cell, written as a reduction at the right-hand electrode and a reduction at the left-hand electrode,
$$
E^\circ_\mathrm{cell} = E^\circ_\text{cathode} - E^\circ_\text{anode},
$$
using the tabulated *reduction* potentials unchanged — never multiplied by the stoichiometric coefficients used to equalise electrons. The reaction as written (cathode reduction, anode oxidation) is spontaneous precisely when $E^\circ_\mathrm{cell} > 0$.
:::

::: warning Potentials are intensive, and "spontaneous" is standard-state talk {#warn-potentials}
Three traps in one block. **First**, $E^\circ$ is an *intensive* quantity: doubling the half-reaction does not double its voltage, because voltage is energy *per coulomb* and both the energy and the coulomb double. So in $\mathrm{2\,Fe^{3+} + Cu \rightarrow 2\,Fe^{2+} + Cu^{2+}}$ you still use $E^\circ(\mathrm{Fe^{3+}/Fe^{2+}}) = +0.77\ \mathrm{V}$, not $1.54\ \mathrm{V}$; it is $\Delta_\mathrm{r}G^\circ$, not $E^\circ$, that doubles. **Second**, $E^\circ_\mathrm{cell} > 0$ guarantees spontaneity only for the *standard* state, $1\ \mathrm{mol\,dm^{-3}}$ and $1\ \mathrm{bar}$; a cell with $E^\circ_\mathrm{cell} = +0.05\ \mathrm{V}$ can run backwards when concentrations are far from standard — the Nernst equation decides. **Third**, "the anode is negative" is true of galvanic cells only: in an electrolytic cell the anode is wired to the positive terminal and is positive. The invariant rule is the definition — anode is where oxidation happens — not the sign.
:::

::: example The Daniell cell: voltage, free energy, equilibrium constant {#ex-daniell}
For $\mathrm{Zn(s) + Cu^{2+}(aq) \rightarrow Zn^{2+}(aq) + Cu(s)}$, find $E^\circ_\mathrm{cell}$, $\Delta_\mathrm{r}G^\circ$ and $K$ at $298.15\ \mathrm{K}$. ($E^\circ(\mathrm{Cu^{2+}/Cu}) = +0.34\ \mathrm{V}$, $E^\circ(\mathrm{Zn^{2+}/Zn}) = -0.76\ \mathrm{V}$.)
::: solution
Cathode minus anode, with the tabulated reduction potentials untouched:
$$
E^\circ_\mathrm{cell} = (+0.34) - (-0.76) = +1.10\ \mathrm{V}.
$$
Two electrons pass per reaction event, $n = 2$, so (the next section proves the relation)
$$
\Delta_\mathrm{r}G^\circ = -nFE^\circ_\mathrm{cell} = -2 \times 96\,485\ \mathrm{C\,mol^{-1}} \times 1.10\ \mathrm{V} = -212\ \mathrm{kJ\,mol^{-1}}.
$$
With $\Delta_\mathrm{r}G^\circ = -RT\ln K$ and $2.303\,RT/F = 0.05916\ \mathrm{V}$ at $25\ ^\circ\mathrm{C}$,
$$
\log_{10} K = \frac{nE^\circ_\mathrm{cell}}{0.05916\ \mathrm{V}} = \frac{2 \times 1.10}{0.05916} = 37.2,
\qquad K = 1.5\times10^{37}.
$$
A volt and a tenth of a volt is an *enormous* equilibrium constant — this is why a displacement reaction like this one goes essentially to completion, and why $100\ \mathrm{mV}$ of cell voltage is worth about ten powers of ten in $K$ for a two-electron reaction.
:::
:::

::: history
Volta's pile of 1800 — discs of zinc and silver separated by brine-soaked card — was the first source of continuous current and, its maker argued, of the "contact electricity" dispute with Galvani's frog legs. Faraday's laws of electrolysis (1834) made the electron's accountancy quantitative and gave the vocabulary of electrodes, ions, anions and cations. Daniell's cell of 1836 replaced the polarising hydrogen of Volta's stack with a copper cathode plated from solution and became the standard that powered telegraph lines; the standard cell of the electrical unit systems was long defined from a variant of it. Nernst's equation of 1889, born of his work on solution equilibria, connected the voltage to concentrations and made the cell a chemical analysis. The hydrogen electrode convention fixed the zero that no experiment can measure, and the electrochemical series — the table you read spontaneity off — is the practical residue of all of it.
:::

## Free energy, potential and equilibrium

::: proposition Electrical work and the cell potential {#prop-dg-nfe}
For a cell reaction transferring $n$ moles of electrons per mole of reaction at cell potential $E_\mathrm{cell}$,
$$
\Delta_\mathrm{r}G = -\,nF E_\mathrm{cell},
$$
with the standard-state version $\Delta_\mathrm{r}G^\circ = -nF E^\circ_\mathrm{cell}$. A positive cell potential means a negative Gibbs energy change: the reaction is spontaneous and the cell can do work.
:::

::: proof Why $\Delta_\mathrm{r}G = -nFE$ {#proof-dg-nfe}
At constant temperature and pressure the Gibbs energy change equals the maximum non-expansion work the process can deliver, $\Delta_\mathrm{r}G = w_\text{max, non-exp}$. Electrical work is charge times potential difference. One mole of reaction moves $n$ moles of electrons, a charge of $nN_\mathrm{A}e = nF$ coulombs, through the potential difference $E_\mathrm{cell}$; the work delivered to the surroundings is therefore $nFE_\mathrm{cell}$, and work done *by* the system is a loss of its Gibbs energy: $\Delta_\mathrm{r}G = -nFE_\mathrm{cell}$. The sign reads correctly: a cell that pushes electrons "downhill" through a wire ($E_\mathrm{cell} > 0$) loses free energy. It also explains why $E$ is intensive: halving the cell halves both the charge moved and the free energy change, leaving the ratio $E = -\Delta_\mathrm{r}G/nF$ untouched.
:::

::: proposition The Nernst equation {#prop-nernst}
For a cell reaction with reaction quotient $Q$, at $298.15\ \mathrm{K}$,
$$
E_\mathrm{cell} = E^\circ_\mathrm{cell} - \frac{RT}{nF}\ln Q
= E^\circ_\mathrm{cell} - \frac{0.05916\ \mathrm{V}}{n}\log_{10} Q.
$$
The same relation applied to a single half-reaction gives its electrode potential at non-standard concentrations. The potential falls as products accumulate; at equilibrium, $Q = K$ and $E_\mathrm{cell} = 0$ — a dead battery is simply a reaction mixture at equilibrium.
:::

::: proof The Nernst equation {#proof-nernst}
Start from the isotherm of the previous chapter's thermodynamics, $\Delta_\mathrm{r}G = \Delta_\mathrm{r}G^\circ + RT\ln Q$, and substitute $\Delta_\mathrm{r}G = -nFE_\mathrm{cell}$ and $\Delta_\mathrm{r}G^\circ = -nFE^\circ_\mathrm{cell}$ from the proposition above:
$$
-nFE_\mathrm{cell} = -nFE^\circ_\mathrm{cell} + RT\ln Q.
$$
Divide through by $-nF$:
$$
E_\mathrm{cell} = E^\circ_\mathrm{cell} - \frac{RT}{nF}\ln Q.
$$
At $298.15\ \mathrm{K}$, $2.303\,RT/F = 2.303 \times 8.314 \times 298.15 / 96\,485 = 0.05916\ \mathrm{V}$, giving the working form. Setting $E_\mathrm{cell} = 0$ at equilibrium gives $E^\circ_\mathrm{cell} = (0.05916/n)\log_{10} K$, the bridge between tables of potentials and tables of equilibrium constants.
:::

::: widget plot
f: 0.77 + 0.05916*x/n
sliders: n=1:1:4:1
x: -4, 4
y: 0.5, 1.1
labels: \text{electrode potential } E
caption: The Nernst line for an $\mathrm{Fe^{3+}/Fe^{2+}}$ electrode, $E = E^\circ + (0.05916/n)\log_{10}\left([\mathrm{Ox}]/[\mathrm{Red}]\right)$, plotted against $x = \log_{10}\left([\mathrm{Ox}]/[\mathrm{Red}]\right)$ with the electron number $n$ on the slider (start at $n = 1$, the iron couple). The potential is $E^\circ = 0.77\ \mathrm{V}$ when oxidised and reduced forms are equimolar, rises by $59\ \mathrm{mV}$ per decade of oxidant excess for $n = 1$, and by $59/n\ \mathrm{mV}$ for other $n$: the steeper the line, the less each electron has to do. This single straight line is the reason a potentiometric titration curve jumps at the equivalence point — the ratio $[\mathrm{Ox}]/[\mathrm{Red}]$ swings through many decades in one drop.
:::

::: example A Daniell cell away from standard conditions {#ex-nernst-daniell}
A Daniell cell has $[\mathrm{Zn^{2+}}] = 0.10\ \mathrm{mol\,dm^{-3}}$ and $[\mathrm{Cu^{2+}}] = 1.0\ \mathrm{mol\,dm^{-3}}$ at $25\ ^\circ\mathrm{C}$. Find $E_\mathrm{cell}$.
::: solution
The reaction quotient excludes the solids: $Q = [\mathrm{Zn^{2+}}]/[\mathrm{Cu^{2+}}] = 0.10$. With $n = 2$,
$$
E_\mathrm{cell} = 1.10\ \mathrm{V} - \frac{0.05916\ \mathrm{V}}{2}\log_{10}(0.10)
= 1.10 + 0.0296 = +1.13\ \mathrm{V}.
$$
Tenfold dilution of the product ion pushes the voltage up by $30\ \mathrm{mV}$: Le Chatelier in volts. Run the cell and $[\mathrm{Zn^{2+}}]$ climbs while $[\mathrm{Cu^{2+}}]$ falls, $Q$ grows towards $K = 1.5\times10^{37}$, and the voltage slides down to zero — which is why a flat battery measures about $0\ \mathrm{V}$ under load and why the "capacity" of a cell is a matter of how much material, not how strong the voltage, is stored inside.
:::
:::

::: example How acid makes permanganate stronger {#ex-nernst-mno4}
For $\mathrm{MnO_4^- + 8\,H^+ + 5\,e^- \rightarrow Mn^{2+} + 4\,H_2O}$, $E^\circ = +1.51\ \mathrm{V}$. Find the electrode potential at $\mathrm{pH}\ 7$ with $[\mathrm{MnO_4^-}] = [\mathrm{Mn^{2+}}] = 10^{-3}\ \mathrm{mol\,dm^{-3}}$, and explain the chemistry.
::: solution
$Q = [\mathrm{Mn^{2+}}]/\left([\mathrm{MnO_4^-}][\mathrm{H^+}]^{8}\right)$; the metal-ion ratio is $1$, so $\log_{10} Q = -\log_{10}[\mathrm{H^+}]^{8} = 8 \times 7 = 56$ and
$$
E = 1.51\ \mathrm{V} - \frac{0.05916\ \mathrm{V}}{5} \times 56 = 1.51 - 0.66 = +0.85\ \mathrm{V}.
$$
Eight protons per manganese make the potential fall by $8 \times 59/5 \approx 95\ \mathrm{mV}$ per pH unit: permanganate is a brutal oxidant in acid and a mild one in base, where it stops at $\mathrm{MnO_2}$ instead of $\mathrm{Mn^{2+}}$ — exactly the difference the two balancing examples used. The same proton leverage is why acid rain can mobilise iron and manganese from soils: at low pH their oxidised forms become thermodynamically accessible.
:::
:::

::: example The concentration cell: voltage from dilution alone {#ex-conc-cell}
Two copper electrodes dip in $\mathrm{CuSO_4}$ solutions of $1.0$ and $0.010\ \mathrm{mol\,dm^{-3}}$, connected by a salt bridge. Find the voltage and say which electrode is the cathode. What does the cell do as it runs?
::: solution
Identical electrodes, so $E^\circ_\mathrm{cell} = 0$; the whole voltage is entropic. The cell runs in the direction that mixes the two solutions — copper dissolves into the dilute side, making it the anode, and plates out of the concentrated side, making it the cathode:
$$
E_\mathrm{cell} = 0 - \frac{0.05916\ \mathrm{V}}{2}\log_{10}\frac{[\mathrm{Cu^{2+}}]_\text{dilute-side product}}{[\mathrm{Cu^{2+}}]_\text{cathode}}
= -\frac{0.05916}{2}\log_{10}\frac{0.010}{1.0} = +0.059\ \mathrm{V}.
$$
As the cell runs, copper dissolves into the dilute side and plates out of the concentrated side until both reach the same concentration and $E = 0$: the cell converts the free energy of dilution into work, fifty-nine millivolts for a hundredfold ratio at $n = 2$. A pH meter is exactly this device with protons: a cell whose two hydrogen electrodes see different $[\mathrm{H^+}]$ gives $E = 0.05916 \times \Delta\mathrm{pH}$, which is why the meter is calibrated with buffers rather than calculated from first principles.
:::
:::

::: widget plot
f: (0.05916/2)*log10(x)
x: 0.001, 1000
y: -0.1, 0.1
labels: \text{concentration-cell voltage}
caption: The voltage of a copper concentration cell, $E = (0.05916/2)\log_{10}\left([\mathrm{Cu^{2+}}]_\text{concentrated}/[\mathrm{Cu^{2+}}]_\text{dilute}\right)$, against the ratio of the two compartment concentrations. The curve passes through zero at equal concentrations — no ratio, no voltage — and is logarithmic, so each factor of ten of imbalance is worth the same $29.6\ \mathrm{mV}$. The same logarithm makes the cell a *concentration meter*: measure $E$, read off the ratio. Living cells run on the same principle with $\mathrm{K^+}$ and $\mathrm{Na^+}$ across a membrane, and the nerve impulse is a fast, regulated change of exactly this kind of potential.
:::

## Electrolysis: driving the reaction uphill

::: definition Electrolytic cell {#def-electrolysis}
An **electrolytic cell** forces a non-spontaneous redox reaction to run by imposing an external voltage larger than the cell's own (opposing) potential: $E_\text{applied} > E_\mathrm{cell}$. Electrons are *pumped* into the electrode connected to the negative terminal, making it the site of reduction — the cathode, by the universal definition — and pulled out of the other, the anode, where oxidation occurs. The decomposition voltage is never quite the thermodynamic minimum: real cells need extra **overpotential**, especially where gases such as $\mathrm{H_2}$ or $\mathrm{O_2}$ form on metal electrodes, to drive the interfacial steps at a useful rate.
:::

::: example What electrolysis of sodium chloride actually gives {#ex-electrolysis-products}
Predict the products of (a) electrolysis of *molten* $\mathrm{NaCl}$ and (b) electrolysis of *concentrated aqueous* $\mathrm{NaCl}$ between inert electrodes. ($E^\circ(\mathrm{Na^+/Na}) = -2.71\ \mathrm{V}$, $E^\circ(\mathrm{Cl_2/Cl^-}) = +1.36\ \mathrm{V}$, $E^\circ(\mathrm{O_2/H_2O}) = +1.23\ \mathrm{V}$; at $\mathrm{pH}\ 7$ the $\mathrm{O_2}$ couple sits near $+0.82\ \mathrm{V}$ and hydrogen near $-0.41\ \mathrm{V}$.)
::: solution
(a) Molten salt offers only $\mathrm{Na^+}$ and $\mathrm{Cl^-}$: sodium metal at the cathode, chlorine at the anode; the thermodynamic minimum is $2.71 + 1.36 = 4.07\ \mathrm{V}$ (industrial cells run hotter and lower on entropy grounds — textbook level). (b) In water, four species compete. At the cathode, $\mathrm{Na^+}$ ($-2.71\ \mathrm{V}$) cannot compete with water's reduction to $\mathrm{H_2}$ (about $-0.41\ \mathrm{V}$ at $\mathrm{pH}\ 7$): hydrogen gas, not sodium. At the anode the tabulated contest is close — $\mathrm{O_2}$ from water ($+1.23\ \mathrm{V}$) versus $\mathrm{Cl_2}$ from chloride ($+1.36\ \mathrm{V}$) — and thermodynamics alone would predict oxygen; but oxygen evolution carries a large overpotential on many electrodes while chlorine forms comparatively easily on a concentrated brine, so the industrial **chlor-alkali** cell collects $\mathrm{Cl_2}$ at the anode, $\mathrm{H_2}$ at the cathode, and leaves $\mathrm{NaOH}$ in solution. The lesson generalises: electrolysis products are predicted from potentials *and* overpotentials, and the overpotential column is as real as the tabulated one.
:::
:::

::: proposition Faraday's laws of electrolysis {#prop-faraday}
The amount of substance transformed at an electrode is proportional to the charge passed through the cell, and one mole of substance per mole of electrons it carries:
$$
n(\text{element}) = \frac{It}{zF},
\qquad
m = \frac{ItM}{zF},
$$
where $I$ is the current, $t$ the time, $z$ the number of electrons per atom (the charge number: $1$ for $\mathrm{Ag^+}$, $2$ for $\mathrm{Cu^{2+}}$, $3$ for $\mathrm{Al^{3+}}$) and $M$ the molar mass.
:::

::: proof Faraday's laws {#proof-faraday}
Current is charge per unit time, so a current $I$ flowing for $t$ carries charge $Q = It$ coulombs. A coulomb is $1/F$ mole of electrons, so the electrons delivered are $It/F$ moles. Each atom deposited consumes $z$ electrons, so the deposit is $It/(zF)$ moles, and multiplying by $M$ gives the mass. Nothing in the argument mentions voltage, temperature or concentration: Faraday's law is exact accounting, limited in practice only by side reactions and by the **current efficiency** — the fraction of the current that does the intended chemistry. This is the same $F$ that appears in $\Delta_\mathrm{r}G^\circ = -nFE^\circ_\mathrm{cell}$: the electron's charge is the conversion factor between the chemical and electrical ledgers throughout the subject.
:::

::: example Copper plating from a measured current {#ex-faraday-cu}
A current of $0.500\ \mathrm{A}$ is passed through a copper(II) sulfate cell for $30.0\ \mathrm{min}$. What mass of copper plates out, assuming $100\ \%$ efficiency?
::: solution
$Q = It = 0.500\ \mathrm{A} \times 1800\ \mathrm{s} = 900\ \mathrm{C}$. With $z = 2$:
$$
n(\mathrm{Cu}) = \frac{900\ \mathrm{C}}{2 \times 96\,485\ \mathrm{C\,mol^{-1}}} = 4.66\times10^{-3}\ \mathrm{mol},
\qquad
m = 4.66\times10^{-3} \times 63.55 = 0.296\ \mathrm{g}.
$$
One faraday, $96\,485\ \mathrm{C}$, is a large charge — a torch bulb's worth for a day and a half — so electroplating currents of amperes for hours move only grams: another way of seeing that the mole is a large number and the electron a small charge.
:::
:::

::: warning Electrolysis is decided by kinetics as well as thermodynamics {#warn-discharge}
Predicting discharge order from tabulated $E^\circ$ alone works only when the candidates' potentials are far apart and no gas is involved. Overpotentials reorder close contests (chlorine before oxygen in brine; hydrogen before many metals on mercury and lead). Concentration shifts the tabulated values by the Nernst equation — $59\ \mathrm{mV}$ per decade at $n = 1$ — so "which metal plates first" depends on how much of each is left: a mixture of $\mathrm{Cu^{2+}}$ and $\mathrm{Zn^{2+}}$ deposits copper first, and by the time zinc begins, the copper remaining is smaller than $10^{-37}$ of its original amount, which is why electrorefining purifies copper to better than $99.99\ \%$. And aqueous chemistry quietly adds water itself to the candidate list at both electrodes. Treat the table as the first draft of the prediction, never the final one.
:::

## Corrosion, batteries, and where the electrons go

Corrosion is a galvanic cell with the wire hidden. A drop of water on iron dissolves oxygen and carbon dioxide, and the iron surface becomes a patchwork of micro-electrodes: at anodic patches iron oxidises, $\mathrm{Fe \rightarrow Fe^{2+} + 2\,e^-}$ ($E^\circ = -0.44\ \mathrm{V}$), and the electrons flow through the metal to cathodic patches where dissolved oxygen is reduced, $\mathrm{O_2 + 2\,H_2O + 4\,e^- \rightarrow 4\,OH^-}$ — a cell with an open-circuit voltage approaching $1.7\ \mathrm{V}$. The $\mathrm{Fe^{2+}}$ and $\mathrm{OH^-}$ meet, oxidise further, and return as hydrated $\mathrm{Fe_2O_3}$: rust, which is porous, protects nothing, and lets the cell run until the nail is gone. Salt accelerates corrosion by making the electrolyte conducting; acid by feeding the cathode reaction with protons. Protection follows the cell diagram: **sacrificial protection** bolts a metal with a more negative potential — zinc, $-0.76\ \mathrm{V}$, or magnesium, $-2.37\ \mathrm{V}$ — to the structure, so the bolt becomes the anode and corrodes instead of the iron; **cathodic protection** does the same with a power supply, forcing the whole structure to be a cathode. Ships' hulls, jetties and buried pipelines are protected this way, and the "sacrificial anode" you replace every few years is doing exactly the electrochemical job its name says.

Batteries are the same cells engineered to hold their voltage. A **primary cell** runs one reaction to completion (alkaline cells: zinc and $\mathrm{MnO_2}$); a **secondary cell** is driven backwards by charging — the lead-acid battery, $\mathrm{Pb + PbO_2 + 2\,H_2SO_4 \rightarrow 2\,PbSO_4 + 2\,H_2O}$ with $E^\circ_\mathrm{cell} \approx 2.05\ \mathrm{V}$ per cell and six cells in series under your car bonnet; a **fuel cell** never runs down because its reagents are fed from outside, the hydrogen–oxygen cell having $E^\circ = 1.23\ \mathrm{V}$ in principle and about $0.7\ \mathrm{V}$ in practice, the difference paid as overpotential and heat. Lithium dominates portable energy because $E^\circ(\mathrm{Li^+/Li}) \approx -3.04\ \mathrm{V}$ is the most negative potential of any practical couple and lithium is the lightest metal — volts per gram, not volts per mole, decide a phone battery; in lithium-ion cells the lithium is never metal but an ion shuttled between graphite and a metal oxide, which is why the cell is safe enough for a pocket. Aluminium's late arrival in 1886 was the same arithmetic: $E^\circ(\mathrm{Al^{3+}/Al}) = -1.66\ \mathrm{V}$ means no chemical reductant will do the job cheaply, and aluminium had to wait for abundant electricity — the Hall–Héroult process is electrochemistry at industrial scale, and still consumes a few per cent of the world's generated power.

## Where this leads

The link between cell potential and equilibrium used here is the Gibbs energy of [[general-chemistry-2/entropy-free-energy]] read in volts, and the reaction quotient it contains is the one built in [[general-chemistry-2/chemical-equilibrium]]; the ionic strength and conductivity of the solutions the electrons swim through belong to [[general-chemistry-1/solutions-reactions]]. The atlas continues the subject in [[electrochemistry/cell-thermodynamics]] (the full thermodynamics of electrodes), [[electrochemistry/batteries]] and [[electrochemistry/fuel-cells-electrolysis]] (the engineering of the cells sketched above), [[electrochemistry/corrosion]] (the rust problem in depth) and [[electrochemistry/conductivity]] (how electrolytes carry current).

::: summary
- Oxidation state is electron bookkeeping; oxidation and reduction always occur together, and half-reaction balancing makes the electrons cancel — in acid with $\mathrm{H^+}$ and $\mathrm{H_2O}$, in base by finishing in acid and neutralising.
- A galvanic cell separates the halves so electrons travel through a wire; the anode is where oxidation happens (negative in a galvanic cell, positive in an electrolytic one), and the salt bridge carries ions, not electrons.
- Electrode potentials are reduction potentials measured against the SHE ($E^\circ \equiv 0$); $E^\circ_\mathrm{cell} = E^\circ_\text{cathode} - E^\circ_\text{anode}$ with the tabulated values never multiplied — $E$ is intensive.
- $\Delta_\mathrm{r}G^\circ = -nFE^\circ_\mathrm{cell}$: $100\ \mathrm{mV}$ of standard cell voltage is worth about $19\ \mathrm{kJ\,mol^{-1}}$ per electron and roughly ten powers of ten in $K$ for $n = 2$.
- The Nernst equation, $E = E^\circ - (0.05916/n)\log_{10} Q$, gives the voltage away from standard states: $59\ \mathrm{mV}$ per pH-unit-times-(protons/electron), concentration cells, and the reason a dead battery is an equilibrium mixture.
- Electrolysis runs the reaction uphill: products follow from potentials *and* overpotentials, and Faraday's law $m = ItM/zF$ is exact charge accounting.
- Corrosion is a short-circuited galvanic cell; sacrificial and cathodic protection win by being the more easily oxidised partner.
:::

## Exercises

::: exercise Oxidation states {level=1}
Give the oxidation state of the underlined element in each: $\mathrm{\underline{N}O_2}$, $\mathrm{K\underline{Mn}O_4}$, $\mathrm{\underline{Cl}_2O}$, $\mathrm{Fe(\underline{CN})_6^{3-}}$ (Fe), $\mathrm{\underline{H}NO_3}$.
::: solution
$\mathrm{NO_2}$: $x + 2(-2) = 0$, N is $+4$. $\mathrm{KMnO_4}$: K $+1$, O $-2$, so Mn is $+7$. $\mathrm{Cl_2O}$: O is $-2$ (oxygen loses only to fluorine), so each Cl is $+1$. $\mathrm{Fe(CN)_6^{3-}}$: each $\mathrm{CN^-}$ is $-1$, so Fe is $+3$. $\mathrm{HNO_3}$: H $+1$, O $-2$, so N is $+5$.
:::
:::

::: exercise Cell voltage {level=1 check="0.46"}
A cell is made from a silver electrode in $\mathrm{Ag^+}$ solution and a copper electrode in $\mathrm{Cu^{2+}}$ solution. Find the standard cell voltage for the spontaneous reaction. ($E^\circ(\mathrm{Ag^+/Ag}) = +0.80\ \mathrm{V}$, $E^\circ(\mathrm{Cu^{2+}/Cu}) = +0.34\ \mathrm{V}$.) Enter $E^\circ_\mathrm{cell}$ in V.
::: solution
Silver's potential is more positive, so silver is reduced (cathode) and copper oxidised: $E^\circ_\mathrm{cell} = 0.80 - 0.34 = 0.46\ \mathrm{V}$. The reaction is $\mathrm{Cu + 2\,Ag^+ \rightarrow Cu^{2+} + 2\,Ag}$; note that the silver half-reaction is multiplied by two but its potential is not.
:::
:::

::: exercise Balance in acid {level=1}
Balance $\mathrm{Cr_2O_7^{2-} + I^- \rightarrow Cr^{3+} + I_2}$ in acid solution.
::: solution
Reduction: $\mathrm{Cr_2O_7^{2-} + 14\,H^+ + 6\,e^- \rightarrow 2\,Cr^{3+} + 7\,H_2O}$ (Cr $+6 \rightarrow +3$, two chromiums, six electrons). Oxidation: $\mathrm{2\,I^- \rightarrow I_2 + 2\,e^-}$, times three. Adding:
$$
\mathrm{Cr_2O_7^{2-} + 6\,I^- + 14\,H^+ \rightarrow 2\,Cr^{3+} + 3\,I_2 + 7\,H_2O}.
$$
Charge check: $-2 - 6 + 14 = +6$ left, $+6$ right.
:::
:::

::: exercise Nernst for the Daniell cell {level=2 check="1.13"}
A Daniell cell has $[\mathrm{Zn^{2+}}] = 0.010\ \mathrm{mol\,dm^{-3}}$ and $[\mathrm{Cu^{2+}}] = 1.0\ \mathrm{mol\,dm^{-3}}$ at $25\ ^\circ\mathrm{C}$. Find $E_\mathrm{cell}$. ($E^\circ_\mathrm{cell} = 1.10\ \mathrm{V}$.) Enter $E_\mathrm{cell}$ in V.
::: solution
$Q = 0.010$, $n = 2$: $E = 1.10 - (0.05916/2)\log_{10}(0.010) = 1.10 + 0.0592 = 1.13\ \mathrm{V}$. Each tenfold dilution of the product ion adds $29.6\ \mathrm{mV}$; the cell "feels" concentration logarithmically.
:::
:::

::: exercise From voltage to equilibrium {level=2 check="7.8"}
For $\mathrm{2\,Fe^{3+} + 2\,I^- \rightarrow 2\,Fe^{2+} + I_2}$, find $\Delta_\mathrm{r}G^\circ$ and $\log_{10} K$ at $25\ ^\circ\mathrm{C}$. ($E^\circ(\mathrm{Fe^{3+}/Fe^{2+}}) = +0.77\ \mathrm{V}$, $E^\circ(\mathrm{I_2/I^-}) = +0.54\ \mathrm{V}$.) Enter $\log_{10} K$.
::: solution
$E^\circ_\mathrm{cell} = 0.77 - 0.54 = 0.23\ \mathrm{V}$ with $n = 2$:
$$
\Delta_\mathrm{r}G^\circ = -2 \times 96\,485 \times 0.23 = -44\ \mathrm{kJ\,mol^{-1}},
\qquad
\log_{10} K = \frac{2 \times 0.23}{0.05916} = 7.8.
$$
$K \approx 6\times10^{7}$: the iodide–iron(III) reaction runs essentially to completion, which is why iron(III) solutions cannot be stored with iodide — a nuisance in iodometric titrations and a fact in every rusting pipeline carrying iodised water.
:::
:::

::: exercise Charge and mass {level=2 check="0.296"}
What mass of copper plates out when $0.500\ \mathrm{A}$ flows through a $\mathrm{CuSO_4}$ cell for $30.0\ \mathrm{min}$ at $100\ \%$ current efficiency? ($M(\mathrm{Cu}) = 63.55\ \mathrm{g\,mol^{-1}}$.) Enter the mass in g.
::: solution
$m = ItM/(zF) = (0.500 \times 1800 \times 63.55)/(2 \times 96\,485) = 0.296\ \mathrm{g}$. Halving the current or the time halves the mass — Faraday's law is linear, and that linearity is exactly what makes coulometry an absolute method of analysis.
:::
:::

::: exercise How complete is a displacement? {level=3}
An excess of zinc granules is added to $1.0\ \mathrm{dm^3}$ of $1.0\ \mathrm{mol\,dm^{-3}}$ $\mathrm{Cu^{2+}}$. Using $E^\circ_\mathrm{cell} = 1.10\ \mathrm{V}$ for $\mathrm{Zn + Cu^{2+} \rightarrow Zn^{2+} + Cu}$, find the concentration of $\mathrm{Cu^{2+}}$ left at equilibrium and comment on whether the reaction is "complete".
::: solution
$\log_{10} K = 2 \times 1.10/0.05916 = 37.2$, so $K = 1.5\times10^{37} = [\mathrm{Zn^{2+}}]/[\mathrm{Cu^{2+}}]$. The reaction moves essentially $1.0\ \mathrm{mol}$ of $\mathrm{Cu^{2+}}$ into solution as $\mathrm{Zn^{2+}}$, so $[\mathrm{Zn^{2+}}] \approx 1.0\ \mathrm{mol\,dm^{-3}}$ and
$$
[\mathrm{Cu^{2+}}] = \frac{1.0}{1.5\times10^{37}} = 6.6\times10^{-38}\ \mathrm{mol\,dm^{-3}}.
$$
That is less than one ion in a volume of water larger than the world's oceans — "complete" is not an exaggeration but an understatement. Note what the number means operationally: no analytical method can detect the remaining copper, yet thermodynamically it is not zero. Equilibrium constants do not forbid reactions; they price them, and $10^{37}$ is a price no practical concentration can pay.
:::
:::

::: exercise A cell that measures pH {level=3 check="2.00"}
A cell is built from two hydrogen electrodes at $1\ \mathrm{bar}$: one in solution of $\mathrm{pH}\ 0$, the other in an unknown solution. At $25\ ^\circ\mathrm{C}$ the measured voltage is $0.118\ \mathrm{V}$, the unknown side being the anode. Find its pH.
::: solution
For the cell $\mathrm{Pt,H_2}\,|\,\mathrm{H^+}(\text{unknown})\,\|\,\mathrm{H^+}(1.0)\,|\,\mathrm{H_2},\mathrm{Pt}$ the overall reaction is $\mathrm{H^+}(1.0\ \mathrm{M}) \rightarrow \mathrm{H^+}(\text{unknown})$ with $n = 1$ and $E^\circ = 0$:
$$
E = -\frac{0.05916}{1}\log_{10}\frac{[\mathrm{H^+}]_\text{unknown}}{1.0} = 0.05916 \times \mathrm{pH}.
$$
So $\mathrm{pH} = 0.118/0.05916 = 2.00$. The unknown is the anode because the *dilute* acid side is oxidised — hydrogen dissolves there to raise its proton concentration, the concentration cell's universal direction. This is the operating principle of every potentiometric pH measurement, and why the meter reads voltage and reports pH through a calibration.
:::
:::

::: exercise Silver plating with losses {level=3 check="2.0"}
A silver-plating bath runs at $0.75\ \mathrm{A}$ for $45.0\ \mathrm{min}$. The current efficiency for silver deposition is $89\ \%$ (the rest evolves hydrogen). What mass of silver is deposited? ($M(\mathrm{Ag}) = 107.87\ \mathrm{g\,mol^{-1}}$, $z = 1$.) Enter the mass in g.
::: solution
$Q = 0.75 \times 2700 = 2025\ \mathrm{C}$; total electrons $= 2025/96\,485 = 0.0210\ \mathrm{mol}$. At $89\ \%$ efficiency, $0.0187\ \mathrm{mol}$ plate silver:
$$
m = 0.89 \times \frac{2025 \times 107.87}{96\,485} = 2.0\ \mathrm{g}.
$$
The theoretical maximum is $2.26\ \mathrm{g}$; the $0.25\ \mathrm{g}$ difference is hydrogen, wasted current and — if the bath is acidic — a safety note: the cathode is making a flammable gas, so plating rooms ventilate and forbid flames. Current efficiency is the practical correction that separates Faraday's exact accounting from the mass you actually weigh.
:::
:::
