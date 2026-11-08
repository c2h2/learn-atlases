An optical fibre is a strand of glass $125\,\mathrm{\mu m}$ across, about the thickness of a human hair, with a central **core** whose refractive index is a fraction of a per cent higher than that of the surrounding **cladding**. A standard single-mode fibre loses only about $0.18\,\mathrm{dB}$ per kilometre at $1550\,\mathrm{nm}$: after $100\,\mathrm{km}$ of glass, $1.5\,\%$ of the light is still there, and a window pane of that glass would be as transparent as a few centimetres of air. Billions of kilometres of fibre have been installed, and they carry essentially all intercontinental and inter-city traffic, mobile-network backhaul and data-centre interconnects.

Two numbers decide how good a fibre is for communication: how much power it loses (**attenuation**) and how much it smears out pulses (**dispersion**). Attenuation limits how far a signal can travel before it is lost in receiver noise; dispersion limits how close together the pulses may be, i.e. the bit rate. This lesson treats the fibre as a cylindrical version of the slab waveguide of [[photonics/dielectric-waveguides]], derives its modes and the condition for single-mode operation, and then analyses the physical origins of attenuation and of modal and chromatic dispersion, with the bit-rate–distance limits they impose.

## Step-index fibres {#sec-step}

The simplest fibre has a uniform core of index $n_1$ and radius $a$, surrounded by a cladding of index $n_2$.

::: definition Step-index fibre parameters {#def-fibre}
The **relative index difference** of a step-index fibre is

$$
\Delta = \frac{n_1^2 - n_2^2}{2n_1^2} \approx \frac{n_1 - n_2}{n_1} ,
$$ {#eq-delta}

its **numerical aperture** is $\mathrm{NA} = \sqrt{n_1^2 - n_2^2} = n_1\sqrt{2\Delta}$, and its **V-number** (normalised frequency) at vacuum wavelength $\lambda_0$ is

$$
V = \frac{2\pi a}{\lambda_0}\,\mathrm{NA} .
$$ {#eq-v}

Light from air is accepted by the fibre within a cone of half-angle $\theta_a = \arcsin(\mathrm{NA})$.
:::

The acceptance angle was derived with rays in [[electromagnetics/reflection-refraction]]: a ray entering the end face at $\theta_a$ is refracted to the angle at which it meets the core–cladding boundary at exactly the critical angle. Telecommunication fibres have $\Delta$ between $0.3\,\%$ and $2\,\%$; such fibres are **weakly guiding**, $n_1 \approx n_2$, which simplifies their analysis enormously.

Rays in a fibre come in two families: **meridional rays**, which cross the axis and stay in one plane, and **skew rays**, which spiral round the axis without crossing it. The ray picture is adequate for multimode fibres, whose cores are tens of micrometres across, but a single-mode fibre has a core of about $8\,\mathrm{\mu m}$, only five wavelengths, and must be treated with waves.

### Modes of a weakly guiding fibre

In a weakly guiding fibre the fields are almost transverse and almost linearly polarised, and each Cartesian component $\psi$ of the electric field satisfies the scalar Helmholtz equation $\nabla^2\psi + n^2(r)k_0^2\psi = 0$. In cylindrical coordinates we look for modes $\psi = F(r)\cos(l\phi)e^{-j\beta z}$ with integer $l$:

$$
\frac{\dd^2F}{\dd r^2} + \frac1r\frac{\dd F}{\dd r} + \left(n^2k_0^2 - \beta^2 - \frac{l^2}{r^2}\right)F = 0 .
$$ {#eq-bessel-eq}

This is Bessel's equation. As for the slab, define $u = a\sqrt{n_1^2k_0^2 - \beta^2}$ and $w = a\sqrt{\beta^2 - n_2^2k_0^2}$, so that $u^2 + w^2 = V^2$. In the core the solution that is finite on the axis is the Bessel function $J_l(ur/a)$; in the cladding, the one that decays is the modified Bessel function $K_l(wr/a)$, which falls off roughly as $e^{-wr/a}/\sqrt r$.

::: theorem LP modes of a step-index fibre {#thm-lp}
In the weakly guiding approximation, the guided modes of a step-index fibre are the **linearly polarised** modes LP$_{lm}$, with

$$
F(r) = \begin{cases} J_l(ur/a)/J_l(u), & r < a,\\ K_l(wr/a)/K_l(w), & r > a, \end{cases}
$$

where $u$ and $w = \sqrt{V^2 - u^2}$ satisfy the characteristic equation

$$
u\frac{J_{l-1}(u)}{J_l(u)} = -w\frac{K_{l-1}(w)}{K_l(w)} .
$$ {#eq-lp-char}

For each $l$ the roots are numbered $m = 1, 2, \dots$. The LP$_{lm}$ mode is cut off where $w \to 0$, at the values of $V$ where $J_{l-1}(V) = 0$. The fundamental LP$_{01}$ mode has no cut-off; the next mode, LP$_{11}$, is cut off at the first zero of $J_0$, so the fibre is **single-mode** when

$$
V < 2.405 .
$$ {#eq-single-mode}
:::

::: proof
The form of $F$ makes it continuous at $r = a$. Continuity of $\dd F/\dd r$ requires $(u/a)J_l'(u)/J_l(u) = (w/a)K_l'(w)/K_l(w)$. The recurrence relations $uJ_l'(u) = uJ_{l-1}(u) - lJ_l(u)$ and $wK_l'(w) = -wK_{l-1}(w) - lK_l(w)$ turn this into $uJ_{l-1}/J_l - l = -wK_{l-1}/K_l - l$, which is [[#eq-lp-char]]. For $l = 0$ use $J_{-1} = -J_1$ and $K_{-1} = K_1$: $uJ_1(u)/J_0(u) = wK_1(w)/K_0(w)$.

At cut-off $w \to 0$ and $u \to V$. For $l \ge 1$, $K_{l-1}(w)/K_l(w) \to 0$ like $w$ (or $w\ln(1/w)$ for $l = 1$), so the right-hand side vanishes and $J_{l-1}(V) = 0$. For $l = 0$, $wK_1(w)/K_0(w) \to 1/\ln(1/w) \to 0$, which needs $J_1(V) = 0$; the first root is $V = 0$, so LP$_{01}$ exists at every $V$. The lowest cut-off of any other mode is that of LP$_{11}$, at the first zero of $J_0$, $2.405$.
:::

Each LP mode is a group of nearly degenerate exact modes (the HE, EH, TE and TM modes of the full vector theory). LP$_{01}$ is two-fold degenerate — two orthogonal polarisations — and LP$_{lm}$ with $l \ge 1$ four-fold ($\cos l\phi$ and $\sin l\phi$, two polarisations each). In a perfectly circular fibre the two polarisations of LP$_{01}$ travel at exactly the same speed; in a real fibre small asymmetries split them slightly, which causes polarisation-mode dispersion.

For a **multimode** fibre with $V \gg 1$, counting the roots of [[#eq-lp-char]] with their degeneracies gives the total number of modes

$$
M \approx \frac{V^2}{2} .
$$ {#eq-mode-number}

(A ray argument gives the same answer: the number of modes is the phase-space volume of guided rays — core area times the solid angle of acceptance, $\pi a^2\cdot\pi\,\mathrm{NA}^2$ — divided by $\lambda_0^2$, times two polarisations, which is $2\pi^2a^2\mathrm{NA}^2/\lambda_0^2 = V^2/2$.)

### The fundamental mode

The LP$_{01}$ mode looks very much like a Gaussian beam: a bell-shaped profile with exponential tails. Its normalised propagation constant $b = w^2/V^2$ (as in [[photonics/dielectric-waveguides#eq-b]]) is approximated for $1.5 < V < 2.5$ to within about $0.2\,\%$ by

$$
b(V) \approx \left(1.1428 - \frac{0.996}{V}\right)^2 ,
$$ {#eq-b-approx}

and the field is approximated by a Gaussian $e^{-r^2/w^2}$ with **mode-field radius** given by Marcuse's formula

$$
\frac{w}{a} \approx 0.65 + \frac{1.619}{V^{3/2}} + \frac{2.879}{V^6} .
$$ {#eq-marcuse}

The **mode-field diameter** $\mathrm{MFD} = 2w$ is the quantity that fibre data sheets specify, because it determines splice and connector losses and coupling to lasers, not the core diameter.

::: widget plot
f: 0.65 + 1.619*x^(-1.5) + 2.879*x^(-6); 1
x: 1.2, 4
y: 0, 3
vlines: 2.405
labels: w/a\ \text{(Marcuse)}; \text{core radius}
caption: The mode-field radius of the LP$_{01}$ mode in units of the core radius, against the V-number, from Marcuse's approximation [[#eq-marcuse]]; the vertical line marks the single-mode limit $V = 2.405$. At $V \approx 2.4$ the mode is only slightly larger than the core. Move left to smaller $V$ (longer wavelength, or a smaller core): the mode spreads into the cladding rapidly, becoming easy to couple but sensitive to bends. Standard fibres operate at $V \approx 2$ at $1550\,\mathrm{nm}$, where the mode radius is about $1.25a$.
:::

::: example Standard single-mode fibre {#ex-smf}
A step-index fibre has a core radius $a = 4.1\,\mathrm{\mu m}$, a cladding of index $n_2 = 1.444$ and $\Delta = 0.36\,\%$. Find $n_1$, the NA, the acceptance angle, the V-number at $1550\,\mathrm{nm}$, the cut-off wavelength of LP$_{11}$, the effective index of LP$_{01}$ and the mode-field diameter.
::: solution
$n_1 = n_2/(1 - \Delta) = 1.4492$. $\mathrm{NA} = \sqrt{1.4492^2 - 1.444^2} = 0.123$, and the acceptance angle is $\arcsin0.123 = 7.1^\circ$ — small, which is why light must be focused carefully into the core. At $1550\,\mathrm{nm}$,

$$
V = \frac{2\pi\times4.1}{1.55}\times0.123 = 2.04 .
$$

The fibre is single-mode for $V < 2.405$, i.e. for wavelengths above the **cut-off wavelength** $\lambda_c = 2\pi a\,\mathrm{NA}/2.405 = 1.32\,\mathrm{\mu m}$. (Data sheets quote a lower "cable cut-off", below $1260\,\mathrm{nm}$, because LP$_{11}$ just above its theoretical cut-off is so weakly bound that bends in a cable strip it within metres.)

From [[#eq-b-approx]], $b = (1.1428 - 0.996/2.042)^2 = 0.429$ (solving [[#eq-lp-char]] numerically gives $0.4296$), and $n_{\mathrm{eff}} = \sqrt{n_2^2 + b(n_1^2 - n_2^2)} = 1.4462$. Marcuse's formula gives $w/a = 0.65 + 1.619/2.042^{1.5} + 2.879/2.042^6 = 0.65 + 0.555 + 0.040 = 1.245$, so $w = 5.10\,\mathrm{\mu m}$ and $\mathrm{MFD} = 10.2\,\mathrm{\mu m}$ — the value on the data sheet of the most common fibre in the world, ITU-T G.652.
:::
:::

::: example A multimode fibre {#ex-mmf}
A multimode fibre for local networks has a $50\,\mathrm{\mu m}$ core diameter and $\mathrm{NA} = 0.20$. How many modes does it carry at $850\,\mathrm{nm}$? What core radius would make it single-mode at that wavelength?
::: solution
$V = (2\pi\times25/0.85)\times0.20 = 37.0$ and $M \approx V^2/2 = 683$ modes. For single-mode operation, $a < 2.405\lambda_0/(2\pi\,\mathrm{NA}) = 2.405\times0.85/(2\pi\times0.2) = 1.63\,\mathrm{\mu m}$: a core $3.3\,\mathrm{\mu m}$ across, impractical to couple cheap light sources into. The large core of multimode fibre is its attraction: inexpensive LEDs and vertical-cavity lasers can be aligned to it with plastic optics.
:::
:::

## Attenuation {#sec-attenuation}

::: definition Attenuation coefficient {#def-attenuation}
The power in a fibre decays exponentially, $P(z) = P(0)e^{-\alpha_pz}$. Engineers quote the **attenuation coefficient** in decibels per kilometre,

$$
\alpha = \frac{10}{L}\log_{10}\frac{P(0)}{P(L)} = 4.343\,\alpha_p ,
$$ {#eq-attenuation}

so that the loss of a fibre of length $L$ is $\alpha L$ decibels. Powers are usually expressed in **dBm**, $P_{\mathrm{dBm}} = 10\log_{10}(P/1\,\mathrm{mW})$, and then a link is a subtraction: $P_{\mathrm{out}}[\mathrm{dBm}] = P_{\mathrm{in}}[\mathrm{dBm}] - \alpha L - (\text{other losses in dB})$.
:::

Three intrinsic mechanisms set the loss of pure silica, and their sum has a minimum near $1550\,\mathrm{nm}$.

- **Rayleigh scattering** by frozen-in fluctuations of density and composition, on a scale much smaller than a wavelength. Like the scattering that makes the sky blue, it varies as $\lambda^{-4}$: approximately $\alpha_R \approx A/\lambda^4$ with $A \approx 0.7$–$0.9\,\mathrm{dB\,km^{-1}\,\mu m^4}$ for germanium-doped cores. It dominates below $1.6\,\mathrm{\mu m}$.
- **Infrared absorption** by vibrations of the Si–O bonds, whose fundamental resonance near $9\,\mathrm{\mu m}$ has a tail reaching into the near infrared, roughly $\alpha_{IR} \approx 7.8\times10^{11}\exp(-48.48/\lambda)\,\mathrm{dB/km}$ with $\lambda$ in micrometres. It rises steeply beyond $1.6\,\mathrm{\mu m}$.
- **Ultraviolet absorption** by electronic transitions, whose tail is small in the near infrared.

To these add extrinsic losses: absorption by impurities — above all **hydroxyl (OH) ions**, whose vibration overtone at $1383\,\mathrm{nm}$ produced a large "water peak" in early fibres, now nearly eliminated in **low-water-peak** fibres — and **bending losses**. A bend makes the outer part of the mode travel faster than light in the cladding allows, so it radiates; **macrobending** loss rises exponentially as the bend radius shrinks below a few centimetres, and **microbending** by small random deformations in a cable adds a background loss. Longer wavelengths, with larger mode fields, are more sensitive to both.

::: widget plot
f: 0.8/x^4 + 7.8e11*exp(-48.48/x) + h*exp(-((x - 1.383)/0.012)^2); 0.8/x^4; 7.8e11*exp(-48.48/x)
x: 0.8, 1.75
y: 0, 2
sliders: h=0.5:0:2:0.05
labels: \text{total}; \text{Rayleigh}; \text{IR absorption}
caption: A model of the attenuation of silica fibre in dB/km against wavelength in micrometres: Rayleigh scattering $0.8/\lambda^4$ (orange), infrared absorption (green) and an OH absorption peak at $1383\,\mathrm{nm}$ of height $h$. Their sum (blue) has its minimum, about $0.16\,\mathrm{dB/km}$, near $1.55\,\mathrm{\mu m}$; real fibres add a few hundredths of a dB/km for imperfections. Set $h = 2$, typical of fibres of the 1980s: the O and C bands are separated by an unusable region. Set $h = 0$, as in modern low-water-peak fibre: the whole range from $1260$ to $1625\,\mathrm{nm}$ can be used.
:::

The wavelength range used for communication is divided into **bands**: O ($1260$–$1360\,\mathrm{nm}$, "original"), E ($1360$–$1460$, "extended"), S ($1460$–$1530$, "short"), C ($1530$–$1565$, "conventional"), L ($1565$–$1625$, "long") and U ($1625$–$1675$). Most long-haul systems use the C and L bands, where loss is lowest and erbium-doped amplifiers work; short links in data centres use the O band, where dispersion is lowest. Multimode links use $850\,\mathrm{nm}$, where silicon detectors and cheap GaAs lasers work and the higher loss (about $2.5\,\mathrm{dB/km}$) does not matter over a few hundred metres.

::: quiz
A standard single-mode fibre (cut-off $1260\,\mathrm{nm}$) is used with an $850\,\mathrm{nm}$ source. What happens?
- [ ] Nothing changes: a single-mode fibre is single-mode at every wavelength
- [x] $V$ rises above $2.405$, so a few modes propagate and modal dispersion appears
- [ ] No light is guided, because $850\,\mathrm{nm}$ is below the cut-off
- [ ] The fibre carries hundreds of modes, like a $50\,\mathrm{\mu m}$ multimode fibre
::: solution
$V \propto 1/\lambda_0$, so at $850\,\mathrm{nm}$ it is $1260/850 = 1.48$ times its value at cut-off, about $3.6$. Then LP$_{01}$, LP$_{11}$ and (above $V = 3.83$) further modes start to propagate — here two mode groups, six modes counting polarisations and orientations. The fundamental mode is always guided; "cut-off" refers to the second mode. A few-mode fibre suffers modal dispersion and modal noise, so the combination is avoided.
:::
:::

::: example A power budget {#ex-budget}
A transmitter launches $0\,\mathrm{dBm}$ ($1\,\mathrm{mW}$) into $80\,\mathrm{km}$ of fibre with $\alpha = 0.20\,\mathrm{dB/km}$ (including splices), with a connector of $0.5\,\mathrm{dB}$ loss at each end. The receiver needs $-28\,\mathrm{dBm}$ for the required error rate. Find the received power, the margin, and the longest possible span if a $3\,\mathrm{dB}$ margin must be kept for ageing and repairs.
::: solution
The received power is $0 - 0.20\times80 - 2\times0.5 = -17\,\mathrm{dBm}$ ($20\,\mathrm{\mu W}$). The margin is $-17 - (-28) = 11\,\mathrm{dB}$. Keeping $3\,\mathrm{dB}$ in reserve, the fibre may lose $28 - 1 - 3 = 24\,\mathrm{dB}$, so $L_{\max} = 24/0.20 = 120\,\mathrm{km}$ — provided that dispersion, examined next, does not limit the link first.
:::
:::

::: warning Decibels of optical power
Optical powers are measured as *power*, so $3\,\mathrm{dB}$ is a factor of $2$ and $10\,\mathrm{dB}$ a factor of $10$; there is no "$20\log$" for optical power. But a photodiode's current is proportional to optical power, so the *electrical* power of the detected signal is proportional to the square of the optical power: $1\,\mathrm{dB}$ of optical loss costs $2\,\mathrm{dB}$ of electrical signal-to-noise ratio in a receiver limited by thermal noise. Always say whether a decibel figure is optical or electrical.
:::

## Modal dispersion {#sec-modal}

A short pulse launched into a multimode fibre excites many modes, and each mode travels at its own group velocity. In the ray picture, a ray along the axis travels the shortest path, while a ray at the critical angle zigzags and travels farther. The pulse emerges spread out over the spread of arrival times.

::: theorem Modal delay spread of a step-index fibre {#thm-modal}
In a step-index multimode fibre of length $L$, the difference between the arrival times of the slowest and fastest rays is

$$
\Delta\tau = \frac{Ln_1}{c}\cdot\frac{n_1 - n_2}{n_2} \approx \frac{Ln_1\Delta}{c} .
$$ {#eq-modal}
:::

::: proof
A meridional ray at angle $\theta$ to the axis travels a path $L/\cos\theta$ at speed $c/n_1$ (neglecting material dispersion), taking $t(\theta) = Ln_1/(c\cos\theta)$. The axial ray takes $Ln_1/c$. The steepest guided ray meets the boundary at the critical angle, so $\cos\theta_{\max} = \sin\theta_c = n_2/n_1$, and it takes $Ln_1^2/(cn_2)$. The difference is $(Ln_1/c)(n_1/n_2 - 1) = (Ln_1/c)(n_1 - n_2)/n_2 \approx Ln_1\Delta/c$.
:::

For $n_1 = 1.48$ and $\Delta = 1\,\%$ this is $49\,\mathrm{ns/km}$. If we require the spread to be less than a bit period, $B\Delta\tau < 1$, then $BL < c/(n_1\Delta) = 20\,\mathrm{Mb/s\cdot km}$: a step-index multimode fibre can carry $20\,\mathrm{Mb/s}$ over one kilometre, which is useless for modern networks.

### Graded-index fibres

The cure is to make the core index highest on the axis and fall towards the cladding, so that rays that travel farther also travel faster, through lower-index glass. The **power-law profile**

$$
n^2(r) = n_1^2\left[1 - 2\Delta\left(\frac{r}{a}\right)^{g}\right], \quad r < a ,
$$ {#eq-graded}

with $g = 2$ (parabolic) is nearly optimal: rays then follow sinusoidal paths that refocus periodically, like a chain of lenses.

::: theorem Modal dispersion of a graded-index fibre {#thm-graded}
For the optimum profile exponent $g \approx 2(1 - \Delta)$, the modal delay spread of a graded-index fibre is

$$
\Delta\tau \approx \frac{Ln_1\Delta^2}{8c} ,
$$ {#eq-graded-spread}

smaller than that of a step-index fibre with the same $\Delta$ by the factor $\Delta/8$.
:::

::: proof
A sketch; see Okamoto, Chapter 3, or Agrawal, Chapter 2. In the WKB approximation, the group delay of the mode group with propagation constant $\beta$ in a power-law profile is $\tau(\beta) = (LN_1/c)[1 + \tfrac{g - 2}{g + 2}\delta + \tfrac{3g - 2}{2(g + 2)}\delta^2 + \dots]$ with $\delta = (n_1^2k_0^2 - \beta^2)/(2n_1^2k_0^2)$ ranging from $0$ for the lowest mode to $\Delta$ for the highest. For a step profile ($g \to \infty$) the linear term gives $\Delta\tau \approx LN_1\Delta/c$, as in [[#thm-modal]]. For $g = 2$ the linear term vanishes and the quadratic term gives $\Delta\tau = LN_1\Delta^2/(2c)$; choosing $g$ slightly below $2$ so that the linear term partly cancels the quadratic one over the range $0 \le \delta \le \Delta$ reduces the spread further, to $LN_1\Delta^2/(8c)$. Material dispersion of the dopant changes the optimum slightly and makes it wavelength-dependent.
:::

With $n_1 = 1.48$ and $\Delta = 1\,\%$, [[#eq-graded-spread]] gives $62\,\mathrm{ps/km}$, nearly a thousand times better than the step profile. In practice the index profile cannot be made exactly optimal, and multimode fibres are specified by their **effective modal bandwidth**: $500\,\mathrm{MHz\cdot km}$ for older OM2 fibre at $850\,\mathrm{nm}$, $4700\,\mathrm{MHz\cdot km}$ for OM4. That is enough for $10$–$100\,\mathrm{Gb/s}$ over a few hundred metres inside a building.

::: quiz
A graded-index fibre and a step-index fibre have the same $n_1 = 1.47$ and $\Delta = 1.5\,\%$. Roughly how many times smaller is the modal delay spread of the (optimally) graded fibre?
- [ ] $8$
- [ ] $67$
- [x] $530$
- [ ] $1.5\times10^{4}$
::: solution
The ratio of [[#eq-modal]] to [[#eq-graded-spread]] is $8/\Delta = 8/0.015 = 533$. The improvement is largest for small $\Delta$ — but a small $\Delta$ also means a small NA, so the fibre accepts less light.
:::
:::

## Chromatic dispersion {#sec-chromatic}

A single-mode fibre has no modal dispersion, but its one mode still has a group velocity that depends on wavelength, and any real signal occupies a range of wavelengths: the spectral width of the source and the bandwidth of the modulation. Different spectral components arrive at different times.

::: definition Dispersion parameter {#def-dispersion}
The group delay per unit length of a mode is $\tau_g/L = 1/v_g = \beta_1 = \dd\beta/\dd\omega$. The **dispersion parameter** is the rate at which this delay changes with wavelength,

$$
D = \frac{\dd}{\dd\lambda_0}\left(\frac{1}{v_g}\right) = -\frac{2\pi c}{\lambda_0^2}\beta_2, \qquad \beta_2 = \frac{\dd^2\beta}{\dd\omega^2} ,
$$ {#eq-D}

usually quoted in $\mathrm{ps/(nm\cdot km)}$. A signal of spectral width $\Delta\lambda$ is spread in time by

$$
\Delta\tau = \lvert D\rvert L\,\Delta\lambda .
$$ {#eq-chromatic-spread}

$D > 0$ (**anomalous dispersion**, $\beta_2 < 0$) means that longer wavelengths are slower; $D < 0$ (**normal dispersion**) means they are faster.
:::

Two effects contribute, and to a good approximation $D = D_M + D_W$.

**Material dispersion** comes from the wavelength dependence of the glass index. Since $1/v_g = N/c$ with $N = n - \lambda_0\,\dd n/\dd\lambda_0$ ([[photonics/optical-waves#thm-group]]),

$$
D_M = \frac{1}{c}\frac{\dd N}{\dd\lambda_0} = -\frac{\lambda_0}{c}\frac{\dd^2n}{\dd\lambda_0^2} .
$$ {#eq-DM}

For fused silica, evaluating the Sellmeier equation [[photonics/optical-waves#eq-sellmeier]] gives $D_M = -84\,\mathrm{ps/(nm\cdot km)}$ at $850\,\mathrm{nm}$, zero at $1.27\,\mathrm{\mu m}$ and $+22\,\mathrm{ps/(nm\cdot km)}$ at $1550\,\mathrm{nm}$. The zero is where the group index has its minimum.

**Waveguide dispersion** comes from the guiding itself: as the wavelength increases, $V$ falls, the mode spreads into the lower-index cladding and $n_{\mathrm{eff}}$ falls, even with no material dispersion. For a standard step-index fibre $D_W$ is negative, a few $\mathrm{ps/(nm\cdot km)}$, which shifts the zero of the total to about $1310\,\mathrm{nm}$ and leaves $D \approx 17\,\mathrm{ps/(nm\cdot km)}$ at $1550\,\mathrm{nm}$. By designing more elaborate index profiles (a smaller, higher-index core, or rings and trenches), $D_W$ can be made larger: **dispersion-shifted fibre** (G.653) has its zero at $1550\,\mathrm{nm}$, and **non-zero dispersion-shifted fibre** (G.655) keeps a small $D$ of $2$–$6\,\mathrm{ps/(nm\cdot km)}$ in the C band, small enough to reduce pulse spreading but large enough to suppress the four-wave mixing between WDM channels that zero dispersion would allow.

### Pulse broadening

When the source is very narrow (a single-frequency laser), the spectral width is set by the modulation itself, and the broadening of a pulse can be calculated exactly.

::: theorem Broadening of a Gaussian pulse {#thm-gaussian-pulse}
An unchirped Gaussian pulse with envelope $A(0, t) = e^{-t^2/2T_0^2}$ (so that its intensity has $1/e$ half-width $T_0$) travels a distance $z$ in a fibre with group-velocity dispersion $\beta_2$. Its envelope remains Gaussian, with half-width

$$
T(z) = T_0\sqrt{1 + \left(\frac{z}{L_D}\right)^2}, \qquad L_D = \frac{T_0^2}{\lvert\beta_2\rvert} ,
$$ {#eq-pulse-width}

where $L_D$ is the **dispersion length**. The peak intensity falls by the same factor, and the pulse acquires a linear frequency sweep (chirp).
:::

::: proof
In a frame moving at the group velocity, each frequency component $\omega$ of the envelope (measured from the carrier) gains the phase $\tfrac12\beta_2\omega^2z$ from the second-order term of $\beta(\omega)$ (the first-order term is the group delay, removed by the moving frame). The spectrum of the input is $\tilde A(0, \omega) = \sqrt{2\pi}T_0e^{-\omega^2T_0^2/2}$, so

$$
A(z, t) = \frac{1}{2\pi}\int\tilde A(0, \omega)e^{j\beta_2\omega^2z/2}e^{j\omega t}\,\dd\omega = \frac{T_0}{\sqrt{T_0^2 - j\beta_2z}}\exp\!\left(-\frac{t^2}{2(T_0^2 - j\beta_2z)}\right),
$$

using the Gaussian integral $\int e^{-p\omega^2 + j\omega t}\dd\omega = \sqrt{\pi/p}\,e^{-t^2/4p}$ with $p = (T_0^2 - j\beta_2z)/2$. The intensity is $\abs A^2 = (T_0/T)\exp(-t^2/T^2)$ with $T^2 = (T_0^4 + \beta_2^2z^2)/T_0^2$, which is [[#eq-pulse-width]]. The imaginary part of the exponent is a phase quadratic in $t$, i.e. a frequency varying linearly across the pulse.
:::

::: widget plot
f: exp(-x^2); exp(-x^2/(1 + z^2))/sqrt(1 + z^2)
x: -6, 6
y: 0, 1.05
sliders: z=1:0:5:0.05
labels: \text{input}; \text{after } z = \xi L_D
caption: Intensity of a Gaussian pulse against time in units of its initial half-width $T_0$, at the input (blue) and after a distance $\xi$ dispersion lengths (orange; slider $z$). At $\xi = 1$ the pulse is $\sqrt2$ times wider; beyond a few dispersion lengths the width grows linearly with distance and the peak falls, the energy being conserved. A pulse twice as short has a dispersion length four times smaller: short pulses spread fastest, which is why dispersion limits high bit rates so severely.
:::

::: example The dispersion limit at 10 Gb/s {#ex-disp-limit}
A $10\,\mathrm{Gb/s}$ signal at $1550\,\mathrm{nm}$ from a narrow-linewidth laser with an external modulator is sent over standard fibre with $D = 17\,\mathrm{ps/(nm\cdot km)}$. Using the criterion that the root-mean-square width $\sigma$ of the received pulses must not exceed a quarter of the bit period, estimate the longest link without dispersion compensation. Compare a directly modulated multimode laser with $\Delta\lambda = 2\,\mathrm{nm}$.
::: solution
First convert $D$: $\beta_2 = -D\lambda_0^2/(2\pi c) = -17\times10^{-6}\,\mathrm{s/m^2}\times(1.55\times10^{-6})^2/(2\pi\times3\times10^8) = -2.17\times10^{-26}\,\mathrm{s^2/m} = -21.7\,\mathrm{ps^2/km}$.

For a Gaussian pulse the rms width is $\sigma = T/\sqrt2$, and [[#eq-pulse-width]] gives $\sigma^2 = \sigma_0^2 + (\beta_2L/2\sigma_0)^2$. This is smallest, for a given $L$, when the input width is $\sigma_0 = \sqrt{\lvert\beta_2\rvert L/2}$, giving $\sigma = \sqrt{\lvert\beta_2\rvert L}$. The criterion $4B\sigma \le 1$ becomes

$$
B^2\lvert\beta_2\rvert L \le \frac{1}{16}, \qquad L \le \frac{1}{16\times10^{20}\times2.17\times10^{-26}} = 28.8\,\mathrm{km}.
$$

Real 10 Gb/s systems reach $40$–$80\,\mathrm{km}$ by accepting a $1$–$2\,\mathrm{dB}$ penalty; beyond that, dispersion must be compensated. Note the $1/B^2$ scaling: at $2.5\,\mathrm{Gb/s}$ the limit is sixteen times longer, $460\,\mathrm{km}$, and at $40\,\mathrm{Gb/s}$ sixteen times shorter, under $2\,\mathrm{km}$.

With a $2\,\mathrm{nm}$-wide source, the source width dominates: [[#eq-chromatic-spread]] gives a spread $\lvert D\rvert L\Delta\lambda = 34\,\mathrm{ps}$ per kilometre. Taking this as the rms width and requiring $4B\sigma \le 1$ gives $BL \le 1/(4\times34\,\mathrm{ps/km}) = 7.4\,\mathrm{Gb/s\cdot km}$: under a kilometre at $10\,\mathrm{Gb/s}$. That is why long-distance links need single-frequency lasers.
:::
:::

::: warning Criteria for "too much dispersion"
Different books require $B\Delta\tau < 1$, $B\Delta\tau < \tfrac12$ or $4B\sigma < 1$, and use full widths, half-widths or rms widths. The resulting bit-rate–distance products differ by factors of two or more. The scaling laws are robust — $BL$ fixed for a broad source, $B^2L$ fixed for a narrow one — but a specific number is only meaningful together with its criterion. For design, use the criterion of the relevant standard or, better, compute the power penalty.
:::

### Polarisation-mode dispersion

A real fibre is not perfectly circular, and stresses from cabling make it slightly birefringent. The two polarisations of LP$_{01}$ then travel at slightly different speeds, and because the birefringence varies randomly along the fibre, the differential group delay grows like a random walk, as the square root of length: $\langle\Delta\tau\rangle = D_{\mathrm{PMD}}\sqrt L$. Modern fibres have $D_{\mathrm{PMD}} \le 0.1\,\mathrm{ps/\sqrt{km}}$, giving about $3\,\mathrm{ps}$ over $1000\,\mathrm{km}$ — negligible at $10\,\mathrm{Gb/s}$ but significant at $40\,\mathrm{Gb/s}$ with direct detection. Fibres installed in the 1980s can be ten times worse. Coherent receivers ([[photonics/optical-communication]]) undo both chromatic and polarisation-mode dispersion with digital filters.

::: example Choosing a fibre for a campus link {#ex-campus}
A $1\,\mathrm{Gb/s}$ link must connect buildings $2\,\mathrm{km}$ apart. Compare (a) step-index multimode fibre with $n_1 = 1.48$, $\Delta = 1\,\%$; (b) ideal graded-index fibre with the same $n_1$ and $\Delta$; (c) graded-index OM2 fibre with an effective modal bandwidth of $500\,\mathrm{MHz\cdot km}$; (d) standard single-mode fibre at $1310\,\mathrm{nm}$ with a $1\,\mathrm{nm}$-wide Fabry–Pérot laser and $\lvert D\rvert \le 3.5\,\mathrm{ps/(nm\cdot km)}$ over the laser's possible wavelengths. Use $B\Delta\tau < 1$ for the modal cases.
::: solution
(a) $\Delta\tau = Ln_1\Delta/c = 2000\times1.48\times0.01/3\times10^8 = 98.7\,\mathrm{ns}$. $B\Delta\tau = 99$: impossible.

(b) $\Delta\tau = Ln_1\Delta^2/8c = 123\,\mathrm{ps}$, $B\Delta\tau = 0.12$: comfortable, in theory.

(c) A modal bandwidth of $500\,\mathrm{MHz\cdot km}$ gives $250\,\mathrm{MHz}$ over $2\,\mathrm{km}$; a $1\,\mathrm{Gb/s}$ NRZ signal needs roughly $0.7B = 700\,\mathrm{MHz}$. Real multimode fibre fails: the profile is not ideal. (The Gigabit Ethernet standard limits such fibre to about $550\,\mathrm m$.)

(d) $\Delta\tau = \lvert D\rvert L\Delta\lambda = 3.5\times2\times1 = 7\,\mathrm{ps}$, trivially small compared with the $1\,\mathrm{ns}$ bit period, and the loss is under $1\,\mathrm{dB}$. Single-mode fibre is the right choice; for links over a few hundred metres it has displaced multimode fibre almost everywhere outside data-centre rooms.
:::
:::

::: application Fibres beyond telecommunications
**Hollow-core fibres**, which guide light in air by a photonic band gap or by antiresonant glass membranes, reached losses near $0.1\,\mathrm{dB/km}$ in the 2020s and carry light $50\,\%$ faster than solid glass — attractive for low-latency links between financial exchanges and data centres. **Multicore fibres** put several cores in one cladding to multiply capacity. **Fibre Bragg gratings**, periodic index changes written into the core with ultraviolet light, reflect a narrow band around $\lambda_B = 2n_{\mathrm{eff}}\Lambda$ and serve as filters, laser mirrors and strain and temperature sensors in bridges, aircraft wings and oil wells. **Distributed acoustic sensing** sends pulses down an ordinary telecom fibre and analyses the Rayleigh back-scatter to hear vibrations along tens of kilometres.
:::

::: history
Daniel Colladon in 1842 and John Tyndall in 1854 demonstrated light guided in a jet of water. Bundles of glass fibres for transmitting images were patented in the 1920s by Clarence Hansell and John Logie Baird, and in 1954 Harold Hopkins and Narinder Kapany in London reported an imaging fibre bundle, while Abraham van Heel in Delft showed that coating each fibre with a lower-index cladding prevented light leaking between them. Clad glass fibres made the first fibre-optic gastroscope possible (Basil Hirschowitz, Lawrence Curtiss and Wilbur Peters, 1957). In 1966 Charles Kao and George Hockham argued that impurities, not glass itself, caused the enormous losses of the time and that losses below $20\,\mathrm{dB/km}$ were possible; Robert Maurer, Donald Keck and Peter Schultz at Corning made such a fibre in 1970 by depositing ultra-pure silica from the vapour phase. By 1979 NTT had reached $0.2\,\mathrm{dB/km}$ at $1550\,\mathrm{nm}$, close to the Rayleigh limit. The first commercial fibre systems carried telephone traffic in 1977, and the first transatlantic fibre cable, TAT-8, entered service in 1988.
:::

## Where this leads

The power and dispersion budgets of this chapter are the core of link design in [[photonics/optical-communication]], where they are combined with receiver sensitivity from [[photonics/photodetectors]], with optical amplifiers that make attenuation a repeated rather than a cumulative problem, and with coherent receivers that remove dispersion digitally. The narrow-linewidth lasers that dispersion demands are the subject of [[photonics/light-sources]]. Bessel functions, used here for the circular core, are treated in Maths Atlas; the analogous metal waveguide problem is in [[rf-microwave/waveguides]].

::: summary
- A step-index fibre is described by $\Delta \approx (n_1 - n_2)/n_1$, $\mathrm{NA} = n_1\sqrt{2\Delta}$ and $V = 2\pi a\,\mathrm{NA}/\lambda_0$.
- In the weakly guiding approximation the modes are LP$_{lm}$, with Bessel-function fields; the fibre is single-mode for $V < 2.405$, and a multimode fibre carries about $V^2/2$ modes.
- The fundamental mode is nearly Gaussian; its mode-field diameter (about $10\,\mathrm{\mu m}$ at $1550\,\mathrm{nm}$ in standard fibre) sets coupling and splice losses.
- Attenuation, $\alpha$ in dB/km, comes from Rayleigh scattering ($\propto\lambda^{-4}$), infrared absorption and impurities, with a minimum of about $0.16$–$0.2\,\mathrm{dB/km}$ near $1550\,\mathrm{nm}$.
- Modal dispersion spreads pulses by $Ln_1\Delta/c$ in step-index fibre and about $Ln_1\Delta^2/8c$ with an optimum graded profile.
- Chromatic dispersion $D = D_M + D_W$ is zero near $1310\,\mathrm{nm}$ and about $17\,\mathrm{ps/(nm\cdot km)}$ at $1550\,\mathrm{nm}$ in standard fibre; it spreads pulses by $\lvert D\rvert L\Delta\lambda$.
- With a narrow source, dispersion limits $B^2L$ ($B^2\lvert\beta_2\rvert L \le 1/16$, about $29\,\mathrm{km}$ at $10\,\mathrm{Gb/s}$); with a broad source it limits $BL$.
:::

## Exercises

::: exercise Numerical aperture {level=1 check="sqrt(1.465^2-1.46^2)"}
A fibre has $n_1 = 1.465$ and $n_2 = 1.460$. Find its NA, its relative index difference and its acceptance half-angle in air. Give the NA.
::: solution
$\mathrm{NA} = \sqrt{1.465^2 - 1.460^2} = \sqrt{0.014625} = 0.121$. $\Delta = (n_1^2 - n_2^2)/2n_1^2 = 0.014625/4.292 = 0.34\,\%$. $\theta_a = \arcsin0.121 = 6.9^\circ$.
:::
:::

::: exercise Cut-off wavelength {level=1 check="2*pi*4.5e-6*0.11/2.405"}
A step-index fibre has core radius $4.5\,\mathrm{\mu m}$ and NA $0.11$. Find the cut-off wavelength of its LP$_{11}$ mode, in metres.
::: solution
$\lambda_c = 2\pi a\,\mathrm{NA}/2.405 = 2\pi\times4.5\times0.11/2.405\,\mathrm{\mu m} = 1.293\,\mathrm{\mu m} = 1.29\times10^{-6}\,\mathrm m$. The fibre is single-mode above this wavelength.
:::
:::

::: exercise Received power {level=1 check="10*log10(2)-0.22*60-3*0.3"}
A laser launches $2\,\mathrm{mW}$ into $60\,\mathrm{km}$ of fibre with $0.22\,\mathrm{dB/km}$; there are three connectors of $0.3\,\mathrm{dB}$ each. Find the received power in dBm.
::: solution
$2\,\mathrm{mW} = 3.01\,\mathrm{dBm}$. The losses are $0.22\times60 = 13.2\,\mathrm{dB}$ plus $0.9\,\mathrm{dB}$. The received power is $3.01 - 14.1 = -11.1\,\mathrm{dBm}$, about $78\,\mathrm{\mu W}$.
:::
:::

::: exercise Modal dispersion {level=2 check="1/(1000*1.5*0.005/299792458)"}
A step-index multimode fibre has $n_1 = 1.50$ and $\Delta = 0.5\,\%$. Find the modal delay spread per kilometre and, with the criterion $B\Delta\tau < 1$, the largest bit rate over $1\,\mathrm{km}$, in bit/s.
::: solution
$\Delta\tau = Ln_1\Delta/c = 1000\times1.5\times0.005/2.998\times10^8 = 25\,\mathrm{ns}$. $B < 1/\Delta\tau = 4.0\times10^7\,\mathrm{bit/s}$, $40\,\mathrm{Mb/s}$.
:::
:::

::: exercise Chromatic spreading from an LED {level=2 check="84e-12*40*1"}
An $850\,\mathrm{nm}$ LED with spectral width $40\,\mathrm{nm}$ drives a $1\,\mathrm{km}$ graded-index fibre. Taking $\lvert D\rvert = 84\,\mathrm{ps/(nm\cdot km)}$ (material dispersion of silica), find the chromatic delay spread in seconds and compare it with the modal spread of an ideal graded fibre with $n_1 = 1.48$, $\Delta = 1\,\%$.
::: solution
$\Delta\tau = \lvert D\rvert L\Delta\lambda = 84\times1\times40 = 3360\,\mathrm{ps} = 3.36\times10^{-9}\,\mathrm s$. The ideal modal spread is $62\,\mathrm{ps}$, fifty times smaller: with an LED source, chromatic dispersion dominates and limits the link to a few hundred Mb/s·km. This is why multimode links moved from LEDs to vertical-cavity lasers, with spectral widths below $1\,\mathrm{nm}$.
:::
:::

::: exercise Dispersion length {level=2 check="(20e-12)^2/(21.7e-27)"}
A Gaussian pulse with $T_0 = 20\,\mathrm{ps}$ travels in standard fibre with $\beta_2 = -21.7\,\mathrm{ps^2/km}$. Find the dispersion length in metres and the pulse width after $50\,\mathrm{km}$.
::: solution
$L_D = T_0^2/\lvert\beta_2\rvert = 400/21.7\,\mathrm{km} = 18.4\,\mathrm{km} = 1.84\times10^4\,\mathrm m$. After $50\,\mathrm{km}$, $T = 20\sqrt{1 + (50/18.4)^2} = 20\times2.90 = 58\,\mathrm{ps}$.
:::
:::

::: exercise Number of modes and the step-index delay {level=2}
(a) A step-index fibre with a $62.5\,\mathrm{\mu m}$ core and NA $0.275$ is used at $1300\,\mathrm{nm}$. Estimate the number of modes. (b) Show that the modal delay spread of [[#eq-modal]] can be written as $\Delta\tau \approx L\,\mathrm{NA}^2/(2n_1c)$, and evaluate it per kilometre for this fibre with $n_1 = 1.47$.
::: solution
(a) $V = (2\pi\times31.25/1.3)\times0.275 = 41.5$, so $M \approx V^2/2 = 862$. (b) $\mathrm{NA}^2 = n_1^2 - n_2^2 = 2n_1^2\Delta$, so $n_1\Delta = \mathrm{NA}^2/2n_1$ and $\Delta\tau = Ln_1\Delta/c = L\,\mathrm{NA}^2/(2n_1c)$. Numerically $1000\times0.0756/(2\times1.47\times3\times10^8) = 86\,\mathrm{ns}$ per km — which is why this fibre type was always made graded-index.
:::
:::

::: exercise Designing a single-mode fibre {level=3}
Design a step-index fibre (choose $a$ and $\Delta$, with $n_2 = 1.444$) that is single-mode for all wavelengths above $1260\,\mathrm{nm}$ and has a V-number as large as possible at $1550\,\mathrm{nm}$, subject to a mode-field diameter of at least $9.5\,\mathrm{\mu m}$ at $1550\,\mathrm{nm}$. Why do we want $V$ large at the operating wavelength?
::: hint
The cut-off condition fixes the product $a\,\mathrm{NA}$; then $V(1550) = 2.405\times1260/1550$. Use Marcuse's formula to get $w/a$ and hence $a$.
:::
::: solution
Single-mode above $1260\,\mathrm{nm}$ means $V(1260\,\mathrm{nm}) \le 2.405$; to make $V$ as large as possible, take equality: $a\,\mathrm{NA} = 2.405\times1.26/2\pi = 0.482\,\mathrm{\mu m}$. At $1550\,\mathrm{nm}$, $V = 2.405\times1260/1550 = 1.955$. Marcuse: $w/a = 0.65 + 1.619/1.955^{1.5} + 2.879/1.955^6 = 0.65 + 0.592 + 0.051 = 1.293$. For $\mathrm{MFD} = 2w \ge 9.5\,\mathrm{\mu m}$, $a \ge 4.75/1.293 = 3.67\,\mathrm{\mu m}$. Choosing $a = 4.1\,\mathrm{\mu m}$ (MFD $10.6\,\mathrm{\mu m}$) gives $\mathrm{NA} = 0.482/4.1 = 0.1176$ and $\Delta = \mathrm{NA}^2/2n_1^2 \approx 0.33\,\%$, $n_1 = 1.4488$ — essentially standard G.652 fibre. A larger $V$ at the operating wavelength keeps the mode well confined, which minimises bend and microbend losses; the constraint on cut-off stops us from increasing it further.
:::
:::

::: exercise Gaussian pulse with an optimum input width {level=3 check="sqrt(2*21.7e-27*100e3)"}
(a) Show that for a fixed length $L$ the output half-width $T(L)$ of [[#eq-pulse-width]] is minimised by the input half-width $T_0 = \sqrt{\lvert\beta_2\rvert L}$, and that the minimum output width is then $\sqrt2\,T_0$. (b) Find that minimum output half-width for $100\,\mathrm{km}$ of standard fibre ($\beta_2 = -21.7\,\mathrm{ps^2/km}$), in seconds. (c) What bit rate does it allow if $T$ must not exceed a quarter of a bit period?
::: solution
(a) $T^2 = T_0^2 + (\beta_2L)^2/T_0^2$; with $x = T_0^2$, $\dd T^2/\dd x = 1 - (\beta_2L)^2/x^2 = 0$ gives $x = \lvert\beta_2\rvert L$, and then $T^2 = 2\lvert\beta_2\rvert L$, i.e. $T = \sqrt2\,T_0$. (b) $T_{\min} = \sqrt{2\times21.7\times100}\,\mathrm{ps} = 65.9\,\mathrm{ps} = 6.6\times10^{-11}\,\mathrm s$. (c) $T \le 1/4B$ gives $B \le 1/(4\times65.9\,\mathrm{ps}) = 3.8\,\mathrm{Gb/s}$. (The rms criterion of [[#ex-disp-limit]] gives $5.4\,\mathrm{Gb/s}$ at $100\,\mathrm{km}$: the rms width of a Gaussian is $T/\sqrt2$, so a limit on it is $\sqrt2$ more lenient — another reminder that the criterion must be stated.)
:::
:::

::: exercise The ray-count derivation of the number of modes {level=3}
Derive $M \approx V^2/2$ by counting states: the number of modes equals the number of distinguishable ray directions and positions, i.e. the area of the core times the solid angle of acceptance, divided by $\lambda_0^2$ (one mode per $\lambda_0^2$ of area–solid-angle product, the étendue of a diffraction-limited beam), times two polarisations. Then apply it to a $200\,\mathrm{\mu m}$-core fibre with NA $0.22$ at $808\,\mathrm{nm}$, used to deliver pump light from a diode laser.
::: solution
The guided rays are those within the acceptance half-angle $\theta_a$ in air, whose solid angle is $2\pi(1 - \cos\theta_a) \approx \pi\theta_a^2 \approx \pi\,\mathrm{NA}^2$ for small NA. The core area is $\pi a^2$. The count is $2\times\pi a^2\times\pi\mathrm{NA}^2/\lambda_0^2 = 2\pi^2a^2\mathrm{NA}^2/\lambda_0^2 = \tfrac12(2\pi a\,\mathrm{NA}/\lambda_0)^2 = V^2/2$. For the pump fibre, $V = 2\pi\times100\times0.22/0.808 = 171$ and $M \approx 1.5\times10^4$ modes. Such fibres can accept the poor-quality beams of high-power diode-laser bars, whose étendue is far too large for a single-mode fibre.
:::
:::
