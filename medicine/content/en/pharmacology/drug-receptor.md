Almost every drug works by binding to a protein in the body and changing what that protein does. Salbutamol binds to a receptor on airway smooth muscle and relaxes it. Omeprazole binds to the proton pump of the stomach and stops it secreting acid. Naloxone binds to opioid receptors and does nothing at all, which is exactly why it reverses an opioid overdose: it occupies the receptor and keeps the opioid out.

This part of pharmacology is called **pharmacodynamics**: what the drug does to the body. Its central questions are simple. What does the drug bind to? How tightly? Once bound, does it switch the target on, switch it off, or simply sit there? And how does the response grow as the dose rises? The answers explain why some drugs have a ceiling to their effect, why one antagonist can be overcome by more agonist and another cannot, why tolerance develops, and why a drug that is safe at one dose can be dangerous at three times that dose. The next chapters, starting with [[pharmacology/absorption-distribution]], deal with the other half of the subject, **pharmacokinetics**: what the body does to the drug.

## Drug targets {#sec-targets}

Most drugs act on one of four kinds of protein: receptors, ion channels, enzymes and transporters. A few act by simple physical or chemical means instead. Osmotic laxatives hold water in the gut lumen, and antacids neutralise acid. These are the exceptions.

::: definition Receptor and the four receptor superfamilies {#def-families}
A **receptor** is a protein that recognises a specific chemical signal, such as a hormone or neurotransmitter, and converts binding into a change in cell function. Receptors fall into four superfamilies, which differ in structure and in speed.

1. **Ligand-gated ion channels** (ionotropic receptors). The receptor is itself a channel. Binding opens it within milliseconds. Examples are the nicotinic acetylcholine receptor at the neuromuscular junction and the GABA-A receptor in the brain.
2. **G protein-coupled receptors** (GPCRs). A single protein crosses the membrane seven times. Binding activates a G protein inside the cell over seconds. $G_s$ stimulates adenylyl cyclase and raises cyclic AMP; $G_i$ inhibits it; $G_q$ activates phospholipase C, which raises intracellular calcium. Adrenoceptors, muscarinic receptors, opioid receptors and dopamine receptors are all GPCRs, and roughly a third of licensed drugs act on this family.
3. **Kinase-linked receptors**. Binding activates an enzyme, usually a tyrosine kinase, on the inside of the membrane. The effect develops over minutes to hours and often changes gene expression. The insulin receptor and many growth factor receptors belong here.
4. **Nuclear receptors**. These sit inside the cell. Lipid-soluble ligands such as steroid hormones, thyroid hormone and vitamin D cross the membrane, bind, and the receptor–ligand complex alters transcription of target genes. Effects take hours to days.
:::

The other three target classes are just as important clinically. **Ion channels** that are not receptors, such as voltage-gated sodium channels, are blocked by local anaesthetics and by some antiepileptic and antiarrhythmic drugs. **Enzymes** are inhibited by drugs such as ACE inhibitors, statins, aspirin and the cholinesterase inhibitors. **Transporters** carry ions or molecules across membranes; selective serotonin reuptake inhibitors block the serotonin transporter, loop diuretics block the Na⁺/K⁺/2Cl⁻ cotransporter in the loop of Henle, and digoxin inhibits the Na⁺/K⁺-ATPase. The physiology of these signalling pathways is in [[cell-biochemistry/signalling-cell-cycle]] and [[physiology/hormones]].

Signalling through a GPCR or kinase is **amplified**. One activated receptor can activate many G proteins, each of which drives an enzyme that makes many second-messenger molecules. That amplification is why a tissue can give a maximal response when only a small fraction of its receptors are occupied, an idea that returns below as the receptor reserve.

## Binding: affinity and occupancy {#sec-binding}

Drug binding is usually reversible. Drug molecules attach to and leave receptors continually, and at equilibrium the rate of association equals the rate of dissociation. Applying the law of mass action to this equilibrium gives one of the most useful equations in pharmacology.

::: theorem Occupancy and the law of mass action {#thm-occupancy}
For a drug A binding reversibly to a single class of receptor, the fraction of receptors occupied at equilibrium is

$$
p = \frac{[A]}{[A] + K_D}
$$ {#eq-occupancy}

where $[A]$ is the concentration of free drug and $K_D$ is the **equilibrium dissociation constant**. At $[A] = K_D$, half the receptors are occupied. A smaller $K_D$ means higher **affinity**: less drug is needed to occupy the same fraction of receptors.
:::

::: proof
Let the total receptor concentration be $R_T$, the free receptors $R$ and the occupied receptors $AR$. The forward reaction $A + R \to AR$ runs at rate $k_{+1}[A][R]$ and the reverse reaction at $k_{-1}[AR]$. At equilibrium these are equal, so $[A][R]/[AR] = k_{-1}/k_{+1}$, which is defined as $K_D$. Substituting $[R] = R_T - [AR]$ gives $[A](R_T - [AR]) = K_D [AR]$. Rearranging, $[AR](K_D + [A]) = [A] R_T$, and so the occupied fraction is $[AR]/R_T = [A]/([A] + K_D)$. The curve is a rectangular hyperbola in $[A]$; plotted against $\log[A]$ it becomes the familiar S shape, rising from 10% to 90% occupancy over a 81-fold range of concentration (two log units, roughly).
:::

Two consequences matter at the bedside. First, occupancy depends on the *free* concentration at the receptor, not on the total amount in plasma, which is why protein binding matters (see [[pharmacology/absorption-distribution]]). Second, the relationship flattens at the top. Raising the concentration from $K_D$ to $3K_D$ takes occupancy from 50% to 75%, but going from $9K_D$ to $27K_D$ only moves it from 90% to about 96%. Beyond a certain point, extra drug buys almost no extra occupancy, only extra off-target effects.

::: example How much more occupancy does a doubled dose buy? {#ex-occupancy}
An illustrative antagonist has $K_D = 2$ nmol/L at its receptor. At the usual dose the free concentration at the receptor is 6 nmol/L. A prescriber considers doubling the dose, which (assuming linear kinetics) doubles the free concentration to 12 nmol/L. What fraction of receptors is occupied before and after?
::: solution
Use [[#eq-occupancy]].

Before: $p = 6/(6 + 2) = 0.75$, so 75% of receptors are occupied.

After: $p = 12/(12 + 2) = 0.857$, about 86%.

Doubling the dose increases occupancy by only 11 percentage points. If side effects come from a different, lower-affinity target, doubling the concentration may increase occupancy of *that* target much more in proportion. This is the arithmetic behind the common clinical observation that dose increases at the top of the range add more adverse effects than benefit.
:::
:::

## Agonists, antagonists and efficacy {#sec-ligands}

Binding is only half the story. A drug that binds may or may not activate the receptor once it is there. Pharmacology separates these two properties.

::: definition Affinity, efficacy and the types of ligand {#def-ligands}
**Affinity** is how strongly a drug binds to its receptor (measured by $K_D$). **Efficacy** (intrinsic activity) is the ability of the bound drug to activate the receptor and produce a response. The two are independent: a drug can have high affinity and no efficacy at all.

- A **full agonist** binds and activates the receptor enough to produce the maximal response the tissue can give. Examples: morphine at the μ-opioid receptor, salbutamol at β₂-adrenoceptors in airway muscle.
- A **partial agonist** binds and activates, but even at full occupancy produces less than the maximal response. Examples: buprenorphine at μ-opioid receptors, varenicline at nicotinic receptors.
- An **antagonist** binds without activating. It produces no response itself but blocks the response to an agonist. Examples: naloxone, atenolol, losartan.
- An **inverse agonist** binds and reduces the activity of a receptor that is active even without any agonist (**constitutive activity**). Many drugs once described as antagonists, including several H₁ antihistamines, behave as inverse agonists in experimental systems.
:::

The partial agonist has a useful double nature. On its own, it stimulates the receptor modestly. In the presence of a full agonist, it competes for the same receptors and *lowers* the response towards its own smaller maximum. Buprenorphine illustrates both sides. Its ceiling on respiratory depression makes it safer than full opioid agonists in opioid substitution treatment. But given to someone with a high level of a full agonist on board, its high affinity displaces that agonist, the response falls abruptly, and the person can go into **precipitated withdrawal**. For this reason buprenorphine is started only once withdrawal signs have begun ([[psychiatry/substance-use]]).

A receptor can also be blocked indirectly. In **physiological (functional) antagonism**, two drugs act on different receptors with opposite effects on the same tissue. Adrenaline in anaphylaxis is the classic example: it does not block histamine receptors, but by stimulating α₁ and β₂ receptors it constricts vessels and dilates bronchi, opposing what histamine and other mediators are doing ([[emergency-critical-care/anaphylaxis]]). **Chemical antagonism** is simpler still: the antagonist binds the drug itself, as protamine binds heparin.

::: warning Potency is not the same as efficacy
A drug is more **potent** when a smaller dose gives a given effect; it is more **efficacious** when its maximal effect is larger. Fentanyl is far more potent than morphine, but both are full agonists with the same maximal effect, so "more potent" does not mean "stronger" in any clinically useful sense. The equianalgesic tables used in palliative care convert between doses precisely because potency differs while efficacy is the same. A clinically better drug is usually one with greater efficacy, better selectivity or better kinetics, not simply higher potency.
:::

## Dose–response curves {#sec-curves}

If response is measured at a range of agonist concentrations in a single tissue or person, the result is a **graded** dose–response curve. If instead a fixed all-or-none effect (such as "seizure stopped" or "death") is recorded in a population, the result is a **quantal** curve. Each has its own uses.

::: definition Graded and quantal dose–response relationships {#def-curves}
A **graded** curve relates concentration to the size of a response in one system. It is usually described by the **Hill equation**

$$
E = \frac{E_{\max}\,[A]^{n}}{EC_{50}^{\,n} + [A]^{n}}
$$ {#eq-hill}

where $E_{\max}$ is the maximal response (a measure of efficacy), $EC_{50}$ is the concentration giving half the maximal response (a measure of potency) and $n$ is the **Hill coefficient**, which sets the steepness. With $n = 1$ the curve has the same shape as [[#eq-occupancy]].

A **quantal** curve plots the percentage of a population showing a defined effect against dose. Its midpoint is the **ED₅₀** (the dose effective in 50% of subjects); for a toxic effect it is the **TD₅₀**, and in animal studies the **LD₅₀**. The **therapeutic index** is

$$
TI = \frac{TD_{50}}{ED_{50}}.
$$ {#eq-ti}

A drug with a low therapeutic index, such as digoxin, lithium, warfarin, gentamicin or phenytoin, has little separation between doses that help and doses that harm, and usually needs monitoring.
:::

Dose–response curves are almost always plotted against the logarithm of dose or concentration. On a log axis the hyperbola becomes a symmetrical S-shaped curve, the middle part is nearly straight, and a change in potency appears as a sideways shift without any change in shape. The figure below shows the main patterns.

::: widget plot
f: 100/(1+10^(-x)); 40/(1+10^(-x)); 100/(1+(1+B)*10^(-x)); 100*p/(1+10^(-x))
x: -3, 4
y: 0, 105
sliders: B=10:0:100:1; p=0.5:0:1:0.05
labels: \text{full agonist}; \text{partial agonist}; \text{agonist + competitive antagonist}; \text{agonist + irreversible antagonist}
hlines: 50
caption: Simplified log concentration–response curves, with concentration in multiples of the agonist's $EC_{50}$ (so $x = 0$ is the $EC_{50}$). Move $B$, the competitive antagonist concentration expressed as a multiple of its $K_B$: the curve shifts right by $\log_{10}(1+B)$ but reaches the same maximum. Move $p$, the fraction of receptors left after an irreversible antagonist: the maximum falls. This illustrative model ignores receptor reserve, which in real tissues delays the fall of the maximum.
:::

The Hill coefficient matters more than its abstract look suggests. A steep curve ($n > 1$) means a small change in concentration crosses from little effect to near-maximal effect. Neuromuscular blocking drugs and many anaesthetic agents have steep curves, which is one reason they are titrated and monitored so carefully.

::: example Reading a therapeutic index {#ex-ti}
In an illustrative animal study of a new anticonvulsant, the ED₅₀ for abolishing seizures is 8 mg/kg and the TD₅₀ for severe sedation is 120 mg/kg. A second drug has ED₅₀ 5 mg/kg and TD₅₀ 20 mg/kg. Calculate both therapeutic indices and comment.
::: solution
From [[#eq-ti]]: drug 1 has $TI = 120/8 = 15$; drug 2 has $TI = 20/5 = 4$.

Drug 2 is more potent (lower ED₅₀) but has the smaller margin of safety. The therapeutic index compares only the midpoints of two curves, however. If the toxicity curve is shallow, some individuals will be harmed at doses well below TD₅₀. A more cautious comparison uses a ratio such as TD₁/ED₉₉, the dose harmful to 1% of subjects divided by the dose effective in 99%. In humans, the practical equivalent is the **therapeutic window**: the range of plasma concentrations associated with benefit without unacceptable toxicity, which is the basis of drug monitoring in [[pharmacology/dosing-principles]].
:::
:::

### Receptor reserve

In many tissues an agonist produces its maximal response when only a fraction of receptors are occupied. The unoccupied receptors are called **spare receptors**, and the phenomenon **receptor reserve**. It follows from amplification: once enough receptors are active to saturate a downstream step, further activation adds nothing.

Receptor reserve has three practical consequences. First, the EC₅₀ of a full agonist is lower than its $K_D$; the drug looks more potent in the tissue than its binding alone would suggest. Second, an irreversible antagonist first shifts the agonist curve to the right and only later, once the reserve is used up, depresses the maximum. Third, whether a drug behaves as a full or a partial agonist depends partly on the tissue. A drug with modest efficacy can give a full response in a tissue with a large reserve and only a partial one in a tissue with few receptors. This is one reason why the same β-agonist can have different effects on airway and on cardiac muscle.

## Antagonism {#sec-antagonism}

Antagonists are among the most widely used drugs: β-blockers, angiotensin receptor blockers, antihistamines, antipsychotics (largely dopamine D₂ antagonists) and opioid antagonists. How they block matters, because it decides whether the block can be overcome.

::: theorem Competitive antagonism and the dose ratio {#thm-schild}
A **competitive (surmountable) antagonist** binds reversibly to the same site as the agonist. In its presence the agonist concentration–response curve shifts to the right in parallel, with the same maximum. The size of the shift is the **dose ratio** (DR): the factor by which the agonist concentration must be increased to give the same response. For a simple competitive antagonist at concentration $[B]$ with dissociation constant $K_B$, the Gaddum–Schild equation gives

$$
DR = 1 + \frac{[B]}{K_B}.
$$ {#eq-schild}

On a log axis the curve moves right by $\log_{10}(DR)$. The **pA₂** of an antagonist is the negative log of the concentration that gives a dose ratio of 2; for a simple competitive antagonist it equals $-\log_{10} K_B$.
:::

::: proof
With agonist A and antagonist B competing for the same receptor, mass action applied to both gives the occupancy by A as

$$
p_A = \frac{[A]}{[A] + K_D\left(1 + [B]/K_B\right)}.
$$

This is [[#eq-occupancy]] with $K_D$ multiplied by $1 + [B]/K_B$. If the response depends only on $p_A$, any response obtained at agonist concentration $[A]$ without antagonist is obtained at $[A]\,(1 + [B]/K_B)$ with it. That multiplying factor is the dose ratio. Because the maximum of $p_A$ is still 1 as $[A]$ becomes large, the maximal response is unchanged.
:::

**Irreversible antagonists** bind covalently or dissociate so slowly that they are effectively permanent. Adding more agonist cannot displace them, so once receptor reserve is exhausted the maximal response falls. Recovery needs new receptor or enzyme protein. Phenoxybenzamine, used before surgery for phaeochromocytoma, irreversibly blocks α-adrenoceptors. Aspirin acetylates cyclooxygenase-1 in platelets; because platelets have no nucleus and cannot make new enzyme, the effect lasts for the life of the platelet, about 7 to 10 days. Omeprazole and the other proton pump inhibitors bind the proton pump covalently, which is why a drug with a plasma half-life of about an hour suppresses acid for much longer.

**Non-competitive antagonists** act at a different site from the agonist, or block a step after the receptor, so they also depress the maximum. Many act at **allosteric** sites (below).

::: example Overcoming a β-blocker {#ex-beta-block}
A 64-year-old woman of Caribbean heritage who takes bisoprolol for angina is admitted with a fast, poorly tolerated tachyarrhythmia and is later found to have taken a much larger quantity of a β-blocker than prescribed. Her blood pressure is low and her heart rate 38/min. Explain, using [[#thm-schild]], why high doses of a β-agonist may be needed, and why other treatments are used alongside.
::: solution
Bisoprolol is a competitive β₁ antagonist. At high concentration, $[B]/K_B$ is large, so the dose ratio is large: the curve for any β-agonist (endogenous noradrenaline and adrenaline, or a drug given intravenously) is shifted far to the right. In principle the block is surmountable, so a sufficiently high agonist concentration restores the response; in practice the doses needed may be very high and cause other effects.

Clinical management therefore also uses drugs that bypass the β-receptor entirely, illustrating physiological antagonism. Glucagon acts through its own $G_s$-coupled receptor to raise cyclic AMP in cardiac muscle; high-dose insulin with glucose improves myocardial energy use. Management of a suspected overdose follows current toxicology advice (in the UK, TOXBASE and the National Poisons Information Service), and the details belong to [[emergency-critical-care/poisoning]].
:::
:::

::: example Calculating a dose ratio {#ex-dose-ratio}
In an isolated tissue experiment, a competitive antagonist with $K_B = 5$ nmol/L is added at 45 nmol/L. (a) By what factor must the agonist concentration be increased to restore the original response? (b) By how many log units does the curve shift? (c) What antagonist concentration would give a dose ratio of 2?
::: solution
(a) From [[#eq-schild]], $DR = 1 + 45/5 = 10$. The agonist concentration must be increased tenfold.

(b) The shift is $\log_{10} 10 = 1$ log unit to the right.

(c) $DR = 2$ requires $[B]/K_B = 1$, so $[B] = K_B = 5$ nmol/L. The pA₂ is $-\log_{10}(5\times10^{-9}) \approx 8.3$.
:::
:::

### Allosteric modulators

An **allosteric modulator** binds to a site on the receptor distinct from the agonist (orthosteric) site and changes how the receptor responds to its natural ligand. A **positive allosteric modulator** increases the effect of the agonist; a negative one reduces it. Benzodiazepines are the best known clinical example. They bind at the interface between α and γ subunits of the GABA-A receptor and increase the effect of GABA, raising the frequency of channel opening. They do little in the absence of GABA, which is one reason why benzodiazepines alone are less likely than barbiturates to cause fatal respiratory depression, although the risk rises sharply with alcohol, opioids or other depressants. Flumazenil is a competitive antagonist at the benzodiazepine site. Cinacalcet, used in hyperparathyroidism, is a positive allosteric modulator of the calcium-sensing receptor, making parathyroid cells respond as if calcium were higher ([[endocrine/bone-calcium]]).

::: quiz
A new agonist is tested on an isolated tissue alone and then in the presence of a fixed concentration of an unknown antagonist. The curve with antagonist is shifted to the right, parallel to the first, and reaches the same maximum. The shift is the same whether the antagonist is washed out after 5 or 60 minutes of exposure. Which antagonist best explains this?
- [x] A reversible competitive antagonist at the agonist binding site
- [ ] An irreversible antagonist in a tissue with no receptor reserve
- [ ] A negative allosteric modulator that lowers efficacy
- [ ] A physiological antagonist acting on a different receptor
::: solution
A parallel shift with an unchanged maximum is the signature of competitive, surmountable antagonism ([[#thm-schild]]). An irreversible antagonist in a tissue with no reserve would depress the maximum. A negative allosteric modulator that lowers efficacy also depresses the maximum. A physiological antagonist opposes the response through a different pathway and generally changes the shape and maximum of the curve rather than producing a clean parallel shift.
:::
:::

## Changes in response over time {#sec-regulation}

Responses to drugs are not fixed. Receptors are made, moved and destroyed continually, and cells adjust to sustained stimulation or blockade.

::: definition Desensitisation, tolerance and receptor regulation {#def-tolerance}
**Desensitisation** (or **tachyphylaxis**) is a loss of response that develops within minutes of continuous or repeated exposure to an agonist. **Tolerance** is a more gradual reduction in response over days to weeks, so that a higher dose is needed for the same effect. Their mechanisms include:

- **receptor uncoupling and internalisation**: phosphorylation of an activated GPCR by G protein-coupled receptor kinases allows β-arrestin to bind, which blocks G protein coupling and leads to removal of the receptor from the membrane;
- **down-regulation**: fewer receptors are made or more are destroyed under sustained stimulation; **up-regulation** is the opposite response to sustained blockade;
- **depletion of mediators**, for example loss of the stored noradrenaline that indirectly acting sympathomimetics release;
- **pharmacokinetic tolerance**, in which the drug induces its own metabolism (carbamazepine is an example);
- **physiological adaptation**, in which homeostatic mechanisms oppose the drug's effect.
:::

These mechanisms explain several practical rules. Patients who take organic nitrates continuously lose their anti-anginal effect within days, so long-acting nitrates are prescribed with a daily nitrate-low interval. Regular high use of short-acting β₂ agonists down-regulates airway β₂ receptors and is a marker of poorly controlled asthma ([[respiratory/asthma-copd]]). After long-term β-blockade, the number of β-receptors rises; stopping the drug abruptly leaves an increased number of receptors exposed to normal catecholamine levels, and rebound tachycardia, hypertension or angina can follow. Long-term treatment should therefore usually be withdrawn gradually. Opioid tolerance develops to analgesia and respiratory depression but much less to constipation and miosis, which is why constipation persists in people taking long-term opioids.

**Dependence** is a related but distinct idea: the adaptations to a drug become necessary for normal function, so stopping produces a withdrawal syndrome that is usually the opposite of the drug's acute effect.

::: example The naloxone that wore off {#ex-naloxone}
A 31-year-old man is found drowsy with a respiratory rate of 6/min and pinpoint pupils. He responds within two minutes to intravenous naloxone and becomes alert. Forty-five minutes later he is drowsy again with slow breathing. Packaging found with him suggests he had taken a long-acting opioid. Explain what happened using receptor and time-course principles.
::: solution
Naloxone is a competitive antagonist at μ-opioid receptors with high affinity and no efficacy. Given intravenously it rapidly displaces the opioid, occupancy by the agonist falls, and breathing and consciousness return. Because the antagonism is competitive, the outcome depends on the relative concentrations of the two drugs at the receptor ([[#thm-schild]]).

Naloxone has a short duration of action (after an intravenous dose its effect typically lasts somewhere between 20 and 90 minutes), whereas a long-acting opioid such as methadone or a modified-release preparation remains in the body for many hours. As the naloxone concentration falls, $[B]/K_B$ falls, the dose ratio shrinks, and the persisting opioid again occupies enough receptors to depress breathing. This **re-narcotisation** is why people treated with naloxone are observed, why repeated doses or an infusion may be needed, and why the opioid involved matters. Management follows current local and national guidance ([[emergency-critical-care/poisoning]]).

The rapid reversal also carries a risk: in a person dependent on opioids, a large dose of naloxone can precipitate acute withdrawal. Titrating small doses to adequate breathing, rather than to full wakefulness, is the usual principle.
:::
:::

## Selectivity and the shape of clinical effects {#sec-selectivity}

No drug is perfectly specific. **Selectivity** describes a preference, usually expressed as the ratio of a drug's affinity for its intended target to its affinity for others. It is always relative and dose-dependent: a "β₁-selective" blocker such as bisoprolol blocks β₂ receptors as well at higher concentrations, which is why β-blockers are used with caution in people with asthma.

Many adverse effects are predictable once the full list of a drug's targets is known. Tricyclic antidepressants block muscarinic, histamine H₁ and α₁-adrenoceptors as well as monoamine transporters, which explains their dry mouth, sedation and postural hypotension; at high concentration they block cardiac sodium channels, which is why they are dangerous in overdose. Many antipsychotics block D₂ receptors in the striatum as well as in the mesolimbic pathway, producing movement disorders. Recognising these patterns is the basis of the classification of adverse reactions in [[pharmacology/adverse-reactions]].

::: history
The idea of a receptor came from two directions at the start of the twentieth century. John Newport Langley, working in Cambridge on the effects of nicotine and curare on skeletal muscle, proposed in 1905 a "receptive substance" on muscle cells that combined with these drugs. Paul Ehrlich, working on dyes and antimicrobial chemicals, developed his side-chain theory and summarised it in the phrase *corpora non agunt nisi fixata*: substances do not act unless they are bound. Alfred Joseph Clark applied the law of mass action to drug–receptor binding in the 1920s and 1930s, giving the occupancy equation used in this chapter. In 1948 Raymond Ahlquist divided adrenoceptors into α and β types from the order of potency of a series of agonists, and in the 1950s Everhardus Ariëns and Robert Stephenson separated affinity from efficacy and introduced the ideas of intrinsic activity and spare receptors. Heinz Otto Schild developed the quantitative analysis of competitive antagonism in the late 1940s. Receptors remained largely theoretical until they were isolated and cloned; Robert Lefkowitz and Brian Kobilka shared the 2012 Nobel Prize in Chemistry for their work on G protein-coupled receptors, including the crystal structure of the β₂-adrenoceptor bound to its G protein.
:::

::: summary
- Most drugs act on receptors, ion channels, enzymes or transporters. Receptors form four superfamilies: ligand-gated ion channels, G protein-coupled receptors, kinase-linked receptors and nuclear receptors.
- Occupancy follows the law of mass action: $p = [A]/([A]+K_D)$. Affinity ($K_D$) and efficacy are separate properties.
- Full agonists produce the maximal response, partial agonists a lower ceiling, antagonists none, and inverse agonists reduce constitutive activity. Partial agonists can act as antagonists in the presence of a full agonist.
- Potency (EC₅₀) is not efficacy (Eₘₐₓ). The therapeutic index, TD₅₀/ED₅₀, measures the margin between benefit and harm; low-index drugs need care and often monitoring.
- Competitive antagonists shift the curve right in parallel, by a dose ratio $1 + [B]/K_B$; irreversible and non-competitive antagonists depress the maximum. Receptor reserve modifies both.
- Desensitisation, tolerance, down-regulation and up-regulation explain nitrate tolerance, rebound after stopping β-blockers and the need to withdraw many drugs gradually.
:::

## Where this leads

The autonomic receptors and the drugs that act on them are developed in [[pharmacology/autonomic-drugs]]. How a dose reaches its receptor, and for how long, is the subject of [[pharmacology/absorption-distribution]], [[pharmacology/metabolism-excretion]] and [[pharmacology/dosing-principles]]. Variation in receptors and in response between people is covered in [[pharmacology/patient-variation]], and the synaptic physiology behind many targets in [[physiology/synapses]].

## Exercises

::: exercise Occupancy at a given concentration {level=1 check="80"}
A drug binds reversibly to its receptor with $K_D = 10$ nmol/L. What percentage of receptors are occupied when the free drug concentration is 40 nmol/L? Give a whole number.
::: hint
Use $p = [A]/([A] + K_D)$ and convert to a percentage.
:::
::: solution
$p = 40/(40 + 10) = 0.8$, so 80% of receptors are occupied.
:::
:::

::: exercise Classify the ligand {level=1}
For each description, name the type of ligand: (a) binds to β₂-adrenoceptors and produces the maximal bronchodilation the tissue can give; (b) binds to μ-opioid receptors, produces some analgesia alone, and reduces the effect of morphine when both are present; (c) binds to H₁ receptors and reduces their activity below the level seen with no ligand at all; (d) binds to angiotensin AT₁ receptors and produces no response, but blocks the effect of angiotensin II.
::: solution
(a) Full agonist. (b) Partial agonist: it has efficacy of its own but less than morphine, so it lowers the response when it competes with a full agonist. (c) Inverse agonist: it reduces constitutive (agonist-independent) receptor activity. (d) Antagonist (in practice a competitive antagonist; losartan is an example).
:::
:::

::: exercise Potency or efficacy? {level=1}
Drug X gives a maximal fall in blood pressure of 20 mmHg with an ED₅₀ of 2 mg. Drug Y gives a maximal fall of 35 mmHg with an ED₅₀ of 50 mg. Which is more potent, and which more efficacious? Which property matters more when choosing between them for a person whose blood pressure is 40 mmHg above target?
::: solution
X is more potent (lower ED₅₀). Y is more efficacious (larger maximal effect). For a person who needs a large reduction, efficacy matters more: no dose of X can produce more than a 20 mmHg fall, whereas Y can. A higher milligram dose is not a disadvantage in itself.
:::
:::

::: exercise Shifting the curve {level=2 check="2"}
A competitive antagonist has $K_B = 1$ nmol/L. A patient's free concentration at the receptor is 99 nmol/L. By how many log units is the agonist concentration–response curve shifted to the right? Give an exact whole number.
::: hint
Find the dose ratio first, then take its base-10 logarithm.
:::
::: solution
$DR = 1 + 99/1 = 100$. The shift is $\log_{10} 100 = 2$ log units: the agonist concentration must be increased 100-fold for the same response.
:::
:::

::: exercise A partial agonist in practice {level=2}
A 45-year-old woman who has been using illicit heroin daily is due to start opioid substitution treatment with buprenorphine. Explain, using receptor theory, why the first dose is usually delayed until she shows objective signs of withdrawal, and why buprenorphine carries a lower risk of fatal respiratory depression than methadone when taken alone.
::: solution
Buprenorphine is a high-affinity partial agonist at μ-opioid receptors. If it is given while heroin (and its active metabolites, mainly morphine) still occupies many receptors, it displaces the full agonist because of its high affinity, but produces less receptor activation. The net effect falls abruptly, causing precipitated withdrawal. Waiting until withdrawal has started means that few receptors are occupied by full agonist, so buprenorphine increases rather than decreases the net effect.

Because its efficacy is limited, the respiratory depression it produces plateaus as the dose rises (a ceiling effect). Methadone is a full agonist with no ceiling. The protection is relative: combined with other depressants such as benzodiazepines, gabapentinoids or alcohol, buprenorphine can still contribute to fatal respiratory depression.
:::
:::

::: exercise Why aspirin outlasts its half-life {level=2}
Aspirin has a plasma half-life of about 15 to 20 minutes, yet a single dose reduces platelet aggregation for several days, and surgeons often ask for antiplatelet drugs to be reviewed a week before some operations. Explain this using the type of antagonism involved, and predict how the time to recovery would change for a reversible COX inhibitor such as ibuprofen.
::: solution
Aspirin acetylates a serine residue in the active site of platelet cyclooxygenase-1, an irreversible covalent change. Platelets have no nucleus and cannot synthesise new enzyme, so each affected platelet is inhibited for the rest of its life. Function returns only as new platelets are released from the bone marrow; with a platelet lifespan of about 7 to 10 days, roughly a tenth of the platelet pool is replaced each day. The duration of effect is set by target turnover, not by the drug's half-life.

Ibuprofen inhibits COX reversibly and competitively, so its antiplatelet effect falls as plasma concentrations fall and largely disappears within a day. (Ibuprofen taken shortly before aspirin can also block aspirin's access to the enzyme, an interaction worth knowing.) Decisions about stopping antiplatelet drugs before surgery follow local perioperative guidance and the reason the drug was started.
:::
:::

::: exercise Steepness and safety {level=3 check="round(100*0.5^4/(0.5^4+1))"}
Two drugs have the same EC₅₀ for a toxic effect but different Hill coefficients, $n = 1$ and $n = 4$. Using [[#eq-hill]], with the toxic response expressed as a percentage of maximum, calculate the toxic response at half the EC₅₀ for the drug with $n = 4$, to the nearest whole percent, and compare it with the drug with $n = 1$. What does this imply for dosing near the toxic range?
::: hint
Put $[A] = 0.5\,EC_{50}$ into the Hill equation: $E/E_{\max} = 0.5^n/(0.5^n + 1)$.
:::
::: solution
For $n = 4$: $E/E_{\max} = 0.0625/(0.0625 + 1) = 0.0588$, about **6%**.

For $n = 1$: $E/E_{\max} = 0.5/1.5 = 0.333$, about 33%.

At half the toxic EC₅₀, the steep curve shows very little toxicity, while the shallow curve already shows a third of the maximal toxic effect. But the steep curve rises quickly: at $2\,EC_{50}$ the $n = 4$ drug gives $16/17 \approx 94\%$ of the maximal toxic response, against 67% for $n = 1$. A steep toxicity curve therefore means a narrow transition from apparently safe to seriously toxic. Small rises in concentration, for example from an interaction or declining kidney function, can produce sudden toxicity with little warning, which is why such drugs are titrated in small steps and monitored.
:::
:::

::: exercise Explaining tolerance and rebound {level=3}
A 58-year-old man has taken propranolol for ten years for essential tremor and hypertension. He runs out while abroad and, two days later, develops palpitations and chest tightness on exertion. A month before, he had started using isosorbide mononitrate twice daily at 8 am and 8 pm, and he reports that his angina relief seemed to fade after the first week. Explain both observations in terms of receptor regulation, and outline the principles that would prevent each problem.
::: solution
**Rebound after stopping the β-blocker.** Long-term blockade of β-adrenoceptors leads to up-regulation: cells increase the number of receptors in response to reduced stimulation. When propranolol is stopped abruptly, its concentration falls over a day or so, and normal circulating catecholamines now act on more receptors than before treatment. Heart rate, contractility and myocardial oxygen demand rise, which can provoke angina or arrhythmia in someone with coronary disease. The principle is gradual withdrawal of long-term β-blockers where possible, and continuity of supply (for example advice before travel).

**Nitrate tolerance.** Continuous exposure to organic nitrates leads to tolerance within days. Mechanisms proposed include impaired bioactivation of the nitrate to nitric oxide, oxidative stress, and counter-regulatory neurohormonal changes. Twice-daily dosing twelve hours apart gives continuous exposure. The principle is an asymmetric schedule (for example doses in the morning and early afternoon for a standard-release preparation, or once-daily modified-release) so that there is a nitrate-low period each day, usually overnight. Prescribing details follow the BNF and local guidance. His new symptoms need clinical assessment rather than simply a dose increase.
:::
:::

::: exercise Designing a receptor experiment {level=3}
A research group has a new compound that they think is a competitive antagonist at the histamine H₂ receptor. They can measure gastric acid secretion from isolated gastric glands in response to histamine. Describe an experiment, and the results you would expect, that would (a) show whether the antagonism is competitive, and (b) estimate $K_B$. What result would suggest an irreversible antagonist instead?
::: solution
(a) Construct full concentration–response curves to histamine alone and then in the presence of several fixed concentrations of the compound (for example three concentrations spanning a tenfold range or more), allowing time for equilibrium at each. Competitive antagonism predicts parallel rightward shifts with no fall in the maximum, and larger shifts at higher antagonist concentrations. The effect should reverse on washout.

(b) For each antagonist concentration, measure the dose ratio at the same response level (for example at 50% of maximum). Plot $\log(DR - 1)$ against $\log[B]$, a Schild plot. For simple competitive antagonism this gives a straight line with slope 1, and the intercept on the $\log[B]$ axis is $\log K_B$ (equivalently, from [[#eq-schild]], $K_B = [B]/(DR - 1)$ at any single concentration). A slope clearly different from 1 suggests that the antagonism is not simple competition at one site.

An irreversible antagonist would give rightward shifts at low concentrations (while the receptor reserve lasts) and then a falling maximum at higher concentrations, with no recovery on washout. Recovery would need new receptor synthesis.
:::
:::
