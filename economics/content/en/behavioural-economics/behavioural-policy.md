When a US firm switched its $401(\mathrm{k})$ from opt-in enrolment to automatic enrolment, participation among new hires rose from $49\%$ to $86\%$ (Madrian and Shea 2001, *Quarterly Journal of Economics*). When European countries are classified by whether organ-donation registers are opt-in or opt-out, effective consent rates sit near $15\%$ in the first group and near $90\%$ in the second (Johnson and Goldstein 2003, *Science*). The two facts are the most famous applied results in behavioural economics, and they are the reason this course ends with policy. They are also the beginning of an argument, not the end of one. A default that raises enrolment is a positive finding. Whether the extra enrollees are better off, whether the same tool works at scale, and whether a planner is entitled to pick the default are welfare, empirical and ethical questions, and the answers are disputed.

This chapter takes those questions in order. It defines a **nudge** and **choice architecture**, reviews the leading field results, including the live dispute over a single “nudge effect”, and then turns to behavioural welfare economics — Bernheim and Rangel’s choice-based criterion, the critics of “preference purification”, and the ethics of paternalism. The chapter describes policies and published estimates. It does not recommend a pension, a savings rate, a mortgage, a diet or a default for the reader.

## Choice architecture and nudges

Thaler and Sunstein (2008) called the environment in which a choice is made the **choice architecture**, and called a small change in that environment that does not forbid options or change material incentives much a **nudge**. The definition is a cluster, not a sharp set: a default is a nudge; a graphic warning is a nudge; a $1$ incentive is not; a ban is not. Sunstein (2014) later emphasised **libertarian paternalism**: the planner tries to make the chooser better off *by the chooser’s own lights*, while leaving every option open.

::: definition Nudge and choice architecture {#def-nudge}
The **choice architecture** of a decision is the set of defaults, frames, menus, reminders and salience cues in which the decision is taken. A **nudge**, in Thaler and Sunstein’s usage, is a change in the architecture that does not meaningfully change the chooser’s feasible set or material payoffs and that is expected to move the choice in a predictable direction. A **default** is the option that is implemented if the chooser does nothing.
:::

Two mechanisms already in this course produce default effects. Present bias ([[behavioural-economics/present-bias]]): opting out has an immediate cost and a delayed benefit, so a $\beta < 1$ agent postpones. Inattention ([[behavioural-economics/limited-attention]]): the default is the option that does not have to be seen. Social preferences and prospect theory can add a third: the default is coded as the reference point, and leaving it is a loss. The three mechanisms are not identified from the enrolment rate alone, and they disagree about welfare. A present-biased sophisticate may *want* the default as a commitment. An inattentive agent who is roughly indifferent may be unharmed either way. A present-biased naif who would have opted in tomorrow, and never does, is the case in which the default has a welfare argument attached.

::: proposition A default as a present-biased cost {#prop-default}
Suppose opting out of a default $D$ into an alternative $A$ has an immediate effort cost $c > 0$ and a delayed (one-period) utility gain $\Delta u > 0$ if $A$ is better for the agent, and a delayed loss if $D$ is better. A $\beta$–$\delta$ agent with $\delta = 1$ opts out at date $0$ if and only if $\beta \Delta u > c$ when $A$ is better, and never opts out when $D$ is better. An exponential agent ($\beta = 1$) opts out whenever $\Delta u > c$. If $c$ is small but $\beta \Delta u < c < \Delta u$, the $\beta$–$\delta$ agent stays at a worse default that the exponential agent would leave.
:::
::: proof
Opting out yields $-\,c + \beta \Delta u$ if $A$ is better, and $-\,c + \beta (-\lvert\Delta u\rvert)$ if $D$ is better. The second quantity is negative, so she stays at a better default. The first is positive iff $\beta \Delta u > c$. Setting $\beta = 1$ gives the exponential rule $\Delta u > c$. The interval $\beta \Delta u < c < \Delta u$ is non-empty for $\beta < 1$ and $c$ in between, which is the claimed inertia at a worse default.
:::

The proposition is a mechanism, not a welfare theorem. It says when a default sticks. It does not say that the planner knows which of $A$ and $D$ is better, which is the next section’s problem.

::: example Two enrolment regimes {#ex-madrian}
In a stylised Madrian–Shea comparison, $49\%$ of new hires enrol under opt-in and $86\%$ under automatic enrolment. Take the $37$ percentage-point gap as the default effect. Under [[#prop-default]] with a common $c$ and heterogeneous $\Delta u$, which group of agents is moved by the switch, and which two groups are not? Why is $86\%$ not “the share who want to be in the plan”?
::: solution
Agents with $\beta \Delta u > c$ enrol under either default (they opt into an opt-in regime and stay in an opt-out regime). Agents with $\Delta u$ negative and large enough that even $\beta = 1$ would not pay $c$ to join, stay out under either regime. The switch moves the in-between group: $\beta \Delta u < c$ but $\Delta u$ may be positive — people for whom the immediate cost of opting in (or out) exceeds the discounted benefit. The $86\%$ is the share who are in the plan *given that default*, not the share whose $\Delta u > 0$. Some of the $86\%$ are there because leaving costs $c$ today; some of the $14\%$ are out because joining costs $c$ today. Revealed enrolment is not revealed preference once $c$ and $\beta$ are in the model.
:::
:::

::: example Organ-donation registers {#ex-organs}
Johnson and Goldstein (2003) reported effective consent rates of about $4$–$28\%$ in opt-in European countries and about $86$–$100\%$ in opt-out countries, and a laboratory choice of $42\%$ (opt-in), $79\%$ (neutral, no default) and $82\%$ (opt-out). Which two comparisons in those numbers isolate a default effect, and which comparison does *not*, because other institutions differ? Why is a consent-rate gap not the same object as a transplant-rate gap?
::: solution
The laboratory $42\%$ versus $82\%$ isolates the default, because the menu and the information were held fixed. The cross-country $4$–$28\%$ versus $86$–$100\%$ does *not* isolate it: countries differ in hospitals, law, and culture. The laboratory $79\%$ versus $82\%$ is the smaller gap between a neutral prompt and an opt-out default. Consent is a register entry; transplants depend on medical suitability, family veto, and logistics. A planner who cites Johnson and Goldstein for a transplant target is jumping a step the data do not take. The laboratory comparison is still a default effect, of the same family as Madrian and Shea.
:::
:::

::: example Active choice {level=1} {#ex-active}
Carroll, Choi, Laibson, Madrian and Metrick (2009) compared opt-in, automatic enrolment, and a regime that *required* an active decision (no default). Enrolment under active choice sat between the two defaults. In the language of [[#prop-default]], who is forced to pay $c$ in each regime, and why does active choice not coincide with either default?
::: solution
Opt-in charges $c$ to those who want in; automatic enrolment charges $c$ to those who want out; active choice charges $c$ to *everyone* (or, more precisely, charges $c$ as a condition of completing the hiring paperwork, so $c$ is paid in both directions). People with $\beta \Delta u > c$ enrol under all three. People with $\Delta u < 0$ and $|\beta \Delta u| > c$ stay out under all three. The in-between group, who would not pay $c$ to move, are in under automatic enrolment, out under opt-in, and split under active choice according to whether, once forced to pay $c$ anyway, $\Delta u > 0$. Active choice therefore sits between the two defaults, which is what Carroll et al. found. It is a different architecture, not a “true preference” oracle, because forcing everyone to pay $c$ still selects on $\Delta u$, not on a frame-free ranking.
:::
:::

::: example A reminder as added architecture {#ex-reminder}
A tax authority sends a reminder letter that raises on-time payment by $1.4$ percentage points in a population of one million, at a postage-and-processing cost of $0.4$ per letter, and each extra on-time payment is worth $20$ of administrative saving (illustrative numbers, not a forecast). Does the letter pass a narrow cost–benefit test on those numbers? Which costs does that test omit, and which of those omissions is an ethical cost rather than a resource cost?
::: solution
Extra on-time payments: $0.014 \times 1\,000\,000 = 14\,000$. Administrative saving: $14\,000 \times 20 = 280\,000$. Cost: $1\,000\,000 \times 0.4 = 400\,000$. The letter *fails* the narrow test ($280\,000 < 400\,000$). If the effect were $8.7$ percentage points (the academic mean in DellaVigna and Linos), extra payments would be $87\,000$ and saving $1.74$ million, and the letter would pass. The test omits annoyance, any crowding-out of future attention, and the planner’s opportunity cost. The ethical omission is whether a letter that works partly because it is read as a threat, or that is not transparent about why the recipient was targeted, is a cost in autonomy rather than in postage. The arithmetic of $1.4$ versus $8.7$ is why the live dispute over effect sizes is a budget question as well as a scientific one.
:::
:::

::: quiz
DellaVigna and Linos (2022) found average effects of $8.7$ percentage points in academic nudge papers and $1.4$ in at-scale nudge-unit trials. The most defensible reading is
- [ ] nudges do not work
- [ ] nudges have a medium effect (Cohen’s $d \approx 0.45$) at scale
- [x] published academic means overstate at-scale effects, while defaults in administrative data remain a large, replicated instrument
- [ ] publication bias has been ruled out
::: solution
The factor-of-six gap is the paper’s finding; Maier et al. (2022) and Szaszi et al. (2022) add that a grand-mean $d$ is the wrong object and that publication bias is a live issue, not a settled one. Defaults (Madrian and Shea; Chetty et al.) are a different, larger, well-replicated instrument. “Do not work” and “$d \approx 0.45$ at scale” are both too coarse.
:::
:::

::: warning A default is not a free lunch
Calling a default “costless” because it does not forbid options is a claim about the *menu*, not about the *outcome*. The extra enrollees in Madrian and Shea were also extra holders of the default fund and the default contribution rate, which were not chosen for them by a revealed-preference argument. Carroll, Choi, Laibson, Madrian and Metrick (2009) showed that an “active decision” regime — requiring a choice, with no default — produces enrolment between opt-in and opt-out. The architecture always picks someone to move. The question is whom, and relative to what criterion.
:::

## What the field experiments say

**Defaults, well replicated.** Madrian and Shea (2001); Choi, Laibson, Madrian and Metrick (a series of papers); Chetty, Friedman, Leth-Petersen, Nielsen and Olsen (2014) on Danish administrative data, where automatic contributions raise saving for some workers and crowd out the saving of others. Johnson and Goldstein (2003) on organ-donation registers, with the caveat that cross-country consent rates are not randomised and that *actual transplants* depend on a medical and legal chain, not only on a register. Default effects are as close to a stylised fact as applied behavioural economics has.

**Reminders, simplifications, social information.** A large development and public-finance literature finds that reminders raise saving, tax filing and clinic attendance by a few percentage points, that simplification of a form raises take-up, and that “your neighbours have paid their tax” letters raise payment (Hallsworth, List, Metcalfe and Vlaev 2017, among many). Effect sizes are typically small, heterogeneous, and cheaper than a financial incentive of the same size. The World Bank’s *World Development Report 2015: Mind, Society, and Behavior* collected applications in low- and middle-income countries — fertiliser timing (Duflo, Kremer and Robinson 2011, already in [[behavioural-economics/present-bias]]), chlorine dispensers, and school-report designs among them. The OECD has published a sequence of “behavioural insights” case studies. These are descriptions of trials, not a claim that the tool is a substitute for prices or for cash.

**The live dispute over a “nudge effect”.** Mertens, Herberz, Hahnel and Brosch (2022, *Proceedings of the National Academy of Sciences*) meta-analysed $450$ nudge studies and reported a mean effect of Cohen’s $d \approx 0.45$, a medium effect in psychology’s language. Maier, Bartoš, Stanley, Shanks, Harris and Wagenmakers (2022, same journal) applied a publication-bias correction (the Bayesian model-averaged meta-analysis of Bartos et al.) and concluded that, after the correction, there was “no evidence for nudging”. Mertens and co-authors replied that other corrections leave a positive, smaller effect and that a single $d$ is the wrong object: defaults are not the same intervention as social-norm letters. Szaszi, Higney, Charlton, Gelman, Ziano, Aczel, Goldstein, Balazs and Tipton (2022) emphasised heterogeneity: the interesting quantity is the distribution of effects, not a grand mean.

Independently, DellaVigna and Linos (2022, *Econometrica*) compared $126$ randomised trials from two *nudge units* (the US Office of Evaluation Sciences and the UK Behavioural Insights Team), covering about $23$ million people, with a meta-analysis of academic nudge papers. The academic papers’ average effect was $8.7$ percentage points; the nudge units’ average effect was $1.4$ percentage points. Selective publication, small samples, and the difference between a proof-of-concept trial and an at-scale letter, can account for much of the gap. Milkman et al. (2021, *Proceedings of the National Academy of Sciences*), in a mega-study of $54$ interventions to raise gym attendance, found that most interventions moved attendance a little and that a few moved it more, with a large prediction error from experts.

The right summary of a live dispute is not a winner. Defaults, in administrative data, move people by tens of percentage points. A typical letter, at scale, moves people by one or two. A journal meta-analysis of published laboratory and field nudges overstates the at-scale mean, probably by a factor of several, because of publication bias and because the published sample is not the at-scale sample. “Nudges work” and “nudges do not work” are both too coarse to be the conclusion of this paragraph.

::: widget plot
f: 1/(1+exp(s*(c/b - x))); 1/(1+exp(s*(c - x)))
sliders: b=0.7:0.4:1:0.05; c=0.4:0.1:0.8:0.05; s=8:3:16:1
x: 0, 1.2
y: 0, 1.05
labels: \text{enrol under opt-in}; \text{stay in under opt-out}
caption: Stylised take-up as a function of the gain $\Delta u$ from being enrolled, from [[#prop-default]]. The left-hand curve is opt-in (enrol if $\beta\Delta u > c$); the right-hand curve is the share who do *not* leave an automatic-enrolment default. Start at $\beta = 0.7$, $c = 0.4$. Slide $\beta$ to $1$ and watch the two curves meet: exponential agents enrol under either default whenever $\Delta u > c$. The gap between the curves is the default effect. These curves are a model, not a fit to Madrian and Shea.
:::

## Behavioural welfare economics

Once choices depend on the frame, revealed preference is no longer a single ranking. Bernheim and Rangel (2007, 2009) proposed a conservative, choice-based criterion: a bundle $x$ is **unambiguously chosen** over $y$ if $x$ is chosen whenever $y$ is available, across a specified set of frames (the “welfare-relevant domain”). If the agent chooses $x$ in some frames and $y$ in others, the criterion is silent. The planner is then licensed to act only on the unambiguous part, and must not “purify” a preference the agent never revealed.

::: definition Bernheim–Rangel welfare criterion {#def-br}
Given a set of ancillary conditions (frames, defaults, menus) $\mathcal{A}$, $x$ is **strictly unambiguously preferred** to $y$ if, whenever both are available, $x$ is chosen and $y$ is not, under every $a \in \mathcal{A}$. A choice is a **welfare improvement** if it raises the agent in this ranking. If $\mathcal{A}$ is a singleton, the criterion coincides with ordinary revealed preference.
:::

The criterion’s virtue is that it does not invent a “true” preference. Its cost is silence: many of the interesting policy questions — which default, which frame — are exactly the questions on which $\mathcal{A}$ disagrees. Infante, Lecouteux and Sugden (2016) argued that the whole project of **preference purification** (recovering a latent rational preference from biased choices) treats the agent as an inner rational person trapped in an error-making shell, which they reject. Sugden’s **opportunity criterion** asks the planner to enlarge opportunity sets, not to implement a purified preference. Beshears, Choi, Laibson and Madrian (2008) had earlier distinguished “normative” from “revealed” preference and proposed using the agent’s own long-run, well-informed, low-attention-cost choices as the normative ones — a purification with a named ancillary condition (the long run). Koszegi and Rabin (2008) discussed when a planner can use the agent’s expected-utility *beliefs* as welfare-relevant even if her choices are reference-dependent.

These are not the same criterion. A default that raises retirement contributions is a welfare improvement under a long-run-preference criterion if the long-run self wanted those contributions, is not a welfare improvement under Sugden’s opportunity criterion (the opportunity set did not grow), and is possibly silent under Bernheim–Rangel if enrolment is frame-dependent. **Positive** behavioural economics — the models in the previous chapters — does not pick the criterion. A paper that says “therefore the default should be X” has added a welfare step, and that step should be named.

::: remark Positive and normative
The present-bias parameter $\beta$ is a positive object: it is estimated from reversals and from commitment take-up. The claim “the planner should use the exponential ($\beta = 1$) ranking as welfare” is a normative object. O’Donoghue and Rabin (2006) and others have used that claim; it is a value judgement that the long-run ranking is the right one, not a finding about $\beta$. This course reports both, and keeps the labels on.
:::

## The ethics of paternalism

Glaeser (2006) argued that the same cognitive limits that justify a nudge also apply to the nudger: planners are overconfident, present-biased and socially motivated, and a government that has learned to set defaults has learned a tool that can be used for its own ends. Sunstein’s reply is that defaults are inevitable — there is always a choice architecture — so the honest paternalism is the one that is explicit about its goal and leaves an opt-out. Both arguments have force, and they do not cancel.

Three distinctions keep the ethics tractable.

**Inevitable architecture versus added architecture.** A form must have a default. A cafeteria must put something at eye level. A website must have an order of options. In those cases, “do not nudge” is not an option; “nudge transparently, toward a stated goal, with cheap opt-out” is a candidate rule. A reminder letter that would not otherwise have been sent is added architecture, and has to pass a cost–benefit test that includes annoyance and any loss of autonomy.

**Self-self versus self-other.** A commitment device that the sophisticate *chooses* is not paternalism. A default that the naif does not choose, and that the planner picks because of the naif’s $\beta$, is paternalism, even if opt-out is cheap. The word “libertarian” in libertarian paternalism is a claim about the menu, not about the process that filled the default.

**Transparency.** A nudge that works only if the chooser does not notice it (a shrouded fee in reverse) is a different ethical object from a nudge that is announced (“we have enrolled you; here is how to leave”). Most of the administrative defaults in Madrian and Shea, and in Chetty et al., were announced. Some commercial “dark patterns” are not. The models in this course do not distinguish them; a policy discussion has to.

None of this is a verdict on a particular country’s pension default, organ-donation register, or calorie label. It is a list of the judgements a verdict would need.

::: application Development policy
Duflo, Kremer and Robinson’s (2011) fertiliser-timing intervention, Ashraf, Karlan and Yin’s (2006) commitment savings, and Dupas and Robinson’s (2013) lock-boxes are behavioural policies in low- and middle-income settings, and they are small relative to the questions of [[development-economics]] — property rights, public health, schooling, trade. Behavioural tools can raise take-up of a technology whose return is already high; they cannot create the return. The *World Development Report 2015* was explicit about that division of labour. Citing a nudge in a setting where the binding constraint is a missing market, a missing clinic or a missing title deed is a category error.
:::

::: history
Madrian and Shea (2001) measured the default effect in pensions; Johnson and Goldstein (2003) displayed the organ-donation map; Thaler and Benartzi (2004) proposed Save More Tomorrow as a planned escalation of contributions (a commitment plus a default). Thaler and Sunstein’s *Nudge* (2008; final edition 2021) named the programme and moved it into governments: the UK Behavioural Insights Team was set up in 2010, and similar units followed. Bernheim and Rangel (2007, 2009) is the choice-based welfare theory; Infante, Lecouteux and Sugden (2016) and Sugden’s later work are the principal critique. DellaVigna and Linos (2022) and the Mertens–Maier–Szaszi exchange in *PNAS* (2022) are the current state of the effect-size argument. Thaler’s 2017 Nobel citation named, among other things, the policy applications.
:::

## Where this leads

This is the last chapter of the course. The models it has used — present bias, inattention, loss aversion, social preferences, level-$k$ — were built in the previous chapters, and they remain the right tools for predicting *what a default will do*. Predicting whether it *should* be done is a welfare criterion plus an ethical stance plus an estimate that has survived contact with at-scale trials. Public economics ([[public-economics/role-of-government]]) is the course that takes the planner seriously as an agent with a budget and a tax; behavioural public economics is the same course with $\theta < 1$ and $\beta < 1$ in the household’s problem. Labour, development and household finance (in other courses) are where many of the estimates live. The standard revealed-preference welfare of [[microeconomics/welfare-theorems]] is the special case in which the ancillary conditions in $\mathcal{A}$ do not matter.

::: summary
- A nudge is a change in choice architecture that leaves the menu and the material payoffs roughly intact ([[#def-nudge]]). A default is the option that is implemented if nobody acts.
- Present bias and inattention both produce default effects ([[#prop-default]]); they are not identified from enrolment alone, and they disagree about welfare.
- Default effects of tens of percentage points in administrative data are well replicated. At-scale letter nudges average about $1.4$ percentage points in DellaVigna and Linos (2022). Published academic means are larger. The $2022$ *PNAS* exchange is a live dispute about a grand-mean $d$, not about whether defaults exist.
- Bernheim–Rangel ([[#def-br]]) uses only unambiguous choice across frames. Purification, long-run preference, and Sugden’s opportunity criterion are different normative steps; positive $\beta$ does not pick one.
- Paternalism is a claim about who fills the default and why, not about whether a default exists. Transparency, opt-out costs, and the planner’s own biases are part of the argument.
- Nothing in this chapter is a recommendation about the reader’s own money, diet, or organ-donation status.
:::

## Exercises

::: exercise A default threshold {level=1}
An agent has $\beta = 0.7$, $\delta = 1$, $c = 4$, and $\Delta u = 5$ from switching to a better option. Does she opt out of a worse default at date $0$? Would an exponential agent?
::: solution
$\beta \Delta u = 3.5 < 4 = c$, so no. The exponential agent has $\Delta u = 5 > 4$, so yes. This is the interval in [[#prop-default]].
:::
:::

::: exercise Madrian–Shea gap {level=1 check="37"}
In [[#ex-madrian]], enter the percentage-point gap between automatic enrolment ($86\%$) and opt-in ($49\%$).
::: solution
$86 - 49 = 37$.
:::
:::

::: exercise DellaVigna–Linos ratio {level=1 check="6.2"}
DellaVigna and Linos (2022) report academic-paper and nudge-unit average effects of $8.7$ and $1.4$ percentage points. Enter their ratio $8.7/1.4$ to one decimal place.
::: solution
$8.7/1.4 = 6.214\ldots$, so $6.2$ to one decimal place. The academic mean is about six times the at-scale mean.
:::
:::

::: exercise Who moves? {level=2}
Under [[#prop-default]], classify agents into those who enrol under both defaults, those who enrol under neither, and those who enrol only under automatic enrolment, in terms of $\Delta u$, $c$ and $\beta$. Which class’s welfare is at issue in a debate about whose ranking, $\beta$ or $1$, the planner should use?
::: solution
Write $\Delta u$ for the long-run gain from being enrolled. Under opt-in, the agent enrols if $\beta \Delta u > c$. Under automatic enrolment, she *leaves* if $\beta(-\Delta u) > c$, i.e. if $\Delta u < -c/\beta$. So: enrol under both if $\beta \Delta u > c$; enrol under neither if $\Delta u < -c/\beta$; enrol only under automatic enrolment if $-c/\beta \le \Delta u \le c/\beta$. The welfare debate about using $\beta$ versus $1$ as the planner’s ranking is about the middle group with $0 < \Delta u \le c/\beta$: they are in under automatic enrolment and out under opt-in; their long-run ranking says they want in, and their date-$0$ ranking refuses to pay $c$. A planner who uses $\beta = 1$ as welfare counts them as helped by the default; a planner who uses date-$0$ choice as welfare does not.
:::
:::

::: exercise Bernheim–Rangel silence {level=2}
An agent chooses fruit in a cafeteria when fruit is at eye level and cake when cake is at eye level. The two bundles are the only two options in both frames. What does [[#def-br]] say about the welfare ranking of fruit and cake, if both frames are in $\mathcal{A}$? What would a purification that takes “eye level is a bias” conclude?
::: solution
Each bundle is chosen in one frame and not the other, so neither is strictly unambiguously preferred. Bernheim–Rangel is silent. A purification that treats eye-level salience as a bias and the “true” preference as the choice made when both are equally salient (or when the agent chooses in advance) would pick whichever that ancillary condition delivers. The two criteria disagree on whether the planner may act; they agree that the raw choices conflict.
:::
:::

::: exercise Inevitable versus added {level=2}
Classify each as inevitable architecture or added architecture: (i) the default on an enrolment form that must be printed; (ii) a reminder SMS that the tax authority did not previously send; (iii) the order of meals on a menu; (iv) a ban on large sodas. Which of (i)–(iv) is not a nudge in the sense of [[#def-nudge]]?
::: solution
(i) inevitable (a form has a default); (ii) added; (iii) inevitable (a menu has an order); (iv) not a nudge, because it changes the feasible set. A ban is paternalism of a different kind, and the chapter’s definition excludes it.
:::
:::

::: exercise Publication bias in one paragraph {level=3}
DellaVigna and Linos (2022) find a factor-of-six gap between academic and nudge-unit average effects. Maier et al. (2022) find that a publication-bias correction of Mertens et al. (2022) drives a grand-mean $d$ to roughly zero. Write a paragraph that a student could use as a conclusion of this chapter, which does *not* say “nudges work” or “nudges do not work”, and which does mention defaults.
::: solution
Defaults in administrative data move enrolment by tens of percentage points, a result that has been replicated across firms and countries and does not depend on a journal’s file drawer. A typical at-scale letter, in the two nudge units DellaVigna and Linos studied, moves an outcome by about one percentage point. Meta-analyses of published academic papers report larger means, and those means shrink, sometimes a lot, once publication bias is modelled; they also mix defaults with much weaker tools. The evidence, taken together, supports using defaults as a real instrument whose welfare still needs a criterion, and does not support a claim that “behavioural insights” deliver a medium effect size on average at scale. It also does not support discarding the instrument.
:::
:::

::: exercise Two mechanisms, two welfares {level=3}
A default raises enrolment by $30$ percentage points. Mechanism A: present-biased naifs with $\Delta u > 0$ who never pay $c$. Mechanism B: inattentive agents with $\theta = 0$ on the form, who are roughly indifferent between the two options ($\Delta u \approx 0$). Compare the welfare case for the default under a long-run-preference criterion in the two mechanisms. What evidence would help a planner tell them apart?
::: hint
If $\Delta u \approx 0$, the long-run self does not care. If $\Delta u > 0$ and $\beta$ blocked the choice, the long-run self does.
:::
::: solution
Under A, the long-run ranking says the extra enrollees gained $\Delta u > 0$; the default is a welfare improvement for them on that criterion (offset by any mismatch of the default fund). Under B, the extra enrollees were indifferent, so the long-run criterion is roughly silent, and any mismatch of the default fund is a first-order loss. The planner who cannot tell A from B cannot sign the welfare effect. Evidence that helps: the demand for commitment (present-biased sophisticates take it; inattentive agents do not need it); the response to a small paid-attention treatment, such as a required active choice (Carroll et al. 2009), which should raise enrolment a lot under A if $c$ was the barrier and less under B if $\Delta u \approx 0$; and later active re-optimisation (inattentive agents who later look may leave; present-biased naifs may stay and be glad, or stay and be sorry, depending on $\Delta u$). Chetty et al. (2014) is an example of using later behaviour and crowd-out to get closer to $\Delta u$.
:::
:::

::: exercise Opportunity versus purification {level=2}
A planner can add a lock-box to a menu of ordinary accounts, or can set the lock-box as the default. How does Sugden’s opportunity criterion rank the two policies relative to the status quo? How might a long-run-preference criterion rank them?
::: solution
Adding the lock-box enlarges the opportunity set and is an improvement on Sugden’s criterion; setting it as the default does not enlarge the set (the ordinary account remains available) and is not an improvement on that criterion, though it is not a worsening either if the ordinary account can still be chosen at low cost. A long-run-preference criterion ranks the default above the status quo if the long-run self wanted the lock and would not have paid $c$ to get there, and ranks the added (non-default) lock-box above the status quo only to the extent that sophisticates take it. The two criteria agree on adding an option and can disagree on filling a default. This is the ethical content of “libertarian” in libertarian paternalism: the added option is the libertarian part; the filled default is the paternalist part.
:::
:::
