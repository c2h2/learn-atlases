At a Reynolds number of ten million the Navier–Stokes equations have a viscosity multiplying their highest derivative and a coefficient of $10^{-7}$ in front of it, and the resolution of that contradiction is that **viscosity keeps its importance in a layer a fraction of a per cent of the body length thick against the wall, and loses it everywhere else**. **Prandtl** wrote this down in **1904** in a short paper presented at the International Congress of Mathematicians in Heidelberg, and it is the single most consequential idea in fluid mechanics: it made drag computable, made the wind tunnel useful, made the airfoil possible, and made flow separation — and therefore stall, diffuser failure, compressor surge and every bluff-body wake — a thing one could name and predict.

Drag is where fluid mechanics meets the fuel-consumption figure, and the split is worth knowing before the mathematics: **most of a car's aerodynamic drag is pressure drag from its separated wake, with skin friction a minor share; an airliner in cruise, by contrast, spends roughly half of its drag on skin friction**, and the two have completely different remedies.

::: warning Seven boundary-layer errors
**Applying the turbulent flat-plate formula over the whole surface.** The laminar part of a surface contributes **less** friction than the turbulent part at the same $\mathrm{Re}_x$ — the local turbulent-to-laminar $C_f$ ratio is $\left( 0.0592 / \mathrm{Re}_x^{0.2} \right) / \left( 0.664 / \mathrm{Re}_x^{0.5} \right) = 0.089\, \mathrm{Re}_x^{0.3}$, which is $2.8$ at $\mathrm{Re}_x = 10^5$ and $11$ at $10^7$ — so a calculation that assumes fully turbulent flow from the leading edge **overstates** the drag: by about $6\ \%$ at $\mathrm{Re}_L = 10^7$ with natural transition at $5 \times 10^5$, and by over $30\ \%$ at $\mathrm{Re}_L = 10^6$. **A laminar-flow airfoil's benefit can be lost to a small leading-edge excrescence or an insect strike, which trips the layer and moves transition from far aft to the leading edge**, which is why gliders, whose performance depends on long laminar runs, are kept clean and polished. **Forgetting that the boundary layer has a displacement thickness and that it blocks the flow.** A turbulent boundary layer of $30\ \mathrm{mm}$ thickness has $\delta^{*} \approx \delta / 8 \approx 3.75\ \mathrm{mm}$, and on the four walls of a $1\ \mathrm{m}$ square test section that is a $1.5\ \%$ area blockage and about a $1.5\ \%$ error in the test-section velocity — **comparable to many of the effects being measured**. **A diffuser's effective area is $\pi D^2 / 4 - \pi D \delta^{*}$, not $\pi D^2 / 4$: the diffuser's own boundary layer eats into the area increase that was designed to recover the pressure, and this blockage is a major reason real diffusers and compressor stages recover less pressure than ideal-flow design predicts.** **Using the $\delta_{99}$ thickness as if it were a physical length.** $\delta_{99}$ is a convention — the height at which $u = 0.99\, U_e$ — and it has no dynamical meaning. **The lengths that mean something are $\delta^{*} = \int \left( 1 - u / U_e \right) dy$, which is the mass deficit, and $\theta = \int \left( u / U_e \right) \left( 1 - u / U_e \right) dy$, which is the momentum deficit**, and the shape factor $H = \delta^* / \theta$ is the single best indicator of whether a layer is about to separate. **Confusing the local and the average skin-friction coefficient.** $C_f \propto \mathrm{Re}_x^{- 1 / 2}$ for laminar and $\mathrm{Re}_x^{- 1 / 5}$ for turbulent, so the **average** over a plate is $\bar{C}_f = 2 C_f \left( L \right)$ laminar and $\bar{C}_f = \tfrac{5}{4} C_f \left( L \right)$ turbulent. **A factor of two or of $1.25$ on the drag**, and because notation varies between texts, always check whether a quoted $C_f$ is local or averaged. **Assuming the transition location.** $\mathrm{Re}_{\theta, t}$ — the **momentum-thickness** Reynolds number at transition — is not a property of the fluid or the surface; it is a function of the **tunnel's turbulence level**, and the range is large: the Abu-Ghannam–Shaw correlation gives $\mathrm{Re}_{\theta, t} \approx 1{,}100$ at $0.05\ \%$ free-stream turbulence and about $210$ at $3\ \%$. **A laminar-airfoil wind-tunnel result transfers to flight only if the tunnel's disturbance environment resembles the atmosphere's**, and modern laminar-flow designs are assessed with $e^N$ stability methods rather than a fixed transition trip, because the trip fixes the transition location instead of predicting it. **Dropping the pressure-gradient term from the momentum integral and then predicting no separation.** The von Kármán integral equation is
$$
\frac{d \theta}{d x} + \left( 2 + H \right) \frac{\theta}{U_e} \frac{d U_e}{d x} = \frac{C_f}{2}
$$
**and the second term is the whole of separation physics.** Setting $d U_e / dx = 0$ gives a boundary layer that never separates, which is the reason a flat-plate calculation cannot be used to justify a diffuser's divergence angle. **Treating a three-dimensional flow as two-dimensional.** A swept wing's boundary layer runs **spanwise** in the pressure gradient, forming a thick low-energy layer at the tip that separates at a much lower incidence than the two-dimensional section; a body of revolution's layer thins at the shoulder and thickens at the tail; and a turbine cascade's layer accumulates low-momentum fluid in the corner, forming the passage vortex. **A swept wing's maximum lift coefficient falls well below its section value, partly through simple sweep effects and partly through this spanwise drift and crossflow, which no two-dimensional method can see.**
:::

## The equations and their solutions

::: definition The boundary-layer equations {#def-ble}
**The scaling.** With $\delta \ll L$, $v \ll u$, and $\partial / \partial y \gg \partial / \partial x$:
$$
\boxed{ u \frac{\partial u}{\partial x} + v \frac{\partial u}{\partial y} = U_e \frac{d U_e}{d x} + \nu \frac{\partial^2 u}{\partial y^2} }, \qquad
\frac{\partial u}{\partial x} + \frac{\partial v}{\partial y} = 0
$$
**with** $u = v = 0$ **at** $y = 0$ **and** $u \to U_e \left( x \right)$ **as** $y \to \infty$, **and** $U_e$ **given by the inviscid outer solution through Bernoulli.**
**The simplifications, stated so they can be checked.** The streamwise viscous term $\nu \partial^2 u / \partial x^2$ is dropped because it is smaller than $\nu \partial^2 u / \partial y^2$ by $\left( \delta / L \right)^2$; and the normal momentum equation reduces to $\partial p / \partial y \approx 0$, because the pressure change across the layer is only $O \left( \left( \delta / L \right)^2 \right)$ of the dynamic pressure, **so the pressure is imposed by the outer flow** — and, in this first approximation, the layer can feed back on the outer flow only through its displacement thickness.
**The boundary layer is not "Navier–Stokes without the small terms" but a different problem with a well-posed initial-value structure:** $U_e \left( x \right)$ is prescribed, the layer grows downstream, and **information does not travel upstream** — until separation, at which point the assumption fails and the whole coupled problem must be solved.
**The displacement thickness, the momentum thickness and the shape factor:**
$$
\boxed{ \delta^{*} = \int_0^{\infty} \left( 1 - \frac{u}{U_e} \right) dy }, \qquad
\boxed{ \theta = \int_0^{\infty} \frac{u}{U_e} \left( 1 - \frac{u}{U_e} \right) dy }, \qquad
H = \frac{\delta^{*}}{\theta}
$$
$$
\begin{array}{l c c c c}
& \delta_{99} / x & \theta / x & H & C_f \\
\text{Blasius (laminar, ZPG)} & 5.0\, \mathrm{Re}_x^{- 1 / 2} & 0.664\, \mathrm{Re}_x^{- 1 / 2} & 2.59 & 0.664\, \mathrm{Re}_x^{- 1 / 2} \\
\text{Turbulent, smooth, } 1 / 7 & 0.37\, \mathrm{Re}_x^{- 1 / 5} & 0.036\, \mathrm{Re}_x^{- 1 / 5} & 1.3\text{–}1.4 & 0.059\, \mathrm{Re}_x^{- 1 / 5} \\
\text{Separating} & & & \to 3.5 + & \to 0
\end{array}
$$
**The number that makes $H$ the diagnostic.** A laminar layer at $H = 2.59$ is healthy; **$H > 3.5$ means separation is imminent**; a turbulent layer at $H = 1.35$ is healthy and at $H = 2.0$ is separating. **A measured distribution of $H$ along a surface therefore shows where the layer is approaching separation before any force is measured.**
:::

::: definition The momentum integral equation {#def-momentum-integral}
**Integrating the boundary-layer equation across the layer** gives the **von Kármán** **1921** integral relation:
$$
\boxed{ \frac{d \theta}{d x} + \left( 2 + H \right) \frac{\theta}{U_e} \frac{d U_e}{d x} = \frac{C_f}{2} }
\qquad \left[ \text{with } \lambda = \frac{\theta^2}{\nu} \frac{d U_e}{d x} \text{ the pressure-gradient parameter} \right]
$$
**The reading, term by term.** $d \theta / dx$ is the growth of the momentum deficit; the middle term is **production or destruction by the pressure gradient** — negative for an adverse gradient, so the layer grows faster than skin friction alone would make it; and $C_f / 2$ is the rate at which the wall **removes** momentum. **Separation is the condition at which the wall's extraction and the adverse gradient together exhaust the layer's momentum: $C_f \to 0$ and $\partial u / \partial y \big|_0 = 0$.**
**Thwaites' method**, an integrable closure for laminar layers, valid for roughly $-0.09 < \lambda < 0.25$:
$$
\theta^2 \left( x \right) = \frac{0.45 \nu}{U_e^{6}} \int_0^x U_e^{5}\, dx^{\prime}, \qquad
\lambda = \frac{\theta^2}{\nu} \frac{d U_e}{d x}, \qquad
C_f \approx \frac{2 \left( \lambda + 0.09 \right)^{0.62}}{\mathrm{Re}_{\theta}} \quad \text{(White's fit)}
$$
**with separation at** $\lambda \approx - 0.09$. (At $\lambda = 0$ the fit gives $C_f \mathrm{Re}_\theta / 2 = 0.225$, against Blasius's $0.220$.) **The method is a standard textbook tool and is still used, because it is a single quadrature and is typically accurate to within about ten per cent away from separation.**
**The Falkner–Skan family**, the similarity solutions for a wedge flow $U_e = K x^m$:
$$
f^{{'''}} + f f^{{''}} + \beta \left( 1 - f^{{'2}} \right) = 0, \qquad \beta = \frac{2 m}{m + 1}
$$
$$
\begin{array}{l c c l}
m = 0 & \beta = 0 & f^{{''}} \left( 0 \right) = 0.4696 & \text{Blasius, flat plate} \\
m = 1 & \beta = 1 & f^{{''}} \left( 0 \right) = 1.2326 & \text{stagnation point} \\
m = - 0.0904 & \beta = - 0.1988 & f^{{''}} \left( 0 \right) = 0 & \text{separation} \\
m < - 0.0904 & & \text{no solution} & \text{separated}
\end{array}
$$
**The number that makes the stagnation region special.** In this scaling Blasius's value is $0.4696$ (it is $0.3321$ in Blasius's own variables, $f''' + \tfrac{1}{2} f f'' = 0$). Expressed as $\tau_w \sqrt{\nu x / U_e} / \left( \mu U_e \right)$, the stagnation-point value $1.2326$ against the flat plate's $0.332$ means **the wall shear at a two-dimensional stagnation point is $3.7$ times that of a flat plate at the same local $\mathrm{Re}_x$** — which is why leading edges and nose regions see the highest wall shear and heat transfer.
:::

::: widget plot
f: 1.328/sqrt(x); 0.074/pow(x,0.2); 0.059/pow(x,0.2)
x: 10000, 100000000
y: 0.0008, 0.05
labels: laminar average C_f = 1.328/sqrt(Re_L); turbulent average C_f = 0.074/Re_L^0.2; turbulent local c_f = 0.059/Re_x^0.2
caption: Skin-friction coefficients against Reynolds number on log-log axes. **The laminar line has a slope of $-0.5$ and the turbulent line a slope of $-0.2$** — the turbulent layer's friction is far less sensitive to speed and size, which is why a ship's model-ship correlation line is a logarithm and not a power law. **The two average-coefficient lines cross at $\mathrm{Re} \approx 1.5 \times 10^4$** (below the range where the turbulent formula is valid), and above that a turbulent layer has more friction than a laminar one at the same Reynolds number — at $\mathrm{Re} = 10^7$ by a factor of $7$. **That factor is the prize of laminar-flow control**, and what makes it hard to win is that the laminar layer must be held for metres against atmospheric disturbances, surface roughness and waviness, insect contamination, and crossflow instability on swept wings.
:::

## Separation, transition and drag

::: definition Separation {#def-separation}
**The definition.** Separation is the condition at which the wall shear vanishes and reverse flow appears:
$$
\tau_w = \mu \left. \frac{\partial u}{\partial y} \right|_{y = 0} = 0, \qquad u \left( y \right) < 0 \text{ near the wall}
$$
**The mechanism.** In an **adverse** pressure gradient $\left( d U_e / d x < 0 \right)$ the fluid near the wall — already slowed by viscosity — is decelerated further, its profile develops an inflection point, and the layer can no longer deliver the momentum needed to push through the rising pressure. **The layer does not "run out of energy"; it runs out of momentum flux, and the momentum integral equation says exactly how much.**
**The consequence.** The streamline that would have followed the surface leaves it, a **shear layer** is thrown into a recirculating region, and the pressure on the separated surface rises to the base value. **The pressure drag of a bluff body is the difference between the front stagnation pressure and the base pressure, and it is the separation point and not the skin friction that sets the base pressure.**
$$
\begin{array}{l c l}
\text{Circular cylinder, subcritical} & C_D = 1.2 & \text{separation at } 82^{\circ} \text{ laminar} \\
\text{Circular cylinder, supercritical} & C_D = 0.3 & \text{separation at } 120^{\circ} \text{ turbulent} \\
\text{Sphere, subcritical} & C_D = 0.47 & \\
\text{Sphere, supercritical} & C_D = 0.1 & \\
\text{Streamlined body, } L / D = 6 & C_D = 0.04 & \\
\text{Flat plate normal to flow} & C_D = 1.18 &
\end{array}
$$
**The drag crisis.** At $\mathrm{Re} \approx 3 \times 10^5$ a sphere's or cylinder's drag coefficient **falls by a factor of four**, because the boundary layer transitions to turbulence before it separates, the turbulent layer's larger momentum near the wall carries it further round the body, and the wake narrows. **The number that makes a golf ball work:** a smooth sphere's $C_D$ drops from $0.47$ to $0.10$ at $\mathrm{Re} \approx 3 \times 10^5$, which for a $42.7\ \mathrm{mm}$ ball in air is about $106\ \mathrm{m / s}$; **the dimples trip the layer at a drive speed of $70\ \mathrm{m / s}$ where a smooth ball would still be subcritical**, and a dimpled ball carries much further than a smooth one hit the same way. **The number that makes the same physics a design trap:** a chimney's or a tower's vortex shedding changes character through the critical Reynolds number, and design guidance for wind-induced vibration of slender structures treats the subcritical, critical and supercritical ranges separately because the Strouhal number and the drag both change abruptly.
**The laminar separation bubble.** At moderate $\mathrm{Re}$ $\left( 10^5 \text{–} 10^6 \right)$ a laminar layer separates, the shear layer transitions in the free shear layer, and the turbulent layer reattaches a few per cent of chord downstream, forming a **short bubble** that behaves as a modified, slightly thicker shape. **The bubble is benign if short and damaging if long**: low-Reynolds-number airfoils for small UAVs and gliders are designed to manage the bubble — often with a trip or turbulator to keep it short — and when a short bubble **bursts** into a long one, the airfoil can lose lift abruptly at an incidence well below what higher-Reynolds-number data would predict.
:::

::: definition Transition {#def-transition}
**The routes.**
$$
\begin{array}{l l}
\text{Natural (T–S)} & \text{amplification of 2D instability waves; needs a quiet environment} \\
\text{Bypass} & \text{free-stream turbulence or roughness by-passes the T–S stage} \\
\text{Crossflow} & \text{3D inflectional instability on a swept surface; grows as } \exp \left( N \right) \\
\text{Separation-induced} & \text{the separated shear layer is unconditionally unstable} \\
\text{Leading-edge} & \text{a laminar separation bubble or a detached leading-edge vortex}
\end{array}
$$
**The $e^N$ method.** Linear-stability growth rates are integrated downstream from the neutral point, and the envelope over all frequencies is taken:
$$
N \left( s \right) = \int_{s_{\mathrm{neutral}}}^{s} \left( - \alpha_i \right) ds, \qquad
\text{transition at } N = N_{\mathrm{crit}}
$$
**with $N_{\mathrm{crit}} \approx 9$ commonly used for flight and quiet tunnels, and lower values in noisier tunnels** (Mack's correlation $N_{\mathrm{crit}} = - 8.43 - 2.4 \ln \mathrm{Tu}$ gives $8.1$ at $\mathrm{Tu} = 0.1\ \%$ and $5.5$ at $0.3\ \%$) — the number is not universal because it is a **model of the environment** as much as of the flow.
**The Reynolds number at transition** (zero pressure gradient, Abu-Ghannam–Shaw correlation $\mathrm{Re}_{\theta, t} \approx 163 + e^{6.91 - \mathrm{Tu}}$, $\mathrm{Tu}$ in per cent):
$$
\mathrm{Re}_{\theta, t} = \frac{U_e \theta}{\nu} \bigg|_t \approx
\begin{cases}
1{,}100 & \text{very quiet tunnel, } \mathrm{Tu} = 0.05\ \% \\
900 & \text{ordinary subsonic wind tunnel, } \mathrm{Tu} = 0.3\ \% \\
300 & \text{high free-stream turbulence, } \mathrm{Tu} = 2\ \%
\end{cases}
$$
**The number that makes a wind-tunnel result a wind-tunnel result.** **On a flat plate $\theta \propto \sqrt{x}$, so $x_t \propto \mathrm{Re}_{\theta, t}^2$, and the fall from about $1{,}100$ to $300$ moves transition upstream by a factor of about thirteen**; this is why a laminar-flow airfoil's section-drag polar is meaningful only with the tunnel's turbulence level reported alongside it.
**The transition trip.** A $0.5\ \mathrm{mm}$-diameter wire or a $1\ \mathrm{mm}$-wide adhesive strip at $x / c = 0.02$ forces transition, and the reason a wind-tunnel model carries one is to make the **lift** and **pitching-moment** data repeatable — at the cost of making the **drag** data wrong. **A section-drag polar taken with a trip is therefore a turbulent reference rather than a prediction of the clean design point, and the trip adds some drag of its own.**
:::

::: definition Total drag on a flat plate {#def-flatplate}
**The laminar plate** (Blasius, integrated):
$$
\bar{C}_f = \frac{1.328}{\sqrt{\mathrm{Re}_L}}, \qquad
D = \bar{C}_f \cdot \tfrac{1}{2} \rho U^2 A
$$
**The fully turbulent smooth plate:**
$$
\bar{C}_f = \frac{0.074}{\mathrm{Re}_L^{0.2}} \quad \left( \mathrm{Re} < 10^7 \right), \qquad
\bar{C}_f = \frac{0.455}{\left( \log_{10} \mathrm{Re}_L \right)^{2.58}} \quad \text{(Schlichting, to } 10^9 \text{)}
$$
**The mixed boundary layer with transition at** $\mathrm{Re}_t$:
$$
\boxed{ \bar{C}_f = \frac{0.074}{\mathrm{Re}_L^{0.2}} - \frac{A}{\mathrm{Re}_L} }, \qquad
A = \mathrm{Re}_t \left( \frac{0.074}{\mathrm{Re}_t^{0.2}} - \frac{1.328}{\mathrm{Re}_t^{0.5}} \right) = 1742\ \text{at } \mathrm{Re}_t = 5 \times 10^5
$$
**The number that makes the correction term the whole of the laminar benefit.** At $\mathrm{Re}_L = 10^7$ the two terms are $2.946 \times 10^{- 3}$ and $1.742 \times 10^{- 4}$ — **the correction is $5.9\ \%$ of the fully turbulent value**, which is the drag saved by keeping the first $5\ \%$ of the plate laminar. **Keeping half the plate laminar** at the same $\mathrm{Re}_L$ means $\mathrm{Re}_t = 5 \times 10^6$, for which $A = 13{,}950$, the correction is $1.40 \times 10^{- 3}$ and $\bar{C}_f = 1.55 \times 10^{- 3}$ — **a $47\ \%$ reduction in skin friction** — and the whole-aircraft fuel saving from laminar flow is much smaller than this, because only parts of the wetted area can be kept laminar and swept surfaces are crossflow-unstable.
**The rough plate.** Once $k_s^+ > 70$ the flow is fully rough and $\bar{C}_f$ is **independent of Reynolds number** (Schlichting's average over a plate of length $L$):
$$
\bar{C}_f = \left( 1.89 + 1.62\, \log_{10} \frac{L}{k_s} \right)^{- 2.5}
$$
**The number that makes a ship's hull a maintenance cost.** For a heavy fouling of $k_s = 3\ \mathrm{mm}$ on a $250\ \mathrm{m}$ tanker, $L / k_s \approx 8 \times 10^4$ and $\bar{C}_f = 0.0033$ against a smooth-hull value of about $0.0015$ (at $\mathrm{Re}_L \approx 1.6 \times 10^9$) — **more than double the friction**, which is why hull cleaning, antifouling coatings and the dry-docking interval are economic decisions.
:::

## Worked cases

::: example A flat plate at ten million {#ex-plate}
Air at $20\ {}^{\circ}\mathrm{C}$ flows at $30\ \mathrm{m / s}$ over a flat plate $5\ \mathrm{m}$ long and $1\ \mathrm{m}$ wide. Find the boundary-layer thickness and the drag at the trailing edge for (a) fully laminar, (b) fully turbulent, and (c) natural transition at $\mathrm{Re}_t = 5 \times 10^5$.
::: solution
**The Reynolds number.** $\nu = 1.509 \times 10^{- 5}\ \mathrm{m^2 / s}$:
$$
\mathrm{Re}_L = \frac{30 \times 5}{1.509 \times 10^{- 5}} = 9.94 \times 10^6
$$
**(a) Fully laminar.**
$$
\delta_{99} = \frac{5 L}{\sqrt{\mathrm{Re}_L}} = \frac{5 \times 5}{3{,}153} = 7.93\ \mathrm{mm}, \qquad
\theta = \frac{0.664 \times 5}{3{,}153} = 1.05\ \mathrm{mm}
$$
$$
\bar{C}_f = \frac{1.328}{3{,}153} = 4.21 \times 10^{- 4}, \qquad
D = 4.21 \times 10^{- 4} \times \tfrac{1}{2} \times 1.204 \times 30^2 \times 5 = 1.14\ \mathrm{N}
$$
**(b) Fully turbulent.** With $\mathrm{Re}_L^{0.2} = 25.09$:
$$
\delta_{99} = \frac{0.37 L}{\mathrm{Re}_L^{0.2}} = \frac{0.37 \times 5}{25.09} = 73.7\ \mathrm{mm}, \qquad
\theta = \frac{0.036 \times 5}{25.09} = 7.17\ \mathrm{mm}
$$
$$
\bar{C}_f = \frac{0.074}{25.09} = 2.95 \times 10^{- 3}
\qquad \Rightarrow \qquad D = 8.00\ \mathrm{N}
$$
**(c) Natural transition.** $x_t = 5 \times 10^5 \times \nu / U = 0.2515\ \mathrm{m}$ — **the first $252\ \mathrm{mm}$**:
$$
\bar{C}_f = \frac{0.074}{\mathrm{Re}_L^{0.2}} - \frac{1{,}742}{\mathrm{Re}_L}
= 2.95 \times 10^{- 3} - 1.75 \times 10^{- 4} = 2.77 \times 10^{- 3}
\qquad \Rightarrow \qquad D = 7.52\ \mathrm{N}
$$
**The reading.** **The natural transition saves $5.9\ \%$ of the drag.** The laminar run is $5\ \%$ of the plate and the saving is $5.9\ \%$ of the drag — slightly more than its share, because the fully turbulent formula charges the leading-edge region with its highest local friction, which is exactly where the laminar layer replaces it. **The number that makes laminar flow worth pursuing is the saving at a higher transition Reynolds number:** with $\mathrm{Re}_t = 5 \times 10^6$ the correction term becomes $A / \mathrm{Re}_L = 1.40 \times 10^{- 3}$ and the saving is $48\ \%$; the achievable saving rises steeply with $\mathrm{Re}_t$ because $A$ grows roughly as $\mathrm{Re}_t^{0.8}$.
**The shape factor at the trailing edge.** For the turbulent case, $H = \delta^* / \theta = 1.3$ gives $\delta^* = 9.3\ \mathrm{mm}$ and $\delta_{99} / \delta^* = 7.9$; for the laminar case $H = 2.59$ gives $\delta^* = 2.72\ \mathrm{mm}$ and $\delta_{99} / \delta^* = 2.9$. **The turbulent layer is about nine times thicker and its displacement thickness only about three and a half times larger** — and a wind tunnel's blockage correction is computed from $\delta^*$ and not from $\delta_{99}$ because $\delta^*$ is the mass deficit and $\delta_{99}$ is a convention.
*Sanity.* The turbulent layer is so much thicker because turbulent mixing transports momentum across the layer far faster than molecular viscosity does; its $1 / 7$-power profile is **fuller** near the wall, which is why its $H$ is smaller. **The ratio $\delta_{99} / \theta$ is $7.5$ for Blasius and $10.3$ for the $1 / 7$-power layer**, and the reason the momentum thickness is the better measure of a layer's "size" is that it is the quantity the momentum integral equation evolves and the quantity that appears in $\mathrm{Re}_{\theta, t}$.
:::
:::

::: example Wind-tunnel blockage {#ex-blockage}
A closed-return wind tunnel has a test section of $1.0 \times 0.8\ \mathrm{m}$ and a contraction ratio of $6:1$. The boundary layer on the four walls at the test section has $\theta = 8\ \mathrm{mm}$ and $H = 1.4$. Find the displacement-area blockage, the correction to the test-section velocity, and the wall divergence angle needed to hold the core velocity constant.
::: solution
**The displacement thickness.** $\delta^* = H \theta = 1.4 \times 8 = 11.2\ \mathrm{mm}$.
**The blocked area.** The boundary layer occupies a perimeter strip of thickness $\delta^*$ on all four walls:
$$
A_0 = 1.0 \times 0.8 = 0.800\ \mathrm{m^2}, \qquad
P = 2 \left( 1.0 + 0.8 \right) = 3.6\ \mathrm{m}
$$
$$
\Delta A \approx P \delta^{*} = 3.6 \times 0.0112 = 0.0403\ \mathrm{m^2}, \qquad
\frac{\Delta A}{A_0} = 5.04\ \%
$$
**The velocity correction.** By continuity the core must accelerate through the blocked area:
$$
\frac{\Delta U}{U} = \frac{\Delta A}{A_0 - \Delta A} = \frac{0.0403}{0.7597} = 5.3\ \%
$$
**The number that makes this a first-order error and not a correction.** **$5.3\ \%$ in velocity is $1.053^2 - 1 = 10.9\ \%$ in dynamic pressure, and so in every force coefficient that is not corrected.** A drag count is $10^{-4}$ in $C_D$ and a modern airliner's total is of order $250$ to $300$ counts, so a $10\ \%$ error in $q$ is some $25$ counts — **far larger than many of the increments a test is run to measure**. **Closed test sections are commonly built with slightly diverging walls (a fraction of a degree) to offset this growth**, and an open-jet test section needs a different correction entirely because its boundary is a free shear layer and not a wall.
**The divergence angle.** To hold the core velocity constant the **available** area must grow at the rate the blockage grows:
$$
\frac{d}{dx} \left( P \delta^{*} \right) = P \frac{d \delta^*}{dx} = 2 W \tan \alpha \quad \text{(top and bottom walls, each of width } W = 1.0\ \mathrm{m} \text{, diverging at } \alpha \text{)}
$$
With $d \delta^* / dx \approx \delta^* / x \approx 0.0112 / 1.0 = 0.0112$ (a rough estimate for a zero-gradient layer) and $P = 3.6$:
$$
\frac{d \left( \Delta A \right)}{dx} = 3.6 \times 0.0112 = 0.0403\ \mathrm{m^2} \text{ per metre of length}
$$
**Spread over the $1.0\ \mathrm{m}$ width this is $40\ \mathrm{mm}$ of added height per metre of length, or $20\ \mathrm{mm}$ per wall — a divergence of $\tan \alpha = 0.020$, $\alpha = 1.15^{\circ}$.** **This is an overestimate**: the layer did not start at the test-section entrance but far upstream, so over the test section $\delta^*$ grows only slowly ($d \delta^* / dx = 0.8\, \delta^* / x$ for a turbulent layer, with $x$ measured from its true origin), and the divergence actually needed is a fraction of this — it must match the **growth** of the blockage, not the blockage itself.
**The number that makes the contraction ratio matter.** A contraction accelerates the flow by its area ratio — six times here — which thins the wall boundary layers and reduces the **relative** streamwise turbulence intensity, because the mean velocity rises far more than the fluctuations do. **Low-turbulence tunnels therefore combine a large contraction with screens and honeycombs in the settling chamber: the free-stream quality is set upstream and cannot be repaired in the test section.**
*Sanity.* The reason $\Delta A \approx P \delta^*$ is right to first order is that the blocked area is the mass deficit divided by the core density, and the mass deficit of a perimeter strip is $\rho U_e \delta^* P$. **The second-order corner term $4 \delta^{*2}$ is $1.2\ \%$ of the first and is negligible here; the real corner flow — where two layers merge and secondary flows thicken the layer — is a larger effect**, which is why a rectangular tunnel's empty-section velocity is calibrated rather than computed.
:::
:::

::: example The drag crisis {#ex-crisis}
A $42.7\ \mathrm{mm}$ golf ball is struck at $70\ \mathrm{m / s}$. Find the Reynolds number, the drag coefficient with and without dimples, and the ratio of the ranges.
::: solution
**The Reynolds number.** With $\nu = 1.509 \times 10^{- 5}$:
$$
\mathrm{Re} = \frac{70 \times 0.0427}{1.509 \times 10^{- 5}} = 1.98 \times 10^5
$$
**The dimpled ball.** The dimples bring the drag crisis down to roughly $\mathrm{Re} \approx 5 \times 10^4$, so at $2 \times 10^5$ the layer is turbulent and separates late:
$$
C_D \approx 0.23
$$
**The smooth ball.** At $\mathrm{Re} = 2 \times 10^5$ the layer is still laminar at separation and the flow is **subcritical**:
$$
C_D \approx 0.47
$$
**The drag ratio.** $0.47 / 0.23 = 2.04$ — **the smooth ball experiences more than twice the drag**.
**The range.** Range does not scale simply with $C_D$ — it depends on the launch angle, the speed decay along the flight and, for a golf ball, strongly on the **lift** produced by backspin. Halving the drag lengthens the flight, and the dimples also help the spinning ball sustain its Magnus lift, because the turbulent layer's asymmetric, delayed separation deflects the wake downward:
$$
\frac{C_{D, \mathrm{smooth}}}{C_{D, \mathrm{dimpled}}} = \frac{0.47}{0.23} = 2.04
$$
**Together these explain why a dimpled ball is commonly said to fly roughly twice as far as an otherwise identical smooth one.**
**The number that makes the dimples a Reynolds-number device and not a turbulence device.** The dimple depth is $0.25\ \mathrm{mm}$, and the roughness Reynolds number is
$$
k_s^+ = \frac{0.00025 \times 70 \sqrt{0.02 / 2}}{1.509 \times 10^{- 5}} \approx 116 \gg 70
$$
**large compared with the viscous sublayer**, so the dimples disturb the layer strongly at driving speeds — the trip is effective over the whole range of speeds a golfer produces (this is an order-of-magnitude estimate; a dimple is not a sand-grain roughness). A **table-tennis** ball, by contrast, is smooth by the rules of the game, and at its $\mathrm{Re} \approx 5 \times 10^4$ it flies below the smooth-sphere crisis.
*Sanity.* On both a sphere and a cylinder the crisis is a factor of about four in $C_D$, because in both the separation point moves from roughly $80^\circ$ to $120^\circ$ and the base pressure rises sharply as the wake narrows. **The reason a smooth sphere's $C_D$ at $\mathrm{Re} = 10^6$ is $0.1$ and a rough sphere's at the same $\mathrm{Re}$ is $0.2$ is that over-tripping moves the separation point forward again** — and the reason a golf ball's dimple pattern is an optimisation and not a simple trip is that the optimum is a balance between tripping early enough and not creating so much skin friction that the benefit is lost.
:::
:::

::: example Streamlining {#ex-streamline}
Find the optimum fineness ratio of a body of revolution of length $L$ and maximum diameter $D$ moving through water at $\mathrm{Re}_L = 10^8$, and compare its drag with that of a sphere of the same displacement.
::: solution
**The two drags.** For a streamlined body of revolution with a turbulent boundary layer, the total drag is the sum of a friction drag that grows with wetted area and a pressure drag that grows with bluntness. **Hoerner**'s empirical fit, referred to the maximum cross-section $S_0 = \pi D^2 / 4$, is
$$
C_D = \bar{C}_f \left[ 3 \frac{L}{D} + 4.5 \left( \frac{D}{L} \right)^{1 / 2} + 21 \left( \frac{D}{L} \right)^2 \right]
$$
where the first term is skin friction on the wetted area, the second the extra friction caused by the supervelocity over the body, and the third the pressure (form) drag.
**The numbers.** With $\bar{C}_f = 0.455 / \left( \log_{10} 10^8 \right)^{2.58} = 0.455 / 213.8 = 2.13 \times 10^{- 3}$ (held fixed for simplicity). Because the comparison is at **fixed displacement**, the fair coefficient is the one based on $\mathrm{Vol}^{2/3}$; for a volume of about $\left( \pi / 6 \right) D^2 L$, $C_{D, V} = C_D \left( \pi / 4 \right) / \left[ \left( \pi / 6 \right) \left( L / D \right) \right]^{2/3} = 1.209\, C_D \left( L / D \right)^{- 2/3}$:
$$
\begin{array}{c c c c c}
L / D & \text{friction terms} & \text{pressure term} & C_D \left( S_0 \right) & C_{D, V} \\
2 & 0.0195 & 0.0112 & 0.0307 & 0.0234 \quad \text{— blunt} \\
3 & 0.0247 & 0.0050 & 0.0297 & 0.0172 \\
4 & 0.0303 & 0.0028 & 0.0331 & 0.0159 \\
5 & 0.0362 & 0.0018 & 0.0380 & 0.0157 \quad \text{— the minimum} \\
6 & 0.0422 & 0.0012 & 0.0435 & 0.0159 \\
8 & 0.0545 & 0.0007 & 0.0552 & 0.0167 \\
14 & 0.0919 & 0.0002 & 0.0922 & 0.0192 \\
20 & 0.1298 & 0.0001 & 0.1300 & 0.0213 \quad \text{— friction-dominated}
\end{array}
$$
**The optimum is at $L / D \approx 5$ for a fixed volume** (on a frontal-area basis the minimum is near $L / D \approx 2.6$, which is the right question only when the cross-section, not the volume, is what is fixed).
**The number that makes a submarine's hull a compromise and not an optimum.** A sphere of the same volume has a diameter $\left( L / D \right)^{1/3} = 1.71$ times the body's, so at this scale it is far above its drag crisis, with $C_D \approx 0.2$ and $C_{D, V} = 0.24$ — **about fifteen times the streamlined body's $0.0157$**. At the optimum the pressure term is under $5\ \%$ of the total, so **a further improvement is a skin-friction problem and not a shape problem**. **Submarine hulls are often somewhat longer than the optimum because a long parallel midbody is easier to build and fit out, and the penalty is small: at $L / D = 8$ the drag is only $0.0167 / 0.0157 = 1.06$ times the minimum.**
**The number that makes the tail more important than the nose.** In subsonic flow a smoothly rounded nose costs almost nothing; the pressure drag comes mainly from the **afterbody**, where the adverse pressure gradient thickens the layer and can separate it, so it is the tail-cone angle that a designer watches. (The von Kármán ogive, often quoted as a "minimum-drag" nose, minimises **supersonic wave drag** and is irrelevant here.) **Even at $L / D = 3$ the pressure term is only $17\ \%$ of the total**, so beyond avoiding separation, streamlining is about wetted area.
*Sanity.* The optimum exists because friction grows as $L / D$ while pressure drag falls as $\left( D / L \right)^2$, so the sum has a minimum; **the minimum is shallow and broad** — between $L / D = 4$ and $L / D = 8$ the drag at fixed volume changes by under $7\ \%$. **A real design is therefore free to choose its proportions for structural, internal-arrangement or handling reasons, at little cost in drag, provided the afterbody stays attached.**
:::
:::

::: history
**Prandtl**'s 1904 Heidelberg paper *Über Flüssigkeitsbewegung bei sehr kleiner Reibung* is only a few pages long and contains no complete solution — the equations, the argument and some sketches and photographs of separation; his student **Blasius** published the flat-plate similarity solution in his **1908** dissertation, "Grenzschichten in Flüssigkeiten mit kleiner Reibung". **von Kármán**'s momentum integral and **Pohlhausen**'s approximate profile method both appeared in **1921**, and **Falkner** and **Skan**'s wedge-flow similarity solutions in **1930–1931**; the separation value $\beta = -0.1988$ came from **Hartree**'s more accurate computations of **1937**. **Tollmien** (**1929**) and **Schlichting** (**1933**) worked out the linear instability of the laminar layer, but the waves were not convincingly observed until **Schubauer** and **Skramstad**'s experiments in a specially quietened low-turbulence tunnel at the US National Bureau of Standards, published by NACA after the war. **The drag crisis on spheres was measured by Eiffel in 1912, and Prandtl showed in 1914 that a thin trip wire produced the same drop at lower speed — proving it a boundary-layer transition effect**; the English engineer **William Taylor** applied for a patent on a dimpled golf-ball pattern in **1905**. **The $e^N$ method was proposed independently by Smith and Gamberoni and by van Ingen in 1956, and it remains a standard engineering tool for transition prediction, with a critical $N$ that is calibrated against experiment rather than derived from first principles.**
:::

::: quiz
A golf ball is dimpled to reduce its drag, yet aircraft wings are kept as smooth as possible. Why does roughening the surface reduce the drag of a sphere but not of a wing?

- [ ] Dimples generate turbulence, which increases skin friction, so they cannot reduce drag
- [x] On a bluff body the drag is pressure drag from a separated wake; a turbulent boundary layer separates later, and the wake it leaves is narrower by far more than the extra skin friction costs. On a wing the boundary layer is attached over nearly the whole chord, so there is no wake to shrink and the skin-friction penalty is not repaid
- [ ] Dimples work only at very low Reynolds numbers, where viscous forces dominate
- [ ] Dimples reduce the wetted area of the ball

::: solution
**The mechanism is separation, not friction.** A smooth sphere's drag coefficient falls from about $0.47$ to roughly $0.1$ at a Reynolds number near $3 \times 10^{ 5 }$ — the **drag crisis** — because the boundary layer transitions to turbulence, carries more momentum to the wall, and stays attached to about $120^{ \circ }$ instead of about $80^{ \circ }$. A golf ball is deliberately operated above that transition, and the dimples also *trip* the layer at a lower Reynolds number than natural transition so the effect is reliable at the ball's actual speed. **A wing is the opposite problem: at $10^{ 7 }$ the boundary layer is turbulent whether you like it or not, so there is nothing to trip, and the entire technology of laminar-flow airfoils is the art of keeping the layer *laminar* for as long as possible because laminar skin friction at $\mathrm{Re} = 10^7$ is only about a seventh of turbulent.** The same logic explains why a golf ball is dimpled and why a cricket ball with one polished side and one rough side swings: the two sides' layers separate at different points, and the asymmetric wake pushes the ball sideways.
:::
:::

## Where this leads

The pressure drag computed here is the input to [[fluid-mechanics/compressible-flow]]'s wave drag and to [[aerodynamics]]' drag polar; the separation criterion is the same one that limits a compressor diffuser and a [[fluid-mechanics/dimensional-analysis]]-nondimensionalised wind-tunnel wall; the transition physics is the reason [[aerodynamics]]' laminar-flow airfoils and [[aerodynamics]]' high-lift systems are designed with stability codes; and the skin-friction law is the backbone of a ship's resistance prediction and a large part of the drag that enters [[flight-mechanics]]' range equation.

::: summary
- At high Reynolds number viscosity survives only in a layer of thickness $\delta / L \sim \mathrm{Re}^{-1/2}$; the boundary-layer equations are the balance of inertia, pressure gradient and wall-normal diffusion.
- $\delta^*$ is the mass deficit, $\theta$ the momentum deficit, and $H = \delta^*/\theta$ is the separation indicator: $2.59$ for Blasius, about $1.3$ for a healthy turbulent layer, rising past about $3.5$ (laminar) or $2$ (turbulent) near separation.
- The von Kármán integral equation contains the whole of separation physics in its pressure-gradient term; drop it and you predict no separation ever.
- Separation is $\tau_w = 0$; it sets the base pressure and therefore the form drag of every bluff body.
- The drag crisis is a transition effect: a factor of four on a sphere, and the reason a golf ball has dimples.
- Transition is not a property of the flow alone: $\mathrm{Re}_{\theta,t}$ ranges from a few hundred to over 1,000 with the free-stream turbulence.
- Flat-plate drag: $\bar C_f = 1.328/\sqrt{\mathrm{Re}}$ laminar, $0.074/\mathrm{Re}^{0.2}$ turbulent, minus $A/\mathrm{Re}$ for natural transition.
- The boundary layer blocks the flow: $\Delta A = P\delta^*$, and in a small wind tunnel that can mean a $10\%$ error in every uncorrected force coefficient.
:::

## Exercises

::: exercise Displacement thickness {level=1 check="11.2"}
Give the displacement thickness in millimetres of a boundary layer with $\theta = 8\ \mathrm{mm}$ and $H = 1.4$.
::: solution
$\delta^* = H\theta = 1.4 \times 8 = 11.2\ \mathrm{mm}$.
:::
:::

::: exercise Blasius thickness {level=1 check="7.93"}
Give the $\delta_{99}$ in millimetres at the trailing edge of a $5\ \mathrm{m}$ flat plate at $\mathrm{Re}_L = 9.94 \times 10^6$.
::: solution
$\delta_{99} = 5L/\sqrt{\mathrm{Re}_L} = 25 / 3153 = 7.93\ \mathrm{mm}$.
:::
:::

::: exercise Skin friction {level=1 check="2.95"}
Give the average turbulent skin-friction coefficient (in units of $10^{-3}$) for $\mathrm{Re}_L = 9.94 \times 10^6$.
::: solution
$\bar C_f = 0.074 / \mathrm{Re}_L^{0.2} = 0.074 / 25.09 = 2.95 \times 10^{-3}$.
:::
:::

::: exercise Momentum thickness {level=1 check="1.05"}
Give the momentum thickness in millimetres at the trailing edge of the laminar plate of the previous two questions.
::: solution
$\theta = 0.664 L / \sqrt{\mathrm{Re}_L} = 0.664 \times 5 / 3153 = 1.05\ \mathrm{mm}$.
:::
:::

::: exercise Drag ratio {level=1 check="2.04"}
Give the ratio of the drag of a smooth sphere to that of a dimpled sphere at $\mathrm{Re} = 2 \times 10^5$.
::: solution
$C_D = 0.47$ smooth, $0.23$ dimpled: a ratio of $2.04$.
:::
:::

::: exercise Blockage {level=1 check="5.04"}
Give the area blockage in per cent of a $1.0 \times 0.8\ \mathrm{m}$ wind-tunnel test section whose four walls carry a boundary layer of $\delta^* = 11.2\ \mathrm{mm}$.
::: solution
$\Delta A / A = P \delta^* / A = 3.6 \times 0.0112 / 0.800 = 5.04\ \%$.
:::
:::

::: exercise Shape factor {level=1 check="2.59"}
Give the shape factor of a Blasius laminar boundary layer.
::: solution
$H = \delta^* / \theta = 2.59$.
:::
:::

::: exercise Transition location {level=2}
A wing chord is $1.5\ \mathrm{m}$ and the flight $\mathrm{Re} = 6 \times 10^6$. If transition occurs at $\mathrm{Re}_\theta = 500$ and $\theta / c = 0.0012 \left( x / c \right)^{0.8}$, give the transition location.
::: solution
$$
\mathrm{Re}_\theta = \frac{U \theta}{\nu} = \mathrm{Re}_c \times 0.0012 \left( \frac{x}{c} \right)^{0.8} = 500
\quad \Rightarrow \quad \left( \frac{x}{c} \right)^{0.8} = \frac{500}{6 \times 10^6 \times 0.0012} = 0.0694
$$
$$
\frac{x}{c} = 0.0694^{1 / 0.8} = 0.036
$$
**Transition at about $3.6\ \%$ chord**, i.e. $x_t = 0.036 \times 1.5 = 0.053\ \mathrm{m}$ — a $\mathrm{Re}_\theta$ criterion is used rather than a $\mathrm{Re}_x$ criterion because $\theta$ carries some of the history of the layer, although in a strong pressure gradient the critical value itself shifts and a stability method is needed. **With transition this close to the leading edge the laminar run, and so the laminar drag benefit, is small**; a laminar-flow section is designed to hold a favourable pressure gradient far aft precisely to push this point back.
:::
:::

::: exercise Fineness ratio {level=2 check="0.83"}
For the body-of-revolution drag of the worked example, give the ratio of the drag at $L/D = 6$ to that at $L/D = 14$ for the same displaced volume, and state which term dominates at each.
::: solution
$$
\frac{C_{D, V} \left( 6 \right)}{C_{D, V} \left( 14 \right)} = \frac{0.0159}{0.0192} = 0.83
$$
**Friction dominates at both: the pressure term is $0.0012 / 0.0435 = 2.9\ \%$ of the total at $L / D = 6$ and $0.0002 / 0.0922 = 0.25\ \%$ at $L / D = 14$.** The slender body has about $20\ \%$ more drag at the same volume because its wetted area is larger, and since the pressure drag is already almost gone, the only remaining lever is the skin friction — wetted area, surface finish, or (rarely practical in water at this Reynolds number) laminar flow.
:::
:::

::: exercise Derivation {level=3}
Derive the von Kármán momentum integral equation from the boundary-layer equations, and use it to show that separation requires an adverse pressure gradient.
::: solution
**Write the momentum equation in conservative form.** Using continuity, $u\, \partial u / \partial x + v\, \partial u / \partial y = \partial \left( u^2 \right) / \partial x + \partial \left( u v \right) / \partial y$, so
$$
\frac{\partial \left( u^2 \right)}{\partial x} + \frac{\partial \left( u v \right)}{\partial y}
= U_e \frac{d U_e}{d x} + \frac{1}{\rho} \frac{\partial \tau}{\partial y}, \qquad \tau = \mu \frac{\partial u}{\partial y}
$$
**Subtract** $U_e$ **times the continuity equation.** Since $U_e = U_e \left( x \right)$ only,
$$
\frac{\partial \left[ u \left( u - U_e \right) \right]}{\partial x} + \frac{\partial \left[ v \left( u - U_e \right) \right]}{\partial y}
= \frac{d U_e}{d x} \left( U_e - u \right) + \frac{1}{\rho} \frac{\partial \tau}{\partial y}
$$
**Integrate from** $y = 0$ **to** $y = \infty$. **The wall terms vanish** because $u = v = 0$ at $y = 0$; **the edge terms vanish** because $u - U_e \to 0$ and $\tau \to 0$; and $\partial / \partial x$ may be taken outside the integral:
$$
\frac{d}{d x} \int_0^{\infty} u \left( u - U_e \right) dy = \frac{d U_e}{d x} \int_0^{\infty} \left( U_e - u \right) dy - \frac{\tau_w}{\rho}
$$
**Recognise the two integrals.** Since $u \left( u - U_e \right) = - U_e^2 \left( u / U_e \right) \left( 1 - u / U_e \right)$ and $U_e - u = U_e \left( 1 - u / U_e \right)$:
$$
- \frac{d}{d x} \left( U_e^2 \theta \right) = U_e \frac{d U_e}{d x} \delta^{*} - \frac{\tau_w}{\rho}
$$
**Expand the derivative and divide by** $U_e^2$:
$$
- \frac{d \theta}{d x} - \frac{2 \theta}{U_e} \frac{d U_e}{d x} = \frac{\delta^{*}}{U_e} \frac{d U_e}{d x} - \frac{\tau_w}{\rho U_e^2}
$$
**and with** $H = \delta^* / \theta$ **and** $C_f = 2 \tau_w / \left( \rho U_e^2 \right)$:
$$
\boxed{ \frac{d \theta}{d x} + \left( 2 + H \right) \frac{\theta}{U_e} \frac{d U_e}{d x} = \frac{C_f}{2} }
$$
**Separation.** At separation $C_f = 0$, so
$$
\frac{d \theta}{d x} = - \left( 2 + H \right) \frac{\theta}{U_e} \frac{d U_e}{d x}
$$
**The right-hand side must be positive** because $d \theta / dx > 0$ for a growing layer, and since $\left( 2 + H \right) > 0$, $\theta > 0$ and $U_e > 0$, this requires
$$
\boxed{ \frac{d U_e}{d x} < 0 }
$$
**an adverse pressure gradient.** **A favourable gradient can delay but never cause separation, and a zero-gradient layer can never separate** — which is the reason a flat plate has no pressure drag and a diffuser has all of its failure modes.
*Sanity.* The reason the derivation needs a closure is that the equation contains $H$ and $C_f$, both of which depend on the **shape** of the profile, which the equation does not know. **Every boundary-layer method is a statement about the shape** — Pohlhausen's quartic, Thwaites' correlation, Head's two-layer, Cebeci's algebraic, Spalart's one-equation — and the reason they differ by tens of per cent near separation is that the shape is precisely what is changing there.
:::
:::

::: exercise Design {level=3}
Design the boundary-layer-control system for the **high-lift wing of a regional airliner** whose maximum lift coefficient must rise from $2.4$ to $3.0$ without increasing the span, and state the method, the sizing, the failure modes and the acceptance tests.
::: solution
**The diagnosis.** At $C_L = 2.4$ a single-slotted flap wing's outboard section is at a **trailing-edge** separation; the section maximum is limited by the flap's pressure side, and the wing's spanwise loading limits the lift at the tip by **crossflow** separation. **The three limits need three different devices.**
**The device selection** (the increments are illustrative orders of magnitude, not additive design values):
$$
\begin{array}{l l c l}
\text{Leading-edge slat} & \text{relieves the main element's suction peak, delays leading-edge stall} & 0.35 & \text{lift increment} \\
\text{Trailing-edge flap, double-slotted} & \text{increases camber and effective chord} & 0.55 & \\
\text{Vortex generators} & \text{mix high-energy fluid into the crossflow layer} & 0.08 & \\
\text{Boundary-layer suction on the flap cove} & \text{removes the low-energy fluid directly} & 0.12 & \\
\text{Gurney flap} & \text{small trailing-edge tab; adds effective camber} & 0.06 & \text{drag penalty}
\end{array}
$$
**The chosen scheme:** a **fixed** leading-edge slat (no new mechanism, no new certification item), a **double-slotted** trailing-edge flap of about $30\%$ chord at $35^\circ$ deflection, **vortex generators** on the outboard upper surface, and **no suction** — the suction system's $0.12$ increment does not pay for its bleed-air cost, its ice sensitivity and its maintenance.
**The vortex-generator sizing.** A $\mathrm{VG}$ of height $h$ should be about **half the incoming boundary-layer thickness**:
$$
\delta \left( x = 0.6 c \right) \approx 0.37\, x\, \mathrm{Re}_x^{- 0.2} = 0.37 \times 1.92 \times \left( 4.8 \times 10^6 \right)^{- 0.2} = 0.033\ \mathrm{m}
\qquad \Rightarrow \qquad h \approx 16\ \mathrm{mm}
$$
(for a $3.2\ \mathrm{m}$ chord at $\mathrm{Re}_c = 8 \times 10^6$; this is the zero-pressure-gradient estimate, and the real layer in the adverse gradient ahead of the stall is thicker). **A rectangular $\mathrm{VG}$ of $16\ \mathrm{mm}$ height, $32\ \mathrm{mm}$ chord, at $18^\circ$ incidence, spaced $100\ \mathrm{mm}$ apart** — a spacing-to-height ratio of about $6$, within the commonly used range.
**The number that makes the VG's cost real.** Each $\mathrm{VG}$ adds a little parasite drag, and an array of a few dozen per wing can cost several drag counts in cruise against a lift increment of $0.08$ at take-off and landing. **Whether they are fitted is a trade between field performance and cruise fuel**, and it must be made with the airline's actual mission mix, not a single design point.
**The slat cove.** A fixed slat with a gap of $1.5\ \mathrm{mm}$ and an overlap of $3\ \mathrm{mm}$ accelerates the flow through the cove, blowing high-energy air onto the main element's suction peak:
$$
\frac{U_{\mathrm{slat\, exit}}}{U_{\infty}} \approx 1.6 \quad \text{at } C_L = 2.4
$$
**The number that makes the slat cove a noise source.** The shear layer at the slat exit is one of the main airframe noise sources on approach, and slat-noise treatments (cove fillers, serrated or porous edges) are researched because the noise scales roughly as $U^5$: a $20\ \%$ reduction in the local velocity is worth $50 \log_{10} 0.8 \approx 5\ \mathrm{dB}$.
**The failure modes.**
$$
\begin{array}{l l}
\text{Insect contamination of the } \mathrm{VGs} & \text{loss of the } 0.08 \text{ increment; inspected at every } A \text{ check} \\
\text{Ice in the slat cove} & \text{the } 1.5\ \mathrm{mm} \text{ gap can ice up; anti-ice protection required} \\
\text{Flap-track fairing wear} & \text{steps and gaps add drag counts; inspect against limits} \\
\text{Seal degradation at the flap nose} & \text{through-gap leakage degrades the flap's lift and drag} \\
\text{VG detachment} & \text{a foreign-damage item; a } \mathrm{VG} \text{ must not be able to enter an engine}
\end{array}
$$
**The acceptance tests.**
$$
\begin{array}{l l}
\text{Section wind-tunnel polar} & C_{l,\max} \text{ within } \pm 0.05 \text{ of prediction, } \mathrm{Re} \text{ and } \mathrm{Tu} \text{ reported} \\
\text{Full-span model} & C_{L,\max} \ge 3.0 \text{ at the relevant } \mathrm{Re}, \text{ with the stall identified as wing-root and not tip} \\
\text{VG survey} & \text{surface-oil-flow or pressure-tap survey confirming the separation is suppressed} \\
\text{Flight test} & C_{L,\max} \text{ from the approach-speed-to-stall ratio, within } \pm 3\ \% \\
\text{Noise} & \text{approach noise } \le \text{Chapter } 14 \text{ minus } 3\ \mathrm{EPNdB} \\
\text{Contamination} & C_{L,\max} \text{ re-measured with artificial insect and with ice, and the degradation reported}
\end{array}
$$
**The four clauses that protect the buyer.** **"THE HIGH-LIFT SYSTEM'S MAXIMUM LIFT COEFFICIENT SHALL BE DEMONSTRATED AT FLIGHT REYNOLDS NUMBER AND FLIGHT TURBULENCE LEVEL, AND THE TEST REYNOLDS NUMBER AND ITS CORRECTION SHALL BE REPORTED."** **"THE DRAG PENALTY OF EVERY VORTEX GENERATOR ARRAY SHALL BE REPORTED IN DRAG COUNTS AT THE CRUISE CONDITION AND NOT ONLY AS A LIFT INCREMENT."** **"THE SYSTEM'S SENSITIVITY TO INSECT CONTAMINATION, ICE AND SEAL WEAR SHALL BE QUANTIFIED AND THE MAINTENANCE INTERVAL SET FROM THE MEASURED DEGRADATION RATE."** **"THE STALL SHALL BEGIN AT THE WING ROOT, WITH ADEQUATE STALL WARNING AND AILERON EFFECTIVENESS RETAINED THROUGH THE STALL."**
*Design comment.* The general rule is that **every high-lift device is a boundary-layer-control device, and its benefit is a delay of separation while its cost is a drag and a maintenance item** — which is why the modern trend is toward **fewer, simpler** devices with better understood physics rather than more devices with better performance, and why the certification requirement that matters is the contaminated-airframe clause and not the clean-airframe $C_{L,\max}$.
:::
:::
