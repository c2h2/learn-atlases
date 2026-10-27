Carbon dioxide is the end of the line for carbon. With a standard Gibbs energy of formation of $-394.4\ \mathrm{kJ\,mol^{-1}}$ it sits at the bottom of the thermodynamic well into which all fuels and most organic products eventually fall, and that is why it accumulates: global energy-related emissions were about $37.8\ \mathrm{Gt}$ of $\mathrm{CO_2}$ in 2024 (IEA, *Global Energy Review 2025*), and the global annual mean concentration in the atmosphere passed $420$ parts per million in 2024 (NOAA), about $50\,\%$ above the pre-industrial level. The Intergovernmental Panel on Climate Change, in its Sixth Assessment Report (2021–2023), concluded that limiting warming to $1.5$ or $2\,^\circ\mathrm{C}$ requires net-zero $\mathrm{CO_2}$ emissions around or after the middle of the century, and that in most of its pathways some emissions from industry are balanced by **carbon dioxide capture and storage** (CCS) and by carbon dioxide removal.

Hydrogen is the other half of the story. About $100\ \mathrm{Mt}$ of it was used in 2024 (IEA, *Global Hydrogen Review 2025*), mostly for refining, ammonia and methanol, and almost all of it was made from natural gas or coal with the $\mathrm{CO_2}$ released; low-emission hydrogen was less than $1\,\%$ of the total. Hydrogen made without emissions would decarbonise ammonia ([[green-chemistry/industrial-inorganic]]) at a stroke, and combined with captured $\mathrm{CO_2}$ it could supply carbon for chemicals and fuels. Both ideas are old in chemistry and new in scale. This chapter treats the chemistry and thermodynamics of capturing $\mathrm{CO_2}$, using it and storing it; the routes to hydrogen and their emission intensities; and the use of chemical bonds — in hydrogen, ammonia, methanol and organic carriers — to store energy. As in the rest of the course, statistics are dated and policy is described rather than advocated. The electrochemistry of water electrolysis is in [[electrochemistry/fuel-cells-electrolysis]], and the atmospheric chemistry of greenhouse gases in [[environmental-chemistry/greenhouse-gases]].

## Capturing carbon dioxide

$\mathrm{CO_2}$ can be captured from three kinds of source: **concentrated process streams** (natural-gas processing, ammonia and hydrogen plants, ethanol fermentation, ethylene oxide plants), which contain $\mathrm{CO_2}$ at $15$–$100\,\%$ and are the cheapest to capture; **flue gases** from combustion in power plants, cement kilns, steel works and furnaces, with $4$–$30\,\%\ \mathrm{CO_2}$ at atmospheric pressure; and **air**, at about $0.042\,\%$. The minimum energy needed depends on the concentration, by a simple thermodynamic argument.

::: proposition Minimum work of separation {#prop-wmin}
A gas mixture behaving ideally, containing mole fraction $y$ of $\mathrm{CO_2}$, is separated at constant temperature $T$ and pressure into pure $\mathrm{CO_2}$ (a fraction $\phi$ of the $\mathrm{CO_2}$ in the feed) and a residual gas. The minimum (reversible) work per mole of $\mathrm{CO_2}$ captured is
$$
w_\mathrm{min} = \frac{RT}{\phi y}\Big[(1 - \phi y)\,s(y_\mathrm{r}) - s(y)\Big], \qquad s(z) = z\ln z + (1 - z)\ln(1 - z), \qquad y_\mathrm{r} = \frac{y(1 - \phi)}{1 - \phi y} ,
$$ {#eq-wmin}
where $y_\mathrm{r}$ is the mole fraction left in the residual gas. As $\phi \to 0$, $w_\mathrm{min} \to -RT\ln y$.
:::

::: proof
For ideal gases at fixed $T$ and $p$, the Gibbs energy of a mixture of $n$ moles exceeds that of the separated pure components by $nRT\sum_i x_i\ln x_i$ (the Gibbs energy of mixing, [[thermodynamics/mixtures]]), which for a binary mixture is $nRT\,s(x)$, with $s < 0$. The minimum work of an isothermal, isobaric separation is the increase in Gibbs energy between feed and products. Take $1$ mol of feed. The products are $\phi y$ mol of pure $\mathrm{CO_2}$ ($s = 0$) and $1 - \phi y$ mol of residual gas, whose $\mathrm{CO_2}$ content is $y - \phi y = y(1 - \phi)$, giving the mole fraction $y_\mathrm{r}$. So
$$
W_\mathrm{min} = G_\mathrm{products} - G_\mathrm{feed} = RT\big[(1 - \phi y)s(y_\mathrm{r}) - s(y)\big],
$$
and dividing by the $\phi y$ moles captured gives [[#eq-wmin]]. For the limit, expand for small $\phi$: removing $\delta n = \phi y$ moles of $\mathrm{CO_2}$ from a large reservoir costs the difference in chemical potential between pure $\mathrm{CO_2}$ and $\mathrm{CO_2}$ at mole fraction $y$, which is $-RT\ln y$ per mole. Real processes need two to five times the minimum, because absorption and desorption run at finite driving forces and the solvent must be heated, pumped and cooled.
:::

Note a practical subtlety: the minimum work grows only logarithmically as the source becomes more dilute, but the *volume* of gas that must be processed grows in inverse proportion, which dominates the cost of capture from air.

::: widget plot
f: 2.4789/(c*10^x)*((1 - c*10^x)*((10^x*(1 - c)/(1 - c*10^x))*ln((10^x*(1 - c)/(1 - c*10^x))) + (1 - (10^x*(1 - c)/(1 - c*10^x)))*ln(1 - (10^x*(1 - c)/(1 - c*10^x)))) - (10^x*ln(10^x) + (1 - 10^x)*ln(1 - 10^x))); -2.4789*ln(10^x)
x: -3.6, -0.05
y: 0, 25
sliders: c=0.9:0.1:0.99:0.01
labels: w_\mathrm{min}\ (\mathrm{kJ\,mol^{-1}}),\ \text{capture fraction } c; -RT\ln y
vlines: -3.377; -1.398; -0.921
caption: Minimum work [[#eq-wmin]] at $298\ \mathrm{K}$, in $\mathrm{kJ}$ per mole of $\mathrm{CO_2}$ captured, against $\log_{10}$ of the $\mathrm{CO_2}$ mole fraction in the feed ($x$), for capture fraction $c$ (slider), with the small-capture limit $-RT\ln y$. Vertical lines mark air ($420\ \mathrm{ppm}$), gas-turbine flue gas ($4\,\%$) and coal flue gas ($12\,\%$). The minimum rises from about $7\ \mathrm{kJ\,mol^{-1}}$ ($0.16\ \mathrm{GJ\,t^{-1}}$) for coal flue gas to about $21\ \mathrm{kJ\,mol^{-1}}$ ($0.48\ \mathrm{GJ\,t^{-1}}$) for air — only a factor of three — while the gas volume to be handled per tonne captured rises by a factor of about $300$.
:::

::: example How much energy must capture cost? {#ex-wmin}
Using [[#eq-wmin]] at $298\ \mathrm{K}$, find the minimum work per tonne of $\mathrm{CO_2}$ for $90\,\%$ capture from coal-fired flue gas ($y = 0.12$) and for $75\,\%$ capture from air ($y = 4.2\times10^{-4}$). Compare with the regeneration energy of the benchmark amine process, about $3.5$–$4\ \mathrm{GJ\,t^{-1}}$ of heat.
::: solution
**Flue gas.** $y_\mathrm{r} = 0.12\times0.10/(1 - 0.108) = 0.01345$; $1 - \phi y = 0.892$. Then $s(y_\mathrm{r}) = 0.01345\ln0.01345 + 0.98655\ln0.98655 = -0.05795 - 0.01336 = -0.0713$, and $s(0.12) = 0.12\ln0.12 + 0.88\ln0.88 = -0.2544 - 0.1125 = -0.3669$. So
$$
w_\mathrm{min} = \frac{8.314\times298.15}{0.108}\big[0.892\times(-0.0713) + 0.3669\big]\ \mathrm{J\,mol^{-1}} = 22\,953\times0.3033\ \mathrm{J\,mol^{-1}} = 6.96\ \mathrm{kJ\,mol^{-1}},
$$
i.e. $6.96/44.01\ \mathrm{GJ\,t^{-1}} = 0.158\ \mathrm{GJ\,t^{-1}}$.

**Air.** The same formula gives $20.6\ \mathrm{kJ\,mol^{-1}}$, $0.468\ \mathrm{GJ\,t^{-1}}$ (close to the limit $-RT\ln y = 19.3\ \mathrm{kJ\,mol^{-1}}$, because removing three-quarters of a trace component hardly changes the residual gas).

The amine process uses $3.5$–$4\ \mathrm{GJ}$ of heat per tonne, more than twenty times the minimum work for flue gas. The comparison is not quite fair — heat at $120\,^\circ\mathrm{C}$ is worth less than work, perhaps a quarter to a third as much in a power plant — but it shows that capture is far from the thermodynamic limit, and why improved solvents (hindered amines, piperazine blends) that lower regeneration energy to about $2.5\ \mathrm{GJ\,t^{-1}}$ matter. Compressing the captured $\mathrm{CO_2}$ to pipeline pressure (about $100$–$150\ \mathrm{bar}$) adds roughly $0.3$–$0.4\ \mathrm{GJ}$ of electricity per tonne.
:::
:::

### Capture technologies

The workhorse of post-combustion capture is **chemical absorption** in aqueous amines, developed for natural-gas sweetening in the 1930s. Flue gas at about $40\,^\circ\mathrm{C}$ meets a $30\,\%$ solution of 2-aminoethanol (monoethanolamine, MEA) in an absorber column; $\mathrm{CO_2}$ reacts with the amine to form a carbamate,
$$
\mathrm{CO_2 + 2\,RNH_2 \rightleftharpoons RNHCOO^- + RNH_3^+},
$$
and the loaded solvent is pumped to a stripper at about $120\,^\circ\mathrm{C}$, where steam reverses the reaction, releasing nearly pure $\mathrm{CO_2}$. The heat of absorption (about $80$–$90\ \mathrm{kJ}$ per mole of $\mathrm{CO_2}$ for MEA) must be supplied again in the stripper, together with the heat to warm the solvent and generate stripping steam, which together make up the regeneration energy. Amines degrade by oxidation and by reaction with $\mathrm{SO_2}$ and $\mathrm{NO_x}$, forming ammonia, nitrosamines and other products that must be controlled in the treated gas.

Alternatives include **physical absorption** (in methanol, Rectisol, or polyethylene glycol ethers, Selexol), suited to high-pressure gas; **adsorption** on zeolites, amine-functionalised silicas or metal–organic frameworks ([[materials-chemistry/porous-materials]]), regenerated by pressure, temperature or humidity swings; **membranes**; and **calcium looping**, in which CaO reacts with $\mathrm{CO_2}$ to give $\mathrm{CaCO_3}$ at about $650\,^\circ\mathrm{C}$ and is regenerated at $900\,^\circ\mathrm{C}$. Two process configurations avoid post-combustion separation: **pre-combustion capture** converts the fuel to $\mathrm{CO_2}$ and $\mathrm{H_2}$ (by reforming or gasification with shift) and separates them at high pressure, as ammonia plants already do; **oxy-fuel combustion** burns the fuel in oxygen, so the flue gas is $\mathrm{CO_2}$ and water, at the cost of an air-separation unit.

**Direct air capture** (DAC) uses either aqueous hydroxide solutions (forming carbonate, which is recovered as $\mathrm{CaCO_3}$ and calcined) or solid amine sorbents regenerated at about $100\,^\circ\mathrm{C}$. It is a form of carbon dioxide removal when the $\mathrm{CO_2}$ is stored permanently; plants operating in the mid-2020s capture thousands rather than millions of tonnes a year.

Captured $\mathrm{CO_2}$ is **stored** by injection into deep saline aquifers or depleted oil and gas reservoirs, typically below $800\ \mathrm{m}$ where it is a dense supercritical fluid ([[green-chemistry/safer-solvents]]). It is trapped by an impermeable cap rock, by capillary forces in the pore spaces, by dissolution in the formation brine and, over centuries to millennia, by mineralisation as carbonates. The Sleipner project in the Norwegian North Sea has injected about one million tonnes a year of $\mathrm{CO_2}$ separated from natural gas since 1996. The world's operating capture capacity was of the order of $50\ \mathrm{Mt\,CO_2}$ per year in 2024 (IEA and Global CCS Institute tracking), against the several gigatonnes per year envisaged by mid-century in many IPCC pathways; a large part has been used for enhanced oil recovery, which raises separate questions about net climate benefit.

::: warning Using CO₂ is not the same as removing it {#warn-ccu}
"Carbon capture and utilisation" (CCU) converts captured $\mathrm{CO_2}$ into products. Whether this reduces emissions depends on how long the carbon stays out of the atmosphere and on the energy used. Urea made from captured $\mathrm{CO_2}$ releases it within weeks when the fertiliser hydrolyses in soil; a synthetic fuel releases it when burnt, so it can at best replace a fossil fuel's emissions, and only if the hydrogen and energy used to make it are themselves low-emission. Durable storage — geological, or in mineral carbonates and long-lived materials such as concrete — is needed for carbon dioxide *removal*. A life-cycle assessment with a clear functional unit ([[green-chemistry/green-metrics#alg-lca]]) is the only way to compare a CCU route with the conventional product it replaces.
:::

## Using carbon dioxide

$\mathrm{CO_2}$ is kinetically inert and thermodynamically stable, so its reactions fall into two classes. **Reactions that keep the carbon at oxidation state $+4$** — carboxylations and carbonate formation — need little energy and can even be exothermic: urea synthesis ($2\,\mathrm{NH_3 + CO_2}$, [[green-chemistry/industrial-inorganic]]); salicylic acid by the Kolbe–Schmitt carboxylation of sodium phenoxide; cyclic carbonates from epoxides, $\mathrm{CO_2 + C_2H_4O \rightarrow C_3H_4O_3}$ (ethylene carbonate), with halide or metal catalysts and $100\,\%$ atom economy; polycarbonates and polyether carbonate polyols by catalytic copolymerisation of $\mathrm{CO_2}$ with epoxides, commercialised for polyurethane foams by Covestro in 2016; and **mineralisation**, $\mathrm{CaSiO_3 + CO_2 \rightarrow CaCO_3 + SiO_2}$, which is exothermic and permanent but slow and mass-intensive. **Reactions that reduce the carbon** — to CO, formic acid, methanol, methane or hydrocarbons — need energy, supplied as hydrogen, electricity or light, and are only as clean as that energy.

::: example Methanol from CO₂ {#ex-meoh}
Methanol can be made by $\mathrm{CO_2 + 3\,H_2 \rightarrow CH_3OH + H_2O}$ over Cu/ZnO catalysts ([[green-chemistry/petrochemicals]]). (a) Find the masses of $\mathrm{CO_2}$ and $\mathrm{H_2}$ per tonne of methanol and the reaction enthalpy (gaseous products; $\Delta_\mathrm{f}H^\circ$: $\mathrm{CH_3OH(g)}$ $-200.66$, $\mathrm{H_2O(g)}$ $-241.82$, $\mathrm{CO_2}$ $-393.51\ \mathrm{kJ\,mol^{-1}}$). (b) If the hydrogen comes from electrolysis at $52.5\ \mathrm{kWh\,kg^{-1}}$, how much electricity is needed per tonne of methanol?
::: solution
(a) Per mole of methanol ($32.04\ \mathrm{g}$): $44.01\ \mathrm{g}$ of $\mathrm{CO_2}$ and $3\times2.016 = 6.048\ \mathrm{g}$ of $\mathrm{H_2}$. Per tonne: $1.374\ \mathrm{t}$ of $\mathrm{CO_2}$ and $0.189\ \mathrm{t}$ of $\mathrm{H_2}$. $\Delta_\mathrm{r}H^\circ = -200.66 - 241.82 + 393.51 = -48.97\ \mathrm{kJ\,mol^{-1}}$: mildly exothermic, so the energy has already been "paid" in the hydrogen.

(b) $188.8\ \mathrm{kg}\times52.5\ \mathrm{kWh\,kg^{-1}} = 9.91\ \mathrm{MWh}$ per tonne of methanol. Since the lower heating value of methanol is about $20\ \mathrm{GJ\,t^{-1}} = 5.5\ \mathrm{MWh\,t^{-1}}$, a little over half of the electrical energy ends up in the fuel. One-third of the hydrogen leaves as water — the price of removing an oxygen atom from $\mathrm{CO_2}$; the reverse water–gas shift route via CO has the same overall stoichiometry. If the electricity has an emission intensity of $0.40\ \mathrm{kg\,CO_2\,kWh^{-1}}$ (a fossil-heavy grid), the hydrogen alone causes $3.96\ \mathrm{t\,CO_2}$ per tonne of methanol, nearly three times the $\mathrm{CO_2}$ the methanol contains: CCU via electrolytic hydrogen reduces emissions only with very low-emission electricity.
:::
:::

## Hydrogen

::: definition Emission intensity of hydrogen {#def-h2-intensity}
The **emission intensity** of a hydrogen supply is the mass of greenhouse gases, in $\mathrm{CO_2}$-equivalent, emitted per kilogram of hydrogen delivered, over a stated boundary (usually well-to-gate: from extraction of the primary energy to the plant outlet, including upstream methane leakage). Hydrogen is often labelled by colour — **grey** (from natural gas without capture), **brown/black** (from coal), **blue** (from natural gas with CCS), **green** (by electrolysis with renewable electricity), **pink** (nuclear electricity), **turquoise** (methane pyrolysis) — but these labels are informal and do not state an intensity. Regulatory definitions are intensity-based: for example, the EU defines low-carbon hydrogen (in a delegated act adopted in 2025) as achieving a $70\,\%$ reduction relative to a fossil comparator of $94\ \mathrm{g\,CO_2e\,MJ^{-1}}$, i.e. at most about $3.38\ \mathrm{kg\,CO_2e}$ per kg $\mathrm{H_2}$, and the US clean hydrogen production tax credit (section 45V of the Internal Revenue Code, 2022) is tiered by intensity below $4\ \mathrm{kg\,CO_2e\,kg^{-1}}$.
:::

### Steam methane reforming

Most hydrogen is made by **steam methane reforming** (SMR), the front end of the ammonia plant ([[green-chemistry/industrial-inorganic]]): reforming over nickel at $800$–$900\,^\circ\mathrm{C}$ and $20$–$40\ \mathrm{bar}$, $\mathrm{CH_4 + H_2O \rightleftharpoons CO + 3\,H_2}$ ($\Delta_\mathrm{r}H^\circ = +206\ \mathrm{kJ\,mol^{-1}}$), followed by the water–gas shift and purification by pressure-swing adsorption. The reforming equilibrium, endothermic with an increase in moles, favours high temperature and low pressure (the thermodynamics of [[green-chemistry/petrochemicals#prop-dilution]] apply, with excess steam playing the role of diluent and also suppressing coke); the plant runs at moderate pressure because the hydrogen is needed under pressure downstream.

::: proposition Stoichiometric CO₂ and enthalpy of hydrogen from methane {#prop-smr}
The overall reaction of reforming plus complete shift, $\mathrm{CH_4(g) + 2\,H_2O(g) \rightarrow CO_2(g) + 4\,H_2(g)}$, releases at least
$$
\frac{M(\mathrm{CO_2})}{4M(\mathrm{H_2})} = \frac{44.01}{8.064} = 5.46\ \mathrm{kg\,CO_2\ per\ kg\,H_2}
$$
and requires $\Delta_\mathrm{r}H^\circ = +164.9\ \mathrm{kJ}$ per mole of methane ($41.2\ \mathrm{kJ}$ per mole of $\mathrm{H_2}$) with gaseous water. Methane pyrolysis, $\mathrm{CH_4 \rightarrow C(s) + 2\,H_2}$, needs $37.4\ \mathrm{kJ}$ per mole of $\mathrm{H_2}$ and releases no $\mathrm{CO_2}$, but yields $2.98\ \mathrm{kg}$ of solid carbon per kg of hydrogen and only half of the hydrogen per methane.
:::

::: proof
Carbon balance: each $\mathrm{CH_4}$ yields one $\mathrm{CO_2}$ and four $\mathrm{H_2}$, so the mass ratio is $44.01/(4\times2.016)$. Enthalpy, by Hess's law from NBS formation enthalpies ($\mathrm{CH_4}$ $-74.81$, $\mathrm{H_2O(g)}$ $-241.82$, $\mathrm{CO_2}$ $-393.51\ \mathrm{kJ\,mol^{-1}}$): $\Delta_\mathrm{r}H^\circ = -393.51 - (-74.81 - 2\times241.82) = +164.94\ \mathrm{kJ\,mol^{-1}}$, i.e. the sum of reforming ($+206.1$) and shift ($-41.2$). For pyrolysis $\Delta_\mathrm{r}H^\circ = -\Delta_\mathrm{f}H^\circ(\mathrm{CH_4}) = +74.81\ \mathrm{kJ\,mol^{-1}}$, per two $\mathrm{H_2}$; the carbon is $12.011/(2\times2.016)$ kg per kg of hydrogen. Both figures are minima: real plants burn additional methane to supply the endothermic heat and raise steam.
:::

Including the fuel burnt in the reformer furnace, an SMR plant without capture emits about $9$–$11\ \mathrm{kg}$ of $\mathrm{CO_2}$ per kilogram of hydrogen directly, more if upstream methane leakage is counted. **Blue hydrogen** captures the process $\mathrm{CO_2}$ (easy: it is concentrated and at pressure) and, for high capture rates, the furnace flue gas too, or uses **autothermal reforming**, in which oxygen is fed to the reformer so that all the $\mathrm{CO_2}$ ends up in the high-pressure process stream. Its net intensity depends strongly on the capture rate and on methane leakage in the gas supply chain, since methane has a 100-year global warming potential of $29.8$ (IPCC AR6).

### Electrolysis

Water electrolysis needs, thermodynamically, $39.4\ \mathrm{kWh}$ per kilogram of hydrogen at the thermoneutral voltage, and commercial systems used about $50$–$55\ \mathrm{kWh\,kg^{-1}}$ as of 2026 ([[electrochemistry/fuel-cells-electrolysis]]). The emission intensity is therefore that of the electricity, multiplied by about $50$.

::: widget plot
f: e*x/1000; 10; 3.38
x: 0, 800
y: 0, 45
sliders: e=52.5:40:60:0.5
labels: \text{electrolysis};\ \text{SMR without capture (about 10)}; \text{EU low-carbon threshold}
caption: Emission intensity of electrolytic hydrogen, in $\mathrm{kg\,CO_2}$ per kg $\mathrm{H_2}$, against the emission intensity of the electricity used in $\mathrm{g\,CO_2\,kWh^{-1}}$ ($x$), for an electrolyser consuming $e$ kWh per kilogram (slider), compared with unabated steam reforming (about $10$) and the EU low-carbon threshold ($3.38$). At $52.5\ \mathrm{kWh\,kg^{-1}}$, electrolysis matches SMR at about $190\ \mathrm{g\,kWh^{-1}}$ and meets the threshold only below about $64\ \mathrm{g\,kWh^{-1}}$. Average grids in many countries in the mid-2020s emit several hundred grams per kilowatt-hour, which is why rules on low-emission hydrogen require dedicated renewable or nuclear supply, matched in time and location.
:::

::: example Grid electricity for hydrogen {#ex-grid}
An electrolyser uses $52.5\ \mathrm{kWh}$ per kilogram of hydrogen. Find (a) the grid emission intensity at which its hydrogen has the same intensity as SMR without capture ($10\ \mathrm{kg\,CO_2\,kg^{-1}}$), (b) the intensity at which it meets $3.38\ \mathrm{kg\,CO_2e\,kg^{-1}}$, and (c) the electricity needed to supply all of the $100\ \mathrm{Mt}$ of hydrogen used in 2024 by electrolysis.
::: solution
(a) $10\ \mathrm{kg}/52.5\ \mathrm{kWh} = 0.190\ \mathrm{kg\,kWh^{-1}} = 190\ \mathrm{g\,kWh^{-1}}$.

(b) $3.38/52.5 = 0.0644\ \mathrm{kg\,kWh^{-1}} = 64\ \mathrm{g\,kWh^{-1}}$.

(c) $10^{11}\ \mathrm{kg}\times52.5\ \mathrm{kWh\,kg^{-1}} = 5.25\times10^{12}\ \mathrm{kWh} = 5250\ \mathrm{TWh}$ per year — roughly a fifth of world electricity generation in the mid-2020s, which was of the order of $30\,000\ \mathrm{TWh}$. Replacing today's fossil hydrogen, before any new uses, would therefore need an amount of low-emission electricity comparable to the output of all the world's wind and solar plants at that time. This scale argument, rather than the chemistry, is why low-emission hydrogen is usually directed first to existing uses (ammonia, refining) and to applications with few alternatives.
:::
:::

## Storing energy in chemical bonds

Electricity from wind and sunshine varies by the hour and the season. Batteries ([[electrochemistry/batteries]]) store it efficiently for hours to days; for weeks and months, and for transport over long distances, energy can be stored in chemical bonds. The options are hydrogen itself (compressed to $350$–$700\ \mathrm{bar}$, liquefied at $20\ \mathrm{K}$, or stored in salt caverns), and **hydrogen carriers**: ammonia ($17.8\,\%$ hydrogen by mass, liquid at $-33\,^\circ\mathrm{C}$ or under $10\ \mathrm{bar}$ at room temperature, with an existing global trade), methanol and synthetic hydrocarbons (which need a carbon source), and **liquid organic hydrogen carriers** (LOHCs) such as the toluene–methylcyclohexane pair ($6.2\,\%$ by mass) or dibenzyltoluene, which are hydrogenated for storage and dehydrogenated, endothermically, on release.

::: proposition Round-trip efficiency of a conversion chain {#prop-roundtrip}
If energy passes through a sequence of conversion and storage steps with efficiencies $\eta_1, \eta_2, \dots, \eta_k$ (each defined as useful energy out over energy in, on a consistent heating-value basis), the round-trip efficiency is
$$
\eta_\mathrm{RT} = \prod_{i=1}^{k}\eta_i ,
$$ {#eq-roundtrip}
and the energy that must be generated to deliver one unit is $1/\eta_\mathrm{RT}$.
:::

::: proof
Let $E_0$ enter the first step. By definition of efficiency the output of step $i$ is $\eta_i$ times its input, which is the output of step $i - 1$; by induction the output of step $k$ is $E_0\prod\eta_i$. The result is the energy analogue of [[green-chemistry/green-principles#prop-overall-yield]], and like it, it is dominated by the weakest steps. Consistency of basis matters: electrolyser efficiencies are often quoted on the higher heating value and fuel-cell efficiencies on the lower, and mixing them overstates $\eta_\mathrm{RT}$ by up to $18\,\%$, the ratio of the two heating values.
:::

::: example Power to hydrogen to power {#ex-roundtrip}
Estimate the round-trip efficiency of storing electricity as compressed hydrogen and regenerating electricity in a fuel cell, with electrolysis at $52.5\ \mathrm{kWh\,kg^{-1}}$, compression consuming $10\,\%$ of the hydrogen's energy, and a fuel cell operating at $50\,\%$ efficiency (LHV basis). Compare it with a lithium-ion battery at about $90\,\%$.
::: solution
On the LHV basis ($33.3\ \mathrm{kWh\,kg^{-1}}$), the electrolyser efficiency is $33.3/52.5 = 0.634$. With compression $0.90$ and the fuel cell $0.50$:
$$
\eta_\mathrm{RT} = 0.634\times0.90\times0.50 = 0.285 .
$$
About $28\,\%$ of the electricity is recovered, against about $90\,\%$ for a battery. Storing a kilowatt-hour through hydrogen thus needs about $3.5\ \mathrm{kWh}$ of input, three times as much as a battery. The argument for chemical storage is not efficiency but **capacity and duration**: the energy stored in a salt cavern full of hydrogen (hundreds of gigawatt-hours) costs far less per kilowatt-hour of capacity than batteries, and its loss over months is negligible. For the same reason, where hydrogen is to be used as a chemical (in ammonia, steel or refining) rather than reconverted to electricity, the conversion back is avoided altogether, and the comparison becomes one of feedstock cost and emission intensity.
:::
:::

**Ammonia** is attractive as a carrier and as a fuel for ships because it carries no carbon and is already traded in large volumes. Its synthesis from electrolytic hydrogen in a Haber–Bosch loop needs about $10$–$12\ \mathrm{MWh}$ of electricity per tonne; it can be burnt in engines and turbines (with care to limit $\mathrm{NO_x}$ and $\mathrm{N_2O}$ formation) or cracked back to hydrogen over ruthenium or nickel catalysts. It is acutely toxic by inhalation and toxic to aquatic life, so its use as a fuel requires the strict safety regimes long applied in the fertiliser industry.

::: quiz
Which of the following uses of captured $\mathrm{CO_2}$ comes closest to permanent removal from the atmosphere?
- [ ] Making urea fertiliser
- [ ] Making synthetic aviation fuel with electrolytic hydrogen
- [x] Reacting it with calcium silicate minerals to form calcium carbonate
- [ ] Using it to carbonate soft drinks
::: solution
Mineral carbonation fixes the carbon in a thermodynamically stable solid that persists for geological times. Urea releases its $\mathrm{CO_2}$ when it hydrolyses in the soil within weeks; fuels release theirs when burnt; carbonated drinks release it within hours. Those routes can displace fossil carbon but do not store it.
:::
:::

::: history From Sleipner to the hydrogen economy {#hist-ccs}
Svante Arrhenius estimated in 1896 the warming that a doubling of atmospheric $\mathrm{CO_2}$ would cause, and Charles David Keeling began continuous measurements at Mauna Loa in 1958. Amine scrubbing of acid gases was patented by Robert Bottoms in 1930, for natural-gas treatment. The term "hydrogen economy" was popularised by John Bockris in the early 1970s; large industrial electrolysers had already been built in Norway (Rjukan, from the late 1920s) to supply hydrogen for ammonia from hydroelectric power. Injection of separated $\mathrm{CO_2}$ for storage began at Sleipner in 1996, and the IPCC published a special report on carbon dioxide capture and storage in 2005. The IPCC's *Global Warming of 1.5 °C* (2018) and Sixth Assessment Report (2021–2023) set out pathways with carbon dioxide removal. Covestro began producing polyols containing $\mathrm{CO_2}$ in 2016, and the IEA's annual *Global Hydrogen Review* has tracked the sector since 2021.
:::

## Where this leads

The thermodynamics of this chapter — mixing, equilibrium, heating values — come from [[thermodynamics/free-energy]] and [[thermodynamics/mixtures]]; the electrochemistry of electrolysers and fuel cells from [[electrochemistry/fuel-cells-electrolysis]]; the sorbents and catalysts from [[materials-chemistry/porous-materials]] and [[materials-chemistry/energy-materials]]. The climate science behind the emission targets is in [[environmental-chemistry/greenhouse-gases]]. The last chapter, [[green-chemistry/circular-economy]], completes the picture of non-fossil carbon by keeping the carbon already in products in use.

::: summary
- Global energy-related $\mathrm{CO_2}$ emissions were about $37.8\ \mathrm{Gt}$ in 2024 (IEA), and atmospheric $\mathrm{CO_2}$ passed $420\ \mathrm{ppm}$ (NOAA); IPCC pathways to $1.5$–$2\,^\circ\mathrm{C}$ include CCS and carbon dioxide removal.
- The minimum separation work, from the Gibbs energy of mixing, is about $7\ \mathrm{kJ\,mol^{-1}}$ for $90\,\%$ capture from coal flue gas and about $21\ \mathrm{kJ\,mol^{-1}}$ from air; amine processes use $3.5$–$4\ \mathrm{GJ\,t^{-1}}$ of heat, many times the minimum.
- Capture by absorption, adsorption, membranes or looping; pre-combustion and oxy-fuel configurations; storage in saline aquifers and depleted reservoirs, with about $50\ \mathrm{Mt\,a^{-1}}$ of capacity operating in 2024.
- $\mathrm{CO_2}$ utilisation that keeps carbon at $+4$ (urea, carbonates, polycarbonates, minerals) needs little energy; reduction to methanol or fuels needs hydrogen ($0.189\ \mathrm{t}$ per t methanol) and is low-emission only with low-emission electricity. Only durable storage is removal.
- SMR releases at least $5.46\ \mathrm{kg\,CO_2}$ per kg $\mathrm{H_2}$ (about $9$–$11$ in practice); electrolytic hydrogen's intensity is about $50$ times the grid intensity, matching SMR near $190\ \mathrm{g\,kWh^{-1}}$. Low-emission hydrogen was under $1\,\%$ of about $100\ \mathrm{Mt}$ in 2024 (IEA).
- Chemical energy storage (hydrogen, ammonia, methanol, LOHCs) trades efficiency (round-trip about $30\,\%$ for power–hydrogen–power) for capacity and duration.
:::

## Exercises

::: exercise CO₂ from reforming {level=1 check="5.46"}
What is the minimum mass of $\mathrm{CO_2}$ released per kilogram of hydrogen made by $\mathrm{CH_4 + 2\,H_2O \rightarrow CO_2 + 4\,H_2}$? (Enter it in kg.)
::: solution
$44.01/(4\times2.016) = 5.46\ \mathrm{kg}$ per kg of $\mathrm{H_2}$.
:::
:::

::: exercise Hydrogen in ammonia {level=1 check="17.8"}
What percentage of the mass of ammonia is hydrogen? ($M(\mathrm{H}) = 1.008$, $M(\mathrm{NH_3}) = 17.031\ \mathrm{g\,mol^{-1}}$.) (Enter it in per cent.)
::: solution
$3\times1.008/17.031 = 0.178$, i.e. $17.8\,\%$ — about three times the hydrogen content by mass of methylcyclohexane as an LOHC, and, as a liquid at modest pressure, more hydrogen per litre than liquid hydrogen itself.
:::
:::

::: exercise Electrolysis on a fossil grid {level=1 check="10.5"}
An electrolyser using $52.5\ \mathrm{kWh\,kg^{-1}}$ draws electricity with an emission intensity of $200\ \mathrm{g\,CO_2\,kWh^{-1}}$. Find the emission intensity of its hydrogen. (Enter it in kg $\mathrm{CO_2}$ per kg $\mathrm{H_2}$.)
::: solution
$52.5\times0.200 = 10.5\ \mathrm{kg\,CO_2\,kg^{-1}}$, slightly more than unabated SMR.
:::
:::

::: exercise Capture from a gas turbine {level=2 check="9.78"}
Using [[#eq-wmin]] at $298.15\ \mathrm{K}$, find the minimum work for $90\,\%$ capture of $\mathrm{CO_2}$ from gas-turbine exhaust with $y = 0.040$. (Enter it in $\mathrm{kJ}$ per mole of $\mathrm{CO_2}$, to three significant figures.)
::: solution
$\phi y = 0.036$, $1 - \phi y = 0.964$, $y_\mathrm{r} = 0.004/0.964 = 0.004149$. $s(y_\mathrm{r}) = 0.004149\ln0.004149 + 0.995851\ln0.995851 = -0.02276 - 0.00413 = -0.02689$. $s(0.04) = 0.04\ln0.04 + 0.96\ln0.96 = -0.12876 - 0.03919 = -0.16795$. $w_\mathrm{min} = (2478.9/0.036)[0.964\times(-0.02689) + 0.16795] = 68\,858\times0.14203 = 9780\ \mathrm{J\,mol^{-1}} = 9.78\ \mathrm{kJ\,mol^{-1}}$ ($0.222\ \mathrm{GJ\,t^{-1}}$), about $40\,\%$ more than for coal flue gas.
:::
:::

::: exercise Round trip through ammonia {level=2 check="0.366"}
Electricity is stored as ammonia and recovered in a turbine: electrolysis $70\,\%$ efficient, ammonia synthesis and storage $95\,\%$, and the ammonia-fired turbine $55\,\%$ (all on a consistent basis). Find the round-trip efficiency. (Enter it as a fraction, to three significant figures.)
::: solution
By [[#eq-roundtrip]], $\eta_\mathrm{RT} = 0.70\times0.95\times0.55 = 0.366$. The assumed efficiencies are optimistic; a realistic chain including ammonia cracking or compression is often nearer $0.25$–$0.30$.
:::
:::

::: exercise Mineral carbonation {level=2 check="2.64"}
What mass of wollastonite, $\mathrm{CaSiO_3}$ ($116.16\ \mathrm{g\,mol^{-1}}$), is needed to fix one tonne of $\mathrm{CO_2}$ by $\mathrm{CaSiO_3 + CO_2 \rightarrow CaCO_3 + SiO_2}$, assuming complete reaction? (Enter the mass in tonnes.)
::: solution
$116.16/44.01 = 2.64\ \mathrm{t}$, producing $3.64\ \mathrm{t}$ of carbonate and silica. Mineralisation of gigatonnes would mean mining and handling several times as much rock, which is why in-situ mineralisation (injecting $\mathrm{CO_2}$ into reactive basalts, as in Iceland's CarbFix project since 2012) is attractive.
:::
:::

::: exercise Direct air capture {level=3 check="0.468"}
Show that [[#eq-wmin]] tends to $-RT\ln y$ for small $\phi$ and evaluate the minimum work per tonne for $75\,\%$ capture from air ($y = 4.2\times10^{-4}$) at $298.15\ \mathrm{K}$. How much air must be processed per tonne captured? (Enter the minimum work in $\mathrm{GJ}$ per tonne, to three significant figures.)
::: hint
For the limit, write the change in Gibbs energy of removing $\mathrm{d}n$ moles of $\mathrm{CO_2}$ from a large reservoir at mole fraction $y$.
:::
::: solution
For small $\phi$, removing $\mathrm{d}n$ of $\mathrm{CO_2}$ from the mixture and delivering it pure raises its chemical potential from $\mu^\circ + RT\ln y$ to $\mu^\circ$; the rest of the mixture is unchanged to first order, so $\mathrm{d}G/\mathrm{d}n = -RT\ln y$, which is $19.27\ \mathrm{kJ\,mol^{-1}}$ for $y = 4.2\times10^{-4}$. At $\phi = 0.75$: $\phi y = 3.15\times10^{-4}$, $y_\mathrm{r} = 1.05\times10^{-4}/0.999685 = 1.0503\times10^{-4}$. $s(y_\mathrm{r}) = 1.0503\times10^{-4}\times(-9.1612) - 1.0503\times10^{-4} = -1.0673\times10^{-3}$ (using $(1 - z)\ln(1 - z) \approx -z$ for small $z$); $s(y) = 4.2\times10^{-4}\ln(4.2\times10^{-4}) + (1 - 4.2\times10^{-4})\ln(1 - 4.2\times10^{-4}) = -3.6855\times10^{-3}$. Then $w_\mathrm{min} = (2478.9/3.15\times10^{-4})[0.999685\times(-1.0673\times10^{-3}) + 3.6855\times10^{-3}] = 7.8695\times10^{6}\times2.6186\times10^{-3} = 20.61\ \mathrm{kJ\,mol^{-1}}$, i.e. $20.61/44.01 = 0.468\ \mathrm{GJ\,t^{-1}}$. Air: $1\ \mathrm{t}$ of $\mathrm{CO_2}$ is $22\,722\ \mathrm{mol}$; at $3.15\times10^{-4}$ mol captured per mole of air this needs $7.21\times10^{7}\ \mathrm{mol}$ of air, about $1.8\times10^{6}\ \mathrm{m^3}$ at $25\,^\circ\mathrm{C}$ and $1\ \mathrm{bar}$ — moving that air through contactors, not the thermodynamic minimum, dominates the energy and cost of DAC.
:::
:::

::: exercise Electricity for e-ammonia {level=3 check="9.72"}
Estimate the electricity needed to make one tonne of ammonia from electrolytic hydrogen at $52.5\ \mathrm{kWh}$ per kg $\mathrm{H_2}$, adding $0.40\ \mathrm{MWh}$ per tonne for air separation, compression and the synthesis loop. If the electricity has an emission intensity of $30\ \mathrm{g\,CO_2\,kWh^{-1}}$, compare the resulting emissions with the 2020 world average of $2.4\ \mathrm{t\,CO_2}$ per tonne of ammonia (IEA). (Enter the electricity in MWh per tonne, to three significant figures.)
::: solution
Hydrogen per tonne of ammonia: $\tfrac32\,\mathrm{H_2}$ per $\mathrm{NH_3}$, i.e. $3\times1.008/17.031 = 0.1776\ \mathrm{t} = 177.6\ \mathrm{kg}$. Electrolysis: $177.6\times52.5 = 9324\ \mathrm{kWh}$; with $400\ \mathrm{kWh}$ for the rest of the plant, $9724\ \mathrm{kWh} = 9.72\ \mathrm{MWh}$ per tonne. Emissions: $9724\times0.030\ \mathrm{kg} = 292\ \mathrm{kg\,CO_2}$, an $88\,\%$ reduction on $2.4\ \mathrm{t}$. Replacing the world's ammonia production of about $185\ \mathrm{Mt}$ (2020) in this way would need about $1800\ \mathrm{TWh}$ of low-emission electricity a year. Note too that if the ammonia is turned into urea, a carbon source is still needed; with electrolytic hydrogen there is no process $\mathrm{CO_2}$ from reforming to supply it.
:::
:::
