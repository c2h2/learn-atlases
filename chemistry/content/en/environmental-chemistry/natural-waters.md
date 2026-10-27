A litre of water from a chalk stream in southern England, a litre from a granite lake in Norway and a litre of sea water look identical, but they are three different chemical systems. The chalk stream carries about $100\ \mathrm{mg}$ of dissolved calcium, a pH near $8$ and enough bicarbonate to neutralise a good dose of acid. The Norwegian lake holds a few milligrams of solutes, a pH that may be below $6$, and almost no capacity to resist acidification. Sea water contains $35\ \mathrm{g}$ of salts in remarkably constant proportions, held at pH $8.1$ by a buffer system that is now absorbing a quarter of humanity's $\mathrm{CO_2}$. At the bottom of a eutrophic lake, meanwhile, there may be no oxygen at all, and the water smells of hydrogen sulfide and carries dissolved iron and manganese that would be insoluble a few metres higher up.

This lesson develops the equilibrium chemistry that explains these differences, following the classic treatment of Werner Stumm and James Morgan. Two master variables control almost everything: **pH**, governed in most natural waters by the carbonate system, and **pe**, a measure of electron activity that tells us which oxidation state of each element is stable. The tools are those of [[analytical-chemistry/equilibria-in-analysis]] — mass balances, charge balances, distribution fractions — applied to systems open to the atmosphere and to minerals.

## The composition of natural waters

River water acquires its solutes mainly from the weathering of rocks, modified by atmospheric inputs and biology. A typical "world average" river contains, in order of molar abundance, bicarbonate, calcium, silica, sulfate, chloride, sodium, magnesium and potassium, with total dissolved solids of order $100\ \mathrm{mg\,dm^{-3}}$. Carbonate rocks (limestone, dolomite) dissolve rapidly and give hard, well-buffered waters; silicate rocks (granite, gneiss) weather slowly and give soft, poorly buffered ones — which is why acid deposition harmed Scandinavian and Scottish lakes far more than English chalk streams ([[environmental-chemistry/particulates-acid-deposition]]).

Sea water is different in kind. Its major ions — $\mathrm{Cl^-}$ ($546\ \mathrm{mmol\,kg^{-1}}$), $\mathrm{Na^+}$ ($469$), $\mathrm{Mg^{2+}}$ ($52.8$), $\mathrm{SO_4^{2-}}$ ($28.2$), $\mathrm{Ca^{2+}}$ ($10.3$), $\mathrm{K^+}$ ($10.2$), $\mathrm{HCO_3^-}$ (about $1.8$) at salinity $35$ — occur in nearly constant ratios throughout the ocean (Marcet's principle, quantified by Dittmar in 1884), because their residence times (millions of years) far exceed the ocean's mixing time (about a thousand years). Salinity can therefore be measured from a single property such as conductivity. Minor and trace constituents — nutrients, trace metals, dissolved gases — are *non-conservative*: they are taken up and released by organisms and vary with depth and region.

## The carbonate system

::: definition Distribution fractions of the carbonate system {#def-alpha}
Let the total dissolved inorganic carbon be $\mathrm{C_T} = [\mathrm{H_2CO_3^*}] + [\mathrm{HCO_3^-}] + [\mathrm{CO_3^{2-}}]$, where $\mathrm{H_2CO_3^*}$ denotes dissolved $\mathrm{CO_2(aq)}$ plus the small amount of true $\mathrm{H_2CO_3}$. With acidity constants $K_1 = [\mathrm{H^+}][\mathrm{HCO_3^-}]/[\mathrm{H_2CO_3^*}]$ and $K_2 = [\mathrm{H^+}][\mathrm{CO_3^{2-}}]/[\mathrm{HCO_3^-}]$, the **distribution fractions** are
$$
\alpha_0 = \frac{[\mathrm{H^+}]^2}{D},\qquad \alpha_1 = \frac{K_1[\mathrm{H^+}]}{D},\qquad \alpha_2 = \frac{K_1K_2}{D},\qquad D = [\mathrm{H^+}]^2 + K_1[\mathrm{H^+}] + K_1K_2,
$$
so that $[\mathrm{H_2CO_3^*}] = \alpha_0\mathrm{C_T}$ and so on, and $\alpha_0 + \alpha_1 + \alpha_2 = 1$. For fresh water at $25\ \mathrm{°C}$ and zero ionic strength, $\mathrm{p}K_1 = 6.35$ and $\mathrm{p}K_2 = 10.33$; the Henry's law constant of $\mathrm{CO_2}$ is $K_\mathrm{H} = 10^{-1.47}\ \mathrm{mol\,dm^{-3}\,atm^{-1}}$ (Stumm and Morgan). Sea water requires conditional constants ([[environmental-chemistry/greenhouse-gases]]).
:::

::: widget plot
f: 1/(1 + 10^(x - p1) + 10^(2*x - p1 - p2)); 1/(10^(p1 - x) + 1 + 10^(x - p2)); 1/(10^(p1 + p2 - 2*x) + 10^(p2 - x) + 1)
x: 3, 13
y: 0, 1.05
sliders: p1=6.35:5.8:6.5:0.01; p2=10.33:8.9:10.4:0.01
labels: \alpha_0\ (\mathrm{H_2CO_3^*}); \alpha_1\ (\mathrm{HCO_3^-}); \alpha_2\ (\mathrm{CO_3^{2-}})
caption: Distribution fractions of the carbonate system against pH. With the freshwater constants ($\mathrm{p}K_1 = 6.35$, $\mathrm{p}K_2 = 10.33$) bicarbonate dominates between about pH $6.4$ and $10.3$ — the range of almost all natural waters — and is above $80\ \%$ of $\mathrm{C_T}$ from pH $7$ to $9.7$. Move the sliders to the seawater conditional values ($5.85$, $8.97$) and the carbonate ion becomes important already at pH $8$, which is why the ocean's buffer works at its natural pH.
:::

A system's behaviour depends on what is held constant. In a **closed system** — a sealed sample, or groundwater isolated from the air — $\mathrm{C_T}$ is fixed and adding acid or base redistributes carbon among the three species. In an **open system** in equilibrium with the atmosphere, $[\mathrm{H_2CO_3^*}] = K_\mathrm{H}p_{\mathrm{CO_2}}$ is fixed instead, and $\mathrm{C_T} = K_\mathrm{H}p_{\mathrm{CO_2}}/\alpha_0$ rises steeply with pH, as $\mathrm{CO_2}$ is drawn in from the gas. Surface waters are usually somewhere between: lakes and rivers are often *supersaturated* in $\mathrm{CO_2}$ because respiration of organic matter adds it faster than it can escape, and they degas $\mathrm{CO_2}$ to the atmosphere.

## Alkalinity

The pH of a water is a sensitive indicator but a poor descriptor of its chemistry. What tells you how the water will respond to an acid input — acid rain, an acidic effluent, $\mathrm{CO_2}$ itself — is its alkalinity.

::: definition Alkalinity {#def-alkalinity}
The **total alkalinity** $A_\mathrm{T}$ of a water is its acid-neutralising capacity: the amount of strong acid per unit volume (or mass) needed to titrate it to the equivalence point of carbonic acid, about pH $4.5$. For a water whose bases are carbonate species, hydroxide and (in sea water) borate,
$$
A_\mathrm{T} = [\mathrm{HCO_3^-}] + 2[\mathrm{CO_3^{2-}}] + [\mathrm{B(OH)_4^-}] + [\mathrm{OH^-}] - [\mathrm{H^+}],
$$
in $\mathrm{eq\,dm^{-3}}$ (or $\mathrm{mol\,kg^{-1}}$). It counts the excess of proton acceptors over proton donors relative to a **reference level** — $\mathrm{H_2CO_3^*}$, $\mathrm{H_2O}$, $\mathrm{B(OH)_3}$. By the charge balance it also equals the excess of conservative cations over conservative anions,
$$
A_\mathrm{T} = \left([\mathrm{Na^+}] + [\mathrm{K^+}] + 2[\mathrm{Ca^{2+}}] + 2[\mathrm{Mg^{2+}}] + \ldots\right) - \left([\mathrm{Cl^-}] + 2[\mathrm{SO_4^{2-}}] + [\mathrm{NO_3^-}] + \ldots\right).
$$
Alkalinity is expressed in "mg/L as $\mathrm{CaCO_3}$" in water engineering ($1\ \mathrm{meq\,dm^{-3}} = 50.04\ \mathrm{mg\,dm^{-3}}$ as $\mathrm{CaCO_3}$).
:::

::: proposition Conservation of alkalinity {#prop-alk-conservative}
Alkalinity is unchanged by the gain or loss of $\mathrm{CO_2}$ (degassing, respiration, photosynthesis to the extent that it consumes only $\mathrm{CO_2}$), and it mixes conservatively: when two waters are mixed, the alkalinity of the mixture is the volume-weighted mean. It is changed only by reactions that change the balance of conservative ions: addition of strong acids or bases, dissolution or precipitation of carbonate minerals (each mole of $\mathrm{CaCO_3}$ dissolved raises $A_\mathrm{T}$ by $2\ \mathrm{eq}$ and $\mathrm{C_T}$ by $1\ \mathrm{mol}$), uptake of nitrate or ammonium by organisms, and redox reactions such as denitrification and sulfate reduction that consume or produce protons.
:::

::: proof Alkalinity as a charge balance {#proof-alk-conservative}
Write the full charge balance of the solution: $\sum z_i[\text{cations}] = \sum\lvert z_j\rvert[\text{anions}]$. Split the ions into conservative ones (whose concentrations do not depend on pH or $\mathrm{C_T}$: $\mathrm{Na^+}$, $\mathrm{Ca^{2+}}$, $\mathrm{Cl^-}$, $\mathrm{SO_4^{2-}}$, …) and the acid–base species ($\mathrm{H^+}$, $\mathrm{OH^-}$, $\mathrm{HCO_3^-}$, $\mathrm{CO_3^{2-}}$, $\mathrm{B(OH)_4^-}$). Rearranging, the protolytic combination $[\mathrm{HCO_3^-}] + 2[\mathrm{CO_3^{2-}}] + [\mathrm{B(OH)_4^-}] + [\mathrm{OH^-}] - [\mathrm{H^+}]$ equals the conservative charge excess. Adding $\mathrm{CO_2}$ adds no ions, so the conservative excess, and hence $A_\mathrm{T}$, is unchanged — the added $\mathrm{CO_2}$ simply shifts carbonate to bicarbonate and lowers the pH. Mixing is linear in conservative ion concentrations, hence in $A_\mathrm{T}$. Dissolving $\mathrm{CaCO_3}$ adds one $\mathrm{Ca^{2+}}$, i.e. two equivalents of conservative cation charge.
:::

::: example Alkalinity and DIC from a titration {#ex-alkalinity}
A $100.0\ \mathrm{cm^3}$ sample of lake water needs $4.20\ \mathrm{cm^3}$ of $0.0200\ \mathrm{mol\,dm^{-3}}$ HCl to reach pH $4.5$. Its initial pH is $7.50$. Find (a) the alkalinity in $\mathrm{meq\,dm^{-3}}$ and as $\mathrm{mg\,dm^{-3}}$ $\mathrm{CaCO_3}$; (b) $\mathrm{C_T}$, using the freshwater constants and neglecting activity corrections.
::: solution
(a) Acid added: $4.20\times10^{-3}\ \mathrm{dm^3}\times0.0200 = 8.40\times10^{-5}\ \mathrm{mol}$ in $0.1000\ \mathrm{dm^3}$, so $A_\mathrm{T} = 8.40\times10^{-4}\ \mathrm{eq\,dm^{-3}} = 0.840\ \mathrm{meq\,dm^{-3}}$, or $0.840\times50.04 = 42\ \mathrm{mg\,dm^{-3}}$ as $\mathrm{CaCO_3}$ — a moderately soft water.

(b) At pH $7.50$, [[#def-alpha]] gives $\alpha_1 = 0.933$ and $\alpha_2 = 0.0014$ ($[\mathrm{H^+}] = 3.16\times10^{-8}$, $D$ dominated by the first two terms). Then $A_\mathrm{T} \approx \mathrm{C_T}(\alpha_1 + 2\alpha_2) + [\mathrm{OH^-}] - [\mathrm{H^+}]$, and the last two terms ($3.2\times10^{-7}$ and $3.2\times10^{-8}$) are negligible against $8.4\times10^{-4}$:
$$
\mathrm{C_T} = \frac{8.40\times10^{-4}}{0.933 + 0.0028} = 8.98\times10^{-4}\ \mathrm{mol\,dm^{-3}} .
$$
About $93\ \%$ of the carbon is bicarbonate and $6.6\ \%$ dissolved $\mathrm{CO_2}$. In equilibrium with air the dissolved $\mathrm{CO_2}$ would be $K_\mathrm{H}p_{\mathrm{CO_2}} = 10^{-1.47}\times4.24\times10^{-4} = 1.43\times10^{-5}\ \mathrm{mol\,dm^{-3}}$; here it is $0.066\times8.98\times10^{-4} = 5.9\times10^{-5}$, four times supersaturated — a common state for lakes, which are net sources of $\mathrm{CO_2}$ to the atmosphere.
:::
:::

::: example Mixing an acidic tributary into a river {#ex-mixing}
An acidic stream draining an old mine has a net acidity of $100\ \mathrm{\mu eq\,dm^{-3}}$ (that is, $A_\mathrm{T} = -100\ \mathrm{\mu eq\,dm^{-3}}$, from dissolved sulfuric acid). It joins a river of alkalinity $800\ \mathrm{\mu eq\,dm^{-3}}$ in the flow ratio $1:3$. Find the alkalinity of the mixture and its pH once it has equilibrated with the atmosphere ($424\ \mathrm{\mu atm}$, freshwater constants, $25\ \mathrm{°C}$).
::: solution
By [[#prop-alk-conservative]], alkalinity mixes linearly:
$$
A_\text{mix} = \frac{1\times(-100) + 3\times800}{4} = 575\ \mathrm{\mu eq\,dm^{-3}} .
$$
The mixture is still alkaline in the capacity sense: the river's bicarbonate has neutralised the acid, releasing $\mathrm{CO_2}$ ($\mathrm{H^+ + HCO_3^- \rightarrow H_2CO_3^* \rightarrow CO_2 + H_2O}$). After that $\mathrm{CO_2}$ degasses, the water is an open system with $[\mathrm{H_2CO_3^*}] = K_\mathrm{H}p_{\mathrm{CO_2}}$, and since bicarbonate dominates, $[\mathrm{HCO_3^-}] \approx A_\text{mix}$:
$$
[\mathrm{H^+}] = \frac{K_1K_\mathrm{H}p_{\mathrm{CO_2}}}{[\mathrm{HCO_3^-}]} = \frac{10^{-6.35}\times10^{-1.47}\times4.24\times10^{-4}}{5.75\times10^{-4}} = 1.12\times10^{-8},
$$
pH $7.95$. Immediately after mixing, before degassing, the pH would be lower, because the released $\mathrm{CO_2}$ is still in solution; the pH recovers as the water flows downstream. Note what mixing did *not* do: it did not average the pH values of the two streams. pH is a logarithmic intensity and never mixes linearly; alkalinity and $\mathrm{C_T}$ do.
:::
:::

### Calcite dissolution and hard water

Limestone dissolves by reaction with carbonic acid:
$$
\mathrm{CaCO_3(s)} + \mathrm{CO_2(g)} + \mathrm{H_2O(l)} \rightleftharpoons \mathrm{Ca^{2+}(aq)} + 2\,\mathrm{HCO_3^-(aq)} .
$$

::: proposition Calcite in equilibrium with CO₂ {#prop-calcite-open}
Pure water in equilibrium with calcite ($K_\mathrm{sp} = [\mathrm{Ca^{2+}}][\mathrm{CO_3^{2-}}] = 10^{-8.48}$ at $25\ \mathrm{°C}$) and a gas phase of fixed $p_{\mathrm{CO_2}}$, in the pH range where bicarbonate dominates, has
$$
[\mathrm{Ca^{2+}}] = \left(\frac{K_\mathrm{sp}K_1K_\mathrm{H}\,p_{\mathrm{CO_2}}}{4K_2}\right)^{1/3},
\qquad [\mathrm{HCO_3^-}] = 2[\mathrm{Ca^{2+}}] .
$$
The dissolved calcium rises only as the cube root of $p_{\mathrm{CO_2}}$. For atmospheric $p_{\mathrm{CO_2}} = 424\ \mathrm{\mu atm}$ this gives $[\mathrm{Ca^{2+}}] = 0.48\ \mathrm{mmol\,dm^{-3}}$ ($19\ \mathrm{mg\,dm^{-3}}$) and pH $8.2$ (activity coefficients neglected; including them raises calcium by about $10\ \%$ and pH by about $0.1$).
:::

::: proof Combining four equilibria and a charge balance {#proof-calcite-open}
The overall reaction is the sum of $\mathrm{CaCO_3 \rightleftharpoons Ca^{2+} + CO_3^{2-}}$ ($K_\mathrm{sp}$), $\mathrm{CO_3^{2-} + H^+ \rightleftharpoons HCO_3^-}$ ($1/K_2$), $\mathrm{CO_2(g) + H_2O \rightleftharpoons H_2CO_3^*}$ ($K_\mathrm{H}$) and $\mathrm{H_2CO_3^* \rightleftharpoons H^+ + HCO_3^-}$ ($K_1$), so its equilibrium constant is
$$
K = \frac{[\mathrm{Ca^{2+}}][\mathrm{HCO_3^-}]^2}{p_{\mathrm{CO_2}}} = \frac{K_\mathrm{sp}K_1K_\mathrm{H}}{K_2} .
$$
Charge balance: $2[\mathrm{Ca^{2+}}] + [\mathrm{H^+}] = [\mathrm{HCO_3^-}] + 2[\mathrm{CO_3^{2-}}] + [\mathrm{OH^-}]$. Near pH $8$ the minor terms are small, leaving $[\mathrm{HCO_3^-}] = 2[\mathrm{Ca^{2+}}]$. Substituting, $4[\mathrm{Ca^{2+}}]^3 = Kp_{\mathrm{CO_2}}$, which is the result. Numerically $K = 10^{-8.48-6.35-1.47+10.33} = 10^{-5.97}$; with $p = 4.24\times10^{-4}$, $[\mathrm{Ca^{2+}}]^3 = 10^{-5.97}\times4.24\times10^{-4}/4 = 1.14\times10^{-10}$, $[\mathrm{Ca^{2+}}] = 4.84\times10^{-4}\ \mathrm{mol\,dm^{-3}}$. Then $[\mathrm{H^+}] = K_1K_\mathrm{H}p/[\mathrm{HCO_3^-}] = 10^{-7.82}\times4.24\times10^{-4}/9.69\times10^{-4} = 6.6\times10^{-9}$, pH $8.18$; at that pH $[\mathrm{CO_3^{2-}}]/[\mathrm{HCO_3^-}] = 0.007$, so the approximation holds.
:::

Soil air contains far more $\mathrm{CO_2}$ than the atmosphere — often $1$–$10\ \%$ — because of root and microbial respiration. Groundwater that has percolated through limestone under $p_{\mathrm{CO_2}} = 10^{-2}\ \mathrm{atm}$ therefore carries about $1.4\ \mathrm{mmol\,dm^{-3}}$ of calcium (cube-root scaling: a factor $(10^{-2}/4.24\times10^{-4})^{1/3} = 2.9$) at pH $7.3$. When it emerges at a spring and degasses to atmospheric $p_{\mathrm{CO_2}}$, it becomes supersaturated and precipitates calcite — the origin of tufa, stalactites, and the scale in kettles in hard-water areas. **Hardness**, the sum of $[\mathrm{Ca^{2+}}] + [\mathrm{Mg^{2+}}]$ (also reported as $\mathrm{mg\,dm^{-3}}$ $\mathrm{CaCO_3}$), is a nuisance (scale, soap scum) but not a health hazard.

::: warning pH is not alkalinity, and "alkaline" is not "high alkalinity" {#warn-ph-alk}
Two waters with the same pH can have alkalinities differing a hundredfold, and their resistance to acid then differs a hundredfold too. A granite lake at pH $6.8$ with $A_\mathrm{T} = 20\ \mathrm{\mu eq\,dm^{-3}}$ is driven below pH $5$ by a few tens of microequivalents of acid, while a chalk stream at pH $7.8$ with $A_\mathrm{T} = 4\ \mathrm{meq\,dm^{-3}}$ barely notices the same input. Conversely, a water can be "alkaline" in the sense of pH above $7$ (because it has lost $\mathrm{CO_2}$ to photosynthesis on a sunny afternoon) without having much alkalinity. pH tells you the *intensity* of the acid–base state; alkalinity tells you the *capacity*. Monitoring programmes for acidification therefore measure alkalinity or acid-neutralising capacity, not just pH ([[environmental-chemistry/environmental-monitoring]]).
:::

## Dissolved oxygen and the redox state of waters

Dissolved oxygen is the most important single indicator of water quality. Its solubility follows Henry's law: at $25\ \mathrm{°C}$, $K_\mathrm{H}(\mathrm{O_2}) = 1.26\times10^{-3}\ \mathrm{mol\,dm^{-3}\,atm^{-1}}$, and with the partial pressure of oxygen in water-saturated air at $1\ \mathrm{atm}$, $0.2095\times(1 - 0.0313) = 0.203\ \mathrm{atm}$, the saturation concentration is $2.56\times10^{-4}\ \mathrm{mol\,dm^{-3}} = 8.2\ \mathrm{mg\,dm^{-3}}$. It rises to about $11\ \mathrm{mg\,dm^{-3}}$ at $10\ \mathrm{°C}$ and is lower in sea water ("salting out"). This is a small reservoir: the oxidation of only $7.7\ \mathrm{mg\,dm^{-3}}$ of glucose ($\mathrm{C_6H_{12}O_6 + 6\,O_2 \rightarrow 6\,CO_2 + 6\,H_2O}$, $192/180 = 1.07\ \mathrm{g}$ of $\mathrm{O_2}$ per gram) uses it all. The **biochemical oxygen demand** (BOD) of a sewage effluent — the oxygen consumed by microbes in five days at $20\ \mathrm{°C}$ — is therefore the key measure of its polluting power, and nutrient-driven blooms of algae (**eutrophication**), which die and decay, can strip the bottom waters of lakes and coastal seas of oxygen.

To describe what happens when the oxygen is gone, we need a quantitative measure of redox conditions.

::: definition pe and the redox intensity {#def-pe}
For a redox half-reaction written as a reduction, $\mathrm{Ox} + n\,\mathrm{e^-} \rightleftharpoons \mathrm{Red}$ (with protons as needed), define $\mathrm{pe} = -\log_{10}a_{\mathrm{e^-}}$, a formal electron activity. Then
$$
\mathrm{pe} = \mathrm{pe}^\circ + \frac{1}{n}\log_{10}\frac{\{\mathrm{Ox}\}}{\{\mathrm{Red}\}},
\qquad
\mathrm{pe}^\circ = \frac{\log_{10}K}{n} = \frac{FE^\circ}{2.303RT} = \frac{E^\circ}{0.05916\ \mathrm{V}}\ (\text{at } 298\ \mathrm{K}),
$$
and $\mathrm{pe} = E_\mathrm{H}/0.05916\ \mathrm{V}$, where $E_\mathrm{H}$ is the electrode potential on the hydrogen scale. High pe means oxidising, low pe reducing. For half-reactions involving protons it is useful to quote $\mathrm{pe}^\circ(\mathrm{W})$, the value at pH $7$ with all other species at unit activity.
:::

The pe of water is bounded by the stability of water itself. At the oxidising limit, $\frac{1}{4}\mathrm{O_2(g)} + \mathrm{H^+} + \mathrm{e^-} \rightleftharpoons \frac{1}{2}\mathrm{H_2O}$ with $\mathrm{pe}^\circ = 20.75$ gives
$$
\mathrm{pe} = 20.75 - \mathrm{pH} + \tfrac{1}{4}\log_{10}p_{\mathrm{O_2}} ;
$$ {#eq-pe-upper}
at the reducing limit, $\mathrm{H^+} + \mathrm{e^-} \rightleftharpoons \frac{1}{2}\mathrm{H_2(g)}$ with $\mathrm{pe}^\circ = 0$ gives $\mathrm{pe} = -\mathrm{pH} - \frac{1}{2}\log_{10}p_{\mathrm{H_2}}$. A water in equilibrium with air at pH $7$ has $\mathrm{pe} = 13.75 + \frac{1}{4}\log0.21 = 13.6$; an anoxic sediment producing methane is near $\mathrm{pe} = -4$.

::: widget plot
f: 20.75 - x; -x; 14.9 - 1.25*x; 4.25 - 1.125*x
x: 0, 14
y: -14, 21
labels: \mathrm{O_2/H_2O}\ (p_{\mathrm{O_2}} = 1); \mathrm{H_2O/H_2}\ (p_{\mathrm{H_2}} = 1); \mathrm{NO_3^-/NH_4^+}\ (\text{equal}); \mathrm{SO_4^{2-}/HS^-}\ (\text{equal})
caption: A pe–pH diagram. Water is stable between the top line ($\mathrm{O_2}$ evolution) and the second ($\mathrm{H_2}$ evolution), both with slope $-1$ because one proton accompanies each electron. The other lines are the boundaries at which oxidised and reduced forms are equal in activity: nitrate/ammonium ($\mathrm{NO_3^- + 10\,H^+ + 8\,e^- \rightleftharpoons NH_4^+ + 3\,H_2O}$, slope $-10/8$) and sulfate/bisulfide ($\mathrm{SO_4^{2-} + 9\,H^+ + 8\,e^- \rightleftharpoons HS^- + 4\,H_2O}$, slope $-9/8$). Above a line the oxidised form dominates. Natural waters run from near the top line (surface waters) to near the bottom one (methanogenic sediments).
:::

### The redox ladder

When organic matter is decomposed in a water or sediment cut off from the atmosphere, microbes use the available oxidants in the order of decreasing free-energy yield — the same order as decreasing $\mathrm{pe}^\circ(\mathrm{W})$ of the oxidant's half-reaction (values at pH $7$ and $25\ \mathrm{°C}$ from Stumm and Morgan, *Aquatic Chemistry*):

| oxidant → product | $\mathrm{pe}^\circ(\mathrm{W})$ |
|---|---|
| $\mathrm{O_2 \rightarrow H_2O}$ (aerobic respiration) | $+13.75$ |
| $\mathrm{NO_3^- \rightarrow N_2}$ (denitrification) | $+12.65$ |
| $\mathrm{MnO_2(s) \rightarrow Mn^{2+}}$ (manganese reduction, as $\mathrm{MnCO_3}$ at $10^{-3}\ \mathrm{M}$ bicarbonate) | $+8.5$ |
| $\mathrm{NO_3^- \rightarrow NH_4^+}$ | $+6.15$ |
| $\mathrm{FeOOH(s) \rightarrow Fe^{2+}}$ (iron reduction, as $\mathrm{FeCO_3}$ at $10^{-3}\ \mathrm{M}$ bicarbonate) | $-0.8$ |
| $\mathrm{SO_4^{2-} \rightarrow HS^-}$ (sulfate reduction) | $-3.75$ |
| $\mathrm{CO_2 \rightarrow CH_4}$ (methanogenesis) | $-4.13$ |
| $\mathrm{H^+ \rightarrow H_2}$ | $-7.00$ |

Organic matter itself, as $\mathrm{CH_2O}$ oxidised to $\mathrm{CO_2}$, sits near $\mathrm{pe}^\circ(\mathrm{W}) = -8.2$, so every oxidant above it can be used, each yielding less energy than the last. The resulting **redox sequence** is observed in time (in a flooded paddy field or a stagnant lake through the summer) and in space (with depth in a sediment, or along the flow path of a contaminated groundwater plume): first oxygen disappears, then nitrate, then dissolved manganese and iron appear, then sulfide, then methane. The ladder is thermodynamic, but it is enforced by biology: microbes specialise in one oxidant at a time and out-compete each other in the order of energy yield.

::: example The pe of a water and the speciation of nitrogen {#ex-pe-nitrogen}
(a) Find the pe of a lake water at pH $8.0$ in equilibrium with air. (b) For the half-reaction $\mathrm{NO_3^- + 10\,H^+ + 8\,e^- \rightleftharpoons NH_4^+ + 3\,H_2O}$, with $\log_{10}K = 119.2$, find the ratio $[\mathrm{NO_3^-}]/[\mathrm{NH_4^+}]$ at equilibrium in that water. (c) Comment.
::: solution
(a) From [[#eq-pe-upper]], $\mathrm{pe} = 20.75 - 8.0 + \frac{1}{4}\log_{10}0.21 = 12.75 - 0.17 = 12.58$.

(b) $\mathrm{pe}^\circ = 119.2/8 = 14.90$, and $\mathrm{pe} = 14.90 + \frac{1}{8}\log_{10}\left(\frac{[\mathrm{NO_3^-}][\mathrm{H^+}]^{10}}{[\mathrm{NH_4^+}]}\right) = 14.90 - \frac{10}{8}\mathrm{pH} + \frac{1}{8}\log_{10}\frac{[\mathrm{NO_3^-}]}{[\mathrm{NH_4^+}]}$. At pH $8.0$: $14.90 - 10.00 = 4.90$, so
$$
\log_{10}\frac{[\mathrm{NO_3^-}]}{[\mathrm{NH_4^+}]} = 8(12.58 - 4.90) = 61.4 .
$$
(c) At equilibrium with air, ammonium should be absent to sixty orders of magnitude. Yet oxygenated lakes routinely contain micromolar ammonium, released from decaying organic matter and excreted by animals. The discrepancy is kinetic: nitrification is slow and microbially mediated, and many redox couples in natural waters are not in equilibrium with each other. A single "pe of the water" is therefore a useful idealisation for the dominant, fast couples (in oxic water, $\mathrm{O_2}$; in anoxic water, often $\mathrm{Fe^{3+}/Fe^{2+}}$ or sulfide), not a measured property shared by all couples. Platinum-electrode measurements of $E_\mathrm{H}$ respond mainly to the iron couple and are interpretable only in anoxic, iron-rich waters.
:::
:::

## Metals in natural waters: hydrolysis, complexation and speciation

A metal's behaviour in water — its solubility, mobility, bioavailability and toxicity — depends on its chemical form, its **speciation**, rather than its total concentration. The main processes are:

- **Hydrolysis.** Highly charged cations bind hydroxide or lose protons from coordinated water: $\mathrm{Fe(H_2O)_6^{3+} \rightleftharpoons Fe(H_2O)_5(OH)^{2+} + H^+}$, and so on to insoluble hydroxides. Iron(III) and aluminium are almost insoluble at neutral pH, while their divalent counterparts (Fe²⁺) and alkali and alkaline-earth ions are soluble.
- **Complexation** by inorganic ligands ($\mathrm{Cl^-}$, $\mathrm{CO_3^{2-}}$, $\mathrm{SO_4^{2-}}$, $\mathrm{OH^-}$) and, often more strongly, by natural organic matter (humic and fulvic acids) and biogenic ligands. In sea water, more than $99\ \%$ of dissolved copper is bound by strong organic ligands, so the free $\mathrm{Cu^{2+}}$ activity is several orders of magnitude below the total.
- **Sorption** onto particle surfaces — iron and manganese oxyhydroxides, clays, organic matter — which typically increases with pH for cations ([[environmental-chemistry/soils-remediation]]).
- **Redox transformations**: chromium(VI) as chromate is mobile and toxic, chromium(III) is largely insoluble; arsenic(III) is more mobile and more toxic than arsenic(V); mercury(II) can be methylated by sulfate-reducing bacteria in anoxic sediments to methylmercury, which bioaccumulates ([[environmental-chemistry/pollutants-fate]]).

The **free-ion activity model**, an empirical generalisation, holds that for many metals the biological uptake and toxicity to aquatic organisms correlate better with the free-ion activity than with the total dissolved concentration; it is the basis of regulatory "biotic ligand models" that adjust copper and zinc water-quality standards for local pH, hardness and dissolved organic carbon.

::: example Aluminium released by acidification {#ex-aluminium}
The solubility of gibbsite is $\mathrm{Al(OH)_3(s) + 3\,H^+ \rightleftharpoons Al^{3+} + 3\,H_2O}$, with $\log_{10}{}^{*}K_\mathrm{s0} = 8.11$ at $25\ \mathrm{°C}$. Find the equilibrium free $\mathrm{Al^{3+}}$ concentration, in $\mathrm{\mu g\,dm^{-3}}$, at pH $6.0$, $5.0$ and $4.5$, ignoring hydroxo complexes.
::: solution
From the equilibrium, $[\mathrm{Al^{3+}}] = {}^{*}K_\mathrm{s0}[\mathrm{H^+}]^3$, i.e. $\log_{10}[\mathrm{Al^{3+}}] = 8.11 - 3\,\mathrm{pH}$:

| pH | $\log_{10}[\mathrm{Al^{3+}}]$ | $[\mathrm{Al^{3+}}]/\mathrm{\mu g\,dm^{-3}}$ |
|---|---|---|
| $6.0$ | $-9.89$ | $0.0035$ |
| $5.0$ | $-6.89$ | $3.5$ |
| $4.5$ | $-5.39$ | $110$ |

(multiplying by $26.98\ \mathrm{g\,mol^{-1}}$). Each pH unit raises free aluminium a thousandfold. Below about pH $5$ the inorganic monomeric aluminium released from soil minerals reaches concentrations harmful to fish (hazard: it precipitates and polymerises at the less acidic gill surface, disrupting gas exchange and ion regulation), which is the main mechanism of fish loss in acidified lakes. The hydroxo complexes $\mathrm{Al(OH)^{2+}}$, $\mathrm{Al(OH)_2^+}$ and $\mathrm{Al(OH)_4^-}$, neglected here, raise the *total* dissolved aluminium further, especially near neutral and alkaline pH, so the true solubility minimum lies near pH $6$.
:::
:::

::: example How much organic matter exhausts the oxidants? {#ex-electron-budget}
A shallow groundwater contains $8.0\ \mathrm{mg\,dm^{-3}}$ of dissolved $\mathrm{O_2}$ and $10\ \mathrm{mg\,dm^{-3}}$ of nitrate-nitrogen ($\mathrm{NO_3^-}$–N). How much organic matter, written $\mathrm{CH_2O}$, must be oxidised to consume both, assuming nitrate is reduced to $\mathrm{N_2}$? What happens next if more organic carbon is available?
::: solution
Count **electron equivalents**. $\mathrm{O_2}$ accepts $4\ \mathrm{e^-}$: $8.0/32.00 = 0.250\ \mathrm{mmol}$, i.e. $1.00\ \mathrm{meq}$ per $\mathrm{dm^3}$. Nitrate going from $+5$ to $0$ accepts $5\ \mathrm{e^-}$ per N: $10/14.007 = 0.714\ \mathrm{mmol}$ N, i.e. $3.57\ \mathrm{meq}$. Total $4.57\ \mathrm{meq\,dm^{-3}}$. Organic carbon in $\mathrm{CH_2O}$ (oxidation state $0$) gives $4\ \mathrm{e^-}$ on oxidation to $\mathrm{CO_2}$, so $4.57/4 = 1.14\ \mathrm{mmol\,dm^{-3}}$ of $\mathrm{CH_2O}$, or $1.14\times30.03 = 34\ \mathrm{mg\,dm^{-3}}$. Nitrate, not oxygen, dominates the oxidising capacity of this agricultural groundwater. With more organic carbon, the next rungs — manganese and iron oxides on the aquifer grains — are attacked, releasing dissolved $\mathrm{Mn^{2+}}$ and $\mathrm{Fe^{2+}}$ (and any arsenic sorbed on the iron oxides, a mechanism behind arsenic in some groundwaters), and then sulfate is reduced to sulfide. Electron bookkeeping of this kind is how hydrogeologists estimate the capacity of an aquifer to degrade a pollutant plume.
:::
:::

::: widget plot
f: 8.11 - 3*x + log(26.98e6)/log(10); log(26.98e6*(10^(8.11 - 3*x) + 10^(8.11 - 4.99 - 2*x) + 10^(8.11 - 10.1 - x) + 10^(8.11 - 22.7 + x)))/log(10)
x: 3, 9
y: -4, 6
labels: \log_{10}[\mathrm{Al^{3+}}]/(\mathrm{\mu g\,dm^{-3}}); \log_{10}[\mathrm{Al}]_\text{tot}/(\mathrm{\mu g\,dm^{-3}})
caption: Solubility of aluminium in equilibrium with gibbsite against pH (log scale, in $\mathrm{\mu g\,dm^{-3}}$): the free ion alone (slope $-3$, from [[#ex-aluminium]]) and the total including the hydroxo complexes $\mathrm{Al(OH)^{2+}}$, $\mathrm{Al(OH)_2^+}$ and $\mathrm{Al(OH)_4^-}$ (with illustrative hydrolysis constants $\log{}^{*}\beta_1 = -4.99$, $\log{}^{*}\beta_2 = -10.1$, $\log{}^{*}\beta_4 = -22.7$). The total has a minimum near pH $6$–$6.5$ and rises on both sides — aluminium is amphoteric — which is why aluminium salts used as coagulants in water treatment are dosed at pH $6$–$7$ ([[environmental-chemistry/soils-remediation]]).
:::

::: quiz
A groundwater well near a landfill has no dissolved oxygen or nitrate, high dissolved iron, a little sulfate, and no sulfide or methane. Where on the redox ladder is it?
- [ ] Aerobic: dissolved iron is always present in oxygenated water.
- [ ] Methanogenic, since landfills produce methane.
- [x] In the iron-reducing zone: oxygen and nitrate (and manganese oxides) are exhausted, iron(III) oxides are being reduced to soluble $\mathrm{Fe^{2+}}$, but sulfate reduction has not yet set in.
- [ ] Sulfate-reducing, because sulfate is low.
::: solution
Following the ladder: $\mathrm{O_2}$ gone, $\mathrm{NO_3^-}$ gone, $\mathrm{Fe^{2+}}$ present means the iron rung is active; sulfide would appear once sulfate reduction began, and methane only after sulfate was exhausted. Low but non-zero sulfate with no sulfide is consistent with the iron-reducing zone (sulfate may simply be low in the source water). Contaminant plumes from landfills show this zonation along their flow path, and it governs the fate of redox-sensitive pollutants such as chlorinated solvents and arsenic.
:::
:::

::: history
The systematic application of equilibrium thermodynamics to natural waters began with Lars Gunnar Sillén's 1961 paper "The physical chemistry of sea water", which treated the ocean as an equilibrium system with its sediments. Garrels and Christ's *Solutions, Minerals, and Equilibria* (1965) made pe–pH (Eh–pH) diagrams standard tools of geochemistry, building on Marcel Pourbaix's electrochemical diagrams of the 1940s. Werner Stumm and James Morgan's *Aquatic Chemistry* (1970; 3rd edition 1996) unified acid–base, complexation, redox and surface chemistry of natural waters into the discipline as it is taught today. The concept of alkalinity as a conservative property, and its precise titration by Gran's method (1952), underpin the ocean carbon measurements of the following decades.
:::

## Where this leads

The partitioning of organic pollutants between water, sediments, air and organisms, and the role of redox zones in their degradation, are treated in [[environmental-chemistry/pollutants-fate]]. Sorption of metals on mineral surfaces, water-treatment chemistry (coagulation with aluminium and iron salts, softening, disinfection) and the remediation of redox-sensitive contaminants follow in [[environmental-chemistry/soils-remediation]]. The analytical methods — alkalinity titrations, ion chromatography, ICP-MS for trace metals, and speciation techniques — belong to [[environmental-chemistry/environmental-monitoring]] and [[analytical-chemistry/atomic-spectrometry]].

::: summary
- Natural waters get their solutes from weathering; carbonate terrains give hard, buffered waters, silicate terrains soft, vulnerable ones; sea water's major ions occur in constant proportions.
- The carbonate system: distribution fractions $\alpha_0$, $\alpha_1$, $\alpha_2$ with $\mathrm{p}K_1 = 6.35$, $\mathrm{p}K_2 = 10.33$ (fresh water, $25\ \mathrm{°C}$); bicarbonate dominates natural waters. Open systems fix $[\mathrm{H_2CO_3^*}] = K_\mathrm{H}p_{\mathrm{CO_2}}$, closed systems fix $\mathrm{C_T}$.
- Alkalinity is the acid-neutralising capacity, $[\mathrm{HCO_3^-}] + 2[\mathrm{CO_3^{2-}}] + \ldots - [\mathrm{H^+}]$, equal to the conservative charge excess; it is unchanged by $\mathrm{CO_2}$ exchange and mixes conservatively.
- Calcite open to $\mathrm{CO_2}$ gives $[\mathrm{Ca^{2+}}] = (K_\mathrm{sp}K_1K_\mathrm{H}p/4K_2)^{1/3}$: $0.48\ \mathrm{mmol\,dm^{-3}}$ and pH $8.2$ for air; soil $\mathrm{CO_2}$ makes hard groundwater that precipitates calcite on degassing.
- Dissolved oxygen saturates at only $8.2\ \mathrm{mg\,dm^{-3}}$ ($25\ \mathrm{°C}$), so organic loads (BOD) and eutrophication readily cause anoxia.
- pe $= \mathrm{pe}^\circ + \frac{1}{n}\log(\mathrm{Ox/Red})$; water is stable between $\mathrm{pe} = 20.75 - \mathrm{pH}$ and $\mathrm{pe} = -\mathrm{pH}$. Oxidants are used in the order $\mathrm{O_2} > \mathrm{NO_3^-} > \mathrm{Mn(IV)} > \mathrm{Fe(III)} > \mathrm{SO_4^{2-}} > \mathrm{CO_2}$, though many couples are not in mutual equilibrium.
- Metal behaviour depends on speciation — hydrolysis, complexation, sorption, redox; free $\mathrm{Al^{3+}}$ rises a thousandfold per pH unit below pH $6$, the main toxic agent in acidified lakes.
:::

## Exercises

::: exercise pe of an aerated sea water {level=1 check="12.5"}
Find the pe of surface sea water at pH $8.1$ in equilibrium with air ($p_{\mathrm{O_2}} = 0.21\ \mathrm{atm}$), using [[#eq-pe-upper]]. (Enter the pe, to three significant figures.)
::: solution
$\mathrm{pe} = 20.75 - 8.1 + \frac{1}{4}\log_{10}0.21 = 12.65 - 0.169 = 12.5$. The corresponding potential is $E_\mathrm{H} = 0.05916\times12.48 = 0.74\ \mathrm{V}$ — although, as [[#ex-pe-nitrogen]] warns, a platinum electrode in oxic sea water does not reach this value, because the $\mathrm{O_2}$ couple is electrochemically sluggish.
:::
:::

::: exercise Bicarbonate fraction at neutral pH {level=1 check="82"}
Using the freshwater constants of [[#def-alpha]], what percentage of $\mathrm{C_T}$ is bicarbonate at pH $7.00$? (Enter the percentage, to two significant figures.)
::: solution
$[\mathrm{H^+}] = 10^{-7}$; $D = 10^{-14} + 10^{-6.35}\times10^{-7} + 10^{-16.68} = 10^{-14} + 4.47\times10^{-14} + 2.1\times10^{-17} = 5.47\times10^{-14}$. So $\alpha_1 = 4.47\times10^{-14}/5.47\times10^{-14} = 0.817$, i.e. $82\ \%$; $\alpha_0 = 18\ \%$ and $\alpha_2 = 0.04\ \%$.
:::
:::

::: exercise Alkalinity from a titration {level=1 check="1.26"}
A $50.0\ \mathrm{cm^3}$ river-water sample needs $6.30\ \mathrm{cm^3}$ of $0.0100\ \mathrm{mol\,dm^{-3}}$ HCl to reach pH $4.5$. Find the total alkalinity. (Enter $A_\mathrm{T}$ in $\mathrm{meq\,dm^{-3}}$, to three significant figures.)
::: solution
$6.30\times10^{-3}\times0.0100 = 6.30\times10^{-5}\ \mathrm{mol}$ of acid in $0.0500\ \mathrm{dm^3}$: $A_\mathrm{T} = 1.26\times10^{-3}\ \mathrm{eq\,dm^{-3}} = 1.26\ \mathrm{meq\,dm^{-3}}$, or $63\ \mathrm{mg\,dm^{-3}}$ as $\mathrm{CaCO_3}$. For accurate work at low alkalinity, the end point is located by a Gran plot rather than a fixed pH, because the equivalence pH depends on $\mathrm{C_T}$.
:::
:::

::: exercise Groundwater in limestone {level=2 check="1.4"}
Using [[#prop-calcite-open]], find the calcium concentration of water in equilibrium with calcite under soil air with $p_{\mathrm{CO_2}} = 1.0\times10^{-2}\ \mathrm{atm}$ at $25\ \mathrm{°C}$, and its pH. (Enter $[\mathrm{Ca^{2+}}]$ in $\mathrm{mmol\,dm^{-3}}$, to two significant figures.)
::: solution
$[\mathrm{Ca^{2+}}]^3 = 10^{-5.97}\times1.0\times10^{-2}/4 = 2.68\times10^{-9}$, so $[\mathrm{Ca^{2+}}] = 1.39\times10^{-3}\ \mathrm{mol\,dm^{-3}} = 1.4\ \mathrm{mmol\,dm^{-3}}$ ($56\ \mathrm{mg\,dm^{-3}}$; hardness $139\ \mathrm{mg\,dm^{-3}}$ as $\mathrm{CaCO_3}$). Then $[\mathrm{HCO_3^-}] = 2.78\times10^{-3}$ and $[\mathrm{H^+}] = K_1K_\mathrm{H}p/[\mathrm{HCO_3^-}] = 10^{-7.82}\times10^{-2}/2.78\times10^{-3} = 5.45\times10^{-8}$, pH $7.26$. Twenty-four times the $\mathrm{CO_2}$ gives only $2.9$ times the calcium: the cube-root law.
:::
:::

::: exercise Oxygen sag below an outfall {level=2 check="2.4"}
A sewage effluent with no dissolved oxygen and a BOD of $20\ \mathrm{mg\,dm^{-3}}$ is discharged into a river saturated at $8.0\ \mathrm{mg\,dm^{-3}}$ of $\mathrm{O_2}$, in the ratio one volume of effluent to four of river water (whose own BOD is negligible). If the whole BOD were exerted before any re-aeration, what dissolved-oxygen concentration would remain? (Enter it in $\mathrm{mg\,dm^{-3}}$, to two significant figures.)
::: solution
After mixing, $\mathrm{DO} = (4\times8.0 + 1\times0)/5 = 6.4\ \mathrm{mg\,dm^{-3}}$ and $\mathrm{BOD} = 20/5 = 4.0\ \mathrm{mg\,dm^{-3}}$. Exerting all of it leaves $6.4 - 4.0 = 2.4\ \mathrm{mg\,dm^{-3}}$ — low enough to stress fish. In a real river the BOD is exerted over days while oxygen re-enters from the air, producing the classic "oxygen sag" curve described by the Streeter–Phelps equations, a pair of coupled first-order processes.
:::
:::

::: exercise Dissolved inorganic carbon of a hard water {level=2 check="2.50"}
A water has pH $8.30$ and total alkalinity $2.50\ \mathrm{meq\,dm^{-3}}$. Find $\mathrm{C_T}$ using the freshwater constants. (Enter $\mathrm{C_T}$ in $\mathrm{mmol\,dm^{-3}}$, to three significant figures.)
::: solution
At pH $8.30$: $\alpha_1 = 0.980$, $\alpha_2 = 0.00914$. $[\mathrm{OH^-}] = 2.0\times10^{-6}$ and $[\mathrm{H^+}] = 5\times10^{-9}$, both small. So $\mathrm{C_T} = (2.50\times10^{-3} - 2.0\times10^{-6})/(0.980 + 2\times0.00914) = 2.50\times10^{-3}\ \mathrm{mol\,dm^{-3}}$. At this pH, the "phenolphthalein end point", alkalinity and $\mathrm{C_T}$ are almost equal, because nearly all carbon is bicarbonate carrying one equivalent each.
:::
:::

::: exercise Nitrate or ammonium? {level=3 check="5.5"}
(a) From $\mathrm{NO_3^- + 10\,H^+ + 8\,e^- \rightleftharpoons NH_4^+ + 3\,H_2O}$ with $\log_{10}K = 119.2$, derive the pe–pH line on which $[\mathrm{NO_3^-}] = [\mathrm{NH_4^+}]$, and show that it gives $\mathrm{pe}^\circ(\mathrm{W}) = 6.15$. (b) At what pe are the two equal at pH $7.5$? (c) A groundwater at pH $7.5$ has a measured $E_\mathrm{H}$ of $+0.20\ \mathrm{V}$. Which form should dominate at equilibrium? (Enter the pe from (b), to two significant figures.)
::: solution
(a) $\log K = \log[\mathrm{NH_4^+}] - \log[\mathrm{NO_3^-}] + 10\,\mathrm{pH} + 8\,\mathrm{pe}$ (since $\log[\mathrm{H^+}]^{-10} = 10\,\mathrm{pH}$ and $\log a_{\mathrm{e^-}}^{-8} = 8\,\mathrm{pe}$). With equal concentrations, $8\,\mathrm{pe} = 119.2 - 10\,\mathrm{pH}$, i.e. $\mathrm{pe} = 14.90 - 1.25\,\mathrm{pH}$. At pH $7$: $14.90 - 8.75 = 6.15$. (b) At pH $7.5$: $14.90 - 9.375 = 5.53 \approx 5.5$. (c) $\mathrm{pe} = 0.20/0.05916 = 3.4$, below $5.5$, so ammonium should dominate at equilibrium, by a factor $10^{8(5.53 - 3.38)} = 10^{17}$. (If nitrate is nevertheless present, the water is not at internal redox equilibrium — common in groundwaters, where reduction of nitrate requires a microbial population and a supply of electron donor.)
:::
:::

::: exercise Calcite precipitation at a spring {level=3 check="90"}
The groundwater of the earlier exercise ($[\mathrm{Ca^{2+}}] = 1.39\ \mathrm{mmol\,dm^{-3}}$, $[\mathrm{HCO_3^-}] = 2.78\ \mathrm{mmol\,dm^{-3}}$) emerges at a spring and comes to equilibrium with calcite and the atmosphere ($p_{\mathrm{CO_2}} = 424\ \mathrm{\mu atm}$). Assuming the precipitation $\mathrm{Ca^{2+} + 2\,HCO_3^- \rightarrow CaCO_3(s) + CO_2(g) + H_2O}$ is the only reaction and the final state obeys [[#prop-calcite-open]], how much calcite precipitates per cubic decimetre? (Enter the mass in mg, to two significant figures.)
::: hint
The stoichiometry keeps $[\mathrm{HCO_3^-}] = 2[\mathrm{Ca^{2+}}]$ throughout, so the final calcium is simply the open-system value at atmospheric $p_{\mathrm{CO_2}}$.
:::
::: solution
Each $\mathrm{Ca^{2+}}$ removed takes two $\mathrm{HCO_3^-}$, preserving the ratio $[\mathrm{HCO_3^-}]/[\mathrm{Ca^{2+}}] = 2$ assumed in [[#prop-calcite-open]]. The final state is therefore $[\mathrm{Ca^{2+}}] = 0.484\ \mathrm{mmol\,dm^{-3}}$, and the calcite precipitated is $1.389 - 0.484 = 0.905\ \mathrm{mmol\,dm^{-3}}$, i.e. $0.905\times100.09 = 90\ \mathrm{mg\,dm^{-3}}$. Alkalinity falls by $1.81\ \mathrm{meq\,dm^{-3}}$ — consistent with [[#prop-alk-conservative]], since precipitating carbonate minerals is one of the few processes that changes it. In practice precipitation is slow and needs nucleation sites (mosses, algae, pipe walls), so spring waters stay supersaturated for some distance downstream.
:::
:::

::: exercise Aluminium in an acidified stream {level=2 check="14"}
Using the gibbsite equilibrium of [[#ex-aluminium]], find the free $\mathrm{Al^{3+}}$ concentration at pH $4.8$. (Enter it in $\mathrm{\mu g\,dm^{-3}}$, to two significant figures.)
::: solution
$\log_{10}[\mathrm{Al^{3+}}] = 8.11 - 14.4 = -6.29$, so $[\mathrm{Al^{3+}}] = 5.13\times10^{-7}\ \mathrm{mol\,dm^{-3}} = 5.13\times10^{-7}\times26.98\times10^{6}\ \mathrm{\mu g\,dm^{-3}} = 14\ \mathrm{\mu g\,dm^{-3}}$.
:::
:::
