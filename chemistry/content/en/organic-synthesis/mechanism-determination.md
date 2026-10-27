Every curly arrow in a textbook is a claim. When we write that hydroxide hydrolyses an ester by attacking the carbonyl carbon, forming a tetrahedral intermediate that expels an alkoxide, we are asserting which bond breaks, in what order things happen, and which species exist along the way — none of which anyone has watched directly. How do we know? Why do we believe that an ester cleaves between the acyl carbon and oxygen rather than between oxygen and the alkyl group, that an $\mathrm{S_N2}$ reaction inverts its stereocentre, or that nitration of benzene passes through a cationic σ-complex?

The answer is that a mechanism is a **hypothesis** tested by experiments designed to rule out its alternatives. No single experiment proves a mechanism; a good mechanism is the simplest one consistent with *all* the evidence, and it stays provisional. For a synthetic chemist this is not academic. Knowing which step is slow tells you what to change to make a reaction faster; knowing whether an intermediate is a cation, a radical or a carbanion tells you which side reactions to expect; knowing the stereochemical course tells you which isomer you will get. This chapter assembles the main kinds of evidence — **kinetics and activation parameters, isotopic labelling and kinetic isotope effects, substituent effects and the Hammett equation, the detection and trapping of intermediates, and stereochemical probes** — and shows how each is used to discriminate between mechanisms. The kinetic foundations (rate laws, the steady-state approximation, transition-state theory) are developed in [[kinetics/rate-laws]], [[kinetics/reaction-mechanisms]] and [[kinetics/transition-state-theory]]; here we apply them to organic reactions.

## What a mechanism is, and how it is tested {#sec-what}

::: definition Reaction mechanism {#def-mechanism}
A **mechanism** is a sequence of **elementary steps** — each a single molecular event with one transition state — whose sum is the overall reaction. A complete description specifies every intermediate (a species at a local energy minimum, however short-lived), the order of bond making and breaking in each step, the **rate-determining step** (or, more precisely, the transition state of highest Gibbs energy relative to the resting state), the geometry and charge distribution of the key transition states, and the stereochemical course.
:::

The logic of testing follows from the definition. Each candidate mechanism makes predictions — a rate law, an isotope distribution, a stereochemical outcome, a response to substituents — and an experiment is useful exactly to the extent that the candidates predict *different* outcomes.

::: algorithm Testing a proposed mechanism {#alg-test}
1. **Establish the stoichiometry and products** completely, including minor products and by-products; a mechanism must account for all of them.
2. **List the plausible mechanisms**, each as a sequence of elementary steps consistent with known chemistry.
3. **For each, derive its predictions**: the rate law (steady-state or pre-equilibrium approximations), the fate of labelled atoms, the expected isotope effects, the sign and size of the Hammett $\rho$, the activation entropy, and the stereochemistry.
4. **Design experiments that discriminate**: choose those for which the predictions differ most. Run controls (does the product isomerise under the conditions? does the label scramble without reaction?).
5. **Reject mechanisms contradicted by the results.** Keep the simplest survivor, and look for an independent test of its most surprising feature (detect or trap the intermediate it postulates).
:::

## Kinetics: who is in the transition state {#sec-kinetics}

The rate law is usually the first piece of evidence. Its meaning is precise and limited.

::: proposition The rate law gives the composition of the rate-determining transition state {#prop-rate-law}
For a reaction with a single rate-determining step preceded by equilibria, the experimental rate law $v = k_\mathrm{obs}\prod_i[\mathrm{X}_i]^{n_i}$ shows that the transition state of the rate-determining step has the composition of the **resting state** (the predominant form of the reactants) plus $\sum_i n_i \mathrm{X}_i$, minus any species whose concentration appears to a negative power. The rate law says nothing about the order in which these atoms were assembled, nor about any steps after the rate-determining one.
:::

::: proof
Suppose the rate-determining step is $\mathrm{I + Y} \rightarrow \text{products}$ with rate constant $k$, where I is formed in a fast pre-equilibrium $\mathrm{A + B \rightleftharpoons I + C}$ with equilibrium constant $K$. Then $[\mathrm{I}] = K[\mathrm{A}][\mathrm{B}]/[\mathrm{C}]$ and
$$
v = k[\mathrm{I}][\mathrm{Y}] = kK\frac{[\mathrm{A}][\mathrm{B}][\mathrm{Y}]}{[\mathrm{C}]}.
$$
The transition state of the slow step contains $\mathrm{I + Y} = \mathrm{A + B + Y - C}$: exactly the species in the numerator minus those in the denominator. Any other sequence of pre-equilibria leading to the same transition state gives the same rate law, because only the overall Gibbs energy difference between the resting state and the transition state enters $k_\mathrm{obs}$ (transition-state theory, [[kinetics/transition-state-theory]]); that is why a rate law cannot reveal the order of assembly. Steps after the slow step do not affect the rate and so leave no trace in the rate law. $\blacksquare$
:::

Classic examples: the hydrolysis of 2-bromo-2-methylpropane in aqueous acetone has $v = k[\mathrm{RBr}]$, independent of added hydroxide — the rate-determining transition state contains only the substrate (and solvent), consistent with **$\mathrm{S_N1}$** ionisation. Bromomethane with hydroxide gives $v = k[\mathrm{RBr}][\mathrm{OH^-}]$ — both are in the transition state, consistent with **$\mathrm{S_N2}$**. The acid-catalysed bromination of acetone has $v = k[\mathrm{acetone}][\mathrm{H^+}]$, *zero order in bromine*: bromine enters after the rate-determining step, which must therefore be the formation of the enol. Iodination and chlorination under the same conditions proceed at the same rate — a striking confirmation that the halogen is not involved in the slow step.

### Activation parameters

Measuring $k$ at several temperatures gives the enthalpy and entropy of activation through the Eyring equation,
$$
k = \frac{k_\mathrm{B}T}{h}\exp\!\left(\frac{\Delta S^\ddagger}{R}\right)\exp\!\left(-\frac{\Delta H^\ddagger}{RT}\right),
$$ {#eq-eyring}
so a plot of $\ln(k/T)$ against $1/T$ has slope $-\Delta H^\ddagger/R$ and intercept $\ln(k_\mathrm{B}/h) + \Delta S^\ddagger/R$ (for a second-order reaction $k$ is in $\mathrm{dm^3\,mol^{-1}\,s^{-1}}$, and $\Delta S^\ddagger$ then refers to a standard state of $1\ \mathrm{mol\,dm^{-3}}$). The **entropy of activation** is a diagnostic of order: when two molecules combine into one transition state, translational and rotational freedom is lost and $\Delta S^\ddagger$ is strongly negative ($-100$ to $-180\ \mathrm{J\,K^{-1}\,mol^{-1}}$ for Diels–Alder reactions); a unimolecular reaction through a cyclic transition state (a Claisen or Cope rearrangement) loses internal rotations and has a moderately negative $\Delta S^\ddagger$ (about $-30$ to $-60$); a fragmentation in which one molecule loosens into two has $\Delta S^\ddagger$ near zero or positive. In polar solvents, charge separation in the transition state orders solvent molecules and also makes $\Delta S^\ddagger$ more negative — a complication to remember.

::: example Activation parameters of a cycloaddition {#ex-eyring}
A Diels–Alder reaction has second-order rate constants $2.0\times10^{-5}\ \mathrm{dm^3\,mol^{-1}\,s^{-1}}$ at $298.15\ \mathrm{K}$ and $1.0\times10^{-4}\ \mathrm{dm^3\,mol^{-1}\,s^{-1}}$ at $323.15\ \mathrm{K}$. Calculate $\Delta H^\ddagger$ and $\Delta S^\ddagger$ and comment.
::: solution
From [[#eq-eyring]], for two temperatures,
$$
\Delta H^\ddagger = R\,\frac{\ln\!\big[(k_2/T_2)/(k_1/T_1)\big]}{1/T_1 - 1/T_2} = 8.314 \times \frac{\ln\!\big[(1.0\times10^{-4}/323.15)/(2.0\times10^{-5}/298.15)\big]}{1/298.15 - 1/323.15}\ \mathrm{J\,mol^{-1}}.
$$
The ratio inside the logarithm is $5.0 \times 298.15/323.15 = 4.613$, $\ln 4.613 = 1.529$; the denominator is $2.595\times10^{-4}\ \mathrm{K^{-1}}$. So $\Delta H^\ddagger = 8.314 \times 1.529/2.595\times10^{-4} = 4.90\times10^{4}\ \mathrm{J\,mol^{-1}} = 49.0\ \mathrm{kJ\,mol^{-1}}$. Then, at $298.15\ \mathrm{K}$,
$$
\Delta S^\ddagger = R\left[\ln\frac{kh}{k_\mathrm{B}T} + \frac{\Delta H^\ddagger}{RT}\right] = 8.314\,[-40.28 + 19.77] = -171\ \mathrm{J\,K^{-1}\,mol^{-1}}.
$$
The large negative entropy of activation fits a highly ordered transition state in which two molecules are joined at both ends at once — as the concerted mechanism of [[organic-synthesis/pericyclic]] requires. It is also why Diels–Alder reactions become less favourable at high temperature, where the $-T\Delta S$ term grows. (Two-point Eyring analyses are sensitive to error; in practice one uses five or more temperatures.)
:::
:::

## Isotopes: labels and isotope effects {#sec-isotopes}

### Labelling: following atoms

Replacing an atom by an isotope ($^2\mathrm{H}$, $^{13}\mathrm{C}$, $^{14}\mathrm{C}$, $^{18}\mathrm{O}$, $^{15}\mathrm{N}$) changes almost nothing chemically but makes the atom traceable by NMR, mass spectrometry or radioactivity. Three classic cases:

- **Ester hydrolysis.** In 1934 Michael Polanyi and A. L. Szabo hydrolysed pentyl acetate in $^{18}\mathrm{O}$-enriched water and found the label in the acetic acid, not in the pentanol. The water oxygen therefore becomes attached to the acyl carbon, and the bond that breaks is acyl–O, not alkyl–O — as the addition–elimination mechanism of [[organic-2/carboxylic-derivatives]] requires. Esters of tertiary alcohols under acid conditions behave differently: they cleave at the alkyl–O bond, through the stable tertiary carbocation.
- **Benzyne.** In 1953 John D. Roberts and co-workers treated chlorobenzene labelled with $^{14}\mathrm{C}$ at C1 with potassium amide in liquid ammonia. The aniline formed had the label very nearly equally at C1 (the carbon bearing $\mathrm{NH_2}$) and C2. A direct substitution would put all the label at C1; an elimination to a symmetrical intermediate, **benzyne** ($\mathrm{C_6H_4}$, a "triple bond" in the ring), followed by addition of amide to either end, distributes it equally.
- **Exchange tests.** Recovering unreacted starting material and checking it for incorporated deuterium reveals reversible steps: for example, if an α-C–H exchanges with $\mathrm{D_2O}$ faster than the overall reaction, enolate formation is reversible and is not rate-determining.

A related tool is the **crossover experiment**. To decide whether a rearrangement is intramolecular, one heats a mixture of two substrates labelled differently (say, one carrying deuterium on the migrating group and one carrying a methyl group on the ring). If the groups never leave their molecule, only the two "parent" products form; if they separate and recombine, "crossed" products appear. The Claisen rearrangement of allyl aryl ethers gives no crossover products, supporting a concerted, intramolecular [3,3] shift ([[organic-synthesis/pericyclic]]).

### Kinetic isotope effects

Isotopes change rates when a bond to the isotopic atom changes in the rate-determining step. The effect is largest for hydrogen, whose mass doubles on going to deuterium.

::: definition Primary and secondary kinetic isotope effects {#def-kie}
The **kinetic isotope effect** (KIE) is the ratio $k_\mathrm{H}/k_\mathrm{D}$ of rate constants for isotopically substituted reactants. It is **primary** when the bond to the isotopic atom is broken or formed in the rate-determining step (typically $k_\mathrm{H}/k_\mathrm{D} = 2$–$8$ at room temperature), and **secondary** when it is not, the isotope sitting next to the reacting centre (typically $0.8$–$1.4$; values above 1 are "normal", below 1 "inverse"). An effect is measured either by comparing separate rate constants or by **competition**, letting a partly deuterated substrate react and analysing the H/D ratio of product or recovered starting material.
:::

::: proposition Zero-point origin of the primary isotope effect {#prop-kie}
If a C–H (or C–D) stretching vibration of wavenumber $\tilde\nu$ in the reactant becomes the motion along the reaction coordinate in the transition state, and all other vibrations are unchanged, then
$$
\frac{k_\mathrm{H}}{k_\mathrm{D}} = \exp\!\left[\frac{hc\,(\tilde\nu_\mathrm{H} - \tilde\nu_\mathrm{D})}{2k_\mathrm{B}T}\right], \qquad \tilde\nu_\mathrm{D} \approx \frac{\tilde\nu_\mathrm{H}}{\sqrt{2}}.
$$ {#eq-kie}
With $\tilde\nu_\mathrm{H} = 3000\ \mathrm{cm^{-1}}$ and $\tilde\nu_\mathrm{D} = 2200\ \mathrm{cm^{-1}}$ (the observed C–D stretch), $k_\mathrm{H}/k_\mathrm{D} \approx 6.9$ at $298\ \mathrm{K}$: the "semiclassical maximum" for C–H cleavage. The estimate assumes no tunnelling and no compensating bending or transition-state vibrations.
:::

::: proof
In the harmonic approximation a vibration of wavenumber $\tilde\nu$ has zero-point energy $\tfrac12 hc\tilde\nu$, and $\tilde\nu \propto \sqrt{k_\mathrm{f}/\mu}$ with $k_\mathrm{f}$ the force constant (identical for both isotopes in the Born–Oppenheimer approximation) and $\mu$ the reduced mass. For C–H, $\mu \approx m_\mathrm{H}$ because carbon is much heavier, so $\tilde\nu_\mathrm{D} \approx \tilde\nu_\mathrm{H}/\sqrt2$; the exact reduced masses give a ratio of $0.73$ rather than $0.71$. The C–D bond therefore sits lower in its potential well by $\tfrac12 hc(\tilde\nu_\mathrm{H} - \tilde\nu_\mathrm{D})$ per molecule. If, at the transition state, this stretch has become the translation along the reaction coordinate, it has no restoring force and no zero-point energy for either isotope. The barrier for D is therefore higher by the reactant ZPE difference: $\Delta\Delta H^\ddagger = \tfrac12 N_\mathrm{A}hc(\tilde\nu_\mathrm{H} - \tilde\nu_\mathrm{D})$, with the entropy terms nearly equal. Transition-state theory then gives $k_\mathrm{H}/k_\mathrm{D} = \exp(\Delta\Delta H^\ddagger/RT)$, which is [[#eq-kie]]. Numerically $hc/k_\mathrm{B} = 1.4388\ \mathrm{cm\,K}$, so with $\tilde\nu_\mathrm{H} - \tilde\nu_\mathrm{D} = 800\ \mathrm{cm^{-1}}$ the exponent at $298.15\ \mathrm{K}$ is $1.4388 \times 400/298.15 = 1.930$, and $e^{1.930} = 6.9$. $\blacksquare$
:::

Frank Westheimer pointed out in 1961 that the primary KIE is largest when the hydrogen is transferred in a **symmetrical** transition state (equally bonded to donor and acceptor), because then the symmetric stretch of the three-centre unit does not move the hydrogen and carries no isotope-dependent zero-point energy; for very early or very late transition states some ZPE is retained and the KIE is smaller. Values much larger than about 7–10 at room temperature indicate **quantum tunnelling** of the hydrogen through the barrier, which is more important for H than D because of its smaller mass.

::: widget plot
f: exp(1.4388*d/x)
x: 200, 600
y: 1, 15
sliders: d=400:50:600:10
labels: k_\mathrm{H}/k_\mathrm{D}
caption: The semiclassical primary isotope effect $k_\mathrm{H}/k_\mathrm{D} = \exp(hc\,d/k_\mathrm{B}T)$ against temperature $T$ (K), where $d = \tfrac12(\tilde\nu_\mathrm{H} - \tilde\nu_\mathrm{D})$ is the zero-point energy difference in $\mathrm{cm^{-1}}$ ([[#eq-kie]]). For a C–H stretch ($d \approx 400\ \mathrm{cm^{-1}}$) the effect is $6.9$ at $298\ \mathrm{K}$, falling to about $3.6$ at $450\ \mathrm{K}$: isotope effects shrink as temperature rises, because $k_\mathrm{B}T$ becomes large compared with the zero-point difference. An O–H or N–H stretch ($d \approx 450$–$500\ \mathrm{cm^{-1}}$) gives somewhat larger maximum effects. Observed values well above this curve signal tunnelling.
:::

Isotope effects are used in two directions. A **large primary KIE** shows that a C–H bond breaks in the rate-determining step: the E2 elimination of 2-phenylethyl bromide with ethoxide, for example, has $k_\mathrm{H}/k_\mathrm{D} \approx 7$ for deuterium on the carbon adjacent to the ring, consistent with C–H cleavage concerted with loss of bromide, whereas an E1 reaction, in which the C–H bond breaks after the slow ionisation, shows only a small secondary effect. The **absence** of a KIE shows that C–H cleavage is *not* rate-determining, even if it certainly happens: in 1950 Lars Melander found that tritiated benzene is nitrated at the same rate as ordinary benzene. In electrophilic aromatic substitution ([[organic-2/aromatic-substitution]]) the C–H bond breaks, but only in the fast step after the rate-determining formation of the σ-complex (Wheland intermediate).

**Secondary** effects probe changes of hybridisation. When a carbon goes from $sp^3$ to $sp^2$ in the rate-determining step (ionisation in $\mathrm{S_N1}$), its C–H out-of-plane bending vibrations loosen, and an α-deuterium gives a normal effect of about $1.1$–$1.25$ per D; in $\mathrm{S_N2}$ reactions, where the carbon remains five-coordinate and crowded, the α-effect is close to $1.0$ or slightly inverse. $sp^2 \rightarrow sp^3$ (nucleophilic addition to a carbonyl) gives inverse effects, about $0.8$–$0.9$.

::: example Bromination of acetone {#ex-acetone}
The acid-catalysed bromination of acetone is zero order in $\mathrm{Br_2}$, and acetone-$d_6$ reacts several times more slowly than acetone. What do these two facts establish, and what elementary step is rate-determining? Describe it in words.
::: solution
Zero order in bromine ([[#prop-rate-law]]) means bromine is not in the rate-determining transition state; first order in acetone and $\mathrm{H^+}$ means that transition state contains acetone plus a proton. The large primary isotope effect shows that a C–H bond to an α-carbon is broken in that step. Together they identify the slow step as **enolisation** of the protonated ketone: a fast pre-equilibrium protonates the carbonyl oxygen (one oxygen lone pair takes up $\mathrm{H^+}$), then, in the slow step, a water molecule removes an α-proton, the C–H electrons forming the C=C π bond while the C=O π electrons move onto the positively charged oxygen, giving the neutral enol. In the fast steps that follow, the enol's π bond attacks $\mathrm{Br_2}$, the Br–Br bond breaking to release bromide, and loss of the proton from oxygen gives bromoacetone. The same mechanism predicts equal rates for chlorination, bromination and iodination, which is observed.
:::
:::

## Substituent effects: the Hammett equation {#sec-hammett}

A different approach is to change the molecule slightly, at a distance from the reacting centre, and see how the rate responds. Louis Hammett showed in 1937 that for reactions at a side chain of a benzene ring, *meta* and *para* substituents change $\log k$ in a way that is proportional, from one reaction to another.

::: definition Hammett substituent and reaction constants {#def-hammett}
The **substituent constant** $\sigma_\mathrm{X}$ of a *meta* or *para* substituent X is defined from the ionisation constants of substituted benzoic acids in water at $25\ ^\circ\mathrm{C}$:
$$
\sigma_\mathrm{X} = \log_{10}\frac{K_\mathrm{a}(\mathrm{X{-}C_6H_4CO_2H})}{K_\mathrm{a}(\mathrm{C_6H_5CO_2H})}.
$$
Positive $\sigma$ means electron-withdrawing (it stabilises the carboxylate), negative $\sigma$ electron-donating. Some values, $\sigma_p$: $\mathrm{NO_2}$ $0.78$, $\mathrm{CN}$ $0.66$, $\mathrm{CO_2Et}$ $0.45$, Cl $0.23$, H $0$, $\mathrm{CH_3}$ $-0.17$, $\mathrm{OCH_3}$ $-0.27$, $\mathrm{NMe_2}$ $-0.83$; $\sigma_m$: $\mathrm{NO_2}$ $0.71$, Cl $0.37$, $\mathrm{OCH_3}$ $0.12$, $\mathrm{CH_3}$ $-0.07$.
:::

::: proposition The Hammett equation (empirical) {#prop-hammett}
For a reaction series of *meta*- and *para*-substituted benzene derivatives reacting by a common mechanism,
$$
\log_{10}\frac{k_\mathrm{X}}{k_\mathrm{H}} = \rho\,\sigma_\mathrm{X},
$$ {#eq-hammett}
where the **reaction constant** $\rho$ depends on the reaction and conditions but not on the substituent. Equivalently $\Delta\Delta G^\ddagger = -2.303RT\rho\sigma$: substituents change the activation Gibbs energy in proportion to their effect on benzoic acid ionisation. The relation is a **linear free-energy relationship**, empirical in origin; it fails for *ortho* substituents (steric effects) and when the mechanism changes along the series.
:::

The sign and magnitude of $\rho$ are mechanistic information:

- $\rho > 0$: **negative charge builds up** (or positive charge is lost) near the ring in the transition state, relative to the reactant. Alkaline hydrolysis of ethyl benzoates has $\rho \approx +2.5$: hydroxide adds to the carbonyl carbon, and the forming tetrahedral alkoxide is stabilised by electron-withdrawing groups.
- $\rho < 0$: **positive charge builds up**. Solvolysis of 2-aryl-2-chloropropanes (cumyl chlorides), which ionise to benzylic cations, has $\rho \approx -4.5$.
- $|\rho|$ measures how much charge develops and how close it is to the ring: $\rho = 1$ by definition for benzoic acid ionisation, where a full negative charge appears one atom away from the ring carbon.

When a positive charge is in direct conjugation with a *para* donor (OMe, $\mathrm{NMe_2}$), the donor stabilises it by resonance much more than it stabilises benzoate, and ordinary $\sigma_p$ underestimates the effect. Herbert C. Brown and Yasuhiro Okamoto (1957–58) defined **$\sigma^+$** from the cumyl chloride solvolysis itself ($\sigma_p^+$: OMe $-0.78$, $\mathrm{CH_3}$ $-0.31$, Cl $0.11$, $\mathrm{NO_2}$ $0.79$); analogous $\sigma^-$ values apply when a negative charge is conjugated with a *para* acceptor (phenoxides, anilines). Whether a series correlates better with $\sigma$ or with $\sigma^+$ is itself evidence of direct conjugation with a cationic centre.

::: widget regression
points: 0.78,1.95; 0.66,1.70; 0.45,1.08; 0.23,0.60; 0,0; -0.17,-0.45; -0.27,-0.66
degree: 1
residuals: true
x: -0.5, 1
y: -1.5, 2.5
caption: A Hammett plot of $\log_{10}(k_\mathrm{X}/k_\mathrm{H})$ against $\sigma_p$ for a constructed data set resembling the alkaline hydrolysis of ethyl 4-substituted benzoates (substituents, right to left: $\mathrm{NO_2}$, $\mathrm{CN}$, $\mathrm{CO_2Et}$, Cl, H, $\mathrm{CH_3}$, $\mathrm{OCH_3}$). The least-squares slope is the reaction constant, here close to $\rho = +2.5$, and the intercept is close to zero, as [[#eq-hammett]] requires. Drag a point, for example the *para*-methoxy point upwards: a single compound off the line is often a sign that it reacts by a different mechanism (or that its $\sigma$ is the wrong kind), and a curved or broken plot is evidence for a change in mechanism or rate-determining step across the series.
:::

::: example Finding and interpreting ρ {#ex-rho}
For a reaction of 4-substituted aryl compounds, the relative rate constants give $\log_{10}(k_\mathrm{X}/k_\mathrm{H}) = 1.95$ (NO₂), $0.60$ (Cl), $0$ (H), $-0.45$ (CH₃) and $-0.66$ (OCH₃). Find $\rho$ by least squares, state what it implies, and calculate by how much a 4-nitro group lowers $\Delta G^\ddagger$ at $298\ \mathrm{K}$.
::: solution
With $\sigma_p = 0.78, 0.23, 0, -0.17, -0.27$: $\bar\sigma = 0.114$, $\bar y = 0.288$; $\sum(\sigma - \bar\sigma)(y - \bar y) = 1.7495$ and $\sum(\sigma - \bar\sigma)^2 = 0.6981$, so
$$
\rho = \frac{1.7495}{0.6981} = +2.51,
$$
with an intercept of $0.002$ (essentially zero). A positive $\rho$ of about $2.5$ means substantial negative charge develops near the ring in the rate-determining transition state — as in nucleophilic addition of hydroxide to an ester carbonyl group, where the charge sits on the carbonyl oxygen two atoms from the ring. For 4-nitro:
$$
\Delta\Delta G^\ddagger = -2.303RT \times 1.95 = -2.303 \times 8.314 \times 298.15 \times 1.95\ \mathrm{J\,mol^{-1}} = -11.1\ \mathrm{kJ\,mol^{-1}},
$$
an 89-fold acceleration ($10^{1.95}$).
:::
:::

::: example σ or σ⁺? {#ex-sigma-plus}
Cumyl chloride solvolysis in 90 % aqueous acetone has $\rho^+ = -4.54$. Predict the rate enhancement for the 4-methoxy compound using (a) $\sigma_p^+ = -0.78$ and (b) the ordinary $\sigma_p = -0.27$. The observed value is in the thousands. What does that tell us?
::: solution
(a) $\log_{10}(k/k_\mathrm{H}) = -4.54 \times (-0.78) = 3.54$, so $k/k_\mathrm{H} = 10^{3.54} \approx 3.5\times10^{3}$. (b) $-4.54 \times (-0.27) = 1.23$, $k/k_\mathrm{H} = 17$. The observed acceleration agrees with (a) (indeed $\sigma^+$ was defined from this reaction): the methoxy oxygen's lone pair conjugates directly with the developing benzylic cation, donating electron density through the ring into the empty $p$ orbital of the cationic carbon, which benzoate cannot benefit from. The large negative $\rho^+$ and the need for $\sigma^+$ together are the fingerprint of a carbocation-like transition state — evidence for an $\mathrm{S_N1}$ mechanism.
:::
:::

## Intermediates: detecting and trapping {#sec-intermediates}

If a mechanism postulates an intermediate, the most convincing test is to see it, or to catch it.

**Direct observation.** Long-lived intermediates can be seen by NMR, IR or UV–vis spectroscopy, sometimes at low temperature. George Olah's work in the 1960s, ionising alkyl fluorides in "superacid" media ($\mathrm{SbF_5}$ in $\mathrm{SO_2ClF}$ or $\mathrm{SO_2}$) at low temperature, produced persistent carbocations whose NMR spectra could be recorded — the *tert*-butyl cation shows a single methyl signal at about δ 4.1 in the ¹H spectrum, and a cationic carbon near δ 335 in the ¹³C spectrum. Short-lived intermediates are observed by fast methods (flash photolysis, stopped flow) or by EPR for radicals ([[spectroscopy/epr]]).

**Trapping.** An added reagent that reacts rapidly and specifically with the proposed intermediate diverts it into a characteristic product. Georg Wittig trapped benzyne with furan (1955–56): the Diels–Alder adduct, 1,4-dihydro-1,4-epoxynaphthalene, is formed only if benzyne is present. Radicals are trapped by TEMPO or by spin traps for EPR; carbocations by added nucleophiles such as azide (the "azide clock"). A good trapping experiment also shows that the trap does not alter the rate of disappearance of the starting material (if the intermediate is formed in the rate-determining step).

**Competition and clocks.** When an intermediate can undergo a unimolecular reaction of known rate constant (a "clock") or be trapped, the product ratio measures its lifetime. The ring opening of the cyclopropylmethyl radical and the cyclisation of the hex-5-enyl radical are **radical clocks** used in [[organic-synthesis/rearrangements-radicals]].

::: example Benzyne or addition–elimination? {#ex-benzyne}
4-Chlorotoluene reacts with sodium amide in liquid ammonia to give a mixture of 3- and 4-methylaniline, whereas 1-chloro-4-nitrobenzene reacts with sodium methoxide in methanol to give only 1-methoxy-4-nitrobenzene. Propose a mechanism for each and explain the difference in regiochemistry.
::: solution
**4-Chlorotoluene / amide: elimination–addition.** The very strong base removes the ring proton *ortho* to Cl (the most acidic, because of chlorine's inductive withdrawal): the C–H electrons stay on carbon as an aryl anion. That carbanion's lone pair then expels chloride from the adjacent carbon, forming a new π bond in the plane of the ring — 4-methylbenzyne, with the strained "triple bond" between C3 and C4. Amide adds to either end of this bond: attack at C4 (the carbon that bore Cl) gives the anion at C3 and, after protonation by ammonia, 4-methylaniline; attack at C3 gives 3-methylaniline. Both form because the methyl group barely distinguishes the two ends. This is the result Roberts's $^{14}\mathrm{C}$ label demanded for chlorobenzene, and the furan trap would intercept the aryne.

**1-Chloro-4-nitrobenzene / methoxide: addition–elimination ($\mathrm{S_NAr}$).** Methoxide's lone pair attacks C1 (bearing Cl) from above the ring plane; the ring π electrons move onto the ring and, through conjugation, onto the oxygen atoms of the *para* nitro group, giving an anionic σ-adduct (a **Meisenheimer complex**). The negative charge then returns into the ring, re-forming aromaticity, and the C–Cl bond breaks with chloride leaving. The nucleophile ends up exactly where the leaving group was. Evidence: the reaction requires electron-withdrawing groups *ortho* or *para* to the leaving group (large positive $\rho$), fluoride is the best leaving group (because the addition, not the C–X cleavage, is rate-determining), and stable Meisenheimer salts can be isolated from very electron-poor rings.
:::
:::

## Stereochemical probes {#sec-stereo}

Stereochemistry records the geometry of the transition state in the product.

- **Inversion in $\mathrm{S_N2}$.** In 1935 Edward Hughes, Christopher Ingold and co-workers treated optically active 2-iodooctane with radioactive iodide in acetone and measured both the rate of incorporation of the radioactive label and the rate of loss of optical activity. Racemisation was **twice** as fast as exchange. If every substitution inverts the configuration, each event converts one *R* molecule into one *S* molecule; one exchange thus destroys the optical activity of two molecules (the one inverted and the one it now cancels), so $k_\mathrm{rac} = 2k_\mathrm{exch}$. Retention or a random outcome would give different ratios. The experiment is the foundation of the backside-attack picture of [[organic-1/nucleophilic-substitution]].
- **Anti-periplanar E2.** Menthyl chloride, in which the only β-hydrogen anti-periplanar to the axial chlorine (in the reactive conformation) is on C2, gives only menth-2-ene with ethoxide; its diastereomer neomenthyl chloride, with axial Cl in the more stable chair and anti-periplanar hydrogens on both C2 and C4, gives mainly the more substituted menth-3-ene (about 78:22). The products are dictated by geometry, not by alkene stability alone ([[organic-1/elimination]]).
- **Anti addition of bromine.** (*E*)-But-2-ene gives *meso*-2,3-dibromobutane and (*Z*)-but-2-ene the racemic dibromide: the two bromine atoms add to opposite faces, ruling out a free open carbocation (which would rotate and scramble) and supporting a bridged **bromonium ion** opened from the back by bromide.
- **Stereospecific pericyclic reactions.** The suprafacial addition in the Diels–Alder reaction — *cis* substituents on the dienophile stay *cis* in the product — supports a concerted mechanism in which both new bonds form in one step ([[organic-synthesis/pericyclic]]).

::: quiz
Which conclusions are justified by the observation that nitration of $\mathrm{C_6H_5T}$ shows no tritium isotope effect?
- [x] The C–H(T) bond is not broken in the rate-determining step.
- [x] The rate-determining step is formation of the σ-complex (or an earlier step), with proton loss fast afterwards.
- [ ] The C–H bond is never broken during nitration.
- [ ] Nitration must be a radical reaction.
::: solution
The absence of a primary KIE means the bond to the isotope is not broken in the transition state that controls the rate. It is certainly broken eventually — the product has lost the hydrogen — but in a fast step after the rate-determining attack of $\mathrm{NO_2^+}$ on the ring. Nothing about the result points to radicals.
:::
:::

::: warning Consistent is not proven {#warn-proof}
Mechanistic arguments go wrong in predictable ways. (1) **A rate law does not fix the mechanism**: many mechanisms give the same rate law, and a rate law says nothing about steps after the slow one ([[#prop-rate-law]]). (2) **Absence of evidence is weak evidence**: failure to trap an intermediate may mean the trap is too slow; no KIE may mean the C–H cleavage is not rate-determining, not that it does not happen. (3) **The trap can create what it catches**: a radical trap that initiates a radical chain, or a nucleophile that changes the mechanism, can mislead. (4) **Products can isomerise after they form**: always check that the product distribution is the kinetic one by subjecting the product to the reaction conditions. (5) **Correlation within a series assumes a single mechanism**: a Hammett plot that is linear over a narrow range of σ may hide a change of mechanism. A mechanism is accepted when several independent lines of evidence agree, and it remains open to revision.
:::

::: history
The modern study of organic mechanisms began in the 1920s and 1930s. Arthur Lapworth (1903–04) had already proposed that acetone bromination goes through the enol, on kinetic grounds. Christopher Ingold and Edward Hughes, at University College London, established the $\mathrm{S_N1}$/$\mathrm{S_N2}$ and E1/E2 classification through kinetics and stereochemistry in the 1930s, including the 1935 radioiodide experiment; Ingold's *Structure and Mechanism in Organic Chemistry* (1953) summarised the programme. Michael Polanyi and A. L. Szabo's $^{18}\mathrm{O}$ study of ester hydrolysis appeared in 1934, and Louis Hammett's linear free-energy relationship in the *Journal of the American Chemical Society* in 1937, followed by his book *Physical Organic Chemistry* (1940). Jacob Bigeleisen and Maria Goeppert Mayer laid the statistical-mechanical foundations of isotope effects in 1947–49, Lars Melander's absence of an isotope effect in nitration followed in 1950, and Frank Westheimer's analysis of the transition-state dependence of KIEs in 1961. John D. Roberts's $^{14}\mathrm{C}$ evidence for benzyne (1953) and George Olah's persistent carbocations (1960s; Nobel Prize 1994) gave direct evidence for intermediates that had been only postulated.
:::

## Where this leads

Every reaction in the rest of the course has been characterised by the methods of this chapter: the concerted, stereospecific nature of pericyclic reactions ([[organic-synthesis/pericyclic]]), the transition-state models that explain stereoselectivity ([[organic-synthesis/stereoselective-synthesis]]), and the rate constants of radical clocks and cationic rearrangements ([[organic-synthesis/rearrangements-radicals]]). In organometallic catalysis the same tools — rate laws, Hammett plots, isotope effects — identify rate-determining steps in catalytic cycles ([[organometallics-catalysis/cross-coupling]]). Computational chemistry now adds calculated transition states and isotope effects to the evidence ([[computational-chemistry/potential-energy-surfaces]]).

::: summary
- A mechanism is a hypothesis: list the alternatives, derive what each predicts, and do the experiments whose predictions differ ([[#alg-test]]).
- The rate law gives the composition of the rate-determining transition state relative to the resting state — no more; activation entropies distinguish associative ($\Delta S^\ddagger \ll 0$), cyclic unimolecular and dissociative steps.
- Isotopic labels follow atoms (acyl–O cleavage in esters, benzyne from $^{14}\mathrm{C}$ scrambling); crossover experiments test intramolecularity.
- Primary KIEs ($k_\mathrm{H}/k_\mathrm{D} \approx 2$–$7$ at 298 K, from zero-point energy) show C–H cleavage in the rate-determining step; secondary KIEs report hybridisation changes; values far above 7 indicate tunnelling.
- The Hammett equation $\log(k_\mathrm{X}/k_\mathrm{H}) = \rho\sigma$ (empirical): $\rho > 0$ for negative charge build-up, $\rho < 0$ for positive; $\sigma^+$ signals direct conjugation with a cationic centre.
- Intermediates are detected spectroscopically or trapped (benzyne + furan); stereochemistry (inversion in $\mathrm{S_N2}$, anti E2, anti bromination) records transition-state geometry.
:::

## Exercises

::: exercise The semiclassical KIE {level=1 check="6.9"}
A C–H stretch at $3000\ \mathrm{cm^{-1}}$ becomes the reaction coordinate; the corresponding C–D stretch is at $2200\ \mathrm{cm^{-1}}$. Estimate $k_\mathrm{H}/k_\mathrm{D}$ at $298.15\ \mathrm{K}$ ($hc/k_\mathrm{B} = 1.4388\ \mathrm{cm\,K}$). (Enter the ratio to two significant figures.)
::: solution
$k_\mathrm{H}/k_\mathrm{D} = \exp[1.4388 \times (3000 - 2200)/(2 \times 298.15)] = \exp(1.930) = 6.9$ ([[#eq-kie]]).
:::
:::

::: exercise A Hammett prediction {level=1 check="89"}
For a reaction with $\rho = +2.5$, by what factor does a *para*-nitro group ($\sigma_p = 0.78$) accelerate the reaction relative to the unsubstituted compound? (Enter the factor to two significant figures.)
::: solution
$\log_{10}(k_\mathrm{X}/k_\mathrm{H}) = 2.5 \times 0.78 = 1.95$; $10^{1.95} = 89$.
:::
:::

::: exercise Reading a rate law {level=1}
The reaction of an alkyl bromide RBr with azide in DMSO follows $v = k[\mathrm{RBr}][\mathrm{N_3^-}]$, while in aqueous formic acid it follows $v = k'[\mathrm{RBr}]$. What can you conclude about the transition states, and what further experiment would test the mechanisms you propose?
::: solution
In DMSO the rate-determining transition state contains RBr and azide: consistent with $\mathrm{S_N2}$. In aqueous formic acid it contains only RBr (and solvent, whose concentration is constant): consistent with rate-determining ionisation, $\mathrm{S_N1}$. Tests: use an enantiomerically enriched secondary bromide — $\mathrm{S_N2}$ should give clean inversion, $\mathrm{S_N1}$ extensive racemisation; measure Hammett ρ for benzylic analogues (strongly negative for $\mathrm{S_N1}$); α-deuterium secondary KIE (about $1.1$–$1.2$ for $\mathrm{S_N1}$, near 1 for $\mathrm{S_N2}$).
:::
:::

::: exercise Activation entropy of a rearrangement {level=2 check="-53"}
A thermal rearrangement has $k = 1.0\times10^{-5}\ \mathrm{s^{-1}}$ at $473.15\ \mathrm{K}$ and $\Delta H^\ddagger = 138\ \mathrm{kJ\,mol^{-1}}$ (illustrative values). Calculate $\Delta S^\ddagger$ and say whether it supports a cyclic, concerted transition state. (Enter $\Delta S^\ddagger$ in $\mathrm{J\,K^{-1}\,mol^{-1}}$ to two significant figures.)
::: solution
$\ln(kh/k_\mathrm{B}T) = \ln(1.0\times10^{-5} \times 6.626\times10^{-34}/(1.381\times10^{-23} \times 473.15)) = -41.43$; $\Delta H^\ddagger/RT = 138000/(8.314 \times 473.15) = 35.08$. $\Delta S^\ddagger = 8.314 \times (-41.43 + 35.08) = -53\ \mathrm{J\,K^{-1}\,mol^{-1}}$. A moderately negative value for a unimolecular reaction is typical of a cyclic transition state in which internal rotations are frozen, as in the Claisen and Cope rearrangements; a stepwise dissociation into radical fragments would have $\Delta S^\ddagger$ near zero or positive.
:::
:::

::: exercise Where does the label go? {level=2}
Predict the location of $^{18}\mathrm{O}$ (a) when ethyl benzoate is hydrolysed by hydroxide in $\mathrm{H_2{}^{18}O}$, and (b) when *tert*-butyl acetate is hydrolysed in dilute aqueous acid in $\mathrm{H_2{}^{18}O}$. Explain with mechanisms in words.
::: solution
(a) Hydroxide (labelled, since it exchanges with the solvent) attacks the carbonyl carbon, the π electrons going to oxygen to give a tetrahedral alkoxide; this re-forms C=O and expels ethoxide; proton transfer gives benzoate and ethanol. The label is in **benzoate** (and, because the tetrahedral intermediate can exchange its oxygens by proton transfer and reversion, some label also appears in recovered ester — Bender's 1951 evidence for the tetrahedral intermediate). Ethanol is unlabelled. (b) The carbonyl oxygen is protonated; instead of water adding, the alkyl–O bond ionises because the *tert*-butyl cation is stable — the electrons of the $\mathrm{O{-}C(CH_3)_3}$ bond go to oxygen, releasing acetic acid. Water then attacks the cation. The label ends up in **2-methylpropan-2-ol**, not in acetic acid: alkyl–oxygen cleavage.
:::
:::

::: exercise The Hughes–Ingold ratio {level=2 check="2"}
In the exchange of optically active 2-iodooctane with radioactive iodide, what ratio $k_\mathrm{rac}/k_\mathrm{exch}$ is expected if every substitution proceeds with inversion? (Enter the ratio.) What ratio would complete retention give?
::: solution
Each inverting substitution converts one molecule of one enantiomer into the other, which cancels the rotation of a second molecule, so optical activity is lost twice as fast as label is incorporated: $k_\mathrm{rac}/k_\mathrm{exch} = 2$. With complete retention, exchange would not change the configuration at all, and $k_\mathrm{rac} = 0$ (any racemisation would have to come from another process). The observed factor of 2 (within experimental error) shows that every act of substitution inverts the centre.
:::
:::

::: exercise Deriving the KIE estimate {level=3}
Derive [[#eq-kie]] from transition-state theory, stating each assumption. Then explain why (a) the KIE for a reaction in which the C–H bond is only slightly stretched at the transition state is smaller than the maximum, and (b) isotope effects of 20 or more at room temperature are taken as evidence for tunnelling.
::: hint
Write $k_\mathrm{H}/k_\mathrm{D} = \exp[-(\Delta G^\ddagger_\mathrm{H} - \Delta G^\ddagger_\mathrm{D})/RT]$ and ask which zero-point energies differ.
:::
::: solution
Transition-state theory gives $k = (k_\mathrm{B}T/h)\exp(-\Delta G^\ddagger/RT)$, the same prefactor for both isotopes (to a good approximation, ignoring small differences in moments of inertia and transmission coefficient). Under the Born–Oppenheimer approximation the potential energy surface is identical for H and D, so the only difference is in vibrational zero-point energies. Assume (i) the C–H stretch in the reactant becomes the reaction coordinate at the TS, so contributes no ZPE there; (ii) all other vibrations are the same in reactant and TS for both isotopes; (iii) no tunnelling. Then $\Delta G^\ddagger_\mathrm{D} - \Delta G^\ddagger_\mathrm{H} = \tfrac12 N_\mathrm{A}hc(\tilde\nu_\mathrm{H} - \tilde\nu_\mathrm{D})$ and $k_\mathrm{H}/k_\mathrm{D} = \exp[hc(\tilde\nu_\mathrm{H} - \tilde\nu_\mathrm{D})/2k_\mathrm{B}T]$, with $\tilde\nu_\mathrm{D} \approx \tilde\nu_\mathrm{H}/\sqrt2$ from $\tilde\nu \propto \mu^{-1/2}$.
(a) If the TS is early or late (H mostly bonded to one partner), the TS retains a real vibration with substantial H motion (the symmetric stretch of the three-centre unit is then not symmetric in H), which has its own isotope-dependent ZPE. This cancels part of the reactant ZPE difference, so the KIE is smaller — Westheimer's argument; bending vibrations in the TS also contribute.
(b) Tunnelling probability depends exponentially on mass × barrier width; it is much greater for H than D, so it adds a rate contribution for H that the semiclassical treatment omits, raising $k_\mathrm{H}/k_\mathrm{D}$ well above the ZPE maximum (≈ 7 at 298 K), and making the Arrhenius plots curved, with unusually different pre-exponential factors for H and D.
:::
:::

::: exercise Designing a crossover test {level=3}
A chemist proposes that the thermal rearrangement of allyl phenyl ether to 2-allylphenol is intramolecular and concerted, but a colleague suggests homolysis into an allyl radical and a phenoxyl radical followed by recombination in the solvent. Design two experiments that would distinguish the proposals and state the predicted outcome of each.
::: hint
Think about crossover with two different labelled ethers, and about the position of a label within the allyl group.
:::
::: solution
**Crossover.** Heat together allyl 4-methylphenyl ether and allyl-$d_5$ phenyl ether (or the ether of a differently substituted phenol). A concerted intramolecular [3,3] shift ([[organic-synthesis/pericyclic]]) gives only 2-allyl-4-methylphenol (undeuterated) and 2-(allyl-$d_5$)phenol: **no crossed products**. Free radicals escaping the solvent cage would recombine randomly, giving also 2-(allyl-$d_5$)-4-methylphenol and 2-allylphenol: crossed products.
**Allyl inversion.** Label the terminal carbon: $\mathrm{PhO{-}CH_2CH{=}{}^{14}CH_2}$ (or use $\gamma$-deuterium). In the [3,3] shift, the new C–C bond forms at the terminal γ-carbon, so the label ends up attached to the ring: $\mathrm{Ar{-}{}^{14}CH_2CH{=}CH_2}$ — complete **allylic inversion**. A free allyl radical is symmetric (its two terminal carbons equivalent), so recombination would put the label at both ends equally. Both experiments were done historically and show no crossover and clean inversion; the activation entropy (about $-50\ \mathrm{J\,K^{-1}\,mol^{-1}}$, compare the exercise on activation entropy above) agrees with a cyclic transition state.
:::
:::
