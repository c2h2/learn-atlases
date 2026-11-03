In 1926 Edgar Adrian and Yngve Zotterman, at Cambridge, dissected a frog's neck muscle down until its nerve carried the signals of a single stretch receptor, and hung weights on the muscle. Each weight produced a train of identical action potentials, and heavier weights produced faster trains. The impulses themselves did not change; only their frequency did. Adrian concluded that a sensory nerve fibre tells the brain about the strength of a stimulus by how often it fires. That was the first answer to a question that still drives neuroscience: how is information about the world, and about the animal's own intentions, represented in the activity of neurons?

The previous chapters explained how spikes are generated, transmitted and modified. This chapter asks what they mean and how we measure them. We describe spike trains statistically, as random point processes; ask how much a neuron's firing can tell an observer about a stimulus, using tuning curves, Fisher information and information theory; look at codes that use timing and populations rather than rates alone; consider why codes take the forms they do; turn to the large-scale rhythms of the brain and to sleep; and finally survey the methods used to record, image and manipulate neural activity, and what each can and cannot show. The probability background is in [Maths Atlas: probability](/learn/maths/course.php?c=probability) and the statistics in [[biostatistics]].

## Spike trains

Because action potentials are all-or-none and nearly identical, a neuron's output can be summarised by the list of times at which it fires, its **spike train**. Repeated presentations of the same stimulus rarely produce the same spike train: the number and timing of spikes vary from trial to trial. To describe a neuron's response we therefore need statistics.

::: definition Firing rate {#def-rate}
The **spike-count rate** is the number of spikes $n$ in a window of length $T$ divided by $T$. The **time-dependent firing rate** $r(t)$ is the probability per unit time of a spike near time $t$, estimated by averaging over many trials: in a **peristimulus time histogram** (PSTH), spikes from all trials are binned by their time after stimulus onset, and the count in each bin is divided by the number of trials and the bin width. The **tuning curve** $f(s)$ of a neuron is its mean firing rate as a function of a stimulus parameter $s$ (orientation, sound frequency, direction of movement, position in space).
:::

The simplest statistical model of a spike train is the Poisson process, in which spikes occur independently of one another.

::: proposition The Poisson spike train {#prop-poisson}
If spikes occur at a constant rate $r$ and independently of each other, then:

1. the number of spikes $n$ in a window of length $T$ follows a **Poisson distribution**,
$$
P(n) = \frac{(rT)^n}{n!}\,\mathrm{e}^{-rT},
$$ {#eq-poisson-count}
with mean and variance both equal to $rT$, so that the **Fano factor**, variance divided by mean, is 1;
2. the **interspike intervals** (ISIs) $\tau$ follow an **exponential distribution**, $p(\tau) = r\,\mathrm{e}^{-r\tau}$, with mean $1/r$ and standard deviation $1/r$, so that their **coefficient of variation** (CV, standard deviation divided by mean) is also 1.

Assumptions: a constant rate and complete independence of spikes, including no refractory period. Real neurons violate both, so the Poisson process is a reference model, not a description.
:::

::: proof
Divide $T$ into $N$ short bins of width $\Delta t = T/N$, each containing a spike with probability $r\Delta t$ independently. The count is binomial, $\binom{N}{n}(r\Delta t)^n(1 - r\Delta t)^{N - n}$; as $N \to \infty$ with $N\Delta t = T$ fixed, this tends to [[#eq-poisson-count]] (the Poisson limit of the binomial). The probability of no spike in an interval $\tau$ after a spike is $P(0) = \mathrm{e}^{-r\tau}$, so the ISI exceeds $\tau$ with that probability; differentiating $1 - \mathrm{e}^{-r\tau}$ gives the exponential density. The mean and variance of an exponential distribution with rate $r$ are $1/r$ and $1/r^2$.
:::

Cortical neurons in awake animals fire irregularly, with ISI CVs near 1 and Fano factors of spike counts often between about 1 and 1.5 (William Softky and Christof Koch, 1993; Michael Shadlen and William Newsome, 1998). The irregularity is surprising, because a neuron that summed many independent inputs to a fixed threshold would fire regularly. One explanation is that excitatory and inhibitory inputs are roughly balanced, so that the membrane potential hovers near threshold and is driven across it by fluctuations. Other neurons, such as some in the auditory brainstem and in the cerebellum, fire very regularly, with CVs well below 1. The refractory period alone makes trains more regular than Poisson, as the program shows.

```python
import random, statistics

# Spike trains as a Poisson process, with and without a refractory period.
random.seed(2)
rate = 20.0          # spikes per second (rate of the underlying Poisson process)
T = 0.5              # s, counting window
trials = 2000

def spike_train(rate, T, dead=0.0):
    """Spike times (s) in [0, T): exponential intervals plus an optional dead time."""
    t, spikes = 0.0, []
    while True:
        t += dead + random.expovariate(rate)
        if t >= T:
            return spikes
        spikes.append(t)

for dead in (0.0, 0.010):                       # no refractoriness; 10 ms dead time
    counts, isis = [], []
    for _ in range(trials):
        s = spike_train(rate, T, dead)
        counts.append(len(s))
        isis += [b - a for a, b in zip(s, s[1:])]
    mean_n = statistics.mean(counts)
    fano = statistics.variance(counts) / mean_n
    cv = statistics.stdev(isis) / statistics.mean(isis)
    print(f"dead time {1000*dead:4.0f} ms: mean count {mean_n:5.2f}, "
          f"Fano factor {fano:.2f}, CV of ISIs {cv:.2f}")
# dead time    0 ms: mean count  9.98, Fano factor 1.00, CV of ISIs 0.98
# dead time   10 ms: mean count  8.21, Fano factor 0.70, CV of ISIs 0.80
```

With a 10 ms dead time added to each interval, the mean interval rises from 50 to 60 ms and the CV falls to $50/60 \approx 0.83$: the train becomes more regular, and the Fano factor falls with it.

::: widget distribution
dist: poisson
params: lambda=10
a: 5
b: 15
caption: The distribution of spike counts for a Poisson neuron, with mean count $\lambda = rT$ set by the slider (here 10, as for 20 spikes s⁻¹ in a 0.5 s window). The shaded region is the probability that the count falls between 5 and 15. Even for a perfectly steady stimulus, counts of 6 and 14 are both common, so a single trial gives only a rough estimate of the rate. As $\lambda$ grows, the distribution widens (its standard deviation is $\sqrt\lambda$) but narrows relative to its mean, which is why longer windows or higher rates give more reliable rate estimates.
:::

::: example How reliable is a spike count? {#ex-count}
A neuron fires as a Poisson process at 20 spikes s⁻¹ to stimulus A and 30 spikes s⁻¹ to stimulus B. An observer counts spikes in a 0.5 s window. (a) What are the mean and standard deviation of the count for each stimulus? (b) What is the probability of seeing exactly 10 spikes to A? Of seeing none? (c) Define the discriminability $d' = (\mu_B - \mu_A)/\sqrt{(\sigma_A^2 + \sigma_B^2)/2}$. Calculate it, and estimate the probability that an ideal observer comparing one trial of each stimulus picks out B correctly, using the normal approximation (proportion correct $= \Phi(d'/\sqrt2)$).
::: solution
(a) A: mean $rT = 10$, standard deviation $\sqrt{10} = 3.16$. B: mean 15, standard deviation $\sqrt{15} = 3.87$.

(b) $P(10) = 10^{10}\mathrm{e}^{-10}/10! = 0.125$; $P(0) = \mathrm{e}^{-10} = 4.5\times10^{-5}$.

(c) $d' = 5/\sqrt{(10 + 15)/2} = 5/3.54 = 1.41$. Proportion correct $= \Phi(1.41/1.414) = \Phi(1.0) = 0.84$. A 50 % difference in firing rate is detected correctly on only about 84 % of trials with one neuron and half a second of counting. Doubling the window to 1 s doubles the mean difference and multiplies the noise by only $\sqrt2$, raising $d'$ to 2.0 and the proportion correct to about 92 %.
:::
:::

## How much can a neuron tell?

A neuron's tuning curve tells us how its mean rate depends on the stimulus. But the useful question is the reverse: from the spikes, how accurately could the stimulus be estimated? That depends on how steeply the mean rate changes with the stimulus and how variable the response is around the mean.

::: proposition Fisher information of a Poisson neuron {#prop-fisher}
For a neuron with tuning curve $f(s)$, whose spike count in a window $T$ is Poisson with mean $Tf(s)$, the **Fisher information** about the stimulus $s$ is

$$
I_\mathrm{F}(s) = T\,\frac{f'(s)^2}{f(s)}.
$$ {#eq-fisher}

For $N$ neurons with independent noise, the informations add. By the **Cramér–Rao bound**, any unbiased estimator $\hat s$ of the stimulus has variance at least $1/I_\mathrm{F}(s)$; so the standard deviation of the best estimate is at least $1/\sqrt{I_\mathrm{F}}$.

Assumptions: Poisson counts with independent noise between neurons; an unbiased estimator. Correlated noise between neurons can reduce the information of a population substantially below the sum.
:::

::: proof
For a Poisson count $n$ with mean $\mu(s) = Tf(s)$, the log-likelihood is $\ln P(n\mid s) = n\ln\mu - \mu - \ln n!$. Its derivative with respect to $s$ is $(n/\mu - 1)\mu'$. The Fisher information is the expected square of this derivative: $\E[(n - \mu)^2]\,\mu'^2/\mu^2 = \mu\cdot\mu'^2/\mu^2 = \mu'^2/\mu$, using $\Var(n) = \mu$. With $\mu = Tf$ and $\mu' = Tf'$, this is $Tf'^2/f$. For independent neurons the log-likelihoods add, so their Fisher informations add.
:::

The result has a surprising consequence. For a bell-shaped tuning curve, the information is **zero at the peak**, where $f'(s) = 0$, and greatest on the flanks, where the rate changes fastest. A neuron is most useful for discriminating stimuli that lie not at its preferred value but to either side of it.

::: widget plot
f: rm*exp(-x^2/(2*s^2)); 0.2*rm*exp(-x^2/(2*s^2))*x^2/s^4*1000
x: -90, 90
y: 0, 60
sliders: rm=50:10:80:1; s=20:10:40:1
labels: f(s)\ \text{(spikes/s)}; I_\mathrm{F}\ \text{(×1000 deg⁻², T = 0.2 s)}
caption: A Gaussian tuning curve (first curve, spikes per second) against the stimulus value relative to the neuron's preferred value (horizontal axis, degrees), with peak rate $r_\mathrm{m}$ (rm) and width $\sigma$ (s) set by the sliders, and the Fisher information from [[#eq-fisher]] for a 0.2 s counting window (second curve, multiplied by 1000 so that it fits on the same axis). The information is zero at the preferred stimulus and peaks on the two flanks, at $\pm\sqrt2\,\sigma$. Narrow tuning puts more information near the preferred value but covers a smaller range; broad tuning spreads it out.
:::

::: example Orientation discrimination {#ex-fisher}
A V1 neuron has a Gaussian tuning curve for orientation with peak rate 50 spikes s⁻¹ and width $\sigma = 20°$, and Poisson variability. (a) Where is its Fisher information greatest, and what is its value there for a 0.2 s window? (b) What is the smallest standard deviation of an orientation estimate based on this one neuron? (c) With 100 such neurons, with independent noise and all positioned at their most informative point, what does the bound become? (d) Human observers can discriminate orientations differing by about 1°. Comment.
::: solution
(a) With $f = r_\mathrm{m}\mathrm{e}^{-u^2/2}$, $u = (s - s_0)/\sigma$, we have $f' = -fu/\sigma$ and $f'^2/f = fu^2/\sigma^2$, which is proportional to $u^2\mathrm{e}^{-u^2/2}$ and is greatest at $u^2 = 2$, that is $s - s_0 = \pm\sqrt2\,\sigma = \pm28.3°$. There $f = 50\,\mathrm{e}^{-1} = 18.4$ spikes s⁻¹ and $I_\mathrm{F} = 0.2\times18.4\times2/20^2 = 0.0184$ deg⁻².

(b) $1/\sqrt{0.0184} = 7.4°$.

(c) Information adds: $100\times0.0184 = 1.84$ deg⁻², giving $1/\sqrt{1.84} = 0.74°$.

(d) A hundred well-placed independent neurons could support discrimination of about 1°. Primary visual cortex has many more neurons than that responding to any one location, so the bound is not limiting in principle. In practice, noise correlations among neurons with similar tuning limit the gain from pooling (Ehud Zohary, Shadlen and Newsome, 1994), and downstream decoding is not perfect; much current research asks how close the brain comes to the information available in its populations.
:::
:::

### Information theory

Fisher information measures how precisely a continuous stimulus can be estimated. Claude Shannon's information theory (1948) provides a more general measure that applies to any stimuli and responses, discrete or continuous, and needs no assumption about how the stimulus will be decoded.

::: definition Entropy and mutual information {#def-information}
The **entropy** of a discrete random variable $X$ with probabilities $p_i$ is $H(X) = -\sum_ip_i\log_2p_i$ bits: the average uncertainty about $X$, or the average number of yes/no questions needed to determine it. The **mutual information** between a stimulus $S$ and a response $R$ is

$$
I(S;R) = H(R) - H(R\mid S),
$$ {#eq-mi}

the reduction in uncertainty about the response that comes from knowing the stimulus, equal by symmetry to the reduction in uncertainty about the stimulus from knowing the response. $H(R\mid S)$, the **noise entropy**, is the average entropy of the response for a fixed stimulus.
:::

::: example Information in a noisy detector {#ex-mi}
A stimulus is present on half the trials and absent on the other half. A neuron fires at least one spike in a short window on 90 % of trials with the stimulus and, spontaneously, on 20 % of trials without it. Treat the response as binary (spike or no spike). How much information, in bits per trial, does the response carry about the stimulus?
::: solution
The probability of a spike is $0.5\times0.9 + 0.5\times0.2 = 0.55$, so $H(R) = -0.55\log_20.55 - 0.45\log_20.45 = 0.993$ bits.

The noise entropy: with the stimulus, $H = -0.9\log_20.9 - 0.1\log_20.1 = 0.469$ bits; without it, $H = -0.2\log_20.2 - 0.8\log_20.8 = 0.722$ bits. The average is $H(R\mid S) = 0.596$ bits.

$I = 0.993 - 0.596 = 0.40$ bits per trial. A perfect detector would give 1 bit, the full entropy of the stimulus. The spontaneous firing (false alarms) and the misses together cost 60 % of the possible information.
:::
:::

## Beyond the rate: timing and populations

Rate coding is robust, but it is slow: estimating a rate needs many spikes or a long window, and behaviour is often faster than that. A fly can turn in response to a visual stimulus within about 30 ms, during which a motion-sensitive neuron may fire only a few spikes. Several kinds of evidence show that nervous systems also use spike timing and the joint activity of many neurons.

- **Phase locking.** Auditory nerve fibres fire at a particular phase of each cycle of a low-frequency sound, up to frequencies of a few kilohertz, which allows the microsecond comparisons of interaural timing described in [[neuroscience/sensory-systems]].
- **First-spike latency.** When a human fingertip touches an object, the relative timing of the first spikes in populations of tactile afferents conveys the direction of the force and the shape of the surface faster than rates could (Roland Johansson and Ingvars Birznieks, 2004).
- **Phase precession.** A rat's hippocampal place cell fires at progressively earlier phases of the ongoing theta rhythm (6–10 Hz) as the animal crosses its place field (John O'Keefe and Michael Recce, 1993), so that the phase of a spike conveys position within the field in addition to the information in the rate.
- **Sparse codes.** In the insect mushroom body, odours are represented by a small fraction of the Kenyon cells, each of which fires only a few spikes; in the mammalian olfactory cortex and in parts of the visual cortex, too, a stimulus activates a small, distinctive subset of neurons. Sparse codes reduce overlap between representations, which makes them easier to learn and to store.

In practice the question is less "rate or timing?" than "over what time scale is the signal read?" A downstream neuron with a membrane time constant of 10–20 ms integrates its inputs over about that window, so for it, the relevant code is the number of input spikes arriving in each such window from many neurons together: a population rate, sampled quickly.

### Decoding populations

The population vector of motor cortex ([[neuroscience/motor-systems#def-population-vector]]) is one way of reading a population. More generally, if each neuron's tuning curve and noise are known, the stimulus can be estimated by **maximum likelihood**, choosing the value of $s$ that makes the observed counts most probable. For independent Poisson neurons this estimator achieves the Cramér–Rao bound for large populations, and it can be computed by a simple network. Real populations have **correlated noise**: neurons with similar tuning tend to fluctuate together, so that averaging over them does not reduce noise as fast as $1/\sqrt N$. How much correlations limit information depends on their structure, and is an active research topic.

## Why codes look the way they do

In 1961 Horace Barlow proposed that sensory neurons are designed to encode the natural stimuli an animal meets as efficiently as possible, removing redundancy so that each spike carries as much information as possible: the **efficient coding hypothesis**. Its first quantitative test came from the blowfly *Calliphora*.

::: proposition Histogram equalisation {#prop-equalise}
A neuron that can produce responses in a bounded range, say from 0 to $R_\mathrm{max}$, with small noise of the same size everywhere in the range, transmits the most information about a stimulus $c$ with probability density $p(c)$ when its response is proportional to the cumulative distribution of the stimulus,

$$
R(c) = R_\mathrm{max}\int_{-\infty}^{c}p(c')\,\dd c',
$$ {#eq-equalise}

so that all response levels are used equally often. Assumptions: a single input–output function, bounded output, and noise that is small and independent of the response level.
:::

::: proof {collapsed}
For small, uniform noise, the information transmitted is maximised when the entropy of the output is maximised. A variable confined to a fixed interval has maximal entropy when it is uniformly distributed over that interval. If $R(c)$ is increasing, the response density is $p(c)/R'(c)$, which is constant (uniform) exactly when $R'(c) \propto p(c)$, that is, when $R$ is proportional to the cumulative distribution of $c$.
:::

Simon Laughlin (1981) measured the distribution of contrasts in the natural scenes a fly sees and the contrast–response function of the fly's large monopolar cells, the neurons that receive input from the photoreceptors. The response curve closely matched the cumulative distribution of natural contrasts, as [[#eq-equalise]] predicts: the cells devote their response range to the contrasts that occur most often.

::: widget plot
f: 0.5*(1 + erf(x/(sqrt(2)*s))); exp(-x^2/(2*s^2))
x: -1, 1
y: 0, 1.05
sliders: s=0.3:0.1:0.6:0.01
labels: \text{optimal response } R/R_\mathrm{max}; \text{stimulus distribution (scaled)}
caption: Histogram equalisation. The second curve is the distribution of stimulus contrasts (horizontal axis), assumed Gaussian with standard deviation $\sigma$ (slider) and scaled to a peak of 1; the first curve is the response function, as a fraction of maximum, that transmits the most information about it, the cumulative distribution of [[#eq-equalise]]. The response is steepest where stimuli are most common. Narrow the distribution and the optimal response function becomes steeper and narrower, which is what contrast adaptation in retinas does when the environment becomes less variable.
:::

::: example Using the response range {#ex-equalise}
Natural contrasts seen by an animal are approximately normally distributed with mean 0 and standard deviation 0.3. (a) What fraction of the optimal neuron's response range is used for contrasts between −0.3 and +0.3? (b) A different neuron has a linear response that saturates at contrasts of ±1. What fraction of its range is used by contrasts between −0.3 and +0.3? (c) Why is the first neuron better, and when would it be worse?
::: solution
(a) The optimal response is the cumulative normal, so the range used is $\Phi(1) - \Phi(-1) = 0.683$: 68 % of the response range is devoted to the 68 % of contrasts that lie within one standard deviation.

(b) A linear response from −1 to +1 maps −0.3 to +0.3 onto 30 % of the range, while 68 % of stimuli fall there. Most of the response range is reserved for rare high contrasts.

(c) With noise of fixed size, the first neuron distinguishes common stimuli more finely, which maximises information for the typical environment. It would be worse in an environment with a different contrast distribution, for example in fog, unless it adapted; retinal neurons do adjust their gain to the recent distribution of contrasts within seconds.
:::
:::

## Rhythms and sleep

Recordings from the surface of the brain show continuous electrical oscillations. The physiologist Richard Caton recorded electrical activity from the exposed brains of rabbits and monkeys in 1875, and the psychiatrist Hans Berger recorded the human **electroencephalogram** (EEG) through the scalp in 1929, describing the 8–12 Hz **alpha rhythm** that appears when a relaxed person closes their eyes.

The EEG, and the **local field potential** (LFP) recorded with an electrode inside the brain, arise mainly from synaptic currents rather than spikes. When many pyramidal neurons, whose long apical dendrites are aligned in parallel, receive synchronous synaptic input, their currents add up to a field that can be detected at a distance; spikes, being brief and asynchronous, mostly cancel. Rhythms are conventionally divided into frequency bands: delta (about 1–4 Hz), theta (4–8 Hz, prominent in the rodent hippocampus during exploration), alpha (8–12 Hz), beta (13–30 Hz) and gamma (about 30–100 Hz). Gamma rhythms depend on networks of fast-spiking, parvalbumin-expressing inhibitory interneurons: optogenetically driving these cells at gamma frequencies in mouse cortex generates gamma oscillations (Jessica Cardin, Christopher Moore, Li-Huei Tsai and colleagues, 2009). Whether rhythms play a computational role, for example in coordinating communication between areas, or are by-products of balanced excitation and inhibition, is debated; for theta and phase precession the evidence for a role is strongest.

### Sleep

In 1953 Eugene Aserinsky and Nathaniel Kleitman noticed that sleeping people go through periods of rapid eye movements, during which the EEG resembles that of wakefulness and, when woken, they usually report dreaming. Sleep in mammals and birds alternates between **REM sleep** (rapid eye movement, also called paradoxical sleep: a waking-like EEG and, as Michel Jouvet showed in cats, loss of muscle tone) and **non-REM sleep**, whose deepest stage is dominated by large, slow (about 1 Hz and below) waves in which cortical neurons alternate between active "up" and silent "down" states.

Sleep, defined behaviourally as a reversible state of reduced responsiveness that is regulated homeostatically (lost sleep is partly made up), is found widely in animals. *Drosophila* flies show it (Joan Hendricks, Paul Shaw and colleagues, both 2000), and so do zebrafish, nematodes and jellyfish. Dolphins and some birds sleep with one cerebral hemisphere at a time, and frigatebirds sleep in brief bouts while flying (Niels Rattenborg and colleagues, 2016). Alexander Borbély's **two-process model** (1982) describes the timing of sleep as the interaction of a homeostatic process, a sleep pressure that builds during waking and dissipates during sleep, with a circadian process set by the biological clock.

Why animals sleep is still not fully understood. Proposed functions include the consolidation of memories, supported by the replay of hippocampal activity during non-REM sleep ([[neuroscience/plasticity-learning]]) and by experiments in which disrupting sleep-associated ripples impairs learning in rats; the renormalisation of synaptic strength after a day of potentiation (the synaptic homeostasis hypothesis of Giulio Tononi and Chiara Cirelli); and the clearance of metabolites from the brain, which was reported to increase during sleep in mice (Lulu Xie, Maiken Nedergaard and colleagues, 2013) but whose mechanism and size are disputed. These are not mutually exclusive, and the answer may differ between animals.

## Recording, imaging and manipulating the brain

Every statement in this course about what neurons do rests on a method of measurement. Each method sees some aspects of neural activity and is blind to others.

| method | what it measures | spatial scale | time scale | used in |
|---|---|---|---|---|
| patch clamp, sharp electrode | membrane potential and currents of one cell | one cell | microseconds | slices, cultures, small animals in vivo |
| extracellular electrodes, tetrodes, silicon probes | spikes of single neurons near the tip, and the LFP | ≈ 50–100 µm per site; hundreds of neurons per probe | sub-millisecond | animals; some human patients |
| calcium imaging (one- and two-photon) | Ca²⁺ in many identified cells, a proxy for spiking | single cells to millimetres | tens to hundreds of milliseconds | animals, often genetically targeted |
| voltage imaging | membrane potential optically | single cells to millimetres | about a millisecond | animals, developing |
| EEG and MEG | summed synaptic currents | centimetres | milliseconds | humans |
| fMRI (BOLD) | blood oxygenation, an indirect measure of neural activity | millimetres | seconds | humans and animals |

**Extracellular recording** detects the small voltage changes (tens to hundreds of microvolts) near a neuron as it fires. Spikes from several neurons recorded on the same electrode are separated by their shapes (**spike sorting**), which is much more reliable with closely spaced recording sites such as tetrodes. Silicon probes such as Neuropixels, introduced in 2017 with 960 recording sites along a 10 mm shank (384 of them recorded at once), allow hundreds of neurons in several brain regions to be recorded simultaneously in behaving mice.

**Calcium imaging** uses fluorescent indicators whose brightness rises when they bind Ca²⁺, which enters neurons during spikes. Genetically encoded indicators, beginning with GCaMP (Junichi Nakai, Masamichi Ohkura and Keiji Imoto, 2001) and much improved since (GCaMP6, 2013, and later generations), can be expressed in chosen cell types for months. **Two-photon microscopy** (Winfried Denk, James Strickler and Watt Webb, 1990) uses pulsed infrared light that excites fluorophores only at the focus, allowing cells hundreds of micrometres deep in the living brain to be imaged.

**Functional magnetic resonance imaging** relies on the fact that active brain regions receive more oxygenated blood than they consume, so deoxyhaemoglobin, which is paramagnetic, decreases locally. Seiji Ogawa and colleagues described this **BOLD** (blood-oxygen-level-dependent) contrast in rats in 1990. The haemodynamic response peaks about 5 s after a brief burst of neural activity and correlates better with the local field potential, which reflects synaptic input, than with spiking output (Nikos Logothetis and colleagues, 2001, in monkeys).

::: example Sampling and indicators {#ex-sampling}
(a) An extracellular spike lasts about 1 ms, and its shape, which is used to identify neurons, contains frequencies up to about 5 kHz. What sampling rate is needed? (b) A calcium indicator's fluorescence rises within about 50 ms after a spike and decays with a time constant of about 0.5 s; each spike raises the fluorescence by about 20 % ($\Delta F/F = 0.2$). If a neuron fires two spikes 100 ms apart, approximately what peak $\Delta F/F$ results, assuming linear summation? (c) What does this imply for the ability of calcium imaging to resolve spike timing and rate?
::: solution
(a) By the Nyquist–Shannon sampling theorem, the sampling rate must be at least twice the highest frequency present: at least 10 kHz. In practice extracellular data are sampled at 20–30 kHz.

(b) After 100 ms the first transient has decayed to $0.2\,\mathrm{e}^{-0.1/0.5} = 0.2\times0.82 = 0.16$; adding the second gives about $0.36$.

(c) Because each transient lasts much longer than the interval between spikes, transients from spikes closer than a few hundred milliseconds merge, so the precise timing of individual spikes is lost and the signal is closer to a smoothed rate. Single isolated spikes can be detected with good indicators, but at high rates the indicator saturates and the relation to spike count becomes nonlinear. Deconvolution algorithms recover approximate spike rates. Calcium imaging trades temporal precision for the ability to record thousands of identified cells at once.
:::
:::

::: warning "A brain area lights up" and "correlation shows function"
An fMRI image does not show neurons firing; it shows a statistical map of a blood-flow signal that is related to neural activity indirectly, slowly, and with spatial blurring, and that has been thresholded so that some regions appear coloured and others not. A region that does not "light up" may still be active, and one that does may be receiving input rather than producing output. More generally, any recording, however precise, shows **correlation** between activity and a stimulus or behaviour, not that the activity causes the behaviour. Causal conclusions require perturbation: lesions, inactivation, or stimulation of the neurons in question, with appropriate controls.
:::

### Manipulating activity

**Optogenetics** provides that perturbation with cell-type specificity and millisecond precision. Light-gated microbial proteins are expressed genetically in chosen neurons: **channelrhodopsin-2**, a light-gated cation channel from the green alga *Chlamydomonas reinhardtii*, depolarises neurons and makes them fire in response to blue light (Edward Boyden, Karl Deisseroth and colleagues, 2005); light-driven chloride pumps (halorhodopsin) and proton pumps, and light-gated anion channels, silence them. **Chemogenetic** tools, engineered receptors activated only by otherwise inert drugs, provide slower, longer-lasting control without implanted light sources. Combined with recording and behaviour, these tools have made it possible to test whether particular cells are necessary or sufficient for a behaviour, as in the engram experiments of [[neuroscience/plasticity-learning]].

### Connectomics

A different approach maps the structure of circuits completely. Serial-section electron microscopy, automated and combined with machine-learning segmentation, has produced complete or nearly complete connectomes of *C. elegans* (1986, and later refinements for both sexes), the larval and adult *Drosophila* brain (the adult whole-brain connectome was published in 2024), and, as of 2026, of cubic-millimetre volumes of mouse visual cortex (the MICrONS project, 2025) and human temporal cortex (2024). A wiring diagram does not by itself reveal what a circuit computes, since synaptic strengths, neuromodulation and intrinsic properties all matter, but it constrains models powerfully and has already revealed unexpected circuit motifs.

::: quiz
A researcher finds that neurons in a region of mouse cortex fire strongly whenever the mouse licks for a reward. Which experiment would most directly test whether these neurons are necessary for licking?
- [ ] Recording more neurons in the same region with a Neuropixels probe.
- [ ] Measuring the BOLD signal in the region during licking.
- [x] Silencing the neurons optogenetically during the task and measuring whether licking is impaired, with light-only and opsin-free controls.
- [ ] Showing that the neurons' firing precedes the licks by 100 ms.
::: solution
Only a perturbation tests necessity. Recording more neurons or measuring BOLD adds correlational evidence; even the timing of firing before licks, though suggestive, could reflect a common cause (such as a decision made elsewhere). Optogenetic silencing during the task tests whether the behaviour depends on these neurons; the controls exclude effects of light and heating. Even then, a deficit could arise from disrupting downstream regions indirectly, so silencing is usually combined with other evidence.
:::
:::

::: application Neural interfaces and diagnosis
Recording and decoding methods have medical uses. EEG is a standard tool for diagnosing epilepsy and assessing sleep, and decoders of motor cortex activity drive experimental brain–computer interfaces for people with paralysis ([[neuroscience/motor-systems]]). Cochlear implants, which stimulate the auditory nerve through electrodes along the cochlea, use the place code of [[neuroscience/sensory-systems]] to restore hearing. Clinical aspects belong to [Medicine Atlas: epilepsy](/learn/medicine/lesson.php?c=nervous-system&l=epilepsy) and the other chapters of the nervous-system course in Medicine Atlas.
:::

::: history
Adrian and Zotterman described rate coding in 1926, and Adrian shared the Nobel Prize with Sherrington in 1932. Caton recorded brain potentials in animals in 1875 and Berger the human EEG in 1929. Shannon founded information theory in 1948; Barlow proposed efficient coding in 1961; Laughlin tested it in the fly in 1981. Aserinsky and Kleitman discovered REM sleep in 1953, and sleep in *Drosophila* was described in 2000. Hubel's tungsten microelectrode (1957) made single-unit recording in awake animals practical; tetrodes followed in the 1980s–1990s and Neuropixels probes in 2017. Two-photon microscopy (1990), genetically encoded calcium indicators (from 2001), BOLD fMRI (1990) and optogenetics (2005) transformed the measurement and control of neural activity, and whole-brain connectomes of the fly (2024) and millimetre-scale volumes of mammalian cortex (2024–2025) are now available.
:::

## Where this leads

This chapter closes the course. The next step is [[behaviour]], which asks how the neural mechanisms described here produce the behaviour of whole animals in their natural environments: how animals find food and mates, avoid predators, communicate, cooperate and navigate. The quantitative tools used here, probability, estimation and information, are developed further in [[biostatistics]] and in [[systems-biology]].

::: summary
- Spike trains are described statistically: the Poisson model gives Poisson counts (Fano factor 1) and exponential interspike intervals (CV 1); refractoriness makes trains more regular. Cortical firing is irregular, near Poisson.
- Rate codes (Adrian) are robust but slow; the precision of a rate estimate improves with window length and rate as $\sqrt{rT}$.
- Fisher information of a Poisson neuron, $I_\mathrm{F} = Tf'^2/f$, bounds the precision of stimulus estimates (Cramér–Rao); it is zero at the peak of a tuning curve and largest on the flanks; it adds across independent neurons, but correlated noise limits pooling.
- Mutual information, $I = H(R) - H(R\mid S)$, measures what responses tell about stimuli without assuming a decoder.
- Timing codes (phase locking, first-spike latency, phase precession), sparse codes and population codes supplement rates.
- Efficient coding predicts that response functions match the cumulative distribution of natural stimuli (Laughlin's fly).
- EEG and LFP reflect synchronous synaptic currents; rhythms span delta to gamma; sleep (REM and non-REM) is widespread among animals, regulated by homeostatic and circadian processes, and its functions are debated.
- Methods differ in what they see: electrodes (spikes, sub-millisecond), calcium imaging (many identified cells, slow), fMRI (blood flow, seconds, millimetres), EEG (summed currents). Causal claims need perturbation (optogenetics, chemogenetics); connectomes constrain circuit models.
:::

## Exercises

::: exercise A spike count {level=1 check="0.0067"}
A neuron fires as a Poisson process at 10 spikes s⁻¹. What is the probability (to two significant figures) that it fires no spikes in a 0.5 s window?
::: solution
$P(0) = \mathrm{e}^{-10\times0.5} = \mathrm{e}^{-5} = 0.0067$.
:::
:::

::: exercise Interspike intervals {level=1 check="0.095"}
For a Poisson neuron firing at 20 spikes s⁻¹, what fraction of interspike intervals are shorter than 5 ms (three decimal places)? Why might a real neuron show fewer?
::: solution
$1 - \mathrm{e}^{-20\times0.005} = 1 - \mathrm{e}^{-0.1} = 0.095$. A real neuron's refractory period of a few milliseconds suppresses very short intervals, so the observed fraction is lower.
:::
:::

::: exercise Matching method to question {level=1}
Which method would you choose for each, and why? (a) Whether a particular type of interneuron is needed for a mouse to discriminate two odours. (b) The timing of spikes in the auditory brainstem relative to a sound's phase. (c) Which regions of a human brain are more active during reading than during rest. (d) The activity of 500 identified neurons in a zebrafish larva's tectum during prey capture.
::: solution
(a) Optogenetic or chemogenetic silencing of that interneuron type, during the task, with controls: a causal question needs perturbation. (b) Extracellular single-unit recording with sub-millisecond resolution; calcium imaging is far too slow. (c) fMRI (or, for timing, EEG/MEG), the non-invasive methods suitable for healthy volunteers, accepting their indirectness. (d) Two-photon or light-sheet calcium imaging with a genetically encoded indicator; the larval zebrafish is small and transparent, so many identified cells can be imaged at once.
:::
:::

::: exercise Fano factors from data {level=2}
Over 50 repeats of a stimulus, a neuron's spike counts in a 1 s window have a mean of 12 and a variance of 18; another neuron's counts have a mean of 40 and a variance of 8. (a) Compute each Fano factor. (b) What might explain each value? (c) Which neuron would allow better discrimination of a small change in the stimulus that changed both means by 10 %?
::: solution
(a) $18/12 = 1.5$ and $8/40 = 0.2$. (b) The first neuron is more variable than Poisson, which is common in cortex and can result from fluctuations in excitability or attention shared across trials, or from bursting. The second is much more regular than Poisson, as expected for a neuron firing at a high rate with a strong refractory period or a regular pacemaker, as in some auditory and cerebellar neurons. (c) For the first, the mean changes by 1.2 against a standard deviation of $\sqrt{18} = 4.2$: $d' \approx 0.28$. For the second, the change is 4 against $\sqrt8 = 2.8$: $d' \approx 1.4$. The second is far better, because it fires more and more regularly.
:::
:::

::: exercise Mutual information of a perfect and a useless neuron {level=2}
Using the setting of [[#ex-mi]] (stimulus present on half the trials), compute the mutual information (bits per trial) if (a) the neuron fires on every stimulus trial and never otherwise; (b) it fires on 50 % of trials regardless of the stimulus; (c) it fires on every stimulus trial and on every non-stimulus trial. Comment.
::: solution
(a) The response determines the stimulus: $H(R) = 1$ bit, $H(R\mid S) = 0$, $I = 1$ bit. (b) $H(R) = 1$ bit, $H(R\mid S) = 1$ bit, $I = 0$: a variable response that is unrelated to the stimulus carries no information. (c) $H(R) = 0$ (always fires), $I = 0$: a response that never varies carries none either. Information requires that the response vary and that its variation depend on the stimulus; high firing rates or high variability alone mean nothing.
:::
:::

::: exercise A haemodynamic delay {level=2}
In an fMRI experiment, a visual stimulus is shown for 1 s every 12 s, and the BOLD signal in visual cortex peaks 5 s after each stimulus onset. A second experiment shows a stimulus at 0 s and another at 2 s. (a) Can the two responses be separated in time from the raw BOLD signal? (b) What assumption allows them to be separated statistically? (c) Why is fMRI poorly suited to measuring which of two regions activates 50 ms earlier?
::: solution
(a) Not directly: each response lasts many seconds, so responses 2 s apart overlap heavily. (b) If the BOLD response is approximately linear and time-invariant (the response to two events is the sum of shifted single-event responses), the overlapping signal can be deconvolved with a known or estimated haemodynamic response function, a standard approach in event-related fMRI. The assumption holds roughly for events more than a second or two apart but breaks down for rapid sequences. (c) The haemodynamic response varies between regions and between people by more than a second in its latency, for vascular reasons unrelated to neural timing, so a 50 ms difference in neural onset is invisible. EEG, MEG or intracranial recordings are needed.
:::
:::

::: exercise The cost of a spike and sparse coding {level=3}
Suppose each spike in a cortical neuron costs about $10^8$–$10^9$ ATP molecules (pumping back the ions of the spike and of the synaptic currents it causes) and a cortex has $1.6\times10^{10}$ neurons. (a) If the average firing rate were 10 spikes s⁻¹, how much ATP per second would be needed for spiking, taking $5\times10^8$ ATP per spike? (b) The free energy of ATP hydrolysis in cells is about $8\times10^{-20}$ J per molecule. What power is that? (c) The human cortex uses roughly 5 W in total, a figure with considerable uncertainty. What do your numbers suggest about average firing rates and sparse coding?
::: solution
(a) $1.6\times10^{10}\times10\times5\times10^8 = 8\times10^{19}$ ATP s⁻¹.

(b) $8\times10^{19}\times8\times10^{-20} = 6.4$ W.

(c) That alone would exceed the cortex's entire budget, before counting resting potentials and other processes. The average firing rate must therefore be lower, of order 1 spike s⁻¹ or less, as estimated by Peter Lennie (2003) from similar reasoning: at any moment only a small fraction of cortical neurons can be firing strongly. Energy is thus a hard constraint that favours sparse codes, in which information is carried by which few neurons fire. The exact figures depend on assumptions about ATP per spike, which vary with the efficiency of action potentials and the number of synapses per neuron, so the conclusion is about orders of magnitude rather than precise rates.
:::
:::

::: exercise Decoding from two neurons {level=3}
Two neurons respond to the direction $\theta$ of a moving stimulus with mean rates $f_1(\theta) = 20 + 15\cos\theta$ and $f_2(\theta) = 20 + 15\sin\theta$ spikes s⁻¹, and Poisson variability. In a 0.5 s window they fire $n_1 = 17$ and $n_2 = 4$ spikes. (a) Write the log-likelihood of $\theta$. (b) By evaluating it at $\theta = 0°, 30°, 60°, \ldots, 330°$, find the most likely direction to the nearest 30°. (c) What does the shape of the likelihood tell you about the uncertainty?
::: hint
For Poisson counts, $\ln P(n_1, n_2\mid\theta) = \sum_i[n_i\ln(Tf_i(\theta)) - Tf_i(\theta)] + \text{constant}$.
:::
::: solution
(a) With $T = 0.5$ s, $\mu_i(\theta) = 0.5f_i(\theta)$ and $L(\theta) = 17\ln\mu_1 - \mu_1 + 4\ln\mu_2 - \mu_2$, up to a constant.

(b) Evaluating ($\mu_1 = 10 + 7.5\cos\theta$, $\mu_2 = 10 + 7.5\sin\theta$): at 0°, $\mu = (17.5, 10)$, $L = 17\ln17.5 - 17.5 + 4\ln10 - 10 = 48.66 - 17.5 + 9.21 - 10 = 30.37$. At 330°, $\mu = (16.50, 6.25)$, $L = 47.66 - 16.50 + 7.33 - 6.25 = 32.24$. At 300°, $\mu = (13.75, 3.50)$, $L = 44.56 - 13.75 + 5.01 - 3.50 = 32.32$. At 270°, $\mu = (10, 2.5)$, $L = 39.14 - 10 + 3.67 - 2.5 = 30.31$. Values at other angles are lower (for example 30.3 or less at 0° and 270°, and much lower in the upper half-plane, where $\mu_2$ is large). The maximum among the grid points is at 300°, with 330° nearly as likely; a finer search puts the maximum-likelihood estimate at about 314°.

(c) The likelihood is broad: the values at 300° and 330° differ by less than 0.1 in log-likelihood, a likelihood ratio of about 1.1, so the data hardly distinguish them; directions within about ±30–40° of the maximum remain plausible. Two neurons and half a second of counting give only a coarse estimate; precision improves with more neurons and longer windows, in line with [[#prop-fisher]].
:::
:::
