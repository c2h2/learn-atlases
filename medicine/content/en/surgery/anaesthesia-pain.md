Before 1846, surgery was done on conscious patients held down by assistants, and the best surgeon was the fastest. Anaesthesia changed that: it made long, careful operations possible and turned surgery from a last resort into routine treatment. Today a general anaesthetic is one of the safest things that happens in hospital, but that safety comes from careful assessment, continuous monitoring and well-practised responses to rare emergencies.

This chapter explains what general and regional anaesthesia do and how they are delivered, how the airway is managed, which emergencies every doctor in theatre should recognise, and how acute pain after surgery is treated. Guidance followed is UK-first (the Association of Anaesthetists, the Royal College of Anaesthetists, the Difficult Airway Society and NICE) as of 2026. Drug details are given to explain principles; doses for individual patients come from a current formulary and local protocols.

## General anaesthesia

::: definition General anaesthesia {#def-general}
**General anaesthesia** is a drug-induced, reversible state in which the patient is unconscious and does not respond to surgical stimulation. It is usually described as a balance of three components, the **triad of anaesthesia**:

- **hypnosis** (unconsciousness and amnesia), from intravenous or inhaled anaesthetic agents;
- **analgesia** (blunting the response to painful stimuli), from opioids, local anaesthetic blocks and other analgesics;
- **muscle relaxation**, from neuromuscular blocking drugs when the operation or the airway requires it.

An anaesthetic has three phases: **induction** (going to sleep), **maintenance** (staying asleep during surgery) and **emergence** (waking up).
:::

### The drugs

**Intravenous induction agents** act within one arm-to-brain circulation time, about 30 seconds. **Propofol** is the most widely used. It enhances the inhibitory GABA-A receptor, causes vasodilatation and a fall in blood pressure, and suppresses airway reflexes, which makes it suitable for inserting a supraglottic airway. **Ketamine** blocks NMDA receptors; it maintains blood pressure and airway reflexes better than propofol and is useful in shocked patients, but can cause unpleasant emergence phenomena. **Thiopental** is now used mainly for rapid sequence induction in some units.

The patient wakes after a single dose of propofol not because the drug is metabolised but because it redistributes from the brain into muscle and fat. For longer anaesthesia, propofol can be given by continuous infusion (**total intravenous anaesthesia, TIVA**), often using a computer-controlled pump that targets a calculated blood or brain concentration.

**Volatile anaesthetics** (sevoflurane, desflurane and isoflurane) are inhaled vapours used mainly for maintenance. Their potency is described by the **minimum alveolar concentration (MAC)**.

::: definition Minimum alveolar concentration {#def-mac}
The **minimum alveolar concentration (MAC)** of an inhaled anaesthetic is the alveolar concentration, at one atmosphere, at which 50% of patients do not move in response to a standard surgical skin incision. A lower MAC means a more potent agent. Approximate values in a healthy middle-aged adult are about 2% for sevoflurane, 6% for desflurane and 1.2% for isoflurane. MAC falls with age, hypothermia, pregnancy and the use of opioids or other sedatives, and rises in young children.
:::

Because MAC is a population average, about 1.0–1.3 MAC is typically used during surgery so that most patients do not respond. End-tidal (exhaled) concentration is measured continuously and approximates the alveolar concentration. Volatile agents are potent greenhouse gases, desflurane especially, and many UK hospitals have removed desflurane for environmental reasons.

::: widget plot
f: 100*x^n/(x^n+m^n)
x: 0, 4
y: 0, 100
sliders: m=2:0.5:6:0.1; n=8:2:16:1
labels: \text{patients not moving at incision (\%)}
hlines: 50; 95
caption: A simplified concentration–response curve for an inhaled anaesthetic (illustrative, not a dosing tool). The horizontal axis is end-tidal concentration in %; m is the MAC (the concentration at which 50% of patients do not move) and n sets how steep the curve is. With m = 2 (about sevoflurane), notice how much higher the concentration must be for 95% of patients not to move, which is why anaesthetists aim for more than 1 MAC.
:::

**Opioids** (fentanyl, remifentanil, morphine) provide analgesia and blunt the cardiovascular response to intubation and surgery. Remifentanil is broken down by plasma esterases, so its effect ends within minutes of stopping an infusion, whatever its duration.

**Neuromuscular blocking drugs** paralyse skeletal muscle by acting at the nicotinic acetylcholine receptor of the neuromuscular junction. They do not cause unconsciousness, so a paralysed patient must always be adequately anaesthetised.

- **Suxamethonium** is a *depolarising* blocker: it opens the receptor and holds the membrane depolarised. It acts within a minute and wears off in about 5–10 minutes, because plasma cholinesterase breaks it down. People with an inherited or acquired deficiency of this enzyme can stay paralysed for hours. Its side effects include muscle pains, a rise in serum potassium (dangerous after burns, crush injury or denervation) and triggering malignant hyperthermia.
- **Rocuronium, vecuronium and atracurium** are *non-depolarising* blockers: they compete with acetylcholine at the receptor. Their effect can be reversed with **neostigmine** (an anticholinesterase, given with glycopyrronium to block its muscarinic effects) or, for rocuronium and vecuronium, with **sugammadex**, which binds the drug molecule directly.

The depth of blockade is monitored with a nerve stimulator using the **train-of-four (TOF)**: four stimuli at 2 Hz. As blockade deepens the twitches fade and then disappear. Quantitative monitors measure the **TOF ratio** (fourth twitch divided by first); a ratio of at least 0.9 is needed before extubation, because residual weakness below this impairs swallowing and breathing.

### Monitoring

The Association of Anaesthetists' standards (2021) require the anaesthetist to be present throughout and set a minimum for every general anaesthetic: pulse oximetry, non-invasive blood pressure, ECG, **continuous waveform capnography**, inspired oxygen and anaesthetic vapour concentrations, and airway pressure. Neuromuscular monitoring is required whenever a neuromuscular blocking drug is used, and processed EEG ("depth of anaesthesia") monitoring is recommended when TIVA is combined with neuromuscular blockade, because this combination carries the highest risk of awareness. Temperature is measured for any procedure longer than 30 minutes.

Capnography deserves emphasis. A tube that has been placed in the oesophagus can look correct and even produce chest movement, but it produces no sustained carbon dioxide trace. The Difficult Airway Society summarises this as **"no trace = wrong place"**: absent capnography after intubation means the tube is not in the trachea until proven otherwise, even in cardiac arrest, where chest compressions still produce a small trace.

## The airway

Under general anaesthesia the patient loses muscle tone in the tongue and pharynx and loses protective reflexes. The airway must be kept open and protected, by one of three main methods:

- a **face mask** with an oral or nasal airway, for short procedures or before intubation;
- a **supraglottic airway device** (for example a laryngeal mask), which sits over the larynx and is used for many elective operations in fasted patients;
- a **tracheal tube**, which passes through the vocal cords and has a cuff that seals the trachea. It protects against aspiration and is used for abdominal and thoracic surgery, in patients at risk of aspiration and when the airway must be secured for long periods.

**Airway assessment** before anaesthesia looks for predictors of difficulty: previous difficult intubation, limited mouth opening, a small or receding jaw, limited neck movement, obesity, obstructive sleep apnoea, a beard, and pathology of the head and neck. No single test predicts difficulty well, so anaesthetists combine them and always have a plan for failure.

::: definition Rapid sequence induction {#def-rsi}
**Rapid sequence induction (RSI)** is a technique used when the stomach may not be empty, as in bowel obstruction, emergency surgery, recent trauma or late pregnancy. The patient is preoxygenated to fill the lungs with oxygen, then a fixed dose of induction agent is followed immediately by a fast-acting neuromuscular blocker (rocuronium at a high dose, or suxamethonium). Bag-mask ventilation is avoided or kept gentle until a cuffed tracheal tube is in place, to avoid inflating the stomach. **Cricoid pressure** may be applied to compress the oesophagus, though its benefit is debated and it is released if it makes intubation difficult.
:::

When intubation proves unexpectedly difficult, the **Difficult Airway Society (DAS)** guidelines, updated in 2025, provide a sequence of plans. The priority throughout is **oxygenation**, not intubation:

- **Plan A:** intubation, usually with a videolaryngoscope, with a limited number of attempts.
- **Plan B:** if intubation fails, insert a supraglottic airway device to oxygenate.
- **Plan C:** if that fails, face-mask ventilation, and wake the patient if possible.
- **Plan D:** if the patient cannot be intubated and cannot be oxygenated (**CICO**), perform an emergency **front-of-neck airway**: a scalpel incision through the cricothyroid membrane, a bougie and a small cuffed tube.

Each step must be declared aloud so that the team knows where they are in the algorithm. Repeated attempts at laryngoscopy cause swelling and bleeding that make each subsequent attempt harder.

## Regional anaesthesia

::: definition Regional and local anaesthesia {#def-regional}
**Local anaesthetics** block voltage-gated sodium channels in nerve membranes, so action potentials cannot propagate. **Regional anaesthesia** uses them to block sensation in one part of the body:

- **local infiltration** of the wound;
- **peripheral nerve blocks** of a nerve or plexus, usually guided by ultrasound (for example a femoral or fascia iliaca block for a hip fracture, or a brachial plexus block for arm surgery);
- **neuraxial blocks**: a **spinal** (a single injection into the cerebrospinal fluid below the end of the spinal cord, giving dense anaesthesia within minutes for 1–3 hours) or an **epidural** (a catheter in the epidural space, allowing a continuous infusion for days).

Small, unmyelinated autonomic fibres are blocked first, then sensory fibres, then motor fibres. This is why spinal anaesthesia causes **hypotension** (sympathetic block causes vasodilatation) before the patient loses the ability to move the legs.
:::

Regional techniques avoid some of the risks of general anaesthesia, provide excellent analgesia into the postoperative period and reduce the need for opioids. They can be used alone with the patient awake or sedated, or combined with general anaesthesia.

Neuraxial blocks carry a small risk of **spinal or epidural haematoma**, which can compress the spinal cord. The risk is greatest in patients taking anticoagulants, so guidance (from the Association of Anaesthetists and specialist societies) sets minimum intervals between the last dose of an anticoagulant and the insertion or removal of a needle or catheter. As an illustration, a prophylactic dose of low-molecular-weight heparin is usually given at least 12 hours before a neuraxial block, and a treatment dose at least 24 hours before. Severe back pain, new leg weakness or numbness after a neuraxial block is an emergency requiring urgent MRI and neurosurgical review.

### Local anaesthetic doses

Every local anaesthetic has a maximum safe dose, usually expressed in mg/kg, because too much in the bloodstream causes toxicity. Adding adrenaline slows absorption and raises the maximum dose. Solutions are labelled as a percentage, and the conversion is the same for every drug: **1% = 1 g per 100 mL = 10 mg/mL**.

::: example A local anaesthetic dose check {#ex-la-dose}
A 50 kg woman needs a large skin lesion excised under local anaesthesia. The department uses illustrative maximum doses of 3 mg/kg for plain lidocaine. What is the maximum volume of 1% plain lidocaine she can receive by this rule?
::: solution
**Maximum dose:** $3\ \text{mg/kg} \times 50\ \text{kg} = 150$ mg.

**Concentration:** 1% lidocaine contains 10 mg/mL.

**Maximum volume:** $150\ \text{mg} \div 10\ \text{mg/mL} = 15$ mL.

Two further points. If 2% lidocaine were used, the same 150 mg would be only 7.5 mL; confusing concentrations is a common route to overdose. And weight-based rules are combined with an absolute maximum stated in the formulary, whichever is lower, and reduced further in frail, elderly or very vascular sites. The calculation is a safety check, not a target.
:::
:::

## Anaesthetic emergencies

Serious emergencies under anaesthesia are rare, which is exactly why they are rehearsed. Each has a recognisable pattern and a specific first action.

::: definition Anaesthetic emergencies {#def-emergencies}
- **Anaphylaxis:** sudden hypotension, bronchospasm or high airway pressures, tachycardia, and sometimes rash or swelling (skin signs may be absent or hidden by drapes). The commonest triggers in the UK's Sixth National Audit Project (NAP6, 2018) were antibiotics (especially teicoplanin and co-amoxiclav), neuromuscular blocking drugs, chlorhexidine and patent blue dye. Treatment is intramuscular or titrated intravenous **adrenaline**, fluids and removal of the trigger, with mast cell tryptase samples and referral to an allergy clinic afterwards ([[emergency-critical-care/anaphylaxis]]).
- **Local anaesthetic systemic toxicity (LAST):** perioral tingling, tinnitus and agitation, progressing to seizures, arrhythmias and cardiac arrest. Stop the injection, call for help, manage the airway and seizures, and give **intravenous lipid emulsion**. Resuscitation may need to continue for a long time.
- **Malignant hyperthermia:** an inherited disorder of the skeletal muscle ryanodine receptor (usually a *RYR1* variant). Volatile anaesthetics or suxamethonium trigger uncontrolled calcium release in muscle, causing a rising end-tidal CO₂ despite increased ventilation, tachycardia, muscle rigidity (including masseter spasm), hyperkalaemia and later a high temperature. Stop the trigger, hyperventilate with 100% oxygen, give **dantrolene**, cool and treat hyperkalaemia. The patient and relatives are referred for testing.
- **Laryngospasm:** reflex closure of the vocal cords, usually at light anaesthesia during induction or emergence. Treated with 100% oxygen, jaw thrust and continuous positive pressure, then deepening anaesthesia or a small dose of suxamethonium if it persists.
- **High or total spinal:** spread of local anaesthetic too high, causing hypotension, bradycardia, breathing difficulty and loss of consciousness. Supportive treatment of airway, breathing and circulation.
- **Accidental awareness** under general anaesthesia: the patient is conscious during part of the anaesthetic. The Fifth National Audit Project (NAP5, 2014) found spontaneous reports in roughly 1 in 19,000 general anaesthetics, more commonly with neuromuscular blockade, Caesarean section and TIVA.
:::

::: example High airway pressures after the antibiotic {#ex-anaphylaxis}
A 45-year-old woman is anaesthetised for a laparoscopic cholecystectomy. Five minutes after intravenous co-amoxiclav, her blood pressure falls from 120/70 to 60/30 mmHg, her heart rate rises to 135/min, airway pressures are high and there is wheeze. No rash is visible. What is the likely diagnosis and the immediate management?
::: solution
**Diagnosis.** Severe hypotension and bronchospasm within minutes of an intravenous drug are anaphylaxis until proven otherwise. The absence of a rash does not exclude it; in NAP6 skin signs were often absent at first, and hypotension was the commonest first feature.

**Immediate management.**

1. Call for help and declare anaphylaxis. Stop any possible trigger (the antibiotic has already been given; also consider chlorhexidine and other drugs).
2. Give 100% oxygen, maintain the airway and ventilation.
3. Give **adrenaline**; under anaesthesia it is titrated intravenously in small boluses by the anaesthetist, or given intramuscularly if no intravenous route is available.
4. Raise the legs and give rapid intravenous crystalloid.
5. If she does not respond, start an adrenaline infusion and follow the anaphylaxis algorithm, including treatment for refractory bronchospasm.
6. Take blood for **mast cell tryptase** as soon as possible after resuscitation has started, and again at 1–2 hours and later.

**After the event:** the operation is usually postponed; she is monitored in critical care; the reaction is documented and reported; and she is referred to a specialist allergy clinic, which will test all the drugs she received. She is told what happened and given written information.
:::
:::

::: example A rising carbon dioxide {#ex-mh}
A 19-year-old man is having an emergency appendicectomy under general anaesthesia with sevoflurane. Twenty minutes in, his end-tidal CO₂ has risen from 4.8 to 9.5 kPa despite doubling the minute ventilation. His heart rate is 140/min, his jaw is stiff and the soda lime canister is hot. His temperature is 37.9 °C. What is happening?
::: solution
**Interpretation.** A rising end-tidal CO₂ that does not respond to increased ventilation means that CO₂ production is greatly increased. Together with tachycardia and rigidity, this is **malignant hyperthermia** until proven otherwise. A high temperature is often a *late* sign, so a normal or slightly raised temperature does not exclude it. Other causes of high CO₂ (an exhausted absorber, rebreathing, sepsis, thyroid storm) are considered, but treatment must not be delayed.

**Management.** Call for help and the malignant hyperthermia kit. Stop the volatile agent, change to intravenous anaesthesia, and hyperventilate with 100% oxygen at high fresh gas flows. Give **dantrolene**, which reduces calcium release from the sarcoplasmic reticulum, repeated until the signs settle. Cool actively; treat hyperkalaemia and arrhythmias; monitor urine output for myoglobinuria and measure creatine kinase. Ask the surgeon to finish as quickly as possible. He then needs critical care and referral, with his family, to the national malignant hyperthermia unit for genetic and muscle testing.
:::
:::

## Postoperative nausea and vomiting

Postoperative nausea and vomiting (PONV) is one of the commonest complications of anaesthesia and one of the things patients fear most. The simplified **Apfel score** for adults gives one point each for female sex, being a non-smoker, a history of PONV or motion sickness, and the expected use of postoperative opioids. With 0, 1, 2, 3 or 4 risk factors the risk is roughly 10%, 20%, 40%, 60% and 80%.

Antiemetics act on different receptors: **ondansetron** (5-HT₃ antagonist), **dexamethasone** (corticosteroid), **cyclizine** (H₁ antagonist), **droperidol** and **prochlorperazine** (D₂ antagonists). In a large factorial trial (IMPACT, published in 2004), ondansetron, dexamethasone and droperidol each reduced the risk of PONV by about a quarter in relative terms, and their effects combined roughly multiplicatively. The practical consequence is that patients at higher risk receive more drugs from different classes, and that reducing the cause (for example using fewer opioids, or TIVA instead of volatile agents) also helps.

## Acute pain after surgery

Pain after surgery is not just unpleasant. It stops patients breathing deeply and coughing, which leads to chest infection; it delays mobilisation, which increases the risk of venous thromboembolism; it raises heart rate and blood pressure; it disturbs sleep and contributes to delirium; and poorly controlled acute pain increases the risk of chronic postsurgical pain.

::: theorem Multimodal analgesia {#thm-multimodal}
Pain after surgery is best controlled by combining analgesics that act at different points in the pain pathway (peripheral nociceptors, peripheral nerves, the spinal cord and the brain). The combination gives better pain relief with lower doses of each drug, and therefore fewer side effects, especially fewer opioid side effects. In practice this means regular **paracetamol**, an **NSAID** if not contraindicated, **local or regional anaesthesia** wherever possible, and **opioids** reserved for pain not controlled by the others.
:::

::: proof
Nociception has several stages: transduction of the injury at nociceptors (sensitised by prostaglandins and inflammatory mediators), transmission along peripheral nerves, modulation in the dorsal horn of the spinal cord and perception in the brain ([[nervous-system/headache-pain]]). NSAIDs reduce prostaglandin production at the site of injury; local anaesthetics stop transmission along the nerve; opioids act on receptors in the dorsal horn and brain; paracetamol acts centrally by mechanisms that are still not fully understood. Because each drug blocks a different stage, their effects add, and the dose of any one drug, which is what determines its side effects, can be kept lower. Opioid side effects (sedation, respiratory depression, nausea, constipation, urinary retention and ileus) are the main obstacle to recovery, so reducing opioid use is a direct aim of enhanced recovery ([[surgery/perioperative-care#def-eras]]).
:::

Analgesics have important cautions. NSAIDs can cause kidney injury (especially with dehydration, ACE inhibitors or diuretics), gastrointestinal bleeding and may worsen asthma in a minority of patients. Paracetamol doses are reduced in people who weigh less than 50 kg or have risk factors for liver toxicity. Opioids accumulate in kidney failure (morphine especially) and in older people, and the combination of opioids with other sedatives, such as benzodiazepines and gabapentinoids, increases the risk of respiratory depression.

**Patient-controlled analgesia (PCA)** lets the patient press a button to receive a small intravenous dose of opioid, with a **lockout interval** that prevents another dose until the previous one has taken effect. Its safety depends on the fact that a patient who becomes too drowsy stops pressing the button. It becomes dangerous when someone else presses it, when a background infusion is added, or when other sedatives are given. Patients on PCA or epidural infusions need regular observation of sedation score and respiratory rate, and **naloxone** must be prescribed for opioid-induced respiratory depression.

::: warning
**Respiratory rate is a late sign of opioid toxicity; sedation is an early one.** A patient whose breathing rate is still normal but who is difficult to rouse is already at risk. Sedation scores should be recorded alongside respiratory rate, and increasing drowsiness should lead to stopping opioids and reviewing the patient before the breathing rate falls. Supplemental oxygen can keep the oxygen saturation normal while carbon dioxide rises, so a normal SpO₂ does not exclude hypoventilation.
:::

::: example The drowsy patient on day 1 {#ex-opioid}
An 82-year-old woman is on day 1 after a total knee replacement. She has a morphine PCA, regular paracetamol and was given gabapentin at night. Her creatinine has risen from 90 to 160 µmol/L. She is difficult to rouse, her respiratory rate is 9/min and her pupils are small. Her oxygen saturation is 95% on 2 L/min oxygen. What is happening and what should be done?
::: solution
**Interpretation.** This is opioid toxicity. Three factors have combined: morphine and its active metabolite morphine-6-glucuronide accumulate when kidney function falls, gabapentin adds sedation and respiratory depression and is also cleared by the kidney, and age increases sensitivity to both. Her oxygen saturation is normal only because she is receiving oxygen; her CO₂ is probably high.

**Management.** Stop the PCA and gabapentin. Assess her airway and breathing; give naloxone in small titrated intravenous doses until she is rousable with adequate breathing, avoiding full reversal, which causes severe pain and agitation. Because naloxone is shorter acting than morphine in renal impairment, she may need repeated doses or an infusion and close monitoring. Check an arterial blood gas. Investigate and treat the acute kidney injury: fluids if she is dry, stop nephrotoxic drugs (including any NSAID).

**Then:** re-plan her analgesia. Restart regular paracetamol, consider a regional technique, and if an opioid is needed use a lower dose of a drug less dependent on renal excretion, as advised by the pain team. Report the event as a learning incident.
:::
:::

The traditional **WHO analgesic ladder** (non-opioid, then weak opioid, then strong opioid) was designed for cancer pain. After surgery the logic runs in the opposite direction: pain is worst at the start and falls over days, so analgesia starts strong and steps *down*, and opioids are stopped as early as possible. Patients are discharged with a short supply and clear instructions to taper, because long-term opioid use often begins after surgery.

::: quiz
A patient on a morphine PCA is very drowsy but has a respiratory rate of 12/min and oxygen saturation of 97% on 4 L/min oxygen. Which statement is correct?
- [ ] She is safe, because her respiratory rate and saturation are normal
- [x] She may be hypoventilating; oxygen can keep the saturation normal while CO₂ rises
- [ ] The PCA should be continued but her oxygen increased
- [ ] Her relatives should press the button for her while she is drowsy
::: solution
Sedation is an early warning sign of opioid toxicity. Supplemental oxygen can maintain normal oxygen saturation despite hypoventilation, so CO₂ may be rising. The PCA should be stopped and she should be assessed urgently. Nobody other than the patient should press a PCA button.
:::
:::

::: history
On 16 October 1846, the dentist William Morton gave ether to Edward Gilbert Abbott at the Massachusetts General Hospital in Boston while the surgeon John Collins Warren removed a tumour from his neck. Crawford Long in Georgia had used ether in 1842 but not published, and Horace Wells's public demonstration of nitrous oxide in 1845 had been judged a failure. News of Morton's demonstration spread rapidly; in 1847 James Young Simpson in Edinburgh introduced chloroform, and John Snow in London studied the physiology and dosing of both agents and gave chloroform to Queen Victoria in childbirth in 1853. Local anaesthesia began when Carl Koller used cocaine on the eye in 1884, and August Bier performed the first planned spinal anaesthetic in 1898. In 1942 Harold Griffith and Enid Johnson in Montreal introduced curare as a muscle relaxant, which allowed light anaesthesia with good surgical conditions and made modern abdominal surgery possible.
:::

## Where this leads

The preparation of the patient before anaesthesia is covered in [[surgery/perioperative-care]]. The pharmacology of receptors, drug interactions and variation between patients is in [[pharmacology/drug-receptor]] and [[pharmacology/patient-variation]]. Airway management in emergencies and critical care is in [[emergency-critical-care/airway-ventilation]], and the treatment of chronic and cancer pain in [[geriatrics-palliative/symptom-control]].

::: summary
- General anaesthesia combines **hypnosis, analgesia and, when needed, muscle relaxation**, through induction, maintenance and emergence.
- Propofol, ketamine and volatile agents produce unconsciousness; the potency of volatile agents is expressed as **MAC**, which falls with age and with opioids.
- Neuromuscular blockers cause paralysis but not unconsciousness; residual block is excluded with a **TOF ratio ≥ 0.9**; sugammadex reverses rocuronium and vecuronium.
- Minimum monitoring includes **continuous waveform capnography**: no trace means wrong place.
- RSI protects the airway in patients who may not be fasted. The DAS plans A–D prioritise **oxygenation**, ending in front-of-neck access for CICO.
- Local anaesthetics block sodium channels. Maximum doses are calculated in mg/kg; **1% = 10 mg/mL**. LAST is treated with lipid emulsion.
- Rehearsed emergencies: **anaphylaxis** (adrenaline), **malignant hyperthermia** (dantrolene), laryngospasm, high spinal and LAST.
- PONV risk follows the **Apfel score**; antiemetics from different classes combine.
- Postoperative pain is treated with **multimodal analgesia** that minimises opioids; sedation is an earlier warning of opioid toxicity than respiratory rate.
:::

## Exercises

::: exercise The three components {level=1}
For each drug, state which component of the triad of anaesthesia it mainly provides: (a) propofol; (b) fentanyl; (c) rocuronium; (d) sevoflurane; (e) a femoral nerve block.
::: solution
(a) Hypnosis. (b) Analgesia (it also contributes to hypnosis at higher doses). (c) Muscle relaxation only; it provides no hypnosis or analgesia, which is why awareness is a risk if a paralysed patient is not adequately anaesthetised. (d) Hypnosis, with some muscle relaxation and suppression of movement through spinal effects. (e) Analgesia (sensory block) and motor block in the territory of the femoral nerve.
:::
:::

::: exercise Converting a percentage {level=1 check="7.5"}
Using the illustrative maximum of 3 mg/kg for plain lidocaine, what is the maximum volume in millilitres of **2%** plain lidocaine for a 50 kg patient? Give the exact value.
::: hint
First find the maximum dose in mg, then the number of mg in each mL of a 2% solution.
:::
::: solution
Maximum dose: $3 \times 50 = 150$ mg. A 2% solution contains $20$ mg/mL. Volume: $150 \div 20 = 7.5$ mL. Compare this with 15 mL for a 1% solution in [[#ex-la-dose]]: the same volume of a stronger solution gives twice the dose.
:::
:::

::: exercise Reading the train-of-four {level=1}
At the end of an operation, the quantitative neuromuscular monitor shows a TOF ratio of 0.6. The surgeon asks whether the patient can be extubated. What do you answer, and why?
::: solution
No. A TOF ratio below 0.9 means significant residual neuromuscular blockade. Although the patient may breathe and even lift the head, the muscles of the pharynx and upper airway are weak, so the patient is at risk of airway obstruction, aspiration and hypoxia after extubation. Reversal should be given (sugammadex if rocuronium was used, or neostigmine with glycopyrronium once there is some spontaneous recovery) and the patient extubated only when the ratio is at least 0.9.
:::
:::

::: exercise Who needs a rapid sequence induction? {level=2}
For each patient, say whether RSI is indicated and why: (a) a fasted 30-year-old for elective knee arthroscopy; (b) a 70-year-old with small bowel obstruction who has been vomiting; (c) a woman at 38 weeks of pregnancy needing an emergency Caesarean section under general anaesthesia; (d) a 25-year-old who ate a meal one hour before breaking his wrist and now needs urgent fracture fixation.
::: solution
(a) No: the stomach is empty and there is no reflux risk; a supraglottic airway is likely to be suitable. (b) Yes: bowel obstruction fills the stomach with fluid regardless of fasting time, and a nasogastric tube is usually aspirated before induction. (c) Yes: late pregnancy causes reduced lower oesophageal sphincter tone and raised intra-abdominal pressure (regional anaesthesia is preferred where possible for this reason). (d) Yes if a general anaesthetic is needed soon: trauma, pain and opioids slow gastric emptying, so the stomach may still contain food. A regional block might avoid general anaesthesia altogether.
:::
:::

::: exercise Neuraxial block and anticoagulants {level=2}
A 74-year-old man due for a hip replacement under spinal anaesthesia received his prophylactic low-molecular-weight heparin injection at 20:00 the evening before. Surgery is planned for 08:00. Using the illustrative interval of at least 12 hours after a prophylactic dose, can the spinal go ahead on time? What symptoms after the operation would be an emergency?
::: solution
From 20:00 to 08:00 is exactly 12 hours, so by this rule the spinal can proceed at 08:00 but not earlier, provided he has had no other anticoagulant or antiplatelet drug that changes the timing (local guidance and any other drugs must be checked). After the operation, new or increasing back pain, numbness or weakness of the legs that persists beyond the expected duration of the block, or loss of bladder or bowel control could indicate a spinal epidural haematoma. These need urgent MRI and neurosurgical review, because the outcome depends on decompression within hours.
:::
:::

::: exercise Choosing an analgesia plan {level=2}
Write an analgesia plan for a 58-year-old man with normal kidney function after an open right hemicolectomy, and explain each element. Then explain how the plan would change if his eGFR were 25 mL/min/1.73 m².
::: solution
**Plan:** a regional technique (for example a thoracic epidural or rectus sheath catheters) placed at the time of surgery; regular paracetamol; a regular NSAID if there are no contraindications; and an intravenous opioid PCA or oral opioid for breakthrough pain, with naloxone and an antiemetic prescribed. Sedation, respiratory rate and pain scores are monitored, and the regional technique is stopped after 2–3 days with a planned step-down to oral analgesia. Laxatives are prescribed with opioids.

**Reasons:** each component acts on a different part of the pain pathway, so the combination reduces opioid requirements and their side effects (ileus, nausea and sedation), which supports early mobilisation and feeding.

**With an eGFR of 25:** avoid NSAIDs (risk of further kidney injury); avoid morphine if possible, because its active metabolites accumulate; if an opioid is needed, use a reduced dose of a drug with less renal dependence (as advised by the pain team or pharmacist); and monitor sedation closely. Regional techniques become even more valuable.
:::
:::

::: exercise Prophylaxis for PONV {level=3 check="round(1/(0.6*0.26))"}
A 35-year-old woman who has never smoked, with no previous PONV or motion sickness, is having a laparoscopic operation and is expected to need opioids afterwards. (a) What is her simplified Apfel score and approximate risk of PONV? (b) Assume that one antiemetic reduces this risk by 26% in relative terms. How many patients like her would need to receive that antiemetic to prevent one episode of PONV? Round to the nearest whole number.
::: hint
The absolute risk reduction is the baseline risk multiplied by the relative risk reduction.
:::
::: solution
(a) Female sex (1), non-smoker (1) and postoperative opioids (1) give a score of **3**, a risk of about 60%.

(b) The absolute risk reduction is $0.6 \times 0.26 = 0.156$, and the number needed to treat is $1/0.156 \approx 6.4$, which rounds to **6**. If she also had a history of motion sickness (score 4, risk about 80%), the same drug would give an absolute reduction of 0.208 and an NNT of about 5. The higher the baseline risk, the more patients benefit from each drug, which is why higher-risk patients receive antiemetics from several classes.
:::
:::

::: exercise Collapse in theatre {level=3}
Ten minutes after an interscalene brachial plexus block with a large volume of local anaesthetic, and before induction of general anaesthesia, a 60-year-old man becomes agitated, complains of a metallic taste and then has a generalised seizure. His heart rate falls to 40/min and his QRS complexes widen. Give the diagnosis, the differential, the immediate management and two measures that reduce the chance of this happening.
::: solution
**Diagnosis:** local anaesthetic systemic toxicity (LAST), from intravascular injection or rapid absorption. The sequence of central nervous system symptoms (perioral tingling, metallic taste, agitation, seizures) followed by cardiac toxicity (bradycardia, conduction block, arrhythmias, possible arrest) is typical.

**Differential:** vasovagal reaction (no seizure or QRS widening), anaphylaxis (hypotension and bronchospasm), a primary seizure disorder or hypoglycaemia (check glucose), and high or total spinal from injection near the neuraxis, which can occur with an interscalene block.

**Management:** stop injecting; call for help; give 100% oxygen and secure the airway, avoiding hypoxia and acidosis, which worsen toxicity; treat seizures with a benzodiazepine or a small dose of propofol; give **intravenous lipid emulsion** according to the Association of Anaesthetists' guideline; manage arrhythmias, recognising that resuscitation may need to be prolonged and that standard antiarrhythmic choices differ (lidocaine is not used). If cardiac arrest occurs, start CPR and continue lipid emulsion; cardiopulmonary bypass or ECMO may be considered.

**Prevention:** calculate and record the maximum dose in advance; use ultrasound guidance and the lowest effective volume; aspirate before and inject slowly in small increments while watching the patient; and keep lipid emulsion immediately available wherever regional blocks are done.
:::
:::
