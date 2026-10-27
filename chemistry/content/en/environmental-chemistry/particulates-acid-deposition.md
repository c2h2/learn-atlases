Look at a distant hillside on a summer afternoon and it is blurred by a blue-grey haze. The haze is not a gas: it is a suspension of particles, most of them smaller than a micrometre, numbering thousands to tens of thousands in every cubic centimetre. Many were never emitted at all, but grew in the air from gases — sulfuric acid from sulfur dioxide, ammonium nitrate from ammonia and nitric acid, low-volatility organic compounds from the oxidation of terpenes and traffic hydrocarbons. These particles are the most harmful air pollutant to human health worldwide, they cool the climate by reflecting sunlight and brightening clouds, and when they and their parent gases are washed out by rain they deliver acid to soils and lakes. This lesson treats the physics that governs how particles move and are removed, the chemistry that makes them — including the aqueous chemistry of cloud droplets — and the acid–base chemistry of rain, which builds on the carbonate and Henry's-law equilibria you have met in [[general-chemistry-2/acids-bases]] and on the gas-phase oxidation chemistry of [[environmental-chemistry/tropospheric-chemistry]].

## Aerosols: sizes, sources and modes

::: definition Aerosol, particulate matter and size classes {#def-aerosol}
An **aerosol** is a suspension of solid or liquid particles in a gas; in air-quality practice the particles themselves are called **particulate matter** (PM). Particles are classified by **aerodynamic diameter** $d_\mathrm{a}$ — the diameter of a unit-density ($1000\ \mathrm{kg\,m^{-3}}$) sphere with the same settling velocity — because that is what samplers and lungs respond to. $\mathrm{PM_{10}}$ and $\mathrm{PM_{2.5}}$ are the mass concentrations (in $\mathrm{\mu g\,m^{-3}}$) of particles passing a size-selective inlet with $50\ \%$ cut-off at $10$ and $2.5\ \mathrm{\mu m}$; **ultrafine** particles are those below $0.1\ \mathrm{\mu m}$. **Primary** particles are emitted as particles (soot, dust, sea spray, pollen); **secondary** particles form in the atmosphere from gaseous precursors by condensation and chemical reaction.
:::

Ambient size distributions show distinct **modes**, each with its own origin and fate:

- the **nucleation mode** (below about $0.01\ \mathrm{\mu m}$): fresh clusters formed from sulfuric acid, ammonia, amines and highly oxidised organic molecules; enormous in number, negligible in mass, short-lived because they coagulate;
- the **Aitken mode** ($0.01$–$0.1\ \mathrm{\mu m}$): grown nuclei and fresh combustion particles such as diesel soot;
- the **accumulation mode** ($0.1$–$1\ \mathrm{\mu m}$): particles that have grown by condensation and by cloud processing, and where most of the fine-particle mass and light scattering lie. They are too large to diffuse quickly and too small to settle, so they "accumulate" and last a week or so, until rain removes them;
- the **coarse mode** (above about $1$–$2\ \mathrm{\mu m}$): mechanically generated particles — wind-blown mineral dust, sea salt, road and tyre wear, pollen — which settle within hours to days.

The fine and coarse modes are chemically different populations. Fine particles are dominated by secondary sulfate, nitrate, ammonium and organic matter plus black carbon; coarse particles by crustal elements (Si, Al, Ca, Fe), sea salt and biological material. A $\mathrm{PM_{2.5}}$ measurement therefore mostly reports combustion and secondary chemistry, while $\mathrm{PM_{10}}$ adds the coarse particles.

Number, surface and mass are carried by different sizes. Since a particle's mass scales as $d^3$, $10^{4}$ particles of $0.1\ \mathrm{\mu m}$ in a cubic centimetre (density $1500\ \mathrm{kg\,m^{-3}}$) weigh only $7.9\ \mathrm{\mu g\,m^{-3}}$, while a mere $10^{3}\ \mathrm{cm^{-3}}$ at $0.5\ \mathrm{\mu m}$ weigh $98\ \mathrm{\mu g\,m^{-3}}$. Regulations based on mass are dominated by the accumulation mode; health effects of ultrafine particles, which can penetrate deep into the lung, are poorly represented by mass.

## How particles move: settling and deposition

::: proposition Stokes settling velocity {#prop-stokes}
A small sphere of diameter $d$ and density $\rho_\mathrm{p}$ falling through air of viscosity $\mu$ reaches the terminal velocity
$$
v_\mathrm{s} = \frac{\rho_\mathrm{p}\,d^2\,g\,C_\mathrm{c}}{18\,\mu},
$$
where $C_\mathrm{c} \geq 1$ is the **Cunningham slip correction**, close to $1$ for $d \gtrsim 5\ \mathrm{\mu m}$ and increasing for smaller particles as $d$ approaches the mean free path of air molecules ($\approx 0.068\ \mathrm{\mu m}$ at sea level). Conditions: creeping flow (particle Reynolds number $\mathrm{Re} = \rho_\text{air}v_\mathrm{s}d/\mu \ll 1$, true below about $30\ \mathrm{\mu m}$), spherical particle, buoyancy of air neglected ($\rho_\text{air} \ll \rho_\mathrm{p}$).
:::

::: proof Force balance on a falling sphere {#proof-stokes}
At terminal velocity the drag balances the weight. For creeping flow round a sphere, the Stokes drag is $F_\mathrm{D} = 3\pi\mu d\,v$ (a result of fluid mechanics; see [Physics Atlas](/learn/physics/)). The weight is $\frac{\pi}{6}d^3\rho_\mathrm{p}g$. Setting them equal,
$$
3\pi\mu d\,v_\mathrm{s} = \frac{\pi}{6}d^3\rho_\mathrm{p}g
\quad\Longrightarrow\quad
v_\mathrm{s} = \frac{\rho_\mathrm{p}d^2g}{18\mu} .
$$
When $d$ is comparable with the mean free path $\lambda$, the air no longer behaves as a continuum at the particle's surface; molecules "slip" past and the drag is reduced by the factor $C_\mathrm{c} = 1 + \mathrm{Kn}\left[1.257 + 0.4e^{-1.1/\mathrm{Kn}}\right]$ with Knudsen number $\mathrm{Kn} = 2\lambda/d$, an empirical fit to Millikan's oil-drop data. Since $v_\mathrm{s} \propto d^2$, settling is overwhelmingly a coarse-particle process.
:::

::: example Settling of coarse and fine particles {#ex-settling}
Find the settling velocity of unit-density spheres of $10\ \mathrm{\mu m}$ and $1\ \mathrm{\mu m}$ diameter in air at $298\ \mathrm{K}$ ($\mu = 1.81\times10^{-5}\ \mathrm{Pa\,s}$; $C_\mathrm{c} = 1.017$ and $1.171$ respectively), and the time each takes to fall through a $1\ \mathrm{km}$ boundary layer.
::: solution
For $10\ \mathrm{\mu m}$:
$$
v_\mathrm{s} = \frac{1000\times(10\times10^{-6})^2\times9.81\times1.017}{18\times1.81\times10^{-5}} = \frac{9.98\times10^{-7}}{3.26\times10^{-4}} = 3.1\times10^{-3}\ \mathrm{m\,s^{-1}},
$$
about $0.3\ \mathrm{cm\,s^{-1}}$, so $1000\ \mathrm{m}$ takes $3.3\times10^{5}\ \mathrm{s} \approx 3.8\ \mathrm{d}$ in still air. For $1\ \mathrm{\mu m}$ the $d^2$ factor is $100$ times smaller and $C_\mathrm{c}$ larger: $v_\mathrm{s} = 3.5\times10^{-5}\ \mathrm{m\,s^{-1}}$, and the fall takes about $330\ \mathrm{d}$. In reality turbulence and rain remove both much faster, but the contrast is real: gravitational settling clears the coarse mode within days, while fine particles are removed almost only by precipitation and so travel hundreds to thousands of kilometres — the reason that fine sulfate from one country is deposited in another.
:::
:::

For gases and fine particles, removal at the ground without precipitation (**dry deposition**) is described by a **deposition velocity** $v_\mathrm{d}$, defined by the downward flux $F = v_\mathrm{d}C$ at a reference height. It combines turbulent transport, diffusion through the thin layer next to surfaces, and uptake by the surface itself (stomata, wet leaves, soil, water), often modelled as resistances in series, $v_\mathrm{d} = 1/(r_\mathrm{a} + r_\mathrm{b} + r_\mathrm{c})$. Soluble or reactive gases ($\mathrm{HNO_3}$, $\mathrm{SO_2}$ over wet surfaces) have $v_\mathrm{d}$ of order $1\ \mathrm{cm\,s^{-1}}$; accumulation-mode particles only about $0.1\ \mathrm{cm\,s^{-1}}$, because they are too large to diffuse and too small to impact. A gas with $v_\mathrm{d} = 0.5\ \mathrm{cm\,s^{-1}}$ in a well-mixed boundary layer of depth $h = 1\ \mathrm{km}$ has a dry-deposition lifetime $h/v_\mathrm{d} = 2\times10^{5}\ \mathrm{s} \approx 2\ \mathrm{d}$. **Wet deposition** — capture in cloud droplets (rainout) and by falling raindrops (washout) — removes most accumulation-mode mass and soluble gases.

## The chemistry of secondary particles

### Sulfate

Sulfur dioxide is oxidised to sulfuric acid by two routes of comparable global importance. In the gas phase, OH adds to $\mathrm{SO_2}$:
$$
\mathrm{SO_2} + \mathrm{OH} + \mathrm{M} \rightarrow \mathrm{HOSO_2} + \mathrm{M},\qquad
\mathrm{HOSO_2} + \mathrm{O_2} \rightarrow \mathrm{SO_3} + \mathrm{HO_2},\qquad
\mathrm{SO_3} + \mathrm{H_2O} \rightarrow \mathrm{H_2SO_4} ,
$$
a sequence that returns the $\mathrm{HO_x}$ radical, with a lifetime for $\mathrm{SO_2}$ of one to two weeks at mean OH ([[environmental-chemistry/tropospheric-chemistry#def-oh-lifetime]]). Sulfuric acid has an extremely low vapour pressure, so it condenses at once on existing particles or — if there is little surface — nucleates new ones with water, ammonia and amines. In clouds, $\mathrm{SO_2}$ dissolves in the droplets and is oxidised much faster, by dissolved hydrogen peroxide and ozone. How much dissolves depends on pH, through the acid dissociation of the dissolved gas.

::: proposition Effective Henry's law constant of a weak acid gas {#prop-effective-henry}
For a gas $\mathrm{A(g)}$ that dissolves as $\mathrm{A(aq)}$ with Henry's law constant $K_\mathrm{H}$ ($\mathrm{mol\,dm^{-3}\,atm^{-1}}$) and dissociates as a diprotic acid with constants $K_1$, $K_2$, the total dissolved concentration at partial pressure $p_\mathrm{A}$ is $[\mathrm{A}]_\text{tot} = K_\mathrm{H}^*\,p_\mathrm{A}$ with the **effective Henry's law constant**
$$
K_\mathrm{H}^* = K_\mathrm{H}\left(1 + \frac{K_1}{[\mathrm{H^+}]} + \frac{K_1K_2}{[\mathrm{H^+}]^2}\right) .
$$
For $\mathrm{SO_2}$ ($\mathrm{S(IV)} = \mathrm{SO_2{\cdot}H_2O} + \mathrm{HSO_3^-} + \mathrm{SO_3^{2-}}$) at $298\ \mathrm{K}$, $K_\mathrm{H} = 1.23\ \mathrm{mol\,dm^{-3}\,atm^{-1}}$, $\mathrm{p}K_1 = 1.86$, $\mathrm{p}K_2 = 7.2$ (values from Seinfeld and Pandis). Conditions: dilute solution (activity coefficients $1$), gas–liquid equilibrium established, which for cloud droplets takes well under a second.
:::

::: proof Summing the dissolved species {#proof-effective-henry}
Henry's law fixes the undissociated form, $[\mathrm{SO_2{\cdot}H_2O}] = K_\mathrm{H}p_{\mathrm{SO_2}}$. The acid equilibria give $[\mathrm{HSO_3^-}] = K_1[\mathrm{SO_2{\cdot}H_2O}]/[\mathrm{H^+}]$ and $[\mathrm{SO_3^{2-}}] = K_2[\mathrm{HSO_3^-}]/[\mathrm{H^+}] = K_1K_2[\mathrm{SO_2{\cdot}H_2O}]/[\mathrm{H^+}]^2$. Summing,
$$
[\mathrm{S(IV)}] = K_\mathrm{H}p_{\mathrm{SO_2}}\left(1 + \frac{K_1}{[\mathrm{H^+}]} + \frac{K_1K_2}{[\mathrm{H^+}]^2}\right),
$$
which defines $K_\mathrm{H}^*$. The same algebra with $\mathrm{CO_2}$ ($K_\mathrm{H} = 3.4\times10^{-2}$, $\mathrm{p}K_1 = 6.35$, $\mathrm{p}K_2 = 10.33$) underlies the carbonate system of [[environmental-chemistry/natural-waters]], and with a base ($\mathrm{NH_3}$) the factor becomes $1 + K_\mathrm{a}^{-1}[\mathrm{H^+}]$ with $K_\mathrm{a}$ that of $\mathrm{NH_4^+}$. For $\mathrm{SO_2}$ between pH 2 and 6, $K_1/[\mathrm{H^+}]$ is the dominant term: solubility rises tenfold per pH unit.
:::

::: widget plot
f: log(1.23*(1 + 10^(-1.86 + x) + 10^(-9.06 + 2*x)))/log(10); log(0.034*(1 + 10^(-6.35 + x) + 10^(-16.68 + 2*x)))/log(10)
x: 1, 8
y: -2, 6
labels: \log_{10}K_\mathrm{H}^*(\mathrm{SO_2}); \log_{10}K_\mathrm{H}^*(\mathrm{CO_2})
caption: Effective Henry's law constants (in $\mathrm{mol\,dm^{-3}\,atm^{-1}}$, log scale) of $\mathrm{SO_2}$ and $\mathrm{CO_2}$ against droplet pH, from [[#prop-effective-henry]] at $298\ \mathrm{K}$. Each curve is flat while the undissociated form dominates and rises with slope $1$ once the first dissociation takes over (above pH $1.86$ for $\mathrm{SO_2}$, above $6.35$ for $\mathrm{CO_2}$), and with slope $2$ above $\mathrm{p}K_2$. Sulfur dioxide's uptake is therefore *self-limiting*: as $\mathrm{S(IV)}$ is oxidised to sulfuric acid, the droplet acidifies and stops dissolving more $\mathrm{SO_2}$ — unless the oxidant is one whose rate does not care about pH.
:::

The two aqueous oxidants differ in exactly that respect. Hydrogen peroxide reacts mainly with bisulfite by an acid-catalysed path, and since $[\mathrm{HSO_3^-}]$ falls as acidity rises while the catalysis increases, the two factors nearly cancel: the $\mathrm{H_2O_2}$ rate is almost independent of pH. Because $\mathrm{H_2O_2}$ is very soluble ($K_\mathrm{H} \approx 10^{5}\ \mathrm{mol\,dm^{-3}\,atm^{-1}}$), it is the dominant oxidant in most clouds, and sulfate production is often limited simply by whichever of $\mathrm{SO_2}$ and $\mathrm{H_2O_2}$ is in short supply. Ozone reacts much faster with sulfite than with bisulfite, so its rate rises steeply with pH and it matters only in less acidic (ammonia-rich or dust-rich) droplets.

::: example How much SO₂ is in the cloud water? {#ex-cloud-siv}
A cloud has a liquid water content $L = 0.5\ \mathrm{g\,m^{-3}}$ (a volume fraction $5\times10^{-7}$ of liquid in air) and droplet pH $4.5$, at $298\ \mathrm{K}$. What fraction of the total $\mathrm{SO_2}$ is in the aqueous phase?
::: solution
From [[#prop-effective-henry]], with $[\mathrm{H^+}] = 10^{-4.5}$: $K_1/[\mathrm{H^+}] = 10^{-1.86+4.5} = 10^{2.64} = 437$, and the $K_1K_2$ term is $10^{-9.06+9.0} = 0.87$. So $K_\mathrm{H}^* = 1.23\times(1 + 437 + 0.87) = 539\ \mathrm{mol\,dm^{-3}\,atm^{-1}}$. The ratio of aqueous to gaseous amounts in a volume of cloudy air is $K_\mathrm{H}^*RTL$, with $R = 0.08206\ \mathrm{dm^3\,atm\,K^{-1}\,mol^{-1}}$ so that the units cancel:
$$
K_\mathrm{H}^*RTL = 539\times0.08206\times298\times5\times10^{-7} = 6.6\times10^{-3} .
$$
The aqueous fraction is $6.6\times10^{-3}/(1 + 6.6\times10^{-3}) = 0.65\ \%$. Most of the $\mathrm{SO_2}$ remains in the gas. Yet aqueous oxidation still wins, because the reaction with dissolved $\mathrm{H_2O_2}$ is so fast that the small dissolved pool is consumed and replenished from the gas within minutes. At pH $6$ the dissolved fraction rises to about $18\ \%$; at pH $3$ it is only $0.02\ \%$.
:::
:::

### Nitrate and ammonium

Nitric acid from $\mathrm{OH + NO_2}$ and from $\mathrm{N_2O_5}$ hydrolysis is much more volatile than sulfuric acid. It enters particles mainly by neutralisation with ammonia, the atmosphere's main gaseous base (emitted mostly by agriculture: livestock manure and fertilisers). Ammonia reacts first with sulfuric acid, forming ammonium bisulfate and ammonium sulfate, and only the ammonia left over can form ammonium nitrate:
$$
\mathrm{NH_3(g)} + \mathrm{HNO_3(g)} \rightleftharpoons \mathrm{NH_4NO_3(s)},\qquad K_p = p_{\mathrm{NH_3}}\,p_{\mathrm{HNO_3}} \text{ (at equilibrium with the solid)}.
$$
Solid ammonium nitrate is present only if the product of the gas-phase partial pressures exceeds $K_p$, which rises steeply with temperature. A widely used fit (Mozurkewich, 1993, *Atmospheric Environment*), for dry particles, is
$$
\ln\left(\frac{K_p}{\mathrm{ppb^2}}\right) = 84.6 - \frac{24\,220}{T/\mathrm{K}} - 6.1\ln\!\left(\frac{T}{298\ \mathrm{K}}\right),
$$ {#eq-nh4no3}
giving $K_p \approx 28\ \mathrm{ppb^2}$ at $298\ \mathrm{K}$ but only $2.0\ \mathrm{ppb^2}$ at $288\ \mathrm{K}$ and $0.12\ \mathrm{ppb^2}$ at $278\ \mathrm{K}$. Ammonium nitrate is therefore a **semi-volatile** component: it condenses on cool nights and in winter and evaporates on warm afternoons — so filter measurements can lose it, and wintertime $\mathrm{PM_{2.5}}$ episodes in agricultural regions of Europe are often dominated by it.

::: example Does ammonium nitrate form? {#ex-nh4no3}
After all sulfate is neutralised, the air contains $5.0\ \mathrm{ppb}$ of free ammonia and $3.0\ \mathrm{ppb}$ of nitric acid. Does solid ammonium nitrate form at $298\ \mathrm{K}$? At $288\ \mathrm{K}$? If so, how much, in $\mathrm{\mu g\,m^{-3}}$ at $1\ \mathrm{atm}$?
::: solution
At $298\ \mathrm{K}$: the product $5.0\times3.0 = 15\ \mathrm{ppb^2}$ is less than $K_p = 27.8\ \mathrm{ppb^2}$, so the air is undersaturated and no solid forms; both gases stay in the gas phase. At $288\ \mathrm{K}$: $K_p = 2.04\ \mathrm{ppb^2}$, and $15 > 2.04$, so solid forms until $(5.0 - x)(3.0 - x) = 2.04$, i.e. $x^2 - 8.0x + 12.96 = 0$:
$$
x = \frac{8.0 - \sqrt{64.0 - 51.84}}{2} = \frac{8.0 - 3.49}{2} = 2.26\ \mathrm{ppb}
$$
(the other root exceeds the available nitric acid). The conversion at $288\ \mathrm{K}$ and $1\ \mathrm{atm}$ is $M p/(RT) = 80.04\times101\,325/(8.314\times288)\ \mathrm{g\,m^{-3}}$ per mole fraction, i.e. $3.39\ \mathrm{\mu g\,m^{-3}\,ppb^{-1}}$, so the particle mass is $2.26\times3.39 = 7.6\ \mathrm{\mu g\,m^{-3}}$ — more than the annual WHO guideline for all of $\mathrm{PM_{2.5}}$, produced by a $10\ \mathrm{K}$ drop in temperature with no change in emissions. The excess ammonia ($2.7\ \mathrm{ppb}$) remains as gas. Because $\mathrm{NH_3}$ is in excess, further reductions in ammonia emissions would make little difference until it is no longer in excess, whereas cutting $\mathrm{NO_x}$ would reduce the nitrate directly — a regime analysis analogous to the ozone one of [[environmental-chemistry/tropospheric-chemistry#prop-regimes]].
:::
:::

### Organic aerosol and black carbon

Organic compounds typically make up $20$–$90\ \%$ of the fine-particle mass. **Primary organic aerosol** comes from combustion (vehicles, cooking, wood burning). **Secondary organic aerosol** (SOA) forms when the oxidation of VOCs by $\mathrm{OH}$, $\mathrm{O_3}$ and $\mathrm{NO_3}$ adds polar functional groups — hydroxyl, carbonyl, carboxylic acid, hydroperoxide, nitrate — lowering the vapour pressure by orders of magnitude, until the products partition into the particle phase. Biogenic terpenes and isoprene are major global SOA precursors; aromatics and long-chain alkanes dominate in cities. **Black carbon** (soot) — graphitic aggregates from incomplete combustion — absorbs sunlight strongly, warming the atmosphere where it resides and darkening snow where it deposits.

## Acid deposition

### The pH of clean rain

::: proposition The natural acidity of rain {#prop-rain-ph}
Pure water in equilibrium with atmospheric $\mathrm{CO_2}$ at partial pressure $p_{\mathrm{CO_2}}$, with no other solutes, has
$$
[\mathrm{H^+}] = \left(K_\mathrm{H}K_1\,p_{\mathrm{CO_2}} + K_\mathrm{w}\right)^{1/2},
$$
where $K_\mathrm{H}$ is the Henry's law constant of $\mathrm{CO_2}$ and $K_1$ the first acid dissociation constant of dissolved $\mathrm{CO_2}$. At $298\ \mathrm{K}$ ($K_\mathrm{H} = 3.4\times10^{-2}\ \mathrm{mol\,dm^{-3}\,atm^{-1}}$, $K_1 = 4.45\times10^{-7}$, $K_\mathrm{w} = 1.0\times10^{-14}$) and $p_{\mathrm{CO_2}} = 424\ \mathrm{\mu atm}$, $\mathrm{pH} = 5.60$. If a strong acid adds a concentration $a$ of $\mathrm{H^+}$ (in excess of strong bases),
$$
[\mathrm{H^+}] = \frac{a + \sqrt{a^2 + 4(K_\mathrm{H}K_1p_{\mathrm{CO_2}} + K_\mathrm{w})}}{2} .
$$
Conditions: dilute solution, $\mathrm{CO_3^{2-}}$ negligible (true below pH $8$), equilibrium with the gas.
:::

::: proof Charge balance for rain {#proof-rain-ph}
The charge balance of the solution is $[\mathrm{H^+}] = [\mathrm{HCO_3^-}] + 2[\mathrm{CO_3^{2-}}] + [\mathrm{OH^-}] + [\mathrm{A^-}]$, with $[\mathrm{A^-}] = a$ the anion of the strong acid (net of strong-base cations). Henry's law gives $[\mathrm{CO_2(aq)}] = K_\mathrm{H}p_{\mathrm{CO_2}}$, so $[\mathrm{HCO_3^-}] = K_1K_\mathrm{H}p_{\mathrm{CO_2}}/[\mathrm{H^+}]$; at the low pH of rain carbonate is negligible, and $[\mathrm{OH^-}] = K_\mathrm{w}/[\mathrm{H^+}]$. Multiplying the charge balance by $[\mathrm{H^+}]$:
$$
[\mathrm{H^+}]^2 - a[\mathrm{H^+}] - (K_\mathrm{H}K_1p_{\mathrm{CO_2}} + K_\mathrm{w}) = 0,
$$
whose positive root is the second result; $a = 0$ gives the first. Numerically, $K_\mathrm{H}K_1p_{\mathrm{CO_2}} = 3.4\times10^{-2}\times4.45\times10^{-7}\times4.24\times10^{-4} = 6.42\times10^{-12}$, so $[\mathrm{H^+}] = 2.53\times10^{-6}$ and $\mathrm{pH} = 5.60$. Note that $\mathrm{CO_2}$ is in effect an "open" reservoir: dissolving does not deplete the gas, so the dissolved concentration is fixed by $p_{\mathrm{CO_2}}$, unlike a weak acid added to a closed beaker.
:::

So "clean" rain is naturally acidic, with pH about $5.6$, and rising $\mathrm{CO_2}$ has lowered it only slightly (pH $5.69$ at $280\ \mathrm{ppm}$). In practice even remote rain has pH $5$–$5.6$ from natural sulfate (from DMS and volcanoes) and organic acids. **Acid rain** usually means rain below about pH $5$, made acidic by sulfuric and nitric acids from anthropogenic $\mathrm{SO_2}$ and $\mathrm{NO_x}$. In the worst-affected areas of Europe and eastern North America in the 1970s–80s, annual mean rain pH was about $4.1$–$4.3$, and individual events below $3$ were recorded.

::: widget plot
f: -log((x*1e-6 + sqrt((x*1e-6)^2 + 4*(0.034*4.45e-7*p*1e-6 + 1e-14)))/2)/log(10)
x: 0, 100
y: 3.8, 5.8
sliders: p=424:280:2000:1
labels: \mathrm{pH}
caption: The pH of rain against the concentration $a$ of added strong acid in $\mathrm{\mu eq\,dm^{-3}}$ (net of strong bases), for a $\mathrm{CO_2}$ partial pressure set by the slider in $\mathrm{\mu atm}$, from [[#prop-rain-ph]] at $298\ \mathrm{K}$. Below about $5\ \mathrm{\mu eq\,dm^{-3}}$ the carbonic acid buffer still matters and pH stays near $5.6$; above it, $\mathrm{pH} \approx -\log_{10}a$ and $\mathrm{CO_2}$ hardly matters. Doubling $\mathrm{CO_2}$ lowers clean-rain pH by only $0.15$ (half of $\log_{10}2$) — acid rain is a sulfur and nitrogen problem, not a carbon one.
:::

::: example Composition of acid rain and the ion balance {#ex-ion-balance}
A rain sample has pH $4.40$ and contains, in $\mathrm{\mu mol\,dm^{-3}}$: $\mathrm{NH_4^+}$ 18, $\mathrm{Na^+}$ 12, $\mathrm{Ca^{2+}}$ 6, $\mathrm{Mg^{2+}}$ 3, $\mathrm{K^+}$ 1, $\mathrm{SO_4^{2-}}$ 25, $\mathrm{Cl^-}$ 14. Nitrate was not measured. (a) Estimate nitrate from the ion balance. (b) How much of the sulfate is non-sea-salt sulfate? (Sea water has a molar $\mathrm{SO_4^{2-}/Na^+}$ ratio of $0.060$.)
::: solution
(a) Work in equivalents ($\mathrm{\mu eq\,dm^{-3}}$ = concentration times charge). Cations: $\mathrm{H^+} = 10^{-4.40}\ \mathrm{mol\,dm^{-3}} = 39.8$; $\mathrm{NH_4^+}$ 18; $\mathrm{Na^+}$ 12; $\mathrm{Ca^{2+}}$ 12; $\mathrm{Mg^{2+}}$ 6; $\mathrm{K^+}$ 1; sum $88.8$. Anions measured: $\mathrm{SO_4^{2-}}$ 50; $\mathrm{Cl^-}$ 14; sum 64. Electroneutrality requires the missing anion to supply $88.8 - 64 = 24.8\ \mathrm{\mu eq\,dm^{-3}}$, so $[\mathrm{NO_3^-}] \approx 25\ \mathrm{\mu mol\,dm^{-3}}$ (ignoring bicarbonate, negligible at pH $4.4$, and organic anions). In real data-quality control the ion balance is used the other way round: a measured imbalance of more than about $10\ \%$ flags an analytical problem ([[environmental-chemistry/environmental-monitoring]]).

(b) Sea-salt sulfate is $0.060\times12 = 0.72\ \mathrm{\mu mol\,dm^{-3}}$, so non-sea-salt sulfate is $25 - 0.72 = 24.3\ \mathrm{\mu mol\,dm^{-3}}$ — essentially all of it from the oxidation of $\mathrm{SO_2}$. Sulfate supplies $50$ and nitrate $25\ \mathrm{\mu eq}$ of strong-acid anion; ammonium and calcium have neutralised part of that acid, leaving $40\ \mathrm{\mu eq}$ of free $\mathrm{H^+}$. Note that ammonium, though it neutralises acid in the rain, re-releases it in soil when it is nitrified ($\mathrm{NH_4^+ + 2\,O_2 \rightarrow NO_3^- + 2\,H^+ + H_2O}$), so "potential acidity" counts it as acid.
:::
:::

### Effects and trends

The damage done by acid deposition depends less on the rain than on what it falls on. Catchments on limestone or carbonate-rich soils neutralise acid easily. Thin soils over granite and other silicate rocks — in Scandinavia, Scotland, the Adirondacks, eastern Canada — have little **acid-neutralising capacity**: their exchangeable base cations ($\mathrm{Ca^{2+}}$, $\mathrm{Mg^{2+}}$) are leached away and replaced by $\mathrm{H^+}$ and $\mathrm{Al^{3+}}$. Below about pH $5$ aluminium hydroxides dissolve, and inorganic monomeric aluminium is toxic to fish (it precipitates on gill surfaces and disrupts ion regulation) and to fine tree roots. Lakes lost their fish populations; forests in central Europe suffered nutrient imbalance and needle loss. Acid deposition also corrodes calcareous building stone, $\mathrm{CaCO_3 + H_2SO_4 \rightarrow CaSO_4 + H_2O + CO_2}$, the gypsum crust being washed away or blistering off.

The policy response — described here neutrally — combined international agreements (the 1979 Convention on Long-Range Transboundary Air Pollution and its protocols, from the first Sulphur Protocol of 1985 to the 1999 Gothenburg Protocol, which introduced **critical loads**: the deposition below which no significant harm is expected for a given ecosystem) with national measures such as the emissions trading programme for $\mathrm{SO_2}$ in Title IV of the US Clean Air Act Amendments of 1990, flue-gas desulfurisation at power stations, low-sulfur fuels, and later the large-scale desulfurisation of Chinese coal power from the late 2000s. European and North American $\mathrm{SO_2}$ emissions fell by more than $80\ \%$ between 1980 and 2020 (EEA and US EPA inventories), and precipitation sulfate fell with them. Recovery of acidified waters has followed, but slowly, because soils must rebuild their base-cation pools by weathering. Nitrogen deposition, from both $\mathrm{NO_x}$ and agricultural ammonia, has fallen less and is now often the main driver of exceedance of critical loads in Europe.

## Particles, health and climate

Fine particles are, by the assessment of the World Health Organization, the air pollutant with the greatest public-health burden: WHO estimated that ambient (outdoor) air pollution caused about $4.2$ million premature deaths worldwide in 2019, mostly through $\mathrm{PM_{2.5}}$. The mechanisms are described in terms of hazard, not dose: particles small enough to reach the alveoli deposit there and are taken up by macrophages; their surfaces and constituents (transition metals, quinones and other redox-active organics) generate reactive oxygen species, causing **oxidative stress** and inflammation in the lung, which propagates to the cardiovascular system (endothelial dysfunction, enhanced coagulation, atherosclerosis); the smallest particles can cross into the circulation. Epidemiological studies associate long-term $\mathrm{PM_{2.5}}$ exposure with cardiovascular and respiratory disease and lung cancer; the International Agency for Research on Cancer classified outdoor air pollution and particulate matter as carcinogenic to humans (Group 1) in 2013, and diesel engine exhaust in 2012.

Guidelines and standards for particulate matter, as of 2026 (quoted, not evaluated):

| instrument | $\mathrm{PM_{2.5}}$ annual | $\mathrm{PM_{2.5}}$ 24-h | $\mathrm{PM_{10}}$ annual | $\mathrm{PM_{10}}$ 24-h |
|---|---|---|---|---|
| WHO air quality guidelines (2021) | $5$ | $15$ | $15$ | $45$ |
| EU Directive 2008/50/EC (limit values in force) | $25$ | — | $40$ | $50$ |
| EU Directive (EU) 2024/2881 (limit values from 2030) | $10$ | $25$ | $20$ | $45$ |
| US NAAQS, primary (PM₂.₅ annual revised 2024) | $9.0$ | $35$ | — | $150$ |

(all in $\mathrm{\mu g\,m^{-3}}$; the 24-hour values are percentile- or exceedance-based, and the precise statistical forms differ between instruments, so the source text should be consulted before any comparison.) The WHO guidelines are health-based recommendations; the binding standards are set through national or regional legislative processes.

Particles also affect climate. They scatter sunlight back to space (the **direct effect**) and, by acting as cloud condensation nuclei, increase the number and decrease the size of cloud droplets, making clouds brighter and possibly longer-lived (the **indirect effects**; the brightening is called the Twomey effect). IPCC AR6 assessed the total aerosol effective radiative forcing over 1750–2019 as about $-1.1\ \mathrm{W\,m^{-2}}$ (very likely range $-2.0$ to $-0.4$), offsetting a substantial part of the greenhouse-gas forcing and accounting for much of the uncertainty in the total ([[environmental-chemistry/greenhouse-gases]]). An uncomfortable consequence is that cleaning the air of sulfate unmasks some greenhouse warming; recent studies attribute part of the observed acceleration of warming in the 2010s–2020s to reductions in aerosol, including the 2020 cut in the sulfur content of marine fuel by the International Maritime Organization.

::: quiz
A rural station records higher $\mathrm{PM_{2.5}}$ on cold, still winter nights than on warm summer afternoons, although emissions of $\mathrm{SO_2}$, $\mathrm{NO_x}$ and $\mathrm{NH_3}$ are similar. Which explanation fits the chemistry of this lesson best?
- [x] Ammonium nitrate is semi-volatile: its equilibrium constant $K_p$ falls steeply with temperature, so more nitrate partitions into particles in cold air, and shallow night-time boundary layers concentrate it.
- [ ] Sulfate formation is faster in winter because OH is higher.
- [ ] Coarse particles settle faster in cold air.
- [ ] Cold air contains more $\mathrm{CO_2}$, which forms carbonate particles.
::: solution
[[#eq-nh4no3]] gives $K_p$ two orders of magnitude lower at $278\ \mathrm{K}$ than at $298\ \mathrm{K}$, so the same gases condense to ammonium nitrate in the cold; low mixing heights add to the effect. OH, and with it gas-phase sulfate production, is *lower* in winter; settling velocity barely depends on temperature; and $\mathrm{CO_2}$ does not form particles.
:::
:::

::: warning PM₂.₅ is a mass, not a substance {#warn-pm-mass}
$\mathrm{PM_{2.5}}$ is defined operationally — whatever mass a size-selective sampler collects on a filter, weighed under specified humidity and temperature. It is not one chemical, and the same mass can be ammonium sulfate in one place, wood smoke in another, desert dust in a third, with different sources, different trends and possibly different toxicity. Three consequences follow: (1) source attribution needs chemical speciation (ions, organic and elemental carbon, metals), not only mass; (2) semi-volatile components such as ammonium nitrate and some organics are lost from heated or long-exposed filters, so methods must be compared carefully; (3) "particle number" and "PM mass" respond to different measures — a diesel particle filter removes most of the number of ultrafine soot particles while changing $\mathrm{PM_{2.5}}$ mass far less.
:::

::: history
Robert Angus Smith, the first Alkali Inspector under the British Alkali Act of 1863, analysed the rain of Manchester and in *Air and Rain: The Beginnings of a Chemical Climatology* (1872) coined the term "acid rain". The issue was rediscovered in the 1960s when the Swedish soil scientist Svante Odén, using data from a European network of precipitation samplers, argued (1967–68) that the acidification of Scandinavian lakes was caused by sulfur emitted in Britain and continental Europe, and Gene Likens and colleagues documented acid precipitation at the Hubbard Brook Experimental Forest in New Hampshire (1972). These findings led to the Convention on Long-Range Transboundary Air Pollution (1979). The modern view of fine particles as a health hazard rests largely on the Harvard Six Cities Study of Douglas Dockery and colleagues (*New England Journal of Medicine*, 1993), which associated long-term fine-particle exposure with mortality.
:::

## Where this leads

The Henry's-law and acid–base equilibria used here are developed for the carbonate system of rivers, lakes and the ocean in [[environmental-chemistry/natural-waters]]. Aerosol radiative forcing is placed in the climate budget in [[environmental-chemistry/greenhouse-gases]]. The fate of deposited acids and metals in soils is part of [[environmental-chemistry/soils-remediation]], and the sampling, filter weighing and ion chromatography behind every number in this chapter are treated in [[environmental-chemistry/environmental-monitoring]] and in [[analytical-chemistry/chromatography]].

::: summary
- Aerosol particles are classified by aerodynamic diameter ($\mathrm{PM_{10}}$, $\mathrm{PM_{2.5}}$, ultrafine) and fall into nucleation, Aitken, accumulation and coarse modes; fine mass is mostly secondary sulfate, nitrate, ammonium and organics.
- Stokes settling $v_\mathrm{s} = \rho_\mathrm{p}d^2gC_\mathrm{c}/(18\mu)$ removes coarse particles in days; accumulation-mode particles live about a week and are removed by rain, so they travel far.
- $\mathrm{SO_2}$ becomes sulfate by gas-phase OH oxidation and, faster, in clouds by $\mathrm{H_2O_2}$ (nearly pH-independent) and $\mathrm{O_3}$ (fast only at higher pH); dissolution follows $K_\mathrm{H}^* = K_\mathrm{H}(1 + K_1/[\mathrm{H^+}] + K_1K_2/[\mathrm{H^+}]^2)$.
- Ammonium nitrate forms only when $p_{\mathrm{NH_3}}p_{\mathrm{HNO_3}} > K_p(T)$, which falls steeply on cooling: it is semi-volatile and important in cold seasons.
- Clean rain has pH $\approx 5.6$ from $\mathrm{CO_2}$; acid rain (pH $< 5$) comes from $\mathrm{H_2SO_4}$ and $\mathrm{HNO_3}$; the ion balance checks analyses and reveals missing ions.
- Acid deposition harms poorly buffered catchments by leaching base cations and mobilising toxic aluminium; $\mathrm{SO_2}$ emission cuts since 1980 have reduced it, with slow ecological recovery.
- $\mathrm{PM_{2.5}}$ is the leading air-pollution health hazard (oxidative stress and inflammation); WHO 2021 guideline $5\ \mathrm{\mu g\,m^{-3}}$ annual. Aerosols exert an ERF of about $-1.1\ \mathrm{W\,m^{-2}}$ (IPCC AR6).
:::

## Exercises

::: exercise Settling of a dust particle {level=1 check="1.6"}
A mineral dust particle has diameter $5.0\ \mathrm{\mu m}$ and density $2000\ \mathrm{kg\,m^{-3}}$. With $\mu = 1.81\times10^{-5}\ \mathrm{Pa\,s}$ and $C_\mathrm{c} = 1.03$, find its settling velocity. (Enter $v_\mathrm{s}$ in $\mathrm{mm\,s^{-1}}$, to two significant figures.)
::: solution
$v_\mathrm{s} = 2000\times(5.0\times10^{-6})^2\times9.81\times1.03/(18\times1.81\times10^{-5}) = 1.01\times10^{-6}/3.258\times10^{-4} = 1.55\times10^{-3}\ \mathrm{m\,s^{-1}} \approx 1.6\ \mathrm{mm\,s^{-1}}$. Its aerodynamic diameter is $5.0\sqrt{2} \approx 7\ \mathrm{\mu m}$ (ignoring the small difference in slip correction), so it counts in $\mathrm{PM_{10}}$ but not $\mathrm{PM_{2.5}}$.
:::
:::

::: exercise Pre-industrial rain {level=1 check="5.69"}
Using [[#prop-rain-ph]], find the pH of pure rain in equilibrium with $280\ \mathrm{\mu atm}$ of $\mathrm{CO_2}$ at $298\ \mathrm{K}$. (Enter the pH, to two decimal places.)
::: solution
$K_\mathrm{H}K_1p = 3.4\times10^{-2}\times4.45\times10^{-7}\times2.80\times10^{-4} = 4.24\times10^{-12}$; adding $K_\mathrm{w}$ gives $4.25\times10^{-12}$, so $[\mathrm{H^+}] = 2.06\times10^{-6}$ and $\mathrm{pH} = 5.69$, only $0.09$ above today's value.
:::
:::

::: exercise Dry-deposition lifetime {level=1 check="2.3"}
Sulfur dioxide has a deposition velocity of $0.50\ \mathrm{cm\,s^{-1}}$ to a moist surface below a well-mixed boundary layer of depth $1.0\ \mathrm{km}$. What is its dry-deposition lifetime? (Enter it in days, to two significant figures.)
::: solution
$\tau = h/v_\mathrm{d} = 1000\ \mathrm{m}/0.0050\ \mathrm{m\,s^{-1}} = 2.0\times10^{5}\ \mathrm{s} = 2.3\ \mathrm{d}$. Combined with a gas-phase OH lifetime of about two weeks and faster in-cloud oxidation, this means a large share of emitted $\mathrm{SO_2}$ is deposited as $\mathrm{SO_2}$ near its source, while the rest is oxidised and travels as sulfate.
:::
:::

::: exercise Rain with sulfuric acid {level=2 check="4.40"}
Rain in equilibrium with $424\ \mathrm{\mu atm}$ of $\mathrm{CO_2}$ also contains $20\ \mathrm{\mu mol\,dm^{-3}}$ of $\mathrm{H_2SO_4}$ (fully dissociated) and no bases. Find its pH. (Enter the pH, to two decimal places.)
::: solution
The strong acid supplies $a = 40\ \mathrm{\mu eq\,dm^{-3}} = 4.0\times10^{-5}\ \mathrm{mol\,dm^{-3}}$ of $\mathrm{H^+}$ (sulfuric acid is diprotic; $\mathrm{p}K_{\mathrm{a2}} = 1.99$ means $\mathrm{HSO_4^-}$ is essentially fully dissociated at these concentrations). With $K = 6.42\times10^{-12} + 10^{-14} = 6.43\times10^{-12}$: $[\mathrm{H^+}] = (4.0\times10^{-5} + \sqrt{1.6\times10^{-9} + 2.57\times10^{-11}})/2 = (4.0\times10^{-5} + 4.032\times10^{-5})/2 = 4.016\times10^{-5}$, so $\mathrm{pH} = 4.40$. The $\mathrm{CO_2}$ contributes almost nothing: at this acidity dissolved $\mathrm{CO_2}$ stays undissociated.
:::
:::

::: exercise Cloud water at higher pH {level=2 check="18"}
Repeat [[#ex-cloud-siv]] for droplet pH $6.0$. What percentage of the $\mathrm{SO_2}$ is in the aqueous phase? (Enter the percentage, to two significant figures.)
::: solution
$K_1/[\mathrm{H^+}] = 10^{4.14} = 13\,800$, $K_1K_2/[\mathrm{H^+}]^2 = 10^{-9.06+12} = 871$, so $K_\mathrm{H}^* = 1.23\times(1 + 13\,800 + 871) = 1.81\times10^{4}$. Then $K_\mathrm{H}^*RTL = 1.81\times10^{4}\times0.08206\times298\times5\times10^{-7} = 0.221$ and the aqueous fraction is $0.221/1.221 = 18\ \%$. Ammonia-rich or dust-laden clouds, which stay near neutral, take up and oxidise $\mathrm{SO_2}$ (especially by $\mathrm{O_3}$) much faster than acidic ones.
:::
:::

::: exercise The missing anion {level=2 check="34"}
A rain sample at pH $4.20$ contains (in $\mathrm{\mu mol\,dm^{-3}}$) $\mathrm{NH_4^+}$ 30, $\mathrm{Na^+}$ 20, $\mathrm{Ca^{2+}}$ 5, $\mathrm{Mg^{2+}}$ 2, $\mathrm{SO_4^{2-}}$ 35, $\mathrm{Cl^-}$ 23. Estimate the nitrate concentration from the ion balance. (Enter $[\mathrm{NO_3^-}]$ in $\mathrm{\mu mol\,dm^{-3}}$, to two significant figures.)
::: solution
Cations: $\mathrm{H^+} = 10^{-4.20} = 63.1$; $\mathrm{NH_4^+}$ 30; $\mathrm{Na^+}$ 20; $\mathrm{Ca^{2+}}$ 10; $\mathrm{Mg^{2+}}$ 4; total $127.1\ \mathrm{\mu eq\,dm^{-3}}$. Anions: $\mathrm{SO_4^{2-}}$ 70; $\mathrm{Cl^-}$ 23; total 93. Nitrate $= 127.1 - 93 = 34\ \mathrm{\mu eq\,dm^{-3}}$, i.e. $[\mathrm{NO_3^-}] \approx 34\ \mathrm{\mu mol\,dm^{-3}}$. The chloride-to-sodium ratio ($23/20 = 1.15$) is close to the sea-water value ($1.16$), so chloride here is sea salt, not hydrochloric acid; the strong acidity comes from sulfuric and nitric acids.
:::
:::

::: exercise Effective Henry's constant and self-limitation {level=3 check="4.9"}
(a) Show that for $2 < \mathrm{pH} < 6$ the total dissolved $\mathrm{S(IV)}$ in a droplet in equilibrium with gaseous $\mathrm{SO_2}$ is approximately $K_\mathrm{H}K_1p_{\mathrm{SO_2}}/[\mathrm{H^+}]$. (b) If $\mathrm{S(IV)}$ in the droplet is the only acid, show that $[\mathrm{H^+}] \approx (K_\mathrm{H}K_1p_{\mathrm{SO_2}})^{1/2}$, and evaluate the pH for $p_{\mathrm{SO_2}} = 10\ \mathrm{ppb}$ ($1.0\times10^{-8}\ \mathrm{atm}$). (c) Explain why oxidation by $\mathrm{O_3}$, whose rate is proportional to $[\mathrm{SO_3^{2-}}]$, slows as sulfate accumulates. (Enter the pH from (b), to two significant figures.)
::: hint
In (b), the charge balance is $[\mathrm{H^+}] \approx [\mathrm{HSO_3^-}]$.
:::
::: solution
(a) In this range $K_1/[\mathrm{H^+}] \gg 1$ (since $\mathrm{pH} > \mathrm{p}K_1 + 0.1$ roughly) and $K_2/[\mathrm{H^+}] \ll 1$, so the bracket in [[#prop-effective-henry]] is dominated by $K_1/[\mathrm{H^+}]$ and $[\mathrm{S(IV)}] \approx [\mathrm{HSO_3^-}] = K_\mathrm{H}K_1p/[\mathrm{H^+}]$. (b) Charge balance $[\mathrm{H^+}] = [\mathrm{HSO_3^-}] = K_\mathrm{H}K_1p/[\mathrm{H^+}]$ gives $[\mathrm{H^+}]^2 = K_\mathrm{H}K_1p = 1.23\times10^{-1.86}\times1.0\times10^{-8} = 1.70\times10^{-10}$, so $[\mathrm{H^+}] = 1.30\times10^{-5}$ and $\mathrm{pH} = 4.9$. (c) $[\mathrm{SO_3^{2-}}] = K_2[\mathrm{HSO_3^-}]/[\mathrm{H^+}] = K_\mathrm{H}K_1K_2p/[\mathrm{H^+}]^2$: as sulfuric acid accumulates, $[\mathrm{H^+}]$ rises and $[\mathrm{SO_3^{2-}}]$ falls as its square, so the ozone pathway shuts itself off; the $\mathrm{H_2O_2}$ pathway, nearly pH-independent, does not. That is why $\mathrm{H_2O_2}$ dominates sulfate production in acidic clouds.
:::
:::

::: exercise Ammonium nitrate on a cold night {level=3 check="10"}
Using [[#eq-nh4no3]], find $K_p$ at $278\ \mathrm{K}$, and the mass of solid ammonium nitrate formed at that temperature and $1\ \mathrm{atm}$ from $5.0\ \mathrm{ppb}$ of free $\mathrm{NH_3}$ and $3.0\ \mathrm{ppb}$ of $\mathrm{HNO_3}$. (Enter the mass in $\mathrm{\mu g\,m^{-3}}$, to two significant figures.)
::: solution
$\ln K_p = 84.6 - 24\,220/278 - 6.1\ln(278/298) = 84.6 - 87.12 + 0.424 = -2.10$, so $K_p = 0.123\ \mathrm{ppb^2}$. Solve $(5.0 - x)(3.0 - x) = 0.123$: $x^2 - 8.0x + 14.877 = 0$, $x = (8.0 - \sqrt{64 - 59.51})/2 = (8.0 - 2.119)/2 = 2.94\ \mathrm{ppb}$ — almost all of the nitric acid. The conversion at $278\ \mathrm{K}$ is $80.04\times101\,325/(8.314\times278) = 3.51\ \mathrm{\mu g\,m^{-3}\,ppb^{-1}}$, so the mass is $2.94\times3.51 = 10\ \mathrm{\mu g\,m^{-3}}$. When $K_p$ is far below the product, the limiting reagent ($\mathrm{HNO_3}$) is almost completely converted, and the particle mass is controlled by the total nitrate available — i.e. by $\mathrm{NO_x}$ emissions.
:::
:::
