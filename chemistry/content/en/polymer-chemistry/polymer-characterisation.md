A small-molecule chemist who makes a new compound records a melting point, an NMR spectrum and a mass spectrum, and the job is done: one structure, one molar mass, one melting point. A polymer chemist who makes a new polyester has a harder job. The sample has no single molar mass, only a distribution, and each method of measuring it reports a different average. Its "melting point" may be a broad range, or it may not exist, replaced by a glass transition that depends on the heating rate. Its NMR spectrum averages over millions of chains that differ in length, end groups, branching and sequence. Characterising a polymer means choosing methods that answer specific questions. How many chains are there per gram ($\bar{M}_\mathrm{n}$)? How heavy is the average chain, weighted by mass ($\bar{M}_\mathrm{w}$)? How broad is the distribution, and what is its shape? How big is a coil in solution? What is the composition, the tacticity, the end group? How much is crystalline, and where are the transitions?

This chapter works through the main methods in the order a polymer laboratory uses them. **Colligative methods** (membrane and vapour-pressure osmometry, end-group analysis) give $\bar{M}_\mathrm{n}$. **Light scattering** gives $\bar{M}_\mathrm{w}$, the radius of gyration and the second virial coefficient. **Dilute-solution viscometry** gives the intrinsic viscosity and, through the Mark–Houwink equation, a viscosity-average molar mass. **Size-exclusion chromatography**, the workhorse, gives the whole distribution, and with universal calibration or light-scattering detection it gives absolute molar masses. **MALDI mass spectrometry** resolves individual chains of short polymers. **NMR spectroscopy** gives composition, tacticity and end groups. **Thermal analysis** (DSC and TGA) gives the glass transition, melting, crystallinity and stability. Each method rests on dilute-solution theory from [[polymer-chemistry/polymer-solutions]] or on the definitions of [[polymer-chemistry/polymer-structure]], and the point is to know which average each method sees and why.

## Number-average methods

### End-group analysis

If every chain carries a known number of titratable or NMR-visible end groups, counting ends counts chains. Total mass divided by the amount of chains is $\bar{M}_\mathrm{n}$ by definition ([[polymer-chemistry/polymer-structure#ex-end-group]] worked an example). In $^1\mathrm{H}$ NMR, the ratio of an end-group signal (an initiator fragment, or the $\mathrm{CH_2OH}$ of a polyester) to a backbone signal gives $\bar{X}_\mathrm{n}$ directly. The method works up to $\bar{M}_\mathrm{n}$ of about $2\times10^{4}$, where the end-group signal becomes too small to integrate reliably. It fails if the end groups are not what was assumed, for example if a side reaction has capped some chains or if cyclic molecules are present.

### Osmometry

In **membrane osmometry**, a solution is separated from pure solvent by a membrane that solvent crosses but polymer chains do not. Solvent flows into the solution until the hydrostatic excess pressure $\Pi$ balances the lowering of the solvent's chemical potential. The virial expansion [[polymer-chemistry/polymer-solutions#eq-virial]] gives
$$
\frac{\Pi}{c} = RT\left(\frac{1}{\bar{M}_\mathrm{n}} + A_2c + A_3c^2 + \dots\right),
$$ {#eq-osmometry}
so a plot of $\Pi/c$ against $c$ has intercept $RT/\bar{M}_\mathrm{n}$ and initial slope $RTA_2$.

::: proposition Colligative methods give the number-average {#prop-colligative}
For a dilute solution of a non-uniform polymer, the limiting osmotic pressure is
$$
\lim_{c\to0}\frac{\Pi}{c} = \frac{RT}{\bar{M}_\mathrm{n}},
$$
whatever the distribution of molar masses. The same holds for every colligative property (vapour-pressure lowering, boiling-point elevation, freezing-point depression).
:::

::: proof
In the dilute limit each solute species $i$ contributes independently, as in the van 't Hoff equation, $\Pi = RT\sum_i n_i/V$, with $n_i$ the amount of species $i$ in volume $V$. With mass concentrations $c_i = n_iM_i/V$ and $c = \sum_ic_i$,
$$
\frac{\Pi}{c} = RT\,\frac{\sum_i n_i}{\sum_i n_iM_i} = \frac{RT}{\bar{M}_\mathrm{n}},
$$
because $\sum n_iM_i/\sum n_i$ is the definition of $\bar{M}_\mathrm{n}$ ([[polymer-chemistry/polymer-structure#eq-mn]]). The osmotic pressure counts solute *particles* and does not care how heavy they are, so a large chain counts the same as a small one. $\blacksquare$
:::

Osmotic pressures of polymer solutions are small. A solution of $10\ \mathrm{g\,dm^{-3}}$ of a polymer of $\bar{M}_\mathrm{n} = 1.5\times10^{5}$ develops about $280\ \mathrm{Pa}$, a column of about 3 cm of toluene. They become unmeasurably small above $\bar{M}_\mathrm{n} \approx 10^{6}$. Below about $2\times10^{4}$, small chains leak through the membrane and the measured $\bar{M}_\mathrm{n}$ is too high. For that low range, **vapour-pressure osmometry** measures the tiny temperature difference between a drop of solution and a drop of solvent in a saturated vapour. It is calibrated with a standard of known molar mass.

::: widget regression
points: 2, 1.883; 4, 2.086; 6, 2.329; 8, 2.558; 10, 2.757
x: 0, 12
y: 1.5, 3
caption: Membrane-osmometry data for a polystyrene in toluene at $25\ ^\circ\mathrm{C}$ (illustrative data with realistic scatter): $\Pi/c$ in units of $10^{4}\ \mathrm{Pa\,cm^3\,g^{-1}}$ against concentration $c$ in $\mathrm{mg\,cm^{-3}}$. The least-squares line has intercept $1.657$ and slope $0.111$. The intercept gives $\bar{M}_\mathrm{n} = RT/\text{intercept} = 1.50\times10^{5}\ \mathrm{g\,mol^{-1}}$ and the slope gives $A_2 = 4.5\times10^{-4}\ \mathrm{mol\,cm^3\,g^{-2}}$ ([[#ex-osmometry]]). Drag a point to see how strongly a single bad measurement at low concentration moves the intercept. The extrapolation to $c = 0$ is the whole measurement, which is why the lowest concentrations must be measured most carefully.
:::

::: example Number-average molar mass from osmotic pressure {#ex-osmometry}
The data of the figure ($c$ from $2.0$ to $10.0\ \mathrm{mg\,cm^{-3}}$) give a linear fit $\Pi/c = 1.657\times10^{4} + 1.11\times10^{6}\,c$, with $\Pi/c$ in $\mathrm{Pa\,cm^3\,g^{-1}}$ and $c$ in $\mathrm{g\,cm^{-3}}$, at $298.15\ \mathrm{K}$. Find $\bar{M}_\mathrm{n}$ and $A_2$, and say what $A_2$ tells you about the solvent.
::: solution
Use consistent units. $RT = 8.314\times298.15 = 2478.8\ \mathrm{J\,mol^{-1}}$, and $1\ \mathrm{J} = 1\ \mathrm{Pa\,m^3} = 10^{6}\ \mathrm{Pa\,cm^3}$, so $RT = 2.4788\times10^{9}\ \mathrm{Pa\,cm^3\,mol^{-1}}$. Then
$$
\bar{M}_\mathrm{n} = \frac{RT}{\text{intercept}} = \frac{2.4788\times10^{9}\ \mathrm{Pa\,cm^3\,mol^{-1}}}{1.657\times10^{4}\ \mathrm{Pa\,cm^3\,g^{-1}}} = 1.50\times10^{5}\ \mathrm{g\,mol^{-1}} .
$$
The slope is $RTA_2$, so
$$
A_2 = \frac{1.11\times10^{6}\ \mathrm{Pa\,cm^6\,g^{-2}}}{2.4788\times10^{9}\ \mathrm{Pa\,cm^3\,mol^{-1}}} = 4.5\times10^{-4}\ \mathrm{mol\,cm^3\,g^{-2}} .
$$
$A_2 > 0$, so toluene is a good solvent ($\chi < \tfrac12$), as [[polymer-chemistry/polymer-solutions#ex-solubility]] predicted. At the highest concentration the virial term contributes $(1.11\times10^{6})(0.010)/1.657\times10^{4} = 67\%$ of the intercept. Ignoring it and using $\Pi/c$ at a single concentration would underestimate $\bar{M}_\mathrm{n}$ by 40%.
:::
:::

## Light scattering

A solution scatters light because its refractive index fluctuates. Polymer chains are regions of slightly different refractive index, and their concentration fluctuates from place to place. For particles much smaller than the wavelength, every segment of a chain scatters in phase, so the scattered *amplitude* from one chain is proportional to its mass and the *intensity* to its mass squared. Heavy chains therefore dominate the scattering. That is why light scattering measures the weight-average molar mass, and why it is so sensitive to dust and aggregates. The scattered intensity at angle $\theta$, normalised by the incident intensity, the scattering volume and the distance, is the **Rayleigh ratio** $R_\theta$.

::: proposition Zimm equation {#prop-zimm}
For a dilute solution of polymer at mass concentration $c$, the excess Rayleigh ratio at scattering angle $\theta$ obeys, to first order in $c$ and in $q^2$,
$$
\frac{Kc}{R_\theta} = \frac{1}{\bar{M}_\mathrm{w}}\left(1 + \frac{q^2\langle R_\mathrm{g}^2\rangle_\mathrm{z}}{3}\right) + 2A_2c,
\qquad
K = \frac{4\pi^2n_0^2(\mathrm{d}n/\mathrm{d}c)^2}{N_\mathrm{A}\lambda_0^4},
\qquad
q = \frac{4\pi n_0}{\lambda_0}\sin\frac{\theta}{2},
$$ {#eq-zimm}
where $n_0$ is the solvent refractive index, $\mathrm{d}n/\mathrm{d}c$ the refractive-index increment of the polymer, $\lambda_0$ the vacuum wavelength and $q$ the magnitude of the scattering vector. The molar mass obtained is the **weight-average**, and the radius of gyration is a **z-average**.
:::

::: proof
We take the single-species result from the theory of fluctuation scattering (Einstein, Debye): in the limit $c \to 0$ and $\theta \to 0$, a solute of molar mass $M$ gives $R_0 = KcM$. This is the statement that a chain of mass $M$ scatters with amplitude $\propto M$, so with intensity $\propto M^2$, and there are $cN_\mathrm{A}/M$ chains per unit volume, so the total is $\propto cM$. For a mixture of species at concentrations $c_i$, the scattering from different chains adds incoherently, so
$$
R_0 = K\sum_ic_iM_i = Kc\,\frac{\sum_ic_iM_i}{\sum_ic_i} = Kc\bar{M}_\mathrm{w},
$$
because mass concentrations are mass weights and $\sum w_iM_i/\sum w_i = \bar{M}_\mathrm{w}$. The angular term arises because segments of one chain separated by distances comparable to $1/q$ scatter out of phase. Expanding the chain's form factor for small $q$ gives $P(q) = 1 - q^2R_\mathrm{g}^2/3 + \dots$, and averaging over species weighted by their contribution $c_iM_i$ to the intensity gives $\sum c_iM_iR_{\mathrm{g},i}^2/\sum c_iM_i$, which is the z-average of $R_\mathrm{g}^2$ (weights $n_iM_i^2$). Finally, intermolecular interactions reduce concentration fluctuations in a good solvent and add the term $2A_2c$, with the same $A_2$ as in osmometry. Inverting $R_\theta = Kc\bar{M}_\mathrm{w}P(q)(1 - 2A_2c\bar{M}_\mathrm{w} + \dots)$ to first order gives [[#eq-zimm]]. $\blacksquare$
:::

In a **Zimm plot**, $Kc/R_\theta$ is measured at several angles and concentrations, and the data are extrapolated to $\theta = 0$ (giving $1/\bar{M}_\mathrm{w} + 2A_2c$) and to $c = 0$ (giving $(1 + q^2R_\mathrm{g}^2/3)/\bar{M}_\mathrm{w}$). The two lines meet at $1/\bar{M}_\mathrm{w}$. The ratio of slope to intercept of the angular line gives $R_\mathrm{g}^2/3$. A chain must have $R_\mathrm{g}$ of at least about $10\ \mathrm{nm}$ for visible light to resolve its size, and this limit is what small-angle X-ray and neutron scattering extend downwards. The method is *absolute*. It needs no calibration with standards, only the optical constant $K$, so $\mathrm{d}n/\mathrm{d}c$ must be known accurately, because it enters squared.

::: example Weight-average molar mass and coil size by light scattering {#ex-zimm}
A polystyrene in toluene is measured with a $632.8\ \mathrm{nm}$ laser ($n_0 = 1.496$, $\mathrm{d}n/\mathrm{d}c = 0.110\ \mathrm{cm^3\,g^{-1}}$). Extrapolated to zero angle, $Kc/R_0$ is $2.80\times10^{-6}$ at $c = 1.0\times10^{-3}$ and $3.60\times10^{-6}\ \mathrm{mol\,g^{-1}}$ at $c = 2.0\times10^{-3}\ \mathrm{g\,cm^{-3}}$. Extrapolated to zero concentration, $Kc/R_\theta$ at $\theta = 90^\circ$ is $2.265\times10^{-6}\ \mathrm{mol\,g^{-1}}$. Find $K$, $\bar{M}_\mathrm{w}$, $A_2$ and $R_\mathrm{g}$.
::: solution
The optical constant, with $\lambda_0 = 6.328\times10^{-5}\ \mathrm{cm}$:
$$
K = \frac{4\pi^2(1.496)^2(0.110)^2}{(6.022\times10^{23})(6.328\times10^{-5})^4}\ \mathrm{mol\,cm^2\,g^{-2}} = 1.11\times10^{-7}\ \mathrm{mol\,cm^2\,g^{-2}} .
$$
Concentration line at $\theta = 0$: the slope is $(3.60 - 2.80)\times10^{-6}/1.0\times10^{-3} = 8.0\times10^{-4}\ \mathrm{mol\,cm^3\,g^{-2}} = 2A_2$, so $A_2 = 4.0\times10^{-4}\ \mathrm{mol\,cm^3\,g^{-2}}$. The intercept is $2.80\times10^{-6} - 8.0\times10^{-7} = 2.00\times10^{-6}\ \mathrm{mol\,g^{-1}}$, so $\bar{M}_\mathrm{w} = 5.0\times10^{5}\ \mathrm{g\,mol^{-1}}$.

Angle: $q = (4\pi\times1.496/632.8\ \mathrm{nm})\sin45^\circ = 0.0210\ \mathrm{nm^{-1}}$, so $q^2 = 4.41\times10^{-4}\ \mathrm{nm^{-2}}$. Then
$$
1 + \frac{q^2R_\mathrm{g}^2}{3} = \frac{2.265\times10^{-6}}{2.00\times10^{-6}} = 1.1325
\qquad\Longrightarrow\qquad
R_\mathrm{g}^2 = \frac{3(0.1325)}{4.41\times10^{-4}\ \mathrm{nm^{-2}}} = 901\ \mathrm{nm^2},\quad R_\mathrm{g} = 30\ \mathrm{nm} .
$$
For comparison, at $\Theta$ the same $M$ would have $R_\mathrm{g} \approx 0.0275\sqrt{5\times10^{5}} = 19\ \mathrm{nm}$. The coil is expanded by a factor of about 1.5 in toluene, consistent with the positive $A_2$. In practice the angular dependence is measured at many angles, and a single-angle value is no better than its intercept.
:::
:::

## Dilute-solution viscometry

The oldest method of estimating molar mass is still the cheapest. Dissolved coils increase the viscosity of a solvent in proportion to the volume they occupy, and that volume grows with molar mass. Flow times through a capillary viscometer (Ubbelohde or Ostwald) give the viscosity ratio directly.

::: definition Viscosity quantities and intrinsic viscosity {#def-intrinsic-viscosity}
With $\eta$ the viscosity of the solution and $\eta_0$ that of the solvent at the same temperature, and $c$ the mass concentration:

- **relative viscosity** (viscosity ratio): $\eta_\mathrm{r} = \eta/\eta_0$;
- **specific viscosity**: $\eta_\text{sp} = \eta_\mathrm{r} - 1$;
- **reduced viscosity** (viscosity number): $\eta_\text{sp}/c$;
- **inherent viscosity** (logarithmic viscosity number): $(\ln\eta_\mathrm{r})/c$;
- **intrinsic viscosity** (limiting viscosity number):
$$
[\eta] = \lim_{c\to0}\frac{\eta_\text{sp}}{c} = \lim_{c\to0}\frac{\ln\eta_\mathrm{r}}{c},
$$
with units of reciprocal concentration ($\mathrm{cm^3\,g^{-1}}$ or $\mathrm{dL\,g^{-1}}$). The extrapolation uses the **Huggins** equation, $\eta_\text{sp}/c = [\eta] + k_\mathrm{H}[\eta]^2c$, with $k_\mathrm{H} \approx 0.3$–$0.4$ in good solvents and about $0.5$ at $\Theta$, together with the **Kraemer** equation, $(\ln\eta_\mathrm{r})/c = [\eta] + (k_\mathrm{H} - \tfrac12)[\eta]^2c$. Both lines must reach the same intercept.
:::

The intrinsic viscosity is the hydrodynamic volume per unit mass of an isolated coil. Flory and Fox argued that a coil in a flowing solvent behaves like an impermeable sphere whose radius is proportional to its size, which gives
$$
[\eta] = \Phi\,\frac{\langle R^2\rangle^{3/2}}{M},
$$ {#eq-flory-fox}
with a nearly universal constant $\Phi \approx 2.5\times10^{23}\ \mathrm{mol^{-1}}$ (for $[\eta]$ in $\mathrm{cm^3\,g^{-1}}$ and $R$ in cm). Since $\langle R^2\rangle^{1/2} \propto M^{\nu}$, $[\eta] \propto M^{3\nu - 1}$. That is $M^{1/2}$ at $\Theta$ and about $M^{0.76}$ in a good solvent. This scaling is the theoretical basis of an empirical law.

::: proposition Mark–Houwink equation and the viscosity average {#prop-mark-houwink}
For a given polymer, solvent and temperature, the intrinsic viscosity of narrow fractions obeys the **Mark–Houwink(–Sakurada) equation**
$$
[\eta] = KM^{a},
$$ {#eq-mark-houwink}
with $a = 0.5$ in a theta solvent, $0.6$–$0.8$ for flexible coils in good solvents, and up to about $1.8$ for rigid rods. For a non-uniform sample, assuming the contributions of different chains to $\eta_\text{sp}$ are additive in the dilute limit, the molar mass obtained by inverting [[#eq-mark-houwink]] is the **viscosity-average**
$$
\bar{M}_\mathrm{v} = \left(\sum_iw_iM_i^{a}\right)^{1/a},
$$
which lies between $\bar{M}_\mathrm{n}$ and $\bar{M}_\mathrm{w}$ for $0 < a < 1$ and equals $\bar{M}_\mathrm{w}$ when $a = 1$.
:::

::: proof
In the dilute limit, each species raises the viscosity independently, $\eta_\text{sp} = \sum_i[\eta]_ic_i$, so $[\eta] = \sum_i[\eta]_ic_i/c = \sum_iw_i[\eta]_i$ with mass fractions $w_i = c_i/c$. Substituting $[\eta]_i = KM_i^a$ gives $[\eta] = K\sum_iw_iM_i^a$. Defining $\bar{M}_\mathrm{v}$ by $[\eta] = K\bar{M}_\mathrm{v}^{\,a}$ gives the stated average. It is the $a$-th power mean of the molar masses, with mass weights. Power means increase with the exponent, and the $(-1)$-th and 1st mass-weighted power means are $\bar{M}_\mathrm{n}$ and $\bar{M}_\mathrm{w}$ ([[polymer-chemistry/polymer-structure#def-averages]]), so for $0 < a < 1$, $\bar{M}_\mathrm{n} \le \bar{M}_\mathrm{v} \le \bar{M}_\mathrm{w}$. $\blacksquare$
:::

$K$ and $a$ are not universal. They are measured once for each polymer–solvent–temperature combination with fractions characterised by an absolute method, and they are tabulated, for example in the *Polymer Handbook*. Typical $\bar{M}_\mathrm{v}$ values lie 10–20% below $\bar{M}_\mathrm{w}$ for a polymer with $Đ \approx 2$.

::: widget plot
f: n0 + kh*n0^2*x; n0 + (kh-0.5)*n0^2*x
x: 0, 0.5
y: 0.8, 1.6
sliders: n0=1.2:0.5:1.5:0.01; kh=0.35:0.2:0.6:0.01
labels: \eta_\text{sp}/c\ \text{(Huggins)}; \ln\eta_\mathrm{r}/c\ \text{(Kraemer)}
caption: Huggins and Kraemer extrapolations for determining the intrinsic viscosity (axes in $\mathrm{dL\,g^{-1}}$ against $c$ in $\mathrm{g\,dL^{-1}}$), with $[\eta]$ (slider $n0$) and the Huggins constant $k_\mathrm{H}$ on the sliders. The reduced viscosity rises with concentration and the inherent viscosity falls, with slopes $k_\mathrm{H}[\eta]^2$ and $(k_\mathrm{H} - \tfrac12)[\eta]^2$, and both meet at $[\eta]$ on the axis. In practice the two lines are drawn through measurements at four or five concentrations, and a mismatch of their intercepts warns of aggregation, adsorption on the capillary, or concentrations too high for the linear form. The lines diverge more for larger $[\eta]$, so high polymers must be measured at lower concentrations.
:::

::: example Molar mass from intrinsic viscosity {#ex-mark-houwink}
A polystyrene sample in toluene at $25\ ^\circ\mathrm{C}$ has $[\eta] = 100\ \mathrm{cm^3\,g^{-1}}$. Take $K = 7.5\times10^{-3}\ \mathrm{cm^3\,g^{-1}}$ and $a = 0.75$ (approximate literature values for this system). Find $\bar{M}_\mathrm{v}$. If the sample has the most probable distribution with $\bar{M}_\mathrm{w} = 3.5\times10^{5}$, is the result plausible?
::: solution
Invert [[#eq-mark-houwink]]:
$$
\bar{M}_\mathrm{v} = \left(\frac{[\eta]}{K}\right)^{1/a} = \left(\frac{100}{7.5\times10^{-3}}\right)^{1/0.75} = (1.333\times10^{4})^{1.333} = 3.2\times10^{5}\ \mathrm{g\,mol^{-1}} .
$$
For the continuous Flory distribution with mass fractions $W(M) \propto M\,e^{-M/\bar{M}_\mathrm{n}}$, the power mean is $\bar{M}_\mathrm{v} = \bar{M}_\mathrm{n}[\Gamma(2+a)]^{1/a}$. With $a = 0.75$, $\Gamma(2.75) = 1.608$, so $\bar{M}_\mathrm{v} = 1.88\,\bar{M}_\mathrm{n} = 0.94\,\bar{M}_\mathrm{w}$. For $\bar{M}_\mathrm{w} = 3.5\times10^{5}$ this predicts $\bar{M}_\mathrm{v} \approx 3.3\times10^{5}$, consistent with the measurement. Viscometry, a capillary and a stopwatch, gives a molar mass close to $\bar{M}_\mathrm{w}$ for a fraction of the cost of light scattering, but only for a polymer whose $K$ and $a$ are known.
:::
:::

## Size-exclusion chromatography

Size-exclusion chromatography (SEC), also called gel-permeation chromatography (GPC), separates chains by size. A dilute solution is pumped through columns packed with porous beads (crosslinked polystyrene or silica) whose pores span the size range of the coils. Small coils explore much of the pore volume and are held back. Large coils are excluded from most pores and elute early. Coils larger than the largest pores elute together at the **exclusion limit**, the interstitial volume between the beads. The concentration of the eluate is followed by a differential refractive-index detector (signal proportional to mass concentration), often with UV, viscometer and multi-angle light-scattering detectors in series.

The elution volume $V_\mathrm{e}$ depends on the *hydrodynamic volume* of a coil, not directly on its mass. A **calibration curve** of $\log M$ against $V_\mathrm{e}$ is built from narrow standards, usually anionic polystyrenes ([[polymer-chemistry/controlled-polymerisation]]), and it is roughly linear across the separation range. Each slice $i$ of the chromatogram then has a mass $w_i$ (from the RI signal) and a molar mass $M_i$ (from the calibration), and the averages follow from the definitions:
$$
\bar{M}_\mathrm{n} = \frac{\sum w_i}{\sum w_i/M_i},\qquad \bar{M}_\mathrm{w} = \frac{\sum w_iM_i}{\sum w_i} .
$$

::: algorithm Analysing a conventional SEC chromatogram {#alg-sec}
1. Run narrow standards of the same polymer (or polystyrene) under identical conditions, and fit $\log M$ against $V_\mathrm{e}$ (linear or a low-order polynomial).
2. Run the sample. Subtract the baseline, and divide the RI trace into equal elution-volume slices. The height $h_i$ of each slice is proportional to the mass $w_i$ eluting in it.
3. Assign $M_i$ to each slice from the calibration. If the standards are a different polymer, convert with universal calibration (below).
4. Compute $\bar{M}_\mathrm{n} = \sum h_i/\sum(h_i/M_i)$, $\bar{M}_\mathrm{w} = \sum h_iM_i/\sum h_i$ and $Đ$. Check that the peak lies within the calibrated range and well away from the exclusion limit and the solvent peaks.
5. Report the eluent, temperature, column set, detector and calibration standards. Molar masses "relative to polystyrene standards" are not absolute molar masses unless the polymer *is* polystyrene.
:::

Since separation is by hydrodynamic volume, a calibration made with polystyrene is wrong for poly(methyl methacrylate), and badly wrong for a branched polymer, which is more compact than a linear one of the same mass. Benoit and co-workers showed in 1967 that the product $[\eta]M$, proportional to the hydrodynamic volume by [[#eq-flory-fox]], is the same for all polymers eluting at the same $V_\mathrm{e}$ in a given system. This **universal calibration** converts one polymer's calibration into another's. If polymers 1 and 2 both obey Mark–Houwink laws and elute at the same volume, then $K_1M_1^{1+a_1} = K_2M_2^{1+a_2}$, so
$$
\log M_2 = \frac{1}{1+a_2}\log\frac{K_1}{K_2} + \frac{1+a_1}{1+a_2}\log M_1 .
$$ {#eq-universal}
With an online viscometer, $[\eta]$ of each slice is measured directly. With online multi-angle light scattering, $M$ of each slice is measured absolutely and no calibration is needed.

::: example Universal calibration and slice analysis {#ex-sec}
(a) In THF at $35\ ^\circ\mathrm{C}$, take $K = 1.14\times10^{-2}\ \mathrm{cm^3\,g^{-1}}$, $a = 0.716$ for polystyrene and $K = 9.44\times10^{-3}\ \mathrm{cm^3\,g^{-1}}$, $a = 0.719$ for PMMA (representative values). A PMMA elutes at the volume where a polystyrene standard of $M = 1.00\times10^{5}$ elutes. What is its molar mass? (b) A PMMA chromatogram, after calibration, gives the slice data below (mass fractions $w_i$ normalised to 1). Find $\bar{M}_\mathrm{n}$, $\bar{M}_\mathrm{w}$ and $Đ$.

| $M_i/10^{4}\ \mathrm{g\,mol^{-1}}$ | $2$ | $4$ | $6$ | $8$ | $12$ | $20$ |
|---|---|---|---|---|---|---|
| $w_i$ | $0.10$ | $0.25$ | $0.30$ | $0.20$ | $0.10$ | $0.05$ |
::: solution
(a) From [[#eq-universal]]:
$$
\log M_2 = \frac{1}{1.719}\log\frac{1.14\times10^{-2}}{9.44\times10^{-3}} + \frac{1.716}{1.719}\times5.000 = \frac{0.0819}{1.719} + 4.9913 = 5.0390,
$$
so $M_\text{PMMA} = 1.09\times10^{5}\ \mathrm{g\,mol^{-1}}$. A PMMA coil in THF is slightly more compact than a polystyrene coil of the same mass, so at equal elution volume it is 9% heavier. Reporting it as "$1.00\times10^{5}$ (PS-equivalent)" would be 9% low.

(b) $\sum w_i/M_i = (0.10/2 + 0.25/4 + 0.30/6 + 0.20/8 + 0.10/12 + 0.05/20)\times10^{-4} = 0.19833\times10^{-4}$, so $\bar{M}_\mathrm{n} = 5.04\times10^{4}\ \mathrm{g\,mol^{-1}}$. $\sum w_iM_i = (0.2 + 1.0 + 1.8 + 1.6 + 1.2 + 1.0)\times10^{4} = 6.80\times10^{4}$, so $\bar{M}_\mathrm{w} = 6.80\times10^{4}\ \mathrm{g\,mol^{-1}}$ and $Đ = 1.35$. The highest slice, only 5% of the mass, contributes 15% of $\bar{M}_\mathrm{w}$. High-mass tails and baseline choice at the early-eluting edge matter more for $\bar{M}_\mathrm{w}$ than for $\bar{M}_\mathrm{n}$, and the reverse holds at the low-mass edge.
:::
:::

::: warning "Molecular weight by GPC" is usually a relative number {#warn-sec}
Many published molar masses are SEC values calibrated with polystyrene standards and quoted without qualification. For a polymer that is not polystyrene, these numbers can be wrong by tens of percent, and more for branched, star or rod-like chains, whose hydrodynamic volume per unit mass differs from that of linear polystyrene. Branching makes a polymer look *lighter*, because a compact coil elutes late. Rigid conjugated polymers look much *heavier*, because their extended chains elute early. Some polymers also stick to the column (enthalpic interactions), which delays them and makes them look smaller. Always say how a molar mass was obtained: "relative to PS standards in THF", "by universal calibration" or "by SEC–MALS". Use an absolute method (light scattering, osmometry, end-group analysis or MALDI for short chains) when the number matters.
:::

## Mass spectrometry and spectroscopy

**MALDI-TOF mass spectrometry** (matrix-assisted laser desorption/ionisation, time-of-flight) vaporises and ionises intact polymer chains, usually as $\mathrm{Na^+}$ or $\mathrm{Ag^+}$ adducts, from a UV-absorbing matrix. For polymers with $Đ$ below about 1.2 and masses up to a few $10^{4}$, it resolves individual chain lengths. The spacing between neighbouring peaks is the repeat-unit mass, and the absolute positions give the **end groups**. A peak at $m/z = nM_\text{rep} + M_\text{end} + M_\text{cation}$ identifies $M_\text{end}$. For poly(ethylene glycol), $\mathrm{HO(C_2H_4O)_nH}$, the sodiated monoisotopic peaks lie at $44.0262n + 18.0106 + 22.9898$, for example $1978.15$ for $n = 44$. Different end-group families appear as interleaved series, which makes MALDI the best way to show that a living polymerisation gave the intended ends. Its weaknesses are mass discrimination (long chains ionise and are detected less efficiently, so broad samples come out with $\bar{M}$ too low) and the fact that it gives counts, not masses, of ions.

**NMR spectroscopy** answers chemical questions. $^1\mathrm{H}$ NMR gives copolymer composition from the integrals of the units' characteristic signals ([[polymer-chemistry/copolymerisation]]), $\bar{X}_\mathrm{n}$ from end groups, and residual monomer. $^{13}\mathrm{C}$ NMR resolves tacticity to pentad level ([[polymer-chemistry/polymer-structure#def-tacticity]]), comonomer sequences, and branch types and frequencies (LDPE's butyl branches). **Infrared and Raman spectroscopy** identify polymers by their fingerprints (the basis of automatic plastic sorting in recycling), follow cure reactions by the disappearance of epoxide or isocyanate bands, and measure crystallinity from conformation-sensitive bands.

## Thermal analysis

**Differential scanning calorimetry (DSC)** heats a small sample (5–10 mg) and an empty reference pan at a constant rate, typically $10\ \mathrm{K\,min^{-1}}$, and records the difference in heat flow needed to keep them at the same temperature. Three features appear.

- The **glass transition** is a *step* in heat flow, because the heat capacity increases when the amorphous phase changes from glass to rubber or liquid. $T_\mathrm{g}$ is taken at the midpoint of the step. It depends on heating and cooling rates, because it is a kinetic transition ([[polymer-chemistry/polymer-properties]]).
- **Melting** is an endothermic *peak*, often broad, because crystallites of different thicknesses melt at different temperatures.
- **Crystallisation** is exothermic. On cooling it gives a peak, and on heating a quenched sample it can appear as **cold crystallisation** above $T_\mathrm{g}$.

::: definition Degree of crystallinity from DSC {#def-crystallinity}
The **mass fraction crystallinity** of a semicrystalline polymer is estimated from its enthalpy of fusion,
$$
X_\mathrm{c} = \frac{\Delta H_\mathrm{m} - \Delta H_\mathrm{cc}}{\Delta H_\mathrm{m}^\circ},
$$
where $\Delta H_\mathrm{m}$ is the measured specific enthalpy of the melting endotherm, $\Delta H_\mathrm{cc}$ that of any cold-crystallisation exotherm in the same scan (crystallinity created during the scan, not present in the sample), and $\Delta H_\mathrm{m}^\circ$ the specific enthalpy of fusion of a hypothetical 100% crystalline sample, obtained by extrapolation. It is about $293\ \mathrm{J\,g^{-1}}$ for polyethylene, about $140\ \mathrm{J\,g^{-1}}$ for PET and about $207\ \mathrm{J\,g^{-1}}$ for isotactic polypropylene (values vary by a few percent between sources).
:::

**Thermogravimetric analysis (TGA)** records mass against temperature, under nitrogen or air. It shows the onset of decomposition, the content of volatiles (moisture, residual solvent), the inorganic filler or ash left at high temperature, and, for polymers that depolymerise, the stepwise loss of monomer. **Dynamic mechanical analysis (DMA)**, the most sensitive probe of $T_\mathrm{g}$, belongs to the mechanical properties of [[polymer-chemistry/polymer-properties]].

::: example Crystallinity of a PET bottle sample {#ex-dsc}
A sample cut from a PET preform is heated at $10\ \mathrm{K\,min^{-1}}$. The DSC trace shows a glass transition step at $76\ ^\circ\mathrm{C}$, a cold-crystallisation exotherm of $25\ \mathrm{J\,g^{-1}}$ near $130\ ^\circ\mathrm{C}$, and a melting endotherm of $52\ \mathrm{J\,g^{-1}}$ peaking at $250\ ^\circ\mathrm{C}$. With $\Delta H_\mathrm{m}^\circ = 140\ \mathrm{J\,g^{-1}}$, what was the crystallinity of the sample before the scan? What would a careless analysis report?
::: solution
The cold-crystallisation exotherm shows that crystals formed *during* the scan, as the mobile amorphous chains above $T_\mathrm{g}$ reorganised. Those crystals then melted in the endotherm along with the original ones. The original crystallinity is therefore
$$
X_\mathrm{c} = \frac{52 - 25}{140} = 0.19,
$$
about 19%. Ignoring the exotherm gives $52/140 = 0.37$, double the true value. Preforms are deliberately quenched to keep them amorphous and clear, so that they can be stretch-blown into bottles in which strain-induced crystallinity then develops. A low initial crystallinity is the intended result. The step at $76\ ^\circ\mathrm{C}$, close to the textbook $T_\mathrm{g}$ of amorphous PET, confirms a largely amorphous starting material.
:::
:::

::: quiz
A sample of a branched polyethylene is analysed by conventional SEC calibrated with linear polyethylene standards, and separately by SEC with an online multi-angle light-scattering detector. How do the two results for $\bar{M}_\mathrm{w}$ compare?
- [ ] They agree, because SEC separates by mass.
- [x] The conventional calibration gives a lower value, because a branched chain is more compact than a linear chain of the same mass and elutes later.
- [ ] The conventional calibration gives a higher value, because branches increase the hydrodynamic volume.
- [ ] The light-scattering value is lower, because light scattering measures $\bar{M}_\mathrm{n}$.
::: solution
SEC separates by hydrodynamic volume, not mass. At equal mass, a branched molecule has a smaller $R_\mathrm{g}$ and hydrodynamic radius than a linear one, so it elutes at a larger volume, where the linear calibration assigns a smaller $M$. The online light-scattering detector measures each slice's $M$ absolutely ([[#prop-zimm]]) and gives the true, higher value. The ratio of the two, or of $[\eta]$ values at equal $M$ (the contraction factor $g'$), is a standard measure of long-chain branching. Light scattering gives $\bar{M}_\mathrm{w}$, not $\bar{M}_\mathrm{n}$.
:::
:::

::: history
**Jacobus van 't Hoff**'s law of osmotic pressure (1887) became, with the virial correction, the first absolute method for macromolecular mass. In the 1920s osmotic measurements on rubber and cellulose were among the evidence for Staudinger's macromolecules. **Hermann Staudinger** proposed in 1930 that the viscosity of a polymer solution is proportional to molar mass. The exponent form $[\eta] = KM^a$ is due to **Herman Mark** (1938) and **Roelof Houwink** (1940), with **Ichiro Sakurada**'s independent work. **Peter Debye** developed light scattering for polymer molar masses during the Second World War, in work on synthetic rubber (*Journal of Applied Physics* 15, 338, 1944), and **Bruno Zimm** introduced the double extrapolation in 1948. **John C. Moore** at Dow Chemical described gel-permeation chromatography with crosslinked polystyrene gels in 1964, and **Zbigniew Grubisic**, **Paul Rempp** and **Henri Benoit** reported universal calibration in 1967. MALDI was introduced by **Michael Karas** and **Franz Hillenkamp** in 1985–88, and **Koichi Tanaka**'s related laser desorption of proteins (1988) earned him a share of the 2002 Nobel Prize in Chemistry. DSC as used today was introduced commercially by **E. S. Watson** and **M. J. O'Neill** at Perkin-Elmer in 1964.
:::

## Where this leads

The averages and distributions measured here test the kinetic predictions of [[polymer-chemistry/step-growth]], [[polymer-chemistry/radical-polymerisation]] and [[polymer-chemistry/controlled-polymerisation]]. A Flory polycondensate should give $Đ \approx 2$, and a living polymer $Đ$ close to 1. The thermal transitions found by DSC, and the crystallinity it measures, are explained in [[polymer-chemistry/polymer-properties]], which also adds dynamic mechanical analysis and rheology to the toolkit. The general techniques (chromatography, NMR, IR, mass spectrometry and thermal methods) are treated in [[analytical-chemistry]] and [[spectroscopy]], and statistical treatment of calibration lines is covered in Maths Atlas ([/learn/maths/](/learn/maths/)).

::: summary
- Each method measures a particular average. Colligative methods and end groups count chains ($\bar{M}_\mathrm{n}$), light scattering weights by mass ($\bar{M}_\mathrm{w}$, with z-average $R_\mathrm{g}$), and viscometry gives $\bar{M}_\mathrm{v}$ between the two.
- Osmometry: $\Pi/c = RT(1/\bar{M}_\mathrm{n} + A_2c + \dots)$. Extrapolate to $c = 0$, and the slope gives solvent quality. The useful range is about $2\times10^{4}$ to $10^{6}$.
- Light scattering: $Kc/R_\theta = (1 + q^2R_\mathrm{g}^2/3)/\bar{M}_\mathrm{w} + 2A_2c$, with a Zimm double extrapolation. The method is absolute but needs an accurate $\mathrm{d}n/\mathrm{d}c$ and clean solutions.
- Viscometry: $[\eta] = \lim\eta_\text{sp}/c$ (Huggins and Kraemer extrapolations) and $[\eta] = KM^a$ ($a = 0.5$ at $\Theta$, 0.6–0.8 in good solvents), connected to coil size by Flory–Fox, $[\eta] = \Phi\langle R^2\rangle^{3/2}/M$.
- SEC separates by hydrodynamic volume. Slice analysis gives the full distribution, but results are relative to the standards unless universal calibration ($[\eta]M$ constant) or online light scattering is used.
- MALDI resolves chains and end groups of narrow, short polymers. NMR gives composition, tacticity and end groups.
- DSC gives $T_\mathrm{g}$ (step), $T_\mathrm{m}$ (endotherm) and crystallinity $X_\mathrm{c} = (\Delta H_\mathrm{m} - \Delta H_\mathrm{cc})/\Delta H_\mathrm{m}^\circ$. TGA gives stability, volatiles and filler content.
:::

## Exercises

::: exercise Crystallinity of polyethylene {level=1 check="0.700"}
A polyethylene sample shows a melting endotherm of $205\ \mathrm{J\,g^{-1}}$ and no cold crystallisation. Taking $\Delta H_\mathrm{m}^\circ = 293\ \mathrm{J\,g^{-1}}$, what is its mass-fraction crystallinity? (Enter $X_\mathrm{c}$ as a fraction, to three significant figures.)
::: solution
$X_\mathrm{c} = 205/293 = 0.700$, about 70%, typical of high-density polyethylene. A low-density polyethylene with its short branches might give $100$–$140\ \mathrm{J\,g^{-1}}$, or 35–50%.
:::
:::

::: exercise Molar mass from intrinsic viscosity {level=1 check="142000"}
A polystyrene in toluene at $25\ ^\circ\mathrm{C}$ has $[\eta] = 55\ \mathrm{cm^3\,g^{-1}}$. With $K = 7.5\times10^{-3}\ \mathrm{cm^3\,g^{-1}}$ and $a = 0.75$, find $\bar{M}_\mathrm{v}$. (Enter $\bar{M}_\mathrm{v}$ in $\mathrm{g\,mol^{-1}}$, to three significant figures.)
::: solution
$\bar{M}_\mathrm{v} = (55/7.5\times10^{-3})^{1/0.75} = (7333)^{1.333} = 1.42\times10^{5}\ \mathrm{g\,mol^{-1}}$.
:::
:::

::: exercise How big is the osmotic pressure? {level=1 check="248"}
Estimate the osmotic pressure at $298.15\ \mathrm{K}$ of a solution containing $5.0\ \mathrm{mg\,cm^{-3}}$ of a polymer with $\bar{M}_\mathrm{n} = 5.0\times10^{4}\ \mathrm{g\,mol^{-1}}$, neglecting the virial terms. (Enter $\Pi$ in Pa, to three significant figures.)
::: solution
$c = 5.0\ \mathrm{mg\,cm^{-3}} = 5.0\ \mathrm{kg\,m^{-3}}$. $\Pi = cRT/\bar{M}_\mathrm{n} = (5.0\ \mathrm{kg\,m^{-3}})(2478.8\ \mathrm{J\,mol^{-1}})/(50\ \mathrm{kg\,mol^{-1}}) = 248\ \mathrm{Pa}$, a column of about 3 cm of an organic solvent. Measurable, but only with care over temperature and membrane equilibration.
:::
:::

::: exercise Radius of gyration from a Zimm plot {level=2 check="30"}
Extrapolated to zero concentration, the angular line of a Zimm plot has slope (with respect to $q^2$) divided by intercept equal to $300\ \mathrm{nm^2}$. What is $R_\mathrm{g}$? (Enter $R_\mathrm{g}$ in nm.)
::: solution
At $c = 0$, $Kc/R_\theta = (1/\bar{M}_\mathrm{w})(1 + q^2R_\mathrm{g}^2/3)$, so slope/intercept $= R_\mathrm{g}^2/3 = 300\ \mathrm{nm^2}$. Then $R_\mathrm{g}^2 = 900\ \mathrm{nm^2}$ and $R_\mathrm{g} = 30\ \mathrm{nm}$. This is a z-average.
:::
:::

::: exercise Universal calibration {level=2 check="218000"}
Using the Mark–Houwink constants of [[#ex-sec]], what is the molar mass of a PMMA that elutes at the same volume as a polystyrene standard of $M = 2.00\times10^{5}\ \mathrm{g\,mol^{-1}}$? (Enter $M$ in $\mathrm{g\,mol^{-1}}$, to three significant figures.)
::: solution
$\log M_2 = (1/1.719)\log(1.14\times10^{-2}/9.44\times10^{-3}) + (1.716/1.719)\log(2.00\times10^{5}) = 0.0476 + 0.99825\times5.30103 = 5.3394$, so $M_2 = 2.18\times10^{5}\ \mathrm{g\,mol^{-1}}$. The correction is again about 9%.
:::
:::

::: exercise Averages from SEC slices {level=2 check="1.35"}
Using the slice data of [[#ex-sec]] (b), verify $\bar{M}_\mathrm{n}$ and $\bar{M}_\mathrm{w}$, and give the dispersity. Then remove the highest slice ($2.0\times10^{5}$, $w = 0.05$) as if it had been lost in the baseline, renormalise, and recompute $\bar{M}_\mathrm{w}$. (Enter the original $Đ$ to three significant figures.)
::: solution
Original: $\bar{M}_\mathrm{n} = 1/(0.19833\times10^{-4}) = 5.04\times10^{4}$, $\bar{M}_\mathrm{w} = 6.80\times10^{4}$, so $Đ = 1.35$. Without the top slice: the mass fractions sum to $0.95$, and $\sum w_iM_i = 5.80\times10^{4}$, so $\bar{M}_\mathrm{w} = 5.80/0.95\times10^{4} = 6.11\times10^{4}$, a 10% drop. $\sum w_i/M_i = 0.19583\times10^{-4}$, so $\bar{M}_\mathrm{n} = 0.95/0.19583\times10^{-4} = 4.85\times10^{4}$, only a 4% drop. Baseline errors at the high-mass edge hit $\bar{M}_\mathrm{w}$ hardest.
:::
:::

::: exercise Coil size from intrinsic viscosity {level=3 check="19.9"}
Polystyrene in cyclohexane at $\Theta$ obeys $[\eta]_\Theta = 0.082\,M^{1/2}\ \mathrm{cm^3\,g^{-1}}$. For $M = 5.0\times10^{5}\ \mathrm{g\,mol^{-1}}$, use the Flory–Fox equation with $\Phi = 2.5\times10^{23}\ \mathrm{mol^{-1}}$ to find $\langle R^2\rangle_0^{1/2}$ and $R_\mathrm{g}$, and compare with $R_\mathrm{g} = 0.0275\,M^{1/2}\ \mathrm{nm}$ from light scattering. (Enter $R_\mathrm{g}$ in nm, to three significant figures.)
::: solution
$[\eta] = 0.082\times707.1 = 58.0\ \mathrm{cm^3\,g^{-1}}$. From [[#eq-flory-fox]], $\langle R^2\rangle^{3/2} = [\eta]M/\Phi = 58.0\times5.0\times10^{5}/2.5\times10^{23} = 1.16\times10^{-16}\ \mathrm{cm^3}$, so $\langle R^2\rangle^{1/2} = 4.88\times10^{-6}\ \mathrm{cm} = 48.8\ \mathrm{nm}$ and $R_\mathrm{g} = 48.8/\sqrt6 = 19.9\ \mathrm{nm}$. Light scattering gives $0.0275\times707.1 = 19.4\ \mathrm{nm}$. The 3% agreement is about as good as the uncertainty in $\Phi$ allows. Two quite different physical measurements, flow and scattering, see the same coil.
:::
:::

::: exercise An osmometry analysis {level=3 check="150000"}
Using the five data points of the osmometry figure ($c$ = 2, 4, 6, 8, 10 $\mathrm{mg\,cm^{-3}}$; $\Pi/c$ = 1.883, 2.086, 2.329, 2.558, 2.757 in $10^{4}\ \mathrm{Pa\,cm^3\,g^{-1}}$), perform a least-squares fit and obtain $\bar{M}_\mathrm{n}$ and $A_2$ at $298.15\ \mathrm{K}$. Then estimate the uncertainty in $\bar{M}_\mathrm{n}$ if the intercept is uncertain by $\pm0.03\times10^{4}\ \mathrm{Pa\,cm^3\,g^{-1}}$. (Enter $\bar{M}_\mathrm{n}$ in $\mathrm{g\,mol^{-1}}$, to two significant figures.)
::: hint
$\bar{x} = 6$ and $\sum(x - \bar{x})^2 = 40$. Compute $\sum(x-\bar{x})(y-\bar{y})$.
:::
::: solution
$\bar{y} = 2.3226$. The deviations $x - \bar{x}$ are $-4, -2, 0, 2, 4$, so $\sum(x-\bar{x})(y-\bar{y}) = -4(1.883) - 2(2.086) + 2(2.558) + 4(2.757) = 4.44$, and the slope is $4.44/40 = 0.111$ per $\mathrm{mg\,cm^{-3}}$. The intercept is $2.3226 - 0.111\times6 = 1.6566$. Converting units, the intercept is $1.657\times10^{4}\ \mathrm{Pa\,cm^3\,g^{-1}}$ and the slope is $0.111\times10^{4}$ per $10^{-3}\ \mathrm{g\,cm^{-3}}$, which is $1.11\times10^{6}\ \mathrm{Pa\,cm^6\,g^{-2}}$. Then $\bar{M}_\mathrm{n} = 2.4788\times10^{9}/1.657\times10^{4} = 1.5\times10^{5}\ \mathrm{g\,mol^{-1}}$ and $A_2 = 1.11\times10^{6}/2.4788\times10^{9} = 4.5\times10^{-4}\ \mathrm{mol\,cm^3\,g^{-2}}$. An intercept uncertainty of $\pm0.03$ in $1.66$ is $\pm1.8\%$, so $\bar{M}_\mathrm{n} = (1.50 \pm 0.03)\times10^{5}$. All of the error in $\bar{M}_\mathrm{n}$ comes from the extrapolation, which is why two significant figures is the honest answer.
:::
:::
