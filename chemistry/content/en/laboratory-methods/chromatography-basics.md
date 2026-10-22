Early in 1900 the botanist Mikhail Tswett, working in Heidelberg, ground up spinach leaves, poured the green extract down a glass tube packed with powdered chalk, and expected to wash the pigments back out in a single pour. What came down instead was a rainbow. As solvent trickled through the chalk, the extract split into distinct coloured bands — green chlorophylls, yellow xanthophylls, orange carotenes — marching down the column at different speeds, each band a pure pigment separated from the rest. Nothing in Tswett's apparatus was new: powder, solvent, gravity. What made it work is the same distribution equilibrium you met in [[laboratory-methods/separation-purification]], where a solute divides itself between two immiscible liquids in a fixed ratio. A single shake in a separatory funnel applies that equilibrium *once*, and one application moves a solute only a little way — which is why extraction alone so rarely separates similar compounds. A chromatographic column applies the same modest equilibrium ten thousand times: ten thousand small choices between two phases, each one tipped very slightly against the solute the stationary phase likes, and ten thousand small tips add up to a complete separation of things no single extraction can part. A weak principle applied many times beats a strong principle applied once, and that sentence is the whole theory of chromatography in embryo.

This chapter makes the idea quantitative. We name the two phases and the two ways a solid can hold a solute; learn thin-layer chromatography, the bench technique that answers "is my reaction finished?" and "is my product pure?" in ten minutes; derive the retention factor $R_\mathrm{f}$ from the phase ratio and see exactly what it is and is not; move the same chemistry to a column, where bands become fractions and the retention volume appears; and finish with paper chromatography, the technique whose explanation in 1941 finally revealed what Tswett had discovered. Throughout, the numbers are small and the arithmetic is simple — the power is entirely in the repetition.

## The idea: two phases and a moving one

Every chromatographic separation has the same two ingredients. The **stationary phase** is a solid, or a liquid coated as a thin film on a porous solid support, held in place: a layer of silica gel on an aluminium plate, a cellulose sheet, a packed bed of particles inside a glass tube. The **mobile phase** is a liquid or a gas that percolates through or over it, carrying the sample with it. As the mobile phase moves, each solute in the sample distributes itself between the two phases according to its own distribution behaviour — the chromatographic cousin of the distribution coefficient $D$ of [[laboratory-methods/separation-purification]] — and the distribution is re-established again and again as fresh mobile phase arrives.

::: definition Chromatography {#def-chromatography}
**Chromatography** is the family of separation techniques in which a mixture dissolved or suspended in a **mobile phase** — a liquid or a gas — is carried through or over a **stationary phase** — a solid, or a liquid held on a solid support — so that each component repeatedly partitions or adsorbs between the two phases. A component held only weakly by the stationary phase spends most of its time travelling with the mobile phase and is overtaken by no one; a component held strongly spends most of its time standing still and is left behind. Separation is the accumulated consequence of many repeated distributions, not of any single one.
:::

Two mechanisms of holding dominate. In **adsorption chromatography** the stationary phase is a polar solid — silica gel or alumina (aluminium oxide) — and solutes stick to its surface. Silica's surface is carpeted with silanol groups, $\mathrm{Si{-}OH}$, which grip any solute that can hydrogen-bond or dipole-associate with them: alcohols, acids and amines cling; hydrocarbons barely touch down. In **partition chromatography** the stationary phase is a liquid film held on an inert support, and solutes separate by dissolving preferentially in one liquid or the other — paper chromatography, the oldest form, is exactly this, with water as the held liquid (see the section on paper below). The mathematics of the next sections is the same for both mechanisms; only the origin of the preference differs.

The mobile phase of a liquid chromatographic separation is called the **eluent** (or developing solvent), and solutes carried down it are said to be **eluted**. Eluents have a ranking called eluotropic strength, and on the polar adsorbents the rule you must memorise is short: **the more polar the eluent, the faster everything moves on silica**. A polar eluent competes with the solute for the same polar surface sites, knocking solutes off the surface and into the mobile phase; on silica, hexane barely moves an alcohol, a little ethyl acetate in the hexane gets it travelling, and pure ethyl ethanoate sends almost everything running. The arrangement described here — polar stationary phase, less polar mobile phase — is called **normal-phase** chromatography; its mirror image, a non-polar stationary phase (silica bonded with long hydrocarbon chains) and a polar mobile phase, is **reversed-phase**, and it reverses the order of elution. Reversed-phase is the workhorse of modern pharmaceutical analysis and is taken up in [[analytical-chemistry/chromatography]]; this chapter stays with silica, because it is what you will pack at the bench.

## Thin-layer chromatography

Thin-layer chromatography (TLC) puts the whole idea on a flat plate and answers a chemist's two daily questions — how many compounds are in this mixture, and how far did my reaction go — in the time it takes a solvent to climb ten centimetres. A commercial plate is a thin sheet of aluminium or glass coated with a layer of silica about $0.1$–$0.2\ \mathrm{mm}$ thick, bound with a calcium sulfate binder and containing a fluorescent dye that makes the chapter's numbers measurable by eye.

::: definition The retention factor {#def-rf}
After a plate is developed, the **retention factor** $R_\mathrm{f}$ of a spot is
$$
R_\mathrm{f} = \frac{\text{distance travelled by the centre of the spot}}{\text{distance travelled by the solvent front}}.
$$
Both distances are measured from the origin (the baseline where the sample was applied), and both are measured in the same units, so $R_\mathrm{f}$ is a pure number with no units. It is always less than one, because the solute can never outrun the solvent that carries it; a compound that never touches the stationary phase would have $R_\mathrm{f} = 1$, and one permanently stuck at the origin has $R_\mathrm{f} = 0$.
:::

::: algorithm Thin-layer chromatography {#alg-tlc}
1. **Draw a baseline in pencil** about $1\ \mathrm{cm}$ from the bottom edge of the plate. Pencil graphite does not dissolve and will not run; ballpoint or ink will chase up the plate with the front and ruin the experiment.
2. **Spot small.** Dip a capillary tube in the solution, touch it to the baseline, and dry the spot with a gentle stream of air or by waiting; repeat two or three times to load more sample without widening the spot. A wide spot gives a wide, overlapping band later — small and concentrated is everything.
3. **Prepare the tank.** Pour eluent into a covered glass tank to a depth of about $0.5\ \mathrm{cm}$ — the level must stay *below* the baseline, or the sample dissolves off into the reservoir instead of climbing the plate. Swirl to wet the tank walls.
4. **Develop.** Stand the plate in, replace the lid, and leave it until the front has risen to within about $1\ \mathrm{cm}$ of the top. Remove the plate and mark the front's position in pencil at once, before the solvent evaporates, then dry the plate.
5. **Visualise.** Look under ultraviolet light at $254\ \mathrm{nm}$: the plate's dye fluoresces and UV-absorbing compounds appear as dark spots (view through the safety screen, never directly at the lamp). Pass the plate briefly over iodine crystals, which brown most organic compounds, or dip it in a developing stain such as ninhydrin for amines and amino acids.
6. **Measure.** Circle each spot in pencil, measure spot distance and front distance with a ruler, and compute $R_\mathrm{f}$ for each spot.
:::

Step 3 hides the one detail beginners get wrong, so say the reason out loud: **the tank is covered because the eluent must be in vapour equilibrium with the air inside it.** In an open tank, the solvent evaporates from the face of the plate while the front is rising; evaporation cools the plate, removes the fastest-moving eluent components first, and makes the front crawl unevenly and change speed halfway up. In a tank saturated with eluent vapour, nothing evaporates, the front runs straight and level, and $R_\mathrm{f}$ values mean something from one run to the next. The lid also keeps flammable vapour out of the room: the eluents of ordinary TLC — hexane, ethyl acetate, ethanoic acid, propan-2-ol — are all flammable, and plates, capillary tubes and waste solvent go to the solid-waste and organic-solvent containers, never down the drain and never into the general bin. Do not blow a dried plate to clear it of dust: a silica layer is a fine respirable powder, and the correct way to clean a plate is to let the waste bin, not your lungs, collect it. All of this is ordinary bench work, but it is bench work with flammables and fine dust, and it is done under supervision and against a risk assessment, as everywhere in [[laboratory-methods/lab-safety]].

What $R_\mathrm{f}$ is: a reproducible property of a compound *for a specified eluent, a specified type of plate, and a covered tank* — reproducible enough that chemists record "ethyl acetate/hexane $1:3$, $R_\mathrm{f}\ 0.35$" in a notebook and a colleague in another building can reproduce it. What $R_\mathrm{f}$ is not: a physical constant like a melting point. Change the eluent and every $R_\mathrm{f}$ on the plate changes; an $R_\mathrm{f}$ quoted without its eluent is a number without a unit. Nor is a single spot proof of purity. A compound that shows one spot under ultraviolet light, after iodine, and after a developing stain — three visualisation methods that respond to different chemistry — is *evidence* of purity, because an impurity would have had to hide from all three; but two compounds that travel together and absorb at the same wavelength will look exactly like one. The honest statement is "no impurity detectable by TLC in this eluent".

::: example Measuring an $R_\mathrm{f}$ value {#ex-rf-measure}
A TLC plate is developed in ethyl acetate/hexane mixture until the solvent front has travelled $5.1\ \mathrm{cm}$ from the baseline. A single spot has its centre $3.2\ \mathrm{cm}$ from the baseline. Determine the retention factor, to an honest number of figures.
::: solution
$$
R_\mathrm{f} = \frac{3.2\ \mathrm{cm}}{5.1\ \mathrm{cm}} = 0.627\ldots = 0.63.
$$
The centimetres cancel — $R_\mathrm{f}$ is dimensionless — and the distances, read from a ruler against a centimetre scale, justify about two significant figures, so $R_\mathrm{f} = 0.63$. Two bench notes. The distance is measured to the *centre* of the spot, where the bulk of the compound sits, not to its leading edge; and the front is marked while still wet, because a front allowed to evaporate unmarked is a lost experiment — with the front unknown, $R_\mathrm{f}$ cannot be computed at all.
:::
:::

::: example Following a reaction by TLC {#ex-rf-reaction-monitor}
An oxidation converts starting material $\mathrm{A}$ ($R_\mathrm{f} = 0.45$ in the chosen eluent) into a more polar product ($R_\mathrm{f} = 0.20$). A student spots three lanes on one plate: lane 1, a drop of the starting-material solution; lane 2, a drop of the reaction mixture; lane 3, a co-spot — both drops on the same point of the baseline, applied together. After development, lane 1 shows one spot at $0.45$; lane 2 shows spots at $0.20$ and $0.45$; lane 3 shows both spots. Has the reaction finished?
::: solution
No. Lane 2's spot at $0.20$ proves product has formed, but its spot at $0.45$ sits exactly where starting material runs, so unreacted $\mathrm{A}$ remains. The co-spot in lane 3 is the careful part: if the upper spot in the reaction mixture were merely a compound that happens to run at $0.45$ but is not $\mathrm{A}$, the co-spot would separate into two close spots as it overloaded the plate; instead it shows one clean spot at $0.45$, consistent with the reaction mixture genuinely containing $\mathrm{A}$. The verdict: the reaction has made product but is incomplete — leave it running and sample again. The co-spot lane is the standard way to settle "is it the same compound?" questions that matching $R_\mathrm{f}$ values alone cannot answer, and the same logic returns in [[laboratory-methods/identifying-compounds]].
:::
:::

## Why the retention factor behaves the way it does

The reason $R_\mathrm{f}$ is what it is comes straight from the distribution equilibrium of [[laboratory-methods/separation-purification]]. Write $k$ for the ratio in which one solute divides itself, not between two bulk liquids but between the two phases of the plate, measured as amounts:

$$
k = \frac{\text{amount of solute in the stationary phase}}{\text{amount of solute in the mobile phase}}.
$$

($k$ is the distribution coefficient $D$ multiplied by the ratio of the amounts of the two phases in the region of the plate; it is the same equilibrium wearing the chromatographer's clothes.)

::: proposition From phase ratio to retention factor {#prop-rf}
If a solute distributes between the stationary and mobile phases of a chromatographic system with mass ratio $k$, then its retention factor is
$$
R_\mathrm{f} = \frac{1}{1 + k}.
$$
A solute held strongly ($k$ large) has a small $R_\mathrm{f}$; a solute not held at all ($k = 0$) runs with the front, $R_\mathrm{f} = 1$; and $k = 1$ — equal amounts in both phases at every instant — sits exactly halfway up the plate.
:::

::: proof The time-fraction argument {#proof-rf}
A solute molecule travels only while it is in the mobile phase; while adsorbed on the silica it sits exactly where it was left. At equilibrium the fraction of solute molecules in the mobile phase is
$$
\frac{n_\mathrm{m}}{n_\mathrm{m} + n_\mathrm{s}} = \frac{1}{1 + n_\mathrm{s}/n_\mathrm{m}} = \frac{1}{1 + k},
$$
and since molecules exchange between the phases constantly and identically, this is also the *fraction of time* any one molecule spends moving. In the time the solvent front travels a distance $L$, a solute therefore travels
$$
\text{distance} = (\text{fraction of time mobile}) \times (\text{front distance}) = \frac{L}{1 + k},
$$
where we assume the molecule moves at the front's speed whenever it is in the mobile phase. Dividing by $L$ gives $R_\mathrm{f} = 1/(1+k)$. The assumptions worth naming are equilibrium being fast compared with the flow (otherwise the molecule averages wrongly) and equal mobility in the mobile phase for all solutes; both are good approximations on a plate run slowly in a saturated tank.
:::

Read the result as a table of consequences. On a normal-phase silica plate, a more polar solute adsorbs more strongly, so $k$ is larger and $R_\mathrm{f}$ smaller: an alcohol hides near the baseline while a hydrocarbon rides with the front. A more polar eluent competes for the silanol sites, *lowers every $k$ at once*, and raises every $R_\mathrm{f}$ on the plate together — which is why "raise the polarity" is the universal first response to a plate where everything stuck at the origin. And because $k$ belongs to the eluent as much as to the solute, the proposition itself never tells you what an $R_\mathrm{f}$ will become when you change eluents; it only ties $R_\mathrm{f}$ and $k$ together at fixed conditions. Never quote an $R_\mathrm{f}$ without naming the eluent.

::: quiz
On a normal-phase silica plate developed in $30\ \%$ ethyl acetate/hexane, a spot sits at $R_\mathrm{f} = 0.10$. To move it further up the plate you should —
- [x] increase the ethyl acetate fraction of the eluent.
- [ ] decrease the ethyl acetate fraction of the eluent.
- [ ] switch to pure hexane.
- [ ] do nothing: $R_\mathrm{f}$ is a property of the compound and cannot be changed.
::: solution
Increase the ethyl acetate fraction. At $R_\mathrm{f} = 0.10$ the solute has $k = 1/0.10 - 1 = 9$: it spends nine tenths of its time stuck to the silica. Ethyl acetate is the polar member of the mixture, and more of it competes harder for the silanol sites, lowering $k$ and raising $R_\mathrm{f}$; pure hexane (the least polar eluent of the options) would push the spot even closer to the baseline. The fourth option mistakes the bookkeeping for physics: $R_\mathrm{f}$ is reproducible for fixed conditions, but $k$ — and with it $R_\mathrm{f}$ — depends on the eluent, the phase and the temperature, exactly as a distribution coefficient does.
:::
:::

::: example Choosing an eluent strength {#ex-rf-choose-eluent}
In $10\ \%$ ethyl acetate/hexane a spot has $R_\mathrm{f} = 0.05$ — uselessly close to the baseline. Roughly what change of eluent brings it into the usable range $R_\mathrm{f} \approx 0.3$–$0.5$, and by what factor must $k$ fall?
::: solution
Convert the target to phase ratios with $k = 1/R_\mathrm{f} - 1$. At $R_\mathrm{f} = 0.05$ the solute has $k = 19$; at $R_\mathrm{f} = 0.35$ it would have $k = 1.9$, and at $R_\mathrm{f} = 0.5$, $k = 1.0$. So $k$ must fall by roughly a factor of ten — and since raising the eluent's polarity is what lowers $k$, the move is to increase the ethyl acetate fraction substantially, for instance from $10\ \%$ to $30$–$40\ \%$, run a test plate, and adjust again. The factor-of-ten estimate is not a prediction of the new $R_\mathrm{f}$ — $k$ is not a fixed number you can compute ahead of an eluent change — but it tells you the *size* of the change to attempt, and one test plate settles it. If even strong eluent leaves the spot at the baseline, the compound is too polar for the silica system and the honest options are a reversed-phase plate or a different separation entirely.
:::
:::

## Column chromatography

Turn the plate on its end, make the bed thick, and let solvent run continuously, and TLC becomes **column chromatography**: the same chemistry, vertical and continuous. A glass tube is packed with a fine silica slurry in the starting eluent to give a level bed; the mixture, dissolved in as little solvent as possible, is applied on top as a narrow band; more eluent is poured on and allowed to flow by gravity. As the band migrates, the solutes separate into distinct coloured or invisible bands exactly as on the plate — weakly held compounds overtake strongly held ones — and the chemist's job is to catch them as they leave: **fractions** of roughly equal volume are collected in a rack of tubes, each is spotted on a TLC plate, and the tubes containing one compound are combined and evaporated. Where a fixed eluent cannot move everything, the polarity is raised during the run — **gradient elution** — starting weak to resolve the mobile compounds and finishing strong to wash the stubborn ones off.

::: definition Retention volume {#def-retention}
The **retention volume** $V_\mathrm{R}$ of a solute is the volume of eluent that must pass through the column to bring the centre of its band to the column exit. If $V_0$ is the **interstitial volume** — the volume of mobile phase held in the packed bed, i.e. the volume needed to elute a compound with $k = 0$ — then
$$
V_\mathrm{R} = V_0\,(1 + k).
$$
The retention volume is the column chromatographer's version of $R_\mathrm{f}$: the same phase ratio $k$, measured this time in centimetres cubed of solvent instead of centimetres of travel.
:::

The relation is the time-fraction argument of [[#proof-rf]] read through a tap instead of a ruler. A band advances at $1/(1+k)$ of the speed of the mobile phase, so it takes $(1+k)$ times as long to cross the column as an unretained compound; the eluent flows at a steady rate, so the volume that passes in that longer time is $(1+k)$ times the volume that passes while an unretained compound crosses — and that volume is $V_0$. An alcohol with $k = 9$ needs ten column volumes of eluent to elute; a hydrocarbon with $k = 0.2$ needs barely more than one. This is why strongly held compounds demand both a stronger eluent and a great deal of patience, and why the volume scale of a separation is set by $k$ just as the distance scale on a plate is.

Between the two bands, everything rides or falls on **band broadening**. Each solute leaves the column not as an infinitely thin slice but as a band of finite width, and the separation survives only while bands stay narrower than the distance between them. Every band starts narrow and widens with time as molecules diffuse and as some ride down the fast channels between particles while others dawdle in slow ones: a long, slow run gives diffusion more time and produces wide, overlapping bands even when $k$ differs comfortably. Sharp bands come from the opposite habits — a narrow, concentrated starting band; fine, evenly packed silica with no cracks or channels; a steady, unhurried but not sluggish flow; and a bed that never dries out. The quantitative theory of plates and resolution belongs to [[analytical-chemistry/chromatography]]; at the bench the rule is qualitative and absolute — keep the bands narrow at the start and disturb them as little as possible.

::: widget plot
f: exp(-(x-t)^2/0.3); 0.9*exp(-(x-t-s)^2/0.3)
x: 0, 10
sliders: t=3:1:5:0.1; s=1:0.1:3:0.1
labels: \text{component 1}; \text{component 2}
caption: Two chromatographic peaks as a detector might record them: each solute band arrives as a roughly gaussian peak, and the slider $s$ sets how far apart the two components emerge while $t$ slides the whole pair along the time axis. The two peaks overlap completely at small $s$ and resolve as the distance between their centres grows, while peak height — how concentrated each band is — changes very little. That asymmetry is the lesson: resolving a mixture improves far more from distance between peaks than from peak size, which is why *selectivity* — changing the chemistry so the two $k$ values differ more — beats *efficiency* — making peaks narrower — as a way to separate what will not separate.
:::

::: warning Never let the column run dry {#warn-column}
If the solvent level falls below the top of the stationary phase, air is sucked into the bed, the silica cracks, and the eluent — always taking the path of least resistance — channels through the cracks instead of through the silica. Once that happens the bands smear, the separation is ruined, and no amount of extra eluent repairs it: keep the column topped up and the reservoir covered, and if the bed does run dry, pack it again. The same warning has a second face, for people rather than samples: silica and alumina are fine respirable dusts and a respiratory hazard, so weigh the powder in the fume cupboard, never pour or blow dust in the open air, and dispose of used plates, spent columns and waste eluent into the proper solid-waste and solvent containers. The eluents themselves are flammable liquids used in a fume cupboard away from ignition sources. None of this is paranoia; it is the risk assessment of [[laboratory-methods/lab-safety]] applied to the one technique where you handle grams of fine powder and litres of solvent at once — and all of it is done under supervision.
:::

::: example Predicting elution order from silica {#ex-column-order}
A mixture of hexane, ethyl ethanoate and propan-1-ol is applied to a column of silica, and the eluent is ethyl acetate/hexane of constant strength. In what order do the compounds leave the column, and why?
::: solution
Least polar first: **hexane, then ethyl ethanoate, then propan-1-ol**. Hexane is a hydrocarbon with no way to hydrogen-bond; its $k$ on silica is nearly zero and it elutes close to $V_0$. Ethyl ethanoate is a polar ester — it dipole-associates with the surface but cannot donate a hydrogen bond — and takes an intermediate $k$. Propan-1-ol donates and accepts hydrogen bonds at its $\mathrm{OH}$ group, grips the silanols hardest, has the largest $k$, and leaves last; on the plate it would have the smallest $R_\mathrm{f}$. The order is the same on plate and column because it is the same $k$ deciding both — which is exactly why you can scout a column separation on a ten-minute TLC plate: whatever separates on the plate separates in the tube.
:::
:::

## Paper chromatography and the partition theory

Long before plates and columns, there was paper — and paper is where the theory was settled. In paper chromatography a strip of chromatography paper is spotted near one end, the tip dips into a shallow dish of solvent, and the solvent creeps up the paper by capillary action, carrying the sample with it; spots are located and their $R_\mathrm{f}$ values computed exactly as on a plate. Tswett had explained his chalk by adsorption, and it was natural to explain paper the same way. In 1941 Archer Martin and Richard Synge showed that this was wrong, and their correction is the founding idea of all modern chromatography: **paper chromatography is partition, not adsorption.** Cellulose is strongly hydrophilic, and even paper that feels dry holds a film of water bound between its fibres; that water film is the stationary phase, and the organic solvent creeping past it is the mobile phase. The solutes are separating by dissolving preferentially in one liquid or the other — a liquid–liquid extraction performed a thousand times along a strip of paper — and the same $R_\mathrm{f} = 1/(1+k)$ logic of [[#prop-rf]] applies unchanged, with $k$ now a partition coefficient between two liquids.

The classic demonstration is the solvent system butan-1-ol/ethanoic acid/water, in which the water held in the paper is the stationary phase and the organic vapour-saturated mixture is the mobile phase. Sugars — polyhydroxy compounds that differ mainly in how much they prefer water to organic solvent — spread neatly along the strip, each $R_\mathrm{f}$ set by its own partition coefficient; amino acids, colourless and invisible on the strip, are sprayed with ninhydrin, which reacts with them to give purple spots, and separate for the same reason. Martin and Synge's insight did more than explain paper: it said that *any* pair of immiscible liquids, one held still and one moved, would separate by partition — and the two men spent the next decade proving it, first on paper and then, in 1952, with a gas as the mobile phase.

The instrumental descendants of these bench techniques are the subject of [[analytical-chemistry/chromatography]]. **High-performance liquid chromatography** is column chromatography driven by pump pressure through particles a few micrometres across, with a flow detector tracing the peaks of the figure above in real time; **gas chromatography** uses a gas mobile phase and a vaporised sample, and separates volatile mixtures — fuels, perfumes, blood alcohol — with a power Tswett never imagined. In every one of them the physics is this chapter's: repeated partition between a stationary and a mobile phase, $k$ deciding who moves, and repetition deciding who escapes. Couple such a column to a mass spectrometer and the separated compounds are identified as they elute — the hyphenated methods of [[analytical-chemistry/hyphenated-methods]] — but the separation itself is already fully understood by a student of this page.

::: history
Mikhail Tswett was a botanist studying plant pigments, and in 1900–1903, working in Heidelberg and then in Russia, he poured pigment extracts down columns of crushed chalk and calcium carbonate and watched the bands form: green chlorophyll bands, yellow xanthophyll bands, orange carotene bands, each separable and collectable. He named the method *chromatography* — "colour-writing", from the Greek $\chi\rho\alpha\mu\alpha$ (colour) and $\gamma\rho\alpha\mu\mu\alpha$ (writing) — and published carefully, but the German journals he wrote for turned down plant physiology, and his contemporaries, absorbed in the new physical chemistry of ions, ignored the coloured tubes. The technique slept for thirty years. In 1941 Archer Martin and Richard Synge, working in their small Cambridge laboratory, reinterpreted such separations as partition between two liquid phases; the idea yielded paper chromatography in 1944, counter-current distribution between moving liquid phases, and — Martin with his student Antony James — gas–liquid chromatography in 1952, work that won Martin and Synge the Nobel Prize in Chemistry of 1952. Tswett died in 1919, having watched his method fail to catch on; every chromatogram since is the vindication he did not live to see.
:::

## Where this leads

The distribution coefficient $D$ that this chapter's $k$ extends is developed in [[laboratory-methods/separation-purification]], where extraction applies the same equilibrium once and chromatography applies it ten thousand times; the co-spot logic of [[#ex-rf-reaction-monitor]] returns as mixed melting point and comparative analysis in [[laboratory-methods/identifying-compounds]], where TLC purity is the gate a sample must pass before any physical constant is worth measuring. The instrument room — columns, pumps, detectors, plates and resolution, HPLC and GC — is [[analytical-chemistry/chromatography]], and the marriage of separation to identification, GC–MS and LC–MS, is [[analytical-chemistry/hyphenated-methods]]; the spectroscopic detectors themselves are [[analytical-chemistry/molecular-spectrometry]]. The vapour equilibrium that makes the covered tank work is the same physics as [[general-chemistry-2/liquids-solutions]], and the two-figure honesty of every $R_\mathrm{f}$ you report is the arithmetic of [[laboratory-methods/measurement-uncertainty]]. The hazards of every sentence above — flammable eluents, respirable dust, ultraviolet lamps — are assessed properly in [[laboratory-methods/lab-safety]].

::: summary
- Chromatography separates by one distribution equilibrium applied many times: each component repeatedly partitions or adsorbs between a stationary phase and a mobile phase, and weakly held components overtake strongly held ones.
- Adsorption chromatography (silica or alumina: polar surfaces hold polar solutes) and partition chromatography (a liquid film held on a support) are the two mechanisms; on silica, a more polar eluent moves everything faster.
- The retention factor $R_\mathrm{f} = \text{spot distance}/\text{front distance}$ is dimensionless and always below one, and it is a reproducible property only for a named eluent, plate and tank.
- With $k$ the amount ratio stationary/mobile, $R_\mathrm{f} = 1/(1+k)$: strongly held solutes have small $R_\mathrm{f}$, polar solutes stick to normal-phase silica, and a polar eluent raises every $R_\mathrm{f}$ at once.
- TLC practice: pencil baseline, small spots, covered tank for vapour equilibrium, visualisation under $254\ \mathrm{nm}$ ultraviolet light, iodine and stains; one spot under three methods is evidence, not proof, and co-spotting settles identity.
- On a column, the retention volume is $V_\mathrm{R} = V_0(1+k)$; sharp bands come from narrow application, fine even packing and steady flow — and never letting the bed run dry, which channels the eluent and ruins the separation.
- Paper chromatography is partition (Martin and Synge, 1941): water held in cellulose against an organic solvent; HPLC and GC are the instrumental descendants, and hyphenated methods couple them to mass spectrometry.
:::

## Exercises

::: exercise Measuring an $R_\mathrm{f}$ {level=1 check="0.79"}
On a developed TLC plate the solvent front has travelled $5.8\ \mathrm{cm}$ from the baseline, and the centre of a spot lies $4.6\ \mathrm{cm}$ from the baseline. Compute the retention factor. (Enter the retention factor.)
::: solution
$R_\mathrm{f} = 4.6\ \mathrm{cm}/5.8\ \mathrm{cm} = 0.793\ldots = 0.79$. The units cancel; two figures is all the ruler supports.
:::
:::

::: exercise First off the column {level=1}
A mixture of methyl benzoate and benzoic acid is applied to a silica column. Which compound elutes first, and why?
::: solution
Methyl benzoate. The ester can only accept hydrogen bonds at its carbonyl and dipole-associate with the silica surface, so its $k$ is small; benzoic acid donates a strong hydrogen bond through its $\mathrm{COOH}$ group, grips the silanols much harder, and has the larger $k$ — it elutes second (and often with a tail, because acids interact especially strongly with silica). Least polar first on normal-phase silica, always.
:::
:::

::: exercise Why the tank is covered {level=1}
In your own words, explain why a TLC tank is covered before the plate is developed, and why the eluent level must sit below the baseline.
::: solution
The covered tank fills with eluent vapour until the air is in equilibrium with the liquid. Without that saturated atmosphere the rising solvent evaporates from the plate's face: the front slows and wanders, the eluent's composition drifts as its volatile components leave first, and $R_\mathrm{f}$ values stop being reproducible. The lid also contains flammable vapour. The eluent level must stay below the baseline because otherwise the spots sit *under* liquid: the sample dissolves off the plate into the reservoir instead of being carried up it, and the experiment is lost.
:::
:::

::: exercise From $R_\mathrm{f}$ to phase ratio {level=2 check="1.5"}
A spot has $R_\mathrm{f} = 0.40$ on a silica plate. Compute the phase-ratio $k$ of the compound under these conditions. (Enter $k$.)
::: solution
Rearrange $R_\mathrm{f} = 1/(1+k)$ to $k = 1/R_\mathrm{f} - 1$, giving $k = 1/0.40 - 1 = 2.5 - 1 = 1.5$. The compound spends $1/(1+1.5) = 0.40$ of its time in the mobile phase — the same number it started from, which is the consistency check.
:::
:::

::: exercise Changing the eluent {level=2}
A spot has $R_\mathrm{f} = 0.25$ in $10\ \%$ ethyl acetate/hexane. A colleague develops the same compound in $30\ \%$ ethyl acetate/hexane. Does the new $R_\mathrm{f}$ rise or fall, and can you compute its value from $R_\mathrm{f} = 1/(1+k)$? Explain.
::: solution
It rises: the more polar eluent competes for the silanol sites, lowers $k$, and $R_\mathrm{f} = 1/(1+k)$ increases. But the new value cannot be *computed*, because $k$ itself is a property of the eluent — the formula ties $R_\mathrm{f}$ and $k$ together at fixed conditions but says nothing about how $k$ changes when the chemistry changes. The honest workflow is the one of [[#ex-rf-choose-eluent]]: estimate the direction and size of the change, run a test plate, and adjust. (Qualitatively: $k$ was $3$ at $R_\mathrm{f} = 0.25$; the tripled ester fraction will push the spot well up the plate, but exactly where is an experiment.)
:::
:::

::: exercise Proving an unknown is the reference {level=2}
You are told a white solid "should" be caffeine, and a caffeine reference standard is available. Design a TLC experiment that makes the identification as strong as TLC can make it, and state precisely what the result would and would not prove.
::: solution
Spot three lanes on one plate: the unknown alone, the reference alone, and a co-spot with both applied at the same point. Develop in one eluent, dry, and visualise under $254\ \mathrm{nm}$ ultraviolet light, then with iodine, then with a developing stain; repeat the whole plate in a *second, chemically different eluent* (for example an ethyl acetate/hexane system and then a propan-2-ol/ammonia system). If unknown and reference have the same $R_\mathrm{f}$ in both eluents, show no extra spot by any of the three visualisation methods, and — decisively — the co-spot gives a single round spot rather than a pair or a streak, the identification is as strong as TLC allows. It is evidence, not proof: a compound that co-elutes with caffeine in two eluent systems and matches it under three visualisations is almost certainly caffeine, but two similar compounds can hide together, and proof belongs to mixed melting point in [[laboratory-methods/identifying-compounds]] or to the spectrometry of [[analytical-chemistry/molecular-spectrometry]].
:::
:::

::: exercise Derive the retention volume {level=3}
Derive $V_\mathrm{R} = V_0(1 + k)$ from the definition of $k$ and the time-fraction result of [[#proof-rf]], stating every assumption you use.
::: hint
Work in times first. If the mobile phase takes $t_0$ to cross the column, how long does the band take? Then convert times to volumes using the fact that the eluent flows at a steady rate, and remember what $V_0$ is by definition.
:::
::: solution
Let the column have length $L$ and the mobile phase move at speed $u$, so an unretained compound crosses in $t_0 = L/u$. By the time-fraction argument, the solute band advances at $u/(1+k)$, so it takes
$$
t_\mathrm{R} = \frac{L}{u/(1+k)} = (1+k)\,t_0 .
$$
The eluent flows at a steady volumetric rate $F$, so the volume that passes the column in time $t$ is $Ft$; by definition the unretained compound elutes at $V_0 = F t_0$, and the solute at
$$
V_\mathrm{R} = F t_\mathrm{R} = F(1+k)t_0 = V_0(1+k).
$$
The assumptions are the ones of [[#proof-rf]] plus two more: a constant flow rate $F$, and no broadening that would smear the band centre away from $V_\mathrm{R}$.
:::
:::

::: exercise Four spots on one plate {level=3}
A mixture is spotted on silica and developed in $20\ \%$ ethyl acetate/hexane. Four spots appear, with $R_\mathrm{f}$ values: A $0.85$, B $0.62$, C $0.60$, D $0.15$. (a) Rank the four compounds by polarity, most polar first. (b) Compute the four $k$ values. (c) B and C are barely resolved; state one change to the eluent that should separate them better and one that would make them worse, and justify both.
::: solution
(a) On normal-phase silica, smaller $R_\mathrm{f}$ means more strongly held means more polar: $\mathrm{D} > \mathrm{B} \approx \mathrm{C} > \mathrm{A}$, with D the most polar and A (near the front) the least. (b) With $k = 1/R_\mathrm{f} - 1$: A gives $k = 0.18$, B gives $0.61$, C gives $0.67$, D gives $5.7$ — B and C differ in $k$ by only $9\ \%$, which is why they barely separate. (c) Better: *lower* the ethyl acetate fraction. A weaker eluent raises every $k$, and pairs sitting at mid-plate $R_\mathrm{f}$ spread apart as they slow toward $R_\mathrm{f} \approx 0.3$–$0.4$, where small differences in $k$ show up as visible gaps. Worse: *raise* the ethyl acetate fraction — stronger eluent pushes every spot toward the front, compresses the whole pattern against the solvent front, and squeezes B and C into one streak. (A change of *solvent* rather than strength — swapping ethyl acetate for a different polar eluent — attacks the selectivity and is often the deeper fix; the figure above shows why distance, not sharpness, is what to buy.)
:::
:::
