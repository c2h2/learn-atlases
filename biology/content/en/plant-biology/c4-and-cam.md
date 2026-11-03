Rubisco, the enzyme that fixes CO₂ in every photosynthetic organism that uses the Calvin–Benson cycle, evolved more than three billion years ago, in a world with plenty of CO₂ and almost no free oxygen. Its active site does not discriminate perfectly between the two gases: it adds O₂ to ribulose 1,5-bisphosphate as well as CO₂. In the modern atmosphere, with 21 % oxygen and only about 0.04 % CO₂, this side reaction is a serious drain. In a wheat or rice leaf on a warm day, roughly one RuBP in four is oxygenated rather than carboxylated, and recycling the product costs energy and releases previously fixed CO₂ back to the air. This process, **photorespiration**, reduces the photosynthesis of C3 plants by a fifth to a third in warm conditions.

Evolution has not been able to make a much better Rubisco: enzymes that discriminate more strongly against oxygen are slower, and those that are faster are less selective. Instead, many plants have evolved ways to **concentrate CO₂** around Rubisco. The two most important are **C4 photosynthesis**, in which a first carboxylation in one cell type delivers CO₂ to Rubisco in another, and **crassulacean acid metabolism** (CAM), in which CO₂ is captured at night and released to Rubisco by day behind closed stomata. This chapter explains photorespiration from Rubisco's kinetics, introduces the standard model of C3 photosynthesis, and then describes the anatomy, biochemistry, energetics and ecology of the C4 and CAM solutions. It builds directly on the light reactions and the Calvin–Benson cycle of [[plant-biology/photosynthesis]].

## Rubisco's dilemma

### Carboxylation versus oxygenation

CO₂ and O₂ compete for the same enediol form of RuBP bound in Rubisco's active site. Carboxylation gives two molecules of 3-phosphoglycerate (3-PGA); oxygenation gives one 3-PGA and one **2-phosphoglycolate** (2-PG), a two-carbon compound that the Calvin–Benson cycle cannot use and that inhibits several of its enzymes. Because the two substrates compete, the ratio of the two reactions follows from the kinetics of competitive substrates ([[biochemistry/enzymes]]).

::: proposition The carboxylation–oxygenation ratio {#prop-specificity}
Let $V_c$ and $V_o$ be the maximal rates of carboxylation and oxygenation and $K_c$ and $K_o$ the Michaelis constants for CO₂ and O₂. With CO₂ and O₂ at concentrations $C$ and $O$ in the chloroplast, the ratio of the rates is

$$
\frac{v_c}{v_o} = S_{c/o}\,\frac{C}{O}, \qquad S_{c/o} = \frac{V_c\,K_o}{V_o\,K_c},
$$ {#eq-specificity}

where $S_{c/o}$ is Rubisco's **specificity factor**. It assumes that both gases compete for the same enzyme–RuBP complex with Michaelis–Menten kinetics.
:::

::: proof
For two substrates competing for the same enzyme form, each acts as a competitive inhibitor of the other's reaction. The rate of carboxylation is $v_c = V_c C/\bigl(C + K_c(1 + O/K_o)\bigr)$ and that of oxygenation $v_o = V_o O/\bigl(O + K_o(1 + C/K_c)\bigr)$. Multiplying out the denominators, both equal $D/(K_cK_o)$ with $D = CK_o + OK_c + K_cK_o$, so $v_c = V_cCK_o/D$ and $v_o = V_oOK_c/D$. Their ratio is $V_cK_oC/(V_oK_cO)$.
:::

For the Rubisco of C3 land plants at 25 °C, $S_{c/o}$ is about 80–100 when $C$ and $O$ are expressed as dissolved concentrations. In a leaf in air the dissolved CO₂ concentration in the chloroplast stroma is about 8 µmol L⁻¹, because CO₂ must diffuse in through stomata and mesophyll cells and is consumed as it goes, while the dissolved O₂ concentration is about 258 µmol L⁻¹ — thirty times higher.

::: example How much oxygenation? {#ex-ratio}
Take $S_{c/o} = 90$, $C = 8$ µmol L⁻¹ and $O = 258$ µmol L⁻¹. (a) Find $v_c/v_o$. (b) In photorespiration, one CO₂ is released for every two oxygenations. What fraction of the carbon fixed by carboxylation is lost?
::: solution
(a) $v_c/v_o = 90\times8/258 = 2.79$: about one oxygenation for every 2.8 carboxylations.

(b) Per carboxylation, $v_o/v_c = 0.358$ oxygenations occur, releasing $0.5\times0.358 = 0.18$ CO₂. So **about 18 %** of the carbon fixed is lost again, besides the energy spent recycling the 2-PG. At higher temperatures the loss grows (see [[#ex-temperature]]).
:::
:::

### The photorespiratory pathway

2-Phosphoglycolate is salvaged by a pathway that runs through three organelles. In the chloroplast it is dephosphorylated to **glycolate**, which moves to the **peroxisome** and is oxidised to glyoxylate (producing H₂O₂, destroyed by catalase); glyoxylate is aminated to **glycine**. Glycine enters the **mitochondrion**, where the glycine decarboxylase complex converts two glycines into one **serine**, releasing **CO₂** and **NH₃** — the CO₂ that photorespiration loses. Serine returns to the peroxisome, is converted to hydroxypyruvate and reduced to glycerate, which re-enters the chloroplast and is phosphorylated to 3-PGA. The ammonia must be refixed by glutamine synthetase and glutamate synthase in the chloroplast, at the cost of ATP and reduced ferredoxin ([[plant-biology/mineral-nutrition]]); the photorespiratory flux of ammonia is many times larger than the plant's net assimilation of nitrogen.

The pathway therefore returns three of every four carbon atoms in two molecules of 2-PG to the Calvin–Benson cycle and loses one as CO₂. Including the refixation of ammonia, the usual accounting puts the cost of each oxygenation at about 3.5 ATP and 2 NADPH-equivalents. Photorespiration is not useless — it detoxifies 2-PG, which would otherwise poison the Calvin–Benson cycle, and mutants defective in the pathway die in normal air but grow in high CO₂, where oxygenation is suppressed — but it is a costly repair, not an adaptation that pays for itself.

### The CO₂ compensation point

As CO₂ falls, oxygenation becomes relatively more frequent; at some CO₂ concentration the CO₂ released by photorespiration exactly balances that fixed by carboxylation.

::: definition CO₂ compensation point {#def-gamma}
The **photorespiratory CO₂ compensation point** $\Gamma^*$ is the CO₂ concentration at which carboxylation exactly balances photorespiratory CO₂ release, $v_c = 0.5\,v_o$. By [[#eq-specificity]],

$$
\Gamma^* = \frac{0.5\,O}{S_{c/o}}.
$$ {#eq-gamma}

The measured **CO₂ compensation point** $\Gamma$ of a leaf, where net CO₂ exchange is zero, is slightly higher than $\Gamma^*$ because of mitochondrial respiration in the light.
:::

With $O = 258$ µmol L⁻¹ and $S_{c/o} = 90$, $\Gamma^* = 0.5\times258/90 = 1.43$ µmol L⁻¹ of dissolved CO₂. At 25 °C the solubility of CO₂ in water is about 0.034 mol L⁻¹ per atmosphere, so this corresponds to a gas-phase mole fraction of $1.43\times10^{-6}/0.034 = 42$ µmol mol⁻¹ — close to the value of 42.75 µmol mol⁻¹ measured by Carl Bernacchi and colleagues (2001) for tobacco at 25 °C. A C3 leaf sealed in a lit chamber draws the CO₂ down to about 40–50 µmol mol⁻¹ and no further; a C4 leaf draws it down to almost zero.

::: example Photorespiration on a hot day {#ex-temperature}
At 35 °C, Rubisco's specificity factor falls (to about 65, say, for the purposes of this example) and CO₂ becomes less soluble relative to O₂, so that in the chloroplast $C = 6.5$ µmol L⁻¹ and $O = 220$ µmol L⁻¹. Recalculate $v_c/v_o$ and the fraction of fixed carbon lost.
::: solution
$v_c/v_o = 65\times6.5/220 = 1.92$; the loss is $0.5/1.92 = 0.26$, **26 %** of carboxylation, against 18 % at 25 °C. Both effects of temperature — on the enzyme's specificity and on the relative solubility of the gases — push in the same direction. When stomata close in hot, dry weather, $C$ falls further and the loss climbs higher still. This is the selective pressure that has favoured CO₂-concentrating mechanisms in hot, dry, sunny habitats.
:::
:::

## A model of C3 photosynthesis

How does net CO₂ uptake of a C3 leaf depend on the CO₂ concentration inside it? Graham Farquhar, Susanne von Caemmerer and Joseph Berry (1980) combined Rubisco kinetics with the supply of RuBP from electron transport into what is now the standard model of leaf photosynthesis, used from plant breeding to global climate models.

::: proposition The Farquhar–von Caemmerer–Berry model {#prop-fvcb}
The net CO₂ assimilation rate of a C3 leaf at intercellular CO₂ concentration $C$ is the lesser of two limitations, minus respiration in the light $R_d$:

$$
A = \min(A_c, A_j) - R_d, \qquad A_c = \frac{V_{c\max}\,(C - \Gamma^*)}{C + K_c(1 + O/K_o)}, \qquad A_j = \frac{J\,(C - \Gamma^*)}{4C + 8\Gamma^*}.
$$ {#eq-fvcb}

$A_c$ is the **Rubisco-limited** rate, when RuBP is saturating and the enzyme's capacity $V_{c\max}$ limits; $A_j$ is the **RuBP-regeneration-limited** rate, when the electron transport rate $J$ limits the supply of NADPH and ATP. The factor $(C - \Gamma^*)$ subtracts photorespiratory losses. The model treats the leaf as one big chloroplast; it ignores the diffusion resistance between intercellular spaces and chloroplasts (or includes it by using chloroplast CO₂ in place of $C$), and in its simplest form omits a third limitation by triose-phosphate use at high CO₂.
:::

The $A_j$ expression comes from the electron requirements: each carboxylation needs 4 electrons (2 NADPH), each oxygenation also needs about 4 for the regeneration of RuBP and the reassimilation of ammonia, and the denominator converts electron flow into net CO₂ uptake with $v_o/v_c = 2\Gamma^*/C$.

::: example An A–Ci curve {#ex-fvcb}
A wheat leaf at 25 °C has $V_{c\max} = 80$ µmol m⁻² s⁻¹, $J = 160$ µmol m⁻² s⁻¹ and $R_d = 1.0$ µmol m⁻² s⁻¹. Use $K_c = 404.9$ µmol mol⁻¹, $K_o = 278.4$ mmol mol⁻¹, $O = 210$ mmol mol⁻¹ and $\Gamma^* = 42.75$ µmol mol⁻¹ (Bernacchi and colleagues, 2001). Find $A$ at $C = 280$ µmol mol⁻¹ (typical in today's air) and at $C = 600$ µmol mol⁻¹, and say which process limits each.
::: solution
First, $K_c(1 + O/K_o) = 404.9\times(1 + 210/278.4) = 404.9\times1.754 = 710$ µmol mol⁻¹.

At $C = 280$: $A_c = 80\times(280 - 42.75)/(280 + 710) = 80\times237.25/990 = 19.2$; $A_j = 160\times237.25/(1120 + 342) = 26.0$. The smaller is $A_c$: **Rubisco-limited**, $A = 19.2 - 1.0 = 18.2$ µmol m⁻² s⁻¹.

At $C = 600$: $A_c = 80\times557.25/1310 = 34.0$; $A_j = 160\times557.25/(2400 + 342) = 32.5$. Now $A_j$ is smaller: **electron-transport-limited**, $A = 31.5$ µmol m⁻² s⁻¹.

The two limitations cross at about $C = 540$ µmol mol⁻¹. Below it, photosynthesis responds strongly to CO₂ because extra CO₂ both increases carboxylation and suppresses oxygenation. This is why rising atmospheric CO₂ increases C3 photosynthesis — the "CO₂ fertilisation" effect — and why the effect is smaller in C4 plants, whose Rubisco is already saturated.
:::
:::

::: widget plot
f: min(v*(x - 42.75)/(x + 710), j*(x - 42.75)/(4*x + 342)) - 1; min(k*x, m) - 1
x: 0, 1200
y: -5, 50
sliders: v=80:20:150:1; j=160:50:300:5; k=0.25:0.1:1:0.01; m=40:15:60:1
labels: \text{C3 (FvCB model)}; \text{C4 (simple model)}
hlines: 0
points: 280, 18.17; 600, 31.52
caption: Net CO₂ assimilation (µmol m⁻² s⁻¹, vertical) against intercellular CO₂ (µmol mol⁻¹, horizontal). The first curve is the C3 model of [[#eq-fvcb]] with $V_{c\max} = v$ and $J = j$, and the parameters of [[#ex-fvcb]] (marked points); notice the kink where Rubisco limitation gives way to electron-transport limitation, and the intercept near 45 µmol mol⁻¹, the compensation point. The second curve is a simple C4 response, $\min(kC, A_\text{max}) - R_d$ with initial slope $k$ and plateau $m$: it rises steeply from almost zero CO₂ and saturates at about 150–200 µmol mol⁻¹, well below today's intercellular concentrations. Raise $v$ to see Rubisco capacity matter at low CO₂, $j$ to see electron transport matter at high CO₂.
:::

## C4 photosynthesis

### The pathway

In the 1950s and early 1960s, workers at the Hawaiian Sugar Planters' Association (Hugo Kortschak, Constance Hartt and George Burr, published 1965) and, independently, Yuri Karpilov in the Soviet Union found that when sugarcane or maize leaves are fed ¹⁴CO₂ for a few seconds, the first labelled compounds are not 3-PGA but the four-carbon acids malate and aspartate. Marshall Hatch and Roger Slack (1966) worked out the pathway in sugarcane and showed that it is a CO₂ pump coupled to an anatomical specialisation.

::: definition C4 photosynthesis {#def-c4}
In **C4 photosynthesis**, CO₂ is fixed twice, in two cell types.

1. In the **mesophyll** cells, carbonic anhydrase converts CO₂ to bicarbonate, and **phosphoenolpyruvate carboxylase** (PEPC) adds it to phosphoenolpyruvate (PEP), forming **oxaloacetate**, which is reduced to **malate** or transaminated to **aspartate**. PEPC uses HCO₃⁻, not CO₂, has a high affinity for its substrate and has no oxygenase activity.
2. The C4 acid diffuses through plasmodesmata into the **bundle-sheath** cells, which form a wreath around each vein (**Kranz anatomy**, from the German for wreath), and is **decarboxylated** there, releasing CO₂.
3. Rubisco and the Calvin–Benson cycle, located in the bundle sheath, refix the CO₂ at a concentration several times — often estimated at about ten times — higher than in air.
4. The three-carbon remainder (pyruvate or alanine) returns to the mesophyll, where **pyruvate, orthophosphate dikinase** (PPDK) regenerates PEP using ATP, which is cleaved to AMP.
:::

C4 plants are grouped by the main decarboxylating enzyme in the bundle sheath: **NADP-malic enzyme** (in chloroplasts; maize, sugarcane, sorghum), **NAD-malic enzyme** (in mitochondria; many millets and amaranths), or **PEP carboxykinase** (in the cytosol; some tropical grasses). Many species use more than one. The bundle-sheath walls are often suberised, which slows the escape of CO₂, and in NADP-ME species the bundle-sheath chloroplasts have little photosystem II, so they produce little O₂ — further favouring carboxylation.

C4 photosynthesis is not a separate way of making sugar: every C4 plant uses Rubisco and the Calvin–Benson cycle. The C4 cycle is an addition, a pump that delivers CO₂ to Rubisco.

::: warning "C4 plants are simply better"
C4 photosynthesis is not an all-round improvement; it is a trade-off. The pump costs energy: regenerating PEP by PPDK consumes the equivalent of 2 extra ATP per CO₂, and some of the concentrated CO₂ leaks back out of the bundle sheath and must be pumped again. In cool, shaded or CO₂-rich conditions, where photorespiration is modest, C3 plants are as efficient or more efficient. The classic measurements of quantum yield by James Ehleringer and Olle Björkman (1977) showed that the quantum yield of C4 plants is nearly constant with temperature, while that of C3 plants declines as temperature (and photorespiration) rises; at the CO₂ levels of the time, C3 plants had the higher quantum yield below about 30 °C and C4 plants above. This is why C4 grasses dominate tropical savannas and warm-season pastures, while C3 grasses dominate cool temperate grasslands, and why the crossover temperature rises as atmospheric CO₂ rises.
:::

::: example The energy cost of the pump {#ex-c4cost}
A C4 leaf assimilates CO₂ using the Calvin–Benson cycle (3 ATP and 2 NADPH per CO₂) plus the C4 cycle (2 ATP-equivalents per CO₂ pumped). The **leakiness** $\varphi$ is the fraction of CO₂ released in the bundle sheath that leaks back to the mesophyll instead of being fixed. If $\varphi = 0.2$, how many ATP does each net CO₂ fixed cost?
::: solution
To fix one CO₂ in the bundle sheath, the pump must deliver $1/(1 - \varphi) = 1/0.8 = 1.25$ CO₂, since a fifth leaks. The C4 cycle therefore costs $2\times1.25 = 2.5$ ATP, and the total is $3 + 2.5 = 5.5$ ATP (and 2 NADPH) per CO₂, against 3 ATP for a C3 leaf without photorespiration. The C4 plant pays nearly twice as much ATP, but avoids photorespiration, which in warm conditions costs a C3 plant both energy and carbon. The extra ATP comes largely from cyclic electron flow ([[plant-biology/photosynthesis]]), which is enhanced in C4 bundle-sheath chloroplasts.
:::
:::

### Who are the C4 plants?

About 8,100 species, some 3 % of vascular plant species, are C4, yet they account for roughly a quarter of terrestrial gross primary production — about 23 % in the estimate of Christopher Still and colleagues (2003) — because they dominate tropical and subtropical grasslands and savannas. They include several of the most productive crops (maize, sugarcane, sorghum, pearl and foxtail millet) and many of the world's worst weeds. C4 photosynthesis has evolved independently **more than 60 times** in at least 19 families of flowering plants (Rowan Sage and colleagues, 2011–2016), most often in grasses (Poaceae) and sedges (Cyperaceae) and in the Amaranthaceae; it is one of the most striking examples of convergent evolution of a complex trait. Living **C3–C4 intermediates**, as in the genus *Flaveria*, show how it can arise in steps: first, glycine decarboxylase becomes confined to the bundle sheath, so that photorespiratory CO₂ is released and recaptured there ("C2 photosynthesis"), then the C4 enzymes are recruited from existing housekeeping functions and up-regulated in the right cells.

Molecular dating places the earliest C4 origins in grasses about 30 million years ago, in the Oligocene, when atmospheric CO₂ had fallen to low levels; C4 grasslands expanded much later, in the late Miocene and Pliocene (about 8–3 million years ago), as shown by a shift in the carbon isotopes of fossil soils and of the tooth enamel of grazing mammals (Thure Cerling and colleagues, 1997).

A few plants run the C4 cycle within single cells, separating the two carboxylations into different regions of the cytoplasm: the Central Asian chenopods *Bienertia* and *Suaeda aralocaspica* (Elena Voznesenskaya, Gerald Edwards and colleagues, 2001–2002).

### Carbon isotopes tell C3 from C4

Carbon has two stable isotopes, ¹²C and about 1.1 % ¹³C. Rubisco discriminates against ¹³CO₂, fixing it about 2.9 % (29 ‰) more slowly than ¹²CO₂; diffusion through stomata discriminates by 4.4 ‰. PEPC, combined with the equilibrium between CO₂ and bicarbonate, discriminates much less. Isotopic compositions are written as $\delta^{13}$C, the deviation of the ¹³C/¹²C ratio from a standard, in parts per thousand (‰).

::: proposition Carbon isotope discrimination in C3 plants {#prop-isotope}
In a C3 leaf, the discrimination $\Delta$ against ¹³C relative to the air is, to a good approximation,

$$
\Delta = a + (b - a)\,\frac{c_i}{c_a},
$$ {#eq-isotope}

where $a = 4.4$ ‰ is the fractionation by diffusion, $b \approx 27$ ‰ the net fractionation by Rubisco carboxylation, and $c_i/c_a$ the ratio of intercellular to ambient CO₂ (Graham Farquhar, Marion O'Leary and Joseph Berry, 1982). The plant's isotopic composition is then approximately $\delta^{13}\mathrm{C}_\text{plant} \approx \delta^{13}\mathrm{C}_\text{air} - \Delta$.
:::

The equation interpolates between two limits: if stomata were nearly closed ($c_i \to 0$), every CO₂ molecule that entered would be fixed and only diffusion would fractionate; if stomata were wide open ($c_i \to c_a$), Rubisco's full preference would show.

::: example The isotopic signature of a C3 plant {#ex-isotope}
A wheat leaf has $c_i/c_a = 0.7$; atmospheric CO₂ has $\delta^{13}$C $\approx -8.5$ ‰ (as of the 2020s; the value is slowly falling as fossil carbon, depleted in ¹³C, enters the air). Estimate the leaf's $\delta^{13}$C. What would it be under drought, when stomata close to $c_i/c_a = 0.4$?
::: solution
$\Delta = 4.4 + (27 - 4.4)\times0.7 = 4.4 + 15.8 = 20.2$ ‰, so $\delta^{13}\mathrm{C} \approx -8.5 - 20.2 = -28.7$ ‰. Under drought, $\Delta = 4.4 + 22.6\times0.4 = 13.4$ ‰, giving $\delta^{13}\mathrm{C} \approx -21.9$ ‰.

C3 plants typically have $\delta^{13}$C between about −35 and −20 ‰, averaging about −27 ‰; C4 plants, whose PEPC fixes almost every CO₂ that enters, cluster around −12 ‰ (−16 to −10 ‰). Because $c_i/c_a$ reflects the balance of stomatal conductance and photosynthesis, a C3 plant's $\delta^{13}$C is a record of its intrinsic water-use efficiency ([[diversity-of-life/land-plants]]); Graham Farquhar and Richard Richards used this to breed wheat varieties with higher water-use efficiency, released in Australia in the early 2000s.
:::
:::

::: application Isotopes in the diet and in history
Because maize and sugarcane are C4 and most other crops are C3, the carbon isotopes of animal and human tissues record what was eaten. Analyses of bone collagen show when maize agriculture spread into eastern North America (a shift to C4-rich diets after about 900 CE); the isotopes of fossil teeth show when grazing mammals in Africa and elsewhere switched from C3 browse to C4 grass in the late Miocene; and food authenticity laboratories detect cane sugar or corn syrup added to honey or fruit juice by their C4 signature. Meanwhile, the high productivity of C4 crops has inspired attempts to engineer C4 photosynthesis into rice (the international C4 Rice Project, begun in 2008), a goal that requires both the enzymes and the Kranz anatomy, and is not yet achieved (as of 2026). A less ambitious strategy is to bypass photorespiration: Paul South, Amanda Cavanagh, Donald Ort and colleagues (2019) installed in tobacco an alternative pathway that metabolises glycolate inside the chloroplast and blocked its export, and found biomass increases of more than 25 % in field trials.
:::

## Crassulacean acid metabolism

As early as 1815 Benjamin Heyne noticed that the leaves of *Bryophyllum calycinum* (now *Kalanchoe pinnata*), a succulent of the stonecrop family Crassulaceae, taste sour in the early morning and almost tasteless by afternoon. The acid that accumulates overnight is malic acid, the product of a CO₂-concentrating mechanism separated not in space, like C4 photosynthesis, but in time.

::: definition Crassulacean acid metabolism {#def-cam}
In **CAM**, stomata open at night, when the air is cool and humid, and CO₂ is fixed by PEPC into oxaloacetate and reduced to **malate**, which is pumped into the vacuole and stored as malic acid. During the day stomata close; malate leaves the vacuole and is decarboxylated (by malic enzyme or PEP carboxykinase), and the released CO₂, trapped in the leaf behind closed stomata at concentrations many times that of air, is fixed by Rubisco in the Calvin–Benson cycle, using the ATP and NADPH of the light reactions. Barry Osmond (1978) distinguished four phases: nocturnal uptake (I); a transition at dawn with some direct C3 fixation (II); daytime decarboxylation with stomata closed (III); and, in the late afternoon once the malate is used up, stomatal reopening with direct C3 fixation (IV).
:::

The great advantage of CAM is water economy. A leaf that opens its stomata at night, when the leaf-to-air vapour pressure difference is small, loses far less water per CO₂ than one that opens them by day ([[plant-biology/water-transport#prop-transpiration]]). Typical transpiration ratios — water lost per unit of dry matter gained — are roughly 500 for C3 plants, 250 for C4 and 50 for CAM plants, with wide variation. The price is capacity: the amount of CO₂ a CAM plant can fix in a day is limited by how much malic acid its vacuoles can store overnight, which is why CAM plants are usually succulent, with large vacuoles, and slow-growing.

::: example How much carbon can a vacuole store? {#ex-cam}
A CAM leaf is 2 mm thick, and vacuoles occupy 80 % of its volume. Overnight, the malate concentration in the vacuolar sap rises by 0.10 mol L⁻¹. (a) How much CO₂ per square metre of leaf is stored, given that each malate carries one CO₂ fixed by PEPC? (b) If this CO₂ is released and refixed over 10 hours of the next day, what average rate of Rubisco fixation does it support?
::: solution
(a) Vacuolar volume per m² of leaf: $2\times10^{-3}\ \text{m}\times1\ \text{m}^2\times0.8 = 1.6\times10^{-3}$ m³ $= 1.6$ L. Malate stored: $0.10\times1.6 = 0.16$ mol m⁻², and so 0.16 mol CO₂ m⁻².

(b) $0.16\ \text{mol}/36{,}000\ \text{s} = 4.4\times10^{-6}$ mol m⁻² s⁻¹ $= 4.4$ µmol m⁻² s⁻¹ — a fifth to a quarter of the light-saturated rate of a C3 crop leaf. Thicker, more succulent leaves store more; the acid also lowers the vacuolar pH by one to two units overnight, which is what Heyne tasted.
:::
:::

CAM occurs in about 6 % of vascular plant species, in over 35 families (Katia Silvera, Klaus Winter and colleagues, 2010): cacti, agaves, stonecrops, pineapple and other bromeliads, and many epiphytic orchids, whose life on tree branches is a kind of desert. It has evolved many times, even in aquatic plants of the quillwort genus *Isoetes*, where it captures CO₂ at night when dissolved CO₂ is not being depleted by competing algae (Jon Keeley, 1981). Many species are **facultative**: the common ice plant *Mesembryanthemum crystallinum* performs C3 photosynthesis when well watered and switches to CAM when stressed by salt or drought (Klaus Winter and Dieter von Willert, 1972). CAM crops such as agave and prickly pear are being studied as sources of biomass on land too dry for conventional crops.

::: quiz
A plant's leaves are succulent; its stomata are closed at midday; the pH of its leaf sap is 4.0 at dawn and 5.6 at dusk; and its tissue has $\delta^{13}$C = −14 ‰. What kind of photosynthesis does it most likely use?
- [ ] C3, because its δ¹³C is typical of C3 plants
- [ ] C4, because its δ¹³C is typical of C4 plants and it has Kranz anatomy
- [x] CAM, because it accumulates acid at night and closes its stomata by day; its δ¹³C reflects fixation of most CO₂ by PEPC at night
- [ ] It cannot be decided from these data
::: solution
Nocturnal acidification (low pH at dawn, rising as malate is decarboxylated during the day) and daytime stomatal closure are the hallmarks of CAM. When most CO₂ is taken up at night by PEPC, the isotopic signature is C4-like (around −10 to −20 ‰); CAM plants that take up more CO₂ directly by day in phases II and IV have more negative values, intermediate between C3 and C4. Succulence goes with CAM's need for vacuolar storage. Nothing in the data suggests Kranz anatomy.
:::
:::

::: intuition Space and time
C4 and CAM photosynthesis use the same enzymes — carbonic anhydrase, PEPC, malate dehydrogenase, decarboxylases, PPDK — and solve the same problem, but with opposite strategies. C4 separates the two carboxylations **in space**, in two cell types that work simultaneously; its pump runs continuously, raising both the efficiency of Rubisco and the rate of photosynthesis. CAM separates them **in time**, in the same cell; its pump runs at night to save water, and the capacity of the vacuole sets the day's ration. The enzymes all existed in C3 ancestors for other purposes (PEPC replenishes TCA-cycle intermediates in every plant cell; [[biochemistry/glycolysis-tca]]), which is one reason both mechanisms could evolve so many times.
:::

::: history
Otto Warburg found in 1920 that oxygen inhibits photosynthesis in *Chlorella* — the "Warburg effect" of plant physiology. John Decker (1955) observed the post-illumination burst of CO₂ that revealed photorespiration in tobacco leaves, and George Bowes, William Ogren and Richard Hageman (1971) showed that the same enzyme, ribulose-bisphosphate carboxylase, also catalyses oxygenation, explaining both effects; the name Rubisco, for ribulose-bisphosphate carboxylase/oxygenase, was coined in 1979. The glycolate pathway was traced by Edward Tolbert and others in the 1960s and 1970s. Kortschak, Hartt and Burr (1965) and Hatch and Slack (1966) discovered C4 photosynthesis in sugarcane, building on earlier observations of Kranz anatomy by the anatomist Gottlieb Haberlandt in the 1880s. The diurnal acid rhythm noted by Heyne in 1815 was studied in the mid-twentieth century by Meirion Thomas, Sidney Ranson and others, who gave crassulacean acid metabolism its name. Farquhar, von Caemmerer and Berry published their model of C3 photosynthesis in 1980, and Farquhar, O'Leary and Berry their theory of isotope discrimination in 1982.
:::

## Summary

::: summary
- Rubisco oxygenates as well as carboxylates RuBP: $v_c/v_o = S_{c/o}\,C/O$, with $S_{c/o} \approx 90$ in C3 plants. In air at 25 °C about one RuBP in 3.8 is oxygenated and about 18 % of fixed carbon is lost; the loss rises with temperature and stomatal closure.
- **Photorespiration** salvages 2-phosphoglycolate through chloroplast, peroxisome and mitochondrion, releasing one CO₂ and one NH₃ per two oxygenations; $\Gamma^* = 0.5\,O/S_{c/o} \approx 42$ µmol mol⁻¹ at 25 °C.
- The **FvCB model**: $A = \min(A_c, A_j) - R_d$, Rubisco-limited at low CO₂, RuBP-regeneration-limited at high CO₂.
- **C4**: PEPC fixes HCO₃⁻ in mesophyll; C4 acids carry CO₂ to the bundle sheath (Kranz anatomy), where Rubisco works at high CO₂. Cost: about 5–5.5 ATP per CO₂, but no photorespiration. Evolved more than 60 times; about 3 % of species, about 23 % of terrestrial GPP; favoured in hot, sunny, dry or low-CO₂ conditions.
- Carbon isotopes: $\Delta = a + (b - a)c_i/c_a$ for C3; δ¹³C ≈ −27 ‰ (C3), −12 ‰ (C4), intermediate to C4-like in CAM.
- **CAM**: nocturnal PEPC fixation and malate storage, daytime decarboxylation behind closed stomata; very high water-use efficiency, capacity limited by vacuolar storage; about 6 % of species, often facultative.
:::

Photosynthesis is regulated by light and water through signals inside the plant. The chemical messengers that coordinate growth and development — the plant hormones — are the subject of [[plant-biology/plant-hormones]].

## Exercises

::: exercise The carboxylation ratio {level=1 check="3.1"}
Rubisco with $S_{c/o} = 100$ works in a chloroplast with 8.0 µmol L⁻¹ CO₂ and 258 µmol L⁻¹ O₂. Find $v_c/v_o$ to one decimal place.
::: solution
$100\times8.0/258 = 3.1$.
:::
:::

::: exercise A compensation point {level=1 check="1.29"}
Calculate $\Gamma^*$ in µmol L⁻¹ (dissolved), to two decimal places, for $S_{c/o} = 100$ and $O = 258$ µmol L⁻¹.
::: solution
$\Gamma^* = 0.5\times258/100 = 1.29$ µmol L⁻¹ (about 38 µmol mol⁻¹ in the gas phase at 25 °C).
:::
:::

::: exercise An isotope signature {level=1 check="11.2"}
Using [[#eq-isotope]] with $a = 4.4$ ‰ and $b = 27$ ‰, what is $\Delta$ for a C3 leaf with $c_i/c_a = 0.3$? Give one decimal place.
::: solution
$\Delta = 4.4 + 22.6\times0.3 = 11.2$ ‰.
:::
:::

::: exercise A leaky bundle sheath {level=2 check="6"}
A C4 plant's bundle sheath has a leakiness of $\varphi = 1/3$. With 3 ATP per CO₂ for the Calvin–Benson cycle and 2 ATP per CO₂ pumped, how many ATP does each net CO₂ fixed cost?
::: solution
CO₂ pumped per CO₂ fixed $= 1/(1 - 1/3) = 1.5$; C4 cycle cost $= 2\times1.5 = 3$ ATP; total $= 3 + 3 = 6$ ATP per CO₂.
:::
:::

::: exercise Night-time storage {level=2 check="3.3"}
A CAM leaf 1.5 mm thick, with vacuoles occupying 80 % of its volume, accumulates 0.10 mol L⁻¹ malate overnight. What average rate of daytime CO₂ refixation, in µmol m⁻² s⁻¹ to one decimal place, does this support over 10 hours?
::: solution
Vacuole volume $= 1.5\times10^{-3}\times0.8 = 1.2\times10^{-3}$ m³ $= 1.2$ L per m²; malate $= 0.12$ mol m⁻²; rate $= 0.12/36000 = 3.3\times10^{-6}$ mol m⁻² s⁻¹ $= 3.3$ µmol m⁻² s⁻¹.
:::
:::

::: exercise Warburg's experiment {level=2}
Leaves of wheat (C3) and maize (C4) are measured at 25 °C and saturating light in air containing 400 µmol mol⁻¹ CO₂, with either 21 % or 2 % O₂. Wheat photosynthesis increases by about 30 % in 2 % O₂; maize photosynthesis does not change. (a) Explain both results. (b) Predict the CO₂ compensation point of each species in 21 % and 2 % O₂. (c) Why does the stimulation of wheat by low O₂ increase at higher temperatures?
::: solution
(a) Lowering O₂ reduces oxygenation by Rubisco (by [[#eq-specificity]], $v_c/v_o$ rises ten-fold), so photorespiratory CO₂ loss and its energy cost nearly vanish in wheat. In maize, Rubisco in the bundle sheath already works at high CO₂, so oxygenation is negligible even in 21 % O₂.
(b) Wheat: $\Gamma \approx 40$–50 µmol mol⁻¹ in 21 % O₂, falling roughly in proportion to O₂ ([[#eq-gamma]]) to a few µmol mol⁻¹ in 2 %. Maize: close to zero (a few µmol mol⁻¹) in both.
(c) Rubisco's specificity factor falls with temperature and the solubility of CO₂ falls faster than that of O₂, so oxygenation is a larger fraction of Rubisco activity at high temperature; removing O₂ therefore relieves a larger loss.
:::
:::

::: exercise Reading A–Ci curves {level=2}
Two leaves are measured over a range of intercellular CO₂. Leaf X: $A = 0$ at $C = 45$ µmol mol⁻¹; $A$ rises steadily and is still rising at 1000 µmol mol⁻¹. Leaf Y: $A = 0$ at $C = 3$ µmol mol⁻¹; $A$ rises steeply and plateaus above 150 µmol mol⁻¹. (a) Which is C3 and which C4? (b) Which would gain more from a doubling of atmospheric CO₂ from 420 to 840 µmol mol⁻¹, and why? (c) Leaf X's curve shows a change of slope at about 500 µmol mol⁻¹. Interpret it with the FvCB model.
::: solution
(a) X is C3 (compensation point near $\Gamma^*$, continued response to CO₂); Y is C4 (near-zero compensation point, saturation at low CO₂ because PEPC and the bundle-sheath pump saturate Rubisco).
(b) X: in today's air its intercellular CO₂ is around 280, on the steep part of its curve, and Rubisco limits; doubling CO₂ increases carboxylation and suppresses photorespiration. Y is already saturated at its intercellular CO₂ (about 150–200), so it gains little in photosynthesis — though it may benefit from improved water-use efficiency, since it can close its stomata partly at the same assimilation rate.
(c) Below the break, $A_c$ (Rubisco capacity) limits; above it, $A_j$ (electron transport, RuBP regeneration) limits, and the curve becomes shallower ([[#ex-fvcb]]).
:::
:::

::: exercise Archaeology of a diet {level=2}
Bone collagen of people buried at a site in eastern North America before 800 CE has $\delta^{13}$C of about −21 ‰; at the same site after 1000 CE, about −12 ‰. Animals and plants used as food were measured too: deer collagen −21 ‰, C3 plants about −27 ‰, maize about −11 ‰. Collagen of a consumer is typically enriched by about 5 ‰ relative to its diet. (a) What happened to the diet? (b) Estimate the fraction of dietary carbon from maize after 1000 CE, using a two-source mixing model. (c) What are the main uncertainties?
::: solution
(a) The diet shifted from C3 sources (wild plants, deer) to a large contribution from C4 maize.
(b) Diet $\delta^{13}$C after 1000 CE $\approx -12 - 5 = -17$ ‰. With a C3 end-member at −27 ‰ and maize at −11 ‰, the maize fraction $f$ satisfies $-17 = f(-11) + (1-f)(-27)$, so $f = 10/16 = 0.63$: about 60 % of dietary carbon from maize. Before 800 CE: diet $\approx -26$ ‰, giving $f \approx 0.06$ — essentially none.
(c) The diet–collagen offset (it varies with species and diet protein content); collagen records mainly dietary protein, so a low-protein food like maize may be under-represented; the end-member values vary with plant growth conditions and the C3 animals' own diets; and other C4 foods (some wild grasses, animals that ate maize) or marine foods (whose δ¹³C overlaps) could contribute.
:::
:::

::: exercise A changing atmosphere {level=3}
Atmospheric CO₂ was about 180–200 µmol mol⁻¹ at the last glacial maximum, about 280 in the eighteenth century and about 420 µmol mol⁻¹ in the mid-2020s. (a) Using [[#eq-fvcb]] with the parameters of [[#ex-fvcb]] and assuming $c_i = 0.7c_a$, calculate $A_c$ for $c_a = 190$, 280 and 420 µmol mol⁻¹. (b) What does this suggest about the competitive balance between C3 and C4 plants over these periods? (c) Why might C4 grasses nevertheless continue to dominate tropical savannas in a high-CO₂ world?
::: solution
(a) $c_i = 133$, 196 and 294. $A_c = 80(c_i - 42.75)/(c_i + 710)$: for 133, $80\times90.25/843 = 8.6$; for 196, $80\times153.25/906 = 13.5$; for 294, $80\times251.25/1004 = 20.0$ µmol m⁻² s⁻¹ (before subtracting $R_d$). C3 photosynthesis at glacial CO₂ was less than half that at today's.
(b) Low CO₂ greatly favoured C4 plants, whose photosynthesis is barely affected by CO₂ above about 150 µmol mol⁻¹; rising CO₂ since then shifts the advantage towards C3 plants, especially in cooler conditions. The origins of C4 photosynthesis in the low-CO₂ Oligocene and the expansion of C4 grasslands in the late Miocene fit this picture, although the Miocene expansion also involved aridity, seasonality and fire.
(c) Dominance also depends on temperature (C4 quantum yields remain higher in the heat), water-use efficiency in drought, nitrogen-use efficiency on poor soils, and on fire and grazing, to which tropical C4 grasses are well adapted and which suppress trees and C3 shrubs. CO₂ is one factor among several; experiments with elevated CO₂ in grasslands show that C3–C4 balance shifts are modest and depend on water and nitrogen.
:::
:::

::: exercise Designing a better Rubisco {level=3}
Across Rubisco enzymes from different organisms, those with higher specificity factors tend to have lower maximal carboxylation rates (for example, a red-algal Rubisco with $S_{c/o} \approx 2.5$ times higher than that of a crop plant, but slower). (a) Using [[#eq-specificity]] and the FvCB model, explain why replacing crop Rubisco with a more specific but slower one could either increase or decrease photosynthesis. (b) Under what conditions would you expect a more specific enzyme to help most? (c) Why might C4 plants have evolved Rubiscos with lower specificity but higher turnover rates?
::: solution
(a) Higher specificity lowers $\Gamma^*$ and reduces photorespiratory losses, raising both $A_c$ (per unit enzyme, at low CO₂) and the efficiency of RuBP use in $A_j$. But a lower maximal rate means that more enzyme (and nitrogen) is needed for the same $V_{c\max}$; if the leaf cannot make more, $A_c$ falls at CO₂ levels where Rubisco is the main limitation. The net effect depends on which limitation operates and on how much enzyme the leaf can hold.
(b) Where photorespiration is severe and RuBP regeneration (light) limits: high temperature, low intercellular CO₂ (closed stomata), and at low light, where the saving of electrons matters most.
(c) In the bundle sheath CO₂ is high, so oxygenation is rare whatever the specificity; selection for specificity is relaxed, and faster enzymes let C4 plants achieve high $V_{c\max}$ with less Rubisco protein — contributing to their higher nitrogen-use efficiency. C4 Rubiscos do have, on average, higher turnover rates and lower CO₂ affinity than C3 Rubiscos.
:::
:::
