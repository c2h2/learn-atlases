Training a large language model keeps tens of thousands of accelerators busy for weeks or months, and serving it to millions of users keeps more of them busy indefinitely. All of that computation runs on electricity, produces heat that must be removed (often with water), and uses hardware whose manufacture has its own footprint. Estimates of these costs have ranged from alarming to dismissive, sometimes for the same system, because they rest on assumptions that are rarely stated.

This chapter teaches how to make such estimates and how to read them. It derives the energy of a training run from its floating-point operations, the efficiency of the hardware, its utilisation and the overhead of the data centre, then converts energy to emissions through the carbon intensity of the electricity grid. It compares training with inference, discusses water and embodied emissions, and reviews published estimates — Strubell, Ganesh and McCallum (2019), Patterson et al. (2021), Luccioni, Viguier and Ligozat (2023) — with their dates, ranges and the disputes about them. It ends with efficiency trends and the debate over whether efficiency reduces total consumption.

Numbers in this field change quickly with hardware, models and adoption, and many inputs for commercial systems are not disclosed. Every figure below is dated; treat them as orders of magnitude, and check the assumptions behind any estimate before quoting it.

## From FLOPs to joules {#sec-energy}

A training run's compute is well approximated by $C\approx6ND$ floating-point operations for a dense Transformer with $N$ parameters trained on $D$ tokens: about $2N$ per token for the forward pass and $4N$ for the backward pass ([[scaling/flops-memory]]). Hardware does not run at its peak rate: the fraction achieved in practice is the **model FLOPs utilisation** (MFU), typically $30\%$–$50\%$ for large training runs ([[scaling/large-runs]]).

::: definition Power usage effectiveness {#def-pue}
The **power usage effectiveness** of a data centre is

$$
\text{PUE} = \frac{\text{total facility energy}}{\text{energy delivered to IT equipment}}\ \ge1.
$$

The excess over $1$ is spent on cooling, power conversion and lighting. Large modern facilities report annual averages around $1.1$–$1.2$; the global average reported in industry surveys has been around $1.5$–$1.6$ (as of the mid-2020s).
:::

::: proposition Energy of a training run {#prop-energy}
Suppose a run performs $C$ FLOPs on accelerators of peak throughput $F$ (FLOP/s) at utilisation $u$, each drawing average power $P$ (W, including its share of host and network if desired), in a facility with power usage effectiveness $\text{PUE}$. Then the accelerator-time is $C/(uF)$ seconds and the facility energy is

$$
E = \frac{C}{u\,F}\cdot P\cdot\text{PUE} = \frac{C}{u\,\eta}\cdot\text{PUE},\qquad \eta = \frac{F}{P}\ \ (\text{peak FLOP per joule}).
$$ {#eq-energy}
:::

::: proof
Each accelerator performs $uF$ useful FLOPs per second, so the total accelerator-seconds are $C/(uF)$, regardless of how many accelerators share the work (more accelerators shorten the wall-clock time but not the total). Each accelerator-second consumes $P$ joules at the IT level, and the facility consumes $\text{PUE}$ times the IT energy. Writing $\eta = F/P$ gives the second form.
:::

Two simplifications are worth noting. Accelerators draw less than their rated power when they are not fully busy, so using the thermal design power (TDP) for $P$ tends to overestimate; but host processors, memory, networking and storage add power, and failed or restarted runs, hyperparameter searches and smaller experiments add compute — Meta reported, for example, that most of its AI compute capacity was devoted to experimentation and inference rather than final training runs (Wu et al., 2022). An estimate for "the final training run" is a lower bound on the cost of developing a model.

::: definition Carbon intensity, location-based and market-based accounting {#def-carbon}
The **carbon intensity** $I$ of electricity is the mass of greenhouse gases emitted per unit of energy generated, in $\text{kgCO}_2\text{e}/\text{kWh}$ (carbon-dioxide equivalent, weighting other gases by their warming potential). Operational emissions are $E\cdot I$. **Location-based** accounting uses the average intensity of the local grid where the energy was consumed; **market-based** accounting uses the intensity of electricity the consumer has contracted for, through power-purchase agreements or renewable-energy certificates, and can be near zero for a company that buys enough renewable energy.
:::

Grid intensities differ by more than an order of magnitude: grids dominated by hydro or nuclear power (Norway, Quebec, France) are typically below $0.06\ \text{kg/kWh}$, while coal-heavy grids exceed $0.6$; intensity also varies by hour as solar and wind output changes. The difference between location- and market-based figures for the same run can be total, so a reported "zero emissions" or a large figure must be read with its method. Whether market-based claims reflect real reductions is debated: proponents note that long-term power-purchase agreements finance new renewable capacity, critics that annual matching with certificates does not ensure clean power at the hours and places it is consumed, which has led some companies to aim for hourly ("24/7") matching.

::: example A 70-billion-parameter training run {#ex-training}
Estimate the energy and emissions of training a $70$-billion-parameter dense model on $15$ trillion tokens, on accelerators with $989$ TFLOP/s dense BF16 peak and $700$ W rated power (figures for NVIDIA H100 SXM), at $40\%$ utilisation and $\text{PUE} = 1.1$, on a grid of $0.4\ \text{kg/kWh}$.
::: solution
$C = 6\cdot7\times10^{10}\cdot1.5\times10^{13} = 6.3\times10^{24}$ FLOPs. Accelerator-seconds $= 6.3\times10^{24}/(0.4\cdot9.89\times10^{14}) = 1.59\times10^{10}$ s $= 4.42\times10^6$ accelerator-hours. IT energy $= 4.42\times10^6\ \text{h}\cdot0.7\ \text{kW} = 3.10\times10^6$ kWh; facility energy $= 1.1\times$ that $= 3.41\times10^6$ kWh $\approx3.4$ GWh. Emissions $= 3.41\times10^6\cdot0.4 = 1.36\times10^6$ kg $\approx1{,}360$ tCO$_2$e.

For comparison, Meta's model card for Llama 3 70B (2024), trained on over $15$ trillion tokens, reported $6.4$ million H100 GPU-hours and $1{,}900$ tCO$_2$e location-based emissions (and zero market-based, as Meta matched its consumption with renewable purchases). The reported hours are about $45\%$ above our estimate, consistent with lower average utilisation or work beyond a single clean run; the emissions are of the same order. $3.4$ GWh is roughly the annual electricity use of a few hundred US households.
:::
:::

The listing reproduces the estimate and shows how sensitive it is to the two least certain inputs.

```python
def training_footprint(n_params, n_tokens, peak_flops, chip_watts, util, pue, grid_kg_per_kwh):
    """Energy (MWh) and emissions (tCO2e) of a training run, from first principles."""
    flops = 6 * n_params * n_tokens                     # forward + backward
    chip_seconds = flops / (peak_flops * util)          # accelerator-seconds
    chip_hours = chip_seconds / 3600
    it_kwh = chip_hours * chip_watts / 1000             # energy drawn by accelerators
    facility_kwh = it_kwh * pue                         # cooling, power conversion …
    return {"FLOPs": flops, "chip-hours": chip_hours, "MWh": facility_kwh / 1000,
            "tCO2e": facility_kwh * grid_kg_per_kwh / 1000}

# A 70-billion-parameter model on 15 trillion tokens, H100-class accelerators
# (989 TFLOP/s dense BF16 peak, 700 W), 40 % utilisation, PUE 1.1
base = dict(n_params=70e9, n_tokens=15e12, peak_flops=989e12, chip_watts=700, util=0.4, pue=1.1)
r = training_footprint(**base, grid_kg_per_kwh=0.4)
print(f"FLOPs {r['FLOPs']:.2e}  chip-hours {r['chip-hours']/1e6:.2f} M  energy {r['MWh']:,.0f} MWh")

print("emissions (tCO2e) by grid intensity and utilisation:")
print("            " + "".join(f"util {u:.2f}  " for u in (0.3, 0.4, 0.5)))
for grid in (0.03, 0.2, 0.4, 0.7):
    row = [training_footprint(**{**base, "util": u}, grid_kg_per_kwh=grid)["tCO2e"] for u in (0.3, 0.4, 0.5)]
    print(f"{grid:4.2f} kg/kWh " + "".join(f"{t:10,.0f}  " for t in row))

# Inference: how many queries use as much energy as training?
for wh_per_query in (0.3, 3.0):
    q = r["MWh"] * 1e6 / wh_per_query
    print(f"{wh_per_query} Wh/query: training energy = {q:.2e} queries"
          f" = {q / 1e9:.1f} days at a billion queries a day")
```

```text
FLOPs 6.30e+24  chip-hours 4.42 M  energy 3,406 MWh
emissions (tCO2e) by grid intensity and utilisation:
            util 0.30  util 0.40  util 0.50  
0.03 kg/kWh        136         102          82  
0.20 kg/kWh        908         681         545  
0.40 kg/kWh      1,817       1,362       1,090  
0.70 kg/kWh      3,179       2,384       1,907  
0.3 Wh/query: training energy = 1.14e+10 queries = 11.4 days at a billion queries a day
3.0 Wh/query: training energy = 1.14e+09 queries = 1.1 days at a billion queries a day
```

Utilisation moves the answer by a factor of about $1.7$ across a plausible range; the grid moves it by a factor of $23$. Where a model is trained matters far more than how efficiently, which is why Patterson et al. (2021) emphasised the choice of location and data centre.

::: widget plot
f: 3406*x
x: 0, 0.8
y: 0, 3000
labels: emissions (tCO_2e) at 40% utilisation
points: 0.4,1362; 0.03,102
caption: Emissions of the training run of [[#ex-training]] ($3{,}406$ MWh) against grid carbon intensity in kg CO$_2$e per kWh. The marked points are a fossil-heavy grid ($0.4$) and a low-carbon grid ($0.03$). The same run on different grids differs by more than an order of magnitude; a different utilisation $u$ would scale the whole line by $0.4/u$, a much smaller effect (see the listing's table).
:::

## Published estimates and what they measured {#sec-published}

**Strubell, Ganesh and McCallum (2019)** estimated the energy and emissions of training several NLP models by measuring power draw during short training runs and extrapolating to reported training times, using US-average PUE and grid intensity. Their best-known figure — about $284$ tonnes CO$_2$e ($626{,}155$ lb) for a Transformer developed with neural architecture search, comparable to the lifetime emissions of five average American cars including fuel — was widely reported. It referred to an extensive architecture search, not to training one model, which by their estimate emitted far less. Patterson et al. (2021) argued that the search estimate substantially overstated the emissions of the search Google had actually run, because of assumptions about hardware, data centre and the search procedure; Strubell et al.'s broader point, that the cost of research methods should be reported, was widely adopted.

**Patterson et al. (2021)**, from Google, estimated the training energy and emissions of several large models from information about the actual hardware, utilisation and data centres. Among them: T5 about $86$ MWh and $47$ tCO$_2$e; GPT-3 (training details from OpenAI, on Microsoft data centres) about $1{,}287$ MWh and $552$ tCO$_2$e. They argued that the choice of model architecture (for example sparse mixtures of experts), processor, data centre and location could together reduce emissions by $100$–$1{,}000$ times relative to unfavourable choices.

**Luccioni, Viguier and Ligozat (2023)** carried out a life-cycle estimate for BLOOM, a $176$-billion-parameter open model trained in 2022 on a French public supercomputer. Training consumed about $433$ MWh; because the French grid's intensity is low (about $0.057\ \text{kg/kWh}$), the dynamic power consumption corresponded to about $25$ tCO$_2$e. Including idle power of the infrastructure and an estimate of the embodied emissions of the hardware's manufacture, the total was about $50$ tCO$_2$e — so equipment manufacture and idle consumption were about half the footprint, a share that grows as grids decarbonise.

::: warning "Training a model emits as much as five cars" is not a general fact
That comparison referred to one 2019 estimate of an architecture search, on assumed US-average conditions, and has been disputed. Training emissions of published models span from a few tonnes to thousands of tonnes, depending on size, hardware, location and accounting method. Equally, "AI's carbon footprint is negligible" ignores inference at scale, the growth of data-centre demand, embodied emissions and water. Quote estimates with their system, date, scope (training only? development? inference?) and method (location- or market-based).
:::

## Inference versus training {#sec-inference}

A model is trained once but used many times. For widely deployed models, inference energy over the model's life can exceed training energy. Patterson et al. (2022) reported that machine learning accounted for $10\%$–$15\%$ of Google's total energy use in 2019–2021, of which about three-fifths was inference and two-fifths training. Wu et al. (2022) reported that Meta's AI infrastructure capacity was split roughly $10:20:70$ between experimentation, training and inference.

Energy per query is harder to pin down, and published figures differ by an order of magnitude. A widely cited estimate of about $3$ Wh per chatbot query (de Vries, 2023, used by the International Energy Agency in 2024) rested on assumptions about hardware and server counts for early 2023. Later estimates for more efficient serving were lower: an analysis by Epoch AI (2025) estimated about $0.3$ Wh for a typical query to a frontier chat model, and Google reported in August 2025 that the median text prompt to its Gemini apps used about $0.24$ Wh, including idle capacity and data-centre overhead. Long outputs, long contexts, reasoning models that generate many tokens, and image or video generation use much more. Luccioni, Jernite and Strubell (2024) measured $88$ models on standard tasks and found that generative tasks used far more energy than classification or extraction, image generation most of all, and that general-purpose models used more energy than task-specific models for the same task.

::: example When does inference overtake training? {#ex-breakeven}
Taking the $3{,}400$ MWh training run of [[#ex-training]], how many queries at $0.3$ Wh each consume the same energy? If the model serves $100$ million queries a day, after how many days does cumulative inference energy equal training energy?
::: solution
$3.4\times10^9\ \text{Wh}/0.3\ \text{Wh} = 1.13\times10^{10}$ queries. At $10^8$ per day, $113$ days. Over a year of deployment inference would use about three times the training energy; at $3$ Wh per query, the crossover would come after $11$ days. The ratio depends on the deployment's scale and the efficiency of serving ([[inference/batching-serving]]), which is why per-query figures matter.
:::
:::

::: example One user's footprint, and the aggregate {#ex-per-user}
A user sends $20$ text queries a day for a year, at $0.3$ Wh each, on a grid of $0.4$ kg/kWh. What are the annual energy and emissions? How do they change if a tenth of the queries go to a reasoning model that generates twenty times as many tokens (and, to first order, uses twenty times the energy)? What if a service has $500$ million such users?
::: solution
Baseline: $20\cdot365\cdot0.3 = 2{,}190$ Wh $= 2.19$ kWh a year, emitting $0.88$ kg CO$_2$e — comparable to running a $1$ kW kettle for a little over two hours. With reasoning: per day $18\cdot0.3 + 2\cdot6 = 17.4$ Wh, three times as much: $6.35$ kWh and $2.5$ kg a year. For $5\times10^8$ users the baseline is $1.1$ TWh a year, the reasoning mix $3.2$ TWh. The per-user figure is small relative to an individual's total energy use, which is the basis of the argument that personal AI use is a minor part of one's footprint; the aggregate is comparable to the annual electricity use of a small country, which is the basis of the argument that it matters for grids. Both statements are true, and they answer different questions.
:::
:::

::: widget plot
f: 3400 + q*0.3*x/1000; 3400
x: 0, 365
y: 0, 15000
sliders: q=100:1:1000:1
labels: cumulative energy, training + inference (MWh); training alone
caption: Cumulative energy (MWh) of the training run of [[#ex-training]] plus inference at $0.3$ Wh per query, against days of deployment, for $q$ million queries a day (slider). At $100$ million queries a day inference overtakes training after about $113$ days ([[#ex-breakeven]]); at a billion, after $11$.
:::

## Data centres, water and hardware {#sec-wider}

**Electricity demand.** The International Energy Agency's *Energy and AI* report (April 2025) estimated that data centres used about $415$ TWh in 2024, around $1.5\%$ of global electricity consumption, and projected about $945$ TWh by 2030 in its base case, with AI the main driver of growth and wide uncertainty across scenarios. In the United States, a Lawrence Berkeley National Laboratory report (December 2024) estimated data centres at $4.4\%$ of national electricity use in 2023 and projected $6.7\%$–$12\%$ by 2028. Local effects can be larger than global shares suggest: data centres cluster, and in some regions they are a large and fast-growing share of demand, with consequences for grid investment, prices and the use of fossil-fuelled generation to meet new load. Several large technology companies reported rising total emissions in 2023–24 despite renewable purchases — for example, Google's 2024 environmental report gave a $48\%$ increase in greenhouse-gas emissions since 2019, attributed mainly to data-centre energy and supply-chain emissions.

**Water.** Data centres consume water on site, mainly by evaporation in cooling towers, and off site, through the water used to generate their electricity (for example in thermal power plants).

::: definition Water usage effectiveness {#def-wue}
The **on-site water usage effectiveness** of a data centre is the water consumed for cooling per unit of IT energy, in litres per kWh. The **off-site water intensity** of electricity is the water consumed in generating it, in litres per kWh. The water footprint of a computation with IT energy $E_{\text{IT}}$ is approximately $E_{\text{IT}}\cdot\text{WUE}_{\text{on}} + E_{\text{IT}}\cdot\text{PUE}\cdot\text{WI}_{\text{off}}$.
:::

Li, Yang, Islam and Ren (2023) estimated that training GPT-3 in Microsoft's US data centres could have consumed about $700{,}000$ litres of fresh water on site, and that a conversation of roughly $10$–$50$ responses with the model consumed on the order of half a litre, depending on where and when it ran. Water consumption varies widely with climate and cooling design (air cooling uses little water but more electricity; evaporative cooling the reverse), and matters most where water is scarce. Google's 2025 per-prompt figure included about $0.26$ mL of water.

::: example A water footprint {#ex-water}
For the run of [[#ex-training]] ($3.10$ GWh of IT energy, PUE $1.1$), estimate the water footprint with on-site WUE $0.5$ L/kWh and off-site water intensity $3$ L/kWh. Compare with a facility using air cooling (on-site WUE $0.05$ L/kWh) but PUE $1.3$.
::: solution
Evaporative: $3.10\times10^6\cdot0.5 + 3.10\times10^6\cdot1.1\cdot3 = 1.55\times10^6 + 1.02\times10^7 = 1.18\times10^7$ L, about $12$ million litres. Air-cooled: $3.10\times10^6\cdot0.05 + 3.10\times10^6\cdot1.3\cdot3 = 1.55\times10^5 + 1.21\times10^7 = 1.22\times10^7$ L. Total water is similar, but the air-cooled facility moves most of it off site (and uses $18\%$ more electricity). Which is better depends on local water stress at each location and on the grid's carbon intensity — a genuine trade-off between water and carbon.
:::
:::

**Embodied emissions.** Manufacturing accelerators, servers and buildings emits greenhouse gases before any computation. The BLOOM study attributed about $11$ tCO$_2$e to the manufacture of the equipment used during training, about a fifth of its total. As operational emissions fall with cleaner grids, embodied emissions become a larger share, and the lifetime and utilisation of hardware become important levers. Mining of materials and electronic waste are further environmental concerns (Crawford, 2021).

## Efficiency and its limits {#sec-efficiency}

Several trends reduce the energy per unit of useful work. Accelerator energy efficiency (FLOP per joule) has improved by roughly an order of magnitude between successive generations over a decade, and lower-precision arithmetic ([[scaling/mixed-precision]], [[inference/quantisation]]) multiplies throughput. Algorithmic efficiency — better architectures, data and training recipes — has reduced the compute needed to reach a given capability. Smaller models distilled from larger ones ([[post-training/distillation]]), mixtures of experts that activate a fraction of their parameters per token ([[transformers/mixture-of-experts]]), and serving optimisations such as batching and speculative decoding reduce inference cost per token.

Whether efficiency reduces total consumption is debated. The **rebound effect** (or Jevons paradox, after Jevons's 1865 observation that more efficient steam engines increased total coal consumption) holds that cheaper computation increases demand — more users, larger models, longer outputs, reasoning models that think at length — possibly enough to raise total use. On the other side, it is argued that demand for any service saturates, that efficiency gains have kept data-centre energy roughly flat for long periods before (Masanet et al., 2020, estimated that global data-centre energy use rose only about $6\%$ between 2010 and 2018 while computing workloads grew several-fold), and that applications of AI to energy systems, materials and logistics could reduce emissions elsewhere by more than AI adds — a claim that is plausible in principle but hard to verify, as the IEA noted. Both effects are real; their balance is an empirical question that, as of 2026, is unresolved.

**Transparency.** Developers disclose training energy and emissions inconsistently, and inference energy rarely; the methods (location- or market-based, which overheads are included) also differ. Proposals to improve this include standardised reporting of energy and hardware in model documentation, energy ratings for models on standard tasks (such as the AI Energy Score initiative, 2025), and legal requirements: the EU AI Act requires providers of general-purpose AI models to document the known or estimated energy consumption of their models ([[llm-society/governance-regulation]]).

::: quiz
Two teams report the emissions of training models of the same size on the same hardware. Team A reports $2{,}000$ tCO$_2$e; team B reports $0$. Which explanation is most likely?
- [ ] Team B's model used no electricity.
- [x] Team A used location-based accounting on a fossil-heavy grid and team B used market-based accounting with renewable-energy contracts.
- [ ] Team B trained for one step.
- [ ] Emissions do not depend on the grid.
::: solution
The same energy use can be reported as large under location-based accounting and as zero under market-based accounting with contracts covering consumption. Both are standard methods; a report should state which it uses, and ideally give the energy in MWh so readers can apply their own intensity.
:::
:::

::: history
Concern with the energy use of computing predates AI: Koomey and colleagues documented data-centre electricity use from the 2000s, and the Green Grid consortium defined PUE in 2007. In machine learning, Strubell, Ganesh and McCallum (2019) put energy on the NLP research agenda; Schwartz et al. (2020) called for "Green AI" that reports efficiency alongside accuracy; Henderson et al. (2020) and Lacoste et al. (2019) released tools for measuring and estimating emissions; Bender et al. (2021) included environmental cost among the risks of ever-larger models. Patterson et al. (2021; 2022) estimated emissions of large models from operational data and argued that they would plateau and shrink; Luccioni, Viguier and Ligozat (2023) carried out a life-cycle assessment of BLOOM; Li et al. (2023) drew attention to water. From 2024, the growth of AI data centres and their demand for power became a prominent issue in energy policy, and the IEA published its first dedicated report on energy and AI in 2025.
:::

::: summary
- Training energy $\approx C/(u\,\eta)\cdot\text{PUE}$, with $C\approx6ND$ FLOPs, utilisation $u$ (typically $0.3$–$0.5$), hardware efficiency $\eta$ (peak FLOP per joule) and data-centre overhead $\text{PUE}$ ($1.1$–$1.6$).
- Emissions $=$ energy $\times$ grid carbon intensity, which varies more than twentyfold by location; location-based and market-based accounting can differ totally.
- Final-run estimates are lower bounds: experiments, failed runs and inference add more. A $70$B model on $15$T tokens needs a few GWh, i.e. of order $100$–$2{,}000$ tCO$_2$e depending on the grid.
- Published estimates (Strubell et al., 2019; Patterson et al., 2021; Luccioni et al., 2023) differ in scope and method; the "five cars" figure referred to an architecture search and was disputed.
- For widely used models inference can exceed training within months; per-query estimates range from about $0.2$ to $3$ Wh for text and depend on the system and date.
- Water (on-site cooling and off-site generation) and embodied emissions matter, especially locally and as grids decarbonise.
- Efficiency improves rapidly; whether total consumption falls depends on the rebound in demand, which is unresolved. Better disclosure is needed to know.
:::

## Exercises

::: exercise Training FLOPs {level=1 check="1.2e24"}
How many FLOPs does training a $10$-billion-parameter dense model on $20$ trillion tokens take, using $C = 6ND$?
::: solution
$6\cdot10^{10}\cdot2\times10^{13} = 1.2\times10^{24}$ FLOPs.
:::
:::

::: exercise Accelerator-hours {level=1 check="9.26e5"}
With accelerators of peak $10^{15}$ FLOP/s at $36\%$ utilisation, how many accelerator-hours does $1.2\times10^{24}$ FLOPs take? Give the answer to three significant figures.
::: solution
$1.2\times10^{24}/(0.36\times10^{15}) = 3.33\times10^9$ s $= 3.33\times10^9/3600 = 9.26\times10^5$ hours.
:::
:::

::: exercise Energy and emissions {level=1 check="200"}
A run uses $500$ MWh of facility energy on a grid of $0.4$ kg CO$_2$e per kWh. What are its location-based emissions in tonnes?
::: solution
$5\times10^5\ \text{kWh}\cdot0.4 = 2\times10^5$ kg $= 200$ t.
:::
:::

::: exercise The effect of PUE {level=2 check="27"}
Moving a run from a facility with PUE $1.5$ to one with PUE $1.1$ on the same grid reduces energy by what percentage? Round to the nearest whole number.
::: solution
$(1.5 - 1.1)/1.5 = 0.267$, about $27\%$.
:::
:::

::: exercise Break-even with inference {level=2 check="40"}
A model's training used $1{,}200$ MWh. It serves $10$ million queries a day at $3$ Wh each. After how many days does cumulative inference energy equal training energy?
::: solution
Daily inference energy: $10^7\cdot3\ \text{Wh} = 3\times10^7$ Wh $= 30$ MWh. $1200/30 = 40$ days.
:::
:::

::: exercise Reading a model card {level=2}
A model card reports "$2.1$ million GPU-hours on H100-80GB (TDP $700$ W); estimated emissions $590$ tCO$_2$e location-based; $0$ market-based". (a) What energy does this imply at the GPU level? (b) What grid intensity does the location-based figure imply, assuming it ignores PUE? (c) What is missing for a full footprint?
::: solution
(a) $2.1\times10^6\ \text{h}\cdot0.7\ \text{kW} = 1.47\times10^6$ kWh $= 1{,}470$ MWh (an upper bound if GPUs drew less than TDP). (b) $590{,}000/1.47\times10^6 = 0.40$ kg/kWh. (c) Data-centre overhead (PUE), host and network power, experiments and failed runs, inference over the model's life, water, and embodied emissions of hardware.
:::
:::

::: exercise Carbon-aware scheduling {level=2 check="0.25"}
A $10$ MWh fine-tuning job can run either over $24$ hours at a constant grid intensity average of $0.4$ kg/kWh, or be scheduled into the $8$ sunniest hours, when intensity is $0.1$ kg/kWh, at three times the power. What fraction of the original emissions does scheduling leave, assuming the same total energy?
::: solution
Original: $10{,}000\cdot0.4 = 4{,}000$ kg. Scheduled: $10{,}000\cdot0.1 = 1{,}000$ kg. Fraction $0.25$. In practice, running at three times the power needs three times the hardware for those hours, raising embodied emissions and cost; flexible scheduling works best for jobs that are delay-tolerant and on hardware that would otherwise be idle.
:::
:::

::: exercise A full estimate {level=3}
Estimate, with stated assumptions, the annual energy and location-based emissions of serving a chat assistant with $200$ million queries a day, where an average query produces $500$ output tokens. Assume a serving cost of $2\times10^{-4}$ Wh per output token at the accelerator level (including batching efficiency), a host-and-network overhead of $30\%$, PUE $1.15$, and grid intensity $0.3$ kg/kWh. Compare with the training run of [[#ex-training]], and say which assumption you are least sure of.
::: solution
Per query at the accelerator: $500\cdot2\times10^{-4} = 0.1$ Wh; with overhead $0.13$ Wh; with PUE $0.1495$ Wh. Daily: $2\times10^8\cdot0.1495 = 2.99\times10^7$ Wh $= 29.9$ MWh. Annual: $10{,}900$ MWh $\approx10.9$ GWh. Emissions: $1.09\times10^7\ \text{kWh}\cdot0.3 = 3{,}270$ t. That is about three times the training energy of [[#ex-training]] ($3.4$ GWh) per year. The least certain input is the energy per token, which depends on model size, hardware, batch size, context length and utilisation of serving capacity, and varies by more than an order of magnitude between systems; published per-query figures ($0.24$–$3$ Wh) bracket our $0.15$ Wh.
:::
:::

::: exercise Rebound {level=3}
The energy per query of a service falls by a factor of $4$ through efficiency improvements over two years, while the number of queries grows by a factor of $6$ and the average output length by a factor of $1.5$ (energy per query being proportional to output length). (a) By what factor does total inference energy change? (b) What price elasticity of demand (percentage change in quantity per percentage change in cost, treated as constant) would make the efficiency gain exactly offset by more queries, if output length stayed fixed? (c) Discuss what evidence would distinguish rebound from independent growth in demand.
::: solution
(a) Energy per query changes by $1.5/4 = 0.375$; total by $0.375\cdot6 = 2.25$: total inference energy more than doubles despite the fourfold efficiency gain. (b) Cost per query falls to $1/4$; for total energy to be unchanged, quantity must rise fourfold. With constant elasticity $\varepsilon$, $Q\propto\text{cost}^{-\varepsilon}$, so $4 = 4^{\varepsilon}$, $\varepsilon = 1$: unit-elastic demand exactly offsets efficiency; more elastic demand produces backfire. (c) Rebound means demand rose *because* cost fell. Evidence would come from price changes not driven by demand (for example, provider price cuts at different times, or natural experiments when efficiency improvements were deployed in some regions first) and their effect on usage; growth in demand due to new capabilities or adoption would occur even at constant cost. Disentangling them requires data that providers rarely publish.
:::
:::
