The thermodynamics of [[electrochemistry/cell-thermodynamics]] was done at zero current. The moment a cell delivers current, charge must cross the electrolyte between the electrodes, and in an electrolyte the carriers are not electrons but ions — heavy, hydrated, jostled by solvent molecules and by each other. A solution of $0.1\ \mathrm{mol\,dm^{-3}}$ potassium chloride conducts about a million times worse than copper, and the ions drift through it at a few micrometres per second in a field of a volt per centimetre. Yet the conductivity of a solution is easy to measure to a part in ten thousand, and from it we can read the number of ions present, how fast each kind moves, how big it appears to be as it pushes through the water, how much of the current each carries, and — for a weak acid — its dissociation constant.

This chapter develops that toolkit. We define conductivity and molar conductivity, meet Kohlrausch's two empirical laws for strong electrolytes and Ostwald's law for weak ones, relate conductivity to ionic mobility and the diffusion coefficient, introduce transport numbers and use them to compute liquid-junction potentials, and finish with ion conduction in solids, which is what makes solid-oxide fuel cells, sodium–sulfur batteries and solid-state lithium batteries possible. Data for limiting ionic conductivities are from the CRC *Handbook of Chemistry and Physics* at $25\,^\circ\mathrm{C}$.

## Conductance and conductivity

Ohm's law $V = IR$ holds well for electrolytes, provided the measurement avoids changing the solution. A direct current would electrolyse it and polarise the electrodes, so conductivity cells are measured with an alternating voltage (typically $1$–$10\ \mathrm{kHz}$) between platinised platinum electrodes, whose large surface area keeps the double-layer impedance ([[electrochemistry/double-layer]]) negligible.

::: definition Conductivity and molar conductivity {#def-conductivity}
The **conductance** of a sample is $G = 1/R$, in siemens ($1\ \mathrm{S} = 1\ \Omega^{-1}$). For a uniform conductor of length $l$ and cross-section $A$, $G = \kappa A/l$, which defines the **conductivity** $\kappa$ (IUPAC symbol also $\sigma$), in $\mathrm{S\,m^{-1}}$. In a real cell the geometry is summarised by the **cell constant** $C_\mathrm{cell} = l/A$, found by calibration with a standard solution, so that $\kappa = C_\mathrm{cell}/R$. The **molar conductivity** of an electrolyte at amount concentration $c$ is
$$
\Lambda_\mathrm{m} = \frac{\kappa}{c},
$$ {#eq-lambda}
in $\mathrm{S\,m^2\,mol^{-1}}$, with $c$ in $\mathrm{mol\,m^{-3}}$. It is the conductivity per unit concentration of electrolyte and would be independent of $c$ if ions moved independently and the electrolyte were fully dissociated.
:::

The standard for calibration is aqueous potassium chloride: at $25\,^\circ\mathrm{C}$, $0.0100\ \mathrm{mol\,dm^{-3}}$ KCl has $\kappa = 0.1412\ \mathrm{S\,m^{-1}}$ ($1412\ \mu\mathrm{S\,cm^{-1}}$). Pure water, by contrast, has $\kappa = 5.5\ \mu\mathrm{S\,m^{-1}}$, from its $10^{-7}\ \mathrm{mol\,dm^{-3}}$ of $\mathrm{H^+}$ and $\mathrm{OH^-}$; a reading of $\kappa$ is therefore the standard quick test of water purity in laboratories and power stations.

::: example Calibrating a conductivity cell {#ex-cell-constant}
A cell filled with $0.0100\ \mathrm{mol\,dm^{-3}}$ KCl at $25\,^\circ\mathrm{C}$ has a resistance of $452\ \Omega$. Filled with $0.0100\ \mathrm{mol\,dm^{-3}}$ acetic acid it has $3.92\ \mathrm{k\Omega}$. Find the cell constant, and the conductivity and molar conductivity of the acid.
::: solution
$C_\mathrm{cell} = \kappa R = 0.1412\ \mathrm{S\,m^{-1}}\times452\ \Omega = 63.8\ \mathrm{m^{-1}}$. For the acid, $\kappa = C_\mathrm{cell}/R = 63.8\ \mathrm{m^{-1}}/3920\ \Omega = 0.0163\ \mathrm{S\,m^{-1}}$. With $c = 0.0100\ \mathrm{mol\,dm^{-3}} = 10.0\ \mathrm{mol\,m^{-3}}$,
$$
\Lambda_\mathrm{m} = \frac{0.0163\ \mathrm{S\,m^{-1}}}{10.0\ \mathrm{mol\,m^{-3}}} = 1.63\times10^{-3}\ \mathrm{S\,m^2\,mol^{-1}} = 1.63\ \mathrm{mS\,m^2\,mol^{-1}} .
$$
For comparison, $0.0100\ \mathrm{mol\,dm^{-3}}$ KCl has $\Lambda_\mathrm{m} = 0.1412/10.0 = 14.1\ \mathrm{mS\,m^2\,mol^{-1}}$. Per mole of solute, the acid conducts nine times worse: most of it is not ionised. (Older tables use $\mathrm{S\,cm^2\,mol^{-1}}$; $1\ \mathrm{mS\,m^2\,mol^{-1}} = 10\ \mathrm{S\,cm^2\,mol^{-1}}$.)
:::
:::

::: warning Concentration units in $\Lambda_\mathrm{m} = \kappa/c$ {#warn-units}
With $\kappa$ in $\mathrm{S\,m^{-1}}$, $c$ must be in $\mathrm{mol\,m^{-3}}$, and $1\ \mathrm{mol\,dm^{-3}} = 1000\ \mathrm{mol\,m^{-3}}$. Using $c$ in $\mathrm{mol\,dm^{-3}}$ gives a molar conductivity a thousand times too large — "14 S m² mol⁻¹" for KCl, which would be a conductivity better than many metals. A second trap is the electrolyte "formula unit": tables sometimes list $\Lambda_\mathrm{m}(\tfrac{1}{2}\mathrm{CaCl_2})$ or $\lambda(\tfrac{1}{2}\mathrm{Ca^{2+}})$, per mole of *charge*, rather than per mole of $\mathrm{CaCl_2}$; the two differ by a factor of two. Always check which entity the "mole" counts.
:::

## Strong electrolytes: Kohlrausch's laws

In the 1870s Friedrich Kohlrausch measured the conductivities of hundreds of salt solutions with alternating current and found two regularities. Both are empirical laws; the second was explained by theory half a century later.

::: proposition Kohlrausch's laws {#prop-kohlrausch}
(1) **Square-root law.** For strong electrolytes at low concentration (below about $0.01\ \mathrm{mol\,dm^{-3}}$ for $1{:}1$ salts),
$$
\Lambda_\mathrm{m} = \Lambda_\mathrm{m}^\circ - \mathcal{K}\sqrt{c},
$$ {#eq-sqrt}
where $\Lambda_\mathrm{m}^\circ$ is the **limiting molar conductivity** and $\mathcal{K}$ depends mainly on the charge type of the electrolyte.

(2) **Law of independent migration.** At infinite dilution each ion contributes a fixed amount $\lambda_i$, its **limiting molar ionic conductivity**, independent of the counter-ion:
$$
\Lambda_\mathrm{m}^\circ = \nu_+\lambda_+ + \nu_-\lambda_- .
$$ {#eq-independent}
:::

::: proof
Both laws were found by experiment, so what can be proved is their consistency and, for (1), the theory behind it. For (2): at infinite dilution the ions are far apart and each moves only under the applied field and the friction of the solvent, so the current carried by each kind is proportional to its own concentration and mobility, and the contributions add. Consistency is then testable: the differences $\Lambda_\mathrm{m}^\circ(\mathrm{KCl}) - \Lambda_\mathrm{m}^\circ(\mathrm{NaCl})$ and $\Lambda_\mathrm{m}^\circ(\mathrm{KNO_3}) - \Lambda_\mathrm{m}^\circ(\mathrm{NaNO_3})$ must be equal (both $\lambda_{\mathrm{K^+}} - \lambda_{\mathrm{Na^+}} = 2.34\ \mathrm{mS\,m^2\,mol^{-1}}$), which Kohlrausch verified for many pairs.

For (1), Debye, Hückel and Onsager (1923–1927) showed that the ionic atmosphere of [[thermodynamics/ions-in-solution]] slows an ion in two ways. The *relaxation effect*: a moving ion leaves its atmosphere slightly behind, and the displaced counter-charge pulls it back. The *electrophoretic effect*: the atmosphere, carrying opposite charge, is driven the other way by the field and drags solvent with it, so the central ion swims against a current. Both corrections are proportional to the inverse Debye length, hence to $\sqrt{I}$, hence to $\sqrt{c}$ for a single salt. For a $1{:}1$ electrolyte in water at $25\,^\circ\mathrm{C}$ the result is
$$
\mathcal{K} = A + B\Lambda_\mathrm{m}^\circ, \qquad A = 6.020\ \mathrm{mS\,m^2\,mol^{-1}}\,(\mathrm{mol\,dm^{-3}})^{-1/2}, \quad B = 0.229\ (\mathrm{mol\,dm^{-3}})^{-1/2},
$$
the electrophoretic term $A$ and the relaxation term $B\Lambda_\mathrm{m}^\circ$ (which scales with $\Lambda_\mathrm{m}^\circ$ because the ion's own speed sets the distortion of its atmosphere). Like the Debye–Hückel limiting law, this Debye–Hückel–Onsager equation is exact as $c \rightarrow 0$ and fails at moderate concentration.
:::

| ion | $\lambda/(\mathrm{mS\,m^2\,mol^{-1}})$ | ion | $\lambda/(\mathrm{mS\,m^2\,mol^{-1}})$ |
|---|---|---|---|
| $\mathrm{H^+}$ | $34.96$ | $\mathrm{OH^-}$ | $19.8$ |
| $\mathrm{Li^+}$ | $3.87$ | $\mathrm{Cl^-}$ | $7.63$ |
| $\mathrm{Na^+}$ | $5.01$ | $\mathrm{NO_3^-}$ | $7.14$ |
| $\mathrm{K^+}$ | $7.35$ | $\mathrm{CH_3CO_2^-}$ | $4.09$ |
| $\mathrm{Ag^+}$ | $6.19$ | $\mathrm{SO_4^{2-}}$ | $16.0$ |
| $\mathrm{Ca^{2+}}$ | $11.9$ | $\mathrm{Mg^{2+}}$ | $10.6$ |

*Limiting molar ionic conductivities in water at $25\,^\circ\mathrm{C}$ (CRC Handbook; values per mole of ion, so $\lambda(\mathrm{Ca^{2+}}) = 2\lambda(\tfrac{1}{2}\mathrm{Ca^{2+}})$).*

The table rewards a second look. Lithium, the smallest alkali cation, is the *slowest*; and $\mathrm{H^+}$ and $\mathrm{OH^-}$ are anomalously fast, by factors of five and three over other ions. We shall return to both after connecting $\lambda$ to the speed of an ion.

For KCl the Onsager theory predicts $\mathcal{K} = 6.020 + 0.229\times14.98 = 9.45\ \mathrm{mS\,m^2\,mol^{-1}}(\mathrm{mol\,dm^{-3}})^{-1/2}$, so at $c = 0.0010\ \mathrm{mol\,dm^{-3}}$, $\Lambda_\mathrm{m} = 14.98 - 9.45\times0.0316 = 14.68\ \mathrm{mS\,m^2\,mol^{-1}}$; the measured value is $14.70$.

## Weak electrolytes: Ostwald's dilution law

A weak acid such as acetic acid behaves completely differently: its molar conductivity rises steeply on dilution, not because its ions move faster but because more of the acid ionises. If a fraction $\alpha$ is ionised, only the ions conduct, and at the low ionic concentrations involved they move nearly as at infinite dilution, so $\Lambda_\mathrm{m} \approx \alpha\Lambda_\mathrm{m}^\circ$ — Arrhenius's 1887 hypothesis, on which his whole theory of ionic dissociation was founded.

::: proposition Ostwald's dilution law {#prop-ostwald}
For a weak $1{:}1$ electrolyte $\mathrm{HA \rightleftharpoons H^+ + A^-}$ at concentration $c$, with degree of ionisation $\alpha = \Lambda_\mathrm{m}/\Lambda_\mathrm{m}^\circ$ and activity coefficients set to one,
$$
K_\mathrm{a} = \frac{c\,\alpha^{2}}{c^\circ(1-\alpha)}, \qquad\text{equivalently}\qquad \frac{1}{\Lambda_\mathrm{m}} = \frac{1}{\Lambda_\mathrm{m}^\circ} + \frac{c\,\Lambda_\mathrm{m}}{c^\circ K_\mathrm{a}(\Lambda_\mathrm{m}^\circ)^{2}} .
$$ {#eq-ostwald}
A plot of $1/\Lambda_\mathrm{m}$ against $c\Lambda_\mathrm{m}$ is a straight line with intercept $1/\Lambda_\mathrm{m}^\circ$ and slope $1/(c^\circ K_\mathrm{a}\Lambda_\mathrm{m}^{\circ2})$.
:::

::: proof
At equilibrium $[\mathrm{H^+}] = [\mathrm{A^-}] = \alpha c$ and $[\mathrm{HA}] = (1-\alpha)c$, so $K_\mathrm{a} = (\alpha c)^2/[(1-\alpha)c\,c^\circ] = c\alpha^2/[c^\circ(1-\alpha)]$. Substituting $\alpha = \Lambda_\mathrm{m}/\Lambda_\mathrm{m}^\circ$ and multiplying out: $c^\circ K_\mathrm{a}(1 - \Lambda_\mathrm{m}/\Lambda_\mathrm{m}^\circ) = c\Lambda_\mathrm{m}^2/\Lambda_\mathrm{m}^{\circ2}$. Divide both sides by $c^\circ K_\mathrm{a}\Lambda_\mathrm{m}$: $1/\Lambda_\mathrm{m} - 1/\Lambda_\mathrm{m}^\circ = c\Lambda_\mathrm{m}/(c^\circ K_\mathrm{a}\Lambda_\mathrm{m}^{\circ2})$, which rearranges to the linear form. The two approximations are that the ions move at their limiting speeds (good when $\alpha c$ is small) and that activity coefficients are unity (good to a few per cent below $\alpha c \approx 10^{-3}\ \mathrm{mol\,dm^{-3}}$; careful work corrects both).
:::

$\Lambda_\mathrm{m}^\circ$ for a weak acid cannot be found by extrapolation, because the curve rises ever more steeply towards $c = 0$. Kohlrausch's second law supplies it from strong electrolytes: $\Lambda_\mathrm{m}^\circ(\mathrm{CH_3CO_2H}) = \Lambda_\mathrm{m}^\circ(\mathrm{HCl}) + \Lambda_\mathrm{m}^\circ(\mathrm{CH_3CO_2Na}) - \Lambda_\mathrm{m}^\circ(\mathrm{NaCl}) = \lambda_{\mathrm{H^+}} + \lambda_{\mathrm{CH_3CO_2^-}} = 39.05\ \mathrm{mS\,m^2\,mol^{-1}}$.

::: example The dissociation constant of acetic acid {#ex-acetic}
Using the molar conductivity found in [[#ex-cell-constant]], $\Lambda_\mathrm{m} = 1.63\ \mathrm{mS\,m^2\,mol^{-1}}$ at $c = 0.0100\ \mathrm{mol\,dm^{-3}}$, estimate $\alpha$, $K_\mathrm{a}$ and the pH.
::: solution
$\alpha = 1.63/39.05 = 0.0417$. Then
$$
K_\mathrm{a} = \frac{0.0100\times(0.0417)^{2}}{1 - 0.0417} = 1.82\times10^{-5}, \qquad [\mathrm{H^+}] = \alpha c = 4.17\times10^{-4}\ \mathrm{mol\,dm^{-3}}, \quad \mathrm{pH} \approx 3.38 .
$$
The thermodynamic value is $K_\mathrm{a} = 1.75\times10^{-5}$ ($\mathrm{p}K_\mathrm{a} = 4.756$). The $4\,\%$ excess is mostly the neglected activity coefficients: at an ionic strength of $4\times10^{-4}$, $\gamma_\pm^2 \approx 0.95$, and multiplying by it brings the estimate to $1.73\times10^{-5}$. MacInnes and Shedlovsky's 1932 conductance study of acetic acid, with both corrections made, gave $K_\mathrm{a} = 1.753\times10^{-5}$, one of the classic precision results of solution chemistry.
:::
:::

::: widget plot
f: 149.8 - 94.5*x; L0*(-K*1e-5 + sqrt(K^2*1e-10 + 4*K*1e-5*x^2))/(2*x^2)
x: 0.005, 0.32
y: 0, 400
sliders: K=1.75:0.1:20:0.05; L0=390.5:100:450:0.5
labels: \mathrm{KCl}\ (\text{strong}); \text{weak acid HA}
caption: Molar conductivity $\Lambda_\mathrm{m}$ in $\mathrm{S\,cm^2\,mol^{-1}}$ (multiply by $0.1$ for $\mathrm{mS\,m^2\,mol^{-1}}$) against $\sqrt{c}$, with $c$ in $\mathrm{mol\,dm^{-3}}$. The strong electrolyte follows Kohlrausch's straight line [[#eq-sqrt]] (here the Onsager slope for KCl). The weak acid follows Ostwald's law [[#eq-ostwald]], with $K$ the acid constant in units of $10^{-5}$ and $L_0$ its limiting molar conductivity (acetic acid by default): its conductivity collapses as soon as the concentration rises, and shoots up towards $\Lambda_\mathrm{m}^\circ$ only at concentrations too low to measure. Raise $K$ and the weak acid looks more and more like a strong one.
:::

## Ionic mobility and the size of a moving ion

::: definition Ionic mobility {#def-mobility}
In an electric field of strength $\mathcal{E}$ an ion reaches, within picoseconds, a constant **drift speed** $s$ at which the electrical force $z e\mathcal{E}$ is balanced by viscous friction. The **mobility** is $u = s/\mathcal{E}$, in $\mathrm{m^2\,V^{-1}\,s^{-1}}$. If the friction obeys Stokes's law for a sphere of hydrodynamic radius $a$ in a solvent of viscosity $\eta$, then $ze\mathcal{E} = 6\pi\eta a s$ and
$$
u = \frac{ze}{6\pi\eta a} .
$$ {#eq-stokes}
:::

::: proposition Molar ionic conductivity, mobility and diffusion {#prop-mobility}
For an ion of charge number $z$ (taken positive here, $|z|$ in general) and mobility $u$,
$$
\lambda = zuF ,
$$ {#eq-lambda-u}
and its diffusion coefficient $D$ satisfies the **Nernst–Einstein relation**
$$
D = \frac{uRT}{zF}, \qquad\text{so that}\qquad \lambda = \frac{z^{2}F^{2}D}{RT} .
$$ {#eq-nernst-einstein}
Both hold in the limit of infinite dilution, where the ions move independently.
:::

::: proof
*Conductivity.* Consider ions of concentration $c_i$ (in $\mathrm{mol\,m^{-3}}$) drifting at speed $s_i = u_i\mathcal{E}$. In time $\Delta t$ those within a distance $s_i\Delta t$ of a plane of area $A$ cross it, carrying charge $z_iF\,c_i\,s_i\Delta t\,A$. The current density from species $i$ is $j_i = z_iFc_iu_i\mathcal{E}$, and Ohm's law $j = \kappa\mathcal{E}$ gives $\kappa = \sum_i z_iFc_iu_i$. For a salt at concentration $c$, $c_\pm = \nu_\pm c$, so $\Lambda_\mathrm{m} = \kappa/c = \nu_+z_+u_+F + \nu_-|z_-|u_-F$; comparing with [[#eq-independent]] identifies $\lambda_i = |z_i|u_iF$.

*Diffusion.* Imagine an ion in equilibrium in a potential $\phi(x)$. Equilibrium means the electrochemical potential $\mu + zF\phi$ is uniform ([[electrochemistry/cell-thermodynamics#def-echem-potential]]), so with $\mu = \mu^\circ + RT\ln c$ the concentration follows the Boltzmann law $c \propto \exp(-zF\phi/RT)$, and $\mathrm{d}c/\mathrm{d}x = -(zF/RT)c\,\mathrm{d}\phi/\mathrm{d}x = (zF/RT)c\mathcal{E}$. The field drives a drift flux $J_\mathrm{drift} = c\,u\mathcal{E}$ in the $+x$ direction, and the concentration gradient a diffusive flux $J_\mathrm{diff} = -D\,\mathrm{d}c/\mathrm{d}x = -D(zF/RT)c\mathcal{E}$ (Fick's first law). At equilibrium the net flux is zero, so $u = DzF/RT$. Substituting into $\lambda = zuF$ gives the second form. This is Einstein's 1905 argument: the same friction that limits drift limits diffusion.
:::

::: example How fast, and how large, is a sodium ion? {#ex-mobility}
From $\lambda(\mathrm{Na^+}) = 5.01\ \mathrm{mS\,m^2\,mol^{-1}}$, find the mobility of $\mathrm{Na^+}$ in water at $25\,^\circ\mathrm{C}$, its drift speed in a field of $100\ \mathrm{V\,m^{-1}}$, its hydrodynamic radius ($\eta = 0.890\ \mathrm{mPa\,s}$) and its diffusion coefficient.
::: solution
$$
u = \frac{\lambda}{zF} = \frac{5.01\times10^{-3}\ \mathrm{S\,m^2\,mol^{-1}}}{96\,485\ \mathrm{C\,mol^{-1}}} = 5.19\times10^{-8}\ \mathrm{m^2\,V^{-1}\,s^{-1}}
$$
(using $\mathrm{S} = \mathrm{A\,V^{-1}} = \mathrm{C\,s^{-1}\,V^{-1}}$). In $100\ \mathrm{V\,m^{-1}}$ (one volt per centimetre) it drifts at $s = 5.19\ \mu\mathrm{m\,s^{-1}}$ — about $2\ \mathrm{cm}$ an hour. From [[#eq-stokes]],
$$
a = \frac{e}{6\pi\eta u} = \frac{1.602\times10^{-19}\ \mathrm{C}}{6\pi\times8.90\times10^{-4}\ \mathrm{Pa\,s}\times5.19\times10^{-8}\ \mathrm{m^2\,V^{-1}\,s^{-1}}} = 1.84\times10^{-10}\ \mathrm{m} = 184\ \mathrm{pm} .
$$
The ionic radius of $\mathrm{Na^+}$ in crystals is $102\ \mathrm{pm}$; the moving entity is larger because it carries its first hydration shell with it. Finally, $D = uRT/F = 5.19\times10^{-8}\times0.025693\ \mathrm{m^2\,s^{-1}} = 1.33\times10^{-9}\ \mathrm{m^2\,s^{-1}}$, in agreement with tracer-diffusion measurements ($1.334\times10^{-9}$).
:::
:::

The same calculation for $\mathrm{Li^+}$ gives $a = 238\ \mathrm{pm}$ although its crystal radius is only $76\ \mathrm{pm}$: the smaller the bare ion, the stronger its field, the more tightly bound and the larger its hydration sheath. Applying Stokes's law to $\mathrm{H^+}$ gives the absurd radius of $26\ \mathrm{pm}$. The proton does not move as a particle at all. In the **Grotthuss mechanism** a proton hops from an $\mathrm{H_3O^+}$ ion to a neighbouring water molecule along a hydrogen bond, and the positive charge — though no individual proton — moves rapidly through the hydrogen-bonded network as bonds rearrange, the rate-limiting step being the reorientation of water molecules in the second solvation shell. $\mathrm{OH^-}$ moves by the mirror-image process, a proton hopping *to* it from a water molecule. This structural diffusion is why acids and bases conduct so well, and why proton-exchange membranes in fuel cells need water ([[electrochemistry/fuel-cells-electrolysis]]).

## Transport numbers

::: definition Transport number {#def-transport}
The **transport number** $t_i$ of an ion is the fraction of the total current it carries. For a single electrolyte at infinite dilution,
$$
t_\pm = \frac{\nu_\pm\lambda_\pm}{\Lambda_\mathrm{m}^\circ} = \frac{\nu_\pm|z_\pm|u_\pm}{\nu_+z_+u_+ + \nu_-|z_-|u_-}, \qquad t_+ + t_- = 1 .
$$
:::

For KCl, $t_+ = 7.35/14.98 = 0.491$: potassium and chloride carry the current almost equally. For HCl, $t_+ = 34.96/42.59 = 0.821$. Transport numbers are measured directly by Hittorf's method — electrolyse, then analyse the composition change in the compartments around each electrode, which differs because each ion carries only its share of the current — or by the moving-boundary method, timing the drift of a sharp boundary between two electrolytes sharing a common ion. Either way, together with $\Lambda_\mathrm{m}$ they give individual ionic conductivities, which is how the table above was constructed.

The bookkeeping of Hittorf's method is worth doing once, because the same accounting reappears in the concentration polarisation of batteries. Take silver electrodes in silver nitrate solution, and pass one faraday. At the anode one mole of silver dissolves as $\mathrm{Ag^+}$; at the cathode one mole is deposited. Through the solution, the current is carried by $t_+$ mol of $\mathrm{Ag^+}$ moving towards the cathode and $t_-$ mol of $\mathrm{NO_3^-}$ moving towards the anode. The anode compartment therefore gains $1 - t_+ = t_-$ mol of $\mathrm{Ag^+}$ and $t_-$ mol of $\mathrm{NO_3^-}$ — a net gain of $t_-$ mol of salt — and the cathode compartment loses the same amount. The middle compartment is unchanged, which is the experimental check that no mixing has occurred.

::: example Transport numbers by Hittorf's method {#ex-hittorf}
A Hittorf cell with silver electrodes contains aqueous $\mathrm{AgNO_3}$. A silver coulometer in series shows that $108.0\ \mathrm{mg}$ of silver was deposited. Analysis afterwards shows that the anode compartment gained $0.536\ \mathrm{mmol}$ of $\mathrm{AgNO_3}$. Find $t_+$ and $t_-$, and compare with the values from limiting ionic conductivities.
::: solution
Charge passed: $108.0\ \mathrm{mg}/107.87\ \mathrm{g\,mol^{-1}} = 1.001\ \mathrm{mmol}$ of electrons. The gain of salt in the anode compartment is $t_-$ times the amount of charge, so $t_- = 0.536/1.001 = 0.535$ and $t_+ = 0.465$. From the table, $t_+ = 6.19/(6.19 + 7.14) = 0.464$. The agreement is good because transport numbers vary only slowly with concentration for a $1{:}1$ salt whose ions have similar mobilities. Notice what the experiment needs: a coulometer to count the faradays, and an analysis precise enough to see a change of half a millimole in a compartment that may hold several millimoles — the reason Hittorf's numbers took years to obtain.
:::
:::

Transport numbers decide the potential that appears wherever two different electrolyte solutions meet.

::: proposition Liquid-junction potential for a $1{:}1$ electrolyte {#prop-junction}
At a junction between solutions of the same $1{:}1$ electrolyte at mean activities $a_\mathrm{L}$ (left) and $a_\mathrm{R}$ (right), with transport numbers taken as constant across the junction,
$$
E_\mathrm{j} = \phi_\mathrm{R} - \phi_\mathrm{L} = (t_+ - t_-)\frac{RT}{F}\ln\frac{a_\mathrm{L}}{a_\mathrm{R}} .
$$ {#eq-junction}
:::

::: proof
Pass one faraday of positive charge from left to right through the junction, reversibly. Of the charge, a fraction $t_+$ is carried by $t_+$ moles of cation moving from L to R, and $t_-$ by $t_-$ moles of anion moving from R to L. The Gibbs energy change of this transfer is
$$
\Delta G = t_+RT\ln\frac{a_\mathrm{R}}{a_\mathrm{L}} + t_-RT\ln\frac{a_\mathrm{L}}{a_\mathrm{R}} = (t_+ - t_-)RT\ln\frac{a_\mathrm{R}}{a_\mathrm{L}},
$$
taking single-ion activities equal to the mean activity (a convention needed to give the junction potential a definite value). The electrical Gibbs energy of moving charge $F$ from potential $\phi_\mathrm{L}$ to $\phi_\mathrm{R}$ is $F(\phi_\mathrm{R} - \phi_\mathrm{L}) = FE_\mathrm{j}$. The junction is in a steady state, not true equilibrium, but treating the transfer as reversible (the assumption of non-equilibrium thermodynamics for small fluxes) sets the total to zero: $FE_\mathrm{j} + \Delta G = 0$, which rearranges to [[#eq-junction]].
:::

::: example Junction potentials of acid and salt {#ex-junction}
Estimate $E_\mathrm{j}$ at $25\,^\circ\mathrm{C}$ for (a) $0.100\ \mathrm{mol\,dm^{-3}}$ HCl in contact with $0.0100\ \mathrm{mol\,dm^{-3}}$ HCl, (b) the same concentrations of KCl. Use concentrations for activities.
::: solution
(a) $t_+ = 0.821$, $t_- = 0.179$, $t_+ - t_- = 0.642$:
$$
E_\mathrm{j} = 0.642\times0.025693\ \mathrm{V}\times\ln 10 = 0.642\times59.16\ \mathrm{mV} = 38.0\ \mathrm{mV},
$$
positive on the dilute side, because the fast protons outrun the chloride into the dilute solution. (With mean activities $0.0796$ and $0.00904$ the estimate becomes $35.9\ \mathrm{mV}$.) (b) $t_+ - t_- = 0.491 - 0.509 = -0.019$, so $E_\mathrm{j} = -0.019\times59.16\ \mathrm{mV} = -1.1\ \mathrm{mV}$. Thirty-five times smaller: this is the reason for the potassium chloride salt bridge. In a bridge of saturated KCl ($4.2\ \mathrm{mol\,dm^{-3}}$) between two dilute solutions, K⁺ and Cl⁻ carry nearly all the current across each junction, and since their transport numbers are nearly equal, the two junction potentials are small — typically $1$–$3\ \mathrm{mV}$, a residual that limits the accuracy of every pH measurement ([[analytical-chemistry/electroanalytical]]).
:::
:::

::: quiz
Which of these solutions, all at $0.010\ \mathrm{mol\,dm^{-3}}$ and $25\,^\circ\mathrm{C}$, has the highest conductivity?
- [ ] $\mathrm{KCl}$
- [ ] $\mathrm{NaCH_3CO_2}$
- [x] $\mathrm{HCl}$
- [ ] $\mathrm{CH_3CO_2H}$
::: solution
All except acetic acid are strong electrolytes, so their conductivities are close to $c\Lambda_\mathrm{m}^\circ$: about $42.6$ (HCl), $15.0$ (KCl) and $9.1$ (sodium acetate) $\mathrm{mS\,m^2\,mol^{-1}}$ times $c$. The Grotthuss conduction of $\mathrm{H^+}$ makes HCl almost three times better than KCl. Acetic acid, although it contains the same fast proton, is only $4\,\%$ ionised and is the worst of the four.
:::
:::

**Conductometric titrations** use these contrasts. Titrate HCl with NaOH and the conductivity falls steeply as fast $\mathrm{H^+}$ is replaced by slow $\mathrm{Na^+}$, reaches a minimum at the equivalence point, then rises again as excess $\mathrm{OH^-}$ appears; the endpoint is the intersection of two straight lines and needs no indicator, which is useful for coloured or very dilute solutions.

## Ion conduction in solids

Solids can conduct ions too, and some do so as well as liquid electrolytes. In an ionic crystal an ion moves by hopping into a neighbouring vacancy or interstitial site over an energy barrier, so the conductivity is thermally activated.

::: definition Solid electrolyte and its activated conductivity {#def-solid}
A **solid electrolyte** (fast-ion conductor) is a solid in which one kind of ion is mobile and electrons are not, with ionic conductivity typically above $10^{-2}\ \mathrm{S\,m^{-1}}$ at its working temperature. Its conductivity commonly follows the empirical law
$$
\kappa T = \kappa_0\exp\!\left(-\frac{E_\mathrm{a}}{RT}\right),
$$ {#eq-solid}
where $E_\mathrm{a}$ is the activation energy for ion hopping (plus, in intrinsic conductors, half the energy of forming the defects) and the factor $T$ comes from the Nernst–Einstein relation, which makes $\kappa \propto D/T$.
:::

The examples that matter technologically:

- **Yttria-stabilised zirconia (YSZ)**, $\mathrm{ZrO_2}$ doped with about $8$ mol % $\mathrm{Y_2O_3}$. Each pair of $\mathrm{Y^{3+}}$ ions replacing $\mathrm{Zr^{4+}}$ creates one oxide-ion vacancy, and $\mathrm{O^{2-}}$ hops through the vacancies. YSZ reaches about $10\ \mathrm{S\,m^{-1}}$ near $1000\,^\circ\mathrm{C}$ and is the electrolyte of solid-oxide fuel cells and of the oxygen ("lambda") sensors in car exhausts, which are concentration cells for $\mathrm{O_2}$. Nernst's electric lamp of 1897, a glowing rod of zirconia doped with yttria, was the first device to use it.
- **Sodium β-alumina**, $\mathrm{NaAl_{11}O_{17}}$ with non-stoichiometric variants, in which $\mathrm{Na^+}$ ions move in loosely packed planes between spinel blocks; its fast $\mathrm{Na^+}$ conduction was reported by Yao and Kummer in 1967 and is the basis of sodium–sulfur batteries operating near $300\,^\circ\mathrm{C}$.
- **Lithium conductors** for solid-state batteries: garnets such as $\mathrm{Li_7La_3Zr_2O_{12}}$ (around $10^{-2}\ \mathrm{S\,m^{-1}}$ at room temperature) and sulfides such as $\mathrm{Li_{10}GeP_2S_{12}}$, reported in 2011 with $1.2\ \mathrm{S\,m^{-1}}$ — comparable to the $\approx 1\ \mathrm{S\,m^{-1}}$ of the liquid electrolytes in commercial lithium-ion cells.
- **Proton-conducting polymers** such as Nafion, a perfluorinated polymer bearing sulfonic acid groups, which when hydrated conducts protons through water-filled channels at about $10\ \mathrm{S\,m^{-1}}$.

::: example Activation energy of an oxide-ion conductor {#ex-ysz}
A YSZ ceramic has $\kappa = 10.0\ \mathrm{S\,m^{-1}}$ at $1000\,^\circ\mathrm{C}$ and $2.56\ \mathrm{S\,m^{-1}}$ at $800\,^\circ\mathrm{C}$. Find $E_\mathrm{a}$ using [[#eq-solid]].
::: solution
With $T_1 = 1273.15\ \mathrm{K}$ and $T_2 = 1073.15\ \mathrm{K}$, taking the ratio of [[#eq-solid]] at the two temperatures:
$$
\ln\frac{\kappa_1T_1}{\kappa_2T_2} = \frac{E_\mathrm{a}}{R}\left(\frac{1}{T_2} - \frac{1}{T_1}\right), \qquad
E_\mathrm{a} = \frac{8.314\times\ln\dfrac{10.0\times1273.15}{2.56\times1073.15}}{\dfrac{1}{1073.15} - \dfrac{1}{1273.15}}\ \mathrm{J\,mol^{-1}} = \frac{8.314\times1.533}{1.464\times10^{-4}}\ \mathrm{J\,mol^{-1}} = 87\ \mathrm{kJ\,mol^{-1}} ,
$$
or $0.90\ \mathrm{eV}$ per hop. Every $200\ \mathrm{K}$ of cooling costs a factor of four in conductivity, which is why solid-oxide cells run hot and why research targets thinner electrolytes and lower-barrier materials such as doped ceria. Ignoring the factor $T$ (plotting $\ln\kappa$ against $1/T$) would give $E_\mathrm{a} = 77\ \mathrm{kJ\,mol^{-1}}$: the choice of plot matters when the temperature range is wide.
:::
:::

::: widget plot
f: lgA - log(1000/x)/log(10) - Ea*x/(8.314*log(10))
x: 0.7, 3.4
y: -11, 3
sliders: Ea=87:20:150:1; lgA=7.7:5:11:0.1
labels: \log_{10}(\kappa/\mathrm{S\,m^{-1}})
vlines: 3.354
caption: Arrhenius plot of a solid electrolyte, [[#eq-solid]]: $\log_{10}\kappa$ against $1000\,\mathrm{K}/T$ ($x$), with activation energy $E_\mathrm{a}$ in $\mathrm{kJ\,mol^{-1}}$ and pre-exponential factor $\log_{10}(\kappa_0/\mathrm{S\,m^{-1}\,K})$. The default approximates YSZ (about $10\ \mathrm{S\,m^{-1}}$ at $x = 0.79$, i.e. $1000\,^\circ\mathrm{C}$). The vertical line marks room temperature, where YSZ is effectively an insulator (about $10^{-10}\ \mathrm{S\,m^{-1}}$ on this extrapolation). A room-temperature lithium conductor needs $\kappa \gtrsim 10^{-2}\ \mathrm{S\,m^{-1}}$ at that line: lower $E_\mathrm{a}$ to about $40\ \mathrm{kJ\,mol^{-1}}$ to see how small the hopping barrier has to be.
:::

::: history Ions that carry current {#hist-conductivity}
Theodor von Grotthuss proposed in 1806 that water is decomposed by a chain of molecules passing hydrogen and oxygen along to the electrodes — wrong in its details but the ancestor of the proton-hopping mechanism that bears his name. Michael Faraday, with William Whewell, coined *ion*, *anion*, *cation*, *electrode*, *anode* and *cathode* in 1834. Johann Wilhelm Hittorf measured transport numbers from 1853 to 1859 and showed that different ions move at different speeds. Friedrich Kohlrausch, using alternating current to avoid polarisation, established the law of independent migration in the 1870s and the square-root law by 1900. Svante Arrhenius's 1884 dissertation on the conductivity of electrolytes led to his theory of ionic dissociation (1887), and Wilhelm Ostwald's dilution law (1888) turned it into a quantitative test. Peter Debye and Erich Hückel (1923) and Lars Onsager (1926–1927) explained the square-root law through the ionic atmosphere. In the solid state, Walther Nernst used doped zirconia as a lamp filament in 1897, and Carl Wagner explained conduction in such solids through point defects in the 1930s and 1940s.
:::

## Where this leads

Conductivity enters every later chapter as a resistance. In a working cell the electrolyte's resistance causes an *ohmic drop* $IR$ that subtracts from the voltage of a battery or fuel cell and adds to that of an electrolyser ([[electrochemistry/batteries]], [[electrochemistry/fuel-cells-electrolysis]]); in voltammetry it distorts the potential of the working electrode, which is why a large excess of supporting electrolyte is added, suppressing migration so that the analyte reaches the electrode by diffusion alone ([[electrochemistry/voltammetry]]). The Debye length that underlies the Onsager correction also sets the thickness of the diffuse double layer at an electrode ([[electrochemistry/double-layer]]), and the conductivity of the environment controls how far corrosion currents can spread ([[electrochemistry/corrosion]]). The Nernst–Einstein relation links this chapter to diffusion in [[kinetics/rate-laws]] and to Fick's laws as used in voltammetry, and solid electrolytes reappear in [[materials-chemistry]].

::: summary
- Conductivity $\kappa = C_\mathrm{cell}/R$ is measured with alternating current in a cell calibrated with standard KCl; molar conductivity is $\Lambda_\mathrm{m} = \kappa/c$ with $c$ in $\mathrm{mol\,m^{-3}}$.
- Strong electrolytes obey Kohlrausch's square-root law $\Lambda_\mathrm{m} = \Lambda_\mathrm{m}^\circ - \mathcal{K}\sqrt{c}$ (explained by the relaxation and electrophoretic effects of the ionic atmosphere) and the law of independent migration $\Lambda_\mathrm{m}^\circ = \nu_+\lambda_+ + \nu_-\lambda_-$.
- Weak electrolytes have $\Lambda_\mathrm{m} \approx \alpha\Lambda_\mathrm{m}^\circ$; Ostwald's dilution law then gives $K_\mathrm{a}$ from conductivity, with $\Lambda_\mathrm{m}^\circ$ from independent migration.
- $\lambda = |z|uF$ links conductivity to mobility; Stokes's law gives hydrodynamic radii larger than crystal radii for small, strongly hydrated ions; $\mathrm{H^+}$ and $\mathrm{OH^-}$ move anomalously fast by the Grotthuss mechanism.
- The Nernst–Einstein relation $D = uRT/|z|F$ connects mobility with diffusion through the common friction.
- Transport numbers $t_\pm$ give each ion's share of the current and the liquid-junction potential $(t_+ - t_-)(RT/F)\ln(a_\mathrm{L}/a_\mathrm{R})$; KCl salt bridges work because $t_+ \approx t_-$.
- Solid electrolytes (YSZ, β-alumina, garnet and sulfide lithium conductors, Nafion) conduct by activated hopping, $\kappa T = \kappa_0\mathrm{e}^{-E_\mathrm{a}/RT}$.
:::

## Exercises

::: exercise A conductivity measurement {level=1 check="0.0530"}
A cell calibrated with $0.0100\ \mathrm{mol\,dm^{-3}}$ KCl ($\kappa = 0.1412\ \mathrm{S\,m^{-1}}$) shows $452\ \Omega$. Filled with a sample of river water it shows $1205\ \Omega$. Find the conductivity of the river water. (Enter $\kappa$ in $\mathrm{S\,m^{-1}}$.)
::: solution
$C_\mathrm{cell} = 0.1412\times452 = 63.8\ \mathrm{m^{-1}}$, so $\kappa = 63.8/1205 = 0.0530\ \mathrm{S\,m^{-1}}$ ($530\ \mu\mathrm{S\,cm^{-1}}$), typical of a hard-water river. Since only the ratio of resistances matters, $\kappa = 0.1412\times452/1205$ directly.
:::
:::

::: exercise Independent migration {level=1 check="12.15"}
At $25\,^\circ\mathrm{C}$, $\Lambda_\mathrm{m}^\circ$ is $12.64$ for NaCl, $14.49$ for $\mathrm{KNO_3}$ and $14.98\ \mathrm{mS\,m^2\,mol^{-1}}$ for KCl. Find $\Lambda_\mathrm{m}^\circ(\mathrm{NaNO_3})$ without using individual ionic values. (Enter it in $\mathrm{mS\,m^2\,mol^{-1}}$.)
::: solution
$\Lambda^\circ(\mathrm{NaNO_3}) = \Lambda^\circ(\mathrm{NaCl}) + \Lambda^\circ(\mathrm{KNO_3}) - \Lambda^\circ(\mathrm{KCl}) = 12.64 + 14.49 - 14.98 = 12.15\ \mathrm{mS\,m^2\,mol^{-1}}$: the $\mathrm{K^+}$ and $\mathrm{Cl^-}$ contributions cancel. The table gives $5.01 + 7.14 = 12.15$.
:::
:::

::: exercise Mobility of potassium {level=1 check="7.62"}
From $\lambda(\mathrm{K^+}) = 7.35\ \mathrm{mS\,m^2\,mol^{-1}}$, find the mobility of $\mathrm{K^+}$ in water at $25\,^\circ\mathrm{C}$ and its drift speed in a field of $100\ \mathrm{V\,m^{-1}}$. (Enter $u$ in $10^{-8}\ \mathrm{m^2\,V^{-1}\,s^{-1}}$.)
::: solution
$u = \lambda/F = 7.35\times10^{-3}/96\,485 = 7.62\times10^{-8}\ \mathrm{m^2\,V^{-1}\,s^{-1}}$, and $s = u\mathcal{E} = 7.62\ \mu\mathrm{m\,s^{-1}}$. Because $\mathrm{K^+}$ and $\mathrm{Cl^-}$ ($7.91\times10^{-8}$) have almost equal mobilities, KCl is the standard salt-bridge electrolyte.
:::
:::

::: exercise Solubility from conductivity {level=2 check="1.32"}
A saturated solution of AgCl at $25\,^\circ\mathrm{C}$ has $\kappa = 1.89\times10^{-4}\ \mathrm{S\,m^{-1}}$; the water used has $\kappa = 0.06\times10^{-4}\ \mathrm{S\,m^{-1}}$. Find the solubility of AgCl and its solubility product. (Enter the solubility in $10^{-5}\ \mathrm{mol\,dm^{-3}}$.)
::: solution
The salt's contribution is $\kappa = 1.83\times10^{-4}\ \mathrm{S\,m^{-1}}$. The solution is so dilute that $\Lambda_\mathrm{m} = \Lambda_\mathrm{m}^\circ = \lambda(\mathrm{Ag^+}) + \lambda(\mathrm{Cl^-}) = 6.19 + 7.63 = 13.82\ \mathrm{mS\,m^2\,mol^{-1}}$. Then $s = \kappa/\Lambda_\mathrm{m}^\circ = 1.83\times10^{-4}/1.382\times10^{-2} = 1.32\times10^{-2}\ \mathrm{mol\,m^{-3}} = 1.32\times10^{-5}\ \mathrm{mol\,dm^{-3}}$, and $K_\mathrm{sp} = s^2 = 1.75\times10^{-10}$. Conductivity is the classical way to measure solubilities too small for gravimetry; the correction for the water's own conductivity is essential, since here it is $3\,\%$ of the total.
:::
:::

::: exercise Acetic acid at lower concentration {level=2 check="1.78"}
At $c = 1.00\times10^{-3}\ \mathrm{mol\,dm^{-3}}$ acetic acid has $\Lambda_\mathrm{m} = 4.87\ \mathrm{mS\,m^2\,mol^{-1}}$ at $25\,^\circ\mathrm{C}$. Find $\alpha$ and $K_\mathrm{a}$ from Ostwald's law, with $\Lambda_\mathrm{m}^\circ = 39.05\ \mathrm{mS\,m^2\,mol^{-1}}$. (Enter $K_\mathrm{a}$ in $10^{-5}$.)
::: solution
$\alpha = 4.87/39.05 = 0.1247$, three times the value at $0.0100\ \mathrm{mol\,dm^{-3}}$, as the dilution law requires. $K_\mathrm{a} = 1.00\times10^{-3}\times0.1247^2/(1 - 0.1247) = 1.78\times10^{-5}$. Two measurements at different concentrations giving the same $K_\mathrm{a}$ to within $2\,\%$ was Ostwald's evidence that the equilibrium picture was right.
:::
:::

::: exercise A junction in hydrochloric acid {level=2 check="38.0"}
Using the limiting ionic conductivities, estimate the liquid-junction potential between $0.100$ and $0.0100\ \mathrm{mol\,dm^{-3}}$ HCl at $25\,^\circ\mathrm{C}$, with concentrations for activities, and state which side is positive. (Enter $|E_\mathrm{j}|$ in mV.)
::: solution
$t_+ = 34.96/(34.96 + 7.63) = 0.821$, so $t_+ - t_- = 0.642$ and $|E_\mathrm{j}| = 0.642\times59.16\ \mathrm{mV} = 38.0\ \mathrm{mV}$, with the dilute side positive: protons diffuse ahead of chloride ions into it. The real value is somewhat lower because transport numbers and activity coefficients change across the junction, but a junction of this size would wreck any thermodynamic measurement — hence cells without junction, or salt bridges.
:::
:::

::: exercise The hydrated lithium ion {level=3 check="238"}
Show from [[#eq-stokes]] and [[#eq-lambda-u]] that the Stokes radius is $a = z^2eF/(6\pi\eta\lambda)$, compute it for $\mathrm{Li^+}$ ($\lambda = 3.87\ \mathrm{mS\,m^2\,mol^{-1}}$, $\eta = 0.890\ \mathrm{mPa\,s}$). Then explain why $\mathrm{Li^+}$, the smallest alkali-metal ion in crystals, is the slowest in water. (Enter $a$ in pm.)
::: hint
For a singly charged ion $u = \lambda/F$, and $u = e/(6\pi\eta a)$.
:::
::: solution
Combining $u = \lambda/(zF)$ with $u = ze/(6\pi\eta a)$ gives $a = z^2eF/(6\pi\eta\lambda)$; for $z = 1$,
$$
a = \frac{1.602\times10^{-19}\times96\,485}{6\pi\times8.90\times10^{-4}\times3.87\times10^{-3}}\ \mathrm{m} = 2.38\times10^{-10}\ \mathrm{m} = 238\ \mathrm{pm}.
$$
The crystal radius is $76\ \mathrm{pm}$. A small ion has a high surface charge density and binds a large, tightly held hydration shell (four to six water molecules in the first shell, with a second shell strongly perturbed), and it is this whole assembly that is dragged through the solvent. The sequence of mobilities $\mathrm{Li^+} < \mathrm{Na^+} < \mathrm{K^+}$ is the reverse of the sequence of crystal radii. (Stokes's law is itself only approximate on this scale — the solvent is not a continuum around a $0.2\ \mathrm{nm}$ sphere — so the radius is best read as a comparative "effective size".)
:::
:::

::: exercise The Nernst–Einstein relation {level=3 check="2.03"}
Derive $\lambda = z^2F^2D/RT$ from the condition that drift and diffusion fluxes balance in equilibrium, and use it to find the diffusion coefficient of $\mathrm{Cl^-}$ at $25\,^\circ\mathrm{C}$ from $\lambda = 7.63\ \mathrm{mS\,m^2\,mol^{-1}}$. (Enter $D$ in $10^{-9}\ \mathrm{m^2\,s^{-1}}$.)
::: solution
In equilibrium in a potential $\phi(x)$, uniform electrochemical potential gives $c \propto \exp(-zF\phi/RT)$, so $\mathrm{d}c/\mathrm{d}x = (zF/RT)c\mathcal{E}$ with $\mathcal{E} = -\mathrm{d}\phi/\mathrm{d}x$. The drift flux $c\,u\mathcal{E}\,\mathrm{sgn}(z)$ and the diffusive flux $-D\,\mathrm{d}c/\mathrm{d}x$ must cancel: $u = |z|FD/RT$. With $\lambda = |z|uF$, $\lambda = z^2F^2D/RT$. For $\mathrm{Cl^-}$:
$$
D = \frac{\lambda RT}{z^2F^2} = \frac{7.63\times10^{-3}\times8.314\times298.15}{96\,485^2}\ \mathrm{m^2\,s^{-1}} = 2.03\times10^{-9}\ \mathrm{m^2\,s^{-1}},
$$
matching tracer measurements ($2.03\times10^{-9}$). The relation is exact at infinite dilution; at finite concentration conductivity is reduced by ion–ion correlations that do not slow tracer diffusion in the same way, and the ratio of the two (the Haven ratio, in solids) is a diagnostic of correlated motion.
:::
:::

::: exercise A cooler solid-oxide cell {level=3 check="1.04"}
Using the YSZ data of [[#ex-ysz]] ($\kappa = 10.0\ \mathrm{S\,m^{-1}}$ at $1000\,^\circ\mathrm{C}$, $E_\mathrm{a} = 87\ \mathrm{kJ\,mol^{-1}}$), predict $\kappa$ at $700\,^\circ\mathrm{C}$. A cell with a $10\ \mu\mathrm{m}$ electrolyte is to lose no more than $0.05\ \Omega\,\mathrm{cm^2}$ in area-specific resistance; is this met at $700\,^\circ\mathrm{C}$? (Enter $\kappa$ at $700\,^\circ\mathrm{C}$ in $\mathrm{S\,m^{-1}}$.)
::: solution
$$
\kappa_2 = \kappa_1\frac{T_1}{T_2}\exp\!\left[-\frac{E_\mathrm{a}}{R}\left(\frac{1}{T_2} - \frac{1}{T_1}\right)\right] = 10.0\times\frac{1273.15}{973.15}\times\exp\!\left[-\frac{87\,000}{8.314}\left(\frac{1}{973.15} - \frac{1}{1273.15}\right)\right]\ \mathrm{S\,m^{-1}} = 1.04\ \mathrm{S\,m^{-1}} .
$$
Area-specific resistance is thickness over conductivity: $10\times10^{-6}\ \mathrm{m}/1.04\ \mathrm{S\,m^{-1}} = 9.6\times10^{-6}\ \Omega\,\mathrm{m^2} = 0.096\ \Omega\,\mathrm{cm^2}$, about twice the target. Either the electrolyte must be thinner (about $5\ \mu\mathrm{m}$) or a better conductor such as gadolinium-doped ceria must be used — the two routes by which intermediate-temperature solid-oxide cells have been developed.
:::
:::
