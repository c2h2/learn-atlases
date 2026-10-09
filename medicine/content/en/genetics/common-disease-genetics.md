Most disease that a doctor sees is not Mendelian. Coronary artery disease, type 2 diabetes, schizophrenia, asthma, inflammatory bowel disease, breast cancer, chronic kidney disease and depression all run in families, but they do not segregate: a son inherits a risk, not a diagnosis. Explaining that pattern, measuring it, and using it without overclaiming is the content of this chapter, and it is where genetics meets the epidemiology you will meet again in [[epidemiology-ebm/observational-studies]].

Four questions organise the subject. How much of the variation in a population is genetic (heritability)? Which variants are responsible, and how do we find them (linkage, association, sequencing)? How much risk does an individual carrying them have (polygenic scores, family history)? And what can be done about it (risk stratification, prevention, and the ethics of predicting)?

## Liability, threshold and the shape of familial risk

::: definition Multifactorial inheritance and the liability-threshold model {#def-liability}
**Multifactorial** disease results from many genetic and environmental influences of small effect. The **liability-threshold model** supposes an underlying continuous liability — largely, but not entirely, additive — and that disease occurs when liability exceeds a threshold $\tau$. Because the population prevalence $K$ is the tail area above $\tau$, a relative of an affected person, whose mean liability is shifted upwards, has a risk far greater than $K$ in relative terms when the disease is rare. The model explains three observations at once: recurrence risks fall steeply as the relationship becomes more distant; risks are higher for the less common sex-specific form of a disease (congenital pyloric stenosis, which is more common in boys, recurs more often in their relatives; multiple sclerosis in a family where the affected person is of the less-affected sex); and the risk rises with the number of affected relatives.
:::

::: theorem Edwards' square-root rule {#thm-edwards}
For a rare multifactorial disease, the risk to a sibling of an affected person is approximately $\sqrt{K}$, where $K$ is the population prevalence — so the sibling relative risk $\lambda_{s}$ is roughly $1/\sqrt{K}$ and rises as the disease becomes rarer.
:::

::: proof
With many loci of small effect, a sibling shares on average half the segregating genetic variation, so the sibling's liability is shifted by about half the excess mean liability of an affected proband's relatives. For a normal distribution, tail probabilities fall faster than exponentially, so a fixed shift in the mean produces a multiplicative increase in the tail area that is close to a square root when $K$ is small: writing the sib risk as $K' \approx c\sqrt{K}$ for a constant $c$ of order 1 reproduces the empirical pattern that $\lambda_s = K'/K \approx 1/\sqrt{K}$ — about 3 for a condition with $K \approx 0.1$, about 14 where $K \approx 0.005$, and above 30 where $K$ approaches $10^{-3}$ The rule fails where it must: single large-effect alleles (a BRCA1 variant gives a much higher risk than $\sqrt{K}$), shared environment inflating sibling similarity, and assortative mating. Its clinical value is that it gives an instant sanity check: if a family's reported "risk of the same disease" is far from $\sqrt{K}$, look for a Mendelian cause, shared exposure, or over-reporting.
:::

::: widget plot
f: exp(-x^2/2); 0.62*exp(-(x-m)^2/2)
x: -4.5, 4.5
y: 0, 0.62
sliders: m=0:0:1.5:0.05
caption: The liability-threshold model. The dark curve is the population's liability, standard normal; disease occupies the right-hand tail beyond the (fixed) threshold. The lighter curve is the distribution in first-degree relatives of an affected person: the same threshold is crossed far more often even though the curve has merely shifted a little to the right, by $m$. Slide $m$ and watch the asymmetry: rare conditions (a threshold far to the right) show a large *relative* increase in risk for a small shift, which is why a sibling relative risk of 20 for schizophrenia and 2 for hypertension can arise from similar biological transmission.
:::

## Heritability

::: definition Heritability {#def-heritability}
**Heritability** is the fraction of phenotypic *variance in a population* attributable to genetic variation. **Broad-sense** heritability $H^{2}$ includes dominance and epistasis; **narrow-sense** heritability $h^{2}$ counts only additive effects, and is the quantity that responds to selection and that polygenic scores can capture. It is defined for a population at a time, in a range of environments: it says nothing about an individual, nothing about inevitability, and changes if the environment changes.
:::

The classical estimates come from twins and adoptees. Under the equal-environment assumption, Falconer's formula gives

$$
h^{2} \approx 2\,(r_{\text{MZ}} - r_{\text{DZ}}),
$$ {#eq-falconer}

where $r$ is the within-pair correlation (or, for binary disease, a concordance-derived liability correlation). Method-of-methods matter enormously: pedigree regression, twin modelling, adoption designs, SNP-based GREML (restricted maximum likelihood on genotyped common variants), and LD-score regression on GWAS summary statistics all answer slightly different questions, and for many common diseases SNP heritability on the liability scale lies between about 0.1 and 0.4 even when family-based heritability is higher — the historical "missing heritability" gap, now largely attributed to variants of small effect that early GWAS could not detect, plus rare variation, structural variation and gene–environment structure.

::: example From twin pairs to heritability {#ex-h2}
Concordance for schizophrenia is 0.48 in 40 pairs of monozygotic twins and 0.17 in 80 pairs of dizygotic twins. Estimate the heritability and list what could make the number wrong.
::: solution
Using liability-scale concordances as correlations, Falconer's rule gives $h^{2} \approx 2(0.48 - 0.17) = 0.62$. The assumptions are the interesting part: monozygotic twins share more prenatal and postnatal environment than dizygotic twins (chorion, similar treatment, identical appearance), so the "environmental" term in the MZ correlation is inflated and $h^{2}$ biased upward; assortative mating in schizophrenia raises the genetic similarity of dizygotic and monozygotic pairs alike; the sample of twin registries is not population-representative; concordance is defined by a diagnostic boundary that is itself unstable, and a "concordant" pair may differ in severity, so liability is measured with error; and with only 120 pairs the confidence interval on 0.62 is wide. Adoption and sibling studies, and SNP-based estimates, all point to substantial heritability of roughly 0.5–0.8 for schizophrenia, so the direction of the conclusion is robust even where the arithmetic is crude. The lesson to carry away is that a single heritability number should be quoted with its design and its assumptions, and never as "60% of his schizophrenia was genetic".
:::
:::

::: warning High heritability does not mean non-modifiable, and low heritability does not mean unimportant
Heritability is a property of a population's variance, so it moves with the environment. Adult height is around 80% heritable in narrow-sense terms in most studied populations, yet the average height of northern Europeans rose by roughly 10 cm in a century — an entirely environmental change with zero change in allele frequencies. Myopia has high heritability and its prevalence has tripled in a generation alongside near-work and time outdoors. Conversely, lung cancer's heritability is modest, but smoking — an exposure, not a variant — causes most of it, and the small number of individuals at very high genetic risk (for example, fast N-acetyltransferase acetylator status interacting with tobacco carcinogens in bladder cancer, or germline *EGFR* variants in never-smoker lung adenocarcinoma) does not change the population-attributable fraction of smoking. Quote heritability only together with the environments over which it was measured, and never to a patient as a statement about their own fate.
:::

## Finding the variants

::: definition Linkage versus association {#def-linkage-association}
**Linkage** studies track co-transmission of a chromosomal segment with disease through families; it has power for large effects and rare variants, needs few assumptions about the model, and resolves the causal region only to tens of megabases. **Association** (candidate-gene and, decisively, genome-wide) compares allele frequencies between unrelated cases and controls; because recombination over many generations leaves short shared haplotypes, association can localise to within a few kilobases — but only for alleles common enough to be observed in both groups, and with strict control of multiple testing and population structure.
:::

A genome-wide association study (GWAS) genotypes hundreds of thousands of common variants, imputes to millions using a reference panel, checks quality (sample call rate, relatedness, heterozygosity, sex checks, plate effects), corrects for ancestry with principal components, tests each variant (usually additive logistic or linear regression, with meta-analysis across cohorts), and declares genome-wide significance at about $p < 5 \times 10^{-8}$ — the Bonferroni threshold for a million effectively independent tests. Findings must replicate in independent samples; effect sizes are reported as odds ratios for binary traits and per-allele betas for quantitative ones.

What GWAS found was unexpected in detail. Most associated variants lie in non-coding DNA; they cluster in enhancers and promoter regions active in the relevant cell type; the causal gene is not always the nearest gene; a variant can be associated with several apparently unrelated diseases (pleiotropy at *IL23R*, *HLA* and *LPP* across immune disease, and at lipid loci across coronary disease); and a large fraction of the signal at a locus reflects several distinct alleles, which is why fine-mapping by statistical credible sets and functional follow-up (eQTL colocalisation, CRISPR perturbations in relevant cells) is now a research field of its own.

::: example Reading a genome-wide result {#ex-gwas}
A GWAS of 60,000 cases and 120,000 controls reports a common intronic variant (minor allele frequency 24%) associated with coronary artery disease at odds ratio 1.06 per copy, $p = 3 \times 10^{-14}$. A journalist writes that "scientists have found a gene that causes heart disease". What is right, what is wrong, and what would you need before this variant was useful clinically?
::: solution
Right: the association is statistically secure — far beyond genome-wide significance, in a study of adequate size, and the effect direction and size are typical of the many common variants known to influence coronary risk. Wrong: "causes" and "gene". An odds ratio of 1.06 is a 6% relative increase per copy, which for a person with a 10-year risk of 5% means roughly 5.3% (heterozygous) or 5.6% (homozygous) — a difference that changes no management decision alone; the variant is intronic and may tag, rather than mediate, the signal at a neighbouring gene; the estimate applies to the population and era studied, with its own confounding structure and environmental distribution; and the study cannot show that altering the pathway lowers risk. Before any clinical use one needs replication in independent cohorts including other ancestries, fine-mapping to a plausible causal variant and gene, evidence that the gene's function is in the disease pathway, calibration in the target population (an odds ratio from a middle-aged European cohort is not transportable), and — decisively — a demonstration that acting on the result changes outcomes, since risk information is only useful if it changes prevention. The honest summary is that this is real biology with negligible individual prediction, which is precisely why polygenic scores aggregate hundreds of such variants.
:::
:::

## Polygenic scores and their limits

A **polygenic risk score** sums the risk alleles an individual carries, weighted by their GWAS effect sizes: $G = \sum_j \beta_j x_j$, where $x_j$ is the allele dosage. Scores are usually reported as percentiles of a population distribution. A well-built score for coronary disease separates roughly a threefold difference in risk between the top and bottom half of the distribution, and people in the top 8% of a coronary polygenic score have a risk comparable to someone with a single intermediate-effect variant — the finding that motivated work on using polygenic scores to enrich for preventive therapy. Similar scores now exist for type 2 diabetes, several cancers, and some psychiatric disorders, and there are trials in progress of returning coronary and breast cancer polygenic scores within population screening.

The limits are equally important and should be stated before a score is used clinically:

- **Ancestry transferability.** Scores derived in European-ancestry GWAS lose most of their accuracy in African, East Asian, South Asian and admixed populations, because of different linkage structure, allele frequencies, effect sizes and unmodelled environment. This is a property of the current data, not of human biology, and deploying an untransferable score widens the very inequity medicine is trying to reduce.
- **Confounding by environment and by population structure.** Because relatives share genes and environment, a score can appear to "predict" outcomes through upbringing, socioeconomic position, or differential access to care; within-family analyses shrink several such effects.
- **Calibration and the base rate.** A score must be converted to absolute risk using the population incidence; a "high polygenic score" for a disease with 1-in-1,000 prevalence is not a diagnosis, and any screening programme must know its positive predictive value in the population screened.
- **Clinical utility versus validity.** Analytic validity, predictive validity and utility are different claims, and only the last justifies a screening programme; the interim position for most services is that family history plus conventional risk factors remain the standard, with polygenic scores as an adjunct under study.
- **Determinism and disclosure.** Scores are probabilistic, change when recalculated on larger GWAS, and may be stored, sold and used in ways the person did not consent to. Genetic information is family information, and polygenic information is also not exempt from these arguments.

::: example A polygenic score in a clinic {#ex-prs}
A 52-year-old man, non-smoker, blood pressure 128/78, LDL 3.4 mmol/L, no diabetes, father had a myocardial infarction at 64, asks about a direct-to-consumer polygenic score he has had done that places him in the 88th percentile for coronary disease.
::: solution
First place the number in the risk model that actually governs his management: his 10-year risk from QRISK or SCORE2-type equations, driven by age, sex, blood pressure, lipids, smoking, diabetes, deprivation and family history (a first-degree relative with premature disease — before 60 for men — is the usual threshold at which family history adds risk; his father's infarction at 64 is borderline). His score sits in a range where the evidence is that polygenic information adds modest discrimination at best and no validated treatment threshold; in most populations and services it should not change a decision. Second, treat the finding as a teaching and engagement opportunity, which is where these results are most useful: he is asymptomatic with an LDL of 3.4 mmol/L and family history, so the actionable conversation is about blood pressure, lipids, physical activity, weight, and — if risk is uncertain — a coronary calcium score, which measures disease rather than susceptibility and does reclassify management. Third, be explicit about the limits: the score is derived mostly from European-ancestry cohorts, it is not recalibrated as GWAS grow, it is his family's information too, and "88th percentile" is not a diagnosis. If he wants his risk refined formally, the route is a validated clinical tool with a lipid and blood-pressure measurement, not a genotype report.
:::
:::

## Genes and environments

::: definition Gene–environment interaction and correlation {#def-ge}
**Gene–environment interaction** means that the effect of an exposure differs by genotype (multiplicative or additive scale — say which). **Gene–environment correlation** means that genotype influences exposure, so an apparent genetic effect may be partly an environmental one; it is a serious problem in educational, behavioural and psychiatric genetics, where a genotype–environment correlation may be created by parents' genotypes (genetic nurture) or by the child's evocation of environments.
:::

Examples with clinical content: **phenylketonuria** is the paradigm of a genetic disease whose phenotype is entirely environment-dependent — cognitive impairment from dietary phenylalanine, prevented by a formula, and the reason newborn screening exists, with the maternal-phenylketonuria variant of the same problem in the next generation. **Alcohol** — the *ALDH2* Glu504Lys variant, common in East Asia, causes acetaldehyde accumulation and flushing, protects strongly against alcohol dependence, and multiplies oesophageal cancer risk in those who drink nonetheless, an interaction to recognise in a flushing patient. **Aminoglycoside hearing loss** with the mitochondrial m.1555A>G variant, a pharmacogenetic interaction with catastrophic consequence for a family and a reason the variant is screened before prolonged aminoglycoside courses in some services. **Sun exposure** with *MC1R* variants and melanoma, where the population attributable fraction of sunlight dwarfs the genotype effect and yet genotype modifies it. **Smoking** with *GPR155*/CHRNA5 variants for nicotine dependence and with alpha-1-antitrypsin *SERPINA1* Z-allele carriers who develop emphysema early if they smoke.

Developmental and epigenetic effects belong here too: the Dutch hunger winter cohorts show that famine exposure in early pregnancy is associated with altered methylation at *IGF2* in the offspring and with increased risk of later metabolic and cardiovascular outcomes, findings that are hypothesis-generating about mechanisms and that should be quoted with the limits of human epigenetic association studies (tissue specificity, reverse causation, whether methylation is cause or consequence).

## From statistics to a clinic

What a clinician actually does with this:

1. **Take a three-generation family history properly**, with ages, ethnic origin, consanguinity, and outcomes; it is the cheapest genetic test available and identifies people whose risk warrants earlier or additional surveillance (see [[clinical-skills/records-handover]] for documentation and [[genetics/genetic-testing]] for what to order).
2. **Recognise when a "common" disease is behaving as a Mendelian one** — breast or ovarian cancer in two generations before 50, colorectal cancer before 45 with right-sided tumours and multiple primaries, endometrial cancer with the same, cardiomyopathy or aortic disease in a young relative with sudden death — and refer, because a monogenic cause changes management for relatives in ways that a polygenic score does not.
3. **Use risk tools honestly**: state that risk is probabilistic, that modifiable factors usually dominate, and that the point of risk information is action.
4. **Avoid genetic determinism in language**, particularly with psychiatric and behavioural conditions, and resist the request to "test for" diseases for which no action follows.
5. **Know the population data when giving advice about a family**: recurrence risk for a multifactorial condition comes from the liability model, not from a 25% figure, and quoting a wrong pattern (Mendelian) for a multifactorial disease causes real distress and wrong decisions.

::: example A family history that is neither Mendelian nor negligible {#ex-t1d}
A 28-year-old woman, healthy, asks about the risk of type 1 diabetes in her future children: her 30-year-old brother was diagnosed at 11, and her parents are unaffected and unrelated. She has read that the disease is "genetic" and wants to know whether to have her partner tested.
::: solution
Type 1 diabetes is multifactorial with a large immune-mediated environmental component, so the arithmetic is the liability model rather than 25%. Her own risk is around 1 in 15–25 (a sibling relative risk of roughly 15–25 on a population prevalence near 1 in 300–500 in European-ancestry populations, and lower in populations with lower prevalence), and her child's risk depends chiefly on the *other* parent: the background population risk, modified by any family history on the partner's side. Published figures put the risk to a child at about 6–8% if the father is affected and 2–4% if the mother is — a parent-of-origin difference of uncertain mechanism (in part the intrauterine environment of an affected mother, and possibly imprinting-like effects at the HLA region); neither applies directly to an affected uncle, whose niece's children sit only a little above population risk. Testing the partner is not indicated: there is no clinical test for the polygenic background of type 1 diabetes, HLA typing is used in research and in some prediction studies, not for reproductive decisions, and a result would not change management. What is worth doing is accurate, proportionate advice: the absolute risk to her children is low, in the range of a few per cent at most; nothing about the family history warrants special antenatal or neonatal arrangements; awareness of symptoms in the family is reasonable and appropriate; and if she wants a number, the family history-based figure with its uncertainty range is the honest answer. Note the temptation to be more precise than the evidence allows, and the mirror-image error, of dismissing the family history because the disease is "only" multifactorial.
:::
:::

::: quiz
Narrow-sense heritability for height in a population is estimated at 0.8. Which statement is correct?
- [ ] 80% of an individual's height is determined by their genes.
- [x] 80% of the variance of height in that population, in that range of environments, is attributable to additive genetic variation.
- [ ] If nutrition improves, the heritability of height must rise.
- [ ] A child of two tall parents will be taller than 80% of the population.
::: solution
Heritability is a population-level variance ratio: it does not decompose an individual's phenotype, and it can fall when environment improves (with better nutrition the environmental variance grows and $h^{2}$ may fall even as mean height rises). Regression to the mean also applies, so the tall parents' child is expected to be tall but closer to the population mean than the mid-parent value.
:::
:::

::: history
Francis Galton's biometry asked the question — is ability inherited? — and bequeathed the statistical apparatus and the disgrace of eugenics. Ronald Fisher's 1918 paper *The Correlation Between Relatives on the Supposition of Mendelian Inheritance* reconciled Mendelian particulate inheritance with continuous variation and created quantitative genetics; Sewall Wright's path analysis and J. L. Castle and Hermann Nilsson-Ehle's work on polygenes supplied the models; and Kenneth Falconer's textbook of 1960 gave the twin and sibling formulas still used. Richard Doll and Austin Bradford Hill's demonstration that an exposure causes a common disease (1950 onwards) established the environmental half of the equation. David Botstein, Mark Lathrop and colleagues turned linkage analysis into a genome-scan method in the late 1980s; Charles Risch formalised sibling relative risk and the case-control design for complex disease in the early 1990s; the Wellcome Trust Case Control Consortium's 2007 report of 14,000 cases and 3,000 controls at 500,000 variants showed both the power and the limits of unreplicated candidate-gene findings, and with the 2005 complement factor H association in age-related macular degeneration began the GWAS era. Jian Yang, Peter Visscher and colleagues' genome-wide complex trait analysis, and Brenna Bulik-Sullivan and colleagues' LD-score regression, made heritability from genotypes routine; and Amit Khera and colleagues showed that people in the top few per cent of a coronary polygenic score carry risk comparable to that of a single-gene lipid disorder — moving the question from discovery to clinical use.
:::

## Where this leads

Design, bias and confounding are treated in [[epidemiology-ebm/observational-studies]] and [[epidemiology-ebm/bias-confounding]]; single-gene risk arithmetic in [[genetics/mendelian-inheritance]]; how the variants are actually measured in [[genetics/genetic-testing]]; pharmacogenetics and the clinical use of genomic data in [[genetics/genomic-medicine]]; inherited cancer risk in [[genetics/cancer-genetics]].

::: summary
- Common disease is multifactorial: the liability-threshold model explains the sibling-relative-risk gradient, the sex and severity effects, and why a rare familial disease gives large relative risks.
- Edwards' $\sqrt{K}$ rule is a quick sanity check on any quoted familial risk; when it fails badly, suspect a Mendelian cause, shared environment or reporting bias.
- Heritability is a population variance ratio, design-dependent and environment-dependent; Falconer's formula is a starting point, not a fact, and a high heritability says nothing about modifiability.
- Linkage finds large rare effects in families; association finds small common effects in populations, at $p < 5 \times 10^{-8}$, with replication; most GWAS variants are non-coding and the causal gene is often not the nearest one.
- Polygenic scores aggregate small effects and can stratify risk, but transfer poorly across ancestries, are confounded by shared environment, and need proof of clinical utility before screening.
- Gene–environment interaction is the rule for modifiable exposures (phenylketonuria, alcohol, sun, smoking, aminoglycosides), and gene–environment correlation is the main threat to behavioural-genetic inference.
- In clinic: take the family history properly, refer when a common disease behaves as a Mendelian one, and use risk language that is probabilistic and actionable.
:::

## Exercises

::: exercise Sibling relative risk {level=1 check="1/70"}
A disease has a population prevalence of 1 in 5,000. Estimate, using Edwards' rule, the risk to a sibling of an affected person.
::: solution
$\sqrt{K} = \sqrt{1/5000} \approx 1/70$. The sibling relative risk is therefore about $5000/70 \approx 71$: rare multifactorial diseases carry large relative risks to relatives, and that is the arithmetic behind a positive family history for a disease such as coeliac disease (prevalence about 1 in 100, so a first-degree relative's risk of roughly 1 in 10 and a relative risk near 10), and its near-absence for hypertension.
:::
:::

::: exercise Falconer's formula {level=1 check="0.7"}
Concordance for a condition is 0.65 in monozygotic and 0.30 in dizygotic twin pairs. Estimate narrow-sense heritability.
::: solution
$h^{2} \approx 2(0.65 - 0.30) = 0.70$. Quote it with its assumptions: equal environments, no assortative mating, no gene–environment correlation, reliable case definition, and concordance used as a proxy for the liability correlation.
:::
:::

::: exercise From odds ratio to a person {level=1}
A variant has odds ratio 1.20 for a disease whose 10-year incidence in a 50-year-old woman is 2%. Estimate her 10-year risk if she carries one copy, and say what the approximation hides.
::: solution
Multiplicative risk on the odds scale gives an approximate 10-year risk of about $2\% \times 1.2 \approx 2.4\%$ (strictly, converting 2% to odds, multiplying by 1.2 and back gives 2.4%). What the approximation hides: the odds ratio is estimated in a particular population, with a particular age range, ancestry and exposure distribution; it is not transportable to other ancestries or to her; the confidence interval matters at these effect sizes; and a 0.4 percentage-point absolute increase changes nothing on its own, which is why risk prediction uses models with several factors.
:::
:::

::: exercise Why the threshold is what it is {level=2}
Explain why GWAS use $p < 5 \times 10^{-8}$ rather than $p < 0.05$, and what a study reporting "genome-wide suggestive" association at $p = 2 \times 10^{-7}$ should be said to have found.
::: solution
With about a million semi-independent common variants tested, a threshold of 0.05 guarantees tens of thousands of false positives; $0.05/10^{6} = 5 \times 10^{-8}$ controls the family-wise error rate near 5%. A "suggestive" result at $2 \times 10^{-7}$ is, in a single study, more likely to be noise or a small real effect that failed to reach the threshold than a validated association; historically, most suggestive findings without independent replication did not survive. The correct statement is that this locus merits testing in an independent sample, and the meta-analysis of the original and replication data is the result to report.
:::
:::

::: exercise Heritability and the environment {level=2}
A phenotype's heritability is 0.6 in a population with widespread undernutrition and 0.35 in a well-nourished population, with the same genes. Explain how this can be true without contradiction.
::: solution
$h^{2} = V_G/(V_G + V_E + 2\text{Cov} + \dots)$. When nutrition varies greatly, environmental variance $V_E$ is large and heritability falls; when nutrition is uniformly good, $V_E$ shrinks and the same genetic variance occupies a bigger share of the total, so heritability rises. The mean may rise as well, which is what happened to height. Nothing about the genotype-phenotype map changed; only the distribution of environments did. This is also why heritability estimates cannot be compared across populations, and why a low heritability does not imply a small individual genetic effect (an exposure may dominate population variance while a single high-penetrance variant dominates an individual's risk).
:::
:::

::: exercise Missing heritability {level=2}
Family studies estimate liability-scale heritability of schizophrenia at about 0.7; SNP-based GREML on 100,000 individuals gives about 0.25. List the explanations for the gap and what has closed parts of it.
::: solution
SNP heritability captures only common genotyped and imputed variants and their additive effects, so it misses rare variants of larger effect (exome and genome sequencing address these), structural variation and copy-number change (measured separately; large deletions such as 22q11.2 and 1q21.1 contribute substantially), non-additive effects and epistasis, and gene–environment structure that inflates the family-based estimate (assortative mating, shared environment, gene–environment correlation, prenatal effects). On the other side, larger GWAS with LD-score regression and GREML show liability SNP heritability rising with sample size and with better imputation, and polygenic scores built from multi-million-variant GWAS now capture a meaningful share of the genetic signal, so most of the "missing" heritability was statistical power rather than biology. What remains genuinely missing is largely rare and structural variation — which is why exome sequencing in large cohorts has begun to add associations.
:::
:::

::: exercise Design a study {level=3}
You want to know whether a polygenic score adds useful information to conventional risk factors for type 2 diabetes in a South Asian population. Outline the design, the analyses that establish value, and the three things that could make the answer negative.
::: solution
Design: a prospective cohort or trial-like analysis in the target population, with baseline genotyping, measured risk factors (BMI, waist, lipids, glucose, family history, socio-demography, lifestyle), and adjudicated incident diabetes; the score must be derived (or at least validated and reweighted) in South Asian GWAS, not only European ones. Analyses: incremental discrimination (C-statistic and ideally net reclassification/decision-curve analysis rather than C alone), calibration in each score percentile group, absolute risk at fixed thresholds, and — the real question — whether acting on the score changes behaviour or outcomes; sensitivity analyses within families or using positive controls to detect population-structure artefacts, and stratification by ancestry proportion. Things that make the answer negative: the score's ancestry transfer failure (very common), confounding because in that population both genotype frequency and diabetes risk track migration, urbanisation and diet, and — most importantly — ceiling effects, because BMI and glycaemia already capture most of the actionable risk, so a genetic signal that is real adds little to decisions that are already well informed.
:::
:::

::: exercise Ethics at the margin {level=3}
A company offers employers a workplace wellness programme in which consenting employees may add a polygenic score for cardiometabolic disease, with lower premiums for those who take up a follow-up prevention pathway. Identify the problems and the arguments on both sides.
::: solution
In favour: uptake is voluntary, the information is genuinely predictive of common disease, prevention is where genetics currently adds least risk of harm and most benefit, and if scores are used to offer rather than to withhold benefit they can be equitable. Against: consent is rarely free where an employer is the offeror, so "voluntary" carries coercive weight; genetic information is family information and cannot be fully de-identified; predictive validity differs by ancestry, so a programme built on European-derived scores distributes its benefits unevenly and may entrench existing disparities; the premiums structure is a soft version of the genetic discrimination that many jurisdictions legislated against, and would shift cost onto people for traits they cannot change; and secondary use of the data (insurers, law enforcement, research, sale) is almost never within the participant's reasonable expectation. The defensible version requires: use only where it changes management, no financial penalty ever (offer, do not charge), equity of performance demonstrated in every population deployed to, data governance with an independent custodian and a sunset clause, and the right not to know protected without penalty. Note the asymmetry the case turns on: genetics is currently good at distributing risk information and poor at distributing effective interventions, and a programme that does the first without the second is a premium-reduction scheme, not a health intervention.
:::
:::
