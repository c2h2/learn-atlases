A computer that integrates a chaotic system produces a trajectory that is wrong after a short time and statistics that are right for a long time. Both halves of that sentence need numbers. How short is "short"? Which statistics, and with what error bars? This chapter answers the first question by computing: a bifurcation diagram and Feigenbaum's constant for the logistic map, the largest Lyapunov exponent of the Lorenz system, and the one-dimensional map hidden inside the Lorenz attractor. It then turns to the second question, which is the everyday business of a physicist with data: fitting a model with uncertainties, judging the fit by $\chi^2$, propagating errors, resampling with the bootstrap, and looking at a signal through its Fourier transform and its autocorrelation.

The theory of chaos, fixed points, Poincaré sections and the definition of the Lyapunov exponent is in [[analytical-mechanics/chaos]], and is not repeated here. Least squares as linear algebra is in [[computation/linear-algebra]]; the Fourier series and transform are in [[math-methods/fourier]]. The integrator is the classical RK4 of [[computation/integrating-motion#alg-rk4]]. All programs use plain Python 3 with the standard library only, so the FFT, the fit and the integrator are written out. Every printed number is the output of the listing beside it, and every random number comes from a stated seed.

## The logistic map, computed {#logistic}

The logistic map $x_{n+1} = r x_n(1 - x_n)$ on $[0, 1]$ is the standard laboratory. Its period-doubling cascade and its Lyapunov exponent at a few values of $r$ are worked out in [[analytical-mechanics/chaos]]. Here we compute three things: a bifurcation diagram, the Lyapunov exponent along it, and the Feigenbaum ratio to six figures.

::: definition Bifurcation diagram {#def-bifurcation}
For a family of maps $x \mapsto f_r(x)$, the **bifurcation diagram** plots, against each parameter value $r$, the set of values visited by an orbit after its transient has been discarded. A stable cycle of period $p$ appears as $p$ points above that $r$; a chaotic attractor appears as a band.
:::

A plotted diagram is made of thousands of columns. Each column is the following computation, which the listing does for ten values of $r$: iterate $2000$ times from $x = 0.5$ to discard the transient, then record $64$ further iterates rounded to six decimals and count how many distinct values occur. Alongside, it averages $\ln\lvert f_r'(x_n)\rvert = \ln\lvert r(1 - 2x_n)\rvert$ over $10^5$ iterates, which is the Lyapunov exponent of the map.

The second half of the listing finds the **superstable** parameters $R_n$, at which the cycle of period $2^n$ passes through the critical point $x = \frac12$, where $f'(\frac12) = 0$. They interleave with the bifurcation points and converge to the same accumulation point at the same geometric rate, but they are far easier to compute accurately: $R_n$ is a root of the single equation $f_r^{2^n}(\frac12) = \frac12$. Newton's method needs the derivative with respect to $r$, which obeys a recursion obtained by differentiating $x_{k+1} = r x_k(1 - x_k)$:

$$
\frac{\partial x_{k+1}}{\partial r} = x_k(1 - x_k) + r(1 - 2x_k)\,\frac{\partial x_k}{\partial r}, \qquad \frac{\partial x_0}{\partial r} = 0.
$$

```python
import math
def attractor(r, x=0.5, transient=2000, keep=64, n=100000):
    for _ in range(transient): x = r*x*(1 - x)
    pts, lam = set(), 0.0
    for i in range(n):
        x = r*x*(1 - x)
        lam += math.log(abs(r*(1 - 2*x)))
        if i < keep: pts.add(round(x, 6))
    return sorted(pts), lam/n
for r in (2.9, 3.1, 3.46, 3.55, 3.566, 3.6, 3.74, 3.83, 3.9, 4.0):
    a, lam = attractor(r)
    print("r = %.3f  distinct values = %2d  range %.4f..%.4f  lambda = %7.4f" % (r, len(a), a[0], a[-1], lam))
print("r = 4.000 started at x = 0.3 instead: lambda = %.4f" % attractor(4.0, x=0.3)[1])

def superstable(n, r):            # Newton's method for f^(2^n)(1/2) = 1/2 in the variable r
    for _ in range(50):
        x, dx = 0.5, 0.0          # dx is the derivative of x with respect to r
        for _ in range(2**n):
            dx = x*(1 - x) + r*(1 - 2*x)*dx
            x = r*x*(1 - x)
        step = (x - 0.5)/dx; r -= step
        if abs(step) < 1e-14: break
    return r
R = [2.0, 1 + math.sqrt(5)]
for n in range(2, 12):
    R.append(superstable(n, R[-1] + (R[-1] - R[-2])/4.67))
for n in range(2, len(R)):
    print("n = %2d  R_n = %.10f  delta_n = %.6f" % (n, R[n], (R[n-1] - R[n-2])/(R[n] - R[n-1])))
```

Output (under a second):

```
r = 2.900  distinct values =  1  range 0.6552..0.6552  lambda = -0.1054
r = 3.100  distinct values =  2  range 0.5580..0.7646  lambda = -0.2638
r = 3.460  distinct values =  4  range 0.4132..0.8613  lambda = -0.0582
r = 3.550  distinct values =  8  range 0.3548..0.8874  lambda = -0.0999
r = 3.566  distinct values = 16  range 0.3450..0.8915  lambda = -0.0745
r = 3.600  distinct values = 64  range 0.3252..0.8996  lambda =  0.1829
r = 3.740  distinct values =  5  range 0.2275..0.9349  lambda = -0.1119
r = 3.830  distinct values =  3  range 0.1561..0.9574  lambda = -0.3697
r = 3.900  distinct values = 64  range 0.0953..0.9749  lambda =  0.4944
r = 4.000  distinct values =  1  range 0.0000..0.0000  lambda =  1.3863
r = 4.000 started at x = 0.3 instead: lambda = 0.6931
n =  2  R_n = 3.4985616993  delta_n = 4.708943
n =  3  R_n = 3.5546408628  delta_n = 4.680771
n =  4  R_n = 3.5666673799  delta_n = 4.662960
n =  5  R_n = 3.5692435316  delta_n = 4.668404
n =  6  R_n = 3.5697952937  delta_n = 4.668954
n =  7  R_n = 3.5699134654  delta_n = 4.669157
n =  8  R_n = 3.5699387742  delta_n = 4.669191
n =  9  R_n = 3.5699441946  delta_n = 4.669199
n = 10  R_n = 3.5699453555  delta_n = 4.669201
n = 11  R_n = 3.5699456041  delta_n = 4.669201
```

::: example Reading the columns {#ex-columns}
Interpret the first nine lines. Where is the map chaotic, and how does the count of distinct values agree with the sign of $\lambda$?
::: solution
At $r = 2.9$ one value: the stable fixed point $1 - 1/r = 0.6552$. At $3.1$ two values, at $3.46$ four, at $3.55$ eight and at $3.566$ sixteen: the cascade, with $\lambda < 0$ throughout because a stable cycle contracts nearby orbits. At $3.6$, beyond the accumulation point $r_\infty \approx 3.5699$, all $64$ recorded values differ and $\lambda = 0.18 > 0$: a chaotic band. At $3.74$ a period-$5$ window and at $3.83$ the period-$3$ window, both with negative $\lambda$, are islands of order inside the chaotic range. At $3.9$, $\lambda = 0.49$ and the orbit wanders over nearly all of $[0.095, 0.975]$. A count of $64$ means "at least $64$": it cannot distinguish chaos from a cycle of period $128$. The exponent can, which is why the diagram and $\lambda$ belong together.
:::
:::

::: warning An orbit that lands on a fixed point
The line for $r = 4$ claims one distinct value, $0$, and $\lambda = 1.3863 = \ln 4$. Both are artefacts of the starting point. From $x = 0.5$ the map gives exactly $f(0.5) = 1$ and then $f(1) = 0$, and $0$ is a fixed point. Every later term of the average is $\ln\lvert f'(0)\rvert = \ln 4$. The orbit sits on an unstable fixed point in exact binary arithmetic, so no rounding error is present to push it off. Started from $x = 0.3$, the same code gives $0.6931 = \ln 2$, the true exponent of the chaotic attractor. A program that scans $r$ from one fixed start should check for orbits that are exactly stuck, or start from a generic value.
:::

The superstable parameters give Feigenbaum's ratio. The estimates $\delta_n = (R_{n-1} - R_{n-2})/(R_n - R_{n-1})$ settle at $4.669201$ by $n = 10$, the value $\delta = 4.669201609\ldots$ quoted in [[analytical-mechanics/chaos]]. Their approach is itself geometric, so $\delta_n$ gains roughly two digits every three levels. At $n = 11$ the period is $2048$ and $R_{11} - R_{10} \approx 2.5 \times 10^{-7}$. Each level divides that difference by $4.67$, and about a dozen more would bring it down to the $10^{-15}$ resolution of double precision near $r = 3.57$, which limits how far the table can go. The initial guess $R_{n-1} + (R_{n-1} - R_{n-2})/4.67$ uses the very constant being measured to aim Newton's method. That is not circular: it only chooses where Newton starts, and a guess from any rough ratio near $4$ to $5$ converges to the same roots.

## The Lorenz system and its exponent {#lorenz}

The logistic map is a map. Lorenz's system is a flow, three ordinary differential equations obtained from a drastic truncation of the equations of convection:

$$
\dot x = \sigma(y - x), \qquad \dot y = x(\rho - z) - y, \qquad \dot z = xy - \beta z,
$$ {#eq-lorenz}

with the classical parameters $\sigma = 10$, $\rho = 28$, $\beta = 8/3$. The divergence of the vector field is $-(\sigma + 1 + \beta) = -13.67$, so volumes in phase space shrink by a factor $e^{-13.67}$ per unit time, and trajectories are attracted to a set of zero volume, the Lorenz attractor.

To measure sensitive dependence, integrate two copies that differ by $10^{-9}$ in $x$ and watch their separation $d(t)$. If the largest Lyapunov exponent is $\lambda$, then $d(t) \approx d_0 e^{\lambda t}$ until $d$ becomes comparable with the size of the attractor. A single pair gives a noisy, finite-time estimate. A reliable estimate keeps the separation small by repeated rescaling.

::: algorithm Largest Lyapunov exponent by renormalisation {#alg-benettin}
Choose $d_0$ small, an interval $\tau$, and a total time $T = M\tau$. Start a reference trajectory $\mathbf u$ on the attractor and a companion $\mathbf v = \mathbf u + d_0\hat{\mathbf e}$. Repeat $M$ times: integrate both for a time $\tau$; record $\ell_m = \ln(d/d_0)$ where $d = \lvert \mathbf v - \mathbf u\rvert$; reset $\mathbf v = \mathbf u + (\mathbf v - \mathbf u)\,d_0/d$. Then

$$
\lambda \approx \frac{1}{M\tau}\sum_{m=1}^{M}\ell_m.
$$

The rescaled separation keeps its direction, so after a few intervals it aligns with the most unstable direction, and the estimate converges to the largest exponent.
:::

The listing integrates [[#eq-lorenz]] with RK4 at $h = 0.01$ from $(1, 1, 1)$, discards $10$ time units, and prints the separation of an unrenormalised pair. It fits a straight line to $\ln d$ against $t$ for $t \le 20$, then applies [[#alg-benettin]] with $d_0 = 10^{-8}$, $\tau = 1$ and $T = 5000$, at two step sizes. The error bar comes from $10$ blocks of $500$ time units.

```python
import math
sigma, rho, beta = 10.0, 28.0, 8/3
def f(u):
    x, y, z = u
    return (sigma*(y - x), x*(rho - z) - y, x*y - beta*z)
def rk4(u, h):
    k1 = f(u)
    k2 = f([u[i] + 0.5*h*k1[i] for i in range(3)])
    k3 = f([u[i] + 0.5*h*k2[i] for i in range(3)])
    k4 = f([u[i] + h*k3[i] for i in range(3)])
    return [u[i] + h/6*(k1[i] + 2*k2[i] + 2*k3[i] + k4[i]) for i in range(3)]
def dist(u, v): return math.sqrt(sum((a - c)**2 for a, c in zip(u, v)))
def settle(h):                                   # 10 time units onto the attractor
    u = [1.0, 1.0, 1.0]
    for _ in range(round(10/h)): u = rk4(u, h)
    return u

h = 0.01; u = settle(h); v = [u[0] + 1e-9, u[1], u[2]]; ts, ls = [], []
for n in range(1, 4001):
    u = rk4(u, h); v = rk4(v, h); t = n*h
    if n % 500 == 0: print("t = %4.1f  separation = %.3e" % (t, dist(u, v)))
    if n % 10 == 0 and t <= 20: ts.append(t); ls.append(math.log(dist(u, v)))
tb, lb = sum(ts)/len(ts), sum(ls)/len(ls)
print("slope of ln(separation) for t <= 20: %.3f" % (sum((t - tb)*(l - lb) for t, l in zip(ts, ls))
                                                    / sum((t - tb)**2 for t in ts)))

def lyapunov(h, T=5000, d0=1e-8):               # renormalise the separation every time unit
    u = settle(h); v = [u[0] + d0, u[1], u[2]]; rates = []
    for _ in range(T):
        for _ in range(round(1/h)): u = rk4(u, h); v = rk4(v, h)
        d = dist(u, v); rates.append(math.log(d/d0))
        v = [u[i] + (v[i] - u[i])*d0/d for i in range(3)]
    m = T//10; blocks = [sum(rates[i*m:(i+1)*m])/m for i in range(10)]
    mu = sum(blocks)/10
    return mu, math.sqrt(sum((b - mu)**2 for b in blocks)/90)
for h in (0.01, 0.005): print("h = %.3f  lambda = %.4f +- %.4f" % ((h,) + lyapunov(h)))
```

Output (about $8$ s):

```
t =  5.0  separation = 3.312e-08
t = 10.0  separation = 1.629e-06
t = 15.0  separation = 4.997e-04
t = 20.0  separation = 3.557e-02
t = 25.0  separation = 6.422e+00
t = 30.0  separation = 2.113e+01
t = 35.0  separation = 3.913e+00
t = 40.0  separation = 1.215e+00
slope of ln(separation) for t <= 20: 0.925
h = 0.010  lambda = 0.9065 +- 0.0028
h = 0.005  lambda = 0.9069 +- 0.0025
```

::: example How long is the forecast good for? {#ex-horizon}
Use the measured exponent to predict when the unrenormalised pair, started $10^{-9}$ apart, reaches a separation of $1$, and compare with the table.
::: solution
With $d(t) = d_0 e^{\lambda t}$, the time to grow from $d_0$ to $\Delta$ is

$$
t_\Delta = \frac{1}{\lambda}\ln\frac{\Delta}{d_0} = \frac{\ln 10^9}{0.906} = \frac{20.72}{0.906} = 22.9.
$$

The table has $d = 0.036$ at $t = 20$ and $d = 6.4$ at $t = 25$, so $d = 1$ is crossed between them, consistent with $22.9$. After that, $d$ saturates at the size of the attractor, a few tens, and then fluctuates: the two runs are simply two unrelated points on the attractor. The logarithm in $t_\Delta$ is the cruel part. Improving the initial accuracy from $10^{-9}$ to $10^{-15}$, the limit of double precision, multiplies $\Delta/d_0$ by a million but adds only $\ln 10^6/0.906 = 15$ time units to the forecast.
:::
:::

The two renormalised estimates, $0.9065 \pm 0.0028$ and $0.9069 \pm 0.0025$, agree with each other, so the step $h = 0.01$ is not biasing the exponent at this precision, and they agree within their error bars with the published value $\lambda_1 \approx 0.906$ for these parameters. The single-pair slope, $0.925$, is higher. It is one finite-time sample whose value depends on where the pair happened to travel during those twenty units and on the transient while the separation turned into the unstable direction. It has no error bar at all. The renormalised average over $5000$ units is the measurement; the slope is an illustration.

::: widget plot
f: x*log(10)/l
x: 0, 16
y: 0, 45
sliders: l=0.906:0.2:2:0.01
labels: forecast time to grow from 10^(−digits) to 1
caption: The predictability time $t = \ln(1/d_0)/\lambda$ against the number of correct initial digits, $-\log_{10} d_0$, for the Lorenz exponent $\lambda = 0.906$. Each extra digit buys only $\ln 10/\lambda \approx 2.5$ time units, about three circuits of a lobe of the attractor. Drag $\lambda$ to see how a faster exponent shortens every forecast in proportion.
:::

### A map hidden in the flow

A Poincaré section reduces a flow to a map by recording successive crossings of a surface; [[analytical-mechanics/chaos]] defines it. Lorenz used a variant in his 1963 paper. He recorded the successive maxima $z_n$ of $z(t)$ and plotted $z_{n+1}$ against $z_n$. Continuing the listing above, with `f`, `rk4` and `settle` as defined there, the following lines run $2000$ time units, locate each maximum by fitting a parabola through three consecutive samples, and print a sample of the sorted pairs:

```python
h = 0.01; u = settle(h); maxima = []; z2 = z1 = None
for n in range(200000):                          # 2000 time units
    u = rk4(u, h); z = u[2]
    if z2 is not None and z1 > z2 and z1 > z:    # z1 is a local maximum: refine by a parabola
        maxima.append(z1 + (z - z2)**2/(8*(2*z1 - z2 - z)))
    z2, z1 = z1, z
pairs = sorted(zip(maxima[:-1], maxima[1:]))
print("%d maxima between %.3f and %.3f" % (len(maxima), min(maxima), max(maxima)))
for k in range(0, len(pairs), len(pairs)//8): print("z_n = %.3f  ->  z_n+1 = %.3f" % pairs[k])
print("largest z_n+1 = %.3f, reached from z_n = %.3f" % max(pairs, key=lambda p: p[1])[::-1])
```

```
2660 maxima between 30.163 and 47.103
z_n = 30.163  ->  z_n+1 = 30.372
z_n = 34.524  ->  z_n+1 = 35.440
z_n = 35.948  ->  z_n+1 = 37.435
z_n = 36.926  ->  z_n+1 = 39.094
z_n = 37.984  ->  z_n+1 = 41.690
z_n = 38.989  ->  z_n+1 = 42.178
z_n = 40.292  ->  z_n+1 = 38.884
z_n = 41.880  ->  z_n+1 = 36.386
z_n = 46.655  ->  z_n+1 = 30.667
largest z_n+1 = 47.103, reached from z_n = 38.553
```

Sorted by $z_n$, the next maximum rises steadily to a sharp peak near $z_n = 38.55$ and then falls. The $2659$ pairs lie, to plotting accuracy, on a single curve shaped like a tent with a cusp. The flow, which lives in three dimensions, has been squeezed by its strong contraction onto something close to a one-dimensional map, and a map of that shape, steep on both sides of a single maximum, is chaotic for the same reason as the tent map. That observation is why the logistic map, a toy, describes features of real dissipative flows.

::: quiz
Two students run the same Lorenz program, one on a laptop and one on a cluster, and their $x(40)$ values differ in the first decimal place. What should they conclude?
- [ ] One machine has a bug, because RK4 is deterministic.
- [ ] The step $h = 0.01$ is too large; halving it will make the two runs agree at $t = 40$.
- [x] Nothing is wrong. Differences in the last bit, from compilers or operation order, grow like $e^{0.9t}$ and reach order $1$ by $t \approx 40$. They should compare statistics, such as $\lambda$ or the distribution of $z_n$, not trajectories.
- [ ] Chaos makes every numerical result meaningless beyond $t \approx 40$.
::: solution
A difference of $10^{-16}$ amplified by $e^{0.906 \times 40} \approx 5 \times 10^{15}$ is of order $1$. Halving $h$ changes the trajectory too and does not make two different machines agree. The exponent, the attractor and the averages over it are reproducible to within their statistical error, as the two step sizes in the listing show.
:::
:::

## Reproducibility {#reproducibility}

Floating-point arithmetic is deterministic: the same operations in the same order on the same inputs give the same bits. It is not associative. $(a + b) + c$ and $a + (b + c)$ can differ in the last bit, and so can $\sigma(y - x)$ and $\sigma y - \sigma x$. In a non-chaotic computation such differences stay at the level of rounding. In a chaotic one they grow.

The listing integrates [[#eq-lorenz]] twice from $(1, 1, 1)$ with RK4 at $h = 0.01$, writing the right-hand side in two algebraically identical forms:

```python
import math
s, rho, b = 10.0, 28.0, 8/3
def fA(u):
    x, y, z = u; return (s*(y - x), x*(rho - z) - y, x*y - b*z)
def fB(u):
    x, y, z = u; return (s*y - s*x, rho*x - x*z - y, x*y - b*z)   # same algebra
def rk4(f, u, h):
    k1 = f(u); k2 = f([u[i] + 0.5*h*k1[i] for i in range(3)])
    k3 = f([u[i] + 0.5*h*k2[i] for i in range(3)]); k4 = f([u[i] + h*k3[i] for i in range(3)])
    return [u[i] + h/6*(k1[i] + 2*k2[i] + 2*k3[i] + k4[i]) for i in range(3)]
u = v = [1.0, 1.0, 1.0]; first = None
for n in range(1, 6001):
    u = rk4(fA, u, 0.01); v = rk4(fB, v, 0.01)
    d = math.sqrt(sum((a - c)**2 for a, c in zip(u, v)))
    if first is None and d > 0: first = n
    if n % 1000 == 0: print("t = %2d  x_A = %9.5f  x_B = %9.5f  |A - B| = %.2e" % (n//100, u[0], v[0], d))
print("first difference at step", first)
```

```
t = 10  x_A =  -4.90282  x_B =  -4.90282  |A - B| = 5.30e-14
t = 20  x_A =  13.47291  x_B =  13.47291  |A - B| = 6.56e-11
t = 30  x_A =   9.86686  x_B =   9.86686  |A - B| = 1.42e-06
t = 40  x_A =  -8.73678  x_B =  -8.82299  |A - B| = 1.42e-01
t = 50  x_A =   8.81327  x_B =  -0.10757  |A - B| = 1.60e+01
t = 60  x_A =  -7.05006  x_B =  -9.63008  |A - B| = 2.38e+01
```

The two runs first differ at step $41$, by one rounding, and from $t = 10$ to $t = 30$ the difference grows by a factor of $2.7 \times 10^{7}$, an average rate of $\ln(2.7 \times 10^7)/20 = 0.86$, close to $\lambda$. By $t = 50$ they are on different lobes. Neither run is "the" solution of [[#eq-lorenz]] from $(1, 1, 1)$ beyond $t \approx 35$. A theorem about **shadowing**, proved for some chaotic systems and believed for many more, says that each numerical orbit stays close to some true orbit from a slightly different start. That is what makes statistics computed from either run meaningful.

::: remark Rules for reproducible numerical work
Record the seed of every random stream, as in [[computation/random-sampling]]. Record the language version and libraries. Write output with enough digits to compare runs. For chaotic systems, test reproducibility by comparing averages with error bars, not states at late times. If a result must be bit-reproducible, fix the order of every floating-point reduction; a parallel sum whose order depends on timing is a common source of runs that cannot be repeated.
:::

## Fitting a model to data {#fitting}

Chaos was about the limits of prediction. The rest of the chapter is about how a model meets a measurement. The example is a pendulum. For small swings $T = 2\pi\sqrt{L/g}$, so $T^2 = (4\pi^2/g)\,L$ is linear in $L$ with slope $b = 4\pi^2/g$. The listing simulates an experiment: nine lengths from $0.2$ to $1.0\,\mathrm m$, periods computed with $g = 9.80\,\mathrm{m/s^2}$ and given Gaussian timing errors of $\sigma_T = 0.010\,\mathrm s$ from `random.Random(5)`. The analyst is then given only the table of $(L, T)$ and $\sigma_T$.

::: definition Weighted least squares and $\chi^2$ {#def-chi2}
Given data $(x_i, y_i)$, $i = 1, \dots, N$, with independent Gaussian errors of standard deviation $\sigma_i$ in $y_i$, and a model $y = a + bx$, the **chi-squared** of a parameter pair is

$$
\chi^2(a, b) = \sum_{i=1}^{N}\left(\frac{y_i - a - bx_i}{\sigma_i}\right)^2.
$$ {#eq-chi2}

The **weighted least-squares** estimates $\hat a, \hat b$ minimise it. If the model is correct and the $\sigma_i$ are right, the minimum $\chi^2_\mathrm{min}$ has the chi-squared distribution with $\nu = N - 2$ **degrees of freedom**, of mean $\nu$ and standard deviation $\sqrt{2\nu}$.
:::

::: theorem The straight-line fit {#thm-linfit}
With weights $w_i = 1/\sigma_i^2$, write $S = \sum w_i$, $S_x = \sum w_ix_i$, $S_y = \sum w_iy_i$, $S_{xx} = \sum w_ix_i^2$, $S_{xy} = \sum w_ix_iy_i$ and $D = SS_{xx} - S_x^2$. Then

$$
\hat a = \frac{S_{xx}S_y - S_xS_{xy}}{D}, \qquad \hat b = \frac{SS_{xy} - S_xS_y}{D},
$$

and

$$
\sigma_a^2 = \frac{S_{xx}}{D}, \qquad \sigma_b^2 = \frac{S}{D}, \qquad \Cov(\hat a, \hat b) = -\frac{S_x}{D}.
$$
:::

::: proof
Setting $\partial\chi^2/\partial a = 0$ and $\partial\chi^2/\partial b = 0$ gives the normal equations $S a + S_x b = S_y$ and $S_x a + S_{xx} b = S_{xy}$. Their determinant is $D$, which is positive unless all $x_i$ are equal (by the Cauchy–Schwarz inequality for the weights). Cramer's rule gives $\hat a$ and $\hat b$. Both estimates are linear in the data: $\hat b = \sum_i c_iy_i$ with $c_i = w_i(Sx_i - S_x)/D$. For independent $y_i$, $\Var(\hat b) = \sum c_i^2\sigma_i^2 = \sum w_i(Sx_i - S_x)^2/D^2$. Expanding the square, $\sum w_i(Sx_i - S_x)^2 = S^2S_{xx} - 2SS_x^2 + SS_x^2 = SD$, so $\Var(\hat b) = S/D$. The same calculation with $\hat a = \sum d_iy_i$, $d_i = w_i(S_{xx} - S_xx_i)/D$, gives $\Var(\hat a) = S_{xx}/D$ and $\Cov(\hat a, \hat b) = \sum c_id_i\sigma_i^2 = -S_x/D$.
:::

The error on $T^2$ comes from the error on $T$. That step, and the step from $\hat b$ to $g$, use the same rule.

::: proposition First-order error propagation {#prop-propagation}
If $q = F(p_1, \dots, p_m)$ is differentiable and the $p_j$ have small errors with covariance matrix $C$, then to first order

$$
\sigma_q^2 = \sum_{j,k}\frac{\partial F}{\partial p_j}\frac{\partial F}{\partial p_k}\,C_{jk},
$$

which for independent errors is $\sigma_q^2 = \sum_j (\partial F/\partial p_j)^2\sigma_j^2$.
:::

::: proof
Expand $F$ about the true values $\bar p$: $q - F(\bar p) = \sum_j \partial_jF\,(p_j - \bar p_j) + O(\lvert p - \bar p\rvert^2)$. Dropping the quadratic remainder, $q$ is a linear combination of the errors, and the variance of $\sum_j c_j\varepsilon_j$ is $\sum_{j,k}c_jc_k\Cov(\varepsilon_j, \varepsilon_k)$. The approximation is good when the errors are small compared with the scale on which $\partial F$ changes.
:::

For $y = T^2$, $\sigma_y = 2T\sigma_T$. For $g = 4\pi^2/b$, $\sigma_g = (4\pi^2/b^2)\,\sigma_b = g\,\sigma_b/b$: relative errors carry over unchanged through a power.

The bootstrap gives a second opinion on the error that does not rely on the stated $\sigma_i$.

::: algorithm Bootstrap resampling {#alg-bootstrap}
From $N$ data points, draw $N$ points at random **with replacement**, so that some appear twice and some not at all. Recompute the estimate on this resample. Repeat $B$ times, typically $B \ge 1000$. The standard deviation of the $B$ estimates estimates the standard error of the original estimate, and the central $68\%$ of them give an approximate confidence interval.
:::

```python
import math, random
rng = random.Random(5)
g_true, sT = 9.80, 0.010                        # metres per second squared; seconds
L = [0.2 + 0.1*i for i in range(9)]
T = [2*math.pi*math.sqrt(l/g_true) + rng.gauss(0, sT) for l in L]
y = [t*t for t in T]; sy = [2*t*sT for t in T]   # propagate sigma_T to T^2

def linfit(x, y, s):                             # weighted least squares, y = a + b x
    w = [1/si**2 for si in s]
    S = sum(w); Sx = sum(wi*xi for wi, xi in zip(w, x)); Sy = sum(wi*yi for wi, yi in zip(w, y))
    Sxx = sum(wi*xi*xi for wi, xi in zip(w, x)); Sxy = sum(wi*xi*yi for wi, xi, yi in zip(w, x, y))
    D = S*Sxx - Sx*Sx
    a = (Sxx*Sy - Sx*Sxy)/D; b = (S*Sxy - Sx*Sy)/D
    chi2 = sum(((yi - a - b*xi)/si)**2 for xi, yi, si in zip(x, y, s))
    return a, b, math.sqrt(Sxx/D), math.sqrt(S/D), -Sx/D, chi2

def chi2_sf(c, k):                               # P(chi^2_k > c), series for the lower gamma
    a, x = k/2, c/2; term = total = 1/a; n = 0
    while term > 1e-17*total:
        n += 1; term *= x/(a + n); total += term
    return 1 - math.exp(-x + a*math.log(x) - math.lgamma(a))*total

a, b, sa, sb, cab, chi2 = linfit(L, y, sy)
for l, t in zip(L, T): print("L = %.1f m  T = %.4f s" % (l, t))
print("a = %.5f +- %.5f s^2,  b = %.5f +- %.5f s^2/m,  r_ab = %.3f" % (a, sa, b, sb, cab/(sa*sb)))
print("chi2 = %.2f for %d degrees of freedom, P(chi2 > this) = %.3f" % (chi2, len(L) - 2, chi2_sf(chi2, len(L) - 2)))
g = 4*math.pi**2/b; print("g = %.3f +- %.3f m/s^2" % (g, g*sb/b))

boot = random.Random(11); bs = []
for _ in range(2000):                            # resample (L, T) pairs with replacement
    idx = [boot.randrange(len(L)) for _ in L]
    if len(set(idx)) < 3: continue
    bs.append(linfit([L[i] for i in idx], [y[i] for i in idx], [sy[i] for i in idx])[1])
m = sum(bs)/len(bs)
print("bootstrap: %d resamples, slope sd = %.5f" % (len(bs), math.sqrt(sum((v - m)**2 for v in bs)/(len(bs) - 1))))
gs = sorted(4*math.pi**2/v for v in bs)
print("bootstrap 68%% interval for g: %.3f .. %.3f" % (gs[int(0.16*len(gs))], gs[int(0.84*len(gs))]))
a2, b2, sa2, sb2, c2, chi2b = linfit(L, y, [v/2 for v in sy])
print("if sigma_T were claimed as 0.005 s: chi2 = %.2f, P = %.4f" % (chi2b, chi2_sf(chi2b, len(L) - 2)))
w = [1/v**2 for v in sy]                         # one-parameter fit y = b x
Swxx = sum(wi*xi*xi for wi, xi in zip(w, L))
b0 = sum(wi*xi*yi for wi, xi, yi in zip(w, L, y))/Swxx; sb0 = 1/math.sqrt(Swxx)
c0 = sum(((yi - b0*xi)/si)**2 for xi, yi, si in zip(L, y, sy)); g0 = 4*math.pi**2/b0
print("through origin: b = %.5f +- %.5f, chi2 = %.2f (8 dof), P = %.3f, g = %.3f +- %.3f"
      % (b0, sb0, c0, chi2_sf(c0, 8), g0, g0*sb0/b0))
```

```
L = 0.2 m  T = 0.8858 s
L = 0.3 m  T = 1.0878 s
L = 0.4 m  T = 1.2761 s
L = 0.5 m  T = 1.3963 s
L = 0.6 m  T = 1.5533 s
L = 0.7 m  T = 1.6567 s
L = 0.8 m  T = 1.8062 s
L = 0.9 m  T = 1.9061 s
L = 1.0 m  T = 2.0207 s
a = -0.03681 +- 0.01923 s^2,  b = 4.07562 +- 0.03652 s^2/m,  r_ab = -0.881
chi2 = 12.42 for 7 degrees of freedom, P(chi2 > this) = 0.087
g = 9.686 +- 0.087 m/s^2
bootstrap: 2000 resamples, slope sd = 0.05150
bootstrap 68% interval for g: 9.599 .. 9.782
if sigma_T were claimed as 0.005 s: chi2 = 49.70, P = 0.0000
through origin: b = 4.01400 +- 0.01724, chi2 = 16.09 (8 dof), P = 0.041, g = 9.835 +- 0.042
```

::: example Is the fit acceptable, and what is $g$? {#ex-fit}
Interpret the output. Is $\chi^2$ reasonable? Why do the bootstrap and the formula disagree, and which value of $g$ should be reported?
::: solution
With $\nu = 7$, $\chi^2$ has mean $7$ and standard deviation $\sqrt{14} = 3.7$. The value $12.42$ is $1.5$ standard deviations high, and the probability of a value at least this large is $0.087$. That is unremarkable: about one honest experiment in eleven does as badly. Had the analyst claimed $\sigma_T = 0.005\,\mathrm s$, $\chi^2$ would be four times larger, $49.7$, with probability below $10^{-4}$, and the fit would have exposed the claim.

The two-parameter fit gives $g = 9.686 \pm 0.087\,\mathrm{m/s^2}$, $1.3$ standard errors below the true $9.80$. The intercept is $-0.037 \pm 0.019\,\mathrm{s^2}$, and the correlation coefficient of $\hat a$ and $\hat b$ is $-0.88$: a line pivoting about the centre of the data trades intercept against slope. Physics says the intercept is zero. Imposing it, the one-parameter fit gives $g = 9.835 \pm 0.042\,\mathrm{m/s^2}$, half the error bar, $0.8$ standard errors from $9.80$, with $\chi^2 = 16.09$ for $8$ degrees of freedom. The increase of $3.67$ in $\chi^2$ for one constraint is a $1.9\sigma$ tension, not a reason to keep the intercept.

The bootstrap standard deviation of the slope is $0.0515$, against the formula's $0.0365$. The formula trusts the stated $\sigma_i$ entirely; the bootstrap uses the actual scatter. The scatter is larger than claimed by a factor $\sqrt{\chi^2/\nu} = \sqrt{12.42/7} = 1.33$, and $0.0365 \times 1.33 = 0.049$, close to the bootstrap. With only nine points the bootstrap is itself rough, because every resample draws from the same nine values.
:::
:::

::: widget plot
f: x^(k/2 - 1)*exp(-x/2)/(2^(k/2)*gamma(k/2))
x: 0, 30
y: 0, 0.25
sliders: k=7:1:20:1
labels: chi-squared density with k degrees of freedom
caption: The probability density of $\chi^2$ for $k$ degrees of freedom. At $k = 7$ it peaks at $5$ and has mean $7$; the fit's $12.42$ sits in the upper tail with $8.7\%$ of the probability beyond it. Increase $k$ and the density moves right and narrows relative to its mean: $\chi^2/k$ concentrates near $1$, which is why the "reduced chi-squared" is a useful summary for many points and a poor one for few.
:::

::: warning Three ways to misuse a fit
Three common errors meet in a pendulum fit. Using unweighted least squares on $T^2$ treats every point as equally precise, although $\sigma_{T^2} = 2T\sigma_T$ grows with $T$. Quoting $\sigma_b$ from the formula without looking at $\chi^2$ assumes the error bars are right, which is the one thing the data can test. And reporting a $\chi^2/\nu$ of $0.1$ as a "very good fit" misses that errors have been overestimated, or that the points are not independent.
:::

## Signals: the discrete Fourier transform {#fourier}

A time series $x_0, \dots, x_{N-1}$ sampled at interval $\Delta t$ can be written as a sum of $N$ complex exponentials. The weights tell you which frequencies the signal contains.

::: definition Discrete Fourier transform {#def-dft}
The **discrete Fourier transform** of $x_0, \dots, x_{N-1}$ is

$$
X_k = \sum_{n=0}^{N-1} x_n\, e^{-2\pi i kn/N}, \qquad k = 0, \dots, N - 1,
$$ {#eq-dft}

with inverse $x_n = \frac1N\sum_k X_k\,e^{2\pi i kn/N}$. Index $k$ corresponds to frequency $f_k = k/(N\Delta t)$. The **power spectrum** is $\lvert X_k\rvert^2$; for real data $X_{N-k} = \overline{X_k}$, so only $k \le N/2$ carries information.
:::

Evaluated directly, [[#eq-dft]] costs $N^2$ complex multiplications. Cooley and Tukey's algorithm does it in order $N\log N$.

::: theorem Radix-2 fast Fourier transform {#thm-fft}
Let $N$ be even and let $E_k$ and $O_k$ be the DFTs, of length $N/2$, of the even-indexed samples $x_0, x_2, \dots$ and the odd-indexed samples $x_1, x_3, \dots$. Then for $0 \le k < N/2$,

$$
X_k = E_k + e^{-2\pi i k/N}O_k, \qquad X_{k + N/2} = E_k - e^{-2\pi i k/N}O_k.
$$

If $N = 2^p$, applying this recursively computes the DFT with $\frac N2\log_2 N$ complex multiplications.
:::

::: proof
Split the sum [[#eq-dft]] into even $n = 2m$ and odd $n = 2m + 1$:

$$
X_k = \sum_{m=0}^{N/2-1} x_{2m}\,e^{-2\pi i km/(N/2)} + e^{-2\pi ik/N}\sum_{m=0}^{N/2-1} x_{2m+1}\,e^{-2\pi i km/(N/2)} = E_k + e^{-2\pi ik/N}O_k .
$$

The half-length transforms are periodic in $k$ with period $N/2$, and $e^{-2\pi i(k + N/2)/N} = -e^{-2\pi ik/N}$, which gives the second formula. Combining costs $N/2$ multiplications by the twiddle factors $e^{-2\pi ik/N}$. If $M(N)$ is the count for length $N$, then $M(N) = 2M(N/2) + N/2$ with $M(1) = 0$, whose solution for $N = 2^p$ is $M(N) = \frac N2 p = \frac N2\log_2 N$, as substitution confirms: $2 \cdot \frac N4(p - 1) + \frac N2 = \frac N2 p$.
:::

Sampling has a limit that no algorithm removes.

::: theorem Aliasing and the Nyquist frequency {#thm-alias}
Samples taken at rate $f_s = 1/\Delta t$ cannot distinguish a frequency $f$ from $f + mf_s$ for any integer $m$, nor (for real signals) from $mf_s - f$. Every frequency is therefore indistinguishable from one in $[0, f_s/2]$. The upper limit $f_s/2$ is the **Nyquist frequency**.
:::

::: proof
At the sample times $t_n = n/f_s$, $e^{2\pi i(f + mf_s)t_n} = e^{2\pi i f t_n}e^{2\pi i mn} = e^{2\pi i f t_n}$, because $mn$ is an integer. For a real signal, $\cos(2\pi(mf_s - f)t_n) = \cos(2\pi m n - 2\pi f t_n) = \cos(2\pi f t_n)$, and the sine changes only in sign. Any $f$ can be shifted by a multiple of $f_s$ into $(-f_s/2, f_s/2]$ and reflected into $[0, f_s/2]$.
:::

::: widget plot
f: sin(2*pi*a*x); sin(2*pi*(a - 8)*x)
x: 0, 1
y: -1.3, 1.3
sliders: a=5:0:8:0.1
labels: signal at a Hz; alias at a − 8 Hz
caption: A sine of frequency $a$ and its alias $a - 8$, which is a sine of frequency $\lvert a - 8\rvert$, over one second. Sampled at $8$ Hz, at the instants $t = 0, \frac18, \frac28, \dots$, the two curves pass through the same points: look where they cross. At $a = 5$ the alias is $3$ Hz. Drag $a$ down past $4$, the Nyquist frequency, and the alias becomes the faster curve: then the slower one is what the samples show.
:::

The listing below implements the direct DFT and a recursive FFT, checks one against the other, times them, and uses the FFT on four signals. It continues the Lorenz listing, whose `rk4` and `settle` produce the last signal.

```python
import cmath, math, time

def dft(x):                                      # direct sum, O(N^2)
    N = len(x)
    return [sum(x[n]*cmath.exp(-2j*math.pi*k*n/N) for n in range(N)) for k in range(N)]

def fft(x):                                      # radix-2 Cooley-Tukey, len(x) a power of 2
    N = len(x)
    if N == 1: return [complex(x[0])]
    E, O = fft(x[0::2]), fft(x[1::2])
    t = [cmath.exp(-2j*math.pi*k/N)*O[k] for k in range(N//2)]
    return [E[k] + t[k] for k in range(N//2)] + [E[k] - t[k] for k in range(N//2)]

x = [math.sin(0.3*n) + 0.5*math.cos(1.1*n) for n in range(256)]
print("max |DFT - FFT| for N = 256: %.2e" % max(abs(a - b) for a, b in zip(dft(x), fft(x))))
for N in (256, 1024):
    x = [math.sin(0.3*n) for n in range(N)]
    t0 = time.perf_counter(); dft(x); t1 = time.perf_counter(); fft(x); t2 = time.perf_counter()
    print("N = %4d  DFT %.3f s  FFT %.4f s" % (N, t1 - t0, t2 - t1))

def power(x):                                    # one-sided |X_k|^2 after removing the mean
    m = sum(x)/len(x); X = fft([v - m for v in x])
    return [abs(X[k])**2 for k in range(len(x)//2 + 1)]

fs, N = 8.0, 128                                 # aliasing: sample for 16 s at 8 Hz
for f0 in (3.0, 5.0):
    P = power([math.sin(2*math.pi*f0*n/fs) for n in range(N)])
    print("%.0f Hz sampled at 8 Hz: peak at %.3f Hz" % (f0, max(range(len(P)), key=P.__getitem__)*fs/N))

# logistic map: period 4 versus chaos
def logistic(r, N, x=0.3):
    for _ in range(1000): x = r*x*(1 - x)
    out = []
    for _ in range(N): x = r*x*(1 - x); out.append(x)
    return out
for r in (3.5, 3.9):
    P = power(logistic(r, 4096)); tot = sum(P)
    top = sorted(range(len(P)), key=P.__getitem__, reverse=True)[:2]
    print("r = %.1f  fraction of power in the 2 largest bins = %.4f  at frequencies %s"
          % (r, sum(P[k] for k in top)/tot, [round(k/4096, 4) for k in top]))

def autocorr(x, lags):
    m = sum(x)/len(x); d = [v - m for v in x]; c0 = sum(v*v for v in d)
    return [sum(d[i]*d[i + k] for i in range(len(d) - k))/c0 for k in lags]
print("logistic r = 4, autocorrelation at lags 1..4:",
      [round(c, 4) for c in autocorr(logistic(4.0, 100000), range(1, 5))])

u = settle(0.01); xs = []                         # Lorenz x(t), sampled every 0.05
for _ in range(8192):
    for _ in range(5): u = rk4(u, 0.01)
    xs.append(u[0])
P = power(xs); tot = sum(P)
top = sorted(range(len(P)), key=P.__getitem__, reverse=True)[:2]
print("Lorenz x(t): fraction of power in the 2 largest bins = %.4f" % (sum(P[k] for k in top)/tot))
half = 0; acc = 0.0
for k in range(len(P)):
    acc += P[k]
    if acc >= tot/2: half = k; break
print("half the power lies below f = %.3f" % (half/(8192*0.05)))
print("Lorenz x autocorrelation at lags 0.5, 1, 2, 4 time units:",
      [round(c, 3) for c in autocorr(xs, (10, 20, 40, 80))])
```

Output (about $1$ s; the timings vary from run to run):

```
max |DFT - FFT| for N = 256: 2.08e-12
N =  256  DFT 0.032 s  FFT 0.0008 s
N = 1024  DFT 0.514 s  FFT 0.0038 s
3 Hz sampled at 8 Hz: peak at 3.000 Hz
5 Hz sampled at 8 Hz: peak at 3.000 Hz
r = 3.5  fraction of power in the 2 largest bins = 1.0000  at frequencies [0.5, 0.25]
r = 3.9  fraction of power in the 2 largest bins = 0.0163  at frequencies [0.3811, 0.3997]
logistic r = 4, autocorrelation at lags 1..4: [-0.0008, -0.0028, -0.004, -0.0031]
Lorenz x(t): fraction of power in the 2 largest bins = 0.0352
half the power lies below f = 0.461
Lorenz x autocorrelation at lags 0.5, 1, 2, 4 time units: [0.19, 0.146, 0.025, 0.031]
```

::: example Periodic and chaotic spectra {#ex-spectra}
Explain the lines for the logistic map at $r = 3.5$ and $r = 3.9$, and for the aliased sines.
::: solution
At $r = 3.5$ the attractor is a cycle of period $4$, so the sequence repeats every four steps. A sequence of period $4$ contains only the frequencies $0$, $\frac14$ and $\frac12$ per step (and $\frac34$, the mirror of $\frac14$). With the mean removed, all of the power lies in the two bins at $\frac14$ and $\frac12$: the printed fraction is $1.0000$. At $r = 3.9$ the largest two bins hold only $1.6\%$ of the power. The spectrum is **broadband**: power spread over a continuum of frequencies, the spectral signature of chaos. A broadband spectrum alone does not prove chaos, since noise is broadband too; it rules out a periodic or quasi-periodic signal, whose power sits in discrete lines.

Both the $3\,\mathrm{Hz}$ and the $5\,\mathrm{Hz}$ sines, sampled at $8\,\mathrm{Hz}$, peak at $3\,\mathrm{Hz}$. The Nyquist frequency is $4\,\mathrm{Hz}$; $5\,\mathrm{Hz}$ lies above it and is folded to $8 - 5 = 3\,\mathrm{Hz}$, as [[#thm-alias]] says. From the samples alone the two experiments are identical. The only defence is to filter out frequencies above $f_s/2$ before sampling. Each sine has an integer number of cycles in $16\,\mathrm s$, so its peak falls exactly on a bin; otherwise power leaks into neighbouring bins.
:::
:::

The timings show the scaling: quadrupling $N$ multiplied the direct DFT time by $16$ and the FFT time by about $5$, against the predicted $4 \times 10/8 = 5$. At $N = 1024$ the FFT is over a hundred times faster, and the advantage grows without bound. The agreement to $2 \times 10^{-12}$ is rounding: the two algorithms add the same terms in different orders.

## Autocorrelation {#autocorrelation}

::: definition Autocorrelation function {#def-autocorr}
For a stationary series with mean $\mu$ and variance $s^2$, the **autocorrelation** at lag $k$ is

$$
\rho_k = \frac{\E[(x_n - \mu)(x_{n+k} - \mu)]}{s^2},
$$

estimated by replacing the expectation with an average over the available pairs. $\rho_0 = 1$, and $\lvert\rho_k\rvert \le 1$.
:::

The autocorrelation and the power spectrum carry the same information. By the **Wiener–Khinchin theorem**, the power spectrum of a stationary process is the Fourier transform of its autocorrelation; the discrete statement for periodic sequences is [[#exr-wk]]. A narrow spectral line means correlations that persist; a broad spectrum means correlations that die quickly. The Lorenz $x(t)$ illustrates both. Its autocorrelation falls to $0.19$ at a lag of $0.5$ and to $0.03$ by lag $2$, and half its power lies below $0.46$ cycles per unit time, from the irregular switching between the two lobes of the attractor. Correlation times matter for error bars: averaging a correlated series needs the correction measured in [[computation/random-sampling#ex-metro]] and used for the block errors of [[computation/many-particles]].

::: example Uncorrelated but deterministic {#ex-uncorrelated}
The logistic map at $r = 4$ is completely deterministic: $x_{n+1}$ is a function of $x_n$. Yet the listing finds autocorrelations of $-0.0008$, $-0.0028$, $-0.0040$ and $-0.0031$ at lags $1$ to $4$. Are these consistent with zero, and what does that teach?
::: solution
For $N = 10^5$ values of an uncorrelated series, an estimated $\rho_k$ has standard error about $1/\sqrt N = 0.0032$. All four values are within about $1.3$ standard errors of zero. In fact the exact autocorrelation of this map vanishes at every nonzero lag: with the invariant density of the map, $\E[(x_n - \frac12)(x_{n+1} - \frac12)] = 0$, which [[#exr-zero-corr]] asks you to verify. So the autocorrelation, and with it the power spectrum, of this deterministic sequence is that of white noise. Second-order statistics see only linear dependence. The dependence here is perfectly nonlinear: a plot of $x_{n+1}$ against $x_n$ is the parabola $4x(1 - x)$. Distinguishing chaos from noise needs tools that look at that structure, such as the return map, the Lyapunov exponent or the dimension of the attractor.
:::
:::

::: quiz
A detector samples at $f_s = 1000\,\mathrm{Hz}$. Its spectrum shows a sharp line at $40\,\mathrm{Hz}$, but the apparatus has no known source there. A $1040\,\mathrm{Hz}$ vibration is known to exist. What is the most likely explanation?
- [ ] The FFT has a bug at low frequencies.
- [x] The $1040\,\mathrm{Hz}$ vibration is aliased to $1040 - 1000 = 40\,\mathrm{Hz}$, because nothing removed it before sampling.
- [ ] A $40\,\mathrm{Hz}$ line means the signal is chaotic.
- [ ] Lines can only appear below the Nyquist frequency if the signal is periodic in the window.
::: solution
By [[#thm-alias]], $1040\,\mathrm{Hz}$ is indistinguishable from $40\,\mathrm{Hz}$ at $1000$ samples per second. The fix is an analogue low-pass filter below $500\,\mathrm{Hz}$ in front of the digitiser, or a higher sampling rate. A single sharp line is the opposite of a chaotic, broadband spectrum.
:::
:::

## History and where this leads {#leads}

::: history From Lorenz to the bootstrap
Edward Lorenz published "Deterministic nonperiodic flow" in the *Journal of the Atmospheric Sciences* in 1963. By his own later account, he had noticed sensitive dependence when he restarted a run of a larger weather model from printed values rounded to three decimal places and watched the new run diverge from the old. Robert May's 1976 review in *Nature*, "Simple mathematical models with very complicated dynamics", made the logistic map famous among biologists and physicists. Mitchell Feigenbaum, working with a programmable pocket calculator at Los Alamos, found in 1975 that the bifurcation points converge geometrically with ratio $4.669\ldots$, and published the universality of the ratio in 1978. Giancarlo Benettin, Luigi Galgani, Antonio Giorgilli and Jean-Marie Strelcyn gave the renormalisation algorithm for the whole Lyapunov spectrum in 1980.

On the data side, least squares goes back to Legendre (1805) and Gauss (1809). James Cooley and John Tukey published the fast Fourier transform in 1965, although Gauss had used the same splitting in unpublished work around 1805. The sampling limit is associated with Harry Nyquist (1928) and Claude Shannon (1949). Bradley Efron introduced the bootstrap in 1979.
:::

The chaos computed here is the numerical side of [[analytical-mechanics/chaos]]; its consequences for the foundations of statistical mechanics, and why averages over a chaotic trajectory equal ensemble averages, are in [[statistical-mechanics/microcanonical]]. Fourier analysis of signals returns in [[optics/diffraction]], where a lens computes a two-dimensional Fourier transform, and in [[condensed-matter/crystals]], where a diffraction pattern is the Fourier transform of a lattice. Fitting with $\chi^2$ and propagating errors is the language of every laboratory report you will write.

::: summary
- A bifurcation diagram is a column of post-transient iterates for each parameter. Pair it with the Lyapunov exponent: a count of distinct values cannot tell chaos from a long cycle, $\lambda > 0$ can. Beware orbits that land exactly on an unstable fixed point.
- Superstable parameters found by Newton's method give Feigenbaum's $\delta = 4.669201$ to seven figures in under a second.
- For the Lorenz system, renormalised RK4 pairs give $\lambda = 0.9065 \pm 0.0028$ at $h = 0.01$, unchanged at $h = 0.005$. A forecast from $10^{-9}$ accuracy fails after about $23$ time units, and each extra digit buys only $\ln 10/\lambda \approx 2.5$.
- Algebraically identical code diverges in a chaotic run. Reproduce statistics with error bars, not late-time states; record seeds and versions.
- Weighted least squares gives estimates, errors and covariances in closed form. $\chi^2$ tests the error bars; first-order propagation carries errors through functions; the bootstrap estimates errors from the actual scatter.
- The FFT computes the DFT in $\frac N2\log_2 N$ multiplications. Frequencies above $f_s/2$ alias into $[0, f_s/2]$ and cannot be removed after sampling.
- A periodic signal has a line spectrum; a chaotic one is broadband. The autocorrelation is the Fourier partner of the power spectrum and sets the correlation time that error bars must respect, but it is blind to nonlinear determinism.
:::

## Exercises {#exercises}

::: exercise The Nyquist frequency {level=1 check="4"}
A signal is sampled at $8\,\mathrm{Hz}$. What is the highest frequency, in hertz, that the samples can represent without aliasing?
::: solution
$f_s/2 = 4\,\mathrm{Hz}$, by [[#thm-alias]].
:::
:::

::: exercise Where does 7 Hz appear? {level=1 check="3"}
A $7\,\mathrm{Hz}$ sine is sampled at $10\,\mathrm{Hz}$. At what frequency, in hertz, does its spectral peak appear?
::: solution
The Nyquist frequency is $5\,\mathrm{Hz}$, and $7\,\mathrm{Hz}$ folds to $10 - 7 = 3\,\mathrm{Hz}$.
:::
:::

::: exercise A Feigenbaum estimate {level=1 check="4.668"}
From $R_3 = 3.5546408628$, $R_4 = 3.5666673799$ and $R_5 = 3.5692435316$, compute $\delta_5 = (R_4 - R_3)/(R_5 - R_4)$ to four significant figures.
::: solution
$R_4 - R_3 = 0.0120265171$ and $R_5 - R_4 = 0.0025761517$, so $\delta_5 = 4.668$, as in the listing's output.
:::
:::

::: exercise Forecast horizon {level=1 check="22.9"}
With $\lambda = 0.906$, how long does an initial separation of $10^{-9}$ take to grow to $1$? Give one decimal place.
::: solution
$t = \ln(10^9)/0.906 = 20.723/0.906 = 22.9$ time units. See [[#ex-horizon]].
:::
:::

::: exercise Propagating to $g$ {level=2 check="0.087"}
The fitted slope is $b = 4.07562 \pm 0.03652\,\mathrm{s^2/m}$. Find the standard error of $g = 4\pi^2/b$, to two significant figures.
::: solution
By [[#prop-propagation]], $\sigma_g = \lvert\deriv{g}{b}\rvert\sigma_b = (4\pi^2/b^2)\sigma_b = g\,\sigma_b/b$. With $g = 39.478/4.07562 = 9.686$, $\sigma_g = 9.686 \times 0.03652/4.07562 = 0.087\,\mathrm{m/s^2}$.
:::
:::

::: exercise FFT saving {level=2 check="204.8"}
For $N = 1024$, compare the $N^2$ complex multiplications of the direct DFT with the $\frac N2\log_2 N$ of the radix-2 FFT. What is the ratio?
::: solution
$N^2 = 1048576$ and $\frac N2\log_2 N = 512 \times 10 = 5120$. The ratio is $204.8$. The measured time ratio in the listing, about $0.514/0.0038 \approx 135$, is smaller because the FFT also pays for list slicing and recursion.
:::
:::

::: exercise Combining two measurements {level=2 check="9.82"}
Two independent experiments give $g = 9.70 \pm 0.10$ and $g = 9.85 \pm 0.05\,\mathrm{m/s^2}$. Find the weighted mean, and its standard error.
::: hint
The weighted mean is the least-squares fit of a constant, $y = a$: minimise $\chi^2$ in $a$.
:::
::: solution
Minimising $\sum (g_i - a)^2/\sigma_i^2$ gives $\hat a = \sum w_ig_i/\sum w_i$ with $w_i = 1/\sigma_i^2$: here $w = 100$ and $400$, so $\hat a = (970 + 3940)/500 = 9.82\,\mathrm{m/s^2}$. Its variance is $1/\sum w_i = 1/500$, so the standard error is $0.045$. The two values differ by $0.15$, with a combined standard error $\sqrt{0.01 + 0.0025} = 0.11$: $1.3\sigma$, consistent.
:::
:::

::: exercise The exponent of a stuck orbit {level=2 check="ln(4)"}
In the logistic listing the orbit at $r = 4$ started from $x = 0.5$ reaches $x = 0$ after two steps. Show that the average of $\ln\lvert f'(x_n)\rvert$ then converges to $\ln 4$, and explain why this number is not the Lyapunov exponent of the attractor.
::: solution
$f(0.5) = 4 \times 0.5 \times 0.5 = 1$ and $f(1) = 0$, both exact in binary. From then on $x_n = 0$ and $f'(0) = r = 4$, so every term is $\ln 4 = 1.3863$, and the average over $10^5$ terms equals it to four decimals. This is the exponent of the unstable fixed point at $0$. A generic orbit is never captured by that point; its exponent is $\ln 2$, the value obtained from $x = 0.3$. The set of starting points that land exactly on $0$ is countable, but $0.5$ is one of them and a natural default.
:::
:::

::: exercise Parseval's theorem for the DFT {level=3}
Prove that $\sum_{n=0}^{N-1}\lvert x_n\rvert^2 = \frac1N\sum_{k=0}^{N-1}\lvert X_k\rvert^2$.
::: hint
Use $\sum_{k=0}^{N-1}e^{2\pi ik(n - m)/N} = N$ if $n = m$ and $0$ otherwise, for $0 \le n, m < N$.
:::
::: solution
First the hint. If $n = m$ every term is $1$. Otherwise $z = e^{2\pi i(n - m)/N} \ne 1$ and $z^N = 1$, so the geometric sum is $(1 - z^N)/(1 - z) = 0$. Now

$$
\sum_k\lvert X_k\rvert^2 = \sum_k\sum_n\sum_m x_n\overline{x_m}\,e^{-2\pi ik(n - m)/N} = \sum_n\sum_m x_n\overline{x_m}\sum_k e^{-2\pi ik(n - m)/N} = N\sum_n\lvert x_n\rvert^2 .
$$

The exchange of finite sums is always allowed. Dividing by $N$ gives the result. It is why $\sum_k \lvert X_k\rvert^2$, the total of a power spectrum, measures the signal's energy, and why the fractions of power printed in the listing are meaningful.
:::
:::

::: exercise Discrete Wiener–Khinchin {#exr-wk level=3}
For a sequence $x_0, \dots, x_{N-1}$ extended periodically, define the circular autocovariance $c_k = \sum_{n=0}^{N-1}x_n\overline{x_{n+k}}$, with indices mod $N$. Prove that $\sum_{k=0}^{N-1} c_k\,e^{2\pi ijk/N} = \lvert X_j\rvert^2$.
::: solution
Compute $\sum_k c_k e^{2\pi ijk/N} = \sum_n x_n\sum_k \overline{x_{n+k}}\,e^{2\pi ijk/N}$. Substitute $m = n + k \bmod N$; as $k$ runs over a period so does $m$, and $e^{2\pi ijk/N} = e^{2\pi ijm/N}e^{-2\pi ijn/N}$ because the exponential has period $N$ in $k$. The double sum becomes

$$
\sum_n x_ne^{-2\pi ijn/N}\,\sum_m\overline{x_m}\,e^{2\pi ijm/N} = X_j\,\overline{X_j} = \lvert X_j\rvert^2 .
$$

With $e^{-2\pi ijk/N}$ in place of $e^{+2\pi ijk/N}$ the result is $\lvert X_{-j}\rvert^2$, which equals $\lvert X_j\rvert^2$ for real data. So computing $\lvert X_j\rvert^2$ by FFT and transforming back gives the autocorrelation in $O(N\log N)$ operations, instead of the $O(N^2)$ of the direct sums in the listing. For a non-periodic series one pads it with $N$ zeros first, so the circular sum does not wrap around.
:::
:::

::: exercise A deterministic sequence with zero correlation {#exr-zero-corr level=3}
The logistic map at $r = 4$ has invariant density $p(x) = 1/(\pi\sqrt{x(1 - x)})$ on $(0, 1)$, which is symmetric about $\frac12$. Show that $\E[(x_n - \frac12)(x_{n+1} - \frac12)] = 0$ when $x_n$ has this density.
::: hint
Write $x_{n+1} - \frac12 = 4x(1 - x) - \frac12 = \frac12 - 4(x - \frac12)^2$ and use the symmetry.
:::
::: solution
Put $u = x_n - \frac12$, so $u$ has a density symmetric about $0$ on $(-\frac12, \frac12)$, and $x_n(1 - x_n) = \frac14 - u^2$. Then $x_{n+1} - \frac12 = 4(\frac14 - u^2) - \frac12 = \frac12 - 4u^2$, and

$$
\E\bigl[u\bigl(\tfrac12 - 4u^2\bigr)\bigr] = \tfrac12\E[u] - 4\E[u^3] = 0,
$$

because the odd moments of a symmetric density vanish. The mean of $x$ is $\frac12$ by the same symmetry, so this is the covariance, and $\rho_1 = 0$. The listing's $-0.0008$ is a sampling fluctuation of the size $1/\sqrt N$. For any $k \ge 1$, $x_{n+k}$ is a function of $x_{n+1}$, which is an even function of $u$; so $(x_{n+k} - \frac12)$ is even in $u$, the product with $u$ is odd, and $\rho_k = 0$ for every $k \ge 1$.
:::
:::
