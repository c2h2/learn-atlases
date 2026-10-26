A tablet swallowed at breakfast is useless until some of its drug reaches the receptors described in [[pharmacology/drug-receptor]]. On the way it has to dissolve, cross the wall of the gut, survive a first pass through the liver, enter the circulation, and leave the blood again to reach the tissue where it acts. Each step can lose drug or delay it, and each step differs between drugs, between preparations of the same drug, and between patients.

This chapter follows a drug from the site of administration to its site of action. It covers how drugs cross membranes, the routes by which they are given, the meaning and measurement of bioavailability, and how drugs distribute through the body, including the apparent volume of distribution and plasma protein binding. Metabolism and excretion, which remove the drug again, are the subject of [[pharmacology/metabolism-excretion]]. Together these processes are often abbreviated **ADME**: absorption, distribution, metabolism and excretion.

## Crossing membranes {#sec-membranes}

Almost every step in a drug's journey involves crossing a cell membrane: the gut epithelium, the capillary wall (in some tissues), the blood–brain barrier, the placenta, the renal tubule. Drugs cross in three main ways.

- **Passive diffusion through the lipid bilayer.** This is the route for most small drugs. The rate follows Fick's law: it is proportional to the concentration gradient, the area available and the drug's lipid solubility. Small, uncharged, lipid-soluble molecules cross easily; large or charged molecules hardly at all.
- **Carrier-mediated transport.** Solute carrier (SLC) transporters move drugs into cells, and ATP-binding cassette (ABC) transporters pump them out. The most important efflux pump in pharmacology is **P-glycoprotein** (P-gp), found in the gut wall, the blood–brain barrier, the liver and the kidney. P-gp pumps drugs such as digoxin and loperamide back out of cells, reducing their absorption and keeping them out of the brain.
- **Through gaps between cells.** Most capillaries have gaps that let small molecules pass freely whatever their lipid solubility. The brain capillaries do not, which is why the blood–brain barrier excludes polar drugs.

Most drugs are **weak acids or weak bases**. In solution they exist partly in an un-ionised form, which is lipid-soluble and crosses membranes, and partly in an ionised form, which is water-soluble and largely cannot. The balance between the two forms depends on the drug's pKa and the pH of the fluid it is in.

::: theorem Ionisation and the Henderson–Hasselbalch equation {#thm-ionisation}
For a weak acid HA ⇌ H⁺ + A⁻ and a weak base B + H⁺ ⇌ BH⁺,

$$
\text{acid: } \frac{[\text{ionised}]}{[\text{un-ionised}]} = 10^{\,\mathrm{pH} - \mathrm{p}K_a}, \qquad \text{base: } \frac{[\text{ionised}]}{[\text{un-ionised}]} = 10^{\,\mathrm{p}K_a - \mathrm{pH}}.
$$ {#eq-hh}

When pH equals pKa the drug is half ionised. Each unit of pH away from the pKa changes the ratio tenfold. Acids are mostly un-ionised in acid fluid; bases are mostly un-ionised in alkaline fluid.
:::

::: proof
For an acid, the dissociation constant is $K_a = [\text{H}^+][\text{A}^-]/[\text{HA}]$. Taking negative logarithms, $\mathrm{p}K_a = \mathrm{pH} - \log_{10}([\text{A}^-]/[\text{HA}])$, so $[\text{A}^-]/[\text{HA}] = 10^{\mathrm{pH}-\mathrm{p}K_a}$; $\text{A}^-$ is the ionised form. For a base, $K_a$ refers to the protonated (ionised) form: $K_a = [\text{H}^+][\text{B}]/[\text{BH}^+]$, which rearranges to $[\text{BH}^+]/[\text{B}] = 10^{\mathrm{p}K_a - \mathrm{pH}}$.
:::

### Ion trapping

When two fluid compartments of different pH are separated by a membrane that only the un-ionised form can cross, the un-ionised concentration becomes equal on both sides at equilibrium. The *total* concentration is then higher on the side where the drug is more ionised. This is **ion trapping**. Weak acids accumulate on the alkaline side and weak bases on the acidic side.

Ion trapping has some clinical uses. In severe salicylate poisoning, making the urine alkaline (with intravenous sodium bicarbonate) increases the ionised fraction of salicylate in the tubular fluid, so less is reabsorbed and more is excreted. Breast milk is slightly more acidic than plasma, so weak bases tend to reach higher concentrations in milk than weak acids do. The stomach is very acidic, so weak bases from the blood are trapped in gastric juice.

::: example Where is aspirin un-ionised? {#ex-aspirin-ph}
Aspirin (acetylsalicylic acid) is a weak acid with pKa about 3.5. Calculate the ratio of ionised to un-ionised drug in gastric juice at pH 2 and in plasma at pH 7.4, and comment on where it is absorbed.
::: solution
From [[#eq-hh]] for an acid:

- Stomach, pH 2: ratio $= 10^{2 - 3.5} = 10^{-1.5} \approx 0.03$. About 97% is un-ionised.
- Plasma, pH 7.4: ratio $= 10^{7.4 - 3.5} = 10^{3.9} \approx 7900$. Almost all is ionised.

In the stomach, aspirin is mostly in the lipid-soluble form, so some is absorbed there and enters gastric mucosal cells, where the near-neutral pH ionises and traps it. That local trapping contributes to aspirin's gastric irritation. Even so, most aspirin is absorbed in the small intestine. Although the pH there is higher and less drug is un-ionised at any moment, the surface area is hundreds of times larger and blood flow is greater, and absorption of the small un-ionised fraction continually shifts the equilibrium. pH partition alone does not predict the main site of absorption; surface area does.
:::
:::

## Routes of administration {#sec-routes}

The route determines how fast a drug acts, how much of it reaches the circulation, and which tissues see the highest concentration.

| Route | Main advantages | Main limitations | Examples |
|---|---|---|---|
| Oral | Convenient, cheap, acceptable | Variable absorption; first-pass metabolism; needs a working gut and a person able to swallow | Most tablets and liquids |
| Sublingual or buccal | Rapid; bypasses first-pass metabolism | Only small, potent, lipid-soluble drugs | Glyceryl trinitrate, buprenorphine |
| Rectal | Useful when vomiting or unable to swallow; partly avoids first pass | Erratic absorption; acceptability | Diazepam, paracetamol suppositories |
| Intravenous | Complete and immediate; dose can be titrated | Needs access; no way of recalling a dose; infection and infusion errors | Antibiotics in sepsis, anaesthetic induction |
| Intramuscular | Fairly rapid; depot preparations possible | Painful; absorption depends on muscle blood flow | Adrenaline in anaphylaxis, vaccines, depot antipsychotics |
| Subcutaneous | Self-administration; slow steady absorption | Small volumes; poor absorption if peripheral perfusion is poor | Insulin, low molecular weight heparin, many biologics |
| Inhaled | High local concentration in the lung with low systemic dose | Depends on device technique | Bronchodilators, inhaled corticosteroids, anaesthetic gases |
| Transdermal | Steady release over days | Slow onset and offset; skin irritation | Fentanyl, nicotine, oestradiol, hyoscine patches |
| Topical | Local effect, little systemic exposure | Systemic absorption still possible | Skin, eye and nasal preparations |
| Intrathecal or epidural | Direct access to the spinal cord and nerve roots | Specialist technique; serious harm from wrong drug | Spinal anaesthesia, some chemotherapy |

Two entries deserve a comment. Topical does not mean free of systemic effects: β-blocker eye drops can cause bronchospasm and bradycardia because drug drains through the nasolacrimal duct and is absorbed from the nasal mucosa without first-pass metabolism ([[pharmacology/autonomic-drugs]]). And intrathecal administration is the route where a single error can be catastrophic; some drugs, such as vincristine, are fatal if given intrathecally, which is why national rules require their administration to be strictly separated.

### Bioavailability

::: definition Bioavailability and first-pass metabolism {#def-absorption}
**Bioavailability** ($F$) is the fraction of an administered dose that reaches the systemic circulation unchanged. By definition $F = 1$ for an intravenous dose. For other routes it is estimated by comparing the area under the plasma concentration–time curve (AUC) after the test route with that after an intravenous dose:

$$
F = \frac{AUC_{\text{oral}} \times \text{Dose}_{\text{IV}}}{AUC_{\text{IV}} \times \text{Dose}_{\text{oral}}}.
$$ {#eq-f}

**First-pass (presystemic) metabolism** is the loss of drug in the gut wall and liver before it reaches the systemic circulation. Everything absorbed from the stomach and intestine passes through the portal vein and the liver first. A drug with a high hepatic extraction may therefore have a low oral bioavailability even though it is completely absorbed.
:::

AUC is used because, for drugs with linear kinetics, it is proportional to the amount of drug that has entered the circulation, whatever the shape of the curve. Drugs with substantial first-pass metabolism include glyceryl trinitrate, which is why it is given sublingually or transdermally, and morphine and propranolol, whose oral doses are larger than their intravenous ones. Lidocaine is not given orally for systemic effects for the same reason.

First-pass metabolism varies between people and with liver disease. In cirrhosis, portal blood bypasses the liver through portosystemic shunts and hepatocyte function falls, so the bioavailability of high-extraction drugs can rise several-fold. Oral doses of such drugs therefore need particular care in severe liver disease ([[pharmacology/patient-variation]]).

::: example Calculating bioavailability {#ex-bioavailability}
In a pharmacokinetic study, healthy volunteers receive a drug as 10 mg intravenously on one occasion and 40 mg orally on another. The AUC after the IV dose is 400 µg·h/L and after the oral dose 480 µg·h/L. What is the oral bioavailability? What would an equivalent oral dose be for a patient currently stable on 5 mg IV?
::: solution
From [[#eq-f]]:

$$
F = \frac{480 \times 10}{400 \times 40} = \frac{4800}{16000} = 0.30.
$$

Only 30% of an oral dose reaches the systemic circulation. To deliver the same amount of drug as 5 mg IV, the oral dose would be $5/0.30 \approx 17$ mg (illustrative). In practice the conversion would use the product's licensed oral and intravenous doses from the formulary, because bioavailability varies between individuals and preparations.
:::
:::

### What affects oral absorption

Several factors change how much drug is absorbed and how quickly.

- **Formulation.** The tablet must disintegrate and the drug dissolve before it can be absorbed. **Modified-release** preparations are designed to release drug slowly, smoothing the concentration profile and allowing less frequent dosing. They should not be crushed, and different brands of some modified-release products are not interchangeable, so prescribers specify the brand for drugs such as modified-release nifedipine and some antiepileptic drugs.
- **Gastric emptying and gut motility.** Most absorption happens in the small intestine, so slowed gastric emptying (after opioids, in diabetic gastroparesis, during a migraine attack) delays onset. Rapid transit or diarrhoea can reduce absorption of slowly absorbed drugs.
- **Food.** Food may delay, reduce or increase absorption. Some drugs are taken on an empty stomach for this reason, and others with food.
- **Chelation and binding.** Tetracyclines and quinolones form insoluble complexes with calcium, iron, magnesium and aluminium. Levothyroxine absorption is reduced by calcium and iron preparations. Separating the doses by several hours avoids the interaction.
- **Efflux and gut-wall metabolism.** P-gp and the enzyme CYP3A4 in the enterocytes reduce the bioavailability of many drugs. Inhibitors such as grapefruit juice (for CYP3A4) can raise it.

**Bioequivalence** compares two products of the same drug, such as a generic and the original brand. Regulators in the UK, EU and USA generally accept two products as bioequivalent when the 90% confidence interval for the ratio of their AUCs, and of their peak concentrations, lies within 80% to 125%. For most drugs this makes generics interchangeable. For drugs with a narrow therapeutic index, tighter limits or consistent supply of one product may be needed.

The rate of absorption matters as well as the extent. With slower absorption the peak concentration is lower and later, even when the total amount absorbed (the AUC) is the same. The figure shows this.

::: widget plot
f: F*2*ka/(ka-0.173)*(exp(-0.173*x)-exp(-ka*x)); 2*exp(-0.173*x)
x: 0, 24
y: 0, 2.2
sliders: ka=1:0.2:4:0.1; F=0.6:0.1:1:0.05
labels: \text{oral dose}; \text{same dose IV}
caption: Illustrative plasma concentration (mg/L) against time (hours) after a single 100 mg dose with a volume of distribution of 50 L and an elimination half-life of 4 hours. The IV curve starts at its peak and falls exponentially. For the oral dose, $k_a$ is the absorption rate constant (per hour) and $F$ the bioavailability. Lower $k_a$ to see a flatter, later peak, as with a modified-release product; lower $F$ to see the whole curve and its area shrink. This is a simplified one-compartment model.
:::

## Distribution {#sec-distribution}

Once in the blood, a drug distributes to the tissues. How fast depends on the blood flow to each tissue and on how easily the drug crosses capillaries and cell membranes. How far depends on how strongly the drug binds to plasma proteins compared with tissue components, and on its lipid solubility.

Well-perfused organs such as the brain, heart, liver and kidneys equilibrate within minutes. Muscle takes longer, and fat, with its poor blood supply, longest of all. This sequence explains **redistribution**. After a single intravenous dose of a lipid-soluble anaesthetic such as propofol or thiopental, the drug reaches the brain within one circulation time and the person loses consciousness. Over the next few minutes the drug moves on into muscle and then fat, the brain concentration falls, and the person wakes, even though most of the drug has not yet been eliminated.

::: definition Apparent volume of distribution {#def-distribution}
The **apparent volume of distribution** ($V_d$) is the volume of fluid that would be needed to contain the total amount of drug in the body at the same concentration as in plasma:

$$
V_d = \frac{\text{amount of drug in the body}}{\text{plasma concentration}}.
$$ {#eq-vd}

After an intravenous bolus, $V_d$ is estimated as dose divided by the initial plasma concentration $C_0$ (extrapolated back to time zero). $V_d$ is not a real anatomical space. A drug that stays in plasma has a $V_d$ close to plasma volume; a drug concentrated in tissues can have a $V_d$ far larger than total body water.
:::

For an adult of 70 kg, plasma volume is about 3 L, extracellular fluid about 14 L and total body water about 42 L. These anchor points help interpret a drug's $V_d$:

| Approximate $V_d$ | Interpretation | Examples |
|---|---|---|
| About 3–10 L | Largely confined to plasma; large, polar or highly protein-bound | Heparin, warfarin |
| About 15–20 L | Extracellular fluid; polar drugs that cross capillaries but not cell membranes | Gentamicin and other aminoglycosides |
| About 40 L | Total body water; small water-soluble molecules | Ethanol, lithium (roughly) |
| Hundreds to thousands of litres | Extensive tissue binding or lipid storage | Digoxin, amiodarone, tricyclic antidepressants |

The volume of distribution has three practical uses. First, it sets the **loading dose** needed to reach a target concentration quickly, a calculation developed in [[pharmacology/dosing-principles]]. Second, together with clearance it determines the half-life ([[pharmacology/metabolism-excretion]]): a drug spread through a large volume is removed from plasma slowly, because most of it is out of reach of the liver and kidneys at any moment. Third, it predicts whether extracorporeal removal can help in poisoning. Haemodialysis removes drug only from blood. It works well for lithium, which has a modest $V_d$ and is not protein-bound, but it is of little use for digoxin or tricyclic antidepressants, because almost all of the drug in the body is in the tissues.

::: example A larger volume in sepsis {#ex-icu-vd}
A 67-year-old woman weighing 70 kg is admitted to intensive care with abdominal sepsis. She has received 6 L of intravenous fluid and has widespread oedema. An aminoglycoside is started at an illustrative dose of 7 mg/kg. In a typical adult, the drug's $V_d$ is about 0.25 L/kg; in critically ill patients with capillary leak it may be about 0.4 L/kg. Estimate the peak concentration in each case and explain the significance.
::: solution
The dose is $7 \times 70 = 490$ mg.

- Typical $V_d$: $0.25 \times 70 = 17.5$ L, so $C_{\text{peak}} \approx 490/17.5 = 28$ mg/L.
- Expanded $V_d$: $0.4 \times 70 = 28$ L, so $C_{\text{peak}} \approx 490/28 = 17.5$ mg/L.

Aminoglycosides kill bacteria in a concentration-dependent way, so the peak relative to the organism's minimum inhibitory concentration matters. Because the drug is polar and distributes in extracellular water, extra fluid in the interstitial space dilutes it, and the same mg/kg dose gives a peak nearly 40% lower. This is why loading doses of hydrophilic antibiotics are often not reduced in critical illness even when kidney function is poor: the loading dose depends on volume, and kidney function governs the later maintenance doses. Actual doses and monitoring follow local antimicrobial guidance and drug levels.
:::
:::

### Plasma protein binding

Many drugs bind reversibly to plasma proteins. **Albumin** binds mainly acidic and neutral drugs, such as warfarin, phenytoin and many NSAIDs. **α₁-acid glycoprotein**, an acute-phase protein, binds many basic drugs, such as lidocaine and some antidepressants. Bound drug cannot cross capillary walls, act on receptors, be filtered by the glomerulus or (for most drugs) be metabolised. Only the **unbound (free) fraction** is active.

::: warning Displacement interactions are usually overrated
It is often said that a drug that displaces warfarin from albumin will cause bleeding. For most drugs this is not true in practice. When a displacing drug is added, the free fraction rises, but the extra free drug is also distributed to the tissues and cleared by the liver or kidney. Within a few half-lives the *free* concentration, which determines the effect, returns to about where it was; only the *total* concentration ends up lower. Interactions blamed on displacement nearly always turn out to involve inhibition of metabolism as well (as with warfarin and some antifungals, which inhibit CYP2C9). Displacement matters mainly in the brief period after a displacer is started, when it is given intravenously at high dose, or when the drug has a very high extraction ratio and a narrow therapeutic index.
:::

The more important consequence of protein binding is for **interpreting drug levels**. Most laboratory assays measure the total (bound plus free) concentration. If albumin is low, as in malnutrition, nephrotic syndrome, liver disease, late pregnancy or critical illness, the free fraction of a highly bound drug rises. A total phenytoin level that looks low or "in range" may correspond to a free concentration that is adequate or even toxic. Adjusting the dose to bring the total level up would then cause toxicity. Where possible a free level is measured; otherwise a correction is used and interpreted with clinical signs ([[pharmacology/dosing-principles]]).

### Barriers: brain, placenta and milk

The **blood–brain barrier** is formed by brain capillary endothelial cells joined by tight junctions, with P-gp and other efflux pumps in their membranes. Lipid-soluble drugs such as general anaesthetics, benzodiazepines and many opioids enter the brain readily. Polar drugs and P-gp substrates are kept out. Loperamide is an opioid that acts on the gut but has little central effect at usual doses, because P-gp pumps it out of the brain. Some drugs are designed to stay out: second-generation antihistamines such as cetirizine cause less sedation than older ones partly because they penetrate the brain poorly. Inflammation loosens the barrier, so penicillins, which normally penetrate poorly, reach effective concentrations in the cerebrospinal fluid in bacterial meningitis when given at high dose.

The **placenta** lets most lipid-soluble drugs pass, so the safest assumption is that a drug in the mother's circulation reaches the fetus unless it is large or highly polar. Warfarin crosses the placenta and can cause fetal harm; heparins, large polar molecules, do not cross. Drugs given just before delivery, such as opioids, can affect the newborn. Prescribing in pregnancy is covered in [[pharmacology/patient-variation]].

Most drugs pass into **breast milk** in small amounts. The dose received by the infant depends on the concentration in milk, the volume of milk and the infant's own ability to clear the drug, which is limited in premature and newborn infants. Specialist resources such as the UK Drugs in Lactation Advisory Service give drug-specific advice.

::: example The weak base in breast milk {#ex-milk}
A weak base with pKa 8.4 is not protein-bound. Plasma pH is 7.4 and milk pH is 7.0. Assuming only the un-ionised form crosses and equilibrium is reached, what is the ratio of total drug concentration in milk to that in plasma?
::: solution
At equilibrium the un-ionised concentration $U$ is the same on both sides. The total concentration on each side is $U(1 + \text{ionised}/\text{un-ionised})$, with the ratio from [[#eq-hh]] for a base.

- Plasma: $10^{8.4 - 7.4} = 10$, so total $= 11U$.
- Milk: $10^{8.4 - 7.0} = 10^{1.4} \approx 25.1$, so total $\approx 26.1U$.

Milk-to-plasma ratio $\approx 26.1/11 \approx 2.4$. The base is concentrated in the more acidic milk by ion trapping. A weak acid would show the opposite, with a ratio below 1. Real milk-to-plasma ratios also depend on protein binding, lipid solubility and active transport, so measured values are used where they exist.
:::
:::

::: quiz
A 30-year-old man has taken an overdose of a drug that has a volume of distribution of about 500 L in a 70 kg adult and is 95% protein-bound. A colleague suggests haemodialysis to remove it. Which statement is correct?
- [ ] Dialysis will be effective because the drug is small enough to cross the membrane
- [x] Dialysis will remove little of the total body load, because almost all the drug is in the tissues and most of the plasma drug is protein-bound
- [ ] Dialysis will be effective because a large volume of distribution means the drug is mainly in plasma
- [ ] Protein binding does not affect dialysis because only free drug is toxic
::: solution
Dialysis can only remove unbound drug from blood passing through the dialyser. A volume of distribution of 500 L, far larger than total body water, means that the plasma contains a tiny fraction of the total amount; and with 95% protein binding, only a twentieth of that is free to be dialysed. Drugs that are well removed by dialysis, such as lithium, have a small volume of distribution and low protein binding.
:::
:::

::: example A thyroid dose that stopped working {#ex-levothyroxine}
A 72-year-old woman of South Asian heritage has taken levothyroxine for hypothyroidism for many years with stable thyroid function. After a fragility fracture she starts calcium carbonate with vitamin D and ferrous sulfate for iron deficiency, all taken with breakfast together with her levothyroxine. Three months later her TSH is 14 mU/L (previously 2). What is the likely explanation, and what principles guide the response?
::: solution
The likely cause is reduced absorption of levothyroxine. Calcium and iron salts bind levothyroxine in the gut, forming complexes that are not absorbed, so bioavailability falls and she becomes biochemically hypothyroid.

The first step is to separate the doses rather than increase the levothyroxine. Levothyroxine is best taken on an empty stomach, and separating it from calcium and iron by at least four hours is usual advice. Thyroid function is rechecked after enough time for a new steady state (levothyroxine has a half-life of about a week, so about six weeks). If the dose were increased instead, she would become over-treated whenever the timing of the other tablets changed. Other causes of a rising TSH, such as adherence, a change of brand or coeliac disease, are also considered ([[endocrine/thyroid]]).
:::
:::

::: history
The measurement of drug absorption and distribution grew from the analytical chemistry of the twentieth century. In 1937 the Swedish physiologist Torsten Teorell published mathematical models of drug distribution between compartments, now regarded as the beginning of pharmacokinetics, although the field took its name only later. Friedrich Hartmut Dost in Germany introduced the term *Pharmakokinetik* in 1953. The pH-partition hypothesis, that un-ionised drug crosses membranes and that pH therefore governs absorption and trapping, was developed in the 1950s by Bernard Brodie, Lewis Schanker and colleagues at the National Institutes of Health, who measured the gastric and intestinal absorption of acids and bases in animals. The importance of bioavailability became obvious in the late 1960s and early 1970s, when changes in the inactive ingredients of phenytoin and digoxin tablets altered absorption enough to cause toxicity or loss of effect, and regulators began to require proof of bioequivalence for generic products.
:::

::: summary
- Most drugs cross membranes by passive diffusion of their un-ionised, lipid-soluble form; carriers such as P-glycoprotein add uptake and efflux.
- Ionisation follows the Henderson–Hasselbalch relation; pH differences across membranes cause ion trapping, which is used in salicylate poisoning and explains drug accumulation in milk and gastric juice.
- The route of administration sets speed of onset, bioavailability and which tissues see most drug. Topical drugs can still have systemic effects.
- Bioavailability $F$ is the fraction reaching the systemic circulation, measured by dose-corrected AUCs. First-pass metabolism in gut wall and liver reduces oral $F$.
- The apparent volume of distribution relates the amount in the body to the plasma concentration. It determines loading doses, contributes to half-life and predicts whether dialysis can remove a drug.
- Only unbound drug is active. Displacement interactions are rarely important, but low albumin changes the meaning of total drug levels.
- The blood–brain barrier excludes polar drugs and P-gp substrates; most lipid-soluble drugs cross the placenta and enter breast milk.
:::

## Where this leads

How the drug is removed again is the subject of [[pharmacology/metabolism-excretion]], and how absorption, volume and clearance combine into a dosing regimen is developed in [[pharmacology/dosing-principles]]. The effects of age, pregnancy, liver disease and body size on these processes are in [[pharmacology/patient-variation]]. Membrane transport itself is covered in [[cell-biochemistry/membranes-transport]], and the body fluid compartments in [[physiology/homeostasis-body-fluids]].

## Exercises

::: exercise Volume of distribution from a bolus {level=1 check="25"}
A 500 mg intravenous bolus of a drug gives an extrapolated initial plasma concentration of 20 mg/L. What is the apparent volume of distribution in litres?
::: solution
From [[#eq-vd]], $V_d = 500/20 = 25$ L. This is larger than extracellular fluid but smaller than total body water for an adult.
:::
:::

::: exercise Un-ionised fraction of a base {level=1 check="1"}
A weak base has a pKa of 9.4. What percentage of the drug is un-ionised in plasma at pH 7.4? Give your answer to the nearest whole number.
::: hint
For a base, ionised/un-ionised $= 10^{\mathrm{p}K_a - \mathrm{pH}}$. The un-ionised percentage is $100/(1 + \text{ratio})$.
:::
::: solution
Ratio $= 10^{9.4 - 7.4} = 100$. Un-ionised percentage $= 100/101 \approx 0.99\%$, which is **1%** to the nearest whole number. Many basic drugs, such as tricyclic antidepressants and local anaesthetics, are mostly ionised in plasma; the small un-ionised fraction is enough for them to cross membranes because it is constantly replenished.
:::
:::

::: exercise Choosing a route {level=1}
For each situation, suggest a suitable route and give one reason: (a) a person with severe vomiting who needs an antiemetic; (b) a child having a prolonged seizure at home, with no intravenous access; (c) long-term treatment of asthma to minimise systemic exposure to corticosteroid; (d) a person in septic shock who needs an antibiotic now.
::: solution
(a) A non-oral route such as intramuscular, intravenous, subcutaneous or (for some drugs) buccal or rectal, because oral drug will be vomited before it is absorbed. (b) Buccal (or intranasal) midazolam, or rectal diazepam, because they can be given by a carer without intravenous access and act within minutes; the choice follows the child's care plan. (c) Inhaled, because the drug is delivered to the airways and the systemic dose is much lower than for oral treatment. (d) Intravenous, because absorption is complete and immediate and does not depend on gut or muscle perfusion, which may be poor in shock.
:::
:::

::: exercise Bioavailability from two studies {level=2 check="0.4"}
After 100 mg orally, a drug's AUC is 30 mg·h/L. After 20 mg intravenously, its AUC is 15 mg·h/L. Calculate the oral bioavailability as a decimal fraction.
::: hint
Compare AUC per mg for each route.
:::
::: solution
Using [[#eq-f]], $F = (30 \times 20)/(15 \times 100) = 600/1500 = 0.4$. Only 40% of the oral dose reaches the systemic circulation unchanged, through incomplete absorption, first-pass metabolism or both.
:::
:::

::: exercise Milk and plasma {level=2 check="2.4"}
Using the method of [[#ex-milk]], calculate the milk-to-plasma ratio of total concentration for a weak base with pKa 8.4, assuming plasma pH 7.4 and milk pH 7.0, no protein binding and that only un-ionised drug crosses. Give your answer to one decimal place. Then state, without calculation, whether the ratio for a weak acid with pKa 4.4 would be above or below 1.
::: solution
Plasma total $= U(1 + 10^{1.0}) = 11U$; milk total $= U(1 + 10^{1.4}) \approx 26.12U$. Ratio $\approx 2.37$, which is **2.4** to one decimal place.

For the weak acid, ionisation is greater in the more alkaline plasma, so it is trapped in plasma and the milk-to-plasma ratio is below 1.
:::
:::

::: exercise Dialysis or not? {level=2}
Explain why haemodialysis is used in severe lithium toxicity but not in digoxin toxicity, referring to volume of distribution and protein binding. What other treatment exists for serious digoxin toxicity, and why does it work?
::: solution
Lithium is a small ion that is not protein-bound and distributes roughly in total body water (a volume of distribution of under 1 L/kg). A large share of the body load is in the blood and extracellular fluid at any moment, so dialysis removes a substantial amount, and lithium is not metabolised, so the kidney is otherwise its only route out.

Digoxin has a very large volume of distribution, several litres per kilogram, because it binds extensively to Na⁺/K⁺-ATPase in muscle and other tissues. The plasma holds only a small fraction of the total, so dialysing it removes very little.

For serious digoxin toxicity, digoxin-specific antibody fragments (Fab) are used. They bind free digoxin in plasma with very high affinity, lowering the free concentration; digoxin then moves from tissue binding sites into plasma down its concentration gradient and is bound in turn. The complex is excreted by the kidney. Indications and dosing follow toxicology advice ([[emergency-critical-care/poisoning]]).
:::
:::

::: exercise Oedema and the first dose {level=3 check="17.5"}
Following [[#ex-icu-vd]], a 70 kg patient receives 490 mg of an aminoglycoside. If her volume of distribution has risen to 0.4 L/kg, what peak concentration (mg/L) would you expect, assuming instantaneous distribution? Give the exact value. Then explain why the loading dose of a hydrophilic antibiotic is usually based on body weight and volume rather than on kidney function, and what monitoring follows.
::: solution
$V_d = 0.4 \times 70 = 28$ L, so $C_{\text{peak}} = 490/28 = 17.5$ mg/L.

The concentration reached by the first dose depends only on the dose and the volume into which it distributes (see [[#eq-vd]]). Kidney function determines how fast the drug is then removed, which governs the dosing interval and later doses. Reducing the first dose because the creatinine is raised would give a low peak just when effective killing of bacteria matters most. After the first dose, drug levels (often a timed level used with a nomogram or a trough level, according to local protocol) and kidney function guide the interval and decide whether treatment continues.
:::
:::

::: exercise A misleading phenytoin level {level=3}
A 79-year-old man of Black African heritage with epilepsy, chronic liver disease and an albumin of 22 g/L (reference about 35–50 g/L) is admitted with unsteadiness and nystagmus. His total plasma phenytoin is reported at 9 mg/L, which is slightly below the commonly quoted total range of 10–20 mg/L. A junior doctor suggests increasing the dose. Explain why this would be unwise, using the concept of free fraction, and outline how the level should be interpreted.
::: hint
Phenytoin is normally about 90% bound to albumin.
:::
::: solution
Phenytoin is normally about 90% bound to albumin, so a total level of 10–20 mg/L corresponds to a free (active) level of roughly 1–2 mg/L. With an albumin of 22 g/L, and possibly reduced binding in liver disease, the free fraction may be twice normal or more. A total of 9 mg/L could then correspond to a free level of about 2 mg/L or higher, at or above the top of the usual free range.

His unsteadiness and nystagmus are typical signs of phenytoin toxicity, consistent with a high free level despite a low-looking total. Increasing the dose would make him worse, and phenytoin's saturable metabolism means the rise could be disproportionate ([[pharmacology/metabolism-excretion]]).

The level should be interpreted with the clinical picture. A measured free phenytoin concentration is the best guide where available; otherwise an albumin-adjusted estimate is used, with caution, as described in [[pharmacology/dosing-principles]]. Other causes of his symptoms, such as alcohol, other sedative drugs, posterior circulation stroke or hepatic encephalopathy, also need to be considered.
:::
:::
