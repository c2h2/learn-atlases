No analysis can rescue a badly designed experiment. If the treated plants all stood by the warm window and the controls by the cold door, if the "replicates" were twenty fish in one tank, if the person scoring the outcome knew which animals had been treated, then the most sophisticated statistics will only give a precise answer to the wrong question. Ronald Fisher put it bluntly in 1938: "To consult the statistician after an experiment is finished is often merely to ask him to conduct a post mortem examination. He can perhaps say what the experiment died of."

This chapter is about the decisions taken before any data exist. It explains why experiments can establish causation where observation struggles; sets out Fisher's three principles of **replication**, **randomisation** and **blocking**; treats controls and blinding; defines the experimental unit and the most common design error in biology, **pseudoreplication** (Stuart Hurlbert, 1984); shows how to choose a sample size by a power calculation; introduces factorial designs; and ends with the reproducibility of published research and the practices that improve it. Clinical trials, with their own ethics and regulation, are covered in [Medicine Atlas: randomised trials](/learn/medicine/lesson.php?c=epidemiology-ebm&l=randomised-trials).

## Experiments and observations {#experiments}

In an **observational study** the investigator records variables as they occur: the parasite loads of fish in lakes with and without introduced predators, the body sizes of mammals at different latitudes, the gene-expression profiles of tumours. In an **experiment** the investigator assigns the treatments to the units. The distinction matters because of confounding.

::: definition Confounding {#def-confounding}
A **confounding variable** is a variable that is associated with the explanatory variable and also affects the response, so that its effect can be mistaken for an effect of the explanatory variable. In an observational comparison of lakes with and without predators, lake size, depth or nutrient status may differ between the two kinds of lake and may affect parasites directly.
:::

Statistics can adjust for confounders that were measured ([[biostatistics/linear-models]]), but never for those that were not, and in biology the list of possible confounders is always longer than the list of variables recorded. An experiment breaks the link between the explanatory variable and every possible confounder, measured or not, by letting chance decide which unit gets which treatment. That is why a well-designed experiment supports causal conclusions and an observational study, by itself, usually supports only associations. Observational studies remain indispensable — no one can randomise latitude, the evolutionary history of a clade or a person's smoking — and the methods for drawing cautious causal inferences from them are developed in [Medicine Atlas: observational studies](/learn/medicine/lesson.php?c=epidemiology-ebm&l=observational-studies).

::: warning "Correlation shows causation"
An association between two variables can arise because $X$ causes $Y$, because $Y$ causes $X$, because a third variable causes both, by chance, or through the way the sample was selected. Across countries, chocolate consumption correlates with Nobel prizes per capita; across ponds, frog abundance may correlate with dragonfly abundance because both depend on the absence of fish. Only when the explanatory variable has been assigned at random can an association be read directly as causal — and even then only for the units, conditions and range of treatments actually studied.
:::

## The experimental unit and replication {#units}

::: definition Experimental unit, observational unit and replication {#def-unit}
The **experimental unit** is the smallest entity to which a treatment is independently applied: a pot if fertiliser is added to the pot, a tank if a temperature is set for the tank, a cage if a diet is given to the cage, a mouse if each mouse is injected separately. The **observational unit** (evaluation unit) is the entity on which a measurement is taken; it may be the same as the experimental unit or smaller (each plant in a pot, each fish in a tank, each cell in a dish). **Replication** means applying each treatment to several independent experimental units. The sample size for comparing treatments is the number of experimental units per treatment, not the number of measurements.
:::

Replication does two things. It allows the variation between units treated alike — the experimental error — to be estimated, without which no test or confidence interval can be computed. And it reduces the standard error of each treatment mean by the factor $1/\sqrt n$ ([[biostatistics/estimation#prop-se]]). Measuring the same unit several times (**technical replication**) reduces measurement error, but it does nothing to measure or reduce variation between units (**biological replication**). Three wells loaded from one RNA extraction are one biological replicate.

### Pseudoreplication

::: definition Pseudoreplication {#def-pseudoreplication}
**Pseudoreplication** (Hurlbert, 1984) is the use of inferential statistics to test for treatment effects with data from experiments in which either treatments are not replicated (though samples may be) or replicates are not statistically independent. Hurlbert distinguished:

- **simple pseudoreplication**: one experimental unit per treatment, with several samples from each treated as replicates;
- **temporal pseudoreplication**: repeated measurements over time on the same units treated as independent replicates;
- **sacrificial pseudoreplication**: the design is properly replicated, but the data from units within a treatment are pooled, or the samples within units treated as independent, so that the real variation among units is thrown away.
:::

Hurlbert surveyed 176 experimental studies published in ecology between 1960 and the early 1980s and found pseudoreplication in 27 % of them, and in 48 % of those that applied inferential statistics. The problem is no less common in laboratory biology, where cells in one dish, sections from one brain or animals in one cage are routinely treated as independent replicates.

::: example Two tanks of fish {#ex-tanks}
To test whether warmer water reduces the growth of juvenile trout, a researcher puts 20 fish in a tank at 12 °C and 20 in a tank at 16 °C, and after six weeks compares the mean growth of the two groups of 20 with a two-sample t-test on 38 degrees of freedom. What is wrong, and what can the data legitimately show?
::: solution
Temperature was applied to tanks, so the tank is the experimental unit, and there is one per treatment: no replication at all. Any difference between the tanks — a slightly different flow rate, light, position in the room, a disease outbreak in one tank, social interactions within each group — is completely confounded with temperature. The 20 fish in a tank share all of these, so their growth rates are not independent, and the t-test's error term (variation between fish in the same tank) does not include the variation between tanks that a real replicate would show. The P-value is meaningless as a test of temperature.

The data can show that the two tanks differed, and describe how much the fish within each tank varied. To test temperature, the design needs several tanks per temperature (say 4 to 6), assigned at random, and the analysis should use tank means (or a mixed model with tank as a random effect, [[biostatistics/linear-models]]), with degrees of freedom based on the number of tanks.
:::
:::

How much does it matter? If $m$ observational units share an experimental unit and the correlation between them (the **intraclass correlation**, the fraction of the total variance that lies between experimental units) is $\rho$, then the variance of a treatment mean based on $k$ units of $m$ is inflated, relative to $km$ independent observations, by the **design effect**
$$
\mathrm{D_{eff}} = 1 + (m - 1)\rho,
$$ {#eq-design-effect}
and the **effective sample size** is $km/\mathrm{D_{eff}}$. Analysing the $km$ observations as if they were independent underestimates the standard error by the factor $\sqrt{\mathrm{D_{eff}}}$ and inflates the false-positive rate.

::: example Plants in pots {#ex-design-effect}
A fertiliser experiment has 10 pots per treatment with 8 plants in each pot, and plants in the same pot have intraclass correlation $\rho = 0.3$ in height. What is the effective number of independent plants per treatment? What would be gained by putting 16 plants in each pot instead?
::: solution
$\mathrm{D_{eff}} = 1 + 7\times0.3 = 3.1$, so the 80 plants are worth $80/3.1 = 25.8$ independent plants. Analysing them as 80 independent replicates would understate the standard error by a factor $\sqrt{3.1} = 1.76$.

With 16 plants per pot, $\mathrm{D_{eff}} = 1 + 15\times0.3 = 5.5$ and the 160 plants are worth $160/5.5 = 29.1$. Doubling the work on each pot adds only about three effective plants. As $m \to \infty$ the effective sample size approaches $k/\rho = 33$: with 10 pots no amount of subsampling can do better. The way to increase precision is more pots.
:::
:::

::: widget plot
f: 10*x/(1 + (x - 1)*r); 10/r
x: 1, 40
y: 0, 60
sliders: r=0.3:0.02:1:0.01
labels: \text{effective sample size}; \text{limit } k/\rho
caption: Effective sample size for 10 experimental units (pots) as the number of observational units per pot, $m$ (horizontal axis), increases, for intraclass correlation $\rho$ set by the slider $r$. The curve is $10m/(1 + (m-1)\rho)$ and the horizontal line its limit $10/\rho$. With $\rho = 0.3$ the curve flattens after a few plants per pot. Move $r$ towards 1 (plants in a pot nearly identical) and extra plants add almost nothing; move it towards 0.02 and subsamples are nearly independent. Note that the curve is always at least 10: subsamples never hurt, provided they are analysed correctly.
:::

## Randomisation {#randomisation}

::: definition Randomisation {#def-randomisation}
**Randomisation** is the allocation of treatments to experimental units by a chance mechanism — a random-number generator, not the experimenter's judgement or convenience — so that every unit has a known (usually equal) probability of receiving each treatment, independently of its characteristics.
:::

Randomisation does three jobs. It removes **selection bias**: the experimenter cannot, consciously or not, give the healthiest animals the favoured treatment. It distributes the effects of all uncontrolled variables, known and unknown, evenly among treatments *on average*, so that they add to the error rather than biasing the comparison. And it provides the logical basis of the test: the randomisation distribution of [[biostatistics/hypothesis-testing#ex-fisher-perm]] is valid precisely because the treatments were assigned at random.

"Haphazard" is not random. Picking mice from a cage "at random" by hand selects the slowest or the most docile first; assigning the first ten plants on the bench to control and the next ten to treatment confounds treatment with position; alternating treatments down a row confounds it with any periodic gradient. Generate the allocation by computer and keep the code:

```python
import random
random.seed(42)                        # record the seed so the allocation can be audited
units = list(range(1, 21))             # 20 pots, numbered in bench order
random.shuffle(units)
treated, control = sorted(units[:10]), sorted(units[10:])
print(treated)   # [5, 6, 7, 10, 13, 14, 15, 16, 19, 20]
print(control)   # [1, 2, 3, 4, 8, 9, 11, 12, 17, 18]
```

A random allocation can by chance be unbalanced — here the treated pots happen to cluster towards the end of the bench. The answer is not to re-draw until the allocation "looks random", but to anticipate known sources of variation and **block** on them.

## Blocking {#blocking}

::: definition Blocking and the randomised complete block design {#def-block}
A **block** is a group of experimental units that are expected to be more similar to one another than to units in other blocks: plots in one part of a field, plants on one shelf, animals from one litter, samples processed on one day, pots in one position on the bench. In a **randomised complete block design**, each block contains one unit (or the same number of units) of every treatment, and treatments are randomised separately within each block. Differences between blocks are then removed from the comparison of treatments.
:::

Blocking is Fisher's third principle, "local control". It works because treatment comparisons are made *within* blocks, where units are alike, so the variation between blocks does not enter the error. The paired design is the simplest block design, with blocks of size 2: Darwin's crossed and selfed plants shared a pot, and the comparison was made within pots. Plant positions on the bench, litters of mice, culture batches and days of measurement are the most common blocks in laboratory biology. The rule is: **block what you can, randomise what you cannot**.

::: proposition The gain from pairing {#prop-pairing}
Suppose the two members of a pair have responses with common variance $\sigma^2$ and correlation $\rho$. The variance of a within-pair difference is
$$
\Var(X_1 - X_2) = 2\sigma^2(1 - \rho),
$$
compared with $2\sigma^2$ for two independent units. Pairing therefore multiplies the variance of the estimated treatment effect by $1 - \rho$, and for a given power reduces the number of units needed by roughly the same factor, at the cost of halving the degrees of freedom for error.
:::

::: proof
$\Var(X_1 - X_2) = \Var(X_1) + \Var(X_2) - 2\Cov(X_1, X_2) = 2\sigma^2 - 2\rho\sigma^2$.
:::

::: example How much does blocking save? {#ex-blocking}
An experiment needs 80 % power at $\alpha = 0.05$ to detect a treatment effect of half a standard deviation ($d = 0.5$). How many units are needed (a) with two independent groups, (b) in pairs whose members have correlation $\rho = 0.6$, and (c) in pairs with $\rho = 0$?
::: solution
(a) From [[biostatistics/hypothesis-testing#ex-power]], 64 per group: 128 units.

(b) The paired test is a one-sample test on the differences, whose standard deviation is $\sigma\sqrt{2(1 - \rho)} = \sigma\sqrt{0.8} = 0.894\sigma$, so the standardised effect on the difference scale is $0.5/0.894 = 0.559$. The exact noncentral-t calculation of [[biostatistics/hypothesis-testing#prop-power]] with $\nu = n - 1$ gives 28 pairs (power 0.814): 56 units, less than half as many.

(c) With $\rho = 0$ the standardised effect is $0.5/\sqrt2 = 0.354$ and 65 pairs are needed: 130 units, slightly *more* than the unpaired design because pairing spends degrees of freedom without reducing the noise. Blocking pays only when the blocks really are more homogeneous than the units as a whole — as Darwin's maize, where the within-pot correlation turned out to be negative, illustrates ([[biostatistics/estimation]]).
:::
:::

## Controls and blinding {#controls}

A treatment effect is a comparison, and the comparison is only as good as the control.

- A **negative control** receives everything except the active ingredient of the treatment: the **vehicle control** gets the solvent in which a drug is dissolved, the **sham** operation includes anaesthesia and incision without the procedure, an empty-vector control is transfected with the plasmid backbone. Without it, the effect of the treatment is confounded with the effect of handling, injection, solvent or surgery.
- A **positive control** receives a treatment known to produce the effect. If it fails, the assay was not capable of detecting an effect, and a negative result in the test group means nothing.
- A **concurrent** control is run at the same time, in the same conditions, randomised with the treatments. Historical controls from earlier experiments are confounded with everything that has changed since.

::: definition Blinding {#def-blinding}
An experiment is **blinded** (masked) when the people who handle the units, apply the treatments, measure the outcomes or analyse the data do not know which unit received which treatment. It is **double-blind** when, in studies of humans, both participants and investigators are unaware of the allocation.
:::

Blinding protects against **observer bias**, which is real and large. Rosenthal and Fode (1963) told students that their laboratory rats had been bred to be "maze-bright" or "maze-dull"; the rats had been allocated at random, but the supposedly bright rats performed better. Meta-analyses of animal studies in stroke and other fields have found that unblinded and unrandomised studies report substantially larger effects than blinded, randomised ones. Coding samples so that the person scoring them cannot tell the groups apart is cheap and should be routine for any outcome involving judgement: behaviour scores, histology, cell counts by eye, the decision to exclude an animal or a well.

::: application Animal experiments: the 3Rs and reporting standards
Experiments on vertebrates (and cephalopods in some jurisdictions) are regulated in most countries, for example under the UK Animals (Scientific Procedures) Act 1986 and the EU Directive 2010/63/EU, and are governed by the **3Rs** of William Russell and Rex Burch (1959): *replace* animals with other methods where possible, *reduce* the number used, and *refine* procedures to minimise suffering. Good design serves all three: a power calculation avoids both the waste of an underpowered study and the excess of an overpowered one, blocking reduces the animals needed ([[#ex-blocking]]), and avoiding pseudoreplication prevents experiments that could never have answered their question. The **ARRIVE guidelines** (Animal Research: Reporting of In Vivo Experiments; Carol Kilkenny and colleagues 2010, revised as ARRIVE 2.0 in 2020) require papers to report the experimental unit, the sample-size calculation, randomisation, blinding, and all exclusions.
:::

## Choosing the sample size {#sample-size}

A sample-size calculation needs four ingredients, decided before the experiment:

1. the **primary outcome** and the test that will analyse it;
2. the **smallest effect worth detecting** — a biological judgement, not a guess at what will be seen;
3. an estimate of the **variability**, from a pilot study, earlier work or the literature;
4. the significance level (usually 0.05) and the desired **power** (usually 0.8 or 0.9).

For comparing two means, the calculation was made in [[biostatistics/hypothesis-testing#prop-power]]. For comparing two proportions $p_1$ and $p_2$, the usual normal-approximation formula for the number per group is
$$
n = \frac{\left(z_{1-\alpha/2}\sqrt{2\bar p(1 - \bar p)} + z_{1-\beta}\sqrt{p_1(1-p_1) + p_2(1-p_2)}\right)^2}{(p_1 - p_2)^2}, \qquad \bar p = \frac{p_1 + p_2}{2}.
$$ {#eq-n-prop}

::: example Planning a survival experiment {#ex-n-prop}
A conservation biologist expects about 50 % of translocated tadpoles to survive to metamorphosis in untreated ponds, and wants to detect an improvement to 70 % (or a fall to 30 %) with a new habitat treatment. How many tadpoles are needed per group for 80 % power at $\alpha = 0.05$? Why might this be the wrong question?
::: solution
For $p_1 = 0.5$, $p_2 = 0.3$: $\bar p = 0.4$; the numerator is $(1.960\sqrt{0.48} + 0.842\sqrt{0.25 + 0.21})^2 = (1.358 + 0.571)^2 = 3.721$, and the denominator $0.04$, so $n = 93.0$ — about 93 per group (the calculation is symmetric, so 0.5 against 0.7 gives the same).

But the treatment is applied to *ponds*, not tadpoles. If 93 tadpoles go into one treated pond and 93 into one control pond, the experiment is pseudoreplicated ([[#ex-tanks]]). The real question is how many ponds are needed, which depends on how much survival varies from pond to pond; the tadpole-level calculation is a lower bound that holds only if ponds do not differ. A realistic design might use 6 to 10 ponds per treatment, with 20 to 30 tadpoles in each.
:::
:::

::: widget plot
f: 0.5*(1 + erf((d*sqrt(x/2) - 1.96)/sqrt(2))); 0.8
x: 2, 150
y: 0, 1
sliders: d=0.5:0.1:1.5:0.05
labels: \text{power}; 0.8
caption: Approximate power of a two-sided two-sample comparison at $\alpha = 0.05$ against the number of units per group $n$ (horizontal axis), for standardised effect $d$ set by the slider, from the normal approximation $\Phi(d\sqrt{n/2} - 1.96)$. With $d = 0.5$ the curve crosses 80 % near $n = 63$ (the exact t-test needs 64). Slide $d$ to 1 and 80 % power arrives at about 16 per group; slide it to 0.25 and even 150 per group gives only about 58 %. Power rises steeply at first and then slowly: the last 10 % of power is expensive.
:::

For complex designs where formulas are awkward — mixed models, unusual distributions, many blocks — the most reliable method is **simulation**: generate many artificial data sets from the planned design with the assumed effect and variability, analyse each exactly as the real data will be analysed, and count the fraction that reach significance. When nothing is known about variability, Roger Mead's **resource equation** offers a rough rule for laboratory experiments: the error degrees of freedom $E$ = (total units − 1) − (treatment df) − (block df) should be between about 10 and 20. Four treatments with five animals each and no blocks give $E = 19 - 3 = 16$.

::: quiz
A researcher wants to study the effect of a drug on neurons. She treats one culture dish with the drug and one with vehicle, and images 300 neurons in each dish. Which statement is correct?
- [ ] With 600 neurons the experiment is very well powered.
- [ ] The neurons are the experimental units, because the measurement is made on neurons.
- [x] The dish is the experimental unit and there is one per treatment, so the effect of the drug cannot be separated from differences between the two dishes.
- [ ] The problem can be fixed by using a non-parametric test.
::: solution
The drug was applied to dishes, so the dish is the experimental unit; with one dish per treatment there is no replication. Neurons in one dish share its culture conditions, plating density and history, so their responses are correlated. No choice of test can recover the missing between-dish variation. She needs several independent dishes per treatment, ideally from independent cultures prepared on different days, with the dish (or culture) mean as the unit of analysis or a mixed model.
:::
:::

## Factorial designs {#factorial}

Testing one factor at a time is inefficient and can mislead. A **factorial** design crosses every level of each factor with every level of the others — two temperatures × two diets gives four treatment combinations — and assigns units at random to all combinations.

Factorial designs have two great advantages. First, every unit contributes information about *every* factor: in a $2\times2$ design with $n$ units per cell, each main effect is estimated from all $4n$ units, so one experiment does the work of two one-factor experiments of the same size. Second, and more importantly, they reveal **interactions**: whether the effect of one factor depends on the level of another. Fertiliser may increase yield only when water is plentiful; a mutation may have an effect only in one sex or on one genetic background; a predator may reduce prey survival only in the absence of refuges. One-factor-at-a-time experiments cannot detect such dependencies and may give a misleading answer that depends on the arbitrary level at which the other factor was held. The analysis — two-way ANOVA with an interaction term — is a linear model ([[biostatistics/linear-models]]).

Other designs extend these ideas: **split-plot** designs, in which one factor is applied to large units (whole fields, growth chambers) and another to subunits within them, with two error terms; **repeated-measures** designs, in which each unit is measured under several conditions or times; **Latin squares**, which block on two sources of variation at once; and **crossover** designs, in which each unit receives all treatments in random order.

## Reproducibility {#reproducibility}

A result that cannot be reproduced is not knowledge. Over the past fifteen years, large-scale efforts to repeat published experiments have found that many do not replicate. Glenn Begley and Lee Ellis (2012) reported that scientists at the biotechnology company Amgen could confirm the findings of only 6 of 53 "landmark" preclinical cancer studies. The Open Science Collaboration (2015) repeated 100 psychology experiments and obtained significant results in about 36 % of them, compared with 97 % of the originals. The Reproducibility Project: Cancer Biology (Timothy Errington and colleagues, 2021) managed to repeat 50 experiments from 23 high-profile papers — many more could not even be attempted because protocols and materials were not available — and found effect sizes a median of 85 % smaller than those originally reported.

The causes are the ones met throughout this course: low power, which makes significant results more often false and always exaggerated ([[biostatistics/hypothesis-testing#ex-fdr-prior]]); flexible analysis and selective reporting (P-hacking); pseudoreplication; missing randomisation and blinding; unvalidated reagents (misidentified cell lines, non-specific antibodies); and a publication system that rewards novel positive findings. The remedies are equally familiar:

- **Pre-registration**: record the hypotheses, primary outcome, sample size and analysis plan in a time-stamped public registry before collecting data. **Registered reports** go further: the journal reviews and accepts the design before the results are known.
- **Adequate power**, from an honest sample-size calculation.
- **Randomisation, blinding and concurrent controls**, reported explicitly.
- **Open data and code**, so that analyses can be checked and repeated, and **detailed methods**, so that experiments can be.
- **Replication** of key results, ideally by independent laboratories, before they are built upon.

::: history
Ronald Fisher developed the principles of experimental design at Rothamsted Experimental Station in the 1920s, faced with decades of uninterpretable field trials; his 1926 paper "The arrangement of field experiments" introduced randomisation, replication and blocking, and *The Design of Experiments* (1935) set them out for all of science, with the lady tasting tea and Darwin's maize as examples. Frank Yates extended factorial and confounded designs at Rothamsted in the 1930s. The first modern randomised clinical trial, of streptomycin for tuberculosis, was published by the UK Medical Research Council in 1948 under the statistical direction of Austin Bradford Hill. William Russell and Rex Burch proposed the 3Rs in 1959. Stuart Hurlbert's "Pseudoreplication and the design of ecological field experiments" (*Ecological Monographs*, 1984) named the commonest design error in ecology. John Ioannidis's essay of 2005, the Amgen report of 2012, the ARRIVE guidelines of 2010 and 2020, and the replication projects of 2015 and 2021 made reproducibility a central concern of biology.
:::

::: summary
- Experiments randomise treatments and so break the link with confounders; observational associations need not be causal.
- The experimental unit is what receives a treatment independently; the sample size is the number of experimental units, not of measurements.
- Pseudoreplication (Hurlbert 1984) treats non-independent measurements as replicates; with $m$ subsamples and intraclass correlation $\rho$, the design effect is $1 + (m-1)\rho$.
- Randomise by computer; block on known sources of variation ("block what you can, randomise what you cannot"). Pairing multiplies the variance of a comparison by $1 - \rho$.
- Use negative (vehicle, sham) and positive controls, run concurrently; blind everyone who scores outcomes.
- Choose the sample size from the smallest important effect, the variability, $\alpha$ and power; for $d = 0.5$, 64 per group, or 28 pairs with within-pair correlation 0.6.
- Factorial designs estimate several factors at once and reveal interactions.
- Reproducibility improves with pre-registration, adequate power, randomisation, blinding, open data and replication.
:::

## Exercises

::: exercise Counting experimental units {level=1 check="6"}
Three growth chambers are set to 15 °C and three to 25 °C; each chamber holds 40 seedlings, and each seedling's height is measured on five days. How many experimental units are there for the comparison of temperatures?
::: solution
Temperature is applied to chambers, so there are $3 + 3 = 6$ experimental units. The 240 seedlings and 1200 measurements are subsamples and repeated measures within them.
:::
:::

::: exercise A design effect {level=1 check="5.5"}
Calculate the design effect for clusters of 10 observations with intraclass correlation 0.5.
::: solution
$1 + (10 - 1)\times0.5 = 5.5$.
:::
:::

::: exercise The resource equation {level=1 check="12"}
An experiment has 5 treatments in 4 randomised blocks, with one animal per treatment per block. What is Mead's error degrees of freedom $E$?
::: solution
There are 20 units; treatments use $5 - 1 = 4$ degrees of freedom and blocks $4 - 1 = 3$, so $E = 19 - 4 - 3 = 12$, within the range 10 to 20.
:::
:::

::: exercise Pairing with a strong correlation {level=2 check="0.2"}
Twin lambs are used as pairs, and the correlation in growth between twins is 0.8. By what factor is the variance of a treatment comparison multiplied, compared with unrelated lambs?
::: solution
By $1 - \rho = 0.2$: the variance of a within-pair difference is one-fifth that of a difference between unrelated lambs, so roughly one-fifth as many lambs are needed for the same precision.
:::
:::

::: exercise Sample size for proportions {level=2}
Use [[#eq-n-prop]] to find the number per group needed to detect a change in germination from 80 % to 90 % with 80 % power at $\alpha = 0.05$.
::: answer
About 199 per group.
:::
::: solution
$\bar p = 0.85$; $1.960\sqrt{2\times0.85\times0.15} = 1.960\times0.5050 = 0.9898$; $0.842\sqrt{0.16 + 0.09} = 0.842\times0.5 = 0.4208$. Numerator $(1.4106)^2 = 1.990$; denominator $0.01$; $n = 199$. Small differences between high proportions need large samples — and if seeds are sown in trays, the tray, not the seed, is the experimental unit.
:::
:::

::: exercise Spotting the unit {level=2}
For each study, identify the experimental unit and say whether the design is replicated: (a) 12 plots in a field, 6 randomly assigned to nitrogen addition, with 30 plants measured per plot; (b) one lake fertilised and one left as control, with 50 water samples from each over a summer; (c) 24 mice in 8 cages of 3, with diet assigned by cage; (d) 40 *Drosophila* vials, 20 at random given a drug, with 10 flies scored per vial.
::: solution
(a) Plot; replicated, 6 per treatment (30 plants per plot are subsamples). (b) Lake; one per treatment, so unreplicated — the 50 samples are simple and temporal pseudoreplicates; this is a case study, which whole-ecosystem experiments sometimes must be, analysed with before–after–control–impact methods and cautious interpretation. (c) Cage; 8 cages, so (if 4 per diet) 4 replicates per treatment, not 12. (d) Vial; 20 per treatment, with flies as subsamples.
:::
:::

::: exercise Design a better experiment {level=3}
A student wants to know whether caffeine affects the heart rate of *Daphnia*. Her plan: take 20 *Daphnia* from the class culture, measure each one's heart rate in pond water, then transfer all 20 into caffeine solution and measure again, scoring the heart rates herself by counting beats under the microscope. List four weaknesses of the plan and propose an improved design.
::: solution
Weaknesses: (1) no concurrent control — any change could be due to handling, transfer, time, warming under the microscope lamp or the order of measurement, not caffeine; (2) no randomisation — the order and timing of measurements are fixed; (3) no blinding — she knows which measurement is "after caffeine" and is counting by eye, an outcome open to observer bias; (4) all *Daphnia* from one culture, so results apply to that culture only; possibly also temperature drift during the session.
Improved design: randomly assign *Daphnia* to two groups, transferring one group into caffeine solution and the other into pond water handled identically (vehicle control); measure both before and after, so that the analysis compares the *change* in heart rate between groups (or use the before value as a covariate, [[biostatistics/linear-models]]); have a second person code the dishes so that the scorer is blind; interleave treated and control animals in random order through the session and control the temperature; use animals from more than one culture as blocks; decide the sample size from a pilot study and the smallest change of interest; and pre-specify the analysis.
:::
:::

::: exercise Why randomise when you can balance? {level=3}
A researcher argues that randomisation is unnecessary: she will measure the initial body mass of her 20 rats and assign them to treatments so that the groups have exactly the same mean mass. Explain (a) what this achieves, (b) what it does not, and (c) how to combine balancing with randomisation.
::: solution
(a) It balances one known prognostic variable, initial mass, which can improve precision.
(b) It does nothing for unmeasured variables — litter, temperament, health, cage position — and the choice of which balanced allocation to use is still her decision, which could (even unconsciously) correlate with other characteristics. It also removes the basis of the randomisation test: the probability distribution of allocations is undefined.
(c) Block on mass: rank the rats by initial mass, form blocks of similar rats (10 pairs, or 5 blocks of 4), and randomise treatments within each block. This gives the balance on mass and the protection of randomisation against everything else, and the analysis should include the blocks. Alternatively, randomise freely and include initial mass as a covariate in the analysis (analysis of covariance).
:::
:::
