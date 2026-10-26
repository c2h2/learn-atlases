Chronic kidney disease (CKD) is common, usually silent and mostly caused by conditions that are common themselves: diabetes, high blood pressure and vascular disease. In many high-income countries around one adult in ten has some degree of CKD, most of them at an early stage and many unaware of it. Only a small minority will ever need dialysis or a transplant. Far more will have a heart attack or stroke first, because CKD multiplies cardiovascular risk.

The aims of care therefore follow naturally. Find CKD early, by measuring eGFR and urine albumin in people at risk. Slow its progression, with blood pressure control and drugs that protect the kidney. Reduce cardiovascular risk. Manage the complications that appear as kidney function falls: anaemia, bone and mineral disorder, acidosis, hyperkalaemia and fluid overload. And plan ahead, so that people who reach kidney failure can choose between dialysis, transplantation and conservative care with time to prepare.

This lesson also covers glomerular disease, which causes CKD and sometimes acute kidney injury, and the principles of dialysis and transplantation. It builds on [[renal/filtration]] for GFR and albuminuria and on [[renal/acute-kidney-injury]]. The immune mechanisms of glomerulonephritis are in [[immunology/autoimmunity]], and transplant immunology in [[immunology/transplant-tumour-immunology]]. The UK reference throughout is NICE guideline NG203 (2021), alongside the KDIGO 2024 CKD guideline.

## Definition and classification

::: definition Chronic kidney disease {#def-ckd}
**Chronic kidney disease** is an abnormality of kidney structure or function, present for **more than 3 months**, with implications for health. It is diagnosed by either:

- a **GFR below 60 mL/min/1.73 m²**, or
- one or more **markers of kidney damage**: albuminuria (ACR 3 mg/mmol or more), urine sediment abnormalities such as persistent haematuria of renal origin, electrolyte or other abnormalities due to tubular disorders, abnormalities on histology or imaging (such as polycystic kidneys), or a history of kidney transplantation.

CKD is classified by **Cause, GFR category and Albuminuria category** (the CGA classification):

| GFR category | eGFR (mL/min/1.73 m²) | Description |
|---|---|---|
| G1 | 90 or more | normal or high |
| G2 | 60–89 | mildly decreased |
| G3a | 45–59 | mildly to moderately decreased |
| G3b | 30–44 | moderately to severely decreased |
| G4 | 15–29 | severely decreased |
| G5 | below 15 | kidney failure |

| Albuminuria category | ACR (mg/mmol) | Description |
|---|---|---|
| A1 | below 3 | normal to mildly increased |
| A2 | 3–30 | moderately increased |
| A3 | above 30 | severely increased |

G1 and G2 count as CKD only if a marker of kidney damage is also present.
:::

A person's risk of progression and of cardiovascular events rises with both lower GFR and higher albuminuria. A person at G3a A1 is at much lower risk than one at G3a A3. This is why albuminuria is always measured alongside eGFR. In the UK, NICE recommends estimating the **5-year risk of kidney failure** with the Kidney Failure Risk Equation (which uses age, sex, eGFR and ACR) for people with CKD G3–G5.

**Causes** of CKD in adults in the UK include diabetic kidney disease (the commonest cause of kidney failure), hypertensive and renovascular disease, glomerulonephritis, autosomal dominant polycystic kidney disease, chronic pyelonephritis and reflux nephropathy, obstructive uropathy, and drugs (lithium, long-term NSAIDs, calcineurin inhibitors). In many older people the cause is unclear, and CKD reflects vascular ageing, previous AKI and accumulated injuries.

**Who should be tested?** NICE recommends testing eGFR and ACR in people with diabetes, hypertension, previous AKI, cardiovascular disease, structural urinary tract disease, multisystem diseases that can involve the kidney such as lupus, gout, a family history of kidney failure or hereditary kidney disease, and people taking nephrotoxic drugs such as lithium.

## Why CKD progresses

::: theorem Adaptive hyperfiltration and progression {#thm-hyperfiltration}
When nephrons are lost, the remaining nephrons increase their own filtration (**single-nephron hyperfiltration**) through raised glomerular pressure and flow. This preserves total GFR for a time but damages the remaining glomeruli, causing proteinuria and sclerosis, which leads to further nephron loss. CKD therefore tends to progress once a critical number of nephrons has been lost, even if the original cause has gone.
:::

::: proof
After loss of nephrons, angiotensin II and other signals dilate the afferent arteriole of surviving nephrons more than the efferent, so glomerular capillary pressure and flow rise, and each surviving glomerulus enlarges. Experiments in rats after removal of most of the kidney mass, by Barry Brenner and colleagues in the early 1980s, showed that the remnant glomeruli hyperfiltered and then developed sclerosis, and that lowering glomerular pressure (with a low-protein diet or, later, ACE inhibition) slowed the damage. High pressure stretches and injures podocytes, which cannot divide to replace themselves. Protein leaking through damaged glomeruli is taken up by proximal tubular cells and triggers inflammation and fibrosis in the interstitium. Interstitial fibrosis correlates more closely with loss of GFR than glomerular damage does. Each step removes more nephrons and increases the load on those that remain.
:::

This explains the main kidney-protective treatments. **Blood pressure control** lowers the pressure transmitted to the glomeruli. **ACE inhibitors and angiotensin receptor blockers** dilate the efferent arteriole and lower glomerular pressure specifically, which reduces albuminuria. **SGLT2 inhibitors** increase sodium delivery to the macula densa, which restores tubuloglomerular feedback and constricts the afferent arteriole. Both drug classes cause a small, expected fall in eGFR in the first weeks, a sign that glomerular pressure has fallen, followed by slower decline over the long term.

::: widget plot
f: E-r*x; E-x
x: 0, 20
y: 0, 100
sliders: E=60:20:90:1; r=4:0.5:10:0.5
hlines: 15
labels: \text{eGFR, decline } r\text{ per year};\ \text{eGFR, decline 1 per year}
caption: eGFR (mL/min/1.73 m²) over years for a person starting at $E$ and losing $r$ mL/min/1.73 m² a year, against a slow decline of 1 a year (roughly the loss seen with healthy ageing). The horizontal line at 15 marks kidney failure (G5). Halving the rate of decline, which is what combinations of kidney-protective treatments aim for, can delay kidney failure by many years or beyond a person's lifetime. A simplified linear model; real eGFR trajectories are often non-linear.
:::

## Slowing progression and reducing cardiovascular risk

The main interventions, in line with NICE NG203 and KDIGO 2024, are as follows. Drug choices and thresholds are applied to individuals following current guidance.

- **Blood pressure.** NICE recommends a clinic target of below 140/90 mmHg (systolic target range 120–139) for people with CKD and ACR below 70 mg/mmol, and below 130/80 mmHg (systolic 120–129) for those with ACR 70 mg/mmol or more. KDIGO suggests a systolic target below 120 mmHg, measured in standardised conditions, when tolerated. Targets are individualised in frailty.
- **ACE inhibitor or angiotensin receptor blocker** (not both together), titrated to the highest licensed dose tolerated, for people with CKD and diabetes with ACR above 3 mg/mmol, people with hypertension and ACR above 30 mg/mmol, and anyone with ACR of 70 mg/mmol or more. Potassium and creatinine are checked before and 1–2 weeks after starting or increasing the dose.
- **SGLT2 inhibitor** (such as dapagliflozin or empagliflozin). Large trials (CREDENCE, DAPA-CKD, EMPA-KIDNEY) showed slower progression and fewer cardiovascular events in people with CKD, with and without diabetes. NICE recommends them for people with type 2 diabetes and CKD with ACR above 30 mg/mmol and considers them at lower ACR; NICE technology appraisals extend their use to many people without diabetes. KDIGO 2024 recommends them for people with eGFR 20 or more who have ACR of about 22.6 mg/mmol (200 mg/g) or more, or heart failure.
- **Finerenone**, a non-steroidal mineralocorticoid receptor antagonist, reduces progression in type 2 diabetes with albuminuria, with monitoring for hyperkalaemia.
- **Statin**: atorvastatin is recommended for primary and secondary prevention of cardiovascular disease in CKD.
- **Lifestyle**: stopping smoking, physical activity, a healthy weight, limiting salt. Very high-protein diets are avoided; low-protein diets are used only under specialist dietetic supervision.
- **Avoiding harm**: avoid NSAIDs where possible, adjust drug doses to kidney function, give sick day guidance, and vaccinate against influenza, pneumococcus and, in those heading for dialysis, hepatitis B.

::: example A review in the CKD clinic {#ex-progression}
A 64-year-old man of South Asian heritage has type 2 diabetes and hypertension. eGFR is 41 mL/min/1.73 m², stable over a year; ACR is 48 mg/mmol. Blood pressure is 146/88 mmHg on amlodipine. HbA1c is 62 mmol/mol. He takes metformin and ibuprofen for back pain, and smokes. Classify his CKD and outline a plan.
::: solution
**Classification**: G3b A3, probably diabetic kidney disease. He is at high risk of progression and of cardiovascular events.

**Plan**, following current guidance:
- **Stop ibuprofen** and find alternative analgesia.
- **Start an ACE inhibitor or angiotensin receptor blocker** (indicated for diabetes with ACR above 3), titrate to the maximum tolerated dose, and check potassium and creatinine 1–2 weeks later. A rise in creatinine of up to 30% is acceptable.
- **Add an SGLT2 inhibitor**, which also helps glucose control; and consider finerenone later if albuminuria persists and potassium allows.
- **Blood pressure**: his ACR is below 70, so the NICE target is below 140/90; the ACE inhibitor should achieve this, alongside amlodipine.
- **Metformin**: continue at a reduced dose appropriate to his eGFR, following the product information.
- **Statin**: atorvastatin.
- **Smoking cessation** support.
- Calculate his 5-year kidney failure risk and review eGFR and ACR at least every 6 months. Refer to nephrology if ACR rises to 70 or more (unless explained by diabetes and already appropriately treated), if eGFR falls quickly, or if his 5-year risk of kidney failure exceeds 5%.
:::
:::

## The complications of CKD

As GFR falls, the kidney's other functions fail too. It makes less erythropoietin and less calcitriol, excretes less phosphate, acid and potassium, and loses its ability to adjust sodium and water excretion.

::: definition The complications of CKD {#def-complications}
- **Anaemia**: mainly from reduced **erythropoietin** production, with iron deficiency and inflammation contributing. It becomes common below an eGFR of about 30–45. It is normocytic and normochromic.
- **CKD–mineral and bone disorder** (CKD-MBD): phosphate retention raises **FGF23** and lowers calcitriol; calcium absorption falls; **PTH** rises (secondary hyperparathyroidism). The results are bone disease (renal osteodystrophy) and, more importantly, **vascular calcification**, which contributes to cardiovascular disease.
- **Metabolic acidosis**: reduced ammonium excretion leads to a low bicarbonate, which accelerates muscle and bone loss and may speed CKD progression.
- **Hyperkalaemia**, worsened by ACE inhibitors and other drugs.
- **Fluid and sodium retention**: hypertension and oedema.
- **Uraemic symptoms** in advanced CKD: fatigue, itch, nausea, poor appetite, restless legs, cognitive slowing and, rarely now, pericarditis and encephalopathy.
- **Cardiovascular disease**: the leading cause of death in CKD.
- **Altered drug handling**: renally cleared drugs accumulate.
:::

**Anaemia** is investigated by checking iron status and excluding other causes. In CKD, iron deficiency is defined more generously than usual (for example, a ferritin below 100 µg/L, or a transferrin saturation below 20%), because inflammation raises ferritin. Iron is replaced first, often intravenously. **Erythropoiesis-stimulating agents** (epoetin, darbepoetin) are then used, aiming for a haemoglobin of about **100–120 g/L** (NICE NG8). Targeting a normal haemoglobin increased stroke and other cardiovascular events in trials, which is why the target is deliberately below normal. Newer oral drugs that inhibit HIF prolyl hydroxylase stimulate the body's own erythropoietin.

**CKD-MBD** is managed by limiting dietary phosphate, then using **phosphate binders** taken with meals; treating vitamin D deficiency; and, for persistent secondary hyperparathyroidism, active vitamin D analogues, calcimimetics (cinacalcet) or parathyroidectomy.

**Acidosis**: NICE suggests considering oral sodium bicarbonate for people with an eGFR below 30 and a serum bicarbonate below 20 mmol/L.

::: warning Drugs and CKD {#warn-drugs}
Many adverse drug events in CKD are predictable. Renally cleared drugs (some antibiotics, gabapentinoids, low molecular weight heparins, direct oral anticoagulants, digoxin, lithium, metformin, sulfonylureas) accumulate as GFR falls; doses are adjusted using the product information, often with Cockcroft–Gault creatinine clearance and actual body weight. Some drugs are nephrotoxic (NSAIDs, aminoglycosides). Some cause hyperkalaemia (ACE inhibitors, angiotensin receptor blockers, mineralocorticoid antagonists, trimethoprim). And opioids such as morphine have active metabolites that accumulate and cause drowsiness and respiratory depression. A pharmacist review is valuable in advanced CKD ([[pharmacology/dosing-principles]]).
:::

## Kidney failure: dialysis, transplantation and conservative care

When eGFR falls towards 15–20 and kidney failure is expected within a year or so, preparation begins. People are offered education about all options and supported to choose the one that fits their life and values.

::: definition Renal replacement therapy {#def-rrt}
**Haemodialysis** removes solutes by diffusion across a semipermeable membrane in an external circuit, and removes fluid by ultrafiltration. It is usually done three times a week for about four hours, in a unit or at home. The best vascular access is an **arteriovenous fistula**, created surgically months in advance so it can mature; grafts and central venous catheters have higher infection and thrombosis rates.

**Peritoneal dialysis** uses the peritoneum as the membrane. Dialysis fluid is run into the abdomen through a catheter, left to equilibrate and drained, either by the person several times a day (continuous ambulatory PD) or by a machine overnight (automated PD). It is done at home and preserves residual kidney function well; its main complications are peritonitis and, over years, loss of peritoneal membrane function.

**Conservative kidney management** is active care without dialysis: managing symptoms, fluid, anaemia and other complications, and planning for the end of life. For some older people with multiple illnesses, dialysis may not extend life meaningfully and adds a heavy burden of treatment, so conservative care is a reasonable choice made with the person.
:::

The decision to start dialysis is based on symptoms and complications rather than a single eGFR value. In the IDEAL trial (2010), planned early start at an eGFR of 10–14 mL/min did not improve survival or other outcomes compared with a later start at 5–7 mL/min, with most of the later group starting when symptoms developed.

::: quiz {#quiz-access}
A 58-year-old woman with CKD G4 whose eGFR is falling by 6 mL/min/1.73 m² a year has chosen haemodialysis. Her eGFR is now 18. What is the most important step to arrange now?
- [ ] Insertion of a tunnelled central venous catheter
- [x] Referral for creation of an arteriovenous fistula, protecting the veins of her non-dominant arm
- [ ] Starting dialysis immediately
- [ ] Repeat eGFR in 12 months
::: solution
A fistula needs weeks to months to mature, so it is created in advance of need, typically when kidney failure is expected within about 6–12 months. Veins in the arm intended for the fistula should be protected from cannulation and blood tests. Starting dialysis through a central venous catheter is associated with more infections and worse outcomes. Starting dialysis now is not indicated without symptoms or complications, and waiting 12 months risks needing emergency dialysis without access.
:::
:::

::: example A cloudy bag {#ex-peritonitis}
A 61-year-old man on continuous ambulatory peritoneal dialysis notices that his drained fluid is cloudy and he has mild abdominal pain. He is not septic. What is the likely diagnosis, how is it confirmed, and what are the principles of treatment?
::: solution
Cloudy effluent with abdominal pain in a person on PD is **PD peritonitis** until proven otherwise. It is confirmed by sending the effluent for a white cell count (more than 100 cells per microlitre, with more than 50% neutrophils, after a dwell of at least two hours) and culture. Organisms are usually skin bacteria entering through a touch contamination during an exchange (coagulase-negative staphylococci, *Staphylococcus aureus*) or, less often, bowel organisms.

Treatment, according to ISPD guidance and local protocols, is with **intraperitoneal antibiotics** covering both Gram-positive and Gram-negative organisms, adjusted once culture results are available. Most episodes resolve. Relapsing or fungal peritonitis usually requires removal of the PD catheter. The exchange technique is reviewed with him to prevent recurrence.
:::
:::

::: definition Kidney transplantation {#def-tx}
**Kidney transplantation** is the best treatment for most people with kidney failure who are fit enough for surgery: compared with remaining on dialysis, it gives longer survival and better quality of life. Kidneys come from **living donors** (relatives, partners, friends or altruistic donors) or **deceased donors**. Living-donor kidneys generally function for longer. A transplant performed before dialysis is needed (**pre-emptive** transplant) gives the best results.

The kidney is placed in the iliac fossa and connected to the iliac vessels and the bladder. Recipients need lifelong **immunosuppression**, typically a calcineurin inhibitor (tacrolimus), an antiproliferative agent (mycophenolate) and, in many programmes, corticosteroids. The main long-term problems are **rejection**, **infection** (cytomegalovirus, BK polyomavirus, opportunistic infections), **cancer** (particularly skin cancer and post-transplant lymphoproliferative disorder), cardiovascular disease and drug toxicity.
:::

::: example A rising creatinine four months after transplant {#ex-transplant}
A 45-year-old woman received a deceased-donor kidney transplant four months ago. Her creatinine has risen from a stable 110 to 165 µmol/L. She feels well. Her tacrolimus level is in the target range. Urine shows no infection. List the main possibilities and the key investigations.
::: solution
A sustained rise of 50% in a transplant recipient is **allograft dysfunction** needing prompt investigation. The main possibilities are:

- **acute rejection**, T-cell mediated or antibody-mediated (checked with donor-specific antibodies);
- **calcineurin inhibitor toxicity** (less likely with a target-range level, but possible);
- **BK polyomavirus nephropathy**, typically in the first year, detected by measuring BK virus in the blood;
- **obstruction** (ultrasound) or **transplant renal artery stenosis** (Doppler ultrasound);
- **prerenal** causes such as dehydration;
- **recurrence** of the original disease.

Investigations: repeat creatinine, ultrasound with Doppler, BK virus PCR, donor-specific antibodies and, usually, a **transplant biopsy**, which is the definitive test. Treatment depends on the cause: more immunosuppression for rejection, less for BK virus nephropathy. Getting the diagnosis right matters because the treatments go in opposite directions.
:::
:::

## Glomerular disease

Glomerular diseases damage the filtration barrier. They present in two broad patterns, though many conditions show features of both.

::: definition Nephrotic and nephritic syndromes {#def-gn}
**Nephrotic syndrome** is heavy proteinuria (more than about 3 g a day, PCR above about 300 mg/mmol) with **hypoalbuminaemia** (albumin below about 30 g/L) and **oedema**, usually with hyperlipidaemia. It results from damage to the podocytes or GBM without much inflammation. Its complications include venous and arterial thrombosis (loss of anticoagulant proteins, raised clotting factors), infection (loss of immunoglobulins) and hyperlipidaemia.

**Nephritic syndrome** results from inflammation in the glomeruli: haematuria with red cell casts, proteinuria (usually less than nephrotic range), hypertension, oedema, and a falling GFR with reduced urine output. When GFR falls over days to weeks with crescents on biopsy it is called **rapidly progressive glomerulonephritis** (RPGN), a medical emergency.

| Condition | Typical pattern | Key features |
|---|---|---|
| Minimal change disease | nephrotic | commonest cause in children; normal light microscopy, podocyte foot process effacement; usually responds to corticosteroids |
| Focal segmental glomerulosclerosis | nephrotic | primary, genetic, or secondary to obesity, reduced nephron mass, HIV; risk of progression |
| Membranous nephropathy | nephrotic | commonest primary cause in white adults; anti-PLA2R antibodies in most primary cases; associations with cancer, drugs, hepatitis B and lupus |
| Diabetic kidney disease | nephrotic or albuminuric | long-standing diabetes, often with retinopathy |
| Amyloidosis | nephrotic | AL (light chain) or AA (chronic inflammation) |
| IgA nephropathy | nephritic, often haematuria | commonest primary glomerulonephritis worldwide; visible haematuria 1–2 days after a throat infection |
| Post-infectious glomerulonephritis | nephritic | 1–3 weeks after streptococcal throat or skin infection; low C3; children mostly recover |
| ANCA-associated vasculitis | RPGN | anti-PR3 or anti-MPO antibodies; may involve lungs, upper airways, skin |
| Anti-GBM disease | RPGN | antibodies to type IV collagen; with lung haemorrhage, called Goodpasture's disease |
| Lupus nephritis | either | classified by biopsy; low complement, anti-dsDNA |
:::

Investigation includes urine microscopy, ACR and PCR, kidney function, complement (C3, C4), antinuclear and anti-dsDNA antibodies, ANCA, anti-GBM antibodies, anti-PLA2R, serum free light chains and protein electrophoresis, hepatitis B and C and HIV serology, and, in most adults, a **kidney biopsy**. Children with typical nephrotic syndrome are usually treated with corticosteroids without a biopsy, because most have minimal change disease.

::: example Swollen legs and frothy urine {#ex-nephrotic}
A 52-year-old man has had swollen legs for six weeks and noticed frothy urine. His blood pressure is 138/84 mmHg. Urine PCR is 820 mg/mmol (about 8 g/day), albumin 18 g/L, cholesterol 9.8 mmol/L, eGFR 72. Urine microscopy shows no red cell casts. Anti-PLA2R antibodies are strongly positive. Interpret and outline management principles.
::: solution
**Nephrotic syndrome**: heavy proteinuria, hypoalbuminaemia, oedema and hyperlipidaemia. A positive anti-PLA2R antibody in an adult with nephrotic syndrome strongly suggests **primary membranous nephropathy**; antibodies against the podocyte phospholipase A2 receptor form immune deposits under the podocytes. In some centres a high titre is accepted as diagnostic without biopsy. Age-appropriate cancer screening is still considered because membranous nephropathy can be secondary to cancer.

**Supportive management**: loop diuretics and salt restriction for oedema; an ACE inhibitor or angiotensin receptor blocker to reduce proteinuria; a statin; and assessment of thrombosis risk, because membranous nephropathy with albumin this low carries a high risk of venous thrombosis, including renal vein thrombosis, and prophylactic anticoagulation is often considered.

**Specific treatment**: some people remit spontaneously, so antibody levels and proteinuria are monitored. Those at high risk of progression receive immunosuppression, commonly **rituximab**, guided by the anti-PLA2R level, under specialist care.
:::
:::

::: history
In 1943, in the occupied Netherlands, Willem Kolff built a rotating drum dialyser from sausage casing and a washing-machine-like tank. Most of his first patients died, but in 1945 a woman in acute kidney failure recovered after dialysis, proving the principle. Long-term dialysis needed repeatable access to the circulation; in 1960 Belding Scribner in Seattle introduced a Teflon shunt between an artery and a vein, and in 1966 James Cimino, Michael Brescia and colleagues described the surgically created arteriovenous fistula still preferred today. On 23 December 1954, at the Peter Bent Brigham Hospital in Boston, Joseph Murray's team, with John Merrill and the urologist Hartwell Harrison, transplanted a kidney between identical twins, Ronald and Richard Herrick. Because the twins were genetically identical there was no rejection, and Richard lived for eight more years. Murray shared the 1990 Nobel Prize in Physiology or Medicine. Later, recombinant human erythropoietin, cloned by Fu-Kuen Lin in 1985 and shown to correct the anaemia of dialysis patients by Joseph Eschbach and colleagues in 1987, replaced one of the kidney's hormonal functions.
:::

## Where this leads

Hypertension as a cause and consequence of CKD is in [[cardiovascular/hypertension]]. Diabetic kidney disease is part of [[endocrine/diabetes-complications]]. Vasculitis and lupus are covered in [[musculoskeletal/connective-tissue-vasculitis]]. The ethics of organ allocation are in [[medical-ethics-law/justice-resources]], and decisions about conservative care in [[geriatrics-palliative/end-of-life-care]].

::: summary
- CKD: abnormal kidney structure or function for more than 3 months; eGFR below 60 or markers of damage such as ACR 3 mg/mmol or more. Classify by cause, GFR category (G1–G5) and albuminuria category (A1–A3).
- Risk rises with lower eGFR and higher ACR; the Kidney Failure Risk Equation estimates 5-year risk of kidney failure.
- Surviving nephrons hyperfilter, which preserves GFR at first but drives progression; treatments that lower glomerular pressure slow it.
- Kidney protection: blood pressure control, ACE inhibitor or angiotensin receptor blocker, SGLT2 inhibitor, finerenone in type 2 diabetes with albuminuria, statin, stopping smoking, avoiding NSAIDs.
- Complications: anaemia (iron then ESA, target haemoglobin about 100–120 g/L), CKD-MBD (phosphate, PTH, vascular calcification), acidosis, hyperkalaemia, fluid overload, cardiovascular disease, drug accumulation.
- Kidney failure options: haemodialysis (fistula preferred), peritoneal dialysis, transplantation (best for most who are fit), and conservative care; start dialysis on symptoms, not an eGFR number.
- Nephrotic syndrome (proteinuria above 3 g/day, albumin below 30 g/L, oedema) and nephritic syndrome (haematuria with casts, hypertension, falling GFR); RPGN is an emergency.
:::

## Exercises

::: exercise Classify the CKD {level=1}
Give the GFR and albuminuria categories for: (a) eGFR 38, ACR 12 mg/mmol; (b) eGFR 78, ACR 1.5 mg/mmol, polycystic kidneys on ultrasound; (c) eGFR 52, ACR 1.2 mg/mmol, measured twice four months apart; (d) eGFR 22, ACR 160 mg/mmol.
::: solution
(a) G3b A2. (b) G2 A1; this is CKD because imaging shows structural damage. (c) G3a A1; CKD because eGFR has been below 60 for more than 3 months. (d) G4 A3; very high risk, and an ACR of 70 or more is itself a reason for nephrology referral.
:::
:::

::: exercise Years to kidney failure {level=1 check="(45-15)/5"}
A woman's eGFR is 45 mL/min/1.73 m² and has fallen steadily by 5 mL/min/1.73 m² a year. If this rate continues in a straight line, how many years until her eGFR reaches 15?
::: solution
$(45 - 15)/5 = 6$ years. If treatment halves the rate of decline to 2.5 a year, the time doubles to 12 years. A decline of more than 15 mL/min/1.73 m² in a year, or a sustained fall of 25% or more with a change of category within 12 months, would itself be a NICE criterion for nephrology referral.
:::
:::

::: exercise Nephrotic or nephritic {level=1}
For each presentation, say whether it is nephrotic or nephritic and name the most likely condition: (a) a 4-year-old with puffy eyes and generalised oedema, albumin 14 g/L, bland urine; (b) a 9-year-old with dark urine, oedema and hypertension two weeks after impetigo, low C3; (c) a 67-year-old man with haemoptysis, rapidly rising creatinine and red cell casts, positive MPO-ANCA.
::: solution
(a) Nephrotic; **minimal change disease**, which usually responds to corticosteroids. (b) Nephritic; **post-streptococcal glomerulonephritis**. (c) Nephritic, rapidly progressive; **ANCA-associated vasculitis** (microscopic polyangiitis) with pulmonary involvement, an emergency needing immunosuppression.
:::
:::

::: exercise Work the anaemia {level=2}
A 70-year-old woman with CKD G4 has a haemoglobin of 92 g/L, MCV 84 fL, ferritin 85 µg/L and transferrin saturation 15%. She is breathless on exertion. Outline the approach to her anaemia.
::: solution
Exclude other causes of anaemia (blood loss, B12 and folate deficiency, haemolysis, myeloma) as appropriate. By CKD criteria she is **iron deficient** (ferritin below 100 µg/L, transferrin saturation below 20%), so **iron replacement** comes first, often intravenously in advanced CKD because oral iron is poorly absorbed and less well tolerated. If anaemia persists once iron-replete, an **erythropoiesis-stimulating agent** is considered, aiming for a haemoglobin of about 100–120 g/L. A normal haemoglobin is not the target, because trials showed higher targets increased stroke and cardiovascular events. Blood pressure is monitored, as ESAs can raise it.
:::
:::

::: exercise Choose the dialysis {level=2}
Two people with kidney failure are choosing a dialysis modality. (a) A 42-year-old teacher who wants to keep working and has good manual dexterity and support at home. (b) An 81-year-old man with severe heart failure, poor vision and moderate dementia, living alone. Discuss the options for each.
::: solution
(a) **Peritoneal dialysis** (automated overnight PD would let her work by day) or **home haemodialysis** suit her goals; she should also be assessed for a **kidney transplant**, ideally pre-emptive from a living donor if one is available, because this offers the best long-term outcome.

(b) Dialysis would be difficult: PD requires vision and dexterity, and in-centre haemodialysis means travel three times a week, with hypotension during sessions worsened by heart failure. With his comorbidities, dialysis may not extend his life meaningfully. **Conservative kidney management** is a reasonable option to discuss, involving him, his family and a capacity assessment as needed ([[medical-ethics-law/consent-capacity]]). If he chooses dialysis, assisted PD or in-centre haemodialysis can be considered.
:::
:::

::: exercise Separate the rejection {level=2}
Explain why it matters to distinguish acute rejection from BK polyomavirus nephropathy in a transplant recipient with a rising creatinine, and how the distinction is made.
::: solution
The treatments are opposite. Rejection is treated with **more** immunosuppression (for example pulsed corticosteroids or antibody therapy), while BK nephropathy is caused by too much immunosuppression and is treated by **reducing** it. Giving more immunosuppression for BK nephropathy would allow the virus to destroy the graft; reducing it in rejection would allow rejection to progress. The distinction is made by measuring BK virus DNA in the blood and by **transplant biopsy**, which shows viral inclusions and SV40 staining in BK nephropathy, or the characteristic inflammation in rejection; donor-specific antibodies support antibody-mediated rejection.
:::
:::

::: exercise The phosphate question {level=3}
In advanced CKD, explain the sequence of events linking falling GFR to raised PTH and vascular calcification. Why does a "normal" serum phosphate in CKD G3 not exclude a phosphate problem?
::: solution
As GFR falls, the kidney's capacity to excrete phosphate falls. Before serum phosphate rises, bone releases **FGF23**, which increases phosphate excretion per nephron and suppresses renal 1α-hydroxylase. Calcitriol falls, intestinal calcium absorption falls, and **PTH rises**, which also increases phosphate excretion. These hormonal changes keep serum phosphate normal in CKD G3, at the cost of high FGF23 and PTH, which are themselves associated with left ventricular hypertrophy and bone disease. Only in more advanced CKD do these compensations fail and phosphate rise. High phosphate, with high calcium-phosphate product and loss of calcification inhibitors, promotes transformation of vascular smooth muscle cells into bone-like cells, causing **vascular calcification**, a major contributor to cardiovascular death in CKD. So a normal phosphate in G3 hides an already-activated hormonal response.
:::
:::

::: exercise Rapidly progressive glomerulonephritis {level=3}
A 71-year-old woman has two weeks of fatigue, nosebleeds and arthralgia. Creatinine is 410 µmol/L (normal six months ago), urine dipstick blood 3+, protein 2+, with red cell casts. Chest radiograph shows patchy shadowing and she has coughed up blood. Discuss the differential diagnosis, urgent investigations and principles of management.
::: solution
**Rapidly progressive glomerulonephritis with pulmonary haemorrhage** (a pulmonary–renal syndrome). The main causes are **ANCA-associated vasculitis** (granulomatosis with polyangiitis is suggested by the upper airway symptoms; microscopic polyangiitis), **anti-GBM disease** (Goodpasture's disease), and less often lupus.

**Urgent investigations**: ANCA (PR3 and MPO) and anti-GBM antibodies, processed the same day; complement, antinuclear and anti-dsDNA antibodies; blood gas and oxygen saturation; a **kidney biopsy** as soon as safely possible.

**Management**: this is an emergency. Immunosuppression (high-dose corticosteroids with rituximab or cyclophosphamide) is often started before biopsy if the clinical picture is clear. **Plasma exchange** is used for anti-GBM disease and considered in selected severe vasculitis. Supportive care includes dialysis if needed and ventilatory support for lung haemorrhage. Outcomes depend on how much kidney function remains when treatment starts, which is why a urine dipstick in every unwell person with AKI matters ([[musculoskeletal/connective-tissue-vasculitis]]).
:::
:::
