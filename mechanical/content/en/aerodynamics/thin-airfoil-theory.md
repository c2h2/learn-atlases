[[aerodynamics/potential-flow]] ended with a theorem and a gap. The theorem: any two-dimensional body in steady potential flow has lift $L' = \rho_\infty V_\infty\Gamma$. The gap: potential flow alone admits every value of the circulation $\Gamma$. This chapter closes the gap for real airfoils with their sharp trailing edges. The **Kutta condition** — the flow leaves the trailing edge smoothly — selects one circulation, and with it one lift. Modelling a thin airfoil as a sheet of vortices along its camber line then turns the problem into a single integral equation, which can be solved in closed form. The results are some of the most useful formulas in aeronautics: the lift-curve slope $2\pi$ per radian, the aerodynamic centre at the quarter-chord, and two integrals over the camber-line slope that give the zero-lift angle and the pitching moment of any thin section. They also explain how a trailing-edge flap works.

You will need [[aerodynamics/potential-flow]] (vortices, circulation, Kutta–Joukowski) and the coefficients and aerodynamic centre of [[aerodynamics/aerodynamic-forces]]. The mathematics is a Fourier series and one standard integral, which is proved below.

## Airfoil geometry

::: definition Airfoil nomenclature {#def-airfoil}
The **leading edge** and **trailing edge** are the most forward and most rearward points of the section, and the straight line joining them is the **chord line**, of length $c$. The **mean camber line** is the locus of points midway between the upper and lower surfaces, measured perpendicular to the camber line itself; its greatest distance from the chord is the **maximum camber** $h$, at a position $x = p\,c$. The **thickness** is the distance between the surfaces measured perpendicular to the camber line, with maximum value $t$. The **angle of attack** $\alpha$ is the angle between the chord line and the free stream. Camber, its position and thickness are usually quoted as fractions of the chord.
:::

The best-known systematic family is the NACA four-digit series, defined analytically in the 1930s. In the designation NACA $MPTT$, $M$ is the maximum camber in per cent of chord, $P$ its position in tenths of chord and $TT$ the thickness in per cent: the NACA 2412 has 2 per cent camber at 40 per cent chord and 12 per cent thickness, and the NACA 0012 is the symmetric 12 per cent section. With $\xi = x/c$, $m = M/100$ and $p = P/10$, the camber line consists of two parabolic arcs,
$$
\frac{z}{c} = \begin{cases} \dfrac{m}{p^2}\left(2p\xi - \xi^2\right), & 0 \le \xi \le p,\\[2mm] \dfrac{m}{(1-p)^2}\left(1 - 2p + 2p\xi - \xi^2\right), & p \le \xi \le 1,\end{cases}
$$ {#eq-naca-camber}
and the half-thickness distribution for thickness ratio $\tau$ is
$$
\frac{y_t}{c} = 5\tau\left(0.2969\sqrt{\xi} - 0.1260\,\xi - 0.3516\,\xi^2 + 0.2843\,\xi^3 - 0.1015\,\xi^4\right),
$$ {#eq-naca-thickness}
laid off perpendicular to the camber line on either side. The thickness form has a round nose (the $\sqrt\xi$ term) and a small but finite trailing-edge thickness; the camber line has a continuous slope at $\xi = p$ but a jump in curvature.

::: widget plot
f: if(x < p, m/p^2*(2*p*x - x^2), m/(1-p)^2*(1 - 2*p + 2*p*x - x^2)); if(x < p, m/p^2*(2*p*x - x^2), m/(1-p)^2*(1 - 2*p + 2*p*x - x^2)) + 5*t*(0.2969*sqrt(x) - 0.126*x - 0.3516*x^2 + 0.2843*x^3 - 0.1015*x^4); if(x < p, m/p^2*(2*p*x - x^2), m/(1-p)^2*(1 - 2*p + 2*p*x - x^2)) - 5*t*(0.2969*sqrt(x) - 0.126*x - 0.3516*x^2 + 0.2843*x^3 - 0.1015*x^4)
x: 0, 1
y: -0.3, 0.3
equal: true
sliders: m=0.02:0:0.09:0.005, p=0.4:0.1:0.9:0.05, t=0.12:0.01:0.3:0.01
labels: \text{camber line}; \text{upper surface}; \text{lower surface}
caption: A NACA four-digit section from [[#eq-naca-camber]] and [[#eq-naca-thickness]], with the thickness added vertically (a good approximation for small camber). Start at the NACA 2412 ($m = 0.02$, $p = 0.4$, $t = 0.12$). Set $m = 0$ for the symmetric NACA 0012; raise $m$ and move $p$ to see how far camber can go before the lower surface becomes concave. Thin-airfoil theory, below, says that the **lift and moment depend only on the camber line**; the thickness affects the pressure distribution, the maximum lift and the drag, not the slope of the lift curve to first order.
:::

## The Kutta condition

A sharp trailing edge has a peculiar property in potential flow. For a generic value of $\Gamma$, the rear stagnation point sits somewhere on the upper surface, and the flow from the lower surface must whip round the sharp edge to reach it. Turning round a corner of zero radius requires infinite velocity (the potential behaves like $r^{1/2}$ near a cusp, so the speed behaves like $r^{-1/2}$). A real, slightly viscous fluid cannot do this: the boundary layer would separate at the edge. Experiment shows what happens instead.

::: definition The Kutta condition {#def-kutta}
For an airfoil with a sharp trailing edge in steady flow, the circulation takes the value for which **the flow leaves the trailing edge smoothly**, with finite velocity there. Equivalently: for a finite trailing-edge angle the trailing edge is a stagnation point; for a cusped trailing edge the velocities on the two surfaces are finite and equal there. For a vortex-sheet model with strength $\gamma(s)$ per unit length, the condition is
$$
\gamma(\text{TE}) = 0 .
$$
:::

The last form follows because the jump in tangential velocity across a vortex sheet equals its local strength, $u_\text{upper} - u_\text{lower} = \gamma$, and at the trailing edge the two surface velocities must agree (both zero, or equal and finite). How does the flow "know" to choose this circulation? When an airfoil starts from rest the flow at first *does* whip round the trailing edge, the boundary layer separates there and rolls up into a **starting vortex** that is shed downstream. By Kelvin's theorem the total circulation of a large curve enclosing both airfoil and starting vortex stays zero, so the airfoil is left with a circulation equal and opposite to that of the starting vortex. Shedding continues until the flow leaves the trailing edge smoothly — the Kutta condition — and then stops. The starting vortex is visible in water-tank flow visualisations of an impulsively started airfoil.

## The vortex-sheet model and the fundamental equation

Replace the airfoil by a **vortex sheet**: a continuous distribution of vortices along a curve, with strength $\gamma(s)$ (circulation per unit length, $\mathrm{m/s}$, clockwise positive). A short element $ds$ is a point vortex of strength $\gamma\,ds$, so its contribution to the velocity at distance $r$ is $\gamma\,ds/(2\pi r)$, and the total circulation of the sheet is $\Gamma = \int\gamma\,ds$. For a thin airfoil, three simplifications are made:

1. thickness is ignored; the airfoil is its camber line $z(x)$;
2. the camber $h/c$ and the angle of attack $\alpha$ are small, so slopes are small and $\sin\alpha \approx \tan\alpha \approx \alpha$;
3. consequently the vortex sheet can be placed on the **chord line** instead of the camber line, while the tangency condition is still applied with the camber-line slope.

::: proposition The fundamental equation of thin-airfoil theory {#prop-fundamental}
Under the assumptions above, with $x$ and $\xi$ measured along the chord from the leading edge, the vortex-sheet strength $\gamma(\xi)$ must satisfy
$$
\frac{1}{2\pi}\int_0^c \frac{\gamma(\xi)\,d\xi}{x - \xi} = V_\infty\left(\alpha - \frac{dz}{dx}\right), \qquad 0 < x < c,
$$ {#eq-fundamental}
(the integral taken as a Cauchy principal value) together with the Kutta condition $\gamma(c) = 0$.
:::

::: proof
The camber line must be a streamline: the velocity component normal to it is zero. At a point $x$ on the camber line the free stream $V_\infty$, inclined at $\alpha$ to the chord, has a component normal to the camber line equal to $V_\infty\sin\left(\alpha - \arctan\tfrac{dz}{dx}\right) \approx V_\infty\left(\alpha - \tfrac{dz}{dx}\right)$ for small angles, directed upward through the camber line. The vortex sheet on the chord induces a vertical velocity $w(x)$; for small slopes the normal component of $w$ is $w$ itself. A clockwise element $\gamma(\xi)\,d\xi$ at $\xi$ induces at $x > \xi$ a *downward* velocity (clockwise rotation carries fluid downward on its right), of magnitude $\gamma\,d\xi/(2\pi(x - \xi))$; the same expression with $x < \xi$ gives an upward velocity, so with upward positive
$$
w(x) = -\frac{1}{2\pi}\int_0^c\frac{\gamma(\xi)\,d\xi}{x - \xi} .
$$
The tangency condition is $V_\infty(\alpha - dz/dx) + w(x) = 0$, which is [[#eq-fundamental]]. The integrand is singular at $\xi = x$, but the contributions from either side cancel in the principal-value sense. Assumptions: two-dimensional, steady, incompressible, inviscid flow; small $\alpha$, camber and thickness; the sheet placed on the chord; and the Kutta condition imposed as $\gamma(c) = 0$.
:::

Equation [[#eq-fundamental]] is linear in $\gamma$, and the right-hand side separates into an angle-of-attack part and a camber part. The standard technique is the **Glauert substitution**
$$
\xi = \frac{c}{2}\left(1 - \cos\theta_0\right), \qquad x = \frac{c}{2}\left(1 - \cos\theta\right),
$$ {#eq-glauert-sub}
which maps the leading edge to $\theta = 0$ and the trailing edge to $\theta = \pi$, and the one integral we need:

::: lemma Glauert's integral {#lem-glauert}
For integer $n \ge 0$ and $0 < \theta < \pi$,
$$
\int_0^\pi \frac{\cos n\theta_0\,d\theta_0}{\cos\theta_0 - \cos\theta} = \frac{\pi\sin n\theta}{\sin\theta}
$$
in the principal-value sense, and consequently
$$
\int_0^\pi \frac{\sin n\theta_0\,\sin\theta_0\,d\theta_0}{\cos\theta_0 - \cos\theta} = -\pi\cos n\theta \quad (n \ge 1).
$$
:::

::: proof
For $n = 0$ the integral is zero: substitute $t = \tan(\theta_0/2)$, which turns it into a principal-value integral of a rational function whose logarithmic antiderivative takes equal values at the two ends. Write $I_n(\theta)$ for the left side. Since $\cos(n+1)\theta_0 + \cos(n-1)\theta_0 = 2\cos n\theta_0\cos\theta_0 = 2\cos n\theta_0(\cos\theta_0 - \cos\theta) + 2\cos n\theta_0\cos\theta$,
$$
I_{n+1} + I_{n-1} = 2\int_0^\pi\cos n\theta_0\,d\theta_0 + 2\cos\theta\,I_n = 2\pi\,\delta_{n0} + 2\cos\theta\,I_n .
$$
With $I_0 = 0$, $n = 0$ gives $2I_1 = 2\pi$ (since $I_{-1} = I_1$), so $I_1 = \pi = \pi\sin\theta/\sin\theta$. For $n \ge 1$, the recurrence $I_{n+1} = 2\cos\theta\,I_n - I_{n-1}$ is exactly the recurrence satisfied by $\pi\sin n\theta/\sin\theta$ (from $\sin(n+1)\theta + \sin(n-1)\theta = 2\sin n\theta\cos\theta$), and the two sequences agree for $n = 0, 1$, so they agree for all $n$. The second form follows from $\sin n\theta_0\sin\theta_0 = \tfrac12\left[\cos(n-1)\theta_0 - \cos(n+1)\theta_0\right]$ and $\sin(n-1)\theta - \sin(n+1)\theta = -2\cos n\theta\sin\theta$.
:::

## The symmetric airfoil

::: theorem Thin symmetric airfoil {#thm-symmetric}
For a thin symmetric airfoil (or flat plate, $dz/dx = 0$) at angle of attack $\alpha$, the vortex-sheet strength satisfying [[#eq-fundamental]] and the Kutta condition is
$$
\gamma(\theta) = 2\alpha V_\infty\,\frac{1 + \cos\theta}{\sin\theta},
$$ {#eq-gamma-flat}
and the section has
$$
c_l = 2\pi\alpha, \qquad c_{m,LE} = -\frac{c_l}{4}, \qquad c_{m,c/4} = 0,
$$
so both the centre of pressure and the aerodynamic centre are at the quarter-chord.
:::

::: proof
*Verification.* With [[#eq-glauert-sub]], $x - \xi = \tfrac{c}{2}(\cos\theta_0 - \cos\theta)$ and $d\xi = \tfrac{c}{2}\sin\theta_0\,d\theta_0$. Substituting [[#eq-gamma-flat]] into the left side of [[#eq-fundamental]]:
$$
\frac{1}{2\pi}\int_0^\pi \frac{2\alpha V_\infty(1 + \cos\theta_0)}{\cos\theta_0 - \cos\theta}\,d\theta_0
= \frac{\alpha V_\infty}{\pi}\left(I_0 + I_1\right) = \frac{\alpha V_\infty}{\pi}(0 + \pi) = \alpha V_\infty ,
$$
which is the right side with $dz/dx = 0$. At the trailing edge, $\theta \to \pi$, $(1 + \cos\theta)/\sin\theta \to 0$, so the Kutta condition holds. (The solution is unique once the Kutta condition is imposed: the homogeneous equation has the single solution $1/\sin\theta$, which is infinite at the trailing edge.)

*Lift.* The circulation is
$$
\Gamma = \int_0^c\gamma\,d\xi = \frac{c}{2}\int_0^\pi 2\alpha V_\infty(1 + \cos\theta)\,d\theta = \pi\alpha c V_\infty ,
$$
so $L' = \rho_\infty V_\infty\Gamma = \pi\alpha c\,\rho_\infty V_\infty^2$ and $c_l = L'/(\tfrac12\rho_\infty V_\infty^2 c) = 2\pi\alpha$.

*Moment.* Each element $\gamma\,d\xi$ carries lift $\rho_\infty V_\infty\gamma\,d\xi$ at distance $\xi$ behind the leading edge, giving a nose-down moment, so
$$
M'_{LE} = -\rho_\infty V_\infty\int_0^c\xi\gamma\,d\xi = -\rho_\infty V_\infty\,\alpha V_\infty\frac{c^2}{2}\int_0^\pi(1 - \cos\theta)(1 + \cos\theta)\,d\theta = -\frac{\pi}{4}\alpha c^2\rho_\infty V_\infty^2 ,
$$
using $\int_0^\pi\sin^2\theta\,d\theta = \pi/2$. Hence $c_{m,LE} = -\pi\alpha/2 = -c_l/4$, and by moment transfer $c_{m,c/4} = c_{m,LE} + c_l/4 = 0$ for every $\alpha$: the quarter-chord is both the centre of pressure and the aerodynamic centre.
:::

The loading itself is worth looking at. Across the sheet the pressure jump is $p_l - p_u = \rho_\infty V_\infty\gamma$ (Bernoulli with the velocity jump $\gamma$ and the mean velocity $\approx V_\infty$), so $C_{p,l} - C_{p,u} = 2\gamma/V_\infty$. In chordwise coordinates, using $(1+\cos\theta)/\sin\theta = \sqrt{(1 + \cos\theta)/(1 - \cos\theta)} = \sqrt{(c - x)/x}$,
$$
\Delta C_p = C_{p,l} - C_{p,u} = 4\alpha\sqrt{\frac{c - x}{x}} .
$$ {#eq-dcp-flat}
The loading is infinite at the leading edge and zero at the trailing edge. The leading-edge singularity is integrable and is the thin-airfoil version of the suction peak on a real rounded nose: it produces a forward-pointing **leading-edge suction force** that exactly cancels the drag component $N'\sin\alpha$ of the normal force, leaving zero drag, as Kutta–Joukowski requires.

::: example A flat plate at 5° {#ex-flat-plate}
A thin flat plate of chord $1.5\,\mathrm{m}$ is at $\alpha = 5^\circ$ in a sea-level stream at $40\,\mathrm{m/s}$. Find $c_l$, the circulation, the lift per unit span, and the loading $\Delta C_p$ at mid-chord.
::: solution
$\alpha = 5\pi/180 = 0.08727\,\mathrm{rad}$, so $c_l = 2\pi\alpha = 0.548$. The circulation is $\Gamma = \pi\alpha cV_\infty = \pi(0.08727)(1.5)(40) = 16.45\,\mathrm{m^2/s}$ and $L' = \rho_\infty V_\infty\Gamma = 1.225(40)(16.45) = 806\,\mathrm{N/m}$; as a check, $q_\infty c\,c_l = 980 \times 1.5 \times 0.548 = 806\,\mathrm{N/m}$. At mid-chord $\sqrt{(c-x)/x} = 1$ and $\Delta C_p = 4\alpha = 0.349$. *Sanity check:* the measured lift-curve slope of real thin sections at high Reynolds number is about $0.10$–$0.11$ per degree, a few per cent under $2\pi/57.3 = 0.110$, so $c_l \approx 0.5$ at $5^\circ$ is realistic; a real flat plate, with its sharp leading edge, separates at the nose by about $8$–$10^\circ$.
:::
:::

## The cambered airfoil

For a cambered section, expand the solution as the flat-plate term plus a Fourier sine series that vanishes at both ends:
$$
\gamma(\theta) = 2V_\infty\left[A_0\,\frac{1 + \cos\theta}{\sin\theta} + \sum_{n=1}^\infty A_n\sin n\theta\right].
$$ {#eq-gamma-camber}

::: theorem Thin cambered airfoil {#thm-cambered}
The coefficients of [[#eq-gamma-camber]] are
$$
A_0 = \alpha - \frac{1}{\pi}\int_0^\pi\frac{dz}{dx}\,d\theta_0, \qquad A_n = \frac{2}{\pi}\int_0^\pi\frac{dz}{dx}\cos n\theta_0\,d\theta_0 \quad (n \ge 1),
$$ {#eq-An}
with $dz/dx$ evaluated at $x = \tfrac{c}{2}(1 - \cos\theta_0)$. The section coefficients are
$$
c_l = 2\pi\left(A_0 + \tfrac12 A_1\right) = 2\pi\left(\alpha - \alpha_{L=0}\right), \qquad
\alpha_{L=0} = -\frac{1}{\pi}\int_0^\pi\frac{dz}{dx}\left(\cos\theta_0 - 1\right)d\theta_0 ,
$$ {#eq-cl-camber}
$$
c_{m,c/4} = \frac{\pi}{4}\left(A_2 - A_1\right).
$$ {#eq-cm-camber}
The lift-curve slope is $2\pi$ per radian whatever the camber, the aerodynamic centre is at the quarter-chord, and $c_{m,ac}$ depends only on the camber line.
:::

::: proof
Substitute [[#eq-gamma-camber]] into [[#eq-fundamental]] with [[#eq-glauert-sub]]. The $A_0$ term gives $V_\infty A_0$, as in [[#thm-symmetric]]. Each $A_n$ term gives, by the second form of [[#lem-glauert]],
$$
\frac{1}{2\pi}\int_0^\pi\frac{2V_\infty A_n\sin n\theta_0\sin\theta_0}{\cos\theta_0 - \cos\theta}\,d\theta_0 = -V_\infty A_n\cos n\theta .
$$
So the equation becomes $A_0 - \sum A_n\cos n\theta = \alpha - dz/dx$, i.e.
$$
\frac{dz}{dx} = \left(\alpha - A_0\right) + \sum_{n=1}^\infty A_n\cos n\theta .
$$
This is a Fourier cosine series for the camber-line slope on $0 \le \theta \le \pi$; the standard coefficient formulas give $\alpha - A_0 = \tfrac1\pi\int_0^\pi(dz/dx)\,d\theta_0$ and $A_n = \tfrac2\pi\int_0^\pi(dz/dx)\cos n\theta_0\,d\theta_0$, which is [[#eq-An]]. Every term of [[#eq-gamma-camber]] vanishes at $\theta = \pi$, so the Kutta condition holds.

The circulation is $\Gamma = \tfrac{c}{2}\int_0^\pi\gamma\sin\theta\,d\theta = cV_\infty\left(\pi A_0 + \tfrac{\pi}{2}A_1\right)$, because $\int_0^\pi\sin n\theta\sin\theta\,d\theta = \tfrac\pi2\delta_{n1}$. Then $c_l = 2\Gamma/(V_\infty c) = 2\pi(A_0 + A_1/2)$. Inserting [[#eq-An]], $c_l = 2\pi\left[\alpha + \tfrac1\pi\int_0^\pi\tfrac{dz}{dx}(\cos\theta_0 - 1)\,d\theta_0\right]$, which vanishes at the $\alpha_{L=0}$ stated.

For the moment, $M'_{LE} = -\rho_\infty V_\infty\int_0^c\xi\gamma\,d\xi$ with $\xi = \tfrac{c}{2}(1 - \cos\theta)$. The $A_0$ term contributes as in [[#thm-symmetric]], $-\tfrac{\pi}{2}A_0$ to $c_{m,LE}$; the $A_n$ terms involve $\int_0^\pi(1 - \cos\theta)\sin n\theta\sin\theta\,d\theta$, which is $\tfrac\pi2$ for $n = 1$, $-\tfrac\pi4$ for $n = 2$ (from $-\int\cos\theta\sin2\theta\sin\theta\,d\theta$) and $0$ for $n \ge 3$. Collecting, $c_{m,LE} = -\tfrac\pi2\left(A_0 + A_1 - \tfrac12A_2\right) = -\left[\tfrac{c_l}{4} + \tfrac\pi4(A_1 - A_2)\right]$. Transferring to the quarter-chord, $c_{m,c/4} = c_{m,LE} + c_l/4 = \tfrac\pi4(A_2 - A_1)$, which contains no $\alpha$: the quarter-chord is the aerodynamic centre. Assumptions: those of [[#prop-fundamental]], and a camber-line slope with a convergent Fourier series.
:::

Physically, camber is a rigid shift of the lift curve to the left: a positively cambered section ($A_1 > 0$) has a negative zero-lift angle, lifts at zero incidence, and carries a nose-down $c_{m,ac}$. The **ideal angle of attack**, at which $A_0 = 0$, is the incidence at which the leading-edge singularity vanishes and the flow meets the nose smoothly; at that angle the section has its lowest suction peak and, in practice, often its lowest drag.

::: widget plot
f: 4*(a*pi/180)*sqrt((1 - x)/x) + 32*h*sqrt(x*(1 - x)); 4*(a*pi/180)*sqrt((1 - x)/x); 32*h*sqrt(x*(1 - x))
x: 0.005, 1
y: 0, 2.5
sliders: a=3:-4:10:0.5, h=0.04:0:0.08:0.005
labels: \Delta C_p\ \text{total}; \text{angle-of-attack part}; \text{camber part}
caption: Chordwise loading $\Delta C_p = C_{p,l} - C_{p,u} = 2\gamma/V_\infty$ on a thin airfoil with a parabolic camber line $z = 4h\,x(1 - x)$ (chord $1$), from [[#eq-gamma-camber]] with $A_0 = \alpha$, $A_1 = 4h$: the sum of the flat-plate loading $4\alpha\sqrt{(1-x)/x}$ at $\alpha = a$ degrees and the elliptic camber loading $32h\sqrt{x(1-x)}$. Set $a = 0$, the ideal angle for this symmetric camber line: the leading-edge peak disappears and the load is carried smoothly over the chord with $c_l = 4\pi h$. Increase $a$ and the singular nose loading takes over; make $a$ negative and the loading near the nose becomes negative — a suction peak on the *lower* surface.
:::

::: example The NACA 2412 by thin-airfoil theory {#ex-naca2412}
Find $\alpha_{L=0}$, $c_{m,c/4}$, the ideal angle of attack and the lift coefficient at $\alpha = 4^\circ$ for the NACA 2412, and compare with the measured values $\alpha_{L=0} \approx -2.1^\circ$ and $c_{m,c/4} \approx -0.05$ given by Abbott and von Doenhoff.
::: solution
Differentiating [[#eq-naca-camber]] with $m = 0.02$, $p = 0.4$ gives $dz/dx = \tfrac{2m}{p^2}(p - \xi) = 0.25(0.4 - \xi)$ for $\xi < 0.4$ and $\tfrac{2m}{(1-p)^2}(p - \xi) = 0.1111(0.4 - \xi)$ for $\xi > 0.4$. With $\xi = \tfrac12(1 - \cos\theta_0)$ the break at $\xi = 0.4$ is at $\theta_0 = \arccos 0.2 = 78.46^\circ = 1.3694\,\mathrm{rad}$. The integrals in [[#eq-An]] and [[#eq-cl-camber]] can be done in closed form piece by piece, or numerically; either way
$$
\alpha_{L=0} = -0.03625\,\mathrm{rad} = -2.08^\circ, \qquad A_1 = 0.08150, \quad A_2 = 0.01386,
$$
so $c_{m,c/4} = \tfrac\pi4(0.01386 - 0.08150) = -0.0531$. The ideal angle of attack, where $A_0 = 0$, is $\alpha_i = \tfrac1\pi\int_0^\pi\tfrac{dz}{dx}\,d\theta_0 = 0.00449\,\mathrm{rad} = 0.26^\circ$, where $c_l = \pi A_1 = 0.256$. At $\alpha = 4^\circ$,
$$
c_l = 2\pi\left(0.06981 + 0.03625\right) = 0.666 .
$$
*Sanity check:* the theory agrees with the measured zero-lift angle and moment to within a few hundredths of a degree and about $0.003$ in $c_m$ — remarkably good for a 12 per cent thick section. Its lift-curve slope of $0.110$ per degree is 4–5 per cent above the measured value, because the boundary layer thickens towards the trailing edge, effectively reducing the camber there; that small viscous correction is why real lift curves have slopes of about $0.105$ per degree.
:::
:::

::: example A circular-arc (parabolic) camber line {#ex-parabolic}
A thin section has camber line $z = 4h\,x(c - x)/c^2$ with $h/c = 0.04$. Find $\alpha_{L=0}$, $c_{m,c/4}$ and the ideal lift coefficient.
::: solution
$dz/dx = 4(h/c)(1 - 2\xi) = 4(h/c)\cos\theta_0$, since $1 - 2\xi = \cos\theta_0$. The cosine series has only one term: $A_1 = 4h/c$, all other $A_n = 0$, and $\int_0^\pi(dz/dx)\,d\theta_0 = 0$, so $A_0 = \alpha$ and the ideal angle is zero. Then
$$
\alpha_{L=0} = -\frac{1}{\pi}\int_0^\pi\frac{4h}{c}\cos\theta_0(\cos\theta_0 - 1)\,d\theta_0 = -\frac{4h}{\pi c}\cdot\frac{\pi}{2} = -\frac{2h}{c} = -0.08\,\mathrm{rad} = -4.58^\circ,
$$
$c_{m,c/4} = \tfrac\pi4(0 - 4h/c) = -\pi h/c = -0.126$, and at the ideal angle $c_l = 2\pi(0 + 2h/c) = 4\pi h/c = 0.503$. *Sanity check:* the camber-only loading in the figure above is elliptic in $x$ and symmetric about mid-chord, so its centre of pressure is at mid-chord: $x_{cp}/c = \tfrac14 - c_{m,c/4}/c_l = 0.25 + 0.126/0.503 = 0.50$. Correct.
:::
:::

::: quiz
According to thin-airfoil theory, doubling the camber of a section (keeping its shape) does what to the lift-curve slope and to $c_{m,ac}$?
- [ ] Doubles both
- [x] Leaves the slope at $2\pi$ per radian and doubles $c_{m,ac}$
- [ ] Doubles the slope and leaves $c_{m,ac}$ unchanged
- [ ] Leaves both unchanged and doubles $\alpha_{L=0}$ only
::: solution
The slope is $2\pi$ for any camber; camber only shifts the lift curve, through $\alpha_{L=0}$, and sets $c_{m,ac} = \tfrac\pi4(A_2 - A_1)$. Both $\alpha_{L=0}$ and the $A_n$ are linear in $dz/dx$, so doubling the camber doubles $\alpha_{L=0}$ and $c_{m,ac}$.
:::
:::

## Flaps: changing the camber in flight

A plain trailing-edge flap hinged at $x_h$ and deflected down by $\delta$ changes the camber line: for small $\delta$ the slope becomes $dz/dx - \delta$ aft of the hinge. Thin-airfoil theory therefore gives the flap's effect directly. Let $\theta_h$ be the Glauert angle of the hinge, $\cos\theta_h = 1 - 2x_h/c$.

::: proposition Thin-airfoil theory of a plain flap {#prop-flap}
A plain flap of chord $c_f = c - x_h$ deflected by $\delta$ (positive down, radians) changes the section coefficients by
$$
\Delta c_l = 2\left(\pi - \theta_h + \sin\theta_h\right)\delta, \qquad
\Delta c_{m,c/4} = -\tfrac12\sin\theta_h\left(1 - \cos\theta_h\right)\delta .
$$
The **flap effectiveness** $\tau = -\dfrac{d\alpha_{L=0}}{d\delta} = \dfrac{\pi - \theta_h + \sin\theta_h}{\pi}$ is the fraction of a degree of incidence that each degree of flap is worth.
:::

::: proof
The added slope is $0$ for $\theta_0 < \theta_h$ and $-\delta$ for $\theta_0 > \theta_h$. By [[#eq-An]], $\Delta A_0 = -\tfrac1\pi\int_{\theta_h}^\pi(-\delta)\,d\theta_0 = \tfrac{\delta}{\pi}(\pi - \theta_h)$, $\Delta A_1 = \tfrac2\pi(-\delta)\int_{\theta_h}^\pi\cos\theta_0\,d\theta_0 = \tfrac{2\delta}{\pi}\sin\theta_h$ and $\Delta A_2 = \tfrac2\pi(-\delta)\int_{\theta_h}^\pi\cos2\theta_0\,d\theta_0 = \tfrac{\delta}{\pi}\sin2\theta_h$. Then $\Delta c_l = 2\pi(\Delta A_0 + \tfrac12\Delta A_1) = 2\delta(\pi - \theta_h + \sin\theta_h)$ and $\Delta c_{m,c/4} = \tfrac\pi4(\Delta A_2 - \Delta A_1) = \tfrac\delta4(2\sin\theta_h\cos\theta_h - 2\sin\theta_h) = -\tfrac\delta2\sin\theta_h(1 - \cos\theta_h)$. Dividing $\Delta c_l$ by $2\pi$ gives the equivalent change of incidence, $-\Delta\alpha_{L=0} = \tau\delta$. Assumptions: those of thin-airfoil theory, with the flap deflection small; there is no gap at the hinge and no separation.
:::

::: example A 25 per cent chord flap {#ex-flap}
A section has a plain flap of 25 per cent chord. Find $d c_l/d\delta$, the effectiveness $\tau$, and the changes in $c_l$ and $c_{m,c/4}$ for $\delta = 10^\circ$.
::: solution
$x_h/c = 0.75$, so $\cos\theta_h = 1 - 1.5 = -0.5$ and $\theta_h = 120^\circ = 2.094\,\mathrm{rad}$, $\sin\theta_h = 0.866$. Then $dc_l/d\delta = 2(3.1416 - 2.0944 + 0.8660) = 3.83$ per radian and $\tau = 1.913/\pi = 0.609$. For $\delta = 10^\circ = 0.1745\,\mathrm{rad}$: $\Delta c_l = 3.83 \times 0.1745 = 0.668$, and $\Delta c_{m,c/4} = -\tfrac12(0.866)(1.5)(0.1745) = -0.113$. *Sanity check:* a flap of a quarter of the chord is worth about $0.6$ of the same angle of whole-wing incidence — more than its chord fraction, because deflecting the rear of the camber line changes the circulation of the whole section. Measured effectiveness of plain flaps falls below the thin-airfoil value beyond about $10$–$15^\circ$ of deflection as the flow separates over the flap, which is why slotted flaps are used for large deflections (see [[aerodynamics/viscous-aerodynamics]]).
:::
:::

::: warning Degrees, radians and the size of the angles
Every formula in this chapter uses angles in **radians**: $c_l = 2\pi\alpha$ with $\alpha = 5$ gives the nonsense $c_l = 31$. Convert first ($5^\circ = 0.0873\,\mathrm{rad}$) or use the per-degree slope $2\pi/57.3 = 0.110$. A second trap is the range of validity: the theory is linear and inviscid, so it knows nothing of stall. It predicts $c_l = 2.2$ at $20^\circ$ for any section, whereas real sections stall at $c_{l,\max} \approx 1.2$–$1.8$ without high-lift devices. Use it for zero-lift angle, slope, moment and flap effectiveness in the attached-flow range, and take maximum lift from test data.
:::

::: application Using thin-airfoil results in design
The two camber integrals are what a designer actually uses. For a target cruise $c_l$, one chooses a camber line whose ideal lift coefficient $c_{l,i} = 2\pi\cdot\tfrac12A_1$ (at $A_0 = 0$) is near the cruise value, so that the nose meets the flow smoothly and the suction peak is low; then the zero-lift angle sets the wing's rigging incidence, and $c_{m,ac}$ sets the trim load the tailplane must carry (a nose-down $c_{m,ac}$ needs a download on a conventional tail, which costs lift and therefore induced drag). Reflexed camber lines (with $A_2 > A_1$ in effect, an upturned trailing edge) give $c_{m,ac} \approx 0$ for tailless aircraft at the price of less lift. Thickness is then chosen for structure and for maximum lift, and the pressure distribution is refined with a panel method ([[aerodynamics/panel-methods]]).
:::

::: history
Kutta's 1902 calculation of the lift of circular-arc surfaces imposed what is now called the Kutta condition, and Joukowski's conformal-mapping airfoils of 1910 gave exact potential-flow solutions for a family of cambered, thick sections. The general **thin-airfoil theory** for arbitrary camber lines was given by Max **Munk**, a student of Prandtl who had joined the NACA, in *General Theory of Thin Wing Sections* (NACA Report 142, 1922), in the form of two integrals over the section coordinates giving the zero-lift angle and the moment. Hermann **Glauert** recast it with the trigonometric substitution and Fourier series used here in *The Elements of Aerofoil and Airscrew Theory* (1926), and the same substitution later solved Prandtl's lifting-line equation. The NACA four-digit sections of [[#eq-naca-camber]] and [[#eq-naca-thickness]] were defined and tested in the Variable Density Tunnel by Eastman Jacobs, Kenneth Ward and Robert Pinkerton (NACA Report 460, 1933).
:::

## Summary

::: summary
- A sharp trailing edge fixes the circulation through the **Kutta condition**: the flow leaves the trailing edge smoothly, $\gamma(\text{TE}) = 0$. Physically, a starting vortex is shed until the condition holds.
- Thin-airfoil theory models the section as a vortex sheet on the chord and requires the camber line to be a streamline: $\frac{1}{2\pi}\int\gamma\,d\xi/(x - \xi) = V_\infty(\alpha - dz/dx)$.
- Symmetric sections: $c_l = 2\pi\alpha$, $c_{m,c/4} = 0$, centre of pressure and aerodynamic centre at the quarter-chord; $\Delta C_p = 4\alpha\sqrt{(c - x)/x}$.
- Cambered sections: $c_l = 2\pi(\alpha - \alpha_{L=0})$ with $\alpha_{L=0} = -\frac1\pi\int_0^\pi\frac{dz}{dx}(\cos\theta_0 - 1)\,d\theta_0$, and $c_{m,c/4} = \frac\pi4(A_2 - A_1)$ independent of $\alpha$. For the NACA 2412: $-2.08^\circ$ and $-0.053$.
- A plain flap is a change of camber: $dc_l/d\delta = 2(\pi - \theta_h + \sin\theta_h)$, about $3.8$ per radian for a 25 per cent flap.
- Angles in radians; no stall, no drag, no thickness effects at this order.
:::

## Exercises

::: exercise Flat-plate lift {level=1 check="0.768"}
A thin symmetric airfoil is at $7^\circ$ angle of attack. According to thin-airfoil theory, what is its lift coefficient? (Enter $c_l$.)
::: solution
$c_l = 2\pi\alpha = 2\pi(7\pi/180) = 2\pi(0.12217) = 0.768$.
:::
:::

::: exercise Incidence for a given lift {level=1 check="2.48"}
At what angle of attack does a NACA 2412 section give $c_l = 0.5$, according to thin-airfoil theory ($\alpha_{L=0} = -2.08^\circ$)? (Enter $\alpha$ in degrees.)
::: solution
$\alpha - \alpha_{L=0} = c_l/2\pi = 0.0796\,\mathrm{rad} = 4.56^\circ$, so $\alpha = 4.56 - 2.08 = 2.48^\circ$.
:::
:::

::: exercise Loading on a flat plate {level=1 check="0.279"}
A thin flat plate is at $4^\circ$. What is the pressure-coefficient difference between the lower and upper surfaces at mid-chord? (Enter $\Delta C_p$.)
::: solution
By [[#eq-dcp-flat]], $\Delta C_p = 4\alpha\sqrt{(c - x)/x} = 4(0.06981)(1) = 0.279$.
:::
:::

::: exercise The NACA 4412 {level=2 check="-4.15"}
Repeat the zero-lift-angle calculation of example [[#ex-naca2412]] for the NACA 4412 (4 per cent camber at 40 per cent chord). (Enter $\alpha_{L=0}$ in degrees.)
::: solution
The camber line [[#eq-naca-camber]] is proportional to $m$ for fixed $p$, and $\alpha_{L=0}$ and all $A_n$ are linear in it, so the results simply double: $\alpha_{L=0} = 2 \times (-2.08^\circ) = -4.15^\circ$ and $c_{m,c/4} = 2 \times (-0.0531) = -0.106$. (Measured: about $-4^\circ$ and $-0.09$ to $-0.10$.)
:::
:::

::: exercise Flap effectiveness of a 20 per cent flap {level=2 check="0.550"}
Find the thin-airfoil flap effectiveness $\tau$ of a plain flap of 20 per cent chord. (Enter $\tau$.)
::: solution
$\cos\theta_h = 1 - 2(0.8) = -0.6$, $\theta_h = 2.2143\,\mathrm{rad}$, $\sin\theta_h = 0.8$. $\tau = (\pi - 2.2143 + 0.8)/\pi = 1.7273/\pi = 0.550$, and $dc_l/d\delta = 2\pi\tau = 3.45$ per radian.
:::
:::

::: exercise Moment from a flap {level=2 check="-0.113"}
For the 25 per cent flap of example [[#ex-flap]] deflected $10^\circ$ down on a symmetric section at $\alpha = 2^\circ$, find $c_l$ and $c_{m,c/4}$. (Enter $c_{m,c/4}$.)
::: solution
The symmetric section contributes $c_l = 2\pi(0.03491) = 0.219$ and no quarter-chord moment; the flap adds $0.668$ and $-0.113$. Total $c_l = 0.887$ and $c_{m,c/4} = -0.113$. The nose-down pitching moment of a deflected flap is the reason the tailplane load changes when flaps are lowered.
:::
:::

::: exercise Centre of pressure of a cambered section {level=2 check="0.40"}
For the parabolic camber line of example [[#ex-parabolic]] ($h/c = 0.04$) at $\alpha = 3^\circ$, find $c_l$ and the centre of pressure. (Enter $x_{cp}/c$, to two decimal places.)
::: solution
$c_l = 2\pi(\alpha + 2h/c) = 2\pi(0.05236 + 0.08) = 0.832$. With $c_{m,ac} = -0.126$ at the quarter-chord, $x_{cp}/c = 0.25 + 0.1257/0.832 = 0.25 + 0.151 = 0.40$. The centre of pressure lies between the quarter-chord (where the angle-of-attack loading acts) and mid-chord (where the camber loading acts), weighted by their shares of the lift.
:::
:::

::: exercise Deriving the moment coefficient {level=3}
Starting from $M'_{LE} = -\rho_\infty V_\infty\int_0^c\xi\gamma(\xi)\,d\xi$ and [[#eq-gamma-camber]], show that
$$
c_{m,LE} = -\frac{\pi}{2}\left(A_0 + A_1 - \frac{A_2}{2}\right)
$$
by evaluating the three integrals $\int_0^\pi(1 - \cos\theta)\sin n\theta\sin\theta\,d\theta$ for $n = 1, 2, \geq 3$. Then show that the aerodynamic centre is at the quarter-chord.
::: solution
With $\xi = \tfrac c2(1 - \cos\theta)$, $d\xi = \tfrac c2\sin\theta\,d\theta$, $c_{m,LE} = M'_{LE}/(q_\infty c^2) = -\tfrac{2}{V_\infty c^2}\int_0^c\xi\gamma\,d\xi = -\tfrac{1}{2V_\infty}\int_0^\pi(1 - \cos\theta)\gamma\sin\theta\,d\theta$. The $A_0$ term: $2V_\infty A_0\int_0^\pi(1 - \cos\theta)(1 + \cos\theta)\,d\theta = 2V_\infty A_0\cdot\tfrac\pi2$. The $A_n$ terms need $J_n = \int_0^\pi(1 - \cos\theta)\sin n\theta\sin\theta\,d\theta = \tfrac\pi2\delta_{n1} - \int_0^\pi\cos\theta\sin\theta\sin n\theta\,d\theta$. Since $\cos\theta\sin\theta = \tfrac12\sin2\theta$, the last integral is $\tfrac\pi4\delta_{n2}$. So $J_1 = \tfrac\pi2$, $J_2 = -\tfrac\pi4$, $J_n = 0$ for $n \ge 3$. Collecting, $c_{m,LE} = -\tfrac{1}{2V_\infty}\cdot2V_\infty\left(\tfrac\pi2A_0 + \tfrac\pi2A_1 - \tfrac\pi4A_2\right)$, as stated. With $c_l = \pi(2A_0 + A_1)$, $c_{m,LE} = -\tfrac{c_l}{4} - \tfrac\pi4(A_1 - A_2)$, and $c_{m,x} = c_{m,LE} + (x/c)c_l$ is independent of $\alpha$ (which enters only through $A_0$, i.e. through $c_l$) exactly when $x/c = \tfrac14$.
:::
:::

::: exercise Design a camber line for a tailless glider {level=3}
A tailless (flying-wing) glider needs a section with $c_{m,ac} = 0$ (or slightly positive) so that it can trim without a tail, while giving $c_l \approx 0.6$ in cruise at a modest incidence. Using a camber line of the form $z/c = k\left(\xi - a\xi^2 + b\xi^3\right)$ (with $z = 0$ at both ends), or any other family you prefer, explain how you would choose its shape with thin-airfoil theory, what $A_1$ and $A_2$ must satisfy, and what the cost is. Compute $c_{m,c/4}$ for the simple cubic camber line $z/c = 0.05\left(\xi - 3\xi^2 + 2\xi^3\right)$, which is positive near the nose and negative near the tail.
::: solution
Zero moment requires $A_2 = A_1$ by [[#eq-cm-camber]]. Since $A_1$ is the main contributor to lift at the ideal angle, the camber line must have a large $\cos2\theta_0$ component in its slope: positive camber forward and an upturned ("reflexed") rear. For the cubic, $dz/dx = 0.05(1 - 6\xi + 6\xi^2)$. With $\xi = \tfrac12(1 - \cos\theta_0)$, $6\xi^2 - 6\xi = \tfrac32(\cos^2\theta_0 - 1) = \tfrac34\cos2\theta_0 - \tfrac34$, so $dz/dx = 0.05\left(\tfrac14 + \tfrac34\cos2\theta_0\right)$. Hence $A_1 = 0$, $A_2 = 0.0375$, and $c_{m,c/4} = \tfrac\pi4(0.0375 - 0) = +0.029$ — a slightly nose-up moment, as wanted. The price is lift. With $A_1 = 0$, $c_l = 2\pi A_0 = 2\pi(\alpha - \alpha_i)$, where the ideal angle $\alpha_i = \tfrac1\pi\int_0^\pi(dz/dx)\,d\theta_0 = 0.05/4 = 0.0125\,\mathrm{rad} = 0.72^\circ$; [[#eq-cl-camber]] gives the same value, $\alpha_{L=0} = -\tfrac1\pi\int_0^\pi 0.05\left(\tfrac14 + \tfrac34\cos2\theta_0\right)(\cos\theta_0 - 1)\,d\theta_0 = +0.0125\,\mathrm{rad}$. So this reflexed line has a *positive* zero-lift angle, needs $c_l/2\pi + 0.0125 = 0.108\,\mathrm{rad} = 6.2^\circ$ for $c_l = 0.6$, and cruises well away from its ideal angle (with a leading-edge suction peak). The design is a trade: blend in ordinary camber (positive $A_1$) while reflexing the rear enough to keep $A_2 \ge A_1$; choose the blend so that the ideal lift coefficient is near the cruise value; and accept a lower $c_{l,\max}$ than a conventionally cambered section. In practice one also uses sweep and washout to trim a flying wing, and refines the section with a panel or viscous code.
:::
:::
