Dip a clean mercury drop into a solution of sodium fluoride and connect it, through a potentiostat, to a reference electrode. Between roughly $-1.6$ and $+0.25\ \mathrm{V}$ against the saturated calomel electrode almost nothing chemical happens: mercury is too noble to dissolve, fluoride and sodium ions are too hard to oxidise or reduce, and water decomposes only slowly on mercury. Yet every time you change the potential, a small current flows briefly and then stops. The interface is behaving as a capacitor. Charge accumulates on the metal side as an excess or deficit of electrons, and an equal and opposite charge of ions gathers on the solution side. This arrangement of two opposite layers of charge — the **electrical double layer** — is where all of electrochemistry happens: electron transfer takes place across it, its field of order $10^{9}\ \mathrm{V\,m^{-1}}$ is what drives electrode reactions, and its capacitance shows up as a background current in every voltammogram and as the stored energy of a supercapacitor.

This chapter builds the structure of the double layer in the historical order of its models, each correcting the last: Helmholtz's molecular capacitor, the diffuse layer of Gouy and Chapman, and Stern's combination of the two. We first need a way to measure the charge on an electrode, and mercury supplies one through its surface tension. The thermodynamics of [[electrochemistry/cell-thermodynamics]] and the Debye length of [[thermodynamics/ions-in-solution]] are the tools.

## Polarisable and non-polarisable interfaces

::: definition Ideally polarisable and non-polarisable electrodes {#def-polarisable}
An **ideally polarisable electrode** is one across whose interface no charge can pass, over a range of potential, so that any change of potential only charges the interface; the interface is then a pure capacitor. An **ideally non-polarisable electrode** is one whose potential does not change when current passes, because a fast reversible reaction carries any current with negligible change in potential; the interface is then effectively a short circuit. The **surface charge density** of the metal, $\sigma_\mathrm{M}$ (in $\mathrm{C\,m^{-2}}$ or $\mu\mathrm{C\,cm^{-2}}$), is balanced by an equal and opposite charge $\sigma_\mathrm{S} = -\sigma_\mathrm{M}$ in the solution. The potential at which $\sigma_\mathrm{M} = 0$ is the **potential of zero charge** $E_\mathrm{pzc}$. The **differential capacitance** of the interface is
$$
C_\mathrm{d} = \left(\frac{\partial\sigma_\mathrm{M}}{\partial E}\right)_{T,p,\mu} ,
$$ {#eq-cd}
where the subscript $\mu$ means that the solution composition is held fixed.
:::

Real electrodes lie between the ideals. Mercury in sodium fluoride and platinum in deaerated perchloric acid (over a narrower window) are nearly ideally polarisable. The silver–silver chloride and saturated calomel electrodes, with large exchange currents ([[electrochemistry/electrode-kinetics]]), are nearly non-polarisable, which is precisely what a reference electrode must be. A working electrode in voltammetry is used in a range where it is polarisable, and an electroactive species added to the solution provides the faradaic current we wish to study.

Two facts about magnitudes will guide everything. Typical double-layer capacitances are $10$–$40\ \mu\mathrm{F\,cm^{-2}}$, so a change of $1\ \mathrm{V}$ stores about $20\ \mu\mathrm{C\,cm^{-2}}$ — about one electron for every ten to twenty metal atoms of the surface. And the charge is separated by a fraction of a nanometre on the metal side, so the fields are enormous. Neither the charge nor the separation is visible to chemical analysis, but both are measurable electrically.

## Electrocapillarity: weighing the charge with surface tension

The surface tension $\gamma$ of mercury in contact with an electrolyte depends on the potential. Gabriel Lippmann measured it in 1875 with his capillary electrometer: a mercury column in a fine glass capillary, whose meniscus height balances surface tension against hydrostatic pressure. Plotted against $E$, $\gamma$ gives a curve close to an inverted parabola — the **electrocapillary curve** — with its maximum at the potential of zero charge.

::: proposition The Lippmann equation {#prop-lippmann}
For an ideally polarisable electrode at constant temperature, pressure and solution composition,
$$
\left(\frac{\partial\gamma}{\partial E}\right)_{T,p,\mu} = -\sigma_\mathrm{M}, \qquad
\left(\frac{\partial^2\gamma}{\partial E^2}\right)_{T,p,\mu} = -C_\mathrm{d} .
$$ {#eq-lippmann}
If $C_\mathrm{d}$ is independent of potential, the electrocapillary curve is the parabola $\gamma = \gamma_\mathrm{max} - \tfrac{1}{2}C_\mathrm{d}(E - E_\mathrm{pzc})^2$.
:::

::: proof
Consider the interface as a surface phase. Its Gibbs energy changes by $\gamma\,\mathrm{d}A$ when the area changes and by the electrical work of charging when the charge changes. For a reversible change of the interface at constant $T$ and $p$, the analogue of the Gibbs–Duhem equation for surfaces (the Gibbs adsorption equation of [[thermodynamics/mixtures]]) generalised to include charge is
$$
-\mathrm{d}\gamma = \sigma_\mathrm{M}\,\mathrm{d}E + \sum_i\Gamma_i\,\mathrm{d}\mu_i ,
$$
where $\Gamma_i$ are surface excesses. A quick way to see the electrical term: at fixed composition, extend the surface by $\mathrm{d}A$ at potential $E$. Extra charge $\sigma_\mathrm{M}\,\mathrm{d}A$ must flow onto the metal, and the electrical work done on the interface is $E\sigma_\mathrm{M}\,\mathrm{d}A$, so the surface Gibbs energy per unit area is $g = \gamma + E\sigma_\mathrm{M}$ (up to a constant). The fundamental relation $\mathrm{d}g = E\,\mathrm{d}\sigma_\mathrm{M}$ for the surface at fixed composition (charging work per unit area) then gives $\mathrm{d}\gamma = \mathrm{d}g - E\,\mathrm{d}\sigma_\mathrm{M} - \sigma_\mathrm{M}\,\mathrm{d}E = -\sigma_\mathrm{M}\,\mathrm{d}E$. With all $\mathrm{d}\mu_i = 0$ this is the first result. Differentiating again and using [[#eq-cd]] gives the second. If $C_\mathrm{d}$ is constant, integrating twice with $\sigma_\mathrm{M}(E_\mathrm{pzc}) = 0$ gives $\sigma_\mathrm{M} = C_\mathrm{d}(E - E_\mathrm{pzc})$ and the parabola.
:::

The result explains the shape at a glance. Charge of either sign *lowers* the surface tension, because like charges on the surface repel each other and so favour a larger area; the surface is most tightly held together when it is uncharged. The slope of the curve is the charge, its curvature the capacitance.

::: example Reading an electrocapillary curve {#ex-electrocapillary}
A mercury electrode in $0.1\ \mathrm{mol\,dm^{-3}}$ NaF has $\gamma_\mathrm{max} = 0.426\ \mathrm{N\,m^{-1}}$ at $E_\mathrm{pzc}$. Assume a constant $C_\mathrm{d} = 20\ \mu\mathrm{F\,cm^{-2}}$. Find $\gamma$ and $\sigma_\mathrm{M}$ at $0.50\ \mathrm{V}$ negative of the pzc.
::: solution
In SI units $C_\mathrm{d} = 20\times10^{-6}\ \mathrm{F}/10^{-4}\ \mathrm{m^2} = 0.20\ \mathrm{F\,m^{-2}}$. Then
$$
\sigma_\mathrm{M} = C_\mathrm{d}(E - E_\mathrm{pzc}) = 0.20\ \mathrm{F\,m^{-2}}\times(-0.50\ \mathrm{V}) = -0.10\ \mathrm{C\,m^{-2}} = -10\ \mu\mathrm{C\,cm^{-2}},
$$
$$
\gamma = 0.426 - \tfrac{1}{2}(0.20)(0.50)^{2}\ \mathrm{N\,m^{-1}} = 0.426 - 0.025 = 0.401\ \mathrm{N\,m^{-1}} .
$$
($1\ \mathrm{F\,V^2\,m^{-2}} = 1\ \mathrm{J\,m^{-2}} = 1\ \mathrm{N\,m^{-1}}$.) An excess charge of $0.10\ \mathrm{C\,m^{-2}}$ is $6.2\times10^{17}$ electrons per square metre; a mercury surface has roughly $1.2\times10^{19}$ atoms per square metre, so the electrode carries about one extra electron for every twenty surface atoms. A $6\,\%$ drop in surface tension, easily read on a capillary electrometer, has weighed this charge.
:::
:::

::: widget plot
f: g0 - 0.5*C*x^2; -C*x
x: -1.2, 0.6
y: -30, 45
sliders: C=20:5:50:1; g0=42.6:35:50:0.1
labels: \gamma\ (10^{-2}\ \mathrm{N\,m^{-1}}); \sigma_\mathrm{M}\ (\mu\mathrm{C\,cm^{-2}})
hlines: 0
caption: The electrocapillary curve [[#eq-lippmann]] for constant capacitance, with potential $x = E - E_\mathrm{pzc}$ in volts. The upper curve is the surface tension (in units of $10^{-2}\ \mathrm{N\,m^{-1}}$, so $42.6$ means $0.426\ \mathrm{N\,m^{-1}}$); the line is the electrode charge, the negative slope of the parabola. Raise $C$ (in $\mu\mathrm{F\,cm^{-2}}$) and the parabola narrows. Real curves on mercury are asymmetric: the capacitance is about $16\ \mu\mathrm{F\,cm^{-2}}$ at negative potentials and $30$–$40\ \mu\mathrm{F\,cm^{-2}}$ at positive potentials, because anions approach the surface more closely than hydrated cations — a hint that the structure of the inner layer matters.
:::

Lippmann's method works only for liquid metals; for solids the charge is obtained instead by integrating capacitance measurements, $\sigma_\mathrm{M} = \int_{E_\mathrm{pzc}}^{E}C_\mathrm{d}\,\mathrm{d}E$, with the pzc located by the minimum in capacitance in dilute solution that the Gouy–Chapman theory predicts. Mercury nonetheless gave the first and still the best-characterised double layer, largely through David Grahame's measurements of the 1940s.

## The Helmholtz layer

The simplest model is Helmholtz's of 1853: the excess charge on the metal is a sheet at its surface, and the counter-charge in solution is a second sheet of ions at their distance of closest approach, $d$. The interface is a parallel-plate capacitor.

::: definition Helmholtz capacitance {#def-helmholtz}
In the **Helmholtz model**, the double layer is a parallel-plate capacitor of plate separation $d$ filled with a medium of relative permittivity $\varepsilon_\mathrm{r}$, with capacitance per unit area
$$
C_\mathrm{H} = \frac{\varepsilon_\mathrm{r}\varepsilon_0}{d},
$$ {#eq-helmholtz}
independent of potential and concentration. The plane through the centres of the counter-ions is the **outer Helmholtz plane** (OHP).
:::

The difficulty is the choice of $\varepsilon_\mathrm{r}$. Bulk water has $\varepsilon_\mathrm{r} = 78.5$, but the first layer of water at a charged surface is oriented by the field and cannot rotate further in response to it — it is *dielectrically saturated* — and its effective permittivity is near $6$.

::: example A molecular capacitor {#ex-helmholtz}
Take $d = 0.30\ \mathrm{nm}$ (the radius of a hydrated cation plus one water layer) and $\varepsilon_\mathrm{r} = 6$. Find $C_\mathrm{H}$, and the electric field in the layer when $0.50\ \mathrm{V}$ is dropped across it.
::: solution
$$
C_\mathrm{H} = \frac{6\times8.854\times10^{-12}\ \mathrm{F\,m^{-1}}}{0.30\times10^{-9}\ \mathrm{m}} = 0.177\ \mathrm{F\,m^{-2}} = 17.7\ \mu\mathrm{F\,cm^{-2}},
$$
close to the measured capacitance of mercury at negative potentials ($16\ \mu\mathrm{F\,cm^{-2}}$). The field is $\mathcal{E} = 0.50\ \mathrm{V}/0.30\times10^{-9}\ \mathrm{m} = 1.7\times10^{9}\ \mathrm{V\,m^{-1}}$. For comparison, air breaks down at $3\times10^{6}\ \mathrm{V\,m^{-1}}$. It is this field, acting over a distance of a few ångström, that accelerates or retards electron transfer when the electrode potential is changed by a few hundred millivolts ([[electrochemistry/electrode-kinetics]]). Had we used bulk water's $\varepsilon_\mathrm{r} = 78.5$, we would have predicted $230\ \mu\mathrm{F\,cm^{-2}}$, ten times the observed value — the saturation of the inner-layer water is real.
:::
:::

The Helmholtz model has two failures. It predicts a capacitance independent of potential and concentration, whereas in dilute solutions the measured capacitance shows a pronounced *minimum* at the potential of zero charge, deepening as the electrolyte is diluted. And it treats the ions as fixed in a plane, ignoring the thermal motion that the Debye–Hückel theory made central.

## The diffuse layer: Gouy–Chapman theory

Louis Georges Gouy (1910) and David Leonard Chapman (1913), independently, let the counter-ions spread out under the competition between the electrostatic attraction of the electrode and thermal agitation — exactly the ionic atmosphere of [[thermodynamics/ions-in-solution]], but around a charged plane rather than an ion.

::: proposition Gouy–Chapman diffuse layer {#prop-gouy-chapman}
For a planar electrode in a symmetric $z{:}z$ electrolyte of bulk concentration $c$ (in $\mathrm{mol\,m^{-3}}$), treating the ions as point charges in a continuum of permittivity $\varepsilon = \varepsilon_\mathrm{r}\varepsilon_0$, the potential $\phi(x)$ relative to the bulk solution at distance $x$ from the plane obeys the Poisson–Boltzmann equation. With $\phi_0$ the potential at the plane, its solution gives
$$
\sigma_\mathrm{M} = \sqrt{8\varepsilon RTc}\;\sinh\!\left(\frac{zF\phi_0}{2RT}\right), \qquad
C_\mathrm{GC} = \frac{\mathrm{d}\sigma_\mathrm{M}}{\mathrm{d}\phi_0} = \frac{\varepsilon}{\lambda_\mathrm{D}}\cosh\!\left(\frac{zF\phi_0}{2RT}\right),
$$ {#eq-grahame}
with the Debye length $\lambda_\mathrm{D} = \sqrt{\varepsilon RT/(2z^2F^2c)}$. For $|zF\phi_0| \ll 2RT$ the potential decays as $\phi = \phi_0\,\mathrm{e}^{-x/\lambda_\mathrm{D}}$. The first equation is the **Grahame equation**.
:::

::: proof
Poisson's equation in one dimension is $\mathrm{d}^2\phi/\mathrm{d}x^2 = -\rho/\varepsilon$, and the Boltzmann distribution gives the ion concentrations $c_\pm = c\,\exp(\mp zF\phi/RT)$, so the charge density is
$$
\rho = zF(c_+ - c_-) = -2zFc\,\sinh\!\left(\frac{zF\phi}{RT}\right), \qquad
\frac{\mathrm{d}^2\phi}{\mathrm{d}x^2} = \frac{2zFc}{\varepsilon}\sinh\!\left(\frac{zF\phi}{RT}\right).
$$
Multiply both sides by $2\,\mathrm{d}\phi/\mathrm{d}x$ and use $\frac{\mathrm{d}}{\mathrm{d}x}\left(\phi'^2\right) = 2\phi'\phi''$:
$$
\frac{\mathrm{d}}{\mathrm{d}x}\left(\frac{\mathrm{d}\phi}{\mathrm{d}x}\right)^{2} = \frac{4zFc}{\varepsilon}\sinh\!\left(\frac{zF\phi}{RT}\right)\frac{\mathrm{d}\phi}{\mathrm{d}x} .
$$
Integrate from the bulk ($x \rightarrow \infty$, where $\phi = 0$ and $\mathrm{d}\phi/\mathrm{d}x = 0$) to a point where the potential is $\phi$:
$$
\left(\frac{\mathrm{d}\phi}{\mathrm{d}x}\right)^{2} = \frac{4RTc}{\varepsilon}\left[\cosh\!\left(\frac{zF\phi}{RT}\right) - 1\right] = \frac{8RTc}{\varepsilon}\sinh^{2}\!\left(\frac{zF\phi}{2RT}\right).
$$
By Gauss's law the charge per unit area in the diffuse layer equals $\varepsilon(\mathrm{d}\phi/\mathrm{d}x)_{x=0}$, and the electrode charge is its negative: $\sigma_\mathrm{M} = -\varepsilon(\mathrm{d}\phi/\mathrm{d}x)_0$. Taking the root with the sign that makes $\phi$ decay away from the plane gives $\sigma_\mathrm{M} = \sqrt{8\varepsilon RTc}\,\sinh(zF\phi_0/2RT)$. Differentiating with respect to $\phi_0$ gives $C_\mathrm{GC} = \sqrt{8\varepsilon RTc}\,(zF/2RT)\cosh(zF\phi_0/2RT)$, and $\sqrt{8\varepsilon RTc}\,zF/2RT = \sqrt{2\varepsilon z^2F^2c/RT} = \varepsilon/\lambda_\mathrm{D}$. Finally, for small $\phi$, $\sinh u \approx u$ and the Poisson–Boltzmann equation becomes $\phi'' = \phi/\lambda_\mathrm{D}^2$, whose decaying solution is $\phi_0\mathrm{e}^{-x/\lambda_\mathrm{D}}$.
:::

At the potential of zero charge ($\phi_0 = 0$) the diffuse layer behaves like a capacitor whose "plate separation" is the Debye length: $C_\mathrm{GC} = \varepsilon/\lambda_\mathrm{D}$. Away from it the capacitance grows as $\cosh$, because a more strongly charged electrode compresses its counter-ions closer to the surface. In water at $25\,^\circ\mathrm{C}$, for a $1{:}1$ electrolyte with $c$ in $\mathrm{mol\,dm^{-3}}$, these become the practical formulas $\lambda_\mathrm{D} = 0.304\ \mathrm{nm}/\sqrt{c}$ and $C_\mathrm{GC} = 228.5\sqrt{c}\,\cosh(19.46\,\phi_0/\mathrm{V})\ \mu\mathrm{F\,cm^{-2}}$.

::: warning The diffuse-layer potential is not the electrode potential {#warn-phi}
In [[#eq-grahame]], $\phi_0$ is the potential at the plane where the diffuse layer starts, measured relative to the bulk solution. It is not $E$, which is measured against a reference electrode and includes the drop across the compact layer and the (unknown) potentials of the reference interface. Only the *changes* $\mathrm{d}E$ and the drops within the interface add up: $\mathrm{d}E = \mathrm{d}(\phi_\mathrm{M} - \phi_2) + \mathrm{d}\phi_2$, where $\phi_2$ is the potential at the outer Helmholtz plane. A related error is to apply the pure Gouy–Chapman result at large potentials: the $\cosh$ grows exponentially, predicting capacitances of thousands of $\mu\mathrm{F\,cm^{-2}}$ and ion concentrations at the surface far beyond close packing. Point ions cannot be squeezed indefinitely; the finite size of ions is what the Stern model adds.
:::

## The Stern model and the compact layer

Otto Stern (1924) combined the two pictures. Ions cannot approach the electrode more closely than the outer Helmholtz plane, at distance $x_2$; between the metal and that plane is a compact layer with no free charge, and beyond it the diffuse layer begins. The potential falls linearly across the compact layer and then roughly exponentially through the diffuse layer.

::: proposition Stern capacitance {#prop-stern}
In the Stern model the compact (Helmholtz) and diffuse (Gouy–Chapman) layers carry the same charge and are in series, so
$$
\frac{1}{C_\mathrm{d}} = \frac{1}{C_\mathrm{H}} + \frac{1}{C_\mathrm{GC}} ,
$$ {#eq-stern}
where $C_\mathrm{H} = \varepsilon_\mathrm{r}\varepsilon_0/x_2$ is the compact-layer capacitance and $C_\mathrm{GC}$ is evaluated at the diffuse-layer potential $\phi_2$. The smaller of the two capacitances dominates.
:::

::: proof
The potential drop from metal to bulk is the sum of the drop across the compact layer and the drop across the diffuse layer: $\phi_\mathrm{M} - \phi_\mathrm{bulk} = (\phi_\mathrm{M} - \phi_2) + \phi_2$. Because there is no charge in the compact layer, the field in it is uniform and fixed by the metal charge (Gauss), so $\phi_\mathrm{M} - \phi_2 = \sigma_\mathrm{M}/C_\mathrm{H}$. The diffuse layer carries charge $-\sigma_\mathrm{M}$ and has potential $\phi_2$ given by the Grahame equation with $\phi_0 \rightarrow \phi_2$. Differentiating the total drop with respect to $\sigma_\mathrm{M}$:
$$
\frac{1}{C_\mathrm{d}} = \frac{\mathrm{d}(\phi_\mathrm{M} - \phi_\mathrm{bulk})}{\mathrm{d}\sigma_\mathrm{M}} = \frac{1}{C_\mathrm{H}} + \frac{\mathrm{d}\phi_2}{\mathrm{d}\sigma_\mathrm{M}} = \frac{1}{C_\mathrm{H}} + \frac{1}{C_\mathrm{GC}(\phi_2)} .
$$
This is the rule for two capacitors in series, which share one charge.
:::

The model now explains the observations. In concentrated electrolyte ($c \gtrsim 0.1\ \mathrm{mol\,dm^{-3}}$), $C_\mathrm{GC}$ is large everywhere and $C_\mathrm{d} \approx C_\mathrm{H}$: the double layer is essentially compact, almost all the potential drop is within a few ångström of the metal, and the capacitance is that of the inner layer. In dilute electrolyte, $C_\mathrm{GC}$ is small near the pzc and dominates there, producing the capacitance minimum; far from the pzc $C_\mathrm{GC}$ grows as $\cosh$ and $C_\mathrm{H}$ takes over again.

::: example Compact and diffuse layers in series {#ex-stern}
Take $C_\mathrm{H} = 17.7\ \mu\mathrm{F\,cm^{-2}}$ from [[#ex-helmholtz]]. Find $\lambda_\mathrm{D}$ and the total capacitance at the potential of zero charge in aqueous NaF of (a) $0.10$ and (b) $0.0010\ \mathrm{mol\,dm^{-3}}$ at $25\,^\circ\mathrm{C}$. What fraction of the potential drop lies in the diffuse layer in each case?
::: solution
(a) $\lambda_\mathrm{D} = 0.304/\sqrt{0.10}\ \mathrm{nm} = 0.96\ \mathrm{nm}$ and $C_\mathrm{GC} = \varepsilon_\mathrm{r}\varepsilon_0/\lambda_\mathrm{D} = 78.5\times8.854\times10^{-12}/0.962\times10^{-9}\ \mathrm{F\,m^{-2}} = 0.723\ \mathrm{F\,m^{-2}} = 72.3\ \mu\mathrm{F\,cm^{-2}}$. Then
$$
C_\mathrm{d} = \left(\frac{1}{17.7} + \frac{1}{72.3}\right)^{-1}\ \mu\mathrm{F\,cm^{-2}} = 14.2\ \mu\mathrm{F\,cm^{-2}} .
$$
(b) $\lambda_\mathrm{D} = 9.6\ \mathrm{nm}$, $C_\mathrm{GC} = 7.23\ \mu\mathrm{F\,cm^{-2}}$, and $C_\mathrm{d} = (1/17.7 + 1/7.23)^{-1} = 5.13\ \mu\mathrm{F\,cm^{-2}}$.

For capacitors in series carrying the same charge, the potential drops are inversely proportional to the capacitances, so the fraction in the diffuse layer is $C_\mathrm{H}/(C_\mathrm{H} + C_\mathrm{GC})$: $17.7/90.0 = 20\,\%$ in (a) and $17.7/24.9 = 71\,\%$ in (b). Dilute electrolytes put most of the potential drop into the diffuse layer, far from the electrode, where it does not help a reactant at the outer Helmholtz plane to exchange electrons. This is the Frumkin effect on electrode kinetics, and one more reason why voltammetry is done in at least $0.1\ \mathrm{mol\,dm^{-3}}$ of supporting electrolyte.
:::
:::

::: widget plot
f: 1/(1/CH + 1/(228.5*sqrt(c)*cosh(19.46*x))); 228.5*sqrt(c)*cosh(19.46*x); CH + 0*x
x: -0.3, 0.3
y: 0, 40
sliders: c=0.001:0.0001:0.1:0.0001; CH=17.7:5:40:0.1
labels: C_\mathrm{d}\ \text{(Stern)}; C_\mathrm{GC}; C_\mathrm{H}
caption: Differential capacitance in $\mu\mathrm{F\,cm^{-2}}$ against the diffuse-layer potential $\phi_2$ in volts ($x$) for a $1{:}1$ electrolyte in water at $25\,^\circ\mathrm{C}$, from [[#eq-grahame]] and [[#eq-stern]]. The slider $c$ is the concentration in $\mathrm{mol\,dm^{-3}}$ and $C_\mathrm{H}$ the compact-layer capacitance. At $c = 0.001$ the Stern curve has a deep minimum at the potential of zero charge, as Grahame observed on mercury; raise $c$ to $0.1$ and the minimum fills in, the total approaching the flat Helmholtz value. The Gouy–Chapman curve alone rises without limit — the unphysical behaviour that the compact layer cures.
:::

### Specific adsorption and the inner layer

The Stern picture still treats the inner layer as structureless. Real interfaces are subtler. Ions that lose part of their hydration shell — large, polarisable anions such as $\mathrm{I^-}$, $\mathrm{Br^-}$ and $\mathrm{SCN^-}$, and to a lesser extent $\mathrm{Cl^-}$ — can enter the compact layer and bind directly to the metal, a process called **specific adsorption**. Their centres define the **inner Helmholtz plane** (IHP), closer to the metal than the OHP at which hydrated cations stop. Specifically adsorbed anions can even be present on a negatively charged electrode, and they can over-compensate the metal charge so that the diffuse layer carries charge of the *same* sign as the metal. They shift the potential of zero charge negative (by several hundred millivolts for iodide on mercury) and flatten the electrocapillary maximum. Fluoride is the classical "non-adsorbing" anion, which is why NaF is used for double-layer studies.

Neutral organic molecules adsorb too, displacing water near the pzc where the field is weakest, and lowering the capacitance; they are desorbed at large charges of either sign, when water with its large dipole wins the competition for the surface. Corrosion inhibitors and the additives that control electroplating work by this kind of adsorption ([[electrochemistry/corrosion]]). Modern models, from the Bockris–Devanathan–Müller picture of 1963 to molecular simulations and surface-enhanced spectroscopy, treat the inner layer as oriented water molecules and adsorbed ions whose arrangement depends on the metal and its crystal face.

::: quiz
A mercury electrode in $0.001\ \mathrm{mol\,dm^{-3}}$ NaF shows a capacitance minimum of about $6\ \mu\mathrm{F\,cm^{-2}}$ at its potential of zero charge. When the NaF concentration is raised to $0.1\ \mathrm{mol\,dm^{-3}}$, the capacitance at the same potential
- [ ] falls, because more ions screen the field
- [x] rises towards the compact-layer value, because the diffuse layer becomes thinner
- [ ] stays the same, because the Helmholtz capacitance does not depend on concentration
- [ ] becomes negative, because the diffuse layer reverses sign
::: solution
$C_\mathrm{GC}$ at the pzc is $\varepsilon/\lambda_\mathrm{D} \propto \sqrt{c}$, so a hundred-fold increase in concentration raises it ten-fold, from about $7$ to about $72\ \mu\mathrm{F\,cm^{-2}}$. In series with the compact layer, the total rises from about $5$ to about $14\ \mu\mathrm{F\,cm^{-2}}$ and approaches $C_\mathrm{H}$. The Helmholtz capacitance indeed does not change; that is why the *total* approaches it.
:::
:::

## Charging the double layer: currents and time constants

Every potential step or sweep at an electrode must charge the double layer, and the current needed is non-faradaic: no chemical change occurs, but the current flows through the external circuit like any other.

::: definition Charging current {#def-charging}
For an electrode of area $A$ and (approximately constant) double-layer capacitance $C_\mathrm{d}$, the **charging current** needed to change its potential at rate $v = \mathrm{d}E/\mathrm{d}t$ is
$$
i_\mathrm{c} = AC_\mathrm{d}v .
$$
After a potential step $\Delta E$ applied through an uncompensated solution resistance $R_\mathrm{u}$, the charging current decays as $i_\mathrm{c} = (\Delta E/R_\mathrm{u})\exp(-t/\tau)$, with **cell time constant** $\tau = R_\mathrm{u}AC_\mathrm{d}$.
:::

The step response follows from treating the interface as a capacitor $AC_\mathrm{d}$ in series with $R_\mathrm{u}$: Kirchhoff's law gives $\Delta E = iR_\mathrm{u} + q/(AC_\mathrm{d})$, and differentiating, $R_\mathrm{u}\,\mathrm{d}i/\mathrm{d}t = -i/(AC_\mathrm{d})$, an exponential decay with time constant $R_\mathrm{u}AC_\mathrm{d}$ (the same first-order equation as in [[kinetics/rate-laws]]).

::: example The background in a voltammogram {#ex-charging}
A glassy-carbon disc of diameter $3.0\ \mathrm{mm}$ ($A = 0.0707\ \mathrm{cm^2}$) has $C_\mathrm{d} = 20\ \mu\mathrm{F\,cm^{-2}}$ and sits in a solution with $R_\mathrm{u} = 100\ \Omega$. Find the charging current during a sweep at $0.10\ \mathrm{V\,s^{-1}}$, and the cell time constant. Compare with the faradaic current from $1.0\ \mathrm{mmol\,dm^{-3}}$ of a reversible couple, which gives a peak of about $19\ \mu\mathrm{A}$ under these conditions.
::: solution
$$
i_\mathrm{c} = AC_\mathrm{d}v = 0.0707\ \mathrm{cm^2}\times20\times10^{-6}\ \mathrm{F\,cm^{-2}}\times0.10\ \mathrm{V\,s^{-1}} = 1.4\times10^{-7}\ \mathrm{A} = 0.14\ \mu\mathrm{A} .
$$
$\tau = R_\mathrm{u}AC_\mathrm{d} = 100\ \Omega\times1.41\times10^{-6}\ \mathrm{F} = 1.4\times10^{-4}\ \mathrm{s} = 0.14\ \mathrm{ms}$. The charging current is under $1\,\%$ of the faradaic peak here, but the two scale differently: $i_\mathrm{c} \propto vc^0$, while the peak current grows only as $\sqrt{v}$ and is proportional to concentration ([[electrochemistry/voltammetry]]). At $10\ \mu\mathrm{mol\,dm^{-3}}$ analyte, or at $100\ \mathrm{V\,s^{-1}}$, the background is comparable with the signal. The time constant sets the fastest meaningful experiment: nothing that happens in less than a few $\tau$ after a step can be separated from the charging of the interface, which is why fast voltammetry uses microelectrodes, whose small area makes $\tau$ small.
:::
:::

## Supercapacitors and electrokinetics

The double layer stores energy, $\tfrac{1}{2}C_\mathrm{d}E^2$ per unit area, and the **electrochemical double-layer capacitor** (EDLC, "supercapacitor") exploits it with electrodes of activated carbon whose internal surface area reaches $1000$–$2000\ \mathrm{m^2\,g^{-1}}$. A device has two such electrodes in series in an organic electrolyte (commonly tetraethylammonium tetrafluoroborate in acetonitrile) that tolerates about $2.7\ \mathrm{V}$. Because no chemical bonds are broken, charging and discharging take seconds and can be repeated hundreds of thousands of times; the price is low energy density. The first patent on the idea, using porous carbon in aqueous acid, was granted to Howard Becker of General Electric in 1957.

::: example Energy stored in a carbon supercapacitor {#ex-supercap}
Activated carbon of specific area $1500\ \mathrm{m^2\,g^{-1}}$ has an areal double-layer capacitance of $10\ \mu\mathrm{F\,cm^{-2}}$. A symmetric device uses equal masses of it in both electrodes and is charged to $2.7\ \mathrm{V}$. Find the specific capacitance of one electrode, and the energy stored per kilogram of total carbon.
::: solution
One electrode: $1500\ \mathrm{m^2\,g^{-1}}\times10^{4}\ \mathrm{cm^2\,m^{-2}}\times10\times10^{-6}\ \mathrm{F\,cm^{-2}} = 150\ \mathrm{F\,g^{-1}}$. Two equal capacitors in series give half the capacitance, and the total mass is twice that of one electrode, so per gram of total carbon $C = 150/4 = 37.5\ \mathrm{F\,g^{-1}}$. The energy is
$$
\tfrac{1}{2}CV^2 = \tfrac{1}{2}\times37.5\ \mathrm{F\,g^{-1}}\times(2.7\ \mathrm{V})^2 = 137\ \mathrm{J\,g^{-1}} = 38\ \mathrm{Wh\,kg^{-1}}
$$
of carbon. Packaged devices, with electrolyte, current collectors and casing, reach about $5$–$10\ \mathrm{Wh\,kg^{-1}}$ (as of 2026), against roughly $150$–$300\ \mathrm{Wh\,kg^{-1}}$ for lithium-ion cells ([[electrochemistry/batteries]]); but they deliver it in seconds, so they are used for regenerative braking, power smoothing and memory back-up. The factor of four between electrode and device capacitance is a common source of inflated claims.
:::
:::

The diffuse layer also has mechanical consequences. Ions in it can be moved by a field parallel to the surface, dragging solvent with them (**electro-osmosis**), and a charged particle in a field moves with its diffuse layer (**electrophoresis**). Both are governed by the **zeta potential** $\zeta$, the potential at the plane of shear where the liquid starts to move, roughly $\phi_2$. Smoluchowski's result for the electrophoretic mobility of a particle large compared with $\lambda_\mathrm{D}$, $u = \varepsilon\zeta/\eta$, is the basis of capillary electrophoresis and of the zeta-potential measurements used to assess the stability of colloids: overlapping diffuse layers repel, and the balance of this repulsion against van der Waals attraction (the DLVO theory of Derjaguin, Landau, Verwey and Overbeek) decides whether a colloid stays dispersed or flocculates when salt compresses the double layer.

::: history From Helmholtz's capacitor to Grahame's mercury {#hist-double-layer}
Hermann von Helmholtz introduced the idea of an electrical double layer at the boundary of a metal and a conductor in 1853, and applied it to electrolytes in 1879. Gabriel Lippmann's 1875 thesis on the relations between electrical and capillary phenomena gave the capillary electrometer and the equation that bears his name. Louis Georges Gouy (1910) and David Leonard Chapman (1913) independently introduced the diffuse layer by combining Poisson's equation with the Boltzmann distribution, a decade before Debye and Hückel did the same for ions. Otto Stern's 1924 paper combined the compact and diffuse layers and included adsorption. David C. Grahame's review "The electrical double layer and the theory of electrocapillarity" (*Chemical Reviews*, 1947), based on precise capacitance measurements at the dropping mercury electrode, established the inner and outer Helmholtz planes and the modern Gouy–Chapman–Stern–Grahame picture. John Bockris, M. A. V. Devanathan and Klaus Müller added the oriented water layer in 1963.
:::

## Where this leads

The double layer is the stage on which [[electrochemistry/electrode-kinetics]] is played. The potential drop across the compact layer is what changes the activation energy of electron transfer; the fraction of the drop lost in the diffuse layer (the Frumkin correction) changes the apparent rate constants in dilute electrolyte; and the double-layer capacitance appears in parallel with the reaction in every equivalent circuit used in impedance spectroscopy. In [[electrochemistry/voltammetry]] the charging current is the background against which faradaic signals are measured. In [[electrochemistry/batteries]] the line between battery and supercapacitor becomes a spectrum — "pseudocapacitive" materials such as ruthenium oxide store charge by fast surface redox reactions that look capacitive. Adsorption at the inner layer underlies electrocatalysis ([[electrochemistry/fuel-cells-electrolysis]]) and corrosion inhibition ([[electrochemistry/corrosion]]). Outside electrochemistry, the same Poisson–Boltzmann physics governs colloids, clays, membranes and the ionic atmosphere of DNA ([[biochemistry/nucleic-acids]]).

::: summary
- An ideally polarisable electrode behaves as a capacitor: charge $\sigma_\mathrm{M}$ on the metal is balanced by ionic charge in solution, with differential capacitance $C_\mathrm{d} = \partial\sigma_\mathrm{M}/\partial E$ of typically $10$–$40\ \mu\mathrm{F\,cm^{-2}}$.
- The Lippmann equation $(\partial\gamma/\partial E)_\mu = -\sigma_\mathrm{M}$ makes the electrocapillary curve a parabola-like curve with its maximum at the potential of zero charge.
- The Helmholtz model, $C_\mathrm{H} = \varepsilon_\mathrm{r}\varepsilon_0/d$, fits only with the low permittivity ($\approx 6$) of saturated inner-layer water; fields in the layer exceed $10^{9}\ \mathrm{V\,m^{-1}}$.
- Gouy–Chapman theory solves the Poisson–Boltzmann equation for a plane: the diffuse layer has thickness $\lambda_\mathrm{D}$ and $C_\mathrm{GC} = (\varepsilon/\lambda_\mathrm{D})\cosh(zF\phi_0/2RT)$; the Grahame equation gives the charge.
- In the Stern model compact and diffuse capacitances add in series, $1/C_\mathrm{d} = 1/C_\mathrm{H} + 1/C_\mathrm{GC}$, explaining the capacitance minimum at the pzc in dilute solution and its disappearance at high concentration.
- Specifically adsorbed ions and molecules sit in the inner Helmholtz plane and shift the pzc; charging currents $AC_\mathrm{d}v$ and time constants $R_\mathrm{u}AC_\mathrm{d}$ limit voltammetry; supercapacitors store $\tfrac{1}{2}CV^2$ on high-area carbon.
:::

## Exercises

::: exercise A thinner compact layer {level=1 check="35.4"}
Find the Helmholtz capacitance for $d = 0.25\ \mathrm{nm}$ and $\varepsilon_\mathrm{r} = 10$. (Enter $C_\mathrm{H}$ in $\mu\mathrm{F\,cm^{-2}}$.)
::: solution
$C_\mathrm{H} = 10\times8.854\times10^{-12}/0.25\times10^{-9}\ \mathrm{F\,m^{-2}} = 0.354\ \mathrm{F\,m^{-2}} = 35.4\ \mu\mathrm{F\,cm^{-2}}$ (using $1\ \mathrm{F\,m^{-2}} = 100\ \mu\mathrm{F\,cm^{-2}}$). Values of this size are seen on mercury at positive potentials, where anions approach closely and the inner layer is less saturated.
:::
:::

::: exercise Thickness of the diffuse layer {level=1 check="3.04"}
Find the Debye length at $25\,^\circ\mathrm{C}$ in $0.010\ \mathrm{mol\,dm^{-3}}$ aqueous NaF, using $\varepsilon_\mathrm{r} = 78.5$. (Enter $\lambda_\mathrm{D}$ in nm.)
::: solution
$$
\lambda_\mathrm{D} = \sqrt{\frac{\varepsilon_\mathrm{r}\varepsilon_0RT}{2F^2c}} = \sqrt{\frac{78.5\times8.854\times10^{-12}\times8.314\times298.15}{2\times96\,485^2\times10.0}}\ \mathrm{m} = 3.04\times10^{-9}\ \mathrm{m},
$$
with $c = 10.0\ \mathrm{mol\,m^{-3}}$. Equivalently $0.304/\sqrt{0.010}\ \mathrm{nm}$.
:::
:::

::: exercise Charging current at a small electrode {level=1 check="0.393"}
A disc of diameter $2.0\ \mathrm{mm}$ has $C_\mathrm{d} = 25\ \mu\mathrm{F\,cm^{-2}}$. Find the charging current during a sweep at $0.50\ \mathrm{V\,s^{-1}}$. (Enter $i_\mathrm{c}$ in $\mu\mathrm{A}$.)
::: solution
$A = \pi(0.10\ \mathrm{cm})^2 = 0.0314\ \mathrm{cm^2}$; $i_\mathrm{c} = AC_\mathrm{d}v = 0.0314\times25\times10^{-6}\times0.50\ \mathrm{A} = 3.93\times10^{-7}\ \mathrm{A} = 0.393\ \mu\mathrm{A}$. In a cyclic voltammogram the charging current reverses sign with the sweep direction, giving the rectangular "box" that sits under the faradaic peaks.
:::
:::

::: exercise Stern capacitance in dilute electrolyte {level=2 check="10.7"}
With $C_\mathrm{H} = 20\ \mu\mathrm{F\,cm^{-2}}$, find the total capacitance at the potential of zero charge in $0.010\ \mathrm{mol\,dm^{-3}}$ of a $1{:}1$ electrolyte at $25\,^\circ\mathrm{C}$. (Enter $C_\mathrm{d}$ in $\mu\mathrm{F\,cm^{-2}}$.)
::: solution
$C_\mathrm{GC} = 228.5\sqrt{0.010} = 22.85\ \mu\mathrm{F\,cm^{-2}}$ at the pzc, so $C_\mathrm{d} = (1/20 + 1/22.85)^{-1} = 10.7\ \mu\mathrm{F\,cm^{-2}}$. The two layers contribute almost equally at this concentration, and the potential drop is split nearly evenly between them.
:::
:::

::: exercise Charge from an electrocapillary curve {level=2 check="-3.5"}
The surface tension of a mercury electrode is $0.4215\ \mathrm{N\,m^{-1}}$ at $-0.60\ \mathrm{V}$ and $0.4250\ \mathrm{N\,m^{-1}}$ at $-0.50\ \mathrm{V}$ (both against the same reference, composition fixed). Estimate the electrode charge at $-0.55\ \mathrm{V}$ and state on which side of the pzc this potential lies. (Enter $\sigma_\mathrm{M}$ in $\mu\mathrm{C\,cm^{-2}}$.)
::: solution
By the Lippmann equation, $\sigma_\mathrm{M} = -\partial\gamma/\partial E \approx -(0.4250 - 0.4215)/(0.10)\ \mathrm{C\,m^{-2}} = -0.035\ \mathrm{C\,m^{-2}} = -3.5\ \mu\mathrm{C\,cm^{-2}}$. The surface tension rises as the potential is made more positive, so we are on the negative side of the electrocapillary maximum and the electrode carries excess electrons. The central difference is accurate to second order in the interval for a smooth curve.
:::
:::

::: exercise Time constant of a cell {level=2 check="70.7"}
Find the time constant for a $3.0\ \mathrm{mm}$ disc ($A = 0.0707\ \mathrm{cm^2}$, $C_\mathrm{d} = 20\ \mu\mathrm{F\,cm^{-2}}$) with uncompensated resistance $50\ \Omega$, and the time after a potential step for the charging current to fall to $1\,\%$ of its initial value. (Enter $\tau$ in $\mu\mathrm{s}$.)
::: solution
$\tau = R_\mathrm{u}AC_\mathrm{d} = 50\times0.0707\times20\times10^{-6}\ \mathrm{s} = 7.07\times10^{-5}\ \mathrm{s} = 70.7\ \mu\mathrm{s}$. The current falls to $1\,\%$ when $\mathrm{e}^{-t/\tau} = 0.01$, i.e. $t = \tau\ln100 = 4.61\tau = 326\ \mu\mathrm{s}$. Chronoamperometric data earlier than about $0.3\ \mathrm{ms}$ are therefore contaminated by charging.
:::
:::

::: exercise The Grahame equation {level=3 check="4.03"}
Starting from the Poisson–Boltzmann equation, show that the charge in the diffuse layer of a $1{:}1$ electrolyte is $\sigma = \sqrt{8\varepsilon RTc}\,\sinh(F\phi_0/2RT)$, and evaluate it for $\phi_0 = 0.100\ \mathrm{V}$ in $0.010\ \mathrm{mol\,dm^{-3}}$ electrolyte at $25\,^\circ\mathrm{C}$ ($\varepsilon_\mathrm{r} = 78.5$). Compare with the result of the linearised theory. (Enter $\sigma$ in $\mu\mathrm{C\,cm^{-2}}$.)
::: hint
Multiply the Poisson–Boltzmann equation by $2\phi'$ and integrate once from the bulk; then use Gauss's law at the surface.
:::
::: solution
The derivation is that of [[#prop-gouy-chapman]] with $z = 1$. Numerically, with $c = 10.0\ \mathrm{mol\,m^{-3}}$,
$$
\sqrt{8\varepsilon RTc} = \sqrt{8\times78.5\times8.854\times10^{-12}\times8.314\times298.15\times10.0}\ \mathrm{C\,m^{-2}} = 1.174\times10^{-2}\ \mathrm{C\,m^{-2}},
$$
and $F\phi_0/2RT = 0.100\times19.46 = 1.946$, $\sinh 1.946 = 3.43$. So $\sigma = 4.03\times10^{-2}\ \mathrm{C\,m^{-2}} = 4.03\ \mu\mathrm{C\,cm^{-2}}$. The linearised theory gives $\sigma = \varepsilon\phi_0/\lambda_\mathrm{D} = 0.2285\ \mathrm{F\,m^{-2}}\times0.100\ \mathrm{V} = 2.28\ \mu\mathrm{C\,cm^{-2}}$, too small by almost half: at $100\ \mathrm{mV}$, $F\phi_0/RT \approx 3.9$ and the linearisation (which needs it $\ll 1$) has failed. Nonlinear screening is the rule, not the exception, at electrodes.
:::
:::

::: exercise Supercapacitor energy and power {level=3 check="38"}
A symmetric supercapacitor uses carbon with $C = 150\ \mathrm{F\,g^{-1}}$ per electrode (measured in a three-electrode cell) and is charged to $2.7\ \mathrm{V}$. (a) Find the energy stored per kilogram of total carbon. (b) If the carbon accounts for $30\,\%$ of the device mass and the device has an equivalent series resistance such that its maximum power is $P_\mathrm{max} = V^2/4R_\mathrm{s}$, what $R_\mathrm{s}$ (for a device whose total mass is $0.50\ \mathrm{kg}$) gives $P_\mathrm{max}/m = 10\ \mathrm{kW\,kg^{-1}}$? (Enter the energy in (a) in $\mathrm{Wh\,kg^{-1}}$.)
::: solution
(a) Per gram of total carbon the device capacitance is $150/4 = 37.5\ \mathrm{F\,g^{-1}}$ (series combination halves it, doubling the mass halves it again). $\tfrac{1}{2}CV^2 = \tfrac{1}{2}\times37.5\times2.7^2 = 137\ \mathrm{J\,g^{-1}} = 137\ \mathrm{kJ\,kg^{-1}} = 38\ \mathrm{Wh\,kg^{-1}}$. (b) Per kilogram of device the energy is $0.30\times38 = 11\ \mathrm{Wh\,kg^{-1}}$. For $P_\mathrm{max} = 10\ \mathrm{kW\,kg^{-1}}\times0.50\ \mathrm{kg} = 5.0\ \mathrm{kW}$, $R_\mathrm{s} = V^2/4P_\mathrm{max} = 7.29/20\,000\ \Omega = 0.36\ \mathrm{m\Omega}$. The energy would be delivered at full power in about $11\ \mathrm{Wh\,kg^{-1}}/10\ \mathrm{kW\,kg^{-1}} \approx 4\ \mathrm{s}$ — the signature of a capacitor rather than a battery.
:::
:::
