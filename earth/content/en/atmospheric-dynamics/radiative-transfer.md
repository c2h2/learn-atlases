The Earth absorbs $240\ \mathrm{W\,m^{-2}}$ and emits $240\ \mathrm{W\,m^{-2}}$, and the number is not the interesting part. What matters is that the incoming energy arrives as visible light at five hundred and seventy-seven degrees above the surface's own temperature, and leaves as infrared at sixty degrees below it — and that the atmosphere is almost perfectly transparent to the first and almost perfectly opaque to the second. Every degree of surface temperature, every cloud, every jet stream and every unit of sea-level rise is a consequence of that asymmetry, which follows from the quantum mechanics of the carbon dioxide, water and ozone molecules and from nothing else.

## Counting photons

::: definition Thermal emission and the two windows {#def-planck}
A body at temperature $T$ emits a Planck spectrum
$$
B_\nu(T) = \frac{2h\nu^{3}}{c^{2}}\,\frac{1}{e^{h\nu/kT} - 1}, \qquad
\lambda_{\max} = \frac{2898}{T}\ \mu\mathrm{m\,K}, \qquad
F = \varepsilon\sigma T^{4}, \quad \sigma = 5.67\times10^{-8}\ \mathrm{W\,m^{-2}\,K^{-4}},
$$
so the Sun ($T = 5772\ \mathrm{K}$) peaks at $0.50\ \mu\mathrm{m}$ in the visible and emits $6.3\times10^{7}\ \mathrm{W\,m^{-2}}$ per square metre of its own surface, while the Earth ($T = 288\ \mathrm{K}$) peaks at $10.1\ \mu\mathrm{m}$ in the thermal infrared and emits $390\ \mathrm{W\,m^{-2}}$. Wien's law separates the two by a factor of twenty in wavelength, and that separation is the greenhouse effect: a gas transparent at $0.5\ \mu\mathrm{m}$ and absorbing at $10\ \mu\mathrm{m}$ heats the surface, and no such gas could be in thermodynamic equilibrium with its own radiation at both wavelengths, which is Kirchhoff's law and the reason the effect cannot be argued away.

Molecular spectroscopy supplies the asymmetry by accident. Homonuclear diatomics — $78$ per cent of the atmosphere — have no dipole moment and are radiatively inert in the infrared. The remaining gases absorb where their vibrational modes happen to fall: water vapour across $5$–$8\ \mu\mathrm{m}$ and above $12\ \mu\mathrm{m}$ plus a pure-rotation band beyond $18\ \mu\mathrm{m}$; carbon dioxide at $4.3$ and $15\ \mu\mathrm{m}$; ozone at $9.6\ \mu\mathrm{m}$; methane at $7.7\ \mu\mathrm{m}$; nitrous oxide at $7.8$ and $17\ \mu\mathrm{m}$. Between $8.5$ and $13\ \mu\mathrm{m}$ almost nothing absorbs, and this atmospheric window carries roughly a quarter of the Earth's outgoing radiation straight to space — which is why it is the window every thermal infrared satellite, every night-vision device and every infrared astronomer uses, and why the CFCs, which absorb nowhere else, were so efficient a greenhouse technology.

Line shapes decide everything at the precision that matters. Pressure broadening makes each line wider at high pressure, so absorption in the lower troposphere is a quasi-continuum and in the stratosphere a set of needles; the carbon dioxide $15\ \mu\mathrm{m}$ band is already saturated at line centres throughout the troposphere, so doubling its concentration adds almost no absorption there and all of its effect comes from the wings and from the stratosphere — which is the physical origin of the logarithm below, and of the stratospheric cooling that is the fingerprint of greenhouse warming.
:::

::: definition Optical depth, the greenhouse effect and radiative-convective equilibrium {#def-greenhouse}
Radiation crossing an absorbing layer obeys Beer–Lambert,
$$
F = F_0\,e^{-\tau}, \qquad \tau = \int \kappa\rho\,\mathrm{d}z = \int \frac{\mathrm{d}z}{\ell},
$$
with $\tau$ the optical depth and $\ell$ the mean free path. Eddington–Barbier's theorem says the radiation escaping at any wavelength comes from the level where the slant optical depth reaches unity, so a satellite sees the surface in the window, the mid-troposphere in the water-vapour band, the lower stratosphere in the carbon dioxide band, and the mesosphere in the fifteen-micrometre core — which is exactly how the AIRS, IASI and CrIS sounders read a three-dimensional temperature field from space twice a day.

The greenhouse effect follows in three lines. Planetary balance requires an outgoing flux of $240\ \mathrm{W\,m^{-2}}$, which by Stefan–Boltzmann is emitted at an effective temperature
$$
T_e = \left(\frac{(1-\alpha)S_0/4}{\sigma}\right)^{1/4} = \left(\frac{238.5}{5.67\times10^{-8}}\right)^{1/4} = 255\ \mathrm{K}.
$$
In a lapse rate of $6.5\ \mathrm{K\,km^{-1}}$ from a surface at $288\ \mathrm{K}$, the $255$-K level lies at $5.1\ \mathrm{km}$, near $540\ \mathrm{hPa}$. Everything below that level is warmer than the radiating temperature, and the whole thirty-three-kelvin greenhouse effect is the statement that the atmosphere is opaque enough that space sees it from five kilometres up.

The grey Eddington atmosphere makes the arithmetic explicit:
$$
T^{4}(\tau) = \tfrac{3}{4}T_e^{4}\left(\tau + \tfrac{2}{3}\right) \;\Longrightarrow\; T_s = 255\left[\tfrac{3}{4}\left(\tau + \tfrac{2}{3}\right)\right]^{1/4},
$$
giving $214\ \mathrm{K}$ at the top, $255\ \mathrm{K}$ at $\tau = 2/3$ and $288\ \mathrm{K}$ at $\tau = 1.5$. The real atmosphere is not grey, and the correction is the subject: because the window at $8$–$13\ \mu\mathrm{m}$ lets surface radiation escape without being absorbed, the effective optical depth of the real atmosphere is about $1.5$ rather than the $3$ or $4$ its band-averaged absorptivity would suggest, and the window alone is responsible for roughly a quarter of the greenhouse effect's inefficiency. Water vapour supplies about half the total greenhouse absorption, carbon dioxide and the other long-lived gases about a quarter each, and clouds both add longwave opacity and reflect sunlight — with the net cloud effect close to $-0.7\ \mathrm{W\,m^{-2}}$, small in the global mean and the largest source of uncertainty in climate sensitivity.
:::

::: definition Scattering, aerosols and radiative forcing {#def-scattering}
Scattering removes radiation from a beam without absorbing it, and its wavelength dependence is the most familiar optics in nature. For particles much smaller than the wavelength, Rayleigh scattering gives
$$
\tau_{\mathrm{Ray}} \propto \lambda^{-4}, \qquad
\tau(0.40\ \mu\mathrm{m}) / \tau(0.55\ \mu\mathrm{m}) = (550/400)^{4} = 3.6,
$$
so the blue end of the spectrum scatters three and a half times more strongly than the green, which is why the sky is blue, the Sun at sunrise is red, the Twilight zone is visible from space, and the first quantitative explanation of a colour in nature was already complete in 1871. For particles comparable to the wavelength — cloud droplets, sea salt, most pollution — Mie theory gives weak wavelength dependence and strong forward peaking, parameterised by the asymmetry factor $g = \langle\cos\theta\rangle \approx 0.85$ for water drops, which is why a cloud is white and why its albedo depends on droplet number rather than liquid water path.

Aerosols do three distinct things, and their sum is the largest uncertainty in the radiative forcing budget. Directly, they scatter and absorb sunlight: sulphate and sea salt scatter and cool, black carbon absorbs and warms the layer it is in while cooling the surface below — and when deposited on snow it darkens the surface and warms regionally by an amount comparable to carbon dioxide in the Arctic. Semi-directly, absorption in an aerosol layer stabilises the atmosphere and evaporates cloud, a warming effect. Indirectly, more aerosol means more, smaller cloud droplets at the same liquid water, which raises cloud albedo (the Twomey effect), suppresses precipitation efficiency, lengthens cloud lifetime and changes cloud amount — and the sign of the lifetime effect remains unresolved after thirty years. The AR6 best estimate of the total aerosol effective radiative forcing since 1750 is $-0.54\ \mathrm{W\,m^{-2}}$ with a $\pm 0.4$ uncertainty — meaning that aerosols have masked somewhere between a quarter and all of the greenhouse warming, and that cleaning up air pollution, which must be done, will unmask some of it.

Radiative forcing is the change in net irradiance at the tropopause after stratospheric adjustment, holding tropospheric temperatures fixed. For carbon dioxide the logarithmic form
$$
\Delta F = 5.35\,\ln\!\left(\frac{C}{C_0}\right)\ \mathrm{W\,m^{-2}}
$$
follows from saturated line centres and unsaturated wings, and gives $3.7\ \mathrm{W\,m^{-2}}$ for a doubling. With a climate feedback sum $\lambda \approx -0.8\ \mathrm{K\,(W\,m^{-2})^{-1}}$ that is the equilibrium climate sensitivity of $2.9\ \mathrm{K}$ — and the entire numerical content of climate science reduces to a spectroscopically well-determined three and a half and a cloud-dependent minus eight tenths.
:::

::: example The effective level and the size of the greenhouse effect {#ex-effective}
Take $S_0 = 1361\ \mathrm{W\,m^{-2}}$, $\alpha = 0.30$ and a surface at $288\ \mathrm{K}$ with an environmental lapse rate of $6.5\ \mathrm{K\,km^{-1}}$. Find the effective emission temperature, the height and pressure of the level that radiates it, and the grey optical depth the atmosphere would need.
::: solution
$$
T_e = \left(\frac{1361\times0.70/4}{5.67\times10^{-8}}\right)^{1/4} = 255\ \mathrm{K}, \qquad
z = \frac{288-255}{6.5} = 5.1\ \mathrm{km},
$$
and from the grey-atmosphere relation, $T_s/T_e = 288/255 = 1.129$ requires
$$
\tau = \tfrac{4}{3}(1.129)^{4} - \tfrac{2}{3} = 1.53 .
$$
An optical depth of one and a half. That is the entire greenhouse effect: the atmosphere is not a blanket, it is a thin, partially transparent screen, and the thirty-three kelvin of surface warming comes from an opacity you could almost read a newspaper through.

The number explains the water-vapour feedback immediately. A $1\ \mathrm{K}$ warming raises saturation vapour pressure by six per cent, which raises $\tau$ by roughly six per cent in the water-vapour bands, which raises $T_s$ by about one and a half kelvin before the lapse-rate and cloud terms respond. The water-vapour feedback is therefore worth about $1.8\ \mathrm{W\,m^{-2}\,K^{-1}}$, roughly double the Planck response of $3.3\ \mathrm{W\,m^{-2}\,K^{-1}}$ and the reason climate sensitivity is three degrees rather than one and a half. It is also why the feedback is considered certain: it follows from Clausius–Clapeyron, is observed in the satellite record, and is reproduced by every model.

**The** **same** **arithmetic** **explains** **Venus**. Its infrared optical depth is of order $10^{2}$ rather than $1.5$, and with an effective temperature of $232\ \mathrm{K}$ the grey formula gives a surface temperature near $680\ \mathrm{K}$ — against the observed $737$. A factor of seventy in opacity is the difference between an ocean and a pressure cooker, and it is why the runaway greenhouse is a threshold rather than a slope.
:::
:::

::: example Beer–Lambert and the red Sun {#ex-beer}
The atmospheric optical depth at $0.55\ \mu\mathrm{m}$ is $0.30$ at the zenith. Find the direct beam at the surface for a solar zenith angle of $60\ \mathrm{^\circ}$, and the ratio of the beam at $0.40\ \mu\mathrm{m}$ to that at $0.70\ \mu\mathrm{m}$ if the optical depth is purely Rayleigh and $\tau(0.55) = 0.10$.
::: solution
The air mass at $60\ \mathrm{^\circ}$ is $1/\cos 60 = 2$, so
$$
F = 1361\times\cos 60 \times e^{-0.30\times2} = 1361\times0.500\times0.549 = 373\ \mathrm{W\,m^{-2}} .
$$
For pure Rayleigh scattering, $\tau \propto \lambda^{-4}$, so $\tau(0.40) = 0.10\times(550/400)^{4} = 0.36$ and $\tau(0.70) = 0.10\times(550/700)^{4} = 0.039$. At the zenith the transmittances are $e^{-0.36} = 0.70$ and $e^{-0.039} = 0.96$, a ratio of $0.73$.

The red Sun is that ratio, and the blue sky is the thirty per cent of the violet light that did not reach you directly. At sunrise the air mass is thirty-eight times the zenith value, the blue optical depth exceeds thirteen, and essentially all of the light below $0.6\ \mu\mathrm{m}$ is scattered out — which is why the Sun at the horizon is not merely redder but a factor of ten dimmer than at the zenith, and why volcanic aerosol, which adds an optical depth of $0.1$ globally after a large eruption, produces the observed red sunsets and the measurable one-degree global cooling of Pinatubo in 1992.

The same Beer–Lambert law is the reason lidar works, the reason turbid coastal water cannot be observed by ocean-colour satellites, the reason a cloud of optical depth thirty looks white rather than grey, and the reason the visibility reduce by aerosol over industrial regions is a measurable loss of surface solar power — the phenomenon called global dimming, which reduced surface irradiance by about four per cent between 1950 and 1990 and reversed as clean-air legislation took effect.
:::
:::

::: widget plot
f: 255*exp(0.25*ln(0.75*(x+0.667)))
x: 0, 3
y: 200, 340
labels: T\ (\mathrm{K})
caption: Temperature against optical depth in the grey Eddington atmosphere, $T^{4} = \tfrac{3}{4}T_e^{4}(\tau + \tfrac{2}{3})$, for $T_e = 255\ \mathrm{K}$. Three features survive every refinement. At the top of the atmosphere the temperature is $214\ \mathrm{K}$, not $255$: the skin temperature is $T_e/2^{1/4}$, and the same factor sets the airless Moon's mean. At $\tau = 2/3$ the temperature equals the effective temperature — the level space sees, and the level whose height carbon dioxide raises. And the surface temperature grows as the fourth root of the optical depth, which is why the greenhouse effect is so stubborn: to double the surface-to-skin contrast you must multiply the opacity by sixteen. Slide $\tau$ from $1.5$ to $3$ and watch the surface gain only $20\ \mathrm{K}$ while the top of the atmosphere barely moves — that is the stratospheric cooling that distinguishes greenhouse warming from solar warming, and the observation that settles the attribution question without any model at all.
:::


::: example From forcing to warming {#ex-totemperature}
Total anthropogenic effective radiative forcing since 1750 is $2.72\ \mathrm{W\,m^{-2}}$ and the net climate feedback parameter is $\lambda = -1.0\ \mathrm{K\,(W\,m^{-2})^{-1}}$. Find the **equilibrium** climate sensitivity to that forcing, and the equilibrium sensitivity to a carbon dioxide **doubling** ($5.35\ln 2$). Then explain why only about $1.2\ \mathrm{K}$ **has** **so** **far** **been** **observed**.
::: solution
$$
\Delta T_{\mathrm{eq}} = \frac{\Delta F}{-\lambda} = \frac{2.72}{1.0} = \boxed{2.7\ \mathrm{K}}, \qquad
\Delta T_{2\times} = \frac{5.35\ln 2}{1.0} = \frac{3.71}{1.0} = 3.7\ \mathrm{K}.
$$
Only $1.2\ \mathrm{K}$ has appeared because the system is nowhere near equilibrium. The ocean has absorbed about $90$ per cent of the excess energy, most of it into the upper $700\ \mathrm{m}$ and a third into the abyss, and the e-folding time for the surface to reach the atmosphere's equilibrium is set by the mixed-layer heat capacity and the slow rate of entrainment, not by the radiative imbalance itself. The **response** is roughly $45$ per cent of the equilibrium value after $170$ years, and the remaining $1.5\ \mathrm{K}$ is already committed even if emissions stopped today. Note also that the $2.72\ \mathrm{W\,m^{-2}}$ is a **net**: greenhouse gases contribute about $3.4$ and anthropogenic aerosols subtract about $1.0$, so the warming we have avoided by brightening the planet is of the same size as the warming still in the pipeline.
:::
:::

::: example The cloud radiative effect {#ex-clouds}
The global mean top-of-atmosphere cloud radiative effect is $-44\ \mathrm{W\,m^{-2}}$ in the shortwave and $+29\ \mathrm{W\,m^{-2}}$ in the longwave. Find the **net**, and then the equilibrium warming if a perturbation reduced cloud **area** by $10$ per cent with $\lambda = -0.8\ \mathrm{K\,(W\,m^{-2})^{-1}}$.
::: solution
$$
\mathrm{CRE} = -44 + 29 = -15\ \mathrm{W\,m^{-2}}, \qquad
\Delta F = 0.10 \times 15 = 1.5\ \mathrm{W\,m^{-2}}, \qquad
\Delta T = \frac{1.5}{0.8} = \boxed{1.9\ \mathrm{K}}.
$$
Clouds cool the planet by $15\ \mathrm{W\,m^{-2}}$ on net, a cooling three-quarters the size of the entire anthropogenic forcing — which is why the sign of the **cloud** **feedback** is the largest single source of spread in climate projections. The example is deliberately crude: a real cloud change alters droplet size, liquid water, altitude and phase as well as area, and each of those has a different radiative signature. Low clouds in the subtropics, which are bright and cold-neutral, dominate the shortwave term and are expected to **decrease** in a warming world (a positive feedback); high clouds, which are thin and very cold, dominate the longwave term and are expected to rise in altitude (also a positive feedback). The net cloud feedback estimated from the models is $+0.4$ to $+0.8\ \mathrm{W\,m^{-2}\,K^{-1}}$, comparable in magnitude to the entire water-vapour feedback and twice the surface-albedo feedback.
:::
:::

::: warning Four numbers that are quoted as if they were measurements
**Treating $33\ \mathrm{K}$ as the observed greenhouse effect.** It is the difference between two model temperatures, $288 - 255$, where $255\ \mathrm{K}$ is the emission temperature computed for the observed albedo. It is not the temperature the surface would have without an atmosphere, because removing the atmosphere also removes water vapour and clouds and drops the albedo from $0.294$ to about $0.15$. The best estimate for a dry, carbon-dioxide-only Earth at today's solar output is nearer $230\ \mathrm{K}$, which would make the counterfactual difference about $58\ \mathrm{K}$, not $33$. Quote $33\ \mathrm{K}$ as a book-keeping number and never as a prediction.

**Treating $\tau = 1.5$ as measured.** It is inverted from the grey formula using the observed surface and effective temperatures. A genuine profile-integrated infrared optical depth, weighted properly for the bands that actually emit, is a different number with a different meaning, and the grey model's usefulness does not license calling its parameter an observation.

**Treating $5.35\ln(C/C_0)$ as exact.** It is a fit accurate to about $\pm 1$ per cent over $200$–$1200\ \mathrm{ppm}$ for the instantaneous forcing, and the *effective* radiative forcing — after the stratosphere has readjusted — is $3.7\ \mathrm{W\,m^{-2}}$ for a doubling, slightly different and with its own uncertainty of about $13$ per cent. Outside the fitted range, and for mixtures of gases, use a line-by-line radiative kernel.

**Treating the radiative forcing as the warming it will produce.** The forcing is an instantaneous top-of-atmosphere imbalance; the warming is $\Delta F/\lambda$ after centuries. Between the two sit the ocean's heat capacity, its three-dimensional circulation, and a feedback parameter that is itself a function of the warming pattern. A forcing of $2.7\ \mathrm{W\,m^{-2}}$ and a warming of $1.2\ \mathrm{K}$ are both correct simultaneously, and confusing them is the most common error in public discussion of climate sensitivity.

**And a word on the word "window".** The $8$–$13\ \mathrm{\mu m}$ atmospheric window is not clear. It contains the $9.6\ \mathrm{\mu m}$ ozone band, the $12.3\ \mathrm{\mu m}$ carbon dioxide band, and a water-vapour continuum that grows quadratically with pressure, so the window transmits about $70$–$85$ per cent of the blackbody radiation in it over the desert and perhaps $40$ per cent in the tropical Pacific. Satellite sounders exploit the window precisely because what little escapes there is exquisitely sensitive to the temperature of the surface and the lowest kilometre.
:::

::: history A transparency that had to be discovered
The story of radiative transfer is the story of a substance nobody could see. In **1800 William Herschel** passed sunlight through a prism and thermometers beyond each colour, finding the warmest deflection beyond the red, and so demonstrated that the Sun emits more than light. **Fourier** of Auxerre wrote in **1824** that the temperature of the Earth's surface could be maintained by the interception of solar rays by an atmosphere, and — the deeper insight — that the barrier was *selective*: air is transparent to visible light and opaque to the obscure heat re-emitted from the ground. He compared it to de Saussure's hot-air box, and was careful not to claim he had measured anything. **John Tyndall** did measure. In **1859–1861**, in a long brass tube with rock-salt windows (glass itself is opaque to the thermal infrared), he passed the heat from a blackened copper kettle through bottles of the atmosphere's constituents and found nitrogen and oxygen transparent while water vapour, carbon dioxide, ozone and marsh gas were not. His quoted absorption for a trace of coal gas was so large that his contemporaries doubted the apparatus, but the qualitative result — that a few parts per million of a minor gas can stop the Earth's own radiation — was right, and it is the whole of the carbon-dioxide problem stated in a sentence. **Svante Arrhenius** in **1896** and, independently, **Thomas Chrowder Chamberlin** and **R. S. D. Crewe** in **1900** attempted the arithmetic: column-by-column absorption tables, hand-computed, giving several degrees of warming for a doubling of carbon dioxide. **Guy Callendar** in **1938** rebuilt the calculation with better band data and, crucially, with evidence that the carbon dioxide was actually rising. **Gilbert Plass** in **1956** replaced the grey and band models with modern band measurements and found the absorption nearly saturated in the centres of the bands, so that further warming came from the wings — the reason the forcing is logarithmic. **Su, Goody, Manabe and Wetherald** built the first reliable line-by-line and convective-radiative models in the 1960s, and **Manabe and Wetherald's 1967** paper, which combined radiation with a fixed lapse rate and a prescribed cloud, produced $2.9\ \mathrm{K}$ for a doubling and has never been substantially revised. The instrument that finally settled the matter was launched in **1978**: the Earth Radiation Budget Experiment and its successors measured the outgoing spectrum from space, band by band, and showed the $15\ \mathrm{\mu m}$ carbon dioxide notch exactly where the line-by-line models put it, deepening by the predicted amount between one decade and the next.
:::

## Cross-references

- [[earth-system/energy-balance]] — the zero-dimensional version of everything in this lesson
- [[atmospheric-dynamics/thermodynamics]] — the dry adiabatic lapse rate that fixes the tropopause
- [[atmospheric-dynamics/moist-thermodynamics]] — water vapour, the dominant greenhouse gas, and condensation
- [[atmospheric-dynamics/cloud-physics]] — the microphysics behind the cloud radiative effect
- [[atmospheric-dynamics/general-circulation]] — how the poleward energy transport this lesson computes is accomplished
- [[climate-system/greenhouse-effect]] — feedback parameters and climate sensitivity in detail
- [[climate-system/forcing]] — radiative forcing definitions and the inventory by species
- [[meteorology/radiation-temperature]] — the surface energy balance and diurnal temperature

::: quiz
The forcing from carbon dioxide is $5.35\ln(C/C_0)$, logarithmic rather than proportional. What is the physical reason?
- [ ] Carbon dioxide absorbs only in narrow bands that the Planck function barely reaches.
- [ ] The atmosphere is already saturated in the wings of the bands, so only the centres can add absorption.
- [x] The centres of the absorption bands are already saturated, so extra molecules only thicken the wings, and the wing area grows roughly as the logarithm of the absorber amount.
- [ ] The stratospheric adjustment cancels most of the instantaneous forcing.
::: solution
The strong cores of the $15\ \mathrm{\mu m}$ bands are opaque for the present load, so adding molecules does not make them more opaque; absorption grows only by broadening the wings, and the wing contribution scales with the square root of the line strength, which integrates to a logarithm in the total amount ([[atmospheric-dynamics/radiative-transfer#def-greenhouse]]). Saturation is also why the warming comes from higher, colder levels rather than from the surface layer.
:::
:::

::: quiz
A planet's skin temperature — the temperature of the top of its atmosphere in the grey model — is measured at $200\ \mathrm{K}$. What is its effective radiating temperature?
- [ ] $200\ \mathrm{K}$.
- [x] $238\ \mathrm{K}$.
- [ ] $168\ \mathrm{K}$.
- [ ] $283\ \mathrm{K}$.
::: solution
The skin temperature is $T_e/2^{1/4} = T_e/1.189$, so $T_e = 200 \times 1.189 = 238\ \mathrm{K}$. The factor appears because the top of the atmosphere emits to space from one side only and still receives down-welling radiation from below.
:::
:::

::: summary Radiative transfer
Radiation is the only term in the atmospheric energy budget that couples the planet to space, and it is the only one whose governing physics is fully linear and fully known. Every body emits $e\sigma T^{4}$ with a peak at $\lambda_{\max} = 2898/T\ \mathrm{\mu m}$: the Sun at $5778\ \mathrm{K}$ puts $97$ per cent of its energy between $0.3$ and $3\ \mathrm{\mu m}$, the Earth at $255$–$288\ \mathrm{K}$ puts it between $4$ and $40\ \mathrm{\mu m}$, and the atmosphere is built to be transparent to the first and opaque to the second. Transmission is Beer–Lambert, $F = F_0 e^{-\tau}$, with the optical depth a sum of molecular line absorptions; the lines are Doppler-broadened aloft and pressure-broadened at the surface, and their wings — not their saturated centres — are where the carbon dioxide forcing comes from. Scattering removes beam but not energy, is strongly $\lambda^{-4}$-selective for molecules smaller than the wavelength, and gives the blue sky, the red Sun and the white cloud. In the longwave, absorption and emission are tied by Kirchhoff and LTE, so the atmosphere radiates at every level at local temperature, and the flux divergence that heats or cools a layer is the difference between the converging up-welling and down-welling streams. The grey Eddington atmosphere, $T^{4} = \tfrac{3}{4}T_e^{4}(\tau+\tfrac{2}{3})$, reproduces the $214\ \mathrm{K}$ skin temperature, places the emission level at $\tau = 2/3$, and gives $T_s/T_e = (1+3\tau/2)^{1/4}$ — $1.2$ for $\tau = 1.5$, or $33\ \mathrm{K}$ of greenhouse effect. Add a convective adjustment and the model reproduces the observed tropospheric temperature profile to within $2\ \mathrm{K}$ from the surface to the tropopause, which is the reason radiative-convective models are trusted. Forcing is a top-of-atmosphere stratosphere-adjusted imbalance, $\Delta F = 5.35\ln(C/C_0)$ for carbon dioxide, and the warming is $\Delta F/\lambda$; the $2.7\ \mathrm{W\,m^{-2}}$ of anthropogenic forcing has produced $1.2\ \mathrm{K}$ because the ocean has taken the rest, and $1.5\ \mathrm{K}$ more is committed.
:::

::: exercise Planck peaks {level=1 check="11.4"}
Using Wien's displacement law, find the wavelength of maximum emission for the Earth as a blackbody at its effective temperature of $255\ \mathrm{K}$, and for the photosphere at $5778\ \mathrm{K}$. Give the Earth's value in micrometres.
::: solution
$\lambda_{\max} = 2898/255 = 11.4\ \mu\mathrm{m}$ for the Earth, and $2898/5778 = 0.50\ \mu\mathrm{m}$ for the Sun. The two peaks are a factor of $23$ apart in wavelength, which is exactly the separation the atmosphere exploits: it is built to pass the second and block the first.
:::
:::

::: exercise Emissive power of the surface {level=1 check="390"}
Compute the blackbody emissive power, in $\mathrm{W\,m^{-2}}$, of a surface at $288\ \mathrm{K}$. The observed upward longwave at the surface is about $340\ \mathrm{W\,m^{-2}}$; what does the difference imply about the surface emissivity in the thermal infrared?
::: solution
$E = \sigma T^{4} = 5.6704\times10^{-8} \times 288^{4} = 390\ \mathrm{W\,m^{-2}}$. The observed $340\ \mathrm{W\,m^{-2}}$ is $\varepsilon\sigma T^{4}$ with $\varepsilon = 340/390 = 0.87$, but the more useful reading is that the surface is very close to black in the thermal infrared ($\varepsilon > 0.95$ for water, vegetation and soil) and the missing flux is not low emissivity but the $8$–$13\ \mu\mathrm{m}$ window, through which the surface sees the cold sky rather than a black atmosphere at $288\ \mathrm{K}$.
:::
:::

::: exercise Transmittance {level=2 check="0.135"}
A beam of direct sunlight crosses a path with an optical depth of $2.0$ (haze, smoke or a thick cloud edge). What fraction of the beam survives, and by how much has the diffuse-to-direct ratio changed if the diffuse fraction is all of the remainder?
::: solution
$\tau = \exp(-2.0) = 0.135$, so $13.5$ per cent of the beam survives and $86.5$ per cent is scattered or absorbed. The diffuse-to-direct ratio becomes $0.865/0.135 = 6.4$, against roughly $0.1$ for a clean molecular atmosphere at the zenith. This is why a hazy sky photographs flat: the illumination is almost entirely diffuse, shadows vanish, and the contrast that carries topographic detail is removed.
:::
:::

::: exercise Skin temperature {level=2 check="214"}
From the Eddington grey atmosphere, compute the temperature at the top of the atmosphere ($\tau = 0$) for $T_e = 255\ \mathrm{K}$. Why is this number, and not $255\ \mathrm{K}$, the temperature an airless surface would need to radiate the same flux?
::: solution
$T(0)^{4} = \tfrac{3}{4}T_e^{4}(0 + \tfrac{2}{3}) = T_e^{4}/2$, so $T(0) = 255/2^{1/4} = 255/1.189 = 214\ \mathrm{K}$. The factor of two arises because a layer at the top radiates upward to space but also downward, and half its emission is therefore wasted on the atmosphere it just left. An airless surface radiates in all directions from a single exposed face and pays no such penalty, which is why the same energy budget permits it to sit at $T_e$ rather than $T_e/2^{1/4}$.
:::
:::

::: exercise Carbon dioxide forcing {level=2 check="3.7"}
Using $\Delta F = 5.35\ln(C/C_0)$, find the effective radiative forcing of a doubling of carbon dioxide, and the forcing from the pre-industrial $280\ \mathrm{ppm}$ to today's $420\ \mathrm{ppm}$.
::: solution
Doubling: $\Delta F = 5.35\ln 2 = 3.71\ \mathrm{W\,m^{-2}}$. Present day: $\Delta F = 5.35\ln(420/280) = 5.35 \times 0.405 = 2.17\ \mathrm{W\,m^{-2}}$. Note that we have already spent $58$ per cent of the doubling forcing, and that the logarithm means the *next* doubling costs exactly the same $3.71$ as this one — the damage per tonne does not fall as the concentration rises, it stays constant per unit of $\ln C$.
:::
:::

::: exercise Optical depth of the real atmosphere {level=3 check="1.5"}
Invert the grey relation $T_s = T_e(1 + 3\tau/2)^{1/4}$ to find the infrared optical depth implied by $T_s = 288\ \mathrm{K}$ and $T_e = 255\ \mathrm{K}$. Then find the additional optical depth required for $1\ \mathrm{K}$ of warming with no other change.
::: solution
$1 + 3\tau/2 = (288/255)^{4} = 1.627$, so $\tau = (1.627 - 1)\times 2/3 = 0.418 \times 2/3 = 1.50$. For $289\ \mathrm{K}$: $1 + 3\tau/2 = (289/255)^{4} = 1.650$, $\tau = 0.433$, so $\Delta\tau = 0.033$ — a $2.2$ per cent increase in the atmosphere's total infrared opacity. That is all a degree of warming costs in the grey model, which is the quantitative statement of why a gas at $420$ parts per million can move a planet.
:::
:::

::: exercise Height of the emission level {level=3 check="5.8"}
Take the infrared optical depth to decay with height as $\tau(z) = 1.5\,e^{-z/7.2\ \mathrm{km}}$. At what height does the temperature of the grey atmosphere equal the effective temperature, i.e. where is the $\tau = 2/3$ surface? Compare with the mean tropopause height.
::: solution
$2/3 = 1.5\,e^{-z/7.2}$ gives $e^{-z/7.2} = 0.444$, $z = 7.2\ln(1.5/0.667) = 7.2 \times 0.811 = 5.8\ \mathrm{km}$. The agreement with the global mean tropopause height of $\sim 11\ \mathrm{km}$ in the tropics and $8\ \mathrm{km}$ in the mid-latitudes is closer than it should be, and it is not a coincidence: convection carries heat up to the level at which radiative cooling can take over, so the tropopause sits near the emission level. Adding carbon dioxide raises $\tau$ everywhere, lifts the $2/3$ surface, and the surface below must warm to restore the flux.
:::
:::

::: exercise The Moon as a control {level=3 check="381"}
The Moon has Bond albedo $0.12$, no atmosphere and a rotation period of $27$ days. Compute its subsolar equilibrium temperature and its globally averaged equilibrium temperature. The observed lunar surface ranges from $400\ \mathrm{K}$ at noon to $100\ \mathrm{K}$ at night; explain why the mean of those extremes is not the global mean you computed.
::: solution
Subsolar: the surface receives $S_0(1-A) = 1361 \times 0.88 = 1198\ \mathrm{W\,m^{-2}}$ and radiates it from the same area, so $T = (1198/\sigma)^{1/4} = 381\ \mathrm{K}$. Globally averaged, the emitting area is four times the intercept, so $T = (1198/4\sigma)^{1/4} = 270\ \mathrm{K}$. The arithmetic mean of $400$ and $100$ is $250\ \mathrm{K}$, and the *emission-weighted* mean is what the planet actually radiates: because the flux goes as $T^{4}$, the hot noon side dominates the energy budget and the cold night side contributes almost nothing, so the effective temperature is set by the maximum, not the average. This is the $T_e/2^{1/4}$ skin-temperature argument in another guise, and it is why airless bodies are colder on average than greenhouse bodies at the same orbit.
:::
:::
