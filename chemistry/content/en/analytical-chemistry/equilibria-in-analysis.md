Add a spatula of potassium nitrate — a salt that has nothing in common with silver chloride — to a saturated solution of silver chloride, and more silver chloride dissolves. Prepare a "phosphate buffer at pH 7.21" by mixing equal amounts of $\mathrm{NaH_2PO_4}$ and $\mathrm{Na_2HPO_4}$, and a pH meter reads close to $6.9$, not $7.21$. Dissolve $0.0010\ \mathrm{mol\,dm^{-3}}$ $\mathrm{NaH_2PO_4}$ in water and the pH is $5.1$, not the $4.7$ that the textbook formula $\tfrac12(\mathrm{p}K_{\mathrm{a}1}+\mathrm{p}K_{\mathrm{a}2})$ predicts. None of these is a failure of equilibrium chemistry. Each is a failure of the shortcuts we use in introductory work: treating concentrations as if they were activities, and dropping terms from equations before checking whether they are small.

Analytical chemistry cannot afford those shortcuts, because the equilibria *are* the method: a titration's end point, a precipitate's completeness, an extraction's efficiency and a buffer's pH are all equilibrium compositions. This chapter gives the tools to compute them reliably. We define activity and estimate activity coefficients from the ionic strength with the Debye–Hückel theory; we set out the **systematic treatment of equilibrium** — charge balance, mass balances and equilibrium constants, solved together — which works for any mixture; and we use **fractional composition** ($\alpha$) functions to see at a glance which species of a polyprotic acid or a metal complex dominate at a given pH. The equilibrium constants, buffers and solubility products are those of [[general-chemistry-2/buffers-titrations]] and [[general-chemistry-2/solubility-equilibria]]; their thermodynamic basis is in [[thermodynamics/ions-in-solution]].

## Activity and ionic strength

An equilibrium constant derived from thermodynamics is written in **activities**, not concentrations. For the dissolution of silver chloride,
$$
K_\mathrm{sp} = a_{\mathrm{Ag^+}}\,a_{\mathrm{Cl^-}},
$$
and only for very dilute solutions is the activity of an ion equal to its concentration divided by $c^\circ = 1\ \mathrm{mol\,dm^{-3}}$. In a real solution each ion is surrounded, on average, by a slight excess of ions of opposite charge — its **ionic atmosphere**. This atmosphere lowers the ion's energy (it is stabilised by its oppositely charged neighbours) and so lowers its chemical potential and its effective concentration. The more ions there are, and the more highly charged they are, the denser the atmosphere and the bigger the effect.

::: definition Activity, activity coefficient and ionic strength {#def-activity}
The **activity** of a solute species $i$ is $a_i = \gamma_i\,[i]/c^\circ$, where $[i]$ is its concentration and $\gamma_i$ its **activity coefficient** ($\gamma_i \to 1$ as the solution becomes infinitely dilute). The **ionic strength** of a solution is
$$
I = \frac{1}{2}\sum_i c_i z_i^2,
$$ {#eq-ionic-strength}
summed over all ions, with $c_i$ their concentrations and $z_i$ their charge numbers. The factor $z_i^2$ makes doubly and triply charged ions count four and nine times as much as singly charged ones. Neutral molecules do not contribute, and to a first approximation their activity coefficients are $1$.
:::

For a $1{:}1$ electrolyte such as $\mathrm{NaCl}$, $I = c$. For $\mathrm{MgSO_4}$ at $0.010\ \mathrm{mol\,dm^{-3}}$, $I = \frac12(0.010\times4 + 0.010\times4) = 0.040\ \mathrm{mol\,dm^{-3}}$ — four times the concentration. Ionic strength, not concentration, is what controls activity coefficients.

::: proposition The Debye–Hückel equations {#prop-debye-huckel}
For an ion of charge number $z$ in water at $25\ ^\circ\mathrm{C}$, with $I$ in $\mathrm{mol\,dm^{-3}}$:

1. the **Debye–Hückel limiting law**, valid for $I \lesssim 0.001\ \mathrm{mol\,dm^{-3}}$:
$$
\log_{10}\gamma = -A z^2\sqrt{I}, \qquad A = 0.509 ;
$$ {#eq-dh-limiting}
2. the empirical **Davies equation**, useful up to $I \approx 0.1$–$0.5\ \mathrm{mol\,dm^{-3}}$:
$$
\log_{10}\gamma = -A z^2\left(\frac{\sqrt{I}}{1+\sqrt{I}} - 0.3\,I\right) .
$$ {#eq-davies}

The constant $A = 1.825\times10^{6}\,(\varepsilon_\mathrm{r}T)^{-3/2}$ depends on the relative permittivity of the solvent and the temperature; for water at $298.15\ \mathrm{K}$, $\varepsilon_\mathrm{r} = 78.5$ gives $A = 0.509$. The **extended Debye–Hückel equation**, $\log_{10}\gamma = -Az^2\sqrt{I}/(1 + B\mathring{a}\sqrt{I})$ with an ion-size parameter $\mathring{a}$ for each ion, is an alternative to the Davies equation when tabulated ion sizes are available.
:::

::: proof {collapsed}
*Outline of the Debye–Hückel derivation.* Fix one ion, of charge $z_je$, at the origin. The electric potential $\phi(r)$ around it obeys Poisson's equation, $\nabla^2\phi = -\rho/(\varepsilon_\mathrm{r}\varepsilon_0)$, where the charge density $\rho$ comes from the other ions. Each ion species $i$ is distributed according to Boltzmann's law, $c_i(r) = c_i\exp(-z_ie\phi/k_\mathrm{B}T)$, so $\rho = \sum_i z_ie\,c_iN_\mathrm{A}\exp(-z_ie\phi/k_\mathrm{B}T)$. For a dilute solution the exponent is small; expanding to first order, the zeroth-order term vanishes by electroneutrality ($\sum c_iz_i = 0$) and
$$
\nabla^2\phi = \kappa^2\phi, \qquad \kappa^2 = \frac{2e^2N_\mathrm{A}\,I}{\varepsilon_\mathrm{r}\varepsilon_0k_\mathrm{B}T}
$$
(with $I$ in amount per volume). The ionic strength enters here, through $\sum_i c_iz_i^2 = 2I$. The spherically symmetric solution that vanishes at infinity is $\phi = (z_je/4\pi\varepsilon_\mathrm{r}\varepsilon_0)\,e^{-\kappa r}/r$: the Coulomb potential screened over the **Debye length** $1/\kappa$. Subtracting the bare-ion potential and letting $r\to0$ leaves the potential of the atmosphere at the central ion, $-z_je\kappa/(4\pi\varepsilon_\mathrm{r}\varepsilon_0)$. The work of charging the central ion in the presence of its atmosphere is the excess chemical potential, $\mu_j^\mathrm{ex} = k_\mathrm{B}T\ln\gamma_j = -z_j^2e^2\kappa/(8\pi\varepsilon_\mathrm{r}\varepsilon_0)$. Since $\kappa \propto \sqrt{I/(\varepsilon_\mathrm{r}T)}$, this gives $\ln\gamma_j \propto -z_j^2\sqrt{I}\,(\varepsilon_\mathrm{r}T)^{-3/2}$, which is [[#eq-dh-limiting]] once the constants are collected (and converted to base-10 logarithms and $\mathrm{mol\,dm^{-3}}$). Treating the ion as a sphere of finite radius rather than a point gives the denominator $1 + B\mathring{a}\sqrt{I}$ of the extended equation. The Davies equation adds an empirical linear term to describe the rise in $\gamma$ at higher ionic strength; it is a fit to data, not a derivation.
:::

The limiting law shows the essential behaviour: $\log\gamma$ falls in proportion to $\sqrt{I}$ and to $z^2$. At $I = 0.010\ \mathrm{mol\,dm^{-3}}$ the Davies equation gives $\gamma = 0.90$ for a singly charged ion, $0.66$ for a doubly charged ion and $0.40$ for a triply charged one. At $I = 0.10$ the values are $0.78$, $0.37$ and $0.11$. A triply charged ion in a moderately salty solution behaves as though only a tenth of it were there.

::: widget plot
f: 10^(-0.509*(sqrt(x)/(1+sqrt(x))-0.3*x)); 10^(-0.509*4*(sqrt(x)/(1+sqrt(x))-0.3*x)); 10^(-0.509*9*(sqrt(x)/(1+sqrt(x))-0.3*x)); 10^(-0.509*sqrt(x))
x: 0, 0.5
y: 0, 1
labels: z=1 \text{ (Davies)}; z=2 \text{ (Davies)}; z=3 \text{ (Davies)}; z=1 \text{ (limiting law)}
caption: Activity coefficients against ionic strength $I$ (in $\mathrm{mol\,dm^{-3}}$) at $25\ ^\circ\mathrm{C}$, from the Davies equation [[#eq-davies]] for ions of charge $1$, $2$ and $3$, with the Debye–Hückel limiting law [[#eq-dh-limiting]] for $z = 1$ for comparison. The two agree only at the far left; above $I \approx 0.01$ the limiting law falls far too steeply. The Davies curves flatten and begin to rise above $I \approx 0.3$, a real effect (ion hydration ties up solvent) that the equation captures only roughly. Note how quickly the $z = 3$ curve falls: $\mathrm{Fe^{3+}}$, $\mathrm{PO_4^{3-}}$ and $\mathrm{Al^{3+}}$ are strongly non-ideal even in dilute solutions.
:::

::: example Activity coefficients in a mixed electrolyte {#ex-ionic-strength}
Find the ionic strength of a solution that is $0.020\ \mathrm{mol\,dm^{-3}}$ in $\mathrm{Na_2SO_4}$ and $0.010\ \mathrm{mol\,dm^{-3}}$ in $\mathrm{NaCl}$, and the activity coefficients of $\mathrm{Na^+}$ and $\mathrm{SO_4^{2-}}$ from the Davies equation.
::: solution
The ions are $\mathrm{Na^+}$ at $2\times0.020 + 0.010 = 0.050$, $\mathrm{SO_4^{2-}}$ at $0.020$ and $\mathrm{Cl^-}$ at $0.010\ \mathrm{mol\,dm^{-3}}$. From [[#eq-ionic-strength]],
$$
I = \tfrac12\left(0.050\times1^2 + 0.020\times2^2 + 0.010\times1^2\right) = \tfrac12(0.050 + 0.080 + 0.010) = 0.070\ \mathrm{mol\,dm^{-3}} .
$$
Then $\sqrt{I} = 0.2646$ and $\sqrt{I}/(1+\sqrt{I}) - 0.3I = 0.2092 - 0.0210 = 0.1882$. For $\mathrm{Na^+}$: $\log_{10}\gamma = -0.509\times0.1882 = -0.0958$, $\gamma = 0.80$. For $\mathrm{SO_4^{2-}}$: $\log_{10}\gamma = -4\times0.0958 = -0.383$, $\gamma = 0.41$. More than half of the sulfate's "effective concentration" is lost to the ionic atmosphere. (The Davies equation is good to a few per cent at this ionic strength; quote $\gamma$ to two figures.)
:::
:::

### The salt effect on solubility

Activity coefficients explain the first puzzle of the introduction. With activities, the solubility product of silver chloride reads $K_\mathrm{sp} = \gamma_{\pm}^2[\mathrm{Ag^+}][\mathrm{Cl^-}]$, where for a $1{:}1$ salt we use the mean activity coefficient $\gamma_\pm$. If the solubility is $s$, then $s = \sqrt{K_\mathrm{sp}}/\gamma_\pm$: as inert salt raises $I$ and lowers $\gamma_\pm$, the solubility *rises*.

::: example Silver chloride in potassium nitrate {#ex-salt-effect}
$K_\mathrm{sp}(\mathrm{AgCl}) = 1.77\times10^{-10}$ at $25\ ^\circ\mathrm{C}$. Compare the solubility of silver chloride in pure water with its solubility in $0.050\ \mathrm{mol\,dm^{-3}}$ $\mathrm{KNO_3}$.
::: solution
In pure water the dissolved ions give $I \approx 10^{-5}$, so $\gamma_\pm \approx 1$ and $s = \sqrt{1.77\times10^{-10}} = 1.33\times10^{-5}\ \mathrm{mol\,dm^{-3}}$.

In $0.050\ \mathrm{mol\,dm^{-3}}$ $\mathrm{KNO_3}$, $I = 0.050$ (the silver chloride's own ions add a negligible $10^{-5}$). Davies: $\sqrt{I}/(1+\sqrt{I}) - 0.3I = 0.1827 - 0.0150 = 0.1677$, so $\log_{10}\gamma_\pm = -0.0854$ and $\gamma_\pm = 0.822$. Then
$$
s = \frac{\sqrt{K_\mathrm{sp}}}{\gamma_\pm} = \frac{1.33\times10^{-5}}{0.822} = 1.62\times10^{-5}\ \mathrm{mol\,dm^{-3}},
$$
$22\ \%$ more than in water. This matters in gravimetry: washing a precipitate with a concentrated electrolyte solution dissolves more of it than washing with a dilute one, although the electrolyte is needed to prevent peptisation ([[analytical-chemistry/classical-analysis]]).
:::
:::

Activity also explains the phosphate buffer. The thermodynamic constant for $\mathrm{H_2PO_4^-} \rightleftharpoons \mathrm{H^+} + \mathrm{HPO_4^{2-}}$ is $K_{\mathrm{a}2} = a_\mathrm{H^+}\gamma_{\mathrm{HPO_4^{2-}}}[\mathrm{HPO_4^{2-}}]/(\gamma_{\mathrm{H_2PO_4^-}}[\mathrm{H_2PO_4^-}])$. A pH electrode responds (approximately) to $a_\mathrm{H^+}$, so for equal concentrations of the two anions
$$
\mathrm{pH} = \mathrm{p}K_{\mathrm{a}2} + \log_{10}\frac{\gamma_{\mathrm{HPO_4^{2-}}}}{\gamma_{\mathrm{H_2PO_4^-}}},
$$
and because the doubly charged ion has the smaller $\gamma$, the pH is *below* $\mathrm{p}K_{\mathrm{a}2}$. At $I = 0.10$ the Davies values give $\log_{10}(0.373/0.782) = -0.32$, so the "pH 7.21" buffer reads about $6.89$. It is common to absorb such factors into a **conditional** (or concentration) constant $K'$, valid at one stated ionic strength — the approach of most tables of stability constants, which are quoted at, say, $I = 0.1\ \mathrm{mol\,dm^{-3}}$.

::: warning Activities are not optional decoration {#warn-activity}
It is tempting to treat activity corrections as fine print. They are not. At the ionic strengths of seawater ($I \approx 0.7$), blood plasma ($I \approx 0.15$) or a typical titration ($0.05$–$0.1$), activity coefficients of doubly charged ions are well below $0.5$, and errors of a factor of two or more in a computed solubility or free-ion concentration follow from ignoring them. The opposite mistake is also common: applying the limiting law at $I = 0.1$, where it underestimates $\gamma$ for $\mathrm{Ca^{2+}}$ by nearly a factor of two (it gives $0.23$; the Davies equation and experiment give about $0.37$). Use the limiting law only below $I \approx 0.001$, the Davies or extended equation up to about $0.1$–$0.5$, and specific-interaction or Pitzer models beyond that. And remember that a pH meter measures (approximately) $-\log a_\mathrm{H^+}$, not $-\log[\mathrm{H^+}]$.
:::

## The systematic treatment of equilibrium

Introductory acid–base problems are solved by guessing which reaction dominates, writing an ICE table, and checking afterwards that the guess was sensible. That works when one equilibrium dominates. When several are comparable — a very dilute acid, an amphiprotic salt, a metal ion that hydrolyses and also forms complexes — guessing fails. The systematic treatment replaces guessing with bookkeeping.

::: algorithm The systematic treatment of equilibrium {#alg-systematic}
1. Write every relevant reaction, including the autoprotolysis of water.
2. Write the **charge balance**: the sum of positive charge concentrations equals the sum of negative ones, $\sum_i z_i[\mathrm{C}_i] = \sum_j \lvert z_j\rvert[\mathrm{A}_j]$, each concentration multiplied by the magnitude of its charge.
3. Write a **mass balance** for each element or group whose total is known: the total concentration equals the sum of the concentrations of all species containing it.
4. Write the equilibrium-constant expression for each reaction (with activity coefficients if the ionic strength is significant).
5. Count: there must be as many independent equations as unknown concentrations.
6. Solve, either exactly (numerically) or after making approximations — and then check each approximation against the solution.
:::

The charge balance expresses electroneutrality: a solution cannot have a net charge. It is why the concentration of a doubly charged ion is multiplied by $2$: one $\mathrm{SO_4^{2-}}$ ion balances two $\mathrm{Na^+}$ ions. Mass balances express conservation: the phosphorus put into the flask is still there, distributed over $\mathrm{H_3PO_4}$, $\mathrm{H_2PO_4^-}$, $\mathrm{HPO_4^{2-}}$ and $\mathrm{PO_4^{3-}}$.

::: example A very dilute strong acid {#ex-dilute-hcl}
Find the pH of $1.0\times10^{-8}\ \mathrm{mol\,dm^{-3}}$ $\mathrm{HCl}$ at $25\ ^\circ\mathrm{C}$ ($K_\mathrm{w} = 1.0\times10^{-14}$).
::: solution
The naive answer, $\mathrm{pH} = 8.0$, describes a basic solution made by adding acid to water — impossible. The systematic treatment:

- Reactions: $\mathrm{HCl} \rightarrow \mathrm{H^+} + \mathrm{Cl^-}$ (complete); $\mathrm{H_2O} \rightleftharpoons \mathrm{H^+} + \mathrm{OH^-}$.
- Charge balance: $[\mathrm{H^+}] = [\mathrm{Cl^-}] + [\mathrm{OH^-}]$.
- Mass balance: $[\mathrm{Cl^-}] = 1.0\times10^{-8}$.
- Equilibrium: $[\mathrm{H^+}][\mathrm{OH^-}] = K_\mathrm{w}$ (activity coefficients are $1$ at this ionic strength).

Three unknowns, three equations. Substituting, $[\mathrm{H^+}] = 1.0\times10^{-8} + K_\mathrm{w}/[\mathrm{H^+}]$, i.e. $[\mathrm{H^+}]^2 - 1.0\times10^{-8}[\mathrm{H^+}] - 1.0\times10^{-14} = 0$, whose positive root is
$$
[\mathrm{H^+}] = \frac{1.0\times10^{-8} + \sqrt{(1.0\times10^{-8})^2 + 4.0\times10^{-14}}}{2} = 1.05\times10^{-7}\ \mathrm{mol\,dm^{-3}}, \qquad \mathrm{pH} = 6.98 .
$$
Water supplies most of the $\mathrm{H^+}$ here, and the added acid only slightly suppresses water's own ionisation. (In practice, carbon dioxide from the air would make an open solution more acidic than this.)
:::
:::

## Fractional composition of polyprotic systems

For a polyprotic acid, the mass balance and the equilibrium constants alone fix the *proportions* of each species at a given $[\mathrm{H^+}]$, whatever the total concentration. Those proportions are the fractional compositions.

::: proposition Fractional composition of a polyprotic acid {#prop-alpha}
For an acid $\mathrm{H}_n\mathrm{A}$ with stepwise acid dissociation constants $K_1, K_2, \dots, K_n$ and total (formal) concentration $F$, the fraction of the acid present as the species that has lost $j$ protons, $\alpha_j = [\mathrm{H}_{n-j}\mathrm{A}^{j-}]/F$, is
$$
\alpha_j = \frac{[\mathrm{H^+}]^{n-j}\,K_1K_2\cdots K_j}{D}, \qquad D = \sum_{k=0}^{n}[\mathrm{H^+}]^{n-k}\,K_1\cdots K_k ,
$$ {#eq-alpha}
with the empty product ($k = 0$) equal to $1$. For a diprotic acid,
$$
\alpha_{\mathrm{H_2A}} = \frac{[\mathrm{H^+}]^2}{D}, \quad \alpha_{\mathrm{HA^-}} = \frac{K_1[\mathrm{H^+}]}{D}, \quad \alpha_{\mathrm{A^{2-}}} = \frac{K_1K_2}{D}, \quad D = [\mathrm{H^+}]^2 + K_1[\mathrm{H^+}] + K_1K_2 .
$$
The fractions sum to $1$, depend only on pH, and two neighbouring species are equal when $\mathrm{pH} = \mathrm{p}K_j$.
:::

::: proof
From the stepwise equilibria, each species can be expressed through the fully protonated one: $[\mathrm{H}_{n-1}\mathrm{A}^-] = K_1[\mathrm{H}_n\mathrm{A}]/[\mathrm{H^+}]$, $[\mathrm{H}_{n-2}\mathrm{A}^{2-}] = K_1K_2[\mathrm{H}_n\mathrm{A}]/[\mathrm{H^+}]^2$, and in general $[\mathrm{H}_{n-j}\mathrm{A}^{j-}] = K_1\cdots K_j[\mathrm{H}_n\mathrm{A}]/[\mathrm{H^+}]^j$. The mass balance $F = \sum_j[\mathrm{H}_{n-j}\mathrm{A}^{j-}]$ then gives
$$
F = [\mathrm{H}_n\mathrm{A}]\sum_{k=0}^n \frac{K_1\cdots K_k}{[\mathrm{H^+}]^k} .
$$
Dividing each species by $F$ and multiplying numerator and denominator by $[\mathrm{H^+}]^n$ gives [[#eq-alpha]]. Since the numerators are the terms of $D$, the fractions sum to $1$. Two neighbours $j-1$ and $j$ are equal when $[\mathrm{H^+}]^{n-j+1}K_1\cdots K_{j-1} = [\mathrm{H^+}]^{n-j}K_1\cdots K_j$, i.e. $[\mathrm{H^+}] = K_j$.
:::

::: widget plot
f: 1/(1+10^(x-p1)+10^(2*x-p1-p2)); 10^(x-p1)/(1+10^(x-p1)+10^(2*x-p1-p2)); 10^(2*x-p1-p2)/(1+10^(x-p1)+10^(2*x-p1-p2))
x: 0, 14
y: 0, 1
sliders: p1=6.35:0:14:0.05; p2=10.33:0:14:0.05
labels: \alpha_{\mathrm{H_2A}}; \alpha_{\mathrm{HA^-}}; \alpha_{\mathrm{A^{2-}}}
caption: Fractional composition of a diprotic acid against pH ($x$), from [[#eq-alpha]]. The sliders set $\mathrm{p}K_1$ and $\mathrm{p}K_2$; the defaults are those of carbonic acid ($6.35$ and $10.33$), so the curves show why natural waters at pH 7–8.5 carry their inorganic carbon almost entirely as hydrogencarbonate. Neighbouring curves cross at $\alpha = 0.5$ when $\mathrm{pH} = \mathrm{p}K$. Move $\mathrm{p}K_2$ close to $\mathrm{p}K_1$ and the intermediate species never dominates — it peaks below $0.5$ — which is why two close end points cannot be resolved in a titration ([[analytical-chemistry/classical-analysis]]).
:::

::: example Phosphate at physiological pH {#ex-phosphate-alpha}
Phosphoric acid has $\mathrm{p}K_1 = 2.16$, $\mathrm{p}K_2 = 7.21$, $\mathrm{p}K_3 = 12.32$ (thermodynamic values at $25\ ^\circ\mathrm{C}$, CRC Handbook). Find the fractions of the four species at $\mathrm{pH}\ 7.40$, treating concentrations as activities.
::: solution
With $[\mathrm{H^+}] = 10^{-7.40} = 3.98\times10^{-8}$ and $K_1 = 6.92\times10^{-3}$, $K_2 = 6.17\times10^{-8}$, $K_3 = 4.79\times10^{-13}$, the four terms of $D$ are
$$
\begin{aligned}
[\mathrm{H^+}]^3 &= 6.31\times10^{-23}, & K_1[\mathrm{H^+}]^2 &= 1.097\times10^{-17},\\
K_1K_2[\mathrm{H^+}] &= 1.699\times10^{-17}, & K_1K_2K_3 &= 2.04\times10^{-22},
\end{aligned}
$$
summing to $D = 2.795\times10^{-17}$. Hence $\alpha_{\mathrm{H_3PO_4}} = 2.3\times10^{-6}$, $\alpha_{\mathrm{H_2PO_4^-}} = 0.392$, $\alpha_{\mathrm{HPO_4^{2-}}} = 0.608$, $\alpha_{\mathrm{PO_4^{3-}}} = 7.3\times10^{-6}$. Only the two species whose $\mathrm{p}K$ straddles the pH matter; the others are negligible. A shortcut confirms it: $[\mathrm{HPO_4^{2-}}]/[\mathrm{H_2PO_4^-}] = 10^{7.40-7.21} = 1.55$, and $1.55/2.55 = 0.608$. At the ionic strength of blood the conditional $\mathrm{p}K_2$ is about $6.9$, so the real ratio is nearer $3$ — another place where activities matter.
:::
:::

## Mixtures: putting the balances to work

The $\alpha$ functions make the charge balance a single equation in $[\mathrm{H^+}]$. Consider a solution of the amphiprotic salt $\mathrm{NaH_2PO_4}$ at formal concentration $F$. The charge balance is
$$
[\mathrm{Na^+}] + [\mathrm{H^+}] = [\mathrm{OH^-}] + [\mathrm{H_2PO_4^-}] + 2[\mathrm{HPO_4^{2-}}] + 3[\mathrm{PO_4^{3-}}],
$$
and with $[\mathrm{Na^+}] = F$ and each phosphate species written as $\alpha_jF$,
$$
F + [\mathrm{H^+}] - \frac{K_\mathrm{w}}{[\mathrm{H^+}]} - F\left(\alpha_1 + 2\alpha_2 + 3\alpha_3\right) = 0 .
$$ {#eq-charge-balance-phosphate}
Every $\alpha_j$ is a known function of $[\mathrm{H^+}]$, so this is one equation in one unknown — awkward by hand, trivial by computer. The same pattern handles any mixture: for each acid–base system add its $\alpha$-weighted charges; for each strong electrolyte add its fixed ion concentrations.

::: proposition The pH of an amphiprotic salt {#prop-amphiprotic}
For a solution of the intermediate form $\mathrm{HA^-}$ of a diprotic acid at formal concentration $F$ (as $\mathrm{NaHA}$), if the further dissociation into $\mathrm{A^{2-}}$ and the protonation to $\mathrm{H_2A}$ are the only significant reactions besides that of water,
$$
[\mathrm{H^+}] = \sqrt{\frac{K_1K_2F + K_1K_\mathrm{w}}{K_1 + F}} ,
$$ {#eq-amphiprotic}
which reduces to $\mathrm{pH} \approx \tfrac12(\mathrm{p}K_1 + \mathrm{p}K_2)$ only when $F \gg K_1$ and $K_2F \gg K_\mathrm{w}$.
:::

::: proof
Charge balance: $[\mathrm{Na^+}] + [\mathrm{H^+}] = [\mathrm{HA^-}] + 2[\mathrm{A^{2-}}] + [\mathrm{OH^-}]$. Mass balance: $[\mathrm{Na^+}] = F = [\mathrm{H_2A}] + [\mathrm{HA^-}] + [\mathrm{A^{2-}}]$. Subtracting the mass balance from the charge balance eliminates $[\mathrm{Na^+}]$:
$$
[\mathrm{H^+}] + [\mathrm{H_2A}] = [\mathrm{A^{2-}}] + [\mathrm{OH^-}],
$$
the **proton condition**: the protons gained (by water to make $\mathrm{H^+}$, and by $\mathrm{HA^-}$ to make $\mathrm{H_2A}$) equal the protons lost. Substitute $[\mathrm{H_2A}] = [\mathrm{H^+}][\mathrm{HA^-}]/K_1$, $[\mathrm{A^{2-}}] = K_2[\mathrm{HA^-}]/[\mathrm{H^+}]$ and $[\mathrm{OH^-}] = K_\mathrm{w}/[\mathrm{H^+}]$, then multiply through by $K_1[\mathrm{H^+}]$:
$$
[\mathrm{H^+}]^2\left(K_1 + [\mathrm{HA^-}]\right) = K_1K_2[\mathrm{HA^-}] + K_1K_\mathrm{w} .
$$
Because $\mathrm{HA^-}$ is both a weak acid and a weak base, little of it reacts; setting $[\mathrm{HA^-}] \approx F$ gives [[#eq-amphiprotic]]. When $F \gg K_1$ the denominator is $F$, and when $K_2F \gg K_\mathrm{w}$ the second numerator term is negligible, leaving $[\mathrm{H^+}]^2 = K_1K_2$.
:::

::: example Sodium dihydrogenphosphate: when the shortcut fails {#ex-amphiprotic}
Find the pH of $0.010\ \mathrm{mol\,dm^{-3}}$ and of $0.0010\ \mathrm{mol\,dm^{-3}}$ $\mathrm{NaH_2PO_4}$, using the constants of [[#ex-phosphate-alpha]] and ignoring activities. Compare with $\tfrac12(\mathrm{p}K_1 + \mathrm{p}K_2) = 4.69$.
::: solution
For $F = 0.010$: $K_1K_2F = 6.92\times10^{-3}\times6.17\times10^{-8}\times0.010 = 4.27\times10^{-12}$, $K_1K_\mathrm{w} = 6.9\times10^{-17}$ (negligible), and $K_1 + F = 0.01692$. Then
$$
[\mathrm{H^+}] = \sqrt{\frac{4.27\times10^{-12}}{0.01692}} = 1.59\times10^{-5}, \qquad \mathrm{pH} = 4.80 .
$$
For $F = 0.0010$: $[\mathrm{H^+}] = \sqrt{4.27\times10^{-13}/0.00792} = 7.34\times10^{-6}$, $\mathrm{pH} = 5.13$.

Solving the full charge balance [[#eq-charge-balance-phosphate]] numerically gives $4.80$ and $5.14$: the formula is excellent, but the shortcut $4.69$ is wrong by $0.1$ and $0.45$ pH units. The shortcut assumes $F \gg K_1$, and phosphoric acid's $K_1 = 6.9\times10^{-3}$ is comparable to $F$: a substantial fraction of the $\mathrm{H_2PO_4^-}$ is protonated to $\mathrm{H_3PO_4}$, which consumes $\mathrm{H^+}$ and raises the pH.
:::
:::

::: widget newton
f: 0.010 + 10^(-x) - 1e-14*10^x - 0.010*(6.918e-3*10^(-2*x) + 2*6.918e-3*6.166e-8*10^(-x) + 3*6.918e-3*6.166e-8*4.786e-13)/(10^(-3*x) + 6.918e-3*10^(-2*x) + 6.918e-3*6.166e-8*10^(-x) + 6.918e-3*6.166e-8*4.786e-13)
method: bisection
x0: 3
x1: 7
steps: 30
caption: Bisection on the charge balance [[#eq-charge-balance-phosphate]] for $0.010\ \mathrm{mol\,dm^{-3}}$ $\mathrm{NaH_2PO_4}$, written as a function of $x = \mathrm{pH}$ (the fraction is $\alpha_1 + 2\alpha_2 + 3\alpha_3$ from [[#eq-alpha]]). Starting from the bracket $3 < \mathrm{pH} < 7$, the interval halves every step and closes on $\mathrm{pH} = 4.80$. Bisection is the safe choice for charge balances: the function changes sign exactly once, but it is so steep (concentrations span many powers of ten) that Newton's method from a poor start can overshoot wildly.
:::

The systematic treatment extends unchanged to coupled solubility and complexation equilibria. For silver chloride in aqueous ammonia, the mass balance for silver includes $\mathrm{Ag^+}$, $\mathrm{Ag(NH_3)^+}$ and $\mathrm{Ag(NH_3)_2^+}$, the mass balance for chloride says all dissolved chloride came from the solid, and the constants are $K_\mathrm{sp}$ and the formation constants $\beta_1$, $\beta_2$. Metal–ligand systems also have $\alpha$ functions — the fraction of the metal present as each complex depends only on the free-ligand concentration — and the fraction of EDTA present as its fully deprotonated form, $\alpha_{\mathrm{Y^{4-}}}$, is the key to complexometric titrations in [[analytical-chemistry/classical-analysis]].

::: quiz
Which statement about the charge balance of a solution of $0.010\ \mathrm{mol\,dm^{-3}}$ $\mathrm{CaCl_2}$ and $0.020\ \mathrm{mol\,dm^{-3}}$ $\mathrm{Na_2SO_4}$ (ignore hydrolysis and ion pairing) is correct?
- [ ] $[\mathrm{Ca^{2+}}] + [\mathrm{Na^+}] + [\mathrm{H^+}] = [\mathrm{Cl^-}] + [\mathrm{SO_4^{2-}}] + [\mathrm{OH^-}]$
- [x] $2[\mathrm{Ca^{2+}}] + [\mathrm{Na^+}] + [\mathrm{H^+}] = [\mathrm{Cl^-}] + 2[\mathrm{SO_4^{2-}}] + [\mathrm{OH^-}]$
- [ ] $[\mathrm{Ca^{2+}}] + 2[\mathrm{Na^+}] + [\mathrm{H^+}] = 2[\mathrm{Cl^-}] + [\mathrm{SO_4^{2-}}] + [\mathrm{OH^-}]$
- [ ] The charge balance is not needed because both salts are neutral.
::: solution
Each concentration is multiplied by the magnitude of its ion's charge: one mole of $\mathrm{Ca^{2+}}$ carries two moles of positive charge. With the numbers: left side $0.020 + 0.040 = 0.060$, right side $0.020 + 0.040 = 0.060$ (plus the tiny, equal $\mathrm{H^+}$ and $\mathrm{OH^-}$). The third option confuses the stoichiometric coefficients of the salts with the charges of the ions. The charge balance is always true and often the most useful equation in the set.
:::
:::

## Logarithmic concentration diagrams

The $\alpha$ curves show proportions on a linear scale, which hides everything below a few per cent. For deciding which terms of a charge balance can be dropped, a **logarithmic concentration diagram** (Sillén diagram) is better: plot $\log_{10}$ of every species' concentration against pH for a fixed formal concentration. Each curve is made of nearly straight segments. For a monoprotic acid HA at formal concentration $F$, $[\mathrm{HA}] = F\,[\mathrm{H^+}]/([\mathrm{H^+}] + K_\mathrm{a})$: below $\mathrm{pH} = \mathrm{p}K_\mathrm{a}$ it is almost $F$ (a horizontal line), and above it $\log[\mathrm{HA}]$ falls with slope $-1$ per pH unit. $[\mathrm{A^-}]$ does the mirror image. The lines $\log[\mathrm{H^+}] = -\mathrm{pH}$ and $\log[\mathrm{OH^-}] = \mathrm{pH} - 14$ are straight diagonals.

The diagram turns an equation into a picture. For a solution of the pure acid, the proton condition is $[\mathrm{H^+}] = [\mathrm{A^-}] + [\mathrm{OH^-}]$. In acid solution $[\mathrm{OH^-}]$ is negligible, so the pH is where the $\log[\mathrm{H^+}]$ line crosses the $\log[\mathrm{A^-}]$ curve. For a solution of the pure base NaA, the proton condition is $[\mathrm{H^+}] + [\mathrm{HA}] = [\mathrm{OH^-}]$, and the pH is where $\log[\mathrm{HA}]$ crosses $\log[\mathrm{OH^-}]$. Reading the crossings, and seeing how far below them the neglected species lie, is a quick and honest way to check the approximations of [[#alg-systematic]].

::: widget plot
f: log10(F*10^(-x)/(10^(-x)+10^(-pKa))); log10(F*10^(-pKa)/(10^(-x)+10^(-pKa))); -x; x-14
x: 0, 14
y: -12, 0
sliders: F=0.01:0.0001:0.1:0.0001; pKa=4.76:2:12:0.01
labels: \log[\mathrm{HA}]; \log[\mathrm{A^-}]; \log[\mathrm{H^+}]; \log[\mathrm{OH^-}]
caption: Logarithmic concentration diagram for a monoprotic acid, with formal concentration $F$ (in $\mathrm{mol\,dm^{-3}}$) and $\mathrm{p}K_\mathrm{a}$ set by the sliders; the defaults describe $0.010\ \mathrm{mol\,dm^{-3}}$ acetic acid. A solution of the acid alone sits where the $\log[\mathrm{H^+}]$ line meets the $\log[\mathrm{A^-}]$ curve, near $\mathrm{pH}\ 3.4$ ([[#ex-log-diagram]]); a solution of the sodium salt alone sits where $\log[\mathrm{HA}]$ meets $\log[\mathrm{OH^-}]$, near $\mathrm{pH}\ 8.4$. Lower $F$ and both points move towards 7; raise $\mathrm{p}K_\mathrm{a}$ towards 9 and watch the acid's crossing approach the region where water's own $\mathrm{H^+}$ can no longer be ignored.
:::

::: example Reading a log diagram {#ex-log-diagram}
Use the logarithmic diagram for $0.010\ \mathrm{mol\,dm^{-3}}$ acetic acid ($\mathrm{p}K_\mathrm{a} = 4.76$) to find the pH of the acid solution, and check the approximation.
::: solution
In the region $\mathrm{pH} < \mathrm{p}K_\mathrm{a}$, $\log[\mathrm{HA}] \approx \log F = -2.00$ and $\log[\mathrm{A^-}] \approx \log F + \mathrm{pH} - \mathrm{p}K_\mathrm{a} = \mathrm{pH} - 6.76$. Setting this equal to $\log[\mathrm{H^+}] = -\mathrm{pH}$ gives $2\,\mathrm{pH} = 6.76$, $\mathrm{pH} = 3.38$. At that pH, $\log[\mathrm{OH^-}] = -10.62$, more than seven units below $\log[\mathrm{A^-}] = -3.38$: dropping $[\mathrm{OH^-}]$ was justified. The exact quadratic, $[\mathrm{H^+}]^2 + K_\mathrm{a}[\mathrm{H^+}] - K_\mathrm{a}F = 0$, gives $\mathrm{pH} = 3.39$; the small difference is the $4\ \%$ of the acid that has dissociated, which the straight-line approximation $[\mathrm{HA}] = F$ ignores.
:::
:::

## Side reactions and conditional constants

In analysis we usually care about one equilibrium — a precipitation, a complex formation — while others compete for the same species. Oxalate that precipitates calcium can also be protonated; a metal ion that EDTA should bind may also be held by ammonia from a buffer. Rather than solve the full system every time, we lump the competing reactions into a single number.

::: definition Side-reaction coefficient and conditional constant {#def-conditional}
If a species X takes part in a main reaction but is also distributed over other forms by **side reactions** (protonation, complexation by an auxiliary ligand, hydrolysis), let $[\mathrm{X}']$ be the total concentration of X not engaged in the main reaction. The **side-reaction coefficient** is
$$
\alpha_\mathrm{X} = \frac{[\mathrm{X}']}{[\mathrm{X}]} \ge 1
$$
(so $1/\alpha_\mathrm{X}$ is the fraction present as the reacting form). For a metal ion M with an auxiliary ligand L, $\alpha_\mathrm{M} = 1 + \beta_1[\mathrm{L}] + \beta_2[\mathrm{L}]^2 + \cdots$. A **conditional constant** is the main constant written with primed concentrations; for a solubility product, $K_\mathrm{sp}' = [\mathrm{M}'][\mathrm{A}'] = K_\mathrm{sp}\,\alpha_\mathrm{M}\alpha_\mathrm{A}$. It is constant only at fixed pH and fixed auxiliary-ligand concentration.
:::

Note the two conventions in use: the $\alpha_j$ of [[#prop-alpha]] are *fractions* (at most $1$), while Ringbom's side-reaction coefficients are their *reciprocals* (at least $1$). For the oxalate dianion, $\alpha_{\mathrm{C_2O_4}}(\text{side reaction}) = 1/\alpha_{\mathrm{C_2O_4^{2-}}}(\text{fraction})$. Both appear in textbooks; check which one a table uses.

::: example Calcium oxalate in acid {#ex-oxalate}
Calcium oxalate has $K_\mathrm{sp} \approx 2.3\times10^{-9}$ (a representative value; reported values vary with the hydrate), and oxalic acid has $\mathrm{p}K_1 = 1.25$, $\mathrm{p}K_2 = 4.27$. Find the solubility of calcium oxalate at $\mathrm{pH}\ 7.00$, $4.00$ and $2.00$ (fixed by a buffer), ignoring activities.
::: solution
Let $s$ be the solubility. Then $[\mathrm{Ca^{2+}}] = s$ and the total dissolved oxalate is $s$, of which a fraction $\alpha_{\mathrm{C_2O_4^{2-}}} = K_1K_2/([\mathrm{H^+}]^2 + K_1[\mathrm{H^+}] + K_1K_2)$ is the dianion. So $K_\mathrm{sp} = s\cdot\alpha s$ and $s = \sqrt{K_\mathrm{sp}/\alpha}$.

- $\mathrm{pH}\ 7.00$: $\alpha = 0.998$, $s = 4.8\times10^{-5}\ \mathrm{mol\,dm^{-3}}$.
- $\mathrm{pH}\ 4.00$: $\alpha = 0.349$, $s = 8.1\times10^{-5}\ \mathrm{mol\,dm^{-3}}$.
- $\mathrm{pH}\ 2.00$: $\alpha = 4.54\times10^{-3}$, $s = 7.1\times10^{-4}\ \mathrm{mol\,dm^{-3}}$.

The conditional solubility product $K_\mathrm{sp}' = K_\mathrm{sp}/\alpha$ rises by a factor of about $220$ between pH 7 and pH 2. That is why calcium is precipitated as the oxalate from a hot, acid solution that is then neutralised slowly with ammonia (slow precipitation at low supersaturation gives larger, purer crystals), and why the precipitate must not be washed with acid.
:::
:::

## Where this leads

These tools underlie every equilibrium-based method in the course. Precipitation equilibria with activity corrections, the fractional composition of EDTA and conditional formation constants, and the shapes of acid–base, complexometric and redox titration curves are developed in [[analytical-chemistry/classical-analysis]]. Activity reappears in potentiometry, because electrodes respond to activities, not concentrations ([[analytical-chemistry/electroanalytical]]). Distribution equilibria in two-phase systems become the theory of retention in [[analytical-chemistry/chromatography]]. Natural waters — the carbonate system, metal speciation and solubility in the environment — are taken up in [[environmental-chemistry/natural-waters]], and the thermodynamics behind activity coefficients in [[thermodynamics/ions-in-solution]].

::: history
G. N. Lewis introduced the terms *activity* (1907) and *ionic strength* (with Merle Randall, 1921) to make thermodynamics work for real solutions. Peter Debye and Erich Hückel published their theory of the ionic atmosphere in *Physikalische Zeitschrift* in 1923, explaining the square-root dependence on concentration that Friedrich Kohlrausch had found empirically in conductivities. Cecil Davies proposed his empirical extension in 1938. For acid–base work, Niels Bjerrum's 1914 treatment of amphoteric electrolytes introduced the distribution diagrams that we now draw as $\alpha$ curves, and Lars Gunnar Sillén developed graphical log-concentration diagrams for equilibrium calculations in the 1950s. The tables of stability constants compiled by Sillén and Arthur Martell (*Stability Constants of Metal-Ion Complexes*, 1964) remain a foundation of analytical equilibrium data.
:::

::: summary
- Equilibrium constants are exact in activities $a_i = \gamma_i[i]/c^\circ$; activity coefficients fall with ionic strength $I = \frac12\sum c_iz_i^2$, much faster for highly charged ions.
- The Debye–Hückel limiting law $\log\gamma = -0.509z^2\sqrt{I}$ (25 °C) holds below $I \approx 0.001$; the Davies equation extends to $I \approx 0.1$–$0.5$.
- Inert salts raise the solubility of sparingly soluble salts (the salt effect) and shift the pH of buffers from their $\mathrm{p}K_\mathrm{a}$; conditional constants absorb these effects at a stated $I$.
- The systematic treatment — reactions, charge balance, mass balances, constants, count, solve — works for any mixture; approximations are made afterwards and checked.
- Fractional compositions $\alpha_j$ of a polyprotic acid depend only on pH; neighbouring species are equal at $\mathrm{pH} = \mathrm{p}K_j$.
- The amphiprotic formula $[\mathrm{H^+}] = \sqrt{(K_1K_2F + K_1K_\mathrm{w})/(K_1+F)}$ is reliable; the shortcut $\tfrac12(\mathrm{p}K_1+\mathrm{p}K_2)$ fails when $F$ is not much larger than $K_1$.
- Charge balances written with $\alpha$ functions reduce any acid–base mixture to one equation in $[\mathrm{H^+}]$, best solved numerically by bisection.
:::

## Exercises

::: exercise Ionic strength {level=1 check="0.021"}
Calculate the ionic strength of a solution containing $0.0050\ \mathrm{mol\,dm^{-3}}$ $\mathrm{K_2SO_4}$ and $0.0020\ \mathrm{mol\,dm^{-3}}$ $\mathrm{MgCl_2}$. (Enter $I$ in $\mathrm{mol\,dm^{-3}}$.)
::: solution
Ions: $\mathrm{K^+}$ $0.010$, $\mathrm{SO_4^{2-}}$ $0.0050$, $\mathrm{Mg^{2+}}$ $0.0020$, $\mathrm{Cl^-}$ $0.0040\ \mathrm{mol\,dm^{-3}}$. Then $I = \frac12(0.010\times1 + 0.0050\times4 + 0.0020\times4 + 0.0040\times1) = \frac12(0.042) = 0.021\ \mathrm{mol\,dm^{-3}}$.
:::
:::

::: exercise An activity coefficient {level=1 check="0.66"}
Use the Davies equation to find the activity coefficient of $\mathrm{Ca^{2+}}$ at $I = 0.010\ \mathrm{mol\,dm^{-3}}$ and $25\ ^\circ\mathrm{C}$. What does the limiting law give? (Enter the Davies value.)
::: solution
$\sqrt{I} = 0.100$; $\sqrt{I}/(1+\sqrt{I}) - 0.3I = 0.0909 - 0.0030 = 0.0879$; $\log_{10}\gamma = -0.509\times4\times0.0879 = -0.179$; $\gamma = 0.66$. The limiting law gives $\log_{10}\gamma = -0.509\times4\times0.100 = -0.204$, $\gamma = 0.63$ — already $5\ \%$ low at this modest ionic strength.
:::
:::

::: exercise Carbonate speciation {level=1 check="0.980"}
With $\mathrm{p}K_1 = 6.35$ and $\mathrm{p}K_2 = 10.33$ for carbonic acid, what fraction of dissolved inorganic carbon is present as $\mathrm{HCO_3^-}$ at $\mathrm{pH}\ 8.30$? (Enter $\alpha_{\mathrm{HCO_3^-}}$.)
::: solution
With $h = 10^{-8.30}$: $D/h^2 = 1 + 10^{8.30-6.35} + 10^{16.60-16.68} = 1 + 89.1 + 0.832 = 90.9$. So $\alpha_{\mathrm{HCO_3^-}} = 89.1/90.9 = 0.980$, with $\alpha_{\mathrm{H_2CO_3}} = 0.011$ and $\alpha_{\mathrm{CO_3^{2-}}} = 0.009$. pH 8.3 is where hydrogencarbonate peaks — the phenolphthalein end point of a carbonate titration.
:::
:::

::: exercise A very dilute base {level=2 check="7.11"}
Find the pH of $5.0\times10^{-8}\ \mathrm{mol\,dm^{-3}}$ $\mathrm{NaOH}$ at $25\ ^\circ\mathrm{C}$. (Enter the pH.)
::: solution
Charge balance $[\mathrm{Na^+}] + [\mathrm{H^+}] = [\mathrm{OH^-}]$, with $[\mathrm{Na^+}] = 5.0\times10^{-8}$ and $[\mathrm{H^+}] = K_\mathrm{w}/[\mathrm{OH^-}]$: $[\mathrm{OH^-}]^2 - 5.0\times10^{-8}[\mathrm{OH^-}] - 1.0\times10^{-14} = 0$, so $[\mathrm{OH^-}] = (5.0\times10^{-8} + \sqrt{2.5\times10^{-15} + 4.0\times10^{-14}})/2 = 1.28\times10^{-7}$, $\mathrm{pOH} = 6.89$, $\mathrm{pH} = 7.11$ (not $6.7$, the naive answer).
:::
:::

::: exercise Sodium hydrogencarbonate {level=2 check="8.34"}
Find the pH of $0.050\ \mathrm{mol\,dm^{-3}}$ $\mathrm{NaHCO_3}$ from [[#eq-amphiprotic]] (constants as in the previous exercise but one), and explain why the simple average of $\mathrm{p}K$ values works here although it failed for $\mathrm{NaH_2PO_4}$. (Enter the pH.)
::: solution
$K_1 = 4.47\times10^{-7}$, $K_2 = 4.68\times10^{-11}$. $K_1K_2F = 1.04\times10^{-18}$, $K_1K_\mathrm{w} = 4.5\times10^{-21}$, $K_1 + F \approx 0.050$. $[\mathrm{H^+}] = \sqrt{(1.04\times10^{-18} + 0.0045\times10^{-18})/0.050} = 4.58\times10^{-9}$, $\mathrm{pH} = 8.34$, equal to $\tfrac12(6.35 + 10.33) = 8.34$. Both conditions hold comfortably: $F = 0.050 \gg K_1 = 4.5\times10^{-7}$ and $K_2F = 2.3\times10^{-12} \gg K_\mathrm{w}$. For $\mathrm{NaH_2PO_4}$, $K_1$ was comparable to $F$.
:::
:::

::: exercise The salt effect on barium sulfate {level=2 check="2.68"}
By what factor does the solubility of barium sulfate in $0.10\ \mathrm{mol\,dm^{-3}}$ $\mathrm{NaCl}$ exceed its solubility in pure water? Use the Davies equation and neglect the barium sulfate's own contribution to $I$. (Enter the factor.)
::: solution
In water $\gamma \approx 1$ and $s_0 = \sqrt{K_\mathrm{sp}}$. In the salt, $s = \sqrt{K_\mathrm{sp}}/\gamma_\pm$ with $\gamma_\pm$ for $z = 2$ at $I = 0.10$: $\sqrt{I}/(1+\sqrt{I}) - 0.3I = 0.2403 - 0.0300 = 0.2103$; $\log_{10}\gamma = -0.509\times4\times0.2103 = -0.428$; $\gamma = 0.373$. The factor is $1/0.373 = 2.68$. Doubly charged ions are much more strongly affected than the $1{:}1$ case of [[#ex-salt-effect]].
:::
:::

::: exercise The real pH of an equimolar phosphate buffer {level=3 check="6.89"}
An equimolar $\mathrm{NaH_2PO_4}$/$\mathrm{Na_2HPO_4}$ buffer is adjusted with $\mathrm{NaCl}$ to $I = 0.10\ \mathrm{mol\,dm^{-3}}$. Using $\mathrm{p}K_2 = 7.21$ and the Davies equation, predict the reading of a pH meter (which measures $-\log_{10}a_\mathrm{H^+}$). Then predict the pH at which $[\mathrm{H_2PO_4^-}] = [\mathrm{HPO_4^{2-}}]$ in the same medium is reached, if instead the "pH" were defined as $-\log_{10}[\mathrm{H^+}]$ with $\gamma_\mathrm{H^+}$ from the Davies equation. (Enter the meter reading.)
::: hint
Write $K_2$ in activities and keep the activity of $\mathrm{H^+}$ intact for the meter. For the second part, $a_\mathrm{H^+} = \gamma_1[\mathrm{H^+}]$.
:::
::: solution
$K_2 = a_\mathrm{H^+}\gamma_2[\mathrm{HPO_4^{2-}}]/(\gamma_1[\mathrm{H_2PO_4^-}])$. With equal concentrations, $-\log a_\mathrm{H^+} = \mathrm{p}K_2 + \log_{10}(\gamma_2/\gamma_1)$. At $I = 0.10$: $\gamma_1 = 0.782$, $\gamma_2 = 0.373$, $\log_{10}(0.373/0.782) = -0.322$. Meter reading: $7.21 - 0.32 = 6.89$.

For the concentration scale, $a_\mathrm{H^+} = \gamma_1[\mathrm{H^+}]$, so $-\log[\mathrm{H^+}] = -\log a_\mathrm{H^+} + \log\gamma_1 = 6.89 - 0.107 = 6.78$; equivalently the concentration constant is $\mathrm{p}K_2' = \mathrm{p}K_2 + \log_{10}\gamma_2 = 6.78$ (taking $\gamma_\mathrm{H^+} = \gamma_1$). Two "pH" scales differing by $0.1$ in the same solution show why stating the convention matters in any careful work.
:::
:::

::: exercise Silver chloride in ammonia {level=3 check="0.00479"}
Find the solubility of $\mathrm{AgCl}$ in $0.10\ \mathrm{mol\,dm^{-3}}$ aqueous ammonia. Use $K_\mathrm{sp} = 1.77\times10^{-10}$ and $\beta_2 = 10^{7.20}$ for $\mathrm{Ag^+} + 2\,\mathrm{NH_3} \rightleftharpoons \mathrm{Ag(NH_3)_2^+}$; assume that $\mathrm{Ag(NH_3)_2^+}$ is the dominant silver species, ignore the protonation of ammonia and activity coefficients. Then check the assumption. (Enter the solubility in $\mathrm{mol\,dm^{-3}}$ to three significant figures.)
::: hint
Mass balances: $[\mathrm{Cl^-}] = s \approx [\mathrm{Ag(NH_3)_2^+}]$ and $[\mathrm{NH_3}] = 0.10 - 2s$. The overall reaction $\mathrm{AgCl(s)} + 2\,\mathrm{NH_3} \rightleftharpoons \mathrm{Ag(NH_3)_2^+} + \mathrm{Cl^-}$ has $K = K_\mathrm{sp}\beta_2$.
:::
::: solution
$K = 1.77\times10^{-10}\times1.585\times10^{7} = 2.81\times10^{-3}$. Then $s^2/(0.10 - 2s)^2 = K$, so $s/(0.10 - 2s) = \sqrt{K} = 0.0530$ and
$$
s = \frac{0.10\times0.0530}{1 + 2\times0.0530} = 4.79\times10^{-3}\ \mathrm{mol\,dm^{-3}} .
$$
Check: free $[\mathrm{Ag^+}] = K_\mathrm{sp}/s = 3.7\times10^{-8}$, negligible against $s$; $[\mathrm{Ag(NH_3)^+}] = \beta_1[\mathrm{Ag^+}][\mathrm{NH_3}]$ with $\beta_1 \approx 10^{3.3}$ is about $7\times10^{-6}$, also negligible (including it changes $s$ by less than $0.1\ \%$). The solubility is $360$ times that in water — the basis for separating silver chloride from silver iodide in classical qualitative analysis. Neglecting $\mathrm{NH_4^+}$ formation is fine because $0.10\ \mathrm{mol\,dm^{-3}}$ ammonia is only about $1\ \%$ protonated.
:::
:::
