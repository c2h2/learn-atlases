Dissolve $0.010\ \mathrm{mol}$ of sucrose in $1\ \mathrm{kg}$ of water and every colligative property of [[thermodynamics/mixtures|the mixtures chapter]] works to within a per cent: the sugar molecules sit in solution almost exactly as the ideal-dilute theory says they should. Dissolve the same amount of potassium chloride and the freezing point falls nearly twice as far as a mole of particles should manage — that part at least is familiar — but it falls *less* than the full doubling, and the shortfall is not experimental error. At $0.010\ \mathrm{mol\,kg^{-1}}$ the measured mean activity coefficient of $\mathrm{KCl}$ is $0.902$; at $0.10\ \mathrm{mol\,kg^{-1}}$ it is $0.778$; even at $1.0\ \mathrm{mol\,kg^{-1}}$ it is still only $0.604$ (Robinson & Stokes, as tabulated in CRC). A strong electrolyte — one fully dissociated at every concentration — behaves non-ideally at concentrations where sugar is ideal to a thousandth. The ions are not recombining; something else is wrong with ideality.

That something else is the Coulomb force. A neutral solute molecule talks to its neighbours only when they collide; an ion feels every other ion in the solution, across tens of molecular diameters, with a force damped by the dielectric constant of water but never switched off. The thermodynamics of the previous chapters survives this — the chemical potential is still $\mu_i = \mu_i^\circ + RT\ln a_i$, exactly as in [[thermodynamics/mixtures]] — but the activity $a_i$ of an ion can never be reduced to "the mole fraction that makes the ideal formula come true" by measurement, because no experiment can add cations without their balancing anions. This chapter builds the machinery that gets around that impossibility: mean ionic activities, the ionic strength, and the Debye–Hückel theory that computes activity coefficients from nothing but charge, temperature and the dielectric constant of the solvent. With them we will understand why salt makes sparingly soluble salts more soluble, why pH is a measurement of activity and not of concentration, and why the osmotic pressure of seawater is a little less than twice that of a sugar solution of the same salt content.

Throughout, the standard state for the solvent is the pure liquid as in [[thermodynamics/mixtures]], and for solutes it is the molality convention: $b^\circ = 1\ \mathrm{mol\,kg^{-1}}$, hypothetical ideal solution, with $p^\circ = 1\ \mathrm{bar}$ and the sign convention $\Delta U = q + w$ inherited from [[thermodynamics/first-law]].

## Why ions are different

Two elementary charges $e$ separated by a distance $r$ in a medium of relative permittivity $\varepsilon_\mathrm{r}$ interact with potential energy

$$
w(r) = \frac{e^{2}}{4\pi\varepsilon_{0}\varepsilon_\mathrm{r} r}.
$$

Water at $25\,^\circ\mathrm{C}$ has $\varepsilon_\mathrm{r} = 78.54$ (CRC), which weakens the vacuum interaction by a factor of nearly eighty — but not by much more. Setting $w = k_\mathrm{B}T$ and solving for $r$ gives the **Bjerrum length** $l_\mathrm{B} = e^{2}/(4\pi\varepsilon_{0}\varepsilon_\mathrm{r}k_\mathrm{B}T) = 0.714\ \mathrm{nm}$ in water at $25\,^\circ\mathrm{C}$: the separation at which two unit charges feel each other with exactly the thermal energy. Two ions at contact ($r \approx 0.3\ \mathrm{nm}$) interact at nearly $2.5\,k_\mathrm{B}T$; at $3\ \mathrm{nm}$ they still feel one another at a quarter of $k_\mathrm{B}T$. Compare the geometry of a dilute solution: in $0.010\ \mathrm{mol\,kg^{-1}}$ $\mathrm{KCl}$ the mean separation of ions is about $4\ \mathrm{nm}$, so *every* ion sits inside the interaction range of *every* other. A $0.010\ \mathrm{mol\,kg^{-1}}$ sugar solution has the same number of solute molecules per litre and no measurable interaction at all, because the molecules carry no net charge and their van der Waals fields die out in a molecular diameter.

The second difference is hydration. An ion is not a charged sphere in empty space but a charged sphere wearing a shell of oriented water molecules — bound ion–dipole complexes that move through the solution with the ion. The electrostriction noted in [[thermodynamics/mixtures]] (the negative partial molar volume of $\mathrm{MgSO_4}$) is one macroscopic trace of this shell. Hydration changes sizes, mobilities and entropies, but it does not change the thermodynamic problem: what makes electrolytes *theoretically tractable* is that the dominant non-ideality is the long-range Coulomb term, which is exactly the term statistical mechanics handles best, because a weak long-range interaction can be treated by averaging a smooth field rather than by counting violent close encounters. This is the programme of [[statistical-thermodynamics/real-gases-liquids]] carried out in its most successful early form.

Because dissociation is complete, the chemical language of electrolytes must speak in ions from the start. For a salt $\mathrm{M_{\nu_+}X_{\nu_-}}$ dissolving as $\mathrm{M_{\nu_+}X_{\nu_-} \rightarrow \nu_+\,M^{z_+} + \nu_-\,X^{z_-}}$, electroneutrality requires $\nu_+ z_+ = \nu_- |z_-|$ at every instant, and the total number of ions per formula unit is $\nu = \nu_+ + \nu_-$.

## Mean chemical potential and mean activity coefficient

::: definition Mean ionic chemical potential and activity coefficient {#def-mean-activity}
For an electrolyte $\mathrm{M_{\nu_+}X_{\nu_-}}$ at molality $b$, with $\nu = \nu_+ + \nu_-$, the chemical potential of the dissolved salt is $\mu = \nu_+ \mu_+ + \nu_- \mu_-$, with $\mu_i = \mu_i^\circ + RT\ln a_i$ for each ion. Because the individual activities $a_i$ cannot be measured separately, one defines the **mean ionic activity** $a_\pm$ and **mean ionic activity coefficient** $\gamma_\pm$ by

$$
a_\pm^{\nu} \equiv a_+^{\nu_+} a_-^{\nu_-}, \qquad
\gamma_\pm^{\nu} \equiv \gamma_+^{\nu_+} \gamma_-^{\nu_-}, \qquad
a_\pm = \gamma_\pm\,\frac{b_\pm}{b^\circ},
$$

with the **mean ionic molality** $b_\pm \equiv \left(b_+^{\nu_+} b_-^{\nu_-}\right)^{1/\nu}$ and the **mean ionic activity-coefficient number** $\nu_\pm \equiv \left(\nu_+^{\nu_+} \nu_-^{\nu_-}\right)^{1/\nu}$, so that $b_\pm = \nu_\pm b$. Then the salt's chemical potential takes the ideal form

$$
\mu = \mu^\circ + \nu RT \ln a_\pm, \qquad \mu^\circ \equiv \nu_+\mu_+^\circ + \nu_-\mu_-^\circ .
$$
:::

The definition is a truce with experiment, not a statement about individual ions. Every measurable property of the solution — vapour pressure, freezing point, cell potential — depends on $\mu$, hence on the single combination $a_+^{\nu_+}a_-^{\nu_-}$, and never on $a_+$ and $a_-$ separately. The split into $\gamma_+$ and $\gamma_-$ inside $\gamma_\pm^\nu = \gamma_+^{\nu_+}\gamma_-^{\nu_-}$ is a convention (the Debye–Hückel theory assigns them equal values at low concentration, and single-ion scales differ elsewhere), but $\gamma_\pm$ itself is as measurable as a vapour pressure. For $\mathrm{CaCl_2}$ ($\nu_+ = 1$, $\nu_- = 2$): $\nu_\pm = (1^1 2^2)^{1/3} = 4^{1/3} = 1.587$, $b_\pm = 1.587\,b$, $\gamma_\pm = (\gamma_+ \gamma_-^2)^{1/3}$. For $\mathrm{Al_2(SO_4)_3}$: $\nu_\pm = (2^2 3^3)^{1/5} = 108^{1/5} = 2.551$.

::: example Mean activity of $0.020\ \mathrm{mol\,kg^{-1}}$ calcium chloride {#ex-mean-activity}
For $\mathrm{CaCl_2(aq)}$ at $b = 0.020\ \mathrm{mol\,kg^{-1}}$ and $25\,^\circ\mathrm{C}$, take $\gamma_\pm = 0.739$ (extended Debye–Hückel, computed below). Find $b_\pm$, $a_\pm$, and the departure $\mu - \mu^\circ$ of the dissolved salt's chemical potential from its standard value.
::: solution
With $\nu = 3$ and $\nu_\pm = 4^{1/3} = 1.587$,
$$
b_\pm = 1.587 \times 0.020\ \mathrm{mol\,kg^{-1}} = 0.0317\ \mathrm{mol\,kg^{-1}}, \qquad
a_\pm = 0.739 \times 0.0317 = 0.0235 .
$$
Then
$$
\mu - \mu^\circ = 3RT\ln a_\pm = 3 \times 8.314 \times 298.15 \times \ln 0.0235\ \mathrm{J\,mol^{-1}} = -27.9\ \mathrm{kJ\,mol^{-1}} .
$$
Had the solution been ideal ($\gamma_\pm = 1$), the same calculation with $a_\pm = b_\pm/b^\circ = 0.0317$ would have given $-25.7\ \mathrm{kJ\,mol^{-1}}$: the ionic interactions stabilise the dissolved salt by $2.2\ \mathrm{kJ\,mol^{-1}}$ at this concentration. Note how the factor $\nu = 3$ multiplies everything — three ions per formula unit, three logarithms' worth of dilution free energy.
:::
:::

::: warning You can never measure a single-ion activity coefficient {#warn-single-ion}
A flask of $\mathrm{NaCl}$ solution is not a mixture of two independent solutes: electroneutrality forbids adding $\mathrm{Na^+}$ without $\mathrm{Cl^-}$. Every thermodynamic measurement — freezing-point depression, vapour-pressure lowering, a cell's EMF — therefore fixes only combinations such as $\gamma_+^{1}\gamma_-^{1}$ (for a 1:1 salt), never $\gamma_+$ alone. Tabulated "single-ion" values ($\gamma_{\mathrm{H^+}} \equiv \gamma_\pm(\mathrm{HCl})$, or the values of a chosen convention) are exactly that: conventions, useful and internally consistent, but not measurable facts. The corollary students miss in exams: a statement like "the activity coefficient of $\mathrm{SO_4^{2-}}$ in blood is $0.15$" is shorthand for a convention-dependent number; the measurable statement is always about an electroneutral combination.
:::

## The ionic strength

The Coulomb energy of an ion in solution is set by the whole ionic mixture, and one number organises it.

::: definition Ionic strength {#def-ionic-strength}
The **ionic strength** of a solution is
$$
I \equiv \frac{1}{2}\sum_i b_i z_i^{2} ,
$$

the half-weighted sum of molalities times squared charge numbers over all ions. For a single electrolyte $\mathrm{M_{\nu_+}X_{\nu_-}}$: $I = \tfrac{1}{2}\left(\nu_+ z_+^2 + \nu_- z_-^2\right) b$, so $I = b$ for a 1:1 salt, $I = 3b$ for a 2:1 salt such as $\mathrm{CaCl_2}$, $I = 3b$ for a 1:2 salt, and $I = 6b$ for a 2:2 salt such as $\mathrm{CuSO_4}$. For a mixture, ionic strengths add. The charge enters squared: a $0.010\ \mathrm{mol\,kg^{-1}}$ solution of a 2:2 electrolyte ($I = 0.060$) burdens the ionic atmosphere six times as much as the same molality of a 1:1 electrolyte ($I = 0.010$).
:::

::: example Ionic strengths {#ex-ionic-strength}
Find $I$ at $25\,^\circ\mathrm{C}$ for (a) $0.010\ \mathrm{mol\,kg^{-1}}$ $\mathrm{KNO_3}$; (b) $0.010\ \mathrm{mol\,kg^{-1}}$ $\mathrm{K_2SO_4}$; (c) $0.020\ \mathrm{mol\,kg^{-1}}$ $\mathrm{CaCl_2}$; (d) a mixture of $0.020\ \mathrm{mol\,kg^{-1}}$ $\mathrm{Na_2SO_4}$ and $0.010\ \mathrm{mol\,kg^{-1}}$ $\mathrm{KCl}$.
::: solution
**(a)** $I = \tfrac{1}{2}\left[(0.010)(1) + (0.010)(1)\right] = 0.010\ \mathrm{mol\,kg^{-1}}$.
**(b)** $b(\mathrm{K^+}) = 0.020$, $b(\mathrm{SO_4^{2-}}) = 0.010$: $I = \tfrac{1}{2}\left[(0.020)(1) + (0.010)(4)\right] = 0.030\ \mathrm{mol\,kg^{-1}}$.
**(c)** $b(\mathrm{Ca^{2+}}) = 0.020$, $b(\mathrm{Cl^-}) = 0.040$: $I = \tfrac{1}{2}\left[(0.020)(4) + (0.040)(1)\right] = 0.060\ \mathrm{mol\,kg^{-1}}$.
**(d)** $b(\mathrm{Na^+}) = 0.040$, $b(\mathrm{SO_4^{2-}}) = 0.020$, $b(\mathrm{K^+}) = 0.010$, $b(\mathrm{Cl^-}) = 0.010$: $I = \tfrac{1}{2}\left[0.040 + 4(0.020) + 0.010 + 0.010\right] = 0.070\ \mathrm{mol\,kg^{-1}}$.
The point of (d) is the practical rule: for dilute mixtures, do not re-derive anything — compute each salt's $I$ and add. Note also how (b) and (c) differ from their molalities by factors of 3: the charge-squared weighting is not a detail, it is the whole design.
:::
:::

## The ionic atmosphere and the Debye–Hückel limiting law

::: history From Arrhenius's ions to Debye and Hückel's atmosphere {#hist-ions}
Svante Arrhenius (Arrhenius) proposed in 1887 that electrolytes dissociate into ions in solution whether or not current is drawn — a claim Wilhelm Ostwald (Ostwald) helped push through the resistance of the chemical establishment, and which earned Arrhenius the 1903 Nobel Prize in Chemistry. Walther Nernst (Nernst) showed in 1888–1889 that the osmotic behaviour of dilute electrolytes, and the potentials of electrodes, follow the same logarithmic law, and his equation for cell potentials made activities measurable before anyone could define them. The first statistical theory of the deviation was the **Guntelberg limiting law** (1922), which already predicted that $\log\gamma_\pm$ should be proportional to the square root of the concentration. Peter Debye (Debye) and Erich Hückel (Hückel) gave the mechanism in their 1923 *Annalen der Physik* paper "Zur Theorie der Elektrolyte": each ion is surrounded by an excess counter-charge — the ionic atmosphere — that screens it and lowers its free energy. The same year, Gilbert Lewis (Lewis) and Merle Randall (Randall) published the activity scale of *Thermodynamics and the Free Energy of Chemical Substances* that this atlas uses, and Niels Bjerrum (Bjerrum), working in Copenhagen, showed in 1926 that oppositely charged ions within one Bjerrum length of each other form transient **ion pairs**, the first correction to the picture of point ions. Lars Onsager (Onsager) extended the theory to conducting fields in 1926–1927, the same years he was building the theory of irreversible thermodynamics.
:::

The picture is simple enough to state in one sentence and rich enough to have occupied physical chemistry for a century: *each ion, moving and jostling, spends slightly more time near counter-ions than near co-ions, so its time-averaged environment is a diffuse cloud of net opposite charge.* That cloud screens the central ion's field: at distances beyond the cloud's thickness the solution cannot tell the ion is charged at all. The thickness is the chapter's central length scale.

::: definition Debye length {#def-debye-length}
The **Debye length** $\lambda_\mathrm{D} = 1/\kappa$ is the decay length of the electrostatic potential of an ion in solution, with
$$
\kappa^{2} = \frac{2\,N_\mathrm{A} e^{2} \rho_\mathrm{w}}{\varepsilon_{0}\varepsilon_\mathrm{r} k_\mathrm{B} T}\, I ,
$$

where $\rho_\mathrm{w}$ is the mass density of the solvent. The potential of a spherical ion falls as $\exp(-\kappa r)/r$, not $1/r$: the ionic atmosphere multiplies the Coulomb field by a screening factor $\exp(-r/\lambda_\mathrm{D})$. In water at $25\,^\circ\mathrm{C}$, $\lambda_\mathrm{D}/\mathrm{nm} = 0.304/\sqrt{I/(\mathrm{mol\,kg^{-1}})}$.
:::

::: example How thick is the ionic atmosphere? {#ex-debye-length}
Compute $\lambda_\mathrm{D}$ in water at $25\,^\circ\mathrm{C}$ ($\varepsilon_\mathrm{r} = 78.54$, $\rho_\mathrm{w} = 997\ \mathrm{kg\,m^{-3}}$) for (a) $I = 0.010\ \mathrm{mol\,kg^{-1}}$ and (b) seawater, $I \approx 0.70\ \mathrm{mol\,kg^{-1}}$.
::: solution
**(a)** $\kappa^{2} = \dfrac{2 \times 6.022\times10^{23} \times \left(1.602\times10^{-19}\right)^{2} \times 997}{8.854\times10^{-12} \times 78.54 \times 1.381\times10^{-23} \times 298.15} \times 0.010 = 1.077\times10^{17}\ \mathrm{m^{-2}}$, so $\kappa = 3.28\times10^{8}\ \mathrm{m^{-1}}$ and
$$
\lambda_\mathrm{D} = \frac{1}{\kappa} = 3.05\ \mathrm{nm}.
$$
**(b)** $\lambda_\mathrm{D} \propto I^{-1/2}$, so $\lambda_\mathrm{D} = 3.05/\sqrt{70}\ \mathrm{nm} = 0.36\ \mathrm{nm}$ — one molecular diameter. In dilute laboratory solutions the atmosphere is a nanometre-scale swarm; in seawater it is a single shell of counter-ions, and the screening is so complete that the chemistry of the open ocean is largely controlled by activity coefficients near their limiting values. Note the scale of (a): $\lambda_\mathrm{D} = 3.05\ \mathrm{nm}$ is comparable to the $4\ \mathrm{nm}$ mean ionic spacing, which is exactly why $0.01\ \mathrm{mol\,kg^{-1}}$ is already non-ideal.
:::
:::

::: widget plot
f: exp(-x/l)/x; 1/x
x: 0.05, 5
y: 0, 22
sliders: l=1:0.2:5:0.1
labels: \text{screened } e^{-r/\lambda_\mathrm{D}}/r; \text{Coulomb } 1/r
caption: The electrostatic potential of an ion in solution (upper curve) against distance $r$, in units where the slider $l$ is the atmosphere thickness $\lambda_\mathrm{D}$. The bare Coulomb field $1/r$ (lower curve) is what the ion would produce in a medium of the same permittivity with no other ions present; the ionic atmosphere multiplies it by $\exp(-r/\lambda_\mathrm{D})$, so beyond one atmosphere thickness the ion is effectively neutral to its neighbours. Slide $l$ down to imitate seawater: the field vanishes within a molecular diameter. Slide it up to imitate river water: the ion's influence reaches far and the solution behaves almost ideally.
:::

Now the central result.

::: theorem Debye–Hückel limiting law {#thm-limiting-law}
As $I \rightarrow 0$, the mean activity coefficient of every electrolyte obeys
$$
\log\gamma_\pm = -A\,\lvert z_+ z_- \rvert\,\sqrt{I}, \qquad
A = \frac{e^{3}\sqrt{2 N_\mathrm{A}\rho_\mathrm{w}}}{8\pi\,(\ln 10)\,\left(\varepsilon_{0}\varepsilon_\mathrm{r} k_\mathrm{B} T\right)^{3/2}} ,
$$

with $I$ in $\mathrm{mol\,kg^{-1}}$. In water at $25\,^\circ\mathrm{C}$, $A = 0.509\ (\mathrm{mol\,kg^{-1}})^{-1/2}$. The law contains no property of the ions except their charges: at low concentration, all $1{:}1$ electrolytes have the same $\gamma_\pm$, all $2{:}2$ electrolytes fall four times as fast in $\sqrt{I}$, and the solvent enters only through $\varepsilon_\mathrm{r}$ and $\rho_\mathrm{w}$.
:::

::: proof
**Step 1, the linearised Poisson–Boltzmann equation.** In the field $\psi(r)$ of a central ion, the Boltzmann distribution gives the local number density of species $i$ as $n_i = n_i^{\circ}\exp(-z_i e\psi/k_\mathrm{B}T)$. At $|z_i e\psi| \ll k_\mathrm{B}T$ the exponential linearises, and the charge density is $\rho_\mathrm{e} = \sum_i z_i e\,n_i \approx -\left(\sum_i n_i^{\circ} z_i^{2} e^{2}/k_\mathrm{B}T\right)\psi$. Poisson's equation $\nabla^{2}\psi = -\rho_\mathrm{e}/\varepsilon_{0}\varepsilon_\mathrm{r}$ becomes $\nabla^{2}\psi = \kappa^{2}\psi$ with $\kappa^{2} = 2N_\mathrm{A} e^{2}\rho_\mathrm{w} I/(\varepsilon_{0}\varepsilon_\mathrm{r} k_\mathrm{B} T)$, since $\sum_i n_i^{\circ} z_i^{2} = 2 N_\mathrm{A}\rho_\mathrm{w} I$ by the definition of $I$.

**Step 2, the screened solution.** The spherically symmetric solution of $\nabla^{2}\psi = \kappa^{2}\psi$ is $\psi = C\,\mathrm{e}^{-\kappa r}/r$ (the growing solution $\mathrm{e}^{+\kappa r}$ is rejected at infinity). Far from the centre the atmosphere is negligible and the field must match the bare Coulomb field of the central ion $z_+ e$, so $C = z_+ e/4\pi\varepsilon_{0}\varepsilon_\mathrm{r}$:
$$
\psi(r) = \frac{z_+ e}{4\pi\varepsilon_{0}\varepsilon_\mathrm{r}}\,\frac{\mathrm{e}^{-\kappa r}}{r}.
$$

**Step 3, the atmosphere's own potential.** The potential *of the cloud alone* is $\psi_\text{cloud} = \psi - z_+e/4\pi\varepsilon_{0}\varepsilon_\mathrm{r} r$; taking the limit $r \rightarrow 0$ (expand $\mathrm{e}^{-\kappa r} \approx 1 - \kappa r$) gives the constant $\psi_\text{cloud}(0) = -z_+ e\kappa/4\pi\varepsilon_{0}\varepsilon_\mathrm{r}$, and the cloud charge enclosed within radius $r$, $-z_+ e\,(1+\kappa r)\,\mathrm{e}^{-\kappa r}$, tends to $-z_+ e$ as $r \rightarrow \infty$: the atmosphere exactly neutralises the central ion, and does so within a few $\lambda_\mathrm{D}$.

**Step 4, charging work.** Build the central ion's charge gradually from $0$ to $z_+ e$; the atmosphere at each stage is proportional to the charge already built, so the work against the cloud's potential is half the final product (the Guntelberg charging argument):
$$
w_i = \tfrac{1}{2} z_i e\,\psi_{\text{cloud},i}(0) = -\frac{z_i^{2} e^{2}\kappa}{8\pi\varepsilon_{0}\varepsilon_\mathrm{r}} .
$$

Identifying $\ln\gamma_i = w_i/k_\mathrm{B}T$ (the excess free energy per ion, in thermal units) and averaging stoichiometrically, $\ln\gamma_\pm = (\nu_+\ln\gamma_+ + \nu_-\ln\gamma_-)/\nu$. Electroneutrality makes $\nu_+ z_+^{2} + \nu_- z_-^{2} = \nu\,|z_+ z_-|$ (check $\mathrm{CaCl_2}$: $(1\cdot4 + 2\cdot1)/3 = 2 = |2\times1|$), so
$$
\ln\gamma_\pm = -\frac{|z_+ z_-|\,e^{2}\kappa}{8\pi\varepsilon_{0}\varepsilon_\mathrm{r} k_\mathrm{B} T}.
$$

**Step 5, read off the law.** Insert $\kappa \propto \sqrt{I}$, convert $\ln \rightarrow \log$, and collect constants into $A$; with $\varepsilon_\mathrm{r} = 78.54$ and $\rho_\mathrm{w} = 997\ \mathrm{kg\,m^{-3}}$ at $25\,^\circ\mathrm{C}$, $A = 0.509\ (\mathrm{mol\,kg^{-1}})^{-1/2}$. Every step is an equality in the limit $I \rightarrow 0$: the linearisation of Boltzmann factors is controlled by $|z_i e\psi_\text{cloud}(0)|/k_\mathrm{B}T \propto \sqrt{I} \rightarrow 0$. $\blacksquare$
:::

::: example The limiting law against the clock of experiment {#ex-gamma-kcl}
Using $A = 0.509\ (\mathrm{mol\,kg^{-1}})^{-1/2}$, predict $\gamma_\pm$ for $\mathrm{KCl}$ at $25\,^\circ\mathrm{C}$ and $b = 0.0010$, $0.010$ and $0.10\ \mathrm{mol\,kg^{-1}}$, and compare with the measured values $0.965$, $0.902$, $0.778$.
::: solution
For $\mathrm{KCl}$, $|z_+ z_-| = 1$, so $\log\gamma_\pm = -0.509\sqrt{b}$:
$$
b = 0.0010: \gamma_\pm = 10^{-0.0161} = 0.964; \qquad
b = 0.010: \gamma_\pm = 10^{-0.0509} = 0.889; \qquad
b = 0.10: \gamma_\pm = 10^{-0.161} = 0.690 .
$$
At $0.0010\ \mathrm{mol\,kg^{-1}}$ the prediction misses experiment by $0.001$ — the limiting law is exact in its domain. At $0.010$ it is $0.013$ low; at $0.10$ it is $0.088$ low, an $11\,\%$ error. The pattern is the signature of the theory: $\log\gamma_\pm$ is linear in $\sqrt{I}$ only near the origin, and the deviations grow with charge and concentration. The next proposition fixes the first defect; the second is the subject of the warning after it.
:::
:::

::: widget plot
f: -A*zz*x
x: 0, 0.4
y: -0.85, 0.05
sliders: A=0.509:0.1:0.8:0.001; zz=1:1:4:1
labels: \log\gamma_\pm = -A\,\lvert z_+z_-\rvert\,\sqrt{I}
caption: The Debye–Hückel limiting law: $\log\gamma_\pm$ against $\sqrt{I}$ is a straight line through the origin of slope $-A|z_+z_-|$, with the charge product $|z_+z_-|$ and the solvent constant $A$ on the sliders ($0.509$ is water at $25\,^\circ\mathrm{C}$; a solvent one-third as dielectric multiplies $A$ by about five). A $2{:}2$ electrolyte ($zz = 4$) leaves ideality four times faster than a $1{:}1$ salt: at $\sqrt{I} = 0.1$ the $1{:}1$ line is at $-0.05$ ($\gamma_\pm = 0.89$) while the $2{:}2$ line is at $-0.20$ ($\gamma_\pm = 0.63$). Real curves bend *above* the line as the finite size of the ions weakens the screening — the subject of the extended law.
:::

::: proposition Extended Debye–Hückel equation and the Davies equation {#prop-extended}
Allowing ions to approach only to a distance $a$ (the **ion-size parameter**, tabulated by Kiell, 1937: $300\ \mathrm{pm}$ for $\mathrm{K^+}$ and $\mathrm{Cl^-}$, $500\ \mathrm{pm}$ for $\mathrm{Ba^{2+}}$ and $\mathrm{SO_4^{2-}}$, $600\ \mathrm{pm}$ for $\mathrm{Ca^{2+}}$) gives the **extended Debye–Hückel equation**
$$
\log\gamma_\pm = -\frac{A\,\lvert z_+ z_- \rvert\,\sqrt{I}}{1 + B a \sqrt{I}}, \qquad B = 3.28\times10^{9}\ \mathrm{m^{-1}\,kg^{1/2}\,mol^{-1/2}} \ \ (25\,^\circ\mathrm{C}),
$$

valid to $I \approx 0.01$–$0.05\ \mathrm{mol\,kg^{-1}}$ depending on charge. The **Davies equation**,
$$
\log\gamma_i = -0.51\,z_i^{2}\left(\frac{\sqrt{I}}{1+\sqrt{I}} - 0.3\,I\right),
$$

is an empirical modification that tracks measured single-ion coefficients to $I \approx 0.1$ and is the working formula of analytical chemistry.
:::

::: proof
The Poisson–Boltzmann algebra is unchanged; only the boundary condition moves. Outside the closest-approach sphere $r > a$ the same screened solution holds, and matching the field to the central ion's Coulomb field at $r = a$ instead of at infinity replaces $C = z_+e/4\pi\varepsilon_0\varepsilon_r$ by $C = z_+ e\,\mathrm{e}^{\kappa a}/4\pi\varepsilon_{0}\varepsilon_\mathrm{r}$, so the cloud potential at the ion surface becomes $\psi_\text{cloud}(a) = -z_+ e\kappa/(4\pi\varepsilon_{0}\varepsilon_\mathrm{r}(1+\kappa a))$. Charging work and stoichiometric averaging proceed as in the theorem, and $\kappa a = Ba\sqrt{I}$ is the displayed $B$-term. The Davies form is not derived but fitted: the substitution $\sqrt{I} \rightarrow \sqrt{I}/(1+\sqrt{I}) - 0.3I$ reproduces the limiting law as $I \rightarrow 0$ and bends the curve back up at moderate $I$, mimicking the approach of $\gamma_\pm$ to a minimum and its rise at high concentration — a rise no equilibrium theory of point charges can produce, because it comes from the ions' own volume.
:::

::: warning The limiting law is a law of limits, not of dilute solutions {#warn-validity}
Three failures are worth knowing before trusting a computed $\gamma_\pm$. (i) **Range**: the limiting law is quantitatively safe only below $I \approx 0.005\ \mathrm{mol\,kg^{-1}}$ for 1:1 salts and below $I \approx 0.001$ for 2:2; at $I = 0.1$ it errs by $11\,\%$ even for $\mathrm{KCl}$ and by far more for $\mathrm{ZnSO_4}$. (ii) **Direction of the error**: theory puts $\gamma_\pm$ too low at moderate $I$; measured coefficients pass through a minimum and *rise*, climbing back through $1$ for $\mathrm{NaCl}$ near saturation — the hydration shells make the ions effectively exclude volume, and no Coulomb model contains that. (iii) **The wrong disease**: if a computed activity coefficient disagrees with experiment, the first suspects are ion-pair formation (a $2{:}2$ salt like $\mathrm{MgSO_4}$ loses a measurable fraction of its ions to pairs even at $0.01\ \mathrm{mol\,kg^{-1}}$) and incomplete dissociation of weak electrolytes, where the equilibrium of [[thermodynamics/reaction-equilibrium]] must be solved *with* activity coefficients, not after them.
:::

## Activities and equilibria: why salt dissolves salt

The thermodynamic equilibrium constant of [[thermodynamics/reaction-equilibrium]] is written in activities, $K = \prod_i a_i^{\nu_i}$; what a chemist measures by concentration is $K_c = \prod_i b_i^{\nu_i}$ (or with molar concentrations). The two differ by exactly the activity coefficients:

::: proposition Thermodynamic and concentration equilibrium constants {#prop-K-gamma}
For any equilibrium,
$$
K = K_\gamma\, K_b, \qquad K_\gamma \equiv \prod_i \gamma_i^{\nu_i}, \qquad K_b \equiv \prod_i \left(b_i/b^\circ\right)^{\nu_i},
$$

so $K_b = K/K_\gamma$ varies with ionic strength even though $K$ is a constant. For a sparingly soluble salt $\mathrm{M_{\nu_+}X_{\nu_-}(s)}$ in equilibrium with its ions, $K_\mathrm{sp} = \gamma_\pm^{\nu}\,\left(b_\pm/b^\circ\right)^{\nu}$, and the molar solubility $s$ of a salt of solubility $s_0$ in pure water obeys
$$
s = \frac{s_0}{\gamma_\pm(I)} \qquad \text{(when the salt's own contribution to } I \text{ is negligible)}.
$$
:::

::: proof
Insert $a_i = \gamma_i b_i/b^\circ$ into $K = \prod a_i^{\nu_i}$ and split the product. For the salt: $\mathrm{M_{\nu_+}X_{\nu_-}(s) \rightleftharpoons \nu_+ M^{z_+} + \nu_- X^{z_-}}$ gives $K_\mathrm{sp} = a_+^{\nu_+} a_-^{\nu_-} = a_\pm^{\nu} = \gamma_\pm^\nu b_\pm^\nu$; in pure water $b_\pm = \nu_\pm s_0$ with $\gamma_\pm = 1$, and in the presence of foreign electrolyte $b_\pm = \nu_\pm s$ (when the salt's own contribution to $I$ is negligible), so $\gamma_\pm^\nu s^\nu = s_0^\nu$, i.e. $s = s_0/\gamma_\pm$. The solubility product $K_\mathrm{sp}$ is a thermodynamic constant; the "solubility product" computed from measured concentrations is not.
:::

::: corollary The diverse-ion salt effect {#cor-salt-effect}
Adding an inert electrolyte (no common ion) to a sparingly soluble salt always raises the salt's solubility, because $\gamma_\pm < 1$ throughout the range where the theories hold. The effect scales as $\gamma_\pm^{-1} \approx 10^{A|z_+z_-|\sqrt{I}}$: it is about ten per cent for a 1:1 salt at $I = 0.01$, tens of per cent for a 2:2 salt at the same $I$, and enormous for highly charged ions. This is the **diverse-ion salt effect** of analytical chemistry, and it is why quantitative precipitation is never attempted from a high-ionic-strength medium, and why the same $K_\mathrm{sp}$ can correspond to several "measured solubilities" that all disagree.
:::

::: example Salting in: barium sulfate in potassium nitrate {#ex-baso4}
For $\mathrm{BaSO_4}$, $K_\mathrm{sp} = 1.1\times10^{-10}$ at $25\,^\circ\mathrm{C}$ (CRC). Find its solubility in pure water and in $0.010\ \mathrm{mol\,kg^{-1}}$ $\mathrm{KNO_3}$, using the extended Debye–Hückel equation with $a = 500\ \mathrm{pm}$.
::: solution
Pure water: $s_0 = \sqrt{1.1\times10^{-10}}\ \mathrm{mol\,kg^{-1}} = 1.05\times10^{-5}\ \mathrm{mol\,kg^{-1}}$. In $0.010\ \mathrm{mol\,kg^{-1}}$ $\mathrm{KNO_3}$ the salt's own ions contribute $I$ by only $2\times10^{-5}$, so $I = 0.010$ and, with $|z_+z_-| = 4$,
$$
\log\gamma_\pm = -\frac{0.509 \times 4 \times 0.100}{1 + 3.28\times10^{9} \times 500\times10^{-12} \times 0.100} = -\frac{0.2036}{1.164} = -0.175, \qquad \gamma_\pm = 0.669 .
$$
Then $s = s_0/\gamma_\pm = 1.05\times10^{-5}/0.669 = 1.57\times10^{-5}\ \mathrm{mol\,kg^{-1}}$ — a $50\,\%$ increase in solubility from a background salt that shares no ion with the precipitate. The same calculation at $I = 0.10$ with the Davies equation gives $\gamma_\pm = 0.37$ and $s = 2.8\times10^{-5}\ \mathrm{mol\,kg^{-1}}$, nearly three times the pure-water value. For the weighing analyst this is the difference between a clean gravimetric determination and a biased one.
:::
:::

::: quiz
A saturated solution of $\mathrm{AgCl}$ has a few drops of $1\ \mathrm{mol\,kg^{-1}}$ $\mathrm{KNO_3}$ added (no common ion). What happens, and why?
- [x] More $\mathrm{AgCl}$ dissolves: $\gamma_\pm$ falls, and $K_\mathrm{sp} = \gamma_\pm^{2} b_{\mathrm{Ag}^{+}} b_{\mathrm{Cl}^{-}}$ can only be restored by raising the concentrations.
- [ ] Nothing: $\mathrm{KNO_3}$ shares no ion with $\mathrm{AgCl}$.
- [ ] $\mathrm{AgCl}$ precipitates further: the extra ions push the equilibrium back.
- [ ] The solubility product $K_\mathrm{sp}$ falls, so the solution becomes supersaturated.
::: solution
$K_\mathrm{sp}$ is a constant of activities, not of concentrations. Raising $I$ lowers $\gamma_\pm$, so the *concentration* product $\gamma_\pm^2 b_{\mathrm{Ag}^+}b_{\mathrm{Cl}^-}$ drops below $K_\mathrm{sp}$ and the solid dissolves until the product of activities is restored. The common-ion effect and the diverse-ion salt effect are the same equation pulled in opposite directions — and both are statements about $K_\gamma$, never about $K$.
:::
:::

## pH is an activity, and buffers know it

The definition $\mathrm{pH} = -\log a_{\mathrm{H^+}}$ is exact, and the practical definition — the EMF of a cell with a hydrogen electrode against a standard, as in [[electrochemistry/cell-thermodynamics]] — measures that activity, not the concentration. The difference is not academic:

::: example The pH of a "pH 2" hydrochloric acid {#ex-ph}
Find the pH of $0.010\ \mathrm{mol\,kg^{-1}}$ $\mathrm{HCl}$ at $25\,^\circ\mathrm{C}$ (a) treating it as ideal and (b) with the measured $\gamma_\pm(\mathrm{HCl}) = 0.904$.
::: solution
For a 1:1 strong acid, $a_{\mathrm{H^+}} a_{\mathrm{Cl^-}} = a_\pm^{2} = \gamma_\pm^{2} b^{2}$, and the single-ion convention takes $a_{\mathrm{H^+}} = \gamma_\pm b$. (a) Ideal: $\mathrm{pH} = -\log 0.010 = 2.00$. (b) Real: $a_{\mathrm{H^+}} = 0.904 \times 0.010 = 9.04\times10^{-3}$, so $\mathrm{pH} = 2.044$.
The meter reads $2.04$, not $2.00$, and no calibration can talk it out of that — the discrepancy is chemistry, not instrumentation. At $0.050\ \mathrm{mol\,kg^{-1}}$ ($\gamma_\pm = 0.830$) the shift grows to $0.08$ pH units; in $0.1\ \mathrm{mol\,kg^{-1}}$ buffers with added salt, activity corrections routinely move pH by $0.1$–$0.2$ units, which is why standard buffers for calibration are certified in terms of measured EMF, never computed from recipes.
:::
:::

The same correction runs through every equilibrium of the solution chapters. A Henderson–Hasselbalch buffer written in concentrations, $\mathrm{pH} \approx \mathrm{p}K_\mathrm{a} + \log\left(b_{\mathrm{A^-}}/b_{\mathrm{HA}}\right)$, is really the activity statement $\mathrm{pH} = \mathrm{p}K_\mathrm{a} + \log\left(a_{\mathrm{A^-}}/a_{\mathrm{HA}}\right)$; adding neutral salt lowers $\gamma_{\mathrm{A^-}}$ and raises the pH of the buffer by an amount the extended Debye–Hückel equation predicts to a hundredth of a unit at $I = 0.01$. The acid–base and solubility equilibria of [[general-chemistry-2/liquids-solutions]] are all waiting for this refinement; the underlying identity $\Delta_\mathrm{r}G^\circ = -RT\ln K$ is [[general-chemistry-2/entropy-free-energy|where they were born]].

## Colligative properties of electrolytes: the osmotic coefficient

The colligative properties of [[thermodynamics/mixtures]] count particles, and electrolytes supply $\nu$ of them per formula unit — but the ionic atmosphere pulls the particles back cooperatively, so the count comes in slightly short. The bookkeeping device is the osmotic coefficient.

::: definition Osmotic coefficient {#def-osmotic}
The **osmotic coefficient** $\phi$ of an electrolyte solution is defined by
$$
\Pi V = \phi\,\nu\, n_\mathrm{B} R T ,
$$

with $n_\mathrm{B}$ the amount of formula units dissolved: $\phi = 1$ for an ideal solution of fully dissociated ions, and $\phi < 1$ measures the shortfall caused by the ionic atmosphere. Equivalently the van 't Hoff factor is $i = \phi\nu$, and the freezing-point depression is $\Delta T_\mathrm{f} = \phi\,\nu\,K_\mathrm{f} b$. As $b \rightarrow 0$, $\phi \rightarrow 1$ exactly, and Debye–Hückel theory gives $\phi - 1 = \tfrac{1}{3}\ln\gamma_\pm$ in the limiting region — for $\mathrm{KCl}$ at $0.010\ \mathrm{mol\,kg^{-1}}$, $\ln\gamma_\pm = -0.118$ predicts $\phi = 0.961$, within a thousandth of the measured value: the atmosphere costs one-third as much in the osmotic pressure as it does in the mean activity.
:::

::: example Osmotic pressure of sodium chloride solution {#ex-osmotic}
Find the osmotic pressure of $0.10\ \mathrm{mol\,kg^{-1}}$ $\mathrm{NaCl}$ at $25\,^\circ\mathrm{C}$, given $\phi = 0.932$ (Robinson & Stokes), and compare with the ideal fully-dissociated value.
::: solution
With $\nu = 2$ and $b = 0.10\ \mathrm{mol\,kg^{-1}}$, the effective particle molality is $\phi\nu b = 0.186\ \mathrm{mol\,kg^{-1}}$. Taking the solution density as $1.0\ \mathrm{g\,cm^{-3}}$, so that $0.186\ \mathrm{mol\,kg^{-1}}$ is $0.186\times10^{3}\ \mathrm{mol\,m^{-3}}$,
$$
\Pi = \phi\nu b\,\rho RT = 0.186\times10^{3}\ \mathrm{mol\,m^{-3}} \times 8.314 \times 298.15\ \mathrm{J\,mol^{-1}} = 4.6\times10^{5}\ \mathrm{Pa} = 461\ \mathrm{kPa},
$$
against the ideal $\nu b\,\rho RT = 496\ \mathrm{kPa}$ ($4.9\ \mathrm{bar}$): the atmosphere holds back $7\,\%$ of the osmotic pressure. The van 't Hoff factor is $i = 1.86$, not $2$ — which is why $0.10\ \mathrm{mol\,kg^{-1}}$ $\mathrm{NaCl}$ freezes about $0.35\ \mathrm{K}$ below pure water, not $0.37\ \mathrm{K}$, and why "isotonic" saline is formulated against measured osmotic pressure rather than against the formula molality.
:::
:::

::: quiz
Which solution has the lowest freezing point at $1.00\ \mathrm{mol\,kg^{-1}}$ each?
- [x] $\mathrm{CaCl_2}$: three ions per formula unit, and at this molality it supplies far more freezing-point depression per formula unit than any alternative here.
- [ ] $\mathrm{NaCl}$: the smallest ion, so the strongest effect.
- [ ] $\mathrm{Al_2(SO_4)_3}$: five ions per formula unit, so it always wins.
- [ ] All three freeze at the same point, because colligative properties ignore chemistry.
::: solution
Particle count *times* the osmotic coefficient decides: the depression is $\phi\nu K_\mathrm{f} b$, and integrating the Gibbs–Duhem relation through the measured activity coefficients gives $\phi\nu \approx 1.85$ for $\mathrm{NaCl}$ but $\phi\nu \approx 3.2$ for $\mathrm{CaCl_2}$ at $1\ \mathrm{mol\,kg^{-1}}$ — there $\phi$ itself exceeds $1$, because the hydrated ions exclude volume and push water's escaping tendency *up*. The trap is $\mathrm{Al_2(SO_4)_3}$: five ions per formula unit in principle, but at $1\ \mathrm{mol\,kg^{-1}}$ ($I = 15$!) the activity machinery is far past any limiting law, ion pairing and hydrolysis are severe, and the five-ion promise is not kept. Colligative properties count *free* particles, and at high ionic strength the atmosphere and the pairs hold many of them hostage.
:::
:::

::: widget plot
f: exp(-2.303*A*sqrt(x)); exp(-2.303*2*A*sqrt(x)); exp(-2.303*4*A*sqrt(x))
x: 0, 0.1
y: 0, 1.05
sliders: A=0.509:0.1:0.8:0.001
labels: 1:1; 1:2; 2:2
caption: The limiting law written as $\gamma_\pm = 10^{-A|z_+z_-|\sqrt{I}}$ for electrolytes of type $1{:}1$, $1{:}2$ (or $2{:}1$) and $2{:}2$, against ionic strength $I$ (slider: the solvent constant $A$). Charge multiplies the fall through $|z_+z_-|$: at $I = 0.05$ a $1{:}1$ salt still sits at $\gamma_\pm = 0.77$ while a $2{:}2$ salt has fallen to $0.35$ — and every equilibrium constant involving those ions is wrong by the square of the difference if you ignore it. The curves are the *limiting* law: real $2{:}2$ data bend back above these lines almost immediately, which is the visual content of the validity warning.
:::

## Where this leads

The mean activity coefficient is the electrolyte chapter of the activity story begun in [[thermodynamics/mixtures]]: the same $\mu_i = \mu_i^\circ + RT\ln a_i$, the same standard-state bookkeeping, now with the mean-value trick that electroneutrality forces. Carry $\gamma_\pm$ into [[electrochemistry/cell-thermodynamics]] and it becomes measurable with voltmeter precision — the EMF of a cell without liquid junction is a direct readout of $\ln a_\pm$, and the historical route by which the numbers quoted here were actually obtained. Substitute activities into $\Delta_\mathrm{r}G = \Delta_\mathrm{r}G^\circ + RT\ln Q$ and every equilibrium of [[thermodynamics/reaction-equilibrium]] acquires its $K_\gamma$ factor; the freezing-point and osmotic derivations of [[thermodynamics/mixtures]] reappear with $\phi$ in front; and the phase diagrams of [[thermodynamics/phase-equilibria]] bend accordingly when the liquid is brine. The molecular "why" — why $\varepsilon_\mathrm{r}$ of water is so large, what hydration costs in entropy — belongs to [[statistical-thermodynamics/real-gases-liquids]], and the gas-phase ancestor of the ionic atmosphere (the second virial coefficient of charged particles) is the same Boltzmann average done in [[general-chemistry-1/gases]]'s more innocent setting.

::: summary
- Ions interact through the Coulomb potential divided by $\varepsilon_\mathrm{r}$; in water the Bjerrum length is $0.71\ \mathrm{nm}$, so even $0.01\ \mathrm{mol\,kg^{-1}}$ solutions are strongly coupled and strong electrolytes are non-ideal at concentrations where sugar is ideal.
- Single-ion activities are unmeasurable: electroneutrality makes only the mean ionic activity $a_\pm^\nu = a_+^{\nu_+} a_-^{\nu_-}$ and $\gamma_\pm^\nu = \gamma_+^{\nu_+}\gamma_-^{\nu_-}$ physical, with $b_\pm = \nu_\pm b$.
- The ionic strength $I = \tfrac{1}{2}\sum b_i z_i^2$ weights charge squared; for mixtures it adds, and it is the only concentration variable the limiting law sees.
- The ionic atmosphere screens each ion over the Debye length $\lambda_\mathrm{D} = 0.304\ \mathrm{nm}/\sqrt{I/(\mathrm{mol\,kg^{-1}})}$ (water, $25\,^\circ\mathrm{C}$), and the screened potential falls as $\mathrm{e}^{-\kappa r}/r$.
- The Debye–Hückel limiting law $\log\gamma_\pm = -A|z_+z_-|\sqrt{I}$ ($A = 0.509$ at $25\,^\circ\mathrm{C}$) contains no ion-specific parameter and is exact in the limit; the extended law (ion size $a$) and the Davies equation extend it to $I \approx 0.1$.
- $K = K_\gamma K_b$: thermodynamic constants are constant, concentration quotients are not — hence the diverse-ion salt effect $s = s_0/\gamma_\pm$, which raises the solubility of $\mathrm{BaSO_4}$ by $50\,\%$ at $I = 0.01$.
- pH measures $a_{\mathrm{H^+}}$, not $b_{\mathrm{H^+}}$; colligative properties measure $\phi\nu$, not $\nu$ — the osmotic coefficient counts the particles the atmosphere holds back.
:::

## Exercises

::: exercise Ionic strength of a single salt {level=1 check="0.060"}
Compute the ionic strength of $0.020\ \mathrm{mol\,kg^{-1}}$ $\mathrm{CaCl_2(aq)}$. (Enter $I$ in $\mathrm{mol\,kg^{-1}}$.)
::: solution
$b(\mathrm{Ca^{2+}}) = 0.020$, $b(\mathrm{Cl^-}) = 0.040$, so $I = \tfrac{1}{2}\left[0.020\times 2^{2} + 0.040\times 1^{2}\right] = \tfrac{1}{2}(0.080 + 0.040) = 0.060\ \mathrm{mol\,kg^{-1}}$ — three times the molality, as the $2{:}1$ stoichiometry requires.
:::
:::

::: exercise Limiting-law activity coefficient {level=1 check="0.943"}
Using $A = 0.509\ (\mathrm{mol\,kg^{-1}})^{-1/2}$, compute the limiting-law $\gamma_\pm$ of $\mathrm{KNO_3}$ at $I = 0.0025\ \mathrm{mol\,kg^{-1}}$. (Enter $\gamma_\pm$.)
::: solution
$\log\gamma_\pm = -0.509\times 1\times\sqrt{0.0025} = -0.509\times 0.050 = -0.0255$, so $\gamma_\pm = 10^{-0.0255} = 0.943$. A $6\,\%$ departure from ideality at a molality where sucrose would sit within $10^{-4}$ of unity — the charge-squared leverage in one number.
:::
:::

::: exercise Debye length {level=1 check="1.36"}
Compute the Debye length in water at $25\,^\circ\mathrm{C}$ for $I = 0.050\ \mathrm{mol\,kg^{-1}}$. (Enter $\lambda_\mathrm{D}$ in nm.)
::: solution
$\lambda_\mathrm{D} = 0.304/\sqrt{0.050}\ \mathrm{nm} = 1.36\ \mathrm{nm}$. Four times the ionic strength is half the atmosphere thickness — the $\sqrt{I}$ in the denominator is the same square root that governs the limiting law, because both come from the same $\kappa$.
:::
:::

::: exercise Ionic strength of a mixture {level=2 check="0.070"}
Find the ionic strength of a solution that is $0.020\ \mathrm{mol\,kg^{-1}}$ in $\mathrm{Na_2SO_4}$ and $0.010\ \mathrm{mol\,kg^{-1}}$ in $\mathrm{KCl}$. (Enter $I$ in $\mathrm{mol\,kg^{-1}}$.)
::: solution
Sum over all four ions: $b(\mathrm{Na^+}) = 0.040$, $b(\mathrm{SO_4^{2-}}) = 0.020$, $b(\mathrm{K^+}) = 0.010$, $b(\mathrm{Cl^-}) = 0.010$, so $I = \tfrac{1}{2}\left[0.040 + 4(0.020) + 0.010 + 0.010\right] = 0.070\ \mathrm{mol\,kg^{-1}}$. The sulfate carries $0.080$ of the $0.140$ charge-weighted sum from just $0.020\ \mathrm{mol\,kg^{-1}}$ of material: multivalent ions dominate the ionic strength of natural waters, blood, and soil extracts for exactly this reason.
:::
:::

::: exercise Salt effect on silver chloride {level=2 check="1.49"}
For $\mathrm{AgCl}$, $K_\mathrm{sp} = 1.8\times10^{-10}$ (CRC). Using the extended Debye–Hückel equation with $a = 300\ \mathrm{pm}$, compute the solubility of $\mathrm{AgCl}$ in $0.010\ \mathrm{mol\,kg^{-1}}$ $\mathrm{KNO_3}$. (Enter $s$ in $10^{-5}\ \mathrm{mol\,kg^{-1}}$.)
::: solution
$s_0 = \sqrt{1.8\times10^{-10}} = 1.34\times10^{-5}\ \mathrm{mol\,kg^{-1}}$. With $I = 0.010$ and $|z_+z_-| = 1$:
$$
\log\gamma_\pm = -\frac{0.509\times 0.100}{1 + 3.28\times10^{9}\times 300\times10^{-12}\times 0.100} = -\frac{0.0509}{1.098} = -0.0463, \qquad \gamma_\pm = 0.899 .
$$
Then $s = s_0/\gamma_\pm = 1.34\times10^{-5}/0.899 = 1.49\times10^{-5}\ \mathrm{mol\,kg^{-1}}$, an $11\,\%$ increase. The same $11\,\%$ is why the molar solubility of $\mathrm{AgCl}$ reported from pure-water and from nitrate-medium experiments differ, and why the difference is not a contradiction of "$K_\mathrm{sp}$ is a constant".
:::
:::

::: exercise pH of a real acid {level=2 check="1.38"}
With the measured $\gamma_\pm(\mathrm{HCl}) = 0.830$ at $0.050\ \mathrm{mol\,kg^{-1}}$, compute the pH of $0.050\ \mathrm{mol\,kg^{-1}}$ $\mathrm{HCl(aq)}$ at $25\,^\circ\mathrm{C}$. (Enter the pH.)
::: solution
$a_{\mathrm{H^+}} = \gamma_\pm b = 0.830 \times 0.050 = 0.0415$, so $\mathrm{pH} = -\log 0.0415 = 1.38$. The concentration-only answer is $1.30$: the meter disagrees with the recipe by $0.08$ units, and the meter is right. A buffer at the same ionic strength shifts by a comparable amount through $\gamma_{\mathrm{A^-}}$ in the Henderson–Hasselbalch expression.
:::
:::

::: exercise Derive the stoichiometric identity {level=3}
Show that $\nu_+ z_+^{2} + \nu_- z_-^{2} = \nu\,|z_+ z_-|$ for every electroneutral electrolyte, and use it to write $\ln\gamma_\pm$ as the stoichiometric average of $\ln\gamma_+$ and $\ln\gamma_-$ from the charging works $w_i = -z_i^{2}e^{2}\kappa/8\pi\varepsilon_{0}\varepsilon_\mathrm{r}$. Verify for $\mathrm{Al_2(SO_4)_3}$.
::: solution
Electroneutrality gives $\nu_+ z_+ = \nu_-|z_-| \equiv Q$. Then $\nu_+ z_+^{2} = Q z_+$ and $\nu_- z_-^{2} = Q|z_-|$, so the sum is $Q(z_+ + |z_-|)$. Meanwhile $\nu = \nu_+ + \nu_- = Q/z_+ + Q/|z_-| = Q(z_+ + |z_-|)/|z_+ z_-|$, hence $\nu_+ z_+^{2} + \nu_- z_-^{2} = \nu|z_+ z_-|$. For $\mathrm{Al_2(SO_4)_3}$: $\nu_+ = 2$, $z_+ = 3$, $\nu_- = 3$, $z_- = 2$; left side $2(9) + 3(4) = 30$, right side $5\times 6 = 30$. The averaging then gives $\ln\gamma_\pm = (\nu_+ w_+ + \nu_- w_-)/\nu k_\mathrm{B}T = -|z_+z_-|e^{2}\kappa/8\pi\varepsilon_{0}\varepsilon_\mathrm{r} k_\mathrm{B}T$: the cross-charge product, not the individual squares, is what the mean activity coefficient measures — which is why a $2{:}2$ salt is four times as non-ideal as a $1{:}1$ salt at the same $I$.
:::
:::

::: exercise Salt effect with the Davies equation {level=3 check="2.8"}
Using the Davies equation, compute the solubility of $\mathrm{BaSO_4}$ ($K_\mathrm{sp} = 1.1\times10^{-10}$) in $0.10\ \mathrm{mol\,kg^{-1}}$ $\mathrm{KNO_3}$ at $25\,^\circ\mathrm{C}$. (Enter $s$ in $10^{-5}\ \mathrm{mol\,kg^{-1}}$.)
::: solution
For the mean coefficient of a 2:2 salt, $\log\gamma_\pm$ is the average of $\log\gamma_{\mathrm{Ba^{2+}}}$ and $\log\gamma_{\mathrm{SO_4^{2-}}}$, i.e. the Davies expression with $z^{2} = 4$. With $\sqrt{0.10} = 0.316$:
$$
\log\gamma_\pm = -0.51\times 4\left(\frac{0.316}{1.316} - 0.030\right) = -2.04\times(0.240 - 0.030) = -0.428, \qquad \gamma_\pm = 0.373 .
$$
Then $s = s_0/\gamma_\pm = 1.05\times10^{-5}/0.373 = 2.8\times10^{-5}\ \mathrm{mol\,kg^{-1}}$ — a $170\,\%$ increase over pure water from a salt that contributes no common ion. The limiting law at this $I$ would give $\gamma_\pm = 0.23$ and a solubility two-thirds higher still; the extended law with $a = 500\ \mathrm{pm}$ gives $\gamma_\pm = 0.38$. The spread between models is itself the lesson: at $I = 0.1$ the *choice* of activity model matters more than the arithmetic.
:::
:::

::: exercise Fluorite in a salt background {level=3 check="2.60"}
For $\mathrm{CaF_2}$, $K_\mathrm{sp} = 3.9\times10^{-11}$ (CRC). Compute its solubility in $0.010\ \mathrm{mol\,kg^{-1}}$ $\mathrm{KNO_3}$ using the extended Debye–Hückel equation with $a = 600\ \mathrm{pm}$. (Enter $s$ in $10^{-4}\ \mathrm{mol\,kg^{-1}}$.)
::: solution
Pure water: $K_\mathrm{sp} = 4s_0^{3}$ gives $s_0 = (3.9\times10^{-11}/4)^{1/3} = 2.14\times10^{-4}\ \mathrm{mol\,kg^{-1}}$. The salt's own ions contribute $I \approx 3s \approx 6\times10^{-4} \ll 0.010$, so $I = 0.010$ and with $|z_+z_-| = 2$:
$$
\log\gamma_\pm = -\frac{0.509\times 2\times 0.100}{1 + 3.28\times10^{9}\times 600\times10^{-12}\times 0.100} = -\frac{0.1018}{1.197} = -0.0850, \qquad \gamma_\pm = 0.822 .
$$
Since $K_\mathrm{sp} = \gamma_\pm^{3}(4s^{3})$, the solubility is $s = s_0/\gamma_\pm = 2.14\times10^{-4}/0.822 = 2.60\times10^{-4}\ \mathrm{mol\,kg^{-1}}$. Note the exponent bookkeeping: the $2{:}1$ salt carries $\gamma_\pm^{3}$ in $K_\mathrm{sp}$ but the cube root returns the same universal law $s = s_0/\gamma_\pm$ — the salt effect depends on the activity coefficient, not on the stoichiometry.
:::
:::
