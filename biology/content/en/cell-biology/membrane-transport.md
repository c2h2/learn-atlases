The bilayer of [[cell-biology/membranes]] is a superb barrier, and that is a problem as well as a solution. A cell must import sugars, amino acids and ions, export waste, and hold the concentrations of its cytosol far from those outside: a typical animal cell keeps potassium about thirty times higher inside than out, sodium about ten times lower, and free calcium some ten thousand times lower. Every one of these differences is maintained against a constant leak, by proteins that let particular substances through, and by pumps that spend energy pushing them uphill. The differences are also an energy store. A cell uses its ion gradients to drive the uptake of nutrients, to signal, and — as a voltage across the membrane — to make the electrical activity of nerves and muscles possible.

This chapter builds the physics of crossing a membrane step by step: diffusion through the bilayer and the permeability coefficient; carriers and channels, which make passage selective and fast; the electrochemical potential, which decides the direction of passive flow; pumps and coupled transporters, which make it go the other way; and the membrane potential, from the Nernst equation for one ion to the Goldman–Hodgkin–Katz equation for several. The thermodynamic background is in [Chemistry Atlas: bioenergetics](/learn/chemistry/lesson.php?c=biochemistry&l=bioenergetics).

## Diffusion through the bilayer

Small non-polar molecules — O₂, CO₂, N₂, steroid hormones — dissolve in the hydrocarbon core and cross a bilayer rapidly. Small uncharged polar molecules such as water, urea and glycerol cross more slowly; larger polar molecules such as glucose very slowly; and ions, which would have to shed their shell of water molecules to enter the core, scarcely at all. Measured on protein-free synthetic bilayers, the permeability coefficient of water is of order $10^{-3}\ \mathrm{cm\,s^{-1}}$, while those of Na⁺ and K⁺ are of order $10^{-12}\ \mathrm{cm\,s^{-1}}$ or less — about a billion times smaller (order-of-magnitude values, as summarised in Alberts, *Molecular Biology of the Cell*, 7th ed., 2022).

::: proposition Passive flux through a membrane {#prop-fick}
For an uncharged solute that crosses a membrane by dissolving in it, the net flux (amount per unit area per unit time) from outside to inside is

$$
J = P\,(c_\mathrm{o} - c_\mathrm{i}),
$$ {#eq-fick}

where $c_\mathrm{o}$ and $c_\mathrm{i}$ are the concentrations in the two solutions and $P$ is the **permeability coefficient** (units of velocity, e.g. cm s⁻¹). For a membrane of thickness $\ell$, $P = KD_\mathrm{m}/\ell$, with $K$ the partition coefficient of the solute between membrane and water and $D_\mathrm{m}$ its diffusion coefficient in the membrane. Assumptions: steady state across the membrane, well-mixed solutions on both sides, and no binding or carrier.
:::

::: proof Fick's first law across a slab
Inside the membrane the flux obeys Fick's first law, $J = -D_\mathrm{m}\,dc/dx$. At steady state $J$ is the same at every depth, so the concentration falls linearly across the slab. At the two faces the concentration in the membrane is $K$ times that in the adjacent water, so the drop is $K(c_\mathrm{o} - c_\mathrm{i})$ over a distance $\ell$, giving $J = D_\mathrm{m}K(c_\mathrm{o}-c_\mathrm{i})/\ell$.
:::

Overton's old correlation (see [[cell-biology/membranes]]) is the factor $K$: the more oil-soluble a molecule, the faster it crosses.

::: example How leaky is a bare bilayer? {#ex-leak}
A spherical cell of radius $r$ is placed in a solution of a solute it does not contain. If only passive diffusion through the bilayer operates, the internal concentration approaches the external one exponentially with time constant $\tau = V/(PA) = r/(3P)$. Evaluate $\tau$ for $r = 10\ \mathrm{\mu m}$ and (a) water-like permeability, $P = 10^{-3}\ \mathrm{cm\,s^{-1}}$; (b) a small polar solute, $P = 10^{-6}\ \mathrm{cm\,s^{-1}}$; (c) an ion, $P = 10^{-12}\ \mathrm{cm\,s^{-1}}$.
::: solution
The rate of change of the internal amount is $V\,dc_\mathrm{i}/dt = PA(c_\mathrm{o}-c_\mathrm{i})$, so $c_\mathrm{o}-c_\mathrm{i}$ decays as $e^{-t/\tau}$ with $\tau = V/(PA)$; for a sphere $V/A = r/3$. With $r = 10^{-3}\ \mathrm{cm}$:

(a) $\tau = 10^{-3}/(3\times10^{-3}) = 0.33\ \mathrm{s}$.

(b) $\tau = 333\ \mathrm{s}$, about six minutes.

(c) $\tau = 3.3\times10^8\ \mathrm{s}$, about ten years.

A bare bilayer would equilibrate water almost instantly but hold ions for years. Cells therefore need proteins to let ions and polar nutrients through at useful rates — and those proteins, not the lipid, determine which substances cross. (Many cells also have water channels, aquaporins, which raise water permeability further.)
:::
:::

## Transport proteins: carriers and channels

Two families of proteins carry solutes across membranes, and they work in fundamentally different ways.

::: definition Transporters and channels {#def-transporters}
A **transporter** (carrier, or permease) binds its solute on one side of the membrane and undergoes a conformational change that exposes the binding site to the other side, releasing it there. At no moment is there an open path through the membrane. A transporter that moves one solute is a **uniporter**; one that couples two solutes moving in the same direction is a **symporter**, and in opposite directions an **antiporter**.

A **channel** forms a water-filled pore through which selected ions or molecules flow when it is open, without binding tightly. Channels are usually **gated**: they open in response to a change in membrane voltage (voltage-gated), to the binding of a ligand (ligand-gated), or to mechanical stress (mechanosensitive).
:::

The difference shows up in rate. Because a transporter must change conformation for each solute (or small group of solutes) it moves, it handles about $10^2$–$10^4$ molecules per second. A channel, once open, lets ions stream through at up to about $10^8$ per second, close to the limit set by diffusion to the pore mouth. The difference also shows up in kinetics.

::: proposition Saturable carrier kinetics {#prop-carrier}
If a uniporter binds its solute rapidly and reversibly at a single site and the conformational change is rate-limiting, the initial rate of uptake from a solution of concentration $c$ (with none inside) is

$$
v = \frac{V_{\max}\,c}{K_\mathrm{m} + c},
$$ {#eq-carrier}

where $V_{\max}$ is the rate with every carrier occupied and $K_\mathrm{m}$ the concentration at which the rate is half-maximal. This is the Michaelis–Menten form of enzyme kinetics, with the carrier as enzyme and translocation as the catalytic step (see [Chemistry Atlas: enzymes](/learn/chemistry/lesson.php?c=biochemistry&l=enzymes)). By contrast, simple diffusion through the bilayer, [[#eq-fick]], increases linearly without limit.
:::

Saturation, together with high specificity (D-glucose, not L-glucose) and competitive inhibition by close analogues, is how carrier-mediated transport is recognised experimentally. The glucose uniporter GLUT1 of human red blood cells, for example, has a $K_\mathrm{m}$ of about 1.5 mmol L⁻¹ for glucose (Lodish, *Molecular Cell Biology*, 9th ed., 2021); at blood-glucose concentrations of around 5 mmol L⁻¹ it runs at about three-quarters of its maximal rate.

::: widget plot
f: V*x/(K + x); p*x
x: 0, 20
y: 0, 12
sliders: V=10:1:12:0.1; K=1.5:0.1:10:0.1; p=0.3:0:1:0.01
labels: \text{carrier: } V_{\max} c/(K_\mathrm{m}+c); \text{diffusion: } Pc
caption: Uptake rate (arbitrary units) against external concentration $c$ in mmol L⁻¹. The first curve is carrier-mediated transport [[#eq-carrier]], with sliders for $V_{\max}$ ($V$) and $K_\mathrm{m}$ ($K$); the straight line is passive diffusion [[#eq-fick]] with slope $p$. Notice that the carrier wins at low concentrations but saturates, while diffusion keeps rising: plotting measured uptake against concentration over a wide range tells the two apart.
:::

### Channels: selectivity and speed

A channel must be fast and selective at once, which seems contradictory: tight binding gives selectivity but slows release. Roderick MacKinnon's crystal structure of KcsA, a potassium channel from the bacterium *Streptomyces lividans* (Declan Doyle and colleagues, 1998), showed how it is done. The narrowest part of the pore, the **selectivity filter**, is lined by backbone carbonyl oxygens of the signature sequence TVGYG, spaced to replace exactly the water molecules around a dehydrated K⁺ ion. A K⁺ ion entering the filter loses its water shell at almost no energetic cost. A Na⁺ ion, smaller by 0.04 nm, cannot be fitted snugly by the rigid filter, so dehydrating it is not compensated, and it is excluded — the channel prefers K⁺ by more than a thousandfold. Several K⁺ ions occupy the filter in single file, and their mutual repulsion pushes them through rapidly. MacKinnon shared the 2003 Nobel Prize in Chemistry with Peter Agre, who identified the first water channel, aquaporin-1, from red-cell membranes in 1992 by showing that frog oocytes injected with its RNA swell rapidly in dilute solution.

The current through a single channel can be measured directly by the **patch clamp**, developed by Erwin Neher and Bert Sakmann in 1976 (Nobel Prize in Physiology or Medicine, 1991): a glass pipette sealed tightly against a small patch of membrane isolates one or a few channels, and the opening and closing of each appears as rectangular steps of current of a few picoamperes.

::: example The current through one channel {#ex-channel-current}
A potassium channel with a single-channel conductance of 20 pS is open in a membrane where the driving force on K⁺ — the difference between the membrane potential and the K⁺ equilibrium potential — is 100 mV. What current flows, and how many ions per second does it carry?
::: solution
By Ohm's law, $I = g\,\Delta V = (20\times10^{-12}\ \mathrm{S})(0.100\ \mathrm{V}) = 2.0\times10^{-12}\ \mathrm{A} = 2.0\ \mathrm{pA}$. Each ion carries charge $e = 1.602\times10^{-19}\ \mathrm{C}$, so the flux is $2.0\times10^{-12}/1.602\times10^{-19} = 1.25\times10^7$ ions per second — some thousand times faster than a typical transporter.
:::
:::

## The electrochemical potential

For an uncharged molecule the direction of passive flow is simply down the concentration gradient. An ion also feels the electric field across the membrane, and the two effects must be combined.

::: definition Electrochemical potential and passive versus active transport {#def-electrochemical}
The **electrochemical potential** of an ion species of charge number $z$ in a compartment at electric potential $\psi$ is

$$
\tilde\mu = \mu^\circ + RT\ln c + zF\psi,
$$ {#eq-electrochemical}

where $R$ is the gas constant, $T$ the absolute temperature, $F = 96\,485\ \mathrm{C\,mol^{-1}}$ the Faraday constant and $c$ the concentration (strictly, activity). The free-energy change for moving one mole of the ion from outside (o) to inside (i) is

$$
\Delta G = \tilde\mu_\mathrm{i} - \tilde\mu_\mathrm{o} = RT\ln\frac{c_\mathrm{i}}{c_\mathrm{o}} + zF V_\mathrm{m},
$$ {#eq-dg-ion}

with $V_\mathrm{m} = \psi_\mathrm{i} - \psi_\mathrm{o}$ the **membrane potential** (by convention, inside relative to outside). Transport with $\Delta G < 0$ can happen spontaneously and is **passive**, whether through the bilayer, a channel or a uniporter. Transport with $\Delta G > 0$ is **active** and must be coupled to an energy source: ATP hydrolysis, light, or the downhill movement of another solute.
:::

When an ion is at equilibrium across the membrane, $\Delta G = 0$, and [[#eq-dg-ion]] gives at once the most important equation in electrophysiology.

::: proposition The Nernst equation {#prop-nernst}
An ion of charge number $z$ is in equilibrium across a membrane when the membrane potential equals its **equilibrium (Nernst) potential**

$$
E_\mathrm{X} = \frac{RT}{zF}\ln\frac{[\mathrm{X}]_\mathrm{o}}{[\mathrm{X}]_\mathrm{i}}.
$$ {#eq-nernst}

At 37 °C, $RT/F = 26.7\ \mathrm{mV}$, so $E_\mathrm{X} = (61.5\ \mathrm{mV}/z)\log_{10}([\mathrm{X}]_\mathrm{o}/[\mathrm{X}]_\mathrm{i})$; at 20 °C the factor is 58.2 mV. Assumptions: the ion is in electrochemical equilibrium (no net flux), activity coefficients are equal on the two sides, and only this ion is considered.
:::

::: proof
Set $\Delta G = 0$ in [[#eq-dg-ion]]: $RT\ln(c_\mathrm{i}/c_\mathrm{o}) + zFV_\mathrm{m} = 0$, so $V_\mathrm{m} = (RT/zF)\ln(c_\mathrm{o}/c_\mathrm{i})$.
:::

The Nernst potential is the voltage that exactly balances the concentration gradient of that ion: at $V_\mathrm{m} = E_\mathrm{X}$, the electrical force pushing the ion one way balances the tendency to diffuse the other. The difference $V_\mathrm{m} - E_\mathrm{X}$ is the **driving force** on the ion, the quantity used in [[#ex-channel-current]].

::: example Equilibrium potentials in a mammalian cell {#ex-nernst}
Typical concentrations (mmol L⁻¹) for a mammalian cell are: K⁺ 140 inside, 5 outside; Na⁺ 12 inside, 145 outside; Cl⁻ 10 inside, 110 outside; free Ca²⁺ 0.0001 inside, 2 outside (representative values; they differ between cell types). Calculate each equilibrium potential at 37 °C.
::: solution
With $RT/F = 26.73\ \mathrm{mV}$:

$$
\begin{aligned}
E_\mathrm{K} &= 26.73\ln(5/140) = 26.73\times(-3.332) = -89\ \mathrm{mV},\\
E_\mathrm{Na} &= 26.73\ln(145/12) = 26.73\times2.492 = +67\ \mathrm{mV},\\
E_\mathrm{Cl} &= \frac{26.73}{-1}\ln(110/10) = -26.73\times2.398 = -64\ \mathrm{mV},\\
E_\mathrm{Ca} &= \frac{26.73}{2}\ln(2/0.0001) = 13.36\times9.903 = +132\ \mathrm{mV}.
\end{aligned}
$$

The equilibrium potentials span more than 200 mV. A typical resting potential of about −70 mV is close to $E_\mathrm{K}$ but far from $E_\mathrm{Na}$ and $E_\mathrm{Ca}$, so opening sodium or calcium channels lets those ions rush in — the basis of electrical and calcium signalling.
:::
:::

::: warning "The membrane potential comes from a large separation of charge"
The cytosol and the extracellular fluid are both electrically neutral to an excellent approximation. The membrane potential is produced by a tiny excess of charge in a layer less than a nanometre thick on each face of the membrane, which acts as a capacitor. [[#ex-capacitor]] shows that charging a cell to −100 mV moves only about one potassium ion in fifty thousand. This is why a cell can change its potential in a millisecond without measurably changing its ion concentrations — and why it is wrong to think of the inside of a cell as "negatively charged".
:::

::: example How many ions make a membrane potential? {#ex-capacitor}
Biological membranes have a specific capacitance of about $1\ \mathrm{\mu F\,cm^{-2}}$. For a spherical cell of radius 10 µm containing 140 mmol L⁻¹ K⁺, how many monovalent ions must cross the membrane to change its potential by 100 mV, and what fraction of the cell's potassium is that?
::: solution
Area $A = 4\pi r^2 = 1257\ \mathrm{\mu m^2} = 1.257\times10^{-5}\ \mathrm{cm^2}$, so the capacitance is $C = 1.26\times10^{-11}\ \mathrm{F} = 12.6\ \mathrm{pF}$. The charge is $Q = C\Delta V = 1.26\times10^{-12}\ \mathrm{C}$, or $Q/e = 7.8\times10^6$ ions.

The cell's volume is $4.19\times10^{-12}\ \mathrm{L}$, holding $0.14\times4.19\times10^{-12}\times6.022\times10^{23} = 3.5\times10^{11}$ K⁺ ions. The fraction is $7.8\times10^6/3.5\times10^{11} = 2.2\times10^{-5}$: about one ion in 45,000.
:::
:::

## Pumps and coupled transport

The gradients of [[#ex-nernst]] would run down through leak channels within hours unless something restored them. That something is primary active transport.

### The sodium–potassium pump

In 1957 Jens Christian Skou found an ATPase in membranes from crab (*Carcinus maenas*) nerves that required both Na⁺ and K⁺ — the enzyme that we now know as the **Na⁺/K⁺-ATPase**, or sodium pump (Skou shared the 1997 Nobel Prize in Chemistry). For each ATP hydrolysed it exports three Na⁺ and imports two K⁺, by cycling between conformations that face inwards with high affinity for Na⁺ and outwards with high affinity for K⁺, driven by phosphorylation of an aspartate residue. It belongs to the family of **P-type ATPases**, which also includes the Ca²⁺ pumps of the plasma membrane and endoplasmic reticulum and the H⁺/K⁺ pump of the stomach. Because it moves three positive charges out for every two in, it is **electrogenic**, contributing a few millivolts directly to the membrane potential. In many animal cells it consumes a large fraction of all ATP made, by commonly quoted estimates about a fifth to a third, and more in neurons.

::: example Can one ATP pay for the sodium pump? {#ex-pump}
Using the concentrations of [[#ex-nernst]] and $V_\mathrm{m} = -70\ \mathrm{mV}$ at 37 °C, calculate the free energy needed to export 3 Na⁺ and import 2 K⁺, and compare it with the free energy of ATP hydrolysis in a cell, about −50 to −60 kJ mol⁻¹ ([Chemistry Atlas: bioenergetics](/learn/chemistry/lesson.php?c=biochemistry&l=bioenergetics)).
::: solution
$RT = 2.579\ \mathrm{kJ\,mol^{-1}}$ and $F\times0.070\ \mathrm{V} = 6.75\ \mathrm{kJ\,mol^{-1}}$.

Moving Na⁺ from inside (12 mM, $\psi = -70$ mV) to outside (145 mM, $\psi = 0$): $\Delta G = RT\ln(145/12) + F(0 - (-0.070)) = 6.43 + 6.75 = 13.18\ \mathrm{kJ\,mol^{-1}}$ — uphill against both gradients.

Moving K⁺ from outside (5 mM) to inside (140 mM, $-70$ mV): $\Delta G = RT\ln(140/5) + F(-0.070 - 0) = 8.59 - 6.75 = 1.84\ \mathrm{kJ\,mol^{-1}}$ — the concentration gradient opposes it, but the voltage helps.

Total: $3(13.18) + 2(1.84) = 43.2\ \mathrm{kJ}$ per cycle. ATP hydrolysis supplies about 50–60 kJ mol⁻¹, enough with a margin, so the pump can run forwards; the stoichiometry 3:2 is close to the largest that one ATP could pay for under these conditions.
:::
:::

Other primary pumps include the **V-type ATPases** that acidify lysosomes and vacuoles ([[cell-biology/organelles]]), the **F-type ATP synthase** of mitochondria, chloroplasts and bacteria, which normally runs in reverse, using a proton gradient to make ATP ([Chemistry Atlas: oxidative phosphorylation](/learn/chemistry/lesson.php?c=biochemistry&l=oxidative-phosphorylation)), and the large superfamily of **ABC transporters**, which use ATP to move substrates as diverse as sugars, peptides, lipids and drugs. One ABC transporter, P-glycoprotein, pumps chemotherapy drugs out of tumour cells and is a cause of multidrug resistance; another, CFTR, has become a chloride channel, and its loss causes cystic fibrosis ([Medicine Atlas: genetics](/learn/medicine/course.php?c=genetics)).

### Secondary active transport

Once a pump has built a gradient, other transporters can spend it. A **symporter** couples the downhill movement of Na⁺ (in animals) or H⁺ (in bacteria, fungi and plants) to the uphill movement of a nutrient; an **antiporter** couples it to the export of something else, as the Na⁺/H⁺ exchanger expels protons and the Na⁺/Ca²⁺ exchanger expels calcium. In the intestine and kidney, the Na⁺–glucose symporter SGLT1 moves two Na⁺ with each glucose into epithelial cells; on the other side of the same cells, GLUT2 uniporters let glucose diffuse out into the blood. Peter Mitchell's chemiosmotic view (1961) that ion gradients are a general energy currency, interconvertible with ATP, was first appreciated for ATP synthesis but applies equally here.

::: example How far can a sodium-coupled symporter concentrate glucose? {#ex-sglt}
SGLT1 couples 2 Na⁺ to 1 glucose. At equilibrium the free-energy change of one full cycle is zero. Using $[\mathrm{Na^+}]_\mathrm{o}/[\mathrm{Na^+}]_\mathrm{i} = 145/12$ and $V_\mathrm{m} = -70\ \mathrm{mV}$ at 37 °C, find the largest ratio $[\mathrm{glc}]_\mathrm{i}/[\mathrm{glc}]_\mathrm{o}$ it can sustain.
::: solution
For one cycle (2 Na⁺ and 1 uncharged glucose moved inward), [[#eq-dg-ion]] gives

$$
\Delta G = RT\ln\frac{[\mathrm{glc}]_\mathrm{i}}{[\mathrm{glc}]_\mathrm{o}} + 2\left(RT\ln\frac{[\mathrm{Na}]_\mathrm{i}}{[\mathrm{Na}]_\mathrm{o}} + FV_\mathrm{m}\right) = 0,
$$

so

$$
\frac{[\mathrm{glc}]_\mathrm{i}}{[\mathrm{glc}]_\mathrm{o}} = \left(\frac{[\mathrm{Na}]_\mathrm{o}}{[\mathrm{Na}]_\mathrm{i}}\right)^2 \exp\!\left(-\frac{2FV_\mathrm{m}}{RT}\right) = (12.08)^2 \times e^{2\times70/26.73} = 146\times188 \approx 2.7\times10^4.
$$

In principle the cell could hold glucose some 27,000 times above the outside concentration. Real gradients are far smaller because glucose leaves through GLUT2 as fast as it enters, but the calculation shows why coupling two Na⁺ rather than one (which would give only about 166) lets epithelia absorb glucose even when little remains in the gut or the kidney filtrate.
:::
:::

## The resting membrane potential

If a membrane were permeable only to K⁺, its potential would settle at $E_\mathrm{K}$. Real resting membranes are mostly, but not only, permeable to K⁺, through leak channels; they also leak some Na⁺ and Cl⁻. The resting potential lies between the Nernst potentials, weighted by permeability.

::: proposition The Goldman–Hodgkin–Katz voltage equation {#prop-ghk}
If K⁺, Na⁺ and Cl⁻ cross a membrane independently with permeabilities $P_\mathrm{K}$, $P_\mathrm{Na}$ and $P_\mathrm{Cl}$, the membrane potential at which the net current is zero is

$$
V_\mathrm{m} = \frac{RT}{F}\ln\frac{P_\mathrm{K}[\mathrm{K^+}]_\mathrm{o} + P_\mathrm{Na}[\mathrm{Na^+}]_\mathrm{o} + P_\mathrm{Cl}[\mathrm{Cl^-}]_\mathrm{i}}{P_\mathrm{K}[\mathrm{K^+}]_\mathrm{i} + P_\mathrm{Na}[\mathrm{Na^+}]_\mathrm{i} + P_\mathrm{Cl}[\mathrm{Cl^-}]_\mathrm{o}}.
$$ {#eq-ghk}

Note that chloride, being an anion, appears with inside and outside interchanged. Assumptions (David Goldman, 1943; Alan Hodgkin and Bernard Katz, 1949): the electric field is uniform across the membrane (the "constant-field" assumption), ions move independently of one another, the permeabilities do not depend on voltage over the range considered, and the active pump current is negligible. With only one permeant ion it reduces to [[#eq-nernst]].
:::

The equation says the resting potential is a steady state, not an equilibrium: Na⁺ leaks in and K⁺ leaks out continuously, and the pump keeps the concentrations constant by returning them. This is the **pump–leak** picture.

::: example The squid giant axon at rest and at the peak of an action potential {#ex-ghk}
Hodgkin and Katz (1949) estimated relative permeabilities in the squid giant axon of $P_\mathrm{K}:P_\mathrm{Na}:P_\mathrm{Cl} = 1:0.04:0.45$ at rest, and $1:20:0.45$ at the peak of an action potential. With the concentrations (mmol L⁻¹) K⁺ 400 in, 20 out; Na⁺ 50 in, 440 out; Cl⁻ 52 in, 560 out, and $RT/F = 25.3\ \mathrm{mV}$ (20 °C), calculate $V_\mathrm{m}$ in each state and compare with $E_\mathrm{K}$ and $E_\mathrm{Na}$.
::: solution
At rest:

$$
V_\mathrm{m} = 25.26\ln\frac{20 + 0.04(440) + 0.45(52)}{400 + 0.04(50) + 0.45(560)} = 25.26\ln\frac{61.0}{654} = 25.26\times(-2.372) = -60\ \mathrm{mV}.
$$

At the peak, with $P_\mathrm{Na} = 20$:

$$
V_\mathrm{m} = 25.26\ln\frac{20 + 8800 + 23.4}{400 + 1000 + 252} = 25.26\ln\frac{8843}{1652} = 25.26\times1.678 = +42\ \mathrm{mV}.
$$

The Nernst potentials are $E_\mathrm{K} = 25.26\ln(20/400) = -76\ \mathrm{mV}$ and $E_\mathrm{Na} = 25.26\ln(440/50) = +55\ \mathrm{mV}$. At rest the membrane sits nearer $E_\mathrm{K}$, because K⁺ dominates the permeability; when Na⁺ channels open and $P_\mathrm{Na}$ rises some 500-fold, the potential swings towards $E_\mathrm{Na}$. No concentration changes are needed — only a change in permeability.
:::
:::

The figure shows [[#eq-ghk]] for a mammalian cell (no chloride term) as the ratio $P_\mathrm{Na}/P_\mathrm{K}$ varies over five orders of magnitude.

::: widget plot
f: 26.73*ln((k + 10^x*145)/(140 + 10^x*12)); 26.73*ln(k/140); 66.6
x: -3, 2
y: -120, 80
sliders: k=5:1:40:0.5
labels: V_\mathrm{m}\ \text{(GHK)}; E_\mathrm{K}; E_\mathrm{Na}
hlines: 0
caption: The Goldman–Hodgkin–Katz membrane potential in mV at 37 °C against $\log_{10}(P_\mathrm{Na}/P_\mathrm{K})$, for internal K⁺ 140 and Na⁺ 12, external Na⁺ 145 mmol L⁻¹, with chloride ignored. The slider $k$ sets external K⁺ in mmol L⁻¹. At low $P_\mathrm{Na}/P_\mathrm{K}$ the potential approaches $E_\mathrm{K}$ (second curve), at high ratios $E_\mathrm{Na}$ (horizontal line at +67 mV). A typical resting ratio of 0.01–0.05 (horizontal position −2 to −1.3) gives −82 to −65 mV. Raise external K⁺ and watch the resting potential depolarise.
:::

::: quiz
A drug blocks the Na⁺/K⁺-ATPase completely. What happens to the membrane potential of an animal cell in the first second, and over the next hours?
- [ ] It collapses to zero within a second, because the pump generates the potential.
- [x] It changes by only a few millivolts at once (the pump's electrogenic part), then declines slowly over minutes to hours as the Na⁺ and K⁺ gradients run down.
- [ ] It becomes more negative, because K⁺ is no longer pumped in.
- [ ] Nothing happens, because the potential depends only on channels.
::: solution
The resting potential is set mainly by the ion gradients and the leak permeabilities, through [[#eq-ghk]]; the pump's direct electrogenic contribution is only a few millivolts. Blocking it removes that contribution at once, but the gradients persist until leaks dissipate them, which takes minutes to hours depending on the cell's size and permeability. Cells also swell, because Na⁺ and Cl⁻ accumulate and water follows by osmosis — the pump is the animal cell's main volume regulator. Cardiac glycosides such as ouabain and digoxin inhibit this pump; their clinical use belongs to [Medicine Atlas: pharmacology](/learn/medicine/course.php?c=pharmacology).
:::
:::

::: application Osmosis, volume and the plant cell wall
Water crosses membranes passively, from lower to higher total solute concentration, through the bilayer and through aquaporins. An animal cell, with no wall, must keep its internal osmolarity equal to the outside, and pumps sodium out partly for this reason; red cells placed in pure water swell and burst. Plant, fungal and bacterial cells instead let water enter until the rigid cell wall pushes back: the resulting **turgor pressure**, several times atmospheric pressure in many plant cells, holds non-woody plants upright, which is why they wilt when water is short. Freshwater protists such as *Paramecium* expel incoming water with contractile vacuoles. Plant cells use a proton pump (a P-type H⁺-ATPase) where animal cells use the sodium pump, so their membranes are energised by proton gradients and their resting potentials are often more negative, around −120 to −200 mV.
:::

::: history
The Nernst equation was derived by Walther Nernst in 1889 for electrochemical cells; in 1902 Julius Bernstein proposed that the resting potential of nerve and muscle arises because the membrane is selectively permeable to potassium, and that excitation is a transient breakdown of that selectivity. David Goldman derived the constant-field current equation in 1943. In 1949 Alan Hodgkin and Bernard Katz, working on the giant axon of the squid *Loligo*, showed that the resting potential follows the K⁺ gradient and that the action potential overshoots towards the Na⁺ equilibrium potential, and fitted their data with the Goldman equation; Hodgkin and Andrew Huxley's quantitative model of the action potential followed in 1952 (Nobel Prize in Physiology or Medicine, 1963, with John Eccles). Jens Christian Skou described the Na⁺/K⁺-ATPase in 1957. Peter Mitchell's chemiosmotic hypothesis appeared in 1961. Erwin Neher and Bert Sakmann recorded single acetylcholine-receptor channels in frog muscle in 1976. Peter Agre's group identified aquaporin-1 in 1992, and Roderick MacKinnon's group solved the structure of the potassium channel KcsA in 1998.
:::

Neurons turn the permeability changes of [[#ex-ghk]] into action potentials; the full Hodgkin–Huxley story belongs to [[neuroscience]] and to [Medicine Atlas: membrane potentials](/learn/medicine/lesson.php?c=physiology&l=membrane-potentials). In [[cell-biology/cell-signalling]] we meet ion channels again as receptors, and Ca²⁺ — with its 10,000-fold gradient — as a messenger.

::: summary
- Bare bilayers pass small non-polar molecules and water readily but ions about $10^9$ times more slowly; $J = P(c_\mathrm{o} - c_\mathrm{i})$, and an ion would take years to equilibrate across a bilayer alone.
- Transporters (uniporters, symporters, antiporters) bind and translocate solutes by conformational change, at $10^2$–$10^4$ s⁻¹, with saturable Michaelis–Menten kinetics; channels form gated, selective pores passing up to $10^8$ ions s⁻¹.
- The free energy of moving an ion inward is $\Delta G = RT\ln(c_\mathrm{i}/c_\mathrm{o}) + zFV_\mathrm{m}$; passive transport has $\Delta G < 0$, active transport needs coupling to an energy source.
- The Nernst potential $E_\mathrm{X} = (RT/zF)\ln([\mathrm{X}]_\mathrm{o}/[\mathrm{X}]_\mathrm{i})$: 61.5 mV per decade at 37 °C. Typical values: $E_\mathrm{K} \approx -89$, $E_\mathrm{Na} \approx +67$, $E_\mathrm{Ca} \approx +130$ mV.
- The membrane potential is set by a tiny charge separation (about 1 ion in $10^4$–$10^5$) across a 1 µF cm⁻² capacitor.
- The Na⁺/K⁺-ATPase (3 Na⁺ out, 2 K⁺ in per ATP) builds the gradients that symporters and antiporters spend; SGLT1's 2 Na⁺ could concentrate glucose up to about $10^4$-fold.
- The GHK equation gives the resting potential as a permeability-weighted steady state; changing permeabilities alone moves $V_\mathrm{m}$ between $E_\mathrm{K}$ and $E_\mathrm{Na}$.
:::

## Exercises

::: exercise A tenfold potassium gradient {level=1 check="-61.5"}
Calculate the equilibrium potential in mV at 37 °C for K⁺ at 10 mmol L⁻¹ outside and 100 mmol L⁻¹ inside.
::: solution
$E_\mathrm{K} = 61.54\log_{10}(10/100) = -61.5\ \mathrm{mV}$.
:::
:::

::: exercise The calcium equilibrium potential {level=1 check="126"}
Calculate $E_\mathrm{Ca}$ in mV at 37 °C for free Ca²⁺ at 1.2 mmol L⁻¹ outside and 100 nmol L⁻¹ inside (to three significant figures).
::: solution
$E_\mathrm{Ca} = \dfrac{26.73}{2}\ln\dfrac{1.2\times10^{-3}}{1.0\times10^{-7}} = 13.36\times\ln(12\,000) = 13.36\times9.393 = 126\ \mathrm{mV}$.
:::
:::

::: exercise Occupancy of a glucose carrier {level=1 check="0.769"}
GLUT1 has $K_\mathrm{m} \approx 1.5\ \mathrm{mmol\,L^{-1}}$. What fraction of its maximal rate does it achieve at a glucose concentration of 5 mmol L⁻¹ (three significant figures)?
::: solution
By [[#eq-carrier]], $v/V_{\max} = c/(K_\mathrm{m} + c) = 5/6.5 = 0.769$.
:::
:::

::: exercise Equilibration of a polar solute {level=2 check="333"}
Using the result $\tau = r/(3P)$ of [[#ex-leak]], how many seconds does it take (one time constant) for a solute with $P = 10^{-6}\ \mathrm{cm\,s^{-1}}$ to equilibrate across the membrane of a spherical cell of radius 10 µm?
::: solution
$r = 10^{-3}\ \mathrm{cm}$, so $\tau = 10^{-3}/(3\times10^{-6}) = 333\ \mathrm{s}$.
:::
:::

::: exercise A resting potential from permeabilities {level=2 check="-65.2"}
Use [[#eq-ghk]] (ignoring chloride) to calculate the resting potential at 37 °C of a cell with K⁺ 140 in, 5 out; Na⁺ 12 in, 145 out (mmol L⁻¹) and $P_\mathrm{Na}/P_\mathrm{K} = 0.05$. Give the answer in mV to three significant figures.
::: solution
$V_\mathrm{m} = 26.73\ln\dfrac{5 + 0.05\times145}{140 + 0.05\times12} = 26.73\ln\dfrac{12.25}{140.6} = 26.73\times(-2.440) = -65.2\ \mathrm{mV}$.
:::
:::

::: exercise Counting ions through a channel {level=2 check="25.0"}
A channel of conductance 10 pS opens for 5.0 ms with a driving force of 80 mV. How many monovalent ions pass through it? Give the answer in thousands, to three significant figures.
::: solution
$I = 10\times10^{-12}\times0.080 = 0.80\ \mathrm{pA}$. Charge $= 0.80\times10^{-12}\times5.0\times10^{-3} = 4.0\times10^{-15}\ \mathrm{C}$, or $4.0\times10^{-15}/1.602\times10^{-19} = 2.50\times10^4$ ions — 25.0 thousand. A single brief opening moves thousands of ions, which is why a few hundred channels suffice to change a small cell's potential.
:::
:::

::: exercise A one-sodium symporter {level=2 check="166"}
Repeat [[#ex-sglt]] for a hypothetical symporter coupling only one Na⁺ to each glucose. What is the maximum accumulation ratio (to three significant figures)?
::: solution
$\dfrac{[\mathrm{glc}]_\mathrm{i}}{[\mathrm{glc}]_\mathrm{o}} = \dfrac{145}{12}\exp\!\left(\dfrac{70}{26.73}\right) = 12.08\times13.72 = 166$. Doubling the stoichiometry squares the factor, from 166 to about 27,000.
:::
:::

::: exercise Interpreting a potassium titration {level=3}
The resting potential of a muscle fibre is measured in solutions with different external K⁺ (internal K⁺ about 140 mmol L⁻¹, 37 °C):

| $[\mathrm{K^+}]_\mathrm{o}$ (mM) | 2.5 | 5 | 10 | 20 | 50 | 100 |
|---|---|---|---|---|---|---|
| $V_\mathrm{m}$ (mV) | −95 | −82 | −67 | −50 | −27 | −9 |

(Representative values.) (a) Calculate $E_\mathrm{K}$ for each external concentration. (b) Over which range does $V_\mathrm{m}$ follow $E_\mathrm{K}$, and what slope per tenfold change would perfect K⁺ selectivity give? (c) Explain the deviation at low $[\mathrm{K^+}]_\mathrm{o}$ using [[#eq-ghk]].
::: solution
(a) $E_\mathrm{K} = 26.73\ln([\mathrm{K}]_\mathrm{o}/140)$: −108, −89, −71, −52, −28 and −9 mV.
(b) From about 20 to 100 mM the measured values lie within about 2 mV of $E_\mathrm{K}$, with a slope approaching 61 mV per tenfold change, the Nernst slope at 37 °C.
(c) At low $[\mathrm{K^+}]_\mathrm{o}$ the K⁺ terms in the numerator of [[#eq-ghk]] become small, so the small Na⁺ (and Cl⁻) permeabilities make a proportionally larger contribution, pulling $V_\mathrm{m}$ above $E_\mathrm{K}$: at 2.5 mM the membrane is at −95 mV rather than −108 mV. A fit of the GHK equation to the whole curve gives the ratio $P_\mathrm{Na}/P_\mathrm{K}$, in this case about 0.01 — this is essentially how Hodgkin and Katz worked out their permeability ratios.
:::
:::

::: exercise Why do cells pay for a sodium gradient? {level=3}
A student argues that the Na⁺/K⁺-ATPase wastes a fifth or more of a cell's ATP keeping Na⁺ out, when the cell could simply make its membrane impermeable to Na⁺. Using ideas from this chapter, give three distinct reasons why a sodium gradient across a somewhat leaky membrane is worth its cost to an animal cell. Then explain why plant and bacterial cells use proton gradients in the same roles.
::: solution
(1) **Energy storage and coupling.** The Na⁺ gradient is a currency that symporters and antiporters spend to import glucose and amino acids, export Ca²⁺ and H⁺, and so on ([[#ex-sglt]]); a membrane impermeable to Na⁺ could not use it.
(2) **Signalling.** Opening Na⁺ channels against a large gradient produces fast depolarisation, the basis of action potentials and many sensory responses; this needs a gradient and channels that can open.
(3) **Volume control.** Animal cells contain impermeant, negatively charged macromolecules that attract counter-ions and draw water in; pumping Na⁺ out makes the membrane effectively impermeable to it and balances the osmotic pressure. Without the pump, the cell would swell.
A perfectly Na⁺-tight membrane would also lose the leak permeability that sets a stable resting potential. Plants, fungi and bacteria have rigid walls that resist swelling, so volume control matters less, and they use P-type or respiratory proton pumps to make proton-motive force, which their symporters, antiporters and ATP synthases spend in the same way — Mitchell's chemiosmotic principle in both kingdoms.
:::
:::
