When the heart stops pumping, the brain loses consciousness within about ten seconds and begins to suffer irreversible injury within minutes. Resuscitation is the set of actions that keeps some blood flowing during those minutes, restores a perfusing rhythm where that is possible, and then protects the organs that were starved. It is one of the few areas of medicine where a fixed sequence, practised until it is automatic, clearly saves lives.

This chapter follows the patient through the event. It starts with what cardiac arrest is and why chest compressions work, then covers basic and advanced life support, the reversible causes, arrests in special circumstances, the rhythms that come just before or after an arrest, care after the return of circulation, and the decisions about whether to attempt resuscitation at all. The algorithms follow the Resuscitation Council UK (RCUK) adult guidelines of 2021; the October 2025 update keeps the same drug timing. Doses quoted are the standard adult values printed in those algorithms and are given for teaching; practice follows current local guidance.

## What cardiac arrest is {#sec-arrest}

::: definition Cardiac arrest {#def-arrest}
**Cardiac arrest** is the sudden loss of effective cardiac output. The person is unresponsive and is not breathing normally. In practice it is recognised clinically, not by feeling for a pulse, because pulse checks by trained and untrained people are unreliable.

The rhythm on the monitor falls into one of two groups:

- **Shockable rhythms**: **ventricular fibrillation (VF)**, chaotic electrical activity with no organised contraction, and **pulseless ventricular tachycardia (pVT)**, a fast broad-complex rhythm that produces no output. A defibrillator shock can terminate both.
- **Non-shockable rhythms**: **asystole**, the absence of electrical activity, and **pulseless electrical activity (PEA)**, an organised rhythm that would normally produce a pulse but does not. A shock does not help; the treatment is CPR, adrenaline and finding the cause.

**Return of spontaneous circulation (ROSC)** means a perfusing rhythm has come back, shown by a pulse, a rising end-tidal CO₂ or an arterial pressure trace.
:::

The two groups differ in cause and prognosis. VF is typically the first rhythm when an adult collapses suddenly from acute myocardial ischaemia or an inherited or structural heart disease. It is the most treatable arrest: when a defibrillator is applied within the first few minutes, a large proportion of people survive. Asystole and PEA are more often the end result of something else, such as hypoxia, bleeding, a pulmonary embolus or a metabolic disturbance, or they are what VF decays into if no one intervenes. Their outcome depends on finding and reversing that cause.

Overall outcomes are sobering. In the UK, roughly one in ten people treated by ambulance services for out-of-hospital cardiac arrest survive to leave hospital, and roughly one in five of those who arrest in hospital do. Survival is much higher in witnessed VF with early bystander CPR and early defibrillation, which is why the system around the arrest matters as much as the hospital.

### Why compressions work

::: theorem Coronary perfusion pressure {#thm-cpp}
During CPR, the heart muscle is perfused during the release phase of each compression, in the same way it is perfused in diastole. The driving pressure is the **coronary perfusion pressure (CPP)**:

$$
\text{CPP} = P_{\text{aortic, diastolic}} - P_{\text{right atrial, diastolic}}
$$ {#eq-cpp}

ROSC becomes likely only when CPP is high enough (in human studies, successful resuscitation was rare with CPP below about 15 mmHg). Good chest compressions generate roughly a quarter to a third of normal cardiac output.
:::

::: proof
Each compression squeezes blood out of the chest into the aorta. Because the aortic valve closes on release, aortic pressure stays raised while the chest recoils, and the gap between the aortic and right atrial pressures pushes blood through the coronary arteries. That pressure builds up over a run of compressions; it does not appear with the first one. When compressions stop, for a pulse check, a rhythm check or a change of rescuer, aortic pressure falls within seconds and CPP collapses. On restarting, it takes many compressions to get back to where it was. This is why the guidelines insist on minimal interruptions, why full chest recoil matters (leaning on the chest raises right atrial pressure and lowers CPP), and why compressions continue while the defibrillator charges.
:::

The useful number to track is the **chest compression fraction**: the proportion of the arrest during which compressions are actually being delivered. Teams aim for well over 80%. Every second of pause has a cost.

::: widget plot
f: 100*exp(-0.12*x); 100*exp(-0.06*x)
x: 0, 20
y: 0, 100
labels: \text{no bystander CPR}; \text{bystander CPR}
caption: A simplified teaching model of how the chance of surviving a VF arrest falls with minutes before the first shock. The values are illustrative, not clinical data: without CPR the chance falls steeply, roughly 10% of its value for each minute; good bystander CPR roughly halves the rate of decline. The curves show why the chain of survival is built around early CPR and early defibrillation rather than around the hospital.
:::

## Basic life support {#sec-bls}

Basic life support (BLS) is what any rescuer does before equipment arrives. The adult sequence is:

1. Check that it is safe to approach, then check for a response by speaking and gently shaking the shoulders.
2. Open the airway with a head tilt and chin lift and look for normal breathing for no more than ten seconds. **Agonal breathing**, slow, irregular gasps, is common in the first minutes of an arrest and must not be mistaken for normal breathing.
3. If the person is unresponsive and not breathing normally, call for help (999 or 112 outside hospital; the hospital arrest number inside), and ask for an automated external defibrillator (AED).
4. Start chest compressions: hands on the lower half of the sternum, depth 5–6 cm, rate 100–120 per minute, allowing full recoil, with 30 compressions to 2 breaths if the rescuer is trained and willing to give breaths. Untrained rescuers give compressions only, guided by the ambulance dispatcher.
5. Attach the AED as soon as it arrives and follow its prompts. Continue CPR between analyses.

The **chain of survival** names four links: early recognition and a call for help, early CPR, early defibrillation, and post-resuscitation care. Public-access defibrillators, dispatcher-assisted CPR and volunteer responder apps all strengthen the first three links, and they make the largest difference to outcome.

## Advanced life support {#sec-als}

Advanced life support (ALS) adds a manual defibrillator, airway management, vascular access, drugs and a structured search for the cause. Its backbone is the two-minute cycle: two minutes of uninterrupted CPR, a brief pause to look at the rhythm, a shock if indicated, and then straight back to compressions.

::: algorithm The ALS algorithm (RCUK 2021) {#def-als}
1. Confirm cardiac arrest, call the resuscitation team, start CPR at 30:2 and attach defibrillator pads or monitor.
2. Pause briefly to assess the rhythm.
3. **If shockable (VF or pVT):** give one shock (biphasic, at least 150 J for the first shock, or as the manufacturer advises), then resume CPR immediately for two minutes without checking the pulse or rhythm. Reassess the rhythm at the end of each cycle and shock again if still shockable.
   - After the **third shock**: give **adrenaline 1 mg IV/IO** and **amiodarone 300 mg IV/IO**.
   - Then repeat adrenaline 1 mg every 3–5 minutes (in practice every other cycle).
   - After the **fifth shock**: give a further **amiodarone 150 mg**.
4. **If non-shockable (PEA or asystole):** resume CPR and give **adrenaline 1 mg IV/IO as soon as access is obtained**, then every 3–5 minutes.
5. Throughout: high-quality compressions with minimal interruptions; give oxygen; use waveform capnography; secure the airway when skilled help is present; obtain IV access (IO if IV is not achievable); identify and treat reversible causes.
6. If ROSC occurs, move to post-resuscitation care.
:::

A few details make the algorithm work in practice.

**Shocks.** Compressions continue while the defibrillator charges; the pause for the shock itself should be under about five seconds. After a shock, compressions restart at once. Even a successful shock is usually followed by a short period in which the stunned heart produces little output, so a pause to feel for a pulse wastes perfusion and rarely finds one. Pad position matters: the lateral (apical) pad belongs in the mid-axillary line, and the 2025 RCUK update specifically highlights how often it is placed too far forward. In a **witnessed, monitored VF arrest** (for example in the catheter laboratory) where the defibrillator is already attached, up to three quick successive shocks may be given before starting compressions.

**Airway and breathing.** A bag-mask, often with an oropharyngeal airway, is enough at first. A supraglottic airway or tracheal tube is inserted only by someone skilled enough to do it with an interruption to compressions of less than about five seconds. Once an advanced airway is in place, compressions become continuous and ventilation is given at about 10 breaths per minute. **Waveform capnography** confirms tube placement, shows the quality of CPR (end-tidal CO₂ rises with better compressions) and often gives the first sign of ROSC as a sudden rise.

**Access and drugs.** IV access is tried first, with intraosseous (IO) access when IV is not possible. The PARAMEDIC-3 trial (2024), which randomised about 6,000 out-of-hospital arrests in England and Wales to an IO-first or IV-first strategy, found no difference in 30-day survival. Adrenaline increases the chance of ROSC. In the PARAMEDIC2 trial (2018), adrenaline in out-of-hospital arrest improved 30-day survival (3.2% against 2.4% with placebo) but did not significantly increase survival with a favourable neurological outcome (2.2% against 1.9%). That is why the algorithm keeps adrenaline but puts compressions and defibrillation first. Amiodarone is given for VF or pVT that persists after shocks; lidocaine is an alternative when amiodarone is unavailable.

::: warning Interrupting compressions to do something else
The commonest error in a real arrest is not a wrong drug but a long pause: stopping CPR to put in a cannula, to intubate, to take a blood gas, to look with ultrasound or to discuss the plan. Every one of these can be done during compressions or in a pause of a few seconds. A team leader who keeps hands on the chest has done more for the patient than one who gets every drug exactly on time.
:::

### The reversible causes

::: definition The four Hs and four Ts {#def-hts}
The reversible causes of cardiac arrest are remembered as:

| The four Hs | The four Ts |
|---|---|
| **H**ypoxia | **T**hrombosis (coronary or pulmonary) |
| **H**ypovolaemia | **T**ension pneumothorax |
| **H**ypo- or hyperkalaemia and other metabolic disorders | **T**amponade (cardiac) |
| **H**ypothermia or hyperthermia | **T**oxins |

They are considered in every arrest and are the main business of the team during non-shockable arrests.
:::

Each cause has a bedside clue and a specific treatment. A blood gas during CPR gives potassium, haemoglobin, glucose and pH within a minute. Point-of-care ultrasound, used by a trained operator during the rhythm-check pause, can show a pericardial effusion, a dilated right ventricle suggesting pulmonary embolus, or an empty heart suggesting hypovolaemia. The history matters too: a dialysis patient who has missed sessions, a trauma patient, a patient with a central line who suddenly deteriorates, a known overdose.

| Cause | Typical clue | Specific treatment |
|---|---|---|
| Hypoxia | Asphyxia, airway obstruction, respiratory arrest first | Oxygen and effective ventilation |
| Hypovolaemia | Bleeding, trauma, sepsis | Fluids and blood, control of bleeding |
| Hyperkalaemia | Renal failure, missed dialysis, broad complexes before arrest | IV calcium, insulin–glucose, bicarbonate; dialysis |
| Hypothermia | Exposure, immersion | Rewarming, ideally extracorporeal |
| Thrombosis (PE) | Recent surgery, immobility, dilated RV | Thrombolysis; continue CPR 60–90 min afterwards |
| Thrombosis (coronary) | Chest pain before collapse, VF | Coronary angiography, sometimes during mechanical CPR |
| Tension pneumothorax | Trauma, ventilation, central line | Decompression (finger thoracostomy or needle) |
| Tamponade | Penetrating trauma, after cardiac surgery | Pericardiocentesis or thoracotomy |
| Toxins | History, toxidrome | Specific antidote (see [[emergency-critical-care/poisoning]]) |

### The team

ALS is delivered by a team, and much of its failure is a failure of teamwork. A good team has one leader who stands back and does not perform procedures, named roles (compressions, airway, defibrillator, drugs and access, recording), and **closed-loop communication**: an instruction is given to a named person, repeated back, and confirmed when done. The leader says the plan for the next cycle aloud before the pause, so the pause is short and everyone knows what will happen. Compressors swap every two minutes because the quality of compressions falls with fatigue well before the rescuer notices it.

::: example Timing the drugs in a shockable arrest {#ex-timing}
A 63-year-old man collapses in a hospital car park. The team arrives with a defibrillator; the first rhythm is VF. The first shock is given at time 0 minutes and the rhythm remains VF at each subsequent check. Assuming perfect two-minute cycles, at what times are the first adrenaline, the first amiodarone and the second amiodarone given?
::: solution
With two-minute cycles, shocks fall at 0, 2, 4, 6, 8 minutes and so on: the third shock is at 4 minutes and the fifth at 8 minutes.

- First adrenaline 1 mg and amiodarone 300 mg: after the third shock, as compressions restart, at about 4 minutes.
- Further adrenaline: every 3–5 minutes, which in practice means every other cycle, at about 8, 12, 16 minutes.
- Second amiodarone 150 mg: after the fifth shock, at about 8 minutes.

During all of this the team is asking why this man is in VF. A coronary occlusion is the likeliest cause, and a 12-lead ECG after ROSC, or early discussion with the cardiology team if VF is refractory, is part of the plan.
:::
:::

::: example The arrest with potassium 8.1 {#ex-k-arrest}
A 46-year-old woman on haemodialysis has missed two sessions. She is brought in drowsy, with a broad-complex bradycardia at 30 per minute, and shortly after arrival the trace becomes a slow sine-wave pattern and she has no pulse. A venous gas taken during CPR shows potassium 8.1 mmol/L and pH 7.12. What is the cause of the arrest and how is it treated?
::: solution
This is PEA from **hyperkalaemia**, one of the four Hs. The broad, slow complexes merging into a sine wave are the classic progression.

1. Continue high-quality CPR and give adrenaline according to the non-shockable branch.
2. Give **IV calcium** (calcium chloride or gluconate, as in the local hyperkalaemia guideline). It stabilises the myocardial membrane within minutes but does not lower potassium.
3. Shift potassium into cells with **insulin and glucose**, with close glucose monitoring; sodium bicarbonate may be given in severe acidosis or prolonged arrest.
4. Arrange removal of potassium: **dialysis** is the definitive treatment and can be started during or soon after resuscitation in some centres.

Hyperkalaemic arrest can respond to treatment after a prolonged resuscitation, so teams should not stop early while the cause is being corrected. After ROSC she needs repeated potassium and glucose measurements, cardiac monitoring and urgent dialysis. See [[renal/potassium-calcium-phosphate]] for the physiology.
:::
:::

::: quiz
During a non-shockable arrest the rhythm check shows asystole. What should happen next?
- [ ] Shock at 150 J in case it is fine VF.
- [x] Resume compressions immediately and give adrenaline 1 mg as soon as access is available, while the team looks for a reversible cause.
- [ ] Give amiodarone 300 mg.
- [ ] Wait for three cycles before giving any drug.
::: solution
Asystole is non-shockable, so the next step is CPR with adrenaline as soon as possible, and a structured search for the four Hs and four Ts. Amiodarone belongs to the shockable branch. If the trace might be fine VF, check the gain and leads quickly, but shocking true asystole does not help and the pause harms coronary perfusion.
:::
:::

## Arrests in special circumstances {#sec-special}

Some causes change the algorithm itself.

- **Hypothermia.** A cold heart is resistant to drugs and shocks, and the cold brain tolerates low flow better. If the core temperature is below 30 °C, give up to three shocks and withhold adrenaline until it reaches 30 °C; between 30 and 35 °C double the interval between adrenaline doses. Extracorporeal rewarming (ECMO or cardiopulmonary bypass) is the treatment of choice, and resuscitation is often continued until the patient is rewarmed.
- **Pregnancy.** From about 20 weeks, the uterus compresses the inferior vena cava when the woman lies flat, so the uterus is displaced manually to the left during CPR. If there is no ROSC within about four minutes, the team prepares for **resuscitative hysterotomy** (perimortem caesarean section), aiming to deliver within five minutes. Emptying the uterus improves venous return and is done primarily to help the mother.
- **Pulmonary embolism.** If PE is the likely cause, thrombolysis is given during CPR, and CPR then continues for 60–90 minutes to give the drug time to work.
- **Drowning.** The arrest is asphyxial, so ventilation matters early: five initial rescue breaths are given before compressions.
- **Trauma.** Traumatic arrest is usually caused by bleeding, tension pneumothorax, tamponade or hypoxia, and treating these takes priority over chest compressions, which do little in an empty heart.
- **Anaphylaxis and toxins.** These are covered in [[emergency-critical-care/anaphylaxis]] and [[emergency-critical-care/poisoning]]. Some toxins call for prolonged resuscitation, because the drug may wear off or be removed while CPR maintains flow.

**Extracorporeal CPR (ECPR)**, putting a patient in refractory arrest onto venoarterial ECMO, is available in some centres for carefully selected patients: typically a witnessed arrest with bystander CPR, a shockable rhythm and a short time to the ECMO team. It is a bridge that buys time to treat the cause, such as a blocked coronary artery.

::: example The 58-year-old in refractory VF {#ex-ecpr}
A 58-year-old man collapses at a gym. A staff member starts CPR immediately and the gym AED delivers a shock within four minutes. The ambulance crew continues ALS. After 25 minutes he has received seven shocks, three doses of adrenaline and both doses of amiodarone, and he is still in VF. End-tidal CO₂ during compressions is 3.5 kPa. A junior doctor suggests stopping because "it has been nearly half an hour". How should the team think about this?
::: solution
**Refractory VF** in a younger patient with a witnessed arrest and immediate bystander CPR is the group in which prolonged resuscitation is most worthwhile. The rhythm is still shockable, the end-tidal CO₂ suggests compressions are generating some flow, and an acute coronary occlusion is the likeliest cause.

- Duration alone is not a reason to stop. Stopping rules in shockable arrest look at the whole picture, not the clock.
- If the region has an ECPR service, it should be contacted early, because candidacy depends on time. A mechanical compression device allows good CPR during transport.
- Within the shockable algorithm, the team can check pad position and consider a change of pad vector; a Canadian trial in 2022 (DOSE VF) reported better survival with vector change or dual sequential shocks in refractory VF, and some services include these options in their protocols.
- The reversible causes are reviewed again: potassium, tension pneumothorax, PE.

The decision is owned by the senior clinician, explained to the team, and followed by a debrief whatever the outcome.
:::
:::

## Before and after the arrest: peri-arrest rhythms {#def-peri}

Many arrests are preceded by a rhythm disturbance that could have been treated, and many patients after ROSC have unstable rhythms. The RCUK peri-arrest algorithms ask one question first: **are there adverse features?** These are **shock** (hypotension, pallor, sweating, confusion), **syncope**, **myocardial ischaemia** (chest pain or ischaemic ECG changes) and **heart failure** (pulmonary oedema, raised jugular venous pressure).

::: definition Peri-arrest management of bradycardia and tachycardia {#def-periarrest}
**Bradycardia.** If adverse features are present, give **atropine 500 micrograms IV**, repeated if needed up to a total of 3 mg. If the response is inadequate, or there is a high risk of asystole (recent asystole, Mobitz type II block, complete heart block with broad QRS complexes, or a ventricular pause longer than 3 seconds), arrange **pacing**, with an isoprenaline or adrenaline infusion or transcutaneous pacing as a bridge to transvenous pacing.

**Tachycardia with adverse features.** Give **synchronised DC cardioversion** under sedation or anaesthesia, up to three attempts; if unsuccessful, give amiodarone 300 mg IV over 10–20 minutes and repeat the shock.

**Tachycardia without adverse features.** Look at the QRS width and regularity. A regular narrow-complex tachycardia is treated with vagal manoeuvres, then **adenosine** as a rapid IV bolus (6 mg, then 12 mg, then 18 mg if needed) with ECG recording. An irregular narrow-complex tachycardia is usually atrial fibrillation and is rate-controlled. A broad-complex tachycardia is treated as ventricular tachycardia unless there is clear evidence otherwise.
:::

Two traps deserve emphasis. First, a slow heart rate is sometimes the consequence of another problem that needs its own treatment: hyperkalaemia, hypothermia, raised intracranial pressure, or poisoning with a beta-blocker, calcium-channel blocker or digoxin. Second, **pre-excited atrial fibrillation** in Wolff–Parkinson–White syndrome looks like an irregular, very fast broad-complex tachycardia. Drugs that block the atrioventricular node, including adenosine, verapamil and digoxin, can speed conduction down the accessory pathway and precipitate VF. When such a patient is unstable, synchronised cardioversion is the safe choice. More detail is in [[cardiovascular/arrhythmias]].

## After ROSC: post-resuscitation care {#def-post}

ROSC is the start of a new critical illness, the **post-cardiac arrest syndrome**. It has four parts: brain injury from the period without flow, myocardial dysfunction (stunning) that can last for days, a systemic inflammatory response from ischaemia and reperfusion that can resemble sepsis, and whatever disease caused the arrest.

::: definition Post-resuscitation care: the main targets {#def-postcare}
After ROSC the priorities, following the ERC–ESICM guidance used in the UK, are:

- **Airway and breathing**: secure the airway if the patient is not awake; target SpO₂ **94–98%** (both hypoxaemia and high arterial oxygen are avoided) and normal arterial PaCO₂.
- **Circulation**: obtain a 12-lead ECG; target a mean arterial pressure above about **65 mmHg** (systolic above 100 mmHg), with fluids and vasopressors as needed; treat the cause.
- **Coronary angiography**: immediate in ST-elevation on the ECG; in patients without ST-elevation it is considered when an acute coronary cause is likely, rather than performed routinely.
- **Temperature**: actively **prevent fever** (temperature above 37.7 °C) for at least 72 hours in patients who remain comatose.
- **Brain**: treat seizures, avoid hypoglycaemia and marked hyperglycaemia, and record an EEG in comatose patients.
- **Prognosis**: assess neurological prognosis only after at least **72 hours**, once sedation has cleared, using several tests together.
:::

Two areas of post-arrest care have changed in ways worth knowing. Temperature management was once "therapeutic hypothermia" at 32–34 °C. The TTM trial (2013) found no difference between 33 °C and 36 °C, and the larger TTM2 trial (2021) found no benefit of 33 °C over normothermia with active treatment of fever. Current practice is therefore to prevent fever rather than to cool. Coronary angiography is similar: for patients resuscitated from arrest without ST-elevation, the COACT (2019) and TOMAHAWK (2021) trials found no survival benefit from immediate routine angiography compared with a delayed or selective approach.

**Neuroprognostication** is deliberately slow. Clinical examination in the first days is confounded by sedatives, neuromuscular blockers, hypothermia and organ failure, and an early pessimistic prediction that leads to withdrawal of treatment becomes self-fulfilling. The ERC–ESICM approach combines examination (pupillary and corneal reflexes, motor response), neurophysiology (EEG patterns and somatosensory evoked potentials, in which bilaterally absent N20 responses predict poor outcome), blood biomarkers such as neuron-specific enolase, and brain imaging. A poor outcome is predicted only when two or more of these agree. Survivors often have fatigue, cognitive problems, anxiety and low mood, and should be offered follow-up and rehabilitation; their families also need support.

::: example A patient after ROSC {#ex-postrosc}
A 70-year-old woman has ROSC after 15 minutes of in-hospital arrest (initial rhythm PEA, cause thought to be hypoxia from a blocked tracheostomy, now replaced). She is ventilated. Observations: SpO₂ 100% on FiO₂ 1.0, PaO₂ 48 kPa, PaCO₂ 3.2 kPa, BP 84/46 mmHg (mean 59), temperature 36.4 °C, glucose 14 mmol/L. Her 12-lead ECG shows sinus tachycardia without ST-elevation. Which values are off target, and what changes follow?
::: solution
Compare each value with the post-resuscitation targets in [[#def-postcare]]:

- **Oxygen**: PaO₂ 48 kPa on FiO₂ 1.0 is far above normal. Reduce FiO₂ to keep SpO₂ 94–98%.
- **Carbon dioxide**: PaCO₂ 3.2 kPa is low (hyperventilation), which constricts cerebral vessels. Reduce minute ventilation to bring PaCO₂ to the normal range.
- **Blood pressure**: MAP 59 mmHg is below about 65. Give a fluid bolus if she is likely to respond and start a vasopressor such as noradrenaline; echocardiography helps separate myocardial stunning from hypovolaemia.
- **Temperature**: 36.4 °C is acceptable; the aim is to prevent fever over the next 72 hours.
- **Glucose**: 14 mmol/L is high and should be treated according to the unit's protocol, avoiding hypoglycaemia.

The arrest was hypoxic, not coronary, and there is no ST-elevation, so emergency angiography is not indicated. Prognosis is not discussed in definitive terms until at least 72 hours.
:::
:::

## Decisions about resuscitation {#sec-decisions}

CPR is a medical treatment. For most people who die at the end of a progressive illness, it cannot restart the heart for any useful length of time and exposes them to an undignified and often painful death. In the UK, decisions not to attempt CPR (**DNACPR** decisions) are made in advance by the senior clinician responsible, ideally as part of a wider plan that records what treatments a person would and would not want. The **ReSPECT** process (Recommended Summary Plan for Emergency Care and Treatment) is used in many areas for this.

Several principles are settled. A DNACPR decision applies only to CPR; it does not mean withholding other treatment, such as antibiotics, fluids or admission to hospital. The patient should be involved in the decision unless this would cause them physical or psychological harm: in **Tracey v Cambridge University Hospitals** (2014) the Court of Appeal held that failing to involve a patient breached her right to respect for private life under Article 8 of the European Convention on Human Rights. Where the patient lacks capacity, those close to them are consulted, but a clinician is not obliged to offer CPR that will not work. Decisions must be recorded where they can be found in an emergency and reviewed when circumstances change. The law and ethics are discussed in [[medical-ethics-law/end-of-life-ethics]].

Stopping a resuscitation attempt is a senior decision based on the whole picture: the time without CPR, the initial rhythm, the response to treatment, end-tidal CO₂ trends, reversible causes still to be treated, and what is known of the patient. A low end-tidal CO₂ after prolonged ALS is associated with a poor outcome but is not used alone. Many services now let relatives be present during resuscitation if they wish, with a staff member to support them; studies of family presence have not shown harm to the resuscitation and suggest some benefit to relatives.

::: example The care home call {#ex-notrial}
A 91-year-old woman with advanced dementia and severe heart failure, admitted twice in the last three months, is found unresponsive and not breathing at breakfast in her care home. Staff call 999 and start compressions. No resuscitation plan can be found. Her daughter is abroad. The paramedics arrive four minutes later; the monitor shows asystole. What should guide their decision?
::: solution
In the absence of a valid DNACPR decision or advance decision, the default is to start resuscitation, and the care home staff were right to begin. But clinicians are not obliged to continue CPR that cannot succeed. The paramedics' guidelines allow them to stop when resuscitation would be futile, taking into account an unwitnessed arrest, asystole, and advanced, irreversible illness that was expected to cause death. A short, honest phone call to the daughter, as soon as practical, explains what happened.

The larger failure happened earlier. Someone with advanced dementia and end-stage heart failure, admitted twice recently, should have had an emergency care plan discussed with her (while she could take part) and with her family. Learning from the event belongs in a review the next day, not on scene. Recording the plan in a ReSPECT form at the next hospital discharge would have spared everyone, including her, this ending.
:::
:::

::: example A slow pulse after a fall {#ex-ppi-arrest}
A 79-year-old man is brought in after a collapse without warning. His pulse is 32 per minute, BP 78/40 mmHg, and he is pale and sweaty. The ECG shows complete heart block with broad QRS complexes. His medicines include bisoprolol and ramipril; potassium is 5.2 mmol/L. How should he be managed?
::: solution
He has bradycardia with adverse features (shock and syncope), so treatment starts immediately.

1. ABCDE assessment, oxygen if hypoxaemic, IV access, continuous monitoring with pacing-capable defibrillator pads attached.
2. **Atropine 500 micrograms IV**, repeated up to 3 mg. Atropine often has little effect on complete heart block with broad complexes, because the block is below the AV node.
3. He is at high risk of asystole (complete heart block with broad QRS), so arrange **transvenous pacing**. As a bridge, start an isoprenaline or adrenaline infusion or **transcutaneous pacing** with analgesia and sedation.
4. Look for reversible contributors: the beta-blocker is stopped, potassium is only mildly raised, and myocardial infarction (especially inferior) is excluded with ECG and troponin.

If he remains in complete heart block after the beta-blocker has worn off, a permanent pacemaker is indicated.
:::
:::

::: history
Closed-chest cardiac massage was described in 1960 by William Kouwenhoven, James Jude and Guy Knickerbocker at Johns Hopkins, after Knickerbocker noticed that pressing defibrillator paddles firmly onto a dog's chest raised its arterial pressure. Combined with the mouth-to-mouth ventilation championed by Peter Safar and James Elam in the late 1950s, it became cardiopulmonary resuscitation. Defibrillation had already been used on the exposed heart by Claude Beck in 1947, and in the early 1960s Bernard Lown developed the direct-current defibrillator and the synchronised shock for cardioversion. In 1966 Frank Pantridge and John Geddes in Belfast put a portable defibrillator in an ambulance, the first mobile coronary care unit, and showed that defibrillation could be brought to the patient. The International Liaison Committee on Resuscitation (ILCOR), founded in 1992, now reviews the evidence on which national guidelines, including those of the Resuscitation Council UK, are based.
:::

## Where this leads

The physiology of shock and fluid resuscitation is in [[emergency-critical-care/shock-fluids]]; airway management and ventilation in [[emergency-critical-care/airway-ventilation]]; organ support after ROSC in [[emergency-critical-care/critical-care]]; the arrhythmias themselves in [[cardiovascular/arrhythmias]]; the assessment that should catch deterioration before arrest in [[emergency-critical-care/acute-assessment]].

::: summary
- Cardiac arrest is recognised by unresponsiveness and absent normal breathing. Rhythms are shockable (VF, pVT) or non-shockable (PEA, asystole).
- Compressions generate a coronary perfusion pressure that builds slowly and collapses as soon as they stop: depth 5–6 cm, rate 100–120/min, full recoil, minimal pauses.
- RCUK ALS (2021, timing unchanged in 2025): in shockable rhythms, adrenaline 1 mg and amiodarone 300 mg after the third shock, adrenaline every 3–5 minutes thereafter, amiodarone 150 mg after the fifth shock; in non-shockable rhythms, adrenaline 1 mg as soon as possible and every 3–5 minutes.
- Search for the four Hs and four Ts in every arrest; some causes (hypothermia, pregnancy, PE, trauma) change the algorithm.
- Peri-arrest rhythms are managed by asking about adverse features: shock, syncope, ischaemia, heart failure.
- After ROSC: SpO₂ 94–98%, normal PaCO₂, MAP above about 65 mmHg, angiography for ST-elevation, fever prevention for 72 hours, prognosis not before 72 hours and only on several concordant tests.
- Decisions not to attempt CPR are made in advance, involve the patient, apply only to CPR and are recorded where they can be found.
:::

## Exercises

::: exercise Compression fraction {level=1 check="0.84"}
During a 10-minute resuscitation, the total time without compressions (rhythm checks, shocks, airway insertion) adds up to 96 seconds. What is the chest compression fraction? Give it as a decimal to two decimal places.
::: hint
Compression fraction is time with compressions divided by total time.
:::
::: solution
Total time is 600 seconds; time with compressions is $600 - 96 = 504$ seconds. The compression fraction is $504/600 = 0.84$, which meets the usual aim of above 0.8.
:::
:::

::: exercise Coronary perfusion pressure {level=1 check="18"}
During CPR, an arterial line shows an aortic diastolic (relaxation-phase) pressure of 30 mmHg and a central venous line shows a right atrial pressure of 12 mmHg at the same moment. Calculate the coronary perfusion pressure in mmHg.
::: solution
Using [[#eq-cpp]], $\text{CPP} = 30 - 12 = 18$ mmHg. This is just above the level (about 15 mmHg) below which ROSC was rarely achieved in human studies; deeper compressions with full recoil would aim to raise it.
:::
:::

::: exercise Total amiodarone {level=1 check="450"}
An adult remains in VF through six shocks, managed exactly according to the RCUK algorithm. What total dose of amiodarone (in mg) has been given by the time of the sixth shock?
::: solution
Amiodarone 300 mg is given after the third shock and 150 mg after the fifth: $300 + 150 = 450$ mg. No further amiodarone is given in the algorithm after the fifth shock.
:::
:::

::: exercise Counting adrenaline doses {level=2 check="3"}
In a shockable arrest with perfect two-minute cycles, the first shock is at 0 minutes and the rhythm remains VF. Adrenaline is given after the third shock and then every other cycle. How many doses of adrenaline have been given by the rhythm check at 14 minutes (count a dose given at 14 minutes as not yet given)?
::: solution
Shocks fall at 0, 2, 4, 6, 8, 10, 12 and 14 minutes. The first adrenaline follows the third shock at 4 minutes, then every other cycle at 8 and 12 minutes. The next would be at 16 minutes. So **3** doses have been given before the 14-minute check.
:::
:::

::: exercise Shockable or not {level=1}
For each situation, state whether the rhythm is shockable and the first drug that is given: (a) VF that persists after the first shock; (b) PEA with a narrow-complex rhythm at 60 per minute; (c) asystole in a hypothermic patient with a core temperature of 27 °C.
::: solution
(a) Shockable. No drug is given until after the third shock, when adrenaline 1 mg and amiodarone 300 mg are given.
(b) Non-shockable. Adrenaline 1 mg as soon as access is obtained, with a determined search for a cause such as hypovolaemia, tamponade or PE, which often produce narrow-complex PEA.
(c) Non-shockable. Below 30 °C adrenaline is withheld until the patient is rewarmed to 30 °C; the priority is CPR and rewarming, ideally extracorporeal.
:::
:::

::: exercise A PEA arrest with a clue {level=2}
A 67-year-old man is on day 5 after a hip replacement. He becomes suddenly breathless, then collapses. The monitor shows a narrow-complex rhythm at 120 per minute, with no pulse. Point-of-care ultrasound during a rhythm check shows a dilated right ventricle and a small, vigorously contracting left ventricle with no pericardial fluid. What is the most likely cause, what is the specific treatment, and how does it change the resuscitation?
::: solution
Sudden breathlessness after orthopaedic surgery followed by PEA with a dilated right ventricle points to **massive pulmonary embolism** (one of the Ts). The specific treatment is **thrombolysis** during CPR (surgical or catheter embolectomy are alternatives where available). Because the thrombolytic takes time to act, CPR is continued for 60–90 minutes after it is given before the attempt is judged unsuccessful. Recent surgery increases bleeding risk, but in cardiac arrest from PE the risk of death without thrombolysis outweighs it.
:::
:::

::: exercise Interpreting post-ROSC care {level=2}
Two hours after ROSC from an out-of-hospital VF arrest, a 55-year-old man is sedated and ventilated in the ICU. His temperature is 38.3 °C. A relative asks whether he will wake up. What do you do about the temperature, and how do you answer the question?
::: solution
A temperature of 38.3 °C is above the 37.7 °C threshold, and fever after cardiac arrest is associated with worse neurological outcome. The ICU treats it actively (antipyretics, surface or intravascular temperature control) and continues fever prevention for at least 72 hours.

To the relative: it is too early to know. Sedation and the effects of the arrest make examination unreliable for at least 72 hours, and the team will then use several tests together (examination, EEG, blood tests and scans) before forming a view. Honest uncertainty, with a plan and a time for the next conversation, is the right answer.
:::
:::

::: exercise A DNACPR decision {level=3}
A 76-year-old woman with metastatic lung cancer, now bedbound and sleeping most of the day, is admitted with pneumonia. She has capacity. The registrar believes CPR would not succeed. Describe how the decision should be made and recorded, and explain what it does and does not change about her treatment.
::: solution
The decision is a clinical judgement that CPR would not be successful, made by the senior responsible clinician. Because she has capacity, she should be told about it and invited to discuss it, unless there is a good reason to believe the conversation itself would cause her physical or psychological harm (Tracey, 2014). The conversation is best framed around what matters to her and what treatment will and will not help, not as a request for permission to withhold a futile intervention. With her agreement, her family can be included.

The decision is recorded on the hospital's form (or a ReSPECT plan), in the notes, and communicated to the team and, on discharge, to her GP and community services. It applies only to CPR: she can still receive antibiotics, oxygen, fluids, symptom control and, if appropriate, escalation to other treatments. It is reviewed if her condition or wishes change.
:::
:::

::: exercise Bradycardia with a twist {level=3}
An 81-year-old woman taking digoxin, furosemide and ramipril is brought in confused and vomiting. Heart rate is 38 per minute (junctional rhythm), BP 86/50 mmHg, potassium 6.4 mmol/L, creatinine raised from her baseline. Discuss the differential diagnosis of her bradycardia and how management differs from the standard bradycardia algorithm.
::: solution
The bradycardia has adverse features (shock), but its likely causes are **digoxin toxicity** (vomiting, confusion, junctional rhythm), precipitated by **acute kidney injury** reducing digoxin excretion, and **hyperkalaemia**, which both reflects digoxin toxicity and worsens conduction. Ischaemia should also be excluded.

Management still starts with ABCDE and atropine is reasonable, but the specific treatments matter more. **Digoxin-specific antibody fragments** reverse digoxin toxicity and are indicated for life-threatening arrhythmia or significant hyperkalaemia in this context. Hyperkalaemia is treated in the usual way with insulin and glucose; the use of calcium in digoxin toxicity has historically been debated, and local toxicology advice (in the UK, TOXBASE or the National Poisons Information Service) should be followed. Digoxin and ramipril are stopped, fluids are given for the kidney injury, and pacing is reserved for bradycardia that does not respond. The general lesson is to ask why the heart is slow before reaching for the pacing wire.
:::
:::
