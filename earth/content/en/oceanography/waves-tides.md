A three-metre swell with an eight-second period carries seventy kilowatts through every metre of coastline — enough to power a small town along the shelf of Portugal — and the tides that raise it dissipate $3.5\times10^{12}\ \mathrm{W}$ rubbing against the seafloor, more than the human race uses in energy. Surface gravity waves and tides are the two motions the ocean performs without needing the wind's patience or the conveyor's thousand years, and between them they set the shape of every beach, the mixing of every strait, and the deadline of every tsunami warning.

## Surface gravity waves

::: definition Linear wave theory {#def-airy}
For a small-amplitude wave of amplitude $a$, wavenumber $k = 2\pi/\lambda$ and frequency $\omega = 2\pi/T$ on water of depth $h$, the dispersion relation is
$$
\boxed{\;\omega^{2} = gk\tanh(kh)\;}
$$
with the two limits
$$
\text{deep water } (kh \gg 1):\quad c = \frac{\omega}{k} = \frac{gT}{2\pi} = 1.56\,T\ \mathrm{m\,s^{-1}}, \qquad
\text{shallow water } (kh \ll 1):\quad c = \sqrt{gh},
$$
so long waves travel faster and the deep-water phase speed depends only on the period. The group velocity, at which energy travels, is
$$
c_g = c\,\frac{1 + 2kh}{2\sinh(2kh)} \;\longrightarrow\; \begin{cases} c/2 & \text{deep} \\ c & \text{shallow} \end{cases}
$$
— in deep water the energy moves at half the crests' speed, which is why a swell train's energy arrives behind its first crests and why a ship steaming into a swell meets more waves per hour than it would at rest.

The **mean** energy per unit surface area is
$$
E = \tfrac{1}{2}\rho g a^{2} = \tfrac{1}{8}\rho g H_{s}^{2},
$$
half potential and half kinetic, and the energy flux per unit crest length is
$$
P = E\,c_g = \frac{\rho g^{2} H_s^{2} T}{32\pi} \approx H_s^{2}\,T\ \mathrm{kW\,m^{-1}} .
$$
For $H_s = 3\ \mathrm{m}$ and $T = 8\ \mathrm{s}$ this is $71\ \mathrm{kW}$ per metre of crest — the reason the world's energetic coasts are also its erosion hotspots, and the reason wave power remains, after fifty years of attempted engineering, a niche technology.

Three kinematic consequences govern the coast. Refraction obeys Snell's law $\sin\theta/\sqrt{gh} = \text{const}$, which bends waves into headlands and out of bays and is why every dissipative beach is subparallel to the deep-water crest. Shoaling conserves $E c_g$ while $c_g$ falls, so $H$ grows as $h^{-1/4}$ until breaking. And waves do not transport water, they transport energy: the orbits are closed ellipses in linear theory, and the small net drift left over — the Stokes drift, $u_S = \omega k a^{2} e^{2kz}$ — is what carries plastic, larvae and oil downwind at one to three per cent of the wind speed.
:::

::: definition Wind waves, swell and breaking {#def-windwaves}
Waves grow by taking momentum from the wind, and the theory has two stages. Phillips (1957) showed that the turbulent pressure fluctuations in the atmospheric boundary layer resonate with the flat surface and generate waves at a rate proportional to the wind stress, giving exponential growth from nothing. Miles (1957) showed that once waves exist, the critical layer where the wind speed matches the wave phase speed produces a shear-flow instability that transfers energy at a rate proportional to the wave slope — linear growth in amplitude. Both operate; Miles' mechanism dominates once the waves are large, and the airflow separating over steep crests — the form drag of Charnock's roughness — dominates at hurricane winds.

Growth is limited by fetch, duration and wind speed, and a fully developed sea reaches the Pierson–Moskowitz spectrum, whose dimensionless peak is universal:
$$
H_s = 0.0246\,U_{10}^{2}, \qquad T_p = 0.66\,U_{10}, \qquad
E(f) \propto f^{-4}\exp\!\left[-\tfrac{6}{5}\left(\frac{f_p}{f}\right)^{4}\right],
$$
with $U_{10}$ in $\mathrm{m\,s^{-1}}$, $H_s$ in metres and $T_p$ in seconds. A 20 m s⁻¹ gale therefore builds a 9.8-m sea with a 13-s period, and the JONSWAP peak enhancement $\gamma = 3.3$ describes the fetch-limited North Sea version that every offshore structure is designed to.

Breaking occurs when the crest orbital velocity exceeds the phase speed ($ka \approx 0.33$ in deep water, giving $H/\lambda \approx 0.14$), or in shallow water when the depth-limited breaker index is reached:
$$
H_b = \gamma_b h, \qquad \gamma_b \approx 0.78\ \text{(sloping beach)},\quad 0.6\text{–}0.8\ \text{field range}.
$$
A breaker is the ocean's most efficient energy dissipater: a single 3-m breaker releases $\sim 10^{4}\ \mathrm{W\,m^{-1}}$ over seconds, generating the surf beat, the infragravity waves that run the whole planet, the longshore current that builds spits, and the sound that has made coasts audible since the Devonian.

Once the wind slackens or the fetch ends, waves become swell: they sort themselves by period because $c \propto T$, and a storm five thousand kilometres away delivers a clean, near-monochromatic train whose period announces the distance it travelled. Polynesian wayfinders used this — reading the crossing swell pattern to locate islands below the horizon — and satellite altimetry now maps the global swell climatology to 0.1 m and 0.5 s.
:::

::: example Wave energy and the power of a swell {#ex-wavepower}
Find the energy density, group velocity and energy flux of a swell with $H_s = 3\ \mathrm{m}$ and $T = 8\ \mathrm{s}$ in **deep** water, and the total power entering a **50-km** stretch of coast.
::: solution
$$
E = \tfrac{1}{8}\rho g H_s^{2} = \tfrac{1}{8}\times1025\times9.81\times9 = 11{,}300\ \mathrm{J\,m^{-2}}
$$
$$
c = \frac{gT}{2\pi} = 12.5\ \mathrm{m\,s^{-1}}, \qquad c_g = \frac{c}{2} = 6.25\ \mathrm{m\,s^{-1}},
$$
$$
P = E c_g = 11{,}300\times6.25 = 7.1\times10^{4}\ \mathrm{W\,m^{-1}} = 71\ \mathrm{kW\,m^{-1}},
$$
and over 50 km of crest, $3.5\times10^{9}\ \mathrm{W} = 3.5\ \mathrm{GW}$ — a large power station's output, arriving continuously, from an ordinary sea.

The efficiency problem is not the resource but its irregularity: the energy arrives in sets, in storms, and in directions that change on hours, and any device that survives a hundred-year storm must survive it while moored in water that carries ten times the design flux. Wave power converters have reached commercial failure repeatedly for fifty years for this reason and not for want of kilowatts.

The number that matters to the coast is the gradient, not the flux. Of the 71 kW m⁻¹ arriving, perhaps 65 kW m⁻¹ is dissipated in the surf zone — and where a harbour mole intercepts even five per cent of it, the longshore sediment transport that the flux was driving stops, and the updrift beach grows while the downdrift beach disappears. This is the entire mechanism of inlet stabilisation, beach nourishment failure and port siltation, and it is why coastal engineering is applied wave energy gradients.
:::
:::

::: example Swell sorting {#ex-swell}
A storm 5000 km away stops generating waves five days ago. What period dominates the swell observed here now, and how much longer do the 10-s components take?
::: solution
In deep water $c_g = gT/(4\pi)$, so a component of period $T$ travels distance $L$ in $t = 4\pi L/(gT)$. Inverting,
$$
T = \frac{4\pi L}{g t} = \frac{4\pi\times5\times10^{6}}{9.81\times4.32\times10^{5}} = 15\ \mathrm{s}.
$$
The **10-s** components travel at $c_g = 7.8\ \mathrm{m\,s^{-1}}$ and take $5\times10^{6}/7.8 = 6.4\times10^{5}\ \mathrm{s} = 7.4$ days — **two and a half days** later.

This sorting is why a forecast buoy off Namibia reports a clean 16-s swell from a South Atlantic storm three days earlier, why the wave spectrum is narrower far from generation regions, and why surf forecasters quote "swell window" directions and periods rather than wind: the energy has already been sorted by the dispersion relation on its way across the basin.

The same arithmetic is the basis of tsunami warning. A tsunami in shallow water travels at $\sqrt{gh}$, which is non-dispersive, so all its components arrive together and its travel time is a single number — the reason a warning can be issued in minutes and be trustworthy. Ordinary waves, being dispersive, cannot be warned about at all: their arrival is a smeared function of the whole wind history of the basin.
:::
:::

::: definition Tides {#def-tides}
The tidal potential of the Moon and Sun raises an equilibrium tide — the height the sea would reach if it stood still and responded instantly — of amplitude
$$
\eta_{\mathrm{eq}} = \frac{3}{2}\frac{M}{M_{\oplus}}\left(\frac{a}{r}\right)^{3} a ,
$$
which is $0.54\ \mathrm{m}$ for the Moon and $0.24\ \mathrm{m}$ for the Sun. The observed open-ocean range is $0.3$–$0.7\ \mathrm{m}$, close to equilibrium; the observed coastal range reaches $16\ \mathrm{m}$ in the Bay of Fundy and $15\ \mathrm{m}$ in the River Severn. The thirty-fold amplification is not a failure of the theory but its point: the tide is a forced oscillation of real basins, and everything interesting is in the resonance.

Four frequencies dominate. The principal lunar semidiurnal constituent M₂ has a period of $12.42\ \mathrm{h}$, the solar S₂ of $12.00\ \mathrm{h}$, the luni-solar diurnal K₁ of $23.93\ \mathrm{h}$ and the lunar diurnal O₁ of $25.82\ \mathrm{h}$. Spring tides occur when M₂ and S₂ align at syzygy, neap tides at quadrature; the 1.93-hour difference in their periods sets the 14.8-day spring–neap cycle. Basins whose natural period matches 12.42 h are semidiurnal (the North Atlantic, 12.4-h range of $3$–$5\ \mathrm{m}$); those matching 23.9 h are diurnal (the Gulf of Mexico, the Pacific coast of North America); the Mediterranean and Baltic are too small and too connected to resonate at either, and have ranges of $0.1$–$0.5\ \mathrm{m}$ and $0.02\ \mathrm{m}$.

In deep water the M₂ free wave speed is $\sqrt{gh} = 198\ \mathrm{m\,s^{-1}}$ and its wavelength is $\lambda = cT = 8900\ \mathrm{km}$ — wider than the Atlantic. A basin narrower than half a wavelength therefore cannot support a direct tide, and instead rotates a co-oscillating wave about an amphidromic point where the range is zero. Every tide table on Earth is a map of about a dozen such amphidromic systems, and the shape of each is set by coastline, shelf depth and friction.

Tidal friction does three things that reach beyond the shoreline. It dissipates $\sim 3.5\ \mathrm{TW}$ in the ocean — twenty-five times the total mechanical power of all rivers — of which roughly a tenth is converted to internal tides over rough topography and radiated into the interior, where it breaks and supplies a large fraction of the abyssal mixing that keeps the conveyor running. It torques the Earth, lengthening the day by $2.3\ \mathrm{ms}$ per century and pushing the Moon away at $3.8\ \mathrm{cm\ yr^{-1}}$, so that Devonian corals preserve $400$ days in a year and $385$-million-year-old tidal rhythms are written in growth rings. And it mixes estuaries: the residual circulation that traps turbidity maxima, the stratification that salt wedges depend on, and the flushing of every harbour on Earth are set by the cube of the tidal velocity, which is why a two-fold amplification means an eight-fold dissipation.
:::

::: widget plot
f: sqrt(tanh(x)/x)
x: 0.01, 10
y: 0.2, 1.1
labels: c/\sqrt{gh}
caption: The shallowing of the phase speed with relative depth, $c/\sqrt{gh} = \sqrt{\tanh(kh)/(kh)}$. At $kh = 10$ the wave is in deep water and "feels" only its own period; at $kh = 0.05$ it is in shallow water and "feels" only the bottom. The transition at $kh \approx \pi/2$ — a depth of about half the wavelength — is where everything that matters on a coast happens: refraction bends the crests parallel to the contours, shoaling grows the height as $h^{-1/4}$, the orbits stop being closed and the Stokes drift becomes a real current, and at $H/h \approx 0.78$ the wave breaks. The curve is also why a wind sea and a long swell arriving together break over different bars in different water, why a tsunami with a $200$-km wavelength is "shallow" in the middle of the Pacific and feels the bottom everywhere, and why surf forecasting is a bathymetric rather than a meteorological problem.
:::

::: example The tidal wavelength and the amphidrome {#ex-tidewave}
Find the M₂ free-wave wavelength in the 4000-m-deep Atlantic, and explain why the Atlantic has amphidromic points while the North Sea has a single rotating system.
::: solution
$$
c = \sqrt{gh} = \sqrt{9.81\times4000} = 198\ \mathrm{m\,s^{-1}}, \qquad
\lambda = cT = 198\times44{,}713 = 8900\ \mathrm{km}.
$$
The Atlantic is 5000–6000 km wide, so it is narrower than half a tidal wavelength and cannot hold a direct tide: the basin instead traps a quarter-wavelength mode and the wave rotates about amphidromic points — one off Portugal, one off Newfoundland, one in the northern interior — with the range growing outward from zero at the amphidrome to $16\ \mathrm{m}$ at the head of the Bay of Fundy. The North Sea, 900 km across with a mean depth of $95\ \mathrm{m}$, has $\lambda = \sqrt{9.81\times95}\times44{,}713 = 1300\ \mathrm{km}$, so it holds barely one rotating system, entering from the north and amplifying southward into the shallow southern Bight — which is exactly where the 1953 and 1962 floods struck.

The Coriolis force is what makes the wave rotate rather than reflect, and the radius of the rotation is the gravity wave radius $\sqrt{gh}/f$: $280$–$400\ \mathrm{km}$ in the deep ocean, comparable to the width of a continental shelf. That is why coastal trapped waves hug western boundaries in both hemispheres, why the tidal wave in the Bay of Bengal amplifies northward into the Ganges delta, and why the same geometry that makes Fundy the highest tide on Earth makes Bengal the deadliest.
:::
:::

::: example The internal tide {#ex-internaltide}
A two-layer ocean has a 200-m mixed layer over $3000\ \mathrm{m}$, with a density jump of $2\ \mathrm{kg\,m^{-3}}$. Find the phase speed of the M₂ internal tide, and compare it with the barotropic tide in $3200\ \mathrm{m}$.
::: solution
The reduced gravity is $g' = g\Delta\rho/\rho_0 = 9.81\times2/1025 = 1.9\times10^{-2}\ \mathrm{m\,s^{-2}}$, and the long internal wave speed is
$$
c_i = \sqrt{g'\frac{h_1 h_2}{h_1 + h_2}} = \sqrt{1.9\times10^{-2}\times\frac{200\times3000}{3200}} = 1.9\ \mathrm{m\,s^{-1}},
$$
against $\sqrt{9.81\times3200} = 177\ \mathrm{m\,s^{-1}}$ for the barotropic tide — a hundred-fold slower, and therefore a hundred-fold shorter in wavelength: $25\ \mathrm{km}$ instead of $2800\ \mathrm{km}$.

That shortness is the whole story of the internal tide. A barotropic tide of $10\ \mathrm{cm}$ wavelength thousands of kilometres sloshes coherently across oceans; a baroclinic tide of $100\ \mathrm{m}$ amplitude and $25\ \mathrm{km}$ wavelength is forced efficiently where the barotropic flow crosses rough topography — the Luzon Strait, the Hawaiian Ridge, the Brazil Margin, the Indian Ocean fracture zones — and then radiates away as an internal wave beam, steepens, and breaks hundreds of kilometres from where it was born.

The global conversion is $0.3$–$1\ \mathrm{TW}$, a tenth of the total tidal dissipation, and because the breaking occurs in the open interior rather than at coasts, that energy is delivered exactly where the abyssal mixing that keeps the conveyor running needs it. Roughly half the energy that lifts Antarctic Bottom Water back into the thermocline comes from the Moon pulling on submarine mountains, and without them the conveyor would be much slower than the wind alone would predict.
:::
:::

::: warning Linear theory is a very good approximation right up to the moment it is not
Six failures. Real waves are not sinusoidal. A fully developed sea is a random superposition of hundreds of components; the crests are higher and sharper and the troughs flatter than the significant wave height implies, and the largest wave in a storm is $H_{\max} \approx 1.86\,H_s$ by statistics alone — which is why rogue waves need not be anomalous, only unlucky, and why freak-wave research split into "linear superposition" and "nonlinear modulational instability" camps that both turn out to operate. Breaking is not in the equations. Linear theory has no mechanism for breaking, no whitecap dissipation, no surf zone, no set-up, and no longshore current; every one of those requires either an empirical breaker index or a Navier–Stokes simulation of air and water. Storm surge is not a wave. It is a sub-inertial, frictional, shallow-water response to pressure and wind, with a $1$-cm-per-hPa inverse-barometer component, a wind-setup component that scales as $\tau/\rho g h$ and can reach $5\ \mathrm{m}$ on a shallow shelf, and a tide that multiplies it — the 1953 North Sea and 2005 Katrina disasters were both surge-at-high-tide events, and the entire hazard is in the correlation. Tides are not predicted from the potential. They are predicted from decades of harmonic analysis of tide-gauge records, because the basin response — resonance, amphidromes, shelf friction, strait sills — is not computable from first principles, and the best global tide models still carry $2$–$5\ \mathrm{cm}$ errors on shelves. Internal tides are invisible and important. The baroclinic tide generated over the Luzon Strait, the Hawaiian Ridge and the Brazil Margin has an amplitude of $50$–$250\ \mathrm{m}$, radiates $0.3$–$1\ \mathrm{TW}$, and breaks far from its generation site — supplying much of the mixing that the conveyor needs, and corrupting every satellite altimeter measurement of the mean circulation with a signal that is coherent in time and therefore not averaged away. And the coastline is not fixed. Wave-driven littoral drift moves $10^{5}$–$10^{6}\ \mathrm{m^{3}}$ of sediment per metre of coast per century; a single groyne interrupts it; and sea-level rise makes the whole system retreat while keeping its shape — the Bruun rule — which is why seawalls so often accelerate the erosion they were built to stop.
:::
::: history
Isaac Newton (Newton) gave the tidal potential in the *Principia* of 1687; Daniel Bernoulli (Bernoulli) wrote the first equilibrium theory the same year, and Leonhard Euler and Alexis Clairaut the first dynamic ones in the 1740s. Pierre-Simon Laplace (Laplace) set out the shallow-water equations for the forced oscillation of real basins in 1775, and William Whewell (Whewell) mapped the co-oscillating waves of the North Atlantic and coined the word "amphidromic" in 1833–1836. George Biddell Airy (Airy) wrote the classic *Tides and Waves* report in 1845, deriving the long-wave results still used in every coastal manual; John Scott Russell (Russell) observed the solitary wave in a Scottish canal in 1834, and George Gabriel Stokes (Stokes) explained the net drift of floating water in 1847. George Howard Darwin (Darwin) developed harmonic analysis of the tides and the theory of tidal friction in the 1870s–1890s, showing that the Earth–Moon system evolves, and Albert Defant (Defant) codified two centuries of tidal science in *Gezeitenphysik* in 1961. Harold Jeffreys (Jeffreys) derived the wind generation of water waves in 1925, Sverdrup and Munk (Munk) turned it into a forecasting method in 1944, and Owen Phillips (Phillips) and John Miles (Miles) published the two mechanisms of wave growth in 1957 — resonant pressure and shear-flow instability — in back-to-back papers. Theodor Pierson and David Moskowitz (Moskowitz) gave the fully developed spectrum in 1964, Klaus Hasselmann (Hasselmann) and the JONSWAP group the fetch-limited one in 1973, and Michael Longuet-Higgins and Robert Stewart (Stewart) invented the radiation stress in 1953–1964, which finally made wave set-up, surf beats and longshore currents calculable. Walter Munk and David Cartwright (Cartwright) published "Tidal spectroscopy and prediction" in 1966, replacing harmonic extrapolation with a response function and making tide prediction a problem in statistics. Satellite altimetry from SEASAT onward forced the ocean tide to be solved globally, and Gary Egbert, Richard Ray and Carl Wunsch (Egbert) built the data-assimilative TPXO and GOT models of the 1990s–2000s that now carry the tidal correction for every altimeter, gravimeter and tide gauge on Earth. Eric Kunze (Kunze) and Jim Polzin (Polzin) Eric Kunze, Jim Polzin, Greg Firing, Amy Waterhouse and colleagues showed in 2006 that internal tides radiate from rough topography worldwide and dissipate about a terawatt, closing the loop between the Moon's pull on a seamount and the abyssal mixing that runs the conveyor.
:::

## Where this leads

The **wind** that generates waves is [[oceanography/air-sea-fluxes]] and [[meteorology/winds]], the **stress** the waves return to the air is the **Charnock** relation of [[oceanography/wind-driven]], the **mixing** that internal tides supply runs [[oceanography/overturning]] and [[oceanography/seawater]], the **tsunami** that shares the shallow-water equations is [[natural-hazards/tsunamis]], the **storm** **surge** is [[natural-hazards/storms]] and [[hydrology/floods-droughts]], the **coast** the waves build is [[geomorphology/coasts]], the **sea level** the tide rides on is [[oceanography/sea-level]] and [[climate-change/sea-level-rise]], the **ice shelf** the tides flex is [[glaciology/ice-shelves]], the **sea ice** that damps the swell is [[glaciology/sea-ice]], the **satellite** that measures it all is [[remote-sensing/radar-lidar]], and the **internal waves** that mix the thermocline belong with [[oceanography/wind-driven]].

::: quiz
A storm far away generates a broad wave spectrum. Why does the swell that arrives days later have a single, long period?
- [ ] Because short waves are generated less strongly.
- [x] Because deep-water wave speed increases with period, so long components arrive first and are stretched out ahead of the rest.
- [ ] Because the wind picks one period.
- [ ] Because short waves break at the surface.
::: solution
In deep water $c_g = gT/(4\pi)$, so period sorts by travel time. After days of travel the shortest components are still crossing the basin, and the local spectrum is a narrow band whose period announces the distance and the age of its storm.
:::
:::

::: summary
- Deep-water waves obey $\omega^2 = gk$; their speed depends only on period, their group velocity is half their phase speed, and their energy flux is about $H_s^2 T$ kilowatts per metre.
- Waves grow by Phillips' resonant pressure and Miles' critical-layer instability, saturate at $H_s = 0.025\,U_{10}^2$, and break in shallow water at $H/h \approx 0.78$.
- Refraction, shoaling and breaking are all consequences of $c = \sqrt{gh}$ in shallow water, which is why coasts are governed by bathymetry rather than weather.
- The equilibrium tide is only 0.5 m; ranges of 15 m exist because basins resonate, and every tide table is a map of amphidromic systems.
- Tidal friction dissipates 3.5 TW, lengthens the day by 2.3 ms per century, drives estuarine mixing, and radiates internal tides that mix the abyss.
- Storm surge is a pressure-and-wind setup, not a wave, and its danger is that it correlates with high tide.
- Linear theory is excellent until breaking, run-up and overtopping, where only statistics and laboratory experiment remain.
:::

## Exercises

::: exercise Deep-water speed {level=1 check="18.7"}
Find the phase speed of a **12-s** swell in deep water.
::: solution
$c = gT/2\pi = 1.56\times12 = 18.7\ \mathrm{m\,s^{-1}} = 67\ \mathrm{km\,h^{-1}}$. A 12-second swell travels faster than most coastal traffic — which is why swell arrives before the storm that made it and why surf forecasters have days of warning about energy that no local anemometer has seen.
:::
:::

::: exercise Shallow-water speed {level=1 check="17.2"}
Find the speed of a long wave in **30 m** of water, and say what happens to it as the depth falls to **3 m**.
::: solution
$c = \sqrt{gh} = \sqrt{9.81\times30} = 17.2\ \mathrm{m\,s^{-1}}$, falling to $\sqrt{9.81\times3} = 5.4\ \mathrm{m\,s^{-1}}$. The three-fold slowing is what refracts the crests parallel to the shore, concentrates energy on headlands, and makes the wave-energy flux per metre of coastline remarkably uniform around a bathymetric contour.
:::
:::

::: exercise The breaker {level=1 check="7.8"}
Find the maximum wave height that can exist over a sandbar in **10 m** of water.
::: solution
$H_b = 0.78\times10 = 7.8\ \mathrm{m}$. Any larger wave breaks — which is why the biggest surf in the world (Nazarré, Jaws, Nazaré's ground swell) requires deep water close inshore, and why the depth of a bar, not the size of the storm, sets the ceiling on the waves that reach a beach.
:::
:::

::: exercise Wave power {level=2 check="39"}
Find the energy flux of a $H_s = 2\ \mathrm{m}$, $T = 10\ \mathrm{s}$ swell.
::: solution
$P = \rho g^{2}H_s^{2}T/(32\pi) = 39\ \mathrm{kW\,m^{-1}}$. A 50-km front receives 2 GW. The reason wave energy is not a major power source is not density — it is higher than a wind farm's per unit area — but the cost of surviving the ten-fold storms that the annual energy passes through.
:::
:::

::: exercise Tsunami crossing {level=2 check="14"}
How long does a tsunami take to cross 10,000 km of 4000-m-deep Pacific?
::: solution
$c = \sqrt{9.81\times4000} = 198\ \mathrm{m\,s^{-1}} = 713\ \mathrm{km\,h^{-1}}$, so $t = 14\ \mathrm{h}$. A Chilean or Japanese tsunami reaches Hawaii in under ten hours and the US west coast in twenty, which is the entire budget of the Pacific Tsunami Warning Center, and the reason deep-ocean buoy networks (DART) are worth their cost: they detect the wave in minutes and confirm or cancel a warning before the coast must act.
:::
:::

::: exercise Green's law {level=2 check="3.8"}
A tsunami of **1 m** amplitude in **4000 m** of water approaches the coast. Find its amplitude at **20 m** depth.
::: solution
Green's law gives $\eta \propto h^{-1/4}$, so $\eta = (4000/20)^{1/4} = 3.8\ \mathrm{m}$. The observed run-up is far larger because Green's law assumes no friction, no refraction, no shelf resonance and no nonlinearity — and because the final metres involve the wave breaking on a beach that slopes, which steepens the front by another factor of two to five.
:::
:::

::: exercise Storm surge {level=3 check="68"}
A hurricane's central pressure is **945 hPa** against a background of **1013 hPa**. Find the inverse-barometer rise, and explain why the real surge is three times larger.
::: solution
The inverse-barometer response is 1 cm per hPa, giving $68\ \mathrm{hPa}\times1\ \mathrm{cm} = 68\ \mathrm{cm}$. The real surge reaches 2–3 m because the wind stress drives a steady setup over the shelf, $S \sim \tau L/(\rho g h)$: with $\tau = 0.5\ \mathrm{N\,m^{-2}}$, $L = 100\ \mathrm{km}$ and $h = 20\ \mathrm{m}$, $S = 0.5\times10^{5}/(1025\times9.81\times20) = 0.25\ \mathrm{m}$ per scale, and the shallowing shelf, the fetch-length storm track and the along-shore current multiply it. The 1953 North Sea flood and Hurricane Katrina were both spring-tide surges; the inverse barometer is the predictable part and the wind setup is the deadly part.
:::
:::

::: exercise Estuary resonance {level=3 check="73"}
An estuary **300 km** long is to resonate as a quarter-wavelength at the **M₂** period of **12.42 h**. Find the mean depth required.
::: solution
$\lambda = 4\times300 = 1200\ \mathrm{km}$, so $c = \lambda/T = 1.2\times10^{6}/44{,}713 = 26.8\ \mathrm{m\,s^{-1}}$ and $h = c^{2}/g = 73\ \mathrm{m}$. The Bay of Fundy is $\sim$240 km long with a mean depth of $\sim$60 m, giving a natural period of $\sim$11 h against a forcing of 12.42 h — close enough for a ten-fold amplification, and the reason its range is 16 m. The calculation also explains the Mediterranean's small tide: its natural periods are hours to a day, its sill is narrow, and it is neither resonant at M₂ nor at K₁.
:::
:::
