The greenhouse effect is the most discussed and least understood idea in environmental science. Almost everyone can state that certain gases let sunlight in and hold heat in; almost no one can say where in the atmosphere the planet actually loses its heat to space, why that location is what carbon dioxide controls, or why the popular objections — the bands are saturated, back radiation violates the second law, water vapour is a far stronger greenhouse gas so carbon dioxide must be irrelevant — are all false. This chapter builds the mechanism from the simplest model that has one, upward.

The essential point in one sentence: the Earth does not radiate to space from the ground. It radiates from an altitude, that altitude is cold, and adding greenhouse gases moves the altitude upward into colder air, so the planet must warm below in order to restore the flux.

## Grey radiation and the layer model

::: definition Optical depth and a grey atmosphere {#def-optical-depth}
The **optical depth** $\tau$ of a layer is the integrated absorption along a path, $\mathrm{d}\tau = \rho \kappa\,\mathrm{d}z$, so that a beam crossing it is attenuated by $e^{-\tau}$. An atmosphere whose absorption coefficient is independent of wavelength is **grey**. No real atmosphere is grey — the Sun's light and the Earth's are separated by a factor of about twenty in wavelength, and the atmosphere is nearly transparent to one and nearly opaque to the other — but the grey idealisation captures the greenhouse mechanism exactly, which is why it has been used since Schwarzschild in 1906.
:::

::: proposition The $N$-layer model {#prop-layers}
Take an atmosphere of $N$ layers that are transparent to solar radiation and completely opaque to infrared, in radiative equilibrium. Each layer emits $\sigma T^4$ both up and down, and the surface emits $\sigma T_s^4$. Then the top layer radiates $240\ \mathrm{W\,m^{-2}}$ to space, and the temperatures satisfy
$$
\sigma T_s^4 = (N+1)\,\sigma T_e^4, \qquad T_s = (N+1)^{1/4}\,T_e ,
$$
where $T_e = 255\ \mathrm{K}$ is the emission temperature.
:::

::: proof
Work from the top down. Layer $N$ emits $240$ upward, so $\sigma T_N^4 = 240$. It also emits $240$ downward, so layer $N-1$ must emit $480$ upward to balance it, hence $\sigma T_{N-1}^4 = 2\times240$. Continuing downward, the layer $k$ from the top satisfies $\sigma T^4 = (k+1)\times240$, and the surface, which receives the downward emission of the lowest layer plus nothing else, satisfies $\sigma T_s^4 = (N+1)\times240 = (N+1)\sigma T_e^4$. Each layer down is warmer because it must emit the flux of every layer above it *plus* its own. The result is the whole mechanism in one line: opacity forces the surface to be warmer than the emission temperature by the fourth root of the number of opaque layers.
:::

::: example One layer is too much, two are too little {#ex-layers}
Compute the surface temperature for $N = 1$, $2$, $5$ and $20$ layers with $T_e = 255\ \mathrm{K}$, and comment on the sensitivity to $N$.
::: solution
$T_s = 255(N+1)^{1/4}$ gives $303\ \mathrm{K}$ for $N = 1$, $336\ \mathrm{K}$ for $N=2$, $399\ \mathrm{K}$ for $N=5$ and $546\ \mathrm{K}$ for $N=20$.

The one-layer model gives $303\ \mathrm{K}$, fifteen kelvin too warm, and is the reason the textbook diagram of a single atmospheric layer absorbing and re-emitting is a poor teaching tool: it works only because the model is wrong in a way that happens to overshoot. Push it further and it fails outright — twenty opaque layers give $546\ \mathrm{K}$, which is the temperature of a pressure cooker. The lesson is the *scaling*, not the calibration. A real atmosphere is opaque in some bands and transparent in others, so doubling an absorber does not add an integer number of opaque layers; it deepens the opaque ones logarithmically, and that is what makes the response logarithmic in carbon dioxide rather than explosive.
:::
:::

::: widget plot
f: 255*(1+x)^0.25
x: 0, 5
y: 250, 405
caption: The $N$-layer grey-model surface temperature $T_s = 255(N+1)^{1/4}\ \mathrm{K}$. The curve is steep at small $N$ and flattens quickly: going from a transparent atmosphere to one opaque layer buys $48\ \mathrm{K}$, while going from five opaque layers to six buys $16\ \mathrm{K}$. This fourth-root saturation is the reason the greenhouse effect of a well-mixed gas is logarithmic in its concentration, and it is the honest core of the "saturation" argument — which fails only because the real atmosphere is not grey, and the extra absorption is taken up high, where it matters, rather than at the surface, where it does not.
:::

## The grey atmosphere and where the heat escapes

::: definition The grey temperature profile and the skin {#def-grey-profile}
For a grey atmosphere in radiative equilibrium with infrared optical depth $\tau$ measured downward from space, the Eddington approximation gives
$$
T^4(\tau) = \tfrac{3}{4}\,T_e^4\left(\tfrac{2}{3} + \tau\right).
$$
At the top, where $\tau = 0$, the temperature is the **skin temperature** $T_e/2^{1/4} = 214\ \mathrm{K}$; the level from which the planet radiates, $\tau = 2/3$, is at $T_e = 255\ \mathrm{K}$; and the surface, at total optical depth $\tau_s \approx 1.8$ for infrared, is at $288\ \mathrm{K}$.
:::

::: example The emission height and why carbon dioxide's is high {#ex-emission-height}
Take a scale height of $7.2\ \mathrm{km}$ and an infrared optical depth of $1.8$ at the surface, decreasing exponentially with height. Find the height of the $\tau = 2/3$ level. Then treat carbon dioxide as if it were grey and find how much the $\tau = 2/3$ level would rise for a doubling, and what that would do to the outgoing flux.
::: solution
$\tau(z) = 1.8\,e^{-z/H} = 2/3$ gives $z = 7.2\ln(1.8/0.667) = 7.1\ \mathrm{km}$.

If the absorber were grey, doubling it would put the $\tau = 2/3$ level where the optical depth is $0.33$, at $z = 7.2\ln(1.8/0.333) = 12.0\ \mathrm{km}$ — a rise of $4.9\ \mathrm{km}$, a cooling of the emitting level by $6.5\times4.9 = 32\ \mathrm{K}$, and a flux reduction of $3.8\times32 = 120\ \mathrm{W\,m^{-2}}$. The real forcing is $3.7\ \mathrm{W\,m^{-2}}$, a factor of thirty smaller.

The discrepancy is the answer to the saturation argument in its honest form. Carbon dioxide is *not* grey: its $15\ \mu\mathrm{m}$ band is opaque at the centre and transparent in the wings, and the wings, not the centre, do the marginal work. Doubling the gas moves the wings' emitting level up by a few hundred metres rather than five kilometres, cooling the effective emitter by about $1\ \mathrm{K}$ and reducing the flux by $3.7\ \mathrm{W\,m^{-2}}$. The band is saturated at its centre; the planet does not radiate from the centre of the band.
:::
:::

::: widget plot
f: 255*(0.75*(0.667+x))^0.25
x: 0, 4
y: 190, 320
caption: The grey-atmosphere temperature profile $T(\tau) = 255[\tfrac34(\tfrac23+\tau)]^{1/4}$ against downward infrared optical depth. At $\tau = 0$ the skin is $214\ \mathrm{K}$, some $40\ \mathrm{K}$ colder than the emission temperature, because the top of an atmosphere radiates to space in both directions and receives nothing from above. The skin is not an abstraction: satellites and radiometers measure it as the difference between the surface temperature and the brightness temperature in the $15\ \mu\mathrm{m}$ carbon dioxide band, and the observed value agrees with the grey calculation to a few kelvin.
:::

## Back radiation, and the objections

The surface emits $390$–$400\ \mathrm{W\,m^{-2}}$ upward and absorbs about $340\ \mathrm{W\,m^{-2}}$ downward from the atmosphere. The net is a loss of about $66\ \mathrm{W\,m^{-2}}$ ([[climate-system/energy-budget]]). Two objections are made to this, both worth being able to answer.

::: warning "Back radiation cannot warm the surface — heat does not flow from cold to hot"
The second law forbids a net heat flow from cold to hot, and there is none: the net infrared flux is upward, from the warm surface to the cold atmosphere. What the downward flux changes is not the direction of the net flow but its *size*. A surface losing heat to a cold environment through an insulating blanket of gas loses it more slowly, and reaches a higher equilibrium temperature while losing the same total at the top of the atmosphere. The electric-blanket version of this argument — that a blanket cannot warm you because your body is warmer than the blanket — is exactly as wrong as the radiative version, and for the same reason.
:::

::: definition Condensing and non-condensing greenhouse gases {#def-condensing}
Water vapour is the strongest absorber in the terrestrial infrared and is present in amounts set by the temperature of the surface: it **condenses**, so it cannot be held at a fixed amount. Carbon dioxide, methane, nitrous oxide and the halocarbons do not condense at any temperature the atmosphere reaches, so their amounts are set by sources and sinks rather than by temperature. They are the **non-condensing** or *thermostat* greenhouse gases: they set the temperature, and water vapour then supplies roughly twice as much additional warming as they do themselves.
:::

::: proposition The thermostat and the amplifier {#prop-thermostat}
In an atmosphere in radiative-convective equilibrium with fixed relative humidity, the water-vapour feedback — including the water-vapour changes that clouds induce — adds about $+1.5\ \mathrm{W\,m^{-2}}$ of forcing per kelvin of surface warming, against a Planck response of $3.3\ \mathrm{W\,m^{-2}\,K^{-1}}$. The amplification factor is therefore
$$
\frac{\lambda_0}{\lambda_0 - f_\text{H$_2$O}} = \frac{3.3}{3.3 - 1.5} = 1.9,
$$
so water vapour nearly doubles the warming that carbon dioxide alone would produce, and with the lapse-rate, albedo and cloud feedbacks included the total amplification is about $2.8$.
:::
::: proof
Write the balance $\lambda_0\Delta T = \Delta F + f\Delta T$ with $\lambda_0 = 3.3$ and $f = 1.5$, so $\Delta T = \Delta F/1.8$ and the amplification is $3.3/1.8 = 1.9$. The experiment that establishes the roles is the one performed in models by Lacis and others (2010): remove carbon dioxide, methane, nitrous oxide and ozone from a modern atmosphere and let it run. Water vapour condenses out as the planet cools, the clouds thin, the ice grows, and the planet ends up permanently frozen — a state from which present-day sunlight cannot return it to warmth. Remove the water vapour instead, holding the non-condensing gases fixed, and the planet cools by about $10\ \mathrm{K}$ and stabilises. Water vapour is the amplifier; carbon dioxide is the thermostat.
:::

::: example What the outgoing spectrum actually looks like {#ex-spectrum}
Satellite measurements of the outgoing longwave spectrum (Nimbus, then IRIS, then AIRS) give brightness temperatures of about $280\ \mathrm{K}$ in the $10\ \mu\mathrm{m}$ window, $220\ \mathrm{K}$ at the centre of the $15\ \mu\mathrm{m}$ carbon dioxide band, $250\ \mathrm{K}$ in its wings, and $230\ \mathrm{K}$ in the $6.3\ \mu\mathrm{m}$ water-vapour band. Convert these to heights and explain the shape.
::: solution
With a $6.5\ \mathrm{K\,km^{-1}}$ lapse rate from a $288\ \mathrm{K}$ surface, brightness temperatures of $280$, $250$, $230$ and $220\ \mathrm{K}$ correspond to roughly $1$, $6$, $9$ and $10\ \mathrm{km}$.

The spectrum is a vertical sounding of the atmosphere: the planet appears warm where the atmosphere is transparent (the window, so we see the surface), cold where it is opaque (band centres, so we see the upper troposphere), and in between where the opacity is partial. Carbon dioxide's contribution to the greenhouse effect is visible as a broad trough centred at $15\ \mu\mathrm{m}$, and the *difference* between spectra taken thirty years apart shows a trough that has deepened by about $0.4\ \mathrm{W\,m^{-2}}$ in exactly that band and in the ozone bands, with no change elsewhere (Harries and others, 2001; Chen and others, 2016). That is the direct radiative signature of the gases we have added, measured from space.
:::
:::

::: example The fingerprint: warming that grows with height {#ex-utc}
In a radiative-convective model with fixed relative humidity, a carbon-dioxide doubling warms the tropical upper troposphere by about $1.6$ times the surface warming, while the tropical mid-troposphere in reanalyses shows about $1.2$–$1.5$ times. Why does the theory require warming aloft to exceed warming at the surface?
::: solution
Because the atmosphere is nearly in radiative-convective equilibrium, its temperature profile is close to a moist adiabat, and a moist adiabat through a warmer surface is not a parallel shift: it is steeper in absolute temperature terms aloft. Equivalently, fixed relative humidity means more water vapour aloft, which traps more of the upwelling radiation there; and the latent heat released by convection is deposited at the same cold temperatures, so the extra energy is released where the air is cold and therefore warms it more per joule.

This "upper-tropospheric amplification" is one of the fingerprints used in detection and attribution ([[climate-change/attribution]]). It was also the subject of a genuine and instructive controversy: between 1997 and 2006 the weather-balloon and satellite records appeared to show *less* warming aloft than at the surface, contradicting the models. Reanalyses and the corrected satellite record (RSS and UAH after the Mears and Christy corrections, and the 2020s reanalyses ERA5, JRA-3Q) show amplification of the expected size, and the discrepancy was traced to satellite drift and to the treatment of the diurnal sampling of the microwave sounders.
:::
:::

::: warning "Water vapour is a more abundant greenhouse gas, so carbon dioxide cannot matter"
Both halves are true and the conclusion does not follow. Water vapour responds to temperature on a timescale of ten days, so its amount is a *consequence* of climate, not a control of it: you cannot emit a tonne of water vapour and have it stay in the atmosphere, and you cannot cool the atmosphere without also condensing the vapour out of it. Carbon dioxide stays for centuries and sets the temperature at which water vapour condenses. The quantitative statement is that water vapour and clouds contribute about two thirds of the total greenhouse warming, and carbon dioxide, methane, nitrous oxide, ozone and the halocarbons supply the one third that determines the whole. Removing the non-condensing gases takes the planet to a snowball; removing the water vapour while keeping them does not ([[#prop-thermostat]]).
:::

::: quiz
Why does the greenhouse effect of carbon dioxide not vanish once its absorption bands are saturated?
- [ ] Because the bands are not really saturated at any concentration.
- [x] Because the radiation escapes from the band wings and from high, cold levels, and adding gas moves those levels upward rather than adding absorption at the surface.
- [ ] Because carbon dioxide also absorbs sunlight.
- [ ] Because water vapour carries the absorption for it.
::: solution
Band centres are opaque near the ground, so extra absorption there is indeed wasted. But the planet's heat leaves through the wings and through the upper atmosphere, where the band is thin. Adding gas raises the level of last scattering into colder air, which reduces the outgoing flux at fixed surface temperature — and that reduction, $3.7\ \mathrm{W\,m^{-2}}$ for a doubling, is the forcing. The observational proof is the deepening trough in the satellite spectrum at $15\ \mu\mathrm{m}$.
:::
:::

::: history
Schwarzschild (Schwarzschild) solved the grey radiative-equilibrium problem in 1906 in a paper that also, in its last section, noted that the real atmosphere is far from grey. Milankovitch (Milankovitch) computed the radiation balance of the planets in 1920 as part of his ice-age theory. Elsasser (Elsasser) in 1942 produced the first multi-band model of the terrestrial infrared. Plass (Plass) in 1956 and Möller (Möller) in 1963 established that the carbon dioxide forcing is taken up aloft, which is the point the saturation argument misses. Manabe and Wetherald (Wetherald) in 1967 added convective adjustment and a fixed-relative-humidity water-vapour feedback, obtaining $2.9\ ^\circ\mathrm{C}$ for a doubling; Manabe and Möller (Möller) in 1967 also produced the first computed outgoing spectra, which matched the new satellite observations and convinced the sceptical. The Nimbus and IRIS archives, reanalysed by Harries and others (2001) and by Chen and others (2016), finally gave the direct measurement of the enhanced greenhouse in the carbon dioxide band. Lacis and others (2010) performed the thought experiment of removing the non-condensing gases and showed that the resulting planet is permanently frozen, which settled the "water vapour is the control knob" argument. The Simpson–Nakamura limit on how much infrared a saturated atmosphere can carry — about $300\ \mathrm{W\,m^{-2}}$ — was derived in 1927 and refined by Koll and Abbot (2016), and it is the reason a runaway greenhouse is a hard physical boundary rather than a matter of opinion.
:::

## Where this leads

The forcing formalism that this chapter's numbers feed into is [[climate-system/forcing]]; the feedback algebra is [[climate-system/feedbacks-sensitivity]]; the observed changes in the outgoing spectrum and in the surface radiation are in [[climate-change/observed-change]]. The band-by-band transfer is developed in [[atmospheric-dynamics/radiative-transfer]], the moist thermodynamics behind the fixed-relative-humidity assumption in [[atmospheric-dynamics/moist-thermodynamics]], and the clouds in [[atmospheric-dynamics/cloud-physics]].

::: summary
- The planet loses heat from an altitude, not from the ground; the $N$-layer grey model gives $T_s = (N+1)^{1/4}T_e$ and the grey profile gives a $214\ \mathrm{K}$ skin and a $\tau = 2/3$ emission level.
- Carbon dioxide's bands are saturated at their centres, but the escaping radiation comes from the wings and from high cold levels, so adding gas raises the emitting level and reduces the flux by $3.7\ \mathrm{W\,m^{-2}}$ per doubling.
- Downward infrared does not violate the second law: the net flux is upward, and the greenhouse slows the loss rather than reversing it.
- Water vapour is the amplifier (about two thirds of the response), the non-condensing gases are the thermostat; remove them and the planet freezes.
- The outgoing spectrum is a vertical sounding, and the difference between spectra thirty years apart is the direct measurement of the enhanced greenhouse.
- Radiative-convective equilibrium with fixed humidity requires warming to amplify with height, which is both a fingerprint and, historically, a controversy that resolved in favour of the models.
:::

## Exercises

::: exercise Two layers {level=1 check="336"}
Find the surface temperature of the two-layer grey model with $T_e = 255\ \mathrm{K}$.
::: solution
$T_s = 255\times3^{1/4} = 336\ \mathrm{K}$. The two-layer model is $48\ \mathrm{K}$ warmer than the one-layer model. Each additional layer adds less: the third gives $361\ \mathrm{K}$, the tenth $464\ \mathrm{K}$ — and the absurdity of those numbers is the point of [[#ex-layers]].
:::
:::

::: exercise Skin temperature {level=1 check="214"}
Find the skin temperature for $T_e = 255\ \mathrm{K}$.
::: solution
$T_\text{skin} = T_e/2^{1/4} = 255/1.189 = 214\ \mathrm{K}$. The skin is what a satellite sees looking straight down at the $15\ \mu\mathrm{m}$ band centre.
:::
:::

::: exercise Optical depth of the surface {level=2 check="1.5"}
The grey profile gives $T_s^4 = \tfrac34 T_e^4(\tfrac23 + \tau_s)$. Find the total infrared optical depth $\tau_s$ required for $T_s = 288\ \mathrm{K}$ and $T_e = 255\ \mathrm{K}$.
::: solution
$(288/255)^4 = 1.627 = 0.75(0.667 + \tau_s)$, so $\tau_s = 1.627/0.75 - 0.667 = 1.50$. Allowing for the fact that the real atmosphere is not grey and that the surface radiates into a window, the usual quoted infrared optical depth is $1.8$–$2.0$; the difference is the price of the grey approximation.
:::
:::

::: exercise Emission height of a grey absorber {level=2 check="4.9"}
With $H = 7.2\ \mathrm{km}$, find how far the $\tau = 2/3$ level rises when a grey absorber's amount doubles.
::: solution
$\Delta z = H\ln 2 = 4.99\ \mathrm{km}$. The observed carbon-dioxide-induced rise is a few hundred metres, because only the band wings contribute at the relevant altitudes.
:::
:::

::: exercise Forcing from an emitting level {level=2 check="3.8"}
If the effective emitting level of the $15\ \mu\mathrm{m}$ band rises by $160\ \mathrm{m}$ for a carbon-dioxide doubling in a $6.5\ \mathrm{K\,km^{-1}}$ environment, find the forcing.
::: solution
The level cools by $6.5\times0.16 = 1.04\ \mathrm{K}$, and the flux falls by $3.8\times1.04 = 3.9\ \mathrm{W\,m^{-2}}$, close to the line-by-line value of $3.7$. The estimate is crude but it is the right order, and it shows that the forcing is essentially the lapse rate times the rise of the emitting level.
:::
:::

::: exercise Brightness temperatures {level=2 check="9"}
A brightness temperature of $230\ \mathrm{K}$ is measured in a water-vapour band. With a surface at $288\ \mathrm{K}$ and a $6.5\ \mathrm{K\,km^{-1}}$ lapse rate, at what height is the radiation coming from?
::: solution
$z = (288 - 230)/6.5 = 8.9\ \mathrm{km}$. Brightness temperatures are heights in disguise, which is why a spectrometer on a satellite is a thermometer for the whole troposphere.
:::
:::

::: exercise The runaway limit {level=3}
The Simpson–Nakamura limit for the maximum infrared flux a saturated atmosphere can carry is about $300\ \mathrm{W\,m^{-2}}$. If a planet's absorbed sunlight exceeded this, what would happen, and what absorbed flux does Earth have?
::: solution
The surface could not radiate the excess away, so it would heat until the ocean evaporated: a runaway greenhouse. Earth's absorbed flux is $240\ \mathrm{W\,m^{-2}}$, about $80\%$ of the limit, and the current surface emits $390\ \mathrm{W\,m^{-2}}$ against an outgoing $240$ — the difference being carried by the greenhouse blanketing. The margin is the reason the faint-young-Sun and runaway-greenhouse literatures matter for habitability, and it is not a margin that carbon dioxide alone can cross on Earth.
:::
:::

::: exercise Amplification with height {level=3}
A tropical sounding has a surface at $300\ \mathrm{K}$ and follows a moist adiabat for which the warming at $500\ \mathrm{hPa}$ is $1.6$ times the surface warming. If the surface warms $1.2\ \mathrm{K}$, find the warming at $500\ \mathrm{hPa}$ and the change in the $200$–$500\ \mathrm{hPa}$ layer thickness.
::: solution
$1.6\times1.2 = 1.9\ \mathrm{K}$ at $500\ \mathrm{hPa}$. The thickness of a layer is proportional to its mean temperature, so a layer warming from $255$ to $256.5\ \mathrm{K}$ thickens by $0.6\%$, about $90\ \mathrm{m}$ of a $15{,}000\ \mathrm{m}$ layer, which shows up as a rise of several metres per decade in the observed $500\ \mathrm{hPa}$ geopotential height. This is measurable in radiosonde and reanalysis records, and it is one of the more subtle lines of evidence that the tropics behave as the models say.
:::
:::

::: exercise The two-way infrared exchange {level=3}
The surface emits $396\ \mathrm{W\,m^{-2}}$ and absorbs $342\ \mathrm{W\,m^{-2}}$ of downwelling infrared. If the downwelling flux increased by $3.7\ \mathrm{W\,m^{-2}}$ with no immediate change in surface temperature, find the instantaneous net infrared change and the warming required to restore the original net.
::: solution
The net upward loss falls from $54$ to $50.3\ \mathrm{W\,m^{-2}}$, an imbalance of $3.7$. Restoring it requires the surface to emit $3.7\ \mathrm{W\,m^{-2}}$ more, which for $\mathrm{d}(\sigma T^4)/\mathrm{d}T = 5.4\ \mathrm{W\,m^{-2}\,K^{-1}}$ at $288\ \mathrm{K}$ means $0.69\ \mathrm{K}$ — but the atmosphere must warm too, and the top of the atmosphere must shed the energy, so the actual no-feedback response is $1.0$–$1.2\ \mathrm{K}$ once the profile adjusts. The exercise shows why the surface-only derivative overestimates the sensitivity of the surface to a given forcing by about a factor of two.
:::
:::
