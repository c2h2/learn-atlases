A newly made polypeptide is a floppy chain with an astronomical number of possible shapes, yet a small protein reaches its one native structure in milliseconds, and does so reproducibly in every cell of every organism that makes it. How it manages this, why the result is stable — but only just — and what happens when folding goes wrong are the questions of this chapter. They matter well beyond the test tube. Most disease-causing missense mutations act by destabilising a fold; a dozen or more human diseases involve proteins that aggregate into amyloid fibrils; and every protein engineered for industry or medicine must be designed to fold and to stay folded.

The basic facts are in [[biochemistry/amino-acids-proteins]]: Anfinsen's demonstration that the sequence determines the structure, the marginal stability of folded proteins, and the existence of molecular chaperones. The thermodynamic forces — the hydrophobic effect, hydrogen bonds, the cost of conformational entropy — are analysed in Chemistry Atlas ([Amino acids and protein structure](/learn/chemistry/lesson.php?c=biochemistry&l=amino-acids-proteins) and [Water and noncovalent interactions](/learn/chemistry/lesson.php?c=biochemistry&l=water-noncovalent)). Here we make those ideas quantitative: we measure stability, follow folding in time, picture it as motion on an energy landscape, and then return to the cell, where chaperones, aggregation and amyloid change the picture.

## Levinthal's paradox

In 1968–69 Cyrus Levinthal pointed out a puzzle. Suppose each residue of a 100-residue chain can adopt just three backbone conformations. The chain then has $3^{100} \approx 5\times10^{47}$ conformations. If it could try a new one every $10^{-13}$ s — roughly the period of a bond vibration — a random search would take about $5\times10^{34}$ s, or $10^{27}$ years, some $10^{17}$ times the age of the universe. Yet small proteins fold in microseconds to seconds.

::: warning Levinthal's paradox does not show that folding is mysterious
The paradox only shows that folding cannot be an unbiased random search. It is not: each local improvement — a turn forming, two hydrophobic side chains coming together — lowers the free energy a little, so partly correct structures are kept rather than discarded, and the search is biased towards the native state at every step. A biased walk reaches its target in a time that grows slowly with chain length, not exponentially. R. Zwanzig, A. Szabo and B. Bagchi showed in 1992 that even a small energetic bias per residue reduces the search time from cosmological to microseconds.
:::

## The thermodynamics of folding

### The two-state model

Many small single-domain proteins (up to about 100–120 residues) fold and unfold without populating any intermediate state to a detectable extent. For them we can write

$$
\mathrm N \;\rightleftharpoons\; \mathrm U, \qquad K_\mathrm U = \frac{[\mathrm U]}{[\mathrm N]},
$$

where N is the native and U the unfolded state (in reality an ensemble of many conformations).

::: definition Stability of a protein {#def-stability}
The **stability** of a two-state protein is the standard free energy of unfolding

$$
\Delta G_\mathrm U = G_\mathrm U - G_\mathrm N = -RT\ln K_\mathrm U ,
$$ {#eq-stability}

positive for a stable protein. The **fraction unfolded** is $f_\mathrm U = K_\mathrm U/(1+K_\mathrm U)$. The **melting temperature** $T_\mathrm m$ is the temperature at which $\Delta G_\mathrm U = 0$ and $f_\mathrm U = \tfrac12$; the **midpoint** $C_\mathrm m$ of a chemical denaturation is the denaturant concentration at which the same holds. A mutation's effect on stability is $\Delta\Delta G = \Delta G_\mathrm U^\mathrm{mutant} - \Delta G_\mathrm U^\mathrm{wild\ type}$, negative for a destabilising mutation.
:::

Typical small proteins have $\Delta G_\mathrm U$ = 20–60 kJ mol⁻¹ at 25 °C, equivalent to a few hydrogen bonds — the small difference between the large favourable enthalpy and hydrophobic terms and the large unfavourable loss of conformational entropy. With $RT = 2.48$ kJ mol⁻¹ at 25 °C, a stability of 25 kJ mol⁻¹ means $K_\mathrm U = e^{-25/2.48} \approx 4\times10^{-5}$: one molecule in 25,000 is unfolded at any moment. This sounds negligible, but a protein that unfolds transiently once a second will be exposed to proteases and aggregation thousands of times a day.

::: intuition Why marginal stability?
Proteins are not as stable as they could be. Thermophiles show that the same folds can be made to survive 100 °C, and laboratory evolution easily raises the stability of mesophilic proteins. Two explanations are offered, and both probably contribute. Functional: catalysis, binding and regulation often require flexibility, and a protein that never unfolds cannot be degraded when the cell no longer needs it. Evolutionary: most mutations are destabilising, so a population drifts down to the lowest stability that selection still tolerates, rather than staying at the most stable sequence (M. A. DePristo, D. M. Weinreich and D. L. Hartl, 2005). On the second view marginal stability is not an adaptation at all.
:::

### Heat and cold: the stability curve

Unfolding exposes non-polar groups to water, and water around non-polar groups has an unusually high heat capacity. So unfolding has a large positive **heat-capacity change** $\Delta C_p$, roughly 50–60 J mol⁻¹ K⁻¹ per residue, and this makes $\Delta H_\mathrm U$ and $\Delta S_\mathrm U$ depend strongly on temperature.

::: proposition The protein stability curve {#prop-stability-curve}
Assume $\Delta C_p$ is independent of temperature and let $\Delta H_\mathrm m$ be the enthalpy of unfolding at $T_\mathrm m$. Then

$$
\Delta G_\mathrm U(T) = \Delta H_\mathrm m\left(1 - \frac{T}{T_\mathrm m}\right) + \Delta C_p\left[(T - T_\mathrm m) - T\ln\frac{T}{T_\mathrm m}\right],
$$ {#eq-gibbs-helmholtz}

(the Gibbs–Helmholtz equation with constant $\Delta C_p$). $\Delta G_\mathrm U$ is maximal at $T_\mathrm s = T_\mathrm m\exp\bigl(-\Delta H_\mathrm m/(T_\mathrm m\Delta C_p)\bigr)$, where $\Delta S_\mathrm U = 0$, and falls on both sides, so a protein unfolded by heat at $T_\mathrm m$ should also unfold by cooling, at a second temperature below $T_\mathrm s$ (**cold denaturation**).
:::

::: proof
With constant $\Delta C_p$, $\Delta H(T) = \Delta H_\mathrm m + \Delta C_p(T - T_\mathrm m)$ and $\Delta S(T) = \Delta S_\mathrm m + \Delta C_p\ln(T/T_\mathrm m)$. At $T_\mathrm m$, $\Delta G = 0$, so $\Delta S_\mathrm m = \Delta H_\mathrm m/T_\mathrm m$. Then $\Delta G(T) = \Delta H(T) - T\Delta S(T)$ gives [[#eq-gibbs-helmholtz]] after collecting terms. Differentiating, $d\Delta G/dT = -\Delta S(T)$, which vanishes when $\ln(T/T_\mathrm m) = -\Delta H_\mathrm m/(T_\mathrm m\Delta C_p)$; the second derivative $-\Delta C_p/T$ is negative, so this is a maximum.
:::

::: example A stability curve {#ex-stability-curve}
A protein has $T_\mathrm m = 60$ °C, $\Delta H_\mathrm m = 400$ kJ mol⁻¹ and $\Delta C_p = 6.0$ kJ mol⁻¹ K⁻¹ (about 110 residues). Find $\Delta G_\mathrm U$ at 25 °C and 37 °C, the temperature of maximum stability, and the fraction unfolded at 25 °C.
::: solution
With $T_\mathrm m = 333.15$ K, at $T = 298.15$ K:

$$
\Delta G_\mathrm U = 400\left(1 - \tfrac{298.15}{333.15}\right) + 6.0\left[-35.0 - 298.15\ln\tfrac{298.15}{333.15}\right] = 42.0 - 11.4 = 30.6\ \mathrm{kJ\,mol^{-1}}.
$$

At 310.15 K the same formula gives 22.7 kJ mol⁻¹: twelve degrees of warming have removed a quarter of the stability. $T_\mathrm s = 333.15\exp(-400/(333.15\times6.0)) = 272.7$ K, about 0 °C, where $\Delta G_\mathrm U = 37.5$ kJ mol⁻¹. At 25 °C, $K_\mathrm U = e^{-30.6/2.479} = 4.4\times10^{-6}$, so $f_\mathrm U \approx 4\times10^{-6}$. The predicted cold-denaturation temperature, where $\Delta G_\mathrm U$ returns to zero, is about −57 °C — below the freezing point of water, which is why cold denaturation is normally seen only for less stable proteins, under pressure or in the presence of denaturant (P. L. Privalov, 1990).
:::
:::

::: widget plot
f: H*(1 - x/Tm) + C*((x - Tm) - x*ln(x/Tm))
x: 220, 360
y: -20, 50
sliders: Tm=333:300:360:1; H=400:100:700:10; C=6:1:15:0.5
labels: \Delta G_\mathrm U\ (\mathrm{kJ\,mol^{-1}})
hlines: 0
caption: The stability curve [[#eq-gibbs-helmholtz]]: $\Delta G_\mathrm U$ against absolute temperature (K) for melting temperature $T_\mathrm m$ (K), enthalpy $H = \Delta H_\mathrm m$ (kJ mol⁻¹) and heat-capacity change $C = \Delta C_p$ (kJ mol⁻¹ K⁻¹). The defaults are those of [[#ex-stability-curve]]. The curve crosses zero twice: heat denaturation at $T_\mathrm m$ and cold denaturation far below. Raise $C$ and watch the curve become more sharply curved, bringing cold denaturation up towards room temperature; raise $H$ at fixed $T_\mathrm m$ and the protein becomes more stable at every temperature.
:::

Thermophilic proteins reach high $T_\mathrm m$ in several ways that the curve makes clear: by raising the whole curve (a larger maximum $\Delta G$), by flattening it (smaller $\Delta C_p$, often through more ion pairs and less buried non-polar surface), or by shifting it to higher temperature. Comparisons of homologous proteins from mesophiles and thermophiles show all three.

### Chemical denaturation

Urea and guanidinium chloride unfold proteins because they interact more favourably with the exposed backbone and side chains of the unfolded state than water does. Over the range accessible to experiment the stability usually falls linearly with denaturant concentration.

::: proposition The linear extrapolation method (empirical) {#prop-lem}
For many proteins,

$$
\Delta G_\mathrm U([\mathrm D]) = \Delta G_\mathrm U^{\mathrm{H_2O}} - m[\mathrm D],
$$ {#eq-lem}

where $[\mathrm D]$ is the denaturant concentration, $m$ (kJ mol⁻¹ M⁻¹) is the **m-value** and $\Delta G_\mathrm U^{\mathrm{H_2O}} = m\,C_\mathrm m$ is the stability in water, obtained by extrapolation from the transition region (C. N. Pace, 1986). The fraction unfolded is then

$$
f_\mathrm U = \frac{1}{1 + \exp\bigl[(\Delta G_\mathrm U^{\mathrm{H_2O}} - m[\mathrm D])/RT\bigr]}.
$$ {#eq-fu}

The linearity is an empirical observation over the measured range, not a law, and the extrapolation over several molar is the main source of error. The m-value is proportional, to a good approximation, to the non-polar and backbone surface area exposed on unfolding, so it grows with protein size (J. K. Myers, C. N. Pace and J. M. Scholtz, 1995).
:::

::: example Stability from a urea melt {#ex-lem}
A protein's fluorescence shows a two-state urea denaturation with $C_\mathrm m = 4.0$ mol L⁻¹ and $m = 5.0$ kJ mol⁻¹ M⁻¹ at 25 °C. What is its stability in water? What fraction is unfolded at 3.0 and 5.0 mol L⁻¹ urea? A mutant has the same m-value but $C_\mathrm m = 3.2$ mol L⁻¹; find $\Delta\Delta G$.
::: solution
$\Delta G_\mathrm U^{\mathrm{H_2O}} = mC_\mathrm m = 20.0$ kJ mol⁻¹. At 3.0 M, $\Delta G = 20 - 15 = 5.0$ kJ mol⁻¹ and $f_\mathrm U = 1/(1 + e^{5.0/2.479}) = 0.12$; at 5.0 M, $\Delta G = -5.0$ and $f_\mathrm U = 0.88$. The transition is sharp: it runs from 12 % to 88 % unfolded over just 2 M. For the mutant, $\Delta G_\mathrm U = 5.0\times3.2 = 16.0$ kJ mol⁻¹, so $\Delta\Delta G = m\,\Delta C_\mathrm m = -4.0$ kJ mol⁻¹. Comparing midpoints with a shared m-value is more precise than comparing two long extrapolations.
:::
:::

::: widget plot
f: 1/(1 + exp((G - m*x)/2.479))
x: 0, 9
y: 0, 1
sliders: G=20:5:60:1; m=5:2:15:0.5
labels: f_\mathrm U
caption: Fraction unfolded against denaturant concentration (mol L⁻¹) at 25 °C from [[#eq-fu]], for stability in water $G$ (kJ mol⁻¹) and m-value $m$ (kJ mol⁻¹ M⁻¹). The defaults are [[#ex-lem]]. The midpoint is at $C_\mathrm m = G/m$; a larger $m$ (a bigger protein burying more surface) makes the transition steeper. Notice that a mutation that lowers $G$ by a few kJ mol⁻¹ shifts the curve sideways without changing its shape — the basis of measuring $\Delta\Delta G$.
:::

### What a mutation costs

Systematic mutation of proteins of known structure, notably T4 lysozyme by B. W. Matthews's group and barnase and chymotrypsin inhibitor 2 by Alan Fersht's, has given a rough scale of the contributions to stability. Truncating a buried leucine to alanine typically costs 10–20 kJ mol⁻¹, the cost increasing with the size of the cavity left behind (A. E. Eriksson and colleagues, 1992); mutations at the surface usually cost little; replacing a residue in a helix by proline, or a glycine in a turn with positive φ by anything else, can cost a great deal. Because most proteins are only 20–60 kJ mol⁻¹ stable, one or two such mutations can unfold a protein at body temperature, which is why many inherited diseases are diseases of folding.

::: application Stabilising a protein with a drug
Transthyretin, a tetrameric transport protein of blood plasma, causes a form of amyloidosis when its tetramer dissociates and the monomers misfold and aggregate; destabilising mutations accelerate the process. Jeffery Kelly and colleagues reasoned that a small molecule binding more tightly to the native tetramer than to the dissociated state would raise the barrier to dissociation, by the same thermodynamics as a ligand stabilising any fold. The resulting kinetic stabiliser, tafamidis, was approved for the disease in the European Union in 2011 — a drug designed from the physics of folding. The clinical aspects are in the [Medicine Atlas](/learn/medicine/).
:::

## The kinetics of folding

Equilibrium measurements tell us about the end states, not the route. To see the route we must follow folding in time, by rapid mixing (stopped-flow, dead time about 1 ms), temperature jumps by laser (nanoseconds) or single-molecule methods ([[structural-biology/nmr-spectroscopy]]).

For a two-state protein, the observed relaxation rate after a perturbation is the sum of the folding and unfolding rate constants, $k_\mathrm{obs} = k_\mathrm f + k_\mathrm u$, and $K_\mathrm U = k_\mathrm u/k_\mathrm f$. Both depend exponentially on denaturant concentration: denaturant slows folding and speeds unfolding.

::: proposition The chevron plot {#prop-chevron}
If the activation free energies of folding and unfolding change linearly with denaturant, then

$$
\ln k_\mathrm{obs} = \ln\Bigl(k_\mathrm f^{\mathrm{H_2O}}e^{-m_\mathrm f[\mathrm D]/RT} + k_\mathrm u^{\mathrm{H_2O}}e^{m_\mathrm u[\mathrm D]/RT}\Bigr),
$$ {#eq-chevron}

which, plotted against $[\mathrm D]$, has a V shape (a "chevron") with a minimum near $C_\mathrm m$. The kinetic m-values satisfy $m_\mathrm f + m_\mathrm u = m$, the equilibrium m-value, and the ratio $\beta_\mathrm T = m_\mathrm f/m$ measures how much of the surface buried in the native state is already buried in the **transition state** — a value between 0 (as exposed as U) and 1 (as compact as N).
:::

A chevron with straight arms whose kinetic and equilibrium m-values agree is the signature of two-state folding; a "rollover" of the folding arm at low denaturant reveals an intermediate.

::: widget plot
f: ln(kf*exp(-a*x) + ku*exp(b*x))
x: 0, 8
y: -3, 9
sliders: kf=1000:10:10000:10; ku=0.1:0.001:1:0.001; a=1.5:0.2:3:0.1; b=0.5:0.1:2:0.1
labels: \ln k_\mathrm{obs}
caption: A chevron plot from [[#eq-chevron]]: the natural logarithm of the observed rate constant (s⁻¹) against denaturant concentration (mol L⁻¹), with folding and unfolding rate constants $k_\mathrm f$, $k_\mathrm u$ in water and kinetic slopes $a = m_\mathrm f/RT$ and $b = m_\mathrm u/RT$ (M⁻¹). Illustrative values. The left arm is dominated by folding, the right by unfolding, and the minimum lies at the equilibrium midpoint. A destabilising mutation that lowers $k_\mathrm f$ moves the left arm down; one that raises $k_\mathrm u$ moves the right arm up — which one changes is the question Φ-value analysis asks.
:::

### Φ-value analysis

The transition state is the least populated, and most informative, species on the folding pathway. Alan Fersht and colleagues devised a way of mapping it residue by residue, by protein engineering (A. Matouschek, J. T. Kellis, L. Serrano and A. R. Fersht, with barnase from *Bacillus amyloliquefaciens*, 1989).

::: definition Φ-value {#def-phi}
For a mutation that changes the stability by $\Delta\Delta G_\mathrm{eq}$ and the activation free energy of folding by $\Delta\Delta G_\ddagger = RT\ln(k_\mathrm f^\mathrm{wt}/k_\mathrm f^\mathrm{mut})$, the **Φ-value** is

$$
\Phi = \frac{\Delta\Delta G_\ddagger}{\Delta\Delta G_\mathrm{eq}} .
$$ {#eq-phi}

$\Phi \approx 1$ means the interactions removed by the mutation are fully formed in the transition state (the mutation destabilises it as much as the native state); $\Phi \approx 0$ means they are not yet formed. Φ-values are interpretable only for mutations that do not change the structure, remove a few non-polar contacts and destabilise by more than about 2–3 kJ mol⁻¹.
:::

::: example Mapping the transition state {#ex-phi}
At 25 °C a wild-type protein folds with $k_\mathrm f = 100$ s⁻¹ in water. A Val→Ala mutant destabilises it by $\Delta\Delta G_\mathrm{eq} = 6.0$ kJ mol⁻¹ and folds at 20 s⁻¹. Calculate Φ and interpret it. A second mutation, also destabilising by 6.0 kJ mol⁻¹, leaves $k_\mathrm f$ unchanged. What does that say?
::: solution
$\Delta\Delta G_\ddagger = RT\ln(100/20) = 2.479\times1.609 = 3.99$ kJ mol⁻¹, so $\Phi = 3.99/6.0 = 0.66$: the side chain's contacts are about two-thirds formed in the transition state, so this region is part of the folding nucleus. For the second mutation $\Delta\Delta G_\ddagger = 0$ and $\Phi = 0$: its contacts form only after the transition state, so all its destabilising effect appears as faster unfolding. Mapping many such mutations showed that the transition states of small proteins such as chymotrypsin inhibitor 2 have a diffuse, partly formed nucleus rather than a fully formed piece of structure — the **nucleation–condensation** mechanism.
:::
:::

### What sets the folding rate?

Small two-state proteins fold with rate constants spanning about six orders of magnitude, from microseconds to seconds. Surprisingly, size is not the main predictor. Kevin Plaxco, Kim Simons and David Baker found in 1998 that the folding rate correlates with the **contact order** — the average separation along the sequence of residues that touch in the native structure, as a fraction of chain length. Proteins built mostly from local contacts (helices, hairpins) fold fast; those whose strands pair across long distances in sequence fold slowly, presumably because closing a long loop costs more entropy. The fastest folders, some designed helical bundles and small domains, approach an estimated "speed limit" of roughly $N/100$ μs for an $N$-residue chain (J. Kubelka, J. Hofrichter and W. A. Eaton, 2004).

Slow steps are often chemical rather than conformational. *Trans*-to-*cis* **isomerisation of prolyl peptide bonds** takes seconds to minutes and is catalysed in cells by peptidyl-prolyl isomerases. Formation of correct **disulfide bonds**, in the endoplasmic reticulum or the bacterial periplasm, is catalysed by protein disulfide isomerase and the Dsb proteins.

## The energy landscape

The classical picture of a single folding pathway — U to intermediate to N — was replaced in the late 1980s and 1990s by a statistical one, developed by J. D. Bryngelson and P. G. Wolynes (1987), J. N. Onuchic, K. A. Dill and others.

::: definition The folding funnel {#def-funnel}
The **energy landscape** of a protein is its free energy (excluding the conformational entropy of the backbone) as a function of all its conformational coordinates. For a natural protein this landscape is **funnel-shaped**: wide at the top, where the many unfolded conformations lie, and narrowing as native contacts accumulate towards the single native state at the bottom. The width of the funnel at a given depth represents the conformational entropy remaining; local bumps and pits are **roughness**, where non-native interactions can trap the chain transiently. A sequence whose native state lies far below all alternative compact states is **minimally frustrated**.
:::

The funnel unifies the older models. Different molecules descend by different routes — the "pathway" is an average over many — and the transition state is the narrow region where the decrease in energy finally overtakes the loss of entropy. In the **framework** model secondary structure forms first; in **hydrophobic collapse** the chain first condenses into a compact, partly disordered **molten globule** (O. B. Ptitsyn and colleagues, from studies of α-lactalbumin in the 1980s) and then rearranges; in **nucleation–condensation** a few local and long-range contacts form together. All three correspond to different shapes of the funnel, and real proteins sit somewhere between them.

::: intuition The funnel as a golf course
An unbiased landscape is a flat golf course with one hole: the ball wanders for ever (Levinthal). A funnel is a course sloping towards the hole from every direction: the ball gets there from anywhere, by many routes. Roughness adds bunkers, where a ball may sit for a while. Evolution has selected sequences whose landscapes slope smoothly, because sequences with deep non-native traps fold slowly or misfold. Random sequences mostly do not have funnelled landscapes, and very few of them fold.
:::

## Folding in the cell

### Co-translational folding and chaperones

Inside a cell a protein begins to fold while it is still being made. The ribosome adds about 15–20 residues per second in bacteria and 3–8 in eukaryotes ([[molecular-biology/translation]]), and the exit tunnel of the large subunit, about 100 Å long, shelters the last 30–40 residues; domains can fold as they emerge, one at a time, which may be one reason multidomain proteins are common in eukaryotes. Codon usage that slows translation at domain boundaries can help.

The chaperones introduced in [[biochemistry/amino-acids-proteins]] act at three stages. **Trigger factor** in bacteria (and the nascent-chain-associated complex in eukaryotes) sits at the tunnel exit. **Hsp70** (DnaK) binds short extended hydrophobic segments; its affinity is switched by its nucleotide, ATP-bound Hsp70 binding and releasing clients fast and ADP-bound Hsp70 holding them tightly, with J-domain proteins (Hsp40, DnaJ) stimulating ATP hydrolysis and nucleotide-exchange factors (GrpE) resetting the cycle. **Chaperonins** provide a protected cavity.

The *E. coli* chaperonin GroEL is two stacked rings of seven 57 kDa subunits, each ring enclosing a cavity. A non-native protein binds to hydrophobic residues lining the open ring; ATP and the heptameric co-chaperonin GroES then bind, causing a large rotation of the apical domains that buries those residues and releases the substrate into a closed chamber now lined with polar residues. The protein has about 10 s, the time for GroEL to hydrolyse its seven ATP, to fold in isolation before the chamber opens; if it has not folded it can rebind and try again. The cavity holds proteins up to about 60 kDa. The structures that revealed this mechanism were solved in the 1990s (K. Braig, A. L. Horwich, P. B. Sigler and colleagues, 1994; Z. Xu, A. L. Horwich and P. B. Sigler, 1997).

::: warning Chaperones do not tell a protein what shape to adopt
Chaperones bind features shared by all non-native proteins — exposed hydrophobic surfaces, extended segments — and so cannot carry information about any particular fold. They prevent aggregation, give a chain repeated chances to fold, and in some cases unfold misfolded molecules, but the native structure is still determined by the sequence, as Anfinsen's principle says. A protein folded with a chaperone has the same structure as one that folds spontaneously.
:::

### Proteostasis

Cells monitor the folding state of their proteins and respond to stress through the heat-shock response in the cytosol and the unfolded-protein response in the endoplasmic reticulum ([[cell-biology/protein-sorting]]). Molecules that cannot be folded are degraded, by the ubiquitin–proteasome system and by autophagy. The whole network of synthesis, folding, trafficking and degradation is called **proteostasis**, and its capacity declines with age in many organisms, which is thought to contribute to the late onset of aggregation diseases.

## Misfolding, aggregation and amyloid

Partly folded chains expose hydrophobic surfaces and backbone groups that can interact between molecules as well as within one. When they do, proteins aggregate, either into disordered amorphous clumps or into highly ordered fibrils.

::: definition Amyloid {#def-amyloid}
**Amyloid** fibrils are long, unbranched protein fibres, about 7–13 nm wide, built on a **cross-β** structure: β-strands run perpendicular to the fibre axis and are hydrogen bonded into sheets running parallel to it, with a spacing of about 4.7–4.8 Å between strands, and sheets packed face to face about 10 Å apart. These two distances give the characteristic X-ray fibre diffraction pattern. Amyloid binds dyes such as Congo red and thioflavin T. Many unrelated sequences can form amyloid, and in a given fibril each molecule usually contributes one or a few strands to stacks of identical molecules.
:::

Christopher Dobson argued in 1999 that the ability to form amyloid is a generic property of polypeptide chains, held in check in natural proteins by their sequences, their stable folds and the proteostasis network. The fibrils' cross-β backbone is the same whatever the sequence, but the side chains pack in ways specific to each protein, and atomic structures, first from solid-state NMR and microcrystals and since about 2017 from cryo-EM of fibrils extracted from tissue ([[structural-biology/cryo-em]]), show that the same protein can form several distinct fibril "polymorphs".

Amyloid forms by **nucleated polymerisation**. A nucleus — a small, unstable oligomer of the right structure — forms slowly, and once formed it grows quickly by adding monomers to its ends; fibrils also break and their surfaces catalyse new nuclei (secondary nucleation; T. P. J. Knowles and colleagues, 2009). The result is a sigmoidal time course with a lag phase, and adding pre-formed fibrils (**seeding**) abolishes the lag.

::: example Why seeding matters {#ex-seeding}
In a simplified model of nucleated growth, the fibril mass $M(t)$ after an initial lag grows exponentially, $M \approx M_0e^{\kappa t}$, until monomer runs out, where $\kappa$ combines elongation and secondary nucleation. With $\kappa = 0.5$ h⁻¹ (illustrative), how much shorter is the lag if the initial fibril mass is raised 1,000-fold by seeding, assuming the lag ends when $M$ reaches a fixed threshold?
::: solution
The time to reach a threshold $M^*$ is $t = \ln(M^*/M_0)/\kappa$. Raising $M_0$ by 1,000 shortens it by $\ln(1000)/\kappa = 6.91/0.5 = 13.8$ h, whatever the threshold. Seeding thus shortens the lag by a fixed time per factor of seed, and a tiny amount of fibril shortens it dramatically. This is the kinetic basis of the "prion-like" spreading proposed for several aggregates: a few seeds transferred from one cell to another can trigger aggregation that would otherwise take far longer to start.
:::
:::

### Disease, function and prions

Amyloid and related aggregates are associated with several neurodegenerative and systemic diseases — aggregates of amyloid-β and tau in Alzheimer's disease, α-synuclein in Parkinson's disease, transthyretin and immunoglobulin light chains in systemic amyloidoses — although which species are toxic (fibrils, or the smaller oligomers on the way to them) is still debated. The clinical aspects belong to the [Medicine Atlas](/learn/medicine/). Amyloid is not always pathological. *E. coli* builds curli fibres of the protein CsgA on its surface to make biofilms, the melanocyte protein Pmel17 forms amyloid as a scaffold for pigment, and some peptide hormones are stored in amyloid-like granules.

**Prions** are the extreme case: protein conformations that propagate themselves. Stanley Prusiner proposed in 1982 that the agents of scrapie in sheep and of Creutzfeldt–Jakob disease in humans are proteins lacking nucleic acid (Nobel Prize in Physiology or Medicine, 1997); the misfolded form of the prion protein PrP converts the normal form into copies of itself. In yeast, Reed Wickner showed in 1994 that the non-Mendelian traits [*PSI*⁺] and [*URE3*] are inherited prion forms of the proteins Sup35 and Ure2, which turn heritable phenotypes on and off without any change in DNA, and in these benign systems the "strains" of a prion have been shown to correspond to distinct fibril structures.

::: quiz
A protein's folded state is 30 kJ mol⁻¹ more stable than its unfolded state, yet the protein forms amyloid on long incubation at 37 °C. Which statement best explains this?
- [ ] The measurement of stability must be wrong.
- [ ] Amyloid forms from the native state without any unfolding.
- [x] The amyloid state can be lower in free energy than the native state at the concentrations used; native stability only protects kinetically, by making the unfolded or partly unfolded precursor rare.
- [ ] Amyloid formation requires a chaperone.
::: solution
The stability $\Delta G_\mathrm U$ compares only N and U of a single molecule. Amyloid is an intermolecular state, whose free energy per molecule depends on concentration, and for many proteins it is the global minimum at high concentration. The native fold acts as a kinetic barrier: aggregation needs unfolded or partly unfolded molecules, so making them rarer (more stable native state, or a stabilising ligand as for transthyretin) slows aggregation without changing where the global minimum lies.
:::
:::

::: history
Hsien Wu proposed in 1931 that denaturation is the unfolding of a compact, ordered structure; Alfred Mirsky and Linus Pauling (1936) attributed that structure mainly to hydrogen bonds, and Walter Kauzmann (1959) argued that the "hydrophobic bond" dominates. Christian Anfinsen's refolding of ribonuclease (1961) established that the sequence suffices, and Cyrus Levinthal's paradox (1968) posed the kinetic problem. Peter Privalov's calorimetry in the 1970s and 1980s measured the large heat-capacity changes and predicted cold denaturation; Robert Baldwin, Thomas Creighton and Oleg Ptitsyn traced folding intermediates; Alan Fersht's Φ-value analysis (1989–1992) mapped transition states; and the energy-landscape theory of Peter Wolynes, José Onuchic, Ken Dill and others (1987–1997) recast folding as a statistical process. Christopher Dobson's demonstration in the late 1990s that ordinary proteins can be converted into amyloid linked the physics of folding to the cell biology of disease.
:::

## Where this leads

The free energies and rates of this chapter return in [[structural-biology/dynamics-and-design]], where folding is simulated, conformational change is linked to function and proteins are designed with funnelled landscapes. That the native structure is encoded in the sequence is the premise of [[structural-biology/structure-prediction]]. The spectroscopic signals used to follow folding — fluorescence, circular dichroism, NMR — are explained in [[structural-biology/nmr-spectroscopy]].

::: summary
- Levinthal's paradox rules out random search: folding is a biased descent on a funnel-shaped energy landscape.
- Two-state stability $\Delta G_\mathrm U = -RT\ln K_\mathrm U$ is only 20–60 kJ mol⁻¹. With constant $\Delta C_p$ the stability curve [[#eq-gibbs-helmholtz]] has a maximum and predicts both heat and cold denaturation.
- Chemical denaturation gives stability by linear extrapolation, $\Delta G_\mathrm U = \Delta G^{\mathrm{H_2O}} - m[\mathrm D]$ (empirical); m-values scale with buried surface.
- Folding kinetics are read from chevron plots; Φ-values map which interactions are formed in the transition state; folding rates correlate with contact order.
- In cells, folding begins on the ribosome and is assisted by Hsp70, chaperonins and isomerases, which prevent aggregation but do not encode structure.
- Amyloid is a generic cross-β state (4.7 Å and 10 Å spacings) formed by nucleated, seedable polymerisation; it underlies some diseases, some normal functions, and prions.
:::

## Exercises

::: exercise Fraction unfolded {level=1 check="0.0203"}
A protein has $\Delta G_\mathrm U = 10.0$ kJ mol⁻¹ at 37 °C. What fraction of molecules is unfolded? Give three significant figures ($R = 8.314$ J mol⁻¹ K⁻¹).
::: solution
$RT = 8.314\times310.15 = 2579$ J mol⁻¹, so $K_\mathrm U = e^{-10000/2579} = e^{-3.878} = 0.0207$ and $f_\mathrm U = K/(1+K) = 0.0203$, about 2 %. (The approximation $f_\mathrm U \approx K$ gives 0.0207; it is good only when $K \ll 1$.)
:::
:::

::: exercise Levinthal for a smaller protein {level=1}
Repeat Levinthal's estimate for a 50-residue chain with three conformations per residue, sampled at $10^{13}$ per second. How long would a random search take?
::: solution
$3^{50} = 7.2\times10^{23}$ conformations; at $10^{13}$ s⁻¹ the search takes $7.2\times10^{10}$ s, about 2,300 years. Even for this small chain an unbiased search would take millennia, yet such proteins fold in microseconds to milliseconds.
:::
:::

::: exercise Midpoint from stability {level=1 check="3.5"}
A protein has $\Delta G_\mathrm U^{\mathrm{H_2O}} = 28$ kJ mol⁻¹ and $m = 8.0$ kJ mol⁻¹ M⁻¹ for guanidinium chloride. At what concentration (mol L⁻¹) is it half unfolded?
::: solution
$C_\mathrm m = \Delta G/m = 28/8.0 = 3.5$ mol L⁻¹.
:::
:::

::: exercise A Φ-value {level=2 check="0.2"}
A mutation destabilises a protein by 5.0 kJ mol⁻¹ and slows folding at 25 °C from 500 s⁻¹ to 333 s⁻¹. Calculate Φ to one significant figure. Where in the transition state is this residue?
::: solution
$\Delta\Delta G_\ddagger = 2.479\ln(500/333) = 2.479\times0.406 = 1.01$ kJ mol⁻¹, so $\Phi = 1.01/5.0 = 0.20$. Its interactions are largely unformed in the transition state: the residue lies outside the folding nucleus and docks late.
:::
:::

::: exercise Stability near room temperature {level=2 check="13.3"}
A protein has $T_\mathrm m = 55$ °C, $\Delta H_\mathrm m = 300$ kJ mol⁻¹ and $\Delta C_p = 10$ kJ mol⁻¹ K⁻¹. Calculate $\Delta G_\mathrm U$ at 25 °C (kJ mol⁻¹, three significant figures) and the temperature of maximum stability.
::: solution
$T_\mathrm m = 328.15$ K, $T = 298.15$ K. $\Delta H_\mathrm m(1 - T/T_\mathrm m) = 300\times0.09142 = 27.43$. The $\Delta C_p$ term is $10[(-30.0) - 298.15\ln(0.90858)] = 10[-30.0 + 28.585] = -14.15$. So $\Delta G_\mathrm U = 13.3$ kJ mol⁻¹. $T_\mathrm s = 328.15\exp(-300/3281.5) = 328.15\times0.9126 = 299.5$ K, about 26 °C, where $\Delta G$ is barely higher (13.3 kJ mol⁻¹). With so large a $\Delta C_p$ the cold-denaturation temperature is about −1.5 °C, close enough to be observable with a little denaturant.
:::
:::

::: exercise Reading a chevron {level=2}
For the default curve in the chevron figure ($k_\mathrm f = 1000$ s⁻¹, $k_\mathrm u = 0.1$ s⁻¹, $a = 1.5$ M⁻¹, $b = 0.5$ M⁻¹ at 25 °C), find (a) the stability in water, (b) the equilibrium m-value, (c) $C_\mathrm m$ and (d) $\beta_\mathrm T$. Interpret (d).
::: solution
(a) $\Delta G_\mathrm U = RT\ln(k_\mathrm f/k_\mathrm u) = 2.479\ln(10^4) = 22.8$ kJ mol⁻¹. (b) $m = RT(a + b) = 2.479\times2.0 = 4.96$ kJ mol⁻¹ M⁻¹. (c) $C_\mathrm m = 22.8/4.96 = 4.6$ M, where the two arms cross ($k_\mathrm f e^{-1.5D} = k_\mathrm u e^{0.5D}$ gives $D = \ln(10^4)/2 = 4.6$ M). (d) $\beta_\mathrm T = a/(a+b) = 0.75$: the transition state has buried about three-quarters of the surface buried in the native state, so it is compact, native-like in its overall dimensions.
:::
:::

::: exercise Interpreting a refolding experiment {level=2}
A 300-residue, three-domain enzyme refolds poorly in dilute buffer (10 % yield of activity after dilution from denaturant); the yield rises to 30 % at 10-fold lower protein concentration and to 85 % if GroEL, GroES and ATP are present. Without ATP, GroEL abolishes refolding entirely. Explain each observation.
::: solution
The concentration dependence shows that the losses are due to aggregation, an intermolecular process whose rate rises with concentration, while folding of each molecule is intramolecular and concentration-independent; diluting tips the competition towards folding. GroEL binds non-native molecules through hydrophobic sites and prevents them from aggregating; with GroES and ATP it releases them into the closed chamber to fold one at a time, and rebinds those that fail, so the yield rises. Without ATP, GroEL binds the non-native protein but cannot release it, so it acts as a trap: it prevents aggregation but also prevents folding.
:::
:::

::: exercise Proline isomerisation {level=3}
A small protein with one proline, whose X–Pro bond is *cis* in the native structure, is unfolded for a long time and then refolded by rapid dilution. The refolding trace has two phases: 20 % of the amplitude with a rate of 50 s⁻¹ and 80 % with a rate of 0.02 s⁻¹ that is unaffected by denaturant concentration but is accelerated by a peptidyl-prolyl isomerase. (a) Explain the two phases. (b) Predict the result if the protein is unfolded for only 100 ms before refolding. (c) What fraction of X–Pro bonds is *cis* in the unfolded state?
::: solution
(a) In the unfolded state the X–Pro bond equilibrates between *cis* and *trans*. Molecules that happen to have the native *cis* isomer fold fast (50 s⁻¹); those with *trans* must wait for isomerisation, a slow chemical step (0.02 s⁻¹, time constant 50 s) that does not depend on denaturant (it is not a conformational transition) and is catalysed by the isomerase. (b) After only 100 ms of unfolding, few molecules have had time to isomerise ($k \approx 0.02$ s⁻¹ means about 0.2 % per 100 ms), so almost all still have the native *cis* bond and refolding is almost entirely fast. This "double-jump" experiment is the classic test for proline-limited folding. (c) The fast fraction equals the fraction *cis* at equilibrium in the unfolded state: 20 %. (For many X–Pro bonds in unfolded chains the *cis* fraction is 10–30 %.)
:::
:::

::: exercise Stability and disease mutations {level=3}
A metabolic enzyme has $\Delta G_\mathrm U = 18$ kJ mol⁻¹ at 37 °C. Patients carrying a missense mutation that destabilises it by $\Delta\Delta G = -8$ kJ mol⁻¹ have about 10 % of normal enzyme activity in cells, although the purified mutant enzyme, when folded, is fully active. (a) What fraction of the wild-type and mutant enzymes is unfolded at equilibrium? (b) Why might the cellular activity be much lower than these fractions suggest? (c) Suggest two strategies that could restore activity, and the principle behind each.
::: solution
(a) $RT = 2.579$ kJ mol⁻¹. Wild type: $K = e^{-18/2.579} = 9.3\times10^{-4}$, so 0.09 % unfolded. Mutant ($\Delta G = 10$ kJ mol⁻¹): $K = 0.021$, so about 2 % unfolded. (b) Equilibrium fractions ignore the cell's quality control. Each excursion to the unfolded state is an opportunity for proteases, ubiquitination and aggregation, which are effectively irreversible, so a 23-fold higher unfolded population can mean a much shorter lifetime and a much lower steady-state level ([[biochemistry/amino-acids-proteins]]: steady state is synthesis divided by the removal rate). Folding during synthesis may also fail more often. (c) A **pharmacological chaperone** — a small molecule, often a reversible ligand or inhibitor of the active site, that binds the native state more tightly than the unfolded one — raises $\Delta G_\mathrm U$ by about $RT\ln(1 + [L]/K_\mathrm d)$ (see [[structural-biology/dynamics-and-design]]). Alternatively, modulating the proteostasis network (for example inhibiting the step that targets the protein for degradation) lets more of the marginally stable protein survive. Both strategies have been explored for lysosomal enzyme disorders; the clinical side is in the [Medicine Atlas](/learn/medicine/).
:::
:::
