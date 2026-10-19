A cumulus cloud is held up in the most literal sense: its water is carried as droplets so small that a gentle updraught keeps them aloft almost indefinitely. A $10\ \mu\mathrm{m}$ droplet falls through still air at about $1\ \mathrm{cm\,s^{-1}}$, a speed a rising thermals easily exceeds, and so the central puzzle of cloud physics is not how water condenses but how a $10\ \mu\mathrm{m}$ droplet — the size condensation alone ever produces — becomes a $2000\ \mu\mathrm{m}$ raindrop, a factor of two hundred in radius and eight million in mass. The answer runs through the physics of aerosols, the failure of pure water to nucleate, the geometry of collisions, and, in the cold half of the sky, the remarkable fact that ice and water compete for the same vapour and ice always wins.

## Nucleation and the Köhler curve

Pure water vapour does not condense on demand. It condenses on surfaces, and in a clean, dust-free room it can be cooled to a supersaturation of several hundred per cent before droplets appear spontaneously, because the first embryo of a droplet is so small that its surface energy exceeds the bulk free energy that condensation releases. The atmosphere never faces this problem, because it is full of **cloud condensation nuclei** — sea salt, sulphate, dust, soot, pollen, and organic matter — on which water condenses at supersaturations of a fraction of one per cent. The competition between the two effects that govern a wet aerosol particle, the curvature that raises the equilibrium vapour pressure and the dissolved solute that lowers it, is the **Köhler curve**, and it is the foundation of the whole subject.

::: definition The Kelvin and Raoult terms {#def-kohler-terms}
A droplet of pure water of radius $r$ at temperature $T$ is in equilibrium with a vapour pressure $e_r$ higher than the flat-surface saturation value $e_s$, because molecules escape more easily from a convex surface. The **Kelvin (curvature) term** follows from equating the chemical-potential cost of the surface to the gain from condensation,
$$
e_r = e_s\,\exp\!\left(\frac{2\,\sigma\,M_w}{\rho_w\,R\,T\,r}\right), \qquad \frac{2\sigma M_w}{\rho_w R T} \equiv a \approx 1.1\times10^{-3}\ \mu\mathrm{m}\ \ (T = 283\ \mathrm{K}),
$$
with $\sigma = 0.072\ \mathrm{N\,m^{-1}}$ the surface tension, $M_w = 0.018\ \mathrm{kg\,mol^{-1}}$, $\rho_w = 1000\ \mathrm{kg\,m^{-3}}$ and $R = 8.314\ \mathrm{J\,mol^{-1}\,K^{-1}}$. A $0.1\ \mu\mathrm{m}$ pure droplet needs $1.1$ per cent supersaturation to survive, a $0.05\ \mu\mathrm{m}$ one $2.2$ per cent, and a $0.02\ \mu\mathrm{m}$ one $5.7$ per cent — which is why pure water cannot nucleate at atmospheric supersaturations and why clouds need nuclei.

Dissolved salt works the other way. A particle containing $n_s$ moles of solute lowers the equilibrium vapour pressure by the **Raoult (solute) term**,
$$
\frac{e}{e_s} = \frac{n_w}{n_w + \nu\phi\, n_s} \approx 1 - \frac{b}{r^{3}}, \qquad b = \frac{3\,\nu\phi\, n_s\, M_w}{4\pi\rho_w},
$$
where $\nu$ is the number of ions per formula unit ($\nu = 2$ for ammonium sulphate and for sodium chloride) and $\phi \approx 0.85$–$1.0$ is the osmotic coefficient. The solute term falls off as $r^{-3}$, faster than the curvature term's $r^{-1}$.
:::

::: proposition The Köhler curve and critical activation {#prop-kohler}
Combining the two terms, the equilibrium supersaturation over a wet aerosol containing a fixed amount of solute is
$$
S(r) = \frac{e}{e_s} = \exp\!\left(\frac{a}{r} - \frac{b}{r^{3}}\right).
$$
Because the solute term falls faster, $S(r)$ rises to a maximum at the **critical radius** and then falls: setting $\mathrm{d}S/\mathrm{d}r = 0$ gives
$$
r_c = \sqrt{\frac{3b}{a}}, \qquad \ln S_c = \frac{2a}{3 r_c} = 2\sqrt{\frac{a^{3}}{27\,b}} .
$$
A particle placed in air of supersaturation $S$ is stable only on the large-$r$ branch beyond the peak. If the ambient $S$ exceeds $S_c$ the particle has no stable equilibrium and grows without limit — it is **activated** into a cloud droplet; if $S < S_c$ it settles onto the small-$r$ branch as a swollen but sub-microscopic **interstitial** haze particle. Smaller particles have larger $b$ relative to their size and so larger $S_c$: **the smaller the nucleus, the larger the supersaturation needed to activate it**, and this single fact explains why clouds form on the largest and most hygroscopic particles and why the number of droplets a cloud contains is set by the aerosol, not by the water.
:::

::: example Critical supersaturation of an ammonium-sulphate particle {#ex-kohler}
An ammonium-sulphate particle of dry radius $0.05\ \mu\mathrm{m}$ ($\nu = 2$, $\phi = 0.85$, $\rho_s = 1770\ \mathrm{kg\,m^{-3}}$, $M_s = 0.132\ \mathrm{kg\,mol^{-1}}$) is suspended in air at $283\ \mathrm{K}$. Find its critical radius and critical supersaturation. What changes if the dry radius is $0.02\ \mu\mathrm{m}$?
::: solution
The solute amount is $n_s = \tfrac{4}{3}\pi r_d^{3}\rho_s/M_s = 7.0\times10^{-18}\ \mathrm{mol}$, giving $b = 3\nu\phi n_s M_w/(4\pi\rho_w) = 5.1\times10^{-5}\ \mu\mathrm{m}^{3}$. With $a = 1.1\times10^{-3}\ \mu\mathrm{m}$,
$$
r_c = \sqrt{\frac{3b}{a}} = 0.37\ \mu\mathrm{m}, \qquad \ln S_c = 2\sqrt{\frac{a^{3}}{27b}} \;\Rightarrow\; S_c - 1 = 0.20\%.
$$
A typical cumulus updraught reaches supersaturations of $0.3$–$1$ per cent, so this particle **activates**. For $r_d = 0.02\ \mu\mathrm{m}$ the solute term scales as $r_d^{3}$, $b$ falls by $(0.02/0.05)^3 = 0.064$, and $S_c - 1$ rises to $0.78$ per cent — near the top of what ordinary non-precipitating clouds achieve, so such small particles mostly stay as interstitial haze. This is the physical basis of the observation that cloud droplet number tracks the **accumulation-mode** aerosol and not the far more numerous but too-small Aitken-mode particles.
:::
:::

::: widget plot
f: (exp(0.0011/x - 0.0000514/(x*x*x)) - 1)*100; (exp(0.0011/x - 0.0000042/(x*x*x)) - 1)*100
x: 0.01, 1.5
y: 0, 1.2
labels: S-1\ (\text{percent}),\ r_d=0.05\ \mu\text{m}; S-1,\ r_d=0.02\ \mu\text{m}
caption: The **Köhler curves** for two ammonium-sulphate particles of dry radius $0.05$ and $0.02\ \mu\mathrm{m}$. Each curve rises to a maximum — the critical point $(r_c, S_c)$ — and then falls. A horizontal line drawn at the ambient supersaturation cuts a curve to the **right** of its peak for an activated droplet and to the **left** for a still-haze particle; the smaller particle's peak is higher and further left, so it needs a larger supersaturation to activate. Try reading off $r_c$ and $S_c$ for each curve and comparing with the worked example.
:::

## Growth by condensation

Once activated, a droplet grows by condensation — but condensation is fast only at first, and it cannot by itself make rain. The growth of a droplet is limited not by the kinetics of molecules striking the surface, which is extremely fast, but by the **diffusion** of water vapour through the air to the droplet and the **conduction** of the released latent heat away from it. Both are gradient-limited and both make the growth rate fall off as the droplet grows.

::: definition Diffusion- and heat-limited condensational growth {#def-cond-growth}
The growth of a droplet of radius $r$ in air of supersaturation $S$ follows
$$
r\,\frac{\mathrm{d}r}{\mathrm{d}t} = \frac{S - 1}{F_k + F_d}, \qquad F_d = \frac{\rho_w R_v T}{e_s D}\,,\quad F_k = \frac{\rho_w L_v}{k T}\left(\frac{D L_v}{R_v T}-1\right),
$$
where $F_d$ and $F_k$ are the diffusion and heat-conduction resistances, $D$ the diffusivity of water vapour and $k$ the thermal conductivity. The combination is usually written
$$
r\,\frac{\mathrm{d}r}{\mathrm{d}t} = G\,(S-1), \qquad G \approx 1\times10^{-8}\ \mathrm{m^{2}\,s^{-1}},
$$
the **condensation coefficient**, roughly constant over cloud conditions. Integrating, the time to grow from $r_0$ to $r_1$ is $t = (r_1^{2}-r_0^{2})/[2G(S-1)]$: growth is governed by $r^{2}$, so almost all the time is spent at the large end. Because $G$ is small, condensational growth **stalls** at cloud-droplet sizes: at $10\ \mu\mathrm{m}$ the rate is already only a few $\mu\mathrm{m\,s^{-1}}$ and falling, and the supersaturation needed to keep growing rises, which the updraught cannot supply. Condensation makes droplets of $5$–$30\ \mu\mathrm{m}$ and no more; the **droplet-size spectrum** of a warm cloud is narrow, peaked near $10\ \mu\mathrm{m}$, and this narrowness is precisely the obstacle that precipitation must overcome.
:::

::: example Time to grow a cloud droplet by condensation {#ex-cond-time}
A droplet grows by condensation in air held at $0.4$ per cent supersaturation, with $G = 1\times10^{-8}\ \mathrm{m^{2}\,s^{-1}}$. How long does it take to grow from the critical radius $0.5\ \mu\mathrm{m}$ to (a) $5\ \mu\mathrm{m}$ and (b) $10\ \mu\mathrm{m}$? What is the growth rate at $10\ \mu\mathrm{m}$?
::: solution
$$
t = \frac{r_1^{2}-r_0^{2}}{2G(S-1)} = \frac{(5\times10^{-6})^{2}-(0.5\times10^{-6})^{2}}{2\times10^{-8}\times0.004} = 0.31\ \mathrm{s},
$$
and to $10\ \mu\mathrm{m}$,
$$
t = \frac{(10\times10^{-6})^{2}-(0.5\times10^{-6})^{2}}{8\times10^{-11}} = 1.2\ \mathrm{s}.
$$
The rate at $10\ \mu\mathrm{m}$ is $\mathrm{d}r/\mathrm{d}t = G(S-1)/r = 10^{-8}\times0.004/10^{-5} = 4\ \mu\mathrm{m\,s^{-1}}$. The point of the arithmetic is the **contrast in timescales**: a droplet reaches $10\ \mu\mathrm{m}$ in about a second, but growing from $10\ \mu\mathrm{m}$ to a $1000\ \mu\mathrm{m}$ raindrop by condensation alone would take of order $10^{5}\ \mathrm{s}$ — a day — and the supersaturation required is far beyond anything an updraught provides. Condensation is a good way to make cloud and a hopeless way to make rain.
:::
:::

## Growth by collision and coalescence

Rain in warm clouds is made by **collision-coalescence** (also called accretion or collection): larger drops fall faster than smaller ones, overtake them, and merge, so a single large drop swept through a field of small ones grows at a rate set not by diffusion but by how much cloud water it sweeps up. This is a geometric process, it is strongly size-selective, and it is the reason warm-base clouds can produce rain in twenty minutes.

::: definition Collection efficiency and the accretion rate {#def-accretion}
A collecting drop of radius $R$ falling at speed $V(R)$ through cloud of liquid-water content $L$ (mass per volume) and droplet number concentration $n$ sweeps a volume $\pi R^{2}V$ per second and collects the drops in it with a **collection efficiency** $E \le 1$ that accounts for the droplets that stream around the drop on a curved path instead of hitting it. $E$ is small (a few per cent) while $R$ is below about $20\ \mu\mathrm{m}$, rises steeply through $20$–$50\ \mu\mathrm{m}$ as the wake grows, and approaches unity for large drops. The radius grows at
$$
\frac{\mathrm{d}R}{\mathrm{d}t} = \frac{E\,\rho_a\, w\, q_l}{4\,\rho_w} \quad\text{(in an updraught of speed } w\text{)}, \qquad \frac{\mathrm{d}R}{\mathrm{d}t} = \frac{E\,L\,V(R)}{4\,\rho_w}\quad\text{(in still air)},
$$
the factor $4$ from $\mathrm{d}(\tfrac{4}{3}\pi R^{3}\rho_w)/\mathrm{d}t = 4\pi R^{2}\rho_w\,\mathrm{d}R/\mathrm{d}t$. Because both $E$ and $V$ rise with $R$, the growth is **runaway**: the bigger a drop gets, the faster it grows. This positive feedback is what turns the narrow condensation spectrum into the broad precipitation spectrum, and it defines a **threshold radius** near $20\ \mu\mathrm{m}$ below which growth is negligible and above which it accelerates. The time from threshold to drizzle ($\sim 100\ \mu\mathrm{m}$) is a few minutes; from drizzle to raindrop ($\sim 1\ \mathrm{mm}$), a few more; and the whole process is limited by the **liquid-water content** and by how long the parcel stays aloft.
:::

::: example Warm-rain timescale {#ex-warmrain}
A cloud with liquid-water content $L = 3\ \mathrm{g\,m^{-3}}$ (mixing ratio $q_l = 3\ \mathrm{g\,kg^{-1}}$, $\rho_a = 1\ \mathrm{kg\,m^{-3}}$) is rising at $w = 1\ \mathrm{m\,s^{-1}}$. Taking an average collection efficiency $E = 0.7$ above the $20\ \mu\mathrm{m}$ threshold, estimate the time for a drop to grow from $20\ \mu\mathrm{m}$ to drizzle size $100\ \mu\mathrm{m}$.
::: solution
$$
\frac{\mathrm{d}R}{\mathrm{d}t} = \frac{E\,\rho_a\, w\, q_l}{4\,\rho_w} = \frac{0.7\times1\times1\times3\times10^{-3}}{4\times1000} = 5.3\times10^{-7}\ \mathrm{m\,s^{-1}} = 0.53\ \mu\mathrm{m\,s^{-1}} .
$$
The growth time is $(100-20)\times10^{-6}/5.3\times10^{-7} \approx 150\ \mathrm{s} \approx 2.5\ \mathrm{min}$. Adding the slow, inefficient crawl from $10$ to $20\ \mu\mathrm{m}$ — the **condensation-collision transition**, the rate-limiting step — the total from a cloud droplet to drizzle is of order **$15$–$30$ minutes**, exactly the observed lag between cumulus turrets and the first rain. The estimate also shows why the process is so sensitive to $L$: doubling the liquid-water content halves the time, which is why deep, moist maritime clouds rain readily and thin, dry continental clouds often do not.
:::
:::

## Ice crystals and the Bergeron process

In the cold part of a cloud the rules change completely, because the saturation vapour pressure over **ice** is lower than over **supercooled water** at the same temperature. Air that is exactly saturated with respect to water is therefore **supersaturated** with respect to ice, and vapour deposits onto ice crystals at the expense of the surrounding water droplets. Ice crystals grow, fall, and — in the mid-latitudes — produce most of the precipitation.

::: definition The three saturation states and the Wegener–Bergeron–Findeisen process {#def-bergeron}
In a mixed ice–water cloud at temperature $T$ there are three relevant saturation vapour pressures: $e_s^{w}(T)$ over supercooled water, $e_s^{i}(T)$ over ice, and the actual vapour pressure $e$. Because $e_s^{i} < e_s^{w}$, the cloud splits into regimes:
$$
e > e_s^{w} > e_s^{i}: \text{droplets grow, crystals grow}; \quad e_s^{w} > e > e_s^{i}: \text{droplets evaporate, crystals grow}; \quad e_s^{w} > e_s^{i} > e: \text{both evaporate}.
$$
The middle window is the **Wegener–Bergeron–Findeisen (ice–crystal) process**: a cloud whose vapour pressure sits between the two curves evaporates its water droplets and deposits the vapour onto its ice crystals, so the crystals grow at the expense of the droplets even though the total water is unchanged. The effect is strongest near $-15\ ^\circ\mathrm{C}$, where the ratio $e_s^{w}/e_s^{i}$ is large and there are enough crystals and enough liquid water; below about $-25\ ^\circ\mathrm{C}$ the liquid water is gone and the process starves. The crystals so grown fall through the cloud collecting supercooled droplets, which freeze on contact — **riming** — building graupel and, when the growth is by aggregation of crystals, snowflakes.
:::

::: example Supersaturation with respect to ice {#ex-bergeron}
A mixed cloud at $-15\ ^\circ\mathrm{C}$ has a vapour pressure exactly saturated with respect to water. Find the vapour pressure and the supersaturation of that air with respect to ice.
::: solution
Over water, $e_s^{w}(-15) = 6.112\exp(17.67\times(-15)/(-15+243.5)) = 1.92\ \mathrm{hPa}$. Over ice, $e_s^{i}(-15) = 6.112\exp(22.46\times(-15)/(-15+272.62)) = 1.65\ \mathrm{hPa}$. The air is therefore supersaturated with respect to ice by
$$
\frac{e}{e_s^{i}} - 1 = \frac{1.92}{1.65} - 1 = 0.16 \quad (16\%).
$$
Sixteen per cent is a large supersaturation by cloud standards — condensational growth stalls at a fraction of one per cent — so ice crystals in a water-saturated mixed cloud grow **very** rapidly, which is why the ice–crystal process is so much more productive than condensation and why seeding clouds with silver iodide or dry ice, to add ice nuclei where nature has too few, can enhance snowfall. The ratio $e_s^{w}/e_s^{i}$ is $1.10$ at $-10\ ^\circ\mathrm{C}$, $1.16$ at $-15$, and $1.22$ at $-20\ ^\circ\mathrm{C}$, peaking in productivity near $-15\ ^\circ\mathrm{C}$.
:::
:::

## Falling: terminal velocity and the fate of the particle

Whether a cloud particle grows into precipitation is inseparable from how fast it falls, because fall speed sets both the collision rate that builds raindrops and whether the particle survives to reach the ground. Small particles obey Stokes' law with a slip correction; large drops are held back by drag and flatten, and their terminal velocity saturates near $9\ \mathrm{m\,s^{-1}}$.

::: definition Terminal fall speed {#def-terminal}
A sphere falling in air reaches a terminal speed where drag balances weight. For small Reynolds number this is **Stokes' law**, corrected for slip when the radius approaches the mean free path $\lambda \approx 0.067\ \mu\mathrm{m}$ of air,
$$
V = \frac{2\,r^{2}(\rho_w - \rho_a)g}{9\,\mu}\,C_c, \qquad C_c = 1 + \frac{\lambda}{r}\left(1.257 + 0.4\,e^{-1.1\,r/\lambda}\right),
$$
with $\mu = 1.8\times10^{-5}\ \mathrm{Pa\,s}$ the dynamic viscosity. This gives $V \approx 0.3\ \mathrm{cm\,s^{-1}}$ at $5\ \mu\mathrm{m}$, $1.2$ at $10$, $4.9$ at $20$, and $19\ \mathrm{cm\,s^{-1}}$ at $40\ \mu\mathrm{m}$. For larger drops the quadratic-drag regime applies and $V$ grows only as $r^{1/2}$, saturating near $9\ \mathrm{m\,s^{-1}}$ at $R \approx 2.5\ \mathrm{mm}$, above which drops break up. The consequence is the two great divides of the subject: a $10\ \mu\mathrm{m}$ droplet at $1\ \mathrm{cm\,s^{-1}}$ is **airborne** in any updraught and effectively weightless, while a $1\ \mathrm{mm}$ raindrop at $4\ \mathrm{m\,s^{-1}}$ falls through even strong updraughts — and the collision speed $V(R)-V(r)$ between them, which is what drives collection, is essentially the raindrop's own speed.
:::

::: example Can an updraught hold a raindrop? {#ex-updraft}
A cumulus updraught has $w = 6\ \mathrm{m\,s^{-1}}$. Which of a $20\ \mu\mathrm{m}$ droplet, a $200\ \mu\mathrm{m}$ drizzle drop, and a $2\ \mathrm{mm}$ raindrop does it carry aloft? (Use $V \approx 4\sqrt{R/\mathrm{mm}}\ \mathrm{m\,s^{-1}}$ for large drops.)
::: solution
The $20\ \mu\mathrm{m}$ droplet falls at $0.05\ \mathrm{m\,s^{-1}} \ll w$ and is carried up. The $200\ \mu\mathrm{m}$ drizzle drop falls at $4\sqrt{0.2} = 1.8\ \mathrm{m\,s^{-1}} < w$ and is also carried up, though it lags the air. The $2\ \mathrm{mm}$ raindrop falls at $4\sqrt{2} = 5.7\ \mathrm{m\,s^{-1}} \approx w$ and is barely supported — it hovers near the updraught top. This is why rain forms at the **top and edges** of cumulus, where the smallest drops that can no longer be supported are first shed, and why a stronger updraught does not make bigger drops so much as it lets a cloud **grow taller and last longer** before it rains — the link between updraught strength, cloud lifetime and rainfall.
:::
:::

::: warning Clouds are not made of steam, droplets do not grow by condensation alone, and the ice process is not freezing
Six confusions recur. **Cloud is liquid or solid water, not water vapour**: the vapour is invisible, and a cloud is visible precisely because it has condensed into particles that scatter light. **Condensation makes cloud droplets, not rain**: it stalls at tens of micrometres, and every raindrop in a warm cloud was made by collision-coalescence, not by more condensation. **Supersaturation in cloud is tiny**: a fraction of one per cent, not tens of per cent, because there are always enough nuclei and droplets to keep the vapour close to saturation — the large supersaturations of a sealed jar do not occur in the well-seeded atmosphere. **Supercooled water is liquid below $0\ ^\circ\mathrm{C}$**: pure droplets resist homogeneous freezing until $-40\ ^\circ\mathrm{C}$, so clouds at $-10$ or $-20\ ^\circ\mathrm{C}$ are full of liquid water, and ice appears only where **ice nuclei** — dust, soot, some biological particles — trigger freezing; the scarcity of good ice nuclei is what makes the ice process a nucleation problem and cloud seeding possible. **The ice–crystal process is not the same as freezing**: it is vapour **depositing** onto ice at the expense of evaporating droplets, driven by the vapour-pressure difference, and it can convert droplets to ice crystals without the droplets ever freezing directly. **And the ozone hole is not global warming**: a common conflation, but the stratospheric ozone problem and the greenhouse problem share gases and history, not mechanism.
:::

::: history
Cloud physics is a story of two rival theories of rain resolved by one number. **Vincent Schaefer**, **Irving Langmuir** and **Bernard Vonnegut** at the General Electric laboratory in 1946 discovered **cloud seeding** by dropping dry ice into a supercooled cloud and, days later, seeding the natural cloud *Crown* over the Berkshires; **Vonnegut** also proposed silver iodide as an ice nucleus. The **ice–crystal process** was conceived by **Alfred Wegener** in 1911, developed quantitatively by **Tor Bergeron** in the 1930s, and completed by **Walther Findeisen**, whose 1938 monograph laid out the microphysics of the mixed cloud; together they form the Wegener–Bergeron–Findeisen theory. The **Köhler theory** of droplet activation was published by **Wilhelm Köhler** in 1936, building on the curvature term of **Josiah Willard Gibbs** and Lord Kelvin's nineteenth-century surface-tension analysis. The **collision-coalescence** theory of warm rain was advanced by **Takahashi** in 1961 and by **Latham**, **Mason** and others in the 1960s–70s, resolving why the process needs a **threshold radius** near $20\ \mu\mathrm{m}$. **Harold Jeffreys**, **Bagnold**, and **Gunn and Pilcher** measured drop sizes and fall speeds with the **impact and optical disdrometers** of the 1940s, and **Hitzer**, **Atlas**, **Battersby** and **Ludlam** the radar and optical methods that made the drop-size spectrum a routine measurement.
:::

The thermodynamics behind the saturation vapour pressure and the latent heat is in [[atmospheric-dynamics/moist-thermodynamics]] and the stability that decides whether a cloud grows in [[meteorology/stability]], the aerosols that seed the cloud in [[atmospheric-chemistry/aerosols]] and their measurement in [[remote-sensing/radar-lidar]], the clouds seen from satellites in [[remote-sensing/classification]] and their radiative effect in [[climate-system/greenhouse-effect]], the precipitation that reaches the ground in [[hydrology/precipitation-evaporation]] and its hazards in [[natural-hazards/storms]], the deep convective clouds in [[meteorology/storms]] and their organisation in [[meteorology/fronts-cyclones]], and the cloud feedback in the climate system in [[climate-system/feedbacks-sensitivity]].

::: quiz
Why does a cloud with plenty of liquid water and a strong updraught still fail to produce rain for its first twenty minutes?
- [ ] Because condensation has not yet made enough droplets.
- [x] Because droplets must first reach a ~20 µm threshold before collisions collect them efficiently.
- [ ] Because the updraught keeps all water aloft until the cloud dies.
- [ ] Because ice nuclei are absent.
::: solution
Condensation makes $10\ \mu\mathrm{m}$ droplets within seconds, but the **collection efficiency** below about $20\ \mu\mathrm{m}$ is only a few per cent, so growth is glacial until a few droplets cross the threshold by random collisions. Once a drop exceeds $\sim 20\ \mu\mathrm{m}$, $E$ and its fall speed rise together and growth becomes runaway — the **condensation-to-collision transition** is the rate-limiting step, and it accounts for the observed twenty-minute lag between cloud formation and the first rain.
:::
:::

::: summary
- Clouds need condensation nuclei: pure water cannot nucleate at atmospheric supersaturations because the Kelvin curvature term demands several per cent supersaturation for sub-micrometre droplets.
- The Köhler curve is the balance of the Kelvin ($\propto 1/r$) and solute ($\propto 1/r^3$) terms; a particle activates when the ambient supersaturation exceeds its critical value, and smaller particles need larger supersaturations.
- Cloud droplet number is set by the aerosol (its size and hygroscopicity) and the updraught, not by the water supply — the microphysical basis of the aerosol indirect effect.
- Condensation grows droplets as $r^2$ and stalls at tens of micrometres; it cannot make rain.
- Warm rain is made by collision-coalescence, a runaway process with a $\sim 20\ \mu\mathrm{m}$ threshold, limited by liquid-water content and cloud lifetime.
- In cold clouds the Bergeron process grows ice at the expense of supercooled water because $e_s^{i} < e_s^{w}$, strongest near $-15\ ^\circ\mathrm{C}$; riming and aggregation then build precipitation.
- Fall speed separates cloud from rain: $1\ \mathrm{cm\,s^{-1}}$ at $10\ \mu\mathrm{m}$ (airborne) against $4\ \mathrm{m\,s^{-1}}$ at $1\ \mathrm{mm}$ (falling), and the collision speed that drives growth is essentially the large drop's own speed.
:::

## Exercises

::: exercise Equilibrium supersaturation over a small droplet {level=1 check="1.1"}
Using the Kelvin term with $a = 1.1\times10^{-3}\ \mu\mathrm{m}$, find the supersaturation (in per cent) needed to keep a **pure-water** droplet of radius $0.1\ \mu\mathrm{m}$ from evaporating. (Enter the percentage.)
::: solution
$S = \exp(a/r) = \exp(1.1\times10^{-3}/0.1) = \exp(0.011) = 1.011$, so $S - 1 = 1.1$ per cent. A pure $0.1\ \mu\mathrm{m}$ droplet needs $1.1$ per cent supersaturation to survive — far more than clouds reach — which is exactly why pure water cannot nucleate and clouds need solute and surfaces.
:::
:::

::: exercise Ice supersaturation {level=1 check="1.10"}
A mixed cloud at $-10\ ^\circ\mathrm{C}$ is saturated with respect to water. Find the ratio $e_s^{w}/e_s^{i}$ (the supersaturation with respect to ice). (Enter the ratio to two decimals.)
::: solution
$e_s^{w}(-10) = 2.87\ \mathrm{hPa}$, $e_s^{i}(-10) = 2.60\ \mathrm{hPa}$, ratio $= 1.10$. Air saturated over water is $10$ per cent supersaturated over ice at $-10\ ^\circ\mathrm{C}$, so ice crystals grow at the droplets' expense — the driving force of the ice–crystal process.
:::
:::

::: exercise Stokes fall speed {level=1 check="1.2"}
Using Stokes' law with slip, find the terminal fall speed (in $\mathrm{cm\,s^{-1}}$) of a $10\ \mu\mathrm{m}$ droplet ($\mu = 1.8\times10^{-5}\ \mathrm{Pa\,s}$, $\lambda = 0.067\ \mu\mathrm{m}$). (Enter the value in $\mathrm{cm\,s^{-1}}$.)
::: solution
$V = 2r^{2}(\rho_w)g/(9\mu)\,C_c$ with $C_c = 1 + (\lambda/r)(1.257 + \dots) = 1 + 0.0067/0.01\times1.6 = 2.07$; the Stokes part is $2\times(10^{-5})^{2}\times1000\times9.81/(9\times1.8\times10^{-5}) = 6.0\times10^{-3}\ \mathrm{m\,s^{-1}}$, and $V = 6.0\times2.07 = 1.2\ \mathrm{cm\,s^{-1}}$. At this speed a modest $10\ \mathrm{cm\,s^{-1}}$ updraught keeps the droplet aloft indefinitely — cloud droplets are effectively weightless.
:::
:::

::: exercise Critical supersaturation {level=2 check="0.37"}
An ammonium-sulphate particle has solute parameter $b = 5.1\times10^{-5}\ \mu\mathrm{m}^{3}$ and $a = 1.1\times10^{-3}\ \mu\mathrm{m}$. Find its critical radius $r_c$ (in $\mu\mathrm{m}$). (Enter $r_c$ in $\mu\mathrm{m}$ to two decimals.)
::: solution
$r_c = \sqrt{3b/a} = \sqrt{3\times5.1\times10^{-5}/1.1\times10^{-3}} = \sqrt{0.139} = 0.37\ \mu\mathrm{m}$. The particle must swell to $0.37\ \mu\mathrm{m}$ before it sits at the top of the Köhler curve; any further condensation takes it downhill into unbounded growth — activation.
:::
:::

::: exercise Condensation time {level=2 check="1.7"}
With $G = 1\times10^{-8}\ \mathrm{m^{2}\,s^{-1}}$ and $0.3$ per cent supersaturation, how long (in seconds) does a droplet take to grow from $1$ to $10\ \mu\mathrm{m}$? (Enter the time in seconds.)
::: solution
$t = (r_1^{2}-r_0^{2})/[2G(S-1)] = (100 - 1)\times10^{-12}/(2\times10^{-8}\times0.003) = 99\times10^{-12}/6\times10^{-11} = 1.7\ \mathrm{s}$. Growth is fast at small size and slows as $r$; the $r^{2}$ dependence means the last few micrometres cost most of the time, which is why condensation can make a cloud droplet in a second but never a raindrop.
:::
:::

::: exercise Collision growth {level=2 check="15"}
A $30\ \mu\mathrm{m}$ drop grows by accretion in cloud of liquid-water content $L = 4\ \mathrm{g\,m^{-3}}$ with $E = 0.8$ and fall speed $V = 0.1\ \mathrm{m\,s^{-1}}$ (still air). Find the growth time to $100\ \mu\mathrm{m}$, in minutes. (Enter minutes.)
::: solution
In SI units $L = 0.004\ \mathrm{kg\,m^{-3}}$, so
$$
\frac{\mathrm{d}R}{\mathrm{d}t} = \frac{E\,L\,V}{4\rho_w} = \frac{0.8\times0.004\times0.1}{4\times1000} = 8\times10^{-8}\ \mathrm{m\,s^{-1}} = 0.08\ \mu\mathrm{m\,s^{-1}} .
$$
The time is $(100-30)\times10^{-6}/8\times10^{-8} = 875\ \mathrm{s} \approx 15\ \mathrm{min}$. The still-air growth is far slower than in an updraught, where the drop meets droplets at the updraught speed too — one reason deep convective clouds rain so much faster than layered clouds of the same water content.
:::
:::

::: exercise The condensation–collision bottleneck {level=3 check="0.5"}
Collection efficiency is $E = 0.02$ below $20\ \mu\mathrm{m}$ and $E = 0.7$ above it. In the cloud of the warm-rain example ($\mathrm{d}R/\mathrm{d}t \propto E$), by what factor is the growth from $10$ to $20\ \mu\mathrm{m}$ slower per micrometre than the growth from $20$ to $100\ \mu\mathrm{m}$? (Give the ratio of rates, high-$E$ rate divided by low-$E$ rate, to one decimal.)
::: solution
The rate is proportional to $E$, so the ratio is $0.7/0.02 = 35$. Growth below the threshold is **35 times slower** per micrometre than above it. The bottleneck is therefore the slow crawl from $10$ to $20\ \mu\mathrm{m}$: at $0.02/0.7\times0.53 = 0.015\ \mu\mathrm{m\,s^{-1}}$ the first $10\ \mu\mathrm{m}$ take $\sim 670\ \mathrm{s}$, comparable to the whole rest of the growth to drizzle. This is why the **initial** growth, governed by the low collection efficiency of small drops, controls the rain time, and why adding many small droplets (more aerosol) can **delay** rain by making every droplet smaller and slower to reach the threshold — the microphysical heart of the aerosol indirect effect on precipitation.
:::
:::

::: exercise Deriving the critical radius {level=3 check="3"}
Starting from $S(r) = \exp(a/r - b/r^{3})$, show that the critical radius is $r_c = \sqrt{3b/a}$ and that at the critical point the two terms satisfy a fixed ratio. What is the ratio of the solute term $b/r_c^{3}$ to the curvature term $a/r_c$? (Enter the ratio as a decimal.)
::: solution
$\mathrm{d}/\mathrm{d}r(a/r - b/r^{3}) = -a/r^{2} + 3b/r^{4} = 0 \Rightarrow a/r^{2} = 3b/r^{4} \Rightarrow r_c^{2} = 3b/a$, so $r_c = \sqrt{3b/a}$. At $r_c$, $b/r_c^{3} = b/(r_c\cdot r_c^{2}) = b/(r_c\cdot 3b/a) = a/(3 r_c)$, so the solute term is one third of the curvature term:
$$
\frac{b/r_c^{3}}{a/r_c} = \frac{1}{3} = 0.33 .
$$
At activation the curvature term is always three times the solute term, and $\ln S_c = a/r_c - b/r_c^{3} = \tfrac{2}{3}a/r_c$, the relation used to compute $S_c$. The result is exact within Köhler theory and shows why the two terms, though of opposite sign, are of the same order at the critical point — the whole of droplet activation turns on their near-cancellation.
:::
:::
