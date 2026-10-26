Poisoning is one of the commonest reasons for an emergency admission in adults. Most cases are intentional overdoses of medicines taken at a time of distress, but poisoning also follows accidents at home or work, recreational drug use, medication errors, and exposure to gases such as carbon monoxide. The great majority of patients survive with good supportive care. A minority have taken a substance with a specific, time-critical treatment, and recognising them is the main clinical skill.

This chapter covers the general approach to the poisoned patient, the recognition of toxic syndromes, decontamination and enhanced elimination, the antidotes and management of the commonest serious poisonings, and the care of the person behind the overdose. UK practice is followed: the National Poisons Information Service (NPIS) and its online database **TOXBASE** provide current, agent-specific advice, and clinicians should consult them for every significant poisoning. In keeping with the rest of this site, the chapter teaches recognition and the principles of management; it does not give harmful quantities of any substance.

If you are affected by the issues in this chapter, support is available. In the UK and Ireland, Samaritans can be contacted free at any time on 116 123.

## The approach to the poisoned patient {#def-approach}

::: definition Principles of managing poisoning {#def-principles}
The management of a poisoned patient follows a fixed order:

1. **Resuscitation and supportive care** using ABCDE: airway protection, oxygenation, circulation, glucose, temperature and seizure control. Most patients need nothing more.
2. **Risk assessment**: what was taken, how much, when, by what route, with what else (alcohol and other drugs are common co-ingestions), and what the patient's own risk factors are. This predicts the likely course and the need for specific treatment.
3. **Investigations**: an ECG, blood glucose, urea and electrolytes, liver function, venous blood gas, and **paracetamol and salicylate concentrations in every patient with an intentional overdose**, because these poisonings may cause no symptoms early but need time-critical treatment.
4. **Decontamination** to reduce absorption, when indicated.
5. **Enhanced elimination** for a small number of poisons.
6. **Antidotes** where one exists and is indicated.
7. **Psychosocial assessment** and care of the person, including assessment of capacity and of the risk of further self-harm.
:::

Several features of the history are unreliable: the time and quantity of ingestion are often uncertain, and patients may not say what they took. A careful examination, an ECG and laboratory tests frequently tell more. Pill packets, a phone call to the family or the ambulance crew's observations at the scene are useful.

### The ECG and the blood gas

The ECG detects the most dangerous effects of many drugs. A **broad QRS** (over about 100 ms) suggests sodium-channel blockade, for example by tricyclic antidepressants; a long **QT interval** predisposes to torsades de pointes (many antipsychotics, antidepressants, methadone); **bradycardia and heart block** suggest beta-blockers, calcium-channel blockers or digoxin.

The venous blood gas and electrolytes identify a metabolic acidosis. The **anion gap** estimates unmeasured anions:

$$
\text{anion gap} = [\text{Na}^+] - ([\text{Cl}^-] + [\text{HCO}_3^-])
$$ {#eq-ag}

The normal range is roughly 8–16 mmol/L, depending on the laboratory. A **raised anion gap metabolic acidosis** in a poisoned patient suggests lactic acidosis (from shock, seizures, metformin, cyanide, carbon monoxide), ketoacidosis, or the acidic metabolites of **methanol** or **ethylene glycol**, or **salicylate** poisoning. The **osmolar gap**, the difference between measured and calculated plasma osmolality (calculated as $2[\text{Na}^+] + [\text{urea}] + [\text{glucose}]$ in mmol/L), is raised early in toxic alcohol poisoning, when the unmetabolised alcohol is still present, and falls as the acid metabolites accumulate.

### Toxidromes

A **toxidrome** is a cluster of signs produced by a class of poisons. Recognising one narrows the possibilities when the history is unclear.

::: definition The main toxidromes {#def-toxidromes}
| Toxidrome | Typical agents | Key features |
|---|---|---|
| **Opioid** | Heroin, morphine, oxycodone, methadone | Reduced consciousness, slow shallow breathing, pinpoint pupils |
| **Sedative–hypnotic** | Benzodiazepines, Z-drugs, alcohol, GHB | Reduced consciousness, slurred speech, ataxia; breathing usually less depressed than with opioids unless combined |
| **Anticholinergic** | Tricyclics, antihistamines, some antipsychotics, plants such as deadly nightshade | Agitated delirium, dilated pupils, dry flushed skin, hyperthermia, tachycardia, urinary retention, absent bowel sounds |
| **Sympathomimetic** | Cocaine, amphetamines, MDMA | Agitation, dilated pupils, tachycardia, hypertension, hyperthermia, **sweating** (which distinguishes it from the anticholinergic syndrome) |
| **Cholinergic** | Organophosphate and carbamate insecticides, nerve agents | Salivation, lacrimation, urination, diarrhoea, vomiting, bronchorrhoea and bronchospasm, bradycardia, small pupils, muscle fasciculation and weakness |
| **Serotonin toxicity** | SSRIs, MAO inhibitors, tramadol, MDMA, especially in combination | Agitation, tremor, **clonus** (inducible or spontaneous, most marked in the legs), hyperreflexia, hyperthermia, sweating, diarrhoea |
:::

## Decontamination and enhanced elimination {#def-elimination}

### Decontamination

Most drugs are absorbed quickly, so decontamination helps only when given early, and it carries risks of its own.

- **Activated charcoal** adsorbs many drugs in the gut. It is considered when a potentially toxic amount of a drug that binds to charcoal was taken within about **one hour**, and the patient's airway is protected (aspiration of charcoal causes severe pneumonitis). It does not bind alcohols, iron, lithium, acids, alkalis or other metals.
- **Whole bowel irrigation** with polyethylene glycol is reserved for specific situations, such as large amounts of modified-release preparations, iron or packets of drugs carried internally, on specialist advice.
- **Gastric lavage** and induced vomiting are no longer used routinely.
- **Skin and eye decontamination** is essential for chemicals such as organophosphates and corrosives: remove clothing, wash with water, and protect staff.

### Enhanced elimination

::: theorem First-order elimination and half-life {#thm-halflife}
For most drugs at most concentrations, the rate of elimination is proportional to the concentration (first-order kinetics), so the concentration falls exponentially:

$$
C(t) = C_0 \, e^{-kt}, \qquad t_{1/2} = \frac{\ln 2}{k} = \frac{0.693 \times V_d}{CL}
$$ {#eq-firstorder}

where $V_d$ is the volume of distribution and $CL$ the total clearance. An extracorporeal method of removal such as haemodialysis adds its own clearance to the body's, shortening the half-life, but only if the drug is in the blood where the machine can reach it.
:::

::: proof
The amount of drug removed per unit time equals clearance times concentration, $CL \times C$. The amount in the body is $V_d \times C$, so the fractional removal rate is $k = CL / V_d$, and integrating $dC/dt = -kC$ gives the exponential fall. Halving takes $\ln 2 / k$. Two consequences follow for poisoning. First, a drug with a very large volume of distribution (such as a tricyclic antidepressant, which is mostly in the tissues) has little in the blood, so even an efficient dialyser removes a tiny fraction of the body load. Second, removal is worthwhile when the drug has a small volume of distribution, low protein binding, and slow natural clearance relative to what the dialyser can add, as with salicylate, lithium, methanol and ethylene glycol. At high concentrations some drugs (salicylate, ethanol, phenytoin) saturate their elimination enzymes and switch to zero-order kinetics, falling by a fixed amount per hour instead of a fixed fraction, which prolongs toxicity.
:::

The main methods are:

- **Multiple-dose activated charcoal** for a few drugs that undergo enterohepatic circulation or diffuse back into the gut, including carbamazepine, dapsone, phenobarbital, quinine and theophylline.
- **Urinary alkalinisation** with IV sodium bicarbonate for salicylate poisoning: in alkaline urine more salicylate is ionised and trapped in the tubular fluid, and its excretion rises.
- **Haemodialysis** for severe poisoning with salicylate, lithium, methanol, ethylene glycol, metformin-associated lactic acidosis, valproate and theophylline, among others. The international EXTRIP workgroup publishes evidence-based recommendations for which poisons and which situations.

## The time-critical poisonings {#def-specific}

### Paracetamol

Paracetamol is the drug most often taken in overdose in the UK. Its danger is that early symptoms are absent or mild (nausea, vomiting), while liver injury develops over two to four days. An effective antidote exists and works best when started within 8 hours of ingestion.

**Mechanism.** Most paracetamol is conjugated to harmless sulphate and glucuronide metabolites. A small fraction is oxidised by cytochrome P450 (mainly CYP2E1) to the reactive metabolite **NAPQI**, which is normally detoxified by glutathione. In overdose, glutathione is used up, and NAPQI binds to proteins in hepatocytes, causing centrilobular necrosis. Kidney injury can also occur. **Acetylcysteine** replenishes glutathione and is close to fully protective if started early.

::: definition The UK paracetamol treatment line {#def-paracetamol}
Since 2012, following a review by the Commission on Human Medicines, the UK has used a **single treatment line** on the paracetamol nomogram for all patients. The line runs from **100 mg/L at 4 hours** after ingestion, falling with a half-life of about 4 hours (to about 15 mg/L at 15 hours).

- A paracetamol concentration taken **4 hours or more** after a single acute ingestion is plotted on the nomogram. If it lies **on or above the line**, acetylcysteine is given.
- Concentrations taken before 4 hours cannot be interpreted, because absorption is incomplete.
- If the time of ingestion is unknown, the overdose was **staggered** (taken over more than an hour), or the patient presents late with abnormal liver tests, the nomogram cannot be used, and treatment is decided by TOXBASE criteria, generally erring towards treatment.
- If the patient presents more than 8 hours after a potentially significant ingestion, acetylcysteine is started **immediately** without waiting for the concentration, because its benefit declines with time.
:::

The traditional intravenous acetylcysteine regimen was three infusions over 21 hours. Many UK hospitals now use the **SNAP** regimen, a 12-hour, two-bag schedule developed in Scotland and tested in a randomised trial published in 2014, which causes fewer anaphylactoid reactions and less vomiting; TOXBASE has recommended it since 2020, although it is used outside the product licence. At the end of treatment, the INR, ALT, creatinine and paracetamol concentration are checked, and treatment is continued if they are abnormal.

Patients who develop acute liver failure are discussed early with a liver unit. The **King's College criteria** for referral for liver transplantation after paracetamol poisoning include an arterial pH below 7.30 after resuscitation, or the combination of an INR above 6.5, creatinine above 300 µmol/L and grade III or IV encephalopathy.

::: widget plot
f: 100*0.5^((x-4)/4)
x: 4, 16
y: 0, 110
labels: \text{UK treatment line (mg/L)}
caption: The UK single paracetamol treatment line, plotted from 4 hours after a single acute ingestion: 100 mg/L at 4 hours, halving about every 4 hours. A concentration on or above the line indicates treatment with acetylcysteine. The line applies only to a single ingestion at a known time, measured at least 4 hours afterwards; staggered or uncertain ingestions are managed by TOXBASE criteria. This figure is for teaching; clinical decisions use the official nomogram.
:::

### Salicylate

Aspirin poisoning causes nausea, vomiting, tinnitus, sweating and hyperventilation. Salicylate directly stimulates the respiratory centre, causing a **respiratory alkalosis**, and also uncouples oxidative phosphorylation, causing a **raised anion gap metabolic acidosis**. Adults typically show a mixed picture; children more often a pure acidosis. Severe poisoning causes hyperthermia, pulmonary oedema, confusion, seizures and death.

Management combines rehydration, correction of potassium, **urinary alkalinisation** with IV sodium bicarbonate, and **haemodialysis** for severe toxicity (very high concentrations, severe acidosis, kidney failure, pulmonary oedema or neurological features). Intubation is dangerous in severe salicylate toxicity: if the ventilator does not match the patient's very high minute ventilation, the pH falls, more salicylate enters the brain and the patient can arrest. Specialist advice is essential.

### Tricyclic antidepressants

Tricyclics such as amitriptyline block sodium channels in the heart, as well as muscarinic, histamine and α-adrenergic receptors. Toxicity develops rapidly, with an anticholinergic syndrome, reduced consciousness, seizures, hypotension and arrhythmias. The ECG shows sinus tachycardia, a **broad QRS**, and often a tall R wave in lead aVR.

The key treatment for broad QRS, arrhythmia or hypotension is **IV sodium bicarbonate**, which raises the serum sodium and pH and partly overcomes the sodium-channel block. Seizures are treated with benzodiazepines. Antiarrhythmic drugs that also block sodium channels (class Ia and Ic) are avoided.

### Opioids

Opioid toxicity causes reduced consciousness, respiratory depression and small pupils. **Naloxone**, a competitive antagonist, reverses it. In a person with opioid dependence, naloxone is given in small, repeated IV doses to restore adequate breathing without triggering severe withdrawal; ventilation with a bag-mask comes first if breathing is inadequate. Naloxone acts for a shorter time than many opioids (methadone, modified-release preparations), so patients need observation and may need an infusion. Take-home naloxone is supplied to people who use opioids, and to their families, to reduce deaths.

### Benzodiazepines

Benzodiazepines alone rarely cause dangerous respiratory depression, but they do so in combination with alcohol, opioids or other sedatives. Treatment is supportive. The antagonist **flumazenil** is rarely appropriate: in patients with benzodiazepine dependence or tricyclic co-ingestion it can precipitate seizures.

### Beta-blockers and calcium-channel blockers

Both cause bradycardia, heart block and hypotension; calcium-channel blockers such as amlodipine (a dihydropyridine) cause marked vasodilatation, and verapamil and diltiazem cause severe bradycardia. Calcium-channel blocker poisoning often causes hyperglycaemia because insulin secretion is blocked. Modified-release preparations can cause delayed, prolonged toxicity.

Treatment is supportive with fluids, atropine, IV calcium, vasopressors and inotropes, and specific measures on expert advice: **high-dose insulin euglycaemic therapy** (insulin with glucose to maintain normal glucose, which improves myocardial energy use), glucagon in beta-blocker poisoning, pacing, lipid emulsion in refractory cases, and ECMO.

### Digoxin

Digoxin toxicity, often chronic in older people with declining kidney function, causes nausea, vomiting, confusion, visual disturbance (yellow-green vision) and almost any arrhythmia, classically bradycardia with heart block, or atrial tachycardia with block. Hyperkalaemia is a sign of severe acute toxicity. **Digoxin-specific antibody fragments** bind digoxin and are given for life-threatening arrhythmias, significant hyperkalaemia or end-organ effects.

### Toxic alcohols

**Methanol** (in some solvents and illicitly produced spirits) and **ethylene glycol** (antifreeze) are not very toxic themselves; their metabolites, formed by alcohol dehydrogenase, are. Methanol produces formic acid, which damages the optic nerve and causes blindness; ethylene glycol produces glycolic and oxalic acids, which cause acidosis and kidney failure with calcium oxalate crystals. The patient may first appear drunk, then develop a severe raised anion gap metabolic acidosis.

Treatment blocks alcohol dehydrogenase with **fomepizole** (or ethanol if fomepizole is not available), corrects acidosis, and removes the alcohol and its metabolites with **haemodialysis**.

### Carbon monoxide

Carbon monoxide (CO), from faulty boilers, heaters, car exhausts and fires, binds haemoglobin about 200–250 times more strongly than oxygen, shifts the oxygen–haemoglobin dissociation curve to the left, and impairs mitochondrial function. Symptoms are nonspecific: headache, nausea, dizziness, confusion and, in severe cases, seizures, coma and cardiac ischaemia. Several people or pets in the same house being ill at once is a classic clue.

Standard pulse oximetry **cannot distinguish carboxyhaemoglobin from oxyhaemoglobin** and reads falsely normal. Diagnosis is by **carboxyhaemoglobin (COHb)** on a co-oximeter (most blood gas analysers). Treatment is **high-flow oxygen** by tight-fitting reservoir mask, which shortens the half-life of COHb, continued until symptoms resolve and COHb is low. Hyperbaric oxygen is discussed with specialists in selected severe cases; its benefit is uncertain. Late neuropsychiatric problems can follow, and the source must be made safe before the person goes home.

### Organophosphates

Organophosphate insecticides inhibit **acetylcholinesterase**, so acetylcholine accumulates at muscarinic and nicotinic synapses, producing the cholinergic toxidrome. Death is usually from respiratory failure: bronchorrhoea, bronchospasm and weakness of the respiratory muscles.

Management starts with **staff protection and decontamination** (removing clothing and washing the skin), followed by **atropine** given in rapidly increasing doses until the chest is clear of secretions, heart rate is adequate and blood pressure is maintained; large amounts may be needed. Oximes such as pralidoxime may reactivate the enzyme, though their benefit in trials has been uncertain. Patients may need intubation and ventilation. Some develop an **intermediate syndrome** of proximal and respiratory muscle weakness one to four days later.

::: warning "It was only a few tablets"
The two most dangerous assumptions in poisoning are that a patient who looks well is well, and that the history is accurate. Paracetamol, modified-release preparations, toxic alcohols and some cardiotoxic drugs can cause few or no early signs while lethal toxicity develops. Patients may minimise or not remember what they took. Check paracetamol and salicylate concentrations in every intentional overdose, take an ECG, and use TOXBASE to set the observation period for what may have been taken, not only what is admitted.
:::

## The person behind the overdose {#sec-person}

Most adults who take an intentional overdose do so in a state of distress, and a substantial minority will self-harm again. Each presentation is an opportunity to help. NICE guideline NG225 (self-harm: assessment, management and preventing recurrence, 2022) recommends that every person who has self-harmed is treated with compassion and respect, and is offered a **psychosocial assessment** by a trained mental health professional. It advises against using risk assessment tools or scales to predict future suicide or to decide who receives care, because they predict poorly; the assessment should instead focus on the person's needs, circumstances and safety plan.

Language matters: "a person who has self-harmed" or "intentional overdose", rather than terms that imply blame or manipulation. Staff attitudes strongly affect whether people seek help again. More detail is in [[psychiatry/self-harm-suicide-prevention]].

**Refusal of treatment** is a common and difficult situation. In England and Wales, decisions are made under the **Mental Capacity Act 2005**: a person aged 16 or over is presumed to have capacity, which is assessed for the specific decision at the specific time. A person lacks capacity if, because of an impairment of mind or brain, they cannot understand, retain, use or weigh the information, or communicate a decision. A capacitous adult may refuse treatment, even if the refusal may lead to their death. A person who lacks capacity is treated in their best interests. The Mental Health Act 1983 authorises treatment of mental disorder, not of the physical effects of poisoning, and the two Acts should not be confused. Senior and psychiatric involvement is essential, and the assessment is documented carefully.

## Worked cases

::: example A staggered paracetamol overdose {#ex-para}
A 23-year-old woman says she took "a few" paracetamol tablets at intervals over the previous day because of toothache and low mood, the last about 6 hours ago. She feels well. Her paracetamol concentration is 38 mg/L, ALT 64 U/L (normal below 40), INR 1.1. The junior doctor plots 38 mg/L at 6 hours on the nomogram, finds it below the line, and plans to discharge her. What is wrong?
::: solution
The ingestion was **staggered** over many hours, so there is no single time of ingestion and the nomogram cannot be used. Interpreting a concentration against the line assumes a single dose at a known time. In addition, her ALT is already raised.

According to UK guidance, patients with a staggered overdose of a potentially toxic amount, or with a detectable paracetamol concentration and abnormal ALT, are treated with **acetylcysteine**. Bloods are repeated at the end of treatment, with treatment continued if the ALT or INR is abnormal. TOXBASE gives the current criteria.

She also needs a dental assessment for the pain, and, because she mentioned low mood, a compassionate **psychosocial assessment** before discharge. Unintentional overdoses from staggered self-medication for pain are common and are often missed precisely because the patient seems well.
:::
:::

::: example The amlodipine late fall {#ex-cacb}
A 58-year-old man is brought in 3 hours after an intentional overdose of his modified-release amlodipine. On arrival he is alert, BP 112/70 mmHg, pulse 96/min. Six hours later he is drowsy, BP 72/38 mmHg, pulse 112/min, with warm peripheries, glucose 14.2 mmol/L and lactate 4.8 mmol/L. Explain the course and outline management.
::: solution
Amlodipine is a **dihydropyridine calcium-channel blocker**, which acts mainly on vascular smooth muscle, so overdose causes profound **vasodilatation** with a reflex tachycardia (unlike verapamil or diltiazem, which slow the heart). The modified-release preparation explains the delayed deterioration. Hyperglycaemia reflects blocked insulin release from pancreatic β-cells and is a marker of severity.

Management, with advice from TOXBASE or the NPIS:

1. ABCDE, early critical care referral, arterial line.
2. Consider activated charcoal if within the time window and the airway is safe (here it is too late; at presentation it might have been considered).
3. IV fluid boluses with reassessment; **IV calcium**.
4. **Vasopressors** (noradrenaline) for vasodilatation, with inotropes if echocardiography shows poor contraction.
5. **High-dose insulin euglycaemic therapy**, with frequent glucose and potassium checks.
6. Refractory shock: lipid emulsion on specialist advice, and referral for ECMO where available.

After recovery, he needs a psychosocial assessment.
:::
:::

::: example The headache household {#ex-co}
In January, a 34-year-old woman brings her two children (aged 4 and 7) to the emergency department because all three have had headaches and nausea for two days, worse in the mornings and better when they go out. The family dog has been lethargic. The woman's SpO₂ is 99% on air. What is the likely diagnosis and how is it confirmed and managed?
::: solution
**Carbon monoxide poisoning** is likely: nonspecific symptoms affecting several members of a household (and a pet) at once, worse at home and in winter when heating is in use. The normal SpO₂ is not reassuring, because standard pulse oximeters cannot distinguish carboxyhaemoglobin.

Confirmation is by **COHb** on a venous or arterial blood gas co-oximeter (a breath CO monitor may be used at triage). All three are treated with **high-flow oxygen** by reservoir mask until symptoms resolve and COHb is normal. An ECG and troponin are checked in the adult, and neurological examination in all. Severe cases (loss of consciousness, neurological signs, cardiac ischaemia, pregnancy) are discussed with specialists.

The house must not be re-entered until the appliance has been checked: the gas emergency service and local authorities are informed, and the family is advised to fit a CO alarm. Other occupants of the building may also be at risk.
:::
:::

::: example The farm worker with secretions {#ex-organophosphate-household}
A 46-year-old man who works on a farm is brought in after drinking from an unlabelled bottle in a shed. He is sweating, drooling and vomiting, with diarrhoea, pinpoint pupils, widespread muscle twitching, a heart rate of 44/min and wheeze with copious bronchial secretions. His clothes smell of chemicals. What is the toxidrome, and what are the first priorities?
::: solution
This is the **cholinergic toxidrome**, most likely from an **organophosphate** insecticide: muscarinic features (salivation, sweating, vomiting, diarrhoea, small pupils, bradycardia, bronchorrhoea and bronchospasm) with nicotinic features (fasciculation).

1. **Protect staff**: personal protective equipment; remove and bag his clothing; wash his skin.
2. **ABC**: suction, high-flow oxygen; prepare for intubation, as respiratory failure is the main cause of death.
3. **Atropine** IV, with doses doubled every few minutes until the chest is clear of secretions, heart rate is above about 80/min, and systolic pressure is above about 80 mmHg. Pupil size is not used as the end point.
4. Consider an **oxime** on specialist advice; treat seizures with benzodiazepines.
5. Observe for the **intermediate syndrome** of neck flexion and proximal and respiratory muscle weakness over the next days.

If the ingestion was intentional, he will need a psychosocial assessment once recovered.
:::
:::

::: example Read the gaps {#ex-gaps}
A 41-year-old man is found confused. Blood results: Na⁺ 140, Cl⁻ 100, HCO₃⁻ 8, urea 5, glucose 5 mmol/L; pH 7.08; lactate 2.0 mmol/L; measured osmolality 330 mOsm/kg. Calculate the anion gap and osmolar gap and interpret them.
::: solution
Anion gap by [[#eq-ag]]: $140 - (100 + 8) = 32$ mmol/L, markedly raised.

Calculated osmolality: $2 \times 140 + 5 + 5 = 290$ mOsm/kg. Osmolar gap: $330 - 290 = 40$, markedly raised (normal below about 10).

A raised anion gap metabolic acidosis with a high osmolar gap, a lactate too low to explain the acidosis, and normal glucose points to **toxic alcohol poisoning** (methanol or ethylene glycol). Ethanol itself also raises the osmolar gap but does not cause this degree of acidosis, so its concentration should be measured. Treatment is **fomepizole**, bicarbonate for acidosis, and urgent **haemodialysis**, with toxic alcohol concentrations sent to a reference laboratory and advice from the NPIS. An eye examination looks for methanol optic injury; urine microscopy may show oxalate crystals in ethylene glycol poisoning.
:::
:::

::: quiz
A 30-year-old woman took an intentional overdose of paracetamol 10 hours ago and has just arrived in the emergency department. She is well. What is the most appropriate first action?
- [ ] Take a paracetamol concentration and wait for the result before deciding on treatment.
- [x] Start acetylcysteine immediately, and adjust once the paracetamol concentration and liver tests are available.
- [ ] Give activated charcoal.
- [ ] Discharge with advice, as she is well.
::: solution
More than 8 hours after a potentially significant ingestion, the benefit of acetylcysteine is falling, so treatment starts immediately and is stopped later if the concentration is below the line and the bloods are normal. Charcoal is unlikely to help 10 hours after ingestion. Looking well is expected at this stage of paracetamol poisoning.
:::
:::

::: history
Toxicology begins with the remark attributed to the sixteenth-century physician Paracelsus that "the dose makes the poison": everything is toxic in sufficient amount. In 1814, Mathieu Orfila, a Spanish-born chemist working in Paris, published the first systematic treatise on poisons and pioneered their detection in tissues, founding forensic toxicology. Modern clinical toxicology developed in the second half of the twentieth century. The UK's National Poisons Information Service was founded in 1963 to give advice to clinicians. In 1975 Barry Rumack and Henry Matthew published the nomogram relating paracetamol concentration and time to the risk of liver damage, and in the 1970s Laurie Prescott and colleagues in Edinburgh showed that intravenous acetylcysteine prevented liver injury, one of the clearest successes of antidote therapy.
:::

## Where this leads

Drug handling and the pharmacology behind toxicity are in [[pharmacology/metabolism-excretion]] and [[pharmacology/adverse-reactions]]. Acid–base interpretation is in [[renal/acid-base-disorders]]. The care of people who use drugs is in [[psychiatry/substance-use]], and of people who self-harm in [[psychiatry/self-harm-suicide-prevention]]. Organ support for severely poisoned patients continues in [[emergency-critical-care/critical-care]], and cardiac arrest from poisoning is covered in [[emergency-critical-care/resuscitation]].

::: summary
- Supportive care using ABCDE is the foundation; most poisoned patients need nothing more. Consult TOXBASE or the NPIS for every significant case.
- In every intentional overdose, measure paracetamol and salicylate concentrations, take an ECG and check glucose and a blood gas.
- Toxidromes (opioid, sedative, anticholinergic, sympathomimetic, cholinergic, serotonin) help when the history is unclear.
- Activated charcoal is considered within about an hour if the airway is safe; enhanced elimination (urinary alkalinisation, haemodialysis) is useful for a small set of poisons with small volumes of distribution.
- Paracetamol: single UK treatment line from 100 mg/L at 4 hours; start acetylcysteine immediately if presenting after 8 hours or if the ingestion is staggered or of unknown timing.
- Specific treatments: bicarbonate for tricyclic QRS widening, titrated naloxone for opioids, fomepizole and dialysis for toxic alcohols, oxygen for carbon monoxide, atropine for organophosphates, antibody fragments for digoxin.
- Treat the person: compassionate psychosocial assessment for everyone who has self-harmed, with capacity assessed under the Mental Capacity Act if treatment is refused.
:::

## Exercises

::: exercise The anion gap {level=1 check="24"}
A patient's blood shows Na⁺ 138, Cl⁻ 104 and HCO₃⁻ 10 mmol/L. Calculate the anion gap in mmol/L.
::: solution
$138 - (104 + 10) = 24$ mmol/L, which is raised. Look for lactate, ketones, renal failure, salicylate and toxic alcohols.
:::
:::

::: exercise Read the treatment line {level=1 check="25"}
Using a treatment line of 100 mg/L at 4 hours that halves every 4 hours, what is the line's value (in mg/L) at 12 hours after a single acute ingestion?
::: solution
From 4 to 12 hours is 8 hours, two half-lives: $100 \times 0.5^2 = 25$ mg/L. A concentration of 25 mg/L or more at 12 hours after a single, timed ingestion indicates acetylcysteine.
:::
:::

::: exercise Osmolar gap {level=2 check="40"}
Measured osmolality is 330 mOsm/kg, Na⁺ 140 mmol/L, urea 5 mmol/L and glucose 5 mmol/L. Calculate the osmolar gap using $2[\text{Na}^+] + [\text{urea}] + [\text{glucose}]$.
::: solution
Calculated osmolality $= 280 + 5 + 5 = 290$. Osmolar gap $= 330 - 290 = 40$ mOsm/kg, markedly raised: suspect toxic alcohols or ethanol.
:::
:::

::: exercise Name the syndrome {level=1}
Name the toxidrome: (a) a 19-year-old at a festival with agitation, dilated pupils, temperature 39.4 °C, heart rate 140/min and profuse sweating; (b) a 76-year-old started on a new antihistamine with confusion, dry flushed skin, dilated pupils and a distended bladder; (c) a 50-year-old on an SSRI given tramadol, with tremor, sweating and sustained ankle clonus.
::: solution
(a) Sympathomimetic (for example MDMA, cocaine or amphetamines); sweating distinguishes it from the anticholinergic syndrome.
(b) Anticholinergic: "hot as a hare, dry as a bone, red as a beet, blind as a bat, mad as a hatter", with urinary retention.
(c) Serotonin toxicity from the combination; clonus is the key sign.
:::
:::

::: exercise Charcoal or not {level=2}
For each patient, say whether activated charcoal is appropriate and why: (a) a 30-year-old who took an overdose of a modified-release beta-blocker 45 minutes ago, fully alert; (b) a 25-year-old who drank antifreeze 30 minutes ago; (c) a 40-year-old with a GCS of 8 after a mixed overdose 30 minutes ago, not intubated; (d) a 60-year-old who took lithium 40 minutes ago.
::: solution
(a) Yes, consider it: early, alert, airway protected, and a drug that is adsorbed and likely to cause serious toxicity.
(b) No: charcoal does not bind ethylene glycol.
(c) Not unless the airway is first secured by intubation, because aspiration of charcoal is dangerous.
(d) No: charcoal does not bind lithium. Lithium toxicity is managed with fluids and, if severe, haemodialysis.
:::
:::

::: exercise Manage the cholinergic crisis {level=2}
A patient with organophosphate poisoning has received several doses of atropine. His pupils are now normal size, his heart rate is 92/min, but he still has widespread crackles and copious secretions with SpO₂ 88%. Is atropinisation complete?
::: solution
No. The end points of atropinisation are a clear chest (no bronchorrhoea), heart rate above about 80/min, systolic pressure above about 80 mmHg, and dry axillae; pupil size is not a reliable end point. Persistent bronchorrhoea means more atropine is needed, with the dose increased rapidly, alongside oxygen, suction and preparation for intubation.
:::
:::

::: exercise Decide on dialysis {level=2}
Which of these poisonings are likely to be helped by haemodialysis, and why? (a) severe lithium toxicity with confusion and kidney injury; (b) severe amitriptyline poisoning; (c) severe methanol poisoning with acidosis; (d) severe salicylate poisoning with pulmonary oedema.
::: solution
(a) Yes: lithium has a small volume of distribution, no protein binding and is cleared by the kidneys, which are failing.
(b) No: amitriptyline has a very large volume of distribution and is highly protein-bound, so dialysis removes very little ([[#thm-halflife]]). Treatment is supportive with bicarbonate for QRS widening.
(c) Yes: dialysis removes methanol and formic acid and corrects acidosis.
(d) Yes: salicylate is dialysable, and dialysis also corrects acidosis and fluid overload.
:::
:::

::: exercise The refusing patient {level=3}
A 28-year-old man who took an intentional paracetamol overdose 6 hours ago has a concentration above the treatment line. He refuses acetylcysteine and wants to leave. How should the team proceed?
::: solution
First, take the refusal seriously and talk with him: why does he want to leave, what does he understand, what is he afraid of? Often a calm, compassionate conversation resolves it. Explain clearly that the treatment is very effective now and much less so later, and that liver injury may be severe and is not felt until later.

Then assess **capacity** for this decision under the Mental Capacity Act 2005: can he understand the information, retain it, use or weigh it, and communicate a decision? Acute distress, intoxication or a mental disorder may impair his ability to weigh the information, but they do not automatically mean incapacity. If he has capacity, his refusal must be respected, with the door left open and a safety plan in place. If he lacks capacity, treatment can be given in his best interests, using the least restrictive option. The Mental Health Act may be relevant to assessing and treating any mental disorder but does not itself authorise treatment of the overdose. Involve senior emergency and psychiatric colleagues and document the assessment fully.
:::
:::

::: exercise Digoxin toxicity {level=3}
An 84-year-old woman taking digoxin for atrial fibrillation presents with vomiting, confusion and yellow vision. Heart rate is 40/min with a regular rhythm on the monitor; potassium is 5.9 mmol/L; creatinine has risen from 90 to 210 µmol/L. Explain the findings and the treatment.
::: solution
This is **chronic digoxin toxicity** precipitated by **acute kidney injury**, which reduces digoxin excretion. A regular slow rhythm in a patient known to have atrial fibrillation suggests **complete heart block with a junctional escape**, a classic sign of digoxin toxicity (the "regularised" AF). Hyperkalaemia reflects inhibition of the Na⁺/K⁺-ATPase.

Treatment: stop digoxin, correct dehydration and kidney injury, monitor the ECG, and give **digoxin-specific antibody fragments** for the life-threatening bradyarrhythmia and hyperkalaemia, following TOXBASE dosing. Atropine may help temporarily. A digoxin concentration taken at least 6 hours after the last dose helps confirm the diagnosis but should not delay treatment of a clearly toxic patient.
:::
:::
