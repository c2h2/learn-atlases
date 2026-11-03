A bench multimeter shows $4.98725\,\mathrm{V}$. Six digits, so the voltage is known to a few microvolts? Not at all. The last digit flickers from reading to reading; the meter's specification sheet admits an error of a couple of hundred microvolts on this range; the meter was last calibrated eleven months ago against a reference that had its own uncertainty; and the leads, at a slightly different temperature from the terminals, add a thermoelectric voltage of their own. The display is a **measured value**; the knowledge we actually have is that the voltage lies, with high probability, within some interval around that value. A measurement result that does not state that interval is incomplete, because nobody can tell whether two such results agree, whether a product meets its tolerance, or whether a change from one day to the next is real.

This chapter builds the vocabulary and the arithmetic that let engineers make such statements precisely and comparably across the world. We start with what is measured and in what units: the SI as redefined in 2019, and the chain of calibrations that connects a factory multimeter to a quantum standard. Then we separate the two kinds of error, systematic and random, and adopt the internationally agreed method of the *Guide to the Expression of Uncertainty in Measurement* (the **GUM**) for evaluating each, combining them through the law of propagation of uncertainty, and reporting an expanded uncertainty. We finish with calibration and with using uncertainty to decide whether something conforms to a specification. The circuit quantities themselves — voltage, current, power — are those of [[circuits-1/basic-concepts]]; the statistics needed (means, variances, the normal distribution) are summarised as we go and treated fully in the Maths Atlas [probability](/learn/maths/lesson.php?c=probability&l=expectation) and [statistics](/learn/maths/lesson.php?c=statistics&l=estimation) courses.

## Units, standards and traceability {#sec-si}

A measurement compares a quantity with a reference quantity of the same kind, its **unit**. For that comparison to mean the same thing in Shenzhen and in Stuttgart, the units must be defined once, realised by laboratories, and passed down to everyday instruments without losing more accuracy than necessary.

::: definition The SI (2019) {#def-si}
The **International System of Units** is defined by fixing the exact numerical values of seven **defining constants**, when expressed in SI units:

| constant | exact value |
|---|---|
| caesium hyperfine frequency $\Delta\nu_{\mathrm{Cs}}$ | $9\,192\,631\,770\,\mathrm{Hz}$ |
| speed of light in vacuum $c$ | $299\,792\,458\,\mathrm{m/s}$ |
| Planck constant $h$ | $6.626\,070\,15\times10^{-34}\,\mathrm{J\,s}$ |
| elementary charge $e$ | $1.602\,176\,634\times10^{-19}\,\mathrm{C}$ |
| Boltzmann constant $k$ | $1.380\,649\times10^{-23}\,\mathrm{J/K}$ |
| Avogadro constant $N_A$ | $6.022\,140\,76\times10^{23}\,\mathrm{mol^{-1}}$ |
| luminous efficacy $K_{\mathrm{cd}}$ of $540\,\mathrm{THz}$ radiation | $683\,\mathrm{lm/W}$ |

Every unit — the seven base units second, metre, kilogram, ampere, kelvin, mole and candela, and all units derived from them — follows from these values. For example, the **ampere** is the current corresponding to a flow of exactly $1/(1.602\,176\,634\times10^{-19})$ elementary charges per second, and the **kelvin** is the change of thermodynamic temperature that changes the thermal energy $kT$ by exactly $1.380\,649\times10^{-23}\,\mathrm{J}$.
:::

The redefinition, in force since 20 May 2019, removed the last artefact standard, the platinum–iridium kilogram kept near Paris, and made the electrical units exact in terms of quantum effects. Two effects matter for electrical metrology.

- The **Josephson effect**: a junction between two superconductors, irradiated with microwaves of frequency $f$, develops a voltage that is constant on steps $V_n = n\,f/K_J$, where $K_J = 2e/h$ is the **Josephson constant**. With $h$ and $e$ fixed, $K_J = 483\,597.848\,4\ldots\,\mathrm{GHz/V}$ exactly. A single junction gives only about $145\,\mathrm{\mu V}$ at $70\,\mathrm{GHz}$, so practical standards connect thousands of junctions in series to produce $1$ or $10\,\mathrm{V}$, with frequency measured against an atomic clock.
- The **quantum Hall effect**: a two-dimensional electron gas at low temperature in a strong magnetic field shows Hall resistances $R_K/i$ for integer $i$, where $R_K = h/e^2 = 25\,812.807\,45\ldots\,\Omega$ is the **von Klitzing constant**, also exact since 2019.

From 1990 to 2019 laboratories used the conventional values $K_{J\text{-}90} = 483\,597.9\,\mathrm{GHz/V}$ and $R_{K\text{-}90} = 25\,812.807\,\Omega$, which were slightly inconsistent with the SI of the time. Their withdrawal changed realised voltages by about $1.07$ parts in $10^7$ and resistances by about $1.8$ parts in $10^8$: invisible to almost all instruments, but a real step for primary laboratories.

::: definition Traceability and calibration {#def-traceability}
**Metrological traceability** is the property of a measurement result whereby it can be related to a reference (ultimately the SI definition) through a documented, unbroken chain of calibrations, each contributing to the measurement uncertainty. A **calibration** is an operation that, under specified conditions, establishes the relation between the values indicated by an instrument and the corresponding values provided by a measurement standard, *with their uncertainties*, and uses that relation to obtain a measurement result from an indication.
:::

A typical chain for direct voltage: a national metrology institute's Josephson array calibrates Zener-diode transfer standards; these calibrate an accredited laboratory's reference multimeter or voltage calibrator; that calibrator checks the multimeters on a production line, perhaps once a year. Each link adds uncertainty, and each calibration certificate states the uncertainty so that the next link can include it. Without that chain a reading is a number of unknown meaning.

::: remark Measurand and model
The **measurand** is the quantity intended to be measured, defined well enough for the purpose: "the DC voltage between terminals A and B of this reference at $23.0\,^\circ\mathrm{C}$" rather than "the voltage". An incompletely defined measurand has an intrinsic uncertainty that no instrument can remove — the resistance of a resistor that changes by $25\,\mathrm{ppm/K}$ is not defined to better than about $25\,\mathrm{ppm}$ unless its temperature is specified to $1\,\mathrm{K}$. GUM work always starts by writing a **measurement model** $Y = f(X_1, \dots, X_N)$ that expresses the measurand $Y$ in terms of input quantities $X_i$: readings, corrections, calibration values, influence quantities such as temperature.
:::

## Errors, accuracy and precision {#sec-errors}

::: definition Measurement error and its components {#def-error}
The **measurement error** is the measured value minus a reference (true) quantity value. It is conventionally split into

- a **systematic error**, the component that in replicate measurements remains constant or varies predictably (an offset, a gain error, a loading effect, a thermoelectric voltage), and
- a **random error**, the component that varies unpredictably from one replicate to the next (noise, interference, quantisation dither), with zero expectation.

**Accuracy** is the closeness of agreement between a measured value and the true value; it is a qualitative concept and is not given a number. **Trueness** refers to the absence of systematic error (closeness of the mean of many replicates to the true value) and **precision** to the absence of random error (closeness of replicates to each other). **Repeatability** is precision under the same conditions over a short time; **reproducibility** is precision across different operators, instruments, locations or times. **Resolution** is the smallest change in the measurand that causes a perceptible change in the indication.
:::

The four combinations of good and bad trueness and precision are often drawn as a target: tight groups far from the centre (precise but biased), scattered groups around it (true on average but imprecise), and so on. Two things follow at once. First, averaging many readings reduces the random error but leaves the systematic error untouched: a biased instrument averaged a million times gives a very precise wrong answer. Second, the true value, and therefore the error, is never known — if we knew the error we would correct for it. What we can assess is how large the error *might be*: that is the uncertainty.

::: definition Measurement uncertainty (GUM) {#def-uncertainty}
The **uncertainty of measurement** is a non-negative parameter characterising the dispersion of the values reasonably attributable to the measurand. The **standard uncertainty** $u(x)$ of an estimate $x$ is that uncertainty expressed as a standard deviation. It is evaluated by one of two methods:

- **Type A evaluation**: by statistical analysis of a series of observations;
- **Type B evaluation**: by any other means — specifications, calibration certificates, handbook data, experience, physical bounds.

The two types differ only in how they are obtained, not in their nature: both are standard deviations of probability distributions describing our knowledge, and both are combined in the same way.
:::

::: warning Uncertainty is not error, and "systematic" is not "Type B"
An error is a (unknown) number with a sign; an uncertainty is a width, always positive. A large error can have a small uncertainty (a precisely known offset that has not yet been corrected — correct it!), and a reading can be exactly right by luck while having a large uncertainty. Also, do not equate "random" with "Type A" and "systematic" with "Type B". A meter's offset is a systematic effect, but its uncertainty is evaluated as Type B from the specification; the scatter of readings is a random effect evaluated as Type A — but the same random effect could equally be evaluated as Type B from a noise specification. The GUM deliberately classifies *evaluation methods*, not errors.
:::

::: quiz
A thermometer is checked twenty times in a bath held at exactly $50.00\,^\circ\mathrm{C}$. Its readings all lie between $50.41$ and $50.43\,^\circ\mathrm{C}$. How would you describe it?
- [ ] Accurate and precise
- [x] Precise but not true: a systematic error of about $+0.42\,^\circ\mathrm{C}$
- [ ] True but imprecise
- [ ] Neither precise nor true, since every reading is wrong
::: solution
The readings agree with each other to $\pm0.01\,^\circ\mathrm{C}$, so precision (repeatability) is excellent. Their mean is $0.42\,^\circ\mathrm{C}$ above the reference: a systematic error. Averaging more readings will not remove it; calibration will, by applying a correction of $-0.42\,^\circ\mathrm{C}$ whose uncertainty then enters the budget.
:::
:::

### Type A: the mean and its standard deviation

Suppose we take $n$ independent readings $x_1, \dots, x_n$ of a quantity under repeatability conditions. Model them as independent random variables with common mean $\mu$ and standard deviation $\sigma$. The best estimate of $\mu$ is the **arithmetic mean** $\bar x = \frac1n\sum x_k$, and the dispersion of the readings is estimated by the **experimental standard deviation**

$$
s = \sqrt{\frac{1}{n-1}\sum_{k=1}^{n}(x_k - \bar x)^2}.
$$ {#eq-s}

The divisor $n - 1$, not $n$, makes $s^2$ an unbiased estimate of $\sigma^2$: one degree of freedom has been used up in estimating $\bar x$ from the same data (proved in the Maths Atlas lesson on [estimation](/learn/maths/lesson.php?c=statistics&l=estimation)).

::: theorem Standard deviation of the mean {#thm-mean}
If $X_1, \dots, X_n$ are independent with common variance $\sigma^2$, the mean $\bar X$ has variance $\sigma^2/n$. The Type A standard uncertainty of the mean of $n$ readings is therefore

$$
u_A(\bar x) = \frac{s}{\sqrt n},
$$ {#eq-sem}

with $\nu = n - 1$ degrees of freedom.
:::

::: proof
For independent random variables the variance of a sum is the sum of the variances, and $\operatorname{Var}(aX) = a^2\operatorname{Var}X$. Hence $\operatorname{Var}\bar X = \frac{1}{n^2}\sum_{k=1}^n\operatorname{Var}X_k = \frac{1}{n^2}\,n\sigma^2 = \sigma^2/n$. Replacing the unknown $\sigma$ by its estimate $s$ gives [[#eq-sem]].
:::

The $1/\sqrt n$ law is both a blessing and a trap. Four times as many readings halve the random uncertainty; a hundred times as many reduce it tenfold, and then the measurement is usually limited by something else. It also assumes *independent* readings. Readings taken faster than the correlation time of the noise — for example, a meter integrating for $20\,\mathrm{ms}$ and read every $20\,\mathrm{ms}$ in the presence of a slow thermal drift — are not independent, and $s/\sqrt n$ then underestimates the uncertainty.

::: example A Type A evaluation {#ex-type-a}
Ten readings of a reference voltage, in volts, are $4.9871$, $4.9875$, $4.9868$, $4.9873$, $4.9877$, $4.9870$, $4.9874$, $4.9872$, $4.9869$, $4.9876$. Find the best estimate, the experimental standard deviation and the standard uncertainty of the mean.
::: solution
The mean is $\bar x = 49.8725/10 = 4.987\,25\,\mathrm{V}$. The deviations from the mean, in units of $0.1\,\mathrm{mV}$, are $-1.5, 2.5, -4.5, 0.5, 4.5, -2.5, 1.5, -0.5, -3.5, 3.5$; their squares sum to $82.5$, so

$$
s = \sqrt{\frac{82.5}{9}}\times0.1\,\mathrm{mV} = 3.03\times0.1\,\mathrm{mV} = 0.303\,\mathrm{mV}.
$$

By [[#eq-sem]], $u_A(\bar x) = 0.303/\sqrt{10} = 0.0957\,\mathrm{mV} = 95.7\,\mathrm{\mu V}$, with $9$ degrees of freedom. A single reading would have had a standard uncertainty (from scatter alone) of $303\,\mathrm{\mu V}$; averaging ten has reduced it by $\sqrt{10} = 3.16$.
:::
:::

### Type B: specifications and probability distributions

Most of the information in a typical uncertainty budget does not come from repeated readings but from documents: an instrument specification "$\pm(0.0035\,\%\text{ of reading} + 0.0005\,\%\text{ of range})$", a calibration certificate "$U = 4\,\mathrm{m\Omega}$, $k = 2$", a data sheet "temperature coefficient below $5\,\mathrm{ppm/K}$". The GUM converts each into a standard uncertainty by assigning a probability distribution that represents what we know.

::: proposition Standard uncertainties of common distributions {#prop-typeb}
If a quantity is known only to lie in $[\mu - a, \mu + a]$:

- with all values in the interval equally likely (**rectangular** distribution), $u = a/\sqrt3$;
- with values near the centre more likely, falling linearly to zero at the limits (**triangular**), $u = a/\sqrt6$;
- concentrated near the limits, as for a sinusoid of amplitude $a$ observed at a random instant (**U-shaped** or arcsine), $u = a/\sqrt2$.

If a certificate quotes an expanded uncertainty $U$ with coverage factor $k$, then $u = U/k$. If it quotes a $95\,\%$ interval for a normal distribution, $u = U/1.96$.
:::

::: proof
For the rectangular density $1/(2a)$ on $[-a, a]$, $\operatorname{Var} = \int_{-a}^{a}x^2\,\frac{\dd x}{2a} = \frac{a^2}{3}$. For the triangular density $(a - \lvert x\rvert)/a^2$, $\operatorname{Var} = 2\int_0^a x^2\frac{a - x}{a^2}\dd x = \frac{2}{a^2}\left(\frac{a^4}{3} - \frac{a^4}{4}\right) = \frac{a^2}{6}$. For $x = a\sin\theta$ with $\theta$ uniform, $\operatorname{Var} = a^2\,\overline{\sin^2\theta} = a^2/2$. The certificate case simply inverts the definition $U = ku$ ([[#def-expanded]] below).
:::

The rectangular distribution is the default for specification limits and for resolution: a display with a last digit of $1\,\mathrm{\mu V}$ rounds the true indication to within $\pm0.5\,\mathrm{\mu V}$, so its resolution contributes $0.5/\sqrt3 = 0.29\,\mathrm{\mu V}$. The choice matters less than one might fear: the three distributions above give $u$ between $0.41a$ and $0.71a$.

::: example A multimeter specification {#ex-type-b}
The reading of [[#ex-type-a]] was taken with a $6\tfrac12$-digit multimeter on its $10\,\mathrm{V}$ range, whose one-year specification is $\pm(0.0035\,\%\text{ of reading} + 0.0005\,\%\text{ of range})$; the display resolution is $1\,\mathrm{\mu V}$. Find the Type B standard uncertainties, the combined standard uncertainty of the voltage, and the expanded uncertainty with $k = 2$.
::: solution
The specification is a limit, so we treat it as a rectangular distribution with half-width

$$
a = 35\times10^{-6}\times4.987\,25\,\mathrm{V} + 5\times10^{-6}\times10\,\mathrm{V} = 174.6\,\mathrm{\mu V} + 50.0\,\mathrm{\mu V} = 224.6\,\mathrm{\mu V},
$$

giving $u_{\text{spec}} = 224.6/\sqrt3 = 129.6\,\mathrm{\mu V}$. The resolution gives $u_{\text{res}} = 0.29\,\mathrm{\mu V}$. The three contributions are independent, so their variances add (this is [[#thm-propagation]] below with all sensitivity coefficients equal to $1$):

$$
u_c = \sqrt{95.7^2 + 129.6^2 + 0.29^2}\,\mathrm{\mu V} = 161.2\,\mathrm{\mu V}.
$$

With $k = 2$, $U = 322\,\mathrm{\mu V}$, and the result is reported as $V = (4.987\,25 \pm 0.000\,32)\,\mathrm{V}$, $k = 2$. Notice that the resolution was utterly negligible: the sixth digit tells us about the meter's noise, not about the voltage.
:::
:::

::: widget distribution
dist: normal
params: mu=0, sigma=1
a: -2
b: 2
caption: The normal distribution of a measured value in units of its combined standard uncertainty $u_c$. The shaded area is the probability that the value lies within $\pm2u_c$: about $95.45\,\%$, which is why $k = 2$ is the usual coverage factor. Set $a = -1$, $b = 1$ to see the $68\,\%$ interval of $\pm u_c$, and $a = -3$, $b = 3$ for $99.7\,\%$.
:::

## Combining uncertainties {#sec-propagation}

Few measurands are read directly. Power is computed from voltage and resistance, resistance from voltage and current, temperature from a resistance through a calibration curve. Each input carries its own uncertainty; we need the uncertainty of the output.

::: theorem Law of propagation of uncertainty {#thm-propagation}
Let the measurand be $Y = f(X_1, \dots, X_N)$, with input estimates $x_i$, standard uncertainties $u(x_i)$ and correlation coefficients $r(x_i, x_j)$. Define the **sensitivity coefficients** $c_i = \partial f/\partial X_i$, evaluated at the estimates. Then, to first order, the estimate of $Y$ is $y = f(x_1, \dots, x_N)$ and its **combined standard uncertainty** $u_c(y)$ satisfies

$$
u_c^2(y) = \sum_{i=1}^{N}c_i^2u^2(x_i) + 2\sum_{i=1}^{N-1}\sum_{j=i+1}^{N}c_ic_j\,r(x_i, x_j)\,u(x_i)\,u(x_j).
$$ {#eq-propagation}

For uncorrelated inputs, $u_c^2(y) = \sum_i c_i^2u^2(x_i)$: the contributions $c_iu(x_i)$ add in quadrature.
:::

::: proof
Expand $f$ to first order about the estimates: $Y - y \approx \sum_i c_i(X_i - x_i)$. The variance of a linear combination is $\operatorname{Var}\big(\sum_i c_iZ_i\big) = \sum_i\sum_j c_ic_j\operatorname{Cov}(Z_i, Z_j)$. With $\operatorname{Var}Z_i = u^2(x_i)$ and $\operatorname{Cov}(Z_i, Z_j) = r(x_i, x_j)\,u(x_i)\,u(x_j)$ for $i \neq j$, splitting the double sum into diagonal terms and pairs $i < j$ gives [[#eq-propagation]]. The approximation is good when $f$ is nearly linear over a few standard uncertainties of each input; otherwise second-order terms (given in the GUM, §5.1.2) or a Monte Carlo evaluation (GUM Supplement 1) are needed.
:::

Two special forms are worth memorising. For a sum or difference $Y = X_1 \pm X_2$ with uncorrelated inputs, $u_c^2 = u_1^2 + u_2^2$: *absolute* uncertainties add in quadrature. For a product of powers $Y = cX_1^{p_1}X_2^{p_2}\cdots$, dividing [[#eq-propagation]] by $y^2$ gives

$$
\left(\frac{u_c(y)}{y}\right)^2 = \sum_i p_i^2\left(\frac{u(x_i)}{x_i}\right)^2,
$$ {#eq-relative}

so *relative* uncertainties add in quadrature, each multiplied by its exponent. A squared input counts double.

::: intuition Why quadrature, and why the largest term wins
Independent errors are as likely to partly cancel as to reinforce, so the typical size of their sum grows like the square root of the sum of squares, not like the sum. The consequence is that the largest contribution dominates: contributions of $3$ and $1$ combine to $\sqrt{10} = 3.16$, so halving the small one achieves almost nothing. When you set out to improve a measurement, list the contributions, find the biggest, and attack that one.
:::

::: example An uncertainty budget for electrical power {#ex-power}
The voltage of [[#ex-type-b]], $V = 4.987\,25\,\mathrm{V}$ with $u(V) = 161.2\,\mathrm{\mu V}$, is across a standard resistor whose certificate gives $R = 100.012\,\Omega$ with $U = 4\,\mathrm{m\Omega}$ ($k = 2$) at $23\,^\circ\mathrm{C}$. Its temperature coefficient is $10\,\mathrm{ppm/K}$ and the room is known to be within $23 \pm 1\,^\circ\mathrm{C}$. Find the dissipated power and its expanded uncertainty.
::: solution
The model is $P = V^2/R$, giving $P = 4.987\,25^2/100.012 = 0.248\,697\,\mathrm{W}$.

*Resistance.* The certificate gives $u_{\text{cal}} = 4/2 = 2.0\,\mathrm{m\Omega}$. The temperature effect is at most $10\times10^{-6}\times1\,\mathrm{K}\times100\,\Omega = 1.0\,\mathrm{m\Omega}$, rectangular, so $u_{\text{temp}} = 1.0/\sqrt3 = 0.58\,\mathrm{m\Omega}$. Combined: $u(R) = \sqrt{2.0^2 + 0.58^2} = 2.08\,\mathrm{m\Omega}$.

*Sensitivity coefficients.* $c_V = \partial P/\partial V = 2V/R = 0.099\,73\,\mathrm{A}$ and $c_R = \partial P/\partial R = -V^2/R^2 = -2.487\times10^{-3}\,\mathrm{A^2}$.

*Budget.*

| input | estimate | $u(x_i)$ | $c_i$ | $\lvert c_i\rvert u(x_i)$ |
|---|---|---|---|---|
| $V$ | $4.987\,25\,\mathrm{V}$ | $161.2\,\mathrm{\mu V}$ | $0.099\,73\,\mathrm{A}$ | $16.07\,\mathrm{\mu W}$ |
| $R$ | $100.012\,\Omega$ | $2.08\,\mathrm{m\Omega}$ | $-2.487\,\mathrm{mA^2}$ | $5.18\,\mathrm{\mu W}$ |

The inputs are uncorrelated, so $u_c(P) = \sqrt{16.07^2 + 5.18^2} = 16.9\,\mathrm{\mu W}$, a relative uncertainty of $68\,\mathrm{ppm}$. As a check with [[#eq-relative]]: $\sqrt{(2\times32.3)^2 + 20.8^2} = 67.9\,\mathrm{ppm}$. The expanded uncertainty is $U = 2\times16.9 = 34\,\mathrm{\mu W}$:

$$
P = (0.248\,697 \pm 0.000\,034)\,\mathrm{W},\quad k = 2.
$$

The voltage dominates, and within it the meter specification. A better meter, or calibrating this one against a reference shortly before use, would pay off; a better resistor would not.
:::
:::

### Correlated inputs

Correlation arises whenever two inputs share a source of error — the same instrument, the same reference, the same temperature. It can make the combined uncertainty larger or, very usefully, smaller.

::: example Ratio measurement with one meter {#ex-ratio}
An unknown resistor $R_x$ is connected in series with a standard $R_s = 1000.00\,\Omega$ and a current source. One multimeter measures $V_x = 2.2134\,\mathrm{V}$ across $R_x$ and $V_s = 1.0000\,\mathrm{V}$ across $R_s$, quickly and on the same range, so $R_x = R_sV_x/V_s$. The meter's gain error is uncertain by $u_g = 30\,\mathrm{ppm}$ (relative). What does it contribute to $u(R_x)$?
::: solution
The current need not be known: it cancels. If the meter has a gain error $g$, both readings are multiplied by $(1 + g)$, so the relative errors of $V_x$ and $V_s$ are both $g$, perfectly correlated, $r = 1$. With $c_{V_x} = R_s/V_s$ and $c_{V_s} = -R_sV_x/V_s^2$, dividing [[#eq-propagation]] by $R_x^2$ gives

$$
\left(\frac{u(R_x)}{R_x}\right)^2 = u_g^2 + u_g^2 - 2\cdot1\cdot u_g\cdot u_g = 0 .
$$

The gain error contributes nothing: it cancels exactly in the ratio. Treating the two readings as independent would have given $\sqrt2\times30 = 42\,\mathrm{ppm}$, a serious overestimate. What remains are the meter's non-linearity between $1$ and $2.2\,\mathrm{V}$, its noise, any drift of the current between the two readings, and the uncertainty of $R_s$. This is why the most accurate measurements are almost always ratio or substitution measurements against a standard of nearly the same value.
:::
:::

::: quiz
A length is measured as $L = 2.000\,\mathrm{m}$ with relative uncertainty $0.1\,\%$, and the area of a square of that side is computed as $A = L^2$. What is the relative standard uncertainty of $A$?
- [ ] $0.1\,\%$
- [ ] $0.14\,\%$, because two lengths are multiplied
- [x] $0.2\,\%$
- [ ] $0.01\,\%$
::: solution
By [[#eq-relative]] with exponent $p = 2$, $u(A)/A = 2\times0.1\,\% = 0.2\,\%$. Treating $A = L\times L$ as a product of two *independent* lengths would give $\sqrt2\times0.1 = 0.14\,\%$, which is wrong: the two factors are the same measurement, perfectly correlated, and correlated contributions add linearly.
:::
:::

::: widget plot
f: sqrt(s^2/x + b^2); s/sqrt(x); b + 0*x
x: 1, 100
y: 0, 120
sliders: s=100:10:300:5; b=40:0:150:5
labels: u_c(n); s/\sqrt{n}; u_B
caption: Combined standard uncertainty (microvolts) of the mean of $n$ readings, when each reading has scatter $s$ and the Type B contribution is $u_B$. Averaging drives the Type A part (orange) down as $1/\sqrt n$, but the total (blue) flattens onto the Type B floor (green). With $s = 100$ and $u_B = 40$, going from $10$ to $100$ readings improves $u_c$ by only $18\,\%$. Set $u_B = 0$ to see the pure $1/\sqrt n$ law.
:::

## Expanded uncertainty and reporting {#sec-reporting}

A standard uncertainty is a standard deviation: the true value lies within $\pm u_c$ of the estimate with a probability of only about two-thirds. For decisions, a wider interval with a higher probability is more useful.

::: definition Expanded uncertainty and coverage factor {#def-expanded}
The **expanded uncertainty** is $U = k\,u_c(y)$, where the **coverage factor** $k$ is chosen so that the interval $y \pm U$ is expected to contain a large, stated fraction $p$ of the values that could reasonably be attributed to the measurand (the **coverage probability**). For an approximately normal distribution, $k = 2$ gives $p \approx 95\,\%$ and $k = 3$ gives $p \approx 99.7\,\%$.
:::

Why should the output be approximately normal, when the inputs include rectangular distributions? Because the output is (to first order) a weighted sum of several independent inputs, and the central limit theorem makes sums of independent variables tend to the normal distribution quickly — the sum of just three rectangular variables of similar width is already hard to tell from a Gaussian. The exception is a budget dominated by one rectangular term: then $y \pm 2u_c$ covers $100\,\%$ of a rectangle of half-width $\sqrt3u_c$, and $k = 1.65$ already gives $95\,\%$.

::: widget clt
dist: uniform
n: 3
samples: 4000
caption: Why combined uncertainties are nearly normal. Each sample here is the mean of $n$ independent rectangularly distributed contributions, like the Type B terms of an uncertainty budget. With $n = 1$ the histogram is flat; already at $n = 3$ it is close to the normal curve. Try the "skewed" population to see that the convergence is slower for lopsided contributions.
:::

When the Type A components have few degrees of freedom, the normal coverage factor is too optimistic: the estimated $s$ might itself be well below $\sigma$. The GUM then uses Student's $t$-distribution with an **effective number of degrees of freedom** from the Welch–Satterthwaite formula,

$$
\nu_{\text{eff}} = \frac{u_c^4(y)}{\sum_i \dfrac{c_i^4u^4(x_i)}{\nu_i}},
$$ {#eq-welch}

with $\nu_i = \infty$ for Type B components taken from reliable limits, and $k = t_{95}(\nu_{\text{eff}})$. In [[#ex-type-b]], $\nu_{\text{eff}} = 161.2^4/(95.7^4/9) = 72$ and $t_{95}(72) = 1.99$, so $k = 2$ was fine. With only three readings and a dominant Type A term, $\nu = 2$ and $k = 4.30$: a reminder not to evaluate an uncertainty from a handful of readings.

::: warning Reporting a result
State the result as $y \pm U$ with the unit, the coverage factor and, if not obvious, the coverage probability: "$R = (100.012 \pm 0.004)\,\Omega$, $k = 2$". Give $U$ to at most two significant figures and round $y$ to the same decimal place; more digits suggest a knowledge of the uncertainty itself that nobody has. Never round intermediate results in a budget, only the final statement. And never write "$\pm$" alone without saying whether it is $u_c$, $U$ with $k = 2$, or a specification limit: these differ by factors of two or more.
:::

::: example How many readings? {#ex-design}
A test station must measure a $10\,\mathrm{V}$ output with an expanded uncertainty ($k = 2$) no larger than $50\,\mathrm{\mu V}$. The meter's calibrated Type B uncertainty at $10\,\mathrm{V}$ is $15\,\mathrm{\mu V}$ (standard), and the scatter of individual readings is $s = 60\,\mathrm{\mu V}$. How many readings must be averaged? What if the Type B uncertainty were $30\,\mathrm{\mu V}$?
::: solution
The requirement is $u_c \le 50/2 = 25\,\mathrm{\mu V}$, so the Type A part may contribute at most $u_A^2 = 25^2 - 15^2 = 400\,\mathrm{\mu V^2}$, i.e. $u_A \le 20\,\mathrm{\mu V}$. By [[#eq-sem]], $60/\sqrt n \le 20$ gives $n \ge 9$. Then $\nu_{\text{eff}} = 25^4/(20^4/8) = 19.5$ and $t_{95}(19.5) \approx 2.09$, slightly above $2$, so take a margin: $n = 12$ gives $u_A = 17.3\,\mathrm{\mu V}$, $u_c = 22.9\,\mathrm{\mu V}$, $\nu_{\text{eff}} = 34$, $k = t_{95}(34) = 2.03$ and $U = 2.03\times22.9 = 47\,\mathrm{\mu V}$, which meets the requirement.

If $u_B = 30\,\mathrm{\mu V}$, then $u_B > 25\,\mathrm{\mu V}$ already and no number of readings is enough. The meter must be recalibrated or replaced. This is the uncertainty floor of the figure above.
:::
:::

## Calibration and conformity {#sec-calibration}

Calibration does two things: it **corrects** known systematic errors, and it **quantifies** the uncertainty that remains. Suppose a sensor-plus-instrument system has an approximately linear characteristic, indication $r = a + bx$, where $a$ is the offset and $b$ the gain. Applying two or more known reference values $x$ and recording the indications lets us estimate $a$ and $b$, and thereafter compute the measured value from a new indication as $\hat x = (r - a)/b$. With more than two points, the line is fitted by least squares, and the residuals reveal non-linearity and noise.

::: widget regression
points: 0,0.31; 20,20.12; 40,40.05; 60,59.86; 80,79.80; 100,99.62
degree: 1
residuals: true
caption: Calibration of a temperature channel: reference temperatures (°C) on the horizontal axis, indications on the vertical. The fitted line gives the offset and gain to correct; the residuals are what is left after correction. Drag a point upwards to simulate a non-linear sensor and watch the residuals take on a systematic bow — a sign that a straight-line correction is no longer adequate and a quadratic (degree 2) is needed.
:::

::: example Two-point correction of a thermometer {#ex-twopoint}
A digital thermometer reads $0.3\,^\circ\mathrm{C}$ in an ice-point bath ($0.00\,^\circ\mathrm{C}$) and $99.6\,^\circ\mathrm{C}$ in a calibration bath at $100.00\,^\circ\mathrm{C}$. It then reads $37.2\,^\circ\mathrm{C}$. What is the corrected temperature? If each bath temperature is uncertain by $0.02\,^\circ\mathrm{C}$ (standard) and each reading by $0.05\,^\circ\mathrm{C}$ (resolution and noise), estimate the uncertainty at $37\,^\circ\mathrm{C}$ due to the calibration.
::: solution
The indication is $r = a + bT$ with $a = 0.3$ and $b = (99.6 - 0.3)/100 = 0.993$. Inverting, $T = (37.2 - 0.3)/0.993 = 37.16\,^\circ\mathrm{C}$.

Write the corrected value as interpolation between the two calibration points: $T = T_1 + (T_2 - T_1)\dfrac{r - r_1}{r_2 - r_1}$ with $T_1 = 0$, $T_2 = 100$, $r_1 = 0.3$, $r_2 = 99.6$. Let $w = (r - r_1)/(r_2 - r_1) = 0.3716$. Sensitivity coefficients: $\partial T/\partial T_1 = 1 - w = 0.628$, $\partial T/\partial T_2 = w = 0.372$, $\partial T/\partial r = 100/99.3 = 1.007$, $\partial T/\partial r_1 = -1.007(1 - w) = -0.633$, $\partial T/\partial r_2 = -1.007w = -0.374$. Then

$$
u^2(T) = (0.628^2 + 0.372^2)(0.02)^2 + (1.007^2 + 0.633^2 + 0.374^2)(0.05)^2 = 0.000\,213 + 0.003\,89,
$$

so $u(T) = 0.064\,^\circ\mathrm{C}$ and $U = 0.13\,^\circ\mathrm{C}$ ($k = 2$). The reading noise dominates; averaging the readings at the calibration points and at the measurement would help most.
:::
:::

### Deciding conformity

An instrument passes calibration if its error is within its specification; a product passes test if its measured parameter is within tolerance. The uncertainty of the test matters because a measured value just inside the limit may correspond to a true value just outside. Two practices manage this risk.

- The **test uncertainty ratio** (TUR) is the ratio of the tolerance half-width to the expanded uncertainty of the test. A TUR of at least $4:1$ has long been the rule of thumb, chosen so that measurement uncertainty contributes little to wrong decisions.
- **Guard banding** shrinks the acceptance interval by an amount related to $U$, for example accepting only if $\lvert y - y_{\text{nominal}}\rvert \le T - U$. This lowers the probability of accepting a bad item (consumer's risk) at the cost of rejecting some good ones (producer's risk). Standards such as ISO/IEC 17025 require the laboratory to state the decision rule it uses.

::: application Calibration intervals and drift
An instrument specification normally has a time component: the "one-year" specification of [[#ex-type-b]] may be twice the "24-hour" one. The difference is drift — of the internal Zener reference, of resistor ratios, of amplifier offsets. Laboratories set calibration intervals from the history of each instrument's as-found errors, and the best voltage references (Zener-diode transfer standards) are characterised by their drift rate, a few parts in $10^6$ per year, as much as by their noise. Measuring the drift and correcting for it, with its own uncertainty, is often the cheapest way to improve a budget.
:::

## Where this leads

Every later chapter of this course is an exercise in uncertainty budgets. The sensors of [[instrumentation/sensors-transducers]] are characterised by sensitivity, non-linearity and drift, which become Type B entries; the bridges of [[instrumentation/bridges-signal-conditioning]] produce outputs whose ratio-metric nature cancels excitation errors in the same way as [[#ex-ratio]]; noise and quantisation in [[instrumentation/data-acquisition]] are random contributions characterised by standard deviations; and the specifications of the instruments in [[instrumentation/test-instruments]] are the Type B inputs of every bench measurement. The statistics behind Type A evaluation — estimators, confidence intervals and the $t$-distribution — are developed in [[random-signals/probability-for-engineers]] and in the Maths Atlas [statistics](/learn/maths/lesson.php?c=statistics&l=confidence-intervals) course.

::: history
The metric system was born in revolutionary France in the 1790s, and the Metre Convention of 1875 created the International Bureau of Weights and Measures (BIPM) at Sèvres to keep its prototypes. The International System of Units was named in 1960. Electrical metrology moved to quantum standards after Brian Josephson's prediction of the effect named after him (1962) and Klaus von Klitzing's discovery of the quantum Hall effect (1980, Nobel Prize 1985); conventional values of $K_J$ and $R_K$ were adopted for worldwide use from 1 January 1990. The statistical treatment of uncertainty has older roots in Gauss's theory of errors (1809), but the modern method began with a 1980 recommendation of a BIPM working group and was published as the *Guide to the Expression of Uncertainty in Measurement* in 1993, reissued with minor corrections in 1995 and as JCGM 100:2008. The SI was redefined in terms of fixed constants at the 26th General Conference on Weights and Measures in November 2018, with effect from 20 May 2019, World Metrology Day.
:::

::: summary
- Since 2019 the SI is defined by seven exact constants; $K_J = 2e/h$ and $R_K = h/e^2$ are exact, so Josephson and quantum Hall standards realise the volt and the ohm directly.
- Traceability is an unbroken chain of calibrations to the SI, each stating its uncertainty.
- Errors are systematic or random; uncertainty (always positive) characterises the dispersion of values attributable to the measurand, evaluated by Type A (statistics of readings, $u = s/\sqrt n$) or Type B (other information, e.g. $a/\sqrt3$ for a rectangular limit $\pm a$).
- The law of propagation of uncertainty combines inputs through sensitivity coefficients: $u_c^2 = \sum c_i^2u_i^2$ plus correlation terms; relative uncertainties of products add in quadrature, weighted by exponents.
- Correlated errors can cancel: ratio and substitution measurements remove common gain errors.
- The expanded uncertainty $U = ku_c$ with $k = 2$ gives about $95\,\%$ coverage; use the $t$-factor for few degrees of freedom and quote $U$ to two significant figures.
- Calibration corrects offset and gain and quantifies residual uncertainty; conformity decisions use test uncertainty ratios and guard bands.
:::

## Exercises

::: exercise Resolution as a Type B contribution {level=1 check="0.0005/sqrt(3)"}
A $3\tfrac12$-digit meter displays $1.234\,\mathrm{V}$, with a last digit of $1\,\mathrm{mV}$. What standard uncertainty, in volts, does the resolution contribute?
::: solution
The true indication lies within $\pm0.5\,\mathrm{mV}$ of the displayed value, with no preference, so the distribution is rectangular with $a = 0.5\,\mathrm{mV}$ and $u = 0.5/\sqrt3 = 0.289\,\mathrm{mV}$.
:::
:::

::: exercise Averaging {level=1 check="0.0005"}
Single readings of a voltage scatter with an experimental standard deviation of $2\,\mathrm{mV}$. What is the standard uncertainty, in volts, of the mean of $16$ independent readings?
::: solution
$u = s/\sqrt n = 2/4 = 0.5\,\mathrm{mV}$.
:::
:::

::: exercise Combining a budget {level=1 check="260e-6"}
Three independent contributions to the uncertainty of a voltage, each already expressed as a standard uncertainty with sensitivity coefficient $1$, are $30$, $40$ and $120\,\mathrm{\mu V}$. Find the expanded uncertainty, in volts, for $k = 2$.
::: solution
$u_c = \sqrt{30^2 + 40^2 + 120^2} = \sqrt{900 + 1600 + 14\,400} = \sqrt{16\,900} = 130\,\mathrm{\mu V}$, and $U = 260\,\mathrm{\mu V}$. The largest term alone would have given $240\,\mathrm{\mu V}$.
:::
:::

::: exercise Type A from five readings {level=2 check="0.01e-3/sqrt(2)"}
Five readings of a current are $10.03$, $10.01$, $10.04$, $10.02$ and $10.00\,\mathrm{mA}$. Find the mean, the experimental standard deviation, and the standard uncertainty of the mean in amperes.
::: solution
The mean is $10.02\,\mathrm{mA}$. The deviations are $0.01, -0.01, 0.02, 0, -0.02\,\mathrm{mA}$ with squares summing to $0.0010\,\mathrm{mA^2}$; $s = \sqrt{0.0010/4} = 0.0158\,\mathrm{mA}$ and $u = s/\sqrt5 = 0.0071\,\mathrm{mA} = 7.1\,\mathrm{\mu A}$, with $4$ degrees of freedom (so $k = t_{95}(4) = 2.78$ for $95\,\%$ coverage).
:::
:::

::: exercise Resistance from voltage and current {level=2 check="0.0005"}
A resistance is computed as $R = V/I$ from independent measurements with relative standard uncertainties $0.03\,\%$ for $V$ and $0.04\,\%$ for $I$. Find the relative standard uncertainty of $R$ (as a fraction).
::: solution
By [[#eq-relative]] with exponents $1$ and $-1$: $\sqrt{0.03^2 + 0.04^2}\,\% = 0.05\,\% = 0.0005$.
:::
:::

::: exercise Power from current {level=2 check="40*sqrt(0.002^2+0.001^2)"}
A current $I = 2.000\,\mathrm{A}$ with $u(I) = 2\,\mathrm{mA}$ flows through $R = 10.00\,\Omega$ with $u(R) = 0.01\,\Omega$, uncorrelated. Find the standard uncertainty of $P = I^2R$ in watts.
::: solution
$P = 40.0\,\mathrm{W}$. Relative uncertainties: $u(I)/I = 0.1\,\%$, counted twice because of the square, and $u(R)/R = 0.1\,\%$. So $u(P)/P = \sqrt{(2\times0.001)^2 + 0.001^2} = 0.002\,24$ and $u(P) = 0.089\,\mathrm{W}$.
:::
:::

::: exercise Specification of a current range {level=2}
A multimeter's $100\,\mathrm{mA}$ range is specified as $\pm(0.05\,\%\text{ of reading} + 0.005\,\%\text{ of range})$, and the meter's shunt drops $0.1\,\mathrm{V}$ at full scale (burden voltage). It reads $45.000\,\mathrm{mA}$ in a circuit where the current is driven from $5.0\,\mathrm{V}$ through $110\,\Omega$. Find the standard uncertainty from the specification, and the systematic error caused by inserting the meter. Which matters more?
::: solution
$a = 0.0005\times45 + 0.000\,05\times100 = 0.0225 + 0.005 = 0.0275\,\mathrm{mA}$, so $u = 0.0275/\sqrt3 = 0.016\,\mathrm{mA}$. The shunt resistance is $0.1\,\mathrm{V}/0.1\,\mathrm{A} = 1\,\Omega$. Without the meter the current would be $5.0/110 = 45.45\,\mathrm{mA}$; with it, $5.0/111 = 45.05\,\mathrm{mA}$. The insertion error, $-0.41\,\mathrm{mA}$ ($-0.9\,\%$), is twenty-five times the specification uncertainty. It is systematic and known, so it should be corrected (multiply by $111/110$), with an uncertainty contribution from the uncertainty of the circuit resistance. Loading is often the largest error in a measurement and appears in no specification.
:::
:::

::: exercise Distributions of Type B quantities {level=3}
(a) Show that the variance of a rectangular distribution of half-width $a$ is $a^2/3$. (b) Show that the sum of two independent rectangular variables of half-width $a$ has a triangular distribution of half-width $2a$, and check that its variance, $(2a)^2/6$, equals the sum of the two variances. (c) A specification says only that an error "does not exceed $\pm a$", but you know from many calibrations that the error is nearly always well inside the limit. Which distribution would you use and how much would $u$ change?
::: hint
For (b), convolve two rectangles.
:::
::: solution
(a) With density $1/(2a)$ on $[-a, a]$, the mean is $0$ and $\operatorname{Var} = \frac{1}{2a}\int_{-a}^{a}x^2\dd x = \frac{1}{2a}\cdot\frac{2a^3}{3} = \frac{a^2}{3}$.

(b) The density of the sum is the convolution of two rectangles of height $1/(2a)$ and width $2a$: for $\lvert z\rvert \le 2a$ the overlap length is $2a - \lvert z\rvert$, so $f(z) = (2a - \lvert z\rvert)/(4a^2)$, a triangle of half-width $2a$ (its area is $\frac12\cdot4a\cdot\frac{1}{2a} = 1$). Its variance is $(2a)^2/6 = 2a^2/3$, and the sum of the two variances is $a^2/3 + a^2/3 = 2a^2/3$. They agree, as they must for independent variables.

(c) Knowledge that values cluster near the centre justifies a triangular (or even normal, with the limits at about $\pm2\sigma$ to $\pm3\sigma$) distribution: $u = a/\sqrt6 = 0.41a$ instead of $a/\sqrt3 = 0.58a$, about $30\,\%$ smaller. Without that knowledge, the rectangular distribution is the honest, conservative choice.
:::
:::

::: exercise Offsets cancel in a difference {level=3}
A meter with an uncertain zero offset $u_0 = 20\,\mathrm{\mu V}$ and an uncertain gain error $u_g = 50\,\mathrm{ppm}$ measures $V_1 = 1.000\,00\,\mathrm{V}$ and $V_2 = 1.001\,00\,\mathrm{V}$ on the same range, and the quantity of interest is $D = V_2 - V_1$. Taking the readings as $V_{i,\text{meas}} = (1 + g)V_i + v_0$ with the same $g$ and $v_0$ for both, find the contributions of the offset and the gain error to $u(D)$. Compare with treating the two readings as independent.
::: solution
$D_{\text{meas}} = (1 + g)(V_2 - V_1) + (v_0 - v_0) = (1 + g)D$. The offset cancels exactly; the gain error contributes $u_g D = 50\times10^{-6}\times1\,\mathrm{mV} = 0.05\,\mathrm{\mu V}$. Treated as independent, each reading would have $u = \sqrt{20^2 + 50^2} = 53.9\,\mathrm{\mu V}$ (the gain term being $50\,\mathrm{ppm}\times1\,\mathrm{V} = 50\,\mathrm{\mu V}$), and $u(D) = \sqrt2\times53.9 = 76\,\mathrm{\mu V}$, almost $8\,\%$ of $D$. The correct correlated analysis gives $0.05\,\mathrm{\mu V}$ (plus noise and non-linearity). Difference measurements with one instrument are the basis of null methods and of bridge measurements ([[instrumentation/bridges-signal-conditioning]]).
:::
:::

::: exercise Designing a calibration {level=3}
A pressure transmitter with tolerance $\pm0.25\,\%$ of full scale ($\pm250\,\mathrm{Pa}$ on a $100\,\mathrm{kPa}$ range) is to be calibrated with a test uncertainty ratio of at least $4:1$. The reference gauge has $u = 15\,\mathrm{Pa}$; the transmitter's output is read with a meter contributing $u = 10\,\mathrm{Pa}$ (equivalent), and the transmitter's own repeatability is $s = 40\,\mathrm{Pa}$ per reading. How many readings must be averaged at each calibration point? With that number, what guarded acceptance limit would you use if the rule is "accept if the measured error is within $T - U$"?
::: solution
TUR $\ge 4$ means $U \le 250/4 = 62.5\,\mathrm{Pa}$, so $u_c \le 31.25\,\mathrm{Pa}$ with $k = 2$. The fixed contributions give $15^2 + 10^2 = 325\,\mathrm{Pa^2}$, leaving $u_A^2 \le 31.25^2 - 325 = 651.6\,\mathrm{Pa^2}$, $u_A \le 25.5\,\mathrm{Pa}$. Then $40/\sqrt n \le 25.5$ gives $n \ge 2.46$; but with $\nu = n - 1$ small the coverage factor exceeds $2$, so take more readings: $n = 5$ gives $u_A = 17.9\,\mathrm{Pa}$, $u_c = \sqrt{17.9^2 + 325} = 25.4\,\mathrm{Pa}$, $\nu_{\text{eff}} = 25.4^4/(17.9^4/4) = 16$, $k = t_{95}(16) = 2.12$ and $U = 54\,\mathrm{Pa}$, a TUR of $4.6$. The guarded acceptance limit is $\pm(250 - 54) = \pm196\,\mathrm{Pa}$.
:::
:::
