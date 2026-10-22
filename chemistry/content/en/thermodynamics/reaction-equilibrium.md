Every reaction with a finite equilibrium constant is a compromise waiting to happen. Hydrogen and nitrogen can sit together in a vessel at room temperature for a century without making ammonia; heat them to $500\,\mathrm{K}$ under ten bar with osmium present and they make it briskly — but only until the mixture contains about forty-four per cent ammonia by amount, at which point the net reaction stops, though both directions have not the slightest intention of ceasing. Why *that* composition? Why does it move when the vessel is cooled, or compressed, or diluted with argon? And why does the same question, asked of the rusting of iron, have an answer that changes completely if the oxygen is handed over to carbon monoxide instead?

This chapter answers all of those with one function and one equation. The function is the Gibbs energy, built in [[thermodynamics/free-energy|the previous chapter]], evaluated not between pure substances but along the path a reacting mixture actually travels; the equation is $\Delta_\mathrm{r}G^\circ = -RT\ln K$, which converts every equilibrium constant ever measured into a free energy, and every free energy ever tabulated into an equilibrium constant. The temperature dependence of that single bridge — the van 't Hoff equation — is the reason a lime kiln runs hot, a Haber reactor runs at a compromise four hundred degrees, and the sky is not nitric oxide. The machinery is deliberately austere: chemical potentials, one derivative, and bookkeeping. The reach is the whole of industrial chemistry.

Throughout, numerical data are the standard formation values of the NIST-JANAF tables as reproduced in the CRC Handbook, at $298.15\,\mathrm{K}$ unless stated; $p^\circ = 1\,\mathrm{bar}$ and $R = 8.314\,\mathrm{J\,K^{-1}\,mol^{-1}}$.

## Extent of reaction: a coordinate for a reacting mixture

A mixture of reactants is not a single thermodynamic state chosen freely; once the reaction is possible, the composition has only one degree of freedom left, and we may as well choose it honestly. The honest coordinate is the **extent of reaction**.

::: definition Extent of reaction {#def-extent}
For a reaction written $\sum_i \nu_i \mathrm{A}_i = 0$ (stoichiometric numbers $\nu_i$ negative for reactants, positive for products), the **extent of reaction** $\xi$ is defined by $\mathrm{d}n_i = \nu_i\,\mathrm{d}\xi$ for every species $i$, so that $n_i = n_{i,0} + \nu_i\xi$. One mole of extent converts reactants to products in exactly the proportions of the balanced equation.
:::

For $\mathrm{N_2O_4(g)} \rightleftharpoons 2\,\mathrm{NO_2(g)}$ with $\nu(\mathrm{N_2O_4}) = -1$ and $\nu(\mathrm{NO_2}) = +2$, starting from one mole of pure $\mathrm{N_2O_4}$, an extent $\xi = \alpha$ leaves $1-\alpha$ moles of tetroxide and $2\alpha$ moles of nitrogen dioxide; $\alpha$ is then the familiar **degree of dissociation**. The extent is the reaction's position along a line, and like any position it has a slope of energy attached to it.

::: proposition The reaction slope of $G$ {#prop-slope}
For a reacting mixture at constant temperature and pressure,
$$
\Delta_\mathrm{r}G \equiv \sum_i \nu_i \mu_i = \left(\frac{\partial G}{\partial \xi}\right)_{T,p},
$$
where $\mu_i$ are the chemical potentials of the species in the mixture. The system evolves spontaneously in the direction that decreases $G$, i.e. where $\Delta_\mathrm{r}G < 0$, and stops where $\Delta_\mathrm{r}G = 0$.
:::

::: proof
From the fundamental equation $\mathrm{d}G = -S\,\mathrm{d}T + V\,\mathrm{d}p + \sum_i \mu_i\,\mathrm{d}n_i$ (with $\mu_i = (\partial G/\partial n_i)_{T,p,n_{j\neq i}}$ from [[thermodynamics/free-energy|the chemical potential]]), at constant $T$ and $p$ we have $\mathrm{d}G = \sum_i \mu_i\,\mathrm{d}n_i$. Substituting $\mathrm{d}n_i = \nu_i\,\mathrm{d}\xi$ gives $\mathrm{d}G = \left(\sum_i \nu_i\mu_i\right)\mathrm{d}\xi$, which is the claim. The criterion $\Delta_\mathrm{r}G < 0$ for spontaneity is the Gibbs criterion of [[thermodynamics/free-energy|the Gibbs energy chapter]] applied to the single remaining coordinate $\xi$.
:::

Picture $G$ as a function of $\xi$ at fixed $T$ and $p$: a curve running from pure reactants to pure products. Near the reactant end it almost always plunges steeply downwards, because mixing the first traces of product into the reactants is a large, favourable entropy of mixing — the same term that makes two gases mix spontaneously ([[thermodynamics/mixtures|mixtures]]). Near the product end it climbs steeply for the mirror-image reason. Between the two infinities of slope there must be a minimum, and the mixture sits at that minimum: **no reaction with a finite $K$ goes to completion**, and no reaction with a finite $K$ fails to start. The rest of this lesson computes where the minimum lies and how it moves.

## The reaction isotherm

The chemical potential of each component of an ideal mixture is $\mu_i = \mu_i^\circ + RT\ln a_i$, where $a_i$ is the activity — for an ideal gas, $p_i/p^\circ$; for a solute in a dilute solution, $c_i/c^\circ$; for a pure solid or liquid, $1$ (see [[thermodynamics/free-energy|the ideal-mixture proposition]]). Substituting this into $\Delta_\mathrm{r}G$ collapses the whole composition dependence into one logarithm.

::: proposition The reaction isotherm {#prop-isotherm}
For any reaction mixture,
$$
\Delta_\mathrm{r}G = \Delta_\mathrm{r}G^\circ + RT\ln Q, \qquad Q = \prod_i a_i^{\nu_i},
$$
where $\Delta_\mathrm{r}G^\circ = \sum_i \nu_i\mu_i^\circ$ is the standard reaction Gibbs energy and $Q$, the **reaction quotient**, is evaluated at the mixture's *current* composition.
:::

::: proof
$\Delta_\mathrm{r}G = \sum_i \nu_i\mu_i = \sum_i \nu_i\mu_i^\circ + RT\sum_i \nu_i\ln a_i$. The first sum is $\Delta_\mathrm{r}G^\circ$ by definition, and the second is $RT\ln\prod_i a_i^{\nu_i} = RT\ln Q$ because coefficients multiply into logarithms as exponents.
:::

The physical content of the $RT\ln Q$ term is exactly the mixing and expansion free energy sketched above: it is infinitely negative at $Q = 0$ (pure reactants) and pulls the system away from either extreme.

::: warning $\Delta_\mathrm{r}G^\circ$ does not describe the equilibrium mixture {#warn-dg0-equilibrium}
The most durable confusion in chemical thermodynamics is to read $\Delta_\mathrm{r}G^\circ$ as *the* free-energy change of the reaction as it occurs. It is not: it is the change between pure standard-state reactants and pure standard-state products, two states the reacting mixture never visits. At the equilibrium composition the actual change is $\Delta_\mathrm{r}G = 0$, always, no matter what $\Delta_\mathrm{r}G^\circ$ is. What $\Delta_\mathrm{r}G^\circ$ fixes is the *location* of the minimum, through $K$; the sign of $\Delta_\mathrm{r}G^\circ$ says only whether the minimum lies nearer products ($\Delta_\mathrm{r}G^\circ < 0$, $K > 1$) or nearer reactants ($\Delta_\mathrm{r}G^\circ > 0$, $K < 1$). A reaction with $\Delta_\mathrm{r}G^\circ = +100\,\mathrm{kJ\,mol^{-1}}$ still runs forward from pure reactants, because there $Q = 0$ and $\Delta_\mathrm{r}G = -\infty$; a reaction with $\Delta_\mathrm{r}G^\circ = -100\,\mathrm{kJ\,mol^{-1}}$ runs backwards if you start it with products far above their equilibrium amounts.
:::

::: widget plot
f: dg*x + x*log(x) + (1-x)*log(1-x)
x: 0.005, 0.995
y: -6.5, 0.5
sliders: dg=-1.1:-6:6:0.1
labels: (G - G(0)) / RT
caption: The Gibbs energy of a reacting mixture of type $\mathrm{A} \rightleftharpoons \mathrm{B}$, in units of $RT$ and relative to pure A, as a function of the mole fraction $x$ of B: the term $\Delta G^\circ x$ from the standard free energies plus the entropy-of-mixing term $x\ln x + (1-x)\ln(1-x)$, which diverges downwards at both ends. The slider sets $\Delta_\mathrm{r}G^\circ/RT$. The minimum sits where $x/(1-x) = e^{-\Delta_\mathrm{r}G^\circ/RT} = K$: at the default $\Delta_\mathrm{r}G^\circ/RT = -1.1$ the minimum is at $x = 0.75$. Slide $\Delta_\mathrm{r}G^\circ$ to $+6$ and watch the minimum crawl to $x = 0.0025$ — the reaction "does not go", yet still starts, because the curve always falls at $x = 0$.
:::

::: example Nitrogen tetroxide: the numbers behind a familiar equilibrium {#ex-n2o4-K}
For $\mathrm{N_2O_4(g)} \rightleftharpoons 2\,\mathrm{NO_2(g)}$ the tabulated data are $\Delta_\mathrm{f}G^\circ(\mathrm{NO_2}) = +51.31$, $\Delta_\mathrm{f}G^\circ(\mathrm{N_2O_4}) = +97.89$, $\Delta_\mathrm{f}H^\circ(\mathrm{NO_2}) = +33.18$, $\Delta_\mathrm{f}H^\circ(\mathrm{N_2O_4}) = +9.16\,\mathrm{kJ\,mol^{-1}}$. Compute $\Delta_\mathrm{r}G^\circ$, $\Delta_\mathrm{r}H^\circ$, $\Delta_\mathrm{r}S^\circ$ and $K$ at $298.15\,\mathrm{K}$. What is $K$ for the same reaction written with a doubled equation?
::: solution
$$
\Delta_\mathrm{r}G^\circ = 2(51.31) - 97.89 = +4.73\,\mathrm{kJ\,mol^{-1}}, \qquad
\Delta_\mathrm{r}H^\circ = 2(33.18) - 9.16 = +57.20\,\mathrm{kJ\,mol^{-1}},
$$
$$
\Delta_\mathrm{r}S^\circ = \frac{\Delta_\mathrm{r}H^\circ - \Delta_\mathrm{r}G^\circ}{T} = \frac{52.47\times 10^{3}}{298.15} = +176.0\,\mathrm{J\,K^{-1}\,mol^{-1}},
$$
positive as it must be when one mole of gas becomes two. Then
$$
K = \exp\!\left(-\frac{4.73\times 10^{3}}{8.314 \times 298.15}\right) = e^{-1.908} = 0.148 .
$$
Doubling the equation doubles $\Delta_\mathrm{r}G^\circ$, and $K$ is squared: $K' = K^2 = 0.0220$. Equilibrium constants belong to equations, not to reactions — a factor in the stoichiometric coefficients becomes an exponent in $K$.
:::
:::

## Equilibrium: $\Delta_\mathrm{r}G^\circ = -RT\ln K$

::: proposition The equilibrium condition {#prop-drg-K}
A reacting mixture at constant $T$ and $p$ is at equilibrium exactly where
$$
\Delta_\mathrm{r}G^\circ = -RT\ln K,
$$
where $K$ is the value of the reaction quotient at equilibrium.
:::

::: proof
Equilibrium is the minimum of $G$ along $\xi$, so $\Delta_\mathrm{r}G = 0$ there. Setting $\Delta_\mathrm{r}G = \Delta_\mathrm{r}G^\circ + RT\ln Q$ to zero at $Q = K$ gives $\Delta_\mathrm{r}G^\circ = -RT\ln K$.
:::

::: definition The equilibrium constant {#def-K}
Throughout this course $K$ is the **thermodynamic equilibrium constant**: $K = \prod_i (a_i^{\mathrm{eq}})^{\nu_i}$, a product of activities raised to stoichiometric powers. Because activities are dimensionless, $K$ is dimensionless, and pure solids and liquids contribute a factor of $1$. Every formula in this lesson uses this convention; the constants $K_p$, $K_c$ and $K_x$ below are conversions of it, not rivals to it.
:::

::: proposition Conversions: $K_c$ and $K_x$ {#prop-k-forms}
For an ideal-gas reaction with $\Delta\nu = \sum_i \nu_i$,
$$
K = K_c\left(\frac{c^\circ RT}{p^\circ}\right)^{\Delta\nu} = K_x\left(\frac{p}{p^\circ}\right)^{\Delta\nu}, \qquad K_x = \prod_i x_i^{\nu_i},
$$
with $K_c = \prod_i (c_i/c^\circ)^{\nu_i}$. At $298.15\,\mathrm{K}$, $c^\circ RT/p^\circ = 24.79$.
:::

::: proof
For an ideal gas $a_i = p_i/p^\circ$. Writing $p_i = c_iRT$ gives $a_i = (c_i/c^\circ)(c^\circ RT/p^\circ)$; raising to $\nu_i$ and multiplying over $i$ collects the $K_c$ product and leaves $(c^\circ RT/p^\circ)^{\sum\nu_i}$. Writing $p_i = x_ip$ gives $a_i = x_i(p/p^\circ)$ and the second identity immediately.
:::

The factor $c^\circ RT/p^\circ = 24.79$ is the molar volume of an ideal gas at $298.15\,\mathrm{K}$ and $1\,\mathrm{bar}$ divided by $1\,\mathrm{dm^3\,mol^{-1}}$ — the same $24.8\,\mathrm{dm^3}$ of [[general-chemistry-1/gases|the gas-law chapters]]. It is why $K_p$ and $K_c$ "disagree" whenever $\Delta\nu \neq 0$: they are the same equilibrium measured on different concentration scales.

::: example How far does dinitrogen tetroxide dissociate? {#ex-n2o4-alpha}
Starting from $1\,\mathrm{mol}$ of pure $\mathrm{N_2O_4}$ at total pressure $p$, show that the degree of dissociation $\alpha$ satisfies $K = 4\alpha^2(p/p^\circ)/(1-\alpha^2)$, and evaluate $\alpha$ at $298.15\,\mathrm{K}$ for $p = 1.00\,\mathrm{bar}$ and $p = 0.10\,\mathrm{bar}$, using $K = 0.148$.
::: solution
At extent $\alpha$: $n(\mathrm{N_2O_4}) = 1-\alpha$, $n(\mathrm{NO_2}) = 2\alpha$, $n_\mathrm{tot} = 1+\alpha$, so $x(\mathrm{N_2O_4}) = (1-\alpha)/(1+\alpha)$ and $x(\mathrm{NO_2}) = 2\alpha/(1+\alpha)$. Then
$$
K = \frac{\left[x(\mathrm{NO_2})\,p/p^\circ\right]^2}{x(\mathrm{N_2O_4})\,p/p^\circ} = \frac{4\alpha^2}{(1-\alpha)(1+\alpha)}\,\frac{p}{p^\circ} = \frac{4\alpha^2\,(p/p^\circ)}{1-\alpha^2},
$$
which inverts to $\alpha = \sqrt{K/(K + 4p/p^\circ)}$. At $1.00\,\mathrm{bar}$: $\alpha = \sqrt{0.148/4.148} = 0.189$. At $0.10\,\mathrm{bar}$: $\alpha = \sqrt{0.148/0.548} = 0.520$. Dilating the gas from one bar to a tenth of a bar triples the dissociation — the system manufactures more molecules to partially undo the pressure drop. This is Le Chatelier's rule, but derived, with a number attached.
:::
:::

::: widget plot
f: sqrt(k/(k + 4*x))
x: 0.01, 10
y: 0, 1
sliders: k=0.148:0.001:2:0.001
labels: \alpha
vlines: 1
caption: Degree of dissociation $\alpha = \sqrt{K/(K+4p/p^\circ)}$ of $\mathrm{N_2O_4}$ against total pressure in bar (horizontal axis, logarithmic in spirit but linear in $p$) for the slider value of $K$. The vertical line marks $1\,\mathrm{bar}$: at $K = 0.148$ ($298.15\,\mathrm{K}$) the dissociation is $0.189$ there, $0.520$ at $0.1\,\mathrm{bar}$ and $0.061$ at $10\,\mathrm{bar}$. Raising the slider to $K = 4.53$ (the $350\,\mathrm{K}$ value) lifts every curve: temperature and pressure act through the same formula, in opposite corners of it.
:::

::: proposition Pressure, inerts and the mole-fraction trap {#prop-pressure}
For an ideal-gas reaction, changing the total pressure at constant temperature shifts the equilibrium composition by the factor
$$
K_x = K\left(\frac{p}{p^\circ}\right)^{-\Delta\nu},
$$
so compression favours the side with fewer gas molecules. Adding an inert gas at constant total pressure shifts the equilibrium in the same direction as a pressure *reduction* whenever $\Delta\nu \neq 0$; adding it at constant volume shifts nothing at all.
:::

::: proof
$K_x = K(p/p^\circ)^{-\Delta\nu}$ is the third identity of [[#prop-k-forms]]. If $\Delta\nu > 0$, raising $p$ lowers $K_x$: the product mole fraction must fall. For the inert gas, note that $Q$ is built from *partial* pressures. At constant volume, adding inert gas raises the total pressure but leaves every $p_i$ untouched, so $Q$ is unchanged and no shift occurs. At constant total pressure, adding inert gas dilutes the mixture: each $x_i$ falls, and $Q_x$ changes by a factor $(n_\mathrm{tot}^0/n_\mathrm{tot})^{\Delta\nu}$ — for $\Delta\nu > 0$ this makes $Q < K$ and the reaction moves forward, exactly as if the pressure had been dropped.
:::

::: quiz
An equilibrium mixture of $\mathrm{N_2O_4}$ and $\mathrm{NO_2}$ in a rigid steel vessel is at $298.15\,\mathrm{K}$. Argon is injected, the volume and temperature being held fixed. What happens?
- [ ] The equilibrium shifts towards $\mathrm{N_2O_4}$, because the total pressure rises.
- [x] Nothing shifts: every partial pressure $p_i$ is unchanged, so $Q$ still equals $K$.
- [ ] The equilibrium shifts towards $\mathrm{NO_2}$, because argon dilutes the mixture.
- [ ] The equilibrium constant $K$ decreases, so the mixture darkens.
::: solution
At constant volume and temperature, $p_i = n_iRT/V$ for every reacting species, and none of $n_i$, $T$, $V$ has changed; the reaction quotient is untouched and the mixture stays put. The shift people half-remember is the *constant-pressure* case, where dilution does lower the partial pressures (see [[#prop-pressure]]). $K$ itself depends only on temperature.
:::
:::

## A full equilibrium composition: ammonia at 500 K

::: example The Haber mixture at $500\,\mathrm{K}$ and $10\,\mathrm{bar}$ {#ex-nh3-500}
For $\mathrm{N_2(g)} + 3\,\mathrm{H_2(g)} \rightleftharpoons 2\,\mathrm{NH_3(g)}$, $\Delta_\mathrm{f}G^\circ(\mathrm{NH_3}) = -16.45$ and $\Delta_\mathrm{f}H^\circ(\mathrm{NH_3}) = -45.9\,\mathrm{kJ\,mol^{-1}}$. Treating $\Delta_\mathrm{r}H^\circ$ as constant, $K(500\,\mathrm{K}) = 0.187$ (the same calculation that gave $\Delta_\mathrm{r}G^\circ(500\,\mathrm{K}) = +6.98\,\mathrm{kJ\,mol^{-1}}$ in [[thermodynamics/free-energy|the Gibbs–Helmholtz example]]). A vessel is charged with $1\,\mathrm{mol}$ of $\mathrm{N_2}$ and $3\,\mathrm{mol}$ of $\mathrm{H_2}$ and held at $500\,\mathrm{K}$ and a total pressure of $10\,\mathrm{bar}$. Find the equilibrium composition.
::: solution
At extent $\xi$: $n(\mathrm{N_2}) = 1-\xi$, $n(\mathrm{H_2}) = 3(1-\xi)$, $n(\mathrm{NH_3}) = 2\xi$, $n_\mathrm{tot} = 4-2\xi$. With $\Delta\nu = -2$,
$$
K = \frac{x(\mathrm{NH_3})^2}{x(\mathrm{N_2})\,x(\mathrm{H_2})^3}\left(\frac{p}{p^\circ}\right)^{2} = \frac{(2\xi)^2(4-2\xi)^{2}}{(1-\xi)\,[3(1-\xi)]^{3}}\left(\frac{p}{p^\circ}\right)^{-2}.
$$
Setting $K = 0.187$ and $p/p^\circ = 10$ and solving gives $\xi = 0.611$, hence mole fractions $x(\mathrm{NH_3}) = 1.222/2.778 = 0.440$, $x(\mathrm{N_2}) = 0.140$, $x(\mathrm{H_2}) = 0.420$, and partial pressures $4.40$, $1.40$ and $4.20\,\mathrm{bar}$. Check: $Q = 0.440^2/(0.140\times0.420^3)\times10^{-2} = 0.187 = K$. At the same temperature but only $1\,\mathrm{bar}$ the same equation gives $\xi = 0.200$, $x(\mathrm{NH_3}) = 0.111$: a tenfold pressure raises the ammonia yield fourfold, because $K_x \propto (p/p^\circ)^{+2}$ for this $\Delta\nu = -2$ reaction. This single number is why the industrial process runs at a hundred to two hundred bar despite the cost of the steel.
:::
:::

## Temperature dependence: the van 't Hoff equation

The constant $K$ moves with temperature, and the rate at which it moves is set by one quantity: the standard reaction enthalpy.

::: theorem The van 't Hoff equation {#thm-vant-hoff}
$$
\frac{\mathrm{d}\ln K}{\mathrm{d}T} = \frac{\Delta_\mathrm{r}H^\circ}{RT^{2}}
\qquad\Longleftrightarrow\qquad
\frac{\mathrm{d}\ln K}{\mathrm{d}(1/T)} = -\frac{\Delta_\mathrm{r}H^\circ}{R}.
$$
An endothermic reaction ($\Delta_\mathrm{r}H^\circ > 0$) has $K$ rising with temperature; an exothermic one has $K$ falling.
:::

::: proof
From $\Delta_\mathrm{r}G^\circ = -RT\ln K$, $\ln K = -\Delta_\mathrm{r}G^\circ/(RT)$, so $\mathrm{d}\ln K/\mathrm{d}T = -(1/R)\,\partial(\Delta_\mathrm{r}G^\circ/T)/\partial T$. The Gibbs–Helmholtz relation, $\partial(G/T)/\partial T = -H/T^2$ applied to the reaction (proved in [[thermodynamics/free-energy|the Gibbs–Helmholtz proposition]]), turns this into $-(1/R)(-\Delta_\mathrm{r}H^\circ/T^2) = \Delta_\mathrm{r}H^\circ/(RT^2)$. The second form is the chain rule with $u = 1/T$.
:::

::: proposition The integrated van 't Hoff equation {#prop-vh-int}
If $\Delta_\mathrm{r}H^\circ$ is constant over the range $T_1$ to $T_2$,
$$
\ln\frac{K_2}{K_1} = -\frac{\Delta_\mathrm{r}H^\circ}{R}\left(\frac{1}{T_2} - \frac{1}{T_1}\right),
\qquad
\ln K = -\frac{\Delta_\mathrm{r}H^\circ}{R}\,\frac{1}{T} + \frac{\Delta_\mathrm{r}S^\circ}{R}.
$$
When $\Delta_\mathrm{r}C_p$ is not negligible, $\Delta_\mathrm{r}H^\circ(T)$ and $\Delta_\mathrm{r}S^\circ(T)$ are carried through Kirchhoff's law, $\mathrm{d}\Delta_\mathrm{r}H^\circ/\mathrm{d}T = \Delta_\mathrm{r}C_p$, before integrating.
:::

::: proof
Integrate $\mathrm{d}\ln K = (\Delta_\mathrm{r}H^\circ/R)\,\mathrm{d}T/T^2$ between the two temperatures with $\Delta_\mathrm{r}H^\circ$ outside the integral; since $\int T^{-2}\mathrm{d}T = -1/T$, the result follows. The straight-line form is the same integration from a reference state plus $\Delta_\mathrm{r}G^\circ = \Delta_\mathrm{r}H^\circ - T\Delta_\mathrm{r}S^\circ$. For the correction: substitute Kirchhoff's expression for $\Delta_\mathrm{r}H^\circ(T)$ into the theorem and integrate once more; the machinery is identical to the heat-capacity treatment of [[thermodynamics/heat-capacity-adiabatic|temperature-dependent enthalpies]].
:::

::: example Warming dinitrogen tetroxide {#ex-vh-n2o4}
With $\Delta_\mathrm{r}H^\circ = +57.20\,\mathrm{kJ\,mol^{-1}}$ for $\mathrm{N_2O_4} \rightleftharpoons 2\,\mathrm{NO_2}$ and $K(298.15\,\mathrm{K}) = 0.148$, find $K(350\,\mathrm{K})$ and the degree of dissociation at $350\,\mathrm{K}$ and $1\,\mathrm{bar}$.
::: solution
$$
\ln\frac{K(350)}{0.148} = -\frac{57.20\times 10^{3}}{8.314}\left(\frac{1}{350} - \frac{1}{298.15}\right) = -(6880)(-4.969\times 10^{-4}) = +3.42,
$$
so $K(350) = 0.148 \times 30.6 = 4.53$. The equilibrium crosses $K = 1$ near $325\,\mathrm{K}$ — the temperature at which the brown gas becomes the majority species at one bar. At $350\,\mathrm{K}$ and $1\,\mathrm{bar}$, $\alpha = \sqrt{4.53/8.53} = 0.729$: heating a sealed bulb of the gas from $25\,^\circ\mathrm{C}$ to $77\,^\circ\mathrm{C}$ deepens its colour nearly fourfold in dissociation terms. The same $\Delta_\mathrm{r}H^\circ$ explains why the dimer is the minority species in the hot exhaust of an engine and the majority in a cold morning's air.
:::
:::

::: widget plot
f: -dH*1000/(8.314*x) + dS/8.314
x: 250, 600
y: -10, 10
sliders: dH=57:0:120:1; dS=176:0:400:1
labels: \ln K
vlines: 298, 350
caption: The van 't Hoff line $\ln K = -\Delta_\mathrm{r}H^\circ/(RT) + \Delta_\mathrm{r}S^\circ/R$ against temperature for the sliders $\Delta_\mathrm{r}H^\circ$ (in $\mathrm{kJ\,mol^{-1}}$) and $\Delta_\mathrm{r}S^\circ$ (in $\mathrm{J\,K^{-1}\,mol^{-1}}$); the defaults are the $\mathrm{N_2O_4}$ dissociation values, and the vertical lines mark $298$ and $350\,\mathrm{K}$, where the line passes through $\ln K = -1.9$ and $+1.6$ — the $K = 0.148$ and $4.53$ of the worked example. The line is straight in $1/T$ and crosses zero at $T^* = \Delta_\mathrm{r}H^\circ/\Delta_\mathrm{r}S^\circ$. Slide $\Delta_\mathrm{r}H^\circ$ negative and the tilt reverses: exothermic reactions lose $K$ to heat, which is the ammonia synthesis problem in one glance.
:::

::: history From the Études to the ammonia plant {#hist-vant-hoff}
Jacobus van 't Hoff (van 't Hoff), a twenty-six-year-old lecturer in Amsterdam, published *Études de dynamique chimique* in 1884: the first systematic attempt to treat chemical equilibrium and reaction rate as one mathematical subject, including the temperature dependence of $K$ that bears his name. In 1887 he founded, with Wilhelm Ostwald (Ostwald), the *Zeitschrift für physikalische Chemie*, the discipline's first journal, and in 1896 he moved to the University of Berlin; he was the sole recipient of the first Nobel Prize in Chemistry in 1901. His tools were those of J. Willard Gibbs (Gibbs), whose *On the Equilibrium of Heterogeneous Substances* (1876, 1878) had supplied chemical potential and the phase rule in an American transaction series almost no European read — van 't Hoff himself wrote the first French exposition of them. The equation's industrial importance became a public quarrel in 1906, when Walther Nernst (Nernst) declared the ammonia equilibrium too unfavourable to exploit; Fritz Haber (Haber) recomputed the equilibrium from Nernst's own data, demonstrated high-pressure synthesis in 1909–10, and Carl Bosch (Bosch) scaled it up at BASF by 1913. In the 1920s Théophile De Donder (De Donder) recast the driving force $\Delta_\mathrm{r}G$ as the *affinity* $A = -\sum_i\nu_i\mu_i$, the language still used in non-equilibrium thermodynamics.
:::

## Le Chatelier's principle, derived and then disciplined

::: proposition Le Chatelier from the isotherm {#prop-lechatelier}
For a mixture at equilibrium, any change that makes $Q \neq K$ drives the reaction in the direction that restores $Q = K$: increasing the activity of a product (or decreasing that of a reactant) drives the reaction backwards; raising the pressure drives it towards fewer gas molecules; supplying heat drives it in the endothermic direction. A catalyst changes none of these.
:::

::: proof
Write $\Delta_\mathrm{r}G = \Delta_\mathrm{r}G^\circ + RT\ln Q = RT\ln(Q/K)$, using $\Delta_\mathrm{r}G^\circ = -RT\ln K$. If the perturbation makes $Q < K$ then $\Delta_\mathrm{r}G < 0$ and the forward reaction is spontaneous until $Q$ climbs back to $K$; if $Q > K$, the reverse. Pressure enters because $Q \propto p^{\Delta\nu}$ at fixed mole fractions; heat enters through the van 't Hoff theorem, which moves $K$ itself in the endothermic direction. A catalyst alters the rates of both directions and the path between them, but $K$ is fixed by $\Delta_\mathrm{r}G^\circ$, a difference of state functions, which a catalyst cannot touch.
:::

::: warning Le Chatelier's slogans outrun Le Chatelier {#warn-lechatelier}
"A system at equilibrium counteracts a disturbance" is folklore, not a theorem, and it fails in three places students routinely fall. (i) *Adding a reactant at constant pressure*: adding argon to the ammonia mixture at constant total pressure dilutes every species and, for $\Delta\nu < 0$, shifts the equilibrium **backwards** — the mixture counteracts the dilution, not the addition. Even adding reactive $\mathrm{N_2}$ at constant pressure can *lower* the ammonia mole fraction while raising its yield in moles; the slogan does not say which quantity you are tracking. (ii) *Adding an inert gas*: at constant volume there is no shift at all, slogan notwithstanding ([[#prop-pressure]]). (iii) *Catalysts*: the slogan tempts students to expect a shift; a catalyst moves the system to equilibrium faster and shifts nothing. The isotherm $\Delta_\mathrm{r}G = RT\ln(Q/K)$ never has an exception, because it is not a principle but an identity.
:::

::: quiz
For the ammonia synthesis $\mathrm{N_2 + 3\,H_2 \rightleftharpoons 2\,NH_3}$ at equilibrium, which single change increases the equilibrium *mole fraction* of ammonia?
- [ ] Adding argon at constant total pressure and temperature.
- [ ] Raising the temperature at constant pressure.
- [x] Raising the total pressure at constant temperature.
- [ ] Adding a catalyst.
::: solution
$K_x = K(p/p^\circ)^{-\Delta\nu} = K(p/p^\circ)^{+2}$: with $\Delta\nu = -2$, compression raises $K_x$ and the ammonia mole fraction (the $10\,\mathrm{bar}$ example above: $0.111 \to 0.440$). Argon at constant pressure dilutes and shifts backwards; the reaction is exothermic, so heating lowers $K$; a catalyst changes only the rate of arrival.
:::
:::

## Coupled reactions: the arithmetic of driving forces

The deepest use of $\Delta_\mathrm{r}G^\circ = -RT\ln K$ is that free energies **add** where equilibria merely multiply. A reaction that is hopeless alone becomes routine when it shares an intermediate with a generous one.

::: proposition Coupling {#prop-coupling}
If a reaction is the sum of reactions 1 and 2, then $\Delta_\mathrm{r}G^\circ = \Delta_{\mathrm{r}1}G^\circ + \Delta_{\mathrm{r}2}G^\circ$ and $K = K_1 K_2$. More generally, multiplying a reaction by $c$ raises $K$ to the power $c$.
:::

::: proof
$\Delta_\mathrm{r}G^\circ$ is a sum $\sum_i\nu_i\mu_i^\circ$ over the net stoichiometry; adding reactions adds the $\nu_i$, so the sums add. Exponentiating $-\left(\Delta_{\mathrm{r}1}G^\circ + \Delta_{\mathrm{r}2}G^\circ\right)/RT$ gives $K_1K_2$; scaling all $\nu_i$ by $c$ scales the sum by $c$ and raises $K$ to $c$.
:::

::: example Reducing iron ore with carbon monoxide {#ex-fe2o3}
Hematite, $\mathrm{Fe_2O_3}$, will not give up its oxygen to iron at $298.15\,\mathrm{K}$: for $\mathrm{Fe_2O_3(s)} \rightarrow 2\,\mathrm{Fe(s)} + \tfrac32\mathrm{O_2(g)}$, $\Delta_\mathrm{r}G^\circ = +742.2\,\mathrm{kJ\,mol^{-1}}$ and $K = 9.2\times 10^{-131}$. Couple it to $\mathrm{CO(g)} + \tfrac12\mathrm{O_2(g)} \rightarrow \mathrm{CO_2(g)}$, whose $\Delta_\mathrm{r}G^\circ = (-394.4) - (-137.2) = -257.2\,\mathrm{kJ\,mol^{-1}}$ gives $K_\mathrm{ox} = 1.15\times 10^{45}$. Find $\Delta_\mathrm{r}G^\circ$ and $K$ for $\mathrm{Fe_2O_3(s)} + 3\,\mathrm{CO(g)} \rightarrow 2\,\mathrm{Fe(s)} + 3\,\mathrm{CO_2(g)}$, and the gas ratio $p(\mathrm{CO_2})/p(\mathrm{CO})$ that keeps iron from oxidising.
::: solution
The net reaction is the decomposition plus three times the oxidation:
$$
\Delta_\mathrm{r}G^\circ = 742.2 + 3(-257.2) = -29.4\,\mathrm{kJ\,mol^{-1}}, \qquad
K = (9.2\times 10^{-131})(1.15\times 10^{45})^{3} = 1.4\times 10^{5}.
$$
A reaction with $K = 10^{-131}$ has become one with $K = 10^{5}$ — a change of $10^{136}$ bought with three molecules of carbon monoxide. Since the solids have activity $1$, $K = [p(\mathrm{CO_2})/p(\mathrm{CO})]^3$, so rust-free iron sits under an atmosphere with $p(\mathrm{CO_2})/p(\mathrm{CO}) = K^{1/3} = 52$: a blast furnace is this inequality held far from equilibrium by a river of gas. The same arithmetic runs your mitochondria — ATP hydrolysis pays for phosphorylations with $\Delta_\mathrm{r}G^\circ > +30\,\mathrm{kJ\,mol^{-1}}$ — and, with electrons replacing carbon monoxide, the electrolysis and refining of [[electrochemistry/cell-thermodynamics|electrochemical cells]], where $\Delta_\mathrm{r}G^\circ = -\nu F E^\circ$ is the same ledger in volts.
:::
:::

## An algorithm for equilibrium calculations

::: algorithm Computing an equilibrium composition {#algo-equilibrium}
Given a balanced equation, $T$, $p$ (or $V$) and a starting charge:
1. Tabulate $\Delta_\mathrm{f}G^\circ$ and $\Delta_\mathrm{f}H^\circ$ from one table; compute $\Delta_\mathrm{r}G^\circ(T)$ (van 't Hoff if $T \neq 298.15\,\mathrm{K}$) and $K = e^{-\Delta_\mathrm{r}G^\circ/RT}$.
2. Write the mole balance $n_i = n_{i,0} + \nu_i\xi$ and the total $n_\mathrm{tot}$.
3. Build $Q(\xi)$ from activities: $p_i/p^\circ = x_ip/p^\circ$ for gases, $1$ for pure condensed phases, $c_i/c^\circ$ for dilute solutes.
4. Solve $Q(\xi) = K$ for $\xi$ (a polynomial if the stoichiometry is simple; otherwise one iteration of bisection suffices, since $Q$ is monotone in $\xi$).
5. Report $x_i$, $p_i$, and check by substituting back into $Q$.
:::

Steps 1–4 are exactly the worked ammonia example; step 5 catches the classic sign and exponent slips. For reactions in solution the same algorithm, with $K_a$-scale activities, generates every acid–base and solubility equilibrium of [[thermodynamics/ions-in-solution|ions in solution]].

## Where this leads

The isotherm and the van 't Hoff equation are the whole engine of this course; everything after is fuel. Set the reaction to a phase change and $\Delta_\mathrm{r}G^\circ = -RT\ln K$ becomes the Clausius–Clapeyron and vapour-pressure equations of [[thermodynamics/phase-equilibria|phase equilibria]]; set it to an electron transfer and it becomes $E^\circ = -\Delta_\mathrm{r}G^\circ/\nu F$ in [[electrochemistry/cell-thermodynamics|cell thermodynamics]]; set it to dissolving a salt or splitting an acid and it becomes the $K_\mathrm{sp}$ and $\mathrm{p}K_\mathrm{a}$ arithmetic of [[thermodynamics/ions-in-solution|ions in solution]]. Non-ideality enters by replacing $p_i/p^\circ$ with $a_i = \gamma_i x_i$ — the fugacity and activity-coefficient world of [[statistical-thermodynamics/real-gases-liquids|real gases and liquids]] and, for gases, the corrections behind [[general-chemistry-1/gases|the ideal-gas law]]. The molecular meaning of $K$ — why the same number falls out of partition functions — belongs to statistical mechanics; the elementary version of the bookkeeping is [[general-chemistry-2/entropy-free-energy|free energy for beginners]].

::: summary
- The extent of reaction $\xi$ reduces a reacting mixture to one coordinate; $\Delta_\mathrm{r}G = \sum_i\nu_i\mu_i = (\partial G/\partial\xi)_{T,p}$ is the slope of $G$ along it.
- The reaction isotherm $\Delta_\mathrm{r}G = \Delta_\mathrm{r}G^\circ + RT\ln Q$ is the actual driving force; $\Delta_\mathrm{r}G^\circ$ alone is only the standard-state bookkeeping entry.
- Equilibrium is $\Delta_\mathrm{r}G = 0$, hence $\Delta_\mathrm{r}G^\circ = -RT\ln K$, with $K$ built from activities and therefore dimensionless; $K$ belongs to the equation as written.
- $K = K_c(c^\circ RT/p^\circ)^{\Delta\nu} = K_x(p/p^\circ)^{\Delta\nu}$: concentration and mole-fraction constants are conversions, and $K_x$ is where pressure acts.
- The van 't Hoff equation $\mathrm{d}\ln K/\mathrm{d}T = \Delta_\mathrm{r}H^\circ/RT^2$ (Gibbs–Helmholtz in disguise) makes $\ln K$ linear in $1/T$ with slope $-\Delta_\mathrm{r}H^\circ/R$; endothermic reactions gain $K$ with heat.
- Le Chatelier's rule is the isotherm read off in words — reliable only as $Q$ versus $K$, and wrong for inerts at constant volume, for constant-pressure dilution, and for catalysts, which never move $K$.
- Coupled reactions add $\Delta_\mathrm{r}G^\circ$ and multiply $K$: the mechanism by which carbon monoxide reduces iron oxide and cells pay for impossible chemistry.
:::

## Exercises

::: exercise Equilibrium constant from tabulated free energies {level=1 check="0.148"}
Using $\Delta_\mathrm{f}G^\circ(\mathrm{NO_2}) = +51.31$ and $\Delta_\mathrm{f}G^\circ(\mathrm{N_2O_4}) = +97.89\,\mathrm{kJ\,mol^{-1}}$, compute $K$ at $298.15\,\mathrm{K}$ for $\mathrm{N_2O_4(g)} \rightleftharpoons 2\,\mathrm{NO_2(g)}$. Enter $K$ to three significant figures.
::: solution
$\Delta_\mathrm{r}G^\circ = 2(51.31) - 97.89 = +4.73\,\mathrm{kJ\,mol^{-1}}$, so $K = \exp[-4730/(8.314\times298.15)] = e^{-1.908} = 0.148$. A small positive $\Delta_\mathrm{r}G^\circ$ means a mixture at equilibrium that is mostly, but not overwhelmingly, $\mathrm{N_2O_4}$.
:::
:::

::: exercise From $K$ to $K_c$ {level=1 check="0.00598"}
For the same reaction $\mathrm{N_2O_4(g)} \rightleftharpoons 2\,\mathrm{NO_2(g)}$ at $298.15\,\mathrm{K}$ with $K = 0.148$, compute $K_c = [c(\mathrm{NO_2})/c^\circ]^2/[c(\mathrm{N_2O_4})/c^\circ]$. Enter $K_c$ to three significant figures.
::: solution
$\Delta\nu = +1$, so $K_c = K(p^\circ/c^\circ RT) = K/24.79 = 0.148/24.79 = 0.00598$. The factor $24.79$ is the ideal-gas molar volume in $\mathrm{dm^3\,mol^{-1}}$; $K_c$ and $K$ coincide only when $\Delta\nu = 0$.
:::
:::

::: exercise Dissociation of phosphorus pentachloride {level=1 check="0.622"}
For $\mathrm{PCl_5(g)} \rightleftharpoons \mathrm{PCl_3(g)} + \mathrm{Cl_2(g)}$, $K = 1.26$ at $523\,\mathrm{K}$. An evacuated flask is charged with pure $\mathrm{PCl_5}$ and held at $523\,\mathrm{K}$ until the total pressure is $2.00\,\mathrm{bar}$. Compute the degree of dissociation. Enter $\alpha$ to three significant figures.
::: solution
Starting from $1\,\mathrm{mol}$: at extent $\alpha$, $n_\mathrm{tot} = 1+\alpha$ and $K = \alpha^2(p/p^\circ)/(1-\alpha^2)$ (here the stoichiometry is $1:1:1$, so there is no factor of four). Then $\alpha^2 = K/(K + p/p^\circ) = 1.26/3.26 = 0.3865$ and $\alpha = 0.622$.
:::
:::

::: exercise The van 't Hoff leap {level=2 check="4.53"}
For $\mathrm{N_2O_4(g)} \rightleftharpoons 2\,\mathrm{NO_2(g)}$, $\Delta_\mathrm{r}H^\circ = +57.20\,\mathrm{kJ\,mol^{-1}}$ and $K = 0.148$ at $298.15\,\mathrm{K}$. Compute $K$ at $350\,\mathrm{K}$, assuming $\Delta_\mathrm{r}H^\circ$ constant. Enter $K$ to three significant figures.
::: solution
$\ln[K(350)/0.148] = -(57\,200/8.314)(1/350 - 1/298.15) = -(6880)(-4.969\times10^{-4}) = 3.42$, so $K(350) = 0.148\,e^{3.42} = 4.53$. A $52\,\mathrm{K}$ rise multiplies $K$ by thirty: the leverage of temperature on equilibria with large $\Delta_\mathrm{r}H^\circ$ is enormous, and it is entirely in the exponent.
:::
:::

::: exercise Ammonia yield at one bar {level=2 check="0.111"}
For $\mathrm{N_2(g)} + 3\,\mathrm{H_2(g)} \rightleftharpoons 2\,\mathrm{NH_3(g)}$ at $500\,\mathrm{K}$, $K = 0.187$. A $1:3$ mixture of $\mathrm{N_2}$ and $\mathrm{H_2}$ is held at $500\,\mathrm{K}$ and a total pressure of $1.00\,\mathrm{bar}$. Compute the equilibrium mole fraction of ammonia. Enter $x(\mathrm{NH_3})$ to three significant figures.
::: solution
With $n_\mathrm{tot} = 4-2\xi$ and $\Delta\nu = -2$: $K = \dfrac{(2\xi)^2(4-2\xi)^2}{(1-\xi)[3(1-\xi)]^3}(p/p^\circ)^{-2}$. At $p/p^\circ = 1$ this gives $\xi = 0.200$ and $x(\mathrm{NH_3}) = 2\xi/(4-2\xi) = 0.400/3.600 = 0.111$. Against the $0.440$ computed at $10\,\mathrm{bar}$, the pressure dependence is $K_x \propto (p/p^\circ)^2$ made numerical.
:::
:::

::: exercise Argon at the margin {level=2 check="0.250"}
For $\mathrm{N_2O_4(g)} \rightleftharpoons 2\,\mathrm{NO_2(g)}$ at $298.15\,\mathrm{K}$ ($K = 0.148$), a vessel holds $1\,\mathrm{mol}$ of $\mathrm{N_2O_4}$ together with $1\,\mathrm{mol}$ of argon at a total pressure of $1.00\,\mathrm{bar}$. Compute the degree of dissociation of the tetroxide. Enter $\alpha$ to three significant figures.
::: solution
Now $n_\mathrm{tot} = (1-\alpha) + 2\alpha + 1 = 2+\alpha$, so $K = 4\alpha^2(p/p^\circ)/[(2+\alpha)(1-\alpha)]$. With $K = 0.148$ and $p/p^\circ = 1$: $4.148\alpha^2 + 0.148\alpha - 0.296 = 0$, whose positive root is $\alpha = 0.250$. Against $0.189$ without argon: at constant total pressure the inert dilutes the reacting species and shifts the equilibrium forward, exactly as a pressure reduction would.
:::
:::

::: exercise Derive the isotherm and the constant {level=3}
Starting only from $\Delta_\mathrm{r}G = \sum_i\nu_i\mu_i$ and $\mu_i = \mu_i^\circ + RT\ln a_i$ for each component of an ideal mixture, derive $\Delta_\mathrm{r}G = \Delta_\mathrm{r}G^\circ + RT\ln Q$. Then show that $\Delta_\mathrm{r}G = 0$ at the minimum of $G(\xi)$ implies $\Delta_\mathrm{r}G^\circ = -RT\ln K$, and explain why $K$ is dimensionless and why doubling the equation squares it.
::: solution
$\Delta_\mathrm{r}G = \sum_i\nu_i\mu_i^\circ + RT\sum_i\nu_i\ln a_i = \Delta_\mathrm{r}G^\circ + RT\ln\prod_ia_i^{\nu_i} = \Delta_\mathrm{r}G^\circ + RT\ln Q$. The minimum condition is $(\partial G/\partial\xi)_{T,p} = \sum_i\nu_i\mu_i = 0$ (the chain rule on $\mathrm{d}G = \sum_i\mu_i\mathrm{d}n_i$ with $\mathrm{d}n_i = \nu_i\mathrm{d}\xi$), so at equilibrium $0 = \Delta_\mathrm{r}G^\circ + RT\ln Q^\mathrm{eq}$, i.e. $\Delta_\mathrm{r}G^\circ = -RT\ln K$. $K$ is dimensionless because every $a_i$ is a ratio ($p_i/p^\circ$, $c_i/c^\circ$, or $1$), so $K$ is a product of pure numbers; doubling the equation doubles every $\nu_i$, which doubles $\Delta_\mathrm{r}G^\circ$ and hence squares $K = e^{-\Delta_\mathrm{r}G^\circ/RT}$.
:::
:::

::: exercise The blast furnace, quantitatively {level=3 check="52.1"}
Using $\Delta_\mathrm{f}G^\circ$: $\mathrm{Fe_2O_3(s)}\ -742.2$, $\mathrm{CO(g)}\ -137.2$, $\mathrm{CO_2(g)}\ -394.4\,\mathrm{kJ\,mol^{-1}}$ at $298.15\,\mathrm{K}$, compute $\Delta_\mathrm{r}G^\circ$ and $K$ for $\mathrm{Fe_2O_3(s)} + 3\,\mathrm{CO(g)} \rightarrow 2\,\mathrm{Fe(s)} + 3\,\mathrm{CO_2(g)}$, and the minimum ratio $p(\mathrm{CO_2})/p(\mathrm{CO})$ at which iron is *not* oxidised by the gas. Enter the ratio to three significant figures.
::: solution
$\Delta_\mathrm{r}G^\circ = [3(-394.4)] - [-742.2 + 3(-137.2)] = -1183.2 + 1153.8 = -29.4\,\mathrm{kJ\,mol^{-1}}$, so $K = e^{29\,400/2478.8} = 1.42\times10^{5}$. The solids have activity $1$, so $K = [p(\mathrm{CO_2})/p(\mathrm{CO})]^3$ and the boundary ratio is $K^{1/3} = 52.1$. Below it iron is reduced (or stays metallic); above it carbon dioxide oxidises the iron. The same decomposition of the net reaction — $K = K_\mathrm{dec}K_\mathrm{ox}^3$ with $K_\mathrm{dec} = 9.2\times10^{-131}$ and $K_\mathrm{ox} = 1.15\times10^{45}$ — shows the coupling arithmetic: $10^{-131}$ times $(10^{45})^3$ is $10^{5}$.
:::
:::
