Push a fine glass pipette, filled with salt solution and drawn to a tip less than a micrometre across, through the membrane of almost any neuron, and a voltmeter connected between the pipette and a wire in the bath jumps from zero to about −70 mV. The inside of the cell is negative with respect to the outside, and it stays so for as long as the cell is alive and the pipette is in place. This **resting membrane potential** is the baseline on which every neural signal is written. Action potentials are brief excursions from it, synaptic potentials are small nudges to it, and sensory receptors transduce stimuli by changing it.

This chapter explains where the resting potential comes from and how to calculate it. The thermodynamics of ions crossing membranes, the Nernst equation for a single ion and the Goldman–Hodgkin–Katz equation for several were introduced in [[cell-biology/membrane-transport]]; we restate them here and use them, then build the electrical model that the rest of the course depends on: the neuron as a circuit of batteries, conductances and a capacitor. By the end you should be able to predict how the membrane potential of a neuron changes when the ion concentrations or the permeabilities change, and how fast it responds when current flows.

## Measuring the potential

The first direct measurement came from the giant axon of the squid. In 1939 Alan Hodgkin and Andrew Huxley in Plymouth, and Kenneth Cole and Howard Curtis at Woods Hole, slid a fine capillary electrode down the inside of an axon about half a millimetre in diameter and recorded the potential between it and the sea water outside. The axon was about 50 mV negative at rest. In 1949 Gilbert Ling and Ralph Gerard introduced the **sharp glass microelectrode**, fine enough to impale much smaller cells such as frog muscle fibres, and in 1981 Owen Hamill, Erwin Neher, Bert Sakmann and colleagues described the **whole-cell patch-clamp** configuration, in which a pipette sealed tightly to the membrane gains access to the cell's interior by rupturing the patch under its tip. Patch recording is now the standard method for neurons in culture and in brain slices.

By convention the membrane potential $V_\mathrm{m}$ is the potential of the inside minus that of the outside. A negative resting potential therefore means the inside is negative. A change towards zero or positive values is a **depolarisation**, and a change to more negative values is a **hyperpolarisation**.

Typical resting potentials are −60 to −75 mV in vertebrate central neurons, about −90 mV in vertebrate skeletal muscle, about −60 to −70 mV in the squid giant axon at sea temperature, and close to −85 mV or more negative in glial cells. Some cells rest near −40 mV, and plant cells, which use a proton pump rather than the sodium pump, often rest at −120 to −200 mV.

## Ion distributions

A membrane potential requires an unequal distribution of ions and a membrane that lets some ions cross more easily than others. Neurons have both.

| ion | inside (mmol L⁻¹) | outside (mmol L⁻¹) | ratio out/in |
|---|---|---|---|
| K⁺ | 140 | 5 | 0.036 |
| Na⁺ | 15 | 145 | 9.7 |
| Cl⁻ | 7 | 110 | 16 |
| Ca²⁺ (free) | 0.0001 | 2 | 20,000 |
| organic anions (proteins, metabolites, nucleotides) | many | few | — |

(Representative values for a mature mammalian central neuron. The squid axon, bathed in sea water, has higher concentrations of everything: K⁺ about 400 inside and 20 outside, Na⁺ about 50 inside and 440 outside.)

Two kinds of process set up these distributions.

- **Active transport.** The Na⁺/K⁺-ATPase pumps three Na⁺ out and two K⁺ in for each ATP hydrolysed; Ca²⁺ is kept extremely low inside by plasma-membrane Ca²⁺-ATPases, by Na⁺/Ca²⁺ exchangers and by uptake into the endoplasmic reticulum; Cl⁻ is moved by cation–chloride cotransporters (below). These are described in [[cell-biology/membrane-transport]].
- **Impermeant anions.** The cytoplasm contains a large concentration of negatively charged molecules that cannot cross the membrane: proteins, nucleic acids, phosphorylated metabolites. Electroneutrality inside requires them to be balanced by cations, and K⁺ is the cation that the pump accumulates.

Notice that both compartments are electrically neutral to an excellent approximation. The membrane potential is produced by a vanishingly small excess of charge in a thin layer next to the membrane, as we shall calculate.

## One ion: the equilibrium potential

Imagine a membrane permeable only to K⁺, separating 140 mmol L⁻¹ KCl inside from 5 mmol L⁻¹ outside. K⁺ diffuses out, down its concentration gradient. Each K⁺ that leaves carries a positive charge with it and leaves an unbalanced negative charge behind, so the inside becomes negative. The growing voltage pulls K⁺ back. When the electrical force on K⁺ exactly balances its tendency to diffuse, there is no net flux. The voltage at which this happens is the **equilibrium potential** of K⁺.

::: proposition The Nernst equation {#prop-nernst}
An ion X of charge number $z$ is at equilibrium across a membrane when the membrane potential equals

$$
E_\mathrm{X} = \frac{RT}{zF}\ln\frac{[\mathrm{X}]_\mathrm{o}}{[\mathrm{X}]_\mathrm{i}},
$$ {#eq-nernst}

where $R$ is the gas constant, $T$ the absolute temperature, $F$ the Faraday constant, and $[\mathrm{X}]_\mathrm{o}$ and $[\mathrm{X}]_\mathrm{i}$ the concentrations outside and inside (strictly, activities). At 37 °C, $RT/F = 26.7$ mV, so $E_\mathrm{X} = (61.5/z)\log_{10}([\mathrm{X}]_\mathrm{o}/[\mathrm{X}]_\mathrm{i})$ mV; at 20 °C the factor is 58.2 mV per tenfold ratio.

Assumptions: the ion is at equilibrium (no net flux, whatever the permeability), and the concentrations are not changed appreciably by the flux that sets up the potential.
:::

::: proof
The electrochemical potential of X per mole is $\tilde\mu = \mu^\circ + RT\ln[\mathrm{X}] + zF\psi$, where $\psi$ is the electrical potential. At equilibrium $\tilde\mu$ is the same on both sides, so $RT\ln[\mathrm{X}]_\mathrm{i} + zF\psi_\mathrm{i} = RT\ln[\mathrm{X}]_\mathrm{o} + zF\psi_\mathrm{o}$. Rearranging, $\psi_\mathrm{i} - \psi_\mathrm{o} = (RT/zF)\ln([\mathrm{X}]_\mathrm{o}/[\mathrm{X}]_\mathrm{i})$, which is [[#eq-nernst]] with $V_\mathrm{m} = \psi_\mathrm{i} - \psi_\mathrm{o}$.
:::

The equation contains no permeability. A single open channel, if it is the only route, is enough for the ion to reach equilibrium; more channels just get there faster. Permeability matters only when several ions compete, as they do in a real membrane.

::: example Equilibrium potentials of a mammalian neuron {#ex-nernst}
Using the table above and $RT/F = 26.7$ mV (37 °C), calculate $E_\mathrm{K}$, $E_\mathrm{Na}$, $E_\mathrm{Cl}$ and $E_\mathrm{Ca}$.
::: solution
$E_\mathrm{K} = 26.7\ln(5/140) = 26.7\times(-3.33) = -89$ mV.

$E_\mathrm{Na} = 26.7\ln(145/15) = 26.7\times2.27 = +61$ mV.

For Cl⁻, $z = -1$: $E_\mathrm{Cl} = -26.7\ln(110/7) = -26.7\times2.75 = -74$ mV.

For Ca²⁺, $z = 2$: $E_\mathrm{Ca} = 13.4\ln(2/0.0001) = 13.4\times9.90 = +132$ mV.

The resting potential of about −65 to −70 mV lies between $E_\mathrm{K}$ and $E_\mathrm{Na}$, close to $E_\mathrm{Cl}$, and very far from $E_\mathrm{Ca}$. Each number is the potential that the membrane would approach if it became permeable to that ion alone, and the difference $V_\mathrm{m} - E_\mathrm{X}$ is the **driving force** on the ion. At rest the driving force on Na⁺ is about $-65 - 61 = -126$ mV, a strong inward push, and on Ca²⁺ about $-200$ mV, so opening Na⁺ or Ca²⁺ channels lets these ions rush in.
:::
:::

How much charge has to move to set up such a potential? The membrane is a thin insulator between two conducting solutions, which is to say a capacitor. Its **specific capacitance** $C_\mathrm{m}$ is close to 1 µF cm⁻² in almost all cells, a value first measured by Kenneth Cole and Howard Curtis in the 1930s from the electrical impedance of cell suspensions and axons. (The simple formula for a parallel-plate capacitor, $C = \varepsilon_r\varepsilon_0/d$, with a relative permittivity $\varepsilon_r \approx 2$ for the hydrocarbon core of the bilayer and a thickness $d \approx 2.5$ nm, gives about 0.7 µF cm⁻², the right order of magnitude.)

::: example How many ions make a resting potential? {#ex-ions}
A spherical neuronal cell body has a diameter of 20 µm and contains 140 mmol L⁻¹ K⁺. How many K⁺ ions must leave it to charge its membrane to −70 mV, and what fraction of its K⁺ is that?
::: solution
Area $A = 4\pi r^2 = 4\pi(10^{-3}\ \mathrm{cm})^2 = 1.26\times10^{-5}$ cm², so the capacitance is $C = C_\mathrm{m}A = 1\ \mu\mathrm{F\,cm^{-2}}\times1.26\times10^{-5}\ \mathrm{cm^2} = 12.6$ pF.

The charge is $Q = CV = 12.6\times10^{-12}\ \mathrm{F}\times0.070\ \mathrm{V} = 8.8\times10^{-13}$ C. Dividing by the elementary charge, $1.60\times10^{-19}$ C, gives $5.5\times10^6$ ions.

The cell's volume is $\tfrac43\pi r^3 = 4.19\times10^{-12}$ L, so it holds $0.140\times4.19\times10^{-12}\times6.02\times10^{23} = 3.5\times10^{11}$ K⁺ ions. The fraction that left is $5.5\times10^6/3.5\times10^{11} \approx 1.6\times10^{-5}$, about one in 60,000.
:::
:::

The answer is the key to the whole subject. The ions that create the membrane potential are a tiny fraction of those present, so the potential can change by 100 mV within a millisecond, during an action potential, without measurably changing the concentrations. Concentrations change only slowly, over many impulses, and are restored by pumps. In electrical terms, the bulk solutions are neutral and the membrane potential sits on a thin layer of charge, a nanometre or so thick, on each face of the membrane.

::: warning "Ions flow until the concentrations are equal" and "the inside of a neuron is negatively charged"
At equilibrium a K⁺-selective membrane does not let K⁺ flow until the concentrations are equal. It lets a minute amount flow, just enough to charge the membrane, and then the voltage stops further net movement while the concentrations remain almost exactly as they were. And the cytoplasm as a whole is not negatively charged in any meaningful sense: the excess charge is about one part in $10^5$ of the ions present and is confined to the membrane surface. Treating the inside as a bag of negative charge leads to wrong predictions, such as large concentration changes during electrical signals.
:::

## Several ions: a steady state, not an equilibrium

If the resting membrane were permeable only to K⁺, the resting potential would be $E_\mathrm{K}$, about −89 mV in our neuron. It is less negative than that because the membrane also leaks some Na⁺ (and Cl⁻). Julius Bernstein proposed the first half of this idea in 1902: that nerve and muscle membranes at rest are selectively permeable to K⁺. The quantitative test came half a century later.

::: proposition The Goldman–Hodgkin–Katz voltage equation {#prop-ghk}
If K⁺, Na⁺ and Cl⁻ cross the membrane independently with permeabilities $P_\mathrm{K}$, $P_\mathrm{Na}$ and $P_\mathrm{Cl}$, the membrane potential at which the net ionic current is zero is

$$
V_\mathrm{m} = \frac{RT}{F}\ln\frac{P_\mathrm{K}[\mathrm{K}]_\mathrm{o} + P_\mathrm{Na}[\mathrm{Na}]_\mathrm{o} + P_\mathrm{Cl}[\mathrm{Cl}]_\mathrm{i}}{P_\mathrm{K}[\mathrm{K}]_\mathrm{i} + P_\mathrm{Na}[\mathrm{Na}]_\mathrm{i} + P_\mathrm{Cl}[\mathrm{Cl}]_\mathrm{o}}.
$$ {#eq-ghk}

Assumptions: the electric field in the membrane is uniform (the constant-field assumption of David Goldman, 1943), ions cross independently, the permeabilities are fixed, and the pumps carry no net current. The derivation is in [[cell-biology/membrane-transport]].
:::

Only the **ratios** of permeabilities matter. Alan Hodgkin and Bernard Katz (1949) fitted the squid axon at rest with $P_\mathrm{K}:P_\mathrm{Na}:P_\mathrm{Cl} = 1:0.04:0.45$. Typical mammalian neurons have $P_\mathrm{Na}/P_\mathrm{K}$ of about 0.02–0.05 at rest. With chloride left out (we return to it below), our neuron with $P_\mathrm{Na}/P_\mathrm{K} = 0.05$ gives

$$
V_\mathrm{m} = 26.7\ln\frac{5 + 0.05\times145}{140 + 0.05\times15} = 26.7\ln\frac{12.25}{140.75} = 26.7\times(-2.44) = -65\ \mathrm{mV}.
$$

The resting potential is therefore a **steady state**. Na⁺ leaks in all the time, driven by its large driving force; K⁺ leaks out, driven by a smaller one; the two currents cancel, so the voltage is steady; and the Na⁺/K⁺-ATPase removes the Na⁺ and recovers the K⁺, so the concentrations are steady too. Stop the pump, and the potential persists at first (the gradients are still there) but runs down over minutes to hours as the gradients dissipate.

The cleanest test of [[#eq-ghk]] is to change the external K⁺ concentration and measure the resting potential. If the membrane were permeable only to K⁺, the potential would follow $E_\mathrm{K}$, changing by 61.5 mV for each tenfold change in $[\mathrm{K}]_\mathrm{o}$ at 37 °C. Alan Hodgkin and Paul Horowicz did this experiment on single muscle fibres of the frog in 1959.

::: widget plot
f: 26.73*ln((10^x + a*145)/(140 + a*15)); 26.73*ln(10^x/140)
x: 0, 2.3
y: -120, 10
sliders: a=0.05:0:0.3:0.005
labels: V_\mathrm{m}\ \text{(GHK)}; E_\mathrm{K}\ \text{(Nernst)}
hlines: 0
caption: Resting potential (vertical axis, mV, 37 °C) against the logarithm of external K⁺ (horizontal axis: 0 means 1 mmol L⁻¹, 1 means 10, 2 means 100), for internal K⁺ 140 and Na⁺ 15, external Na⁺ 145 mmol L⁻¹, with the permeability ratio $P_\mathrm{Na}/P_\mathrm{K}$ set by the slider $a$. The straight line is $E_\mathrm{K}$, with a slope of 61.5 mV per decade. At high external K⁺ the membrane potential follows $E_\mathrm{K}$; at low external K⁺ it bends away, because the fixed Na⁺ leak matters more when the K⁺ term is small. Set $a = 0$ to see a pure K⁺ electrode, and raise $a$ to see the bend move to higher K⁺ concentrations.
:::

::: example Reading a potassium-dependence experiment {#ex-ko}
A neuron in culture is bathed in solutions of different K⁺ concentration (replacing Na⁺ so that the total stays constant), and its resting potential is measured. Representative values are:

| [K⁺]ₒ (mmol L⁻¹) | 2.5 | 5 | 10 | 20 | 50 | 100 |
|---|---|---|---|---|---|---|
| $V_\mathrm{m}$ (mV) | −71 | −65 | −56 | −44 | −24 | −7 |

(a) What is the slope between 50 and 100 mmol L⁻¹, in mV per decade, and what does it suggest? (b) Why is the slope much smaller between 2.5 and 5? (c) Estimate $P_\mathrm{Na}/P_\mathrm{K}$ from the value at 5 mmol L⁻¹, using the concentrations of the table above.
::: solution
(a) A doubling is $\log_{10}2 = 0.301$ decades. Between 50 and 100 the potential changes by 17 mV, so the slope is $17/0.301 = 56$ mV per decade, close to the Nernst slope of 61.5. At high external K⁺ the membrane behaves almost as a K⁺ electrode.

(b) Between 2.5 and 5 it changes by only 6 mV, a slope of $6/0.301 = 20$ mV per decade. When [K⁺]ₒ is small, the term $P_\mathrm{Na}[\mathrm{Na}]_\mathrm{o}$ in the numerator of [[#eq-ghk]] is comparable with $P_\mathrm{K}[\mathrm{K}]_\mathrm{o}$, so changing [K⁺]ₒ changes the numerator proportionally less.

(c) Write $a = P_\mathrm{Na}/P_\mathrm{K}$. At [K⁺]ₒ = 5: $-65 = 26.7\ln[(5 + 145a)/(140 + 15a)]$, so $(5 + 145a)/(140 + 15a) = \mathrm{e}^{-2.43} = 0.0879$. Then $5 + 145a = 12.3 + 1.32a$, giving $a = 7.3/143.7 = 0.051$. (These data were in fact generated from [[#eq-ghk]] with $a = 0.05$, to show the method; real data scatter, and $a$ is usually found by fitting the whole curve.)
:::
:::

::: quiz
A neuron rests at −65 mV with $E_\mathrm{K} = -89$ mV and $E_\mathrm{Na} = +61$ mV. A toxin opens additional K⁺ channels, doubling $P_\mathrm{K}$ without changing $P_\mathrm{Na}$. What happens?
- [ ] Nothing, because the K⁺ concentrations are unchanged.
- [x] The membrane hyperpolarises towards $E_\mathrm{K}$, because $P_\mathrm{Na}/P_\mathrm{K}$ halves.
- [ ] The membrane depolarises, because more K⁺ leaves the cell.
- [ ] The membrane goes exactly to $E_\mathrm{K}$.
::: solution
Only the ratio of permeabilities matters in [[#eq-ghk]]. Doubling $P_\mathrm{K}$ halves the ratio to about 0.025, and the potential moves towards $E_\mathrm{K}$ (to about −75 mV with our concentrations), but not all the way, because some Na⁺ permeability remains. More K⁺ does leave at first, but that is exactly what makes the inside more negative.
:::
:::

## The neuron as an electrical circuit

The GHK equation is excellent for the resting potential, but to describe signals, currents changing in time, we need a different and more flexible model. The idea, which Hodgkin and Huxley used in 1952, is to represent each kind of ion channel as a conductance in series with a battery.

::: definition Conductance, driving force and the equivalent circuit {#def-circuit}
For an ion X whose channels behave as ohmic resistors, the current through them (positive outward, by convention) is

$$
I_\mathrm{X} = g_\mathrm{X}\,(V_\mathrm{m} - E_\mathrm{X}),
$$ {#eq-ohm}

where $g_\mathrm{X}$ is the **conductance** of the membrane to X (siemens, S; the reciprocal of resistance) and $V_\mathrm{m} - E_\mathrm{X}$ is the **driving force**. The current is zero when $V_\mathrm{m} = E_\mathrm{X}$, which is why $E_\mathrm{X}$ is also called the **reversal potential**. The membrane is modelled as an **equivalent circuit**: a branch for each ion (a conductance $g_\mathrm{X}$ in series with a battery $E_\mathrm{X}$), all in parallel with the membrane capacitance $C$.
:::

Conductance and permeability are related but not the same. Permeability is a property of the membrane alone; conductance also depends on how many ions are available to carry current. A membrane equally permeable to K⁺ and Na⁺ has a larger K⁺ conductance when K⁺ is more concentrated, and the GHK equations show that, for ions at unequal concentrations, the current–voltage relation is curved rather than straight. The ohmic model of [[#eq-ohm]] is an approximation, but a good one over the physiological range of voltage for most channels, and it makes the circuit easy to analyse.

::: proposition The chord-conductance equation {#prop-chord}
If the membrane carries ohmic conductances $g_\mathrm{K}$, $g_\mathrm{Na}$ and $g_\mathrm{Cl}$ and no other net current (no injected current and no net pump current), its steady potential is the conductance-weighted average of the equilibrium potentials:

$$
V_\mathrm{m} = \frac{g_\mathrm{K}E_\mathrm{K} + g_\mathrm{Na}E_\mathrm{Na} + g_\mathrm{Cl}E_\mathrm{Cl}}{g_\mathrm{K} + g_\mathrm{Na} + g_\mathrm{Cl}}.
$$ {#eq-chord}

More generally, for any set of conductances $g_j$ with reversal potentials $E_j$, $V_\mathrm{m} = \sum_j g_jE_j / \sum_j g_j$.
:::

::: proof
In a steady state the capacitor is neither charging nor discharging, so the ionic currents sum to zero: $g_\mathrm{K}(V_\mathrm{m} - E_\mathrm{K}) + g_\mathrm{Na}(V_\mathrm{m} - E_\mathrm{Na}) + g_\mathrm{Cl}(V_\mathrm{m} - E_\mathrm{Cl}) = 0$. Collecting the terms in $V_\mathrm{m}$ gives $V_\mathrm{m}(g_\mathrm{K} + g_\mathrm{Na} + g_\mathrm{Cl}) = g_\mathrm{K}E_\mathrm{K} + g_\mathrm{Na}E_\mathrm{Na} + g_\mathrm{Cl}E_\mathrm{Cl}$.
:::

The equation makes the logic of every electrical signal in the nervous system transparent. The membrane potential is pulled towards the reversal potential of whichever conductance is largest. Open more Na⁺ channels and it moves towards $E_\mathrm{Na}$ (the rising phase of the action potential, an excitatory synaptic potential). Open more K⁺ channels and it moves towards $E_\mathrm{K}$ (repolarisation, many inhibitory potentials). Open Cl⁻ channels and it moves towards $E_\mathrm{Cl}$, which may be above or below the resting potential.

::: example A tug of war of conductances {#ex-chord}
A neuron has resting conductances $g_\mathrm{K} = 10$ nS, $g_\mathrm{Na} = 0.5$ nS and $g_\mathrm{Cl} = 2$ nS, with the equilibrium potentials of [[#ex-nernst]] ($E_\mathrm{K} = -89$, $E_\mathrm{Na} = +61$, $E_\mathrm{Cl} = -74$ mV). (a) Find the resting potential. (b) Find the current carried by each ion at rest. (c) Which ion's net flux must the pumps balance?
::: solution
(a) From [[#eq-chord]]:

$$
V_\mathrm{m} = \frac{10(-89) + 0.5(61) + 2(-74)}{12.5} = \frac{-890 + 30.5 - 148}{12.5} = \frac{-1007.5}{12.5} = -80.6\ \mathrm{mV}.
$$

(b) With nS and mV the currents come out in pA. $I_\mathrm{K} = 10(-80.6 + 89) = +84$ pA (outward); $I_\mathrm{Na} = 0.5(-80.6 - 61) = -71$ pA (inward); $I_\mathrm{Cl} = 2(-80.6 + 74) = -13$ pA. A negative Cl⁻ current means outward movement of the negatively charged ions, that is, Cl⁻ leaving the cell. The three sum to zero, as they must.

(c) All three. There is a steady inward leak of Na⁺, outward leak of K⁺ and outward leak of Cl⁻; the Na⁺/K⁺-ATPase balances the first two, and a Cl⁻ transporter must balance the third, otherwise $E_\mathrm{Cl}$ would drift until it equalled $V_\mathrm{m}$. In many neurons Cl⁻ is close to equilibrium at rest, so its current is small.
:::
:::

### The electrogenic pump

The Na⁺/K⁺-ATPase moves three positive charges out for every two it brings in, so it carries a small net outward current and contributes directly to the membrane potential. Its share can be estimated by noting that in a steady state the pump's fluxes must exactly balance the leaks: for every three Na⁺ that leak in, two K⁺ must leak out. Lorin Mullins and Kimiko Noda (1963), working on frog muscle, added this condition to the constant-field model and obtained

$$
V_\mathrm{m} = \frac{RT}{F}\ln\frac{rP_\mathrm{K}[\mathrm{K}]_\mathrm{o} + P_\mathrm{Na}[\mathrm{Na}]_\mathrm{o}}{rP_\mathrm{K}[\mathrm{K}]_\mathrm{i} + P_\mathrm{Na}[\mathrm{Na}]_\mathrm{i}}
$$ {#eq-mullins}

with the coupling ratio $r = 3/2$. For our neuron with $P_\mathrm{Na}/P_\mathrm{K} = 0.05$ this gives −71 mV, against −65 mV from [[#eq-ghk]] (which is the special case $r = 1$). The pump's direct contribution is a few millivolts in most neurons. Its large, indirect contribution is to maintain the gradients from which the rest of the potential is made.

Pumping is costly. Most of the brain's ATP is spent on the Na⁺/K⁺-ATPase, returning the ions that leak at rest and that cross during action potentials and synaptic potentials. Estimates for the mammalian cortex, notably by David Attwell and Simon Laughlin (2001), put signalling-related pumping at well over half of the brain's energy use; the exact split between action potentials, synaptic currents and resting leak depends on species, temperature and the assumptions made.

## Time: the membrane as an RC circuit

So far we have looked at steady states. What happens when current is suddenly injected into a neuron, as it is by a synapse or an experimenter's electrode? The current cannot change the voltage instantly, because it must first charge the membrane capacitance.

For a small, compact cell (an "isopotential" cell, in which the voltage is the same everywhere), lump all the resting conductances into a single **input conductance** $g_\mathrm{in} = 1/R_\mathrm{in}$, with a combined reversal potential equal to the resting potential $V_\mathrm{rest}$. Write $V = V_\mathrm{m} - V_\mathrm{rest}$ for the deviation from rest. Current injected into the cell, $I$, divides between charging the capacitor and flowing out through the conductance:

$$
I = C\deriv{V}{t} + \frac{V}{R_\mathrm{in}}.
$$ {#eq-rc}

::: proposition Charging of the membrane {#prop-rc}
If a constant current $I$ is switched on at $t = 0$ in a cell at rest, the deviation from rest is

$$
V(t) = IR_\mathrm{in}\left(1 - \mathrm{e}^{-t/\tau}\right), \qquad \tau = R_\mathrm{in}C = R_\mathrm{m}C_\mathrm{m},
$$ {#eq-charging}

and when the current is switched off the voltage decays as $V(t) = V_0\,\mathrm{e}^{-t/\tau}$. Here $R_\mathrm{m}$ is the **specific membrane resistance** (Ω cm², resistance times area) and $C_\mathrm{m}$ the specific capacitance (F cm⁻²). The **membrane time constant** $\tau$ is therefore independent of the size of the cell; the steady deflection $IR_\mathrm{in}$ is not.

Assumptions: an isopotential cell, conductances that do not change with voltage over the range of the response (a "passive" membrane), and a constant current.
:::

::: proof
[[#eq-rc]] is a linear first-order equation, $\tau\,\deriv{V}{t} = -V + IR_\mathrm{in}$ with $\tau = R_\mathrm{in}C$. Its equilibrium is $V_\infty = IR_\mathrm{in}$, and the deviation $V - V_\infty$ decays as $\mathrm{e}^{-t/\tau}$; with $V(0) = 0$ this gives [[#eq-charging]]. With $I = 0$ the equilibrium is 0, giving the decay. For a cell of area $A$, $R_\mathrm{in} = R_\mathrm{m}/A$ and $C = C_\mathrm{m}A$, so $\tau = R_\mathrm{m}C_\mathrm{m}$, the area cancelling.
:::

The same equation, with a different meaning for $\tau$, governed the proportional control loop in [[animal-physiology/homeostasis]]. It reappears throughout neuroscience: synaptic potentials rise and decay with time constants set partly by $\tau$, and $\tau$ sets the window over which a neuron adds up inputs that arrive at different times ([[neuroscience/synapses]]).

::: widget plot
f: if(x < 100, I*R*(1 - exp(-x/(R*C))), I*R*(1 - exp(-100/(R*C)))*exp(-(x - 100)/(R*C)))
x: 0, 200
y: 0, 40
sliders: I=10:0:20:1; R=1.6:0.2:3:0.1; C=12.6:5:50:0.1
labels: V\ \text{(mV above rest)}
vlines: 100
caption: The voltage of a passive, isopotential cell (vertical axis, mV above rest) when a current step of $I$ pA (slider) is applied from 0 to 100 ms (vertical line) and then switched off. $R$ is the input resistance in GΩ and $C$ the capacitance in pF, so $\tau = RC$ is in milliseconds and the plateau $IR$ in millivolts. With the default values (the 20 µm cell of [[#ex-rc-cell]]), $\tau = 20$ ms and the plateau is 16 mV. Increase $C$, as for a larger cell with the same $R$, and the rise and fall slow down; increase $R$ and the plateau rises as well as slowing.
:::

::: example A small neuron's input resistance and time constant {#ex-rc-cell}
The 20 µm spherical cell of [[#ex-ions]] has a specific membrane resistance of 20,000 Ω cm² and $C_\mathrm{m} = 1\ \mu\mathrm{F\,cm^{-2}}$. (a) Find its input resistance, capacitance and time constant. (b) What steady depolarisation does a 10 pA current produce? (c) How long after the current is switched on does the voltage reach 95 % of its plateau?
::: solution
(a) Area $1.26\times10^{-5}$ cm², so $R_\mathrm{in} = 20{,}000/1.26\times10^{-5} = 1.6\times10^9\ \Omega = 1.6$ GΩ, $C = 12.6$ pF, and $\tau = R_\mathrm{m}C_\mathrm{m} = 20{,}000\times10^{-6} = 0.020$ s $= 20$ ms.

(b) $V_\infty = IR_\mathrm{in} = 10\times10^{-12}\times1.6\times10^9 = 0.016$ V $= 16$ mV.

(c) $1 - \mathrm{e}^{-t/\tau} = 0.95$ gives $t = \tau\ln 20 = 3.0\tau = 60$ ms.

A gigaohm input resistance means that a current of a few picoamperes, the current through a handful of open channels, changes the voltage of a small neuron by millivolts. This is why single channels can matter in small cells, and why small neurons are more excitable than large ones for the same density of channels.
:::
:::

In practice the time constant and input resistance are measured from the response to a small current step. The voltage at the end of a long step, divided by the current, gives $R_\mathrm{in}$; the time to reach 63 % ($1 - \mathrm{e}^{-1}$) of the plateau gives $\tau$; and the ratio $\tau/R_\mathrm{in}$ gives the capacitance and hence, at 1 µF cm⁻², the membrane area. Real neurons, with dendrites and axons, charge with several exponential components rather than one, because current spreads into the processes as well as across the soma membrane. The next chapter treats this spread along a cable.

## Chloride, calcium and glia

**Chloride.** Unlike K⁺ and Na⁺, chloride is not pumped by a primary ATPase in most neurons. Its distribution is set by secondary active **cation–chloride cotransporters**: NKCC1, which brings Na⁺, K⁺ and two Cl⁻ in together and so raises internal Cl⁻, and KCC2, which carries K⁺ and Cl⁻ out together and so lowers it. In mature neurons of the mammalian brain KCC2 dominates, internal Cl⁻ is low (about 5–10 mmol L⁻¹), and $E_\mathrm{Cl}$ lies near or below the resting potential. In immature neurons NKCC1 dominates, internal Cl⁻ is higher, and $E_\mathrm{Cl}$ can lie well above the resting potential. Claudio Rivera, Kai Kaila and colleagues showed in 1999 that the developmental rise of KCC2 expression in the rat hippocampus is responsible for this change. Because the main inhibitory receptors of the brain are chloride channels, the change in $E_\mathrm{Cl}$ changes what inhibition does ([[neuroscience/synapses]]).

**Calcium.** Free Ca²⁺ inside a resting neuron is about 100 nmol L⁻¹, twenty thousand times less than outside. Ca²⁺ carries almost none of the resting current, but its enormous driving force means that whenever Ca²⁺ channels open, the internal concentration rises steeply near the channel, and Ca²⁺ is the signal that couples electrical activity to transmitter release, gene expression and plasticity. It is pumped out or sequestered within milliseconds to seconds.

**Glia.** Glial cells are permeable almost exclusively to K⁺, so their membrane potential follows $E_\mathrm{K}$. When Stephen Kuffler, John Nicholls and Richard Orkand recorded from glia in the optic nerve of the mudpuppy *Necturus* (1966) and changed the bathing K⁺, the glial potential changed by close to the Nernst slope over a wide range. This makes glia excellent sensors of extracellular K⁺, which they buffer ([[neuroscience/neurons-glia]]).

::: application Extracellular potassium and excitability
Because the resting potential depends steeply on external K⁺ (the figure above), anything that changes plasma K⁺ changes the excitability of nerve and muscle throughout the body. A rise depolarises cells, at first making them more excitable and then, as Na⁺ channels inactivate, less so; a fall hyperpolarises them. Heart muscle is particularly sensitive, which is why plasma K⁺ is tightly regulated by the kidneys. The physiology of these effects in humans and their clinical significance belong to [Medicine Atlas: membrane potentials](/learn/medicine/lesson.php?c=physiology&l=membrane-potentials); here the point is that the Nernst and GHK equations predict them.
:::

## Computing potentials

The calculations of this chapter are easily scripted. The short program below computes Nernst potentials and the GHK and chord-conductance potentials for any set of concentrations, permeabilities or conductances.

```python
import math

R, F = 8.314, 96485.0          # J mol^-1 K^-1, C mol^-1

def nernst(c_out, c_in, z, T=310.15):
    """Equilibrium potential in mV (concentrations in the same units)."""
    return 1000 * R * T / (z * F) * math.log(c_out / c_in)

def ghk(P, out, inn, T=310.15):
    """GHK voltage (mV); P, out, inn are dicts keyed by 'K', 'Na', 'Cl'."""
    num = P['K'] * out['K'] + P['Na'] * out['Na'] + P['Cl'] * inn['Cl']
    den = P['K'] * inn['K'] + P['Na'] * inn['Na'] + P['Cl'] * out['Cl']
    return 1000 * R * T / F * math.log(num / den)

def chord(g, E):
    """Steady potential (mV) from conductances g and reversal potentials E."""
    return sum(g[k] * E[k] for k in g) / sum(g.values())

out = {'K': 5, 'Na': 145, 'Cl': 110}       # mmol/L
inn = {'K': 140, 'Na': 15, 'Cl': 7}
E = {'K': nernst(5, 140, 1), 'Na': nernst(145, 15, 1), 'Cl': nernst(110, 7, -1)}
print({k: round(v, 1) for k, v in E.items()})       # {'K': -89.1, 'Na': 60.6, 'Cl': -73.6}
print(round(ghk({'K': 1, 'Na': 0.05, 'Cl': 0}, out, inn), 1))   # -65.3
print(round(chord({'K': 10, 'Na': 0.5, 'Cl': 2}, E), 1))        # -80.6
```

::: history
Walther Nernst derived his equation for electrochemical cells in 1889. Julius Bernstein's membrane theory (1902, elaborated in 1912) proposed that the resting potential is a K⁺ diffusion potential across a selectively permeable membrane and that excitation is a transient loss of selectivity. Kenneth Cole and Howard Curtis measured the membrane capacitance of cells and axons in the 1930s and in 1939 showed that membrane conductance rises during the impulse. The same year Hodgkin and Huxley, and Curtis and Cole, recorded from inside the squid giant axon and found that the action potential overshoots zero, which Bernstein's theory could not explain. David Goldman's constant-field equation (1943) was applied by Hodgkin and Katz in 1949, together with Ling and Gerard's microelectrode of the same year, and Hodgkin and Horowicz tested the K⁺ dependence on single frog muscle fibres in 1959. Mullins and Noda added the electrogenic pump in 1963, and the patch clamp of Neher, Sakmann and colleagues (1976 for single channels, 1981 for whole cells) made these measurements routine in small neurons.
:::

## Where this leads

The resting potential is the stage. In [[neuroscience/action-potential]] voltage-gated Na⁺ and K⁺ conductances change in milliseconds, the chord-conductance equation swings the membrane from near $E_\mathrm{K}$ to near $E_\mathrm{Na}$ and back, and the RC properties of the membrane, extended to a long cable, decide how far and how fast the impulse spreads.

::: summary
- The resting potential (−60 to −90 mV in most neurons and muscle) arises from ion gradients maintained by pumps and from a membrane more permeable to K⁺ than to other ions.
- The Nernst equation gives each ion's equilibrium potential, $E_\mathrm{X} = (RT/zF)\ln([\mathrm{X}]_\mathrm{o}/[\mathrm{X}]_\mathrm{i})$, 61.5 mV per decade at 37 °C: typically $E_\mathrm{K} \approx -89$, $E_\mathrm{Na} \approx +61$, $E_\mathrm{Cl} \approx -74$, $E_\mathrm{Ca} \approx +130$ mV.
- The charge needed is tiny (about $10^{-5}$ of the cell's K⁺), because the membrane capacitance is about 1 µF cm⁻²; potentials can change in milliseconds without changing concentrations.
- With several permeant ions the resting potential is a steady state, given by the GHK equation (only permeability ratios matter) or, for ohmic channels, by the chord-conductance equation $V = \sum g_jE_j/\sum g_j$.
- The membrane potential is pulled towards the reversal potential of the dominant conductance; this is the logic of all electrical signals.
- The Na⁺/K⁺-ATPase contributes a few millivolts directly (coupling ratio 3:2) and the gradients indirectly; it consumes most of the brain's energy.
- A passive, compact cell charges with time constant $\tau = R_\mathrm{m}C_\mathrm{m}$ (typically 10–50 ms) to a plateau $IR_\mathrm{in}$.
- Internal Cl⁻ is set by NKCC1 and KCC2 and changes during development; internal Ca²⁺ is about $10^{-7}$ mol L⁻¹; glia follow $E_\mathrm{K}$.
:::

## Exercises

::: exercise A potassium equilibrium potential {level=1 check="-76"}
The squid axon contains 400 mmol L⁻¹ K⁺ and is bathed in 20 mmol L⁻¹ K⁺. At 20 °C ($RT/F = 25.3$ mV), what is $E_\mathrm{K}$ in mV, to the nearest millivolt?
::: solution
$E_\mathrm{K} = 25.3\ln(20/400) = 25.3\times(-3.00) = -76$ mV.
:::
:::

::: exercise A divalent ion {level=1 check="132"}
With 2 mmol L⁻¹ Ca²⁺ outside and 0.1 µmol L⁻¹ free Ca²⁺ inside, what is $E_\mathrm{Ca}$ at 37 °C, to the nearest millivolt?
::: solution
$E_\mathrm{Ca} = (26.7/2)\ln(2\times10^{-3}/10^{-7}) = 13.37\ln(20{,}000) = 13.37\times9.90 = +132$ mV. The factor of 2 in the charge halves the potential per decade, but the enormous ratio more than makes up for it.
:::
:::

::: exercise Measuring a time constant {level=1 check="30000"}
A 50 pA current step produces a steady hyperpolarisation of 10 mV in a neuron, and the voltage reaches 63 % of its final value after 30 ms. Find the input resistance in MΩ, the capacitance in pF, and the specific membrane resistance in Ω cm², assuming $C_\mathrm{m} = 1\ \mu\mathrm{F\,cm^{-2}}$. (The check is for $R_\mathrm{m}$.)
::: solution
$R_\mathrm{in} = 10\ \mathrm{mV}/50\ \mathrm{pA} = 200$ MΩ. $\tau = 30$ ms, so $C = \tau/R_\mathrm{in} = 0.030/2\times10^8 = 1.5\times10^{-10}$ F $= 150$ pF, which at 1 µF cm⁻² means an area of $1.5\times10^{-4}$ cm². $R_\mathrm{m} = \tau/C_\mathrm{m} = 0.030/10^{-6} = 30{,}000\ \Omega\,\mathrm{cm^2}$.
:::
:::

::: exercise Raising external potassium {level=2 check="-64"}
Using the GHK equation without chloride at 37 °C, with internal K⁺ 140 and Na⁺ 15, external Na⁺ 145 mmol L⁻¹ and $P_\mathrm{Na}/P_\mathrm{K} = 0.02$, calculate the resting potential (to the nearest millivolt) when external K⁺ is 10 mmol L⁻¹. Compare it with the value at 5 mmol L⁻¹.
::: solution
At 10 mmol L⁻¹: $V_\mathrm{m} = 26.7\ln[(10 + 2.9)/(140 + 0.3)] = 26.7\ln(12.9/140.3) = 26.7\times(-2.387) = -64$ mV. At 5: $26.7\ln(7.9/140.3) = 26.7\times(-2.877) = -77$ mV. Doubling external K⁺ depolarises this neuron by about 13 mV, less than the 18.5 mV change in $E_\mathrm{K}$ ($61.5\log_{10}2$).
:::
:::

::: exercise Reversal of a chloride current {level=2}
In a mature hippocampal neuron internal Cl⁻ is 7 mmol L⁻¹; in an immature one it is 30 mmol L⁻¹; external Cl⁻ is 110 mmol L⁻¹ in both. Both rest at −65 mV. Calculate $E_\mathrm{Cl}$ in each at 37 °C and predict the effect of opening Cl⁻ channels. Which cotransporter is responsible for the difference?
::: solution
Mature: $E_\mathrm{Cl} = -26.7\ln(110/7) = -74$ mV. Opening Cl⁻ channels moves the membrane towards −74 mV, a hyperpolarisation of about 9 mV, and holds it away from threshold. Immature: $E_\mathrm{Cl} = -26.7\ln(110/30) = -35$ mV. Opening Cl⁻ channels depolarises the membrane towards −35 mV, so the same transmitter is depolarising, and can even excite. The difference is due to KCC2, which extrudes Cl⁻ and is upregulated during development, against NKCC1, which accumulates Cl⁻ and dominates early.
:::
:::

::: exercise What sets the resting potential? {level=2}
For each manipulation, predict whether the resting potential of a neuron becomes more negative, less negative, or barely changes, and explain with [[#eq-ghk]] or [[#eq-chord]]: (a) replacing half the external Na⁺ with an impermeant cation; (b) blocking the Na⁺/K⁺-ATPase for ten seconds; (c) blocking the K2P "leak" K⁺ channels; (d) doubling the external Cl⁻ concentration in a cell with low resting Cl⁻ permeability.
::: solution
(a) Slightly more negative: the $P_\mathrm{Na}[\mathrm{Na}]_\mathrm{o}$ term halves, so the numerator shrinks and the potential moves towards $E_\mathrm{K}$. The change is only a few millivolts because $P_\mathrm{Na}$ is small at rest. (b) Less negative by a few millivolts at once (the electrogenic pump current is lost, [[#eq-mullins]] with $r$ effectively becoming 1); the gradients are barely changed in ten seconds. (c) Less negative, possibly by many millivolts: $P_\mathrm{K}$ falls, so $P_\mathrm{Na}/P_\mathrm{K}$ rises and the potential moves towards $E_\mathrm{Na}$. Neurons with mainly K2P leak conductance depolarise and may fire. (d) Barely changes: $E_\mathrm{Cl}$ shifts, but with a small $g_\mathrm{Cl}$ its weight in [[#eq-chord]] is small. Over time, Cl⁻ redistributes until it is again near equilibrium.
:::
:::

::: exercise Interpreting glial recordings {level=2}
In an experiment like that of Kuffler, Nicholls and Orkand, the membrane potential of a glial cell is −89 mV in 3 mmol L⁻¹ external K⁺ and −60 mV in 9 mmol L⁻¹ (at 20 °C, where the Nernst slope is 58 mV per decade). (a) Is the glial membrane behaving as a perfect K⁺ electrode? (b) Estimate the glial internal K⁺ concentration. (c) What does this behaviour allow glia to do?
::: solution
(a) Tripling K⁺ is $\log_{10}3 = 0.477$ decades; a perfect K⁺ electrode would change by $58\times0.477 = 27.7$ mV. The observed change is 29 mV, the same within experimental error, so yes. (b) $-89 = 58\log_{10}(3/[\mathrm{K}]_\mathrm{i})$ gives $\log_{10}(3/[\mathrm{K}]_\mathrm{i}) = -1.534$, so $[\mathrm{K}]_\mathrm{i} = 3\times10^{1.534} \approx 103$ mmol L⁻¹, a reasonable value for an amphibian cell. (c) A membrane that follows $E_\mathrm{K}$ allows glia to sense extracellular K⁺ and, through their gap-junction-coupled network, to redistribute K⁺ from regions where neurons have been active to regions where it is low (spatial buffering, [[neuroscience/neurons-glia]]).
:::
:::

::: exercise The pump's energy bill {level=3}
In the neuron of [[#ex-chord]], 71 pA of Na⁺ current leaks in at rest. (a) How many Na⁺ ions enter per second? (b) How many ATP molecules per second must the Na⁺/K⁺-ATPase hydrolyse to remove them? (c) If the neuron fires 10 action potentials per second and each admits $5\times10^7$ extra Na⁺ ions, by what factor does activity increase the pump's ATP consumption? (d) What does this suggest about the energy cost of resting versus signalling in this neuron?
::: solution
(a) $71\times10^{-12}\ \mathrm{C\,s^{-1}}/1.60\times10^{-19}\ \mathrm{C} = 4.4\times10^8$ Na⁺ s⁻¹.

(b) Three Na⁺ per ATP: $1.5\times10^8$ ATP s⁻¹.

(c) Action potentials add $10\times5\times10^7 = 5\times10^8$ Na⁺ s⁻¹, or $1.7\times10^8$ ATP s⁻¹, so consumption roughly doubles, a factor of about 2.1.

(d) In this illustrative neuron, resting leak and signalling cost similar amounts. Real budgets depend strongly on resting conductances, firing rates and the efficiency of action potentials (mammalian axons waste less Na⁺ per spike than the squid axon, [[neuroscience/action-potential]]), and published estimates for cortex attribute most of the cost to synaptic and action-potential currents. The calculation shows why neurons with low resting Na⁺ leak and sparse firing are cheaper to run.
:::
:::

::: exercise GHK and chord conductance compared {level=3}
(a) Show that if all ions are at the same concentration on both sides of the membrane, except for one ion X with $E_\mathrm{X} \neq 0$, both [[#eq-ghk]] and [[#eq-chord]] give a potential between 0 and $E_\mathrm{X}$. (b) Using the neuron of [[#ex-nernst]] with $P_\mathrm{Na}/P_\mathrm{K} = 0.05$, the GHK resting potential (no Cl⁻) is −65.3 mV. What ratio $g_\mathrm{Na}/g_\mathrm{K}$ in [[#eq-chord]] gives the same potential? (c) Why do the two ratios differ?
::: hint
For (b), set $(g_\mathrm{K}E_\mathrm{K} + g_\mathrm{Na}E_\mathrm{Na})/(g_\mathrm{K} + g_\mathrm{Na}) = -65.3$ and solve for the ratio.
:::
::: solution
(a) In [[#eq-chord]] the ions with equal concentrations have $E = 0$, so $V_\mathrm{m} = g_\mathrm{X}E_\mathrm{X}/\sum g$, a fraction of $E_\mathrm{X}$ between 0 and 1. In [[#eq-ghk]] the terms for ions with equal concentrations are the same in numerator and denominator; the logarithm of the ratio then lies between 0 (if X is negligible) and $\ln$ of the concentration ratio of X (if X dominates), so $V_\mathrm{m}$ lies between 0 and $E_\mathrm{X}$.

(b) Let $\rho = g_\mathrm{Na}/g_\mathrm{K}$. Then $(-89.1 + 60.6\rho)/(1 + \rho) = -65.3$, so $-89.1 + 60.6\rho = -65.3 - 65.3\rho$, giving $125.9\rho = 23.8$ and $\rho = 0.19$.

(c) Conductance is not permeability. In the GHK model the current an ion carries depends on its concentrations as well as its permeability, and at −65 mV the inward Na⁺ current is carried by a large external concentration pushed by a large driving force, while the K⁺ current is limited by the small external K⁺ concentration for inward flux. The slope of each GHK current–voltage curve at the resting potential, which is what a chord conductance approximates, therefore differs from the permeability ratio. Each model is self-consistent; you cannot mix a permeability ratio from one with a conductance ratio from the other.
:::
:::
