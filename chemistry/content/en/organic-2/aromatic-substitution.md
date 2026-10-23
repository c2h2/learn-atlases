Benzene's resonance energy of $151\ \mathrm{kJ\,mol^{-1}}$ is a wall between it and the alkenes: addition would tear down the wall permanently, so benzene refuses it. But there is a way through that costs the aromaticity only for the instant of its paying — the ring attacks an electrophile, loses aromaticity, and then *gives a proton back*, regaining the ring current and the resonance energy in the final step. The net reaction is substitution: one hydrogen gone, one group on, aromaticity untouched at both ends. This is **electrophilic aromatic substitution**, the reaction that functionalises the aromatic ring, and with a second act — nucleophilic aromatic substitution, which works only when the ring is desperate — it gives aromatic compounds a rich and deeply useful substitution chemistry. The chapter's second great theme is that once a ring bears a substituent, that substituent *votes*: on how fast the next substitution goes, and on which position gets it. Learning to read the votes turns a thousand reactions into a dozen rules.

## The general mechanism: lose aromaticity, then get it back

::: definition Electrophilic aromatic substitution and the arenium ion {#def-eas}
In **electrophilic aromatic substitution** ($\mathrm{S_EAr}$) an aromatic ring reacts with an electrophile $\mathrm{E^+}$ in two steps. Step 1: the $\pi$ electrons attack $\mathrm{E}$, which bonds to one ring carbon; that carbon becomes $sp^3$, the cyclic conjugation is broken, and the product is a cationic **arenium ion** (also **$\sigma$ complex** or **benzenium ion**) in which the positive charge is delocalised over the remaining five carbons — stabilised, but no longer aromatic. Step 2: a base removes the proton from the $sp^3$ carbon, its electron pair closes the ring, and aromaticity returns. Net: $\mathrm{Ar{-}H + E^+ \rightarrow Ar{-}E + H^+}$.
:::

::: proposition The arenium ion decides everything {#prop-arenium}
Step 1 is rate-determining because it destroys aromaticity; step 2 is fast because it restores it. Three consequences follow. **(1)** The overall rate depends on the electrophile's strength and the ring's electron density but *not* on the $\mathrm{C{-}H}$ bond strength: no primary kinetic isotope effect is observed ($k_\mathrm{H}/k_\mathrm{D} \approx 1$) — the $\mathrm{C{-}H}$ bond breaks after the transition state we wait for. **(2)** Addition products are not observed because any reagent that added and stayed would leave the ring non-aromatic; losing $\mathrm{H^+}$ is essentially free by comparison. **(3)** The charge in the arenium ion sits at the *ortho* and *para* positions relative to the $sp^3$ carbon (draw the three resonance contributors), which is the structural key to all directing effects.
:::

::: example Bromination: making an electrophile out of an unreactive molecule
Bromine water decolourises in seconds with an alkene; benzene needs $\mathrm{Br_2}$ plus a catalytic amount of $\mathrm{FeBr_3}$ (or iron filings, which make it in situ). Explain the catalyst's role with the mechanism, curly arrows described in words.
::: solution
$\mathrm{Br_2}$ alone is not electrophilic enough for the aromatic $\pi$ system — attacking it would cost $151\ \mathrm{kJ\,mol^{-1}}$ of aromaticity for a bond to a neutral, only weakly electron-poor bromine. $\mathrm{FeBr_3}$, a Lewis acid with an empty orbital on iron, binds a bromine lone pair: $\mathrm{Br_2 + FeBr_3 \rightarrow Br^{\delta+}{-}Br{-}FeBr_3^{\delta-}}$, a polarised complex whose outer bromine carries substantial positive charge. The ring attacks that bromine (curly arrow from a $\pi$ bond to Br, from the $\mathrm{Br{-}Br}$ bond to the inner Br), giving the arenium ion plus $\mathrm{FeBr_4^-}$; then $\mathrm{FeBr_4^-}$ removes the proton from the $sp^3$ carbon, the electron pair closes the ring, and $\mathrm{HBr}$ and $\mathrm{FeBr_3}$ are returned — catalytic, because the catalyst is regenerated in step 2. Every reaction in the next section is this same two-step skeleton with a different way of generating $\mathrm{E^+}$.
:::
:::

::: widget plot
f: a*exp(-((x-1.3)/0.4)^2) + b*exp(-((x-2.9)/0.4)^2)
x: 0, 4.2
y: -10, 70
sliders: a=55:35:70:1; b=15:2:30:1
labels: \text{S}_\mathrm{E}\text{Ar profile}
caption: Schematic reaction coordinate for electrophilic aromatic substitution (arbitrary units): reactants, the high first hump (slider $a$) whose transition state destroys aromaticity, the arenium-ion valley between the humps, the low second hump (slider $b$) for deprotonation, and products that lie *below* the arenium ion because aromaticity is back. Slide $a$ up: a poorer electrophile or a deactivated ring raises only the first barrier — which is why rate studies probe step 1. Slide $b$: it barely matters to the rate, because step 2 is not what we wait for. The valley is a real intermediate: arenium ions were observed directly by Olah in superacid media at low temperature, NMR spectra in hand (Nobel Prize, 1979).
:::

## The catalogue: five electrophiles, one skeleton

**Nitration.** Concentrated nitric acid in concentrated sulfuric acid generates the **nitronium ion**: $\mathrm{HNO_3 + 2\,H_2SO_4 \rightarrow NO_2^+ + H_3O^+ + 2\,HSO_4^-}$. $\mathrm{NO_2^+}$ (linear, $\mathrm{O{-}N{-}O}$, isoelectronic with $\mathrm{CO_2}$) attacks the ring; the product is a nitroarene, $\mathrm{Ar{-}NO_2}$. Nitro groups are the launch pad for amines — reduction of $\mathrm{Ar{-}NO_2}$ is the standard route to $\mathrm{Ar{-}NH_2}$ ([[organic-2/amines]]) — which makes nitration the most-used first step in aromatic synthesis.

**Sulfonation.** Fuming sulfuric acid (dissolved $\mathrm{SO_3}$) installs $\mathrm{SO_3H}$, and sulfonation is the reversible member of the family: aqueous acid and steam put the proton back on. That reversibility is a synthetic tool — $\mathrm{SO_3H}$ as a removable blocking group — and it means sulfonation's product ratio is often thermodynamic rather than kinetic.

**Halogenation.** $\mathrm{Cl_2}$ or $\mathrm{Br_2}$ with $\mathrm{FeX_3}$, as in the example above; fluorination is too violent to use the recipe and iodination needs oxidising conditions to make $\mathrm{I^+}$.

**Friedel–Crafts alkylation.** $\mathrm{RCl}$ with $\mathrm{AlCl_3}$: the Lewis acid pulls chloride off the alkyl halide to give a carbocation-like electrophile, which the ring attacks. Two famous catches: the cation *rearranges* (hydride and alkyl shifts march to the most stable cation before the ring captures it), and the product alkylbenzene is *more* reactive than the starting benzene, so polyalkylation follows unless benzene is used in large excess.

**Friedel–Crafts acylation.** $\mathrm{RCOCl}$ with $\mathrm{AlCl_3}$ gives the **acylium ion** $\mathrm{R{-}C{\equiv}O^+ \leftrightarrow R{-}C^+=O}$, stabilised by the oxygen lone pair and therefore *rearrangement-proof*; the ketone product is *deactivated* by its own carbonyl, so the reaction stops cleanly at one acyl group. Acylation–reduction (Clemmensen or catalytic) is therefore the correct two-step route to an unrearranged propyl or butyl chain.

::: example The acylation fix {#ex-acylation-fix}
A student treats benzene with 1-chloropropane and $\mathrm{AlCl_3}$ hoping for propylbenzene and obtains mainly isopropylbenzene (cumene). Diagnose, and give a synthesis that actually gives propylbenzene.
::: solution
$\mathrm{AlCl_3}$ ionises $\mathrm{CH_3CH_2CH_2Cl}$ to a primary cation-like complex that rearranges by a hydride shift to the far more stable secondary cation $\mathrm{CH_3CH^+CH_3}$ before the ring can capture it; the ring duly attacks the secondary cation and cumene results. The fix is acylation: benzene + $\mathrm{CH_3CH_2COCl}$, $\mathrm{AlCl_3}$ gives propiophenone $\mathrm{PhCOCH_2CH_3}$ (the acylium cannot rearrange — the positive charge is stabilised by oxygen and the carbon skeleton never becomes a free cation), and reduction of the carbonyl to $\mathrm{CH_2}$ (Clemmensen, $\mathrm{Zn(Hg)/HCl}$, or Wolff–Kishner, or catalytic hydrogenolysis) delivers propylbenzene. Two steps, no rearrangement, no polyalkylation — the acylation–reduction sequence is the standard repair for both Friedel–Crafts alkylation defects.
:::
:::

::: history
The reaction's mechanism was settled in two campaigns sixty years apart. In the 1920s and 1930s Christopher **Ingold** and Eric **Hughes** and their school showed by kinetics — including the absence of a hydrogen/deuterium isotope effect — that aromatic substitution goes through a slow electrophilic attack and a fast proton loss, establishing the $\mathrm{S_EAr}$ class alongside $\mathrm{S_N1}$ and $\mathrm{S_N2}$. The intermediate itself waited for George **Olah**, who in the 1960s dissolved stable carbocations in magic acid ($\mathrm{FSO_3H \cdot SbF_5}$) at $-70\ \mathrm{^\circ C}$ and simply *took their NMR spectra*: benzenium and substituted arenium ions, long-lived enough to see the charge where the resonance structures said it would be. Olah's 1979 Nobel Prize celebrated the direct sighting of the species Ingold had inferred.
:::

## Directing effects: what the first substituent votes for

::: definition Activators, deactivators, and the two directions {#def-directing}
A substituent is an **activator** if the substituted ring reacts faster than benzene, a **deactivator** if slower. It is an **ortho/para director** if further substitution lands mainly at those positions, a **meta director** if at the meta position. The pattern is one argument read off the arenium ion: a substituent that can *donate* electron density (by resonance or induction) into the cationic intermediate stabilises it — and the resonance contributors with charge *adjacent to* the substituent (the ortho/para pathways) are the ones a donor can help, so donors are ortho/para directors. A substituent that *withdraws* destabilises the intermediate everywhere, most of all at the positions where the charge would sit next to it, so meta — the least bad path — wins. Activators are ortho/para directors; meta directors are deactivators; the one exception is the halogens, which are deactivators yet ortho/para directors.
:::

| class | examples | effect | direction |
|---|---|---|---|
| strong donors | $\mathrm{NH_2}$, $\mathrm{NHR}$, $\mathrm{NR_2}$, $\mathrm{OH}$, $\mathrm{O^-}$ | strong activation | ortho/para |
| moderate donors | $\mathrm{OR}$, $\mathrm{NHCOR}$, $\mathrm{OCOR}$ | activation | ortho/para |
| weak donors | $\mathrm{R}$ (alkyl), aryl | mild activation | ortho/para |
| halogens | $\mathrm{F}$, $\mathrm{Cl}$, $\mathrm{Br}$, $\mathrm{I}$ | **deactivation** | ortho/para |
| weak withdrawers | $\mathrm{CHO}$, $\mathrm{COR}$, $\mathrm{CO_2H}$, $\mathrm{CO_2R}$, $\mathrm{CN}$, $\mathrm{SO_3H}$ | deactivation | meta |
| strong withdrawers | $\mathrm{NO_2}$, $\mathrm{NR_3^+}$, $\mathrm{CF_3}$ | strong deactivation | meta |

The numbers behind the words: toluene nitrates roughly $25$ times faster than benzene (alkyl donation, hyperconjugation), while nitrobenzene nitrates about a million times slower — and the nitro group's meta product arises because ortho and para attack place a positive charge directly beside $\mathrm{NO_2}$ in one contributor, an arrangement so unstable that the meta path, merely bad, wins by default.

::: proposition The halogen exception {#prop-halogens}
Halogens withdraw inductively (electronegativity) but donate by resonance (lone pair into the ring). Induction deactivates the whole ring — halobenzenes react slower than benzene — but resonance donation is available *only* in the ortho/para arenium ions, where the positive charge sits adjacent to the halogen and a lone pair can be offered to it. Ortho/para attack is thus the *less deactivated* path: halogens direct ortho/para while slowing the reaction. Directors are chosen by the intermediate's stability *differences*; rates report its absolute stability — two measurements, and they can disagree.
:::

::: example Read the votes {#ex-read-votes}
Predict the major mononitration product(s): (a) ethylbenzene; (b) benzoic acid; (c) chlorobenzene; (d) methyl benzoate.
::: solution
(a) Ethyl is a weak alkyl donor: ortho/para, and para dominates on steric grounds — 4-ethylnitrobenzene (with ortho second). (b) $\mathrm{CO_2H}$ is a carbonyl withdrawer: meta — 3-nitrobenzoic acid. (c) Chlorine: deactivating but ortho/para-directing — a mixture of 2- and 4-chloronitrobenzene, para usually favoured and separable (the ortho isomer's intramolecular dipole crowding lowers its boiling point; steam distillation carries it over first). (d) The ester $\mathrm{CO_2CH_3}$ withdraws: meta — methyl 3-nitrobenzoate. Note that (b) and (d) are the same vote: what matters is the atom attached to the ring and whether it pulls ($\mathrm{C{=}O}$) or pushes (lone pair, $\mathrm{C{-}H}$ hyperconjugation).
:::
:::

::: warning Three directing traps {#warn-directing}
**(1)** "Activator = ortho/para" is safe; the converse "ortho/para = activator" is not — halogens are the standing counterexample, and students who memorise the table as one list lose. **(2)** Aniline does not survive nitration conditions as an amine: in strong acid the basic nitrogen is protonated to $\mathrm{NH_3^+}$, a $\mathrm{NR_3^+}$-type *meta*-directing strong deactivator, and oxidation smears the rest. Protect first (acetylation to the amide, which is a moderate ortho/para donor), nitrate, then hydrolyse. **(3)** Directing effects are preferences, not laws: toluene nitration still gives several per cent of the meta isomer, and mixtures are the norm. The rules tell you the *major* product and the *rate* direction — which is exactly what a synthesis needs.
:::

::: quiz
Which substituent deactivates the ring towards electrophilic substitution yet directs the next group ortho/para?
- [x] $\mathrm{Br}$
- [ ] $\mathrm{NO_2}$
- [ ] $\mathrm{CH_3}$
- [ ] $\mathrm{CO_2H}$
::: solution
Bromine: inductive withdrawal slows everything, lone-pair donation rescues only the ortho/para intermediates. $\mathrm{NO_2}$ and $\mathrm{CO_2H}$ deactivate *and* direct meta; $\mathrm{CH_3}$ activates and directs ortho/para — it is the combination of the two properties, not either alone, that identifies the halogen exception.
:::
:::

## Nucleophilic aromatic substitution: the rule's revenge

An electron-rich ring chases electrophiles; an electron-*poor* ring can be made to chase nucleophiles. Plain chlorobenzene is inert to hydroxide — the ring is too electron-rich for $\mathrm{HO^-}$ to attack, and $\mathrm{S_N2}$ at an $sp^2$ carbon is geometrically impossible (backside attack would have to exit through the ring). Two mechanisms exist, and both need the ring's cooperation.

::: definition The addition–elimination mechanism ($\mathrm{S_NAr}$) {#def-snar}
When strong electron-withdrawing groups (typically $\mathrm{NO_2}$) sit *ortho* and/or *para* to a leaving group, a nucleophile adds to the ring carbon bearing the leaving group, giving an anionic **Meisenheimer complex** whose negative charge is delocalised onto the nitro groups' oxygens; the leaving group then departs, restoring aromaticity. The addition step is rate-determining, and two predictions follow that distinguish $\mathrm{S_NAr}$ from aliphatic substitution: the leaving-group order is $\mathrm{F > Cl > Br > I}$ (the strongly polarised $\mathrm{C{-}F}$ bond makes its carbon the most electrophilic, and since bond-breaking is *after* the transition state, fluorine's weakness as a leaving group is never charged against it), and the rate explodes with more ortho/para nitro groups.
:::

::: example Sanger's reagent {#ex-sanger}
1-Fluoro-2,4-dinitrobenzene (Sanger's reagent) reacts readily with amines at room temperature to give brightly yellow anilines; the corresponding chloride reacts an order of magnitude more slowly. Explain both observations.
::: solution
The amine attacks C1 (bearing the halogen), because the resulting Meisenheimer anion puts its charge ortho and para to *both* nitro groups — delocalised onto four oxygens — and the addition is fast even for a neutral nucleophile. The yellow is the extended conjugation of the dinitrophenyl chromophore with the new aniline nitrogen: the same push–pull $\pi$ system that stabilises the intermediate also absorbs in the visible. Fluorine beats chlorine for the reason in the definition: rate-determining addition cares about electrophilicity, not leaving-group quality, and $\mathrm{C{-}F}$ is the most electrophilic carbon of the four halides. (Historically the reagent labelled the N-terminal amino group of proteins — the yellow bands of protein sequencing.)
:::
:::

::: definition Elimination–addition: benzyne {#def-benzyne}
With no stabilising nitro groups and a very strong base (typically $\mathrm{NH_2^-}$ in liquid ammonia), aryl halides react by a third mechanism: base removes a proton *ortho* to the halogen, halide leaves, and the ring gains a formal triple bond — **benzyne**, with two $sp^2$-type orbitals forming a weak in-plane $\pi$ bond. The nucleophile then adds to either alkyne carbon, and the anion reprotonates. Because the two alkyne carbons are attacked competitively, substituted benzynes give *mixtures* of both regioisomers — the diagnostic fingerprint of the mechanism, and the basis of Roberts's 1953 proof using $\mathrm{1\text{-}^{14}C}$-chlorobenzene: the label ended up evenly split between C1 and C2 of the aniline product, impossible for addition–elimination, automatic for a symmetrical intermediate.
:::

::: example Predict the benzyne mixture {#ex-benzyne}
Predict the products of $m$-bromotoluene with $\mathrm{NaNH_2}$ in liquid ammonia, then with water workup.
::: solution
Put bromine at C1 and methyl at C3; the protons ortho to bromine are at C2 (between the substituents) and C6, and removing either gives a different benzyne. Elimination toward C2 puts the triple bond between C1 and C2: amide adds to C1 and, after reprotonation, the product retains the 1,3-relationship (3-methylaniline), or amide adds to C2 and the product is 2-methylaniline. Elimination toward C6 puts the triple bond between C1 and C6, and addition to its two ends gives 3-methylaniline or 4-methylaniline. The product is therefore a mixture of 2-, 3- and 4-methylaniline — the *meta* isomer, the one that "should" be the only product, is merely one of three, with the isomers from the less hindered C1–C6 benzyne tending to dominate. Scrambling of the substitution pattern is the signature of the mechanism: if a reaction that "should" give one product by $\mathrm{S_NAr}$ gives two or three, suspect benzyne.
:::
:::

::: widget plot
f: a*exp(-((x-1.4)/0.4)^2) + b*exp(-((x-3.0)/0.4)^2); (a-18)*exp(-((x-1.4)/0.4)^2) + b*exp(-((x-3.0)/0.4)^2)
x: 0, 4.4
y: -10, 75
sliders: a=55:35:70:1; b=20:5:35:1
labels: \text{no NO}_2\text{ groups}; \text{2 NO}_2\text{ groups}
caption: Schematic coordinate for nucleophilic aromatic substitution (addition–elimination): the first hump is addition to the ring (rate-determining), the valley is the Meisenheimer anion, the second hump is loss of halide as aromaticity returns. The upper curve is chlorobenzene itself — addition destroys aromaticity to make an unstabilised anion, and the barrier is prohibitive; the lower curve has two ortho/para nitro groups stabilising the anion, and the first barrier drops by roughly $18$ arbitrary units. The second hump barely moves: nitro groups stabilise the *anion*, and the anion appears only in the first step. This is why nitro groups must be ortho or para — meta cannot put the charge on their oxygens at all.
:::

## Where this leads

The directing logic is a preview of the whole course's method: intermediates' stabilities decide rates and positions, so [[organic-2/carbonyl-addition]] and [[organic-2/enols-enolates]] apply the same thinking to tetrahedral intermediates and enolates. Nitro reduction and the diazonium chemistry it feeds — Sandmeyer replacements, azo coupling — are [[organic-2/amines]]; the heteroaromatic rings substitute by exactly these two mechanisms with their own preferences, and reading them is [[organic-2/heterocycles]]. The quantitative side — how a substituent's electronic effect propagates, Hammett correlations — belongs to physical organic treatment in [[kinetics/reaction-mechanisms]]-adjacent material and the spectroscopy course's NMR chapters.

::: summary
- Electrophilic aromatic substitution is two steps: electrophilic attack gives a non-aromatic arenium ion (rate-determining, no primary isotope effect), and deprotonation restores aromaticity — substitution preserves what addition would destroy.
- The five standard recipes — nitration ($\mathrm{NO_2^+}$), sulfonation ($\mathrm{SO_3}$, reversible), halogenation ($\mathrm{X^+}$ via $\mathrm{FeX_3}$), Friedel–Crafts alkylation and acylation (Lewis-acid-generated $\mathrm{R^+}$ and acylium) — share the skeleton and differ only in how they make $\mathrm{E^+}$.
- Friedel–Crafts alkylation rearranges and polyalkylates; acylation does neither, and acylation–reduction is the clean route to straight chains.
- Donors activate and direct ortho/para; withdrawers deactivate and direct meta; halogens alone combine deactivation with ortho/para direction, because resonance rescue reaches only the ortho/para arenium ions.
- Directing effects explain synthesis order: protect anilines before nitrating, choose meta routes for 1,3-disubstitution, use sulfonation's reversibility as a removable block.
- Nucleophilic aromatic substitution needs either ortho/para nitro groups (addition–elimination, Meisenheimer complex, $\mathrm{F > Cl}$ leaving order) or extreme base (elimination–addition, benzyne, scrambled products) — and the product pattern tells you which one ran.
:::

## Exercises

::: exercise Generate the electrophile {level=1}
Write the active electrophile and the reagents that generate it for: (a) nitration; (b) sulfonation; (c) bromination; (d) Friedel–Crafts acylation.
::: solution
(a) $\mathrm{NO_2^+}$, from $\mathrm{HNO_3/H_2SO_4}$ (nitric acid protonated and dehydrated by sulfuric). (b) $\mathrm{SO_3}$ (or protonated $\mathrm{SO_3}$), from fuming sulfuric acid. (c) $\mathrm{Br^+}$ equivalent, the $\mathrm{Br_2 \cdot FeBr_3}$ polarised complex. (d) The acylium ion $\mathrm{RCO^+}$, from $\mathrm{RCOCl + AlCl_3}$.
:::
:::

::: exercise Name the directors {level=1}
Ortho/para or meta, activator or deactivator: (a) $\mathrm{OCH_3}$; (b) $\mathrm{CN}$; (c) $\mathrm{Br}$; (d) $\mathrm{NHCOCH_3}$; (e) $\mathrm{CF_3}$.
::: solution
(a) Ortho/para, strong-ish activator (lone-pair donor). (b) Meta, deactivator (nitrile withdraws). (c) Ortho/para, deactivator — the exception. (d) Ortho/para, moderate activator (the amide nitrogen's lone pair is partly busy with its own carbonyl, so it is a weaker donor than $\mathrm{NH_2}$ but still a donor). (e) Meta, deactivator (pure inductive withdrawal, no lone pairs).
:::
:::

::: exercise Why substitution, not addition {level=1}
Cyclohexene + $\mathrm{Br_2}$ adds; benzene + $\mathrm{Br_2/FeBr_3}$ substitutes. Say why in one sentence each, in terms of the arenium ion's two possible fates.
::: solution
For the arenium ion, losing $\mathrm{H^+}$ restores aromaticity (cost: nothing; gain: $151\ \mathrm{kJ\,mol^{-1}}$), while capturing $\mathrm{Br^-}$ would leave a non-aromatic diene at that price — so substitution is automatic once the intermediate exists. For cyclohexene there is no aromaticity to restore, and bromide capture is the ordinary closing of a cationic intermediate — so addition is automatic. Same intermediates, different ledgers.
:::
:::

::: exercise Two-step syntheses {level=2}
Choose the order of steps and give reagents: (a) 1-bromo-3-nitrobenzene from benzene; (b) 1-bromo-4-nitrobenzene from benzene.
::: solution
(a) Brominate first ($\mathrm{Br_2/FeBr_3}$): Br directs the subsequent nitration ortho/para — wrong! So instead: nitrate first ($\mathrm{HNO_3/H_2SO_4}$), and the $\mathrm{NO_2}$ group directs the following bromination *meta* ($\mathrm{Br_2/FeBr_3}$): 1-bromo-3-nitrobenzene. (b) Brominate first; bromine's ortho/para direction gives 1-bromo-4-nitrobenzene (with the 2-isomer separable). The pair is the teaching example: the *first* group decides the second's position, so choose which group to install first by which direction you need.
:::
:::

::: exercise Fluorine's paradox {level=2}
In aliphatic $\mathrm{S_N2}$, $\mathrm{R{-}I}$ reacts fastest and $\mathrm{R{-}F}$ practically never; in $\mathrm{S_NAr}$ of 4-substituted nitrobenzenes the order is $\mathrm{F > Cl > Br > I}$. Reconcile.
::: solution
Aliphatic $\mathrm{S_N2}$ has one transition state in which the $\mathrm{C{-}X}$ bond is *breaking*, so leaving-group quality (weak base, polarisable: $\mathrm{I^-}$) dominates. $\mathrm{S_NAr}$ is rate-determined by *addition*, before any bond to the halogen is broken: what matters is how electrophilic the ring carbon is, and the electronegative fluorine, by inductive withdrawal, makes its carbon the most electrophilic. The $\mathrm{C{-}F}$ bond then breaks in a fast later step, where its strength is irrelevant. Mechanism decides which property of the halogen you get to feel.
:::
:::

::: exercise Benzyne bookkeeping {level=2}
Roberts's 1953 experiment: $^{14}\mathrm{C}$ at C1 of chlorobenzene, treated with $\mathrm{KNH_2/NH_3}$, gave aniline with the label distributed 1:1 between C1 and C2. Explain, and say why $\mathrm{S_NAr}$ addition–elimination cannot give this result.
::: solution
Amide removes the ortho proton, ammonia-free benzyne forms with the triple bond between C1 and C2, and amide adds to *either* alkyne carbon with equal probability (the two are equivalent in unsubstituted benzyne); reprotonation then places $\mathrm{NH_2}$ at C1 or C2 with the label following the carbon skeleton — 1:1 labelled anilines. Addition–elimination would substitute at the labelled carbon only, giving 100 % C1 label. The scramble requires a symmetrical intermediate, and benzyne is the only candidate that fits.
:::
:::

::: exercise Protect and nitrate {level=3}
Give a three-step route from aniline to 4-nitroaniline with high para selectivity, explaining each step's purpose, and say why the direct nitration fails.
::: solution
(1) Acetylate: acetic anhydride converts $\mathrm{NH_2}$ to the acetamide $\mathrm{NHCOCH_3}$ — a moderate ortho/para donor that survives acid. (2) Nitrate ($\mathrm{HNO_3}$/acetic acid or mixed acid, cold): the bulky amide directs para preferentially, giving 4-nitroacetanilide (the classic para-selective nitration; the ortho isomer is minor and crystallisation removes it). (3) Hydrolyse the amide (aqueous acid or base, heat): 4-nitroaniline. Direct nitration fails because the mixed acid protonates the amine to $\mathrm{C_6H_5NH_3^+}$ — a strong meta-directing deactivator — and oxidises the ring to tars; protection converts a basic, oxidation-prone nitrogen into a tame, directing one.
:::
:::

::: exercise Read a complex ring {level=3}
Predict the single major mononitration product of 4-*tert*-butylphenol, justifying the choice against every competing directive.
::: solution
The two directors are $\mathrm{OH}$ (strong ortho/para donor) and the *tert*-butyl group (weak alkyl donor), para to each other, so their ortho positions are mutually shared: positions 2/6 are ortho to OH and meta to tBu; positions 3/5 are ortho to tBu and meta to OH. The strong donor outvotes the weak one: nitration goes ortho to OH — 2-nitro-4-*tert*-butylphenol as the single major product (positions 2 and 6 are equivalent by the molecule's mirror plane, so "ortho to OH" is one product, not two). Sterics reinforce it: attack ortho to the *tert*-butyl group is disfavoured anyway. Symmetry plus the hierarchy strong donor $>$ weak donor gives exactly one answer, which is why this substrate is a classic teaching case.
:::
:::
