A dosing regimen answers three questions: how much drug to give, how often, and how quickly to reach the intended effect. For most drugs the answers come from the licensed dose in the formulary, adjusted for the individual. But behind every licensed dose are the quantities met in the last two chapters, the volume of distribution, the clearance and the half-life. Understanding how they combine explains why some drugs need a loading dose, why it takes days for a new dose to show its full effect, why a drug level taken at the wrong time is worse than none, and how to adjust a dose when the kidneys fail.

This chapter builds a dosing regimen from first principles. It covers the target concentration approach, loading and maintenance doses, accumulation and steady state, the choice of dosing interval, therapeutic drug monitoring, and dose adjustment in kidney disease. Numbers in this chapter are illustrative. Real doses come from a current formulary, such as the BNF, and local guidance for the individual patient.

## The target concentration approach {#sec-target}

For most drugs, effect is related more closely to the concentration at the site of action than to the dose. Because that site cannot usually be sampled, the plasma concentration is used as a stand-in. The aim of dosing is then to reach and keep a **target concentration** within the drug's therapeutic range.

::: definition Therapeutic range, loading dose and maintenance dose {#def-target-load}
The **therapeutic range** (or window) is the range of plasma concentrations associated with a high probability of benefit and a low probability of unacceptable toxicity in most patients. Its lower bound is sometimes called the minimum effective concentration and its upper bound the minimum toxic concentration. It is a population guide, not a guarantee for an individual.

A **loading dose** is a larger initial dose used to reach the target concentration quickly. It depends on the volume of distribution:

$$
\text{Loading dose} = \frac{V_d \times C_{\text{target}}}{F}.
$$ {#eq-load}

A **maintenance dose** keeps the concentration at the target by replacing the drug eliminated. At steady state the rate of input equals the rate of elimination, so it depends on clearance:

$$
\text{Maintenance dose rate} = \frac{CL \times C_{ss}}{F}.
$$ {#eq-maint}

Here $F$ is the bioavailability (1 for intravenous administration) and $C_{ss}$ the target average steady-state concentration.
:::

The two equations are worth keeping apart. Volume controls the loading dose; clearance controls the maintenance dose. A patient with oedema has a larger volume for a water-soluble drug and may need a larger loading dose, but the same maintenance dose if clearance is unchanged. A patient with kidney failure has a lower clearance for a renally excreted drug and needs a smaller maintenance dose, but usually the same loading dose.

::: example A digoxin loading dose {#ex-digoxin-load}
A 76-year-old man weighing 70 kg has atrial fibrillation with a fast ventricular rate and heart failure. Rapid rate control with digoxin is planned. Using illustrative values of $V_d = 7$ L/kg, a target plasma concentration of 1 µg/L and an oral bioavailability of 0.7, estimate the intravenous and oral loading doses. Why is a loading dose used at all?
::: solution
$V_d = 7 \times 70 = 490$ L.

Intravenous loading dose from [[#eq-load]]: $490 \times 1/1 = 490$ µg, about 0.5 mg.

Oral loading dose: $490/0.7 = 700$ µg.

These figures are of the same order as the licensed loading doses in the BNF, which are usually given in divided doses to reduce the risk of toxicity while the drug distributes. A loading dose is used because digoxin has a half-life of about 36 hours in people with normal kidney function, and longer in older people and in kidney impairment. Without a loading dose it would take four to five half-lives, a week or more, to reach steady state. Because digoxin's very large volume reflects binding in muscle, an older person with low muscle mass has a smaller volume, and loading doses are reduced accordingly. Actual dosing follows the BNF and local guidance.
:::
:::

## Accumulation and steady state {#sec-ss}

When a drug is given repeatedly, each dose is added to what remains of the previous ones. The amount in the body rises until the amount eliminated in each dosing interval equals the amount given. This balance is **steady state**.

::: theorem Steady state and the half-life rule {#def-ss}
For a drug with first-order elimination (rate constant $k$, half-life $t_{1/2}$) given by constant intravenous infusion, the concentration rises as

$$
C(t) = C_{ss}\left(1 - e^{-kt}\right), \qquad C_{ss} = \frac{\text{infusion rate}}{CL}.
$$ {#eq-infusion}

After $n$ half-lives the concentration has reached a fraction $1 - (1/2)^n$ of steady state: 50% after one, 75% after two, 87.5% after three, about 94% after four and about 97% after five. **Steady state is reached in about four to five half-lives, whatever the dose.**

With intermittent doses $D$ every $\tau$ hours, the concentration oscillates around an average steady-state value

$$
C_{ss,\text{avg}} = \frac{F \times D}{CL \times \tau},
$$ {#eq-cssavg}

and for intravenous bolus doses the steady-state peak is greater than the first-dose peak by the **accumulation factor** $1/(1 - e^{-k\tau})$.
:::

::: proof
During an infusion at rate $R_0$, the amount in the body changes as $V_d\,dC/dt = R_0 - CL \cdot C$. Writing $k = CL/V_d$ and solving with $C(0) = 0$ gives $C(t) = (R_0/CL)(1 - e^{-kt})$. As $t$ grows, $C$ approaches $R_0/CL = C_{ss}$. Substituting $t = n\,t_{1/2}$ and $e^{-k t_{1/2}} = 1/2$ gives the fraction $1 - (1/2)^n$.

For bolus doses, the concentration just after the $(n+1)$th dose is the sum of the contributions of all doses so far: $C_0(1 + e^{-k\tau} + e^{-2k\tau} + \dots + e^{-nk\tau})$, where $C_0 = D/V_d$. This geometric series tends to $C_0/(1 - e^{-k\tau})$. Averaging over an interval, the area under the curve in one interval at steady state equals the area after a single dose, $F D/CL$, and dividing by $\tau$ gives [[#eq-cssavg]].
:::

The half-life rule has some important consequences.

- **The time to steady state does not depend on the dose.** Doubling the dose doubles the steady-state level but does not reach it any faster. Only a loading dose shortens the wait.
- **After any change of dose, a new steady state takes another four to five half-lives.** A level measured too soon after a change underestimates the eventual level when the dose has been increased.
- **When the half-life is prolonged**, for example by kidney failure, steady state takes longer to reach and is higher at the same dose. Toxicity may appear only days after a dose was started.
- **The same rule describes washout.** After a drug is stopped, about 97% has gone after five half-lives.

The figure shows repeated intravenous doses building up to steady state.

::: widget plot
f: 10*exp(-(log(2)/h)*(x-T*floor(x/T)))*(1-exp(-(log(2)/h)*T*(floor(x/T)+1)))/(1-exp(-(log(2)/h)*T)); 10/(1-exp(-(log(2)/h)*T))*exp(-(log(2)/h)*(x-T*floor(x/T)))
x: 0, 120
y: 0, 45
sliders: h=12:2:48:1; T=12:4:24:2
hlines: 8; 25
labels: \text{repeated doses, no loading dose}; \text{same regimen after a loading dose}
caption: Illustrative concentration (mg/L) against time (hours) for identical intravenous doses, each giving 10 mg/L, every $T$ hours, for a drug with half-life $h$ hours. The horizontal lines mark an illustrative therapeutic range of 8 to 25 mg/L. Without a loading dose the troughs climb for about five half-lives. With a loading dose sized to the steady-state peak, the range is reached at once. Lengthen $h$ to see accumulation take longer and overshoot the range at the same dose; shorten $T$ to see the peaks and troughs move closer together.
:::

### Peaks, troughs and the dosing interval

The average steady-state concentration depends only on the dose rate ($D/\tau$) and clearance. The **fluctuation** between peak and trough depends on how the dosing interval compares with the half-life. If the interval is much shorter than the half-life, the concentration barely changes between doses; if it is longer, the swing is large.

The choice of interval balances convenience against fluctuation. Drugs with long half-lives, such as amlodipine or levothyroxine, can be given once daily with little fluctuation. Drugs with short half-lives either need frequent doses, a modified-release formulation, or an infusion, unless their effect outlasts their presence in plasma (as with irreversible inhibitors such as aspirin and omeprazole, [[pharmacology/drug-receptor]]).

For antimicrobials, the pattern of exposure matters as well as the average. Aminoglycosides kill in a concentration-dependent way and have a post-antibiotic effect, so a high peak once daily with a low trough maximises killing and reduces kidney and ear toxicity. β-lactams kill in a time-dependent way: what matters is the fraction of the interval during which the concentration stays above the organism's minimum inhibitory concentration, which favours frequent doses or prolonged infusions ([[microbiology/antimicrobials]]).

::: example Designing a maintenance regimen {#ex-maintenance}
An illustrative antibiotic has a clearance of 5 L/h and a volume of distribution of 60 L in a particular patient. The target average steady-state concentration is 10 mg/L. (a) What dose rate is needed? (b) What would the dose be every 12 hours, and what are the approximate steady-state peak and trough after intravenous bolus doses? (c) How would giving half the dose every 6 hours change these?
::: solution
(a) From [[#eq-maint]], dose rate $= 5 \times 10 = 50$ mg/h.

(b) Every 12 hours: $50 \times 12 = 600$ mg. Here $k = 5/60 = 0.083$ per hour ($t_{1/2} \approx 8.3$ h). Each dose raises the concentration by $600/60 = 10$ mg/L. The steady-state peak is $10/(1 - e^{-0.083 \times 12}) = 10/(1 - e^{-1}) \approx 15.8$ mg/L and the trough is $15.8 \times e^{-1} \approx 5.8$ mg/L.

(c) 300 mg every 6 hours gives the same average (10 mg/L) but each dose adds 5 mg/L: peak $5/(1 - e^{-0.5}) \approx 12.7$ mg/L and trough $\approx 7.7$ mg/L. Shorter intervals reduce fluctuation without changing the average. Whether that is better depends on the drug: for a time-dependent antibiotic, the higher trough may be useful; for a concentration-dependent one, the lower peak may be worse.
:::
:::

## Therapeutic drug monitoring {#sec-tdm}

For most drugs, the effect itself can be measured: blood pressure, heart rate, blood glucose, INR, pain score, symptoms. Doses are titrated against the effect, and plasma levels add nothing. For a small group of drugs, measuring the plasma concentration is useful.

::: definition Therapeutic drug monitoring {#def-tdm}
**Therapeutic drug monitoring** (TDM) is the measurement of drug concentrations in plasma (or blood) to guide dosing. It is useful when all of these apply:

1. there is a clear relationship between concentration and effect or toxicity;
2. the therapeutic range is narrow;
3. there is wide variation between individuals in the concentration produced by a given dose;
4. the effect is hard to measure directly, or toxicity is serious and may appear without warning;
5. a reliable assay is available quickly enough to influence decisions.

A level is interpretable only if the time of the last dose and of the sample are known, the drug is at steady state (unless toxicity or a loading dose is being assessed), and the result is read alongside the clinical picture.
:::

| Drug | When to sample (typical) | Why monitor |
|---|---|---|
| Lithium | 12 hours after the last dose; one week after starting and after each dose change, then regularly | Narrow range; toxicity with dehydration, kidney decline and interacting drugs |
| Digoxin | At least 6 hours after a dose (after distribution) | Toxicity, especially with hypokalaemia or kidney impairment; adherence |
| Phenytoin | Usually just before a dose; at steady state | Saturable kinetics; protein binding |
| Gentamicin, amikacin | According to the local protocol (for example a timed level after a once-daily dose, or a pre-dose trough) | Nephrotoxicity and ototoxicity; changing kidney function |
| Vancomycin | Pre-dose trough, or AUC-guided dosing where used | Efficacy and nephrotoxicity |
| Ciclosporin, tacrolimus | Pre-dose trough | Narrow range; many interactions; rejection versus toxicity |
| Some antiepileptics, theophylline | Pre-dose trough, at steady state | Toxicity; adherence; changing kinetics in pregnancy |

The ranges themselves differ between laboratories and indications; NICE guidance for lithium, for example, generally aims for 0.6–0.8 mmol/L when it is first prescribed, with higher levels considered for some people. Results outside the expected range are checked against the sample time, adherence, interacting drugs and organ function before the dose is changed.

::: warning A level taken at the wrong time can mislead badly
The most common error in TDM is the timing of the sample. A lithium level taken 2 hours after the morning dose, instead of 12 hours after the evening dose, catches the absorption peak and can look toxic. A digoxin level taken within 6 hours of a dose measures drug that has not yet distributed into tissue and overestimates the effect. A level checked three days after a dose increase of a drug with a 36-hour half-life is not yet at steady state and underestimates the final level. Every request should record when the last dose was given and when the sample was taken.
:::

::: example The lithium level that seemed too high {#ex-lithium-ss}
A 47-year-old woman with bipolar disorder has taken lithium carbonate at night for several years with levels of 0.6–0.7 mmol/L. Her dose was increased on Monday because of relapsing symptoms. On Wednesday, she has a blood test at 11 am, after taking her evening dose at 10 pm as usual; the result is 0.9 mmol/L. A colleague proposes reducing the dose immediately. What would you consider before changing it?
::: solution
Three timing questions come first.

- **Sample time.** The sample was taken 13 hours after the dose, close to the 12-hour standard, so it is interpretable as a standardised level.
- **Steady state.** Lithium's half-life in adults is typically around a day (longer in older people and in kidney impairment), so a new steady state takes about five days. Two days after a dose increase, the level is still rising. The final steady-state level is likely to be higher than 0.9 mmol/L, which strengthens rather than weakens the concern.
- **Other causes.** Dehydration, intercurrent illness, reduced kidney function, or new interacting drugs (thiazide diuretics, ACE inhibitors, angiotensin receptor blockers and NSAIDs all reduce lithium clearance) would also raise the level.

The next steps are clinical assessment for signs of toxicity (tremor, gastrointestinal symptoms, confusion, ataxia), checking kidney function, sodium and interacting drugs, and planning a repeat standardised 12-hour level one week after the dose change, in line with NICE guidance and the prescriber's plan. Decisions about the target level, which may be higher than usual for a person who has relapsed, rest with the specialist team ([[psychiatry/mood-disorders]]).
:::
:::

### Interpreting a level when binding changes

Most assays measure total drug concentration. For highly protein-bound drugs, a low albumin raises the free fraction, so a total level within the range may correspond to a high free level ([[pharmacology/absorption-distribution]]). For phenytoin, the free level can be measured directly in some laboratories. Where it cannot, the **Sheiner–Tozer equation** gives a rough adjusted total level:

$$
C_{\text{adjusted}} = \frac{C_{\text{measured}}}{0.2 \times \text{albumin (g/dL)} + 0.1}.
$$ {#eq-sheiner}

It is an approximation. It performs less well in kidney failure and critical illness, and clinical signs remain the final guide.

::: example The once-weekly drug taken daily {#ex-methotrexate-weekly}
A 69-year-old woman with rheumatoid arthritis takes methotrexate 10 mg once weekly with folic acid. After a hospital admission, her discharge prescription lists "methotrexate 10 mg daily". Two weeks later she has severe mouth ulcers, diarrhoea and bruising; her neutrophil count is 0.4 × 10⁹/L and platelets 20 × 10⁹/L. Explain the pharmacology of this harm and the safety principles involved.
::: solution
Low-dose methotrexate for inflammatory disease is given once a week. Taken daily, she has received seven times the intended dose. Methotrexate inhibits dihydrofolate reductase; rapidly dividing cells such as those of bone marrow and gut mucosa are the first to suffer, giving mucositis and pancytopenia. Methotrexate is excreted by the kidney, so any decline in kidney function during her admission would have reduced clearance further. Her presentation is a medical emergency, managed with urgent specialist advice, which may include folinic acid rescue.

This is a recognised, recurrent error, and national bodies in the UK have repeatedly issued safety advice about it. Principles that reduce it include writing the day of the week on the prescription, using a single tablet strength, prescribing systems that default to weekly dosing, checking the dose at medicines reconciliation on admission and discharge, and explaining the weekly regimen to the patient, often with a patient-held record ([[pharmacology/drug-development-prescribing]]).
:::
:::

::: quiz
Which of the following is the best reason why a drug level is *not* usually measured for an ACE inhibitor in hypertension?
- [ ] ACE inhibitors have a very narrow therapeutic range
- [ ] Their kinetics are saturable
- [x] The effect (blood pressure) can be measured directly and doses are titrated against it
- [ ] They are not absorbed orally
::: solution
TDM is worth doing when the effect is hard to measure or toxicity is unpredictable and serious. Blood pressure is easy to measure and is the outcome of interest, so the dose is titrated against it, with kidney function and potassium checked for safety. ACE inhibitors have a wide margin between effective and toxic concentrations, and their kinetics are linear at usual doses.
:::
:::

## Adjusting for kidney function {#sec-renal}

Many drugs, or their active metabolites, are cleared by the kidney. When kidney function falls, clearance falls with it, and if the dose is not adjusted the drug accumulates. Adjustment matters most for drugs that are mainly renally excreted and have a narrow therapeutic index: aminoglycosides, vancomycin, lithium, digoxin, direct oral anticoagulants, low molecular weight heparins, metformin, gabapentin and pregabalin, and some antivirals.

Kidney function is estimated in two main ways.

- **eGFR**, calculated by laboratories from creatinine, age and sex (in the UK usually with the CKD-EPI equation), is expressed per 1.73 m² of body surface area. It is designed for staging chronic kidney disease ([[renal/chronic-kidney-disease]]).
- **Creatinine clearance** estimated by the **Cockcroft–Gault equation**, expressed in mL/min for the actual patient. Many drug licences and dosing tables were derived using it.

$$
CrCl\ (\text{mL/min}) = \frac{(140 - \text{age}) \times \text{weight (kg)} \times K}{\text{serum creatinine } (\mu\text{mol/L})},
$$ {#eq-cg}

where $K = 1.23$ for men and $1.04$ for women. The BNF advises using estimated creatinine clearance rather than eGFR for direct oral anticoagulants, for drugs with a narrow therapeutic index that are mainly renally excreted, and for people at the extremes of body weight and older people, in whom the two estimates can differ substantially. Which weight to use in obesity follows local guidance.

Two strategies reduce exposure when clearance is lower. **Reducing the dose** at the same interval lowers peaks and troughs proportionately. **Extending the interval** at the same dose keeps the peak but lowers the average, which suits concentration-dependent drugs such as aminoglycosides. Loading doses are usually not reduced, because they depend on volume. Both estimates are unreliable when kidney function is changing quickly, as in acute kidney injury, when creatinine lags behind the true GFR ([[renal/acute-kidney-injury]]).

::: example Estimating creatinine clearance {#ex-cockcroft}
An 82-year-old woman of Irish heritage weighs 50 kg and has a serum creatinine of 110 µmol/L. Her laboratory eGFR is reported as 41 mL/min/1.73 m². A direct oral anticoagulant is being considered for atrial fibrillation. Estimate her creatinine clearance and comment.
::: solution
From [[#eq-cg]]:

$$
CrCl = \frac{(140 - 82) \times 50 \times 1.04}{110} = \frac{3016}{110} \approx 27 \text{ mL/min}.
$$

Her creatinine clearance (about 27 mL/min) is considerably lower than her eGFR (41 mL/min/1.73 m²), because she is small and old: the eGFR is standardised to an average body size, and her low muscle mass makes a "normal-looking" creatinine misleading. For direct oral anticoagulants, dose reductions and contraindications in the product licences are defined by creatinine clearance, so using eGFR could lead to overdosing and bleeding. The choice of drug and dose follows the product information, the BNF and local anticoagulation guidance.
:::
:::

::: example The rising gentamicin level {#ex-gent}
A 71-year-old man with pyelonephritis and bacteraemia is started on once-daily intravenous gentamicin according to the local protocol, alongside other antibiotics. His creatinine rises from 95 to 160 µmol/L over three days, and his pre-dose level before the fourth dose is above the protocol's threshold. Explain what has happened and the principles of the next step.
::: solution
Gentamicin is excreted almost entirely by glomerular filtration. As his kidney function has declined, its clearance has fallen and its half-life lengthened, so less of each dose is eliminated before the next one. The trough level rises; persistently high troughs are associated with nephrotoxicity and ototoxicity, which in turn reduce clearance further. Sepsis, hypotension and other nephrotoxic drugs may have contributed to the kidney injury.

Principles for the next step: withhold the dose until the level has fallen below the threshold, then extend the dosing interval (rather than simply reduce the dose, preserving a high peak for concentration-dependent killing), or switch to a less nephrotoxic agent when culture results allow. Review whether gentamicin is still needed at all, since many protocols limit courses to a few days. Repeat levels and kidney function closely, and look for and stop other nephrotoxic drugs. Specific thresholds and nomograms are those of the local protocol ([[infectious-diseases/stewardship-outbreaks]]).
:::
:::

::: history
The idea that a drug should be dosed to a concentration rather than simply by weight grew in the 1960s and 1970s, when sensitive assays became available. Gas chromatography and then immunoassays made it possible to measure drugs such as phenytoin, digoxin and the aminoglycosides in routine laboratories, and clinical pharmacologists began to relate levels to effect and toxicity. Lewis Sheiner and colleagues developed population pharmacokinetic methods in the 1970s, using sparse samples from many patients to estimate typical clearance and volume and their variation; their approach underlies the dosing software and nomograms used today. Donald Cockcroft and Henry Gault published their creatinine clearance equation in 1976, from data on 249 men, with the correction for women added as an assumption; it remains part of drug licensing and dosing nearly half a century later. Extended-interval (once-daily) dosing of aminoglycosides was adopted widely in the 1990s, after clinical studies showed similar efficacy with less toxicity than divided doses.
:::

::: summary
- Dosing aims for a target concentration within the therapeutic range. Loading dose $= V_d \times C_{\text{target}}/F$; maintenance dose rate $= CL \times C_{ss}/F$.
- Steady state is reached after four to five half-lives regardless of dose; only a loading dose shortens the wait. Any dose change starts the clock again.
- Average steady-state concentration $= F D/(CL\,\tau)$. The dosing interval relative to the half-life determines the fluctuation between peak and trough.
- Therapeutic drug monitoring is useful for narrow-range drugs with variable kinetics and effects that are hard to measure: lithium, digoxin, phenytoin, aminoglycosides, vancomycin, ciclosporin and tacrolimus among others.
- Interpret levels with the sample time, steady state, protein binding and the clinical picture.
- In kidney impairment, reduce maintenance doses or extend intervals for renally cleared drugs; estimate creatinine clearance (Cockcroft–Gault) where licences and the BNF require it.
:::

## Where this leads

How patients differ in clearance, volume and sensitivity, from children to older people and from pregnancy to genetic variation, is covered in [[pharmacology/patient-variation]]. The consequences when dosing goes wrong are discussed in [[pharmacology/adverse-reactions]], and the systems that keep prescribing safe in [[pharmacology/drug-development-prescribing]]. Kidney function and its estimation are covered in [[renal/filtration]], and prescribing for older people with many medicines in [[geriatrics-palliative/polypharmacy]].

## Exercises

::: exercise How close to steady state? {level=1 check="87.5"}
A drug is given by constant intravenous infusion. What percentage of the eventual steady-state concentration is reached after three half-lives? Give the exact value.
::: solution
$100 \times (1 - 0.5^3) = 100 \times 0.875 = 87.5\%$.
:::
:::

::: exercise A loading dose {level=1 check="200"}
A drug has a volume of distribution of 50 L and is given intravenously. What loading dose (in mg) is needed to reach a plasma concentration of 4 mg/L?
::: solution
From [[#eq-load]], loading dose $= 50 \times 4/1 = 200$ mg.
:::
:::

::: exercise A maintenance dose {level=1 check="360"}
A drug has a clearance of 3 L/h and is given intravenously. The target average steady-state concentration is 15 mg/L. What dose (in mg) should be given every 8 hours?
::: hint
Find the hourly dose rate first.
:::
::: solution
Dose rate $= CL \times C_{ss} = 3 \times 15 = 45$ mg/h. Every 8 hours: $45 \times 8 = 360$ mg.
:::
:::

::: exercise Accumulation with frequent dosing {level=2 check="3.4"}
A drug with a half-life of 12 hours is given as an intravenous bolus every 6 hours. By what factor is the steady-state peak greater than the peak after the first dose? Give your answer to one decimal place.
::: hint
The accumulation factor is $1/(1 - e^{-k\tau})$, and $e^{-k\tau} = (1/2)^{\tau/t_{1/2}}$.
:::
::: solution
$e^{-k\tau} = 0.5^{6/12} = 0.5^{0.5} \approx 0.707$. Accumulation factor $= 1/(1 - 0.707) \approx 3.41$, which is **3.4** to one decimal place. When the interval is shorter than the half-life, drug accumulates considerably before steady state is reached.
:::
:::

::: exercise Cockcroft–Gault {level=2 check="43"}
Estimate the creatinine clearance of a 75-year-old man weighing 80 kg with a serum creatinine of 150 µmol/L, using the Cockcroft–Gault equation. Give your answer to the nearest whole number in mL/min.
::: solution
$CrCl = (140 - 75) \times 80 \times 1.23/150 = 6396/150 \approx 42.6$, which is **43** mL/min.
:::
:::

::: exercise When to check the level {level=2}
A 58-year-old man with epilepsy takes an antiepileptic drug with a half-life of about 60 hours. His dose is increased on 1 March because of breakthrough seizures. (a) Roughly when will the new steady state be reached? (b) When would a level be most informative, and at what time of day? (c) If he developed ataxia on 3 March, would you wait for steady state before checking a level?
::: solution
(a) Four to five half-lives: about 240–300 hours, or 10–12 days. Steady state would be reached around 11–13 March.

(b) A pre-dose (trough) sample after about two weeks gives the most reproducible measure of the new steady state, recorded with the time of the last dose.

(c) No. Steady state matters for judging whether a dose is right in the long term. Suspected toxicity is a reason to measure the level at once, along with clinical assessment; the result is then interpreted knowing that concentrations may still be rising.
:::
:::

::: exercise Time to near steady state on an infusion {level=3 check="13.3"}
A drug with a half-life of 4 hours is started as a constant intravenous infusion with no loading dose. How many hours will it take to reach 90% of the steady-state concentration? Give your answer to one decimal place. Then explain how a loading dose would change this, and why the infusion rate cannot be used to speed it up.
::: hint
Solve $1 - e^{-kt} = 0.9$, with $k = \ln 2/4$.
:::
::: solution
$e^{-kt} = 0.1$, so $t = \ln 10/k = \ln 10 \times 4/\ln 2 \approx 13.29$ hours, which is **13.3** hours (about 3.3 half-lives).

A loading dose of $V_d \times C_{ss}$ at the start fills the volume of distribution immediately, so the target is reached at once and the infusion then maintains it. Increasing the infusion rate instead raises the eventual steady-state concentration proportionately but leaves the time course unchanged (it still takes 3.3 half-lives to reach 90% of the new, higher plateau), so the patient would overshoot the target. A temporary high rate followed by a lower one is in effect a loading dose given over a period.
:::
:::

::: exercise Adjusting a phenytoin level for low albumin {level=3 check="10"}
A 66-year-old woman with epilepsy and nephrotic syndrome has a measured total phenytoin concentration of 6 mg/L and a serum albumin of 25 g/L (2.5 g/dL). Using the Sheiner–Tozer equation [[#eq-sheiner]], calculate the adjusted total concentration in mg/L. Give the exact value. Explain what the result means for her dosing, and state two limitations of the calculation.
::: solution
$C_{\text{adjusted}} = 6/(0.2 \times 2.5 + 0.1) = 6/0.6 = 10$ mg/L.

The measured level of 6 mg/L looks low, but because her albumin is low a larger fraction of the drug is free. The adjusted value of 10 mg/L estimates what the total level would be at normal albumin, and suggests that her free (active) concentration is at the lower end of the usual range rather than subtherapeutic. Increasing the dose on the basis of the raw total level could produce toxicity, especially because phenytoin's elimination is saturable.

Limitations: the equation was derived in specific populations and is less accurate in kidney failure (where uraemic toxins also displace phenytoin) and critical illness; it assumes binding depends only on albumin concentration. A measured free phenytoin level, where available, is more reliable, and decisions rest on seizure control and clinical signs of toxicity.
:::
:::
