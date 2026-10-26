The earlier chapters described treatments disorder by disorder. This chapter steps back to look at the treatments themselves: the main psychological therapies, the classes of psychiatric drugs and their key safety issues, and the physical treatments such as electroconvulsive therapy. It then describes the legal framework that governs treatment when a person does not or cannot agree to it.

Mental health law is specific to each jurisdiction. This chapter describes the law in England and Wales as an example, because it is the framework this course uses throughout. Scotland and Northern Ireland have their own legislation, and other countries differ again. The aim is to understand the principles, not to provide legal advice.

## Psychological therapies

::: definition Psychological therapies {#def-therapies}
A **psychological therapy** is a structured treatment in which a trained therapist uses a specific model of how problems arise and are maintained to help a person change their thinking, feelings, behaviour or relationships. The main types are:

- **Cognitive behavioural therapy** (CBT): identifies links between thoughts, feelings and behaviour, and uses techniques such as testing unhelpful beliefs, behavioural experiments and exposure. Time-limited (often 12–20 sessions) and goal-focused.
- **Behavioural activation**: increases rewarding, meaningful activity to break the cycle of withdrawal and low mood in depression.
- **Interpersonal therapy** (IPT): focuses on current relationships and life events such as grief, role transitions and disputes.
- **Dialectical behaviour therapy** (DBT) and **mentalisation-based treatment** (MBT): structured therapies for people with borderline personality disorder and recurrent self-harm.
- **Family therapy and family intervention**: work with the family system, for example in eating disorders in young people and in psychosis.
- **Psychodynamic psychotherapy**: explores how past experiences and unconscious patterns shape current difficulties; short-term forms are used for depression.
- **Trauma-focused therapies**: trauma-focused CBT and eye movement desensitisation and reprocessing (EMDR) for PTSD.
:::

Across many therapies, the strength of the **therapeutic alliance** (the working relationship between therapist and patient) predicts outcome. Psychological therapies have side effects too: some people feel worse temporarily, and poorly delivered therapy can harm.

In England, **NHS Talking Therapies** (formerly Improving Access to Psychological Therapies, IAPT) provides evidence-based psychological treatment for depression and anxiety disorders in a **stepped-care** model. People can usually refer themselves. Low-intensity interventions (guided self-help, computerised CBT, psychoeducation groups) are offered first for milder problems, and high-intensity therapy (individual CBT, IPT, counselling, couples therapy for depression) for more severe or persistent ones. Outcomes are measured at every session using questionnaires such as the PHQ-9 and GAD-7.

::: example Matching therapy to the person {#ex-therapy-access}
Mr Samuel Owusu, 55, has moderate depression after a heart attack. He works night shifts, has limited reading ability, and does not want medication. His GP wonders whether he is "suitable" for talking therapy. How should this be approached?

::: solution
**He is suitable.** Psychological therapy does not require a high level of literacy or education. Therapists adapt materials (spoken rather than written, visual worksheets, recordings) and pace.

**Remove barriers.** NHS Talking Therapies services offer telephone and video sessions and some flexibility in timing. Self-referral avoids delay.

**Choose the approach.** Behavioural activation or CBT for depression is appropriate. Because depression after a cardiac event is common and worsens outcomes, link with cardiac rehabilitation, where exercise and support also help mood.

**Monitor.** Session-by-session PHQ-9 scores show whether he is improving. If not, step up the intensity or reconsider medication, with his agreement.
:::
:::

## Psychiatric drugs: the essentials

| Class | Main uses | Mechanism (simplified) | Key safety issues |
|---|---|---|---|
| SSRIs, SNRIs, mirtazapine, tricyclics | Depression, anxiety disorders, OCD | Increase serotonin and/or noradrenaline transmission | Hyponatraemia, bleeding (SSRIs), QT (citalopram), serotonin syndrome, discontinuation symptoms, toxicity in overdose (tricyclics) |
| Antipsychotics | Psychosis, mania, some agitation | Dopamine D2 blockade (plus other receptors) | Movement disorders, metabolic effects, prolactin, QT, sedation, NMS; clozapine: neutropenia, myocarditis, constipation |
| Lithium | Bipolar disorder, augmentation in depression | Not fully understood (intracellular signalling) | Narrow therapeutic index; renal, thyroid and parathyroid effects; interactions |
| Valproate, lamotrigine, carbamazepine | Bipolar disorder (also epilepsy) | Ion channels and GABA | Teratogenicity (valproate especially), rash (lamotrigine), enzyme induction (carbamazepine) |
| Benzodiazepines, Z-drugs | Short-term anxiety, insomnia, alcohol withdrawal, acute agitation | Enhance GABA-A receptor function | Dependence, sedation, falls, respiratory depression with opioids |
| Stimulants, atomoxetine | ADHD | Increase dopamine and noradrenaline | Appetite, growth, heart rate and blood pressure, misuse |

Doses, interactions and monitoring always follow the BNF and local guidance.

### Two serotonergic and dopaminergic emergencies

Serotonin syndrome and neuroleptic malignant syndrome can look similar. Both cause fever, altered mental state and autonomic instability. The distinction matters because their causes and treatments differ.

| Feature | Serotonin syndrome | Neuroleptic malignant syndrome |
|---|---|---|
| Cause | Serotonergic drugs, especially combinations or overdose | Dopamine antagonists (antipsychotics), or withdrawal of dopaminergic drugs |
| Onset | Hours | Days to weeks |
| Neuromuscular | Clonus (often inducible, ocular), hyperreflexia, tremor | "Lead-pipe" rigidity, bradyreflexia |
| Other | Agitation, diarrhoea, dilated pupils | Reduced consciousness, very high creatine kinase |
| Management | Stop serotonergic drugs, supportive care, benzodiazepines; specialist agents in severe cases | Stop antipsychotic, supportive care, cooling, fluids; specialist agents in severe cases |

### Pharmacokinetics in practice: lithium

Lithium shows why pharmacokinetics matters at the bedside. Its elimination half-life is around a day in a healthy adult (longer in older people and with reduced kidney function).

::: theorem Steady state after repeated dosing {#thm-steady-state}
When a drug with first-order elimination is given repeatedly at a constant dose and interval, its concentration rises towards a **steady state**. The fraction of the eventual steady-state level reached after time $t$ is

$$
f(t) = 1 - \left(\tfrac{1}{2}\right)^{t/t_{1/2}}
$$ {#eq-steady}

where $t_{1/2}$ is the elimination half-life. After about four to five half-lives, the concentration is within about 3–6% of steady state.
:::

::: proof
With first-order elimination, a constant fraction of drug is removed per unit time, so the rate of elimination is proportional to the amount present. With a constant input rate, the amount rises until elimination equals input: that is the steady state. The gap between the current level and the steady-state level shrinks by half in each half-life, just as a single dose falls by half in each half-life. After one half-life the level is 50% of steady state, after two 75%, after three 87.5%, after four 93.75%, and after five about 97%. This is why serum lithium is usually measured about 5–7 days after starting or changing the dose, when the level reflects the new steady state, and always about 12 hours after the last dose, so that results are comparable. Measuring too early underestimates the eventual level and can lead to an unsafe dose increase.
:::

::: widget plot
f: 100*(1 - 0.5^(x/h))
x: 0, 10
y: 0, 105
sliders: h=1:0.5:3:0.25
hlines: 100
labels: \text{percent of steady state}
caption: Approach to steady state with repeated dosing for a drug with half-life $h$ days (a simplified continuous model; real levels oscillate between doses). With a half-life of about one day, as for lithium in a healthy adult, the level is close to steady state after five days. Lengthen the half-life, as happens with age or reduced kidney function, and the approach slows: a level checked at day five would then underestimate the final level.
:::

::: example When to check the level {#ex-lithium-ss}
Mrs Beatrice Lloyd, 76, starts lithium for bipolar depression. Her lithium half-life is estimated at about two days because of age-related decline in kidney function. Her doctor plans to check the level after three days. What fraction of steady state will the level represent, and what would be a better plan?

::: solution
**Fraction at day three.** Using [[#eq-steady]] with $t = 3$ days and $t_{1/2} = 2$ days: $f = 1 - 0.5^{3/2} = 1 - 0.354 \approx 0.65$. The level would show only about 65% of the eventual steady state.

**The risk.** A low reading might prompt a dose increase, and the eventual level could then be toxic.

**Better plan.** Wait until about five half-lives, here about ten days, or at least a week, before interpreting the level as steady state; measure it 12 hours after the last dose; start at a lower dose, as is usual in older people; check renal function, thyroid function, calcium and interacting drugs (NSAIDs, ACE inhibitors, diuretics) first; and recheck after each dose change.
:::
:::

## Physical treatments

**Electroconvulsive therapy** (ECT) involves inducing a brief generalised seizure under general anaesthesia and muscle relaxation, usually twice a week for a course of several weeks. It is the most effective treatment for severe depression, especially with psychotic features, stupor or life-threatening refusal of food and fluids, and it is also used for catatonia and severe mania. Its main adverse effects are those of anaesthesia, headache, muscle aches, and cognitive effects, especially memory loss for events around the treatment period, which usually improves but can persist for some people. Mortality is very low, comparable to that of a minor procedure under general anaesthesia.

**Repetitive transcranial magnetic stimulation** (rTMS) uses magnetic pulses to stimulate the prefrontal cortex. NICE interventional procedures guidance (IPG542, 2015) states that the evidence on its safety and efficacy for depression is adequate to support use with normal arrangements. It is available in some NHS services.

**Esketamine** nasal spray is licensed for treatment-resistant depression, but NICE (TA854) did not recommend it for use in the NHS in England, and in 2024 decided not to review that guidance.

::: example ECT and consent {#ex-ect-consent}
Mr Derek Simmons, 81, has severe depression with nihilistic delusions. He has stopped eating and drinking and is becoming dehydrated. He believes he is already dead and that treatment is pointless. His team considers ECT. How does the law in England and Wales apply?

::: solution
**Urgency and alternatives.** His physical state is life-threatening. Medical treatment of dehydration proceeds in parallel.

**Capacity.** His delusion that he is already dead means he probably cannot use or weigh information about ECT, so he likely lacks capacity to consent to it. This must be assessed and recorded.

**Legal framework.** ECT is subject to special safeguards under section 58A of the Mental Health Act 1983. If he is detained and lacks capacity, ECT can be given if a **second opinion appointed doctor** (SOAD) certifies that it is appropriate, and provided it does not conflict with a valid advance decision, a decision of an attorney or deputy, or the Court of Protection. In an emergency, **section 62** allows ECT to be given to save life or prevent serious deterioration while a SOAD is awaited.

**Never with a capacitous refusal.** A detained patient who has capacity and refuses ECT cannot be given it, except under section 62 in an emergency to save life. This is a key difference from medication.

**Involve others.** Consult his family, consider any advance statements, and document the decision and reasoning.
:::
:::

## The Mental Health Act

::: definition The Mental Health Act 1983 (England and Wales) {#def-mha}
The **Mental Health Act 1983** allows a person with a **mental disorder** to be detained in hospital, and in some circumstances treated, without their consent, when this is necessary for their health or safety or for the protection of others, and when treatment cannot be provided without detention. Mental disorder means "any disorder or disability of the mind"; dependence on alcohol or drugs alone is not a mental disorder for the purposes of the Act. Applications are usually made by an **approved mental health professional** (AMHP), supported by medical recommendations from doctors, at least one of whom is approved under section 12 as having special experience in mental disorder.
:::

Main sections:

| Section | Purpose | Duration | Who |
|---|---|---|---|
| 2 | Assessment (and treatment) | Up to 28 days, not renewable | AMHP (or nearest relative) application plus two medical recommendations |
| 3 | Treatment | Up to 6 months, renewable (6 months, then yearly) | AMHP (or nearest relative) plus two medical recommendations; appropriate medical treatment must be available |
| 4 | Emergency admission when waiting for a second doctor would cause undesirable delay | Up to 72 hours | AMHP or nearest relative plus one medical recommendation |
| 5(2) | Doctor's holding power for an informal inpatient | Up to 72 hours | Doctor or approved clinician in charge of treatment (or nominated deputy) |
| 5(4) | Nurse's holding power for an informal inpatient | Up to 6 hours | Registered mental health or learning disability nurse |
| 135 | Warrant to enter premises and remove a person to a place of safety | Up to 24 hours (extendable by 12) | Magistrate's warrant, police |
| 136 | Police power to remove a person who appears to have a mental disorder and need immediate care, from a place other than a private home, to a place of safety | Up to 24 hours (extendable by 12) | Police officer, after consulting a health professional where practicable |
| 17 | Leave of absence for a detained patient | As granted | Responsible clinician |
| 17A | Community treatment order (CTO) after section 3 | 6 months, renewable | Responsible clinician with AMHP agreement |

Safeguards include the right to apply to a **First-tier Tribunal (Mental Health)** (in Wales, the Mental Health Review Tribunal for Wales), the right to an **independent mental health advocate** (IMHA), information about rights, the role of the **nearest relative**, and the **hospital managers'** review. Under **section 58**, medication for mental disorder can be given without consent for the first three months of detention; after that, it requires either the patient's capacitous consent or certification by a SOAD. **Section 117** places a duty on health and social services to provide free aftercare for people who have been detained under treatment sections.

### The Mental Health Act 2025

The **Mental Health Act 2025** received Royal Assent on 18 December 2025. It amends the 1983 Act, and its provisions are being brought into force in stages over several years, so the 1983 framework described above continues to operate until each change is commenced. The main changes include:

- detention criteria that require a risk of **serious harm** to the person or others, and a reasonable prospect of **therapeutic benefit**;
- people with a learning disability or autistic people can no longer be detained for treatment under section 3 unless they also have a co-occurring psychiatric disorder that meets the criteria;
- a **nominated person**, chosen by the patient, replaces the nearest relative;
- statutory **care and treatment plans** for detained patients;
- police cells and prisons no longer to be used as places of safety;
- a shorter initial period of detention under section 3 and more frequent tribunal reviews.

Doctors should check which provisions are in force at any given time, using the current Code of Practice.

## Mental capacity

::: definition The Mental Capacity Act 2005 {#def-capacity}
The **Mental Capacity Act 2005** (England and Wales) applies to people aged 16 and over who may lack capacity to make particular decisions. Its five principles are:

1. A person must be assumed to have capacity unless it is established that they lack it.
2. A person is not to be treated as unable to make a decision unless all practicable steps to help them have been taken without success.
3. A person is not to be treated as unable to make a decision merely because they make an unwise decision.
4. Anything done for a person who lacks capacity must be done in their **best interests**.
5. Before acting, consider whether the purpose can be achieved in a way that is **less restrictive** of the person's rights and freedom.

A person lacks capacity for a decision if, because of an impairment of, or disturbance in the functioning of, the mind or brain, they are unable to **understand** the relevant information, **retain** it, **use or weigh** it, or **communicate** their decision.
:::

Best-interests decisions consider the person's past and present wishes, feelings, beliefs and values, and the views of family and carers. People may make **advance decisions to refuse treatment**, which are legally binding if valid and applicable (with specific requirements for life-sustaining treatment), and may appoint an attorney under a **lasting power of attorney** for health and welfare.

When care for a person who lacks capacity amounts to a **deprivation of liberty** (for example continuous supervision and control, and not being free to leave), it must be authorised. In hospitals and care homes this is done through the **Deprivation of Liberty Safeguards** (DoLS). The Liberty Protection Safeguards, legislated in 2019 to replace DoLS, have not been implemented, and as of 2026 DoLS remains in use.

### Choosing between the two Acts

The two Acts have different purposes. The **Mental Health Act** is used to detain and treat people for **mental disorder** when necessary, whether or not they have capacity. The **Mental Capacity Act** covers decisions about care and treatment, including physical health care, for people who **lack capacity**. A person detained under the Mental Health Act who needs treatment for a physical illness unrelated to their mental disorder is treated with their consent, or under the Mental Capacity Act if they lack capacity. Where both could apply to admission for mental disorder, especially if the person objects, the Mental Health Act is generally the appropriate framework because it provides more safeguards.

::: example A community treatment order {#ex-cto-recall}
Mr Kofi Asante, 34, has schizophrenia and has been admitted under section 3 three times in four years, each time after stopping his medication within weeks of discharge. He is now well and due for discharge, and his responsible clinician proposes a CTO. What does this mean in practice?

::: solution
**What a CTO is.** A community treatment order (section 17A) allows a person who has been detained under section 3 to live in the community subject to conditions, such as attending appointments and allowing visits, with the power for the responsible clinician to **recall** them to hospital for up to 72 hours if they need treatment and there would be a risk of harm without it.

**Criteria.** He must have a mental disorder of a nature or degree making treatment appropriate, treatment must be necessary for his health or safety or the protection of others, it must be possible to give it in the community, and the power of recall must be necessary. An AMHP must agree.

**Rights.** He has the right to an IMHA and to apply to the tribunal. The CTO lasts six months initially and can be renewed.

**Evidence.** A UK randomised trial (OCTET, 2013) found that CTOs did not reduce readmission compared with section 17 leave, which raises questions about their use. The decision should therefore weigh his history, his views, the least restrictive principle, and what would help him continue treatment voluntarily, such as a long-acting injection he prefers, side-effect management and support.
:::
:::

::: example A request to go home {#ex-s5}
Ms Lauren Hughes, 27, was admitted informally to a psychiatric ward two days ago after an overdose. She now says she wants to leave immediately to "finish what I started". The ward doctor is the only doctor present. What powers apply?

::: solution
**Holding powers.** As an informal inpatient, she could be held under **section 5(2)** by the doctor in charge of her treatment or their nominated deputy, for up to 72 hours, to allow a full Mental Health Act assessment. If no doctor were immediately available, a qualified mental health nurse could use **section 5(4)** for up to six hours.

**Next steps.** Arrange an urgent assessment by an AMHP and two doctors (one section 12 approved) to consider detention under section 2. Keep her safe in the meantime with appropriate observation, and talk with her about her distress.

**Rights.** Explain her rights clearly and record this. The holding power must end as soon as the assessment is complete, whether or not she is detained.
:::
:::

::: warning Capacity is not the test for the Mental Health Act
A common error is to assume that a person with capacity cannot be detained under the Mental Health Act, or that a person without capacity must be. The criteria for detention are about mental disorder, its nature or degree, and risk. A person with capacity can be detained if the criteria are met, and medication for mental disorder can then be given without consent within the rules of section 58. Conversely, the Mental Health Act does not authorise treatment for unrelated physical illness: that requires consent or, if the person lacks capacity, the Mental Capacity Act.
:::

::: quiz
A detained patient under section 3 has been receiving an antipsychotic for three months. She has capacity and refuses to continue it. Which statement is correct?
- [ ] Treatment can continue indefinitely without consent under section 3.
- [x] After three months, treatment without consent requires certification by a second opinion appointed doctor.
- [ ] The Mental Capacity Act must be used instead.
- [ ] The section must be rescinded because she has capacity.
::: solution
Under section 58, medication for mental disorder can be given without consent during the first three months of detention. After that, it requires either her valid consent or a certificate from a SOAD confirming that the treatment is appropriate. Her capacity does not by itself end detention.
:::
:::

::: history
Until the 18th century, people with mental illness were often confined in poor conditions. Philippe Pinel in Paris and William Tuke at the York Retreat (founded 1796) introduced "moral treatment" based on humane care. In England, the Lunacy Act 1890 required judicial authority for most admissions. The Mental Treatment Act 1930 introduced voluntary admission, and the Mental Health Act 1959 made most admissions informal and moved decisions from courts to doctors. The Mental Health Act 1983 added safeguards, and the 2007 amendments introduced community treatment orders, approved mental health professionals and independent advocates. Ugo Cerletti and Lucio Bini introduced electroconvulsive therapy in Rome in 1938. Aaron Beck developed cognitive therapy in the 1960s, and David Clark and Richard Layard's economic case for psychological therapy led to the IAPT programme in England in 2008. The Mental Health Act 2025 followed an independent review chaired by Simon Wessely, published in 2018.
:::

## Where this leads

Consent and capacity in general medical practice are covered in [[medical-ethics-law/consent-capacity]]; drug mechanisms in [[pharmacology/drug-receptor]]; pharmacokinetics in [[pharmacology/dosing-principles]]; and the conditions these treatments address in [[psychiatry/mood-disorders]] and [[psychiatry/psychotic-disorders]].

::: summary
- Psychological therapies (CBT, behavioural activation, IPT, DBT, MBT, family and trauma-focused therapies) are first-line for many disorders; NHS Talking Therapies delivers stepped care in England.
- Each drug class has characteristic risks: hyponatraemia and bleeding with SSRIs, metabolic and movement effects with antipsychotics, a narrow therapeutic index with lithium, teratogenicity with valproate, dependence with benzodiazepines.
- Distinguish serotonin syndrome (hours, clonus) from NMS (days, rigidity).
- Steady state is reached after about four to five half-lives; check lithium levels after steady state, 12 hours post-dose.
- ECT is the most effective treatment for severe depression; under the Mental Health Act a capacitous refusal of ECT cannot be overridden except in a life-saving emergency.
- The Mental Health Act 1983 allows detention for assessment (section 2, 28 days) or treatment (section 3, 6 months) with safeguards; holding powers (5(2), 5(4)), police powers (135, 136), CTOs and section 117 aftercare.
- The Mental Health Act 2025 is being commenced in stages: serious-harm and therapeutic-benefit criteria, a nominated person, care and treatment plans and limits on detaining autistic people and people with learning disabilities.
- The Mental Capacity Act 2005 sets out five principles and a functional test; DoLS authorise deprivations of liberty.
- Use the Mental Health Act for mental disorder treatment when its criteria are met; use the Mental Capacity Act for decisions about people who lack capacity, including physical health care.
:::

## Exercises

::: exercise Sections and durations {level=1}
Give the maximum duration of each: section 2, section 3 (initial period), section 4, section 5(2), section 5(4), section 136 (without extension).
::: solution
Section 2: 28 days. Section 3: 6 months initially. Section 4: 72 hours. Section 5(2): 72 hours. Section 5(4): 6 hours. Section 136: 24 hours (extendable by up to 12 hours in specified circumstances).
:::
:::

::: exercise Five principles {level=1}
List the five principles of the Mental Capacity Act 2005.
::: solution
(1) Assume capacity unless it is established that it is lacking. (2) Take all practicable steps to help the person decide before concluding they cannot. (3) An unwise decision does not in itself mean lack of capacity. (4) Act in the person's best interests if they lack capacity. (5) Choose the less restrictive option where possible.
:::
:::

::: exercise Serotonin syndrome or NMS? {level=1}
A 30-year-old taking sertraline is given tramadol after an injury. Within hours she is agitated, sweating, with dilated pupils, diarrhoea and inducible clonus. Which syndrome is this, and why?
::: solution
Serotonin syndrome: rapid onset within hours of adding a second serotonergic drug (tramadol has serotonergic activity), with clonus, hyperreflexia, agitation, mydriasis and diarrhoea. NMS develops over days with an antipsychotic and causes lead-pipe rigidity and reduced reflexes.
:::
:::

::: exercise Steady state {level=2 check="100*(1-0.5^4)"}
What percentage of the steady-state concentration is reached after four half-lives of regular dosing?
::: solution
$f = 1 - 0.5^4 = 1 - 0.0625 = 0.9375$, so **93.75%**.
:::
:::

::: exercise Too early a level {level=2 check="round(100*(1-0.5^(2.5)))"}
A drug's half-life is 2 days. A level is taken 5 days after starting regular dosing. What percentage of the eventual steady-state level does it represent? Give a whole-number percentage.
::: solution
$t/t_{1/2} = 5/2 = 2.5$. $f = 1 - 0.5^{2.5} = 1 - 0.177 = 0.823$, so about **82%**. Interpreting this as steady state would underestimate the final level by about a fifth.
:::
:::

::: exercise Which Act? {level=2}
For each, state which framework applies and why: (a) a man with dementia who lacks capacity needs a hip fracture repair; (b) a woman with mania who has capacity but refuses admission despite serious risk to her finances and safety; (c) a man detained under section 3 for schizophrenia develops appendicitis and lacks capacity to consent to surgery.
::: solution
(a) Mental Capacity Act: treatment of a physical condition in a person who lacks capacity, in his best interests. (b) Mental Health Act: she has a mental disorder of a nature and degree warranting admission, with risk, and treatment cannot be given without detention; capacity does not prevent detention. An assessment under section 2 would be considered. (c) Mental Capacity Act: the Mental Health Act authorises only treatment for mental disorder; appendicitis is unrelated, so surgery is given in his best interests under the Mental Capacity Act (or with his consent if he regains capacity).
:::
:::

::: exercise A tribunal question {level=3}
A patient detained under section 3 asks you, as a junior doctor, how she can challenge her detention, and complains that her mother (her nearest relative) has too much say. Explain her rights under the current law and what will change under the Mental Health Act 2025.
::: solution
Under the 1983 Act she can apply to the First-tier Tribunal (Mental Health) once in each period of detention (the first six months, the next six months, then yearly), and her case is automatically referred if she does not apply for a set period. She can also ask the hospital managers to review her detention. She is entitled to an independent mental health advocate and to free legal representation for the tribunal. Her nearest relative is determined by a statutory list, not by her choice; she can apply to the county court to displace an unsuitable nearest relative. Under the Mental Health Act 2025, once commenced, the nearest relative will be replaced by a nominated person she chooses, tribunal reviews will be more frequent, and she will have a statutory care and treatment plan. Because commencement is staged, it is important to check which provisions are in force and to involve the IMHA and ward staff in explaining them.
:::
:::

::: exercise Least restrictive care {level=3}
A 19-year-old with a first episode of psychosis is frightened and refuses admission, but agrees to daily home visits from the crisis team and to take medication if his sister stays with him. His parents want him "sectioned" for his own safety. Discuss the legal and ethical considerations.
::: solution
The Mental Health Act requires that detention be necessary and that treatment cannot be provided without it. The least restrictive principle, in both the Mental Health Act Code of Practice and the Mental Capacity Act, means considering alternatives first. If home treatment by the crisis team with his sister's support can manage the risk adequately, detention is not justified, even if his parents would feel more reassured. The assessment must still be thorough: the nature and degree of his illness, risks to himself (suicide, self-neglect, vulnerability) and to others, his insight and capacity, and the reliability of the plan. Engaging him voluntarily is likely to support a better long-term relationship with services and early intervention care. His parents' concerns deserve a respectful response and information; they should know how to seek help if the situation changes. If the home plan breaks down or risk rises, a Mental Health Act assessment can be arranged. Document the reasoning.
:::
:::
