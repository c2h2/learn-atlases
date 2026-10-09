Every thought, heartbeat and twitch begins as electricity made by chemistry. Cells spend ATP to build ion gradients — sodium kept out, potassium kept in, calcium banished from the cytosol — and then spend those gradients, gated by voltage, ligands or stretch, to move charge across membranes at speeds and with a precision that no engineered cable approaches. This chapter is the physics of that currency: equilibrium potentials, the resting membrane, the action potential and its refractory machinery, and the conduction of the signal along fibre — with the clinical catalogue (potassium's paralysis, the local anaesthetic's block, the demyelinated nerve's failures) as its worked examples.

## Gradients and equilibrium potentials

::: definition Electrochemical equilibrium and the Nernst potential {#def-nernst}
An ion straddling a membrane diffuses down its concentration gradient and, because it carries charge, accumulates on one face until the electrical gradient it creates exactly balances diffusion: **no net flux at the equilibrium potential** $E_\text{ion} = \dfrac{RT}{zF}\ln\dfrac{[\text{ion}]_\text{out}}{[\text{ion}]_\text{in}}$, or at 37 °C $E_\text{ion} \approx \dfrac{61.5}{z}\log_{10}\dfrac{[\text{out}]}{[\text{in}]}$ mV. For the major players (typical mammalian values: Na 145 out/12 in; K 4 out/155 in; Cl 110 out/10 in; Ca 2 mM out/100 nM in): $E_\text{K} \approx -90$ mV, $E_\text{Na} \approx +60$ mV, $E_\text{Cl} \approx -70$ mV, $E_\text{Ca} \approx +120$ mV. The resting membrane potential is a **compromise** among these, weighted by permeabilities — the Goldman–Hodgkin–Katz equation — and because the resting cell is dominated by **potassium leak channels** (the two-pore K2P/TREK and TASK channels that set the resting $P_\text{K}$), $V_m$ sits near $E_\text{K}$ at about **−70 mV**, with small sodium leak pulling it a little positive.
:::

::: definition The sodium pump: electrogenic and invisible {#def-pump}
The **Na⁺/K⁺-ATPase** exports 3 Na⁺ for 2 K⁺ imported, hydrolysing one ATP: it is **electrogenic** (net outward current, hyperpolarising a few millivolts directly) but its dominant contribution to the resting potential is **indirect** — maintaining the gradients that the leak channels spend. Inhibition (ischaemia, digitalis) therefore depolarises cells slowly and globally, and the pump's insulin- and catecholamine-driven stimulation moves potassium into cells and is the basis of the emergency treatments of hyperkalaemia (salbutamol, insulin-dextrose) — pharmacology reading the same pump.
:::

::: example Why potassium sets the tone {#ex-krest}
Inject potassium into a patient's vein until plasma K⁺ rises from 4 to 7 mmol/L. Use the Goldman logic to predict the direction of change in resting potential, then explain why skeletal muscle first twitch-stimulates and then paralyses.
::: solution
Raising extracellular K⁺ **increases $P_\text{K}$-weighted drive towards a less negative $E_\text{K}$** — from the Nernst equation, $E_\text{K}$ moves from −90 mV toward −60 mV — and because the resting membrane is mostly a potassium conduit, $V_m$ **depolarises**. Mild depolarisation brings the membrane closer to threshold (twitches, peaked T waves and the electrically excitable nerve's early hyperexcitability); sustained depolarisation to about −55 mV or less negative **inactivates the sodium channels' fast gate** — the channels recover from inactivation only when the membrane repolarises, and in a chronically depolarised fibre most channels sit inactivated: fewer are available to open, the action potential fails, and the patient presents with **flaccid paralysis**, respiratory arrest the terminal step. This is depolarising (peri-)block, the same mechanism as the continuous depolarisation of the neuromuscular junction by suxamethonium after its initial fasciculations — and the clinical rule that hyperkalaemia is a disease of **membranes**, its danger cardiac (see [[cardiovascular/arrhythmias]]) while its muscle weakness arrives with the ECG, not after.
:::
:::

::: example The dialysis patient's missed session {#ex-hyperk}
A haemodialysis patient skips two sessions and attends with nausea and proximal weakness; K⁺ 7.9 mmol/L; the ECG shows lost P waves, a QRS of 150 ms and tall, narrow T waves.
::: solution
Treat the membrane first and the number second. **Calcium gluconate 10% IV** over two to three minutes (or calcium chloride through a central line) restores the surface-charge screening of the sodium channel's voltage sensors, reversing the depolarisation-induced inactivation and stabilising conduction within minutes — for the duration of an hour, which is the runway the potassium-lowering measures need. Then **insulin 10 units with 50 g dextrose** (and nebulised salbutamol 10–20 mg as the second pump-driver) pushes potassium into cells via the Na⁺/K⁺-ATPase over 20–60 minutes; **sodium zirconium or a potassium binder** begins the slow removal; and **dialysis is the definitive clearance** — the only measure that removes potassium at the rate the skipped sessions accumulated. The ECG tells where the patient is on the [[#def-nernst]] curve: the absent P wave is atrial inactivation block, the wide QRS is ventricular slow conduction, and the sine-wave that follows is the same trajectory ending in asystole or fibrillation. The whole episode is one paragraph of this chapter: gradients set potentials, potentials set channel states, and the emergency treatment order — stabilise the membrane, shift the potassium, remove the potassium — is the biophysics in sequence.
:::
:::

## The action potential

::: definition The action potential and its refractory periods {#def-AP}
At threshold, voltage-gated Na⁺ channels open (activation gates) — inward current depolarises further, more channels open: the **positive-feedback upstroke** to about +30 mV, terminating because the same voltage **inactivates** the channel (the intracellular inactivation particle plugs the pore at +40 mV with a delay) and because delayed-rectifier K⁺ channels open, repolarising toward $E_\text{K}$ (the after-hyperpolarisation). **All-or-none**: any suprathreshold stimulus gives the same spike (its height set by $E_\text{Na}$ and conductances, not by stimulus size); **intensity is coded by frequency and by recruitment**. The **absolute refractory period** (channels inactivated until the membrane repolarises; sets the maximum firing rate) and the **relative refractory period** (some channels recovered, K⁺ conductance still high; a stronger stimulus fires) are consequences of the channel's state machine — and of the Na⁺ channel's three states (resting, open, inactivated) read as a diagram. The **strength–duration curve** (rheobase and chronaxie) describes the excitability of the whole fibre, and the **safety factor** of conduction — the excess current generated at each node over the minimum needed — is what demyelination spends.
:::

::: theorem Conduction: diameter, myelin, and the physics of the cable {#thm-conduction}
An axon is a cable of internal resistance $r_i$ and membrane resistance and capacitance; the **length constant** $\lambda = \sqrt{r_m/r_i}$ sets how far a passive spread of current travels, and the **time constant** $\tau = r_m c_m$ how fast the membrane charges. Bigger diameter lowers $r_i$, so unmyelinated C fibres conduct at ~1 m/s while large A fibres reach ~10–20 m/s. **Myelin** raises $r_m$ (fewer channels leaking current out) and lowers effective $c_m$, and by clustering channels at the **nodes of Ranvier** turns the axon into a relay: each node regenerates the spike, giving **saltatory conduction** at up to ~120 m/s in the largest human fibres — and a duty of only three structures, the node, the internode, and the sodium channels' safety factor.
:::

::: proof
The clinical catalogue of conduction is the theorem's contrapositive. **Demyelination** (multiple sclerosis, Guillain–Barré) drops $r_m$, shortens $\lambda$ below the internodal distance, and the safety factor is lost: conduction **fails** at body temperature raised one degree (**Uhthoff's phenomenon** — the MS patient's symptoms worsening in the bath, because temperature speeds channel kinetics and shortens the Na⁺ channel's open time, shaving the safety factor further), or becomes slow and dispersed (the nerve-conduction study's prolonged distal latencies, conduction block and temporal dispersion — the electrodiagnosis chapter's core vocabulary in [[nervous-system/neuromuscular]]). **Remyelination** by Schwann cells restores the sheath's length but not the node's original architecture (interneurons are shorter, channels more uniform), so recovery is real and incomplete. **Local anaesthetics** block the open-state sodium channel from inside, and their action is use-dependent (faster firing → more blocked channels — why the most active fibres, small pain fibres included, are damped first among like-for-like) and state-dependent; the nerve's internal pH matters because the **charged form crosses the myelin, the uncharged base crosses the membrane, and the cation binds the receptor** — hence inflamed, acid tissue is poorly blocked (pKa and pH physics, the dentist's nuisance) and the addition of bicarbonate to lidocaine speeds onset. **Hyperkalaemia** depolarises as above; **hypocalcaemia** shifts the voltage-dependence of the sodium channel's gates (less screen of surface negative charge → channels activate at more negative potentials, and the neuron is hyperexcitable: tetany, Chvostek and Trousseau) — the divalent cations' "membrane stabilising" effect written into the channel's biophysics, which is why calcium gluconate is the first IV drug in severe hyperkalaemia: it restores the surface-charge screen and buys the heart the hour the other treatments need.
:::

::: example The nerve that fires in the bath {#ex-uhthoff}
A 31-year-old with recently diagnosed multiple sclerosis reports that her legs go weak whenever she takes a hot shower, recovering within twenty minutes.
::: solution
Her weakness is conduction block in partly demyelinated corticospinal fibres at the margin of safety, made complete by temperature. The mechanisms compound: warming speeds Na⁺ channel gating kinetics, shortening the open time and the current per node, while it also increases membrane leak — the current arriving at the next node falls below threshold, and the impulse dies. Cooling restores the safety factor, which is why the symptom reverses in twenty minutes (no new lesion; pure biophysics), why the differential of "transient neurological worsening with heat, infection or exertion" is the **pseudo-relapse** rule in MS clinics, and why the management is behavioural (cooling garments, shower temperature, exercise timing) and not steroid pulses — although the first true relapse still deserves its work-up. The teaching point generalises: the nervous system's temperature sensitivity is normally invisible because safety factors are generous, and disease spends them; a deficit that appears and disappears with temperature is a **localisation** in time, marking fibres that are sick but structurally surviving — a therapeutic window, and a prognostic mercy, that the mechanism itself reveals.
:::
:::
::: example The cramping, tingling thyroid patient {#ex-tetany}
Twelve hours after a total thyroidectomy a patient has perioral tingling, cramping hands and aching muscles; Chvostek's sign is positive and the corrected calcium is 1.9 mmol/L with a QT prolongation.
::: solution
This is **hypocalcaemia from surgical parathyroid injury or devascularisation** — the mechanism at the channel: less extracellular calcium (and magnesium, its frequent companion) reduces the screening of fixed negative surface charge on the membrane, so the electric field the sodium channel's voltage sensors sense is effectively larger and channels open at potentials further from zero; the nerve fires spontaneously (paraesthesiae, the cramps, Chvostek's twitching, Trousseau's carpopopedal spasm) and the muscle is hyperexcitable in the opposite direction from the hyperkalaemic block. Treat with **slow IV calcium gluconate** for symptoms and the ECG, then oral calcium and **alphacalcidol or calcitriol** (the parathyroid-hormone-dependent 1α-hydroxylation is gone with the glands — this is the difference from nutritional deficiency, and the reason the replacement is the activated vitamin D, not cholecalciferol); check magnesium (hypomagnesaemia causes refractory hypocalcaemia by suppressing what little PTH remains and by blocking its action at bone) and phosphate; and record the calcium on the way out, because the permanent-hypoparathyroidism patient's long-term management — and the over-replacement's hypercalciuria — belongs to [[endocrine/bone-calcium]].
:::
:::

::: widget plot
f: 61.5*log10(x/4)
x: 1, 10
y: -80, 25
labels: \text{plasma [K⁺] (mmol/L)},\ E_\text{K}\ \text{(mV)}
caption: The potassium equilibrium potential against plasma potassium — the logarithmic curve every clinician should be able to sketch: at K⁺ 1 mmol/L E_K is near −100 mV (hypokalaemia hyperpolarises and the muscle is weak and the reflexes sluggish), at 4 the resting −70/−90 band, and at 8–10 the depolarised inactivation-block range where strength fails and the heart's own potentials deform (see [[renal/potassium-calcium-phosphate]] for the ECG sequence). The slope — roughly 60 mV per tenfold, ~5 mV per 0.7 mmol/L near normal — is why small changes matter and why potassium is the electrolyte whose emergencies are electrical.
:::

::: quiz
A nerve is bathed in solution with the external sodium concentration halved. What changes in its action potential?
- [ ] Threshold is halved
- [x] The peak overshoot falls (E_Na drops ~18 mV), the upstroke slows, and conduction safety falls; threshold barely moves
- [ ] Duration lengthens because K⁺ channels are blocked
- [ ] Nothing; threshold all-or-none is independent of [Na⁺]
::: solution
The overshoot approaches $E_\text{Na}$, and $E_\text{Na} = 61.5\log_{10}([\text{Na}]_o/[\text{Na}]_i)$ falls by $61.5\log_{10}0.5 \approx -18$ mV when external sodium halves; the driving force and the peak therefore both drop, and the upstroke's slope (the Na⁺ current) falls with them — conduction slows and its safety factor shrinks, enough in an extreme to block. Threshold is set by the channel's voltage-sensors and their surface-charge environment, not by the gradient, so it barely moves; and duration is governed by the K⁺ conductance's time course. The same arithmetic underlies tetrodotoxin's and saxitoxin's complete block (the channel pore plugged — puffer fish and paralytic shellfish poisoning as pure sodium-channel pharmacology) and the local anaesthetic's partial, state-dependent version of the same trick.
:::
:::

## Excitability in the body's chemistry

The body's internal environment tunes the channel proteins, and the list of tunes is the emergency list. **Potassium** acts through $E_\text{K}$ as above; **calcium** through surface charge (hypocalcaemia hyperexcitable, hypercalcaemia depressed, with the same logic on the heart's plateau); **pH** through channel protonation (acidosis depresses CNS and neuromuscular transmission — the obtunded acidotic patient — and alkalosis renders the nerve hyperexcitable with tetany and paraesthesiae, made worse because alkalosis increases protein binding of calcium and drops ionised calcium); **oxygen and glucose** through the pump (ischaemic depolarisation: the spreading depolarisation of stroke's penumbra is the pump losing, and glutamate release from reversed transport the chemical end of the same event); **temperature and anaesthetics** through kinetics and channel targets (inhales act on GABA_A, glycine and two-pore channels; hypothermia slows conduction and the ECG's intervals — the Osborn wave in the cold). The clinical lesson of the whole section is the same: the "excitable tissues" are one engineering stack, and a metabolic disturbance hits nerve, muscle and myocardium with the same physics — which is why potassium of 7.5 is an ECG, a weakness chart and a calcium gluconate order simultaneously.

::: history
The programme began with Galvani's frog legs (1780) and Volta's rebuttal, matured into Bernstein's membrane theory (1902) with the potassium-selective resting membrane; the squid giant axon — archipelago-accessible, a millimetre wide and therefore impaling with microelectrodes — gave Hodgkin and Huxley their equations (1939–1952; the 1963 Nobel Prize) and the voltage-clamp its vocabulary; the permeability-selectivity and single-channel physics followed (Hille's ion-channel book the synthesis), and patch-clamp (Neher and Sakmann, 1976; Nobel 1991) finally counted the channels one pore at a time. The sodium-channel blocker tetrodotoxin, purified from puffer fish by Japanese chemists in the 1960s, and the local anaesthetic line opened with Willstätter's and then Einhorn's cocaine-substitutes (procaine, 1905) gave the tools whose clinical children — the nerve block, the antiarrhythmic classes, the antiepileptics' sodium-channel kinetics — fill several later chapters.
:::

## Where this leads

The synapse uses this potential at [[physiology/synapses]]; muscle's excitation–contraction coupling at [[physiology/muscle]]; the cardiac action potential and ECG at [[cardiovascular/electrophysiology-ecg]]; potassium disorders at [[renal/potassium-calcium-phosphate]]; the nerve-conduction study in practice at [[nervous-system/neuromuscular]]; local anaesthetic pharmacology at [[surgery/anaesthesia-pain]] and [[pharmacology/drug-receptor]].

::: summary
- The resting potential is a Goldman-weighted compromise near E_K, set by potassium leak; the pump keeps the gradients but writes only a few millivolts directly.
- The action potential is a positive-feedback sodium upstroke terminated by sodium-channel inactivation and delayed potassium current; all-or-none, coded by frequency, bounded by refractory periods that are channel states in time.
- Conduction obeys cable physics: diameter sets the passive spread, myelin raises resistance and cuts capacitance, and nodes are relays — disease that spends the safety factor produces temperature-sensitive, fatigable, block-prone failure.
- Hyperkalaemia depolarises into inactivation block: early excitability, then paralysis and cardiac electrical death; calcium buys time by surface-charge screening; insulin, salbutamol and dialysis remove potassium by pump and by clearance.
- Local anaesthetics are use- and state-dependent sodium-channel blockers acting in their cationic form from inside; acid tissue and myelin anatomy dictate their limits.
- The body's chemistry — K, Ca, H, O₂, temperature — tunes one channel stack; a metabolic emergency is an electrical emergency in three tissues at once.
:::

## Exercises

::: exercise Nernst by hand {level=1}
Compute E_K at 37 °C for [K]ᵢ 155, [K]ₒ 4 mmol/L; and state what happens to E_K when extracellular K doubles.
::: solution
$E_\text{K} = 61.5\log_{10}(4/155) = 61.5 \times (-1.588) \approx -98$ mV (textbook values differ with the assumed activities, roughly −90 to −98 mV). Doubling external K to 8: $61.5\log_{10}(8/155) \approx -79$ mV — a **depolarisation of ~19 mV**, because the log rule gives ~60 mV per tenfold and the region near normal is steep: this is the whole danger of a doubling in one sentence, and the reason ECG monitoring is part of "treat the potassium".
:::
:::

::: exercise Pump and potassium {level=1}
Explain why insulin deficiency and β-blockers each raise potassium, and why the effect of the latter is modest but clinically worth noting.
::: solution
Both act on the **Na⁺/K⁺-ATPase's regulation**: insulin stimulates pump activity in muscle and liver (post-prandial potassium disposal into cells is largely an insulin effect; its deficiency or resistance shifts potassium extracellularly — the ketoacidosis patient's total-body depletion with a normal-or-high serum potassium being the pump plus the osmotic diuresis combined), and β₂-agonism drives the pump while **β-blockade (particularly non-selective) removes the catecholamine-driven disposal**, bluntly visible after exercise-induced potassium loads and in the dialysis population. The clinical sentences: treat diabetic ketoacidosis knowing the potassium is a redistribution lie (replace it once urine flows and the level falls with insulin); expect a small potassium rise on propranolol in patients whose renal disposal is already gone; and use the same lever therapeutically with salbutamol nebulised or intravenous.
:::
:::

::: exercise Myelin versus axon {level=2}
In a demyelinating neuropathy, why are large-fibre modalities (touch, vibration, proprioception, weakness) hit early while pain and temperature are relatively spared, and why does recovery plateau?
::: solution
Myelination and diameter concentrate in the large A fibres (Aα, Aβ — the Ia and II sensory afferents and the motor axons), whose long internodes make them the most dependent on saltatory safety; small lightly-myelinated Aδ and unmyelinated C fibres (pain, temperature, autonomic) have short or no internodes and rely on continuous conduction, so the same immune attack on myelin spares them until late. Recovery plateaus because Schwann-cell remyelination is imperfect (short internodes, dispersed channels) and because **axonal loss — the secondary degeneration that follows any demyelination severe enough — does not regenerate** in the peripheral nervous system except slowly and distally, and not at all centrally; the electrodiagnostic signature of that second event is the falling amplitudes (CMAP, SNAP) as well as the slowing latencies, and the patient's residual deficit usually tracks the axon loss, not the conduction block that brought them to clinic.
:::
:::

::: exercise The dentist's problem {level=2}
Inferior alveolar block for a carious, inflamed lower molar fails to anaesthetise; injection near the nerve with a different agent works. Explain by the biophysics of the drugs, and give two pharmacological workarounds.
::: solution
Inflamed tissue is **acid** (pH ~5–6 against the drug's pKa ~7.7–7.9 for lidocaine): far less of the drug is in the uncharged base form that crosses the myelin and axolemma, and far more is ionised in the extracellular fluid where it cannot enter — the effective intraxonal concentration needed to block open-state sodium channels from inside never arrives (and inflammation raises the extracellular potassium that partially depolarises and inactivates some channels, while prostaglandins up-regulate the sodium-channel subtypes that persist in the acid). Workarounds from the same physics: a **nerve block proximal to the inflamed field** (the inferior alveolar at the mandibular foramen) where tissue pH is normal; and a drug with higher lipid at physiological pH (mepivacaine, articaine with its ester linkage and diffusion advantage) or the buffered formulation (lidocaine-bicarbonate mixes raise pH, more base, faster onset), together with the mechanical fact of the mandible's cortical plate that limits the field-block option and makes the nerve block mandatory.
:::
:::

::: exercise Strength–duration {level=2}
Define rheobase and chronaxie, and use the concepts to explain (a) why a nerve stimulator for a motor block uses long, low-charge pulses rather than short high-amplitude ones, and (b) why the clinical "nerve irritability" of hypocalcaemia appears before any change in stimulus threshold measurement.
::: solution
**Rheobase** is the minimum current amplitude for a stimulus of infinite duration; **chronaxie** the duration needed at twice rheobase — together the strength–duration hyperbola's two landmarks, and both are indices of membrane $\tau$ and channel availability. (a) Long pulses near rheobase deliver the required membrane charge with low peak current, which favours the large, low-rheobase motor axons and reduces the noxious peak-current activation of small nociceptive fibres and skin — the comfort and selectivity of the "long-pulse" stimulation used for nerve localisation and for some block techniques. (b) Hypocalcaemia does not lower the threshold measurement in the naive sense; by reducing the surface-charge screening it shifts the channel's voltage-sensor activation towards more negative potentials, and the channels' spontaneous openings (which the nerve-fibre safety factors normally tolerate) generate ectopic impulses — paraesthesiae, then tetany, at a time when formal threshold testing against controlled stimuli can be near-normal; the excitability is in the **noise**, not in the threshold, which is why Trousseau's provocative manoeuvre — a cuff inflating below the systolic pressure, which lets spontaneous firing accumulate in the ischaemic, alkalosis-prone nerve — outperforms any single-threshold measurement.
:::
:::

::: exercise Read the block {level=2}
A tourniquet occludes an arm: order the loss of function (touch, pain, cold, motor) and explain by fibre type why pressure ischaemia of a nerve anaesthetises in that order.
::: solution
The clinical order (Bennett's and the classic obstetric-anaesthesia teaching): **loss of cold and touch first, then pain and temperature, then motor (large-fibre first)**. Large myelinated fibres are the most pressure-sensitive because their saltatory conduction depends on the internodal geometry that compression deforms — a few millimetres of node distortion drops the safety factor to zero — while small unmyelinated C fibres conduct continuously with generous margins and resist both compression and the local anaesthetics longer (hence differential spinal and regional blocks: the clinical ladder is the reason a Bier block with prilocaine still spares some fibres at doses that abolish surgical anaesthesia, and the reason tourniquet pain — the C-fibre recruitment — arrives when everything else is blocked and is the signal to let the limb down or infiltrate). The same logic in reverse runs the recovery: order of return follows the order of loss.
:::
:::

::: exercise Design a nerve {level=3}
Why did evolution give the squid a giant axon and vertebrates myelin, given that both solve the same conduction problem? Design the trade-offs (space, energy, speed, reliability) as an engineering essay, and name the vertebrate compromise that breaks first in multiple sclerosis.
::: solution
Speed needs low internal resistance (diameter) or high membrane resistance with short charges (myelin). The squid's answer — a millimetre-wide axon — buys escape-reflex latency at the cost of volume and, because every node-equivalent membrane charges per unit length, no metabolic saving at all. The vertebrate answer — myelin — buys the same speed inside cubic millimetres (a 100-metre relay of 1-mm segments) and saves energy: saltatory conduction moves ions only at the nodes, so the pump's ATP bill falls to a fraction of a continuous-conduction fibre of equal diameter. The costs: myelin is metabolically expensive to build (oligodendrocyte support of many fibres — a single cell's death disables many axons, which is the vulnerability the demyelinating diseases exploit), it slows conduction at every node-to-node hop's timing margins, and it multiplies the failure modes (autoimmune targets — MBP, MOG, the nodes' contactin/NF155 complexes; metabolic white matter disease; the developmental myelination schedule mapping onto cognitive milestones). The compromise that breaks first in multiple sclerosis is the **node of Ranvier's safety factor**: an autoimmune lesion that strips myelin over even one or two internodes drops membrane resistance and leaves the node's output current below what the next node needs — conduction block, temperature-sensitive, metabolically costly but potentially reversible, which is the same sentence in the patient's voice as Uhthoff's example above.
:::
:::

::: exercise The depolarisation paradox {level=3}
Hyperkalaemia and the sodium-channel activator toxin from the red bay bark (*Pyrodinium* — brevetoxin, neurotoxic shellfish poisoning) both cause weakness and paresthesiae; one is treated with calcium and potassium-lowering, the other is supported while the toxin decays. Explain both at the level of the channel's three states, and give the feature of the ECG that separates the two patients at presentation.
::: solution
The three states (resting, open, inactivated) answer both. **Hyperkalaemia** depolarises the resting membrane so more channels sit **inactivated** at rest: fewer available, slower upstroke, conduction failure — and the same inactivation in the myocardium with the ECG's sequence (peaked T, flattened P and PR prolongation, QRS widening, the sine wave). **Brevetoxin** does the opposite: it binds the open-state channel and **holds it open**, blocking inactivation — persistent inward sodium current, the membrane depolarised into a state where channels inactivate *secondarily* and, more importantly, the repetitive firing of sensory nerves produces the paraesthesiae and perioral burning, then the motor fibres' depolarising failure gives weakness. Both end in a fibre whose sodium channels cannot fire on demand; the difference is the path — inactivation from the resting side versus inactivation from the open side. The ECG separates them at the bedside: hyperkalaemia gives the peaked T and wide QRS with a bradycardic tendency, while brevetoxin's patient has a **normal potassium and a normal-or-tachycardic ECG**, with the clinical syndrome (shellfish exposure, perioral paraesthesiae, gastroenteritis, the temperature-reversal illusion that is ciguatera's signature cousin) doing the localising. Calcium, insulin and salbutamol rescue the first by restoring gradient-driven states; the second simply needs time, supportive care, and the ECG for reassurance.
:::
:::
