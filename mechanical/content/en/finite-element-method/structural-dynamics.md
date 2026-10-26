A static analysis assumes that loads are applied so slowly that inertia plays no part. Machines, vehicles and structures are seldom so considerate: engines and rotors excite vibration, roads and earthquakes shake foundations, impacts and drops load a part in milliseconds. In [[vibrations/modal-analysis]] and [[vibrations/continuous-systems]] you analysed systems whose masses and stiffnesses were given or whose geometry was simple enough for an exact solution. This chapter shows how a finite element model supplies the mass and stiffness matrices of an arbitrary structure, so that the whole machinery of vibration theory — natural frequencies, mode shapes, modal superposition, damping — applies to it, and how the equations of motion are integrated directly in time when modal methods are inappropriate. The new element ingredient is the **mass matrix**; the new numerical ingredient is **time integration**, with the same questions of stability and accuracy as in [[finite-element-method/field-problems]], now for a second-order system that oscillates instead of decaying.

## Equations of motion from virtual work

D'Alembert's principle treats the inertia force $-\rho\ddot{\mathbf{u}}$ per unit volume as one more body force. Adding its virtual work to the static principle of [[finite-element-method/plane-elements]], with a viscous damping force $-c\dot{\mathbf{u}}$ for good measure, gives
$$
\int_V\delta\boldsymbol{\varepsilon}^{\mathsf T}\boldsymbol{\sigma}\,dV + \int_V\delta\mathbf{u}^{\mathsf T}\rho\,\ddot{\mathbf{u}}\,dV + \int_V\delta\mathbf{u}^{\mathsf T}c\,\dot{\mathbf{u}}\,dV = \int_V\delta\mathbf{u}^{\mathsf T}\mathbf{b}\,dV + \int_S\delta\mathbf{u}^{\mathsf T}\mathbf{q}\,dS.
$$
Interpolating in space only, $\mathbf{u}(\mathbf{x}, t) = \mathbf{N}(\mathbf{x})\,\mathbf{d}(t)$, so that $\ddot{\mathbf{u}} = \mathbf{N}\ddot{\mathbf{d}}$, and requiring the equation for all virtual nodal displacements yields the **semi-discrete equations of motion**.

::: proposition Finite element equations of motion {#prop-eom}
$$
\mathbf{M}\ddot{\mathbf{d}} + \mathbf{C}\dot{\mathbf{d}} + \mathbf{K}\mathbf{d} = \mathbf{F}(t), \qquad \mathbf{m}^{(e)} = \int_{V_e}\rho\,\mathbf{N}^{\mathsf T}\mathbf{N}\,dV,
$$ {#eq-eom}
where $\mathbf{K}$ and $\mathbf{F}$ are the static stiffness matrix and load vector, $\mathbf{M}$ is the assembled **consistent mass matrix**, and $\mathbf{C}$ is a damping matrix (in practice rarely derived from $\int c\mathbf{N}^{\mathsf T}\mathbf{N}$; see below).
:::

::: proof
Substituting $\delta\mathbf{u} = \mathbf{N}\delta\mathbf{d}$ and $\ddot{\mathbf{u}} = \mathbf{N}\ddot{\mathbf{d}}$, the inertia term becomes $\delta\mathbf{d}^{\mathsf T}\left(\int\rho\mathbf{N}^{\mathsf T}\mathbf{N}\,dV\right)\ddot{\mathbf{d}}$, and the other terms become those of the static analysis. Since $\delta\mathbf{d}$ is arbitrary (apart from supports), the coefficient vector must vanish. Assembly proceeds element by element exactly as for $\mathbf{K}$, because each integral is a sum over elements. Assumptions: small displacements, linear elastic material, mass density independent of time, and the same shape functions for displacement and acceleration — the meaning of "consistent".
:::

## Mass matrices

### The bar element

With $N_1 = 1 - x/L$, $N_2 = x/L$, the integrals $\int_0^LN_1^2\,dx = L/3$ and $\int_0^LN_1N_2\,dx = L/6$ give the **consistent** mass matrix of a uniform bar of density $\rho$ and area $A$,
$$
\mathbf{m}^{(e)}_\text{consistent} = \frac{\rho AL}{6}\begin{bmatrix} 2 & 1 \\ 1 & 2 \end{bmatrix}, \qquad \mathbf{m}^{(e)}_\text{lumped} = \frac{\rho AL}{2}\begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix}.
$$ {#eq-bar-mass}
The **lumped** (diagonal) mass matrix places half the element's mass at each node, as an engineer would by intuition. Both have the correct total mass: the sum of all entries is $\rho AL$, which is the kinetic-energy requirement that a rigid translation $\dot u_1 = \dot u_2 = v$ has energy $\tfrac12\rho ALv^2$.

### The beam element

With the Hermite cubics of [[finite-element-method/trusses-frames]] and DOFs $[v_1, \theta_1, v_2, \theta_2]$, the consistent mass matrix of a uniform Euler–Bernoulli beam is
$$
\mathbf{m}^{(e)} = \frac{\rho AL}{420}\begin{bmatrix} 156 & 22L & 54 & -13L \\ 22L & 4L^2 & 13L & -3L^2 \\ 54 & 13L & 156 & -22L \\ -13L & -3L^2 & -22L & 4L^2 \end{bmatrix}.
$$ {#eq-beam-mass}
(Entry $m_{11} = \rho AL\int_0^1(1 - 3\xi^2 + 2\xi^3)^2d\xi = \tfrac{156}{420}\rho AL$, and so on.) A lumped beam mass matrix puts $\rho AL/2$ on each translation and zero (or a small value) on the rotations; it is much cruder for beams than for bars.

Consistent mass matrices are not diagonal, so they couple the nodal accelerations, cost more to store and to solve with, and make explicit time integration expensive. Lumped matrices are diagonal and trivially inverted. Which is more accurate depends on the element and on the mode, as the examples show.

::: example Natural frequency of a bar {#ex-bar}
A steel bar ($E = 200\,\mathrm{GPa}$, $\rho = 7850\,\mathrm{kg/m^3}$) of length $L = 1\,\mathrm{m}$ is fixed at one end and free at the other. Find its fundamental frequency with one element (consistent and lumped mass), and compare more elements with the exact $\omega_1 = \frac{\pi}{2}\frac{c}{L}$, where $c = \sqrt{E/\rho}$.
::: solution
$c = \sqrt{200\times10^9/7850} = 5048\,\mathrm{m/s}$; exact $\omega_1 = (\pi/2)(5048/1) = 7929\,\mathrm{rad/s}$, $f_1 = 1262\,\mathrm{Hz}$.

*One element.* With node 1 fixed only $u_2$ remains: $k = EA/L$, and the mass is $\rho AL/3$ (consistent, entry $m_{22}$) or $\rho AL/2$ (lumped). Then
$$
\omega_\text{cons} = \sqrt{\frac{EA/L}{\rho AL/3}} = \sqrt3\,\frac{c}{L} = 8743\,\mathrm{rad/s}\ (+10.3\,\%), \qquad \omega_\text{lump} = \sqrt2\,\frac{c}{L} = 7138\,\mathrm{rad/s}\ (-10.0\,\%).
$$
*More elements* (solving $\mathbf{K}\boldsymbol\phi = \omega^2\mathbf{M}\boldsymbol\phi$ numerically):

| elements | $\omega_1$ consistent | error | $\omega_1$ lumped | error | $\omega_2$ error (cons. / lumped) |
|---|---|---|---|---|---|
| 1 | 8743 | $+10.3\,\%$ | 7138 | $-10.0\,\%$ | — |
| 2 | 8134 | $+2.59\,\%$ | 7726 | $-2.55\,\%$ | $+19.5\,\%$ / $-21.6\,\%$ |
| 4 | 7980 | $+0.64\,\%$ | 7878 | $-0.64\,\%$ | $+5.8\,\%$ / $-5.7\,\%$ |
| 8 | 7941 | $+0.16\,\%$ | 7916 | $-0.16\,\%$ | $+1.45\,\%$ / $-1.44\,\%$ |

*Check.* Errors fall by 4 per halving of the element size — frequency errors converge like $h^2$, twice the rate of stress — and consistent and lumped results bracket the exact value almost symmetrically, so their average is far better than either. Higher modes are much less accurate on the same mesh: a mode needs several elements per half-wavelength.
:::
:::

::: example A cantilever beam with one element {#ex-beam}
A steel flat bar ($E = 200\,\mathrm{GPa}$, $\rho = 7850\,\mathrm{kg/m^3}$), $50\,\mathrm{mm}$ wide and $10\,\mathrm{mm}$ thick, is clamped as a cantilever of length $0.5\,\mathrm{m}$ and vibrates in its flexible direction. Estimate its first natural frequency with one beam element using the consistent mass, and compare with the exact $\omega_1 = 1.8751^2\sqrt{EI/(\rho AL^4)}$.
::: solution
$I = 50 \times 10^3/12 = 4167\,\mathrm{mm^4} = 4.167\times10^{-9}\,\mathrm{m^4}$, $A = 5\times10^{-4}\,\mathrm{m^2}$, so $\sqrt{EI/(\rho AL^4)} = \sqrt{833.3/(3.925 \times 0.0625)} = 58.28\,\mathrm{rad/s}$.

With $v_1 = \theta_1 = 0$, the free DOFs $v_2, \theta_2$ have
$$
\mathbf{K} = \frac{EI}{L^3}\begin{bmatrix} 12 & -6L \\ -6L & 4L^2 \end{bmatrix}, \qquad \mathbf{M} = \frac{\rho AL}{420}\begin{bmatrix} 156 & -22L \\ -22L & 4L^2 \end{bmatrix}.
$$
Writing $\omega^2 = \lambda\,EI/(\rho AL^4)$ and setting $\det(\mathbf{K} - \omega^2\mathbf{M}) = 0$ gives, after dividing out the scale factors, $\det\begin{bmatrix} 12 - 156\mu & -6 + 22\mu \\ -6 + 22\mu & 4 - 4\mu \end{bmatrix} = 0$ with $\mu = \lambda/420$, i.e. $140\mu^2 - 408\mu + 12 = 0$ after expansion ($12 \cdot 4 - 36 = 12$; $-48\mu - 624\mu + 264\mu = -408\mu$; $624\mu^2 - 484\mu^2 = 140\mu^2$). The smaller root is $\mu = 0.029716$, so $\lambda_1 = 12.48$ and $\omega_1 = \sqrt{12.48} \times 58.28 = 3.533 \times 58.28 = 205.9\,\mathrm{rad/s}$, $f_1 = 32.77\,\mathrm{Hz}$.

Exact: $1.8751^2 = 3.516$, $\omega_1 = 204.9\,\mathrm{rad/s}$, $f_1 = 32.62\,\mathrm{Hz}$. One consistent element is $0.48\,\%$ high; two elements give $3.5177$ ($0.05\,\%$). Lumping half the beam's mass at the tip and ignoring rotary inertia gives $\omega = \sqrt{3EI/L^3}/\sqrt{\rho AL/2} = 2.449\sqrt{EI/\rho AL^4}$, $30\,\%$ low.

*Check.* The second root, $\lambda_2^{1/2} = 34.8$, approximates the exact $22.03$ very poorly: one element cannot represent a mode with a node in the span.
:::
:::

## Natural frequencies and modes

With no damping and no load, try $\mathbf{d} = \boldsymbol\phi\sin\omega t$ in [[#eq-eom]]: the result is the **generalised eigenvalue problem**
$$
\mathbf{K}\boldsymbol\phi = \omega^2\mathbf{M}\boldsymbol\phi,
$$ {#eq-eig}
whose $n$ solutions (for $n$ free DOFs) are the natural frequencies $\omega_1 \le \omega_2 \le \dots \le \omega_n$ and mode shapes $\boldsymbol\phi_i$ of the discretised structure. Large models are solved with subspace iteration or Lanczos methods that extract only the lowest few dozen modes ([eigenvalues](/learn/maths/lesson.php?c=linear-algebra&l=eigenvalues)); the highest modes of a mesh have no physical meaning and are never computed.

::: theorem Orthogonality of modes {#thm-orth}
If $\mathbf{K}$ and $\mathbf{M}$ are symmetric and $\mathbf{M}$ is positive definite, all eigenvalues $\omega_i^2$ of [[#eq-eig]] are real, and mode shapes belonging to different eigenvalues are orthogonal with respect to both matrices:
$$
\boldsymbol\phi_i^{\mathsf T}\mathbf{M}\boldsymbol\phi_j = 0, \qquad \boldsymbol\phi_i^{\mathsf T}\mathbf{K}\boldsymbol\phi_j = 0 \qquad (\omega_i \neq \omega_j).
$$
Normalised so that $\boldsymbol\phi_i^{\mathsf T}\mathbf{M}\boldsymbol\phi_i = 1$, they satisfy $\boldsymbol\Phi^{\mathsf T}\mathbf{M}\boldsymbol\Phi = \mathbf{I}$ and $\boldsymbol\Phi^{\mathsf T}\mathbf{K}\boldsymbol\Phi = \operatorname{diag}(\omega_i^2)$, where $\boldsymbol\Phi = [\boldsymbol\phi_1, \dots, \boldsymbol\phi_n]$.
:::

::: proof
Write the eigen-equations for modes $i$ and $j$, premultiply the first by $\boldsymbol\phi_j^{\mathsf T}$ and the second by $\boldsymbol\phi_i^{\mathsf T}$: $\boldsymbol\phi_j^{\mathsf T}\mathbf{K}\boldsymbol\phi_i = \omega_i^2\boldsymbol\phi_j^{\mathsf T}\mathbf{M}\boldsymbol\phi_i$ and $\boldsymbol\phi_i^{\mathsf T}\mathbf{K}\boldsymbol\phi_j = \omega_j^2\boldsymbol\phi_i^{\mathsf T}\mathbf{M}\boldsymbol\phi_j$. By symmetry the left sides are equal, and so are the two $\mathbf{M}$ products; subtracting, $(\omega_i^2 - \omega_j^2)\,\boldsymbol\phi_i^{\mathsf T}\mathbf{M}\boldsymbol\phi_j = 0$, so the $\mathbf{M}$ product vanishes when the frequencies differ, and then the $\mathbf{K}$ product does too. Reality: if $\boldsymbol\phi$ were complex with eigenvalue $\lambda$, premultiplying by the conjugate transpose gives $\bar{\boldsymbol\phi}^{\mathsf T}\mathbf{K}\boldsymbol\phi = \lambda\,\bar{\boldsymbol\phi}^{\mathsf T}\mathbf{M}\boldsymbol\phi$, where both quadratic forms are real for symmetric real matrices and the second is positive; hence $\lambda$ is real. (Repeated frequencies have modes that can be chosen orthogonal; see the [spectral theorem](/learn/maths/lesson.php?c=linear-algebra&l=spectral-theorem).)
:::

::: example A two-degree-of-freedom model {#ex-2dof}
A lumped model of a two-storey frame has floor masses $m_1 = 200\,\mathrm{kg}$ (lower) and $m_2 = 100\,\mathrm{kg}$ (upper) and storey stiffnesses $k_1 = 2\times10^5\,\mathrm{N/m}$ and $k_2 = 1\times10^5\,\mathrm{N/m}$. Find the natural frequencies, the mass-normalised modes, and verify orthogonality.
::: solution
$\mathbf{K} = \begin{bmatrix} 3\times10^5 & -1\times10^5 \\ -1\times10^5 & 1\times10^5 \end{bmatrix}$, $\mathbf{M} = \operatorname{diag}(200, 100)$. $\det(\mathbf{K} - \omega^2\mathbf{M}) = (3\times10^5 - 200\omega^2)(1\times10^5 - 100\omega^2) - 10^{10} = 0$. With $s = \omega^2$: $20\,000s^2 - 5\times10^7s + 2\times10^{10} = 0$, i.e. $s^2 - 2500s + 10^6 = 0$, so $s = 500$ or $2000$: $\omega_1 = 22.36\,\mathrm{rad/s}$ ($3.56\,\mathrm{Hz}$), $\omega_2 = 44.72\,\mathrm{rad/s}$ ($7.12\,\mathrm{Hz}$).

Mode shapes from the second row, $-10^5\phi_1 + (10^5 - 100s)\phi_2 = 0$: for $s = 500$, $\phi_2/\phi_1 = 2$ (both floors in phase, the top moving twice as far); for $s = 2000$, $\phi_2/\phi_1 = -1$ (floors in antiphase). Mass normalisation: $\boldsymbol\phi_1 = [1, 2]^{\mathsf T}/\sqrt{200 + 400} = [0.0408, 0.0816]^{\mathsf T}$, $\boldsymbol\phi_2 = [1, -1]^{\mathsf T}/\sqrt{300} = [0.0577, -0.0577]^{\mathsf T}\,\mathrm{kg^{-1/2}}$.

*Check.* $\boldsymbol\phi_1^{\mathsf T}\mathbf{M}\boldsymbol\phi_2 \propto 200(1)(1) + 100(2)(-1) = 0$; For the stiffness, $\mathbf{K}[1, 2]^{\mathsf T} = [3\times10^5 - 2\times10^5,\ -1\times10^5 + 2\times10^5]^{\mathsf T} = [1, 1]^{\mathsf T}\times10^5$, so $\boldsymbol\phi_1^{\mathsf T}\mathbf{K}\boldsymbol\phi_1 = [1, 2]\cdot[1, 1]\times10^5/600 = 500 = \omega_1^2$, as the theorem requires.
:::
:::

::: proposition Rayleigh quotient and bounds {#prop-rayleigh}
For any non-zero vector $\mathbf{x}$, the **Rayleigh quotient** $R(\mathbf{x}) = \mathbf{x}^{\mathsf T}\mathbf{K}\mathbf{x}/\mathbf{x}^{\mathsf T}\mathbf{M}\mathbf{x}$ satisfies $\omega_1^2 \le R(\mathbf{x}) \le \omega_n^2$, with equality at the corresponding modes. Consequently, a finite element model with consistent mass gives a fundamental frequency that is an **upper bound** on the exact fundamental frequency of the continuum model, and refining the mesh (nested meshes) can only lower it.
:::

::: proof
Expand $\mathbf{x} = \sum a_i\boldsymbol\phi_i$ in mass-normalised modes; by [[#thm-orth]], $R = \sum a_i^2\omega_i^2/\sum a_i^2$, a weighted average of the $\omega_i^2$, hence between the smallest and largest. For the continuum, $\omega_1^2$ is the minimum of the continuous Rayleigh quotient $\int(\text{strain energy density})/\int\tfrac12\rho\lvert\mathbf{u}\rvert^2$ over all admissible fields. A consistent-mass FE model evaluates exactly this quotient, but only over the finite element functions, a subset of the admissible fields; the minimum over a subset cannot be lower. A refined (nested) mesh contains the coarser space, so its minimum is no higher. A lumped mass matrix does not evaluate the true kinetic energy of the interpolated field, so the bound is lost — which is why lumped frequencies came out low in [[#ex-bar]].
:::

## Modal superposition and damping

Transforming to modal coordinates, $\mathbf{d} = \boldsymbol\Phi\mathbf{y}$, and premultiplying [[#eq-eom]] by $\boldsymbol\Phi^{\mathsf T}$ decouples the undamped equations:
$$
\ddot y_i + 2\zeta_i\omega_i\dot y_i + \omega_i^2y_i = \boldsymbol\phi_i^{\mathsf T}\mathbf{F}(t), \qquad i = 1, \dots, m,
$$
provided the damping is also diagonalised by the modes (**classical** or proportional damping). Each equation is a single-degree-of-freedom oscillator, solvable exactly or by the methods of [[vibrations/harmonic-excitation]], and only the $m \ll n$ modes whose frequencies lie in the range of the loading need be kept. A useful measure of whether enough modes are included is the **effective modal mass**: for base excitation in a direction $\mathbf{r}$ (unit rigid-body displacement vector), mode $i$ has participation factor $\Gamma_i = \boldsymbol\phi_i^{\mathsf T}\mathbf{M}\mathbf{r}$ and effective mass $\Gamma_i^2$; the effective masses sum to the total mass, and a common rule (in seismic codes, for example) is to keep modes until about 90 % of it is captured.

Damping in structures comes from friction in joints, material hysteresis and the surroundings; it is not known element by element. It is therefore specified as modal damping ratios $\zeta_i$ (typically 1–5 % for metal structures) or as **Rayleigh damping**:

::: proposition Rayleigh damping {#prop-rayleigh-damping}
With $\mathbf{C} = a_0\mathbf{M} + a_1\mathbf{K}$, the modes of [[#eq-eig]] diagonalise $\mathbf{C}$ and the damping ratio of a mode of frequency $\omega$ is
$$
\zeta(\omega) = \frac{a_0}{2\omega} + \frac{a_1\omega}{2}.
$$ {#eq-rayleigh}
Choosing $\zeta$ at two frequencies $\omega_a, \omega_b$ to be equal to $\zeta_0$ gives $a_0 = 2\zeta_0\dfrac{\omega_a\omega_b}{\omega_a + \omega_b}$ and $a_1 = \dfrac{2\zeta_0}{\omega_a + \omega_b}$.
:::

::: proof
$\boldsymbol\phi_i^{\mathsf T}\mathbf{C}\boldsymbol\phi_i = a_0 + a_1\omega_i^2$ by [[#thm-orth]], and off-diagonal terms vanish. Comparing with $2\zeta_i\omega_i$ gives [[#eq-rayleigh]]. The two conditions $\zeta(\omega_a) = \zeta(\omega_b) = \zeta_0$ are linear in $a_0, a_1$; solving them gives the stated coefficients.
:::

The mass-proportional part damps low frequencies, the stiffness-proportional part high ones. Between $\omega_a$ and $\omega_b$ the damping is slightly below $\zeta_0$; outside, it rises — which usefully suppresses the spurious high-frequency modes of the mesh, but also over-damps genuine high modes if $\omega_b$ is chosen too low.

::: widget plot
f: a/(2*x) + b*x/2; 0.02
x: 1, 200
y: 0, 0.08
sliders: a=0.3636:0:2:0.01; b=0.000364:0:0.002:0.00001
labels: \zeta(\omega); \zeta_0 = 0.02
points: 10,0.02; 100,0.02
caption: Damping ratio against frequency $\omega$ (rad/s) for Rayleigh damping $\mathbf{C} = a_0\mathbf{M} + a_1\mathbf{K}$ (sliders $a = a_0$ in s⁻¹ and $b = a_1$ in s). The initial values give $\zeta = 2\,\%$ exactly at $10$ and $100\,\mathrm{rad/s}$ (marked). Notice the dip between them — about $1.3\,\%$ at $50\,\mathrm{rad/s}$ — and the steep rise outside. Set $b = 0$: pure mass-proportional damping vanishes at high frequency; set $a = 0$: pure stiffness-proportional damping grows linearly and kills high modes.
:::

## Direct time integration

When the loading is short and violent (impact, blast, a drop), when it excites many modes, or when the problem is nonlinear, the equations of motion are integrated directly in time.

### Central differences: explicit integration

Replace the derivatives by central differences, $\ddot{\mathbf{d}}_n \approx (\mathbf{d}_{n+1} - 2\mathbf{d}_n + \mathbf{d}_{n-1})/\Delta t^2$ and $\dot{\mathbf{d}}_n \approx (\mathbf{d}_{n+1} - \mathbf{d}_{n-1})/(2\Delta t)$, and impose equilibrium at time $t_n$:
$$
\left(\frac{\mathbf{M}}{\Delta t^2} + \frac{\mathbf{C}}{2\Delta t}\right)\mathbf{d}_{n+1} = \mathbf{F}_n - \mathbf{K}\mathbf{d}_n + \frac{\mathbf{M}}{\Delta t^2}(2\mathbf{d}_n - \mathbf{d}_{n-1}) + \frac{\mathbf{C}}{2\Delta t}\mathbf{d}_{n-1}.
$$
With a lumped (diagonal) $\mathbf{M}$ and mass-proportional or no damping, the matrix on the left is diagonal: each step costs only the internal-force evaluation $\mathbf{K}\mathbf{d}_n$, element by element, with no equation solving. That is why explicit codes can handle millions of elements in crash and drop simulations. The price is a stability limit.

::: proposition Stability of the central-difference method {#prop-cfl}
For an undamped system, the central-difference method is stable if and only if
$$
\Delta t \le \Delta t_\text{cr} = \frac{2}{\omega_{\max}},
$$
where $\omega_{\max}$ is the highest natural frequency of the mesh. Since $\omega_{\max}$ is no greater than the largest natural frequency of any single unsupported element, a safe estimate is $\Delta t \le \min_e 2/\omega_{\max}^{(e)}$; for a lumped-mass bar element $\omega_{\max}^{(e)} = 2c/L_e$, giving the **Courant condition** $\Delta t \le L_e/c$ with $c = \sqrt{E/\rho}$.
:::

::: proof
For a single mode, $y_{n+1} - 2y_n + y_{n-1} + \omega^2\Delta t^2y_n = 0$. Trying $y_n = G^n$ gives $G^2 - (2 - \omega^2\Delta t^2)G + 1 = 0$. The product of the roots is 1; they are complex conjugates of modulus 1 (stable oscillation) when $\lvert 2 - \omega^2\Delta t^2\rvert \le 2$, i.e. $\omega\Delta t \le 2$, and real with one of modulus greater than 1 otherwise. The element bound follows from the fact that the Rayleigh quotient of the assembled system is a ratio of sums of element energies, each of which is at most $\omega_{\max}^{(e)2}$ times the element kinetic energy (Irons' element eigenvalue theorem). For the lumped bar element, $\mathbf{K}^{(e)}\boldsymbol\phi = \omega^2\mathbf{M}^{(e)}\boldsymbol\phi$ with $\boldsymbol\phi = [1, -1]$ gives $2EA/L = \omega^2\rho AL/2$, $\omega = 2c/L$.
:::

Physically, a stress wave must not cross more than one element in one time step. For steel ($c \approx 5050\,\mathrm{m/s}$) and $5\,\mathrm{mm}$ elements, $\Delta t \le 0.99\,\mu\mathrm{s}$: a $10\,\mathrm{ms}$ impact needs about ten thousand steps, and one small or distorted element anywhere in the model governs the step for the entire model. Explicit codes therefore report the elements with the smallest stable step, and some use **mass scaling** (adding artificial density to the smallest elements), which must be kept small enough not to alter the dynamics.

### Newmark's method: implicit integration

For vibration problems — responses lasting seconds, dominated by a few low modes — the explicit limit would demand millions of steps. Implicit methods remove the limit.

::: algorithm Newmark's method {#alg-newmark}
With parameters $\beta$ and $\gamma$, approximate
$$
\mathbf{d}_{n+1} = \mathbf{d}_n + \Delta t\,\dot{\mathbf{d}}_n + \Delta t^2\left[(\tfrac12 - \beta)\ddot{\mathbf{d}}_n + \beta\ddot{\mathbf{d}}_{n+1}\right], \qquad \dot{\mathbf{d}}_{n+1} = \dot{\mathbf{d}}_n + \Delta t\left[(1 - \gamma)\ddot{\mathbf{d}}_n + \gamma\ddot{\mathbf{d}}_{n+1}\right].
$$
1. Start: $\ddot{\mathbf{d}}_0 = \mathbf{M}^{-1}(\mathbf{F}_0 - \mathbf{C}\dot{\mathbf{d}}_0 - \mathbf{K}\mathbf{d}_0)$.
2. Form the effective stiffness $\hat{\mathbf{K}} = \mathbf{K} + \dfrac{\gamma}{\beta\Delta t}\mathbf{C} + \dfrac{1}{\beta\Delta t^2}\mathbf{M}$ and factorise it once.
3. Each step: solve $\hat{\mathbf{K}}\mathbf{d}_{n+1} = \mathbf{F}_{n+1} + \mathbf{M}\left[\dfrac{\mathbf{d}_n}{\beta\Delta t^2} + \dfrac{\dot{\mathbf{d}}_n}{\beta\Delta t} + \left(\dfrac{1}{2\beta} - 1\right)\ddot{\mathbf{d}}_n\right] + \mathbf{C}[\dots]$ (the analogous damping terms), then update $\ddot{\mathbf{d}}_{n+1}$ from the first formula and $\dot{\mathbf{d}}_{n+1}$ from the second.

The **average-acceleration** (trapezoidal) rule $\beta = \tfrac14$, $\gamma = \tfrac12$ is second-order accurate, unconditionally stable for linear problems and introduces no numerical damping. $\gamma > \tfrac12$ adds numerical damping at the cost of accuracy; the HHT-α method of Hilber, Hughes and Taylor (1977) damps the high modes while keeping second-order accuracy.
:::

Unconditional stability does not mean any step is accurate. The average-acceleration rule conserves energy for a linear undamped system but lengthens the period: a mode of frequency $\omega$ is integrated with an apparent frequency $\bar\omega$ satisfying $\tan(\bar\omega\Delta t/2) = \omega\Delta t/2$. With ten steps per period the period error is about 3 %; with twenty, under 1 %. A practical rule is $\Delta t \le T/20$ for the shortest period of interest; modes with periods shorter than a few time steps are then integrated inaccurately but harmlessly (they are distorted, not amplified).

::: example One Newmark step {#ex-newmark}
An oscillator with $m = 1\,\mathrm{kg}$, $k = 100\,\mathrm{N/m}$ ($\omega = 10\,\mathrm{rad/s}$), no damping and no load is released from $x_0 = 1\,\mathrm{m}$ at rest. Take one average-acceleration step of $\Delta t = 0.1\,\mathrm{s}$ and compare with the exact solution; check energy.
::: solution
$a_0 = -kx_0/m = -100\,\mathrm{m/s^2}$. Effective stiffness $\hat k = k + 4m/\Delta t^2 = 100 + 400 = 500\,\mathrm{N/m}$. Right-hand side $m[4x_0/\Delta t^2 + 4v_0/\Delta t + a_0] = 400 + 0 - 100 = 300\,\mathrm{N}$. So $x_1 = 300/500 = 0.600\,\mathrm{m}$. Then $a_1 = \frac{4}{\Delta t^2}(x_1 - x_0) - \frac{4}{\Delta t}v_0 - a_0 = 400(-0.4) + 100 = -60\,\mathrm{m/s^2}$ (equal to $-kx_1/m$, as it must be), and $v_1 = v_0 + \tfrac{\Delta t}{2}(a_0 + a_1) = 0.05(-160) = -8.00\,\mathrm{m/s}$.

Exact: $x(0.1) = \cos 1 = 0.540\,\mathrm{m}$, $v(0.1) = -10\sin 1 = -8.41\,\mathrm{m/s}$.

*Check.* Energy: $\tfrac12 kx_1^2 + \tfrac12 mv_1^2 = 18 + 32 = 50\,\mathrm{J} = \tfrac12 kx_0^2$, conserved exactly. The step ($\omega\Delta t = 1$, about six steps per period) is too long for accuracy — the numerical motion lags because its period is $7.8\,\%$ too long — but nothing grows. With $\Delta t = 0.03\,\mathrm{s}$ (about twenty steps per period) the lag would be under 1 %.
:::
:::

::: widget oscillator
m: 1
c: 0.4
k: 100
F: 0
omega: 10
x0: 1
v0: 0
caption: The single-degree-of-freedom oscillator to which every mode of a finite element model reduces in modal coordinates — here the system of [[#ex-newmark]] with a little damping ($\zeta = c/(2\sqrt{km}) = 2\,\%$). Add a harmonic force near $\omega = 10\,\mathrm{rad/s}$ to see resonance: in a modal analysis of a large structure, each retained mode behaves like this oscillator with its own $\omega_i$, $\zeta_i$ and modal force $\boldsymbol\phi_i^{\mathsf T}\mathbf{F}$.
:::

::: warning Choosing the analysis and the time step
Three mismatches recur. **Explicit integration for slow problems**: a 1-second vibration response of a steel part with 2 mm elements needs about $2.5$ million steps; use modal superposition or Newmark instead. **Implicit integration with a huge step for impact**: the method is stable, but stress waves are smeared and peak loads missed; wave-propagation problems need $\Delta t \approx L_e/c$ anyway, which favours explicit methods. **Too few modes or too coarse a mesh**: a mode is meaningful only if the mesh has several elements per half-wavelength and the time step resolves its period; check the frequencies of the modes you rely on by refining the mesh, and check the cumulative effective mass.
:::

::: quiz
Two analysts compute the first natural frequency of the same bracket, one with consistent and one with lumped mass, on the same mesh. They obtain 412 Hz and 398 Hz. Which statement is most defensible?
- [ ] The lumped result is wrong because lumped mass matrices are an approximation.
- [x] The exact frequency of the continuum model is probably between the two, below 412 Hz; refining the mesh will lower the consistent result.
- [ ] The exact frequency is above 412 Hz, because finite element models are too flexible.
- [ ] The difference shows that the mesh has converged.
::: solution
With consistent mass, [[#prop-rayleigh]] makes 412 Hz an upper bound that decreases with refinement. Lumped mass usually (not always) errs on the low side for continuum elements, so the two results bracket the answer; a 3.5 % spread says the mesh is not yet converged for this mode. Displacement-based models are too *stiff*, which is why their frequencies are too high.
:::
:::

::: history
Matrix structural dynamics developed alongside the static method in the aircraft industry, where flutter and vibration were pressing problems in the 1950s. The consistent mass matrix was introduced by John Archer in 1963 ("Consistent mass matrix for distributed mass systems", *Journal of the Structural Division, ASCE*), who showed that it gives more accurate frequencies than lumping for beams. Nathan Newmark's 1959 paper "A method of computation for structural dynamics" introduced the family of integrators that bears his name, devised for blast and earthquake response. Hilber, Hughes and Taylor's α-method of 1977 added controllable high-frequency damping. Explicit central-difference codes for impact, beginning with John Hallquist's DYNA3D at Lawrence Livermore National Laboratory in 1976, made full-vehicle crash simulation possible and are now used routinely in automotive safety design.
:::

::: summary
- Virtual work with d'Alembert's inertia force gives $\mathbf{M}\ddot{\mathbf{d}} + \mathbf{C}\dot{\mathbf{d}} + \mathbf{K}\mathbf{d} = \mathbf{F}(t)$ with consistent mass $\int\rho\mathbf{N}^{\mathsf T}\mathbf{N}\,dV$; bar: $\tfrac{\rho AL}{6}[2, 1; 1, 2]$, lumped $\tfrac{\rho AL}{2}\mathbf{I}$.
- Natural frequencies and modes solve $\mathbf{K}\boldsymbol\phi = \omega^2\mathbf{M}\boldsymbol\phi$; modes are $\mathbf{M}$- and $\mathbf{K}$-orthogonal, which decouples the equations into single-DOF oscillators.
- Consistent-mass frequencies are upper bounds that fall with refinement; lumped frequencies are usually low. Frequency errors converge like $h^2$; higher modes need finer meshes.
- Rayleigh damping $a_0\mathbf{M} + a_1\mathbf{K}$ gives $\zeta(\omega) = a_0/2\omega + a_1\omega/2$, fitted at two frequencies.
- Central differences with lumped mass are explicit and cheap per step but need $\Delta t \le 2/\omega_{\max} \approx L_e/c$; Newmark's average-acceleration rule is unconditionally stable and energy-conserving but needs $\Delta t \lesssim T/20$ for accuracy.
- Use explicit integration for waves and impact, modal or implicit methods for vibration, and check modes against mesh refinement and effective mass.
:::

## Exercises

::: exercise A consistent mass entry {level=1 check="0.13083"}
A steel bar element ($\rho = 7850\,\mathrm{kg/m^3}$) has area $1.0\times10^{-4}\,\mathrm{m^2}$ and length $0.5\,\mathrm{m}$. What is the diagonal entry $m_{11}$ of its consistent mass matrix? (Enter it in kg.)
::: solution
$m_{11} = \rho AL/3 = 7850 \times 10^{-4} \times 0.5/3 = 0.13083\,\mathrm{kg}$. The off-diagonal entry is half of it; the four entries sum to the element mass $0.3925\,\mathrm{kg}$.
:::
:::

::: exercise A critical time step {level=1 check="0.3928"}
Estimate the critical time step of an explicit analysis of an aluminium part ($E = 70\,\mathrm{GPa}$, $\rho = 2700\,\mathrm{kg/m^3}$) whose smallest element is $2\,\mathrm{mm}$ across. (Enter $\Delta t$ in μs.)
::: solution
$c = \sqrt{70\times10^9/2700} = 5092\,\mathrm{m/s}$; $\Delta t \le L_e/c = 0.002/5092 = 3.93\times10^{-7}\,\mathrm{s} = 0.3928\,\mu\mathrm{s}$. (Codes apply a safety factor of about 0.9.)
:::
:::

::: exercise Damping between the fitting frequencies {level=1 check="1.2727"}
Rayleigh damping is fitted to give $\zeta = 2\,\%$ at $10$ and $100\,\mathrm{rad/s}$. What is the damping ratio at $50\,\mathrm{rad/s}$? (Enter it in per cent.)
::: solution
$a_0 = 2(0.02)(1000)/110 = 0.3636\,\mathrm{s^{-1}}$, $a_1 = 0.04/110 = 3.636\times10^{-4}\,\mathrm{s}$. $\zeta(50) = 0.3636/100 + 3.636\times10^{-4} \times 25 = 0.003636 + 0.009091 = 0.012727$, i.e. $1.2727\,\%$.
:::
:::

::: exercise A one-element aluminium bar {level=2 check="2865.1"}
An aluminium bar ($E = 70\,\mathrm{GPa}$, $\rho = 2700\,\mathrm{kg/m^3}$), $0.4\,\mathrm{m}$ long, fixed at one end and free at the other, is modelled with one element and lumped mass. What fundamental frequency does the model give? (Enter $f_1$ in Hz.) Compare with the exact value.
::: solution
$\omega = \sqrt2\,c/L = 1.4142 \times 5091.8/0.4 = 18\,002\,\mathrm{rad/s}$, $f_1 = 2865.1\,\mathrm{Hz}$. Exact: $f_1 = c/(4L) = 3182\,\mathrm{Hz}$; the model is 10 % low, as in [[#ex-bar]].
:::
:::

::: exercise Frequencies of a two-mass chain {level=2 check="22.361"}
For the two-storey model of [[#ex-2dof]], verify the characteristic equation and give the lower natural frequency. (Enter $\omega_1$ in rad/s.)
::: solution
$(3\times10^5 - 200s)(10^5 - 100s) - 10^{10} = 2\times10^4s^2 - 5\times10^7s + 3\times10^{10} - 10^{10}$, so $s^2 - 2500s + 10^6 = 0$, $s = 500$ and $2000$. $\omega_1 = \sqrt{500} = 22.361\,\mathrm{rad/s}$.
:::
:::

::: exercise Newmark's effective stiffness {level=2 check="500"}
For the oscillator of [[#ex-newmark]], derive the effective stiffness of the average-acceleration method from the two Newmark formulas with $\beta = \tfrac14$, $\gamma = \tfrac12$ and evaluate it for $\Delta t = 0.1\,\mathrm{s}$. (Enter $\hat k$ in N/m.)
::: solution
From the displacement formula with $\beta = \tfrac14$: $a_{n+1} = \frac{4}{\Delta t^2}(x_{n+1} - x_n) - \frac{4}{\Delta t}v_n - a_n$. Substituting into $ma_{n+1} + kx_{n+1} = F_{n+1}$ gives $(k + 4m/\Delta t^2)x_{n+1} = F_{n+1} + m\left[\frac{4}{\Delta t^2}x_n + \frac{4}{\Delta t}v_n + a_n\right]$. Hence $\hat k = 100 + 4/0.01 = 500\,\mathrm{N/m}$.
:::
:::

::: exercise Period elongation {level=3 check="1.0321"}
For the average-acceleration method the numerical frequency satisfies $\tan(\bar\omega\Delta t/2) = \omega\Delta t/2$. Derive this from the scheme applied to $\ddot x + \omega^2x = 0$, and compute the ratio of numerical to exact period $\bar T/T$ when there are ten time steps per exact period. (Enter $\bar T/T$.)
::: solution
Combining the Newmark formulas with $\beta = \tfrac14$, $\gamma = \tfrac12$ for the undamped oscillator gives the two-step recurrence $(1 + \tfrac{\Omega^2}{4})x_{n+1} - 2(1 - \tfrac{\Omega^2}{4})x_n + (1 + \tfrac{\Omega^2}{4})x_{n-1} = 0$ with $\Omega = \omega\Delta t$. Trying $x_n = e^{i\bar\omega n\Delta t}$: $\cos(\bar\omega\Delta t) = \dfrac{1 - \Omega^2/4}{1 + \Omega^2/4}$, which with $\cos 2\psi = (1 - \tan^2\psi)/(1 + \tan^2\psi)$ gives $\tan(\bar\omega\Delta t/2) = \Omega/2$; $\lvert G\rvert = 1$, so there is no amplitude error. Ten steps per period: $\Omega = 2\pi/10 = 0.6283$; $\bar\omega\Delta t = 2\arctan(0.31416) = 0.60878$; $\bar T/T = \omega/\bar\omega = 0.6283/0.6088 = 1.0321$, a 3.2 % period elongation.
:::
:::

::: exercise The upper-bound property {level=3}
Using the Rayleigh quotient, prove that for a fixed–free bar the one-element consistent-mass frequency $\sqrt3\,c/L$ must exceed the exact $\frac{\pi}{2}c/L$, and explain why the one-element lumped-mass frequency $\sqrt2\,c/L$ is not covered by the argument. Then show that the *average* of the consistent and lumped mass matrices gives, for one element, $\omega = \sqrt{12/5}\,c/L$, and compare its error with the two parents.
::: solution
The exact $\omega_1^2$ is the minimum over admissible $u(x)$ (with $u(0) = 0$) of $R = \int EA(u')^2dx/\int\rho Au^2dx$. The one-element field $u = (x/L)u_2$ is admissible: $R = (EA/L)/(\rho AL/3) = 3c^2/L^2$, so $3c^2/L^2 \ge \omega_1^2 = (\pi^2/4)c^2/L^2$, i.e. $\sqrt3 > \pi/2$ ✓. The lumped matrix gives kinetic energy $\tfrac12(\rho AL/2)\dot u_2^2$, not the true $\tfrac12(\rho AL/3)\dot u_2^2$ of the linear field, so its quotient is not the continuum Rayleigh quotient of any admissible field and no bound follows. The average matrix has $m_{22} = \tfrac12(\tfrac13 + \tfrac12)\rho AL = \tfrac{5}{12}\rho AL$, giving $\omega = \sqrt{12/5}\,c/L = 1.549\,c/L$ against the exact $1.571\,c/L$: error $-1.4\,\%$, against $+10.3\,\%$ and $-10.0\,\%$. "Higher-order" mass matrices of this kind are used to reduce dispersion error in wave-propagation analysis.
:::
:::

::: exercise Planning a dynamic analysis {level=3}
For each of the following, choose between modal superposition, implicit (Newmark) integration and explicit (central-difference) integration, and justify the choice with estimates of time steps or mode counts: (a) the response of a machine frame to an out-of-balance rotor running at 1500 rpm; (b) a 1.5 m drop of a packaged electronic unit onto concrete, impact duration a few milliseconds; (c) the transient response of a steel footbridge to a group of pedestrians crossing in 60 s.
::: solution
(a) Steady harmonic excitation at $25\,\mathrm{Hz}$ of a linear structure: a modal analysis (or direct frequency response) using modes up to two or three times $25\,\mathrm{Hz}$, with modal damping, checking that no natural frequency is close to $25\,\mathrm{Hz}$ (or $50\,\mathrm{Hz}$ for the second harmonic). (b) A short, violent, nonlinear event with contact and stress waves: explicit integration. With $2\,\mathrm{mm}$ elements in aluminium or steel, $\Delta t \approx 0.4\,\mu\mathrm{s}$, so a $10\,\mathrm{ms}$ simulation needs about 25 000 steps — routine. Implicit integration would need nonlinear iterations every step and gives no benefit at such small steps. (c) A long, low-frequency, linear response: modal superposition with the first few vertical and lateral modes (footbridge frequencies of 1–5 Hz are typical) and a time-varying modal load, or Newmark with $\Delta t \approx T_{\min}/20$ (for a highest mode of interest at 10 Hz, $\Delta t = 5\,\mathrm{ms}$, 12 000 steps). Explicit integration would need a step of microseconds — tens of millions of steps — and is unsuitable. In all cases, results must be checked against the relevant design guidance (pedestrian comfort criteria for (c), for example); the analysis informs but does not replace it.
:::
:::
