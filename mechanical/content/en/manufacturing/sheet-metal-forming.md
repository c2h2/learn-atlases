Sheet-metal forming is the process family that makes more metal parts than any other: a car body-in-white is a few hundred stampings, a washing machine a few dozen, a laptop case a handful. It is also the family in which the *material* decides the design most directly, because a sheet is not a solid. In [[manufacturing/bulk-forming|bulk forming]] the work is confined and largely compressed; a sheet is a **two-dimensional object loaded in its own plane**, and it has essentially two ways to fail — **it wrinkles where it is compressed and it tears where it is stretched**. A good drawing die holds the sheet between those two limits.

Most of this lesson follows from that statement. Wrinkling is buckling, and a thin sheet buckles easily, so thin sheets need firm restraint to be drawn without wrinkles. Tearing begins as a local neck, and a neck stops growing only if the metal work-hardens fast enough, so **drawability is described by two material constants — the strain-hardening exponent $n$, which delays necking, and the plastic strain ratio $\bar r$, which says whether the sheet prefers to get narrower or thinner** — both set by the steelworks through composition, rolling and annealing, and both outside the designer's control. Because the sheet is thin, the forces are moderate (a large body panel is drawn on a press of a few hundred to a couple of thousand tonnes); the cost and the lead time are in the **tooling**, which is why sheet-metal parts are designed together with the die shop.

::: warning Six ways sheet-metal design goes wrong
**Specifying a bend radius smaller than the material will allow.** The minimum inside radius is a multiple of the thickness that depends on the alloy and its temper: roughly $0.5t$ for annealed low-carbon steel, $t$–$2t$ for as-rolled and high-strength low-alloy (HSLA) steel, $4t$ or more for hard-rolled grades and high-strength aluminium. Ask for $0.5t$ on a grade that needs $2t$ and the outside fibre, whose strain is $t/(2r+t) = 50\ \%$, cracks — on the visible face. **Bending parallel to the rolling direction.** Sheet has a rolling texture and elongated inclusions, so a bend line parallel to the rolling direction cracks at a smaller strain than one across it; drawings of critical bends specify the grain direction. **Ignoring springback.** A bend is made plastically and released elastically, so the angle you get is not the angle the tool had: for mild steel in air bending it is typically $1$–$3^\circ$; for 1,000 MPa steels it can be $5$–$10^\circ$, which is why such steels are either **hot stamped** (formed at about $900\ ^\circ\mathrm{C}$ and quenched in the die) or bottomed and coined at the end of the stroke at several times the tonnage. **Drawing a cup that is too deep for one draw.** The limiting drawing ratio of mild steel is $D/d \approx 2.1$; ask for 2.5 and the wall splits at the punch radius, and the answer is a first draw plus redraws — more die sets, more press stations, more tolerance stack-up. **Confusing tensile ductility with drawability.** A steel with 30 % elongation in a tensile test can still draw poorly, because deep drawing needs the flange to shrink in width rather than the wall to thin: the number that matters is the **Lankford $r$-value**, the ratio of true width strain to true thickness strain, and a steel with $\bar r = 0.6$ will not draw what a steel with $\bar r = 2.0$ draws easily. **And designing the part before thinking about the die.** A drawing die cannot form an undercut, needs generous radii, and is expensive to change once it has been tried out — so the part designer should talk to the die designer before the geometry is frozen.
:::

## 1. Shearing: cutting a sheet without a chip

::: definition Blanking, punching and the clearance that decides the edge {#def-shear}
Blanking (the piece cut out is the part) and punching or piercing (the piece cut out is scrap) are the same operation: a hardened punch and die with a **clearance** between them of about $c = 0.05$–$0.13\,t$ per side, depending on the material and the edge wanted — smaller for soft, ductile metals and thin stock, larger for hard and thick stock. As the punch enters, the edge first rolls over (**rollover**), then a **burnished** band of plastic shear forms, then cracks start at the punch and die edges and run through the sheet (**fracture zone**), leaving a **burr** on the die side. **If the clearance is right the two cracks meet cleanly and the edge is part burnish, part fracture, with a small burr; if it is too small the cracks miss each other and a secondary burnished band appears; if it is too large the sheet is bent into the gap, the rollover and burr grow and the fracture zone becomes rough and tapered.** The four zones are therefore a diagnosis of clearance and tool wear.

The force is a shear-area calculation:

$$
F \;=\; \tau_{\text{s}}\, A_{\text{shear}} \;\approx\; 0.7\text{–}0.8\, \sigma_{\text{UTS}}\, P\, t \qquad (P \ \text{the perimeter of the cut})
$$

and in this lesson the factor 0.8 is used. The force peaks once the punch has penetrated part of the thickness and falls to almost nothing when the cracks link. **Grinding a shear (an angled or rooftop face) on the punch, or stepping several punches to different heights, spreads the cut over a longer stroke and lowers the peak force; a common rule of thumb for a shear depth $h$ is $F_{\text{peak}} \approx F\, t/(t+h)$.** The work done, force times effective stroke, is not reduced. For a rooftop (double) shear across a punch of diameter $d$ with face angle $\phi$, the shear depth is $h = (d/2)\tan\phi$. A stripper plate holds the sheet down and strips it off the punch on the return stroke.

$$
\begin{array}{l c c c l}
\text{Operation} & \text{What is the part} & \text{Typical clearance} & \text{Edge quality} & \text{Note} \\ \hline
\text{Punching} & \text{the hole} & 5\text{–}10\ \%\ t & \text{good} & \text{slug must be ejected cleanly} \\
\text{Blanking} & \text{the blank} & 5\text{–}10\ \%\ t & \text{good, one burnished band} & \text{the die sets the blank size} \\
\text{Fine blanking} & \text{the blank} & \approx 0.5\ \%\ t & \text{almost fully sheared} & \text{V-ring holder, counter-punch} \\
\text{Guillotine shearing} & \text{the strip} & \text{a few \% } t & \text{fair, burred} & \text{straight cuts only} \\
\text{Laser / waterjet} & \text{the blank} & \text{kerf} & \text{good; laser leaves a HAZ} & \text{no tooling; prototypes and short runs}
\end{array}
$$

**Fine blanking** is the exception: a V-shaped **impingement ring** (V-ring) pressed into the sheet around the cut, a very small clearance and a counter-punch under the part keep the shear zone in hydrostatic compression, so fracture is suppressed and the cut edge is almost entirely burnished, smooth and square enough to replace machining on parts such as gears, cams and seat-adjuster components.
:::

::: example Punching a hole: force, and what a shear buys {#ex-blank level=3 check="40"}
A $20\ \mathrm{mm}$ diameter hole is punched through $2\ \mathrm{mm}$ of mild steel, $\sigma_{\text{UTS}} = 400\ \mathrm{MPa}$, with a clearance of $6\ \%$ of the thickness per side. Find the peak punch force in kN.

$$
F \;=\; \pi d\, t\, (0.8\,\sigma_{\text{UTS}}) \;=\; \frac{\pi \times 20 \times 2 \times 320}{10^{3}} \;=\; 40.2\ \mathrm{kN} \;\approx\; \mathbf{40\ kN}
$$

About four tonnes-force — a modest load for any press, so the design effort in a piercing tool goes into the tool itself: a slender punch that must not buckle or gall, a die that must be reground many times, and a clear path for the slug, because a slug trapped in the die can crack it. The clearance of $6\ \%$ is $0.12\ \mathrm{mm}$ per side; as the edges wear the burr grows, and burr height is the usual signal for regrinding. Grinding a rooftop shear of $2^\circ$ on the punch gives $h = 10 \tan 2^\circ = 0.35\ \mathrm{mm}$ and, by the rule of thumb, a peak of about $40 \times 2/(2+0.35) = 34\ \mathrm{kN}$. **Check:** stress on the punch $= 40.2\ \mathrm{kN}/(\pi \times 10^2\ \mathrm{mm^2}) = 128\ \mathrm{MPa}$, far below the compressive strength of hardened tool steel, so the punch is safe in compression (buckling of slender punches is checked separately).
:::

## 2. Bending: the neutral axis that is not in the middle

::: definition Bend allowance, the K-factor and the minimum radius {#def-bend}
A sheet bent to an inside radius $r$ keeps its **inner surface** at radius $r$ and its **outer surface** at $r + t$; somewhere in between a surface keeps its length: the **neutral surface**, at radius $r + Kt$. For tight bends it lies inside the mid-thickness, because the sheet thins on the outside and the neutral surface shifts towards the inside of the bend. The empirical **$K$-factor** is roughly

$$
K \;\approx\; \begin{cases} 0.33 & r/t < 1 \\ 0.40 & 1 \le r/t \le 3 \\ 0.50 & r/t > 3 \end{cases} \qquad\text{and the } \textbf{bend allowance} \text{ is } \; BA \;=\; \frac{\pi \theta}{180}\,(r + Kt) \quad (\theta \text{ in degrees})
$$

The flat pattern is built from the **outside setback** $SB = (r+t)\tan(\theta/2)$ — the distance from the tangent point to the virtual sharp corner of the outside surfaces — and the **bend deduction** $BD = 2\,SB - BA$, which is what one bend costs in length:

$$
L_{\text{flat}} \;=\; \sum(\text{outside leg dimensions, to the virtual corners}) \;-\; \sum BD
$$

For a single $90^\circ$ bend this is $L = A + B - 2(r+t) + BA$, and for two equal bends $L = A + B + C - 2BD$. **CAD systems and press-brake controls do this arithmetic from a bend table; disagreements about a blank length are usually disagreements about $r$, $K$ or $t$.** Good shops build their bend tables by bending coupons of the actual material on the actual tools, because $K$ varies with alloy, temper and tooling.

The **minimum inside radius** is set by the strain on the outer surface. With the neutral surface at mid-thickness,

$$
\varepsilon_{\text{outer}} \;=\; \frac{(r+t) - (r + t/2)}{r + t/2} \;=\; \frac{t}{2r + t} \quad \text{(engineering strain)} \qquad \Longrightarrow \qquad r_{\min} \;=\; t\left(\frac{1}{2\varepsilon_{\text{allow}}} - \frac{1}{2}\right)
$$

and $\varepsilon_{\text{allow}}$ is well below the strain implied by the tensile reduction of area, because the outer surface carries scratches, sheared-edge damage and texture. Hence the shop tables: about $0.5t$ for annealed low-carbon steel, $t$–$2t$ for as-rolled and HSLA steel, larger multiples for high-strength and hard-tempered grades, and **no cold bending at all** for 1,500 MPa press-hardened boron steel, which is formed hot and quenched in the die.
:::

::: proof The air-bending force {#proof-bendforce}
Air bending is a three-point bend: the sheet rests on a V-die of shoulder span $V$ and is pushed at midspan by the punch. Near the end of the stroke the sheet under the punch has become a plastic hinge, so equating the midspan moment to the fully plastic moment of a strip of width $w$ (rigid–perfectly plastic material, yield stress $\sigma_y$),

$$
\frac{F\, V}{4} \;=\; M_p \;=\; \sigma_y\, w\, \frac{t^2}{4} \qquad \Longrightarrow \qquad F \;=\; \frac{\sigma_y\, w\, t^2}{V}
$$

Real sheet is bent in plane strain, which raises the flow stress by $2/\sqrt3 = 1.15$; it work-hardens towards the tensile strength as the outer-fibre strain grows; and the sheet rubs on the die shoulders. Press-brake makers absorb all of this into an empirical factor applied to the tensile strength, typically about **1.3–1.4** for a die opening of about $8t$. This lesson uses the common catalogue form

$$
\boxed{\; F \;=\; \frac{1.42\; \sigma_{\text{UTS}}\; w\; t^2}{V} \qquad \Longleftrightarrow \qquad \frac{F}{w}\ [\mathrm{kN/m}] \;=\; \frac{1.42\; \sigma_{\text{UTS}}\,[\mathrm{MPa}]\; t^2\,[\mathrm{mm^2}]}{V\,[\mathrm{mm}]} \;}
$$

(N/mm and kN/m are the same unit). It is an estimate for air bending; bottoming needs several times more and coining more still.

**Two consequences.** The force is **inversely proportional to the die opening**, so halving $V$ doubles the tonnage — and $V$ is normally kept at about $6$–$12t$ ($8t$ is the usual choice), because a narrow die marks the sheet and overloads the tooling. And the force goes as **thickness squared**, so a 25 % thicker sheet needs $1.25^2 = 1.56$ times the force. A brake rated at 100 tonnes over 3 m ($\approx 327\ \mathrm{kN/m}$) can air-bend about $4.6\ \mathrm{mm}$ of 400 MPa steel on an $8t$ die, but only about $1.8\ \mathrm{mm}$ of 1,000 MPa steel.
:::

::: widget plot
title: Press-brake force against die opening
f: 2272/x; 5680/x; 327
x: 6,30
y: 0,400
labels: 2 mm mild steel, 400 MPa; 2 mm high-strength steel, 1000 MPa; capacity of a 100-tonne, 3 m brake
caption: Force per metre of bend (kN/m) against the die opening $V$ (mm) for $2\ \mathrm{mm}$ sheet, from $F/w = 1.42\,\sigma_{\text{UTS}}\, t^2/V$. With the usual rule $V \ge 8t = 16\ \mathrm{mm}$, the mild steel needs at most $142\ \mathrm{kN/m}$, well within the brake's $327\ \mathrm{kN/m}$. The 1,000 MPa steel needs $355\ \mathrm{kN/m}$ on a $16\ \mathrm{mm}$ die — more than the brake can give — and drops below the limit only for $V$ above about $17.4\ \mathrm{mm}$; on a $20\ \mathrm{mm}$ die it needs $284\ \mathrm{kN/m}$, a margin of about 15 %. A coil at the top of its strength tolerance eats into that margin, which is why the material certificate matters to the press shop.
:::

## 3. Springback: the bend you did not make

::: definition Why the angle is never the tool angle {#def-spring}
Under the punch the sheet is bent plastically; when the punch withdraws, the bending moment is removed and the sheet unbends elastically. The classical estimate unloads a rectangular section from the fully plastic moment $M_p = \sigma_y w t^2/4$ with elastic stiffness $EI = E w t^3/12$:

$$
\Delta\kappa \;=\; \frac{M_p}{EI} \;=\; \frac{\sigma_y w t^2/4}{E\, w t^3/12} \;=\; \frac{3\sigma_y}{E t} \qquad \Longrightarrow \qquad \Delta\theta \;=\; \Delta\kappa\, L_b \;=\; \frac{3\sigma_y\, L_b}{E\, t}
$$

where $L_b$ is the length of the bent arc, taken here at mid-thickness: $L_b = \theta\,(r + t/2)$ with $\theta$ in radians. **Springback therefore grows with the yield strength, the bend radius and the bend angle, and falls with the thickness and the elastic modulus.** Since aluminium alloys have about one third of steel's modulus, **aluminium springs back about three times as much as steel at the same $\sigma_y$, $r$ and $t$, and a 1,000 MPa steel about three times as much as a 350 MPa mild steel.** Shops often quote a **springback factor**, the ratio of the bend angle under load to the final bend angle; it is close to 1 for coining and stretch bending and grows with strength and with $r/t$.

The countermeasures, in roughly the order a shop reaches for them: **overbend** (bend past the target so the part springs back to it — the usual answer on a CNC press brake, which corrects the stroke from a measured angle); **bottom or coin** (drive the punch into the sheet at the bottom of the stroke so the bend zone is yielded through its thickness — accurate to a fraction of a degree, at several times the air-bending force); **keep the bend radius small**, as small as the minimum-radius rule allows, since springback grows with $r/t$; **stretch forming**, which pulls the whole sheet past yield in tension during bending so that there is little elastic bending stress to release; **hot stamping**, in which boron steel is formed at about $900\ ^\circ\mathrm{C}$, where its flow stress is a small fraction of its room-temperature strength, and quenched in the die to about $1{,}500\ \mathrm{MPa}$ tensile strength, so springback is very small; and **compensation in the die**, in which the die surface is cut with a deliberate over-angle predicted by simulation and corrected during try-out on the production coil.
:::

::: widget plot
title: Springback against thickness for two steels
f: 0.4725*(3+x/2)/x; 1.35*(3+x/2)/x; 2
x: 0.7,4
y: 0,6
labels: mild steel, 350 MPa yield; high-strength steel, 1000 MPa yield; a ±2° angle tolerance
caption: Predicted springback $\Delta\theta = 3\sigma_y L_b/(E t)$, in degrees, for a $90^\circ$ bend to a $3\ \mathrm{mm}$ inside radius on steel with $E = 200\ \mathrm{GPa}$, against sheet thickness $t$ (mm), with $L_b = (\pi/2)(r + t/2)$. Both curves fall with thickness and scale with $\sigma_y$. The mild steel stays inside $2^\circ$ for any thickness above about $0.8\ \mathrm{mm}$; the 1,000 MPa steel needs more than about $3.1\ \mathrm{mm}$, so thin high-strength parts must be overbent, coined, stretch-formed or hot stamped. The simple model ignores work hardening and the reduced bending moment of a partly elastic section, so treat it as a trend, not a die setting.
:::

::: example A bracket, its flat pattern, and its angle {#ex-bendallow level=3 check="61.0"}
A bracket measures $40\ \mathrm{mm}$ and $25\ \mathrm{mm}$ over its two outside legs, with one $90^\circ$ bend, in $2\ \mathrm{mm}$ mild steel ($\sigma_y = 350\ \mathrm{MPa}$, $\sigma_{\text{UTS}} = 400\ \mathrm{MPa}$) with a $3\ \mathrm{mm}$ inside radius. Find the blank length in mm, the springback, and the force to air-bend a $100\ \mathrm{mm}$ wide part on a $16\ \mathrm{mm}$ die.

With $r/t = 1.5$ the $K$-factor is $0.40$, so the neutral radius is $3 + 0.4 \times 2 = 3.8\ \mathrm{mm}$ and

$$
BA = \frac{\pi \times 90}{180} \times 3.8 = 5.97\ \mathrm{mm}, \qquad SB = (3+2)\tan 45^\circ = 5.00\ \mathrm{mm}
$$
$$
BD = 2 \times 5.00 - 5.97 = 4.03\ \mathrm{mm} \qquad \Longrightarrow \qquad L_{\text{flat}} = 40 + 25 - 4.03 = \mathbf{61.0\ mm}
$$

Adding the two legs would give 65 mm, 4 mm (about 6 %) too long. **Springback:** $L_b = (\pi/2)(3 + 1) = 6.28\ \mathrm{mm}$, so $\Delta\theta = 3 \times 350 \times 6.28/(200{,}000 \times 2) = 0.0165\ \mathrm{rad} = 0.9^\circ$; the punch must take the bend to about $90.9^\circ$, and try-out on the actual coil fixes the final setting. **Force:** $F = 1.42 \times 400 \times 100 \times 2^2/16 = 14{,}200\ \mathrm{N} = 14\ \mathrm{kN}$, about 1.5 tonnes-force — trivial for any press brake. **Check:** the blank must be shorter than the sum of the outside legs and longer than the sum of the inside legs ($37 + 22 = 59\ \mathrm{mm}$); 61.0 mm lies between.
:::

## 4. Deep drawing: the cup, and the contest in the flange

::: definition What a drawing die does {#def-draw}
A drawing die has a punch, a die cavity and a clamp. The **punch** of diameter $d$ pushes a disc of diameter $D$ into the **die**; the **die radius** $r_d$ (typically $5$–$10t$) at the cavity mouth is where the flange bends, unbends and slides in; the **punch radius** $r_p$ is where the wall wraps around the punch nose and where the cup usually tears if it is going to; and the **blank holder** clamps the flange with a force $F_{bh}$ against the die face.

The mechanics are a contest across the die radius. **In the flange** the metal is pulled radially inwards and, because each ring must shrink to a smaller circumference, it is also **compressed in the hoop direction** — and a thin annulus under hoop compression wrinkles, which the blank holder exists to prevent. **In the wall** the punch load is carried as a membrane tension, and the wall can neck and tear near the punch radius, where it has thinned most and hardened least. **The blank-holder force sits between the two failures: too little and the flange wrinkles, too much and the friction it adds tears the wall.** Lubrication, die radii and draw beads all widen or shift that window.

Drawability is measured by the **limiting drawing ratio** (LDR), the largest blank-to-punch diameter ratio that can be drawn in one operation:

$$
\left(\frac{D}{d}\right)_{\max} \;\approx\; 2.0\text{–}2.2 \ \text{ for drawing-quality steel}, \qquad \text{about } 1.9\text{–}2.1 \ \text{ for aluminium alloys and stainless steel}
$$

and the reason it is so similar across materials is derived below. The material property that moves it most is the **Lankford plastic strain ratio**

$$
r \;=\; \frac{\varepsilon_{\text{width}}}{\varepsilon_{\text{thickness}}} \;=\; \frac{\ln(w/w_0)}{\ln(t/t_0)}, \qquad \bar r = \frac{r_0 + 2r_{45} + r_{90}}{4}, \qquad \Delta r = \frac{r_0 + r_{90} - 2r_{45}}{2}
$$

measured in tensile tests cut at $0^\circ$, $45^\circ$ and $90^\circ$ to the rolling direction, usually at 15–20 % strain. A sheet with $\bar r > 1$ resists thinning: the wall is stronger in the through-thickness direction than the flange is resistant to drawing in, and the LDR rises. Isotropic material has $\bar r = 1$; good drawing steels (aluminium-killed and interstitial-free) reach $\bar r \approx 1.6$–$2.5$ thanks to a crystallographic texture with $\{111\}$ planes parallel to the sheet surface, produced by cold rolling and annealing; aluminium alloys typically have $\bar r \approx 0.6$–$0.8$. **The planar anisotropy $\Delta r$ makes a drawn cup develop "ears" — usually four, at $0^\circ$ and $90^\circ$ to the rolling direction when $\Delta r > 0$ and at $\pm 45^\circ$ when $\Delta r < 0$ — which must be trimmed off.** The strain-hardening exponent $n$ matters less for the LDR than for stretching (section 5).

A cup deeper than one draw allows is **redrawn**, at a smaller ratio (typically about 1.2–1.5 per redraw), often with an intermediate anneal to restore ductility. **Ironing** squeezes the wall between punch and die set at a clearance below the wall thickness, thinning it to a uniform gauge; drawing followed by ironing is how beverage-can bodies are made. **Draw beads** — a ridge on the blank holder running in a groove in the die — add a controlled restraint where a flat clamp cannot, and are standard on large, shallow automotive panels.
:::

::: proof Why the limiting drawing ratio is about two {#proof-ldr}
Assume a rigid–perfectly plastic sheet of uniform thickness $t$, flow stress $\bar\sigma$ (Tresca, so that $\sigma_r - \sigma_\theta = \bar\sigma$ in the flange, where $\sigma_\theta$ is compressive), no friction and no bending losses. Radial equilibrium of a flange element at radius $\rho$ is

$$
\frac{d\sigma_r}{d\rho} + \frac{\sigma_r - \sigma_\theta}{\rho} \;=\; 0 \qquad \Longrightarrow \qquad \frac{d\sigma_r}{d\rho} = -\frac{\bar\sigma}{\rho}
$$

With $\sigma_r = 0$ at the free outer edge $\rho = D/2$, integration gives the radial stress at the die throat $\rho = d/2$:

$$
\sigma_r\big|_{d/2} \;=\; \bar\sigma \ln\frac{D}{d}, \qquad F_{\text{draw}} \;=\; \pi d\, t\, \bar\sigma \ln\frac{D}{d}
$$

This is largest at the start of the draw, when the flange is widest. Friction, bending and unbending at the die radius and the blank-holder add to it; lumping them into a **drawing efficiency** $\eta$ gives $F_{\text{draw}} = \pi d t \bar\sigma \ln(D/d)/\eta$. The wall can carry at most $F_{\max} = \pi d\, t\, \sigma_w$, where $\sigma_w$ is the stress at which the wall itself yields and necks. Setting $\sigma_w \approx \bar\sigma$ (both regions have similar flow stress; anisotropy with $\bar r > 1$ raises $\sigma_w$ relative to $\bar\sigma$),

$$
\ln\left(\frac{D}{d}\right)_{\max} \;=\; \eta \qquad\Longrightarrow\qquad \text{LDR} = e^{\eta}
$$

With no losses ($\eta = 1$) the ideal LDR is $e = 2.72$. Real efficiencies of about $0.7$–$0.8$ give $e^{0.7}$–$e^{0.8} = 2.0$–$2.2$, the observed range. **The analysis shows that the limit is a ratio, not a depth; that it is set by the strength of the wall, not by the punch; and that the ways to raise it are to reduce friction and bending losses (raise $\eta$) or strengthen the wall relative to the flange (high $\bar r$).** That is the list of what a die designer and a steelmaker can actually do.
:::

::: example Drawing a 100 mm cup 60 mm deep {#ex-drawcup level=3 check="84"}
A cup $100\ \mathrm{mm}$ in diameter and $60\ \mathrm{mm}$ deep, with a $9\ \mathrm{mm}$ punch corner radius, is to be drawn from $1\ \mathrm{mm}$ drawing-quality steel, $\sigma_{\text{UTS}} = 340\ \mathrm{MPa}$, LDR = 2.1. Find the blank diameter, check whether one draw suffices, and estimate the drawing force in kN (take $\bar\sigma \approx \sigma_{\text{UTS}}$ and $\eta = 0.75$).

The blank diameter follows from equal surface areas (thickness assumed constant), using the standard formula for a cup with a corner radius $r$:

$$
D \;=\; \sqrt{d^2 + 4dh - 1.72\, d\, r} \;=\; \sqrt{100^2 + 4 \times 100 \times 60 - 1.72 \times 100 \times 9} \;=\; \sqrt{32{,}452} \;=\; 180\ \mathrm{mm}
$$

so $D/d = 1.80$ — **inside the limit of 2.1: one draw.** The drawing force from the proof is

$$
F \;=\; \frac{\pi d\, t\, \bar\sigma \ln(D/d)}{\eta} \;=\; \frac{\pi \times 100 \times 1 \times 340 \times \ln 1.80}{0.75} \;=\; 83{,}800\ \mathrm{N} \;\approx\; \mathbf{84\ kN}
$$

against a wall capacity of $\pi d t \sigma_{\text{UTS}} = 107\ \mathrm{kN}$, a margin of about 1.3. The blank-holder force comes on top of this (see the exercises), so a press of about 20 tonnes would be chosen. **Design changes:** for a depth of $80\ \mathrm{mm}$, $D = 201\ \mathrm{mm}$ and $D/d = 2.01$, still one draw but close to the limit; for $110\ \mathrm{mm}$, $D = 229\ \mathrm{mm}$ and $D/d = 2.29$ — **over the limit, so the part needs a first draw and a redraw, with a second die set.** **Check:** the ideal formula with $\eta = 0.75$ predicts failure when $\ln(D/d) = 0.75$, i.e. $D/d = 2.12$, consistent with the stated LDR of 2.1.
:::

## 5. Stretching, and the diagram that says when it stops

::: definition The forming limit diagram {#def-fld}
Stretch forming — a dome, a corner, a doubly curved panel — has little or no flange draw-in, and its limit is **localised necking**: the sheet thins until a band becomes easier to deform than the surrounding metal, all further strain goes into the band, and the part splits. The strain at which that happens depends on the **strain path**, described by the ratio $\rho = \varepsilon_2/\varepsilon_1$ of minor to major principal surface strain: uniaxial tension of an isotropic sheet gives $\rho = -0.5$, plane strain $\rho = 0$ and equibiaxial stretching $\rho = +1$. Plotting the **limit major strain** against the minor strain gives the **forming limit diagram** (FLD) and its **forming limit curve** (FLC). Its characteristic V shape has its **lowest point at plane strain**, $\varepsilon_2 = 0$, called $\mathrm{FLD}_0$.

For low-carbon and conventional high-strength steels the empirical **Keeler–Brazier** relation (engineering strain, per cent) gives the plane-strain limit from the strain-hardening exponent and the thickness:

$$
\mathrm{FLD}_0\ [\%] \;=\; \left(23.3 + 14.13\, t\,[\mathrm{mm}]\right)\frac{n}{0.21} \qquad (n \le 0.21,\ t \text{ up to about } 3\ \mathrm{mm})
$$

The standard construction then draws the **left branch** ($\varepsilon_2 < 0$) as a line of constant thickness strain, $\varepsilon_1 + \varepsilon_2 = \varepsilon_0$ in true strain (where $\varepsilon_0 = \ln(1 + \mathrm{FLD}_0/100)$), so the limit major strain *rises* as the minor strain becomes more negative; and the **right branch** ($\varepsilon_2 > 0$) rising more gently, with a slope of about 0.6, up to minor strains of about 20 %. The relation does not apply to most advanced high-strength steels, whose curves must be measured.

**Three facts follow.** **Plane strain is the worst case**: a feature that stretches in one direction while the other is held — a long radius, the wall of a shallow draw, a character line — fails at the lowest major strain. **Allowing the sheet to contract sideways ($\varepsilon_2 < 0$) raises the limit**, because the thickness then falls more slowly for the same major strain. **And the whole curve scales with $n$**, which is the same physics as Considère's criterion $\varepsilon_u = n$ (derived in the exercises): **the most valuable thing a steelmaker can give a stretch-forming sheet is a high strain-hardening exponent.**

A production part is checked by printing or etching a grid of small circles on the blank, forming it, and measuring the ellipses at the critical points: $\varepsilon_1 = \ln(\text{major axis}/d_0)$, $\varepsilon_2 = \ln(\text{minor axis}/d_0)$. **The acceptance rule is a margin: a common shop practice is to require the measured point to lie about 10 percentage points of major strain below the curve**, because the curve is a scatter band, the measurement has an uncertainty of about one point, and $n$ and thickness vary from coil to coil.
:::

::: widget plot
title: The forming limit diagram
f: max(30.5-x,30.5+0.6*x); max(20.5-x,20.5+0.6*x); max(22.7-x,22.7+0.6*x)
x: -40,40
y: 0,80
labels: drawing steel, n = 0.20, t = 1 mm; the same with a 10-point safety margin; dual-phase steel, n = 0.12, t = 1.5 mm
caption: Limit major strain $\varepsilon_1$ (true strain, per cent) against minor strain $\varepsilon_2$ (per cent), constructed from the Keeler–Brazier $\mathrm{FLD}_0$ with a left branch of constant thickness ($\varepsilon_1 + \varepsilon_2 = \varepsilon_0$) and a right branch of slope 0.6. (Keeler's construction is in engineering strain; drawing both branches in true strain is a simplification that matters little below about 20 % minor strain.) The drawing steel has $\mathrm{FLD}_0 = 35.6\ \%$ engineering, $\varepsilon_0 = 30.5\ \%$ true; the dual-phase steel $\mathrm{FLD}_0 = 25.4\ \%$, $\varepsilon_0 = 22.7\ \%$, and its curve would in practice be measured rather than estimated. Every point is lowest at plane strain, which is why a part is judged by where each critical point sits on the diagram, not by its major strain alone.
:::

::: widget plot
title: What the strain-hardening exponent buys
f: 100*(exp(x)-1); 30
x: 0.05,0.6
y: 0,90
labels: uniform elongation e^n − 1 (per cent); a 30 % stretch
caption: Uniform elongation in a tensile test, in per cent, against the strain-hardening exponent $n$, from Considère's criterion (derived in the exercises): a specimen of a material with $\sigma = K\varepsilon^n$ starts to neck when $d\sigma/d\varepsilon = \sigma$, i.e. at true strain $\varepsilon_u = n$, which is an engineering elongation of $e^n - 1$. To reach a 30 % uniform stretch needs $n \approx \ln 1.3 = 0.26$. Typical values: low-carbon drawing steel $n \approx 0.20$–$0.24$, interstitial-free steel $0.22$–$0.28$, austenitic stainless steel 304 about $0.4$–$0.5$, a 1,000 MPa dual-phase steel about $0.1$, and as-quenched martensitic press-hardened steel very little — which is why the strongest automotive grades are formed hot, before they become martensite.
:::

::: example Is the panel safe? {#ex-fld level=3 check="30.5"}
A drawn panel is printed with $4.0\ \mathrm{mm}$ circles before forming. Afterwards, at point A the circle has become an ellipse of $5.2\ \mathrm{mm} \times 4.0\ \mathrm{mm}$, and at point B one of $5.6\ \mathrm{mm} \times 3.4\ \mathrm{mm}$. The sheet is $1\ \mathrm{mm}$ drawing steel with $n = 0.20$. Find the limit major strain at A (true strain, in per cent) and judge both points with a 10-point margin.

$\mathrm{FLD}_0 = (23.3 + 14.13 \times 1)(0.20/0.21) = 35.6\ \%$ engineering, so $\varepsilon_0 = \ln 1.356 = 0.305$.

$$
\text{A: } \varepsilon_1 = \ln(5.2/4.0) = 0.262, \quad \varepsilon_2 = \ln(4.0/4.0) = 0 \qquad \text{(plane strain)}
$$
$$
\text{B: } \varepsilon_1 = \ln(5.6/4.0) = 0.336, \quad \varepsilon_2 = \ln(3.4/4.0) = -0.163 \qquad (\rho = -0.48)
$$

Point A is at plane strain, where the limit is $\varepsilon_0 = \mathbf{30.5\ \%}$ against a measured $26.2\ \%$: below the curve, but **only 4.3 points below it, inside the 10-point margin — a marginal point that will split on a soft or thin coil.** Point B is on the left branch, where the limit is $30.5 + 16.3 = 46.8\ \%$ against a measured $33.6\ \%$: **13 points of margin, safe — although B has been stretched further than A.** **That is the practical content of the FLD: the direction of the minor strain matters as much as the size of the major strain.** The fix at A is to move the strain path away from plane strain or reduce the stretch there — a larger radius at the feature, a change in blank shape or draw-bead restraint that lets more metal flow in.

**Check:** at B the thickness strain is $-(0.336 - 0.163) = -0.173$, at A it is $-0.262$, so A has thinned more ($e^{-0.262} = 0.77$ of the original thickness) despite its smaller major strain — consistent with A being the critical point.
:::

## 6. The rest of the family

::: definition The sheet-metal processes and what each is for {#def-rest}
$$
\begin{array}{l l l l l}
\textbf{Process} & \textbf{Stress state} & \textbf{Limit} & \textbf{Typical part} & \textbf{Rate} \\ \hline
\text{Press-brake bending} & \text{bending} & \text{springback, } r_{\min} & \text{brackets, enclosures, chassis rails} & \text{tens per hour} \\
\text{Roll bending} & \text{progressive bending} & \text{springback, flat ends} & \text{cylinders, large tubes} & \text{slow} \\
\text{Deep drawing} & \text{tension + hoop compression} & D/d, \text{ wrinkling} & \text{cups, sinks, sumps, battery cases} & 10\text{–}60/\mathrm{min} \\
\text{Redrawing / ironing} & \text{tension, wall ironing} & \text{work hardening, anneals} & \text{beverage cans, deep shells} & \text{hundreds}/\mathrm{min} \text{ (cans)} \\
\text{Stretch forming} & \text{biaxial tension} & \text{FLD} & \text{aircraft skins} & \text{slow} \\
\text{Sheet hydroforming} & \text{tension + fluid pressure} & \text{FLD (raised by pressure)} & \text{aircraft fittings, panels} & \text{minutes} \\
\text{Tube hydroforming} & \text{internal pressure + axial feed} & \text{bursting, wrinkling} & \text{frame rails, exhaust parts, bicycle frames} & \text{tens of seconds} \\
\text{Spinning} & \text{local bending, roller tool} & \text{thinning, tool path} & \text{reflectors, cookware, tank ends} & \text{minutes} \\
\text{Shear spinning} & \text{local shear} & \text{wall cracking} & \text{cones, pressure-vessel heads} & \text{minutes} \\
\text{Roll forming} & \text{progressive bending} & \text{edge strain, springback} & \text{gutters, rails, profiles} & 10\text{–}60\ \mathrm{m/min} \\
\text{Hot stamping} & \text{form hot, quench in die} & \text{cycle time, coating} & \text{B-pillars, bumper beams, roof rails} & \text{a few strokes/min} \\
\text{Electromagnetic forming} & \text{pulsed, strain rate } 10^{3}\text{–}10^{4}\ \mathrm{s^{-1}} & \text{coil life, conductivity} & \text{tube crimps, aluminium panels} & \text{seconds} \\
\text{Incremental (ISF)} & \text{local stretching, point tool} & \text{FLD, wall angle} & \text{prototypes, one-off panels} & \text{hours}
\end{array}
$$

Four of these change what a designer can ask for. **Hydroforming** replaces the punch or die with fluid pressure. In sheet hydroforming (fluid-cell or rubber-pad forming) one rigid tool and a pressurised diaphragm form the part, so one tool serves for low-volume aircraft parts; the superposed pressure also delays necking. In tube hydroforming a tube is expanded into a die by internal pressure while its ends are pushed in to feed material, making closed sections with varying cross-section in one piece. **Roll forming** bends strip progressively through a series of roll stands, each adding a few degrees, so long constant sections are made continuously and cut to length; holes are usually punched in line before the forming stands. **Hot stamping** (press hardening) heats a boron steel blank such as 22MnB5 to about $900$–$950\ ^\circ\mathrm{C}$ to make it austenitic, transfers it in a few seconds to a water-cooled die, forms it while it is soft and holds the die closed for several seconds so the part is quenched faster than the critical cooling rate (about $27\ \mathrm{K/s}$) to martensite of about $1{,}500\ \mathrm{MPa}$ tensile strength: **formed with modest forces and almost no springback, it comes out about three times as strong as mild steel, and is then trimmed and pierced by laser (or punched in the die while still hot), because cold-trimming the hardened part wears dies very fast.** **Tailor-welded blanks** laser-weld sheets of different thickness or grade into one blank before forming, so one drawn part is thick where it must be stiff and thin elsewhere; the weld line must be placed where the forming strains are moderate.
:::

::: example Hot stamping against cold-formed high-strength steel {#ex-hss level=3 check="1.47"}
A bumper reinforcement, 1,400 mm long with a developed (flat) width of 300 mm, is made either (A) cold-formed from a 1,000 MPa dual-phase steel or (B) hot stamped from 22MnB5 to 1,500 MPa, $1.2\ \mathrm{mm}$ thick. If the crash requirement is taken as an equal fully plastic bending moment per unit width, $M_p \propto \sigma\, t^2$, what thickness does route A need, and how much heavier is it? (Enter the route-A thickness in mm to two decimal places; steel density $7{,}850\ \mathrm{kg/m^3}$.)

Equal $\sigma t^2$ gives

$$
t_A \;=\; t_B\sqrt{\frac{\sigma_B}{\sigma_A}} \;=\; 1.2\sqrt{\frac{1500}{1000}} \;=\; \mathbf{1.47\ mm}
$$

22 % thicker, and the extra mass is $7{,}850 \times 1.4 \times 0.30 \times (1.47 - 1.20) \times 10^{-3} = 0.89\ \mathrm{kg}$ per part. **Route A** runs on an existing cold press line at several parts per minute, but its springback must be controlled by over-bending and die compensation. **Route B** saves the mass and holds its shape, but needs a furnace, a cooled die, a cycle of several seconds closed in the die, and laser trimming. Which wins depends on volume, on the value placed on mass, and on dimensional tolerance; for safety cage parts such as B-pillars, carmakers have widely chosen hot stamping. **Check:** if the requirement were tensile strength alone ($\propto \sigma t$) the ratio would be $1.5$ and the thickness $1.80\ \mathrm{mm}$; bending-dominated loading favours the thinner, stronger sheet less strongly than pure tension does.
:::

## 7. Tooling, presses and the shape of the cost

::: definition What a sheet-metal part costs {#def-econ}
The press is bought for **tonnage, bed size and shut height**; the die is bought for **material, machining time and try-out**. Press-brake tooling is standard and changed in minutes; a drawing die for a large car panel is a substantial casting (often nodular cast iron with hardened steel inserts on the working edges), machined on five-axis mills and then **tried out** — run, inspected, adjusted and re-run many times — before it makes good panels. Try-out is a large share of the die cost and lead time. Indicative figures (2020s, wide variation):

$$
\begin{array}{l c c c c}
& \text{laser + brake} & \text{prototype tool} & \text{production die} & \text{transfer / tandem line die} \\
\text{Tooling} & \pounds 0\text{–}2\mathrm{k} & \pounds 8\text{–}25\mathrm{k} & \pounds 60\text{–}250\mathrm{k} & \sim\pounds 300\mathrm{k} \text{ per die, several dies} \\
\text{Lead time} & \text{days} & 4\text{–}8 \text{ weeks} & 16\text{–}30 \text{ weeks} & 40\text{–}60 \text{ weeks} \\
\text{Life} & \text{machine time} & 5\mathrm{k}\text{–}20\mathrm{k} \text{ parts} & 300\mathrm{k}\text{–}1\mathrm{M} & \text{millions} \\
\text{Tolerance} & \pm 0.5\ \mathrm{mm} & \pm 0.5\ \mathrm{mm} & \pm 0.2\ \mathrm{mm} & \pm 0.1\ \mathrm{mm} \\
\text{Rate} & \text{a few per hour} & \text{a few per hour} & 6\text{–}20/\mathrm{min} & 10\text{–}25 \text{ strokes/min}
\end{array}
$$

**The break-even arithmetic is the same as in [[manufacturing/process-selection|process selection]]:** a production die at £150,000 against a prototype tool at £15,000 with a per-part penalty of £3.20 breaks even at $(150{,}000 - 15{,}000)/3.20 \approx 42{,}000$ parts. Below that quantity the cheaper tool wins even though each part costs more. Large panels are made on tandem or transfer press lines costing tens of millions of pounds, which is why car bodies need high annual volumes, and why low-volume makers buy stampings from contract stampers or use aluminium extrusions and castings with fewer, simpler sheet parts.
:::

::: example 4,000 electric scooter body panels {#ex-scoot level=3 check="20000"}
A scooter's front fairing is a 600 mm drawn panel in 1.2 mm aluminium, 4,000 a year for four years (16,000 in all). Production tooling costs £190,000 and gives £11.40 a panel. A **soft tool** — a cast zinc-alloy or aluminium die run on a slower press with a separate trim operation — costs £22,000 and gives £19.80 a panel. Find the break-even quantity between the two (enter the number of panels).

$$
N^{*} \;=\; \frac{190{,}000 - 22{,}000}{19.80 - 11.40} \;=\; \frac{168{,}000}{8.40} \;=\; \mathbf{20{,}000 \ \text{panels}}
$$

**More than the whole four-year programme of 16,000**, so the soft tool wins: over the programme it costs $22{,}000 + 16{,}000 \times 19.80 = \pounds 338{,}800$ against $190{,}000 + 16{,}000 \times 11.40 = \pounds 372{,}400$ — it pays £134,400 more in part cost but saves £168,000 in tooling, a net saving of £33,600. The part is then designed for the soft tool: larger draw radii, trim lines that are easy to reach, and possibly a split into two shallower pressings joined afterwards. **Check:** at exactly 20,000 panels both routes would cost $\pounds 418{,}000$.
:::

## Exercises

::: exercise Blanking force with a shear {#ex-blankforce level=2 check="150"}
A hexagon 60 mm across flats is blanked from $1.5\ \mathrm{mm}$ hardened stainless steel, $\sigma_{\text{UTS}} = 600\ \mathrm{MPa}$. Estimate the peak blanking force with $F = 0.8\sigma_{\text{UTS}} P t$. (Enter kN, to the nearest 10.)
::: solution
The side of a regular hexagon is (across flats)$/\sqrt3 = 34.6\ \mathrm{mm}$, so the perimeter is $6 \times 60/\sqrt3 = 208\ \mathrm{mm}$ and $F = 0.8 \times 600 \times 208 \times 1.5/10^3 = 149.6 \approx \mathbf{150\ kN}$. With a shear depth of $2\ \mathrm{mm}$ ground on the punch, the rule of thumb $F t/(t+h)$ gives about $150 \times 1.5/3.5 = 64\ \mathrm{kN}$ peak, at the cost of a slightly bowed blank; the work of cutting is not reduced.
:::
:::

::: exercise Flat pattern of a channel {#ex-channel level=2 check="134.2"}
A channel is formed by two $90^\circ$ bends: outside dimensions $30\ \mathrm{mm}$ (leg), $80\ \mathrm{mm}$ (web), $30\ \mathrm{mm}$ (leg), in $1.5\ \mathrm{mm}$ sheet with a $2\ \mathrm{mm}$ inside radius and $K = 0.40$. Find the blank length. (Enter mm to one decimal place.)
::: solution
$SB = (2 + 1.5)\tan 45^\circ = 3.50\ \mathrm{mm}$, $BA = (\pi/2)(2 + 0.4 \times 1.5) = 4.08\ \mathrm{mm}$, $BD = 2 \times 3.50 - 4.08 = 2.92\ \mathrm{mm}$, so $L = 140 - 2 \times 2.92 = \mathbf{134.2\ mm}$. Summing the outside dimensions (140 mm) would be $4.3\ \%$ too long.
:::
:::

::: exercise Minimum bend radius {#ex-rmin level=2 check="8.0"}
A steel has $25\ \%$ reduction of area in tension. Taking the allowable outer-fibre engineering strain as one third of the engineering strain implied by that reduction of area, find the minimum inside radius for $2\ \mathrm{mm}$ sheet. (Enter mm, to one decimal place.)
::: solution
By volume constancy a 25 % reduction of area corresponds to a local length ratio $1/(1 - 0.25)$, i.e. an engineering strain of $0.25/0.75 = 0.333$. One third of it is $\varepsilon_{\text{allow}} = 0.111$, and $\varepsilon = t/(2r+t)$ gives

$$
r = t\left(\frac{1}{2\varepsilon} - \frac12\right) = 2\,(4.5 - 0.5) = \mathbf{8.0\ mm} = 4t
$$

Four thicknesses — in line with shop tables for high-strength and hard-tempered grades, and a reminder that a drawing note such as "all bends R1" on a high-strength part may be impossible to make.
:::
:::

::: exercise Overbending a high-strength bend {#ex-overbend level=2 check="4.1"}
A $1.2\ \mathrm{mm}$ sheet of 1,000 MPa yield steel is air-bent to a $3\ \mathrm{mm}$ inside radius through $90^\circ$. Estimate the springback from $\Delta\theta = 3\sigma_y L_b/(E t)$ with $L_b$ at mid-thickness, and state the angle to which it must be bent. Take $E = 200\ \mathrm{GPa}$. (Enter the springback in degrees to one decimal place.)
::: solution
$L_b = (\pi/2)(r + t/2) = 1.571 \times 3.6 = 5.65\ \mathrm{mm}$, so $\Delta\theta = 3 \times 1{,}000 \times 5.65/(200{,}000 \times 1.2) = 0.0707\ \mathrm{rad} = \mathbf{4.1^\circ}$, and the tool must bend to about $94.1^\circ$. This agrees with the springback figure at $t = 1.2\ \mathrm{mm}$. A $4^\circ$ error on a 100 mm flange moves its free end by $100 \tan 4.05^\circ = 7.1\ \mathrm{mm}$ — far too much for assembly, hence overbending under angle control, coining or hot stamping.
:::
:::

::: exercise Number of draws {#ex-redraw level=2 check="3"}
A $250\ \mathrm{mm}$ blank must become a $70\ \mathrm{mm}$ diameter cup. Taking a first-draw limit of 2.1 and a redraw limit of 1.4, how many drawing operations are needed, and what are suitable intermediate diameters? (Enter the number of draws.)
::: solution
First draw: $250/2.1 = 119\ \mathrm{mm}$ at the smallest. First redraw: $119/1.4 = 85\ \mathrm{mm}$. A second redraw could reach $85/1.4 = 61\ \mathrm{mm}$, so 70 mm is reached in the third operation: $250 \to 120 \to 86 \to 70\ \mathrm{mm}$, i.e. $\mathbf{3}$ draws (ratios 2.08, 1.40, 1.23). In practice the reductions would be spread more evenly, and the shop decides whether intermediate anneals are needed.
:::
:::

::: exercise Blank-holder force and the two failures {#ex-bh level=3 check="1.4"}
In the cup of the worked example the wall can carry $\pi d t \sigma_{\text{UTS}} = 107\ \mathrm{kN}$, and the flange needs $75\ \mathrm{kN}$ to draw in without blank-holder friction. To stop wrinkling the blank-holder pressure must be at least $0.8\ \mathrm{MPa}$ on the flange annulus, whose area is $\pi(180^2 - 100^2)/4 = 17{,}600\ \mathrm{mm}^2$; the friction coefficient is 0.1 on each face. Find the ratio of wall capacity to total drawing force. (Enter it to one decimal place.)
::: solution
The blank-holder force is $0.8 \times 17{,}600 = 14.1\ \mathrm{kN}$, and the friction acts on both faces of the flange: $2\mu F_{bh} = 2 \times 0.1 \times 14.1 = 2.8\ \mathrm{kN}$. The drawing force becomes $75 + 2.8 = 77.8\ \mathrm{kN}$, and the ratio is $107/77.8 = \mathbf{1.4}$: the cup draws. Doubling the pressure to $1.6\ \mathrm{MPa}$ (because wrinkles appeared on try-out) adds another $2.8\ \mathrm{kN}$, giving $80.6\ \mathrm{kN}$ and a ratio of 1.3 — still safe. Here the friction is a small part of the load; with a larger blank, a higher friction coefficient or draw beads the same margin can vanish, which is when splitting appears.
:::
:::

::: exercise FLD check {#ex-fldchk level=3 check="34.0"}
A panel is pressed from $0.8\ \mathrm{mm}$ steel with $n = 0.18$. A critical point shows true strains $\varepsilon_1 = 30.0\ \%$, $\varepsilon_2 = -8.0\ \%$. Using the Keeler–Brazier $\mathrm{FLD}_0$ and a left branch of constant thickness strain, find the limit major strain (true, per cent) at this minor strain and say whether the point passes a 10-point margin. (Enter the limit strain in per cent to one decimal place.)
::: solution
$\mathrm{FLD}_0 = (23.3 + 14.13 \times 0.8)(0.18/0.21) = 29.7\ \%$ engineering, $\varepsilon_0 = \ln 1.297 = 0.260$. On the left branch $\varepsilon_1^{*} = \varepsilon_0 - \varepsilon_2 = 26.0 + 8.0 = \mathbf{34.0\ \%}$. The point, at $30.0\ \%$, is below the curve by $4.0$ points — **it does not split, but it fails the 10-point margin.** Had the same major strain occurred at plane strain, the limit would be only $26.0\ \%$ and the panel would split; the minor strain at a feature depends on blank shape and restraint, so the remedy is to change those, or to use a thicker or higher-$n$ sheet.
:::
:::

::: exercise Derive Considère's criterion and the uniform elongation {#ex-derive-considere level=4 check="22"}
Show that a tensile specimen of material $\sigma = K\varepsilon^n$ (true stress, true strain) begins to neck at $\varepsilon_u = n$, and find the uniform elongation (as a per cent engineering extension) for $n = 0.20$. (Enter per cent to the nearest whole number.)
::: solution
At the onset of necking the load $F = \sigma A$ reaches a maximum, so $dF = A\,d\sigma + \sigma\, dA = 0$. Volume constancy, $A l = \text{const}$, gives $dA/A = -dl/l = -d\varepsilon$. Hence

$$
\frac{d\sigma}{\sigma} \;=\; -\frac{dA}{A} \;=\; d\varepsilon \qquad \Longrightarrow \qquad \frac{d\sigma}{d\varepsilon} = \sigma
$$

With $\sigma = K\varepsilon^n$: $nK\varepsilon^{n-1} = K\varepsilon^n$, so $\varepsilon_u = n = 0.20$, an engineering extension of $e^{0.20} - 1 = 0.221 = \mathbf{22\ \%}$. This is why $n$ is the formability exponent for stretching. A dual-phase steel with $n = 0.10$ necks at $e^{0.10} - 1 = 11\ \%$ uniform elongation even if its total elongation is over 20 %; the rest happens inside the neck, where a forming operation cannot use it.
:::
:::

::: exercise Derive the outer-fibre bend strain {#ex-derivebendstrain level=4 check="33"}
Show that the outer-surface engineering strain in a bend of inside radius $r$ and thickness $t$, with the neutral surface at mid-thickness, is $\varepsilon = t/(2r+t)$, and evaluate it for $r = t$. (Enter per cent, to the nearest whole number.)
::: solution
Over a bend angle $\theta$ the outer surface, at radius $r + t$, has length $(r+t)\theta$, and the neutral surface, at $r + t/2$, keeps its original length $(r + t/2)\theta$. The engineering strain of the outer surface is

$$
\varepsilon = \frac{(r + t) - (r + t/2)}{r + t/2} = \frac{t/2}{r + t/2} = \frac{t}{2r + t} \;\xrightarrow{\;r = t\;}\; \frac13 = \mathbf{33\ \%}
$$

A third at $r = t$ — which is why $r = t$ is close to the limit for many as-rolled steels, and why the minimum radius is a property of the material rather than of the tool. For a given radius a thinner sheet has a smaller outer-fibre strain; for a given $r/t$ the strain is the same at every thickness.
:::
:::

::: quiz A cup splits at the punch radius. Which change will *not* help? {#quiz-split}
- [ ] A larger punch radius
- [ ] A larger die radius
- [ ] A lower blank-holder force (if wrinkling allows)
- [x] A larger blank diameter
::: solution
**A larger blank raises the drawing ratio and with it the load the wall must carry — the one change that makes splitting worse.** The other three reduce the wall stress or the strain concentration: a larger punch radius spreads the bending at the critical section; a larger die radius reduces the bending strain $t/(2r_d + t)$ and the bending-unbending work at the die entry; and a lower blank-holder force reduces friction. The usual list of remedies for splitting is: better lubrication, larger radii, lower blank-holder force, a higher-$\bar r$ or higher-$n$ sheet, a smaller drawing ratio (a redraw), and finally a design change.
:::
:::

::: quiz Why does a wrinkle appear in the flange and a split in the wall of the same cup? {#quiz-wrinkle}
- [ ] Because the flange is thinner than the wall
- [x] Because the flange is hoop-compressed while the wall is in tension, and the two failures have opposite causes
- [ ] Because the lubricant only reaches the wall
- [ ] Because the punch is hotter than the die
::: solution
**Radial drawing tension in the flange is necessarily accompanied by hoop compression — each ring must shrink to a smaller circumference — and a thin annulus under hoop compression buckles. In the wall the same pull is carried as a membrane tension, which the wall supports until it necks.** The blank-holder force trades one failure against the other. Thicker sheet wrinkles less, because a plate's buckling resistance rises steeply with thickness, while the drawing load and the wall's capacity both rise only in proportion to $t$, leaving the drawing ratio limit roughly unchanged.
:::
:::

## Where this lesson leads

- **[[manufacturing/bulk-forming|Bulk deformation processes]]** is the companion: the same flow stress, friction and work hardening, in stress states where the work can neither buckle nor neck.
- **[[manufacturing/machining|Machining]]** finishes the holes and datum faces of formed parts; laser and waterjet cutting make many blanks before forming.
- **[[manufacturing/joining|Joining]]** assembles the panels: resistance spot welding of car bodies, and the special problems of coated and high-strength grades.
- **[[manufacturing/polymer-composite-processing|Polymer and composite processing]]** meets similar wrinkling and thinning limits when sheets and fabrics are formed.
- **[[manufacturing/metrology-quality|Metrology, quality and automation]]** covers how stamped assemblies are measured and how springback measurements are fed back into the die.
- **[[materials-science/mechanical-properties|Mechanical properties]]** is where $n$, the $r$-value and the tensile test are measured, including Considère's criterion.
- **[[solid-mechanics/plasticity|Plasticity]]** supplies the yield criteria and flow rules behind the anisotropy and limit-strain analyses.

::: history
**1910s.** The **Budd Company** of Philadelphia, founded by Edward G. Budd, develops all-steel pressed car bodies; after discussions from 1913, Dodge Brothers bought tens of thousands of all-steel touring bodies from Budd (70,000 in 1916 alone), and pressed and welded steel bodies gradually displaced wood-framed construction. **1948.** **Rodney Hill** publishes "A theory of the yielding and plastic flow of anisotropic metals" (*Proceedings of the Royal Society A*), the anisotropic yield criterion still used to model sheet. **1950.** **W. T. Lankford, S. C. Snyder and J. A. Bausher** publish "New criteria for predicting the press performance of deep drawing sheets" (*Transactions of the ASM*), introducing the plastic strain ratio now called the Lankford $r$-value. **1960s.** **Stuart Keeler**, measuring circle grids on stretched sheet, and **Gorton Goodwin**, extending the measurements to negative minor strains, establish the **forming limit diagram**; in **1967** **Zdzisław Marciniak and K. Kuczyński** publish their analysis of necking from an initial groove (*International Journal of Mechanical Sciences*), still the basis of many forming-limit calculations. **1970s.** Press hardening of boron steel is developed in Sweden and later adopted, from the 1980s and on a large scale from the 2000s, for automotive safety-cage parts; in the same period Keeler and Brazier publish the empirical $\mathrm{FLD}_0$ relation used in section 5.
:::

::: summary
**A sheet has two ways to fail.** It wrinkles where it is compressed and tears where it is stretched; in deep drawing the blank-holder force trades one against the other.
**Shearing is a shear-area calculation and a clearance diagnosis.** $F \approx 0.8\sigma_{\text{UTS}} P t$, clearance about $5$–$13\ \%$ of $t$ per side, and the rollover, burnish, fracture and burr of the edge show the state of the tool. Fine blanking suppresses the fracture with a V-ring and a very small clearance.
**Bending is arithmetic about a neutral surface that is not exactly in the middle.** $BA = (\pi\theta/180)(r + Kt)$ with $K \approx 0.33$–$0.5$, $BD = 2SB - BA$, and the blank is the sum of the outside legs minus $\sum BD$. The outer-fibre strain is $t/(2r+t)$, so $r = t$ means $33\ \%$, and the minimum radius is a property of the material.
**Bending force goes as $t^2/V$, springback as $\sigma_y r/(E t)$.** $F = 1.42\sigma_{\text{UTS}} w t^2/V$; $\Delta\theta = 3\sigma_y L_b/(E t)$. Overbend, coin, stretch, or form hot.
**Drawability is a ratio, not a depth.** The ideal analysis gives $\ln(\text{LDR}) = \eta$, so LDR $\approx 2.0$–$2.2$; deeper cups need redraws. A high $\bar r$ raises the LDR, and $\Delta r$ makes ears.
**The forming limit diagram says when stretching stops.** The lowest limit is at plane strain, $\mathrm{FLD}_0 = (23.3 + 14.13t)\,n/0.21$ for ordinary steels; the limit rises on both sides, and parts are checked with a safety margin below the curve.
**Sheet metal is cheap to form and expensive to tool.** Tooling and try-out dominate; break-even quantities decide between soft and production tools, and the part should be designed for the tool that the volume can pay for.
:::

## Further reading

- Z. Marciniak, J. L. Duncan and S. J. Hu, *Mechanics of Sheet Metal Forming*, 2nd ed., Butterworth-Heinemann, 2002 — the mechanics of bending, drawing, stretching and forming limits, by authors including the originator of the groove analysis.
- W. F. Hosford and R. M. Caddell, *Metal Forming: Mechanics and Metallurgy*, 4th ed., Cambridge University Press, 2011 — clear derivations of the limiting drawing ratio, anisotropy and forming limits.
- S. Kalpakjian and S. R. Schmid, *Manufacturing Engineering and Technology*, 8th ed., Pearson, 2020 — the standard undergraduate survey of sheet-metal processes, with shop data on clearances, bend radii and press forces.
- T. Altan and A. E. Tekkaya (eds), *Sheet Metal Forming: Fundamentals* and *Sheet Metal Forming: Processes and Applications*, ASM International, 2012 — industrial practice, presses, tooling, hot stamping and hydroforming.
- W. T. Lankford, S. C. Snyder and J. A. Bausher, "New criteria for predicting the press performance of deep drawing sheets", *Transactions of the ASM* 42 (1950) — the origin of the $r$-value.
- H. Karbasian and A. E. Tekkaya, "A review on hot stamping", *Journal of Materials Processing Technology* 210 (2010) 2103–2118 — the process, the metallurgy of 22MnB5 and the tooling.
