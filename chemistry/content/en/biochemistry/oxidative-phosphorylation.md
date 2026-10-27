Oxidising one mole of NADH with oxygen releases $219\ \mathrm{kJ}$ of free energy under standard conditions ([[biochemistry/bioenergetics#ex-nadh-o2]]), and a mitochondrion conserves well over half of it as ATP. Yet no enzyme of the respiratory chain makes ATP, and the enzyme that does make ATP never touches an electron. For twenty years after the Second World War biochemists searched for the "high-energy intermediate" that must, by analogy with glycolysis, connect the two. It does not exist. In 1961 Peter Mitchell proposed instead that the link is a **proton gradient** across the inner mitochondrial membrane: the electron carriers pump protons out of the matrix, and the protons flowing back through a separate enzyme drive the phosphorylation of ADP. The idea was resisted for a decade, then confirmed in every detail, and it turned out to be universal: bacteria, mitochondria and chloroplasts all make most of their ATP by **chemiosmotic coupling**, and the same membrane gradients drive transport and even bacterial flagella.

This chapter follows the electrons from NADH and $\mathrm{FADH_2}$ to oxygen through the four complexes of the respiratory chain, quantifies the proton-motive force they create, shows how ATP synthase — a rotary motor — turns that force into ATP, and calculates how many ATP a glucose molecule is worth. The last part runs the same machinery in reverse direction of energy flow: in photosynthesis, light drives electrons *uphill* from water to $\mathrm{NADP^+}$, and the resulting proton gradient again makes ATP. The tools are reduction potentials and $\Delta_\mathrm{r}G' = -nF\Delta E'$ ([[biochemistry/bioenergetics#prop-redox]]), the electrochemical potential of an ion across a membrane ([[biochemistry/carbohydrates-lipids#prop-transport]]), and the NADH and $\mathrm{FADH_2}$ bookkeeping of [[biochemistry/glycolysis-citric-acid]]. Reduction potentials are the biochemical standard values at pH 7 tabulated in [[biochemistry/bioenergetics]] (Berg et al., 9th ed.; Nelson and Cox, 8th ed.); $F = 96\,485\ \mathrm{C\,mol^{-1}}$. The lesson is for education only; where inhibitors and toxins appear, they illustrate mechanisms.

## The respiratory chain

Mitochondria have two membranes. The outer one is permeable to small molecules through porin channels; the **inner membrane**, folded into cristae, is impermeable to almost everything, including protons, and holds the respiratory chain and ATP synthase. Its inner side faces the **matrix**, where the citric acid cycle and β-oxidation run and the NADH is made; we call it the **N side** (negative). Its outer side faces the intermembrane space, continuous with the cytosol for small molecules; we call it the **P side** (positive).

Electrons pass from NADH to oxygen through four large complexes and two mobile carriers, in order of increasing reduction potential:

| carrier or complex | redox centres | electrons from → to | $E^{\circ\prime}$ of acceptor / V | protons to P side per $2\,\mathrm{e^-}$ |
|---|---|---|---|---|
| Complex I (NADH–ubiquinone oxidoreductase) | FMN, 8–9 Fe–S clusters | NADH → ubiquinone | $+0.045$ | 4 |
| Complex II (succinate dehydrogenase) | FAD, Fe–S, haem *b* | succinate → ubiquinone | $+0.045$ | 0 |
| ubiquinone (Q) | quinone/quinol | mobile in the membrane | — | — |
| Complex III (cytochrome *bc*₁) | haems *b*_L, *b*_H, Rieske Fe–S, haem *c*₁ | ubiquinol → cytochrome *c* | $+0.254$ | 4 (Q cycle) |
| cytochrome *c* | haem *c* | mobile on the P face | — | — |
| Complex IV (cytochrome *c* oxidase) | Cu_A, haem *a*, haem *a*₃–Cu_B | cytochrome *c* → $\mathrm{O_2}$ | $+0.816$ | 2 (plus 2 consumed from the N side) |

The proton numbers are the consensus values derived from structures and from measurements on isolated mitochondria (Nicholls and Ferguson, *Bioenergetics*, 4th ed.): 10 protons per NADH, 6 per succinate.

**Complex I** is an L-shaped enzyme of some 45 subunits in mammals. NADH gives a hydride to a flavin (FMN) in the arm that projects into the matrix; the electrons then travel one at a time along a chain of iron–sulfur clusters about $1\ \mathrm{nm}$ apart — electron tunnelling, with rates that fall off exponentially with distance — to ubiquinone, bound where the arm meets the membrane. The free energy of quinone reduction drives conformational changes that pump four protons through antiporter-like subunits in the membrane arm, up to $20\ \mathrm{nm}$ away from the redox chemistry. **Complex II** is the citric acid cycle's succinate dehydrogenase; its electrons enter the chain at ubiquinone, bypassing Complex I, and the small free-energy change of succinate oxidation (about $-2.7\ \mathrm{kJ\,mol^{-1}}$ per $2\,\mathrm{e^-}$) is not enough to pump protons. The electron-transferring flavoprotein of fatty-acid oxidation and the glycerol 3-phosphate dehydrogenase of the glycerol phosphate shuttle also feed ubiquinone directly.

**Ubiquinone** (coenzyme Q) is a benzoquinone with a long isoprenoid tail that keeps it in the lipid bilayer. It can accept one electron to form the semiquinone radical or two electrons and two protons to form ubiquinol, $\mathrm{QH_2}$; it is the junction where two-electron carriers (NADH, flavins) meet one-electron carriers (iron–sulfur clusters, cytochromes). **Complex III** exploits this through the **Q cycle**. Ubiquinol is oxidised at a site near the P side, releasing its two protons there; one electron goes through the Rieske iron–sulfur protein and cytochrome *c*₁ to cytochrome *c*, while the other goes back across the membrane through the two *b* haems to reduce a quinone at a site near the N side. Two turns of this cycle oxidise two $\mathrm{QH_2}$ and reduce one Q (taking two protons from the matrix), so per pair of electrons delivered to cytochrome *c* four protons are released on the P side — twice what a simple carrier would achieve. **Cytochrome *c***, a small soluble haem protein on the P face, carries one electron at a time to **Complex IV**, where the electrons pass through the copper centre Cu_A and haem *a* to the binuclear haem *a*₃–Cu_B site that binds $\mathrm{O_2}$. Four electrons reduce one $\mathrm{O_2}$ to two water molecules without releasing partially reduced oxygen species, using four "chemical" protons taken from the N side; the enzyme also pumps four more protons per $\mathrm{O_2}$ from N to P.

::: example The free-energy budget of the chain {#ex-chain}
Using standard biochemical reduction potentials (NAD⁺/NADH $-0.320$, fumarate/succinate $+0.031$, Q/QH₂ $+0.045$, cytochrome *c* $+0.254$, O₂/H₂O $+0.816\ \mathrm{V}$), calculate $\Delta_\mathrm{r}G^{\circ\prime}$ per two electrons for each of Complexes I–IV, and compare each with the free energy needed to move its protons across a membrane where each proton costs $17.4\ \mathrm{kJ\,mol^{-1}}$ (the value found in [[#ex-pmf]] below).
::: solution
By [[biochemistry/bioenergetics#prop-redox]], $\Delta_\mathrm{r}G^{\circ\prime} = -2F\Delta E^{\circ\prime}$ with $2F = 1.9297\times10^{5}\ \mathrm{C\,mol^{-1}}$. What a complex must pay for is the number of positive charges it moves from the N side to the P side, each costing $F\Delta p$; protons that are merely taken up or released on one side as part of the chemistry (the "scalar" protons of quinone reduction and oxidation, or of water formation) cost nothing extra.

| complex | $\Delta E^{\circ\prime}$ / V | $\Delta_\mathrm{r}G^{\circ\prime}$ / $\mathrm{kJ\,mol^{-1}}$ | charges moved N → P | cost / $\mathrm{kJ\,mol^{-1}}$ |
|---|---|---|---|---|
| I: NADH → Q | $0.365$ | $-70.4$ | 4 | $69.8$ |
| II: succinate → Q | $0.014$ | $-2.7$ | 0 | $0$ |
| III: QH₂ → cyt *c* | $0.209$ | $-40.3$ | 2 | $34.9$ |
| IV: cyt *c* → $\tfrac12\mathrm{O_2}$ | $0.562$ | $-108.4$ | 4 | $69.8$ |

The redox total from NADH is $-219.2\ \mathrm{kJ\,mol^{-1}}$, as it must be, and the charges total $4 + 2 + 4 = 10$, matching the ten protons per NADH: in Complex III the Q cycle releases four protons on the P side, but two of them are the scalar protons of ubiquinol, and only two charges actually cross the membrane (the electron passing from haem $b_\mathrm{L}$ to $b_\mathrm{H}$ with the uptake of two matrix protons at the N-side quinone site). In Complex IV, two protons are pumped and two electrons arriving from the P side meet two matrix protons at the active site, which is electrically equivalent to moving four charges.

Complex I's budget is almost exactly balanced: the redox drop just pays for four charges. In mitochondria Complex I indeed operates close to equilibrium and can run backwards — **reverse electron transport**, reducing $\mathrm{NAD^+}$ with electrons from ubiquinol at the expense of the proton gradient — when the proton-motive force is high. Complexes III and IV have a margin, and Complex IV, with the largest surplus ($39\ \mathrm{kJ\,mol^{-1}}$), is effectively irreversible. The chain is not a staircase of equal steps: some steps are tuned near equilibrium and some are strongly irreversible, exactly as in glycolysis ([[biochemistry/glycolysis-citric-acid#def-control]]). (Cellular ratios of oxidised to reduced carriers shift each $\Delta E'$ by tens of millivolts, but do not change the picture.)
:::
:::

::: widget graph
nodes: NADH@0,2; CI@1.5,2; Succinate@0,0; CII@1.5,0; Q@3,1; CIII@4.5,1; cytc@6,1; CIV@7.5,1; O2@9,1
edges: NADH>CI; CI>Q:4; Succinate>CII; CII>Q; Q>CIII; CIII>cytc:4; cytc>CIV; CIV>O2:2
algorithm: none
caption: Electron flow in the mitochondrial respiratory chain. Electrons from NADH enter at Complex I (CI) and those from succinate at Complex II (CII); both converge on the membrane pool of ubiquinone (Q), pass through Complex III (CIII) to cytochrome *c* (cytc) and through Complex IV (CIV) to oxygen. Edge labels give the protons translocated from the matrix (N side) to the P side per pair of electrons: 4 at Complex I, 4 at Complex III (the Q cycle), 2 at Complex IV, none at Complex II. Totals: 10 per NADH, 6 per succinate.
:::

## The proton-motive force

Pumping a proton out of the matrix does two kinds of work at once. It moves a positive charge from the negative to the positive side of the membrane, against the membrane potential $\Delta\psi$; and it moves a proton from lower to higher concentration, against the pH difference. Both kinds of work are stored, and both can be recovered when the proton flows back.

::: proposition The proton-motive force {#prop-pmf}
Let $\Delta\psi = \psi_\mathrm{P} - \psi_\mathrm{N}$ be the electrical potential difference across the membrane (positive outside) and $\Delta\mathrm{pH} = \mathrm{pH}_\mathrm{N} - \mathrm{pH}_\mathrm{P}$ the pH difference (positive when the matrix is more alkaline). The free-energy change for moving one mole of protons from the N side to the P side is
$$
\Delta G_{\mathrm{H^+}}(\mathrm{N}\rightarrow\mathrm{P}) = F\,\Delta p, \qquad
\Delta p = \Delta\psi + \frac{2.303\,RT}{F}\,\Delta\mathrm{pH},
$$ {#eq-pmf}
where $\Delta p$, measured in volts, is the **proton-motive force**. At $37\ \mathrm{^\circ C}$, $2.303RT/F = 61.5\ \mathrm{mV}$, so each pH unit is worth $61.5\ \mathrm{mV}$. Protons flowing back into the matrix release $F\Delta p$ per mole, which ATP synthase and proton-coupled transporters can use. Typical respiring mammalian mitochondria have $\Delta\psi \approx 150$–$180\ \mathrm{mV}$ and $\Delta\mathrm{pH} \approx 0.5$–$1$, so $\Delta p \approx 180$–$220\ \mathrm{mV}$, mostly electrical; in chloroplast thylakoids the balance is reversed, and $\Delta p$ is mostly a pH difference. The relation assumes ideal-dilute proton activities and a uniform potential in each bulk phase.
:::

::: proof Electrochemical potential of the proton
The electrochemical potential of an ion of charge number $z$ in a phase of electrical potential $\psi$ is $\tilde\mu = \mu^\circ + RT\ln c + zF\psi$ ([[biochemistry/carbohydrates-lipids#prop-transport]]), the chemical potential plus the electrical energy per mole. For protons ($z = +1$), moving one mole from N to P changes the free energy by
$$
\Delta G = \tilde\mu_\mathrm{P} - \tilde\mu_\mathrm{N} = RT\ln\frac{[\mathrm{H^+}]_\mathrm{P}}{[\mathrm{H^+}]_\mathrm{N}} + F(\psi_\mathrm{P} - \psi_\mathrm{N}) .
$$
Since $\ln([\mathrm{H^+}]_\mathrm{P}/[\mathrm{H^+}]_\mathrm{N}) = 2.303(\mathrm{pH}_\mathrm{N} - \mathrm{pH}_\mathrm{P}) = 2.303\,\Delta\mathrm{pH}$, this is $\Delta G = F\Delta\psi + 2.303RT\,\Delta\mathrm{pH} = F\left[\Delta\psi + (2.303RT/F)\Delta\mathrm{pH}\right] = F\Delta p$. The reverse movement has $\Delta G = -F\Delta p$. Numerically $2.303RT/F = 2.303 \times 8.314 \times 310.15/96\,485 = 0.0615\ \mathrm{V}$. This is the Nernst argument of [[biochemistry/bioenergetics#prop-redox]], with a membrane separating two solutions in place of two electrodes: a proton gradient is a battery whose voltage is $\Delta p$.
:::

The division between $\Delta\psi$ and $\Delta\mathrm{pH}$ is set by the membrane's other ion movements. Because the inner membrane has a small electrical capacitance (about $1\ \mu\mathrm{F\,cm^{-2}}$), pumping only a tiny number of protons builds up a large potential: the protons move but barely change the matrix pH unless counter-ions also move. In thylakoids, chloride and magnesium ions move to neutralise the charge, so the potential stays small and the protons accumulate, lowering the lumen pH by two to three units.

::: example The proton-motive force of a mitochondrion {#ex-pmf}
Respiring liver mitochondria at $37\ \mathrm{^\circ C}$ have $\Delta\psi = 150\ \mathrm{mV}$ (matrix negative) and a matrix pH 0.50 units above the intermembrane space. Calculate $\Delta p$ and the free energy released per mole of protons re-entering the matrix. What fraction of $\Delta p$ is electrical?
::: solution
By [[#eq-pmf]],
$$
\Delta p = 0.150\ \mathrm{V} + (0.0615\ \mathrm{V})(0.50) = 0.150 + 0.031 = 0.181\ \mathrm{V} .
$$
The free energy released per mole of protons flowing back is $F\Delta p = 96\,485 \times 0.181 = 1.74\times10^{4}\ \mathrm{J\,mol^{-1}} = 17.4\ \mathrm{kJ\,mol^{-1}}$. The electrical part is $150/181 = 83\,\%$. Ten protons per NADH store $174\ \mathrm{kJ}$ per mole of NADH, about $80\,\%$ of the $219\ \mathrm{kJ\,mol^{-1}}$ released by NADH oxidation under standard conditions — the first, and efficient, energy conversion of oxidative phosphorylation.
:::
:::

::: widget plot
f: s + 61.5*x; 1000*g/(n*96.485)
x: 0, 2
y: 0, 300
sliders: s=150:0:250:1; g=50:35:65:0.5; n=3.67:2:5:0.01
labels: \Delta p\ \text{(mV)}; \text{minimum } \Delta p \text{ to make ATP}
caption: The proton-motive force $\Delta p = \Delta\psi + 61.5\,\Delta\mathrm{pH}$ (mV, at $37\ \mathrm{^\circ C}$) against $\Delta\mathrm{pH}$, with $\Delta\psi$ on the slider `s` (mV). The horizontal line is the smallest $\Delta p$ that can make ATP, $\Delta G_\mathrm{p}/nF$, for a phosphorylation potential `g` (in $\mathrm{kJ\,mol^{-1}}$) and `n` protons per ATP (starting at $3.67$, the mammalian value including transport, [[#prop-atp-stoich]]). Where the sloping line lies above the horizontal one, ATP synthesis is thermodynamically possible. Notice that the same $\Delta p$ can be made from a large voltage with little pH gradient (mitochondria) or from a large pH gradient with little voltage (thylakoids); try `s = 20` and $\Delta\mathrm{pH} \approx 3$ for the chloroplast case.
:::

### Evidence for chemiosmosis

Mitchell's hypothesis made sharp predictions, all borne out. Oxidative phosphorylation requires an intact, sealed membrane; respiration acidifies the external medium; and an artificially imposed proton gradient should make ATP without any electron transport. The decisive experiment of this last kind was done on chloroplasts by André Jagendorf and Ernest Uribe in 1966: thylakoids soaked in a buffer at pH 4 and then transferred to pH 8 with ADP and phosphate made ATP in the dark. Later, Efraim Racker and Walther Stoeckenius reconstituted vesicles containing only bacteriorhodopsin (a light-driven proton pump from an archaeon) and mitochondrial ATP synthase, and showed that light made ATP: the pump and the synthase need share nothing but the membrane and the protons.

**Uncouplers** confirm the picture from the other side. Lipid-soluble weak acids such as 2,4-dinitrophenol carry protons back across the inner membrane, collapsing $\Delta p$: respiration then runs fast, oxygen is consumed and heat is produced, but no ATP is made. Brown adipose tissue uses the same principle deliberately. Its mitochondria contain **uncoupling protein 1** (UCP1, thermogenin), a regulated proton channel opened by fatty acids, so that the free energy of fuel oxidation becomes heat — non-shivering thermogenesis in newborn mammals and in hibernating animals. (The toxicity of chemical uncouplers follows directly from this mechanism: uncontrolled heat production and loss of ATP synthesis. This lesson describes the mechanism only.)

## ATP synthase: a rotary motor

ATP synthase ($\mathrm{F_oF_1}$-ATPase) has two parts. The **F₁** head, projecting into the matrix, is a ring of three α and three β subunits around a central γ subunit; the catalytic sites are on the β subunits. The **F₀** part in the membrane contains a ring of $c$ subunits (8 in animal mitochondria, 10 in yeast mitochondria, 14 in spinach chloroplasts, and other numbers in bacteria) and an *a* subunit beside it. A peripheral stalk holds the α₃β₃ head stationary against the *a* subunit, while the γ subunit is attached to the *c* ring and turns with it.

Protons enter a half-channel in subunit *a* from the P side and bind to a conserved acidic residue (an aspartate or glutamate) on a *c* subunit, neutralising it; the neutral *c* subunit can rotate into the lipid; after almost a full turn of the ring it reaches a second half-channel open to the matrix, where the proton leaves. A salt bridge to an arginine of subunit *a* prevents the ring from slipping back. Net proton flow from P to N therefore turns the *c* ring and the γ subunit with it, like water turning a turbine.

The asymmetric γ subunit, turning inside the α₃β₃ hexamer, forces the three β subunits through three conformations in turn — Paul Boyer's **binding-change mechanism**: an *open* state (O) that releases ATP and binds ADP and $\mathrm{P_i}$ loosely, a *loose* state (L) that holds them, and a *tight* state (T) in which ADP and $\mathrm{P_i}$ condense to ATP. Remarkably, the condensation in the T site has an equilibrium constant near 1: the enzyme can make ATP from bound ADP and phosphate with almost no free-energy input. The energy from proton flow is spent not on forming the bond but on **releasing** the tightly bound ATP, by converting T to O. Every $120^\circ$ of rotation advances each β subunit by one state and releases one ATP, so one complete revolution makes three ATP. In 1997 Hiroyuki Noji, Ryohei Yasuda, Masasuke Yoshida and Kazuhiko Kinosita attached a fluorescent actin filament to the γ subunit of an immobilised $\mathrm{F_1}$ and watched it rotate under a microscope as ATP was hydrolysed — the enzyme run backwards, as an ATP-driven motor.

::: proposition The ATP stoichiometry of oxidative phosphorylation {#prop-atp-stoich}
Let the $c$ ring of ATP synthase have $n_c$ subunits, each carrying one proton per revolution, and let one further proton be needed to import $\mathrm{P_i}$ and exchange ADP for ATP across the inner membrane. Then the number of protons that must flow back into the matrix per ATP delivered to the cytosol is
$$
n_{\mathrm{H^+}/\mathrm{ATP}} = \frac{n_c}{3} + 1 = \frac{8}{3} + 1 = 3.67 \quad (\text{mammals}),
$$ {#eq-h-atp}
and the **P/O ratio** (ATP made per pair of electrons passed to oxygen, i.e. per oxygen atom reduced) is the number of protons pumped divided by $n_{\mathrm{H^+}/\mathrm{ATP}}$:
$$
\mathrm{P/O}(\mathrm{NADH}) = \frac{10}{3.67} = 2.7, \qquad \mathrm{P/O}(\text{succinate or } \mathrm{FADH_2}) = \frac{6}{3.67} = 1.6 .
$$ {#eq-po}
Measured P/O ratios are somewhat lower, about $2.5$ and $1.5$, because some protons leak back through the membrane without passing through the synthase; these are the values used in metabolic bookkeeping. The ratios are not whole numbers, because ATP synthesis and electron transport are coupled only through the shared proton gradient, not through a fixed chemical stoichiometry.
:::

::: proof Counting protons per turn
One full rotation of the $c$ ring moves each of its $n_c$ subunits once past subunit *a*, so $n_c$ protons pass from P to N. The same rotation turns γ through $360^\circ$, taking each of the three β subunits once through O → L → T → O and releasing three ATP. So the synthase itself uses $n_c/3$ protons per ATP: $8/3 = 2.67$ with the eight-subunit ring of mammalian mitochondria. ATP is made in the matrix but used in the cytosol. The adenine nucleotide translocase exchanges matrix $\mathrm{ATP^{4-}}$ for cytosolic $\mathrm{ADP^{3-}}$, moving one net negative charge outwards, which is driven by (and dissipates) one charge's worth of $\Delta\psi$; the phosphate carrier imports $\mathrm{H_2PO_4^-}$ together with one $\mathrm{H^+}$ (electroneutral, but consuming one proton's worth of $\Delta\mathrm{pH}$). Together these cost the equivalent of one proton re-entering per ATP exported, giving $n_c/3 + 1 = 11/3 = 3.67$. Dividing the protons pumped per two electrons (10 from NADH, 6 from ubiquinol via Complex II; see the table of the respiratory chain) by 3.67 gives $2.73$ and $1.64$.
:::

::: example Is the proton-motive force enough? {#ex-atp-energy}
With the $\Delta p$ of [[#ex-pmf]] ($0.181\ \mathrm{V}$), (a) how much free energy is available per ATP made in the matrix, and per ATP delivered to the cytosol? (b) Compare these with the cytosolic phosphorylation potential of about $+52\ \mathrm{kJ\,mol^{-1}}$ for ATP synthesis. (c) Estimate the torque that the proton flow exerts on the γ subunit.
::: solution
(a) Per proton, $F\Delta p = 17.4\ \mathrm{kJ\,mol^{-1}}$. In the matrix, $8/3$ protons give $2.667 \times 17.4 = 46.5\ \mathrm{kJ}$ per mole of ATP; including export, $3.67 \times 17.4 = 64.0\ \mathrm{kJ\,mol^{-1}}$.

(b) Cytosolic ATP costs about $52\ \mathrm{kJ\,mol^{-1}}$ to make ([[biochemistry/bioenergetics#ex-atp-cell]]), comfortably less than the $64\ \mathrm{kJ}$ supplied; the margin keeps the synthase running forwards at a useful rate. The matrix phosphorylation potential is lower than the cytosolic one (the matrix ATP/ADP ratio is smaller), so $46.5\ \mathrm{kJ}$ suffices there; the translocase then uses part of $\Delta\psi$ to export ATP *against* its concentration gradient, maintaining the high cytosolic ATP/ADP ratio. The cell, in other words, spends a quarter of the proton current on keeping its cytosolic ATP pool far from equilibrium.

(c) Three ATP per revolution, each requiring about $50\ \mathrm{kJ\,mol^{-1}}$, means $50\,000/6.022\times10^{23} = 8.3\times10^{-20}\ \mathrm{J}$ per molecule of ATP, delivered over $120^\circ = 2\pi/3$ radians. Torque is energy per radian: $8.3\times10^{-20}/2.094 = 4.0\times10^{-20}\ \mathrm{N\,m} = 40\ \mathrm{pN\,nm}$. Single-molecule experiments on $\mathrm{F_1}$ measure a torque close to $40\ \mathrm{pN\,nm}$, which means the motor converts free energy into mechanical work with near-100 % efficiency at each step.
:::
:::

::: widget plot
f: 10/(x/3 + 1); 6/(x/3 + 1)
x: 7, 16
y: 0, 3.2
points: 8, 2.727; 10, 2.308; 8, 1.636; 10, 1.385
vlines: 8; 10
labels: \mathrm{P/O}\ \text{(NADH, 10 H}^+\text{)}; \mathrm{P/O}\ \text{(succinate, 6 H}^+\text{)}
caption: Mechanistic P/O ratios from [[#eq-po]] as a function of the number of $c$ subunits in the ATP synthase rotor, assuming one extra proton per ATP for transport. The marked points are for the eight-subunit ring of mammalian mitochondria (P/O $2.73$ and $1.64$) and the ten-subunit ring of yeast mitochondria ($2.31$ and $1.38$). A larger ring needs more protons per revolution, so fewer ATP are made per electron pair, but each ATP can be made against a higher phosphorylation potential at a given $\Delta p$ — a gear ratio tuned by evolution to each organism's membrane.
:::

::: warning ATP synthase does not use the energy to "make the bond", and P/O ratios are not integers
Two ideas from older textbooks still circulate. First, that proton flow drives the chemical step of bond formation. In the binding-change mechanism the condensation of ADP and $\mathrm{P_i}$ in the tight site is close to equilibrium; the free energy of proton flow is used to change binding affinities — above all to release the product. (Many enzymes and motors work this way: energy is spent on conformational changes that alter affinities, not on the bond itself.) Second, that NADH "gives 3 ATP" and $\mathrm{FADH_2}$ "gives 2". These integers predate the structural knowledge of the $c$ ring and the cost of transport; the measured and mechanistic values are about $2.5$ and $1.5$. A non-integer stoichiometry is not paradoxical: the proton gradient decouples the number of electrons transferred from the number of ATP made.
:::

## Respiratory control and the yield from glucose

In intact mitochondria, electron transport and ATP synthesis are tightly coupled through $\Delta p$. If ADP is scarce, ATP synthase stops, protons stop flowing back, $\Delta p$ rises until pumping becomes thermodynamically too hard, and electron transport slows. When ADP is added, the synthase draws down $\Delta p$ and respiration accelerates — **respiratory control**, which makes the rate of oxygen consumption follow the demand for ATP.

::: definition Coupling, respiratory control and uncoupling {#def-coupling}
Electron transport and ATP synthesis are **coupled** when the only significant route by which protons return to the matrix is ATP synthase, so that oxygen consumption and phosphorylation proceed in a fixed ratio, the P/O ratio of [[#prop-atp-stoich]]. Experimentally, the **respiratory control ratio** (RCR) of a mitochondrial preparation is the rate of oxygen consumption with ADP present ("state 3") divided by the rate after the ADP has been phosphorylated ("state 4"); well-coupled mitochondria have RCR values of about 4–10, and an RCR near 1 means the membrane leaks protons. An **uncoupler** is any agent that provides an alternative proton path across the membrane — a lipid-soluble weak acid, an ionophore or a protein channel such as UCP1 — and thereby lowers $\Delta p$, raises the rate of respiration and lowers the P/O ratio, converting the free energy of oxidation into heat.
:::

Inhibitors dissect the chain: rotenone blocks Complex I at its quinone site, antimycin A blocks Complex III at its N-side quinone site, cyanide, azide and carbon monoxide bind to the haem *a*₃–Cu_B site of Complex IV (cyanide to its ferric form), and oligomycin blocks the proton channel of ATP synthase. Their effects in isolated mitochondria — which carriers become reduced and which oxidised, whether succinate rescues respiration — were the main experimental route to the order of the carriers.

NADH made by glycolysis in the cytosol cannot cross the inner membrane. Its electrons enter the matrix through **shuttles**. In the **malate–aspartate shuttle** (heart, liver, kidney), cytosolic oxaloacetate is reduced to malate by NADH, malate enters the matrix and is reoxidised to oxaloacetate, giving matrix NADH; the oxaloacetate returns to the cytosol after transamination to aspartate. The electrons arrive as NADH and are worth $2.5$ ATP. In the **glycerol 3-phosphate shuttle** (skeletal muscle, brain), cytosolic NADH reduces dihydroxyacetone phosphate to glycerol 3-phosphate, which is oxidised by a flavoprotein on the outer face of the inner membrane that reduces ubiquinone directly; the electrons bypass Complex I and are worth $1.5$ ATP.

::: example The ATP yield of glucose {#ex-yield}
Using P/O ratios of $2.5$ for NADH and $1.5$ for $\mathrm{FADH_2}$ (or ubiquinol from a flavoprotein), calculate the ATP yield from the complete oxidation of one glucose with (a) the malate–aspartate shuttle and (b) the glycerol 3-phosphate shuttle, and the overall efficiency of energy conservation.
::: solution
Per glucose ([[biochemistry/glycolysis-citric-acid#prop-glycolysis]], [[biochemistry/glycolysis-citric-acid#prop-tca]]):

| source | yield | ATP (a) | ATP (b) |
|---|---|---|---|
| glycolysis, substrate level | 2 ATP | 2 | 2 |
| glycolysis, cytosolic NADH | 2 NADH | 5.0 | 3.0 |
| pyruvate dehydrogenase | 2 NADH | 5.0 | 5.0 |
| citric acid cycle, substrate level | 2 GTP | 2 | 2 |
| citric acid cycle, NADH | 6 NADH | 15.0 | 15.0 |
| citric acid cycle, $\mathrm{FADH_2}$ | 2 $\mathrm{FADH_2}$ | 3.0 | 3.0 |
| **total** | | **32** | **30** |

So about 30–32 ATP per glucose, of which only 4 are made by substrate-level phosphorylation. The standard free energy of glucose oxidation is about $-2870\ \mathrm{kJ\,mol^{-1}}$. At a cellular phosphorylation potential of $52\ \mathrm{kJ\,mol^{-1}}$, $31 \times 52 = 1.6\times10^{3}\ \mathrm{kJ}$ is conserved, an efficiency of about $56\,\%$; the remainder warms the body. These yields are maxima for tightly coupled mitochondria: proton leak, the use of $\Delta p$ for other transport and variations in shuttle use all lower the real figure.
:::
:::

::: quiz Interpreting an inhibitor experiment
Isolated mitochondria respiring on a substrate that produces NADH (malate plus glutamate) are treated with rotenone, and oxygen consumption stops. Succinate is then added. What happens, and why?
- [x] Oxygen consumption resumes, at a lower P/O ratio, because succinate's electrons enter at ubiquinone, downstream of the Complex I block.
- [ ] Nothing: rotenone blocks the whole chain.
- [ ] Oxygen consumption resumes with the same P/O ratio as before.
- [ ] Oxygen consumption resumes but no ATP is made, because Complex II does not pump protons.
::: solution
Rotenone blocks electron transfer from Complex I to ubiquinone. Succinate is oxidised by Complex II, which reduces ubiquinone directly, so Complexes III and IV can still work. Six protons are pumped per pair of electrons instead of ten, so ATP is made with a P/O of about $1.5$ instead of $2.5$. ATP synthesis does not require every complex to pump; it requires $\Delta p$, which Complexes III and IV maintain.
:::
:::

## Photosynthesis: driving electrons uphill

Photosynthesis reverses the energetics of respiration. Respiration lets electrons fall from NADH ($-0.32\ \mathrm{V}$) to oxygen ($+0.82\ \mathrm{V}$); the **light reactions** of photosynthesis raise electrons from water ($+0.82\ \mathrm{V}$) to $\mathrm{NADP^+}$ ($-0.32\ \mathrm{V}$), and the energy comes from photons. In plants, algae and cyanobacteria the reactions take place in the **thylakoid membranes** of chloroplasts, and the chemistry is organised by two photosystems connected in series, the **Z scheme**.

1. **Photosystem II** (PSII) absorbs a photon (directly or through antenna chlorophylls that funnel excitation energy to it by resonance energy transfer). Its reaction-centre chlorophyll pair, P680, is excited and gives an electron to a pheophytin and then to bound plastoquinone. The oxidised $\mathrm{P680^+}$, with a reduction potential of about $+1.2\ \mathrm{V}$ — the strongest biological oxidant known — takes an electron from a tyrosine, which in turn oxidises the **manganese–calcium cluster** ($\mathrm{Mn_4CaO_5}$) of the oxygen-evolving complex. After four photons have removed four electrons, the cluster oxidises two water molecules to $\mathrm{O_2}$, releasing four protons into the thylakoid **lumen**. (Pierre Joliot's 1969 observation that oxygen is released on every fourth flash of light, and Bessel Kok's 1970 model of the five oxidation states S₀–S₄ of the cluster, established this four-step accumulation.)
2. Reduced **plastoquinol** carries the electrons to the **cytochrome *b*₆*f*** complex, which works like Complex III with a Q cycle and pumps protons into the lumen; plastocyanin, a copper protein, carries them on.
3. **Photosystem I** (PSI) absorbs a second photon; excited P700 reduces a chain of iron–sulfur centres and the soluble iron–sulfur protein **ferredoxin** ($E^{\circ\prime} \approx -0.43\ \mathrm{V}$), and $\mathrm{P700^+}$ is re-reduced by plastocyanin.
4. **Ferredoxin–NADP⁺ reductase** (FNR), a flavoprotein, collects two electrons from two ferredoxins and reduces $\mathrm{NADP^+}$ to NADPH on the stroma side.

The proton gradient across the thylakoid (lumen acidic, $\Delta\mathrm{pH}$ of 2–3 units, small $\Delta\psi$) drives a chloroplast ATP synthase whose $c$ ring has 14 subunits. When the cell needs more ATP than NADPH, electrons from ferredoxin can be returned to the plastoquinone pool (**cyclic electron flow** around PSI), pumping protons and making ATP without making NADPH or oxygen.

::: example The energetics of the light reactions {#ex-light}
(a) Calculate $\Delta_\mathrm{r}G^{\circ\prime}$ for $2\,\mathrm{H_2O} + 2\,\mathrm{NADP^+} \rightarrow \mathrm{O_2} + 2\,\mathrm{NADPH} + 2\,\mathrm{H^+}$ ($E^{\circ\prime}$: NADP⁺/NADPH $-0.324$, O₂/H₂O $+0.816\ \mathrm{V}$). (b) Linear electron flow uses two photons per electron. What energy do the photons supply, at $680\ \mathrm{nm}$, and what fraction is stored in NADPH? (c) Per $\mathrm{O_2}$, 12 protons enter the lumen (4 from water, 8 through cytochrome *b*₆*f*). With 14 $c$ subunits, how many ATP are made per $\mathrm{O_2}$, and is the ATP : NADPH ratio enough for carbon fixation, which needs 3 ATP and 2 NADPH per $\mathrm{CO_2}$?
::: solution
(a) Four electrons pass from water (donor, $+0.816\ \mathrm V$) to $\mathrm{NADP^+}$ (acceptor, $-0.324\ \mathrm V$): $\Delta E^{\circ\prime} = -0.324 - 0.816 = -1.140\ \mathrm V$ and $\Delta_\mathrm{r}G^{\circ\prime} = -4F\Delta E^{\circ\prime} = +4 \times 96\,485 \times 1.140 = +440\ \mathrm{kJ\,mol^{-1}}$ — strongly uphill, the reverse of respiration.

(b) One mole of $680\ \mathrm{nm}$ photons carries $N_\mathrm{A}hc/\lambda = 175.9\ \mathrm{kJ}$ ($1.82\ \mathrm{eV}$ per photon). Four electrons need eight photons: $8 \times 175.9 = 1407\ \mathrm{kJ}$. The fraction stored in NADPH is $440/1407 = 31\,\%$. More is stored in the proton gradient, and much of the rest is the price of making each photochemical step fast and irreversible, so that the absorbed energy is not lost back as fluorescence.

(c) The chloroplast synthase needs $14/3 = 4.67$ protons per ATP (no export step is needed, since the ATP is used in the stroma where it is made). So $12/4.67 = 2.57$ ATP are made per $\mathrm{O_2}$, together with 2 NADPH: a ratio of $1.29$ ATP per NADPH. Carbon fixation needs $3/2 = 1.5$. The shortfall is made up by cyclic electron flow (ATP without NADPH) and by other ATP-generating pathways; linear flow alone cannot run the Calvin cycle.
:::
:::

### Carbon fixation

The ATP and NADPH made in the light are spent in the stroma on the **Calvin cycle** (Calvin–Benson–Bassham cycle), which reduces $\mathrm{CO_2}$ to sugar. Its key enzyme, **ribulose-1,5-bisphosphate carboxylase/oxygenase** (rubisco), adds $\mathrm{CO_2}$ to the enediolate of ribulose 1,5-bisphosphate; the six-carbon β-keto acid formed is hydrated and cleaved into two molecules of 3-phosphoglycerate. These are phosphorylated by ATP and reduced by NADPH to glyceraldehyde 3-phosphate — the gluconeogenic reactions of [[biochemistry/glycolysis-citric-acid]] run with NADPH — and a series of transketolase and aldolase reactions regenerates ribulose 1,5-bisphosphate from five of every six triose phosphates. Per $\mathrm{CO_2}$ fixed, the cycle uses 3 ATP and 2 NADPH, and with at least eight photons per $\mathrm{O_2}$ released the minimum quantum requirement is about 8–10 photons per $\mathrm{CO_2}$.

Rubisco is slow (a few reactions per second per active site) and makes up a large fraction of the soluble protein of leaves, so that it is often described as the most abundant protein on Earth. It is also unspecific: it reacts with $\mathrm{O_2}$ as well as $\mathrm{CO_2}$, starting the wasteful pathway of **photorespiration**. $\mathrm{C_4}$ and CAM plants avoid much of this loss by first fixing $\mathrm{CO_2}$ as a four-carbon acid with PEP carboxylase and releasing it at high concentration around rubisco.

## Where this leads

With the P/O ratios of [[#prop-atp-stoich]], every catabolic pathway can now be priced in ATP: [[biochemistry/lipid-nitrogen-metabolism]] uses them to calculate the yield of fatty-acid oxidation (106 ATP per palmitate) and the cost of the urea cycle, and to explain how fat stores more free energy per gram than carbohydrate. The proton-motive force of [[#prop-pmf]] also drives secondary active transport ([[biochemistry/carbohydrates-lipids]]), the rotation of bacterial flagella and the import of proteins into mitochondria. The electron-transfer centres — iron–sulfur clusters, haems, copper sites, the manganese cluster of PSII — are the subject of [[coordination-chemistry/bioinorganic]], and many of them were identified by their signals in [[spectroscopy/epr]]. The theory of how fast electrons tunnel between centres a nanometre apart is Marcus theory ([[electrochemistry]]), and the absorption and energy transfer in light-harvesting complexes are applications of [[spectroscopy/electronic-spectroscopy]].

::: history
David Keilin rediscovered and named the cytochromes in 1925, observing with a hand spectroscope how their absorption bands in living tissue appear and disappear as they are reduced and oxidised; Otto Warburg identified the iron-containing "respiratory enzyme" that reacts with oxygen and is inhibited by carbon monoxide, for which he received the 1931 Nobel Prize in Physiology or Medicine. Peter Mitchell published the chemiosmotic hypothesis in *Nature* in 1961, against the prevailing search for a chemical high-energy intermediate, and received the 1978 Nobel Prize in Chemistry alone; Jagendorf and Uribe's acid-bath experiment on chloroplasts (1966) and Racker and Stoeckenius's bacteriorhodopsin–ATP synthase vesicles (1974) were among the key confirmations. Paul Boyer proposed the binding-change mechanism in the 1970s, John Walker's group solved the crystal structure of bovine $\mathrm{F_1}$ in 1994, showing three β subunits in different states around an asymmetric γ, and Noji, Yasuda, Yoshida and Kinosita saw the rotation directly in 1997; Boyer and Walker shared the 1997 Nobel Prize in Chemistry (with Jens Skou, for the Na⁺/K⁺-ATPase). On the photosynthetic side, Robert Hill showed in 1937 that isolated chloroplasts evolve oxygen in light when given an artificial electron acceptor (the Hill reaction); Robert Emerson's enhancement experiments of 1957 implied two cooperating light reactions, and Hill and Fay Bendall proposed the Z scheme in 1960. Melvin Calvin, Andrew Benson and James Bassham traced the path of carbon with $^{14}\mathrm{CO_2}$ in algae from the late 1940s, and Calvin received the 1961 Nobel Prize in Chemistry.
:::

::: summary
- The respiratory chain passes electrons from NADH (or succinate) through Complexes I, III and IV (or II, III and IV) to oxygen, via ubiquinone and cytochrome *c*, down a potential drop of $1.14\ \mathrm{V}$ ($-219\ \mathrm{kJ\,mol^{-1}}$ per NADH).
- Complexes I, III and IV pump 4, 4 and 2 protons per pair of electrons (10 per NADH, 6 per succinate); Complex II pumps none; the Q cycle doubles the protons released by Complex III.
- The proton-motive force $\Delta p = \Delta\psi + (2.303RT/F)\Delta\mathrm{pH}$ is about $0.18$–$0.22\ \mathrm{V}$ in mitochondria, mostly electrical; each proton re-entering releases $F\Delta p \approx 17$–$21\ \mathrm{kJ\,mol^{-1}}$.
- ATP synthase is a rotary motor: proton flow turns the $c$ ring and γ subunit, and binding changes in the three β subunits release three ATP per revolution; the energy is spent on product release, not bond formation.
- With $n_c/3 + 1$ protons per exported ATP (3.67 in mammals), P/O ratios are about 2.5 for NADH and 1.5 for $\mathrm{FADH_2}$; complete oxidation of glucose yields about 30–32 ATP.
- Respiratory control couples oxygen consumption to ADP supply; uncouplers and UCP1 dissipate $\Delta p$ as heat.
- Photosynthesis uses two photosystems in series to drive electrons from water to $\mathrm{NADP^+}$ ($+440\ \mathrm{kJ}$ per $\mathrm{O_2}$), building a thylakoid proton gradient for ATP; the Calvin cycle uses 3 ATP and 2 NADPH per $\mathrm{CO_2}$ fixed by rubisco.
:::

## Exercises

::: exercise A mitochondrial proton-motive force {level=1 check="189"}
At $37\ \mathrm{^\circ C}$ a suspension of mitochondria has $\Delta\psi = 140\ \mathrm{mV}$ and $\Delta\mathrm{pH} = 0.80$ (matrix alkaline). Calculate $\Delta p$. (Enter $\Delta p$ in mV to three significant figures.)
::: solution
$\Delta p = 140\ \mathrm{mV} + 61.54\ \mathrm{mV} \times 0.80 = 140 + 49.2 = 189\ \mathrm{mV}$ ([[#eq-pmf]]). Each proton re-entering the matrix releases $96\,485 \times 0.189 = 18.3\ \mathrm{kJ\,mol^{-1}}$.
:::
:::

::: exercise Why Complex II pumps no protons {level=1 check="-2.70"}
Calculate $\Delta_\mathrm{r}G^{\circ\prime}$ for succinate + Q → fumarate + $\mathrm{QH_2}$ using $E^{\circ\prime}$(fumarate/succinate) $= +0.031\ \mathrm V$ and $E^{\circ\prime}$(Q/QH₂) $= +0.045\ \mathrm V$. (Enter $\Delta_\mathrm{r}G^{\circ\prime}$ in $\mathrm{kJ\,mol^{-1}}$ to three significant figures.)
::: solution
$\Delta E^{\circ\prime} = 0.045 - 0.031 = 0.014\ \mathrm V$, so $\Delta_\mathrm{r}G^{\circ\prime} = -2 \times 96\,485 \times 0.014 = -2.70\ \mathrm{kJ\,mol^{-1}}$. Pumping even one proton against $\Delta p \approx 0.18\ \mathrm V$ would cost about $17\ \mathrm{kJ\,mol^{-1}}$, so Complex II cannot pump; it simply feeds electrons into the ubiquinone pool, which is why succinate has a lower P/O ratio than NADH.
:::
:::

::: exercise ATP yield with the glycerol phosphate shuttle {level=1 check="30"}
In skeletal muscle, cytosolic NADH from glycolysis enters the respiratory chain through the glycerol 3-phosphate shuttle. Using P/O ratios of 2.5 (matrix NADH) and 1.5 (ubiquinol from flavoproteins), how many ATP are produced per glucose oxidised completely? (Enter the number of ATP.)
::: solution
As in [[#ex-yield]](b): 2 (glycolysis) + 2 × 1.5 (cytosolic NADH via the shuttle) + 2 × 2.5 (PDH) + 2 (GTP) + 6 × 2.5 (cycle NADH) + 2 × 1.5 ($\mathrm{FADH_2}$) $= 2 + 3 + 5 + 2 + 15 + 3 = 30$ ATP. The shuttle is fast and irreversible but costs one ATP per cytosolic NADH compared with the malate–aspartate shuttle.
:::
:::

::: exercise A different rotor {level=2 check="2.31"}
Yeast mitochondrial ATP synthase has a ring of 10 $c$ subunits. Assuming 10 protons are pumped per NADH and one extra proton per ATP for transport, calculate the mechanistic P/O ratio for NADH. (Enter the P/O ratio to three significant figures.)
::: solution
By [[#eq-h-atp]], $n_{\mathrm{H^+}/\mathrm{ATP}} = 10/3 + 1 = 4.333$, so P/O $= 10/4.333 = 2.31$, lower than the mammalian $2.73$. A larger rotor gears the motor down: each ATP takes more protons, so it can be made against a higher phosphorylation potential (or at a lower $\Delta p$), but fewer ATP are made per electron pair.
:::
:::

::: exercise The threshold proton-motive force {level=2 check="175"}
Inside the matrix, ATP synthesis requires about $45\ \mathrm{kJ\,mol^{-1}}$. If the mammalian synthase uses $8/3$ protons per ATP, what is the minimum $\Delta p$ at which it can make ATP? (Enter $\Delta p$ in mV to three significant figures.)
::: solution
The protons must supply at least the free energy of synthesis: $(8/3)F\Delta p \ge 45\ \mathrm{kJ\,mol^{-1}}$, so $\Delta p \ge 45\,000/(2.667 \times 96\,485) = 0.175\ \mathrm V = 175\ \mathrm{mV}$. Below this the synthase would run backwards as an ATP-driven proton pump — which it does in mitochondria whose respiration is blocked, keeping $\Delta p$ up at the expense of ATP. Real mitochondria operate only a little above this threshold.
:::
:::

::: exercise A photon of far-red light {level=2 check="170.9"}
Photosystem I absorbs maximally near $700\ \mathrm{nm}$. Calculate the energy of one mole of $700\ \mathrm{nm}$ photons, and compare it with the free energy needed to move one electron from plastocyanin ($E^{\circ\prime} \approx +0.37\ \mathrm V$) to ferredoxin ($-0.43\ \mathrm V$). (Enter the energy in $\mathrm{kJ\,mol^{-1}}$ to four significant figures.)
::: solution
$E_\mathrm{m} = N_\mathrm{A}hc/\lambda = (6.022\times10^{23})(6.626\times10^{-34})(2.998\times10^{8})/(7.00\times10^{-7}) = 1.709\times10^{5}\ \mathrm{J\,mol^{-1}} = 170.9\ \mathrm{kJ\,mol^{-1}}$ ($1.77\ \mathrm{eV}$). Moving one mole of electrons up $0.80\ \mathrm V$ needs $F \times 0.80 = 77\ \mathrm{kJ\,mol^{-1}}$, so a single photon has more than enough energy for the PSI step; the excess makes charge separation fast and irreversible.
:::
:::

::: exercise How much of the energy goes into the gradient? {level=3 check="79"}
(a) Show that, for 10 protons pumped per NADH against a proton-motive force $\Delta p$, the free energy stored is $10F\Delta p$ per mole of NADH. (b) For $\Delta p = 0.180\ \mathrm V$, what percentage of the standard free energy of NADH oxidation ($-219.2\ \mathrm{kJ\,mol^{-1}}$) is stored? (c) Why can the percentage not approach 100 % in a working mitochondrion? (Enter the percentage to two significant figures.)
::: solution
(a) Each mole of protons moved from N to P stores $F\Delta p$ ([[#prop-pmf]]); ten moles per mole of NADH store $10F\Delta p$. (b) $10 \times 96\,485 \times 0.180 = 1.737\times10^{5}\ \mathrm J = 173.7\ \mathrm{kJ}$; $173.7/219.2 = 0.79$, i.e. 79 %. (c) If all the redox free energy were stored, every step of the chain would be at equilibrium ($\Delta G = 0$ for redox plus pumping), and by the flux–force relation ([[biochemistry/glycolysis-citric-acid#prop-flux-force]]) the net flux would be zero. A working chain must dissipate part of the energy to run forwards at a finite rate; Complex IV, the most irreversible step, is where most of that dissipation occurs.
:::
:::

::: exercise The acid-bath experiment {level=3 check="-22.8"}
In Jagendorf and Uribe's experiment, thylakoid lumens equilibrated at pH 4 were transferred to a medium at pH 8 (with $\Delta\psi = 0$) at $25\ \mathrm{^\circ C}$. (a) Calculate $\Delta G$ per mole of protons flowing from the lumen to the outside medium. (b) Taking the phosphorylation potential as $50\ \mathrm{kJ\,mol^{-1}}$, how many protons must flow per ATP at minimum, and is the chloroplast ratio of $14/3$ consistent with ATP being made? (Enter $\Delta G$ per mole of protons in $\mathrm{kJ\,mol^{-1}}$ to three significant figures.)
::: hint
Use $\Delta G = RT\ln([\mathrm{H^+}]_\mathrm{out}/[\mathrm{H^+}]_\mathrm{lumen})$ with no electrical term, and $RT\ln 10 = 5.708\ \mathrm{kJ\,mol^{-1}}$ at $298\ \mathrm K$.
:::
::: solution
(a) $\Delta G = RT\ln(10^{-8}/10^{-4}) = -4RT\ln 10 = -4 \times 5.708 = -22.8\ \mathrm{kJ\,mol^{-1}}$. (b) At least $50/22.8 = 2.2$ protons per ATP are needed; the synthase uses $4.67$, which would supply $4.67 \times 22.8 = 106\ \mathrm{kJ}$ per ATP — more than enough, initially. As the protons flow out, the lumen pH rises and the gradient runs down; with a lumen volume small compared with its buffering capacity, only a limited amount of ATP is made before $4.67\,F\Delta p$ falls below the phosphorylation potential, at $\Delta\mathrm{pH} = 50/(4.67 \times 5.708) = 1.9$ units. The burst of ATP was exactly what the chemiosmotic hypothesis predicted.
:::
:::

::: exercise Balancing ATP and NADPH in a leaf {level=3 check="1.29"}
(a) In linear electron flow, per $\mathrm{O_2}$ released, 4 electrons pass to $\mathrm{NADP^+}$ and 12 protons enter the lumen. With a 14-subunit $c$ ring, calculate the ATP : NADPH ratio. (b) The Calvin cycle needs 3 ATP and 2 NADPH per $\mathrm{CO_2}$. What fraction of the ATP demand is met by linear flow, and how can the rest be supplied? (Enter the ATP : NADPH ratio from linear flow to three significant figures.)
::: solution
(a) Protons per ATP $= 14/3 = 4.667$; ATP per $\mathrm{O_2}$ $= 12/4.667 = 2.571$; NADPH per $\mathrm{O_2}$ $= 2$. Ratio $= 2.571/2 = 1.29$. (b) For 2 NADPH, the Calvin cycle needs 3 ATP; linear flow gives $2.571$, i.e. $86\,\%$. The remaining $0.43$ ATP per $\mathrm{CO_2}$ comes mainly from cyclic electron flow around PSI, which pumps protons through cytochrome *b*₆*f* without reducing $\mathrm{NADP^+}$, and partly from other routes (the water–water cycle, export of reducing equivalents to mitochondria). Chloroplasts adjust the balance continuously; it is another example of a proton gradient decoupling two stoichiometries.
:::
:::
