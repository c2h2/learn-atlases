A wage is, in part, a rental on a stock of skills and of health. That stock is built by food, by infection or its absence, by years in a classroom, and by what those years actually teach. Poor countries are poor in this stock as well as in physical capital: life expectancy at birth in 2023 ranged from about 85 years in Japan and 84 in Switzerland to 54 in Nigeria and 55 in Chad (UN DESA, *World Population Prospects 2024*); mean years of schooling among adults run from above 13 in parts of Europe to under 2 in parts of the Sahel (UNDP HDR 2025). This chapter asks three questions. Can undernutrition trap a household in poverty? What is a year of school worth, and how would we know? And which health and education programmes, tested in the field, actually move the outcomes that the HDI counts?

Labour economics develops the schooling decision and the signalling alternative in [[labour-economics/human-capital]]. Here the emphasis is on poor countries: subsistence, missing markets, and the randomised evaluations that have been this field's distinctive method.

## Nutrition and a possible trap

The idea of a **nutrition-based poverty trap**, associated with Dasgupta and Ray (1986) and with earlier work on efficiency wages by Leibenstein and by Mirrlees and Stiglitz, is that work requires calories, calories require income, and income requires work. If the relationship between consumption and labour capacity is S-shaped, two equilibria can exist: a low-consumption equilibrium in which people are too undernourished to work much, and a high-consumption equilibrium in which they can.

::: definition Capacity curve {#def-capacity}
A **capacity curve** $\phi(c)$ gives the labour power (hours of effective work) a person can supply as a function of current consumption $c$. It is typically near zero until some subsistence intake, then steep, then flat. A person who sells labour power at wage $w$ per unit and has non-labour income $y_0$ consumes $c = y_0 + w\,\phi(c)$ in a closed loop of work and food.
:::

::: proposition A nutrition trap {#prop-nutrition-trap}
Suppose $\phi$ is strictly increasing, S-shaped, with $\phi(c) = 0$ for $c \le \underline{c}$, and $w$ is the wage per unit of labour power. Graphical equilibrium is intersection of $c = y_0 + w\,\phi(c)$ with the 45-degree line in $(c, \phi)$ space, or equivalently of $\phi(c)$ with $(c-y_0)/w$. If $y_0$ is small and $w$ is moderate, there can be three intersections: two stable (low $c$, high $c$) and one unstable in between. A household stuck at the low intersection cannot borrow its way to the high one if credit is missing ([[development-economics/credit-and-microfinance]]).
:::
::: proof
(Sketch.) Rewrite the budget as $\phi(c) = (c - y_0)/w$. The right-hand side is a ray from $(y_0, 0)$ with slope $1/w$. An S-shaped $\phi$ can cut that ray three times. Stability: if $\phi$ is steeper than the ray, a small increase in $c$ produces more than enough extra labour power to pay for itself, and consumption rises further; if $\phi$ is flatter, the opposite. Hence the middle intersection is unstable and the outer two are stable. A one-time transfer that pushes $c$ past the unstable point moves the household to the high equilibrium; a transfer that does not, does not.
:::

::: widget plot
f: 8/(1+exp(-k*(x-c0))); (x-n)/w
sliders: k=1.4:0.6:3:0.1; c0=4:2:7:0.1; w=1.2:0.6:2.2:0.1; n=0.5:0:3:0.1
x: 0, 12
y: 0, 10
labels: \phi(c); (c-y_0)/w
caption: The S-shaped capacity curve and the ray $(c-y_0)/w$. Slide steepness $k$, the inflection $c_0$, the wage $w$ and non-labour income $n = y_0$. Three intersections mean a trap; a large enough $y_0$ (a transfer, a plot of land) can leave only the high equilibrium. This is a cartoon of Dasgupta–Ray, not a calibrated nutrition science.
:::

The trap is a possibility, not a finding. Subramanian and Deaton (1996), on Maharashtra, estimated a calorie–wage elasticity too small to generate a trap at observed wages: extra calories raise work capacity, but not by enough to pay for themselves in a jump. Banerjee and Duflo, in *Poor Economics*, report that very poor households, given a little extra money, spend much of it on better-tasting calories (sugar, meat) rather than on more bulk calories, and on festivals, which is hard to square with people sitting just below a biological threshold. Reviews by Deaton and by Strauss and Thomas conclude that nutrition matters for health, for height, and for some productivity outcomes, especially at the bottom, but that a two-equilibrium trap is not the default description of rural poverty.

That is not a reason to ignore hunger. FAO's *State of Food Security and Nutrition in the World* has put global undernourishment in the 700–800 million range in recent years, with the burden concentrated in sub-Saharan Africa and South Asia, and with a rise after 2019. Stunting (low height-for-age) still affects a large minority of children in those regions. The policy question is which interventions move nutrition — cash, food, deworming, sanitation, maternal care — not whether an S-curve sits in the background.

::: warning Calories are not welfare
A household that buys nicer food, or a radio, with a small income gain is not failing a test of rationality, and is not proving that it was never hungry. The capacity-curve model treats labour power as the only payoff of food. Real people also like the taste of food, the status of a feast, and the insurance of a stored bag of grain. A finding that the poor do not spend every extra rupee on milled millet is a finding about preferences and relative prices, not a refutation of poverty.
:::

## Schooling and the Mincer return

The workhorse empirical relationship in this area is the **Mincer equation**,

$$
\ln w = \beta_0 + \beta_1 S + \beta_2 X + \beta_3 X^2 + u,
$$ {#eq-mincer}

where $S$ is years of schooling and $X$ is experience (usually age minus years of school minus the school-starting age). The coefficient $\beta_1$ is the **Mincer return**: the approximate proportional wage gain associated with an extra year of school, holding the quadratic in experience fixed.

::: definition Mincer return {#def-mincer}
In [[#eq-mincer]], $\beta_1$ is the **Mincer return** to a year of schooling. If the only cost of school is forgone wages and if $S$ is chosen to maximise the present value of wages, $\beta_1$ equals the internal rate of return on that year — a claim that needs those assumptions, and that fails if school also signals ability ([[labour-economics/human-capital]], Spence).
:::

Psacharopoulos and Patrinos, in successive compilations, have reported average Mincer returns of the order of 8–10 percent a year in developing countries, often higher at primary school and for women. Those are associations. Ability, parental wealth, school quality and health all sit in $u$ and are correlated with $S$. The causal toolkit — twins, compulsory-schooling laws, distance to school, randomised scholarships — typically still finds positive returns, with a wide range. Duflo's (2001) study of Indonesia's INPRES school-construction programme in the 1970s, using region-and-cohort variation, is a standard reference: extra primary schools raised education and later wages, with implied returns around 7–11 percent. Card's surveys of the rich-country IV literature find IV estimates that are often *larger* than OLS, consistent with high returns for the subgroups who comply with the instrument.

::: example Height and wages {#ex-height}
A well-known reduced form in developing-country labour surveys is that 1 centimetre of adult height is associated with about 1–2 percent higher wages (Strauss and Thomas; later estimates vary by sample). Suppose the coefficient is 0.015 per centimetre on log wages, and a childhood nutrition programme raises adult height by 1.5 cm for treated cohorts. What is the implied proportional wage gain, and why is it not a sufficient statistic for the programme's benefit?
::: solution
The implied gain is $e^{0.015 \times 1.5} - 1 \approx 0.0227$, or about 2.3 percent. Height is a *marker* of early-life health, not the only channel (cognition, school attendance, and reduced illness also move), and the 0.015 is typically OLS. The programme may also raise life expectancy, which the wage coefficient on survivors does not capture. Treat 2.3 percent as a slice of the benefit, not the benefit.
:::
:::

::: example A Mincer arithmetic {#ex-mincer}
Suppose $\ln w = 1.5 + 0.10 S$, with $w$ in dollars a day. Compute wages at $S = 0$, $S = 8$ and $S = 12$. What is the factor gain from eight years of school?
::: solution
$w(0) = e^{1.5} \approx 4.48$, $w(8) = e^{2.3} \approx 9.97$, $w(12) = e^{2.7} \approx 14.88$. Eight years multiply the wage by $e^{0.8} \approx 2.23$. A 10 percent Mincer return is a large number when it compounds. Whether anyone *receives* 10 percent is the empirical question; this is the arithmetic of the specification.
:::
:::

Returns are not the same as **learning**. Enrolment has soared: primary completion is now the norm in most of South Asia and in much of Africa, and secondary enrolment has risen fast (UNESCO, World Bank WDI). What children can *do* — read a paragraph, do a division — has not kept pace. The World Bank's **learning poverty** indicator (the share of children who cannot read and understand a simple text by age 10) was about 70 percent in low- and middle-income countries before COVID-19 and higher after, with especially high figures in sub-Saharan Africa and in parts of South Asia (World Bank/UNESCO, updates through 2022–24). ASER in India and Uwezo in East Africa have made the same point with tools a volunteer can administer on a verandah: many children in grade 5 cannot read a grade-2 text. Years of $S$ in the Mincer equation are not units of human capital when a year can mean very different amounts of learning.

::: quiz
A Mincer coefficient $\hat\beta_1 = 0.08$ is estimated by OLS on a cross-section of urban workers. Which statement is correct?
- [ ] Eight percent is the causal return to a year of school for a random person in the country.
- [x] Eight percent is the association between log wages and years of school in this sample, holding the included experience terms fixed; ability, school quality and selection into wage work are still in the error.
- [ ] The coefficient cannot be 8 percent, because Psacharopoulos reports 10 percent.
- [ ] OLS is consistent here because wages are in logs.
::: solution
OLS estimates the conditional association. Causal interpretation needs an identifying assumption — as-good-as-random variation in $S$ — which a cross-section of workers does not provide. Logging the wage changes the *interpretation* of $\beta_1$ (a semi-elasticity) but not the omitted-variable problem. Meta-averages are a different object from this regression.
:::
:::

## Health, deworming and cash

Health is both a component of well-being (the HDI's first dimension) and an input to later wages and to school attendance. Several field experiments have tried to isolate cheap health interventions.

**Deworming.** Miguel and Kremer (2004, *Econometrica*) randomised the treatment of intestinal worms across schools in western Kenya (the Primary School Deworming Project). Treated schools saw large drops in worm loads and gains in attendance, with spillovers to untreated children in treated schools and to nearby schools — worms are infectious, so the social return exceeds the private return. Follow-ups (Baird, Hicks, Kremer, Miguel) found higher hours of work and higher earnings in young adulthood for the treated cohorts. A later multi-site trial (the "Worms: Identifying Impacts on Education and Health" debate, and the replication by Aiken, Davey and others, with a reply) contested the original standard errors and the size of spillovers. The consensus in development economics has been that the attendance effects were real and that mass deworming is cheap; the size of long-run wage effects remains more disputed. The episode is a lesson in both the power and the fragility of a single RCT.

**Conditional cash transfers.** Mexico's PROGRESA (1997), randomised at the locality level, paid mothers on condition that children attended school and received health checks. Schultz, Behrman, Parker and others found higher enrolment, especially in the transition to lower secondary, and some health gains; later generations of CCTs (Bolsa Família in Brazil, many Andean and Central American programmes, and variants in Africa and South Asia) reproduced enrolment effects more reliably than learning effects. Unconditional cash (GiveDirectly in Kenya, among others) raises consumption and does not, in the published experiments, produce the drunken-spending collapse that folklore predicted. The comparison of conditional and unconditional transfers is a comparison of *prices* (the condition is a subsidy to school) as well as of income, and of political feasibility: conditions may be what makes a transfer sellable.

**Bednets, vaccines, oral rehydration.** Randomised and quasi-randomised evaluations have generally found that insecticide-treated nets cut child mortality (a large literature around the WHO's malaria programme), that immunisation campaigns have high benefit–cost ratios when take-up is achieved, and that the remaining problem is often *delivery* — getting the net hung, the child to the clinic — rather than a missing medical technology. Dupas, Cohen and others have studied how prices at the door affect take-up of nets and of water disinfectant: charging a small positive price can screen for users who will use the product, but also excludes people who would have used a free one. There is no universal finding that "free is always better" or that "prices always screen well".

::: example A back-of-the-envelope return to deworming {#ex-deworm}
A deworming dose costs 0.50 dollars per child-year. Suppose, illustratively, that the Miguel–Kremer attendance effect raises later log wages by 0.12 for twenty working years, on a base wage of 800 dollars a year, discounted at 5 percent from an average delay of ten years. Is the NPV of the wage gain larger than 0.50? (The numbers are a sketch of an argument, not a replication of any paper's table.)
::: solution
The undiscounted annual gain is $800 \times (e^{0.12}-1) \approx 800 \times 0.127 = 102$ dollars. A twenty-year annuity of 102 starting in ten years, at 5 percent, has present value $102 \times \frac{1}{1.05^{10}} \times \frac{1-(1.05)^{-20}}{0.05} \approx 102 \times 0.614 \times 12.46 \approx 780$ dollars. That is three orders of magnitude above 0.50. Even if the wage effect were a tenth as large, and even after costing teachers' time and the original drugs, the comparison would not be close. The live debate is whether the 0.12 (or any particular long-run number) is the right causal effect, not whether 0.50 dollars is a large cost.
:::
:::

::: example A CCT budget {#ex-cct}
A locality has 2,000 children of secondary age, of whom 1,200 already attend. A CCT of 150 international dollars a year, paid only to attenders, raises enrolment by 8 percentage points. Ignoring targeting error, what is the annual transfer bill, and what is the cost per *additional* enrollee?
::: solution
New enrolment is $0.08 \times 2{,}000 = 160$, so attenders become 1,360. The bill is $1{,}360 \times 150 = 204{,}000$ dollars a year. Cost per additional enrollee is $204{,}000/160 = 1{,}275$ dollars — more than eight times the transfer, because the 1,200 always-takers are paid too. That infra-marginal cost is the usual arithmetic of a universal (within the age band) condition. Means-testing or paying only on the *transition* into secondary, as PROGRESA did at the intensive margin, is an attempt to cut it.
:::
:::

::: application Teaching at the right level
If the learning crisis is that the curriculum runs ahead of the child, a natural intervention is to regroup children by *ability* rather than by grade and to teach at that level. Banerjee, Cole, Duflo and Linden (2007) evaluated a remedial programme (Balsakhi) in Vadodara and Mumbai and found substantial literacy and numeracy gains at low cost; Pratham's "Teaching at the Right Level" has since been tested in several Indian states and in some African sites, with positive results when the pedagogy is actually delivered. The finding is not that "schools do not matter". It is that a year of sitting in a classroom whose lesson is two grades too high may not be a year of human capital.
:::

## Evidence, and the limits of the method

Randomised controlled trials identify a **local average treatment effect** under stated assumptions (see [[causal-inference/randomised-experiments]]). They do not automatically answer "what would happen if this ran nationally", because of general-equilibrium effects (a scholarship that works for 200 children may bid up school quality or crowd a labour market if given to two million), of political economy (a ministry that agrees to a trial is not a random ministry), and of **external validity** (western Kenya is not northern Nigeria). Deaton, Pritchett and others have pressed these limits; Banerjee, Duflo and Kremer have replied that a sequence of trials, in several countries, with theory in between, is how one generalises, and that the alternative is often a confidence unearned by any design.

On nutrition, the honest summary is: hunger is widespread; a Dasgupta–Ray trap is possible but not the typical reduced form; iodine, iron, and early-life health have documented effects on later cognition (the iodine-salt and the INCAP Guatemala studies are classics); and cash plus information plus local supply often beats any one of them.

On education, enrolment is largely a solved problem at primary level in much of the world and an unsolved one in the Sahel and in some fragile states; learning is unsolved almost everywhere poor. Returns to *years* remain positive in most credible studies; returns to *specific pedagogies* are where the experimental literature now sits.

On health, a handful of cheap technologies (nets, vaccines, ORS, deworming where worms are prevalent) have high returns at low cost; health *systems* — nurses who show up, clinics that have drugs — are a different, harder, problem, on which RCTs of monitoring, incentives and community accountability (Muralidharan, Banerjee, Duflo, Dupas, and others) have mixed, place-specific results.

::: history
Theodore Schultz's 1960 Presidential Address to the American Economic Association, "Investment in Human Capital", and Gary Becker's *Human Capital* (1964) made education and health objects of investment rather than of consumption. Jacob Mincer's 1974 book fixed the empirical specification still used in labour-force surveys from Accra to Recife. Partha Dasgupta and Debraj Ray (1986) gave the nutrition trap its modern form. The experimental turn in development microeconomics is often dated to the mid-1990s: Kremer's work on schools in Kenya, Glewwe, and then Miguel and Kremer's deworming trial; Mexico's PROGRESA (1997), designed with Santiago Levy, which made a national policy a randomised evaluation. The 2019 Nobel Prize to Banerjee, Duflo and Kremer recognised that turn. It did not end the argument about what a trial can say.
:::

## Where this leads

Missing credit, which can turn a nutrition trap from a curiosity into a trap, is [[development-economics/credit-and-microfinance]]. Risk that knocks a household back down the capacity curve is [[development-economics/risk-and-insurance]]. The use of randomised evaluations as a *policy* method, including their limits, returns in [[development-economics/aid-and-policy]]. The labour-market side of schooling — signalling, compensating differentials, discrimination — is in [[labour-economics/human-capital]] and neighbouring chapters.

::: summary
- A nutrition-based poverty trap is a possibility when the capacity curve is S-shaped and credit is missing ([[#def-capacity]], [[#prop-nutrition-trap]]). Evidence suggests nutrition matters, but not that most poor households sit just below a biological switch.
- The Mincer return $\beta_1$ is the slope of log wages on years of school ([[#def-mincer]]). Typical estimates in developing countries are positive and economically large; they are not, without further design, causal, and years are not learning.
- Enrolment has risen much faster than learning. "Learning poverty" remains high in low- and middle-income countries (World Bank/UNESCO).
- Deworming, CCTs, bednets and some remedial pedagogies have experimental support, with effect sizes and spillovers that are still debated. External validity and general equilibrium are the limits of any one trial.
- Cheap health technologies often fail on delivery rather than on biology. Systems are harder to randomise than pills.
:::

## Exercises

::: exercise A Mincer wage {level=1 check="9.974"}
If $\ln w = 1.5 + 0.10 S$ and $S = 8$, what is $w$ to three decimal places? (Enter $w$.)
::: solution
$w = e^{2.3} \approx 9.974$.
:::
:::

::: exercise Factor gain {level=1 check="2.226"}
In the same equation, by what factor does $w$ rise when $S$ goes from 0 to 8? Three decimal places. (Enter the factor $e^{0.8}$.)
::: solution
$e^{0.8} \approx 2.226$.
:::
:::

::: exercise Capacity-curve algebra {level=1}
Suppose $\phi(c) = 0$ for $c < 2$ and $\phi(c) = 2(c-2)$ for $c \ge 2$, with $c$ capped so that $\phi \le 8$. A person has $y_0 = 0$ and $w = 1$. Find the equilibria of $c = w\,\phi(c)$.
::: solution
For $c < 2$, $\phi = 0$ so $c = 0$, which is consistent. For $c \ge 2$, $c = 2(c-2)$ implies $c = 2c - 4$, so $c = 4$, with $\phi = 4$, within the cap. Two equilibria: $(c,\phi) = (0,0)$ and $(4,4)$. The first is a trap if the person cannot borrow the consumption needed to reach the basin of $(4,4)$.
:::
:::

::: exercise Which transfer breaks the trap? {level=2}
In the previous exercise, a one-period transfer of size $T$ is given, after which $y_0$ returns to 0. Roughly how large must $T$ be to move the person out of $(0,0)$, if they consume the transfer as $c$ and then work? (Treat the unstable threshold as $c = 2$.)
::: solution
Any $T \ge 2$ puts the person onto the sloped part of $\phi$, where $\phi = 2(c-2)$ is steep enough, with $w = 1$, that the high equilibrium is the one they then satisfy. A transfer of 1, consumed and gone, leaves them at $c < 2$ with $\phi = 0$ next period. The sharp threshold is an artefact of this piecewise-linear $\phi$; the qualitative point survives with a smooth S-curve.
:::
:::

::: exercise IV versus OLS {level=2}
Duflo (2001) uses school construction as an instrument for years of schooling. State the exclusion restriction in words, and give one reason it might fail.
::: solution
Exclusion: INPRES school construction affected later wages *only* through years of schooling, not through other channels, after the controls (region, cohort) that make construction as-good-as-random. It might fail if the same programme also built roads or clinics, or changed local labour demand, so that wages moved for reasons other than the extra $S$ of the exposed cohorts. Duflo discusses these, and uses the interaction of a region-level intensity with cohort as the identifying variation, which helps but does not make exclusion automatic.
:::
:::

::: exercise Learning versus enrolment {level=2}
A CCT raises secondary enrolment by 8 percentage points and leaves a standardised test score unchanged among those who attend. Interpret, in terms of selection and of learning, what might be going on.
::: solution
Two stories, compatible with each other. Selection: the extra enrollees are, on average, weaker than those who would have attended anyway, so the *composition* of sitters-of-tests worsens even if every type learns as before. Learning: the condition buys attendance but the classroom does not teach the extra students much — the learning-poverty diagnosis. Distinguishing them needs scores for those who would have attended anyway (always-takers) versus compliers, which an RCT with baseline scores can approach but a raw mean score cannot.
:::
:::

::: exercise Spillovers {level=3}
In a deworming trial, untreated children in treated schools also gain attendance. Why does that make the naive treated-versus-untreated-within-school contrast a *downward*-biased estimate of the effect of treating a child, and what design handles it?
::: hint
The control children in a treated school are not a good control.
:::
::: solution
If spillovers raise the outcomes of the "control" children in treated schools, the within-school gap shrinks relative to the true effect of being in a treated environment. The right contrast is at the level of randomisation: treated *schools* versus untreated *schools* (and, for between-school spillovers, schools far from treated schools versus schools near them). Miguel and Kremer's design randomises at school level and uses distance to measure externalities. Individual-level randomisation inside a school would have been the wrong design for an infectious condition.
:::
:::

::: exercise A present value {level=3 check="780"}
Using the numbers in [[#ex-deworm]] — annual gain 102 dollars, 20 years starting after a 10-year delay, discount rate 5 percent, and $\frac{1-(1.05)^{-20}}{0.05} \approx 12.46$, $1.05^{-10} \approx 0.614$ — what is the present value of the wage gain, to the nearest dollar? (Enter that dollar amount.)
::: hint
PV $= 102 \times 0.614 \times 12.46$.
:::
::: solution
$102 \times 0.614 \times 12.46 \approx 780$.
:::
:::

