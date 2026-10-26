The compressor and turbine get most of the attention, but an engine's inlet and nozzle decide whether the turbomachinery can do its job. The inlet must hand the compressor a steady, uniform stream at a Mach number of about 0.5 whatever the aircraft is doing — standing still at full power, cruising at Mach 0.85, or, on a supersonic aircraft, flying at Mach 2 — and it must do so with as little loss of stagnation pressure as possible, because every per cent of pressure lost at the front is a per cent of pressure ratio the compressor must make up. The nozzle at the back converts the stagnation pressure and temperature left after the turbine into jet velocity, and its shape fixes how completely that conversion happens. Both are pieces of **compressible duct flow**, and this chapter applies the one-dimensional gas dynamics of [[fluid-mechanics/compressible-flow]] (isentropic flow, normal and oblique shocks; see also [[aerodynamics/oblique-shocks]]) to their design.

We first set up the mass-flow parameter and the area–Mach relation, which govern every duct in the engine. Then come subsonic inlets and the idea of the capture stream tube, supersonic inlets and the shock losses that dominate them, and finally convergent and convergent–divergent nozzles, their design and off-design behaviour, and the proof that a nozzle gives the most thrust when it expands the gas exactly to ambient pressure.

## Mass flow, area and Mach number

::: proposition The mass-flow parameter {#prop-mfp}
For steady, one-dimensional, isentropic flow of a perfect gas with constant $\gamma$ and gas constant $R$, the mass flow through a section of area $A$ where the Mach number is $M$, the stagnation pressure $p_t$ and the stagnation temperature $T_t$ is
$$
\frac{\dot m\sqrt{T_t}}{A\,p_t} = \mathrm{MFP}(M) = \sqrt{\frac{\gamma}{R}}\; M\left(1 + \frac{\gamma-1}{2}M^2\right)^{-\frac{\gamma+1}{2(\gamma-1)}} .
$$ {#eq-mfp}
$\mathrm{MFP}$ has its maximum at $M = 1$; for air ($\gamma = 1.4$, $R = 287\ \mathrm{J/(kg\,K)}$) the maximum is $0.04042\ \mathrm{kg\,K^{1/2}/(N\,s)}$.
:::

::: proof
Write $\dot m = \rho A V$ with $\rho = p/(RT)$ and $V = M\sqrt{\gamma R T}$:
$$
\dot m = \frac{p}{RT}\,A\,M\sqrt{\gamma R T} = A\,M\,p\sqrt{\frac{\gamma}{RT}} .
$$
Express the static quantities through stagnation ones, $T = T_t\,\theta^{-1}$ and $p = p_t\,\theta^{-\gamma/(\gamma-1)}$ with $\theta = 1 + \frac{\gamma-1}{2}M^2$:
$$
\dot m = A\,M\,p_t\sqrt{\frac{\gamma}{R T_t}}\;\theta^{-\frac{\gamma}{\gamma-1} + \frac12} ,
$$
and $-\frac{\gamma}{\gamma-1} + \frac12 = -\frac{\gamma+1}{2(\gamma-1)}$. Differentiating $\ln\mathrm{MFP} = \ln M - \frac{\gamma+1}{2(\gamma-1)}\ln\theta$ gives $1/M - \frac{\gamma+1}{2}\,M/\theta$, which vanishes when $2\theta = (\gamma+1)M^2$, i.e. at $M = 1$. Assumptions: steady, uniform flow over the section, perfect gas with constant $\gamma$, adiabatic and reversible flow from the stagnation state (only the *local* $p_t$, $T_t$ enter, so the formula also holds downstream of losses provided the local $p_t$ is used).
:::

::: definition Critical area and the area–Mach relation {#def-area-mach}
The **critical area** $A^*$ is the area at which the same flow (same $\dot m$, $p_t$, $T_t$) would be exactly sonic. Dividing $\mathrm{MFP}(1)$ by $\mathrm{MFP}(M)$ gives the **area–Mach relation**
$$
\frac{A}{A^*} = \frac{1}{M}\left[\frac{2}{\gamma+1}\left(1 + \frac{\gamma-1}{2}M^2\right)\right]^{\frac{\gamma+1}{2(\gamma-1)}} ,
$$ {#eq-area-mach}
which is at least 1 and has two solutions for each $A/A^* > 1$: one subsonic, one supersonic. A subsonic flow is decelerated by an *increasing* area (a diffuser) and accelerated by a decreasing one; a supersonic flow behaves the opposite way. A stream that must pass from subsonic to supersonic therefore needs a converging–diverging passage with $M = 1$ at the throat.
:::

The mass-flow parameter explains **choking**. When the throat of a nozzle (or of a turbine's guide vanes) is sonic, the flow through it is $\dot m = \mathrm{MFP}(1)\,A^*p_t/\sqrt{T_t}$, and nothing downstream can increase it: lowering the back pressure further changes the flow downstream of the throat but not the mass flow. The same parameter, evaluated at the compressor face, is the engine's **corrected mass flow** $\dot m\sqrt{\theta}/\delta$ (with $\theta = T_{t2}/288.15\ \mathrm{K}$, $\delta = p_{t2}/101.325\ \mathrm{kPa}$), the quantity on the horizontal axis of every compressor map ([[propulsion/compressors]]).

::: widget plot
f: 1/x*((2/(k+1))*(1 + (k-1)/2*x^2))^((k+1)/(2*(k-1)))
x: 0.1, 4
y: 0, 8
sliders: k=1.4:1.1:1.67:0.01
labels: A/A^*
points: 1, 1; 2, 1.6875
hlines: 1
caption: The area–Mach relation [[#eq-area-mach]] for ratio of specific heats $k = \gamma$. Every area ratio above 1 has a subsonic and a supersonic Mach number; the minimum, $A = A^*$, is the sonic throat. Lower $\gamma$ (hot combustion gas, $\gamma \approx 1.2$–$1.33$) needs a *larger* area ratio for the same exit Mach number — the reason rocket nozzles are so long. The marked point $A/A^* = 27/16$ at $M = 2$ is exercise [[#exr-area-ratio]].
:::

## Subsonic inlets

A subsonic inlet is a short, rounded-lip diffuser. Its design problem is that the engine's demand for air is set by the compressor, not by the flight speed. Far ahead of the inlet the air that will enter the engine occupies a stream tube of area $A_0$, fixed by continuity:
$$
A_0 = \frac{\dot m}{\rho_0 V_0} .
$$
Compare $A_0$ with the inlet highlight (lip) area $A_1$. At **cruise** the engine swallows less air than the projected lip area would collect, $A_0 < A_1$: the stream tube widens ahead of the inlet, the air is partly decelerated *outside* the inlet (external diffusion), and the remainder is diffused inside to about $M_2 \approx 0.5$–$0.6$ at the fan face. At **take-off** and in a climb the situation reverses: $A_0 > A_1$, air is sucked in from the sides and around the lip, and it *accelerates* into the inlet. A sharp lip would separate the flow there, so subsonic inlets have thick, rounded lips: a compromise between take-off (thick lips) and cruise drag (thin lips).

::: definition Inlet pressure recovery and distortion {#def-recovery}
The **pressure recovery** of an inlet is $\pi_d = p_{t2}/p_{t0}$, the ratio of the area-averaged stagnation pressure at the compressor face to the free-stream stagnation pressure. Subsonic inlets achieve $\pi_d \approx 0.97$–$0.995$, the loss coming from skin friction and any separation. **Distortion** is the non-uniformity of $p_t$ (and $T_t$) over the compressor face, usually expressed by an index such as $DC_{60}$, the difference between the face-averaged $p_t$ and the lowest average over any $60°$ sector, divided by the face-averaged dynamic pressure. Distortion reduces the compressor's surge margin even when the average recovery is good.
:::

::: example Capture area of a turbofan inlet at cruise {#ex-capture}
A turbofan swallows $\dot m = 200\ \mathrm{kg/s}$ at $M_0 = 0.80$ at $11\ \mathrm{km}$ ($T_0 = 216.65\ \mathrm{K}$, $p_0 = 22.63\ \mathrm{kPa}$). The inlet has pressure recovery $\pi_d = 0.99$ and delivers $M_2 = 0.60$ at the fan face. Find the free-stream capture area $A_0$, the fan-face flow area $A_2$, and the ratio $A_0/A_2$. What does the ratio say about the flow ahead of the inlet?
::: solution
**Free stream.** $\rho_0 = p_0/(RT_0) = 22\,630/(287 \times 216.65) = 0.364\ \mathrm{kg/m^3}$, $V_0 = 0.8\sqrt{1.4 \times 287 \times 216.65} = 236.0\ \mathrm{m/s}$, so
$$
A_0 = \frac{200}{0.364 \times 236.0} = 2.33\ \mathrm{m^2}.
$$
**Fan face.** $T_{t2} = T_{t0} = 216.65 \times 1.128 = 244.4\ \mathrm{K}$; $p_{t0} = 22.63 \times 1.128^{3.5} = 34.50\ \mathrm{kPa}$; $p_{t2} = 0.99 \times 34.50 = 34.15\ \mathrm{kPa}$. From [[#eq-mfp]], $\mathrm{MFP}(0.6) = 0.03402\ \mathrm{kg\,K^{1/2}/(N\,s)}$, so
$$
A_2 = \frac{\dot m\sqrt{T_{t2}}}{p_{t2}\,\mathrm{MFP}(0.6)} = \frac{200 \times 15.63}{34\,150 \times 0.03402} = 2.69\ \mathrm{m^2},
$$
a flow area equivalent to a circle of diameter $1.85\ \mathrm{m}$ (the real fan, with its hub, is larger).

$A_0/A_2 = 0.865$: the capture stream tube is narrower than the fan face and much narrower than a lip of comparable size, so the stream tube *diverges* ahead of the inlet and the air slows from $M = 0.8$ partly before reaching the lip. **Check.** Because $M_0 > M_2$ the flow must be decelerated somewhere, and subsonic deceleration needs an area increase: $A_0 < A_2$ is consistent. At take-off ($M_0 \approx 0.25$) the same calculation gives $A_0 > A_2$, and the flow accelerates into the inlet.
:::
:::

## Supersonic inlets

At supersonic flight speed the air must be brought down to $M \approx 0.5$ through at least one shock wave, and shocks generate entropy: the stagnation pressure falls across them while the stagnation temperature does not change. The loss depends steeply on the Mach number normal to the shock, so the whole art of supersonic inlet design is to do the deceleration with several weak shocks rather than one strong one.

::: proposition Stagnation-pressure ratio across a normal shock {#prop-normal-shock}
For a perfect gas with constant $\gamma$, a normal shock with upstream Mach number $M_1 > 1$ produces the downstream Mach number and stagnation-pressure ratio
$$
M_2^2 = \frac{(\gamma-1)M_1^2 + 2}{2\gamma M_1^2 - (\gamma-1)},
\qquad
\frac{p_{t2}}{p_{t1}} = \left[\frac{(\gamma+1)M_1^2}{(\gamma-1)M_1^2 + 2}\right]^{\frac{\gamma}{\gamma-1}}\left[\frac{\gamma+1}{2\gamma M_1^2 - (\gamma-1)}\right]^{\frac{1}{\gamma-1}} .
$$ {#eq-normal-shock}
For an oblique shock of wave angle $\beta$, the same formulas apply with $M_1$ replaced by the normal component $M_{1n} = M_1\sin\beta$.
:::

::: proof
The static-pressure and density ratios across a normal shock follow from conservation of mass, momentum and energy (derived in [[fluid-mechanics/compressible-flow]]):
$$
\frac{p_2}{p_1} = \frac{2\gamma M_1^2 - (\gamma-1)}{\gamma+1},\qquad
\frac{\rho_2}{\rho_1} = \frac{(\gamma+1)M_1^2}{(\gamma-1)M_1^2 + 2}.
$$
The shock is adiabatic, so $T_{t2} = T_{t1}$. The entropy change of a perfect gas is $s_2 - s_1 = c_p\ln(T_2/T_1) - R\ln(p_2/p_1)$, and evaluating it between the two *stagnation* states (which have the same entropies as the static states) with $T_{t2} = T_{t1}$ gives $s_2 - s_1 = -R\ln(p_{t2}/p_{t1})$. Between the static states, with $T_2/T_1 = (p_2/p_1)(\rho_1/\rho_2)$,
$$
\frac{s_2 - s_1}{R} = \frac{\gamma}{\gamma-1}\ln\frac{T_2}{T_1} - \ln\frac{p_2}{p_1}
= \frac{1}{\gamma-1}\ln\frac{p_2}{p_1} - \frac{\gamma}{\gamma-1}\ln\frac{\rho_2}{\rho_1},
$$
so $p_{t2}/p_{t1} = (\rho_2/\rho_1)^{\gamma/(\gamma-1)}(p_2/p_1)^{-1/(\gamma-1)}$, which is [[#eq-normal-shock]]. Only the velocity component normal to an oblique shock is changed by it (the tangential momentum equation has no pressure term), so the oblique shock is a normal shock in a frame sliding along the wave. The downstream Mach number formula follows from the same three conservation laws.
:::

The simplest supersonic inlet is the **pitot** (normal-shock) inlet — a subsonic inlet with a sharp lip, ahead of which a single normal shock stands. It is adequate up to about Mach 1.5 ($\pi_d = 0.93$ from the shock alone), and poor beyond. Better inlets turn the flow first through one or more **oblique shocks** on a ramp (two-dimensional inlets) or a cone (axisymmetric spike inlets), so that the terminal normal shock occurs at a lower Mach number. Klaus Oswatitsch showed in the 1940s that, for a given number of shocks, the recovery is greatest when the oblique shocks all have the same normal Mach number; real inlets add a final isentropic (gradual) compression where possible.

::: example One shock or two at Mach 2 {#ex-two-shock}
An aircraft flies at $M_0 = 2.0$ ($\gamma = 1.4$). Compare the shock-loss recovery of (a) a pitot inlet with a single normal shock and (b) an external-compression inlet with a $10°$ ramp that produces a weak oblique shock, followed by a normal shock at the cowl lip.
::: solution
(a) [[#eq-normal-shock]] at $M_1 = 2$: $p_{t2}/p_{t1} = 0.721$, and $M_2 = 0.577$.
(b) For $M_1 = 2$ and deflection $\theta = 10°$, the $\theta$–$\beta$–$M$ relation ([[aerodynamics/oblique-shocks]]) gives the weak-shock angle $\beta = 39.3°$. The normal Mach number is $M_{1n} = 2\sin 39.3° = 1.267$, giving $p_t$ ratio $0.985$; the downstream normal component is $0.803$, and the downstream Mach number is $M_2 = 0.803/\sin(39.3° - 10°) = 1.64$. The normal shock at $M = 1.64$ has $p_t$ ratio $0.880$. In total,
$$
\pi_{\text{shocks}} = 0.985 \times 0.880 = 0.866 .
$$
**Check.** The ramp converts a 28 % loss into a 13 % loss, of which only 1.5 % comes from the oblique shock itself: shock loss grows roughly as $(M_n - 1)^3$ for weak shocks, so splitting a compression helps enormously. A second $10°$ ramp (exercise [[#exr-three-shock]]) brings the recovery to $0.955$. Each extra shock costs ramp length, weight and boundary-layer complications, and the shock positions must be scheduled with flight Mach number, which is why Mach 2 inlets have variable geometry.
:::
:::

For preliminary design, engine studies use a standard recovery schedule instead of a shock calculation. The most common is the one in the former US military engine specification MIL-E-5007D (Mattingly, *Elements of Propulsion*):
$$
\pi_{d,\text{shock}} = 1 - 0.075\,(M_0 - 1)^{1.35},\qquad 1 < M_0 < 5,
$$ {#eq-mil-spec}
an empirical curve representing a good multi-shock inlet; it is multiplied by a subsonic-diffuser recovery of about 0.97–0.99 for friction.

::: widget plot
f: (((1.4+1)*x^2/((1.4-1)*x^2 + 2))^(1.4/0.4))*(((1.4+1)/(2*1.4*x^2 - 0.4))^(1/0.4)); 1 - 0.075*(x - 1)^1.35
x: 1, 4
y: 0, 1
labels: \text{normal shock}; \text{MIL-E-5007D}
points: 2, 0.7209; 2, 0.925
caption: Stagnation-pressure recovery against flight Mach number for a single normal shock [[#eq-normal-shock]] and for the empirical "good inlet" schedule [[#eq-mil-spec]]. Below about Mach 1.4 a normal shock is almost free; above Mach 2 it throws away most of the ram pressure, and a multi-shock inlet recovers two or three times as much. Read off the gap at Mach 3: it is the difference between a useful engine and a useless one.
:::

### Starting, buzz and unstart

A *mixed-* or *internal-compression* inlet places some of its shocks inside a converging passage, which allows a shorter, lower-drag cowl but introduces a **starting problem**. To pass from subsonic to supersonic flow, the internal throat must be large enough to swallow the normal shock that stands ahead of the inlet as the vehicle accelerates; the criterion was given by Kantrowitz and Donaldson at NACA in 1945. Once started, a disturbance that pushes the shock forward out of the inlet — an engine flow reduction, a gust, a change of angle of attack — **unstarts** it, with a sudden loss of recovery and a violent change of drag; variable throats and bleed systems are used to prevent and recover from unstart. External-compression inlets operated at too little engine flow suffer **buzz**, an oscillation of the shock system ahead of the cowl.

::: warning Recovery is a ratio of stagnation pressures, and it multiplies
Inlet recovery compares $p_{t2}$ with the free-stream *stagnation* pressure $p_{t0} = \pi_r p_0$, not with the static pressure $p_0$. At Mach 2 the ram ratio is $\pi_r = 7.82$; an inlet with $\pi_d = 0.90$ delivers $p_{t2} = 7.04\,p_0$, still a large compression. A second mistake is to add losses: recoveries of successive elements (shocks, subsonic diffuser, struts) *multiply*. And remember that recovery is not the only figure of merit — an inlet with excellent average recovery and severe distortion can still surge the compressor.
:::

## Nozzles

The exhaust nozzle converts the stagnation enthalpy of the gas into jet velocity. For an isentropic nozzle that expands the gas from $p_{t9}$, $T_{t9}$ to the exit pressure $p_9$,
$$
V_9 = \sqrt{2c_p T_{t9}\left[1 - \left(\frac{p_9}{p_{t9}}\right)^{(\gamma-1)/\gamma}\right]},
$$ {#eq-nozzle-velocity}
which is the steady-flow energy equation with $T_9/T_{t9}$ from the isentropic relation. The nozzle's operating condition is described by the **nozzle pressure ratio** $\mathrm{NPR} = p_{t9}/p_0$.

### Convergent nozzles and choking

A purely convergent nozzle can accelerate the gas at most to $M = 1$ at its exit. The exit becomes sonic when NPR reaches the critical value
$$
\mathrm{NPR}_{\text{crit}} = \left(\frac{\gamma+1}{2}\right)^{\gamma/(\gamma-1)},
$$
which is $1.893$ for $\gamma = 1.4$ and $1.851$ for $\gamma = 1.33$. Below it the exit pressure equals ambient and the jet is subsonic. Above it the nozzle is **choked**: the exit stays sonic, $p_9 = p_{t9}/\mathrm{NPR}_{\text{crit}} > p_0$, and the remaining expansion happens outside the nozzle in a pattern of expansion and compression waves (the "shock diamonds" visible in a hot jet). The extra pressure gives pressure thrust, but, as we now prove, less than complete expansion would have given.

::: proposition Gross thrust is greatest for perfect expansion {#prop-perfect-expansion}
For an isentropic nozzle with fixed mass flow and fixed inlet stagnation conditions, the gross thrust $F_G = \dot m V_9 + (p_9 - p_0)A_9$, regarded as a function of the exit area $A_9$, satisfies
$$
\frac{\mathrm{d}F_G}{\mathrm{d}A_9} = p_9 - p_0 ,
$$
so it is stationary — and a maximum — when the exit pressure equals the ambient pressure.
:::

::: proof
In steady, quasi-one-dimensional, frictionless flow the momentum equation for a slice of the nozzle is $\rho V\,\mathrm{d}V = -\mathrm{d}p$; multiplying by $A$ and using $\dot m = \rho V A$ gives $\dot m\,\mathrm{d}V = -A\,\mathrm{d}p$. Extending the nozzle by $\mathrm{d}A_9$ changes the exit velocity and pressure by $\mathrm{d}V_9$, $\mathrm{d}p_9$ related in this way. Then
$$
\mathrm{d}F_G = \dot m\,\mathrm{d}V_9 + A_9\,\mathrm{d}p_9 + (p_9 - p_0)\,\mathrm{d}A_9 = (p_9 - p_0)\,\mathrm{d}A_9 ,
$$
because the first two terms cancel. In supersonic flow a larger exit area lowers $p_9$; so for $p_9 > p_0$ enlarging the nozzle increases thrust, for $p_9 < p_0$ it decreases thrust, and the maximum is at $p_9 = p_0$. Physically, extending the divergent wall adds a surface on which the gas pressure $p_9$ pushes forwards against the ambient $p_0$ pushing back: worth having only while $p_9 > p_0$. Assumptions: isentropic, quasi-one-dimensional flow without separation; fixed $\dot m$, $p_{t9}$, $T_{t9}$; external flow at $p_0$ (nozzle afterbody drag ignored).
:::

::: example Convergent or convergent–divergent at supersonic cruise {#ex-cd-nozzle}
At supersonic cruise the nozzle of an engine receives hot gas at $T_{t9} = 1000\ \mathrm{K}$ ($\gamma = 1.33$, $R = 287\ \mathrm{J/(kg\,K)}$, so $c_p = 1157\ \mathrm{J/(kg\,K)}$) with $\mathrm{NPR} = 8$. Find the exit Mach number, area ratio $A_9/A^*$ and jet velocity of a perfectly expanded convergent–divergent nozzle, and compare its gross thrust per unit mass flow with that of a convergent nozzle.
::: solution
**C–D nozzle.** $p_9 = p_0$, so $T_{t9}/T_9 = 8^{0.2481} = 1.675$, $T_9 = 597\ \mathrm{K}$:
$$
M_9 = \sqrt{\frac{2}{\gamma-1}\left(1.675 - 1\right)} = 2.02,\qquad
V_9 = \sqrt{2 \times 1157 \times (1000 - 597)} = 966\ \mathrm{m/s},
$$
and [[#eq-area-mach]] with $\gamma = 1.33$ gives $A_9/A^* = 1.78$.
**Convergent nozzle.** The exit is sonic: $T^* = 2T_{t9}/(\gamma+1) = 858\ \mathrm{K}$, $V^* = \sqrt{\gamma R T^*} = 572\ \mathrm{m/s}$, $p^* = 0.5404\,p_{t9}$. Per unit mass flow, the pressure thrust is $(p^* - p_0)A^*/\dot m$ with $\dot m/A^* = \mathrm{MFP}(1)\,p_{t9}/\sqrt{T_{t9}}$ and $\mathrm{MFP}(1) = 0.03970$ for $\gamma = 1.33$:
$$
\frac{(p^* - p_0)A^*}{\dot m} = \frac{(0.5404 - 0.125)\sqrt{1000}}{0.03970} = 331\ \mathrm{m/s},
\qquad
\frac{F_G}{\dot m} = 572 + 331 = 903\ \mathrm{m/s}.
$$
The convergent nozzle delivers $903/966 = 0.935$ of the ideal gross thrust, a loss of 6.5 %.

**Check.** The loss of *net* thrust is much larger than 6.5 %: at Mach 2 the ram drag is a large fraction of gross thrust, so a 6.5 % cut in gross thrust might remove a quarter of the net thrust. That is why every supersonic cruise engine has a variable convergent–divergent nozzle, while a subsonic airliner (NPR below about 3 at cruise) uses a simple convergent one and loses a fraction of a per cent.
:::
:::

::: widget plot
f: sqrt(2*k/(k-1)*(1 - x^(-(k-1)/k))); if(x < ((k+1)/2)^(k/(k-1)), sqrt(2*k/(k-1)*(1 - x^(-(k-1)/k))), sqrt(2*k/(k+1)) + ((2/(k+1))^(k/(k-1)) - 1/x)/(sqrt(k)*(2/(k+1))^((k+1)/(2*(k-1)))))
x: 1, 20
y: 0, 3
sliders: k=1.33:1.2:1.4:0.01
labels: \text{C--D, perfectly expanded}; \text{convergent}
points: 8, 1.8025; 8, 1.6860
caption: Gross thrust per unit mass flow, made dimensionless as $F_G/(\dot m\sqrt{R T_t})$, against nozzle pressure ratio for a perfectly expanded convergent–divergent nozzle and a convergent nozzle, for $k = \gamma$. The curves coincide up to the critical pressure ratio (about 1.85–1.89) and separate slowly after it. The points at $\mathrm{NPR} = 8$ are example [[#ex-cd-nozzle]]; at subsonic-cruise NPRs of 2–3 the difference is negligible.
:::

### Off-design operation of a C–D nozzle

A fixed convergent–divergent nozzle is perfectly expanded at only one NPR. For an area ratio $A_9/A^*$ the flow regimes, in order of decreasing NPR, are:

1. **Under-expanded** (NPR above design): the flow inside is the design flow, $p_9 > p_0$, and expansion fans form at the lip.
2. **Over-expanded with external shocks**: the internal flow is still the isentropic supersonic design flow, but $p_9 < p_0$, and oblique shocks at the lip raise the jet pressure. This continues until the NPR at which a *normal* shock would stand exactly in the exit plane.
3. **Normal shock inside the divergent section**: the shock moves upstream as NPR falls; behind it the flow is subsonic and diffuses to $p_0$. (In real nozzles the over-expanded boundary layer separates first, and the flow pattern is more complex.)
4. **Subsonic throughout** below the NPR at which the throat just reaches $M = 1$ with subsonic flow on both sides.

These boundaries follow from [[#eq-area-mach]] and [[#eq-normal-shock]]; exercise [[#exr-off-design]] works them out for the nozzle of example [[#ex-cd-nozzle]]. Aircraft nozzles avoid most of this by varying the throat and exit areas with flight condition (iris or flap nozzles); rocket nozzles cannot, and their altitude behaviour is treated in [[propulsion/rocket-fundamentals]].

::: definition Nozzle performance coefficients {#def-nozzle-coeffs}
Real nozzles are rated against the ideal by two coefficients. The **discharge coefficient** $C_D = \dot m_{\text{actual}}/\dot m_{\text{ideal}}$ compares the mass flow with the isentropic flow through the geometric throat (0.95–0.99; boundary layers and the curvature of the sonic line reduce the effective throat). The **gross-thrust coefficient** $C_{fg} = F_{G,\text{actual}}/F_{G,\text{ideal}}$ compares the gross thrust with that of a perfectly expanded isentropic nozzle passing the actual mass flow (0.97–0.995), and lumps friction, divergence of the exit flow (a conical nozzle of half-angle $\alpha$ loses the factor $(1 + \cos\alpha)/2$ of its momentum thrust) and imperfect expansion.
:::

::: example Mixing the streams: a choked fan nozzle at cruise {#ex-fan-nozzle}
The fan nozzle of a high-bypass turbofan at cruise ($M_0 = 0.80$, $11\ \mathrm{km}$, $p_0 = 22.63\ \mathrm{kPa}$, $T_0 = 216.65\ \mathrm{K}$) receives air with fan pressure ratio $1.6$ and inlet recovery $0.99$ (fan isentropic, $\gamma = 1.4$). Is a convergent fan nozzle choked? If so, by how much does it fall short of the perfectly expanded jet velocity?
::: solution
$p_{t13} = 1.6 \times 0.99 \times 34.50 = 54.65\ \mathrm{kPa}$, so $\mathrm{NPR} = 54.65/22.63 = 2.415 > 1.893$: the nozzle is choked. $T_{t13} = 244.4 \times 1.6^{0.2857} = 279.5\ \mathrm{K}$.
**Choked convergent.** $T^* = 279.5/1.2 = 232.9\ \mathrm{K}$, $V^* = \sqrt{1.4 \times 287 \times 232.9} = 305.9\ \mathrm{m/s}$; $p^* = 54.65 \times 0.5283 = 28.87\ \mathrm{kPa}$; per unit mass flow, $(p^* - p_0)A^*/\dot m = (28.87 - 22.63)\times10^3\sqrt{279.5}/(0.04042 \times 54\,650) = 47.2\ \mathrm{m/s}$, so $F_G/\dot m = 353.1\ \mathrm{m/s}$.
**Perfectly expanded.** $V_{19} = \sqrt{2 \times 1004.5 \times 279.5\,[1 - 2.415^{-0.2857}]} = 353.6\ \mathrm{m/s}$.
The convergent nozzle reaches $353.1/353.6 = 0.999$ of the ideal gross thrust.

**Check.** Against the fan-stream specific thrust $V_{19} - V_0 \approx 118\ \mathrm{m/s}$, a $0.5\ \mathrm{m/s}$ shortfall is about 0.4 % of the fan's *net* thrust — small, but not zero for an airliner, and still less costly than the weight and drag of a divergent section on a nozzle two metres across, which is why fan nozzles are convergent.
:::
:::

::: quiz
A convergent nozzle is choked. The ambient pressure is reduced (for example, by climbing) while the nozzle's inlet stagnation conditions stay fixed. What happens?
- [ ] The mass flow increases because the pressure difference across the nozzle increases.
- [x] The mass flow and exit velocity stay the same, and the pressure thrust increases.
- [ ] The exit Mach number rises above 1.
- [ ] The exit pressure falls to the new ambient pressure.
::: solution
Once the exit is sonic, information about the downstream pressure cannot travel upstream into the nozzle: the mass flow $\mathrm{MFP}(1)A^*p_t/\sqrt{T_t}$, the exit velocity and the exit pressure are all fixed by the upstream stagnation state. Only the pressure thrust $(p^* - p_0)A^*$ grows as $p_0$ falls. A convergent passage can never produce supersonic flow.
:::
:::

::: history
The convergent–divergent nozzle is named after Gustaf de Laval, who used it in the 1880s to drive his small, very fast steam turbines with supersonic steam jets. Aurel Stodola's experiments on steam nozzles, published in the first decade of the twentieth century, showed the shock waves that stand in an over-expanded nozzle, and the theory of supersonic inlets was developed during and immediately after the Second World War — by Klaus Oswatitsch in Germany on multi-shock diffusers, and by Arthur Kantrowitz and Coleman duP. Donaldson at NACA on the starting of internal-compression diffusers (1945). Supersonic aircraft from the 1950s onwards made these ideas routine: the variable-ramp intakes of Concorde, in airline service from 1976, and the translating-spike inlets of the Lockheed SR-71 are the best-known examples.
:::

::: summary
- The mass-flow parameter $\dot m\sqrt{T_t}/(Ap_t) = \mathrm{MFP}(M)$, maximal at $M = 1$, governs choking and the corrected flow of engine components; the area–Mach relation follows from it.
- Subsonic inlets diffuse to $M_2 \approx 0.5$–$0.6$; the capture stream tube is smaller than the lip at cruise and larger at take-off, hence rounded lips. Recovery $\pi_d = p_{t2}/p_{t0} \approx 0.97$–$0.995$; distortion matters as much as average recovery.
- Supersonic inlets lose stagnation pressure in shocks; a single normal shock is acceptable to about Mach 1.5. Splitting the compression into several weak oblique shocks plus a weak normal shock raises recovery dramatically; MIL-E-5007D, $1 - 0.075(M_0 - 1)^{1.35}$, is a standard design-study schedule.
- Internal-compression inlets must be started and can unstart; external-compression inlets can buzz.
- A convergent nozzle chokes above $\mathrm{NPR}_{\text{crit}} \approx 1.85$–$1.89$; gross thrust is greatest when the nozzle expands to $p_0$, since $\mathrm{d}F_G/\mathrm{d}A_9 = p_9 - p_0$.
- C–D nozzles pay off at high NPR (supersonic flight, rockets); off design they are under- or over-expanded, with shocks outside or inside the nozzle.
:::

## Exercises

::: exercise {#exr-area-ratio level=1 check="1.6875"}
Find the area ratio $A/A^*$ of an isentropic air nozzle ($\gamma = 1.4$) at $M = 2$. (Enter the exact value as a decimal.)
::: solution
$\frac{1}{2}\left[\frac{2}{2.4}\left(1 + 0.2\times4\right)\right]^{3} = \frac12 (1.5)^3 = \frac{27}{16} = 1.6875$.
:::
:::

::: exercise {#exr-ns-15 level=1 check="0.930"}
What is the stagnation-pressure recovery of a pitot inlet at $M_0 = 1.5$ ($\gamma = 1.4$), counting only the normal shock? (Enter the recovery rounded to three significant figures.)
::: solution
[[#eq-normal-shock]] with $M_1 = 1.5$: $\left[\frac{2.4 \times 2.25}{0.4 \times 2.25 + 2}\right]^{3.5}\left[\frac{2.4}{2.8 \times 2.25 - 0.4}\right]^{2.5} = (1.8621)^{3.5}(0.4068)^{2.5} = 0.930$.
:::
:::

::: exercise {#exr-critical-npr level=1 check="1.893"}
Find the critical nozzle pressure ratio of a convergent nozzle passing air with $\gamma = 1.4$. (Enter the value rounded to four significant figures.)
::: solution
$(1.2)^{3.5} = 1.893$. For hot gas with $\gamma = 1.33$ it is $1.851$.
:::
:::

::: exercise {#exr-capture level=2 check="1.64"}
An engine swallows $150\ \mathrm{kg/s}$ of air at $M_0 = 0.85$ at $11\ \mathrm{km}$ ($T_0 = 216.65\ \mathrm{K}$, $p_0 = 22.63\ \mathrm{kPa}$). What is the area of the captured free-stream tube? (Enter $A_0$ in m², rounded to three significant figures.)
::: solution
$\rho_0 = 0.364\ \mathrm{kg/m^3}$, $V_0 = 0.85 \times 295.0 = 250.8\ \mathrm{m/s}$, so $A_0 = 150/(0.364 \times 250.8) = 1.64\ \mathrm{m^2}$.
:::
:::

::: exercise {#exr-choked-flow level=2 check="58.3"}
The guide vanes ahead of a turbine form a choked throat of total area $0.10\ \mathrm{m^2}$. The gas there has $p_t = 500\ \mathrm{kPa}$ and $T_t = 1200\ \mathrm{K}$. Treating the gas as air ($\gamma = 1.4$, $R = 287\ \mathrm{J/(kg\,K)}$), find the mass flow. (Enter the mass flow in kg/s, rounded to three significant figures.)
::: solution
$\dot m = \mathrm{MFP}(1)\,A p_t/\sqrt{T_t} = 0.04042 \times 0.10 \times 5\times10^{5}/34.64 = 58.3\ \mathrm{kg/s}$. If the turbine inlet temperature rises at constant $p_t$, the choked flow falls as $1/\sqrt{T_t}$ — the basis of compressor–turbine matching in [[propulsion/turbines]].
:::
:::

::: exercise {#exr-cd-design level=2 check="1.93"}
Design a convergent–divergent nozzle for air ($\gamma = 1.4$) at $\mathrm{NPR} = 10$, perfectly expanded. Find the exit Mach number and the area ratio $A_9/A^*$. (Enter the area ratio rounded to three significant figures.)
::: solution
$T_t/T_9 = 10^{0.2857} = 1.9307$, so $M_9 = \sqrt{5(0.9307)} = 2.157$, and [[#eq-area-mach]] gives $A_9/A^* = 1.93$.
:::
::: answer
$M_9 = 2.16$, $A_9/A^* = 1.93$
:::
:::

::: exercise {#exr-three-shock level=3 check="0.955"}
Add a second $10°$ ramp to the inlet of example [[#ex-two-shock]], so that the flow at $M = 1.64$ behind the first oblique shock is turned through a further $10°$ by a second oblique shock before the terminal normal shock. Find the total shock recovery. (Enter the recovery rounded to three significant figures.)
::: hint
Find the weak-shock angle for $M = 1.64$, $\theta = 10°$ from the $\theta$–$\beta$–$M$ relation (a few iterations of $\tan\theta = 2\cot\beta\,(M^2\sin^2\beta - 1)/[M^2(\gamma + \cos 2\beta) + 2]$).
:::
::: solution
For $M = 1.640$, $\theta = 10°$: $\beta = 49.4°$, $M_n = 1.640\sin 49.4° = 1.245$, $p_t$ ratio $0.988$; downstream normal component $0.815$ and $M = 0.815/\sin 39.4° = 1.284$. The terminal normal shock at $M = 1.284$ has $p_t$ ratio $0.982$. Total: $0.985 \times 0.988 \times 0.982 = 0.955$. The two oblique shocks have similar normal Mach numbers (1.27 and 1.25), close to Oswatitsch's equal-strength optimum.
:::
:::

::: exercise {#exr-off-design level=3 check="1.77"}
The C–D nozzle of example [[#ex-cd-nozzle]] has $A_9/A^* = 1.78$ ($\gamma = 1.33$, design $\mathrm{NPR} = 8$, design $M_9 = 2.02$). (a) At what NPR would a normal shock stand exactly in the exit plane? (b) Below what NPR is the flow subsonic everywhere? (c) Describe the flow at $\mathrm{NPR} = 3$. (Enter the NPR of part (a), rounded to three significant figures.)
::: solution
(a) The supersonic design flow reaches the exit with $p_9 = p_{t9}/8$ and $M_9 = 2.02$. A normal shock at $M = 2.02$ multiplies the static pressure by $[2\gamma M^2 - (\gamma-1)]/(\gamma+1) = 4.53$, so the shock sits at the exit when $p_0 = 4.53\,p_{t9}/8 = 0.566\,p_{t9}$, i.e. $\mathrm{NPR} = 1.77$.
(b) The subsonic solution of [[#eq-area-mach]] for $A/A^* = 1.78$ is $M = 0.351$, at which $p/p_t = 0.922$; so the flow is subsonic throughout (and the throat just sonic) at $\mathrm{NPR} = 1.085$, and fully subsonic below it.
(c) $\mathrm{NPR} = 3$ lies between 1.77 and 8: the internal flow is the isentropic design flow with $p_9 = p_{t9}/8$, below ambient ($p_{t9}/3$). The nozzle is over-expanded, oblique shocks stand at the lip, and the pressure thrust $(p_9 - p_0)A_9$ is negative. (A real nozzle this far over-expanded would probably separate inside the divergent section.)
:::
:::

::: exercise {#exr-inlet-design level=3}
**Design discussion.** A business jet is to cruise at Mach 1.6. Compare a pitot inlet with a single-ramp external-compression inlet in terms of recovery (use [[#eq-normal-shock]] and [[#eq-mil-spec]]), weight, drag, complexity and behaviour at take-off. Estimate how the recovery difference affects the compressor-face stagnation pressure, and state which you would choose and why.
::: solution
At $M_0 = 1.6$ a normal shock alone gives $p_t$ ratio $0.895$; [[#eq-mil-spec]] gives $1 - 0.075 \times 0.6^{1.35} = 0.962$ for a good multi-shock inlet. With $\pi_r = (1 + 0.2 \times 2.56)^{3.5} = 4.25$, the compressor-face pressure is $3.80\,p_0$ against $4.09\,p_0$ (before friction) — about 7 % less, which the compressor must make up at a cost of a few per cent in specific fuel consumption and in thrust. The pitot inlet is light, short, has no moving parts, no starting problem and good take-off behaviour (with a rounded or auxiliary-door lip). The ramp inlet needs variable geometry to schedule its shock with Mach number, boundary-layer bleed and more structure. For a modest-Mach business jet, where the time at supersonic speed and the weight penalty both matter, a well-designed pitot or a fixed single-ramp inlet is a reasonable choice; at Mach 2 and above the variable multi-shock inlet becomes indispensable. Any honest answer should note the uncertainty in all these figures and the need for detailed analysis and testing.
:::
:::
