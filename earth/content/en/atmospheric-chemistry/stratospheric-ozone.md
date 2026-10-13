In August 1984, **Joseph Farman**, a quiet British meteorologist at the British Antarctic Survey, opened the print-out from the Halley Bay spectrograph and found springtime ozone at a fifth below where it had been when his team started taking the column in 1957 — and then, because the numbers were that wrong, did the scientific thing: he checked the instrument, checked the calibration, checked the colleagues who had been trained on the same machine, and only then, after two more years of data confirming the collapse, published. The satellite teams whose instruments covered Halley Bay had **algorithmically discarded** their own low values as instrument error; the atmospheric chemistry community's models, run with known gas-phase chemistry, said the Antarctic was the last place an ozone hole would form. The paper — Farman, Gardiner and Pelnick, *Nature* 1985 — is the discipline's founding embarrassment and its greatest triumph: a hand-calibrated ground record, a 28-year series, and the refusal to believe bad news until it had been checked twice. The ozone hole it revealed is now the best-documented case of humanity detecting a planetary threat, attributing it in under a decade, and legislating it away — with a recovery so slow that the Antarctic ozone layer will return to 1980 values around the 2060s, long after the generation that acted has gone.

## Chapman's world — and why it was not enough

::: proposition The Chapman cycle and its shortfall {#prop-chapman}
**Sydney Chapman** (1930) gave the stratosphere its base chemistry: oxygen photolyses below 240 nm ($\mathrm{O_2} + h\nu \rightarrow 2\mathrm{O}$), the atom joins a third body ($\mathrm{O} + \mathrm{O_2} + M \rightarrow \mathrm{O_3} + M$), and ozone both absorbs the UV that kills ($\mathrm{O_3} + h\nu \rightarrow \mathrm{O} + \mathrm{O_2}$, the shield's working cycle) and is destroyed by two slow gas-phase reactions ($\mathrm{O_3} + h\nu \rightarrow \mathrm{O}(^1\mathrm{D}) + \mathrm{O_2}$ then $\mathrm{O}(^1\mathrm{D}) + \mathrm{O_3} \rightarrow 2\mathrm{O_2}$; and $\mathrm{O} + \mathrm{O_3} \rightarrow 2\mathrm{O_2}$). The mechanism explains the layer's **location** — production peaks near 35 km where flux and density multiply well, observed concentration peaks near 22 km where transport takes over — and its failure: Chapman's loss rates are too slow, and his steady state predicts roughly **twice** the observed column. The shortfall is the historical invitation to catalysis: something cycles through the stratosphere destroying ozone without being consumed, and **Paul Crutzen** (1970, from his work on rocket-launch plumes) named the first candidate — NOx from nitrous oxide, whose stratospheric oxidation yields NO and NO₂ that catalyse destruction ($\mathrm{NO} + \mathrm{O_3} \rightarrow \mathrm{NO_2} + \mathrm{O_2}$; $\mathrm{NO_2} + \mathrm{O} \rightarrow \mathrm{NO} + \mathrm{O_2}$) — while **Mario Molina and Sherwood Rowland** (1974) named the second, more terrible one: the photolysis of anthropogenic CFCs, reaching the stratosphere intact because nothing else in the atmosphere could break them, releasing chlorine that catalyses the same destruction with a **chain length of a hundred thousand ozone molecules per chlorine atom** before the reservoir species HCl and ClONO2 finally sequester it.
:::

::: example The layer's inventory {#ex-o3mass}
A global mean column of $300\ \mathrm{DU}$ over the Earth's surface ($5.1\times10^{18}\ \mathrm{cm^{2}}$): find the total mass of stratospheric-plus-tropospheric ozone, and the fraction of the atmospheric column it occupies if compressed at surface density (the Dobson "three millimetres").
::: solution
Moles per square centimetre $= 8.1\times10^{18}/6\times10^{23} = 1.35\times10^{-5}$, mass $= 1.35\times10^{-5}\times48 = 6.5\times10^{-4}\ \mathrm{g\,cm^{-2}}$; over the globe, $6.5\times10^{-4}\times5.1\times10^{18} = 3.3\times10^{15}\ \mathrm{g} = 3.3\ \mathrm{Tg}$ — three million tonnes of the most important trace gas in the sky, **half a gram per square metre** spread over the planet, and the entire industrial chlorine load of the 1990s (1.3 Tg yr⁻¹ of CFC-Cl) was a third of its mass **per year**. Scale is the wrong intuition in stratospheric chemistry; catalysis and chain length are the right ones.
:::
:::

## Catalysis and the reservoirs

::: definition The families and their efficiencies {#def-families}
Four catalytic families share the ozone budget. **NOx** (from $\mathrm{N_2O}$, whose stratospheric oxidation makes it the dominant ozone-depleting emission of the post-Montreal world — the quiet irony that the fertiliser age's molecule now leads the depletion the refrigerant age caused): most effective in the upper stratosphere and the mid-latitude lower stratosphere. **HOx** (from methane and water vapour): self-limiting, dominant in the upper stratosphere, and the reason methane's stratospheric water adds both ozone loss in the lower stratosphere and ozone gain in the upper. **ClOx** (CFCs, halons, methyl chloroform, methyl bromide): the family of the hole, with chain lengths limited not by chemistry but by the **reservoirs** — HCl and ClONO₂, formed when ClO meets methane's OH or NO₂ — which keep the gas-phase chlorine mostly idle **until the polar night reactivates it**. **BrOx** (halons, methyl bromide): forty times more efficient per atom than chlorine, tiny in mass, and the reason the Arctic's coastal **ozone depletion events** — boundary-layer ozone titrated to zero each spring by bromine exploded from sea salt by sunlight-activated chemistry — occur at all. The policy metric is **ozone depletion potential** (ODP): mass × halogen content × efficiency relative to CFC-11, which is why halons (ODP ~10) and methyl bromide (0.6) were scheduled out early despite small tonnages, and why hydrochlorofluorocarbons (ODP ~0.02–0.06) were acceptable **transitions** — their hydrogen lets tropospheric OH destroy most of the emission before the stratosphere sees it, the same transport filter that spares short-lived solvents.
:::

::: example Chain length {#ex-chain}
Global chlorine loading in the 1990s stratosphere destroyed ozone at a catalytic rate of $\sim 3\times10^{6}\ \mathrm{cm^{-3}\,s^{-1}}$ in the lower stratosphere while the inorganic chlorine reservoir held $\sim 1.5\times10^{9}\ \mathrm{cm^{-3}}$. Find the lifetime of a chlorine atom against sequestration into HCl/ClONO₂, and the number of ozone molecules destroyed per activation.
::: solution
The active chlorine inventory is $0.01\times1.5\times10^{9} = 1.5\times10^{7}\ \mathrm{cm^{-3}}$ (one per cent of inorganic chlorine is ClO at any moment), so each active atom destroys ozone at $3\times10^{6}/1.5\times10^{7} = 0.2\ \mathrm{s^{-1}}$ — a fifth of its reservoir per second, ten thousand molecules per day of activation. With chlorine cycling between active and reservoir forms through the 90-day sunlit season, the cumulative chain length reaches **hundreds of thousands of ozone molecules per chlorine atom** in the reservoir-poor Antarctic spring — the arithmetic that turns a ppt of CFC into a 60 per cent ozone loss over a continent. The exercise's arithmetic is the reason a ppt of CFC is not a ppt of pollutant: catalysis multiplies, and the polar machine multiplies the multiplier.
:::
:::

## The Antarctic machine

::: definition Vortex, PSCs, and the chlorine dimer cycle {#def-hole-machine}
The ozone hole is a **machine with four parts**, all Antarctic, all seasonal. **The polar vortex**: in the polar night, the planet's coldest air isolates over the pole inside a circumpolar wind ring that forms in March–April, deepens through winter, and breaks up in December — an isolation chamber that keeps air (and chemistry) in place for the whole spring. **Polar stratospheric clouds**: below $195\ \mathrm{K}$ — reached only over Antarctica (and the coldest Arctic winters) because the continent's altitude and night make it the atmosphere's cold trap — nitric acid trihydrate and ice particles provide **surfaces** on which the reservoirs are destroyed: $\mathrm{ClONO_2} + \mathrm{HCl} \rightarrow \mathrm{Cl_2}$, and, crucially, nitrogen is permanently removed from the lower stratosphere (**denoxification**, visible as nitric acid "denox" in balloon and satellite records), which starves the NOx that would otherwise lock chlorine away. **Sunlight**: in August, first light hits a vortex loaded with molecular chlorine, and the **chlorine dimer cycle** (ClO + ClO + M → Cl₂O₂; photolysis → 2Cl + O₂) runs with no NOx to interrupt it — ozone falls at 3 per cent **per day** through September. **Geography**: the hole's area tracks the vortex, reaching $20$–$30\times10^{6}\ \mathrm{km^{2}}$ (record $29.9$ in 2006) around 20 September, and its depth is measured not in column loss alone but in the **total mass lost** — up to 7 Mt of ozone in a bad year, against the layer's global 3.3 Tg inventory. The Arctic does the same chemistry at half strength — warmer, less isolated, denoxified only in cold winters (2011's record loss; the extraordinary 2020 spring when a persistent vortex ate 75 per cent of the lower-stratospheric ozone at mid-altitudes) — and the northern mid-latitudes, where the vortex is a rumour, lose ozone the slow way: through gas-phase chlorine and the trends of transport.
:::

::: example Reading a hole from orbit {#ex-holearea}
In a September when the TOMS-derived hole area is $26\times10^{6}\ \mathrm{km^{2}}$ and the mean column inside it is $140\ \mathrm{DU}$ against a normal $300$, find the ozone mass lost, and compare with the 1980s average loss of 4 Mt.
::: solution
The column deficit is $160\ \mathrm{DU} = 160\times2.69\times10^{16} = 4.3\times10^{18}$ molecules $\mathrm{cm^{-2}}$, i.e. $3.4\times10^{-4}\ \mathrm{g\,cm^{-2}}$; over $2.6\times10^{18}\ \mathrm{cm^{2}}$ that is $8.9\times10^{14}\ \mathrm{g} = 8.9\ \mathrm{Mt}$ — more than double the 1980s average, in a year when the vortex was cold and chlorine was still near its peak. The **mass-loss metric** (rather than area) is the one the recovery assessments track, because it weights the deep core of the hole where the chemistry actually happened — and its multi-year record is the cleanest observational test of the Montreal Protocol's real-world efficacy, currently passing: the 2020s mass losses run below the 2005 baseline trend, with the noise of vortex meteorology finally giving way to the signal of declining chlorine.
:::
:::

::: widget plot
f: 10+25*if(sin(pi*(x-8.5)/3.5),sin(pi*(x-8.5)/3.5),0)
x: 7, 12
y: 0, 40
labels: A\ (10^{6}\ \mathrm{km^{2}})
caption: The idealised annual life of the ozone hole — vortex formation in autumn, the August-September chlorine explosion, the December breakup. The area curve's **timing** is as diagnostic as its size: an early-September peak means an early vortex breakup (a warm year, a smaller chemical loss), and the year-to-year scatter of peak area at fixed chlorine loading is the meteorological noise against which the recovery signal — a slow decline of peak depth at ~0.5–1 per cent yr⁻¹ since the 2010s — must be extracted.
:::

## Montreal and the long recovery

::: definition The treaty system and its scoreboard {#def-montreal}
The science-to-policy arc — Rowland and Molina's hypothesis (1974), the US aerosol-propellant ban (1978) and the Nordic ban initiative, the Vienna Convention (1985), the **Montreal Protocol** (1987, timed within months of Farman's paper and built on the then-radical premise of controlled production and tradeable quotas), and its successive tightenings (London 1990 with the phase-out dates, Copenhagen 1992 with the accelerating schedule, the Multilateral Fund paying for Article-5 country compliance) — is the only environmental treaty with near-universal ratification and a **measured success**: total effective halogen loading (EESC) peaked in the mid-1990s and has fallen ~15 per cent since, the ozone trend over the extratropical Northern Hemisphere has been **flat since 2000** after two decades of losses, and the recovery projections (WMO/UNEP 2018) put the Antarctic return to 1980 values near **2066**, the Arctic 2045, global mid-latitudes 2040 — dates set by the 50–100-year lifetimes of the gases already emitted, not by any continuing emission. Three footnotes keep the story honest. The Protocol was accidentally a **climate treaty**: CFCs are colossal greenhouse gases (CFC-12, GWP 10 200), and its phase-outs plus the **Kigali Amendment** (2016, HFCs, the substitutes' substitutes, GWP hundreds to thousands) avoid on the order of $0.5\ ^\circ\mathrm{C}$ of warming by 2100 — the largest single climate action ever legislated. It has **leaks**: the 2018 detection of a CFC-11 emissions anomaly traced to unreported production in eastern China — found by the atmospheric record, not the reporting system — proved the monitoring architecture is the treaty's real enforcement. And its successor problem is **nitrous oxide**: with CFCs declining, N₂O (unregulated by Montreal, driven by fertiliser and wastewater) is now the largest human-caused ozone-depleting emission, and its 120-year lifetime means the stratosphere's chlorine-free future will still be an NOx-limited one.
:::

::: example The recovery clock {#ex-recovery}
Effective equivalent stratospheric chlorine peaked at $1.6\times$ the 1980 loading in 1997 and declines at an e-folding of 80 years. Find the year when it returns to 1980 levels, and explain why the projected ozone recovery date (2066 for Antarctica) is **earlier** than the date when chlorine fully returns.
::: solution
$1.6 = e^{t/80}$ gives $t = 80\ln1.6 = 37$ years — chlorine back at 1980 levels around **2034**. Ozone recovers **before** chlorine fully does because the relationship saturates: catalytic loss responds to chlorine roughly logarithmically at high loading (the reservoirs take up the excess), so the first decades of chlorine decline buy more ozone than the last — and because the recovering ozone is climbing against a background of cooling stratosphere (greenhouse-induced, which **speeds** the recovery in the mid-latitudes but deepens polar PSC chemistry) and changing circulation. The 2066 date is thus a balance of a declining poison, a cooling that helps and hurts by altitude, and a vortex that does not read the treaty — the honest statement is that the hole's recovery is **on track but not guaranteed**, and every warm-spring year that shrinks the hole is meteorology, not policy, while every cold one is not a failure.
:::
:::

::: warning The hole is not closed, correlation is not the Montreal Protocol, and "ozone is a greenhouse gas" cuts both ways
Five errors. **"The ozone hole is fixed"**: the hole still forms every year at near-record area in cold springs (2020's Arctic loss, 2023's record-long Antarctic vortex); what is fixed is the **chlorine trajectory**, and the hole's year-to-year meteorological noise will swamp the recovery signal until the 2040s. **"Ozone recovery proves CO₂ did nothing"**: the Montreal success is the **opposite** argument — it is the one case where emissions were measured, attributed, modelled, legislated and verified; the stratosphere's cooling, without which recovery would be slower still, is itself the greenhouse fingerprint. **"CFCs are gone"**: production is gone; the atmospheric burden declines on 50–100-year clocks, illegal production happens (CFC-11, 2013–17), and the legacy banks in old foam and equipment will leak for decades — the atmosphere's memory is longer than the treaty's. **"Ozone is a greenhouse gas, so the hole cooled the planet"**: stratospheric ozone depletion **cooled** the surface slightly (a few tenths of a watt) — meaning the Montreal Protocol's ozone rescue removed a small masking shade and **added** to measured warming; the same logic applies to the aerosol mask, and it is why "less pollution = more warming" is occasionally, locally true. **And UV-B effects are not all bad news**: cataract incidence tracks UV-B forecasts (the WHO burden estimates attribute hundreds of thousands of cases per year to the depletion decades), but the oft-repeated "phytoplankton collapse from UV" claim has not survived the better data — marine productivity shows no detectable hole-driven decline, a rare instance of the optimistic correction.
:::

::: history
**Sydney Chapman** derived the photochemical ozone cycle (1930) and spent the following decade arguing — wrongly — that it could not be disturbed; **G. M. B. Dobson**'s spectrophotometer network (1920s–) made the column a daily global number and his Umkehr method the first ozone-profile retrieval. **Paul Crutzen** linked nitrous oxide to stratospheric NOx catalysis (1970), **Samuel Johnston** (1971) raised the NOx scare about supersonic transports — wrong in magnitude, right in mechanism, and fatal to the SST fleet — and **Mario Molina and Sherwood Rowland** proposed CFC chlorine catalysis (1974). **Farman, Gardiner and Pelnick** published the hole (1985) after two years of checking their own instrument; **Susan Solomon** (1986) proposed the polar-cloud mechanism and, with Garcia, Rowland and Wuebbles, the chlorine-dimer cycle; **James Anderson**'s balloon-borne ClO measurements (1986) and the NASA GTE Airborne Antarctic Ozone Experiment (1987–88, led by **Michael McElroy**) closed the mechanism in under three years — the fastest hypothesis-to-proof arc in atmospheric science. The **TOMS** satellite map (1978–) made the hole a picture, and the **WMO/UNEP Scientific Assessment** (four-yearly since 1989) became the treaty's standing referee, the institution that turns Farman's hand-measured column into a recovery date.
:::


The photochemistry behind the cycles is in [[atmospheric-chemistry/photochemistry]], the transport that delivers source gases to the stratospheric pipe is in [[atmospheric-chemistry/transport]], N₂O's cycle is in [[biogeochemistry/nitrogen]], the halon and substitute chemistry is in [[atmospheric-chemistry/trace-gases]], the polar vortex dynamics in [[atmospheric-dynamics/general-circulation]], the UV-B health burden in [[atmospheric-chemistry/air-quality]], the stratospheric cooling and climate links in [[climate-system/energy-budget]] and [[climate-change/observed-change]], and the Dobson record in [[atmospheric-chemistry/trace-gases]].

::: quiz
Chapman's pure-oxygen photochemistry predicts too **much** ozone because:
- [ ] it ignores ozone production by NOx.
- [x] its gas-phase loss reactions are too slow; catalytic cycles (NOx, ClOx, HOx) add the missing destruction.
- [ ] transport removes ozone.
- [ ] it overestimates UV flux.
::: solution
Chapman's chemistry balances production with loss that is far too slow, overpredicting the column roughly twofold. The shortfall was the invitation to catalysis — Crutzen's NOx, Molina and Rowland's ClOx — and the catalytic families, not the oxygen cycle alone, set the layer's size. (Transport matters too, but the chemical shortfall was the historical puzzle.)
:::
:::

::: summary
- Chapman (1930) explains where ozone is; its twofold overprediction exposes catalytic loss — NOx from N₂O, HOx, and the anthropogenic ClOx/BrOx with chain lengths of 10²–10⁵ ozone per halogen atom.
- The hole is a machine: polar vortex (isolation), polar stratospheric clouds below 195 K (reservoir destruction and denoxification), sunlight (chlorine dimer cycle, 3 per cent of the column per day), geography (20–30 million km² each September).
- The Arctic runs the same chemistry at half strength; mid-latitudes lose ozone slowly through gas-phase chlorine and transport trends.
- Montreal (1987) plus its amendments is the one verified success: halogen loading peaked mid-1990s, trends flat since 2000, recovery projected 2040s (Arctic/mid-latitudes) to 2066 (Antarctica).
- The Protocol is also the largest legislated climate action (CFCs and, via Kigali, HFCs are super-GHGs) — and its leaks (CFC-11, 2013–17) show atmospheric monitoring is the enforcement.
- The successor threat is nitrous oxide: unregulated by Montreal, fertiliser-driven, and now the dominant human ozone-depleting emission.
:::

## Exercises

::: exercise Ozone mass {level=1 check="3.3"}
Find the global mass of ozone for a 300 DU column, in Tg (surface $5.1\times10^{18}\ \mathrm{cm^{2}}$, $M_{\mathrm{O_3}} = 48\ \mathrm{g\,mol^{-1}}$), to one decimal. (Enter the number.)
::: solution
$3.3\ \mathrm{Tg}$ — three million tonnes, half a gram per square metre, and the entire protective capital of the stratosphere, against which the 1990s emitted 1.3 Tg yr⁻¹ of chlorine source gas. The mass ratio is the whole argument for why "trace" is not "harmless".
:::
:::

::: exercise Dobson thickness {level=1 check="3"}
Find the thickness (mm) of the ozone column at surface density ($2.7\times10^{19}\ \mathrm{molecules\,cm^{-3}}$) for 300 DU, to the nearest mm.
::: solution
$8.1\times10^{18}/2.7\times10^{19} = 0.3\ \mathrm{cm} = 3\ \mathrm{mm}$. Three millimetres against biologically lethal ultraviolet — and the hole removes two-thirds of the thickness over a continent each spring, which is the same fact Dobson's unit was invented to make quotable.
:::
:::

::: exercise Hole mass loss {level=1 check="8.9"}
A September hole of $26\times10^{6}\ \mathrm{km^{2}}$ with a 160 DU column deficit: find the ozone mass lost, in Mt, to one decimal. (Enter the number.)
::: solution
$4.3\times10^{18}\times48/6\times10^{23} = 3.4\times10^{-4}\ \mathrm{g\,cm^{-2}}$ over $2.6\times10^{18}\ \mathrm{cm^{2}} = 8.9\times10^{14}\ \mathrm{g} = 8.9\ \mathrm{Mt}$ — nearly 3 per cent of the global column, vanished and re-made each year by a machine the size of the Americas.
:::
:::

::: exercise ODP arithmetic {level=2 check="14"}
Halon-1301 (CBrF³) is 54 per cent bromine by mass; CFC-11 (CCl³F) is 77 per cent chlorine by mass; bromine atoms are ~45 times more efficient than chlorine per atom. Estimate the ODP of halon-1301 to the nearest integer (atomic masses: Br 80, Cl 35.5). (Enter the number.)
::: solution
Halogen atoms per gram ratio: $(0.54/80)/(0.77/35.5) = 0.00675/0.0217 = 0.31$; with bromine's 45-fold efficiency, $\mathrm{ODP} = 0.31\times45 = 14$ — close to the published ~12 (the true efficiency ratio is stratosphere-weighted), and the arithmetic explains why **tonnes of halon were legislated out before kilotonnes of CFC**: bromine's per-atom leverage is enormous, and ODP is its policy translation.
:::
:::

::: exercise PSC threshold {level=2 check="50"}
In a warm vortex year the fraction of polar-stratospheric air below the PSC formation threshold (195 K) falls from 30 to 15 per cent. Find the percentage loss of PSC-processed air. (Enter the number.)
::: solution
Exposure halves: the 30→15 per cent drop is a **50 per cent** loss of PSC-processed air — and observed chlorine activation tracks this steeply, which is why a 1–2 K change in vortex temperature (the noise of the QBO and sudden warmings) moves the hole's size by millions of square kilometres, and why the greenhouse cooling of the polar stratosphere (a few K per decade) is the one trend that could **delay** the hole's recovery even as chlorine falls.
:::
:::

::: exercise Chlorine clock {level=2 check="37"}
Effective chlorine peaked at 1.6× the 1980 level in 1997 and declines with an 80-year e-folding. Find the years to return to 1980 levels, to the nearest year. (Enter the number.)
::: solution
$t = 80\ln 1.6 = 37$ years — the 2030s, decades before the ozone itself recovers (2066), because catalytic loss saturates at high loading. The clock is the Montreal Protocol's most important number: it converts a treaty signed in 1987 into a date the atmosphere will keep whether or not we remember it.
:::
:::

::: exercise Chain length {level=3 check="1000"}
During Antarctic spring activation, ClO reaches 1.5 pptv while total inorganic chlorine is 1.5 ppbv. Express the active fraction of chlorine as one part in $N$ (enter $N$).
::: solution
$1.5/1500 = 10^{-3}$ — one part in $N = 1000$. Though only a thousandth of the chlorine is active at any instant, each active atom destroys ozone thousands of times per day of activation and re-enters the active pool many times over the 90-day season — the cumulative chain length of the classic "hundred thousand ozone molecules per chlorine atom" is this active fraction multiplied by the cycling rate and the spring window.
:::
:::

::: exercise The avoided treaty {level=3 check="0.2"}
Without the Montreal Protocol, uncontrolled CFC and HFC emissions would have reached roughly $250\ \mathrm{GtCO_2e\,yr^{-1}}$ by 2100. If the Protocol (with Kigali) avoids about $0.5\ ^\circ\mathrm{C}$ of warming by then, find the avoided warming per $100\ \mathrm{GtCO_2e\,yr^{-1}}$ avoided, in $^\circ\mathrm{C}$ to two decimals. (Enter the number.)
::: solution
$0.5/250\times100 = 0.2\ ^\circ\mathrm{C}$ per $100\ \mathrm{GtCO_2e\,yr^{-1}}$ — the same order as the CO₂ system's own sensitivity-to-emissions ratio, which is the deep point: the Montreal Protocol and Kigali are worth **hundreds of GtCO₂e**, and the ozone treaties are, quantitatively, the most effective climate policy in history — a fact worth teaching precisely because the ozone story is also the one case where the atmosphere **confirmed the fix worked**, giving the CO₂ effort its existence proof and its template.
:::
:::
