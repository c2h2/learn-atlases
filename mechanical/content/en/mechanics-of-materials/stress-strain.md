Statics ends the moment you ask "will it hold?" The reactions you computed are external; a member fails from what happens inside it, and what happens inside is described by **stress** — force per unit area — and **strain** — change in length per unit length. These two ideas, joined by a material law, are the whole of mechanics of materials, and everything after this chapter is an elaboration of them.

The subject has a distinctive flavour that takes a chapter to acquire. Stress is not a material property; it is a consequence of geometry and load, and it can be computed wrongly in a dozen ways while the equilibrium equations all balance. Strain is measured, not assumed. And the material law — Hooke's law, which looks like a tautology — is the reason a steel cable and a rubber band of the same dimensions carry different loads, and the reason the whole subject splits into the determinate and the indeterminate. Learn to compute stress and strain fluently and the rest of the course is bookkeeping.

::: warning Stress is not force, and $\sigma = P / A$ is not a formula but a claim
$P / A$ is the **average** stress over the section, and it is correct only where the section is prismatic, the load is centric, the material is uniform and you are far from a hole, a fillet or a change of section. Near any of those the local stress may be two to five times the average, and it is always the local value that starts the crack. Worse, the area in the denominator must be the area **resisting the load**: the net area through a bolted connection, not the gross area; the shear area of a pin in double shear, which is twice the pin's cross-section, not one; the projected area $d t$ in bearing, not a circle. Every one of those substitutions is a factor of two waiting to be missed.
:::

## Stress

::: definition Average normal and shear stress {#def-stress}
On a plane of area $A$ across which the internal force has a component $N$ normal to the plane and a component $V$ tangential to it, the **average normal stress** and **average shear stress** are
$$
\sigma_{\text{avg}} = \frac{N}{A}, \qquad \tau_{\text{avg}} = \frac{V}{A} .
$$
Units are pascals; in practice $\mathrm{N / mm^{2}} = \mathrm{MPa}$, so a $20\ \mathrm{kN}$ force on $100\ \mathrm{mm^{2}}$ gives $200\ \mathrm{MPa}$. Normal stress is **tension** (positive) or **compression** (negative); shear stress has no sign convention of its own beyond the face it acts on.
:::

::: proposition Shear in pins, keys and bearings {#prop-shear-types}
A pin of diameter $d$ transmitting a force $P$ is in **single shear** if it has one shear plane and **double shear** if it has two:
$$
\tau = \frac{P}{\pi d^{2} / 4} \ (\text{single}), \qquad
\tau = \frac{P}{2 \times \pi d^{2} / 4} \ (\text{double}) .
$$
**Bearing stress** between a pin or bolt of diameter $d$ and a member of thickness $t$ is computed on the **projected area** $d t$:
$$
\sigma_b = \frac{P}{d t} .
$$
A **punching** or **tearing** shear failure occurs on a cylindrical or prismatic surface, whose area must be drawn, not remembered: a punch of diameter $d$ shearing a plate of thickness $t$ uses $\pi d t$.
:::

::: proof
These are equilibrium statements, not material laws. For a pin in double shear, isolate the central member: the pin crosses two interfaces, and at each the shear force must be $P / 2$ for the isolated piece to be in equilibrium, so the average shear stress on each plane is $P / (2 A_{\text{pin}})$. For bearing, the pin presses on the plate over a semic cylindrical surface whose **projected** area on the diametral plane is $d t$; taking the horizontal equilibrium of the half of the contact, the resultant of whatever pressure distribution actually exists equals the average bearing stress times $d t$. The projected-area convention is a notional stress, not a real one — the true contact pressure peaks at the middle of the hole and depends on the clearance and on the stiffness of both parts — but it is the convention used in every design code, and mixing the two gives nonsense. For punching, the sheared surface is the cylindrical side of the plug, of area $\pi d t$, and the average shear stress is $P / (\pi d t)$; note that this is four times the pin's own shear area for the same diameter, which is why a bolt shears at its shank rather than punching the plate it passes through.
:::

::: example Stepped bar in tension {#ex-stepped}
A steel bar carries an axial tensile load of $40\ \mathrm{kN}$. Segment $A B$ has diameter $20\ \mathrm{mm}$ and segment $B C$ has diameter $40\ \mathrm{mm}$. Find the normal stress in each segment, and the stress at the shoulder if a stress-concentration factor of $2.1$ applies.
::: solution
$$
A_{AB} = \frac{\pi \times 20^{2}}{4} = 314.2\ \mathrm{mm^{2}}, \qquad
\sigma_{AB} = \frac{40\,000}{314.2} = 127.3\ \mathrm{MPa},
$$
$$
A_{BC} = \frac{\pi \times 40^{2}}{4} = 1256.6\ \mathrm{mm^{2}}, \qquad
\sigma_{BC} = \frac{40\,000}{1256.6} = 31.8\ \mathrm{MPa}.
$$
At the shoulder the local stress is
$$
\sigma_{\text{shoulder}} = 2.1 \times 127.3 = 267\ \mathrm{MPa}.
$$
*Check.* The stress ratio equals the inverse area ratio: $127.3 / 31.8 = 4.0 = (40 / 20)^{2}$. $\checkmark$

*Sanity.* Doubling the diameter quarters the stress, because area goes as the square. And the stress concentration is $2.1$ times the **smaller** section's average stress, not the larger's — the concentration factor is always quoted against the nominal stress on the net section at the fillet. Under repeated loading this member will fail at the shoulder at a load far below that needed to yield the mid-length of $A B$, which is why shaft shoulders are radiused and why a fatigue crack is found at a change of section and never in the middle of a uniform gauge length.
:::
:::

::: example Pin in double shear {#ex-pin}
A $60\ \mathrm{kN}$ load is transmitted by a pin through a three-plate lug joint. The allowable shear stress in the pin is $80\ \mathrm{MPa}$ and the allowable bearing stress is $250\ \mathrm{MPa}$. Find the pin diameter and the required thickness of the central plate.
::: solution
**Shear.** The pin has two shear planes, each carrying $30\ \mathrm{kN}$:
$$
A_{\text{req}} = \frac{30\,000}{80} = 375\ \mathrm{mm^{2}}
\quad\Longrightarrow\quad
d = \sqrt{\frac{4 \times 375}{\pi}} = 21.9\ \mathrm{mm}, \quad \text{take } d = 22\ \mathrm{mm}.
$$
**Bearing.** The central plate bears the full $60\ \mathrm{kN}$ on the projected area $d t$:
$$
t_{\text{req}} = \frac{60\,000}{250 \times 22} = 10.9\ \mathrm{mm}, \quad \text{take } t = 12\ \mathrm{mm}.
$$
*Check.* With $d = 22\ \mathrm{mm}$ and $t = 12\ \mathrm{mm}$ the actual bearing stress is $60\,000 / (22 \times 12) = 227\ \mathrm{MPa}$, inside the limit, and the actual shear stress is $30\,000 / 380.1 = 78.9\ \mathrm{MPa}$, just inside.

*Sanity.* Both members are near their limits, which is the point: a joint should fail in the mode you have chosen, not in the one you forgot. The failure mode not checked here is **tension in the plate** across the row of holes, where the net area is reduced by the hole diameter plus $2\ \mathrm{mm}$ for damage, and by code that is often the governing mode. A joint designed only for the pin is a joint that tears its plate.
:::
:::

## Strain and Hooke's law

::: definition Normal and shear strain {#def-strain}
The **normal strain** is the change in length per unit length,
$$
\varepsilon = \frac{\delta}{L} = \frac{\mathrm{d} u}{\mathrm{d} x},
$$
dimensionless, and quoted in microstrain $\mu \varepsilon = 10^{-6}$. The **shear strain** $\gamma$ is the change in angle, in radians, between two originally perpendicular lines. Tensile strain is positive; shear strain is positive when the angle decreases.
:::

::: definition Hooke's law, Poisson's ratio and the shear modulus {#def-hooke}
For a linear elastic, isotropic material loaded below its proportional limit,
$$
\sigma = E \varepsilon, \qquad \tau = G \gamma,
$$
where $E$ is Young's modulus and $G$ the shear modulus. A tensile strain $\varepsilon$ produces a lateral strain $- \nu \varepsilon$, where $\nu$ is **Poisson's ratio**. For an isotropic material only two of the three constants are independent:
$$
G = \frac{E}{2 (1 + \nu)} .
$$
For the general three-dimensional state,
$$
\varepsilon_x = \frac{1}{E} \left[ \sigma_x - \nu \left( \sigma_y + \sigma_z \right) \right], \quad \text{and cyclically}, \qquad
\varepsilon_{\text{vol}} = \frac{1 - 2 \nu}{E} \left( \sigma_x + \sigma_y + \sigma_z \right) .
$$
:::

::: proposition Typical constants and what they mean {#prop-constants}
Structural steel: $E = 200$ to $210\ \mathrm{GPa}$, $G \approx 77\ \mathrm{GPa}$, $\nu \approx 0.30$, yield $250$ (mild) to $690\ \mathrm{MPa}$ (quenched and tempered). Aluminium alloys: $E \approx 70\ \mathrm{GPa}$, $\nu \approx 0.33$, yield $100$ to $500\ \mathrm{MPa}$. Concrete: $E \approx 25$ to $40\ \mathrm{GPa}$, weak in tension. Timber along the grain: $E \approx 10$ to $12\ \mathrm{GPa}$. Carbon-fibre composite: $E$ from $70$ to $800\ \mathrm{GPa}$ depending on fibre direction. The **yield strain** of steel at $355\ \mathrm{MPa}$ is $355 / 200\,000 = 1775\ \mu \varepsilon$, so any measured strain above about $2000\ \mu \varepsilon$ in structural steel means the member is plastic.
:::

::: proof
The relation $G = E / 2 (1 + \nu)$ follows by considering pure shear. An element in pure shear $\tau$ has principal stresses $\sigma_1 = \tau$, $\sigma_2 = - \tau$, $\sigma_3 = 0$ at $45^{\circ}$ to the shear faces. The principal strain in direction 1 from the generalised law is
$$
\varepsilon_1 = \frac{1}{E} \left[ \tau - \nu (- \tau) \right] = \frac{\tau (1 + \nu)}{E} .
$$
But the same element's shear strain relates to its principal strains by $\gamma = \varepsilon_1 - \varepsilon_2 = 2 \varepsilon_1$, so
$$
\gamma = \frac{2 \tau (1 + \nu)}{E}
\quad \Longrightarrow \quad
G = \frac{\tau}{\gamma} = \frac{E}{2 (1 + \nu)} .
$$
Two constants therefore suffice for an isotropic linear elastic solid, and $\nu < 0.5$ is required for the volumetric strain to be negative under hydrostatic pressure — that is, for the material to compress. Rubber has $\nu$ close to $0.5$ and is nearly incompressible, which is why it is stiff in compression and soft in shear; foams with negative $\nu$ exist but are laboratory curiosities.
:::

::: example Measured strain {#ex-strain}
A steel rod of $2\ \mathrm{m}$ gauge length stretches by $1.2\ \mathrm{mm}$ under load, and its diameter falls from $20.00$ to $19.9925\ \mathrm{mm}$. Find the axial strain, the lateral strain, Poisson's ratio and the axial stress.
::: solution
$$
\varepsilon_{\text{axial}} = \frac{1.2}{2000} = 600 \times 10^{-6} = 600\ \mu \varepsilon,
$$
$$
\varepsilon_{\text{lat}} = \frac{19.9925 - 20.0000}{20.0000} = - 375 \times 10^{-6},
$$
$$
\nu = - \frac{\varepsilon_{\text{lat}}}{\varepsilon_{\text{axial}}} = \frac{375}{600} = 0.625 \quad \text{??}
$$
That value is impossible for a metal, so the measurement is wrong: a $0.0075\ \mathrm{mm}$ diameter change is at the resolution limit of a micrometer and the lateral strain cannot be trusted. Taking the axial strain alone with $E = 200\ \mathrm{GPa}$,
$$
\sigma = E \varepsilon = 200\,000 \times 600 \times 10^{-6} = 120\ \mathrm{MPa}.
$$
*Sanity.* $120\ \mathrm{MPa}$ in mild steel is safely elastic, and $600\ \mu \varepsilon$ is a strain a good strain gauge measures to one part in a thousand. The diameter change corresponding to $\nu = 0.30$ would be $20 \times 0.3 \times 600 \times 10^{-6} = 0.0036\ \mathrm{mm}$, which no hand instrument resolves — which is exactly why $\nu$ is measured with two strain gauges at right angles, or by torsion combined with tension, and never with a micrometer.
:::
:::

::: example Biaxial stress from measured strains {#ex-biaxial}
Strain gauges bonded to the surface of an aluminium plate read $\varepsilon_x = 2330\ \mu \varepsilon$ and $\varepsilon_y = - 1660\ \mu \varepsilon$. With $E = 70\ \mathrm{GPa}$ and $\nu = 0.33$, and no out-of-plane stress, find $\sigma_x$ and $\sigma_y$.
::: solution
With $\sigma_z = 0$,
$$
\varepsilon_x = \frac{1}{E} \left( \sigma_x - \nu \sigma_y \right), \qquad
\varepsilon_y = \frac{1}{E} \left( \sigma_y - \nu \sigma_x \right) .
$$
Inverting these two simultaneous equations,
$$
\sigma_x = \frac{E}{1 - \nu^{2}} \left( \varepsilon_x + \nu \varepsilon_y \right), \qquad
\sigma_y = \frac{E}{1 - \nu^{2}} \left( \varepsilon_y + \nu \varepsilon_x \right),
$$
with $E / (1 - \nu^{2}) = 70\,000 / (1 - 0.1089) = 78\,554\ \mathrm{MPa}$. Then
$$
\sigma_x = 78\,554 \left( 2330 + 0.33 \times (-1660) \right) \times 10^{-6}
= 78\,554 \times 1781.2 \times 10^{-6} = 140\ \mathrm{MPa},
$$
$$
\sigma_y = 78\,554 \left( -1660 + 0.33 \times 2330 \right) \times 10^{-6}
= 78\,554 \times (-890.1) \times 10^{-6} = -70\ \mathrm{MPa}.
$$
*Check.* Substituting back, $\varepsilon_x = (140 + 0.33 \times 70) / 70\,000 = 163.1 / 70\,000 = 2330\ \mu \varepsilon$. $\checkmark$

*Sanity.* The inversion is the standard **plane-stress photoelastic and strain-gauge** calculation, and the factor $1 / (1 - \nu^{2})$ is the whole point: ignoring the Poisson coupling would give $\sigma_x = 70\,000 \times 2330 \times 10^{-6} = 163\ \mathrm{MPa}$, an over-estimate of $17$ per cent. The coupling is never negligible for aluminium or steel, and it is the reason a single gauge cannot give a stress — you need at least two directions, and three if the principal directions are unknown.
:::
:::

## Design and safety

::: definition Allowable stress design and factor of safety {#def-allowable}
The **factor of safety** is defined against a specified limit stress,
$$
\mathrm{FS} = \frac{\text{limit load}}{\text{allowable load}} = \frac{\text{limit stress}}{\text{allowable stress}} ,
$$
and the **allowable stress** is
$$
\sigma_{\text{allow}} = \frac{\sigma_{\text{yield}}}{\mathrm{FS}_y} \quad \text{or} \quad \frac{\sigma_{\text{ultimate}}}{\mathrm{FS}_u} .
$$
The design requirement for a member carrying axial force $P$ is
$$
A_{\text{req}} \ge \frac{P}{\sigma_{\text{allow}}} .
$$
:::

::: warning A factor of safety is not a measure of caution
$\mathrm{FS} = 2$ on yield does not mean "twice as safe". It means the member yields at twice the design load, and it says nothing about fatigue, buckling, corrosion, impact, misuse, the scatter in the material, or the possibility that the load is larger than you think. Two rules follow. First, the factor must be applied to the **correct limit**: a factor on ultimate is meaningless for a member that must not deflect, and a factor on yield is meaningless for a brittle material or a fatigue-critical one. Second, factors are not multiplied: applying a load factor of $1.6$ and then a material factor of $1.15$ and then a duty factor of $1.5$ gives a total of $2.8$, which is usually double what the code intended. Modern codes use **partial factors** on loads and on material strengths separately, precisely to stop this, and the older habit of one big global factor survives only in situations where the load is genuinely unknown.
:::

::: example Sizing a tie rod {#ex-tie-rod}
A tie rod must carry a service load of $120\ \mathrm{kN}$. The material yields at $355\ \mathrm{MPa}$ and a factor of safety of $2.0$ on yield is required. Find the diameter, and check it against a deflection limit of $2\ \mathrm{mm}$ over $3\ \mathrm{m}$.
::: solution
$$
\sigma_{\text{allow}} = \frac{355}{2.0} = 177.5\ \mathrm{MPa}, \qquad
A_{\text{req}} = \frac{120\,000}{177.5} = 676\ \mathrm{mm^{2}},
$$
$$
d = \sqrt{\frac{4 \times 676}{\pi}} = 29.3\ \mathrm{mm}, \quad \text{take } d = 30\ \mathrm{mm}, \quad A = 706.9\ \mathrm{mm^{2}} .
$$
**Deflection check.**
$$
\delta = \frac{P L}{A E} = \frac{120\,000 \times 3000}{706.9 \times 200\,000} = 2.55\ \mathrm{mm} > 2\ \mathrm{mm}. \quad \text{FAILS}
$$
Increasing the area to satisfy stiffness,
$$
A_{\text{req}} = \frac{P L}{E \delta_{\text{allow}}} = \frac{120\,000 \times 3000}{200\,000 \times 2} = 900\ \mathrm{mm^{2}}
\quad\Longrightarrow\quad
d = 33.9\ \mathrm{mm}, \quad \text{take } d = 36\ \mathrm{mm}.
$$
*Sanity.* The member is governed by **stiffness, not strength** — a long slender tie is a spring before it is a strength problem, and this happens whenever the length-to-diameter ratio is large. The stress in the $36\ \mathrm{mm}$ rod is only $118\ \mathrm{MPa}$, a factor of safety of $3.0$ on yield, so the design is "over-strong" by the strength criterion and correct by the deflection criterion. Any design check that looks only at stress would have passed a rod that fails its specification.
:::
:::

::: widget plot
f: 120000/(x*x*3.14159/4)/1000000
x: 20, 45
y: 70, 390
labels: \text{stress in a tie rod carrying } 120\ \mathrm{kN}
caption: Nominal tensile stress against rod diameter for the $120\ \mathrm{kN}$ tie of Example 6. The stress falls as $1 / d^{2}$: $382\ \mathrm{MPa}$ at $20\ \mathrm{mm}$, $170\ \mathrm{MPa}$ at $30\ \mathrm{mm}$, $118\ \mathrm{MPa}$ at $36\ \mathrm{mm}$. The allowable of $177.5\ \mathrm{MPa}$ is crossed at $29.3\ \mathrm{mm}$, but the deflection limit pushes the answer to $36\ \mathrm{mm}$ — the flat part of this curve is where real tie rods live, and it is a reminder that on the steep left-hand end a small reduction in diameter is a large increase in stress.
:::

::: example Factor of safety from a proof test {#ex-proof}
A chain link made from $18\ \mathrm{mm}$ diameter bar of ultimate strength $650\ \mathrm{MPa}$ is proof-loaded to $80\ \mathrm{kN}$ and shows no permanent set. Estimate the factor of safety against static fracture, and explain why the proof load is not the working load.
::: solution
Each of the link's two legs has area $A = \pi \times 18^{2} / 4 = 254.5\ \mathrm{mm^{2}}$, and the two together resist $2 \times 254.5 = 509\ \mathrm{mm^{2}}$. The ultimate load is
$$
P_u = 650 \times 509 = 331\ \mathrm{kN},
$$
so at the proof load the factor of safety is $331 / 80 = 4.1$.

*Why proof-loading is not the working load.* A proof test proves only that **this** link was not defective at **this** load; it says nothing about fatigue, about a nick that will appear in service, or about a shock load of several times the working load. Chain codes therefore proof-test to about twice the working load and rate the chain at half the proof load, giving a service factor of safety of about $4$ on ultimate for lifting and $5$ or more for personnel. The gap between proof and working load is not waste; it is the allowance for the wear, corrosion, side-loading and shock that the proof test cannot reproduce.
:::
:::

::: history
The measurement of what materials will bear begins with Galileo's *Two New Sciences* (1638), whose dialogues on the breaking strength of wires and rods establish the free-body idea of cutting a body and balancing the internal forces across the cut — the origin of stress, even though Galileo got the stress distribution in a bending beam wrong. Robert Hooke's 1676 anagram *ceiiinosssttuv*, expanded in 1678 to *ut tensio, sic vis*, "as the extension, so the force", is the first statement of the linear elastic law, and the law is still called Hooke's law although Hooke stated it for springs and coils rather than for stress and strain. The distinction between stress and strain, and the modulus as a material constant, belongs to the eighteenth century: Leonhard Euler introduced what is now called Young's modulus in his 1744 memoir on columns, and Thomas Young named and measured it in lectures from 1802 and in the 1807 supplement to the *Encyclopædia Britannica*, which is why the continent calls it Euler's modulus and the English-speaking world calls it Young's. Siméon Denis Poisson gave the lateral-contraction ratio in his *Théorie mathématique de l'élasticité* (1829), and Gabriel Lamé and Augustin-Louis Cauchy put the three-dimensional law into its modern tensor form in the 1830s and 1840s. The factor of safety entered practice with the iron railways: the British Board of Trade required a bridge to carry twice the heaviest locomotive load, and the practice of specifying a global factor — three, then five, then more for anything that might kill — was codified in the railway and boiler rules of the 1850s and only replaced by partial-factor limit-state design in the 1970s.
:::

::: quiz
Two bars of the same material have the same length and the same weight. Bar 1 is uniform; bar 2 is a tapering frustum whose diameter doubles from one end to the other. Both are loaded in tension by the same force. Which stretches more?
- [ ] They stretch the same, because they have the same weight, length and material
- [x] Bar 2, because its compliance is dominated by its thin end
- [ ] Bar 1, because it has no stress concentration
- [ ] The question cannot be answered without knowing the absolute size
::: solution
Bar 2, by about $17$ per cent. Compliance adds as $\int \mathrm{d} x / (E A)$, which averages the **reciprocal** of the area, whereas equal weight fixes the **arithmetic** average of the area. For the frustum $\delta = 4 P L / (\pi E d_1 d_2)$, and with $d_2 = 2 d_1$ and matched volumes the uniform bar works out $17$ per cent less extensible. The general principle — that a constriction dominates the extension, so material placed away from it is used efficiently — is why bolt shanks are turned down, why leaf springs taper and why bone redistributes itself along the load path.
:::
:::

## Where this leads

Axial members are developed in [[mechanics-of-materials/axial-loading]], torsional shear in [[mechanics-of-materials/torsion]], and the two-dimensional generalisation of this chapter's stress transformation in [[mechanics-of-materials/stress-transformation]]. Material behaviour, including plasticity, creep and fatigue, is treated in [[materials-science/mechanical-properties]] and [[machine-design/static-failure]], and the finite-element computation of stress fields in [[finite-element-method/direct-stiffness]].

::: summary
- Stress is force over area and strain is change in length over length; $\sigma = P / A$ is an average and is valid only away from discontinuities.
- Use the resisting area: double shear doubles the pin's area, bearing uses the projected area $d t$, and punching uses the cylindrical surface $\pi d t$.
- Hooke's law $\sigma = E \varepsilon$ and $\tau = G \gamma$ with $G = E / 2 (1 + \nu)$; only two elastic constants are independent for an isotropic solid.
- In plane stress the strain-to-stress inversion carries a factor $1 / (1 - \nu^{2})$; ignoring Poisson coupling over-estimates stress by $10$ to $15$ per cent.
- Design on the allowable stress $P / A \le \sigma_{\text{allow}}$, but check deflection: long members are often governed by stiffness, not strength.
- A factor of safety is defined against a stated limit and is not multiplicative; modern codes apply separate partial factors to loads and to strengths.
:::

## Exercises

::: exercise Average stress {level=1 check="102"}
A $25\ \mathrm{mm}$ diameter bar carries $50\ \mathrm{kN}$ in tension. Find the average normal stress in MPa.
::: solution
$A = \pi \times 25^{2} / 4 = 490.9\ \mathrm{mm^{2}}$, so $\sigma = 50\,000 / 490.9 = 102\ \mathrm{MPa}$.
*Note.* Had the diameter been $20\ \mathrm{mm}$ the stress would have been $159\ \mathrm{MPa}$: the area goes as the square of the diameter, so a $25$ per cent error in diameter is a $33$ per cent error in stress, and a halving of the diameter is a quadrupling of it.
:::
:::

::: exercise Shear strain {level=1 check="0.2"}
An elastomeric bearing pad $150\ \mathrm{mm}$ square in plan and $40\ \mathrm{mm}$ thick is subjected to a horizontal displacement of $8\ \mathrm{mm}$ across its thickness. Find the shear strain in radians.
::: solution
$\gamma = 8 / 40 = 0.20\ \text{radians} = 11.5^{\circ}$. Elastomeric bearings work at shear strains of $0.1$ to $0.5$, which is enormous compared with the $0.001$ at which steel yields — the reason a rubber pad can be soft in shear and stiff in compression at the same time, and the reason it is designed against the lateral bulge that compression produces.
:::
:::

::: exercise Pin diameter {level=1 check="26"}
For the lug joint of Example 3, what pin diameter is required if the allowable shear stress is $60\ \mathrm{MPa}$ instead of $80\ \mathrm{MPa}$?
::: solution
$A_{\text{req}} = 30\,000 / 60 = 500\ \mathrm{mm^{2}}$ per shear plane, so $d = \sqrt{4 \times 500 / \pi} = 25.2\ \mathrm{mm}$, and take $26\ \mathrm{mm}$. A $25$ per cent reduction in allowable stress requires a $15$ per cent increase in diameter, because $d \propto 1 / \sqrt{\tau}$ — the square root is why going to a higher-grade pin steel buys so much.
:::
:::

::: exercise Elastic constants {level=2}
A material has $E = 200\ \mathrm{GPa}$ and $G = 80\ \mathrm{GPa}$. Find $\nu$, and comment on whether the material is physically reasonable.
::: solution
$\nu = E / (2 G) - 1 = 200 / 160 - 1 = 0.25$.
*Comment.* $\nu = 0.25$ is low but legitimate; most steels give $0.28$ to $0.30$, and beryllium and cermets sit near $0.03$ to $0.25$. What would be unreasonable is $\nu > 0.5$ (the material would expand under hydrostatic pressure) or $\nu < - 1$ (which would make $G$ negative). Auxetic foams with $\nu$ between $0$ and $- 0.4$ do exist and are used in sandwich cores because the negative Poisson ratio makes the core resist shear far better than a conventional foam of the same density.
:::
:::

::: exercise Statically determinate versus indeterminate {level=2}
A rigid bar is suspended by three identical vertical wires at equal spacing and carries a central load. Which wires carry load, and why can this not be solved from statics alone?
::: solution
The two outer wires and the middle wire all carry load, but the equilibrium equations give only two relations ($\sum F_y$ and $\sum M$) for three unknowns, so the problem is statically indeterminate to the first degree. It is completed by the **compatibility** condition: the rigid bar stays straight, so the three elongations are linearly related, and with identical wires the forces are linearly related in the same way. By symmetry the two outer wires carry equal force $F$ and the middle carries $M$, with $2 F + M = P$ and, from the linear elongation profile, $M = F$ — so each carries $P / 3$.

*Why it matters.* If the middle wire is one millimetre too long it carries nothing and the outer two carry $P / 2$ each, a $50$ per cent overload. This is the reason bolted joints with more than two bolts are analysed with care, why a three-legged stool is stable and a four-legged one wobbles, and why load-sharing between parallel members is never assumed equal unless it is designed and shimmed to be.
:::
:::

::: exercise Stress concentration {level=2}
A flat bar $60\ \mathrm{mm}$ wide and $10\ \mathrm{mm}$ thick has a $20\ \mathrm{mm}$ transverse hole and carries $80\ \mathrm{kN}$. Find the nominal and peak stresses if $K_t = 2.5$ for this geometry.
::: solution
The net area is $(60 - 20) \times 10 = 400\ \mathrm{mm^{2}}$, so
$$
\sigma_{\text{nom}} = \frac{80\,000}{400} = 200\ \mathrm{MPa}, \qquad
\sigma_{\text{peak}} = 2.5 \times 200 = 500\ \mathrm{MPa}.
$$
*Sanity.* The hole removes a third of the section and triples the stress: $2.0$ from the loss of area and $1.25$ more from the concentration. Under static loading of a ductile material the peak is relieved by local yielding and the member survives; under fatigue the same $500\ \mathrm{MPa}$ peak drives a crack and the fatigue strength is reduced by a factor $K_f$ of about $1.8$ to $2.2$. This is the single most important reason a fatigue-critical part has no holes, no sharp corners and no weld toes, and why aircraft skin lap joints are countersunk, cold-worked and shot-peened.
:::
:::

::: exercise Design {level=3}
A bracket is bolted to a column by four identical bolts in a rectangle, two above and two below, and carries a vertical load of $40\ \mathrm{kN}$ at $250\ \mathrm{mm}$ from the column face. Determine the load in the most heavily loaded bolt if the bolts are (a) bearing-type with the shear plane at the faying surface, and (b) high-strength friction-grip pre-tensioned to $150\ \mathrm{MPa}$ in an M20 bolt.
::: solution
**Direct shear.** Each bolt carries $40 / 4 = 10\ \mathrm{kN}$ vertically.

**Moment.** The moment is $40 \times 0.250 = 10\ \mathrm{kN\,m}$. Taking the bolts at $\pm 100\ \mathrm{mm}$ from the group centroid vertically and assuming the group rotates about its centre, the horizontal bolt spacing cancels from the second moment of area, and the resisting force per bolt is proportional to its vertical distance. With four bolts at $d = 100\ \mathrm{mm}$,
$$
\sum r^{2} = 4 \times 100^{2} = 40\,000\ \mathrm{mm^{2}}, \qquad
F_{\text{moment}} = \frac{M d}{\sum r^{2}} = \frac{10 \times 10^{6} \times 100}{40\,000} = 25\ \mathrm{kN}
$$
acting horizontally on the outermost bolts.

**(a) Bearing type.** The resultant on the critical bolt is
$$
F = \sqrt{10^{2} + 25^{2}} = 26.9\ \mathrm{kN}.
$$

**(b) Friction-grip.** An M20 bolt of property class 8.8 has a tensile stress area of $245\ \mathrm{mm^{2}}$ and is pre-tensioned to $0.7 \times 640 \times 245 = 110\ \mathrm{kN}$. The slip resistance per bolt with $\mu = 0.4$ is $0.4 \times 110 = 44\ \mathrm{kN}$, against a maximum bolt shear of $26.9\ \mathrm{kN}$, so the joint does not slip and the bolts never bear.

*Design comment.* The friction-grip joint is stronger, stiffer and — decisively — immune to fatigue, because the pre-tension clamps the plates and the bolt sees almost no alternating load. A bearing-type bolt in a repeatedly loaded joint is a fatigue time bomb: the bolt rattles in its hole and fails at a load far below the static value computed above.
:::
:::

::: exercise Derivation {level=3}
Show that for a prismatic bar of length $L$, area $A$ and modulus $E$ carrying an axial load $P$, the strain energy is $U = P^{2} L / (2 A E)$, and use it to find the elongation of a tapered bar of length $L$ whose diameter varies linearly from $d_1$ to $d_2$.
::: solution
The work done by a load growing from zero to $P$ is $\tfrac{1}{2} P \delta$, and with $\delta = P L / A E$ this gives
$$
U = \frac{1}{2} \frac{P^{2} L}{A E} = \frac{1}{2} \frac{\sigma^{2}}{E} (A L),
$$
so the strain energy per unit volume is $\sigma^{2} / 2 E$, the area under the stress-strain line. Cast-iron and concrete design used this quantity as a failure criterion — the maximum-principal-stress theory — before distortion energy was understood.

For the tapered bar, at distance $x$ from the small end the diameter is $d (x) = d_1 + (d_2 - d_1) x / L$ and the area is $A (x) = \pi d (x)^{2} / 4$. Since the force is $P$ everywhere,
$$
\delta = \int_0^L \frac{P\, \mathrm{d} x}{E A (x)}
= \frac{4 P}{\pi E} \int_0^L \frac{\\mathrm{d} x}{\left[ d_1 + (d_2 - d_1) x / L \right]^{2}}
= \frac{4 P L}{\pi E} \cdot \frac{1}{d_1 d_2}
= \frac{4 P L}{\pi E d_1 d_2} .
$$
*Check.* If $d_1 = d_2 = d$ this becomes $4 P L / (\pi E d^{2}) = P L / (E \pi d^{2} / 4) = P L / A E$. $\checkmark$

*Sanity.* The result is the same as that of a uniform bar whose diameter is the **geometric mean** $\sqrt{d_1 d_2}$, not the arithmetic mean. For $d_1 = 20$ and $d_2 = 40\ \mathrm{mm}$ the geometric mean is $28.3\ \mathrm{mm}$ against an arithmetic mean of $30\ \mathrm{mm}$, so using the average diameter under-estimates the extension by $12$ per cent. The general rule — that compliance averages the **reciprocal** of the area — is the reason a chain of springs in series is dominated by its weakest link, and the reason a bolt's elongation is governed by its shank and thread root rather than by its mean diameter.
:::
:::
