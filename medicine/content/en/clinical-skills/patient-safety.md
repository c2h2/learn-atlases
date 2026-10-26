Healthcare is meant to help, but it also causes harm. Patients develop infections from their care, receive the wrong drug or dose, fall in hospital, have a diagnosis missed, or deteriorate without anyone noticing. The World Health Organization estimates that around one in ten patients is harmed in healthcare, and a substantial share of that harm is preventable. Most of it is not caused by careless individuals. It arises when capable, well-meaning people work in systems that make errors easy and catching them hard.

This chapter describes how errors and harm are defined and classified, the systems view of accidents and the science of human factors, the common types of harm in hospitals, the tools that reduce them (checklists, design, reporting and learning, a just culture and openness with patients), and the methods of quality improvement. It draws on [[clinical-skills/records-handover]] and [[clinical-skills/clinical-reasoning]].

## The size of the problem

Large reviews of hospital records have measured harm since the 1980s. The **Harvard Medical Practice Study**, published in 1991, found adverse events in about 3.7% of hospital admissions in New York State. In the UK, a 2001 pilot review of records from two London hospitals by **Charles Vincent** and colleagues found that about **10.8%** of patients experienced an adverse event, about half of which were judged preventable with ordinary standards of care. In 1999 the US Institute of Medicine report ***To Err Is Human*** brought these figures to public attention and argued that most errors result from faulty systems rather than individual recklessness. The numbers differ with methods and settings, but every study tells the same story: harm from care is common, often serious and often preventable.

::: definition Error, harm and incidents {#def-terms}
- A **patient safety incident** is any unintended or unexpected event that could have harmed or did harm a patient receiving healthcare.
- An **adverse event** is harm caused by healthcare rather than by the patient's underlying condition. It may or may not be preventable.
- An **error** is a failure to carry out a planned action as intended, or the use of a wrong plan. Not every error causes harm, and not every adverse event involves an error (some are known complications of correct treatment).
- A **near miss** is an incident that was caught before it reached the patient. A **no-harm incident** reached the patient but caused no harm.
- **Preventable harm** is harm that could have been avoided by reasonable adaptation to a process or adherence to guidelines.
:::

Near misses matter as much as harmful events, because they reveal the same weaknesses without the cost of harm. A system that hears about its near misses can fix problems before someone is hurt.

## How errors happen

The psychologist **James Reason** classified errors by the mental process that fails.

::: definition Types of unsafe act {#def-errors}
- **Slips** are actions that do not go as planned because of a failure of attention: picking up the wrong syringe, or selecting the wrong patient on a screen.
- **Lapses** are failures of memory: forgetting to give a dose, or forgetting to check a result.
- **Mistakes** are failures of planning: the action goes as intended, but the plan was wrong. **Rule-based mistakes** apply a good rule in the wrong situation, or a bad rule; **knowledge-based mistakes** occur when facing a new problem without the knowledge to solve it.
- **Violations** are deliberate deviations from rules or procedures. Most are not malicious: **routine violations** become normal because the rule is impractical ("everyone skips that check when the ward is busy"), and **situational violations** happen because the circumstances make compliance difficult.
:::

The type of error determines the remedy. Slips and lapses happen to experts and are not prevented by training or exhortation ("be more careful"); they are reduced by design: forcing functions, standardisation, checklists and reminders. Mistakes are reduced by training, decision support and supervision. Violations are reduced by finding out why the rule is being broken and fixing the rule or the conditions.

### The systems view

::: theorem The Swiss cheese model {#thm-swiss}
In Reason's **Swiss cheese model**, an organisation's defences against harm (policies, checks, equipment, staff training, supervision) are drawn as slices of cheese. Each slice has holes, which are weaknesses. Some are **active failures**: unsafe acts by people at the sharp end, whose effects are immediate. Others are **latent conditions**: weaknesses created by decisions made earlier and higher up (staffing, design, procurement, rotas, training) that may lie dormant for years. Harm occurs when the holes in many layers line up, so that a hazard passes through every defence.
:::

::: proof Why multiple layers protect, and why they fail together {#prf-swiss}
If a hazard had to pass $n$ independent defences, each failing with probability $p$, the probability of harm would be $p^n$, which falls rapidly as layers are added: three defences each failing one time in ten would allow harm only once in a thousand times. This is why layered defences work. The model also explains why they fail: the holes are **not independent**. A latent condition such as understaffing widens holes in several layers at once: the prescriber is rushed, the pharmacist is covering two wards, the nurse doing the second check is interrupted. When layers fail together, the protection is far less than the independent calculation suggests. Safety work therefore looks for latent conditions, not just for the last person to touch the patient.
:::

::: widget plot
f: p^x
x: 1, 6
y: 0, 1
sliders: p=0.1:0.01:0.6:0.01
labels: \text{chance a hazard passes every layer, } p^n
caption: Probability that a hazard passes $n$ independent defensive layers, each failing with probability $p$. A simplified model: in practice latent conditions make failures correlated, so real protection is weaker.
:::

::: definition Human factors {#def-human}
**Human factors** (or ergonomics) is the scientific study of how people interact with their tasks, equipment, environment and organisation, applied to design systems that fit human capabilities and limitations. It recognises that performance is affected by **fatigue**, **workload**, **interruptions**, **stress**, **communication** and **design** (of equipment, software, packaging and the workspace), and that "human error" is usually the starting point of an investigation, not its conclusion.
:::

The case that brought human factors to wide attention in UK healthcare was the death of **Elaine Bromiley** in 2005. During a routine operation, the anaesthetic team could not intubate or ventilate her. Experienced clinicians fixed on repeated attempts at intubation and lost track of time; nurses who had brought the equipment for an emergency surgical airway did not feel able to say so forcefully. Her husband, **Martin Bromiley**, an airline pilot, asked for the kind of open, non-blaming investigation used in aviation, and founded the Clinical Human Factors Group in 2007. The case is now used to teach situational awareness, fixation error and speaking up.

### Stronger and weaker interventions

Not all safety measures are equally effective. A common **hierarchy of controls** ranks them:

1. **Elimination and forcing functions** (strongest): designing the error out. Examples: intravenous and spinal (intrathecal) connectors that physically cannot be connected to each other; removal of concentrated potassium chloride from general ward stock.
2. **Automation and computerisation**: electronic prescribing with dose checks and allergy alerts; barcode scanning at administration.
3. **Standardisation and simplification**: one type of infusion pump across a hospital; standard drug concentrations; standard ward layouts.
4. **Checklists and reminders**: such as the WHO Surgical Safety Checklist.
5. **Rules, policies and training** (weakest on their own): necessary but dependent on memory and attention, the very things that fail.

Responses to incidents that consist only of "staff reminded to be vigilant" or "re-training" rarely prevent recurrence.

## Common types of harm

- **Medication errors**: at prescribing, dispensing, administration and monitoring. High-risk medicines include anticoagulants, insulin, opioids, chemotherapy, potassium and other concentrated electrolytes. WHO's third Global Patient Safety Challenge, *Medication Without Harm* (2017), aimed to reduce severe avoidable medication-related harm.
- **Healthcare-associated infection**: catheter-associated urinary infection, central-line bloodstream infection, surgical site infection, *Clostridioides difficile* and pneumonia. Hand hygiene at the WHO's **five moments** (before touching a patient, before a clean or aseptic procedure, after a body-fluid exposure risk, after touching a patient, and after touching a patient's surroundings) remains fundamental.
- **Failure to recognise and respond to deterioration**: missed or misinterpreted observations and delayed escalation; early warning scores such as NEWS2 and rapid-response teams address this ([[clinical-skills/physical-examination#def-news2]]).
- **Venous thromboembolism**: reduced by risk assessment on admission and appropriate prophylaxis.
- **Falls** and **pressure ulcers**, especially in frail older people.
- **Diagnostic error**: missed, wrong or delayed diagnoses, including failure to act on test results ([[clinical-skills/clinical-reasoning#def-bias]]).
- **Surgical harm**: wrong-site surgery, retained foreign objects and avoidable complications.

::: definition Never Events {#def-never}
In England, **Never Events** are serious incidents that are wholly preventable because guidance or safety recommendations providing strong systemic protective barriers are available at a national level and should have been implemented by all providers. NHS England's Never Events framework (2018) lists them; examples include wrong-site surgery, a retained foreign object after a procedure, wrong-route administration of medication (such as intravenous medicines given by the spinal route), misplaced nasogastric or orogastric tubes not detected before use, overdose of insulin due to abbreviations or an incorrect device, and transfusion of ABO-incompatible blood components. The defining feature is that the barrier exists; its absence is a system failure. After a 2024 consultation in which many respondents judged the framework unfit for purpose, NHS England announced in 2025 that it would develop a new approach aligned with PSIRF; as of 2026 the 2018 framework remains in use while that work continues.
:::

::: example Analysing an insulin overdose {#ex-insulin}
Mr Okoro, 66, with type 2 diabetes, was prescribed "insulin 10U" on a paper chart at 23:00 by a junior doctor covering four wards. A nurse, working alone on a night shift with an agency colleague, read the dose as 100 units and drew it up using a standard 1 mL syringe rather than an insulin syringe. A second check was not done because the other nurse was with a deteriorating patient. Mr Okoro became severely hypoglycaemic and needed emergency treatment. Use the Swiss cheese model to identify active failures and latent conditions, and suggest strong interventions.

::: solution
**Active failures** (at the sharp end): writing "U" for units; misreading the dose; using a non-insulin syringe; giving insulin without a second check.

**Latent conditions**: paper prescribing without dose-range checks; standard syringes available where insulin is prepared; staffing and workload that made a second check unavailable; night cover of four wards by one doctor; insufficient training or induction for staff unfamiliar with local policies.

**Stronger interventions**: electronic prescribing that requires "units" written in full and flags unusually large doses (automation); insulin syringes or pens only, with standard syringes removed from insulin preparation areas (forcing function and standardisation); staffing and escalation arrangements that make double-checking of high-risk drugs feasible; and blood glucose monitoring after insulin. "Remind staff not to abbreviate units" alone is a weak response. This incident is a Never Event, and the patient and family must be told what happened under the duty of candour.
:::
:::

## Checklists

A checklist is a short, structured list of critical steps that are easy to omit, read aloud and confirmed at defined points. It does not replace expertise; it protects experts from lapses under pressure.

The **WHO Surgical Safety Checklist**, launched in 2008, has three parts: **sign in** (before induction of anaesthesia: identity, site, procedure and consent confirmed, site marked, anaesthetic safety check, known allergies, airway and aspiration risk, risk of blood loss), **time out** (before skin incision: team members introduce themselves, confirm patient, site and procedure, anticipate critical events, confirm antibiotic prophylaxis and essential imaging) and **sign out** (before the patient leaves the theatre: instrument, swab and needle counts, specimen labelling, equipment problems, and key concerns for recovery).

In a study published in 2009, **Alex Haynes** and colleagues introduced the checklist in eight hospitals in eight cities around the world. The in-hospital death rate fell from 1.5% to 0.8% and the rate of complications from 11.0% to 7.0%. The study was a before-and-after comparison, not a randomised trial, so part of the effect may reflect other changes and the attention of being studied; later evaluations have shown that the benefit depends on how genuinely the checklist is used. A checklist completed as a box-ticking exercise, without the conversation it is meant to prompt, gives little protection.

::: example A time-out that worked {#ex-timeout}
During the time-out before a left knee arthroscopy, the scrub nurse reads the consent form aloud. It says "right knee". The surgeon, who had marked the left knee on the ward after speaking to the patient, is certain that the left knee is correct and says, "It's a typo; let's get on." What should happen, and what does this near miss reveal?

::: solution
The procedure must stop until the discrepancy is resolved. The time-out has done exactly what it is for: it has revealed that two sources of truth disagree. The patient is now anaesthetised and cannot be asked, and the written consent names the other side, so one person's certainty is not enough. The team should check independent sources (the clinic letters, the imaging, the operating list and the site mark) to understand the error. Operating on a side that differs from the signed consent risks operating without valid consent, so if any doubt remains about what the patient agreed to, the operation should be postponed until the patient can confirm and the consent is corrected, following local policy. The patient must be told about the discrepancy.

This is a **near miss** and should be reported. It reveals latent conditions: the consent form was completed with an error and not checked against the listing; the sign-in before induction, when the patient could still have been asked, did not pick up the mismatch; and the surgeon's certainty almost overrode the check (an authority gradient). The learning response might look at how consent forms are completed and verified and reinforce that anyone can stop a procedure at the time-out.
:::
:::

## Learning from incidents

::: definition Incident reporting and learning systems {#def-reporting}
An **incident reporting system** lets staff record patient safety incidents and near misses so that patterns can be identified and acted upon. In England, local reports feed the national **Learn from Patient Safety Events (LFPSE)** service, which fully replaced the National Reporting and Learning System in 2024. Since 2022 the **Patient Safety Incident Response Framework (PSIRF)** has replaced the previous Serious Incident Framework, shifting the emphasis from investigating individual incidents against fixed thresholds towards proportionate, systems-based learning responses chosen by each organisation, and the involvement of patients, families and staff.
:::

A high reporting rate usually indicates a healthy safety culture rather than unsafe care: staff report when they trust that reports lead to learning and not to punishment. A unit that reports no incidents is more worrying than one that reports many minor ones.

Investigations use tools such as **timelines**, **fishbone (cause-and-effect) diagrams** and structured frameworks that look at the task, the team, the environment, equipment and the organisation, rather than stopping at the person who made the final error.

### A just culture

::: definition Just culture {#def-just}
A **just culture** is one in which people are not blamed for honest errors or for system failures beyond their control, and are encouraged to report them, while **reckless behaviour** (a conscious disregard of a substantial and unjustifiable risk) and deliberate harm are not tolerated. The NHS **Just Culture Guide** (2018) asks a series of questions about an individual's actions: was there intent to harm, was the person impaired by illness or substances, did they depart from agreed procedures, would other similarly trained people have done the same in the same circumstances (the **substitution test**), and were there mitigating circumstances?
:::

A just culture is not a "no-blame" culture. It distinguishes between **human error** (which calls for support and system change), **at-risk behaviour** (drift into unsafe habits, which calls for coaching and removing the incentives for shortcuts) and **reckless behaviour** (which may call for disciplinary action).

### Being open with patients

When something goes wrong, patients and families want to know what happened, an apology, and reassurance that it will not happen to others.

::: definition The duty of candour {#def-candour}
Every healthcare professional in the UK has a **professional duty of candour**: to be open and honest with patients when something has gone wrong with their care that has caused, or could cause, harm or distress; to apologise; to offer an appropriate remedy or support; and to explain fully the short- and long-term effects. In England, care providers registered with the Care Quality Commission also have a **statutory duty of candour** (Regulation 20 of the Health and Social Care Act 2008 (Regulated Activities) Regulations 2014), which requires them, after a notifiable safety incident, to tell the person, provide support, give an account of the facts, offer an apology, and follow this up in writing. An apology is not an admission of legal liability.
:::

::: example Telling a patient about an error {#ex-candour}
Mrs Williams, 59, received a dose of enoxaparin intended for the patient in the next bed. She was already on apixaban. She has no signs of bleeding. How should the team respond?

::: solution
1. **Make the patient safe**: assess for bleeding; check full blood count and coagulation as needed; seek haematology or pharmacy advice on monitoring; withhold the next apixaban dose if advised.
2. **Tell her promptly**, in person, ideally with a senior clinician: explain what happened in plain language, apologise sincerely ("I am very sorry; you were given an injection that was meant for someone else"), explain the possible effects and what will be done to monitor her, and answer questions.
3. **Report** the incident on the local system, which will feed LFPSE.
4. **Follow up**: under the statutory duty, confirm the conversation in writing, including the apology and what the investigation or learning response will involve, and share the findings with her.
5. **Learn**: look at the system, not just the nurse: patient identification at administration (were wristbands checked, is barcode scanning used?), workload, and storage of patients' medicines. Support the staff involved, who are often distressed ("second victims").
:::
:::

## Quality improvement

Quality improvement (QI) is the systematic use of methods to make care safer, more effective, more patient-centred, timely, efficient and equitable.

::: definition The Model for Improvement and PDSA cycles {#def-pdsa}
The **Model for Improvement**, developed by Langley and colleagues and promoted by the Institute for Healthcare Improvement, asks three questions:

1. What are we trying to accomplish? (A specific, measurable aim.)
2. How will we know that a change is an improvement? (Measures.)
3. What changes can we make that will result in improvement? (Change ideas.)

Changes are tested in small, rapid **Plan–Do–Study–Act (PDSA)** cycles: plan a test, do it on a small scale, study the results against a prediction, and act by adopting, adapting or abandoning the change. Measures are of three kinds: **outcome measures** (the result for patients), **process measures** (whether the steps are being done) and **balancing measures** (unintended effects elsewhere).
:::

Improvement data are usually displayed over time on a **run chart** or a **statistical process control chart**, because a before-and-after comparison of two numbers cannot distinguish a real change from ordinary variation. A common run-chart rule is that **six or more consecutive points all above or all below the median** indicate a non-random **shift**.

::: example Improving VTE risk assessment {#ex-pdsa}
On an admissions unit, only 62% of patients have a venous thromboembolism risk assessment documented within 14 hours of admission. Design an improvement project.

::: solution
**Aim**: 95% of admitted patients have a documented VTE risk assessment within 14 hours of admission within six months.

**Measures**: process (weekly percentage of patients assessed within 14 hours, plotted on a run chart); outcome (hospital-associated VTE, tracked over a longer period); balancing (time taken for clerking; inappropriate prophylaxis in patients at high bleeding risk).

**Change ideas and PDSA cycles**:
- Cycle 1: make the VTE assessment a mandatory field in the electronic clerking template on one shift for one week; study completion and doctors' feedback; adapt.
- Cycle 2: add a check of VTE assessment to the post-take ward-round checklist; test with one consultant team.
- Cycle 3: a daily visual display of patients without an assessment for the nurse in charge.

**Study**: plot the weekly data on a run chart and look for a shift (six consecutive points above the baseline median). Spread changes that work; abandon those that don't. Involve the people doing the work in designing the changes.
:::
:::

### Safety-I and Safety-II

Traditional safety thinking (sometimes called **Safety-I**) defines safety as the absence of harm and learns mainly from things that go wrong. **Safety-II**, a term introduced by Erik Hollnagel, adds the study of why things usually go right: how staff adapt to varying demands, staffing and equipment to keep patients safe. Learning from everyday work, including what makes a good day, complements learning from incidents.

::: warning "Be more careful" is not a safety intervention
After an incident, it is tempting to conclude that the person involved should have tried harder and to issue a reminder. This rarely works, because slips and lapses happen to careful, competent people, and it discourages reporting. Ask instead: what made the error possible, and what would make it hard to repeat? Look for latent conditions and choose the strongest feasible control. Individual accountability still matters for reckless behaviour, but that is uncommon.
:::

::: quiz
A nurse gives a patient's 08:00 antibiotic at 11:00 because the ward's only drug trolley key was with another nurse who was escorting a patient to radiology. What is the best classification and response?
- [ ] A violation; the nurse should be disciplined.
- [ ] A knowledge-based mistake; the nurse needs re-training.
- [x] A delay caused largely by a latent condition; the system for access to medicines should be fixed.
- [ ] Not an incident, because no harm occurred.
::: solution
The nurse acted reasonably; the delay arose from a latent condition (one key, no backup, no process when the key holder leaves the ward). It should still be reported as an incident, because delayed antibiotics can cause harm and the same weakness will recur. The fix is in the system: a key or access system that does not depend on one person.
:::
:::

::: history
In 1847 **Ignaz Semmelweis**, in Vienna, showed that deaths from puerperal fever fell sharply when doctors washed their hands in chlorinated lime before examining women in labour; his colleagues largely rejected the finding. **Florence Nightingale** used mortality statistics from the Crimean War to argue for sanitary reform in the 1850s, and **Ernest Codman** in Boston campaigned in the 1910s for hospitals to publish the outcomes of every patient. The modern patient-safety movement began with the **Harvard Medical Practice Study** (1991), **James Reason**'s *Human Error* (1990) and the Institute of Medicine's *To Err Is Human* (1999). The WHO launched its World Alliance for Patient Safety in 2004 and the Surgical Safety Checklist in 2008. In the UK, inquiries such as the **Francis Report** (2013) into failings at Mid Staffordshire NHS Foundation Trust led to the statutory duty of candour.
:::

## Where this leads

Patient safety links every chapter of this course: communication ([[clinical-skills/communication]]), diagnostic reasoning ([[clinical-skills/clinical-reasoning]]), test results ([[clinical-skills/laboratory-tests]]), and records and handover ([[clinical-skills/records-handover]]). Medication safety is developed in [[pharmacology/adverse-reactions]], surgical safety in [[surgery/perioperative-care]], and professional regulation in [[medical-ethics-law/professionalism-regulation]].

::: summary
- Harm from healthcare is common (around one in ten patients, by WHO estimates) and much of it is preventable.
- Distinguish incidents, adverse events, errors, near misses and preventable harm; report near misses.
- Errors are slips, lapses, mistakes or violations; each needs a different remedy, and slips and lapses are reduced by design, not exhortation.
- The Swiss cheese model distinguishes active failures from latent conditions; harm occurs when weaknesses in several defences line up.
- Prefer strong controls (forcing functions, automation, standardisation) to weak ones (reminders, training alone).
- Checklists such as the WHO Surgical Safety Checklist work when they prompt genuine team conversation.
- In England, incidents are reported through LFPSE and responded to under PSIRF; a just culture separates human error from reckless behaviour.
- Professionals and providers have a duty of candour: tell the patient, apologise, support and follow up.
- Improve with the Model for Improvement, small PDSA cycles, outcome, process and balancing measures, and run charts.
:::

## Exercises

::: exercise Classify the error {level=1}
Classify each as a slip, lapse, rule-based mistake, knowledge-based mistake or violation: (a) a doctor intends to prescribe for Mr Smith but selects Mr Smyth on the screen; (b) a nurse forgets to give a 14:00 dose after being called away; (c) a doctor prescribes a usual adult dose of a drug that needs reduction in kidney failure, not knowing this; (d) staff routinely skip the second check for controlled drugs at night because there is only one registered nurse.
::: solution
(a) Slip (attention failure in a planned action). (b) Lapse (memory failure). (c) Knowledge-based mistake (the plan was wrong for lack of knowledge); decision support with kidney-function dose checks would help. (d) A routine (situational) violation driven by a latent condition: the staffing makes the rule impossible to follow. The response is to change the staffing or the procedure, not just to repeat the rule.
:::
:::

::: exercise Layers of defence {level=1 check="0.1^3"}
A hazard must pass three independent defences, each of which fails 10% of the time. What is the probability that it passes all three? Give the exact value.
::: solution
$0.1^3 = 0.001$, one in a thousand. If a common latent condition (for example understaffing) makes the failures correlated, the true probability can be much higher.
:::
:::

::: exercise The checklist in numbers {level=2 check="round(1/(0.015-0.008))"}
In the 2009 checklist study, the in-hospital death rate fell from 1.5% to 0.8%. If this difference were entirely due to the checklist, how many operations would need to use the checklist to prevent one death? Round to the nearest whole number.
::: solution
Absolute risk reduction $= 0.015 - 0.008 = 0.007$. $1/0.007 = 142.9$, which rounds to **143** operations. The relative reduction is $0.007/0.015 \approx 47\%$. Because the study was a before-and-after comparison, the true causal effect is uncertain and may be smaller.
:::
:::

::: exercise Strong or weak {level=2}
Rank these responses to a wrong-route medication incident from strongest to weakest and justify: (a) an email reminding staff about the policy; (b) introducing connectors for spinal devices that cannot fit intravenous lines; (c) a double-check procedure before administration; (d) a mandatory e-learning module.
::: solution
Strongest: (b), a forcing function that makes the error physically impossible. Next: (c), a check that adds a layer of defence but depends on attention and staffing. Weaker: (d), training, which may change knowledge but not the slips that cause most wrong-route errors. Weakest: (a), a reminder, which is quickly forgotten. In practice several are combined, but the forcing function should come first where it exists.
:::
:::

::: exercise A run chart {level=2}
A ward's weekly percentage of patients with documented falls risk assessment over 12 weeks is: 60, 58, 64, 61, 59, 63, 70, 74, 72, 77, 75, 79. A new admission checklist was introduced at the start of week 7. The baseline median (weeks 1–6) is 60.5. Is there evidence of a shift?
::: solution
From week 7 onwards there are six consecutive points (70, 74, 72, 77, 75, 79) all above the baseline median of 60.5. By the common run-chart rule (six or more consecutive points on one side of the median), this is a **shift**, suggesting a non-random improvement coinciding with the checklist. Continue measuring to see whether it is sustained, and check a balancing measure (for example time spent on admission paperwork).
:::
:::

::: exercise Just culture {level=2}
Using the substitution test, discuss each case: (a) a pharmacist, working alone covering three wards, misses an interaction between two drugs during a period of very high workload; (b) a doctor repeatedly ignores the hospital's requirement to see patients before discharge, despite warnings, and a patient is harmed.
::: solution
(a) Would other similarly trained pharmacists, in the same circumstances, have made the same error? Quite possibly: workload and coverage are latent conditions. This is human error in a system that made it likely; the response is support for the pharmacist and system change (staffing, interaction alerts). (b) Repeated, knowing departure from an important safety rule, despite warnings, suggests at-risk or possibly reckless behaviour. The substitution test would likely show that most peers would not act this way. The response may include performance management, while still asking whether anything in the system encouraged the behaviour.
:::
:::

::: exercise Design a learning response {level=3}
On a surgical ward, three patients in two months developed severe hyponatraemia after receiving large volumes of hypotonic intravenous fluid post-operatively. Under PSIRF, outline a proportionate learning response, including the people to involve and the system factors to examine.
::: solution
Recognise the pattern as a theme rather than three separate incidents, and choose a systems-based learning response (for example a thematic review or after-action reviews informing an improvement plan). Involve the patients or families (and offer duty-of-candour conversations), ward nurses, junior doctors and anaesthetists who prescribe fluids, pharmacists, and the fluids lead. Examine: the fluids stocked on the ward and the default choices in electronic prescribing (are hypotonic fluids the easy option?); local fluid guidelines and their match with national guidance; monitoring of sodium and fluid balance after surgery; training and induction for rotating staff; out-of-hours prescribing; and handover of fluid plans. Possible strong actions: restricting stock of hypotonic fluids, prescribing defaults aligned with guidance, and automatic sodium monitoring prompts. Measure effect with a process measure (sodium checked within 24 hours) and an outcome measure (post-operative hyponatraemia rate).
:::
:::

::: exercise A missed result {level=3}
A CT report showing a probable lung cancer was sent to a junior doctor who had rotated to another hospital. The patient was not told for five months. Analyse the latent conditions and propose system changes, explaining why each is stronger than "doctors must check their results".
::: solution
Latent conditions: results routed to an individual rather than to a team or consultant; no reassignment of results when doctors rotate; no system requirement to acknowledge reports; no alert for critical or significant findings; discharge summaries that did not list pending tests; and a reliance on memory across a rotation boundary. System changes: route results to the responsible consultant and team inbox; require electronic acknowledgement with escalation of unacknowledged significant results after a set time; radiology alert pathways for suspected cancer that notify a designated team (for example a lung cancer fast-track coordinator) directly; automatic reassignment of results at rotation; and listing pending results in discharge summaries with a named owner. Each change works even when an individual is busy, absent or forgets, which is exactly the situation in which the original error occurred. The patient must be told promptly and offered an apology under the duty of candour.
:::
:::
