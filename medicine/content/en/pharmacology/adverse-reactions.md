Every effective drug can cause harm. Most harm from medicines is predictable from the drug's pharmacology and happens at ordinary doses: bleeding with anticoagulants, low blood pressure with antihypertensives, kidney injury when several drugs that affect renal blood flow are combined. A smaller part is unpredictable, such as anaphylaxis to an antibiotic or a severe skin reaction to an antiepileptic. Together these reactions are a major cause of illness. In a prospective study of 18,820 admissions to two English hospitals, published in 2004, about 6.5% of admissions were related to an adverse drug reaction; a repeat study by the same group using 2019 data found a much higher proportion, 16.5%, although its authors cautioned against direct comparison. In both, the drugs most often involved were common ones: low-dose aspirin, diuretics, anticoagulants and NSAIDs among them.

This chapter defines adverse drug reactions and classifies them, describes immunological reactions and severe syndromes, explains how drug interactions cause harm, and shows how reactions are recognised, assessed and reported. Prevention runs through all of it. Mechanisms covered earlier, in [[pharmacology/drug-receptor]] and [[pharmacology/metabolism-excretion]], are the basis for most of what follows.

## Definitions and classification {#sec-classification}

::: definition Adverse drug reaction and related terms {#def-adr}
An **adverse drug reaction** (ADR) is a response to a medicinal product that is noxious and unintended. The older WHO definition restricted it to doses normally used in humans; current UK and EU pharmacovigilance law also includes reactions arising from errors, misuse, abuse, overdose and use outside the terms of the licence.

Related terms are used differently:

- an **adverse event** is any harmful occurrence during treatment, whether or not the drug caused it; trials record adverse events, and causality is assessed afterwards;
- a **side effect** is any effect other than the intended one, harmful or not (for example the drowsiness of an antihistamine, which may even be wanted at night);
- a **medication error** is a failure in the treatment process, such as prescribing, dispensing or administration, that leads to, or could lead to, harm.
:::

::: definition Classification of adverse drug reactions {#def-adr-classes}
The scheme proposed by Michael Rawlins and John Thompson in 1977 divided reactions into two types, later extended to six:

| Type | Name | Features | Examples |
|---|---|---|---|
| A | Augmented | Predictable from the drug's known pharmacology; dose-related; common; usually mild but responsible for most morbidity | Bleeding with warfarin; hypoglycaemia with insulin; bradycardia with β-blockers |
| B | Bizarre | Not predictable from the pharmacology; not clearly dose-related at usual doses; uncommon; often immunological or genetic; higher mortality | Anaphylaxis to penicillin; Stevens–Johnson syndrome with carbamazepine; malignant hyperthermia |
| C | Chronic | Related to cumulative dose and long-term use | Osteoporosis with corticosteroids; tardive dyskinesia with antipsychotics |
| D | Delayed | Appear long after exposure | Secondary cancers after chemotherapy; teratogenic effects |
| E | End of use | Withdrawal or rebound when a drug is stopped | Rebound angina after β-blockers; adrenal crisis after stopping long-term corticosteroids; opioid withdrawal |
| F | Failure | Unexpected failure of treatment, often from an interaction | Contraceptive failure with enzyme inducers |

An alternative scheme, **DoTS** (Aronson and Ferner, 2003), describes each reaction by its **Do**se relation, **T**ime course and **S**usceptibility factors. It is more precise and is useful for working out how to prevent a particular reaction, but the A to F classification remains the common clinical vocabulary.
:::

Type A reactions are where prevention has most effect, because they follow rules that are known in advance. The usual susceptibility factors are those that raise concentration or sensitivity: reduced kidney or liver function, older age, low body weight, interacting drugs, and genetic variants in metabolism ([[pharmacology/patient-variation]]). Many type A reactions are extensions of the main effect, as with bleeding on an anticoagulant. Others come from the same drug acting at a different site, as with the bronchospasm of a β-blocker or the anticholinergic effects of a tricyclic antidepressant.

The figure illustrates the quantal logic behind type A reactions: the dose–response curve for toxicity in a population lies to the right of the curve for benefit, and the gap between them is the margin of safety ([[pharmacology/drug-receptor]]).

::: widget plot
f: 50*(1+erf(x/(0.3*sqrt(2)))); 50*(1+erf((x-T)/(s*sqrt(2))))
x: -1, 3
y: 0, 100
sliders: T=1:0.2:2.5:0.1; s=0.3:0.1:0.8:0.05
labels: \text{patients with benefit (\%)}; \text{patients with toxicity (\%)}
caption: Illustrative quantal curves against log dose (the effective dose in half of patients is at $x = 0$). $T$ is the log distance between the median effective and median toxic doses; $s$ is the spread of the toxicity curve in the population. Reduce $T$ to narrow the therapeutic index, or increase $s$ to see a few susceptible people harmed at doses that benefit most. Factors such as kidney impairment or an interacting drug act as if they moved an individual's toxicity threshold to the left.
:::

## Immunological and idiosyncratic reactions {#sec-hypersensitivity}

Most type B reactions are immune-mediated **drug allergies**. Small drug molecules are usually too small to provoke an immune response on their own, but some bind covalently to body proteins and act as **haptens**, forming new antigens; others bind directly to immune receptors such as HLA molecules or T-cell receptors. The Gell and Coombs classification describes four mechanisms ([[immunology/hypersensitivity]]):

| Type | Mechanism | Timing | Drug examples |
|---|---|---|---|
| I | IgE on mast cells; histamine and other mediators | Minutes to an hour | Anaphylaxis, urticaria and angioedema with penicillins, neuromuscular blockers, chlorhexidine |
| II | IgG or IgM against drug-coated cells | Days | Haemolytic anaemia with some cephalosporins; thrombocytopenia with heparin (HIT) or quinine |
| III | Immune complexes deposited in tissues | One to three weeks | Serum sickness-like reactions; drug-induced vasculitis |
| IV | T-cell mediated | Days to weeks | Contact dermatitis; maculopapular drug rashes; Stevens–Johnson syndrome and DRESS |

Not every reaction that looks allergic is. **Non-immune (pseudoallergic) reactions** imitate allergy through direct mediator release or other pathways. Rapid vancomycin infusion releases histamine directly, causing flushing of the upper body (the "vancomycin flushing reaction"), which is prevented by slower infusion. Opioids such as morphine can release histamine and cause itch. NSAIDs can trigger bronchospasm in people with NSAID-exacerbated respiratory disease by shifting arachidonic acid metabolism towards leukotrienes. ACE inhibitors can cause angioedema by reducing the breakdown of bradykinin, a reaction that may first occur after years of treatment.

::: definition Severe cutaneous adverse reactions {#def-scs}
A few drug reactions involving the skin are life-threatening and must be recognised early.

- **Stevens–Johnson syndrome (SJS) and toxic epidermal necrolysis (TEN)** are one disease of different extent: widespread death of keratinocytes with blistering and detachment of the epidermis, and erosions of mucous membranes (mouth, eyes, genitals). Detachment of less than 10% of body surface area is SJS, more than 30% is TEN, and between the two is overlap. Typical onset is 4 to 28 days after starting the drug. Common culprits include allopurinol, carbamazepine, lamotrigine, phenytoin, sulfonamides including co-trimoxazole, and nevirapine.
- **Drug reaction with eosinophilia and systemic symptoms (DRESS)** begins two to eight weeks after starting the drug, with fever, widespread rash, facial swelling, lymphadenopathy, eosinophilia, atypical lymphocytes and involvement of organs, most often the liver. Antiepileptics, allopurinol and some antibiotics are common causes.
- **Acute generalised exanthematous pustulosis (AGEP)** produces many small sterile pustules on red skin within days, often after β-lactams.

The first and most important step in each is to stop the suspected drug. Management is supportive, often in a burns or dermatology unit, and the drug is recorded clearly as one never to be given again.
:::

Some of these reactions are strongly linked to particular HLA alleles. Carriers of HLA-B*15:02, common in people of Han Chinese, Thai and other South-east Asian ancestry, have a greatly increased risk of carbamazepine-induced SJS/TEN; HLA-B*58:01 is linked to allopurinol reactions, and HLA-B*57:01 to abacavir hypersensitivity. Screening for these alleles before prescribing is discussed in [[pharmacology/patient-variation]].

::: warning A penicillin allergy label is often wrong, and costly
About one in ten people in the UK has "penicillin allergy" recorded in their notes, yet when they are formally tested, the large majority, around nine in ten, can take penicillin safely. Many labels come from childhood rashes during viral infections, or from intolerances such as nausea. An unverified label pushes prescribers towards broader-spectrum antibiotics, which are associated with more *Clostridioides difficile* infection, more resistant organisms and worse outcomes. Taking a careful history of what happened, when and how it was treated, recording reactions precisely, and referring for de-labelling where local pathways exist are part of good prescribing. Equally, a genuine history of anaphylaxis or a severe cutaneous reaction must be recorded and respected.
:::

::: example A rash on amoxicillin {#ex-rash-review}
A 19-year-old student of Ghanaian heritage has a sore throat, fever, tender cervical lymph nodes and an enlarged spleen. Amoxicillin was prescribed two days earlier for presumed tonsillitis. She now has a widespread itchy maculopapular rash, no mucosal involvement, normal blood pressure and no breathing difficulty. A monospot test is positive. Should she be labelled as penicillin-allergic?
::: solution
The features suggest infectious mononucleosis caused by Epstein–Barr virus. A non-urticarial maculopapular rash commonly appears when people with acute EBV infection are given amoxicillin or ampicillin. It reflects a transient immune interaction during the viral infection rather than lasting IgE-mediated allergy, and most such people tolerate penicillins later.

On rash appearance alone it is hard to be certain, so the principles are: stop the amoxicillin (antibiotics were not needed for a viral illness), treat symptoms, and check for warning features of a severe reaction (mucosal erosions, blistering, skin pain, fever with organ involvement), which are absent here. The record should describe exactly what happened ("maculopapular rash on day 2 of amoxicillin during acute EBV infection, no mucosal or systemic features") rather than simply "penicillin allergy", so that a future clinician can judge the risk and consider formal assessment. Darker skin can make erythema harder to see; rashes may look purple or dark brown rather than red, and texture and itch are useful clues ([[musculoskeletal/skin]]).
:::
:::

## Drug interactions {#sec-interactions}

A **drug interaction** occurs when the effect of one drug is changed by another drug, food, herbal product or disease state. Interactions are common because many patients take several medicines; they are clinically important when the affected drug has a narrow therapeutic index or when the combined effect pushes a physiological system past a threshold.

**Pharmacokinetic interactions** change the concentration of a drug at its site of action:

- *absorption*: chelation of tetracyclines, quinolones and levothyroxine by calcium, iron and antacids;
- *distribution*: displacement from plasma proteins, which rarely matters on its own ([[pharmacology/absorption-distribution]]);
- *metabolism*: enzyme induction and inhibition, the most important group ([[pharmacology/metabolism-excretion]]);
- *excretion*: reduced renal clearance of lithium by thiazides, ACE inhibitors and NSAIDs; reduced methotrexate secretion by NSAIDs and proton pump inhibitors.

**Pharmacodynamic interactions** occur when two drugs act on the same system, without changing each other's concentrations:

- *bleeding*: anticoagulants with antiplatelet drugs, NSAIDs or SSRIs;
- *QT prolongation and torsades de pointes*: combinations such as macrolides, some antipsychotics, citalopram, methadone and some antiemetics, especially with hypokalaemia or hypomagnesaemia;
- *serotonin syndrome*: combinations of serotonergic drugs (SSRIs, SNRIs, MAO inhibitors, tramadol, linezolid, triptans at high exposure, lithium), causing altered mental state, autonomic instability and neuromuscular hyperactivity (clonus, hyperreflexia, tremor);
- *hyperkalaemia*: ACE inhibitors or angiotensin receptor blockers with potassium-sparing diuretics, potassium supplements or trimethoprim;
- *central nervous system depression*: opioids with benzodiazepines, gabapentinoids or alcohol;
- *acute kidney injury*: the combination often called the "triple whammy" of an ACE inhibitor or angiotensin receptor blocker, a diuretic and an NSAID.

::: example The triple whammy {#ex-triple-whammy}
A 78-year-old woman with hypertension and heart failure takes ramipril, furosemide and spironolactone. She buys ibuprofen for knee pain during a hot week in which she has also had diarrhoea. Five days later she is drowsy, her creatinine has risen from 90 to 260 µmol/L and her potassium is 6.6 mmol/L. Explain how her medicines contributed.
::: solution
Glomerular filtration depends on the pressure in the glomerulus, which is protected when renal perfusion falls by two mechanisms: prostaglandin-mediated dilation of the afferent arteriole and angiotensin II-mediated constriction of the efferent arteriole ([[renal/filtration]]).

- The **diuretic**, with diarrhoea and heat, reduced her circulating volume and renal perfusion.
- **Ibuprofen** blocked prostaglandin synthesis, so the afferent arteriole could not dilate.
- **Ramipril** reduced angiotensin II, so the efferent arteriole could not constrict.

With both protective mechanisms removed during hypovolaemia, glomerular pressure and GFR fell sharply: acute kidney injury. Hyperkalaemia followed from reduced potassium excretion, made worse by spironolactone and ramipril, which both reduce aldosterone action.

The principles are to treat the hyperkalaemia urgently, stop the NSAID and temporarily withhold the ACE inhibitor, diuretics and spironolactone while she is volume-depleted (often formalised as "sick day rules"), and restore volume. Prevention includes advice to avoid over-the-counter NSAIDs, and pharmacist review of new purchases ([[renal/acute-kidney-injury]]).
:::
:::

::: example The statin and the new blood pressure tablet {#ex-statin-myo}
A 71-year-old man of Indian heritage has taken simvastatin 40 mg at night for several years. Amlodipine is added for hypertension. Two months later he reports aching thigh and shoulder muscles and dark urine after a long walk. His creatine kinase (CK) is 12 times the upper limit of normal. His TSH, checked for the first time in years, is raised. Explain the likely contributors and the principles of management.
::: solution
Statin-associated muscle symptoms range from aches with a normal CK to myositis and, rarely, rhabdomyolysis. His raised CK with dark urine suggests significant muscle injury. The risk rises with statin exposure, and several factors are present:

- **interaction**: simvastatin is metabolised by CYP3A4, which amlodipine weakly inhibits. UK advice since 2012 limits simvastatin to 20 mg daily with amlodipine, so his exposure has risen;
- **untreated hypothyroidism**, an established risk factor for statin myopathy;
- age and, possibly, intense exercise. Genetic variants in the hepatic uptake transporter (SLCO1B1) also increase the risk with simvastatin.

Management principles: stop the statin, assess hydration and kidney function, and repeat the CK; treat the hypothyroidism. Once recovered, statin therapy is reconsidered given his cardiovascular risk, typically using a lower dose or a statin less dependent on CYP3A4 (such as atorvastatin at an appropriate dose, or rosuvastatin or pravastatin), with the thyroid treated first. Most people who report muscle symptoms on statins in trials report them at similar rates on placebo, so true myopathy like his should be distinguished from non-specific aches, which do not justify abandoning a beneficial drug without careful assessment.
:::
:::

## Recognising, assessing and reporting {#sec-causality}

Deciding whether a drug caused a particular event is often uncertain. Clinicians look for the same features that a formal assessment uses.

::: definition Causality assessment and pharmacovigilance {#def-adr-causality}
**Causality assessment** weighs the evidence that a drug caused an event:

- **timing**: did the event follow the drug at a plausible interval?
- **dechallenge**: did it improve when the drug was stopped or the dose reduced?
- **rechallenge**: did it recur on re-exposure? (Rechallenge is rarely deliberate, because it can be dangerous.)
- **alternative causes**: could the disease itself or another drug explain it?
- **plausibility and prior knowledge**: is the reaction known for this drug or class, and is there supporting evidence such as a drug level?

Structured tools turn these into categories. The **Naranjo algorithm** scores ten questions; a total of 9 or more is "definite", 5 to 8 "probable", 1 to 4 "possible" and 0 or less "doubtful". The WHO–Uppsala Monitoring Centre system uses descriptive categories from "certain" to "unlikely".

**Pharmacovigilance** is the science and activities of detecting, assessing, understanding and preventing adverse effects of medicines after they are marketed. Its main tool is **spontaneous reporting**, in which health professionals and patients report suspected reactions to a regulator: in the UK, the MHRA's **Yellow Card scheme**. Reports are pooled and analysed for **signals**: possible new associations or new aspects of known ones that justify further investigation.
:::

Spontaneous reporting is needed because clinical trials are too small and too short to detect rare reactions. A useful approximation, the **rule of three**, says that if no events occur among $n$ people, the upper limit of the 95% confidence interval for the event rate is about $3/n$. A trial programme of 3,000 patients with no cases of a reaction can therefore rule out a frequency of more than about 1 in 1,000, but cannot exclude a reaction occurring in 1 in 10,000, which would still be important for a widely used drug.

In the UK, new medicines and existing medicines with new indications or formulations carry an inverted **black triangle** (▼) in the product information and BNF for the period of additional monitoring. All suspected reactions to them should be reported. For established medicines, reports should be made for serious reactions, those in children, and those to herbal products. Reporting does not require certainty that the drug was responsible.

To detect signals in large databases, regulators compare how often a reaction is reported with a drug against how often it is reported with all other drugs. One simple measure is the **proportional reporting ratio** (PRR):

$$
PRR = \frac{a/(a+b)}{c/(c+d)},
$$ {#eq-prr}

where $a$ is the number of reports of the reaction of interest with the drug, $b$ the number of other reactions reported with the drug, and $c$ and $d$ the corresponding numbers for all other drugs. A PRR well above 1, based on enough reports, is a signal, not proof: reporting is affected by publicity, by how new the drug is and by who uses it.

::: example Calculating a proportional reporting ratio {#ex-prr}
A regulator's database holds 1,000 reports for a new antidiabetic drug, of which 20 describe acute pancreatitis. For all other drugs combined there are 100,000 reports, of which 200 describe acute pancreatitis. Calculate the PRR and interpret it.
::: solution
From [[#eq-prr]]: $a = 20$, $a + b = 1000$, $c = 200$, $c + d = 100{,}000$.

$$
PRR = \frac{20/1000}{200/100{,}000} = \frac{0.02}{0.002} = 10.
$$

Pancreatitis makes up a tenfold greater share of reports for this drug than for others. That is a signal worth investigating. It does not establish causation or give the true incidence. Alternative explanations include confounding by indication (people with type 2 diabetes have a higher background risk of pancreatitis, through obesity, hypertriglyceridaemia and gallstones) and stimulated reporting after publicity. Investigation would involve case review, analysis of trial data and pharmacoepidemiological studies, such as cohort studies in electronic health records ([[epidemiology-ebm/observational-studies]]).
:::
:::

::: example Monitoring for a known serious reaction {#ex-clozapine-adr}
A 27-year-old man with schizophrenia that has not responded to two other antipsychotics is to start clozapine. Explain the serious adverse reactions that shape his monitoring, and classify them.
::: solution
Clozapine is the most effective treatment for treatment-resistant schizophrenia, but has three serious adverse reactions that shape its use.

- **Neutropenia and agranulocytosis** (type B; immune-mediated mechanisms are suspected). Agranulocytosis occurs in under 1% of people, mostly in the first 18 weeks. In the UK, clozapine can be dispensed only with registration on a monitoring service: blood counts weekly for the first 18 weeks, then every two weeks to one year, then monthly, with set thresholds for interrupting treatment. He should be told to report sore throat or fever immediately.
- **Myocarditis and cardiomyopathy**. Myocarditis is most common in the first two months; monitoring of symptoms, observations and markers such as troponin and C-reactive protein in the first weeks is recommended by many services.
- **Constipation and gastrointestinal hypomotility** (type A, from antimuscarinic effects), which can progress to ileus and bowel obstruction and has caused deaths. The MHRA has issued safety warnings about this. Bowel habit is asked about at every review, and laxatives are used early.

Other dose-related effects include sedation, hypersalivation, weight gain, seizures at higher levels, and the smoking interaction with CYP1A2 ([[pharmacology/metabolism-excretion]]). The case shows how known reactions are managed by structured monitoring rather than avoidance, when the benefit is large ([[psychiatry/psychotic-disorders]]).
:::
:::

::: quiz
A 66-year-old man taking long-term prednisolone 20 mg daily for polymyalgia rheumatica stops it suddenly on holiday after losing his tablets. Three days later he is hypotensive, vomiting and confused, with a sodium of 128 mmol/L. In the extended Rawlins–Thompson scheme, this reaction is best classified as:
- [ ] Type A (augmented)
- [ ] Type B (bizarre)
- [ ] Type D (delayed)
- [x] Type E (end of use)
::: solution
Long-term glucocorticoids suppress the hypothalamic–pituitary–adrenal axis, so the adrenal glands cannot respond when the drug is stopped suddenly. The resulting adrenal crisis is a withdrawal (end-of-use) reaction, type E. It is prevented by tapering, steroid emergency cards and sick-day rules, and treated urgently with parenteral hydrocortisone ([[endocrine/adrenal]]).
:::
:::

::: history
Modern drug regulation grew from disasters. In 1937 more than a hundred people in the United States died after taking an "elixir" of sulfanilamide dissolved in diethylene glycol, a toxic solvent; the following year the Federal Food, Drug, and Cosmetic Act required evidence of safety before marketing. Thalidomide, marketed from 1957 as a sedative and for morning sickness, caused severe limb malformations (phocomelia) in thousands of babies; the link was reported by William McBride in Australia and Widukind Lenz in Germany in 1961, and the drug was withdrawn. In the UK this led to the Committee on Safety of Drugs, chaired by Sir Derrick Dunlop, which began the Yellow Card scheme in 1964, and to the Medicines Act 1968. The WHO Programme for International Drug Monitoring started in 1968, and its database is now held by the Uppsala Monitoring Centre. In the US, Frances Kelsey at the Food and Drug Administration had refused to approve thalidomide, and the Kefauver–Harris amendments of 1962 added a requirement for proof of efficacy as well as safety. The A and B classification of reactions was published by Michael Rawlins and John Thompson in 1977.
:::

::: summary
- An adverse drug reaction is a noxious, unintended response to a medicine; ADRs contribute to a substantial share of hospital admissions, mostly through common drugs.
- Type A reactions are predictable, dose-related and common; type B are unpredictable and often immunological; types C to F cover chronic, delayed, end-of-use and failure reactions. DoTS describes dose, time and susceptibility.
- Drug allergies follow the Gell–Coombs types. SJS/TEN, DRESS and AGEP are severe cutaneous reactions that require immediate withdrawal of the drug. Some are linked to HLA alleles.
- Many penicillin allergy labels are inaccurate; precise documentation and de-labelling improve care.
- Pharmacokinetic interactions alter drug concentrations; pharmacodynamic interactions combine effects on bleeding, QT interval, serotonin, potassium, sedation and kidney perfusion.
- Causality is judged by timing, dechallenge, rechallenge, alternatives and prior knowledge. Spontaneous reporting (Yellow Card) and signal detection find rare reactions that trials miss; the rule of three shows why.
:::

## Where this leads

Genetic and physiological susceptibility to adverse reactions is covered in [[pharmacology/patient-variation]], and the systems that make prescribing safer, including trials, regulation and error prevention, in [[pharmacology/drug-development-prescribing]]. Poisoning is covered in [[emergency-critical-care/poisoning]], drug allergy mechanisms in [[immunology/hypersensitivity]], and polypharmacy in older people in [[geriatrics-palliative/polypharmacy]].

## Exercises

::: exercise Classify the reaction {level=1}
Using the extended Rawlins–Thompson scheme, classify: (a) hypoglycaemia in a person taking gliclazide who skipped a meal; (b) anaphylaxis to a first dose of co-amoxiclav; (c) tardive dyskinesia after years of an antipsychotic; (d) seizures after abrupt withdrawal of a benzodiazepine; (e) an unplanned pregnancy in a woman taking a combined pill with carbamazepine.
::: solution
(a) Type A: an extension of the drug's glucose-lowering action. (b) Type B: immune-mediated (type I hypersensitivity), not predictable from pharmacology. (c) Type C: related to long-term cumulative exposure. (d) Type E: end-of-use (withdrawal) reaction. (e) Type F: failure of therapy due to enzyme induction.
:::
:::

::: exercise Match the hypersensitivity type {level=1}
Assign a Gell–Coombs type to each: (a) urticaria and wheeze within 10 minutes of intravenous cefuroxime; (b) a falling platelet count and new thrombosis 7 days after starting heparin; (c) fever, arthralgia and rash two weeks after a course of an antibiotic, with low complement; (d) an itchy eczematous rash where a topical antibiotic was applied.
::: solution
(a) Type I (IgE-mediated). (b) Type II (antibodies against heparin–platelet factor 4 complexes causing platelet activation: heparin-induced thrombocytopenia). (c) Type III (immune complexes; a serum sickness-like reaction). (d) Type IV (T-cell-mediated contact dermatitis).
:::
:::

::: exercise The rule of three {level=1 check="0.2"}
In the trials of a new drug, 1,500 patients were treated and none developed a particular serious liver reaction. Using the rule of three, what is the approximate upper limit of the 95% confidence interval for the incidence, expressed as a percentage? Give the exact value.
::: solution
$3/1500 = 0.002 = 0.2\%$. The data are consistent with an incidence as high as about 1 in 500, so the absence of cases in trials gives only limited reassurance.
:::
:::

::: exercise A disproportionality signal {level=2 check="10"}
A spontaneous reporting database contains 1,000 reports for drug X, 20 of them describing a particular reaction. For all other drugs there are 100,000 reports, 200 of them describing that reaction. Calculate the proportional reporting ratio. Give the exact value.
::: hint
Use [[#eq-prr]]: compare the proportion of reports for drug X with the proportion for all other drugs.
:::
::: solution
$PRR = (20/1000)/(200/100{,}000) = 0.02/0.002 = 10$. This is a signal for further investigation, not evidence of causation.
:::
:::

::: exercise Scoring causality {level=2 check="7"}
A woman develops hepatitis 3 weeks after starting a drug. Use these Naranjo item scores: previous conclusive reports of this reaction (+1); event appeared after the drug was given (+2); improved after the drug was stopped (+1); not re-challenged (0); no alternative causes found after investigation (+2); no placebo given (0); drug level not measured (0); no dose change made (0); no previous exposure (0); confirmed by objective evidence (liver biopsy) (+1). What is the total score, and what category does it fall into?
::: solution
$1 + 2 + 1 + 0 + 2 + 0 + 0 + 0 + 0 + 1 = 7$. A score of 5 to 8 is "probable".
:::
:::

::: exercise Number needed to harm {level=2 check="100"}
In a randomised trial, 2% of patients on a new drug and 1% on placebo developed a serious adverse event over a year. What is the number needed to harm over one year?
::: solution
Absolute risk increase $= 0.02 - 0.01 = 0.01$. Number needed to harm $= 1/0.01 = 100$: for every 100 people treated for a year, one extra person has the event. This is weighed against the number needed to treat for benefit ([[epidemiology-ebm/randomised-trials]]).
:::
:::

::: exercise An agitated patient after a new painkiller {level=3}
A 45-year-old woman taking sertraline for depression is prescribed tramadol for back pain. Two days later she is agitated and sweating, with a temperature of 38.6 °C, pulse 118/min, dilated pupils, tremor, inducible ankle clonus and brisk reflexes more marked in the legs. (a) What is the likely diagnosis and mechanism? (b) What features distinguish it from neuroleptic malignant syndrome and from anticholinergic toxicity? (c) Outline the principles of management and prevention.
::: hint
Look at the neuromuscular findings and the skin.
:::
::: solution
(a) Serotonin syndrome, a pharmacodynamic interaction. Sertraline inhibits serotonin reuptake; tramadol also inhibits serotonin (and noradrenaline) reuptake as well as acting on opioid receptors. Together they increase serotonergic activity, particularly at 5-HT₂A receptors in the brainstem and spinal cord. (Sertraline is not a strong CYP2D6 inhibitor, but strong inhibitors such as fluoxetine or paroxetine also raise tramadol levels.)

(b) Serotonin syndrome develops within hours to a day or two of the change, with neuromuscular hyperactivity (clonus, hyperreflexia, tremor), especially in the legs, and sweating, diarrhoea and dilated pupils. Neuroleptic malignant syndrome develops over days after a dopamine antagonist is started or increased, with "lead-pipe" rigidity, bradykinesia, high temperature and very high CK, without clonus. Anticholinergic toxicity also causes agitation, fever and dilated pupils, but the skin is dry, bowel sounds reduced and reflexes normal.

(c) Stop the serotonergic drugs, give supportive care (fluids, cooling, benzodiazepines for agitation), and seek specialist advice for severe cases, in which a 5-HT₂A antagonist may be used and intensive care may be needed for high temperature. Prevention: check interactions before prescribing; prefer an analgesic without serotonergic action in someone on an SSRI, and warn people about over-the-counter and herbal products with serotonergic effects, such as St John's wort.
:::
:::

::: exercise Hyperkalaemia in a frail man {level=3}
An 83-year-old man with heart failure takes ramipril 10 mg daily and spironolactone 25 mg daily, and his potassium has been 5.0–5.3 mmol/L. He is given a course of trimethoprim for a urinary tract infection. Four days later his potassium is 6.8 mmol/L and creatinine has risen from 130 to 165 µmol/L. ECG shows peaked T waves. (a) Explain how each drug contributes to the hyperkalaemia. (b) Why might his creatinine rise even without a true fall in GFR? (c) What system-level changes could prevent this?
::: solution
(a) Ramipril reduces angiotensin II and hence aldosterone secretion, reducing potassium secretion in the collecting duct. Spironolactone blocks the mineralocorticoid receptor, with the same effect. Trimethoprim blocks the epithelial sodium channel (ENaC) in the collecting duct, like amiloride, which removes the electrical gradient that drives potassium secretion. Three drugs act on one pathway in sequence: a pharmacodynamic interaction in a person with little reserve, on top of age-related decline in kidney function.

(b) Trimethoprim also inhibits the tubular secretion of creatinine, so serum creatinine rises by a modest amount without a fall in GFR. Some of the rise may be this artefact; some may be true kidney injury from infection and dehydration. Both need assessment.

(c) Treat the hyperkalaemia as an emergency with ECG changes, following local protocol. Prevention: choose an alternative antibiotic for people taking renin–angiotensin–aldosterone blockers and potassium-sparing diuretics where local guidelines allow, or check potassium within a few days if trimethoprim is essential; use electronic prescribing alerts for high-risk combinations; involve pharmacists in reviewing new prescriptions for people taking several medicines; and give sick-day guidance for ACE inhibitors and spironolactone. Each prevention step addresses a type A reaction predictable from pharmacology.
:::
:::
