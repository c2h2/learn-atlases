Internal flow is the one branch of fluid mechanics in which the answer is **a chart and not a formula**, and the reason is turbulence: the friction factor of a rough pipe at high Reynolds number depends on a surface whose asperities are random in height and spacing, and no theory has been produced that computes it from the profile. What exists instead is a **correlation** — the Colebrook equation of **1939**, which blends **Nikuradse**'s **1933** measurements on sand-roughened pipes with Colebrook and White's tests on commercial pipes, and which **Moody** put into chart form in **1944** — and the whole of practical pipe-flow design is the disciplined use of that correlation together with an honest allowance for the fittings, the age and the roughness of the actual pipe.

The subject is worth its space because **pumping is one of the largest single uses of electricity in industry and building services, and much of that energy ends up as friction in pipes and fittings** — so the difference between a good and a mediocre hydraulic design shows up directly in the running cost.

::: warning Seven pipe-flow errors that double a pump's energy bill
**Confusing the Darcy and Fanning friction factors.** $f_{\mathrm{Darcy}} = 4 f_{\mathrm{Fanning}}$, and both are in current use — Fanning in chemical engineering and in most CFD post-processors, Darcy in civil and mechanical. **A factor of four in the head loss and a factor of four in the pump's power**, and the only defence is to write the definition every time: $h_f = f L V^2 / \left( 2 g D \right)$ is Darcy, $\tau_w = f \rho V^2 / 2$ is Fanning. **The check is laminar flow: $f_{\mathrm{Darcy}} = 64 / \mathrm{Re}$, $f_{\mathrm{Fanning}} = 16 / \mathrm{Re}$**, and any correlation you are handed can be identified in one line. **Using the hydraulic diameter outside the turbulent regime.** $D_h = 4 A / P$ collapses turbulent non-circular data to within a few per cent, and is **wrong in laminar flow** — based on $D_h$, a circular duct gives $f \mathrm{Re} = 64$, a wide parallel slot $96$, an equilateral triangle $53$, a square $57$, and a rectangular duct rises from $57$ at an aspect ratio of $1$ toward $96$ as the aspect ratio grows (about $82$ at $8 : 1$). **Using $D_h$ with $f = 64 / \mathrm{Re}$ for a laminar slot therefore underestimates the pressure drop by a third.** **Adding minor-loss coefficients computed at different velocities.** A tee's branch $K$ refers to the **branch** velocity head and its run $K$ to the **run** velocity head; a reducing bend's $K$ refers to the **lower** velocity; and a valve's $K$ refers to its own bore, which for a reduced-trim globe valve is not the pipe bore. **The sum $\sum K$ is meaningless unless every term is referred to one stated velocity**, and converting a branch $K$ to the run velocity head means multiplying it by $\left( V_{\mathrm{branch}} / V_{\mathrm{run}} \right)^2$. **Using the fully-rough friction factor at a transitional Reynolds number.** The fully-rough limit $f = \left[ 2 \log_{10} \left( 3.7 D / k_s \right) \right]^{- 2}$ is the asymptote of the Colebrook equation as $\mathrm{Re} \to \infty$, and at $\mathrm{Re} = 10^5$ it understates $f$ by $20$ to $40\ \%$ for a typical commercial-steel roughness. Designing on the asymptote is a deliberate conservatism in some codes, but it should be a stated choice, not an accident. **Forgetting the entrance length.** The hydrodynamic entrance length for turbulent flow is $L_e \approx 10 D$ to $60 D$ depending on the inlet condition and on how close to fully developed one requires the profile to be, and the average friction factor over the entrance region is **up to $50\ \%$ above** the fully developed value. **A $10D$ entrance in a $100D$ run is a $5\ \%$ error in the total loss**, and the reason a flow-meter's straight-run requirement of $10D$ upstream is a metrology requirement and not a hydraulics one is that the **profile**, not the loss, is what the meter needs. **Applying the Colebrook equation to a non-Newtonian or a multiphase fluid.** The correlation is for a single-phase Newtonian fluid in a pipe whose roughness is small compared with the viscous sublayer or large compared with it, and for neither of the two cases that occur most often in practice — **a drag-reducing polymer solution, for which the friction can be $70\ \%$ below the water value even in a rough pipe**, and **a slurry above the deposit velocity, for which it can be $50\ \%$ above the water value because of the additional solid-phase collision stress**. **A tailings line's designer therefore uses slurry methods such as Durand–Condolios or Wasp, not the Moody chart.** **Sizing a pump for the design flow at the design head and no other point.** A pump on a system curve operates where the two curves cross, and if the system has a large static head the crossing is robust; if it has little, the operating point moves a long way for a small change in roughness or demand. **A pumping station should therefore be specified with an operating range, not a single duty point**, and the motor sized for the highest flow it can reach — typically when the pipe is new and smooth and the system resistance lowest — not for the duty point.
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
h_f \propto V^1 & \text{not } V^2 \text{ — a laminar system curve is a straight line through the origin} \\
h_f \propto \mu^1 & \text{viscosity controls, so heating a heavy oil line is an energy trade} \\
\Delta p \propto \rho^0 \text{ at fixed } Q & \text{density drops out; the pressure drop depends only on } \mu
\end{array}
$$
**The number that makes the laminar limit a diagnostic.** For a fixed flow rate, $\Delta p = 128 \mu L Q / \left( \pi D^4 \right)$ contains **no density and no velocity** — so two fluids of the same viscosity but different density give the same pressure drop, and a **capillary viscometer** works because reading $\Delta p$ at a known $Q$ gives $\mu$ directly from the geometry.
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
**The number that makes the roughness the design variable and not the Reynolds number.** For commercial steel $k_s = 0.046\ \mathrm{mm}$; in a $100\ \mathrm{mm}$ pipe $k_s / D = 4.6 \times 10^{- 4}$ and the fully-rough limit is $f = 0.0164$. **At $\mathrm{Re} = 10^5$ the Colebrook value is $0.0202$ — $23\ \%$ above the asymptote; at $\mathrm{Re} = 10^7$ it is $0.0164$, on the asymptote.** In a $1{,}000\ \mathrm{mm}$ pipe the same material gives $k_s / D = 4.6 \times 10^{- 5}$, an asymptote of $f = 0.0104$ and a Colebrook value at $\mathrm{Re} = 10^7$ of $0.0107$. **A rule of thumb such as "assume $f = 0.02$" is therefore close for a $100\ \mathrm{mm}$ steel pipe at moderate Reynolds number and nearly double the true value ($0.0107$) for a $1{,}000\ \mathrm{mm}$ main at $\mathrm{Re} = 10^7$.**
:::

::: widget plot
f: 0.25/pow(log10(5.74/pow(x,0.9)),2); 0.25/pow(log10(0.0001+5.74/pow(x,0.9)),2); 0.25/pow(log10(0.001+5.74/pow(x,0.9)),2)
x: 4000, 100000000
y: 0.005, 0.075
labels: smooth pipe; ks/D = 0.00037; ks/D = 0.0037
caption: The turbulent part of the **Moody chart** — Darcy friction factor against Reynolds number on log-log axes, from the Swamee–Jain explicit form of the Colebrook equation. **The smooth-pipe curve falls without limit** (Blasius' $\mathrm{Re}^{-0.25}$ is the approximation to it); **each roughness curve falls and then flattens to a horizontal asymptote** $f = \left[ 2 \log_{10} \left( 3.7 D / k_s \right) \right]^{-2}$, above which the friction factor is independent of flow rate. **The number that makes the flattening the whole point of pipeline design:** for $k_s / D = 0.0037$ the asymptote is $f = 0.0278$ and it is reached by $\mathrm{Re} \approx 10^7$; for the smooth pipe $f$ at $\mathrm{Re} = 10^8$ is still $0.0060$ and still falling. **In the fully rough regime the head loss is exactly proportional to $V^2$, because the friction factor no longer changes with flow; a smooth pipe's friction factor rises as it is slowed ($h_f \propto V^{1.75}$ in the Blasius range), so a variable-speed retrofit on a friction-dominated smooth-pipe system saves slightly less than the cube law predicts.**
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
\text{45}^{\circ} \text{ elbow, standard} & K = 0.30 & \\
\text{Tee, run} & K = 0.40 & \\
\text{Tee, branch} & K = 1.80 & \text{referred to the branch velocity} \\
\text{Globe valve, full open} & K = 10 & \text{but } 100 \text{ near the seat} \\
\text{Gate valve, full open} & K = 0.15 & \\
\text{Swing check, full open} & K = 2.0 & \\
\text{Butterfly, full open} & K = 0.6 & \\
\text{90}^{\circ} \text{ mitre bend} & K = 1.1 &
\end{array}
$$
**The number that makes the table a design tool and not a list.** For a $50\ \mathrm{m}$ run of $100\ \mathrm{mm}$ pipe with two $90^\circ$ elbows, a tee branch, a globe valve, a sharp exit and a square entrance:
$$
\sum K = 2 \times 0.20 + 1.80 + 10 + 1.0 + 0.5 = 13.7
\qquad
f L / D = 0.0182 \times 500 = 9.1
$$
**the fittings are $60\ \%$ of the total loss** ($13.7 / 22.8$): in short, fitting-rich runs — most of a building, a ship's engine room or a process skid — **the "minor" losses dominate and the pipe friction is the minor one**.
**The equivalent length.** $L_e / D = K / f$, so a globe valve at $f = 0.018$ is $556$ diameters of pipe — **$56\ \mathrm{m}$ of $100\ \mathrm{mm}$ line**. Catalogues that quote $L_e / D$ (such as Crane's) pair it with the fully turbulent friction factor of clean pipe of that size, so that $K = f_T \left( L_e / D \right)$; check which friction factor and which bore a catalogue assumes before using its numbers.
**The velocity-head trap.** A $K$ referred to a **reduced** bore must be multiplied by $\left( D_{\mathrm{pipe}} / D_{\mathrm{valve}} \right)^4$ to be used with the pipe velocity — **a factor of $2.4$ for an $80\ \mathrm{mm}$ bore in a $100\ \mathrm{mm}$ line, and $16$ for half the bore** — which is why a reduced-trim control valve's published $K$ is a trap for the reader who does not check the reference diameter.
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
**A pump whose head rises with flow at the crossing (the hump of an unstable curve) can hunt between operating points**, which is why pumps intended to run in parallel should have continuously **drooping** curves.
**The three system types, which behave completely differently.**
$$
\begin{array}{l l l}
\text{Static-dominated} & \Delta z / H_{\mathrm{sys}} > 0.7 & \text{delivery to a reservoir; flow barely changes with pump speed} \\
\text{Friction-dominated} & \Delta z \approx 0 & \text{a cooling loop; } Q \propto N \text{ and } P \propto N^3 \text{ hold well} \\
\text{Mixed} & 0.3 < \Delta z / H < 0.7 & \text{most real systems; the affinity laws are only approximate}
\end{array}
$$
**The number that makes a variable-speed retrofit's savings computable.** For a friction-dominated loop the affinity law gives $P \propto N^3$, so a $20\ \%$ speed reduction saves $49\ \%$ of the power. **For a static-dominated system the same speed reduction saves almost nothing and can stall the pump** — with a static head of $40\ \mathrm{m}$ and a pump whose shut-off head at full speed is $45\ \mathrm{m}$, a $20\ \%$ speed reduction lowers the shut-off head to $0.8^2 \times 45 = 28.8\ \mathrm{m}$ — below the static head, so **the flow is zero**. **The number to compute before specifying a variable-speed drive is $\Delta z / H_{\mathrm{design}}$: the same drive that halves the energy on a friction-dominated loop may save almost nothing on a static-dominated lift.**
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
**Transitionally rough, just above the hydraulically-smooth limit of $5$** — which is why a $20\ \%$ error in $k_s$ produces only a $3\ \%$ error in $f$ here; the sensitivity to roughness grows as $k_s^+$ rises into the fully rough regime.
**The pumping power.**
$$
P = \frac{\rho g Q h_f}{\eta} = \frac{998 \times 9.81 \times 0.020 \times 12.0}{0.70} = 3{,}355\ \mathrm{W}
$$
**The number that makes the number worth memorising.** $12\ \mathrm{m}$ of head over $200\ \mathrm{m}$ is a gradient of **$60\ \mathrm{mm}$ of water per metre of pipe** ($590\ \mathrm{Pa / m}$) — a high value for a water main, which designers usually size for a few hundred pascals per metre or less, because the gradient sets both the pump energy and the spacing of booster stations.
*Sanity.* The answer is insensitive to the choice of explicit approximation — all three agree to $1\ \%$ here: Colebrook $0.01822$, Swamee–Jain $0.01833$, Haaland $0.01806$. **Its sensitivity to $k_s$ depends on the regime, not the arithmetic**, which is why a hydraulic calculation should report $k_s^+$.
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
**The check that $f$ is right at this flow.** $V = 4.88\ \mathrm{m / s}$, $\mathrm{Re} = 4.86 \times 10^5$, $f = 0.0174$ — **$4\ \%$ below the assumed value**, giving $f L / D = 8.7$, $H_{\mathrm{sys}} = 25 + \left( 8.7 + 13.7 \right) \times 826\, Q^2 = 25 + 18{,}520\, Q^2$ and $Q = \sqrt{35 / 23{,}520} = 0.0386\ \mathrm{m^3 / s}$. **One iteration is enough: $Q = 0.0386\ \mathrm{m^3 / s}$ ($139\ \mathrm{m^3 / h}$), $H = 52.6\ \mathrm{m}$.**
**Two pumps in parallel.** Each delivers $Q / 2$ at the common head $H$:
$$
H = 60 - 5{,}000 \left( \frac{Q}{2} \right)^2 = 60 - 1{,}250\, Q^2
\qquad \Rightarrow \qquad 60 - 1{,}250\, Q^2 = 25 + 18{,}500\, Q^2
$$
$$
35 = 19{,}750\, Q^2 \quad \Rightarrow \quad Q = 0.0421\ \mathrm{m^3 / s} = 152\ \mathrm{m^3 / h}, \qquad H = 57.8\ \mathrm{m}
$$
**The number that makes the parallel-pump result a surprise every time.** **Doubling the pumps increases the flow by $9\ \%$, not by $100\ \%$.** The reason is that this system curve is **steep** compared with the pump curve: at the operating point the friction head ($27.6\ \mathrm{m}$) is already larger than the static head, and every extra cubic metre per second must be pushed against a resistance that grows as $Q^2$. **Parallel pumps add a lot of flow when the system curve is flat (static-dominated, with little friction) and little when it is steep (friction-dominated)**; series pumps add head, which is what a steep system curve needs.
**Two pumps in series.** Each supplies $H / 2$ at the full flow:
$$
\frac{H}{2} = 60 - 5{,}000\, Q^2 \quad \Rightarrow \quad H = 120 - 10{,}000\, Q^2
\qquad \Rightarrow \qquad 120 - 10{,}000\, Q^2 = 25 + 18{,}400\, Q^2
$$
$$
Q = \sqrt{\frac{95}{28{,}400}} = 0.0578\ \mathrm{m^3 / s} = 208\ \mathrm{m^3 / h}, \qquad H = 86.5\ \mathrm{m}
$$
(the system constant is re-evaluated with the slightly lower $f$ at each new flow). **Series gives $50\ \%$ more flow than one pump and $37\ \%$ more than two in parallel for this system.**
*Sanity.* The comparison can be made before any arithmetic by looking at the slopes at the single-pump operating point: the pump curve falls by $2 \times 5{,}000\, Q = 386\ \mathrm{m}$ per $\mathrm{m^3 / s}$ while the system curve rises by $2 \times 18{,}520\, Q = 1{,}430\ \mathrm{m}$ per $\mathrm{m^3 / s}$. **When the system curve is much steeper than the pump curve, extra flow needs extra head, and parallel pumps — which add flow at the same head — are the wrong answer.**
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
**against $1{,}485\ \mathrm{m / s}$ for water in a rigid pipe** — **the pipe's elasticity cuts the wave speed by $11\ \%$**, and the reason a **plastic** pressure pipe's surge pressures are so much lower is that the same factor is $K_w / E \times D / e = 2.2 / 1.4 \times 0.3 / 0.02 = 23.6$, giving $a = 298\ \mathrm{m / s}$, a factor of five reduction.
**The Joukowsky pressure rise.**
$$
V = \frac{0.25}{\pi \times 0.15^2} = 3.54\ \mathrm{m / s}
\qquad
\Delta p = \rho a V = 998 \times 1{,}315 \times 3.54 = 4.64\ \mathrm{MPa} = 46.4\ \mathrm{bar}
$$
**The equivalent head** $\Delta H = a V / g = 1{,}315 \times 3.54 / 9.81 = 474\ \mathrm{m}$ of water.
**The critical time.**
$$
t_c = \frac{2 L}{a} = \frac{2 \times 500}{1{,}315} = 0.76\ \mathrm{s}
$$
**A closure faster than $0.76\ \mathrm{s}$ is "instantaneous" and produces the full Joukowsky rise; a slower closure produces proportionally less**, to the first approximation $\Delta p \left( t \right) = \rho a V \times t_c / t$ for $t > t_c$.
**The number that makes the check valve the failure and not the pump.** A check valve closes on **reverse** flow, and the reverse flow at the moment of closure is set by the downstand's hydraulics — typically $0.5$ to $1.0\ \mathrm{m / s}$, giving $\Delta p = 0.66$ to $1.3\ \mathrm{MPa}$. **A check valve that closes late, after the column has already reversed, "slams"**: the surge is set by the reverse velocity at the instant of closure, so the faster the column decelerates after a pump trip, the faster the valve must close. This is why spring-assisted, short-stroke (nozzle or dual-plate) check valves are preferred to heavy swing checks on pumping mains with a rapid flow reversal.
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
**The number that makes the downsurge the dangerous half.** After a pump trip the pressure first falls along the line; where the pipeline profile rises close to the hydraulic grade line — typically at a high point — the downsurge can take the pressure to the vapour pressure, **the column separates**, and when the separated columns rejoin the pressure spike can exceed the Joukowsky value for the original flow. **A feed tank or air-inlet valves at the high point limit how far the pressure there can fall.**
*Sanity.* $\Delta H = a V / g$ does not depend on the pipe length because the Joukowsky rise is a **local** momentum statement — the mass $\rho A\, a\, dt$ brought to rest in $dt$ by the passing wave. **The length enters only through the critical time, and the pipe material only through the wave speed.** A long line with friction, profile changes and possible column separation needs a full transient (method-of-characteristics) simulation; a short, simple line can be checked by hand as here.
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
h_f = 0.0183 \times \frac{40}{0.48} \times \frac{5.0^2}{2 \times 9.81} = 0.0183 \times 83.3 \times 1.274 = 1.94\ \mathrm{m\ of\ air}, \qquad \Delta p = \rho g h_f = 1.204 \times 9.81 \times 1.94 = 22.9\ \mathrm{Pa}
$$
**The circular duct on area** ($D = 0.553\ \mathrm{m}$, $V = 5.0\ \mathrm{m / s}$):
$$
\mathrm{Re} = 1.83 \times 10^5, \quad f = 0.0177, \qquad
h_f = 0.0177 \times 72.3 \times 1.274 = 1.63\ \mathrm{m\ of\ air}, \qquad \Delta p = 19.3\ \mathrm{Pa}
$$
**The circular duct on perimeter** ($D = 0.637\ \mathrm{m}$, $A = 0.319\ \mathrm{m^2}$, $V = 3.76\ \mathrm{m / s}$):
$$
\mathrm{Re} = 1.59 \times 10^5, \quad f = 0.0179, \qquad
h_f = 0.0179 \times 62.8 \times 0.723 = 0.81\ \mathrm{m\ of\ air}, \qquad \Delta p = 9.6\ \mathrm{Pa}
$$
**The reading.** The rectangular duct loses **$19\ \%$ more** than the same-area circle and **$140\ \%$ more** than the same-perimeter circle. **The same-area comparison is the one that matters for a shaft or a ceiling void, and the same-perimeter comparison is the one that matters for sheet-metal cost** — and a rectangular duct is kept as close to square as the space allows because, for a given area, the square has the least perimeter and hence the least material and the least friction.
**The number that makes the aspect ratio a cost curve.** For a fixed area $A$ and aspect ratio $r$, $P = 2 \sqrt{A} \left( \sqrt{r} + 1 / \sqrt{r} \right)$, so relative to a square (friction computed for this duct's area and velocity):
$$
\begin{array}{c c c c c}
r & 1 & 2 & 4 & 10 \\
P / P_{\text{square}} & 1.00 & 1.06 & 1.25 & 1.74 \\
\text{friction per unit length} & 1.00 & 1.07 & 1.31 & 1.97
\end{array}
$$
**a $10{:}1$ flat duct uses $74\ \%$ more sheet metal and needs about twice the fan pressure of a square one of the same area** — it is used above a ceiling only because the void's depth is not negotiable.
**The laminar warning.** If this duct ran at $\mathrm{Re} < 2{,}300$ on $D_h$ — for example in a clean-room's terminal at $0.02\ \mathrm{m^3 / s}$ — the hydraulic diameter with the circular-pipe law would give $f\mathrm{Re} = 64$, while the true rectangular value (based on $D_h$) is $59$ at an aspect ratio of $1.5$ and $90$ at $20$. **For flat ducts the circular law understates the laminar loss by up to a third.**
*Sanity.* The hydraulic diameter works in turbulent flow because the wall shear is set mainly by the thin near-wall layer, which is much the same along most of the perimeter, so the total drag is about $\tau_w P L$ and only $P / A$ enters. **In laminar flow the whole section participates and the shape enters through the form of the velocity profile**, which is why the exact result depends on $r$ and not only on $D_h$.
:::
:::

::: history
**Julius Weisbach** gave the head-loss equation its modern form, with a dimensionless friction coefficient multiplying $\left( L / D \right) V^2 / 2 g$, in **1845**, and **Henry Darcy** published extensive measurements of friction in pipes of different materials and ages in **1857**, showing that the coefficient depends on the roughness of the wall — hence the name Darcy–Weisbach. **Poiseuille**'s laminar law (**1840–41**) came from experiments on fine glass capillaries, and **Hagen** had found the same dependence independently in **1839**. **Osborne Reynolds**'s **1883** dye experiments identified the parameter that separates laminar from turbulent flow. **Johann Nikuradse**, working at Prandtl's institute in Göttingen, measured flow in smooth pipes (**1932**) and in pipes roughened with graded sand grains (**1933**); the sand-roughness report was translated into English by NACA in **1950**. **Cyril Colebrook**, working with **C. M. White** at Imperial College, published in **1939** the equation that joins the smooth and rough laws through the transition region, fitted to tests on commercial pipes, and **Lewis Moody**'s **1944** chart in the *Transactions of the ASME* put it into the form every engineer now uses. **The Hazen–Williams formula (1905) and Manning's formula (1889) remain in use in water-supply and open-channel practice; both are empirical and dimensionally inhomogeneous, so their coefficients carry hidden units.** **The equivalent sand-grain roughness is a fiction that works: no commercial pipe has sand grains, and published values for the same material differ, which is why a hydraulic calculation should report its assumed $k_s$ and its $k_s^+$ and not only its answer.**
:::

::: quiz
Doubling the diameter of a long turbulent water pipe, holding the flow rate and length fixed, reduces the frictional head loss by approximately:

- [ ] A factor of two, because the velocity halves
- [x] A factor of about twenty-seven: $h_f \propto f / D^{ 5 }$, and the larger diameter lowers the Reynolds number and therefore raises $f$ slightly
- [ ] A factor of thirty-two exactly
- [ ] A factor of sixteen

::: solution
**About twenty-seven.** From Darcy–Weisbach with $V = 4 Q / \pi D^{ 2 }$,

$$
h_f = f \frac{ L }{ D } \frac{ V^{ 2 } }{ 2 g } = \frac{ 8 f L Q^{ 2 } }{ \pi^{ 2 } g D^{ 5 } } \ \Rightarrow \ \frac{ h_{f, 2 } }{ h_{f, 1 } } = \frac{ f_2 }{ f_1 } \left( \frac{ D_1 }{ D_2 } \right)^{ 5 } = \frac{ 2^{ 0.25 } }{ 2^{ 5 } } \approx \frac{ 1 }{ 27 }
$$

using Blasius, $f \propto \mathrm{Re}^{- 0.25 } \propto D^{ 0.25 }$ at fixed flow rate for a smooth pipe. **The exact exponent depends on whether the pipe is hydraulically smooth or fully rough — in the fully rough regime $f$ is independent of Reynolds number and the factor is exactly $32$ — and that difference is itself the reason the Moody chart is a chart and not a formula.** The design consequence is the most valuable number in piping: **head loss goes as the inverse fifth power of diameter, so diameter is worth far more than anything else you can change.** Halving the flow rate removes about $75\ \%$ of the loss; going one standard size up (say $100$ to $125\ \mathrm{mm}$) removes roughly $65\ \%$. This is why the economic pipe size, computed over the life of the plant against the pump's energy bill, is often larger than the smallest size that will carry the flow.
:::
:::

## Where this leads

The same loss budget with a compressibility correction is [[fluid-mechanics/compressible-flow]]; the unsteady version of the last worked case is the whole of [[fluid-mechanics]]' surge analysis and [[energy-systems]]' hydro penstock design; the network solution is [[energy-systems]]' district-heating and [[manufacturing]]'s compressed-air design; the two-phase version is [[propulsion]]'s fuel and [[energy-systems]]' steam lines; and the open-channel limit — the same equations with a free surface and the Froude number in place of the Reynolds number as the governing group — is the river and canal hydraulics of the Earth atlas.

::: summary
- Laminar: $f = 64 / \mathrm{Re}$, $\Delta p \propto \mu V$, no density. Turbulent smooth: $f \approx 0.316\,\mathrm{Re}^{-0.25}$ (Blasius). Fully rough: $f$ constant.
- The Colebrook equation is a correlation, not a law; its explicit forms are good to $1.5\ \%$ and its roughness input is good to a factor of two.
- Always report $k_s^+ = k_s u^* / \nu$: it says whether the answer is roughness-sensitive or not.
- $h_f = f \left( L / D \right) V^2 / 2g$ is Darcy; $\tau_w = f \rho V^2 / 2$ is Fanning; they differ by four.
- Minor losses are referred to a stated velocity head; a $K$ quoted at a reduced bore $D_v$ is multiplied by $\left( D / D_v \right)^4$ for use with the pipe velocity.
- The shape of the system curve — its static-head fraction and its steepness against the pump curve — decides whether parallel pumps, series pumps or a variable speed are the right answer.
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

::: exercise Shear velocity {level=1 check="0.121"}
Give the shear (friction) velocity in metres per second for $V = 2.546\ \mathrm{m/s}$ and $f = 0.0182$.
::: solution
$u^* = V \sqrt{f/8} = 2.546 \times 0.0477 = 0.121\ \mathrm{m/s}$.
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
Taking $L_e \approx 30 D = 4.5\ \mathrm{m}$ and an average entrance friction factor of $1.4 f$, the entrance region's loss is that of $1.4 \times 4.5 = 6.3\ \mathrm{m}$ of fully developed pipe, so the total is
$$
\frac{1.4 \times 4.5 + \left( 12 - 4.5 \right)}{12} = \frac{6.3 + 7.5}{12} = 1.15
$$
times the fully developed estimate — **a $15\ \%$ understatement** if the entrance is ignored. On short, fitting-rich runs the entrance effects, fitting interactions and swirl from the last bend all tend to add loss, which is why such calculations carry a margin.
:::
:::

::: exercise Roughness regime {level=2}
A $600\ \mathrm{mm}$ concrete pipe ($k_s = 0.5\ \mathrm{mm}$) carries water at $1.5\ \mathrm{m/s}$. Give $k_s^+$ and state the roughness regime, and comment on the sensitivity of the answer to $k_s$.
::: solution
$$
\mathrm{Re} = \frac{1.5 \times 0.6}{1.004 \times 10^{- 6}} = 8.96 \times 10^5, \qquad
\frac{k_s}{D} = 8.33 \times 10^{- 4}, \qquad f \approx 0.0192
$$
$$
u^{*} = 1.5 \sqrt{0.0192 / 8} = 0.0735\ \mathrm{m / s}, \qquad
k_s^+ = \frac{5 \times 10^{- 4} \times 0.0735}{1.004 \times 10^{- 6}} = 37
$$
**Transitional** ($5 < k_s^+ < 70$), and roughly midway between the regimes. **A $\pm 50\ \%$ uncertainty in $k_s$ moves $f$ by about $+10\ \%$ / $-13\ \%$** — and since the roughness of real concrete depends on the finish, the jointing and the age, and published values span a factor of several, concrete-pipe design should be done with a range of $k_s$, not a single value.
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
\frac{V_2 \left( V_2 - V_1 \right)}{g} = \frac{V_2^2 - V_1^2}{2 g} + h_L
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
**Referred to the downstream velocity head**, $K = \left( A_2 / A_1 - 1 \right)^2$ — **a factor of $\left( A_2 / A_1 \right)^2$ difference**, so the reference velocity must always be stated.
**The limiting case.** $A_2 / A_1 \to \infty$ gives $K = 1$: **the whole upstream kinetic head is lost**, which is the sharp-edged exit loss. **The reading is that an exit is a sudden enlargement into a reservoir and the loss is the kinetic energy that leaves and never returns** — and the reason a well-rounded exit recovers most of it is that it turns the flow smoothly so that the kinetic energy is converted to pressure before the section closes.
**Where the assumption breaks.** The pressure on the annular step face is not exactly $p_1$, the velocity profiles at sections 1 and 2 are not uniform, and section 2 must be far enough downstream (several diameters) for the jet to have re-attached and mixed out. **Measured losses for turbulent flow nevertheless agree with the formula to within about ten per cent**, which is why it is used at all area ratios.
*Sanity.* The reason $h_L$ depends on $\left( V_1 - V_2 \right)^2$ and not on either velocity alone is that the loss is produced by the **shear layer** between the separated jet and the nearly stagnant fluid in the corners, and the shear layer's velocity difference is $V_1 - V_2$. **The same momentum argument gives the mixing loss when two streams of different velocity join**, which is why a manifold's junction losses can exceed its friction losses.
:::
:::

::: exercise Design {level=3}
Design the complete hydraulic system of a **$500\ \mathrm{kW}$ data-centre liquid-cooling loop** — a closed, water-filled circuit — whose dry cooler stands on the roof $38\ \mathrm{m}$ above the plant room, and state the pipe sizing, the pump selection, the control method and the acceptance tests.
::: solution
**The duty.**
$$
\dot{V} = \frac{500}{4.19 \times 8} = 14.9\ \mathrm{kg / s} = 0.0150\ \mathrm{m^3 / s} = 54\ \mathrm{m^3 / h}\quad \left( \Delta T = 8\ \mathrm{K} \right)
$$
**The pipe sizing.** Three candidate bores, at $\mathrm{Re}$ and $k_s = 0.045\ \mathrm{mm}$ for stainless or lined carbon steel:
$$
\begin{array}{l c c c c c}
D\ \left[ \mathrm{mm} \right] & V\ \left[ \mathrm{m / s} \right] & \mathrm{Re} & f & h_f\ \left[ \mathrm{m\, H_2O / 100\, m} \right] & \text{comment} \\
80 & 2.98 & 2.38 \times 10^5 & 0.0189 & 10.7 & \text{high gradient, erosion risk} \\
100 & 1.91 & 1.90 \times 10^5 & 0.0187 & 3.47 & \text{the economic choice} \\
125 & 1.22 & 1.52 \times 10^5 & 0.0186 & 1.14 & \text{over-sized, capital cost}
\end{array}
$$
**The number that sets the gradient.** A common design target for chilled- and condenser-water mains is a friction gradient of a few metres of water per $100\ \mathrm{m}$ — a few hundred pascals per metre — a compromise between pipe cost and pumping energy that the designer should confirm with a life-cycle cost for the actual prices. **The $100\ \mathrm{mm}$ bore at $3.5\ \mathrm{m}$ per $100\ \mathrm{m}$ sits in that band; the $80\ \mathrm{mm}$ at $10.7\ \mathrm{m}$ per $100\ \mathrm{m}$ has more than nine times the friction loss of the $125\ \mathrm{mm}$ option.**
**The static head does not count.** In a closed, filled loop the water rising $38\ \mathrm{m}$ to the roof is balanced by the water falling $38\ \mathrm{m}$ back down the return riser, so **the pump supplies only the friction and component losses**. The $38\ \mathrm{m}$ matters elsewhere: it sets the static fill pressure (about $3.7\ \mathrm{bar}$ at the plant-room level plus a margin at the top to keep air out) and hence the pressure rating of the pipework and pump casing.
**The total pump head.**
$$
\begin{array}{l r}
\text{Condenser (cooling-plate manifold) pressure drop} \left( 60\ \mathrm{kPa} \right) & 6.1\ \mathrm{m} \\
\text{Pipe friction, } 120\ \mathrm{m} \text{ run at } 3.47\ \mathrm{m} / 100\ \mathrm{m} & 4.2\ \mathrm{m} \\
\text{Fittings, } \sum K = 18 \text{ at } V^2 / 2 g = 0.186\ \mathrm{m} & 3.4\ \mathrm{m} \\
\text{Dry-cooler coil, strainer, balance valves, hoses} & 5.0\ \mathrm{m} \\
\hline
\textbf{Design head} & \textbf{18.7}\ \mathrm{m} \quad \rightarrow \quad 20\ \mathrm{m}
\end{array}
$$
**The pump.** Two identical pumps, each sized for $100\ \%$ of the duty, one running and one standby ($N + 1$):
$$
P_{\mathrm{hyd}} = \frac{998 \times 9.81 \times 0.0150 \times 20}{1{,}000} = 2.94\ \mathrm{kW}, \qquad
P_{\mathrm{shaft}} = \frac{2.94}{0.74} = 3.97\ \mathrm{kW}, \qquad
P_{\mathrm{motor}} = 5.5\ \mathrm{kW}
$$
**The number that makes the static-head mistake expensive.** Had the $38\ \mathrm{m}$ been added to the pump head, the duty would have been $58\ \mathrm{m}$ and nearly three times the power — and a pump selected for $58\ \mathrm{m}$ in a $20\ \mathrm{m}$ system runs far out on its curve at excessive flow, overloading its motor and risking cavitation.
**The control method.** With no static head, the system curve is a parabola through the origin, $H \propto Q^2$, and the affinity laws apply almost exactly: **a variable-speed drive on the duty pump, controlled to the differential pressure across the racks, gives power $\propto N^3$** — at $70\ \%$ of design flow the pump needs about $0.7^3 = 34\ \%$ of design power. Pressure-independent control valves at the racks hold each rack's flow against the varying pump speed, and a small bypass keeps a minimum flow through the pump.
**The transient check.** $L = 120\ \mathrm{m}$, $D = 100\ \mathrm{mm}$, steel $e = 4\ \mathrm{mm}$:
$$
\frac{K_w}{E} \frac{D}{e} = \frac{2.2}{200} \times 25 = 0.275, \qquad a = 1{,}315\ \mathrm{m / s}, \qquad
t_c = \frac{2 \times 120}{1{,}315} = 0.18\ \mathrm{s}
$$
**A valve stopping the whole main flow in $50\ \mathrm{ms}$ would be instantaneous**, with $\Delta p = 998 \times 1{,}315 \times 1.91 = 2.5\ \mathrm{MPa} = 25\ \mathrm{bar}$ — **above a $16\ \mathrm{bar}$ pipework rating even before the static pressure is added**. With a closing time of $t \gg t_c$ the surge falls roughly as $\rho a V\, t_c / t$; a $2\ \mathrm{s}$ closure gives about $2.3\ \mathrm{bar}$. **The mitigation is to forbid fast-acting isolating valves on the main, to give the rack valves closing times of several seconds, and to fit a small bladder surge vessel near the manifold.**
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
**The four clauses that protect the buyer.** **"THE PUMP SELECTION SHALL BE VERIFIED AGAINST A SYSTEM CURVE INCLUDING ALL TERMINAL DEVICES AT THEIR DESIGN FLOW AND AGAINST THE WORST-CASE PART-LOAD RESISTANCE."** **"THE INSTALLED MOTOR SHALL BE SIZED FOR THE END OF THE PUMP CURVE AND NOT FOR THE DUTY POINT."** **"EVERY AUTOMATIC VALVE ON THE MAIN SHALL HAVE A CLOSING TIME OF AT LEAST TEN CRITICAL TIMES, OR A LOCAL SURGE ARRESTER SHALL BE FITTED."** **"THE SYSTEM SHALL BE FLUSHED, CHEMICALLY CLEANED AND PASSIVATED BEFORE THE CHILLED-WATER CHARGE, AND THE WATER CHEMISTRY MAINTAINED TO THE STATED SPECIFICATION FOR THE LIFE OF THE INSTALLATION."**
*Design comment.* The general rule is that **a pump's energy is set by the system curve and the system curve is set by the pipe bore, so the pipe bore is the pump-efficiency decision and it is made on day one by a piping designer who is not paying the electricity bill** — which is why the specification must state the gradient target and the buyer must audit it before the supports are drawn.
:::
:::
