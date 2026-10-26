Acute kidney injury (AKI) is a sudden fall in kidney function over hours to days. It is common, often silent and frequently preventable. It complicates a large share of emergency admissions, especially in older people, and affects many patients in intensive care. Most cases are not caused by primary kidney disease but by something else going wrong: dehydration, sepsis, heart failure, a drug, an obstructed bladder. The kidney is the organ that reveals how unwell the rest of the body is.

AKI matters for three reasons. It causes immediate dangers: hyperkalaemia, acidosis, fluid overload and accumulation of drugs. It is associated with higher mortality, even when mild, and the risk rises with stage. And people who survive AKI are more likely to develop chronic kidney disease later.

This lesson defines and stages AKI, explains how to find its cause using a three-part classification, and sets out the principles of management, the indications for dialysis and prevention. It builds on [[renal/filtration]] (GFR and creatinine), [[renal/water-sodium]] (volume) and [[renal/potassium-calcium-phosphate]] (hyperkalaemia). The UK framework referred to throughout is the NICE guideline NG148 (2019), which uses the KDIGO definitions.

## Definition and staging

::: definition KDIGO definition and staging of AKI {#def-ak}
The KDIGO (Kidney Disease: Improving Global Outcomes, 2012) definition of **acute kidney injury** is any of:

- a rise in serum creatinine of **26.5 µmol/L (0.3 mg/dL) or more within 48 hours**;
- a rise in serum creatinine to **1.5 times baseline or more**, known or presumed to have occurred **within the previous 7 days**;
- a urine output **below 0.5 mL/kg/h for 6 hours or more**.

AKI is **staged by whichever criterion, creatinine or urine output, gives the higher stage**:

| Stage | Serum creatinine | Urine output |
|---|---|---|
| 1 | 1.5–1.9 × baseline, or a rise of 26.5 µmol/L or more | below 0.5 mL/kg/h for 6–12 hours |
| 2 | 2.0–2.9 × baseline | below 0.5 mL/kg/h for 12 hours or more |
| 3 | 3.0 × baseline or more, or creatinine 354 µmol/L (4.0 mg/dL) or more, or renal replacement therapy started | below 0.3 mL/kg/h for 24 hours or more, or anuria for 12 hours or more |

A reduction in kidney function lasting 7–90 days is called **acute kidney disease** (AKD); beyond 90 days it meets the definition of chronic kidney disease.
:::

The definition is designed to be sensitive. Small rises in creatinine count, because even small rises predict worse outcomes. The cost is that some "AKI" is not real kidney injury. Creatinine may rise slightly after a meat meal or with drugs that block its tubular secretion, such as trimethoprim. A single raised value should be interpreted against the clinical picture and repeated.

**Baseline** creatinine is the lowest value in the previous three months, or the median value from three to twelve months before, if available. In England, laboratories run an automated AKI algorithm that compares each creatinine with previous results and issues an **AKI warning stage** to alert clinicians.

### Why creatinine lags

Creatinine is a poor real-time marker. When GFR falls suddenly, creatinine production continues and creatinine accumulates gradually until a new steady state is reached. The time this takes depends on the new GFR.

::: widget plot
f: 80/g+(80-80/g)*exp(-144*g*x/42)
x: 0, 10
y: 0, 900
sliders: g=0.1:0.05:1:0.05
hlines: 120; 160; 240
labels: \text{serum creatinine after GFR falls to fraction } g
caption: Serum creatinine (µmol/L) over days after GFR falls abruptly from 100 mL/min to a fraction $g$ of that, starting from 80 µmol/L, with creatinine distributed in 42 L of body water. The horizontal lines at 120, 160 and 240 µmol/L mark 1.5, 2 and 3 times baseline, the creatinine thresholds of KDIGO stages 1–3. Even a 90% loss of GFR ($g$ = 0.1) takes more than a day to reach stage 2. A simplified model assuming constant creatinine production; real patients who are acutely ill often make less creatinine.
:::

This lag has two consequences. Creatinine underestimates the severity of AKI in its first day or two, so **urine output** is often the earlier warning. And an eGFR calculated from a rising creatinine overestimates the true GFR, so eGFR should not be used to assess AKI or to dose drugs while creatinine is changing ([[renal/filtration]]).

## Finding the cause

::: definition Prerenal, intrinsic and postrenal AKI {#def-class}
**Prerenal AKI** is reduced GFR caused by reduced kidney perfusion, with the kidney itself structurally intact. Causes include hypovolaemia (bleeding, vomiting, diarrhoea, diuretics, poor intake), hypotension (sepsis, cardiogenic shock), reduced effective volume (heart failure, cirrhosis) and drugs that impair autoregulation (NSAIDs, ACE inhibitors, angiotensin receptor blockers). It reverses quickly when perfusion is restored. Prolonged or severe hypoperfusion progresses to tubular injury.

**Intrinsic AKI** is damage to the kidney itself:
- **acute tubular injury** (often called acute tubular necrosis, ATN), the commonest intrinsic cause, from ischaemia, sepsis or toxins (aminoglycosides, iodinated contrast, myoglobin in rhabdomyolysis, light chains in myeloma);
- **acute interstitial nephritis**, usually a drug reaction (proton pump inhibitors, penicillins, NSAIDs, immune checkpoint inhibitors) or infection;
- **glomerulonephritis**, particularly rapidly progressive forms (ANCA vasculitis, anti-GBM disease, lupus);
- **vascular** disease: thrombotic microangiopathy, cholesterol emboli, renal artery or vein occlusion, malignant hypertension.

**Postrenal AKI** is obstruction of urine flow anywhere from the renal pelvis to the urethra. To cause AKI, obstruction must affect both kidneys or a single functioning kidney. Common causes are prostatic enlargement, urinary retention from drugs or constipation, stones, pelvic tumours and blocked catheters.
:::

In practice, the cause is found by asking a few questions in a fixed order.

1. **Is there obstruction?** Examine for a palpable bladder, perform a bladder scan, check that any catheter is draining. NICE NG148 recommends urgent ultrasound of the urinary tract **within 24 hours** when no cause has been found or obstruction is suspected, and **within 6 hours** if an infected obstructed kidney (pyonephrosis) is suspected.
2. **Is perfusion inadequate?** Assess volume status, blood pressure relative to the person's usual level, heart failure and sepsis.
3. **Is there a nephrotoxin?** Review every drug, recent contrast, and causes of rhabdomyolysis or haemolysis.
4. **Is there evidence of intrinsic kidney disease?** Test the urine with a dipstick in everyone with AKI. Blood and protein on dipstick, in the absence of an obvious alternative such as a catheter or infection, suggest glomerulonephritis and need urgent investigation and discussion with a nephrologist.

### Urine tests

The **urine sediment** gives direct evidence from the kidney. Muddy brown granular casts and tubular cells suggest acute tubular injury. Red cell casts and dysmorphic red cells suggest glomerulonephritis. White cell casts and sterile pyuria suggest interstitial nephritis.

Urine sodium tells you whether the tubules are still conserving sodium. In prerenal AKI, intact tubules reabsorb sodium avidly and urine sodium is low; in tubular injury, sodium handling fails and more escapes.

::: theorem Fractional excretion of sodium {#thm-fena}
The **fractional excretion of sodium** (FENa) is the percentage of filtered sodium that is excreted:

$$
\text{FENa} (\%) = \frac{U_{Na} \times P_{Cr}}{P_{Na} \times U_{Cr}} \times 100
$$ {#eq-fena}

In oliguric AKI, a FENa **below 1%** suggests a prerenal state with intact tubular function; above **2%** suggests tubular injury. When diuretics have been given, the **fractional excretion of urea** is less affected; a value below about 35% suggests a prerenal state.
:::

::: proof
Fractional excretion is excreted sodium divided by filtered sodium. Excreted sodium per minute is $U_{Na} V$. Filtered sodium is $\text{GFR} \times P_{Na}$, and GFR can be estimated by creatinine clearance, $U_{Cr} V / P_{Cr}$. So

$$
\text{FENa} = \frac{U_{Na} V}{(U_{Cr} V / P_{Cr}) \times P_{Na}} = \frac{U_{Na} P_{Cr}}{P_{Na} U_{Cr}}
$$

The urine flow $V$ cancels, so FENa can be calculated from spot samples. Using a ratio to creatinine corrects for how concentrated the urine is, which a urine sodium alone cannot do.

FENa is only a guide. It is low in some intrinsic causes (contrast nephropathy, rhabdomyolysis, early sepsis, glomerulonephritis) and high in prerenal states when diuretics have blocked sodium reabsorption or when chronic kidney disease limits sodium conservation. Urea is mostly reabsorbed in the proximal tubule, upstream of loop and thiazide diuretics, so its fractional excretion remains low in prerenal states despite diuretics.
:::

::: example A prerenal picture hidden by diuretics {#ex-prerenal-diuretic}
An 80-year-old man with heart failure takes furosemide. After a week of poor appetite and diarrhoea, his creatinine has risen from 110 to 220 µmol/L. Blood pressure is 96/60 mmHg (usually 135/80) and he is dizzy on standing. Urine sodium is 45 mmol/L, plasma sodium 134 mmol/L, urine creatinine 8 mmol/L. Urine urea is 200 mmol/L, plasma urea 20 mmol/L. Calculate FENa and the fractional excretion of urea and interpret.
::: solution
Convert creatinine to the same unit: $U_{Cr} = 8000$ µmol/L, $P_{Cr} = 220$ µmol/L.

$$
\text{FENa} = \frac{45 \times 220}{134 \times 8000} \times 100 = 0.92\%
$$

Fractional excretion of urea:

$$
\text{FEUrea} = \frac{200 \times 220}{20 \times 8000} \times 100 = 27.5\%
$$

His creatinine has doubled: **stage 2 AKI**. The clinical picture of low blood pressure, postural dizziness and fluid loss suggests a **prerenal** cause. His urine sodium of 45 looks "high" because furosemide blocks sodium reabsorption, but the FENa is just under 1% and the FEUrea is below 35%, both consistent with a prerenal state.

Management: withhold furosemide and any ACE inhibitor while he is volume depleted, give cautious fluid with frequent reassessment (his heart failure limits how much he tolerates), monitor urine output and creatinine, and restart heart failure drugs once he has recovered, as part of a planned review.
:::
:::

::: example After the catheter laboratory {#ex-athero}
A 72-year-old man who smokes has coronary angiography and stenting via the femoral artery. Three weeks later his creatinine has risen from 120 to 310 µmol/L. He has painful purple mottling of the toes, a net-like rash on his legs (livedo reticularis), eosinophilia and low complement levels. What is the likely cause, and how does the timing help?
::: solution
This is **cholesterol embolism (atheroembolic kidney disease)**. Manipulating catheters in an atheromatous aorta dislodges cholesterol crystals that lodge in small arteries of the kidney, skin and gut, triggering inflammation. Eosinophilia and low complement are common.

The timing distinguishes it from **contrast-associated AKI**: after iodinated contrast, creatinine typically rises within 24–72 hours and recovers within one to two weeks, whereas atheroembolic AKI often appears days to weeks later and progresses stepwise, often with incomplete recovery. Treatment is supportive: avoid further vascular procedures where possible, control blood pressure, give statins for the underlying atherosclerosis. Anticoagulation is generally avoided because it may promote further embolisation.
:::
:::

## Management

::: definition Principles of AKI management {#def-support}
There is no drug that heals the injured kidney. Management aims to **remove the cause, restore perfusion, prevent further injury and treat the complications** until the kidney recovers. The core actions, consistent with NICE NG148, are:

- **assess and correct volume status**: give fluid to people who are hypovolaemic, with frequent reassessment; avoid fluid overload, which worsens outcomes;
- **restore blood pressure** in shock, with vasopressors in critical care if needed;
- **treat sepsis** promptly;
- **review every medicine**: stop nephrotoxins (NSAIDs, aminoglycosides where possible), temporarily withhold drugs that impair autoregulation or worsen volume (ACE inhibitors, angiotensin receptor blockers, diuretics), withhold drugs that accumulate and cause harm (metformin, some oral hypoglycaemics), and adjust the doses of renally cleared drugs;
- **relieve obstruction** with a bladder catheter or, for upper tract obstruction, nephrostomy or ureteric stent;
- **monitor** urine output, fluid balance, weight, creatinine and potassium;
- **refer to a nephrologist** for suspected intrinsic kidney disease (including glomerulonephritis), stage 3 AKI, complications not responding to medical treatment, or AKI in a kidney transplant recipient.
:::

Loop diuretics do not treat AKI and do not improve outcomes, but they can help manage fluid overload in someone whose kidneys still respond.

**Renal replacement therapy** (RRT; dialysis or haemofiltration) replaces kidney function while the kidney recovers. The indications are complications that are life-threatening and do not respond to medical treatment:

- **hyperkalaemia** that persists despite medical treatment;
- **metabolic acidosis** that is severe and refractory;
- **fluid overload**, particularly pulmonary oedema, that does not respond to diuretics;
- **uraemic complications**: pericarditis, encephalopathy, bleeding from uraemic platelet dysfunction;
- **poisoning** with a dialysable toxin, such as lithium, methanol, ethylene glycol or salicylate.

Starting RRT earlier, before these complications appear, has not been shown to improve survival. In the STARRT-AKI trial (2020), an accelerated strategy in critically ill people with severe AKI did not reduce 90-day mortality compared with a standard strategy and was associated with more dependence on dialysis at 90 days. RRT is therefore usually started for a clear indication rather than for a number.

::: example A ward round that prevents a crisis {#ex-oliguric}
A 68-year-old woman is admitted with pneumonia. On day 2 her creatinine has risen from 70 µmol/L (baseline) to 150 µmol/L. She weighs 60 kg and has passed 220 mL of urine in the last 12 hours. Her blood pressure is 92/50 mmHg (usually 130/80). She takes ramipril, furosemide, metformin and naproxen, all still prescribed. Her potassium is 5.7 mmol/L. Stage the AKI and list the actions.
::: solution
**Creatinine**: $150/70 = 2.14$ times baseline, stage 2.

**Urine output**: $220 / 12 / 60 = 0.31$ mL/kg/h for 12 hours, below 0.5 for 12 hours or more: stage 2.

**Stage 2 AKI**, most likely prerenal and progressing to tubular injury from **sepsis** with hypotension, made worse by drugs that impair autoregulation.

**Actions**:
- treat the pneumonia and sepsis following the sepsis pathway; assess volume and give fluid boluses with reassessment;
- **stop naproxen**; withhold ramipril and furosemide while she is hypotensive and volume deplete; withhold metformin (risk of lactic acidosis in AKI); review antibiotic doses;
- measure urine output hourly, perhaps with a catheter if accurate monitoring is needed;
- dipstick the urine; consider ultrasound if she does not improve or there is no clear cause;
- treat the mild hyperkalaemia by stopping contributory drugs and recheck potassium; review for moderate or severe hyperkalaemia;
- recheck creatinine and potassium at least daily, and escalate to critical care if hypotension persists despite fluids.

On recovery, a plan for restarting her regular drugs, and a follow-up creatinine, should be in the discharge letter.
:::
:::

::: example The anticholinergic anuria {#ex-postrenal}
A 79-year-old man with benign prostatic enlargement is started on an antihistamine with anticholinergic effects for itching. Three days later he has lower abdominal pain, is passing only dribbles of urine and is confused. His creatinine is 340 µmol/L (baseline 95) and potassium 6.2 mmol/L. A bladder scan shows 1400 mL. Explain and outline management, including what to expect after treatment.
::: solution
**Acute urinary retention** caused by an anticholinergic drug in a man with prostatic enlargement, leading to **postrenal AKI**, stage 3 (creatinine more than 3 times baseline). Back pressure has reduced GFR in both kidneys.

**Management**: urethral catheterisation (suprapubic if urethral fails), stop the antihistamine, treat the moderate hyperkalaemia, and monitor. Creatinine usually falls over a few days if obstruction was brief.

After relief of significant obstruction, a **post-obstructive diuresis** can occur: urine output may exceed 200 mL/h for several hours. It is caused by excretion of retained salt, water and urea and by temporarily impaired tubular concentrating ability. Most of it is appropriate, but some people lose more than they should and become volume depleted or develop sodium and potassium disturbances. Fluid balance, weight and electrolytes are therefore monitored closely, with replacement of part of the losses guided by clinical status. His prostate is assessed before a trial without catheter ([[renal/urinary-tract]]).
:::
:::

::: warning Do not wait for the creatinine {#warn-aki}
Creatinine lags behind the injury by a day or more, so a "normal" or only slightly raised creatinine early in illness does not exclude AKI. Falling urine output in an unwell person is the earlier warning, but only if someone is measuring it. A second common mistake is to keep prescribing drugs on autopilot during acute illness: NSAIDs, ACE inhibitors, diuretics and metformin continued in a dehydrated or septic patient turn a reversible problem into a dangerous one. Review the drug chart at every stage of AKI.
:::

## Special situations and prevention

**Contrast-associated AKI.** Iodinated contrast can cause a rise in creatinine within 24–72 hours, although modern studies suggest that much of the AKI seen after scans is caused by the illness that prompted the scan. The risk is greatest in people with an eGFR below 30 mL/min/1.73 m², diabetes and heart failure. NICE NG148 advises considering intravenous volume expansion (with 0.9% saline or isotonic sodium bicarbonate) for adults with an eGFR below 30 or a kidney transplant, and temporarily stopping metformin in people with AKI. A needed contrast scan should not be withheld because of fear of AKI.

**Rhabdomyolysis.** Muscle breakdown (crush injury, prolonged immobility after a fall, extreme exercise, seizures, statins with interacting drugs, some recreational drugs) releases myoglobin, potassium and phosphate. Myoglobin damages tubules. Creatine kinase is markedly raised, and the urine dipstick shows blood without red cells. Early, generous fluid resuscitation is the main treatment, with close attention to potassium.

**Hepatorenal syndrome.** In advanced cirrhosis, intense renal vasoconstriction can cause AKI with otherwise normal kidneys. It is diagnosed after volume expansion with albumin fails and other causes are excluded, and is treated with vasoconstrictors such as terlipressin with albumin, under specialist care ([[gastrointestinal/liver-disease]]).

**Prevention** is more effective than treatment. It means identifying people at risk (older age, chronic kidney disease, diabetes, heart failure, liver disease, sepsis, hypovolaemia, nephrotoxic drugs, recent contrast, major surgery), keeping them hydrated, avoiding nephrotoxins where alternatives exist, monitoring creatinine and urine output during acute illness, and giving people on ACE inhibitors, angiotensin receptor blockers, diuretics, metformin and NSAIDs clear advice on pausing them during a dehydrating illness ("sick day guidance").

::: quiz
A 54-year-old woman starts omeprazole for dyspepsia. Six weeks later her creatinine has risen from 75 to 210 µmol/L. She has a low-grade fever and a faint rash. Urine dipstick shows leucocytes 2+, protein 1+, nitrite negative, and culture is sterile. What is the most likely diagnosis?
- [ ] Prerenal AKI from volume depletion
- [ ] Acute pyelonephritis
- [x] Acute interstitial nephritis
- [ ] Acute tubular injury from contrast
::: solution
AKI developing weeks after starting a new drug, with fever, rash and sterile pyuria, is typical of **drug-induced acute interstitial nephritis**. Proton pump inhibitors are among the commonest causes; many people have only some of the classic features. The usual treatment is to stop the drug; corticosteroids are sometimes given on specialist advice, and a kidney biopsy confirms the diagnosis when it is uncertain. The lack of nitrite and the sterile culture argue against infection.
:::
:::

::: history
During the London Blitz of 1940–41, Eric Bywaters and Desmond Beall described people rescued from collapsed buildings after their limbs had been trapped for hours. The victims seemed well at first, then developed shock, dark urine and kidney failure and died within days. Their 1941 report in the *British Medical Journal*, "Crush injuries with impairment of renal function", linked muscle injury to kidney failure, and later work identified myoglobin as the culprit. The lessons of crush syndrome, early fluid and attention to potassium, are still applied after earthquakes and building collapses. The first practical artificial kidney, built by Willem Kolff in the Netherlands during the same war, saved its first patient with acute kidney failure in 1945.
:::

## Where this leads

Some people do not recover from AKI and progress to acute kidney disease and then chronic kidney disease, which is covered in [[renal/chronic-kidney-disease]] together with the glomerulonephritides that can present as AKI. Shock, fluid resuscitation and organ support are in [[emergency-critical-care/shock-fluids]] and [[emergency-critical-care/critical-care]]. Drug dosing in reduced kidney function is in [[pharmacology/dosing-principles]], and AKI after surgery in [[surgery/perioperative-care]].

::: summary
- AKI (KDIGO): creatinine rise of 26.5 µmol/L or more within 48 hours, or to 1.5 times baseline within 7 days, or urine output below 0.5 mL/kg/h for 6 hours or more.
- Stage by the worse of creatinine and urine output: stage 1 (1.5–1.9×; below 0.5 mL/kg/h for 6–12 h), stage 2 (2.0–2.9×; below 0.5 mL/kg/h for 12 h or more), stage 3 (3× or more, creatinine 354 µmol/L or more, or RRT; below 0.3 mL/kg/h for 24 h or more, or anuria for 12 h or more).
- Creatinine lags behind injury; eGFR is invalid while creatinine is changing; urine output is an earlier signal.
- Classify the cause as prerenal, intrinsic (tubular, interstitial, glomerular, vascular) or postrenal. Always look for obstruction, dipstick the urine and review drugs.
- FENa below 1% suggests a prerenal state; FEUrea below about 35% is more reliable after diuretics.
- Management: treat the cause, restore perfusion, stop nephrotoxins, withhold ACE inhibitors, angiotensin receptor blockers, diuretics and metformin during the episode, relieve obstruction, monitor potassium and fluid.
- RRT for refractory hyperkalaemia, acidosis, fluid overload, uraemic complications or dialysable poisons; earlier routine start does not improve survival.
:::

## Exercises

::: exercise Stage the AKI {level=1 check="2"}
A man's baseline creatinine is 90 µmol/L. Two days into an admission with gastroenteritis it is 250 µmol/L. His urine output has been 0.4 mL/kg/h for the last 8 hours. What KDIGO stage is his AKI? Give the stage as a number.
::: solution
Creatinine ratio $= 250/90 = 2.78$, in the 2.0–2.9 range: **stage 2**. Urine output below 0.5 mL/kg/h for 8 hours meets stage 1 by urine. Staging uses the worse criterion, so the stage is **2**.
:::
:::

::: exercise Match the sediment {level=1}
Match each urine microscopy finding to the most likely intrinsic cause of AKI: (a) red cell casts; (b) muddy brown granular casts; (c) white cell casts with sterile pyuria; (d) dipstick blood 3+ with no red cells on microscopy.
::: solution
(a) Glomerulonephritis. (b) Acute tubular injury. (c) Acute interstitial nephritis (or pyelonephritis if infection is present). (d) Myoglobinuria from rhabdomyolysis (or haemoglobinuria from intravascular haemolysis).
:::
:::

::: exercise Indications for dialysis {level=1}
List five indications for urgent renal replacement therapy in AKI.
::: solution
Hyperkalaemia refractory to medical treatment; severe metabolic acidosis refractory to treatment; fluid overload (especially pulmonary oedema) not responding to diuretics; uraemic complications such as pericarditis or encephalopathy; and poisoning with a dialysable substance such as lithium, methanol, ethylene glycol or salicylate.
:::
:::

::: exercise Calculate the FENa {level=2 check="round(10*200/(135*12000)*100*100)/100"}
In an oliguric patient: urine sodium 10 mmol/L, plasma sodium 135 mmol/L, urine creatinine 12 mmol/L, plasma creatinine 200 µmol/L. Calculate FENa as a percentage, to two decimal places, and interpret it.
::: solution
$U_{Cr} = 12\,000$ µmol/L.

$$
\text{FENa} = \frac{10 \times 200}{135 \times 12\,000} \times 100 = 0.12\%
$$

Well below 1%: the tubules are conserving sodium avidly, consistent with a **prerenal** state (assuming no diuretics). The patient should be assessed for hypovolaemia or poor perfusion; FENa is a supporting test, not a substitute for clinical assessment.
:::
:::

::: exercise Contrast day {level=2}
A 66-year-old woman with type 2 diabetes and an eGFR of 26 mL/min/1.73 m² needs a contrast-enhanced CT scan for suspected bowel cancer. She takes metformin, ramipril and furosemide. Outline the principles for reducing her AKI risk.
::: solution
Do not withhold the scan if it is needed for diagnosis. With an eGFR below 30 she meets the NICE NG148 threshold for considering intravenous volume expansion (0.9% saline or isotonic sodium bicarbonate) around the procedure, following local protocol. Review her medicines: local guidance often advises withholding metformin around contrast in people with reduced eGFR and restarting once kidney function is confirmed stable; consider temporarily withholding diuretics if she is volume deplete. Use the lowest dose of contrast that gives a diagnostic scan. Check creatinine 48–72 hours after the scan.
:::
:::

::: exercise Recognise the thrombotic microangiopathy {level=2}
A 6-year-old boy has bloody diarrhoea for four days after a farm visit, then becomes pale and passes little urine. Haemoglobin is 72 g/L with fragmented red cells on the film, platelets 38 × 10⁹/L, creatinine 290 µmol/L. What is the diagnosis and what is the mechanism?
::: solution
**Haemolytic uraemic syndrome** (HUS) caused by **Shiga toxin-producing *Escherichia coli*** (commonly O157:H7), typically acquired from farm animals, undercooked meat or contaminated food. The toxin injures glomerular endothelium, causing microvascular thrombi that fragment red cells (microangiopathic haemolytic anaemia), consume platelets and block glomerular capillaries (AKI). Management is supportive, including dialysis if needed; antibiotics and antimotility drugs are generally avoided because they may increase toxin release. Most children recover kidney function, but some have long-term kidney damage. HUS is notifiable, and contacts may need public health follow-up ([[paediatrics/acute-childhood-illness]]).
:::
:::

::: exercise Decide on dialysis {level=2}
A 59-year-old man in intensive care with septic shock has stage 3 AKI. Potassium is 5.9 mmol/L and falling with treatment, pH 7.29, he is receiving noradrenaline and his chest is clear on a stable oxygen requirement. His urine output is 10 mL/h. A colleague suggests starting dialysis now "before things get worse". What does the evidence suggest?
::: solution
He has stage 3 AKI but **no current refractory complication**: potassium is controlled, acidosis is mild, and he is not fluid overloaded. Trials of earlier versus standard initiation, including STARRT-AKI (2020), have not shown a survival benefit from starting RRT before an indication arises, and accelerated strategies exposed more people to the risks of dialysis (catheter complications, hypotension) and were associated with more dialysis dependence at 90 days. A reasonable approach is to continue supportive care with close monitoring and clear criteria for starting RRT (refractory hyperkalaemia, worsening acidosis, fluid overload, or no recovery after a period), discussed with the critical care and renal teams.
:::
:::

::: exercise Design an AKI prevention pathway {level=3}
A hospital's audit shows that half of hospital-acquired AKI occurs in people who were already at risk on admission and were prescribed NSAIDs or continued on ACE inhibitors while acutely unwell. Design a pathway to reduce hospital-acquired AKI, explaining the physiology behind each element.
::: solution
1. **Risk assessment on admission**: flag people with chronic kidney disease, diabetes, heart failure, liver disease, age over 65, sepsis, hypovolaemia or nephrotoxic drugs. These are the people whose GFR depends most on prostaglandin and angiotensin II defences of glomerular pressure.
2. **Medicines review at admission and daily**: an electronic prompt to stop NSAIDs and withhold ACE inhibitors, angiotensin receptor blockers, diuretics and metformin in people who are hypotensive, septic or volume deplete, with a documented restart plan.
3. **Monitoring**: daily creatinine in at-risk patients; fluid balance and urine output charts that are reviewed, not just filled in.
4. **Electronic AKI alerts** linked to a care bundle (fluid assessment, urine dipstick, drug review, ultrasound when indicated), so the alert triggers action rather than just a message.
5. **Contrast and nephrotoxin protocols**: volume expansion when eGFR is below 30, drug level monitoring for aminoglycosides and vancomycin.
6. **Education** for doctors, nurses and pharmacists on prerenal physiology and the triple whammy.
7. **Discharge**: sick day guidance, a follow-up creatinine and a clear plan for restarting medicines.
8. **Audit and feedback** of AKI rates to wards, to sustain improvement.
:::
:::

::: exercise Interpret the trajectory {level=3}
Using the model in the figure, with a starting creatinine of 80 µmol/L and a GFR that falls abruptly to 10% of normal, the creatinine 24 hours later is about 290 µmol/L. (a) What KDIGO stage is that? (b) What would an eGFR calculation report at 24 hours, and why is it misleading? (c) Why might a real critically ill patient's creatinine rise more slowly than the model predicts?
::: solution
(a) $290/80 = 3.6$ times baseline: **stage 3**.

(b) An eGFR equation would treat 290 µmol/L as a steady-state value and report an eGFR of roughly 15–20 mL/min/1.73 m², depending on age and sex. The true GFR is about 10 mL/min and the creatinine is still rising towards its new steady state of 800 µmol/L. eGFR overestimates GFR whenever creatinine is rising.

(c) Critically ill people often make less creatinine (reduced muscle mass, immobility, sepsis-related reduction in production) and have a larger volume of distribution because of fluid resuscitation, which dilutes creatinine. Both slow the rise and can make AKI look milder than it is. This is one reason urine output, and newer biomarkers in research settings, are used alongside creatinine.
:::
:::
