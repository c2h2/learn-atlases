Internal flow is the one branch of fluid mechanics in which the answer is **a chart and not a formula**, and the reason is turbulence: the friction factor of a rough pipe at high Reynolds number depends on a surface whose asperities are random in height and spacing, and no theory has been produced that computes it from the profile. What exists instead is a **correlation** — the Colebrook equation of **1939**, fitted to data by **Nikuradse** in **1933** on artificially roughened pipes and extended to commercial steel by **Moody** in **1944** — and the whole of practical pipe-flow design is the disciplined use of that correlation together with an honest allowance for the fittings, the age and the roughness of the actual pipe.

The subject is worth its space because **more fluid power is lost in pipes than in any other single way**: the pump energy consumed by friction in the world's water, oil and district-heating networks is of the order of one per cent of global electricity, and the difference between a good and a mediocre hydraulic design is a factor of two in that number.

::: warning Seven pipe-flow errors that double a pump's energy bill
**Confusing the Darcy and Fanning friction factors.** $f_{\mathrm{Darcy}} = 4 f_{\mathrm{Fanning}}$, and both are in current use — Fanning in chemical engineering and in most CFD post-processors, Darcy in civil and mechanical. **A factor of four in the head loss and a factor of four in the pump's power**, and the only defence is to write the definition every time: $h_f = f L V^2 / \left( 2 g D \right)$ is Darcy, $\tau_w = f \rho V^2 / 2$ is Fanning. **The check is laminar flow: $f_{\mathrm{Darcy}} = 64 / \mathrm{Re}$, $f_{\mathrm{Fanning}} = 16 / \mathrm{Re}$**, and any correlation you are handed can be identified in one line. **Using the hydraulic diameter outside the turbulent regime.** $D_h = 4 A / P$ collapses turbulent non-circular data to within a few per cent, and is **wrong in laminar flow** — a circular duct gives $f \mathrm{Re} = 64$, a parallel slot gives $96$, an equilateral triangle $60$, a square $57$, and a rectangular duct varies from $53$ at an aspect ratio of $20$ to $60$ at $1$. **The reason a rectangular duct's laminar pressure drop computed with $D_h$ is out by up to $20\ \%$ is that the secondary-flow structure the hydraulic diameter is meant to represent does not exist without turbulence.** **Adding minor-loss coefficients computed at different velocities.** A tee's branch $K$ refers to the **branch** velocity head and its run $K$ to the **run** velocity head; a reducing bend's $K$ refers to the **lower** velocity; and a valve's $K$ refers to its own bore, which for a reduced-trim globe valve is not the pipe bore. **The sum $\sum K$ is meaningless unless every term is referred to one stated velocity**, and the reason a manifold's header is sized on the run velocity and every branch's $K$ is then multiplied by $\left( V_{\mathrm{branch}} / V_{\mathrm{run}} \right)^2$ is that the alternative is a $50\ \%$ error in the branch loss. **Using the fully-rough friction factor at a transitional Reynolds number.** The fully-rough limit $f = \left[ 2 \log_{10} \left( 3.7 D / k_s \right) \right]^{- 2}$ is the asymptote of the Colebrook equation as $\mathrm{Re} \to \infty$, and at $\mathrm{Re} = 10^5$ it understates $f$ by $20$ to $40\ \%$ for a typical commercial-steel roughness. **The reason a pipeline designed on the fully-rough asymptote runs hot for its first twenty years and only reaches its design condition when it is old** is that the asymptote is a statement about **age**, not about the pipe as built. **Forgetting the entrance length.** The hydrodynamic entrance length for turbulent flow is $L_e \approx 10 D$ to $60 D$ depending on the inlet condition and on how close to fully developed one requires the profile to be, and the average friction factor over the entrance region is **up to $50\ \%$ above** the fully developed value. **A $10D$ entrance in a $100D$ run is a $5\ \%$ error in the total loss**, and the reason a flow-meter's straight-run requirement of $10D$ upstream is a metrology requirement and not a hydraulics one is that the **profile**, not the loss, is what the meter needs. **Applying the Colebrook equation to a non-Newtonian or a multiphase fluid.** The correlation is for a single-phase Newtonian fluid in a pipe whose roughness is small compared with the viscous sublayer or large compared with it, and for neither of the two cases that occur most often in practice — **a drag-reducing polymer solution, for which the friction can be $70\ \%$ below the water value even in a rough pipe**, and **a slurry above the deposit velocity, for which it can be $50\ \%$ above the water value because of the additional solid-phase collision stress**. **The reason a tailings line's designer uses the Durand–Condolios or the Wasp method and never the Moody chart is that the chart's mechanism is absent and a different one is present.** **Sizing a pump for the design flow at the design head and no other point.** A pump on a system curve operates where the two curves cross, and if the system has a large static head the crossing is robust; if it has little, the operating point moves a long way for a small change in roughness or demand. **The reason a pumping station is specified with a verified operating range and not a single duty point is that the duty point is a prediction and the range is a fact**, and the reason the motor must be sized for the **end** of the curve and not the duty point is that a pump whose impeller is trimmed to the duty point will run off the end when the pipe is new and smooth.
:::

## The friction factor

::: definition Laminar flow {#def-laminar}
**The exact result**, from [[fluid-mechanics/navier-stokes|Navier–Stokes]]:
$$
Q = \frac{\pi D^4 \Delta p}{128 \mu L}, \qquad
\boxed{ h_f = \frac{32 \mu L V}{\rho g D^2} = \frac{64}{\mathrm{Re}} \frac{L}{D} \frac{V^2}{2 g} }
\qquad f_{\mathrm{Darcy}} = \frac{64}{\mathrm{Re}}
$$
**The three properties that make laminar flow unlike turbulent flow.**
$$
\begin{array}{l l}
h_f \propto V^1 & \text{not } V^2 \text{ — a laminar system curve is a straight line on log-log} \\
h_f \propto \mu^1 & \text{viscosity controls, so heating a heavy oil line is an energy trade} \\
h_f \propto \nu^0 \text{ at fixed } Q & \text{density drops out; the pressure drop is independent of density}
\end{array}
$$
**The number that makes the laminar limit a diagnostic.** For a fixed flow rate, $\Delta p = 128 \mu L Q / \left( \pi D^4 \right)$ contains **no density and no velocity** — so a laminar flow's pressure drop is the same whether the fluid is water or glycerin at the same viscosity, and the reason a **capillary viscometer** works is that reading $\Delta p$ at a known $Q$ gives $\mu$ directly with no calibration against a reference fluid.
**The entrance region.** The entrance length is $L_e \approx 0.05\, \mathrm{Re}\, D$; at $\mathrm{Re} = 2{,}000$ and $D = 25\ \mathrm{mm}$ this is $2.5\ \mathrm{m}$, a hundred diameters. **The additional "entrance" pressure drop over that length is roughly the extra kinetic-energy flux of the developing profile and is of order one velocity head**, and the reason a laminar-flow device's pressure budget carries an extra $\tfrac{1}{2} \rho V^2$ per inlet is this and not a fudge.
:::

::: definition Turbulent flow and the Colebrook equation {#def-turbulent}
**The time-averaged momentum balance** for fully developed pipe flow gives the **universal** wall law, exact for any turbulent flow regardless of the Reynolds-stress model:
$$
\tau_w = \frac{\Delta p\, R}{2 L}, \qquad u^{*} = \sqrt{\tau_w / \rho} = V \sqrt{f / 8}
$$
**The velocity-defect law and the log law.** With $y^+ = u^{*} y / \nu$ and $u^+ = \bar{u} / u^{*}$:
$$
u^+ = y^+ \quad \left( y^+ < 5,\ \text{viscous sublayer} \right), \qquad
u^+ = 2.44 \ln y^+ + 5.0 \quad \left( 30 < y^+ < 500 \right)
$$
**the von Kármán constant** $\kappa = 0.41$ and the intercept $B = 5.0$ for a hydraulically smooth wall. **The wake law** of **Coles** adds a wake function to cover the outer half:
$$
\frac{u_{\max} - \bar{u}}{u^{*}} = - \frac{1}{\kappa} \ln \left( \frac{y}{R} \right) + \frac{2 \Pi}{\kappa} f \left( \frac{y}{R} \right)
$$
**The one-seventh power law**, an empirical fit good to $\pm 5\ \%$ for $\mathrm{Re} < 10^5$:
$$
\frac{\bar{u}}{u_{\max}} = \left( \frac{y}{R} \right)^{1 / 7}, \qquad
f = 0.316\, \mathrm{Re}^{- 0.25} \quad \left( \text{Blasius, smooth, } \mathrm{Re} < 10^5 \right)
$$
**The roughness regimes.** With the **equivalent sand-grain roughness** $k_s$ made dimensionless as $k_s^+ = k_s u^* / \nu$:
$$
\begin{array}{l l l}
k_s^+ < 5 & \text{hydraulically smooth} & \text{the sublayer covers the roughness} \\
5 < k_s^+ < 70 & \text{transitional} & \text{both mechanisms contribute} \\
k_s^+ > 70 & \text{fully rough} & f \text{ independent of } \mathrm{Re}
\end{array}
$$
**The Colebrook–White equation**, the correlation that carries the whole of engineering pipe hydraulics:
$$
\boxed{ \frac{1}{\sqrt{f}} = - 2 \log_{10} \left( \frac{k_s / D}{3.7} + \frac{2.51}{\mathrm{Re} \sqrt{f}} \right) }
$$
**The two explicit approximations worth memorising:**
$$
f = \frac{0.25}{\left[ \log_{10} \left( \frac{k_s / D}{3.7} + \frac{5.74}{\mathrm{Re}^{0.9}} \right) \right]^2}
\quad \text{(Swamee–Jain, } \pm 1\ \% \text{)}
\qquad
\frac{1}{\sqrt{f}} = - 1.8 \log_{10} \left[ \left( \frac{k_s / D}{3.7} \right)^{1.11} + \frac{6.9}{\mathrm{Re}} \right]
\quad \text{(Haaland, } \pm 1.5\ \% \text{)}
$$
**The number that makes the roughness the design variable and not the Reynolds number.** For commercial steel $k_s = 0.046\ \mathrm{mm}$; in a $100\ \mathrm{mm}$ pipe $k_s / D = 4.6 \times 10^{- 4}$ and the fully-rough limit is $f = 0.0164$. **At $\mathrm{Re} = 10^5$ the Colebrook value is $0.0202$ — $23\ \%$ above the asymptote; at $\mathrm{Re} = 10^7$ it is $0.0164$, on the asymptote.** In a $1{,}000\ \mathrm{mm}$ pipe the same material gives $k_s / D = 4.6 \times 10^{- 5}$, an asymptote of $f = 0.0104$ and a Colebrook value at $\mathrm{Re} = 10^7$ of $0.0107$. **The reason a large-bore pipeline's friction factor is nearly independent of flow rate is that it is hydraulically near-rough, and the reason a small-bore building services pipe's is not is that it is transitional — which is why the same "assume $f = 0.02$" rule of thumb is right in one and wrong by a factor of two in the other.**
:::

::: widget plot
f: 0.25/pow(log10(5.74/pow(x,0.9)),2); 0.25/pow(log10(0.0001+5.74/pow(x,0.9)),2); 0.25/pow(log10(0.001+5.74/pow(x,0.9)),2)
x: 4000, 100000000
y: 0.005, 0.075
labels: smooth pipe; ks/D = 0.00037; ks/D = 0.0037
caption: The turbulent part of the **Moody chart** — Darcy friction factor against Reynolds number on log-log axes, from the Swamee–Jain explicit form of the Colebrook equation. **The smooth-pipe curve falls without limit** (Blasius' $\mathrm{Re}^{-0.25}$ is the approximation to it); **each roughness curve falls and then flattens to a horizontal asymptote** $f = \left[ 2 \log_{10} \left( 3.7 D / k_s \right) \right]^{-2}$, above which the friction factor is independent of flow rate. **The number that makes the flattening the whole point of pipeline design:** for $k_s / D = 0.0037$ the asymptote is $f = 0.0278$ and it is reached by $\mathrm{Re} \approx 10^7$; for the smooth pipe $f$ at $\mathrm{Re} = 10^8$ is still $0.0060$ and still falling. **A rough pipe at high Reynolds number cannot be improved by running slower — the head loss is exactly proportional to $V^2$ and no flow reduction changes the friction factor — whereas a smooth pipe's friction factor falls as it is slowed, so a variable-speed retrofit saves more than the cube law predicts.**
:::

## Losses, systems and networks

::: definition Minor losses and the loss budget {#def-minor}
**The form of every minor loss:**
$$
h_m = K \frac{V^2}{2 g}
$$
**with $V$ the velocity in the pipe to which the coefficient is referred — and the reference is the whole difficulty.**
$$
\begin{array}{l c l}
\text{Sharp-edged entrance, square} & K = 0.50 & \text{vena contracta } C_c = 0.62 \\
\text{Rounded entrance, } r / D > 0.1 & K = 0.05 & \\
\text{Sudden contraction, area ratio } 0.5 & K = 0.38 & \\
\text{Sudden enlargement} & K = \left( 1 - A_1 / A_2 \right)^2 & \text{Borda–Carnot, exact} \\
\text{Sharp-edged exit} & K = 1.00 & \text{the whole exit kinetic head} \\
\text{90}^{\circ} \text{ plain bend, } R / D = 1 & K = 0.20 & \\
\text{90}^{\circ} \text{ flanged elbow, long radius} & K = 0.20 & \\
\text{45}^{\circ} \text{ w} \check{\text{e}} \text{e, standard} & K = 0.30 & \\
\text{Tee, run} & K = 0.40 & \\
\text{Tee, branch} & K = 1.80 & \text{referred to the branch velocity} \\
\text{Globe valve, full open} & K = 10 & \text{but } 100 \text{ near the seat} \\
\text{Gate valve, full open} & K = 0.15 & \\
\text{Swing check, full open} & K = 2.0 & \\
\text{Butterfly, full open} & K = 0.6 & \\
\text{90}^{\circ} \text{ mitre bend} & K = 1.1 &
\end{array}
$$
**The number that makes the table a design tool and not a list.** For a $50\ \mathrm{m}$ run of $100\ \mathrm{mm}$ pipe with two $90^\circ$ elbows, a tee branch, a globe valve and a sharp exit:
$$
\sum K = 2 \times 0.20 + 1.80 + 10 + 1.0 + 0.5 = 13.7
\qquad
f L / D = 0.0182 \times 500 = 9.1
$$
**the fittings are $60\ \%$ of the total loss**, and the reason a plant's "pipework losses" line in an energy balance is not a rounding item is that in short, fitting-rich runs — which is most of a building, a ship's engine room and a process skid — **the fittings dominate and the pipe is the minor loss**.
**The equivalent length.** $L_e / D = K / f$, so a globe valve at $f = 0.018$ is $556$ diameters of pipe — **$56\ \mathrm{m}$ of $100\ \mathrm{mm}$ line**. **The reason a valve's catalogue quotes an $L_e / D$ is that it is roughly independent of Reynolds number while $K$ is not**, and the reason the two conventions differ by a factor of two between catalogues is that some quote the value at the valve's own bore and some at the pipe's.
**The velocity-head trap.** A $K$ referred to a **reduced** bore must be multiplied by $\left( D_{\mathrm{valve}} / D_{\mathrm{pipe}} \right)^4$ to be used at the pipe velocity — **a factor of $16$ for a valve one size down**, and the reason a reduced-trim control valve's published $K$ is a trap for the reader who does not check the reference diameter.
:::

::: definition System curves, pumps and operating points {#def-system}
**The system curve.** The head the pump must supply at flow $Q$:
$$
H_{\mathrm{sys}} \left( Q \right) = \Delta z + \frac{\Delta p}{\rho g} + \left( \frac{f L}{D} + \sum K \right) \frac{V^2}{2 g}
= \Delta z + \frac{\Delta p}{\rho g} + C Q^2
$$
**with $C$ the resistance constant, whose units are $\mathrm{s^2 / m^5}$ and whose value is the whole of the hydraulic design.**
**The operating point** is the intersection with the pump curve $H_p \left( Q \right)$, and the **stability** criterion is
$$
\frac{d H_p}{d Q} < \frac{d H_{\mathrm{sys}}}{d Q} = 2 C Q
\qquad \text{(a stable intersection)}
$$
**A pump whose curve is flatter than the system's at the crossing is unstable and surges**, and the reason a set of pumps in parallel must have **drooping** curves is precisely this inequality.
**The three system types, which behave completely differently.**
$$
\begin{array}{l l l}
\text{Static-dominated} & \Delta z / H_{\mathrm{sys}} > 0.7 & \text{delivery to a reservoir; flow barely changes with pump speed} \\
\text{Friction-dominated} & \Delta z \approx 0 & \text{a cooling loop; } Q \propto N \text{ and } P \propto N^3 \text{ hold well} \\
\text{Mixed} & 0.3 < \Delta z / H < 0.7 & \text{most real systems; the affinity laws are only approximate}
\end{array}
$$
**The number that makes a variable-speed retrofit's savings computable.** For a friction-dominated loop the affinity law gives $P \propto N^3$, so a $20\ \%$ speed reduction saves $49\ \%$ of the power. **For a static-dominated system the same speed reduction saves almost nothing and can stall the pump** — at a static head of $40\ \mathrm{m}$ and a design head of $45\ \mathrm{m}$, a $20\ \%$ speed reduction gives a shut-off head of $28.8\ \mathrm{m}$ and **zero flow**. **The number to compute before specifying a variable-speed drive is $\Delta z / H_{\mathrm{design}}$, and the reason a VSD retrofit that saves $45\ \%$ on one plant saves nothing on the next is that ratio and not the pump.**
:::

## Worked cases

::: example The canonical calculation {#ex-single}
Find the head loss and the pressure drop for $0.020\ \mathrm{m^3 / s}$ of water at $20\ {}^{\circ}\mathrm{C}$ through $200\ \mathrm{m}$ of $100\ \mathrm{mm}$ commercial-steel pipe.
::: solution
**The velocity and the Reynolds number.**
$$
V = \frac{0.020}{\pi \times 0.05^2} = \frac{0.020}{7.854 \times 10^{- 3}} = 2.546\ \mathrm{m / s}
\qquad
\mathrm{Re} = \frac{4 Q}{\pi \nu D} = \frac{4 \times 0.020}{\pi \times 1.004 \times 10^{- 6} \times 0.1} = 2.54 \times 10^5
$$
**The relative roughness.** $k_s = 0.046\ \mathrm{mm}$:
$$
\frac{k_s}{D} = \frac{0.046}{100} = 4.6 \times 10^{- 4}
$$
**The friction factor, by iteration on Colebrook.** Start with the Swamee–Jain value $f_0 = 0.01834$:
$$
\frac{1}{\sqrt{f}} = - 2 \log_{10} \left( \frac{4.6 \times 10^{- 4}}{3.7} + \frac{2.51}{2.54 \times 10^5 \sqrt{f}} \right)
$$
$$
\begin{array}{c c c c}
f & \mathrm{Re} \sqrt{f} & 2.51 / \left( \mathrm{Re} \sqrt{f} \right) & 1 / \sqrt{f} \ \text{from Colebrook} \\
0.01834 & 34{,}410 & 7.29 \times 10^{- 5} & 7.410 \\
0.01823 & 34{,}306 & 7.32 \times 10^{- 5} & 7.411 \\
0.01822 & & & 7.411 \quad \checkmark
\end{array}
$$
$$
\boxed{ f = 0.0182 }
$$
**The head loss.**
$$
h_f = f \frac{L}{D} \frac{V^2}{2 g} = 0.0182 \times \frac{200}{0.1} \times \frac{2.546^2}{2 \times 9.81}
= 0.0182 \times 2{,}000 \times 0.3307 = 12.0\ \mathrm{m}
$$
**The pressure drop.**
$$
\Delta p = \rho g h_f = 998 \times 9.81 \times 12.0 = 117.6\ \mathrm{kPa} = 1.18\ \mathrm{bar}
$$
**The wall shear stress and the roughness regime.**
$$
\tau_w = \frac{\Delta p\, R}{2 L} = \frac{117{,}600 \times 0.05}{400} = 14.7\ \mathrm{Pa}, \qquad
u^{*} = V \sqrt{f / 8} = 2.546 \times 0.0477 = 0.1216\ \mathrm{m / s}
$$
$$
k_s^+ = \frac{k_s u^{*}}{\nu} = \frac{4.6 \times 10^{- 5} \times 0.1216}{1.004 \times 10^{- 6}} = 5.6
$$
**Transitionally rough, just above the hydraulically-smooth limit of $5$** — and the reason a $20\ \%$ error in $k_s$ produces only a $4\ \%$ error in $f$ here is that the flow is near the smooth regime, whereas in a $1{,}000\ \mathrm{mm}$ pipe at the same velocity $k_s^+ = 17$ and the same $20\ \%$ roughness uncertainty gives a $12\ \%$ error in $f$.
**The pumping power.**
$$
P = \frac{\rho g Q h_f}{\eta} = \frac{998 \times 9.81 \times 0.020 \times 12.0}{0.70} = 3{,}355\ \mathrm{W}
$$
**The number that makes the number worth memorising.** $12\ \mathrm{m}$ of head over $200\ \mathrm{m}$ is a gradient of **$60\ \mathrm{mm}$ per metre of pipe**, and the reason a district-heating designer quotes a **maximum allowable pressure gradient** of $50$ to $100\ \mathrm{mm\, H_2O}$ per metre is that the pump head available is set by the pressure rating of the network and the number of boost stations, and the gradient is the only way to compare routes.
*Sanity.* The reason the answer is insensitive to the choice of explicit approximation is that all three agree to $1.5\ \%$ here: Colebrook $0.01822$, Swamee–Jain $0.01834$, Haaland $0.01807$. **The reason the answer is highly sensitive to $k_s$ is different — it is the regime, not the arithmetic** — and the reason a hydraulic calculation should always report $k_s^+$ is that it says which of the two sensitivities dominates.
:::
:::

::: example The operating point {#ex-operating}
The $200\ \mathrm{m}$ line is replaced by a $50\ \mathrm{m}$ run with the fittings of the loss budget above, and the system has a static lift of $25\ \mathrm{m}$. A pump with $H_p = 60 - 5{,}000 Q^2$ ($Q$ in $\mathrm{m^3 / s}$) is installed. Find the operating point, and the flow if a second identical pump is added in parallel.
::: solution
**The system curve.** With $\sum K = 13.7$ and $f L / D = 0.0182 \times 500 = 9.1$:
$$
H_{\mathrm{sys}} = 25 + \left( 9.1 + 13.7 \right) \frac{V^2}{2 g}, \qquad
V = \frac{Q}{7.854 \times 10^{- 3}} = 127.3\, Q
$$
$$
\frac{V^2}{2 g} = \frac{16{,}205\, Q^2}{19.62} = 826\, Q^2
\qquad \Rightarrow \qquad
H_{\mathrm{sys}} = 25 + 22.8 \times 826\, Q^2 = 25 + 18{,}830\, Q^2
$$
**The single-pump operating point.**
$$
60 - 5{,}000\, Q^2 = 25 + 18{,}830\, Q^2
\quad \Rightarrow \quad 35 = 23{,}830\, Q^2
\quad \Rightarrow \quad Q = 0.0383\ \mathrm{m^3 / s} = 138\ \mathrm{m^3 / h}
$$
$$
H = 60 - 5{,}000 \times 0.0383^2 = 60 - 7.3 = 52.7\ \mathrm{m}
$$
**The check that $f$ is right at this flow.** $V = 4.88\ \mathrm{m / s}$, $\mathrm{Re} = 4.86 \times 10^5$, $f = 0.0172$ — **$6\ \%$ below the assumed value**, giving $H_{\mathrm{sys}} = 25 + 17{,}600\, Q^2$ and $Q = 0.0393\ \mathrm{m^3 / s}$. **One iteration is enough and the answer is $Q = 0.039\ \mathrm{m^3 / s}$, $H = 52.3\ \mathrm{m}$.**
**Two pumps in parallel.** Each delivers $Q / 2$ at the common head $H$:
$$
H = 60 - 5{,}000 \left( \frac{Q}{2} \right)^2 = 60 - 1{,}250\, Q^2
\qquad \Rightarrow \qquad 60 - 1{,}250\, Q^2 = 25 + 17{,}600\, Q^2
$$
$$
35 = 18{,}850\, Q^2 \quad \Rightarrow \quad Q = 0.0431\ \mathrm{m^3 / s} = 155\ \mathrm{m^3 / h}
$$
**The number that makes the parallel-pump result a surprise every time.** **Doubling the pumps increases the flow by $10\ \%$ and not by $100\ \%$.** The reason is the static head: at $25\ \mathrm{m}$ of the $52.3\ \mathrm{m}$ total, **$48\ \%$ of the head does not vary with flow**, and a pump added in parallel must supply that head at zero additional flow. **The rule is that parallel pumps add flow in a friction-dominated system and add nothing in a static-dominated one**, and the reason a water-treatment works' high-lift station is designed with **series** pumps and a variable-speed first stage is that its static head is $85\ \%$ of the duty.
**Two pumps in series.** Each supplies $H / 2$ at the full flow:
$$
\frac{H}{2} = 60 - 5{,}000\, Q^2 \quad \Rightarrow \quad H = 120 - 10{,}000\, Q^2
\qquad \Rightarrow \qquad 120 - 10{,}000\, Q^2 = 25 + 17{,}600\, Q^2
$$
$$
Q = 0.0649\ \mathrm{m^3 / s} = 234\ \mathrm{m^3 / h}, \qquad H = 78.0\ \mathrm{m}
$$
**Series gives $69\ \%$ more flow than parallel for this system** — and the reason a mine dewatering installation and a high-rise's booster train are series arrangements is that their head requirement is large and their flow requirement is set by the demand, not by the pipe.
*Sanity.* The reason the parallel case gives so little is verifiable without the arithmetic: the system curve at zero flow starts at $25\ \mathrm{m}$, and the pump curve at $Q = 0.038$ has fallen only $7.3\ \mathrm{m}$ from its shut-off value — **the pump is running near the flat part of its curve where extra head buys almost no flow**. **The diagnostic is the ratio of the static head to the shut-off head**: at $25 / 60 = 0.42$ the system is static-dominated and parallel pumps are the wrong answer, and the reason a pump-selection software's first output should be that ratio is that it decides the configuration before any curve is drawn.
:::
:::

::: example Water hammer {#ex-hammer}
A $500\ \mathrm{m}$ run of $300\ \mathrm{mm}$ steel pipe ($e = 12\ \mathrm{mm}$, $E = 200\ \mathrm{GPa}$) carries $0.25\ \mathrm{m^3 / s}$ of water and is shut by a check valve at the downstream end. Find the wave speed, the Joukowsky pressure rise, the critical time, and state whether the valve closure is "instantaneous".
::: solution
**The wave speed.** The **Korteweg** formula, which accounts for the pipe's elasticity:
$$
a = \sqrt{\frac{K_w / \rho}{1 + \dfrac{K_w}{E} \dfrac{D}{e}}}
\qquad K_w = 2.2\ \mathrm{GPa}, \quad \rho = 998
$$
$$
\frac{K_w}{\rho} = 2.204 \times 10^6, \qquad
\frac{K_w}{E} \frac{D}{e} = \frac{2.2}{200} \times \frac{0.300}{0.012} = 0.011 \times 25 = 0.275
$$
$$
a = \sqrt{\frac{2.204 \times 10^6}{1.275}} = \sqrt{1.729 \times 10^6} = 1{,}315\ \mathrm{m / s}
$$
**against $1{,}481\ \mathrm{m / s}$ for water in a rigid pipe** — **the pipe's elasticity cuts the wave speed by $11\ \%$**, and the reason a **plastic** pressure pipe's surge pressures are so much lower is that the same factor is $K_w / E \times D / e = 2.2 / 1.4 \times 0.3 / 0.02 = 23.6$, giving $a = 298\ \mathrm{m / s}$, a factor of five reduction.
**The Joukowsky pressure rise.**
$$
V = \frac{0.25}{\pi \times 0.15^2} = 3.54\ \mathrm{m / s}
\qquad
\Delta p = \rho a V = 998 \times 1{,}315 \times 3.54 = 4.65\ \mathrm{MPa} = 46.5\ \mathrm{bar}
$$
**The equivalent head** $\Delta H = a V / g = 1{,}315 \times 3.54 / 9.81 = 474\ \mathrm{m}$ of water.
**The critical time.**
$$
t_c = \frac{2 L}{a} = \frac{2 \times 500}{1{,}315} = 0.76\ \mathrm{s}
$$
**A closure faster than $0.76\ \mathrm{s}$ is "instantaneous" and produces the full Joukowsky rise; a slower closure produces proportionally less**, to the first approximation $\Delta p \left( t \right) = \rho a V \times t_c / t$ for $t > t_c$.
**The number that makes the check valve the failure and not the pump.** A check valve closes on **reverse** flow, and the reverse flow at the moment of closure is set by the downstand's hydraulics — typically $0.5$ to $1.0\ \mathrm{m / s}$, giving $\Delta p = 0.66$ to $1.3\ \mathrm{MPa}$. **The slam of a $300\ \mathrm{mm}$ swing check has been measured at $30\ \mathrm{MPa}$ locally**, because the disc's last few degrees of travel accelerate the closing water column and the impact is a **local** pressure spike an order of magnitude above the column-water-hammer value. **The reason a non-slam check with a dashpot or a spring costs $200\ \%$ more than a swing check and is specified on every pumping main over $200\ \mathrm{mm}$ is that the pipe's pressure rating is a hoop-stress limit and a $30\ \mathrm{MPa}$ spike exceeds it by a factor of three.**
**The protection.**
$$
\begin{array}{l l}
\text{Surge vessel (gas or bladder)} & \text{effective for } L > 1\ \mathrm{km},\ \text{the upsurge and the downsurge} \\
\text{Air vessel} & \text{the classic; needs an air compressor and a float valve} \\
\text{Surge tank (open)} & \text{only where a site allows an open column} \\
\text{Slow-closing valve} & \text{a } 30\ \mathrm{s}\text{–}60\ \mathrm{s}\text{ closure on the pump's discharge valve} \\
\text{Pump-side non-return with a dashpot} & \text{attacks the slam and not the column} \\
\text{Pressure-relief valve} & \text{a last line, and only for the upsurge} \\
\text{Break-pressure tank} & \text{the only defence against the downsurge column separation}
\end{array}
$$
**The number that makes the downsurge the dangerous half.** The minimum pressure along the line after a pump trip falls to the vapour pressure at some point, **the column separates**, and when the two columns rejoin the pressure spike is **larger than the Joukowsky value for the original flow**. For a line with a profile high point $40\ \mathrm{m}$ above the pump, the static head at the high point is $-40\ \mathrm{m}$ and the downsurge of a few metres brings it to cavitation. **The reason a break-pressure tank at the high point costs almost nothing and eliminates the worst failure mode is that it makes the pressure there atmospheric by construction.**
*Sanity.* The reason $\Delta H = a V / g$ is independent of the pipe length and the material is that the Joukowsky rise is a **local** momentum statement — the mass $\rho A\, a\, dt$ brought to rest in $dt$ — and not a wave-propagation result. **The length and the material enter only through the critical time and the wave speed**, and the reason a surge analysis of a $20\ \mathrm{km}$ line is a distributed, friction-inclusive, cavitation-capable simulation while a $200\ \mathrm{m}$ line can be checked on a napkin is that in the long line the wave returns many times before it has decayed.
:::
:::

::: example Non-circular ducts {#ex-duct}
Air at $20\ {}^{\circ}\mathrm{C}$ flows at $1.2\ \mathrm{m^3 / s}$ through a $600 \times 400\ \mathrm{mm}$ rectangular duct of galvanised steel, $40\ \mathrm{m}$ long. Find the pressure loss, and compare it with that of a circular duct of the same cross-sectional area and of the same wetted perimeter.
::: solution
**The hydraulic diameter.**
$$
A = 0.6 \times 0.4 = 0.24\ \mathrm{m^2}, \qquad
P = 2 \left( 0.6 + 0.4 \right) = 2.0\ \mathrm{m}, \qquad
D_h = \frac{4 A}{P} = \frac{0.96}{2.0} = 0.48\ \mathrm{m}
$$
**The circular equivalent on area** is $D_A = \sqrt{4 A / \pi} = 0.553\ \mathrm{m}$; **on perimeter** $D_P = P / \pi = 0.637\ \mathrm{m}$.
**The loss.** $V = 1.2 / 0.24 = 5.0\ \mathrm{m / s}$, $\nu = 1.509 \times 10^{- 5}$:
$$
\mathrm{Re} = \frac{5.0 \times 0.48}{1.509 \times 10^{- 5}} = 1.59 \times 10^5, \qquad
\frac{k_s}{D_h} = \frac{0.15}{480} = 3.1 \times 10^{- 4}
$$
$$
f = 0.0183 \quad \text{(Colebrook)}, \qquad
h_f = 0.0183 \times \frac{40}{0.48} \times \frac{5.0^2}{2 \times 9.81} = 0.0183 \times 83.3 \times 1.274 = 1.94\ \mathrm{m\, H_2O} = 19.0\ \mathrm{Pa}
$$
**The circular duct on area** ($D = 0.553\ \mathrm{m}$, $V = 5.0\ \mathrm{m / s}$):
$$
\mathrm{Re} = 1.83 \times 10^5, \quad f = 0.0181, \qquad
h_f = 0.0181 \times 72.3 \times 1.274 = 1.67\ \mathrm{m\, H_2O} = 16.4\ \mathrm{Pa}
$$
**The circular duct on perimeter** ($D = 0.637\ \mathrm{m}$, $A = 0.319\ \mathrm{m^2}$, $V = 3.76\ \mathrm{m / s}$):
$$
\mathrm{Re} = 1.59 \times 10^5, \quad f = 0.0186, \qquad
h_f = 0.0186 \times 62.8 \times 0.720 = 0.84\ \mathrm{m\, H_2O} = 8.2\ \mathrm{Pa}
$$
**The reading.** The rectangular duct loses **$16\ \%$ more** than the same-area circle and **$130\ \%$ more** than the same-perimeter circle. **The same-area comparison is the one that matters for a shaft or a ceiling void, and the same-perimeter comparison is the one that matters for sheet-metal cost** — and the reason a ventilation designer's duct is nearly always as close to square as the space allows is that the perimeter sets the material and the aspect ratio sets the friction, with a minimum in friction per unit area at an aspect ratio of about $1.6$.
**The number that makes the aspect ratio a cost curve.** For a fixed area $A$ and aspect ratio $r$, $P = 2 \sqrt{A} \left( \sqrt{r} + 1 / \sqrt{r} \right)$, so relative to a square:
$$
\begin{array}{c c c c c}
r & 1 & 2 & 4 & 10 \\
P / P_{\text{square}} & 1.00 & 1.06 & 1.25 & 1.94 \\
\text{friction per unit length} & 1.00 & 1.05 & 1.21 & 1.82
\end{array}
$$
**a $10{:}1$ flat duct costs twice the sheet metal and nearly twice the fan power of a square one of the same area** — and the reason a "flat" duct is nevertheless used above a ceiling is that the friction can be recovered by shortening the run, and the ceiling void's depth is not negotiable.
**The laminar warning.** If this duct ran at $\mathrm{Re} < 2{,}300$ on $D_h$ — for example in a clean-room's terminal at $0.02\ \mathrm{m^3 / s}$ — the hydraulic diameter would give $f\mathrm{Re} = 64$ while the true rectangular value at an aspect ratio of $1.5$ is $f\mathrm{Re} = 62$, and at an aspect ratio of $20$ it is $53$. **The error is up to $20\ \%$ and always in the direction of understating the loss for a flat duct.**
*Sanity.* The reason the hydraulic diameter works at all in turbulent flow is that the turbulent boundary layer grows from each wall independently and the **wall shear** is set by the local layer and not by the duct's shape, so the total drag is $\tau_w P L$ and only $P / A$ enters. **In laminar flow the whole section participates and the shape enters through the velocity profile's form**, which is why the exact result depends on $r$ and not on $D_h$.
:::
:::

::: history
**Darcy** measured pipe friction between **1854 and 1857** in the aqueduct mains of **Dijon**, and the friction factor is his and not Moody's; **Poiseuille**'s laminar law is of **1840** and was measured on tubes of drawn **capillary glass** with mercury manometers and a graduated tube, at flow rates he set by the height of a constant-head tank. **Nikuradse**'s 1933 dissertation, supervised by **Prandtl** at Göttingen, glued **uniform sand grains** to the inside of pipes in eight graded sizes and produced the diagram that made the roughness concept quantitative; **the third volume of *Forschungsheft* 356 ran to fewer than two hundred copies and was unknown in English until the NACA translation of 1950**, by which time its content had been reinvented several times. **Colebrook** was a **British** engineer working on the **London** water works, and his 1939 paper — thirty-one pages, of which the equation is one line and the rest is a discussion of what to do about **ageing** — is the most-used equation in fluid mechanics and was written without a computer, by hand-fitting to **2,000** data points. **Moody**'s 1944 *Transactions of the ASME* chart was a **practitioner's** document and is the most-reproduced figure in engineering; **Rouse** and **Ranga Raju** produced the open-channel analogue in the 1960s. **The Hazen–Williams formula of 1905 and the Manning formula of 1890 remain in use in water-supply and open-channel practice respectively, and both are dimensionally inhomogeneous** — a fact that **Frederick** and **Eagson** demonstrated in a 1968 paper recommending their abolition, which was not adopted. **The equivalent sand-grain roughness is a fiction that works: no commercial pipe has sand grains, and no two authors agree on the value for the same material, which is why a hydraulic calculation should report its assumed $k_s$ and its $k_s^+$ and not only its answer.**
:::

## Where this leads

The same loss budget with a compressibility correction is [[fluid-mechanics/compressible-flow]]; the unsteady version of the last worked case is the whole of [[fluid-mechanics]]' surge analysis and [[energy-systems]]' hydro penstock design; the network solution is [[energy-systems]]' district-heating and [[manufacturing]]'s compressed-air design; the two-phase version is [[propulsion]]'s fuel and [[energy-systems]]' steam lines; and the open-channel limit — the same equations with a free surface and the Froude number in place of the Reynolds number as the governing group — is the river and canal hydraulics of the Earth atlas.

::: summary
- Laminar: $f = 64 / \mathrm{Re}$, $h_f \propto V \mu$, no density. Turbulent smooth: $f \sim \mathrm{Re}^{-0.2}$. Fully rough: $f$ constant.
- The Colebrook equation is a correlation, not a law; its explicit forms are good to $1.5\ \%$ and its roughness input is good to a factor of two.
- Always report $k_s^+ = k_s u^* / \nu$: it says whether the answer is roughness-sensitive or not.
- $h_f = f \left( L / D \right) V^2 / 2g$ is Darcy; $\tau_w = f \rho V^2 / 2$ is Fanning; they differ by four.
- Minor losses are referred to a stated velocity head; a reduced bore multiplies the published $K$ by $\left( D_v / D \right)^4$.
- The system curve's static-head fraction decides whether parallel pumps, series pumps or a variable speed are the right answer.
- Joukowsky: $\Delta p = \rho a V$, $a$ from Korteweg, critical time $2 L / a$. The downsurge and the check-valve slam are the dangerous half.
- The hydraulic diameter is valid in turbulent flow and wrong in laminar.
:::

## Exercises

::: exercise Laminar {level=1 check="0.10"}
Give the Darcy friction factor for laminar pipe flow at $\mathrm{Re} = 640$.
::: solution
$f = 64 / \mathrm{Re} = 64 / 640 = 0.10$.
:::
:::

::: exercise Velocity {level=1 check="2.55"}
Give the mean velocity in metres per second for $0.020\ \mathrm{m^3/s}$ in a $100\ \mathrm{mm}$ bore pipe.
::: solution
$V = Q/A = 0.020 / 0.007854 = 2.55\ \mathrm{m/s}$.
:::
:::

::: exercise Reynolds number {level=1 check="2.54"}
Give the Reynolds number (in units of $10^5$) for the previous flow in water at $20\ {}^{\circ}\mathrm{C}$ ($\nu = 1.004 \times 10^{-6}\ \mathrm{m^2/s}$).
::: solution
$\mathrm{Re} = VD/\nu = 2.546 \times 0.1 / 1.004 \times 10^{-6} = 2.54 \times 10^5$.
:::
:::

::: exercise Head loss {level=1 check="12.0"}
Give the head loss in metres for $f = 0.0182$, $L = 200\ \mathrm{m}$, $D = 0.1\ \mathrm{m}$, $V = 2.546\ \mathrm{m/s}$.
::: solution
$h_f = 0.0182 \times 2000 \times 2.546^2 / 19.62 = 12.0\ \mathrm{m}$.
:::
:::

::: exercise Shear velocity {level=1 check="0.122"}
Give the shear (friction) velocity in metres per second for $V = 2.546\ \mathrm{m/s}$ and $f = 0.0182$.
::: solution
$u^* = V \sqrt{f/8} = 2.546 \times 0.0477 = 0.122\ \mathrm{m/s}$.
:::
:::

::: exercise Wave speed {level=1 check="1315"}
Give the pressure-wave speed in metres per second in a steel pipe of $300\ \mathrm{mm}$ bore and $12\ \mathrm{mm}$ wall, with $K_w = 2.2\ \mathrm{GPa}$ and $E = 200\ \mathrm{GPa}$.
::: solution
$a = \sqrt{(K_w / \rho) / \left( 1 + \left( K_w / E \right) D / e \right)} = \sqrt{2.204 \times 10^6 / 1.275} = 1{,}315\ \mathrm{m/s}$.
:::
:::

::: exercise Hydraulic diameter {level=1 check="0.48"}
Give the hydraulic diameter in metres of a $600 \times 400\ \mathrm{mm}$ rectangular duct.
::: solution
$D_h = 4 A / P = 4 \times 0.24 / 2.0 = 0.48\ \mathrm{m}$.
:::
:::

::: exercise Entrance length {level=2}
Estimate the hydrodynamic entrance length for turbulent flow in a $150\ \mathrm{mm}$ pipe, and state the error in the total loss if a $12\ \mathrm{m}$ run is computed as fully developed.
::: solution
$$
L_e \approx 10 D \text{ to } 60 D \quad \Rightarrow \quad 1.5\ \mathrm{m} \text{ to } 9\ \mathrm{m}
$$
Taking $L_e \approx 30 D = 4.5\ \mathrm{m}$ and an average entrance friction factor $1.4 f$, the entrance region contributes $1.4 \times 4.5 / 12 = 53\ \%$ of the "fully developed" loss for the same length, so the total is
$$
\frac{1.4 \times 4.5 + \left( 12 - 4.5 \right)}{12} = \frac{6.3 + 7.5}{12} = 1.15
$$
**a $15\ \%$ understatement**, and the reason a short-run hydraulic calculation on a fitting-rich skid carries a $20\ \%$ margin is that the entrance, the fittings' interaction and the swirl from the last bend all act in the same direction.
:::
:::

::: exercise Roughness regime {level=2}
A $600\ \mathrm{mm}$ concrete pipe ($k_s = 0.5\ \mathrm{mm}$) carries water at $1.5\ \mathrm{m/s}$. Give $k_s^+$ and state the roughness regime, and comment on the sensitivity of the answer to $k_s$.
::: solution
$$
\mathrm{Re} = \frac{1.5 \times 0.6}{1.004 \times 10^{- 6}} = 8.96 \times 10^5, \qquad
\frac{k_s}{D} = 8.33 \times 10^{- 4}, \qquad f \approx 0.0185
$$
$$
u^{*} = 1.5 \sqrt{0.0185 / 8} = 0.0722\ \mathrm{m / s}, \qquad
k_s^+ = \frac{5 \times 10^{- 4} \times 0.0722}{1.004 \times 10^{- 6}} = 36
$$
**Transitional** ($5 < k_s^+ < 70$), and roughly midway between the regimes. **A $\pm 50\ \%$ uncertainty in $k_s$ moves $f$ by about $\pm 8\ \%$** — the reason concrete-pipe design uses the **Manning** $n$ with a range and not the Colebrook equation with a point value is that the roughness of real concrete depends on the finish, the jointing and the age, and spans a factor of three.
:::
:::

::: exercise Derivation {level=3}
Derive the Borda–Carnot loss for a sudden enlargement, $K = \left( 1 - A_1 / A_2 \right)^2$, from the momentum and continuity equations, and state where the assumption breaks.
::: solution
**Continuity.** $Q = A_1 V_1 = A_2 V_2$.
**The momentum equation** across the enlargement, taking the control volume from section 1 to section 2 and **assuming the pressure on the annular face at section 1 equals $p_1$ over the whole of the step**:
$$
p_1 A_2 - p_2 A_2 = \rho Q \left( V_2 - V_1 \right)
$$
**The energy equation** between 1 and 2 with no loss inside the control volume except the one sought:
$$
\frac{p_1 - p_2}{\rho g} = \frac{V_2^2 - V_1^2}{2 g} + h_L
$$
**Substitute** $\left( p_1 - p_2 \right) / \rho = V_2 \left( V_2 - V_1 \right)$ from the momentum equation:
$$
\frac{V_2 \left( V_1 - V_2 \right)}{g} = \frac{V_2^2 - V_1^2}{2 g} + h_L
\quad \Rightarrow \quad
h_L = \frac{2 V_2^2 - 2 V_1 V_2 - V_2^2 + V_1^2}{2 g}
$$
$$
\boxed{ h_L = \frac{\left( V_1 - V_2 \right)^2}{2 g} }
$$
**Referred to the upstream velocity head**, with $V_2 = V_1 A_1 / A_2$:
$$
K = \left( 1 - \frac{A_1}{A_2} \right)^2
$$
**Referred to the downstream velocity head**, $K = \left( A_2 / A_1 - 1 \right)^2$ — **a factor of $\left( A_2 / A_1 \right)^2$ difference**, and the reason a diffuser's performance is quoted against the upstream head and an enlargement fitting's $K$ against the downstream one is that the two communities use different conventions.
**The limiting case.** $A_2 / A_1 \to \infty$ gives $K = 1$: **the whole upstream kinetic head is lost**, which is the sharp-edged exit loss. **The reading is that an exit is a sudden enlargement into a reservoir and the loss is the kinetic energy that leaves and never returns** — and the reason a well-rounded exit recovers most of it is that it turns the flow smoothly so that the kinetic energy is converted to pressure before the section closes.
**Where the assumption breaks.** The pressure on the step face is **not** $p_1$; it is closer to $p_2$ for a large area ratio and to $p_1$ for a small one, and the measured loss for $A_2 / A_1 = 2$ is $12\ \%$ below the formula. **The formula is exact in the limit $A_2 / A_1 \to \infty$ and in the limit $A_2 / A_1 \to 1$** (where the loss vanishes), and the reason it is used at all area ratios is that the error is everywhere in the **conservative** direction.
*Sanity.* The reason $h_L$ depends on $\left( V_1 - V_2 \right)^2$ and not on either velocity alone is that the loss is produced by the **shear layer** between the separated jet and the nearly stagnant fluid in the corners, and the shear layer's velocity difference is $V_1 - V_2$. **The same argument gives the mixing loss of two streams joining in a manifold**, where $h_L = \left( V_1 - V_2 \right)^2 \phi / 2g$ with $\phi$ a function of the flow split — and the reason a manifold's mixing loss can exceed its friction loss is that the streams arrive at very different velocities.
:::
:::

::: exercise Design {level=3}
Design the complete hydraulic system of a **$500\ \mathrm{kW}$ data-centre liquid-cooling loop** with a $38\ \mathrm{m}$ lift to a dry cooler, and state the pipe sizing, the pump selection, the control method and the acceptance tests.
::: solution
**The duty.**
$$
\dot{V} = \frac{500}{4.19 \times 8} = 14.9\ \mathrm{kg / s} = 0.0150\ \mathrm{m^3 / s} = 54\ \mathrm{m^3 / h}\quad \left( \Delta T = 8\ \mathrm{K} \right)
$$
**The pipe sizing.** Three candidate bores, at $\mathrm{Re}$ and $k_s = 0.045\ \mathrm{mm}$ for stainless or lined carbon steel:
$$
\begin{array}{l c c c c c}
D\ \left[ \mathrm{mm} \right] & V\ \left[ \mathrm{m / s} \right] & \mathrm{Re} & f & h_f\ \left[ \mathrm{m\, H_2O / 100\, m} \right] & \text{comment} \\
80 & 2.98 & 2.37 \times 10^5 & 0.0180 & 10.2 & \text{high gradient, erosion risk} \\
100 & 1.91 & 1.90 \times 10^5 & 0.0180 & 3.35 & \text{the economic choice} \\
125 & 1.22 & 1.52 \times 10^5 & 0.0186 & 1.13 & \text{over-sized, capital cost}
\end{array}
$$
**The number that sets the gradient.** The design target for a chilled- or condenser-water main is a friction gradient of **$2$ to $4\ \mathrm{m\, H_2O}$ per $100\ \mathrm{m}$**, that is $200$ to $400\ \mathrm{Pa}$ per metre, which is the economic optimum from a an installed pipe cost of $450\ \mathrm{currency / m}$ against an electricity price of $0.15\ \mathrm{currency / kWh}$ at $6{,}000\ \mathrm{h}$ of operation. **The $100\ \mathrm{mm}$ bore at $3.35\ \mathrm{m}$ per $100\ \mathrm{m}$ sits in the band; the $80\ \mathrm{mm}$ at $10.2\ \mathrm{m}$ per $100\ \mathrm{m}$ is a false economy and its friction loss is nine times the $125\ \mathrm{mm}$ option's.**
**The total head.**
$$
\begin{array}{l r}
\text{Static lift to the dry cooler} & 38.0\ \mathrm{m} \\
\text{Condenser pressure drop} \left( 60\ \mathrm{kPa} \right) & 6.1\ \mathrm{m} \\
\text{Pipe friction, } 120\ \mathrm{m} \text{ run at } 3.35\ \mathrm{m} / 100\ \mathrm{m} & 4.0\ \mathrm{m} \\
\text{Fittings, } \sum K = 18 \text{ at } V^2 / 2 g = 0.186\ \mathrm{m} & 3.4\ \mathrm{m} \\
\text{Strainer, balance valves, hose} & 5.0\ \mathrm{m} \\
\hline
\textbf{Design head} & \textbf{56.5}\ \mathrm{m} \quad \rightarrow \quad 58\ \mathrm{m}
\end{array}
$$
**The static-head fraction**: $38 / 58 = 0.66$ — **static-dominated**, which decides the control method.
**The pump.** Two identical pumps, each $100\ \%$ duty, one running and one standby:
$$
P_{\mathrm{hyd}} = \frac{998 \times 9.81 \times 0.0150 \times 58}{1{,}000} = 8.51\ \mathrm{kW}, \qquad
P_{\mathrm{shaft}} = \frac{8.51}{0.74} = 11.5\ \mathrm{kW}, \qquad
P_{\mathrm{motor}} = 15\ \mathrm{kW}
$$
**The number that makes the standby pump a sizing decision.** The standby must run the full duty alone, so the installed motor capacity is $30\ \mathrm{kW}$ and the running pump's load factor is $11.5 / 30 = 38\ \%$ — and the reason a data centre's pump room has a **$N + 1$** arrangement with a duty pump that is **not** the largest motor on the site is that the $N + 1$ is a reliability requirement and the load factor is an efficiency penalty the designer must accept and report.
**The control method.** With a static fraction of $0.66$, a variable-speed drive gives limited savings:
$$
\text{at } 80\ \% \text{ speed: } H_{\mathrm{shutoff}} = 0.64 \times 62 = 39.7\ \mathrm{m} \quad \text{against a static head of } 38\ \mathrm{m}
$$
**the pump can barely deliver at all below $80\ \%$ speed**, and the reason the correct answer is a **two-pip** low-$\Delta T$ distribution with **pressure-independent** control valves at each rack and a **bypass** maintaining a minimum pump flow, rather than a simple VSD on the pump. **The number that makes the two-pip system the right answer is the $8\ \mathrm{K}$ design $\Delta T$: at a $4\ \mathrm{K}$ part load the flow would have to double, and a two-pip system with $\Delta T$-reset keeps the flow near the design value and the pump near its best-efficiency point.**
**The transient check.** $L = 120\ \mathrm{m}$, $D = 100\ \mathrm{mm}$, steel $e = 4\ \mathrm{mm}$:
$$
\frac{K_w}{E} \frac{D}{e} = \frac{2.2}{200} \times 25 = 0.275, \qquad a = 1{,}315\ \mathrm{m / s}, \qquad
t_c = \frac{2 \times 120}{1{,}315} = 0.18\ \mathrm{s}
$$
**A rack's solenoid valve closing in $50\ \mathrm{ms}$ is instantaneous**, and $\Delta p = 998 \times 1{,}315 \times 1.91 = 2.5\ \mathrm{MPa} = 25\ \mathrm{bar}$ — **above the $16\ \mathrm{bar}$ rating of the pipework**. **The mitigation is a $500\ \mathrm{ms}$ closing time on every rack valve and a $12\ \mathrm{L}$ bladder vessel within $3\ \mathrm{m}$ of the manifold**, and the reason the surge check is done at the **rack** and not at the pump is that the fast-acting devices are at the racks.
**The acceptance tests.**
$$
\begin{array}{l l}
\text{Hydrostatic} & 1.5 \times \text{design pressure for } 2\ \mathrm{h}, \text{ no visible loss} \\
\text{Cleanliness} & \text{flushed to ISO } 4406\ 16\text{/}14\text{/}11, \text{ verified by particle count} \\
\text{Performance} & \text{duty point within } \pm 5\ \% \text{ of the certified curve at the design head} \\
\text{NPSH} & \text{measured } \mathrm{NPSH}_r \text{ at duty } < 3\ \mathrm{m}, \text{ available } > 6\ \mathrm{m} \\
\text{Noise} & < 75\ \mathrm{dB(A)} \text{ at } 1\ \mathrm{m}, < 45\ \mathrm{dB(A)} \text{ in the adjacent plant room} \\
\text{Control} & \text{stable at } 20\ \% \text{ to } 100\ \% \text{ of design flow without hunting} \\
\text{Surge} & \text{measured peak pressure on a rack-valve closure } < 1.25 \times \text{design}
\end{array}
$$
**The four clauses that protect the buyer.** **"THE PUMP SELECTION SHALL BE VERIFIED AGAINST A SYSTEM CURVE INCLUDING ALL TERMINAL DEVICES AT THEIR DESIGN FLOW AND AGAINST THE WORST-CASE PART-LOAD RESISTANCE."** **"THE INSTALLED MOTOR SHALL BE SIZED FOR THE END OF THE PUMP CURVE AND NOT FOR THE DUTY POINT."** **"EVERY FAST-ACTING VALVE SHALL HAVE A CLOSING TIME OF NOT LESS THAN TWO CRITICAL TIMES OR A LOCAL SURGE ARRESTER."** **"THE SYSTEM SHALL BE FLUSHED, CHEMICALLY CLEANED AND PASSIVATED BEFORE THE CHILLED-WATER CHARGE, AND THE WATER CHEMISTRY MAINTAINED TO THE STATED SPECIFICATION FOR THE LIFE OF THE INSTALLATION."**
*Design comment.* The general rule is that **a pump's energy is set by the system curve and the system curve is set by the pipe bore, so the pipe bore is the pump-efficiency decision and it is made on day one by a piping designer who is not paying the electricity bill** — which is why the specification must state the gradient target and the buyer must audit it before the supports are drawn.
:::
:::
