An animal eats a few times a day but its brain needs glucose every second. A migrating bird flies for a week without feeding. A hibernating ground squirrel lives for months on stored fat, its body near freezing, waking every couple of weeks to rewarm. A maize plant fixes carbon in one kind of cell and turns it into sugar in another; a cactus opens its stomata only at night. In each case metabolism is not a set of separate pathways but a single integrated system, divided among tissues and organs (or cell types, or times of day) that specialise, store and exchange fuels, coordinated by hormones and nerves. This chapter puts the pathways of the course together.

We begin with the two pathways not yet covered in detail — the oxidation and synthesis of fatty acids, and the catabolism of amino acids with the disposal of their nitrogen — treating them, as before, from the biologist's side; their chemistry (β-oxidation, ketogenesis, the fatty-acid synthase, transamination and the urea cycle) is in [Chemistry Atlas: lipid and nitrogen metabolism](/learn/chemistry/lesson.php?c=biochemistry&l=lipid-nitrogen-metabolism). Then we follow a mammal through feeding, fasting and starvation, look at how organisms with extreme demands manage their fuels, and end with the integration of photosynthetic metabolism across cells in C4 and CAM plants.

## Fatty acids: burning and making

Triacylglycerol stored in adipose tissue ([[biochemistry/carbohydrates-lipids]]) is mobilised by lipases, which release fatty acids into the blood, where they travel bound to serum albumin. In muscle, heart, liver and many other tissues the fatty acids are activated to acyl-CoA in the cytosol, carried into mitochondria by the **carnitine shuttle** (carnitine palmitoyltransferase I, CPT1, on the outer membrane, is the controlled step), and broken down by **β-oxidation**, which removes two carbons at a time as acetyl-CoA and generates one FADH₂ and one NADH per cycle. Complete oxidation of palmitate (16:0) yields about 106 ATP — 6.6 per carbon, against 5.3 per carbon for glucose ([Chemistry Atlas](/learn/chemistry/lesson.php?c=biochemistry&l=lipid-nitrogen-metabolism)).

Fatty acids are made by a different pathway in a different compartment. Citrate from the mitochondria is split in the cytosol to acetyl-CoA, which acetyl-CoA carboxylase (ACC) converts to malonyl-CoA — the committed step — and the fatty-acid synthase builds palmitate by seven rounds of condensation and reduction, using NADPH ([[biochemistry/bioenergetics#ex-nadph]]).

::: definition Reciprocal control of fatty-acid synthesis and oxidation {#def-malonyl}
**Malonyl-CoA**, the first intermediate of fatty-acid synthesis, is an allosteric inhibitor of **carnitine palmitoyltransferase I**, the enzyme that admits long-chain fatty acids to the mitochondria for oxidation (J. D. McGarry, G. P. Mannaerts and D. W. Foster, 1977). When acetyl-CoA carboxylase is active, as after a carbohydrate meal under the influence of insulin, malonyl-CoA rises, fatty-acid synthesis proceeds and oxidation is blocked, so newly made fatty acids are not immediately burned. When ACC is inactivated by phosphorylation (by AMP-activated protein kinase, or by protein kinase A under glucagon), malonyl-CoA falls and oxidation is released.
:::

This is a general design principle: opposing pathways are separated in space or in time and controlled reciprocally by the same signals, so that the cell does not run futile cycles at full speed ([[biochemistry/enzyme-regulation]]). Philip Randle and colleagues (1963) showed a second interaction between fuels: when fatty acids are abundant, their oxidation in heart and muscle raises acetyl-CoA, NADH and citrate, which inhibit pyruvate dehydrogenase and phosphofructokinase, so the tissue burns fat and spares glucose — the **glucose–fatty acid cycle**.

### Which fuel is being burned? The respiratory quotient

Different fuels need different amounts of oxygen per CO₂ produced, because they contain different proportions of oxygen. This gives physiologists a way to see which fuel an animal is using by measuring its breathing.

::: proposition The respiratory quotient {#prop-rq}
The **respiratory quotient** RQ is the ratio of CO₂ produced to O₂ consumed (in moles or volumes) by complete oxidation of a fuel. From the balanced equations,

$$
\mathrm{C_6H_{12}O_6} + 6\,\mathrm{O_2} \to 6\,\mathrm{CO_2} + 6\,\mathrm{H_2O}\ \ (\mathrm{RQ} = 1.00),\qquad
\mathrm{C_{16}H_{32}O_2} + 23\,\mathrm{O_2} \to 16\,\mathrm{CO_2} + 16\,\mathrm{H_2O}\ \ (\mathrm{RQ} = 16/23 = 0.70).
$$ {#eq-rq}

Typical values are 1.0 for carbohydrate, about 0.70 for fat and about 0.8 for protein (whose nitrogen is excreted as urea). A whole-animal RQ between 0.7 and 1.0 indicates a mixture. Assumptions: steady state, so that the gases exchanged at the lungs or gills reflect those exchanged in the tissues (hyperventilation, acid–base changes and storage of CO₂ as bicarbonate break this), and complete oxidation (net synthesis of fat from carbohydrate gives RQ above 1).
:::

::: example Dividing the fuel mixture {#ex-rq}
A resting person has a non-protein RQ (after correcting for protein oxidation, from urinary nitrogen) of 0.85. What fraction of the oxygen is used to oxidise carbohydrate, and what fraction of the energy comes from carbohydrate? Use RQ = 1.00 and 0.696, and 21.1 and 19.6 kJ per litre of O₂, for carbohydrate and fat respectively.
::: solution
Let $f$ be the fraction of O₂ used for carbohydrate. Then $1.00f + 0.696(1-f) = 0.85$, so $f = (0.85 - 0.696)/0.304 = 0.507$. Energy from carbohydrate $= 21.1f/[21.1f + 19.6(1-f)] = 10.69/(10.69 + 9.67) = 0.525$. About half the energy comes from each fuel. After an overnight fast RQ is typically nearer 0.8 (more fat); during hard exercise it approaches 1.0 (mostly muscle glycogen); in a hibernating mammal it is close to 0.7 (almost pure fat).
:::
:::

::: widget plot
f: (x - 0.696)/0.304; 21.1*(x - 0.696)/(21.1*(x - 0.696) + 19.6*(1 - x))
x: 0.696, 1
y: 0, 1
labels: \text{fraction of O}_2\text{ used for carbohydrate}; \text{fraction of energy from carbohydrate}
vlines: 0.85
caption: Fuel use against the non-protein respiratory quotient (horizontal axis), from [[#prop-rq]]: the fraction of oxygen consumed in oxidising carbohydrate (straight line) and the fraction of energy supplied by carbohydrate (curve), using 21.1 and 19.6 kJ per litre of O₂ for carbohydrate and fat. The vertical line is the RQ of 0.85 in [[#ex-rq]]. Because the two fuels release similar energy per litre of O₂, the two curves nearly coincide; RQ alone gives a good estimate of the fuel mixture.
:::

Values of RQ above 1.0 appear when carbohydrate is converted to fat, which releases oxygen-rich carbon as CO₂ without consuming O₂. Geese and ducks being fattened, and migratory birds fuelling before departure, show RQs well above 1; hibernators preparing for winter do the same.

## Amino acids and the problem of nitrogen

Amino acids not needed for protein synthesis cannot be stored, so they are broken down. The first step for most is **transamination**: the amino group is transferred to α-ketoglutarate, forming glutamate, by pyridoxal-phosphate-dependent aminotransferases. Glutamate dehydrogenase then releases ammonia, and the carbon skeletons enter the central pathways — as pyruvate, oxaloacetate, α-ketoglutarate, succinyl-CoA or fumarate (**glucogenic** amino acids, which can supply carbon for gluconeogenesis), or as acetyl-CoA and acetoacetate (**ketogenic**; only leucine and lysine are exclusively ketogenic in mammals).

The ammonia is the problem. Ammonia (NH₃/NH₄⁺) is toxic: in mammals, concentrations of a fraction of a millimole per litre in blood disturb brain function. Animals have solved the problem of getting rid of it in three main ways, and the choice reflects water availability, development and evolutionary history.

::: definition Nitrogen-excretion strategies {#def-nitrogen}
**Ammonotelic** animals excrete nitrogen mainly as ammonia, which is cheap to make but must be removed quickly in large volumes of water: most aquatic invertebrates, teleost fishes and aquatic amphibian larvae, which lose it across the gills or skin. **Ureotelic** animals convert it to **urea**, CO(NH₂)₂, which is far less toxic and very soluble, at a cost of about 4 high-energy phosphates per urea: mammals, most adult amphibians, and sharks and rays (which also use it as an osmolyte, [[biochemistry/water-and-bonds]]). **Uricotelic** animals convert it to **uric acid**, which is poorly soluble and can be excreted as a nearly dry paste, at a higher energetic cost: birds, most reptiles, and terrestrial insects.
:::

| end product | N atoms per molecule | N content by mass | water needed per gram of N (approximate) |
|---|---|---|---|
| ammonia | 1 | 82 % | 300–500 mL |
| urea | 2 | 47 % | about 50 mL |
| uric acid | 4 | 33 % | about 10 mL |

(Water figures are commonly quoted approximations, for example in K. Schmidt-Nielsen, *Animal Physiology*, 5th ed., 1997.) The water requirement explains much of the distribution. Uric acid is the solution for animals that cannot afford water — insects and birds, with their small body size and high evaporative losses — and, as Joseph Needham argued in 1931, for embryos developing inside a shelled (**cleidoic**) egg, where ammonia or urea would accumulate to toxic levels in a closed space, while uric acid precipitates harmlessly.

::: example The water cost of excreting nitrogen {#ex-nitrogen}
Estimate the volume of water needed to excrete 1.0 g of nitrogen (a) as urea in urine at 0.60 mol L⁻¹ (a concentration within the range of mammalian urine), (b) as ammonia, if a fish's body fluids could tolerate excreting it at no more than 3 mmol L⁻¹ in the water passing its gills. Comment on the difference.
::: solution
(a) Each urea carries 2 N, so 1.0 g N $= 1.0/14.0 = 0.0714$ mol N $= 0.0357$ mol urea. At 0.60 mol L⁻¹ this needs $0.0357/0.60 = 0.060$ L, i.e. 60 mL — consistent with the figure in the table.
(b) $0.0714$ mol NH₃ at 0.003 mol L⁻¹ would need 23.8 L of water. A fish in a river has effectively unlimited water flowing over its gills, so the cost is nothing; a terrestrial animal could never supply it. Converting ammonia to urea costs energy but saves water by a factor of hundreds, and the extra cost of uric acid buys a further factor of five or so.
:::
:::

The strategy can change within a lifetime or a lineage, showing that it is regulated, not fixed. Frog tadpoles are ammonotelic; at metamorphosis, under thyroid hormone, the liver induces the urea-cycle enzymes and the adult becomes ureotelic (P. P. Cohen and G. W. Brown, 1960). African lungfish switch from ammonia to urea when they aestivate in dried mud. The gulf toadfish (*Opsanus beta*), a teleost, makes urea and releases it in pulses. Turtles show every pattern, from ammonotely in aquatic species to uricotely in desert tortoises.

The **urea cycle**, by which mammalian liver makes urea from ammonia, bicarbonate and the amino group of aspartate, was discovered by Hans Krebs and Kurt Henseleit in 1932 using slices of rat liver: they found that ornithine catalytically stimulated urea synthesis — the first metabolic cycle ever described, five years before the citric acid cycle. Its stoichiometry and cost are worked out in [Chemistry Atlas](/learn/chemistry/lesson.php?c=biochemistry&l=lipid-nitrogen-metabolism); inherited defects of urea-cycle enzymes belong to [Medicine Atlas: genetics](/learn/medicine/course.php?c=genetics).

## Division of labour among tissues

In a mammal, each major tissue has a characteristic metabolic profile, set by which enzymes and transporters it expresses.

| tissue | main fuels | stores | special roles |
|---|---|---|---|
| brain | glucose (about 120 g per day in an adult human); ketone bodies in prolonged starvation | almost none | about a fifth of resting O₂ use; cannot use fatty acids directly |
| red blood cells | glucose only, by glycolysis to lactate | none | no mitochondria |
| skeletal muscle | glucose, fatty acids, ketone bodies; glycogen in bursts | glycogen (about 400 g in total), some triacylglycerol | lacks glucose 6-phosphatase: its glycogen serves only itself |
| heart | fatty acids, lactate, ketone bodies, glucose | little | almost entirely aerobic |
| liver | amino acids, fatty acids | glycogen (about 100 g when fed) | releases glucose; makes ketone bodies, urea, lipoproteins; "glucostat" of the body |
| adipose tissue | glucose, fatty acids | triacylglycerol (about 15 kg in a lean adult) | releases fatty acids and glycerol; secretes leptin |

(Representative values for an adult human; Nelson and Cox, *Lehninger Principles of Biochemistry*, 8th ed., 2021.) Fuels move between tissues in exchange cycles.

- In the **Cori cycle** (Carl and Gerty Cori, 1929), lactate produced by glycolysis in working muscle and red cells is carried to the liver and converted back to glucose, which returns to the muscle.
- In the **glucose–alanine cycle** (Philip Felig, 1970), muscle transfers amino groups to pyruvate, exporting alanine; the liver makes glucose from its carbon and urea from its nitrogen.

::: example The cost of the Cori cycle {#ex-cori}
Muscle makes 2 ATP from each glucose it converts to 2 lactate. The liver spends the equivalent of 6 ATP (4 ATP and 2 GTP) to make one glucose from 2 lactate. What is the net cost of one turn of the cycle to the whole body, and why is it worth paying?
::: solution
Net cost $= 6 - 2 = 4$ ATP-equivalents per glucose cycled. The cycle shifts the oxygen-dependent part of the work from muscle to liver: during intense exercise the muscle can make ATP fast by glycolysis without oxygen, while the liver, working aerobically, pays the cost of regenerating glucose by oxidising fatty acids. It also recovers lactate's carbon instead of wasting it, and lets red cells, which have no mitochondria, live entirely on glucose. The energy comes ultimately from fat oxidised in the liver.
:::
:::

## Feeding, fasting and starvation

The hormonal switch between storage and mobilisation is set by the ratio of **insulin** (released by pancreatic β-cells when blood glucose rises, [[biochemistry/enzymes#ex-glucokinase]]) to the counter-regulatory hormones **glucagon** (from α-cells when glucose falls), **adrenaline** (in stress and exercise) and **cortisol** (in prolonged fasting). Insulin acts through a receptor tyrosine kinase and dephosphorylates key enzymes; glucagon and adrenaline act through cAMP and protein kinase A and phosphorylate them ([[cell-biology/cell-signalling]]).

| enzyme | effect of phosphorylation (glucagon/adrenaline) | result |
|---|---|---|
| glycogen phosphorylase | activated | glycogen breakdown |
| glycogen synthase | inactivated | no glycogen synthesis |
| PFK-2/FBPase-2 (liver) | kinase off, phosphatase on: fructose 2,6-bisphosphate falls | glycolysis slows, gluconeogenesis rises |
| pyruvate kinase (liver) | inactivated | phosphoenolpyruvate saved for gluconeogenesis |
| acetyl-CoA carboxylase | inactivated | fatty-acid synthesis stops, oxidation released |
| hormone-sensitive lipase (adipose) | activated | fatty acids released |

Over hours to days, the same hormones also change the *amounts* of enzymes by regulating transcription: fasting induces phosphoenolpyruvate carboxykinase and other gluconeogenic enzymes; feeding induces glucokinase and the lipogenic enzymes. The combination — fast covalent switches backed by slow changes in gene expression — is the multisite, multi-timescale control predicted by [[biochemistry/enzyme-regulation]].

### The stages of a fast

George Cahill and colleagues, in studies of volunteers fasting under medical supervision in the 1960s, described how human fuel use changes as a fast proceeds (G. F. Cahill, *New England Journal of Medicine* 282, 668, 1970).

1. **Absorptive state** (hours after a meal): glucose from the gut is used by all tissues; the excess is stored as glycogen in liver and muscle and converted to fat; amino acids replenish proteins.
2. **Post-absorptive state** (overnight): the liver maintains blood glucose by breaking down glycogen and, increasingly, by gluconeogenesis from lactate, glycerol and amino acids; muscle and heart switch to fatty acids.
3. **Early starvation** (days 2–3): liver glycogen is exhausted; gluconeogenesis from amino acids, drawn from muscle protein, supplies the brain; the liver converts fatty acids to **ketone bodies**.
4. **Prolonged starvation** (weeks): ketone bodies rise to several millimoles per litre and the brain adapts to obtain most of its energy from them (O. E. Owen and colleagues, *Journal of Clinical Investigation* 46, 1589, 1967), so its glucose requirement falls and protein breakdown falls from roughly 75 g to about 20 g per day.

::: example How long does the glucose last? {#ex-starvation}
An adult's liver holds about 100 g of glycogen after a meal, and the brain uses about 120 g of glucose per day. (a) How long could liver glycogen alone supply the brain? (b) A lean adult has 15 kg of fat (37 kJ g⁻¹) and spends about 8 MJ per day while fasting. If fat supplied all this energy, how long would it last? (c) Why does the brain's switch to ketone bodies matter for survival, given (b)?
::: solution
(a) $100/120\times24 = 20$ h — less than a day, even ignoring other glucose users.
(b) $15\,000\times37 = 555$ MJ, lasting $555/8 = 69$ days.
(c) The fat store could last two months, but fatty acids cannot be converted to glucose ([[biochemistry/glycolysis-tca#def-glyoxylate]]), and the brain cannot oxidise fatty acids. If the brain continued to need 120 g of glucose a day, gluconeogenesis from protein would consume muscle and other essential proteins long before the fat ran out. Ketone bodies — made from fat in the liver and oxidised by the brain — let fat supply the brain indirectly, spare protein, and extend survival to the limit set by the fat store. (This is physiology of fasting under study conditions, not guidance; see [Medicine Atlas](/learn/medicine/course.php?c=cell-biochemistry) for clinical aspects.)
:::
:::

::: warning "Fat is turned into sugar when sugar runs out"
In animals, the fatty-acid chains of triacylglycerol cannot be converted into glucose, because the pyruvate dehydrogenase reaction is irreversible and vertebrates lack the glyoxylate cycle. Only the glycerol backbone (about 10 % of the carbon of a triacylglycerol) is glucogenic. Glucose made during fasting comes from glycerol, lactate and amino acids — that is, partly from body protein. Plants, fungi and bacteria, which have the glyoxylate cycle, *can* convert fat into sugar, as germinating oil seeds do.
:::

The control of blood glucose and the disorders in which it fails — notably diabetes mellitus, where insulin is lacking or tissues fail to respond — are clinical subjects treated in [Medicine Atlas: endocrine](/learn/medicine/lesson.php?c=endocrine&l=diabetes).

## Metabolic extremes in animals

Comparative physiology shows the same pathways stretched to their limits.

- **Hibernation.** Small hibernators such as ground squirrels lower their metabolic rate in torpor to a few per cent of the basal rate and their body temperature to near 0–5 °C, living almost entirely on fat (RQ about 0.7). The fall in rate exceeds what cooling alone would give at a typical $Q_{10}$ ([[biochemistry/enzymes#def-q10]]), so metabolism is actively suppressed. Periodic arousals, in which brown adipose tissue rewarms the animal ([[biochemistry/oxidative-phosphorylation]]), consume much of the winter's energy budget.
- **Migration.** Migrating birds fuel their flight muscles mainly with fatty acids delivered from adipose tissue through the blood, at rates far higher than in mammalian muscle, helped by abundant fatty-acid binding and transport proteins. They also break down some protein, perhaps to supply water and glucogenic carbon.
- **Insect flight.** Insect flight muscles have among the highest metabolic rates known. Their fuels differ by group: flies and bees burn carbohydrate (trehalose and glycogen); locusts start on carbohydrate and switch to lipid on long flights (T. Weis-Fogh, 1952); the tsetse fly and the Colorado potato beetle burn the amino acid proline, partially oxidising it to alanine (E. Bursell, 1960s), which is then recycled to proline by the fat body.
- **Diving.** Seals and whales store oxygen bound to myoglobin in their muscles, at concentrations several times higher than in land mammals; during long dives they restrict blood flow to muscles and viscera, which shift towards fermentation, and clear the lactate on surfacing ([[animal-physiology/gas-exchange]]).

## Integration in plants: C4 and CAM photosynthesis

Plants integrate metabolism across cells and across the day, and the clearest examples arise from Rubisco's weakness with oxygen ([[biochemistry/enzymes#ex-rubisco]]). In the **C3** plants (most species), CO₂ is fixed by Rubisco in the Calvin–Benson cycle — worked out by Melvin Calvin, Andrew Benson, James Bassham and colleagues between 1946 and the mid-1950s by exposing the alga *Chlorella* to ¹⁴CO₂ for seconds and identifying the labelled compounds by paper chromatography; the first stable product was the three-carbon 3-phosphoglycerate (Calvin received the 1961 Nobel Prize in Chemistry). In warm, dry conditions, when stomata close to save water and the CO₂ inside the leaf falls, Rubisco's oxygenation and the photorespiration it starts become costly.

::: definition C4 and CAM photosynthesis {#def-c4}
In **C4 photosynthesis**, CO₂ is first fixed in mesophyll cells by phosphoenolpyruvate (PEP) carboxylase, which uses bicarbonate, has no oxygenase activity and a high affinity for its substrate, to form the four-carbon acid oxaloacetate (hence "C4"), converted to malate or aspartate. The C4 acid diffuses into **bundle-sheath** cells surrounding the veins, where it is decarboxylated, concentrating CO₂ around Rubisco to several times the atmospheric equilibrium level; the remaining three-carbon compound returns to the mesophyll and is rephosphorylated to PEP by pyruvate phosphate dikinase, at a cost of two high-energy phosphates. In **crassulacean acid metabolism** (CAM), the same two carboxylations are separated in *time* rather than space: stomata open at night, CO₂ is fixed by PEP carboxylase and stored as malic acid in the vacuole, and during the day, with stomata closed, malate is decarboxylated and the CO₂ fixed by Rubisco behind closed stomata.
:::

The C4 pathway was found by Hugo Kortschak and colleagues in sugar cane (1965) and worked out by Marshall Hatch and Roger Slack (1966). It has evolved independently more than 60 times in flowering plants (R. F. Sage and colleagues, 2011), in grasses such as maize, sugar cane, sorghum and millet and in several dicot families — a striking case of convergent evolution of a complex metabolic and anatomical trait. C4 plants are only about 3 % of plant species but account for roughly a quarter of terrestrial primary production, mostly in tropical grasslands. CAM occurs in cacti, agaves, pineapple, many orchids and bromeliads, and the Crassulaceae for which it is named.

::: example The energy price of a CO₂ pump {#ex-c4}
The Calvin–Benson cycle needs 3 ATP and 2 NADPH per CO₂ fixed. The C4 pathway adds 2 ATP per CO₂ for regenerating PEP. Calculate the ATP and NADPH needed per glucose made in a C3 and a C4 plant, ignoring photorespiration. Then explain when the C4 plant comes out ahead.
::: solution
Six CO₂ per glucose. C3: $6\times3 = 18$ ATP and $6\times2 = 12$ NADPH. C4: $6\times(3 + 2) = 30$ ATP and 12 NADPH — two-thirds more ATP. But in a C3 leaf at warm temperatures, oxygenation can occur at a third or more of the rate of carboxylation ([[biochemistry/enzymes#ex-rubisco]]), and each oxygenation wastes ATP and NADPH and releases fixed CO₂ in photorespiration. Above about 25–30 °C, in bright light and at low internal CO₂, the cost of photorespiration in C3 plants exceeds the cost of the C4 pump, and C4 plants are more efficient in their use of light. Because they can keep their stomata narrower for the same rate of photosynthesis, they also lose less water per CO₂ fixed. In cool, shaded conditions the C3 plant wins. The geography of C3 and C4 grasses follows this trade-off. Light- and CO₂-response curves of the two types are developed in [[plant-biology/c4-and-cam]].
:::
:::

::: quiz
Which of the following would be expected in a mammal after three weeks of total fasting?
- [ ] Blood glucose near zero, because liver glycogen is exhausted.
- [ ] Brain energy supplied mostly by fatty acids carried in the blood.
- [x] High blood ketone bodies supplying much of the brain's energy, and reduced breakdown of muscle protein compared with the first days of the fast.
- [ ] Respiratory quotient near 1.0, because gluconeogenesis is maximal.
::: solution
Blood glucose is kept close to normal by gluconeogenesis from glycerol, lactate and amino acids. The brain cannot oxidise fatty acids, but after weeks of starvation it obtains most of its energy from ketone bodies, which reduces its glucose requirement and spares protein. With fat as the main fuel, the RQ is near 0.7.
:::
:::

::: application Metabolism in agriculture and conservation
Integration of metabolism matters well beyond physiology. Ruminant livestock live on the fermentation products of their gut microbes ([[biochemistry/glycolysis-tca]]): their tissues absorb little glucose, and their livers make almost all of their blood glucose by gluconeogenesis from propionate. The world's most productive crops — maize, sugar cane, sorghum — are C4 plants, and international projects are attempting to engineer a C4 mechanism into rice to raise its yield ([[biotechnology]]). Conservation biologists use body-condition and fat-store measurements to judge whether migratory birds can complete their journeys, and the loss of stopover sites where they refuel is a major threat to shorebird populations ([[conservation-biology]]).
:::

::: history
Claude Bernard discovered that the liver makes and stores glycogen and releases glucose (1848–57). Carl and Gerty Cori described the cycle of lactate and glucose between muscle and liver in 1929 (Nobel Prize in Physiology or Medicine, 1947, with Bernardo Houssay). Krebs and Henseleit discovered the urea cycle in 1932. Frederick Banting and Charles Best extracted insulin in 1921–22, and glucagon was named by C. P. Kimball and John Murlin in 1923. Calvin, Benson and Bassham worked out the photosynthetic carbon cycle between 1946 and the mid-1950s. Owen and Cahill showed the brain's use of ketone bodies in starvation in 1967; Randle described the glucose–fatty acid cycle in 1963; McGarry and Foster discovered the inhibition of fatty-acid oxidation by malonyl-CoA in 1977. Kortschak (1965) and Hatch and Slack (1966) discovered C4 photosynthesis.
:::

## Where this leads

This chapter ends the course but opens several others. The control of gene expression that underlies long-term metabolic adaptation is in [[molecular-biology/eukaryotic-gene-regulation]] and [[molecular-biology/bacterial-gene-regulation]]; whole-network models of metabolism, flux balance analysis and their engineering in [[systems-biology/metabolic-networks]]; the physiology of energy balance and temperature regulation in [[animal-physiology/energy-metabolism]] and [[animal-physiology/thermoregulation]]; photosynthesis in [[plant-biology/photosynthesis]]; and the metabolic diversity of microbes in [[microbiology/microbial-metabolism]].

::: summary
- Fatty acids are oxidised in mitochondria (entry via CPT1) and made in the cytosol from malonyl-CoA; malonyl-CoA inhibits CPT1, so synthesis and oxidation are reciprocally controlled. The Randle cycle lets fat oxidation spare glucose.
- The respiratory quotient (1.0 carbohydrate, 0.70 fat, about 0.8 protein) reveals the fuel mixture; RQ 0.85 means about half the energy from each.
- Ammonia from amino-acid catabolism is excreted as ammonia (aquatic animals), urea (mammals, adult amphibians, sharks; about 50 mL water per g N) or uric acid (birds, reptiles, insects; about 10 mL per g N); the strategy can switch during development.
- Tissues specialise: brain on glucose (120 g per day) or ketones, red cells on glycolysis, muscle with a private glycogen store, liver as glucostat, adipose tissue as the fat store; fuels circulate in the Cori and glucose–alanine cycles.
- Insulin versus glucagon and adrenaline switch enzymes by (de)phosphorylation within minutes and change their amounts over hours. In fasting, liver glycogen lasts about a day; the switch of the brain to ketone bodies spares protein and extends survival to the limit set by fat.
- Fatty-acid chains cannot become glucose in animals; plants and microbes with the glyoxylate cycle can.
- C4 plants fix CO₂ first by PEP carboxylase in mesophyll and concentrate it around Rubisco in bundle sheath (30 rather than 18 ATP per glucose, but no photorespiration); CAM separates the same steps between night and day.
:::

## Exercises

::: exercise The RQ of a triacylglycerol {level=1 check="0.703"}
Tripalmitin, C₅₁H₉₈O₆, is oxidised completely: $\mathrm{C_{51}H_{98}O_6} + 72.5\,\mathrm{O_2} \to 51\,\mathrm{CO_2} + 49\,\mathrm{H_2O}$. What is its RQ (three significant figures)?
::: solution
$51/72.5 = 0.703$, slightly above that of free palmitic acid (0.696) because of the glycerol.
:::
:::

::: exercise Nitrogen in uric acid {level=1 check="0.333"}
What fraction of the mass of uric acid, C₅H₄N₄O₃ (molar mass 168.1 g mol⁻¹), is nitrogen (three significant figures)?
::: solution
$4\times14.007/168.1 = 56.03/168.1 = 0.333$.
:::
:::

::: exercise Fuel from RQ {level=1 check="0.342"}
A non-protein RQ of 0.80 is measured. What fraction of the oxygen consumed is used to oxidise carbohydrate (three significant figures)?
::: solution
$(0.80 - 0.696)/0.304 = 0.342$.
:::
:::

::: exercise The ATP cost of C4 {level=2 check="1.67"}
Using [[#ex-c4]], by what factor does the ATP requirement per glucose of a C4 plant exceed that of a C3 plant, ignoring photorespiration (three significant figures)?
::: solution
$30/18 = 1.67$.
:::
:::

::: exercise Urea in a concentrated urine {level=2 check="29.8"}
Desert rodents such as kangaroo rats can produce urine with urea at about 1.2 mol L⁻¹. How much water (mL) do they need to excrete 1.0 g of nitrogen as urea at this concentration (three significant figures)?
::: solution
1.0 g N is $0.0714$ mol N $= 0.0357$ mol urea, so $0.0357/1.2 = 0.0298$ L $= 29.8$ mL — half the volume needed at 0.6 mol L⁻¹, one of the adaptations that let these animals live without drinking.
:::
:::

::: exercise Which tissue? {level=2}
For each observation, name the tissue and explain the biochemistry: (a) it releases glucose into the blood from its glycogen, but another tissue with twice as much glycogen cannot; (b) it cannot use fatty acids or ketone bodies at all; (c) it takes up glucose after a meal in an insulin-dependent way and stores the carbon as fat; (d) its RQ rises above 1 before a migration.
::: solution
(a) Liver: it has glucose 6-phosphatase, which converts glucose 6-phosphate from glycogenolysis into free glucose; muscle lacks it, so its glycogen is used only locally. (b) Red blood cells: they have no mitochondria, so they cannot carry out β-oxidation or oxidise ketone bodies, and live by glycolysis to lactate. (c) Adipose tissue (and muscle for the uptake): insulin recruits GLUT4 transporters to the plasma membrane; adipocytes convert glucose to glycerol 3-phosphate and, with liver, to fatty acids, stored as triacylglycerol. (d) Liver and adipose tissue of a fattening bird: net conversion of carbohydrate to fat releases CO₂ without consuming O₂, so whole-body RQ exceeds 1.
:::
:::

::: exercise A fasting budget {level=2}
In the first days of a fast, a human breaks down about 75 g of protein per day, mainly to supply carbon for gluconeogenesis. (a) Why is this a problem if it continues? (b) After several weeks protein breakdown falls to about 20 g per day. Explain the change. (c) How would you expect the urinary excretion of urea and of ammonium to change over the same period, and why?
::: solution
(a) Body protein is not a store but functional tissue — muscle, enzymes, antibodies; losing it at 75 g per day would deplete critical functions within weeks, well before the fat ran out. (b) As ketone bodies rise, the brain adapts to oxidise them, so it needs much less glucose; gluconeogenesis, and with it protein breakdown, falls. (c) Urea excretion falls in parallel with protein breakdown. Ammonium excretion by the kidney rises, because the kidney excretes NH₄⁺ to balance the acid load of the ketone bodies (ketoacids), using glutamine as its nitrogen source; the kidney also becomes an important site of gluconeogenesis in prolonged fasting.
:::
:::

::: exercise Interpreting a fuel-switch experiment {level=3}
Locusts are flown on a tethered flight mill and samples of haemolymph are taken. In the first 10 minutes haemolymph trehalose falls by half and the RQ of the whole insect is close to 1.0; after 30 minutes trehalose stabilises at a low level, haemolymph diacylglycerol rises several-fold, and RQ falls to about 0.75. Injecting a hormone extract from the corpora cardiaca (a neuroendocrine gland) into resting locusts raises their haemolymph diacylglycerol. (a) Describe the fuel switch. (b) Why is it adaptive for a long-distance flier? (c) What does the hormone experiment suggest, and what control experiment is needed?
::: solution
(a) Flight begins on carbohydrate (trehalose and muscle glycogen; RQ 1.0) and switches to lipid (RQ near 0.7–0.75), mobilised as diacylglycerol from the fat body. (b) Carbohydrate is available instantly but stored in small amounts and with water; fat is the high-energy-density store ([[biochemistry/carbohydrates-lipids]]) needed for flights of hours, so switching early conserves carbohydrate and exploits fat. (c) A hormone from the corpora cardiaca (now known as adipokinetic hormone, AKH, an insect analogue of glucagon) mobilises lipid from the fat body. Control: inject an extract of a different tissue, or heat-inactivated extract, in the same volume, to show the effect is specific to the hormone rather than to injection stress; a dose–response would strengthen the conclusion.
:::
:::

::: exercise C3 or C4? {level=3}
Two grasses grow together in a temperate grassland. In early spring, species A grows faster; in midsummer, species B grows faster. Leaves of B have veins closely surrounded by large, chloroplast-rich bundle-sheath cells; leaves of A do not. A pulse of ¹⁴CO₂ given to B labels malate and aspartate within 5 seconds; in A the first labelled compound is 3-phosphoglycerate. (a) Which species is C4? Give three lines of evidence. (b) Explain the seasonal pattern. (c) Predict how the two species would respond to an experimental doubling of atmospheric CO₂, and why.
::: solution
(a) B is C4: Kranz anatomy (prominent bundle sheath), first labelled products C4 acids rather than 3-PGA (Hatch and Slack's criterion), and better growth in hot conditions. (b) In cool spring weather photorespiration is modest and the C3 species avoids the extra 2 ATP per CO₂ of the C4 pump, so it is more efficient; in hot midsummer, C3 photorespiration rises and stomatal closure lowers internal CO₂, so the C4 species, whose Rubisco works at high CO₂ and which loses less water per CO₂ fixed, grows faster. (c) Doubling CO₂ should benefit the C3 species more, because it raises the carboxylation-to-oxygenation ratio of its Rubisco ([[biochemistry/enzymes#eq-competition]]) and suppresses photorespiration, whereas the C4 species' Rubisco is already near CO₂ saturation. Elevated-CO₂ field experiments have generally found larger growth responses in C3 than in C4 plants, although water savings let C4 plants benefit somewhat under drought.
:::
:::
