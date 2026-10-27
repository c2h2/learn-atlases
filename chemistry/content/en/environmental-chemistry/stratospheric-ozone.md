Between about $15$ and $35\ \mathrm{km}$ above your head lies a layer of gas that, if it were brought down to the surface at $0\ \mathrm{°C}$ and $1\ \mathrm{atm}$, would be only about three millimetres thick. It is the ozone layer, and it is the reason life on land is possible: ozone absorbs essentially all solar ultraviolet below $290\ \mathrm{nm}$, radiation energetic enough to break the bonds of DNA and proteins. It also heats the stratosphere, creating the temperature inversion that separates it from the weather below. In 1985 a team from the British Antarctic Survey reported that every Antarctic spring since the late 1970s a third or more of the ozone column over their station had disappeared, and within three years laboratory kinetics, aircraft measurements and atmospheric models had traced the loss to chlorine and bromine released from industrial chlorofluorocarbons and halons. This chapter is the story of how a few parts per billion of chlorine can destroy parts per million of ozone — a lesson in photochemistry ([[kinetics/photochemistry]]), in chain reactions ([[kinetics/chain-reactions]]) and in the surprising power of heterogeneous chemistry on cloud particles — and of the international response, the Montreal Protocol of 1987.

## Ozone and ultraviolet light

Solar radiation reaching the top of the atmosphere includes ultraviolet light, conventionally divided into **UVC** ($100$–$280\ \mathrm{nm}$), **UVB** ($280$–$315\ \mathrm{nm}$) and **UVA** ($315$–$400\ \mathrm{nm}$). Molecular oxygen absorbs strongly below about $200\ \mathrm{nm}$ (the Schumann–Runge bands and continuum) and weakly down to $242\ \mathrm{nm}$ (the Herzberg continuum). Between $200$ and $300\ \mathrm{nm}$ only ozone stands in the way, through its **Hartley band**, one of the strongest absorptions of any atmospheric gas, with an absorption cross section peaking near $1.1\times10^{-17}\ \mathrm{cm^2}$ at $255\ \mathrm{nm}$ and falling by about a factor of ten for every $15$–$20\ \mathrm{nm}$ on the long-wavelength side (the **Huggins bands**, $310$–$360\ \mathrm{nm}$). The UVB band is therefore the "edge" where ozone stops being opaque, and it is the band most sensitive to changes in ozone.

::: definition Column abundance and the Dobson unit {#def-dobson}
The **total column** of ozone is the number of ozone molecules above unit area of the surface, $N = \int_0^\infty n_{\mathrm{O_3}}(z)\,\mathrm{d}z$. It is reported in **Dobson units**: $1\ \mathrm{DU}$ is the column that would form a layer $10\ \mathrm{\mu m}$ thick of pure ozone at $273.15\ \mathrm{K}$ and $1\ \mathrm{atm}$, equal to
$$
1\ \mathrm{DU} = 2.687\times10^{16}\ \text{molecules}\ \mathrm{cm^{-2}}
$$
(the Loschmidt number $2.687\times10^{19}\ \mathrm{cm^{-3}}$ times $10^{-3}\ \mathrm{cm}$). The global mean total column is about $300\ \mathrm{DU}$, ranging from about $250\ \mathrm{DU}$ in the tropics to over $400\ \mathrm{DU}$ at high latitudes in spring. The **ozone hole** is conventionally the area where the column is below $220\ \mathrm{DU}$, a value rarely observed before 1979.
:::

::: proposition UV transmission through the ozone column {#prop-transmission}
For a beam of wavelength $\lambda$ passing vertically through an ozone column $N$ (molecules $\mathrm{cm^{-2}}$), with absorption cross section $\sigma(\lambda)$ ($\mathrm{cm^2}$) and neglecting scattering and other absorbers, the transmitted fraction is
$$
T(\lambda) = \exp\!\left[-\sigma(\lambda)N\right],
$$
the Beer–Lambert law in molecular form (base $e$, since $\sigma$ is a natural-log cross section). For a slant path at solar zenith angle $\theta$ the column is multiplied by $\sec\theta$. The **optical depth** $\tau = \sigma N$ is what matters: a fractional change $\delta N/N$ changes the transmitted UV by the factor $\exp(-\sigma\,\delta N)$, so the relative increase in UV for a small ozone loss is approximately $\tau\,\lvert\delta N\rvert/N$ — largest at wavelengths where $\tau$ is a few units.
:::

::: proof From absorption cross section to transmission {#proof-transmission}
In a thin layer $\mathrm{d}z$ containing $n\,\mathrm{d}z$ absorbers per unit area, each blocking an effective area $\sigma$, the fraction of photons removed is $\sigma n\,\mathrm{d}z$, so $\mathrm{d}I = -\sigma n I\,\mathrm{d}z$. Integrating through the whole column at constant $\sigma$ (temperature dependence ignored) gives $\ln(I/I_0) = -\sigma\int n\,\mathrm{d}z = -\sigma N$. For a small change $\delta N$, $T(N + \delta N)/T(N) = e^{-\sigma\,\delta N} \approx 1 - \sigma\,\delta N$; writing $\sigma\,\delta N = \tau\,\delta N/N$ gives the stated sensitivity. Comparing with the laboratory form $A = \varepsilon c\ell$ of [[kinetics/photochemistry]]: $\varepsilon = \sigma N_\mathrm{A}/(1000\ln10)$ with $\sigma$ in $\mathrm{cm^2}$.
:::

::: example How opaque is the ozone layer? {#ex-opacity}
Take a vertical column of $300\ \mathrm{DU}$. Estimate the transmission at $255\ \mathrm{nm}$ ($\sigma = 1.1\times10^{-17}\ \mathrm{cm^2}$) and at $300\ \mathrm{nm}$ ($\sigma \approx 3.9\times10^{-19}\ \mathrm{cm^2}$), and the percentage increase in $300\ \mathrm{nm}$ radiation if the column falls by $10\ \%$.
::: solution
The column is $N = 300\times2.687\times10^{16} = 8.06\times10^{18}\ \mathrm{cm^{-2}}$. At $255\ \mathrm{nm}$: $\tau = 1.1\times10^{-17}\times8.06\times10^{18} = 89$, so $T = e^{-89} \approx 3\times10^{-39}$ — nothing gets through. At $300\ \mathrm{nm}$: $\tau = 3.9\times10^{-19}\times8.06\times10^{18} = 3.1$ and $T = e^{-3.1} = 0.043$, about $4\ \%$. With $N$ reduced to $270\ \mathrm{DU}$, $\tau = 2.83$ and $T = 0.059$: the ratio is $e^{0.31} = 1.37$, a **$37\ \%$ increase** in UV at $300\ \mathrm{nm}$ for a $10\ \%$ ozone loss. The amplification factor $\approx\tau = 3.1$ is exactly the prediction of [[#prop-transmission]]. At $320\ \mathrm{nm}$, where $\tau$ is well below one, the same ozone loss changes the UV by only a few per cent. That is why the biologically damaging part of the spectrum — UVB, weighted towards short wavelengths — is so sensitive to ozone, while UVA is hardly affected.
:::
:::

::: widget plot
f: exp(-s*x*0.02687); exp(-s2*x*0.02687)
x: 100, 500
y: 0, 0.2
sliders: s=3.9:0.5:10:0.1; s2=1.1:0.2:5:0.1
labels: T(\lambda_1); T(\lambda_2)
caption: Transmitted fraction of vertical UV against the total ozone column in Dobson units, $T = \exp(-\sigma N)$, for two wavelengths whose cross sections you set in units of $10^{-19}\ \mathrm{cm^2}$ (start: $3.9$ near $300\ \mathrm{nm}$, $1.1$ near $315\ \mathrm{nm}$). Drag the column from $300$ down to the $100$–$150\ \mathrm{DU}$ of a deep Antarctic ozone hole and compare the relative change of the two curves: the more strongly absorbed wavelength responds far more, proportionally, to the same ozone loss.
:::

## The Chapman mechanism

In 1930 Sydney Chapman proposed that the ozone layer is made and destroyed by four reactions involving only oxygen:
$$
\begin{aligned}
&(1)\quad \mathrm{O_2} + h\nu\ (\lambda < 242\ \mathrm{nm}) \rightarrow \mathrm{O} + \mathrm{O} && J_1\\
&(2)\quad \mathrm{O} + \mathrm{O_2} + \mathrm{M} \rightarrow \mathrm{O_3} + \mathrm{M} && k_2\\
&(3)\quad \mathrm{O_3} + h\nu\ (\lambda < 1180\ \mathrm{nm}) \rightarrow \mathrm{O_2} + \mathrm{O} && J_3\\
&(4)\quad \mathrm{O} + \mathrm{O_3} \rightarrow 2\,\mathrm{O_2} && k_4
\end{aligned}
$$
Here $\mathrm{M}$ is any third body ($\mathrm{N_2}$ or $\mathrm{O_2}$) that removes the excess energy of the newly formed ozone, and the $J$ values are first-order photolysis rate coefficients ($\mathrm{s^{-1}}$) — the products of absorption cross section, quantum yield and actinic flux integrated over wavelength. Reaction (1) needs the photon energy to exceed the $\mathrm{O{=}O}$ bond energy, $498\ \mathrm{kJ\,mol^{-1}}$, which corresponds to $240\ \mathrm{nm}$ (see [[#ex-thresholds]]); reaction (3) needs only about $100\ \mathrm{kJ\,mol^{-1}}$ to give ground-state $\mathrm{O(^3P)}$, but below about $320\ \mathrm{nm}$ it produces the excited atom $\mathrm{O(^1D)}$, which matters enormously in the troposphere ([[environmental-chemistry/tropospheric-chemistry]]).

Reactions (2) and (3) are very fast and simply shuttle oxygen atoms between $\mathrm{O}$ and $\mathrm{O_3}$. It is therefore natural to define **odd oxygen**, $\mathrm{O_x} = \mathrm{O} + \mathrm{O_3}$: reaction (1) creates two odd oxygens, reaction (4) destroys two, and (2) and (3) only interconvert them. Since in the stratosphere $[\mathrm{O}] \ll [\mathrm{O_3}]$, odd oxygen is essentially ozone.

::: proposition Chapman steady state {#prop-chapman}
In sunlight, the oxygen-only mechanism (1)–(4) gives, at steady state for both $\mathrm{O}$ and $\mathrm{O_x}$,
$$
\frac{[\mathrm{O}]}{[\mathrm{O_3}]} = \frac{J_3}{k_2[\mathrm{O_2}][\mathrm{M}]},
\qquad
[\mathrm{O_3}] = [\mathrm{O_2}]\left(\frac{J_1\,k_2\,[\mathrm{M}]}{J_3\,k_4}\right)^{1/2} .
$$
The first ratio is set by the fast cycle (2)–(3) and is established in a fraction of a second; the second is set by the slow production (1) and loss (4) of odd oxygen, whose lifetime is weeks in the lower stratosphere and hours to a day above $40\ \mathrm{km}$. Conditions: daytime, photochemical steady state (transport neglected), no catalytic loss cycles.
:::

::: proof Steady-state analysis of the Chapman mechanism {#proof-chapman}
The rate equations are
$$
\begin{aligned}
\frac{\mathrm{d}[\mathrm{O}]}{\mathrm{d}t} &= 2J_1[\mathrm{O_2}] - k_2[\mathrm{O}][\mathrm{O_2}][\mathrm{M}] + J_3[\mathrm{O_3}] - k_4[\mathrm{O}][\mathrm{O_3}],\\
\frac{\mathrm{d}[\mathrm{O_3}]}{\mathrm{d}t} &= k_2[\mathrm{O}][\mathrm{O_2}][\mathrm{M}] - J_3[\mathrm{O_3}] - k_4[\mathrm{O}][\mathrm{O_3}] .
\end{aligned}
$$
In the first, the terms $k_2[\mathrm{O}][\mathrm{O_2}][\mathrm{M}]$ and $J_3[\mathrm{O_3}]$ are much larger than the other two, so the steady-state condition for $\mathrm{O}$ reduces to $k_2[\mathrm{O}][\mathrm{O_2}][\mathrm{M}] \approx J_3[\mathrm{O_3}]$, the first result. Adding the two equations gives the odd-oxygen budget
$$
\frac{\mathrm{d}[\mathrm{O_x}]}{\mathrm{d}t} = 2J_1[\mathrm{O_2}] - 2k_4[\mathrm{O}][\mathrm{O_3}] ,
$$
in which the fast terms cancel exactly. At steady state $J_1[\mathrm{O_2}] = k_4[\mathrm{O}][\mathrm{O_3}]$; substituting $[\mathrm{O}] = J_3[\mathrm{O_3}]/(k_2[\mathrm{O_2}][\mathrm{M}])$,
$$
J_1[\mathrm{O_2}] = \frac{k_4 J_3[\mathrm{O_3}]^2}{k_2[\mathrm{O_2}][\mathrm{M}]}
\quad\Longrightarrow\quad
[\mathrm{O_3}]^2 = \frac{J_1 k_2[\mathrm{O_2}]^2[\mathrm{M}]}{J_3 k_4},
$$
whose square root is the result. This is the quasi-steady-state approximation of [[kinetics/reaction-mechanisms]] applied twice, on two different timescales.
:::

The Chapman result explains why there is a *layer*. Going up, $J_1$ increases rapidly (more short-wave UV survives) while $[\mathrm{O_2}]$ and $[\mathrm{M}]$ fall exponentially with the scale height ([[environmental-chemistry/earth-system-chemistry#prop-barometric]]). Production $J_1[\mathrm{O_2}]$ therefore peaks at the altitude where the UV below $242\ \mathrm{nm}$ is just being used up — about $25$–$30\ \mathrm{km}$ in number density, rather higher in mixing ratio. Below that, little UV is left; above it, too little oxygen.

::: example The Chapman ozone at 30 km {#ex-chapman-30}
At $30\ \mathrm{km}$, take $T = 227\ \mathrm{K}$, $p = 12.0\ \mathrm{hPa}$, $J_1 = 1\times10^{-11}\ \mathrm{s^{-1}}$ and $J_3 = 1\times10^{-3}\ \mathrm{s^{-1}}$ (illustrative midday values), and the JPL rate expressions $k_2 = 6.0\times10^{-34}(T/300)^{-2.4}\ \mathrm{cm^6\,s^{-1}}$ and $k_4 = 8.0\times10^{-12}\exp(-2060/T)\ \mathrm{cm^3\,s^{-1}}$. Find $[\mathrm{O_3}]$, its mixing ratio and $[\mathrm{O}]/[\mathrm{O_3}]$.
::: solution
$[\mathrm{M}] = p/(k_\mathrm{B}T) = 1200\ \mathrm{Pa}/(1.3806\times10^{-23}\times227) = 3.83\times10^{23}\ \mathrm{m^{-3}} = 3.83\times10^{17}\ \mathrm{cm^{-3}}$, and $[\mathrm{O_2}] = 0.2095[\mathrm{M}] = 8.02\times10^{16}\ \mathrm{cm^{-3}}$. The rate constants are $k_2 = 6.0\times10^{-34}\times(0.757)^{-2.4} = 1.17\times10^{-33}\ \mathrm{cm^6\,s^{-1}}$ and $k_4 = 8.0\times10^{-12}\,e^{-9.07} = 9.2\times10^{-16}\ \mathrm{cm^3\,s^{-1}}$. Then
$$
[\mathrm{O_3}] = 8.02\times10^{16}\left(\frac{10^{-11}\times1.17\times10^{-33}\times3.83\times10^{17}}{10^{-3}\times9.2\times10^{-16}}\right)^{1/2}
= 8.02\times10^{16}\times7.0\times10^{-5} = 5.6\times10^{12}\ \mathrm{cm^{-3}},
$$
a mixing ratio of $5.6\times10^{12}/3.83\times10^{17} = 15\ \mathrm{ppm}$. And
$$
\frac{[\mathrm{O}]}{[\mathrm{O_3}]} = \frac{10^{-3}}{1.17\times10^{-33}\times8.02\times10^{16}\times3.83\times10^{17}} = 2.8\times10^{-5},
$$
so $[\mathrm{O}] \approx 1.6\times10^{8}\ \mathrm{cm^{-3}}$ — confirming that odd oxygen is overwhelmingly ozone. Observed ozone at $30\ \mathrm{km}$ is about $3$–$4\times10^{12}\ \mathrm{cm^{-3}}$ (about $8$–$10\ \mathrm{ppm}$): Chapman overpredicts by roughly a factor of two here, and by more at higher altitudes. Something else must be destroying odd oxygen. (The answer is uncertain to tens of per cent because $J_1$ and $J_3$ depend strongly on altitude, latitude and solar angle, but the discrepancy survives every refinement of the inputs.)
:::
:::

The odd-oxygen budget is a production–loss equation of the form $\mathrm{d}x/\mathrm{d}t = P - Lx^2$, with loss quadratic because reaction (4) consumes two odd oxygens that are themselves in fixed ratio. In dimensionless form, with $x$ in units of its steady-state value and time in units of $1/\sqrt{PL}$, it reads $\mathrm{d}y/\mathrm{d}t = 1 - y^2$, whose solution from $y = 0$ is $\tanh t$.

::: widget odesolver
f: 1 - y^2
y0: 0
t: 0, 4
exact: tanh(t)
h: 0.5
caption: Odd oxygen building up from zero towards its Chapman steady state, in dimensionless form $\mathrm{d}y/\mathrm{d}t = 1 - y^2$ (production constant, loss quadratic). The exact solution is $\tanh t$; the step-size slider compares Euler, Heun and RK4. Unlike the exponential approach of a first-order box, quadratic loss gives an approach that is slow at first then abrupt; and because the photochemical relaxation time $1/\sqrt{PL}$ is weeks in the lower stratosphere, ozone there is moved around by winds before it reaches photochemical steady state — which is why the largest columns are found at high latitudes, far from the tropical source region.
:::

## Catalytic cycles

The missing sink was identified between 1950 and 1974 as a family of **catalytic cycles** in which a radical $\mathrm{X}$ destroys odd oxygen without itself being consumed:
$$
\begin{aligned}
\mathrm{X} + \mathrm{O_3} &\rightarrow \mathrm{XO} + \mathrm{O_2}\\
\mathrm{XO} + \mathrm{O} &\rightarrow \mathrm{X} + \mathrm{O_2}\\
\hline
\text{net:}\quad \mathrm{O} + \mathrm{O_3} &\rightarrow 2\,\mathrm{O_2}
\end{aligned}
$$
The net reaction is Chapman's reaction (4), but the catalysed route is much faster. Four catalyst families matter: $\mathrm{HO_x}$ ($\mathrm{X = H, OH}$; from the oxidation of water and methane), $\mathrm{NO_x}$ ($\mathrm{X = NO}$; from nitrous oxide via $\mathrm{N_2O + O(^1D) \rightarrow 2\,NO}$), $\mathrm{ClO_x}$ ($\mathrm{X = Cl}$; from the photolysis of chlorine-containing source gases) and $\mathrm{BrO_x}$ ($\mathrm{X = Br}$; from methyl bromide and halons).

::: proposition Rate of a catalytic cycle and chain length {#prop-catalytic}
For the two-step cycle above, with $[\mathrm{X}]$ and $[\mathrm{XO}]$ in mutual steady state, the rate of odd-oxygen destruction is
$$
-\frac{\mathrm{d}[\mathrm{O_x}]}{\mathrm{d}t} = 2k_b[\mathrm{XO}][\mathrm{O}],
$$
where $k_b$ is the rate constant of the **rate-limiting** step $\mathrm{XO + O}$ (the slower of the two, since $[\mathrm{O}] \ll [\mathrm{O_3}]$). The partition is $[\mathrm{X}]/[\mathrm{XO}] = k_b[\mathrm{O}]/(k_a[\mathrm{O_3}])$. Relative to the Chapman loss $2k_4[\mathrm{O}][\mathrm{O_3}]$, the catalysed loss is faster by the factor
$$
\frac{k_b[\mathrm{XO}]}{k_4[\mathrm{O_3}]},
$$
which can exceed one even though $[\mathrm{XO}]/[\mathrm{O_3}] \sim 10^{-4}$, because $k_b/k_4 \sim 10^{4}$–$10^{5}$. The **chain length** — the number of cycles completed before $\mathrm{X}$ is converted into an inactive **reservoir** species — is the rate of the cycle divided by the rate of termination, typically $10^{3}$–$10^{5}$ for chlorine.
:::

::: proof Steady state of the catalyst pair {#proof-catalytic}
Write $k_a$ for $\mathrm{X + O_3}$ and $k_b$ for $\mathrm{XO + O}$. The total $[\mathrm{X}] + [\mathrm{XO}]$ changes only slowly (through formation and destruction of reservoirs), while interconversion is fast, so $\mathrm{d}[\mathrm{XO}]/\mathrm{d}t = k_a[\mathrm{X}][\mathrm{O_3}] - k_b[\mathrm{XO}][\mathrm{O}] \approx 0$, giving the partition. Each passage of the cycle destroys one $\mathrm{O_3}$ (in step a) and one $\mathrm{O}$ (in step b), i.e. two odd oxygens, at the rate of either step, which are equal at steady state: $-\mathrm{d}[\mathrm{O_x}]/\mathrm{d}t = 2k_a[\mathrm{X}][\mathrm{O_3}] = 2k_b[\mathrm{XO}][\mathrm{O}]$. Dividing by the Chapman loss $2k_4[\mathrm{O}][\mathrm{O_3}]$ gives the enhancement factor. The chain length follows from the definition used in [[kinetics/chain-reactions]]: propagation rate over termination rate.
:::

The decisive kinetic fact is the size of $k_b$. Chapman's own sink, $\mathrm{O + O_3}$, has an activation energy of about $17\ \mathrm{kJ\,mol^{-1}}$ and is slow in the cold stratosphere; radical–radical reactions like $\mathrm{ClO + O}$ have no barrier and run at a sizeable fraction of the collision rate.

::: example A few parts per billion of ClO {#ex-clo-enhancement}
At $30\ \mathrm{km}$ ($T = 227\ \mathrm{K}$, $[\mathrm{M}] = 3.83\times10^{17}\ \mathrm{cm^{-3}}$, $[\mathrm{O_3}] = 3.0\times10^{12}\ \mathrm{cm^{-3}}$, $[\mathrm{O}] = 1.6\times10^{8}\ \mathrm{cm^{-3}}$), suppose $\mathrm{ClO}$ is $0.30\ \mathrm{ppb}$. With $k(\mathrm{ClO + O}) = 3.0\times10^{-11}\exp(70/T)$ and $k(\mathrm{Cl + O_3}) = 2.3\times10^{-11}\exp(-200/T)\ \mathrm{cm^3\,s^{-1}}$ (JPL evaluation), compare the chlorine-catalysed loss with Chapman's, and find $[\mathrm{Cl}]/[\mathrm{ClO}]$.
::: solution
$[\mathrm{ClO}] = 0.30\times10^{-9}\times3.83\times10^{17} = 1.15\times10^{8}\ \mathrm{cm^{-3}}$. At $227\ \mathrm{K}$: $k_b = 3.0\times10^{-11}e^{0.308} = 4.1\times10^{-11}$, $k_a = 2.3\times10^{-11}e^{-0.881} = 9.5\times10^{-12}$, and $k_4 = 9.2\times10^{-16}\ \mathrm{cm^3\,s^{-1}}$ (from [[#ex-chapman-30]]). The enhancement factor of [[#prop-catalytic]] is
$$
\frac{k_b[\mathrm{ClO}]}{k_4[\mathrm{O_3}]} = \frac{4.1\times10^{-11}\times1.15\times10^{8}}{9.2\times10^{-16}\times3.0\times10^{12}} = \frac{4.7\times10^{-3}}{2.8\times10^{-3}} = 1.7 .
$$
A third of a part per billion of $\mathrm{ClO}$ destroys odd oxygen almost twice as fast as all of Chapman's oxygen chemistry, though ozone outnumbers it $26\,000$ to one. The partition is
$$
\frac{[\mathrm{Cl}]}{[\mathrm{ClO}]} = \frac{k_b[\mathrm{O}]}{k_a[\mathrm{O_3}]} = \frac{4.1\times10^{-11}\times1.6\times10^{8}}{9.5\times10^{-12}\times3.0\times10^{12}} = 2.3\times10^{-4},
$$
so nearly all active chlorine is $\mathrm{ClO}$, and a free $\mathrm{Cl}$ atom survives only $1/(k_a[\mathrm{O_3}]) = 0.035\ \mathrm{s}$ before attacking another ozone molecule.
:::
:::

What stops the chain? Active chlorine is converted into two **reservoir species** that do not attack ozone:
$$
\mathrm{Cl} + \mathrm{CH_4} \rightarrow \mathrm{HCl} + \mathrm{CH_3}, \qquad
\mathrm{ClO} + \mathrm{NO_2} + \mathrm{M} \rightarrow \mathrm{ClONO_2} + \mathrm{M} .
$$
Hydrogen chloride and chlorine nitrate hold over $95\ \%$ of the inorganic chlorine in the mid-latitude stratosphere. They are slowly returned to active forms by $\mathrm{OH + HCl}$ and photolysis of $\mathrm{ClONO_2}$, and finally removed when stratospheric air descends into the troposphere and $\mathrm{HCl}$ dissolves in clouds. The cycles also interfere with each other: $\mathrm{NO_2}$ ties up $\mathrm{ClO}$, and $\mathrm{ClONO_2}$ ties up $\mathrm{NO_2}$. Bromine is about $60$ times more efficient per atom than chlorine, because its reservoirs ($\mathrm{HBr}$, $\mathrm{BrONO_2}$) are less stable and most bromine stays active.

## Chlorofluorocarbons

**Chlorofluorocarbons** (CFCs) such as $\mathrm{CFCl_3}$ (CFC-11) and $\mathrm{CF_2Cl_2}$ (CFC-12) were developed around 1930 as non-toxic, non-flammable refrigerants and later used as aerosol propellants, foam-blowing agents and solvents. Their chemical virtue is their environmental problem: they have no $\mathrm{C{-}H}$ bonds for $\mathrm{OH}$ to attack, they are insoluble in water, and they do not absorb at wavelengths reaching the troposphere. They therefore have no tropospheric sink. They are slowly carried into the stratosphere, where above about $20$–$25\ \mathrm{km}$ they meet ultraviolet light below about $230\ \mathrm{nm}$ in the "window" between the $\mathrm{O_2}$ and $\mathrm{O_3}$ absorptions, and photolyse:
$$
\mathrm{CFCl_3} + h\nu \rightarrow \mathrm{CFCl_2} + \mathrm{Cl} .
$$
The organic fragment is oxidised and releases its remaining chlorine within days. The atmospheric lifetimes, as evaluated by SPARC (2013) and adopted in the WMO/UNEP *Scientific Assessment of Ozone Depletion: 2022*, are about $52$ years for CFC-11 and $102$ years for CFC-12. Their replacements, the hydrochlorofluorocarbons (HCFCs, e.g. $\mathrm{CHF_2Cl}$, HCFC-22, lifetime about $12$ years) contain a $\mathrm{C{-}H}$ bond and are mostly destroyed by $\mathrm{OH}$ in the troposphere; the hydrofluorocarbons (HFCs) contain no chlorine at all.

::: definition Ozone depletion potential and equivalent effective stratospheric chlorine {#def-odp}
The **ozone depletion potential** (ODP) of a substance is the integrated global ozone loss caused by a unit mass emitted, relative to the same mass of CFC-11 (so $\mathrm{ODP(CFC\text{-}11)} = 1$). It grows with the number of chlorine and bromine atoms per unit mass, with the fraction released in the stratosphere, and with the atmospheric lifetime. Typical values (WMO 2022): CFC-12 about $0.75$–$0.8$, HCFC-22 about $0.03$–$0.04$, halon-1301 ($\mathrm{CF_3Br}$) above $15$, HFCs zero. **Equivalent effective stratospheric chlorine** (EESC) combines all source gases into one index of the inorganic halogen loading,
$$
\mathrm{EESC} = \sum_i n_i\,f_i\,x_i^\text{(entry)} + \alpha\sum_j n_j\,f_j\,x_j^\text{(entry)},
$$
where $x$ is the mixing ratio entering the stratosphere a few years earlier, $n$ the number of $\mathrm{Cl}$ (first sum) or $\mathrm{Br}$ (second sum) atoms, $f$ the fractional release, and $\alpha \approx 60$ the per-atom efficiency of bromine relative to chlorine. EESC is a semi-empirical index, not a measured quantity.
:::

::: example Decay of a long-lived CFC {#ex-cfc-decay}
Global emissions of CFC-12 fell to very low levels in the early 2000s. Taking a single-exponential lifetime of $102$ years, what fraction of the CFC-12 present in 2005 remains in 2055? And why does stratospheric chlorine fall more slowly than such estimates suggest?
::: solution
From [[environmental-chemistry/earth-system-chemistry#prop-onebox]] with no source, $M/M_0 = e^{-50/102} = e^{-0.490} = 0.61$: about **$61\ \%$** of the 2005 burden is still present half a century later. Two effects slow the recovery further. First, "banks" — CFCs still sealed in old refrigerators, insulating foams and equipment — continue to leak for decades after production ends. Second, the stratosphere responds to tropospheric mixing ratios with a delay of $3$–$6$ years (the age of stratospheric air), so EESC lags emissions. The lifetime of $102$ years, not the date of the ban, controls the recovery timescale.
:::
:::

## The Antarctic ozone hole

Gas-phase catalysis explains a slow, few-per-cent decline in global ozone. It cannot explain what Joseph Farman, Brian Gardiner and Jonathan Shanklin reported in *Nature* in May 1985: a loss of more than a third of the October ozone column over Halley Bay since the 1960s, appearing within a few years and confined to spring over Antarctica. In the lower stratosphere, where the hole forms, atomic oxygen is scarce and the $\mathrm{ClO + O}$ cycle is far too slow. The resolution, worked out by Susan Solomon, Rolando Garcia, Sherwood Rowland, Donald Wuebbles, Mario and Luisa Molina and others in 1986–87, and confirmed by aircraft measurements in 1987, has three ingredients.

1. **Polar stratospheric clouds (PSCs).** In the polar night the stratosphere over Antarctica, isolated by a strong westerly **polar vortex**, cools below about $195\ \mathrm{K}$. Nitric acid and water condense as nitric acid trihydrate and supercooled ternary $\mathrm{H_2SO_4/HNO_3/H_2O}$ droplets, and below about $188\ \mathrm{K}$ as ice.
2. **Heterogeneous chlorine activation.** On the surfaces of these particles the reservoir species react with each other:
$$
\mathrm{ClONO_2(g)} + \mathrm{HCl(s)} \rightarrow \mathrm{Cl_2(g)} + \mathrm{HNO_3(s)},
\qquad
\mathrm{ClONO_2} + \mathrm{H_2O(s)} \rightarrow \mathrm{HOCl} + \mathrm{HNO_3(s)} .
$$
Gas-phase rates of these reactions are negligible; on ice and acid surfaces they are efficient. The nitric acid stays in the particles, which may grow large enough to sediment out (**denitrification**), so there is no $\mathrm{NO_2}$ left to re-form $\mathrm{ClONO_2}$.
3. **A cycle that needs no atomic oxygen.** When sunlight returns in September, $\mathrm{Cl_2}$ and $\mathrm{HOCl}$ photolyse, and with $\mathrm{ClO}$ at $1$–$2\ \mathrm{ppb}$ the **ClO dimer cycle** (Molina and Molina, 1987) runs:
$$
\begin{aligned}
\mathrm{ClO} + \mathrm{ClO} + \mathrm{M} &\rightarrow \mathrm{Cl_2O_2} + \mathrm{M}\\
\mathrm{Cl_2O_2} + h\nu &\rightarrow \mathrm{Cl} + \mathrm{ClOO}\\
\mathrm{ClOO} + \mathrm{M} &\rightarrow \mathrm{Cl} + \mathrm{O_2} + \mathrm{M}\\
2\,(\mathrm{Cl} + \mathrm{O_3} &\rightarrow \mathrm{ClO} + \mathrm{O_2})\\
\hline
\text{net:}\quad 2\,\mathrm{O_3} &\rightarrow 3\,\mathrm{O_2}
\end{aligned}
$$
together with a coupled $\mathrm{BrO + ClO}$ cycle. Its rate is limited by the termolecular dimerisation, and is therefore second order in $\mathrm{ClO}$ — which is why loss is negligible until $\mathrm{ClO}$ is enhanced a hundredfold, and then rapid.

::: example How fast does the dimer cycle destroy ozone? {#ex-dimer}
In the Antarctic lower stratosphere at $18\ \mathrm{km}$ in September, take $T = 195\ \mathrm{K}$, $p = 70\ \mathrm{hPa}$, $\mathrm{ClO} = 1.0\ \mathrm{ppb}$ and $\mathrm{O_3} = 2.0\ \mathrm{ppm}$, with the low-pressure-limit rate constant $k_0 = 1.6\times10^{-32}(T/300)^{-4.5}\ \mathrm{cm^6\,s^{-1}}$ for $\mathrm{ClO + ClO + M}$. Assuming the dimer photolyses quickly in sunlight, estimate the percentage of the ozone destroyed in $12$ hours of daylight.
::: solution
$[\mathrm{M}] = 7000/(1.3806\times10^{-23}\times195) = 2.60\times10^{24}\ \mathrm{m^{-3}} = 2.60\times10^{18}\ \mathrm{cm^{-3}}$; $[\mathrm{ClO}] = 2.60\times10^{9}$ and $[\mathrm{O_3}] = 5.2\times10^{12}\ \mathrm{cm^{-3}}$. The rate constant is $k_0 = 1.6\times10^{-32}\times(0.650)^{-4.5} = 1.11\times10^{-31}\ \mathrm{cm^6\,s^{-1}}$. Each dimerisation leads to the loss of two ozone molecules, so
$$
-\frac{\mathrm{d}[\mathrm{O_3}]}{\mathrm{d}t} = 2k_0[\mathrm{ClO}]^2[\mathrm{M}] = 2\times1.11\times10^{-31}\times(2.60\times10^{9})^2\times2.60\times10^{18} = 3.9\times10^{6}\ \mathrm{cm^{-3}\,s^{-1}} .
$$
In $12\ \mathrm{h} = 43\,200\ \mathrm{s}$ that is $1.7\times10^{11}\ \mathrm{cm^{-3}}$, i.e. $3.2\ \%$ of the ozone per day. Over the six weeks or so of September and early October, sustained losses of a few per cent per day remove most of the ozone at these altitudes — as observed, when ozonesondes show the $14$–$20\ \mathrm{km}$ layer almost completely emptied. (At $70\ \mathrm{hPa}$ the reaction is slightly into its fall-off region, so the true rate is perhaps $15\ \%$ lower; the conclusion is unchanged.)
:::
:::

The Arctic has PSCs too, but its vortex is warmer and more disturbed by planetary waves, so chlorine activation is less complete and usually ends earlier; large Arctic losses have occurred only in exceptionally cold winters (1997, 2011 and 2020, for example). In mid-latitudes, ozone was lowered by a few per cent by the combination of gas-phase cycles, heterogeneous reactions on the background sulfate aerosol, and the dilution of ozone-poor polar air — with temporary extra losses after the eruption of Mount Pinatubo in 1991 enhanced the sulfate surface.

::: warning The ozone hole and global warming are different problems {#warn-ozone-climate}
Three confusions recur. (1) *The ozone hole is not a hole in the greenhouse blanket*: it does not let "heat" in. It changes ultraviolet at the surface; its effect on the global energy budget is small (stratospheric ozone loss is a weak *negative* forcing). (2) *More ozone is not always better*: ozone in the troposphere is a pollutant and a greenhouse gas ([[environmental-chemistry/tropospheric-chemistry]]); ozone near the ground cannot "refill" the stratosphere, since its lifetime there is weeks and it cannot cross the tropopause in quantity. (3) *The issues are coupled, but not in the simple way*: CFCs, HCFCs and HFCs are strong greenhouse gases, so the Montreal Protocol has also avoided substantial warming; a cooling stratosphere (caused by rising $\mathrm{CO_2}$) speeds up gas-phase ozone recovery in the upper stratosphere but can favour PSCs in the polar lower stratosphere. Keep the mechanisms separate before you combine them.
:::

## The Montreal Protocol and recovery

The policy response is described here as a matter of record. The Vienna Convention for the Protection of the Ozone Layer (1985) set up a framework for research and cooperation; the **Montreal Protocol on Substances that Deplete the Ozone Layer** (1987, in force 1989) set binding production limits, which successive amendments (London 1990, Copenhagen 1992, Montreal 1997, Beijing 1999) tightened into phase-outs: CFCs and halons in developed countries by 1996 and in developing countries by 2010, with HCFCs following on later schedules. In 2009 it became the first treaty of the United Nations to achieve universal ratification. The **Kigali Amendment** (2016, in force 2019) added a phase-down of HFCs, not because they deplete ozone but because of their global warming potential. Regional legislation implements these obligations — in the European Union, for instance, the 2024 regulations on ozone-depleting substances and on fluorinated gases (Regulations (EU) 2024/590 and 2024/573), and in the United States the American Innovation and Manufacturing Act of 2020 for HFCs.

The scientific outcome, as summarised in the WMO/UNEP *Scientific Assessment of Ozone Depletion: 2022* (the most recent quadrennial assessment as of 2026):

- the total tropospheric abundance of ozone-depleting chlorine and bromine has been declining since its peak in the late 1990s, and stratospheric EESC since about 2000;
- if current policies continue, total column ozone is expected to return to its 1980 values around **2040** averaged over $60°\mathrm{S}$–$60°\mathrm{N}$, around **2045** in the Arctic and around **2066** over Antarctica;
- an unexpected rise in CFC-11 emissions between about 2012 and 2018, traced largely to eastern China (Montzka et al., 2018, and Rigby et al., 2019, in *Nature*), declined sharply after 2018 and did not significantly delay recovery;
- the Kigali Amendment is expected to avoid $0.3$–$0.5\ \mathrm{°C}$ of global warming by 2100 compared with unconstrained HFC growth.

Year-to-year variations in the size of the Antarctic hole remain large, being governed by vortex temperature and dynamics; occasional events such as the 2022 eruption of Hunga Tonga–Hunga Haʻapai, which injected an unusually large amount of water vapour into the stratosphere, are studied for their possible effects on ozone.

::: quiz
Why did CFCs, which are unreactive, turn out to be so damaging to ozone?
- [x] Their lack of a tropospheric sink lets almost all of the emitted mass reach the stratosphere, where hard UV releases chlorine atoms that destroy ozone catalytically, thousands of times each.
- [ ] They react directly with ozone at the surface, and the ozone-poor air rises into the stratosphere.
- [ ] They absorb the UV that would otherwise make ozone, starving the Chapman production step.
- [ ] They are greenhouse gases that warm the stratosphere and speed up the Chapman loss reaction.
::: solution
Inertness in the troposphere is what makes CFCs dangerous: nothing removes them until they are above most of the ozone, where photolysis at $\lambda < 230\ \mathrm{nm}$ frees $\mathrm{Cl}$. The catalytic chain then multiplies each chlorine atom's effect. CFCs do not react with ozone directly, their absorption of UV is negligible compared with $\mathrm{O_2}$, and their greenhouse effect actually cools the stratosphere slightly.
:::
:::

::: history
Charles Fabry and Henri Buisson measured the ozone column spectroscopically in 1913, and Gordon Dobson built the network of ultraviolet spectrophotometers, from the 1920s, whose unit still measures it. Sydney Chapman's oxygen-only mechanism appeared in 1930. The catalytic cycles followed: $\mathrm{HO_x}$ (Bates and Nicolet, 1950), $\mathrm{NO_x}$ (Paul Crutzen, 1970, and Harold Johnston, 1971, who warned that supersonic aircraft could deplete ozone), and $\mathrm{ClO_x}$ (Richard Stolarski and Ralph Cicerone, 1974). In June 1974 Mario Molina and F. Sherwood Rowland published in *Nature* the argument that CFCs survive to the stratosphere and release chlorine there. The discovery of the Antarctic hole by Farman, Gardiner and Shanklin (1985), the explanation through heterogeneous chemistry, and the 1987 Airborne Antarctic Ozone Experiment, which measured the anticorrelation of $\mathrm{ClO}$ and ozone at the vortex edge, made the case decisive. Crutzen, Molina and Rowland shared the 1995 Nobel Prize in Chemistry.
:::

## Where this leads

The hydroxyl radical, the excited atom $\mathrm{O(^1D)}$ and the nitrogen oxides met here as stratospheric catalysts are the protagonists of [[environmental-chemistry/tropospheric-chemistry]], where ozone is produced rather than destroyed and becomes a pollutant. Heterogeneous chemistry on particles returns in [[environmental-chemistry/particulates-acid-deposition]]. The global warming potentials of CFCs, HCFCs and HFCs, and the role of $\mathrm{N_2O}$ and stratospheric cooling, are treated in [[environmental-chemistry/greenhouse-gases]]. The measurement of trace species from the ground, from aircraft and from satellites — the evidence on which all of this rests — is the subject of [[environmental-chemistry/environmental-monitoring]].

::: summary
- Ozone absorbs all UV below about $290\ \mathrm{nm}$; transmission $T = e^{-\sigma N}$ makes UVB very sensitive to the column (a $10\ \%$ loss raises $300\ \mathrm{nm}$ UV by about $37\ \%$). The column is about $300\ \mathrm{DU}$; $1\ \mathrm{DU} = 2.687\times10^{16}\ \mathrm{cm^{-2}}$.
- The Chapman mechanism gives $[\mathrm{O}]/[\mathrm{O_3}] = J_3/(k_2[\mathrm{O_2}][\mathrm{M}])$ and $[\mathrm{O_3}] = [\mathrm{O_2}](J_1k_2[\mathrm{M}]/J_3k_4)^{1/2}$ from the odd-oxygen budget; it overpredicts ozone.
- Catalytic cycles $\mathrm{X + O_3 \rightarrow XO + O_2}$, $\mathrm{XO + O \rightarrow X + O_2}$ ($\mathrm{X = OH, NO, Cl, Br}$) destroy odd oxygen at rate $2k_b[\mathrm{XO}][\mathrm{O}]$; ppb levels of $\mathrm{ClO}$ outpace Chapman's loss because radical–radical reactions are fast.
- Reservoirs ($\mathrm{HCl}$, $\mathrm{ClONO_2}$) normally hold most chlorine; CFCs reach the stratosphere because they have no tropospheric sink, with lifetimes of about $52$ (CFC-11) and $102$ years (CFC-12).
- The Antarctic hole needs cold (PSCs), heterogeneous activation $\mathrm{ClONO_2 + HCl \rightarrow Cl_2 + HNO_3}$, denitrification and the $\mathrm{ClO}$ dimer cycle, whose rate is second order in $\mathrm{ClO}$.
- ODP and EESC rank and combine ozone-depleting substances; bromine is about $60$ times as effective per atom as chlorine.
- Under the Montreal Protocol (1987) and its amendments, halogen loading is falling; the WMO/UNEP 2022 assessment projects return to 1980 column values around 2040 (near-global), 2045 (Arctic) and 2066 (Antarctic).
:::

## Exercises

::: exercise The dissociation threshold of oxygen {#ex-thresholds level=1 check="240"}
The $\mathrm{O{=}O}$ bond dissociation enthalpy is $498.4\ \mathrm{kJ\,mol^{-1}}$. What is the longest wavelength that can dissociate $\mathrm{O_2}$ into two ground-state atoms? (Enter the wavelength in nm, to three significant figures.)
::: solution
$\lambda = N_\mathrm{A}hc/D = (6.022\times10^{23}\times6.626\times10^{-34}\times2.998\times10^{8})/(498.4\times10^{3}) = 2.40\times10^{-7}\ \mathrm{m} = 240\ \mathrm{nm}$. The observed onset of the Herzberg continuum is near $242\ \mathrm{nm}$, consistent within the difference between the enthalpy at $298\ \mathrm{K}$ and the dissociation energy at $0\ \mathrm{K}$.
:::
:::

::: exercise Dobson units {level=1 check="5.91"}
The Antarctic ozone hole is defined by columns below $220\ \mathrm{DU}$. Express $220\ \mathrm{DU}$ as a column in molecules $\mathrm{cm^{-2}}$. (Enter it in units of $10^{18}\ \mathrm{cm^{-2}}$, to three significant figures.)
::: solution
$220\times2.687\times10^{16} = 5.91\times10^{18}\ \mathrm{cm^{-2}}$. At $273\ \mathrm{K}$ and $1\ \mathrm{atm}$ this ozone would be a layer $2.2\ \mathrm{mm}$ thick.
:::
:::

::: exercise CFC-12 remaining {level=1 check="61"}
With a lifetime of $102$ years and no further emissions, what percentage of a CFC-12 burden remains after $50$ years? (Enter the percentage, to two significant figures.)
::: solution
$e^{-50/102} = 0.613$, i.e. $61\ \%$ (as in [[#ex-cfc-decay]]).
:::
:::

::: exercise UV increase in a thinner column {level=2 check="69"}
At a wavelength where $\sigma = 3.9\times10^{-19}\ \mathrm{cm^2}$, by what percentage does the vertical transmission increase when the column falls from $300$ to $250\ \mathrm{DU}$? (Enter the percentage increase, to two significant figures.)
::: solution
The ratio is $\exp(\sigma\,\delta N) = \exp(3.9\times10^{-19}\times50\times2.687\times10^{16}) = e^{0.524} = 1.69$, an increase of $69\ \%$. The linear estimate $\tau\,\delta N/N = 3.14\times50/300 = 52\ \%$ underestimates it because the change is not small.
:::
:::

::: exercise Atomic oxygen in the Chapman steady state {level=2 check="6.9"}
At $40\ \mathrm{km}$ take $T = 250\ \mathrm{K}$, $[\mathrm{M}] = 8.6\times10^{16}\ \mathrm{cm^{-3}}$, $[\mathrm{O_2}] = 0.2095[\mathrm{M}]$, $J_3 = 1.0\times10^{-3}\ \mathrm{s^{-1}}$ and $k_2 = 6.0\times10^{-34}(T/300)^{-2.4}\ \mathrm{cm^6\,s^{-1}}$. Find $[\mathrm{O}]/[\mathrm{O_3}]$. (Enter it in units of $10^{-4}$, to two significant figures.)
::: solution
$k_2 = 6.0\times10^{-34}\times(0.8333)^{-2.4} = 9.29\times10^{-34}\ \mathrm{cm^6\,s^{-1}}$ and $[\mathrm{O_2}][\mathrm{M}] = 0.2095\times(8.6\times10^{16})^2 = 1.549\times10^{33}\ \mathrm{cm^{-6}}$. By [[#prop-chapman]],
$$
\frac{[\mathrm{O}]}{[\mathrm{O_3}]} = \frac{1.0\times10^{-3}}{9.29\times10^{-34}\times1.549\times10^{33}} = \frac{1.0\times10^{-3}}{1.440} = 6.9\times10^{-4} .
$$
That is $25$ times the value at $30\ \mathrm{km}$ ([[#ex-chapman-30]]), because $[\mathrm{M}]^2$ is about $20$ times smaller. Higher up, atomic oxygen is more abundant, the $\mathrm{XO + O}$ steps are faster, and the catalytic cycles of [[#prop-catalytic]] dominate the odd-oxygen loss.
:::
:::

::: exercise Partition of active chlorine {level=2 check="0.92"}
Using the data of [[#ex-clo-enhancement]], find $[\mathrm{Cl}]/[\mathrm{ClO}]$ if $[\mathrm{O}]$ is doubled to $3.2\times10^{8}\ \mathrm{cm^{-3}}$ and $[\mathrm{O_3}]$ is halved to $1.5\times10^{12}\ \mathrm{cm^{-3}}$ (conditions nearer $40\ \mathrm{km}$, keeping the rate constants at their $227\ \mathrm{K}$ values). (Enter the ratio in units of $10^{-3}$, to two significant figures.)
::: solution
The ratio is $k_b[\mathrm{O}]/(k_a[\mathrm{O_3}])$, which scales as $[\mathrm{O}]/[\mathrm{O_3}]$: a factor of $2/0.5 = 4$ larger than $2.3\times10^{-4}$, i.e. $9.2\times10^{-4} = 0.92\times10^{-3}$. Directly: $4.12\times10^{-11}\times3.2\times10^{8}/(9.53\times10^{-12}\times1.5\times10^{12}) = 9.2\times10^{-4}$. Chlorine is still almost entirely $\mathrm{ClO}$, but the cycle runs faster because $[\mathrm{O}]$ is larger.
:::
:::

::: exercise Chapman ozone scales with pressure {level=3 check="0.78"}
(a) From [[#prop-chapman]], show that at a fixed altitude where the photolysis rates and temperature are fixed, the steady-state ozone *mixing ratio* is proportional to $[\mathrm{M}]^{1/2}$. (b) If an isothermal layer is displaced upward by half a scale height at constant $J_1$, $J_3$ and $T$, by what factor does the Chapman ozone mixing ratio change? (Enter the factor, to two significant figures.)
::: solution
(a) $[\mathrm{O_3}] = [\mathrm{O_2}](J_1k_2[\mathrm{M}]/J_3k_4)^{1/2}$ with $[\mathrm{O_2}] = 0.2095[\mathrm{M}]$, so $[\mathrm{O_3}]\propto[\mathrm{M}]^{3/2}$ and the mixing ratio $[\mathrm{O_3}]/[\mathrm{M}] \propto [\mathrm{M}]^{1/2}$. (b) Half a scale height lowers $[\mathrm{M}]$ by the factor $e^{-1/2}$, so the mixing ratio changes by $([\mathrm{M}]'/[\mathrm{M}])^{1/2} = (e^{-1/2})^{1/2} = e^{-1/4} = 0.78$. In reality $J_1$ increases strongly with altitude and more than compensates, which is why the mixing ratio peaks well above the number-density peak.
:::
:::

::: exercise Ozone loss in the Antarctic vortex {level=3 check="13"}
Repeat [[#ex-dimer]] with $\mathrm{ClO} = 2.0\ \mathrm{ppb}$, all other data unchanged. What percentage of the ozone is destroyed in $12$ hours of daylight, assuming the rate stays constant over that time? Explain why the answer is not simply twice that of the example. (Enter the percentage, to two significant figures.)
::: hint
The dimer cycle is second order in $\mathrm{ClO}$.
:::
::: solution
The rate scales as $[\mathrm{ClO}]^2$, so doubling $\mathrm{ClO}$ multiplies it by four: $4\times3.9\times10^{6} = 1.56\times10^{7}\ \mathrm{cm^{-3}\,s^{-1}}$. In $43\,200\ \mathrm{s}$ that is $6.8\times10^{11}\ \mathrm{cm^{-3}}$, i.e. $6.8\times10^{11}/5.2\times10^{12} = 13\ \%$ per day. The quadratic dependence is the reason ozone loss switches on so abruptly when PSCs activate chlorine, and why the reduction of chlorine loading under the Montreal Protocol has a more than proportional effect on polar loss rates.
:::
:::
