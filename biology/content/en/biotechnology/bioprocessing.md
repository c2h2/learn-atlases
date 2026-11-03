A culture that works in a 10 mL tube must eventually work in a vessel of 100 m³ — a factor of ten million in volume. Almost nothing about the cells changes; almost everything about their surroundings does. In the tube, oxygen reaches every cell, the medium is uniform, the heat generated escapes through the walls without effort and the contents are mixed in a fraction of a second. In the vessel, oxygen must be forced in against its own poor solubility, the contents take tens of seconds to mix so that cells travel repeatedly through regions of different composition, the metabolic heat would raise the temperature by several degrees an hour if it were not removed, and a single contaminating spore can ruin a week's work.

Bioprocess engineering is the discipline that handles these facts. It is the most quantitative part of biotechnology and the part a biologist is least likely to have met, and it is where a project succeeds or fails commercially: the strain decides what is possible, the process decides what it costs. This chapter covers the modes of operation and their kinetics, oxygen transfer and heat removal as the dominant physical constraints, what happens to mixing and uniformity on scale-up, sterility, and the arithmetic of downstream recovery. Growth kinetics are assumed from [[microbiology/microbial-growth]] and the biology of the strain from [[biotechnology/protein-production]] and [[biotechnology/metabolic-engineering]].

## Modes of operation

::: definition Batch, fed-batch and continuous culture {#def-modes}
In **batch** culture, all the medium is supplied at the start and nothing is added or removed; the culture passes through lag, exponential, deceleration and stationary phases as the substrate is consumed.

In **fed-batch**, substrate is fed during the run and the volume increases, but nothing is removed until harvest. Feeding is the central technique of industrial fermentation, for three reasons: it keeps the substrate concentration low, which avoids **overflow metabolism** (the excretion of acetate by *E. coli* or of ethanol by *S. cerevisiae* when sugar is abundant) and substrate inhibition; it allows the growth rate to be set by the feed rather than by the organism, so that oxygen demand can be matched to the vessel's capacity; and it permits very high cell densities, since the substrate that would be toxic in one dose is delivered over many hours.

In **continuous** culture, fresh medium is added and culture removed at the same rate, so the volume is constant and the system can reach a genuine steady state. The **dilution rate** is $D = F/V$, with $F$ the flow rate and $V$ the volume; its units are reciprocal time.
:::

::: proposition The chemostat {#prop-chemostat}
Let a well-mixed continuous culture of volume $V$ be fed medium containing substrate at concentration $S_0$ at dilution rate $D$, and let growth follow the Monod relation $\mu = \mu_\mathrm{max}S/(K_S+S)$ with yield $Y_{X/S}$ constant. Mass balances on biomass and substrate give

$$
\frac{\mathrm{d}X}{\mathrm{d}t} = (\mu - D)X , \qquad \frac{\mathrm{d}S}{\mathrm{d}t} = D(S_0 - S) - \frac{\mu X}{Y_{X/S}} .
$$ {#eq-chemostat-ode}

At a non-trivial steady state the first equation requires

$$
\mu = D ,
$$ {#eq-mu-equals-d}

which is the central and initially surprising result: **the experimenter sets the growth rate** by choosing the flow rate, and the cells adjust their substrate concentration until their growth rate matches it. Substituting into the Monod relation and the substrate balance,

$$
S = \frac{K_S D}{\mu_\mathrm{max} - D} , \qquad X = Y_{X/S}\left(S_0 - S\right) .
$$ {#eq-chemostat-ss}

As $D$ rises, $S$ rises and $X$ falls. **Washout** occurs when $S$ reaches $S_0$, that is at

$$
D_\mathrm{crit} = \frac{\mu_\mathrm{max}S_0}{K_S+S_0} ,
$$ {#eq-washout}

slightly below $\mu_\mathrm{max}$. The **biomass productivity** $DX$ is zero at both ends and maximal at

$$
D_\mathrm{opt} = \mu_\mathrm{max}\left(1 - \sqrt{\frac{K_S}{K_S+S_0}}\right) .
$$ {#eq-dopt}

The derivation assumes perfect mixing, constant yield, no maintenance requirement, no cell death and no wall growth; all four assumptions fail to some degree, and the last — cells adhering to surfaces and escaping dilution — is the usual reason a real chemostat drifts.
:::

::: example A chemostat in numbers {#ex-chemostat}
Take $\mu_\mathrm{max} = 0.60$ h⁻¹, $K_S = 0.50$ g L⁻¹, $Y_{X/S} = 0.50$ g g⁻¹ and $S_0 = 20$ g L⁻¹. (a) Find $S$, $X$ and $DX$ at $D = 0.10$ and $0.50$ h⁻¹. (b) Find the washout dilution rate. (c) Find the productivity-maximising dilution rate and the productivity there. (d) Why is a chemostat rarely used for production despite (c)?
::: solution
(a) At $D = 0.10$: $S = 0.5\times0.10/(0.60-0.10) = 0.10$ g L⁻¹ and $X = 0.5(20-0.1) = 9.95$ g L⁻¹, so $DX = 0.995$ g L⁻¹ h⁻¹. At $D = 0.50$: $S = 0.5\times0.5/0.1 = 2.50$ g L⁻¹, $X = 0.5(20-2.5) = 8.75$ g L⁻¹ and $DX = 4.38$ g L⁻¹ h⁻¹. Note that at the higher dilution rate an eighth of the feed sugar leaves unused — the price of running fast.

(b) $D_\mathrm{crit} = 0.60\times20/20.5 = 0.585$ h⁻¹.

(c) $D_\mathrm{opt} = 0.60\,(1-\sqrt{0.5/20.5}) = 0.60(1-0.1562) = 0.506$ h⁻¹, where $S = 2.69$, $X = 8.65$ and $DX = 4.38$ g L⁻¹ h⁻¹. The optimum is flat — $D = 0.50$ gives essentially the same productivity — and uncomfortably close to washout, so a small disturbance in flow or in $\mu_\mathrm{max}$ loses the culture.

(d) For four reasons. Operating near $D_\mathrm{opt}$ is close to washout and so fragile. Over hundreds of generations the chemostat selects relentlessly for faster growth, which means for cells that have discarded the production construct ([[biotechnology/synthetic-biology]]). Sterility must be maintained over weeks rather than days, across pumps and lines as well as the vessel. And many products are made best at low growth rate or in a separate production phase, which a single-stage chemostat cannot provide. Continuous operation is nevertheless standard where the product *is* the growth (baker's yeast, single-cell protein, waste treatment) and is increasingly used in perfusion culture of animal cells, where the cells are retained and only the medium is exchanged.
:::
:::

::: widget plot
f: 0.5*x/(0.6 - x); 0.5*(20 - 0.5*x/(0.6 - x)); 0.5*(20 - 0.5*x/(0.6 - x))*x
x: 0.01, 0.585
y: 0, 12
labels: S\ (\mathrm{g\,L^{-1}}); X\ (\mathrm{g\,L^{-1}}); DX\ (\mathrm{g\,L^{-1}h^{-1}})
caption: Chemostat steady states from [[#eq-chemostat-ss]] against dilution rate $D$ (h⁻¹), for the parameters of [[#ex-chemostat]]. Residual substrate stays near zero over most of the range and then rises almost vertically as $D$ approaches washout at 0.585 h⁻¹, while biomass mirrors it. Productivity $DX$ rises almost linearly, peaks at $D = 0.51$ h⁻¹ and collapses within a few hundredths of an hour⁻¹ of the peak — the cliff edge that makes operating at the optimum unattractive. Hover to read values near the peak.
:::

**Fed-batch feeding.** To hold a chosen specific growth rate $\mu$ in fed-batch, the feed must deliver substrate at the rate the growing biomass consumes it. Since biomass grows as $X V = X_0V_0e^{\mu t}$ and consumption is $\mu XV/Y_{X/S}$, the required volumetric feed rate of a solution of concentration $S_F$ is

$$
F(t) = \frac{\mu\,X_0V_0}{Y_{X/S}\,S_F}\,e^{\mu t} ,
$$ {#eq-exp-feed}

an exponentially increasing feed. In practice $\mu$ is chosen not by what the cells could manage but by what the vessel can supply: the feed rate is set so that oxygen demand stays within the transfer capacity derived below, which is why industrial fed-batch processes commonly run at a quarter or a tenth of $\mu_\mathrm{max}$.

## Oxygen: the binding constraint

Oxygen is almost insoluble in water, and aerobic cultures consume it fast. This single fact shapes bioreactor design more than any other.

::: proposition Oxygen transfer and the maximum cell density {#prop-otr}
The rate at which oxygen enters the liquid, per unit volume, is

$$
\mathrm{OTR} = k_La\,\left(C^{*} - C_L\right) ,
$$ {#eq-otr}

where $C^{*}$ is the dissolved oxygen concentration in equilibrium with the gas phase, $C_L$ the actual concentration, and $k_La$ the **volumetric mass transfer coefficient** (units h⁻¹), a product of a film coefficient and the gas–liquid interfacial area per unit volume. The uptake rate is $\mathrm{OUR} = q_{O_2}X$ with $q_{O_2}$ the specific oxygen consumption rate.

Because dissolved oxygen cannot accumulate, at steady state $\mathrm{OTR} = \mathrm{OUR}$, and since $C_L \ge 0$ the maximum biomass the vessel can support is

$$
X_\mathrm{max} = \frac{k_La\,C^{*}}{q_{O_2}} .
$$ {#eq-xmax}

The numbers are sobering. Water in equilibrium with air at 37 °C holds about 0.21 mmol L⁻¹ of oxygen — roughly 7 mg L⁻¹, which a vigorously respiring culture would consume in a few seconds if transfer stopped. Typical specific rates are 5–15 mmol g⁻¹ h⁻¹ for bacteria and 0.1–0.5 for animal cells. Stirred vessels achieve $k_La$ of 100–800 h⁻¹, with the upper end requiring high power input.

$k_La$ can be raised, but only against increasing cost, because it depends on the energy dissipated in the liquid and on the gas throughput, empirically as

$$
k_La \propto \left(\frac{P}{V}\right)^{\alpha} v_g^{\beta}, \qquad \alpha \approx 0.4\text{–}0.7,\ \beta \approx 0.3\text{–}0.7 ,
$$ {#eq-kla-correlation}

with exponents that depend on the vessel, the impeller and the medium. The sub-linear exponent is the problem: doubling $k_La$ through agitation alone needs roughly a three- to five-fold increase in power. Oxygen-enriched air or elevated pressure raise $C^{*}$ instead and are used where agitation has reached its limit, bearing in mind that shear damages animal cells and filamentous organisms long before it troubles bacteria.
:::

::: widget plot
f: x*0.21/10; x*0.21/5; x*0.21/0.3
x: 0, 800
y: 0, 60
labels: q_{O_2} = 10\ \mathrm{mmol\,g^{-1}h^{-1}}; q_{O_2} = 5; q_{O_2} = 0.3
caption: The maximum cell concentration a vessel can support, $X_\mathrm{max} = k_La\,C^{*}/q_{O_2}$ from [[#eq-xmax]], against the transfer coefficient $k_La$ (h⁻¹), taking $C^{*} = 0.21$ mmol L⁻¹. Each line is a different specific oxygen demand: a vigorously respiring bacterium, a less demanding one, and an animal cell. The third line leaves the plot almost immediately, which is the point — animal cells consume oxygen so slowly per gram that oxygen transfer is rarely their limit, while a bacterial culture at 10 mmol g⁻¹ h⁻¹ needs $k_La$ near 500 h⁻¹ to reach 10 g L⁻¹ and is oxygen-limited above it whatever the medium contains.
:::

::: example What the vessel can and cannot support {#ex-oxygen}
A bacterial culture has $q_{O_2} = 10$ mmol g⁻¹ h⁻¹ at full growth rate, and the vessel achieves $k_La = 500$ h⁻¹ with $C^{*} = 0.21$ mmol L⁻¹. (a) What biomass can it support? (b) The process must reach 40 g L⁻¹. Give three ways to achieve it and their costs. (c) Which is normally chosen, and what does it imply for the run time?
::: solution
(a) $X_\mathrm{max} = 500\times0.21/10 = 10.5$ g L⁻¹.

(b) Raise $k_La$ to 1900 h⁻¹ — by [[#eq-kla-correlation]] with $\alpha = 0.5$ that needs about $(1900/500)^{2} = 14$ times the power input, which is unattainable in a large vessel and would in any case generate more heat and shear. Raise $C^{*}$ by enriching the gas with oxygen (a four-fold increase in $C^{*}$ is available by going to pure oxygen, giving 42 g L⁻¹) or by raising the head pressure, both of which cost money but are routinely done. Or reduce $q_{O_2}$ by slowing the cells: feeding substrate at a controlled rate holds the specific growth rate low, and since oxygen demand is roughly proportional to growth rate, running at a quarter of $\mu_\mathrm{max}$ cuts $q_{O_2}$ about four-fold and raises the supportable density to about 40 g L⁻¹.

(c) The third, usually in combination with some oxygen enrichment: this is exactly why industrial processes are fed-batch at low growth rate. The implication is time. At $\mu = 0.15$ h⁻¹ rather than 0.6, reaching 40 g L⁻¹ from an inoculum of 0.5 g L⁻¹ takes $\ln(80)/0.15 = 29$ h of feeding instead of 7 h — and the whole process economics of [[#ex-recovery]] follows from accepting that trade.
:::
:::

::: example Heat removal {#ex-heat}
Aerobic metabolism releases about 460 kJ per mole of oxygen consumed (the oxycalorific equivalent, nearly independent of substrate). For the 10 g L⁻¹ culture of [[#ex-oxygen]] at $q_{O_2} = 10$ mmol g⁻¹ h⁻¹: (a) what is the heat generation per unit volume? (b) By how much would an unstirred, uncooled 100 m³ vessel heat up per hour? (c) Compare with the heat from agitation at 2 kW m⁻³. (d) Why is this harder in a large vessel than a small one?
::: solution
(a) OUR $= 10\times10 = 100$ mmol L⁻¹ h⁻¹ $= 0.10$ mol L⁻¹ h⁻¹, so the heat rate is $0.10\times460 = 46$ kJ L⁻¹ h⁻¹, which is $12.8$ kW m⁻³.

(b) With the heat capacity of water, $4.18$ kJ L⁻¹ K⁻¹: $46/4.18 = 11$ K per hour. A fermentation left uncooled for an hour would be ruined.

(c) Agitation contributes 2 kW m⁻³ against metabolism's 12.8 — about one sixth. Both must be removed, and in a highly aerobic process metabolic heat dominates. (In animal cell culture, where $q_{O_2}$ is tens of times lower, the proportions reverse and agitation and lighting can be the larger terms.)

(d) Because cooling is through a surface and generation is through a volume. Scaling a geometrically similar vessel up by a linear factor $L$ multiplies the heat generated by $L^{3}$ and the jacket area by only $L^{2}$, so the heat flux per unit area rises as $L$ and the available temperature difference does not. A 2 L vessel loses heat through its walls almost incidentally; a 100 m³ vessel needs internal cooling coils or an external heat exchanger, and in large aerobic plants the cooling capacity, not the oxygen transfer, sometimes sets the maximum cell density.
:::
:::

## Mixing, scale-up and gradients

A laboratory vessel mixes in about a second; a 100 m³ vessel takes 20–60 s. The consequence is that a cell circulating through a large fermenter does not experience the average condition but a succession of very different ones: high substrate near the feed point, oxygen-rich near the sparger, oxygen-depleted and CO₂-rich in the unaerated upper regions, and high pH near the base addition point. For an organism whose regulation responds in seconds, this matters.

::: definition Power input, Reynolds number and geometric similarity {#def-scaleup}
The power drawn by an impeller in a turbulent stirred tank is

$$
P = N_p\,\rho\,N^{3}D_i^{5} ,
$$ {#eq-power}

with $N_p$ the dimensionless power number (about 5 for a Rushton turbine in the turbulent regime), $\rho$ the liquid density, $N$ the rotational speed (s⁻¹) and $D_i$ the impeller diameter. The flow regime is characterised by the impeller Reynolds number $\mathrm{Re} = \rho N D_i^{2}/\eta$, which exceeds $10^{4}$ — fully turbulent — in all but the smallest vessels.

**Geometric similarity** keeps all length ratios constant on scale-up. The difficulty is then unavoidable: the quantities one would like to keep constant scale differently. With $D_i \propto L$ and the volume as $L^{3}$:

- constant power per volume $P/V \propto N^{3}D_i^{2}$ requires $N \propto L^{-2/3}$;
- constant impeller tip speed $\pi N D_i$ requires $N \propto L^{-1}$;
- constant Reynolds number requires $N \propto L^{-2}$;
- constant mixing time requires $N$ constant.

No single choice satisfies more than one. Scale-up is therefore the art of deciding which quantity the biology cares about most — usually $k_La$ for an aerobic bacterium, tip speed (shear) for animal cells and mycelia, mixing time for a fast-responding regulated process — and accepting that the others will change.
:::

::: example Sizing the agitator {#ex-power}
A 100 m³ working volume with height twice the diameter, an impeller one third of the tank diameter, and a power input of 2 kW m⁻³. (a) Find the tank and impeller dimensions. (b) Find the rotational speed and the tip speed, taking $N_p = 5$ and $\rho = 1000$ kg m⁻³. (c) Comment on the Reynolds number and on what would change at the 2 L scale.
::: solution
(a) With $H = 2D$, $V = \pi D^{2}H/4 = \pi D^{3}/2$, so $D = (2\times100/\pi)^{1/3} = 3.99$ m, $H = 7.99$ m, and $D_i = 1.33$ m.

(b) Total power is $2\times100 = 200$ kW, so from [[#eq-power]], $N^{3} = P/(N_p\rho D_i^{5}) = 2\times10^{5}/(5\times1000\times4.16) = 9.6$, giving $N = 2.12$ s⁻¹ (127 rpm) and a tip speed of $\pi N D_i = 8.9$ m s⁻¹. That is at the high end of practice and would be unacceptable for animal cells or a filamentous fungus, both of which are damaged by shear at a few metres per second.

(c) $\mathrm{Re} = 1000\times2.12\times1.33^{2}/10^{-3} \approx 4\times10^{6}$: fully turbulent, as assumed. At 2 L with the same geometry, $D_i \approx 0.036$ m and the same 2 kW m⁻³ requires $N \approx 11$ s⁻¹ — five times the rotational speed but a tip speed of only 1.2 m s⁻¹, seven times lower. So the small vessel has the same power density and a far gentler maximum shear, and a culture that survives the laboratory may be damaged at scale even though "nothing was changed".
:::
:::

::: warning Scale-up is not "the same conditions in a bigger vessel"
The commonest failure in process development is to assume that holding temperature, pH, dissolved oxygen set-point and medium composition constant reproduces the laboratory result. The variables that change without being changed are: the mixing time (seconds instead of sub-second, so cells experience fluctuating concentrations); the maximum shear at the impeller tip; the hydrostatic pressure and therefore the dissolved CO₂ at the base of a tall vessel, which can fall outside the range the cells tolerate; the time the culture spends in the inoculum train, and so the number of generations over which a construct can be lost ([[biotechnology/synthetic-biology]]); the time taken to add base, feed or inducer relative to the response time of the cells; and the heat flux per unit of cooling surface. The modern response is **scale-down**: reproduce the *gradients* of the large vessel in the laboratory — a two-compartment vessel in which cells circulate between a well-fed and a starved zone, or a stirred vessel with oscillating feed — and test the strain's tolerance of them before building anything.
:::

## Sterility

Most bioprocesses are monocultures, and a contaminant that grows faster than the production strain will win. Sterilisation is therefore quantitative rather than absolute.

::: proposition Thermal death and sterility assurance {#prop-sterilisation}
At a given temperature, the death of a microbial population is approximately first order, so the surviving number falls as

$$
N(t) = N_0\,10^{-t/D_T} ,
$$ {#eq-death}

where $D_T$ — the **decimal reduction time** — is the time at temperature $T$ to reduce the population ten-fold. For bacterial spores, the most heat-resistant contaminants, $D_{121} \approx 0.5$–1 min. The temperature dependence is expressed through the $z$-value, the temperature rise that reduces $D_T$ ten-fold, typically about 10 K for spores; equivalently, death follows an Arrhenius law with a high activation energy.

Because the relation is logarithmic, "sterile" means a chosen probability of failure. A target of one failed batch in a thousand, starting from $N_0$ organisms in the whole vessel, requires $\log_{10}(N_0/10^{-3}) = \log_{10}N_0 + 3$ decimal reductions. The steep temperature dependence also explains why **continuous sterilisation** at 140 °C for seconds is preferred to batch sterilisation at 121 °C for an hour in large plants: the spores' destruction has a much higher activation energy than the degradation of vitamins and sugars, so a hotter, briefer treatment kills as effectively while damaging the medium less.
:::

::: example Sterilising a fermenter {#ex-sterilisation}
A 10 m³ batch of medium carries $10^{6}$ spores per litre. Take $D_{121} = 1.0$ min. (a) How long at 121 °C for a one-in-a-thousand chance of a surviving spore? (b) What does the answer become if the medium is ten times cleaner? (c) The vessel has 50 m of pipework, valves, a sterile filter on the air inlet and two probes. Comment.
::: solution
(a) The total load is $10^{6}\times10^{4} = 10^{10}$ spores. Required reductions: $\log_{10}(10^{10}/10^{-3}) = 13$, so $t = 13\times1.0 = 13$ min at temperature — not counting heating and cooling, during which further killing occurs and must be credited to the total.

(b) $\log_{10}(10^{9}/10^{-3}) = 12$, so 12 min. One decimal reduction less: the time depends on the logarithm of the load, so a tenfold cleaner medium saves one $D$-value. This is why the economic lever is not longer sterilisation but cleaner raw materials and a hotter, shorter treatment.

(c) The vessel is the easy part. Contamination in practice enters through the things that cannot simply be held at 121 °C for 13 min: pipework dead legs where steam does not reach, valve seats and seals, the integrity of the inlet air filter, the probe housings, and every addition of feed, base or inducer made during a run lasting days. Sterility assurance is therefore a property of the whole system and its procedures, which is a large part of why single-use (pre-sterilised, disposable) bioreactors took over animal-cell manufacture at scales up to a few thousand litres: they move the sterility problem to the supplier and eliminate cleaning validation entirely.
:::
:::

## Downstream processing

Recovery and purification turn a dilute aqueous suspension into a product. The sequence is conventionally divided into **removal of insolubles** (centrifugation, filtration, or — for intracellular product — cell disruption first), **isolation** (concentration and removal of water, by precipitation, extraction, ultrafiltration or adsorption), **purification** (chromatography, in the modes described in [[biotechnology/protein-production]]) and **polishing** (final removal of trace impurities, buffer exchange, sterile filtration, drying or formulation).

Two principles govern the design. First, **remove the largest quantity of the wrong thing first**: an early step should cheaply discard most of the mass, leaving expensive high-resolution steps to operate on a small volume. Second, step yields multiply.

::: example The arithmetic of a recovery train {#ex-recovery}
A secreted product is recovered by centrifugation (97 %), ultrafiltration (92 %), capture chromatography (88 %), a viral-clearance filtration (95 %), a polishing chromatography (85 %) and formulation (98 %). (a) What is the overall recovery? (b) Each step also concentrates or purifies; why is the yield still the number that matters most? (c) How much more product reaches the vial if the capture step is improved from 88 % to 95 %? (d) A proposal replaces two chromatography steps with one at 80 % yield and the same final purity. Evaluate it.
::: solution
(a) $0.97\times0.92\times0.88\times0.95\times0.85\times0.98 = 0.62$, about **62 %**. Six respectable steps have discarded more than a third of the product.

(b) Because yield compounds and purity does not: an impurity removed twice is no cleaner than needed, but product lost at step 3 can never be recovered at step 4. Beyond that, lost product is lost after all the cost of making it — the upstream cost per kilogram of *delivered* product is the fermentation cost divided by the overall recovery, so 62 % recovery means every kilogram shipped required 1.6 kg made.

(c) The overall recovery becomes $0.62\times(0.95/0.88) = 0.67$. Seven points on one step gives five points overall, an 8 % relative increase in output from the same fermentation — which for a product selling at hundreds of dollars a gram is a large sum for a modest piece of development work.

(d) Compare on overall yield: the two steps contribute $0.88\times0.85 = 0.75$, and the single step gives 0.80, so the proposal *raises* recovery to $0.62\times(0.80/0.75) = 0.66$ while removing a whole unit operation — less equipment, less time, less buffer, lower capital charge. It should be pursued, subject to the things the yield figure omits: whether the single step really achieves the same impurity profile (including aggregates and host-cell protein, which need separate assays), whether it is robust across the variation of real feed streams, and whether removing a step removes an orthogonal mechanism of clearing viruses or other contaminants, which for a product destined for people is a question about assurance rather than about purity.
:::
:::

::: quiz
A fed-batch *E. coli* process is oxygen-limited: dissolved oxygen sits at zero, acetate is accumulating and growth has slowed. The vessel is already at maximum agitation. Which action addresses the cause?
- [ ] Increase the glucose feed rate to restore the growth rate.
- [x] Reduce the glucose feed rate.
- [ ] Add more medium to dilute the acetate.
- [ ] Raise the temperature to speed metabolism.
::: solution
Oxygen demand is set by how fast the cells are consuming substrate, so when transfer capacity is exhausted the only remaining variable on the demand side is the feed. Reducing it lowers the specific growth rate and hence $q_{O_2}X$, letting dissolved oxygen recover; the acetate accumulation, which is overflow metabolism caused by carbon arriving faster than it can be oxidised, stops for the same reason. Increasing the feed makes every symptom worse. Dilution would reduce the biomass concentration and so the volumetric demand, but it also dilutes the product and wastes vessel volume, and it does not address why the culture became oxygen-limited. Raising the temperature increases $q_{O_2}$ and *lowers* $C^{*}$ — the worst of the four.
:::
:::

::: application Where the money goes
For a bulk product — fuel ethanol, citric acid, an amino acid for animal feed — raw material is typically half or more of the cash cost, so yield dominates and a one-point gain in yield is worth more than a large gain in productivity. For a high-value biologic, the proportions invert: the fermentation or cell culture may be a minor fraction of the cost of goods, while recovery, analytical testing, quality systems and the capital charge on a facility that must be qualified and validated dominate. This is why the industrial response to rising titres in animal cell culture was not to build bigger vessels but smaller ones: when titres rose from 0.5 to 5 g L⁻¹ over two decades, the same annual output needed a tenth of the volume, and 2000 L single-use systems replaced 20,000 L stainless steel ones, with large savings in capital and in changeover time. A process engineer's most valuable skill is knowing which term in the cost equation is large before optimising anything.
:::

::: history
Bioprocess engineering was created by the penicillin programme of 1941–1945. Penicillin was first made in surface culture in bottles; the wartime demand forced the development of submerged aerated culture in stirred tanks, with the associated problems of sterile operation at scale, oxygen transfer, foam control and strain improvement all solved within a few years by a collaboration of government laboratories, universities and companies in the United States and Britain. Titres rose by orders of magnitude, and in the process the discipline acquired its characteristic methods. Jacques Monod's relation between growth rate and substrate concentration (1942) and the continuous culture theory of Aaron Novick and Leo Szilard and of Jacques Monod (1950) gave the kinetics. The amino acid fermentations of the 1950s and 1960s industrialised the approach in Japan. Recombinant protein manufacture from the early 1980s added the requirements of high-cell-density fed-batch culture and of mammalian cell culture in suspension, the latter developing from a few hundred milligrams per litre to several grams per litre between the 1980s and the 2020s. Single-use bioreactors became standard for clinical and mid-scale manufacture during the 2000s and 2010s, and continuous and intensified processing — perfusion culture with continuous capture — moved from proposal to practice in the 2010s and 2020s.
:::

::: summary
- Batch, fed-batch and continuous modes differ in what the operator controls. Fed-batch dominates industry because it sets the growth rate, avoids overflow metabolism and permits high cell density; the feed for constant $\mu$ is exponential ([[#eq-exp-feed]]).
- In a chemostat $\mu = D$ ([[#eq-mu-equals-d]]), with $S = K_SD/(\mu_\mathrm{max}-D)$ and $X = Y(S_0-S)$; washout at $D_\mathrm{crit} = \mu_\mathrm{max}S_0/(K_S+S_0)$ and maximum productivity at $D_\mathrm{opt} = \mu_\mathrm{max}(1-\sqrt{K_S/(K_S+S_0)})$, uncomfortably close to washout.
- Oxygen transfer usually binds: $\mathrm{OTR} = k_La(C^{*}-C_L)$ and $X_\mathrm{max} = k_La C^{*}/q_{O_2}$ ([[#eq-xmax]]). With $C^{*} \approx 0.21$ mmol L⁻¹ and $q_{O_2} \approx 10$ mmol g⁻¹ h⁻¹, $k_La = 500$ h⁻¹ supports only about 10 g L⁻¹. $k_La$ rises sub-linearly with power input, so the usual remedy is to slow the cells by feeding.
- Metabolic heat is about 460 kJ per mole of O₂ consumed, giving ~13 kW m⁻³ in a vigorous culture — enough to heat it 11 K per hour. Generation scales with volume and cooling with surface area, so heat removal becomes harder with scale.
- Geometric similarity cannot preserve $P/V$, tip speed, Reynolds number and mixing time at once ([[#def-scaleup]]); choose the one the biology cares about and test the others by scale-down experiments that reproduce the large vessel's gradients.
- Sterilisation is logarithmic: $N = N_010^{-t/D_T}$ ([[#eq-death]]), so the time needed depends on $\log_{10}N_0$ and sterility is a stated probability. Contamination enters through pipework, seals, filters and additions, not usually through the vessel.
- Downstream step yields multiply (six good steps can leave 62 %), so improving one step's yield improves the whole train proportionally and removing a step may raise overall recovery. Remove the most mass earliest and reserve high-resolution steps for small volumes.
:::

## Exercises

::: exercise Dilution rate {level=1 check="0.25"}
A 40 L chemostat is fed at 10 L h⁻¹. What is the dilution rate, and hence the steady-state specific growth rate, in h⁻¹?
::: solution
$D = F/V = 10/40 = 0.25$ h⁻¹, and at steady state $\mu = D = 0.25$ h⁻¹.
:::
:::

::: exercise Washout {level=1 check="0.49"}
With $\mu_\mathrm{max} = 0.50$ h⁻¹, $K_S = 0.20$ g L⁻¹ and $S_0 = 10$ g L⁻¹, find the washout dilution rate to two decimal places.
::: solution
$D_\mathrm{crit} = \mu_\mathrm{max}S_0/(K_S+S_0) = 0.50\times10/10.2 = 0.49$ h⁻¹.
:::
:::

::: exercise Oxygen-limited density {level=1 check="8.4"}
A vessel achieves $k_La = 400$ h⁻¹ with $C^{*} = 0.21$ mmol L⁻¹, and the organism needs $q_{O_2} = 10$ mmol g⁻¹ h⁻¹. What is the maximum cell concentration, in g L⁻¹, to one decimal place?
::: solution
$X_\mathrm{max} = 400\times0.21/10 = 8.4$ g L⁻¹.
:::
:::

::: exercise Chemostat with a product {level=2}
A chemostat with $\mu_\mathrm{max} = 0.8$ h⁻¹, $K_S = 0.1$ g L⁻¹, $Y_{X/S} = 0.4$ g g⁻¹ and $S_0 = 15$ g L⁻¹ is run at $D = 0.2$ h⁻¹. The product is formed at a constant specific rate $q_P = 0.05$ g g⁻¹ h⁻¹. (a) Find $S$, $X$, the product concentration and the volumetric productivity. (b) Repeat at $D = 0.6$ h⁻¹. (c) Which is better, and what does the comparison depend on?
::: solution
(a) $S = 0.1\times0.2/0.6 = 0.033$ g L⁻¹ and $X = 0.4(15-0.033) = 5.99$ g L⁻¹. At steady state the product balance is $q_PX = DP$, so $P = q_PX/D = 0.05\times5.99/0.2 = 1.50$ g L⁻¹, and the volumetric productivity is $DP = q_PX = 0.30$ g L⁻¹ h⁻¹.

(b) $S = 0.1\times0.6/0.2 = 0.30$ g L⁻¹, $X = 0.4(15-0.3) = 5.88$ g L⁻¹, $P = 0.05\times5.88/0.6 = 0.49$ g L⁻¹ and $DP = 0.294$ g L⁻¹ h⁻¹.

(c) The volumetric productivities are almost identical, because with a growth-independent $q_P$ the productivity is $q_PX$ and $X$ barely changes — a useful and slightly counter-intuitive result. The titre, however, differs three-fold, and titre determines the cost of recovering the product from water ([[#ex-recovery]]). So the low dilution rate is better unless the vessel is the binding constraint; and the comparison would reverse if $q_P$ increased with growth rate, which must be measured rather than assumed.
:::
:::

::: exercise Exponential feed {level=2 check="0.030"}
A fed-batch culture holds 10 L containing 5 g L⁻¹ of biomass and is to grow at $\mu = 0.15$ h⁻¹ on a feed of 500 g L⁻¹ glucose with $Y_{X/S} = 0.5$ g g⁻¹. What is the initial feed rate in L h⁻¹, to three decimal places? How long until the feed rate has quadrupled?
::: solution
From [[#eq-exp-feed]] at $t = 0$,

$$
F(0) = \frac{\mu X_0V_0}{Y_{X/S}S_F} = \frac{0.15\times5\times10}{0.5\times500} = \frac{7.5}{250} = 0.030\ \mathrm{L\,h^{-1}} .
$$

The feed grows as $e^{\mu t}$, so it quadruples when $\mu t = \ln 4$, that is after $1.386/0.15 = 9.2$ h. Note that the oxygen demand grows in step with the feed, so the vessel must be able to supply four times as much oxygen nine hours later — which is why the chosen $\mu$ is dictated by [[#eq-xmax]] and not by the organism.
:::
:::

::: exercise Heat and scale {level=2 check="11.6"}
A culture generates 12 kW m⁻³ of metabolic heat. A geometrically similar family of vessels has a jacket area $A = 4.8\,V^{2/3}$ m² for $V$ in m³. What is the heat flux per unit area, in kW m⁻², for a 100 m³ vessel? One decimal place. Compare with a 1 m³ vessel.
::: solution
Heat generated $= 12\times100 = 1200$ kW; jacket area $= 4.8\times100^{2/3} = 4.8\times21.54 = 103.4$ m²; flux $= 1200/103.4 = 11.6$ kW m⁻².

For 1 m³: 12 kW over 4.8 m², that is 2.5 kW m⁻² — lower by the factor $100^{1/3} = 4.64$, exactly as the surface-to-volume argument predicts. Since achievable jacket fluxes with chilled water are only a few kW m⁻², the 1 m³ vessel is comfortable and the 100 m³ vessel cannot be cooled through its jacket at all: it needs internal coils or an external heat exchanger.
:::
:::

::: exercise A failed scale-up, diagnosed {level=2}
A process gives 4 g L⁻¹ in 10 L and 2.4 g L⁻¹ in 10 m³, with the same medium, temperature, pH and dissolved oxygen set-point. Off-gas analysis shows the same total oxygen consumed per batch; acetate reaches 3 g L⁻¹ at scale and 0.3 g L⁻¹ in the laboratory. (a) What does the acetate indicate? (b) Why can dissolved oxygen be "the same" and the culture nevertheless be oxygen-limited? (c) Design a scale-down experiment to test your hypothesis.
::: solution
(a) Acetate accumulation in *E. coli* is overflow metabolism: carbon arriving at acetyl-CoA faster than it can be oxidised. Ten-fold more acetate at scale says that somewhere in the large vessel the cells are experiencing a high local substrate concentration, a local oxygen shortage, or both.

(b) Because the probe measures one point, and the dissolved oxygen in a 10 m³ vessel is not uniform: near the sparger it may be at saturation and in the upper, unaerated region close to zero, with cells passing between the two every half minute. A set-point maintained at a single probe location is consistent with a substantial fraction of the broth being anaerobic. The same argument applies to the feed point, where local glucose can be orders of magnitude above the bulk value.

(c) Build a two-compartment scale-down: a small stirred vessel representing the well-mixed, well-aerated zone connected by a pump loop to a plug-flow or unaerated section representing the starved, oxygen-poor zone, with the circulation time set to the large vessel's measured mixing time (say 30 s). Run the laboratory process in this configuration and see whether acetate and titre reproduce the large-scale result. Then vary the circulation time to find the threshold at which performance degrades — which tells the plant how much mixing improvement would be needed — and test strain variants for tolerance of the oscillation, which is often cheaper than changing the vessel.
:::
:::

::: exercise Sterilisation with heat-up credit {level=3}
A medium carries $10^{7}$ spores per litre in 20 m³, with $D_{121} = 0.8$ min and $z = 10$ K. (a) How long at 121 °C alone for a one-in-a-thousand failure probability? (b) During heating the batch spends an estimated equivalent of 4 min at 121 °C. What holding time remains? (c) A continuous steriliser operates at 141 °C. What holding time does the same lethality require, and why is this preferred?
::: solution
(a) Total load $10^{7}\times2\times10^{4} = 2\times10^{11}$ spores. Reductions required: $\log_{10}(2\times10^{11}/10^{-3}) = 14.3$, so $t = 14.3\times0.8 = 11.4$ min.

(b) The heat-up contributes 4 min of equivalent lethality, so 7.4 min of holding remains.

(c) The $z$-value of 10 K means $D$ falls ten-fold per 10 K, so $D_{141} = 0.8/100 = 0.008$ min $= 0.48$ s, and the required time is $14.3\times0.48 = 6.9$ s. It is preferred because the chemical degradation of the medium — caramelisation of sugars, destruction of vitamins, Maillard reactions that both waste nutrients and produce inhibitors — has a much lower activation energy than spore death, so it does not speed up nearly as much with temperature. Twenty degrees hotter buys a hundred-fold reduction in sterilisation time at only a modest increase in the rate of damage, so the integrated damage falls dramatically. The cost is the equipment: continuous sterilisation needs heat exchangers, a holding coil sized for the residence time, and careful attention to residence-time distribution, since the fastest-moving fluid element sets the worst-case lethality.
:::
:::

::: exercise Designing for a target output {level=3}
You must deliver 200 kg per year of a purified protein. Cell culture gives 4 g L⁻¹ in a 16-day cycle (including turnaround), and the recovery train returns 65 %. (a) What annual culture volume is needed? (b) How many 2000 L single-use bioreactors? (c) Titre doubles to 8 g L⁻¹. What changes, and what does not? (d) Which single improvement — doubling titre or raising recovery from 65 % to 80 % — delivers more, and which would you pursue?
::: solution
(a) Product required from culture: $200/0.65 = 308$ kg, which at 4 g L⁻¹ $= 4$ kg m⁻³ is $77$ m³ of culture per year.

(b) Each 2000 L vessel completes $365/16 = 22.8$ cycles a year, that is $22.8\times2 = 45.6$ m³ per vessel per year. So $77/45.6 = 1.7$ vessels — two, with modest spare capacity, which is a comfortable design. (One would be insufficient and leaves no margin for a failed batch, of which there will be some.)

(c) The required culture volume halves to 38 m³, so one vessel suffices and the second becomes spare capacity. What does *not* change is the total mass of protein that must pass through the recovery train each year — still 308 kg, since the annual delivery and the recovery yield are unchanged. It is now carried in half the volume, so each batch presents twice the mass to the same columns and filters, and any step limited by mass rather than volume (column binding capacity, filter area) must be enlarged. Higher titre relieves the upstream constraint and tightens the downstream one, which is exactly what happened industrially during the 2000s.

(d) Doubling titre halves the culture volume needed; raising recovery from 65 % to 80 % reduces the culture requirement by a factor $0.65/0.80 = 0.81$, that is by 19 %. On output alone, titre wins decisively. But the recovery improvement is usually far cheaper to achieve and carries no downstream consequences, while doubling titre requires cell-line and medium development over a year or more and then forces the redesign of the recovery train. The right answer in practice is to pursue the recovery improvement first because it is nearer, while starting the titre work because it is larger — and to confirm that the purification steps can take the extra mass before celebrating the higher titre.
:::
:::
