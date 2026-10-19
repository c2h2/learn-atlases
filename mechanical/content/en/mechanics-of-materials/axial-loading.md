A bar in tension is the simplest structure there is, and it is the only one you can solve exactly. Everything else in this course is an approximation to it: a beam is a bundle of bars, a column is a bar that has lost an argument with stability, a shaft is a bar twisted. So it is worth getting the axial case completely straight, because the three ideas it contains — that deformation is the integral of strain, that constraints create forces statics never predicted, and that geometry creates stresses that load alone cannot explain — reappear in every chapter that follows.

The governing formula, $\delta = P L / A E$, is three lines long and appears on the first page of every handbook. It is also the formula most often applied wrongly, because it assumes a constant force, a constant area, a constant modulus, uniform material, uniform temperature and a specimen far from any discontinuity. Real members violate several of those at once, and the whole of this chapter is about knowing which assumption you are giving up and what it costs you.

::: warning $\delta = P L / A E$ is a special case, not a law
The formula holds only when the axial force, the area and the modulus are all constant over the length. For a bar under its own weight, a tapered pile, a bolt with a threaded end or a composite member, it is wrong — sometimes by a factor of two. The general statement is
$$
\delta = \int_0^L \frac{P(x)}{E A(x)}\, \mathrm{d} x,
$$
and the habit of writing this integral down before substituting anything will save you from the classic errors: forgetting that a bar's own weight gives a triangular force diagram, using the mean diameter of a taper, and treating a bolt's shank and threads as one area.
:::

## Elongation and stiffness

::: definition Axial deformation and stiffness {#def-elongation}
For a prismatic bar of length $L$, area $A$ and modulus $E$ carrying a constant axial force $P$,
$$
\delta = \frac{P L}{A E}, \qquad k = \frac{P}{\delta} = \frac{A E}{L},
$$
where $k$ is the **axial stiffness** in $\mathrm{N / m}$. The general form for a varying bar is
$$
\delta = \int_0^L \frac{P(x)}{E A(x)}\, \mathrm{d} x, \qquad
\frac{1}{k} = \int_0^L \frac{\mathrm{d} x}{E A(x)} ,
$$
so that axial compliances add in series exactly as springs in series, and stiffnesses add in parallel.
:::

::: proposition Self-weight and taper {#prop-selfweight}
A uniform bar of length $L$ hanging under its own weight of total magnitude $W$ extends by
$$
\delta = \frac{W L}{2 A E},
$$
half the extension produced by the same total weight applied at the end. A conical bar tapering linearly from diameter $d_1$ to $d_2$ under an end load $P$ extends by
$$
\delta = \frac{4 P L}{\pi E d_1 d_2},
$$
which is the extension of a uniform bar of diameter $\sqrt{d_1 d_2}$ — the geometric, not the arithmetic, mean.
:::

::: proof
At distance $x$ from the free end of the hanging bar the force is the weight below, $P (x) = w x$ where $w = W / L$. Then
$$
\delta = \int_0^L \frac{w x}{E A}\, \mathrm{d} x = \frac{w L^{2}}{2 E A} = \frac{W L}{2 A E} .
$$
The factor one half is the average of a linearly varying force, and the same argument gives the shortening of a pile under skin friction and the extension of a rotating blisk.

For the taper, $d (x) = d_1 + (d_2 - d_1) x / L$ and $A (x) = \pi d (x)^{2} / 4$, so with $P$ constant
$$
\delta = \frac{4 P}{\pi E} \int_0^L \frac{\mathrm{d} x}{d (x)^{2}}
= \frac{4 P}{\pi E} \cdot \frac{L}{d_1 d_2},
$$
using $\int_0^L \mathrm{d} x / (a + b x)^{2} = (1 / b)(1 / a - 1 / (a + b L))$ with $a = d_1$, $b = (d_2 - d_1) / L$. Setting $d_1 = d_2 = d$ recovers the prismatic result.
:::

::: example Stepped bar {#ex-stepped-bar}
A steel bar ($E = 200\ \mathrm{GPa}$) has segment $A B$ of length $500\ \mathrm{mm}$ and diameter $25\ \mathrm{mm}$ and segment $B C$ of length $800\ \mathrm{mm}$ and diameter $15\ \mathrm{mm}$, and carries a tensile load of $60\ \mathrm{kN}$. Find the total extension and the maximum stress.
::: solution
$$
A_{AB} = 490.9\ \mathrm{mm^{2}}, \qquad A_{BC} = 176.7\ \mathrm{mm^{2}},
$$
$$
\delta_{AB} = \frac{60\,000 \times 500}{490.9 \times 200\,000} = 0.306\ \mathrm{mm}, \qquad
\delta_{BC} = \frac{60\,000 \times 800}{176.7 \times 200\,000} = 1.358\ \mathrm{mm},
$$
$$
\delta = 1.664\ \mathrm{mm}.
$$
The maximum stress is in the thin segment, $\sigma_{BC} = 60\,000 / 176.7 = 339.5\ \mathrm{MPa}$.

*Check.* The thin segment is $61$ per cent of the length but gives $82$ per cent of the extension, and its stress is $2.78$ times the thick segment's — the ratio $(25 / 15)^{2} = 2.78$. $\checkmark$

*Sanity.* $339.5\ \mathrm{MPa}$ is above the yield of S275 steel and near that of S355, so this bar is a strength problem before it is a stiffness problem, and the $1.66\ \mathrm{mm}$ extension is academic if the material yields at the shoulder first. Note also that the extension is dominated by the thin section: halving its length would remove $0.68\ \mathrm{mm}$ of the total, whereas halving the thick section's length saves only $0.15\ \mathrm{mm}$. When you need a member stiffer, strengthen the part that is already highly stressed — the part carrying the same force over the least area.
:::
:::

::: example Concrete-filled steel tube {#ex-cfst}
A concrete-filled steel tube of outside diameter $200\ \mathrm{mm}$ and wall $8\ \mathrm{mm}$ carries an axial load of $500\ \mathrm{kN}$. Take $E_s = 200\ \mathrm{GPa}$ and $E_c = 25\ \mathrm{GPa}$, and assume the two materials are perfectly bonded and shorten equally. Find the stress in each material and the load carried by each.
::: solution
Areas:
$$
A_s = \frac{\pi (200^{2} - 184^{2})}{4} = 4825\ \mathrm{mm^{2}}, \qquad
A_c = \frac{\pi \times 184^{2}}{4} = 26\,590\ \mathrm{mm^{2}} .
$$
**Compatibility** requires equal strain, $\varepsilon_s = \varepsilon_c = \varepsilon$. **Equilibrium** requires
$$
P = \sigma_s A_s + \sigma_c A_c = \varepsilon \left( E_s A_s + E_c A_c \right),
$$
$$
E_s A_s = 9.65 \times 10^{8}\ \mathrm{N}, \qquad E_c A_c = 6.65 \times 10^{8}\ \mathrm{N},
$$
$$
\varepsilon = \frac{500\,000}{16.30 \times 10^{8}} = 3.068 \times 10^{-4},
$$
$$
\sigma_s = 200\,000 \times 3.068 \times 10^{-4} = 61.4\ \mathrm{MPa}, \qquad
\sigma_c = 25\,000 \times 3.068 \times 10^{-4} = 7.67\ \mathrm{MPa},
$$
$$
P_s = 61.4 \times 4825 = 296\ \mathrm{kN}, \qquad P_c = 7.67 \times 26\,590 = 204\ \mathrm{kN}. \checkmark
$$
*Sanity.* The steel carries $59$ per cent of the load from $15$ per cent of the area, in the ratio $E_s / E_c = 8$. This is the whole principle of reinforced concrete and of the concrete-filled hollow section: the stiff material takes load in proportion to its modulus, and the cheap material fills out the shape. Note that the concrete's stress of $7.7\ \mathrm{MPa}$ is a third of its cylinder strength while the steel's $61\ \mathrm{MPa}$ is a tenth of yield — both are comfortable, and the section is far more efficient than either material alone, because the steel confines the concrete and stops it buckling outwards.
:::
:::

::: definition Stress concentration factor {#def-kt}
Near a hole, fillet, step, thread or keyway the local stress exceeds the nominal value on the **net** section. The **theoretical stress-concentration factor** is
$$
K_t = \frac{\sigma_{\max}}{\sigma_{\text{nom}}} ,
$$
where $\sigma_{\text{nom}} = P / A_{\text{net}}$ and $K_t$ depends only on the geometry, tabulated against ratios such as $D / d$ and $r / d$. For a flat bar of width $D$ with a fillet radius $r$ stepping down to $d$, $K_t$ runs from about $1.0$ for a generous fillet to $2.7$ for a sharp one; for a transverse hole it runs from $2.1$ for a small hole to $2.7$ as the hole approaches the edge.
:::

::: proposition What $K_t$ does and does not cost you {#prop-kt}
For a **ductile** material under **static** loading, a stress concentration costs nothing in static strength: once $\sigma_{\max}$ reaches yield the material redistributes and the full section plasticises, so the failure load is set by $\sigma_y A_{\text{net}}$ and not by $K_t$. For a **brittle** material, or for **any** material under fatigue, $K_t$ applies in full or nearly so, and the fatigue strength is reduced by the **fatigue notch factor** $K_f \le K_t$,
$$
K_f = 1 + q \left( K_t - 1 \right),
$$
with $q$ the notch sensitivity, near $1$ for high-strength steel and near $0$ for very fine-grained or very blunt cases.
:::

::: proof
The static case follows from equilibrium and ductility. If the peak stress at a fillet reaches $\sigma_y$, that fibre cannot take more; further load is carried by the neighbouring fibres, which are still elastic, until they too yield. The integral of stress over the net section can still reach $\sigma_y A_{\text{net}}$, so the collapse load is unaffected — provided the material can sustain several per cent of strain without cracking and provided the load is applied once and monotonically. Under repeated loading the argument fails because the peak fibre is driven past its own fatigue limit cycle after cycle and a crack starts there, long before the net section yields; the notch then reduces the strength by nearly the full $K_t$. The factor $q$ exists because real cracks need a finite volume of highly stressed material to nucleate, so a very small root, where the stress gradient is steep, is less damaging than $K_t$ alone predicts — which is the reason a fine thread is less fatigue-sensitive than its $K_t$ of about $3$ suggests, and the reason shot-peening, which puts the surface into residual compression, recovers much of what the notch takes away.
:::

::: example Stepped flat bar {#ex-step-bar}
A flat steel bar steps from $D = 60\ \mathrm{mm}$ to $d = 40\ \mathrm{mm}$ with a fillet radius $r = 4\ \mathrm{mm}$ and is $10\ \mathrm{mm}$ thick. Take $K_t = 2.1$ for $D / d = 1.5$, $r / d = 0.1$. Find the nominal and peak stresses under $P = 60\ \mathrm{kN}$, and the load at which the bar yields for a yield stress of $355\ \mathrm{MPa}$.
::: solution
$$
A_{\text{net}} = 40 \times 10 = 400\ \mathrm{mm^{2}}, \qquad
\sigma_{\text{nom}} = \frac{60\,000}{400} = 150\ \mathrm{MPa}, \qquad
\sigma_{\max} = 2.1 \times 150 = 315\ \mathrm{MPa}.
$$
Yielding first occurs at the fillet when $\sigma_{\max} = 355\ \mathrm{MPa}$, that is at
$$
P_y = \frac{355}{2.1} \times 400 = 67.6\ \mathrm{kN},
$$
but full plastic collapse of the net section needs
$$
P_p = 355 \times 400 \times 10^{-3} = 142\ \mathrm{kN}.
$$
*Sanity.* Between $67.6$ and $142\ \mathrm{kN}$ the bar carries load with a small yielded zone at the fillet and nothing catastrophic happens — the $2.1$ factor has cost nothing in static strength. Under repeated loading, however, the bar's fatigue strength is roughly $0.45 \sigma_u / K_f$ with $K_f \approx 1.9$, which for a $460\ \mathrm{MPa}$ steel gives a fully reversed allowable amplitude near $55\ \mathrm{MPa}$: a working stress of $150\ \mathrm{MPa}$ would exhaust the fatigue life in a few hundred thousand cycles. The same part is either perfectly safe or dangerously under-strength depending only on whether the load is steady or repeated.
:::
:::

## Statically indeterminate members

::: algorithm Statically indeterminate axial problems {#alg-indeterminate}
1. **Count.** Write the equilibrium equations. If there are more unknown forces than equations, the member is indeterminate and needs deformation conditions.
2. **Release** the structure: choose redundant reactions and remove them, replacing them by unknown forces. The result must be statically determinate.
3. **Compute the deformation** of the released structure at each release, due to the applied loads and due to a unit value of each redundant.
4. **Impose compatibility**: the actual displacement at each release is whatever the real support allows — usually zero, or a specified settlement or gap.
5. **Solve** for the redundants, then recover stresses and deflections.
6. **Check** that the recovered reactions satisfy equilibrium and that every member's stress is below its limit.
:::

::: example Bar fixed at both ends {#ex-fixed-fixed}
A steel bar of uniform area $A = 400\ \mathrm{mm^{2}}$ and total length $1200\ \mathrm{mm}$ is fixed between rigid walls. A tensile load of $30\ \mathrm{kN}$ is applied at a collar $400\ \mathrm{mm}$ from the left wall. Find the reactions and the maximum stress.
::: solution
**Equilibrium.** $R_A + R_B = 30\ \mathrm{kN}$ — one equation, two unknowns.

**Compatibility.** Neither end moves, so the total elongation is zero. With $R_A$ pulling the left segment into tension over $400\ \mathrm{mm}$ and $R_B$ holding the right segment in compression over $800\ \mathrm{mm}$,
$$
\delta = \frac{R_A \times 400}{A E} - \frac{R_B \times 800}{A E} = 0
\quad\Longrightarrow\quad
R_A = 2 R_B .
$$
Combining, $3 R_B = 30$, so
$$
R_B = 10.0\ \mathrm{kN}, \qquad R_A = 20.0\ \mathrm{kN}.
$$
The left segment carries $20\ \mathrm{kN}$ in tension and the right $10\ \mathrm{kN}$ in compression, so
$$
\sigma_{\max} = \frac{20\,000}{400} = 50\ \mathrm{MPa}.
$$
*Check.* The elongation of the left segment is $20\,000 \times 400 / (400 \times 200\,000) = 0.100\ \mathrm{mm}$ and of the right $- 10\,000 \times 800 / (400 \times 200\,000) = - 0.100\ \mathrm{mm}$; they cancel, so the collar moves by $0.100\ \mathrm{mm}$ and the ends do not move at all. $\checkmark$

*Sanity.* The reaction is larger at the **nearer** wall, in inverse proportion to length: the stiffer spring takes more of the load. This is the axial analogue of everything in structural analysis — a support settles, a prop is shortened, a bolt is packed, and the load redistributes towards the stiffest path. It is also why a machined shoulder that is $0.1\ \mathrm{mm}$ short leaves a bearing unloaded and doubles the load on the others.
:::
:::

## Thermal stress

::: definition Thermal strain and restrained thermal stress {#def-thermal}
A free member changes length by
$$
\delta_T = \alpha \, \Delta T \, L ,
$$
where $\alpha$ is the coefficient of thermal expansion. If the change is **fully restrained**, the strain is zero and the stress is
$$
\sigma = E \alpha \, \Delta T ;
$$
if it is **partly restrained** by a gap $\Delta$ or a spring of stiffness $k$, the stress follows from the residual deformation $\delta_T - \Delta$. Thermal stress requires three things at once: a temperature change, restraint, and a constraint that statics did not count. Remove any one and there is no thermal stress at all.
:::

::: example Expansion of a rail {#ex-rail}
Steel rails are laid stress-free at $15^{\circ} \mathrm{C}$ with $\alpha = 12 \times 10^{-6} / \mathrm{K}$ and $E = 200\ \mathrm{GPa}$. Find the stress at $45^{\circ} \mathrm{C}$ if the rails are (a) fully restrained, (b) provided with a total expansion gap of $6\ \mathrm{mm}$ per $12\ \mathrm{m}$ rail, and the gap needed for zero stress.
::: solution
The free expansion is
$$
\delta_T = 12 \times 10^{-6} \times 30 \times 12\,000 = 4.32\ \mathrm{mm}.
$$
**(a) Fully restrained.**
$$
\sigma = E \alpha \, \Delta T = 200\,000 \times 12 \times 10^{-6} \times 30 = 72.0\ \mathrm{MPa}.
$$
**(b) With a $6\ \mathrm{mm}$ gap.** Since $6\ \mathrm{mm} > 4.32\ \mathrm{mm}$ the rail expands freely and the stress is **zero**. Had the gap been $2\ \mathrm{mm}$, the restrained part would be $4.32 - 2 = 2.32\ \mathrm{mm}$ and
$$
\sigma = \frac{E \left( \delta_T - \Delta \right)}{L} = \frac{200\,000 \times 2.32}{12\,000} = 38.7\ \mathrm{MPa}.
$$
**(c) Gap for zero stress** is $4.32\ \mathrm{mm}$.

*Sanity.* $72\ \mathrm{MPa}$ of compressive stress from a $30\ \mathrm{K}$ rise is enough to buckle a track laterally — this is sun kinks and buckled rail, and it is why continuously welded rail is *stressed in* at a neutral temperature of about $27^{\circ} \mathrm{C}$ so that the winter stress is tensile and the summer stress compressive, both modest. The same arithmetic decides expansion joints in bridges (one $40\ \mathrm{mm}$ joint per $30\ \mathrm{m}$ of deck for a $60\ \mathrm{K}$ range, giving $14\ \mathrm{mm}$ of movement plus tolerance), the gap left in a pipeline before it is welded up, and the pre-tension of a bolt that must seal at $300^{\circ} \mathrm{C}$.
:::
:::

::: widget plot
f: 200000*12e-6*(x-15)/1000000
x: 15, 60
y: 0, 0.12
labels: \text{thermal stress in restrained steel (MPa)}
caption: Compressive stress $E \alpha \Delta T$ in a fully restrained steel member against temperature, laid stress-free at $15^{\circ} \mathrm{C}$, in MPa per unit strain scale — $2.4\ \mathrm{MPa}$ per kelvin. A $30\ \mathrm{K}$ rise gives $72\ \mathrm{MPa}$ and a $60\ \mathrm{K}$ rise $144\ \mathrm{MPa}$, which is a substantial fraction of yield. The linearity is the point: thermal stress is not a small effect to be waved away, and in a long pipeline, a rail or a bridge deck it routinely exceeds the stress from live load.
:::

::: example Bolted flange at temperature {#ex-flange}
A steel bolt of area $300\ \mathrm{mm^{2}}$ and clamp length $40\ \mathrm{mm}$ clamps two $20\ \mathrm{mm}$ thick cast-iron flanges and is tightened to a preload of $25\ \mathrm{kN}$. The assembly is then heated by $120\ \mathrm{K}$, during which the bolt's clamp length grows $20$ per cent more than the flanges'. Find the change in bolt force.
::: solution
The differential free expansion of the bolt relative to the flanges is
$$
\delta_{\text{diff}} = (1.2 - 1.0) \times 12 \times 10^{-6} \times 120 \times 40 = 0.0461\ \mathrm{mm}.
$$
This extra growth *relieves* clamp. The bolt and the flange stack form two springs in series carrying the same force, and the force change produced by a relative expansion $\delta_{\text{diff}}$ is
$$
\Delta F = - \frac{k_b k_f}{k_b + k_f} \, \delta_{\text{diff}} .
$$
The bolt stiffness is $k_b = A E / L = 300 \times 200\,000 / 40 = 1.50 \times 10^{6}\ \mathrm{N / mm}$. Taking the flange stack as four times as stiff, $k_f = 6.0 \times 10^{6}\ \mathrm{N / mm}$, so the series stiffness is
$$
\frac{k_b k_f}{k_b + k_f} = \frac{1.50 \times 6.0}{7.5} \times 10^{6} = 1.20 \times 10^{6}\ \mathrm{N / mm},
$$
$$
\Delta F = - 1.20 \times 10^{6} \times 0.0461 = - 55\,300\ \mathrm{N} = - 55.3\ \mathrm{kN}.
$$
That is more than twice the $25\ \mathrm{kN}$ preload, so the joint **separates**: the flanges open, the bolt goes slack, and the gasket leaks.

*Sanity.* A differential expansion of $0.046\ \mathrm{mm}$ sounds trivial, but a bolt joint is extremely stiff, and $0.046\ \mathrm{mm}$ against a series stiffness of $1.2\ \mathrm{MN / mm}$ is $55\ \mathrm{kN}$. Real hot bolted joints lose preload by exactly this mechanism, which is why they are re-torqued at operating temperature, why flanges use long studs of a *lower*-expansion alloy than the vessel, and why a gasket must be resilient enough to keep the bolt stretched when the flanges grow. The calculation is also the reason a bolted joint is deliberately made with a **long, thin** bolt: reducing $k_b$ relative to $k_f$ drives the series stiffness towards $k_b$ and cuts both the thermal loss and, more importantly, the alternating stress under external load fluctuation.
:::
:::

::: warning Saint-Venant's principle and where $\sigma = P / A$ is honest
The stress distribution near a load application point is complicated: a concentrated pin load produces a highly non-uniform field, and no formula in this book describes it. Saint-Venant's principle states that the difference between any two statically equivalent loadings dies away within a distance of the order of the member's lateral dimension — in practice, one width or one diameter. So $\sigma = P / A$ is honest at sections more than one width from the load, and dishonest at the load itself. The principle is what makes engineering analysis possible at all, and it is also what makes fatigue design hard, because the region where the formula fails is exactly the region where cracks start. Where you must know the stress at a hole, a fillet or a weld toe, use a stress-concentration factor from a chart, a finite-element model, or a photoelastic measurement — never the nominal formula.
:::

::: history
The first quantitative tensile tests are usually placed with 's Gravesande around 1720, but the first systematic programme belongs to Georges-Louis Leclerc, comte de Buffon, who in the *Histoire naturelle des métaux* of 1761 pulled iron wires of different lengths and diameters and established that the breaking load is proportional to the cross-section and independent of the length. That is the correct statement of the strength of a bar, and it was reached a full century before the concept of stress existed to express it. The extension law follows from the linear elastic law and appears in Siméon Denis Poisson's *Théorie mathématique de l'élasticité* (1829) and in Gabriel Lamé's courses of the same period, both treating the axial bar as the simplest case of three-dimensional elasticity; the modern statement, with the modulus as a pure material constant, descends from Navier's and Cauchy's formulation of elasticity in the 1820s and 1840s.

Restrained thermal expansion became an engineering problem with the railways. Buckled jointed track was reported from the 1840s, and the expansion links of locomotive boilers — the sliding joints of the firebox crown — were among the most common sources of catastrophic failure on early engines, which is why the locomotive boiler was the single most studied thermally stressed structure of the nineteenth century. William Fairbairn's tests of the 1850s on wrought-iron girders included the effect of temperature on riveted joints, and the first quantitative design rules for expansion joints in bridge decks date from the same decade. The stress-concentration factor, without which nothing near a hole is safe, was measured systematically by the German school around August Föppl at the Munich Technical University from the 1890s, and consolidated in the handbooks of Deventer and Hetényi of the 1930s and 1940s, whose charts are still reprinted in every machine-design text.
:::

::: quiz
A steel bar is fixed between rigid walls and heated. Which statement is correct?
- [x] It carries stress but no strain
- [ ] It carries strain but no stress
- [ ] It carries neither, because it cannot move
- [ ] It carries both, and the strain equals $\alpha \Delta T$
::: solution
It carries stress but no strain. The total strain is the sum of the mechanical and thermal parts, and the restraint forces the *total* to zero:
$$
\varepsilon_{\text{total}} = \frac{\sigma}{E} + \alpha \Delta T = 0
\quad\Longrightarrow\quad
\sigma = - E \alpha \Delta T .
$$
The stress exists precisely because the strain is prevented. This is why a stress-free installation temperature matters so much: a rail laid at $35^\circ \mathrm{C}$ in a heatwave is stress-free at $35^\circ \mathrm{C}$ and carries $E \alpha$ times the difference at every other temperature, which is why continuously welded rail is stressed in at a specified rail-temperature and why concrete is placed on the coolest day practical.
:::
:::

## Where this leads

Axial deformation is the building block of the energy and superposition methods of [[mechanics-of-materials/beam-deflection]] and [[solid-mechanics/energy-methods]], of the matrix stiffness method in [[finite-element-method/direct-stiffness]], and of the bolted-joint analysis in [[machine-design/fasteners-joints]]. Thermal and residual stresses in welded and cast parts are treated in [[manufacturing/joining]] and [[materials-science/mechanical-properties]].

::: summary
- Deformation is the integral of strain: $\delta = \int P (x) \mathrm{d} x / (E A)$, from which $\delta = P L / A E$, the half for self-weight, and the geometric-mean rule for a taper all follow.
- Axial stiffness is $A E / L$; compliances add in series and stiffnesses in parallel, so the weakest section dominates the extension.
- Composite members need compatibility of strain plus equilibrium of force; load is shared in proportion to $E A$, so the stiff material takes far more than its share of the area.
- Indeterminate members are solved by releasing, computing displacements, and imposing compatibility; the reaction goes to the stiffest path, not the nearest one.
- Thermal stress needs restraint: $\sigma = E \alpha \Delta T$ when fully held, which for steel is $2.4\ \mathrm{MPa}$ per kelvin and is never negligible.
- $\sigma = P / A$ is honest only a width or more away from a load application, by Saint-Venant's principle; near discontinuities use $K_t$ or a model.
:::

## Exercises

::: exercise Elongation {level=1 check="1.59"}
A steel rod $2\ \mathrm{m}$ long and $20\ \mathrm{mm}$ in diameter carries $50\ \mathrm{kN}$. Find the elongation in mm with $E = 200\ \mathrm{GPa}$.
::: solution
$A = 314.2\ \mathrm{mm^{2}}$, so $\delta = 50\,000 \times 2000 / (314.2 \times 200\,000) = 1.591\ \mathrm{mm}$.
*Note.* The strain is $1.591 / 2000 = 796\ \mu \varepsilon$ and the stress $159\ \mathrm{MPa}$, safely elastic. A useful check: for steel, $\sigma = E \varepsilon$ means $200\ \mathrm{MPa}$ corresponds to $1000\ \mu \varepsilon$, so any answer implying a strain far from that ratio is wrong.
:::
:::

::: exercise Self-weight {level=1 check="2"}
A uniform wire hangs from one end. How many times its elongation under its own weight equals the elongation produced by suspending its total weight from the free end?
::: solution
Twice. Self-weight gives $W L / (2 A E)$ against $W L / (A E)$ for the end load, because the average force along the wire is half the total. The same factor appears in a pile under uniform skin friction and in a rising balloon's tether.
:::
:::

::: exercise Composite {level=2}
A steel rod of $20\ \mathrm{mm}$ diameter inside a brass tube of $40\ \mathrm{mm}$ outside and $20\ \mathrm{mm}$ inside diameter, both $500\ \mathrm{mm}$ long, together carry $60\ \mathrm{kN}$. Take $E_s = 200\ \mathrm{GPa}$, $E_b = 100\ \mathrm{GPa}$. Find the stress in each.
::: solution
$A_s = 314.2\ \mathrm{mm^{2}}$, $A_b = \pi (40^{2} - 20^{2}) / 4 = 942.5\ \mathrm{mm^{2}}$. Equal strain gives
$$
\varepsilon = \frac{60\,000}{200\,000 \times 314.2 + 100\,000 \times 942.5}
= \frac{60\,000}{1.571 \times 10^{8}} = 3.819 \times 10^{-4},
$$
$$
\sigma_s = 76.4\ \mathrm{MPa}, \qquad \sigma_b = 38.2\ \mathrm{MPa}.
$$
*Check.* $76.4 \times 314.2 + 38.2 \times 942.5 = 24\,000 + 36\,000 = 60\,000\ \mathrm{N}$. $\checkmark$ The steel carries $40$ per cent of the load from a quarter of the area, in the modulus ratio $2:1$.
:::
:::

::: exercise Indeterminate {level=2}
For the bar of Example 4, the load is moved to $800\ \mathrm{mm}$ from the left wall. Find the reactions.
::: solution
Compatibility now gives $R_A \times 800 = R_B \times 400$, so $R_B = 2 R_A$, and with $R_A + R_B = 30$,
$$
R_A = 10.0\ \mathrm{kN}, \qquad R_B = 20.0\ \mathrm{kN}.
$$
The reactions have swapped, exactly as the inverse-length rule predicts. The maximum stress is still $20\,000 / 400 = 50\ \mathrm{MPa}$, because the larger reaction always belongs to the shorter segment and the two effects cancel: for a uniform bar fixed at both ends,
$$
\sigma_{\max} = \frac{P}{A} \cdot \frac{\max (L_1, L_2)}{L} ,
$$
so the bar is best loaded at mid-span, where $\sigma_{\max} = P / 2 A$, and worst loaded close to one end, where $\sigma_{\max}$ approaches $P / A$.
:::
:::

::: exercise Thermal {level=2 check="4.8"}
A concrete slab is fully restrained. With $E = 30\ \mathrm{GPa}$ and $\alpha = 10 \times 10^{-6} / \mathrm{K}$, find the thermal stress in MPa for a $16\ \mathrm{K}$ fall in temperature.
::: solution
$\sigma = E \alpha \Delta T = 30\,000 \times 10 \times 10^{-6} \times 16 = 4.8\ \mathrm{MPa}$ of tension.
*Note.* Concrete cracks at $2$ to $4\ \mathrm{MPa}$ in tension, so the slab cracks — which is why concrete pavements are sawn with control joints at $4$ to $5\ \mathrm{m}$ spacing, so that the cracking happens where it is designed to and the joint stays tight. The arithmetic here is the whole of pavement joint design.
:::
:::

::: exercise Stress concentration {level=2}
A $50\ \mathrm{mm}$ wide, $8\ \mathrm{mm}$ thick flat bar with a $15\ \mathrm{mm}$ hole carries a repeated load of $30\ \mathrm{kN}$. Find the nominal and peak stresses for $K_t = 2.4$.
::: solution
Net area $(50 - 15) \times 8 = 280\ \mathrm{mm^{2}}$, so
$$
\sigma_{\text{nom}} = \frac{30\,000}{280} = 107.1\ \mathrm{MPa}, \qquad
\sigma_{\text{peak}} = 2.4 \times 107.1 = 257\ \mathrm{MPa}.
$$
*Sanity.* Under a repeated load the $257\ \mathrm{MPa}$ peak governs even in a steel with $355\ \mathrm{MPa}$ yield, because the fatigue limit of a plain specimen is typically $0.4$ to $0.5$ of ultimate and a notch knocks another factor of about $2$ off it. The hole costs $30$ per cent of the area and roughly half the fatigue strength.
:::
:::

::: exercise Design {level=3}
A rigid horizontal beam is pinned at one end and supported by two vertical steel wires of equal area at $1.5\ \mathrm{m}$ and $3.0\ \mathrm{m}$ from the pin. A $20\ \mathrm{kN}$ load hangs at $2.0\ \mathrm{m}$. Find the force in each wire.
::: solution
**Equilibrium.** $R_1 + R_2 = 20$ and, taking moments about the pin, $1.5 R_1 + 3.0 R_2 = 20 \times 2.0 = 40$.
Two equations, two unknowns — the beam is determinate:
$$
R_1 = \frac{3 \times 20 - 40}{3 - 1.5} = \frac{20}{1.5} = 13.33\ \mathrm{kN}, \qquad
R_2 = 6.67\ \mathrm{kN}.
$$
*Check.* $1.5 \times 13.33 + 3.0 \times 6.67 = 20.0 + 20.0 = 40.0$. $\checkmark$

*Design comment.* Had the beam been supported at both ends as well as by the wires — or had a third wire been added — the problem would have become indeterminate and the answer would depend on the wire lengths and areas. Then a wire that is $0.5\ \mathrm{mm}$ too long sheds its share onto the others, and a three-wire hanger can easily end up with two wires carrying $90$ per cent of the load. Where load-sharing matters, either make the structure determinate or shim the members to force the intended distribution.
:::
:::

::: exercise Derivation {level=3}
Derive the force in a bimetallic strip's two layers when the temperature rises by $\Delta T$, given that layer 1 has $(E_1, \alpha_1, A_1)$ and layer 2 has $(E_2, \alpha_2, A_2)$, bonded together and free to bend. Explain why a bimetallic strip bends while a bolted flange only loses preload.
::: solution
Let the common final strain be $\varepsilon$. The stress in layer $i$ is $\sigma_i = E_i (\varepsilon - \alpha_i \Delta T)$, and the strip is free of net force, so
$$
\sum E_i A_i \left( \varepsilon - \alpha_i \Delta T \right) = 0
\quad\Longrightarrow\quad
\varepsilon = \Delta T \, \frac{\sum E_i A_i \alpha_i}{\sum E_i A_i} .
$$
The forces are then equal and opposite:
$$
F = E_1 A_1 \left( \varepsilon - \alpha_1 \Delta T \right) = - E_2 A_2 \left( \varepsilon - \alpha_2 \Delta T \right)
= \frac{E_1 A_1 E_2 A_2}{E_1 A_1 + E_2 A_2} \left( \alpha_2 - \alpha_1 \right) \Delta T .
$$
*Why it bends.* The two layers want different lengths, and because they are bonded each must take the same *average* strain — but the mismatch produces a bending moment as well as an axial force, since the two equal-and-opposite forces act along different centrelines. The strip relieves almost all of that moment by curving, and the curvature is $\kappa = 6 (\alpha_2 - \alpha_1) \Delta T / (t (3 + (E_1 I_1 / E_2 I_2) + \ldots))$, which for equal thicknesses and moduli reduces to the familiar $\kappa = 6 (\Delta \alpha) \Delta T / (2 t)$. A bolted flange cannot relieve its differential expansion by bending, because the bolt is in pure tension and the flanges in pure compression along the same line; there is no curvature available, so the mismatch goes entirely into losing clamp. That is why a bimorph is a sensor and a hot bolted joint is a leak.
:::
:::
