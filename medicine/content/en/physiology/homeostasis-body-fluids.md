Physiology begins with the sentence Claude Bernard had written over the door of his lecture theatre in the 1860s — the fixity of the internal environment is the condition of free and independent life. Everything after it — nerve, muscle, kidney, endocrine — is the study of how that stability is produced, monitored and defended, and of what happens when the numbers drift. This first chapter establishes the two languages the rest of the course speaks: **control** (sensors, set points, feedback, gain) and **compartments** (where the water and salt sit, how they are measured, and how they move when disease upsets the bookkeeping).

Every clinical fluid prescription, every abnormal sodium, every oedematous limb, is an applied sentence from these two grammars.

## Control systems

::: definition The reflex arc and its engineering {#def-control}
A controlled physiological variable (temperature, plasma sodium, arterial pressure, glucose, calcium, pH) is **sensed** by receptors that measure it against a **set point** in an **integrator** (often the hypothalamus or medulla, often with endocrine relays), which drives **effectors** (nerves, hormones, muscles, kidneys) to correct the deviation: **negative feedback**, in which the response opposes the disturbance. A system's **gain** is how completely it corrects — the ratio of correction to remaining error; a high-gain system (arterial pressure, calcium, osmolality) leaves almost no residual error because its controllers are cheap to run and fast, and a low-gain one leaves a visible deviation. Two variants complete the vocabulary. **Feedforward** control anticipates (cephalic-phase insulin before a meal; the exercise cardiovascular adjustment at the *start* of a treadmill run), and **positive feedback** amplifies (the contraction–oxytocin positive-feedback loop of labour; the platelet plug; the upstroke of the action potential) — the latter always bounded by an event that ends the loop, because an unbounded positive feedback is death.
:::

| Variable | Normal range | Dominant sensor | Dominant effectors | Disturbance and correction |
|---|---|---|---|---|
| Plasma osmolality | 275–295 mOsm/kg | Hypothalamic osmoreceptors | ADH (vasopressin), thirst | +1% → ADH release; +2–3% → thirst |
| Plasma Na⁺ | 135–145 mmol/L | (with volume) baroreceptors | ADH, RAAS, natriuretic peptides | Volume vs tonicity conflict (below) |
| Arterial pressure | 120/80 mmHg | Carotid sinus, aortic baroreceptors | Sympathetic, RAAS, vasopressin, kidney | Seconds (nervous), days (renal) |
| Blood glucose | 4–6 mmol/L fasting | β-cell GLUT2/glucokinase, hypothalamus | Insulin ↓, glucagon ↑, adrenaline, cortisol | Counter-regulation hierarchy |
| Plasma Ca²⁺ (ionised) | 1.15–1.33 mmol/L | CaSR on parathyroid cells | PTH, vitamin D, calcitonin(minor) | Minutes (PTH), days (vitamin D) |
| Core temperature | 36.5–37.5 °C | Hypothalamic and spinal thermoreceptors | Sweating, skin flow, shivering, thyroid/adrenal | Set-point shifts in fever |
| Arterial pH | 7.35–7.45 | Central and peripheral chemoreceptors | Lungs (minutes), kidneys (days), buffers (seconds) | The acid–base chapter |

::: theorem Volume and tonicity are different variables, and the body ranks them {#thm-ranking}
Osmoregulators defend **tonicity** with vasopressin and thirst; baroreceptors defend **volume** with the renin–angiotensin–aldosterone system, sympathetic tone and vasopressin. When the two conflict — haemorrhage, heart failure, cirrhosis, sepsis — **volume wins**: carotid and cardiac baroreceptor unloading drives vasopressin and thirst at *low* osmolality, and the kidney retains salt and water, producing the hyponatraemia of the oedematous states and the hypervolaemic patient with an inappropriately concentrated urine. The ranking is the single most clinically productive sentence in this chapter: a low sodium is usually a problem of **water excess defending an underfill**, not of salt want, and the diagnostic question is always the effective arterial volume, not the total.
:::

::: proof
The proof is in the physiology of the overlap. Vasopressin secretion normally sits on an osmotic knife-edge (a 1–2% osmolality rise doubles plasma levels) but **volume depletion of 8–10% overrides the osmostat** through the low-pressure (atrial) and high-pressure (arterial) baroreceptor pathways — an evolutionary arithmetic in which hypovolaemic shock kills in hours while hypernatraemic dehydration kills in days. The same hierarchy explains the clinical catalogue: in **heart failure** the underfilled arterial tree (whatever the total volume) drives non-osmotic vasopressin and reduced distal delivery, so water is retained beyond sodium and serum sodium falls; in **cirrhosis** arterial vasodilatation from splanchnic NO unloads the baroreflex with the same result — dilutional hyponatraemia marking severity, its correction now pharmacologically possible (vaptans block the V₂ receptor, deliberately reversing the body's ranking); in **sepsis and postoperative states** pain, nausea and cytokines raise vasopressin without either stimulus, and the iatrogenic water of recovery becomes hyponatraemia. Each case answers the same two questions — is the patient hypovolaic, euvolaemic or hypervolaemic, and is the urine osmolality >100 mOsm/kg (vasopressin acting) or maximally dilute (vasopressin off, so the sodium must be driven by intake or by solute) — which is the diagnostic algorithm of [[renal/water-sodium]] stated before the renal chapter needs it.
:::

## The compartments and how they are measured

::: definition The fluid compartments {#def-compartments}
Total body water averages **60% of body weight** in a young adult man (50% in the older, 50–55% in women — the difference is fat, which carries little water; infants are ~75%). It divides **2/3 intracellular (40% of weight)** and **1/3 extracellular (20%)**, the extracellular volume into **interstitial fluid (~15%) and plasma (~5%)** with a **transcellular** sliver (~1% — cerebrospinal, ocular, serosal, and joint fluids, "secreted" across epithelia). The two compartment boundaries are governed by different solute rules: the **cell membrane** is impermeant to the intracellular anions and cations (proteins and organic phosphates inside, K⁺ and its phosphates; Na⁺ and Cl⁻ excluded by the sodium-potassium ATPase and channel selectivity), so **ICF osmolality equals ECF osmolality** (~285 mOsm/kg) and water moves across the cell by osmotic gradients; the **capillary** freely passes water and small solutes but holds plasma protein, so interstitial and plasma fluid differ mainly by the Donnan effect of plasma's negatively-charged proteins. Compositions: plasma Na 140, K 4, Cl 102, HCO₃ 24, protein 7 g/dL; interstitium near-identical to plasma with little protein (the subglycocalyx protein concentration is very low — see Starling); ICF Na ~10, K ~140, with Mg²⁺ and phosphate as the major cations and anions.
:::

**Indicator dilution** measures the compartments as they are: a known amount of tracer is introduced, allowed to equilibrate in its compartment, and the dilution space calculated as **V = (amount injected − amount excreted)/concentration**: **tritiated water or urea for TBW, inulin or mannitol for ECF, radiolabelled albumin for plasma volume**, with interstitial volume and red cell mass by subtraction (and blood volume recovered from the plasma volume and the haematocrit, corrected for the trapped plasma and the body-wide **F-cell ratio**). Bedside arithmetic uses the fractions: TBW ≈ 0.6 × weight; ECF ≈ 0.2 (a litre of 0.9% saline therefore distributes into ~25% of the body — — and 0.45% saline and 5% dextrose, once their salt or sugar are handled, distribute across the whole 42 L).

::: example Which compartment? {#ex-shifts}
Predict the compartment changes in: (a) acute haemorrhage with immediate isotonic plasma replacement; (b) untreated diabetes mellitus with hyperglycaemia and osmotic diuresis; (c) primary polydipsia (15 L/day of water); (d) 2 L of 3% saline given for symptomatic hyponatraemia.
::: solution
The rule that answers all four: **isotonic solutions stay in the ECF; hypertonic solutions pull ICF water out and expand ECF; hypotonic or pure water distributes across all compartments by osmosis and swells cells; isotonic replacement of lost isotonic blood changes nothing in tonicity**. (a) ECF volume lost and replaced — no tonicity change (and in real haemorrhage, plasma refilling from the interstitium — Starling's pendulum running in reverse at up to a litre an hour — is why the haematocrit lags and why crystalloid requirements exceed blood loss roughly threefold). (b) Glucose is an effective osmole: hyperglycaemia raises ECF tonicity, **draws water out of cells** (ICF contraction), the osmotic diuresis then loses water *and* salt — a picture of ECF depletion plus ICF depletion plus falsely low measured sodium, corrected at ~+1.6–2.4 mmol/L per 100 mg/dL (≈5.6 mmol/L) of glucose above normal. (c) 15 L of water overwhelms nothing in a normal kidney (which can excrete ~12–18 L/day) but with vasopressin even partially on, water is retained and distributes across both compartments — **cellular swelling, ECF dilution: hyponatraemia with low tonicity** (the cerebral oedema of water intoxication). (d) 3% saline (513 mmol/L Na; ~1026 mOsm/L) stays in the ECF and **pulls water from the ICF**, shrinking brain cells while correcting the tonicity — which is precisely why 3% saline, and not normal saline, is the emergency treatment of severe symptomatic hyponatraemia, and why the correction rate is capped to prevent osmotic demyelination.
:::
:::

## Water and sodium balance in daily life

A sedentary adult takes in ~2.5 L/day (≈1.5 drink, 0.7 food, 0.3 metabolic water) and loses it as urine (0.5–1.5 — the obligatory minimum set by solute excretion, ~600 mOsm/day against a maximal 1200 mOsm/L concentration), **insensible loss from skin (~0.5 L) and respiratory tract (~0.4 L)**, stool (~0.1), and sweat as needed. Fever raises insensible loss by ~10–15% per °C; a tracheostomy or ventilator without humidifier doubles respiratory loss; trauma and catabolism raise obligatory nitrogen and solute output. The kidney then does the daily bookkeeping under ADH and aldosterone, but the **brain does it first: thirst** — osmotically triggered (the organum vasculosum and subfornical organ, circumventricular organs whose lack of a blood–brain barrier lets them sample plasma) and angiotensin II-triggered (the dipsogenic arm of the renin system) — is the highest-gain behaviour in human physiology, and its failure (adipsia in the elderly, hypothalamic lesions) or exaggeration (primary polydipsia, dipsogenic diabetes insipidus) produces the extremes of sodium.

::: theorem Plasma osmolality is a two-and-a-half solute number {#thm-osm}
Calculated osmolality = **2 × [Na⁺] + [glucose] + [urea]** (mmol/L, i.e. ~2Na + glucose + urea; in US units 2Na + glucose/18 + BUN/2.8). The factor 2 counts the anions accompanying each sodium salt. Urea is **ineffective** as an osmotic agent across most cell membranes (it equilibrates via urea transporters) — so **tonicity** (the osmotically effective part, which determines water shifts) counts sodium and glucose but not urea. The **osmolar gap** — measured (freezing-point depression) minus calculated osmolality — is therefore the clinician's screen for unmeasured effective or noneffective osmoles: a gap >10 mOsm/kg raises the question of ethanol, mannitol, radiocontrast, or (classically) toxic alcohols whose metabolism to acids also opens the anion gap in [[renal/acid-base-disorders]].
:::

::: example The two sodiums {#ex-tonicity}
Two patients have serum sodium 125 mmol/L: A is a 70 kg anorexic woman with urea 40 mmol/L (BUN 112), glucose 6, Na 125; B is a 28-year-old with Na 125 after a marathon in which he drank 8 L of water, urea 4, glucose 4.5.
::: solution
A: calculated osmolality = 2×125 + 6 + 40 = 296 — near-normal measured osmolality with a low sodium: **the urea (a noneffective osmole) is carrying the tonicity**, and the sodium reports only part of the story; the effective osmolality (tonicity) is 2×125 + 6 = 256, so this patient *is* hypotonic as well as uraemic — the case shows both halves of the rule (measure osmolality, then judge the tonicity by the effective part). B: calculated = 2×125 + 4.5 + 4 = 259, genuinely hypotonic: **exercise-associated hyponatraemia from non-osmotic vasopressin (pain, nausea, effort) plus free-water excess** — the dilutional pattern, whose neurological symptoms (headache, confusion, seizures) track cerebral oedema and whose treatment is careful 3% saline with the rate caps that prevent osmotic demyelination. The example's grammar: write the numbers into the equation, separate **measured osmolality**, **effective osmolality (tonicity)** and **volume status**, and the aetiology falls out.
:::
:::

::: example Fifty millilitres an hour, both ways {#ex-balance}
An 80-kg man collapses on a ward round; observations: pulse 118, BP 90/60 lying and 70/50 standing, dry mucosae, skin-tent recoil slow, urine 20 mL/h for six hours, urea 22 mmol/L with creatinine 190 (baseline 90), Na 148.
::: solution
This is **hypovolaemia with a pre-renal acute kidney injury and a hypernatraemic (water-losing) dehydration** — and every number is a control loop reading its own error signal. Pulse pressure narrow and postural drop: baroreceptor unloading with sympathetic compensation; urea rising out of proportion to creatinine (the ratio's diagnostic because urea is reabsorbed with water in the proximal tubule and its secretion falls with flow) plus concentrated urine: the kidney faithfully retaining salt and water under angiotensin II and aldosterone and vasopressin; sodium 148: water losses (insensible, loop-diuretic water, or simply not drinking — the adipsic elderly pattern) exceeding salt loss. Management is the two deficits separated: **isotonic volume first to restore the circulation (the ranking theorem — volume outranks tonicity), then correct the free-water deficit slowly** (here ≈ 48 × (148/140 − 1) ≈ 2.7 L over 48 hours, orally if the patient can drink — thirst is the highest-gain controller and usually the best one). The urine output — 20 mL/h, not anuria — is the reassurance that the tubule is undamaged, and the response to the first litre (pulse, postural pressure, and urine flow rising within the hour) is the diagnostic test the kidney has been offering all along.
:::
:::

## The interstitium and oedema

::: definition Starling forces and the revised capillary relation {#def-starling}
Fluid filtration across capillaries was written by Starling (1896) as balance between **hydrostatic** (P_c pushing out, P_i pushing in) and **oncotic** (π_p holding in, π_i pulling out) pressures across a membrane of reflection coefficient σ and conductance L_p: $J_v = L_p\left[(P_c - P_i) - \sigma(\pi_p - \pi_i)\right]$. The **revised Starling principle** recognises that the endothelial **glycocalyx**, not the vessel lumen, is the osmotic barrier: subglycocalyx π is near zero and rises only when plasma protein falls or flow falls, and lymphatics sweep the interstitium continuously — so the classic "reabsorption limb" at the venule end barely exists, and **steady state is filtration balanced by lymph flow**. The **Starling resistor** behaviour of the interstitium (its collagen gels resist swelling and raise interstitial pressure and lymph drainage) is why oedema appears only past a safety factor; the clinical oedemas are the four failures of the equation: **raised P_c** (heart failure, venous obstruction, dependent legs), **low π_p** (nephrotic syndrome, cirrhosis, malnutrition), **increased capillary permeability** (sepsis, inflammation, burns), and **lymphatic obstruction** (filariasis, post-mastectomy, tumour — the only cause of a high-protein oedema, and the reason pitting disappears as the interstitium fibroses).
:::

::: example Reading an oedematous patient {#ex-oedema}
Four patients present with swollen legs: (a) 76-year-old with exertional dyspnoea, raised jugular venous pressure, and hepatomegaly; (b) 8-year-old with facial oedema and urine protein 4+; (c) 55-year-old alcoholic with ascites, palmar erythema, and albumin 22 g/L; (d) 60-year-old with unilateral leg swelling after ipsilateral groin dissection for melanoma.
::: solution
Assign the Starling term. (a) **Raised capillary hydrostatic pressure from venous congestion** — the whole-capillary-bed transmission of raised venous pressure, plus the kidney's baroreceptor read of arterial underfill driving salt-water retention that the venous congestion then re-presents as oedema (the renal-adaptive loop of [[cardiovascular/heart-failure]]); the ascites, effusions, and pulmonary oedema come with it. (b) **Low plasma oncotic pressure** — nephrotic loss of albumin; the mechanism's two-school argument (underfill vs the primary sodium-retaining "overfill" of minimal-change disease) is the chapter's caveat that disease adds renal sodium retention to the physics. (c) **Low oncotic plus portal hydrostatic plus lymphatic overflow**: cirrhotic ascites is Starling's full orchestra — sinusoidal portal hypertension raising splanchnic P_c, low albumin lowering π_p, and hepatic lymph, weeping from the liver capsule's surface when its flow exceeds drainage, explaining why the ascites precedes the leg oedema in many patients. (d) **Lymphatic failure** — the high-protein, non-pitting-when-fibrosed, unilateral, post-dissection lymphoedema, distinct because the oedema fluid's own protein is high (the only such case among the four), and treated by physiotherapy (compression and drainage) rather than by diuretics that shrink the plasma volume the limb never needed. The table is the examination: jugular pressure, albumin, liver signs, unilateralism, and pitting versus non-pitting — one Starling term apiece.
:::
:::

::: history
Bernard (1850s–70s) framed the internal environment; Cannon named and systematised **homeostasis** (1929), with the Scottish biochemist Lawrence J. Henderson's fitness-of-the-environment argument (1913) as its philosophical scaffolding. Starling's hypothesis of capillary exchange came from Oxford's new muscle preparations in 1896; Landis measured single-capillary pressures in the 1920s (the frog mesentery, a pipette and a microscope), and the glycocalyx revision arrived with electron microscopy and micropuncture in the 1970s–2000s (the Michel–Adamson data on cultured endothelium that made the revised curve in physiology textbooks by 2004). Guyton's textbook and his Guytonian school's renal-function–arterial-pressure curves gave the volume hierarchy its quantitative form, and the V₂-receptor antagonists of the 1990s–2000s turned the non-osmotic-vasopressin chapter into a therapeutic class.
:::

::: widget plot
f: 8/(1+exp(-(x-287)/1.6)) + 1
x: 275, 300
y: 0, 12
labels: \text{plasma osmolality (mOsm/kg)},\ \text{ADH (pg/mL, schematic)}
caption: The osmolality–vasopressin relation: a basal trickle, then a steep — effectively exponential — rise beginning near 280–285 mOsm/kg, such that a 2–3% change in osmolality moves plasma ADH several-fold and water excretion across most of its range. This is why measured osmolality (not sodium alone) is the interpreter's anchor, why the osmostat resets (pregnancy lowers it, some drugs raise or lower it), and why in the syndromes of inappropriate ADH the urine is inappropriately concentrated at precisely this part of the curve.
:::

::: quiz
A 70 kg man (TBW 42 L) has serum Na 160 mmol/L. The approximate free water deficit is:
- [ ] 1 L
- [x] 6 L
- [ ] 12 L
- [ ] 0.5 L
::: solution
The standard estimate: **free water deficit = TBW × (([Na]/140) − 1) = 42 × (1.143 − 1) ≈ 6 L**. Treat the estimate honestly — total-body sodium is usually also depleted, ongoing losses add to the deficit, and re-measuring every 4–6 hours is mandatory — and correct over at least 48 hours, lowering the sodium by no more than ~10 mmol/L per day (cerebral oedema is the reward for overcorrection here, just as demyelination is in the opposite direction). The exam sentence is the formula; the clinical sentence is the re-check.
:::
:::

## Where this leads

Sodium and water disorders are worked out in [[renal/water-sodium]] and [[renal/urinary-tract]]; the acid–base buffers in [[physiology/acid-base]]; the renal handling machinery in [[renal/filtration]] and [[renal/tubular-function]]; hormonal controllers in [[physiology/hormones]] and [[endocrine/adrenal]]; heart failure's Starling catastrophe in [[cardiovascular/heart-failure]]; the nephrotic syndrome in [[renal/urinary-tract]].

::: summary
- Physiology is control engineering: set points, feedback, gain; the body defends osmolality, sodium, pressure, glucose, calcium, temperature and pH in parallel loops with overlapping sensors.
- Volume outranks tonicity when the two conflict: hyponatraemia in heart failure, cirrhosis and postoperative states is usually non-osmotic vasopressin defending an underfilled circulation.
- Compartments obey the two boundaries: isotonic stays extracellular, pure water distributes everywhere and swells cells, and effective osmoles (sodium, glucose) shrink them; the dilution techniques and the 60/40/20 fractions are the bookkeeping.
- Osmolality is 2Na + glucose + urea; tonicity excludes urea; the osmolar gap is the screen for the foreign osmoles.
- The capillary is a Starling system filtered against lymph, and its four failures — hydrostatic, oncotic, permeability, lymphatic — classify every swollen limb and every ascites.
- Thirst and vasopressin make the osmotic knife-edge the highest-gain control in the body, and the clinician's job is to read which variable the body decided to defend.
:::

## Exercises

::: exercise Dilution arithmetic {level=1}
200 mg of inulin is injected and equilibrated; plasma concentration is 0.8 mg/dL with 20 mg excreted. What is the measured volume, and what does it correspond to?
::: solution
V = (200 − 20)/0.8 mg/dL = 180/0.008 mg/mL = 22,500 mL = **22.5 L** — an ECF (inulin/manitol space) close to the expected 20% of body weight in a ~75–110 kg adult; a smaller-than-expected space in a cachectic patient or a larger one in an oedematous one is the bedside reading of the number's meaning: the tracers measure the space the marker equilibrates into, which in non-steady states (recent diuretic, expanding ECF) drifts from the textbook.
:::
:::

::: exercise Maintenance fluids {level=1}
Calculate the 24-hour maintenance fluid for a 70 kg post-operative patient by the 4-2-1 rule and by Holliday-Segar, and reconcile with the chapter's intake figures; state why 0.9% saline or a balanced solution plus potassium usually replaces "5% dextrose" in the modern protocol.
::: solution
**4-2-1:** 40 + 20 + 50 = 110 mL/h ≈ **2.6 L/day**. **Holliday-Segar:** 1000 + 500 + 20×50 = **2.5 L/day** — the two agree, and both sit close to the 2.5 L/day intake budget above. The modern correction to the old dextrose-saline habit: surgical patients secrete vasopressin (pain, nausea, stress) and cannot excrete free water, so hypotonic fluids produce hospital hyponatraemia — isotonic volume with potassium (once urine flows) and the lowest effective rate is the guideline answer, and it is the theorem on volume-versus-tonicity ranking written as a prescription.
:::
:::

::: exercise Correct the sodium safely {level=1 check="8"}
A chronic hyponatraemia of 118 mmol/L is to be corrected. What is the maximum safe rise in the first 24 hours?
::: solution
**8 mmol/L** (most guidelines cap 8–10 mmol/L per 24 h, lower for high-risk patients — the thiazide-treated, the hypokalaemic, malnourished alcoholics, and women of childbearing age with premenstrual oestrogen effects). The reason is the brain's volume regulation: chronic hypotonicity lets brain cells extrude idiogenic osmolytes so that their volume normalises, and too-rapid extracellular correction then shrinks them again and strips the myelin, **osmotic demyelination syndrome** (the former "central pontine myelinolysis"), which presents days later with dysarthria, quadriparesis and locked-in states and is the most iatrogenic catastrophe in electrolyte medicine. If the correction runs too fast — often when the vasopressin stimulus switches off (volume repletion, stopping the thiazide) and a water diuresis erupts — the treatment is **desmopressin to re-clamp the kidney plus dextrose to re-lower the sodium**, an operation that is pure applied physiology.
:::
:::

::: exercise The gap {level=2}
Measured osmolality 330 mOsm/kg; Na 132, glucose 6, urea 8 mmol/L; anion gap 24; pH 7.15 with a wide-gap acidosis. Compute the osmolar gap and say what it adds.
::: solution
Calculated = 2×132 + 6 + 8 = 278; **gap = 330 − 278 = 52**, markedly elevated. A high osmolar gap with a high-anion-gap acidosis is the classic combination of **toxic-alcohol poisoning** — methanol or ethylene glycol (the parent alcohols raise the gap early; as alcohol dehydrogenase metabolises them to formic and glycolic/oxalic acids, the gap falls while the anion gap rises — the two moves on one clock), or alcoholic ketoacidosis with concurrent ethanol. The clinical use is the same clock: an elevated gap in the right history justifies **fomepizole or ethanol to block the dehydrogenase and haemodialysis to remove parent and acid**, both before the metabolites do the optic-nerve or renal damage. The osmolar gap is therefore not a number but a race.
:::
:::

::: exercise Order the infusions {level=2}
Rank these on tonicity: 0.9% saline, 0.45% saline, 5% dextrose, 3% saline, plasma-Lyte; and state where each goes after its nominal sugar or salt is metabolised or excreted.
::: solution
Tonicity of the **infusate**: 3% (≈1000 mOsm/L, hypertonic) > 0.9% ≈ plasma-Lyte (≈285–300, isotonic) > 0.45% (≈154, hypotonic) > 5% dextrose (nominally ~253 but **effectively none once metabolised**). After handling: **3% stays extracellular and shrinks cells; 0.9% and balanced salt stay extracellular (the chloride load of saline being the reason balanced fluids are preferred in large volumes); 0.45% becomes half-a-share of water to the whole body; 5% dextrose becomes free water distributed across total body water (which is why it corrects hypernatraemia slowly but causes hyponatraemia fast when vasopressin is on).** The same ranking read backwards explains every hospital dysnatraemia: check the bag, and you have checked most of the aetiology.
:::
:::

::: exercise The oedema equation at the ankle {level=2}
A patient with chronic venous insufficiency has pitting oedema to the knee and no hypoalbuminaemia or heart failure. Explain by Starling terms why the legs, why pitting, and why compression stockings work where furosemide causes harm.
::: solution
**Why the legs:** ambulatory venous pressure is the hydrostatic column of [[anatomy/lower-limb]] — when the calf pump fails or the valves are destroyed, ankle capillary P_c rides with the standing column, filtration exceeds lymph capacity, and the interstitium swells. **Why pitting:** the oedema fluid is a low-protein transudate in loose subcutaneous tissue — the interstitial gel has not yet fibrosed, so pressure displaces fluid and leaves a print; long-standing cases develop fibrosis and non-pitting induration (the lipodermatosclerosis that ends the gaiter ulcer pathway). **Why stockings and not diuretics:** the problem is a **regional hydrostatic fault**, not total-body salt excess — graduated compression raises the interstitial pressure around the calf, restoring the P_i term that opposes filtration and assisting the muscle pump and lymph, while diuretics shrink the plasma volume, cause hypokalaemia, nocturia and falls in the elderly, and leave the local physics untouched: the same four Starling terms on either side of the treatment decision.
:::
:::

::: exercise Design the experiment {level=3}
You are given tritiated water, inulin, Evans-blue albumin, and a centrifuge, in a 70 kg volunteer: design the measurement of total body water, ECF, plasma volume, red cell mass, and lymphatic safety, and state each tracer's caveat.
::: solution
**Protocol.** (1) Tritiated water (or D₂O) equilibrates across total body water in 2–4 hours; sample plasma, correct for urinary loss and for **exchangeable** (not true) tritium — the caveat: ~10% of body H exchanges with protein and bone, so the space is "TBW" in the isotope's sense. (2) Inulin (or mannitol, or ⁵¹Cr-EDTA as its clinical stand-in) is extracellular and not metabolised; continuous low-rate infusion with timed samples, or a two-sample equilibration method, gives **ECF**; caveat: inulin spaces in vivo run a little small for true ECF because of slow penetration of deep connective and transcellular compartments. (3) Evans-blue (radio)albumin gives **plasma volume** from a single 10-minute equilibration; caveat: the dye leaks from the circulation over the sampling period and ~5% of albumin is extravascular, so serial samples extrapolated to zero-time correct it. (4) **Red cell mass** = ⁵¹Cr-labelled red cells; **blood volume** = red cell mass / (1 − whole-body haematocrit), the **F-cell ratio** (≈0.87–0.91 of venous haematocrit) correcting for the spleen and the large-vessel plasma skimming — the caveat that makes "circulating blood volume" a definition rather than a naive number. (5) The **lymphatic safety** term is not a dilution space but the interstitium's reserve: measure baseline limb volume (permutation plethysmography), infuse a known saline load, and the deviation of fluid retention from Starling prediction indexes lymph capacity — the design the old "transcapillary escape rate of albumin" experiments did with radio-iodinated albumin. The answer's lesson is the chapter's: compartments are hypotheses tested by markers whose imperfections you must carry in the interpretation.
:::
:::

::: exercise A ward emergency {level=3}
A post-operative patient, day 2, on 5% dextrose at 125 mL/h with regular oxycodone, becomes confused and seizes; Na is 116. Write the immediate management and the physiological justification, naming the hormone doing the damage.
::: solution
The hormone: **non-osmotic vasopressin** — postoperative pain, nausea and opioids stimulate release independently of osmolality, the kidneys cannot excrete free water, and the hypotonic infusate (125 mL/h dextrose = 3 L/day of free water once the sugar is metabolised) is retained and distributed into the brain, swollen. Immediate: **stop the dextrose; treat the seizure (benzodiazepine, then correct the cause); give 3% saline — a 2 mL/kg bolus or a fixed 100–150 mL bolus repeated once or twice, aiming for a rapid 4–6 mmol/L rise in the first hours to defuse the oedema, then cap total 24-hour correction at 8 mmol/L**; check sodium every 2–4 hours; give the anti-emetic and the analgesia strategy that removes the vasopressin stimulus; and if the sodium rises too fast (risk doubled by hypokalaemia, malnutrition, alcoholism and the opioid's own switch-off diuresis), **desmopressin plus dextrose to re-lower it**. The prevention was the whole point: in a vasopressin-loaded patient, hypotonic maintenance is the disease — which is why modern guidelines make isotonic fluid, the lowest sufficient rate, and sodium checks in the at-risk the default, and why the seizure chart of the confused post-operative patient is now examined before the CT.
:::
:::
