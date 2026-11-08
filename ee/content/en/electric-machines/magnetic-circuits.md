Open up almost any electrical machine, a transformer, a motor, a relay, the choke in a power supply, and you find copper wound around iron. The copper carries current; the iron carries **flux**. Iron is several thousand times more permeable than air, so it gathers the magnetic field produced by the winding and guides it along a chosen path, through the secondary winding of a transformer or across the narrow air gap of a motor where the useful force is produced. Because the field is confined, we do not need to solve Maxwell's equations in three dimensions to design these devices. A few lines of Ampère's law and Gauss's law reduce the problem to a **magnetic circuit**, with magnetomotive force playing the role of voltage, flux the role of current and reluctance the role of resistance.

This chapter builds that model and then confronts its limits. We define magnetomotive force and reluctance and derive the circuit laws from the field equations; we add air gaps and fringing; we connect flux to the winding through flux linkage, inductance and the emf equation $E = 4.44fN\Phi_{\max}$ that every later chapter uses. Then we turn to the iron itself: the nonlinear magnetisation curve and saturation, the hysteresis and eddy currents that make the core heat up, and finally permanent magnets, which supply flux with no winding at all. The field theory comes from [[electromagnetics/magnetostatics]] and [[electromagnetics/induction-inductance]]; here we use it as engineers do.

## Magnetomotive force, flux and reluctance

Recall the two field laws of magnetostatics. **Ampère's circuital law** says that the line integral of the magnetic field intensity $\mathbf H$ around any closed path equals the total current through any surface bounded by the path, $\oint_C\mathbf H\cdot\mathrm d\mathbf l = I_{\text{enc}}$. **Gauss's law for magnetism** says that the flux density $\mathbf B$ has no sources: the net flux out of any closed surface is zero, $\oint_S\mathbf B\cdot\mathrm d\mathbf A = 0$. In a linear, isotropic material the two fields are related by $\mathbf B = \mu\mathbf H = \mu_r\mu_0\mathbf H$, with $\mu_0 = 4\pi\times10^{-7}\,\mathrm{H/m}$. For electrical steels the relative permeability $\mu_r$ lies between about $2000$ and $8000$ at moderate flux densities, for ferrites between $1000$ and $10\,000$, and for air, copper and insulation it is $1$.

Consider a ring-shaped (toroidal) or rectangular core of cross-sectional area $A_c$ and mean path length $l_c$, wound with $N$ turns carrying current $i$. A closed path along the centre of the core encircles the current $i$ exactly $N$ times.

::: definition Magnetomotive force, flux and reluctance {#def-reluctance}
The **magnetomotive force** (mmf) of a winding of $N$ turns carrying current $i$ is $\mathcal F = Ni$, measured in ampere-turns (A, or At). The **magnetic flux** through a cross-section $S$ is $\phi = \int_S\mathbf B\cdot\mathrm d\mathbf A$, in webers ($1\,\mathrm{Wb} = 1\,\mathrm{V\,s}$). A uniform section of magnetic material of length $l$, area $A$ and permeability $\mu$ has **reluctance**

$$
\mathcal R = \frac{l}{\mu A}\qquad(\mathrm{A/Wb} = \mathrm{H^{-1}}),
$$ {#eq-reluctance}

and the **mmf drop** across it is $\mathcal F_k = H_kl = \mathcal R\phi$. The reciprocal $\mathcal P = 1/\mathcal R$ is the **permeance**.
:::

The analogy with a resistor, $R = l/(\sigma A)$, is exact in form: permeability replaces conductivity. It is not exact in substance. Flux does not "flow" and dissipates no power in a reluctance, and the "insulator" of a magnetic circuit (air, $\mu_r = 1$) is only a few thousand times worse than the "conductor", whereas copper conducts about $10^{20}$ times better than plastic. Magnetic circuits therefore always leak, and the circuit model is an approximation whose quality depends on how well the iron confines the field.

::: theorem Laws of the magnetic circuit {#thm-magnetic-circuit}
Suppose the flux is confined to a network of magnetic paths, each of uniform cross-section, with $\mathbf B$ uniform over each cross-section and parallel to the path. Then

1. (**flux law**) at any junction of paths, the fluxes leaving sum to zero: $\sum_k\phi_k = 0$;
2. (**mmf law**) around any closed loop of paths, the sum of the mmf drops equals the sum of the mmfs of the windings enclosed: $\sum_k\mathcal R_k\phi_k = \sum_j N_ji_j$.

For a single loop of sections in series, $\phi = Ni/\sum_k\mathcal R_k$, so reluctances in series add, and reluctances in parallel combine like resistors in parallel.
:::

::: proof
(1) Enclose the junction by a closed surface that cuts each path once. By Gauss's law $\oint\mathbf B\cdot\mathrm d\mathbf A = 0$. With the flux confined to the paths, the only contributions are the path cross-sections, and they give $\sum_k\phi_k = 0$ with $\phi_k$ counted positive when leaving.

(2) Take the closed loop along the centre lines of the paths and apply Ampère's law. Along section $k$, $\mathbf H$ is parallel to the path and of constant magnitude $H_k = B_k/\mu_k = \phi_k/(\mu_kA_k)$, so the section contributes $H_kl_k = \phi_kl_k/(\mu_kA_k) = \mathcal R_k\phi_k$. The loop encloses each winding's conductors $N_j$ times, so the enclosed current is $\sum_jN_ji_j$ (with a sign set by the right-hand rule). For a single loop all $\phi_k$ equal $\phi$, so $\phi\sum_k\mathcal R_k = Ni$.
:::

The assumptions matter. The theorem ignores **leakage flux**, which closes through the air around the windings instead of following the core, and **fringing**, the spreading of flux at an air gap. It also assumes that $\mu$ is a constant, which is true only below saturation. With those caveats, every magnetic circuit in this course is solved with these two laws.

### Air gaps and fringing

Motors need an air gap so that the rotor can turn; inductors are given one deliberately. Because $\mu_r$ of iron is in the thousands, a gap of a fraction of a millimetre usually has a larger reluctance than tens of centimetres of iron, and dominates the circuit.

Across a short gap the flux lines bulge outwards, so the effective area of the gap is larger than that of the iron faces. A simple and widely used correction for a gap of length $g$ between rectangular faces $a\times b$ adds the gap length to each dimension: $A_g \approx (a + g)(b + g)$. It is accurate when $g$ is small compared with $a$ and $b$; for larger gaps finite-element field solutions are used.

::: example A core with an air gap {#ex-gap}
A core of square section $3\,\mathrm{cm}\times3\,\mathrm{cm}$ has a mean iron path length $l_c = 30\,\mathrm{cm}$ and relative permeability $\mu_r = 4000$. It contains an air gap $g = 0.5\,\mathrm{mm}$ and carries a winding of $N = 500$ turns with $i = 1\,\mathrm A$. Find the flux and the flux density in the core (a) neglecting fringing, (b) with the fringing correction.
::: solution
The core area is $A_c = 9\times10^{-4}\,\mathrm{m^2}$. The two reluctances are

$$
\mathcal R_c = \frac{l_c}{\mu_r\mu_0A_c} = \frac{0.3}{4000\times4\pi\times10^{-7}\times9\times10^{-4}} = 6.63\times10^4\,\mathrm{A/Wb},
$$

$$
\mathcal R_g = \frac{g}{\mu_0A_c} = \frac{5\times10^{-4}}{4\pi\times10^{-7}\times9\times10^{-4}} = 4.42\times10^5\,\mathrm{A/Wb}.
$$

(a) The mmf is $Ni = 500\,\mathrm A$, so $\phi = 500/(6.63\times10^4 + 4.42\times10^5) = 9.83\times10^{-4}\,\mathrm{Wb}$ and $B_c = \phi/A_c = 1.09\,\mathrm T$. The half-millimetre gap has almost seven times the reluctance of the $30\,\mathrm{cm}$ of iron. Of the $500\,\mathrm{A}$ of mmf, $435\,\mathrm A$ is used across the gap.

(b) With fringing, $A_g = (0.0305)^2 = 9.30\times10^{-4}\,\mathrm{m^2}$, so $\mathcal R_g = 4.28\times10^5\,\mathrm{A/Wb}$ and $\phi = 1.012\times10^{-3}\,\mathrm{Wb}$. The flux density in the core is $1.12\,\mathrm T$ and in the gap $1.09\,\mathrm T$. Fringing raises the flux by about $3\,\%$ here; for wider gaps the effect grows quickly.
:::
:::

::: warning H is not continuous across a gap
At an iron–air interface perpendicular to the flux, the normal component of $\mathbf B$ is continuous (Gauss's law), so $B_g \approx B_c$ when the areas are equal. The field **intensity** jumps by the factor $\mu_r$: in [[#ex-gap]] $H_c = 217\,\mathrm{A/m}$ in the iron but $H_g = 8.7\times10^5\,\mathrm{A/m}$ in the gap. Never carry $H$ across a gap unchanged, and never compute the gap's mmf drop with the iron's $\mu_r$.
:::

When the paths branch, the magnetic circuit becomes a network.

::: example A three-limb core {#ex-three-limb}
A shell-type core has a centre limb of area $8\,\mathrm{cm^2}$ with a gap of $0.2\,\mathrm{mm}$, carrying a winding of $400$ turns with $1.5\,\mathrm A$. The two outer limbs each have area $4\,\mathrm{cm^2}$; the left has a gap of $0.5\,\mathrm{mm}$ and the right a gap of $1.0\,\mathrm{mm}$. Treat the iron as infinitely permeable and neglect fringing. Find the flux density in each limb and the inductance of the winding.
::: solution
With ideal iron only the gaps have reluctance:

$$
\mathcal R_{\text{cen}} = \frac{2\times10^{-4}}{\mu_0(8\times10^{-4})} = 1.99\times10^5, \quad \mathcal R_{\text{L}} = \frac{5\times10^{-4}}{\mu_0(4\times10^{-4})} = 9.95\times10^5, \quad \mathcal R_{\text{R}} = 1.99\times10^6\,\mathrm{A/Wb}.
$$

The centre limb's flux divides between the outer limbs, which are in parallel: $\mathcal R_{\text L}\parallel\mathcal R_{\text R} = 6.63\times10^5\,\mathrm{A/Wb}$. The total reluctance seen by the winding is $8.62\times10^5\,\mathrm{A/Wb}$, so

$$
\phi_{\text{cen}} = \frac{400\times1.5}{8.62\times10^5} = 6.96\times10^{-4}\,\mathrm{Wb}.
$$

By the flux-divider rule, $\phi_{\text L} = \phi_{\text{cen}}\mathcal R_{\text R}/(\mathcal R_{\text L} + \mathcal R_{\text R}) = 4.64\times10^{-4}\,\mathrm{Wb}$ and $\phi_{\text R} = 2.32\times10^{-4}\,\mathrm{Wb}$. The flux densities are $B_{\text{cen}} = 0.87\,\mathrm T$, $B_{\text L} = 1.16\,\mathrm T$ and $B_{\text R} = 0.58\,\mathrm T$. The inductance, anticipating [[#eq-inductance]], is $L = N^2/\mathcal R_{\text{tot}} = 400^2/8.62\times10^5 = 0.186\,\mathrm H$.

Note that the narrow left limb carries the highest flux density: in a real core it would saturate first.
:::
:::

## Flux linkage, inductance and induced voltage

The winding sees the core through its **flux linkage**. If every one of the $N$ turns encloses the same core flux $\phi$, the total flux linked is $N\phi$.

::: definition Flux linkage and inductance {#def-inductance}
The **flux linkage** of a winding is $\lambda = \sum_{\text{turns}}\phi_{\text{turn}}$, which equals $N\phi$ when all turns link the same flux. If $\lambda$ is proportional to the winding current, the **inductance** is $L = \lambda/i$. For a winding of $N$ turns on a magnetic circuit of total reluctance $\mathcal R$,

$$
L = \frac{N\phi}{i} = \frac{N^2}{\mathcal R} = N^2\mathcal P.
$$ {#eq-inductance}
:::

Two practical lessons follow. Inductance grows with the **square** of the turns, because doubling $N$ doubles both the mmf and the number of turns that link the resulting flux. And because the gap usually dominates $\mathcal R$, the inductance of a gapped core is set by the gap and hardly depends on the iron's permeability, which varies with temperature, flux density and from batch to batch. A gap makes an inductor predictable.

By Faraday's law the voltage across a lossless winding is $e = \mathrm d\lambda/\mathrm dt$. In machines and transformers the flux is very nearly sinusoidal, and the following relation is used constantly.

::: theorem The emf equation {#thm-emf}
If a winding of $N$ turns links a sinusoidal flux $\phi(t) = \Phi_{\max}\sin\omega t$, with $\omega = 2\pi f$, the induced voltage is $e(t) = \omega N\Phi_{\max}\cos\omega t$, and its rms value is

$$
E_{\text{rms}} = \frac{2\pi}{\sqrt2}fN\Phi_{\max} = 4.44\,fN\Phi_{\max}.
$$ {#eq-emf}

Conversely, a sinusoidal voltage of rms value $V$ applied to a winding of negligible resistance forces a peak flux $\Phi_{\max} = V/(4.44fN)$, whatever the reluctance of the core.
:::

::: proof
$e = N\,\mathrm d\phi/\mathrm dt = N\omega\Phi_{\max}\cos\omega t$ has amplitude $\omega N\Phi_{\max}$, and the rms value of a sinusoid is its amplitude over $\sqrt2$: $E_{\text{rms}} = 2\pi fN\Phi_{\max}/\sqrt2 = 4.443fN\Phi_{\max}$. For the converse, with no resistance KVL gives $v = e$, so $\Phi_{\max} = \sqrt2V/(\omega N)$.
:::

The converse is the key to transformers and AC machines: **the applied voltage fixes the flux, and the core draws whatever current it needs to produce it.** A poor core simply draws more magnetising current. If the voltage is raised or the frequency lowered, $\Phi_{\max}$ rises in proportion to $V/f$ and the iron can be driven into saturation.

::: example Turns for a mains winding {#ex-turns}
A transformer core has a net iron cross-section of $10\,\mathrm{cm^2}$, and the peak flux density is to be $1.4\,\mathrm T$. How many turns does the $230\,\mathrm V$, $50\,\mathrm{Hz}$ winding need? What happens if the same winding is connected to $230\,\mathrm V$ at $60\,\mathrm{Hz}$, or to $230\,\mathrm{V}$ DC?
::: solution
$\Phi_{\max} = B_{\max}A = 1.4\times10^{-3}\,\mathrm{Wb}$, so by [[#eq-emf]]

$$
N = \frac{V}{4.44f\Phi_{\max}} = \frac{230}{4.44\times50\times1.4\times10^{-3}} = 740\ \text{turns},
$$

that is about $3.2$ turns per volt. At $60\,\mathrm{Hz}$ the flux falls to $1.4\times50/60 = 1.17\,\mathrm T$: the core is under-used but safe. On DC there is no induced emf at all in the steady state; only the winding resistance (a few ohms) limits the current, which becomes very large and burns out the winding. Transformers work only on changing flux.
:::
:::

::: quiz
An inductor is wound on a gapped core whose gap reluctance is ten times the iron reluctance. The iron's permeability falls by half as the core warms up. By roughly how much does the inductance change?
- [ ] It halves
- [ ] It falls by about $50\,\%$ of the iron's share, so about $25\,\%$
- [x] It falls by about $8\,\%$
- [ ] It does not change at all
::: solution
Write the reluctances as $\mathcal R_g = 10\mathcal R_c$. Initially $\mathcal R = 11\mathcal R_c$; after the change the iron's reluctance doubles and $\mathcal R = 12\mathcal R_c$. The inductance $N^2/\mathcal R$ falls by the factor $11/12$, about $8\,\%$. The gap makes the inductance insensitive to the iron.
:::
:::

### Designing a gapped inductor

The magnetic circuit model is already enough for a real design. Two limits govern an inductor: the core must not saturate at the peak current, and the winding must fit. The stored energy $\tfrac12LI^2$ resides almost entirely in the gap, where the energy density $B^2/(2\mu_0)$ is highest ([[electromagnetics/induction-inductance]]), so the required gap volume is roughly $A_cg \approx \mu_0LI_{\text{pk}}^2/B_{\max}^2$.

::: algorithm Gapped-inductor design {#alg-inductor}
Given the inductance $L$, the peak current $I_{\text{pk}}$, the maximum flux density $B_{\max}$ and a core of area $A_c$ whose iron reluctance is negligible:

1. Choose the turns so that the core reaches $B_{\max}$ at $I_{\text{pk}}$: $\lambda_{\text{pk}} = LI_{\text{pk}} = NB_{\max}A_c$, so $N = LI_{\text{pk}}/(B_{\max}A_c)$. Round up.
2. Choose the gap to give the inductance: $L = N^2\mu_0A_c/g$, so $g = \mu_0N^2A_c/L$.
3. Check: $B = \mu_0NI_{\text{pk}}/g \le B_{\max}$; the iron reluctance $l_c/(\mu_rA_c\mu_0)$ is small compared with the gap's; the copper fits the window and its loss is acceptable; fringing (which raises $L$) is allowed for by enlarging the gap slightly.
:::

::: example A filter inductor for a buck converter {#ex-inductor-design}
Design an inductor of $200\,\mathrm{\mu H}$ that carries a peak current of $8\,\mathrm A$, on a ferrite core with centre-limb area $A_c = 1.25\,\mathrm{cm^2}$. Ferrite saturates near $0.4\,\mathrm T$ at its operating temperature, so take $B_{\max} = 0.3\,\mathrm T$.
::: solution
Step 1: $N = LI_{\text{pk}}/(B_{\max}A_c) = (200\times10^{-6}\times8)/(0.3\times1.25\times10^{-4}) = 42.7$, so $N = 43$ turns.

Step 2: $g = \mu_0N^2A_c/L = 4\pi\times10^{-7}\times43^2\times1.25\times10^{-4}/(2\times10^{-4}) = 1.45\,\mathrm{mm}$.

Step 3: at $8\,\mathrm A$, $B = \mu_0\times43\times8/(1.45\times10^{-3}) = 0.298\,\mathrm T$, inside the limit. A typical ferrite path of $8\,\mathrm{cm}$ with $\mu_r = 2000$ has the reluctance of a $0.04\,\mathrm{mm}$ gap, under $3\,\%$ of the real gap, so neglecting it is justified.

Fringing is not negligible: with a square limb of side $11.2\,\mathrm{mm}$, the correction $(a + g)^2/a^2$ gives an effective area $28\,\%$ larger than $A_c$, so the actual inductance would be close to $255\,\mathrm{\mu H}$. A designer either enlarges the gap (roughly in proportion) or removes a turn or two and rechecks the flux density. The stored energy is $\tfrac12LI^2 = 6.4\,\mathrm{mJ}$, contained in a gap volume of only $0.18\,\mathrm{cm^3}$.
:::
:::

## Ferromagnetic materials and saturation

Iron, nickel, cobalt and their alloys are **ferromagnetic**: the magnetic moments of neighbouring atoms align spontaneously in regions called **domains**, each magnetised to saturation in some direction. In unmagnetised iron the domains point every which way and cancel. An applied field first moves the walls between domains, letting favourably oriented domains grow (a large and partly irreversible effect, responsible for the high permeability), and at higher fields rotates the remaining domains into line. When all are aligned the material is **saturated**: further increases of $H$ add only $\mu_0\,\Delta H$ to $B$, as in free space.

The relation between $B$ and $H$ is summarised by the **magnetisation curve** (the normal $B$–$H$ curve). For grain-oriented silicon steel the knee lies near $1.5$ to $1.7\,\mathrm{T}$ and saturation at about $2\,\mathrm{T}$; for non-oriented motor laminations the knee is lower and broader; for ferrites saturation is $0.3$ to $0.5\,\mathrm T$. The permeability $\mu = B/H$ is therefore not a constant: it rises at low fields, peaks below the knee and falls steeply beyond it.

Machines are designed to operate near the knee. Below it the iron is under-used and the machine heavier than necessary; above it the magnetising current rises rapidly for little extra flux. For a transformer, a $10\,\%$ overvoltage may double the no-load current.

### Solving a nonlinear magnetic circuit

When the iron's permeability depends on $B$, reluctance is no longer a fixed number. Two problems arise.

- **Given the flux, find the current.** This is direct: find $B$ in each section, read $H$ from the curve, add the mmf drops $H_kl_k$.
- **Given the current, find the flux.** Now $H_c$ and $B_c$ are both unknown. For a core with a gap, Ampère's law $Ni = H_cl_c + B_cg/\mu_0$ is a straight line in the $B$–$H$ plane, the **load line**, and the operating point is its intersection with the magnetisation curve. Equivalently we solve one nonlinear equation by iteration.

::: example A saturating core {#ex-nonlinear}
A steel core has $l_c = 0.5\,\mathrm m$, an air gap $g = 1\,\mathrm{mm}$ and a winding of $500$ turns. The steel's magnetisation curve is well approximated by $B = 1.8\tanh(H/300)$ with $B$ in teslas and $H$ in A/m. Neglect fringing. (a) Find the current that gives $B = 1.5\,\mathrm T$. (b) Find $B$ when $i = 2\,\mathrm A$, and compare with a calculation that ignores the iron.
::: solution
(a) In the iron $H_c = 300\,\operatorname{artanh}(1.5/1.8) = 300\times1.199 = 360\,\mathrm{A/m}$, so the iron needs $H_cl_c = 180\,\mathrm{A}$. The gap needs $B g/\mu_0 = 1.5\times10^{-3}/(4\pi\times10^{-7}) = 1194\,\mathrm A$. The total mmf is $1374\,\mathrm A$, so $i = 1374/500 = 2.75\,\mathrm A$.

(b) Now $Ni = 1000\,\mathrm A$ and the load line is

$$
B = \frac{\mu_0}{g}\left(1000 - 0.5H\right) = 1.257 - 6.28\times10^{-4}H\quad(\mathrm T).
$$

Setting this equal to $1.8\tanh(H/300)$ and solving by bisection gives $H_c = 218\,\mathrm{A/m}$ and $B = 1.12\,\mathrm T$. Ignoring the iron entirely would give $B = \mu_0Ni/g = 1.26\,\mathrm T$, an overestimate of $12\,\%$. At this flux density the iron's effective relative permeability $B/(\mu_0H)$ is about $4100$, but the $0.5\,\mathrm m$ of it still absorbs $109\,\mathrm A$ of mmf, a tenth of the total.
:::
:::

::: widget plot
f: 1.8*tanh(x/300); 4*pi*1e-7*(F - 0.5*x)/0.001
x: 0, 2500
y: 0, 2
sliders: F=1000:100:3000:10
labels: B_c(H_c); \text{load line}
caption: The core of the saturating-core example: the magnetisation curve $B = 1.8\tanh(H/300)$ and the load line $Ni = H_cl_c + Bg/\mu_0$ for mmf $F = Ni$ (in ampere-turns). The operating point is the intersection. Increase $F$ from $1000$ to $3000\,\mathrm A$: at first $B$ rises almost in proportion, but beyond about $2000\,\mathrm A$ the intersection slides along the flat part of the curve and extra mmf buys almost no flux. The load line's slope is set by the gap; widening the gap would make it flatter and move the knee to higher currents.
:::

## Core losses: hysteresis and eddy currents

If $H$ is cycled between $+H_{\max}$ and $-H_{\max}$, the magnetisation does not retrace the curve. Domain-wall motion is resisted by impurities and grain boundaries, so $B$ lags behind $H$, and the trajectory is a closed **hysteresis loop**. When $H$ returns to zero, a **remanent** flux density $B_r$ remains; a reverse field equal to the **coercivity** $H_c$ is needed to bring $B$ back to zero. Materials with narrow loops (small $H_c$) are **soft** and used for cores; materials with wide loops are **hard** and used for permanent magnets.

::: theorem Hysteresis loss {#thm-hysteresis}
When the flux density in a core of volume $V = A_cl_c$ is taken once round a hysteresis loop, the energy delivered to the core by the winding and dissipated as heat is

$$
W_h = V\oint H\,\mathrm dB,
$$ {#eq-hysteresis}

the volume times the area of the loop. At frequency $f$ the hysteresis power is $P_h = fV\oint H\,\mathrm dB$. Empirically (Steinmetz) the loop area grows as a power of the peak flux density, giving $P_h = k_hfB_{\max}^{\,n}V$ with $n$ between about $1.5$ and $2.5$ for electrical steels.
:::

::: proof
The winding's voltage is $e = N\,\mathrm d\phi/\mathrm dt = NA_c\,\mathrm dB/\mathrm dt$ and, by Ampère's law, its current is $i = Hl_c/N$. The energy delivered in time $\mathrm dt$ is $ei\,\mathrm dt = (NA_c\,\mathrm dB)(Hl_c/N) = A_cl_cH\,\mathrm dB$. Over one cycle the state returns to its starting point, so no energy can remain stored; the net input $V\oint H\,\mathrm dB$ is dissipated. On the loop $H$ is larger on the rising branch than on the falling one, so the integral is positive.
:::

::: widget parametric
fx: Hm*cos(t)
fy: 1.5*tanh((Hm*cos(t) + Hc*sign(sin(t)))/60)
t: 0, 2pi
x: -400, 400
y: -2, 2
equal: false
sliders: Hm=200:40:400:5; Hc=40:0:120:5
caption: A model hysteresis loop, $B$ (in teslas) against $H$ (in A/m), traced as $H = H_m\cos t$ is cycled. Drag the point round: the upper branch is followed as $H$ falls and the lower one as it rises. Increase the coercivity $H_c$ and watch the loop widen; its area, the energy lost per cycle per unit volume, grows with it. Set $H_c = 0$ and the loop collapses to a single curve with no loss. Reduce $H_m$ and the loop shrinks as the material is no longer driven into saturation.
:::

The second loss mechanism is electrical. The changing flux induces an emf around every closed path **inside** the iron, and because iron conducts, **eddy currents** circulate in planes perpendicular to the flux. They heat the core, and by Lenz's law they oppose the change of flux. The cure is to build the core from thin insulated **laminations**, stacked along the flux, so that the eddy-current paths are long and thin.

::: theorem Eddy-current loss in a lamination {#thm-eddy}
In a lamination of thickness $t$ and resistivity $\rho$ carrying a uniform sinusoidal flux density of peak $B_{\max}$ and frequency $f$, parallel to its faces, the average eddy-current loss per unit volume is

$$
p_e = \frac{\pi^2f^2B_{\max}^2t^2}{6\rho}\qquad(\mathrm{W/m^3}),
$$ {#eq-eddy}

provided $t$ is small compared with the skin depth, so that the eddy currents do not appreciably change the flux distribution.
:::

::: proof
Put the $x$ axis across the thickness, $-t/2 \le x \le t/2$, and let the flux density $B(t')$ point along $z$, uniform over the sheet. The lamination is much wider than it is thick, so the eddy currents flow along $\pm y$, returning at the far edges. Take a rectangular loop of width $2x$ (from $-x$ to $+x$) and length $\ell$ in $y$. Faraday's law gives an emf $2x\ell\,\mathrm dB/\mathrm dt'$; by symmetry the electric field is $\pm E(x)$ along the two long sides, so $2\ell E(x) = 2x\ell\,\mathrm dB/\mathrm dt'$ and $E(x) = x\,\mathrm dB/\mathrm dt'$. The power density at $x$ is $E^2/\rho$, and its average over the thickness is

$$
\frac1t\int_{-t/2}^{t/2}\frac{x^2}{\rho}\left(\frac{\mathrm dB}{\mathrm dt'}\right)^2\mathrm dx = \frac{t^2}{12\rho}\left(\frac{\mathrm dB}{\mathrm dt'}\right)^2.
$$

With $B = B_{\max}\sin\omega t'$, the time average of $(\mathrm dB/\mathrm dt')^2$ is $\omega^2B_{\max}^2/2$, so $p_e = \omega^2B_{\max}^2t^2/(24\rho) = \pi^2f^2B_{\max}^2t^2/(6\rho)$.
:::

The formula explains every feature of core construction. Loss scales with $t^2$, so laminations for $50/60\,\mathrm{Hz}$ machines are $0.23$ to $0.5\,\mathrm{mm}$ thick; with $f^2$, so high-frequency cores use ferrites (resistivity around $1\,\mathrm{\Omega\,m}$, a million times that of steel) or powdered iron; and with $1/\rho$, which is why about $3\,\%$ silicon is alloyed into electrical steel, roughly quadrupling its resistivity.

::: example Eddy loss in silicon steel {#ex-eddy}
Non-oriented silicon steel laminations $0.35\,\mathrm{mm}$ thick have resistivity $\rho = 0.50\,\mathrm{\mu\Omega\,m}$ and density $7650\,\mathrm{kg/m^3}$. Estimate the eddy-current loss in W/kg at $1.5\,\mathrm T$, $50\,\mathrm{Hz}$. Check the thin-sheet assumption for $\mu_r = 4000$, and find the loss for $0.5\,\mathrm{mm}$ sheet.
::: solution
By [[#eq-eddy]],

$$
p_e = \frac{\pi^2(50)^2(1.5)^2(0.35\times10^{-3})^2}{6\times0.5\times10^{-6}} = 2.27\times10^3\,\mathrm{W/m^3},
$$

or $2267/7650 = 0.30\,\mathrm{W/kg}$. The skin depth is $\delta = \sqrt{2\rho/(\omega\mu)} = \sqrt{2\times0.5\times10^{-6}/(2\pi\times50\times4000\times4\pi\times10^{-7})} = 0.80\,\mathrm{mm}$, more than twice the thickness, so the formula holds. For $0.5\,\mathrm{mm}$ sheet the loss rises by $(0.5/0.35)^2 = 2.04$ to $0.60\,\mathrm{W/kg}$. Measured total losses for such steels are $2$ to $3\,\mathrm{W/kg}$ at $1.5\,\mathrm T$: hysteresis and "excess" losses from domain-wall motion, not included in the classical formula, make up the rest.
:::
:::

In practice the two losses are lumped as the **core loss** $P_c = P_h + P_e$ and taken from the manufacturer's curves in W/kg at the operating flux density and frequency. Since hysteresis loss scales with $f$ and eddy loss with $f^2$, measurements at two frequencies and the same $B_{\max}$ separate them (see the exercises). In equivalent circuits the core loss appears as a resistance in parallel with the magnetising inductance, because at fixed frequency it depends on the voltage (that is, on the flux), not on the load current: the shunt branch of the transformer in [[electric-machines/transformers]].

::: quiz
A transformer designed for $60\,\mathrm{Hz}$ is operated at the same voltage on a $50\,\mathrm{Hz}$ supply. What happens to its peak flux density?
- [ ] It falls by the factor $50/60$
- [ ] It is unchanged, because the voltage is unchanged
- [x] It rises by the factor $60/50$, and the core may saturate
- [ ] It rises by $(60/50)^2$
::: solution
By [[#eq-emf]], $\Phi_{\max} = V/(4.44fN)$. At fixed $V$, lowering $f$ by $50/60$ raises $\Phi_{\max}$ by $1.2$. A core designed near the knee then saturates and the magnetising current rises sharply; such transformers must be derated in voltage on $50\,\mathrm{Hz}$.
:::
:::

## Permanent magnets

A permanent magnet is a hard magnetic material that has been magnetised to saturation and then released. Its operating point lies in the **second quadrant** of its hysteresis loop, where $B > 0$ but $H < 0$: the magnet supplies the mmf that drives flux through an external circuit, and its own internal field opposes its magnetisation. The relevant part of the loop is the **demagnetisation curve**, which runs from the remanence $B_r$ at $H = 0$ to the coercivity $-H_c$ at $B = 0$.

For modern rare-earth magnets (NdFeB, SmCo) and for ferrite magnets over most of their range the demagnetisation curve is almost a straight line, $B = B_r + \mu_0\mu_{\text{rec}}H$, with a **recoil permeability** $\mu_{\text{rec}}$ close to $1$. NdFeB has $B_r \approx 1.1$ to $1.4\,\mathrm{T}$; ferrite about $0.4\,\mathrm{T}$; the older alnico has high $B_r$ but small coercivity and is easily demagnetised.

::: definition Energy product {#def-energy-product}
At an operating point $(H_m, B_m)$ on the demagnetisation curve, the **energy product** is $\abs{B_mH_m}$, in $\mathrm{J/m^3}$. Its largest value over the curve, $(BH)_{\max}$, is the standard figure of merit of a magnet material. For a straight-line curve $B = B_r + \mu_0\mu_{\text{rec}}H$ it occurs at $B_m = B_r/2$ and equals $B_r^2/(4\mu_0\mu_{\text{rec}})$.
:::

::: theorem Magnet volume for a given air-gap field {#thm-magnet-volume}
A magnet of length $l_m$ and area $A_m$ drives flux through an air gap of length $g$ and area $A_g$, the rest of the circuit being ideal iron, with no leakage or fringing. To produce a gap flux density $B_g$, the operating point $(H_m, B_m)$ must lie on the **load line**

$$
\frac{B_m}{H_m} = -\mu_0\frac{A_gl_m}{A_mg},
$$ {#eq-magnet-loadline}

and the magnet volume required is

$$
V_m = A_ml_m = \frac{B_g^2V_g}{\mu_0\abs{B_mH_m}},\qquad V_g = A_gg.
$$ {#eq-magnet-volume}

The volume is smallest when the magnet operates at its maximum energy product.
:::

::: proof
There is no winding, so Ampère's law around the circuit gives $H_ml_m + H_gg = 0$, that is $H_m = -H_gg/l_m$: the magnet's internal field is negative. Continuity of flux gives $B_mA_m = B_gA_g$. With $B_g = \mu_0H_g$, dividing the two relations eliminates $H_g$ and gives [[#eq-magnet-loadline]]. Multiplying them instead: $(B_mA_m)(H_ml_m) = -(B_gA_g)(H_gg) = -B_g^2V_g/\mu_0$, so $A_ml_m\abs{B_mH_m} = B_g^2V_g/\mu_0$, which is [[#eq-magnet-volume]]. For given $B_g$ and $V_g$, $V_m$ is inversely proportional to $\abs{B_mH_m}$.
:::

The result has a clear physical meaning: $B_g^2V_g/(2\mu_0)$ is the energy stored in the gap, and the magnet must supply it from a volume that can deliver at most $(BH)_{\max}/2$ per unit volume. The best magnets are those that store the most energy in the least material.

::: example Sizing an NdFeB magnet {#ex-magnet}
An NdFeB grade has $B_r = 1.2\,\mathrm T$ and $\mu_{\text{rec}} = 1.05$. A magnetic circuit with ideal iron must produce $B_g = 0.8\,\mathrm T$ in an air gap of length $2\,\mathrm{mm}$ and area $4\,\mathrm{cm^2}$. Find $(BH)_{\max}$, and the dimensions of the smallest magnet.
::: solution
$(BH)_{\max} = B_r^2/(4\mu_0\mu_{\text{rec}}) = 1.44/(4\times4\pi\times10^{-7}\times1.05) = 273\,\mathrm{kJ/m^3}$ (about $34\,\mathrm{MGOe}$ in the older units). It occurs at $B_m = 0.6\,\mathrm T$, where

$$
H_m = \frac{B_m - B_r}{\mu_0\mu_{\text{rec}}} = \frac{-0.6}{4\pi\times10^{-7}\times1.05} = -4.55\times10^5\,\mathrm{A/m}.
$$

Flux continuity gives $A_m = B_gA_g/B_m = 0.8\times4/0.6 = 5.33\,\mathrm{cm^2}$, and Ampère's law gives $l_m = H_gg/\abs{H_m} = (0.8/\mu_0)(2\times10^{-3})/(4.55\times10^5) = 2.80\,\mathrm{mm}$. The magnet volume is $1.49\,\mathrm{cm^3}$, and [[#eq-magnet-volume]] gives the same: $0.64\times0.8\times10^{-6}/(\mu_0\times0.6\times4.55\times10^5) = 1.49\,\mathrm{cm^3}$. In a real design, leakage flux around the magnet would require perhaps $20$ to $50\,\%$ more.
:::
:::

::: remark Demagnetisation
The operating point of a magnet moves down its load line whenever an external mmf opposes it, for instance the armature current of a motor during a fault, or when the magnet is removed from its circuit. If it is pushed past the **knee** of the demagnetisation curve, the magnet recoils along a lower line and loses flux permanently. NdFeB is particularly vulnerable at high temperature, where its coercivity falls, which limits permanent-magnet motors to roughly $120$ to $180\,^\circ\mathrm{C}$ depending on grade. See [[electric-machines/special-machines]].
:::

::: history
Henry Rowland proposed in 1873 that magnetic flux in iron obeys a law analogous to Ohm's law, and John and Edward Hopkinson used the idea in 1886 to design dynamos by calculating the flux through each part of the magnetic circuit; Oliver Heaviside coined the word "reluctance" in 1888. James Alfred Ewing investigated the lag of magnetisation behind the field and introduced the term "hysteresis" in the early 1880s. Charles Proteus Steinmetz published his empirical law for hysteresis loss, with the exponent $1.6$, in 1892. Silicon steel was developed by Robert Hadfield around 1900 and grain-oriented steel by Norman Goss in 1934. Permanent magnets progressed from carbon steel to alnico (1930s), ferrite (1950s), samarium–cobalt (1960s–70s) and neodymium–iron–boron, announced independently by Sumitomo and General Motors in 1983.
:::

## Where this leads

The magnetic circuit is the common foundation of the rest of the course. In [[electric-machines/transformers]] the magnetising inductance and the core-loss resistance of the equivalent circuit come directly from the reluctance and the losses of this chapter, and the emf equation sets the turns. In [[electric-machines/energy-conversion]] we use the stored energy of a gapped magnetic circuit to calculate forces and torques; the gap, which here was a nuisance, becomes the place where mechanical work is done. The flux-per-pole and induced-voltage calculations of [[electric-machines/dc-machines]] and [[electric-machines/rotating-magnetic-fields]] are magnetic-circuit calculations with rotating geometry, and permanent magnets reappear in [[electric-machines/special-machines]]. High-frequency inductors and transformers for converters are designed by the same steps in [[power-electronics]].

::: summary
- Mmf $Ni$ drives flux through reluctances $\mathcal R = l/(\mu A)$; at junctions fluxes sum to zero and around loops mmf drops equal enclosed ampere-turns. Leakage, fringing and saturation limit the model.
- An air gap of a fraction of a millimetre usually dominates the reluctance, so gapped inductors are set by the gap and are insensitive to the iron. $B$ is continuous across a gap; $H$ jumps by $\mu_r$.
- Inductance is $L = N^2/\mathcal R$, and a sinusoidal flux induces $E_{\text{rms}} = 4.44fN\Phi_{\max}$: the applied voltage and frequency fix the flux.
- Iron saturates near $1.5$–$2\,\mathrm T$; with a nonlinear curve, the operating point is the intersection of the magnetisation curve and the load line.
- Hysteresis loss equals the loop area per unit volume per cycle ($\propto f$); eddy loss in laminations is $\pi^2f^2B_{\max}^2t^2/(6\rho)$ ($\propto f^2t^2$), which is why cores are laminated or made of ferrite.
- Permanent magnets work in the second quadrant on a load line set by the circuit geometry; the minimum magnet volume is $B_g^2V_g/(\mu_0(BH)_{\max})$.
:::

## Exercises

::: exercise Reluctance of a gap {level=1 check="1e-3/(4*pi*1e-7*5e-4)"}
Find the reluctance, in A/Wb, of an air gap $1\,\mathrm{mm}$ long with a cross-section of $5\,\mathrm{cm^2}$ (no fringing).
::: solution
$\mathcal R_g = g/(\mu_0A) = 10^{-3}/(4\pi\times10^{-7}\times5\times10^{-4}) = 1.59\times10^6\,\mathrm{A/Wb}$.
:::
:::

::: exercise Inductance from turns {level=1 check="0.2*(300/200)^2"}
A winding of $200$ turns on a gapped core has an inductance of $0.2\,\mathrm H$. What is the inductance, in henries, if it is rewound with $300$ turns on the same core?
::: solution
$L = N^2/\mathcal R$ with $\mathcal R$ unchanged, so $L = 0.2\times(300/200)^2 = 0.45\,\mathrm H$.
:::
:::

::: exercise Peak flux from voltage {level=1 check="120/(4.44*60*200*0.002)"}
A $120\,\mathrm V$, $60\,\mathrm{Hz}$ winding of $200$ turns is wound on a core of net area $20\,\mathrm{cm^2}$. Find the peak flux density in the core, in teslas, using $E = 4.44fN\Phi_{\max}$.
::: solution
$\Phi_{\max} = 120/(4.44\times60\times200) = 2.25\times10^{-3}\,\mathrm{Wb}$, and $B_{\max} = \Phi_{\max}/A = 2.25\times10^{-3}/(2\times10^{-3}) = 1.13\,\mathrm T$.
:::
:::

::: exercise Current for a given flux {level=2 check="(1.2*0.4/(3000*4*pi*1e-7) + 1.2*0.6e-3/(4*pi*1e-7))/250"}
A core with $l_c = 40\,\mathrm{cm}$, $\mu_r = 3000$ and a $0.6\,\mathrm{mm}$ air gap carries a winding of $250$ turns. Neglecting fringing, what current, in amperes, gives a flux density of $1.2\,\mathrm T$?
::: solution
Iron: $H_c = 1.2/(3000\mu_0) = 318\,\mathrm{A/m}$, mmf $318\times0.4 = 127\,\mathrm A$. Gap: $H_g = 1.2/\mu_0 = 9.55\times10^5\,\mathrm{A/m}$, mmf $9.55\times10^5\times0.6\times10^{-3} = 573\,\mathrm A$. Total $700\,\mathrm A$, so $i = 700/250 = 2.80\,\mathrm A$. Note that the area is not needed: with uniform $B$, the mmf depends only on $B$ and the lengths.
:::
:::

::: exercise Separating hysteresis and eddy losses {level=2 check="60"}
A core at a fixed peak flux density loses $40\,\mathrm W$ at $25\,\mathrm{Hz}$ and $100\,\mathrm W$ at $50\,\mathrm{Hz}$. Assuming $P = af + bf^2$, find the hysteresis loss at $50\,\mathrm{Hz}$, in watts.
::: solution
$25a + 625b = 40$ and $50a + 2500b = 100$. Doubling the first and subtracting: $1250b = 20$, so $b = 0.016$ and $a = (40 - 10)/25 = 1.2$. At $50\,\mathrm{Hz}$ the hysteresis loss is $50a = 60\,\mathrm W$ and the eddy loss $2500b = 40\,\mathrm W$.
:::
:::

::: exercise Two windings and a branched core {level=2}
A core has three limbs, each with a reluctance of $2\times10^5\,\mathrm{A/Wb}$ (the yokes are ideal). The left limb carries a winding of $100$ turns with $2\,\mathrm A$ and the right limb a winding of $100$ turns with $1\,\mathrm A$, both producing flux upwards in their own limb. Find the flux in the centre limb.
::: hint
Use the flux law at the top yoke: with all fluxes defined upwards, $\phi_{\text L} + \phi_{\text C} + \phi_{\text R} = 0$. All three limbs share the same mmf difference between the yokes.
:::
::: solution
Let $\mathcal F_{\text{top}}$ be the magnetic potential of the top yoke relative to the bottom one. Each limb's upward flux is (winding mmf $-\mathcal F_{\text{top}}$)$/\mathcal R$: $\phi_{\text L} = (200 - \mathcal F)/\mathcal R$, $\phi_{\text C} = -\mathcal F/\mathcal R$, $\phi_{\text R} = (100 - \mathcal F)/\mathcal R$. Their sum is zero, so $300 - 3\mathcal F = 0$ and $\mathcal F = 100\,\mathrm A$. Then $\phi_{\text C} = -100/(2\times10^5) = -0.5\,\mathrm{mWb}$: $0.5\,\mathrm{mWb}$ downwards in the centre limb, while $\phi_{\text L} = 0.5\,\mathrm{mWb}$ and $\phi_{\text R} = 0$ upwards. The right limb's own winding exactly cancels the mmf of the yokes.
:::
:::

::: exercise Thinner laminations {level=2 check="(0.27/0.35)^2*(400/50)^2"}
By what factor does the classical eddy-current loss change if a core is rebuilt with $0.27\,\mathrm{mm}$ laminations instead of $0.35\,\mathrm{mm}$ and operated at $400\,\mathrm{Hz}$ instead of $50\,\mathrm{Hz}$, at the same peak flux density? (Assume the thin-sheet formula still holds.)
::: solution
$p_e\propto f^2t^2$, so the factor is $(0.27/0.35)^2(400/50)^2 = 0.595\times64 = 38.1$. Aircraft systems run at $400\,\mathrm{Hz}$ and use laminations of $0.1\,\mathrm{mm}$ or less. Check the assumption: at $400\,\mathrm{Hz}$ the skin depth of the steel of [[#ex-eddy]] is $0.80/\sqrt8 = 0.28\,\mathrm{mm}$, comparable with the thickness, so the formula now overestimates the loss and the flux is no longer uniform.
:::
:::

::: exercise Design a gapped inductor {level=3}
Design an inductor of $1\,\mathrm{mH}$ for a peak current of $5\,\mathrm A$ on a silicon-steel core with a square centre limb of area $4\,\mathrm{cm^2}$, with $B_{\max} = 1.2\,\mathrm{T}$. Give $N$ and $g$, then correct the gap for fringing so that the inductance is still about $1\,\mathrm{mH}$.
::: hint
Follow [[#alg-inductor]]. For the fringing correction, the effective area is $(a + g)^2$; solve $L = \mu_0N^2(a + g)^2/g$ for $g$ by trying values.
:::
::: solution
$N = LI/(BA) = 10^{-3}\times5/(1.2\times4\times10^{-4}) = 10.4$, so $N = 11$ turns. Without fringing, $g = \mu_0N^2A/L = 4\pi\times10^{-7}\times121\times4\times10^{-4}/10^{-3} = 60.8\,\mathrm{\mu m}$. Then $B = \mu_0\times11\times5/(60.8\times10^{-6}) = 1.14\,\mathrm{T}$. The side of the limb is $a = 20\,\mathrm{mm}$, and the fringing factor $(1 + g/a)^2 = 1.006$ is negligible, so no correction is needed. But a gap of $0.06\,\mathrm{mm}$ is so small that the iron reluctance is no longer negligible: an iron path of $15\,\mathrm{cm}$ with $\mu_r = 4000$ is equivalent to $37.5\,\mathrm{\mu m}$ of gap, more than half the gap itself. A better design uses more turns and a larger gap at a lower flux density, or accounts for the iron: set $g + l_c/\mu_r = 60.8\,\mathrm{\mu m}$, so $g = 23\,\mathrm{\mu m}$, which is impractically small and sensitive to $\mu_r$. Choosing instead $B_{\max} = 0.6\,\mathrm T$ gives $N = 21$ and a total gap of $0.22\,\mathrm{mm}$, of which the iron accounts for $17\,\%$: a predictable inductor. Steel inductors for the kilohertz range are therefore built with many turns and moderate flux densities.
:::
:::

::: exercise Load line of a magnet {level=3}
A ferrite magnet with a straight demagnetisation curve, $B_r = 0.4\,\mathrm T$ and $\mu_{\text{rec}} = 1.1$, has length $l_m = 10\,\mathrm{mm}$ and the same area as the air gap, which is $1\,\mathrm{mm}$ long. The iron is ideal and leakage is neglected. (a) Find the gap flux density. (b) Show that, in general, $B_g = B_r/(1 + \mu_{\text{rec}}g/l_m)$ for equal areas, and explain why rare-earth magnets in motors are made thin while ferrite magnets are made thick.
::: solution
(b) first. With $A_m = A_g$, $B_m = B_g$. Ampère's law gives $H_m = -B_gg/(\mu_0l_m)$. The magnet's curve gives $B_m = B_r + \mu_0\mu_{\text{rec}}H_m = B_r - \mu_{\text{rec}}B_gg/l_m$. Setting $B_m = B_g$ and solving, $B_g = B_r/(1 + \mu_{\text{rec}}g/l_m)$.

(a) $B_g = 0.4/(1 + 1.1\times0.1) = 0.360\,\mathrm T$.

The gap flux density approaches $B_r$ only if $l_m$ is several times $\mu_{\text{rec}}g$. For a ferrite magnet $B_r$ is only $0.4\,\mathrm T$, so to get a useful gap field it must be thick and also have a larger area than the gap (flux concentration). NdFeB has $B_r = 1.2\,\mathrm T$, so even a magnet only a few gap-lengths thick gives $0.8$ to $1\,\mathrm T$; making it thicker wastes expensive material for little gain.
:::
:::

::: exercise Inductance of the saturating core {level=3}
For the core of [[#ex-nonlinear]], find the flux linkage at $i = 1\,\mathrm A$ and $i = 2\,\mathrm A$, taking the area as $10\,\mathrm{cm^2}$. Define the secant inductance $\lambda/i$ and the incremental inductance $\Delta\lambda/\Delta i$ between these points, and explain why they differ.
::: hint
At $i = 1\,\mathrm A$ the load line is $B = 0.628 - 6.28\times10^{-4}H$; solve it with the curve by trial.
:::
::: solution
At $1\,\mathrm A$ ($Ni = 500\,\mathrm A$) the intersection is $H = 97.8\,\mathrm{A/m}$, $B = 0.567\,\mathrm T$; at $2\,\mathrm A$ it is $B = 1.119\,\mathrm T$ (from the example). With $A = 10^{-3}\,\mathrm{m^2}$ and $N = 500$: $\lambda_1 = 500\times0.567\times10^{-3} = 0.283\,\mathrm{Wb}$ and $\lambda_2 = 0.560\,\mathrm{Wb}$. Secant inductances: $0.283\,\mathrm H$ at $1\,\mathrm A$ and $0.280\,\mathrm H$ at $2\,\mathrm A$. Incremental: $(0.560 - 0.283)/1 = 0.276\,\mathrm H$. They differ because $\lambda(i)$ is not a straight line; the curve is beginning to bend, so the slope falls below the secant. Close to saturation the incremental inductance collapses towards the air-core value while the secant value falls more slowly. The incremental value governs ripple and small-signal behaviour; the secant value governs stored flux.
:::
:::
