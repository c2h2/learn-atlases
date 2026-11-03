For nearly two centuries the Hudson's Bay Company bought furs from trappers across northern Canada, and kept careful records of how many pelts of each species it received each year. When Charles Elton and Mary Nicholson analysed the lynx returns in 1942, they found a cycle of astonishing regularity: lynx numbers rose and crashed with a period of about ten years, across thousands of kilometres of forest, with the abundance of their main prey, the snowshoe hare, rising and falling a little ahead of them. Why should two populations oscillate together, and why with that period?

The question is about **consumers**: organisms that feed on other living organisms. This chapter covers the main kinds — predators, herbivores, parasitoids and parasites — and the dynamics they produce. We begin with the Lotka–Volterra predator–prey model and its cycles, add the realistic feature that a predator's feeding rate saturates (the **functional response**), and find a model in which cycles arise from instability and in which enriching the prey's environment can destroy the system. We look at what laboratory and field experiments, including the long-running work on the snowshoe hare, have shown about real cycles. We then treat herbivory, and finally parasites and pathogens, introducing the basic reproduction number $R_0$ and the SIR model of an epidemic. The single-species models from [[ecology/population-growth]] are the starting point, and the phase-plane methods were used for competition in [[ecology/competition]]. The evolutionary arms races that predators and parasites drive are treated in [[evolution/coevolution]].

## Kinds of consumers

::: definition Predators, grazers, parasitoids and parasites {#def-consumers}
A **consumer** obtains its energy and nutrients by eating other living organisms (or parts of them). Four broad kinds are distinguished by how many victims an individual attacks during its life and whether the victims die.

- A **true predator** kills its prey, more or less immediately after attacking it, and kills many prey in its lifetime: a lynx, a spider, a seed-eating rodent.
- A **grazer** (including most herbivores) attacks many victims in its lifetime but takes only part of each, rarely killing it: a sheep, a caterpillar on a tree, a mosquito taking blood.
- A **parasitoid** — mostly small wasps and flies — lays its eggs in or on a single host, usually an insect, whose body the larvae then consume, killing it.
- A **parasite** takes its resources from one or a few hosts, usually living in intimate association with them, and harms but does not necessarily kill them. **Microparasites** (viruses, bacteria, protists) multiply within the host and are usually counted by the number of hosts infected; **macroparasites** (worms, lice, ticks) grow in the host but reproduce by releasing infective stages, and are counted per host.
:::

These categories blur at the edges — a mosquito is a grazer on its host but a vector for parasites, and many herbivorous insects behave like parasites of a single plant — but they have different dynamics, and the models below are designed for one category at a time.

## The Lotka–Volterra predator–prey model

The simplest model, proposed by Alfred Lotka (1925) and Vito Volterra (1926), describes a prey population $N$ and a predator population $P$. Volterra was motivated by a puzzle brought to him by his future son-in-law, the marine biologist Umberto D'Ancona: during the First World War, when fishing in the Adriatic was reduced, the proportion of predatory fish in the catches landed at Italian ports had increased.

::: proposition The Lotka–Volterra predator–prey model {#prop-lvpp}
Let prey grow exponentially at rate $r$ in the absence of predators, and be killed at a rate proportional to encounters with predators, $aNP$, where $a$ is the **attack rate**. Let each prey killed add $b$ new predators (the conversion efficiency), and predators die at a constant per-capita rate $m$. Then

$$
\frac{dN}{dt} = rN - aNP, \qquad \frac{dP}{dt} = baNP - mP .
$$ {#eq-lvpp}

The interior equilibrium is

$$
N^* = \frac{m}{ba}, \qquad P^* = \frac{r}{a},
$$ {#eq-lvpp-eq}

and every other solution with $N, P > 0$ is a closed cycle around it, on which the quantity

$$
V(N, P) = baN - m\ln N + aP - r\ln P
$$ {#eq-lvpp-v}

is constant. Small cycles have period approximately $2\pi/\sqrt{rm}$, and the predator peak lags the prey peak by a quarter of a cycle. Assumptions: no density dependence in either species other than through predation, a linear (type I) functional response, no age structure or time lags, and a closed, well-mixed population.
:::

::: proof
The equilibrium follows from setting each equation to zero with $N, P > 0$: $r = aP$ and $baN = m$. To show that $V$ is constant along solutions, differentiate:

$$
\frac{dV}{dt} = \left(ba - \frac{m}{N}\right)\frac{dN}{dt} + \left(a - \frac{r}{P}\right)\frac{dP}{dt}
= \frac{baN - m}{N}\,N(r - aP) + \frac{aP - r}{P}\,P(baN - m) = 0 .
$$

$V$ has a single minimum at $(N^*, P^*)$ and increases in every direction away from it, so its level curves are closed loops around the equilibrium, and solutions travel round them. For small oscillations, linearising at the equilibrium gives the Jacobian $\begin{pmatrix} 0 & -aN^* \\ baP^* & 0\end{pmatrix}$, whose eigenvalues are $\pm i\sqrt{ba^2N^*P^*} = \pm i\sqrt{rm}$: pure oscillation with angular frequency $\sqrt{rm}$, hence period $2\pi/\sqrt{rm}$.
:::

The model's predictions are surprising in two ways. First, the prey equilibrium $N^*$ is set entirely by the *predator's* parameters, and the predator equilibrium $P^*$ by the prey's growth rate. Enriching the prey's environment (raising $r$) produces more predators, not more prey. Second — Volterra's answer to D'Ancona — any factor that kills prey and predators in proportion to their numbers, like indiscriminate fishing, lowers $r$ and raises $m$, and so shifts the average numbers *towards prey* ($N^*$ rises and $P^*$ falls). Reducing fishing has the opposite effect, which is what the wartime catches showed. The same principle explains why broad-spectrum insecticides can make a pest problem worse: by killing the pest's natural enemies as well as the pest, they shift the balance in the pest's favour.

::: widget phaseplane
f: r*x - a*x*y
g: b*a*x*y - m*y
x: 0, 600
y: 0, 250
sliders: r=1:0.2:2:0.05; a=0.01:0.005:0.02:0.001; b=0.2:0.05:0.4:0.01; m=0.4:0.1:1:0.02
points: 300, 100; 400, 100; 250, 60
caption: The Lotka–Volterra predator–prey model [[#eq-lvpp]] with prey $N$ horizontal and predators $P$ vertical. With the default values the equilibrium is $N^* = m/(ba) = 200$, $P^* = r/a = 100$, where the nullclines cross. Each orbit is a closed loop traversed anticlockwise: prey increase, then predators, then prey decline, then predators decline. Notice that the size of a loop depends only on where it starts — a sign that the cycles are neutral rather than self-correcting. Raise $r$ and the equilibrium moves up, not right.
:::

::: example Equilibria and period of a predator–prey cycle {#ex-lvpp}
A prey population has $r = 1.0$ per year; predators have attack rate $a = 0.01$ per predator per year, conversion efficiency $b = 0.2$ and death rate $m = 0.4$ per year. Find the equilibrium and the approximate period of small oscillations. If a disease raises the predators' death rate to 0.6 per year, how do the equilibria change?
::: solution
From [[#eq-lvpp-eq]], $N^* = 0.4/(0.2\times0.01) = 200$ prey and $P^* = 1.0/0.01 = 100$ predators (per unit area). The period of small cycles is $2\pi/\sqrt{rm} = 2\pi/\sqrt{0.4} = 9.9$ years — close to the period of the lynx–hare cycle, though such agreement on its own proves nothing.

With $m = 0.6$, $N^* = 0.6/0.002 = 300$, while $P^*$ stays at 100. The disease does not reduce the average number of predators, but it allows more prey.
:::
:::

### What is wrong with the model

The neutral cycles of [[#prop-lvpp]] are a mathematical curiosity rather than a realistic prediction. Because every orbit is closed, a disturbance shifts the system permanently onto a different cycle; there is nothing that returns it to a characteristic amplitude. A model with this property is called **structurally unstable**: almost any change to its form, however small, destroys the neutral cycles. If the prey are made self-limiting (logistic growth), the cycles become damped spirals into a stable equilibrium. Other changes produce growing oscillations. To make predictions we need more realistic ingredients, and the most important is how a predator's rate of feeding depends on prey density.

## Functional and numerical responses

::: definition Functional and numerical responses {#def-responses}
The **functional response** of a predator is the relationship between the number of prey eaten per predator per unit time and the density of prey. The **numerical response** is the change in the number of predators (through reproduction, survival or immigration) in response to prey density. C. S. Holling (1959) distinguished three types of functional response:

- **Type I:** the feeding rate rises linearly with prey density (up to a ceiling), as in the Lotka–Volterra model — typical of filter feeders.
- **Type II:** the feeding rate rises at a decelerating rate and levels off, because each prey caught takes time to handle — the commonest type.
- **Type III:** the feeding rate rises slowly at low prey density, accelerates, then levels off: a sigmoid curve, arising when predators switch to other prey or search less effectively when a prey is scarce.
:::

Holling derived the type II curve with an experiment that has become famous: a blindfolded assistant tapped with a finger to find sandpaper discs scattered on a table, picking each one up as it was found. Because each disc took time to pick up, the number found per minute levelled off as the discs became denser.

::: proposition Holling's disc equation {#prop-holling}
Suppose a predator searches at a rate that would find $aN$ prey per unit of searching time when prey density is $N$, and spends a **handling time** $h$ on each prey caught (pursuing, subduing, eating and digesting it), during which it cannot search. Then the number of prey eaten per predator per unit time is

$$
f(N) = \frac{aN}{1 + ahN} .
$$ {#eq-holling}

At low density $f(N) \approx aN$ (type I); as $N \to \infty$, $f(N) \to 1/h$; and half the maximum rate is reached at $N = 1/(ah)$.
:::

::: proof
Over a total time $T$, let the predator eat $E$ prey. It spends $hE$ of the time handling and $T - hE$ searching, during which it finds $aN(T - hE)$ prey. Setting $E = aN(T - hE)$ and solving: $E(1 + ahN) = aNT$, so $E/T = aN/(1 + ahN)$. Setting $f(N) = 1/(2h)$ gives $2ahN = 1 + ahN$, i.e. $N = 1/(ah)$.
:::

::: example A type II functional response {#ex-holling}
A ladybird searches an area of 0.2 m² per hour when looking for aphids ($a = 0.2$ m² h⁻¹) and takes 0.5 h to handle each aphid. How many aphids does it eat per hour at densities of 10 and 50 aphids per m², and what is its maximum feeding rate?
::: solution
From [[#eq-holling]], $ah = 0.2\times0.5 = 0.1$ m². At $N = 10$: $f = 0.2\times10/(1 + 0.1\times10) = 2/2 = 1$ aphid per hour. At $N = 50$: $f = 10/(1 + 5) = 1.67$ per hour. The maximum, set by handling time, is $1/h = 2$ per hour; half of it is reached at $N = 1/(ah) = 10$ aphids per m². A fivefold increase in prey density raised consumption by only two-thirds: the predator is saturated. The proportion of the prey population eaten per predator, $f(N)/N$, *falls* from 0.10 to 0.033 per hour — at high density the prey are, per capita, safer.
:::
:::

::: widget plot
f: a*x; a*x/(1 + a*h*x); a*x^2/(1 + a*h*x^2)
x: 0, 60
y: 0, 2.5
sliders: a=0.2:0.05:0.5:0.01; h=0.5:0.2:1.5:0.05
labels: \text{type I}; \text{type II}; \text{type III}
caption: Prey eaten per predator per hour against prey density (prey per m²) for the three functional responses: type I, $aN$; type II, Holling's $aN/(1+ahN)$; and a type III form, $aN^2/(1+ahN^2)$. Both saturating curves level off towards $1/h$ (2 prey per hour with the default $h = 0.5$ h); lengthen the handling time and watch the ceiling fall. Notice that type III is flat at low density, so a scarce prey is hardly eaten — a potential refuge that can stabilise predator–prey dynamics.
:::

A type II response is destabilising. Because the per-capita risk to prey, $f(N)/N$, falls as prey increase, a growing prey population escapes control. A type III response is stabilising at low prey density, because the per-capita risk *rises* with prey density there; this can protect a rare prey from extinction and, by switching, help maintain the diversity of prey species.

## Predator–prey models with saturation

Combining logistic prey growth with a type II functional response gives the model of Michael Rosenzweig and Robert MacArthur (1963), the standard starting point for modern predator–prey theory.

::: proposition The Rosenzweig–MacArthur model and the paradox of enrichment {#prop-rm}
Let prey grow logistically and predators feed with a type II functional response:

$$
\frac{dN}{dt} = rN\left(1 - \frac{N}{K}\right) - \frac{aNP}{1 + ahN}, \qquad
\frac{dP}{dt} = \frac{baNP}{1 + ahN} - mP .
$$ {#eq-rm}

The predator's zero-growth isocline is the vertical line

$$
N^* = \frac{m}{a(b - mh)}
$$ {#eq-rm-nstar}

(which requires $b > mh$, so that predators can grow at all), and the prey's isocline is the hump-shaped curve $P = \frac{r}{a}\left(1 - \frac NK\right)(1 + ahN)$, with its peak at $N = \tfrac12\left(K - \tfrac{1}{ah}\right)$. If $N^* < K$, the interior equilibrium is **stable** if the predator isocline crosses the prey isocline to the right of the hump, and **unstable** — surrounded by a stable limit cycle — if it crosses to the left. Increasing $K$ moves the hump to the right and so can turn a stable equilibrium into a limit cycle of growing amplitude.
:::

::: proof
The predator equation is zero when $baN/(1 + ahN) = m$, i.e. $baN = m + mahN$, giving [[#eq-rm-nstar]]. The prey equation (with $N > 0$) is zero when $r(1 - N/K) = aP/(1 + ahN)$, giving the stated curve, a downward parabola in $N$ whose derivative $\frac{r}{a}\left[-\frac1K(1 + ahN) + ah\left(1 - \frac NK\right)\right]$ vanishes at $N = \frac12(K - 1/(ah))$. At the equilibrium, $\partial\dot P/\partial P = 0$ (the predator's per-capita growth is zero on its isocline, and does not depend on $P$), so the Jacobian has trace $\partial\dot N/\partial N$ and determinant $-(\partial\dot N/\partial P)(\partial\dot P/\partial N)$, which is positive because more predators reduce prey growth and more prey increase predator growth. Stability is therefore decided by the sign of $\partial\dot N/\partial N$. Writing $\dot N = NF(N, P)$ with $F = 0$ on the prey isocline, $\partial\dot N/\partial N = N\,\partial F/\partial N$; differentiating $F(N, P(N)) = 0$ along the isocline gives $dP/dN = -F_N/F_P$, and since $F_P < 0$, $F_N$ has the sign of the isocline's slope. The trace is negative (stable) on the descending side of the hump and positive (unstable) on the rising side. By the Poincaré–Bendixson theorem, trajectories around an unstable equilibrium in this bounded system approach a limit cycle.
:::

Rosenzweig called the consequence the **paradox of enrichment** (1971): adding nutrients to a system — raising the prey's carrying capacity — can destabilise it, producing large oscillations in which both populations periodically fall to very low numbers and risk extinction. Unlike the neutral cycles of Lotka–Volterra, a **limit cycle** has a characteristic amplitude and period to which the system returns after a disturbance, which makes it a far better candidate explanation for regular cycles in nature.

::: widget phaseplane
f: x*(1 - x/K) - x*y/(1 + x)
g: 0.5*x*y/(1 + x) - 0.2*y
x: 0, 4
y: 0, 2.5
sliders: K=2:1:4:0.05
points: 1.5, 0.5; 0.3, 1.5
caption: The Rosenzweig–MacArthur model [[#eq-rm]] in scaled units ($r = a = h = 1$, $b = 0.5$, $m = 0.2$), prey horizontal, predators vertical. The predator nullcline is the vertical line $N^* = 2/3$; the prey nullcline is the hump, peaking at $N = (K-1)/2$. With $K = 2$ the predator line crosses to the right of the hump and trajectories spiral in to a stable equilibrium. Raise $K$ above $7/3 \approx 2.33$: the crossing moves to the rising side of the hump, the equilibrium becomes unstable, and trajectories settle on a limit cycle that grows as $K$ increases — the paradox of enrichment.
:::

::: example Will enrichment destabilise this system? {#ex-rm}
In the scaled model of the figure above ($r = a = h = 1$, $b = 0.5$, $m = 0.2$), find $N^*$ and the largest $K$ for which the equilibrium is stable.
::: solution
From [[#eq-rm-nstar]], $N^* = 0.2/(1\times(0.5 - 0.2\times1)) = 0.2/0.3 = 0.667$. The hump of the prey isocline peaks at $N = \tfrac12(K - 1/(ah)) = (K - 1)/2$. Stability requires $N^*$ to the right of the peak: $0.667 > (K - 1)/2$, i.e. $K < 2.33$. At $K = 2$ the Jacobian has trace $-0.067$ (stable); at $K = 3$ the trace is $+0.089$ (unstable, with a limit cycle). Enriching the prey's environment by 50 % switches the system from a steady state to cycles.
:::
:::

How common is the paradox of enrichment in nature? Laboratory systems such as rotifers feeding on algae in chemostats have shown the predicted transitions from equilibrium to cycles as nutrient supply changes, and some enriched lakes show stronger plankton fluctuations; but many enriched natural systems do not destabilise, probably because of inedible prey, refuges, predator interference or other features absent from the simple model.

## Predator–prey dynamics in the laboratory and the field

### Refuges and space

Gause attempted in the 1930s to produce predator–prey cycles with the ciliates *Didinium nasutum* (predator) and *Paramecium caudatum* (prey). In a simple culture *Didinium* ate every *Paramecium* and then starved: both went extinct. When sediment provided a refuge in which some prey could hide, the predators died out and the prey recovered. Only when he added a few individuals of each species at intervals, mimicking immigration, did he obtain repeated oscillations.

Carl Huffaker (1958) made this into an experiment on space. He used a herbivorous mite, *Eotetranychus sexmaculatus*, feeding on oranges, and a predatory mite, *Typhlodromus occidentalis*, in arrays of oranges and rubber balls. With food oranges close together, the predator found and exterminated the prey quickly. When he partly covered oranges with wax, made dispersal for the predator difficult with barriers of petroleum jelly, and provided wooden posts from which the prey (but not the predator) could launch themselves on silk threads, the system persisted through several oscillations: prey colonised oranges ahead of the predators, which found them, exterminated them locally and moved on. Persistence depended on the system being a **metapopulation** of local patches with asynchronous dynamics, a theme that returns in conservation biology ([[conservation-biology/fragmentation]]).

### The snowshoe hare cycle

The ten-year cycle of snowshoe hares (*Lepus americanus*) and Canada lynx (*Lynx canadensis*) is the textbook example of a predator–prey cycle, but which drives which? Hares might cycle because of their food — they overbrowse the shrubs in winter at high density — or because of predators, which include not only lynx but coyotes, owls and goshawks. Charles Krebs and colleagues tested this at Kluane Lake in the Yukon in 1986–1994 with large fenced and unfenced blocks of forest, each of about a square kilometre, in which mammalian predators were excluded, food was added, or both, against controls. Excluding predators and adding food each raised hare density, and the combination raised it far more than either alone. Their conclusion (1995) was that the cycle results from an interaction of food and predation, with predation the dominant direct cause of hare mortality; later work showed that even the *risk* of predation, through stress hormones in mothers, depresses hare reproduction during the decline. The lynx, in turn, follows the hare. The cycle is thus a predator–prey interaction embedded in a three-level food chain.

::: warning "Predators control their prey" — and "prey cycles must be caused by predators"
Predators often have little effect on the numbers of their prey: when predators take mainly individuals that would have died anyway — the sick, the starving, or surplus young without territories — predation is **compensatory**, and removing the predators changes little. And cycles can be caused by other mechanisms: by food (a plant–herbivore interaction), by parasites, by delayed density dependence within one species ([[ecology/population-growth]]), or by maternal effects. Whether predators regulate a particular prey population is an empirical question to be answered by removal or exclusion experiments, as at Kluane.
:::

## Herbivory

Herbivores eat plants, and plants differ from animal prey in ways that change the dynamics. A plant is rarely killed by a grazer; it loses part of its tissues and can often **compensate** by regrowing from meristems and stored reserves, so the effect of a given amount of herbivory on plant fitness can be anything from severe to negligible. Plants are also chemically and physically defended — by tough cell walls, low nitrogen content, spines and hairs, and secondary compounds such as alkaloids, tannins and cyanogenic glycosides — and many defences are **induced**, produced or increased only after an attack.

Most herbivores therefore face food that is abundant but of poor quality. This observation underlies the argument of Nelson Hairston, Frederick Smith and Lawrence Slobodkin (1960) that "the world is green" because herbivores are kept in check by their predators rather than by their food; the counter-argument is that much of the green world is inedible, and the balance of evidence differs between ecosystems, as discussed in [[ecology/communities]].

::: application Biological control
The use of natural enemies to control pests rests directly on predator–prey theory. A celebrated early success was the control of the cottony cushion scale (*Icerya purchasi*), an Australian insect that was devastating the citrus orchards of California, by the vedalia beetle (*Novius cardinalis*, long known as *Rodolia cardinalis*), imported from Australia in 1888–1889; within a couple of years the scale was reduced to low numbers, where it has largely remained. Good control agents tend to be specialists with high searching efficiency and a rapid numerical response, capable of holding the pest at a low, stable density — which theory suggests requires features such as aggregation of attacks or spatial structure, as in Huffaker's mites. Biological control also carries risks: introduced generalist predators, such as the cane toad in Australia and the mongoose in Hawaii and the Caribbean, have harmed native species, and modern programmes test host specificity before release.
:::

## Parasites and pathogens

Parasites are the most numerous consumers on Earth; most species of free-living organism host several species of parasite. Their dynamics are described by models that follow hosts in different infection states rather than numbers of parasites.

### The basic reproduction number

::: definition Basic reproduction number {#def-r0}
For a microparasite, the **basic reproduction number** $R_0$ is the average number of new infections caused by one infected host introduced into a population in which all other hosts are susceptible. An infection can spread in a population only if $R_0 > 1$.
:::

$R_0$ is the epidemiological analogue of the net reproductive rate of [[ecology/population-growth#prop-r0]]: there it counted offspring per individual over its lifetime, here new infections per infection over its infectious period. Note that it is not a property of the pathogen alone: it depends on the host population — its density, its contact patterns and its immunity.

The classic model, formulated by William Kermack and Anderson McKendrick in 1927, divides a host population into **susceptible** ($S$), **infected and infectious** ($I$) and **recovered and immune** ($R$) classes.

::: proposition The SIR model {#prop-sir}
In a closed host population with no births or deaths during an epidemic, let $\beta$ be the transmission rate (per susceptible–infected pair per unit time, with $S$, $I$, $R$ as fractions of the population) and $\gamma$ the recovery rate, so that $1/\gamma$ is the mean infectious period. Then

$$
\frac{dS}{dt} = -\beta SI, \qquad \frac{dI}{dt} = \beta SI - \gamma I, \qquad \frac{dR}{dt} = \gamma I ,
$$ {#eq-sir}

and

$$
R_0 = \frac{\beta}{\gamma}.
$$ {#eq-sir-r0}

An epidemic grows only while $R_0 S > 1$; the number infected peaks when the susceptible fraction has fallen to $S = 1/R_0$. If a fraction of at least

$$
p_c = 1 - \frac{1}{R_0}
$$ {#eq-herd}

of the population is immune, an introduced infection cannot spread. Assumptions: a well-mixed population, constant rates, lifelong immunity after recovery, and no latent period.
:::

::: proof
One infected host in a fully susceptible population ($S \approx 1$) infects others at rate $\beta$ for an average time $1/\gamma$, so $R_0 = \beta/\gamma$. From the second equation $dI/dt = \gamma I(R_0S - 1)$, which is positive when $R_0S > 1$ and zero when $S = 1/R_0$; since $S$ only decreases, $I$ peaks when $S$ passes $1/R_0$. If a fraction $p$ is immune before the infection arrives, $S \le 1 - p$, and the infection cannot grow if $R_0(1 - p) < 1$, i.e. $p > 1 - 1/R_0$.
:::

::: example An epidemic in a host population {#ex-sir}
A pathogen of a wild rodent has a mean infectious period of 10 days ($\gamma = 0.1$ per day) and $\beta = 0.3$ per day. Find $R_0$, the susceptible fraction at the peak of an epidemic, and the fraction of the population that must be immune to prevent spread.
::: solution
$R_0 = 0.3/0.1 = 3$. The epidemic peaks when $S = 1/3$. The critical immune fraction is $p_c = 1 - 1/3 = 2/3 \approx 67$ %. A numerical solution (below) shows that, starting with 0.1 % infected, about 30 % of the population is infected at the peak, around day 38, and about 94 % is infected in total before the epidemic burns out — more than the 67 % threshold, because the epidemic overshoots the point at which it stops growing.
:::
:::

```python
beta, gamma = 0.3, 0.1        # transmission and recovery rates (per day)
S, I, R = 0.999, 0.001, 0.0   # fractions of a host population
dt, peak = 0.1, (0.0, 0.0)    # time step (days); (time, size) of epidemic peak

for step in range(int(300 / dt)):          # 300 days, Euler steps
    new_inf = beta * S * I * dt
    new_rec = gamma * I * dt
    S, I, R = S - new_inf, I + new_inf - new_rec, R + new_rec
    if I > peak[1]:
        peak = (step * dt, I)

print(f"R0 = {beta / gamma:.1f}")
print(f"peak: {peak[1]:.3f} infected at day {peak[0]:.0f}")
print(f"never infected: {S:.3f}, infected overall: {R + I:.3f}")
# R0 = 3.0
# peak: 0.302 infected at day 38
# never infected: 0.059, infected overall: 0.941
```

If transmission depends on the *density* of infected hosts rather than their proportion, $R_0 = \beta' N/\gamma$ grows with host density $N$, and there is a **threshold host density** $N_T = \gamma/\beta'$ below which the pathogen cannot persist. This is the theoretical basis of culling as a means of disease control in wildlife, although in practice culling can disturb social structure and increase contact between groups, with the opposite effect, as was argued for badgers and bovine tuberculosis in Britain. The human applications of these models — vaccination programmes and the epidemiology of human disease — belong to epidemiology and are treated in the [Medicine Atlas](/learn/medicine/).

::: quiz
For a pathogen with $R_0 = 4$ in a well-mixed host population, what is the minimum proportion that must be immune to prevent an epidemic?
- [ ] 25 %
- [ ] 50 %
- [x] 75 %
- [ ] 100 %
::: solution
By [[#eq-herd]], $p_c = 1 - 1/R_0 = 1 - 1/4 = 0.75$. With 75 % immune, each infection causes on average $4\times0.25 = 1$ new infection, so the infection cannot grow; above that, it dies out.
:::
:::

### Can parasites regulate their hosts?

Parasites that reduce the survival or fecundity of their hosts in a density-dependent way can regulate host populations and even drive cycles, as Roy Anderson and Robert May argued in a series of papers from 1978. A clear field test involves the red grouse (*Lagopus lagopus scotica*) of British moorland, whose numbers cycle with a period of about four to eight years, and a nematode, *Trichostrongylus tenuis*, that lives in the grouse's gut and reduces breeding success. Peter Hudson, Andrew Dobson and David Newborn (1998) treated grouse in experimental populations with an anthelmintic drug in the years when crashes were expected; the treated populations did not crash, whereas untreated control populations did, showing that the parasite was necessary for the cycles in those populations.

Parasites also mediate interactions between other species. Two prey species that share a predator, or two hosts that share a parasite, can harm each other without competing for any resource: an increase in one supports more predators or parasites, which then attack the other. Robert Holt named this **apparent competition** (1977). The squirrelpox virus carried by grey squirrels to the detriment of red squirrels, mentioned in [[ecology/competition]], is an example.

::: history
Lotka's *Elements of Physical Biology* (1925) and Volterra's analysis of Adriatic fish catches (1926) introduced predator–prey equations; Alexander Nicholson and Victor Bailey's discrete-time model for insect hosts and parasitoids (1935) showed that such interactions tend to produce oscillations of growing amplitude. Gause's protozoan experiments (1934–1935) and Huffaker's mites (1958) showed the role of refuges and spatial structure. Holling's functional responses (1959) and Rosenzweig and MacArthur's graphical analysis (1963) turned predator–prey theory towards realistic mechanisms, and Rosenzweig's paradox of enrichment followed in 1971. Kermack and McKendrick's SIR model (1927) founded mathematical epidemiology, which Anderson and May connected to ecology from the late 1970s. Long field experiments — Krebs's hares at Kluane (1986–1994) and Hudson's grouse (published 1998) — tested which mechanisms actually drive cycles.
:::

## Where this leads

Consumer–resource interactions link species into **food webs**, and the effects of predators can cascade through several levels — the subject of [[ecology/communities]], which also treats the third great class of interactions, mutualism. The flow of energy through consumers is quantified in [[ecology/ecosystem-energetics]]. The evolutionary side of predation and parasitism — arms races, the Red Queen, and the evolution of virulence — is in [[evolution/coevolution]].

::: summary
- Consumers include **true predators**, **grazers**, **parasitoids** and **parasites** (micro- and macro-) ([[#def-consumers]]).
- The **Lotka–Volterra** predator–prey model ([[#prop-lvpp]]) has equilibrium $N^* = m/(ba)$, $P^* = r/a$ and neutral cycles of period about $2\pi/\sqrt{rm}$; prey enrichment raises predators, not prey; indiscriminate mortality favours prey (Volterra's principle). The neutral cycles are structurally unstable.
- **Functional responses** ([[#def-responses]]) are of type I, II or III. Holling's disc equation $f(N) = aN/(1 + ahN)$ ([[#prop-holling]]) saturates at $1/h$; type II is destabilising, type III stabilising at low density.
- In the **Rosenzweig–MacArthur** model ([[#prop-rm]]), the equilibrium is stable when the predator isocline cuts the descending side of the prey hump; enrichment can produce **limit cycles** (the paradox of enrichment).
- Experiments show the importance of refuges and spatial structure (Gause, Huffaker) and that the hare cycle results from food and predation together (Kluane).
- Herbivores rarely kill plants; plants compensate and defend themselves.
- For pathogens, $R_0 = \beta/\gamma$ in the SIR model ([[#prop-sir]]); an infection spreads only if $R_0 > 1$, peaks when $S = 1/R_0$, and is prevented if a fraction $1 - 1/R_0$ is immune. Parasites can regulate hosts (red grouse) and cause **apparent competition**.
:::

## Exercises

::: exercise Predator–prey equilibrium {level=1 check="250"}
In the Lotka–Volterra model, prey have $r = 0.5$ per year and predators $a = 0.002$, $b = 0.4$ and $m = 0.2$ per year. Find the prey equilibrium $N^*$.
::: solution
$N^* = m/(ba) = 0.2/(0.4\times0.002) = 0.2/0.0008 = 250$.
:::
:::

::: exercise Maximum feeding rate {level=1 check="12"}
A heron takes on average 5 minutes to handle each fish it catches. What is the maximum number of fish it can eat per hour according to Holling's disc equation?
::: solution
The maximum is $1/h = 1/(5\ \text{min}) = 12$ fish per hour.
:::
:::

::: exercise Herd immunity threshold {level=1 check="0.8"}
A wildlife pathogen has $R_0 = 5$. What fraction of the population must be immune to prevent an outbreak?
::: solution
$p_c = 1 - 1/5 = 0.8$.
:::
:::

::: exercise Period of oscillation {level=1 check="2*pi/sqrt(0.25)"}
For the Lotka–Volterra model with $r = 0.5$ and $m = 0.5$ per year, what is the approximate period of small oscillations, in years?
::: solution
$2\pi/\sqrt{rm} = 2\pi/\sqrt{0.25} = 2\pi/0.5 = 12.6$ years.
:::
:::

::: exercise Functional response from data {level=2}
In a laboratory experiment, a predatory bug offered different densities of mosquito larvae for 24 hours ate the following numbers: 4 larvae at density 5 per container, 11 at 20, 15 at 50, 17 at 100. (a) What type of functional response is this? (b) Estimate the handling time roughly from the data. (c) Rearrange [[#eq-holling]] to show that $1/f$ is a linear function of $1/N$, and explain how this could be used to estimate $a$ and $h$.
::: solution
(a) Type II: consumption rises at a decelerating rate and appears to level off.

(b) Consumption approaches a maximum somewhat above 17 per 24 h, perhaps 20, so $h \approx 24/20 = 1.2$ hours per larva (a rough estimate; the asymptote is not yet reached).

(c) Inverting, $\dfrac{1}{f} = \dfrac{1 + ahN}{aN} = \dfrac{1}{a}\cdot\dfrac1N + h$. A plot of $1/f$ against $1/N$ is a straight line with slope $1/a$ and intercept $h$. (This is the same transformation as the Lineweaver–Burk plot for enzymes, and it has the same weakness: it gives great weight to the noisy measurements at low density. Fitting the curve directly by nonlinear least squares is better; and because prey are depleted during the trial, a correction known as Rogers' random-predator equation is often used.)
:::
:::

::: exercise Volterra's principle {level=2}
In the Lotka–Volterra model, suppose a fishery removes a fraction $F$ per year of both prey and predators. Show that the equilibria become $N^* = (m + F)/(ba)$ and $P^* = (r - F)/a$, and interpret this in the context of D'Ancona's observation and of insecticide use.
::: solution
The equations become $dN/dt = (r - F)N - aNP$ and $dP/dt = baNP - (m + F)P$, so the model is the same with $r \to r - F$ and $m \to m + F$. The equilibria are $N^* = (m + F)/(ba)$ (higher than without fishing) and $P^* = (r - F)/a$ (lower). Fishing that kills both kinds in proportion to their numbers shifts the community towards prey; when fishing fell during the war, the balance shifted towards predatory fish, as D'Ancona found. Insecticides that kill both a pest and its predators likewise raise the pest's equilibrium and lower its predators' — the pest can resurge after spraying.
:::
:::

::: exercise Is the equilibrium stable? {level=2}
In the Rosenzweig–MacArthur model with $a = 0.5$, $h = 0.4$, $b = 0.3$ and $m = 0.06$ (per unit time; prey and predators in the same units), find $N^*$. For which carrying capacities $K$ is the equilibrium stable, and for which do predators fail to persist at all?
::: solution
$N^* = m/(a(b - mh)) = 0.06/(0.5\times(0.3 - 0.024)) = 0.06/0.138 = 0.435$. The prey hump peaks at $\tfrac12(K - 1/(ah)) = \tfrac12(K - 5)$. Stability requires $0.435 > (K - 5)/2$, i.e. $K < 5.87$. Predators persist only if the equilibrium lies inside the prey's range, $N^* < K$, so $K > 0.435$. For $0.435 < K < 5.87$ the equilibrium is stable; for $K > 5.87$ there is a limit cycle; for $K < 0.435$ predators die out.
:::
:::

::: exercise Threshold host density {level=2 check="40"}
A pathogen of deer has density-dependent transmission: in a population of density $N$ (deer per km²) that is almost entirely susceptible, each infected deer infects others at a rate $\beta'N$ per day, with $\beta' = 0.005$ km² per deer per day. Infections last 5 days on average. Below what density of deer (per km²) can the pathogen not persist?
::: solution
$\gamma = 1/5 = 0.2$ per day, and $R_0 = \beta'N/\gamma$. The threshold is $R_0 = 1$: $N_T = \gamma/\beta' = 0.2/0.005 = 40$ deer per km².
:::
:::

::: exercise Interpreting a parasite-removal experiment {level=3}
In Hudson's grouse experiment, populations treated with an anthelmintic did not crash, while controls did. (a) Why was it important to treat the grouse when crashes were *expected*, and to have untreated controls? (b) Does the result show that parasites cause the cycle in all red grouse populations? (c) Suggest a mechanism by which a parasite that reduces breeding success could produce cycles rather than steady regulation.
::: solution
(a) Treating at the time of the expected crash tests the specific prediction that the parasite causes the crash; controls monitored at the same time show that a crash would otherwise have happened (that conditions were not unusually favourable that year), so the difference can be attributed to the treatment.

(b) No. It shows that the parasite was necessary for the crashes in the treated populations. Other grouse populations, for example in areas with lower parasite transmission, or where predators or territorial behaviour dominate, may cycle for other reasons or not at all.

(c) Parasite burdens build up with a delay: when grouse are abundant, infective larvae accumulate on the moor, and the worm burden peaks a year or more later, depressing breeding when the grouse population may already be declining. Delayed density-dependent effects of this kind produce oscillations, as in the delayed logistic of [[ecology/population-growth#eq-delay]].
:::
:::

::: exercise Apparent competition {level=3}
Two species of aphid live on different plants, so they share no food, but are attacked by the same generalist parasitoid. Before the second aphid colonised the area, the first was common. (a) Using the Lotka–Volterra predator–prey equilibrium, explain why the arrival of the second aphid could reduce the first. (b) How could you test experimentally whether the decline is due to apparent competition?
::: solution
(a) In the Lotka–Volterra model the prey equilibrium is set by the predator: $N^*$ is the prey density at which predators just replace themselves. With two prey, the predator is supported by both; the second aphid feeds more parasitoids, raising the predator density, which then attacks the first aphid more heavily. With a shared enemy, the prey whose equilibrium requirement is lower can drive the other down — the enemy-mediated analogue of the $R^*$ rule, sometimes called the $P^*$ rule.

(b) Remove the second aphid (or exclude it from some plots) and compare the parasitoid density and the first aphid's survival and population growth with control plots; alternatively, exclude the parasitoid from some plots (with cages) in areas with and without the second aphid. If the second aphid harms the first only when the parasitoid is present, the effect is apparent competition.
:::
:::
