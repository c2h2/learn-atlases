If the Earth had no atmosphere but kept its present reflectivity, its surface would average about $255\ \mathrm{K}$ — eighteen degrees below the freezing point of water. The actual global mean surface temperature is about $288\ \mathrm{K}$. The difference of some $33\ \mathrm{K}$ is the **greenhouse effect**, and it is made almost entirely by molecules present at less than one per cent of the air: water vapour, carbon dioxide, methane, nitrous oxide and ozone, with a growing contribution from synthetic halocarbons. Nitrogen and oxygen, $99\ \%$ of the atmosphere, contribute essentially nothing. Why some molecules trap infrared radiation and others do not is a question of molecular spectroscopy; how much a change in their concentration warms the planet is a question of radiative transfer; and why the $\mathrm{CO_2}$ we add stays so long, and what it does to the ocean, is a question of the carbon cycle and of carbonate equilibria. This lesson puts the three together, using the box models of [[environmental-chemistry/earth-system-chemistry]] and the vibrational selection rules of [[spectroscopy/vibrational-spectroscopy]].

## The planetary energy balance

::: proposition Effective radiating temperature {#prop-te}
A planet at distance where the solar irradiance is $S_0$, with Bond albedo $\alpha$ (the fraction of incident sunlight reflected), radiating as a black body at a uniform temperature $T_\mathrm{e}$, is in radiative balance when
$$
\frac{S_0(1-\alpha)}{4} = \sigma T_\mathrm{e}^4
\qquad\Longrightarrow\qquad
T_\mathrm{e} = \left[\frac{S_0(1-\alpha)}{4\sigma}\right]^{1/4},
$$
with $\sigma = 5.670\times10^{-8}\ \mathrm{W\,m^{-2}\,K^{-4}}$ the Stefan–Boltzmann constant. For the Earth ($S_0 = 1361\ \mathrm{W\,m^{-2}}$, $\alpha \approx 0.30$), $T_\mathrm{e} = 255\ \mathrm{K}$. This is the temperature at which the Earth *as seen from space* radiates, not the surface temperature.
:::

::: proof Absorbed sunlight equals emitted infrared {#proof-te}
The planet intercepts sunlight over its cross-section $\pi R^2$, absorbing $\pi R^2 S_0(1-\alpha)$. It emits from its whole surface area $4\pi R^2$ at $\sigma T_\mathrm{e}^4$ per unit area. In steady state the two are equal: $\pi R^2S_0(1-\alpha) = 4\pi R^2\sigma T_\mathrm{e}^4$, which gives the result. The factor $4$ is the ratio of area to cross-section — the global, day-and-night average of the incoming flux is $S_0/4 = 340\ \mathrm{W\,m^{-2}}$. Numerically, $1361\times0.70/4 = 238\ \mathrm{W\,m^{-2}}$ absorbed, and $T_\mathrm{e} = (238/5.670\times10^{-8})^{1/4} = 254.6\ \mathrm{K}$.
:::

The surface is warmer than $T_\mathrm{e}$ because the atmosphere is almost transparent to sunlight (which peaks near $0.5\ \mathrm{\mu m}$, by Wien's law $\lambda_\text{max} = 2898\ \mathrm{\mu m\,K}/T$ for $T = 5772\ \mathrm{K}$) but largely opaque to the thermal infrared emitted by the surface (peaking near $10\ \mathrm{\mu m}$ for $288\ \mathrm{K}$). Infrared-absorbing gases absorb the surface emission and re-emit it, both upward and downward, from colder levels higher up. The planet still has to emit $238\ \mathrm{W\,m^{-2}}$ to space, but it does so from an altitude of about $5\ \mathrm{km}$ on average, where the temperature is about $255\ \mathrm{K}$; because temperature falls with height in the troposphere, the surface below is warmer.

::: example A single-layer greenhouse {#ex-one-layer}
Model the atmosphere as one isothermal layer that is transparent to sunlight and absorbs a fraction $\varepsilon$ of the infrared from the surface (and, by Kirchhoff's law, emits with emissivity $\varepsilon$). Find the surface temperature, and the value of $\varepsilon$ that gives $288\ \mathrm{K}$.
::: solution
Let the surface be at $T_\mathrm{s}$ and the layer at $T_\mathrm{a}$. Balance at the top of the atmosphere (what leaves to space equals what is absorbed):
$$
(1-\varepsilon)\sigma T_\mathrm{s}^4 + \varepsilon\sigma T_\mathrm{a}^4 = \sigma T_\mathrm{e}^4 .
$$
Balance of the layer (absorbs $\varepsilon\sigma T_\mathrm{s}^4$, emits up and down): $\varepsilon\sigma T_\mathrm{s}^4 = 2\varepsilon\sigma T_\mathrm{a}^4$, so $T_\mathrm{a}^4 = T_\mathrm{s}^4/2$. Substituting,
$$
\sigma T_\mathrm{s}^4\left(1 - \varepsilon + \tfrac{\varepsilon}{2}\right) = \sigma T_\mathrm{e}^4
\quad\Longrightarrow\quad
T_\mathrm{s} = T_\mathrm{e}\left(\frac{2}{2-\varepsilon}\right)^{1/4} .
$$
A completely opaque layer ($\varepsilon = 1$) gives $T_\mathrm{s} = 2^{1/4}\times254.6 = 303\ \mathrm{K}$; $T_\mathrm{s} = 288\ \mathrm{K}$ requires $\varepsilon = 2[1 - (T_\mathrm{e}/T_\mathrm{s})^4] = 0.78$. The model is crude — it ignores convection, which carries heat upward and keeps the real surface cooler than radiation alone would, and the wavelength structure of the absorption — but it shows the essential point: raising the infrared opacity raises the surface temperature, with no change in the sunlight absorbed.
:::
:::

## Which molecules absorb infrared, and where

A molecule absorbs infrared radiation when a vibration changes its electric dipole moment (the gross selection rule of [[spectroscopy/vibrational-spectroscopy]]). Homonuclear diatomics — $\mathrm{N_2}$, $\mathrm{O_2}$ — have no dipole and none of their vibration changes it, so they are transparent (apart from very weak collision-induced bands). Molecules with three or more atoms, or heteronuclear diatomics, have infrared-active modes:

| gas | important bands | comment |
|---|---|---|
| $\mathrm{H_2O}$ | bending $6.3\ \mathrm{\mu m}$; pure rotation beyond $\sim 20\ \mathrm{\mu m}$ | strongest absorber overall; a feedback, not a forcing |
| $\mathrm{CO_2}$ | bending $\nu_2$ at $667\ \mathrm{cm^{-1}}$ ($15\ \mathrm{\mu m}$); asymmetric stretch $\nu_3$ at $2349\ \mathrm{cm^{-1}}$ ($4.3\ \mathrm{\mu m}$) | $15\ \mathrm{\mu m}$ band sits near the peak of Earth's emission |
| $\mathrm{CH_4}$ | $1306\ \mathrm{cm^{-1}}$ ($7.7\ \mathrm{\mu m}$) | edge of the window |
| $\mathrm{N_2O}$ | $1285\ \mathrm{cm^{-1}}$ ($7.8\ \mathrm{\mu m}$), $589\ \mathrm{cm^{-1}}$ | overlaps methane |
| $\mathrm{O_3}$ | $1042\ \mathrm{cm^{-1}}$ ($9.6\ \mathrm{\mu m}$) | inside the window |
| CFCs, HFCs, $\mathrm{SF_6}$, $\mathrm{CF_4}$ | C–F and C–Cl stretches, $800$–$1300\ \mathrm{cm^{-1}}$ | inside the window: very strong per molecule |

The symmetric stretch of $\mathrm{CO_2}$ ($1388\ \mathrm{cm^{-1}}$) is infrared-inactive because it does not change the dipole. Between about $8$ and $12\ \mathrm{\mu m}$ ($830$–$1250\ \mathrm{cm^{-1}}$) water vapour and $\mathrm{CO_2}$ absorb only weakly: this **atmospheric window** lets surface radiation escape directly to space. A molecule that absorbs in the window, where nothing else does, has a much larger effect per molecule than one whose band is already saturated — which is why a fluorinated gas can be thousands of times more potent than $\mathrm{CO_2}$.

::: widget plot
f: 1/(x^5*(exp(14388/(x*T)) - 1))*1e4; 1/(x^5*(exp(14388/(x*255)) - 1))*1e4
x: 2, 40
y: 0, 1.1
sliders: T=288:220:320:1
labels: B_\lambda(T)\ \text{(relative)}; B_\lambda(255\ \mathrm{K})
caption: Planck spectral radiance (arbitrary but common units) against wavelength in micrometres for the surface temperature $T$ (slider) and for the effective radiating temperature $255\ \mathrm{K}$. The peak lies near $10\ \mathrm{\mu m}$ (Wien: $2898/T$). Locate the absorption bands of the table: the $\mathrm{CO_2}$ band at $15\ \mathrm{\mu m}$ sits close to the peak, the ozone band at $9.6\ \mathrm{\mu m}$ and the C–F bands of fluorinated gases inside the $8$–$12\ \mathrm{\mu m}$ window. The area between the two curves is, very roughly, the radiation that the atmosphere intercepts and re-emits at colder temperatures.
:::

## Radiative forcing and climate sensitivity

::: definition Radiative forcing, effective radiative forcing and climate sensitivity {#def-forcing}
The **radiative forcing** $\Delta F$ of a perturbation (a change in a gas, aerosol or solar output) is the change in the net downward radiative flux at the top of the atmosphere (or tropopause) that it causes, in $\mathrm{W\,m^{-2}}$, before the surface temperature responds. The **effective radiative forcing** (ERF), used by IPCC AR6, also allows the rapid adjustments of the atmosphere and land surface (stratospheric temperature, clouds, water vapour) that occur within days to months. The global mean surface temperature response at equilibrium is approximately linear in the forcing,
$$
\Delta T_\text{eq} = \lambda\,\Delta F,
$$
with $\lambda$ the **climate sensitivity parameter** ($\mathrm{K\,W^{-1}\,m^2}$). The **equilibrium climate sensitivity** (ECS) is $\Delta T_\text{eq}$ for a doubling of $\mathrm{CO_2}$. IPCC AR6 (2021) assesses the ERF of doubled $\mathrm{CO_2}$ as $3.93\ \mathrm{W\,m^{-2}}$ and the ECS as $3\ \mathrm{°C}$ best estimate, likely $2.5$–$4\ \mathrm{°C}$ and very likely $2$–$5\ \mathrm{°C}$, so $\lambda \approx 0.8\ \mathrm{K\,W^{-1}\,m^2}$.
:::

Without feedbacks, the response is set by the **Planck response**: a warmer planet emits more. Differentiating $\sigma T_\mathrm{e}^4$ gives $4\sigma T_\mathrm{e}^3 = 3.7\ \mathrm{W\,m^{-2}\,K^{-1}}$ for a black body; the AR6 value of the Planck feedback, for the real atmosphere, is about $3.2\ \mathrm{W\,m^{-2}\,K^{-1}}$, so doubling $\mathrm{CO_2}$ alone would warm the Earth by about $3.93/3.2 = 1.2\ \mathrm{K}$. Feedbacks multiply this: the water-vapour feedback (warmer air holds more water, by Clausius–Clapeyron, about $7\ \%$ per kelvin), the lapse-rate, surface-albedo (melting snow and ice) and cloud feedbacks together roughly double to triple it.

How does the forcing depend on concentration? For a weakly absorbing gas — optically thin at all wavelengths — absorption is proportional to the amount, and so is forcing. For $\mathrm{CO_2}$ the centre of the $15\ \mathrm{\mu m}$ band is already completely opaque: adding more cannot absorb more at the band centre. Extra absorption happens in the band's wings, where the absorption coefficient falls away steeply.

::: proposition The logarithmic forcing of CO₂ {#prop-log-forcing}
For a strongly absorbing gas whose band-centre is saturated, the radiative forcing increases with the logarithm of the concentration. For $\mathrm{CO_2}$ the simplified expression of Myhre et al. (1998, *Geophysical Research Letters*), adopted in IPCC reports from 2001 to 2013, is
$$
\Delta F = 5.35\ \mathrm{W\,m^{-2}}\times\ln\frac{C}{C_0},
$$
with $C_0$ the reference (pre-industrial, $278\ \mathrm{ppm}$) concentration; each doubling adds the same $5.35\ln2 = 3.7\ \mathrm{W\,m^{-2}}$. Gases in intermediate regimes ($\mathrm{CH_4}$, $\mathrm{N_2O}$) have forcings scaling roughly as the square root of concentration, and optically thin gases (halocarbons) linearly. The formula is a fit to line-by-line radiative transfer calculations, valid for roughly $C$ from $C_0$ to about $4C_0$; AR6 uses a revised fit (Meinshausen et al., 2020) that includes overlap with $\mathrm{N_2O}$ and gives about $3.9\ \mathrm{W\,m^{-2}}$ ERF per doubling.
:::

::: proof Why the wings give a logarithm {#proof-log-forcing}
A heuristic argument (the full result needs line-by-line calculation). Suppose near the band the absorption cross section falls exponentially with distance from the band centre, $\sigma(\nu) = \sigma_0\exp(-\lvert\nu - \nu_0\rvert/\Gamma)$ — a reasonable description of the envelope of the $\mathrm{CO_2}$ band. The atmosphere is effectively opaque (optical depth $\sigma N > 1$, with $N$ the column) where $\lvert\nu - \nu_0\rvert < \Gamma\ln(\sigma_0N)$. So the width of the opaque region is
$$
\Delta\nu_\text{opaque} = 2\Gamma\ln(\sigma_0N) .
$$
Within this region, emission to space comes from the cold upper atmosphere rather than the warm surface, reducing the outgoing flux by roughly $\Delta B$ per unit wavenumber (the difference of Planck radiances at the two temperatures, nearly constant across the band). The reduction in outgoing radiation is $\Delta B\,\Delta\nu_\text{opaque}$, and changing $N$ from $N_0$ to $N$ changes it by
$$
\Delta F \approx 2\Gamma\,\Delta B\,\ln\frac{N}{N_0},
$$
logarithmic in concentration. In the optically thin limit the same integral gives $\Delta F \propto N$ instead. The logarithm explains why the first $100\ \mathrm{ppm}$ of added $\mathrm{CO_2}$ forces more than the next $100\ \mathrm{ppm}$, and why there is no saturation: the opaque region keeps widening.
:::

::: example Forcing and warming since pre-industrial times {#ex-forcing}
(a) Use [[#prop-log-forcing]] to find the forcing from $\mathrm{CO_2}$ for $410\ \mathrm{ppm}$ (2019) relative to $278\ \mathrm{ppm}$. (b) With $\lambda = 3/3.93 = 0.76\ \mathrm{K\,W^{-1}\,m^2}$, what equilibrium warming would the AR6 total anthropogenic ERF of $2.72\ \mathrm{W\,m^{-2}}$ eventually produce? Compare with the observed warming.
::: solution
(a) $\Delta F = 5.35\ln(410/278) = 5.35\times0.3886 = 2.08\ \mathrm{W\,m^{-2}}$. AR6, using the newer formula and including rapid adjustments, gives $2.16\ \mathrm{W\,m^{-2}}$ for 1750–2019 — close agreement for a three-parameter formula.

(b) $\Delta T_\text{eq} = 0.76\times2.72 = 2.1\ \mathrm{K}$. The observed warming of the 2011–2020 decade over 1850–1900 is assessed in AR6 as $1.09\ \mathrm{°C}$, about half the equilibrium value. The difference is the **thermal inertia of the ocean**: the climate system is not in equilibrium, and the Earth is still taking up energy (the **energy imbalance**, about $0.5$–$1\ \mathrm{W\,m^{-2}}$ in recent years), most of it into the ocean. Some further warming is therefore "committed" even at constant forcing. The calculation also shows why the forcing must be broken down by agent: the AR6 total of $2.72$ is the sum of about $+3.8\ \mathrm{W\,m^{-2}}$ from well-mixed greenhouse gases and ozone and about $-1.1\ \mathrm{W\,m^{-2}}$ from aerosols ([[environmental-chemistry/particulates-acid-deposition]]).
:::
:::

::: widget plot
f: 5.35*log(x/278); lam*5.35*log(x/278)
x: 278, 1200
y: 0, 10
sliders: lam=0.76:0.4:1.3:0.02
labels: \Delta F/\mathrm{W\,m^{-2}}; \Delta T_\text{eq}/\mathrm{K}
caption: Simplified $\mathrm{CO_2}$ forcing $5.35\ln(C/278)$ against concentration in ppm, and the equilibrium warming $\lambda\,\Delta F$ for a sensitivity parameter set by the slider ($0.76\ \mathrm{K\,W^{-1}\,m^2}$ corresponds to the AR6 best-estimate ECS of $3\ \mathrm{°C}$; $0.5$ and $1.0$ roughly span its *likely* range). Equal *ratios* of concentration give equal increments of forcing: $278\to556$ and $556\to1112\ \mathrm{ppm}$ each add $3.7\ \mathrm{W\,m^{-2}}$. Note how much of the uncertainty in future warming lies in $\lambda$, not in the chemistry.
:::

## The greenhouse gases

Assessed effective radiative forcing for 1750–2019 (IPCC AR6 WG1, Chapter 7, 2021), and mole fractions in 2019:

| agent | 2019 abundance | ERF $/\mathrm{W\,m^{-2}}$ |
|---|---|---|
| $\mathrm{CO_2}$ | $410\ \mathrm{ppm}$ | $2.16$ |
| $\mathrm{CH_4}$ | $1866\ \mathrm{ppb}$ | $0.54$ |
| $\mathrm{N_2O}$ | $332\ \mathrm{ppb}$ | $0.21$ |
| halogenated gases | — | $0.41$ |
| tropospheric ozone (from precursors) | — | $0.47$ |
| aerosols (all effects) | — | $-1.1$ |
| total anthropogenic | | $2.72$ (very likely $1.96$–$3.48$) |

As of 2026 the most recent annual means that can be dated with confidence come from NOAA's Global Monitoring Laboratory: $\mathrm{CO_2}$ at Mauna Loa averaged about $424.6\ \mathrm{ppm}$ in 2024, and the global mean methane mole fraction exceeded $1920\ \mathrm{ppb}$ in 2023, having risen unusually rapidly since 2020. The World Meteorological Organization's *State of the Global Climate 2024* reported that 2024 was the warmest year in the instrumental record, about $1.55 \pm 0.13\ \mathrm{°C}$ above the 1850–1900 average — the first calendar year above $1.5\ \mathrm{°C}$, which is not the same as exceeding the long-term $1.5\ \mathrm{°C}$ level referred to in the Paris Agreement, which is defined over a multi-decade average.

**Carbon dioxide** is the dominant forcing because of its abundance and its longevity ([[environmental-chemistry/earth-system-chemistry#warn-co2-lifetime]]): warming from $\mathrm{CO_2}$ is approximately proportional to *cumulative* emissions, by about $0.45\ \mathrm{°C}$ per $1000\ \mathrm{Gt\,CO_2}$ (AR6 best estimate of the transient climate response to cumulative emissions), which is why "carbon budgets" are expressed as totals rather than rates. **Methane** comes from wetlands, agriculture (ruminants, rice), fossil-fuel extraction and landfills, and is destroyed by OH ([[environmental-chemistry/tropospheric-chemistry]]); its decade lifetime means that methane reductions affect warming within decades. Its oxidation also produces tropospheric ozone and stratospheric water vapour, indirect effects included in its ERF. **Nitrous oxide** comes mainly from microbial nitrification and denitrification in fertilised soils ([[environmental-chemistry/earth-system-chemistry]]) and is destroyed only in the stratosphere, by photolysis and reaction with $\mathrm{O(^1D)}$, giving a lifetime of about $110$ years. **Halogenated gases** — CFCs, HCFCs, HFCs, $\mathrm{SF_6}$, perfluorocarbons — are almost entirely anthropogenic.

::: example Cumulative emissions and the carbon budget {#ex-tcre}
IPCC AR6 gives cumulative $\mathrm{CO_2}$ emissions of about $2390\ \mathrm{Gt\,CO_2}$ for 1850–2019, a best-estimate transient climate response to cumulative emissions (TCRE) of $0.45\ \mathrm{°C}$ per $1000\ \mathrm{Gt\,CO_2}$, and a remaining budget from the start of 2020 of $500\ \mathrm{Gt\,CO_2}$ for a $50\ \%$ chance of limiting warming to $1.5\ \mathrm{°C}$. (a) How much warming is attributable to $\mathrm{CO_2}$ by 2019 on this basis? (b) At total $\mathrm{CO_2}$ emissions of about $40\ \mathrm{Gt\,CO_2}$ per year (fossil plus land use, early 2020s), how many years of emissions did that remaining budget represent?
::: solution
(a) $2.39\times0.45 = 1.08\ \mathrm{°C}$. The observed total warming ($1.09\ \mathrm{°C}$ for 2011–2020) is similar because the warming from other greenhouse gases is roughly cancelled by aerosol cooling. (b) $500/40 = 12.5$ years from 2020, i.e. into the early 2030s at constant emissions. The linearity of warming in cumulative emissions — an emergent property of the carbon cycle and the ocean's heat uptake, whose two non-linearities (logarithmic forcing and the declining ocean sink) largely cancel — is what allows budgets to be quoted at all. The budget is uncertain by several hundred $\mathrm{Gt\,CO_2}$ (it depends on non-$\mathrm{CO_2}$ forcing and on the TCRE range, likely $0.27$–$0.63\ \mathrm{°C}$ per $1000\ \mathrm{Gt\,CO_2}$), and the Global Carbon Project updates it annually.
:::
:::

### Global warming potential

To compare emissions of different gases, policy uses a common metric.

::: definition Global warming potential {#def-gwp}
The **absolute global warming potential** of a pulse emission of $1\ \mathrm{kg}$ of gas $i$ over a time horizon $H$ is the time-integrated radiative forcing it causes,
$$
\mathrm{AGWP}_i(H) = \int_0^H a_i\,x_i(t)\,\mathrm{d}t,
$$
where $a_i$ is the radiative efficiency (forcing per kg in the atmosphere) and $x_i(t)$ the fraction of the pulse remaining. For a gas with a single first-order lifetime $\tau$, $x(t) = e^{-t/\tau}$ and $\mathrm{AGWP}_i = a_i\tau(1 - e^{-H/\tau})$. The **global warming potential** is the ratio to $\mathrm{CO_2}$, $\mathrm{GWP}_i(H) = \mathrm{AGWP}_i(H)/\mathrm{AGWP}_{\mathrm{CO_2}}(H)$, with $x_{\mathrm{CO_2}}(t)$ the multi-exponential response of [[environmental-chemistry/earth-system-chemistry#eq-bern]]. Emissions multiplied by $\mathrm{GWP}(100)$ are reported as **$\mathrm{CO_2}$-equivalent**. AR6 values of $\mathrm{GWP}(100)$ include methane $27.0$ (non-fossil) and $29.8$ (fossil, which adds the $\mathrm{CO_2}$ its carbon eventually becomes), $\mathrm{N_2O}$ $273$, HFC-134a $1530$, $\mathrm{SF_6}$ $25\,200$. GWP is a convention for comparing emissions, not a physical law; other metrics (global temperature-change potential, GWP*) answer different questions.
:::

::: example Why GWP depends on the horizon {#ex-gwp-horizon}
For methane, with perturbation lifetime $\tau = 11.8$ years, compare $\mathrm{GWP}(20)$ with $\mathrm{GWP}(100)$. The integrals of the $\mathrm{CO_2}$ response function [[environmental-chemistry/earth-system-chemistry#eq-bern]] are $\int_0^{20}x\,\mathrm{d}t = 14.2\ \mathrm{yr}$ and $\int_0^{100}x\,\mathrm{d}t = 52.4\ \mathrm{yr}$.
::: solution
The radiative efficiencies cancel in the ratio:
$$
\frac{\mathrm{GWP}(20)}{\mathrm{GWP}(100)} = \frac{\tau(1 - e^{-20/\tau})/14.2}{\tau(1 - e^{-100/\tau})/52.4} = \frac{11.8\times0.816/14.2}{11.8\times1.000/52.4} = \frac{0.678}{0.225} = 3.0 .
$$
Methane is about three times more potent over 20 years than over 100 years; AR6's values ($79.7$ and $27.0$ for non-fossil methane) have the ratio $2.95$. The reason is that methane's forcing is concentrated in its first few decades, while $\mathrm{CO_2}$'s continues for centuries; the longer the horizon, the more the $\mathrm{CO_2}$ integral grows relative to methane's. For $\mathrm{N_2O}$ ($\tau \approx 109$ years) the same calculation gives a ratio near $1$ (AR6: $273$ for both horizons). Choosing a horizon is a value judgement about which timescale matters, which is why reports state it explicitly.
:::
:::

::: warning Residence time does not decide which gas "matters most" {#warn-gwp}
Two opposite errors are common. One is to dismiss methane because its lifetime is "only" a decade — but per kilogram it forces much more strongly than $\mathrm{CO_2}$, and current methane emissions have a large effect on warming over the next few decades. The other is to rank gases by GWP alone and conclude that cutting a high-GWP gas is equivalent to cutting a "$\mathrm{CO_2}$-equivalent" amount of $\mathrm{CO_2}$ — but the temperature effect of a short-lived gas fades within decades of its emissions stopping, while that of $\mathrm{CO_2}$ persists for millennia. A tonne of $\mathrm{CO_2}$-equivalent of methane and a tonne of $\mathrm{CO_2}$ have the same integrated forcing over 100 years, but very different temperature trajectories. Both kinds of emission matter; for different reasons and on different timescales.
:::

## The ocean and ocean acidification

About a quarter of anthropogenic $\mathrm{CO_2}$ has been taken up by the ocean ([[environmental-chemistry/earth-system-chemistry#ex-carbon-budget]]). Dissolved $\mathrm{CO_2}$ is a weak acid, and the ocean's large capacity for it is due to its carbonate ion, which neutralises the acid:
$$
\mathrm{CO_2(aq)} + \mathrm{H_2O(l)} + \mathrm{CO_3^{2-}(aq)} \rightarrow 2\,\mathrm{HCO_3^-(aq)} .
$$
In sea water at pH about $8.1$, dissolved inorganic carbon (DIC, $\mathrm{C_T} = [\mathrm{CO_2^*}] + [\mathrm{HCO_3^-}] + [\mathrm{CO_3^{2-}}]$, where $\mathrm{CO_2^*}$ denotes dissolved $\mathrm{CO_2}$ plus the small amount of $\mathrm{H_2CO_3}$) is about $2000\ \mathrm{\mu mol\,kg^{-1}}$: roughly $89\ \%$ bicarbonate, $10\ \%$ carbonate and only $0.5\ \%$ dissolved $\mathrm{CO_2}$. The equilibria are those of [[environmental-chemistry/particulates-acid-deposition#prop-effective-henry]], but with "conditional" constants appropriate to the ionic strength of sea water (for $25\ \mathrm{°C}$ and salinity $35$: $K_0 = 0.0284\ \mathrm{mol\,kg^{-1}\,atm^{-1}}$, $\mathrm{p}K_1^* = 5.85$, $\mathrm{p}K_2^* = 8.97$ on the total pH scale; Weiss 1974 and Lueker et al. 2000). The quantity held fixed when $\mathrm{CO_2}$ dissolves is the **total alkalinity**, roughly $A_\mathrm{T} \approx [\mathrm{HCO_3^-}] + 2[\mathrm{CO_3^{2-}}] + [\mathrm{B(OH)_4^-}] + [\mathrm{OH^-}] - [\mathrm{H^+}] \approx 2300\ \mathrm{\mu mol\,kg^{-1}}$, because adding $\mathrm{CO_2}$ adds no charge. (Alkalinity is developed fully in [[environmental-chemistry/natural-waters]].)

::: proposition The Revelle factor {#prop-revelle}
At constant alkalinity, the fractional change of dissolved $\mathrm{CO_2}$ (and so of the equilibrium $p_{\mathrm{CO_2}}$) is much larger than the fractional change of DIC:
$$
R = \left(\frac{\partial\ln p_{\mathrm{CO_2}}}{\partial\ln\mathrm{C_T}}\right)_{A_\mathrm{T}} \approx \mathrm{C_T}\left(\frac{1}{[\mathrm{CO_3^{2-}}]} + \frac{4}{[\mathrm{HCO_3^-}]}\right) \quad (\text{carbonate system only, } [\mathrm{CO_2^*}] \ll \mathrm{C_T}),
$$
the **Revelle (buffer) factor**. The carbonate-only formula gives about $14$; including the buffering by borate brings it to about $10$ in today's warm surface ocean (and $12$–$15$ in cold waters). A $10\ \%$ rise in atmospheric $\mathrm{CO_2}$ is matched at equilibrium by only about a $1\ \%$ rise in oceanic DIC. Because $[\mathrm{CO_3^{2-}}]$ falls as $\mathrm{CO_2}$ is absorbed, $R$ increases and the ocean's capacity to take up further $\mathrm{CO_2}$ declines.
:::

::: proof The buffer factor from the carbonate equilibria {#proof-revelle}
Neglect borate, water and $\mathrm{CO_2^*}$ in the alkalinity, so $A = [\mathrm{HCO_3^-}] + 2[\mathrm{CO_3^{2-}}]$ and $\mathrm{C} \approx [\mathrm{HCO_3^-}] + [\mathrm{CO_3^{2-}}]$ (dropping $[\mathrm{CO_2^*}]$, which is small). Then $[\mathrm{CO_3^{2-}}] = A - \mathrm{C}$ and $[\mathrm{HCO_3^-}] = 2\mathrm{C} - A$. Combining the two dissociation equilibria, $[\mathrm{CO_2^*}] = (K_2/K_1)[\mathrm{HCO_3^-}]^2/[\mathrm{CO_3^{2-}}]$, so
$$
\ln[\mathrm{CO_2^*}] = \text{const} + 2\ln(2\mathrm{C} - A) - \ln(A - \mathrm{C}) .
$$
Differentiating at constant $A$,
$$
\frac{\partial\ln[\mathrm{CO_2^*}]}{\partial\ln\mathrm{C}} = \mathrm{C}\left(\frac{4}{2\mathrm{C} - A} + \frac{1}{A - \mathrm{C}}\right) = \mathrm{C}\left(\frac{4}{[\mathrm{HCO_3^-}]} + \frac{1}{[\mathrm{CO_3^{2-}}]}\right) .
$$
With $\mathrm{C} = 2013$, $[\mathrm{HCO_3^-}] = 1796$ and $[\mathrm{CO_3^{2-}}] = 205\ \mathrm{\mu mol\,kg^{-1}}$ (the $420\ \mathrm{\mu atm}$ case below), the carbonate term gives $9.8$ and the bicarbonate term $4.5$, so $R \approx 14$ in this two-species model; borate, which also takes up protons, reduces it to $9.9$ in a full numerical calculation at $25\ \mathrm{°C}$. Since $p_{\mathrm{CO_2}} = [\mathrm{CO_2^*}]/K_0$, the same factor applies to the partial pressure.
:::

The same chemistry lowers pH and the carbonate-ion concentration — **ocean acidification**. Solving the full seawater system at $25\ \mathrm{°C}$ with $A_\mathrm{T} = 2300\ \mathrm{\mu mol\,kg^{-1}}$ and total borate $416\ \mathrm{\mu mol\,kg^{-1}}$ gives pH $8.17$ in equilibrium with $280\ \mathrm{\mu atm}$, $8.03$ at $420\ \mathrm{\mu atm}$ and $7.79$ at $800\ \mathrm{\mu atm}$, while $[\mathrm{CO_3^{2-}}]$ falls from $262$ to $205$ to $131\ \mathrm{\mu mol\,kg^{-1}}$. IPCC AR6 assesses with very high confidence that open-ocean surface pH has declined by $0.017$–$0.027$ pH units per decade since the late 1980s, and that present surface pH values are unusually low in at least $26\,000$ years. Calcifying organisms build shells of calcium carbonate whose stability depends on the **saturation state** $\Omega = [\mathrm{Ca^{2+}}][\mathrm{CO_3^{2-}}]/K_\mathrm{sp}^*$; with $[\mathrm{Ca^{2+}}] = 10.3\ \mathrm{mmol\,kg^{-1}}$ and $K_\mathrm{sp}^*(\text{aragonite}) = 6.5\times10^{-7}\ \mathrm{mol^2\,kg^{-2}}$ (Mucci, 1983), $\Omega_\text{arag}$ falls from $4.2$ to $3.3$ between the two warm-water cases above; in cold high-latitude and upwelling waters it is already near or below $1$ in places, where aragonite becomes corrosive.

::: example Carbonate saturation of surface sea water {#ex-omega}
Using the $25\ \mathrm{°C}$ results above, $[\mathrm{CO_3^{2-}}] = 262\ \mathrm{\mu mol\,kg^{-1}}$ at $280\ \mathrm{\mu atm}$ and $205\ \mathrm{\mu mol\,kg^{-1}}$ at $420\ \mathrm{\mu atm}$, with $[\mathrm{Ca^{2+}}] = 10.3\ \mathrm{mmol\,kg^{-1}}$, find the saturation states with respect to aragonite ($K_\mathrm{sp}^* = 6.48\times10^{-7}$) and calcite ($K_\mathrm{sp}^* = 4.27\times10^{-7}\ \mathrm{mol^2\,kg^{-2}}$; Mucci, 1983).
::: solution
$\Omega = [\mathrm{Ca^{2+}}][\mathrm{CO_3^{2-}}]/K_\mathrm{sp}^*$. At $280\ \mathrm{\mu atm}$: $\Omega_\text{arag} = 0.0103\times2.62\times10^{-4}/6.48\times10^{-7} = 4.2$ and $\Omega_\text{calc} = 6.3$. At $420\ \mathrm{\mu atm}$: $\Omega_\text{arag} = 0.0103\times2.05\times10^{-4}/6.48\times10^{-7} = 3.3$ and $\Omega_\text{calc} = 4.9$. Warm surface water remains supersaturated (precipitation of carbonate is kinetically inhibited, so $\Omega > 1$ persists), but the drop of about $22\ \%$ in $\Omega$ makes shell building energetically more costly. Aragonite, the more soluble polymorph used by corals and pteropods, is the first to become undersaturated, and in cold water — where $\mathrm{CO_2}$ is more soluble and $K_\mathrm{sp}^*$ is larger — $\Omega_\text{arag}$ is already close to $1$. The calculation also shows why carbonate is the quantity to watch: $[\mathrm{Ca^{2+}}]$ is conservative and barely changes.
:::
:::

::: widget newton
f: 10^(-5.85)*11.93/10^(-x) + 2*10^(-14.82)*11.93/10^(-2*x) + 416*10^(-8.6)/(10^(-8.6) + 10^(-x)) + 10^(x - 7.22) - 10^(6 - x) - 2300
method: newton
x0: 7.5
steps: 8
x: 7, 9
caption: Solving the alkalinity equation of sea water for pH ($x$) at $p_{\mathrm{CO_2}} = 420\ \mathrm{\mu atm}$, $25\ \mathrm{°C}$, salinity $35$: the function is $[\mathrm{HCO_3^-}] + 2[\mathrm{CO_3^{2-}}] + [\mathrm{B(OH)_4^-}] + [\mathrm{OH^-}] - [\mathrm{H^+}] - A_\mathrm{T}$ in $\mathrm{\mu mol\,kg^{-1}}$ with $[\mathrm{CO_2^*}] = K_0p_{\mathrm{CO_2}} = 11.93\ \mathrm{\mu mol\,kg^{-1}}$ and $A_\mathrm{T} = 2300$. Newton's method converges in a few steps to pH $8.03$. The function rises steeply with pH because carbonate and borate terms grow as $10^{\mathrm{pH}}$ and $10^{2\,\mathrm{pH}}$; this steepness is the buffering.
:::

::: quiz
Why does the ocean not take up atmospheric $\mathrm{CO_2}$ in proportion to its huge carbon content, roughly fifty times that of the atmosphere?
- [ ] Because $\mathrm{CO_2}$ is insoluble in water.
- [x] Because at constant alkalinity a small fractional increase in DIC produces a roughly tenfold larger fractional increase in seawater $p_{\mathrm{CO_2}}$ (the Revelle factor), so equilibrium is reached after a small change in DIC — and only the surface ocean equilibrates quickly.
- [ ] Because the ocean is already saturated with carbonate and cannot dissolve more.
- [ ] Because photosynthesis in the ocean returns all absorbed $\mathrm{CO_2}$ to the atmosphere.
::: solution
The buffer factor of about $10$ means that equilibrium with a $10\ \%$ higher $p_{\mathrm{CO_2}}$ needs only about $1\ \%$ more DIC. Combined with the slow (centuries) mixing of surface waters into the deep ocean, this limits the ocean sink on decadal timescales; over millennia the whole ocean, and then carbonate sediments, take up most of the excess.
:::
:::

::: history
Joseph Fourier argued in the 1820s that the atmosphere keeps the Earth warmer than it would otherwise be. John Tyndall measured the absorption of infrared ("radiant heat") by gases in 1859–61, finding that water vapour and carbonic acid ($\mathrm{CO_2}$) absorb strongly while oxygen and nitrogen do not; Eunice Foote had reported in 1856 that a $\mathrm{CO_2}$-filled cylinder heated more in sunlight than one of air. Svante Arrhenius made the first quantitative estimate of the warming for doubled $\mathrm{CO_2}$ in 1896, and Guy Callendar connected rising measured temperatures with fossil-fuel $\mathrm{CO_2}$ in 1938. Roger Revelle and Hans Suess (1957) showed that the ocean's buffer chemistry limits its uptake of $\mathrm{CO_2}$, prompting Keeling's Mauna Loa record. Syukuro Manabe and Richard Wetherald's radiative–convective model (1967) gave the first physically consistent estimate of climate sensitivity; Manabe shared the 2021 Nobel Prize in Physics. The Intergovernmental Panel on Climate Change was established in 1988; its Sixth Assessment Report (Working Group I) was published in 2021.
:::

## Where this leads

The carbonate system — alkalinity, buffer capacity, calcite saturation — is treated in full generality, for rivers and lakes as well as the ocean, in [[environmental-chemistry/natural-waters]]. Monitoring greenhouse gases at the parts-per-billion precision needed to see trends is part of [[environmental-chemistry/environmental-monitoring]]. The chemistry of reducing emissions — renewable feedstocks, hydrogen and carbon capture — belongs to [[green-chemistry/carbon-hydrogen]], and the thermodynamics of radiation and heat engines to [[thermodynamics/second-law]].

::: summary
- Radiative balance gives an effective temperature $T_\mathrm{e} = [S_0(1-\alpha)/4\sigma]^{1/4} = 255\ \mathrm{K}$; the surface at $288\ \mathrm{K}$ is warmer because infrared-active gases make the atmosphere emit to space from colder heights.
- Only vibrations that change the dipole absorb: $\mathrm{N_2}$ and $\mathrm{O_2}$ are transparent; $\mathrm{H_2O}$, $\mathrm{CO_2}$ ($15\ \mathrm{\mu m}$), $\mathrm{CH_4}$, $\mathrm{N_2O}$, $\mathrm{O_3}$ and fluorinated gases (in the $8$–$12\ \mathrm{\mu m}$ window) absorb.
- Forcing $\Delta F$ (ERF in AR6) produces equilibrium warming $\lambda\Delta F$; AR6: ECS $3\ \mathrm{°C}$ (likely $2.5$–$4$), doubled-$\mathrm{CO_2}$ ERF $3.93\ \mathrm{W\,m^{-2}}$; Planck response alone gives $\approx 1.2\ \mathrm{K}$.
- $\mathrm{CO_2}$ forcing is logarithmic, $\approx 5.35\ln(C/C_0)$, because its band centre is saturated and absorption grows in the wings; $\mathrm{CH_4}$ and $\mathrm{N_2O}$ scale roughly as the square root, halocarbons linearly.
- AR6 ERF 1750–2019: total anthropogenic $2.72\ \mathrm{W\,m^{-2}}$, with $\mathrm{CO_2}$ $2.16$, $\mathrm{CH_4}$ $0.54$, aerosols $-1.1$; 2011–2020 warming $1.09\ \mathrm{°C}$; 2024 was the first calendar year about $1.55\ \mathrm{°C}$ above 1850–1900 (WMO).
- GWP integrates forcing relative to $\mathrm{CO_2}$ over a stated horizon; it depends strongly on the horizon for short-lived gases (methane $\approx 80$ over 20 years, $\approx 27$–$30$ over 100 years).
- The ocean buffers $\mathrm{CO_2}$ via $\mathrm{CO_3^{2-}}$; the Revelle factor $\approx 10$ limits uptake, and absorption lowers pH and carbonate saturation (ocean acidification, $\approx 0.02$ pH per decade).
:::

## Exercises

::: exercise The effective temperature of Mars {level=1 check="210"}
Mars receives $S_0 = 586\ \mathrm{W\,m^{-2}}$ and has a Bond albedo of about $0.25$. Find its effective radiating temperature. (Enter $T_\mathrm{e}$ in K, to two significant figures.)
::: solution
$T_\mathrm{e} = [586\times0.75/(4\times5.670\times10^{-8})]^{1/4} = (1.938\times10^{9})^{1/4} = 210\ \mathrm{K}$. The mean surface temperature of Mars is also about $210\ \mathrm{K}$: its thin $\mathrm{CO_2}$ atmosphere (about $0.6\ \mathrm{kPa}$) produces only a few kelvin of greenhouse warming, because pressure broadening of the lines is weak and the band wings stay transparent.
:::
:::

::: exercise CO₂ forcing in 2024 {level=1 check="2.27"}
Using $\Delta F = 5.35\ln(C/C_0)$ with $C_0 = 278\ \mathrm{ppm}$, find the forcing for $424.6\ \mathrm{ppm}$. (Enter $\Delta F$ in $\mathrm{W\,m^{-2}}$, to three significant figures.)
::: solution
$5.35\ln(424.6/278) = 5.35\times0.4235 = 2.27\ \mathrm{W\,m^{-2}}$. (The newer AR6 expression gives a slightly larger value.)
:::
:::

::: exercise Wien peak of the Earth {level=1 check="10.1"}
At what wavelength does a black body at $288\ \mathrm{K}$ emit most strongly (per unit wavelength)? (Enter $\lambda_\text{max}$ in µm, to three significant figures.)
::: solution
$\lambda_\text{max} = 2898\ \mathrm{\mu m\,K}/288\ \mathrm{K} = 10.1\ \mathrm{\mu m}$ — inside the atmospheric window, which is why the window matters so much for cooling.
:::
:::

::: exercise Warming for doubled CO₂ {level=2 check="3.0"}
With the simplified forcing formula and a climate sensitivity parameter $\lambda = 0.80\ \mathrm{K\,W^{-1}\,m^2}$, what is the equilibrium warming for $C = 556\ \mathrm{ppm}$ relative to $278\ \mathrm{ppm}$? (Enter $\Delta T$ in K, to two significant figures.)
::: solution
$\Delta F = 5.35\ln2 = 3.71\ \mathrm{W\,m^{-2}}$, so $\Delta T = 0.80\times3.71 = 3.0\ \mathrm{K}$ — the AR6 best-estimate ECS. The chemistry (the forcing) is known to about $10\ \%$; the response parameter $\lambda$ is the main uncertainty.
:::
:::

::: exercise Emissivity of the one-layer atmosphere {level=2 check="0.78"}
In the model of [[#ex-one-layer]], with $T_\mathrm{e} = 254.6\ \mathrm{K}$, what emissivity $\varepsilon$ gives $T_\mathrm{s} = 288\ \mathrm{K}$? (Enter $\varepsilon$, to two significant figures.)
::: solution
From $T_\mathrm{s}^4(2-\varepsilon) = 2T_\mathrm{e}^4$, $\varepsilon = 2[1 - (T_\mathrm{e}/T_\mathrm{s})^4] = 2[1 - (0.8840)^4] = 2(1 - 0.6106) = 0.78$.
:::
:::

::: exercise CO₂-equivalent of a methane leak {level=2 check="279"}
A gas field leaks $10.0\ \mathrm{Tg}$ of methane in a year. Using the AR6 $\mathrm{GWP}(100)$ of $27.9$ for methane (the value tabulated without the fossil/non-fossil distinction), express this as $\mathrm{CO_2}$-equivalent. How would the answer change with $\mathrm{GWP}(20) \approx 81$? (Enter the $\mathrm{GWP}(100)$-based value in $\mathrm{Tg\,CO_2}$-eq.)
::: solution
$10.0\times27.9 = 279\ \mathrm{Tg\,CO_2}$-eq. With $\mathrm{GWP}(20) = 81$ it would be $810\ \mathrm{Tg\,CO_2}$-eq. Neither is "right": the first compares integrated forcing over a century, the second over two decades. Inventories under the UN climate convention now report with AR5 or AR6 $\mathrm{GWP}(100)$ values, and the metric must always be stated.
:::
:::

::: exercise Logarithmic forcing from exponential wings {level=3 check="2"}
(a) Using the argument of [[#proof-log-forcing]], show that the forcing of a gas whose band is described by $\sigma(\nu) = \sigma_0e^{-\lvert\nu - \nu_0\rvert/\Gamma}$ depends on concentration only through $\ln(N/N_0)$. (b) Hence find the ratio of the forcing for quadrupling $\mathrm{CO_2}$ to that for doubling. (c) Explain why the result fails for very small $N$. (Enter the ratio from (b).)
::: solution
(a) The opaque half-width is the $\lvert\nu - \nu_0\rvert$ at which $\sigma N = 1$, i.e. $\Gamma\ln(\sigma_0N)$; the forcing is $\Delta B$ times the change in total opaque width, $2\Gamma\Delta B[\ln(\sigma_0N) - \ln(\sigma_0N_0)] = 2\Gamma\Delta B\ln(N/N_0)$, independent of $\sigma_0$. (b) $\ln4/\ln2 = 2$: quadrupling gives twice the forcing of doubling ($7.4$ against $3.7\ \mathrm{W\,m^{-2}}$ with $5.35$). (c) If $\sigma_0N < 1$ nothing is opaque, the band is optically thin, and the absorbed fraction $\approx\int\sigma(\nu)N\,\mathrm{d}\nu$ is linear in $N$; the logarithm applies only once the centre is saturated. That is the regime of CFCs and $\mathrm{SF_6}$, whose forcing per molecule is therefore much larger.
:::
:::

::: exercise Acidification in the simplest model {level=3 check="-0.18"}
Treat sea water as containing only the carbonate system, with carbonate alkalinity $A_\mathrm{C} = [\mathrm{HCO_3^-}] + 2[\mathrm{CO_3^{2-}}]$ fixed and $[\mathrm{CO_3^{2-}}] \ll [\mathrm{HCO_3^-}]$. (a) Show that $[\mathrm{H^+}] \approx K_0K_1p_{\mathrm{CO_2}}/A_\mathrm{C}$, so $\Delta\mathrm{pH} \approx -\log_{10}(p_2/p_1)$. (b) Evaluate $\Delta\mathrm{pH}$ for $280 \to 420\ \mathrm{\mu atm}$. (c) The full calculation with borate and carbonate gives $-0.14$; explain why the simple model overestimates the change. (Enter $\Delta\mathrm{pH}$ from (b), to two significant figures.)
::: hint
Write $[\mathrm{HCO_3^-}] = K_1[\mathrm{CO_2^*}]/[\mathrm{H^+}]$ with $[\mathrm{CO_2^*}] = K_0p_{\mathrm{CO_2}}$.
:::
::: solution
(a) With $[\mathrm{CO_3^{2-}}]$ negligible, $A_\mathrm{C} \approx [\mathrm{HCO_3^-}] = K_1K_0p_{\mathrm{CO_2}}/[\mathrm{H^+}]$, so $[\mathrm{H^+}] \approx K_0K_1p/A_\mathrm{C}$; at fixed $A_\mathrm{C}$, $[\mathrm{H^+}]\propto p$ and $\Delta\mathrm{pH} = -\log_{10}(p_2/p_1)$. (b) $-\log_{10}(1.5) = -0.176 \approx -0.18$. (c) In reality $[\mathrm{CO_3^{2-}}]$ is about $10\ \%$ of DIC and borate holds about $100\ \mu$mol kg⁻¹ of alkalinity: as $\mathrm{CO_2}$ is added, carbonate and borate are protonated ($\mathrm{CO_3^{2-} + CO_2 + H_2O \rightarrow 2\,HCO_3^-}$, $\mathrm{B(OH)_4^- + CO_2 \rightarrow B(OH)_3 + HCO_3^-}$), consuming part of the added acid. That buffering is exactly what the Revelle factor measures; it reduces the pH change from $0.18$ to $0.14$ — at the cost of the carbonate ion that calcifying organisms need.
:::
:::

::: exercise GWP horizon for nitrous oxide {level=3 check="1.03"}
Using the integrals $\int_0^{20}x_{\mathrm{CO_2}}\,\mathrm{d}t = 14.24\ \mathrm{yr}$ and $\int_0^{100}x_{\mathrm{CO_2}}\,\mathrm{d}t = 52.36\ \mathrm{yr}$, find $\mathrm{GWP}(20)/\mathrm{GWP}(100)$ for $\mathrm{N_2O}$ with a single lifetime of $109$ years. (Enter the ratio, to three significant figures.)
::: solution
Numerator: $109(1 - e^{-20/109})/14.24 = 109\times0.1676/14.24 = 1.283$. Denominator: $109(1 - e^{-100/109})/52.36 = 109\times0.6005/52.36 = 1.250$. Ratio $= 1.283/1.250 = 1.03$. For a gas whose lifetime is comparable with the horizon, both its own integral and that of $\mathrm{CO_2}$ grow at similar rates, and the choice of horizon hardly matters — consistent with AR6's $\mathrm{GWP}(20) = \mathrm{GWP}(100) = 273$.
:::
:::
