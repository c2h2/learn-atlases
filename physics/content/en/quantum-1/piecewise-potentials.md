The time-independent Schrödinger equation of [[quantum-1/schrodinger-equation]] is easy to write and, for most potentials, impossible to solve in closed form. There is one family for which it is always solvable: potentials that are constant on intervals and jump between constant values. On each interval the equation is $\psi'' = -k^2\psi$ or $\psi'' = \kappa^2\psi$, whose solutions are sines and cosines or real exponentials. All the physics is in how the pieces are joined.

Piecewise potentials are idealisations. No real potential jumps discontinuously. But a potential that changes over a distance short compared with the de Broglie wavelength looks like a jump to the particle, and models of this kind describe electrons in semiconductor quantum wells, neutrons in a nucleus, conduction electrons at a metal surface and the tunnelling current in a scanning tunnelling microscope. More importantly, they show the three phenomena that make quantum mechanics different from classical mechanics in the simplest possible setting: **quantisation** of bound-state energies, **reflection** from a step that a classical particle would simply climb, and **tunnelling** through a barrier that a classical particle could not cross.

We solve, in order, the infinite square well, the finite square well, the potential step and the rectangular barrier. Throughout, the matching conditions from [[quantum-1/schrodinger-equation#stationary]] apply: $\psi$ is continuous everywhere, $\psi'$ is continuous wherever $V$ is finite, and at an infinite wall $\psi = 0$.

## The infinite square well {#infinite-well}

Take

$$
V(x) = \begin{cases} 0, & 0 < x < a, \\ \infty, & \text{otherwise}. \end{cases}
$$

The particle cannot be outside the well, so $\psi = 0$ there, and continuity of $\psi$ requires $\psi(0) = \psi(a) = 0$. Inside, $V = 0$ and the equation is $\psi'' = -k^2\psi$ with $k = \sqrt{2mE}/\hbar$. (We showed in [[quantum-1/schrodinger-equation]] that $E > V_{\min} = 0$, so $k$ is real and positive.) The general solution is $\psi = A\sin kx + B\cos kx$. The condition $\psi(0) = 0$ gives $B = 0$. The condition $\psi(a) = 0$ then gives $A\sin ka = 0$; $A = 0$ would leave nothing, so $\sin ka = 0$ and $ka = n\pi$.

::: theorem Infinite square well {#thm-infinite-well}
The normalised energy eigenfunctions and energies of a particle of mass $m$ in an infinite square well of width $a$ are

$$
\psi_n(x) = \sqrt{\frac{2}{a}}\,\sin\frac{n\pi x}{a}, \qquad E_n = \frac{n^2\pi^2\hbar^2}{2ma^2}, \qquad n = 1, 2, 3, \ldots
$$ {#eq-infinite-well}

The eigenfunctions are **orthonormal**, $\int_0^a\psi_m\psi_n\,\dd x = \delta_{mn}$.
:::

::: proof
The energies come from $k_n = n\pi/a$ and $E = \hbar^2k^2/2m$. Negative $n$ give the same functions up to sign and $n = 0$ gives $\psi = 0$, so $n = 1, 2, \ldots$ lists every independent solution once. For normalisation, $\int_0^a A^2\sin^2(n\pi x/a)\,\dd x = A^2a/2$, so $A = \sqrt{2/a}$. For $m \ne n$, use $2\sin\alpha\sin\beta = \cos(\alpha-\beta) - \cos(\alpha+\beta)$:

$$
\int_0^a\psi_m\psi_n\,\dd x = \frac1a\int_0^a\left[\cos\frac{(m-n)\pi x}{a} - \cos\frac{(m+n)\pi x}{a}\right]\dd x = \frac{1}{\pi}\left[\frac{\sin(m-n)\pi}{m-n} - \frac{\sin(m+n)\pi}{m+n}\right] = 0.
$$
:::

Several features recur in every bound-state problem. The ground state energy is not zero: $E_1 = \pi^2\hbar^2/2ma^2 > 0$. A particle confined to a region of size $a$ has momentum uncertainty of order $\hbar/a$ and so kinetic energy of order $\hbar^2/ma^2$; this **zero-point energy** is the uncertainty principle at work. The $n$th eigenfunction has $n - 1$ nodes inside the well. The eigenfunctions alternate between symmetric and antisymmetric about the centre. And the energies grow like $n^2$, so the spacing grows too, unlike the evenly spaced oscillator of [[quantum-1/harmonic-oscillator]].

The functions $\psi_n$ are also **complete**: any reasonable function $f$ on $[0,a]$ vanishing at the ends can be expanded as $f = \sum c_n\psi_n$ with $c_n = \int_0^a\psi_nf\,\dd x$. This is the Fourier sine series ([Maths Atlas: Fourier series](/learn/maths/lesson.php?c=pde&l=fourier-series)), and it is what made the expansion in [[quantum-1/schrodinger-equation#ex-expand]] possible.

::: widget well
n: 1
show: both
caption: The eigenfunction $\psi_n$ and the density $\abs{\psi_n}^2$ of the infinite well, in units $\hbar = m = a = 1$. Step $n$ upward. Count the nodes ($n - 1$), notice that the energy rises like $n^2$, and see that for large $n$ the density oscillates so fast that its average over any small interval is the uniform $1/a$ of a classical particle bouncing between the walls.
:::

::: example An electron in a nanometre box {#ex-box}
Find the three lowest energies of an electron in an infinite well of width $1.00\,\mathrm{nm}$, and the wavelength of the photon emitted in the $2\to1$ transition. Compare with a proton confined to $10.0\,\mathrm{fm}$, the size of a nucleus.
::: solution
$E_1 = \pi^2\hbar^2/2m_ea^2 = \pi^2(1.05457\times10^{-34})^2/\bigl(2(9.10938\times10^{-31})(1.00\times10^{-9})^2\bigr) = 6.025\times10^{-20}\,\mathrm{J} = 0.376\,\mathrm{eV}$. Then $E_2 = 4E_1 = 1.504\,\mathrm{eV}$ and $E_3 = 9E_1 = 3.384\,\mathrm{eV}$. The photon from $2\to1$ carries $3E_1 = 1.128\,\mathrm{eV}$ and has $\lambda = 1239.84/1.128\,\mathrm{nm} = 1099\,\mathrm{nm}$, in the near infrared. Semiconductor quantum wells of a few nanometres, made by sandwiching gallium arsenide between layers of aluminium gallium arsenide, tune laser and detector wavelengths in exactly this way, although the well is finite and the electron's effective mass is smaller than $m_e$.

For the proton, $E_1 = \pi^2\hbar^2/2m_pa^2$ with $a = 1.00\times10^{-14}\,\mathrm{m}$ gives $3.28\times10^{-13}\,\mathrm{J} = 2.05\,\mathrm{MeV}$. The mass is $1836$ times larger and the width $10^5$ times smaller, so the energy is $10^{10}/1836 \approx 5\times10^6$ times larger. This is why nuclear energies are millions of electronvolts and atomic energies a few.
:::
:::

## The finite square well {#finite-well}

Now let the walls have finite height. It is convenient to put the zero of energy outside and centre the well at the origin:

$$
V(x) = \begin{cases} -V_0, & \abs{x} < a, \\ 0, & \abs{x} > a, \end{cases} \qquad V_0 > 0.
$$

The well has width $2a$ and depth $V_0$. Bound states have $-V_0 < E < 0$. Inside, $\psi'' = -k^2\psi$ with $k = \sqrt{2m(E + V_0)}/\hbar$. Outside, $\psi'' = \kappa^2\psi$ with $\kappa = \sqrt{-2mE}/\hbar > 0$, so $\psi$ is a combination of $e^{\kappa x}$ and $e^{-\kappa x}$, and normalisability keeps only $e^{-\kappa x}$ for $x > a$ and $e^{\kappa x}$ for $x < -a$. The wavefunction leaks into the classically forbidden region, decaying over a length $1/\kappa$.

Because $V$ is even, the eigenfunctions can be chosen even or odd (if $\psi(x)$ is a solution, so is $\psi(-x)$, and hence so are their sum and difference). It is convenient to introduce the dimensionless variables

$$
z = ka, \qquad z_0 = \frac{a}{\hbar}\sqrt{2mV_0}, \qquad\text{so that}\qquad (\kappa a)^2 = z_0^2 - z^2.
$$

The single number $z_0$, which combines depth and width, determines everything.

::: theorem Bound states of the finite well {#thm-finite-well}
The even bound states are $\psi = \cos kx$ for $\abs x < a$ and $\psi = \cos(ka)\,e^{-\kappa(\abs x - a)}$ for $\abs x > a$ (unnormalised), with $z = ka$ a root in $0 < z < z_0$ of

$$
\tan z = \sqrt{\frac{z_0^2}{z^2} - 1}.
$$ {#eq-even}

The odd bound states are $\psi = \sin kx$ inside, with $z$ a root of

$$
-\cot z = \sqrt{\frac{z_0^2}{z^2} - 1}.
$$ {#eq-odd}

The energies are $E = -V_0 + \hbar^2z^2/2ma^2$. The number of bound states is the smallest integer $N \ge 2z_0/\pi$; in particular there is always at least one (even) bound state, however shallow or narrow the well.
:::

::: proof
For the even case, match at $x = a$ (the conditions at $-a$ then hold by symmetry). Inside $\psi = A\cos kx$, outside $\psi = Fe^{-\kappa x}$. Continuity of $\psi$ and $\psi'$:

$$
A\cos ka = Fe^{-\kappa a}, \qquad -kA\sin ka = -\kappa Fe^{-\kappa a}.
$$

Dividing the second by the first eliminates $A$ and $F$: $k\tan ka = \kappa$, i.e. $\tan z = \kappa a/z = \sqrt{z_0^2 - z^2}/z$, which is [[#eq-even]]. For the odd case, $\psi = A\sin kx$ inside, and the same division gives $k\cot ka = -\kappa$, i.e. [[#eq-odd]].

For the count, the right-hand side $\sqrt{z_0^2/z^2 - 1}$ decreases from $+\infty$ at $z \to 0^+$ to $0$ at $z = z_0$. On each interval $\bigl(j\pi, j\pi + \frac{\pi}{2}\bigr)$, $\tan z$ increases from $0$ to $+\infty$, so if $j\pi < z_0$ the two curves cross exactly once on that interval: at its left end $\tan z$ is below the right-hand side, and at its right end (or at $z_0$, whichever comes first) it is above. On the intervals where $\tan z < 0$ there are no even roots. So even roots exist for $j = 0, 1, \ldots$ with $j\pi < z_0$; the case $j = 0$ always qualifies, giving at least one bound state. The odd equation is the same with $-\cot z = \tan(z - \pi/2)$, giving one root on each interval $\bigl((j+\frac12)\pi, (j+1)\pi\bigr)$ with $(j + \frac12)\pi < z_0$. Altogether there is one bound state for each non-negative integer $\ell$ with $\ell\pi/2 < z_0$, which is $\lceil 2z_0/\pi\rceil$ states.
:::

The equations are **transcendental**: there is no formula for $z$. You solve them graphically, to see how many roots there are and roughly where, and then numerically. Bisection on $f(z) = \tan z - \sqrt{z_0^2/z^2 - 1}$ over each bracketing interval converges to machine precision in fifty steps; Newton's method in five.

::: widget plot
f: tan(x); -1/tan(x); sqrt(max(w^2/x^2 - 1, 0))
x: 0.01, 10
y: 0, 8
labels: tan z (even); −cot z (odd); √(z0²/z² − 1)
sliders: w=4.05:0.3:10:0.05
caption: The graphical solution of the finite well, with $z$ on the horizontal axis and $w = z_0$ on the slider. Each crossing of the decreasing curve with a branch of $\tan z$ is an even state, and each crossing with a branch of $-\cot z$ is an odd state. At $w = 4.05$ (the electron of the worked example) there are three. Increase $w$: a new state appears each time $z_0$ passes a multiple of $\pi/2$. Decrease it below $\pi/2 \approx 1.57$: one crossing always survives.
:::

::: example An electron in a 10 eV well {#ex-finite}
An electron is bound in a finite well of depth $V_0 = 10.0\,\mathrm{eV}$ and width $2a = 0.500\,\mathrm{nm}$. Find the number of bound states and their energies, and compare with an infinite well of the same width.
::: solution
First the strength parameter:

$$
z_0 = \frac{a\sqrt{2m_eV_0}}{\hbar} = \frac{(2.50\times10^{-10})\sqrt{2(9.10938\times10^{-31})(1.602177\times10^{-18})}}{1.054572\times10^{-34}} = 4.050.
$$

Since $2z_0/\pi = 2.58$, there are $3$ bound states: two even (roots in $(0, \pi/2)$ and $(\pi, 3\pi/2)$) and one odd (root in $(\pi/2, \pi)$). Bisection on [[#eq-even]] and [[#eq-odd]] gives

$$
z_1 = 1.2556\ (\text{even}), \qquad z_2 = 2.4820\ (\text{odd}), \qquad z_3 = 3.6114\ (\text{even}).
$$

The energy measured from the bottom of the well is $E + V_0 = \hbar^2z^2/2m_ea^2 = (z/z_0)^2V_0$, so

$$
E_1 + V_0 = 0.961\,\mathrm{eV}, \qquad E_2 + V_0 = 3.755\,\mathrm{eV}, \qquad E_3 + V_0 = 7.950\,\mathrm{eV},
$$

that is $E_1 = -9.04\,\mathrm{eV}$, $E_2 = -6.24\,\mathrm{eV}$, $E_3 = -2.05\,\mathrm{eV}$. An infinite well of the same width would have $E_n = n^2\pi^2\hbar^2/2m_e(2a)^2 = 1.504,\ 6.016,\ 13.54\,\mathrm{eV}$ above its floor, and the third of these is above the top of the finite well. Every finite-well level lies below the corresponding infinite-well level, because the wavefunction leaks outside: the effective width is larger, so the curvature, and with it the kinetic energy, is smaller.

The decay constants follow from $\kappa a = \sqrt{z_0^2 - z^2}$: $3.85$, $3.20$ and $1.83$. The penetration depth $1/\kappa$ is $a/3.85 = 0.065\,\mathrm{nm}$ for the ground state and $a/1.83 = 0.136\,\mathrm{nm}$ for the top state. The least-bound state reaches furthest into the forbidden region.
:::
:::

Two limits are instructive. For a deep, wide well, $z_0 \to \infty$, the low roots approach $z = n\pi/2$ and $E + V_0 \to n^2\pi^2\hbar^2/2m(2a)^2$, the infinite-well energies. For a shallow, narrow well, $z_0 \ll 1$, only the ground state survives, with $z \approx z_0$ and $\kappa \to 0$: the state is barely bound and spreads far outside the well. In three dimensions the second statement is false; a shallow spherical well need not bind anything, which is why the deuteron, with a single weakly bound state, is a delicate object.

::: quiz
The depth of a finite square well is gradually reduced while its width is held fixed. Which statement is correct?
- [ ] All bound states eventually disappear when $V_0$ is small enough.
- [x] States disappear one at a time into the continuum as $z_0$ falls below successive multiples of $\pi/2$, but the ground state never does.
- [ ] The energies of all states rise together until they reach $E = V_0$.
- [ ] The number of nodes of each state increases as it becomes less bound.
::: solution
By [[#thm-finite-well]] the number of bound states is $\lceil 2z_0/\pi\rceil$, which drops by one each time $z_0$ crosses a multiple of $\pi/2$ but is at least $1$ for every $z_0 > 0$. Energies rise toward $E = 0$ (the top of the well, in our convention), not toward $V_0$. The $n$th state always has $n - 1$ nodes.
:::
:::

## The delta-function well and non-degeneracy {#delta}

The narrowest possible well is a spike: $V(x) = -\alpha\,\delta(x)$ with $\alpha > 0$, a well of zero width and infinite depth whose "strength" $\alpha$ (units of energy times length) is the area $2aV_0$ of a finite well in the limit $a \to 0$. It is a useful model of a short-range attraction, and it shows how the matching conditions change at an infinite spike.

Integrate the time-independent equation from $-\eps$ to $\eps$:

$$
-\frac{\hbar^2}{2m}\bigl[\psi'(\eps) - \psi'(-\eps)\bigr] - \alpha\psi(0) = E\int_{-\eps}^{\eps}\psi\,\dd x \to 0.
$$

So $\psi$ is still continuous, but its derivative jumps:

$$
\psi'(0^+) - \psi'(0^-) = -\frac{2m\alpha}{\hbar^2}\,\psi(0).
$$ {#eq-delta-jump}

Away from $x = 0$, $V = 0$ and a bound state with $E < 0$ is $e^{-\kappa\abs x}$ (the only combination that decays at both ends and is continuous at $0$). Its derivative jumps from $+\kappa$ to $-\kappa$, so [[#eq-delta-jump]] gives $-2\kappa = -2m\alpha/\hbar^2$, and

$$
\kappa = \frac{m\alpha}{\hbar^2}, \qquad E = -\frac{\hbar^2\kappa^2}{2m} = -\frac{m\alpha^2}{2\hbar^2}, \qquad \psi(x) = \sqrt\kappa\,e^{-\kappa\abs x}.
$$

There is exactly one bound state, whatever the value of $\alpha$. This is the cusped wavefunction normalised in the exercises of [[quantum-1/schrodinger-equation]].

::: example The delta well as a limit {#ex-delta-limit}
Show that the ground state of the finite well of [[#thm-finite-well]] tends to the delta-well bound state when $a \to 0$ with $2aV_0 = \alpha$ held fixed.
::: solution
In this limit $z_0^2 = 2ma^2V_0/\hbar^2 = m\alpha a/\hbar^2 \to 0$, so there is a single even state with $0 < z < z_0 \ll 1$. For small $z$, $\tan z \approx z$, and [[#eq-even]] reads $z \approx \kappa a/z$, i.e. $\kappa a \approx z^2$. Since also $(\kappa a)^2 = z_0^2 - z^2$, and $\kappa a \approx z^2$ is of order $z_0^2$, which is much smaller than $z_0$, we get $z^2 = z_0^2 - (\kappa a)^2 \approx z_0^2$. Therefore

$$
\kappa \approx \frac{z^2}{a} \approx \frac{z_0^2}{a} = \frac{2maV_0}{\hbar^2} = \frac{m\alpha}{\hbar^2},
$$

which is the delta-well result. The binding energy $\hbar^2\kappa^2/2m = m\alpha^2/2\hbar^2$ is of order $z_0^4$ in units of $\hbar^2/2ma^2$: a weak, narrow well binds very weakly, and the state extends a distance $1/\kappa \gg a$ beyond the well.
:::
:::

Every bound state we have found in one dimension had a single eigenfunction for each energy. That is not a coincidence.

::: theorem No degeneracy in one dimension {#thm-nondegenerate}
Let $\psi_1$ and $\psi_2$ be normalisable solutions of the one-dimensional time-independent Schrödinger equation with the same energy $E$. Then $\psi_2 = c\,\psi_1$ for some constant $c$.
:::

::: proof
Multiply $\psi_1'' = (2m/\hbar^2)(V - E)\psi_1$ by $\psi_2$, and $\psi_2'' = (2m/\hbar^2)(V - E)\psi_2$ by $\psi_1$, and subtract: $\psi_2\psi_1'' - \psi_1\psi_2'' = 0$. The left side is the derivative of the Wronskian $W = \psi_2\psi_1' - \psi_1\psi_2'$, so $W$ is constant (across a finite jump or a delta function of $V$ too, since both $\psi$ jump conditions are the same linear relation). Both functions vanish at infinity, so $W = 0$. On any interval where $\psi_1 \ne 0$, $W = 0$ says $(\psi_2/\psi_1)' = -W/\psi_1^2 = 0$, so $\psi_2 = c\psi_1$ there; since solutions of a second-order linear ODE are fixed by their value and derivative at one point, the relation holds everywhere.
:::

Two consequences. Because each energy has one eigenfunction, and the real and imaginary parts of a solution are solutions, bound-state eigenfunctions in one dimension are real up to an overall phase. And when $V$ is even, $\psi(-x)$ is a solution with the same energy, so $\psi(-x) = c\,\psi(x)$ with $c^2 = 1$: every bound state is either even or odd, which justifies the split in [[#thm-finite-well]]. Scattering states are different: at energy $E > 0$ the waves $e^{ikx}$ and $e^{-ikx}$ are independent, and the theorem does not apply because they do not vanish at infinity.

## The potential step {#step}

Unbound states behave differently. Consider the step

$$
V(x) = \begin{cases} 0, & x < 0, \\ V_0, & x > 0, \end{cases}
$$

with particles of energy $E$ sent in from the left. The energy eigenfunctions are not normalisable, as for the free particle; they describe a steady beam, and the physical content is in ratios of probability currents. In [[quantum-1/schrodinger-equation]] we found that the wave $Ae^{ikx}$ carries current $\abs{A}^2\hbar k/m$, and that oppositely moving waves carry their currents independently.

::: definition Reflection and transmission coefficients {#def-rt}
For a stationary scattering state with incident wave $Ae^{ikx}$, reflected wave $Be^{-ikx}$ on the left and transmitted wave $Fe^{ik'x}$ on the right, the **reflection** and **transmission coefficients** are the ratios of probability currents

$$
R = \frac{\abs{j_{\mathrm{ref}}}}{j_{\mathrm{inc}}} = \frac{\abs{B}^2}{\abs{A}^2}, \qquad T = \frac{j_{\mathrm{trans}}}{j_{\mathrm{inc}}} = \frac{k'}{k}\,\frac{\abs F^2}{\abs A^2}.
$$

The factor $k'/k$ appears because the transmitted wave travels at a different speed.
:::

Conservation of probability in a steady state means $\partial_t\rho = 0$, so by the continuity equation $j$ is the same at every $x$. On the left, $j = (\hbar k/m)(\abs A^2 - \abs B^2)$; on the right $j = (\hbar k'/m)\abs F^2$. Equating them gives $R + T = 1$ in every one-dimensional scattering problem.

**Case $E > V_0$.** On the right, $k' = \sqrt{2m(E - V_0)}/\hbar$, and with no source on the right only the outgoing wave $Fe^{ik'x}$ is present. Matching at $x = 0$:

$$
A + B = F, \qquad ik(A - B) = ik'F.
$$

Hence $B/A = (k - k')/(k + k')$ and $F/A = 2k/(k + k')$, and

$$
R = \left(\frac{k - k'}{k + k'}\right)^2, \qquad T = \frac{4kk'}{(k+k')^2}.
$$ {#eq-step-rt}

A classical particle with $E > V_0$ always crosses the step and slows down. A quantum particle is sometimes reflected, even though it has enough energy. The same formula holds for a step down ($V_0 < 0$), and it is the same as the reflection of light at an interface between media of refractive indices proportional to $k$ and $k'$ (the Fresnel formula at normal incidence, [[optics]]). Reflection is a wave property, and it does not care which way the step goes.

**Case $0 < E < V_0$.** Now on the right $\psi'' = \kappa^2\psi$ with $\kappa = \sqrt{2m(V_0 - E)}/\hbar$, and we keep only $Fe^{-\kappa x}$. The matching conditions are the previous ones with $ik' \to -\kappa$: $B/A = (k - i\kappa)/(k + i\kappa)$, which has modulus $1$. So $R = 1$: every particle is reflected eventually, as classically. But the wavefunction penetrates the forbidden region with density $\abs F^2e^{-2\kappa x}$, and the reflected wave is shifted in phase by $\arg(B/A) = -2\arctan(\kappa/k)$. A real exponential carries no current, so $T = 0$ is consistent.

::: example Partial reflection and penetration {#ex-step}
(a) Particles with $E = 2V_0$ meet an upward step. What fraction is reflected? (b) An electron with $E = 5.00\,\mathrm{eV}$ meets a step of height $10.0\,\mathrm{eV}$. Find the penetration depth $1/\kappa$.
::: solution
(a) $k \propto \sqrt E$ and $k' \propto \sqrt{E - V_0}$, so $k'/k = \sqrt{1/2} = 0.7071$. By [[#eq-step-rt]],

$$
R = \left(\frac{1 - 0.7071}{1 + 0.7071}\right)^2 = (0.1716)^2 = 0.0294, \qquad T = \frac{4(0.7071)}{(1.7071)^2} = 0.9706.
$$

About $3\%$ are reflected. $R + T = 1$ as it must. The result depends only on $E/V_0$, not on the mass or on $\hbar$: but notice that it does not tend to zero as $\hbar \to 0$ either. The classical limit is recovered only because real steps are smooth over many wavelengths, and for a smooth step reflection is exponentially small.

(b) $\kappa = \sqrt{2m_e(5.00\,\mathrm{eV})}/\hbar = \sqrt{2(9.109\times10^{-31})(8.011\times10^{-19})}/(1.0546\times10^{-34}) = 1.146\times10^{10}\,\mathrm{m^{-1}}$, so $1/\kappa = 0.0873\,\mathrm{nm}$. The density falls by $e^{-2}$ over that distance. An electron in a metal at a few electronvolts below the vacuum level leaks less than an ångström out of the surface, which is the starting point for the microscope of the next section.
:::
:::

::: remark Why a sharp step reflects
The partial reflection of [[#ex-step]] has no classical counterpart, but it is familiar from waves of every kind: light is partly reflected at the surface of glass, sound at a change of medium, a wave on a string at a knot joining two different strings ([[oscillations/travelling-waves]]). What matters is how abruptly the medium changes compared with the wavelength. If the potential rises from $0$ to $V_0$ over a distance $d$, the reflection coefficient falls off exponentially in $kd$ once $d$ exceeds the wavelength, because each part of the gradual rise reflects a little and the reflections cancel by interference. The idealised sharp step is the worst case. Real potentials at metal surfaces and semiconductor interfaces change over a few ångströms, comparable to electron wavelengths, which is why quantum reflection is significant there and invisible for a ball rolling up a ramp.
:::

::: warning Forgetting the velocity factor
A common error is to write $T = \abs F^2/\abs A^2$ for the step. With $E = 2V_0$ that gives $\abs{F/A}^2 = \bigl(2/(1.7071)\bigr)^2 = 1.373$, a "transmission probability" greater than one. The amplitude of the transmitted wave can exceed the incident amplitude, because the transmitted particles move more slowly and so pile up at a higher density for the same current. Probabilities are ratios of currents, $T = (k'/k)\abs{F/A}^2 = 0.7071\times1.373 = 0.971$, and only with that factor does $R + T = 1$.
:::

## Tunnelling through a barrier {#barrier}

Now let the step have finite width:

$$
V(x) = \begin{cases} V_0, & 0 < x < L, \\ 0, & \text{otherwise}. \end{cases}
$$

A classical particle with $E < V_0$ is always reflected. A quantum particle penetrates the barrier, its wavefunction decaying exponentially across it, and if $L$ is not too large an exponentially small but non-zero wave emerges on the far side. This is **tunnelling**.

::: theorem Transmission through a rectangular barrier {#thm-barrier}
For $0 < E < V_0$, with $\kappa = \sqrt{2m(V_0 - E)}/\hbar$,

$$
T = \left[1 + \frac{V_0^2\sinh^2(\kappa L)}{4E(V_0 - E)}\right]^{-1}.
$$ {#eq-barrier}

For $E > V_0$ the same formula holds with $\sinh(\kappa L)$ replaced by $\sin(k'L)$ and $V_0 - E$ by $E - V_0$, where $k' = \sqrt{2m(E-V_0)}/\hbar$. When $\kappa L \gg 1$,

$$
T \approx \frac{16E(V_0 - E)}{V_0^2}\,e^{-2\kappa L}.
$$ {#eq-barrier-approx}
:::

::: proof
With $k = \sqrt{2mE}/\hbar$, write $\psi = e^{ikx} + re^{-ikx}$ for $x < 0$, $\psi = Ce^{\kappa x} + De^{-\kappa x}$ for $0 < x < L$ and $\psi = te^{ikx}$ for $x > L$. The same $k$ appears on both sides, so $T = \abs t^2$. Continuity of $\psi$ and $\psi'$ at $x = L$ gives

$$
Ce^{\kappa L} + De^{-\kappa L} = te^{ikL}, \qquad \kappa\bigl(Ce^{\kappa L} - De^{-\kappa L}\bigr) = ikte^{ikL},
$$

so, with $\tau = te^{ikL}/2$,

$$
C = \tau\left(1 + \frac{ik}{\kappa}\right)e^{-\kappa L}, \qquad D = \tau\left(1 - \frac{ik}{\kappa}\right)e^{\kappa L}.
$$

At $x = 0$, the two conditions are $1 + r = C + D$ and $ik(1 - r) = \kappa(C - D)$. Dividing the second by $ik$ and adding to the first eliminates $r$:

$$
2 = C\left(1 + \frac{\kappa}{ik}\right) + D\left(1 - \frac{\kappa}{ik}\right).
$$

Substituting $C$ and $D$ and using $(1 \pm ik/\kappa)(1 \pm \kappa/ik) = 2 \pm i(k/\kappa - \kappa/k)$,

$$
2 = \tau\Bigl[4\cosh\kappa L - 2i\left(\frac k\kappa - \frac\kappa k\right)\sinh\kappa L\Bigr], \qquad te^{ikL} = \frac{1}{\cosh\kappa L + i\,\dfrac{\kappa^2 - k^2}{2k\kappa}\sinh\kappa L}.
$$

Taking the squared modulus and using $\cosh^2 = 1 + \sinh^2$,

$$
T = \abs t^2 = \left[1 + \left(1 + \frac{(\kappa^2 - k^2)^2}{4k^2\kappa^2}\right)\sinh^2\kappa L\right]^{-1} = \left[1 + \frac{(k^2 + \kappa^2)^2}{4k^2\kappa^2}\sinh^2\kappa L\right]^{-1}.
$$

Finally $k^2 + \kappa^2 = 2mV_0/\hbar^2$ and $k^2\kappa^2 = (2m/\hbar^2)^2E(V_0 - E)$, which gives [[#eq-barrier]]. The case $E > V_0$ is the same calculation with $\kappa = ik'$, under which $\sinh\kappa L \to i\sin k'L$ and $\kappa^2 \to -k'^2$. For $\kappa L \gg 1$, $\sinh\kappa L \approx \frac12e^{\kappa L}$, the $1$ in the bracket is negligible, and [[#eq-barrier-approx]] follows.
:::

The exponential $e^{-2\kappa L}$ dominates everything. Doubling the width squares the (already small) transmission, roughly speaking, and the dependence on mass through $\kappa \propto \sqrt m$ is equally brutal. Above the barrier, $E > V_0$, the transmission is not $1$ in general, and reaches $1$ exactly when $\sin k'L = 0$, i.e. when a whole number of half-wavelengths fits across the barrier. These **transmission resonances** come from destructive interference between the waves reflected at the two edges, as in an anti-reflection coating.

::: example Tunnelling of an electron {#ex-tunnel}
An electron with $E = 1.00\,\mathrm{eV}$ meets a barrier of height $V_0 = 2.00\,\mathrm{eV}$. Find $T$ for widths $L = 0.500\,\mathrm{nm}$ and $1.00\,\mathrm{nm}$, compare with the approximation [[#eq-barrier-approx]], and find $T$ for a proton with the same energy and barrier at $L = 0.500\,\mathrm{nm}$.
::: solution
$\kappa = \sqrt{2m_e(1.00\,\mathrm{eV})}/\hbar = 5.123\times10^{9}\,\mathrm{m^{-1}}$, so $\kappa L = 2.562$ for $L = 0.500\,\mathrm{nm}$. The prefactor is $V_0^2/4E(V_0 - E) = 4/4 = 1$, and

$$
T = \frac{1}{1 + \sinh^2(2.562)} = \frac{1}{1 + (6.440)^2} = \frac{1}{42.47} = 0.0235.
$$

The approximation gives $16(1)(1)/4\cdot e^{-5.123} = 4\times0.005956 = 0.0238$, within $1.2\%$. For $L = 1.00\,\mathrm{nm}$, $\kappa L = 5.123$ and $T = 1/(1 + \sinh^2 5.123) = 1.419\times10^{-4}$; the approximation agrees to four figures. Doubling the width reduced $T$ by a factor of $166$.

For a proton, $\kappa$ is larger by $\sqrt{m_p/m_e} = 42.85$, so $\kappa L = 109.8$ and $T \approx 4e^{-219.5} \approx 2\times10^{-95}$. Protons do not tunnel through atomic-scale barriers at electronvolt energies; electrons do so routinely.
:::
:::

::: widget plot
f: if(x < 1, 1/(1 + sinh(g*sqrt(1 - x))^2/(4*x*(1 - x))), 1/(1 + sin(g*sqrt(x - 1))^2/(4*x*(x - 1))))
x: 0.01, 4
y: 0, 1.05
sliders: g=3.62:0.5:12:0.02
caption: Transmission $T$ through a rectangular barrier against $E/V_0$, with $g = L\sqrt{2mV_0}/\hbar$ on the slider. At $g = 3.62$ (the $0.5\,\mathrm{nm}$ electron of the worked example) read $T \approx 0.024$ at $E/V_0 = 0.5$. Increase $g$: the tunnelling region collapses exponentially. Above $E = V_0$, look for the resonances where $T = 1$, and notice that $T$ is not $1$ in between, although a classical particle would always pass.
:::

::: application Tunnelling at work
In the **scanning tunnelling microscope** of Gerd Binnig and Heinrich Rohrer (1981, Nobel Prize 1986) a sharp metal tip is held a few tenths of a nanometre above a conducting surface, and electrons tunnel across the vacuum gap. The barrier height is roughly the work function, about $4.5\,\mathrm{eV}$, so $\kappa = \sqrt{2m_e(4.5\,\mathrm{eV})}/\hbar = 10.9\,\mathrm{nm^{-1}}$, and by [[#eq-barrier-approx]] the current changes by $e^{2\kappa\cdot0.1\,\mathrm{nm}} = 8.8$ when the gap changes by $0.1\,\mathrm{nm}$. Holding the current constant while scanning maps the surface to a hundredth of a nanometre, enough to see individual atoms. The same exponential sensitivity governs **alpha decay**: George Gamow, and independently Ronald Gurney and Edward Condon, explained in 1928 why half-lives range from microseconds to billions of years while alpha energies vary only between about $4$ and $9\,\mathrm{MeV}$. Tunnelling also underlies field emission, the Josephson junction and the flash memory in your phone.
:::

::: history Square wells and tunnelling
Wells with hard walls were among the first problems solved after Schrödinger's 1926 papers. Friedrich Hund used tunnelling between two wells to explain molecular spectra in 1927, and Lothar Nordheim, with Ralph Fowler in 1928, explained the field emission of electrons from cold metals by tunnelling through the surface barrier. Gamow's theory of alpha decay appeared in *Zeitschrift für Physik* in 1928, and Gurney and Condon's in *Nature* the same year. Leo Esaki observed tunnelling in heavily doped semiconductor junctions in 1957, and Ivar Giaever tunnelling between superconductors in 1960; they shared the 1973 Nobel Prize with Brian Josephson.
:::

## Where this leads {#leads}

The finite well with a smooth bottom becomes the harmonic oscillator of [[quantum-1/harmonic-oscillator]], where the matching problem is replaced by the condition that a power series terminate. The radial equation of the hydrogen atom in [[quantum-1/hydrogen]] is a one-dimensional problem on $r > 0$ with the condition $u(0) = 0$, exactly like one wall of the infinite well. Barriers that are not rectangular are handled approximately by the WKB method, in which $\kappa L$ becomes $\int\kappa(x)\,\dd x$, and periodic arrays of wells produce the energy bands of [[condensed-matter]]. The Chemistry Atlas applies the particle in a box to conjugated molecules in [model systems](/learn/chemistry/lesson.php?c=quantum-chemistry&l=model-systems).

::: summary
- On intervals of constant $V$ the solutions are $e^{\pm ikx}$ (allowed region) or $e^{\pm\kappa x}$ (forbidden region); $\psi$ and $\psi'$ are continuous at finite jumps, and $\psi = 0$ at infinite walls.
- Infinite well of width $a$: $\psi_n = \sqrt{2/a}\sin(n\pi x/a)$, $E_n = n^2\pi^2\hbar^2/2ma^2$, orthonormal and complete; the ground state has non-zero energy and the $n$th state $n - 1$ nodes.
- Finite well of width $2a$, depth $V_0$: with $z_0 = a\sqrt{2mV_0}/\hbar$, even states solve $\tan z = \sqrt{z_0^2/z^2 - 1}$ and odd states $-\cot z = \sqrt{z_0^2/z^2-1}$; there are $\lceil 2z_0/\pi\rceil \ge 1$ bound states, all lower than in the infinite well of the same width.
- $R$ and $T$ are ratios of probability currents, and $R + T = 1$. A step with $E > V_0$ reflects $R = \bigl((k - k')/(k + k')\bigr)^2$; with $E < V_0$ it reflects totally but the wave penetrates a depth $1/\kappa$.
- A barrier transmits $T = [1 + V_0^2\sinh^2\kappa L/4E(V_0-E)]^{-1} \approx 16E(V_0-E)V_0^{-2}e^{-2\kappa L}$; the exponential sensitivity to $L$ and $m$ is the basis of the STM and of alpha decay.
- Above a barrier $T < 1$ except at resonances $k'L = n\pi$.
:::

## Exercises {#exercises}

::: exercise Ground state of a 0.1 nm box {level=1 check="37.6"}
Find the ground-state energy, in eV, of an electron in an infinite well of width $0.100\,\mathrm{nm}$.
::: solution
$E_1 \propto 1/a^2$, and for $a = 1.00\,\mathrm{nm}$ it was $0.376\,\mathrm{eV}$ ([[#ex-box]]). Reducing $a$ by a factor $10$ multiplies $E_1$ by $100$: $E_1 = 37.6\,\mathrm{eV}$. That is larger than the binding energy of hydrogen, which is consistent: an atom-sized box costs tens of electronvolts of kinetic energy, and the Coulomb attraction pays for it.
:::
:::

::: exercise Probability in the middle third {level=1 check="1/3 + sqrt(3)/(2*pi)"}
A particle is in the ground state of an infinite well of width $a$. Find the probability that it is found in the middle third, $a/3 < x < 2a/3$.
::: solution
$$
P = \frac2a\int_{a/3}^{2a/3}\sin^2\frac{\pi x}{a}\,\dd x = \frac1a\int_{a/3}^{2a/3}\left(1 - \cos\frac{2\pi x}{a}\right)\dd x = \frac13 - \frac{1}{2\pi}\left[\sin\frac{2\pi x}{a}\right]_{a/3}^{2a/3}.
$$

The bracket is $\sin(4\pi/3) - \sin(2\pi/3) = -\sqrt3$, so $P = \frac13 + \frac{\sqrt3}{2\pi} = 0.609$. A classical particle bouncing at constant speed would give $1/3$.
:::
:::

::: exercise A step down {level=1 check="1/9"}
Particles with energy $E$ approach, from the left, a step *down* of depth $V_0 = 3E$, i.e. $V = 0$ for $x < 0$ and $V = -3E$ for $x > 0$. Find the reflection coefficient.
::: solution
On the right the kinetic energy is $E + 3E = 4E$, so $k'/k = \sqrt{4E/E} = 2$. Then $R = \bigl((1 - 2)/(1 + 2)\bigr)^2 = 1/9$, and $T = 4\cdot2/9 = 8/9$. A classical particle would never be reflected by falling off a cliff; the quantum particle is reflected one time in nine, if the cliff is sharp on the scale of the wavelength.
:::
:::

::: exercise Shallow well {level=2 check="0.739"}
A finite well has $z_0 = 1$. Show that it has exactly one bound state, and that its $z$ satisfies $\cos z = z$. Find $z$ to three decimal places.
::: hint
Square [[#eq-even]] and use $1 + \tan^2 z = 1/\cos^2 z$.
:::
::: solution
Since $2z_0/\pi = 0.637 < 1$, [[#thm-finite-well]] gives one bound state, even. From $\tan^2 z = z_0^2/z^2 - 1$ we get $1/\cos^2 z = z_0^2/z^2$, so $\cos z = z/z_0$ (positive, since $0 < z < \pi/2$). With $z_0 = 1$, $\cos z = z$. Iterating $z \mapsto \cos z$ from $z = 0.7$ (or bisecting) converges to $z = 0.7391$, so $z = 0.739$. The binding energy is $-E = (\hbar^2/2ma^2)(z_0^2 - z^2) = 0.454\,\hbar^2/2ma^2$, and $\kappa a = \sqrt{1 - 0.546} = 0.674$.
:::
:::

::: exercise Counting levels {level=2 check="3"}
A neutron moves in a one-dimensional model nucleus: a finite well of depth $40.0\,\mathrm{MeV}$ and width $2a = 6.00\,\mathrm{fm}$. How many bound states does it have?
::: solution
$z_0 = a\sqrt{2m_nV_0}/\hbar$ with $a = 3.00\times10^{-15}\,\mathrm{m}$, $m_n = 1.67493\times10^{-27}\,\mathrm{kg}$ and $V_0 = 40.0\times1.602177\times10^{-13}\,\mathrm{J} = 6.40871\times10^{-12}\,\mathrm{J}$:

$$
z_0 = \frac{(3.00\times10^{-15})\sqrt{2(1.67493\times10^{-27})(6.40871\times10^{-12})}}{1.054572\times10^{-34}} = 4.17.
$$

Then $2z_0/\pi = 2.65$, so by [[#thm-finite-well]] the number of bound states is $\lceil 2.65\rceil = 3$: two even and one odd. Nuclear wells are deep and narrow in just the proportions that give a handful of levels, as here.
:::
:::

::: exercise Resonant transmission {level=2 check="18"}
An electron passes over a rectangular barrier of height $V_0 = 2.00\,\mathrm{eV}$ and width $L$. At $E = 6.00\,\mathrm{eV}$ the transmission is perfect, and this is the lowest energy above the barrier at which $T = 1$. Find the next energy, in eV, at which $T = 1$, and the width $L$.
::: solution
$T = 1$ when $\sin k'L = 0$, i.e. $k'L = n\pi$. Since $E - V_0 = \hbar^2k'^2/2m \propto n^2$, the resonances are at $E_n - V_0 = n^2(E_1 - V_0)$ with $E_1 - V_0 = 4.00\,\mathrm{eV}$. The next is $n = 2$: $E = 2.00 + 4(4.00) = 18.0\,\mathrm{eV}$. The width follows from $k'L = \pi$: $k' = \sqrt{2m_e(4.00\,\mathrm{eV})}/\hbar = 1.025\times10^{10}\,\mathrm{m^{-1}}$, so $L = 0.307\,\mathrm{nm}$.
:::
:::

::: exercise The thin-barrier limit {level=3}
Take the rectangular barrier with $V_0L = \alpha$ fixed while $L \to 0$ and $V_0 \to \infty$, the delta-function barrier $V = \alpha\,\delta(x)$. Show from [[#eq-barrier]] that $T \to \bigl(1 + m\alpha^2/2\hbar^2E\bigr)^{-1}$.
::: solution
As $L \to 0$ with $V_0L = \alpha$, $\kappa L = L\sqrt{2m(V_0 - E)}/\hbar \approx \sqrt{2mV_0L^2}/\hbar = \sqrt{2m\alpha L}/\hbar \to 0$. So $\sinh\kappa L \approx \kappa L$, and

$$
\frac{V_0^2\sinh^2\kappa L}{4E(V_0-E)} \approx \frac{V_0^2\kappa^2L^2}{4E(V_0 - E)} = \frac{V_0^2L^2}{4E(V_0 - E)}\cdot\frac{2m(V_0 - E)}{\hbar^2} = \frac{m(V_0L)^2}{2\hbar^2E} = \frac{m\alpha^2}{2\hbar^2E}.
$$

Hence $T \to (1 + m\alpha^2/2\hbar^2E)^{-1}$. High-energy particles pass almost freely; low-energy particles are almost totally reflected. The same result follows from solving the delta barrier directly, using the jump condition $\psi'(0^+) - \psi'(0^-) = (2m\alpha/\hbar^2)\psi(0)$.
:::
:::

::: exercise Every finite-well level lies below the infinite-well level {level=3}
Prove that the roots of [[#eq-even]] and [[#eq-odd]] satisfy $z_n < n\pi/2$ for the $n$th bound state ($n = 1, 2, \ldots$), and deduce that $E_n + V_0$ is less than the $n$th energy of an infinite well of width $2a$.
::: solution
From the proof of [[#thm-finite-well]], the $n$th state (counting even and odd together from the bottom) has its root in the open interval $\bigl((n-1)\pi/2, n\pi/2\bigr)$: for odd $n = 2j + 1$ the even root lies in $(j\pi, j\pi + \pi/2)$, and for even $n = 2j + 2$ the odd root lies in $(j\pi + \pi/2, (j+1)\pi)$. In both cases $z_n < n\pi/2$; the endpoint is excluded because the right-hand side $\sqrt{z_0^2/z^2 - 1}$ is finite for $z > 0$, while $\tan z$ (respectively $-\cot z$) is infinite at $z = n\pi/2$. Then

$$
E_n + V_0 = \frac{\hbar^2z_n^2}{2ma^2} < \frac{\hbar^2}{2ma^2}\cdot\frac{n^2\pi^2}{4} = \frac{n^2\pi^2\hbar^2}{2m(2a)^2},
$$

which is the $n$th level of an infinite well of width $2a$ (with its floor at $-V_0$).
:::
:::
