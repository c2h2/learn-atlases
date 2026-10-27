About half of the nitrogen atoms in your body passed through an ammonia plant. Synthetic nitrogen fertiliser, made from ammonia produced by the Haber–Bosch process, supports the food supply of roughly half the world's population, and the process uses about $2\,\%$ of global final energy. Sulfuric acid, made by the contact process, is the largest-tonnage chemical product of all and is used to make phosphate fertilisers, to leach metal ores and in countless other processes. Nitric acid, made by the Ostwald process, goes into ammonium nitrate fertiliser and into the polyurethane and nylon chains. Chlorine and sodium hydroxide from the electrolysis of brine, and sodium carbonate from the Solvay process, complete the set of heavy inorganic chemicals on which much of the rest of the industry is built.

These processes are a century or more old, and they are worth studying for two reasons. First, they are the clearest examples of how chemical thermodynamics and kinetics decide industrial practice. Ammonia synthesis and sulfur dioxide oxidation are **reversible exothermic** reactions: low temperature favours the equilibrium, high temperature favours the rate, and the conditions actually used — and the design of the reactors — are compromises that can be understood quantitatively from [[thermodynamics/reaction-equilibrium]]. Second, they are where much of the chemical industry's environmental burden lies: ammonia alone accounted for about $45\,\%$ of the direct $\mathrm{CO_2}$ emissions of primary chemical production in 2022 (IEA, latest dated value as of 2026), nitric acid plants emit the potent greenhouse gas dinitrogen oxide, and phosphate processing produces mountains of gypsum. This chapter works through the five processes, with the equilibrium and energy calculations that underlie them. The language of conversion, recycle and purge is that of [[green-chemistry/chemical-industry]]. The descriptions are at the level of a textbook of industrial chemistry; ammonia, chlorine, the acids and caustic soda are hazardous (toxic, corrosive or oxidising), and industrial plants handle them under strict process-safety regimes.

## Reversible exothermic reactions

Two of the processes of this chapter rest on the same thermodynamic dilemma, so we treat it in general first. Consider a gas-phase reaction with $\Delta_\mathrm{r}H < 0$ and $\Delta_\mathrm{r}S < 0$ (fewer moles of gas on the product side). By the van 't Hoff equation, the equilibrium constant falls as temperature rises, so the maximum attainable conversion falls; by Le Chatelier's principle, higher pressure increases it. But the rate of the forward reaction rises steeply with temperature. Run cold, and the equilibrium is favourable but the reaction does not happen; run hot, and it is fast but stops early.

::: proposition Equilibrium in ammonia synthesis {#prop-nh3-eq}
For $\tfrac{1}{2}\mathrm{N_2(g)} + \tfrac{3}{2}\mathrm{H_2(g)} \rightleftharpoons \mathrm{NH_3(g)}$ with a stoichiometric feed ($\mathrm{N_2:H_2} = 1:3$, no inerts), and treating the gases as ideal, the equilibrium mole fraction $y$ of ammonia at total pressure $p$ satisfies
$$
\frac{y}{(1 - y)^2} = a \equiv \frac{3^{3/2}}{16}\,K\,\frac{p}{p^\circ}, \qquad y = \frac{2a + 1 - \sqrt{4a + 1}}{2a},
$$ {#eq-nh3-eq}
where $K = \exp(-\Delta_\mathrm{r}G^\circ/RT)$ for the reaction as written and $3^{3/2}/16 = 0.3248$. At fixed $T$, $y$ increases with $p$; at fixed $p$, it decreases with $T$, because $\mathrm{d}\ln K/\mathrm{d}T = \Delta_\mathrm{r}H^\circ/RT^2 < 0$.
:::

::: proof
In terms of mole fractions, $K = x_{\mathrm{NH_3}}\,x_{\mathrm{N_2}}^{-1/2}\,x_{\mathrm{H_2}}^{-3/2}\,(p/p^\circ)^{-1}$ for ideal gases (the exponent of $p$ is $\Delta\nu = 1 - \tfrac12 - \tfrac32 = -1$). Because nitrogen and hydrogen are consumed in the ratio $1:3$ in which they are fed, they remain in that ratio, so $x_{\mathrm{N_2}} = (1 - y)/4$ and $x_{\mathrm{H_2}} = 3(1 - y)/4$. Then $x_{\mathrm{N_2}}^{1/2}x_{\mathrm{H_2}}^{3/2} = (1 - y)^2\,(1/4)^{1/2}(3/4)^{3/2} = (1 - y)^2\,3^{3/2}/16$, and rearranging $K$ gives [[#eq-nh3-eq]]. The quadratic $a(1 - y)^2 = y$, i.e. $ay^2 - (2a + 1)y + a = 0$, has roots $y = [2a + 1 \pm \sqrt{4a + 1}]/2a$; the physical root, between $0$ and $1$, takes the minus sign. Since $\mathrm{d}y/\mathrm{d}a > 0$ and $a \propto Kp$, $y$ rises with pressure and falls with temperature (the van 't Hoff equation, [[thermodynamics/reaction-equilibrium]]).
:::

With NBS thermochemical data (Wagman *et al.*, 1982) — $\Delta_\mathrm{f}H^\circ(\mathrm{NH_3,g}) = -46.11\ \mathrm{kJ\,mol^{-1}}$ and standard entropies $192.45$, $191.61$ and $130.68\ \mathrm{J\,K^{-1}\,mol^{-1}}$ for $\mathrm{NH_3}$, $\mathrm{N_2}$ and $\mathrm{H_2}$ — we have $\Delta_\mathrm{r}H^\circ = -46.11\ \mathrm{kJ\,mol^{-1}}$ and $\Delta_\mathrm{r}S^\circ = 192.45 - \tfrac12(191.61) - \tfrac32(130.68) = -99.38\ \mathrm{J\,K^{-1}\,mol^{-1}}$ per mole of ammonia. At $298\ \mathrm{K}$, $K = 7.7\times10^{2}$, and the equilibrium at $1\ \mathrm{bar}$ lies at $94\,\%$ ammonia — but the reaction is immeasurably slow. The triple bond of $\mathrm{N_2}$ (bond enthalpy $945\ \mathrm{kJ\,mol^{-1}}$) must be broken, which needs a catalyst, and even on the best catalysts the reaction needs temperatures of about $400\,^\circ\mathrm{C}$ or more to proceed at a useful rate.

::: widget plot
f: (2*(0.3248*p*exp((46110 - 99.38*x)/(8.314*x))) + 1 - sqrt(4*(0.3248*p*exp((46110 - 99.38*x)/(8.314*x))) + 1))/(2*(0.3248*p*exp((46110 - 99.38*x)/(8.314*x))))
x: 500, 1000
y: 0, 1
sliders: p=200:1:400:1
labels: y_{\mathrm{NH_3}}
vlines: 723
caption: Equilibrium mole fraction of ammonia [[#eq-nh3-eq]] from a stoichiometric $\mathrm{N_2/H_2}$ feed against temperature $T$ in kelvin ($x$), at total pressure $p$ in bar (slider), with ideal gases and $\Delta_\mathrm{r}H^\circ$, $\Delta_\mathrm{r}S^\circ$ taken as constant. The vertical line marks $723\ \mathrm{K}$ ($450\,^\circ\mathrm{C}$). At $200\ \mathrm{bar}$ the equilibrium mole fraction falls from about $46\,\%$ at $400\,^\circ\mathrm{C}$ to $28\,\%$ at $500\,^\circ\mathrm{C}$; at $1\ \mathrm{bar}$ there is almost no ammonia above $300\,^\circ\mathrm{C}$. Haber's insight was that high pressure could compensate for the high temperature that the kinetics demand.
:::

::: example Ammonia at 450 °C and 200 bar {#ex-nh3}
Using the data above, find $K$ at $450\,^\circ\mathrm{C}$, the equilibrium mole fraction of ammonia at $200\ \mathrm{bar}$, and the fraction of the hydrogen converted.
::: solution
At $T = 723.15\ \mathrm{K}$, $\Delta_\mathrm{r}G^\circ \approx -46\,110 + 723.15\times99.38 = 25\,757\ \mathrm{J\,mol^{-1}}$, so $K = \exp(-25\,757/(8.314\times723.15)) = 0.01379$. Then $a = 0.3248\times0.01379\times200 = 0.8955$ and
$$
y = \frac{2(0.8955) + 1 - \sqrt{4(0.8955) + 1}}{2(0.8955)} = \frac{2.791 - 2.141}{1.791} = 0.363 .
$$
For the conversion: starting from $1\ \mathrm{mol}\ \mathrm{N_2}$ and $3\ \mathrm{mol}\ \mathrm{H_2}$, forming $2\xi$ mol of ammonia leaves $4 - 2\xi$ mol in total, so $y = 2\xi/(4 - 2\xi)$ and $\xi = 2y/(1 + y) = 0.533$: $53\,\%$ of the hydrogen is converted at equilibrium. Two approximations limit the accuracy to a few percentage points: $\Delta_\mathrm{r}H$ and $\Delta_\mathrm{r}S$ are not constant over $425\ \mathrm{K}$ (the reaction becomes more exothermic at high temperature), and at $200\ \mathrm{bar}$ fugacity coefficients differ appreciably from $1$. Real converters, which do not reach equilibrium and contain inerts, achieve per-pass ammonia concentrations of about $15$–$20\,\%$ at the outlet, so the unreacted gas is recycled ([[green-chemistry/chemical-industry#ex-loop]]).
:::
:::

Since conversion is limited by equilibrium and rate is limited by kinetics, there must be a best temperature for each degree of conversion.

::: proposition Optimal temperature for a reversible exothermic reaction {#prop-topt}
Let the net rate of $\mathrm{A} \rightleftharpoons \mathrm{B}$ at conversion $X$ be $r = k_1(1 - X) - k_{-1}X$, with $k_1 = A_1\mathrm{e}^{-E_1/RT}$, $k_{-1} = A_{-1}\mathrm{e}^{-E_{-1}/RT}$ and $E_{-1} = E_1 - \Delta_\mathrm{r}H > E_1$ (exothermic). At fixed $X$, $r$ has a maximum at the temperature $T_\mathrm{opt}$ given by
$$
\frac{1}{T_\mathrm{opt}} = \frac{1}{T_\mathrm{eq}(X)} + \frac{R}{E_{-1} - E_1}\ln\frac{E_{-1}}{E_1} ,
$$ {#eq-topt}
where $T_\mathrm{eq}(X)$ is the temperature at which $X$ is the equilibrium conversion. $T_\mathrm{opt}$ lies below $T_\mathrm{eq}$ and falls as $X$ increases, so an ideal reactor would start hot and cool progressively as conversion proceeds.
:::

::: proof
Differentiate at constant $X$: $\partial r/\partial T = (E_1/RT^2)k_1(1 - X) - (E_{-1}/RT^2)k_{-1}X$. Setting this to zero gives $k_{-1}X/[k_1(1 - X)] = E_1/E_{-1}$, i.e. $K(T_\mathrm{opt}) \equiv k_1/k_{-1} = [X/(1 - X)]\,E_{-1}/E_1$. At equilibrium, $r = 0$, so $K(T_\mathrm{eq}) = X/(1 - X)$. Dividing, $\ln K(T_\mathrm{opt}) - \ln K(T_\mathrm{eq}) = \ln(E_{-1}/E_1)$. With $K \propto \exp(-\Delta_\mathrm{r}H/RT)$ and $-\Delta_\mathrm{r}H = E_{-1} - E_1$, the left side is $[(E_{-1} - E_1)/R](1/T_\mathrm{opt} - 1/T_\mathrm{eq})$, which gives [[#eq-topt]]. Since $E_{-1} > E_1$ the logarithm is positive and $T_\mathrm{opt} < T_\mathrm{eq}$; since $T_\mathrm{eq}(X)$ falls as $X$ rises (more conversion needs a larger $K$, hence lower $T$), so does $T_\mathrm{opt}$. That the second derivative is negative — a maximum, not a minimum — follows because at low $T$ the rate is small and at $T_\mathrm{eq}$ it is zero. The analysis assumes first-order kinetics, but the conclusion holds for the more complex rate laws of real catalysts.
:::

::: widget plot
f: exp(-12027.9*(1/x - 1/700))*((1 - X) - X*exp(-12027.9*(1/x - 1/800)))
x: 550, 900
y: 0, 4
sliders: X=0.5:0.05:0.95:0.01
labels: r\ \text{(relative)}
caption: Net rate of a reversible exothermic reaction ($E_1 = 100$, $E_{-1} = 200\ \mathrm{kJ\,mol^{-1}}$, $\Delta_\mathrm{r}H = -100\ \mathrm{kJ\,mol^{-1}}$, $K = 1$ at $800\ \mathrm{K}$) at fixed conversion $X$ (slider) against temperature $T$ in kelvin ($x$), normalised to the forward rate at $700\ \mathrm{K}$. For each $X$ the rate rises with $T$, peaks at $T_\mathrm{opt}$ and falls to zero at $T_\mathrm{eq}$; at $X = 0.5$, $T_\mathrm{eq} = 800\ \mathrm{K}$ and [[#eq-topt]] gives $T_\mathrm{opt} = 765\ \mathrm{K}$. As $X$ increases the peak moves to lower temperature and becomes lower: the last few per cent of conversion are slow at any temperature. Industrial converters approximate the falling optimal path with several adiabatic catalyst beds and cooling between them.
:::

::: algorithm Choosing conditions for a reversible exothermic gas-phase reaction {#alg-conditions}
1. **Equilibrium map.** From $\Delta_\mathrm{r}H^\circ$ and $\Delta_\mathrm{r}S^\circ$ compute $K(T)$ and the equilibrium conversion as a function of $T$ and $p$ for the intended feed ([[#prop-nh3-eq]] for ammonia).
2. **Catalyst window.** Find the lowest temperature at which the best available catalyst gives a useful rate (its "light-off") and the highest it tolerates without sintering or losing selectivity.
3. **Pressure.** If the reaction reduces the number of gas moles, choose the pressure at which the equilibrium conversion inside the catalyst window justifies the compression energy and vessel cost.
4. **Temperature path.** Within the window, follow the falling optimal temperature of [[#prop-topt]] as closely as practical — in adiabatic beds with intercooling, or in cooled tubular reactors — so that each bed works near its fastest rate.
5. **Beat the equilibrium.** Remove the product between stages (condensation of ammonia, interpass absorption of $\mathrm{SO_3}$) and recycle the unreacted gas, with a purge for inerts ([[green-chemistry/chemical-industry#prop-recycle]]).
6. **Energy integration.** Recover the heat of reaction as steam at the highest useful temperature, and use it to drive compressors or preheat feeds.
:::

## Ammonia: the Haber–Bosch process

Fritz Haber demonstrated in 1909 that ammonia could be synthesised from its elements over an osmium catalyst at about $200\ \mathrm{bar}$ and $500\,^\circ\mathrm{C}$, recycling the unreacted gas. Carl Bosch at BASF turned the laboratory apparatus into a plant, solving the problems of high-pressure vessels (hydrogen attacks carbon steel at high temperature and pressure, so the converters were built with an inner liner of low-carbon steel) and, with Alwin Mittasch, finding a cheap catalyst by testing thousands of formulations. The catalyst still used, in improved forms, is iron promoted with potassium oxide, alumina and calcium oxide, made by reducing magnetite; ruthenium-based catalysts are used in some plants.

A modern plant has three parts:

1. **Synthesis-gas production.** Natural gas, after removal of sulfur (a catalyst poison), is reformed with steam over nickel, $\mathrm{CH_4 + H_2O \rightleftharpoons CO + 3H_2}$ ($\Delta_\mathrm{r}H^\circ = +206\ \mathrm{kJ\,mol^{-1}}$), in tubes heated by burning more natural gas (primary reforming), then with air in a secondary reformer, which supplies the nitrogen in the right amount. The water–gas shift $\mathrm{CO + H_2O \rightleftharpoons CO_2 + H_2}$ ($-41\ \mathrm{kJ\,mol^{-1}}$) converts CO to more hydrogen; $\mathrm{CO_2}$ is removed by absorption (amine or carbonate solutions), and remaining traces of carbon oxides are converted to methane (methanation), since oxygen compounds poison the iron catalyst. Coal gasification replaces reforming in some regions, notably China.
2. **Compression** of the $\mathrm{N_2/H_2}$ mixture to about $100$–$250\ \mathrm{bar}$.
3. **Synthesis loop**: catalyst beds at roughly $400$–$500\,^\circ\mathrm{C}$ with intercooling, ammonia condensation by refrigeration, recycle and purge.

The synthesis is the smaller part of the energy use. Best-practice natural-gas plants consume about $28\ \mathrm{GJ}$ (lower heating value) per tonne of ammonia, against a theoretical minimum, set by the thermodynamics of making ammonia from methane, air and water, of about $21\ \mathrm{GJ\,t^{-1}}$; the global average is substantially higher, because of older plants and coal-based production. According to the IEA's *Ammonia Technology Roadmap* (2021), world production was about $185\ \mathrm{Mt}$ in 2020, with direct emissions of about $450\ \mathrm{Mt\,CO_2}$, an average of $2.4\ \mathrm{t\,CO_2}$ per tonne of ammonia; about $70\,\%$ of ammonia goes to fertilisers.

::: example The carbon footprint built into the stoichiometry {#ex-nh3-co2}
Combining steam reforming with the shift reaction, $\mathrm{CH_4} + 2\,\mathrm{H_2O} \rightarrow \mathrm{CO_2} + 4\,\mathrm{H_2}$, find the minimum $\mathrm{CO_2}$ released per tonne of ammonia from the feedstock alone, and compare it with the average quoted above.
::: solution
Ammonia needs $\tfrac32\,\mathrm{H_2}$ per $\mathrm{NH_3}$; each $\mathrm{CH_4}$ supplies $4\,\mathrm{H_2}$, so $\tfrac38\,\mathrm{CH_4}$ per $\mathrm{NH_3}$, releasing $\tfrac38\,\mathrm{CO_2}$. Per tonne:
$$
\frac{0.375\times44.01}{17.03}\ \mathrm{t\,CO_2} = 0.969\ \mathrm{t\,CO_2\ per\ t\,NH_3}.
$$
This **process $\mathrm{CO_2}$** is released as a pure stream from the absorber; the rest of a gas-based plant's emissions, typically a further $0.6$–$0.9\ \mathrm{t}$, comes from fuel burnt to heat the reformer and raise steam, as dilute flue gas. The global average of $2.4\ \mathrm{t}$ reflects coal-based plants, which release roughly twice as much as gas-based ones. The concentrated process stream is the cheapest $\mathrm{CO_2}$ in industry to capture, and much of it is already captured — but then used to make urea, from which it is released again when the fertiliser hydrolyses in the soil. Routes to low-emission ammonia, with capture or with electrolytic hydrogen, are in [[green-chemistry/carbon-hydrogen]].
:::
:::

Nitrogen fertiliser use has its own environmental cost: nitrogen not taken up by crops leaches as nitrate into water, causing eutrophication, or is converted by soil bacteria to $\mathrm{N_2O}$, now the most important ozone-depleting substance being emitted and a potent greenhouse gas ([[environmental-chemistry/greenhouse-gases]]).

## Sulfuric acid: the contact process

Sulfuric acid is made from sulfur, most of it recovered from the desulfurisation of natural gas and petroleum (the Claus process), or from the sulfur dioxide in the off-gas of metal smelters — so it is largely made from what would otherwise be waste. Three steps:
$$
\begin{aligned}
\mathrm{S(l)} + \mathrm{O_2(g)} &\rightarrow \mathrm{SO_2(g)} &\quad \Delta_\mathrm{r}H^\circ &= -297\ \mathrm{kJ\,mol^{-1}}\\
\mathrm{SO_2(g)} + \tfrac12\mathrm{O_2(g)} &\rightleftharpoons \mathrm{SO_3(g)} & \Delta_\mathrm{r}H^\circ &= -98.9\ \mathrm{kJ\,mol^{-1}}\\
\mathrm{SO_3(g)} + \mathrm{H_2O\ (in\ H_2SO_4)} &\rightarrow \mathrm{H_2SO_4} & &
\end{aligned}
$$
The oxidation of $\mathrm{SO_2}$ is the reversible exothermic step, catalysed by vanadium(V) oxide with potassium sulfate on silica. At the temperatures of operation the active phase is a molten salt film of vanadium oxosulfate complexes in the catalyst pores, and the catalyst works between about $400$ and $620\,^\circ\mathrm{C}$. Sulfur trioxide is not absorbed in water, with which it forms a fine mist of acid droplets that passes through absorbers, but in $98$–$99\,\%$ sulfuric acid, whose concentration is maintained by adding water.

All three steps are exothermic. A sulfur-burning plant is a net exporter of energy: the heat raises high-pressure steam that drives the plant's blower and generates electricity, typically more than a megawatt-hour per tonne of acid's worth of heat being recovered in modern plants. Sulfuric acid is a rare case of a bulk process that is a net source rather than a sink of useful energy.

::: example Equilibrium in the first catalyst bed {#ex-so2}
A converter is fed with gas of mole fractions $0.10\ \mathrm{SO_2}$, $0.11\ \mathrm{O_2}$, $0.79\ \mathrm{N_2}$ at about $1\ \mathrm{bar}$ and $690\ \mathrm{K}$ ($417\,^\circ\mathrm{C}$). The first bed is adiabatic; take the heat capacity of the gas as $31\ \mathrm{J\,K^{-1}}$ per mole of feed. Using NBS data ($\Delta_\mathrm{r}H^\circ = -98.89\ \mathrm{kJ\,mol^{-1}}$, $\Delta_\mathrm{r}S^\circ = -94.03\ \mathrm{J\,K^{-1}\,mol^{-1}}$), find the maximum conversion in the first bed and the outlet temperature.
::: solution
**Operating line.** Per mole of feed, conversion $X$ releases $0.10\,X\times98\,890\ \mathrm{J}$, raising the temperature by $0.10\times98\,890/31 = 319\ \mathrm{K}$ per unit conversion: $T = 690 + 319X$.

**Equilibrium.** Per mole of feed at conversion $X$: $\mathrm{SO_2}$ $0.10(1 - X)$, $\mathrm{SO_3}$ $0.10X$, $\mathrm{O_2}$ $0.11 - 0.05X$, total $n = 1 - 0.05X$. For ideal gases,
$$
K(T) = \frac{X}{1 - X}\left(\frac{n}{n_{\mathrm{O_2}}}\,\frac{p^\circ}{p}\right)^{1/2}, \qquad K(T) = \exp\!\left(\frac{98\,890 - 94.03\,T}{8.314\,T}\right).
$$
At $700\ \mathrm{K}$, $K = 294$ and the equilibrium conversion is $98.7\,\%$; at $800\ \mathrm{K}$, $K = 35.1$ and it is $90.2\,\%$; at $873\ \mathrm{K}$, $73.6\,\%$.

**Intersection.** Solving the two conditions together numerically gives $X = 0.657$ at $T = 900\ \mathrm{K}$ ($626\,^\circ\mathrm{C}$). The first bed therefore cannot exceed about two-thirds conversion, however much catalyst it contains: the heat released drives the gas up to the equilibrium curve. The gas is then cooled (raising steam) to about $700\ \mathrm{K}$ and passed through a second bed, and so on: three or four beds with intercooling bring the conversion to about $96$–$98\,\%$ — a staircase that follows the falling optimal temperature of [[#prop-topt]]. The outlet temperature is close to the upper working limit of the catalyst, which is one reason the feed $\mathrm{SO_2}$ concentration is limited to about $10$–$12\,\%$.
:::
:::

The remaining $2$–$4\,\%$ of $\mathrm{SO_2}$ would be a serious air pollutant. The **double contact, double absorption** (DCDA) process, introduced by Bayer in the 1960s, removes $\mathrm{SO_3}$ in an intermediate absorber after the second or third bed; with the product removed, the equilibrium of the remaining $\mathrm{SO_2}$ shifts strongly to the right in the final bed(s). If the first stage converts a fraction $X_1$ and the second converts a fraction $X_2$ of what remains, the overall conversion is
$$
X = 1 - (1 - X_1)(1 - X_2),
$$
so $X_1 = 0.96$ and $X_2 = 0.95$ give $99.8\,\%$. Modern plants achieve $99.7$–$99.9\,\%$, and tail-gas scrubbing can reduce emissions further.

## Nitric acid: the Ostwald process

Nitric acid is made by oxidising ammonia. Wilhelm Ostwald developed the process in 1902, and its industrial success depended on the cheap ammonia that Haber–Bosch soon provided. Three reactions:
$$
\begin{aligned}
4\,\mathrm{NH_3} + 5\,\mathrm{O_2} &\rightarrow 4\,\mathrm{NO} + 6\,\mathrm{H_2O} &\quad \Delta_\mathrm{r}H^\circ &= -905\ \mathrm{kJ\,mol^{-1}}\\
2\,\mathrm{NO} + \mathrm{O_2} &\rightleftharpoons 2\,\mathrm{NO_2} & \Delta_\mathrm{r}H^\circ &= -114\ \mathrm{kJ\,mol^{-1}}\\
3\,\mathrm{NO_2} + \mathrm{H_2O} &\rightarrow 2\,\mathrm{HNO_3} + \mathrm{NO} & &
\end{aligned}
$$
(enthalpies from NBS data for gaseous water). The first reaction is a striking case of kinetic selectivity. Thermodynamically, ammonia and oxygen would rather give nitrogen, $4\,\mathrm{NH_3} + 3\,\mathrm{O_2} \rightarrow 2\,\mathrm{N_2} + 6\,\mathrm{H_2O}$, which is even more exothermic. On a gauze of platinum–rhodium wire at about $850$–$950\,^\circ\mathrm{C}$, with contact times of about a millisecond, the selectivity to NO reaches $93$–$98\,\%$; longer contact or lower temperature gives more $\mathrm{N_2}$ and $\mathrm{N_2O}$. The gauze slowly loses platinum by volatilisation as $\mathrm{PtO_2}$, which is recovered by palladium "catchment" gauzes downstream.

The second reaction, the oxidation of NO, is unusual: it is third order and its rate *decreases* with increasing temperature (a pre-equilibrium forming an $\mathrm{N_2O_2}$ dimer, discussed in [[kinetics/reaction-mechanisms]]), so it is carried out after cooling the gas, and under pressure. Absorption in water in tall columns gives $50$–$68\,\%$ nitric acid, the NO released in the third reaction being reoxidised and reabsorbed.

The by-product **dinitrogen oxide** is the process's principal environmental issue. Unabated, a nitric acid plant emits several kilograms of $\mathrm{N_2O}$ per tonne of acid, and with a 100-year global warming potential of $273$ (IPCC AR6) each kilogram is equivalent to $273\ \mathrm{kg}$ of $\mathrm{CO_2}$. Catalysts placed below the gauze or in the tail gas decompose $\mathrm{N_2O}$ to $\mathrm{N_2}$ and $\mathrm{O_2}$ with efficiencies above $90\,\%$, and nitric acid plants in the EU have been covered by the Emissions Trading System for their $\mathrm{N_2O}$ since 2013. Tail-gas $\mathrm{NO_x}$ is reduced to nitrogen by selective catalytic reduction with ammonia.

::: warning Thermodynamics does not choose the product, the catalyst does {#warn-kinetic}
It is tempting to predict the product of a reaction from the most negative $\Delta_\mathrm{r}G$. For ammonia oxidation that would predict nitrogen, yet the industry makes NO in over $95\,\%$ selectivity. Thermodynamics says which products are *possible* and how far a single reversible reaction can go; when several products are possible, the one formed is the one formed fastest, and catalysts are chosen precisely to accelerate one path. The same is true of the ethylene oxide, partial-oxidation and selective-hydrogenation processes in [[green-chemistry/petrochemicals]]. The opposite error also occurs: a catalyst cannot push a single reversible reaction past its equilibrium conversion, which is why ammonia and $\mathrm{SO_3}$ syntheses need recycle loops and interstage absorbers.
:::

## Chlorine and sodium hydroxide

The chlor-alkali process, the electrolysis of brine, is treated in detail — cell voltage, energy consumption, the selectivity of chlorine over oxygen evolution and the three cell technologies — in [[electrochemistry/fuel-cells-electrolysis]]. From the industrial and green-chemistry point of view three features stand out.

- **Fixed co-production.** Every tonne of chlorine comes with $1.128\ \mathrm{t}$ of sodium hydroxide and $28\ \mathrm{kg}$ of hydrogen, so the industry is balanced between two markets — chlorine for PVC, isocyanates (for polyurethanes), epichlorohydrin and water treatment; caustic soda for alumina refining, pulp and paper, soaps and textiles — which fluctuate independently. The unit "one tonne of chlorine with its co-products" is called an electrochemical unit (ECU).
- **Mercury.** The mercury cell, once dominant, released mercury to air and water. Under the Minamata Convention on Mercury (adopted 2013, in force 2017) mercury-cell chlor-alkali production is being phased out, and in the EU the last mercury cells closed at the end of 2017 under the Industrial Emissions Directive's best-available-techniques conclusions. Membrane cells are both cleaner and more energy-efficient.
- **Energy.** At about $2.2$–$2.5\ \mathrm{MWh}$ of electricity per tonne of chlorine for membrane cells, chlor-alkali is among the largest electricity consumers in the chemical industry, and its emissions are those of the electricity supply. Oxygen-depolarised cathodes, which reduce oxygen instead of evolving hydrogen, lower the voltage by roughly $1\ \mathrm{V}$ at the cost of the hydrogen co-product.

The green-chemistry question about chlorine is less how it is made than how it is used. Chlorine is often a "transit" element: it activates a molecule and leaves as chloride waste. In the old chlorohydrin route to propylene oxide, chlorine passes through the process and ends as calcium chloride brine; in phosgene-based isocyanate manufacture it ends as HCl, which is recycled to chlorine by electrolysis or catalytic oxidation. Routes that avoid chlorine altogether, such as hydrogen-peroxide-based propylene oxide, are discussed in [[green-chemistry/petrochemicals]].

## Sodium carbonate: from Leblanc to Solvay

Sodium carbonate (soda ash) is used for glass, detergents and chemicals. Its history is a case study in atom economy before the term existed. The **Leblanc process** (1791) treated salt with sulfuric acid, giving sodium sulfate and hydrogen chloride, then heated the sulfate with limestone and coal:
$$
\begin{aligned}
2\,\mathrm{NaCl} + \mathrm{H_2SO_4} &\rightarrow \mathrm{Na_2SO_4} + 2\,\mathrm{HCl}\\
\mathrm{Na_2SO_4} + 2\,\mathrm{C} + \mathrm{CaCO_3} &\rightarrow \mathrm{Na_2CO_3} + \mathrm{CaS} + 2\,\mathrm{CO_2}
\end{aligned}
$$
The hydrogen chloride was at first vented, devastating vegetation around the works, and the calcium sulfide was dumped in heaps that released hydrogen sulfide. The British Alkali Act of 1863 required $95\,\%$ of the HCl to be condensed — creating the first industrial pollution inspectorate — and the HCl was later oxidised to chlorine for bleaching powder, turning waste into a co-product.

The **Solvay process**, developed by Ernest Solvay in the 1860s, replaced it. Brine saturated with ammonia is carbonated with $\mathrm{CO_2}$; sodium hydrogencarbonate, the least soluble salt in the system, precipitates:
$$
\mathrm{NaCl} + \mathrm{NH_3} + \mathrm{CO_2} + \mathrm{H_2O} \rightarrow \mathrm{NaHCO_3(s)} + \mathrm{NH_4Cl}.
$$
The hydrogencarbonate is calcined to the carbonate, $2\,\mathrm{NaHCO_3} \rightarrow \mathrm{Na_2CO_3} + \mathrm{CO_2} + \mathrm{H_2O}$, returning half the $\mathrm{CO_2}$; the rest comes from burning limestone, $\mathrm{CaCO_3} \rightarrow \mathrm{CaO} + \mathrm{CO_2}$. The lime is slaked and used to liberate the ammonia from ammonium chloride for recycling, $2\,\mathrm{NH_4Cl} + \mathrm{Ca(OH)_2} \rightarrow 2\,\mathrm{NH_3} + \mathrm{CaCl_2} + 2\,\mathrm{H_2O}$. Ammonia and $\mathrm{CO_2}$ circulate, and the overall reaction is simply
$$
\mathrm{CaCO_3} + 2\,\mathrm{NaCl} \rightarrow \mathrm{Na_2CO_3} + \mathrm{CaCl_2},
$$
a reaction that does not proceed directly (its equilibrium lies far to the left in water, as the precipitation of $\mathrm{CaCO_3}$ from mixed solutions shows); the cycle of ammonia and $\mathrm{CO_2}$, using solubility differences and heat, drives it.

::: example Atom economy of soda ash {#ex-soda}
Compare the atom economies of the Leblanc and Solvay processes from their overall equations ($M$: NaCl $58.44$, $\mathrm{H_2SO_4}$ $98.08$, C $12.01$, $\mathrm{CaCO_3}$ $100.09$, $\mathrm{Na_2CO_3}$ $105.99\ \mathrm{g\,mol^{-1}}$).
::: solution
**Leblanc**, overall: $2\,\mathrm{NaCl} + \mathrm{H_2SO_4} + 2\,\mathrm{C} + \mathrm{CaCO_3} \rightarrow \mathrm{Na_2CO_3} + 2\,\mathrm{HCl} + \mathrm{CaS} + 2\,\mathrm{CO_2}$. Reactants $116.88 + 98.08 + 24.02 + 100.09 = 339.07\ \mathrm{g}$; $\mathrm{AE} = 105.99/339.07 = 31.3\,\%$.

**Solvay**: reactants $100.09 + 116.88 = 216.97\ \mathrm{g}$; $\mathrm{AE} = 105.99/216.97 = 48.9\,\%$.

The Solvay process does better, but more than half of its reactant mass still leaves as calcium chloride, about $1.05\ \mathrm{t}$ per tonne of soda ash ($110.98/105.99$), traditionally discharged as a solution or stored in settling ponds; only a small part is sold (for road de-icing, for example). In addition the process loses some ammonia and uses much energy for calcination. Where natural deposits of trona, $\mathrm{Na_2CO_3\cdot NaHCO_3\cdot 2H_2O}$, exist — notably in Wyoming — soda ash is made simply by mining and calcining the mineral, which explains why the United States has no Solvay plants. The Hou process (Hou Debang, 1930s–40s), used widely in China, crystallises ammonium chloride as a fertiliser instead of regenerating ammonia, eliminating the calcium chloride waste: a co-product strategy.
:::
:::

## Fertilisers: urea and phosphoric acid

**Urea**, the most widely used nitrogen fertiliser, is made from ammonia and the process $\mathrm{CO_2}$ of the ammonia plant, by the Bosch–Meiser process (1922): ammonium carbamate forms rapidly and exothermically and then dehydrates slowly and endothermically,
$$
2\,\mathrm{NH_3} + \mathrm{CO_2} \rightleftharpoons \mathrm{H_2NCOONH_4} \rightleftharpoons \mathrm{CO(NH_2)_2} + \mathrm{H_2O},
$$
at about $140$–$200\ \mathrm{bar}$ and $180$–$190\,^\circ\mathrm{C}$, with unconverted carbamate decomposed and recycled.

**Phosphoric acid** for phosphate fertilisers is made by the "wet process", digesting phosphate rock (idealised as fluorapatite) with sulfuric acid:
$$
\mathrm{Ca_5(PO_4)_3F} + 5\,\mathrm{H_2SO_4} + 10\,\mathrm{H_2O} \rightarrow 3\,\mathrm{H_3PO_4} + 5\,\mathrm{CaSO_4\cdot2H_2O} + \mathrm{HF}.
$$
This is where much of the world's sulfuric acid goes. The by-product **phosphogypsum** — about $4$ tonnes per tonne of phosphate (as $\mathrm{P_2O_5}$) from the stoichiometry, more in practice — contains small amounts of radium and other impurities from the rock and is mostly stacked in large heaps; finding uses for it is a long-standing challenge. The fluoride is recovered as fluorosilicic acid, which is used for water fluoridation and to make aluminium fluoride. Phosphate rock is a finite resource concentrated in a few countries; it is on the EU list of critical raw materials, and recovering phosphorus from wastewater (as struvite, for example) is a growing part of [[green-chemistry/circular-economy]].

::: quiz
Why is sulfur trioxide absorbed in concentrated sulfuric acid rather than in water?
- [ ] Because $\mathrm{SO_3}$ does not react with water
- [ ] Because concentrated acid catalyses the formation of $\mathrm{SO_3}$
- [x] Because direct reaction with water vapour forms a fine acid mist that is hard to capture, whereas absorption into $98\,\%$ acid is efficient and controllable
- [ ] Because water would shift the $\mathrm{SO_2/SO_3}$ equilibrium backwards
::: solution
$\mathrm{SO_3}$ reacts very exothermically with water; contact with water or dilute acid forms sulfuric acid in the gas phase as a mist of sub-micrometre droplets that passes through absorption towers and escapes. In $98$–$99\,\%$ acid, at the composition with the lowest total vapour pressure over the solution, $\mathrm{SO_3}$ dissolves and reacts with the small amount of water present, and water is added to the circulating acid to keep its concentration constant. The equilibrium of the gas-phase oxidation is unaffected because the absorber is downstream of the converter.
:::
:::

::: history Bread from air {#hist-haber}
Haber's high-pressure ammonia synthesis was demonstrated to BASF in July 1909, and the first plant, at Oppau, started in 1913; Haber received the Nobel Prize in Chemistry for 1918 and Bosch shared the 1931 prize with Friedrich Bergius for high-pressure methods. During the First World War the process also supplied nitric acid for explosives, and Haber's role in chemical warfare makes his legacy profoundly mixed. Wilhelm Ostwald patented the catalytic oxidation of ammonia in 1902 (Nobel Prize 1909, for catalysis). The lead-chamber process for sulfuric acid (Roebuck, 1746) gave way to the contact process after Peregrine Phillips's patent of 1831 and its development with platinum and later vanadium catalysts in Germany around 1900–1915. Nicolas Leblanc's soda process (1791) was displaced by Ernest Solvay's (first plant at Couillet, Belgium, 1865 onwards), and Hamilton Castner and Karl Kellner's mercury cell (1890s) began the electrochemical chlor-alkali industry. The Bosch–Meiser urea process dates from 1922. Gerhard Ertl's surface-science studies of ammonia synthesis on iron, recognised by the 2007 Nobel Prize, finally established the mechanism: dissociative adsorption of $\mathrm{N_2}$ is the rate-determining step.
:::

## Where this leads

The thermodynamic reasoning of this chapter reappears in [[green-chemistry/petrochemicals]], where steam cracking is the opposite case — an endothermic reaction with an increase in moles, favoured by high temperature and low pressure — and in [[green-chemistry/carbon-hydrogen]], where steam reforming, low-emission hydrogen and ammonia as an energy carrier are developed. The surface chemistry of the iron and vanadium catalysts is in [[kinetics/surface-kinetics]] and [[organometallics-catalysis/heterogeneous-catalysis]], and the environmental chemistry of reactive nitrogen and sulfur in [[environmental-chemistry/particulates-acid-deposition]].

::: summary
- Ammonia synthesis and $\mathrm{SO_2}$ oxidation are reversible and exothermic with a decrease in gas moles: equilibrium favours low $T$ and high $p$, rate favours high $T$. For ideal gases and a stoichiometric feed, $y_{\mathrm{NH_3}}/(1 - y)^2 = 0.3248\,K\,p/p^\circ$, giving $36\,\%$ ammonia at $450\,^\circ\mathrm{C}$ and $200\ \mathrm{bar}$.
- At fixed conversion the rate peaks at $T_\mathrm{opt}$, with $1/T_\mathrm{opt} = 1/T_\mathrm{eq} + [R/(E_{-1} - E_1)]\ln(E_{-1}/E_1)$; multibed reactors with intercooling follow the falling optimum.
- Haber–Bosch: steam reforming, shift and $\mathrm{CO_2}$ removal, iron catalyst at $100$–$250\ \mathrm{bar}$ with recycle. Feedstock alone releases $0.97\ \mathrm{t\,CO_2}$ per tonne; the 2020 world average was about $2.4\ \mathrm{t}$ (IEA).
- Contact process: $\mathrm{V_2O_5}$ catalyst, adiabatic beds limited by equilibrium (about two-thirds conversion in bed 1), double absorption to $> 99.7\,\%$; a net energy exporter.
- Ostwald process: Pt–Rh gauze gives NO with kinetic selectivity over $\mathrm{N_2}$; $\mathrm{N_2O}$ ($\mathrm{GWP_{100}} = 273$) must be abated.
- Chlor-alkali gives fixed co-products ($1.128\ \mathrm{t}$ NaOH per t $\mathrm{Cl_2}$); mercury cells are being phased out under the Minamata Convention.
- Solvay ($\mathrm{AE} = 48.9\,\%$, $\mathrm{CaCl_2}$ waste) displaced Leblanc ($31.3\,\%$, HCl and CaS waste); wet-process phosphoric acid produces about $4\ \mathrm{t}$ phosphogypsum per t $\mathrm{P_2O_5}$.
:::

## Exercises

::: exercise Atom economy of urea {level=1 check="76.9"}
Find the atom economy of $2\,\mathrm{NH_3} + \mathrm{CO_2} \rightarrow \mathrm{CO(NH_2)_2} + \mathrm{H_2O}$ ($M$: $\mathrm{NH_3}$ $17.03$, $\mathrm{CO_2}$ $44.01$, urea $60.06\ \mathrm{g\,mol^{-1}}$). (Enter it in per cent.)
::: solution
$\mathrm{AE} = 60.06/(2\times17.03 + 44.01) = 60.06/78.07 = 76.9\,\%$, the by-product being water.
:::
:::

::: exercise Double absorption {level=1 check="99.8"}
In a DCDA plant the first contact stage converts $96\,\%$ of the $\mathrm{SO_2}$ and the second stage converts $95\,\%$ of what reaches it. What is the overall conversion? (Enter it in per cent.)
::: solution
$X = 1 - (1 - 0.96)(1 - 0.95) = 1 - 0.04\times0.05 = 0.998$, i.e. $99.8\,\%$. Unconverted $\mathrm{SO_2}$ falls from $4\,\%$ (single absorption) to $0.2\,\%$ of the feed.
:::
:::

::: exercise Nitrous oxide from a nitric acid plant {level=1 check="1.91"}
An unabated nitric acid plant emits $7.0\ \mathrm{kg}$ of $\mathrm{N_2O}$ per tonne of $\mathrm{HNO_3}$. Express this in tonnes of $\mathrm{CO_2}$-equivalent per tonne of acid using $\mathrm{GWP_{100}} = 273$. (Enter the answer in t $\mathrm{CO_2e}$.)
::: solution
$7.0\times273 = 1911\ \mathrm{kg} = 1.91\ \mathrm{t\,CO_2e}$ per tonne of acid — comparable to the $\mathrm{CO_2}$ from making the ammonia it was made from. A $90\,\%$ efficient abatement catalyst cuts it to $0.19\ \mathrm{t}$.
:::
:::

::: exercise Van 't Hoff for ammonia {level=2 check="7.25"}
With $\Delta_\mathrm{r}H^\circ = -92.22\ \mathrm{kJ\,mol^{-1}}$ for $\mathrm{N_2 + 3H_2 \rightleftharpoons 2NH_3}$, taken as constant, by what factor is the equilibrium constant at $700\ \mathrm{K}$ larger than at $800\ \mathrm{K}$? (Enter the factor.)
::: solution
$\ln(K_{700}/K_{800}) = -(\Delta_\mathrm{r}H^\circ/R)(1/700 - 1/800) = (92\,220/8.314)\times1.786\times10^{-4} = 1.981$, so the ratio is $\mathrm{e}^{1.981} = 7.25$. A $100\ \mathrm{K}$ change in temperature changes $K$ sevenfold, which would need a $\sqrt{7.25} = 2.7$-fold change in pressure to compensate at low conversion ($K \propto y/p^2$ for the reaction as written, at small $y$).
:::
:::

::: exercise Phosphogypsum {level=2 check="4.04"}
From the wet-process equation in the text, find the mass of $\mathrm{CaSO_4\cdot2H_2O}$ ($172.17\ \mathrm{g\,mol^{-1}}$) produced per tonne of phosphate expressed as $\mathrm{P_2O_5}$ ($141.94\ \mathrm{g\,mol^{-1}}$). (Enter the mass in tonnes.)
::: solution
Three $\mathrm{H_3PO_4}$ correspond to $1.5\ \mathrm{P_2O_5}$ and come with $5$ gypsum: $5\times172.17/(1.5\times141.94) = 860.85/212.91 = 4.04\ \mathrm{t}$ per tonne of $\mathrm{P_2O_5}$. Real rock contains extra calcium (as carbonate) and the recovery of phosphate is incomplete, so practical figures are higher, about $4.5$–$5\ \mathrm{t}$.
:::
:::

::: exercise Ammonia at lower pressure {level=2 check="34.2"}
Find the ideal-gas equilibrium mole fraction of ammonia from a stoichiometric feed at $400\,^\circ\mathrm{C}$ and $100\ \mathrm{bar}$, using $\Delta_\mathrm{r}H^\circ = -46.11\ \mathrm{kJ\,mol^{-1}}$ and $\Delta_\mathrm{r}S^\circ = -99.38\ \mathrm{J\,K^{-1}\,mol^{-1}}$ per mole of $\mathrm{NH_3}$. (Enter $y$ in per cent, to three significant figures.)
::: solution
At $673.15\ \mathrm{K}$: $\Delta_\mathrm{r}G^\circ = -46\,110 + 673.15\times99.38 = 20\,788\ \mathrm{J\,mol^{-1}}$, $K = \exp(-20\,788/(8.314\times673.15)) = 0.02437$. $a = 0.3248\times0.02437\times100 = 0.7914$. $y = [2(0.7914) + 1 - \sqrt{4(0.7914) + 1}]/(2\times0.7914) = (2.5828 - 2.0412)/1.5828 = 0.342$, i.e. $34.2\,\%$ — close to the value at $450\,^\circ\mathrm{C}$ and $200\ \mathrm{bar}$. Lowering the temperature by $50\ \mathrm{K}$ allows the pressure to be halved for nearly the same equilibrium, if a catalyst active enough at $400\,^\circ\mathrm{C}$ is available: the reason for the interest in ruthenium and other low-temperature catalysts, which would reduce compression energy.
:::
:::

::: exercise Optimal temperature profile {level=3 check="725.7"}
For the model of [[#prop-topt]] with $E_1 = 100\ \mathrm{kJ\,mol^{-1}}$, $E_{-1} = 200\ \mathrm{kJ\,mol^{-1}}$ and $K = 1$ at $800\ \mathrm{K}$, find $T_\mathrm{eq}$ and $T_\mathrm{opt}$ at conversion $X = 0.70$. (Enter $T_\mathrm{opt}$ in K, to one decimal place.)
::: hint
$K(T) = \exp[(-\Delta_\mathrm{r}H/R)(1/T - 1/800)]$ with $-\Delta_\mathrm{r}H = E_{-1} - E_1$, and $K(T_\mathrm{eq}) = X/(1 - X)$.
:::
::: solution
$-\Delta_\mathrm{r}H/R = 100\,000/8.314 = 12\,027.9\ \mathrm{K}$. Equilibrium: $\ln(0.7/0.3) = 0.8473 = 12\,027.9(1/T_\mathrm{eq} - 1/800)$, so $1/T_\mathrm{eq} = 1.25\times10^{-3} + 7.044\times10^{-5} = 1.3204\times10^{-3}\ \mathrm{K^{-1}}$, $T_\mathrm{eq} = 757.3\ \mathrm{K}$. Then by [[#eq-topt]], $1/T_\mathrm{opt} = 1.3204\times10^{-3} + (\ln2)/12\,027.9 = 1.3204\times10^{-3} + 5.763\times10^{-5} = 1.3781\times10^{-3}$, $T_\mathrm{opt} = 725.7\ \mathrm{K}$. At $X = 0.5$ the optimum was $764.7\ \mathrm{K}$: the optimum falls by about $39\ \mathrm{K}$ as conversion rises from $50$ to $70\,\%$.
:::
:::

::: exercise SO₂ equilibrium at 800 K {level=3 check="90.2"}
For the feed of [[#ex-so2]] ($0.10\ \mathrm{SO_2}$, $0.11\ \mathrm{O_2}$, $0.79\ \mathrm{N_2}$) at $1.0\ \mathrm{bar}$, find the equilibrium conversion of $\mathrm{SO_2}$ at $800\ \mathrm{K}$, given $K(800\ \mathrm{K}) = 35.1$. Explain why raising the pressure to $5\ \mathrm{bar}$ is not usually worthwhile. (Enter the conversion in per cent, to three significant figures.)
::: hint
Write $K = [X/(1 - X)]\sqrt{(1 - 0.05X)/(0.11 - 0.05X)}$ at $1\ \mathrm{bar}$ and solve by trial.
:::
::: solution
Define $g(X) = [X/(1 - X)]\sqrt{(1 - 0.05X)/(0.11 - 0.05X)}$. At $X = 0.90$: $9.000\times\sqrt{0.955/0.065} = 9.000\times3.833 = 34.5$. At $X = 0.905$: $9.526\times\sqrt{0.95475/0.06475} = 9.526\times3.840 = 36.6$. Interpolating to $35.1$ gives $X = 0.9015$, i.e. $90.2\,\%$. At $5\ \mathrm{bar}$ the right-hand side gains a factor $\sqrt5 = 2.24$, so $X/(1 - X)$ must fall by that factor at fixed $K$: the equilibrium conversion would rise to about $95\,\%$. But double absorption already achieves $99.8\,\%$ at near-atmospheric pressure, and the equipment and compression energy for $\mathrm{SO_2}$-laden gas at higher pressure cost more than they gain; a few plants nonetheless operate under moderate pressure.
:::
:::
