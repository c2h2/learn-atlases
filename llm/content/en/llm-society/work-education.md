Within two years of the release of ChatGPT in November 2022, surveys found that a substantial fraction of workers in many countries used generative AI in their jobs and that most university students used it in their studies. Language models write first drafts, summarise documents, answer customers, translate, and write and review code. The questions this raises are old ones in new form: Which tasks will machines take over? Will workers become more productive, and who will capture the gains? Will some jobs disappear, and will new ones appear? And, for education, what should students learn, and how can we know they have learned it?

This chapter reviews what is known, with attention to how it is known. It begins with **exposure** studies, which estimate which tasks language models could affect, and explains why exposure is not displacement. It then examines the **field and laboratory experiments** that measured productivity effects — customer support (Brynjolfsson, Li and Raymond), professional writing (Noy and Zhang), management consulting (Dell'Acqua et al.), software development — and the methodological caveats that limit how far their results generalise. A simple macroeconomic calculation shows how task-level gains translate into aggregate productivity and why estimates differ by an order of magnitude. The second half turns to **education**: what experiments say about learning with AI, and how assessment is being redesigned.

The evidence is young. Most studies cover the first two or three years of widespread use, specific tools and specific firms, and the models have improved since. Results are dated "as of" their publication, and the chapter distinguishes measured findings from forecasts.

## Tasks, not jobs {#sec-tasks}

Economists study technological change through **tasks** — units of work activity that produce output — rather than jobs, because a technology typically changes some tasks within a job and leaves others (Autor, Levy and Murnane, 2003; Acemoglu and Autor, 2011). The O*NET database of the US Department of Labor describes about $1{,}000$ occupations by roughly $19{,}000$ tasks, and is the basis of most exposure studies.

::: definition Task exposure (Eloundou et al., 2023) {#def-exposure}
A task is **directly exposed** ($E_1$) if access to a language model through a chat interface could reduce the time a human needs to complete it with equivalent quality by at least half; **exposed with complementary software** ($E_2$) if the reduction requires additional tools built on the model (retrieval, integration with other systems); and **unexposed** ($E_0$) otherwise. An occupation's exposure is the share of its tasks in each category; Eloundou et al. reported $\alpha = E_1$, $\beta = E_1 + \tfrac12E_2$ and $\zeta = E_1 + E_2$.
:::

Eloundou, Manning, Mishkin and Rock (2023; published in *Science* in 2024) rated every O*NET task with human annotators and with GPT-4, with broadly consistent results. They estimated that about $80\%$ of the US workforce worked in occupations with at least $10\%$ of tasks exposed, and about $19\%$ in occupations with at least half of their tasks exposed; with complementary software, $47\%$–$56\%$ of all tasks could be done significantly faster at the same quality. Unlike earlier automation, exposure *rose* with wages and education: writers, interpreters, mathematicians, tax preparers and web designers were among the most exposed, while occupations relying on physical work were least. Gmyrek, Berg and Bescond (2023) for the International Labour Organization found clerical support work the most exposed category worldwide, with most other occupations more likely to be *augmented* (a fraction of tasks affected) than automated, and higher exposure for women in high-income countries because of their concentration in clerical jobs.

::: example Exposure of an occupation {#ex-exposure}
An occupation's work consists of five tasks with time shares and ratings: drafting reports ($30\%$, $E_1$), answering client emails ($20\%$, $E_1$), analysing data in internal systems ($20\%$, $E_2$), meeting clients ($20\%$, $E_0$), site inspections ($10\%$, $E_0$). Compute $\alpha$, $\beta$ and $\zeta$ weighted by time share. If each $E_1$ task's time is halved and each $E_2$ task's time is cut by a quarter, what fraction of total work time is saved?
::: solution
$\alpha = 0.3 + 0.2 = 0.5$; $\beta = 0.5 + 0.5\cdot0.2 = 0.6$; $\zeta = 0.7$. Time saved: $0.5\cdot0.5 + 0.2\cdot0.25 = 0.25 + 0.05 = 0.30$, i.e. $30\%$ of working time. Note that Eloundou et al. weighted tasks equally rather than by time; the time-weighted version is closer to what matters economically, and the result depends heavily on that choice.
:::
:::

::: warning Exposure is not job loss
An exposed task is one where a model *could* save time. Whether that leads to fewer jobs depends on whether the time saving is adopted (cost, reliability, regulation, organisational change), whether it substitutes for or complements the worker, how demand responds to lower prices, and whether new tasks appear. Exposure studies are measurements of technical potential made with judgements — including, in Eloundou et al., the model's own judgements about itself. They do not predict employment, and their authors say so.
:::

### Displacement, productivity and new tasks

The task-based framework of Acemoglu and Restrepo (2018; 2019) separates three forces. **Displacement**: machines take over tasks previously done by labour, reducing labour demand for those tasks. **Productivity**: cheaper production raises demand for output and for labour in non-automated tasks. **Reinstatement**: new tasks in which labour has a comparative advantage are created (Autor et al., 2024, found that most US employment in 2018 was in job titles that did not exist in 1940). Whether a technology raises or lowers wages and employment depends on the balance, which differs between technologies that *automate* tasks and those that *augment* workers within tasks. Language models can do both, which is one reason forecasts diverge.

## Field and laboratory evidence {#sec-experiments}

The best evidence on productivity comes from studies that compare workers with and without access to a model, with access assigned at random or rolled out in a way that allows comparison over time.

::: definition Difference-in-differences {#def-did}
With outcome $Y$ measured before and after a treatment for a treated group $T$ and a control group $C$, the **difference-in-differences** estimate is

$$
\hat\tau_{\text{DiD}} = \bigl(\bar Y_{T,\text{after}} - \bar Y_{T,\text{before}}\bigr) - \bigl(\bar Y_{C,\text{after}} - \bar Y_{C,\text{before}}\bigr).
$$

It identifies the average effect on the treated under the **parallel-trends assumption**: without treatment, the treated group's outcome would have changed by the same amount as the control group's. With a **staggered rollout**, groups adopt at different times, and the not-yet-treated serve as controls (with estimators designed for heterogeneous effects across adoption times).
:::

**Customer support.** Brynjolfsson, Li and Raymond (NBER working paper 2023; *Quarterly Journal of Economics* 2025) studied $5{,}179$ customer-support agents at a software firm as a GPT-based assistant, which suggested responses and linked to documentation, was rolled out in stages. Using the staggered rollout, they found that the number of issues resolved per hour rose by about $14\%$ on average, by about $34\%$ for novice and low-skilled workers, and by little for the most experienced and highest-skilled. Customers expressed more positive sentiment, requests to speak to a manager fell, and agent attrition declined. The authors interpreted the pattern as the model disseminating the tacit practices of the best agents to the others: novices with access progressed as fast in two months as others did in six.

**Professional writing.** Noy and Zhang (2023, *Science*) gave $453$ college-educated professionals (marketers, grant writers, consultants, data analysts, HR professionals, managers) two incentivised occupation-specific writing tasks, randomly offering ChatGPT for the second. Time taken fell by about $40\%$ and graded quality rose by about $18\%$. Workers who scored lower on the first task benefited more, compressing the distribution of performance. Most participants used the model to produce a draft and edited it little.

**Management consulting.** Dell'Acqua et al. (2023), with the Boston Consulting Group, gave $758$ consultants realistic tasks with or without GPT-4. On tasks within the model's capabilities — creative product development — consultants with access completed about $12\%$ more tasks, $25\%$ faster, with quality rated more than $40\%$ higher; below-average performers gained most. On a task designed to lie just *outside* the model's capabilities — a business problem requiring careful reading of interview notes and spreadsheet data, where the model's plausible answer was wrong — consultants using the model were about $19$ percentage points *less* likely to reach the correct answer. The authors called the uneven boundary of capabilities the "jagged technological frontier": performance gains within it, and errors from over-reliance outside it, with no obvious sign of which side a task falls on.

**Software development.** In a laboratory task, developers with GitHub Copilot completed an HTTP server in JavaScript about $56\%$ faster (Peng et al., 2023). Field experiments at several large companies reported an increase of about a quarter in completed pull requests among developers given an AI assistant, with large confidence intervals and larger effects for less experienced developers (Cui et al., 2025). In contrast, a randomised trial by METR (Becker et al., 2025) with $16$ experienced open-source developers working on their own mature repositories found that, with early-2025 AI tools, they took about $19\%$ *longer* on tasks — while believing beforehand that the tools would make them about $24\%$ faster, and afterwards that they had been about $20\%$ faster.

::: example Reading a difference-in-differences {#ex-did}
A team's resolutions per hour average $2.00$ before and $2.30$ after an assistant is introduced. A comparable team without the assistant goes from $2.10$ to $2.20$ over the same period. Estimate the effect, absolute and as a percentage of the treated team's counterfactual.
::: solution
$\hat\tau_{\text{DiD}} = (2.30 - 2.00) - (2.20 - 2.10) = 0.30 - 0.10 = 0.20$ resolutions per hour. The counterfactual for the treated team is $2.00 + 0.10 = 2.10$, so the effect is $0.20/2.10 = 9.5\%$. A naive before–after comparison would have claimed $15\%$, attributing the general improvement (seasonality, other changes) to the tool. The estimate is only as good as the parallel-trends assumption: if the treated team was chosen because it was improving, it is biased.
:::
:::

### Why results differ: methodological caveats {#sec-caveats}

The studies agree on a pattern — large gains on well-defined tasks within model capabilities, larger for less experienced workers — and disagree in magnitude, sometimes in sign. Several features explain this.

- **Task selection.** Laboratory tasks are short, self-contained and chosen to be feasible; real work involves context, coordination and verification. The METR result suggests that for experts working in large, familiar codebases, time spent prompting, waiting and checking can exceed the time saved.
- **Measured output.** "Tasks completed", "pull requests" and "quality grades" are proxies. More pull requests can mean smaller ones; graders of writing may not detect errors; customer-support metrics do not capture long-run knowledge.
- **External validity.** Each field study covers one firm, one tool and one period. Effects of early tools may understate later ones — or overstate them, if novelty or experimenter attention inflated effort (a Hawthorne effect).
- **Self-reports.** Surveys of time savings rely on perceptions, which the METR study showed can be wrong in direction.
- **Partial equilibrium.** A $14\%$ productivity gain for one firm's agents says nothing directly about wages, prices or employment in the industry, which depend on how competitors and demand respond.

### A simulation of compression {#sec-code}

Several studies found that AI assistance helps the least experienced most. The listing simulates that pattern (with invented parameters, not any study's data) and shows how it compresses differences between workers.

```python
import random, statistics as st
rng = random.Random(2023)

# Simulated agents: baseline productivity rises with experience; the assistant's
# gain is largest for novices (a stylised version of the pattern reported in
# field studies, not their data).
agents = []
for _ in range(3000):
    exp = rng.uniform(0, 1)                          # experience percentile
    base = 2.0 + 1.0 * exp                           # resolutions per hour
    gain = 0.35 * (1 - exp)                          # proportional gain
    treated = rng.random() < 0.5                     # random assignment
    y = base * (1 + gain * treated) * rng.lognormvariate(0, 0.25)
    agents.append((exp, treated, y))

def effect(rows):
    t = [y for _, w, y in rows if w]; c = [y for _, w, y in rows if not w]
    return st.mean(t) / st.mean(c) - 1

print(f"average effect: {effect(agents):+.1%}")
for lo, hi in ((0, 1/3), (1/3, 2/3), (2/3, 1)):
    print(f"experience {lo:.2f}-{hi:.2f}: {effect([a for a in agents if lo <= a[0] < hi]):+.1%}")
for w, name in ((False, "control"), (True, "treated")):
    ys = [y for e, t, y in agents if t == w]
    top = st.mean([y for e, t, y in agents if t == w and e >= 2/3])
    bottom = st.mean([y for e, t, y in agents if t == w and e < 1/3])
    print(f"{name}: mean {st.mean(ys):.2f}/h, top-to-bottom tercile ratio {top/bottom:.2f}")
```

```text
average effect: +15.9%
experience 0.00-0.33: +25.4%
experience 0.33-0.67: +18.2%
experience 0.67-1.00: +4.9%
control: mean 2.58/h, top-to-bottom tercile ratio 1.32
treated: mean 2.99/h, top-to-bottom tercile ratio 1.10
```

An average effect of $16\%$ conceals a range from $25\%$ for novices to $5\%$ for experts, and the gap between the most and least experienced shrinks from $32\%$ to $10\%$. Whether such compression benefits novices in the long run is a separate question: if they learn the job's skills more slowly because the model does part of it, or if firms hire fewer of them, the within-firm compression could coexist with worse career prospects. Brynjolfsson et al. found that agents also improved on days when the tool was unavailable, suggesting some learning; other studies (see [[#sec-learning]]) find the opposite in education.

## From tasks to the economy {#sec-macro}

Task-level gains translate into aggregate productivity through a simple approximation.

::: proposition Hulten's approximation {#prop-hulten}
In a competitive economy, if a technology lowers the cost of producing a set of tasks by a fraction $c_i$ for task $i$, and task $i$ accounts for a share $s_i$ of GDP, the first-order gain in aggregate total factor productivity is

$$
\Delta\ln\text{TFP}\approx\sum_i s_i\,c_i.
$$

In particular, if a fraction $s$ of GDP-weighted tasks is affected with average cost saving $c$, the gain is about $s\,c$.
:::

::: proof
(Sketch, following Hulten, 1978.) With competitive markets, the elasticity of aggregate output with respect to the productivity of producing task $i$ equals the share of task $i$ in total output (its Domar weight $s_i$), because firms equate marginal products to prices. A cost reduction of $c_i$ is, to first order, a productivity increase of $c_i$ for that task, so aggregate output rises by $\sum_i s_i c_i$ to first order, holding inputs fixed. The approximation ignores second-order effects (reallocation of inputs, changes in shares) and assumes no market power or adjustment costs.
:::

::: example Two estimates of the macroeconomic gain {#ex-macro}
Acemoglu (2024) took about $20\%$ of US labour tasks as exposed and assumed, from estimates of which exposed tasks it would be profitable to automate within a decade, that about $23\%$ of those would be affected — $4.6\%$ of tasks. From the experimental studies he took average labour-cost savings of about $27\%$, which with a labour share of about $0.53$ in those tasks gives total cost savings of about $14.4\%$. What TFP gain does [[#prop-hulten]] give over ten years? How does it change if $40\%$ of tasks are affected with $30\%$ cost savings?
::: solution
$0.046\cdot0.144 = 0.0066$: about $0.66\%$ over ten years, or $0.07$ percentage points a year — Acemoglu's estimate, which he described as modest. With $s = 0.4$ and $c = 0.3$ the gain is $0.12$, i.e. $12\%$ over the period. Published estimates span this range: some forecasts (for example a 2023 Goldman Sachs report suggesting about $7\%$ of global GDP over ten years) assume much wider adoption and complementary innovation. The disagreement is less about the formula than about $s$ and $c$ — how many tasks will be affected, and how large the savings will be when measured in real deployments rather than experiments.
:::
:::

::: widget plot
f: 100*x*c
x: 0, 0.5
y: 0, 20
sliders: c=0.144:0.05:0.5:0.005
labels: TFP gain (%)
points: 0.046,0.66
caption: Hulten's approximation: the aggregate productivity gain (in per cent) against the GDP share $x$ of affected tasks, for an average cost saving $c$ (slider). The marked point is Acemoglu's (2024) central case, $x = 0.046$, $c = 0.144$, giving $0.66\%$. Moving along either axis by plausible amounts changes the answer by more than an order of magnitude, which is why forecasts disagree.
:::

**Labour-market evidence so far.** Measured effects on employment and wages in the first years were small and debated. Using Danish administrative data linked to surveys of workers in exposed occupations, Humlum and Vestergaard (2025) found that, despite wide adoption, effects on earnings and recorded hours through 2024 were close to zero, with confidence intervals ruling out average effects larger than a few per cent. On online freelancing platforms, Hui, Reshef and Zhou (2024) found that after ChatGPT's release the number of jobs and earnings of freelancers in writing-related work fell by a few per cent relative to others. Using US payroll data, Brynjolfsson, Chandar and Chen (2025) reported a relative decline in employment from late 2022 for workers aged $22$–$25$ in the most exposed occupations, concentrated where AI use was more automating than augmenting, while employment of older workers in the same occupations held up; other analyses of aggregate data found no broad disruption, and the attribution of early-career declines to AI rather than to interest rates or post-pandemic adjustments was contested (as of 2026).

**Distribution.** Who gains depends on the balance between workers and owners of capital, between more and less experienced workers, and between countries. Within occupations, experimental evidence points to compression; across the economy, if AI substitutes for skilled cognitive labour, it could reduce the wage premium for some educated work, while gains accrue to firms and to workers who use the tools to expand their output. These are open empirical questions.

::: quiz
A firm's internal study finds that developers given an AI assistant merge $25\%$ more pull requests per week. Which conclusion is best supported?
- [ ] The firm can employ $20\%$ fewer developers with no loss of output.
- [ ] The assistant raises the productivity of all developers by $25\%$.
- [x] Some measure of output rose on average; whether value per pull request, code quality, and effects for different developers changed needs further measurement.
- [ ] The national economy's productivity will rise by $25\%$.
::: solution
Pull requests are a proxy: their size and quality may change. The average may hide heterogeneity (experienced developers may gain less or lose time). Firm-level employment depends on demand and on what developers do with saved time, and the economy-wide effect is roughly the affected share times the saving ([[#prop-hulten]]), far below $25\%$.
:::
:::

## Education {#sec-education}

### Learning with AI {#sec-learning}

Language models can act as tutors that answer questions at any hour, explain at the student's level, and give feedback on drafts. They can also do the work for the student. Experimental evidence suggests the difference between these uses matters greatly.

- Bastani et al. (2025, *PNAS*), in a field experiment with about $1{,}000$ Turkish high-school students in mathematics, gave some students a standard GPT-4 interface and others a "tutor" version prompted to give hints rather than answers. During practice sessions, grades rose by $48\%$ with the standard interface and $127\%$ with the tutor. On a subsequent exam without access, students who had used the standard interface scored $17\%$ *lower* than the control group, while tutor users did not differ significantly from it. The authors concluded that unrestricted access can substitute for learning.
- Kestin et al. (2025, *Scientific Reports*), in a crossover study in a Harvard introductory physics course, found that students using a carefully designed AI tutor learned more in less time than in an active-learning class session on the same material.
- A World Bank pilot in Nigeria (De Simone et al., 2025) found that six weeks of after-school sessions using GPT-4 as a tutor, with teacher guidance, improved English test scores relative to controls by about $0.3$ standard deviations.

The common thread is design: models used to give answers can help with tasks and harm learning; models constrained to scaffold thinking, embedded in teaching, can help. Concerns about **cognitive offloading** — relying on the tool and losing the skill — are long-standing for calculators and search engines, and early studies on language models are suggestive but small and not yet conclusive.

### Academic integrity and assessment {#sec-assessment}

Surveys found rapid adoption: a 2025 survey of UK undergraduates by the Higher Education Policy Institute reported that $92\%$ used AI tools in some form and $88\%$ had used generative AI for assessments, up sharply from a year earlier. When a model can produce an essay or solve a problem set, assessments completed unsupervised no longer show what the student can do unaided. Three responses dominate, and they are often combined.

1. **Detection.** As shown in [[llm-society/misinformation#prop-auroc]], detectors are unreliable and biased against non-native writers, and their false positives fall on individuals; many universities advised against using them as evidence on their own.
2. **Securing assessment.** In-person written exams, oral examinations ("vivas"), in-class writing and observed practical work restore confidence about who did the work, at the cost of time and of excluding the extended, researched work that coursework assesses.
3. **Redesigning assessment.** Courses specify for each assessment what AI use is permitted and assess the process — drafts, reflections, version history — as well as the product. Perkins, Furze, Roe and MacVaugh (2024) proposed an **AI Assessment Scale** with levels from "no AI" through "AI for planning", "AI collaboration" and "full AI" to "AI exploration", to be stated for each task. Several universities have adopted a "two-lane" model: secured assessments that verify unaided competence, and open assessments where AI use is allowed and expected, taught and assessed as a skill.

::: definition Validity and security of an assessment {#def-validity}
An assessment is **valid** to the extent that its results support the intended inferences about what a student knows and can do; it is **secure** to the extent that the work assessed is the student's own under the stated conditions. An unsupervised essay that AI can write remains a valid exercise for learning but no longer supports secure inferences about unaided writing ability.
:::

::: example Choosing an assessment mix {#ex-assessment}
A course has learning outcomes in (a) recalling and applying statistical methods, (b) writing a research report, and (c) critically evaluating an AI-generated analysis. Propose an assessment for each, stating the level of AI use permitted and how security and validity are achieved.
::: solution
(a) A supervised in-person exam, no AI: secure; valid for unaided application. (b) A report with permitted AI assistance for language and structure but with required submission of drafts, data and code, and a short oral discussion of the choices made: the oral component secures the inference that the student understands the work; the report itself assesses the realistic skill of producing a report with tools. (c) Students receive a flawed model-generated analysis and must identify and correct its errors, with AI use permitted: the task is valid precisely because models produce such errors, and success requires understanding. Each choice trades staff time, authenticity and security; there is no single correct design.
:::
:::

::: warning "Ban it" and "embrace it" are both incomplete policies
A blanket ban is unenforceable for unsupervised work and leaves students unprepared for workplaces where the tools are used; unconditional permission makes much coursework uninformative about learning and, as the Bastani et al. results suggest, can harm learning itself. Most institutional guidance (as of 2026) sets expectations per assessment, teaches appropriate use and its limits, and secures a subset of assessments.
:::

::: history
Fear that machines would destroy jobs is recurrent: the Luddites of 1811–16, the "automation" debate of the 1950s–60s, and Keynes's 1930 essay on "technological unemployment". Autor, Levy and Murnane (2003) introduced the task-based approach to computerisation, and Frey and Osborne's estimate (2013, published 2017) that $47\%$ of US employment was at high risk of automation provoked a decade of debate on exposure measures. After ChatGPT (November 2022), Eloundou et al. (2023) produced the first systematic LLM exposure estimates, and within a year experimental studies appeared: Noy and Zhang (2023), Brynjolfsson, Li and Raymond (2023), Dell'Acqua et al. (2023) and Peng et al. (2023). Acemoglu (2024) applied Hulten's theorem to argue for modest macroeconomic effects. In education, many schools and universities restricted ChatGPT in early 2023 and then shifted, through 2023–25, towards guidance on permitted use and assessment redesign.
:::

::: summary
- Technology changes tasks, not whole jobs. Exposure studies (Eloundou et al., 2023) find that a large share of tasks — and, unusually, higher-wage work — could be sped up by language models; exposure is technical potential, not a forecast of job loss.
- Displacement, productivity and reinstatement effects pull in different directions; language models can both automate and augment.
- Field and laboratory experiments found substantial average gains on suitable tasks — $14\%$ in customer support, $40\%$ less time in professional writing, large quality gains for consultants within the "frontier" — with the largest gains for less experienced workers; outside the frontier, or for experts in familiar codebases, performance can fall.
- Results depend on task selection, output proxies, external validity and self-reports; difference-in-differences and randomised designs have assumptions worth checking.
- Hulten's approximation, gain $\approx s\,c$, links task savings to aggregate productivity; estimates differ by an order of magnitude because $s$ and $c$ are uncertain. Measured labour-market effects through 2024–25 were small and contested.
- In education, unrestricted access can boost practice performance and reduce learning, while tutor-like designs can help. Detection is unreliable; assessment is being redesigned around security, validity and explicit levels of permitted AI use.
:::

## Exercises

::: exercise Exposure shares {level=1 check="0.45"}
An occupation has ten equally weighted tasks: three $E_1$, three $E_2$ and four $E_0$. Compute $\beta = E_1 + \tfrac12E_2$ as a fraction.
::: solution
$0.3 + 0.5\cdot0.3 = 0.45$.
:::
:::

::: exercise A difference-in-differences {level=1 check="0.5"}
Treated workers' output goes from $10$ to $12$ units a day; controls go from $10$ to $11.5$. Estimate the treatment effect in units per day, and express it as a percentage of the treated group's counterfactual.
::: solution
$\hat\tau = (12 - 10) - (11.5 - 10) = 2 - 1.5 = 0.5$ units a day. The counterfactual is $11.5$, so the effect is $0.5/11.5 = 4.3\%$, against the naive before–after figure of $20\%$.
:::
:::

::: exercise Hulten in one line {level=1 check="0.9"}
If $15\%$ of GDP-weighted tasks become $6\%$ cheaper, what is the first-order TFP gain in per cent?
::: solution
$0.15\cdot0.06 = 0.009$, i.e. $0.9\%$.
:::
:::

::: exercise Weighted average effect {level=2 check="0.142"}
In a firm, $40\%$ of agents are novices whose productivity rises by $30\%$ with an assistant, $40\%$ are mid-level (gain $10\%$) and $20\%$ are experienced (gain $0\%$). Novices have baseline productivity $2$, mid-level agents $2.5$ and experienced agents $3$. What is the proportional gain in total output? Give three decimal places, and compare it with the unweighted average of the gains.
::: solution
Total output before: $0.4\cdot2 + 0.4\cdot2.5 + 0.2\cdot3 = 0.8 + 1.0 + 0.6 = 2.4$. Added output: $0.4\cdot2\cdot0.3 + 0.4\cdot2.5\cdot0.1 = 0.24 + 0.10 = 0.34$. Gain $0.34/2.4 = 0.142$. The average of individual gains, $0.4\cdot0.3 + 0.4\cdot0.1 = 0.16$, is larger, because the largest gains go to the least productive workers. Studies report one or the other, and they are not interchangeable.
:::
:::

::: exercise Interpreting the jagged frontier {level=2}
In Dell'Acqua et al. (2023), consultants using GPT-4 did better on most tasks and worse on one designed to be outside the model's capabilities. Explain why the losses outside the frontier may be more important for organisations than the averages suggest, and propose two practices to reduce them.
::: solution
Outside the frontier the model gives a confident, plausible, wrong answer, and users who have learned to trust it inside the frontier accept it; the errors are correlated (many users make the same mistake) and invisible until consequences appear, while gains inside are spread thinly. Practices: (1) verification steps targeted at tasks with unknown or verified-weak model performance (checklists, a second human review, comparison with source data); (2) internal evaluations that map which tasks lie inside the frontier for current models, revised as models change, and training staff to recognise warning signs (novel data, numerical reasoning over documents, tasks where the model cannot see all relevant information).
:::
:::

::: exercise Self-reports and measurement {level=2}
In the METR study, developers expected AI tools to make them $24\%$ faster, estimated afterwards that they had been $20\%$ faster, and were measured as $19\%$ slower. Give three reasons why perceived and measured time could diverge, and explain what this implies for survey-based estimates of time saved.
::: solution
Reasons include: (1) waiting for and reviewing model output feels less effortful than writing code, so it is perceived as shorter; (2) memorable successes (instant boilerplate) dominate recollection over diffuse costs (debugging subtle errors, context-switching); (3) expectations colour self-assessment (the developers believed the tools helped). Survey estimates of time saved may therefore be biased, in an unknown direction that may differ by task and user; they should be validated against measured outcomes where possible.
:::
:::

::: exercise Compression and its limits {level=3}
In the listing, the treated group's top-to-bottom tercile ratio fell from $1.32$ to $1.10$. Derive, for the model's parameters (baseline $2 + e$, gain $0.35(1 - e)$, with $e$ uniform), the expected productivity at $e = 1/6$ and $e = 5/6$ (the tercile midpoints) with and without the assistant, ignoring noise, and the resulting ratios. Then discuss two mechanisms by which within-firm compression could coexist with worse outcomes for novice workers in the labour market.
::: solution
Without assistance: $2.167$ and $2.833$, ratio $1.31$. With: $2.167\cdot(1 + 0.35\cdot5/6) = 2.167\cdot1.292 = 2.799$; $2.833\cdot(1 + 0.35/6) = 2.833\cdot1.058 = 2.999$; ratio $1.07$. These are close to the simulated $1.32$ and $1.10$ (the simulation averages over terciles and includes noise). Mechanisms: (1) if the tasks novices do while learning are the ones the model does, firms may hire fewer novices, so those who are hired gain but fewer are hired — the pattern Brynjolfsson, Chandar and Chen (2025) suggested in early-career employment; (2) if novices' learning slows because the model supplies answers (as in the education results of Bastani et al.), they may plateau, and the compression may reverse when the tool fails or the work changes. Wage effects also depend on whether firms pay for the higher output or capture it.
:::
:::

::: exercise A macro sensitivity analysis {level=3}
Using [[#prop-hulten]], suppose the share $s$ of affected tasks is uncertain and uniformly distributed on $[0.02, 0.2]$ and the cost saving $c$ is independent and uniform on $[0.1, 0.4]$. Compute the expected TFP gain $\E[sc]$ and the probability that the gain exceeds $3\%$. Write a short standard-library Python simulation to check your answer.
::: solution
By independence $\E[sc] = \E s\,\E c = 0.11\cdot0.25 = 0.0275$, about $2.75\%$. For $P(sc > 0.03)$: for each $c$, $s > 0.03/c$; integrate: $P = \frac{1}{0.3}\int_{0.15}^{0.4}\frac{0.2 - 0.03/c}{0.18}\,dc$ (for $c < 0.15$, $0.03/c > 0.2$, impossible). The integral is $0.2\cdot0.25 - 0.03\ln(0.4/0.15) = 0.05 - 0.02942 = 0.02058$; dividing by $0.3\cdot0.18 = 0.054$ gives $P = 0.381$.

```python
import random
rng = random.Random(1)
xs = [rng.uniform(0.02, 0.2) * rng.uniform(0.1, 0.4) for _ in range(200000)]
print(round(sum(xs) / len(xs), 4), round(sum(x > 0.03 for x in xs) / len(xs), 3))
```

```text
0.0275 0.382
```

The simulation agrees. The exercise illustrates that even a simple model with honest uncertainty about its inputs produces a wide distribution of outcomes.
:::
:::
