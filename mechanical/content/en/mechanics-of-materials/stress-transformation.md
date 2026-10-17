Inside a loaded beam, a pressurised shell or a welded joint, the material is rarely pulled in one direction. It is pulled one way and sheared another, and on a plane tilted through the point the combination produces a normal stress larger than either component and a shear stress larger than either component. Almost every failure surface you have ever photographed — the $45^{\circ}$ cone on a mild-steel tensile test, the helical crack on a torsioned cast-iron bar, the diagonal crack in a concrete beam, the fish-mouth on a fatigue specimen — is a plane on which one of these transformed stresses reached a critical value.

The whole subject is one equation, or equivalently one circle. Given $\sigma_x$, $\sigma_y$ and $\tau_{xy}$ on two perpendicular planes, the stresses on a plane at angle $\theta$ are
$$
\sigma_{x'} = \frac{\sigma_x + \sigma_y}{2} + \frac{\sigma_x - \sigma_y}{2} \cos 2 \theta + \tau_{xy} \sin 2 \theta, \qquad
\tau_{x'y'} = - \frac{\sigma_x - \sigma_y}{2} \sin 2 \theta + \tau_{xy} \cos 2 \theta ,
$$
and Mohr's circle is nothing but a picture of those two equations as $\theta$ runs from $0$ to $180^{\circ}. Learn the circle and you can answer, in five seconds and without algebra, what the maximum normal stress is, on what plane, what the maximum shear is, and what the stresses are on a weld at $37^{\circ}$ to the axis.

::: warning Sign conventions differ, and Mohr's circle is where they bite
The transformation equations above use the **continuum mechanics** convention: tensile normal stress positive, and $\tau_{xy}$ positive when it acts in the $+ y$ direction on the $+ x$ face. Mohr's circle construction requires you to decide whether a clockwise shear is plotted up or down, and textbooks split roughly evenly. Pick one convention, use it always, and if you are reading a result from someone else's circle, verify it against the algebraic formula for one angle before trusting the rest. The **magnitudes** of the principal stresses and of the maximum shear never depend on the convention; only the sign of the plotted shear and the sense of the angle do.
:::

## The transformation equations

::: definition Plane stress transformation {#def-transformation}
For a state of plane stress $(\sigma_x, \sigma_y, \tau_{xy})$, the stresses on a plane whose normal is at angle $\theta$ counter-clockwise from the $x$-axis are
$$
\sigma_{x'} = \frac{\sigma_x + \sigma_y}{2} + \frac{\sigma_x - \sigma_y}{2} \cos 2\theta + \tau_{xy} \sin 2\theta ,
$$
$$
\tau_{x'y'} = - \frac{\sigma_x - \sigma_y}{2} \sin 2\theta + \tau_{xy} \cos 2\theta ,
\qquad
\sigma_{y'} = \sigma_x + \sigma_y - \sigma_{x'} .
$$
Two invariants hold for every $\theta$:
$$
\sigma_{x'} + \sigma_{y'} = \sigma_x + \sigma_y = \text{constant}, \qquad
\left( \sigma_{x'} - \sigma_{\text{avg}} \right)^{2} + \tau_{x'y'}^{2} = R^{2} .
$$
:::

::: proof
Cut a prismatic element by a plane at angle $\theta$ and isolate the wedge whose inclined face has area $A$. The two other faces have areas $A \cos \theta$ and $A \sin \theta$. Resolve the forces on those faces along the inclined normal and along the inclined plane:
$$
\sigma_{x'} A = \sigma_x (A \cos \theta) \cos \theta + \sigma_y (A \sin \theta) \sin \theta
+ \tau_{xy} (A \cos \theta) \sin \theta + \tau_{xy} (A \sin \theta) \cos \theta ,
$$
$$
\tau_{x'y'} A = - \sigma_x (A \cos \theta) \sin \theta + \sigma_y (A \sin \theta) \cos \theta
+ \tau_{xy} (A \cos \theta) \cos \theta - \tau_{xy} (A \sin \theta) \sin \theta .
$$
Using $\cos^{2} \theta = (1 + \cos 2 \theta) / 2$, $\sin^{2} \theta = (1 - \cos 2 \theta) / 2$ and $2 \sin \theta \cos \theta = \sin 2 \theta$ gives the two transformation equations. The first invariant follows by adding $\sigma_{x'}$ and $\sigma_{y'}$; the second by squaring and adding, since $\cos^{2} 2 \theta + \sin^{2} 2 \theta = 1$.
:::

::: theorem Principal stresses and maximum shear {#thm-principal}
The **principal stresses**, the extreme normal stresses, occur on planes where the shear vanishes and have values
$$
\sigma_{1,2} = \frac{\sigma_x + \sigma_y}{2} \pm \sqrt{\left( \frac{\sigma_x - \sigma_y}{2} \right)^{2} + \tau_{xy}^{2}}
= \sigma_{\text{avg}} \pm R ,
$$
at an orientation
$$
\tan 2 \theta_p = \frac{2 \tau_{xy}}{\sigma_x - \sigma_y} .
$$
The **maximum in-plane shear stress** is the radius of the circle,
$$
\tau_{\max, \text{in-plane}} = R = \frac{\sigma_1 - \sigma_2}{2},
$$
on planes at $45^{\circ}$ to the principal planes, where the normal stress is $\sigma_{\text{avg}}$.
:::

::: example Principal stresses {#ex-principal}
At a point $\sigma_x = 80\ \mathrm{MPa}$, $\sigma_y = - 40\ \mathrm{MPa}$, $\tau_{xy} = 30\ \mathrm{MPa}$. Find the principal stresses and their orientations, the maximum in-plane shear, and the stresses on a plane at $25^{\circ}$.
::: solution
$$
\sigma_{\text{avg}} = \frac{80 - 40}{2} = 20\ \mathrm{MPa}, \qquad
R = \sqrt{60^{2} + 30^{2}} = 67.1\ \mathrm{MPa},
$$
$$
\sigma_1 = 87.1\ \mathrm{MPa}, \qquad \sigma_2 = - 47.1\ \mathrm{MPa}.
$$
**Orientation.**
$$
\tan 2 \theta_p = \frac{2 \times 30}{80 + 40} = 0.500
\quad\Longrightarrow\quad
\theta_p = 13.3^{\circ} \text{ and } 103.3^{\circ}.
$$
**Maximum in-plane shear.**
$$
\tau_{\max} = 67.1\ \mathrm{MPa}, \qquad
\sigma_{\text{on that plane}} = 20\ \mathrm{MPa}, \qquad
\theta_s = 13.3 + 45 = 58.3^{\circ}.
$$
**At $25^{\circ}$**, with $2 \theta = 50^{\circ}$:
$$
\sigma_{x'} = 20 + 60 \cos 50 + 30 \sin 50 = 20 + 38.6 + 23.0 = 81.6\ \mathrm{MPa},
$$
$$
\tau_{x'y'} = - 60 \sin 50 + 30 \cos 50 = - 46.0 + 19.3 = - 26.7\ \mathrm{MPa}.
$$
*Check.* $\sigma_{x'} + \sigma_{y'} = 40 = \sigma_x + \sigma_y$ requires $\sigma_{y'} = - 41.6\ \mathrm{MPa}$, and
$$
(81.6 - 20)^{2} + 26.7^{2} = 3794 + 713 = 4507 = 67.1^{2} . \checkmark
$$
The point lies on the circle, as it must.

*Sanity.* Note that the maximum normal stress, $87.1\ \mathrm{MPa}$, is $9$ per cent above the largest applied component and $9$ per cent below the arithmetic sum — a state of stress that looks like $80$ and $- 40$ is really a state of $87$ and $- 47$ acting on planes nobody drew. This is why a pressure vessel's longitudinal weld, which carries no load in the axial direction, still has to be checked: the stress on it is the hoop stress, which is the larger of the two principal stresses.
:::
:::

::: widget plot
f: sqrt(67.08^2-(x-20)^2)
x: -47.1, 87.1
y: 0, 68
labels: \text{shear stress (MPa)}
caption: Upper half of Mohr's circle for Example 1: centre at $\sigma_{\text{avg}} = 20\ \mathrm{MPa}$, radius $R = 67.1\ \mathrm{MPa}$, cutting the horizontal axis at the principal stresses $87.1$ and $- 47.1\ \mathrm{MPa}$. The top of the circle is the maximum in-plane shear of $67.1\ \mathrm{MPa}$ acting on a plane at $58.3^{\circ}$, and the point at $25^{\circ}$ sits at $(81.6, - 26.7)$. Angles on the circle are $2 \theta$, so a $25^{\circ}$ physical rotation is a $50^{\circ}$ move round the circle — the single most common error in reading one.
:::

::: example Combined bending and torsion {#ex-shaft-element}
At the surface of a transmission shaft a section carries a bending stress of $60\ \mathrm{MPa}$ and a torsional shear of $40\ \mathrm{MPa}$. Find the principal stresses, the maximum shear and their orientations.
::: solution
Here $\sigma_x = 60\ \mathrm{MPa}$, $\sigma_y = 0$, $\tau_{xy} = 40\ \mathrm{MPa}$, so
$$
\sigma_{\text{avg}} = 30\ \mathrm{MPa}, \qquad
R = \sqrt{30^{2} + 40^{2}} = 50\ \mathrm{MPa},
$$
$$
\sigma_1 = 80\ \mathrm{MPa}, \qquad \sigma_2 = - 20\ \mathrm{MPa}, \qquad
\tau_{\max} = 50\ \mathrm{MPa},
$$
$$
\tan 2 \theta_p = \frac{2 \times 40}{60} = 1.333
\quad\Longrightarrow\quad
\theta_p = 26.6^{\circ}, \qquad \theta_s = 71.6^{\circ}.
$$
*Check.* $\sigma_1 \sigma_2 = 80 \times (-20) = -1600$ and $I_3 = \sigma_x \sigma_y - \tau_{xy}^{2} = 0 - 1600$. $\checkmark$

*Sanity.* The numbers are a $3:4:5$ triangle by construction, and that is not an accident of this example: the combination $\sigma = 60$, $\tau = 40$ is the one every shaft designer meets, because the equivalent von Mises stress is $\sqrt{\sigma^{2} + 3 \tau^{2}} = \sqrt{3600 + 4800} = 91.7\ \mathrm{MPa}$ and the maximum shear is $50\ \mathrm{MPa}$, both of which are simple multiples of the two components. Two consequences follow. First, the maximum shear, $50\ \mathrm{MPa}$, is $25$ per cent above the torsional shear alone, so a shaft carrying both bending and torsion must be sized on the combination and not on the larger of the two. Second, the principal tensile stress of $80\ \mathrm{MPa}$ acts at $26.6^\circ$ to the axis, which is why a fatigue crack in a torsioned-and-bent shaft starts as a **transverse** crack at the point of maximum bending and then turns towards $45^\circ$ as the torsion takes over — a fracture surface with two distinct regions and a classic diagnostic.
:::
:::

## Absolute maximum shear and 3-D effects

::: proposition In-plane is not the whole story {#prop-abs-shear}
The circle drawn through $\sigma_1$ and $\sigma_2$ is only one of three. The **absolute maximum shear stress** is half the difference of the largest and smallest principal stresses of all three, and for a plane-stress state with $\sigma_3 = 0$ that means
$$
\tau_{\text{abs}} = \begin{cases}
\dfrac{\sigma_1 - \sigma_2}{2} & \sigma_1, \sigma_2 \text{ of opposite sign} \\[6pt]
\dfrac{\sigma_{\max}}{2} & \sigma_1, \sigma_2 \text{ of the same sign}
\end{cases}
$$
When the two in-plane principal stresses have the **same sign**, the true maximum shear is larger than the in-plane value and acts on a plane tilted $45^{\circ}$ **out of** the plane of the stresses. A pressure vessel head, a thin disc and a biaxially loaded plate are all in this condition.
:::

::: example Pure shear and brittle failure {#ex-pure-shear}
A shaft in pure torsion has a surface shear stress of $40\ \mathrm{MPa}$. Find the principal stresses. Predict the failure surface for (a) mild steel, (b) cast iron.
::: solution
With $\sigma_x = \sigma_y = 0$ and $\tau_{xy} = 40\ \mathrm{MPa}$,
$$
\sigma_{\text{avg}} = 0, \qquad R = 40\ \mathrm{MPa}, \qquad
\sigma_1 = + 40\ \mathrm{MPa}, \quad \sigma_2 = - 40\ \mathrm{MPa},
$$
$$
\tan 2 \theta_p = \frac{2 \times 40}{0} \rightarrow \infty
\quad\Longrightarrow\quad
\theta_p = 45^{\circ}.
$$
**(a) Mild steel** yields by shear-flow sliding on planes of maximum shear, which for pure shear are the planes of zero shear — the transverse and longitudinal planes. A mild-steel shaft in torsion fails on a **flat transverse** face, and the fracture surface is bright and fibrous with the metal visibly twisted.

**(b) Cast iron** is weak in tension and fails on the plane of maximum **tension**, at $45^{\circ}$ to the axis. A cast-iron shaft in torsion fails on a clean **helical** surface at $45^{\circ}$, and the helix is right-handed or left-handed according to the sense of twist.

*Sanity.* This single demonstration — a chalk bar breaks helically in torsion and transversely in compression — is the whole of the maximum-normal-stress and maximum-shear-stress theories in one classroom experiment, and it is why the failure theory must be chosen with the material. It is also why a brittle torsion bar is dangerous, why a cast-iron brake drum cracks along a $45^{\circ}$ line from a bolt hole, and why the classic torsion test is the standard way to measure a brittle material's tensile strength without the alignment problems of a tensile specimen.
:::
:::

::: example Stresses inside a beam {#ex-beam-point}
A beam has at a certain section a bending stress of $120\ \mathrm{MPa}$ and a shear stress of $20\ \mathrm{MPa}$ at a point $40\ \mathrm{mm}$ above the neutral axis, and $80\ \mathrm{MPa}$ and $14\ \mathrm{MPa}$ at a point $20\ \mathrm{mm}$ above it. Find the principal stresses at each point and comment on where the beam is critical.
::: solution
**Point A** ($\sigma = 120$, $\tau = 20$):
$$
\sigma_{\text{avg}} = 60, \qquad R = \sqrt{60^{2} + 20^{2}} = 63.2\ \mathrm{MPa},
\qquad \sigma_1 = 123.2, \quad \sigma_2 = - 3.2\ \mathrm{MPa}.
$$
**Point B** ($\sigma = 80$, $\tau = 14$):
$$
\sigma_{\text{avg}} = 40, \qquad R = \sqrt{40^{2} + 14^{2}} = 42.4\ \mathrm{MPa},
\qquad \sigma_1 = 82.4, \quad \sigma_2 = - 2.4\ \mathrm{MPa}.
$$
**At the neutral axis** ($\sigma = 0$, $\tau = 24$ say): $\sigma_1 = + 24$, $\sigma_2 = - 24$.

*Sanity.* The maximum principal stress is at the outer fibre, where the shear is zero, and it exceeds the bending stress by only $2.7$ per cent — the shear there is nil, so the transformation barely moves anything. The maximum **shear** is at the neutral axis, where the bending stress is nil. Between them, at $40\ \mathrm{mm}$ out, the principal stress is $123.2\ \mathrm{MPa}$, only $2.7$ per cent above the pure bending value at that fibre. The lesson is that for a **slender** beam the outer-fibre bending stress is a safe and nearly exact design check, and the interior points never govern; but for a **short** beam, a beam with a large shear near a support, or a beam of a material whose shear strength is low relative to its tensile strength — timber, concrete, a composite, a glass-ceramic — the neutral-axis point where $\sigma_1 = \tau$ and $\sigma_2 = - \tau$ is a genuine $45^\circ$-crack risk, and the diagonal crack in a reinforced concrete beam near its support is exactly that point failing.
:::
:::

## Strain and its measurement

::: definition Strain transformation and the rosette {#def-rosette}
Strain transforms by the same equations with one substitution:
$$
\frac{\gamma_{x'y'}}{2} = \frac{\varepsilon_x + \varepsilon_y}{2} - \frac{\varepsilon_x - \varepsilon_y}{2} \cos 2\theta - \frac{\gamma_{xy}}{2} \sin 2\theta .
$$
Note the **minus** sign and the factor of one half — engineering shear strain $\gamma$ is twice the tensor component, which is why Mohr's strain circle is plotted with $\gamma / 2$. A rectangular $45^{\circ}$ rosette measuring $\varepsilon_0$, $\varepsilon_{45}$, $\varepsilon_{90}$ gives
$$
\varepsilon_x = \varepsilon_0, \qquad
\varepsilon_y = \varepsilon_{90}, \qquad
\gamma_{xy} = 2 \varepsilon_{45} - \varepsilon_0 - \varepsilon_{90} .
$$
For plane stress the stresses follow from Hooke's law:
$$
\sigma_1 = \frac{E \left( \varepsilon_1 + \nu \varepsilon_2 \right)}{1 - \nu^{2}}, \qquad
\sigma_2 = \frac{E \left( \varepsilon_2 + \nu \varepsilon_1 \right)}{1 - \nu^{2}} .
$$
:::

::: example Strain rosette {#ex-rosette}
A $45^{\circ}$ rosette on a steel surface reads $\varepsilon_0 = 200$, $\varepsilon_{45} = 300$, $\varepsilon_{90} = 100$ in microstrain. Take $E = 200\ \mathrm{GPa}$, $\nu = 0.3$. Find the principal stresses.
::: solution
$$
\varepsilon_x = 200, \qquad \varepsilon_y = 100, \qquad
\gamma_{xy} = 2 \times 300 - 200 - 100 = 300 \ \mu ,
$$
$$
\varepsilon_{\text{avg}} = 150, \qquad
R_\varepsilon = \sqrt{50^{2} + 150^{2}} = 158.1 \ \mu ,
$$
$$
\varepsilon_1 = 308 \ \mu, \qquad \varepsilon_2 = - 8.1 \ \mu, \qquad
\tan 2 \theta_p = \frac{300}{200 - 100} = 3.0 \Rightarrow \theta_p = 35.3^{\circ}.
$$
**Stresses.**
$$
\sigma_1 = \frac{200\,000 \left( 308 - 0.3 \times 8.1 \right) \times 10^{-6}}{1 - 0.09}
= \frac{200\,000 \times 305.6 \times 10^{-6}}{0.91} = 67.1\ \mathrm{MPa},
$$
$$
\sigma_2 = \frac{200\,000 \left( - 8.1 + 0.3 \times 308 \right) \times 10^{-6}}{0.91}
= \frac{200\,000 \times 84.3 \times 10^{-6}}{0.91} = 18.5\ \mathrm{MPa}.
$$
*Check.* The sum $\sigma_1 + \sigma_2 = 85.6\ \mathrm{MPa}$, and $E (\varepsilon_x + \varepsilon_y) / (1 - \nu) = 200\,000 \times 300 \times 10^{-6} / 0.7 = 85.7\ \mathrm{MPa}$. $\checkmark$

*Sanity.* Three strain gauges, two minutes of arithmetic, and you know the complete two-dimensional stress state at a point on a machine that is running, loaded and inaccessible. This is why experimental stress analysis is done with rosettes rather than with theory: the theory is exact and the geometry is not. The one thing the rosette cannot tell you is the **out-of-plane** strain, so if the point is near a free edge, a hole or a weld, the "plane stress" assumption behind the last two lines may be false and the stresses may be $30$ per cent out.
:::
:::

## Thin pressure vessels

::: theorem Membrane stresses in a thin vessel {#thm-vessel}
For a vessel of internal radius $r$, wall thickness $t$ and pressure $p$ with $r / t > 10$, the wall carries a uniform **membrane** stress and negligible through-thickness stress:
$$
\sigma_{\text{hoop}} = \frac{p r}{t}, \qquad
\sigma_{\text{long}} = \frac{p r}{2 t} \quad \text{(cylinder)},
\qquad
\sigma_{\text{hoop}} = \sigma_{\text{long}} = \frac{p r}{2 t} \quad \text{(sphere)}.
$$
The hoop stress is twice the longitudinal stress, so a cylindrical vessel splits **lengthways**.
:::

::: proof
**Longitudinal.** Cut the cylinder on a plane normal to its axis and balance the pressure force on the end cap against the wall force:
$$
p \pi r^{2} = \sigma_{\text{long}} \times 2 \pi r t
\quad\Longrightarrow\quad
\sigma_{\text{long}} = \frac{p r}{2 t} .
$$
**Hoop.** Cut a unit length of cylinder along a diametral plane and balance the pressure on the projected area $2 r \times 1$ against the wall force on two walls:
$$
p \times 2 r \times 1 = 2 \sigma_{\text{hoop}} t \times 1
\quad\Longrightarrow\quad
\sigma_{\text{hoop}} = \frac{p r}{t} .
$$
For the sphere, cut any hemisphere: the pressure force is $p \pi r^{2}$ and the wall force is $\sigma \times 2 \pi r t$, giving $\sigma = p r / (2 t)$ in every direction by symmetry.
:::

::: example Pressure vessel {#ex-vessel}
A cylindrical pressure vessel of $2\ \mathrm{m}$ internal diameter and $12\ \mathrm{mm}$ wall contains $2.5\ \mathrm{MPa}$. Find the two membrane stresses, the maximum shear stress in the wall, and the stress normal to a helical weld made at $30^{\circ}$ to the circumferential direction.
::: solution
$$
\sigma_{\text{hoop}} = \frac{2.5 \times 1000}{12} = 208.3\ \mathrm{MPa}, \qquad
\sigma_{\text{long}} = 104.2\ \mathrm{MPa}.
$$
**Maximum shear.** The three principal stresses are $208.3$, $104.2$ and $0$ (through the thickness). Hence
$$
\tau_{\text{in-plane}} = \frac{208.3 - 104.2}{2} = 52.1\ \mathrm{MPa}, \qquad
\tau_{\text{abs}} = \frac{208.3 - 0}{2} = 104.2\ \mathrm{MPa},
$$
and the absolute maximum acts on a plane at $45^{\circ}$ **through the thickness**, at the inner and outer surfaces.

**Helical weld.** Take $x$ as the axial direction, so $\sigma_x = 104.2$, $\sigma_y = 208.3$ and the weld line at $30^{\circ}$ to the circumferential direction is at $\theta = 60^{\circ}$ to the axis. With $\tau_{xy} = 0$,
$$
\sigma_{x'} = \frac{104.2 + 208.3}{2} + \frac{104.2 - 208.3}{2} \cos 120^{\circ}
= 156.3 + 52.1 = 208.3 \times \ldots
$$
More directly, the stress **normal** to the weld is the stress along the circumferential direction resolved onto the weld plane. With the weld normal at $30^{\circ}$ to the hoop direction,
$$
\sigma_n = \sigma_{\text{long}} \cos^{2} 30^{\circ} + \sigma_{\text{hoop}} \sin^{2} 30^{\circ}
= 104.2 \times 0.75 + 208.3 \times 0.25 = 78.2 + 52.1 = 130.3\ \mathrm{MPa},
$$
$$
\tau_{\text{weld}} = \left( \sigma_{\text{hoop}} - \sigma_{\text{long}} \right) \sin 30^{\circ} \cos 30^{\circ}
= 104.2 \times 0.433 = 45.1\ \mathrm{MPa}.
$$
*Sanity.* Three results worth carrying away. The hoop stress is twice the longitudinal, so the **longitudinal** weld — the one running along the vessel — carries twice the load of the circumferential one and must be the better weld; a vessel with an X-rayed seam and an unchecked girth weld is a vessel that will split along its length. The absolute maximum shear is twice the in-plane value and acts through the thickness, which is why a vessel's failure is a through-thickness shear problem at the inner surface when the material is ductile. And the helical weld at $30^{\circ}$ carries $130\ \mathrm{MPa}$ normal and $45\ \mathrm{MPa}$ shear, which is why spiral-seam pipes are wound at about $54^{\circ}$, where the hoop and axial loadings are shared in proportion to the strength of the two fibre directions.
:::
:::

::: warning Where Mohr's circle is not enough
Mohr's circle solves plane stress. It does not solve: **contact stresses**, where a Hertzian pressure produces a triaxial compressive state whose maximum shear lies well below the surface, which is where bearings and gear teeth actually fail; **stress concentrations**, where the principal stress directions curve round a hole and the circle is only valid at a point; **residual stresses**, which superimpose on the applied state and can be as large as the yield stress without any external load; and **non-proportional loading**, where the principal axes rotate during the cycle and the maximum-shear-plane does not, which is the reason multiaxial fatigue has no agreed criterion. In all four cases the circle is still drawn — at a point, for one instant — but the answer is not in it.
:::

::: history
The geometry of transforming a stress state is older than the concept of stress. Augustin-Louis Cauchy showed in 1822 that the traction on any plane through a point is determined by nine components and proved what is now called Cauchy's relation, and in 1828 he showed that three mutually perpendicular directions exist on which the traction is purely normal — the principal directions — and that the sum of the three normal stresses is invariant. The circle itself is due to **Christian Otto Mohr** (1835 to 1918), who published it in 1882 in a paper on the internal friction of soils and then in the second edition of his *Abhandlungen aus dem Gebiete der technischen Mechanik*; Mohr was a practical engineer who distrusted the continental elasticity school, and his graphical method was adopted with enthusiasm by a generation of engineers who preferred a ruler to a tensor. The parallel construction for strain, and the experimental culture that made it necessary, come from the engineering school of **Christian Culmann** and his Zurich students, and the strain-rosette algebra to the photoelastic and experimental school of the 1930s, whose need to interpret bonded electrical resistance gauges — invented by Edward Simmons and Arthur Ruge independently in 1938 — made the $45^{\circ}$ rosette formula a standard item of engineering arithmetic. The pressure-vessel formula is a special case of Lamé's 1852 solution and predates it: the hoop stress of a boiler was known empirically to the engineers of the 1820s, and the rule that a boiler's longitudinal seam is twice as highly loaded as its circumferential one was in the Board of Trade's boiler inspection practice before it appeared in a textbook.
:::

::: quiz
A ductile material has principal stresses of $+ 100\ \mathrm{MPa}$ and $+ 60\ \mathrm{MPa}$ in a plane, the third principal stress being zero. Does yielding begin at a lower applied stress under the **in-plane** maximum-shear criterion or the **absolute** maximum-shear criterion?
- [ ] The in-plane criterion, because it ignores the out-of-plane direction
- [ ] They predict the same onset
- [x] The absolute criterion, because the true maximum shear is larger
- [ ] Neither, because both principal stresses are tensile
::: solution
The absolute criterion. The in-plane circle gives $\tau = (100 - 60) / 2 = 20\ \mathrm{MPa}$, but the largest shear anywhere at the point is on a plane tilted $45^\circ$ out of the plane, joining $100\ \mathrm{MPa}$ to the zero through-thickness stress: $\tau_{\text{abs}} = 50\ \mathrm{MPa}$, two and a half times as large. A design checked on the in-plane circle would be non-conservative by that factor. The rule is simple: draw all three circles, and take the outermost. When the two in-plane principal stresses have the same sign, the in-plane circle is the middle one and is never the answer.
:::
:::

## Where this leads

Principal stresses are the input to every failure theory in [[machine-design/static-failure]], to the fatigue criteria of [[machine-design/fatigue]], and to the contact-stress calculation of [[machine-design/gear-design]]. The three-dimensional generalisation is in [[solid-mechanics/stress-strain-3d]], and the thick-wall case where the membrane assumption fails is in [[solid-mechanics/thick-cylinders-discs]].

::: summary
- Stresses transform with $2 \theta$, so a physical rotation of $\theta$ is a movement of $2 \theta$ round Mohr's circle; the sum of the normal stresses is invariant.
- Principal stresses are $\sigma_{\text{avg}} \pm R$ with $R = \sqrt{\left[ \left( \sigma_x - \sigma_y \right) / 2 \right]^{2} + \tau_{xy}^{2}}$, on planes where the shear vanishes.
- The maximum in-plane shear is $R$, on planes at $45^{\circ}$ to the principal planes, and it acts together with the average normal stress.
- When the two in-plane principal stresses have the same sign, the **absolute** maximum shear is $\sigma_{\max} / 2$ and acts out of plane — the pressure-vessel case.
- Strain transforms the same way with $\gamma / 2$; a $45^{\circ}$ rosette plus Hooke's law gives the full plane stress state.
- A thin cylinder has hoop stress twice the longitudinal, so it splits lengthways and its longitudinal weld is the critical one.
:::

## Exercises

::: exercise Read the circle {level=1 check="100"}
Mohr's circle for a point has its centre at $60\ \mathrm{MPa}$ and a radius of $40\ \mathrm{MPa}$. What is the larger principal stress?
::: solution
$\sigma_1 = 60 + 40 = 100\ \mathrm{MPa}$, and $\sigma_2 = 20\ \mathrm{MPa}$. The maximum in-plane shear is $40\ \mathrm{MPa}$.
:::
:::

::: exercise Principal angle {level=1 check="45"}
For what state of stress are the principal planes at $45^{\circ}$ to the $x$ and $y$ axes?
::: solution
When $\sigma_x = \sigma_y$, because $\tan 2 \theta_p = 2 \tau_{xy} / (\sigma_x - \sigma_y) \rightarrow \infty$ requires $\sigma_x = \sigma_y$. Pure shear is the special case, and it is why a torsioned shaft and a chalk bar break at $45^{\circ}$.
:::
:::

::: exercise Maximum shear {level=1 check="40"}
The principal stresses at a point are $80\ \mathrm{MPa}$ and $20\ \mathrm{MPa}$, both tensile, with the third zero. Find the absolute maximum shear stress.
::: solution
$\tau_{\text{abs}} = 80 / 2 = 40\ \mathrm{MPa}$, acting on a plane tilted $45^{\circ}$ out of the plane of the two given stresses. The in-plane value would be $30\ \mathrm{MPa}$, which is not the answer.
*Note.* The answer is $40\ \mathrm{MPa}$. This is the trap in pressure-vessel design: the in-plane circle gives $30$ and the true maximum is $40$.
:::
:::

::: exercise Transform {level=2}
For $\sigma_x = 60$, $\sigma_y = - 20$, $\tau_{xy} = - 35\ \mathrm{MPa}$, find the stresses on a plane at $30^{\circ}$.
::: solution
$\sigma_{\text{avg}} = 20$, $R = \sqrt{40^{2} + 35^{2}} = 53.2\ \mathrm{MPa}$, $\tan 2 \theta_p = - 70 / 80$.
At $2 \theta = 60^{\circ}$:
$$
\sigma_{x'} = 20 + 40 \cos 60 - 35 \sin 60 = 20 + 20.0 - 30.3 = 9.7\ \mathrm{MPa},
$$
$$
\tau_{x'y'} = - 40 \sin 60 - 35 \cos 60 = - 34.6 - 17.5 = - 52.1\ \mathrm{MPa}.
$$
*Check.* $(9.7 - 20)^{2} + 52.1^{2} = 106 + 2714 = 2820 = 53.1^{2}$. $\checkmark$
:::
:::

::: exercise Rosette {level=2}
A $45^{\circ}$ rosette reads $\varepsilon_0 = - 150$, $\varepsilon_{45} = 250$, $\varepsilon_{90} = 400$ microstrain. Find $\varepsilon_x$, $\varepsilon_y$, $\gamma_{xy}$ and the principal strains.
::: solution
$\varepsilon_x = - 150$, $\varepsilon_y = 400$,
$$
\gamma_{xy} = 2 \times 250 - ( - 150 ) - 400 = 500 + 150 - 400 = 250 \ \mu .
$$
$$
\varepsilon_{\text{avg}} = 125, \qquad
R_\varepsilon = \sqrt{275^{2} + 125^{2}} = 302 \ \mu,
$$
$$
\varepsilon_1 = 427 \ \mu, \qquad \varepsilon_2 = - 177 \ \mu .
$$
*Sanity.* The principal strains have opposite signs, so the point is in a state of nearly pure shear, and the principal directions are close to $45^{\circ}$ from gauge 1 — which the large $\varepsilon_{45}$ reading already hinted at. A rosette whose $45^{\circ}$ gauge reads highest is telling you the principal axes are near $45^{\circ}$ before you do any algebra.
:::
:::

::: exercise Pressure vessel {level=2}
A spherical gas holder of $8\ \mathrm{m}$ diameter is made from $10\ \mathrm{mm}$ plate with an allowable stress of $140\ \mathrm{MPa}$. Find the maximum pressure, and the maximum shear stress in the wall at that pressure.
::: solution
$$
p = \frac{2 \sigma t}{r} = \frac{2 \times 140 \times 10}{4000} = 0.70\ \mathrm{MPa}.
$$
The principal stresses are $140$, $140$ and $0$, so the in-plane Mohr's circle is a **point** — there is no in-plane shear at all — and
$$
\tau_{\text{abs}} = \frac{140}{2} = 70\ \mathrm{MPa},
$$
acting on planes at $45^{\circ}$ through the thickness.
*Sanity.* A sphere is the ideal pressure vessel because its membrane stress state is equibiaxial and its wall is uniformly loaded, which is why gas holders, submarine hulls and gas bottles are spherical or nearly so. It is also the worst possible case for the in-plane-versus-absolute shear trap: the in-plane circle gives zero and the true maximum is $70\ \mathrm{MPa}$, half the yield in shear for a steel yielding at $140$ in tension by Tresca.
:::
:::

::: exercise Design {level=3}
A welded steel plate of $20\ \mathrm{mm}$ thickness contains a straight fillet weld running at $55^{\circ}$ to the plate's longitudinal axis. The plate carries a uniform tensile stress of $120\ \mathrm{MPa}$ along its axis. Find the normal and shear stresses on the weld, and check them against an allowable of $160\ \mathrm{MPa}$ normal and $90\ \mathrm{MPa}$ shear.
::: solution
Take $x$ along the plate axis, so $\sigma_x = 120$, $\sigma_y = 0$, $\tau_{xy} = 0$. The weld **plane** is at $55^{\circ}$ to the axis, so its **normal** is at $\theta = 55 + 90 = 145^{\circ}$, or equivalently $\theta = 35^{\circ}$ measured from the transverse direction. Using the normal at $35^{\circ}$ to the load axis:
$$
\sigma_n = 120 \cos^{2} 35^{\circ} = 120 \times 0.671 = 80.5\ \mathrm{MPa},
$$
$$
\tau = 120 \sin 35^{\circ} \cos 35^{\circ} = 120 \times 0.470 = 56.4\ \mathrm{MPa}.
$$
Both are below the allowables of $160$ and $90$. $\checkmark$

**Worst orientation.** The shear on the weld is maximised at $45^{\circ}$, where
$$
\tau_{\max} = 120 / 2 = 60\ \mathrm{MPa}, \qquad \sigma_n = 60\ \mathrm{MPa},
$$
and the normal stress is maximised at $0^{\circ}$. A weld at $55^{\circ}$ to the axis is therefore at $81$ per cent of its shear capacity and $50$ per cent of its normal capacity.

*Design comment.* This is why a lifting-eye plate is welded with two fillets at about $45^{\circ}$ rather than one transverse weld: at $45^{\circ}$ the weld carries equal normal and shear, and a fillet weld's throat is designed on a combined vector sum. It is also why a code checks a fillet weld on the **resultant** stress through the throat rather than resolving it into components, and why a longitudinal weld in a plate loaded transversely is the worst detail in the shop drawing — the weld carries the full $120\ \mathrm{MPa}$ normal to its own axis, and a defect in it is a through-thickness crack in the plate.
:::
:::

::: exercise Derivation {level=3}
Show that the principal stresses are the roots of $\lambda^{3} - I_1 \lambda^{2} + I_2 \lambda - I_3 = 0$, define the three invariants, and use them to show that a state of pure shear has principal stresses $\pm \tau$ and zero mean stress, while a hydrostatic state has zero deviatoric stress. Why does the distinction between the spherical and deviatoric parts explain the difference between ductile and brittle failure?
::: solution
Setting the traction on a plane with normal $\mathbf{n}$ to be purely normal, $\sigma_{ij} n_j = \lambda n_i$, gives an eigenvalue problem with non-trivial solutions when
$$
\det \left| \begin{array}{ccc}
\sigma_x - \lambda & \tau_{xy} & \tau_{xz} \\
\tau_{xy} & \sigma_y - \lambda & \tau_{yz} \\
\tau_{xz} & \tau_{yz} & \sigma_z - \lambda
\end{array} \right| = 0 ,
$$
which expands to the **characteristic equation** with the invariants
$$
I_1 = \sigma_x + \sigma_y + \sigma_z, \qquad
I_2 = \sigma_x \sigma_y + \sigma_y \sigma_z + \sigma_z \sigma_x - \tau_{xy}^{2} - \tau_{yz}^{2} - \tau_{zx}^{2}, \qquad
I_3 = \det \sigma .
$$
Because the roots are the principal stresses, $I_1 = \sigma_1 + \sigma_2 + \sigma_3$ is the same on every plane, which is the three-dimensional form of the invariant used throughout this chapter.

**Pure shear.** $\sigma_x = \sigma_y = \sigma_z = 0$, $\tau_{xy} = \tau$, all else zero. Then $I_1 = 0$, $I_2 = - \tau^{2}$, $I_3 = 0$, so
$$
\lambda \left( \lambda^{2} - \tau^{2} \right) = 0
\quad\Longrightarrow\quad
\sigma_1 = \tau, \quad \sigma_2 = 0, \quad \sigma_3 = - \tau .
$$
The mean (spherical) stress is $I_1 / 3 = 0$: pure shear changes shape but not volume.

**Hydrostatic pressure.** $\sigma_{ij} = - p \delta_{ij}$ gives $\sigma_1 = \sigma_2 = \sigma_3 = - p$, so the deviatoric stress $s_{ij} = \sigma_{ij} - \tfrac{1}{3} I_1 \delta_{ij}$ is identically zero: a hydrostatic state changes volume but not shape.

*Why it matters.* Plastic flow in a metal is the sliding of atomic planes past each other, which is a **shape**-changing, volume-preserving process driven by the deviatoric stress — which is why ductile yield criteria (Tresca, von Mises) depend only on the stress differences and are completely insensitive to superimposed pressure. Brittle fracture is the opening of a crack against the **tensile** normal stress, which is a volume-changing process driven by the spherical part — which is why brittle criteria (maximum normal stress, Mohr) depend on the largest principal tension and are strongly affected by pressure. The practical consequence is enormous: a carbide tool, a concrete core under confining pressure and a rock at depth all behave plastically under a hydrostatic compression that would shatter them at the surface, and a pressure vessel made of a nominally ductile steel can fracture in a state of triaxial tension at a crack tip where the local stress state is nearly hydrostatic.
:::
:::
