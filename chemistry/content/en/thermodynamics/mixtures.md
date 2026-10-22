Mix $50.0\ \mathrm{cm^3}$ of ethanol with $50.0\ \mathrm{cm^3}$ of water at $20\,^\circ\mathrm{C}$ and you do not get $100.0\ \mathrm{cm^3}$: you get about $96.5\ \mathrm{cm^3}$, and the flask grows warm while you pour. Mass is additive — $39.5\ \mathrm{g}$ plus $49.9\ \mathrm{g}$ is $89.4\ \mathrm{g}$, always — but volume, and with it every other extensive property, is not. The molecules of a mixture do not carry their pure-substance properties unchanged into company: hydrogen bonding reorganises both partners, packing improves, and the whole becomes smaller than the sum of its parts. Everything in this chapter grows out of that single fact. Once properties of mixtures are not sums of pure-substance properties, we need new quantities to describe how they *do* add — the partial molar quantities — and a new dependence of chemical potential on composition, which turns out to be a logarithm. From that logarithm come Raoult's and Henry's laws, the spontaneous mixing of all ideal solutions, the reason salt melts ice and roads, the osmotic pressure that keeps cells from bursting, and the shape of every distillation column ever built.

The machinery we import is the chemical potential of [[thermodynamics/free-energy]], $\mu_i = \left(\partial G/\partial n_i\right)_{T,p,n_{j\ne i}}$, the phase rule and the condition $\mu_\alpha = \mu_\beta$ of [[thermodynamics/phase-equilibria]], and the entropy accounting of [[thermodynamics/second-law]]. The sign convention is unchanged: $\Delta U = q + w$ with $w$ the work done **on** the system, and $p^\circ = 1\ \mathrm{bar}$.

## Partial molar quantities

::: definition Partial molar quantity {#def-partial-molar}
The **partial molar quantity** $\bar{J}_i$ of component $i$ in a mixture is the change in an extensive property $J$ (volume, internal energy, enthalpy, entropy, Gibbs energy, heat capacity, …) when one mole of $i$ is added to a large amount of the mixture, at constant temperature, pressure and all other amounts:
$$
\bar{J}_i \equiv \left(\frac{\partial J}{\partial n_i}\right)_{T,p,n_{j\ne i}} .
$$
The subscript bar belongs to the symbol; $\bar{V}_i$ is a **partial molar volume**, $\bar{H}_i$ a **partial molar enthalpy**. The chemical potential $\mu_i$ is simply the partial molar Gibbs energy, $\bar{G}_i = \mu_i$ — the reason it appeared in [[thermodynamics/free-energy]] before mixtures did.
:::

Three features of the definition deserve to be internalised before any calculation. First, $\bar{J}_i$ is an intensive property: it depends on composition, not on how much mixture there is, and it changes as the mixture is diluted. Second, the derivative is taken at constant $T$ *and* $p$, because that is the natural variable set of $G$ and the one the laboratory controls. Third, a partial molar volume need not be positive, nor even close to the pure molar volume: $\bar{V}_2$ of a solute can be negative — magnesium sulfate in water has $\bar{V}_2 < 0$ at moderate concentrations, because the electrostricted water around $\mathrm{Mg^{2+}}$ occupies less room than the free water it came from. A solution can *shrink* when you dissolve more solute in it.

::: proposition Euler expansion of an extensive property {#prop-euler}
Every extensive property $J$ of a mixture is the sum of its partial molar contributions,
$$
J = \sum_i n_i \bar{J}_i ,
$$
so that the mixture property is recovered by weighting each $\bar{J}_i$ by the amount of the component that carries it. For the volume, $V = n_\mathrm{A}\bar{V}_\mathrm{A} + n_\mathrm{B}\bar{V}_\mathrm{B} + \cdots$.
:::

::: proof
$J(T, p, n_1, n_2, \ldots)$ is extensive: multiplying all the amounts at fixed $T$, $p$ and composition multiplies $J$ by the same factor, so at fixed $T$ and $p$ it is a homogeneous function of degree one in the $n_i$. Its differential at constant $T$ and $p$ is
$$
\mathrm{d}J = \sum_i \left(\frac{\partial J}{\partial n_i}\right)_{T,p,n_{j\ne i}} \mathrm{d}n_i = \sum_i \bar{J}_i\,\mathrm{d}n_i .
$$
Now build the mixture by increasing every $n_i$ from zero to its final value along the path $n_i(\lambda) = \lambda n_i$, $0 \le \lambda \le 1$, so $\mathrm{d}n_i = n_i\,\mathrm{d}\lambda$. Because composition never changes along this path, every $\bar{J}_i$ is constant on it, and
$$
J = \int_0^1 \sum_i \bar{J}_i\, n_i\,\mathrm{d}\lambda = \sum_i n_i \bar{J}_i . \qquad \blacksquare
$$
Applied to $G$, the expansion reads $G = \sum_i n_i \mu_i$ — the chemical potential is the chemical potential *per mole of component*, not per mole of mixture.
:::

::: proposition The Gibbs–Duhem equation {#prop-gibbs-duhem}
At constant temperature and pressure the partial molar quantities of the components of a mixture cannot vary independently with composition; they are linked by
$$
\sum_i n_i\,\mathrm{d}\bar{J}_i = 0 \qquad (\text{constant } T, p),
$$
the **Gibbs–Duhem equation**. In particular, $\sum_i n_i\,\mathrm{d}\mu_i = 0$ at constant $T$ and $p$: if the chemical potential of one component rises with composition, another's must fall.
:::

::: proof
Differentiate the Euler expansion $J = \sum_i n_i \bar{J}_i$ at constant $T$ and $p$:
$$
\mathrm{d}J = \sum_i n_i\,\mathrm{d}\bar{J}_i + \sum_i \bar{J}_i\,\mathrm{d}n_i .
$$
But the same differential read from the definition of $\bar{J}_i$ is $\mathrm{d}J = \sum_i \bar{J}_i\,\mathrm{d}n_i$. Subtracting the two expressions leaves $\sum_i n_i\,\mathrm{d}\bar{J}_i = 0$. For $J = G$ this is $\sum_i n_i\,\mathrm{d}\mu_i = 0$, which is the form used throughout [[thermodynamics/phase-equilibria]] and [[thermodynamics/reaction-equilibrium]]; it is the mathematical content of the statement that equilibrium conditions constrain intensive variables against one another.
:::

::: example Volume contraction of ethanol and water {#ex-contraction}
At $20\,^\circ\mathrm{C}$ the densities (CRC) are $\rho(\text{ethanol}) = 0.7893\ \mathrm{g\,cm^{-3}}$ and $\rho(\text{water}) = 0.9982\ \mathrm{g\,cm^{-3}}$. Mix $50.0\ \mathrm{cm^3}$ of each: the final volume is about $96.5\ \mathrm{cm^3}$. Find the mole fractions and the volume of contraction, and explain why the result is not a contradiction of additivity of mass.
::: solution
The masses are $m_\mathrm{E} = 50.0 \times 0.7893 = 39.5\ \mathrm{g}$ and $m_\mathrm{W} = 50.0 \times 0.9982 = 49.9\ \mathrm{g}$, so with $M_\mathrm{E} = 46.07\ \mathrm{g\,mol^{-1}}$ and $M_\mathrm{W} = 18.02\ \mathrm{g\,mol^{-1}}$,
$$
n_\mathrm{E} = \frac{39.5}{46.07} = 0.857\ \mathrm{mol}, \qquad
n_\mathrm{W} = \frac{49.9}{18.02} = 2.77\ \mathrm{mol}, \qquad
x_\mathrm{E} = \frac{0.857}{3.627} = 0.236 .
$$
The contraction is $\Delta V = 96.5 - 100.0 = -3.5\ \mathrm{cm^3}$, about $3.5\,\%$ of the total — large enough to see, and caused by the hydrogen-bonded network of water accommodating ethanol's -OH group while its ethyl groups pack into the structure's gaps. Mass is additive because it is a sum over molecules; volume is not, because it is a property of how the molecules sit *together*. In the Euler expansion, $V = n_\mathrm{E}\bar{V}_\mathrm{E} + n_\mathrm{W}\bar{V}_\mathrm{W}$ with $\bar{V}_\mathrm{E} \approx 55\ \mathrm{cm^3\,mol^{-1}}$ at this composition, well below ethanol's pure molar volume of $58.3\ \mathrm{cm^3\,mol^{-1}}$.
:::
:::

::: example The intercept method {#ex-intercept}
A smooth fit to the measured volumes of solutions of a salt in $1000\ \mathrm{g}$ of water at $25\,^\circ\mathrm{C}$ has the form $V/\mathrm{cm^3} = 1000.0 + 34.60\,n_\mathrm{B} - 0.940\,n_\mathrm{B}^{3/2}$, with $n_\mathrm{B}$ the amount of salt in moles (illustrative numbers of the kind tabulated in solution-data compilations). Find $\bar{V}_\mathrm{B}$ and $\bar{V}_\mathrm{A}$ at $n_\mathrm{B} = 2.00\ \mathrm{mol}$.
::: solution
By definition, $\bar{V}_\mathrm{B} = \left(\partial V/\partial n_\mathrm{B}\right)_{T,p,n_\mathrm{A}}$, so
$$
\bar{V}_\mathrm{B} = 34.60 - 1.5\times 0.940\, n_\mathrm{B}^{1/2} = 34.60 - 1.410\times\sqrt{2.00} = 34.60 - 1.99 = 32.6\ \mathrm{cm^3\,mol^{-1}} .
$$
$\bar{V}_\mathrm{A}$ does **not** need a second fit: the Gibbs–Duhem equation at constant $T$ and $p$, $n_\mathrm{A}\,\mathrm{d}\bar{V}_\mathrm{A} + n_\mathrm{B}\,\mathrm{d}\bar{V}_\mathrm{B} = 0$, says that once $\bar{V}_\mathrm{B}$ is known as a function of composition, $\bar{V}_\mathrm{A}$ is fixed up to a constant — and the Euler expansion supplies it. With $n_\mathrm{A} = 1000/18.02 = 55.5\ \mathrm{mol}$ and $V = 1000.0 + 34.60\times2.00 - 0.940\times2.00^{3/2} = 1066.5\ \mathrm{cm^3}$,
$$
\bar{V}_\mathrm{A} = \frac{V - n_\mathrm{B}\bar{V}_\mathrm{B}}{n_\mathrm{A}}
= \frac{1066.5 - 2.00\times 32.6}{55.5} = \frac{1001.3}{55.5} = 18.0\ \mathrm{cm^3\,mol^{-1}} ,
$$
essentially the molar volume of pure water, as it must be in a solution this dilute. Graphically, plotting $V$ against $n_\mathrm{B}$ at fixed $n_\mathrm{A}$: the slope at a point is $\bar{V}_\mathrm{B}$ and the intercept on the $n_\mathrm{A}$ axis divided by $n_\mathrm{A}$ is $\bar{V}_\mathrm{A}$ — the classical **intercept method**, which is why one measured curve yields *both* partial molar volumes.
:::
:::

::: quiz
Which statement about partial molar quantities is correct?
- [x] A partial molar volume can be negative: dissolving more solute can shrink the solution.
- [ ] Partial molar volumes are always between zero and the pure molar volume of the component.
- [ ] $\bar{J}_i$ depends on how much mixture is present, because it is defined through an extensive $J$.
- [ ] The partial molar Gibbs energy of a component is different in principle from its chemical potential.
::: solution
Electrolytes routinely have negative partial molar volumes at some concentrations (magnesium sulfate is the textbook case), so the first is right and the second wrong. $\bar{J}_i$ is intensive — it depends on composition, not size, which kills the third. And $\bar{G}_i = \mu_i$ *is* the chemical potential, so the fourth is wrong by definition.
:::
:::

## The chemical potential of a component in a mixture

For an ideal gas the argument of [[thermodynamics/free-energy]] generalises component by component. Each gas in a mixture of ideal gases expands into the whole volume as if the others were absent (Joule's law, [[thermodynamics/first-law]]), so its chemical potential depends only on its own partial pressure, with Dalton's law of [[general-chemistry-1/gases]] supplying $p_i = x_i p$:
$$
\mu_\mathrm{A}(T, p_\mathrm{A}) = \mu_\mathrm{A}^\circ(T) + RT\ln\frac{p_\mathrm{A}}{p^\circ} .
$$

::: example Chemical potential of a component of an ideal gas mixture {#ex-mu-gas}
Air at $298.15\ \mathrm{K}$ and $1.00\ \mathrm{bar}$ total pressure has $x(\mathrm{N_2}) = 0.78$. By how much is the chemical potential of $\mathrm{N_2}$ in air below that of pure $\mathrm{N_2}$ at the same $T$ and $p = 1.00\ \mathrm{bar}$?
::: solution
$p(\mathrm{N_2}) = 0.78\ \mathrm{bar}$, so
$$
\mu_\mathrm{A} - \mu_\mathrm{A}^{*} = RT\ln\frac{p_\mathrm{A}}{p} = 8.314 \times 298.15 \times \ln 0.78 = -616\ \mathrm{J\,mol^{-1}} .
$$
The negative sign is the free energy of mixing: nitrogen is *more* stable dispersed in air than bottled pure at the same pressure, by $0.62\ \mathrm{kJ\,mol^{-1}}$. This one logarithm is why gases mix spontaneously in all proportions and why separating them costs work — the air-separation industry is the reverse of this line.
:::
:::

Liquids have no such simple starting point, so ideal behaviour in solution is *defined* through the measurable vapour pressure.

::: definition Ideal solution and Raoult's law {#def-ideal-solution}
A liquid mixture is an **ideal solution** if every component obeys **Raoult's law** over the whole composition range: the partial vapour pressure of each component is its pure vapour pressure times its mole fraction,
$$
p_\mathrm{A} = x_\mathrm{A}\,p_\mathrm{A}^{*}, \qquad p_\mathrm{B} = x_\mathrm{B}\,p_\mathrm{B}^{*},
$$
where $p_\mathrm{A}^{*}$ is the vapour pressure of pure A at the temperature of the mixture. Benzene–toluene, hexane–heptane and many pairs of similar molecules are ideal to within a few per cent; the total pressure is then $p = x_\mathrm{A} p_\mathrm{A}^{*} + x_\mathrm{B} p_\mathrm{B}^{*}$, a straight line between $p_\mathrm{B}^{*}$ and $p_\mathrm{A}^{*}$.
:::

::: proposition Chemical potential of an ideal solution {#prop-mu-solution}
For a component A of an ideal solution, with the pure liquid at the same $T$ and $p$ as the standard state ($\mu_\mathrm{A}^{*} \equiv \mu_\mathrm{A}^\circ$ for the liquid),
$$
\mu_\mathrm{A} = \mu_\mathrm{A}^{*} + RT \ln x_\mathrm{A} .
$$
The logarithm is the same one that appears for ideal gases — it is the entropy of mixing, not any energetic effect, speaking.
:::

::: proof
The vapour above the solution is in equilibrium with the liquid, so $\mu_\mathrm{A}(\text{liq}) = \mu_\mathrm{A}(\text{vap})$. Treating the vapour as ideal and using the gas expression at partial pressure $p_\mathrm{A}$,
$$
\mu_\mathrm{A}(\text{liq}) = \mu_\mathrm{A}^{\circ} + RT\ln\frac{p_\mathrm{A}}{p^\circ} .
$$
For the pure liquid in equilibrium with its own vapour at $p_\mathrm{A}^{*}$ the same equation reads $\mu_\mathrm{A}^{*} = \mu_\mathrm{A}^{\circ} + RT\ln(p_\mathrm{A}^{*}/p^\circ)$. Subtracting, $\mu_\mathrm{A}(\text{liq}) - \mu_\mathrm{A}^{*} = RT\ln(p_\mathrm{A}/p_\mathrm{A}^{*})$, and Raoult's law turns the pressure ratio into $x_\mathrm{A}$. The proof shows what ideal really costs: it assumes the vapour is ideal and that Raoult's law holds — everything else follows.
:::

## The thermodynamics of mixing

::: proposition Thermodynamic functions of mixing for an ideal solution {#prop-mixing}
When $n = \sum_i n_i$ moles of pure liquids form an ideal solution at constant $T$ and $p$, with $x_i = n_i/n$,
$$
\Delta_\text{mix}G = nRT\sum_i x_i \ln x_i < 0, \qquad
\Delta_\text{mix}S = -nR\sum_i x_i \ln x_i > 0,
$$
$$
\Delta_\text{mix}H = 0, \qquad \Delta_\text{mix}V = 0, \qquad
\Delta_\text{mix}U = 0 .
$$
Every ideal solution forms spontaneously from its pure liquids at every composition, with no heat and no volume change; the entire driving force is the entropy of mixing.
:::

::: proof
$\Delta_\text{mix}G = G(\text{solution}) - \sum_i n_i \mu_{\mathrm{m},i}^{*}$; inserting $\mu_i = \mu_i^{*} + RT\ln x_i$ gives $\Delta_\text{mix}G = RT\sum_i n_i \ln x_i$, and each $\ln x_i < 0$ makes it negative. Because $\Delta_\text{mix}G$ is directly proportional to $T$, $\Delta_\text{mix}S = -\partial(\Delta_\text{mix}G)/\partial T = -nR\sum_i x_i\ln x_i$, and $G = H - TS$ then forces $\Delta_\text{mix}H = \Delta_\text{mix}G + T\Delta_\text{mix}S = 0$: an ideal solution has no heat of mixing, exactly as Raoult's law requires. $\Delta_\text{mix}V = \partial\Delta_\text{mix}G/\partial p = 0$ because $\Delta_\text{mix}G$ contains no pressure term, and $\Delta_\text{mix}U = \Delta_\text{mix}H - \Delta(pV) = 0$. The entropy formula is identical to $\Delta_\text{mix}S = -nR\sum x_i\ln x_i$ derived for ideal gases in [[thermodynamics/second-law]] — mixing is entropy first, and the state of matter second.
:::

::: example Mixing benzene and toluene {#ex-mix-benzene}
$2.00\ \mathrm{mol}$ of benzene is mixed with $3.00\ \mathrm{mol}$ of toluene at $298.15\ \mathrm{K}$; the pair is ideal to within a few per cent. Find $\Delta_\text{mix}G$, $\Delta_\text{mix}S$, $\Delta_\text{mix}H$ and $\Delta_\text{mix}V$.
::: solution
$x_\mathrm{B} = 0.400$, $x_\mathrm{T} = 0.600$, so $\sum x_i\ln x_i = 0.400\ln 0.400 + 0.600\ln 0.600 = -0.3665 - 0.3065 = -0.6730$. Then
$$
\Delta_\text{mix}G = 5.00 \times 8.314 \times 298.15 \times (-0.6730) = -8.34\ \mathrm{kJ},
$$
$$
\Delta_\text{mix}S = +28.0\ \mathrm{J\,K^{-1}}, \qquad \Delta_\text{mix}H = 0, \qquad \Delta_\text{mix}V = 0 .
$$
Eight and a half kilojoules of free energy appear simply by letting two similar liquids share a flask — enough to run machinery in principle, and in practice the reason distillation must spend energy to undo the mixing.
:::
:::

::: widget plot
f: x*log(x) + (1-x)*log(1-x) + chi*x*(1-x)
x: 0.01, 0.99
y: -0.75, 1.0
sliders: chi=0:0:6:0.1
vlines: 0.5
labels: \Delta_\text{mix}G_\mathrm{m}/RT
caption: The molar Gibbs energy of mixing in units of $RT$ for a regular solution, $\Delta_\text{mix}G_\mathrm{m}/RT = x\ln x + (1-x)\ln(1-x) + \chi x(1-x)$, with the interaction parameter $\chi$ on the slider. At $\chi = 0$ the curve is the ideal solution: negative everywhere, a single minimum at $x = 0.5$, mixing always spontaneous. Slide $\chi$ up — unfavourable A–B contacts, a positive $\Delta_\text{mix}H$ — and the well flattens; past $\chi = 2$ it develops two minima separated by a hump, and the single phase becomes unstable to separation into two compositions. The entropy of mixing guarantees spontaneity only when the enthalpy does not fight it too hard.
:::

::: warning Ideal mixing is not the whole story of miscibility {#warn-miscibility}
"$\Delta_\text{mix}G < 0$ because $\Delta_\text{mix}S > 0$" is a theorem about *ideal* solutions, and generalising it is a favourite exam error. When unlike molecules dislike each other, $\Delta_\text{mix}H > 0$ and the $T\Delta S$ advantage of mixing — at most $RT\ln 2 \approx 1.7\ \mathrm{kJ\,mol^{-1}}$ per mole at the best composition, a small number — can be overwhelmed. Then $\Delta_\text{mix}G$ develops two minima and the mixture splits into two liquid phases: oil and water, water and butanol, the polymer blends that phase-separate on heating (upper critical solution temperature behaviour). The entropy of mixing is real but weak; most of the miscibility of everyday life comes from favourable interactions, not from the logarithm.
:::

## Real solutions: deviations, Henry's law, activity

Real solutions deviate from Raoult's law in systematic directions. If A–B attractions are *weaker* than the A–A and B–B attractions they replace (acetone–carbon disulfide, ethanol–hexane), molecules escape more easily than ideal, $p_\mathrm{A} > x_\mathrm{A}p_\mathrm{A}^{*}$: **positive deviation**, $\Delta_\text{mix}H > 0$, the solution warms on cooling toward demixing, and the total-pressure curve can develop a maximum — a **minimum-boiling azeotrope**, like ethanol–water, which boils at $78.2\,^\circ\mathrm{C}$ at a composition of about $95.6$ per cent ethanol by mass and cannot be crossed by distillation. If A–B attractions are *stronger* (chloroform–acetone, acetone–aniline), $p_\mathrm{A} < x_\mathrm{A}p_\mathrm{A}^{*}$: **negative deviation**, $\Delta_\text{mix}H < 0$, and a maximum-boiling azeotrope such as $20.2$ per cent hydrochloric acid.

For the *solute* in a dilute solution the universal statement is not Raoult's law but Henry's.

::: definition Henry's law {#def-henry}
In a dilute ideal-dilute solution the vapour pressure of the solute is proportional to its mole fraction with a constant of its own,
$$
p_\mathrm{B} = K_\mathrm{B}\, x_\mathrm{B} \qquad (x_\mathrm{B} \to 0),
$$
the **Henry's law constant** $K_\mathrm{B}$, characteristic of the solute–solvent pair and the temperature. The solvent still obeys Raoult's law; the solute obeys Henry's. Physically, a solute molecule is surrounded by solvent, so its escaping tendency is set by the solvent environment, not by the pure solute — which is why $K_\mathrm{B} \ne p_\mathrm{B}^{*}$ in general. For gases this is the whole theory of solubility: $p_\mathrm{B} = K_\mathrm{B} x_\mathrm{B}$ says dissolved-gas concentration is proportional to its partial pressure (William Henry, 1803), and $K_\mathrm{B} \gg p_\mathrm{B}^{*}$ for gases like $\mathrm{O_2}$ and $\mathrm{N_2}$ whose liquids would require cryogenic temperatures at one bar.
:::

::: example Solubility of oxygen in water from Henry's law {#ex-henry-o2}
For $\mathrm{O_2}$ in water at $298\ \mathrm{K}$, $K_\mathrm{B} = 4.37\times 10^{4}\ \mathrm{bar}$ (Atkins). Find the concentration of dissolved oxygen in water saturated with air at $1.00\ \mathrm{bar}$, $x(\mathrm{O_2}) = 0.21$.
::: solution
$$
x(\mathrm{O_2}) = \frac{p(\mathrm{O_2})}{K_\mathrm{B}} = \frac{0.21}{4.37\times10^{4}} = 4.8\times 10^{-6}.
$$
In dilute solution $n(\mathrm{O_2})/n(\mathrm{H_2O}) = x(\mathrm{O_2})$, and water is $55.34\ \mathrm{mol\,L^{-1}}$, so
$$
c(\mathrm{O_2}) = 4.8\times10^{-6} \times 55.34\ \mathrm{mol\,L^{-1}} = 2.7\times 10^{-4}\ \mathrm{mol\,L^{-1}},
$$
that is $2.7\times10^{-4} \times 32.00\ \mathrm{g\,mol^{-1}} = 8.5\ \mathrm{mg\,L^{-1}}$ — the tabulated air-saturation value for oxygenated water, and enough, just, for fish. Henry's law with the same constant explains why divers get nitrogen narcosis at depth ($p_{\mathrm{N_2}}$ of five bar dissolves five times the gas) and why opening a bottle of soda fizzes ($p_{\mathrm{CO_2}}$ collapses from $4$ bar to $0.0004$ bar).
:::
:::

::: warning Two standard states, two different μ° {#warn-standard-state}
The solute's chemical potential can be written two ways, and mixing them up corrupts every downstream calculation. Writing $\mu_\mathrm{B} = \mu_\mathrm{B}^{\circ,x} + RT\ln x_\mathrm{B}$ anchors the standard state to the *Raoult convention* — pure liquid B, hypothetical when B is a gas — with $\mu_\mathrm{B}^{\circ,x}$ containing $\ln K_\mathrm{B}$; writing $\mu_\mathrm{B} = \mu_\mathrm{B}^{\circ,b} + RT\ln(b_\mathrm{B}/b^\circ)$ anchors it to the *molality (solute) convention*, $b^\circ = 1\ \mathrm{mol\,kg^{-1}}$. The two $\mu^\circ$ differ by a constant that depends on the solvent's molar volume, so equilibrium constants built from $x$ and from $b$ differ by that constant too. Neither is wrong; they are different zero points on the same ruler, and a tabulated $\Delta_\mathrm{f}G^\circ$ for an aqueous species belongs to exactly one of them (the molality convention, for biochemistry nearly always). Always ask which ruler a number was written on.
:::

::: definition Activity and activity coefficient {#def-activity}
The **activity** $a_i$ of a component is defined by keeping the ideal form of the chemical potential true,
$$
\mu_i = \mu_i^{\circ} + RT \ln a_i, \qquad a_i \equiv \gamma_i x_i ,
$$
with the **activity coefficient** $\gamma_i$ measuring the deviation from ideal behaviour: $\gamma_i \to 1$ as $x_i \to 1$ (Raoult convention) or $\gamma_i \to 1$ as $x_i \to 0$ (Henry convention). Activity is "the mole fraction that makes the ideal formula come true" — Gilbert Lewis's word (1916), refined with Merle Randall into the working tool of solution thermodynamics. For electrolytes the same idea carried into [[thermodynamics/ions-in-solution]] and [[electrochemistry/cell-thermodynamics]] becomes the mean ionic activity coefficient.
:::

::: widget plot
f: pstar*x; KH*x
x: 0, 1
y: 0, 800
sliders: pstar=74:20:200:1; KH=300:50:800:1
labels: \text{Raoult: }x\,p_\mathrm{B}^{*}; \text{Henry: }K_\mathrm{B}\,x
caption: Two straight lines through the origin for the solute's vapour pressure: the Raoult line $x\,p_\mathrm{B}^{*}$ (slope the pure-liquid vapour pressure, slider) and the Henry line $K_\mathrm{B}x$ (slope the Henry constant, slider). For a real solution the $p_\mathrm{B}$ curve is tangent to the Henry line as $x \to 0$ and crosses the Raoult line as $x \to 1$; positive deviation means $K_\mathrm{B} > p_\mathrm{B}^{*}$, negative means $K_\mathrm{B} < p_\mathrm{B}^{*}$. Slide the two slopes equal and the distinction between the two laws vanishes — which is exactly the ideal-solution case, and exactly why the two laws are one statement about limits, not two competing laws.
:::

::: history From Raoult's thermometer to Lewis's activity {#hist-mixtures}
François Marie Raoult (Raoult), measuring freezing points and vapour pressures of solutions in the 1880s, published in 1887 the proportionality between a solvent's vapour-pressure lowering and the mole fraction of solute that bears his name — a law arrived at from hundreds of cryoscopic and ebullioscopic determinations. Five years earlier Jacobus Henricus van 't Hoff (van 't Hoff) had shown in 1887 that dilute solutes lower the freezing point and raise the osmotic pressure exactly as if they were gases occupying the solution volume, $\Pi V = nRT$, and won the first Nobel Prize in Chemistry (1901) largely for it. The general theory of multicomponent equilibrium — partial molar quantities, the Gibbs–Duhem equation (Gibbs, 1870s; Duhem, 1886), the phase rule — fills the 1876 *On the Equilibrium of Heterogeneous Substances* already met in [[thermodynamics/second-law]]. William Henry read out the gas-solubility proportionality in 1803, a century of empirical scaffolding before the theory arrived. Gilbert Newton Lewis (Lewis) introduced the activity and the fugacity in 1916 to rescue the ideal-form equations for real solutions, and his 1923 treatise with Merle Randall (Randall) — *Thermodynamics and the Free Energy of Chemical Substances* — supplied the activity coefficients and standard states that every data table still uses.
:::

## Colligative properties: the democracy of particles

Because $\mu_\mathrm{A} = \mu_\mathrm{A}^{*} + RT\ln x_\mathrm{A}$ depends on the solute only through $x_\mathrm{A}$ — one number, no chemistry — every consequence of dilution is *colligative*: it counts particles, not identities. A mole of $\mathrm{NaCl}$ counts as roughly two moles of particles (the van 't Hoff factor $i$), which is why salt is a de-icer and why intravenous fluid is isotonic.

**Vapour-pressure lowering.** At fixed $T$, $p_\mathrm{A} = x_\mathrm{A}p_\mathrm{A}^{*}$: a solute mole fraction of $0.010$ lowers the solvent vapour pressure by $1.0\,\%$, for water at $25\,^\circ\mathrm{C}$ by $0.010 \times 3.17\ \mathrm{kPa} = 0.032\ \mathrm{kPa}$.

**Boiling-point elevation.** The solution boils when $x_\mathrm{A} p_\mathrm{A}^{*}(T) = p_\text{ex}$, so a lower $p_\mathrm{A}^{*}$-equivalent demands a higher $T$.

::: proposition Boiling-point elevation and freezing-point depression {#prop-colligative}
For a dilute solution of a non-volatile solute,
$$
\Delta T_\mathrm{b} = K_\mathrm{b}\, b_\mathrm{B}, \qquad K_\mathrm{b} = \frac{R\,T_\mathrm{b}^{*2}\,M_\mathrm{A}}{\Delta_\text{vap}H},
\qquad\qquad
\Delta T_\mathrm{f} = K_\mathrm{f}\, b_\mathrm{B}, \qquad K_\mathrm{f} = \frac{R\,T_\mathrm{f}^{*2}\,M_\mathrm{A}}{\Delta_\text{fus}H},
$$
with $b_\mathrm{B}$ the molality of solute particles and $M_\mathrm{A}$ the molar mass of the solvent. For water, $K_\mathrm{b} = 0.512\ \mathrm{K\,kg\,mol^{-1}}$ and $K_\mathrm{f} = 1.86\ \mathrm{K\,kg\,mol^{-1}}$ (CRC); the asymmetry — freezing is over three times more sensitive than boiling — is why $10\ \mathrm{g}$ of salt protects a car radiator far more usefully than it raises the cooking temperature.
:::

::: proof (boiling-point elevation)
Boiling requires $p_\mathrm{A} = x_\mathrm{A} p_\mathrm{A}^{*}(T_\mathrm{b}) = p_\text{ex}$, while the pure solvent boils at $p_\mathrm{A}^{*}(T_\mathrm{b}^{*}) = p_\text{ex}$. Dividing and taking logarithms, $\ln x_\mathrm{A} + \ln p_\mathrm{A}^{*}(T_\mathrm{b}) - \ln p_\mathrm{A}^{*}(T_\mathrm{b}^{*}) = 0$; the Clausius–Clapeyron equation of [[thermodynamics/phase-equilibria]] replaces the pressure difference by $-\left(\Delta_\text{vap}H/R\right)\left(1/T_\mathrm{b} - 1/T_\mathrm{b}^{*}\right)$, so
$$
\ln x_\mathrm{A} = -\frac{\Delta_\text{vap}H}{R}\left(\frac{1}{T_\mathrm{b}^{*}} - \frac{1}{T_\mathrm{b}}\right)
\approx -\frac{\Delta_\text{vap}H}{R\,T_\mathrm{b}^{*2}}\,\Delta T_\mathrm{b}.
$$
For a dilute solution $\ln x_\mathrm{A} = \ln(1 - x_\mathrm{B}) \approx -x_\mathrm{B} \approx -n_\mathrm{B}/n_\mathrm{A} = -M_\mathrm{A} b_\mathrm{B}$, which is the result. The freezing form is identical with $\Delta_\text{fus}H$ in place of $\Delta_\text{vap}H$ — the solid–solution equilibrium $\mu_\mathrm{A}(\text{solid}) = \mu_\mathrm{A}(\text{solution})$ — and both are exact in the dilute limit, first order in $b_\mathrm{B}$.
:::

::: example The ebullioscopic constant of water {#ex-kb-water}
Compute $K_\mathrm{b}$ for water from $T_\mathrm{b}^{*} = 373.15\ \mathrm{K}$, $\Delta_\text{vap}H = 40.66\ \mathrm{kJ\,mol^{-1}}$ (NIST) and $M_\mathrm{A} = 18.02\times10^{-3}\ \mathrm{kg\,mol^{-1}}$, and use it to find the boiling point of a solution of $0.100\ \mathrm{mol}$ of glucose in $500\ \mathrm{g}$ of water.
::: solution
$$
K_\mathrm{b} = \frac{8.314 \times 373.15^{2} \times 18.02\times10^{-3}}{40\,660} = 0.513\ \mathrm{K\,kg\,mol^{-1}},
$$
matching the tabulated $0.512$ to the precision of $\Delta_\text{vap}H$. With $b = 0.100/0.500 = 0.200\ \mathrm{mol\,kg^{-1}}$,
$$
\Delta T_\mathrm{b} = 0.513 \times 0.200 = 0.103\ \mathrm{K},
$$
so the solution boils at $373.25\ \mathrm{K}$. A decimolar sugar solution boils a tenth of a degree higher than pure water: colligative properties are real but numerically small for the solute concentrations of the kitchen, and large only for small solutes at high molality — or for ions, which double the count.
:::
:::

**Osmotic pressure.** Separate solvent from solution by a membrane permeable to the solvent only, and solvent flows *into* the solution until the pressure difference $\Pi$ raises the solvent's chemical potential back to equality.

::: proposition Osmotic pressure {#prop-osmotic}
For a dilute solution the osmotic pressure satisfies the **van 't Hoff equation**
$$
\Pi = c_\mathrm{B} R T ,
$$
with $c_\mathrm{B}$ the molar concentration of solute *particles* — formally identical to the ideal gas law, and for the same statistical reason.
:::

::: proof
At equilibrium the solvent's chemical potential in the solution, pressurised to $p + \Pi$, equals that of the pure solvent at $p$:
$$
\mu_\mathrm{A}^{*}(p + \Pi) + RT\ln x_\mathrm{A} = \mu_\mathrm{A}^{*}(p).
$$
Since $\left(\partial\mu/\partial p\right)_T = V_\mathrm{m}$ and the liquid's $V_\mathrm{m}$ is nearly constant, $\mu_\mathrm{A}^{*}(p+\Pi) - \mu_\mathrm{A}^{*}(p) = \Pi V_\mathrm{m}$, so $\Pi V_\mathrm{m} = -RT\ln x_\mathrm{A} \approx RT\,x_\mathrm{B} = RT\,n_\mathrm{B}/n_\mathrm{A}$. Multiplying by $n_\mathrm{A}$ and noting $n_\mathrm{A}V_\mathrm{m} \approx V$, the solution volume, gives $\Pi V = n_\mathrm{B}RT$. The van 't Hoff equation of [[general-chemistry-2/entropy-free-energy]] for $K(T)$ shares the name and the derivation's spirit: both read $RT$ as the price of a logarithm.
:::

::: example Molar mass from osmotic pressure {#ex-osmotic}
A solution of $20.0\ \mathrm{g}$ of a protein per litre of solution exerts an osmotic pressure of $0.500\ \mathrm{kPa}$ at $298.15\ \mathrm{K}$. Find the molar mass of the protein.
::: solution
$$
c = \frac{\Pi}{RT} = \frac{500\ \mathrm{Pa}}{8.314 \times 298.15\ \mathrm{J\,mol^{-1}}} = 0.2017\ \mathrm{mol\,m^{-3}} = 2.017\times10^{-4}\ \mathrm{mol\,L^{-1}},
$$
$$
M = \frac{20.0\ \mathrm{g\,L^{-1}}}{2.017\times10^{-4}\ \mathrm{mol\,L^{-1}}} = 9.9\times10^{4}\ \mathrm{g\,mol^{-1}} .
$$
The same solution depresses the freezing point by only $c\,K_\mathrm{f}/\rho \approx 0.0004\ \mathrm{K}$ — undetectable — while $\Pi$ is a comfortable $5\ \mathrm{mbar}$, hundreds of times larger in relative terms. This is why osmometry, not freezing-point depression, is how biochemistry weighs macromolecules, and why the number lands in the tens of thousands of grams per mole where colligative *concentrative* properties run out of sensitivity.
:::
:::

::: quiz
Which change lowers the freezing point of water the most?
- [x] Dissolving $0.20\ \mathrm{mol}$ of $\mathrm{NaCl}$ in $1.00\ \mathrm{kg}$ of water.
- [ ] Dissolving $0.30\ \mathrm{mol}$ of glucose in $1.00\ \mathrm{kg}$ of water.
- [ ] Dissolving $0.25\ \mathrm{mol}$ of sucrose in $1.00\ \mathrm{kg}$ of water.
- [ ] They all lower it by the same amount, because they are all dilute.
::: solution
Colligative properties count *particles*: $\mathrm{NaCl}$ dissociates into roughly two particles per formula unit, giving about $0.40\ \mathrm{mol}$ of particles — more than glucose's $0.30$ or sucrose's $0.25$. (In real solution the ions interact and the effective count is $i \approx 1.9$, not $2.0$; the ordering is untouched.) The fourth option confuses "dilute" with "same number of particles".
:::
:::

## Two-component liquid–vapour diagrams

::: proposition The lever rule {#prop-lever}
In a two-phase region of a binary diagram, if a mixture of overall composition $z$ splits into phases of compositions $x$ (liquid) and $y$ (vapour), the phase amounts obey
$$
\frac{n_\text{vapour}}{n_\text{liquid}} = \frac{z - x}{y - z},
$$
the **lever rule**: the amounts are inversely proportional to the distances from the overall composition to each phase composition, as if the tie-line were a lever balanced at $z$.
:::

::: proof
Material balance on the component: $z\,n = x\,n_\mathrm{L} + y\,n_\mathrm{V}$ with $n = n_\mathrm{L} + n_\mathrm{V}$. Substituting $n_\mathrm{L} = n - n_\mathrm{V}$ gives $z(n_\mathrm{L} + n_\mathrm{V}) = x\,n_\mathrm{L} + y\,n_\mathrm{V}$, i.e. $(z - x)n_\mathrm{L} = (y - z)n_\mathrm{V}$, which rearranges to the rule. Nothing about ideality was used — the lever rule is arithmetic, valid on any tie-line of any binary phase diagram, including the azeotropic ones below.
:::

::: example Reading a $p$–$x$ diagram: benzene–toluene {#ex-px}
At $100\,^\circ\mathrm{C}$ the vapour pressures (NIST Antoine equations) are $p_\mathrm{A}^{*} = 181.1\ \mathrm{kPa}$ for benzene and $p_\mathrm{B}^{*} = 74.2\ \mathrm{kPa}$ for toluene; the pair is ideal. (a) A liquid of $x_\mathrm{A} = 0.30$ is held at $100\,^\circ\mathrm{C}$: find the vapour pressures and the vapour composition. (b) At what pressure does a mixture of overall $z_\mathrm{A} = 0.50$ sit entirely as liquid? (c) Held at $110\ \mathrm{kPa}$ and $100\,^\circ\mathrm{C}$, what fraction of the $z_\mathrm{A} = 0.50$ mixture is vapour?
::: solution
**(a)** Raoult: $p_\mathrm{A} = 0.30\times181.1 = 54.3\ \mathrm{kPa}$, $p_\mathrm{B} = 0.70\times74.2 = 51.9\ \mathrm{kPa}$, total $p = 106.3\ \mathrm{kPa}$. Dalton: $y_\mathrm{A} = 54.3/106.3 = 0.511$ — the vapour is richer in benzene than the liquid was ($0.51$ against $0.30$), which is the entire principle of distillation.
**(b)** All-liquid requires $p \ge z_\mathrm{A}p_\mathrm{A}^{*} + (1-z_\mathrm{A})p_\mathrm{B}^{*} = 0.50\times181.1 + 0.50\times74.2 = 127.7\ \mathrm{kPa}$: the bubble line at $z = 0.50$.
**(c)** At $110\ \mathrm{kPa}$ the tie-line endpoints come from the two straight lines of the diagram: $x_\mathrm{A} = (110 - 74.2)/(181.1 - 74.2) = 0.335$ in the liquid and $y_\mathrm{A} = 0.335\times181.1/110 = 0.552$ in the vapour. The lever rule gives
$$
\frac{n_\text{V}}{n_\text{L}} = \frac{z - x}{y - z} = \frac{0.50 - 0.335}{0.552 - 0.50} = \frac{0.165}{0.052} = 3.2,
$$
so about three-quarters of the moles are vapour. Note how much geometry does: two straight lines and a balance beam replace any equation of state.
:::
:::

::: widget plot
f: pA*x; pB*(1-x); pA*x + pB*(1-x)
x: 0, 1
y: 0, 300
sliders: pA=181:50:300:1; pB=20:20:200:1
hlines: 101.3
labels: p_\mathrm{A} = x_\mathrm{A}p_\mathrm{A}^{*}; p_\mathrm{B} = x_\mathrm{B}p_\mathrm{B}^{*}; p_\text{total}
caption: The $p$–$x$ diagram of an ideal binary at fixed temperature: two partial-pressure lines falling or rising linearly from $p^{*}$ to zero, and the total pressure the straight line between $p_\mathrm{B}^{*}$ and $p_\mathrm{A}^{*}$ (sliders set the two pure vapour pressures; the horizontal line is one atmosphere). The upper line is the bubble line, the lower the dew line; between them the lever rule of the proposition governs. Slide $p_\mathrm{A}^{*}$ down toward $p_\mathrm{B}^{*}$ and the two lines merge — identical volatilities, no separation by distillation. Real solutions bow the lines away from straightness; bow them enough and the total-pressure line develops a maximum, and an azeotrope appears where the bubble and dew lines touch.
:::

The $T$–$x$ diagram at fixed pressure is the same picture turned over: boiling points lie between the two pure boiling points, the lower curve (liquid) and upper curve (vapour) meet at the ends, and the vapour curve always lies on the more-volatile side. For non-ideal pairs the curves develop a minimum (positive deviation, ethanol–water) or maximum (negative deviation, hydrochloric acid) where bubble and dew lines touch at equal compositions — the azeotrope boils like a pure substance and cannot be separated by ordinary distillation, which is why absolute ethanol must be made by extraction or by molecular sieves, and why the phase rule of [[thermodynamics/phase-equilibria]] counts an azeotrope as a constraint, not a coincidence.

## Where this leads

The chemical potential of a component in solution is the same object that decides the direction of reaction: substitute $\mu_i = \mu_i^\circ + RT\ln a_i$ into $\Delta_\mathrm{r}G = \sum_i \nu_i \mu_i$ and the equilibrium constant of [[thermodynamics/reaction-equilibrium]] falls out with activities in place of concentrations. Carry the activity idea into electrolytes, where ions cannot be present alone, and you reach mean ionic activity coefficients, the Debye–Hückel theory and the electrode potentials of [[thermodynamics/ions-in-solution]] and [[electrochemistry/cell-thermodynamics]]. The freezing-point and boiling-point derivations of this chapter are the dilute limits of the phase diagrams of [[thermodynamics/phase-equilibria]] read through a solution — sea ice, lime softening, and the fusion-line depression of water's phase diagram all live there. The molecular reading — why $\Delta_\text{mix}H$ is positive or negative, what the $\chi$ parameter counts — is the programme of [[statistical-thermodynamics/real-gases-liquids]], and the ideal-gas logarithm was first met in [[general-chemistry-2/entropy-free-energy]] and [[general-chemistry-1/gases]]. The intercept method and the partial molar idea reappear wherever composition derivatives are taken, including the excess heat capacities mentioned in [[thermodynamics/heat-capacity-adiabatic]].

::: summary
- Extensive properties of mixtures are not additive; the correct expansion is $J = \sum_i n_i \bar{J}_i$ with partial molar quantities $\bar{J}_i = \left(\partial J/\partial n_i\right)_{T,p,n_{j\ne i}}$, and the chemical potential is the partial molar Gibbs energy.
- The Gibbs–Duhem equation $\sum_i n_i\,\mathrm{d}\bar{J}_i = 0$ ties the components' partial molar quantities together: one measured curve gives both partial molar volumes (intercept method).
- An ideal solution obeys Raoult's law $p_\mathrm{A} = x_\mathrm{A}p_\mathrm{A}^{*}$ for every component, which forces $\mu_\mathrm{A} = \mu_\mathrm{A}^{*} + RT\ln x_\mathrm{A}$.
- For ideal solutions $\Delta_\text{mix}G = nRT\sum x_i\ln x_i < 0$ and $\Delta_\text{mix}S = -nR\sum x_i\ln x_i > 0$ with $\Delta_\text{mix}H = \Delta_\text{mix}V = 0$: mixing is always spontaneous, driven by entropy alone.
- Real solutions deviate positively or negatively from Raoult's law; the solute obeys Henry's law $p_\mathrm{B} = K_\mathrm{B}x_\mathrm{B}$ with its own standard state, and activity $a_i = \gamma_i x_i$ restores the ideal form of $\mu_i$.
- Colligative properties count particles: $\Delta T_\mathrm{b} = K_\mathrm{b}b$ with $K_\mathrm{b} = RT_\mathrm{b}^{*2}M_\mathrm{A}/\Delta_\text{vap}H$, $\Delta T_\mathrm{f} = K_\mathrm{f}b$, and $\Pi = cRT$ — the last sensitive enough to weigh proteins.
- Binary $p$–$x$ and $T$–$x$ diagrams for ideal pairs are straight lines between the pure endpoints; the lever rule divides the phases, and azeotropes are the point where deviation from ideality defeats distillation.
:::

## Exercises

::: exercise Gibbs energy of mixing {level=1 check="-6.20"}
$1.00\ \mathrm{mol}$ of hexane is mixed with $4.00\ \mathrm{mol}$ of heptane at $298.15\ \mathrm{K}$; the pair is ideal. Find $\Delta_\text{mix}G$. (Enter the value in $\mathrm{kJ}$.)
::: solution
$x_\text{hex} = 0.200$, $x_\text{hep} = 0.800$, $\sum x_i\ln x_i = 0.200\ln 0.200 + 0.800\ln 0.800 = -0.3219 - 0.1785 = -0.5004$. Then
$$
\Delta_\text{mix}G = 5.00 \times 8.314 \times 298.15 \times (-0.5004) = -6.20\ \mathrm{kJ}.
$$
Less negative than the $2:3$ mixture of the worked example: mixing is most profitable at $x = 0.5$, where $-\sum x\ln x$ is maximal.
:::
:::

::: exercise Raoult's law for benzene–toluene {level=1 check="117.0"}
At $100\,^\circ\mathrm{C}$, $p_\mathrm{A}^{*} = 181.1\ \mathrm{kPa}$ (benzene) and $p_\mathrm{B}^{*} = 74.2\ \mathrm{kPa}$ (toluene). Find the total vapour pressure above an ideal liquid with $x_\mathrm{A} = 0.40$ at $100\,^\circ\mathrm{C}$. (Enter $p$ in $\mathrm{kPa}$.)
::: solution
$p = x_\mathrm{A}p_\mathrm{A}^{*} + x_\mathrm{B}p_\mathrm{B}^{*} = 0.40\times181.1 + 0.60\times74.2 = 72.44 + 44.52 = 117.0\ \mathrm{kPa}$, with $y_\mathrm{A} = 72.44/117.0 = 0.619$. The vapour is enriched in benzene by a factor $0.619/0.400 = 1.55$ — one theoretical plate of an ideal column.
:::
:::

::: exercise Boiling-point elevation {level=1 check="0.102"}
Find the boiling-point elevation of a solution of $0.100\ \mathrm{mol}$ of glucose in $500\ \mathrm{g}$ of water, using $K_\mathrm{b} = 0.512\ \mathrm{K\,kg\,mol^{-1}}$. (Enter $\Delta T_\mathrm{b}$ in $\mathrm{K}$.)
::: solution
$b = 0.100/0.500 = 0.200\ \mathrm{mol\,kg^{-1}}$, so $\Delta T_\mathrm{b} = 0.512 \times 0.200 = 0.102\ \mathrm{K}$. Glucose does not dissociate, so the particle molality equals the formula molality; the same recipe with $\mathrm{NaCl}$ would nearly double the effect.
:::
:::

::: exercise Derive $K_\mathrm{b}$ for water {level=2 check="0.513"}
Compute the ebullioscopic constant of water from $K_\mathrm{b} = RT_\mathrm{b}^{*2}M_\mathrm{A}/\Delta_\text{vap}H$ with $T_\mathrm{b}^{*} = 373.15\ \mathrm{K}$, $\Delta_\text{vap}H = 40.66\ \mathrm{kJ\,mol^{-1}}$ (NIST), $M_\mathrm{A} = 18.02\times10^{-3}\ \mathrm{kg\,mol^{-1}}$. (Enter $K_\mathrm{b}$ in $\mathrm{K\,kg\,mol^{-1}}$, to three significant figures.)
::: solution
$$
K_\mathrm{b} = \frac{8.314 \times 139\,241 \times 0.01802}{40\,660} = 0.513\ \mathrm{K\,kg\,mol^{-1}},
$$
against the CRC value $0.512$ — the difference is the temperature dependence of $\Delta_\text{vap}H$ across the derivation's dilute limit. Note the structure: $K_\mathrm{b}$ is large for volatile solvents (small $\Delta_\text{vap}H$) and small for strongly bound ones, and it contains no property of the solute at all — that is what colligative means.
:::
:::

::: exercise Molar mass by osmometry {level=2 check="98000"}
A solution of $1.00\ \mathrm{g}$ of a polymer in $100.0\ \mathrm{cm^3}$ of solution has an osmotic pressure of $0.253\ \mathrm{kPa}$ at $298.15\ \mathrm{K}$. Find the polymer's molar mass. (Enter $M$ in $\mathrm{g\,mol^{-1}}$.)
::: solution
$c = \Pi/RT = 253/(8.314\times298.15) = 0.1021\ \mathrm{mol\,m^{-3}} = 1.021\times10^{-4}\ \mathrm{mol\,L^{-1}}$, and the concentration is $10.0\ \mathrm{g\,L^{-1}}$, so
$$
M = \frac{10.0}{1.021\times10^{-4}} = 9.8\times10^{4}\ \mathrm{g\,mol^{-1}} .
$$
Polydisperse polymers give a number-average molar mass this way; the same $10\ \mathrm{g\,L^{-1}}$ solution would depress the freezing point by about $2\times10^{-4}\ \mathrm{K}$, far below any cryoscope.
:::
:::

::: exercise Antifreeze {level=2 check="12.0"}
How much does $200\ \mathrm{g}$ of ethylene glycol, $\mathrm{C_2H_6O_2}$ ($M = 62.07\ \mathrm{g\,mol^{-1}}$), dissolved in $500\ \mathrm{g}$ of water lower the freezing point? Use $K_\mathrm{f} = 1.86\ \mathrm{K\,kg\,mol^{-1}}$. (Enter $\Delta T_\mathrm{f}$ in $\mathrm{K}$.)
::: solution
$b = (200/62.07)/0.500 = 6.44\ \mathrm{mol\,kg^{-1}}$, so $\Delta T_\mathrm{f} = 1.86 \times 6.44 = 12.0\ \mathrm{K}$. The linear law is already strained at this molality (the true value is nearer $11\ \mathrm{K}$), but the engineering conclusion stands: glycol protects a radiator to about $-12\,^\circ\mathrm{C}$ at this concentration, and ethylene glycol works because it is cheap, miscible, and delivers six moles of particles per kilogram at $200\ \mathrm{g}$ — ions would do better per gram but corrode the engine.
:::
:::

::: exercise Duhem–Margules {level=3}
Starting from the Gibbs–Duhem equation at constant temperature, $n_\mathrm{A}\,\mathrm{d}\mu_\mathrm{A} + n_\mathrm{B}\,\mathrm{d}\mu_\mathrm{B} = 0$, show that at constant $T$
$$
x_\mathrm{A}\,\mathrm{d}\ln p_\mathrm{A} + x_\mathrm{B}\,\mathrm{d}\ln p_\mathrm{B} = 0
$$
(the Duhem–Margules equation, with ideal vapour assumed), and deduce: if one component obeys Raoult's law over the whole composition range, the other must obey it too. Why does the same argument make Henry's law for the solute *imply* Raoult's law for the solvent?
::: solution
At constant $T$, $\mathrm{d}\mu_i = RT\,\mathrm{d}\ln p_i$ (vapour equilibrium, ideal vapour), so Gibbs–Duhem divided by $n$ gives $x_\mathrm{A}\,\mathrm{d}\ln p_\mathrm{A} + x_\mathrm{B}\,\mathrm{d}\ln p_\mathrm{B} = 0$. If A obeys Raoult's law everywhere, $p_\mathrm{A} = x_\mathrm{A}p_\mathrm{A}^{*}$ and $\mathrm{d}\ln p_\mathrm{A} = \mathrm{d}\ln x_\mathrm{A} = \mathrm{d}x_\mathrm{A}/x_\mathrm{A}$; substituting, $x_\mathrm{B}\,\mathrm{d}\ln p_\mathrm{B} = -\mathrm{d}x_\mathrm{A} = \mathrm{d}x_\mathrm{B}$, so $\mathrm{d}\ln p_\mathrm{B} = \mathrm{d}x_\mathrm{B}/x_\mathrm{B} = \mathrm{d}\ln x_\mathrm{B}$, and integration from $x_\mathrm{B} = 1$ (where $p_\mathrm{B} = p_\mathrm{B}^{*}$) gives $p_\mathrm{B} = x_\mathrm{B}p_\mathrm{B}^{*}$. For the Henry-law limit, $\mathrm{d}\ln p_\mathrm{B} = \mathrm{d}\ln x_\mathrm{B}$ as $x_\mathrm{B} \to 0$; Duhem–Margules then forces $\mathrm{d}\ln p_\mathrm{A} = \mathrm{d}\ln x_\mathrm{A}$ near $x_\mathrm{A} = 1$, and since $p_\mathrm{A} \to p_\mathrm{A}^{*}$ there, $p_\mathrm{A} = x_\mathrm{A}p_\mathrm{A}^{*}$: the solvent's Raoult's law is not an independent observation but a consequence of the solute's Henry's law. Two laws, one equation — the Gibbs–Duhem equation enforcing its own bookkeeping.
:::
:::

::: exercise When entropy loses: the critical interaction parameter {level=3 check="2.00"}
For a regular solution, $\Delta_\text{mix}G_\mathrm{m}/RT = x\ln x + (1-x)\ln(1-x) + \chi x(1-x)$. Show that the single phase becomes unstable to phase separation when $\chi > 2$, by finding the largest $\chi$ for which $\partial^2(\Delta_\text{mix}G_\mathrm{m}/RT)/\partial x^2 > 0$ for all $x$. (Enter the critical value $\chi_\mathrm{c}$.)
::: solution
Differentiating twice, $\partial^2(\Delta_\text{mix}G_\mathrm{m}/RT)/\partial x^2 = 1/x + 1/(1-x) - 2\chi$. The curvature is smallest at $x = 1/2$, where it equals $4 - 2\chi$; the stability limit is therefore $4 - 2\chi_\mathrm{c} = 0$, i.e. $\chi_\mathrm{c} = 2.00$. Above it, the Gibbs energy of mixing develops a region of negative curvature around $x = 1/2$ and the mixture splits into two phases whose compositions are found by the common-tangent construction — the geometry behind the widget's double-welled curves. The physical reading: the entropy of mixing contributes at most $4RT$ of curvature per mole, and an interaction penalty $\chi RT$ per mole of contacts beats it once $\chi > 2$. Ideal mixing's guarantee of spontaneity is a margin of two $RT$ units, no wider.
:::
:::
