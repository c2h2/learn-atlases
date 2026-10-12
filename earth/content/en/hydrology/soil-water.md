A centimetre of rain falling on a bare soil in January and the same centimetre falling in July go to different places: in January most of it drains past the roots to the aquifer, in July none of it does. The difference is the **soil moisture**, and it is the single state variable that determines whether a storm makes a flood or a crop survives a dry week, whether a hillside is stable or a landslide is imminent, whether a spill reaches the water table or is evaporated, and whether a river has a flow in August. It is also the **least measured** and **most heterogeneous** variable in the whole of hydrology.

## The retention curve and the conductivity curve

::: definition Soil water retention and the characteristic water contents {#def-retention}
Water is held in the soil's pores against gravity by **capillary** and **adsorptive** forces, and the relation between the water content $\theta$ and the **matric potential** $\psi$ (the "suction", negative in an unsaturated soil) is the **retention curve**, whose standard parametric form is **van Genuchten's**
$$
\theta(\psi) = \theta_{\mathrm{r}} + (\theta_{\mathrm{s}} - \theta_{\mathrm{r}})\left[1 + (\alpha|\psi|)^{n}\right]^{-m}, \qquad m = 1 - \frac{1}{n},
$$
with $\theta_{\mathrm{r}}$ and $\theta_{\mathrm{s}}$ the **residual** and **saturated** water contents and $\alpha$ and $n$ shape parameters set by the **pore-size distribution**; the **Brooks–Corey** form $\theta = \theta_{\mathrm{r}} + (\theta_{\mathrm{s}}-\theta_{\mathrm{r}})(\psi_{\mathrm{b}}/|\psi|)^{\lambda}$ is its simpler ancestor. The curve's shape is the physical signature of the texture: a **sand** has a **steep** curve that drains rapidly between 10 and 100 cm of suction because its pores are uniform and large, a **clay** has a **flat** curve that holds water at every suction because its pores span five orders of magnitude, and a **loam** lies between.

Four water contents organise the subject:
$$
\begin{array}{l|l|l|l}
\text{term} & \text{symbol} & \text{suction} & \text{meaning} \\ \hline
\text{saturated} & \theta_{\mathrm{s}} & 0 & \text{all pores full} \\
\text{field capacity} & \theta_{\mathrm{FC}} & 33\ \mathrm{hPa}\ (10\ \text{in coarse soil}) & \text{drainage after 2--3 days} \\
\text{permanent wilting point} & \theta_{\mathrm{PWP}} & 15{,}000\ \mathrm{hPa} & \text{the crop cannot extract} \\
\text{residual} & \theta_{\mathrm{r}} & > 10^{5}\ \mathrm{hPa} & \text{the film on the grains}
\end{array}
$$
and the **available water capacity** $\theta_{\mathrm{A}} = \theta_{\mathrm{FC}} - \theta_{\mathrm{PWP}}$ is the storage the crop can draw on. A silt loam with $\theta_{\mathrm{FC}} = 0.30$ and $\theta_{\mathrm{PWP}} = 0.12$ holds $180\ \mathrm{mm}$ of available water per metre of root zone, and a **maize** crop with an 0.8-m root zone therefore has **144 mm** of water in reserve — enough for three weeks of a midsummer evapotranspiration of $5\ \mathrm{mm\,d^{-1}}$, which is the whole of the agronomy of dry farming in a single subtraction.
:::

::: definition The conductivity curve and why it matters more than the retention curve {#def-conductivity}
The **unsaturated hydraulic conductivity** $K(\theta)$ falls by **three to five orders of magnitude** between saturation and field capacity, because the water that drains first is the water in the **largest** pores, which are also the **fastest** conduits. The standard form is **Mualem's** model combined with van Genuchten,
$$
K = K_{\mathrm{s}}\,S_{\mathrm{e}}^{1/2}\left[1 - \left(1 - S_{\mathrm{e}}^{1/m}\right)^{m}\right]^{2}, \qquad S_{\mathrm{e}} = \frac{\theta - \theta_{\mathrm{r}}}{\theta_{\mathrm{s}} - \theta_{\mathrm{r}}},
$$
and the exponential form $K = K_{\mathrm{s}} e^{-\alpha|\psi|}$ is its workable ancestor. The consequence is the **central asymmetry** of the unsaturated zone: a soil at field capacity transmits water **a thousand times more slowly** than the same soil when saturated, so **the same profile** that transmits a winter's rain to the aquifer in a fortnight holds a summer's rain in the root zone for a month.

The **saturated** conductivities span five orders of magnitude and are the least reproducible numbers in soil physics:
$$
\begin{array}{l|c|l}
\text{texture} & K_{\mathrm{s}}\ (\mathrm{m\,d^{-1}}) & \text{behaviour} \\ \hline
\text{heavy clay, sodic} & 0.005\text{--}0.05 & \text{near-total surface runoff} \\
\text{clay, structured} & 0.05\text{--}0.5 & \text{matrix slow, macropores fast} \\
\text{silt loam} & 0.2\text{--}2 & \text{the agricultural mean} \\
\text{loam} & 0.5\text{--}5 & \\
\text{fine sand} & 2\text{--}20 & \text{all rain infiltrates} \\
\text{gravel, karst} & 50\text{--}2000 & \text{no effective infiltration limit}
\end{array}
$$
and the **measured** value depends on the **method** — a **double-ring** infiltrometer measures the top 5 cm and its **sealed** surface, a **tension** infiltrometer the top 10 cm, a **hydrograph** the whole catchment's **fast** pathways, and a **borehole** **falling-head** test the **fractures** — with the result that the same soil can be reported over a range of two orders of magnitude. Since the **runoff** mechanism turns on whether the rainfall intensity **exceeds** $K_{\mathrm{s}}$, this is not a refinement but the **decisive** parameter of every storm.
:::

::: definition Richards' equation and the two infiltration mechanisms {#def-richards}
Unsaturated flow is **Darcy's law with a conductivity that depends on the water content**, and mass conservation gives **Richards' equation**
$$
\frac{\partial\theta}{\partial t} = -\frac{\partial q}{\partial z}, \qquad q = -K(\theta)\left(\frac{\partial\psi}{\partial z} + 1\right),
$$
in which the $+1$ is the **gravity** gradient and the $\partial\psi/\partial z$ the **capillary** gradient, which in an unsaturated soil is **directed upward** and can exceed gravity by orders of magnitude — the reason water **moves upward** from a deep, moist layer into a dry one over metres, and the reason a soil **wets** a dry sand from above almost as fast as a wet one.

Two mechanisms generate **overland** flow, and they are physically opposite:
$$
\begin{array}{ll}
\textbf{Horton / infiltration-excess} & \text{rainfall intensity} > K_{\mathrm{s}}\ \text{at the surface; water ponds and runs off}\\
\textbf{Hewlett / saturation-excess} & \text{the water table rises to the surface; the saturated area grows and every drop runs off}\\
\textbf{Dunne} & \text{the subsurface flow to a shallow headland exfiltrates and saturates it}
\end{array}
$$
**Infiltration-excess** dominates on **dry**, **bare**, **compacted**, **clay** and **burned** surfaces and on **deserts**, produces runoff **during** the storm with a **short** lag, and requires the **antecedent** soil to be **dry**. **Saturation-excess** dominates in **humid**, **soaked**, **shallow-soiled**, **glacial-till** and **colluvium-mantled** catchments, produces runoff from a **growing area** near the channel, requires the antecedent soil to be **wet**, and gives the **variable source area** that explains why a catchment's runoff coefficient rises from 0.01 in a small storm to 0.6 in a large one — a **non-linearity** that no infiltration-based model reproduces and that the **topmodel** was built to represent.
:::

::: example Available water and the crop's reserve {#ex-awc}
A silt loam has $\theta_{\mathrm{s}} = 0.42$, $\theta_{\mathrm{FC}} = 0.30$, $\theta_{\mathrm{PWP}} = 0.12$ and a root zone of 0.9 m. A maize crop extracts water until the **readily available** fraction — half the available water — is gone, and the midseason evapotranspiration is $6.5\ \mathrm{mm\,d^{-1}}$. Find the available water capacity, the readily available water, and the number of days the crop can survive a dry spell beginning at field capacity.
::: solution
$$
\theta_{\mathrm{A}} = 0.30 - 0.12 = 0.18\ \mathrm{m^{3}\,m^{-3}} = 180\ \mathrm{mm\,m^{-1}}, \qquad
W_{\mathrm{A}} = 0.18\times900 = 162\ \mathrm{mm},
$$
$$
W_{\mathrm{raw}} = 0.5\times162 = 81\ \mathrm{mm}, \qquad
\tau = \frac{81}{6.5} = 12\ \text{days}.
$$
A **12-day** dry spell is the point at which the maize begins to **wilt** and its yield to suffer; a **25-day** spell would take it to the permanent wilting point and destroy the crop.

The arithmetic is the whole of **irrigation scheduling** and of the **drought** sensitivity of rain-fed agriculture, and three of its features are routinely missed. The **rooting depth** is not fixed: a maize crop reaches 0.9 m only by tasselling, so the same soil protects a **young** crop for three days and a **mature** one for twelve, and a **drought that arrives in June** is far more damaging than the same drought in August. The **readily available fraction** is a **soil- and crop-specific** parameter that ranges from 0.3 on a **clay** (where the water is held so tightly that the plant cannot extract the last third before the stomata close) to 0.6 on a **sand** (where the water is loosely held but the total store is small). And the **evapotranspiration** is not constant: a crop at **half** the available water closes its stomata and **reduces** its own transpiration, so the depletion **slows** and the 12-day figure is a **lower bound** on the survival time — which is why the **actual** wilting of a stressed crop always comes **later** than the simple calculation predicts and why the **yield loss** begins **earlier** than the wilting.

The **climate-change** consequence follows directly. A 10 per cent rise in the midseason evapotranspiration shortens the 12-day window to **11 days**, and a 20 per cent rise to **10 days**; but the **frequency** of dry spells longer than 12 days rises **much** faster than 10 per cent, because the spell-length distribution is roughly **geometric**, and a 20 per cent rise in the evapotranspiration is equivalent to a **shortening** of the soil's reserve by a fifth, which in a **Mediterranean** or **semi-arid** climate roughly **doubles** the frequency of a yield-destroying spell.
:::
:::

::: widget plot
f: 0.04 + 0.39*(1+0.335*x)^(-0.359)
x: 0.1, 1000
y: 0.04, 0.45
labels: theta\ (\text{m}^3\text{/m}^3)
caption: The **soil water retention curve** of a loam from the van Genuchten parameters $\theta_{\mathrm{r}} = 0.04$, $\theta_{\mathrm{s}} = 0.43$, $\alpha = 0.335\ \mathrm{cm^{-1}}$, $n = 1.56$. The **air entry value** near $\psi = 10$ cm is the suction at which the **largest** pores drain, and the curve is **nearly flat** above it — the soil is **saturated** and holds $0.43\ \mathrm{m^{3}\,m^{-3}}$. Between 10 and 300 cm the curve is **steep**: this is the range in which **gravity drains** the soil, and the water content falls from 0.41 to 0.10 in a day or two. Above 300 cm the curve **flattens** again as only the **smallest** pores retain water, and between 33 cm (**field capacity**) and 15 000 cm (**wilting point**) lies the **available water**. The curve's shape is why a **clay** holds more water at every suction than a **sand** but supplies **less** of it to a plant, and why the **hysteresis** between the **wetting** and **drying** curves — the two branches differ by 10–20 per cent in water content at the same suction — is one of the largest unmodelled sources of error in every land-surface scheme.
:::

::: example Green–Ampt infiltration and the time to ponding {#ex-greenampt}
A loam has $K_{\mathrm{s}} = 20\ \mathrm{mm\,h^{-1}}$, a wetting-front suction of $|\psi_{\mathrm{f}}| = 300\ \mathrm{mm}$ and a moisture deficit $\Delta\theta = 0.30$. It receives a constant rainfall of $i = 30\ \mathrm{mm\,h^{-1}}$. Find the time to ponding, the infiltration capacity at a cumulative infiltration of 90 mm, and the runoff that has accumulated after 60 minutes.
::: solution
The **Green–Ampt** infiltration capacity is
$$
f = K_{\mathrm{s}}\left(1 + \frac{|\psi_{\mathrm{f}}|\,\Delta\theta}{F}\right), \qquad |\psi_{\mathrm{f}}|\Delta\theta = 300\times0.30 = 90\ \mathrm{mm},
$$
and ponding begins when $f$ falls to $i$:
$$
t_{\mathrm{p}} = \frac{K_{\mathrm{s}}\,|\psi_{\mathrm{f}}|\,\Delta\theta}{i\,(i - K_{\mathrm{s}})} = \frac{20\times90}{30\times10} = 6\ \mathrm{min}.
$$
At $F = 90\ \mathrm{mm}$ the capacity is $f = 20(1 + 90/90) = 40\ \mathrm{mm\,h^{-1}}$, which **exceeds** the rainfall, so the soil is still **absorbing all** the rain and the infiltration is **rainfall-limited**. Since $f$ stays **above** $i$ for the whole hour, **all** the rain infiltrates: $F = 30\ \mathrm{mm}$ and the runoff is **zero**.

The result is the most counter-intuitive in the chapter and the most important. Ponding at **6 minutes** does **not** mean runoff at 6 minutes: ponding is the moment the **surface** begins to hold water, and runoff begins only when the **ponded depth** exceeds the **surface storage** and the **infiltration capacity** falls below the rainfall. Here the capacity is still 40 mm h⁻¹ when the rain has delivered 30 mm, so the surface merely **puddles**. Runoff would begin when $f$ fell to 30 mm h⁻¹, that is at $F = 180\ \mathrm{mm}$, which at 30 mm h⁻¹ takes **6 hours** — far longer than any storm that delivers 30 mm.

The **model's** assumptions are its weaknesses. The **sharp wetting front** with a uniform moisture behind it is a **fiction**: real profiles show a **diffuse** front, and the fiction is repaired by **calibrating** $|\psi_{\mathrm{f}}|$ to a value far from the measured one. The **uniform** $K_{\mathrm{s}}$ and $\Delta\theta$ are a **greater** fiction: real infiltration is dominated by **macropores** — root channels, earthworm burrows, desiccation cracks — which conduct water at rates **10–1000 times** the matrix and which **stop** the moment the rain arrives, so a **measured** $K_{\mathrm{s}}$ from a **saturated** infiltrometer **overestimates** the storm-time matrix flux and **underestimates** the **first** hour's flux. And the model has **no** representation of **surface sealing**, **crusting**, **vegetation** or **slope**, all of which can halve the infiltration within minutes of a rain's arrival on a **bare** agricultural soil.
:::
:::

::: example The SCS curve number {#ex-cn}
A 40-km² catchment is 60 per cent **wooded** on **hydrologic soil group B** (curve number 61) and 40 per cent **row crop** on the same soil (curve number 75). Find the **area-weighted** curve number, the potential maximum retention, and the runoff from a 100-mm storm on **dry** (antecedent condition II) soil.
::: solution
The weighted curve number is
$$
\overline{\mathrm{CN}} = 0.60\times61 + 0.40\times75 = 36.6 + 30.0 = 66.6 \approx 67,
$$
and the **SCS** potential maximum retention is
$$
S = \frac{25{,}400}{\mathrm{CN}} - 254 = \frac{25{,}400}{67} - 254 = 379 - 254 = 125\ \mathrm{mm}.
$$
With the **initial abstraction** $I_{\mathrm{a}} = 0.2S = 25\ \mathrm{mm}$,
$$
Q = \frac{(P - 0.2S)^{2}}{P + 0.8S} = \frac{(100 - 25)^{2}}{100 + 100} = \frac{5625}{200} = 28.1\ \mathrm{mm},
$$
a runoff coefficient of **28 per cent**.

The method's **success** — it is used in more engineering practice than every other runoff method combined — rests on three properties: it needs **one** parameter, that parameter is **tabulated** for every combination of land use, management and soil, and it is **antecedent-condition** correctable. Its **failures** are equally well known and routinely ignored. The **initial abstraction coefficient of 0.2** was an **assumption** by **Mockus** of the **USDA Soil Conservation Service** in 1957 and is **not** a measurement; measured values range from 0.02 to 0.5, and the runoff from a **small** storm is **entirely** determined by this one number — for $P = 30\ \mathrm{mm}$ the choice between 0.1 and 0.3 changes the runoff from 1.4 mm to **zero**. The **area-weighted** CN is **wrong** because the relation between CN and $Q$ is **convex**: the true catchment runoff is the **average of the two land covers' runoffs**, not the runoff of the average CN, and the difference is 10–30 per cent. And the method is **calibrated** to the **infiltration-excess** world of the **US Midwest** and performs badly in the **wet**, **shallow-soiled**, **saturation-excess** catchments of the humid tropics, western Europe and the Pacific Northwest, where it **underpredicts** the runoff of large storms.

The **urban** application is where the method does most damage. A **CN of 98** for impervious surface gives a runoff coefficient of **94 per cent** for a 100-mm storm, and the **increase** in peak discharge from a **10-per-cent** increase in imperviousness is **larger** than the increase in **volume**, because the impervious area contributes **immediately** while the pervious area contributes **late** — which is why the **post-development** peak of a small urban stream can **double** while its annual volume rises by only 15 per cent, and why the whole of the **low-impact development** philosophy is the **restoration of the timing** rather than the volume.
:::
:::

::: example Horton infiltration fitted to a measured curve {#ex-horton}
A rainfall simulator on a bare silt loam gives an initial infiltration capacity of $120\ \mathrm{mm\,h^{-1}}$ which decays to a steady value of $20\ \mathrm{mm\,h^{-1}}$, and a capacity of $60\ \mathrm{mm\,h^{-1}}$ after 10 minutes. Fit the **Horton** equation and find the cumulative infiltration in the first 30 minutes.
::: solution
With $f(t) = f_{\mathrm{c}} + (f_0 - f_{\mathrm{c}})e^{-kt}$,
$$
60 = 20 + 100\,e^{-k/6} \quad\Longrightarrow\quad e^{-k/6} = 0.40 \quad\Longrightarrow\quad k = 6\times0.916 = 5.5\ \mathrm{h^{-1}},
$$
and the cumulative infiltration is the integral,
$$
F(t) = f_{\mathrm{c}} t + \frac{f_0 - f_{\mathrm{c}}}{k}\left(1 - e^{-kt}\right), \qquad
F(0.5) = 10 + \frac{100}{5.5}\left(1 - e^{-2.75}\right) = 10 + 17.0 = 27\ \mathrm{mm}.
$$
Note that **63 per cent** of the 30-minute total infiltrates in the **first** 10 minutes — the whole of the Horton mechanism in one number.

The **physical content** of the equation is the **decay of the capacity** as the wetting front moves down and the **capillary gradient** that drives the flow is spent, and the **sorptivity** $S = 2(f_0 - f_c)/\sqrt{k}$ is the parameter that connects it to **Philip's** two-term solution $F = S\sqrt{t} + K_{\mathrm{s}}t$. The **empirical success** of the form — it fits almost every measured curve — is out of all proportion to its physical justification, and **Horton** himself presented it as a phenomenological law.

Three of its uses are legitimate and one is not. It is legitimate for **design storms** on **bare** or **compacted** surfaces, for **erosion** modelling where the **early** high-capacity phase determines the **detachment** and the **transport** of sediment, and for **rainfall-simulator** data reduction. It is **not** legitimate as the **runoff** mechanism of a **catchment**, for three reasons: the parameters $f_0$, $f_c$ and $k$ are **not** measurable a priori and are **calibrated** to the storms they are used to simulate, so the model has **no** predictive skill for an unobserved event; the **initial** capacity $f_0$ depends on the **antecedent moisture**, which the equation does not represent, so a **calibrated** $f_0$ is a **seasonal average** masquerading as a parameter; and the equation **cannot** produce the **second** infiltration peak that a **real** profile shows when a **macropore** empties and re-fills, or the **step** that occurs when a **perched** water table forms above a **clay** lens. The modern practice is to use Horton for **plots** and the **curve number** or a **physically based** Richards solver for **catchments**, and to distrust any catchment model whose infiltration parameters were **not** measured but **fitted** — which is most of them.
:::
:::

::: warning The soil you measured is not the soil you are modelling, and neither is the soil you are modelling
Six problems are structural rather than incidental. **The scale problem**: $K_{\mathrm{s}}$ measured on a **100-cm³** core, on a **1-m²** plot, and on a **10-km²** catchment differ by **one to two orders of magnitude**, because the **small** measurement misses the **macropores** and **preferential pathways** that carry most of the flux and the **large** one misses the **dry** matrix that carries most of the **storage** — and every land-surface and hydrological model uses a **grid cell** of 1–50 km whose effective conductivity has never been measured and cannot be. **The method problem**: a **double-ring** infiltrometer **saturates** and **seals** the surface it measures, a **tension** infiltrometer measures a **shallow** layer, a **hydrograph** measures only the **fast** pathways, and a **catchment** **water balance** measures the **average** — and the four disagree by a factor of ten on the same soil. **The hysteresis**: the retention curve on **wetting** lies **below** the curve on **drying** by 10–20 per cent of the water content, so the same soil at the same suction holds different amounts of water depending on its **history**, and every model that uses a **single** curve is systematically wrong after every **wetting** or **drying** event. **The anisotropy**: the **vertical** conductivity of a **stratified** or **compacted** soil is a **harmonic** average dominated by the **least** permeable layer and can be **ten times** smaller than the **horizontal** conductivity, which is a **geometric** average — so the **tillage pan** at 15 cm controls the whole profile's drainage, and a model with an **isotropic** $K$ predicts a **perched** water table that never forms or misses one that always does. **The structure**: a **clay** with $K_{\mathrm{s}} = 0.05\ \mathrm{m\,d^{-1}}$ in the **matrix** drains a **whole storm** through its **cracks** in an **hour**, and the **preferential** flow carries **pesticides**, **faecal coliforms** and **nitrate** to the water table **untouched** by the matrix that the model says filtered them — the reason the **EU Nitrates Directive** and the **drinking-water** protection zones of **chalk**, **karst** and **basalt** aquifers are set by **tracer tests** rather than by the **laboratory** conductivity. **And the measurement**: the **time-domain-reflectometry** and **capacitance** probes that supply the world's soil moisture are **calibrated** to a **specific** soil and **drift**, the **neutron probe** is being retired for **licensing** reasons, the **cosmic-ray** sensors average over a **10-ha** footprint but are **blind** below 40 cm and **biased** by the **lithology**, and the **SMOS** and **SMAP** satellites measure the top **5 cm** at a **30-km** resolution with a root-mean-square error of **0.04 m³ m⁻³** — an error comparable to the **readily available water** of a **0.1-m** surface layer.
:::

::: history
**Darcy** (Darcy) gave the law of flow through sand in 1856 and **Buckingham** (Buckingham) extended it to unsaturated flow in 1907; **Richards** (Richards) wrote the equation that bears his name in 1931, and **Gardner** (Gardner) gave the exponential conductivity function and its analytic solutions in 1958. **Veihmeyer and Hendrickson** (Veihmeyer) defined **field capacity** and the **permanent wilting percentage** at Davis between 1928 and 1931, and **Baver** (Baver) and **Israelson and West** (Israelson) codified the **available water capacity** in the 1930s and 1940s. **Green and Ampt** (Green) published their infiltration equation in 1911, **Horton** (Horton) his capacity-time equation and his **infiltration-excess** theory of overland flow in 1933–1945, **Philip** (Philip) his two-term **sorptivity** solution in 1957, **Mein and Larson** (Mein) the **ponding** solution in 1973, **Morel-Seytoux and Khanji** (Morel-Seytoux) the **control-volume** formulation in 1974, and **Smith and Parlange** (Parlange) the **redistribution** theory in 1978. **Hewlett and Hibbert** (Hewlett) discovered **saturation-excess** overland flow on the **Coweeta** and **Panola** experimental watersheds in 1967, **Dunne and Black** (Dunne) confirmed it on the **Rio Claro** and the **Tarbela** hillslopes in 1970–1973, and **Kirkby** (Kirkby) and **Beven and Kirchner** (Beven) turned it into the **topmodel** and the **variable source area** theory in 1977–1982. **Brooks and Corey** (Brooks) gave their power-form retention curve in 1964, **Mualem** (Mualem) the conductivity model in 1976, and **van Genuchten** (van Genuchten) the pair now used everywhere in 1980. **Mockus** (Mockus) of the **USDA Soil Conservation Service** proposed the **curve number** and its initial-abstraction assumption in 1972, and the **National Engineering Handbook** has revised its tables ever since. **Topp, Davis and Annan** (Topp) invented **time-domain reflectometry** for soil moisture in 1980, **Zreda and the New Mexico group** (Zreda) the **cosmic-ray neutron** method in 2008, **Njoku and the JPL school** (Njoku) the **microwave** retrieval, and **Entekhabi and the SMAP mission** (Entekhabi) the **L-band** radar-radiometer observatory launched in 2015.
:::
## Where this leads

The soil's texture and structure are the subject of [[geomorphology/soils]] and its weathering in [[geomorphology/weathering]], the water balance that this chapter's storage term belongs to in [[hydrology/water-balance]] and the evapotranspiration that drains it in [[hydrology/precipitation-evaporation]], the snowmelt that arrives in spring in [[hydrology/snow]], the runoff that the excess becomes in [[hydrology/runoff]], the antecedent wetness that sets the flood in [[hydrology/floods-droughts]], the deep percolation that recharges the aquifer in [[hydrology/groundwater-flow]] and [[hydrology/aquifers-wells]], the solutes the percolate carries in [[hydrology/contaminant-transport]], the hillslope hydrology that shapes the landform in [[geomorphology/hillslopes]], the soil carbon and the vegetation in [[biogeochemistry/soils-wetlands]], and the groundwater resource in [[earth-resources/groundwater-resources]].

::: quiz
A storm delivers 20 mm h⁻¹ to a soil whose saturated conductivity is 45 mm h⁻¹ and whose water table is at 0.2 m. Which runoff mechanism operates?
- [ ] Horton infiltration-excess overland flow.
- [x] Saturation-excess overland flow from the near-channel zone.
- [ ] No runoff at all.
- [ ] Subsurface pipe flow only.
::: solution
The rainfall is well below the saturated conductivity, so the surface cannot pond and Horton overland flow cannot occur. But the water table is within 0.2 m of the surface, so the rain need only raise it a little to saturate the lowest ground — the **near-channel** and **hollow** zones — and every drop that falls there runs off. The contributing area **grows with the wetness**, which is the signature of the saturation-excess mechanism.
:::
:::

::: summary
- The retention curve and the conductivity curve are the two functions that govern everything in the unsaturated zone, and the second falls by three to five orders of magnitude between saturation and field capacity.
- Available water capacity is a subtraction, and the resulting 100–200 mm of reserve is what decides the length of a dry spell a crop can survive.
- Richards' equation is Darcy's law with a conductivity that depends on the water content; the capillary gradient can exceed gravity, so water moves upward over metres.
- Infiltration-excess and saturation-excess runoff are physically opposite and dominate in opposite climates; the second explains the non-linearity of the runoff coefficient.
- Ponding is not runoff: the Green–Ampt capacity can exceed the rainfall long after the surface has begun to hold water.
- The curve number is the most used and most misused runoff method in the world, and its initial-abstraction coefficient of 0.2 is an assumption, not a measurement.
- Soil moisture is the least measured state variable in hydrology; the scale problem in $K_{\mathrm{s}}$ is structural, not incidental.
:::

## Exercises

::: exercise Available water {level=1 check="120"}
A sandy loam has $\theta_{\mathrm{FC}} = 0.19$ and $\theta_{\mathrm{PWP}} = 0.07$. Find the available water capacity in mm per metre of root zone.
::: solution
$\theta_{\mathrm{A}} = 0.12\ \mathrm{m^{3}\,m^{-3}} = 120\ \mathrm{mm\,m^{-1}}$. A **sandy loam** holds two-thirds of what a **silt loam** holds, and a **clay** may hold 200 mm m⁻¹ while supplying the plant no better, because a third of its store is held below the wilting point's suction.
:::
:::

::: exercise Darcy flux in the unsaturated zone {level=1 check="0.5"}
A soil has $K = 0.5\ \mathrm{m\,d^{-1}}$ at its current water content, and the **total hydraulic head** $h = \psi + z$ falls by $1.0\ \mathrm{m}$ for every metre of **upward** distance. Find the specific discharge and its direction.
::: solution
With $z$ positive upward, Darcy's law is $q = -K\,\mathrm{d}h/\mathrm{d}z = -0.5\times(-1.0) = 0.5\ \mathrm{m\,d^{-1}}$, directed **upward**. The example is the reason a **shallow** water table in a **hot, dry** climate supplies a **capillary** evaporation of several mm per day and **salinises** the soil — the process behind the **dryland salinity** of southern Australia and the **Indo-Gangetic** plain.
:::
:::

::: exercise Field capacity and drainage {level=1 check="33"}
At what matric suction is field capacity conventionally defined for a medium-textured soil, and why is the value a convention rather than a physical constant?
::: solution
**33 hPa** (0.33 bar, $-3.3\ \mathrm{m}$ of water). It is a convention because field capacity is a **transient** drainage state, not an equilibrium: it depends on the **depth to the water table**, the **duration** of the drainage (2 to 5 days), the **initial** wetness and the **evaporative** demand, and in a **coarse** soil the correct value is nearer **10 hPa** and in a **clay** nearer **50 hPa**. The convention survives because it is **measurable** and **reproducible**, not because it is **physical**.
:::
:::

::: exercise Green–Ampt {level=2 check="3.6"}
A sandy clay loam has $K_{\mathrm{s}} = 25\ \mathrm{mm\,h^{-1}}$, $|\psi_{\mathrm{f}}| = 250\ \mathrm{mm}$ and $\Delta\theta = 0.35$. It receives $40\ \mathrm{mm\,h^{-1}}$. Find the time to ponding.
::: solution
$t_{\mathrm{p}} = K_{\mathrm{s}}|\psi_{\mathrm{f}}|\Delta\theta/[i(i-K_{\mathrm{s}})] = 25\times87.5/[40\times15] = 2188/600 = 3.6\ \mathrm{min}$. Ponding in under four minutes is the reason a **bare** agricultural soil in a **convective** storm produces runoff in **every** storm, and why **cover crops** and **no-till**, which raise $K_{\mathrm{s}}$ and $|\psi_{\mathrm{f}}|\Delta\theta$ together, are the most effective runoff- and erosion-control practice available.
:::
:::

::: exercise Curve number {level=2 check="61"}
Find the runoff from a 100-mm storm on a catchment with a curve number of 85.
::: solution
$S = 25{,}400/85 - 254 = 298.8 - 254 = 44.8\ \mathrm{mm}$, and
$Q = (100 - 8.96)^{2}/(100 + 35.8) = 8288/135.8 = 61\ \mathrm{mm}$, a runoff coefficient of **61 per cent**. A CN of 85 is **pasture on group C/D soil** or **row crop on group D**, and the same storm on a CN of 61 gives 20 mm — the **threefold** difference that a single land-use decision makes.
:::
:::

::: exercise The runoff coefficient's non-linearity {level=2 check="0.29"}
A catchment produces 3 mm of runoff from a 25-mm storm and 29 mm from a 100-mm storm. Find the two runoff coefficients and explain what the increase says about the mechanism.
::: solution
$0.12$ and $0.29$. A runoff coefficient that **rises** with storm size is the signature of a **growing contributing area** — the **saturation-excess** or **variable-source-area** mechanism — because the **wet** area near the channel expands as the storm proceeds. A **Horton** mechanism with a **dry** initial soil gives a coefficient that **rises** only until the surface seals and then **falls**, and a **Horton** mechanism with a **wet** initial soil gives a nearly **constant** coefficient. The diagnostic is not decisive on its own, but combined with the **spatial pattern** of the runoff it is the standard field evidence.
:::
:::

::: exercise The unsaturated conductivity's fall {level=3 check="992"}
A soil's conductivity follows $K = K_{\mathrm{s}}e^{-\alpha|\psi|}$ with $\alpha = 0.03\ \mathrm{cm^{-1}}$. Find the ratio $K_{\mathrm{s}}/K$ at a suction of 230 cm.
::: solution
 $K_{\mathrm{s}}/K = e^{0.03\times230} = e^{6.9} = 992$. A **three-order-of-magnitude** drop between saturation and a modest suction is the reason the **same** soil profile behaves as a **conduit** in winter and a **reservoir** in summer, and the reason a **numerical** solution of Richards' equation must use a **fully implicit** scheme with a **small** time step — the **explicit** scheme is unstable when $K$ changes by a factor of a thousand in one iteration, which is the first thing every student of soil-physics modelling learns by watching their code diverge.
:::
:::

::: exercise The scale problem {level=3 check="10"}
A soil's matrix saturated conductivity is $0.05\ \mathrm{m\,d^{-1}}$ and 0.1 per cent of its pores are **macropores** of radius 0.5 mm. Estimate the ratio of the macropore to the matrix conductivity using the **Hagen–Poiseuille** scaling $K \propto r^{2}$, and state the consequence for a pesticide's arrival at the water table.
::: solution
The **Hagen–Poiseuille** relation gives a conductivity proportional to the **square** of the pore radius. A matrix pore of $5\ \mu\mathrm{m}$ against a macropore of $500\ \mu\mathrm{m}$ gives a ratio of
$$
\left(\frac{500}{5}\right)^{2} = 10^{4}
$$
per unit of cross-sectional area, and with the macropores occupying 0.1 per cent of the area the **bulk** conductivity is raised by a factor of $10^{4}\times10^{-3} = 10$ — so the bulk conductivity is $0.5\ \mathrm{m\,d^{-1}}$, **ten times** the matrix value, while **99.9 per cent** of the pore space through which it travels is **retarding** matrix.

The consequence for a **pesticide** or a **faecal coliform** is decisive. The **retardation factor** of a sorbing pesticide in the matrix may be 5–50, so the matrix delivers it **weeks** later and **attenuated**, while the macropores deliver a **pulse** at the **full** concentration within **hours** of the rain. The **breakthrough curve** is therefore **bimodal** — an early, sharp, high-concentration peak from the macropores and a late, broad, low one from the matrix — and a **model** that uses the **bulk** conductivity and the **bulk** retardation factor predicts **neither** peak correctly: it predicts a **single** arrival at an **intermediate** time and an **intermediate** concentration, which is the **worst** possible answer for a **drinking-water** risk assessment.

This is why the **vulnerability mapping** of aquifers — the **DRASTIC** method and its successors, the **EU** **nitrate vulnerable zones** and the **source protection areas** of chalk, karst and fractured-bedrock wells — is set by **tracer tests** with **brilliant blue**, **sulforhodamine** and **salt**, which measure the **fast** pathways directly, and why a **laboratory** measurement of $K$ on a **core** is, for this purpose, worse than useless: it measures the **slow** 99.9 per cent and reports it as the soil.
:::
:::
