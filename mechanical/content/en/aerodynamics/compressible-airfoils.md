An airliner cruises at a Mach number of about $0.78$–$0.85$. Its wing was designed with the incompressible tools of the first half of this course, and at low speed it behaves as they predict. In cruise it does not: the air accelerating over the upper surface reaches the speed of sound long before the aircraft does, a pocket of supersonic flow forms on the wing, terminated by a shock wave, and above a certain Mach number the drag rises steeply — the **drag divergence** that, before it was understood, was called the "sound barrier". This chapter explains how compressibility first modifies subsonic airfoil flow (the **Prandtl–Glauert** rule and its refinements), how to find the **critical Mach number** at which sonic flow first appears, what happens between that and drag divergence, and the two great design inventions that push drag divergence to higher Mach numbers: **sweep** and the **supercritical airfoil**.

You will need the isentropic relations of [[fluid-mechanics/compressible-flow]], the potential-flow and thin-airfoil ideas of [[aerodynamics/potential-flow]] and [[aerodynamics/thin-airfoil-theory]], and the boundary layers of [[aerodynamics/viscous-aerodynamics]]. Air is a perfect gas with $\gamma = 1.4$; $\beta$ in this chapter denotes $\sqrt{1 - M_\infty^2}$ (not a shock angle).

## The linearised potential equation

For steady, irrotational, isentropic flow of a perfect gas, the velocity potential $\phi$ satisfies the **full potential equation**
$$
\left(a^2 - u^2\right)\phi_{xx} - 2uv\,\phi_{xy} + \left(a^2 - v^2\right)\phi_{yy} = 0 ,
$$ {#eq-full-potential}
where $u = \phi_x$, $v = \phi_y$ and the local speed of sound follows from the energy equation, $a^2 = a_\infty^2 - \tfrac{\gamma - 1}{2}\left(u^2 + v^2 - V_\infty^2\right)$. (It is the continuity equation $\nabla\cdot(\rho\nabla\phi) = 0$ with the density eliminated through Euler's equation and the isentropic relation $dp = a^2d\rho$.) It is nonlinear. For a thin body at small incidence it can be linearised.

::: proposition Linearised small-perturbation equation {#prop-linearised}
Write the velocity as the free stream plus a small perturbation, $u = V_\infty + u'$, $v = v'$, with $u', v' \ll V_\infty$, and the perturbation potential $\phi'$ with $u' = \phi'_x$, $v' = \phi'_y$. If $M_\infty$ is neither close to $1$ (roughly $0.8 < M_\infty < 1.2$) nor large ($M_\infty \gtrsim 5$), then to first order
$$
\left(1 - M_\infty^2\right)\phi'_{xx} + \phi'_{yy} = 0 ,
$$ {#eq-linearised}
and the pressure coefficient is
$$
C_p = -\frac{2u'}{V_\infty} .
$$ {#eq-cp-linear}
:::

::: proof
Substitute $u = V_\infty + u'$, $v = v'$ into [[#eq-full-potential]] and divide by $a_\infty^2$. The energy equation gives $a^2/a_\infty^2 = 1 - (\gamma - 1)M_\infty^2\left(u'/V_\infty + \tfrac12(u'^2 + v'^2)/V_\infty^2\right)$. Collecting terms, the equation can be arranged as
$$
\left(1 - M_\infty^2\right)\phi'_{xx} + \phi'_{yy} = M_\infty^2\left[(\gamma + 1)\frac{u'}{V_\infty} + \ldots\right]\phi'_{xx} + M_\infty^2\left[(\gamma - 1)\frac{u'}{V_\infty} + \ldots\right]\phi'_{yy} + M_\infty^2\left[\frac{v'}{V_\infty}\left(1 + \frac{u'}{V_\infty}\right)\right]2\phi'_{xy},
$$
where the dots are second-order terms. Each term on the right is a product of a perturbation ratio and second derivatives of $\phi'$, so it is small compared with the corresponding term on the left provided $M_\infty^2(\gamma + 1)\,u'/V_\infty \ll |1 - M_\infty^2|$ (which fails near $M_\infty = 1$) and $M_\infty^2\,u'/V_\infty \ll 1$, $M_\infty^2\,v'/V_\infty \ll 1$ (which fail at hypersonic speeds). Dropping them gives [[#eq-linearised]]. For the pressure, the isentropic relation $p/p_\infty = \left(1 - \tfrac{\gamma - 1}{2}M_\infty^2\left(\tfrac{2u'}{V_\infty} + \tfrac{u'^2 + v'^2}{V_\infty^2}\right)\right)^{\gamma/(\gamma - 1)}$ expanded by the binomial theorem gives $p/p_\infty \approx 1 - \gamma M_\infty^2u'/V_\infty$, and with $C_p = \tfrac{2}{\gamma M_\infty^2}(p/p_\infty - 1)$ this is [[#eq-cp-linear]]. The boundary condition is linearised in the same way: $v'(x, 0) = V_\infty\,dy_b/dx$ on the body surface $y_b(x)$, applied on the axis.
:::

For $M_\infty < 1$ the equation is elliptic, like Laplace's — disturbances spread in all directions; for $M_\infty > 1$ it is hyperbolic — a wave equation whose characteristics are the Mach lines of [[aerodynamics/oblique-shocks]]. The subsonic case transforms into Laplace's equation.

## The Prandtl–Glauert rule

::: theorem Prandtl–Glauert compressibility correction {#thm-prandtl-glauert}
For a thin airfoil in subsonic flow within the assumptions of [[#prop-linearised]], the pressure coefficient at each point at free-stream Mach number $M_\infty$ is related to the incompressible value $C_{p,0}$ at the same point *of the same airfoil at the same angle of attack* by
$$
C_p = \frac{C_{p,0}}{\sqrt{1 - M_\infty^2}} .
$$ {#eq-pg}
Consequently $c_l = c_{l,0}/\sqrt{1 - M_\infty^2}$ and $c_m = c_{m,0}/\sqrt{1 - M_\infty^2}$: the lift-curve slope rises by the same factor, and the aerodynamic centre stays at the quarter-chord.
:::

::: proof
Let $\beta = \sqrt{1 - M_\infty^2}$ and define new coordinates and potential $\xi = x$, $\eta = \beta y$, $\hat\phi(\xi, \eta) = \beta\phi'(x, y)$. Then $\phi'_{xx} = \hat\phi_{\xi\xi}/\beta$ and $\phi'_{yy} = \beta\hat\phi_{\eta\eta}$, so [[#eq-linearised]] becomes $\beta\hat\phi_{\xi\xi} + \beta\hat\phi_{\eta\eta} = 0$: Laplace's equation in the $(\xi, \eta)$ plane. The boundary condition on the body $y_b(x)$ is $\phi'_y = V_\infty\,dy_b/dx$; since $\phi'_y = \hat\phi_\eta$, it becomes $\hat\phi_\eta = V_\infty\,dy_b/d\xi$ — the incompressible condition for a body of the **same shape** in the transformed plane. So $\hat\phi$ is the incompressible perturbation potential of the same airfoil, and the perturbation velocities are related by $u' = \phi'_x = \hat\phi_\xi/\beta = u'_0/\beta$. By [[#eq-cp-linear]], $C_p = -2u'/V_\infty = C_{p,0}/\beta$. Integrating the pressures over the chord multiplies $c_n$ and $c_m$ by $1/\beta$ as well, so the ratio $c_m/c_l$, and hence the aerodynamic centre, is unchanged. Assumptions: those of [[#prop-linearised]]; in addition the transformation works on the linearised boundary condition, i.e. a thin body at small incidence.
:::

The physical picture: compressibility makes the air "stiffer" in the streamwise direction, so the disturbance of the body reaches further out sideways (by the factor $1/\beta$) and the flow responds with larger velocity perturbations near the surface. At $M_\infty = 0.7$ the factor is $1.40$ — lift curves measured at low speed are not usable at cruise without correction. The rule obviously fails as $M_\infty \to 1$, where it predicts infinite pressures.

Two refinements give better agreement with experiment at higher subsonic Mach numbers, where the local perturbations are no longer small. Both are *corrections to the pressure coefficient* with the same structure (they reduce to Prandtl–Glauert for small $C_{p,0}$):
$$
\text{Kármán–Tsien:}\quad C_p = \frac{C_{p,0}}{\beta + \dfrac{M_\infty^2}{1 + \beta}\,\dfrac{C_{p,0}}{2}}, \qquad
\text{Laitone:}\quad C_p = \frac{C_{p,0}}{\beta + \dfrac{M_\infty^2\left(1 + \tfrac{\gamma - 1}{2}M_\infty^2\right)}{2\beta}\,C_{p,0}} .
$$ {#eq-kt-laitone}
The Kármán–Tsien rule (Tsien 1939, from von Kármán's hodograph method with a tangent-gas approximation to the isentrope) is the one most used in practice, notably in panel codes; it agrees better with measured pressures near suction peaks. The Laitone rule (1951) includes the variation of the local Mach number. For $C_{p,0} = -0.5$ at $M_\infty = 0.7$ the three give $-0.70$ (Prandtl–Glauert), $-0.78$ (Kármán–Tsien) and $-0.95$ (Laitone). They differ most where the suction is large, which is exactly where the critical Mach number is decided — so the predicted critical Mach number depends on which rule is used, by a few hundredths.

::: example Lift of a section at Mach 0.6 {#ex-pg-lift}
Thin-airfoil theory gives $c_l = 0.666$ for the NACA 2412 at $4^\circ$ in incompressible flow ([[aerodynamics/thin-airfoil-theory]]). Estimate $c_l$ at $M_\infty = 0.6$ and the lift-curve slope there.
::: solution
$\beta = \sqrt{1 - 0.36} = 0.8$, so $c_l = 0.666/0.8 = 0.833$, and the lift-curve slope is $2\pi/0.8 = 7.85$ per radian ($0.137$ per degree). The zero-lift angle is unchanged ($-2.08^\circ$): Prandtl–Glauert scales the whole lift curve about its zero-lift point. *Sanity check:* a 25 per cent rise in lift at the same incidence between low speed and $M = 0.6$ is consistent with wind-tunnel data for thin sections; for a whole aircraft the same rule (applied to the section slope inside the finite-wing formula) explains why lift-curve slopes and hence gust loads are larger at high subsonic speed.
:::
:::

## The critical Mach number

As $M_\infty$ increases, the maximum local velocity on the airfoil — at the suction peak — increases faster than the free stream. At some free-stream Mach number it reaches the local speed of sound.

::: definition Critical Mach number and critical pressure coefficient {#def-critical}
The **critical Mach number** $M_{cr}$ of an airfoil (at a given incidence) is the free-stream Mach number at which the flow first reaches $M = 1$ somewhere on its surface. The **critical pressure coefficient** $C_{p,cr}(M_\infty)$ is the pressure coefficient at a point where the local Mach number is exactly $1$, in a free stream of Mach number $M_\infty$.
:::

::: proposition The critical pressure coefficient {#prop-cpcr}
For isentropic flow of a perfect gas,
$$
C_{p,cr} = \frac{2}{\gamma M_\infty^2}\left[\left(\frac{1 + \tfrac{\gamma - 1}{2}M_\infty^2}{\tfrac{\gamma + 1}{2}}\right)^{\gamma/(\gamma - 1)} - 1\right].
$$ {#eq-cpcr}
It depends only on $M_\infty$, not on the airfoil.
:::

::: proof
Outside the boundary layer and upstream of any shock the flow is isentropic with uniform stagnation pressure $p_0$, so at a point of local Mach number $M$, $p/p_0 = \left(1 + \tfrac{\gamma - 1}{2}M^2\right)^{-\gamma/(\gamma - 1)}$, and in particular $p/p_\infty = \left[\left(1 + \tfrac{\gamma - 1}{2}M_\infty^2\right)/\left(1 + \tfrac{\gamma - 1}{2}M^2\right)\right]^{\gamma/(\gamma - 1)}$. Set $M = 1$, and use $C_p = (p - p_\infty)/q_\infty$ with $q_\infty = \tfrac12\rho_\infty V_\infty^2 = \tfrac12\gamma p_\infty M_\infty^2$ (from $a^2 = \gamma p/\rho$), so that $C_p = \tfrac{2}{\gamma M_\infty^2}(p/p_\infty - 1)$. This gives [[#eq-cpcr]]. Assumptions: isentropic, steady flow of a calorically perfect gas.
:::

Values: $C_{p,cr} = -2.13$ at $M_\infty = 0.5$, $-1.29$ at $0.6$, $-0.78$ at $0.7$, $-0.43$ at $0.8$, and $0$ at $M_\infty = 1$. The critical Mach number is found where the airfoil's minimum pressure coefficient, rising in magnitude with $M_\infty$ by a compressibility rule, meets the falling curve [[#eq-cpcr]].

::: algorithm Finding the critical Mach number {#alg-mcr}
1. Find the incompressible minimum pressure coefficient $C_{p,0,\min}$ of the airfoil at the required incidence (from low-speed data or a panel method).
2. Scale it with a compressibility rule — Prandtl–Glauert [[#eq-pg]] or Kármán–Tsien [[#eq-kt-laitone]] — to obtain $C_{p,\min}(M_\infty)$.
3. Solve $C_{p,\min}(M_\infty) = C_{p,cr}(M_\infty)$ for $M_\infty$ (by bisection, or graphically by intersecting the two curves). The root is $M_{cr}$.
4. Check that the peak is not so sharp that the linearised rule is badly wrong; quote which rule was used.
:::

::: widget plot
f: 2/(1.4*x^2)*(((1 + 0.2*x^2)/1.2)^3.5 - 1); c/sqrt(1 - x^2); c/(sqrt(1 - x^2) + x^2/(1 + sqrt(1 - x^2))*c/2)
x: 0.3, 0.97
y: -3, 0
sliders: c=-1.2:-2.5:-0.2:0.01
labels: C_{p,cr}(M_\infty); \text{Prandtl--Glauert}\ C_{p,\min}; \text{Kármán--Tsien}\ C_{p,\min}
caption: Graphical solution for the critical Mach number. The rising curve is $C_{p,cr}(M_\infty)$ from [[#eq-cpcr]]; the falling curves are the minimum pressure coefficient of an airfoil whose incompressible value $c = C_{p,0,\min}$ is set by the slider, scaled by Prandtl–Glauert and by Kármán–Tsien. Each intersection is a critical Mach number. With $c = -1.2$ (a cambered section at moderate lift) the intersections are at $M_\infty = 0.575$ (Prandtl–Glauert) and $0.553$ (Kármán–Tsien); with $c = -0.43$ (a 12 per cent symmetric section at zero lift) at $0.737$ and $0.723$. Thinner sections and lower lift (smaller $|c|$) raise $M_{cr}$.
:::

::: example Critical Mach number of a cambered section {#ex-mcr}
An airfoil at its cruise incidence has a minimum incompressible pressure coefficient $C_{p,0,\min} = -1.2$. Find its critical Mach number using (a) Prandtl–Glauert and (b) Kármán–Tsien.
::: solution
(a) Solve $-1.2/\sqrt{1 - M^2} = C_{p,cr}(M)$. Trying $M = 0.55$: left side $-1.437$, $C_{p,cr} = -1.658$ (the airfoil's peak is not yet sonic). At $M = 0.60$: left $-1.500$, $C_{p,cr} = -1.294$ (beyond critical). Bisection between them gives $M_{cr} = 0.575$, where both equal $-1.47$.
(b) The same procedure with the Kármán–Tsien rule gives $M_{cr} = 0.553$.
*Sanity check:* the more realistic Kármán–Tsien rule produces a larger suction at a given Mach number and hence a lower $M_{cr}$, by about $0.02$. A section with a suction peak of $-1.2$ is critical at a Mach number well below airliner cruise — which is why transport wings combine thin, carefully shaped sections at modest local lift coefficients with sweep.
:::
:::

## Beyond critical: transonic flow and drag divergence

Above $M_{cr}$ a region of supersonic flow grows on the upper surface. In it the pressure keeps falling as the flow accelerates over the convex surface; the region is terminated by a nearly normal **shock wave**, behind which the flow is subsonic again and the pressure jumps up. As $M_\infty$ increases the supersonic region grows and the shock strengthens and moves aft. Two drag mechanisms appear: the **wave drag** of the shock itself (its entropy rise is a loss of stagnation pressure that shows up as momentum deficit in the wake), and the drag of **shock-induced separation**, when the pressure jump across the shock is too steep for the boundary layer beneath it. The combination makes the drag rise steeply.

The **drag-divergence Mach number** $M_{dd}$ is defined conventionally as the Mach number at which $dc_d/dM_\infty = 0.1$; it lies a few hundredths above $M_{cr}$ for conventional sections. Above drag divergence the drag coefficient may increase by a factor of ten before the flow becomes fully supersonic. Shock-induced separation also causes unsteadiness — **buffet** — and changes in pitching moment ("Mach tuck", a nose-down trim change as the centre of pressure moves aft), which set the practical upper limit of a transport's cruise speed.

For preliminary design, a widely used empirical estimate is the **Korn equation** as extended to swept wings by Mason (*Configuration Aerodynamics*):
$$
M_{dd} = \frac{\kappa_A}{\cos\Lambda} - \frac{t/c}{\cos^2\Lambda} - \frac{c_l}{10\cos^3\Lambda},
$$ {#eq-korn}
where $t/c$ is the streamwise thickness ratio, $c_l$ the section lift coefficient, $\Lambda$ the sweep angle of the wing (for $\Lambda = 0$ it is Korn's original two-dimensional relation $M_{dd} + c_l/10 + t/c = \kappa_A$) and $\kappa_A$ an "airfoil technology factor": about $0.87$ for NACA six-series sections and $0.95$ for supercritical sections. Its accuracy is a few hundredths in Mach number; it is a trend formula for choosing $t/c$, $c_l$ and sweep, not a substitute for transonic computation or tests.

::: example Drag divergence and thickness {#ex-korn}
(a) Estimate $M_{dd}$ for an unswept 12 per cent thick section at $c_l = 0.6$, conventional and supercritical. (b) A transport wing swept $30^\circ$ uses supercritical sections and cruises at a section lift coefficient of $0.5$. What thickness ratio gives $M_{dd} = 0.85$?
::: solution
(a) Conventional: $M_{dd} = 0.87 - 0.12 - 0.06 = 0.69$. Supercritical: $0.95 - 0.12 - 0.06 = 0.77$. The supercritical shape is worth $0.08$ in Mach number at the same thickness and lift.
(b) With $\cos30^\circ = 0.8660$: $\kappa_A/\cos\Lambda = 1.0970$, $c_l/(10\cos^3\Lambda) = 0.5/6.495 = 0.0770$. Then $(t/c)/\cos^2\Lambda = 1.0970 - 0.0770 - 0.85 = 0.1700$, so $t/c = 0.1700 \times 0.75 = 0.1275$, about $12.7$ per cent.
*Sanity check:* modern transports at $M \approx 0.85$ have sweeps near $30^\circ$ and average thickness ratios of $10$–$13$ per cent, thicker inboard (structure, fuel) and thinner outboard. The exercise shows the central trade: each degree of sweep or point of $M_{dd}$ costs thickness, and thickness is structural weight.
:::
:::

::: widget plot
f: k/cos(L*pi/180) - t/cos(L*pi/180)^2 - x/(10*cos(L*pi/180)^3)
x: 0, 1
y: 0.5, 1
sliders: k=0.95:0.85:0.97:0.01, t=0.12:0.06:0.18:0.005, L=30:0:40:1
labels: M_{dd}\ \text{(Korn--Mason)}
hlines: 0.85
caption: Drag-divergence Mach number from the Korn equation [[#eq-korn]] against section lift coefficient (horizontal axis), with technology factor $k$ ($0.87$ conventional, $0.95$ supercritical), thickness ratio $t$ and sweep $L$ in degrees. The horizontal line marks a typical cruise Mach number of $0.85$. Start at the supercritical 12 per cent section swept $30^\circ$: it reaches $0.85$ for $c_l$ up to about $0.6$. Unsweep the wing and see how far the thickness must fall to recover; switch to $k = 0.87$ to see what the supercritical shape bought.
:::

## Supercritical airfoils

A conventional section accelerates the flow to a sharp suction peak near the leading edge, followed by a long adverse gradient; above $M_{cr}$ the supersonic pocket ends in a strong shock. A **supercritical airfoil** (developed by Richard Whitcomb at NASA Langley in the 1960s) is shaped to *live with* a supersonic region but keep its shock weak:

- a **flatter upper surface**, so that the supersonic region is long and the flow in it is not accelerated much; the expansion waves from the leading-edge region reflect from the sonic line as compression waves that slow the flow gently, and the terminating shock is weak (the local Mach number ahead of it is around $1.2$ or less, below the strength that would separate a turbulent boundary layer);
- a **larger leading-edge radius**, to avoid a sharp suction peak;
- **aft camber** (a cusped lower surface near the trailing edge), so that much of the lift is produced over the rear of the section, where the flow is subsonic — "rear loading".

The gain can be used either as a higher $M_{dd}$ at the same thickness (about $0.05$–$0.1$, cf. example [[#ex-korn]]), or as a thicker section at the same $M_{dd}$ (lighter wing, more fuel, less sweep, higher aspect ratio). Airliners since the 1980s mostly take the second option. The price is a large nose-down $c_{m,ac}$ from the aft camber, which must be trimmed by the tailplane, and sensitivity of the rear loading to the boundary layer.

::: quiz
Which change would *not* raise the drag-divergence Mach number of a transport wing at a given lift?
- [ ] Reducing the thickness ratio
- [ ] Increasing the sweep
- [x] Increasing the wing loading so that the section lift coefficients rise
- [ ] Using a supercritical section
::: solution
Higher section lift coefficients mean stronger suction peaks and an earlier, stronger shock: $M_{dd}$ falls (the $-c_l/10$ term of [[#eq-korn]]). Thinner sections, more sweep and supercritical shaping all raise $M_{dd}$.
:::
:::

## Sweep

The idea of sweep is that, for a long swept wing, only the component of the free stream **normal to the leading edge** shapes the pressure distribution; the spanwise component slides along the wing without affecting it (in inviscid flow on an infinite swept wing this is exact — the "independence principle"). A wing swept by $\Lambda$ in a stream of Mach number $M_\infty$ therefore behaves, as far as compressibility is concerned, like an unswept section at
$$
M_n = M_\infty\cos\Lambda .
$$ {#eq-simple-sweep}
At $M_\infty = 0.85$ with $\Lambda = 30^\circ$ the sections see $M_n = 0.74$. The section's thickness and lift coefficient measured *normal* to the leading edge are also larger than the streamwise values, which is why the swept Korn equation has extra powers of $\cos\Lambda$ on the thickness and lift terms. In practice the full $\cos\Lambda$ benefit is not realised at the wing root and tip, where the flow is three-dimensional, and the root and tip are specially shaped (fuselage fillets, root thickening, tip twist) to keep the isobars swept.

Sweep has costs: for a given span and wing area the structure is longer and heavier (the span measured along the structure is $b/\cos\Lambda$); the lift-curve slope and maximum lift fall; and aft-swept wings tend to stall first at the tips, where the ailerons are, which causes pitch-up — managed by washout, fences, leading-edge devices or careful planform design. The usual compromise for Mach $0.78$–$0.85$ transports is $25$–$35^\circ$ of quarter-chord sweep.

::: example Lift slope of a swept wing at Mach 0.8 {#ex-swept-slope}
A transport wing has $AR = 9$ and half-chord sweep $\Lambda_{c/2} = 30^\circ$, with section slope $2\pi$ per radian. Using the compressible form of the DATCOM lift-slope formula,
$$
a = \frac{2\pi AR}{2 + \sqrt{AR^2\beta^2\left(1 + \tan^2\Lambda_{c/2}/\beta^2\right) + 4}},
$$
(its incompressible form appears in [[aerodynamics/finite-wings]]), find the wing lift-curve slope at $M_\infty = 0$ and $0.8$, and compare the increase with the two-dimensional Prandtl–Glauert factor.
::: solution
$\tan^2 30^\circ = 0.3333$. At $M_\infty = 0$, $\beta = 1$: the root is $\sqrt{81(1.3333) + 4} = \sqrt{112.0} = 10.58$, so $a = 2\pi(9)/12.58 = 4.49$ per radian. At $M_\infty = 0.8$, $\beta^2 = 0.36$: $AR^2\beta^2(1 + \tan^2\Lambda/\beta^2) = 81(0.36 + 0.3333) = 56.16$, the root is $\sqrt{60.16} = 7.76$, and $a = 56.55/9.76 = 5.80$ per radian. The increase is a factor $1.29$, whereas Prandtl–Glauert for a section gives $1/0.6 = 1.67$. *Sanity check:* a finite, swept wing feels compressibility less than its sections, because part of its lift slope is limited by the induced angle (which does not grow with $M$) and because sweep reduces the effective Mach number. The 29 per cent rise still matters for gust loads, which are proportional to the lift slope.
:::
:::

::: warning Which Mach number, which coefficient
Three slips are common in transonic estimates. **Applying Prandtl–Glauert beyond its range:** above about $M_\infty = 0.7$ on real sections, and anywhere the flow is locally supersonic, the linear rule underpredicts the suction; use Kármán–Tsien for $M_{cr}$ and do not use either above $M_{cr}$. **Mixing streamwise and normal quantities in sweep corrections:** simple sweep theory uses $M\cos\Lambda$ with the section's *normal* thickness ratio and lift coefficient, which are $(t/c)/\cos\Lambda$ and $c_l/\cos^2\Lambda$ in terms of streamwise values. **Using $M_{cr}$ as the cruise limit:** a transport usually cruises *above* $M_{cr}$ with a weak shock on the wing; the useful limit is drag divergence and buffet, not the first appearance of sonic flow.
:::

::: application The transonic area rule
For a whole aircraft near $M = 1$, Whitcomb showed experimentally in the early 1950s that the wave drag depends mainly on the longitudinal distribution of cross-sectional area (fuselage plus wing plus tail, cut by planes normal to the flight direction), and is least when that distribution is smooth — the **area rule**. Its best-known consequence is a fuselage that is waisted where the wing joins it; on transports the same principle is applied more subtly through the shaping of wing–fuselage fairings, engine nacelles and the upper fuselage.
:::

::: history
The compressibility correction for subsonic airfoils was given by Ludwig **Prandtl**, who presented it in lectures in the early 1920s, and proved in print by Hermann **Glauert** ("The effect of compressibility on the lift of an aerofoil", *Proceedings of the Royal Society*, 1928). Qian Xuesen (H. S. **Tsien**), working with Theodore **von Kármán**, published the improved rule in 1939. Adolf **Busemann** proposed sweep at the 1935 Volta Conference in Rome (for supersonic flight); the subsonic benefit of sweep was recognised in Germany during the Second World War and independently by Robert T. **Jones** of the NACA in 1945. Richard **Whitcomb** at NASA Langley developed the supercritical airfoil from the early 1960s, and an F-8 fitted with a supercritical wing first flew at NASA's Flight Research Center on 9 March 1971, confirming the predicted gains.
:::

## Summary

::: summary
- For thin bodies at subsonic Mach numbers not too near 1, the perturbation potential satisfies $(1 - M_\infty^2)\phi'_{xx} + \phi'_{yy} = 0$ and $C_p = -2u'/V_\infty$.
- **Prandtl–Glauert:** $C_p = C_{p,0}/\sqrt{1 - M_\infty^2}$; lift and moment scale the same way and the aerodynamic centre does not move. Kármán–Tsien and Laitone are more accurate at larger suction.
- $C_{p,cr}(M_\infty) = \tfrac{2}{\gamma M_\infty^2}\left[\left(\tfrac{1 + 0.2M_\infty^2}{1.2}\right)^{3.5} - 1\right]$; $M_{cr}$ is where the scaled minimum $C_p$ meets it. For $C_{p,0,\min} = -1.2$: $0.575$ (P–G), $0.553$ (K–T).
- Above $M_{cr}$ a supersonic pocket and shock appear; wave drag and shock-induced separation cause drag divergence ($dc_d/dM = 0.1$) and buffet.
- Korn–Mason: $M_{dd} = \kappa_A/\cos\Lambda - (t/c)/\cos^2\Lambda - c_l/(10\cos^3\Lambda)$, $\kappa_A \approx 0.87$ conventional, $0.95$ supercritical.
- Supercritical sections (flat top, large nose radius, aft camber) keep the shock weak; sweep reduces the effective Mach number to $M\cos\Lambda$.
:::

## Exercises

::: exercise Prandtl–Glauert factor {level=1 check="-0.700"}
A point on an airfoil has $C_p = -0.5$ in incompressible flow. Estimate $C_p$ at the same point at $M_\infty = 0.7$ with the Prandtl–Glauert rule. (Enter $C_p$.)
::: solution
$C_p = -0.5/\sqrt{1 - 0.49} = -0.5/0.714 = -0.700$. Kármán–Tsien gives $-0.778$.
:::
:::

::: exercise Critical pressure coefficient {level=1 check="-0.779"}
Find the critical pressure coefficient at $M_\infty = 0.7$. (Enter $C_{p,cr}$.)
::: solution
$C_{p,cr} = \tfrac{2}{1.4 \times 0.49}\left[\left(\tfrac{1 + 0.2 \times 0.49}{1.2}\right)^{3.5} - 1\right] = 2.915\left[(0.9150)^{3.5} - 1\right] = 2.915(0.7328 - 1) = -0.779$.
:::
:::

::: exercise Effective Mach number of a swept wing {level=1 check="0.736"}
A wing swept at $30^\circ$ flies at $M_\infty = 0.85$. What Mach number does simple sweep theory say its sections see? (Enter $M_n$.)
::: solution
$M_n = 0.85\cos30^\circ = 0.736$.
:::
:::

::: exercise Lift-curve slope at Mach 0.7 {level=2 check="0.154"}
A thin section has an incompressible lift-curve slope of $2\pi$ per radian. Estimate the slope at $M_\infty = 0.7$. (Enter it per degree.)
::: solution
$2\pi/\sqrt{0.51} = 8.80$ per radian $= 0.154$ per degree, 40 per cent above the incompressible $0.110$.
:::
:::

::: exercise Critical Mach number of a thick symmetric section {level=2 check="0.737"}
A 12 per cent thick symmetric section at zero incidence has $C_{p,0,\min} = -0.43$. Find its critical Mach number with the Prandtl–Glauert rule. (Enter $M_{cr}$.)
::: solution
Solve $-0.43/\sqrt{1 - M^2} = C_{p,cr}(M)$ by bisection: at $M = 0.73$, left $-0.629$, right $-0.662$; at $0.74$, left $-0.639$, right $-0.626$. The root is $M_{cr} = 0.737$. Kármán–Tsien gives $0.723$.
:::
:::

::: exercise Korn for a conventional section {level=2 check="0.69"}
Estimate the drag-divergence Mach number of an unswept NACA six-series section, $12$ per cent thick, at $c_l = 0.6$. (Enter $M_{dd}$.)
::: solution
$M_{dd} = 0.87 - 0.12 - 0.6/10 = 0.69$. A supercritical section ($\kappa_A = 0.95$) would give $0.77$.
:::
:::

::: exercise Local Mach number from the pressure coefficient {level=3 check="1.09"}
On a wing at $M_\infty = 0.7$ the measured pressure coefficient at the suction peak is $C_p = -1.0$. Assuming isentropic flow up to that point, find the local Mach number, and say whether the flow there is supercritical. (Enter the local Mach number.)
::: solution
$p/p_\infty = 1 + \tfrac12\gamma M_\infty^2C_p = 1 - 0.343 = 0.657$. Isentropically, $1 + 0.2M^2 = (1 + 0.2 \times 0.49)(p_\infty/p)^{1/3.5} = 1.098 \times 1.1275 = 1.238$, so $M = \sqrt{1.19} = 1.09$. The flow is locally supersonic (consistent with $C_p = -1.0 < C_{p,cr} = -0.78$), and a shock must terminate the supersonic region somewhere behind the peak; at a local Mach number below about $1.2$–$1.3$ that shock is weak enough to leave a turbulent boundary layer attached.
:::
:::

::: exercise Choosing sweep and thickness {level=3}
A new regional jet is to cruise at $M = 0.78$ with section lift coefficients around $0.55$, using supercritical sections. Use the Korn–Mason equation to tabulate the thickness ratio that gives $M_{dd} = M_\text{cruise} + 0.02$ for sweeps of $0$, $15$, $20$ and $25^\circ$. Discuss what else should decide the sweep (structural weight, maximum lift and field performance, stall behaviour, span and aspect ratio), and justify a choice.
::: solution
With $M_{dd} = 0.80$, $\kappa_A = 0.95$, $c_l = 0.55$: $t/c = \cos^2\Lambda\left(0.95/\cos\Lambda - 0.055/\cos^3\Lambda - 0.80\right)$. $\Lambda = 0$: $t/c = 0.95 - 0.055 - 0.80 = 0.095$. $\Lambda = 15^\circ$ ($\cos = 0.9659$): $0.9330(0.9835 - 0.0610 - 0.80) = 0.114$. $\Lambda = 20^\circ$ ($0.9397$): $0.8830(1.0110 - 0.0663 - 0.80) = 0.128$. $\Lambda = 25^\circ$ ($0.9063$): $0.8214(1.0482 - 0.0739 - 0.80) = 0.143$. A good answer recognises that more sweep allows thicker (lighter, more fuel volume) sections but costs span-wise structural length, reduces $C_{L,\max}$ and lift slope (longer runways or more complex flaps), and worsens tip stall; that a regional jet values short-field performance and low structural weight; and therefore chooses a moderate sweep around $20$–$25^\circ$ with $t/c \approx 0.12$–$0.14$ averaged over the span, to be refined with transonic CFD and wind-tunnel tests. Any consistent, well-argued choice is acceptable.
:::
:::
