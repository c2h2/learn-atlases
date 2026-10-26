A rocket is the only propulsion device that works in a vacuum, because it carries everything it throws away. That single fact shapes the whole subject. An air-breathing engine takes its working fluid and most of its oxidiser free from the atmosphere; a rocket must lift its entire propellant load, and the propellant needed to accelerate the propellant that will be burned later. The result is the **rocket equation**, whose logarithm makes high velocity increments exponentially expensive in mass and forces launch vehicles to be built in stages. The second half of the chapter turns to the rocket nozzle, where the thermal energy of the combustion gas becomes exhaust velocity, and to the two performance parameters that separate the contributions of the combustion chamber (**characteristic velocity** $c^*$) and of the nozzle (**thrust coefficient** $C_F$).

This chapter stays at the level of performance and system analysis — the rocket equation, staging, nozzle theory — as in the standard textbooks (Sutton and Biblarz; Hill and Peterson). The engine types themselves, chemical and electric, are compared in [[propulsion/rocket-engines]]; the orbital mechanics that sets the velocity increments a mission needs is the subject of [[orbital-mechanics/orbital-manoeuvres]].

## Rocket thrust and specific impulse

Apply the thrust equation of [[propulsion/thrust-efficiency]] to a device with no air intake: $\dot m_0 = 0$, and all the exhaust mass flow $\dot m$ is propellant carried on board. With nozzle exit velocity $V_e$, exit pressure $p_e$, exit area $A_e$ and ambient pressure $p_a$,
$$
F = \dot m V_e + (p_e - p_a)A_e = \dot m\,c .
$$ {#eq-rocket-thrust}
Unlike an air-breather's thrust, this does not depend on flight speed — there is no ram drag — but it does depend on altitude through $p_a$.

::: definition Effective exhaust velocity, specific impulse, total impulse {#def-isp}
The **effective exhaust velocity** of a rocket is $c = F/\dot m = V_e + (p_e - p_a)A_e/\dot m$. The **specific impulse** is the thrust per unit weight flow of propellant,
$$
I_{sp} = \frac{F}{\dot m\,g_0} = \frac{c}{g_0},\qquad g_0 = 9.80665\ \mathrm{m/s^2}\ (\text{standard gravity, a fixed conversion constant}),
$$
quoted in seconds. A propellant combination's $I_{sp}$ is always stated with its conditions: chamber pressure, nozzle area ratio, and ambient pressure ("sea level" or "vacuum"). The **total impulse** of a burn is $I_t = \int F\,\mathrm{d}t$, which for constant thrust is $Ft_b = m_p c$.
:::

Typical published values (vacuum unless stated) are about $450\ \mathrm{s}$ for liquid oxygen–liquid hydrogen engines, $310$–$350\ \mathrm{s}$ for liquid oxygen with kerosene or methane, $280$–$300\ \mathrm{s}$ for storable bipropellants and composite solid motors, around $220$–$230\ \mathrm{s}$ for hydrazine monopropellant thrusters and $1500$–$4000\ \mathrm{s}$ for electric thrusters, whose thrust, however, is tiny ([[propulsion/rocket-engines]]).

## The rocket equation

::: proposition The Tsiolkovsky rocket equation {#prop-tsiolkovsky}
A rocket of instantaneous mass $m$, expelling propellant at constant effective exhaust velocity $c$ relative to itself, with no external forces, gains velocity
$$
\Delta v = c\,\ln\frac{m_0}{m_f} = I_{sp}\,g_0\,\ln R ,
$$ {#eq-rocket-equation}
where $m_0$ is the initial and $m_f$ the final mass and $R = m_0/m_f$ is the **mass ratio**. The propellant needed is $m_p = m_0\left(1 - e^{-\Delta v/c}\right)$.
:::

::: proof
In an inertial frame, at time $t$ the rocket has mass $m$ and velocity $v$. During $\mathrm{d}t$ it expels mass $-\mathrm{d}m > 0$ (since $\mathrm{d}m < 0$) with velocity $v - c$ (backwards, relative to the rocket, at the effective exhaust velocity) and itself becomes $m + \mathrm{d}m$ at $v + \mathrm{d}v$. With no external force, momentum is conserved:
$$
m v = (m + \mathrm{d}m)(v + \mathrm{d}v) + (-\mathrm{d}m)(v - c).
$$
Expanding and dropping the second-order term $\mathrm{d}m\,\mathrm{d}v$ leaves $0 = m\,\mathrm{d}v + c\,\mathrm{d}m$, i.e.
$$
\mathrm{d}v = -c\,\frac{\mathrm{d}m}{m}.
$$
Integrating at constant $c$ from $m_0$ to $m_f$ gives $\Delta v = c\ln(m_0/m_f)$. Using the *effective* velocity $c$ accounts for the pressure thrust: the momentum argument applied with the nozzle-exit control surface gives the force $\dot m c$ on the rocket, which is what $m\,\mathrm{d}v/\mathrm{d}t = -c\,\mathrm{d}m/\mathrm{d}t$ states. Assumptions: no gravity, drag or other external forces; constant $c$ (constant ambient pressure, constant engine operating point); propellant expelled continuously. The result does not depend on how fast the propellant is burned.
:::

The logarithm is the whole story. Doubling $\Delta v$ *squares* the mass ratio: with $I_{sp} = 300\ \mathrm{s}$, a velocity increment of $3\ \mathrm{km/s}$ needs $R = 2.77$, $6\ \mathrm{km/s}$ needs $R = 7.68$ and $9\ \mathrm{km/s}$ needs $R = 21.3$. When $\Delta v$ is several times $c$, the propellant mass dwarfs everything else.

::: widget plot
f: I*9.80665*ln(x)/1000
x: 1, 25
y: 0, 15
sliders: I=300:200:460:1
labels: \Delta v\ (\mathrm{km/s})
hlines: 9.3
caption: Ideal velocity increment in km/s against mass ratio $R = m_0/m_f$ for specific impulse $I$ (s). The horizontal line is a typical $\Delta v$ for reaching low Earth orbit including losses, about $9.3\ \mathrm{km/s}$. Find the mass ratio it needs at $I = 300$ and at $I = 450\ \mathrm{s}$; then remember that the tanks, engines and structure must fit inside the final mass $m_f$ together with the payload.
:::

::: example Can a single stage reach orbit? {#ex-ssto}
A launch to low Earth orbit needs about $\Delta v = 9.3\ \mathrm{km/s}$ including gravity and drag losses. A single stage has $I_{sp} = 450\ \mathrm{s}$ (an average over the ascent for a hydrogen–oxygen engine) and a **structural coefficient** $\varepsilon = m_s/(m_s + m_p) = 0.08$ or $0.12$, where $m_s$ is the mass of tanks, engines and structure. What fraction of the lift-off mass can be payload?
::: solution
$R = \exp\left(9300/(450 \times 9.80665)\right) = 8.23$, so $m_f/m_0 = 0.1216$: 87.8 % of the lift-off mass must be propellant. The final mass is structure plus payload, $m_f = m_s + m_L$, with $m_s = \varepsilon(m_s + m_p) = \varepsilon(m_0 - m_L)$. Hence
$$
\frac{m_L}{m_0} = \frac{1/R - \varepsilon}{1 - \varepsilon} = \frac{0.1216 - 0.08}{0.92} = 0.045\quad(\varepsilon = 0.08),\qquad
\frac{0.1216 - 0.12}{0.88} = 0.0018\quad(\varepsilon = 0.12).
$$
**Check.** With an optimistic structure, 4.5 % payload; with a realistic one for large, light, insulated hydrogen tanks, almost nothing — and the result is acutely sensitive to small errors in $\varepsilon$ or $I_{sp}$. This is why every orbital launcher in service (as of 2026) uses at least two stages.
:::
:::

### Losses: gravity, drag and steering

A real ascent is not force-free. Along the flight path, with flight-path angle $\theta$ above the horizontal and drag $D$,
$$
m\frac{\mathrm{d}v}{\mathrm{d}t} = F - D - mg\sin\theta
\qquad\Longrightarrow\qquad
\Delta v = c\ln R - \int_0^{t_b} g\sin\theta\,\mathrm{d}t - \int_0^{t_b}\frac{D}{m}\,\mathrm{d}t ,
$$
when the thrust is along the velocity (otherwise a further **steering loss** appears). The **gravity loss** $\int g\sin\theta\,\mathrm{d}t$ is largest in a vertical climb and grows with burn time — a powerful argument for a high thrust-to-weight ratio at lift-off, since a rocket that barely lifts itself spends its propellant holding itself up. Launch vehicles pitch over early to turn their thrust horizontal (a "gravity turn"). For orbital launches the gravity loss is typically of the order of $1$–$1.5\ \mathrm{km/s}$ and the drag loss about $0.1$–$0.3\ \mathrm{km/s}$, which, added to the orbital speed of about $7.8\ \mathrm{km/s}$ and minus the eastward speed of Earth's rotation, gives the familiar $9$–$10\ \mathrm{km/s}$ budget.

::: example Gravity loss of a vertical burn {#ex-gravity-loss}
A sounding rocket with $I_{sp} = 300\ \mathrm{s}$ and mass ratio 4 burns for $150\ \mathrm{s}$ going straight up. Neglecting drag and the variation of $g$ with height, find its burnout velocity.
::: solution
Ideal: $\Delta v = 300 \times 9.80665 \times \ln 4 = 4078\ \mathrm{m/s}$. Gravity loss for a vertical burn ($\sin\theta = 1$): $g\,t_b = 9.81 \times 150 = 1471\ \mathrm{m/s}$. Burnout velocity $= 4078 - 1471 = 2607\ \mathrm{m/s}$.

**Check.** A third of the ideal $\Delta v$ is lost to gravity. Burning the same propellant in $50\ \mathrm{s}$ would cut the loss to $490\ \mathrm{m/s}$ — but would need three times the thrust, a heavier engine and higher acceleration loads. Choosing the thrust level is a trade between gravity loss and engine mass.
:::
:::

## Staging

Staging discards structure as soon as its propellant is used, so that later stages do not have to accelerate empty tanks. For a vehicle of $N$ stages fired in sequence, each stage $i$ (with everything above it as its "payload") contributes $c_i\ln R_i$, and the total is $\Delta v = \sum_i c_i\ln R_i$.

::: definition Stage mass ratios {#def-stage}
For stage $i$, let $m_{0i}$ be the mass at its ignition (stage plus everything above it), $m_{pi}$ its propellant, $m_{si}$ its structure, and $m_{L i} = m_{0,i+1}$ the mass above it. Then the **structural coefficient** is $\varepsilon_i = m_{si}/(m_{si} + m_{pi})$, the **payload ratio** is $\pi_i = m_{Li}/m_{0i}$, and the **mass ratio** is $R_i = m_{0i}/(m_{0i} - m_{pi})$. The three are linked by
$$
\pi_i = \frac{1/R_i - \varepsilon_i}{1 - \varepsilon_i},
$$
and the vehicle's overall payload fraction is $m_L/m_0 = \prod_i \pi_i$.
:::

(The relation follows exactly as in example [[#ex-ssto]], applied to one stage.)

::: proposition Optimal staging with identical stage technology {#prop-staging}
If all $N$ stages have the same effective exhaust velocity $c$ and the same structural coefficient $\varepsilon$, then for a required total $\Delta v$ the overall payload fraction is greatest when all stages have the same mass ratio, $R_i = e^{\Delta v/(Nc)}$, and then
$$
\frac{m_L}{m_0} = \left(\frac{e^{-\Delta v/(Nc)} - \varepsilon}{1 - \varepsilon}\right)^{N} .
$$ {#eq-staging}
:::

::: proof
Write $x_i = \ln R_i$; the constraint is $\sum x_i = \Delta v/c$, and we must maximise $\ln(m_L/m_0) = \sum_i \ln\pi_i = \sum_i g(x_i) - N\ln(1 - \varepsilon)$ with $g(x) = \ln(e^{-x} - \varepsilon)$ (defined for $e^{-x} > \varepsilon$, i.e. every stage carrying a positive payload). Its derivatives are
$$
g'(x) = -\frac{e^{-x}}{e^{-x} - \varepsilon} = -\frac{1}{1 - \varepsilon e^{x}},\qquad
g''(x) = -\frac{\varepsilon e^{x}}{(1 - \varepsilon e^{x})^2} < 0,
$$
so $g$ is strictly concave. By Jensen's inequality, $\frac1N\sum g(x_i) \le g\!\left(\frac1N\sum x_i\right)$, with equality only when all $x_i$ are equal. Hence the maximum is at $x_i = \Delta v/(Nc)$ for every stage, which gives [[#eq-staging]]. (A Lagrange-multiplier argument gives the same condition $g'(x_i) = $ constant.) Assumptions: identical $c$ and $\varepsilon$; $\varepsilon$ independent of stage size; losses included in $\Delta v$ and shared in proportion. With different stage technologies the optimum gives the stages unequal mass ratios — upper stages with high $I_{sp}$ take a larger share of the $\Delta v$.
:::

::: example One, two or three stages to orbit {#ex-staging}
Repeat example [[#ex-ssto]] ($\Delta v = 9.3\ \mathrm{km/s}$, $I_{sp} = 450\ \mathrm{s}$, $\varepsilon = 0.12$) with two and with three optimal stages.
::: solution
Two stages: $R_i = \sqrt{8.227} = 2.868$, $\pi_i = (0.3487 - 0.12)/0.88 = 0.2598$, and $m_L/m_0 = 0.2598^2 = 0.0675$.
Three stages: $R_i = 8.227^{1/3} = 2.019$, $\pi_i = (0.4953 - 0.12)/0.88 = 0.4265$, $m_L/m_0 = 0.4265^3 = 0.0776$.

**Check.** From one stage to two, the payload fraction grows from $0.18\,\%$ to $6.8\,\%$ — a factor of almost 40; the third stage adds only another 15 %, at the cost of another engine, separation system and failure mode. Real launchers therefore have two or three stages, often with strap-on boosters as a "stage zero". Each stage delivers $4.65\ \mathrm{km/s}$ in the two-stage case, about one exhaust velocity: a useful rule of thumb is that a stage should not be asked for much more than its own $c$.
:::
:::

::: widget plot
f: max(0, (exp(-x*1000/(I*9.80665)) - s)/(1 - s)); max(0, (exp(-x*1000/(2*I*9.80665)) - s)/(1 - s))^2; max(0, (exp(-x*1000/(3*I*9.80665)) - s)/(1 - s))^3
x: 0, 14
y: 0, 0.5
sliders: I=450:250:460:1; s=0.12:0.04:0.2:0.005
labels: N = 1; N = 2; N = 3
vlines: 9.3
caption: Payload fraction $m_L/m_0$ against required $\Delta v$ in km/s for one, two and three identical optimal stages [[#eq-staging]], with specific impulse $I$ (s) and structural coefficient $s = \varepsilon$. At the orbital line ($9.3\ \mathrm{km/s}$) compare the curves; then lower $I$ to $300\ \mathrm{s}$ and watch single-stage-to-orbit become impossible and even two stages struggle. A curve reaching zero means the stage cannot even lift its own structure to that $\Delta v$.
:::

::: quiz
A rocket stage's specific impulse is improved by 10 % while its structural coefficient is unchanged. For a fixed $\Delta v$, which statement is correct?
- [ ] The propellant mass falls by 10 %.
- [x] The required mass ratio falls, and the payload gain is largest when $\Delta v$ is large compared with $c$.
- [ ] The payload fraction rises by exactly 10 %.
- [ ] Nothing changes, because the mass ratio depends only on $\Delta v$.
::: solution
$R = e^{\Delta v/c}$, so raising $c$ by 10 % reduces $\ln R$ by about 9 %. Because the payload fraction depends on $e^{-\Delta v/c} - \varepsilon$, which is small when $\Delta v \gg c$, a modest change in $c$ can change the payload by a large factor in demanding missions (compare the curves in the staging figure as $I$ varies). The propellant mass does not scale linearly with $I_{sp}$.
:::
:::

## The rocket nozzle

The combustion chamber produces hot gas at high pressure $p_c$ and temperature $T_c$ and almost zero velocity; the convergent–divergent nozzle expands it to supersonic speed. The quasi-one-dimensional isentropic flow theory of [[propulsion/inlets-nozzles]] applies with the chamber as the stagnation state ($p_t = p_c$, $T_t = T_c$), the throat sonic, and the combustion products treated as a perfect gas with mean molar mass $\mathcal{M}$ (so $R = R_u/\mathcal{M}$, $R_u = 8314\ \mathrm{J/(kmol\,K)}$) and an effective $\gamma$, typically $1.15$–$1.25$.

::: definition Characteristic velocity and thrust coefficient {#def-cstar-cf}
With throat area $A_t$, the **characteristic velocity** and the **thrust coefficient** are
$$
c^* = \frac{p_c A_t}{\dot m},\qquad C_F = \frac{F}{p_c A_t},
\qquad\text{so that}\qquad c = C_F\,c^* .
$$
$c^*$ measures how much mass flow a chamber at a given pressure pushes through a given throat; it depends on the propellant and combustion quality, not on the nozzle's expansion. $C_F$ measures how effectively the nozzle turns chamber pressure into thrust; it depends on $\gamma$, the area ratio $\varepsilon = A_e/A_t$ and the ambient pressure, not on the chamber temperature.
:::

::: proposition Ideal $c^*$ and $C_F$ {#prop-cf}
For an ideal rocket — isentropic, one-dimensional flow of a perfect gas with constant $\gamma$, sonic throat, uniform axial exit flow — with $\Gamma = \sqrt{\gamma}\left(\frac{2}{\gamma+1}\right)^{\frac{\gamma+1}{2(\gamma-1)}}$:
$$
c^* = \frac{\sqrt{R T_c}}{\Gamma},
\qquad
C_F = \Gamma\sqrt{\frac{2\gamma}{\gamma-1}\left[1 - \left(\frac{p_e}{p_c}\right)^{\frac{\gamma-1}{\gamma}}\right]} + \left(\frac{p_e}{p_c} - \frac{p_a}{p_c}\right)\varepsilon ,
$$ {#eq-cf}
where $p_e/p_c$ is fixed by the area ratio through
$$
\varepsilon = \frac{A_e}{A_t} = \frac{\Gamma}{\left(p_e/p_c\right)^{1/\gamma}\sqrt{\dfrac{2\gamma}{\gamma-1}\left[1 - \left(p_e/p_c\right)^{(\gamma-1)/\gamma}\right]}} .
$$ {#eq-eps}
:::

::: proof
**Mass flow.** At the sonic throat the mass-flow parameter of [[propulsion/inlets-nozzles]] gives $\dot m = \sqrt{\gamma/R}\left(\frac{2}{\gamma+1}\right)^{\frac{\gamma+1}{2(\gamma-1)}} p_c A_t/\sqrt{T_c} = \Gamma\,p_c A_t/\sqrt{RT_c}$, so $c^* = p_cA_t/\dot m = \sqrt{RT_c}/\Gamma$.
**Exit velocity.** Energy conservation between the chamber and the exit, with the isentropic relation, gives
$$
V_e = \sqrt{\frac{2\gamma}{\gamma-1}RT_c\left[1 - \left(\frac{p_e}{p_c}\right)^{(\gamma-1)/\gamma}\right]} .
$$
**Thrust coefficient.** Divide [[#eq-rocket-thrust]] by $p_cA_t$: $C_F = \dot m V_e/(p_cA_t) + (p_e - p_a)A_e/(p_cA_t) = V_e/c^* + (p_e/p_c - p_a/p_c)\varepsilon$. Substituting $V_e$ and $c^*$ gives [[#eq-cf]] — the factor $\sqrt{RT_c}$ cancels, which is why $C_F$ does not depend on the chamber temperature.
**Area ratio.** Continuity between throat and exit: $\varepsilon = \rho_tV_t/(\rho_eV_e) = \dot m/(\rho_e V_e A_t)$. With $\rho_e = (p_e/RT_e)$, $T_e = T_c(p_e/p_c)^{(\gamma-1)/\gamma}$ and $\dot m/A_t = \Gamma p_c/\sqrt{RT_c}$, after simplification $\varepsilon = \Gamma\big/\left[(p_e/p_c)^{1/\gamma}\,V_e/\sqrt{RT_c}\right]$, which is [[#eq-eps]]. Assumptions: those of the ideal rocket listed above; in addition, chemical composition "frozen" or in equilibrium throughout the expansion so that one $\gamma$ and $\mathcal{M}$ describe it. Real nozzles lose a few per cent to divergence, boundary layers and chemical non-equilibrium.
:::

By [[propulsion/inlets-nozzles#prop-perfect-expansion]] — the gross thrust of a nozzle is greatest when $p_e = p_a$ — $C_F$ at a given ambient pressure peaks at the area ratio that gives perfect expansion. In vacuum $p_a = 0$ and $C_F$ keeps rising with $\varepsilon$, ever more slowly, to the limit $\Gamma\sqrt{2\gamma/(\gamma-1)}$ (2.25 for $\gamma = 1.2$); upper-stage nozzles are therefore made as large as mass and packaging allow.

::: warning One nozzle cannot be ideal at every altitude
A first-stage engine starts at sea level ($p_a = 101\ \mathrm{kPa}$) and finishes almost in vacuum. A nozzle with a small area ratio is right at lift-off but under-expanded and wasteful at altitude; one with a large area ratio is efficient in vacuum but strongly over-expanded at sea level, losing thrust through the negative pressure term and risking flow separation inside the nozzle, with large side loads. First stages compromise (sea-level area ratios of about 10–30); upper stages use 40–200 or more. Always state the ambient pressure with a specific impulse: the "same" engine may have $I_{sp}$ values 15–30 % apart at sea level and in vacuum.
:::

::: example Thrust coefficient at sea level and in vacuum {#ex-cf}
A chamber runs at $p_c = 7.0\ \mathrm{MPa}$, $T_c = 3500\ \mathrm{K}$, with combustion products of mean molar mass $22\ \mathrm{kg/kmol}$ and $\gamma = 1.20$. The throat area is $0.050\ \mathrm{m^2}$ and the nozzle area ratio is $40$. Find $c^*$, the mass flow, the exit pressure, and the thrust and specific impulse in vacuum and at sea level. What area ratio would be best at sea level?
::: solution
$R = 8314/22 = 377.9\ \mathrm{J/(kg\,K)}$, $\Gamma = \sqrt{1.2}\,(2/2.2)^{5.5} = 0.6485$.
$$
c^* = \frac{\sqrt{377.9 \times 3500}}{0.6485} = 1773\ \mathrm{m/s},\qquad
\dot m = \frac{p_cA_t}{c^*} = \frac{7.0\times10^{6} \times 0.050}{1773} = 197.4\ \mathrm{kg/s}.
$$
Solving [[#eq-eps]] for $\varepsilon = 40$ (numerically) gives $p_e/p_c = 2.087\times10^{-3}$, so $p_e = 14.6\ \mathrm{kPa}$. The momentum part of $C_F$ is $0.6485\sqrt{12\,[1 - (2.087\times10^{-3})^{1/6}]} = 1.801$ (so $V_e = 1.801 \times 1773 = 3194\ \mathrm{m/s}$), and
$$
C_{F,\text{vac}} = 1.801 + 2.087\times10^{-3} \times 40 = 1.884,\qquad
C_{F,\text{SL}} = 1.884 - \frac{101.3}{7000}\times 40 = 1.305 .
$$
Thrust: $F_{\text{vac}} = 1.884 \times 7.0\times10^{6} \times 0.050 = 659\ \mathrm{kN}$, $F_{\text{SL}} = 457\ \mathrm{kN}$. Specific impulse: $C_Fc^*/g_0 = 341\ \mathrm{s}$ in vacuum and $236\ \mathrm{s}$ at sea level.
For perfect expansion at sea level, $p_e/p_c = 101.3/7000 = 0.01448$, and [[#eq-eps]] gives $\varepsilon = 8.97$ with $C_F = 1.599$ and $I_{sp} = 289\ \mathrm{s}$.

**Check.** At sea level the vacuum-optimised nozzle loses 30 % of its thrust to the pressure term (and in practice would separate); the sea-level nozzle gives 22 % more sea-level thrust but only $1.599$ against $1.884$ in vacuum. Vacuum $C_F$ of about 1.9 is typical of large-area-ratio nozzles.
:::
:::

::: widget plot
f: sqrt(k)*(2/(k+1))^((k+1)/(2*(k-1)))*sqrt(2*k/(k-1)*(1 - 10^(-x*(k-1)/k))) + 10^(-x)*sqrt(k)*(2/(k+1))^((k+1)/(2*(k-1)))/(10^(-x/k)*sqrt(2*k/(k-1)*(1 - 10^(-x*(k-1)/k)))); sqrt(k)*(2/(k+1))^((k+1)/(2*(k-1)))*sqrt(2*k/(k-1)*(1 - 10^(-x*(k-1)/k))) + (10^(-x) - 1/P)*sqrt(k)*(2/(k+1))^((k+1)/(2*(k-1)))/(10^(-x/k)*sqrt(2*k/(k-1)*(1 - 10^(-x*(k-1)/k))))
x: 0.3, 4
y: 0, 2.4
sliders: k=1.2:1.1:1.4:0.01; P=69:10:300:1
labels: C_F\ \text{vacuum}; C_F\ \text{at}\ p_a = p_c/P
points: 2.68, 1.884; 2.68, 1.305
caption: Ideal thrust coefficient against the nozzle expansion, given as $\log_{10}(p_c/p_e)$, in vacuum (upper curve) and at an ambient pressure $p_a = p_c/P$ (lower curve), for $k = \gamma$. The marked points are example [[#ex-cf]] ($\varepsilon = 40$, $P = 69$). The lower curve peaks exactly where $p_e = p_a$, i.e. at $\log_{10}P$ — move $P$ and watch the peak follow. Beyond it the nozzle is over-expanded and $C_F$ falls; the vacuum curve keeps rising.
:::

## Nozzle shapes and real-nozzle losses

The ideal theory assumes a uniform, axial exit flow. A **conical** nozzle of half-angle $\alpha$ discharges flow that diverges from the axis, and the axial momentum is reduced by the factor $\lambda = (1 + \cos\alpha)/2$ — about $0.983$ for the classic $15°$ cone. **Bell** (contoured) nozzles, designed with the method of characteristics or the approximate parabolic contours introduced by Rao, turn the flow back towards the axis and reach similar or better efficiency in 70–80 % of the length of a $15°$ cone, saving mass. Other losses come from the boundary layer, from chemical recombination lagging behind the expansion (kinetic losses) and, in solid motors, from condensed particles that cannot keep up with the gas. Real engines reach $c^*$ efficiencies of 0.95–0.99 and $C_F$ efficiencies of 0.96–0.99 (Sutton and Biblarz). **Altitude-compensating** concepts — extendible nozzle skirts, dual-bell nozzles, aerospikes — aim to adapt the effective area ratio during ascent; only the extendible skirt is in common use on upper stages.

::: example Choosing a nozzle for an upper stage {#ex-upper-stage}
An upper-stage engine operates only in vacuum with $\gamma = 1.2$. Its designers compare area ratios of 40 and 120. Using the ideal theory, by how much does the larger nozzle raise $C_F$, and is it worth it if the larger nozzle adds $100\ \mathrm{kg}$ to a stage with $c^* = 1773\ \mathrm{m/s}$, final mass $5000\ \mathrm{kg}$ and propellant $20\,000\ \mathrm{kg}$?
::: solution
From [[#eq-eps]]: $\varepsilon = 40$ gives $C_{F,\text{vac}} = 1.884$; $\varepsilon = 120$ gives $p_e/p_c = 5.23\times10^{-4}$ and $C_{F,\text{vac}} = 1.964$, a $4.2\,\%$ gain. Effective exhaust velocities: $3342$ and $3483\ \mathrm{m/s}$.
Stage $\Delta v$: with the small nozzle, $3342\ln(25\,000/5000) = 5378\ \mathrm{m/s}$; with the large one the final mass is $5100\ \mathrm{kg}$ and $\Delta v = 3483\ln(25\,100/5100) = 5545\ \mathrm{m/s}$.

**Check.** The heavier, larger nozzle still gains $167\ \mathrm{m/s}$, so in vacuum it pays — the reason upper-stage nozzles are huge. On a first stage the same nozzle would be over-expanded at lift-off and the comparison would reverse.
:::
:::

::: history
Konstantin Tsiolkovsky published the rocket equation in 1903 in his paper on exploring space with reaction devices (William Moore had derived the motion of a rocket of varying mass in Britain as early as 1813, and the equation was found independently by others). Robert Goddard, who had studied the efficiency of rockets with de Laval nozzles, launched the first liquid-propellant rocket on 16 March 1926 at Auburn, Massachusetts, and Hermann Oberth's *Die Rakete zu den Planetenräumen* (1923) set out staging and the theory of space flight. The theory of the thrust coefficient and characteristic velocity was systematised in the 1940s and 1950s in the rocket programmes of several countries and is the framework of George Sutton's *Rocket Propulsion Elements*, first published in 1949. Staging made orbital flight possible: Sputnik 1 was placed in orbit on 4 October 1957 by an R-7 launcher — a core stage surrounded by four strap-on boosters that were dropped when empty.
:::

::: summary
- Rocket thrust $F = \dot m V_e + (p_e - p_a)A_e = \dot m c$ is independent of flight speed; $I_{sp} = c/g_0$, stated with its chamber pressure, area ratio and ambient pressure.
- The rocket equation $\Delta v = c\ln(m_0/m_f)$ makes propellant mass grow exponentially with $\Delta v/c$.
- Gravity loss $\int g\sin\theta\,\mathrm{d}t$ favours high lift-off thrust and early pitch-over; orbital launch needs $9$–$10\ \mathrm{km/s}$ in total.
- Staging discards structure; with identical stage technology the optimum is equal stage mass ratios, $m_L/m_0 = \left[(e^{-\Delta v/Nc} - \varepsilon)/(1-\varepsilon)\right]^N$. Two or three stages capture most of the benefit.
- $c = C_Fc^*$: the chamber sets $c^* = \sqrt{RT_c}/\Gamma$ (high temperature, low molar mass); the nozzle sets $C_F$ through $\gamma$, $\varepsilon$ and $p_a/p_c$.
- $C_F$ at a given ambient pressure is greatest at perfect expansion; in vacuum it rises with area ratio towards $\Gamma\sqrt{2\gamma/(\gamma-1)}$.
:::

## Exercises

::: exercise {#exr-dv-basic level=1 check="3351"}
A stage with $I_{sp} = 311\ \mathrm{s}$ has a mass ratio of 3. Find its ideal velocity increment. (Enter $\Delta v$ in m/s, rounded to the nearest whole number.)
::: solution
$\Delta v = 311 \times 9.80665 \times \ln 3 = 3351\ \mathrm{m/s}$.
:::
:::

::: exercise {#exr-mass-ratio level=1 check="2.77"}
What mass ratio is needed for $\Delta v = 3.2\ \mathrm{km/s}$ with $I_{sp} = 320\ \mathrm{s}$? (Enter $R$ rounded to three significant figures.)
::: solution
$R = \exp\left(3200/(320 \times 9.80665)\right) = e^{1.0197} = 2.77$. So $1 - 1/2.77 = 64\,\%$ of the initial mass is propellant.
:::
:::

::: exercise {#exr-mdot level=1 check="340"}
An engine produces $1.00\ \mathrm{MN}$ with $I_{sp} = 300\ \mathrm{s}$. What is the propellant mass flow? (Enter $\dot m$ in kg/s, rounded to the nearest whole number.)
::: solution
$\dot m = F/(I_{sp}g_0) = 10^{6}/(300 \times 9.80665) = 340\ \mathrm{kg/s}$.
:::
:::

::: exercise {#exr-gamma-cf level=2 check="2.25"}
Find the limiting vacuum thrust coefficient of an infinitely large nozzle for $\gamma = 1.2$. (Enter the value rounded to three significant figures.)
::: solution
As $\varepsilon \to \infty$, $p_e/p_c \to 0$ and the pressure term vanishes: $C_F \to \Gamma\sqrt{2\gamma/(\gamma-1)} = 0.6485 \times \sqrt{12} = 2.25$. Real vacuum nozzles reach 1.9–2.0, because the last part of the expansion yields little thrust for a great deal of nozzle.
:::
:::

::: exercise {#exr-cstar level=2 check="1773"}
Show that $c^*$ depends only on the combustion gas properties, and compute it for $T_c = 3500\ \mathrm{K}$, $\mathcal{M} = 22\ \mathrm{kg/kmol}$, $\gamma = 1.2$. By what factor does $c^*$ change if $\mathcal{M}$ is halved at the same temperature? (Enter $c^*$ in m/s, rounded to the nearest whole number.)
::: solution
$c^* = \sqrt{RT_c}/\Gamma$ with $R = R_u/\mathcal{M}$: no nozzle quantity appears. $c^* = \sqrt{377.9 \times 3500}/0.6485 = 1773\ \mathrm{m/s}$. Halving $\mathcal{M}$ doubles $R$ and multiplies $c^*$ by $\sqrt2$. This is why hydrogen-rich exhausts (low molar mass) give the highest chemical specific impulses even at lower flame temperatures.
:::
:::

::: exercise {#exr-two-stage level=2 check="4650"}
A two-stage vehicle with identical stage technology ($I_{sp} = 450\ \mathrm{s}$, $\varepsilon = 0.12$) must deliver $9.3\ \mathrm{km/s}$. What velocity increment does each stage provide in the optimal design? (Enter the stage $\Delta v$ in m/s.)
::: solution
By [[#prop-staging]], the stages have equal mass ratios and equal exhaust velocities, so each provides half: $4650\ \mathrm{m/s}$. Each has $R = e^{4650/4413} = 2.868$.
:::
:::

::: exercise {#exr-burn-time level=3 check="736"}
For the sounding rocket of example [[#ex-gravity-loss]] ($I_{sp} = 300\ \mathrm{s}$, $R = 4$, vertical, no drag, constant $g = 9.81\ \mathrm{m/s^2}$), what burn time halves the gravity loss of the $150\ \mathrm{s}$ burn, and what is the corresponding lift-off thrust-to-weight ratio if the propellant flow is constant? (Enter the gravity loss of the shorter burn in m/s, rounded to the nearest whole number.)
::: solution
Halving the gravity loss needs $t_b = 75\ \mathrm{s}$; the loss is $9.81 \times 75 = 736\ \mathrm{m/s}$. With constant flow, $\dot m = m_p/t_b = 0.75m_0/75 = 0.01m_0\ \mathrm{s^{-1}}$, so $F = \dot m c = 0.01m_0 \times 2942 = 29.4m_0$ newtons and $F/(m_0g) = 3.0$. (For the $150\ \mathrm{s}$ burn it is 1.5.) Burnout velocity rises from $2607$ to $3342\ \mathrm{m/s}$.
:::
:::

::: exercise {#exr-staging-derive level=3}
Derive the payload-ratio relation $\pi = (1/R - \varepsilon)/(1 - \varepsilon)$ of [[#def-stage]], and use [[#eq-staging]] to find the largest $\Delta v$ that $N$ identical stages can deliver with zero payload. Evaluate it for $N = 1$, $2$ and $3$ with $I_{sp} = 300\ \mathrm{s}$ and $\varepsilon = 0.1$.
::: solution
With $m_0 = m_L + m_s + m_p$ and $m_s = \varepsilon(m_s + m_p) = \varepsilon(m_0 - m_L)$, the burnout mass is $m_0/R = m_L + \varepsilon(m_0 - m_L)$. Divide by $m_0$: $1/R = \pi + \varepsilon(1 - \pi)$, so $\pi = (1/R - \varepsilon)/(1 - \varepsilon)$.
Zero payload means each $\pi_i = 0$: $e^{-\Delta v/(Nc)} = \varepsilon$, so $\Delta v_{\max} = Nc\ln(1/\varepsilon)$. With $c = 2942\ \mathrm{m/s}$ and $\ln 10 = 2.303$: $6.77$, $13.5$ and $20.3\ \mathrm{km/s}$. Staging raises the ceiling in proportion to the number of stages — but payload at useful $\Delta v$ is what matters, and that is far below the ceiling.
:::
:::

::: exercise {#exr-ssto-design level=3}
**Design discussion.** Proponents of single-stage-to-orbit vehicles argue that full reusability outweighs the payload penalty. Using [[#eq-staging]] and the sensitivity seen in example [[#ex-ssto]], explain why a single stage's payload is so sensitive to $\varepsilon$ and $I_{sp}$, why partially reusable two-stage vehicles have been the approach that has flown, and what technology changes would be needed to make a single stage practical.
::: solution
For one stage, $m_L/m_0 = (e^{-\Delta v/c} - \varepsilon)/(1 - \varepsilon)$, the small difference of two numbers of similar size ($0.12$ and $0.12$ in the example). A 1 % change in $I_{sp}$ changes $e^{-\Delta v/c}$ by about $2\,\%$ of itself, i.e. by $0.0025$ — larger than the whole payload fraction. Margins for reusability (heat shield, landing propellant, landing gear) all add to $\varepsilon$. Two stages make each term comfortably positive (each stage needs $e^{-\Delta v/2c} \approx 0.35 \gg \varepsilon$), so the design tolerates realistic growth in mass; reusing the first stage (by propulsive landing) and accepting an expendable or separately recovered upper stage keeps most of the economic benefit. A practical single stage would need a much lower structural coefficient (lighter tank materials and structures), higher average $I_{sp}$ (for example air-breathing during the early ascent, or altitude-compensating nozzles), and lower losses — and even then would carry a small payload with little margin. Any quantitative claim should be checked against detailed mass estimates.
:::
:::
