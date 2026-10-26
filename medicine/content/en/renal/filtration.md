Every minute about a fifth of the blood pumped by the heart passes through two organs that together weigh about 300 g. The kidneys do not need this flow for their own metabolism. They need it because their first job is to filter the plasma, and a filter is only as useful as the volume it can process. In a healthy young adult the glomeruli produce about 180 litres of filtrate a day. Almost all of it is reabsorbed further down the nephron, leaving one to two litres of urine.

This lesson covers the first step: how blood reaches the glomerulus, what the filtration barrier lets through, which forces drive filtration and how the kidney keeps filtration steady when blood pressure changes. It then turns to measurement. Glomerular filtration rate (GFR) is the single most useful number in renal medicine, yet it is almost never measured directly. Understanding how it is estimated, and when the estimate misleads, prevents real harm at the bedside. The lesson ends with the urine tests that reveal glomerular damage before blood tests change.

The tubule that receives the filtrate is the subject of [[renal/tubular-function]]. The anatomy of the kidneys and their vessels is in [[anatomy/abdomen]], and the body fluid compartments are in [[physiology/homeostasis-body-fluids]].

## Blood supply and the nephron

Each renal artery divides into segmental, interlobar, arcuate and interlobular arteries. The interlobular arteries give off **afferent arterioles**, each of which feeds one glomerulus. Blood leaves the glomerulus not through a venule but through a second arteriole, the **efferent arteriole**. This arrangement of two resistance vessels in series, with a capillary bed between them, is unusual and is the key to how the kidney controls filtration.

After the efferent arteriole the blood enters a second capillary network. Around the cortical tubules this is the **peritubular capillary** network, which takes back the fluid reabsorbed by the tubule. Efferent arterioles from glomeruli near the medulla also give rise to long, hairpin-shaped vessels, the **vasa recta**, which supply the medulla without washing away its concentration gradient.

::: definition Renal blood flow and the nephron {#def-flow}
**Renal blood flow** (RBF) is about 1.1 L/min in a resting adult, roughly 20–25% of the cardiac output. **Renal plasma flow** (RPF) is the plasma part of that flow, RBF × (1 − haematocrit), about 600–650 mL/min.

The **nephron** is the functional unit of the kidney: a glomerulus with its Bowman's capsule, followed by the proximal tubule, the loop of Henle, the distal convoluted tubule and the connecting tubule, which drains into a collecting duct. A human kidney contains on average about one million nephrons, with wide variation between people. **Cortical nephrons** have glomeruli in the outer cortex and short loops; **juxtamedullary nephrons** have glomeruli near the medulla and long loops that dip deep into it.

The **filtration fraction** is the fraction of the plasma entering the glomeruli that is filtered:

$$
\text{FF} = \frac{\text{GFR}}{\text{RPF}} \approx \frac{125}{650} \approx 0.2
$$ {#eq-ff}
:::

The high flow has two consequences. First, the kidney receives far more oxygen than it consumes, so the renal venous blood is relatively well oxygenated. Second, the medulla is the exception: the vasa recta carry only a small share of the flow, and the outer medulla works close to the limit of its oxygen supply. That is one reason the thick ascending limb and the straight part of the proximal tubule are injured first when perfusion falls ([[renal/acute-kidney-injury]]).

The **juxtaglomerular apparatus** sits where the thick ascending limb of the same nephron returns to touch its own glomerulus. It has three parts: the **macula densa**, a patch of tubular cells that senses the sodium chloride concentration in the tubular fluid; the **granular (juxtaglomerular) cells** in the wall of the afferent arteriole, which store and release renin; and the extraglomerular mesangial cells between them. This small structure links the tubule back to the blood supply that feeds it.

## The filtration barrier

Filtrate has to cross three layers to get from the glomerular capillary into Bowman's space.

1. The **fenestrated endothelium**. The capillary wall is perforated by pores about 70–100 nm across, covered by a negatively charged glycocalyx. Blood cells cannot pass, but plasma can.
2. The **glomerular basement membrane** (GBM). This is a dense mesh of type IV collagen, laminin and negatively charged proteoglycans such as heparan sulphate, shared by the endothelium and the podocytes.
3. The **podocytes**. These epithelial cells wrap the capillary with interdigitating foot processes. The gaps between foot processes are bridged by the **slit diaphragm**, a zipper-like structure built from proteins including nephrin and podocin.

::: definition Glomerular filtration barrier {#def-barrier}
The **glomerular filtration barrier** is the fenestrated endothelium, the glomerular basement membrane and the podocyte slit diaphragm acting together. It restricts molecules by **size** and, to a lesser extent, by **charge**. Water, electrolytes, glucose, urea and creatinine pass freely. Molecules smaller than about 2 nm in radius are filtered almost freely; above about 4 nm virtually nothing passes. Albumin (radius about 3.6 nm, negatively charged) is largely held back, so normal filtrate contains only a small amount, which the proximal tubule reabsorbs.
:::

Damage to any layer lets protein through. Mutations in the genes for nephrin (*NPHS1*) cause congenital nephrotic syndrome, which shows how much the slit diaphragm matters. Mutations in type IV collagen chains cause Alport syndrome, in which the GBM splits and the person develops haematuria, progressive kidney disease and often deafness. In adults, podocyte injury underlies minimal change disease, focal segmental glomerulosclerosis and diabetic kidney disease, which are covered in [[renal/chronic-kidney-disease]].

The **mesangium** sits between the capillary loops. Mesangial cells support the tuft, can contract, and clear trapped proteins. Immune complexes that lodge here are the starting point of IgA nephropathy, the most common primary glomerulonephritis worldwide.

## The forces that drive filtration

Filtration across the glomerular capillary obeys the same Starling principle that governs fluid exchange in every capillary. Two hydrostatic pressures and two oncotic pressures act across the wall.

::: theorem Starling forces at the glomerulus {#thm-starling}
Glomerular filtration rate is the product of the **ultrafiltration coefficient** $K_f$ and the **net filtration pressure**:

$$
\text{GFR} = K_f \left[ (P_{GC} - P_{BS}) - (\pi_{GC} - \pi_{BS}) \right]
$$ {#eq-starling}

Here $P_{GC}$ is the hydrostatic pressure in the glomerular capillary, $P_{BS}$ the hydrostatic pressure in Bowman's space, $\pi_{GC}$ the oncotic pressure of plasma proteins in the capillary and $\pi_{BS}$ the oncotic pressure in Bowman's space, which is close to zero because the filtrate is almost protein-free. $K_f$ is the product of the water permeability of the barrier and its surface area.
:::

::: proof
Typical textbook values for a human glomerulus are $P_{GC} \approx 60$ mmHg, $P_{BS} \approx 18$ mmHg and a mean $\pi_{GC} \approx 32$ mmHg, giving a net filtration pressure of about 10 mmHg. With $K_f \approx 12.5$ mL/min per mmHg this gives a GFR of about 125 mL/min.

Two features differ from a muscle capillary. The glomerular hydrostatic pressure is high and almost constant along the capillary, because the efferent arteriole downstream is a resistance vessel that holds the pressure up. And because about a fifth of the plasma water is removed as the blood passes along the tuft, while the protein stays behind, the protein concentration and therefore $\pi_{GC}$ rise from the afferent to the efferent end. Net filtration pressure is highest where blood enters and falls along the capillary. Anything that slows plasma flow lets $\pi_{GC}$ rise further and earlier, so GFR depends on plasma flow as well as on pressure.
:::

::: example Starling forces at both ends {#ex-starling}
In a glomerulus, $P_{GC}$ is 60 mmHg throughout and $P_{BS}$ is 18 mmHg. The oncotic pressure is 28 mmHg at the afferent end and 36 mmHg at the efferent end. Calculate the net filtration pressure at each end and explain the difference.
::: solution
At the afferent end: $60 - 18 - 28 = 14$ mmHg.

At the efferent end: $60 - 18 - 36 = 6$ mmHg.

The hydrostatic terms are the same at both ends, so the whole difference comes from the oncotic pressure. Filtration removes protein-free water, which concentrates the proteins left in the capillary, so the force opposing filtration grows along the tuft. The average driving pressure, about 10 mmHg, is small. That is why the glomerulus needs a very large, very permeable surface (a high $K_f$) to filter 125 mL every minute.
:::
:::

The equation explains most of the ways disease changes GFR.

- **A fall in $K_f$**: loss of filtering surface in glomerulonephritis or diabetic sclerosis, or mesangial contraction.
- **A fall in $P_{GC}$**: low blood pressure, afferent constriction (by NSAIDs removing prostaglandin dilation, by ciclosporin or by noradrenaline in shock), or efferent dilation (by ACE inhibitors or angiotensin receptor blockers).
- **A rise in $P_{BS}$**: obstruction of the urinary tract transmits pressure back up the tubule to Bowman's space.
- **A rise in $\pi_{GC}$**: severe dehydration with haemoconcentration, or a high plasma protein concentration such as in myeloma.

The two arterioles act like two taps. Constricting the **afferent** arteriole reduces both flow and glomerular pressure, so GFR falls. Constricting the **efferent** arteriole raises glomerular pressure, so GFR rises at first; but it also reduces flow, so with strong constriction the oncotic pressure climbs fast and GFR falls again.

## Keeping GFR steady: autoregulation

If GFR followed blood pressure directly, a person who stood up, ran for a bus or slept would change their urine output, and their salt balance, several-fold. In fact renal blood flow and GFR stay nearly constant across a wide range of mean arterial pressure.

::: definition Renal autoregulation {#def-autoregulation}
**Autoregulation** is the intrinsic ability of the kidney to keep renal blood flow and GFR roughly constant when mean arterial pressure varies between about 80 and 180 mmHg. It depends on two mechanisms that act on the afferent arteriole:

- the **myogenic response**: smooth muscle in the afferent arteriole contracts when stretched by a rise in pressure, and relaxes when pressure falls;
- **tubuloglomerular feedback**: when GFR rises, more sodium chloride reaches the macula densa; the macula densa then signals (mainly through adenosine and ATP) for the afferent arteriole of the same nephron to constrict, bringing GFR back down.
:::

Outside the autoregulatory range, and in chronic hypertension where the range shifts upwards, flow follows pressure. A person with long-standing hypertension may lose GFR when their pressure is lowered quickly to a level that a healthy kidney would tolerate.

Hormones and nerves act on top of autoregulation.

- **Angiotensin II** constricts both arterioles, but the efferent arteriole is more sensitive. When perfusion is low, angiotensin II therefore protects GFR by holding up glomerular pressure.
- **Prostaglandins** (PGE₂ and PGI₂) dilate the afferent arteriole. They matter little in health but become essential when the kidney is under-perfused, in heart failure, cirrhosis, volume depletion or chronic kidney disease.
- **Sympathetic nerves** constrict the afferent arteriole and stimulate renin release. In shock they can cut renal blood flow sharply.
- **Atrial natriuretic peptide** dilates the afferent and constricts the efferent arteriole, raising GFR.

This explains the best-known drug interaction in nephrology.

::: example The triple whammy {#ex-triple}
A 71-year-old woman with heart failure takes ramipril and furosemide. She buys ibuprofen for knee pain. A week later she has diarrhoea for three days. Her creatinine rises from 105 to 290 µmol/L. Explain the mechanism.
::: solution
Three things have happened, each removing one defence of glomerular pressure.

1. **Volume depletion** from diuretic and diarrhoea lowers renal perfusion. In this state GFR depends on afferent dilation by prostaglandins and on efferent constriction by angiotensin II.
2. **Ibuprofen** blocks cyclo-oxygenase and removes prostaglandin dilation of the afferent arteriole, so less blood enters the glomerulus.
3. **Ramipril** prevents angiotensin II formation, so the efferent arteriole relaxes and glomerular pressure falls further.

Glomerular pressure collapses and GFR falls. This combination of a diuretic, an ACE inhibitor or angiotensin receptor blocker, and an NSAID is called the **triple whammy**. The usual response is to stop the NSAID, restore volume, and temporarily withhold the ACE inhibitor and diuretic while she is unwell, following local acute kidney injury guidance. The broader lesson is the **sick day** advice given to people on these drugs: to pause them during an illness with dehydration, and to restart once they are eating and drinking normally.
:::
:::

## Measuring kidney function

### Clearance

The kidney's handling of any substance can be described by its clearance.

::: definition Renal clearance {#def-clearance}
The **renal clearance** of a substance $x$ is the volume of plasma from which the kidneys remove all of $x$ per unit time:

$$
C_x = \frac{U_x \times V}{P_x}
$$ {#eq-clearance}

where $U_x$ is the urine concentration, $V$ the urine flow rate and $P_x$ the plasma concentration. Clearance has units of volume per time, usually mL/min.
:::

Clearance is a way of comparing the amount excreted with the amount filtered.

::: theorem What clearance reveals {#thm-clearance}
If a substance is freely filtered and neither reabsorbed nor secreted by the tubule, its clearance equals the GFR. If its clearance is lower than the GFR, there is net reabsorption; if it is higher, there is net secretion.
:::

::: proof
The amount filtered per minute (the **filtered load**) is $\text{GFR} \times P_x$ for a freely filtered substance. The amount excreted per minute is $U_x \times V$. If the tubule neither adds nor removes the substance, the two are equal: $\text{GFR} \times P_x = U_x V$, so $\text{GFR} = U_x V / P_x = C_x$. Any reabsorption makes the excreted amount smaller than the filtered load, so $C_x < \text{GFR}$; any secretion makes it larger, so $C_x > \text{GFR}$.
:::

**Inulin**, a plant fructose polymer, behaves exactly like this, and its clearance is the reference measurement of GFR. Glucose clearance is normally zero, because all filtered glucose is reabsorbed. **Para-aminohippurate** (PAH) is filtered and so vigorously secreted that almost none stays in the renal venous plasma, so its clearance approximates the renal plasma flow. In practice, measured GFR today uses the plasma clearance of an injected marker such as iohexol or ⁵¹Cr-EDTA. It is reserved for situations where an accurate value really matters, such as assessing a potential living kidney donor or dosing a toxic drug.

### Creatinine and estimated GFR

Creatinine is made at a fairly steady rate from creatine in muscle. It is freely filtered and not reabsorbed, but about 10–20% of urinary creatinine is secreted by the proximal tubule. Creatinine clearance from a timed urine collection therefore slightly overestimates GFR, and the error grows as GFR falls.

At steady state, creatinine production $G$ equals excretion, which is roughly $\text{GFR} \times P_{Cr}$. Therefore

$$
P_{Cr} \approx \frac{G}{\text{GFR}}
$$ {#eq-hyperbola}

Plasma creatinine is inversely proportional to GFR. The relationship is a hyperbola, and that shape has important consequences.

::: widget plot
f: 9600*m/x; 9600/x
x: 5, 150
y: 0, 800
sliders: m=1:0.4:1.6:0.05
hlines: 80
labels: \text{creatinine, muscle factor } m;\ \text{creatinine, average muscle}
caption: Steady-state plasma creatinine (µmol/L) against GFR (mL/min), from $P_{Cr} = G/\text{GFR}$ with a creatinine production of about 14 mmol/day. Falling from a GFR of 120 to 60 only moves creatinine from 80 to 160 µmol/L, while falling from 20 to 10 adds 480 µmol/L. Move the slider to change muscle mass: with little muscle ($m$ = 0.5), the same GFR gives a creatinine that looks normal. A simplified teaching model, not a clinical calculator.
:::

The early part of the curve is flat. A person can lose half their GFR while creatinine stays inside the laboratory reference range. Later the curve is steep, and small further losses of GFR produce large rises in creatinine.

Creatinine production depends on muscle mass, diet and age. A muscular young man and a frail older woman can have the same creatinine with very different GFRs. To deal with this, laboratories report an **estimated GFR** (eGFR) calculated from creatinine, age and sex.

::: definition Estimated GFR {#def-measure}
**Estimated GFR** (eGFR) is a value calculated from serum creatinine (and sometimes cystatin C), age and sex, using an equation derived from populations in whom GFR was measured. It is reported in mL/min/1.73 m², that is, scaled to an average body surface area.

- **CKD-EPI** (Chronic Kidney Disease Epidemiology Collaboration) equations are the standard. As of 2026, UK laboratories report the 2009 CKD-EPI creatinine equation **without** the ethnicity coefficient, following NICE (NG203, 2021) and the UK Kidney Association. Several other countries use the race-free 2021 CKD-EPI equation.
- **Cystatin C** is a small protein made by all nucleated cells. It is less dependent on muscle mass, and an eGFR using cystatin C, alone or with creatinine, helps when muscle mass is unusual.
- **Cockcroft–Gault** estimates creatinine clearance in mL/min (not indexed to body surface area) from age, weight, sex and creatinine. Many drug dosing recommendations were developed with it.

All these equations assume a **steady state**: creatinine production and excretion must be in balance.
:::

The Cockcroft–Gault equation in SI units is

$$
\text{CrCl (mL/min)} = \frac{(140 - \text{age}) \times \text{weight (kg)} \times k}{\text{creatinine } (\mu\text{mol/L})}
$$ {#eq-cg}

with $k = 1.23$ for men and $1.04$ for women.

::: example A normal creatinine that is not normal {#ex-creatinine-trap}
An 84-year-old woman weighing 48 kg has a creatinine of 95 µmol/L, inside the laboratory reference range. She is about to start a drug that is cleared by the kidney and must be dose-reduced if creatinine clearance is below 30 mL/min. Estimate her creatinine clearance.
::: solution
Using the Cockcroft–Gault equation:

$$
\text{CrCl} = \frac{(140 - 84) \times 48 \times 1.04}{95} = \frac{2795.5}{95} \approx 29 \text{ mL/min}
$$

Her creatinine looks normal because she has little muscle and makes little creatinine. Her actual clearance is about a quarter of a young adult's and sits just under the dosing threshold. The drug dose would be adjusted according to the product information and local guidance. The general rule: in small, older or frail people a "normal" creatinine can hide a markedly reduced GFR. Read creatinine through an equation, and use the patient's real weight for drug dosing.
:::
:::

::: warning Two traps with eGFR {#warn-egfr}
**eGFR is meaningless when creatinine is changing.** After a sudden loss of kidney function, creatinine takes one to three days to climb to its new steady state. During that time an eGFR calculated from the rising value overstates the true GFR, sometimes enormously. A person who becomes anuric still has an "eGFR" of 60 or more on the first morning. In acute kidney injury, follow the change in creatinine and the urine output, not the eGFR ([[renal/acute-kidney-injury]]).

**eGFR is indexed to 1.73 m².** For drug dosing in a very large or very small person, the absolute clearance in mL/min matters. A 45 kg person with an eGFR of 50 mL/min/1.73 m² has a smaller absolute GFR than the number suggests. Many drug labels use Cockcroft–Gault creatinine clearance for this reason.
:::

Other things change creatinine without changing GFR. A cooked-meat meal raises it for a few hours. Some drugs, notably trimethoprim and cimetidine, block tubular creatinine secretion and raise plasma creatinine slightly while true GFR is unchanged. Older colorimetric (Jaffe) assays can be falsely raised by ketones, as in diabetic ketoacidosis. Cystatin C has its own confounders: corticosteroids, thyroid disease and inflammation alter it independently of GFR.

::: quiz {#quiz-creatinine}
A 25-year-old bodybuilder who takes creatine supplements has a creatinine of 140 µmol/L and an eGFR of 58 mL/min/1.73 m². His urine is normal on dipstick and he is well. Which next step best tests whether his GFR is truly reduced?
- [ ] Repeat the creatinine tomorrow
- [ ] Start an ACE inhibitor for chronic kidney disease
- [x] Measure cystatin C and calculate an eGFR from it
- [ ] Arrange a kidney biopsy
::: solution
Creatine supplements and a large muscle mass both raise creatinine production, so creatinine overstates the fall in GFR. Repeating creatinine will give the same answer. Cystatin C is much less affected by muscle mass, so an eGFR based on cystatin C (or on creatinine and cystatin C together) is the right way to test whether his kidney function is really reduced. There is no basis for treatment or biopsy with normal urine and a single creatinine-based value.
:::
:::

::: example A timed urine collection {#ex-clearance}
A 24-hour urine collection from a 40-year-old man contains 1.8 L of urine with a creatinine concentration of 8.0 mmol/L. His plasma creatinine is 100 µmol/L. Calculate his creatinine clearance in mL/min.
::: solution
First put both concentrations in the same unit: $U_{Cr} = 8.0$ mmol/L $= 8000$ µmol/L.

$$
C_{Cr} = \frac{U \times V}{P} = \frac{8000 \times 1.8}{100} = 144 \text{ L/day}
$$

There are 1440 minutes in a day, so $144\,000 \text{ mL} / 1440 = 100$ mL/min.

This is a normal value. The biggest practical error in timed collections is an incomplete collection: a missed void lowers the measured clearance. A useful check is total creatinine excretion, here $8.0 \times 1.8 = 14.4$ mmol/day, which is plausible for an average adult man (roughly 9–18 mmol/day depending on muscle mass).
:::
:::

## Looking at the urine

Blood tests show kidney function. The urine shows kidney damage, and often shows it first.

::: definition Proteinuria and haematuria {#def-urine-markers}
**Albuminuria** is measured as the **albumin:creatinine ratio** (ACR) on a spot urine sample, which corrects for urine concentration. A normal ACR is below 3 mg/mmol. An ACR of 3–30 mg/mmol is moderately increased and above 30 mg/mmol is severely increased (the A1–A3 categories used in chronic kidney disease). The **protein:creatinine ratio** (PCR) measures all proteins, including light chains and tubular proteins; a PCR of about 300 mg/mmol corresponds to roughly 3 g of protein a day, the nephrotic range.

**Haematuria** is blood in the urine. **Visible** haematuria is seen by eye; **non-visible** haematuria is detected on dipstick (1+ or more) and confirmed by repeating the test. Red cells from the glomerulus are often misshapen (dysmorphic) and may form **red cell casts**, which prove a glomerular source.
:::

A urine dipstick is cheap and gives a lot of information: blood, protein, leucocytes, nitrite, glucose and specific gravity. Its limits are worth knowing. The protein pad detects albumin but not light chains, so it misses myeloma kidney. The blood pad reacts to haemoglobin and myoglobin as well as intact red cells, so a positive dipstick with no red cells on microscopy suggests rhabdomyolysis or haemolysis.

Under the microscope, **casts** are cylinders of protein (Tamm–Horsfall protein, also called uromodulin) moulded in the tubule. Hyaline casts are normal in concentrated urine. Red cell casts point to glomerulonephritis, white cell casts to pyelonephritis or interstitial nephritis, and granular "muddy brown" casts to acute tubular necrosis.

::: example From a trace of protein to three grams {#ex-proteinuria}
A 52-year-old Black British man with type 2 diabetes for 12 years has a routine review. His dipstick shows protein 1+. ACR is 45 mg/mmol, repeated at 52 mg/mmol two months later. eGFR is 64 mL/min/1.73 m². Blood pressure is 148/92 mmHg. Interpret the results.
::: solution
Two ACR values above 30 mg/mmol confirm **severely increased albuminuria (A3)**. Together with the eGFR of 64 (category G2), he has chronic kidney disease even though his eGFR alone would not suggest it, because albuminuria is a marker of kidney damage. In someone with long-standing diabetes and no other features, this is most likely diabetic kidney disease, which begins with podocyte and GBM injury and leaks albumin before GFR falls.

Albuminuria matters because it predicts both faster loss of kidney function and cardiovascular events. It is also a treatment target: blood pressure control, an ACE inhibitor or angiotensin receptor blocker, and an SGLT2 inhibitor all reduce albuminuria and slow progression, as covered in [[renal/chronic-kidney-disease]]. Haematuria, an active urinary sediment or a rapid fall in eGFR would raise the possibility of a different glomerular disease and prompt referral.
:::
:::

::: history
The glomerulus was described in detail by William Bowman in 1842, who showed that each capillary tuft sits in the blind end of a tubule. In the 1840s Carl Ludwig proposed that urine begins as a filtrate of plasma driven by blood pressure, an idea that took eighty years to prove. In 1924 Joseph Wearn and Alfred Richards inserted fine glass pipettes into the Bowman's space of frog kidneys and showed that the fluid there was protein-free but contained glucose and chloride at plasma concentrations: a true ultrafiltrate. In 1926 the Danish physiologist Poul Brandt Rehberg introduced creatinine clearance as a measure of filtration, and in the 1930s Homer Smith and James Shannon established inulin clearance as the reference method. The modern eGFR equations are the clinical descendants of that clearance concept.
:::

## Where this leads

What happens to the 180 litres of filtrate is the subject of [[renal/tubular-function]]. The control of sodium and water, which depends on the GFR and on the renin released by the juxtaglomerular apparatus, is in [[renal/water-sodium]]. A sudden fall in GFR is acute kidney injury ([[renal/acute-kidney-injury]]); a slow one, with albuminuria as its companion marker, is chronic kidney disease ([[renal/chronic-kidney-disease]]). Drug dosing in reduced kidney function builds on the clearance ideas here and is developed in [[pharmacology/dosing-principles]].

::: summary
- The kidneys receive about 20–25% of the cardiac output; renal plasma flow is about 600–650 mL/min and GFR about 125 mL/min, a filtration fraction of about 0.2.
- Filtrate crosses fenestrated endothelium, the glomerular basement membrane and the podocyte slit diaphragm, which restrict molecules by size and charge; albumin is largely held back.
- GFR $= K_f \times$ net filtration pressure. Glomerular pressure is set by the balance between afferent and efferent arteriolar tone; oncotic pressure rises along the capillary.
- Autoregulation (myogenic response and tubuloglomerular feedback) keeps GFR stable between mean pressures of about 80 and 180 mmHg. Prostaglandins dilate the afferent arteriole and angiotensin II constricts the efferent; NSAIDs and ACE inhibitors remove these defences.
- Clearance $= UV/P$. Inulin clearance equals GFR; creatinine clearance slightly overestimates it because of secretion.
- Plasma creatinine is inversely proportional to GFR, so early losses of GFR barely change creatinine. eGFR equations correct for age and sex but assume a steady state and are misleading in acute kidney injury and at extremes of muscle mass.
- Albumin:creatinine ratio, dipstick and microscopy detect glomerular damage; red cell casts prove a glomerular source of bleeding.
:::

## Exercises

::: exercise Filtration fraction {level=1 check="0.2"}
A man has a renal blood flow of 1000 mL/min, a haematocrit of 0.40 and a GFR of 120 mL/min. Calculate his filtration fraction as a decimal.
::: hint
Find renal plasma flow first: RPF = RBF × (1 − haematocrit).
:::
::: solution
RPF $= 1000 \times (1 - 0.40) = 600$ mL/min. Filtration fraction $= 120 / 600 = 0.2$. A fifth of the plasma entering the glomeruli is filtered.
:::
:::

::: exercise Order the pressures {level=1}
List the four Starling forces at the glomerulus and state whether each favours or opposes filtration. Which of them changes most along the length of the capillary, and why?
::: solution
Glomerular capillary hydrostatic pressure ($P_{GC}$) favours filtration. Bowman's space hydrostatic pressure ($P_{BS}$) opposes it. Glomerular capillary oncotic pressure ($\pi_{GC}$) opposes it. Bowman's space oncotic pressure ($\pi_{BS}$) would favour filtration but is close to zero because the filtrate contains almost no protein. The oncotic pressure in the capillary changes most: protein-free fluid is removed as blood passes along the tuft, so the remaining plasma becomes more concentrated and $\pi_{GC}$ rises from the afferent to the efferent end.
:::
:::

::: exercise A timed clearance {level=1 check="round(6000*2.4/120/1.44)"}
A 24-hour urine collection contains 2.4 L with a creatinine concentration of 6.0 mmol/L. Plasma creatinine is 120 µmol/L. Calculate the creatinine clearance in mL/min, rounded to the nearest whole number.
::: hint
Convert urine creatinine to µmol/L, calculate clearance in L/day, then convert to mL/min (1 L/day = 1000/1440 mL/min).
:::
::: solution
$U = 6000$ µmol/L. Clearance $= 6000 \times 2.4 / 120 = 120$ L/day. In mL/min: $120\,000 / 1440 = 83.3$, so about **83 mL/min**.
:::
:::

::: exercise Raised pressure in Bowman's space {level=2 check="12.5*(60-25-32)"}
In a glomerulus with $K_f = 12.5$ mL/min per mmHg, $P_{GC} = 60$ mmHg and mean $\pi_{GC} = 32$ mmHg, an obstructing stone raises the pressure in Bowman's space from 18 to 25 mmHg. Assuming the other values do not change, calculate the new GFR in mL/min. What happens in reality over the following hours?
::: solution
Net filtration pressure $= 60 - 25 - 32 = 3$ mmHg, so GFR $= 12.5 \times 3 = 37.5$ mL/min, down from $12.5 \times 10 = 125$ mL/min.

In reality the other values do change. Early in obstruction the afferent arteriole dilates (through prostaglandins), partly restoring glomerular pressure. Later, angiotensin II and thromboxane constrict the vessels and renal blood flow falls. Prolonged obstruction leads to tubular atrophy and permanent loss of function, which is why an obstructed kidney is decompressed promptly, and immediately if it is infected ([[renal/urinary-tract]]).
:::
:::

::: exercise Cockcroft–Gault {level=2 check="round(70*80*1.23/110)"}
A 70-year-old man weighing 80 kg has a stable creatinine of 110 µmol/L. Estimate his creatinine clearance with the Cockcroft–Gault equation, rounded to the nearest mL/min.
::: solution
$$
\text{CrCl} = \frac{(140 - 70) \times 80 \times 1.23}{110} = \frac{6888}{110} = 62.6
$$

so about **63 mL/min**. This is a reasonable estimate only because his creatinine is stable; the equation would be invalid during acute kidney injury.
:::
:::

::: exercise Choose the estimate {level=2}
For each person, choose the most appropriate way to assess kidney function and explain why. (a) A 78-year-old man with amyotrophic lateral sclerosis and marked muscle wasting, creatinine 55 µmol/L. (b) A 40-year-old woman being assessed as a living kidney donor. (c) A 30-year-old man on high-dose prednisolone for vasculitis, creatinine 88 µmol/L.
::: solution
(a) **Cystatin C-based eGFR**. With little muscle he makes little creatinine, so a creatinine-based eGFR will overestimate his GFR.

(b) **Measured GFR**, for example the plasma clearance of iohexol or ⁵¹Cr-EDTA. Donation is irreversible, so the decision deserves a measurement rather than an estimate.

(c) **Creatinine-based eGFR**, interpreted with care, and measured GFR if an exact value would change management. Corticosteroids raise cystatin C independently of GFR, so a cystatin C estimate would underestimate his GFR.
:::
:::

::: exercise Two arterioles {level=2}
Predict the immediate effect on GFR and renal plasma flow of (a) strong afferent arteriolar constriction, (b) moderate efferent arteriolar constriction, (c) efferent arteriolar dilation caused by an ACE inhibitor in a person with bilateral renal artery stenosis. Explain each.
::: solution
(a) Both fall. Less blood enters the glomerulus and glomerular pressure drops.

(b) GFR rises and plasma flow falls. Glomerular pressure rises upstream of the constriction, but less blood leaves, so the filtration fraction increases. With severe constriction, oncotic pressure rises so much along the capillary that GFR falls too.

(c) GFR falls sharply. With stenosis of both renal arteries, the pressure reaching the glomeruli is low and GFR depends on angiotensin II holding the efferent arteriole constricted. Removing angiotensin II lets glomerular pressure fall. This is why creatinine is rechecked one to two weeks after starting an ACE inhibitor or angiotensin receptor blocker; a rise of more than about 30% (or a fall in eGFR of more than 25%) prompts review of the drug and a search for renovascular disease.
:::
:::

::: exercise The hidden half {level=3 check="9600/160"}
Use the steady-state model $P_{Cr} = G/\text{GFR}$ with $G = 9.6$ µmol/min. (a) A woman's creatinine rises from 80 to 160 µmol/L over two years, while she stays well. What is her new GFR in mL/min, assuming $G$ is unchanged? (b) Explain why a doubling of creatinine is described as a halving of GFR, and why a creatinine still within or near the reference range can therefore hide a large loss of kidney function.
::: hint
GFR in L/min is $G/P_{Cr}$ with $G$ in µmol/min and $P_{Cr}$ in µmol/L. Multiply by 1000 to get mL/min.
:::
::: solution
(a) GFR $= 9.6 / 160$ L/min $= 0.06$ L/min $= 60$ mL/min. Her previous GFR was $9.6/80 = 0.12$ L/min, 120 mL/min.

(b) Because $P_{Cr}$ is inversely proportional to GFR, multiplying creatinine by two divides GFR by two, whatever the starting point. At the start of the curve, an absolute change in creatinine of 80 µmol/L corresponds to a loss of 60 mL/min, whereas late in the curve the same rise from 400 to 480 corresponds to a loss of only 4 mL/min. An upper reference limit of creatinine of around 100 µmol/L in women means a woman starting at 50 can lose half her GFR while every result is reported as normal. Trends, eGFR and albuminuria are more informative than a single creatinine checked against a reference range.
:::
:::

::: exercise Interpret the dipstick {level=3}
Three urine samples are tested. (a) A 19-year-old runner after a marathon: blood 3+, protein 1+, microscopy shows no red cells, creatine kinase 48 000 U/L. (b) A 15-year-old boy with a sore throat two days ago: visible haematuria, blood 3+, protein 1+, red cell casts, blood pressure normal, creatinine normal. (c) A 68-year-old woman with back pain and anaemia: dipstick protein negative, but PCR 250 mg/mmol and ACR 8 mg/mmol. Give the most likely explanation of each.
::: solution
(a) The blood pad is reacting to **myoglobin**, not red cells: **rhabdomyolysis** after extreme exercise. Myoglobin is toxic to tubules, and he is at risk of acute kidney injury; the priority is fluid and monitoring of creatinine and potassium.

(b) Visible haematuria that begins one to two days after a throat infection, with red cell casts, suggests **IgA nephropathy** (synpharyngitic haematuria). Post-streptococcal glomerulonephritis typically follows the infection by one to three weeks. Red cell casts confirm a glomerular origin.

(c) The large gap between total protein (PCR) and albumin (ACR), with a negative dipstick, means most of the protein is not albumin. With back pain and anaemia, the likely protein is **free light chains** from **myeloma**. She needs serum free light chains and protein electrophoresis ([[blood/lymphoma-myeloma]]).
:::
:::
