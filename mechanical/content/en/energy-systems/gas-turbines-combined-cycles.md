A large gas turbine is an air pump with a fire in the middle. The compressor at the front draws in some $600\ \mathrm{kg}$ of air every second and squeezes it to about twenty atmospheres; natural gas is burned in that air at constant pressure until the gas is hotter than the melting point of the blades it is about to meet; and the turbine behind extracts enough work from the expansion to drive the compressor *and* a generator of a few hundred megawatts. What comes out of the back is still a gale of gas at $550$–$650\ \mathrm{^\circ C}$, carrying more than half of the fuel's energy. A simple-cycle gas turbine throws that away; a **combined cycle** passes it through a heat-recovery steam generator and a steam turbine, and so turns roughly $60\ \%$ of the fuel's heating value into electricity — the best figure of any large thermal power plant. If, instead, the exhaust heat is sold as process steam or district heat, the same machine becomes a **combined heat and power** (cogeneration) plant that uses $80\ \%$ or more of its fuel.

This chapter turns the ideal Brayton cycle of [[thermodynamics/power-cycles]] into the analysis of real machines. We first add component efficiencies and find that the pressure ratio now has *two* different optima, one for specific work and one for efficiency. We then see why a gas turbine loses power on a hot day and how inlet cooling buys it back, why the turbine inlet temperature is limited by blade cooling rather than by fuel, and how a heat-recovery steam generator is sized from its pinch point. Finally we derive the combined-cycle efficiency formula and the measures by which cogeneration is judged. The aero-engine version of the same cycle is in [[propulsion/gas-turbine-cycles]]; the steam side is treated in full in [[energy-systems/steam-power-plants]].

Throughout, the first law is written with the in/out convention of Çengel & Boles: $\dot W_\mathrm{net} = \dot W_t - \dot W_c$ is the net shaft power delivered, and every heat and work symbol is a positive magnitude. Temperatures in formulas are in kelvin.

## The gas turbine as a power plant {#sec-gt-plant}

Two families of machine share the market. **Heavy-duty (industrial) gas turbines** are built for power stations: single-shaft, running at the grid frequency (3000 rpm for 50 Hz, 3600 rpm for 60 Hz) and directly coupled to the generator, with massive casings and outputs from tens of megawatts up to more than $500\ \mathrm{MW}$ for the largest units. **Aeroderivative gas turbines** are adapted from aircraft engines: light, quick to start, with higher pressure ratios and outputs of a few to about $100\ \mathrm{MW}$, used for peaking, offshore platforms and pipeline compression. Both are rated at the **ISO reference conditions** of $15\ \mathrm{^\circ C}$, $101.325\ \mathrm{kPa}$ and $60\ \%$ relative humidity, and both lose output when the air is hot or thin — a point we shall make quantitative.

::: definition Thermal efficiency, heat rate and specific work {#def-heat-rate}
For a plant burning fuel at mass rate $\dot m_f$ with lower heating value $\mathrm{LHV}$ and delivering net electrical power $\dot W_e$:

- the **thermal efficiency** is $\eta = \dot W_e / (\dot m_f\,\mathrm{LHV})$;
- the **heat rate** is the fuel energy needed per unit of electricity,
$$
\mathrm{HR} = \frac{\dot m_f\,\mathrm{LHV}}{\dot W_e} = \frac{3600\ \mathrm{kJ/kWh}}{\eta},
$$ {#eq-heat-rate}
  because $1\ \mathrm{kWh} = 3600\ \mathrm{kJ}$; a lower heat rate is a better plant;
- the **specific work** is the net work per unit mass of air drawn in, $w_\mathrm{net} = \dot W_\mathrm{net}/\dot m_a$, in $\mathrm{kJ/kg}$. It sets the *size* of the machine: for a given power, a higher $w_\mathrm{net}$ means a smaller air flow and a smaller, cheaper turbine.
:::

Gas-turbine efficiencies and heat rates are conventionally quoted on the **lower** heating value, because the water vapour in the exhaust is never condensed. United States utility statistics often quote heat rates in $\mathrm{Btu/kWh}$ on the **higher** heating value ($3412\ \mathrm{Btu/kWh}$ corresponds to $\eta = 1$). For natural gas the HHV is about $11\ \%$ larger than the LHV, so the same plant appears roughly four to six percentage points less efficient on an HHV basis. Always ask which basis a number uses.

## The real Brayton cycle {#sec-real-brayton}

In the ideal cycle the efficiency $1 - r_p^{-(k-1)/k}$ depends only on the pressure ratio $r_p$ and keeps rising with it. Real compressors and turbines destroy that simple picture, because the compressor work is large — about half of the turbine work — and every inefficiency in the compressor is paid for twice: once as extra work input, and again as a hotter compressor delivery that leaves less room for fuel.

We use the **cold-air standard** for the derivations: air is an ideal gas with constant $c_p = 1.005\ \mathrm{kJ/(kg\,K)}$ and $k = 1.4$, the mass of fuel is neglected, and pressure losses in the combustor and ducts are ignored. Introduce the temperature ratio and the isentropic temperature ratio of compression,
$$
\tau = \frac{T_3}{T_1}, \qquad x = r_p^{(k-1)/k},
$$
where $T_1$ is the compressor inlet temperature and $T_3$ the turbine inlet temperature. The compressor has isentropic efficiency $\eta_c$ and the turbine $\eta_t$.

::: proposition Specific work and efficiency of the real simple cycle {#prop-real-brayton}
Under the cold-air standard with component isentropic efficiencies $\eta_c$ and $\eta_t$,
$$
w_\mathrm{net} = c_p T_1 \left[ \tau\,\eta_t \left(1 - \frac{1}{x}\right) - \frac{x - 1}{\eta_c} \right],
$$ {#eq-wnet-real}
$$
\eta = \frac{\tau\,\eta_t \left(1 - 1/x\right) - (x - 1)/\eta_c}{\tau - 1 - (x - 1)/\eta_c}.
$$ {#eq-eta-real}
With $\eta_c = \eta_t = 1$ the efficiency reduces to the ideal $1 - 1/x$.
:::

::: proof
Steady flow through each component, with negligible changes in kinetic and potential energy. Isentropic compression from $T_1$ by the pressure ratio $r_p$ ends at $T_{2s} = T_1 x$. The definition $\eta_c = (h_{2s} - h_1)/(h_2 - h_1)$ with constant $c_p$ gives
$$
T_2 = T_1 + \frac{T_1 (x - 1)}{\eta_c}, \qquad w_c = c_p (T_2 - T_1) = c_p T_1 \frac{x - 1}{\eta_c}.
$$
With no pressure losses the turbine expands through the same ratio, so $T_{4s} = T_3/x$ and $\eta_t = (h_3 - h_4)/(h_3 - h_{4s})$ gives
$$
w_t = c_p (T_3 - T_4) = \eta_t c_p T_3 \left(1 - \frac{1}{x}\right) = c_p T_1\,\tau\,\eta_t \left(1 - \frac{1}{x}\right).
$$
Subtracting gives [[#eq-wnet-real]]. The heat added in the combustor is $q_\mathrm{in} = c_p (T_3 - T_2) = c_p T_1 \left[\tau - 1 - (x - 1)/\eta_c\right]$, and $\eta = w_\mathrm{net}/q_\mathrm{in}$ is [[#eq-eta-real]]. Setting $\eta_c = \eta_t = 1$, the numerator becomes $\tau(1 - 1/x) - (x - 1) = (x - 1)(\tau/x - 1)$ and the denominator $\tau - x = x(\tau/x - 1)$, whose ratio is $(x - 1)/x = 1 - 1/x$.
:::

The two pieces of [[#eq-wnet-real]] pull in opposite directions as $x$ grows: the turbine term rises towards $\tau\eta_t$ and saturates, while the compressor term grows linearly without limit. The net work therefore has a maximum, and beyond a certain pressure ratio the turbine cannot even drive its own compressor.

::: proposition The two optimum pressure ratios {#prop-optimum-ratio}
Under the assumptions of [[#prop-real-brayton]]:

1. The specific work is greatest when
$$
x_w = \sqrt{\eta_c\,\eta_t\,\tau}, \qquad r_{p,w} = \left(\eta_c \eta_t \tau\right)^{k/[2(k-1)]}.
$$ {#eq-xopt-work}
2. The efficiency is greatest at the root $x_\eta > 1$ of
$$
b(a - c)\,x^2 - 2ab\,x + a(b + c) = 0, \qquad a = \tau\eta_t,\ \ b = \frac{1}{\eta_c},\ \ c = \tau - 1,
$$ {#eq-xopt-eta}
namely $x_\eta = \dfrac{ab - \sqrt{a^2b^2 - ab(a - c)(b + c)}}{b(a - c)}$, which always lies above $x_w$ for realistic component efficiencies.
:::

::: proof
(1) Differentiate [[#eq-wnet-real]] with respect to $x$: $\mathrm{d}w_\mathrm{net}/\mathrm{d}x = c_p T_1 \left[\tau\eta_t / x^2 - 1/\eta_c\right]$, which is zero at $x^2 = \eta_c\eta_t\tau$; the second derivative $-2c_pT_1\tau\eta_t/x^3$ is negative, so this is a maximum. Converting with $r_p = x^{k/(k-1)}$ gives [[#eq-xopt-work]]. For the ideal cycle this is the familiar $r_{p,w} = \tau^{k/[2(k-1)]}$, at which $T_2 = T_4$.

(2) Write $\eta = N/D$ with $N = a(1 - 1/x) - b(x - 1)$ and $D = c - b(x - 1)$, so that $N' = a/x^2 - b$ and $D' = -b$. The condition $\eta' = 0$ is $N'D = ND'$:
$$
\left(\frac{a}{x^2} - b\right)\bigl(c - b(x - 1)\bigr) + b\left(a - \frac{a}{x} - b(x - 1)\right) = 0.
$$
The terms $\pm b^2(x - 1)$ cancel; multiplying the rest by $x^2$ and collecting powers of $x$ gives $(ab - bc)x^2 - 2ab\,x + (ac + ab) = 0$, which is [[#eq-xopt-eta]]. Of the two roots, the larger lies beyond the point where $D = 0$ (the compressor delivery already hotter than $T_3$) and is not physical; the smaller is the maximum. That $x_\eta > x_w$ follows because at $x_w$ the work is stationary, $\mathrm{d}w/\mathrm{d}x = 0$, while $q_\mathrm{in}$ is still falling with $x$, so $\mathrm{d}\eta/\mathrm{d}x = -w\,\mathrm{d}q_\mathrm{in}/\mathrm{d}x / q_\mathrm{in}^2 > 0$ there: the efficiency is still rising when the work peaks.
:::

The engineering consequence is that a designer must choose. A pressure ratio near $r_{p,w}$ gives the most power per kilogram of air — a small machine; a pressure ratio near $r_{p,\eta}$ gives the least fuel per kilowatt-hour. Between the two the efficiency curve is very flat, so heavy-duty machines intended for combined cycles sit nearer the work optimum (a hotter exhaust also suits the steam cycle), while aeroderivatives, which must be efficient on their own, use higher ratios.

::: example A real simple cycle at $T_3 = 1600\ \mathrm{K}$ {#ex-real-cycle}
A gas turbine draws air at $T_1 = 288\ \mathrm{K}$ and has a turbine inlet temperature $T_3 = 1600\ \mathrm{K}$, a pressure ratio of $20$, $\eta_c = 0.88$ and $\eta_t = 0.90$. Using the cold-air standard, find the specific work, the efficiency and the back-work ratio, compare them with the ideal cycle, and find both optimum pressure ratios.
::: solution
**Ratios.** $\tau = 1600/288 = 5.556$ and $x = 20^{0.4/1.4} = 20^{0.2857} = 2.3535$.

**Temperatures.**
$$
T_2 = 288 + \frac{288 \times 1.3535}{0.88} = 731.0\ \mathrm{K}, \qquad T_4 = 1600\left[1 - 0.90\left(1 - \frac{1}{2.3535}\right)\right] = 771.8\ \mathrm{K}.
$$
**Work and heat.**
$$
w_c = 1.005 \times (731.0 - 288) = 445.2\ \mathrm{kJ/kg}, \qquad w_t = 1.005 \times (1600 - 771.8) = 832.3\ \mathrm{kJ/kg},
$$
$$
w_\mathrm{net} = 387.1\ \mathrm{kJ/kg}, \qquad q_\mathrm{in} = 1.005 \times (1600 - 731.0) = 873.4\ \mathrm{kJ/kg}, \qquad \eta = \frac{387.1}{873.4} = 0.443.
$$
The back-work ratio is $w_c/w_t = 445.2/832.3 = 0.535$: more than half of the turbine's work goes back into the compressor.

**Ideal comparison.** The ideal cycle at the same $r_p$ has $\eta = 1 - 1/2.3535 = 0.575$ and $w_\mathrm{net} = 533.0\ \mathrm{kJ/kg}$. Component losses of $10$–$12\ \%$ cost $13$ percentage points of efficiency and $27\ \%$ of the work, because they act on the large gross works, not on the small net work.

**Optima.** From [[#eq-xopt-work]], $x_w = \sqrt{0.88 \times 0.90 \times 5.556} = 2.098$, so $r_{p,w} = 2.098^{3.5} = 13.4$ with $w_\mathrm{max} = 396.3\ \mathrm{kJ/kg}$ and $\eta = 0.414$ there. For [[#eq-xopt-eta]], $a = 5.000$, $b = 1.1364$, $c = 4.556$, and the quadratic $0.5051x^2 - 11.364x + 28.46 = 0$ has the physical root $x_\eta = 2.871$, i.e. $r_{p,\eta} = 40.1$, where $\eta = 0.466$ and $w_\mathrm{net} = 327.8\ \mathrm{kJ/kg}$.

**Sanity check.** Going from $r_p = 20$ to $40$ gains only $2.3$ points of efficiency but loses $15\ \%$ of the specific work — the flatness of the efficiency curve in action. All efficiencies lie below the Carnot value $1 - 288/1600 = 0.82$.
:::
:::

::: widget plot
f: (T*nt*(1-x^(-2/7)) - 288*(x^(2/7)-1)/nc)/(T - 288 - 288*(x^(2/7)-1)/nc); 1.005*(T*nt*(1-x^(-2/7)) - 288*(x^(2/7)-1)/nc)/1000; 1 - x^(-2/7)
x: 1, 60
y: -0.1, 0.8
sliders: T=1600:1000:1900:10; nc=0.88:0.7:1:0.01; nt=0.9:0.7:1:0.01
labels: \eta \text{ (real)}; w_\mathrm{net}\ \text{in MJ/kg}; \eta \text{ (ideal)}
caption: Efficiency and specific work of the simple cycle against pressure ratio $r_p$ (horizontal axis), cold-air standard with $T_1 = 288\ \mathrm{K}$; the slider $T$ is the turbine inlet temperature in kelvin and $n_c$, $n_t$ are the compressor and turbine isentropic efficiencies. With both efficiencies at $1$ the real curve coincides with the ideal one. Lower them to $0.88$ and $0.90$ and watch the efficiency curve bend over: it now has a maximum, at a higher pressure ratio than the peak of the work curve. Lower $T$ and both optima move to smaller $r_p$ while the curves sink — a cool turbine cannot use a high pressure ratio.
:::

The cold-air standard flatters the turbine at $1600\ \mathrm{K}$, where the combustion gas has $c_p \approx 1.15\ \mathrm{kJ/(kg\,K)}$ and $k \approx 1.33$. A better hand model uses separate properties for air and combustion gas and keeps track of the fuel mass.

::: example A heavy-duty gas turbine at ISO conditions {#ex-heavy-duty}
A heavy-duty gas turbine draws $\dot m_a = 600\ \mathrm{kg/s}$ of air at $T_1 = 288.15\ \mathrm{K}$, $p_1 = 101.325\ \mathrm{kPa}$. Pressure ratio $20$; $\eta_c = 0.88$, $\eta_t = 0.90$; turbine inlet temperature $1600\ \mathrm{K}$; the combustor loses $4\ \%$ of its inlet pressure; generator efficiency $0.985$. Model the air with $c_{pa} = 1.005\ \mathrm{kJ/(kg\,K)}$, $k_a = 1.4$ and the combustion gas with $c_{pg} = 1.15\ \mathrm{kJ/(kg\,K)}$, $k_g = 1.333$; the fuel is natural gas with $\mathrm{LHV} = 50\ \mathrm{MJ/kg}$. Find the fuel flow, the electrical output, the efficiency, the heat rate and the exhaust state.
::: solution
**Compressor.** $T_{2s} = 288.15 \times 20^{0.2857} = 678.2\ \mathrm{K}$, $T_2 = 288.15 + 390.0/0.88 = 731.4\ \mathrm{K}$, so
$$
\dot W_c = 600 \times 1.005 \times (731.4 - 288.15) = 267.3\ \mathrm{MW}.
$$
**Combustor.** Take the enthalpy datum at $T_1$ (where the LHV is defined, near $25\ \mathrm{^\circ C}$; the difference is negligible here). The energy balance $\dot m_f\,\mathrm{LHV} + \dot m_a c_{pa}(T_2 - T_1) = (\dot m_a + \dot m_f) c_{pg} (T_3 - T_1)$ gives
$$
\dot m_f = \frac{\dot m_a\left[c_{pg}(T_3 - T_1) - c_{pa}(T_2 - T_1)\right]}{\mathrm{LHV} - c_{pg}(T_3 - T_1)} = \frac{600\,(1.15 \times 1311.85 - 445.5)}{50\,000 - 1508.6} = 13.16\ \mathrm{kg/s},
$$
a fuel–air ratio of $0.0219$ — about $37\ \%$ of stoichiometric for methane, the rest of the air being needed to keep $T_3$ down.

**Turbine.** Pressure ratio $20 \times 0.96 = 19.2$; $T_{4s} = 1600/19.2^{0.333/1.333} = 764.8\ \mathrm{K}$; $T_4 = 1600 - 0.90 \times 835.2 = 848.3\ \mathrm{K}$ ($575.2\ \mathrm{^\circ C}$).
$$
\dot W_t = 613.16 \times 1.15 \times (1600 - 848.3) = 530.1\ \mathrm{MW}.
$$
**Output and efficiency.** Shaft power $530.1 - 267.3 = 262.8\ \mathrm{MW}$; electrical $\dot W_e = 0.985 \times 262.8 = 258.9\ \mathrm{MW}$. Fuel power $13.16 \times 50 = 657.8\ \mathrm{MW}$, so
$$
\eta = \frac{258.9}{657.8} = 0.394, \qquad \mathrm{HR} = \frac{3600}{0.3935} = 9148\ \mathrm{kJ/kWh}.
$$
**Exhaust.** $613.2\ \mathrm{kg/s}$ at $575\ \mathrm{^\circ C}$, carrying $613.16 \times 1.15 \times (848.3 - 288.15) = 395.0\ \mathrm{MW}$ above ambient — exactly fuel power minus shaft power, as the first law requires.

**Sanity check.** The result — about $260\ \mathrm{MW}$ at $39\ \%$ with a $575\ \mathrm{^\circ C}$ exhaust — is the right order for a modern heavy-duty frame (published ISO ratings of the large F- and H-class machines lie in the range of roughly $38$–$44\ \%$). The model is slightly pessimistic on efficiency because it has a single turbine inlet temperature and no explicit cooling flows; it is the input to the combined-cycle examples below.
:::
:::

## Ambient temperature and inlet cooling {#sec-ambient}

A gas turbine's compressor is, to a first approximation, a constant-*volume*-flow machine: at fixed shaft speed its blades move a fixed volume of air per second. On a hot day that volume weighs less, and the turbine — whose power is proportional to the mass flowing through it — produces less, while the compressor's work does not fall at all. This is why gas-turbine plants lose output exactly when air-conditioning demand is highest.

::: proposition Output against ambient temperature {#prop-ambient}
Suppose the compressor delivers a fixed volume flow $\dot V_1$ at inlet, the pressure ratio, the turbine inlet temperature and the component efficiencies are fixed, and the fuel mass is neglected. Then the compressor power is independent of the inlet temperature $T_1$, the turbine power is inversely proportional to $T_1$, and
$$
\dot W_\mathrm{net}(T_1) = \frac{A}{T_1} - B, \qquad \frac{1}{\dot W_\mathrm{net}}\frac{\mathrm{d}\dot W_\mathrm{net}}{\mathrm{d}T_1} = -\frac{1}{T_1\,(1 - \mathrm{bwr})},
$$ {#eq-ambient}
where $\mathrm{bwr} = \dot W_c/\dot W_t$ is the back-work ratio.
:::

::: proof
The ideal-gas mass flow is $\dot m = p_1 \dot V_1/(R T_1)$. The compressor power is $\dot W_c = \dot m\,c_p T_1 (x - 1)/\eta_c = p_1 \dot V_1 c_p (x - 1)/(R\,\eta_c)$, in which $T_1$ has cancelled: on a hot day there is less air, but each kilogram needs proportionally more work. The turbine power is $\dot W_t = \dot m\,c_p T_3 \eta_t (1 - 1/x) = A/T_1$ with $A = p_1\dot V_1 c_p T_3\eta_t(1 - 1/x)/R$ independent of $T_1$, since $T_3$ is fixed. Hence $\dot W_\mathrm{net} = A/T_1 - B$ with $B = \dot W_c$. Differentiating, $\mathrm{d}\dot W_\mathrm{net}/\mathrm{d}T_1 = -A/T_1^2 = -\dot W_t/T_1$, and dividing by $\dot W_\mathrm{net} = \dot W_t(1 - \mathrm{bwr})$ gives [[#eq-ambient]].
:::

With $\mathrm{bwr} \approx 0.5$ and $T_1 = 288\ \mathrm{K}$, [[#eq-ambient]] predicts a loss of $1/(288 \times 0.5) \approx 0.7\ \%$ of output per kelvin — the figure quoted by manufacturers' correction curves, which give between about $0.5$ and $0.9\ \%$ per kelvin depending on the machine and its control. The high back-work ratio is the amplifier: a machine with $\mathrm{bwr} = 0.5$ is twice as sensitive to ambient temperature as one in which the compressor took nothing.

The remedy is to cool the inlet air. An **evaporative cooler** (wetted media) or a **fogging** system sprays water into the inlet, where it evaporates and cools the air towards its wet-bulb temperature; the cooler's **effectiveness** is $\varepsilon_\mathrm{evap} = (T_\mathrm{db} - T_\mathrm{out})/(T_\mathrm{db} - T_\mathrm{wb})$, typically $0.85$–$0.95$ for media coolers. It is cheap and works best in hot, dry climates. **Inlet chilling** with a refrigeration plant ([[energy-systems/refrigeration-hvac]]) can cool below the wet-bulb temperature at the cost of the chiller's power and capital.

::: example A hot day, and an evaporative cooler {#ex-hot-day}
The machine of [[#ex-heavy-duty]] runs at $35\ \mathrm{^\circ C}$ and $30\ \%$ relative humidity at sea level. (a) Assuming the same inlet volume flow, find its output. (b) An evaporative cooler of effectiveness $0.90$ is installed; the wet-bulb temperature of the ambient air is $21.5\ \mathrm{^\circ C}$ (from a psychrometric chart, or CoolProp's humid-air model). Find the output with the cooler running.
::: solution
**(a)** The mass flow scales as $1/T_1$: $\dot m_a = 600 \times 288.15/308.15 = 561.1\ \mathrm{kg/s}$. Repeating [[#ex-heavy-duty]] with $T_1 = 308.15\ \mathrm{K}$: $T_2 = 782.1\ \mathrm{K}$, and the compressor power is again $267.3\ \mathrm{MW}$ (as [[#prop-ambient]] promised). The fuel flow falls to $11.67\ \mathrm{kg/s}$, the turbine (same $T_3$, same exit temperature $848.3\ \mathrm{K}$) gives $572.7 \times 1.15 \times 751.7 = 495.1\ \mathrm{MW}$, and
$$
\dot W_e = 0.985 \times (495.1 - 267.3) = 224.4\ \mathrm{MW},
$$
$13.3\ \%$ below the ISO rating, or $0.66\ \%$ per kelvin. The efficiency falls only from $39.4\ \%$ to $38.5\ \%$: the hot day is mainly a capacity problem.

**(b)** The cooler delivers $T_\mathrm{out} = 35 - 0.90 \times (35 - 21.5) = 22.85\ \mathrm{^\circ C}$, i.e. $296.0\ \mathrm{K}$. Then $\dot m_a = 600 \times 288.15/296.0 = 584.1\ \mathrm{kg/s}$, the turbine gives $515.8\ \mathrm{MW}$ and
$$
\dot W_e = 0.985 \times (515.8 - 267.3) = 244.8\ \mathrm{MW},
$$
a gain of $20.4\ \mathrm{MW}$ ($9.1\ \%$) over the uncooled hot day. Raising the humidity ratio from $0.0106$ to $0.0157$ evaporates about $3.0\ \mathrm{kg/s}$ of water, roughly $11\ \mathrm{m^3}$ an hour.

**Sanity check.** Linearising with [[#eq-ambient]] at the ISO point ($\mathrm{bwr} = 267.3/530.1 = 0.504$): $1/(288.15 \times 0.496) = 0.70\ \%$ per kelvin, against $0.66\ \%$ per kelvin from the exact model over $20\ \mathrm{K}$ — consistent, since the curve $A/T_1$ flattens as $T_1$ rises.
:::
:::

::: widget plot
f: 0.985*(530.05*288.15/(x+273.15) - 267.26); 0.985*(530.05*288.15/(x - E*W + 273.15) - 267.26)
x: -20, 45
y: 150, 360
sliders: E=0.9:0:1:0.05; W=13.5:0:20:0.5
labels: \text{no inlet cooling}; \text{evaporative cooler}
caption: Net electrical output in MW of the gas turbine of the examples against ambient dry-bulb temperature in $\mathrm{^\circ C}$, from the model of [[#prop-ambient]] (fixed volume flow, fixed $T_3$; the small change of fuel flow is ignored). $E$ is the cooler effectiveness and $W$ the wet-bulb depression $T_\mathrm{db} - T_\mathrm{wb}$ in kelvin. At $35\ \mathrm{^\circ C}$ with $W = 13.5\ \mathrm{K}$ the cooler recovers about $20\ \mathrm{MW}$; set $W$ to $3\ \mathrm{K}$ (a humid tropical day) and most of the benefit disappears. Note that real machines are limited at low ambient temperature by generator and shaft ratings, which this model ignores.
:::

::: warning Ambient corrections need kelvin and the right flow assumption
Two mistakes are common. First, scaling mass flow by $288/35$ instead of $288.15/308.15$: the ideal-gas density is inversely proportional to the *absolute* temperature, and using Celsius gives absurd results. Second, assuming that the compressor power scales with the mass flow, as the turbine's does. At fixed volume flow the compressor work per kilogram rises in proportion to $T_1$ exactly as the mass flow falls, so the compressor power stays constant — and the whole of the loss lands on the net output. Real machines also have variable inlet guide vanes and control schedules that modify the details, so site performance is always taken from the manufacturer's correction curves; the model explains their shape.
:::

## Turbine inlet temperature and blade cooling {#sec-cooling}

[[#ex-real-cycle]] showed that both the work and the efficiency rise with $\tau = T_3/T_1$. The turbine inlet temperature is therefore the most valuable number in gas-turbine design, and the history of the industry is largely a history of raising it. The limit is not the fuel — a stoichiometric methane flame would exceed $2200\ \mathrm{K}$ — but the first-stage nozzle vanes and rotor blades. Nickel-based single-crystal superalloys lose their strength above about $1000$–$1100\ \mathrm{^\circ C}$, far below the gas temperatures of modern machines. The blades survive only because they are **cooled**: air bled from the compressor flows through internal serpentine passages, impinges on the inside of the leading edge, and leaves through rows of small holes as a protective **film** over the outer surface, while a ceramic **thermal barrier coating** (typically yttria-stabilised zirconia) a few tenths of a millimetre thick adds a further temperature drop.

The term "turbine inlet temperature" is used loosely, and the differences matter by $100\ \mathrm{K}$ or more: the **combustor exit temperature**; the **rotor inlet** or **firing temperature**, after the gas has been diluted by the first-vane cooling air; and the **ISO 2314 reference temperature**, a fictitious mixed temperature computed as if all cooling air were mixed in before the turbine. Compare like with like. As a dated example of the state of the art, Mitsubishi Heavy Industries reported in its *Technical Review* that its M501J machine, in demonstration operation at Takasago from 2011, was the first to reach a turbine inlet temperature of $1600\ \mathrm{^\circ C}$; the H- and J-class machines of the main manufacturers operated around or above that level as of 2025.

::: definition Cooling effectiveness {#def-cooling-eff}
For a cooled blade with gas temperature $T_g$ (relative to the blade), coolant supply temperature $T_c$ and metal temperature $T_m$, the **overall cooling effectiveness** is
$$
\phi = \frac{T_g - T_m}{T_g - T_c}, \qquad 0 \le \phi < 1.
$$
$\phi = 0$ means an uncooled blade at gas temperature; $\phi \to 1$ would bring the metal down to the coolant temperature. Convective cooling alone reaches $\phi \approx 0.5$; film cooling and thermal barrier coatings together reach $0.6$–$0.7$.
:::

Cooling is not free. The coolant is compressed air that bypasses the combustor, so it has absorbed compressor work without being heated by fuel; it then mixes into the hot gas and lowers its temperature and pressure, and film cooling spoils the blade aerodynamics. In the most advanced machines a fifth or more of the compressor flow is used for cooling and sealing. The gain from a higher firing temperature is the net of a larger $\tau$ and a larger cooling penalty, and beyond a certain temperature the extra cooling air consumes the whole gain — the reason for the steady search for better alloys, coatings and, in some designs, closed-loop steam cooling, which returns the heat to the steam cycle.

::: example How hard must the first blade be cooled? {#ex-blade-cooling}
In the machine of [[#ex-heavy-duty]] the gas relative to the first rotor blade is at $1600\ \mathrm{^\circ C}$ and the coolant is compressor delivery air at $T_2 = 731.4\ \mathrm{K}$ ($458.3\ \mathrm{^\circ C}$). The blade alloy is limited to a metal temperature of $900\ \mathrm{^\circ C}$. (a) What cooling effectiveness is needed? (b) If the cooling air is first cooled to $250\ \mathrm{^\circ C}$ in an external cooler, what effectiveness is then needed?
::: solution
**(a)** Differences in kelvin equal differences in degrees Celsius:
$$
\phi = \frac{1600 - 900}{1600 - 458.3} = \frac{700}{1141.7} = 0.613.
$$
**(b)** With $T_c = 250\ \mathrm{^\circ C}$:
$$
\phi = \frac{700}{1600 - 250} = \frac{700}{1350} = 0.519.
$$
**Interpretation.** Requirement (a) needs film cooling and a thermal barrier coating; (b) is within reach of good convective cooling with modest film cooling, so less air is needed. The price is the heat removed from the cooling air, which must be returned to the cycle (for example in the HRSG) if it is not to be lost. **Sanity check:** $\phi$ falls when the coolant is colder, as it must, and both values lie in the range $0.5$–$0.7$ quoted for modern first-stage blades.
:::
:::

## The heat-recovery steam generator {#sec-hrsg}

The exhaust of [[#ex-heavy-duty]] carries $395\ \mathrm{MW}$ at $575\ \mathrm{^\circ C}$ — hot enough to raise good steam. A **heat-recovery steam generator** (HRSG) is a counterflow heat exchanger, usually unfired, in which the exhaust flows over banks of finned tubes: first the **superheater**, then the **evaporator** (connected to a steam drum, or once-through), then the **economiser**, which preheats feedwater towards saturation. The design difficulty lies in the shapes of the two temperature profiles on a temperature–heat-transferred (T–Q) diagram. The gas cools along a straight line (constant $\dot m_g c_{pg}$). The water rises along the economiser line, then stays flat at the saturation temperature while it evaporates, then rises again in the superheater. The flat evaporation step means the two lines come closest just where the gas leaves the evaporator: the **pinch point**.

::: definition Pinch point and approach temperature {#def-pinch}
In an HRSG section producing steam at saturation temperature $T_\mathrm{sat}$:

- the **pinch-point temperature difference** $\Delta T_\mathrm{pp} = T_{g,\mathrm{pp}} - T_\mathrm{sat}$ is the difference between the gas temperature leaving the evaporator and the saturation temperature, the smallest temperature difference in the exchanger;
- the **approach temperature** $\Delta T_\mathrm{ap} = T_\mathrm{sat} - T_{w,\mathrm{eco}}$ is the margin by which the water leaving the economiser stays below saturation, to prevent steaming in the economiser at part load.

Typical design values are $\Delta T_\mathrm{pp} = 5$–$15\ \mathrm{K}$ and $\Delta T_\mathrm{ap} = 3$–$10\ \mathrm{K}$. A smaller pinch recovers more heat but needs a much larger surface, since the area grows roughly like $1/\Delta T$ near the pinch ([[heat-transfer/heat-exchangers]]).
:::

::: algorithm Sizing a single-pressure HRSG from its pinch point {#alg-hrsg}
Given the exhaust flow $\dot m_g$, its mean specific heat $c_{pg}$ and inlet temperature $T_{g1}$; the steam pressure $p$ and superheat temperature $T_\mathrm{sh}$; the feedwater enthalpy $h_\mathrm{fw}$; and $\Delta T_\mathrm{pp}$ and $\Delta T_\mathrm{ap}$:

1. From steam tables find $T_\mathrm{sat}(p)$ and the enthalpies $h_\mathrm{sh} = h(p, T_\mathrm{sh})$ and $h_w = h(p, T_\mathrm{sat} - \Delta T_\mathrm{ap})$ of the water leaving the economiser.
2. Gas temperature at the pinch: $T_{g,\mathrm{pp}} = T_\mathrm{sat} + \Delta T_\mathrm{pp}$.
3. Steam flow from an energy balance on superheater plus evaporator (the part of the HRSG hotter than the pinch):
$$
\dot m_s = \frac{\dot m_g c_{pg} (T_{g1} - T_{g,\mathrm{pp}})}{h_\mathrm{sh} - h_w}.
$$
4. Stack temperature from the economiser balance: $T_\mathrm{stack} = T_{g,\mathrm{pp}} - \dot m_s (h_w - h_\mathrm{fw})/(\dot m_g c_{pg})$.
5. Check: the superheater must not cross the gas line ($T_{g1} - T_\mathrm{sh}$ of at least $20$–$30\ \mathrm{K}$); the stack temperature must stay above the acid dew point of the gas (low for natural gas, much higher for sulphur-bearing oil); and $\dot Q = \dot m_s (h_\mathrm{sh} - h_\mathrm{fw})$ is the heat recovered.
:::

The algorithm works from the pinch outwards because the pinch, not the stack, is what the designer controls: fixing the steam pressure fixes $T_\mathrm{sat}$, which fixes the gas temperature at the pinch, and everything else follows from two energy balances.

::: example A single-pressure HRSG behind the heavy-duty machine {#ex-hrsg}
The exhaust of [[#ex-heavy-duty]] ($\dot m_g = 613.2\ \mathrm{kg/s}$, $c_{pg} = 1.15\ \mathrm{kJ/(kg\,K)}$, $T_{g1} = 575.2\ \mathrm{^\circ C}$) feeds a single-pressure HRSG raising steam at $8\ \mathrm{MPa}$, $545\ \mathrm{^\circ C}$. The feedwater comes straight from the feed pump at $33.6\ \mathrm{^\circ C}$, $h_\mathrm{fw} = 147.8\ \mathrm{kJ/kg}$ (condenser at $5\ \mathrm{kPa}$). Take $\Delta T_\mathrm{pp} = 10\ \mathrm{K}$ and $\Delta T_\mathrm{ap} = 5\ \mathrm{K}$. Find the steam flow, the stack temperature, the heat recovered and the duty of each section. Steam properties from IAPWS-95 (CoolProp); a printed steam table agrees to the figures shown.
::: solution
**Step 1.** At $8\ \mathrm{MPa}$: $T_\mathrm{sat} = 295.0\ \mathrm{^\circ C}$, $h_f = 1317.3$, $h_g = 2758.7\ \mathrm{kJ/kg}$; $h_\mathrm{sh} = h(8\ \mathrm{MPa}, 545\ \mathrm{^\circ C}) = 3509.7\ \mathrm{kJ/kg}$; water leaving the economiser at $290.0\ \mathrm{^\circ C}$ has $h_w = 1289.6\ \mathrm{kJ/kg}$.

**Step 2.** $T_{g,\mathrm{pp}} = 295.0 + 10 = 305.0\ \mathrm{^\circ C}$.

**Step 3.** $\dot m_g c_{pg} = 613.2 \times 1.15 = 705.1\ \mathrm{kW/K}$, and
$$
\dot m_s = \frac{705.1 \times (575.2 - 305.0)}{3509.7 - 1289.6} = \frac{190.5\ \mathrm{MW}}{2220.1\ \mathrm{kJ/kg}} = 85.8\ \mathrm{kg/s}.
$$
**Step 4.**
$$
T_\mathrm{stack} = 305.0 - \frac{85.8 \times (1289.6 - 147.8)}{705.1} = 305.0 - 138.9 = 166.1\ \mathrm{^\circ C}.
$$
**Step 5.** Heat recovered $\dot Q = 85.8 \times (3509.7 - 147.8) = 288.5\ \mathrm{MW}$, split as superheater $85.8 \times (3509.7 - 2758.7) = 64.4\ \mathrm{MW}$, evaporator $85.8 \times (2758.7 - 1289.6) = 126.0\ \mathrm{MW}$ and economiser $98.0\ \mathrm{MW}$. The gas leaves the superheater at $575.2 - 64.4/0.7051 = 483.8\ \mathrm{^\circ C}$. The superheater's hot-end difference is $575.2 - 545 = 30\ \mathrm{K}$, acceptable.

**Sanity check.** Of the $395.0\ \mathrm{MW}$ in the exhaust above ambient, $288.5\ \mathrm{MW}$ ($73\ \%$) is recovered; the rest leaves at $166\ \mathrm{^\circ C}$. That stack is much hotter than the $80$–$90\ \mathrm{^\circ C}$ of a good natural-gas HRSG: the feedwater can absorb only $98\ \mathrm{MW}$ below the pinch, while the gas has $705.1 \times (305 - 15) = 204\ \mathrm{MW}$ there. The single-pressure HRSG is short of cold-side heat sinks — which motivates the multi-pressure designs below.
:::
:::

::: widget plot
f: 575.15 - 1.41818*((0.32162*(280.14-D))*3.3619 - x) + 0*sqrt((0.32162*(280.14-D))*3.3619 - x); min(33.56 + 223.557*x/(0.32162*(280.14-D)), 295.01) + max(0, x - (0.32162*(280.14-D))*2.6109)*332.876/(0.32162*(280.14-D)) + 0*sqrt((0.32162*(280.14-D))*3.3619 - x)
x: 0, 310
y: 0, 600
sliders: D=10:3:40:1
labels: \text{exhaust gas}; \text{water and steam}
caption: T–Q diagram of the $8\ \mathrm{MPa}$ single-pressure HRSG of [[#ex-hrsg]]: temperature in $\mathrm{^\circ C}$ against heat transferred in MW, counted from the cold (stack) end; $D$ is the pinch-point difference in kelvin (the approach is set to zero here for simplicity). The gas line is straight; the water line climbs in the economiser, runs flat at $295\ \mathrm{^\circ C}$ through the evaporator and rises again in the superheater to $545\ \mathrm{^\circ C}$. Shrink $D$: the steam flow and recovered heat grow, the stack end (the left end of the gas line) cools, and the two lines squeeze together along the whole evaporator — where most of the surface area will be needed. Notice also the large gap at the cold end: this is the heat a second, lower-pressure evaporator could collect.
:::

**Multi-pressure HRSGs.** Lowering the steam pressure lowers $T_\mathrm{sat}$ and the pinch, so more heat is recovered — but the steam is then worth less, because the steam cycle's efficiency falls with its boiler pressure. Repeating [[#ex-hrsg]] at other pressures (same $545\ \mathrm{^\circ C}$, pinch and approach) shows the trade-off; the steam turbine is taken as $\eta_t = 0.88$ to a $5\ \mathrm{kPa}$ condenser.

| steam pressure | $T_\mathrm{sat}$ | steam flow | stack | heat recovered | steam-cycle $\eta_\mathrm{ST}$ | steam power |
|---|---|---|---|---|---|---|
| $12\ \mathrm{MPa}$ | $324.7\ \mathrm{^\circ C}$ | $84.4\ \mathrm{kg/s}$ | $178.5\ \mathrm{^\circ C}$ | $279.7\ \mathrm{MW}$ | $0.379$ | $106.0\ \mathrm{MW}$ |
| $8\ \mathrm{MPa}$ | $295.0\ \mathrm{^\circ C}$ | $85.8\ \mathrm{kg/s}$ | $166.1\ \mathrm{^\circ C}$ | $288.5\ \mathrm{MW}$ | $0.368$ | $106.1\ \mathrm{MW}$ |
| $4\ \mathrm{MPa}$ | $250.4\ \mathrm{^\circ C}$ | $89.3\ \mathrm{kg/s}$ | $143.8\ \mathrm{^\circ C}$ | $304.2\ \mathrm{MW}$ | $0.347$ | $105.4\ \mathrm{MW}$ |
| $2\ \mathrm{MPa}$ | $212.4\ \mathrm{^\circ C}$ | $92.7\ \mathrm{kg/s}$ | $124.3\ \mathrm{^\circ C}$ | $317.9\ \mathrm{MW}$ | $0.323$ | $102.8\ \mathrm{MW}$ |

The steam power is almost flat: what a single pressure gains in quantity it loses in quality. The way out is to use *several* pressure levels in one HRSG — a high-pressure section in the hot gas, then intermediate- and low-pressure evaporators further downstream, each with its own pinch — so that the water–steam line follows the straight gas line more closely, the mean temperature difference (and with it the exergy destroyed in heat transfer) falls, and the stack drops to $80$–$90\ \mathrm{^\circ C}$. Large modern combined cycles use **three pressures with reheat**, with high-pressure steam at $16$–$18\ \mathrm{MPa}$ and reheat near $600\ \mathrm{^\circ C}$; some use once-through high-pressure sections at supercritical pressure.

## Combined-cycle efficiency {#sec-cc}

Joining the two cycles gives the plant's efficiency in terms of the efficiencies of its parts. The derivation is a pair of first-law balances.

::: proposition Efficiency of a combined cycle {#prop-cc}
Let a gas turbine of efficiency $\eta_\mathrm{GT} = \dot W_\mathrm{GT}/\dot Q_f$ reject all of its non-work energy in its exhaust; let the HRSG recover a fraction $\varepsilon_\mathrm{HR}$ of that energy, and let the steam cycle convert heat received to work with efficiency $\eta_\mathrm{ST}$. Then the combined cycle has efficiency
$$
\eta_\mathrm{CC} = \eta_\mathrm{GT} + \varepsilon_\mathrm{HR}\,\eta_\mathrm{ST}\,(1 - \eta_\mathrm{GT}).
$$ {#eq-eta-cc}
With perfect heat recovery ($\varepsilon_\mathrm{HR} = 1$) this becomes $1 - \eta_\mathrm{CC} = (1 - \eta_\mathrm{GT})(1 - \eta_\mathrm{ST})$: the *losses* of the two cycles multiply.
:::

::: proof
Steady state, no supplementary firing, and all energy not converted to gas-turbine work leaving with the exhaust (casing heat losses and generator losses, a percent or so, are included in the "exhaust" share or neglected). The exhaust energy is then $\dot Q_\mathrm{ex} = \dot Q_f - \dot W_\mathrm{GT} = (1 - \eta_\mathrm{GT})\dot Q_f$. By definition of the recovery factor the steam cycle receives $\dot Q_\mathrm{HRSG} = \varepsilon_\mathrm{HR}\dot Q_\mathrm{ex}$, and it delivers $\dot W_\mathrm{ST} = \eta_\mathrm{ST}\dot Q_\mathrm{HRSG}$. Adding the two outputs and dividing by $\dot Q_f$:
$$
\eta_\mathrm{CC} = \frac{\dot W_\mathrm{GT} + \dot W_\mathrm{ST}}{\dot Q_f} = \eta_\mathrm{GT} + \eta_\mathrm{ST}\,\varepsilon_\mathrm{HR}\,(1 - \eta_\mathrm{GT}).
$$
Setting $\varepsilon_\mathrm{HR} = 1$, $1 - \eta_\mathrm{CC} = (1 - \eta_\mathrm{GT}) - \eta_\mathrm{ST}(1 - \eta_\mathrm{GT}) = (1 - \eta_\mathrm{GT})(1 - \eta_\mathrm{ST})$.
:::

The formula explains why combined cycles work so well. Two mediocre cycles, $\eta_\mathrm{GT} = 0.40$ and $\eta_\mathrm{ST}\varepsilon_\mathrm{HR} = 0.30$, combine to $0.40 + 0.30 \times 0.60 = 0.58$. Thermodynamically, the gas turbine takes in heat at a very high mean temperature (the steam cycle cannot: its boiler tubes are limited to about $600$–$650\ \mathrm{^\circ C}$), and the steam cycle rejects heat at nearly ambient temperature (the gas turbine cannot: its exhaust is at $575\ \mathrm{^\circ C}$). Together they span almost the whole temperature range between the flame and the river.

It also shows the design tension. Raising the gas turbine's pressure ratio raises $\eta_\mathrm{GT}$ but cools the exhaust, which lowers $\eta_\mathrm{ST}$ and $\varepsilon_\mathrm{HR}$. Differentiating [[#eq-eta-cc]] shows that a gain $\delta\eta_\mathrm{GT}$ is worth only $(1 - \varepsilon_\mathrm{HR}\eta_\mathrm{ST})\,\delta\eta_\mathrm{GT} \approx 0.7\,\delta\eta_\mathrm{GT}$ to the combined cycle at fixed bottoming performance, and less if the bottoming cycle suffers. This is why gas turbines designed for combined cycles favour high turbine inlet temperatures and moderate pressure ratios.

::: example The complete combined cycle {#ex-cc}
Combine the gas turbine of [[#ex-heavy-duty]] with the $8\ \mathrm{MPa}$, $545\ \mathrm{^\circ C}$ HRSG of [[#ex-hrsg]] and a non-reheat steam turbine of isentropic efficiency $0.88$ exhausting to a condenser at $5\ \mathrm{kPa}$; the feed pump has isentropic efficiency $0.80$. Find the steam-turbine power, the plant efficiency and heat rate, and check them against [[#eq-eta-cc]]. Ignore the steam generator's electrical losses.
::: solution
**Steam turbine.** At $8\ \mathrm{MPa}$, $545\ \mathrm{^\circ C}$: $h_1 = 3509.7\ \mathrm{kJ/kg}$, $s_1 = 6.865\ \mathrm{kJ/(kg\,K)}$. Isentropic expansion to $5\ \mathrm{kPa}$ gives $h_{2s} = 2092.9\ \mathrm{kJ/kg}$ (quality $0.807$), and
$$
h_2 = 3509.7 - 0.88 \times (3509.7 - 2092.9) = 2262.9\ \mathrm{kJ/kg}, \qquad x_2 = 0.877.
$$
**Pump.** Saturated liquid at $5\ \mathrm{kPa}$: $h_3 = 137.7\ \mathrm{kJ/kg}$, $v_3 = 0.001005\ \mathrm{m^3/kg}$; $w_p = v_3 \Delta p/\eta_p = 0.001005 \times 7995/0.80 = 10.0\ \mathrm{kJ/kg}$, so $h_\mathrm{fw} = 147.8\ \mathrm{kJ/kg}$ (the value used in [[#ex-hrsg]]).

**Steam cycle.** $w_\mathrm{net} = (3509.7 - 2262.9) - 10.0 = 1236.7\ \mathrm{kJ/kg}$, $\eta_\mathrm{ST} = 1236.7/(3509.7 - 147.8) = 0.368$, and
$$
\dot W_\mathrm{ST} = 85.8 \times 1236.7 = 106.1\ \mathrm{MW}.
$$
**Plant.** $\dot W = 258.9 + 106.1 = 365.0\ \mathrm{MW}$ from $657.8\ \mathrm{MW}$ of fuel:
$$
\eta_\mathrm{CC} = \frac{365.0}{657.8} = 0.555, \qquad \mathrm{HR} = \frac{3600}{0.5548} = 6488\ \mathrm{kJ/kWh}.
$$
**Check with [[#eq-eta-cc]].** $\varepsilon_\mathrm{HR} = 288.5/(657.8 - 258.9) = 0.723$, so $\eta_\mathrm{CC} = 0.3935 + 0.723 \times 0.368 \times 0.6065 = 0.555$, as it must be.

**Sanity check.** The gas turbine supplies $71\ \%$ of the output and the steam turbine $29\ \%$ — close to the usual two-to-one split. $55.5\ \%$ is well below the $60$–$64\ \%$ of the best modern plants because this one has a single pressure level, no reheat, a cool $575\ \mathrm{^\circ C}$ exhaust and a $166\ \mathrm{^\circ C}$ stack; the exit quality $0.877$ is acceptable for a final turbine stage.
:::
:::

**Supplementary firing.** Burners in the duct between the gas turbine and the HRSG can raise the exhaust temperature (there is plenty of oxygen left — the exhaust of [[#ex-heavy-duty]] still contains most of its air), giving more steam and more power on demand. But the fuel burned there produces power only through the steam cycle, at roughly $\eta_\mathrm{ST}$, so the plant's average efficiency falls; duct firing is a cheap way to buy peak capacity, not efficiency.

As a dated benchmark: Guinness World Records recognised EDF's Bouchain plant in France (GE 9HA.01 gas turbine) at $62.22\ \%$ net efficiency in 2016, and SSE's Keadby 2 plant in England (Siemens Energy SGT5-9000HL) at $64.18\ \%$, verified on 21 May 2024; as of 2025 Keadby 2 still held the combined-cycle record. These are LHV figures at the test conditions.

## Combined heat and power {#sec-chp}

A power-only plant has to reject its low-temperature heat to a river or the atmosphere. Many users — refineries, paper mills, hospitals, district-heating networks — need exactly that kind of heat. A **combined heat and power** (CHP) plant, or **cogeneration** plant, delivers the exhaust heat to them, as process steam or hot water, instead of to the condenser. A gas turbine with an HRSG producing process steam is the classic topping-cycle CHP plant.

::: definition Measures of a cogeneration plant {#def-chp}
For a plant delivering electrical power $\dot W$ and useful heat $\dot Q_u$ from fuel power $\dot Q_f$:

- **utilisation factor** (fuel utilisation, total efficiency): $\varepsilon_u = (\dot W + \dot Q_u)/\dot Q_f$;
- **power-to-heat ratio**: $\sigma = \dot W/\dot Q_u$ — high for gas turbines with HRSGs, low for back-pressure steam turbines;
- **primary energy savings**, relative to producing the same power and heat separately in reference plants of electrical efficiency $\eta_{e,\mathrm{ref}}$ and heat efficiency $\eta_{h,\mathrm{ref}}$:
$$
\mathrm{PES} = 1 - \frac{1}{\dfrac{\eta_h}{\eta_{h,\mathrm{ref}}} + \dfrac{\eta_e}{\eta_{e,\mathrm{ref}}}}, \qquad \eta_e = \frac{\dot W}{\dot Q_f},\ \ \eta_h = \frac{\dot Q_u}{\dot Q_f}.
$$ {#eq-pes}
:::

The PES formula is just the ratio of fuels: the separate plants would burn $\dot W/\eta_{e,\mathrm{ref}} + \dot Q_u/\eta_{h,\mathrm{ref}}$; dividing $\dot Q_f$ by this and subtracting from one gives [[#eq-pes]]. The utilisation factor alone is misleading, because it adds kilowatts of electricity to kilowatts of heat as if they were worth the same: a boiler has a utilisation factor of $0.9$ and produces no work at all. PES compares like with like. It is the measure used in European law: Directive 2012/27/EU (the Energy Efficiency Directive) defines **high-efficiency cogeneration** as giving primary energy savings of at least $10\ \%$, against harmonised reference efficiencies set by the Commission. In the United States, the Public Utility Regulatory Policies Act of 1978 (PURPA) created "qualifying facilities"; the FERC efficiency standard for a gas- or oil-fired topping-cycle facility (18 CFR 292.205) requires the useful power output plus **one-half** of the useful thermal output to be at least $42.5\ \%$ of the fuel input ($45\ \%$ if the thermal output is less than $15\ \%$ of the total), with the thermal output at least $5\ \%$ of the total. The factor one-half is a crude version of the same idea: heat is worth less than work.

::: example A gas-turbine CHP plant for a paper mill {#ex-chp}
A gas turbine delivers $45\ \mathrm{MW}$ of electricity at $\eta_e = 0.40$; its exhaust, $135\ \mathrm{kg/s}$ at $461\ \mathrm{^\circ C}$ with $c_{pg} = 1.12\ \mathrm{kJ/(kg\,K)}$, passes through an unfired HRSG raising saturated steam at $1.0\ \mathrm{MPa}$ for the mill. Condensate returns at $90\ \mathrm{^\circ C}$; the pinch is $10\ \mathrm{K}$ and the approach zero. Find the steam flow, stack temperature and useful heat, the utilisation factor and power-to-heat ratio, whether the plant meets the PURPA standard, and its PES against reference efficiencies of $0.525$ (electricity) and $0.90$ (heat), taken here as illustrative values.
::: solution
**Fuel.** $\dot Q_f = 45/0.40 = 112.5\ \mathrm{MW}$.

**HRSG ([[#alg-hrsg]] with no superheater).** At $1.0\ \mathrm{MPa}$: $T_\mathrm{sat} = 179.9\ \mathrm{^\circ C}$, $h_f = 762.5$, $h_g = 2777.1\ \mathrm{kJ/kg}$; return water at $90\ \mathrm{^\circ C}$ has $h = 377.8\ \mathrm{kJ/kg}$. Gas at the pinch $189.9\ \mathrm{^\circ C}$; $\dot m_g c_{pg} = 151.2\ \mathrm{kW/K}$.
$$
\dot m_s = \frac{151.2 \times (461 - 189.9)}{2777.1 - 762.5} = 20.35\ \mathrm{kg/s}, \qquad T_\mathrm{stack} = 189.9 - \frac{20.35 \times (762.5 - 377.8)}{151.2} = 138.1\ \mathrm{^\circ C}.
$$
Useful heat $\dot Q_u = 20.35 \times (2777.1 - 377.8) = 48.8\ \mathrm{MW}$.

**Measures.**
$$
\varepsilon_u = \frac{45 + 48.8}{112.5} = 0.834, \qquad \sigma = \frac{45}{48.8} = 0.92.
$$
PURPA: $(45 + 48.8/2)/112.5 = 0.617 \ge 0.425$, and the thermal output is $52\ \%$ of the total — the plant qualifies easily. PES with $\eta_e = 0.400$, $\eta_h = 0.434$:
$$
\mathrm{PES} = 1 - \frac{1}{0.434/0.90 + 0.400/0.525} = 1 - \frac{1}{1.2440} = 0.196.
$$
**Interpretation.** Separate production would burn $45/0.525 + 48.8/0.90 = 140.0\ \mathrm{MW}$ of fuel instead of $112.5\ \mathrm{MW}$: a saving of $27.5\ \mathrm{MW}$, $19.6\ \%$. **Sanity check:** $\varepsilon_u < 1$, the stack is above the pinch temperature minus the economiser's drop and well above the return-water temperature, and PES is far below $\varepsilon_u$, as it must be when heat and power are both counted at their reference values.
:::
:::

::: warning Utilisation factor is not efficiency
A utilisation factor of $0.85$ does not mean a CHP plant is "85 % efficient" in the sense of a power station. Electricity and heat are not interchangeable: a heat pump can turn $1\ \mathrm{kW}$ of electricity into $3\ \mathrm{kW}$ of low-temperature heat, but no device turns heat back into work at better than the Carnot efficiency. Compare CHP plants by primary energy savings, by exergy efficiency ([[thermodynamics/exergy]]) or by their cost and emissions against the real alternative ([[energy-systems/energy-economics-emissions]]), and state the reference efficiencies you used.
:::

::: quiz
A combined-cycle plant's gas turbine is upgraded so that its efficiency rises from $38\ \%$ to $40\ \%$, with no change to the HRSG or the steam cycle, whose product $\varepsilon_\mathrm{HR}\eta_\mathrm{ST}$ stays at $0.30$. What happens to the combined-cycle efficiency?
- [ ] It rises by $2$ percentage points, the same as the gas turbine.
- [x] It rises by $1.4$ percentage points.
- [ ] It rises by $0.6$ percentage points.
- [ ] It falls, because less heat reaches the steam cycle.
::: solution
From [[#eq-eta-cc]], $\eta_\mathrm{CC} = \eta_\mathrm{GT} + 0.30(1 - \eta_\mathrm{GT}) = 0.30 + 0.70\,\eta_\mathrm{GT}$. Before: $0.30 + 0.70 \times 0.38 = 0.566$; after: $0.30 + 0.70 \times 0.40 = 0.580$, a gain of $1.4$ points. The steam cycle does lose some heat, $0.30 \times 0.02 = 0.6$ points of output, but the gas turbine gains $2$ points, so the net is positive. In practice a more efficient gas turbine often has a cooler exhaust, which also lowers $\eta_\mathrm{ST}$, so the real gain may be smaller still.
:::
:::

::: history
The gas turbine was patented long before it could work. **John Barber**'s English patent No. 1833 of **1791** described a compressor, a combustion chamber and a turbine; no working engine is known. The obstacle was the compressor: with the component efficiencies of the time, the turbine could not drive it (see [[#prop-real-brayton]]). In **1903** the Norwegian engineer **Ægidius Elling** ran in Kristiania (Oslo) what is generally recognised as the first gas turbine to produce net power, about $11\ \mathrm{hp}$, delivered as compressed air. The first gas turbine to generate electricity commercially was built by **Brown Boveri** and installed in **1939** in the municipal power station of **Neuchâtel**, Switzerland: a $4\ \mathrm{MW}$ standby set whose acceptance tests, supervised by **Aurel Stodola**, gave an efficiency of $17.4\ \%$. It served until 2002 and is an ASME historic landmark (1988). In the United States, a $3.5\ \mathrm{MW}$ General Electric unit started in **1949** at Oklahoma Gas & Electric's **Belle Isle** station; its exhaust heated the feedwater of the station's steam plant, making it an early example of combining the two cycles. The **Public Utility Regulatory Policies Act** of **1978** opened the US grid to independent cogenerators and helped create the market for gas-turbine CHP and, with cheap natural gas and better turbines, for combined cycles. Combined-cycle efficiency records, certified by Guinness World Records, rose to $62.22\ \%$ at Bouchain (France) in **2016** and $64.18\ \%$ at Keadby 2 (England) in **2024**.
:::

::: summary
- Real component efficiencies make the simple-cycle efficiency a function of both pressure ratio and turbine inlet temperature, with two optima: maximum specific work at $x = \sqrt{\eta_c\eta_t\tau}$ and maximum efficiency at a higher ratio given by a quadratic ([[#prop-optimum-ratio]]). The efficiency curve is flat between them.
- The back-work ratio of about $0.5$ amplifies every compressor loss and makes the output fall by roughly $0.7\ \%$ per kelvin of ambient temperature at fixed volume flow ([[#prop-ambient]]); evaporative or refrigerated inlet cooling recovers much of it.
- The turbine inlet temperature, the most valuable design parameter, is limited by blade metal temperature; cooling effectiveness $\phi = (T_g - T_m)/(T_g - T_c)$ of $0.6$–$0.7$ lets gas at $1600\ \mathrm{^\circ C}$ meet blades at $900\ \mathrm{^\circ C}$, at the cost of cooling air.
- An HRSG is sized from its pinch point ([[#alg-hrsg]]): the pinch fixes the steam flow, the economiser balance fixes the stack temperature. Multiple pressure levels and reheat recover more heat at higher quality.
- Combined-cycle efficiency is $\eta_\mathrm{CC} = \eta_\mathrm{GT} + \varepsilon_\mathrm{HR}\eta_\mathrm{ST}(1 - \eta_\mathrm{GT})$; the best plants reach about $64\ \%$ (LHV, 2024). Supplementary firing adds capacity, not efficiency.
- Cogeneration is judged by primary energy savings against separate production, not by its utilisation factor; regulators encode this (EU high-efficiency CHP, PURPA's one-half credit for heat).
- Heat rate $= 3600/\eta$ in $\mathrm{kJ/kWh}$; always state LHV or HHV.
:::

## Exercises

::: exercise Heat rate {#exr-heat-rate level=1 check="8780"}
An aeroderivative gas turbine has a simple-cycle efficiency of $41\ \%$ (LHV). What is its heat rate? (Enter the heat rate in kJ/kWh, rounded to the nearest $10\ \mathrm{kJ/kWh}$.)
::: solution
$\mathrm{HR} = 3600/0.41 = 8780.5\ \mathrm{kJ/kWh}$, which to the nearest $10$ is $8780\ \mathrm{kJ/kWh}$. In US units, $3412/0.41 = 8322\ \mathrm{Btu/kWh}$ on the same LHV basis.
:::
:::

::: exercise Ideal combined cycle {#exr-ideal-cc level=1 check="61"}
A gas turbine of efficiency $40\ \%$ is combined with a steam cycle of efficiency $35\ \%$, and all of the gas turbine's exhaust heat is recovered. What is the combined-cycle efficiency? (Enter the efficiency in per cent.)
::: solution
With $\varepsilon_\mathrm{HR} = 1$, [[#eq-eta-cc]] gives $1 - \eta_\mathrm{CC} = (1 - 0.40)(1 - 0.35) = 0.60 \times 0.65 = 0.39$, so $\eta_\mathrm{CC} = 0.61 = 61\ \%$. A real HRSG recovers $70$–$90\ \%$ of the exhaust heat, so a real plant with these component efficiencies would reach $55$–$59\ \%$.
:::
:::

::: exercise Required cooling effectiveness {#exr-cooling level=1 check="0.574"}
A first-stage vane sees gas at $1500\ \mathrm{^\circ C}$, is cooled with air at $420\ \mathrm{^\circ C}$ and must not exceed $880\ \mathrm{^\circ C}$. What overall cooling effectiveness is needed? (Enter $\phi$ to three significant figures.)
::: solution
$\phi = (1500 - 880)/(1500 - 420) = 620/1080 = 0.5741$, i.e. $0.574$. Temperature differences may be taken in degrees Celsius because the offsets cancel.
:::
:::

::: exercise Pressure ratio for maximum work {#exr-ropt level=2 check="10.5"}
A small industrial gas turbine has $T_1 = 300\ \mathrm{K}$, $T_3 = 1500\ \mathrm{K}$, $\eta_c = 0.86$ and $\eta_t = 0.89$. Using the cold-air standard ($k = 1.4$), find the pressure ratio that maximises the specific work, and the specific work and efficiency at that ratio. (Enter the pressure ratio to three significant figures.)
::: solution
$\tau = 5$, so $x_w = \sqrt{0.86 \times 0.89 \times 5} = 1.9563$ and $r_{p,w} = 1.9563^{3.5} = 10.47$, i.e. $10.5$. Then from [[#eq-wnet-real]]
$$
w_\mathrm{net} = 1.005 \times 300 \left[5 \times 0.89 \left(1 - \frac{1}{1.9563}\right) - \frac{0.9563}{0.86}\right] = 320.6\ \mathrm{kJ/kg},
$$
and $q_\mathrm{in} = 1.005 \times 300 \times (4 - 0.9563/0.86) = 870.8\ \mathrm{kJ/kg}$, so $\eta = 0.368$. The ideal cycle would have its work optimum at $5^{1.75} = 16.7$: component losses pull the optimum to a lower pressure ratio.
:::
:::

::: exercise Hot-day output {#exr-hot-day level=2 check="84.0"}
A gas turbine at ISO conditions ($15\ \mathrm{^\circ C}$) has turbine power $200\ \mathrm{MW}$ and compressor power $100\ \mathrm{MW}$. Using [[#prop-ambient]] (fixed volume flow, pressure ratio and turbine inlet temperature), estimate its net shaft power at $40\ \mathrm{^\circ C}$. (Enter the power in MW to one decimal place.)
::: solution
The compressor power stays at $100\ \mathrm{MW}$; the turbine power scales as $1/T_1$:
$$
\dot W_t = 200 \times \frac{288.15}{313.15} = 184.03\ \mathrm{MW}, \qquad \dot W_\mathrm{net} = 84.03 \approx 84.0\ \mathrm{MW}.
$$
A $25\ \mathrm{K}$ rise has cost $16\ \%$ of the output, about $0.64\ \%$ per kelvin; [[#eq-ambient]] at $15\ \mathrm{^\circ C}$ gives $1/(288.15 \times 0.5) = 0.69\ \%$ per kelvin initially.
:::
:::

::: exercise Primary energy savings {#exr-pes level=2 check="14.3"}
A CHP plant burns $100\ \mathrm{MW}$ of fuel and delivers $35\ \mathrm{MW}$ of electricity and $45\ \mathrm{MW}$ of useful heat. Find its utilisation factor, power-to-heat ratio, whether it meets the PURPA topping-cycle standard, and its primary energy savings against reference efficiencies $0.525$ (electricity) and $0.90$ (heat). (Enter the PES in per cent, to one decimal place.)
::: solution
$\varepsilon_u = (35 + 45)/100 = 0.80$; $\sigma = 35/45 = 0.78$. PURPA: $(35 + 22.5)/100 = 0.575 \ge 0.425$ and the heat is more than $15\ \%$ of the output, so it qualifies. With $\eta_e = 0.35$, $\eta_h = 0.45$:
$$
\mathrm{PES} = 1 - \frac{1}{0.45/0.90 + 0.35/0.525} = 1 - \frac{1}{1.1667} = 0.1429 = 14.3\ \%.
$$
It exceeds the $10\ \%$ needed for "high-efficiency cogeneration" in the EU sense (with these reference values).
:::
:::

::: exercise A single-pressure HRSG {#exr-hrsg level=2}
Exhaust gas ($500\ \mathrm{kg/s}$, $c_{pg} = 1.10\ \mathrm{kJ/(kg\,K)}$, $600\ \mathrm{^\circ C}$) raises steam at $6\ \mathrm{MPa}$, $560\ \mathrm{^\circ C}$ from feedwater at $40\ \mathrm{^\circ C}$. With a pinch of $8\ \mathrm{K}$ and zero approach, find the steam flow, the stack temperature and the heat recovered, using steam tables. Sketch the T–Q diagram.
::: solution
At $6\ \mathrm{MPa}$: $T_\mathrm{sat} = 275.6\ \mathrm{^\circ C}$, $h_f = 1213.9\ \mathrm{kJ/kg}$; $h(6\ \mathrm{MPa}, 560\ \mathrm{^\circ C}) = 3564.8\ \mathrm{kJ/kg}$; compressed water at $40\ \mathrm{^\circ C}$, $h_\mathrm{fw} = 172.8\ \mathrm{kJ/kg}$ (IAPWS-95; a saturated-liquid table gives $167.5$, a negligible difference here). The gas at the pinch is at $283.6\ \mathrm{^\circ C}$ and $\dot m_g c_{pg} = 550\ \mathrm{kW/K}$:
$$
\dot m_s = \frac{550 \times (600 - 283.6)}{3564.8 - 1213.9} = 74.0\ \mathrm{kg/s},
\qquad
T_\mathrm{stack} = 283.6 - \frac{74.0 \times (1213.9 - 172.8)}{550} = 143.5\ \mathrm{^\circ C},
$$
and $\dot Q = 74.0 \times (3564.8 - 172.8) = 251\ \mathrm{MW}$. On the T–Q diagram the gas line runs straight from $143.5$ to $600\ \mathrm{^\circ C}$; the water line rises from $40$ to $275.6\ \mathrm{^\circ C}$ over the first $77\ \mathrm{MW}$, is flat across the evaporator, and rises to $560\ \mathrm{^\circ C}$ in the superheater, touching within $8\ \mathrm{K}$ of the gas at the cold end of the evaporator.
:::
:::

::: exercise Supplementary firing {#exr-duct-firing level=3 check="53.9"}
The combined cycle of [[#ex-cc]] ($258.85\ \mathrm{MW}$ gas turbine, $106.1\ \mathrm{MW}$ steam turbine, $657.8\ \mathrm{MW}$ fuel) is fitted with duct burners that add $60\ \mathrm{MW}$ of fuel. Assume all of it is recovered as extra steam and converted at the steam cycle's efficiency of $0.368$. Find the new output and plant efficiency, and explain the result with [[#eq-eta-cc]]. (Enter the new plant efficiency in per cent, to one decimal place.)
::: solution
Extra power $0.368 \times 60 = 22.08\ \mathrm{MW}$, so $\dot W = 258.85 + 106.1 + 22.08 = 387.0\ \mathrm{MW}$ from $717.8\ \mathrm{MW}$ of fuel:
$$
\eta = \frac{387.0}{717.8} = 0.539 = 53.9\ \%,
$$
down from $55.5\ \%$. The marginal efficiency of the duct fuel is that of the steam cycle alone, $36.8\ \%$, below the plant's average, so adding it lowers the average. (In practice the steam turbine and HRSG must be sized for the extra steam, and the higher HRSG gas temperature can raise $\eta_\mathrm{ST}$ slightly.) Duct firing is valuable when capacity is scarce and fuel is cheap, not as an efficiency measure.
:::
:::

::: exercise The ideal cycle's efficiency optimum {#exr-ideal-optimum level=3}
(a) Show that with $\eta_c = \eta_t = 1$ the quadratic [[#eq-xopt-eta]] has a double root at $x = \tau$, and interpret it: what are $T_2$, $w_\mathrm{net}$ and $\eta$ there? (b) Show more generally that $w_\mathrm{net}$ in [[#eq-wnet-real]] is zero at $x = 1$ and at $x = \eta_c\eta_t\tau$, and that $x_w$ is their geometric mean.
::: solution
(a) With $a = \tau$, $b = 1$, $c = \tau - 1$: $b(a - c) = 1$, $2ab = 2\tau$, $a(b + c) = \tau^2$, so the quadratic is $x^2 - 2\tau x + \tau^2 = (x - \tau)^2 = 0$. At $x = \tau$, $T_2 = T_1 x = T_3$: the compressor alone heats the air to the turbine inlet temperature, no fuel is added and $w_\mathrm{net} = 0$; the efficiency, $1 - 1/x = 1 - T_1/T_3$, equals the Carnot efficiency between $T_1$ and $T_3$. The ideal cycle's efficiency rises monotonically towards this limit, which is reached only with zero output — the ideal-cycle statement that efficiency and specific work cannot be maximised together.

(b) $w_\mathrm{net} = (c_pT_1/x)\left[\tau\eta_t(x - 1) - x(x - 1)/\eta_c\right] = (c_pT_1/\eta_c)(x - 1)(\eta_c\eta_t\tau - x)/x$, zero at $x = 1$ and $x = \eta_c\eta_t\tau$. Their geometric mean is $\sqrt{\eta_c\eta_t\tau} = x_w$ of [[#eq-xopt-work]]. A machine with $\eta_c\eta_t\tau < 1$ can produce no net work at any pressure ratio — the reason the early gas turbines, with component efficiencies near $0.6$ and low inlet temperatures, failed.
:::
:::

::: exercise Design: power for a hot, dry site {#exr-design level=3}
A mining town in a hot desert (summer afternoons $45\ \mathrm{^\circ C}$ dry bulb, $22\ \mathrm{^\circ C}$ wet bulb; winter nights near $5\ \mathrm{^\circ C}$) needs $120\ \mathrm{MW}$ of firm power, with its peak on summer afternoons, and its processing plant needs about $40\ \mathrm{MW}$ of steam at $1\ \mathrm{MPa}$ year-round. Water is scarce and natural gas is available by pipeline. Propose and compare at least two plant configurations — for example, aeroderivative units with inlet chilling and HRSGs for process steam; or a heavy-duty combined cycle with air-cooled condenser and supplementary firing — estimating for each the ISO and summer output, the efficiency or primary energy savings, the water consumption and the main risks. State your assumptions and which numbers you would ask manufacturers for.
::: solution
There is no single answer; a good one quantifies the trade-offs. **Derating:** from [[#eq-ambient]] with $\mathrm{bwr} \approx 0.5$, output at $45\ \mathrm{^\circ C}$ is about $1 - (318.15 - 288.15) \times 0.007 \approx 79\ \%$ of ISO rating (the exact $A/T_1 - B$ model gives $1 - 2 \times (1 - 288.15/318.15) = 81\ \%$), so ISO capacity of $150$–$155\ \mathrm{MW}$ is needed without inlet cooling, plus redundancy ($N + 1$ units) for firm supply. **Inlet cooling:** an evaporative cooler of effectiveness $0.9$ would bring $45\ \mathrm{^\circ C}$ down to about $24\ \mathrm{^\circ C}$, recovering most of the derating, but consumes water (of order $1\ \mathrm{kg/s}$ per $100\ \mathrm{kg/s}$ of air in these conditions); a mechanical chiller avoids that at the cost of a few per cent of output. **CHP:** an HRSG behind the gas turbines can supply the $40\ \mathrm{MW}$ of process steam with a utilisation factor near $0.8$ and PES around $15$–$25\ \%$ (as in [[#ex-chp]]); a combined cycle needs an air-cooled condenser in the desert, which raises condensing pressure on hot days (perhaps $15$–$20\ \mathrm{kPa}$ instead of $5$) and lowers $\eta_\mathrm{ST}$ when power is most needed. **Comparison:** several aeroderivative units with HRSGs give modularity, fast start and good part-load efficiency for a small isolated grid; a combined cycle gives the best full-load efficiency but has a large single-unit risk. Ask manufacturers for site-rated output and heat rate against ambient temperature, part-load curves, water use, start times and maintenance intervals; check emissions limits and the gas supply's firmness.
:::
:::
