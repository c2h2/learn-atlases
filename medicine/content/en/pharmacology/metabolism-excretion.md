The properties that let a drug be absorbed from the gut and reach its target, mainly lipid solubility, are the same properties that stop the kidney from getting rid of it. A lipid-soluble molecule filtered at the glomerulus simply diffuses back into the blood from the tubule. The body solves this by chemically changing such molecules into more water-soluble ones, mostly in the liver, so that they can be excreted in urine or bile. This is **drug metabolism** (also called biotransformation). Drugs that are already water-soluble, such as gentamicin, lithium and many penicillins, are excreted by the kidney largely unchanged.

This chapter describes the two phases of metabolism and the cytochrome P450 enzymes, the induction and inhibition of those enzymes that underlie many serious drug interactions, and the routes of excretion. It then brings elimination together in two quantities, **clearance** and **half-life**, and explains what happens when elimination becomes saturated. Absorption and distribution were the subject of [[pharmacology/absorption-distribution]]; how clearance sets a dosing regimen is developed in [[pharmacology/dosing-principles]].

## The aims and sites of metabolism {#sec-sites}

The liver is the main site of drug metabolism, but not the only one. The wall of the small intestine contains the same CYP3A4 enzyme that is abundant in liver, and contributes to first-pass metabolism. Plasma esterases hydrolyse suxamethonium and remifentanil within minutes, which is why both have such short actions. The lung, kidney and skin also metabolise some drugs.

Metabolism usually, but not always, inactivates a drug. Its products fall into four groups.

- **Inactive metabolites**: the usual outcome, for example the glucuronide of paracetamol.
- **Active metabolites** that add to or prolong the effect. Diazepam is converted to desmethyldiazepam, which has a much longer half-life. Morphine is partly converted to morphine-6-glucuronide, an active analgesic that is excreted by the kidney and accumulates in renal impairment, causing drowsiness and respiratory depression.
- **Prodrugs** that need metabolism to work. Codeine is converted to morphine by CYP2D6; clopidogrel is activated by CYP2C19 and other enzymes; enalapril and ramipril are hydrolysed to their active forms enalaprilat and ramiprilat; levodopa is decarboxylated to dopamine in the brain.
- **Toxic metabolites.** A small fraction of paracetamol is oxidised to a reactive intermediate, N-acetyl-p-benzoquinone imine (NAPQI), which is normally detoxified immediately by conjugation with glutathione. When glutathione is depleted after an overdose, NAPQI binds to liver proteins and causes hepatocellular necrosis. Acetylcysteine works by replenishing glutathione. The recognition and management of paracetamol overdose follow national guidance ([[emergency-critical-care/poisoning]]).

## Phase I and phase II reactions {#sec-phases}

Metabolism is traditionally divided into two phases. Phase I reactions introduce or expose a reactive group; phase II reactions attach a large polar molecule to it. Many drugs undergo both, in that order, but some go straight to phase II and some are excreted after phase I alone.

::: definition Phase I reactions and the cytochrome P450 system {#def-phase1}
**Phase I** reactions are oxidation, reduction and hydrolysis. They add or unmask a functional group such as –OH, –NH₂ or –COOH, usually making the molecule slightly more polar and providing a site for conjugation.

Most phase I oxidations are carried out by the **cytochrome P450 (CYP) enzymes**, a superfamily of haem-containing mono-oxygenases located mainly in the smooth endoplasmic reticulum of hepatocytes and enterocytes. They are named by family, subfamily and individual enzyme: CYP3A4 is family 3, subfamily A, enzyme 4. A small number of enzymes metabolise most drugs:

| Enzyme | Examples of substrates | Notes |
|---|---|---|
| CYP3A4 | Ciclosporin, tacrolimus, simvastatin, atorvastatin, many calcium channel blockers, midazolam, many HIV and cancer drugs | Most abundant in liver and gut wall; involved in the metabolism of the largest share of drugs |
| CYP2D6 | Codeine, tramadol, many antidepressants and antipsychotics, metoprolol, tamoxifen | Genetically polymorphic; not inducible |
| CYP2C9 | S-warfarin, phenytoin, many NSAIDs, some sulfonylureas | Polymorphic; important in warfarin dosing |
| CYP2C19 | Clopidogrel (activation), proton pump inhibitors, some antidepressants | Polymorphic |
| CYP1A2 | Theophylline, clozapine, olanzapine, caffeine | Induced by tobacco smoke |
| CYP2E1 | Ethanol, a small part of paracetamol | Induced by chronic alcohol use |

Other phase I enzymes are also important: alcohol dehydrogenase and aldehyde dehydrogenase (ethanol), monoamine oxidase (catecholamines, serotonin, tyramine), xanthine oxidase (mercaptopurine) and many esterases and amidases.
:::

::: definition Phase II conjugation {#def-phase2}
**Phase II** reactions attach an endogenous polar group to the drug or its phase I metabolite, producing a conjugate that is usually inactive and readily excreted in urine or bile. The main reactions are:

- **glucuronidation**, by UDP-glucuronosyltransferases (UGTs): the highest-capacity pathway, used by morphine, paracetamol, lorazepam and bilirubin;
- **sulfation**, by sulfotransferases: high affinity but low capacity, so it saturates (paracetamol at high doses);
- **acetylation**, by N-acetyltransferase 2 (NAT2): isoniazid, hydralazine, some sulfonamides;
- **glutathione conjugation**: detoxification of reactive intermediates such as NAPQI;
- **methylation**: for example by thiopurine S-methyltransferase (TPMT) for azathioprine and mercaptopurine.
:::

Several of these enzymes vary between people, and the variation has clinical consequences. About half of people of European ancestry are **slow acetylators**, carrying low-activity NAT2 variants; they are more likely to develop peripheral neuropathy from isoniazid and drug-induced lupus from hydralazine. Neonates have low UGT activity, which is why chloramphenicol caused the fatal "grey baby syndrome" in newborns given adult-derived doses. People with Gilbert syndrome have reduced UGT1A1 activity and are at higher risk of toxicity from irinotecan, whose active metabolite is cleared by that enzyme. These and other genetic variants are discussed in [[pharmacology/patient-variation]].

## Turning metabolism up and down {#sec-induction}

Metabolic enzymes are not fixed in amount or activity. Some drugs and other substances increase their synthesis; others block them. These two processes explain a large share of clinically important drug interactions.

::: definition Enzyme induction and enzyme inhibition {#def-induce-inhibit}
**Enzyme induction** is an increase in the amount of a metabolising enzyme, usually because the inducing substance activates a nuclear receptor (such as the pregnane X receptor) that increases transcription of the enzyme's gene. Because new protein has to be made, induction develops over several days to about two weeks, and wears off over a similar period after the inducer is stopped. Its effect is to lower the concentration and effect of drugs metabolised by the induced enzyme, or to increase the formation of active or toxic metabolites.

Important inducers include rifampicin (the most powerful in common use), carbamazepine, phenytoin, phenobarbital, St John's wort, and some HIV drugs such as efavirenz. Tobacco smoke induces CYP1A2 through the aryl hydrocarbon receptor; the effect comes from the hydrocarbons in smoke, not from nicotine, so nicotine replacement does not maintain it.

**Enzyme inhibition** is a reduction in enzyme activity, usually by competitive or irreversible binding of the inhibitor. It begins as soon as the inhibitor reaches sufficient concentration, typically within a day or two, and raises the concentration of drugs that depend on the inhibited enzyme. Important inhibitors include clarithromycin and erythromycin, azole antifungals (fluconazole, itraconazole, voriconazole), HIV protease inhibitors and their boosters ritonavir and cobicistat, grapefruit juice (intestinal CYP3A4), amiodarone, diltiazem and verapamil, and, for CYP2D6, fluoxetine and paroxetine.
:::

The consequence of an interaction depends on the affected drug more than on the inhibitor or inducer. It is serious when the affected drug has a narrow therapeutic index, a steep concentration–effect relationship, and when one pathway carries most of its metabolism. Typical high-risk combinations are listed below; prescribers check every new combination against the BNF interactions resource or an equivalent.

| Combination | Mechanism | Possible consequence |
|---|---|---|
| Simvastatin + clarithromycin or itraconazole | CYP3A4 inhibition | Myopathy and rhabdomyolysis |
| Tacrolimus or ciclosporin + clarithromycin or azoles | CYP3A4 inhibition | Nephrotoxicity, neurotoxicity |
| Warfarin + fluconazole, metronidazole or amiodarone | CYP2C9 inhibition (and others) | Raised INR, bleeding |
| Combined hormonal contraceptive + rifampicin or carbamazepine | Induction | Contraceptive failure |
| Clozapine and stopping smoking | Loss of CYP1A2 induction | Rising clozapine level, toxicity |
| Azathioprine or mercaptopurine + allopurinol | Xanthine oxidase inhibition | Severe bone marrow suppression |

::: example A transplant patient prescribed an antibiotic {#ex-transplant}
A 52-year-old man of Pakistani heritage, who had a kidney transplant three years ago, takes tacrolimus, mycophenolate and prednisolone. His tacrolimus trough level has been stable in the target range. His GP prescribes clarithromycin for a chest infection. Five days later he feels shaky, has a headache, and his creatinine has risen from 110 to 180 µmol/L. Explain the mechanism, and what the correct approach would have been.
::: solution
Tacrolimus is metabolised mainly by CYP3A4 and CYP3A5 in the gut wall and liver, and is also a P-gp substrate. Clarithromycin is a potent inhibitor of CYP3A4 (and of P-gp). Within a day or two of starting it, the clearance of tacrolimus falls and its bioavailability rises, so concentrations climb towards a new, much higher steady state. Tacrolimus has a narrow therapeutic index: the tremor and headache are typical neurotoxicity, and the rise in creatinine is consistent with calcineurin-inhibitor nephrotoxicity.

The safer approach is to avoid the interaction: choose an antibiotic that does not inhibit CYP3A4 (for example, depending on the infection and local guidance, amoxicillin or doxycycline), or, if a macrolide is essential, involve the transplant team so that the tacrolimus dose can be reduced and levels checked closely. Now, the tacrolimus level should be measured urgently, clarithromycin stopped or switched, and the transplant team contacted. Once clarithromycin is stopped, inhibition wears off over a few days and the dose may need to return to its previous level.
:::
:::

::: example Clozapine and a quit attempt {#ex-clozapine-smoking}
A 38-year-old woman with schizophrenia has been stable for two years on clozapine. She smokes 25 cigarettes a day. On admission to hospital for an elective operation she is unable to smoke and is given nicotine patches. On day five she becomes very drowsy and has a generalised seizure. Explain.
::: solution
Clozapine is metabolised mainly by CYP1A2. Polycyclic aromatic hydrocarbons in tobacco smoke induce CYP1A2, so people who smoke need substantially higher clozapine doses to reach the same plasma concentration than people who do not. Her dose was set while the enzyme was induced.

When she stopped smoking, the induction wore off over several days, CYP1A2 activity fell, and her clozapine concentration rose, in some cases to around double the previous level. Sedation and seizures are dose-related adverse effects of clozapine. Nicotine replacement does not prevent this because nicotine itself is not the inducer.

The principle is to anticipate it: any change in smoking status (including switching to e-cigarettes, which do not induce CYP1A2) in a person taking clozapine should prompt monitoring of plasma levels and a planned dose reduction, guided by the mental health team. If the person later resumes smoking, levels fall and relapse becomes a risk ([[psychiatry/psychotic-disorders]]).
:::
:::

## Excretion {#sec-excretion}

Drugs and their metabolites leave the body mainly in urine and bile. Volatile anaesthetics leave through the lungs, and small amounts of many drugs appear in sweat, saliva and breast milk.

**Renal excretion** combines three processes along the nephron ([[renal/tubular-function]]).

1. **Glomerular filtration.** Only unbound drug is filtered, at a rate equal to the glomerular filtration rate (GFR) multiplied by the unbound fraction. Large molecules such as heparin and most antibodies are not filtered.
2. **Active tubular secretion** in the proximal tubule. Organic anion transporters (OATs) secrete acidic drugs such as penicillins, methotrexate and many diuretics; organic cation transporters (OCTs) secrete bases such as metformin. Secretion can remove even protein-bound drug, and its transporters are sites of interactions. Probenecid inhibits penicillin secretion and was once used deliberately to prolong penicillin levels; NSAIDs and proton pump inhibitors can reduce the secretion of methotrexate, raising its toxicity.
3. **Passive tubular reabsorption.** As water is reabsorbed, the drug concentration in the tubule rises. Lipid-soluble, un-ionised drug diffuses back into the blood; polar or ionised drug stays in the urine. Urine pH changes the ionised fraction of weak acids and bases ([[pharmacology/absorption-distribution]]), which is the basis of urinary alkalinisation in salicylate poisoning.

**Biliary excretion** removes larger, polar molecules, typically conjugates with a molecular weight above about 500. Some glucuronides excreted in bile are hydrolysed by gut bacteria, and the released drug is reabsorbed. This **enterohepatic circulation** prolongs the action of drugs such as mycophenolate and some oestrogens. Repeated doses of activated charcoal can interrupt it for a few drugs in poisoning.

## Clearance and half-life {#sec-clearance}

Elimination is best described by clearance. It is the single most important pharmacokinetic parameter for long-term dosing, because it determines the steady-state concentration produced by a given dose rate.

::: theorem Clearance, elimination rate constant and half-life {#thm-clearance}
**Clearance** (CL) is the volume of plasma from which drug is completely removed per unit time:

$$
CL = \frac{\text{rate of elimination}}{\text{plasma concentration}}.
$$ {#eq-cl}

Clearances by different organs add: $CL_{\text{total}} = CL_{\text{renal}} + CL_{\text{hepatic}} + \ldots$. When CL is constant (first-order elimination), the concentration after an intravenous bolus falls exponentially,

$$
C(t) = C_0\,e^{-kt}, \qquad k = \frac{CL}{V_d},
$$ {#eq-decay}

and the **elimination half-life**, the time for the concentration to halve, is

$$
t_{1/2} = \frac{\ln 2}{k} = \frac{0.693\,V_d}{CL}.
$$ {#eq-thalf}
:::

::: proof
The amount of drug in the body is $A = V_d\,C$. By the definition of clearance, the rate of elimination is $CL \cdot C$, so $\dfrac{dA}{dt} = -CL \cdot C$. Dividing by the constant $V_d$ gives $\dfrac{dC}{dt} = -\dfrac{CL}{V_d}\,C = -kC$. The solution of this first-order differential equation is $C(t) = C_0 e^{-kt}$. Setting $C = C_0/2$ gives $e^{-kt_{1/2}} = 1/2$, so $t_{1/2} = \ln 2/k = 0.693\,V_d/CL$.
:::

The last equation is worth reading carefully. Half-life is a *derived* quantity: it depends on both volume and clearance. A drug can have a long half-life because it is cleared slowly or because it is spread through a very large volume, and the two situations have different consequences. Amiodarone's half-life of weeks to months comes mainly from its enormous volume of distribution. In heart failure, the volume of distribution of some drugs falls while their clearance also falls, and the half-life can stay the same even though the steady-state concentration rises.

After one half-life 50% of the drug remains, after two 25%, after three 12.5%, after four 6.25% and after five about 3%. For practical purposes a drug is considered eliminated after four to five half-lives. The same rule, approached from the other side, gives the time to reach steady state during regular dosing ([[pharmacology/dosing-principles]]).

**Renal clearance** can be measured directly as $CL_R = (U \times \dot{V})/P$, where $U$ is the urine concentration, $\dot V$ the urine flow rate and $P$ the plasma concentration. Comparing it with the filtration clearance (unbound fraction × GFR) shows what the tubule is doing: a higher value means net secretion, a lower one net reabsorption.

**Hepatic clearance** depends on hepatic blood flow $Q$ (about 1.5 L/min in an adult) and the fraction of drug removed in one pass through the liver, the **extraction ratio** $E$: $CL_H = Q \times E$.

- **High-extraction drugs** ($E$ above about 0.7), such as propranolol, lidocaine, morphine and glyceryl trinitrate, are removed almost completely in one pass. Their clearance is limited by blood flow, so it falls in heart failure and shock. Their oral bioavailability is low and very sensitive to liver disease.
- **Low-extraction drugs** ($E$ below about 0.3), such as warfarin, phenytoin, theophylline and diazepam, are removed slowly. Their clearance is limited by enzyme capacity and by protein binding, so it is changed by enzyme induction and inhibition but little by blood flow.

::: example Half-life from volume and clearance {#ex-thalf}
An illustrative drug has a volume of distribution of 42 L and a clearance of 6 L/h. (a) What is its elimination half-life? (b) After an intravenous dose produces a concentration of 8 mg/L, how long until it falls to 1 mg/L? (c) If renal impairment halves the clearance, what happens to the half-life?
::: solution
(a) $k = CL/V_d = 6/42 = 0.143$ per hour, and $t_{1/2} = 0.693 \times 42/6 \approx 4.9$ hours.

(b) A fall from 8 to 1 mg/L is three halvings (8 → 4 → 2 → 1), so it takes $3 \times 4.9 \approx 14.6$ hours.

(c) With CL = 3 L/h, $t_{1/2} = 0.693 \times 42/3 \approx 9.7$ hours: the half-life doubles. Both the time for a dose to wear off and the time to reach steady state double, and, at an unchanged dose rate, the steady-state concentration doubles too.
:::
:::

## When elimination saturates {#sec-saturation}

Clearance is constant only while the metabolising enzymes or transporters work well below their maximum capacity. Enzymes follow **Michaelis–Menten kinetics**: the rate of metabolism rises with concentration but levels off at a maximum.

::: definition First-order and zero-order elimination {#def-orders}
The rate of elimination by a saturable process is

$$
\text{rate} = \frac{V_{\max}\,C}{K_m + C},
$$ {#eq-mm}

where $V_{\max}$ is the maximum rate and $K_m$ the concentration at which the rate is half maximal.

- When $C \ll K_m$, the rate is approximately $(V_{\max}/K_m)\,C$: proportional to concentration. This is **first-order** elimination, with constant clearance $V_{\max}/K_m$ and a constant half-life. Most drugs at therapeutic doses behave this way.
- When $C \gg K_m$, the rate approaches $V_{\max}$: a constant amount is removed per unit time regardless of concentration. This is **zero-order** (saturation) elimination, and the drug no longer has a constant half-life.
:::

Ethanol is the standard example: alcohol dehydrogenase is saturated by quite small amounts of alcohol, so the blood alcohol concentration falls by roughly the same amount each hour. Phenytoin is the clinically critical one: its $K_m$ lies within the therapeutic range, so the relationship between dose and steady-state level curves upwards. Salicylates in overdose and theophylline at high concentrations also show saturation.

::: widget plot
f: V*x/(K+x); V*x/K; V+0*x
x: 0, 30
y: 0, 25
sliders: V=10:2:20:1; K=4:1:20:1
labels: \text{Michaelis–Menten (saturable)}; \text{first-order extrapolation}; V_{\max}
caption: Illustrative elimination rate (mg/h) against plasma concentration (mg/L). At low concentrations the saturable curve follows the straight first-order line, so clearance $V_{\max}/K_m$ is constant. As concentration approaches and exceeds $K_m$, the rate levels off towards $V_{\max}$ (the horizontal line). Lower $K_m$ to see saturation begin within a typical therapeutic range, as it does for phenytoin.
:::

At steady state the dose rate $R$ equals the elimination rate, so $R = V_{\max} C_{ss}/(K_m + C_{ss})$, which rearranges to

$$
C_{ss} = \frac{K_m\,R}{V_{\max} - R}.
$$ {#eq-css-mm}

As $R$ approaches $V_{\max}$, $C_{ss}$ rises steeply, and if $R$ exceeds $V_{\max}$ there is no steady state: the drug simply accumulates.

::: example Why phenytoin doses change in small steps {#ex-phenytoin}
An adult has illustrative phenytoin parameters $V_{\max} = 500$ mg/day and $K_m = 4$ mg/L. Using [[#eq-mm]], what daily dose is needed to keep the steady-state level at 10 mg/L, and at 20 mg/L?
::: solution
At steady state the daily dose equals the elimination rate.

- At 10 mg/L: $R = 500 \times 10/(4 + 10) \approx 357$ mg/day.
- At 20 mg/L: $R = 500 \times 20/(4 + 20) \approx 417$ mg/day.

A dose increase of only about 17% doubles the plasma level. With a drug that behaved by first-order kinetics, doubling the level would need double the dose. This is why phenytoin doses are adjusted in small increments, why levels are checked after each change (allowing longer than usual for steady state, because the effective half-life lengthens as concentration rises), and why a small interaction or a dose rounding error can cause toxicity. Individual $V_{\max}$ and $K_m$ vary widely, so actual dosing follows levels and specialist advice.
:::
:::

::: warning Half-life is not a fixed property of the drug
Students often learn a single half-life for each drug. In reality the half-life changes whenever clearance or volume changes: in renal or hepatic impairment, in heart failure, with enzyme induction or inhibition, with age, and, for saturable drugs, with the dose itself. A textbook half-life is a typical value in a healthy adult. Planning the timing of levels, the duration of monitoring after an overdose or the time needed to wash out a drug before switching to another should use the patient's likely half-life, not the textbook one.
:::

::: quiz
A 74-year-old woman is stable on warfarin. She is started on a two-week course of rifampicin for a bone infection. Which pattern of INR change is most likely?
- [ ] The INR rises within 24 hours and returns to baseline as soon as rifampicin stops
- [x] The INR falls progressively over one to two weeks; after rifampicin stops, it rises again over the following weeks, so the warfarin dose needs reducing as the induction wears off
- [ ] There is no change, because rifampicin does not affect CYP enzymes
- [ ] The INR falls immediately because rifampicin displaces warfarin from albumin
::: solution
Rifampicin is a potent inducer of CYP2C9, CYP3A4 and other enzymes that metabolise warfarin. Induction needs new enzyme synthesis, so warfarin clearance rises over days to two weeks and the INR falls, usually needing large dose increases. After rifampicin is stopped, the extra enzyme is lost over a similar period, warfarin clearance falls, and the INR rises: if the increased dose is continued, bleeding is a risk. Both phases need frequent INR monitoring.
:::
:::

::: history
The modern study of drug metabolism began with Richard Tecwyn Williams, a Welsh biochemist whose book *Detoxication Mechanisms* (1947) classified the reactions into what became known as phase I and phase II. The enzymes responsible for most oxidations were identified in the late 1950s and early 1960s: Martin Klingenberg and David Garfinkel independently found an unusual carbon monoxide-binding pigment in liver microsomes in 1958, and Tsuneo Omura and Ryo Sato showed in 1962 that it was a haemoprotein, naming it cytochrome P450 after its absorption peak at 450 nm. Allan Conney's work in the 1950s and 1960s established that drugs and environmental chemicals could induce these enzymes. The importance of gut-wall metabolism was brought home by a chance finding: in 1989 David Bailey and colleagues in Canada, using grapefruit juice to mask the taste of alcohol in a study of the calcium channel blocker felodipine, found much higher drug levels than expected, and their report in 1991 opened the study of food–drug interactions through intestinal CYP3A4.
:::

::: summary
- Metabolism converts lipid-soluble drugs into water-soluble products that can be excreted. Metabolites may be inactive, active, toxic, or (for prodrugs) the active drug itself.
- Phase I reactions (oxidation, reduction, hydrolysis) are dominated by cytochrome P450 enzymes, especially CYP3A4, 2D6, 2C9, 2C19 and 1A2. Phase II reactions conjugate drugs with glucuronide, sulfate, acetyl, glutathione or methyl groups.
- Enzyme induction (rifampicin, carbamazepine, phenytoin, St John's wort, tobacco smoke) develops and resolves over one to two weeks and lowers drug levels. Enzyme inhibition (clarithromycin, azoles, ritonavir, grapefruit, amiodarone) is rapid and raises them. Interactions matter most for narrow-index drugs.
- The kidney excretes drugs by filtration of unbound drug, active secretion and passive reabsorption; bile excretes large conjugates, some of which undergo enterohepatic circulation.
- Clearance relates elimination rate to concentration. With first-order elimination, $t_{1/2} = 0.693\,V_d/CL$, and about five half-lives remove a drug.
- High-extraction drugs are flow-limited; low-extraction drugs are capacity-limited and sensitive to induction, inhibition and binding.
- Saturable (Michaelis–Menten) elimination makes level rise disproportionately with dose, as with phenytoin and ethanol.
:::

## Where this leads

Clearance and volume are turned into dosing regimens, loading doses and drug monitoring in [[pharmacology/dosing-principles]]. Inherited differences in drug-metabolising enzymes, and the effect of age, pregnancy and organ failure, are covered in [[pharmacology/patient-variation]]. Interactions as a cause of harm are revisited in [[pharmacology/adverse-reactions]]. Liver and kidney physiology are in [[gastrointestinal/liver-function]] and [[renal/tubular-function]].

## Exercises

::: exercise Half-life from a rate constant {level=1 check="3"}
A drug is eliminated by first-order kinetics with an elimination rate constant of 0.231 per hour. What is its half-life in hours, to the nearest whole number?
::: solution
$t_{1/2} = 0.693/0.231 \approx 3.0$ hours, so **3** hours.
:::
:::

::: exercise What is left after four half-lives? {level=1 check="6.25"}
What percentage of a single intravenous dose remains in the body after four half-lives, assuming first-order elimination? Give the exact value.
::: solution
$100 \times (1/2)^4 = 100/16 = 6.25\%$.
:::
:::

::: exercise Name the reaction {level=1}
Classify each reaction as phase I or phase II and name the type: (a) codeine converted to morphine by CYP2D6; (b) morphine converted to morphine-3-glucuronide; (c) isoniazid converted to acetylisoniazid; (d) enalapril converted to enalaprilat; (e) azathioprine's metabolite mercaptopurine methylated by TPMT.
::: solution
(a) Phase I, oxidation (O-demethylation) by a cytochrome P450 enzyme. (b) Phase II, glucuronidation. (c) Phase II, acetylation by NAT2. (d) Phase I, hydrolysis by esterases (a prodrug activated). (e) Phase II, methylation.
:::
:::

::: exercise Clearance from volume and half-life {level=2 check="4.9"}
A drug has a volume of distribution of 70 L and a half-life of 10 hours. Calculate its clearance in L/h, to one decimal place.
::: hint
Rearrange [[#eq-thalf]]: $CL = 0.693\,V_d/t_{1/2}$.
:::
::: solution
$CL = 0.693 \times 70/10 \approx 4.85$ L/h, which is **4.9** L/h to one decimal place (using $\ln 2 = 0.6931$, $CL = 4.852$ L/h).
:::
:::

::: exercise What is the tubule doing? {level=2 check="50"}
A drug that is not bound to plasma proteins has a plasma concentration of 2 mg/L. Urine collected over one hour has a volume of 0.1 L and a drug concentration of 60 mg/L. The patient's GFR is 100 mL/min. Calculate the renal clearance in mL/min, and state whether the drug undergoes net tubular secretion or net reabsorption.
::: hint
$CL_R = U\dot V/P$; convert L/h to mL/min.
:::
::: solution
Excretion rate $= 60 \times 0.1 = 6$ mg/h. $CL_R = 6/2 = 3$ L/h $= 3000/60 =$ **50** mL/min. The filtration clearance of an unbound drug equals the GFR, 100 mL/min. Renal clearance is lower, so there is net tubular reabsorption, as expected for a fairly lipid-soluble drug. A clearance above 100 mL/min would have shown net secretion.
:::
:::

::: exercise Starting and stopping an inducer {level=2}
A 29-year-old woman with tuberculosis is to start a regimen containing rifampicin. She uses a combined oral contraceptive pill and takes no other medicines. Explain the interaction, its time course, and the contraceptive principle that follows. What happens when rifampicin is stopped?
::: solution
Rifampicin is a potent inducer of CYP3A4 and other enzymes that metabolise ethinylestradiol and progestogens. Over the first one to two weeks, clearance of both hormones rises and their concentrations fall, so the pill may fail to prevent ovulation. Because the effect is an increase in metabolism, it is not overcome reliably by doubling the pill.

The principle, following Faculty of Sexual and Reproductive Healthcare guidance, is to use a contraceptive method that is not affected by enzyme inducers, such as a copper intrauterine device, a levonorgestrel intrauterine system or progestogen-only injection, during treatment. When rifampicin is stopped, induction persists until the extra enzyme is lost, so additional precautions are continued for 28 days after the last dose. Teratogenicity of other drugs, and the interaction of rifampicin with any future medicines, should also be considered.
:::
:::

::: exercise A phenytoin dose increase {level=3 check="20"}
A woman's phenytoin is metabolised with illustrative parameters $V_{\max} = 420$ mg/day and $K_m = 4$ mg/L. (a) What is her steady-state level on 300 mg/day? (b) What would it be on 350 mg/day? Give the answer to (b) in mg/L. (c) Comment on the result.
::: hint
Use [[#eq-css-mm]]: $C_{ss} = K_m R/(V_{\max} - R)$.
:::
::: solution
(a) $C_{ss} = 4 \times 300/(420 - 300) = 1200/120 = 10$ mg/L.

(b) $C_{ss} = 4 \times 350/(420 - 350) = 1400/70 =$ **20** mg/L.

(c) A 17% dose increase has doubled the steady-state level, because the dose rate is approaching $V_{\max}$ and elimination is near saturation. A further increase to 420 mg/day would have no steady state at all. In practice, increases at this level are made in small steps, with levels checked once a new steady state is likely to have been reached, which takes longer at higher concentrations.
:::
:::

::: exercise Gout treatment in a transplant patient {level=3}
A 61-year-old man with a liver transplant takes azathioprine as part of his immunosuppression. He develops recurrent gout, and allopurinol is started at a standard dose. Three weeks later he presents with fever, mouth ulcers and a neutrophil count of 0.3 × 10⁹/L. Explain the mechanism of this interaction, using the metabolic pathways of azathioprine, and describe the principles of prevention.
::: hint
Think about what happens to mercaptopurine when one of its inactivating pathways is blocked.
:::
::: solution
Azathioprine is a prodrug converted to mercaptopurine. Mercaptopurine has three competing fates: activation to cytotoxic thioguanine nucleotides (which cause both the therapeutic immunosuppression and bone marrow toxicity), inactivation by methylation via TPMT, and inactivation by oxidation via xanthine oxidase to thiouric acid.

Allopurinol inhibits xanthine oxidase. With that inactivating route blocked, much more mercaptopurine is shunted into the active thioguanine nucleotide pathway. The effect is equivalent to a several-fold increase in the azathioprine dose, and severe myelosuppression results. His fever with neutropenia is a medical emergency (neutropenic sepsis).

Prevention: the combination should be avoided or, where specialist teams decide it is necessary, the azathioprine dose is reduced substantially (often to about a quarter) with close blood count monitoring. Alternatives for gout prevention, such as a urate-lowering drug without this interaction, are considered with the transplant team. The case also illustrates a general rule: interactions are not only through cytochrome P450 enzymes, and any drug added to a narrow-index regimen should be checked.
:::
:::
