Between every two neurons — and between every motor nerve and muscle fibre — sits a gap twenty nanometres wide across which electrical signals are translated into molecular ones and back again. The synapse is where the nervous system does most of its computation and almost all of its pharmacology: it is the target of anaesthetics, analgesics, anxiolytics, antipsychotics, antiepileptics, pesticides and nerve gases; its failure names myasthenia and its poisoning names botulism; and its modifiability — the activity-dependent strengthening and weakening of release and response — is the physical basis of memory.

This chapter covers the chemical synapse's mechanism, quantal transmission and its safety margins, inhibition and the reversal-potential logic, the transmitters and their families, and presynaptic modulation and plasticity.

## The chemical synapse, step by step

::: definition The synaptic sequence {#def-sequence}
An arriving action potential opens **voltage-gated Ca²⁺ channels** (P/Q- and N-type) clustered at the **active zone**; local Ca²⁺ rises to hundreds of micromolar for milliseconds at sensor proteins (**synaptotagmin**) that drive the **SNARE complex** (synaptobrevin/VAMP on the vesicle, syntaxin and SNAP-25 on the membrane) to fuse synaptic vesicles in a cooperatively **fourth-power-dependent** relation to that Ca²⁺ microdomain — a single spike releases a few of the several hundred vesicles in the bouton's readily-releasable pool. Transmitter diffuses across the cleft in tens of microseconds and acts on **post-synaptic receptors** (ionotropic — ligand-gated ion channels, milliseconds; metabotropic — G-protein-coupled, tens of milliseconds to minutes), and is then terminated by **reuptake transporters** (DAT, SERT, NET, GLT-1 for glutamate into glia), **enzymatic degradation** (acetylcholinesterase in the neuromuscular junction and cholinergic synapses; the peptide synapses simply diffuse away), or **diffusion**. The vesicle cycle then recycles membrane and SNAREs (endophilin, dynamin, Hsc70 uncoating) in tens of seconds, with a reserve pool mobilised on demand — the machinery whose statistics the next section measures.
:::

::: definition Electrical synapses and hybrid transmission {#def-electrical}
**Gap junctions** (connexons of connexin proteins; innexins in invertebrates) couple cells metabolically and electrically with essentially no delay, bidirectional or (with asymmetric subunit composition) rectifying: they dominate in cardiac muscle (the intercalated disc — the functional syncytium of [[cardiovascular/cardiac-cycle]]), in smooth muscle, in astrocyte networks, and in several brainstem escape circuits and the inferior-olive timing network; they also permit the metabolic coupling that makes glia a syncytial potassium-buffering system. Some systems combine the two (the classical mixed electrical–chemical synapses on the teleost Mauth cell and the crayfish tonic flexor), and ephaptic coupling — field effects of activity on neighbouring membranes — is now recognised in the brain's high-resistance extracellular space where pyramidal-cell layers sit. Electrical synapses conduct fast and fail to amplify, which is why the CNS uses chemical transmission where computation is needed, and the heart uses both where speed and unity are.
:::

## Quantal transmission and its margins

::: definition Quanta, packets and the safety factor {#def-quantal}
Post-synaptic potentials are **granular**: the smallest unit is the **quantal potential** — the response to one vesicle's contents (a few tens of millivolts at the neuromuscular junction's **end-plate potential**, a fraction of a millivolt in central neurons), released in a Poisson-like stochastic process. The **end-plate potential** at the motor end-plate is the summed release of ~50–100 quanta (quantal content), giving a ~40 mV depolarisation that fires the muscle fibre with a **safety factor** of several-fold — the junction works even when half the acetylcholine receptors are blocked or half the calcium entry is removed. Central synapses run the opposite economy: **one to a few quanta per spike**, probabilities of release near 0.1–0.5, excitations of 0.1–1 mV — so cortical transmission is unreliable by design, rescued by convergence (thousands of inputs), by recurrent circuits, and by short-term plasticity; the same statistics, in the reverse direction at inhibition, are why a depolarised interneuron's high-frequency burst can veto a pyramidal cell where a single release event cannot.
:::

::: example Two fatigues, one junction {#ex-junctions}
A 45-year-old woman has ptosis and diplopia that worsen by evening; a 60-year-old smoker has proximal weakness that *improves* with the first minutes of exercise and dry mouth; and a 30-year-old has descending paralysis after home-canned food.
::: solution
The three patients sit at three points of the same apparatus. **Myasthenia gravis** — autoantibodies against the postsynaptic nicotinic acetylcholine receptor (or MuSK, or LRP4) — reduces available receptors: the end-plate potential still sums but its safety factor is spent, so repeated activity (runs of failures with the natural decay of release) drives the end-plate potential below threshold and the fibre fails — hence fatigable weakness, the ice-pack test's physics (cooling improves the safety factor by slowing channel kinetics, the same biophysics as Uhthoff's converse), and the diagnostic increment on repetitive-nerve stimulation. **Lambert–Eaton myasthenic syndrome** — antibodies against presynaptic P/Q-type Ca²⁺ channels, usually paraneoplastic (small-cell carcinoma) — reduces quantal **content**: the first volleys fail, but the residual calcium accumulating during a few seconds of activity (post-tetanic facilitation) recruits release, so strength *improves* with effort and the autonomic features (dry mouth, impotence) reflect the same channels in autonomic synapses. **Botulism** — the clostridial light chain cleaving SNARE proteins (SNAP-25, synaptobrevin, syntaxin by type) at cholinergic terminals — abolishes release outright, flaccid paralysis with dilated pupils and the bulbar and respiratory failures, the antitoxin only halting further binding while recovery waits on the sprouting of new terminals over weeks. The pattern-recognition rule: **fatigable weakness with ocular onset — post-tetanic potentiation with autonomic onset — descending paralysis with autonomic and pupillary onset**, is respectively the postsynaptic, the presynaptic-calcium, and the release-machinery lesion, and each has a confirmatory electrodiagnostic signature and a distinct therapy (immunotherapy and pyridostigmine; 3,4-diaminopyridine to prolong the presynaptic depolarisation and immunotherapy; antitoxin and ventilation).
:::
:::

## Inhibition, reversal potentials, and the chloride set-point

::: definition Reversal potential logic {#def-reversal}
A synapse's sign is set not by its transmitter but by its receptor's **reversal potential** relative to rest: glutamate-gated channels (AMPA: Na⁺/K⁺, E ≈ 0 mV) depolarise — **excitatory post-synaptic potential**; GABA_A and glycine channels (Cl⁻, E_Cl near or below rest) hyperpolarise or, more usually in adult cortex, **shunt** — holding the membrane at the reversal potential and short-circuiting concurrent excitations (the "conductance block" that makes inhibition more than the sum of its hyperpolarisations); K⁺-conducting inhibitory responses (GABA_B via GIRK, E_K ≈ −90 mV) hyperpolarise slowly and long. The developmental **potassium–chloride cotransporter switch** (the NKCC1-high, KCC2-low neonatal neuron accumulating Cl⁻, flipping E_Cl positive to rest) makes GABA **depolarising in the immature nervous system** — excitatory, and the reason neonatal seizures recruit different drugs (phenobarbital's GABA_A-mediated depolarisation and long channel openings) and why agents that raise intracellular chloride (KCC2 manipulations) are experimental pro-convulsants and KCC2-upregulation is an endogenous anticonvulsant direction. GABA_B's metabotropic inhibition, presynaptic (blocking Ca²⁺ channels) and postsynaptic (GIRK), is the slow inhibition of baclofen and of the spasticity-circuit, and, in thalamocortical relay neurons, the T-current and spindle/absence oscillation machinery with its own chapter in [[nervous-system/epilepsy]].
:::

::: theorem Convergence and coincidence: what a neuron decides {#thm-integration}
A cortical pyramidal neuron receives ~7000 synapses, most spiny and excitatory on dendrites, the inhibitory ones strategically placed — soma-targeting chandelier (axo-axonic) cells at the initial segment where spikes are born, basket cells on the perimeter of the soma for coincidence-window control, dendrite-targeting interneurons gating individual branches. Because excitations attenuate electrotonically toward the soma while **inhibitory shunts act at the decision point**, and because **NMDA receptors in spines detect pre-post coincidence** (depolarisation relieving the Mg²⁺ block, calcium influx as the instructive signal — the Hebb synapse, the basis of LTP and learning — with LTD from low, slow calcium rise), the neuron is not a summing junction but a two-layer network (the dendrites computing branch-wise nonlinearities and spike back-propagations writing the plasticity) with the soma as its output stage.
:::

::: example The hundred-millisecond window: feedforward inhibition {#ex-window}
Stimulating the perforant path evokes in a dentate granule cell an excitatory potential that peaks at 5 ms and an inhibitory one that begins at 8 ms; the cell fires only if excitation wins inside that gap.
::: solution
This is **feedforward inhibition** — the afferent excites the principal cell and, in parallel and with a slightly longer route (through a fast-spiking basket cell with its own high-conductance, Kv3-powered high-frequency firing), drives perisomatic GABA_A inhibition that truncates the excitation. The result is a **narrow time window for coincidence**, an exact control of spike timing rather than rate, and — because the inhibition is shunting at the soma's spike-entry zone ([[#thm-integration]]) — a divide-by-nothing circuit that turns synchronised, precisely timed input into output while diffuse input is suppressed. The physiology has clinical voices: the basket cell's parvalbumin system, its NMDA-light/AMPA-heavy fast transmission and its vulnerability in schizophrenia (the GABAergic interneuron hypothesis with its oscillation and gamma-band consequences), in temporal-lobe epilepsy (loss of perisomatic inhibition and the re-excitability of the dentate), and in benzodiazepine pharmacology (the α1-containing receptors of sedation versus the α2/3 anxiolytic and the α5 amnestic ones — the same receptors as the window, tuned differently by subunit). The lesson is once more the theorem in miniature: **the sign of a circuit is the timing of its conductances**, and an inhibition that arrives three milliseconds late is not a brake but a metronome.
:::
:::

## The transmitter families

| Family | Members | Synthesis | Termination | Chief receptors/sites |
|---|---|---|---|---|
| Acetylcholine | somatic motor, autonomic ganglia, parasympathetic, CNS | choline + acetyl-CoA (ChAT) | acetylcholinesterase in cleft | nicotinic (ionotropic), muscarinic M1–M5 |
| Glutamate | principal excitatory | from α-ketoglutarate (TCA); glial glutamine cycle | GLT-1/GLAST glial uptake | AMPA, NMDA, kainate, mGluR |
| GABA | principal inhibitory | glutamate decarboxylase from glutamate | GAT-1/3, glial | GABA_A, GABA_B |
| Glycine | spinal and brainstem inhibition | serine pathway | GlyT | glycine receptor (strychnine-sensitive) |
| Amines | dopamine, noradrenaline, adrenaline, serotonin, histamine | amino-acid precursors via hydroxylase/aromatic decarboxylase | high-affinity transporters; MAO and COMT | D1–5, α/β adrenoceptors, 5-HT₁₋₇, H₁₋₄ |
| Purines | ATP, adenosine | vesicular co-release (VNAT) | ectonucleotidases; adenosine reuptake | P2X (ionotropic), P2Y, P1 |
| Peptides | substance P, enkephalin, oxytocin, vasopressin, TRH | large dense-core vesicles from precursor proteins | diffusion, peptidases | GPCRs, often co-released with small-molecule transmitters |
| Gasotransmitters | NO, CO, H₂S | NO synthases (Ca²⁺-calmodulin), heme oxygenase | diffusion, haem binding | soluble guanylate cyclase; retrograde signalling, no vesicles |

::: example Presynaptic modulation, two drugs {#ex-presyn}
Morphine depresses the substantia gelatinosa's pain relay; the α₂-agonist dexmedetomidine and clonidine depress sympathetic outflow and produce sedation with analgesia; and the N-type calcium-channel blocker ziconotide is an analgesic of last resort despite blocking a channel every neuron needs. Explain by the same principle.
::: solution
The principle is **presynaptic inhibition through receptors and channels located on the terminal**, where the localisation supplies the specificity. Opioid μ-receptors (Gi-coupled, presynaptically closing Ca²⁺ channels and postsynaptically opening GIRKs) sit densely on primary afferent terminals and the dendrites of the substantia gelatinosa's pain-projection neurons: glutamate and substance P release fall exactly where nociception is first relayed, and the respiratory and reward circuits' involvement is the dose-limiting side of the same geography. α₂-receptors on noradrenergic and on pain-pathway interneuronal terminals reduce release across the sympathetic efferents and the descending modulatory systems — hence the analgesia with sedation (locus coeruleus) and the bradycardia and dry mouth. **Ziconotide**, from a cone-snail peptide, blocks the N-type Ca²⁺ channel itself — the very channel of the release machinery above — and because it is given **intrathecally** it reaches the dorsal-horn terminals where the therapeutic window lies, while its systemic or overdose effects (the psychiatric and motor toxicity that confines it to pumps and refractory cases) show that the channel's ubiquity is escaped only by the route. Inhibition by localisation, in three pharmacologies: receptor, receptor, and pore — and a lesson in why CNS drugs live and die on their anatomical gradient, not their molecular target alone.
:::
:::
::: example The volume knob: spillover and tonic inhibition {#ex-spillover}
Cerebellar granule cells and hippocampal dentate granule cells maintain a persistent, non-desensitising GABA_A conductance that sets their input resistance and dampens excitability; anaesthetics and ethanol are said to exaggerate something like it.
::: solution
That conductance runs on **spillover**: GABA escaping the synaptic cleft activates **extrasynaptic, high-affinity, δ-subunit-containing GABA_A receptors** that do not desensitise, holding a tonic inward (depolarising in immaturity, shunting in adults) leak that can be several percent of the cell's total conductance — a **volume knob** on excitability distinct from the discrete, phasic keypress of the synaptic current. The physiology explains a pharmacology: the neurosteroids and some anaesthetics (etomidate, propofol, the halogenated agents at clinical concentrations) preferentially enhance these tonic currents, and δ-subunit knock-out mice resist some sedative and amnestic effects; ethanol's actions on the same receptors contribute to its disinhibition and ataxia. Pathology too: the same extracellular GABA pooling is regulated by the astrocytic transporters (GAT-1/3 — targets of the antiepileptic tiagabine), and failure of the transporters, or of the tonus-setting conductance itself, shifts network gain toward seizures and away from them in different circuits — the chapter's reversal-potential and convergence theorems again saying that the brain's excitability is a extracellular chemistry as much as an intracellular one.
:::
:::

::: widget plot
f: 100*x^4/(1+x^4)
x: 0, 3
y: 0, 105
labels: \text{[Ca}^{2+}\text{] near sensor (relative units)},\ \text{vesicle release (\% max)}
caption: The fourth-power cooperativity of vesicle release on submembrane calcium (Hill coefficient ≈4 for synaptotagmin's multi-site sensing): a small change in calcium entry — the magnesium of eclampsia therapy competing at the channel, the Lambert–Eaton antibody removing a third of the channels, the extra millisecond of the post-tetanic depolarisation — moves release across most of its range. This steepness is why presynaptic pharmacology and pathology are so powerful, and why paired-pulse facilitation (residual calcium adding to the next spike's) is a normal, diagnostic and exploitable property of every synapse.
:::

::: quiz
At the adult neuromuscular junction the end-plate potential is large and reliably fires the fibre; in the adult cortex a single excitatory volley changes the soma by ~0.3 mV. The best explanation:
- [ ] Cortical neurons lack voltage-gated channels
- [x] Quantal content and safety factor are high per fibre at the junction and low per input centrally — the trade of reliability for modulatory, integrative computation
- [ ] Acetylcholine receptors conduct more current than AMPA always
- [ ] Central synapses are electrical
::: solution
One motor axon releases ~50–100 quanta onto an exaggerated postsynaptic apparatus — an engineering choice for a one-shot, non-redundant, must-work interface (movement or death). Central circuits use many small, unreliable, modifiable synapses so that **each connection's weight can be adjusted** (plasticity needs stochastic release probabilities between 0 and 1 to be up- or down-regulated) and integration performed across thousands of inputs. The same facts explain the junction's pharmacology (one toxin, one target, catastrophic) and the cortex's (redundancy, spread of block, and the impossibility of point-lesion effects with most CNS drugs).
:::
:::

::: history
Sherrington named the **synapse** (1897) as the "zone of tremulous subjection" before anyone saw one; the chemical dogma survived its debate with the electrical until Otto Loewi's 1921 vagus-nerve perfusion experiment proved humoral transmission (the Nobel of 1936, and the story that the idea came to him in a dream he wrote down and nearly forgot). Fatt and Katz, with Miledi, demonstrated quantal release at the end-plate through the 1950s — the miniature end-plate potential, the binomial statistics, the calcium dependence — while Eccles worked the inhibitory and excitatory postsynaptic potentials of motoneurones to the same conclusion from the central side (Nobel 1963, with Hodgkin and Huxley). Arvid Carlsson's proof that dopamine was a CNS transmitter in its own right (Nobel 2000), Ulf von Euler's noradrenaline, and Katz's and Burgen's successor generations mapped the families; Kandel's *Aplysia* work (Nobel 2000 with Price and Greengard) located memory in activity-dependent synaptic gain change; the NMDA receptor's Mg²⁺ block and calcium permeability (Nowak, Mayer, Ascher in 1983–84) supplied the coincidence detector that Bliss and Lømo's 1973 long-term potentiation had implied; and Südhof, Rothman and Scheller's SNARE machinery (Nobel 2013) completed the release mechanism, twenty years of biochemistry after the physiology had already described its statistics.
:::

## Where this leads

The neuromuscular junction's muscle side in [[physiology/muscle]]; autonomic transmitters in [[physiology/autonomic-nervous-system]]; receptor classes and drug targets in [[pharmacology/drug-receptor]]; myasthenia and Lambert–Eaton in [[nervous-system/neuromuscular]]; botulism in the toxin and clinical chapters take botulism and tetanus in [[infectious-diseases/fever-sepsis]].

::: summary
- Synaptic transmission is a calcium-driven, SNARE-executed, four-fold-cooperative exocytosis followed by receptor activation and rapid termination — every step a drug target or a toxin target.
- Transmission is quantal and probabilistic; the neuromuscular junction buys reliability with a huge safety factor, and the cortex buys plasticity with low release probability and massive convergence.
- Inhibition is defined by reversal potentials and shunts, not by molecules; the neonatal chloride switch makes GABA excitatory, and inhibition placed at the initial segment governs output.
- NMDA receptors read coincidence — the Hebb synapse, the Mg²⁺ block, calcium as the instructive signal for LTP and LTD, and excitotoxicity as its pathological over-conduction.
- Transmitters fall into families with synthesis, vesicular loading, termination and receptor signatures that map almost one-to-one onto clinical pharmacology.
- Presynaptic modulation (autoreceptors, axo-axonic presynaptic inhibition, opioids, α₂-agonists, cone-snail peptides) tunes gain where it is anatomically concentrated, which is why CNS drug effects follow receptor gradients rather than molecular universality.
:::

## Exercises

::: exercise Quantal arithmetic {level=1}
At the neuromuscular junction the quantal potential is 0.5 mV and the end-plate potential 30 mV. What is the quantal content, and what happens to it when extracellular calcium is halved (assume the fourth-power rule)?
::: solution
Content = 30/0.5 = **60 quanta**. Halving calcium leaves release proportional to $(1/2)^4 = 1/16$, so ~4 quanta — end-plate potential ~2 mV: far below threshold, and the junction fails (the classic experiment, the reason the preparation survives a 50% receptor block but not a 50% calcium reduction, and the reason hypocalcaemia and Mg²⁺ excess and Lambert–Eaton all present with transmission failure at the same statistical step).
:::
:::

::: exercise Termination as a drug target {level=1}
Neostigmine, sarin, atropine and pralidoxime all act on acetylcholine handling. Assign each a step and predict the muscarinic versus nicotinic dominance of its effects.
::: solution
**Neostigmine** (reversible carbamate acetylcholinesterase inhibitor, quaternary so it stays peripheral) — prolongs endogenous ACh everywhere: muscarinic (bradycardia, secretions, gut, miosis) and nicotinic (strengthens myasthenic muscle; excess causes depolarising block and fasciculations); **sarin** (irreversible organophosphate — phosphorylates the esteratic site, then "ages") — the same but total and lasting: the SLUDGE/BUNBE muscarinic crisis plus nicotinic paralysis (the lethal respiratory mix of central apnoea, airway closure and diaphragmatic failure); **atropine** (muscarinic antagonist only) — dries secretions and fixes bradycardia but does nothing at the nicotinic junction (which is why the organophosphate patient still needs an oxime); **pralidoxime** (regenerates the enzyme if given before ageing) — attacks the cause. The division is anatomy at a molecular scale: muscarinic for the parasympathetic effector picture, nicotinic for the ganglionic and junctional one, and the CNS for the lipid-soluble agents (scopolamine crosses, atropine partly, glycopyrrolate not at all).
:::
:::

::: exercise The seizing newborn {level=2}
Explain why diazepam and phenytoin — mainstays of adult seizures — are poor neonatal anticonvulsants, in terms of this chapter's chloride physiology and receptor subunits.
::: solution
Neonatal neurons run **NKCC1-high, KCC2-low**, accumulating intracellular chloride, so E_Cl is positive to rest and GABA_A opening **depolarises**; the benzodiazepine strategy (amplifying an inhibition that should hyperpolarise) is therefore weak or paradoxical at the chloride level, and the subunit composition of neonatal GABA_A receptors (α2/α3-rich, different benzodiazepine sensitivity and faster desensitisation, plus lower α1) reduces the drugs' potency profile. Phenytoin's sodium-channel block is additionally disadvantaged by the immature expression of channel subunits and, in the clinical literature, by erratic pharmacokinetics. Practice accordingly: phenobarbital remains the neonatal first line partly because it acts on the immature receptor's long channel openings and at non-synaptic receptors, with the chloride and subunit biology of the developing brain dictating the drug list — an example of developmental physiology writing a formulary.
:::
:::

::: exercise Excitotoxicity {level=2}
In ischaemic stroke, glutamate kills the penumbra. Trace the mechanism from the synapse to the pore, and name the receptor and ion that make the death cascade selective.
::: solution
Ischaemia halts the pump; the reversal of GLT-1's glial uptake (and of neuronal release, and of vesicular leak) raises extracellular glutamate while depolarisation removes the **NMDA receptor's Mg²⁺ block** — the coincidence detector, designed to open only when pre- and postsynaptic activity agree, opens everywhere, all the time. The NMDA channel's **calcium** influx (its Ca²⁺ permeability is the selectivity) triggers mitochondrial permeability-transition, nitric-oxide synthase, lipases and proteases and the generation of reactive oxygen species; the surrounding synapses' AMPA component drives the depolarisation that keeps the NMDA gate unlocked — the spreading depolarisation of the penumbra. The therapeutic corollaries are all in this chain: NMDA antagonists failed clinically (the channel is everyone's, and the side-effect window vanished), while the successful interventions — reperfusion, thrombolysis, thrombectomy — restore flow before the calcium cascade commits: the chapter's point that a physiological device (coincidence detection) is a pathological device (excitotoxic death) at the wrong place and time.
:::
:::

::: exercise Autoreceptors {level=2}
Define the autoreceptor's role in gain control and use it for: (a) why low-dose amphetamine's initial effect can be mild while releasing stores massively at higher doses; (b) why SSRIs do not potentiate 5-HT at the synapse immediately — and what the delayed receptor change that accompanies the therapeutic lag is.
::: solution
An **autoreceptor** (D2/D3 presynaptic and terminal dopamine; 5-HT₁A on the soma and dendrites, 5-HT₁B on terminals) reports extracellular transmitter and **negatively feeds back** on firing and release — the synapse's own gain dial. (a) Amphetamine reverses the transporter and displaces vesicular stores (VMAT inhibition); at low release rates the autoreceptor loop clamps extracellular dopamine hard, and only when release overwhelms the feedback does the flood become visible — the pharmacology of threshold. (b) SSRIs raise extracellular 5-HT within hours, but that increase **activates the inhibitory somatodendritic 5-HT₁A autoreceptors**, reducing raphe firing and partly cancelling the synaptic gain; with chronic treatment the autoreceptors desensitise (the down-regulation taking 1–3 weeks) while terminal 5-HT₁B and the postsynaptic 5-HT₁A adapt differently — the accepted cellular account of the antidepressant lag, with the therapeutic consequence that the early weeks carry side effects (nausea, jitteriness, the initial anxiety from the same over-release at postsynaptic 5-HT₂A and peripheral receptors) before the benefit.
:::
:::

::: exercise Tetanus versus botulism {level=2}
Both are clostridial neurotoxins that cleave SNAREs; botulism paralyses flaccid and tetanus spasms rigidly. Resolve the paradox from the synapse outward.
::: solution
Both are zinc proteases of the release machinery, but their **cell access differs**: botulinum toxin cannot cross the blood–nerve barrier at central synapses and acts at the **cholinergic motor end-plate and autonomic terminals**, where it blocks ACh release — flaccid paralysis, dry pupils, the anticholinergic gut. Tetanospasmin is taken up at the motor end-plate, **transported trans-synaptically into the inhibitory interneurons of the spinal cord** (RAB3-associated entry, the very machinery it then cleaves — synaptobrevin-2), and blocks glycine and GABA release from Renshaw and Ia-inhibitory interneurons: the motor neurons run **uninhibited**, producing the co-contraction rigidity, the trismus and risus, the opisthotonus and the autonomic storms. Two details that prove the mechanism's site: tetanus preserves neuromuscular transmission itself (the end-plate responds normally to nerve stimulation — the spasm is central), and the incubation period tracks transport distance (the closer the wound to the CNS, the faster the disease). Treatment asymmetry follows too: wound debridement, metronidazole, human immunoglobulin to unbound toxin, benzodiazepines for the spinal disinhibition, the autonomic care — and the vaccine's absolute efficacy against a disease whose toxin is the most potent bacterial protein known, which is the whole argument in one sentence.
:::
:::

::: exercise Read the paired pulses {level=3}
Nerve-conduction studies report a paired-pulse ratio (PPR) — the second response divided by the first at 20–50 ms intervals. Predict PPR changes for: (a) a presynaptic Ca²⁺-channel antibody; (b) a postsynaptic receptor blockade; (c) a succinylcholine-like depolarising agent; and justify each from the calcium and safety-factor physiology.
::: solution
The logic: at 20–50 ms the second stimulus benefits from **residual presynaptic calcium** (facilitation) while the terminal's calcium channels are partly inactivated; low initial release probability means big facilitation (high PPR), high initial probability means depression dominates (low PPR). (a) **Presynaptic calcium-channel lesion (Lambert–Eaton): high resting PPR with marked post-exercise or post-tetanic recovery** — low release probability, large facilitation — the electrodiagnostic hallmark alongside the low resting CMAP. (b) **Postsynaptic receptor block (myasthenia): resting PPR near normal** (release is normal; the end-plate potential fails the threshold test more often when the safety factor is spent by runs of activity — hence the decrement at slow repetitive stimulation rather than a paired-pulse signature; a purely postsynaptic lesion should not, and essentially does not, change the paired-pulse ratio). (c) **Depolarising block (suxamethonium): the fibre is held depolarised and its sodium channels inactivated, so both responses fall equally — an initial **fade-free depression**; with prolonged exposure ('phase II' desensitising block) the train-of-four develops a fade that mimics a non-depolarising block**, while the tetanic post-exercise facilitation that a true pre-synaptic lesion shows stays absent — the pattern that separates membrane-depolarisation failure from release failure or receptor loss. The clinical utility of the test is that the PPR is a *presynaptic* probe, and any disease with a *postsynaptic* mechanism leaves it alone — the chapter's release arithmetic, converted into an electrodiagnostic instrument.
:::
:::

::: exercise Design a synapse {level=3}
You are designing an experiment to prove that a newly identified interneuron forms electrical rather than chemical synapses onto pyramidal cells. Give four decisive observations and the manipulation for each.
::: solution
(1) **Latency**: electrically coupled pairs show near-zero, latency-jitter-free transmission (sub-millisecond, constant with temperature in the physiological range); replace long, variable chemical delays by measuring the latency distribution — electrical coupling has almost none. (2) **Bipolarity**: a spike in cell A fires cell B, and a spike in B fires A at the same latency — reciprocal transmission; chemical synapses are one-way (test by controlling which cell is current-clamped). (3) **Calcium independence and temperature**: chemical release requires external Ca²⁺ and is strongly temperature-dependent; electrical transmission persists in 0-Ca²⁺/EGTA saline and is only mildly temperature-dependent — and, decisively, it is abolished by **gap-junction blockers** (carbenoxolone, mefloquine, or the connexin36 knock-out) without change in the cells' own excitability. (4) **Paired recording with loaded tracer**: biocytin or neurobiotin injected into one cell appears in the coupled partner (dye coupling — the metabolic coupling the same channel conducts), and dual voltage-clamp records a junctional conductance $g_j = I/(V_1 - V_2)$ that is linear and unaffected by transmitter-receptor cocktails (CNQX/AP5/bicuculline/ATP-blocker media). Four manipulations, four published-paper figures, one conclusion: if the connection is bidirectional, instant, calcium-independent, blocker- and knock-out-sensitive and dye-permeant, the synapse is electrical — the same logic that first proved mixed transmission at the crayfish flexor and the Mauth cell.
:::
:::
