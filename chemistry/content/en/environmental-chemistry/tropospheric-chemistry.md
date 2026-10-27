In the summer of 1952 Arie Haagen-Smit, a biochemist at the California Institute of Technology who had been studying the flavour of pineapples, turned his apparatus on the brown haze that was making the eyes of Los Angeles sting and the leaves of its crops crack. He showed that the haze was not smoke at all but something manufactured in the air itself: when the exhaust of cars — nitrogen oxides and unburnt hydrocarbons — was exposed to sunlight, ozone appeared. This was a new kind of pollution. The London smog of December 1952, which killed thousands of people in a week, was a *reducing* smog of coal smoke, sulfur dioxide and fog, worst on cold, dark, still days. Los Angeles smog was an *oxidising*, photochemical smog, worst on hot, bright afternoons, and it could not be traced to any single chimney, because its key ingredient was a secondary product of chemistry.

This lesson explains that chemistry. Its hero is a radical present at about one molecule in $10^{13}$ — the hydroxyl radical, $\mathrm{OH}$ — which oxidises almost every gas emitted into the troposphere and so sets their lifetimes. Its plot is a radical chain ([[kinetics/chain-reactions]]) driven by sunlight ([[kinetics/photochemistry]]), in which nitrogen oxides act as a catalyst and volatile organic compounds as the fuel, and the by-product is ozone. Stratospheric ozone ([[environmental-chemistry/stratospheric-ozone]]) is a shield; ozone in the air we breathe is an oxidant that damages lungs and crops and is the third most important anthropogenic greenhouse gas.

## The hydroxyl radical, the detergent of the atmosphere

Most gases emitted to the atmosphere — methane, carbon monoxide, hydrocarbons, sulfur dioxide, ammonia, dimethyl sulfide, hydrochlorofluorocarbons — are not removed by $\mathrm{O_2}$ directly. Molecular oxygen is a ground-state triplet with strong bonds, and its reactions with closed-shell molecules have large barriers. What oxidises them is a small population of radicals made by sunlight, above all $\mathrm{OH}$. Its primary source is the photolysis of ozone at wavelengths short enough to give the excited atom $\mathrm{O(^1D)}$ (in practice $\lambda \lesssim 330\ \mathrm{nm}$, through the edge of the Huggins bands, since shorter UV does not reach the troposphere):
$$
\begin{aligned}
&\mathrm{O_3} + h\nu \rightarrow \mathrm{O(^1D)} + \mathrm{O_2} && J_{\mathrm{O^1D}}\\
&\mathrm{O(^1D)} + \mathrm{M} \rightarrow \mathrm{O(^3P)} + \mathrm{M} && k_\mathrm{M}\quad(\mathrm{M = N_2, O_2})\\
&\mathrm{O(^1D)} + \mathrm{H_2O} \rightarrow 2\,\mathrm{OH} && k_{\mathrm{H_2O}}
\end{aligned}
$$
The quenched ground-state atom simply re-forms ozone with $\mathrm{O_2}$, so it is a null cycle. Only the small fraction of $\mathrm{O(^1D)}$ atoms that meet a water molecule before being quenched makes radicals.

::: proposition Primary production of OH {#prop-oh-production}
At steady state in $\mathrm{O(^1D)}$, the rate of primary production of $\mathrm{OH}$ is
$$
P_{\mathrm{OH}} = 2\,\varepsilon\,J_{\mathrm{O^1D}}[\mathrm{O_3}],
\qquad
\varepsilon = \frac{k_{\mathrm{H_2O}}[\mathrm{H_2O}]}{k_{\mathrm{H_2O}}[\mathrm{H_2O}] + k_\mathrm{M}[\mathrm{M}]} ,
$$
where $\varepsilon$ is the fraction of excited atoms that react with water. Since $k_\mathrm{M}[\mathrm{M}] \gg k_{\mathrm{H_2O}}[\mathrm{H_2O}]$ in practice, $\varepsilon \approx (k_{\mathrm{H_2O}}/k_\mathrm{M})\,x_{\mathrm{H_2O}}$: OH production is proportional to ozone, to UV and to humidity. The result assumes no other important $\mathrm{O(^1D)}$ reactants and neglects secondary radical sources (photolysis of formaldehyde, nitrous acid and peroxides, and ozonolysis of alkenes), which can dominate in polluted air.
:::

::: proof Steady state of the excited atom {#proof-oh-production}
$\mathrm{O(^1D)}$ is formed at $J_{\mathrm{O^1D}}[\mathrm{O_3}]$ and lost by two first-order (in $\mathrm{O(^1D)}$) processes, so $\mathrm{d}[\mathrm{O(^1D)}]/\mathrm{d}t = J[\mathrm{O_3}] - (k_\mathrm{M}[\mathrm{M}] + k_{\mathrm{H_2O}}[\mathrm{H_2O}])[\mathrm{O(^1D)}]$. Its lifetime is about a nanosecond, so the steady-state approximation of [[kinetics/reaction-mechanisms]] is excellent: $[\mathrm{O(^1D)}] = J[\mathrm{O_3}]/(k_\mathrm{M}[\mathrm{M}] + k_{\mathrm{H_2O}}[\mathrm{H_2O}])$. Each reaction with water gives two $\mathrm{OH}$, so $P_{\mathrm{OH}} = 2k_{\mathrm{H_2O}}[\mathrm{H_2O}][\mathrm{O(^1D)}] = 2\varepsilon J[\mathrm{O_3}]$ with $\varepsilon$ the branching ratio, exactly as for the competing deactivation paths of an excited molecule in [[kinetics/photochemistry]].
:::

::: example What fraction of O(¹D) makes OH? {#ex-epsilon}
At $298\ \mathrm{K}$ and $1\ \mathrm{atm}$ with a water vapour mole fraction of $1.0\ \%$, use the JPL rate constants $k_{\mathrm{H_2O}} = 1.63\times10^{-10}e^{60/T}$, $k_{\mathrm{N_2}} = 2.15\times10^{-11}e^{110/T}$ and $k_{\mathrm{O_2}} = 3.3\times10^{-11}e^{55/T}\ \mathrm{cm^3\,s^{-1}}$ to find $\varepsilon$, and the OH production rate for $40\ \mathrm{ppb}$ of ozone and $J_{\mathrm{O^1D}} = 3.0\times10^{-5}\ \mathrm{s^{-1}}$ (a midday summer value at mid-latitudes).
::: solution
Rate constants at $298\ \mathrm{K}$: $k_{\mathrm{H_2O}} = 1.99\times10^{-10}$, $k_{\mathrm{N_2}} = 3.11\times10^{-11}$, $k_{\mathrm{O_2}} = 3.95\times10^{-11}\ \mathrm{cm^3\,s^{-1}}$. For air, $k_\mathrm{M} = 0.781\times3.11\times10^{-11} + 0.210\times3.95\times10^{-11} = 3.26\times10^{-11}\ \mathrm{cm^3\,s^{-1}}$. Working with mole fractions (the total density cancels),
$$
\varepsilon = \frac{1.99\times10^{-10}\times0.010}{1.99\times10^{-10}\times0.010 + 3.26\times10^{-11}\times0.990} = \frac{1.99\times10^{-12}}{1.99\times10^{-12} + 3.23\times10^{-11}} = 0.058 .
$$
Only about $6\ \%$ of the excited atoms make $\mathrm{OH}$. With $[\mathrm{O_3}] = 40\times10^{-9}\times2.46\times10^{19} = 9.85\times10^{11}\ \mathrm{cm^{-3}}$,
$$
P_{\mathrm{OH}} = 2\times0.058\times3.0\times10^{-5}\times9.85\times10^{11} = 3.4\times10^{6}\ \mathrm{cm^{-3}\,s^{-1}} .
$$
In drier or colder air — the upper troposphere, the poles, winter — $\varepsilon$ falls in proportion to the water content, which is one reason OH is concentrated in the humid, sunny tropics.
:::
:::

$\mathrm{OH}$ reacts with almost everything, so its own lifetime is short — about a second in clean air, a tenth of a second in a polluted city — and its concentration is in instantaneous steady state between production and loss:
$$
[\mathrm{OH}]_\text{ss} = \frac{P_{\mathrm{OH}}}{\sum_i k_i[\mathrm{X}_i]} ,
$$ {#eq-oh-ss}
where the denominator, the **OH reactivity** (in $\mathrm{s^{-1}}$), sums the pseudo-first-order loss rates to all reactants $\mathrm{X}_i$. In remote air the reactivity is dominated by $\mathrm{CO}$ and $\mathrm{CH_4}$; in forests by isoprene and terpenes; in cities by $\mathrm{NO_2}$ and anthropogenic hydrocarbons. With the production rate of [[#ex-epsilon]], $120\ \mathrm{ppb}$ of $\mathrm{CO}$ ($k = 2.3\times10^{-13}\ \mathrm{cm^3\,s^{-1}}$ at $1\ \mathrm{atm}$) and $1900\ \mathrm{ppb}$ of $\mathrm{CH_4}$ ($k = 6.3\times10^{-15}$ at $298\ \mathrm{K}$), the reactivity is $0.68 + 0.30 = 0.98\ \mathrm{s^{-1}}$ and $[\mathrm{OH}] \approx 3.5\times10^{6}\ \mathrm{cm^{-3}}$ at midday. At night, with no photolysis, it falls almost to zero. The global, diurnal and annual mean is about $1\times10^{6}\ \mathrm{cm^{-3}}$ — a mixing ratio of about $0.04\ \mathrm{ppt}$.

::: definition Lifetime against OH {#def-oh-lifetime}
For a species $\mathrm{X}$ removed by $\mathrm{OH + X \rightarrow products}$ with rate constant $k_\mathrm{X}$, the loss is pseudo-first-order in $\mathrm{X}$ and its **lifetime against OH** is
$$
\tau_\mathrm{X} = \frac{1}{k_\mathrm{X}\,\overline{[\mathrm{OH}]}} ,
$$
with $\overline{[\mathrm{OH}]}$ the appropriate average OH concentration (global mean $\approx 1\times10^{6}\ \mathrm{cm^{-3}}$ for long-lived species, which sample the whole troposphere; the local daytime value for short-lived ones). If $\mathrm{X}$ has other sinks, the total lifetime satisfies $1/\tau = \sum 1/\tau_i$.
:::

With $\overline{[\mathrm{OH}]} = 1\times10^{6}\ \mathrm{cm^{-3}}$ (rate constants from the JPL and IUPAC evaluations; temperature-dependent ones evaluated as indicated):

| species | $k_{\mathrm{OH}}/\mathrm{cm^3\,s^{-1}}$ | lifetime |
|---|---|---|
| methane, $\mathrm{CH_4}$ | $3.6\times10^{-15}$ (at $272\ \mathrm{K}$) | $8.8\ \mathrm{yr}$ |
| methyl chloroform, $\mathrm{CH_3CCl_3}$ | $6.1\times10^{-15}$ (at $272\ \mathrm{K}$) | $5.2\ \mathrm{yr}$ |
| carbon monoxide, $\mathrm{CO}$ | $2.3\times10^{-13}$ | $50\ \mathrm{d}$ |
| ethane, $\mathrm{C_2H_6}$ | $2.5\times10^{-13}$ (at $298\ \mathrm{K}$) | $46\ \mathrm{d}$ |
| sulfur dioxide, $\mathrm{SO_2}$ | $9\times10^{-13}$ | $13\ \mathrm{d}$ |
| nitrogen dioxide, $\mathrm{NO_2}$ | $1.1\times10^{-11}$ | $1\ \mathrm{d}$ |
| isoprene, $\mathrm{C_5H_8}$ | $1.0\times10^{-10}$ | $3\ \mathrm{h}$ |

(The methane value, $272\ \mathrm{K}$, is the temperature conventionally used to represent the mass-weighted troposphere for $\mathrm{CH_4}$.) Seven orders of magnitude in rate constant become seven orders of magnitude in lifetime, and with them the difference between a global greenhouse gas and a local precursor of smog.

::: example Weighing the OH with methyl chloroform {#ex-mcf}
Because the global OH concentration cannot be measured directly (it varies by orders of magnitude between day and night and place to place), it is inferred from a tracer with known emissions whose only important sink is OH. Industrial methyl chloroform, $\mathrm{CH_3CCl_3}$, was ideal: its emissions were well documented, and after its phase-out under the Montreal Protocol its decay rate could be measured directly. If the observed decay corresponds to a lifetime against tropospheric OH of $6.0$ years, what mean OH concentration does this imply? Use $k = 1.64\times10^{-12}\exp(-1520/T)\ \mathrm{cm^3\,s^{-1}}$ at $T = 272\ \mathrm{K}$.
::: solution
$k = 1.64\times10^{-12}\,e^{-5.588} = 6.14\times10^{-15}\ \mathrm{cm^3\,s^{-1}}$. From [[#def-oh-lifetime]],
$$
\overline{[\mathrm{OH}]} = \frac{1}{k\,\tau} = \frac{1}{6.14\times10^{-15}\ \mathrm{cm^3\,s^{-1}} \times 6.0\times3.156\times10^{7}\ \mathrm{s}} = 8.6\times10^{5}\ \mathrm{cm^{-3}} .
$$
Analyses of this kind (Prinn et al., *Science* 1995 and later updates from the AGAGE network) give a global mean near $1\times10^{6}\ \mathrm{cm^{-3}}$ with year-to-year variations of a few per cent. The method has a subtlety: as emissions fell, the remaining methyl chloroform became so dilute that uncertainties in residual emissions and ocean uptake began to dominate, and newer tracers are being used alongside it.
:::
:::

::: warning OH is not "used up" by pollution in a simple way {#warn-oh-buffer}
It is tempting to think that emitting more $\mathrm{CO}$ or methane simply titrates away the OH. Two effects complicate this. First, OH is continually recycled: when $\mathrm{OH}$ oxidises $\mathrm{CO}$ it makes $\mathrm{HO_2}$, and in the presence of $\mathrm{NO}$, $\mathrm{HO_2 + NO \rightarrow OH + NO_2}$ regenerates it, so the relevant budget is that of total $\mathrm{HO_x} = \mathrm{OH} + \mathrm{HO_2}$, and $\mathrm{NO_x}$ emissions *raise* OH. Second, the same chemistry produces ozone, which is itself the main OH source. It is true that extra methane lowers OH somewhat — which is why the *perturbation* lifetime of methane ($11.8$ years in IPCC AR6) exceeds its *total* lifetime (about $9$ years) — but the feedback is a factor of about $1.3$, not a runaway. Statements about the "oxidising capacity" of the atmosphere need the whole $\mathrm{HO_x}$–$\mathrm{NO_x}$–ozone system.
:::

## Nitrogen oxides and the photostationary state

The nitrogen oxides $\mathrm{NO}$ and $\mathrm{NO_2}$ (together $\mathrm{NO_x}$) are emitted mainly as $\mathrm{NO}$ from high-temperature combustion — in engines and power stations, by the Zeldovich mechanism $\mathrm{O + N_2 \rightarrow NO + N}$, $\mathrm{N + O_2 \rightarrow NO + O}$ — and from soils and lightning. In sunlight they interconvert rapidly:
$$
\begin{aligned}
&\mathrm{NO_2} + h\nu\ (\lambda < 420\ \mathrm{nm}) \rightarrow \mathrm{NO} + \mathrm{O(^3P)} && J_{\mathrm{NO_2}}\\
&\mathrm{O(^3P)} + \mathrm{O_2} + \mathrm{M} \rightarrow \mathrm{O_3} + \mathrm{M} && \text{fast}\\
&\mathrm{NO} + \mathrm{O_3} \rightarrow \mathrm{NO_2} + \mathrm{O_2} && k_{\mathrm{NO+O_3}}
\end{aligned}
$$
These three reactions make one ozone and destroy one — a **null cycle** that produces no net ozone but fixes the ratio of $\mathrm{NO_2}$ to $\mathrm{NO}$.

::: proposition The Leighton photostationary state {#prop-leighton}
If the only reactions interconverting $\mathrm{NO}$ and $\mathrm{NO_2}$ are the three above, then in sunlight (after a few minutes)
$$
[\mathrm{O_3}] = \frac{J_{\mathrm{NO_2}}}{k_{\mathrm{NO+O_3}}}\,\frac{[\mathrm{NO_2}]}{[\mathrm{NO}]} .
$$
With $J_{\mathrm{NO_2}} \approx 8\times10^{-3}\ \mathrm{s^{-1}}$ (overhead sun) and $k_{\mathrm{NO+O_3}} = 3.0\times10^{-12}e^{-1500/T} = 1.9\times10^{-14}\ \mathrm{cm^3\,s^{-1}}$ at $298\ \mathrm{K}$, a ratio $[\mathrm{NO_2}]/[\mathrm{NO}] = 1$ corresponds to about $17\ \mathrm{ppb}$ of ozone. The relation holds for $\mathrm{NO_x}$ alone in sunlight; departures from it (more $\mathrm{NO_2}$ than ozone accounts for) measure the peroxy radicals that convert $\mathrm{NO}$ to $\mathrm{NO_2}$ without consuming ozone.
:::

::: proof Steady state of NO₂ {#proof-leighton}
$\mathrm{d}[\mathrm{NO_2}]/\mathrm{d}t = -J_{\mathrm{NO_2}}[\mathrm{NO_2}] + k_{\mathrm{NO+O_3}}[\mathrm{NO}][\mathrm{O_3}]$. The relaxation time is $1/(J_{\mathrm{NO_2}} + k[\mathrm{O_3}]) \approx 1/(0.008 + 0.019)\ \mathrm{s} \approx 40\ \mathrm{s}$ for $40\ \mathrm{ppb}$ of ozone, so on any timescale longer than a few minutes the derivative is zero. Setting it to zero and solving for $[\mathrm{O_3}]$ gives the result. Numerically, $J/k = 8\times10^{-3}/1.95\times10^{-14} = 4.1\times10^{11}\ \mathrm{cm^{-3}}$, which is $4.1\times10^{11}/2.46\times10^{10} = 17\ \mathrm{ppb}$ at $1\ \mathrm{atm}$ and $298\ \mathrm{K}$.
:::

The photostationary state explains the most counter-intuitive feature of urban ozone. Where fresh $\mathrm{NO}$ is emitted — next to a busy road — it reacts with ozone at once ("$\mathrm{NO}$ titration"), so ozone is *lower* in city centres than in the suburbs and countryside downwind, where the $\mathrm{NO_x}$ has had time to process hydrocarbons and the ozone has had time to accumulate. Regulations that measure ozone only in city centres would miss its peaks.

::: widget plot
f: J/0.0195*x/24.6
x: 0, 6
y: 0, 120
sliders: J=8:1:10:0.5
labels: [\mathrm{O_3}]_\text{PSS}/\text{ppb}
caption: The Leighton photostationary ozone in ppb against the ratio $[\mathrm{NO_2}]/[\mathrm{NO}]$, for $J_{\mathrm{NO_2}}$ set by the slider in units of $10^{-3}\ \mathrm{s^{-1}}$ ($8$ for overhead sun, about $2$–$4$ near sunrise and sunset), at $298\ \mathrm{K}$ and $1\ \mathrm{atm}$. The null cycle alone can only *redistribute* oxygen atoms among $\mathrm{NO_2}$, $\mathrm{NO}$ and $\mathrm{O_3}$: to get from the background $30$–$40\ \mathrm{ppb}$ to the $100$–$200\ \mathrm{ppb}$ of a smog episode, something must turn $\mathrm{NO}$ into $\mathrm{NO_2}$ *without* using ozone.
:::

## Volatile organic compounds and net ozone production

That something is the oxidation of carbon monoxide and **volatile organic compounds** (VOCs) — hydrocarbons, alcohols, aldehydes and the large family of biogenic compounds such as isoprene and the terpenes. Their oxidation by OH produces peroxy radicals, $\mathrm{HO_2}$ and $\mathrm{RO_2}$, which convert $\mathrm{NO}$ to $\mathrm{NO_2}$ directly. The simplest case is carbon monoxide:
$$
\begin{aligned}
\mathrm{CO} + \mathrm{OH} &\rightarrow \mathrm{CO_2} + \mathrm{H}\\
\mathrm{H} + \mathrm{O_2} + \mathrm{M} &\rightarrow \mathrm{HO_2} + \mathrm{M}\\
\mathrm{HO_2} + \mathrm{NO} &\rightarrow \mathrm{OH} + \mathrm{NO_2}\\
\mathrm{NO_2} + h\nu &\rightarrow \mathrm{NO} + \mathrm{O}\\
\mathrm{O} + \mathrm{O_2} + \mathrm{M} &\rightarrow \mathrm{O_3} + \mathrm{M}\\
\hline
\text{net:}\quad \mathrm{CO} + 2\,\mathrm{O_2} &\rightarrow \mathrm{CO_2} + \mathrm{O_3}
\end{aligned}
$$
Both $\mathrm{OH}$ and $\mathrm{NO_x}$ are regenerated: $\mathrm{HO_x}$ are the chain carriers, $\mathrm{NO_x}$ is the catalyst, $\mathrm{CO}$ is the fuel, and ozone is the product. For a generic alkane $\mathrm{RH}$ (written $\mathrm{RCH_3}$ to show the carbonyl product) the chain is
$$
\begin{aligned}
\mathrm{RCH_3} + \mathrm{OH} &\rightarrow \mathrm{RCH_2} + \mathrm{H_2O}\\
\mathrm{RCH_2} + \mathrm{O_2} + \mathrm{M} &\rightarrow \mathrm{RCH_2O_2} + \mathrm{M}\\
\mathrm{RCH_2O_2} + \mathrm{NO} &\rightarrow \mathrm{RCH_2O} + \mathrm{NO_2}\\
\mathrm{RCH_2O} + \mathrm{O_2} &\rightarrow \mathrm{RCHO} + \mathrm{HO_2}\\
\mathrm{HO_2} + \mathrm{NO} &\rightarrow \mathrm{OH} + \mathrm{NO_2}\\
2\,(\mathrm{NO_2} + h\nu \rightarrow \mathrm{NO} + \mathrm{O};\ \mathrm{O} + \mathrm{O_2} &\rightarrow \mathrm{O_3})\\
\hline
\text{net:}\quad \mathrm{RCH_3} + 4\,\mathrm{O_2} &\rightarrow \mathrm{RCHO} + \mathrm{H_2O} + 2\,\mathrm{O_3}
\end{aligned}
$$
The aldehyde $\mathrm{RCHO}$ is itself oxidised or photolysed in further steps, each yielding more peroxy radicals and more ozone, so complete oxidation of a VOC can produce several ozone molecules per carbon. In the first step, OH abstracts a hydrogen atom (or adds to a double bond, for alkenes and aromatics); in the second, the carbon-centred radical adds $\mathrm{O_2}$ at nearly the collision rate; in the third, the peroxy radical transfers an oxygen atom to $\mathrm{NO}$; in the fourth, $\mathrm{O_2}$ abstracts the $\alpha$-hydrogen of the alkoxy radical, forming the carbonyl and $\mathrm{HO_2}$. Methane follows the same route through $\mathrm{CH_3O_2}$, formaldehyde and $\mathrm{CO}$, which is why it contributes to background tropospheric ozone over the whole globe.

::: example Counting ozone from methane oxidation {#ex-methane-ozone}
In high-$\mathrm{NO_x}$ air, methane is oxidised by the sequence $\mathrm{CH_4 \rightarrow CH_3O_2 \rightarrow CH_3O \rightarrow HCHO}$, then $\mathrm{HCHO + OH \rightarrow HCO + H_2O}$, $\mathrm{HCO + O_2 \rightarrow CO + HO_2}$, and finally $\mathrm{CO \rightarrow CO_2}$ as above. Assuming every peroxy radical reacts with $\mathrm{NO}$, how many ozone molecules are formed per methane oxidised to $\mathrm{CO_2}$ via this route?
::: solution
Count the $\mathrm{NO \rightarrow NO_2}$ conversions by peroxy radicals, since each $\mathrm{NO_2}$ so formed photolyses to one ozone. (1) $\mathrm{CH_4 + OH \rightarrow CH_3 + H_2O}$, $\mathrm{CH_3 + O_2 \rightarrow CH_3O_2}$, $\mathrm{CH_3O_2 + NO \rightarrow CH_3O + NO_2}$: **one**. (2) $\mathrm{CH_3O + O_2 \rightarrow HCHO + HO_2}$, $\mathrm{HO_2 + NO \rightarrow OH + NO_2}$: **two**. (3) $\mathrm{HCHO + OH \rightarrow HCO + H_2O}$, $\mathrm{HCO + O_2 \rightarrow CO + HO_2}$, $\mathrm{HO_2 + NO}$: **three**. (4) $\mathrm{CO + OH \rightarrow CO_2 + H}$, $\mathrm{H + O_2 \rightarrow HO_2}$, $\mathrm{HO_2 + NO}$: **four**. So **four ozone molecules** per methane, at the cost of three OH consumed (steps 1, 3, 4) and three regenerated (in steps 2, 3, 4 via $\mathrm{HO_2 + NO}$ — step 1's OH is regenerated in step 2). If instead formaldehyde *photolyses* by the radical channel $\mathrm{HCHO} + h\nu \rightarrow \mathrm{H} + \mathrm{HCO}$, two extra $\mathrm{HO_2}$ are created and the yield rises to five ozone plus a net gain of radicals. In low-$\mathrm{NO_x}$ air, peroxy radicals react with each other instead and methane oxidation can be a net ozone *sink*. The ozone yield of a VOC is therefore not a fixed number but a property of the chemical regime.
:::
:::

## NOx-limited and VOC-limited regimes

The chain needs both its catalyst and its fuel, and the most important practical question in air-quality management — *which emissions should be cut to reduce ozone?* — turns on which is in short supply. The answer depends on how the radical chain is terminated.

::: proposition Ozone production in the two limiting regimes {#prop-regimes}
Let $P_{\mathrm{HO_x}}$ be the primary production rate of radicals, $R = \sum k_i[\mathrm{VOC}_i]$ the VOC reactivity towards OH, and let the chain be terminated either by peroxy self-reaction, $\mathrm{HO_2 + HO_2 \rightarrow H_2O_2 + O_2}$ (rate constant $k_\mathrm{p}$), or by $\mathrm{OH + NO_2 + M \rightarrow HNO_3 + M}$ (rate constant $k_\mathrm{n}$). The ozone production rate is $P(\mathrm{O_3}) \approx k_{\mathrm{HO_2+NO}}[\mathrm{HO_2}][\mathrm{NO}] \approx R[\mathrm{OH}]$, and in the two limits:
- **$\mathrm{NO_x}$-limited** (low $\mathrm{NO_x}$, termination by peroxides): $P(\mathrm{O_3}) = k_{\mathrm{HO_2+NO}}\left(P_{\mathrm{HO_x}}/2k_\mathrm{p}\right)^{1/2}[\mathrm{NO}]$, proportional to $\mathrm{NO}$ and independent of VOC;
- **VOC-limited** (high $\mathrm{NO_x}$, termination by nitric acid): $P(\mathrm{O_3}) = P_{\mathrm{HO_x}}\,R/(k_\mathrm{n}[\mathrm{NO_2}])$, proportional to VOC reactivity and *inversely* proportional to $\mathrm{NO_2}$.
Conditions: radical steady state, each OH–VOC reaction yielding one $\mathrm{HO_2}$ that reacts with $\mathrm{NO}$ (one-step chain), photostationary $\mathrm{NO_x}$.
:::

::: proof Radical balance in the two limits {#proof-regimes}
At steady state the radical production equals the radical termination:
$$
P_{\mathrm{HO_x}} = 2k_\mathrm{p}[\mathrm{HO_2}]^2 + k_\mathrm{n}[\mathrm{OH}][\mathrm{NO_2}] ,
$$
while the chain propagation steps cycle $\mathrm{OH \rightleftharpoons HO_2}$ fast, so $R[\mathrm{OH}] \approx k_{\mathrm{HO_2+NO}}[\mathrm{HO_2}][\mathrm{NO}]$, which is also the rate $P(\mathrm{O_3})$ at which $\mathrm{NO}$ is converted to $\mathrm{NO_2}$ without ozone. *Low $\mathrm{NO_x}$*: the peroxide term dominates, $[\mathrm{HO_2}] = (P_{\mathrm{HO_x}}/2k_\mathrm{p})^{1/2}$, independent of VOC, and $P(\mathrm{O_3}) = k_{\mathrm{HO_2+NO}}[\mathrm{HO_2}][\mathrm{NO}]$ is linear in $\mathrm{NO}$. Adding VOC changes the OH/$\mathrm{HO_2}$ ratio but not the total chain rate. *High $\mathrm{NO_x}$*: the nitric-acid term dominates, $[\mathrm{OH}] = P_{\mathrm{HO_x}}/(k_\mathrm{n}[\mathrm{NO_2}])$, and $P(\mathrm{O_3}) = R[\mathrm{OH}] = P_{\mathrm{HO_x}}R/(k_\mathrm{n}[\mathrm{NO_2}])$. Here $\mathrm{NO_2}$ is a radical *sink*: more $\mathrm{NO_x}$ removes the chain carriers faster and *lowers* ozone production. Between the limits $P(\mathrm{O_3})$ passes through a maximum, at a $\mathrm{NO_x}$ level that rises with $R$. The general case requires solving the quadratic radical balance for $[\mathrm{OH}]$, which is what the figure below does.
:::

::: widget plot
f: 0.2927*R*Q/(0.1353*x + sqrt(0.01831*x^2 + 0.0021224*R^2*Q/x^2))
x: 0.05, 60
y: 0, 60
sliders: R=5:1:30:1; Q=10:1:30:1
labels: P(\mathrm{O_3})/\text{ppb h}^{-1}
caption: Ozone production rate against $\mathrm{NO_x}$ (ppb, with $\mathrm{NO} = \mathrm{NO_2}$) from the steady-state radical balance of [[#prop-regimes]], solved exactly. Sliders: VOC reactivity $R$ in $\mathrm{s^{-1}}$ and primary radical production $P_{\mathrm{HO_x}}$ in units of $10^{6}\ \mathrm{cm^{-3}\,s^{-1}}$. Rate constants: $k_{\mathrm{HO_2+NO}} = 8.5\times10^{-12}$, $k_\mathrm{p} = 2.9\times10^{-12}$, $k_\mathrm{n} = 1.1\times10^{-11}\ \mathrm{cm^3\,s^{-1}}$. Left of the peak (rising) is $\mathrm{NO_x}$-limited; right of it (falling) is VOC-limited, where cutting $\mathrm{NO_x}$ *increases* ozone production. Raising $R$ moves the peak to higher $\mathrm{NO_x}$ — the reason the same city can switch regime as its traffic fleet and vegetation change.
:::

::: example Which regime? {#ex-regime}
Using the model of the figure with $P_{\mathrm{HO_x}} = 1.0\times10^{7}\ \mathrm{cm^{-3}\,s^{-1}}$ and $R = 5\ \mathrm{s^{-1}}$, the ozone production rate is $16.7\ \mathrm{ppb\,h^{-1}}$ at $1\ \mathrm{ppb}$ of $\mathrm{NO_x}$ and $1.1\ \mathrm{ppb\,h^{-1}}$ at $50\ \mathrm{ppb}$. (a) Show that the high-$\mathrm{NO_x}$ value agrees with the VOC-limited formula. (b) In which regime is each point, and what does each imply for control strategy?
::: solution
(a) At $50\ \mathrm{ppb}$ of $\mathrm{NO_x}$, $[\mathrm{NO_2}] = 25\ \mathrm{ppb} = 6.15\times10^{11}\ \mathrm{cm^{-3}}$. The VOC-limited formula gives
$$
P(\mathrm{O_3}) = \frac{P_{\mathrm{HO_x}}R}{k_\mathrm{n}[\mathrm{NO_2}]} = \frac{1.0\times10^{7}\times5}{1.1\times10^{-11}\times6.15\times10^{11}} = 7.4\times10^{6}\ \mathrm{cm^{-3}\,s^{-1}},
$$
which is $7.4\times10^{6}\times3600/2.46\times10^{10} = 1.08\ \mathrm{ppb\,h^{-1}}$, matching the exact $1.1$. (b) At $50\ \mathrm{ppb}$ the curve is falling: the air is **VOC-limited**, typical of a city centre or a plume close to its source. Reducing VOCs lowers ozone production proportionally; reducing $\mathrm{NO_x}$ alone would, at first, *raise* it (this is the origin of the "weekend effect", higher ozone on Sundays when diesel traffic falls, observed in some cities). At $1\ \mathrm{ppb}$, left of the peak (which for $R = 5$ lies near $2\ \mathrm{ppb}$), the air is **$\mathrm{NO_x}$-limited**, typical of suburbs, rural areas and the regional background: here only $\mathrm{NO_x}$ reductions help, and VOC reductions do little. Since an urban plume moves from the first regime to the second as it ages downwind, regional ozone generally responds to $\mathrm{NO_x}$ controls, while local peaks in some cities respond first to VOC controls. Field measurements diagnose the regime from indicator ratios such as $\mathrm{H_2O_2/HNO_3}$, which compare the two termination channels.
:::
:::

::: quiz
In a VOC-limited urban area, the authorities reduce $\mathrm{NO_x}$ emissions by $30\ \%$ without changing VOC emissions. What is the most likely immediate effect on ozone in the city centre?
- [ ] It falls by about $30\ \%$, because $\mathrm{NO_x}$ is the catalyst.
- [x] It rises, because less $\mathrm{NO_2}$ terminates fewer radical chains and less $\mathrm{NO}$ titrates ozone.
- [ ] It is unchanged, because ozone depends only on sunlight.
- [ ] It falls, because less $\mathrm{NO_2}$ is photolysed.
::: solution
On the falling branch of the $P(\mathrm{O_3})$ curve, $\mathrm{NO_2}$ acts mainly as a radical sink via $\mathrm{OH + NO_2 \rightarrow HNO_3}$, so removing some of it *increases* the chain length and ozone production; at the same time less fresh $\mathrm{NO}$ is available to titrate ozone locally. Further downwind, where the air is $\mathrm{NO_x}$-limited, the same reduction lowers ozone — so the policy can still be right for the region, but the city-centre response is the opposite of the naive expectation.
:::
:::

## Night-time chemistry and reservoirs of NOx

At night, $\mathrm{NO_2}$ photolysis stops and OH vanishes, but oxidation continues through the **nitrate radical**:
$$
\mathrm{NO_2} + \mathrm{O_3} \rightarrow \mathrm{NO_3} + \mathrm{O_2},
\qquad
\mathrm{NO_3} + \mathrm{NO_2} + \mathrm{M} \rightleftharpoons \mathrm{N_2O_5} + \mathrm{M} .
$$
$\mathrm{NO_3}$ photolyses within seconds in daylight, so it exists only at night, when it oxidises alkenes and biogenic terpenes and dimethyl sulfide. Its partner $\mathrm{N_2O_5}$ hydrolyses on wet particles, $\mathrm{N_2O_5 + H_2O \rightarrow 2\,HNO_3}$, a heterogeneous reaction that is a major global sink of $\mathrm{NO_x}$ and a link to the particle chemistry of [[environmental-chemistry/particulates-acid-deposition]]. In the daytime, $\mathrm{NO_x}$ is removed mostly as nitric acid from $\mathrm{OH + NO_2}$, and stored as **peroxyacetyl nitrate** (PAN, $\mathrm{CH_3C(O)OONO_2}$), formed from acetylperoxy radicals and $\mathrm{NO_2}$. PAN is thermally unstable at surface temperatures (lifetime of an hour at $298\ \mathrm{K}$) but survives for months in the cold upper troposphere, so it carries $\mathrm{NO_x}$ from polluted regions to remote ones, where it decomposes on descent and makes ozone far from any source. PAN is also an eye irritant and phytotoxin — one of the components that made Los Angeles smog sting.

## Ozone as a pollutant

Ozone is a strong oxidant. At the surfaces of the respiratory tract it reacts with the unsaturated fatty acids and antioxidants of the lining fluid (by ozonolysis of $\mathrm{C{=}C}$ bonds and by oxidation of thiols), producing aldehydes, hydroperoxides and other reactive species that trigger inflammation; it is classified as a respiratory irritant, and long-term exposure is associated with reduced lung function and premature mortality in epidemiological studies. Plants take it up through their stomata, where it damages cell membranes and reduces photosynthesis and crop yields. It is also a greenhouse gas: the increase in tropospheric ozone since 1750 is assessed in IPCC AR6 to have caused an effective radiative forcing of about $0.47\ \mathrm{W\,m^{-2}}$.

Standards and guidelines, as of 2026 (quoted, not evaluated):

- The **WHO global air quality guidelines** (2021) recommend a peak-season mean of $60\ \mathrm{\mu g\,m^{-3}}$ (about $30\ \mathrm{ppb}$) of the daily maximum 8-hour mean, and $100\ \mathrm{\mu g\,m^{-3}}$ (about $51\ \mathrm{ppb}$) for the daily maximum 8-hour mean.
- In the **European Union**, Directive 2008/50/EC set a target value of $120\ \mathrm{\mu g\,m^{-3}}$ for the maximum daily 8-hour mean, not to be exceeded on more than 25 days per year averaged over three years; the revised Ambient Air Quality Directive (EU) 2024/2881 keeps ozone as a target value, with stricter thresholds taking effect from 2030.
- In the **United States**, the National Ambient Air Quality Standard set by the Environmental Protection Agency in 2015 is $0.070\ \mathrm{ppm}$ ($70\ \mathrm{ppb}$) for the annual fourth-highest daily maximum 8-hour average, averaged over three years.

These numbers differ because they serve different purposes: a WHO guideline is a health-based recommendation, while legally binding standards also weigh attainability and background ozone. Because a large part of surface ozone is regional or even hemispheric background (typically $30$–$50\ \mathrm{ppb}$ at northern mid-latitudes), cities cannot meet a strict ozone standard by local measures alone — a scientific fact that is one reason ozone is treated under international agreements such as the 1999 Gothenburg Protocol of the Convention on Long-Range Transboundary Air Pollution.

::: warning Ozone is highest downwind, not where the traffic is {#warn-ozone-location}
Students often expect ozone to track the other traffic pollutants. It does the opposite on short scales. Near a road, fresh $\mathrm{NO}$ destroys ozone by $\mathrm{NO + O_3 \rightarrow NO_2 + O_2}$; the total **odd oxygen** $\mathrm{O_x} = \mathrm{O_3} + \mathrm{NO_2}$ is nearly conserved, but it is shifted into $\mathrm{NO_2}$. Ozone is produced over hours as the plume drifts and the VOCs are oxidised, so the highest ozone usually appears tens of kilometres downwind, in the afternoon, often in suburban or rural areas. When comparing sites, use $\mathrm{O_x}$ rather than ozone alone, and never conclude that an area with low measured ozone has no ozone problem.
:::

::: history
After Haagen-Smit's laboratory demonstration (1952) that ozone forms from car exhaust in sunlight, Philip Leighton's monograph *Photochemistry of Air Pollution* (1961) gave the photostationary-state analysis that bears his name. For years the oxidant that started the chain was unknown; in 1971 Hiram Levy II proposed in *Science* that $\mathrm{OH}$, formed from $\mathrm{O(^1D)}$ and water, is present throughout the troposphere and controls the oxidation of methane and $\mathrm{CO}$. Paul Crutzen (1973) and William Chameides and James Walker (1973) then showed that the same chemistry can make ozone in the background troposphere, overturning the view that tropospheric ozone came only from the stratosphere. Global OH was first estimated quantitatively from the methyl chloroform budget by Ronald Prinn and colleagues from the 1980s; direct measurements of OH by laser-induced fluorescence and chemical ionisation became routine only in the 1990s.
:::

## Where this leads

Nitric acid, sulfuric acid and the oxidation products of VOCs condense to form the fine particles and acid deposition of [[environmental-chemistry/particulates-acid-deposition]]. Methane, ozone and the OH feedback are revisited as climate agents in [[environmental-chemistry/greenhouse-gases]]. The rate constants used here come from laboratory kinetics of the kind developed in [[kinetics/collision-theory]] and [[kinetics/transition-state-theory]], and the measurement of radicals and ozone precursors is part of [[environmental-chemistry/environmental-monitoring]].

::: summary
- The troposphere is oxidised by $\mathrm{OH}$, made from $\mathrm{O(^1D)} + \mathrm{H_2O}$ with yield $\varepsilon \approx 6\ \%$ per excited atom at $1\ \%$ water: $P_{\mathrm{OH}} = 2\varepsilon J_{\mathrm{O^1D}}[\mathrm{O_3}]$.
- $[\mathrm{OH}]$ is in steady state, $P/\sum k_i[\mathrm{X}_i]$; the global mean is about $10^{6}\ \mathrm{cm^{-3}}$, and the lifetime of a gas against OH is $1/(k\overline{[\mathrm{OH}]})$ — years for methane, weeks for CO, hours for isoprene.
- In sunlight $\mathrm{NO_x}$ and ozone reach the Leighton photostationary state $[\mathrm{O_3}] = J_{\mathrm{NO_2}}[\mathrm{NO_2}]/(k[\mathrm{NO}])$ — a null cycle that produces no net ozone.
- Peroxy radicals from CO and VOC oxidation convert $\mathrm{NO}$ to $\mathrm{NO_2}$ without consuming ozone, so $\mathrm{CO + 2\,O_2 \rightarrow CO_2 + O_3}$ with $\mathrm{HO_x}$ as chain carriers and $\mathrm{NO_x}$ as catalyst.
- Chain termination by $\mathrm{HO_2 + HO_2}$ gives a $\mathrm{NO_x}$-limited regime ($P(\mathrm{O_3}) \propto \mathrm{NO}$); termination by $\mathrm{OH + NO_2}$ gives a VOC-limited regime ($P(\mathrm{O_3}) \propto R/[\mathrm{NO_2}]$), where cutting $\mathrm{NO_x}$ can raise ozone locally.
- At night $\mathrm{NO_3}$ and $\mathrm{N_2O_5}$ take over; PAN carries $\mathrm{NO_x}$ to remote regions.
- Ozone is a respiratory irritant acting by oxidation of the airway lining; guidelines and standards as of 2026: WHO (2021) $100\ \mathrm{\mu g\,m^{-3}}$ (8-h) and $60\ \mathrm{\mu g\,m^{-3}}$ (peak season), EU target $120\ \mathrm{\mu g\,m^{-3}}$, US NAAQS $70\ \mathrm{ppb}$.
:::

## Exercises

::: exercise Lifetime of carbon monoxide against OH {level=1 check="50"}
With $k(\mathrm{OH + CO}) = 2.3\times10^{-13}\ \mathrm{cm^3\,s^{-1}}$ and $\overline{[\mathrm{OH}]} = 1.0\times10^{6}\ \mathrm{cm^{-3}}$, find the lifetime of CO. (Enter it in days, to two significant figures.)
::: solution
$\tau = 1/(k[\mathrm{OH}]) = 1/(2.3\times10^{-7}\ \mathrm{s^{-1}}) = 4.35\times10^{6}\ \mathrm{s} = 50\ \mathrm{d}$ — consistent with the budget estimate in [[environmental-chemistry/earth-system-chemistry]].
:::
:::

::: exercise Isoprene in a sunlit forest {level=1 check="0.56"}
Over a tropical forest at midday $[\mathrm{OH}] = 5\times10^{6}\ \mathrm{cm^{-3}}$. With $k(\mathrm{OH + isoprene}) = 1.0\times10^{-10}\ \mathrm{cm^3\,s^{-1}}$, find the lifetime of isoprene. (Enter it in hours, to two significant figures.)
::: solution
$\tau = 1/(1.0\times10^{-10}\times5\times10^{6}) = 2000\ \mathrm{s} = 0.56\ \mathrm{h}$, about half an hour. Isoprene is therefore oxidised within the boundary layer above the canopy, and its oxidation products — not isoprene itself — are what is transported.
:::
:::

::: exercise Photostationary ozone {level=1 check="31"}
At $298\ \mathrm{K}$ and $1\ \mathrm{atm}$ with $J_{\mathrm{NO_2}} = 6.0\times10^{-3}\ \mathrm{s^{-1}}$ and $[\mathrm{NO_2}]/[\mathrm{NO}] = 2.5$, find the photostationary ozone mixing ratio, using $k_{\mathrm{NO+O_3}} = 1.95\times10^{-14}\ \mathrm{cm^3\,s^{-1}}$ and $n_\text{air} = 2.46\times10^{19}\ \mathrm{cm^{-3}}$. (Enter it in ppb, to two significant figures.)
::: solution
$[\mathrm{O_3}] = (6.0\times10^{-3}/1.95\times10^{-14})\times2.5 = 7.69\times10^{11}\ \mathrm{cm^{-3}}$, i.e. $7.69\times10^{11}/2.46\times10^{10} = 31\ \mathrm{ppb}$.
:::
:::

::: exercise Humidity and OH {level=2 check="8.9"}
At $298\ \mathrm{K}$ and $1.000\ \mathrm{atm}$, $50\ \%$ relative humidity corresponds to a water vapour pressure of $1.58\ \mathrm{kPa}$ (half the saturated $3.17\ \mathrm{kPa}$). Using the rate constants of [[#ex-epsilon]], find the fraction $\varepsilon$ of $\mathrm{O(^1D)}$ that forms OH. (Enter $\varepsilon$ as a percentage, to two significant figures.)
::: solution
$x_{\mathrm{H_2O}} = 1.585/101.325 = 0.0156$. Then $\varepsilon = 1.99\times10^{-10}\times0.0156/(1.99\times10^{-10}\times0.0156 + 3.26\times10^{-11}\times0.9844) = 3.11\times10^{-12}/(3.11\times10^{-12} + 3.21\times10^{-11}) = 0.089$, i.e. $8.9\ \%$. Since $\varepsilon$ is nearly proportional to humidity, OH production in humid tropical air is several times that in dry continental winter air at the same ozone and UV.
:::
:::

::: exercise NO₂/NO ratio from ozone {level=2 check="3.0"}
In a sunlit rural area $[\mathrm{O_3}] = 50\ \mathrm{ppb}$ and $J_{\mathrm{NO_2}} = 8.0\times10^{-3}\ \mathrm{s^{-1}}$ at $298\ \mathrm{K}$ and $1\ \mathrm{atm}$. Predict $[\mathrm{NO_2}]/[\mathrm{NO}]$ from the photostationary state ($k = 1.95\times10^{-14}\ \mathrm{cm^3\,s^{-1}}$, $n_\text{air} = 2.46\times10^{19}\ \mathrm{cm^{-3}}$). If the measured ratio is $4.5$, what does that indicate? (Enter the predicted ratio, to two significant figures.)
::: solution
$[\mathrm{NO_2}]/[\mathrm{NO}] = k[\mathrm{O_3}]/J = 1.95\times10^{-14}\times1.23\times10^{12}/8.0\times10^{-3} = 3.0$. A measured ratio of $4.5$ means $\mathrm{NO}$ is being converted to $\mathrm{NO_2}$ faster than ozone alone can do it: peroxy radicals ($\mathrm{HO_2}$, $\mathrm{RO_2}$) are present and net ozone production is under way. The departure from the Leighton relation is a classic way to estimate peroxy-radical concentrations.
:::
:::

::: exercise Ozone yield of ethane {level=2 check="7"}
In high-$\mathrm{NO_x}$ air ethane is oxidised to acetaldehyde, $\mathrm{C_2H_6 \rightarrow C_2H_5O_2 \rightarrow C_2H_5O \rightarrow CH_3CHO}$ (with $\mathrm{HO_2}$), and acetaldehyde onward via $\mathrm{CH_3C(O)O_2}$, which after reaction with $\mathrm{NO}$ loses $\mathrm{CO_2}$ to give $\mathrm{CH_3O_2}$; the methyl peroxy radical then follows the methane route of [[#ex-methane-ozone]] from $\mathrm{CH_3O_2}$ onwards. Counting one ozone per peroxy + $\mathrm{NO}$ reaction, how many ozone molecules are made per ethane fully oxidised to $\mathrm{CO_2}$? (Enter the number.)
::: hint
List every peroxy radical formed: $\mathrm{C_2H_5O_2}$, $\mathrm{HO_2}$, $\mathrm{CH_3C(O)O_2}$, then the four of the methyl route.
:::
::: solution
(1) $\mathrm{C_2H_5O_2 + NO}$: one. (2) $\mathrm{C_2H_5O + O_2 \rightarrow CH_3CHO + HO_2}$, $\mathrm{HO_2 + NO}$: two. (3) $\mathrm{CH_3CHO + OH \rightarrow CH_3CO + H_2O}$, $\mathrm{CH_3CO + O_2 \rightarrow CH_3C(O)O_2}$, $\mathrm{CH_3C(O)O_2 + NO \rightarrow CH_3C(O)O + NO_2}$: three; $\mathrm{CH_3C(O)O \rightarrow CH_3 + CO_2}$, $\mathrm{CH_3 + O_2 \rightarrow CH_3O_2}$. (4) From $\mathrm{CH_3O_2}$ the methane route gives four more ($\mathrm{CH_3O_2}$, $\mathrm{HO_2}$ from $\mathrm{CH_3O}$, $\mathrm{HO_2}$ from $\mathrm{HCO}$, $\mathrm{HO_2}$ from $\mathrm{CO}$). Total: $3 + 4 = 7$ ozone molecules per ethane. In reality part of the acetylperoxy radical is stored as PAN and part of the formaldehyde photolyses, so the yield varies, but $\sim3$–$4$ ozone per carbon atom is typical of complete oxidation under high $\mathrm{NO_x}$.
:::
:::

::: exercise The NOx-limited formula {level=3 check="20"}
For $P_{\mathrm{HO_x}} = 1.0\times10^{7}\ \mathrm{cm^{-3}\,s^{-1}}$, $k_\mathrm{p} = 2.9\times10^{-12}$ and $k_{\mathrm{HO_2+NO}} = 8.5\times10^{-12}\ \mathrm{cm^3\,s^{-1}}$, use the $\mathrm{NO_x}$-limited expression of [[#prop-regimes]] to compute $P(\mathrm{O_3})$ at $[\mathrm{NO}] = 0.5\ \mathrm{ppb}$ ($1\ \mathrm{ppb} = 2.46\times10^{10}\ \mathrm{cm^{-3}}$). Compare with the exact model value in the figure at $1\ \mathrm{ppb}$ of $\mathrm{NO_x}$ (so $[\mathrm{NO}] = 0.5\ \mathrm{ppb}$) and $R = 30\ \mathrm{s^{-1}}$, and explain the difference. (Enter the limiting $P(\mathrm{O_3})$ in $\mathrm{ppb\,h^{-1}}$, to two significant figures.)
::: solution
$[\mathrm{HO_2}] = (P_{\mathrm{HO_x}}/2k_\mathrm{p})^{1/2} = (1.0\times10^{7}/5.8\times10^{-12})^{1/2} = 1.31\times10^{9}\ \mathrm{cm^{-3}}$. With $[\mathrm{NO}] = 0.5\times2.46\times10^{10} = 1.23\times10^{10}\ \mathrm{cm^{-3}}$,
$$
P(\mathrm{O_3}) = 8.5\times10^{-12}\times1.31\times10^{9}\times1.23\times10^{10} = 1.37\times10^{8}\ \mathrm{cm^{-3}\,s^{-1}},
$$
i.e. $1.37\times10^{8}\times3600/2.46\times10^{10} = 20\ \mathrm{ppb\,h^{-1}}$. The exact model at $R = 30\ \mathrm{s^{-1}}$ gives $19.5\ \mathrm{ppb\,h^{-1}}$, slightly less, because a few per cent of the radicals are still lost to $\mathrm{OH + NO_2}$; as $R$ grows at fixed $\mathrm{NO_x}$ the exact value approaches the limit from below ($19.9$ at $R = 100\ \mathrm{s^{-1}}$). The limiting formula is therefore an upper bound — and it shows that in the $\mathrm{NO_x}$-limited regime adding more VOC barely changes ozone production.
:::
:::

::: exercise OH from methyl chloroform {level=3 check="0.86"}
Suppose a tracer's observed atmospheric lifetime is $4.9$ years, of which loss to the ocean contributes a partial lifetime of $89$ years and loss in the stratosphere a partial lifetime of $38$ years, the rest being due to tropospheric OH. With $k_{\mathrm{OH}} = 6.14\times10^{-15}\ \mathrm{cm^3\,s^{-1}}$ at $272\ \mathrm{K}$, find the implied mean OH concentration. (Enter $\overline{[\mathrm{OH}]}$ in units of $10^{6}\ \mathrm{cm^{-3}}$, to two significant figures.)
::: hint
Partial lifetimes combine as rates: $1/\tau = \sum 1/\tau_i$.
:::
::: solution
$1/\tau_{\mathrm{OH}} = 1/4.9 - 1/89 - 1/38 = 0.2041 - 0.0112 - 0.0263 = 0.1665\ \mathrm{yr^{-1}}$, so $\tau_{\mathrm{OH}} = 6.0\ \mathrm{yr}$. Then $\overline{[\mathrm{OH}]} = 1/(k\tau_{\mathrm{OH}}) = 1/(6.14\times10^{-15}\times6.0\times3.156\times10^{7}) = 8.6\times10^{5}$, i.e. $0.86\times10^{6}\ \mathrm{cm^{-3}}$. The additional sinks shorten the total lifetime but must be removed before OH is inferred; neglecting them would overestimate OH by about $20\ \%$.
:::
:::
