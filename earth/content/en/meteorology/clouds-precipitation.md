A cloud droplet is twenty micrometres across and falls through still air at one and a half centimetres a second. It would take an hour to fall a hundred metres, and the air inside a cumulus is rising at five metres a second — three hundred times faster. The cloud is not floating; it is being carried. This is the paradox at the heart of cloud physics, and its resolution is the most important quantitative fact in the subject: **clouds are made of droplets far too small to fall, and rain is made by a process that has to overcome that fact by a factor of a million in mass.** A cloud that cannot find the mechanism does not rain, however long it lasts; the trade-wind cumulus of the clean tropical marine atmosphere are three kilometres of water that mostly does not reach the sea.

::: proposition Nucleation: why clouds need dust {#prop-nucleation}
A droplet of radius $r$ has a vapour pressure above its surface raised by curvature,
$$
e(r) = e_s\,\exp\left(\frac{2\sigma M_w}{\rho_w R T r}\right),
$$
so that a droplet of $0.01\ \mu\mathrm{m}$ needs a relative humidity of three hundred per cent to exist. Pure moist air never reaches this, and homogeneous nucleation of water droplets does not occur in the atmosphere. Real droplets form on **cloud condensation nuclei** — soluble or partly soluble particles of sea salt, sulphate, nitrate, organic matter and dust — whose dissolved solute lowers the equilibrium vapour pressure, and the two effects together give the **Köhler equation**
$$
\ln\frac{e}{e_s} = \frac{2\sigma M_w}{\rho_w RT r} - \frac{n_s i M_w}{\rho_w (4\pi r^3/3 + b_s)} .
$$
The curve of $e/e_s$ against $r$ has a maximum, the **critical supersaturation**, typically $0.1$ to $1\%$, at a **critical radius** of $0.05$ to $0.1\ \mu\mathrm{m}$ for particles of $0.05$ to $0.2\ \mu\mathrm{m}$ dry radius. A particle larger than the critical size activates and grows to a cloud droplet; a smaller one stays a haze particle. Since the updraught through a cloud base supplies the supersaturation, the number of droplets that form is set by the number of nuclei above the critical size and by the vertical velocity: clean marine air with $30\ \mathrm{cm^{-3}}$ of nuclei makes fewer, larger droplets than polluted air with $1000\ \mathrm{cm^{-3}}$, and the two make clouds that reflect sunlight differently and rain at different rates.
:::

::: proof
The first term of the Köhler equation is the Kelvin effect: equating the chemical potential of liquid at a curved surface to that of the vapour gives $\RT \ln(e/e_s) = M_w p_L$, with the Laplace pressure $p_L = 2\sigma/r$, whence the exponential. The second is Raoult's law for a solution: the vapour pressure is lowered by the mole fraction of solute, which for a fixed mass of solute $n_s$ moles and van't Hoff factor $i$ in a droplet of volume $4\pi r^3/3$ is $n_s i/(n_w) \approx n_s i M_w/(\rho_w V)$.

The two terms have opposite signs and different powers of $r$: the Kelvin term goes as $1/r$ and dominates at large radius, the solute term as $1/r^3$ and dominates at small. Their sum therefore has a maximum, found by setting the derivative to zero. For an ammonium sulphate particle of $0.1\ \mu\mathrm{m}$ dry radius the maximum is at $r \approx 0.15\ \mu\mathrm{m}$ and a supersaturation of $0.4\%$, and for a sea-salt particle of the same size at $0.08\ \mu\mathrm{m}$ and $0.1\%$ — which is why sea salt activates at the small supersaturations found in a shallow marine cloud and why a pollution particle must wait for a stronger updraught. ∎
:::

::: example The critical radius {#ex-critical}
Take $\sigma = 0.072\ \mathrm{N\,m^{-1}}$, $M_w = 0.018\ \mathrm{kg\,mol^{-1}}$, $T = 293\ \mathrm{K}$ and $\rho_w = 1000\ \mathrm{kg\,m^{-3}}$. Find the radius of a pure-water droplet that can be in equilibrium at a supersaturation of $1\%$ and at $0.1\%$, and find the relative humidity at which a $0.02\ \mu\mathrm{m}$ droplet evaporates.
::: solution
Inverting the Kelvin equation,
$$
r^* = \frac{2\sigma M_w}{\rho_w R T\ln S} = \frac{2\times0.072\times0.018}{1000\times8.314\times293\times\ln S} = \frac{1.06\times10^{-9}}{\ln S}\ \mathrm{m}.
$$
At $S = 1.01$, $\ln S = 0.00995$ and $r^* = 0.107\ \mu\mathrm{m}$; at $S = 1.001$, $r^* = 1.06\ \mu\mathrm{m}$. A droplet smaller than $r^*$ grows by evaporation, not condensation — it is unstable — so a $0.02\ \mu\mathrm{m}$ pure-water droplet needs a supersaturation of $5.3\%$ to survive, which no cloud reaches.

The consequence is that the smallest cloud droplets observed, at $1$–$2\ \mu\mathrm{m}$, are the residues of the smallest activated nuclei, and that the entire population of atmospheric particles below $0.05\ \mu\mathrm{m}$ — the majority of the numbers in a polluted or newly nucleated air mass — contributes nothing to cloud until it grows by condensation of vapour or coagulation. This is the reason the climate effects of aerosol depend on the aerosol's size and composition and not merely on its mass, and why a mass emission inventory tells you so little about a cloud.
:::
:::

## Two roads to a raindrop

::: definition Condensation growth and collision–coalescence {#def-growth}
The radius of a growing droplet obeys $r\,\mathrm{d}r/\mathrm{d}t = G S$, so that $r \propto t^{1/2}$: condensation is fast at first and then hopeless. A droplet reaches $10\ \mu\mathrm{m}$ in a minute and $30\ \mu\mathrm{m}$ in an hour, and to reach $1\ \mathrm{mm}$ by condensation alone would take weeks — during which it would have fallen out of the cloud. The **collision–coalescence** or **warm rain** process is the alternative: a drop of $25\ \mu\mathrm{m}$ begins to fall relative to its neighbours at a few centimetres a second and sweeps up the smaller droplets in its path at a rate
$$
\frac{\mathrm{d}m}{\mathrm{d}t} = E\,w_L\,\pi r^2 v ,
$$
with $E$ the collection efficiency, $w_L$ the liquid water content ($0.5$–$3\ \mathrm{g\,m^{-3}}$ in water clouds) and $v$ the fall speed. The growth rate is proportional to $r^2$, so bigger drops grow faster: the process is an instability with a long **growth bottleneck** — the first hundred micrometres take tens of minutes — and then accelerates to rain in another ten minutes. It needs a broad droplet spectrum to start, which is why the presence of a few large sea-salt droplets or of ice is so effective.
:::

::: proposition The Bergeron process {#prop-bergeron}
Below $0\ ^\circ\mathrm{C}$ the saturation vapour pressure over ice is less than over water: at $-10\ ^\circ\mathrm{C}$, $2.60$ against $2.87\ \mathrm{hPa}$, a difference of $9\%$, and at $-20\ ^\circ\mathrm{C}$, $1.03$ against $1.26$, $18\%$. Air therefore cannot be simultaneously saturated with respect to both, and if ice crystals and supercooled droplets coexist the vapour pressure settles between the two values — subsaturated for the droplets, supersaturated for the crystals — and water evaporates from the droplets and deposits on the crystals. **A cloud containing both grows its ice at the expense of its water**, and the crystals become large enough to fall in minutes rather than hours. Since the difference $e_s^\text{water} - e_s^\text{ice}$ vanishes at $0$ and at $-40\ ^\circ\mathrm{C}$ and peaks near $-15\ ^\circ\mathrm{C}$, the process is most vigorous there, which is why the most productive clouds have tops near $-15\ ^\circ\mathrm{C}$, at $5$–$7\ \mathrm{km}$ in the mid-latitudes.
:::

::: example Ice against water {#ex-bergeron}
A mixed cloud at $-12\ ^\circ\mathrm{C}$ has a liquid water content of $0.5\ \mathrm{g\,m^{-3}}$, an ice-crystal concentration of $1\ \mathrm{litre^{-1}}$, and an updraught of $1\ \mathrm{m\,s^{-1}}$. The saturation vapour pressures are $2.85\ \mathrm{hPa}$ over water and $2.60\ \mathrm{hPa}$ over ice. Find the vapour pressure that the air settles to, and estimate how long the cloud's liquid water lasts.
::: solution
With few crystals and much water, the vapour pressure is buffered near the value over ice, and the droplets evaporate into an air that is $9\%$ undersaturated with respect to them. The whole $0.5\ \mathrm{g\,m^{-3}}$ of liquid must either evaporate or deposit onto the crystals. The crystals, at one per litre, present a tiny collecting area — $10^6\ \mathrm{m^{-3}}$ of crystals of $50\ \mu\mathrm{m}$ radius have a total cross-section of $7.9\times10^{-3}\ \mathrm{m^2}$ per cubic metre — and the depositional growth rate per crystal is of order $10\ \mu\mathrm{m}$ per minute in these conditions, so a crystal reaches $1\ \mathrm{mm}$ in ten minutes and begins to fall.

The cloud's liquid is consumed at the rate the crystals can collect the vapour, which with the updraught supplying more water is a balance: the cloud produces precipitation at a rate of order
$$
P = N\,\dot m = 10^6\times\left(\rho_i 4\pi r^2\dot r\right) \approx 10^6\times 900\times4\pi(5\times10^{-5})^2\times(1.7\times10^{-7}) = 2\times10^{-8}\ \mathrm{kg\,m^{-3}\,s^{-1}},
$$
which over a $3\ \mathrm{km}$-deep cloud layer gives a surface precipitation rate of a few tenths of a millimetre an hour — the right order for the steady snow of a warm-frontal deck. The point of the calculation is the contrast: the same cloud without ice, at the same temperature and water content, would produce almost nothing, because the droplets have no mechanism to grow. This is why the mountains of the tropics, whose clouds top $-20\ ^\circ\mathrm{C}$, rain at ten times the rate of the lowlands beside them, and why the artificial seeding of clouds has worked, when it has, only in supercooled ones.
:::
:::

::: svg
caption: Two roads to a raindrop, drawn on logarithmic axes of radius against time. Condensation follows the square-root law and stalls at thirty micrometres, where the droplet's fall speed is a centimetre a second and its life in the cloud is over. Collision and coalescence begins from a droplet already twenty-five micrometres across, is slow for ten minutes while the collector drop gathers speed, and then runs away to rain in a quarter of an hour. The ice process is not drawn because it does not grow droplets at all: it moves the water from the droplets onto a few crystals, which then fall and collect as they go. The vertical line marks the size at which a drop's fall speed exceeds any cloud updraught.
<svg viewBox="0 0 760 330" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Droplet growth by condensation and collection">
  <style>
    .ax { stroke: var(--ink-2); stroke-width: 1.2; fill: none; }
    .c1 { stroke: var(--series-1); stroke-width: 2.4; fill: none; }
    .c2 { stroke: var(--series-2); stroke-width: 2.4; fill: none; }
    .grid { stroke: var(--rule); stroke-width: 1; }
    .lab { fill: var(--ink); font-size: 12.5px; font-weight: 700; }
    .sub { fill: var(--ink-2); font-size: 11px; }
  </style>
  <line class="grid" x1="90" y1="250" x2="720" y2="250"/>
  <line class="grid" x1="90" y1="160" x2="720" y2="160"/>
  <line class="grid" x1="90" y1="70" x2="720" y2="70"/>
  <line class="ax" x1="90" y1="290" x2="720" y2="290"/>
  <line class="ax" x1="90" y1="30" x2="90" y2="290"/>
  <path class="c1" d="M100,278 C160,240 240,214 340,196 C440,182 560,174 700,170"/>
  <path class="c2" d="M300,272 C380,268 440,250 490,208 C530,168 560,116 590,60"/>
  <line class="grid" x1="590" y1="40" x2="590" y2="290"/>
  <text class="lab" x="150" y="200">condensation, r proportional to root t</text>
  <text class="sub" x="150" y="216">stalls at 30 micrometres</text>
  <text class="lab" x="380" y="286">collision and coalescence</text>
  <text class="sub" x="380" y="302">the bottleneck, then the runaway</text>
  <text class="sub" x="600" y="52">rain: 0.5 to 5 mm</text>
  <text class="sub" x="96" y="44">radius</text>
  <text class="sub" x="96" y="266">1 micrometre</text>
  <text class="sub" x="96" y="176">30 micrometres</text>
  <text class="sub" x="96" y="86">1 millimetre</text>
  <text class="sub" x="640" y="286">time, log</text>
</svg>
:::

::: example The water budget of a cumulus {#ex-budget}
A cumulus congestus is $1\ \mathrm{km}$ across and $3\ \mathrm{km}$ deep, with a mean liquid water content of $1\ \mathrm{g\,m^{-3}}$, a base updraught of $3\ \mathrm{m\,s^{-1}}$, and an inflow layer of $500\ \mathrm{m}$ depth carrying air with $10\ \mathrm{g\,kg^{-1}}$ of vapour. It rains at $10\ \mathrm{mm\,h^{-1}}$ over its area. Find its water content, the rate at which the updraught supplies water, the precipitation efficiency, and the flushing time.
::: solution
The volume is $\pi(500)^2\times3000 = 2.4\times10^9\ \mathrm{m^3}$, so the cloud holds $2.4\times10^6\ \mathrm{kg}$, about $2400$ tonnes of liquid — the load of five hundred lorries, hanging in the air.

The inflow through the base is $\pi(500)^2\times3 = 2.4\times10^6\ \mathrm{m^3\,s^{-1}}$, and with a vapour mixing ratio of $10\ \mathrm{g\,kg^{-1}}$ at $1.2\ \mathrm{kg\,m^{-3}}$ this carries $2.9\times10^4\ \mathrm{kg\,s^{-1}}$ of water. The rainfall over the cloud's area is
$$
10\times10^{-3}\times7.85\times10^5\times1000/3600 = 2200\ \mathrm{kg\,s^{-1}},
$$
so the precipitation efficiency — the rain divided by the water supplied — is $7\%$. The flushing time, the residence time of air in the cloud, is $2.4\times10^9/2.4\times10^6 = 1000\ \mathrm{s}$, a quarter of an hour, and the observed lifetime of a cumulus congestus is twenty to forty minutes.

Three conclusions follow, and they are the reason the subject is hard. A cloud is not an object but a steady state, like a flame: every few minutes it is made of different air, and the "life cycle" of a cumulus is the life cycle of the updraught, not of the water. The efficiency of a single cloud is low because most of the water that condenses falls out or evaporates in the environment, and it is only in a organised system — a squall line, a mesoscale convective complex, a tropical cyclone — that the efficiency reaches fifty per cent and the rain becomes a flood. And the $2400$ tonnes of water are held up by an updraught carrying $2.4\times10^6\ \mathrm{m^3\,s^{-1}}$; when the inflow is cut off, by a spreading cold pool or by the loss of surface heating, the cloud does not drain, it evaporates, and it does so within ten minutes.
:::
:::

::: widget plot
f: 9.65-10.3*exp(-0.6*x) ; w
x: 0.2, 6
y: 0, 12
sliders: w=8:0:12
labels: fall speed (m/s)
caption: The terminal velocity of a raindrop against its diameter, with the horizontal line at an updraught set by the slider. A drop of $0.5\ \mathrm{mm}$ falls at $2\ \mathrm{m\,s^{-1}}$ and survives in any cumulus; a $5\ \mathrm{mm}$ drop falls at $9\ \mathrm{m\,s^{-1}}$ and needs a strong storm to be held up at all. The same curve decides whether hail is possible: a hailstone of $2\ \mathrm{cm}$ falls at about $15\ \mathrm{m\,s^{-1}}$ and one of $5\ \mathrm{cm}$ at $25\ \mathrm{m\,s^{-1}}$, so a stone of the latter size can only be grown in an updraught at least that strong, which on Earth means a supercell. It also sets the size at which drops break up — near $6\ \mathrm{mm}$, where the aerodynamic pressure overcomes the surface tension — which is why the largest raindrops in a tropical downpour are about $5\ \mathrm{mm}$ across and why the drop-size spectrum of every rain on every planet is truncated at the point where fall speed stops increasing.
:::

## The clouds themselves

::: definition The genera, and what they mean {#def-clouds}
Luke Howard's twelve-word nomenclature of 1803 organises the sky by form and height. **High clouds** above $6\ \mathrm{km}$ are of ice: *cirrus* (fibres, the wind streaks of the upper troposphere), *cirrostratus* (the milky veil that makes a $22^\circ$ halo and precedes a warm front by twelve hours), *cirrocumulus* (the mackerel sky). **Middle clouds**, $2$–$7\ \mathrm{km}$: *altostratus* (the grey sheet through which the Sun shows as a blurred disc, and which brings the steady rain of a warm front), *altocumulus* (the layered fleeces, and, in lens shapes over hills, the mountain wave). **Low clouds** below $2\ \mathrm{km}$: *stratus* (the cloud on the ground's terms, the drizzle of a warm sector), *stratocumulus* (the broken sheet that covers a fifth of the globe and reflects more sunlight than any other cloud), *nimbostratus* (the rain cloud of the mature cyclone, dark, featureless, deep). **Vertical clouds**: *cumulus* of fair weather, *cumulus congestus*, and *cumulonimbus*, whose anvil is the tropopause and whose base may be $1\ \mathrm{km}$ below a top at $15$. Two more are worth knowing by sight: *lenticularis*, the standing wave cloud that marks rotor turbulence, and *mammatus*, the pouches under an anvil that mark the sinking of cloudy air.
:::

::: example Radar, and measuring what falls {#ex-radar}
A weather radar measures a reflectivity of $40\ \mathrm{dBZ}$ in a rain shower. Using $Z = 200\,R^{1.6}$ with $Z$ in $\mathrm{mm^6\,m^{-3}}$ and $R$ in $\mathrm{mm\,h^{-1}}$, find the rainfall rate. What rate does the same reflectivity imply if the precipitation is dry snow, for which $Z = 1000\,R^{1.6}$?
::: solution
$Z = 10^{40/10} = 10^4\ \mathrm{mm^6\,m^{-3}}$, so $R = (10^4/200)^{1/1.6} = 50^{0.625} = 11.7\ \mathrm{mm\,h^{-1}}$ — a heavy shower. For snow, $R = (10^4/1000)^{0.625} = 4.0\ \mathrm{mm\,h^{-1}}$ of liquid-equivalent, but the same $40\ \mathrm{dBZ}$ of dry snow falls as perhaps $40\ \mathrm{mm}$ of snowfall an hour, because the flakes are large, slow and mostly air.

This is the whole difficulty of radar quantitative precipitation estimation: the machine measures the sixth power of the particle size and the number of particles, not the water, and the conversion depends on the phase, the size distribution and the shape. The $Z$–$R$ relation for convective rain uses $300$–$400$ for $a$, stratiform rain $80$–$120$, and snow an order of magnitude more; a dual-polarisation radar measures the shape and the dielectric constant directly and does much better, which is why the radar rainfall of the 2020s is more trustworthy than that of the 1990s. The tipping-bucket gauge, for its part, under-catches by $5$–$20\%$ in wind, by up to $50\%$ as snow, and by a further few per cent to evaporation and to the water that clings to the inside of the funnel.
:::
:::

::: warning Water vapour is invisible
What you see over a kettle, over a lake on a cold morning, and in a cloud is liquid water, not vapour: water vapour is a colourless gas and there is no such thing as a visible puff of it. The corollaries matter. The "steam" of a shower is condensation that has already happened a centimetre above the nozzle, where the air has cooled enough. A humid day is not a misty one: the air at a dew point of $25\ ^\circ\mathrm{C}$ holds three times the vapour of a fog at $2\ ^\circ\mathrm{C}$, and is perfectly clear. And the claim that "carbon dioxide is negligible because water vapour is the main greenhouse gas" confuses two different things — water vapour is indeed responsible for about half of the natural greenhouse effect and carbon dioxide for about a fifth, but water vapour is a feedback whose amount is set by the temperature, and carbon dioxide is the forcing that sets the temperature. Doubling the carbon dioxide doubles a control variable; the water vapour then increases by about $7\%$ per kelvin and roughly doubles the response.
:::

::: quiz
Why does a cloud containing supercooled water droplets and ice crystals at $-12\ ^\circ\mathrm{C}$ produce precipitation more readily than one containing only droplets at the same temperature?
- [ ] Because ice is heavier than water and falls faster
- [x] Because the vapour pressure over ice is lower, so vapour moves from droplets to crystals and the crystals grow
- [ ] Because the droplets freeze on contact with the crystals
- [ ] Because the crystals are larger than the droplets to begin with
::: solution
The saturation vapour pressure over ice is $9\%$ lower than over water at $-12\ ^\circ\mathrm{C}$, so an air mass holding both is supersaturated for ice and undersaturated for water, and the water migrates through the vapour phase onto the crystals. The crystals grow to precipitation size in minutes while the droplets shrink. This is the Bergeron–Findeisen process, and it is the reason that most of the mid-latitude rainfall, and nearly all snow, begins with ice.
:::
:::

::: history
Luke Howard read his "On the Modifications of Clouds" to the Askesian Society of London in 1802 and 1803, using the pseudonym of a member so that the paper would be judged on itself, and gave the world words that were already in Latin and were about to become words in every European language; Jean-Baptiste de Lamarck had proposed an equally useless nomenclature in France a few months earlier, and only Howard's survived because it was plastic. The idea that ice might be involved in rain came from Alfred Wegener in 1911, from the observations of the Austrian scientist Weickenmeier, and was made quantitative by Walter Findeisen in 1931 and formulated by Tor Bergeron in 1933, who explained in the same paper why the clouds of the tropics rain and those of the clean marine boundary layer do not. The theory was resisted for a decade, and ended not by argument but by an experiment: on 13 November 1946 Vincent Schaefer dropped crushed dry ice into a supercooled cloud in a laboratory at Schenectady and watched it produce snow, and eleven months later Bernard Vonnegut, working with the same laboratory's supplies, found that silver iodide does the same job from an aircraft. Cloud seeding began within months as a commercial industry and has never entirely been proved or disproved, and the honest summary, sixty years of field experiments later, is that glaciogenic seeding of supercooled orographic clouds increases snowfall by perhaps ten per cent under favourable conditions and that nothing else has been demonstrated. The physics of the warm-cloud process was settled in the 1950s by John Mason's cloud tunnel and rotating-arm chamber at the Imperial College, where he measured collection efficiencies by firing drops at clouds of smaller drops, and the numerical models of the growth instability are the work of Joshua Goldshtein and of Gregory Young in the 1970s and 1980s.
:::

## Where this leads

The updraughts that feed these clouds are the subject of [[meteorology/stability]] and, at storm scale, of [[meteorology/storms]]; the microphysics is done at length in [[atmospheric-dynamics/cloud-physics]]; the aerosol control of droplet number and of cloud reflectance is in [[atmospheric-chemistry/aerosols]]; the precipitation that reaches the ground is measured and modelled in [[hydrology/precipitation-evaporation]]; and the cloud feedbacks that dominate the uncertainty in climate sensitivity are in [[climate-system/feedbacks-sensitivity]].

::: summary Key takeaways
- Cloud droplets form on cloud condensation nuclei because pure water needs several hundred per cent supersaturation; the Köhler equation's maximum sets a critical supersaturation of 0.1-1%.
- Droplet number is set by the aerosol and the updraught, not by the water supply, and it controls the cloud's brightness and its tendency to rain.
- Condensation follows a square-root law and stalls at thirty micrometres; rain needs collision and coalescence, with its growth bottleneck, or the ice process.
- The Bergeron process works because the saturation vapour pressure over ice is lower than over water, and it is strongest near -15 C, which is why productive clouds reach 5-7 km.
- Clouds are classified by form and height, and the sequence cirrus, cirrostratus, altostratus, nimbostratus is the reading of an approaching warm front.
- Radar measures the sixth power of the drop size, not the water, and every rainfall estimate from a radar is a conversion that depends on the phase of the precipitation.
- Water vapour is invisible; what you see is always liquid or ice.
:::

## Exercises

::: exercise Kelvin effect {level=1 check="1.06"}
For the constants of the worked example, find the critical radius, in micrometres, at a supersaturation of $0.1\%$.
::: solution
$r^* = 1.06\times10^{-9}/0.001 = 1.06\ \mu\mathrm{m}$. A droplet smaller than this evaporates, which is why the smallest cloud droplets are about a micrometre across.
:::
:::

::: exercise Terminal velocity {level=1 check="2.0"}
Using the expression in the widget, find the fall speed, in $\mathrm{m\,s^{-1}}$, of a raindrop $0.5\ \mathrm{mm}$ across.
::: solution
$v = 9.65 - 10.3\,e^{-0.3} = 9.65 - 7.63 = 2.0\ \mathrm{m\,s^{-1}}$. A cumulus updraught of $5\ \mathrm{m\,s^{-1}}$ carries such a drop upward, which is how drops are held in a cloud long enough to grow.
:::
:::

::: exercise Saturation over ice {level=1 check="9.4"}
At $-10\ ^\circ\mathrm{C}$ the saturation vapour pressures are $2.87\ \mathrm{hPa}$ over water and $2.60\ \mathrm{hPa}$ over ice. Find the percentage difference relative to water.
::: solution
$(2.87-2.60)/2.87 = 9.4\%$. This small difference drives the whole of the ice process, and it reaches its maximum of $21\%$ near $-30\ ^\circ\mathrm{C}$, though the availability of liquid water falls off before that.
:::
:::

::: exercise Collection {level=1 check="0.79"}
A drop of $0.5\ \mathrm{mm}$ radius falls at $2\ \mathrm{m\,s^{-1}}$ through a cloud of liquid water content $1\ \mathrm{g\,m^{-3}}$ with a collection efficiency of $0.5$. Find the rate of increase of its mass in units of $10^{-9}\ \mathrm{kg\,s^{-1}}$.
::: solution
$\mathrm{d}m/\mathrm{d}t = 0.5\times10^{-3}\times\pi\times(5\times10^{-4})^2\times2 = 7.9\times10^{-10}\ \mathrm{kg\,s^{-1}}$, that is $0.79\times10^{-9}$. The drop's mass is $5.2\times10^{-7}\ \mathrm{kg}$, so it doubles in eleven minutes: the growth is exponential in radius, and this is the runaway.
:::
:::

::: exercise Radar {level=2 check="11.7"}
Find the rainfall rate for a reflectivity of $40\ \mathrm{dBZ}$ using $Z = 200R^{1.6}$.
::: solution
$R = (10^4/200)^{1/1.6} = 11.7\ \mathrm{mm\,h^{-1}}$.
:::
:::

::: exercise Droplet concentration {level=2 check="13"}
A cloud base has an updraught of $0.5\ \mathrm{m\,s^{-1}}$ and a supersaturation of $0.3\%$, activating all nuclei larger than $0.1\ \mu\mathrm{m}$. If the air has $100\ \mathrm{cm^{-3}}$ of such nuclei and a liquid water content of $1\ \mathrm{g\,m^{-3}}$ is produced, estimate the mean droplet radius, in micrometres.
::: solution
The number concentration is $N = 10^8\ \mathrm{m^{-3}}$ and the total liquid mass $10^{-3}\ \mathrm{kg\,m^{-3}}$, so each droplet has $10^{-11}\ \mathrm{kg}$ and a radius
$$
r = \left(\frac{3\times10^{-11}}{4\pi\times1000}\right)^{1/3} = 1.3\times10^{-5}\ \mathrm{m} = 13\ \mu\mathrm{m}.
$$
With ten times the droplet number the same liquid water is divided among ten times as many drops, so each has a tenth of the volume and the radius falls by $10^{-1/3} = 2.15$, to $6\ \mu\mathrm{m}$. Smaller droplets scatter more light for the same water (the first Twomey effect) and are less likely to collide, which is the second effect and the one that may make polluted clouds rain less.
:::
:::

::: exercise Hail {level=2 check="28"}
A hailstone of $2\ \mathrm{cm}$ diameter has a density of $850\ \mathrm{kg\,m^{-3}}$. Estimate its fall speed, in $\mathrm{m\,s^{-1}}$, taking the drag coefficient as $0.6$.
::: solution
Balancing weight and drag,
$$
v = \sqrt{\frac{8\rho_i g D}{3 C_D \rho_a}} = \sqrt{\frac{8\times850\times9.81\times0.02}{3\times0.6\times1.2}} = \sqrt{779} = 28\ \mathrm{m\,s^{-1}}.
$$
(Enter to the nearest unit: $28$.) A stone of this size therefore falls faster than most thunderstorm updraughts and is only sustained where the updraught is $25\ \mathrm{m\,s^{-1}}$ or more, or where it forms near the top of the storm and simply falls out of it — which is how most large hail reaches the ground, and why the largest hail falls from the anvil region rather than from the core.
:::
:::

::: exercise Deriving the Köhler maximum {level=3}
For a droplet containing $n_s$ moles of a fully dissociated solute, write the Köhler equation in the form $\ln S = a/r - b/r^3$ and find the critical radius and critical supersaturation in terms of $a$ and $b$. Show that the critical supersaturation scales as $n_s^{-1/2}$, and discuss what this implies for the activation of particles of different sizes.
::: solution
Differentiating, $\mathrm{d}\ln S/\mathrm{d}r = -a/r^2 + 3b/r^4 = 0$ gives $r_c = (3b/a)^{1/2}$ and
$$
\ln S_c = \frac{a}{r_c} - \frac{b}{r_c^3} = \frac{a}{r_c} - \frac{a}{3r_c} = \frac{2a}{3r_c} = \frac{2a^{3/2}}{3\sqrt{3b}} .
$$
Since $b \propto n_s$, $\ln S_c \propto n_s^{-1/2}$: the more soluble or more massive the particle, the lower the supersaturation it needs, and the dependence is a square root, so a hundredfold increase in solute mass lowers the required supersaturation only tenfold.

Because $n_s$ is fixed by the particle and $r$ grows as it takes up water, the activation condition is essentially a condition on the dry size: for a given soluble species, $S_c \propto r_\text{dry}^{-3/2}$, so the largest few per cent of the aerosol population dominates the droplet number. This is why cloud condensation nuclei spectra are steeply increasing functions of size, why the number of droplets is set by the number of accumulation-mode particles, and why the freshly nucleated mode of $10\ \mathrm{nm}$ particles over the forest and the ocean, abundant though it is, contributes almost no droplets until it has grown.
:::
:::

::: exercise The marine stratocumulus {level=3}
The stratocumulus of the eastern subtropical oceans covers $5\times10^6\ \mathrm{km^2}$, is $600\ \mathrm{m}$ deep, has a liquid water path of $60\ \mathrm{g\,m^{-2}}$ and an albedo of $0.35$ against the underlying ocean's $0.07$. Find the liquid water content, the mean droplet radius for $N = 100\ \mathrm{cm^{-3}}$, and the reflected solar power, and compare it with the reflected power if the cloud were replaced by clear ocean in the $260\ \mathrm{W\,m^{-2}}$ of sunlight that reaches these latitudes.
::: solution
The liquid water content is $60/600 = 0.1\ \mathrm{g\,m^{-3}}$, low but typical of a cloud being evaporated by dry air entrained at its top. With $N = 10^8\ \mathrm{m^{-3}}$ the droplet radius follows from $\tfrac{4}{3}\pi r^3\rho_w N = 10^{-4}$ as $r = 10.4\ \mu\mathrm{m}$.

The cloud reflects $0.35\times260 = 91\ \mathrm{W\,m^{-2}}$ and the ocean would reflect $18$, so the cloud returns $73\ \mathrm{W\,m^{-2}}$ to space over an area of $5\times10^6\ \mathrm{km^2}$ — a total of $3.7\times10^{14}\ \mathrm{W}$, about a quarter of the entire present radiative forcing from carbon dioxide, produced by a cloud whose droplets are the size of those in a shower and whose water is replaced in an hour. Two things follow. If the droplet number rose by fifty per cent at fixed water, the radius would fall by $11\%$ and the albedo would rise by a few per cent, which is the ship-track effect and the basis of a proposed geoengineering scheme whose advocates have not accounted for the cloud's lifetime, its precipitation, or the fact that the same aerosol also absorbs. And if the cloud broke up — as models disagree about whether it does at $2$–$4\ \mathrm{K}$ of warming — the $73\ \mathrm{W\,m^{-2}}$ becomes $18$, a forcing larger than the doubling of carbon dioxide. This single cloud deck is the largest uncertainty in climate sensitivity, and it is $600\ \mathrm{m}$ thick.
:::
:::
