A new medicine reaches a patient at the end of a long process. Typically more than ten years separate the first identification of a target from a licensed product, and most candidate drugs that enter human trials never reach the market. Along the way, the medicine's benefit and harm are measured in laboratory systems, in animals, in healthy volunteers and in patients; regulators decide whether it can be sold; health technology bodies decide whether it is worth paying for; and, finally, a prescriber decides whether it is right for one particular person.

This chapter follows that path. It describes drug discovery and preclinical testing, the phases of clinical trials, licensing and post-marketing surveillance, and the appraisal of cost-effectiveness. It then turns to the prescriber's part: choosing a medicine rationally, writing a safe prescription, recognising common errors, and the stewardship of antimicrobials and opioids. Earlier chapters described how drugs act and how they cause harm; this one describes how the evidence about them is gathered and used.

## From target to candidate {#sec-discovery}

::: definition Drug discovery and preclinical development {#def-discovery}
**Drug discovery** is the identification of a molecule likely to change a disease process safely. It usually proceeds through:

1. **target identification and validation**: choosing a receptor, enzyme, transporter or other molecule whose modification should help, with evidence from biology, genetics or existing drugs;
2. **hit finding**: screening large libraries of compounds, designing molecules from the target's structure, or, for **biological medicines** such as monoclonal antibodies, generating proteins that bind the target;
3. **lead optimisation**: modifying chemical structure to improve potency, selectivity and pharmacokinetic properties, and to remove toxicity.

**Preclinical development** tests the candidate before it is given to humans: pharmacology in cells and animals, pharmacokinetics, safety pharmacology (effects on heart rhythm, breathing and the nervous system), general toxicology after repeated doses in at least two species, genotoxicity, and, at the appropriate stage, reproductive toxicity and carcinogenicity. These studies identify target organs of toxicity and doses without adverse effects, which are used to choose a safe starting dose in humans.
:::

Animal studies predict many human toxicities but not all, because species differ in receptors, metabolism and immune function. This limitation was shown starkly in 2006, when six healthy volunteers in London received the first human doses of TGN1412, a monoclonal antibody designed to stimulate a subset of T cells. Within hours all six developed a severe cytokine release syndrome with multi-organ failure. The starting dose had been calculated from animal toxicology in the usual way, but the antibody acted much more powerfully on human cells. The review that followed recommended that, for high-risk agents, first-in-human doses should be based on the **minimal anticipated biological effect level** (MABEL), that volunteers should be dosed one at a time with an interval between them, and that such trials should take place where intensive care is available.

## Clinical trials {#sec-trials}

::: definition Phases of clinical development {#def-phases}
- **Phase I**: first use in humans, usually in small numbers (tens) of healthy volunteers, or in patients for toxic drugs such as anticancer agents. Aims: safety, tolerability, pharmacokinetics and an appropriate dose range, with single then multiple ascending doses.
- **Phase II**: tens to a few hundred patients with the target condition. Aims: evidence of activity, dose–response, and further safety data, to decide whether a large trial is justified.
- **Phase III**: hundreds to thousands of patients in randomised controlled trials, comparing the drug with placebo or standard treatment on clinically important outcomes. Phase III results usually form the main evidence for a licence.
- **Phase IV**: studies after marketing, including surveillance for rare and long-term adverse effects, studies in groups excluded from trials, and comparisons with other treatments.

Some programmes also include an exploratory **phase 0** (microdosing) study, giving tiny, non-therapeutic doses to study pharmacokinetics early.
:::

The design features that make trials trustworthy are covered in [[epidemiology-ebm/randomised-trials]]. In brief: **randomisation** distributes known and unknown prognostic factors evenly between groups; **allocation concealment** and **blinding** prevent the expectations of participants and investigators from influencing results; a pre-specified **primary outcome** limits selective reporting; and analysis by **intention to treat** preserves the benefits of randomisation. Trials may test whether a drug is better than a comparator (**superiority**) or whether it is not worse by more than a pre-specified margin (**non-inferiority**), which is used when a new drug offers other advantages such as fewer side effects or simpler dosing.

The ethics of research involving people, including consent, independent ethical review and the Declaration of Helsinki, are covered in [[medical-ethics-law/research-ethics]]. Trials must be registered before they start and their results reported whether positive or negative; unpublished negative trials bias the evidence that prescribers rely on.

Trial size governs what a trial can detect. A trial too small to detect a clinically important difference is unlikely to be informative, and a trial cannot rule out rare adverse effects at all. The figure illustrates power.

::: widget hypothesis
test: z
tail: two
alpha: 0.05
effect: 0.3
n: 50
caption: Sampling distributions under the null hypothesis (no difference) and the alternative (a true standardised effect of 0.3). Increase $n$ and watch the power, the probability of detecting the effect, rise. Halve the effect size and see how many more participants are needed for the same power. Trials of drugs with small effects on hard outcomes, such as cardiovascular events, therefore need thousands of participants.
:::

### Reading a trial result

Trial results are often reported as relative effects, which sound larger than absolute effects. Both matter, and the absolute difference is what a prescriber and patient need to make a decision.

::: example Relative and absolute benefit {#ex-formulary-read}
A three-year trial in people with a high cardiovascular risk compares a new lipid-lowering drug with placebo, both added to a statin. The primary outcome (cardiovascular death, myocardial infarction or stroke) occurs in 10% of the placebo group and 8% of the new-drug group. Calculate the relative risk reduction, absolute risk reduction and number needed to treat, and explain what else would be needed before adding the drug to a local formulary.
::: solution
- Relative risk $= 0.08/0.10 = 0.8$, so the **relative risk reduction** is 20%.
- **Absolute risk reduction** $= 10\% - 8\% = 2\%$ over three years.
- **Number needed to treat** $= 1/0.02 = 50$: fifty people must take the drug for three years to prevent one event.

A formulary committee would also ask: Was the trial well conducted (randomisation, blinding, follow-up, intention-to-treat analysis)? Was the outcome clinically important, and were the patients similar to local patients? What adverse effects occurred, and what is the number needed to harm? What are the alternatives and how does the drug compare with them? What does it cost, and has NICE appraised it? The answer to "does it work?" is only the first of these questions ([[epidemiology-ebm/critical-appraisal]]).
:::
:::

## Licensing, regulation and surveillance {#sec-licensing}

::: definition Marketing authorisation, appraisal and pharmacovigilance {#def-licensing}
A **marketing authorisation** (licence) permits a company to sell a medicine for specified indications, doses, routes and populations, set out in the **summary of product characteristics** (SmPC). It is granted by a regulator after assessing quality, safety and efficacy: in the UK the **Medicines and Healthcare products Regulatory Agency** (MHRA); in the EU the European Medicines Agency with the European Commission; in the US the Food and Drug Administration. Regulators can grant **conditional** authorisations on less complete evidence for serious conditions with unmet need, with obligations to provide further data.

A licence says a medicine may be sold, not that the NHS should pay for it. In England, **NICE technology appraisals** assess clinical and cost-effectiveness. NHS bodies must fund medicines recommended in a technology appraisal, usually within three months.

**Post-marketing surveillance** continues throughout a medicine's life: spontaneous reporting (the Yellow Card scheme), the black triangle (▼) for intensive monitoring of new medicines, periodic safety reports from manufacturers, and pharmacoepidemiological studies. Regulators can change the SmPC, add warnings, restrict use or withdraw a licence ([[pharmacology/adverse-reactions]]).
:::

Cost-effectiveness is measured in **quality-adjusted life years** (QALYs), which combine length of life with its quality (one QALY is a year in full health). The **incremental cost-effectiveness ratio** (ICER) is the extra cost of a new treatment divided by the extra QALYs it produces compared with the current one:

$$
\text{ICER} = \frac{\text{Cost}_{\text{new}} - \text{Cost}_{\text{current}}}{\text{QALYs}_{\text{new}} - \text{QALYs}_{\text{current}}}.
$$ {#eq-icer}

NICE compares the ICER with a threshold range. For many years this was £20,000 to £30,000 per QALY. Following a government decision announced in December 2025, the standard range for technology appraisals became £25,000 to £35,000 per QALY from April 2026; different arrangements apply to highly specialised technologies, and a severity modifier can give greater weight to QALYs for the most severe conditions. These figures are policy choices and may change again, so current NICE methods should be checked. The underlying logic is that money spent on one treatment is not available for others: the threshold represents an estimate of the health that would otherwise be produced ([[public-health/health-systems-economics]]).

::: example Is it cost-effective? {#ex-icer}
A new treatment for a chronic lung disease costs £30,000 more per patient over a lifetime than current care, and produces an average gain of 1.2 QALYs. Calculate the ICER and comment on it against the NICE threshold range in use from April 2026.
::: solution
From [[#eq-icer]]: $\text{ICER} = 30{,}000/1.2 = £25{,}000$ per QALY.

This lies at the lower end of the £25,000 to £35,000 range, so it would be likely to be considered a cost-effective use of NHS resources, provided the committee accepts the evidence and the assumptions of the economic model (for example how long the benefit lasts beyond the trial). Under the previous £20,000 to £30,000 range it would also have fallen within the range but nearer the point where committees need stronger justification. Uncertainty in the model, the severity of the disease and any innovation not captured in the QALY are also weighed.
:::
:::

### Licensed, off-label and unlicensed use

Medicines may be prescribed in three ways:

- **licensed use**: within the terms of the marketing authorisation;
- **off-label use**: a licensed medicine used outside those terms, such as for another indication, age group, dose or route. This is common, especially in children, in palliative care and in psychiatry: amitriptyline for neuropathic pain, for example, or many medicines in children under the licensed age;
- **unlicensed medicines**: products with no UK marketing authorisation, such as imported products or specially manufactured preparations.

Prescribing outside the licence is lawful and often good practice, but it shifts more responsibility to the prescriber. UK professional guidance (from the General Medical Council and others) asks prescribers to be satisfied that there is sufficient evidence of safety and efficacy, to take responsibility for prescribing and monitoring, to record the reason, and to explain to the patient (or parent or carer) that the use is outside the licence where this is relevant to their decision.

::: example A first-in-human dose {#ex-phase1-vol}
A company plans the first human study of a monoclonal antibody that activates an immune receptor. In monkeys, no adverse effects were seen at 50 mg/kg. Laboratory studies with human cells show that receptor occupancy of about 10% produces measurable cytokine release. Explain why a starting dose based mainly on the animal no-adverse-effect level could be unsafe, and outline the principles for designing the first-in-human study.
::: solution
The animal no-adverse-effect level reflects the drug's action on the animal's receptors and immune system. If the antibody binds the human receptor with higher affinity, or human cells respond more strongly, a dose that is safe in monkeys could produce a large, rapid effect in humans. For agonists of immune receptors, the main risk comes from the intended pharmacology itself, amplified, rather than from off-target toxicity.

Principles drawn from the TGN1412 review:

- base the starting dose on the **minimal anticipated biological effect level** (MABEL), using human in-vitro data on binding, occupancy and response, and take the lower of the MABEL-based and toxicology-based estimates;
- give the first dose to one participant, with an observation interval before the next, and escalate doses cautiously;
- use slow intravenous infusion so that it can be stopped;
- conduct the study in a unit with immediate access to intensive care, with a plan for managing cytokine release.

The participants' informed consent must describe the uncertainty honestly, and independent ethical and regulatory review assesses the design ([[medical-ethics-law/research-ethics]]).
:::
:::

## Rational and safe prescribing {#sec-prescribing}

Prescribing is one of the commonest and most consequential things doctors do. The WHO *Guide to Good Prescribing* (1994) set out a process that remains useful:

1. define the patient's problem;
2. specify the therapeutic objective;
3. choose a treatment, considering non-drug options and, among drugs, efficacy, safety, suitability for this patient and cost (the guide calls a well-understood first-choice drug the prescriber's "P-drug");
4. write the prescription;
5. give information, instructions and warnings;
6. monitor and, when needed, stop the treatment.

::: definition Formularies, guidelines and shared decisions {#def-formulary}
A **formulary** is a list of medicines approved for use in an organisation or area, with guidance on preferred choices. It is based on evidence, safety and cost and makes prescribing more consistent. The **British National Formulary** (BNF) and **BNF for Children** are national references for indications, doses, cautions, interactions and monitoring, while **clinical guidelines** (NICE, specialist societies, local antimicrobial guidance) recommend treatments for particular conditions.

Guidelines describe what usually works best for groups. **Shared decision-making** applies that evidence to the individual: discussing the options, including no treatment, their benefits and harms in absolute terms, and what matters most to the person. A decision not to follow a guideline can be correct if the reasons are considered and recorded.
:::

### Writing a safe prescription

A prescription, whether written or electronic, must make the intended treatment unambiguous. Its essential elements are: the patient's identity (name, date of birth, hospital or NHS number) and, in hospital, weight and allergy status, with the nature of any reaction; the **approved (generic) drug name**, except where the brand matters (as for some modified-release preparations, ciclosporin, lithium and some antiepileptics); the dose, using units without unnecessary decimal points; the route; the frequency and timing; the duration or review date where relevant; the indication; and the prescriber's signature and contact details.

Common causes of serious error include:

- **"units" abbreviated** to "U" or "IU", which can be misread as zero; insulin and heparin doses should always be written with "units" in full;
- **micrograms and milligrams** confused; "micrograms" should be written in full, and trailing zeros avoided (5 mg, not 5.0 mg) while leading zeros are used (0.5 mg, not .5 mg);
- **look-alike or sound-alike drug names**;
- **weekly drugs given daily**, such as methotrexate ([[pharmacology/dosing-principles]]);
- **opioid errors**: confusing immediate- and modified-release morphine or oxycodone, miscalculating conversions between opioids, or giving high-dose preparations to people not used to opioids;
- **omitted critical medicines**, such as Parkinson's medication, insulin and anticoagulants, on admission;
- **lack of allergy checks**, and interactions not recognised.

**Medicines reconciliation** compares the list of medicines a person was taking before admission with those prescribed in hospital, resolving differences; NICE recommends it within 24 hours of admission and at transfers of care. **Controlled drugs** are subject to additional legal requirements for prescribing, storage and recording under the Misuse of Drugs Regulations; for those in Schedules 2 and 3, the prescription must state the total quantity in both words and figures.

::: warning Starting is easy; stopping is part of prescribing
Many harmful prescriptions are not wrong when first written but become wrong over time: an antibiotic continued after cultures are negative, a proton pump inhibitor continued for years after a short course was intended, a benzodiazepine renewed repeatedly, an opioid continued after the pain has resolved. Every prescription needs a review date or stop date, an indication that can be checked, and a plan for monitoring. **Deprescribing**, the planned and supervised reduction or stopping of medicines whose harms now outweigh their benefits, is a skill in its own right ([[geriatrics-palliative/polypharmacy]]).
:::

::: example Spot the errors {#ex-prescription-review}
A foundation doctor writes the following hospital prescriptions for a 76-year-old woman (weight 52 kg, eGFR 28 mL/min/1.73 m²) admitted with a fall:

- "Insulin glargine 10U at night"
- "Morphine MR 30mg bd" (she has not previously taken opioids)
- "Methotrexate 7.5mg daily" (she takes it for rheumatoid arthritis)
- "Enoxaparin 40mg sc od" (for thromboprophylaxis)
- "Gentamicin" (no dose or indication).

Identify the problems and how each should be corrected.
::: solution
- **Insulin**: "U" can be misread as 0, turning 10 units into 100. Write "10 units" in full.
- **Morphine MR 30 mg twice daily** in an older, frail, opioid-naive woman with reduced kidney function is a dangerously high starting dose; morphine's active metabolite accumulates in kidney impairment. If an opioid is needed, a low dose of an immediate-release preparation would be titrated to effect, with the choice of opioid adjusted for kidney function and reviewed promptly.
- **Methotrexate daily** is a classic, potentially fatal error. It should be "once weekly", with the day of the week stated, and checked against her usual regimen during medicines reconciliation.
- **Enoxaparin**: with markedly reduced kidney function and low body weight, the dose for thromboprophylaxis may need adjustment according to the BNF and local guidance, using creatinine clearance; her risk of bleeding should also be assessed.
- **Gentamicin**: no dose, route, indication or plan. An aminoglycoside in a person with reduced kidney function needs a clear indication, a dose calculated according to the local protocol, and level monitoring, or an alternative agent.

Allergy status, the indication for each drug and review dates should also be recorded. Electronic prescribing systems prevent some of these errors but not all, and a pharmacist's review is a valuable second check ([[clinical-skills/patient-safety]]).
:::
:::

### Stewardship of antimicrobials and opioids

Some classes of medicine need stewardship because overuse harms not only the individual but also others.

**Antimicrobial stewardship** aims to preserve the effectiveness of antimicrobials by using them only when needed, choosing the narrowest effective agent, and stopping promptly. The UK's *Start Smart then Focus* approach asks prescribers in hospital to take cultures before starting antibiotics where possible, to start promptly in sepsis, to document the indication, drug, dose, route and a review date, and then, at 48 to 72 hours, to make a clear decision: stop, switch from intravenous to oral, change to a narrower agent based on results, continue, or refer to outpatient parenteral therapy ([[infectious-diseases/stewardship-outbreaks]], [[microbiology/antimicrobials]]).

**Opioid stewardship** responds to evidence that long-term opioids are of limited benefit for most chronic non-cancer pain and carry risks of dependence, overdose and other harms. Its principles are to set realistic goals with the person, use the lowest effective dose for the shortest time for acute pain, review regularly, avoid combinations with other sedatives, take care with high doses (the risk of harm rises substantially above an equivalent of 120 mg oral morphine per day, according to UK professional guidance), and support gradual tapering where harms outweigh benefits. People with cancer pain or at the end of life are not subject to the same restrictions; adequate pain relief remains essential ([[geriatrics-palliative/symptom-control]]).

::: quiz
A new drug for a rare condition receives a conditional marketing authorisation from the MHRA. Which statement is correct?
- [ ] The NHS in England must now fund it immediately
- [ ] It no longer needs post-marketing surveillance because it has been licensed
- [x] It may be sold for the authorised indication, carries obligations to provide further evidence, and is subject to intensive monitoring with the black triangle
- [ ] It can only be prescribed off-label
::: solution
A conditional authorisation allows marketing on less complete evidence where there is unmet need, with obligations to complete studies. Being new, it carries the black triangle for additional monitoring, so all suspected reactions should be reported. Licensing and funding are separate: NHS funding in England follows NICE appraisal or other commissioning decisions.
:::
:::

::: history
The modern framework of drug development was shaped by tragedies and by scientific advances. After the sulfanilamide elixir deaths in 1937 the US required evidence of safety before marketing, and after thalidomide the Kefauver–Harris amendments (1962) added a requirement for evidence of efficacy from adequate and well-controlled studies. In the UK the Committee on Safety of Drugs began work in 1964 and the Medicines Act 1968 created a licensing system; the MHRA was formed in 2003. The randomised controlled trial became the standard of evidence after the Medical Research Council's 1948 trial of streptomycin for tuberculosis, designed with the statistician Austin Bradford Hill. In 1964 the World Medical Association adopted the Declaration of Helsinki on research ethics. NICE was established in 1999 to appraise the clinical and cost-effectiveness of treatments for the NHS. The TGN1412 trial in 2006 transformed the design of first-in-human studies, and international requirements for trial registration grew from the mid-2000s, after evidence that negative results were often left unpublished.
:::

::: summary
- Drug discovery moves from target to lead to candidate; preclinical studies characterise pharmacology and toxicity to set a safe starting dose. For high-risk agents, first-in-human doses are based on MABEL.
- Phase I establishes safety and kinetics, phase II activity and dose, phase III efficacy against placebo or standard treatment, and phase IV long-term and rare effects.
- Absolute risk reduction and number needed to treat express benefit in terms relevant to decisions; relative reductions overstate it when baseline risk is low.
- Regulators license medicines; NICE appraises cost-effectiveness using the ICER, with a standard threshold range of £25,000 to £35,000 per QALY from April 2026.
- Off-label prescribing is lawful and common but requires evidence, responsibility and explanation.
- Safe prescribing needs unambiguous prescriptions, medicines reconciliation, attention to high-risk drugs and situations, and planned review and stopping. Antimicrobial and opioid stewardship protect both individuals and the wider population.
:::

## Where this leads

The evidence base behind drug decisions is developed in [[epidemiology-ebm/randomised-trials]], [[epidemiology-ebm/systematic-reviews]] and [[epidemiology-ebm/critical-appraisal]]. Research ethics is covered in [[medical-ethics-law/research-ethics]], and patient safety systems in [[clinical-skills/patient-safety]]. The pharmacological foundations of this chapter are in [[pharmacology/drug-receptor]], [[pharmacology/dosing-principles]] and [[pharmacology/adverse-reactions]].

## Exercises

::: exercise The phases of development {level=1}
Match each study to its phase: (a) 24 healthy volunteers receive single ascending doses of a new compound; (b) a cohort study of 200,000 users of a drug in electronic records looks for a link with pancreatitis; (c) 3,500 people with heart failure are randomised to a new drug or placebo, with cardiovascular death or hospital admission as the primary outcome; (d) 180 people with psoriasis are randomised to one of three doses or placebo to see whether the skin improves.
::: solution
(a) Phase I. (b) Phase IV (post-marketing surveillance). (c) Phase III. (d) Phase II (dose-finding and evidence of activity).
:::
:::

::: exercise Number needed to treat {level=1 check="100"}
Over five years, 4% of people on placebo and 3% on an active drug have a stroke. How many people need to be treated for five years to prevent one stroke?
::: solution
ARR $= 0.04 - 0.03 = 0.01$, so NNT $= 1/0.01 = 100$.
:::
:::

::: exercise What is wrong with this prescription? {level=1}
Identify the problem in each: (a) "Levothyroxine 100 mcg od"; (b) "Heparin 5000 IU sc bd"; (c) "Digoxin .125 mg od"; (d) "Lorazepam 1.0 mg prn".
::: solution
(a) "mcg" may be misread as "mg"; write "micrograms" in full. (b) "IU" may be misread (for example as "10"); write "units" in full. (c) A missing leading zero, ".125", can be misread as 125; write "125 micrograms" (or 0.125 mg). (d) The trailing zero in "1.0" can be misread as 10; write "1 mg", and an "as required" prescription also needs an indication, a minimum interval and a maximum daily dose.
:::
:::

::: exercise An ICER {level=2 check="30000"}
A new drug costs £18,000 more per patient than standard care and produces an extra 0.6 QALYs. Calculate the ICER in pounds per QALY.
::: solution
ICER $= 18{,}000/0.6 = £30{,}000$ per QALY. This is within the £25,000 to £35,000 range applied by NICE from April 2026; the decision would also depend on uncertainty and other factors considered by the committee.
:::
:::

::: exercise How large must a safety study be? {level=2 check="2995"}
An adverse reaction occurs in 1 in 1,000 people taking a drug. What is the smallest whole number of patients that must be followed for there to be at least a 95% probability of observing at least one case? Then comment on the result in relation to the size of typical phase III programmes.
::: hint
The probability of no cases among $n$ people is $0.999^n$. Set it at most 0.05.
:::
::: solution
We need $1 - 0.999^n \ge 0.95$, so $0.999^n \le 0.05$ and $n \ge \ln 0.05/\ln 0.999 \approx 2994.2$. The smallest whole number is **2995**, consistent with the rule of three ($3/n$).

Seeing one case would not establish a link with the drug; to show a significant difference from the background rate needs many more participants. Phase III programmes of a few thousand people can therefore detect reactions occurring in about 1 in 1,000, but not those occurring in 1 in 10,000 or rarer, which is why post-marketing surveillance is essential.
:::
:::

::: exercise Off-label or unlicensed? {level=2}
Classify each as licensed, off-label or unlicensed use, and state one responsibility of the prescriber in each off-label or unlicensed case: (a) amitriptyline at low dose for neuropathic pain; (b) a medicine specially manufactured as an oral liquid for a child because no licensed liquid exists; (c) a drug used for its licensed indication in a 2-year-old when it is licensed only from age 6; (d) atorvastatin for primary prevention of cardiovascular disease in an adult.
::: solution
(a) Off-label (amitriptyline is licensed for depression in the UK, not neuropathic pain, although widely recommended for it). (b) Unlicensed (a "special" without a marketing authorisation). (c) Off-label (outside the licensed age range). (d) Licensed.

For (a) to (c), the prescriber should be satisfied that evidence supports the use, take responsibility for prescribing and monitoring, record the reason, and explain the off-label or unlicensed status to the patient or parent where it is relevant to their decision, in line with professional guidance and the BNF or BNFC.
:::
:::

::: exercise The 72-hour antibiotic review {level=3}
A 68-year-old man was admitted with suspected community-acquired pneumonia and started on intravenous co-amoxiclav and clarithromycin. At 72 hours he is afebrile, eating and drinking, with a CRP falling from 210 to 60 mg/L. Blood cultures are negative; a sputum culture grew *Streptococcus pneumoniae* sensitive to amoxicillin. His urinary *Legionella* antigen was negative. Using the *Start Smart then Focus* framework, outline the decision and the reasoning.
::: solution
At the 48 to 72-hour review, the five options are stop, switch from IV to oral, change, continue, or outpatient parenteral therapy.

- He is clinically improving and able to take oral medicines, so **switching from intravenous to oral** is appropriate.
- The pathogen is identified and sensitive to amoxicillin, so the regimen should be **narrowed** to oral amoxicillin, stopping co-amoxiclav (broader spectrum, more associated with *C. difficile*) and stopping clarithromycin (atypical cover no longer needed, with negative *Legionella* antigen; also reduces interaction and QT risks).
- The total **duration** should follow the local guideline, which for most cases of community-acquired pneumonia is short (often five days in total if improving).

The decision, reasoning and stop date are documented. This approach reduces adverse effects and costs, and slows the selection of resistant organisms, without compromising his care.
:::
:::

::: exercise A non-inferiority trial {level=3}
A trial compares a new oral antibiotic with standard intravenous treatment for bone infection. The pre-specified non-inferiority margin is 10 percentage points. Cure rates are 88% with the new drug and 90% with standard treatment; the difference is −2 percentage points (95% confidence interval −6 to +2). (a) Is the new drug non-inferior? (b) Would the conclusion change with a margin of 5 percentage points? (c) Give two reasons why a clinician might still prefer the new drug, and one methodological point to check.
::: solution
(a) Yes. Non-inferiority is shown if the whole confidence interval lies above −10 percentage points; the lower limit is −6, which is above −10.

(b) With a margin of −5, the lower limit (−6) crosses the margin, so non-inferiority would not be shown: the result would be inconclusive, compatible with the new drug being up to 6 points worse.

(c) Oral treatment avoids intravenous lines and their infections, allows earlier discharge and is often cheaper and more acceptable to patients. Methodological points: whether the margin was clinically justified and set in advance; whether both per-protocol and intention-to-treat analyses agree (in non-inferiority trials, intention-to-treat analysis can bias towards finding no difference); and whether the standard treatment was given well, since a poorly delivered comparator makes non-inferiority easier to show ([[epidemiology-ebm/critical-appraisal]]).
:::
:::
