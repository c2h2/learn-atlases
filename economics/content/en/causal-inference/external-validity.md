A well-identified estimate answers a local question: the effect of this treatment, on these people, in this place, at this time, for the margin the design moves. **External validity** is the question of whether that answer travels — to a different population, a different implementation, a different year, a scaled-up programme. Internal validity without external validity is a precise answer to a question nobody asked; external validity without internal validity is a confident answer to the wrong number.

The "credibility revolution" (Angrist and Pischke 2010) shifted applied economics towards designs that make internal validity arguable: experiments, IV, DID, RD, synthetic control. It did not end disagreement about minimum wages, training programmes, or deworming, because those disagreements are in large part about *which* internally valid estimate is the relevant one, and about how far it generalises. This chapter is the toolkit for that second argument: heterogeneous effects and the margins each design identifies, transportability, site selection, replication and pre-registration, and the use of evidence in policy. It is also a chapter about the limits of the toolkit. Some questions — the effect of a national institution, a once-only macro shock, a general-equilibrium price change — are not local, and a local design does not become a national design by being well identified.

## Internally valid for whom?

Every estimand in this course is an average over a *population of units* and a *margin of treatment*.

| Design | Typical estimand | Whose effect |
|---|---|---|
| RCT, full compliance | ATE in the experimental sample | People in the trial |
| RCT, one-sided non-compliance | ATT (TOT) | People who take up when offered |
| IV / fuzzy RD | LATE | Compliers, at the instrument's margin |
| Sharp RD | ATE at $c$ | Units at the cutoff |
| DID | ATT on the treated group in the post-period | The adopting units, in those years |
| Synthetic control | $\tau_{1t}$ | The one treated unit |

::: definition Internal validity {#def-iv-int}
An estimate is **internally valid** for an estimand $\tau_S$ in a source setting $S$ if the design's identifying assumptions hold in $S$, so that $\hat\tau$ is consistent (or unbiased) for $\tau_S$. Internal validity is always *relative to a stated estimand*: an IV can be internally valid for a LATE and internally invalid for the ATE, in the same sample.
:::

::: definition External validity {#def-ev}
An estimate $\hat\tau$ of an internally valid estimand $\tau_S$ in a source setting $S$ is **externally valid** for a target setting $T$ if $\tau_S = \tau_T$, or more usefully if a stated mapping (reweighting, a structural model, a bounded extrapolation) takes $\tau_S$ to $\tau_T$. **Transportability** (Pearl and Bareinboim) is the graphical version: which additional assumptions let a causal effect computed in $S$ be used in $T$.
:::

The table already says that $\tau_S$ is not "the" effect of treatment. A draft-lottery LATE is the effect of military service on men who serve because they were drafted. It is not the effect of an all-volunteer force, and it is not the effect of service on always-takers who would have enlisted anyway. Using it as an input to a different policy is a transport problem, not a sampling-error problem.

::: proposition Heterogeneous effects break naive transport {#prop-het}
If $\tau_i$ varies with $X_i$ or with unobservables, then $\tau_S = \E[\tau_i \mid i \in S]$ equals $\tau_T = \E[\tau_i \mid i \in T]$ only if the distribution of those effect-modifiers is the same in $S$ and $T$, or if the differences happen to average out. Reweighting the source sample to the target distribution of *observed* $X$ recovers $\tau_T$ if (i) $\tau(x)$ is identified in $S$ for all $x$ in the support of $T$, and (ii) there is no unobserved modifier whose distribution differs. Overlap in $X$ between $S$ and $T$ is required; it is the external-validity cousin of the overlap in [[causal-inference/selection-on-observables#def-cia]].
:::

::: proof
Write $\tau_T = \E_T[\tau(X_i)]$. If $\tau(x)$ is identified in $S$ for every $x$ in the support of $T$, then $\E_T[\tau(X)] = \E_S\bigl[\tau(X) \cdot \tfrac{dP_T}{dP_S}(X)\bigr]$, which is a reweighting of the source. If some $x$ in $T$ is absent from $S$, $\tau(x)$ is not identified in $S$ and must be extrapolated. If $\tau$ also depends on an unobserved $U$ whose distribution differs between $S$ and $T$ given $X$, the reweighting of $X$ is not enough. That is the same unconfoundedness-plus-overlap logic as identification, applied to *settings* rather than to treatment.
:::

Hotz, Imbens and Mortimer (2005) is an early econometric treatment of transporting experimental estimates; Stuart et al. (2011) and Kern et al. (2016) are textbook statements in statistics. In development, Pritchett and Sandefur (2015) argue that a biased-but-local observational estimate can have smaller mean squared error for a target country than an unbiased RCT from a different country, if heterogeneity across places is large. That claim is controversial — it trades a known internal-validity problem for a hoped-for external-validity gain — but the MSE arithmetic is the right way to pose the question.

::: example Two sites, one estimate {#ex-two-sites}
A training RCT in site $A$ has ATE $8$ (standard error $1$). In site $B$, no trial is run; $B$'s trainees have a different mix of $X$ (older, more rural). In $A$, the ATE was $12$ for rural trainees and $4$ for urban ones, each half the sample. Site $B$ is $80$ percent rural. Assuming $\tau(x)$ is the same in $A$ and $B$ and that rural/urban is the only modifier, what is the transported ATE for $B$?
::: solution
$\tau_B = 0.8 \times 12 + 0.2 \times 4 = 10.4$. The unweighted $8$ from $A$ would understate $B$'s ATE because $B$ has more of the high-effect group. If rural/urban is *not* the only modifier — if $B$'s rural labour market is also weaker — $10.4$ is still the wrong number, and no reweighting of $A$'s data will find the right one. That is [[#prop-het]](ii).
:::
:::

::: widget plot
f: 4 + 8*x; 4 + 8*x + s
sliders: s=0:-4:4
x: 0, 1
y: 0, 16
labels: \tau(x)\text{ in }S; \tau(x)\text{ in }T
caption: Treatment-effect heterogeneity in an observed $x$ (share rural, say). Reweighting the source $S$ to the target $T$'s distribution of $x$ recovers $\tau_T$ only if the two curves coincide ($s = 0$). Move $s$ to give $T$ a different $\tau(x)$: the same $x$-mix then produces a different ATE, and transport on $x$ alone fails.
:::

## Site selection, scale and equilibrium

Even when $\tau(x)$ is stable, three other gaps between $S$ and $T$ are common.

**Site selection.** Experiments are run where implementing partners are willing, which is often where the programme already looks promising. Allcott (2015) showed that the first US utilities to partner on a home-energy-report RCT had larger treatment effects than later, more representative utilities; extrapolating from the first wave overstated national effects. Vivalt (2020) documents substantial heterogeneity across development-programme RCTs, with implications for how much one trial should move a policymaker's prior.

**Scale and general equilibrium.** A trial that treats $200$ people does not change wages, prices or congestion. A national programme might. Heckman, Lochner and Taber (1998) is the classic warning for education: the return to schooling in a small intervention is not the return to a large increase in the stock of educated labour. Spillovers that were SUTVA violations in the trial (Miguel and Kremer's deworming externalities) can become *part of the estimand* at scale, of either sign: treated farmers' new seed helps neighbours (a bonus) or floods the local market (a penalty). Crépon et al. (2013), in a job-placement experiment in France, found that gains for the treated came partly at the expense of untreated jobseekers in the same labour market — a displacement effect visible only because the design randomised at two levels.

**Implementation.** The NGO that ran the pilot is not the ministry that will run the scale-up. Bold et al. (2018), studying contract-teacher programmes in Kenya, found large effects when an NGO implemented and much smaller effects when the government did. Internally, both estimates can be valid; they are estimates of different treatments.

::: example Site selection in a table {#ex-sites}
Four candidate sites have true ATEs $2, 4, 6, 10$. An NGO picks the site with ATE $10$ for a trial, estimates $\hat\tau = 10$ (precise), and a ministry uses $10$ as the national mean. What is the transport error, and how would a multi-site trial of all four, with $n$ split equally, change the report?
::: solution
The national mean ATE is $(2+4+6+10)/4 = 5.5$. Transport error is $10 - 5.5 = 4.5$, larger than many sampling errors in this course's examples. A multi-site trial estimates each site's ATE (noisier per site) and can report both the unweighted mean $5.5$ and the $\tau(x)$ pattern. It does not eliminate heterogeneity; it *measures* it. Allcott's (2015) point is that the first site is not a random draw from this list.
:::
:::

::: example Implementation gap {#ex-impl}
Bold et al. (2018) found large test-score effects of contract teachers in Kenya when an NGO ran the programme and much smaller effects when the government ran the same design. Which $\tau$ is internally valid, and which is the relevant $\tau_T$ for a national scale-up?
::: solution
Both can be internally valid: they are ATEs for two different treatments (NGO-run contract teachers versus government-run). For a national scale-up by the ministry, $\tau_T$ is the government-run effect. Using the NGO estimate is a transport failure of the implementation kind, not a failure of randomisation in the NGO trial. A useful report states both numbers and labels the treatments.
:::
:::

::: example From LATE to a mandate {#ex-mandate}
A draft-lottery LATE on earnings is $-15$ percent for white men who served because they were drafted. A government considers a *voluntary* enlistment bonus aimed at always-takers. Why is $-15$ percent the wrong input?
::: solution
Always-takers serve without the draft; the LATE is silent about them. Their $\tau_i$ could be smaller (they selected into a job they wanted) or larger. A bonus aimed at them is a different margin, a different $D$, and a different population. The internally valid $-15$ percent is the wrong $\tau_T$. A design that identifies the effect of *voluntary* service (for example, a bonus lottery) would be the matching estimand; in its absence, the honest statement is that the draft-lottery LATE does not answer the bonus question.
:::
:::

::: warning The "we already have an RCT" reflex
An RCT in Kenya is internally valid for that Kenyan sample and that implementation. It is not automatically better evidence for a policy in Lagos or in Louisiana than a well-designed DID in those places. The ranking depends on the size of the internal bias in the local study versus the size of the transport error from the RCT. Saying this is not a licence to ignore identification. It is a licence to *add* an external-validity term to the error budget.
:::

## Replication, pre-registration and the file drawer

Internal validity in a single study is not the same as a reliable literature.

The Open Science Collaboration (2015) attempted to replicate $100$ experimental and correlational studies in psychology; $36$ percent of the replications had significant results, versus $97$ percent of the originals, and effect sizes were about half. Camerer et al. (2016) replicated $18$ laboratory experiments in economics: $11$ of $18$ ($61$ percent) found a significant effect in the same direction, with effects on average $66$ percent as large. Camerer et al. (2018) on social-science experiments published in *Nature* and *Science* found a similar deflation. Economics field experiments have not been subjected to a comparable systematic replication; the "worm wars" re-analysis of Miguel and Kremer (2004) — Aiken et al. (2015) and subsequent replies — is the closest public argument, and it is in part an argument about external validity and cost-effectiveness as well as about the original tables.

Three institutional responses, now increasingly required by journals and funders:

**Pre-registration and pre-analysis plans.** The primary outcome, the subgroups, and the estimator are written down before $Y$ is seen. This does not prevent exploratory analysis; it labels it. In development, the AEA RCT Registry and 3ie play this role. Pre-registration does not fix a bad design, and a vague pre-analysis plan does not bind.

**Publication of nulls and of standard errors.** A literature of only significant results overstates typical effects (type M error, Gelman and Carlin 2014) and understates the share of programmes that do nothing. Registered reports, which accept a paper on the design before results exist, are a partial remedy.

**Replication and robustness.** Reproduction (same data, same code) is a lower bar than replication (new sample). Both belong in a credible literature. For observational designs, specification curves (Simonsohn, Simmons and Nelson 2020; a multiverse of reasonable DID or IV specifications) make the researcher-degree-of-freedom problem visible.

::: quiz
A published RCT reports a significant 0.3 sd effect on test scores, $n = 80$ per arm, $20$ outcomes tested, no pre-analysis plan. A replication with $n = 800$ per arm, one pre-registered outcome, finds $0.04$ sd (not significant). The most careful reading is
- [ ] the replication must be wrong, because the original was randomised
- [x] the original was likely underpowered and selected on significance; the replication is better evidence for the ATE in a similar sample, and neither speaks automatically to a different country
- [ ] $0.3$ and $0.04$ should be averaged, unweighted
- [ ] randomisation guarantees that the first study's $0.3$ is the ATE everywhere
::: solution
Randomisation identifies the ATE in the original sample, but with $n=80$ and $20$ outcomes the significant $0.3$ is a recipe for exaggeration. The replication's $0.04$ is the more credible estimate of that ATE. Transport to a different country is a further step that neither study has taken. Unweighted averaging of $0.3$ and $0.04$ would mix a noisy selected estimate with a precise one.
:::
:::

## The credibility revolution, and its critics

Angrist and Pischke (2010), "The Credibility Revolution in Empirical Economics", argued that applied microeconomics had shifted from identifying assumptions that were convenient for a model to identifying assumptions that a research *design* could make plausible, with the five designs of this course as the core. The 2019 and 2021 Nobel Prizes (Banerjee, Duflo, Kremer; Card, Angrist, Imbens) are the official history of that shift.

The critics are not mainly arguing that identification does not matter. They are arguing about what is lost.

**Deaton (2010, 2020) and Heckman.** Experiments and LATEs answer a narrow question and can distract from the mechanisms and general-equilibrium effects that policy needs. A well-identified LATE on a peculiar complier group may be less useful than a more structural estimate of a policy-invariant parameter, if the structure is even roughly right. The counter is that a badly identified structural parameter is not more useful for being structural; the two methods are complements when the structure is used to *transport* a well-identified local effect, not to replace it.

**External validity as the binding constraint.** Pritchett, Sandefur, Vivalt, and others: once internal validity is "good enough", heterogeneity across contexts dominates the error. The implication they draw — more local evidence, even if slightly less clean; more multi-site trials; more reporting of $\tau(x)$ — is now widely accepted even by experimenters. The implication some draw — that identification is therefore second-order — is not.

**Questions the designs do not reach.** The causal effect of the Federal Reserve's mandate, of China's growth, of the Industrial Revolution, cannot be randomised or cut off at a threshold. Economic history and macroeconomics use other tools (narrative identification, DSGE, synthetic control for a single country) whose assumptions are of a different kind. The credibility revolution did not abolish those questions. It raised the bar for the questions it *can* reach, which is most of applied micro.

::: application Using evidence in policy
A ministry considering a cash-transfer programme has: a local observational study with a thin $X$; a well-identified RCT from another country; a DID from a neighbouring region with a short pre-period. There is no algorithm that ranks these without value judgements about which bias is worse. A reasonable report states each estimand, each threat, and the $\tau(x)$ that would make them agree or disagree. Cost-effectiveness (Dhaliwal et al. at J-PAL; the "marginal value of public funds" of Hendren and Sprung-Keyser 2020) then asks a different question: given a *stated* effect, how much outcome per unit of public expenditure? That arithmetic is not a substitute for the causal estimate, and it is not investment advice; it is a way of putting several internally valid estimates on a common scale for a budget officer who has to choose.
:::

::: intuition What the five designs have in common
Each design finds a comparison in which $Y(0)$ for the treated can be read from someone else's $Y$. The experiment reads it from the control arm; selection on observables from units with the same $X$; IV from the comparison of assignment groups, rescaled by take-up; DID from the comparison group's *change*; RD from the other side of the cutoff; synthetic control from a weighted twin. External validity is the extra claim that the $\tau$ attached to that comparison is the $\tau$ attached to yours. The designs make the first claim arguable. They do not make the second one free.
:::

::: history
**2010, Joshua Angrist and Jörn-Steffen Pischke.** "The Credibility Revolution in Empirical Economics: How Better Research Design is Taking the Con out of Econometrics" (*Journal of Economic Perspectives*) named the shift toward design-based identification and set the syllabus this course has followed.

**2010, Angus Deaton.** "Instruments, Randomization, and Learning about Development" (*Journal of Economic Literature*) is the leading critique: LATEs and RCTs identify narrow, context-specific effects and can crowd out the study of mechanisms and of large, un-randomisable questions.

**2015–2018, replication projects.** The Open Science Collaboration (psychology, 2015) and Camerer et al. (economics laboratory, 2016; *Nature*/*Science* social-science experiments, 2018) documented systematic shrinkage of published experimental effects and accelerated the adoption of pre-registration.

**2019 and 2021, Nobel Prizes.** Banerjee, Duflo and Kremer (2019) for experimental development economics; Card, Angrist and Imbens (2021) for natural experiments and the LATE theorem. The two prizes together are the public history of the methods in this course — and, in the debates that followed each, of the external-validity unfinished business.
:::

## Where this leads

The course stops here; the applications do not. [[labour-economics]] uses these designs for the returns to schooling, the minimum wage, discrimination and migration. [[development-economics]] uses them for education, health, credit and aid, and is the field in which the RCT-versus-structural and internal-versus-external arguments have been loudest. [[public-economics]] uses them for taxes, transfers and social insurance. A design is a means. The economic question — whose $Y(1)$ and $Y(0)$, under what intervention, at what scale — still comes first.

::: summary
- Internal validity is "right estimand, right assumptions, in this sample". External validity is whether that estimand is the one the target setting needs ([[#def-ev]]). They are not substitutes.
- Every design in this course identifies an average for a specific population and margin. Heterogeneous $\tau_i$ means naive transport fails; reweighting on $X$ works only with overlap and no unobserved modifiers ([[#prop-het]]).
- Site selection, scale (general equilibrium, spillovers) and implementation can dwarf sampling error. An RCT at the wrong site is the wrong number for national policy.
- Pre-registration, publication of nulls, and replication reduce exaggeration. Underpowered significant results are biased upward even when the design is randomised.
- The credibility revolution raised the bar for identification in applied microeconomics. It did not abolish questions that no local design can answer, and it did not make external validity free. Report $\tau$, the people it applies to, and the assumptions under which it would apply to someone else.
:::

## Exercises

::: exercise Name the estimand {level=1}
A fuzzy RD at a scholarship cutoff of $70$ finds $\hat\tau = 0.2$ extra years of college. A ministry wants the effect of offering the scholarship to students who score $90$. Why is $0.2$ the wrong number, even if the RD is internally perfect?
::: solution
The RD LATE is the effect at $70$, for students whose take-up is switched by crossing $70$. Students at $90$ are a different population (higher $R$, probably higher $Y(0)$) and may already take up college without the scholarship (never-takers of a different sort). Transport from $c=70$ to $c=90$ needs an extra assumption on $\tau(r)$, which the RD does not provide.
:::
:::

::: exercise Reweight {level=1 check="10.4"}
In [[#ex-two-sites]], what is the transported ATE for site $B$? (Enter one decimal place.)
::: solution
$0.8 \times 12 + 0.2 \times 4 = 9.6 + 0.8 = 10.4$.
:::
:::

::: exercise Complier mismatch {level=1}
An IV estimate of the return to an extra year of school, using a compulsory-leaving-age reform, is $0.10$. A university dean uses $0.10$ as the return to the third year of a degree. What went wrong?
::: solution
The compliers are people whose schooling is moved by the leaving-age law, typically at the low end of the education distribution. The dean's margin is a different year, for different people. LATE is not the ATE, and it is not the return at a different margin. (Oreopoulos 2006, by contrast, studies a reform that moved a large share of a cohort and is closer to an ATE; that is a different instrument.)
:::
:::

::: exercise Allcott's lesson {level=2}
Explain, in the language of [[#prop-het]], why the first-wave energy-conservation RCTs in Allcott (2015) overstated the national ATE.
::: solution
The first partner utilities were a selected $S$: sites where the programme was expected to work, or where the partner was enthusiastic. If $\tau(x)$ is larger at those sites (more room to cut usage, more engaged customers), then $\tau_S > \tau_T$ for a national target $T$ that includes less promising utilities. Reweighting on observed $X$ helps only to the extent that the selection is on those $X$. Allcott's later-wave estimates are the closer estimate of $\tau_T$. Site selection is selection on the *setting*, the external-validity analogue of selection on treatment.
:::
:::

::: exercise Displacement {level=2}
Crépon et al. (2013) found that job-placement assistance raised the treated's employment but lowered the untreated's employment in the same market. If a ministry scales the programme to *everyone* in the market, is the trial's ATT a good guide? What estimand would be?
::: solution
No. The trial's ATT includes a gain that, at full scale, cannot come from displacing untreated jobseekers, because there are none left to displace. The relevant estimand is the effect on *market-level* employment, which the two-level randomisation (some markets treated more heavily) is designed to speak to, and which was smaller. Scaling a partial-equilibrium ATT is a transport failure of the general-equilibrium kind.
:::
:::

::: exercise File drawer, a calculation {level=2}
True ATE $= 0.1$, $\mathrm{se} = 0.1$ in every study (so power against $0$ is low). Studies are published only if $|\hat\tau/\mathrm{se}| > 1.96$. Roughly, what is the expected published $\hat\tau$ among significant studies? (A sketch, not a formal integral, is enough.)
::: hint
Significant estimates are those with $\hat\tau > 0.196$ (or $< -0.196$). The distribution of $\hat\tau$ is approximately $N(0.1, 0.1^2)$.
:::
::: solution
$\hat\tau \sim N(0.1, 0.1^2)$. The $5$ percent critical value is $0.196$. Most of the mass that clears $0.196$ lies just above it, with a tail to the right; the left tail (significantly negative) is tiny because the true mean is positive. The expected value *conditional on* $\hat\tau > 0.196$ for a $N(0.1, 0.1^2)$ random variable is on the order of $0.25$–$0.30$ (the mean of a truncated normal). Published effects are therefore two to three times the truth. That is Gelman and Carlin's type-M error, and it is why underpowered significant results cannot be averaged, unadjusted, as if they were unbiased.
:::
:::

::: exercise Overlap between settings {level=3}
A trial in $S$ has $X \in [0, 1]$ (an eligibility score). The target population $T$ has $X \in [0.8, 2]$. Which part of $\tau_T = \E_T[\tau(X)]$ is identified by reweighting $S$, and what extra assumption would identify the rest?
::: solution
Reweighting identifies $\E[\tau(X) \mid X \in [0.8, 1]]$ in $T$ — the part of $T$ that overlaps $S$. The part with $X \in (1, 2]$ has no counterpart in $S$; $\tau(x)$ there is unidentified without extrapolation (for example, a linear $\tau(x)$, or a bounded slope as in Rambachan and Roth-type restrictions). Overlap between *settings* is as necessary for transport as overlap between treated and control is for identification.
:::
:::

::: exercise A policy memo {level=3}
You have three estimates of a job-training ATT, in the same units of annual earnings: (i) a local RCT, $n=200$, $\hat\tau = 1{,}200$ (se $800$), one site, NGO-run; (ii) a DID in your country, $20$ regions, $\hat\tau = 400$ (se $200$), pre-trends a bit noisy; (iii) an IV from another country using a lottery, LATE $= 2{,}000$ (se $400$), compliers are young urban men. Write six to eight sentences a budget officer could use, without recommending a programme.
::: solution
The three numbers are not estimates of the same estimand. (i) is an ATE (or TOT) for people who took an NGO-run course in one site, and it is too imprecise to distinguish $0$ from $2{,}000$. (ii) is an ATT for regions that adopted a government programme in your country; the design is the closest in *setting*, but parallel trends is not clean. (iii) is a LATE for young urban male compliers with a lottery in another country, and is the most precise, but it is the furthest in population, margin and implementation. A scale-up of a government programme in your country looks more like (ii) than like (i) or (iii), so $400$ is the least-bad central number *for that policy*, with a wide band that includes $0$ and that should be widened further for general-equilibrium and implementation gaps that none of the three studies measures. Cost per participant then belongs next to that band; a large cost with a central effect of $400$ and a band that includes $0$ is a different decision from a small cost with the same band. The officer is choosing under uncertainty about $\tau$, not under a known $\tau = 1{,}200$.
:::
:::

::: exercise Deaton's critique, stated fairly {level=3}
State Deaton's (2010) main objection to treating RCTs and LATEs as the gold standard for development policy, and state the best reply from the design-based side, without declaring a winner.
::: solution
Deaton's objection: an RCT or a LATE identifies a local, often peculiar, average that may not be the parameter a policymaker needs (a mechanism, a general-equilibrium elasticity, an effect on never-takers); the prestige of "clean identification" can crowd out theory and out questions that cannot be randomised; and external validity is not a secondary afterthought but the whole point of learning from one place for another. The design-based reply: a parameter that is not identified is not more useful for being the one the policymaker wanted; structure is most credible when it is used to transport or interpret a well-identified local effect (a LATE plus a model of who compliers are) rather than to replace identification; and the right response to external-validity failures is more sites, more reporting of $\tau(x)$, and more humility about scale, not a return to unidentified regressions. Both sides agree that a well-identified estimate of the wrong estimand is a problem; they disagree about how often the locally identified estimand *is* the wrong one, and about how much structure one should add to move it.
:::
:::
