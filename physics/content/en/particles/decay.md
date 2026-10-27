In 1896 Henri Becquerel left uranium salts on a photographic plate wrapped in black paper and found the plate fogged. Within a few years it was clear that the radiation came from the atoms themselves, that it could not be switched off by heat, pressure or chemistry, and that it came in at least three kinds, named alpha, beta and gamma in order of increasing penetration. Each kind turned out to be a different physical process. An **alpha particle** is a ${}^4\mathrm{He}$ nucleus that tunnels out through the Coulomb barrier; a **beta particle** is an electron or positron created, together with a neutrino, by the weak interaction; a **gamma ray** is a photon emitted when a nucleus drops from an excited state to a lower one.

The three have one thing in common: the time at which a given nucleus decays is random, with a probability per unit time that does not depend on the nucleus's age. That single fact gives the exponential decay law and everything built on it, from radiocarbon dating to the equilibrium of the uranium series. The differences between the three processes then explain the enormous range of measured lifetimes, from $10^{-7}\,\mathrm{s}$ to $10^{17}\,\mathrm{s}$ for alpha emitters alone.

This chapter uses the nuclear masses and the valley of stability of [[particles/nuclear-structure]], tunnelling through a barrier from [[quantum-1/piecewise-potentials]], and Fermi's golden rule from [[quantum-2/time-dependent]]. Atomic masses are from AME2020 and half-lives from the NNDC/NUBASE evaluations; particle properties are from the Particle Data Group's *Review of Particle Physics* (2024). We use $1\,\mathrm{u} = 931.494\,\mathrm{MeV}/c^2$, $m_e c^2 = 0.511\,\mathrm{MeV}$ and $\hbar c = 197.327\,\mathrm{MeV\,fm}$.

## The decay law {#law}

Take a sample of $N$ identical unstable nuclei. Experiment shows, and quantum mechanics explains, that each nucleus has a fixed probability $\lambda\,\dd t$ of decaying in the next small interval $\dd t$, regardless of how long it has already existed and regardless of its neighbours. A nucleus does not age.

::: definition Decay constant, activity {#def-activity}
The **decay constant** $\lambda$ of a nuclide is the probability per unit time that a given nucleus decays. The **activity** of a sample is the expected number of decays per unit time, $\mathcal{A} = \lambda N$. The SI unit of activity is the **becquerel**, $1\,\mathrm{Bq} = 1\,\mathrm{s}^{-1}$; the older unit is the **curie**, $1\,\mathrm{Ci} = 3.7\times10^{10}\,\mathrm{Bq}$, roughly the activity of one gram of radium-226.
:::

::: theorem Exponential decay law {#thm-decay-law}
If each of $N_0$ nuclei present at $t = 0$ decays independently with constant probability per unit time $\lambda$, the expected number remaining at time $t$ is

$$
N(t) = N_0 e^{-\lambda t},
$$ {#eq-decay}

and the activity is $\mathcal{A}(t) = \lambda N_0 e^{-\lambda t}$. The **half-life**, the time in which $N$ halves, is $t_{1/2} = \ln 2/\lambda$, and the **mean life**, the average time a nucleus survives, is $\tau = 1/\lambda$.
:::

::: proof
In a time $\dd t$ the expected number of decays is $\lambda N\,\dd t$, so $\dd N = -\lambda N\,\dd t$. Separating variables, $\dd N/N = -\lambda\,\dd t$, and integrating from $0$ to $t$ gives $\ln(N/N_0) = -\lambda t$, which is [[#eq-decay]]. Setting $N = N_0/2$ gives $\lambda t_{1/2} = \ln 2$.

For the mean life, the probability that a single nucleus survives to $t$ is $P(t) = e^{-\lambda t}$, so the probability density of its decay time is $-\dd P/\dd t = \lambda e^{-\lambda t}$. The mean decay time is

$$
\tau = \int_0^\infty t\,\lambda e^{-\lambda t}\,\dd t = \Bigl[-t e^{-\lambda t}\Bigr]_0^\infty + \int_0^\infty e^{-\lambda t}\,\dd t = 0 + \frac{1}{\lambda},
$$

integrating by parts.
:::

The law is statistical. For a single nucleus it predicts only a probability; for a sample of $N$ nuclei the number of decays in a short counting interval fluctuates about its mean $\mu$ with the Poisson standard deviation $\sqrt{\mu}$. A count of $10\,000$ is uncertain by $1\%$, a count of $100$ by $10\%$.

The constancy of $\lambda$ is the physical content. It says the decay is a transition from a quasi-stationary state, whose probability leaks away at a constant rate, which is exactly what Fermi's golden rule and the tunnelling calculation below produce. It also means that $\lambda$ is a property of the nuclide, essentially independent of the environment. The exceptions are small: electron capture depends on the electron density at the nucleus, so the half-life of ${}^7\mathrm{Be}$ changes by a fraction of a percent between chemical compounds, and a fully ionised nucleus cannot decay by capture at all.

::: warning The half-life is not half of anything
After one half-life half the sample remains; after two half-lives a quarter, not none. The mean life $\tau = t_{1/2}/\ln 2 = 1.443\,t_{1/2}$ is longer than the half-life. Mixing $\tau$ and $t_{1/2}$ in the exponent is the commonest numerical error in this chapter: $N = N_0 e^{-t/\tau} = N_0\,2^{-t/t_{1/2}}$, and $N_0 e^{-t/t_{1/2}}$ is wrong.
:::

::: example The activity of radium {#ex-radium}
Find the activity of $1.000\,\mathrm{g}$ of ${}^{226}\mathrm{Ra}$, whose half-life is $1600\,\mathrm{yr}$ and whose molar mass is $226.03\,\mathrm{g/mol}$.
::: solution
The number of nuclei is

$$
N = \frac{1.000}{226.03}\times 6.022\times10^{23} = 2.664\times10^{21}.
$$

With $1\,\mathrm{yr} = 3.156\times10^7\,\mathrm{s}$, the decay constant is

$$
\lambda = \frac{\ln 2}{1600 \times 3.156\times10^7\,\mathrm{s}} = 1.373\times10^{-11}\,\mathrm{s}^{-1}.
$$

So $\mathcal{A} = \lambda N = 3.66\times10^{10}\,\mathrm{Bq} = 0.99\,\mathrm{Ci}$. The curie was defined in 1910 as the activity of one gram of radium; the modern half-life makes that $1\%$ smaller than the rounded definition $3.7\times10^{10}\,\mathrm{Bq}$ that was later adopted.
:::
:::

::: example Radiocarbon dating {#ex-carbon}
Cosmic rays keep the ratio ${}^{14}\mathrm{C}/{}^{12}\mathrm{C}$ in atmospheric carbon near $1.2\times10^{-12}$, and a living organism shares that ratio. After death no new ${}^{14}\mathrm{C}$ enters. Taking $t_{1/2} = 5700\,\mathrm{yr}$, find the activity per gram of carbon in living matter, and the age of a sample whose activity per gram is one quarter of that.
::: solution
One gram of carbon contains $6.022\times10^{23}/12.011 = 5.014\times10^{22}$ atoms, of which $1.2\times10^{-12}$ are ${}^{14}\mathrm{C}$, so $N = 6.02\times10^{10}$. The decay constant is $\ln 2/(5700 \times 3.156\times10^7\,\mathrm{s}) = 3.85\times10^{-12}\,\mathrm{s}^{-1}$, and

$$
\mathcal{A} = 3.85\times10^{-12} \times 6.02\times10^{10} = 0.23\,\mathrm{Bq},
$$

about 14 decays per minute per gram. A quarter of the initial activity means two half-lives have passed, so the age is $2 \times 5700 = 11\,400\,\mathrm{yr}$. In general $t = (t_{1/2}/\ln 2)\ln(\mathcal{A}_0/\mathcal{A})$. Real radiocarbon ages are corrected with calibration curves, because the atmospheric ratio has varied over time.
:::
:::

When a nuclide can decay in more than one way, each **branch** $i$ has its own decay constant $\lambda_i$, and the total is $\lambda = \sum_i \lambda_i$. The **branching ratio** of branch $i$ is $\lambda_i/\lambda$. The nuclide has one half-life, $\ln 2/\lambda$, whichever branch you watch: the branches compete for the same nuclei.

## Decay chains {#chains}

The daughter of a decay is often itself radioactive. Uranium-238 starts a chain of fourteen decays that ends at stable ${}^{206}\mathrm{Pb}$. The simplest chain has two members: a parent $1$ with decay constant $\lambda_1$ feeding a daughter $2$ with decay constant $\lambda_2$.

::: theorem Two-member chain (Bateman) {#thm-bateman}
If at $t = 0$ there are $N_1(0)$ parent nuclei and no daughter nuclei, and $\lambda_1 \neq \lambda_2$, then

$$
N_1(t) = N_1(0) e^{-\lambda_1 t}, \qquad N_2(t) = N_1(0)\,\frac{\lambda_1}{\lambda_2 - \lambda_1}\bigl(e^{-\lambda_1 t} - e^{-\lambda_2 t}\bigr).
$$ {#eq-bateman}
:::

::: proof
The parent obeys [[#eq-decay]]. The daughter is fed at the rate $\lambda_1 N_1$ and decays at the rate $\lambda_2 N_2$:

$$
\deriv{N_2}{t} + \lambda_2 N_2 = \lambda_1 N_1(0) e^{-\lambda_1 t}.
$$

Multiply by the integrating factor $e^{\lambda_2 t}$. The left side becomes $\deriv{}{t}\bigl(N_2 e^{\lambda_2 t}\bigr)$, so

$$
N_2 e^{\lambda_2 t} = \lambda_1 N_1(0)\int_0^t e^{(\lambda_2 - \lambda_1)t'}\,\dd t' = \frac{\lambda_1 N_1(0)}{\lambda_2 - \lambda_1}\bigl(e^{(\lambda_2-\lambda_1)t} - 1\bigr),
$$

using $N_2(0) = 0$. Multiplying by $e^{-\lambda_2 t}$ gives [[#eq-bateman]].
:::

Harry Bateman solved the general chain of $n$ members in 1910; the $n$th member is a sum of $n$ exponentials, one for each decay constant in the chain. Two limits of the two-member formula are worth knowing.

**Transient equilibrium**, $\lambda_2 > \lambda_1$ (daughter shorter-lived). After several daughter half-lives the $e^{-\lambda_2 t}$ term has died away and $N_2/N_1 \to \lambda_1/(\lambda_2 - \lambda_1)$. The activity ratio is then constant, $\mathcal{A}_2/\mathcal{A}_1 = \lambda_2/(\lambda_2 - \lambda_1) > 1$, and the daughter decays with the parent's half-life.

**Secular equilibrium**, $\lambda_2 \gg \lambda_1$. Then $\mathcal{A}_2 \to \mathcal{A}_1$: the daughter decays exactly as fast as it is made. In a chain whose first member is much longer-lived than all the others, every member reaches the same activity, and the numbers of atoms are in the ratio of the half-lives, $N_i/N_1 = t_{1/2,i}/t_{1/2,1}$. An undisturbed uranium ore is in secular equilibrium; that is how Marie and Pierre Curie could extract measurable radium from tonnes of pitchblende.

If instead $\lambda_2 < \lambda_1$ there is no equilibrium: the parent disappears first and the daughter is left decaying with its own half-life.

::: widget plot
f: exp(-0.693 x/a); (1/b)/(1/b - 1/a) (exp(-0.693 x/a) - exp(-0.693 x/b))
x: 0, 200
y: 0, 1.2
sliders: a=66:10:150:1; b=6:1:9:0.5
labels: parent activity; daughter activity
caption: Activities, as fractions of the parent's initial activity, against time in hours for a two-member chain; $a$ is the parent half-life and $b$ the daughter half-life, both in hours. The figure opens near the medical generator ${}^{99}\mathrm{Mo} \to {}^{99\mathrm{m}}\mathrm{Tc}$ ($66\,\mathrm{h}$ and $6\,\mathrm{h}$). The daughter activity rises, crosses the parent near $t \approx 23\,\mathrm{h}$, and then runs parallel to it, slightly above: transient equilibrium. Increase $a$ towards $150\,\mathrm{h}$ and watch the ratio approach 1, the secular limit. The crossing point is always the daughter's maximum.
:::

::: example A technetium generator {#ex-tc}
A hospital generator contains ${}^{99}\mathrm{Mo}$ ($t_{1/2} = 65.94\,\mathrm{h}$), which decays to ${}^{99\mathrm{m}}\mathrm{Tc}$ ($t_{1/2} = 6.007\,\mathrm{h}$), the most widely used isotope in diagnostic imaging. Starting from pure molybdenum, when is the technetium activity largest, and what is the activity ratio in transient equilibrium? (Ignore the $12\%$ of ${}^{99}\mathrm{Mo}$ decays that bypass the metastable state.)
::: solution
The daughter number is maximal when $\dd N_2/\dd t = 0$. Differentiating [[#eq-bateman]], this happens when $\lambda_1 e^{-\lambda_1 t} = \lambda_2 e^{-\lambda_2 t}$, that is

$$
t_\mathrm{max} = \frac{\ln(\lambda_2/\lambda_1)}{\lambda_2 - \lambda_1}.
$$

The decay constants are $\lambda_1 = \ln 2/65.94 = 0.010512\,\mathrm{h}^{-1}$ and $\lambda_2 = \ln 2/6.007 = 0.11539\,\mathrm{h}^{-1}$, so

$$
t_\mathrm{max} = \frac{\ln(10.977)}{0.10488\,\mathrm{h}^{-1}} = \frac{2.396}{0.10488}\,\mathrm{h} = 22.8\,\mathrm{h}.
$$

That is why such generators are "milked" about once a day. In transient equilibrium,

$$
\frac{\mathcal{A}_2}{\mathcal{A}_1} = \frac{\lambda_2}{\lambda_2 - \lambda_1} = \frac{0.11539}{0.10488} = 1.100.
$$

The daughter activity exceeds the parent's by $10\%$. That is not a violation of anything: the daughter atoms present at a given moment were made from a larger parent population in the recent past.
:::
:::

## Alpha decay {#alpha}

Alpha decay is the emission of a ${}^4\mathrm{He}$ nucleus,

$$
{}^{A}_{Z}\mathrm{X} \to {}^{A-4}_{Z-2}\mathrm{Y} + \alpha .
$$

It happens because, in heavy nuclei, the Coulomb term of the mass formula has made the parent heavier than the daughter plus an alpha particle, and the alpha particle is so tightly bound ($B = 28.3\,\mathrm{MeV}$) that it is the cheapest fragment to emit.

::: definition Q-value {#def-q}
The **Q-value** of a decay is the rest energy released: the initial rest energy minus the final rest energies. For alpha decay, with atomic masses,

$$
Q_\alpha = \bigl[m(\mathrm{X}) - m(\mathrm{Y}) - m({}^4\mathrm{He})\bigr]c^2 .
$$

A decay is possible only if $Q > 0$. The released energy appears as kinetic energy of the products.
:::

The electrons balance, $Z$ on the left and $(Z-2) + 2$ on the right. Because the daughter and the alpha particle fly apart with equal and opposite momenta $p$, and $K = p^2/2m$ for each,

$$
K_\alpha = \frac{m_Y}{m_Y + m_\alpha}\,Q \approx \frac{A-4}{A}\,Q ,
$$ {#eq-kalpha}

so the alpha particle carries about $98\%$ of the energy and has a single sharp energy. A spectrum with several lines means decays to several states of the daughter.

### Tunnelling through the Coulomb barrier

Here is the puzzle that George Gamow, and independently Ronald Gurney and Edward Condon, solved in 1928. The alpha particle from ${}^{238}\mathrm{U}$ has kinetic energy $4.2\,\mathrm{MeV}$. But the Coulomb potential energy of an alpha particle touching the thorium daughter, at $R \approx 9.3\,\mathrm{fm}$, is $2 \times 90 \times 1.44/9.3 = 28\,\mathrm{MeV}$. Classically the alpha particle can neither get in nor get out. Quantum mechanically it tunnels.

Model the alpha particle as a particle of reduced mass $\mu$ and energy $Q$ inside the nucleus, held in by the barrier $V(r) = zZ'e^2/(4\pi\varepsilon_0 r)$ for $r > R$, where $z = 2$ and $Z' = Z - 2$ is the daughter's charge. The barrier ends at the classical turning point $b$ where $V(b) = Q$:

$$
b = \frac{zZ'e^2}{4\pi\varepsilon_0 Q} = \frac{zZ'\,\alpha\hbar c}{Q}.
$$

::: theorem Gamow factor {#thm-gamow}
In the WKB approximation, the probability that an alpha particle of energy $Q$ incident on the barrier from inside is transmitted is $T \approx e^{-2G}$, with

$$
2G = \frac{2}{\hbar}\int_R^b \sqrt{2\mu\bigl(V(r) - Q\bigr)}\,\dd r = \frac{2\sqrt{2\mu c^2 Q}}{\hbar c}\,b\left[\arccos\sqrt{x} - \sqrt{x(1-x)}\right], \qquad x = \frac{R}{b}.
$$ {#eq-gamow}

For a thick barrier, $x \ll 1$, this becomes

$$
2G \approx 2\pi zZ'\alpha\sqrt{\frac{\mu c^2}{2Q}} - 4\sqrt{\frac{2 zZ'\alpha\,\mu c^2 R}{\hbar c}} .
$$ {#eq-gamow-thick}
:::

::: proof
The first equality is the WKB transmission factor for a barrier, from [[quantum-1/piecewise-potentials]]: under a barrier the wavefunction decays like $\exp\bigl(-\int\kappa\,\dd r\bigr)$ with $\hbar\kappa = \sqrt{2\mu(V - Q)}$, and the transmitted probability is the square of the amplitude ratio. With $V = Qb/r$,

$$
\sqrt{2\mu(V - Q)} = \sqrt{2\mu Q}\,\sqrt{\frac{b}{r} - 1}.
$$

Substitute $r = b\cos^2\theta$, so $\dd r = -2b\cos\theta\sin\theta\,\dd\theta$ and $\sqrt{b/r - 1} = \tan\theta$. The limit $r = b$ is $\theta = 0$, and $r = R$ is $\theta_0 = \arccos\sqrt{x}$. Then

$$
\int_R^b \sqrt{\frac{b}{r} - 1}\,\dd r = \int_0^{\theta_0} 2b\sin^2\theta\,\dd\theta = b\bigl(\theta_0 - \sin\theta_0\cos\theta_0\bigr) = b\left[\arccos\sqrt{x} - \sqrt{x}\sqrt{1-x}\right],
$$

since $\cos\theta_0 = \sqrt{x}$ and $\sin\theta_0 = \sqrt{1-x}$. Multiplying by $2\sqrt{2\mu Q}/\hbar$ gives [[#eq-gamow]].

For small $x$, $\arccos\sqrt{x} = \pi/2 - \sqrt{x} + O(x^{3/2})$ and $\sqrt{x(1-x)} = \sqrt{x} + O(x^{3/2})$, so the bracket is $\pi/2 - 2\sqrt{x}$. The first term gives $\pi b\sqrt{2\mu Q}/\hbar$, and inserting $b = zZ'\alpha\hbar c/Q$ gives $2\pi zZ'\alpha\sqrt{\mu c^2/2Q}$. The second gives $4\sqrt{xb^2\cdot 2\mu Q}/\hbar = 4\sqrt{2\mu Q R b}/\hbar$, and $Qb = zZ'\alpha\hbar c$ turns it into the second term of [[#eq-gamow-thick]].
:::

The decay rate is the transmission probability times the rate at which the alpha particle strikes the barrier from inside. If it moves with speed $v_\mathrm{in}$ across a diameter $2R$, the assault frequency is $f \approx v_\mathrm{in}/2R$ and

$$
\lambda \approx f\,e^{-2G}.
$$ {#eq-alpha-rate}

The crude classical frequency and the neglect of the probability that an alpha particle exists in the nucleus at all (the **preformation** factor) make this an order-of-magnitude estimate. But nearly all the variation from one nuclide to the next is in $e^{-2G}$, and the leading term of [[#eq-gamow-thick]] is proportional to $Z'/\sqrt{Q}$. Taking logarithms,

$$
\log_{10} t_{1/2} \approx a\,\frac{Z'}{\sqrt{Q}} + b ,
$$ {#eq-geiger-nuttall}

with $a$ and $b$ nearly constant across a range of nuclei. This is the **Geiger–Nuttall law**, found empirically by Hans Geiger and John Nuttall in 1911 as a linear relation between the logarithm of the decay constant and the logarithm of the alpha range, and explained by Gamow seventeen years later.

::: example Uranium-238 against polonium-212 {#ex-gamow}
${}^{238}\mathrm{U}$ decays to ${}^{234}\mathrm{Th}$ with $Q = 4.270\,\mathrm{MeV}$; ${}^{212}\mathrm{Po}$ decays to ${}^{208}\mathrm{Pb}$ with $Q = 8.954\,\mathrm{MeV}$. Estimate both half-lives from [[#eq-gamow]] and [[#eq-alpha-rate]], taking $R = 1.2(A_Y^{1/3} + 4^{1/3})\,\mathrm{fm}$ and an inside speed corresponding to kinetic energy $Q + 35\,\mathrm{MeV}$.
::: solution
For uranium, $R = 1.2(234^{1/3} + 4^{1/3}) = 1.2(6.162 + 1.587) = 9.30\,\mathrm{fm}$ and $b = 2 \times 90 \times 1.440/4.270 = 60.7\,\mathrm{fm}$, so $x = 0.153$. The reduced mass of $\alpha$ and ${}^{234}\mathrm{Th}$ is $\mu c^2 = 3665\,\mathrm{MeV}$, so $2\sqrt{2\mu c^2 Q}/\hbar c = 2\sqrt{2 \times 3665 \times 4.270}/197.33 = 1.793\,\mathrm{fm}^{-1}$. The bracket is $\arccos\sqrt{0.1532} - \sqrt{0.1532 \times 0.8468} = 1.1686 - 0.3602 = 0.8084$. Then

$$
2G = 1.793 \times 60.7 \times 0.8084 = 88.0, \qquad e^{-2G} = 6\times10^{-39}.
$$

Inside, $v_\mathrm{in}/c = \sqrt{2 \times 39.3/3727} = 0.145$, so $f = 0.145 \times 3.00\times10^{23}\,\mathrm{fm/s}/(2 \times 9.30\,\mathrm{fm}) = 2.3\times10^{21}\,\mathrm{s}^{-1}$. Thus $\lambda = 1.4\times10^{-17}\,\mathrm{s}^{-1}$ and $t_{1/2} = \ln 2/\lambda = 4.9\times10^{16}\,\mathrm{s} = 1.5\times10^9\,\mathrm{yr}$. The measured value is $4.47\times10^9\,\mathrm{yr}$.

For polonium, $R = 9.01\,\mathrm{fm}$, $b = 2 \times 82 \times 1.440/8.954 = 26.4\,\mathrm{fm}$, $x = 0.342$, bracket $0.472$, and $2\sqrt{2\mu c^2 Q}/\hbar c = 2.594\,\mathrm{fm}^{-1}$ with $\mu c^2 = 3657\,\mathrm{MeV}$. So $2G = 2.594 \times 26.4 \times 0.472 = 32.3$ and $e^{-2G} = 9.5\times10^{-15}$. With $f \approx 2.6\times10^{21}\,\mathrm{s}^{-1}$, $t_{1/2} = 3\times10^{-8}\,\mathrm{s}$, against the measured $2.9\times10^{-7}\,\mathrm{s}$.

Doubling $Q$ has changed the half-life by a factor of about $10^{24}$, and the simple model gets both ends within a factor of ten. The exponential sensitivity of the barrier, not the details of the nucleus, controls alpha lifetimes.
:::
:::

::: widget plot
f: log10(0.693/2.4e21) + 0.4343 (2 sqrt(7330 x)/197.33) (2.88 Z/x) (acos(sqrt(9.2 x/(2.88 Z))) - sqrt((9.2 x/(2.88 Z)) (1 - 9.2 x/(2.88 Z))))
x: 4, 9.5
y: -8, 20
sliders: Z=90:80:92:1
labels: log10 of the half-life in seconds
caption: The Gamow estimate of $\log_{10}(t_{1/2}/\mathrm{s})$ against $Q$ in MeV, for daughter charge $Z$ (slider), radius $9.2\,\mathrm{fm}$, reduced mass $3665\,\mathrm{MeV}/c^2$ and assault frequency $2.4\times10^{21}\,\mathrm{s}^{-1}$. Between $Q = 4$ and $9\,\mathrm{MeV}$ the half-life falls by about 25 powers of ten. Read the curve at $Q = 4.27$ for $Z = 90$ (uranium-238, measured $\log_{10} t_{1/2} = 17.1$). Then change $Z$ by a few units and see that the curve shifts much less than a change of $Q$ by $1\,\mathrm{MeV}$ does: the half-life is controlled by $Z/\sqrt{Q}$.
:::

::: quiz
Two alpha emitters have the same daughter charge. One has $Q = 5\,\mathrm{MeV}$, the other $Q = 6\,\mathrm{MeV}$. Which statement best describes their half-lives?
- [ ] They are nearly equal, because the barrier height is the same.
- [ ] The second is shorter by about a factor of $(6/5)^5 \approx 2.5$.
- [x] The second is shorter by many orders of magnitude.
- [ ] The second is longer, because a faster alpha particle spends less time trying to escape.
::: solution
The exponent $2G$ is roughly proportional to $Z'/\sqrt{Q}$ and is large, of order 50 to 90. A $20\%$ change in $Q$ changes $1/\sqrt{Q}$ by about $9\%$, which changes $2G$ by five to eight units and $e^{-2G}$ by a factor of $10^2$ to $10^4$ or more. A power law such as $Q^5$ belongs to beta decay, not alpha decay. A faster alpha particle has a thinner and lower effective barrier, so it escapes more easily, not less.
:::
:::

## Beta decay and the neutrino {#beta}

Beta decay changes a neutron into a proton or a proton into a neutron, leaving $A$ fixed. It is how a nucleus off the floor of the valley of stability moves towards it. There are three forms:

$$
\begin{aligned}
\beta^-:&\quad n \to p + e^- + \bar\nu_e, & {}^{A}_{Z}\mathrm{X} &\to {}^{A}_{Z+1}\mathrm{Y} + e^- + \bar\nu_e, \\
\beta^+:&\quad p \to n + e^+ + \nu_e, & {}^{A}_{Z}\mathrm{X} &\to {}^{A}_{Z-1}\mathrm{Y} + e^+ + \nu_e, \\
\text{EC}:&\quad p + e^- \to n + \nu_e, & {}^{A}_{Z}\mathrm{X} + e^- &\to {}^{A}_{Z-1}\mathrm{Y} + \nu_e .
\end{aligned}
$$

The free neutron decays by $\beta^-$ with mean life $878.4\,\mathrm{s}$ (PDG 2024), and the free proton cannot decay at all, because it is lighter than the neutron. Inside a nucleus the binding energies change the balance, so that $\beta^+$ and electron capture (EC) occur in proton-rich nuclei.

::: proposition Beta-decay Q-values in atomic masses {#prop-beta-q}
With atomic masses $m$ and neglecting electron binding energies,

$$
Q_{\beta^-} = \bigl[m(\mathrm{X}) - m(\mathrm{Y})\bigr]c^2, \qquad Q_{\mathrm{EC}} = \bigl[m(\mathrm{X}) - m(\mathrm{Y})\bigr]c^2, \qquad Q_{\beta^+} = \bigl[m(\mathrm{X}) - m(\mathrm{Y}) - 2m_e\bigr]c^2 .
$$
:::

::: proof
Write $M$ for nuclear masses, so $m(\mathrm{X}) = M(\mathrm{X}) + Z m_e$, and take the neutrino masses to be zero at this precision. For $\beta^-$, $Q = [M(\mathrm{X}) - M(\mathrm{Y}) - m_e]c^2 = [m(\mathrm{X}) - Zm_e - m(\mathrm{Y}) + (Z+1)m_e - m_e]c^2 = [m(\mathrm{X}) - m(\mathrm{Y})]c^2$. For $\beta^+$, $Q = [M(\mathrm{X}) - M(\mathrm{Y}) - m_e]c^2$ with $M(\mathrm{Y}) = m(\mathrm{Y}) - (Z-1)m_e$, giving $[m(\mathrm{X}) - m(\mathrm{Y}) - 2m_e]c^2$. For electron capture the atomic electron is on the left: $Q = [M(\mathrm{X}) + m_e - M(\mathrm{Y})]c^2 = [m(\mathrm{X}) - m(\mathrm{Y})]c^2$.
:::

So electron capture is possible whenever the daughter atom is lighter, but $\beta^+$ needs an extra $1.022\,\mathrm{MeV}$. A nucleus with $0 < Q_\mathrm{EC} < 1.022\,\mathrm{MeV}$ can decay only by capture.

::: example Copper-64 decays three ways {#ex-cu64}
The atomic masses of ${}^{64}\mathrm{Ni}$, ${}^{64}\mathrm{Cu}$ and ${}^{64}\mathrm{Zn}$ are $63.927967$, $63.929764$ and $63.929142\,\mathrm{u}$. Show that ${}^{64}\mathrm{Cu}$ can decay by $\beta^-$, $\beta^+$ and electron capture, and find each Q-value.
::: solution
${}^{64}\mathrm{Cu}$ ($Z = 29$) lies between ${}^{64}\mathrm{Ni}$ ($Z = 28$) and ${}^{64}\mathrm{Zn}$ ($Z = 30$). By [[#prop-beta-q]],

$$
\begin{aligned}
Q_{\beta^-}(\mathrm{Cu}\to\mathrm{Zn}) &= (63.929764 - 63.929142)(931.494) = 0.580\,\mathrm{MeV}, \\
Q_\mathrm{EC}(\mathrm{Cu}\to\mathrm{Ni}) &= (63.929764 - 63.927967)(931.494) = 1.674\,\mathrm{MeV}, \\
Q_{\beta^+}(\mathrm{Cu}\to\mathrm{Ni}) &= 1.674 - 1.022 = 0.652\,\mathrm{MeV}.
\end{aligned}
$$

All three are positive, so all three branches occur; the measured branching ratios are about $39\%$ $\beta^-$, $18\%$ $\beta^+$ and $44\%$ EC. This is the even-$A$ pattern of [[particles/nuclear-structure]]: ${}^{64}\mathrm{Cu}$ is odd–odd and sits on the upper of the two mass parabolas, above both even–even neighbours, and both of those neighbours are stable.
:::
:::

### The continuous spectrum and the neutrino

An alpha line is sharp. A beta spectrum is not: the electrons emerge with every kinetic energy from zero up to an endpoint equal to $Q$. James Chadwick showed this in 1914, and in 1927 Charles Ellis and William Wooster settled the question calorimetrically. They absorbed all the decay energy of ${}^{210}\mathrm{Bi}$ in a calorimeter and found a mean of about $0.34\,\mathrm{MeV}$ per decay, the mean of the electron spectrum, not its endpoint of $1.16\,\mathrm{MeV}$. Energy appeared not to be conserved. Angular momentum also seemed to fail: in $n \to p + e^-$ three spin-$\tfrac12$ particles cannot have a half-integer total on one side and an integer total on the other.

In a letter of 4 December 1930, Wolfgang Pauli proposed a desperate remedy: a third, neutral, very light spin-$\tfrac12$ particle emitted with the electron, which carries the missing energy and escapes detection. Enrico Fermi named it the neutrino and, in 1934, built a theory of beta decay on it, modelled on the emission of a photon by an atom. The antineutrino was detected directly by Clyde Cowan and Frederick Reines in 1956, through inverse beta decay $\bar\nu_e + p \to n + e^+$ in a large liquid-scintillator tank beside the Savannah River reactor. The cross-section is about $10^{-47}\,\mathrm{m}^2$, which is why that took a reactor's flux of $10^{17}$ antineutrinos per square metre per second.

### Fermi's theory and the shape of the spectrum

Fermi's golden rule, [[quantum-2/time-dependent]], gives the rate for a transition into a continuum of final states:

$$
\lambda = \frac{2\pi}{\hbar}\,\lvert M_{fi}\rvert^2\,\rho(E_f).
$$

Fermi assumed a point interaction of strength $G_F$. For **allowed** decays the electron and neutrino are created at the nucleus with no orbital angular momentum, and $M_{fi}$ is then independent of how the energy is shared. The shape of the spectrum is set entirely by the density of final states.

::: theorem Allowed beta spectrum {#thm-spectrum}
Neglect the nuclear recoil, the neutrino mass and the Coulomb interaction of the electron with the daughter nucleus. Then the number of electrons emitted with kinetic energy between $T$ and $T + \dd T$ is

$$
N(T)\,\dd T \propto p\,E\,(Q - T)^2\,\dd T ,
$$ {#eq-spectrum}

where $E = T + m_e c^2$ and $pc = \sqrt{T^2 + 2T m_e c^2}$ are the electron's total energy and momentum.
:::

::: proof
In a box of volume $V$ the number of momentum states in $\dd^3 p$ is $V\,\dd^3 p/(2\pi\hbar)^3$. The nucleus absorbs whatever momentum is needed and almost no energy, so the electron and neutrino momenta are independent and the number of final states with electron momentum in $[p, p + \dd p]$ and neutrino momentum in $[q, q + \dd q]$ is proportional to $p^2\,\dd p\,q^2\,\dd q$, after the angular integrals. Energy conservation fixes the neutrino energy, $qc = Q - T$, so at fixed $T$ the density of neutrino states per unit energy is proportional to $q^2\,\dd q/\dd E_\nu \propto (Q - T)^2$. Hence $N(p)\,\dd p \propto p^2 (Q - T)^2\,\dd p$. Finally $E^2 = p^2c^2 + m_e^2c^4$ gives $E\,\dd E = c^2 p\,\dd p$, and $\dd T = \dd E$, so $p^2\,\dd p = pE\,\dd T/c^2$, which is [[#eq-spectrum]].
:::

The spectrum vanishes at both ends: at $T = 0$ because there is no electron phase space, at $T = Q$ because there is no neutrino phase space. The Coulomb attraction of the daughter pulls electrons back and pushes positrons away, which is included through the **Fermi function** $F(Z', E)$ multiplying [[#eq-spectrum]]: $\beta^-$ spectra are enhanced at low energy, $\beta^+$ spectra suppressed.

Rewritten, [[#eq-spectrum]] says that $\sqrt{N(T)/(pEF)}$ is a straight line in $T$ meeting the axis at $T = Q$. This **Kurie plot** tests the theory, and a nonzero neutrino mass would bend its last few electronvolts. The KATRIN experiment, which studies the endpoint of tritium decay ($Q = 18.59\,\mathrm{keV}$), reported in 2024 the upper limit $m_\nu < 0.45\,\mathrm{eV}/c^2$ (90% confidence) for the effective electron-antineutrino mass.

::: widget plot
f: sqrt(x^2 + 1.022 x) (x + 0.511) (Q - x)^2 heaviside(Q - x)
x: 0, 3
sliders: Q=1:0.2:3:0.05
labels: N(T) without the Fermi function
caption: The allowed spectrum [[#eq-spectrum]], unnormalised, against electron kinetic energy $T$ in MeV for endpoint $Q$ (slider, in MeV). The curve opens at $Q = 1\,\mathrm{MeV}$. It rises from zero, peaks at roughly a third of $Q$, and falls to zero at the endpoint. Drag $Q$ from $0.2$ to $3\,\mathrm{MeV}$ and watch the area grow very fast, roughly like $Q^5$ at large $Q$: this is Sargent's rule, and it is why beta lifetimes depend so strongly on the energy available.
:::

Integrating the spectrum over $T$ gives the rate. For $Q \gg m_e c^2$, $p \approx E/c \approx T/c$ and $\int_0^Q T^2(Q - T)^2\,\dd T = Q^5/30$, so $\lambda \propto G_F^2\lvert M\rvert^2 Q^5$: **Sargent's rule**, observed by Bernard Sargent in 1933. Comparing nuclei, one removes the energy dependence by quoting the **$ft$ value**, the half-life times the integrated phase-space factor $f(Z', Q)$; $\log_{10} ft$ is about 3 to 4 for the fastest ("superallowed") decays and grows by several units for each step of "forbiddenness".

The selection rules follow from the angular momentum the leptons carry. In an allowed decay they carry no orbital angular momentum, so the nuclear parity does not change. If their spins couple to $S = 0$ (a **Fermi** transition), $\Delta J = 0$. If they couple to $S = 1$ (a **Gamow–Teller** transition), $\Delta J = 0, \pm 1$, but not $0 \to 0$. The neutron decay $\tfrac12^+ \to \tfrac12^+$ is a mixture of both. Decays that require the leptons to carry orbital angular momentum $\ell$ are **forbidden** and slower, roughly by a factor $(pR/\hbar)^{2\ell}$ each; their parity change is $(-1)^\ell$. That the weak interaction also violates parity, in the Wu experiment of 1957, is the story of [[particles/symmetries]].

## Gamma decay {#gamma}

After alpha or beta decay, the daughter is often left in an excited state. It drops to lower states by emitting photons with energies from keV to a few MeV, the nuclear analogue of atomic spectral lines, with one important difference: the nucleus is so small compared with the photon wavelength that only the lowest multipoles matter, and the rate falls steeply with each step in multipole order.

The photon energy is the level spacing less a tiny recoil. Momentum conservation gives the nucleus momentum $E_\gamma/c$ and kinetic energy

$$
E_R = \frac{E_\gamma^2}{2Mc^2},
$$

about $16\,\mathrm{eV}$ for the $1.333\,\mathrm{MeV}$ gamma of ${}^{60}\mathrm{Ni}$. That is negligible for spectroscopy but much larger than the natural width of the level, which is why resonant absorption of gamma rays normally fails, and why Rudolf Mössbauer's recoil-free absorption in crystals (1958) was a discovery.

::: definition Multipole radiation and its selection rules {#def-multipole}
A photon emitted in a transition $J_i \to J_f$ carries integer angular momentum $L \geq 1$ with $\lvert J_i - J_f\rvert \le L \le J_i + J_f$. It is **electric** ($EL$) if the parity changes by $(-1)^L$ and **magnetic** ($ML$) if it changes by $(-1)^{L+1}$. Thus $E1$ changes parity, $M1$ and $E2$ do not, $M2$ and $E3$ do. A $0 \to 0$ transition cannot emit a single photon.
:::

The lowest allowed multipole usually dominates. Victor Weisskopf's single-particle estimates (1951), as tabulated by Krane, give for photon energy $E$ in MeV:

| multipole | $\lambda$ ($\mathrm{s}^{-1}$) |
|---|---|
| $E1$ | $1.0\times10^{14} A^{2/3} E^3$ |
| $M1$ | $5.6\times10^{13} E^3$ |
| $E2$ | $7.3\times10^{7} A^{4/3} E^5$ |
| $M2$ | $5.6\times10^{7} A^{2/3} E^5$ |
| $E3$ | $34\, A^2 E^7$ |

At $1\,\mathrm{MeV}$ in a medium nucleus each unit of $L$ costs a factor of about $10^5$. A level that can decay only by a high multipole at low energy can therefore live for seconds, hours or years: an **isomer**. The metastable ${}^{99\mathrm{m}}\mathrm{Tc}$ of [[#ex-tc]], with $t_{1/2} = 6\,\mathrm{h}$, is one; it is useful in medicine precisely because it emits a $140.5\,\mathrm{keV}$ photon, easy to image, and nothing else of consequence.

A nucleus can also give its excitation energy directly to an atomic electron, which is ejected with energy $E - B_e$, where $B_e$ is its atomic binding energy. This **internal conversion** competes with gamma emission and dominates for heavy nuclei, low energies and high multipoles; it is the only way a $0^+ \to 0^+$ transition can proceed by one step (unless the energy exceeds $2m_ec^2$, when an electron–positron pair can be emitted).

::: example Cobalt-60 {#ex-co60}
${}^{60}\mathrm{Co}$ ($5^+$, $t_{1/2} = 5.27\,\mathrm{yr}$) beta-decays almost entirely to the $4^+$ state of ${}^{60}\mathrm{Ni}$ at $2.506\,\mathrm{MeV}$, which emits a $1.173\,\mathrm{MeV}$ photon to the $2^+$ state at $1.333\,\mathrm{MeV}$, which emits a $1.333\,\mathrm{MeV}$ photon to the $0^+$ ground state. The atomic masses are $59.933816\,\mathrm{u}$ (Co) and $59.930786\,\mathrm{u}$ (Ni). Find the beta endpoint energy, classify the beta decay and the two gamma transitions, and estimate the lifetime of the $2^+$ level.
::: solution
By [[#prop-beta-q]], $Q_{\beta^-} = (59.933816 - 59.930786)(931.494) = 2.823\,\mathrm{MeV}$ to the ground state. The decay goes to the level at $2.506\,\mathrm{MeV}$, so the endpoint is $2.823 - 2.506 = 0.317\,\mathrm{MeV}$, as measured.

The beta transition $5^+ \to 4^+$ has $\Delta J = 1$ and no parity change: allowed Gamow–Teller. A direct decay to the $2^+$ or $0^+$ state would need $\Delta J = 3$ or $5$ and is strongly forbidden, which is why the high level is fed.

Both gamma transitions, $4^+ \to 2^+$ and $2^+ \to 0^+$, need $L \ge 2$ with no parity change: they are $E2$. With $A = 60$ and $E = 1.333\,\mathrm{MeV}$, the Weisskopf estimate is

$$
\lambda(E2) = 7.3\times10^7 \times 60^{4/3} \times 1.333^5\,\mathrm{s}^{-1} = 7.3\times10^7 \times 235 \times 4.21 = 7.2\times10^{10}\,\mathrm{s}^{-1},
$$

a mean life of about $1.4\times10^{-11}\,\mathrm{s}$. The measured mean life of this level is about $1\,\mathrm{ps}$, more than ten times shorter: $E2$ transitions between collective states of deformable nuclei are enhanced over the single-particle estimate, a sign of the collective motion mentioned in [[particles/nuclear-structure]]. The two photons are emitted within picoseconds of each other, which is why ${}^{60}\mathrm{Co}$ is a standard calibration source with two lines.
:::
:::

::: quiz
A $2^-$ excited state decays to a $0^+$ ground state by a single photon. Which multipole is lowest-order allowed?
- [ ] $E1$
- [ ] $M1$
- [x] $M2$
- [ ] $E2$
::: solution
The photon must carry $L \ge \lvert 2 - 0\rvert = 2$ and $L \le 2$, so $L = 2$ exactly. The parity changes, from $-$ to $+$. For $L = 2$, an electric transition changes parity by $(-1)^2 = +1$, i.e. not at all, so $E2$ is excluded; a magnetic one changes it by $(-1)^3 = -1$. The transition is $M2$. $E1$ and $M1$ cannot carry two units of angular momentum.
:::
:::

::: history How radioactivity was understood
Henri Becquerel discovered the radiation of uranium in February–March 1896. Marie and Pierre Curie isolated polonium and radium from pitchblende in 1898, and Marie Curie coined the word *radioactivity*. Ernest Rutherford distinguished alpha and beta rays in 1899, and Paul Villard found the gamma rays in 1900. In 1902–03 Rutherford and Frederick Soddy showed that radioactivity is the transmutation of one element into another, with an exponential law; in 1908–09 Rutherford and Thomas Royds proved that alpha particles are helium nuclei by collecting them in an evacuated tube and observing the helium spectrum. Gamow, Gurney and Condon explained alpha decay as tunnelling in 1928, Pauli proposed the neutrino in 1930, Fermi published his theory of beta decay in 1934, and the same year Irène Curie and Frédéric Joliot made the first artificial radioactive isotopes, including the first positron emitters. Cowan and Reines detected the reactor antineutrino in 1956.
:::

## Where this leads {#leads}

Reactions, [[particles/reactions]], use the same Q-value bookkeeping, now with a projectile; the Coulomb barrier that traps the alpha particle is the same barrier that makes fusion in the Sun slow. The weak interaction behind beta decay, with its point-like coupling $G_F$, is revealed in [[particles/standard-model]] as the exchange of a heavy $W$ boson, and its violation of parity is in [[particles/symmetries]]. The detectors that measure these radiations are in [[particles/accelerators]]. For the uses of decay in chemistry, dating and medicine, see the Chemistry Atlas lesson [Nuclear chemistry](/learn/chemistry/lesson.php?c=general-chemistry-2&l=nuclear-chemistry).

::: summary
- Each nucleus decays with a constant probability per unit time $\lambda$, so $N = N_0 e^{-\lambda t}$, $t_{1/2} = \ln 2/\lambda$, $\tau = 1/\lambda$, and activity $\mathcal{A} = \lambda N$ in becquerels.
- In a chain, the daughter obeys $\dot N_2 = \lambda_1 N_1 - \lambda_2 N_2$. A long-lived parent gives secular equilibrium, $\mathcal{A}_2 = \mathcal{A}_1$; a shorter-lived but not negligible parent gives transient equilibrium, $\mathcal{A}_2/\mathcal{A}_1 = \lambda_2/(\lambda_2 - \lambda_1)$.
- Alpha decay is tunnelling through the Coulomb barrier. The Gamow factor $e^{-2G}$, with $2G$ roughly proportional to $Z'/\sqrt{Q}$, explains the Geiger–Nuttall law and lifetimes spanning more than 20 orders of magnitude.
- In atomic masses, $Q_{\beta^-} = Q_\mathrm{EC} = [m(\mathrm{X}) - m(\mathrm{Y})]c^2$ and $Q_{\beta^+}$ is smaller by $2m_ec^2$.
- The continuous beta spectrum required the neutrino (Pauli 1930, Fermi 1934, detected 1956). Phase space gives $N(T) \propto pE(Q - T)^2$, and the rate grows roughly like $Q^5$.
- Allowed beta decays have no parity change; Fermi transitions have $\Delta J = 0$, Gamow–Teller $\Delta J = 0, \pm1$ (not $0 \to 0$).
- Gamma transitions carry $L \ge 1$; $EL$ changes parity by $(-1)^L$, $ML$ by $(-1)^{L+1}$. Each extra unit of $L$ slows the rate enormously, producing isomers; internal conversion competes.
:::

## Exercises {#exercises}

::: exercise A half-life from two counts {level=1 check="8"}
The activity of a sample falls from $800\,\mathrm{Bq}$ to $100\,\mathrm{Bq}$ in $24.0\,\mathrm{h}$. Find its half-life in hours.
::: solution
The activity fell by a factor $8 = 2^3$, so three half-lives passed in $24.0\,\mathrm{h}$ and $t_{1/2} = 8.0\,\mathrm{h}$. Formally, $\lambda = \ln(800/100)/24.0\,\mathrm{h} = 0.0866\,\mathrm{h}^{-1}$ and $t_{1/2} = \ln 2/\lambda = 8.00\,\mathrm{h}$.
:::
:::

::: exercise The activity of a microgram of cobalt-60 {level=1 check="4.19e7"}
Find the activity, in becquerels, of $1.00\,\mu\mathrm{g}$ of ${}^{60}\mathrm{Co}$ ($t_{1/2} = 5.271\,\mathrm{yr}$, molar mass $59.93\,\mathrm{g/mol}$, $1\,\mathrm{yr} = 3.156\times10^7\,\mathrm{s}$).
::: solution
$N = (1.00\times10^{-6}/59.93) \times 6.022\times10^{23} = 1.005\times10^{16}$. $\lambda = \ln 2/(5.271 \times 3.156\times10^7\,\mathrm{s}) = 4.167\times10^{-9}\,\mathrm{s}^{-1}$. So $\mathcal{A} = 4.19\times10^7\,\mathrm{Bq}$, about $1.1\,\mathrm{mCi}$. A microgram, invisible to the eye, is a strong laboratory source.
:::
:::

::: exercise The alpha energy of radium {level=1 check="4.78"}
The atomic masses of ${}^{226}\mathrm{Ra}$, ${}^{222}\mathrm{Rn}$ and ${}^{4}\mathrm{He}$ are $226.025410$, $222.017578$ and $4.002603\,\mathrm{u}$. Find $Q_\alpha$ and then the kinetic energy of the alpha particle, in MeV, for a decay to the ground state of radon.
::: solution
$Q = (226.025410 - 222.017578 - 4.002603)(931.494) = 0.005229 \times 931.494 = 4.871\,\mathrm{MeV}$. By [[#eq-kalpha]], $K_\alpha = Q \times 222.02/(222.02 + 4.00) = 4.871 \times 0.9823 = 4.78\,\mathrm{MeV}$. The radon recoils with the remaining $0.086\,\mathrm{MeV}$; recoils of this size can knock the daughter atom out of a solid surface.
:::
:::

::: exercise A wooden bowl {level=2 check="4200"}
Carbon from an ancient wooden bowl has a ${}^{14}\mathrm{C}$ activity per gram that is $0.600$ times that of living wood. Taking $t_{1/2} = 5700\,\mathrm{yr}$ and a constant atmospheric ratio, how old is the bowl, in years (to two significant figures)?
::: solution
$t = (t_{1/2}/\ln 2)\ln(\mathcal{A}_0/\mathcal{A}) = (5700/0.6931)\ln(1/0.600) = 8224 \times 0.5108 = 4201\,\mathrm{yr}$, about $4200\,\mathrm{yr}$. A $1\%$ error in the measured ratio shifts the age by about $80\,\mathrm{yr}$, which is why radiocarbon labs count for a long time.
:::
:::

::: exercise Radium in uranium ore {level=2 check="0.34"}
${}^{226}\mathrm{Ra}$ ($t_{1/2} = 1600\,\mathrm{yr}$) is a member of the ${}^{238}\mathrm{U}$ series ($t_{1/2} = 4.468\times10^9\,\mathrm{yr}$). In an old, undisturbed ore, how many grams of radium accompany one tonne ($10^6\,\mathrm{g}$) of ${}^{238}\mathrm{U}$?
::: solution
The ore is in secular equilibrium, so every member has the same activity, $\lambda_\mathrm{Ra}N_\mathrm{Ra} = \lambda_\mathrm{U}N_\mathrm{U}$, and $N_\mathrm{Ra}/N_\mathrm{U} = t_{1/2,\mathrm{Ra}}/t_{1/2,\mathrm{U}} = 1600/4.468\times10^9 = 3.581\times10^{-7}$. Converting numbers of atoms to masses with the molar masses,

$$
m_\mathrm{Ra} = 10^6\,\mathrm{g} \times 3.581\times10^{-7} \times \frac{226.03}{238.05} = 0.34\,\mathrm{g}.
$$

A third of a gram per tonne: the Curies processed several tonnes of pitchblende residue to obtain a tenth of a gram of radium chloride.
:::
:::

::: exercise Positron endpoint of sodium-22 {level=2 check="1.821"}
${}^{22}\mathrm{Na}$ (atomic mass $21.994437\,\mathrm{u}$) decays to ${}^{22}\mathrm{Ne}$ ($21.991385\,\mathrm{u}$), mostly to an excited state at $1.275\,\mathrm{MeV}$. Find $Q_\mathrm{EC}$ and $Q_{\beta^+}$ to the ground state, in MeV, and the positron endpoint for the branch to the excited state.
::: solution
$Q_\mathrm{EC} = (21.994437 - 21.991385)(931.494) = 0.003052 \times 931.494 = 2.843\,\mathrm{MeV}$. By [[#prop-beta-q]], $Q_{\beta^+} = 2.843 - 1.022 = 1.821\,\mathrm{MeV}$ to the ground state. To the excited state the endpoint is $1.821 - 1.275 = 0.546\,\mathrm{MeV}$, the value measured for the main positron branch. The answer requested by the check is the ground-state $Q_{\beta^+} = 1.821\,\mathrm{MeV}$.
:::
:::

::: exercise A partial half-life {level=2 check="33.0"}
${}^{64}\mathrm{Cu}$ has $t_{1/2} = 12.70\,\mathrm{h}$ and decays by $\beta^-$ in $38.5\%$ of decays. What would its half-life be, in hours, if $\beta^-$ were the only branch?
::: solution
The $\beta^-$ partial decay constant is $\lambda_{\beta^-} = 0.385\lambda$, so the partial half-life is $t_{1/2}/0.385 = 12.70/0.385 = 33.0\,\mathrm{h}$. It is not the half-life you would observe by watching only the electrons: those die away with the full $12.70\,\mathrm{h}$, because all branches drain the same nuclei.
:::
:::

::: exercise Recoil-free gamma rays {level=2 check="1.96e-3"}
The first excited state of ${}^{57}\mathrm{Fe}$ decays with a $14.413\,\mathrm{keV}$ photon; the atomic mass is $56.935\,\mathrm{u}$. Find the recoil energy of a free iron nucleus, in eV, and compare it with the natural width $\Gamma = \hbar/\tau$ of the level, whose mean life is $141\,\mathrm{ns}$.
::: solution
$E_R = E_\gamma^2/2Mc^2 = (0.014413\,\mathrm{MeV})^2/(2 \times 56.935 \times 931.494\,\mathrm{MeV}) = 1.96\times10^{-9}\,\mathrm{MeV} = 1.96\times10^{-3}\,\mathrm{eV}$. The width is $\Gamma = 6.582\times10^{-16}\,\mathrm{eV\,s}/1.41\times10^{-7}\,\mathrm{s} = 4.7\times10^{-9}\,\mathrm{eV}$. The recoil shifts the line by about $4\times10^5$ widths, so a free nucleus cannot reabsorb it; in a crystal the whole lattice recoils and the shift disappears (the Mössbauer effect).
:::
:::

::: exercise The daughter maximum {level=3}
For the two-member chain of [[#thm-bateman]] with $\lambda_1 \neq \lambda_2$, prove that $N_2$ has exactly one maximum, at $t_\mathrm{max} = \ln(\lambda_2/\lambda_1)/(\lambda_2 - \lambda_1)$, and that at that instant the parent and daughter activities are equal. Show also that $t_\mathrm{max}$ is unchanged if $\lambda_1$ and $\lambda_2$ are exchanged.
::: hint
Differentiate the daughter equation itself rather than the solution: what does $\dd N_2/\dd t = 0$ say about $\lambda_1 N_1$ and $\lambda_2 N_2$?
:::
::: solution
From the rate equation, $\dd N_2/\dd t = \lambda_1 N_1 - \lambda_2 N_2 = \mathcal{A}_1 - \mathcal{A}_2$. So at any stationary point of $N_2$ the two activities are equal, which proves the second claim.

From [[#eq-bateman]], $\dd N_2/\dd t = N_1(0)\lambda_1(\lambda_2 e^{-\lambda_2 t} - \lambda_1 e^{-\lambda_1 t})/(\lambda_2 - \lambda_1)$. This vanishes exactly when $e^{(\lambda_2 - \lambda_1)t} = \lambda_2/\lambda_1$, which has exactly one solution, $t_\mathrm{max} = \ln(\lambda_2/\lambda_1)/(\lambda_2 - \lambda_1)$, and it is positive whichever $\lambda$ is larger, since numerator and denominator have the same sign. $N_2$ starts at $0$, is positive for $t > 0$ and tends to $0$ as $t \to \infty$, so this single stationary point is a maximum.

Exchanging $\lambda_1 \leftrightarrow \lambda_2$ changes the sign of both $\ln(\lambda_2/\lambda_1)$ and $\lambda_2 - \lambda_1$, so $t_\mathrm{max}$ is unchanged. A long-lived parent feeding a short-lived daughter and a short-lived parent feeding a long-lived daughter peak at the same time, though at very different heights.
:::
:::

::: exercise Sargent's rule {level=3}
(a) In the limit $Q \gg m_e c^2$, show from [[#eq-spectrum]] (without the Fermi function) that the total decay rate is proportional to $Q^5$. (b) Show that in the same limit the mean electron kinetic energy is $Q/2$, and explain why the mean measured by Ellis and Wooster for ${}^{210}\mathrm{Bi}$ was much less than half the endpoint.
::: hint
For $T \gg m_ec^2$, $p \approx T/c$ and $E \approx T$. Use $\int_0^1 u^m(1-u)^n\,\dd u = m!\,n!/(m+n+1)!$.
:::
::: solution
(a) With $pE \approx T^2/c$, the rate is proportional to $\int_0^Q T^2(Q - T)^2\,\dd T$. Substituting $T = Qu$ gives $Q^5\int_0^1 u^2(1-u)^2\,\dd u = Q^5 \cdot 2!\,2!/5! = Q^5/30$. All other factors are independent of $Q$, so $\lambda \propto Q^5$.

(b) The mean is $\langle T\rangle = \int T^3(Q-T)^2\,\dd T/\int T^2(Q-T)^2\,\dd T = Q\,(3!\,2!/6!)/(2!\,2!/5!) = Q\,(1/60)/(1/30) = Q/2$, by the symmetry $u \leftrightarrow 1 - u$ of $u^2(1-u)^2$ in the denominator. For ${}^{210}\mathrm{Bi}$, $Q = 1.16\,\mathrm{MeV}$ is only about twice $m_ec^2$, so the approximation fails. The exact factor $pEc = \sqrt{T^2 + 2Tm_ec^2}\,(T + m_ec^2)$ exceeds $T^2$ by a ratio that grows without bound as $T \to 0$, so it gives the low-energy part of the spectrum more weight than the $T^2$ approximation does. Two further effects push the same way: the Fermi function for $Z' = 84$ strongly enhances slow electrons, and the decay is first-forbidden, with a spectrum shape that also favours low energies. Together they lower the mean to the observed $0.34\,\mathrm{MeV}$, about $0.29Q$.
:::
:::
