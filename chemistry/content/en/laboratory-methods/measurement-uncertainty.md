A digital balance settles and displays $0.5106\ \mathrm{g}$. Before you copy it into your notebook, ask what the last digit claims. It claims that the balance can tell this object apart from one that is $0.0001\ \mathrm{g}$ lighter and from one that is $0.0001\ \mathrm{g}$ heavier — and the manufacturer's specification says the reading may be wrong by as much as $\pm 0.0002\ \mathrm{g}$, so the honest statement is not "the mass is $0.5106\ \mathrm{g}$" but "the mass lies in an interval centred on $0.5106\ \mathrm{g}$, and that interval is about $0.0004\ \mathrm{g}$ wide." **No measurement is a point; every measurement is an interval with a most-likely value at its centre.** Everything in this chapter follows from taking that sentence seriously. If a measurement is an interval, then a calculation is interval arithmetic, a result is an interval, and a report that hides the interval — by writing down every digit the calculator printed, or by quoting a mean without its scatter — has thrown away information as surely as a mislabelled bottle.

The vocabulary is small and exact, and it is misused constantly, in newspapers and in lab reports alike. In everyday speech "accurate" and "precise" are near-synonyms; at the bench they name two different properties, and a measurement can have one without the other. This chapter separates them, builds the arithmetic of repeated measurements and of significant figures, and derives the propagation rules that keep a multi-step preparation honest from the balance to the final dilution. These are not bookkeeping rules imposed to make problem sets tedious; they are the machinery that stops a ten-figure answer built on a two-figure measurement from fooling anyone, least of all you.

## Accuracy, precision, and two kinds of error

::: definition Accuracy and precision {#def-accuracy-precision}
**Accuracy** is the closeness of a measured value to the true value; its opposite is **systematic error** (bias), a reproducible offset that shifts every measurement the same way. **Precision** is the closeness of repeated measurements to one another; its opposite is **random error**, an unpredictable scatter of individual readings about their mean. Accuracy is quantified by the difference between the mean of many measurements and the true value; precision is quantified by the standard deviation of the replicate measurements themselves. A method can be precise but inaccurate, accurate but imprecise, both, or neither — the four combinations are genuinely different situations with different remedies.
:::

The traditional picture is a dartboard. Throws clustered tightly around the bullseye are accurate and precise. Throws clustered tightly off-centre — a neat group in the corner — are precise but not accurate: the thrower is consistent, and consistently wrong, which is what a systematic error does. Throws scattered evenly around the bullseye are accurate on average but imprecise: individual readings are poor, but they average out. Throws scattered far from the centre are neither, and no amount of arithmetic rescues them.

On the bench, random error is the flicker of the last digit of a balance, the meniscus falling a fraction of a division above or below as you read a burette on different days, a draught across the balance pan, a room that is two degrees warmer on Tuesday. Such errors are as likely to be positive as negative, they follow no pattern you can predict for a single reading, and — this is their saving grace — they partly cancel when you average. Random error sets your **precision**, and repetition is the only remedy for it.

Systematic error is something else entirely. An uncalibrated balance that reads $1.0000\ \mathrm{g}$ too high on every weighing; a $25.00\ \mathrm{cm^3}$ pipette that actually delivers $25.10\ \mathrm{cm^3}$; a burette tip with a trapped air bubble that makes every delivered volume read too large; an indicator whose colour change falls a pH unit away from the equivalence point. Every reading is shifted in the same direction by roughly the same amount. The readings may agree with each other beautifully — they simply agree on the wrong number.

::: warning Repetition never reveals a systematic error {#warn-precision-not-accuracy}
Five precise readings of a badly calibrated pipette are five precise wrong numbers. Averaging shrinks random error and leaves systematic error untouched: a bias of $+0.10\ \mathrm{cm^3}$ per delivery survives a hundred replicates exactly as large as it was after one, and the mean of the biased readings is exactly as biased as a single reading — only more confidently so. A tiny standard deviation is not evidence that a measurement is correct; it is evidence that the instrument is stable, which is a different thing. Systematic error is hunted by different means: calibrate the balance against a certified mass, calibrate the pipette by weighing the water it delivers, run a reagent blank to catch impurities, analyse a certified reference material whose true content is known, or settle a disputed result by an independent method. Precision is established by repetition; accuracy only by comparison with something better.
:::

## Repeated measurements: the mean and its scatter

When random error is what limits you, the answer is to repeat the measurement and let the statistics do their work.

::: definition Mean, standard deviation, relative standard deviation {#def-mean-sd}
For $n$ repeated measurements $x_1, x_2, \ldots, x_n$, the **mean** is
$$
\bar{x} = \frac{1}{n}\sum_{i=1}^{n} x_i ,
$$
and the **sample standard deviation** is
$$
s = \sqrt{\frac{\sum_{i=1}^{n}\left(x_i - \bar{x}\right)^2}{n-1}} .
$$
The denominator $n-1$ (the degrees of freedom) appears because the deviations are measured from the mean fitted to the same data, which uses up one degree of freedom; with $n-1$ the estimate is unbiased. The **relative standard deviation** (RSD, or coefficient of variation) is $s/\bar{x}$, usually quoted as a percentage — it says what fraction of the signal the scatter is, and it is the number to compare between measurements of different size.
:::

For scattered measurements the standard deviation plays the role of a typical error: if the scatter is roughly symmetric and bell-shaped — a **normal distribution**, which is what you get when many small independent causes add — then about $68\ \%$ of individual readings fall within one standard deviation of the mean and about $95\ \%$ within two. So a reported value $\bar{x} \pm s$ claims "a fresh reading lands in this interval about two times in three", and $\bar{x} \pm 2s$ claims "about nineteen times in twenty".

::: proposition Standard uncertainty of the mean {#prop-sem}
If the $n$ replicate measurements are independent draws from the same distribution with standard deviation $\sigma$, then the **standard uncertainty of the mean** is
$$
u(\bar{x}) = \frac{\sigma}{\sqrt{n}} \approx \frac{s}{\sqrt{n}} .
$$
The mean of four readings is only half as uncertain as a single reading, and the mean of a hundred only a tenth as uncertain: improvement comes as the square root of effort, which is why chemists run five replicates and not fifty.
:::

::: proof Variances of independent readings add {#proof-sem}
For independent random variables, variances add: $\mathrm{Var}(x_1 + x_2) = \mathrm{Var}(x_1) + \mathrm{Var}(x_2)$, because the covariance term vanishes when the variables carry no joint pattern. Apply this to the mean, pulling out the constant factor $1/n$ (which leaves the variance as its square, $1/n^2$):
$$
\mathrm{Var}(\bar{x}) = \mathrm{Var}\!\left(\frac{1}{n}\sum_{i=1}^{n} x_i\right) = \frac{1}{n^2}\sum_{i=1}^{n}\mathrm{Var}(x_i) = \frac{1}{n^2}\cdot n\sigma^2 = \frac{\sigma^2}{n}.
$$
Taking the square root gives the standard deviation of the mean, $\sigma/\sqrt{n}$, and substituting the measured $s$ for the unknown $\sigma$ gives $u(\bar{x}) = s/\sqrt{n}$. Two cautions hide in the first step. It requires *independence*: readings that share a drifting instrument or a repeated personal habit are correlated, the covariance terms do not vanish, and averaging them removes less scatter than the formula promises. And it says nothing about bias — the whole derivation treats only the scatter around whatever mean the data have, right or wrong.
:::

::: widget distribution
dist: normal
params: mu=25.00, sigma=0.03
a: 24.94
b: 25.06
caption: Repeated $25\ \mathrm{cm^3}$ deliveries from a pipette scatter about their mean like this normal curve, with a standard deviation of $0.03\ \mathrm{cm^3}$. The shaded band from $24.94$ to $25.06\ \mathrm{cm^3}$ is the $\pm 2\sigma$ interval, which contains about $95\ \%$ of all readings — a fresh delivery outside it is possible but uncommon. Slide your eye across the tails and notice how little probability lives beyond three standard deviations: that is why a reading five $s$ away from its siblings deserves suspicion.
:::

::: example Mean, standard deviation and the uncertainty of the mean {#ex-burette-stats}
A student empties a $25\ \mathrm{cm^3}$ pipette five times into tared beakers and weighs the water, finding deliveries of $24.98$, $25.02$, $24.97$, $25.03$ and $24.95\ \mathrm{cm^3}$. Report the mean with its standard deviation, the relative standard deviation, and the standard uncertainty of the mean.
::: solution
The mean is
$$
\bar{x} = \frac{24.98 + 25.02 + 24.97 + 25.03 + 24.95}{5} = \frac{124.95}{5} = 24.99\ \mathrm{cm^3}.
$$
The deviations from the mean are $-0.01$, $+0.03$, $-0.02$, $+0.04$, $-0.04\ \mathrm{cm^3}$; their squares are $0.0001$, $0.0009$, $0.0004$, $0.0016$, $0.0016$, which sum to $0.0046\ \mathrm{cm^6}$. Then
$$
s = \sqrt{\frac{0.0046}{5-1}} = \sqrt{0.00115} = 0.034\ \mathrm{cm^3},
\qquad
\mathrm{RSD} = \frac{0.034}{24.99} = 0.0014 = 0.14\ \%.
$$
The standard uncertainty of the mean is
$$
u(\bar{x}) = \frac{s}{\sqrt{n}} = \frac{0.034}{\sqrt{5}} = \frac{0.034}{2.236} = 0.015\ \mathrm{cm^3}.
$$
Report the pipette's delivery as $24.99 \pm 0.02\ \mathrm{cm^3}$ (standard uncertainty of the mean, $n = 5$). Read the numbers: $s = 0.034\ \mathrm{cm^3}$ is about what a Class A pipette should manage, so the student is working at the limit of the glassware rather than ruining it; and the mean is better than any single delivery, which is the entire reason for the five weighings.
:::
:::

## Significant figures

Before there were uncertainty budgets there was a cruder shorthand, and it is still the language of bench conversation: significant figures.

::: definition Significant figures {#def-sig-figs}
**Significant figures** are the digits of a measured number that carry real information about its size:
- Non-zero digits are always significant: $2.54$ has three.
- Captive zeros, between non-zero digits, are significant: $2.004$ has four.
- Leading zeros are never significant — they only place the decimal point: $0.0025$ has two.
- Trailing zeros to the right of the decimal point are significant: $2.500$ has four, and claims more than $2.5$.
- Trailing zeros in a whole number are ambiguous: $1500$ might mean two, three or four figures. Write $1.5\times10^{3}$ or $1.500\times10^{3}$ and say what you mean.
**Exact numbers** — counts of things, definitions such as $1000\ \mathrm{mg} = 1\ \mathrm{g}$, and stoichiometric coefficients — carry no uncertainty and never limit the figures of a result; see the exact counting numbers of [[general-chemistry-1/stoichiometry]].
The arithmetic rules: for **multiplication and division** the result carries as many significant figures as the factor with the fewest; for **addition and subtraction** the result carries as many decimal places as the least precise term.
:::

The two rules are not arbitrary: they are the propagation rules of the next section in crude form. Multiplying by a factor uncertain in its third digit cannot leave you certain of the product's fourth; adding a number uncertain in the units place cannot leave you certain of the sum's hundredths. A measurement such as $0.5106\ \mathrm{g}$ (four figures) carries a relative uncertainty of order $1$ part in $5000$, while $0.5\ \mathrm{g}$ (two figures) carries order $1$ in $10$ — the figure count is a rough proxy for the relative uncertainty, which is exactly why it behaves multiplicatively.

::: example Significant-figure arithmetic and a rounding chain {#ex-sig-fig-arithmetic}
Give each result to the right number of figures: (a) $0.06017 \times 5.1234$; (b) $25.00 + 0.2342$; (c) $25.00 \times 0.1025$; and in (c) round once, at the end.
::: solution
(a) $0.06017$ has four figures (the leading zeros do not count), $5.1234$ has five, so the product takes four: $0.06017 \times 5.1234 = 0.30827498\ldots$, reported as $0.3083$.
(b) Addition works in decimal places: $25.00$ is certain to hundredths, $0.2342$ to ten-thousandths, so the sum is certain only to hundredths: $25.00 + 0.2342 = 25.2342$, reported as $25.23$.
(c) Both factors have four figures, so the product takes four. The exact product is $2.5625$ — an exact tie in the fifth digit. The round-half-to-even convention used by calculators and statisticians gives $2.562$; the older round-half-up rule gives $2.563$. Either is defensible, and the argument itself is the lesson: the disputed digit is the last one, which was never certain anyway. What is *not* defensible is chaining roundings — $2.5625 \to 2.563 \to 2.56$ — because each intermediate rounding commits an error you then treat as fact. Carry all the digits the calculator gives you through the intermediate steps, and round once, at the end, when you know which digit is the last honest one.
:::
:::

::: warning A calculator does not decide your significant figures {#warn-calculator-digits}
A calculator that prints $0.10254672897$ for your titration calculation has not made the result ten figures accurate; it has displayed ten digits, which is a different thing. The digits beyond the third or fourth are arithmetic performed on noise. The discipline has three parts. Round **once, at the end** — intermediate roundings accumulate and can shift the final digit. Let the **uncertainty, not the calculator, fix the last significant digit**: report an uncertainty in its first uncertain digit and round the value to match, so $c = 0.102547 \pm 0.00003\ \mathrm{mol\,dm^{-3}}$ becomes $(1.02547 \pm 0.00003) \times 10^{-1}$, and $24.99 \pm 0.015\ \mathrm{cm^3}$ becomes $24.99 \pm 0.02\ \mathrm{cm^3}$. And never report a result more precisely than the worst step that produced it — a yield computed from a two-figure balance reading is a two-figure yield however many digits the spreadsheet shows.
:::

::: quiz
How many significant figures does the number $0.05060$ contain?
- [ ] Three — the final zero is only a placeholder and zeros after the decimal point never count.
- [x] Four — the digits 5, 0, 6 and the final 0 are significant; the two leading zeros only place the decimal point.
- [ ] Five — every digit except the very first zero counts.
- [ ] Six — every digit written down counts, leading zeros included.
::: solution
Four. Leading zeros are never significant: they locate the decimal point, and $5.060\times10^{-2}$ is the same measurement with the same four figures. The zero captive between 5 and 6 is significant, and the trailing zero *is* significant precisely because it was written: it claims the reading was made to the fourth decimal place, so $0.05060$ is a more precise statement than $0.0506$. This is why scientific notation is the honest way to write numbers with ambiguous zeros — the figure count is then visible at a glance.
:::
:::

## Propagating uncertainty

Real results are built from several measurements at once: a concentration from a mass and a volume, a dilution from a stock and two pieces of glassware. Each input is an interval, and the question is how wide the output interval is. The answer depends on whether the inputs are independent, and the standard working assumption is that they are.

::: proposition Rules for propagating uncertainty {#prop-propagation}
Let $z$ be formed from independent measured quantities $x$ and $y$ with standard uncertainties $u_x$ and $u_y$.
- **Sum or difference**, $z = x + y$ or $z = x - y$. Worst case: $u_z = u_x + u_y$. Independent random errors, combined in quadrature (square-root-of-sum-of-squares):
$$
u_z = \sqrt{u_x^2 + u_y^2}.
$$
- **Product or quotient**, $z = xy$ or $z = x/y$. Worst case: the relative uncertainties add. In quadrature:
$$
\left(\frac{u_z}{z}\right)^2 = \left(\frac{u_x}{x}\right)^2 + \left(\frac{u_y}{y}\right)^2 .
$$
- **Power**, $z = x^{n}$: the relative uncertainty is multiplied by $|n|$: $u_z/z = |n|\,u_x/x$.
- **Common logarithm**, $z = \log x$: the absolute uncertainty of $z$ is the relative uncertainty of $x$ divided by $\ln 10$:
$$
u_z = \frac{1}{\ln 10}\,\frac{u_x}{x}.
$$
Quadrature is the correct combination for independent random errors, because variances add; worst-case addition is a deliberate overestimate, useful for safety margins and required when the errors are correlated (two volumes read on the same mis-calibrated burette, say). For ordinary work use quadrature. Note the asymmetry the rules create: for sums it is the *absolute* uncertainties that matter, so adding $25.00 \pm 0.03$ and $0.5 \pm 0.1$ is limited by the crude term; for products it is the *relative* uncertainties, so a $1\ \%$ uncertainty in a small mass can outrank a $0.1\ \%$ uncertainty in a large volume.
:::

::: proof The product rule from first-order Taylor expansion {#proof-product-rule}
Let $z = f(x, y)$ and let each input carry a small random error, so that
$$
\delta z \approx \frac{\partial z}{\partial x}\,\delta x + \frac{\partial z}{\partial y}\,\delta y .
$$
Square it and average over many repetitions of the experiment. The squares average to the variances, and the cross-term $\overline{\delta x\,\delta y}$ averages to zero because independent errors are as likely to pair with a positive as with a negative partner:
$$
u_z^2 = \left(\frac{\partial z}{\partial x}\right)^2 u_x^2 + \left(\frac{\partial z}{\partial y}\right)^2 u_y^2 .
$$
For $z = xy$ the partial derivatives are $\partial z/\partial x = y$ and $\partial z/\partial y = x$, so $u_z^2 = y^2 u_x^2 + x^2 u_y^2$. Divide by $z^2 = x^2 y^2$:
$$
\left(\frac{u_z}{z}\right)^2 = \left(\frac{u_x}{x}\right)^2 + \left(\frac{u_y}{y}\right)^2 ,
$$
which is the product rule. For $z = x/y$, write $z = x\,y^{-1}$: the partials are $1/y$ and $-x/y^2$, and squaring kills the minus sign, so quotients propagate exactly like products. For $z = x^n$, $\mathrm{d}z/\mathrm{d}x = n\,x^{n-1}$ gives $u_z = |n|\,x^{n-1}u_x$; dividing by $x^n$ gives $u_z/z = |n|\,u_x/x$. For $z = \log_{10} x$, $\mathrm{d}z/\mathrm{d}x = 1/(x\ln 10)$ gives the logarithm rule at once — which is why the mantissa of a pH carries the *relative* uncertainty of the hydrogen ion concentration: a $2\ \%$ uncertainty in $[\mathrm{H^+}]$ becomes $0.02/\ln 10 = 0.009$ in the pH. The sum rule is the special case $z = x \pm y$, whose partials are $\pm 1$. The whole construction is first-order: it assumes the uncertainties are small compared with the quantities (a few per cent), and it fails for wildly uncertain inputs.
:::

::: example Uncertainty of a standard made by dilution {#ex-dilution-propagation}
A student pipettes $25.00\ \mathrm{cm^3}$ of a $0.1000\ \mathrm{mol\,dm^{-3}}$ stock solution into a $250.0\ \mathrm{cm^3}$ volumetric flask and makes to the mark. Take $u(V_\mathrm{pip}) = 0.03\ \mathrm{cm^3}$, $u(V_\mathrm{flask}) = 0.12\ \mathrm{cm^3}$ and $u(c_\mathrm{stock}) = 0.0002\ \mathrm{mol\,dm^{-3}}$. What is the concentration of the dilute standard, with its uncertainty?
::: solution
The concentration is $c = c_\mathrm{stock}\,V_\mathrm{pip}/V_\mathrm{flask} = 0.1000 \times 25.00/250.0 = 0.01000\ \mathrm{mol\,dm^{-3}}$. A product and quotient, so combine relative uncertainties in quadrature:
$$
\frac{u_c}{c} = \sqrt{\left(\frac{0.0002}{0.1000}\right)^2 + \left(\frac{0.03}{25.00}\right)^2 + \left(\frac{0.12}{250.0}\right)^2} = \sqrt{(2.0\times10^{-3})^2 + (1.2\times10^{-3})^2 + (4.8\times10^{-4})^2}.
$$
The three squares are $4.0\times10^{-6}$, $1.44\times10^{-6}$ and $0.23\times10^{-6}$; their sum is $5.67\times10^{-6}$, so $u_c/c = 2.38\times10^{-3}$, i.e. $0.24\ \%$. Then
$$
u_c = 0.01000 \times 2.38\times10^{-3} = 0.000024\ \mathrm{mol\,dm^{-3}},
$$
and the standard is $c = (1.000 \pm 0.002) \times 10^{-2}\ \mathrm{mol\,dm^{-3}}$. The budget is worth reading before you close the notebook: the stock solution contributes $71\ \%$ of the variance, the pipette $25\ \%$, the flask only $4\ \%$. If this concentration mattered, recalibrating the flask would achieve nothing; the place to improve is the stock.
:::
:::

::: widget plot
f: u/x
x: 1, 100
y: 0, 0.15
sliders: u=0.02:0.005:0.1:0.005
labels: \text{relative uncertainty}
caption: The relative uncertainty $u/V$ of a volume delivery plotted against the volume delivered, for a fixed absolute uncertainty $u$ set by the slider. The curve is a hyperbola: with $u = 0.02\ \mathrm{cm^3}$, delivering $2\ \mathrm{cm^3}$ costs $1\ \%$ while delivering $100\ \mathrm{cm^3}$ costs $0.02\ \%$ — fifty times better for the same piece of technique. This is the shape of every uncertainty budget: small volumes, and by the same argument small masses, dominate.
:::

::: example An uncertainty budget: which step dominates? {#ex-uncertainty-budget}
To prepare $2.00\times10^{-3}\ \mathrm{mol\,dm^{-3}}$ potassium hydrogenphthalate solution, a student pipettes $5.00\ \mathrm{cm^3}$ of $0.1000\ \mathrm{mol\,dm^{-3}}$ stock into a $250.0\ \mathrm{cm^3}$ flask. Uncertainties: pipette $u = 0.01\ \mathrm{cm^3}$, flask $u = 0.12\ \mathrm{cm^3}$, stock $u = 0.00005\ \mathrm{mol\,dm^{-3}}$. Build the budget, and say what you would change.
::: solution
Relative uncertainties: stock $0.00005/0.1000 = 5.0\times10^{-4}$; pipette $0.01/5.00 = 2.0\times10^{-3}$; flask $0.12/250.0 = 4.8\times10^{-4}$. In quadrature,
$$
\frac{u_c}{c} = \sqrt{(5.0\times10^{-4})^2 + (2.0\times10^{-3})^2 + (4.8\times10^{-4})^2} = \sqrt{0.25\times10^{-6} + 4.0\times10^{-6} + 0.23\times10^{-6}} = 2.1\times10^{-3},
$$
so $u_c = 2.00\times10^{-3} \times 2.1\times10^{-3} = 4.2\times10^{-6}\ \mathrm{mol\,dm^{-3}}$, and $c = (2.000 \pm 0.004)\times10^{-3}\ \mathrm{mol\,dm^{-3}}$. The shares of the variance are $89\ \%$ pipette, $5\ \%$ flask, $6\ \%$ stock: the $5.00\ \mathrm{cm^3}$ pipette is the whole problem, exactly as the $1/V$ curve predicts — a small delivery pays a large relative price. Everything else together contributes one-eighth of the pipette's variance, so improving the flask or the stock is wasted effort. The fix is to stop delivering small volumes: if the chemistry allows, weigh the aliquot instead — $5\ \mathrm{cm^3}$ of solution is about $5\ \mathrm{g}$, and $5\ \mathrm{g}$ weighed to $\pm 0.0003\ \mathrm{g}$ is a relative uncertainty of $0.006\ \%$, thirty times better than the pipette. Gravimetric dilution (weigh, don't measure) is how analytical laboratories actually make dilute standards.
:::
:::

## Where the numbers come from: tolerances

The propagation rules tell you how to combine uncertainties; they do not tell you what the uncertainties *are*. There are two sources. If you can repeat the measurement, its scatter gives $s$ directly, and $s/\sqrt{n}$ gives the mean's uncertainty. But you cannot always repeat — a single Class A pipette delivery is what it is — and then the number comes from the manufacturer's **tolerance**: the maximum deviation the glassware or instrument is certified to show. Class A tolerances (e.g. Harris, *Quantitative Chemical Analysis*) include $\pm 0.03\ \mathrm{cm^3}$ for a $25\ \mathrm{cm^3}$ transfer pipette, $\pm 0.12\ \mathrm{cm^3}$ for a $250\ \mathrm{cm^3}$ volumetric flask, and $\pm 0.05\ \mathrm{cm^3}$ for the full delivery of a $50\ \mathrm{cm^3}$ burette; an analytical balance is typically $\pm 0.0002\ \mathrm{g}$. Class B glassware is about twice as loose, and teaching-laboratory glassware is often neither.

A tolerance is a limit, not a standard deviation: the true volume is somewhere inside the box $[-t, +t]$, with no position in the box preferred. That is a **rectangular (uniform) distribution**, and for a rectangular distribution the standard deviation — the standard uncertainty — is the tolerance divided by $\sqrt{3}$. A reading that is equally likely anywhere in $\pm 0.03\ \mathrm{cm^3}$ therefore has $u = 0.03/\sqrt{3} = 0.017\ \mathrm{cm^3}$. Where you genuinely expect the errors to bell up around zero — repeated readings of one volume — treat them as normal and use $s$; where you only know a limit, divide by $\sqrt{3}$. The balance deserves one more care: a weighing by difference uses two readings (gross and net), and two independent uncertainties combine in quadrature, $\sqrt{2} \times 0.0002/\sqrt{3} = 0.0002\ \mathrm{g}$ — which is why "weigh out about a gram" is good advice: $0.0002\ \mathrm{g}$ is $0.02\ \%$ of $1\ \mathrm{g}$ but $0.8\ \%$ of $0.025\ \mathrm{g}$.

::: example From tolerance to standard uncertainty {#ex-tolerance-to-uncertainty}
Convert the Class A tolerance of a $25.00\ \mathrm{cm^3}$ transfer pipette, $\pm 0.03\ \mathrm{cm^3}$, into a standard uncertainty and a relative standard uncertainty. Compare with treating the tolerance itself as the uncertainty.
::: solution
For a rectangular distribution,
$$
u(V) = \frac{0.03}{\sqrt{3}} = 0.017\ \mathrm{cm^3},
\qquad
\frac{u(V)}{V} = \frac{0.017}{25.00} = 6.9\times10^{-4} = 0.069\ \%.
$$
Treating the tolerance directly as $u$ gives $0.03/25.00 = 0.12\ \%$ — a factor $\sqrt{3}$ more conservative, and a common bench convention when you want a quick, safe number. Either way the conclusion is the same and worth saying out loud: a single $25\ \mathrm{cm^3}$ delivery is uncertain in the *third* significant figure of the volume, so a titration result built on one such delivery cannot honestly carry four figures. The burette tells the same story: its full-delivery tolerance of $\pm 0.05\ \mathrm{cm^3}$ is $0.1\ \%$ of $50\ \mathrm{cm^3}$ but $1\ \%$ of $5\ \mathrm{cm^3}$ — deliver as much of the burette's range as the chemistry allows.
:::
:::

::: history
The statistical theory of errors grew out of astronomy and geodesy, not chemistry, and arrived at the bench by inheritance. In the 1750s Roger Boscovich, reconciling conflicting observations of Jupiter's orbit, and Tobias Mayer, reducing lunar measurements by averaging groups of them, published the first systematic recipes for extracting one best value from inconsistent observations — Boscovich's rule of minimising the sum of absolute residuals anticipating what we now call robust fitting. Adrien-Marie Legendre put the modern method on record in 1805: choose the value that minimises the *sum of squared* errors, least squares, published in a few pages of *Nouvelles méthodes pour la détermination des orbites des comètes*. Carl Friedrich Gauss, who claimed priority, supplied the deep reason in 1809: if the errors are normally distributed, the least-squares value is the most probable value — tying the recipe to the bell curve that this chapter's $\pm 2s$ intervals assume. Nineteenth-century physical laboratories inherited from the astronomers the whole apparatus of weighted means, rejected readings and quoted probable errors. The final step was administrative, and it changed the daily life of every analytical laboratory: in 1993 an international committee of metrology bodies published the *Guide to the Expression of Uncertainty in Measurement* (GUM), which gave the world one language for the $\pm$ sign — combine independent uncertainties in quadrature, say whether you are quoting a standard deviation or an expanded interval, and state the coverage. The rules of this chapter are the GUM rules in the size a teaching laboratory can actually use.
:::

## Where this leads

The interval you have learned to carry by hand becomes a fitted object in [[laboratory-methods/data-graphs]], where a least-squares line carries the uncertainty of its slope and intercept — the same quadrature rule, applied to many readings at once. [[laboratory-methods/volumetric-technique]] is where the tolerances of this chapter bite: rinsing, meniscus reading, drainage and temperature are each a potential systematic error, and the techniques are designed to shut them one by one. The full statistical treatment — $t$-tests, confidence intervals, outlier tests, calibration lines with their uncertainty bands — is [[analytical-chemistry/statistics-calibration]], and [[analytical-chemistry/classical-analysis]] applies the whole budget to titrimetry and gravimetry, where every drop inherits the arithmetic you have just learned. For the original context of units and figure-counting, see [[general-chemistry-1/matter-measurement]].

::: summary
- Every measurement is an interval: report a value with its uncertainty, and let the uncertainty — not the calculator — fix the last significant digit.
- Accuracy is closeness to truth (limited by systematic error); precision is reproducibility (limited by random error). Repetition shrinks random error only; calibration, blanks and reference materials are how systematic error is found.
- The mean of $n$ independent readings has standard uncertainty $s/\sqrt{n}$: four replicates halve the scatter of one, a hundred reduce it tenfold.
- Significant figures are crude uncertainty bookkeeping: fewest figures for products and quotients, fewest decimal places for sums and differences, exact numbers never limiting, round once at the end.
- Propagate in quadrature for independent random errors: absolute uncertainties for sums, relative uncertainties for products and quotients, relative uncertainty multiplied by $|n|$ for powers, divided by $\ln 10$ for logarithms.
- Glassware tolerances are limits, not standard deviations: divide a rectangular tolerance by $\sqrt{3}$ for a standard uncertainty, and combine two balance readings in quadrature.
- Build a budget before you improve anything: relative uncertainty grows as $1/V$ and $1/m$, so small volumes and small masses dominate — and usually only one term is worth fixing.
:::

## Exercises

::: exercise Counting significant figures {level=1}
State the number of significant figures in each: (a) $0.0034$; (b) $2.040$; (c) $1500$; (d) $1.500\times10^{3}$; (e) $100.0$. For (c), say what is ambiguous and how to remove the ambiguity.
::: solution
(a) Two — leading zeros only place the decimal point. (b) Four — the captive zeros count and the trailing zero after the decimal point claims precision. (c) Ambiguous — the trailing zeros may or may not be significant; two, three or four figures are all defensible readings of the number. Remove the ambiguity with scientific notation: $1.5\times10^{3}$, $1.50\times10^{3}$ or $1.500\times10^{3}$. (d) Four — scientific notation makes the figure count explicit. (e) Four — the decimal point makes the trailing zeros significant.
:::
:::

::: exercise Mean of four masses {level=1 check="0.5105"}
Four weighings of the same weighing bottle give $0.5106$, $0.5102$, $0.5108$ and $0.5104\ \mathrm{g}$. Compute their mean. (Enter the mean in $\mathrm{g}$.)
::: solution
$\bar{x} = (0.5106 + 0.5102 + 0.5108 + 0.5104)/4 = 2.0420/4 = 0.5105\ \mathrm{g}$.
:::
:::

::: exercise Relative uncertainty of a pipette delivery {level=1 check="0.12"}
A $25.00\ \mathrm{cm^3}$ Class A transfer pipette has tolerance $\pm 0.03\ \mathrm{cm^3}$. Treating the tolerance itself as the uncertainty, compute the relative uncertainty of one full delivery. (Enter the relative uncertainty in $\%$.)
::: solution
$u/V = 0.03/25.00 = 1.2\times10^{-3} = 0.12\ \%$. (Dividing the tolerance by $\sqrt{3}$ first, as a rectangular distribution requires, would give $0.069\ \%$; the question asks for the conservative bench convention.)
:::
:::

::: exercise Propagating a titration quotient {level=2 check="2.4e-4"}
A titration gives $c_\mathrm{B} = c_\mathrm{A}\,V_\mathrm{A}/V_\mathrm{B}$ with $c_\mathrm{A} = 0.1000 \pm 0.0002\ \mathrm{mol\,dm^{-3}}$, $V_\mathrm{A} = 22.50 \pm 0.03\ \mathrm{cm^3}$ (burette delivery) and $V_\mathrm{B} = 25.00 \pm 0.03\ \mathrm{cm^3}$ (pipette). Find $c_\mathrm{B}$ and propagate the uncertainties in quadrature to find $u(c_\mathrm{B})$. (Enter $u(c_\mathrm{B})$ in $\mathrm{mol\,dm^{-3}}$, in scientific notation.)
::: solution
$c_\mathrm{B} = 0.1000 \times 22.50/25.00 = 0.0900\ \mathrm{mol\,dm^{-3}}$. Relative uncertainties: $0.0002/0.1000 = 2.0\times10^{-3}$; $0.03/22.50 = 1.33\times10^{-3}$; $0.03/25.00 = 1.2\times10^{-3}$. In quadrature,
$$
\frac{u_c}{c} = \sqrt{(2.0\times10^{-3})^2 + (1.33\times10^{-3})^2 + (1.2\times10^{-3})^2} = \sqrt{4.0 + 1.78 + 1.44}\times10^{-6} = 2.69\times10^{-3},
$$
so $u(c_\mathrm{B}) = 0.0900 \times 2.69\times10^{-3} = 2.4\times10^{-4}\ \mathrm{mol\,dm^{-3}}$, and $c_\mathrm{B} = (9.00 \pm 0.02)\times10^{-2}\ \mathrm{mol\,dm^{-3}}$. The standardisation of the titrant, not the glassware, is the largest single contributor.
:::
:::

::: exercise Uncertainty of the mean {level=2 check="0.012"}
Four replicate masses give a sample standard deviation $s = 0.024\ \mathrm{g}$. Compute the standard uncertainty of their mean. (Enter it in $\mathrm{g}$.)
::: solution
$u(\bar{x}) = s/\sqrt{n} = 0.024/\sqrt{4} = 0.024/2 = 0.012\ \mathrm{g}$. Note the cost of the square root: to halve this $0.012\ \mathrm{g}$ again would take four times as many readings, sixteen in all.
:::
:::

::: exercise Worst case versus quadrature {level=2}
A mixture is made by adding $25.00 \pm 0.03\ \mathrm{cm^3}$ of one solution and $20.00 \pm 0.05\ \mathrm{cm^3}$ of a second. Compute the total volume with its uncertainty (a) by worst-case addition and (b) by quadrature. Which is larger, by what factor, and when is each the right rule?
::: solution
Total volume $45.00\ \mathrm{cm^3}$. (a) Worst case: $u = 0.03 + 0.05 = 0.08\ \mathrm{cm^3}$. (b) Quadrature: $u = \sqrt{0.03^2 + 0.05^2} = \sqrt{0.0034} = 0.058\ \mathrm{cm^3}$. Worst case is larger by a factor $0.08/0.058 = 1.4$. Quadrature is right for independent random errors because it lets the typical case — one error positive, one negative — cancel partly, which is what actually happens most of the time; worst case assumes both errors take their extreme values in the same direction simultaneously, which is the right rule only when the errors are correlated (both volumes read on the same badly calibrated burette) or when you must guarantee a bound.
:::
:::

::: exercise Derive the quotient rule {level=3}
Derive the quadrature rule for a quotient, $\left(u_z/z\right)^2 = \left(u_x/x\right)^2 + \left(u_y/y\right)^2$ with $z = x/y$, from the product rule and the power rule — and then again from the general first-order formula $u_z^2 = (\partial z/\partial x)^2 u_x^2 + (\partial z/\partial y)^2 u_y^2$. Why does the minus sign in the derivative never appear in the result?
::: hint
Write $z = x\,y^{-1}$ and apply the power rule to $y^{-1}$ first: what is the relative uncertainty of $y^{-1}$ in terms of that of $y$? Then apply the product rule to $x$ and $y^{-1}$.
:::
::: solution
First route: by the power rule with $n = -1$, the relative uncertainty of $y^{-1}$ is $|-1|\,u_y/y = u_y/y$ — inverting a quantity does not change its relative uncertainty. The product rule on $z = x\,y^{-1}$ then gives $(u_z/z)^2 = (u_x/x)^2 + (u_{y^{-1}}/y^{-1})^2 = (u_x/x)^2 + (u_y/y)^2$. Second route: $\partial z/\partial x = 1/y$ and $\partial z/\partial y = -x/y^2$, so
$$
u_z^2 = \frac{u_x^2}{y^2} + \frac{x^2 u_y^2}{y^4}.
$$
Divide by $z^2 = x^2/y^2$: $(u_z/z)^2 = (u_x/x)^2 + (u_y/y)^2$. The minus sign disappears because it is squared — and that is not a mathematical accident to be apologised for: independent errors in $x$ and $y$ are equally likely to oppose or to reinforce each other, so the average effect of the cross-term is zero and only the squares survive. Division is no safer than multiplication, which is worth remembering the first time you divide by a small, uncertain volume.
:::
:::

::: exercise A full uncertainty budget {level=3}
You prepare a standard solution by weighing $0.1000\ \mathrm{g}$ of dried primary standard by difference on an analytical balance (tolerance $\pm 0.0002\ \mathrm{g}$ per reading, two readings), dissolving and making to $250.0\ \mathrm{cm^3}$ in a Class A volumetric flask ($\pm 0.12\ \mathrm{cm^3}$), and then delivering a $25.00\ \mathrm{cm^3}$ aliquot of the solution with a Class A pipette ($\pm 0.03\ \mathrm{cm^3}$). Treating each tolerance as the uncertainty, build the budget of relative uncertainties for the amount of standard in the aliquot, $n = (m/M)\,(V_\mathrm{pip}/V_\mathrm{flask})$. Which term dominates, by what share of the variance, and what single change would you make?
::: solution
Relative uncertainties: weighing by difference has $u(m) = \sqrt{2}\times0.0002 = 0.0003\ \mathrm{g}$, so $u_m/m = 0.0003/0.1000 = 2.8\times10^{-3}$ ($0.28\ \%$); pipette $0.03/25.00 = 1.2\times10^{-3}$ ($0.12\ \%$); flask $0.12/250.0 = 4.8\times10^{-4}$ ($0.048\ \%$). In quadrature the total is $\sqrt{(2.8\times10^{-3})^2 + (1.2\times10^{-3})^2 + (4.8\times10^{-4})^2} = 3.1\times10^{-3}$, i.e. $0.31\ \%$. The shares of the variance are $83\ \%$ weighing, $15\ \%$ pipette, $2\ \%$ flask: the dominant term is the *small mass*, not the glassware — $0.0003\ \mathrm{g}$ of uncertainty on $0.1000\ \mathrm{g}$ is the price of weighing little. The single change: weigh more. Preparing the same concentration from $1.0000\ \mathrm{g}$ (or weighing a larger mass into a larger flask and diluting an aliquot) drops the weighing term to $0.028\ \%$, the total budget to $0.13\ \%$, and hands dominance to the pipette — at which point the budget says to stop improving and go home.
:::
:::
