At a Reynolds number of ten million the Navier–Stokes equations have a viscosity multiplying their highest derivative and a coefficient of $10^{-7}$ in front of it, and the resolution of that contradiction is that **viscosity keeps its importance in a layer one ten-thousandth of the body length thick against the wall, and loses it everywhere else**. **Prandtl** wrote this down in **1904** in a three-page note at the Heidelberg Mathematics Congress, and it is the single most consequential idea in fluid mechanics: it made drag computable, made the wind tunnel useful, made the airfoil possible, and made flow separation — and therefore stall, diffuser failure, compressor surge and every bluff-body wake — a thing one could name and predict.

Drag is where fluid mechanics meets the fuel-consumption figure, and the split is worth knowing before the mathematics: **at highway speed a car spends sixty per cent of its power on the pressure drag of its own wake and thirty-five per cent on the skin friction of its surfaces; an airliner in cruise spends about half on skin friction**, and the two have completely different remedies.

::: warning Seven boundary-layer errors that cost ten per cent of the fuel
**Applying the turbulent flat-plate formula over the whole surface.** The laminar part of a surface contributes **less** friction than the turbulent part at the same $\mathrm{Re}_x$ — the local $C_f$ ratio is $\left( 0.029 / \mathrm{Re}_x^{0.2} \right) / \left( 0.332 / \mathrm{Re}_x^{0.5} \right) = 0.087\, \mathrm{Re}_x^{0.3}$, which is $0.55$ at $\mathrm{Re}_x = 10^5$ and $1.4$ at $10^7$ — but a calculation that assumes fully turbulent flow from the leading edge **overstates** the drag by $10$ to $20\ \%$ at $\mathrm{Re} = 10^7$. **The reason a laminar-flow airfoil's whole benefit is lost by a $0.3\ \mathrm{mm}$ burr on the leading edge is that the transition moves from $67\ \%$ chord to $2\ \%$ chord**, and the reason a glider's wing is polished and a crop-duster's is not is a $17\ \%$ difference in the drag count. **Forgetting that the boundary layer has a displacement thickness and that it blocks the flow.** A turbulent boundary layer of $30\ \mathrm{mm}$ thickness has $\delta^{*} \approx 3\ \mathrm{mm}$, and in a wind tunnel test section of $1\ \mathrm{m}$ that is a $0.6\ \%$ area blockage and a $0.6\ \%$ error in the test-section velocity — **which is of the same size as the aerodynamic effect being measured**. **The reason a diffuser's area ratio must be computed with $A - \pi D \delta^{*}$ and not $\pi D^2 / 4$ is that the diffuser's own boundary layer eats the divergence angle that was designed to recover the pressure, and the reason a compressor's stage pressure ratio falls short of its design value is usually this and not the blade profile.** **Using the $\delta_{99}$ thickness as if it were a physical length.** $\delta_{99}$ is a convention — the height at which $u = 0.99\, U_e$ — and it has no dynamical meaning. **The lengths that mean something are $\delta^{*} = \int \left( 1 - u / U_e \right) dy$, which is the mass deficit, and $\theta = \int \left( u / U_e \right) \left( 1 - u / U_e \right) dy$, which is the momentum deficit**, and the shape factor $H = \delta^* / \theta$ is the single best indicator of whether a layer is about to separate. **Confusing the local and the average skin-friction coefficient.** $C_f \propto \mathrm{Re}_x^{- 1 / 2}$ for laminar and $\mathrm{Re}_x^{- 1 / 5}$ for turbulent, so the **average** over a plate is $\bar{C}_f = 2 C_f \left( L \right)$ laminar and $\bar{C}_f = \tfrac{5}{4} C_f \left( L \right)$ turbulent. **A factor of two or of $1.25$ on the drag**, and the reason the two conventions are both written $C_f$ in the literature is that there is no agreed bar over the average. **Assuming the transition location.** $\mathrm{Re}_{\theta, t}$ — the **momentum-thickness** Reynolds number at transition — is not a property of the fluid or the surface; it is a function of the **tunnel's turbulence level**, and the range is enormous: $\mathrm{Re}_{\theta, t} = 1{,}400$ in a quiet pressurised tank at $0.05\ \%$ turbulence and $\mathrm{Re}_{\theta, t} = 300$ in a free jet at $3\ \%$. **The reason a laminar-airfoil wind-tunnel result does not fly is that the tunnel's free-stream turbulence is not the atmosphere's**, and the reason a modern airfoil design is validated with an $e^N$ stability method and not with a fixed transition trip is that the trip fixes the answer to the wrong value. **Dropping the pressure-gradient term from the momentum integral and then predicting no separation.** The von Kármán integral equation is
$$
\frac{d \theta}{d x} + \left( 2 + H \right) \frac{\theta}{U_e} \frac{d U_e}{d x} = \frac{C_f}{2}
$$
**and the second term is the whole of separation physics.** Setting $d U_e / dx = 0$ gives a boundary layer that never separates, which is the reason a flat-plate calculation cannot be used to justify a diffuser's divergence angle. **Treating a three-dimensional flow as two-dimensional.** A swept wing's boundary layer runs **spanwise** in the pressure gradient, forming a thick low-energy layer at the tip that separates at a much lower incidence than the two-dimensional section; a body of revolution's layer thins at the shoulder and thickens at the tail; and a turbine cascade's layer accumulates low-momentum fluid in the corner, forming the passage vortex. **The reason a two-dimensional airfoil's maximum lift coefficient of $1.6$ becomes $1.1$ on a swept wing is crossflow, and no two-dimensional method can see it.**
:::

## The equations and their solutions

::: definition The boundary-layer equations {#def-ble}
**The scaling.** With $\delta \ll L$, $v \ll u$, and $\partial / \partial y \gg \partial / \partial x$:
$$
\boxed{ u \frac{\partial u}{\partial x} + v \frac{\partial u}{\partial y} = U_e \frac{d U_e}{d x} + \nu \frac{\partial^2 u}{\partial y^2} }, \qquad
\frac{\partial u}{\partial x} + \frac{\partial v}{\partial y} = 0
$$
**with** $u = v = 0$ **at** $y = 0$ **and** $u \to U_e \left( x \right)$ **as** $y \to \infty$, **and** $U_e$ **given by the inviscid outer solution through Bernoulli.**
**The three simplifications, stated so they can be checked.** The streamwise viscous term $\nu \partial^2 u / \partial x^2$ is dropped because it is smaller by $ \left( \delta / L \right)^2$; the normal pressure gradient is dropped because $\partial p / \partial y = O \left( \delta / L \right)$; and the normal momentum equation reduces to $\partial p / \partial y \approx 0$, **so the pressure is imposed by the outer flow and the boundary layer cannot influence it** — which is the reason a separation bubble can change the outer flow only through the displacement thickness.
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
**The number that makes $H$ the diagnostic.** A laminar layer at $H = 2.59$ is healthy; **$H > 3.5$ means separation is imminent**; a turbulent layer at $H = 1.35$ is healthy and at $H = 2.0$ is separating. **The reason a wind-tunnel operator's first look at a new model is the shape-factor profile from a hot-wire traverse is that $H$ says whether the model is working before any force is measured.**
:::

::: definition The momentum integral equation {#def-momentum-integral}
**Integrating the boundary-layer equation across the layer** gives the **von Kármán** **1921** integral relation:
$$
\boxed{ \frac{d \theta}{d x} + \left( 2 + H \right) \frac{\theta}{U_e} \frac{d U_e}{d x} = \frac{C_f}{2} }
\qquad \left[ \text{with } \beta = \frac{\theta^2}{\nu} \frac{d U_e}{d x} \text{ the pressure-gradient parameter} \right]
$$
**The reading, term by term.** $d \theta / dx$ is the growth of the momentum deficit; the middle term is **production or destruction by the pressure gradient** — negative for an adverse gradient, so the layer grows faster than skin friction alone would make it; and $C_f / 2$ is the rate at which the wall **removes** momentum. **Separation is the condition at which the wall's extraction and the adverse gradient together exhaust the layer's momentum: $C_f \to 0$ and $\partial u / \partial y \big|_0 = 0$.**
**Thwaites' method**, an integrable closure good for laminar layers with $-0.09 < \lambda < 12$:
$$
\theta^2 \left( x \right) = \frac{0.45 \nu}{U_e^{6}} \int_0^x U_e^{5}\, dx^{\prime}, \qquad
\lambda = \frac{\theta^2}{\nu} \frac{d U_e}{d x}, \qquad
C_f = 0.45\, \mathrm{Re}_{\theta}^{- 2} \left( 1 - 12 \lambda^{- 0.62} \right) + 6 \lambda \left( 1 + 0.08 \lambda \right)^{- 1} e^{- \lambda^2}
$$
**with separation at** $\lambda = - 0.09$. **The method is a first-year engineering tool and is still used, because it is a quadrature and it is right to within $10\ \%$ on $C_f$.**
**The Falkner–Skan family**, the similarity solutions for a wedge flow $U_e = K x^m$:
$$
f^{{'''}} + f f^{{''}} + \beta \left( 1 - f^{{'2}} \right) = 0, \qquad \beta = \frac{2 m}{m + 1}
$$
$$
\begin{array}{l c c l}
m = 0 & \beta = 0 & f^{{''}} \left( 0 \right) = 0.3321 & \text{Blasius, flat plate} \\
m = 1 & \beta = 1 & f^{{''}} \left( 0 \right) = 1.2326 & \text{stagnation point} \\
m = - 0.0904 & \beta = - 0.1988 & f^{{''}} \left( 0 \right) = 0 & \text{separation} \\
m < - 0.0904 & & \text{no solution} & \text{separated}
\end{array}
$$
**The number that makes the stagnation point the reason a pitot tube survives.** $f^{{''}} \left( 0 \right) = 1.2326$ against Blasius' $0.3321$ — **the wall shear at a two-dimensional stagnation point is $3.7$ times that of a flat plate at the same $\mathrm{Re}_x$**, and the reason a pitot tube's tip erodes and a flat plate's leading edge does not is that $3.7$ factor multiplied by the stagnation-point heat transfer, which is larger still.
:::

::: widget plot
f: 1.328/sqrt(x); 0.074/pow(x,0.2); 0.059/pow(x,0.2)
x: 10000, 100000000
y: 0.0008, 0.05
labels: laminar average C_f = 1.328/sqrt(Re_L); turbulent average C_f = 0.074/Re_L^0.2; turbulent local c_f = 0.059/Re_x^0.2
caption: Skin-friction coefficients against Reynolds number on log-log axes. **The laminar line has a slope of $-0.5$ and the turbulent line a slope of $-0.2$** — the turbulent layer's friction is far less sensitive to speed and size, which is why a ship's model-ship correlation line is a logarithm and not a power law. **The two lines cross at $\mathrm{Re} \approx 1.3 \times 10^5$**, and above that a turbulent layer has more friction than a laminar one at the same Reynolds number — at $\mathrm{Re} = 10^7$ by a factor of $14$. **The number that makes the whole of laminar-flow control worth $1.5$ million dollars a year in airline fuel is that factor of $14$**, and the number that makes it hard is that the laminar layer must be held for metres against a free-stream turbulence of $0.1\ \%$, a leading-edge roughness below $2\ \mu\mathrm{m}$, and crossflow at any sweep angle above zero.
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
\text{Flat plate normal to flow} & C_D = 1.18 & \\
\text{Long cylinder in a tube, fully developed} & \text{no form drag} &
\end{array}
$$
**The drag crisis.** At $\mathrm{Re} \approx 3 \times 10^5$ a sphere's or cylinder's drag coefficient **falls by a factor of four**, because the boundary layer transitions to turbulence before it separates, the turbulent layer's larger momentum near the wall carries it further round the body, and the wake narrows. **The number that makes a golf ball work:** a smooth sphere's $C_D$ drops from $0.47$ to $0.10$ at $\mathrm{Re} \approx 3 \times 10^5$, which for a $42.7\ \mathrm{mm}$ ball in air is $10.5\ \mathrm{m / s}$; **the dimples trip the layer at a drive speed of $70\ \mathrm{m / s}$ where a smooth ball would still be subcritical**, and a dimpled ball carries $50\ \%$ further than a smooth one hit at the same speed. **The number that makes the same physics a design trap:** a chimney's or a tower's vortex-shedding frequency jumps at the critical Reynolds number, and the reason the **Tacoma** literature and the **Kármán** vortex-shedding design charts both carry a warning about the supercritical regime is that the Strouhal number and the drag both change discontinuously.
**The laminar separation bubble.** At moderate $\mathrm{Re}$ $\left( 10^5 \text{–} 10^6 \right)$ a laminar layer separates, the shear layer transitions in the free shear layer, and the turbulent layer reattaches a few per cent of chord downstream, forming a **short bubble** that behaves as a modified, slightly thicker shape. **The bubble is benign if short and catastrophic if long**, and the reason small UAV wings and micro-air-vehicle airfoils are designed with a **laminar separation bubble** as an intended feature is that the bubble's effective camber can add lift; the reason a model aircraft's wing stalls at half the section's two-dimensional value is that the bubble has become long.
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
**The $e^N$ method.** Amplification factors are integrated along the neutral-stability envelope:
$$
N \left( s \right) = \int_{x_{\mathrm{neutral}}}^{s} \left( - \frac{\mathrm{Im} \alpha}{1} \right) ds, \qquad
\text{transition at } N = N_{\mathrm{crit}}
$$
**with $N_{\mathrm{crit}} \approx 9$ for a quiet tunnel and $N_{\mathrm{crit}} \approx 4$ to $6$ for flight conditions** — and the reason the number is not universal is that it is a **model of the environment** as much as of the flow.
**The Reynolds number at transition.**
$$
\mathrm{Re}_{\theta, t} = \frac{U_e \theta}{\nu} \bigg|_t \approx
\begin{cases}
1{,}400 & \text{quiet pressurised tank, } \mathrm{Tu} = 0.05\ \% \\
500 & \text{good subsonic wind tunnel, } \mathrm{Tu} = 0.3\ \% \\
300 & \text{atmospheric boundary layer, } \mathrm{Tu} = 2\ \%
\end{cases}
$$
**The number that makes a wind-tunnel result a wind-tunnel result.** **The transition location on the same airfoil at the same Reynolds number differs by a factor of four between a quiet tank and a production tunnel**, and the reason a laminar-flow airfoil's section-drag polar must be measured in a tunnel whose turbulence level is quoted to two significant figures is that the drag bucket's position moves by $20\ \%$ chord for a $0.1\ \%$ change in turbulence.
**The transition trip.** A $0.5\ \mathrm{mm}$-diameter wire or a $1\ \mathrm{mm}$-wide adhesive strip at $x / c = 0.02$ forces transition, and the reason a wind-tunnel model carries one is to make the **lift** and **pitching-moment** data repeatable — at the cost of making the **drag** data wrong. **The reason a section-drag polar taken with a trip is used only for the turbulent reference and never for the design point is that the trip's own drag is $5$ to $10\ \%$ of the total.**
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
**The number that makes the correction term the whole of the laminar benefit.** At $\mathrm{Re}_L = 10^7$ the two terms are $2.946 \times 10^{- 3}$ and $1.742 \times 10^{- 4}$ — **the correction is $5.9\ \%$ of the total**, which is the drag saved by keeping the first $5\ \%$ of the plate laminar. **Keeping half the plate laminar** at the same $\mathrm{Re}_L$ means $\mathrm{Re}_t = 4.97 \times 10^6$, for which $A = 13{,}870$, the correction is $1.40 \times 10^{- 3}$ and $\bar{C}_f = 1.55 \times 10^{- 3}$ — **a $47\ \%$ reduction** — and the reason the airline industry's laminar-flow programmes target a $10\ \%$ fuel burn and not $35\ \%$ is that the wing's **swept** panels are crossflow-unstable and the practical laminar extent is $20$ to $30\ \%$ of chord.
**The rough plate.** Once $k_s^+ > 70$ the flow is fully rough and $C_f$ is **independent of Reynolds number**:
$$
C_f = \left( 1.89 + 1.62\, \log_{10} \frac{x}{k_s} \right)^{- 2.5}
$$
**The number that makes a ship's hull a maintenance cost.** For a barnacle fouling of $k_s = 3\ \mathrm{mm}$ on a $250\ \mathrm{m}$ tanker, $x / k_s \approx 10^5$ and $C_f = 0.0092$ against a smooth-hull value of $0.0015$ — **a factor of six**, and the reason a shipping line's dry-docking interval is an economic optimisation with a $1.5\ \%$-per-month hull-roughness penalty is that factor and not a rule of thumb.
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
**(c) Natural transition.** $x_t = 5 \times 10^5 \times \nu / U = 0.02515\ \mathrm{m}$ — **the first $25\ \mathrm{mm}$**:
$$
\bar{C}_f = \frac{0.074}{\mathrm{Re}_L^{0.2}} - \frac{1{,}742}{\mathrm{Re}_L}
= 2.95 \times 10^{- 3} - 1.75 \times 10^{- 4} = 2.77 \times 10^{- 3}
\qquad \Rightarrow \qquad D = 7.52\ \mathrm{N}
$$
**The reading.** **The natural transition saves $5.9\ \%$ of the drag.** The laminar run is $0.5\ \%$ of the plate and the saving is $5.9\ \%$ of the drag — the ratio is about twelve to one, and the reason is that the local $C_f$ at the transition point is high because $\mathrm{Re}_x$ is low. **The number that makes laminar flow worth pursuing is the same ratio at a higher transition Reynolds number:** with $\mathrm{Re}_t = 5 \times 10^6$ the correction term becomes $A / \mathrm{Re}_L = 1.40 \times 10^{- 3}$ and the saving is $48\ \%$, and the reason the achievable saving rises so steeply with $\mathrm{Re}_t$ is that $A$ grows as $\mathrm{Re}_t^{0.8}$.
**The shape factor at the trailing edge.** For the turbulent case, $H = \delta^* / \theta = 1.3$ gives $\delta^* = 10.7\ \mathrm{mm}$ and $\delta_{99} / \delta^* = 11$; for the laminar case $H = 2.59$ gives $\delta^* = 2.72\ \mathrm{mm}$ and $\delta_{99} / \delta^* = 2.9$. **The turbulent layer is nine times thicker and its displacement thickness only three and a half times larger** — and the reason a wind tunnel's blockage correction is computed from $\delta^*$ and not from $\delta_{99}$ is that $\delta^*$ is the mass deficit and $\delta_{99}$ is a convention.
*Sanity.* The reason the turbulent layer is so much thicker is that the $1 / 7$-power profile carries less momentum near the wall and the layer must be thicker to transport the same shear. **The ratio $\delta_{99} / \theta$ is $7.5$ for Blasius and $10.3$ for the $1 / 7$-power layer**, and the reason the momentum thickness is the better measure of a layer's "size" is that it is the quantity the momentum integral equation evolves and the quantity that appears in $\mathrm{Re}_{\theta, t}$.
:::
:::

::: example Wind-tunnel blockage {#ex-blockage}
A closed-return wind tunnel has a test section of $1.0 \times 0.8\ \mathrm{m}$ and a settling-ratio of $6:1$. The boundary layer on the four walls at the test section has $\theta = 8\ \mathrm{mm}$ and $H = 1.4$. Find the displacement-area blockage, the correction to the test-section velocity, and the wall divergence angle needed to hold the core velocity constant.
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
**The number that makes this a first-order error and not a correction.** **$5.3\ \%$ in velocity is $10.6\ \%$ in dynamic pressure and $10.6\ \%$ in every force coefficient that is not corrected.** A drag count is $10^{-4}$ in $C_D$ and a modern airliner's total is $250$ counts, so a $10\ \%$ error in $q$ is $25$ counts — **ten times the effect a laminar-flow trip study is trying to measure**. **The reason a closed-return tunnel's test section is diverged by $0.3$ to $0.5$ degrees per wall is exactly this blockage**, and the reason an open-jet test section needs a different correction entirely is that its boundary is a free surface and not a wall.
**The divergence angle.** To hold the core velocity constant the **available** area must grow at the rate the blockage grows:
$$
\frac{d}{dx} \left( P \delta^{*} \right) = P \frac{d \delta^*}{dx} = 2 W \tan \alpha \quad \text{(per unit width on two walls)}
$$
With $d \delta^* / dx \approx \delta^* / x \approx 0.0112 / 1.0 = 0.0112$ (a rough estimate for a zero-gradient layer) and $P = 3.6$:
$$
\frac{d \left( \Delta A \right)}{dx} = 3.6 \times 0.0112 = 0.0403\ \mathrm{m} \text{ per metre of length}
$$
**Spread over the $1.0\ \mathrm{m}$ test section this is $40\ \mathrm{mm}$ of added height, or $20\ \mathrm{mm}$ per wall — a divergence of $\tan \alpha = 0.020$, $\alpha = 1.15^{\circ}$.** **The reason real tunnels use $0.3$ to $0.5^{\circ}$ and not $1.15^{\circ}$ is that the blockage is mostly established in the settling chamber's contraction and grows only slowly through the test section**, so the required divergence is the **increment** and not the total.
**The number that makes the settling ratio matter.** A $6:1$ contraction gives a boundary-layer thickness at the test section of about $1 / 6$ of that in the settling chamber and a free-stream turbulence of $0.05$ to $0.1\ \%$; a $3:1$ contraction gives twice the thickness and four times the turbulence. **The reason a quiet tunnel is built with a large contraction and a long settling chamber is that the boundary layer and the turbulence are both set there and cannot be fixed downstream.**
*Sanity.* The reason $\Delta A \approx P \delta^*$ is right to first order is that the blocked area is the mass deficit divided by the core density, and the mass deficit of a perimeter strip is $\rho U_e \delta^* P$. **The second-order term $\delta^{*2}$ is $1.6\ \%$ of the first and is negligible; the term one omits in a corner — where two layers merge and the blockage is larger than $P \delta^*$ — is $5$ to $10\ \%$ of the total**, and the reason a rectangular tunnel's blockage correction is calibrated with a dummy model is that the corners are not analytically tractable.
:::
:::

::: example The drag crisis {#ex-crisis}
A $42.7\ \mathrm{mm}$ golf ball is struck at $70\ \mathrm{m / s}$. Find the Reynolds number, the drag coefficient with and without dimples, and the ratio of the ranges.
::: solution
**The Reynolds number.** With $\nu = 1.509 \times 10^{- 5}$:
$$
\mathrm{Re} = \frac{70 \times 0.0427}{1.509 \times 10^{- 5}} = 1.98 \times 10^5
$$
**The dimpled ball.** The dimples trip the boundary layer at $\mathrm{Re} \approx 4 \times 10^4$, so at $2 \times 10^5$ the layer is turbulent and separates late:
$$
C_D \approx 0.23
$$
**The smooth ball.** At $\mathrm{Re} = 2 \times 10^5$ the layer is still laminar at separation and the flow is **subcritical**:
$$
C_D \approx 0.47
$$
**The drag ratio.** $0.47 / 0.23 = 2.04$ — **the smooth ball experiences more than twice the drag**.
**The range.** With drag $\propto C_D V^2$ and no lift, a simple ballistic estimate gives a range proportional to $1 / \sqrt{C_D}$ at a fixed launch speed and angle:
$$
\frac{R_{\mathrm{dimpled}}}{R_{\mathrm{smooth}}} = \sqrt{\frac{0.47}{0.23}} = 1.43
$$
**a $43\ \%$ increase, and the observed value for a driven ball is about $50\ \%$** — the extra coming from the dimples' lift, which is also higher because the turbulent layer separates later on the pressure surface.
**The number that makes the dimples a Reynolds-number device and not a turbulence device.** The dimple depth is $0.25\ \mathrm{mm}$, and the roughness Reynolds number is
$$
k_s^+ = \frac{0.00025 \times 70 \sqrt{0.02 / 2}}{1.509 \times 10^{- 5}} \approx 116 \gg 70
$$
**fully rough**, which is exactly what is wanted — the trip works at every speed a human can swing. **The number that makes a smooth ball's drive shorter than a dimpled one's by fifty metres is the same $k_s^+$**, and the reason a **table-tennis** ball is smooth is that at $\mathrm{Re} \approx 5 \times 10^4$ the dimples would be in the **hydraulically smooth** regime and would only add skin friction: $k_s^+ \approx 3$ at $20\ \mathrm{m / s}$ for a $40\ \mathrm{mm}$ ball, and the trip would not work.
*Sanity.* The reason the crisis is a factor of four on a sphere and only a factor of four on a cylinder is that both are set by the separation point moving from $82^\circ$ to $120^\circ$, and the base pressure coefficient rises from $- 1.2$ to $- 0.6$. **The reason a smooth sphere's $C_D$ at $\mathrm{Re} = 10^6$ is $0.1$ and a rough sphere's at the same $\mathrm{Re}$ is $0.2$ is that over-tripping moves the separation point forward again** — and the reason a golf ball's dimple pattern is an optimisation and not a simple trip is that the optimum is a balance between tripping early enough and not creating so much skin friction that the benefit is lost.
:::
:::

::: example Streamlining {#ex-streamline}
Find the optimum fineness ratio of a body of revolution of length $L$ and maximum diameter $D$ moving through water at $\mathrm{Re}_L = 10^8$, and compare its drag with that of a sphere of the same displacement.
::: solution
**The two drags.** For a slender body of revolution with a turbulent boundary layer, the total drag is the sum of a friction drag that grows with wetted area and a pressure drag that grows with bluntness:
$$
C_{D, \mathrm{fric}} = \bar{C}_f \frac{S}{S_0}, \qquad
C_{D, \mathrm{press}} \approx \frac{2.17}{\left( L / D \right)^{2.4}} \quad \text{(empirical, } 2 < L / D < 10 \text{)}
$$
referred to the maximum cross-section $S_0 = \pi D^2 / 4$.
**The numbers.** With $\bar{C}_f = 0.455 / \left( \log_{10} 10^8 \right)^{2.58} = 0.455 / 4{,}152 = 1.10 \times 10^{- 3}$ and $S / S_0 \approx 1.2 \left( L / D \right)$ for a prolate shape:
$$
\begin{array}{c c c c}
L / D & C_{D, \mathrm{fric}} & C_{D, \mathrm{press}} & C_{D, \mathrm{total}} \\
2 & 2.64 \times 10^{- 3} & 0.411 & 0.414 \quad \text{— blunt} \\
4 & 5.28 \times 10^{- 3} & 0.078 & 0.083 \\
6 & 7.92 \times 10^{- 3} & 0.029 & 0.037 \\
8 & 1.06 \times 10^{- 2} & 0.016 & 0.027 \\
11 & 1.45 \times 10^{- 2} & 0.007 & 0.021 \quad \text{— the minimum} \\
14 & 1.85 \times 10^{- 2} & 0.004 & 0.022 \\
20 & 2.64 \times 10^{- 2} & 0.002 & 0.028 \quad \text{— friction-dominated}
\end{array}
$$
**The optimum is at $L / D \approx 11$** for a body whose volume is held fixed and whose wetted area grows linearly with $L / D$.
**The number that makes a submarine's hull a compromise and not an optimum.** At $L / D = 11$ the drag coefficient is $0.021$ against a sphere's $0.47$ — **a factor of twenty-two** — but the pressure drag is only $32\ \%$ of the total at that fineness ratio, so **a further improvement is a skin-friction problem and not a shape problem**. **The reason a submarine's hull is $L / D \approx 8$ and not $11$ is that the pressure hull must carry the sea pressure, the machinery must fit inside, and the drag penalty of the shorter form is $0.027 / 0.021 = 1.26$ — a $26\ \%$ increase that buys a boat that can be built.**
**The number that makes a torpedo's nose shape a $10\ \%$ item.** The empirical pressure-drag law above is for an **ogival** nose; a **von Kármán** ogive, whose profile is the body of revolution of minimum pressure drag for a given length and diameter, reduces the pressure drag by a further $15$ to $20\ \%$ at $L / D = 6$. **The reason the difference is worth computing at all is that at $L / D = 6$ the pressure drag is $79\ \%$ of the total**, so a $20\ \%$ improvement in it is a $16\ \%$ improvement in the whole.
*Sanity.* The reason the optimum exists is that friction grows as $L$ while pressure drag falls as $L^{- 2.4}$, so the sum has a minimum; **the exponent $- 2.4$ is what makes the minimum shallow and broad** — between $L / D = 8$ and $L / D = 20$ the total drag changes by only $30\ \%$. **The reason a real design is therefore free to choose a shorter form is that the drag curve is flat near its minimum, and the reason the same argument does not apply to an airfoil's thickness is that the airfoil's pressure drag is a separation and not a wake phenomenon, and its curve is not flat at all.**
:::
:::

::: history
**Prandtl**'s 1904 Heidelberg note *Über Flüssigkeitsbewegung bei sehr kleiner Reibung* is three pages and contains no solution — only the equations and the argument; **Blasius** published the similarity solution in **1908** as a *Festschrift* contribution to **Münchow**, and the paper's title translates as "top and friction resistance in fluids of small viscosity", and it was written by a **PhD student** who never held an academic post. **von Kármán**'s integral method is of **1921**, from the same Göttingen institute, and was suggested to him by **Prandtl** as a way of getting an engineering answer without solving the equations; **Pohlhausen**'s quartic-profile version is of **1921** too. **Falkner** and **Skan** published their table in **1931** in a report on the drag of aerofoils at the **National Physical Laboratory**, and the separation eigenvalue $m = - 0.0904$ is the number every stability lecture quotes. **Tollmien** (**1929**) and **Schlichting** (**1933**) found the instability of the laminar layer; **Heisenberg** published a mixing-length theory of the turbulent layer in **1936**; **Theodorsen** and **Meksyn** produced the early turbulent friction laws; and **the experimental confirmation of T–S waves had to wait until Schubauer and Skramstad's 1947 NACA report, which used a $50$-foot low-turbulence tunnel built specifically for the purpose and confirmed the theory to within the measurement error — eighteen years of theory validated in one summer of experiment.** **The drag crisis on spheres was measured by Lord Rayleigh in 1911 and explained as a transition effect by Goldstein in 1929**; **the golf ball's dimples were patented by Gilmour in 1932 and the physics was not published until the 1960s.** **The $e^N$ method is due to van Ingen in 1956 and to Morkovin in 1969, and it remains the standard production tool for transition prediction sixty years later, with a critical $N$ that nobody has been able to derive from first principles.**
:::

::: quiz

- [ ] Dimples generate turbulence, which increases skin friction, so they cannot reduce drag
- [x] On a bluff body the drag is pressure drag from a separated wake; a turbulent boundary layer separates later, and the wake it leaves is narrower by far more than the extra skin friction costs. On a wing the boundary layer is attached over nearly the whole chord, so there is no wake to shrink and the skin-friction penalty is not repaid
- [ ] Dimples work only at very low Reynolds numbers, where viscous forces dominate
- [ ] Dimples reduce the wetted area of the ball

::: solution
**The mechanism is separation, not friction.** A smooth sphere's drag coefficient falls from about $0.47$ to roughly $0.1$ at a Reynolds number near $3 \times 10^{ 5 }$ — the **drag crisis** — because the boundary layer transitions to turbulence, carries more momentum to the wall, and stays attached to about $140^{ \circ }$ instead of $82^{ \circ }$. A golf ball is deliberately operated above that transition, and the dimples also *trip* the layer at a lower Reynolds number than natural transition so the effect is reliable at the ball's actual speed. **A wing is the opposite problem: at $10^{ 7 }$ the boundary layer is turbulent whether you like it or not, so there is nothing to trip, and the entire technology of laminar-flow airfoils is the art of keeping the layer *laminar* for as long as possible because laminar skin friction is roughly a third of turbulent.** The same logic explains why a bicycle helmet is smooth, a golf ball is dimpled, a cricket ball has one polished side and one rough side, and why the "turbulators" sold for car fuel tanks do something real but small: they are tripping a layer that would have separated anyway.
:::
:::

## Where this leads

The pressure drag computed here is the input to [[fluid-mechanics/compressible-flow]]'s wave drag and to [[aerodynamics]]' drag polar; the separation criterion is the same one that limits a compressor diffuser and a [[fluid-mechanics/dimensional-analysis]]-nondimensionalised wind-tunnel wall; the transition physics is the reason [[aerodynamics]]' laminar-flow airfoils and [[aerodynamics]]' high-lift systems are designed with stability codes; and the skin-friction law is the whole of a ship's resistance prediction and half of [[flight-mechanics]]' range equation.

::: summary
- At high Reynolds number viscosity survives only in a layer of thickness $\delta / L \sim \mathrm{Re}^{-1/2}$; the boundary-layer equations are the balance of inertia, pressure gradient and wall-normal diffusion.
- $\delta^*$ is the mass deficit, $\theta$ the momentum deficit, and $H = \delta^*/\theta$ is the separation indicator: $2.59$ laminar, $1.35$ turbulent, $3.5$ separating.
- The von Kármán integral equation contains the whole of separation physics in its pressure-gradient term; drop it and you predict no separation ever.
- Separation is $\tau_w = 0$; it sets the base pressure and therefore the form drag of every bluff body.
- The drag crisis is a transition effect: a factor of four on a sphere, and the reason a golf ball has dimples.
- Transition is not a property of the flow alone: $\mathrm{Re}_{\theta,t}$ ranges from 300 to 1,400 with the free-stream turbulence.
- Flat-plate drag: $\bar C_f = 1.328/\sqrt{\mathrm{Re}}$ laminar, $0.074/\mathrm{Re}^{0.2}$ turbulent, minus $A/\mathrm{Re}$ for natural transition.
- The boundary layer blocks the flow: $\Delta A = P\delta^*$, and in a wind tunnel that is a $10\%$ error in every force coefficient.
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
\frac{x}{c} = 0.0694^{1 / 0.8} = 0.0365
$$
**Transition at $3.7\ \%$ chord** — and the reason a $\mathrm{Re}_\theta$ criterion is used rather than a $\mathrm{Re}_x$ criterion is that $\theta$ carries the pressure-gradient history of the layer, so the same critical value applies on a suction peak and on a aft-loaded section. **At $3.7\ \%$ chord the laminar benefit is worth only about $3\ \%$ of the drag**, and the reason the section is nevertheless a good one is that its pressure distribution is favourable over the first $40\ \%$ and the transition criterion is optimistic in a quiet tunnel and pessimistic in flight.
:::
:::

::: exercise Fineness ratio {level=2}
For the body-of-revolution drag of the worked example, give the ratio of the total drag at $L/D = 6$ to that at $L/D = 14$, and state which term dominates at each.
::: solution
$$
\frac{C_{D, \mathrm{total}} \left( 6 \right)}{C_{D, \mathrm{total}} \left( 11 \right)} = \frac{0.037}{0.021} = 1.76
$$
**At $L / D = 6$ the pressure drag is $79\ \%$ of the total; at $L / D = 11$ it is $32\ \%$.** The reason the ratio is not larger is that the friction drag has grown by a factor of $1.8$ between the two, and the reason a designer trades the $2.84$ for structural volume is that the pressure-drag term is a function of the **nose** shape and can be improved by $20\ \%$ with a von Kármán ogive, whereas the friction term can only be improved by $6$ to $8\ \%$ with riblets or by laminar-flow control, which is not available in water at this Reynolds number.
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
**The diagnosis.** At $C_L = 2.4$ a triple-slotted flap wing's outboard section is at a **trailing-edge** separation; the section maximum is limited by the flap's pressure side, and the wing's spanwise loading limits the lift at the tip by **crossflow** separation. **The three limits need three different devices.**
**The device selection.**
$$
\begin{array}{l l c l}
\text{Leading-edge slat} & \text{re-energises the suction peak, delays T–S separation} & 0.35 & \text{lift increment} \\
\text{Trailing-edge flap, double-slotted} & \text{increases camber and } C_{\mu} & 0.55 & \\
\text{Vortex generators} & \text{mix high-energy fluid into the crossflow layer} & 0.08 & \\
\text{Boundary-layer suction on the flap cove} & \text{removes the low-energy fluid directly} & 0.12 & \\
\text{Gurney flap} & \text{trips the wake, increases base suction} & 0.06 & \text{drag penalty}
\end{array}
$$
**The chosen scheme:** a **fixed** leading-edge slat (no new mechanism, no new certification item), a **double-slotted** trailing-edge flap with $60\%$ chord and $35^\circ$ deflection, **vortex generators** on the outboard upper surface, and **no suction** — the suction system's $12\ \%$ increment does not pay for its bleed-air cost, its ice sensitivity and its maintenance.
**The vortex-generator sizing.** A $\mathrm{VG}$ of height $h$ should be about **half the incoming boundary-layer thickness**:
$$
\delta \left( x = 0.6 c \right) \approx 0.37 c \mathrm{Re}_c^{- 0.2} = 0.37 \times 3.2 \times \left( 8 \times 10^6 \right)^{- 0.2} = 0.0191\ \mathrm{m}
\qquad \Rightarrow \qquad h = 9.5\ \mathrm{mm}
$$
**A rectangular $\mathrm{VG}$ of $9.5\ \mathrm{mm}$ height, $19\ \mathrm{mm}$ chord, at $18^\circ$ incidence, spaced $60\ \mathrm{mm}$ apart** — a $\mathrm{VG}$-to-height spacing ratio of $6.3$, in the recommended $5$ to $10$ band.
**The number that makes the VG's cost real.** Each $\mathrm{VG}$ produces a parasite drag of about $0.5$ counts and the array of $48$ per wing costs **$24$ counts in cruise** against a lift increment of $0.08$ at take-off. **The reason they are nevertheless fitted is that the $0.08$ buys $600\ \mathrm{kg}$ of take-off weight in a shorter field, and the $24$ counts cost $0.4\ \%$ in cruise fuel** — and the reason the trade is done per mission and not per airframe is that a regional aircraft's sector length distribution is bimodal.
**The slat cove.** A fixed slat with a gap of $1.5\ \mathrm{mm}$ and an overlap of $3\ \mathrm{mm}$ accelerates the flow through the cove, blowing high-energy air onto the main element's suction peak:
$$
\frac{U_{\mathrm{slat\, exit}}}{U_{\infty}} \approx 1.6 \quad \text{at } C_L = 2.4
$$
**The number that makes the slat cove a noise source.** The shear layer at the slat exit is the dominant airframe noise source on approach at $\mathrm{Re} > 10^7$, and the reason a modern slat has a **porous** or **serrated** exit lip is that the noise scales as $U^5$ in this regime and a $20\ \%$ velocity reduction is a $2\ \mathrm{dB}$ gain.
**The failure modes.**
$$
\begin{array}{l l}
\text{Insect contamination of the } \mathrm{VGs} & \text{loss of the } 0.08 \text{ increment; inspected at every } A \text{ check} \\
\text{Ice in the slat cove} & \text{the } 1.5\ \mathrm{mm} \text{ gap freezes; anti-ice required, and this drove the fixed-slat choice} \\
\text{Flap-track fairing wear} & \text{a } 1\ \mathrm{mm} \text{ step costs } 4 \text{ counts} \\
\text{Seal degradation at the flap nose} & \text{the through-gap leakage is } 30\ \% \text{ of the high-lift drag} \\
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
**The four clauses that protect the buyer.** **"THE HIGH-LIFT SYSTEM'S MAXIMUM LIFT COEFFICIENT SHALL BE DEMONSTRATED AT FLIGHT REYNOLDS NUMBER AND FLIGHT TURBULENCE LEVEL, AND THE TEST REYNOLDS NUMBER AND ITS CORRECTION SHALL BE REPORTED."** **"THE DRAG PENALTY OF EVERY VORTEX GENERATOR ARRAY SHALL BE REPORTED IN DRAG COUNTS AT THE CRUISE CONDITION AND NOT ONLY AS A LIFT INCREMENT."** **"THE SYSTEM'S SENSITIVITY TO INSECT CONTAMINATION, ICE AND SEAL WEAR SHALL BE QUANTIFIED AND THE MAINTENANCE INTERVAL SET FROM THE MEASURED DEGRADATION RATE."** **"THE STALL MUST BE A WING-ROOT STALL WITH AT LEAST TEN DEGREES OF BUFFER BEFORE ANY CONTROL-SURFACE EFFECTIVENESS IS LOST."**
*Design comment.* The general rule is that **every high-lift device is a boundary-layer-control device, and its benefit is a delay of separation while its cost is a drag and a maintenance item** — which is why the modern trend is toward **fewer, simpler** devices with better understood physics rather than more devices with better performance, and why the certification requirement that matters is the contaminated-airframe clause and not the clean-airframe $C_{L,\max}$.
:::
:::
