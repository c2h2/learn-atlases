A tensile test gives a handful of numbers: the yield strength $S_y$, the ultimate tensile strength $S_{ut}$, perhaps the compressive strength $S_{uc}$. A machine part is almost never loaded like a tensile specimen: the surface of a crankshaft carries bending and torsion together, the wall of a hydraulic cylinder hoop tension, axial tension and radial compression. A failure theory is the bridge between the two: a rule that reduces the full stress state at a point to one number that can be compared with a strength measured in simple tension.

No single rule works for every material, because materials fail in different ways. A ductile metal fails, in the design sense, when it yields: a shaft takes a permanent bend, a bolt stretches. Yielding is slip on crystal planes, driven by shear and almost unaffected by hydrostatic pressure, so the theories for ductile materials are built on shear stress or on the energy of distortion. A brittle material such as grey cast iron or a ceramic fractures with little yielding, from flaws opened by tensile stress; its compressive strength may be three or four times its tensile strength, and its theories must reflect that asymmetry.

This lesson treats static loads; fluctuating loads lead to fatigue ([[machine-design/fatigue]]), which builds on the results here. The stress analysis itself — principal stresses, maximum shear stress, Mohr's circle — is assumed from [[mechanics-of-materials/stress-transformation]].

Conventions: tensile stress is positive. The three principal stresses are ordered $\sigma_1 \ge \sigma_2 \ge \sigma_3$. In plane stress, following Budynas and Nisbett (*Shigley's Mechanical Engineering Design*), the two in-plane principal stresses are called $\sigma_A$ and $\sigma_B$ with $\sigma_A \ge \sigma_B$; the third principal stress is zero, and it may be the largest, the smallest or the middle one of the three. The factor of safety is $n$, the von Mises stress $\sigma'$.

## Strength, stress and the factor of safety

Strength and stress are different kinds of quantity, although both are measured in pascals. Stress is a property of the loaded part at a point and follows from the loads and the geometry. Strength is a property of the material, measured on specimens ($S_y$ usually by the 0.2 % offset), and it is statistical: a handbook value is a typical or specified minimum value, and the actual bar lies somewhere in a distribution around it.

::: definition Factor of safety and design factor {#def-safety}
Let $\sigma$ be a stress (or an equivalent stress from a failure theory) at the critical point of a part, and $S$ the corresponding strength. When the stress is proportional to the load, the **factor of safety** is
$$
n = \frac{S}{\sigma} = \frac{\text{load that would cause failure}}{\text{applied load}} .
$$ {#eq-n}
The **design factor** $n_d$ is the value of $n$ that the designer (or a code) requires before the design is accepted. A design is acceptable when $n \ge n_d$; sizing a part means choosing its dimensions so that $\sigma = S/n_d$.
:::

The two forms of [[#eq-n]] agree only when stress is linear in load. Contact stress grows as the cube root of the load and a column buckles at a load unrelated to its strength; there the factor of safety must be defined on the load.

What should $n_d$ be? It has to cover what the analysis does not know exactly: scatter in strength; uncertainty in the loads, including overloads and misuse; approximations in the stress analysis and in the failure theory; deterioration by corrosion or wear; and the consequences of failure — a cracked lawnmower handle and a cracked crane hook do not deserve the same margin. Juvinall and Marshek give a structured way of weighing these factors, and Budynas and Nisbett treat the stochastic approach, which combines the strength and stress distributions into a reliability. In practice the most important source is the governing code or standard, which encodes a profession's experience with that class of product.

::: remark An example of a code margin
For instance, in the ASME Boiler and Pressure Vessel Code, Section VIII, Division 1, the basic allowable stress at room temperature for most steels is the smaller of $S_{ut}/3.5$ and $\tfrac23 S_y$; the margin of 3.5 on tensile strength replaced a margin of 4.0 in the 1999 Addenda. Such a number belongs with the code's own material specifications, formulas, fabrication, inspection and pressure test; it is not transferable to another product. Pressure vessels, lifting equipment and other safety-critical products are designed to the current edition of their code and checked by qualified engineers. This lesson teaches the principles behind such codes and is not a substitute for any of them.
:::

::: definition Ductile and brittle behaviour {#def-ductile}
For static design a material is treated as **ductile** if its true strain at fracture $\varepsilon_f$ is at least about $0.05$ and it has an identifiable yield strength, usually nearly the same in tension and compression ($S_{yt} \approx S_{yc} = S_y$). Its design strength is $S_y$, because yielding is already failure. A material with $\varepsilon_f < 0.05$ is treated as **brittle**: it has no useful yield strength and is characterised by its ultimate strengths in tension and compression, $S_{ut}$ and $S_{uc}$, with $S_{uc}$ often several times $S_{ut}$. (The 5 % boundary is the convention used by Budynas and Nisbett.)
:::

Ductility is not fixed by the material's name: a low-carbon steel may fracture in a brittle manner below its transition temperature, at a sharp crack or under impact ([[materials-science/failure]]). Classify for the conditions of service.

## Stress concentration under static load

The elementary formulas $\sigma = P/A$, $\sigma = Mc/I$ and $\tau = Tr/J$ assume that the cross-section changes slowly. At a hole, fillet, groove or keyway the lines of force crowd around the discontinuity and the local stress rises above the elementary value.

::: definition Theoretical stress-concentration factor {#def-kt}
At a geometric discontinuity, the **theoretical (geometric) stress-concentration factor** is
$$
K_t = \frac{\sigma_{\max}}{\sigma_0}, \qquad K_{ts} = \frac{\tau_{\max}}{\tau_0},
$$ {#eq-kt}
where $\sigma_{\max}$ is the largest elastic stress at the discontinuity and $\sigma_0$ the **nominal stress** given by the elementary formula on a stated section — usually the net section through the discontinuity. $K_t$ depends only on the geometry and the type of loading, not on the material, as long as the material is linear-elastic.
:::

Two exact elasticity solutions anchor the charts. A small circular hole in a wide plate under uniaxial tension $\sigma_0$ has $\sigma_{\max} = 3\sigma_0$ at the sides of the hole (Kirsch's solution). An elliptical hole with semi-axis $a$ perpendicular to the load and $b$ parallel to it has (Inglis's solution)
$$
K_t = 1 + \frac{2a}{b} ,
$$ {#eq-inglis}
which returns $3$ for a circle and grows without bound as the ellipse flattens into a crack — the point at which stress concentration hands over to fracture mechanics. For the geometries of machine parts — shoulders, grooves, transverse holes in shafts — designers use charts compiled from photoelastic tests and numerical analysis, the standard collection being *Peterson's Stress Concentration Factors* (Pilkey and Pilkey, 3rd edition 2008), with a selection in the appendices of Budynas and Nisbett. The single most important rule when reading a chart is to compute $\sigma_0$ on the same section that the chart uses.

### When to apply $K_t$ in static design

$K_t$ is an elastic result. What happens when the peak stress reaches the strength depends on the material.

In a ductile material the small region at the notch root yields first. Its stress cannot rise much further, so additional load is carried by the still-elastic material around it, and the yielded zone grows until the whole net section has yielded. The load that makes the part unserviceable — gross yielding of the net section — is close to $S_y$ times the net area, independent of $K_t$. So in static loading of ductile materials **the stress-concentration factor is usually not applied**: the check is $\sigma_0 \le S_y/n_d$ on the net section.

In a brittle material there is no such redistribution: when the peak stress reaches $S_{ut}$ a crack starts and runs, so **$K_t$ is applied** to the nominal stress: the check is $K_t\sigma_0 \le S_{ut}/n_d$.

The rule has exceptions in both directions, and they matter:

- Grey cast iron is brittle but notch-insensitive: its graphite flakes are internal stress raisers far sharper than any machined fillet, so Budynas and Nisbett advise against applying $K_t$ to it in static loading.
- A ductile material behaves in a brittle way at low temperature, at high loading rates, or when the notch is a crack; then the peak stress (for a crack, the stress-intensity factor of [[solid-mechanics/fracture-mechanics]]) governs.
- If the part's function does not tolerate even local yielding — a sealing face, a locating surface — $K_t$ applies.
- Under fluctuating load local yielding does not protect the part; the fatigue lesson applies a factor $K_f$ even to ductile materials.

::: example A plate with a hole, ductile and brittle {#ex-hole}
A flat bar $60\ \mathrm{mm}$ wide and $10\ \mathrm{mm}$ thick has a central transverse hole of diameter $12\ \mathrm{mm}$ and carries a static axial load $P = 60\ \mathrm{kN}$. For $d/w = 0.2$, a chart for a finite-width plate with a central hole gives $K_t = 2.5$ based on the net-section stress. Find the factor of safety (a) if the bar is a ductile steel with $S_y = 300\ \mathrm{MPa}$; (b) if it is a brittle material with $S_{ut} = 400\ \mathrm{MPa}$ that is not notch-insensitive.
::: solution
Net area $A_{\text{net}} = (w - d)t = (60 - 12)(10) = 480\ \mathrm{mm^2}$, so the nominal stress is
$$
\sigma_0 = \frac{P}{A_{\text{net}}} = \frac{60\,000\ \mathrm{N}}{480\ \mathrm{mm^2}} = 125\ \mathrm{MPa},
$$
and the elastic peak stress at the sides of the hole is $\sigma_{\max} = K_t\sigma_0 = 2.5 \times 125 = 312.5\ \mathrm{MPa}$.

(a) Ductile steel. The peak exceeds $S_y = 300\ \mathrm{MPa}$, so the edge of the hole has yielded locally — but the bar has not failed. Local yield first occurs at $P = S_yA_{\text{net}}/K_t = 300 \times 480/2.5 = 57.6\ \mathrm{kN}$; the net section yields completely only at $P = S_yA_{\text{net}} = 300 \times 480 = 144\ \mathrm{kN}$. The static factor of safety against gross yielding is
$$
n = \frac{S_y}{\sigma_0} = \frac{300}{125} = 2.4 .
$$

(b) Brittle material. A crack starts when the peak reaches $S_{ut}$:
$$
n = \frac{S_{ut}}{K_t\sigma_0} = \frac{400}{312.5} = 1.28 .
$$

Sanity check: the gross-section stress $P/(wt) = 100\ \mathrm{MPa}$ is below the net-section stress, as it must be. The ductile bar has almost twice the margin of the brittle one, although the brittle material is stronger.
:::
:::

::: warning Nominal stress on the wrong section, and $K_t$ used twice
A $K_t$ read from a chart is meaningful only with the nominal stress it was defined with. Using the gross-section stress with a net-section chart (or the reverse) can be off by the ratio of the areas — $20\ \%$ in [[#ex-hole]] and much more for large holes. A second recurring mistake is to multiply by $K_t$ and then also use a "notch-reduced" strength, or to apply $K_t$ to a stress that already came from a finite-element model that resolved the notch: an FE peak stress already *is* $K_t\sigma_0$.
:::

## The maximum-shear-stress theory

In a tensile test of mild steel the slip bands (Lüders bands) appear at about $45^\circ$ to the axis, on the planes of maximum shear stress. That suggests the simplest hypothesis: yielding starts when the maximum shear stress reaches its value in a tensile specimen at yield.

::: proposition Maximum-shear-stress (Tresca) criterion {#prop-tresca}
Assume that yielding of an isotropic ductile material begins when the largest shear stress at a point reaches the value it has in a tensile specimen at yield. Then yielding begins when
$$
\sigma_1 - \sigma_3 = S_y ,
$$ {#eq-tresca}
and the factor of safety is $n = S_y/(\sigma_1 - \sigma_3)$. The shear yield strength predicted by the theory is $S_{sy} = 0.5\,S_y$. In plane stress, with $\sigma_A \ge \sigma_B$ the in-plane principal stresses,
$$
n = \begin{cases} S_y/\sigma_A, & \sigma_A \ge \sigma_B \ge 0, \\ S_y/(\sigma_A - \sigma_B), & \sigma_A \ge 0 \ge \sigma_B, \\ -S_y/\sigma_B, & 0 \ge \sigma_A \ge \sigma_B. \end{cases}
$$ {#eq-tresca-plane}
:::

::: proof
For a state with principal stresses $\sigma_1 \ge \sigma_2 \ge \sigma_3$, the three Mohr's circles have radii $(\sigma_1 - \sigma_2)/2$, $(\sigma_2 - \sigma_3)/2$ and $(\sigma_1 - \sigma_3)/2$, and the largest shear stress on any plane through the point is the radius of the largest circle, $\tau_{\max} = (\sigma_1 - \sigma_3)/2$ ([[mechanics-of-materials/stress-transformation]]). In a tensile specimen at yield the principal stresses are $S_y, 0, 0$, so $\tau_{\max} = S_y/2$. Equating the two gives [[#eq-tresca]]. Because both $\tau_{\max}$ and $\sigma_1 - \sigma_3$ scale linearly with the load, the factor of safety is the ratio $S_y/(\sigma_1 - \sigma_3)$. In pure shear $\tau$ the principal stresses are $\tau, 0, -\tau$, so $\sigma_1 - \sigma_3 = 2\tau$ and yield occurs at $\tau = S_y/2$.

For plane stress the principal stresses are $\sigma_A$, $\sigma_B$ and $0$. If both in-plane stresses are positive, $\sigma_1 = \sigma_A$ and $\sigma_3 = 0$; if they have opposite signs, $\sigma_1 = \sigma_A$ and $\sigma_3 = \sigma_B$; if both are negative, $\sigma_1 = 0$ and $\sigma_3 = \sigma_B$. Substituting into $n = S_y/(\sigma_1 - \sigma_3)$ gives the three cases of [[#eq-tresca-plane]]. The assumptions are isotropy, equal yield strengths in tension and compression, and no effect of the intermediate principal stress or of hydrostatic stress.
:::

In the $(\sigma_A, \sigma_B)$ plane the criterion is a hexagon with vertices at $(S_y, 0)$, $(S_y, S_y)$, $(0, S_y)$ and their negatives: square in the first and third quadrants, a straight line from uniaxial tension to uniaxial compression in the second and fourth.

::: example A thin-walled air receiver {#ex-vessel}
A closed cylindrical compressed-air receiver of mean radius $r = 300\ \mathrm{mm}$ works at a gauge pressure $p = 1.5\ \mathrm{MPa}$. It is to be made of a steel with $S_y = 250\ \mathrm{MPa}$, and for this exercise take $n_d = 3$ against yield. Find the wall thickness by the maximum-shear-stress theory, and show what happens if the designer uses the maximum *in-plane* shear stress instead.
::: solution
Thin-wall stresses ([[mechanics-of-materials/stress-transformation]]): hoop $\sigma_\theta = pr/t$, axial $\sigma_z = pr/2t$; the radial stress varies from $-p$ at the inner surface to $0$ at the outer and is small compared with the others, so take $\sigma_r \approx 0$. The principal stresses are therefore $\sigma_1 = pr/t$, $\sigma_2 = pr/2t$, $\sigma_3 = 0$ — both in-plane stresses are positive.

By [[#eq-tresca]], $\sigma_1 - \sigma_3 = pr/t = S_y/n_d$:
$$
t = \frac{p\,r\,n_d}{S_y} = \frac{1.5 \times 300 \times 3}{250} = 5.4\ \mathrm{mm}.
$$
The maximum in-plane shear stress is $(\sigma_\theta - \sigma_z)/2 = pr/4t$, half the true maximum $pr/2t$, which acts on planes at $45^\circ$ through the thickness. Equating $pr/4t$ to $S_y/(2n_d)$ would give $t = 2.7\ \mathrm{mm}$ — a factor of safety of $1.5$ instead of $3$.

Sanity check: in the first quadrant Tresca depends on the larger principal stress only, so $t$ is set by the hoop stress alone. A real air receiver is designed to its pressure-vessel code (in Europe EN 13445 or, for simple vessels, EN 286-1; elsewhere often ASME VIII-1), whose formulas include joint efficiencies and corrosion allowances.
:::
:::

## The distortion-energy theory

The maximum-shear-stress theory ignores the intermediate principal stress. Tests on thin-walled tubes under combined tension and torsion show that it matters a little: for most ductile metals the yield points fall on a smooth curve just outside the Tresca hexagon. That curve follows from an argument about energy. An elastically loaded solid stores strain energy, partly in changing its volume and partly in changing its shape. A hydrostatic stress changes only the volume, and metals sustain enormous hydrostatic pressures without yielding (Bridgman's experiments). The distortion-energy theory therefore proposes that yielding begins when the energy of distortion alone reaches its value in a tensile specimen at yield.

::: proposition Volumetric and distortion strain energy {#prop-energy}
For an isotropic linear-elastic material with Young's modulus $E$ and Poisson's ratio $\nu$, the strain energy per unit volume under principal stresses $\sigma_1, \sigma_2, \sigma_3$ splits into a volumetric part and a distortion part, $u = u_v + u_d$, with $\sigma_{av} = (\sigma_1 + \sigma_2 + \sigma_3)/3$ and
$$
u_v = \frac{3(1 - 2\nu)}{2E}\,\sigma_{av}^2, \qquad u_d = \frac{1 + \nu}{3E}\left[\frac{(\sigma_1 - \sigma_2)^2 + (\sigma_2 - \sigma_3)^2 + (\sigma_3 - \sigma_1)^2}{2}\right].
$$ {#eq-ud}
:::

::: proof
In principal axes the strain energy density is $u = \tfrac12(\sigma_1\varepsilon_1 + \sigma_2\varepsilon_2 + \sigma_3\varepsilon_3)$, and Hooke's law gives $\varepsilon_1 = [\sigma_1 - \nu(\sigma_2 + \sigma_3)]/E$ and its cyclic permutations. Write each principal stress as the mean stress plus a deviatoric part, $\sigma_i = \sigma_{av} + s_i$, where $s_1 + s_2 + s_3 = 0$. Substituting into Hooke's law,
$$
\varepsilon_i = \frac{(1 - 2\nu)\sigma_{av}}{E} + \frac{s_i - \nu(s_j + s_k)}{E} = \frac{(1 - 2\nu)\sigma_{av}}{E} + \frac{(1 + \nu)s_i}{E},
$$
using $s_j + s_k = -s_i$. So the strain also splits into an equal-in-all-directions part $\varepsilon_{av} = (1 - 2\nu)\sigma_{av}/E$, which changes the volume, and a part $e_i = (1 + \nu)s_i/E$, whose sum is zero and which therefore changes only the shape. Then
$$
2u = \sum_i (\sigma_{av} + s_i)(\varepsilon_{av} + e_i) = 3\sigma_{av}\varepsilon_{av} + \varepsilon_{av}\sum_i s_i + \sigma_{av}\sum_i e_i + \sum_i s_ie_i .
$$
The two middle sums vanish because $\sum s_i = 0$ and $\sum e_i = 0$: the mean stress does no work on the change of shape and the deviatoric stress none on the change of volume. Hence $u = u_v + u_d$ with
$$
u_v = \tfrac32\sigma_{av}\varepsilon_{av} = \frac{3(1 - 2\nu)}{2E}\sigma_{av}^2, \qquad u_d = \frac12\sum_i s_ie_i = \frac{1 + \nu}{2E}\sum_i s_i^2 .
$$
Finally, $\sum_i s_i^2 = \sum_i \sigma_i^2 - 3\sigma_{av}^2$, and expanding shows that this equals $\tfrac13\left[(\sigma_1 - \sigma_2)^2 + (\sigma_2 - \sigma_3)^2 + (\sigma_3 - \sigma_1)^2\right]$: both sides are $\tfrac23(\sigma_1^2 + \sigma_2^2 + \sigma_3^2 - \sigma_1\sigma_2 - \sigma_2\sigma_3 - \sigma_3\sigma_1)$. Substituting gives [[#eq-ud]]. The assumptions are linear elasticity and isotropy, the conditions under which the split is exact.
:::

In a tensile specimen at yield the bracket in [[#eq-ud]] equals $S_y^2$, so $u_d = (1 + \nu)S_y^2/(3E)$. Equating the general $u_d$ to this value, the elastic constants cancel and the criterion involves only stresses.

::: definition Von Mises stress {#def-vm}
The **von Mises stress** (or effective stress, or equivalent stress) is
$$
\sigma' = \sqrt{\frac{(\sigma_1 - \sigma_2)^2 + (\sigma_2 - \sigma_3)^2 + (\sigma_3 - \sigma_1)^2}{2}} ,
$$ {#eq-vm}
or, in terms of the stress components in any $xyz$ axes,
$$
\sigma' = \sqrt{\tfrac12\left[(\sigma_x - \sigma_y)^2 + (\sigma_y - \sigma_z)^2 + (\sigma_z - \sigma_x)^2 + 6(\tau_{xy}^2 + \tau_{yz}^2 + \tau_{zx}^2)\right]} .
$$ {#eq-vm-xyz}
In plane stress these reduce to
$$
\sigma' = \sqrt{\sigma_A^2 - \sigma_A\sigma_B + \sigma_B^2} = \sqrt{\sigma_x^2 - \sigma_x\sigma_y + \sigma_y^2 + 3\tau_{xy}^2} .
$$ {#eq-vm-plane}
The **distortion-energy (von Mises) criterion** states that yielding begins when $\sigma' = S_y$; the factor of safety is $n = S_y/\sigma'$.
:::

The two forms in [[#eq-vm-plane]] agree because $\sigma'$ is an invariant of the stress tensor ([[#ex-ratio]] checks it directly). The $xyz$ form needs no principal stresses, which is why finite-element programs can plot $\sigma'$ as a single field. Since $\sigma'$ is homogeneous of degree one in the stresses, $n = S_y/\sigma'$ is a factor on the load as well as on the stress.

### Octahedral shear stress

The distortion-energy theory is also called the octahedral-shear-stress theory, for the following reason.

::: proposition Octahedral shear stress {#prop-oct}
On the eight planes whose normals make equal angles with the three principal directions (the faces of an octahedron), the normal stress is $\sigma_{av}$ and the shear stress is
$$
\tau_{\text{oct}} = \frac13\sqrt{(\sigma_1 - \sigma_2)^2 + (\sigma_2 - \sigma_3)^2 + (\sigma_3 - \sigma_1)^2} = \frac{\sqrt2}{3}\,\sigma' .
$$ {#eq-oct}
Hence the criterion "yield when $\tau_{\text{oct}}$ reaches its value in a tensile test" is identical to the von Mises criterion.
:::

::: proof
In principal axes take the unit normal $\mathbf{n} = (1, 1, 1)/\sqrt3$ (the other seven differ only in signs, which give the same results). The traction on the plane is $\mathbf{t} = (\sigma_1, \sigma_2, \sigma_3)/\sqrt3$. Its normal component is $\sigma_n = \mathbf{t}\cdot\mathbf{n} = (\sigma_1 + \sigma_2 + \sigma_3)/3 = \sigma_{av}$, and the shear component follows from $\tau^2 = \lvert\mathbf{t}\rvert^2 - \sigma_n^2$:
$$
\tau_{\text{oct}}^2 = \frac{\sigma_1^2 + \sigma_2^2 + \sigma_3^2}{3} - \sigma_{av}^2 = \frac13\sum_i s_i^2 = \frac19\left[(\sigma_1 - \sigma_2)^2 + (\sigma_2 - \sigma_3)^2 + (\sigma_3 - \sigma_1)^2\right],
$$
using the identity from the proof of [[#prop-energy]]. Comparing with [[#eq-vm]], the square bracket is $2\sigma'^2$, so $\tau_{\text{oct}} = \sqrt2\,\sigma'/3$. Because the factor $\sqrt2/3$ is a constant, any criterion of the form $\tau_{\text{oct}} = \text{const}$, calibrated in a tensile test, is $\sigma' = S_y$.
:::

### Yield in shear

In pure shear $\tau$ the principal stresses are $\tau, 0, -\tau$, and [[#eq-vm]] gives $\sigma' = \sqrt{(\tau^2 + \tau^2 + 4\tau^2)/2} = \sqrt3\,\tau$. Yield occurs at $\tau = S_y/\sqrt3$, so the distortion-energy theory predicts a shear yield strength
$$
S_{sy} = \frac{S_y}{\sqrt3} = 0.577\,S_y ,
$$ {#eq-ssy}
against $0.5\,S_y$ from the maximum-shear-stress theory. Combined-stress tests on ductile metals generally lie closer to the distortion-energy prediction than to the maximum-shear-stress one, which is the main reason the distortion-energy theory is preferred when an accurate prediction is wanted.

### Comparing the two theories

In the $(\sigma_A, \sigma_B)$ plane the von Mises criterion $\sigma_A^2 - \sigma_A\sigma_B + \sigma_B^2 = S_y^2$ is an ellipse with its major axis along $\sigma_A = \sigma_B$, passing through the six vertices of the Tresca hexagon, which lies inside it. The largest difference is in pure shear, where the predicted shear strengths differ by the factor $0.577/0.5 = 1.155$. For any three-dimensional stress state, $\sigma'$ lies between $(\sqrt3/2)(\sigma_1 - \sigma_3)$ and $(\sigma_1 - \sigma_3)$ ([[#ex-ratio]]), so the two theories never differ by more than about 15 %, and Tresca is always the more conservative.

::: widget parametric
fx: if(t <= 2*pi, cos(t) + sin(t)/sqrt(3), if(t <= 2*pi + 1, 1, if(t <= 2*pi + 2, 2*pi + 2 - t, if(t <= 2*pi + 3, -c*(t - 2*pi - 2), if(t <= 2*pi + 4, -c, if(t <= 2*pi + 5, -c + c*(t - 2*pi - 4), t - 2*pi - 5))))))
fy: if(t <= 2*pi, cos(t) - sin(t)/sqrt(3), if(t <= 2*pi + 1, 2*pi + 1 - t, if(t <= 2*pi + 2, -c*(t - 2*pi - 1), if(t <= 2*pi + 3, -c, if(t <= 2*pi + 4, -c + c*(t - 2*pi - 3), if(t <= 2*pi + 5, t - 2*pi - 4, 1))))))
t: 0, 2*pi + 6
x: -3.3, 1.6
y: -3.3, 1.6
sliders: c=1:1:3:0.05
trace: false
equal: true
caption: Failure loci in the $(\sigma_A/S_t, \sigma_B/S_t)$ plane, drawn as one closed path: first the von Mises ellipse (for $S_t = S_c$), then, starting from the shared vertex $(1, 1)$, the hexagon of the ductile Coulomb–Mohr criterion with $c = S_c/S_t$. At $c = 1$ the hexagon is the Tresca hexagon, inscribed in the ellipse and touching it at six points; the gap between them is widest on the pure-shear diagonal $\sigma_B = -\sigma_A$. Increase $c$: the first-quadrant square is unchanged (failure there depends on tension only), the third-quadrant square grows to $-c$, and the second- and fourth-quadrant edges swing outward, so a state of pure shear can be carried further — the shear strength $S_tS_c/(S_t + S_c)$, in units of $S_t$, rises from $0.5$ at $c = 1$ to $0.75$ at $c = 3$.
:::

::: example A shaft in bending and torsion {#ex-shaft}
A solid steel shaft of diameter $d = 40\ \mathrm{mm}$ carries a bending moment $M = 1.0\ \mathrm{kN\,m}$ and a torque $T = 0.75\ \mathrm{kN\,m}$, both steady. The steel has $S_y = 400\ \mathrm{MPa}$. Find the factor of safety against yield at the critical surface point by the maximum-shear-stress and distortion-energy theories.
::: solution
At the top or bottom of the section the bending stress is greatest and the torsional shear stress is at its surface value:
$$
\sigma_x = \frac{32M}{\pi d^3} = \frac{32 \times 1.0\times10^{6}\ \mathrm{N\,mm}}{\pi \times 40^3\ \mathrm{mm^3}} = 159.2\ \mathrm{MPa}, \qquad \tau_{xy} = \frac{16T}{\pi d^3} = \frac{16 \times 0.75\times10^{6}}{\pi \times 40^3} = 59.7\ \mathrm{MPa}.
$$
Principal stresses (with $\sigma_y = 0$):
$$
\sigma_{A,B} = \frac{\sigma_x}{2} \pm \sqrt{\left(\frac{\sigma_x}{2}\right)^2 + \tau_{xy}^2} = 79.6 \pm 99.5\ \mathrm{MPa}, \quad \sigma_A = 179.0\ \mathrm{MPa},\ \sigma_B = -19.9\ \mathrm{MPa}.
$$
They have opposite signs, so by [[#eq-tresca-plane]] $\sigma_1 - \sigma_3 = \sigma_A - \sigma_B = 198.9\ \mathrm{MPa}$ and
$$
n_{\text{MSS}} = \frac{400}{198.9} = 2.01 .
$$
Distortion energy, from the $xy$ form of [[#eq-vm-plane]]:
$$
\sigma' = \sqrt{\sigma_x^2 + 3\tau_{xy}^2} = \sqrt{159.2^2 + 3 \times 59.7^2} = 189.8\ \mathrm{MPa}, \qquad n_{\text{DE}} = \frac{400}{189.8} = 2.11 .
$$
Sanity check: the ratio $n_{\text{DE}}/n_{\text{MSS}} = 1.05$ lies between $1$ and $1.155$, as it must. In shaft form, $\sigma_1 - \sigma_3 = \tfrac{16}{\pi d^3}\sqrt{4M^2 + 4T^2}$ and $\sigma' = \tfrac{16}{\pi d^3}\sqrt{4M^2 + 3T^2}$, the static part of the equations in [[machine-design/shafts]].
:::
:::

::: quiz
A ductile steel component is loaded so that the in-plane principal stresses are $\sigma_A = 200\ \mathrm{MPa}$ and $\sigma_B = 200\ \mathrm{MPa}$ (equal biaxial tension, $\sigma_3 = 0$). Which statement is correct?
- [ ] Tresca predicts yield at a lower load than von Mises, because the maximum in-plane shear stress is zero.
- [x] Both theories give $n = S_y/200\ \mathrm{MPa}$.
- [ ] Von Mises predicts $n = S_y/(200\sqrt3)$.
- [ ] Neither theory predicts yield, because there is no shear stress in the plane.
::: solution
The principal stresses are $200, 200, 0\ \mathrm{MPa}$. Tresca: $\sigma_1 - \sigma_3 = 200\ \mathrm{MPa}$. Von Mises: $\sigma' = \sqrt{200^2 - 200 \times 200 + 200^2} = 200\ \mathrm{MPa}$. Equal biaxial tension is a vertex where the hexagon touches the ellipse. The in-plane shear is zero, but the shear stress on planes at $45^\circ$ to the surface is $100\ \mathrm{MPa}$ — the out-of-plane Mohr's circle governs.
:::
:::

## Unequal strengths in tension and compression: Coulomb–Mohr

Both theories so far assume equal strengths in tension and compression. Some ductile materials — certain magnesium and cast aluminium alloys, many polymers — are stronger in compression, and brittle materials much more so. Mohr's idea was to use the test data directly: each test taken to failure is drawn as its Mohr's circle at failure, and the envelope of those circles is the failure boundary. A stress state is safe if its largest Mohr's circle (through $\sigma_1$ and $\sigma_3$) lies inside the envelope; $\sigma_2$ plays no part. With only a tensile and a compressive test, the simplest envelope is a pair of straight lines tangent to both circles — the Coulomb–Mohr theory, which has the geometry of Coulomb's criterion for the shear failure of soil and masonry.

::: proposition Coulomb–Mohr criterion {#prop-cm}
Let failure in uniaxial tension occur at $S_t$ and in uniaxial compression at $S_c$ (both positive numbers), and assume that the failure envelope in the Mohr plane is the pair of straight lines tangent to the tension and compression circles. Then a state with principal stresses $\sigma_1 \ge \sigma_2 \ge \sigma_3$ fails when
$$
\frac{\sigma_1}{S_t} - \frac{\sigma_3}{S_c} = 1 ,
$$ {#eq-cm}
for states whose largest Mohr's circle spans the origin ($\sigma_1 \ge 0 \ge \sigma_3$), which includes every plane-stress state. In plane stress, with $\sigma_A \ge 0 \ge \sigma_B$, the factor of safety follows from $\dfrac{\sigma_A}{S_t} - \dfrac{\sigma_B}{S_c} = \dfrac1n$; when both in-plane stresses are positive $n = S_t/\sigma_A$, and when both are negative $n = -S_c/\sigma_B$. The shear strength is
$$
S_{s} = \frac{S_tS_c}{S_t + S_c} .
$$ {#eq-cm-shear}
:::

::: proof
A Mohr's circle through $\sigma_1$ and $\sigma_3$ has centre $C = (\sigma_1 + \sigma_3)/2$ on the $\sigma$ axis and radius $R = (\sigma_1 - \sigma_3)/2$. A circle with its centre on the axis touches a given straight line when its radius equals the distance from its centre to the line. That distance is a linear function of the centre's position $C$ (for centres on the same side of the line), so the circles that just touch the upper envelope line — and by symmetry the lower one — satisfy a linear relation $R = aC + b$.

The tension circle has $C = S_t/2$, $R = S_t/2$; the compression circle has $C = -S_c/2$, $R = S_c/2$. Both touch the envelope by construction:
$$
\frac{S_t}{2} = a\frac{S_t}{2} + b, \qquad \frac{S_c}{2} = -a\frac{S_c}{2} + b .
$$
Subtracting, $a = \dfrac{S_t - S_c}{S_t + S_c}$, and then $b = \dfrac{S_t}{2}(1 - a) = \dfrac{S_tS_c}{S_t + S_c}$. A general circle fails when $R = aC + b$:
$$
\frac{\sigma_1 - \sigma_3}{2} = a\,\frac{\sigma_1 + \sigma_3}{2} + b \;\Longleftrightarrow\; (1 - a)\sigma_1 - (1 + a)\sigma_3 = 2b .
$$
With $1 - a = 2S_c/(S_t + S_c)$ and $1 + a = 2S_t/(S_t + S_c)$, multiplying through by $(S_t + S_c)/2$ gives $S_c\sigma_1 - S_t\sigma_3 = S_tS_c$, which is [[#eq-cm]]. Scaling the stresses by $n$ gives the factor-of-safety form. In plane stress one principal stress is zero, so $\sigma_1 \ge 0 \ge \sigma_3$ always holds: if $\sigma_A \ge \sigma_B \ge 0$ then $\sigma_1 = \sigma_A$, $\sigma_3 = 0$ and [[#eq-cm]] gives $\sigma_A = S_t/n$; if $0 \ge \sigma_A \ge \sigma_B$ then $\sigma_1 = 0$, $\sigma_3 = \sigma_B$ and it gives $\sigma_B = -S_c/n$; otherwise $\sigma_1 = \sigma_A$, $\sigma_3 = \sigma_B$. (For three-dimensional states with all three principal stresses of one sign the straight envelope would be extrapolated beyond the calibration circles, and design practice caps the criterion at $\sigma_1 = S_t$ or $\sigma_3 = -S_c$.) Pure shear $\tau$ has $\sigma_1 = \tau$, $\sigma_3 = -\tau$, so $\tau(1/S_t + 1/S_c) = 1$, which is [[#eq-cm-shear]]. The assumptions are isotropy, proportional loading, a straight envelope between the two calibration circles, and no influence of $\sigma_2$.
:::

With $S_t = S_c = S_y$ the criterion reduces exactly to the maximum-shear-stress theory, so it is a generalisation of Tresca to unequal strengths. For a ductile material with $S_{yt} \ne S_{yc}$ it is used with $S_t = S_{yt}$ and $S_c = S_{yc}$ and is called the ductile Coulomb–Mohr (DCM) theory; for a brittle material it is used with the ultimate strengths and called the brittle Coulomb–Mohr (BCM) theory.

::: example A part with unequal tensile and compressive yield strengths {#ex-dcm}
A ductile alloy has $S_{yt} = 200\ \mathrm{MPa}$ and $S_{yc} = 400\ \mathrm{MPa}$. At the critical point of a part, $\sigma_x = 80\ \mathrm{MPa}$, $\sigma_y = 0$ and $\tau_{xy} = 60\ \mathrm{MPa}$. Find the factor of safety by the ductile Coulomb–Mohr theory, and compare with Tresca using the tensile yield strength.
::: solution
Principal stresses:
$$
\sigma_{A,B} = 40 \pm \sqrt{40^2 + 60^2} = 40 \pm 72.1\ \mathrm{MPa}, \qquad \sigma_A = 112.1\ \mathrm{MPa},\ \sigma_B = -32.1\ \mathrm{MPa}.
$$
They have opposite signs, so by [[#prop-cm]]
$$
\frac1n = \frac{\sigma_A}{S_{yt}} - \frac{\sigma_B}{S_{yc}} = \frac{112.1}{200} + \frac{32.1}{400} = 0.561 + 0.080 = 0.641, \qquad n = 1.56 .
$$
Tresca with $S_y = S_{yt} = 200\ \mathrm{MPa}$ gives $n = 200/(112.1 + 32.1) = 1.39$, which ignores the extra compressive strength and is conservative.

Sanity check: as $S_{yc} \to \infty$, $n$ would tend to $S_{yt}/\sigma_A = 1.78$ and never exceed it.
:::
:::

## Brittle materials

For a brittle material the design strengths are $S_{ut}$ and $S_{uc}$, and three criteria are in use. They agree in the first and third quadrants of the $(\sigma_A, \sigma_B)$ plane and differ in the fourth, where one principal stress is tensile and the other compressive — the quadrant of torsion.

The **maximum-normal-stress theory** (often attributed to Rankine) says that fracture occurs when the largest tensile principal stress reaches $S_{ut}$ or the largest compressive principal stress reaches $-S_{uc}$:
$$
n = \min\left(\frac{S_{ut}}{\sigma_A},\ \frac{S_{uc}}{-\sigma_B}\right) \quad\text{(terms with the wrong sign omitted)}.
$$ {#eq-mns}
In the fourth quadrant its locus is a rectangle that ignores the interaction of tension and compression; test data fall inside it, so it is unconservative there and not recommended for design.

The **brittle Coulomb–Mohr theory** is [[#prop-cm]] with $S_t = S_{ut}$, $S_c = S_{uc}$: in the fourth quadrant, $\sigma_A/S_{ut} - \sigma_B/S_{uc} = 1/n$, a straight line from $(S_{ut}, 0)$ to $(0, -S_{uc})$. It is conservative.

The **modified-Mohr theory** is an empirical boundary drawn to fit biaxial fracture data for grey cast iron, which lie between the other two. Budynas and Nisbett (*Shigley's Mechanical Engineering Design*, chapter 5) give it as follows. With $\sigma_A \ge \sigma_B$ the in-plane principal stresses,
$$
\begin{aligned}
&\sigma_A \ge \sigma_B \ge 0, \text{ or } \sigma_A \ge 0 \ge \sigma_B \text{ with } \lvert\sigma_B/\sigma_A\rvert \le 1: && n = \frac{S_{ut}}{\sigma_A}, \\
&\sigma_A \ge 0 \ge \sigma_B \text{ with } \lvert\sigma_B/\sigma_A\rvert > 1: && \frac1n = \frac{(S_{uc} - S_{ut})\,\sigma_A}{S_{uc}S_{ut}} - \frac{\sigma_B}{S_{uc}}, \\
&0 \ge \sigma_A \ge \sigma_B: && n = -\frac{S_{uc}}{\sigma_B}.
\end{aligned}
$$ {#eq-mm}
In the fourth quadrant the modified-Mohr locus follows the maximum-normal-stress line $\sigma_A = S_{ut}$ down to the pure-shear line $\sigma_B = -\sigma_A$, at the point $(S_{ut}, -S_{ut})$, and then runs straight to $(0, -S_{uc})$. It is a design rule calibrated on cast iron, not a consequence of a physical model, and it should not be extrapolated to brittle materials whose biaxial behaviour has not been tested.

::: widget plot
f: if(x >= -Suc, Sut, 0/0); if(x >= -Suc, Sut*(1 + x/Suc), 0/0); if(x >= -Sut, Sut, if(x >= -Suc, Sut*(Suc + x)/(Suc - Sut), 0/0)); if(x >= -Sut, -x, 0/0)
x: -1300, 0
y: 0, 450
sliders: Sut=200:100:400:10; Suc=700:400:1200:10
labels: \text{maximum normal stress}; \text{brittle Coulomb–Mohr}; \text{modified Mohr}; \sigma_B = -\sigma_A
caption: The fourth quadrant for a brittle material: tensile principal stress $\sigma_A$ (vertical, MPa) against compressive principal stress $\sigma_B$ (horizontal, MPa). A state is safe below the chosen curve; for proportional loading the factor of safety is the distance from the origin to the curve along the load line, divided by the distance to the stress point. Start with $S_{ut} = 200$, $S_{uc} = 700\ \mathrm{MPa}$, typical of a grey cast iron. On the pure-shear line ($\sigma_B = -\sigma_A$) the modified-Mohr and maximum-normal-stress loci coincide at $\sigma_A = S_{ut}$, while brittle Coulomb–Mohr allows only $S_{ut}S_{uc}/(S_{ut} + S_{uc}) = 156\ \mathrm{MPa}$. Raise $S_{uc}$: the Coulomb–Mohr line approaches the maximum-normal-stress rectangle. Lower it towards $S_{ut}$: the Coulomb–Mohr line becomes the Tresca line, while the modified-Mohr locus stays on the rectangle — a reminder that it is a fit to cast iron, not a theory.
:::

::: example A grey-iron bracket under two load cases {#ex-castiron}
A grey cast-iron part has $S_{ut} = 200\ \mathrm{MPa}$ and $S_{uc} = 700\ \mathrm{MPa}$. Its critical point carries (case 1) $\sigma_x = 20\ \mathrm{MPa}$, $\tau_{xy} = 50\ \mathrm{MPa}$, and (case 2) $\sigma_x = -120\ \mathrm{MPa}$, $\tau_{xy} = 50\ \mathrm{MPa}$, with $\sigma_y = 0$ in both. The point is at a fillet with $K_t = 1.6$. Find the factor of safety in each case by the brittle Coulomb–Mohr, modified-Mohr and maximum-normal-stress theories.
::: solution
Grey iron is notch-insensitive in static loading, so $K_t$ is not applied.

Case 1: $\sigma_{A,B} = 10 \pm \sqrt{10^2 + 50^2} = 10 \pm 51.0$, so $\sigma_A = 61.0\ \mathrm{MPa}$, $\sigma_B = -41.0\ \mathrm{MPa}$, with $\lvert\sigma_B/\sigma_A\rvert = 0.67 \le 1$.
$$
\text{BCM: } \frac1n = \frac{61.0}{200} + \frac{41.0}{700} = 0.305 + 0.059 = 0.364,\ n = 2.75; \qquad \text{MM and MNS: } n = \frac{200}{61.0} = 3.28 .
$$
Case 2: $\sigma_{A,B} = -60 \pm \sqrt{60^2 + 50^2} = -60 \pm 78.1$, so $\sigma_A = 18.1\ \mathrm{MPa}$, $\sigma_B = -138.1\ \mathrm{MPa}$, with $\lvert\sigma_B/\sigma_A\rvert = 7.6 > 1$.
$$
\text{BCM: } \frac1n = \frac{18.1}{200} + \frac{138.1}{700} = 0.0905 + 0.1973 = 0.288,\ n = 3.47 ;
$$
$$
\text{MM: } \frac1n = \frac{(700 - 200)(18.1)}{700 \times 200} + \frac{138.1}{700} = 0.0647 + 0.1973 = 0.262,\ n = 3.82 ;
$$
$$
\text{MNS: } n = \min\left(\frac{200}{18.1}, \frac{700}{138.1}\right) = \min(11.0, 5.07) = 5.07 .
$$
Sanity check: in both cases BCM $\le$ MM $\le$ MNS, the expected order in the fourth quadrant. In case 2 the maximum-normal-stress theory claims a margin about $33\ \%$ larger than the modified-Mohr fit to cast-iron data.
:::
:::

::: warning Do not use the maximum-normal-stress theory for ductile parts, or Tresca for brittle ones
For a ductile material in pure torsion the maximum-normal-stress theory predicts failure at $\tau = S_y$, while yield starts at about $0.58\,S_y$: it overestimates the torsional strength by about 70 %. Conversely, Tresca with $S_y$ replaced by $S_{ut}$ throws away a brittle material's compressive strength. Choose the theory by the failure mechanism — yielding or fracture — and when service conditions make a ductile part brittle, switch to a fracture analysis.
:::

## Choosing and applying a theory

The following procedure is essentially the one recommended by Budynas and Nisbett.

::: algorithm Static failure analysis of a part {#alg-static}
1. Identify the critical points (largest elementary stresses, discontinuities) and compute the stress components there for the largest expected loads.
2. Classify the material for the service conditions (temperature, loading rate, presence of cracks): ductile if $\varepsilon_f \ge 0.05$ with a defined yield strength, otherwise brittle ([[#def-ductile]]).
3. Stress concentration: for a brittle, notch-sensitive material multiply the nominal stresses by $K_t$; for a ductile material (and for grey cast iron) use nominal stresses, unless local yielding is itself unacceptable.
4. Find the principal stresses (or, for von Mises, use the $xyz$ form directly).
5. Ductile material:
   - if $S_{yt} \approx S_{yc}$: use the distortion-energy theory for an accurate estimate, or the maximum-shear-stress theory for a simpler, conservative one;
   - if $S_{yt} \ne S_{yc}$: use ductile Coulomb–Mohr.
6. Brittle material: use modified Mohr if the material is a grey cast iron or similar for which it has been validated, otherwise brittle Coulomb–Mohr (conservative).
7. Compute $n$ at every critical point; the smallest governs and must be at least the $n_d$ of the applicable code or standard. To size a part, solve the criterion with $n = n_d$, round up to a standard size, and recheck.
:::

The procedure has two limits. It assumes a continuum without cracks: if the part may contain a crack-like flaw — a weld defect, a forging lap, a fatigue crack — its strength is governed by fracture toughness and flaw size, and the analysis belongs to [[solid-mechanics/fracture-mechanics]]; high-strength steels and aluminium alloys in thick sections are the usual cases. And it covers static loads only: any varying load — a rotating shaft under steady bending is fully reversed at every surface point — must be checked for fatigue ([[machine-design/fatigue]]), which nearly always governs moving parts.

The codes for specific products make their own choices among these theories. ASME Section VIII, Division 2, for example, based its design-by-analysis rules on the maximum-shear-stress theory ("stress intensity", $\sigma_1 - \sigma_3$) until it was rewritten for the 2007 edition, which adopted the von Mises equivalent stress. Where a code prescribes a criterion, use the code's criterion with the code's margins.

::: history
Charles-Augustin Coulomb presented his *Essai sur une application des règles de maximis et minimis à quelques problèmes de statique, relatifs à l'architecture* to the French Academy of Sciences in 1773 (published 1776); its analysis of shear failure of masonry and soil against friction is the origin of the straight-line criterion that bears his name. Henri Tresca's 1864 memoir to the Academy on the flow of solids under high pressure (*Mémoire sur l'écoulement des corps solides soumis à de fortes pressions*) led to the maximum-shear-stress criterion, and J. J. Guest's tests on tubes under combined loads, published in 1900 in the *Philosophical Magazine* as "On the strength of ductile materials under combined stress", made it the engineer's standard rule for ductile metals, so that it is often called the Tresca–Guest criterion. In the same year Otto Mohr, in the *Zeitschrift des Vereines deutscher Ingenieure*, proposed using the envelope of Mohr's circles at failure as the failure criterion. Maksymilian Tytus Huber proposed a criterion based on the energy of distortion in a Polish paper of 1904; Richard von Mises reached the same expression independently in 1913, in the *Göttinger Nachrichten*, and Heinrich Hencky gave its interpretation as distortion strain energy in 1924. G. I. Taylor and H. Quinney's tests on thin tubes of copper, aluminium and mild steel under combined tension and torsion, published in the *Philosophical Transactions of the Royal Society* (1931), showed that the von Mises criterion fits ductile metals better than Tresca's.
:::

::: quiz
A ductile steel plate with a central hole ($K_t = 2.7$) carries a static tensile load that gives a net-section stress of $0.5\,S_y$. Which conclusion is correct?
- [ ] The plate has failed, because $K_t\sigma_0 = 1.35\,S_y > S_y$.
- [x] A small zone at the hole has yielded, but the factor of safety against gross yielding of the net section is $2$.
- [ ] The factor of safety is $1/1.35 = 0.74$.
- [ ] Stress concentration never matters for ductile materials.
::: solution
Local yielding at the hole redistributes the stress to the rest of the net section, which yields completely only when $\sigma_0 = S_y$. So $n = S_y/\sigma_0 = 2$ for static loading. The last option is wrong: the same notch would matter at low temperature, under fatigue loading, or if local yielding were unacceptable for the part's function.
:::
:::

::: summary
- $n = S/\sigma$ when stress is proportional to load; the design factor $n_d$ comes from the governing code or a reasoned assessment of uncertainties and consequences.
- Classify the material for its service conditions: ductile ($\varepsilon_f \ge 0.05$, design on $S_y$) or brittle ($S_{ut}$, $S_{uc}$).
- $K_t = \sigma_{\max}/\sigma_0$ with $\sigma_0$ on the chart's section. In static loading apply it to notch-sensitive brittle materials, not to ductile materials (local yielding redistributes load) or grey cast iron.
- Maximum shear stress (Tresca): $n = S_y/(\sigma_1 - \sigma_3)$; in plane stress remember that $\sigma = 0$ is a principal stress. $S_{sy} = 0.5\,S_y$.
- Distortion energy (von Mises): $\sigma' = \sqrt{\sigma_A^2 - \sigma_A\sigma_B + \sigma_B^2} = \sqrt{\sigma_x^2 - \sigma_x\sigma_y + \sigma_y^2 + 3\tau_{xy}^2}$, $n = S_y/\sigma'$; equivalent to a critical octahedral shear stress; $S_{sy} = 0.577\,S_y$. It and Tresca differ by at most 15.5 %.
- Coulomb–Mohr: $\sigma_1/S_t - \sigma_3/S_c = 1/n$ — Tresca generalised to unequal strengths, used for ductile materials with $S_{yt} \ne S_{yc}$ and, with ultimate strengths, for brittle ones.
- Brittle materials: maximum normal stress is unconservative in the tension–compression quadrant; brittle Coulomb–Mohr is conservative; modified Mohr fits grey cast iron.
- Cracks call for fracture mechanics, varying loads for fatigue analysis.
:::

## Exercises

::: exercise Von Mises factor of safety {level=1 check="3"}
At a point in a steel part, $\sigma_x = 60\ \mathrm{MPa}$, $\sigma_y = -20\ \mathrm{MPa}$ and $\tau_{xy} = 20\ \mathrm{MPa}$ (plane stress). The steel has $S_y = 240\ \mathrm{MPa}$. Find the factor of safety by the distortion-energy theory. (Enter $n$.)
::: solution
$$
\sigma' = \sqrt{\sigma_x^2 - \sigma_x\sigma_y + \sigma_y^2 + 3\tau_{xy}^2} = \sqrt{3600 + 1200 + 400 + 1200} = \sqrt{6400} = 80\ \mathrm{MPa},
$$
so $n = 240/80 = 3$. (Tresca: $\sigma_{A,B} = 20 \pm 44.7\ \mathrm{MPa}$, $\sigma_A - \sigma_B = 89.4\ \mathrm{MPa}$, $n = 2.68$ — lower, as always.)
:::
:::

::: exercise Allowable shear stress in a torsion bar {level=1 check="60"}
A shaft in pure torsion is made of steel with $S_y = 300\ \mathrm{MPa}$. With a design factor of $2.5$, find the largest allowable shear stress by the maximum-shear-stress theory. (Enter it in MPa.)
::: solution
Tresca: $S_{sy} = 0.5\,S_y = 150\ \mathrm{MPa}$, so $\tau_{\text{all}} = 150/2.5 = 60\ \mathrm{MPa}$. Distortion energy would allow $0.577 \times 300/2.5 = 69.3\ \mathrm{MPa}$.
:::
:::

::: exercise A notched bar of a brittle material {level=1 check="2"}
A bar of a notch-sensitive brittle material with $S_{ut} = 300\ \mathrm{MPa}$ has a groove with $K_t = 2.0$, and the nominal tensile stress at the groove is $75\ \mathrm{MPa}$. Find the factor of safety against fracture. (Enter $n$.)
::: solution
For a brittle, notch-sensitive material $K_t$ is applied: $\sigma_{\max} = 2.0 \times 75 = 150\ \mathrm{MPa}$, and $n = 300/150 = 2$. If the bar were a ductile steel with $S_y = 300\ \mathrm{MPa}$, the static factor of safety would be $300/75 = 4$.
:::
:::

::: exercise Net-section yield of a ductile bar {level=2 check="2"}
A ductile steel bar $50\ \mathrm{mm}$ wide and $8\ \mathrm{mm}$ thick has a central hole of diameter $10\ \mathrm{mm}$ and carries a static tensile load of $40\ \mathrm{kN}$. The steel has $S_y = 250\ \mathrm{MPa}$, and the chart gives $K_t = 2.5$ for the hole. Find the static factor of safety against yielding of the net section. (Enter $n$.)
::: solution
$A_{\text{net}} = (50 - 10)(8) = 320\ \mathrm{mm^2}$; $\sigma_0 = 40\,000/320 = 125\ \mathrm{MPa}$. For a ductile material under static load, $K_t$ is not applied: $n = 250/125 = 2$. The elastic peak $312.5\ \mathrm{MPa}$ exceeds $S_y$: a small zone at the hole yields, harmless for a static load.
:::
:::

::: exercise Shear strength by Coulomb–Mohr {level=2 check="144"}
A ductile material has $S_{yt} = 240\ \mathrm{MPa}$ and $S_{yc} = 360\ \mathrm{MPa}$. Find its shear yield strength predicted by the ductile Coulomb–Mohr theory. (Enter it in MPa.)
::: solution
By [[#eq-cm-shear]], $S_{sy} = S_{yt}S_{yc}/(S_{yt} + S_{yc}) = 240 \times 360/600 = 144\ \mathrm{MPa}$. Check: $144/240 + 144/360 = 0.6 + 0.4 = 1$.
:::
:::

::: exercise Wall thickness of a pressure vessel {level=2 check="7.5"}
A closed thin-walled cylindrical vessel of mean radius $500\ \mathrm{mm}$ carries an internal gauge pressure of $1.8\ \mathrm{MPa}$. With $S_y = 300\ \mathrm{MPa}$ and $n_d = 2.5$, find the required wall thickness by the maximum-shear-stress theory, neglecting the radial stress. (Enter it in mm.)
::: solution
Principal stresses $pr/t$, $pr/2t$, $0$; Tresca: $\sigma_1 - \sigma_3 = pr/t = S_y/n_d$, so $t = 1.8 \times 500 \times 2.5/300 = 7.5\ \mathrm{mm}$. Von Mises: $\sigma' = \sqrt{\sigma_\theta^2 - \sigma_\theta\sigma_z + \sigma_z^2} = (\sqrt3/2)\,pr/t$, giving $t = 6.50\ \mathrm{mm}$.
:::
:::

::: exercise Cast iron in the fourth quadrant {level=2 check="14/3"}
A grey cast iron has $S_{ut} = 200\ \mathrm{MPa}$ and $S_{uc} = 700\ \mathrm{MPa}$. At a point, $\sigma_A = 20\ \mathrm{MPa}$ and $\sigma_B = -100\ \mathrm{MPa}$. Find the factor of safety by the modified-Mohr theory. (Enter $n$; an exact fraction is accepted.)
::: solution
$\lvert\sigma_B/\sigma_A\rvert = 5 > 1$, so the second line of [[#eq-mm]] applies:
$$
\frac1n = \frac{(700 - 200)(20)}{700 \times 200} + \frac{100}{700} = \frac{1}{14} + \frac{2}{14} = \frac{3}{14}, \qquad n = \frac{14}{3} = 4.67 .
$$
Brittle Coulomb–Mohr gives $1/n = 0.1 + 0.143 = 0.243$, $n = 4.12$; maximum normal stress gives $\min(10, 7) = 7$.
:::
:::

::: exercise Tresca and von Mises never differ by more than 15.5 % {#ex-ratio level=3}
(a) Show directly that $\sigma_A^2 - \sigma_A\sigma_B + \sigma_B^2 = \sigma_x^2 - \sigma_x\sigma_y + \sigma_y^2 + 3\tau_{xy}^2$ when $\sigma_{A,B}$ are the in-plane principal stresses. (b) For a general state $\sigma_1 \ge \sigma_2 \ge \sigma_3$, write $\sigma_2 = \sigma_3 + \lambda(\sigma_1 - \sigma_3)$ with $0 \le \lambda \le 1$ and show that $\sigma' = (\sigma_1 - \sigma_3)\sqrt{1 - \lambda + \lambda^2}$. (c) Deduce that $\tfrac{\sqrt3}{2}(\sigma_1 - \sigma_3) \le \sigma' \le \sigma_1 - \sigma_3$, and identify the states at each bound.
::: solution
(a) Let $C = (\sigma_x + \sigma_y)/2$ and $R^2 = \bigl((\sigma_x - \sigma_y)/2\bigr)^2 + \tau_{xy}^2$, so $\sigma_{A,B} = C \pm R$. Then $\sigma_A^2 - \sigma_A\sigma_B + \sigma_B^2 = (\sigma_A + \sigma_B)^2 - 3\sigma_A\sigma_B = 4C^2 - 3(C^2 - R^2) = C^2 + 3R^2$. Expanding, $C^2 + 3R^2 = \tfrac14(\sigma_x + \sigma_y)^2 + \tfrac34(\sigma_x - \sigma_y)^2 + 3\tau_{xy}^2 = \sigma_x^2 - \sigma_x\sigma_y + \sigma_y^2 + 3\tau_{xy}^2$.

(b) With $D = \sigma_1 - \sigma_3$: $\sigma_1 - \sigma_2 = (1 - \lambda)D$, $\sigma_2 - \sigma_3 = \lambda D$, $\sigma_3 - \sigma_1 = -D$. By [[#eq-vm]], $\sigma'^2 = \tfrac12 D^2\left[(1 - \lambda)^2 + \lambda^2 + 1\right] = D^2(1 - \lambda + \lambda^2)$.

(c) On $[0, 1]$, $1 - \lambda + \lambda^2$ has its minimum $\tfrac34$ at $\lambda = \tfrac12$ and its maximum $1$ at $\lambda = 0$ and $\lambda = 1$. So $\sigma'/(\sigma_1 - \sigma_3)$ lies between $\sqrt3/2 = 0.866$ and $1$. The lower bound is reached when $\sigma_2$ is midway between $\sigma_1$ and $\sigma_3$ — pure shear plus any hydrostatic stress — where Tresca predicts $1/0.866 = 1.155$ times the von Mises stress. The upper bound is reached when $\sigma_2$ equals $\sigma_1$ or $\sigma_3$: uniaxial stress and equal biaxial stress (plus any hydrostatic stress), the vertices of the hexagon.
:::
:::

::: exercise Size a crank shaft section {level=3}
A short steel shaft section is loaded by a steady bending moment of $400\ \mathrm{N\,m}$ and a steady torque of $300\ \mathrm{N\,m}$. The steel is ductile with $S_y = 420\ \mathrm{MPa}$, and the design factor is $n_d = 2.5$. (a) Find the minimum diameter by the distortion-energy theory and by the maximum-shear-stress theory. (b) Choose a diameter and find its factor of safety. (c) The section is next to a shoulder with $K_t = 1.7$. Discuss whether this changes the static design, and what else must be checked before the shaft is accepted.
::: solution
(a) At the surface $\sigma_x = 32M/\pi d^3$, $\tau_{xy} = 16T/\pi d^3$, and $\sigma' = \tfrac{16}{\pi d^3}\sqrt{4M^2 + 3T^2}$. Setting $\sigma' = S_y/n_d$:
$$
d^3 = \frac{16\,n_d\sqrt{4M^2 + 3T^2}}{\pi S_y} = \frac{16 \times 2.5 \times \sqrt{4(400\times10^3)^2 + 3(300\times10^3)^2}}{\pi \times 420} = \frac{16 \times 2.5 \times 9.539\times10^{5}}{1319.5} = 2.892\times10^{4}\ \mathrm{mm^3},
$$
so $d = 30.7\ \mathrm{mm}$. Tresca replaces $3T^2$ by $4T^2$ and gives $d = 31.2\ \mathrm{mm}$.

(b) Take $d = 32\ \mathrm{mm}$: $\sigma_x = 124.3\ \mathrm{MPa}$, $\tau_{xy} = 46.6\ \mathrm{MPa}$, $\sigma' = \sqrt{124.3^2 + 3 \times 46.6^2} = 148.3\ \mathrm{MPa}$, $n = 420/148.3 = 2.83$ (Tresca: $2.70$). A $30\ \mathrm{mm}$ shaft would give $n = 2.33$, below $n_d$.

(c) Statically, the shoulder's $K_t$ is not applied to ductile steel. But if the shaft rotates, the steady moment gives fully reversed bending at every surface point, so the design must be checked for fatigue ([[machine-design/fatigue]], [[machine-design/shafts]]), where the fillet's notch factor will probably govern and call for a larger diameter or fillet radius. Deflection and slope at bearings and gears, critical speed, keyways and peak start-up or overload torques must also be checked, with $n_d$ from the applicable standard or company practice.
:::
:::
