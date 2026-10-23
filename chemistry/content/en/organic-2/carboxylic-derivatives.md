An ester is an aldehyde that learned to substitute. The same nucleophile that adds irreversibly to a ketone adds to an acyl compound and then — this is the whole difference — *ejects a leaving group*, because the tetrahedral intermediate of an acyl compound has one: the $\mathrm{Z}$ group hanging off the carbonyl carbon ($\mathrm{RCO{-}Z}$: chloride, carboxylate, alkoxide, amide). Addition that collapses back to a carbonyl is not addition at all; it is **nucleophilic acyl substitution**, and it is the governing reaction of an entire family — acid chlorides, anhydrides, esters, acids, amides — whose members interconvert by a single rule and whose reactivities line up in a single order. That order, the leaving-group ladder, explains why acid chlorides fume in air while proteins sit stable in a beaker for a century, why soap works, why DNA's backbone is an ester that lasts, and why making a peptide bond in the laboratory needs a reagent as dedicated as the ribosome.

## Addition that doesn't stop: acyl substitution

::: definition Nucleophilic acyl substitution {#def-acyl-substitution}
A nucleophile adds to the carbonyl carbon of an acyl compound $\mathrm{RCOZ}$, giving a tetrahedral intermediate that carries both the new group and the old $\mathrm{Z}$ on the same carbon. The intermediate then collapses: the oxygen's electron pair comes back down as the $\pi$ bond, and the best available leaving group — normally $\mathrm{Z}$ — is expelled. Net result: $\mathrm{Z}$ is *substituted* by the nucleophile, and the carbonyl survives the whole affair. The reaction is addition–elimination at an $sp^2$ carbon, and unlike addition to aldehydes and ketones it is usually reversible, because every participant is an acyl compound and every step is the same kind of step.
:::

::: proposition The leaving-group ladder sets the reactivity order {#prop-ladder}
The family's reactivities fall in the order **acid chloride $>$ anhydride $>$ ester $\approx$ carboxylic acid $>$ amide $\gg$ carboxylate**, and two effects, pointing the same way, produce the order. **Leaving-group ability:** the expelled $\mathrm{Z^-}$ is stable to the extent its conjugate acid is strong — $\mathrm{p}K_\mathrm{a}$ values of $\mathrm{HCl} \approx -7$, $\mathrm{RCO_2H} \approx 5$, $\mathrm{ROH} \approx 16$, $\mathrm{NH_3} \approx 38$ — so chloride leaves gladly and amide ion ($\mathrm{NH_2^-}$, conjugate acid $\mathrm{p}K_\mathrm{a}$ 38) never does. **Ground-state donation:** the more electron-rich $\mathrm{Z}$ is, the more it donates its lone pair into the carbonyl ($\mathrm{Z \rightarrow C{=}O}$ resonance), making the carbon less electrophilic; nitrogen donates far better than oxygen, and chloride barely at all. Both effects place amides at the bottom of the neutral ladder and acid chlorides at the top. The carboxylate anion $\mathrm{RCO_2^-}$ sits below all of them: its negative charge repels nucleophiles and its two equivalent oxygens have already donated everything there is to donate.
:::

::: example Rank and justify {#ex-ranking}
Order acetyl chloride, acetic anhydride, ethyl acetate, acetamide and acetate ion towards hydrolysis by neutral water, and explain why acetamide survives hours in boiling water while acetyl chloride reacts explosively in ice-cold water.
::: solution
Exactly the ladder: $\mathrm{CH_3COCl} \gg (\mathrm{CH_3CO})_2\mathrm{O} > \mathrm{CH_3CO_2Et} > \mathrm{CH_3CONH_2} \gg \mathrm{CH_3CO_2^-}$. Acetyl chloride combines the best leaving group of the set ($\mathrm{Cl^-}$, conjugate acid $\mathrm{p}K_\mathrm{a} \approx -7$) with the least donating $\mathrm{Z}$, so even the weak nucleophile water adds fast, and the intermediate expels chloride instantly; the reaction is enormously exothermic because $\mathrm{HCl}$ escapes the equilibrium. Acetamide has the worst leaving group ($\mathrm{NH_2^-}$/$\mathrm{NH_3}$) and nitrogen's strong donation blunts the carbonyl before water even arrives; neutral hydrolysis of amides needs *acid or base catalysis and heat* — and even then, hours. Acetate ion is inert to water's nucleophilic attack by electrostatics alone. The five-membered spread in rates, roughly $10^{12}$-fold from chloride to amide, is the ladder made visible.
:::
:::

::: widget plot
f: a*exp(-((x-1.4)/0.4)^2) + b*exp(-((x-3.0)/0.4)^2); (a+14)*exp(-((x-1.4)/0.4)^2) + (b+30)*exp(-((x-3.0)/0.4)^2)
x: 0, 4.5
y: -10, 90
sliders: a=35:15:55:1; b=12:0:25:1
labels: \text{acid chloride}; \text{amide}
caption: Schematic coordinate for nucleophilic acyl substitution (arbitrary units): addition gives the tetrahedral intermediate (the valley), elimination ejects the leaving group and restores the carbonyl. The lower curve is an acid chloride plus water; the upper is an amide plus water. Both humps are raised for the amide: the first because nitrogen's donation makes the carbon less electrophilic, the second because $\mathrm{NH_2^-}$ is a terrible group to eject. Slide $b$ to see the elimination hump move independently — it is the hump that separates *substitution* from the simple addition of the previous chapter, where there was no leaving group and no second hump at all.
:::

## The interconversion map: everything flows downhill

Because the ladder is a free-energy ordering, interconversions run spontaneously **downhill**: acid chlorides make anhydrides, esters and amides on treatment with the appropriate nucleophile; anhydrides make esters and amides; esters make amides when simply heated with amine (aminolysis — the amine is a better nucleophile than any alcohol, and the amide product precipitates or is simply the thermodynamic sink). Uphill travel requires activation: turn the acid into the acid chloride ($\mathrm{SOCl_2}$, oxalyl chloride) or use a coupling reagent that builds a temporary, better-leaving-group ester in place.

::: example Direct aminolysis {#ex-aminolysis}
Benzylamine is treated with ethyl acetate; no catalyst is added. Predict the product and say why the ester — a middling electrophile — reacts at all.
::: solution
$N$-benzylacetamide plus ethanol. The amine is both a better nucleophile than ethanol (nitrogen is less electronegative, and the lone pair is freer) and a stronger base, so addition to the ester is fast enough at reflux, and the tetrahedral intermediate can eject either group — but ejecting ethoxide to re-form the ester just reverses the step, while the small amount of amide formed sits at the bottom of the ladder and cannot be attacked back by ethoxide (which would need to eject amide ion — the ladder forbids it). Thermodynamics, not catalysis, drives aminolysis: the equilibrium is a one-way ratchet downhill. Excess amine also neutralises nothing and poisons nothing, which is why this is the greenest amide synthesis there is.
:::
:::

::: history
Amide bonds are the bonds of life, and making them selectively was the founding problem of peptide chemistry — until John **Sheehan** in 1954 borrowed a trick from the carboxylate problem itself. $N$-Protected amino acids refuse to couple directly because the acid is at the bottom of the ladder; Sheehan used $N,N'$-dicyclohexylcarbodiimide ($\mathrm{DCC}$), whose central carbon is an electrophile that the acid *adds* to, generating an $O$-acylisourea — an ester whose leaving group is a resonance-stabilised urea anion, an acyl compound suddenly promoted up the ladder. The amino acid component then aminolyses it, and the urea by-product is a neutral, insoluble, chemically inert slop. Sheehan's route made the first total synthesis of an enzyme (ribonuclease) possible and remains, in descendants like HATU and HBTU, the default way to make any amide that will not make itself.
:::

## Hydrolysis: two mechanisms, one famous asymmetry

::: proposition Base eats esters irreversibly; acid equilibrates them {#prop-hydrolysis-modes}
**Saponification** ($\mathrm{HO^-}$, water, heat): hydroxide adds, the tetrahedral intermediate ejects alkoxide, and the reaction *should* be reversible — but the products are a carboxylic acid and an alkoxide in the same flask, and that acid–base reaction ($\mathrm{p}K_\mathrm{a}$ 5 versus 16, a factor of $10^{11}$) is faster and more exergonic than anything else present. The final proton transfer pulls the equilibrium to completion: base hydrolysis is a *promotion*, not a catalysis, needing a full equivalent of hydroxide, and it is the reaction that makes soap from fats. **Fischer esterification** (carboxylic acid + alcohol, catalytic acid): every step is reversible and roughly thermoneutral, so the position is set by concentrations — flood the alcohol or remove the water and you get ester; flood the water and you get hydrolysis. Acid catalysis works by protonating the carbonyl oxygen (the basic site again) so that a weak nucleophile can add; it cannot make an irreversible reaction out of a thermoneutral one.
:::

::: example Driving the equilibrium {#ex-fischer}
Acetic acid with ethanol gives ethyl acetate with $K \approx 4$. A student mixes $1.0\ \mathrm{mol}$ each of acid and alcohol with catalytic $\mathrm{H_2SO_4}$ and obtains $67\ \%$ ester. Explain the number, and give two ways to exceed $95\ \%$.
::: solution
With $x$ the ester amount, $K = x^2/(1-x)^2 = 4$ gives $x/(1-x) = 2$, $x = 2/3$ — the $67\ \%$ is not a failure of catalysis; the catalyst only sets the speed, and the equilibrium is simply $2:1$. To exceed $95\ \%$ you must change the mass balance: (1) flood the alcohol (ethanol as solvent) so its concentration term overwhelms $K$; (2) remove one product — distil the low-boiling ester, or drag out water with a Dean–Stark trap or molecular sieves. Both are Le Chatelier, and both are standard bench practice; the third option, converting the acid irreversibly to an acid chloride first, is the *chemical* solution when the substrate cannot survive heat or acid.
:::
:::

::: example Why soap is the end of the story {#ex-saponification}
Tristearin (a fat) with aqueous $\mathrm{NaOH}$ gives glycerol and sodium stearate in quantitative yield; simply adding one equivalent of hydroxide and stopping early is impossible. Explain.
::: solution
Each ester saponifies by addition–elimination to give stearic acid and an alkoxide (on glycerol), and the instant those two meet, the acid gives its proton to the alkoxide ($\Delta\mathrm{p}K_\mathrm{a} \approx 11$, $\Delta G \approx -60\ \mathrm{kJ\,mol^{-1}}$). The carboxylate product is at the very bottom of the ladder — nucleophiles are electrostatically repelled, and there is no leaving group left — so the reverse reaction does not exist under the conditions. "Stopping early" would require catching a tetrahedral intermediate that collapses in microseconds, or a carboxylate that could be attacked, and neither is available. Quantitative is the only option, which is exactly why a lye spill on skin feels greasy and soapy: it is saponifying you.
:::
:::

::: warning Which C–O bond breaks {#warn-cleavage}
Esters have two $\mathrm{C{-}O}$ bonds, and cleavage can happen at either. Ordinary esters hydrolyse by **acyl–oxygen cleavage** (the bond to the carbonyl carbon breaks; the alkyl group keeps its oxygen — proven with $^{18}\mathrm{O}$-labelled alcohols), but *tert*-butyl esters and benzyl esters switch to **alkyl–oxygen cleavage** under acid, because they can form stable $t\mathrm{Bu^+}$ or stabilised cations: $t\mathrm{Bu}$ esters melt away in aqueous acid as isobutylene, and benzyl esters hydrogenolysis clean over Pd. This is not a footnote — it is the operating principle of the two most used protecting groups in peptide and nucleotide chemistry ($t\mathrm{Bu}$ for acids/alcohols, $\mathrm{BOC}$ for amines, whose *tert*-butyl group leaves the same way), and students who assume "esters hydrolyse by acyl cleavage, always" cannot explain why $\mathrm{BOC}$ comes off in TFA in minutes while a methyl ester barely notices.
:::

::: quiz
Which transformation is *impossible* without an activating reagent?
- [x] acetamide $\rightarrow$ ethyl acetate
- [ ] acetyl chloride $\rightarrow$ acetamide
- [ ] ethyl acetate $\rightarrow$ acetamide
- [ ] acetic anhydride $\rightarrow$ ethyl acetate
::: solution
Amide to ester is *uphill*: ethoxide would have to eject amide ion, and the ladder ($\mathrm{p}K_\mathrm{a}$ 38 for $\mathrm{NH_3}$ versus 16 for ethanol) forbids it — the acid must first be activated (to the chloride, or by DCC-type coupling). The other three all run downhill on the ladder with no help at all.
:::
:::

::: example Taming the reduction {#ex-dibal}
Give reagents for: (a) ethyl acetate → ethanol only; (b) ethyl acetate → acetaldehyde; (c) acetamide → ethylamine.
::: solution
(a) $\mathrm{LiAlH_4}$ then water: hydride adds, alkoxide leaves to give acetaldehyde, which — being an aldehyde — is reduced faster than the ester that made it, so both halves end as alcohols (the acetaldehyde never escapes; the ethoxy group leaves as ethanol). (b) DIBAL-H (diisobutylaluminium hydride), one equivalent, $-78\ \mathrm{^\circ C}$, then aqueous workup: the bulky aluminium hydride adds once and the tetrahedral intermediate, chelated to aluminium, is stable at low temperature; on workup it collapses to the aldehyde, which is removed from the reducing environment before it can go further. Stopping at an aldehyde is a temperature-and-workup trick, not a reagent's preference. (c) $\mathrm{LiAlH_4}$: amides reduce all the way to amines — the carbonyl oxygen is lost entirely ($\mathrm{C{=}O \rightarrow CH_2}$), because the intermediate iminium ion is reduced faster than anything else present. $\mathrm{NaBH_4}$ does none of these: esters and amides are too unreactive for it.
:::
:::

## Where this leads

Acyl substitution is the chemistry of the tetrahedral intermediate with a way out; remove the way out and you are back in [[organic-2/carbonyl-addition]], and turn the $\alpha$-carbon into the nucleophile instead and you enter [[organic-2/enols-enolates]] — whose condensations build the C–C bonds this family cannot. Ester and amide interconversion underlies protecting-group strategy throughout [[organic-2/amines]] and the peptide chemistry of the synthesis course, and the ladder's logic reappears, unchanged, in the biology of activated acyls (acyl-CoA is a thioester — a "high-energy" bond that is simply a good leaving group in disguise).

::: summary
- Acyl compounds ($\mathrm{RCOZ}$) undergo **addition–elimination**: the tetrahedral intermediate ejects $\mathrm{Z}$, so nucleophiles *substitute* at the acyl carbon instead of adding permanently.
- The reactivity ladder — acid chloride $>$ anhydride $>$ ester $\approx$ acid $>$ amide $\gg$ carboxylate — follows from leaving-group ability ($\mathrm{p}K_\mathrm{a}$ of $\mathrm{HZ}$) and ground-state donation by $\mathrm{Z}$, both maximised at the top and minimised at the bottom.
- Interconversions run downhill for free (acid chloride to anything; ester + amine to amide); uphill travel needs activation ($\mathrm{SOCl_2}$, DCC-type coupling).
- Base hydrolysis (saponification) is irreversible because the final proton transfer to carboxylate is a $10^{11}$-fold ratchet; acid hydrolysis/esterification is reversible and steered only by concentrations.
- Esters can cleave at either $\mathrm{C{-}O}$ bond: acyl cleavage is normal, but $t\mathrm{Bu}$/benzyl esters exploit alkyl cleavage — the basis of the $\mathrm{BOC}$ and benzyl protecting groups.
- Reductions read the ladder too: $\mathrm{LiAlH_4}$ takes esters to two alcohols and amides to amines; DIBAL-H at $-78\ \mathrm{^\circ C}$ stops esters at aldehydes; $\mathrm{NaBH_4}$ watches politely from the doorway.
:::

## Exercises

::: exercise Name and rank {level=1}
Rank butanoyl chloride, butanoic anhydride, methyl butanoate, butanamide and butanoate for reaction with ammonia, and name the functional group formed in each case.
::: solution
The ladder: butanoyl chloride $>$ butanoic anhydride $>$ methyl butanoate $>$ butanamide (unreactive to ammonia without catalysis) $\gg$ butanoate (inert). The product from the first three is the same: butanamide (ammonolysis of the chloride, anhydride or ester); the carboxylate needs activation before ammonia will make the amide at all.
:::
:::

::: exercise Reagent choice {level=1}
Choose from $\mathrm{SOCl_2}$, $\mathrm{HO^-/H_2O}$, $\mathrm{H_3O^+/H_2O}$, $\mathrm{CH_3NH_2}$: (a) propanoic acid → $N$-methylpropanamide (two steps); (b) ethyl propanoate → propanoic acid, irreversible; (c) propanamide → propanoate ion.
::: solution
(a) $\mathrm{SOCl_2}$ (acid → propanoyl chloride), then $\mathrm{CH_3NH_2}$ (downhill aminolysis). (b) $\mathrm{HO^-/H_2O}$ then acidic workup — saponification is the irreversible option; acid hydrolysis would equilibrate. (c) $\mathrm{HO^-/H_2O}$, heat: amide saponification delivers the carboxylate salt directly — under acid the product would be the free acid, so the ionic product identifies the basic conditions.
:::
:::

::: exercise Why is the amide so stubborn {level=1}
Give the two reasons, from the ladder's two factors, that acetamide hydrolyses a thousand-fold slower than ethyl acetate.
::: solution
(1) Leaving group: the tetrahedral intermediate would have to eject $\mathrm{NH_2^-}$/$\mathrm{NH_3}$ ($\mathrm{p}K_\mathrm{a}$ 38) instead of ethoxide ($\mathrm{p}K_\mathrm{a}$ 16) — a $10^{22}$-fold worse leaving group on the $\mathrm{p}K_\mathrm{a}$ scale, which the transition state only partly feels. (2) Ground state: nitrogen donates its lone pair into the carbonyl far better than oxygen, so the amide carbon is less electrophilic before any nucleophile arrives — the addition hump is raised as well as the elimination hump.
:::
:::

::: exercise Fischer bookkeeping {level=2}
For the esterification of acetic acid with methanol ($K = 4.0$), compute the ester yield from (a) equimolar acid and alcohol; (b) acid in methanol solution, $[\mathrm{MeOH}] = 5.0\ \mathrm{mol\,L^{-1}}$, $[\mathrm{AcOH}]_0 = 0.10\ \mathrm{mol\,L^{-1}}$.
::: solution
(a) $x^2/(1-x)^2 = 4$, $x/(1-x) = 2$, $x = 0.67$ — $67\ \%$. (b) Treat $[\mathrm{MeOH}] \approx 5.0\ \mathrm{mol\,L^{-1}}$ as constant (solvent), and start with no water: with $x$ = [ester] = [water], $K = x^2/(5.0(0.10-x)) = 4.0$, so $x^2 = 20(0.10 - x)$, $x^2 + 20x - 2 = 0$, $x = (-20 + \sqrt{408})/2 = 0.0995$ — $99.5\ \%$. Flooding the nucleophile converts a mediocre equilibrium into a preparative one; the alcohol's concentration folds into an effective constant, and starting water-free lets the product pair grow from zero.
:::
:::

::: exercise Protecting-group logic {level=2}
A peptide synthesis uses $\mathrm{BOC}$-protected amino acids with $t\mathrm{Bu}$ side-chain protection, removed with TFA (aqueous trifluoroacetic acid) while methyl esters stay on. Explain both behaviours from the cleavage-mechanism rule.
::: solution
$\mathrm{BOC}$ and $t\mathrm{Bu}$ esters carry a *tert*-butyl group: protonation of an oxygen is followed by **alkyl–oxygen cleavage** to the stable $t\mathrm{Bu^+}$, which loses a proton to isobutylene — an irreversible, acid-driven, cation-stabilised pathway, fast in TFA. A methyl ester has no such option: $\mathrm{CH_3^+}$ does not exist, so cleavage must be acyl–oxygen, requiring reversible addition of water to a weak electrophile under the mildly acidic, nearly anhydrous conditions — slow to negligible. Orthogonality of protecting groups is the difference between two cleavage mechanisms, and this pair is its textbook case.
:::
:::

::: exercise The thioester trick {level=2}
Acyl-CoA thioesters ($\mathrm{RCO{-}SCoA}$) are far more reactive towards amines and alcohols than oxygen esters, yet hydrolyse only slowly at neutral pH without enzyme. Reconcile both halves using the ladder's factors.
::: solution
More reactive because sulfur is a worse $\pi$-donor than oxygen (its $3p$ orbital overlaps the carbonyl $2p$ poorly), so the ground-state donation factor is reduced — the carbonyl is hungrier; and thiolate ($\mathrm{p}K_\mathrm{a}$ of RSH $\approx 10$) is a better leaving group than alkoxide ($\mathrm{p}K_\mathrm{a}$ 16), a $10^6$-fold advantage. Slow at neutral pH because the leaving group must depart as *thiolate*, and at $\mathrm{pH}\ 7$ a thiolate leaving an unactivated ester still faces the addition hump with water, a weak nucleophile — the ladder ranks the *intermediate's* collapse, but water's addition is still the gate. Enzymes supply general acid/base catalysis and proximity; biology's "high-energy bond" is an ordinary thioester, promoted up the ladder by chemistry and exploited by enzymes.
:::
:::

::: exercise Reduction selectivity {level=3}
Methyl 4-acetylbenzoate bears a ketone and an ester. Give reagents to convert (a) only the ketone to an alcohol; (b) only the ester to an aldehyde (keep the ketone); (c) both to their fully reduced forms.
::: solution
(a) $\mathrm{NaBH_4}$, mild: ketones add hydride readily, esters are below its strength — the ladder's selectivity is a reagent's selectivity. (b) The hard one: DIBAL-H at $-78\ \mathrm{^\circ C}$ still prefers the ketone, so protect the ketone first as its acetal (diol, trace acid — ketone acetals are sluggish but the ester is untouched), reduce the ester with DIBAL-H/$-78\ \mathrm{^\circ C}$, then unmask the ketone with aqueous acid, which also hydrolyses nothing else. (c) Excess $\mathrm{LiAlH_4}$: ketone → $2^\circ$ alcohol, ester → alcohol (via the aldehyde that never escapes) — one flask, both rungs reduced.
:::
:::

::: exercise The isotope tells {level=3 hint="Track where the label must sit for each cleavage mode; the answer is which bond breaks"}
Methanol labelled with $^{18}\mathrm{O}$ ($\mathrm{CH_3^{18}OH}$) is esterified with benzoic acid under acid catalysis. The isolated methyl benzoate contains the $^{18}\mathrm{O}$ label, and the water formed is unlabelled. Which $\mathrm{C{-}O}$ bond of the (protonated) acid breaks — acyl–oxygen or alkyl–oxygen — and what does this prove about the mechanism?
::: solution
**Acyl–oxygen** cleavage of the acid's own $\mathrm{C{-}OH}$: the label enters as the methanol oxygen and stays bonded to the carbonyl carbon, so the acid loses *its* hydroxyl oxygen to the water. That is only possible if the reaction proceeds by addition of labelled methanol to the carbonyl, then loss of the acid's $\mathrm{OH}$ (as water) from the tetrahedral intermediate — the addition–elimination mechanism with acyl–oxygen cleavage. Alkyl–oxygen cleavage (methanol losing its oxygen to the acyl group) would put the label in the water, not the ester. The isotope is a direct read-out of which bonds break, the same logic that settled ester hydrolysis mechanisms a century ago.
:::
:::
