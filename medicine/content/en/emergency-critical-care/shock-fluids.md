Shock is not the same as low blood pressure. It is a failure of the circulation to deliver enough oxygen to meet the needs of the tissues, and it can be present while the blood pressure is still normal. Cells that are short of oxygen switch to anaerobic metabolism, produce lactate, and eventually fail; organs follow, and a patient who stays in shock for long enough develops multiple organ failure even after the cause is fixed. Recognising shock early, working out which kind it is, and restoring oxygen delivery without causing new harm are the core skills of this chapter.

The chapter starts with the physiology of oxygen delivery and blood pressure, then classifies shock into four types, then covers the bedside assessment, intravenous fluids and their harms, vasopressors and inotropes, and the specific management of haemorrhage, sepsis, cardiogenic and obstructive shock. UK guidance (NICE CG174 on intravenous fluids, NICE NG253 on sepsis) and international guidance (Surviving Sepsis Campaign 2021) are followed; doses and volumes are given as typical adult values for teaching, and practice follows local protocols.

## The physiology of shock {#sec-physiology}

Tissues need oxygen. The amount delivered each minute depends on how much blood the heart pumps and how much oxygen that blood carries.

::: theorem Oxygen delivery {#thm-do2}
**Oxygen delivery** ($\dot{D}O_2$) is the product of cardiac output and arterial oxygen content:

$$
\dot{D}O_2 = \text{CO} \times C_aO_2 \times 10
$$ {#eq-do2}

where CO is in L/min, $C_aO_2$ is in mL of oxygen per dL of blood, and the factor 10 converts dL to L. Arterial oxygen content is mostly oxygen bound to haemoglobin, with a small dissolved fraction:

$$
C_aO_2 = 1.34 \times \text{Hb} \times S_aO_2 + 0.0225 \times P_aO_2
$$ {#eq-cao2}

with Hb in g/dL, $S_aO_2$ as a fraction and $P_aO_2$ in kPa. A healthy adult at rest receives about 1,000 mL of oxygen per minute and uses about 250 mL.
:::

::: proof
Each gram of fully saturated haemoglobin binds about 1.34 mL of oxygen, so the bound oxygen per dL is $1.34 \times \text{Hb} \times S_aO_2$. Oxygen dissolved in plasma follows Henry's law and is small: about 0.0225 mL/dL for each kPa of $P_aO_2$ (0.003 mL/dL per mmHg). Multiplying the content per dL by the volume pumped per minute gives the delivery. The equation shows the three ways delivery can fail: the heart pumps too little (hypovolaemic, cardiogenic or obstructive shock), the blood carries too little (anaemia, hypoxaemia, carbon monoxide), or the oxygen is delivered but cannot reach or be used by the cells (maldistribution of flow in distributive shock, mitochondrial dysfunction in sepsis). It also shows why raising $P_aO_2$ far above normal adds little, while correcting a low haemoglobin or cardiac output adds a lot.
:::

Blood pressure is regulated, not delivered. Mean arterial pressure (MAP) is approximately the product of cardiac output and systemic vascular resistance (SVR):

$$
\text{MAP} \approx \text{CO} \times \text{SVR}, \qquad \text{MAP} \approx \text{DBP} + \tfrac{1}{3}(\text{SBP} - \text{DBP})
$$ {#eq-map}

When cardiac output falls, the sympathetic nervous system raises SVR by constricting arterioles, and blood pressure is maintained. That is why early shock shows itself as tachycardia, cool pale peripheries, slow capillary refill, a narrow pulse pressure and a fall in urine output before hypotension appears. Organs such as the brain and kidneys autoregulate their blood flow within a range of pressures, and a MAP of about **65 mmHg** is the usual minimum target in adults, higher in some patients with chronic hypertension.

## Types of shock {#def-shock}

::: definition Shock and its four types {#def-shock-types}
**Shock** is life-threatening circulatory failure in which oxygen delivery is inadequate for the metabolic needs of the tissues, causing cellular dysoxia. It is usually accompanied by hypotension (MAP below 65 mmHg or systolic below 90 mmHg), signs of poor perfusion and a raised blood lactate, but none of these is required.

| Type | Mechanism | Examples | Typical findings |
|---|---|---|---|
| **Hypovolaemic** | Loss of circulating volume, low preload | Haemorrhage, vomiting and diarrhoea, burns, diabetic ketoacidosis | Cold peripheries, flat neck veins, low cardiac output, high SVR |
| **Cardiogenic** | Pump failure | Myocardial infarction, myocarditis, arrhythmia, acute valve failure | Cold peripheries, raised JVP, pulmonary oedema, low cardiac output |
| **Distributive** | Loss of vascular tone, maldistribution of flow | Sepsis, anaphylaxis, spinal cord injury (neurogenic), adrenal crisis | Often warm peripheries early, bounding pulse, low SVR, high or normal cardiac output |
| **Obstructive** | Blockage to filling or emptying of the heart | Tension pneumothorax, cardiac tamponade, massive pulmonary embolism | Raised JVP, clear lungs, low cardiac output |

Patients often have more than one type: septic shock with myocardial depression, or haemorrhage in a patient on beta-blockers.
:::

**Lactate** is a useful marker. A blood lactate above 2 mmol/L in a patient with suspected infection indicates hypoperfusion or cellular stress, and above 4 mmol/L is associated with high mortality. Lactate is not only a marker of oxygen debt: adrenaline, liver failure, metformin and seizures also raise it. A falling lactate after treatment is reassuring; a rising one is not.

The **shock index**, heart rate divided by systolic blood pressure, is a quick bedside indicator. It is normally about 0.5–0.7; values above 1 suggest significant shock, especially in bleeding, even when the blood pressure is still in the normal range.

::: example Classify the shock {#ex-classify}
Three patients arrive in the resuscitation room.

(a) A 71-year-old man with crushing chest pain, BP 82/56 mmHg, pulse 112/min, cold clammy hands, crackles to both mid-zones and a raised JVP.
(b) A 34-year-old woman with fever and a red, swollen leg, BP 78/40 mmHg, pulse 128/min, warm hands, bounding pulse, lactate 5.2 mmol/L.
(c) A 25-year-old motorcyclist with a stab wound to the left chest, BP 74/50 mmHg, pulse 136/min, distended neck veins, muffled heart sounds, equal breath sounds.

Classify each.
::: solution
(a) **Cardiogenic shock**, almost certainly from myocardial infarction: cold peripheries (low output, high SVR) with signs of high filling pressures (raised JVP and pulmonary oedema). Fluid boluses are likely to worsen the oedema; he needs an ECG, urgent reperfusion and support of cardiac output.

(b) **Distributive (septic) shock** from cellulitis or necrotising fasciitis: vasodilatation with warm peripheries and a wide pulse pressure early on, and a high lactate. Treatment is antibiotics, source control (urgent surgical review for necrotising infection), fluids and noradrenaline.

(c) **Obstructive shock** from **cardiac tamponade**: penetrating chest trauma, hypotension, distended neck veins and muffled heart sounds (Beck's triad), with equal breath sounds making tension pneumothorax less likely. He needs immediate decompression of the pericardium, in trauma usually by thoracotomy.
:::
:::

## Assessing the shocked patient {#sec-assessment}

Assessment follows ABCDE (see [[emergency-critical-care/acute-assessment]]), with these specific questions:

1. **Is the patient in shock?** Look for tachycardia, hypotension, slow capillary refill, mottled skin, confusion, a urine output below 0.5 mL/kg/h and a raised lactate.
2. **Which type?** Feel the peripheries (warm or cold), look at the neck veins, listen to the lungs and heart, and look for bleeding, infection and the cause. **Point-of-care ultrasound** shows the size and contraction of the left and right ventricles, pericardial fluid, the inferior vena cava, free fluid in the abdomen and pneumothorax, and can classify shock within minutes in trained hands.
3. **Is the patient likely to respond to fluid?** See below.
4. **What is the cause, and can it be fixed now?** Bleeding needs haemostasis, sepsis needs antibiotics and source control, a blocked coronary artery needs reperfusion, a tension pneumothorax needs decompression.

### Fluid responsiveness

A patient is **fluid responsive** if their stroke volume rises significantly (usually by 10–15% or more) after a fluid challenge. This depends on where they sit on their Frank–Starling curve. On the steep part of the curve, more preload stretches the ventricle and increases stroke volume. On the flat part, extra fluid raises filling pressures without raising output, and simply leaks into the lungs and tissues. In critically ill patients, only about half are fluid responsive at any given time.

The **passive leg raise** is a reversible fluid challenge: lifting the legs to 45° with the trunk flat returns about 300 mL of venous blood to the heart. If stroke volume or cardiac output (measured by echocardiography or a cardiac output monitor, not by blood pressure alone) rises by about 10% or more, the patient is likely to respond to fluid. Static measurements such as a single central venous pressure reading predict fluid responsiveness poorly.

::: widget plot
f: a*(1-exp(-x/6))
x: 0, 25
y: 0, 130
sliders: a=90:30:130:5
labels: \text{stroke volume}
caption: A simplified Frank–Starling curve: stroke volume (mL, vertical axis) against preload (end-diastolic filling, arbitrary units, horizontal axis). The slider sets contractility. On the steep left part of the curve a fluid bolus raises stroke volume; on the flat right part the same bolus raises filling pressure with little gain, which is where fluid causes oedema. A weak ventricle (low contractility) reaches the flat part sooner. The model is illustrative, not a clinical tool.
:::

## Intravenous fluids {#def-fluids}

::: definition Intravenous fluid types and the purposes of fluid therapy {#def-fluid-types}
**Crystalloids** are solutions of electrolytes (and sometimes glucose) in water. **Isotonic saline** (0.9% sodium chloride) contains 154 mmol/L each of sodium and chloride, more chloride than plasma. **Balanced crystalloids** (such as Hartmann's solution or Plasma-Lyte) have a composition closer to plasma, with lactate, acetate or gluconate replacing some chloride. **Glucose 5%** distributes into total body water once the glucose is metabolised and is not a resuscitation fluid. **Colloids** contain large molecules that stay in the circulation longer: **human albumin solution** and synthetic colloids such as gelatins and starches.

NICE guideline CG174 (adults in hospital) describes fluid therapy by its purpose, the **"5 Rs"**: **R**esuscitation, **R**outine maintenance, **R**eplacement of ongoing losses, **R**edistribution (for example into tissues in sepsis) and **R**eassessment. For resuscitation it recommends a bolus of 500 mL of crystalloid containing sodium 130–154 mmol/L over less than 15 minutes, followed by reassessment. Routine maintenance in adults is about 25–30 mL/kg/day of water with roughly 1 mmol/kg/day each of sodium, potassium and chloride and 50–100 g/day of glucose.
:::

Only about a quarter of an isotonic crystalloid bolus stays in the plasma for long; the rest moves into the interstitial space, where it causes oedema. The glycocalyx lining the endothelium is damaged in sepsis and inflammation, so even colloids leak. That is why fluid helps early in shock but becomes harmful once the patient is no longer responsive.

**Which crystalloid?** Large volumes of 0.9% saline cause a hyperchloraemic metabolic acidosis. In the SMART trial (2018), adults in US ICUs given balanced crystalloids had slightly fewer major adverse kidney events (a composite of death, new dialysis or persistent renal dysfunction) than those given saline. Two large trials (BaSICS, 2021, and PLUS, 2022) found no significant difference in mortality. Balanced crystalloids are now the usual choice in most patients, with saline preferred in some situations, such as traumatic brain injury (because some balanced solutions are slightly hypotonic) or hypochloraemic alkalosis from vomiting.

**Colloids.** Starch solutions were found to cause harm: in the 6S trial (2012) hydroxyethyl starch increased mortality and the need for renal replacement in severe sepsis, and in the CHEST trial (2012) increased the use of renal replacement therapy. Their use has been suspended or severely restricted in the UK and Europe. Albumin was found to be as safe as saline in general ICU patients (SAFE trial, 2004), but associated with higher mortality in traumatic brain injury; it is used selectively, for example in large-volume paracentesis in liver disease.

**How much?** The phases of resuscitation help: an early **salvage** phase, when fluid can be life-saving; an **optimisation** phase, when each bolus is given only if it is likely to help; a **stabilisation** phase, when fluid is given only for maintenance and losses; and a **de-escalation** phase, when excess fluid is removed. Positive fluid balance in ICU patients is associated with worse outcomes. In septic shock, the CLASSIC (2022) and CLOVERS (2023) trials found no difference in mortality between restrictive and more liberal fluid strategies after initial resuscitation, which supports a cautious, reassessed approach rather than large fixed volumes.

::: warning Treating a number instead of the patient
A low blood pressure or a low urine output in a patient who has already had several litres of fluid is often not a sign that more fluid is needed. Repeated boluses given to "fill the tank" without checking whether the previous bolus helped lead to pulmonary oedema, abdominal compartment syndrome, gut oedema and poor wound healing. Before each bolus, ask whether the patient is still fluid responsive; if not, the answer is usually a vasopressor, an inotrope, or treating the cause.
:::

## Vasopressors and inotropes {#sec-vasopressors}

**Vasopressors** constrict blood vessels and raise SVR; **inotropes** increase the force of contraction of the heart.

| Drug | Main receptor actions | Main use |
|---|---|---|
| **Noradrenaline** | α₁ ≫ β₁ | First-line vasopressor in septic and most vasodilatory shock |
| **Vasopressin** | V₁ receptors | Added to noradrenaline in septic shock |
| **Adrenaline** | β₁, β₂ and α₁ | Anaphylaxis; cardiac arrest; second-line in septic shock |
| **Dobutamine** | β₁ (with some β₂) | Inotrope for low cardiac output (cardiogenic shock, septic myocardial depression) |
| **Metaraminol** | α₁ | Short-term peripheral vasopressor (for example during anaesthesia or before central access) |

The Surviving Sepsis Campaign (2021) recommends noradrenaline as the first-line vasopressor, targeting an initial MAP of 65 mmHg, with vasopressin added when noradrenaline doses are rising. Vasopressors can be started through a good peripheral cannula while a central line is placed, to avoid delay. Steroids (hydrocortisone) are suggested for septic shock with an ongoing vasopressor requirement.

## Shock by type: specific management {#def-types}

### Haemorrhagic shock

Bleeding is treated by stopping it. Fluids buy time but cannot replace surgical, endoscopic or radiological control.

::: algorithm Principles of managing major haemorrhage {#def-haemorrhage}
1. **Control the bleeding**: direct pressure, tourniquets for limb haemorrhage, pelvic binders, surgery, endoscopy or interventional radiology.
2. **Activate the major haemorrhage protocol** so that blood components arrive in packs without delay.
3. **Permissive hypotension** in trauma until bleeding is controlled: aim for a palpable radial pulse or a systolic pressure of about 80–90 mmHg rather than a normal blood pressure, unless there is a traumatic brain injury, where a higher pressure is needed to protect cerebral perfusion.
4. **Give blood components, not crystalloid**: red cells and plasma in a high ratio, with platelets and fibrinogen replacement (cryoprecipitate or fibrinogen concentrate) guided by laboratory or point-of-care tests.
5. **Tranexamic acid** early (within 3 hours of injury) in trauma.
6. **Prevent the lethal triad** of hypothermia, acidosis and coagulopathy: warm all fluids and the patient, correct calcium (citrate in blood products binds it).
:::

The evidence behind these principles comes from trauma trials. **CRASH-2** (2010), in more than 20,000 trauma patients, found that tranexamic acid given within 3 hours reduced all-cause mortality (14.5% against 16.0%); given after 3 hours it was not beneficial. **PROPPR** (2015) compared transfusion of plasma, platelets and red cells in a 1:1:1 ratio with a 1:1:2 ratio in severely injured patients. The 1:1:1 group achieved haemostasis more often and had fewer deaths from exsanguination at 24 hours, but there was no significant difference in all-cause mortality at 24 hours or 30 days. Transfusion practice is covered in more detail in [[blood/transfusion]], and trauma care in [[surgery/trauma]].

### Septic shock

**Sepsis** is life-threatening organ dysfunction caused by a dysregulated host response to infection; **septic shock** is sepsis with persistent hypotension requiring vasopressors to keep MAP at 65 mmHg or more, and a lactate above 2 mmol/L despite adequate fluid resuscitation (the Sepsis-3 definitions of 2016). Management rests on early recognition (see [[emergency-critical-care/acute-assessment]]), blood cultures followed by antibiotics within an hour for those at highest risk, source control, fluids given in reassessed boluses, and noradrenaline. The Surviving Sepsis Campaign suggests about 30 mL/kg of crystalloid within the first 3 hours for sepsis-induced hypoperfusion, a weak recommendation that should be adjusted to the patient. The details are in [[infectious-diseases/fever-sepsis]].

### Cardiogenic shock

The commonest cause is acute myocardial infarction, and the most important treatment is **early revascularisation**: in the SHOCK trial (1999), emergency revascularisation did not significantly reduce mortality at 30 days, but mortality at 6 months was lower. Fluids are given cautiously, if at all. Low output is supported with inotropes such as dobutamine and with noradrenaline for hypotension. Mechanical circulatory support has had mixed results: the intra-aortic balloon pump did not reduce mortality in IABP-SHOCK II (2012), while in the DanGer Shock trial (2024), a microaxial flow pump reduced mortality at 180 days in selected patients with ST-elevation infarction and cardiogenic shock, at the cost of more complications. Arrhythmias causing shock are treated as described in [[emergency-critical-care/resuscitation#def-periarrest]].

### Obstructive shock

The three main causes each need a mechanical fix: **tension pneumothorax** (decompression), **cardiac tamponade** (pericardiocentesis or surgical drainage) and **massive pulmonary embolism** (thrombolysis, or surgical or catheter-directed embolectomy). All three cause a raised JVP and can be distinguished at the bedside by examination and ultrasound.

### Anaphylactic and other distributive shock

Anaphylaxis needs adrenaline first; fluids are added for persistent hypotension. It is covered in [[emergency-critical-care/anaphylaxis]]. **Neurogenic shock**, after high spinal cord injury, combines hypotension with bradycardia because sympathetic outflow is lost; it is treated with fluids, vasopressors and atropine for bradycardia. **Adrenal crisis** needs IV hydrocortisone.

## Worked cases

::: example Oxygen delivery in anaemia {#ex-do2}
A 66-year-old woman with a slow upper gastrointestinal bleed has Hb 80 g/L (8 g/dL), SaO₂ 97%, PaO₂ 12 kPa and a cardiac output of 5 L/min. Calculate her oxygen delivery, and the cardiac output she would need to maintain it if her Hb were normal at 150 g/L instead. What does this mean for her heart?
::: solution
By [[#eq-cao2]]:

$$
C_aO_2 = 1.34 \times 8 \times 0.97 + 0.0225 \times 12 = 10.40 + 0.27 = 10.67 \text{ mL/dL}
$$

By [[#eq-do2]], $\dot{D}O_2 = 5 \times 10.67 \times 10 \approx 533$ mL/min, about half of normal.

With Hb 15 g/dL and the same saturation, $C_aO_2 \approx 1.34 \times 15 \times 0.97 + 0.27 = 19.77$ mL/dL, so the same delivery would need only $533 / (19.77 \times 10) \approx 2.7$ L/min. The other way round, to deliver a normal 1,000 mL/min at her Hb she would need a cardiac output of about $1000 / 106.7 \approx 9.4$ L/min. Anaemia forces the heart to work much harder; in a patient with coronary disease that extra work can provoke ischaemia, which is why a restrictive transfusion threshold is adjusted for people with active cardiac disease.
:::
:::

::: example The variceal bleeder given nine litres {#ex-overload}
A 52-year-old man with alcohol-related cirrhosis has a variceal haemorrhage. Over the first night he receives 6 L of 0.9% saline and 3 L of other crystalloid to keep his systolic pressure above 110 mmHg, plus 2 units of red cells. In the morning he is breathless with bilateral crackles, his abdomen is tense, his Hb is 62 g/L and his chloride is 118 mmol/L. What went wrong?
::: solution
Several things.

- **Crystalloid instead of blood.** Bleeding was replaced with saline, which dilutes haemoglobin and clotting factors and does not carry oxygen. Red cells (in variceal bleeding, typically to a restrictive target of about 70–80 g/L) and correction of coagulopathy were needed.
- **Chasing a normal blood pressure.** In variceal haemorrhage, over-transfusion and over-filling raise portal pressure and can provoke re-bleeding. A lower target pressure is accepted until bleeding is controlled.
- **Saline excess.** Six litres of 0.9% saline caused a hyperchloraemic acidosis, and the sodium load worsened ascites and pulmonary oedema.
- **Missed definitive treatment.** The priorities were terlipressin, antibiotic prophylaxis and urgent endoscopy with band ligation; fluids were a bridge to these.

He now needs diuresis or careful removal of fluid, correction of anaemia with blood, and endoscopy if not done. See [[gastrointestinal/liver-disease]].
:::
:::

::: example The septic patient who is "fluid responsive" {#ex-responsive}
A 59-year-old woman with pneumonia and septic shock has received 3 L of balanced crystalloid in the emergency department and is on noradrenaline. In ICU, her MAP is 62 mmHg. A passive leg raise increases her stroke volume (measured by echocardiography) from 52 to 55 mL. Her lungs have new crackles and her PaO₂/FiO₂ ratio is falling. Should she have another bolus?
::: solution
The rise in stroke volume is $(55 - 52)/52 \approx 5.8\%$, below the usual threshold of about 10%. She is **not fluid responsive**, and she already shows signs of fluid harm (worsening oxygenation). Another bolus is unlikely to raise her cardiac output and likely to worsen her lungs.

The better response is to **increase noradrenaline** to reach a MAP of at least 65 mmHg, consider adding vasopressin, check whether her left ventricle is contracting poorly (septic cardiomyopathy) and, if so, consider dobutamine, and confirm that source control and antibiotics are adequate. Once she is stable, the aim becomes to bring her fluid balance back towards neutral.
:::
:::

::: example The anaphylaxis that was called asthma {#ex-epi-missed}
A 27-year-old man collapses in a restaurant. He is wheezy, has an urticarial rash on his chest, BP 70/40 mmHg, pulse 140/min. A bystander gives him his salbutamol inhaler, and the paramedics start a fluid bolus. On arrival he is still hypotensive and wheezy. What has been missed?
::: solution
This is **anaphylaxis** with **distributive shock** and bronchospasm: sudden onset after a likely food trigger, skin features, respiratory compromise and hypotension. Salbutamol treats only the wheeze, and fluid alone cannot overcome the profound vasodilatation and capillary leak.

The missing treatment is **intramuscular adrenaline**, 500 micrograms (0.5 mL of 1 mg/mL) into the anterolateral thigh for an adult, repeated after 5 minutes if there is no improvement, with the patient lying flat (legs raised if tolerated) and high-flow oxygen. Fluid boluses are still appropriate for persistent hypotension. If two doses of IM adrenaline have not worked, the patient has **refractory anaphylaxis** and needs an adrenaline infusion under critical care guidance. See [[emergency-critical-care/anaphylaxis]].
:::
:::

::: example The tamponade in the "sepsis" bed {#ex-tamponade}
A 68-year-old woman on chemotherapy for lung cancer is admitted with breathlessness, fever of 37.9 °C and hypotension (BP 84/60 mmHg, pulse 120/min). She is treated for neutropenic sepsis with antibiotics and 2 L of fluid, but becomes more breathless and more hypotensive. Her JVP is raised to the angle of the jaw, her lungs are clear, and her systolic pressure falls by 15 mmHg on inspiration. Her ECG shows small QRS complexes that alternate in height. What is happening?
::: solution
**Cardiac tamponade**, most likely from a malignant pericardial effusion. The clues are hypotension with a raised JVP and clear lungs (obstructive, not distributive, physiology), **pulsus paradoxus** (an inspiratory fall in systolic pressure of more than 10 mmHg), and low-voltage complexes with **electrical alternans** from the heart swinging in the effusion. Fluids may briefly help by raising filling pressure, but the definitive treatment is urgent **echocardiography** and **pericardiocentesis**. Infection may coexist, so antibiotics continue. The lesson is that a patient who worsens as expected treatment is given needs reclassifying, with the neck veins and an ultrasound probe.
:::
:::

::: quiz
A 45-year-old man with septic shock has received 30 mL/kg of crystalloid. His MAP is 58 mmHg and his lactate is 4.8 mmol/L. A passive leg raise produces no change in cardiac output. What is the most appropriate next step?
- [ ] A further 2 L of 0.9% saline.
- [ ] A 500 mL bolus of hydroxyethyl starch.
- [x] Start or increase noradrenaline to a MAP of at least 65 mmHg.
- [ ] Wait for the lactate to be repeated in 6 hours.
::: solution
He is not fluid responsive, so further fluid is unlikely to help and may harm him. Noradrenaline is the first-line vasopressor for septic shock. Starch solutions increase mortality and kidney injury in sepsis and should not be used.
:::
:::

::: history
Intravenous fluid therapy began with cholera. In 1832, during the epidemic that reached Britain, the Edinburgh physician Thomas Latta injected a salt solution into the veins of dying patients, some of whom recovered; the technique was then largely forgotten for decades. In the 1880s Sydney Ringer, working on frog hearts at University College London, found that a physiological solution needed calcium and potassium as well as sodium; in 1932 the American paediatrician Alexis Hartmann added lactate to Ringer's solution to treat acidosis, giving Hartmann's solution. Ernest Starling's work around 1896 on the forces across the capillary wall and, in 1918, on the relation between filling and output of the heart gave the physiology behind fluid resuscitation. In 2001 Emanuel Rivers reported early goal-directed therapy for septic shock; three large trials in 2014 (ProCESS, ARISE and ProMISe) found no benefit from the protocol over usual care, an important lesson in how improved background care can erase the effect of a protocol.
:::

## Where this leads

The care of the patient in shock continues in the intensive care unit ([[emergency-critical-care/critical-care]]). Sepsis is covered in [[infectious-diseases/fever-sepsis]], heart failure and cardiogenic shock in [[cardiovascular/heart-failure]], blood products in [[blood/transfusion]], the kidney's response to shock in [[renal/acute-kidney-injury]], and the pathology of shock in [[pathology/haemodynamics]].

::: summary
- Shock is inadequate oxygen delivery to the tissues; hypotension is a late sign. Oxygen delivery = cardiac output × arterial oxygen content.
- Four types: hypovolaemic, cardiogenic, distributive and obstructive. Warm or cold peripheries, the neck veins, the lungs and ultrasound distinguish them.
- Lactate above 2 mmol/L signals hypoperfusion; a shock index above 1 suggests significant shock.
- Give fluid in 500 mL boluses of crystalloid and reassess; only fluid-responsive patients benefit, and the passive leg raise tests this. Balanced crystalloids are usually preferred; starches cause harm.
- Noradrenaline is the first-line vasopressor (target MAP 65 mmHg); dobutamine supports a failing ventricle.
- Haemorrhage: stop the bleeding, use permissive hypotension in trauma, give blood components in high ratios, and give tranexamic acid within 3 hours. PROPPR (2015): 1:1:1 against 1:1:2 gave more haemostasis and fewer exsanguination deaths at 24 hours, without a significant difference in 24-hour or 30-day mortality.
- Cardiogenic shock needs revascularisation; obstructive shock needs decompression or clot removal.
:::

## Exercises

::: exercise Mean arterial pressure {level=1 check="83"}
A patient's blood pressure is 110/70 mmHg. Estimate the mean arterial pressure using the formula in [[#eq-map]], rounded to the nearest whole mmHg.
::: solution
$\text{MAP} \approx 70 + \tfrac{1}{3}(110 - 70) = 70 + 13.3 = 83.3$, which rounds to **83 mmHg**.
:::
:::

::: exercise Shock index {level=1 check="1.4"}
A man with a stab wound to the abdomen has a pulse of 126/min and a systolic blood pressure of 90 mmHg. Calculate his shock index (to one decimal place) and interpret it.
::: solution
Shock index $= 126 / 90 = 1.4$. A value above 1 suggests significant blood loss, even though his systolic pressure is still at the lower limit of normal. He needs the major haemorrhage protocol and a surgical opinion.
:::
:::

::: exercise Oxygen delivery {level=2 check="764"}
Calculate the oxygen delivery (in mL/min, to the nearest whole number) of a patient with cardiac output 5 L/min, Hb 120 g/L and SaO₂ 95%, ignoring dissolved oxygen.
::: hint
Convert Hb to g/dL first, then use [[#eq-cao2]] without the dissolved term and [[#eq-do2]].
:::
::: solution
Hb is 12 g/dL. $C_aO_2 = 1.34 \times 12 \times 0.95 = 15.276$ mL/dL. $\dot{D}O_2 = 5 \times 15.276 \times 10 = 763.8$, which rounds to **764 mL/min**.
:::
:::

::: exercise Fluid balance {level=1 check="800"}
Over 24 hours, a patient receives 3,200 mL of IV and oral fluid. Urine output is 1,100 mL, nasogastric losses are 600 mL and insensible losses are estimated at 700 mL. What is the estimated net fluid balance in mL (positive means a gain)?
::: solution
Losses are $1100 + 600 + 700 = 2400$ mL. Net balance $= 3200 - 2400 = +800$ mL. Insensible losses are an estimate (they rise with fever, tachypnoea and open wounds), so daily weights are a useful check.
:::
:::

::: exercise Choose the fluid {level=2}
For each patient, suggest an appropriate fluid and give a reason: (a) a 30-year-old with diarrhoea, BP 92/60 mmHg, normal sodium; (b) a 70-year-old with cirrhosis having 6 L of ascites drained; (c) a 25-year-old with a gunshot wound and BP 70/40 mmHg; (d) a 40-year-old with a severe head injury and hypotension.
::: solution
(a) A 500 mL bolus of a balanced crystalloid such as Hartmann's solution, reassessed, then replacement of ongoing losses including potassium.
(b) Human albumin solution, to prevent post-paracentesis circulatory dysfunction (following hepatology guidance, typically given per litre of ascites removed).
(c) Blood components through the major haemorrhage protocol (red cells and plasma in a high ratio, with platelets and fibrinogen guided by tests), tranexamic acid, permissive hypotension and immediate surgical control; crystalloid kept to a minimum.
(d) Isotonic crystalloid (0.9% saline is often preferred over slightly hypotonic balanced solutions) and blood if bleeding; albumin is avoided in traumatic brain injury, and permissive hypotension does not apply because cerebral perfusion pressure must be maintained.
:::
:::

::: exercise Interpret the lactate {level=2}
A 63-year-old man with type 2 diabetes taking metformin is admitted with vomiting and acute kidney injury. His BP is 118/72 mmHg, pulse 88/min, capillary refill 2 seconds, and lactate 6.1 mmol/L with a pH of 7.18. Is he in shock?
::: solution
His circulation looks adequate: normal blood pressure, heart rate and capillary refill. A very high lactate with acidosis but without signs of hypoperfusion suggests a cause other than shock. **Metformin-associated lactic acidosis**, precipitated by acute kidney injury reducing metformin excretion, is likely. Metformin is stopped, fluids correct dehydration, and renal replacement therapy may be needed for severe acidosis because it removes both the acid and the drug. Lactate is a marker of cellular stress or impaired clearance, not a pure measure of perfusion.
:::
:::

::: exercise Massive transfusion order {level=2}
A 41-year-old woman is brought in after a road traffic collision with a pelvic fracture, BP 78/50 mmHg and pulse 140/min. Write the first 15 minutes of her management as a numbered plan.
::: solution
1. Call the trauma team and assess her with catastrophic haemorrhage control first, then ABCDE.
2. Apply a pelvic binder at the level of the greater trochanters.
3. Activate the major haemorrhage protocol; take bloods including crossmatch, coagulation, fibrinogen and a venous gas with lactate and ionised calcium.
4. Give tranexamic acid (1 g IV over 10 minutes, followed by a 1 g infusion over 8 hours in adults, per local trauma protocol) within 3 hours of injury.
5. Transfuse red cells and plasma in a high ratio through a warmer; add platelets and cryoprecipitate guided by results; give calcium if ionised calcium is low.
6. Permissive hypotension: aim for a palpable radial pulse or systolic about 80–90 mmHg until haemorrhage control (no head injury suspected).
7. Arrange definitive haemorrhage control: interventional radiology embolisation or surgical packing, depending on local resources and response.
8. Keep her warm and reassess repeatedly.
:::
:::

::: exercise When to stop the fluids {level=3}
On day 3 of ICU admission for septic shock from a perforated diverticulum (now operated on), a 72-year-old woman is off noradrenaline. Her cumulative fluid balance is +7.5 L, she has peripheral and sacral oedema, her PaO₂/FiO₂ ratio is falling, and her urine output is 0.4 mL/kg/h. The nurse asks whether she needs another bolus for the low urine output. Discuss.
::: solution
She has moved from the salvage and optimisation phases to the **de-escalation** phase. Her circulation no longer needs support, and she shows harm from fluid: oedema, worsening gas exchange and possibly renal venous congestion, which itself lowers urine output. A low urine output is not, by itself, an indication for fluid. The plan is to stop maintenance fluids where possible (concentrating drugs and feed), assess her volume status with clinical examination and ultrasound, and start a trial of diuretics once she is haemodynamically stable, monitoring kidney function and electrolytes. If diuretics fail and fluid overload is threatening her lungs, renal replacement therapy can remove fluid. The aim is to return her cumulative balance towards zero.
:::
:::

::: exercise A shocked patient with two problems {level=3}
A 79-year-old man taking bisoprolol for ischaemic heart disease is admitted with melaena. His pulse is 78/min and BP 92/58 mmHg; he is pale and confused, and his Hb is 71 g/L. The junior doctor notes that he is "not tachycardic, so probably not shocked". Discuss the error and the management.
::: solution
Beta-blockers blunt the tachycardic response to blood loss, so a normal heart rate does not exclude shock; the low blood pressure, pallor and confusion indicate significant hypovolaemia. His cardiac disease means that both anaemia and hypotension threaten myocardial oxygen supply ([[#thm-do2]]). Management: ABCDE, two large-bore cannulae, crossmatch and transfusion (a slightly higher Hb threshold is reasonable given his ischaemic heart disease, following local guidance), Glasgow–Blatchford risk scoring, withholding the beta-blocker and any antiplatelet or anticoagulant while weighing the risks with the cardiology team, and urgent endoscopy after resuscitation. See [[gastrointestinal/gi-bleeding-cancer]].
:::
:::
