Two operations define quantitative chemistry: putting something on a balance, and getting a known volume of something else into the flask. Every yield, every concentration, every equilibrium constant measured in a teaching laboratory, every formula obtained by analysis, is finally built from masses read off a balance and volumes delivered by glassware — and the arithmetic of [[laboratory-methods/measurement-uncertainty]] sets an unforgiving standard for both. A result good to $0.1\ \%$ cannot be assembled from steps that are individually worse than $0.1\ \%$, because relative uncertainties combine in quadrature and the worst step dominates the answer. A $25\ \mathrm{cm^3}$ pipette delivers at $0.12\ \%$, an analytical balance weighs a gram at $0.02\ \%$, and a concentration built from the two is limited, in the end, not by your care at the balance but by the glass in your hand. **Technique is what protects the number.** Every habit in this chapter — the rinse, the meniscus at eye level, the closed draught shield, the second hour in the drying oven — exists to shut down one specific way a measurement goes systematically wrong.

The previous chapter treated a measurement as an interval and built the rules for combining intervals. This chapter is about the acts themselves. It moves from the instrument that does the weighing, through the glassware that delivers volume, to the two operations that combine them: preparing a solution of exactly known concentration (a **standard solution**) and making it react quantitatively with another (a **titration**). It closes with the gravimetric idea in its purest form — drying something until its mass stops changing — because a mass that is still changing is not a measurement at all.

## The analytical balance

::: definition The analytical balance {#def-balance}
An **analytical balance** is a balance with a readability of $0.0001\ \mathrm{g}$ ($0.1\ \mathrm{mg}$) or better. **Readability** — the smallest increment the display shows — is not the same thing as uncertainty: repeatability, linearity and calibration together give the uncertainty of a single reading as typically $\pm 0.0002\ \mathrm{g}$, and a weighing by difference uses two readings, so the mass delivered into your vessel carries $u(m) \approx 0.0002\ \mathrm{g}$, exactly as the quadrature argument of [[laboratory-methods/measurement-uncertainty]] showed. An analytical balance is used levelled (spirit-level bubble centred), warmed up (at least $30\ \mathrm{min}$ for the electronics to stabilise; many laboratory balances stay switched on permanently for this reason), behind a closed **draught shield**, with the sample in a container — never powder or liquid straight onto the pan.
:::

Why insist that a balance displaying four decimal places is uncertain by $\pm 0.0002\ \mathrm{g}$? Because the last digit of the display is the noisiest digit: it flickers with air currents, temperature drift, electrostatic charge and the position of the load on the pan. The repeatability of a good balance — the standard deviation of repeated weighings of the same object — is typically $0.1$–$0.2\ \mathrm{mg}$, and calibration uncertainty adds to it in quadrature. The honest statement about a single reading is therefore $\pm 0.0002\ \mathrm{g}$, and the relative uncertainty of a weighing is that number divided by the mass: $0.02\ \%$ of $1\ \mathrm{g}$, $0.2\ \%$ of $0.1\ \mathrm{g}$, $2\ \%$ of $0.01\ \mathrm{g}$. This is why analytical procedures ask for gram-scale weighings wherever the chemistry allows, and why "weigh out about $1\ \mathrm{g}$, accurately" is better advice than "weigh out $0.0100\ \mathrm{g}$".

There are two ways to get a known mass into a flask. **Weighing by difference** is the analytical default: the sample sits in a stoppered weighing bottle, which is weighed; some of the sample is tipped into the receiving vessel while the bottle is off the balance; the bottle is weighed again, and the mass lost is the mass delivered. Nothing has to be transferred quantitatively — the balance has already recorded exactly how much left the bottle — and the same bottle can serve out several aliquots in a row, each known as well as the first. Direct weighing (tare the vessel, add sample, close the shield, read) is fine for a solid you will not keep on the balance long, but it forces you to hit a target mass and to rinse off the spatula every last grain you can see.

Two prohibitions are absolute. Never weigh a hot or warm object: it sets convection currents across the pan that make the reading drift and read low, and sustained heat damages the weighing mechanism; a crucible comes out of the oven into a desiccator, not onto the balance, and reaches the balance only at bench temperature. And never add reagent from a spatula over an open pan: a spill down the mechanism of a five-figure balance is a repair bill and a contaminated instrument for everyone who uses it next; add sample with the spatula angled into the vessel, doors open, pan otherwise empty.

::: warning The last displayed digit is a claim, not a fact {#warn-balance}
A balance that displays $0.5106\ \mathrm{g}$ is not claiming to know the mass to the fourth decimal place; it is displaying four decimal places, which is a different thing. Record what you can defend — the mass to $\pm 0.0002\ \mathrm{g}$ — and let the uncertainty, not the display, fix the last significant figure, as [[laboratory-methods/measurement-uncertainty]] insists. Two failure modes make the warning concrete. **Static charge**: sliding a plastic weighing boat across the pan, or pouring an insulating powder, leaves a charge whose force on the pan makes the apparent mass drift by milligrams, non-reproducibly, sometimes for minutes; discharge the vessel (a grounded metal spatula, an antistatic gun), prefer glass or metal boats for powders, and treat a reading that will not settle as dirty glassware, not as a slow balance. **Hygroscopic samples** gain mass while you weigh them: a display that climbs steadily is not malfunctioning, it is a sample drinking water from the air — weigh quickly, in a stoppered vessel, and choose a different standard.
:::

## Volumetric glassware

::: definition To contain and to deliver {#def-tc-td}
Volumetric glassware is calibrated at $20\ ^\circ\mathrm{C}$ in one of two ways. A piece marked **TC** (*to contain*) — every volumetric flask — is calibrated to hold exactly its nominal volume; the film of liquid that drains down its inner wall when you empty it is part of the calibration, which is why a TC flask is never used to deliver a measured volume. A piece marked **TD** (*to deliver*) — pipettes and burettes — is calibrated to give out its nominal volume, with that wall film and the residue in the tip already subtracted by the manufacturer. A **drain pipette** is allowed to drain by gravity with its tip touching the wall of the receiving vessel, and is then waited (about $10\ \mathrm{s}$); the liquid remaining in the tip must never be blown out, because it is precisely the residue the calibration already discounted. A **blow-out pipette**, identified by one or two frosted rings near its top, is calibrated on the understanding that the tip residue *is* blown out. Mixing the two conventions costs a few hundredths of a cubic centimetre per delivery — $0.1\ \%$ or more of a small pipette, delivered as a systematic error into every one of your results.
:::

Water wets clean glass, so the surface of water in a burette or pipette is a concave **meniscus**: read the bottom of the meniscus with your eye in the plane of it. An eye out of that plane introduces parallax, because the graduation line and the meniscus sit at different depths in the glass and the level you see then depends on the height you look from. This is why the rule for a burette is *read the initial and final readings at the same eye level*: if the eye sits in the same wrong place twice, the same parallax error rides in both readings and cancels from the titre. A dark card held just below the meniscus sharpens it enormously; use one.

Cleaning is not housekeeping, it is calibration. Water should drain from clean glass as a continuous film, not as separate drops; drops clinging to the wall mean grease, and grease means the calibrated volume is a lie. Wash with detergent, rinse with tap water and then with deionised water, and accept the piece only when it drains as a film. A clean, wet pipette, however, is a pipette full of distilled water: fill it straight from the stock bottle and you deliver your solution diluted by the water film on the wall. The remedy costs ten seconds — rinse two or three times with small portions of *the solution the pipette is about to deliver*, drained to waste, so that the film left behind is that solution itself. Never rinse with water alone and then fill.

A measuring cylinder is a $1$–$2\ \%$ instrument, and the graduations on beakers and conical flasks are decoration. Use them to measure a solvent for a wash or a rough volume of water for a cooling bath; never use them to make a standard solution. And remember what the $20\ ^\circ\mathrm{C}$ on the glass means: water expands about $0.021\ \%$ per $1\ ^\circ\mathrm{C}$, so a solution made to the mark while still warm contracts below it as it cools, and the concentration comes out high by roughly $0.02\ \%$ for every degree of the error. Five degrees is $0.1\ \%$ — the entire error budget of a good titration, spent on impatience.

Class A tolerances (e.g. Harris, *Quantitative Chemical Analysis*) for the pieces you will actually use:

| Piece | Nominal volume | Class A tolerance |
|---|---|---|
| Transfer pipette (TD) | $25.00\ \mathrm{cm^3}$ | $\pm 0.03\ \mathrm{cm^3}$ |
| Volumetric flask (TC) | $250.0\ \mathrm{cm^3}$ | $\pm 0.12\ \mathrm{cm^3}$ |
| Burette, full delivery (TD) | $50\ \mathrm{cm^3}$ | $\pm 0.05\ \mathrm{cm^3}$ |

The analytical balance contributes $\pm 0.0002\ \mathrm{g}$ per reading. Class B glassware is about twice as loose, and teaching-laboratory glassware is often neither. Remember from [[laboratory-methods/measurement-uncertainty]] that a tolerance is a limit, not a standard deviation, and that relative cost runs as $1/V$: the $25\ \mathrm{cm^3}$ pipette's $\pm 0.03\ \mathrm{cm^3}$ is $0.12\ \%$, the flask's $\pm 0.12\ \mathrm{cm^3}$ is only $0.048\ \%$, and the burette's $\pm 0.05\ \mathrm{cm^3}$ is $0.1\ \%$ of a full $50\ \mathrm{cm^3}$ but $1\ \%$ of a $5\ \mathrm{cm^3}$ delivery.

::: quiz
Before you fill a volumetric pipette with a standard solution, what should you rinse the inside of the pipette with?
- [x] A small portion of the very solution the pipette is about to deliver, drained to waste.
- [ ] Distilled water, drained as well as possible — the pipette must above all be clean.
- [ ] A small portion of the solution the aliquot is about to be delivered into.
- [ ] Nothing: a properly washed pipette needs no rinsing.
::: solution
The solution to be delivered. Cleanliness is a precondition, not the whole story: a pipette washed and drained is lined with a film of distilled water, and filling it straight from the stock bottle delivers a solution diluted by that film — a small, negative systematic error in every aliquot. Swirling two or three small portions of the solution itself through the pipette and discarding them to waste replaces the water film with the real thing. Rinsing with the receiving solution would change the pipette's contents by mixing, and water alone leaves the dilution in place. The same rule governs the burette (rinse with the titrant) and, for the opposite reason, the conical flask beneath it: the flask is *not* rinsed with the aliquot, because the amount of solute in the flask — not its volume — is what the titration measures, and a rinse there would add solute that the burette then has to pay for.
:::
:::

## Standard solutions

A **standard solution** is a solution of exactly known concentration; the arithmetic of concentrations themselves is in [[general-chemistry-1/solutions-reactions]]. Some can be made by weighing: dissolve a known mass of a pure substance and dilute to a known volume. That route is open only to a special class of reagents.

::: definition Primary standard {#def-primary-standard}
A **primary standard** is a reagent obtainable in a form of known, unchanging composition from which a standard solution of exactly known concentration can be prepared by weighing alone. Four requirements: **high purity** ($99.9\ \%$ or better, and assayable); **stability in air** — not hygroscopic, unreactive with water, carbon dioxide and oxygen, and decomposing only at a temperature above its drying temperature; **well-defined composition** — the formula must be the truth, including the hydration state, and drying must remove water predictably rather than partly; and a **reasonably high molar mass**, so that the mass you weigh for a given amount of substance is large and the relative weighing error small. Potassium hydrogenphthalate $\mathrm{KHC_8H_4O_4}$ ($M = 204.22\ \mathrm{g\,mol^{-1}}$, dried at $110\ ^\circ\mathrm{C}$) and anhydrous sodium carbonate $\mathrm{Na_2CO_3}$ ($M = 105.99\ \mathrm{g\,mol^{-1}}$, dried at $270\ ^\circ\mathrm{C}$) satisfy all four. Sodium hydroxide fails the second requirement — it absorbs water and carbon dioxide while you watch it on the pan — and hydrochloric acid fails the third: concentrated acid is about $37\ \%$ by mass and the hydrogen chloride escapes from it. Solutions of the two failures are made approximately and then **standardised** against a primary standard.
:::

The molar-mass requirement is the relative-uncertainty argument of [[#def-balance]] in reverse: $0.0250\ \mathrm{mol}$ of potassium hydrogenphthalate is $5.1\ \mathrm{g}$, weighed to a relative uncertainty of $0.006\ \%$, while the same amount of a hypothetical substance of molar mass $42\ \mathrm{g\,mol^{-1}}$ would be $1.1\ \mathrm{g}$ at three times the relative error. A heavy molecule is a cheap source of accuracy.

::: proposition Dilution {#prop-dilution}
Delivering a volume $V_1$ of a solution of concentration $c_1$ into a flask and making up to a final volume $V_2$ gives a solution of concentration
$$
c_2 = \frac{c_1 V_1}{V_2}
\qquad\text{equivalently}\qquad
c_1 V_1 = c_2 V_2 .
$$
The condition is that the amount of solute is conserved during the dilution: it reacts with nothing, nothing is lost in the transfer, and the final volume is read from the flask's own mark rather than computed from a volume of water added.
:::

::: proof Dilution conserves amount of substance, not volume {#proof-dilution}
The amount of substance in a volume $V$ of a solution of concentration $c$ is $n = cV$ ([[general-chemistry-1/stoichiometry]]). The aliquot drawn from the stock contains $n_1 = c_1 V_1$. Dilution adds solvent; it adds no solute and, under the proposition's condition, destroys none — so the flask's contents still contain $n_1$ of solute, now spread through the volume $V_2$:
$$
c_2 = \frac{n_1}{V_2} = \frac{c_1 V_1}{V_2},
$$
and multiplying through by $V_2$ gives $c_1 V_1 = c_2 V_2$. Note what the proof does *not* say: it does not say $V_2 = V_1 + V_\text{water}$. Volumes of mixing are not additive — ethanol and water contract together, and even dilute salt solutions have their own partial molar volumes — which is exactly why the recipe is "make up to the mark" and never "add $V_2 - V_1$ of water". The uncertainty follows the product rule of [[laboratory-methods/measurement-uncertainty]]:
$$
\left(\frac{u_{c_2}}{c_2}\right)^2 = \left(\frac{u_{c_1}}{c_1}\right)^2 + \left(\frac{u_{V_1}}{V_1}\right)^2 + \left(\frac{u_{V_2}}{V_2}\right)^2 ,
$$
where $u_{c_1}$ is the uncertainty of the stock: a dilution inherits error, and adds only its own glassware's share.
:::

::: algorithm From a solid primary standard to a standard solution {#alg-standard}
To prepare $250.0\ \mathrm{cm^3}$ of a standard solution of concentration $c$ from a dried primary standard of molar mass $M$:
1. Calculate the target mass $m = cVM$; weigh the dried standard by difference to $\pm 0.0002\ \mathrm{g}$ and record the actual mass — the concentration will be computed from what you weighed, not from what you aimed at.
2. Dissolve the solid in a beaker with $100$–$150\ \mathrm{cm^3}$ of deionised water, swirling until every crystal has gone. Warm gently if dissolution is slow, but cool the solution to bench temperature before continuing.
3. Transfer quantitatively: pour down a stirring rod into a $250.0\ \mathrm{cm^3}$ volumetric flask, then rinse the beaker, the rod and the funnel into the flask three or four times. The rinsings are part of the preparation, not waste.
4. Add water to about $1\ \mathrm{cm^3}$ below the mark, then the last few drops from a dropper, until the bottom of the meniscus sits on the mark with your eye in its plane and the solution at $20\ ^\circ\mathrm{C}$.
5. Stopper and invert twenty times, finger on the stopper, letting the liquid run the full length of the flask; shaking is not mixing.
6. Label the flask: identity, concentration to justified figures, date, your name, and the uncertainty if the laboratory asks for one. An unlabelled standard solution is waste glass.
:::

::: example Weighing a KHP standard {#ex-khp-mass}
What mass of potassium hydrogenphthalate, dried at $110\ ^\circ\mathrm{C}$, must you weigh to prepare $250.0\ \mathrm{cm^3}$ of $0.1000\ \mathrm{mol\,dm^{-3}}$?
::: solution
The amount needed is
$$
n = cV = 0.1000\ \mathrm{mol\,dm^{-3}} \times 0.2500\ \mathrm{dm^3} = 0.02500\ \mathrm{mol},
$$
and the mass is
$$
m = nM = 0.02500\ \mathrm{mol} \times 204.22\ \mathrm{g\,mol^{-1}} = 5.1055\ \mathrm{g}.
$$
Weigh about $5.106\ \mathrm{g}$ by difference — suppose the balance gives $5.1062\ \mathrm{g}$ — and compute the standard's concentration from the mass you actually have:
$$
c = \frac{5.1062\ \mathrm{g}}{204.22\ \mathrm{g\,mol^{-1}} \times 0.2500\ \mathrm{dm^3}} = 0.10001\ \mathrm{mol\,dm^{-3}}.
$$
Read the budget before moving on: weighing $5.106\ \mathrm{g}$ to $\pm 0.0003\ \mathrm{g}$ costs $0.006\ \%$, while the flask's Class A tolerance costs $0.12/250.0 = 0.048\ \%$. The flask dominates by nearly an order of magnitude, and the standard stands at about $0.05\ \%$ — which is why a gram-scale primary standard is the best-behaved number in most titration laboratories.
:::
:::

::: example Dilution from a stock {#ex-dilution-stock}
You need $250.0\ \mathrm{cm^3}$ of $0.008000\ \mathrm{mol\,dm^{-3}}$ potassium hydrogenphthalate, and the only thing available is the $0.10001\ \mathrm{mol\,dm^{-3}}$ standard of [[#ex-khp-mass]]. What do you do, and how good is the result?
::: solution
Rearrange $c_1 V_1 = c_2 V_2$ ([[#prop-dilution]]):
$$
V_1 = \frac{c_2 V_2}{c_1} = \frac{0.008000\ \mathrm{mol\,dm^{-3}} \times 250.0\ \mathrm{cm^3}}{0.10001\ \mathrm{mol\,dm^{-3}}} = 19.998\ \mathrm{cm^3} \approx 20.00\ \mathrm{cm^3}.
$$
Pipette $20.00\ \mathrm{cm^3}$ of the stock into a $250.0\ \mathrm{cm^3}$ flask and make to the mark; the concentration is $c = 0.10001 \times 20.00/250.0 = 0.008001\ \mathrm{mol\,dm^{-3}}$. The budget is instructive: the pipette now delivers less than its nominal volume, and $0.03/20.00 = 0.15\ \%$ is more than it paid at $25\ \mathrm{cm^3}$; combined in quadrature with the flask's $0.048\ \%$ the diluted standard stands at $0.16\ \%$ — three times worse than the stock it came from. Dilution is cheap in concentration but never free in uncertainty.
:::
:::

::: example Serial dilution, and how uncertainty compounds {#ex-serial-dilution}
A laboratory needs a very dilute standard: $25.00\ \mathrm{cm^3}$ of $0.1000\ \mathrm{mol\,dm^{-3}}$ stock is made up to $250.0\ \mathrm{cm^3}$ (solution A), and $25.00\ \mathrm{cm^3}$ of A is made up to $250.0\ \mathrm{cm^3}$ (solution B). What is the concentration of B, and what is its relative uncertainty if the stock's own uncertainty is ignored?
::: solution
Each step multiplies the concentration by $25.00/250.0 = 1/10$, so
$$
c_\mathrm{B} = 0.1000 \times \frac{25.00}{250.0} \times \frac{25.00}{250.0} = 0.001000\ \mathrm{mol\,dm^{-3}}.
$$
Each step carries the same two glassware terms, and the two steps are independent, so their variances add:
$$
\frac{u_{c_\mathrm{B}}}{c_\mathrm{B}} = \sqrt{2\left[\left(\frac{0.03}{25.00}\right)^2 + \left(\frac{0.12}{250.0}\right)^2\right]} = \sqrt{2\left[(1.2\times10^{-3})^2 + (4.8\times10^{-4})^2\right]} = 1.8\times10^{-3},
$$
that is $0.18\ \%$, giving $c_\mathrm{B} = (1.000 \pm 0.002) \times 10^{-3}\ \mathrm{mol\,dm^{-3}}$. Two things to hold on to. The concentration fell by a factor of $100$ while the uncertainty grew by only $50\ \%$: relative errors multiply rather than add, so serial dilution is cheap — but it is not free, and every step you add buys a fresh share of glassware error. And the pipette contributes $(1.2/1.29)^2 = 86\ \%$ of each step's variance: the $25\ \mathrm{cm^3}$ delivery is the weak link again, exactly as the hyperbola below predicts.
:::
:::

::: widget plot
f: u/x
x: 1, 100
y: 0, 0.15
sliders: u=0.03:0.005:0.1:0.005
labels: \text{relative uncertainty}
caption: The relative uncertainty $u/V$ of a glassware delivery against the volume delivered, for a tolerance $u$ set by the slider (default $0.03\ \mathrm{cm^3}$, a Class A pipette). The hyperbola is the whole argument in one line: at $25\ \mathrm{cm^3}$ the tolerance costs $0.12\ \%$, while at $5\ \mathrm{cm^3}$ the same tolerance costs $0.6\ \%$ — five times the volume buys five times the quality. This is why titrations are run with large burette deliveries rather than many small ones, and why a small pipette, not the balance, is usually the term that dominates an uncertainty budget.
:::

## Titrations

A titration is a weighing carried out with a burette: you deliver a measured volume of one solution (**the titrant**) into a measured volume of another (**the aliquot**) until the reaction is complete, and the stoichiometry converts the volumes into a concentration. The technique is a sequence of defences. Rinse the burette twice with the titrant itself, drained to waste, for the pipette's reason. Fill above the tap, then open the tap fully for a moment to fill the jet and expel any air bubble: a bubble that clears mid-titration lets the burette record liquid that never reached the flask, and the titre reads high. Adjust to zero or near it, wiping the tip. Read the meniscus to $0.02\ \mathrm{cm^3}$ — the graduations are $0.1\ \mathrm{cm^3}$ apart and one-fifth divisions are genuinely resolvable with a dark card — and read initial and final at the same eye level so the parallax cancels. Deliver with the tip touching the wall of the conical flask, swirl, and rinse down the wall with the wash bottle as you approach the end; in the last millilitre, deliver half-drops against the wall and wash them in.

Run a **rough titration** first, fast, to find where the end falls; then repeat slowly until successive titres agree within $0.05$–$0.10\ \mathrm{cm^3}$. Titres that agree within that limit are called **concordant**, and you average only the concordant ones: the rough titre is not a bad measurement, it is not a measurement at all — it was reconnaissance. The **equivalence point** is the stoichiometric completion of the reaction, a theoretical point on the titration curve; the **end point** is the indicator's colour change, a real event a little way off. The gap between them is the titration error, and choosing an indicator whose end point falls on the steep part of the curve — the subject of [[general-chemistry-2/buffers-titrations]] — makes it smaller than the reading error. When no indicator is sharp enough, the end point is found potentiometrically instead.

::: example Standardising sodium hydroxide against KHP {#ex-naoh-standardisation}
A student weighs $0.4856\ \mathrm{g}$ of dried potassium hydrogenphthalate by difference, dissolves it, adds phenolphthalein, and titrates with sodium hydroxide solution. The concordant titres are $23.60$, $23.55$ and $23.65\ \mathrm{cm^3}$. What is the concentration of the alkali?
::: solution
The mean of the concordant titres is
$$
\bar{V} = \frac{23.60 + 23.55 + 23.65}{3} = 23.60\ \mathrm{cm^3} = 0.02360\ \mathrm{dm^3}.
$$
Potassium hydrogenphthalate is a monobasic acid — one acidic hydrogen — so the amount of it is
$$
n = \frac{0.4856\ \mathrm{g}}{204.22\ \mathrm{g\,mol^{-1}}} = 2.378\times10^{-3}\ \mathrm{mol},
$$
and it reacts one-for-one,
$$
\mathrm{KHC_8H_4O_4 + NaOH \rightarrow KNaC_8H_4O_4 + H_2O},
$$
so the alkali delivered contains the same amount:
$$
c_\mathrm{NaOH} = \frac{2.378\times10^{-3}\ \mathrm{mol}}{0.02360\ \mathrm{dm^3}} = 0.1008\ \mathrm{mol\,dm^{-3}}.
$$
The budget, quickly: weighing $\pm 0.0003\ \mathrm{g}$ on $0.4856\ \mathrm{g}$ is $0.06\ \%$; the titre mean (three readings spanning $0.10\ \mathrm{cm^3}$) is about $0.05\ \%$; the KHP's purity and molar mass are exact for practical purposes. Total about $0.1\ \%$: $c_\mathrm{NaOH} = 0.1008 \pm 0.0001\ \mathrm{mol\,dm^{-3}}$. Four figures is what this technique supports — no more, and no fewer.
:::
:::

## Weighing to constant mass

::: definition Weighing to constant mass {#def-constant-mass}
A solid is dried — or ignited — **to constant mass** when two successive treatments (dry at the stated temperature, cool in a **desiccator**, weigh) give masses agreeing within a stated limit, conventionally about $\pm 0.3\ \mathrm{mg}$ for teaching work and $\pm 0.2\ \mathrm{mg}$ in rigorous gravimetry. The cooling happens in a desiccator because a hot object reads low and drifts as it warms the air around it, and because many dried solids reabsorb moisture from the laboratory air within minutes. The first drying is almost never enough: water hides in the pores of a precipitate and between crystals, and water of hydration leaves only slowly; a solid that decomposes slowly on heating, by contrast, will lose mass forever. That is why the criterion is the agreement of successive masses and never a fixed drying time — "two hours in the oven" is a recipe, not a result.
:::

::: example Has it reached constant mass? {#ex-constant-mass}
A porcelain crucible holding a dried precipitate is weighed three times, with a further hour of drying between the weighings: $12.4517$, $12.4498$ and $12.4496\ \mathrm{g}$. The empty crucible weighed $10.2318\ \mathrm{g}$. Was constant mass reached, and what mass of precipitate do you report?
::: solution
Successive differences: $12.4517 - 12.4498 = 0.0019\ \mathrm{g}$, i.e. $1.9\ \mathrm{mg}$ — far beyond the $\pm 0.3\ \mathrm{mg}$ criterion, so the first pair is not constant; and $12.4498 - 12.4496 = 0.0002\ \mathrm{g}$, i.e. $0.2\ \mathrm{mg}$ — within it. Constant mass was reached at the third weighing. Report the last mass, not a mean of the last two, because the mass was still drifting downwards when the second reading was taken. The precipitate is
$$
12.4496\ \mathrm{g} - 10.2318\ \mathrm{g} = 2.2178\ \mathrm{g}.
$$
Read the first difference again before moving on: $1.9\ \mathrm{mg}$ of water left that crucible in a single extra hour. A protocol that had dried "for two hours and called it dry" would have reported a precipitate $1.9\ \mathrm{mg}$ — $0.09\ \%$ of its mass — too heavy, in one direction, invisibly, in every sample it ever weighed. Constant mass is the only honest test that drying is finished.
:::
:::

In **gravimetric analysis** the precipitate *is* the measurement: the analyte is precipitated, filtered, washed until the washings no longer carry the mother liquor's ions, dried or ignited to constant mass, and weighed, and the amount of analyte follows from the formula of the precipitate — the discipline of [[analytical-chemistry/classical-analysis]] in its purest form. The same habit earns its keep one level down: a recrystallised product is dried to constant mass before anyone trusts its melting point or its yield ([[laboratory-methods/separation-purification]], [[laboratory-methods/identifying-compounds]]).

::: history
Friedrich Mohr (1806–1879), a German apothecary, turned titration from a curiosity into quantitative practice in the 1850s. His *Lehrbuch der chemisch-analytischen Titrirmethode* (1855) popularised the **graduated burette** — before Mohr, titrimetry meant weighing the burette before and after, because nobody had thought to put a scale on it — and collected the methods still bearing his name, including the **Mohr method** for chlorides: titrate with silver nitrate using chromate indicator, and the red silver chromate that appears just past the end tells you where the chloride ran out. Mohr also recognised **Mohr's salt**, iron(II) ammonium sulfate hexahydrate, as a standard that could be weighed in air while plain iron(II) sulfate oxidises and absorbs water. And because few apothecaries could obtain pure reagents themselves, Mohr sold standard solutions, burettes and instructions as a set: a small industry of standard solutions grew up around his titrimetric methods, and quantitative analysis became something a competent shopkeeper could run — which is precisely what made the purity of a primary standard, and the honesty of its certificate, a matter of public trust.
:::

## Where this leads

Drying to constant mass in practice — ovens, desiccators, crucibles and the drying of recrystallised products — is carried out in [[laboratory-methods/separation-purification]]. Glassware is not infallible, and the way to find out is to calibrate it: weigh the water a pipette delivers, divide by the density of water, and plot apparent against true volume — a least-squares correction line is [[laboratory-methods/data-graphs]]. The full treatment of titrimetry and gravimetry, with end-point correction and blank titrations, is [[analytical-chemistry/classical-analysis]], and the statistics of replicate titres — how many replicates, which outliers may be rejected — is [[analytical-chemistry/statistics-calibration]]. The choice of indicator and the shape of the curve you are reading come from [[general-chemistry-2/buffers-titrations]]; the concentration arithmetic you have been assuming is in [[general-chemistry-1/solutions-reactions]], and the units and figures behind every tolerance in this chapter are [[general-chemistry-1/matter-measurement]] and [[laboratory-methods/measurement-uncertainty]].

::: summary
- The balance display's last digit is a claim: a $0.1\ \mathrm{mg}$ readability carries $\pm 0.0002\ \mathrm{g}$ per reading, so weigh by difference, weigh gram-scale, never weigh a warm object, and distrust readings that drift from static charge.
- TC contains, TD delivers: drain pipettes are never blown out, ring-marked pipettes always are; read the meniscus at eye level and read both burette readings from the same eye level.
- Clean glass drains as a film, not drops; rinse glassware with the solution it will deliver, never with water alone; measuring cylinders and beaker graduations are for rough work only.
- A primary standard is pure, stable in air, non-hygroscopic, exactly defined and reasonably heavy (KHP, anhydrous $\mathrm{Na_2CO_3}$); NaOH and HCl solutions must be standardised against one.
- Dilution conserves amount of substance, not volume: $c_1 V_1 = c_2 V_2$, make up to the mark at $20\ ^\circ\mathrm{C}$, and expect each step to inherit the stock's uncertainty and add its own glassware's.
- Titrate to concordance within $0.10\ \mathrm{cm^3}$ and average only the concordant titres; choose the indicator so the end point falls at the equivalence point.
- Constant mass means successive masses agree within about $\pm 0.3\ \mathrm{mg}$; it is the only proof that drying is finished and the foundation of gravimetric analysis.
:::

## Exercises

::: exercise Weighing a carbonate standard {level=1 check="1.325"}
What mass of anhydrous sodium carbonate, $\mathrm{Na_2CO_3}$ ($M = 105.99\ \mathrm{g\,mol^{-1}}$), should you weigh to prepare $250.0\ \mathrm{cm^3}$ of $0.0500\ \mathrm{mol\,dm^{-3}}$? (Enter the mass in $\mathrm{g}$.)
::: solution
$m = cVM = 0.0500\ \mathrm{mol\,dm^{-3}} \times 0.2500\ \mathrm{dm^3} \times 105.99\ \mathrm{g\,mol^{-1}} = 1.3249\ \mathrm{g}$, so weigh about $1.325\ \mathrm{g}$ by difference and compute the exact concentration from the mass actually delivered. Dissolve in a beaker, transfer with rinsings to the $250.0\ \mathrm{cm^3}$ flask, make to the mark and invert twenty times ([[#alg-standard]]).
:::
:::

::: exercise Dilution volume {level=1 check="50.00"}
What volume of $0.1000\ \mathrm{mol\,dm^{-3}}$ hydrochloric acid must you pipette to make $250.0\ \mathrm{cm^3}$ of $0.0200\ \mathrm{mol\,dm^{-3}}$? (Enter the volume in $\mathrm{cm^3}$.)
::: solution
$V_1 = c_2 V_2 / c_1 = 0.0200 \times 250.0 / 0.1000 = 50.00\ \mathrm{cm^3}$. Deliver it as $25.00 + 25.00\ \mathrm{cm^3}$ from a Class A pipette, or in one $50\ \mathrm{cm^3}$ delivery if the laboratory owns one, into a $250.0\ \mathrm{cm^3}$ flask; make to the mark. Note that the acid is not a primary standard ([[#def-primary-standard]]) — the $0.1000\ \mathrm{mol\,dm^{-3}}$ figure is itself only as good as the standardisation behind it.
:::
:::

::: exercise Mean of concordant titres {level=1 check="23.85"}
A student's four titres are $23.80$, $25.40$, $23.90$ and $23.85\ \mathrm{cm^3}$. Report the mean titre. (Enter the mean in $\mathrm{cm^3}$.)
::: solution
The $25.40\ \mathrm{cm^3}$ titre is the rough run — it misses concordance by more than $1.5\ \mathrm{cm^3}$ and is reconnaissance, not data. The remaining three agree within $0.10\ \mathrm{cm^3}$ and are concordant: $\bar{V} = (23.80 + 23.90 + 23.85)/3 = 23.85\ \mathrm{cm^3}$. Averaging in the rough titre would have given $24.24\ \mathrm{cm^3}$ — a $1.6\ \%$ error manufactured entirely by bookkeeping.
:::
:::

::: exercise Concentration from a standardisation {level=2 check="0.1037"}
A student weighs $0.5106\ \mathrm{g}$ of dried potassium hydrogenphthalate ($M = 204.22\ \mathrm{g\,mol^{-1}}$), dissolves it, and titrates with the sodium hydroxide solution; the mean of the concordant titres is $24.10\ \mathrm{cm^3}$. What is the concentration of the alkali? (Enter it in $\mathrm{mol\,dm^{-3}}$.)
::: solution
$n(\mathrm{KHP}) = 0.5106/204.22 = 2.500\times10^{-3}\ \mathrm{mol}$, reacting one-for-one with the hydroxide, so $c_\mathrm{NaOH} = 2.500\times10^{-3}\ \mathrm{mol} / 0.02410\ \mathrm{dm^3} = 0.1037\ \mathrm{mol\,dm^{-3}}$. Four figures, matching the four in the mass and the titre; the budget follows [[#ex-naoh-standardisation]].
:::
:::

::: exercise Relative uncertainty of a flask {level=2 check="0.048"}
A $250.0\ \mathrm{cm^3}$ Class A volumetric flask has tolerance $\pm 0.12\ \mathrm{cm^3}$. Treating the tolerance itself as the uncertainty, compute the relative uncertainty of one fill to the mark. (Enter it in $\%$.)
::: solution
$u/V = 0.12/250.0 = 4.8\times10^{-4} = 0.048\ \%$. The flask is the *cheapest* volume in the laboratory — four times better than the $25\ \mathrm{cm^3}$ pipette's $0.12\ \%$ — which is why making to the mark is rarely the weak link in a budget, and why [[#ex-khp-mass]] found the flask, not the balance, dominant only because the weighing was so good.
:::
:::

::: exercise Two-step dilution {level=2 check="0.00500"}
You pipette $20.00\ \mathrm{cm^3}$ of $0.500\ \mathrm{mol\,dm^{-3}}$ into a $250.0\ \mathrm{cm^3}$ flask and make to the mark; then pipette $25.00\ \mathrm{cm^3}$ of that solution into a $200.0\ \mathrm{cm^3}$ flask and make to the mark. What is the final concentration? (Enter it in $\mathrm{mol\,dm^{-3}}$.)
::: solution
$c = 0.500 \times (20.00/250.0) \times (25.00/200.0) = 0.500 \times 0.0800 \times 0.125 = 0.00500\ \mathrm{mol\,dm^{-3}}$. Each factor is a dilution ratio, not a volume addition ([[#prop-dilution]]); the three-figure stock limits the answer to three figures.
:::
:::

::: exercise A full budget for a standard {level=3}
You prepare a potassium hydrogenphthalate standard by weighing $1.0211\ \mathrm{g}$ by difference on an analytical balance (tolerance $\pm 0.0002\ \mathrm{g}$ per reading, two readings), making to $250.0\ \mathrm{cm^3}$ in a Class A flask ($\pm 0.12\ \mathrm{cm^3}$), and delivering a $25.00\ \mathrm{cm^3}$ aliquot with a Class A pipette ($\pm 0.03\ \mathrm{cm^3}$). Treating each tolerance as the uncertainty, build the budget of relative uncertainties for the amount of KHP in the aliquot, $n = (m/M)\,(V_\mathrm{pip}/V_\mathrm{flask})$, identify the dominant term and its share of the variance, and compare the budget with the one in which $0.1000\ \mathrm{g}$ was weighed in [[laboratory-methods/measurement-uncertainty]].
::: solution
Weighing by difference: $u(m) = \sqrt{2}\times0.0002 = 0.0003\ \mathrm{g}$, so $u_m/m = 0.0003/1.0211 = 2.9\times10^{-4}$ ($0.029\ \%$); flask: $0.12/250.0 = 4.8\times10^{-4}$ ($0.048\ \%$); pipette: $0.03/25.00 = 1.2\times10^{-3}$ ($0.12\ \%$). In quadrature,
$$
\frac{u_n}{n} = \sqrt{(2.9\times10^{-4})^2 + (4.8\times10^{-4})^2 + (1.2\times10^{-3})^2} = 1.3\times10^{-3},
$$
i.e. $0.13\ \%$. The shares of the variance are $82\ \%$ pipette, $13\ \%$ flask, $5\ \%$ weighing: the dominant term is now the pipette, not the balance. The contrast with the earlier budget is the lesson: there, weighing $0.1000\ \mathrm{g}$ cost $0.28\ \%$ and dominated everything; weighing ten times more cut the weighing term a hundredfold in variance and moved dominance to the glassware, where it cannot easily be improved without a better pipette or a gravimetric aliquot. The budget told you what to fix, and you fixed it.
:::
:::

::: exercise Derive dilution, then propagate it twice {level=3}
Derive $c_1 V_1 = c_2 V_2$ from the conservation of amount of substance, stating the physical condition that makes the derivation valid. Then propagate uncertainty through a two-step serial dilution — $V_1$ of stock into $V_2$, then $V_3$ of that into $V_4$ — to show that
$$
\left(\frac{u_{c_\mathrm{final}}}{c_\mathrm{final}}\right)^2 = \left(\frac{u_{c_1}}{c_1}\right)^2 + \left(\frac{u_{V_1}}{V_1}\right)^2 + \left(\frac{u_{V_2}}{V_2}\right)^2 + \left(\frac{u_{V_3}}{V_3}\right)^2 + \left(\frac{u_{V_4}}{V_4}\right)^2,
$$
and evaluate it for two identical $25.00 \rightarrow 250.0\ \mathrm{cm^3}$ Class A steps from a stock of negligible uncertainty.
::: hint
Write each step as a product of concentration and dimensionless ratios, $c_\mathrm{final} = c_1 \times (V_1/V_2) \times (V_3/V_4)$, and ask what the product rule of [[laboratory-methods/measurement-uncertainty]] says about a product of four independent factors.
:::
::: solution
Conservation: the aliquot $V_1$ carries $n = c_1 V_1$ of solute; dilution to $V_2$ adds solvent only, so $c_2 = n/V_2 = c_1 V_1/V_2$, i.e. $c_1 V_1 = c_2 V_2$. The condition is that the amount of solute is conserved — no reaction with the solvent, nothing lost in transfer — and it is why the final volume is read at the mark rather than computed from the water added ([[#proof-dilution]]). For the propagation, write $c_\mathrm{final} = c_1 (V_1/V_2)(V_3/V_4)$: a product and quotient of four independent measured quantities, so the product rule applied twice gives the stated sum of squared relative uncertainties. With $u_{V_1} = u_{V_3} = 0.03\ \mathrm{cm^3}$ and $u_{V_2} = u_{V_4} = 0.12\ \mathrm{cm^3}$:
$$
\frac{u_c}{c} = \sqrt{2(1.2\times10^{-3})^2 + 2(4.8\times10^{-4})^2} = 1.8\times10^{-3},
$$
$0.18\ \%$ — the same answer as [[#ex-serial-dilution]], now seen as the general rule: every pipetted volume and every made-to-mark volume in a dilution chain contributes its own relative variance, and the small deliveries dominate in the order $1/V$.
:::
:::
