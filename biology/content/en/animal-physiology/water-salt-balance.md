A salmon spends its first years in a river, its body fluids far saltier than the water around it, then migrates to the sea, where its body fluids are only a third as salty as the water. Within days of the change its gills switch from taking up salt to pumping it out, and it switches from never drinking to drinking sea water continuously. A kangaroo rat in the Mojave Desert may never drink in its life, living on dry seeds and the water its own metabolism makes. A herring gull drinks sea water and excretes the salt as a concentrated brine dripping from its beak. All three are solving the problem that [[animal-physiology/homeostasis]] introduced: keeping the osmotic concentration and ionic composition of the internal environment steady when the environment pulls them away.

This chapter covers the physical basis of osmotic exchange, the strategies of animals in the sea, in fresh water and on land, the organs that excrete salts, water and nitrogenous wastes, and the countercurrent mechanism by which mammalian and avian kidneys produce urine more concentrated than blood. The transport proteins involved are introduced in [[cell-biology/membrane-transport]], and the biochemistry of ammonia, urea and uric acid in [[biochemistry/metabolic-integration#def-nitrogen]].

## Osmotic and ionic regulation

Animal epithelia are permeable to water to some degree, and water moves across them by osmosis from the more dilute side to the more concentrated side. Ions move by diffusion down their electrochemical gradients. An animal whose body fluids differ from the environment therefore gains or loses water and ions continuously, and must make up the difference by active transport.

::: definition Osmolality, tonicity and osmoregulation {#def-osmolality}
The **osmolality** of a solution is the total concentration of osmotically active particles per kilogram of water (osmol kg⁻¹ or mOsm kg⁻¹); 1 mmol of NaCl, which dissociates into Na⁺ and Cl⁻, contributes nearly 2 mOsm. A solution with higher osmolality than another is **hyperosmotic** to it, one with lower osmolality **hypo-osmotic**, and one with the same osmolality **iso-osmotic**. (**Tonicity** refers to the effect of a solution on cell volume, which depends also on which solutes can cross the membrane.) **Osmoregulation** is the control of the osmolality of the body fluids; **ionic regulation** is the control of the concentrations of particular ions, which an animal may regulate even when it does not regulate total osmolality.
:::

::: proposition Osmotic pressure (van 't Hoff) {#prop-vanthoff}
For a dilute solution, the osmotic pressure — the hydrostatic pressure that would have to be applied to stop water entering it across a membrane permeable only to water — is approximately

$$
\pi = c\,RT,
$$ {#eq-vanthoff}

where $c$ is the osmolality (osmol per kg water, taken as osmol L⁻¹), $R$ the gas constant and $T$ the absolute temperature. The water flux across a membrane is driven by the difference in osmotic pressure, scaled by the reflection coefficient of each solute (1 for a solute that cannot cross). Assumptions: dilute, ideal solutions; real solutions such as sea water deviate by a few per cent, which is why physiologists measure osmolality directly, usually by freezing-point depression.
:::

::: example How strong is the pull of the sea? {#ex-vanthoff}
Calculate, at 15 °C, (a) the osmotic pressure of sea water (about 1000 mOsm kg⁻¹), and (b) the osmotic pressure difference between the plasma of a freshwater fish (300 mOsm kg⁻¹) and fresh water (taken as 0). Express both in kPa and in atmospheres (101.3 kPa).
::: solution
$RT = 8.314 \times 288 = 2396$ J mol⁻¹.

(a) $\pi = 1000\ \mathrm{mol\,m^{-3}} \times 2396 = 2.40\times10^6$ Pa $= 2.4$ MPa, or 24 atm.

(b) $\pi = 300 \times 2396 = 7.2\times10^5$ Pa $= 720$ kPa, or 7.1 atm.

These are large pressures. A freshwater fish's gills, which must be thin and extensive for gas exchange ([[animal-physiology/gas-exchange]]), are exposed to a 7-atmosphere osmotic pull of water into the blood. Gas exchange and osmoregulation are in conflict at every respiratory surface, a compromise sometimes called the osmo-respiratory compromise.
:::
:::

## Life in the sea

Most marine invertebrates are **osmoconformers**: their body fluids have nearly the osmolality of sea water, about 1000 mOsm kg⁻¹, and mostly the same major ions, although they regulate some ions (often keeping Mg²⁺ and SO₄²⁻ lower, and K⁺ and Ca²⁺ somewhat different, from sea water). Their cells, however, cannot work at 1000 mOsm kg⁻¹ of salt; they make up much of their internal osmolality with **organic osmolytes** — free amino acids such as glycine, alanine and taurine, and methylamines such as betaine — which do not disturb protein function at high concentration. The hagfishes, the only vertebrates that are osmoconformers, likewise keep their plasma near sea water in osmolality, mostly with NaCl.

The other marine vertebrates keep their body fluids well below sea water in salt, and have found two very different ways to deal with the consequences.

### Sharks and rays: the urea solution

Elasmobranchs (sharks, skates and rays) keep their plasma NaCl at roughly half the concentration in sea water but make their total osmolality equal to or slightly above that of sea water by retaining **urea** at several hundred mmol L⁻¹, together with **trimethylamine oxide** (TMAO). Urea at such concentrations would destabilise many proteins, but TMAO counteracts the effect, and the two are typically present in a ratio of about 2:1, the ratio at which their effects on protein stability roughly cancel (Paul Yancey and George Somero, 1979). Being slightly hyperosmotic, elasmobranchs gain a little water by osmosis across the gills, which provides free water for urine, and they never need to drink. Salt still enters by diffusion and with food; it is excreted by a specialised **rectal gland**, which secretes a fluid of roughly the NaCl concentration of sea water (J. Wendell Burger and Walter Hess, 1960). The coelacanth (*Latimeria*) and the crab-eating frog (*Fejervarya cancrivora*) of mangrove swamps also use urea retention.

### Marine teleosts: drinking the sea

Marine teleost fishes have plasma of about 350–400 mOsm kg⁻¹, about a third of sea water. They lose water by osmosis across the gills and gain salt by diffusion. Homer Smith showed in 1930 that they replace the water by **drinking sea water**. The intestine absorbs NaCl and, with it, water; the divalent ions Mg²⁺ and SO₄²⁻ are largely left in the gut or excreted by the kidney, which produces small volumes of urine roughly iso-osmotic to plasma (a teleost kidney cannot make urine more concentrated than blood). The excess NaCl is excreted across the gills by **ionocytes** (mitochondria-rich "chloride cells", described in eel gills by Ancel Keys and E. N. Willmer in 1932). In each ionocyte, the Na⁺/K⁺-ATPase in the basolateral membrane keeps intracellular Na⁺ low; a Na⁺–K⁺–2Cl⁻ cotransporter (NKCC1) uses the Na⁺ gradient to bring Cl⁻ into the cell from the blood; Cl⁻ leaves into the sea water through an apical channel related to the human CFTR; and Na⁺ follows passively, between cells, through leaky junctions, driven by the electrical potential that Cl⁻ secretion creates.

## Life in fresh water

In fresh water every animal is hyperosmotic to its surroundings, by a factor of tens to thousands. Freshwater animals face continuous osmotic influx of water and diffusive loss of ions. They respond in three ways:

- by keeping the body fluids more dilute than those of marine relatives (freshwater mussels have some of the most dilute body fluids of any animal, below 50 mOsm kg⁻¹; freshwater teleosts are near 300, crayfish near 400–500), which reduces both gradients;
- by making their body surfaces less permeable, so that exchange is concentrated at the gills;
- by excreting the water that enters as large volumes of **dilute urine**, from which salts have been reabsorbed, and by taking up Na⁺ and Cl⁻ actively from the water across the gills (or skin, in amphibians). Freshwater teleosts do not drink, and their urine flow can be ten or more times that of marine teleosts per kilogram.

Taking ions up from fresh water is hard work. In freshwater fish gills, Na⁺ uptake is thought to occur through apical Na⁺ channels driven by an electrical gradient set up by a proton-pumping V-type ATPase, or through Na⁺/H⁺ exchangers, and Cl⁻ through Cl⁻/HCO₃⁻ exchangers, in different populations of ionocytes; the mechanisms differ between species and are still being worked out.

::: proposition The minimum energy cost of ion uptake {#prop-uptake-cost}
The minimum free energy needed to move one mole of an ion of charge $z$ from a solution where its concentration is $c_\mathrm{out}$ into the body where it is $c_\mathrm{in}$, across an epithelium with transepithelial potential $\Delta\psi = \psi_\mathrm{in} - \psi_\mathrm{out}$, is

$$
\Delta G = RT\ln\frac{c_\mathrm{in}}{c_\mathrm{out}} + zF\Delta\psi,
$$ {#eq-uptake-cost}

the electrochemical potential difference of the ion ([[cell-biology/membrane-transport#def-electrochemical]]). This is a thermodynamic minimum; the actual ATP cost is higher because transport is not perfectly efficient and because the ion that has been taken up continues to leak out and must be taken up again. Activities rather than concentrations should strictly be used.
:::

::: example The cost of living in fresh water {#ex-uptake}
A freshwater fish at 15 °C keeps plasma Na⁺ at 140 mmol L⁻¹ in water containing 0.10 mmol L⁻¹. (a) Ignoring the transepithelial potential, what is the minimum free energy needed to take up one mole of Na⁺? (b) If hydrolysis of ATP provides about 50 kJ mol⁻¹ in the cell, how many Na⁺ could at most be moved per ATP? (c) What happens to the cost in brackish water containing 50 mmol L⁻¹ Na⁺?
::: solution
(a) $\Delta G = 2.396 \times \ln(140/0.10) = 2.396 \times 7.24 = 17.4$ kJ mol⁻¹.

(b) $50/17.4 = 2.9$ Na⁺ per ATP at the thermodynamic limit, before accounting for inefficiency.

(c) $\Delta G = 2.396 \times \ln(140/50) = 2.396 \times 1.03 = 2.5$ kJ mol⁻¹, seven times less. The diffusive leak, proportional to the concentration difference, is also smaller (90 against 140 mmol L⁻¹), so the total cost of ion regulation falls steeply as the water becomes saltier. How large the cost of osmoregulation is in fishes as a fraction of resting metabolism has been much debated; estimates range from a few per cent to over 20 %, depending on the species, the salinity and the method.
:::
:::

::: widget plot
f: 2.396*ln(140/x); 0
x: 0.05, 160
y: -1, 20
points: 0.1, 17.4; 50, 2.5
labels: \text{minimum free energy to take up Na}^+\text{ (kJ mol}^{-1}\text{)}; \text{zero}
vlines: 140
caption: The minimum free energy needed to move one mole of Na⁺ into a fish whose plasma contains 140 mmol L⁻¹ (vertical line), against the Na⁺ concentration of the water (horizontal axis, mmol L⁻¹), from [[#eq-uptake-cost]] at 15 °C with no transepithelial potential. The marked points are fresh water (0.10 mmol L⁻¹) and brackish water (50 mmol L⁻¹) from [[#ex-uptake]]. The cost rises steeply only in very dilute water, because it depends on the logarithm of the concentration ratio. Above 140 mmol L⁻¹ the curve is negative: uptake is downhill, and the problem becomes getting rid of Na⁺.
:::

Many fishes, the **euryhaline** species, can live in both fresh and salt water. Salmon, eels, sticklebacks and killifish switch between the two modes when they migrate: in sea water the gills develop ionocytes with NKCC1 and CFTR-like channels, and the fish begins to drink; in fresh water these are replaced by ion-absorbing cells, drinking stops, and the kidney increases its output of dilute urine. The switch is controlled by hormones — cortisol and growth hormone promote the seawater mode, prolactin the freshwater mode ([[animal-physiology/endocrine-control]]) — and takes days, which is why salmon pause in estuaries.

::: warning "Freshwater fish drink a lot of water" and "marine fish never drink, because sea water is salty"
It is the other way round. A freshwater fish is constantly flooded with water by osmosis across its gills and does not drink; its problem is getting rid of water while keeping salt, which it solves with copious dilute urine and active salt uptake. A marine teleost loses water by osmosis to the sea and must drink sea water to replace it, then excrete the extra salt through its gills. (Sharks, being iso- or slightly hyperosmotic to sea water through urea retention, do not need to drink at all.)
:::

## Life on land

On land the problem is evaporation. A terrestrial animal loses water from its skin and respiratory surfaces, in urine and in faeces, and gains it by drinking, from the water content of its food, and as **metabolic water**, produced when food is oxidised.

| fuel oxidised | metabolic water (g per g of fuel) | energy (kJ per g) | metabolic water (g per 100 kJ) |
|---|---|---|---|
| starch | 0.56 | 17.5 | 3.2 |
| fat | 1.07 | 39 | 2.7 |
| protein (to urea) | 0.40 | 17 | 2.4 |

Per gram, fat produces the most water, which is why camels' humps and the fat stores of migrating birds are sometimes described as water stores. Per unit of energy, however, carbohydrate yields slightly more, and the oxidation of fat requires more O₂ and hence more breathing, with more respiratory water loss. Fat is a dense energy store, not a better water source.

The champion of water economy among mammals is the kangaroo rat. Knut and Bodil Schmidt-Nielsen showed in the early 1950s that Merriam's kangaroo rat (*Dipodomys merriami*) can live indefinitely on dry seeds without drinking, getting most of its water as metabolic water. It does so by spending the day in a humid burrow, producing very concentrated urine and very dry faeces, and recovering water from its exhaled breath. Its nasal passages are cooled by evaporation during inhalation; when warm, moist air from the lungs is exhaled over them, water condenses and is reabsorbed — a countercurrent exchanger in time rather than space (K. Schmidt-Nielsen, F. R. Hainsworth and D. E. Murrish, 1970). Many birds, mammals and reptiles conserve respiratory water in the same way.

::: example A kangaroo rat's water budget {#ex-kangaroo-rat}
A 35 g kangaroo rat spends 35 kJ per day, all supplied by starch in dry seeds that contain 5 % water by mass. (a) How much metabolic water does it make? (b) How much free water does the food add (17.5 kJ per gram of starch, and assume the seeds are pure starch apart from their water)? (c) If its faeces and urine together lose 0.5 g of water per day, how much can it afford to lose by evaporation?
::: solution
(a) Starch eaten $= 35/17.5 = 2.0$ g; metabolic water $= 2.0 \times 0.56 = 1.1$ g per day.

(b) Seeds eaten $= 2.0/0.95 = 2.1$ g, containing $0.11$ g of water.

(c) Total water gain $= 1.12 + 0.11 = 1.23$ g per day; evaporation must be at most $1.23 - 0.5 = 0.7$ g per day, about 2 % of body mass. Respiratory water loss would be higher than this if the rat exhaled air saturated at body temperature; nasal cooling and a humid burrow keep it within the budget. (Illustrative values of the right order.)
:::
:::

Insects, with their small size and large surface-to-volume ratio, face the problem most acutely. Their cuticle is covered with a layer of waxes, which reduces water loss; their spiracles close between breaths ([[animal-physiology/gas-exchange]]); and their excretory system recovers water very efficiently, as described below. Some desert insects obtain water in remarkable ways: the Namib Desert beetle *Onymacris unguicularis* stands head-down on dune crests in the morning fog, so that water condenses on its back and runs down to its mouth (W. J. Hamilton and M. K. Seely, 1976), and larvae of the mealworm beetle *Tenebrio molitor* can absorb water vapour from air of moderate humidity through their rectum.

## Excretory organs

Despite their diversity, excretory organs mostly work in the same three steps.

::: definition The steps of urine formation {#def-urine}
- **Filtration** (or, in some organs, active secretion) produces a **primary urine**: in filtration, blood or haemolymph is forced by pressure across a barrier that retains cells and proteins but lets water and small solutes through.
- **Reabsorption** returns useful substances (glucose, amino acids, most ions and water) from the primary urine to the blood, by transport across the epithelium of the excretory tubule.
- **Secretion** adds substances from the blood to the urine (H⁺, K⁺, organic acids and bases, uric acid, foreign compounds).

The final urine is what remains. Because filtration is unselective, a filtration kidney can remove any small molecule, including ones the animal has never encountered, without needing a specific transporter for each.
:::

The main types are **protonephridia** (flatworms, rotifers, some annelid larvae), blind-ended tubules in which the beating cilia of "flame cells" draw fluid into the tubule; **metanephridia** (annelids, molluscs), open-ended tubules that drain fluid from the body cavity; the **antennal glands** of crustaceans; the **Malpighian tubules** of insects; and the **nephrons** of vertebrate kidneys.

### Insects: secretion instead of filtration

Insect Malpighian tubules are blind-ended tubes that float in the haemolymph and empty into the gut at the junction of midgut and hindgut. Because the haemolymph is at low pressure, they cannot filter it. Instead, as J. A. Ramsay showed in the 1950s, the tubule cells actively secrete K⁺ (and in some species Na⁺) into the lumen, followed by Cl⁻ and water; small solutes enter passively with the fluid, and uric acid is secreted. The primary urine passes into the hindgut, where the **rectal pads** reabsorb ions and water. In many desert beetles and in mealworms the tubules are wrapped tightly around the rectum (a **cryptonephric** arrangement), which lets the rectum extract water so effectively that the faeces leave as dry pellets.

### Vertebrate nephrons

The vertebrate nephron begins with a **glomerulus**, a tuft of capillaries inside a cup-shaped Bowman's capsule, where blood pressure drives filtration. The filtrate passes along a tubule — the **proximal tubule**, where in mammals about two-thirds of the filtered water and NaCl and nearly all the glucose and amino acids are reabsorbed iso-osmotically; in mammals and birds, the **loop of Henle**; the **distal tubule**; and the **collecting duct**, whose permeability to water is controlled by antidiuretic hormone (vasopressin in mammals, arginine vasotocin in other vertebrates), acting through the insertion of aquaporin water channels.

The kidney's function is measured by **clearance**: the volume of plasma that would have to be completely cleared of a substance per unit time to account for its rate of excretion.

::: proposition Renal clearance {#prop-clearance}
For a substance with plasma concentration $P_x$, urine concentration $U_x$ and urine flow rate $\dot V$, the **clearance** is

$$
C_x = \frac{U_x\,\dot V}{P_x}.
$$ {#eq-clearance}

For a substance that is freely filtered and neither reabsorbed nor secreted, such as the plant polysaccharide **inulin**, everything filtered is excreted, so its clearance equals the **glomerular filtration rate** (GFR). A substance with clearance less than the GFR is reabsorbed on balance; one with clearance greater than the GFR is secreted. The **fractional excretion** $U_x\dot V/(\mathrm{GFR}\cdot P_x)$ is the fraction of the filtered load that appears in the urine. Assumptions: steady state of plasma concentration, complete bladder emptying, and (for GFR) a marker that is truly filtered freely and not handled by the tubule.
:::

::: example Measuring filtration in a dog {#ex-clearance}
A 15 kg dog is infused with inulin to a steady plasma concentration of 0.20 mg mL⁻¹. Its urine contains 12 mg mL⁻¹ of inulin and is produced at 1.0 mL min⁻¹. Plasma Na⁺ is 145 mmol L⁻¹ and urinary Na⁺ is 100 mmol L⁻¹. (a) Calculate the GFR. (b) What fraction of the filtered water is excreted? (c) What fraction of the filtered Na⁺ is excreted?
::: solution
(a) $\mathrm{GFR} = 12 \times 1.0/0.20 = 60$ mL min⁻¹, or 4 mL min⁻¹ kg⁻¹, a typical value for a dog.

(b) $1.0/60 = 0.017$: less than 2 % of the filtered water is excreted; 98 % is reabsorbed.

(c) Filtered Na⁺ $= 0.060\ \mathrm{L\,min^{-1}} \times 145\ \mathrm{mmol\,L^{-1}} = 8.7$ mmol min⁻¹; excreted $= 0.0010$ L min⁻¹ × 100 mmol L⁻¹ $= 0.10$ mmol min⁻¹. Fractional excretion $= 0.10/8.7 = 0.011$, about 1 %. A kidney filters a huge volume and reabsorbs almost all of it; small changes in reabsorption therefore make large changes in excretion, which is how it regulates.
:::
:::

## Concentrating the urine: the countercurrent multiplier

Only mammals and birds can produce urine more concentrated than their blood, and they do it with the loop of Henle. The loop runs from the cortex down into the **medulla** and back again, alongside the collecting ducts.

The mechanism, proposed by Werner Kuhn and Karl Ryffel in 1942 and supported by the measurements of Heinrich Wirz, Bartholomäus Hargitay and Kuhn in 1951 on rat kidneys, which showed that osmolality rises steadily from cortex to the tip of the papilla, is called **countercurrent multiplication**:

1. The **thick ascending limb** of the loop actively transports NaCl out of the tubular fluid into the surrounding interstitium (through the Na⁺–K⁺–2Cl⁻ cotransporter NKCC2), but is impermeable to water. At any level, it can make the interstitium a limited amount — about 200 mOsm kg⁻¹ — more concentrated than the fluid inside it. This is the **single effect**.
2. The **descending limb** is permeable to water, so fluid flowing down it loses water to the more concentrated interstitium and becomes more concentrated, delivering more concentrated fluid to the bottom of the loop.
3. Because fluid flows down one limb and up the other, the single effect at each level is added to the concentration delivered from above, and the transverse difference of 200 mOsm kg⁻¹ is **multiplied** into a longitudinal gradient many times larger. The longer the loop, the greater the concentration at its tip.
4. The **collecting ducts** pass through this gradient on their way to the renal pelvis. When antidiuretic hormone makes them permeable to water, water leaves them by osmosis into the concentrated medulla, and the urine approaches the osmolality of the papillary tip. Urea, recycled between the collecting ducts and the loops, contributes much of the medullary osmolality in mammals.
5. The blood vessels of the medulla, the **vasa recta**, form hairpin loops too; as a countercurrent *exchanger* they carry away reabsorbed water without washing out the gradient.

The program below is the classic "staircase" demonstration of multiplication: alternate steps in which the ascending limb pumps solute out at each level and in which fluid moves one level onwards.

```python
# A step-by-step model of the countercurrent multiplier (the classic "staircase" demonstration).
# The loop is divided into n levels; level 0 is at the top (cortex), level n-1 at the bend.
# D[i]: osmolality (mOsm/kg) of the descending limb, which equilibrates with the interstitium
# at the same level; A[i]: osmolality of the ascending limb at that level.
def multiplier(n=10, single_effect=200.0, c_in=300.0, cycles=2000):
    D = [c_in] * n
    A = [c_in] * n
    for _ in range(cycles):
        # 1. pump: the ascending limb moves NaCl out until it is single_effect below the
        #    descending limb at the same level (solute conserved at each level)
        for i in range(n):
            mean = (D[i] + A[i]) / 2
            D[i], A[i] = mean + single_effect / 2, mean - single_effect / 2
        # 2. flow: fluid moves one level down the descending limb, round the bend and one
        #    level up the ascending limb; fluid at the top of the ascending limb leaves
        leaving = A[0]
        A = A[1:] + [D[-1]]
        D = [c_in] + D[:-1]
    return D, A, leaving

for n in (2, 5, 10, 20):
    D, A, out = multiplier(n=n)
    print(f"{n:2d} levels: bend {A[-1]:5.0f} mOsm/kg, fluid leaving the loop {out:4.0f} mOsm/kg")
#  2 levels: bend   700 mOsm/kg, fluid leaving the loop  300 mOsm/kg
#  5 levels: bend  1300 mOsm/kg, fluid leaving the loop  300 mOsm/kg
# 10 levels: bend  2300 mOsm/kg, fluid leaving the loop  300 mOsm/kg
# 20 levels: bend  4291 mOsm/kg, fluid leaving the loop  299 mOsm/kg
```

The concentration at the bend grows in proportion to the number of levels — that is, to the length of the loop — although the pump never makes more than a 200 mOsm kg⁻¹ difference at any one level. (This toy model moves solute but not water, and has no blood vessels to carry reabsorbed solute away, so at steady state fluid must leave the loop at the concentration it entered. In a real kidney, water leaves the descending limb, the vasa recta remove the reabsorbed NaCl and water, and fluid leaves the ascending limb more dilute than plasma, at about 100–150 mOsm kg⁻¹.)

The prediction that longer loops concentrate more is borne out across mammals. Desert rodents have long loops in a thick medulla, often extending into a long papilla that protrudes into the renal pelvis; Ivar Sperber (1944) noted that the **relative medullary thickness** correlates with concentrating ability, a correlation confirmed in larger, phylogenetically controlled data sets (C. A. Beuchat, 1990s). Maximum urine osmolalities range from about 500 mOsm kg⁻¹ in beavers, through 1200–1400 in humans, to over 5000 in kangaroo rats and about 9000 in the Australian hopping mouse *Notomys alexis* (R. E. MacMillen and A. K. Lee, 1967). Birds, whose kidneys contain a mixture of loopless "reptilian" nephrons and looped "mammalian" ones, reach only about two to three times plasma osmolality, but they reprocess their urine in the cloaca and hindgut and excrete much of their nitrogen as uric acid, which needs little water.

::: quiz
A mammal's collecting ducts become fully permeable to water. Which limits the maximum concentration of its urine?
- [ ] The concentration of the glomerular filtrate.
- [x] The osmolality of the interstitium at the tip of the medulla, set by the length of the loops of Henle and urea recycling.
- [ ] The rate of NaCl pumping in the proximal tubule.
- [ ] The osmolality of the fluid leaving the ascending limb.
::: solution
Water leaves the collecting duct by osmosis until the urine reaches osmotic equilibrium with the interstitium around it. The highest interstitial osmolality is at the tip of the medulla, built by countercurrent multiplication in the loops and by urea recycling. The filtrate is iso-osmotic to plasma, and the proximal tubule reabsorbs iso-osmotically, so neither sets the maximum.
:::
:::

## Salt glands

Seabirds, marine reptiles and some desert birds and reptiles cannot produce urine concentrated enough to excrete the salt in sea water or salty food, yet they drink sea water or eat salty prey. Knut Schmidt-Nielsen and colleagues discovered in 1958 that cormorants and gulls given salt water secrete a concentrated NaCl solution from **nasal salt glands** above their eyes, which drips from the tip of the beak. Avian salt glands secrete fluid with NaCl concentrations commonly 700–900 mmol L⁻¹, well above that of sea water, and higher still in some petrels. Marine reptiles evolved salt glands independently from different glands: lachrymal glands in sea turtles, sublingual glands in sea snakes, nasal glands in the marine iguana and many lizards, and lingual glands in saltwater crocodiles.

::: example Free water from the sea {#ex-salt-gland}
A gull drinks 100 mL of sea water containing 470 mmol L⁻¹ NaCl. (a) If its salt gland excretes the salt at 800 mmol L⁻¹, how much water does it need to excrete the salt, and how much water does it gain? (b) What would the result be if it could excrete salt only in urine at a maximum of 300 mmol L⁻¹?
::: solution
(a) Salt load $= 0.100 \times 470 = 47$ mmol. Volume of secretion $= 47/800 = 0.059$ L $= 59$ mL. Net gain $= 100 - 59 = 41$ mL of free water.

(b) Volume of urine $= 47/300 = 0.157$ L $= 157$ mL: a net *loss* of 57 mL. Drinking sea water would dehydrate the bird. The salt gland converts sea water into drinking water whenever it can secrete salt at a concentration above that of the water drunk.
:::
:::

::: widget plot
f: 1 - 470/x
x: 200, 1200
y: -1.5, 0.7
points: 800, 0.4125; 300, -0.5667
hlines: 0
vlines: 470
labels: \text{net water gained per litre of sea water drunk (L)}
caption: Net water gained (vertical axis, litres per litre of sea water drunk) against the NaCl concentration at which the animal can excrete salt (horizontal axis, mmol L⁻¹), for sea water at 470 mmol L⁻¹ (vertical line), as in [[#ex-salt-gland]]. The marked points are a gull's salt gland at 800 mmol L⁻¹ (a gain of 0.41 L) and a hypothetical kidney limited to 300 mmol L⁻¹ (a loss of 0.57 L). Only an excretory organ that can concentrate salt above the level in sea water turns sea water into a source of water. (The calculation ignores other solutes in sea water and in the excretion.)
:::

## Nitrogenous wastes

The breakdown of proteins and nucleic acids produces nitrogen, which animals excrete as ammonia, urea or uric acid ([[biochemistry/metabolic-integration#def-nitrogen]]). The choice follows water availability: ammonia, toxic but cheap, where water is plentiful to dilute it, as in most aquatic invertebrates and teleost fishes, which lose most of it across the gills; urea, safe and soluble but needing water to excrete, in mammals, most adult amphibians and elasmobranchs; and uric acid, almost insoluble and excreted as a paste, in birds, most reptiles and insects. The pattern can change within a life or with conditions. Tadpoles excrete ammonia and adult frogs urea; the African clawed frog *Xenopus*, which remains aquatic as an adult, stays largely ammonotelic, but switches towards urea if kept out of water. African lungfishes (*Protopterus*), when they aestivate in dried mud for months, switch from ammonia to urea, which accumulates harmlessly in their tissues (Homer Smith, 1930).

::: application Osmoregulation in aquaculture, conservation and medicine
Fish farming depends on osmoregulatory physiology: young salmon are transferred to sea pens only when they have undergone **smoltification**, the hormonally controlled preparation for sea water, and failure causes heavy losses. Conservation biologists monitor how amphibians, which take up water and ions across their skin, respond to acidification and salinisation of fresh waters. In humans, the kidney's handling of water and salt is central to blood-pressure regulation and fluid therapy, covered in [Medicine Atlas: renal](/learn/medicine/course.php?c=renal).
:::

::: history
Homer Smith's studies from 1930 of how fishes, lungfishes and frogs handle water and nitrogen made comparative renal physiology a field; his book *From Fish to Philosopher* (1953) argued that the vertebrate kidney evolved in fresh water. Ancel Keys and E. N. Willmer identified the chloride cells of eel gills in 1932, and August Krogh's *Osmotic Regulation in Aquatic Animals* (1939) established the active uptake of ions by freshwater animals. Werner Kuhn and Karl Ryffel proposed countercurrent multiplication in 1942, and Wirz, Hargitay and Kuhn confirmed the medullary gradient in 1951. J. A. Ramsay showed that insect Malpighian tubules secrete their urine (1950s). Knut and Bodil Schmidt-Nielsen studied the water economy of kangaroo rats and camels in the 1950s, and Knut Schmidt-Nielsen and colleagues discovered avian salt glands in 1958. The molecular era began with Peter Agre's discovery of aquaporin water channels in red cells in 1992 (Nobel Prize in Chemistry, 2003).
:::

## Where this leads

The kidney is controlled by hormones — antidiuretic hormone, aldosterone, natriuretic peptides, and in fishes cortisol and prolactin — taken up in [[animal-physiology/endocrine-control]]. The kidney's filtration depends on the blood pressure of [[animal-physiology/circulation]], and salt and water exchange at the gills is in tension with gas exchange ([[animal-physiology/gas-exchange]]).

::: summary
- Water moves by osmosis down gradients of osmotic pressure $\pi = cRT$ ([[#prop-vanthoff]]); sea water exerts about 24 atm, plasma against fresh water about 7 atm.
- Most marine invertebrates and hagfishes are osmoconformers, protecting cells with organic osmolytes; elasmobranchs match sea water with urea and TMAO and excrete salt with the rectal gland.
- Marine teleosts are hypo-osmotic: they drink sea water and excrete NaCl through gill ionocytes (NKCC1, CFTR-like channels, Na⁺/K⁺-ATPase).
- Freshwater animals are hyperosmotic: they do not drink, produce copious dilute urine and take up ions actively, at a minimum cost of $RT\ln(c_\mathrm{in}/c_\mathrm{out}) + zF\Delta\psi$ per mole ([[#prop-uptake-cost]]). Euryhaline fishes switch modes under hormonal control.
- Land animals balance evaporation, urine and faeces against drinking, preformed and metabolic water; kangaroo rats live on metabolic water with nasal water recovery and concentrated urine.
- Excretory organs filter (or secrete), reabsorb and secrete; insect Malpighian tubules secrete K⁺-rich primary urine, recovered in the rectum.
- Clearance $U\dot V/P$ measures kidney function; inulin clearance gives the GFR ([[#prop-clearance]]).
- Mammals and birds concentrate urine by countercurrent multiplication in the loop of Henle; maximum concentration rises with loop length and medullary thickness.
- Salt glands of seabirds and marine reptiles excrete NaCl more concentrated than sea water, turning sea water into a water source.
- Nitrogen is excreted as ammonia, urea or uric acid according to water availability, and some species switch.
:::

## Exercises

::: exercise Osmotic pressure {level=1 check="748"}
What is the osmotic pressure, in kPa (three significant figures), of a solution of 290 mOsm kg⁻¹ at 37 °C? Take $R = 8.314$ J mol⁻¹ K⁻¹ and treat 290 mOsm kg⁻¹ as 290 mol m⁻³.
::: solution
$\pi = 290 \times 8.314 \times 310.15 = 7.48\times10^5$ Pa $= 748$ kPa, about 7.4 atm.
:::
:::

::: exercise Clearance {level=1 check="125"}
A substance has plasma concentration 0.10 mg mL⁻¹, urine concentration 12.5 mg mL⁻¹ and urine flow 1.0 mL min⁻¹. What is its clearance in mL min⁻¹?
::: solution
$C = 12.5 \times 1.0/0.10 = 125$ mL min⁻¹.
:::
:::

::: exercise Who drinks? {level=1}
For each animal, say whether it drinks the water it lives in, and why: (a) a goldfish; (b) a cod; (c) a dogfish shark; (d) a sea gull; (e) a lobster.
::: solution
(a) No: as a freshwater teleost it gains water by osmosis and must excrete it. (b) Yes: as a marine teleost it is hypo-osmotic and loses water to the sea, replacing it by drinking and excreting the salt through its gills. (c) Essentially no: urea and TMAO make it iso- or slightly hyperosmotic, so it gains water slowly by osmosis. (d) Yes, it can drink sea water, because its salt glands excrete NaCl more concentrated than sea water. (e) Little: as an osmoconformer its body fluids are near sea water, so there is no osmotic water loss to replace (lobsters do swallow some water, especially when moulting).
:::
:::

::: exercise Reabsorption {level=2 check="0.99"}
A mammal has a GFR of 120 mL min⁻¹ and produces urine at 1.2 mL min⁻¹. What fraction of the filtered water does it reabsorb (two significant figures)? If antidiuretic hormone secretion falls and urine flow rises to 12 mL min⁻¹ with GFR unchanged, what fraction is reabsorbed now?
::: solution
$1 - 1.2/120 = 0.99$. With 12 mL min⁻¹: $1 - 12/120 = 0.90$. A change of only nine percentage points in reabsorption changes urine flow tenfold.
:::
:::

::: exercise A salmon goes to sea {level=2}
Describe the changes in drinking, gill ion transport, urine production and hormones when a young salmon moves from a river to the sea, and explain why each is needed. Why can it not make the change instantly?
::: solution
In the river it does not drink, its gill ionocytes take up Na⁺ and Cl⁻, and its kidney produces copious dilute urine, under the influence of prolactin. In the sea it begins to drink to replace osmotic water loss; its intestine absorbs NaCl and water; its gills develop seawater-type ionocytes with NKCC1, CFTR-like Cl⁻ channels and more Na⁺/K⁺-ATPase, which secrete NaCl; its urine output falls to small volumes, nearly iso-osmotic to plasma, carrying Mg²⁺ and SO₄²⁻; cortisol and growth hormone promote these changes. They require new gene expression, proliferation and differentiation of new ionocytes and remodelling of the gut and kidney, which take days to weeks. In wild salmon the preparation (smoltification) begins in fresh water before migration, triggered by day length and temperature, and the fish pause in estuaries of intermediate salinity.
:::
:::

::: exercise Interpreting a concentrating ability {level=2}
Four rodent species A–D have relative medullary thicknesses (medulla thickness relative to kidney size, dimensionless) and maximum urine osmolalities (mOsm kg⁻¹) as follows: A, 1.3, 520; B, 5.8, 2900; C, 8.5, 5500; D, 10.7, 9400 (illustrative values spanning the range from a beaver to a desert hopping mouse). (a) Describe the relation. (b) Explain it with the countercurrent multiplier. (c) Why is a four-species correlation weak evidence on its own, and what further evidence would you seek?
::: solution
(a) Maximum urine concentration increases with relative medullary thickness, roughly in proportion over this range. (b) A thicker medulla accommodates longer loops of Henle, which by countercurrent multiplication build a higher osmolality at the papillary tip; collecting-duct urine can equilibrate with this. (c) Four species give few independent points, and the species with the thickest medullae may share ancestry ([[animal-physiology/homeostasis#ex-phylogeny]]); body size, diet (protein intake affects urea load and urea recycling) and habitat are confounded. Better evidence would come from many species with phylogenetic correction, from within-species comparisons (e.g. populations from wet and dry habitats), and from experiments that change loop function (such as drugs that block NKCC2, which abolish concentrating ability).
:::
:::

::: exercise Metabolic water from fat and starch {level=2}
Using the table of metabolic water, compare a bird that fuels a long flight with fat with one that uses carbohydrate. (a) Calculate the metabolic water produced per 1000 kJ for each fuel. (b) Which fuel gives more water per unit energy? (c) Why do migrating birds nevertheless store fat?
::: solution
(a) Fat: $1000/39 = 25.6$ g of fat, $\times 1.07 = 27$ g of water. Starch (or glycogen): $1000/17.5 = 57$ g, $\times 0.56 = 32$ g of water. (b) Carbohydrate, slightly. (c) Fat stores about 39 kJ g⁻¹ and is stored nearly anhydrous, whereas glycogen is stored with about three times its mass of water, so its effective energy density is only about 4–5 kJ g⁻¹. For a flying animal, where every gram must be carried, fat is roughly eight to ten times better per gram of fuel stored; the water question is secondary, and flying birds lose water mainly by respiration, depending on altitude and air temperature.
:::
:::

::: exercise Why a shark is slightly saltier than the sea {level=3}
An elasmobranch has plasma osmolality 1050 mOsm kg⁻¹, of which about 350 mOsm kg⁻¹ is urea and 150 mOsm kg⁻¹ TMAO, in sea water of 1000 mOsm kg⁻¹. (a) Calculate the osmotic pressure difference at 15 °C and the direction of water movement. (b) Why is it an advantage to be slightly hyperosmotic? (c) The gills are permeable to urea to some degree. What costs does the urea strategy impose, and how are they reduced? (d) Why must TMAO accompany urea?
::: solution
(a) $\Delta\pi = 50 \times 2396 = 1.2\times10^5$ Pa $= 120$ kPa; water enters the shark by osmosis. (b) The osmotic gain provides the free water for urine formation without drinking sea water and without the salt load that drinking would bring. (c) Urea must be synthesised by the ornithine–urea cycle, costing about 4 ATP equivalents per urea ([[biochemistry/metabolic-integration]]), and some is lost by diffusion across the gills and in urine. Elasmobranch gills have low urea permeability (helped by the lipid composition of the gill membranes and by active back-transport of urea), and the kidney reabsorbs over 90 % of filtered urea with a complex countercurrent arrangement of tubules. (d) At several hundred mmol L⁻¹ urea destabilises the structure and alters the activity of many proteins; methylamines such as TMAO stabilise proteins, and at about 2:1 urea:methylamine the effects largely cancel (Yancey and Somero, 1979).
:::
:::

::: exercise A model of the multiplier {level=3}
Run (or reason through) the staircase program in this chapter. (a) Why does the concentration at the bend increase with the number of levels although the pump makes only a 200 mOsm kg⁻¹ difference at each level? (b) What would happen to the gradient if the ascending limb were permeable to water? (c) What would happen if the descending limb were impermeable to water and solute? (d) Loop diuretics block NKCC2 in the thick ascending limb. Predict their effect on urine volume and concentration.
::: solution
(a) At each level the pump adds the single effect to fluid already concentrated by all the levels above it; fluid then flows down to the next level carrying that concentration, where the pump adds another increment. Countercurrent flow means each level builds on the one before, so the total difference grows with the number of levels (with loop length). (b) Water would follow the NaCl out of the ascending limb, so no transverse osmotic difference could be maintained; the single effect would vanish and the gradient would collapse. (c) The descending limb could not equilibrate with the interstitium, so the concentrating effect would not be passed on to fluid flowing down; multiplication would fail (in the model, D would stay at the inflow concentration at every level). (d) With NKCC2 blocked there is no single effect, the medullary gradient dissipates, and the collecting ducts cannot extract water even with antidiuretic hormone: large volumes of urine of roughly plasma osmolality are produced — the basis of their clinical use, covered in [Medicine Atlas: renal](/learn/medicine/course.php?c=renal).
:::
:::
