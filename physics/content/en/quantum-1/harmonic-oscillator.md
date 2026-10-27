Near the bottom of almost any potential well, the potential is a parabola. Expand a smooth $V(x)$ about a minimum at $x_0$: the constant term shifts all energies, the linear term vanishes because $V'(x_0) = 0$, and what remains to second order is $\frac12V''(x_0)(x - x_0)^2$. That is why the harmonic oscillator is everywhere in physics: atoms vibrating in a molecule or a crystal, the modes of the electromagnetic field, small oscillations of anything about equilibrium. Classically it is the subject of [[oscillations/simple-harmonic]]. Quantum mechanically it is the second exactly solvable bound-state problem, after the square wells of [[quantum-1/piecewise-potentials]], and it is solvable in a far more elegant way.

The quantum oscillator has the Hamiltonian

$$
\hat H = \frac{\hat p^2}{2m} + \frac12m\omega^2\hat x^2,
$$ {#eq-ho-hamiltonian}

where $\omega = \sqrt{k/m}$ is the classical angular frequency. We will find its spectrum twice. First by **ladder operators**, a purely algebraic method due in this form to Dirac, which produces the energies $E_n = (n + \frac12)\hbar\omega$ and all the eigenfunctions without solving a second-order differential equation. Then by the **power-series method**, which shows where Hermite polynomials come from and exactly how quantisation arises from normalisability. We then compute expectation values, compare the quantum and classical oscillators, and apply the results to the vibration of a molecule.

Notice the result before we derive it. Planck's oscillators of [[quantum-1/origins]] had energies $nh\nu = n\hbar\omega$. Quantum mechanics gives the same equal spacing $\hbar\omega$, which is why Planck's black-body law survives, plus a **zero-point energy** $\frac12\hbar\omega$ that Planck did not have.

## Why the oscillator is everywhere {#why}

Before the algebra, it is worth seeing how good the parabolic approximation is in a real case and how big the quantum numbers are in a classical one. A smooth potential $V(x)$ with a minimum at $x_0$ has the Taylor expansion

$$
V(x) = V(x_0) + \frac12V''(x_0)(x - x_0)^2 + \frac16V'''(x_0)(x - x_0)^3 + \cdots
$$

so it behaves like an oscillator with $m\omega^2 = V''(x_0)$ as long as the cubic and higher terms are small over the region the particle actually explores. In quantum mechanics that region is set not by an amplitude you choose but by the width of the wavefunction, which for the low levels is of order the **oscillator length** $\sqrt{\hbar/m\omega}$. The harmonic approximation is therefore good for the lowest states whenever the potential changes its curvature only over distances much longer than $\sqrt{\hbar/m\omega}$, and it gets worse as $n$ grows and the wavefunction spreads.

::: example How harmonic is a chemical bond? {#ex-morse}
A widely used model of a diatomic bond is the Morse potential $V(r) = D\bigl(1 - e^{-\beta(r - r_e)}\bigr)^2$, where $D$ is the depth of the well and $r_e$ the equilibrium separation. Find the force constant in terms of $D$ and $\beta$. For HCl, $D = 4.62\,\mathrm{eV}$ and the force constant (from [[#ex-hcl]] below) is $481\,\mathrm{N/m}$; find $\beta$, and estimate how many vibrational levels the well holds if they were spaced by $\hbar\omega = 0.358\,\mathrm{eV}$.
::: solution
Put $y = r - r_e$. Then $1 - e^{-\beta y} = \beta y - \frac12\beta^2y^2 + \cdots$, so

$$
V = D\left(\beta y - \tfrac12\beta^2y^2 + \cdots\right)^2 = D\beta^2y^2 - D\beta^3y^3 + \cdots
$$

and the force constant is $k = V''(r_e) = 2D\beta^2$. Solving for $\beta$ with $D = 4.62\times1.602\times10^{-19}\,\mathrm J = 7.40\times10^{-19}\,\mathrm J$:

$$
\beta = \sqrt{\frac{k}{2D}} = \sqrt{\frac{481}{2(7.40\times10^{-19})}} = 1.80\times10^{10}\,\mathrm{m^{-1}},
$$

so the potential changes character over $1/\beta = 0.055\,\mathrm{nm}$, five times the oscillator length of HCl ($0.011\,\mathrm{nm}$). The lowest levels are nearly harmonic. The cubic term, $-D\beta^3y^3$, softens the well on the stretched side, so the levels crowd together as $n$ rises. Dividing the depth by the spacing gives $D/\hbar\omega = 4.62/0.358 \approx 13$; the exact Morse spectrum, which is known in closed form, turns out to hold about twice that many levels, because the spacing shrinks toward zero at the dissociation limit. Either way, the harmonic oscillator describes the first few levels well and the top of the well badly.
:::
:::

The opposite question is why nobody sees the quantisation of a pendulum. Take a mass of $0.100\,\mathrm{kg}$ on a spring with $\omega = 10.0\,\mathrm{s^{-1}}$, oscillating with an amplitude of $1.00\,\mathrm{cm}$. Its energy is $\frac12m\omega^2A^2 = 5.0\times10^{-4}\,\mathrm J$, while $\hbar\omega = 1.05\times10^{-33}\,\mathrm J$. The quantum number is $n \approx E/\hbar\omega = 4.7\times10^{29}$, and adding one quantum changes the energy by one part in $10^{29}$. The oscillator length $\sqrt{\hbar/m\omega} = 1.0\times10^{-17}\,\mathrm m$ is a hundredth of a proton radius. Quantisation is there, but no experiment on a spring can resolve it; that is the correspondence principle in numbers.

## Ladder operators {#ladder}

The Hamiltonian is a sum of two squares, $\frac{1}{2m}\bigl(\hat p^2 + (m\omega\hat x)^2\bigr)$. For numbers, $u^2 + v^2 = (v - iu)(v + iu)$. For operators the factorisation fails by a commutator, and the commutator is exactly what makes the method work.

::: definition Commutator, and the ladder operators {#def-ladder}
The **commutator** of two operators is $[\hat A, \hat B] = \hat A\hat B - \hat B\hat A$. For the oscillator, define the **lowering** and **raising operators**

$$
\hat a = \frac{1}{\sqrt{2\hbar m\omega}}\bigl(m\omega\hat x + i\hat p\bigr), \qquad \hat a^\dagger = \frac{1}{\sqrt{2\hbar m\omega}}\bigl(m\omega\hat x - i\hat p\bigr),
$$ {#eq-ladder}

and the **number operator** $\hat N = \hat a^\dagger\hat a$.
:::

The basic commutator is $[\hat x, \hat p] = i\hbar$. To see it, apply both orders to a test function $f$: $\hat x\hat pf = -i\hbar xf'$, while $\hat p\hat xf = -i\hbar(xf)' = -i\hbar(f + xf')$. The difference is $i\hbar f$. This **canonical commutation relation** is, in a sense made precise in [[quantum-1/formalism]], the whole of quantum kinematics.

::: lemma Algebra of the ladder operators {#lem-ladder}
The operators of [[#eq-ladder]] satisfy

$$
[\hat a, \hat a^\dagger] = 1, \qquad \hat H = \hbar\omega\left(\hat a^\dagger\hat a + \frac12\right) = \hbar\omega\left(\hat N + \frac12\right),
$$ {#eq-h-ladder}

$$
[\hat N, \hat a] = -\hat a, \qquad [\hat N, \hat a^\dagger] = \hat a^\dagger.
$$ {#eq-n-comm}

Moreover $\hat a^\dagger$ is the **adjoint** of $\hat a$: $\int f^*(\hat ag)\,\dd x = \int(\hat a^\dagger f)^*g\,\dd x$ for all normalisable $f$, $g$.
:::

::: proof
Multiply out, keeping the order of $\hat x$ and $\hat p$:

$$
\hat a\hat a^\dagger = \frac{1}{2\hbar m\omega}\Bigl(m^2\omega^2\hat x^2 + \hat p^2 - im\omega\hat x\hat p + im\omega\hat p\hat x\Bigr) = \frac{1}{2\hbar m\omega}\Bigl(\hat p^2 + m^2\omega^2\hat x^2\Bigr) - \frac{i}{2\hbar}[\hat x, \hat p].
$$

With $[\hat x, \hat p] = i\hbar$ the last term is $+\frac12$, so $\hat a\hat a^\dagger = \hat H/\hbar\omega + \frac12$. The same computation with the signs of the cross terms reversed gives $\hat a^\dagger\hat a = \hat H/\hbar\omega - \frac12$. Subtracting, $[\hat a, \hat a^\dagger] = 1$; the second equation is [[#eq-h-ladder]]. For [[#eq-n-comm]], use $[\hat A\hat B, \hat C] = \hat A[\hat B, \hat C] + [\hat A, \hat C]\hat B$:

$$
[\hat a^\dagger\hat a, \hat a] = \hat a^\dagger[\hat a, \hat a] + [\hat a^\dagger, \hat a]\hat a = 0 - \hat a, \qquad [\hat a^\dagger\hat a, \hat a^\dagger] = \hat a^\dagger[\hat a, \hat a^\dagger] = \hat a^\dagger.
$$

For the adjoint, $\int f^*xg\,\dd x = \int(xf)^*g\,\dd x$ because $x$ is real, and $\int f^*(-i\hbar g')\,\dd x = \int(-i\hbar f')^*g\,\dd x$ by one integration by parts (the boundary term vanishes for normalisable functions), so $(i\hat p)$ has adjoint $-i\hat p$. Hence $m\omega\hat x + i\hat p$ has adjoint $m\omega\hat x - i\hat p$.
:::

::: theorem Spectrum of the harmonic oscillator {#thm-ho-spectrum}
The energy eigenvalues of [[#eq-ho-hamiltonian]] are

$$
E_n = \left(n + \frac12\right)\hbar\omega, \qquad n = 0, 1, 2, \ldots
$$ {#eq-ho-energy}

The ground state is the normalised Gaussian

$$
\psi_0(x) = \left(\frac{m\omega}{\pi\hbar}\right)^{1/4}e^{-m\omega x^2/2\hbar},
$$ {#eq-ground}

and the normalised excited states are $\psi_n = (\hat a^\dagger)^n\psi_0/\sqrt{n!}$, with

$$
\hat a^\dagger\psi_n = \sqrt{n+1}\,\psi_{n+1}, \qquad \hat a\psi_n = \sqrt n\,\psi_{n-1}.
$$ {#eq-ladder-action}
:::

::: proof
*Ladders.* Suppose $\hat H\psi = E\psi$. By [[#eq-n-comm]], $\hat H\hat a = \hat a\hat H - \hbar\omega\hat a$, so

$$
\hat H(\hat a\psi) = \hat a\hat H\psi - \hbar\omega\hat a\psi = (E - \hbar\omega)(\hat a\psi),
$$

and likewise $\hat H(\hat a^\dagger\psi) = (E + \hbar\omega)(\hat a^\dagger\psi)$. So $\hat a\psi$ is either zero or an eigenfunction with energy lowered by $\hbar\omega$, and $\hat a^\dagger\psi$ an eigenfunction with energy raised by $\hbar\omega$.

*The bottom rung.* For any normalisable $\psi$, by the adjoint property,

$$
\int\psi^*\hat H\psi\,\dd x = \hbar\omega\int\abs{\hat a\psi}^2\,\dd x + \frac{\hbar\omega}{2}\int\abs\psi^2\,\dd x \ge \frac{\hbar\omega}{2}\int\abs\psi^2\,\dd x.
$$

So every energy is at least $\frac12\hbar\omega$. Repeated lowering subtracts $\hbar\omega$ each time and would eventually go below that bound, so for some eigenfunction the sequence must stop: there is a $\psi_0 \ne 0$ with $\hat a\psi_0 = 0$. Then $\hat H\psi_0 = \hbar\omega(\hat a^\dagger\hat a + \frac12)\psi_0 = \frac12\hbar\omega\,\psi_0$.

*The ground state.* Written out, $\hat a\psi_0 = 0$ is the first-order equation

$$
m\omega x\psi_0 + \hbar\deriv{\psi_0}{x} = 0, \qquad\text{so}\qquad \psi_0 = Ae^{-m\omega x^2/2\hbar}.
$$

This is the only solution, up to normalisation, so the bottom rung is unique. Normalising with $\int e^{-m\omega x^2/\hbar}\,\dd x = \sqrt{\pi\hbar/m\omega}$ gives [[#eq-ground]].

*All the rungs.* Applying $\hat a^\dagger$ repeatedly produces eigenfunctions with energies $(n + \frac12)\hbar\omega$; none of them vanishes, because $\int\abs{\hat a^\dagger\psi}^2 = \int\psi^*\hat a\hat a^\dagger\psi = \int\psi^*(\hat N + 1)\psi > 0$. There are no other eigenvalues: any eigenfunction, lowered enough times, must reach a function annihilated by $\hat a$, which is $\psi_0$; so its energy is $\frac12\hbar\omega$ plus a whole number of $\hbar\omega$.

*Normalisation.* If $\psi_n$ is normalised, $\hat N\psi_n = n\psi_n$ and $\int\abs{\hat a^\dagger\psi_n}^2 = \int\psi_n^*(\hat N + 1)\psi_n = n + 1$, so $\hat a^\dagger\psi_n = \sqrt{n+1}\,\psi_{n+1}$ with $\psi_{n+1}$ normalised (choosing the phase real and positive). Similarly $\int\abs{\hat a\psi_n}^2 = n$ gives $\hat a\psi_n = \sqrt n\,\psi_{n-1}$. Iterating the first relation gives $\psi_n = (\hat a^\dagger)^n\psi_0/\sqrt{n!}$.
:::

The proof never solved a second-order differential equation, and it used only $[\hat x, \hat p] = i\hbar$ and the form of $\hat H$. The same algebra describes any system whose Hamiltonian is a sum of oscillators: the modes of the electromagnetic field, where $\hat a^\dagger$ creates a photon, and the vibrations of a crystal, where it creates a phonon. In those settings $\hat a$ and $\hat a^\dagger$ are called annihilation and creation operators, and $n$ counts quanta.

::: warning The zero-point energy is not optional
It is tempting to write $E_n = n\hbar\omega$, as Planck did, or to think the ground state is "the particle at rest at the bottom". It is not. A particle sitting at $x = 0$ with $p = 0$ would have $\Delta x = \Delta p = 0$, which the uncertainty principle forbids. The ground state compromises: $\Delta x\,\Delta p = \hbar/2$ exactly ([[#ex-moments]]), and the energy $\frac12\hbar\omega$ is the least the compromise allows. Zero-point motion is measurable. It shifts molecular vibrational levels in a way that depends on isotopic mass, it keeps helium liquid at atmospheric pressure down to absolute zero, and it is why energy differences, not energies, are what photons carry away.
:::

## Wavefunctions and Hermite polynomials {#hermite}

It is convenient to measure length in units of the oscillator length $\sqrt{\hbar/m\omega}$, the scale on which $\psi_0$ falls off. Put

$$
\xi = \sqrt{\frac{m\omega}{\hbar}}\,x, \qquad\text{so that}\qquad \hat a^\dagger = \frac{1}{\sqrt2}\left(\xi - \deriv{}{\xi}\right), \quad \hat a = \frac{1}{\sqrt2}\left(\xi + \deriv{}{\xi}\right).
$$

Then $\psi_0 \propto e^{-\xi^2/2}$, and each application of $\hat a^\dagger$ multiplies the polynomial in front of the Gaussian by $2\xi$ and differentiates: $\bigl(\xi - \dd/\dd\xi\bigr)\bigl(h(\xi)e^{-\xi^2/2}\bigr) = \bigl(2\xi h - h'\bigr)e^{-\xi^2/2}$. Starting from $h = 1$ this produces $2\xi$, then $4\xi^2 - 2$, then $8\xi^3 - 12\xi$, then $16\xi^4 - 48\xi^2 + 12$ (each up to a factor of $\sqrt2$ that the normalisation absorbs). These are the **Hermite polynomials** $H_n(\xi)$.

::: definition Hermite polynomials and oscillator eigenfunctions {#def-hermite}
The **Hermite polynomials** are defined by $H_0 = 1$ and $H_{n+1}(\xi) = 2\xi H_n(\xi) - H_n'(\xi)$; equivalently by $H_{n+1} = 2\xi H_n - 2nH_{n-1}$. The normalised oscillator eigenfunctions are

$$
\psi_n(x) = \left(\frac{m\omega}{\pi\hbar}\right)^{1/4}\frac{1}{\sqrt{2^nn!}}\,H_n(\xi)\,e^{-\xi^2/2}, \qquad \xi = \sqrt{\frac{m\omega}{\hbar}}\,x.
$$ {#eq-psi-n}
:::

The first few are $H_0 = 1$, $H_1 = 2\xi$, $H_2 = 4\xi^2 - 2$, $H_3 = 8\xi^3 - 12\xi$, $H_4 = 16\xi^4 - 48\xi^2 + 12$. $H_n$ has degree $n$, has $n$ real zeros, and has the parity of $n$, so $\psi_n$ is even for even $n$ and odd for odd $n$, as [[quantum-1/piecewise-potentials#thm-nondegenerate]] requires for an even potential.

::: widget plot
f: x^2/2; 0.5 + exp(-x^2)/sqrt(pi); 1.5 + 2*x^2*exp(-x^2)/sqrt(pi); 2.5 + (2*x^2 - 1)^2*exp(-x^2)/(2*sqrt(pi)); 3.5 + (2*x^3 - 3*x)^2*exp(-x^2)/(3*sqrt(pi))
x: -4, 4
y: 0, 4.5
labels: V; n = 0; n = 1; n = 2; n = 3
caption: The potential $\frac12\xi^2$ and the densities $\abs{\psi_n}^2$ for $n = 0$ to $3$, each drawn on the line of its energy $n + \frac12$ (units $\hbar = m = \omega = 1$). Each density spills beyond the parabola, into the classically forbidden region. Count the nodes and see that the levels are equally spaced, unlike those of the square well.
:::

### The power-series method

The ladder method found the eigenfunctions but did not show why other energies fail. The analytic method does. In terms of $\xi$ and $K = 2E/\hbar\omega$, the time-independent equation becomes

$$
\deriv{^2\psi}{\xi^2} = (\xi^2 - K)\psi.
$$

For large $\abs\xi$ the $K$ is negligible, and $e^{\pm\xi^2/2}$ solve the equation to leading order. Peel off the decaying behaviour by writing $\psi = h(\xi)e^{-\xi^2/2}$. Then $h$ satisfies **Hermite's equation**

$$
h'' - 2\xi h' + (K - 1)h = 0.
$$ {#eq-hermite-ode}

Try a power series $h = \sum_j a_j\xi^j$ ([Maths Atlas: series solutions](/learn/maths/lesson.php?c=ode&l=series-solutions)). Substituting and collecting the coefficient of $\xi^j$,

$$
(j + 1)(j + 2)a_{j+2} - 2ja_j + (K - 1)a_j = 0, \qquad a_{j+2} = \frac{2j + 1 - K}{(j+1)(j+2)}\,a_j.
$$ {#eq-recursion}

The recursion links even coefficients to even and odd to odd, so there are two independent series, starting from $a_0$ and $a_1$. For large $j$, $a_{j+2}/a_j \approx 2/j$. That is the ratio for the series of $e^{\xi^2} = \sum\xi^{2k}/k!$, whose coefficients satisfy $c_{k+1}/c_k = 1/(k+1)$, that is $2/j$ with $j = 2k$. So, unless it stops, $h$ grows like $e^{\xi^2}$ and $\psi = he^{-\xi^2/2}$ grows like $e^{\xi^2/2}$, which is not normalisable. The series must terminate. It terminates at $j = n$ exactly when $K = 2n + 1$, i.e.

$$
E = \frac{K}{2}\hbar\omega = \left(n + \frac12\right)\hbar\omega,
$$

and then the other series (odd if $n$ is even, even if $n$ is odd) must be absent. This is [[#eq-ho-energy]] again, and the terminating polynomials, suitably normalised, are the $H_n$. Quantisation is a consequence of requiring the wavefunction to be normalisable, exactly as in the finite well.

::: example Constructing ψ₂ two ways {#ex-psi2}
Find $\psi_2$ by applying $\hat a^\dagger$ to $\psi_1$, and check the result against the recursion [[#eq-recursion]].
::: solution
In units $\xi$, with $\psi_0 = \pi^{-1/4}e^{-\xi^2/2}$ (normalised in $\xi$), first

$$
\psi_1 = \hat a^\dagger\psi_0 = \frac{1}{\sqrt2}\left(\xi - \deriv{}{\xi}\right)\pi^{-1/4}e^{-\xi^2/2} = \frac{1}{\sqrt2}\pi^{-1/4}(\xi + \xi)e^{-\xi^2/2} = \sqrt2\,\pi^{-1/4}\,\xi\,e^{-\xi^2/2}.
$$

Then by [[#eq-ladder-action]], $\psi_2 = \hat a^\dagger\psi_1/\sqrt2$:

$$
\psi_2 = \frac{1}{\sqrt2}\cdot\frac{1}{\sqrt2}\sqrt2\,\pi^{-1/4}\left(\xi - \deriv{}{\xi}\right)\bigl(\xi e^{-\xi^2/2}\bigr) = \frac{\pi^{-1/4}}{\sqrt2}\bigl(\xi^2 - 1 + \xi^2\bigr)e^{-\xi^2/2} = \frac{\pi^{-1/4}}{\sqrt2}(2\xi^2 - 1)e^{-\xi^2/2}.
$$

This matches [[#eq-psi-n]]: $H_2/\sqrt{2^2\cdot2!} = (4\xi^2 - 2)/\sqrt8 = (2\xi^2 - 1)/\sqrt2$. From the recursion with $K = 5$ ($n = 2$) and $a_0 = 1$: $a_2 = (0 + 1 - 5)/2 = -2$ and $a_4 = (4 + 1 - 5)/12\cdot a_2 = 0$, so $h = 1 - 2\xi^2 \propto 2\xi^2 - 1$. The node positions $\xi = \pm1/\sqrt2$ are where $\abs{\psi_2}^2$ vanishes in the figure.
:::
:::

## Expectation values and the classical limit {#expectation}

The ladder operators make expectation values almost free. Inverting [[#eq-ladder]],

$$
\hat x = \sqrt{\frac{\hbar}{2m\omega}}\bigl(\hat a + \hat a^\dagger\bigr), \qquad \hat p = i\sqrt{\frac{\hbar m\omega}{2}}\bigl(\hat a^\dagger - \hat a\bigr).
$$ {#eq-x-p-ladder}

Since $\hat a$ and $\hat a^\dagger$ change $n$ by one, and $\psi_m$, $\psi_n$ with $m \ne n$ are orthogonal (eigenfunctions with different energies; see the exercises of [[quantum-1/schrodinger-equation]]), any product of operators that does not contain equal numbers of $\hat a$ and $\hat a^\dagger$ has zero expectation value in $\psi_n$.

::: example Moments of the oscillator {#ex-moments}
Find $\langle x\rangle$, $\langle x^2\rangle$, $\langle p\rangle$, $\langle p^2\rangle$, $\Delta x\,\Delta p$, $\langle T\rangle$ and $\langle V\rangle$ in the state $\psi_n$.
::: solution
$\langle x\rangle$ and $\langle p\rangle$ each contain a single $\hat a$ or $\hat a^\dagger$, so both vanish. For $x^2$,

$$
\hat x^2 = \frac{\hbar}{2m\omega}\bigl(\hat a^2 + \hat a\hat a^\dagger + \hat a^\dagger\hat a + \hat a^{\dagger2}\bigr).
$$

The terms $\hat a^2$ and $\hat a^{\dagger2}$ change $n$ by $2$ and drop out. With $\hat a^\dagger\hat a\psi_n = n\psi_n$ and $\hat a\hat a^\dagger\psi_n = (n + 1)\psi_n$,

$$
\langle x^2\rangle = \frac{\hbar}{2m\omega}(2n + 1) = \left(n + \frac12\right)\frac{\hbar}{m\omega}.
$$

Similarly $\hat p^2 = -\frac{\hbar m\omega}{2}\bigl(\hat a^{\dagger2} - \hat a^\dagger\hat a - \hat a\hat a^\dagger + \hat a^2\bigr)$, so $\langle p^2\rangle = (n + \frac12)\hbar m\omega$. Therefore

$$
\Delta x\,\Delta p = \sqrt{\langle x^2\rangle\langle p^2\rangle} = \left(n + \frac12\right)\hbar,
$$

which is $\hbar/2$ for the ground state, the minimum allowed. Finally $\langle T\rangle = \langle p^2\rangle/2m = \frac12(n + \frac12)\hbar\omega$ and $\langle V\rangle = \frac12m\omega^2\langle x^2\rangle = \frac12(n + \frac12)\hbar\omega$: the energy is shared equally between kinetic and potential, as in the time average of the classical oscillator. This is the quantum **virial theorem** for a quadratic potential.
:::
:::

A classical oscillator of energy $E$ swings between turning points $\pm A$ with $\frac12m\omega^2A^2 = E$, and spends most of its time near them, where it moves slowly. Its probability density is $\rho_{\mathrm{cl}}(x) = 1/\bigl(\pi\sqrt{A^2 - x^2}\bigr)$. The quantum ground state is the opposite: it peaks at the centre and extends beyond the turning points. As $n$ grows, $\abs{\psi_n}^2$ develops $n$ nodes and oscillates rapidly, and its local average approaches $\rho_{\mathrm{cl}}$.

::: widget plot
f: (fact(n)*sum((-1)^k*(2*x)^(n - 2*k)/(fact(k)*fact(n - 2*k)), k, 0, floor(n/2)))^2*exp(-x^2)/(2^n*fact(n)*sqrt(pi)); 1/(pi*sqrt(max(2*n + 1 - x^2, 0.0001)))
x: -7, 7
y: 0, 0.6
labels: quantum; classical
sliders: n=10:0:30:1
caption: The quantum density $\abs{\psi_n}^2$ in units of $\xi$ and the classical density of an oscillator with the same energy, whose turning points are at $\xi = \pm\sqrt{2n+1}$. Start at $n = 0$, where the two are nothing alike, and step up to $n = 30$. The quantum density oscillates ever faster around the classical curve, peaks near the turning points, and leaks a little beyond them. That is the correspondence principle made visible.
:::

::: example Tunnelling into the forbidden region {#ex-outside}
Find the probability that a particle in the ground state of an oscillator is found outside the classical turning points.
::: solution
For $E_0 = \frac12\hbar\omega$ the turning points satisfy $\frac12m\omega^2A^2 = \frac12\hbar\omega$, i.e. $A = \sqrt{\hbar/m\omega}$, which is $\xi = \pm1$. The density is $\pi^{-1/2}e^{-\xi^2}$, so

$$
P = 2\int_1^\infty\frac{e^{-\xi^2}}{\sqrt\pi}\,\dd\xi = 1 - \erf(1) = 0.157.
$$

Almost a sixth of the time, the particle is where a classical particle with the same energy could never be. Nothing is violated: in the forbidden region the potential energy exceeds $E$, but the particle does not have a definite kinetic energy at a definite position, and a measurement that located it there would have to supply energy.
:::
:::

::: example Vibration of the HCl molecule {#ex-hcl}
The infrared absorption of $\mathrm{H}^{35}\mathrm{Cl}$ shows its fundamental vibrational band at wavenumber $\tilde\nu = 2886\,\mathrm{cm^{-1}}$. Treating the bond as a harmonic oscillator, find $\hbar\omega$ in eV, the zero-point energy, the force constant, and the oscillator length $\sqrt{\hbar/\mu\omega}$. Atomic masses: $m_{\mathrm H} = 1.00783\,\mathrm u$, $m_{\mathrm{Cl}} = 34.96885\,\mathrm u$, with $1\,\mathrm u = 1.66054\times10^{-27}\,\mathrm{kg}$.
::: solution
A diatomic molecule vibrates along its axis like a single particle of reduced mass $\mu = m_{\mathrm H}m_{\mathrm{Cl}}/(m_{\mathrm H} + m_{\mathrm{Cl}}) = 0.97959\,\mathrm u = 1.62666\times10^{-27}\,\mathrm{kg}$. The photon absorbed in the $0\to1$ transition has energy $\hbar\omega$, and its wavenumber is $\tilde\nu = 1/\lambda$, so

$$
\hbar\omega = hc\tilde\nu = (1239.84\,\mathrm{eV\,nm})(2886\times10^{-7}\,\mathrm{nm^{-1}}) = 0.3578\,\mathrm{eV}.
$$

The zero-point energy is $\frac12\hbar\omega = 0.179\,\mathrm{eV}$. The angular frequency is $\omega = 2\pi c\tilde\nu = 2\pi(2.99792\times10^{10}\,\mathrm{cm/s})(2886\,\mathrm{cm^{-1}}) = 5.436\times10^{14}\,\mathrm{s^{-1}}$, and the force constant is

$$
k = \mu\omega^2 = (1.62666\times10^{-27})(5.436\times10^{14})^2 = 481\,\mathrm{N/m}.
$$

The oscillator length is $\sqrt{\hbar/\mu\omega} = \sqrt{(1.05457\times10^{-34})/\bigl((1.62666\times10^{-27})(5.436\times10^{14})\bigr)} = 1.09\times10^{-11}\,\mathrm{m} = 10.9\,\mathrm{pm}$, under a tenth of the bond length of $127\,\mathrm{pm}$. The zero-point vibration is a small fraction of the bond, so the harmonic approximation is good for the low levels. At room temperature $k_BT = 0.0259\,\mathrm{eV}$ is fourteen times smaller than $\hbar\omega$, so almost every molecule is in the ground vibrational state. In reality the levels converge slowly at high $n$, because the bond potential is not a parabola far from equilibrium and the molecule eventually dissociates.
:::
:::

::: quiz
A particle is in the state $\Psi(x,0) = (\psi_0 + \psi_1)/\sqrt2$ of a harmonic oscillator. Which statement about $\langle x\rangle(t)$ is correct?
- [ ] It is zero for all $t$, because each $\psi_n$ has $\langle x\rangle = 0$.
- [x] It oscillates at the classical frequency $\omega$.
- [ ] It oscillates at frequency $\omega/2$, because $E_0 = \frac12\hbar\omega$.
- [ ] It oscillates at frequency $3\omega/2$.
::: solution
The cross term between $\psi_0$ and $\psi_1$ oscillates at the Bohr frequency $(E_1 - E_0)/\hbar = \omega$, and $\int\psi_0x\psi_1\,\dd x = \sqrt{\hbar/2m\omega} \ne 0$. Explicitly, $\langle x\rangle = \sqrt{\hbar/2m\omega}\cos\omega t$. In fact every state of the oscillator has $\langle x\rangle$ oscillating at exactly $\omega$, because by Ehrenfest's theorem $\langle x\rangle$ obeys the classical equation of motion for a linear force. The zero-point energy is invisible in the motion: only differences of energies appear.
:::
:::

### Matrix elements and selection rules

Because $\hat x$ is a combination of $\hat a$ and $\hat a^\dagger$, its matrix elements between oscillator states are almost all zero. From [[#eq-x-p-ladder]] and [[#eq-ladder-action]],

$$
\int\psi_m^*\,x\,\psi_n\,\dd x = \sqrt{\frac{\hbar}{2m\omega}}\left(\sqrt n\,\delta_{m,n-1} + \sqrt{n+1}\,\delta_{m,n+1}\right).
$$

A molecule absorbs infrared light through the coupling of its electric dipole moment to the field, and in the harmonic approximation the dipole moment changes linearly with the bond stretch $x$. The transition probability between $\psi_n$ and $\psi_m$ is proportional to the square of this matrix element ([[quantum-2/time-dependent]]), so only transitions with $\Delta n = \pm1$ occur. All of them have the same photon energy $\hbar\omega$. A harmonic molecule would therefore show a single absorption line, however hot the gas; the weak overtones at nearly $2\hbar\omega$ and $3\hbar\omega$ seen in real spectra measure the anharmonicity and the non-linearity of the dipole moment. The factor $\sqrt{n+1}$ also says that absorption from $n$ to $n + 1$ grows with $n$, which in the electromagnetic field becomes stimulated emission, the principle of the laser.

::: example A charged oscillator in an electric field {#ex-shifted}
A particle of charge $q$ in the oscillator potential is placed in a uniform electric field $\mathcal E$ along $x$, so $V = \frac12m\omega^2x^2 - q\mathcal Ex$. Find the energy levels and eigenfunctions exactly.
::: solution
Complete the square:

$$
\frac12m\omega^2x^2 - q\mathcal Ex = \frac12m\omega^2\left(x - x_0\right)^2 - \frac{q^2\mathcal E^2}{2m\omega^2}, \qquad x_0 = \frac{q\mathcal E}{m\omega^2}.
$$

This is the same oscillator, centred at $x_0$ and lowered by a constant. Shifting the coordinate does not change the kinetic energy operator, since $\dd/\dd x = \dd/\dd(x - x_0)$, so the eigenfunctions are $\psi_n(x - x_0)$ and the energies are

$$
E_n = \left(n + \frac12\right)\hbar\omega - \frac{q^2\mathcal E^2}{2m\omega^2}.
$$

All levels shift down by the same amount, so the transition frequencies do not change at all. The shift is the classical energy of the induced dipole: the field displaces the charge by $x_0$, giving a dipole moment $qx_0 = (q^2/m\omega^2)\mathcal E$, i.e. a polarisability $\alpha = q^2/m\omega^2$, and the energy is $-\frac12\alpha\mathcal E^2$. This exactly solvable case is the standard check on perturbation theory in [[quantum-2/stationary-perturbation]], where the second-order energy shift reproduces $-q^2\mathcal E^2/2m\omega^2$ exactly.
:::
:::

### Time evolution and thermal equilibrium

The quiz generalises. Expand any initial state as $\Psi(x,0) = \sum_nc_n\psi_n$. By [[quantum-1/schrodinger-equation#thm-stationary]], $\Psi(x,t) = \sum_nc_n\psi_ne^{-i(n + 1/2)\omega t}$. Every exponent is a whole multiple of $\omega$, apart from the common factor $e^{-i\omega t/2}$, which has no observable effect. So the wavefunction returns to itself, up to a global phase, after one classical period $2\pi/\omega$, *whatever* the initial state: a quantum oscillator is exactly periodic, with the classical period. No other system in this course has that property; in the square well the energies grow like $n^2$, and a general state takes the much longer time $4ma^2/\pi\hbar$ to recur.

Ehrenfest's theorem makes the same point for averages. The force $-m\omega^2x$ is linear, so $\langle -m\omega^2x\rangle = -m\omega^2\langle x\rangle$, and $\langle x\rangle$ obeys the classical equation $\ddot{\langle x\rangle} = -\omega^2\langle x\rangle$ exactly. A wave packet that starts as a displaced ground-state Gaussian keeps its shape and swings back and forth like a classical particle. Such a **coherent state** is the closest quantum analogue of a classical oscillation and describes the light from a laser.

Finally, return to Planck. In thermal equilibrium at temperature $T$, the probability of level $n$ is proportional to $e^{-E_n/k_BT}$. The same geometric series as in [[quantum-1/origins#thm-planck]] gives the mean energy

$$
\langle E\rangle = \frac12\hbar\omega + \frac{\hbar\omega}{e^{\hbar\omega/k_BT} - 1}.
$$

The second term is Planck's, and the first is the zero-point energy, present even at $T = 0$. Because it does not depend on temperature it contributes nothing to heat capacities and nothing to the black-body spectrum, which is why Planck got away without it. For HCl at $300\,\mathrm K$, $\hbar\omega/k_BT = 13.8$, so the ratio of the populations of $n = 1$ and $n = 0$ is $e^{-13.8} = 9.8\times10^{-7}$: vibrations are frozen out at room temperature, as rotations are not. At $1000\,\mathrm K$ the ratio has risen to $0.016$. This freezing-out of vibrational degrees of freedom is the explanation of why the heat capacity of a diatomic gas is $\frac52R$ rather than the classical $\frac72R$ ([[thermodynamics/kinetic-theory]]).

::: remark Conventions for Hermite polynomials
The polynomials in [[#def-hermite]] are the "physicists'" Hermite polynomials, with leading coefficient $2^n$ and orthogonal with weight $e^{-\xi^2}$. Statisticians use the "probabilists'" polynomials $\mathrm{He}_n$, with leading coefficient $1$ and weight $e^{-\xi^2/2}$, related by $H_n(\xi) = 2^{n/2}\mathrm{He}_n(\sqrt2\,\xi)$. Check which convention a table uses before copying a formula from it. A second convention to watch is the sign of $\hat p$ in $\hat a$: some books put $-i\hat p$ in the lowering operator and differ from ours by phases.
:::

::: application Oscillators everywhere
The vibrational spectra of molecules (as in [[#ex-hcl]]) and the heat capacity of solids (Einstein's model of 1907 treats each atom as three oscillators with $\langle E\rangle$ from Planck's formula, plus zero point) are direct applications. Each mode of the electromagnetic field in a cavity is an oscillator whose quanta are photons, and the zero-point energy of those modes produces the Casimir force between conducting plates, measured to a few per cent in 1997. Ions in a Paul trap and the mechanical membranes of optomechanics are cooled into their oscillator ground states and manipulated one quantum at a time with $\hat a$ and $\hat a^\dagger$. The Chemistry Atlas develops the molecular applications in [vibration and rotation](/learn/chemistry/lesson.php?c=quantum-chemistry&l=vibration-rotation).
:::

::: history The oscillator in the new mechanics
The harmonic oscillator was the first system solved in the new quantum mechanics. Werner Heisenberg's paper of July 1925, written after a stay on the island of Helgoland, computed the energies of an anharmonic oscillator and found the zero-point term $\frac12\hbar\omega$. Max Born and Pascual Jordan, and then Born, Heisenberg and Jordan in their "three-man paper" later in 1925, recast it in matrices and wrote $pq - qp = \hbar/i$. Erwin Schrödinger solved the oscillator with his wave equation in the second of his 1926 papers, using the polynomials Charles Hermite had studied in 1864. Paul Dirac's *Principles of Quantum Mechanics* (1930) gave the operator method in essentially its modern form. Evidence for zero-point energy had already come in 1924, when Robert Mulliken found that the isotope shifts of the band spectrum of boron monoxide fitted only half-integer vibrational quantum numbers.
:::

## Where this leads {#leads}

The ladder method is the prototype for [[quantum-1/angular-momentum]], where operators $\hat L_\pm$ climb the eigenvalues of $\hat L_z$ and a positivity argument stops the ladder at both ends. In [[quantum-2]] the oscillator is the starting point of perturbation theory (anharmonic corrections), of coherent states (Gaussians that oscillate without spreading) and of the quantised electromagnetic field. The equipartition argument that failed in [[quantum-1/origins]] is repaired, for oscillators, by averaging $(n + \frac12)\hbar\omega$ over the Boltzmann distribution, which is done in [[statistical-mechanics]].

::: summary
- Near any minimum a potential is harmonic, $V \approx \frac12m\omega^2x^2$, so the oscillator describes small vibrations of every kind.
- With $\hat a = (m\omega\hat x + i\hat p)/\sqrt{2\hbar m\omega}$ and $[\hat x, \hat p] = i\hbar$, one has $[\hat a, \hat a^\dagger] = 1$ and $\hat H = \hbar\omega(\hat a^\dagger\hat a + \frac12)$.
- The spectrum is $E_n = (n + \frac12)\hbar\omega$: equally spaced, with zero-point energy $\frac12\hbar\omega$; $\hat a^\dagger\psi_n = \sqrt{n+1}\,\psi_{n+1}$ and $\hat a\psi_n = \sqrt n\,\psi_{n-1}$.
- The ground state is a Gaussian of width $\sqrt{\hbar/m\omega}$ with $\Delta x\,\Delta p = \hbar/2$; $\psi_n \propto H_n(\xi)e^{-\xi^2/2}$, with $n$ nodes and parity $(-1)^n$.
- In the power-series method, normalisability forces the series to terminate, which gives $E = (n + \frac12)\hbar\omega$.
- $\langle x^2\rangle = (n + \frac12)\hbar/m\omega$, $\langle T\rangle = \langle V\rangle = \frac12E_n$; the ground state is found outside the classical turning points with probability $1 - \erf(1) = 0.157$.
- For large $n$ the density averages to the classical $1/(\pi\sqrt{A^2 - x^2})$.
:::

## Exercises {#exercises}

::: exercise Zero-point energy of HCl {level=1 check="0.179"}
Using $\hbar\omega = 0.3578\,\mathrm{eV}$ for HCl, find the vibrational zero-point energy in eV, and the energy of the $n = 2$ level above the ground state.
::: solution
$E_0 = \frac12\hbar\omega = 0.179\,\mathrm{eV}$. The $n = 2$ level lies $2\hbar\omega = 0.716\,\mathrm{eV}$ above the ground state, in the harmonic approximation.
:::
:::

::: exercise Mean square displacement {level=1 check="7/2"}
Find $\langle x^2\rangle$ in the state $\psi_3$, in units of $\hbar/m\omega$.
::: solution
From [[#ex-moments]], $\langle x^2\rangle = (n + \frac12)\hbar/m\omega$, so for $n = 3$ it is $\frac72\,\hbar/m\omega$.
:::
:::

::: exercise The infrared photon {level=1 check="3.465"}
What is the wavelength, in micrometres, of the photon absorbed in the $0 \to 1$ vibrational transition of HCl ($\tilde\nu = 2886\,\mathrm{cm^{-1}}$)? Give four significant figures.
::: solution
$\lambda = 1/\tilde\nu = 1/(2886\,\mathrm{cm^{-1}}) = 3.465\times10^{-4}\,\mathrm{cm} = 3.465\,\mu\mathrm m$, in the mid-infrared. Because the levels are equally spaced in the harmonic model, the $1 \to 2$ transition would have the same wavelength; the small observed difference measures the anharmonicity.
:::
:::

::: exercise The fourth moment {level=2 check="3/4"}
Find $\langle x^4\rangle$ in the ground state, in units of $(\hbar/m\omega)^2$, using ladder operators.
::: hint
Write $\hat x^4 = (\hbar/2m\omega)^2(\hat a + \hat a^\dagger)^4$ and count the orderings that return $\psi_0$ to itself.
:::
::: solution
Expanding $(\hat a + \hat a^\dagger)^4$ gives sixteen words in $\hat a$ and $\hat a^\dagger$. Acting on $\psi_0$ (rightmost first), a word contributes to $\int\psi_0^*(\cdot)\psi_0$ only if it has two of each and never lowers below $n = 0$. The surviving words, read right to left, are $\hat a\hat a\hat a^\dagger\hat a^\dagger$ (path $0\to1\to2\to1\to0$) and $\hat a\hat a^\dagger\hat a\hat a^\dagger$ (path $0\to1\to0\to1\to0$). The first gives $\sqrt1\sqrt2\sqrt2\sqrt1 = 2$, the second $1\cdot1 = 1$. Hence $\langle(\hat a + \hat a^\dagger)^4\rangle_0 = 3$, and

$$
\langle x^4\rangle = 3\left(\frac{\hbar}{2m\omega}\right)^2 = \frac34\left(\frac{\hbar}{m\omega}\right)^2.
$$

Check: for a Gaussian of variance $\sigma^2 = \hbar/2m\omega$, the fourth moment is $3\sigma^4$, the same.
:::
:::

::: exercise Probability outside the turning points {level=2 check="1 - erf(1)"}
Give the exact probability that a particle in the oscillator ground state is found where $V(x) > E_0$.
::: solution
As in [[#ex-outside]], the turning points are at $\xi = \pm1$ and $P = 2\pi^{-1/2}\int_1^\infty e^{-\xi^2}\,\dd\xi = \operatorname{erfc}(1) = 1 - \erf(1) = 0.1573$.
:::
:::

::: exercise A two-level superposition {level=2 check="1/sqrt(2)"}
At $t = 0$ an oscillator is in $(\psi_0 + \psi_1)/\sqrt2$. Find $\langle x\rangle(t)$ and give its amplitude in units of $\sqrt{\hbar/m\omega}$.
::: solution
$\Psi(x,t) = \bigl(\psi_0e^{-i\omega t/2} + \psi_1e^{-3i\omega t/2}\bigr)/\sqrt2$. With $\hat x = \sqrt{\hbar/2m\omega}(\hat a + \hat a^\dagger)$, the only non-zero matrix elements between these states are $\int\psi_0x\psi_1 = \int\psi_1x\psi_0 = \sqrt{\hbar/2m\omega}$. So

$$
\langle x\rangle = \frac12\sqrt{\frac{\hbar}{2m\omega}}\left(e^{-i\omega t} + e^{i\omega t}\right) = \sqrt{\frac{\hbar}{2m\omega}}\cos\omega t.
$$

The amplitude is $1/\sqrt2$ in units of $\sqrt{\hbar/m\omega}$, about $0.707$ oscillator lengths, and the frequency is exactly the classical $\omega$.
:::
:::

::: exercise Isotope shift {level=3 check="2070"}
Deuterium chloride $\mathrm{D}^{35}\mathrm{Cl}$ has the same bond (the same force constant) as $\mathrm{H}^{35}\mathrm{Cl}$, because the electrons do not care about the nuclear mass. With $m_{\mathrm D} = 2.01410\,\mathrm u$, predict its vibrational wavenumber in $\mathrm{cm^{-1}}$ from the HCl value $2886\,\mathrm{cm^{-1}}$, and its zero-point energy relative to HCl.
::: solution
$\omega = \sqrt{k/\mu}$ with the same $k$, so $\tilde\nu_{\mathrm{DCl}} = \tilde\nu_{\mathrm{HCl}}\sqrt{\mu_{\mathrm{HCl}}/\mu_{\mathrm{DCl}}}$. The reduced masses are $\mu_{\mathrm{HCl}} = 0.97959\,\mathrm u$ and $\mu_{\mathrm{DCl}} = (2.01410)(34.96885)/(36.98295) = 1.90441\,\mathrm u$. Hence

$$
\tilde\nu_{\mathrm{DCl}} = 2886\sqrt{\frac{0.97959}{1.90441}} = 2886\times0.71721 = 2070\,\mathrm{cm^{-1}}.
$$

The measured value is about $2091\,\mathrm{cm^{-1}}$; the difference comes from anharmonicity, which affects the two molecules differently. The zero-point energy is lower in the same ratio, $0.717$, so DCl sits $0.0506\,\mathrm{eV}$ deeper in its well than HCl. Differences of zero-point energy of this kind make reactions involving deuterium slower, the kinetic isotope effect.
:::
:::

::: exercise Commutators of ladder powers {level=3}
Prove by induction that $[\hat a, (\hat a^\dagger)^n] = n(\hat a^\dagger)^{n-1}$ for $n \ge 1$. Use it to show, without the normalisation argument of [[#thm-ho-spectrum]], that $\hat a\psi_n = \sqrt n\,\psi_{n-1}$ when $\psi_n = (\hat a^\dagger)^n\psi_0/\sqrt{n!}$.
::: solution
For $n = 1$ the claim is $[\hat a, \hat a^\dagger] = 1$, true by [[#lem-ladder]]. Suppose it holds for $n$. Then

$$
[\hat a, (\hat a^\dagger)^{n+1}] = [\hat a, (\hat a^\dagger)^n]\hat a^\dagger + (\hat a^\dagger)^n[\hat a, \hat a^\dagger] = n(\hat a^\dagger)^{n-1}\hat a^\dagger + (\hat a^\dagger)^n = (n + 1)(\hat a^\dagger)^n,
$$

using $[\hat A\hat B, \hat C]$-type expansion $[\hat C, \hat A\hat B] = [\hat C, \hat A]\hat B + \hat A[\hat C, \hat B]$. This completes the induction.

Now apply to $\psi_0$, using $\hat a\psi_0 = 0$:

$$
\hat a(\hat a^\dagger)^n\psi_0 = (\hat a^\dagger)^n\hat a\psi_0 + n(\hat a^\dagger)^{n-1}\psi_0 = n(\hat a^\dagger)^{n-1}\psi_0.
$$

Dividing by $\sqrt{n!}$ and writing $(\hat a^\dagger)^{n-1}\psi_0 = \sqrt{(n-1)!}\,\psi_{n-1}$,

$$
\hat a\psi_n = \frac{n\sqrt{(n-1)!}}{\sqrt{n!}}\,\psi_{n-1} = \sqrt n\,\psi_{n-1}.
$$
:::
:::
