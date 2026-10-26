The licensed dose of a medicine is chosen to work for a typical adult in a clinical trial. Real patients are rarely typical. A newborn baby cannot yet conjugate many drugs; an 88-year-old has a fraction of the kidney function she had at 30; a woman in the third trimester of pregnancy clears some drugs twice as fast as before; a person with an inherited variant of one enzyme may turn a standard dose of codeine into a dangerous amount of morphine. The same dose can therefore produce very different concentrations and effects.

This chapter organises these differences. Variation arises from **pharmacokinetics**, when the same dose gives a different concentration, and from **pharmacodynamics**, when the same concentration gives a different effect. It also arises from whether the medicine is taken at all. The chapter covers body size, age and organ function, genetic variation, pregnancy and breastfeeding, and adherence, and shows how each is used in prescribing. It builds on [[pharmacology/dosing-principles]], [[pharmacology/metabolism-excretion]] and [[pharmacology/absorption-distribution]].

## Body size, age and organ function {#sec-body}

::: definition Sources of variation in drug response {#def-body}
Differences between patients in response to the same dose arise from:

- **absorption**: gut function, food, interacting drugs, first-pass metabolism;
- **distribution**: body size and composition (water, fat, muscle), plasma proteins;
- **elimination**: liver and kidney function, enzyme activity (genetic and induced or inhibited);
- **sensitivity**: receptor number and function, homeostatic reserve, disease of the target organ;
- **adherence**: whether, when and how the medicine is taken.

For any individual, the prescriber asks which of these is likely to differ from the population in which the dose was established, and in which direction.
:::

### Children

Children are not small adults. In **neonates**, especially preterm babies, total body water is a larger fraction of weight, so water-soluble drugs have a larger volume of distribution per kilogram. Plasma albumin is lower and binding sites may be occupied by bilirubin. Glucuronidation is immature, which caused the "grey baby syndrome" when chloramphenicol was given at doses scaled down from adults, and glomerular filtration is low, so renally excreted drugs such as gentamicin need longer dosing intervals. Over the first months these functions mature quickly. Young children then metabolise many drugs *faster* per kilogram than adults, because the liver is large relative to body weight.

Doses in children are therefore usually based on **body weight** (mg/kg) or, for some drugs such as cytotoxic agents, **body surface area**, and are checked against maximum adult doses. In the UK the BNF for Children (BNFC) gives doses by age band and weight. Many medicines have never been licensed for children, so prescribing outside the licence is common and accepted when based on evidence and guidance. Some drugs are specifically restricted: since 2013 the MHRA has contraindicated codeine for pain in children under 12 years, and in children under 18 after removal of tonsils or adenoids for obstructive sleep apnoea, because of deaths from respiratory depression in children who were CYP2D6 ultrarapid metabolisers ([[paediatrics/acute-childhood-illness]]).

::: example A weight-based dose {#ex-paed-dose}
A 4-year-old boy weighing 18 kg has a fever and is distressed. His parent asks how much paracetamol oral suspension to give. Using an illustrative single dose of 15 mg/kg, calculate the dose, and state the checks that apply.
::: solution
Dose $= 15 \times 18 = 270$ mg. The checks that follow are as important as the arithmetic.

- **Compare with age-band dosing and the maximum.** Product labels and the BNFC give doses by age band; the weight-based dose should not exceed the adult maximum single dose, and total daily doses and the interval between doses must be respected.
- **Convert to volume carefully.** With a 120 mg/5 mL suspension, 270 mg is 11.25 mL; with a 250 mg/5 mL suspension it is 5.4 mL. Confusion between strengths is a recognised cause of overdose in children.
- **Use the right weight.** A measured, recent weight; in an obese child, an adjusted or ideal weight may be appropriate for some drugs.
- **Check other sources of the same drug**, such as combination cold remedies.

All of these follow current BNFC and product information. The principle is that a calculated dose is a starting point, not a final answer.
:::
:::

### Older people

Ageing changes almost every step of pharmacokinetics, and sensitivity too.

- **Kidney function** declines with age, even when serum creatinine is normal, because muscle mass and creatinine production fall. Renally excreted drugs, such as digoxin, lithium, gabapentin and direct oral anticoagulants, accumulate unless doses are adjusted ([[pharmacology/dosing-principles]]).
- **Body composition** changes: fat increases and total body water falls. Lipid-soluble drugs such as diazepam have a larger volume of distribution and a much longer half-life; water-soluble drugs reach higher concentrations.
- **Liver blood flow and mass** fall, reducing the clearance of high-extraction drugs and increasing their bioavailability.
- **Sensitivity** increases for drugs acting on the brain (benzodiazepines, opioids, antimuscarinics), and homeostatic reserve falls, so antihypertensives cause postural hypotension and falls more readily.

Older people also take the most medicines. Polypharmacy multiplies interactions and adverse effects, and tools such as the STOPP/START criteria (version 3 published in 2023) list potentially inappropriate medicines and potentially omitted beneficial ones. Structured medication review, deprescribing where benefit no longer outweighs harm, and attention to the person's priorities are covered in [[geriatrics-palliative/polypharmacy]].

### Body weight and obesity

Which weight to use depends on where the drug distributes and how it is cleared. Three measures are used:

- **total body weight** (TBW), the measured weight;
- **ideal body weight** (IBW), estimated from height; one common formula (Devine) gives IBW = 50 kg (men) or 45.5 kg (women) plus 2.3 kg for each inch above 5 feet;
- **adjusted body weight**, often calculated as IBW + 0.4 × (TBW − IBW), used for some drugs that distribute partly into excess tissue.

Hydrophilic drugs such as aminoglycosides distribute mainly in lean tissue and extracellular water, so dosing on total weight in obesity overdoses them; adjusted weight is commonly used. For some lipophilic drugs the volume of distribution increases with total weight, which affects loading doses. Low molecular weight heparins are dosed on total weight, sometimes with caps or anti-Xa monitoring at extremes. These rules are drug-specific and follow the product information and local guidance.

### Liver, kidney and heart disease

**Kidney impairment** was covered in [[pharmacology/dosing-principles]]: it reduces clearance of renally excreted drugs and active metabolites (morphine-6-glucuronide, for example), and increases sensitivity to some drugs, such as the risk of hyperkalaemia with potassium-sparing drugs.

**Liver disease** is harder to quantify, because no single blood test measures drug-metabolising capacity. The Child–Pugh score is used as a rough guide. Several effects combine: reduced metabolism of low-extraction drugs, increased bioavailability of high-extraction drugs through portosystemic shunting, low albumin, and increased sensitivity. Sedatives and opioids can precipitate hepatic encephalopathy; NSAIDs can cause kidney injury, gastrointestinal bleeding and fluid retention in cirrhosis with ascites; and drugs that impair clotting add to the coagulopathy of liver failure.

**Heart failure** reduces liver blood flow, slowing the clearance of high-extraction drugs such as lidocaine, and causes gut oedema that may reduce oral absorption of diuretics. Diuretics given intravenously are therefore sometimes more effective in decompensated heart failure.

## Genetic variation {#sec-pgx}

::: definition Pharmacogenetics and metaboliser phenotypes {#def-pgx}
**Pharmacogenetics** is the study of how inherited variants in single genes affect drug response; **pharmacogenomics** extends this to the whole genome. Variants act in three main ways:

- on **drug-metabolising enzymes or transporters**, changing concentration (for example CYP2D6, CYP2C19, CYP2C9, TPMT, NUDT15, DPYD, SLCO1B1);
- on **drug targets**, changing sensitivity (for example VKORC1 for warfarin);
- on the **immune system** (HLA alleles) or on cellular vulnerability (G6PD, RYR1, mitochondrial DNA), causing idiosyncratic reactions.

For enzymes, people are grouped by **metaboliser phenotype**: **poor** (little or no enzyme activity), **intermediate**, **normal** and **ultrarapid** (increased activity, for example from extra copies of *CYP2D6*). The consequence depends on whether the drug is inactivated or activated by the enzyme. A poor metaboliser accumulates an active drug but gets little effect from a prodrug; an ultrarapid metaboliser does the reverse.
:::

The table lists the gene–drug pairs with the clearest clinical consequences. Several are now tested routinely in the UK.

| Gene | Drugs | Effect of variant | Practice |
|---|---|---|---|
| *CYP2D6* | Codeine, tramadol (prodrugs) | Ultrarapid: excess morphine, respiratory depression. Poor: little analgesia | Codeine restrictions in children and breastfeeding |
| *CYP2C19* | Clopidogrel (prodrug) | Loss-of-function alleles: less active metabolite, more recurrent events | NICE (2024) recommends testing to guide clopidogrel use after ischaemic stroke or TIA |
| *TPMT*, *NUDT15* | Azathioprine, mercaptopurine | Low activity: severe myelosuppression at standard doses | TPMT activity or genotype checked before starting |
| *DPYD* | Fluorouracil, capecitabine | DPD deficiency: severe or fatal toxicity | Testing before starting has been standard in the UK since 2020 |
| *HLA-B\*57:01* | Abacavir | Hypersensitivity reaction | Test before prescribing; do not prescribe if positive |
| *HLA-B\*15:02* | Carbamazepine, phenytoin | SJS/TEN | Test people of Han Chinese, Thai and some other South-east Asian ancestry before carbamazepine |
| *HLA-B\*58:01* | Allopurinol | SJS/TEN, DRESS | Higher frequency in some Asian populations; testing in some settings |
| *G6PD* | Primaquine, dapsone, rasburicase, nitrofurantoin | Haemolysis | Test before primaquine and rasburicase |
| *MT-RNR1* (m.1555A>G) | Aminoglycosides | Profound hearing loss after even one dose | NICE (2023) conditionally recommends rapid testing in neonatal units |
| *RYR1*, *CACNA1S* | Volatile anaesthetics, suxamethonium | Malignant hyperthermia | Family history; specialist testing |
| *BCHE* | Suxamethonium, mivacurium | Prolonged apnoea | Family history; enzyme activity testing |
| *CYP2C9*, *VKORC1* | Warfarin | Higher sensitivity, lower dose needed | Dose by INR; genotype-guided algorithms exist |

The frequency of each variant differs between populations, which is one reason why ancestry appears in prescribing guidance. That does not make ancestry a substitute for testing: individuals vary within every population, and self-reported ancestry is an imperfect guide to genotype.

::: example Codeine and the breastfed baby {#ex-codeine-um}
A 31-year-old woman is prescribed codeine with paracetamol for pain after a caesarean section and is breastfeeding. On day 7, her baby is very sleepy and feeding poorly. Explain how her genotype could be responsible, and what the safety rule is.
::: solution
Codeine is a prodrug: about 5 to 10% of a dose is O-demethylated by CYP2D6 to morphine, which provides most of its analgesic effect. Some people carry extra functional copies of *CYP2D6* and are **ultrarapid metabolisers**; they convert more codeine to morphine, more quickly. In a breastfeeding mother this can produce morphine concentrations in milk high enough to cause sedation and respiratory depression in the baby, whose own clearance of morphine is immature. A widely reported neonatal death in 2006 involved exactly this combination.

The baby needs urgent medical assessment. The MHRA advises that codeine should not be used by breastfeeding mothers, and it is contraindicated for pain in children under 12. Alternatives for the mother include paracetamol, ibuprofen and, where an opioid is needed, short courses of drugs that do not depend on CYP2D6 activation, at the lowest effective dose and with monitoring of the baby. Because the frequency of ultrarapid metabolisers is higher in some populations (for example in parts of North Africa and the Middle East), a "normal" dose is riskier for some groups than others.
:::
:::

::: example The thiopurine dilemma {#ex-thiopurine-pgx}
A 35-year-old man with Crohn's disease is to start azathioprine. His TPMT activity is reported as absent (homozygous deficiency). What would happen at a standard dose, and what are the options? If the population frequency of non-functional TPMT alleles is 5%, what proportion of people would be expected to be homozygous deficient, and what proportion heterozygous?
::: solution
Azathioprine is converted to mercaptopurine, which is either inactivated (by TPMT methylation and by xanthine oxidase) or converted to active thioguanine nucleotides ([[pharmacology/metabolism-excretion]]). With no TPMT activity, a standard dose produces very high thioguanine nucleotide levels and severe, potentially fatal, bone marrow suppression within weeks. The options are to avoid thiopurines and choose another drug, or, under specialist supervision, to use a drastically reduced dose with close monitoring. People with intermediate activity usually start at a reduced dose. Even with normal TPMT activity, regular blood monitoring continues, because other factors (including *NUDT15* variants, which are more common in people of East Asian ancestry) also cause toxicity.

Under Hardy–Weinberg equilibrium with allele frequency $q = 0.05$ and $p = 0.95$: homozygous deficient $= q^2 = 0.0025$ (about 1 in 400); heterozygous $= 2pq = 0.095$ (about 1 in 10). The observed figures in European populations, roughly 1 in 300 with very low activity and about 1 in 10 with intermediate activity, are close to this.
:::
:::

The figure shows why metaboliser status matters for an active drug cleared by a polymorphic enzyme.

::: widget plot
f: 10*exp(-0.15*x); 10*exp(-0.15*u*x)
x: 0, 48
y: 0, 10
sliders: u=0.25:0.1:3:0.05
labels: \text{normal metaboliser}; \text{clearance} \times u
caption: Illustrative plasma concentration (mg/L) against time (hours) after a single intravenous dose, for a normal metaboliser and for a person whose clearance is $u$ times normal. Set $u$ to about 0.25 to imitate a poor metaboliser: the half-life quadruples, and with repeated dosing the steady-state level would also be four times higher. Set $u$ above 1 for an ultrarapid metaboliser. For a prodrug the clinical consequences are reversed, because the enzyme makes the active drug. This is a simplified one-compartment model.
:::

::: example A family history before anaesthesia {#ex-mh-family}
A 23-year-old woman is listed for a laparoscopic appendicectomy. At the pre-operative assessment she mentions that her uncle "nearly died under anaesthetic with a high temperature" and that her cousin was later tested. What is the likely condition, how is it inherited, and what are the principles for her anaesthetic?
::: solution
The history suggests **malignant hyperthermia** (MH), a pharmacogenetic disorder of skeletal muscle calcium regulation, usually caused by variants in *RYR1* (the ryanodine receptor of the sarcoplasmic reticulum) or, less often, *CACNA1S*. It is inherited as an autosomal dominant trait with variable penetrance, so she may carry it even if her parents have never had a reaction. In susceptible people, volatile anaesthetic agents and suxamethonium trigger uncontrolled calcium release in muscle, causing rising end-tidal CO₂, tachycardia, muscle rigidity, hyperthermia, hyperkalaemia, acidosis and rhabdomyolysis. Untreated, it can be fatal; dantrolene, which reduces calcium release from the sarcoplasmic reticulum, is the specific treatment.

Principles: she should be treated as MH-susceptible until proven otherwise. The anaesthetic should avoid all triggering agents (using total intravenous anaesthesia and non-depolarising neuromuscular blockers), with a vapour-free anaesthetic machine, monitoring of temperature and end-tidal CO₂, and dantrolene available. She and her relatives should be referred to the UK MH investigation service for testing and counselling, and the result recorded clearly. Her surgery should not be delayed for testing if it is urgent; safe anaesthesia is possible without triggers ([[surgery/anaesthesia-pain]]).
:::
:::

## Pregnancy and breastfeeding {#sec-pregnancy}

::: definition Prescribing in pregnancy and breastfeeding {#def-context}
Pregnancy changes pharmacokinetics in predictable directions:

- plasma volume and total body water increase, and albumin falls;
- glomerular filtration rises by about 50%, increasing clearance of renally excreted drugs such as lithium and many antibiotics;
- activity of some enzymes rises (CYP3A4, CYP2D6, UGT1A4, which glucuronidates lamotrigine) and of others falls (CYP1A2, CYP2C19).

The effects of a drug on the **fetus** depend on timing:

- in the first two weeks after conception, exposure tends to have an "all or nothing" effect: loss of the pregnancy or normal development;
- in the **embryonic period** (about weeks 3 to 8 after conception) organs form, and this is the main period of risk for structural malformations;
- in the **fetal period**, drugs can affect growth and function, for example ACE inhibitors and angiotensin receptor blockers impairing fetal kidney function, and NSAIDs in the third trimester causing premature closure of the ductus arteriosus.

In **breastfeeding**, most drugs pass into milk in small amounts. The infant's exposure depends on the concentration in milk and on the infant's own clearance, which is limited in premature and newborn babies.
:::

A **teratogen** is a substance that can cause structural or functional abnormality in the embryo or fetus. Well-established examples include **sodium valproate**, which causes major malformations in around 10% of exposed pregnancies and neurodevelopmental disorders in up to 30 to 40% of children exposed in the womb; isotretinoin; warfarin (in early pregnancy); methotrexate and mycophenolate; and some antiepileptics, to a lesser degree. Because of the scale of harm from valproate, the MHRA requires a **Pregnancy Prevention Programme** for anyone able to become pregnant, and since 2024 valproate should not be started in anyone under 55 years unless two specialists independently agree that there is no other effective or tolerated treatment. Equivalent precautions apply to isotretinoin and some other drugs.

Many illnesses must still be treated in pregnancy, and untreated epilepsy, depression, asthma or hypertension can harm both mother and baby. The principles are to plan pregnancy where possible, use the drug with the most experience of safe use at the lowest effective dose, avoid starting new drugs in the first trimester unless necessary, and use specialist resources such as the UK Teratology Information Service and the BNF ([[obstetrics-gynaecology/pregnancy-antenatal]]).

::: example A seizure in the third trimester {#ex-lamotrigine-pp}
A 29-year-old woman with epilepsy has been seizure-free for three years on lamotrigine 200 mg daily, with a pre-pregnancy level of 6 mg/L. At 32 weeks of pregnancy she has her first seizure in years. Her lamotrigine level is 2.4 mg/L, and she has taken every dose. Explain the change, estimate the dose that would restore her previous level (assuming linear kinetics), and explain the main risk after delivery.
::: solution
Lamotrigine is cleared mainly by glucuronidation (UGT1A4), whose activity is increased by the high oestrogen levels of pregnancy. Increased GFR contributes slightly. Clearance commonly rises two- to threefold by the third trimester, so concentration falls at a fixed dose.

At steady state, concentration is proportional to dose divided by clearance ([[pharmacology/dosing-principles]]). Her level has fallen by a factor of $6/2.4 = 2.5$, so clearance has risen about 2.5-fold. To restore 6 mg/L: dose $\approx 200 \times 6/2.4 = 500$ mg daily. In practice the dose is increased in steps under specialist care, with levels monitored through pregnancy.

After delivery, oestrogen levels fall within days and lamotrigine clearance returns towards normal over a few weeks. If the raised dose is continued, her level could rise to about 2.5 times the target, with dizziness, double vision and ataxia, at a time when she is caring for a newborn. A planned postpartum dose reduction, with levels checked, is therefore part of the plan. Sleep deprivation after birth also raises seizure risk, and safety advice for bathing and carrying the baby is given ([[nervous-system/epilepsy]]).
:::
:::

::: warning Weight-based doses can overshoot
Calculating a child's dose from mg/kg is safe only if the result is compared with the adult maximum. An adolescent weighing 80 kg would receive a weight-based dose larger than the adult dose of many drugs. The same applies to adults with obesity: total body weight overestimates the right dose of hydrophilic drugs. Always cap a weight-based dose at the recommended maximum, and choose the correct weight measure for the drug.
:::

## Adherence and other factors {#sec-adherence}

The largest source of variation in response is often whether the medicine is taken. For long-term treatments, the WHO has estimated that about half of people in high-income countries do not take their medicines as prescribed. **Non-adherence** may be intentional (because of side effects, beliefs about the medicine or doubts about need) or unintentional (forgetting, complex regimens, difficulty opening packs or using inhalers, cost). A poor response should prompt a non-judgemental conversation about how the medicine is actually taken before the dose is increased or another drug added. Simplifying regimens, aligning medicines with the person's priorities, and involving pharmacists all help ([[clinical-skills/communication]]).

Other factors also matter. Diet and smoking change enzyme activity (tobacco and CYP1A2). Disease of the target organ changes sensitivity: people with hypothyroidism are more sensitive to opioids, and people with hypokalaemia more sensitive to digoxin. Response can differ on average between population groups, as when UK hypertension guidance recommends a calcium channel blocker rather than an ACE inhibitor as first choice for people of Black African or African-Caribbean family origin, partly because of differences in average response and a higher risk of ACE inhibitor angioedema. Such recommendations describe group averages, not individuals.

::: quiz
An 86-year-old woman has been taking diazepam 5 mg at night for years. She falls and fractures her hip. Which combination of changes with age best explains her increased risk from this drug?
- [ ] Faster metabolism and lower brain sensitivity
- [x] A larger volume of distribution for this lipophilic drug and slower clearance, giving a much longer half-life, together with greater sensitivity of the ageing brain
- [ ] Lower volume of distribution and faster renal excretion
- [ ] Higher plasma albumin increasing the free fraction
::: solution
With age, body fat increases, enlarging the volume of distribution of lipophilic drugs such as diazepam, and hepatic oxidative metabolism slows. Both lengthen the half-life ($t_{1/2} = 0.693\,V_d/CL$), and its active metabolite desmethyldiazepam accumulates further. At the same time the older brain is more sensitive to benzodiazepines, increasing sedation, confusion and falls. STOPP criteria advise against long-term benzodiazepines in older people.
:::
:::

::: history
The idea that inherited differences explain unusual drug responses dates from the 1950s. Primaquine-sensitive haemolysis in some soldiers was traced to glucose-6-phosphate dehydrogenase deficiency in 1956, and prolonged apnoea after suxamethonium to inherited variants of plasma cholinesterase in the same decade. Wendell Price Evans showed in 1960 that people fall into slow and fast acetylators of isoniazid. Arno Motulsky argued in 1957 that such inherited variation could explain many unexpected reactions, and Friedrich Vogel coined the word "pharmacogenetics" in 1959. In the 1970s Robert Smith in London, who became ill after taking debrisoquine in a study of his own design, and Michel Eichelbaum in Germany, studying sparteine, independently discovered the polymorphism later identified as *CYP2D6*. The thalidomide disaster, discussed in [[pharmacology/adverse-reactions]], made teratogenicity testing a requirement for new medicines.
:::

::: summary
- Variation in drug response arises from pharmacokinetics (the same dose gives a different concentration), pharmacodynamics (the same concentration gives a different effect) and adherence.
- Neonates have immature glucuronidation and renal function; young children metabolise many drugs fast; doses are based on weight or body surface area and capped at adult maxima.
- In older people, reduced kidney function, more body fat, slower hepatic clearance and greater sensitivity make standard doses riskier; medication review and deprescribing are central.
- Pharmacogenetic variants in metabolising enzymes, targets and HLA alleles change efficacy and safety; key UK tests include TPMT/NUDT15, DPYD, HLA-B*57:01, CYP2C19 for clopidogrel after stroke, and MT-RNR1 in neonates.
- Pregnancy increases the clearance of many drugs (lamotrigine, lithium) and exposes the fetus; teratogenic risk depends on timing. Valproate is strictly controlled.
- Obesity, liver and heart disease change distribution and clearance; non-adherence is common and should be explored before escalating treatment.
:::

## Where this leads

Prescribing for children is developed in [[paediatrics/acute-childhood-illness]], for older people in [[geriatrics-palliative/polypharmacy]], and in pregnancy in [[obstetrics-gynaecology/pregnancy-antenatal]]. Genetic testing in general is covered in [[genetics/genetic-testing]] and [[genetics/genomic-medicine]]. How evidence about different patient groups is gathered, and the systems that keep prescribing safe, are covered in [[pharmacology/drug-development-prescribing]].

## Exercises

::: exercise A weight-based dose {level=1 check="270"}
Using an illustrative dose of 15 mg/kg, what single dose (in mg) would be calculated for a child weighing 18 kg?
::: solution
$15 \times 18 = 270$ mg, to be checked against age-band dosing and the maximum dose in the BNFC.
:::
:::

::: exercise Frequency of poor metabolisers {level=1 check="4"}
In a population, the frequency of non-functional alleles of a drug-metabolising enzyme gene is 0.2. Assuming Hardy–Weinberg equilibrium and that only people with two non-functional alleles are poor metabolisers, what percentage of the population are poor metabolisers?
::: solution
$q^2 = 0.2^2 = 0.04$, which is **4%**.
:::
:::

::: exercise Kinetic or dynamic? {level=1}
State whether each is mainly a pharmacokinetic or a pharmacodynamic source of variation: (a) an older person's greater sedation from a given benzodiazepine level; (b) higher gentamicin troughs in kidney impairment; (c) falling lamotrigine levels in pregnancy; (d) greater sensitivity to warfarin in a person with a *VKORC1* variant; (e) high clozapine levels after stopping smoking.
::: solution
(a) Pharmacodynamic (increased brain sensitivity). (b) Pharmacokinetic (reduced renal clearance). (c) Pharmacokinetic (increased glucuronidation). (d) Pharmacodynamic (variation in the drug target, vitamin K epoxide reductase). (e) Pharmacokinetic (loss of CYP1A2 induction).
:::
:::

::: exercise Adjusted body weight {level=2 check="94.6"}
A man is 6 feet (72 inches) tall and weighs 120 kg. Using IBW = 50 + 2.3 × (inches above 60) and adjusted body weight = IBW + 0.4 × (TBW − IBW), calculate his adjusted body weight in kg to one decimal place.
::: solution
IBW $= 50 + 2.3 \times 12 = 77.6$ kg. Adjusted weight $= 77.6 + 0.4 \times (120 - 77.6) = 77.6 + 16.96 = 94.56$ kg, which is **94.6** kg to one decimal place.
:::
:::

::: exercise Timing of exposure in pregnancy {level=2}
A woman finds she is pregnant; by dates, conception was 5 weeks ago. During the past 5 weeks she has taken a drug suspected of causing structural malformations. Explain what the timing implies, and what the principles of further management are.
::: solution
The first two weeks after conception were the "all or nothing" period; the following three weeks fall within the embryonic period (weeks 3 to 8 after conception), when organs are forming and structural malformations can occur. Exposure during this window carries the main risk for such a drug.

Principles: stop or switch the drug only after weighing the risk of untreated illness (some conditions, such as epilepsy, must not be left untreated); seek specialist advice from teratology resources (in the UK, UKTIS) about the specific drug, dose and timing; offer counselling and appropriate antenatal screening, including a detailed anomaly scan; and avoid assuming harm, since most exposed pregnancies have normal outcomes even with known teratogens.
:::
:::

::: exercise An opioid prodrug {level=2}
Explain why codeine may give little pain relief to some people and be dangerous to others, with reference to CYP2D6 phenotypes. Why might a strong CYP2D6 inhibitor such as fluoxetine reduce the effect of codeine?
::: solution
Codeine is a prodrug activated to morphine by CYP2D6. Poor metabolisers, with no functional enzyme, form little morphine and get little analgesia. Ultrarapid metabolisers, often carrying extra gene copies, form more morphine faster, risking opioid toxicity, especially in children and breastfed infants. Fluoxetine and paroxetine are strong CYP2D6 inhibitors; they turn a normal metaboliser into a functional poor metaboliser (**phenoconversion**), reducing morphine formation and analgesia. Phenotype therefore depends on medicines as well as genes.
:::
:::

::: exercise Lamotrigine in pregnancy {level=3 check="500"}
A woman's lamotrigine level before pregnancy was 6 mg/L on 200 mg daily. At 32 weeks it is 2.4 mg/L on the same dose with full adherence. Assuming linear kinetics, what daily dose (mg) would be expected to restore a level of 6 mg/L? Give the exact value. What must be planned for the first weeks after delivery, and why?
::: hint
At steady state, concentration is proportional to dose and inversely proportional to clearance.
:::
::: solution
Clearance has increased by $6/2.4 = 2.5$. To restore 6 mg/L: $200 \times 2.5 =$ **500** mg daily.

After delivery, oestrogen-driven induction of UGT1A4 resolves over days to weeks, and clearance falls back towards baseline. A dose of 500 mg would then produce levels around 2.5 times higher than intended, with toxicity. A stepwise dose reduction in the first weeks after birth, guided by levels and symptoms, is planned in advance with the epilepsy team, as in [[#ex-lamotrigine-pp]].
:::
:::

::: exercise An antiepileptic for a man of Han Chinese ancestry {level=3}
A 36-year-old man of Han Chinese ancestry, born in Hong Kong, has newly diagnosed trigeminal neuralgia. Carbamazepine is the usual first-line treatment. (a) What test is recommended before starting it, and why? (b) If the result is positive, what should happen? (c) If he had already been taking carbamazepine for six months without problems, would testing be useful? Explain.
::: solution
(a) HLA-B*15:02 genotyping. This allele is common in Han Chinese, Thai and some other South-east Asian populations, and carriers have a greatly increased risk of carbamazepine-induced Stevens–Johnson syndrome and toxic epidermal necrolysis, which carry significant mortality. Product information and the BNF advise testing people of these ancestries before starting carbamazepine.

(b) If positive, carbamazepine should not be started unless no alternative exists and benefit clearly outweighs the risk. Related drugs (oxcarbazepine, and phenytoin, which share some risk) should also be used with caution; an alternative such as gabapentin, or specialist options, would be considered.

(c) Little. SJS/TEN with carbamazepine usually occurs within the first two to three months. Someone who has taken it for six months without a reaction is at low risk of developing it later, so testing would not normally change management. This illustrates that genetic testing is most useful before first exposure.
:::
:::
