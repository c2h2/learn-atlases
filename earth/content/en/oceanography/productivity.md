The ocean's plants fix about fifty gigatonnes of carbon a year — as much as all the land plants of the planet — from organisms that average a fiftieth of a millimetre and replace themselves in days. Ninety-nine per cent of what they fix is eaten, respired and returned to the surface within a season; one per cent sinks, and that one per cent is the largest carbon flux on Earth after photosynthesis itself, the reason the atmosphere is twenty per cent leaner in CO₂ than physics alone would leave it, and the base of every fishery that has ever existed.

## Light and the euphotic zone

::: definition Light, the critical depth and the seasonal bloom {#def-light}
Photosynthetically active radiation (PAR, $400$–$700\ \mathrm{nm}$) attenuates exponentially,
$$
I(z) = I_0\,e^{-K_d z}, \qquad Z_{1\%} = \frac{4.6}{K_d},
$$
with $K_d$ from $0.03\ \mathrm{m^{-1}}$ in the oligotrophic Sargasso to $2\ \mathrm{m^{-1}}$ in coastal and turbid water — so the euphotic zone is $150\ \mathrm{m}$ in one gyre and $2\ \mathrm{m}$ in an estuary. Blue light penetrates farthest, which is why open-ocean water is blue and why the ocean-colour algorithms that convert SeaWiFS, MODIS, VIIRS and Sentinel-3 radiance into chlorophyll are built on band ratios in the blue and green.

Photosynthesis saturates. The photosynthesis–irradiance relation,
$$
P^{B} = P^{B}_{s}\left[1 - \exp\!\left(-\frac{\alpha^{B} I}{P^{B}_{s}}\right)\right] e^{-\beta I/P^{B}_{s}},
$$
rises linearly with an initial slope $\alpha^{B}$ (the quantum yield, $0.02$–$0.08\ \mathrm{mol\,C\,mol^{-1}\,photons}$, set by the sixty- to eight-hundred-chlorophyll ratio of photosystem II and near-universal), saturates at $P^{B}_{s}$, and declines by photoinhibition at high light. Photoacclimation then rewires the cell: low light raises the chlorophyll per cell and lowers $P^{B}_{s}$, high light does the opposite, and the chlorophyll-to-carbon ratio — the quantity satellites actually see — varies by a factor of five for physiology alone.

Sverdrup's critical depth (1953) couples this to mixing. A population net grows only if depth-integrated production exceeds depth-integrated respiration, and because light falls exponentially while mixing exposes cells uniformly, blooming requires
$$
Z_{\mathrm{mix}} < Z_{\mathrm{cr}} \approx \frac{1}{\gamma P^{B}_{s}}\ln\!\left(\frac{\gamma P^{B}_{s} I_0}{10\,R}\right),
$$
where the factor of ten is the empirical compensation ratio. This single inequality explains the seasonal rhythm of mid-latitude oceans: deep winter mixing replenishes nutrients but keeps $Z_{\mathrm{mix}} \gg Z_{\mathrm{cr}}$, so nothing grows; in March and April stratification shoals $Z_{\mathrm{mix}}$ through $Z_{\mathrm{cr}}$ while nutrients are still high, and the spring bloom explodes; by June the nutrients are gone and the bloom collapses regardless of light. The timing of the crossing — not the light, not the nutrient concentration — is what climate change moves, and the observed advance of the North Atlantic bloom by $\sim 0.4$ days per year since 1998 is one of the best-resolved biological climate signals anywhere.
:::

::: definition New production, the microbial loop and export {#def-export}
Nitrate arrives from below by mixing, upwelling and fixation; ammonium is recycled in place. New production $f$ uses nitrate, regenerated production uses ammonium, and the f-ratio
$$
f = \frac{\text{new production}}{\text{total production}} \approx \frac{[\mathrm{NO_3^{-}}]_{\mathrm{winter\ MLD}}}{[\mathrm{NO_3^{-}}]_{\mathrm{winter\ MLD}} + [\mathrm{NH_4^{+}}]_{\mathrm{recycled}}}
$$
is $0.1$–$0.2$ in the oligotrophic gyres and $0.4$–$0.6$ in upwelling and high-latitude water. Because only new production can be exported without stripping the surface, the f-ratio is the closest thing oceanography has to a carbon-sequestration efficiency — and it is also the quantity most models get wrong.

Between fixation and export sits the microbial loop, the greatest reworking of carbon on the planet. Twenty to fifty per cent of fixed carbon is released as dissolved organic matter; heterotrophic bacteria ($10^{5}$–$10^{6}$ cells per millilitre) take it up, are grazed by flagellates and ciliates, which are grazed by copepods — so that in the oligotrophic ocean most of the production passes through three to five trophic transfers before it is either respired or eaten by the classic food web. Viruses lyse twenty to forty per cent of the bacterial production daily, returning it to dissolved matter in the viral shunt. And the residual, hugely recalcitrant dissolved organic carbon — $\sim 650\ \mathrm{PgC}$, as much as the atmosphere, with a residence time of $4000$–$6000$ years — is the largest moving reduced-carbon reservoir in the surface Earth, and we do not know why it resists bacteria.

Export is by gravity. Fecal pellets ($100$–$1000\ \mu\mathrm{m}$, sinking $50$–$400\ \mathrm{m\,d^{-1}}$), diatom aggregates after a bloom, and the mucous marine snow that dominates by area carry particulate organic carbon down, and the flux decays with depth by the Martin power law
$$
F(z) = F_{100}\left(\frac{z}{100}\right)^{-b}, \qquad b \approx 0.86\ \text{(global mean)}, \quad 0.4\text{–}1.5\ \text{range},
$$
which encodes everything: $b$ is large when the material is labile and small, small when it is refractory, protected inside mineral balls, or diluted by carbonate and biogenic silica — the ballast effect, which is why the Southern Ocean and the carbonate shelves sequester far more carbon per unit of surface production than the oligotrophic gyres. At $b = 0.86$ only $14\%$ of the $100$-m flux reaches $1000\ \mathrm{m}$ and $4\%$ reaches $4000\ \mathrm{m}$; the global mean transfer efficiency from the surface to the mesopelagic is $\sim 10$–$20$ per cent, and the entire biological pump's climate leverage lives inside that number.
:::

::: definition Nutrients, iron and the three limitations {#def-nutrients}
Surface water is nitrate- and phosphate-depleted nearly everywhere, so the question is never whether nutrients limit but which nutrient, where, and against what.

Nitrate limitation dominates the subtropical gyres, where nitrogen fixation by *Trichodesmium* and unicellular cyanobacteria ($1$–$5\times10^{12}\ \mathrm{g\ N\ yr^{-1}}$ globally) buffers the pool toward the Redfield N:P of $16:1$. Phosphorus limitation appears where denitrification has stripped nitrogen — the eastern tropical Atlantic, the Bay of Bengal, the eastern tropical Pacific — and is recorded in the $\delta^{15}\mathrm{N}$ of suspended particulate matter. Silicate limitation ends diatom blooms in coastal upwelling and in the Southern Ocean, and because diatoms carry the ballast that exports carbon, the silicate cycle is a carbon cycle.

Iron limits about a third of the high-nutrient, low-chlorophyll (HNLC) ocean — the subarctic Pacific, the equatorial Pacific east of $110\ \mathrm{^\circ W}$, and the Southern Ocean south of the ACC — where dissolved iron falls below $0.5\ \mathrm{nmol\,L^{-1}}$ while nitrate remains above $15\ \mu\mathrm{mol\,L^{-1}}$. John Martin's iron hypothesis (1988, 1990) proposed that glacial dust fertilised the Southern Ocean and drew down atmospheric CO₂; the SOIREE, SOFeX, SEEDS, EisenEx, EIFES and LOHAFEX enrichment experiments of 1995–2011 confirmed the physiology — a few nanomoles of iron trigger a diatom bloom that draws down nutrients by half — but showed the carbon export is inefficient, so that the glacial CO₂ effect, while real, is a factor of two to five times smaller than Martin estimated. The ocean iron cycle is now mapped by GEOTRACES, which shows hydrothermal, sedimentary, dust and organic-complexation sources in amounts that are comparable, and a biosphere that makes iron ligands to keep it in solution.

Light limits high latitudes in winter, nutrients limit the gyres in summer, iron limits a third of the ocean all year, and grazing limits the rest. Climate change acts on all four: surface warming stratifies and shoals the mixed layer, reducing nutrient supply and the f-ratio; the observed global chlorophyll record of 1998–2022 shows a decline of $\sim 0.07\ \mathrm{mg\,m^{-3}}$ per decade in the warm subtropics and an increase at high northern latitudes, with the net global primary production trend still disputed between the ocean-colour and the model communities; and deoxygenation expands the oxygen minimum zones, which favour nitrogen loss and therefore further nitrogen limitation.
:::

::: example The spring bloom and the critical depth {#ex-critical}
In a mid-latitude station the winter mixed layer is $180\ \mathrm{m}$ deep and $K_d = 0.08\ \mathrm{m^{-1}}$. Find the depth of the one-per-cent light level, and explain why the bloom breaks out in April rather than in March when the nutrients are highest.
::: solution
$$
Z_{1\%} = \frac{4.6}{K_d} = \frac{4.6}{0.08} = 58\ \mathrm{m}.
$$
In March the mixed layer is $180\ \mathrm{m}$ — three times the euphotic depth — so the average cell sees less than one per cent of surface light most of the time, respiration exceeds production, and the population is washed out however rich the water. Stratification in April shallows $Z_{\mathrm{mix}}$ through $Z_{\mathrm{cr}}$ near $50$–$60\ \mathrm{m}$, and the bloom begins within days.

Sverdrup's criterion is an inequality between two lengths, not a threshold in any chemical, which is why blooms are so hard to forecast and so sensitive to wind, eddies and the onset of stratification. A single storm in May can redeepen the layer and cancel a bloom; an eddy can advance it by three weeks. The observed advance of $0.4$ days per year in the North Atlantic bloom date over 1998–2020 corresponds to an $8$-day advance in twenty years, and it is correlated with earlier spring stratification rather than with temperature directly.

The consequence for the carbon cycle is that an earlier bloom is not necessarily a larger one. Earlier stratification means a shallower mixed layer, which means a smaller nitrate inventory entrained, which means less new production and less export even though the season of photosynthesis is longer. This is the mechanism behind the modelled twentieth-first-century decline in North Atlantic export production of $\sim 5$–$10$ per cent, and it is the clearest example in the subject of a biological feedback whose sign is opposite to the one the word "greening" suggests.
:::
:::

::: example New production from the winter mixed layer {#ex-newprod}
The late-winter mixed layer at Bermuda is $80\ \mathrm{m}$ deep with $20\ \mu\mathrm{mol\,L^{-1}}$ of nitrate. Assuming all of it is consumed over the year, find the annual new production in $\mathrm{g\ C\,m^{-2}\,yr^{-1}}$.
::: solution
The nitrate inventory is
$$
0.020\ \mathrm{mol\,m^{-3}}\times80\ \mathrm{m} = 1.6\ \mathrm{mol\ N\,m^{-2}},
$$
and Redfield **stoichiometry** ($\mathrm{C}:\mathrm{N} = 106:16$) gives
$$
1.6\times\frac{106}{16} = 10.6\ \mathrm{mol\ C\,m^{-2}} = 127\ \mathrm{g\ C\,m^{-2}\,yr^{-1}} .
$$
The observed annual new production at the Sargasso Station time series is $60$–$100\ \mathrm{g\ C\,m^{-2}\,yr^{-1}}$, so the one-dimensional budget overestimates by thirty to one hundred per cent.

The overestimate is the interesting part. Not all the nitrate is used — the layer restratifies before drawdown is complete. Some of the supply comes from below the winter layer by subduction and eddy injection, which the one-dimensional method misses entirely. And a large fraction of the annual nitrate input arrives by winter entrainment of deep water, not by the concentration the layer starts with. This is why the method is still used: it is cheap, it is conceptually clean, and its error is systematic and known, which makes it a usable index even when it is not a measurement.

Multiply $127\ \mathrm{g\ C\,m^{-2}\,yr^{-1}}$ by the $1.5\times10^{14}\ \mathrm{m^{2}}$ of the world's mesotrophic and oligotrophic gyres and the implied new production is $19\ \mathrm{PgC\,yr^{-1}}$, against a satellite-based global total of $\sim 50\ \mathrm{PgC\,yr^{-1}}$ and a new-production estimate of $\sim 10\ \mathrm{PgC\,yr^{-1}}$. The factor-of-two spread between the methods is the size of the uncertainty in the ocean's biological carbon sequestration, and it has not narrowed in twenty years.
:::
:::

::: example The Martin curve and the fate of an export flux {#ex-martin}
A sediment-trap array records $F(100\ \mathrm{m}) = 100\ \mathrm{g\ C\,m^{-2}\,yr^{-1}}$. With the global-mean attenuation exponent $b = 0.86$, find the flux at $1000\ \mathrm{m}$ and at $4000\ \mathrm{m}$, and the fraction of surface production buried if the surface production is $300\ \mathrm{g\ C\,m^{-2}\,yr^{-1}}$.
::: solution
$$
F(1000) = 100\times\left(\frac{1000}{100}\right)^{-0.86} = 100\times10^{-0.86} = 13.8\ \mathrm{g\ C\,m^{-2}\,yr^{-1}}
$$
$$
F(4000) = 100\times40^{-0.86} = 4.2\ \mathrm{g\ C\,m^{-2}\,yr^{-1}}
$$
and the burial fraction is $4.2/300 = 1.4\%$.

Fourteen per cent of the export escapes the mesopelagic; one and a half per cent of the total production is buried. These are the numbers that set atmospheric CO₂, and they are why the biological pump is called a leaky one. The remaining $98.6$ per cent is respired in the water column, and that respiration is what consumes the oxygen and builds the nutrients of the interior — the same process, read from the other side, as the oxygen minimum zones and the deep Pacific's carbon excess.

The exponent $b$ is not a constant. It is $1.2$–$1.5$ where the material is labile diatom organic matter and $0.4$–$0.6$ where it is carbonate-ballasted or refractory, and the ratio $F(1000)/F(100)$ varies from $0.05$ in the oligotrophic gyres to $0.30$ beneath a Southern Ocean diatom bloom. That six-fold range, not the surface production, is what decides which regions sequester carbon, and it is the quantity no satellite can see and every earth-system model must guess.
:::
:::

::: example The iron amplification {#ex-iron}
An open-ocean iron enrichment experiment adds $3.0\ \mathrm{nmol\,L^{-1}}$ of dissolved iron and draws nitrate down by $30\ \mu\mathrm{mol\,L^{-1}}$. Find the moles of carbon fixed per mole of iron, and the mass of carbon fixed per hectare if the enriched layer is $100\ \mathrm{m}$ deep.
::: solution
Redfield gives $\Delta\mathrm{DIC} = 30\times106/16 = 199\ \mu\mathrm{mol\,L^{-1}}$ of carbon, so
$$
\frac{\Delta\mathrm{C}}{\Delta\mathrm{Fe}} = \frac{199\times10^{-6}}{3.0\times10^{-9}} = 6.6\times10^{4}\ \mathrm{mol\ C\ per\ mol\ Fe}.
$$
Over **$100\ \mathrm{m}$**: $0.199\ \mathrm{mol\,m^{-3}}\times100\ \mathrm{m} = 19.9\ \mathrm{mol\ C\,m^{-2}} = 239\ \mathrm{g\ C\,m^{-2}}$.

Sixty-six thousand carbon atoms per iron atom is the amplification that makes iron geochemically interesting: a trace metal at one part per $10^{11}$ controls a macronutrient cycle at one part per $10^{5}$. The same ratio is why the glacial dust record — Antarctic ice-core iron and thorium concentrations four to five times higher than holocene — and the opal and carbonate accumulation rates south of the ACC can be read as a carbon-cycle record.

The honest balance sheet, however, is the result of the six large enrichment experiments. SOIREE and SOFeX produced clear diatom blooms and clear nutrient drawdown; SEEDS in the subarctic Pacific produced a small community response; EisenEx, EIFES and LOHAFEX produced little or no measurable carbon export below $100\ \mathrm{m}$. The consensus is that iron fertilisation stimulates production reliably and export poorly, because the blooms are grazed and respired in the surface layer, and that the glacial CO₂ effect, while real, is insufficient to explain the $100\ \mu$atm deglacial rise on its own. This is also the reason commercial ocean iron fertilisation was banned under the London Convention in 2008 and why it remains the wrong answer to the wrong question.
:::
:::

::: widget plot
f: 100*exp(-0.86*ln(x/100))
x: 100, 5000
y: 0, 110
labels: F\ (\mathrm{g\ C\ m^{-2}\ yr^{-1}})
caption: The Martin curve — the attenuation of particulate organic carbon flux with depth for $b = 0.86$, normalised to $100\ \mathrm{g\ C\,m^{-2}\,yr^{-1}}$ at $100\ \mathrm{m}$. The shape is not a decay law with a rate; it is a power law, which means the effective decay rate falls with depth — the material that survives to $2000\ \mathrm{m}$ is progressively more refractory, smaller, and harder to eat, so the community of bacteria doing the respiring is carbon-limited rather than substrate-rich. Read the curve as a climate statement: at $b = 0.86$ the mesopelagic holds $\sim 10$ per cent of the export at $1000\ \mathrm{m}$, and a shift to $b = 0.6$ — the value observed under ballasted diatom blooms — doubles the flux at depth for the same surface production. Every model that projects the ocean's future carbon sink carries this one number as a tuning parameter, and the spread in its value across models is comparable to the entire projected change in the biological pump this century.
:::
::: history
Victor Hensen (Hensen) coined the word "plankton" in 1887 and made the first quantitative tows, and Sir Alister Hardy (Hardy) towed the first Continuous Plankton Recorder across the North Atlantic in 1931; the CPR survey still runs and is the longest continuous marine biological record in existence. Harald Ulrik Sverdrup (Sverdrup) reduced the spring bloom to one inequality between the mixed-layer depth and a critical depth in 1953, and Erik Steemann Nielsen (Nielsen) introduced the carbon-14 method for measuring primary production in 1952, which turned marine biology from counting into measuring. G. Arthur Dugdale and John Goering (Goering) separated new from regenerated production using nitrogen isotopes in 1967, John Ryther (Ryther) linked that separation to the size of the organisms and the fate of the carbon in 1969, and Trevor Platt (Platt) and Ken Denman formalised the photosynthesis–irradiance curve and its satellite scaling through the 1980s. Charles Yentsch (Yentsch) turned in-vivo chlorophyll fluorescence into a flowing oceanographic measurement, and Charles McClain (McClain) at NASA carried Coastal Zone Color Scanner, SeaWiFS, and then MODIS to orbit, so that since 1997 global surface chlorophyll has been a daily global map rather than a ship track. John Martin (Martin) proposed the iron hypothesis in 1988 from a single graph of Antarctic nutrient data; Kenneth Coale's IronEx in 1995, the SOIREE and SOFeX, SEEDS, EisenEx, EIFES and Victor Smetacek's LOHAFEX of 2009 tested it six times and established that iron stimulates production reliably and export unreliably. David Karl's Hawaii Ocean Time-series from 1988 and Anthony Michaels and Nicholas Bates' Bermuda time-series from 1984 produced the twenty-five-year biogeochemical records that first detected the ocean's chemical response to climate, and GEOTRACES, running since 2010, mapped the dissolved iron, zinc, cobalt and cadmium cycle of the whole ocean. Daniel Pauly and Reg Watson (Pauly) reconstructed the global marine catch from national reporting artefacts and showed the true state of world fisheries, and Daniel Boyce, Marlon Lewis and David Kirby (Boyce) claimed in 2010 a century-long global phytoplankton decline of one per cent per year — a result contested on calibration and sampling grounds and still argued, and the clearest illustration that a twenty-four-year satellite record is not yet a climate trend.
:::

::: warning Everything here is a mean of a quantity that varies by orders of magnitude on scales you cannot see
Seven cautions. Satellites see the top optical depth, not the ocean. Ocean-colour algorithms retrieve chlorophyll from blue-to-green radiance ratios within one attenuation depth — the top $10$–$30\ \mathrm{m}$ — and cannot see the deep chlorophyll maximum at $80$–$150\ \mathrm{m}$ that contains a third to a half of the gyres' phytoplankton, cannot see through coloured dissolved organic matter in coastal water, and cannot see at all at high latitudes in winter, which is where the annual production is decided. Chlorophyll is not carbon. Photoacclimation, species composition and light make the chlorophyll-to-carbon ratio vary by a factor of five to ten, so a fifty-per-cent change in chlorophyll may mean nothing at all about production. The f-ratio is a proxy with a known bias. Field intercomparisons give $f$ uncertainties of $\pm 0.15$ at mid-range, and the nitrate method systematically misses regenerated production that is exported and new production that is not. The Martin exponent is a fit to sediment traps, which are known to under-collect large fast-sinking particles and to be biased by swimmers, by the mooring's shadow and by the twenty-day deployment that misses a bloom's three-day export event. Mesoscale and submesoscale processes dominate the nutrient supply and are not resolved by the models that make the projections: eddy subduction, frontogenesis, mixed-layer instability and internal-wave breaking supply nitrate at rates comparable to vertical diffusion, and every one of them requires kilometre-scale resolution that only the last five model generations attempt. Ecosystem models are tuned, and their plankton functional types are not organisms: a model with four phytoplankton types and one zooplankton type reproduces the observed chlorophyll field by construction and has no obligation to reproduce its future. And the observed century trend is not established. The only global record is twenty-four years of ocean colour, its calibration has changed three times, its in situ validation data are biased toward the sunlit gyres, and the two headline claims — a global browning of one per cent per year and no significant global trend — come from the same group of data treated differently.
:::

## Where this leads

The light field and the mixed layer that set the critical depth are in [[oceanography/wind-driven]] and [[oceanography/air-sea-fluxes]], the nutrients supply is the overturning of [[oceanography/overturning]], the stoichiometry is [[oceanography/ocean-chemistry]] and [[biogeochemistry/production-decomposition]], the nitrogen cycle is [[biogeochemistry/nitrogen]], the phosphorus and silicon cycles are [[biogeochemistry/phosphorus-sulfur]], the carbon export is [[oceanography/ocean-chemistry]] and [[climate-system/carbon-climate]], the oxygen minimum zones are [[oceanography/seawater]] and [[climate-change/observed-change]], the satellite retrievals are [[remote-sensing/classification]] and [[remote-sensing/em-radiation]], the fisheries and ecosystem impacts are [[climate-change/impacts]], the glacial iron record is [[palaeoclimate/ocean-sediments]] and [[palaeoclimate/abrupt-change]], and the deep-time evolution of the pump is [[earth-system/carbon-cycle]] and [[biogeochemistry/principles]].

::: quiz
Why does the spring bloom begin in April rather than in March, when nutrients are highest and light is increasing?
- [ ] Because zooplankton grazing peaks in March.
- [x] Because the mixed layer must shoal through the critical depth, and in March it is still far deeper than the euphotic zone.
- [ ] Because water temperature must exceed a threshold.
- [ ] Because iron arrives with spring dust.
::: solution
Sverdrup's criterion is $Z_{\mathrm{mix}} < Z_{\mathrm{cr}}$. In March the mixed layer is $150$–$200\ \mathrm{m}$ and the euphotic zone $50\ \mathrm{m}$, so depth-averaged light cannot cover respiration. April stratification shallows the layer through the critical depth and the bloom starts within days, while nutrients are still plentiful.
:::
:::

::: summary
- Marine plants fix about 50 Pg C per year, as much as land plants, from cells that turn over in days.
- The bloom is a light-mixing competition: Sverdrup's critical depth, not nutrient concentration, sets its timing.
- Only new production — the fraction built from nitrate — can be exported; the f-ratio runs from 0.1 in the gyres to 0.5 in upwelling.
- The microbial loop and the viral shunt reprocess most fixed carbon; refractory dissolved organic matter is as large a reservoir as the atmosphere.
- Export follows the Martin power law; with the global exponent only about ten per cent of the 100-m flux reaches 1000 m and 1.4 per cent of production is buried.
- Iron limits a third of the ocean; six enrichment experiments showed that iron fertilisation stimulates production reliably and export poorly.
- Climate change shoals the mixed layer, which advances the bloom and reduces its export — a greener surface with a weaker pump.
:::

## Exercises

::: exercise The euphotic zone {level=1 check="115"}
Find the one-per-cent light depth where $K_d = 0.04\ \mathrm{m^{-1}}$.
::: solution
$Z_{1\%} = 4.6/0.04 = 115\ \mathrm{m}$. This is clear oligotrophic water, where the deep chlorophyll maximum sits at $100\ \mathrm{m}$ — below the winter mixed layer in some seasons and inside it in others, which is one reason subtropical bloom timing is less tidy than Sverdrup's theory predicts.
:::
:::

::: exercise A turbid coast {level=1 check="5"}
Find the one-per-cent light depth in an estuary with $K_d = 0.92\ \mathrm{m^{-1}}$.
::: solution
$Z_{1\%} = 4.6/0.92 = 5\ \mathrm{m}$. In five metres of euphotic zone the whole annual production must fit, which is why turbid coasts are light- rather than nutrient-limited, why they are dominated by benthic microalgae and seagrass where light reaches the bottom, and why turbidity from river discharge and dredging kills seagrass meadows without changing a single nutrient concentration.
:::
:::

::: exercise New production {level=1 check="57"}
A winter mixed layer **60 m** deep contains $12\ \mu\mathrm{mol\,L^{-1}}$ of nitrate. Find the annual new production.
::: solution
$0.012\times60 = 0.72\ \mathrm{mol\ N\,m^{-2}}$; $\times106/16 = 4.8\ \mathrm{mol\ C\,m^{-2}}$; $\times12 = 57\ \mathrm{g\ C\,m^{-2}\,yr^{-1}}$. This is a typical mesotrophic value, and the method's assumption — complete winter nutrient drawdown and no supply from below — makes it a lower bound in some regions and an upper bound in others, which is why time-series stations measure the whole annual cycle rather than trusting it.
:::
:::

::: exercise The flux at depth {level=2 check="50"}
With $F(100) = 200\ \mathrm{g\ C\,m^{-2}\,yr^{-1}}$ and $b = 0.86$, find $F(500\ \mathrm{m})$.
::: solution
$F = 200\times5^{-0.86} = 50\ \mathrm{g\ C\,m^{-2}\,yr^{-1}}$. A quarter of the flux survives four hundred metres — and the respired three quarters is exactly the oxygen demand and nutrient inventory of the upper mesopelagic, which is why the oxygen minimum zone depth and the nutrient maximum depth coincide with the steepest part of this curve.
:::
:::

::: exercise Inferring the exponent {level=2 check="0.52"}
A trap records $F(100) = 100$ and $F(1000) = 30\ \mathrm{g\ C\,m^{-2}\,yr^{-1}}$. Find $b$.
::: solution
$b = -\log_{10}(30/100) = 0.52$. This is a ballasted, efficiently exporting system — a diatom bloom or a carbonate-rich shelf — and the contrast with the global mean of $0.86$ means the same surface production delivers twice as much carbon to depth there as the global average would suggest. Regional differences in $b$, not in production, dominate the global sequestration.
:::
:::

::: exercise The iron amplification {level=2 check="79500"}
An enrichment adds $2.0\ \mathrm{nmol\,L^{-1}}$ of iron and draws nitrate down by $24\ \mu\mathrm{mol\,L^{-1}}$. Find the carbon-to-iron ratio.
::: solution
$\Delta\mathrm{C} = 24\times106/16 = 159\ \mu\mathrm{mol\,L^{-1}}$, and $159\times10^{-6}/2.0\times10^{-9} = 79{,}500\ \mathrm{mol\ C\ per\ mol\ Fe}$. Eighty thousand carbon atoms per iron atom — the catalytic amplification that makes a trace metal a climate variable, and the reason a two-nanomole contamination from a rope or a pump hose can ruin an iron experiment.
:::
:::

::: exercise The cost of a fish {level=3 check="115"}
A fishery lands **1 million tonnes** of fish at trophic level **$3.5$**. With a **fifteen-per-cent** trophic transfer efficiency, find the required primary production.
::: solution
$2.5$ transfers from the base: $10^{6}\times(1/0.15)^{2.5} = 10^{6}\times115 = 1.15\times10^{8}\ \mathrm{t}$ — one hundred and fifteen million tonnes of primary production for one million tonnes of fish. The global marine catch of $\sim 80\ \mathrm{Mt}$ at a mean trophic level of $\sim 3$ therefore requires several thousand teragramnes of production, a large fraction of the ocean's export, and the observed global mean trophic level of the catch has fallen by $\sim 0.5$ since 1950 — "fishing down the food web" — which is the same arithmetic read as a warning.
:::
:::

::: exercise The global mean {level=3 check="139"}
Global ocean net primary production is $50\ \mathrm{Pg\ C\,yr^{-1}}$. Find the area-mean rate.
::: solution
$50\times10^{15}/3.61\times10^{14} = 139\ \mathrm{g\ C\,m^{-2}\,yr^{-1}}$. The mean is meaningless: the subtropical gyres produce $50$–$100$, the upwelling zones $500$–$2000$, and the oligotrophic centres less than $50$, and the area-weighted distribution is log-normal. This is why the global carbon budget depends on the few per cent of the ocean that upwells, and why a satellite mission that cannot see coastal or ice-covered water misses most of the export while covering most of the area.
:::
:::
