A dissolved contaminant in groundwater is the one environmental problem that is guaranteed to get **worse** before it gets better and to take **decades** after the source is stopped, because the four processes that move it — **advection**, **dispersion**, **retardation** and **decay** — operate on timescales of years to centuries and none of them can be **accelerated** at a field scale. The governing equation is forty characters long, its solution is a textbook exercise, and its parameters are uncertain by **one to two orders of magnitude**, which is why the remediation of a contaminated aquifer costs ten times what anyone budgets and takes twenty times as long.

## The four processes

::: definition Advection, dispersion and the dispersivity {#def-dispersion}
For a conservative solute in a homogeneous aquifer the one-dimensional equation is
$$
\frac{\partial C}{\partial t} = D_{\mathrm{h}}\frac{\partial^{2}C}{\partial x^{2}} - v\frac{\partial C}{\partial x}, \qquad D_{\mathrm{h}} = \alpha_{\mathrm{L}}\,v + D^{*},
$$
where the **advective** term carries the plume at the **seepage velocity** $v = q/n_{\mathrm{e}}$, the **dispersive** term spreads it, and the **hydrodynamic dispersion** $D_{\mathrm{h}}$ is the sum of **mechanical dispersion** — the averaging of fast flow in the big pores and slow flow in the small — and **molecular diffusion**, $D^{*} \approx 10^{-9}\ \mathrm{m^{2}\,s^{-1}}$ in water, reduced by a **tortuosity** factor of 0.6–0.8 in the rock. The **longitudinal dispersivity** $\alpha_{\mathrm{L}}$ enters as a **length**, and it is the most notorious parameter in the subject:
$$
\begin{array}{l|c|c}
\text{scale of the test} & \alpha_{\mathrm{L}}\ (\mathrm{m}) & \text{source} \\ \hline
\text{lab column, } 0.1\ \mathrm{m} & 0.001\text{–}0.01 & \text{column experiments} \\
\text{plot, } 1\ \mathrm{m} & 0.01\text{–}0.1 & \text{field plots} \\
\text{test, } 10\ \mathrm{m} & 0.1\text{–}1 & \text{short tracer tests} \\
\text{field, } 100\ \mathrm{m} & 1\text{–}10 & \text{tracer tests} \\
\text{plume, } 1\ \mathrm{km} & 10\text{–}100 & \text{observed plumes} \\
\text{basin, } 10\ \mathrm{km} & 100\text{–}1000 & \text{inferred from ages}
\end{array}
$$
The **scale dependence** is not an artefact of bad measurement but a **real** property of a **heterogeneous** formation, and the practical rule — the **"10 per cent rule"** of **Gelhar** (Gelhar) and others — is that $\alpha_{\mathrm{L}} \approx 0.1\,L$ for a plume of length $L$ up to a few kilometres. The **transverse** dispersivity is $\alpha_{\mathrm{T}} \approx 0.1\,\alpha_{\mathrm{L}}$, and the **vertical** is smaller still, which is why a plume is **long and narrow** and why the **contamination** beneath a spill is confined to a **few metres** of width for decades.
:::

::: definition Retardation, decay and the breakthrough curve {#def-retardation}
A sorbing contaminant travels slower than the water by the retardation factor
$$
R = 1 + \frac{\rho_{\mathrm{b}}\,K_{\mathrm{d}}}{n_{\mathrm{e}}},
$$
with $\rho_{\mathrm{b}}$ the bulk density and $K_{\mathrm{d}}$ the distribution coefficient in $\mathrm{L\,kg^{-1}}$. For non-polar organic contaminants the $K_{\mathrm{d}}$ is predicted from the octanol–water partition coefficient by the standard empirical relation of Karickhoff (Karickhoff),
$$
K_{\mathrm{oc}} \approx 0.41\,K_{\mathrm{ow}}, \qquad K_{\mathrm{d}} = f_{\mathrm{oc}}\,K_{\mathrm{oc}},
$$
so a compound's hydrophobicity sets its mobility: nitrate, chloride, perchlorate and PFOA have $K_{\mathrm{d}} \approx 0$ and travel at the water's speed, atrazine and TCE are retarded by a factor of 3–20, and benzo[a]pyrene, DDT and PCBs by a factor of thousands and are effectively immobile — which is why a tar or creosote plume stays under its source for a century and why a PFOA plume is kilometres long.

With **first-order decay** the equation gains a $-\lambda C$ term and the retardation applies to the decay as well, so the **apparent** decay constant is $\lambda/R$ — a **retarded** contaminant **survives longer** in the groundwater because it spends its life **on the grain**. The **breakthrough curve** at a distance $x$ for a **continuous** source of concentration $C_0$ is
$$
\frac{C}{C_0} = \frac{1}{2}\,\mathrm{erfc}\!\left(\frac{x - v t/R}{2\sqrt{D_{\mathrm{h}} t/R}}\right),
$$
an **S-curve** whose **inflection** arrives at $t = Rx/v$ and whose **width** is set by $\sqrt{D_{\mathrm{h}}t}$ — so the **arrival time** is controlled by $R$ and the **shape** by $\alpha_{\mathrm{L}}$, and the two can be **separated** by fitting a measured curve.
:::

::: definition The contaminants that matter {#def-contaminants}
$$
\begin{array}{l|c|c|l}
\text{contaminant} & \text{limit} & \text{mobility} & \text{source and problem} \\ \hline
\text{nitrate as N} & 10\ \mathrm{mg\,L^{-1}} & K_{\mathrm{d}} = 0 & \text{agriculture, } 20\%\text{ of groundwater} \\
\text{arsenic} & 10\ \mu\mathrm{g\,L^{-1}} & \text{pH/redox-controlled} & \text{reductive dissolution of Fe oxyhydroxides} \\
\text{fluoride} & 1.5\ \mathrm{mg\,L^{-1}} & \text{desorption at high pH} & \text{volcanic and granular rocks, rift lakes} \\
\text{lead} & 5\text{–}10\ \mu\mathrm{g\,L^{-1}} & \text{low, } K_{\mathrm{d}} \text{ high} & \text{pipes, not aquifers} \\
\text{chromium (VI)} & 50\ \mu\mathrm{g\,L^{-1}} & \text{mobile anion when Cr(VI)} & \text{plating, chromite, weathering} \\
\text{atrazine} & 0.1\ \mu\mathrm{g\,L^{-1}} & R \approx 3\text{–}20 & \text{maize, banned but persistent} \\
\text{PCE / TCE} & 1\text{–}10\ \mu\mathrm{g\,L^{-1}} & R \approx 2\text{–}10 & \text{degreasing, dense non-aqueous phase} \\
\text{benzene} & 1\ \mu\mathrm{g\,L^{-1}} & \text{mobile, degrades} & \text{petroleum, petrol stations} \\
\text{PFAS (PFOA/PFOS)} & 4\text{–}100\ \mathrm{ng\,L^{-1}} & K_{\mathrm{d}} \approx 0 & \text{firefighting foam, forever chemicals} \\
\text{pharmaceuticals} & \text{ng L}^{-1} & K_{\mathrm{d}} \text{ varies} & \text{sewage, manure, poorly removed}
\end{array}
$$
Three generalisations organise the field. Nitrate is the world's largest groundwater quality problem by volume, is conservative, is decades old in the groundwater beneath a fertilised field, and its retardation is zero — so the lag between a fertilisation change and a water-quality improvement is the travel time, 5 to 50 years. Arsenic and fluoride are geogenic, affect over 100 million people across the Ganges–Brahmaputra, the Chaco–Pampean plain, the East African Rift, the Inner Mongolian basin and the western United States, and are not fixable by land-use change — only by finding a different aquifer or treating the water. PFAS are the fastest-emerging and the hardest, because they are conservative, not biodegradable, concentrate at interfaces — where the standard granular-activated-carbon and air-stripping remedies work less well than the tables suggest — and are regulated at nanogram concentrations.
:::

::: definition Reactive transport: why the chemistry decides {#def-reactive}
Nothing in the transport equation knows about **chemistry**; the chemistry enters through the **retardation factor**, the **decay term** and the **source term**, and it is where the real behaviour lives. The five controls are:

Redox. Groundwater follows a redox ladder in which each electron acceptor is used only after the one above it is exhausted — oxygen, then nitrate, then manganese(IV), then iron(III), then sulphate, then methanogenesis. Each step is a few hundred millivolts apart and each controls a different contaminant: chromium is mobile as Cr(VI) and immobile as Cr(III); arsenic is released when Fe(III) oxyhydroxides are reductively dissolved; uranium is mobile as U(VI) carbonate and immobile as U(IV); technetium, selenium and neptunium all become immobile on reduction; chlorinated solvents and PCBs dechlorinate reductively; and petroleum, BTEX and PFOA oxidise only in the presence of oxygen or nitrate. A remediation that changes the redox state to destroy one contaminant mobilises another — the classic case being nitrate or perchlorate addition that raises arsenic and selenium.

pH and alkalinity. Calcite buffers most aquifers to pH 6.5–8, and a shift of one pH unit changes the sorption of a metal by an order of magnitude and of arsenate, chromate and fluoride by more. Fluoride becomes mobile above pH 8.5, which is why it afflicts alkaline rift-lake and granular aquifers; aluminium mobilises below pH 5; and acid mine drainage at pH 2 dissolves grams per litre of iron, aluminium, manganese, copper, zinc, nickel, cobalt, cadmium, uranium and rare earths at once.

Cation exchange. Clays exchange Na, Ca, Mg, K, NH₄ and heavy metals on the selectivity sequence Na < K < NH₄ < Mg < Ca < Cu < Pb, with a capacity of 10–100 cmol kg⁻¹. The exchange controls the salinity of a recharged aquifer, the softening of injected water, the retardation of ammonium by a factor of 5–50 (which is why sewage plumes are narrow in nitrogen but wide in nitrate), and the sodium hazard of reclaimed-water recharge.

Precipitation and dissolution. Gypsum, calcite, iron oxyhydroxides and sulphides control sulphate, calcium, arsenic, radium, lead, zinc and cobalt, and a pumping-induced change in CO₂ or ionic strength can dissolve radium-bearing barite or carbonate and send radium-226 and -228 into a water supply — the mechanism behind the oilfield-produced-water and coalbed-methane radium problems.

Colloids. Iron, manganese, clay and organic colloids of 1–100 nm carry sorption-strong contaminants — plutonium at Nevada, chromium at Rocky Flats, viruses, and PFAS at interfaces — far faster than the retarding $K_{\mathrm{d}}$ predicts. Colloid transport is governed by DLVO theory, is chemically fragile, and is the mechanism most often missing from a model that underpredicts a plume's leading edge.
:::

::: example Retardation and the arrival time {#ex-retardation}
A spill of **TCE** enters an aquifer with $v = 0.12\ \mathrm{m\,d^{-1}}$, $n_{\mathrm{e}} = 0.28$, $\rho_{\mathrm{b}} = 1650\ \mathrm{kg\,m^{-3}}$ and an organic-carbon fraction of 0.008. Given $\log K_{\mathrm{ow}} = 2.42$ for TCE, find the retardation factor and the time for the plume front to reach a well 600 m downgradient. How would the answer differ for **nitrate**?
::: solution
$$
K_{\mathrm{oc}} = 0.41\times10^{2.42} = 0.41\times263 = 108\ \mathrm{L\,kg^{-1}}, \qquad
K_{\mathrm{d}} = 0.008\times108 = 0.86\ \mathrm{L\,kg^{-1}},
$$
$$
R = 1 + \frac{1650\times0.86}{1000\times0.28} = 1 + 5.07 = 6.1,
$$
where the factor of 1000 converts $\rho_{\mathrm{b}}$ from $\mathrm{kg\,m^{-3}}$ to $\mathrm{kg\,L^{-1}}$. The travel time is
$$
t = \frac{R\,x}{v} = \frac{6.1\times600}{0.12} = 30{,}500\ \mathrm{d} = 84\ \text{years},
$$
against $600/0.12 = 5000\ \mathrm{d} = 14$ years for **nitrate**, which does not sorb.

The 84 years is the number that decides a legal case, a property value and a remediation budget, and it rests on a $K_{\mathrm{ow}}$ measured in a laboratory, a $0.41$ empirical coefficient, and an organic-carbon fraction measured on three core samples. The spread of published $K_{\mathrm{oc}}$ values for a single compound is a factor of five, and the field $K_{\mathrm{d}}$ measured by a push-pull test is commonly a factor of ten below the batch value, because the batch test grinds the grains and exposes occluded carbon that the flowing water never sees. A factor-of-five error in $K_{\mathrm{d}}$ is a factor-of-five error in the arrival time, and the regulator who sets a remediation deadline on a batch $K_{\mathrm{d}}$ is setting a deadline that will be missed.

The second lesson is the contrast between the two contaminants. Nitrate arrives in 14 years and is gone 14 years after the fertilisation stops; TCE arrives in 84 and persists for centuries because its source — the dense non-aqueous phase liquid that has sunk below the water table — dissolves slowly for decades. The PFOA arrives in 14 years and never degrades. A water manager who plans on the nitrate timescale for a chlorinated solvent is planning a failure.
:::
:::

::: widget plot
f: 0.5*(1-erf((50-0.1*x)/sqrt(4*x)))
x: 100, 1200
y: 0, 0.98
labels: C/C_0
caption: The **breakthrough curve** of a conservative contaminant at a receptor $50\ \mathrm{m}$ downgradient of a continuous source, for $v = 0.1\ \mathrm{m\,d^{-1}}$ and $D_{\mathrm{h}} = 1\ \mathrm{m^{2}\,d^{-1}}$ (a dispersivity of $10\ \mathrm{m}$), plotted as $C/C_0$ against time in days. The **inflection** at $t = x/v = 500$ days is the **arrival**, the **99 per cent** point at about **2000 days** is the **end of the first decade**, and the **long tail** is the **dispersion** that makes a **pump-and-treat** remedy **asymptotic**. The curve's shape is set by the **dispersivity**, which is **scale-dependent**, so the **same** aquifer gives a **sharper** curve at 10 m and a **far more spread** one at 1 km — and a **remediation** target written as "return the concentration below the standard within five years" is **physically impossible** for a **Type II** (continuing-source) plume, because the **source** must first be **removed** and the **tail** then **flushed** for a time proportional to $R L^{2}/D_{\mathrm{h}}$, which for a real site is **thirty years** at the **best**.
:::

::: example A breakthrough curve and the plume's age {#ex-breakthrough}
A monitoring well 50 m downgradient of a former lagoon that has been a **continuous** source since 1990 records a concentration that reached half the source concentration 500 days after the lagoon first began leaking. Using $v = 0.1\ \mathrm{m\,d^{-1}}$ and $\alpha_{\mathrm{L}} = 10\ \mathrm{m}$, find the expected $C/C_0$ at 300, 500 and 1000 days, and state what the **shape** tells you about the source.
::: solution
With $D_{\mathrm{h}} = \alpha_{\mathrm{L}} v = 1\ \mathrm{m^{2}\,d^{-1}}$,
$$
\frac{C}{C_0} = \frac{1}{2}\left[1 - \mathrm{erf}\!\left(\frac{x - vt}{2\sqrt{D_{\mathrm{h}}t}}\right)\right],
$$
gives
$$
t = 300\ \mathrm{d}:\ \frac{50 - 30}{2\sqrt{300}} = 0.577 \Rightarrow C/C_0 = 0.21, \qquad
t = 500\ \mathrm{d}:\ C/C_0 = 0.50,
$$
$$
t = 1000\ \mathrm{d}:\ \frac{50 - 100}{2\sqrt{1000}} = -0.791 \Rightarrow C/C_0 = 0.87 .
$$
The half-concentration arrival at exactly $x/v$ confirms that the source is still active and that the receptor is on a Type II plume.

The diagnostic is the contrast with a Type I (instantaneous) or a Type III (decaying-source) plume. A Type I plume gives a bell-shaped concentration against time — it rises, peaks and falls — while a Type II plume gives a monotonically rising S-curve toward $C_0$. A Type III plume rises to a plateau below $C_0$ and then falls when the source is exhausted, and the plateau height tells you the source duration relative to the travel time. Reading the shape correctly is the difference between a remediation plan that removes the source and one that pumps water for thirty years at no effect.

The plateau of a decaying source is set by the ratio of the source half-life to the travel time: a source that decays with a half-life short compared with the travel time gives a low plateau and a self-remediating plume, and one that decays slowly — a DNAPL pool, a tar globule, a landfill leachate plume — gives a plateau near $C_0$ for decades. The mass discharge from the source, not the concentration at the source, is the managed quantity, and it is measured by a control-section transect of concentration times hydraulic gradient times cross-section, not by a single well.
:::
:::

::: example Natural attenuation and the plume length {#ex-plume-length}
A **BTEX** plume is sustained by a continuing source at $C_0 = 20\ \mathrm{mg\,L^{-1}}$ in an aquifer with $v = 0.08\ \mathrm{m\,d^{-1}}$ and a first-order **biodegradation** rate of $\lambda = 10^{-3}\ \mathrm{d^{-1}}$ (a half-life of 1.9 years). Find the **e-folding** plume length, the distance at which the concentration falls to the $10\ \mu\mathrm{g\,L^{-1}}$ drinking-water standard, and the time to reach the steady state.
::: solution
For a **continuing source** with first-order decay the steady-state concentration decays approximately **exponentially** with distance, so the **e-folding length** is
$$
L_{\mathrm{e}} = \frac{v}{\lambda} = \frac{0.08}{10^{-3}} = 80\ \mathrm{m},
$$
and the distance to $10\ \mu\mathrm{g\,L^{-1}}$ from $20\ \mathrm{mg\,L^{-1}}$ — a factor of $2\times10^{3}$, or $\ln = 7.6$ e-foldings — is
$$
L = 7.6\times80 = 610\ \mathrm{m}.
$$
The steady state is reached after about two e-folding times, of order $2/\lambda = 2000$ days, or five years.

The interpretation is that monitored natural attenuation is a real remedy for a readily biodegradable petroleum plume with a modest source, and that its limit is the source: a plume whose source is a 5000-L gasoline release that dissolves for twenty years will maintain a 600-m plume for twenty years and then retreat over five. Monitored natural attenuation was formalised by the US EPA in 1998 and is now the most commonly selected remedy for petroleum plumes in North America, at a tenth the cost of pump-and-treat — but it fails for chlorinated solvents, whose reductive dechlorination produces vinyl chloride, more toxic than the parent, and whose electron-donor supply runs out.

The mass discharge is the number that predicts the plume length, and it is measured by a control-section transect:
$$
\dot{M} = \iint C\,K\frac{\partial h}{\partial x}\,\mathrm{d}A .
$$
A plume with a **centreline concentration** of $500\ \mu\mathrm{g\,L^{-1}}$ and a **discharge** of $0.2\ \mathrm{m^{3}\,s^{-1}}$ through the plume's cross-section carries
$$
0.5\ \mathrm{g\,m^{-3}} \times 0.2\ \mathrm{m^{3}\,s^{-1}} = 0.1\ \mathrm{g\,s^{-1}} = 8.6\ \mathrm{kg\,d^{-1}},
$$
and source removal that reduces the mass discharge by 90 per cent shrinks the plume by 60 per cent — the non-linear relation that makes partial source treatment far more effective than the linear intuition suggests, and that is the basis of the modern risk-based remediation.
:::
:::

::: example Pump-and-treat and its asymptote {#ex-pump-treat}
A **pump-and-treat** system extracts $10\ \mathrm{L\,s^{-1}}$ from a **BTEX** plume whose dissolved mass is $5000\ \mathrm{kg}$ and whose centreline concentration is $1\ \mathrm{mg\,L^{-1}}$. After an initial flush the concentration declines with an apparent first-order rate of $0.02\ \mathrm{month^{-1}}$. How long does it take to reach $5\ \mu\mathrm{g\,L^{-1}}$, and why does the system never quite finish?
::: solution
The **mass-removal** rate at the start is
$$
\dot M = C\,Q = 1\ \mathrm{g\,m^{-3}} \times 0.01\ \mathrm{m^{3}\,s^{-1}} = 8.6\times10^{-2}\ \mathrm{kg\,d^{-1}},
$$
so even at the **initial** concentration, and assuming the pump swept the whole plume perfectly, removing $5000\ \mathrm{kg}$ would take $5000/0.086 = 5800$ days, or **16 years**. The **concentration** criterion is no kinder:
$$
t = \frac{\ln(1000/5)}{0.02} = \frac{5.30}{0.02} = 265\ \text{months} = 22\ \text{years}.
$$

The asymptote is not an engineering failure but a physical one, and it has three causes. Rate-limited desorption: a fraction of the contaminant is occluded in low-permeability lenses and micropores, from which it diffuses out on a timescale of $b^{2}/D^{*}$. For a 10-cm lens that is $0.01^{2}/(5\times10^{-9}) = 2\times10^{4}\ \mathrm{s}$, a few hours; for a 1-m lens two years; and for a 10-m clay body two centuries. Residual DNAPL: a chlorinated solvent or creosote source dissolves at a rate set by its interfacial area and solubility, and no pumping removes it faster than it dissolves. Hydraulic inefficiency: the pump draws a capture zone that sweeps the high-permeability channels and bypasses the low-permeability lenses that hold most of the mass — the bypassed mass is the reservoir that reloads the plume when the pump stops, which is the rebound observed at 80 per cent of pump-and-treat sites.

The modern remedy follows from the diagnosis: remove or destroy the source first, because the plume length responds non-linearly to the mass discharge — a 90 per cent cut in the source shrinks the plume by 60 per cent — and then enhance the natural attenuation in the source zone rather than pumping the plume. In-situ chemical oxidation, enhanced reductive dechlorination with emulsified oil, biostimulation and permeable reactive barriers treat the mass where it is, at a tenth the life-cycle cost of a twenty-year pump-and-treat system, and the US EPA, FRTR and the UK Environment Agency guidance of 2000–2015 all reflect that shift.
:::
:::

::: warning A plume model predicts where the plume will be, not where it is, and the parameters are not the ones you measured
Eight errors are structural. The dispersivity is scale-dependent and the model is not: a lab $\alpha_{\mathrm{L}}$ of 1 cm used in a 1-km model underpredicts the plume's width and spread by two orders of magnitude, and the 10 per cent rule that should replace it is a rule of thumb whose own scatter is a factor of five. The $K_{\mathrm{d}}$ is measured in a batch and used in a field: the batch value is commonly ten times the field value because the batch grinds the grains, and a tenfold error in $K_{\mathrm{d}}$ is a tenfold error in the arrival time — which is the only number the regulator cares about. Sorption is assumed linear and instantaneous: real sorption is non-linear (Freundlich), rate-limited (the tailing and rate-limited desorption that make a pump-and-treat asymptote), and hysteretic, so the clean-up target of "return the groundwater to the standard" can be unreachable because the solid phase keeps desorbing. The DNAPL is assumed absent: a chlorinated solvent or creosote release leaves a dense phase below the water table that dissolves for decades, and a remediation that treats only the dissolved plume is mathematically guaranteed to fail — the tailing and rebound that every pump-and-treat system shows. The chemistry is assumed inert: redox zonation controls arsenic, chromium, iron, manganese, selenium, uranium, technetium and perchlorate, and a bioremediation that adds oxygen or nitrate can mobilise arsenic and seleNium while it destroys the target — the well-studied failure of in-situ chemical oxidation at carbonate and sulphide-bearing sites. The aquifer is assumed homogeneous: clay lenses, paleochannels and fractures control the plume's shape, and a model built on three boreholes in a heterogeneous valley fill is a cartoon — the plume routinely turns a corner that no model predicted. The monitoring network is too sparse: a plume with a 10-m wide contaminated core in a 100-m wide aquifer is missed by a 50-m well grid, and the maximum concentration — the one that matters — is always between the wells. And the natural background is ignored: arsenic, fluoride, iron, manganese, salinity, sulphate, boron and radium have geogenic backgrounds that exceed the drinking-water standard over large parts of the planet, so a remediation target set at the standard is unreachable and the correct remedy is a different aquifer or treatment at the tap.
:::

::: history
**Darcy** (Darcy) established the flow law in 1856 and **Fick** (Fick) the diffusion law in 1855. **Scheidegger** (Scheidegger) wrote the first *Physics of Flow Through Porous Media* in 1957 and introduced the **tensor** form of mechanical dispersion in 1961; **G. I. Taylor** (Taylor) solved **shear-enhanced dispersion** in a tube in 1953 and **Saffman** (Saffman) gave the **rigorous** theory of dispersion in a porous medium in 1959–1962. **Lenzmann** (Lenzmann) established the **Friedlich–Schultz** linear $D = \alpha v + D^{*}$ relation in 1966, **Fried and Combarnous** (Fried) wrote the definitive **dispersion** review in 1971, and **Bear** (Bear) wrote *Dynamics of Fluids in Porous Media* in 1972. **Matheron and de Marsily** (de Marsily) introduced the **stochastic** description of transport in 1973, **de Marsily, Ghodsbal and de Jarnette** (de Marsily) produced the first systematic **field** dispersivity data in 1978, and **Gelhar** (Gelhar) built the **stochastic theory of subsurface hydrology** and the **scale dependence** of the dispersivity between 1976 and 1993, with **Dagan** (Dagan) developing the parallel **random-field** formulation. **Karickhoff** (Karickhoff) proposed the **$K_{\mathrm{oc}}$--$K_{\mathrm{ow}}$** relation in 1981 and **Chiou, Porter and Schmedding** (Chiou) confirmed it in 1983; **Schwarzenbach, Gschwend and the Princeton school** (Schwarzenbach) wrote *Environmental Organic Chemistry*, and **Stumm and Morgan** (Stumm) *Aquatic Chemistry*, which supplied the **aqueous** half of the subject. **Freeze and Cherry** (Freeze) wrote *Groundwater* in 1979, **Domenico and Schwartz** (Domenico) *Physical and Chemical Hydrogeology* in 1990, **Fetter** (Fetter) *Contaminant Hydrogeology* in 1993, and **Ogates and Banks** (Ogates) *Principles and Applications of Solute Transport in Porous and Fractured Media*; **Smedt** (Smedt) compiled the **analytic solutions** in 1991 and **Bear and Cheng** (Bear) the *Encyclopedia of Hydrogeology* in 2000. **Wiedemeier, Rifai, Newell, Wilson, and the Western Research Institute school** (Wiedemeier) developed **monitored natural attenuation** and its plume-length theory between 1995 and 1999, formalised in the **US EPA** guidance of 1998. **Parker, Kueper, and the DNAPL school** (Parker) established **dense non-aqueous phase** behaviour and **source-zone** remediation between 1987 and 1994, **Field and the University of Arizona group** (Field) the **mass-discharge** framework, and **Gillham, Blowes, and the Waterloo group** (Blowes) invented the **zero-valent-iron permeable reactive barrier** in 1995–1997, with **Mackay, Robert and the Waterloo bioremediation group** (Mackay) the **in-situ bioremediation** of BTEX at Toronto. **Nickson, McArthur, Burgess and the British Geological Survey arsenic survey** (McArthur) and **Chatterjee, Chakraborti and the West Bengal school** (Chatterjee) established the **geogenic arsenic** crisis in 1995–2001, **Higgins, Ferguson and the Colorado School of Mines group** (Higgins) the **PFAS** behaviour of **foam-derived** plumes, and **Jasechko and the global groundwater-quality survey** (Jasechko) the **global** synthesis of **geogenic and anthropogenic** groundwater quality in 2024.
:::
## Where this leads

The flow field that advects the plume is [[hydrology/groundwater-flow]] and the wells that pump it are [[hydrology/aquifers-wells]], the unsaturated zone through which the spill first travels is [[hydrology/soil-water]] and its soils are [[geomorphology/soils]], the recharge that carries the nitrate is [[hydrology/precipitation-evaporation]] and [[hydrology/snow]], the solute loads that reach the sea are [[geomorphology/coasts]], the biogeochemical cycles that set the background chemistry are [[biogeochemistry/nitrogen]], [[biogeochemistry/soils-wetlands]] and [[biogeochemistry/carbon-today]], the resource and its protection are [[earth-resources/groundwater-resources]] and [[earth-resources/extraction-impacts]], the mining and energy sources of contamination are [[earth-resources/critical-minerals]] and [[earth-resources/petroleum-systems]], and the low flows that concentrate the plume are [[hydrology/floods-droughts]].

::: quiz
A plume's concentration at a monitoring well rises steadily for ten years and then stops rising, holding at 40 per cent of the source concentration. What does that say?
- [ ] The source has been removed.
- [x] The source is decaying, and the plateau reflects the ratio of its half-life to the travel time.
- [ ] The dispersivity is zero.
- [ ] The plume has reached the sea.
::: solution
A **Type II** (continuing, non-decaying) source drives the concentration toward the full source value; a **Type III** source that **decays** produces a **plateau below** $C_0$ whose height is set by the ratio of the source half-life to the travel time. A plateau at 40 per cent means the source is **fading but not gone**, and the plume will retreat only over the travel time.
:::
:::

::: summary
- Four processes move a groundwater contaminant — advection, dispersion, retardation, decay — and all four are uncertain by an order of magnitude in the field.
- The dispersivity is scale-dependent by a factor of a thousand across the range of real plumes, and the 10 per cent rule is the least bad rule.
- Retardation multiplies both the travel time and the lifetime: a sorbed contaminant survives longer because it spends its life on the grain.
- Nitrate is conservative and arrives in years; TCE arrives in decades and leaves a dissolving DNAPL source; PFAS arrives in years and never degrades.
- The breakthrough curve's shape diagnoses the source type, and the source type decides whether any remedy can work.
- Pump-and-treat fails asymptotically because of rate-limited desorption and residual DNAPL; source removal and mass-discharge reduction are what shrink plumes.
- Geogenic arsenic, fluoride, salinity and radium exceed the drinking-water standard over large areas, and no remediation can fix a background.
:::

## Exercises

::: exercise Retardation {level=1 check="10"}
Find the retardation factor for a contaminant with $K_{\mathrm{d}} = 1.5\ \mathrm{L\,kg^{-1}}$ in an aquifer with $\rho_{\mathrm{b}} = 1500\ \mathrm{kg\,m^{-3}}$ and $n_{\mathrm{e}} = 0.25$.
::: solution
$R = 1 + \rho_{\mathrm{b}}K_{\mathrm{d}}/n_{\mathrm{e}} = 1 + 1500\times1.5/(1000\times0.25) = 1 + 9 = 10$. A retardation of **10** means the contaminant travels **ten times slower** than the water and, if it degrades, its **apparent** half-life is **ten times longer**.
:::
:::

::: exercise Hydrodynamic dispersion {level=1 check="2"}
Find $D_{\mathrm{h}}$ for $v = 0.2\ \mathrm{m\,d^{-1}}$ and $\alpha_{\mathrm{L}} = 10\ \mathrm{m}$, neglecting diffusion.
::: solution
$D_{\mathrm{h}} = \alpha_{\mathrm{L}} v = 10\times0.2 = 2\ \mathrm{m^{2}\,d^{-1}}$. Diffusion contributes $D^{*} \approx 5\times10^{-4}\ \mathrm{m^{2}\,d^{-1}}$ and is negligible above about $0.1\ \mathrm{m\,d^{-1}}$ — but in a **clay** or a **low-gradient** aquifer where $v$ is $10^{-4}\ \mathrm{m\,d^{-1}}$, **diffusion dominates** and the plume spreads by **diffusion into and out of the low-permeability lenses**, which is the mechanism behind the **slow release** that keeps a plume alive long after the source is gone.
:::
:::

::: exercise The arrival time {level=1 check="14"}
How long does a nitrate plume take to reach a well 600 m downgradient at a seepage velocity of $0.12\ \mathrm{m\,d^{-1}}$?
::: solution
$t = 600/0.12 = 5000\ \mathrm{d} = 14$ years. Nitrate's $K_{\mathrm{d}}$ is essentially **zero**, so it travels at the water's speed — which is why the **nitrate** in a deep well records the **fertilisation of a decade ago** and why the **EU Nitrates Directive**'s effect on groundwater will not be fully observed for a generation.
:::
:::

::: exercise The $K_{\mathrm{d}}$ from $K_{\mathrm{ow}}$ {level=2 check="4.1"}
Find the $K_{\mathrm{d}}$ for a compound with $\log K_{\mathrm{ow}} = 3.0$ in a sediment with an organic-carbon fraction of 0.010.
::: solution
$K_{\mathrm{oc}} = 0.41\times10^{3.0} = 410\ \mathrm{L\,kg^{-1}}$ and $K_{\mathrm{d}} = f_{\mathrm{oc}}K_{\mathrm{oc}} = 0.010\times410 = 4.1\ \mathrm{L\,kg^{-1}}$. The relation is good to a factor of **three** for **non-polar** organics and **useless** for **ionisable** compounds — acids, bases and **PFAS** — whose sorption depends on **pH**, on the **surface charge** of the mineral and on **air–water interfaces**, which is why PFAS are mobile at low organic carbon and yet **stick** to the **water table**.
:::
:::

::: exercise The plume length {level=2 check="50"}
A plume has $v = 0.05\ \mathrm{m\,d^{-1}}$ and a first-order degradation rate of $10^{-3}\ \mathrm{d^{-1}}$. Find the e-folding plume length.
::: solution
$L_{\mathrm{e}} = v/\lambda = 0.05/10^{-3} = 50\ \mathrm{m}$. A 50-m e-folding length means a 1000-fold reduction in 350 m, so a readily biodegradable plume of BTEX or benzene is naturally short; a recalcitrant one with $\lambda = 10^{-5}\ \mathrm{d^{-1}}$ has an e-folding length of 5 km and reaches the next town.
:::
:::

::: exercise The mass discharge {level=2 check="4.3"}
A plume's cross-section carries a discharge of $0.1\ \mathrm{m^{3}\,s^{-1}}$ at a mean concentration of $500\ \mu\mathrm{g\,L^{-1}}$. Find the mass discharge in kg d⁻¹.
::: solution
$\dot M = 0.5\ \mathrm{g\,m^{-3}}\times0.1\ \mathrm{m^{3}\,s^{-1}} = 0.05\ \mathrm{g\,s^{-1}} = 4.3\ \mathrm{kg\,d^{-1}}$. Over a **ten-year** source life that is **16 tonnes** of contaminant, which is why the **source** and not the **plume** is the managed quantity.
:::
:::

::: exercise The breakthrough curve {level=3 check="0.87"}
For the plume of the worked example ($x = 50\ \mathrm{m}$, $v = 0.1\ \mathrm{m\,d^{-1}}$, $D_{\mathrm{h}} = 1\ \mathrm{m^{2}\,d^{-1}}$), find $C/C_0$ at 1000 days.
::: solution
$$
\frac{x - vt}{2\sqrt{D_{\mathrm{h}}t}} = \frac{50 - 100}{2\sqrt{1000}} = -0.791, \qquad
\frac{C}{C_0} = \tfrac{1}{2}\left[1 - \mathrm{erf}(-0.791)\right] = \tfrac{1}{2}(1 + 0.736) = 0.87 .
$$
The erfc form is why a plume's concentration approaches its source value so slowly: at twice the arrival time the receptor still reads 87 per cent, and at five times the arrival time it reads 98 per cent — the long tail that makes a five-year clean-up target physically unattainable.
:::
:::

::: exercise The scale-dependent dispersivity {level=3 check="50"}
A plume is 500 m long. Using the 10 per cent rule, find the longitudinal dispersivity, and the ratio of the resulting $D_{\mathrm{h}}$ to that computed from a laboratory value of 1 cm at a velocity of $0.1\ \mathrm{m\,d^{-1}}$.
::: solution
$\alpha_{\mathrm{L}} = 0.1\times500 = 50\ \mathrm{m}$, so $D_{\mathrm{h}} = 50\times0.1 = 5\ \mathrm{m^{2}\,d^{-1}}$ against $0.01\times0.1 = 10^{-3}\ \mathrm{m^{2}\,d^{-1}}$ from the laboratory value — a factor of **5000**. The **spreading** of a plume goes as $\sqrt{D_{\mathrm{h}}t}$, so the **plume width** predicted with the laboratory dispersivity is too small by $\sqrt{5000} \approx 70$, and a **containment** design based on it puts its **pump-and-treat** wells **inside** the plume they were meant to capture. This single parameter error is the largest source of **remediation** cost overrun in the industry, and it is the reason the professional practice is to **calibrate** the dispersivity against the **observed plume** rather than to take it from a column.
:::
:::
