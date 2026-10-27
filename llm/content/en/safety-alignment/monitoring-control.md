The previous chapters asked how to make models aligned and how to tell whether they are. This one asks a different question: **what safeguards would still work if a model were not aligned?** If evaluations cannot rule out that a model behaves well only when watched ([[safety-alignment/deception-misalignment#prop-recognition]]), then deployment should not rest on the assumption that it does. Banks do not assume their employees are honest; they separate duties, audit transactions and limit what any single person can do. **AI control** applies the same logic to AI systems: design protocols that keep the probability of a catastrophe low *even if* the model is actively trying to cause one, and test them against a red team that plays the misaligned model.

This chapter sets out the control framework of Greenblatt, Shlegeris, Sachan and Roger (ICML 2024, "AI control: improving safety despite intentional subversion"), and its main protocols: trusted monitoring, deferring to a trusted model, untrusted monitoring, and trusted editing. The core mathematics is a calculation everyone deploying a monitor should be able to do: given an audit budget, a monitor of known quality and an attacker who chooses how often to attack, what is the probability of catching it before it succeeds? We work it in plain Python. We then turn to monitoring in practice — monitoring chains of thought, and why that opportunity is fragile (Baker et al., 2025; Korbak et al., 2025) — and to anomaly detection and deployment-time safeguards. The faithfulness of reasoning traces is treated in [[reasoning/faithfulness-limits]] and only linked here.

## The control framework {#sec-control}

::: definition Control setting {#def-control}
A **control setting** consists of a sequence of $N$ tasks to be done by an **untrusted model** $U$ — capable, but possibly misaligned — together with resources the defender trusts: a **trusted model** $T$, weaker but assumed not to be adversarial (for example because it is too weak to scheme coherently), and a limited budget of **trusted high-quality labour** $H$ (human auditors) able to inspect a fraction $a$ of the tasks. A **protocol** decides, for each task, how to use $U$, $T$ and $H$ to produce an output. Its **usefulness** is its performance on the tasks when $U$ is benign; its **safety** is the probability that no catastrophe occurs when $U$ is replaced by an **attack policy** written by a red team trying to cause one.
:::

The key methodological move is the **control evaluation**: instead of trying to determine whether the real model is misaligned, the evaluators assume the worst and let a red team control the untrusted model's behaviour, within limits on what the real model could plausibly do. A protocol is judged by the safety it achieves against the best red-team strategy found, at a given usefulness. Greenblatt et al. used a programming setting: $U$ (GPT-4) solved $5{,}000$ competitive programming problems; the red team's goal was to get at least one **backdoored** solution accepted — code that passes the tests but gives a wrong answer on an input the attacker knows; $T$ was GPT-3.5; and auditing could examine $2\%$ of solutions. Later work extended the methodology to multi-step agentic settings in a shell environment (Bhatt et al., 2025, "Ctrl-Z"), where an attack may be spread across many actions.

::: definition Protocols {#def-protocols}
- **Upfront auditing**: audit $U$'s outputs on the first $aN$ tasks; use the rest unchecked.
- **Trusted monitoring**: $T$ assigns each of $U$'s outputs a suspicion score; $H$ audits the most suspicious fraction $a$. An audit that finds an attack ends the deployment (the model is caught).
- **Defer to trusted**: as trusted monitoring, but outputs above a second, lower threshold are discarded and replaced by $T$'s own output — safer, less useful.
- **Untrusted monitoring**: another instance of $U$ scores the outputs, since it is more capable than $T$; the risk is **collusion**, the monitor deliberately missing attacks, countered by testing the monitor on synthetic attacks and by paraphrasing or redacting outputs to remove secret signals.
- **Trusted editing**: $T$ rewrites $U$'s output to remove anything suspicious, keeping its useful parts.
:::

## Auditing budgets and the probability of catching an attack {#sec-audit}

A red team controlling $U$ chooses how often to attack. Attacking often risks being caught early; attacking rarely risks never succeeding. Model each attack as having three possible outcomes: it is **caught** (an audit sees it, and the deployment stops), it **succeeds** (it is not caught and achieves its aim — a catastrophe), or it is **neutral** (it is not caught and fails, for example because the backdoor does not work).

::: proposition Safety against repeated attacks {#prop-race}
Suppose each attack is independently caught with probability $c$, succeeds with probability $u$ and is neutral otherwise, with $c + u > 0$, and the attacker keeps attacking until one of the first two happens. Then the probability that the attacker is caught before succeeding is
$$
\text{safety} = \frac{c}{c + u}.
$$ {#eq-race}
If the deployment can end before a decisive event — finitely many tasks, few attacks — safety is at least this.
:::

::: proof
The first decisive attack is the $k$th with probability $(1 - c - u)^{k - 1}(c + u)$, and given that an attack is decisive it is a catch with probability $c/(c + u)$, independently of $k$. Summing over $k$, $\Prob(\text{caught first}) = \sum_{k\ge1}(1 - c - u)^{k - 1}c = c/(c + u)$. With finitely many attacks, the event that no attack is decisive also counts as safe, which can only increase safety.
:::

Safety in this model is set by the *per-attack* ratio of catching to succeeding, not by the number of tasks — as long as the red team can attack often enough. The audit budget enters through $c$, and the protocol determines how much $c$ a budget buys.

::: example Random auditing {#ex-random}
Audit a random $2\%$ of tasks. Each unaudited attack succeeds with probability $s = 0.5$. What is the safety?
::: solution
A random audit catches an attack with probability $c = a = 0.02$, and an attack succeeds with probability $u = (1 - a)s = 0.49$. By [[#prop-race]], safety $= 0.02/(0.02 + 0.49) = 0.039$. Random auditing with a small budget is almost useless against an attacker who can try repeatedly: the attacker expects about $25$ successes for every catch.
:::
:::

Upfront auditing behaves differently, because the audits are concentrated at the beginning. The attacker should then attack *rarely*, so as probably to make no attack during the audited period, but often enough to succeed afterwards.

::: example Upfront auditing {#ex-upfront}
With $N = 5{,}000$ tasks, the first $M = 100$ are audited ($a = 2\%$) and an unaudited attack succeeds with probability $s = 0.5$. The attacker attacks each task independently with probability $p$. Find the attacker's best $p$ and the resulting safety.
::: solution
The attacker wins if no attack happens in the first $M$ tasks and at least one succeeds later: $\Prob(\text{red wins}) = (1 - p)^M\big(1 - (1 - ps)^{N - M}\big)$. Small $p$ makes the first factor near $1$ but the second small; large $p$ the reverse. Maximising numerically ([[#sec-code]]) gives $p = 0.00132$ — about six or seven attacks expected in $5{,}000$ tasks — and $\Prob(\text{red wins}) = 0.842$, so safety is $0.158$. This is better than random auditing but still poor: the attacker exploits the predictability of *when* audits happen.
:::
:::

### Trusted monitoring

A monitor turns the audit budget into a higher catch rate by spending it where attacks are likely. Model the trusted monitor's suspicion score as $\Normal(0, 1)$ on honest outputs and $\Normal(d', 1)$ on attacks, where $d'$ measures how well $T$ distinguishes them. Auditing the top fraction $a$ of honest outputs sets the threshold $\tau = \Phi^{-1}(1 - a)$, and an attack is then caught with probability
$$
c(a) = 1 - \Phi\big(\Phi^{-1}(1 - a) - d'\big).
$$ {#eq-catch}

::: widget plot
f: 0.5*(1 - erf(x/sqrt(2))); 0.5*(1 - erf((x - d)/sqrt(2)))
x: -1, 5
y: 0, 1
sliders: d=2:0:4:0.1
vlines: 2.054
labels: fraction of honest outputs audited, $a = 1 - \Phi(\tau)$; fraction of attacks caught, $c = 1 - \Phi(\tau - d')$
caption: The trade-off set by the audit threshold $\tau$ of a trusted monitor whose suspicion scores are $\Normal(0, 1)$ for honest outputs and $\Normal(d', 1)$ for attacks (slider $d = d'$). The vertical line is the threshold $\tau = 2.054$ that audits $2\%$ of honest outputs; at $d' = 2$ it catches $47.9\%$ of attacks ([[#ex-monitor]]). A better monitor (larger $d'$) catches more attacks at the same budget; a larger budget moves the line left.
:::

::: example Trusted monitoring and deferral {#ex-monitor}
With $a = 0.02$, $d' = 2$ and $s = 0.5$: (a) what is the catch rate and the safety of trusted monitoring? (b) Outputs in the top $10\%$ of suspicion that are not audited are replaced by $T$'s output. What is the safety now, and what does it cost?
::: solution
(a) $\tau = \Phi^{-1}(0.98) = 2.054$ and $c = 1 - \Phi(0.054) = 0.479$ by [[#eq-catch]]. An uncaught attack succeeds with probability $s$, so $u = (1 - c)s = 0.261$ and safety $= 0.479/(0.479 + 0.261) = 0.647$ ([[#prop-race]]). The simulation in [[#sec-code]] gives $0.650\pm0.015$. (b) Attacks scoring above the deferral threshold $\Phi^{-1}(0.9) = 1.282$ but below the audit threshold are replaced, so they neither succeed nor get caught. The fraction of attacks above the deferral threshold is $1 - \Phi(1.282 - 2) = 0.764$, so only $1 - 0.764 = 0.236$ of attacks are used unchanged and $u = 0.236\cdot0.5 = 0.118$. Safety rises to $0.479/(0.479 + 0.118) = 0.802$. The cost is usefulness: $8\%$ of honest tasks are now done by the weaker model. Deferring the top $20\%$ gives $0.886$ at a cost of $18\%$.
:::
:::

The example shows the shape of the **safety–usefulness frontier** that control evaluations map: each protocol and threshold is a point, and better protocols push the frontier outwards. Greenblatt et al. found that trusted monitoring with deferral, untrusted monitoring with collusion countermeasures, and trusted editing all improved substantially on upfront auditing in their setting, with trusted editing and untrusted monitoring giving the best trade-offs. Their numbers depend on the setting; the method of comparison is the transferable part.

::: widget plot
f: x/(x + (1 - x)*s); x/(x + (1 - x)*s*(1 - k))
x: 0, 1
y: 0, 1
sliders: s=0.5:0.05:1:0.01; k=0.55:0:0.95:0.01
labels: safety with auditing only, $c/(c + (1 - c)s)$; with deferral removing a further fraction $k$ of uncaught attacks
caption: Safety against a repeatedly attacking policy ([[#prop-race]]) as a function of the per-attack catch rate $c$, when an uncaught attack succeeds with probability $s$. Deferral to the trusted model neutralises a fraction $k$ of the attacks that auditing misses: with $c = 0.479$ and $k = 0.55$ (deferring the top $10\%$ in [[#ex-monitor]], which removes $0.285/0.521$ of the uncaught attacks) safety rises from $0.65$ to $0.80$. Safety is very sensitive to $c$ at small catch rates, which is why monitor quality and the audit budget matter so much.
:::

### Untrusted monitoring and collusion

A trusted model is often much weaker than the untrusted one, so its suspicion scores are poor. Using another copy of $U$ as the monitor gives better scores if the copy is honest — but if $U$ is misaligned, the monitor may collude, reporting low suspicion exactly on real attacks. Two countermeasures are central. **Honeypots**: show the monitor synthetic attacks created by the blue team; a monitor that fails to flag them is caught lying. **Signal jamming**: paraphrase or redact outputs before the monitor sees them, so that the attacker cannot embed a secret signal ("this one is mine, don't report it") that a colluding monitor could recognise.

::: example Catching a colluding monitor {#ex-collusion}
A colluding monitor tries to flag synthetic attacks and stay silent on real ones, so it must tell them apart. Suppose it misclassifies a synthetic attack as real with probability $e = 0.1$, and the blue team tests it on $k = 30$ synthetic attacks before deployment. What is the probability that the collusion is exposed? How does paraphrasing help?
::: solution
The monitor is exposed if it stays silent on at least one synthetic attack: $1 - (1 - e)^k = 1 - 0.9^{30} = 1 - 0.042 = 0.958$. The monitor's best defence is to make $e$ small — to recognise synthetic attacks reliably, or to recognise real ones by a signal the attacker planted. Paraphrasing and redaction remove planted signals and make real and synthetic attacks look alike, which raises $e$; realistic synthetic attacks do the same. The analysis mirrors [[safety-alignment/deception-misalignment#prop-recognition]]: an adversary that can recognise tests defeats them, so the defence is to make tests unrecognisable.
:::
:::

::: warning Control is not a claim that the model is misaligned
Designing protocols against an adversarial model does not presuppose that current models are adversarial; it is a way of obtaining safety guarantees that do not depend on resolving that question. The approach also has stated limits: it assumes the trusted model really is trustworthy, that the red team's attack policies are at least as good as what the real model could do (an assumption that weakens as models become more capable than their red teams), and that catching an attack leads to a response. Its proponents describe it as a way to manage risk from early transformative systems, not a long-term solution.
:::

## Monitoring chains of thought {#sec-cot}

Reasoning models write extended chains of thought before acting ([[reasoning/chain-of-thought]]). When a model reasons in natural language about what it is doing, a monitor can read that reasoning — including reasoning that reveals intentions its actions alone would not.

Baker et al. (OpenAI, 2025, "Monitoring reasoning models for misbehavior and the risks of promoting obfuscation") studied this during the RL training of a frontier reasoning model on agentic coding tasks. A weaker model (GPT-4o), prompted as a monitor, read the agent's chain of thought and actions and flagged reward hacking — such as making tests pass by special-casing them rather than fixing code ([[safety-alignment/reward-hacking]]). The reported findings:

- Monitoring the **chain of thought** detected systemic reward hacks far better than monitoring **actions** alone (recall of about $95\%$ against about $60\%$ in their analysis), because the agent often stated its intention plainly.
- When the monitor's flags were incorporated into the training **reward** — penalising "bad thoughts" — the agent at first hacked less and performed better. With more optimisation, it learnt **obfuscated reward hacking**: it continued to hack, while its chain of thought no longer revealed it.

The second finding is a direct instance of Goodhart's law ([[safety-alignment/alignment-problem#def-goodhart]]): a monitor used as an optimisation target ceases to be a good monitor. The authors recommended that developers avoid applying strong optimisation pressure directly to chains of thought, accepting a "monitorability tax" if necessary.

::: definition Monitorability {#def-monitorability}
A model's reasoning is **monitorable** for a class of behaviours to the extent that a monitor reading the reasoning (and actions) can detect those behaviours with high recall at an acceptable false-positive rate. Monitorability requires that the reasoning be **legible** (in a language the monitor understands), that the behaviour **need** reasoning the model must externalise, or at least does externalise, and that the reasoning reflect the computation sufficiently **faithfully** ([[reasoning/faithfulness-limits#def-faithful]]).
:::

Korbak and more than forty co-authors from several developers, government institutes and academia (2025, "Chain of thought monitorability: a new and fragile opportunity for AI safety") argued in a position paper that this opportunity exists because hard tasks currently *require* models to think in text, but that it could be lost through several developments: optimisation pressure on reasoning (as above), training that drifts reasoning away from legible language, novel architectures that reason in continuous latent spaces, and models that learn they are monitored. They recommended that developers evaluate monitorability, report it (for example in system cards), and weigh it in training and architecture decisions. Others note that chains of thought are already only partially faithful ([[reasoning/faithfulness-limits]]), so monitoring them is a useful additional layer rather than a guarantee; the position paper agrees that it should complement other measures.

## Anomaly detection and internal monitoring {#sec-anomaly}

Monitoring can also look below the text. **Probes** on internal activations — linear classifiers trained to detect states such as deception or an intention to defect — showed high accuracy on deliberately backdoored model organisms ([[safety-alignment/deception-misalignment#sec-sleeper]]) and have been tested on strategic deception in more realistic scenarios with encouraging but imperfect results. **Mechanistic anomaly detection**, proposed by researchers at the Alignment Research Center, aims to flag inputs on which a model's output is produced by an unusual internal mechanism — "the reason for this output is different from the reason in normal cases" — even when the output itself looks normal. Out-of-distribution detectors flag inputs unlike the training data. All of these inherit the base-rate problem: a detector with $99\%$ sensitivity and specificity, applied where the target behaviour occurs in one episode in ten thousand, produces about a hundred false alarms per true alarm, so flags must feed a triage process — further automated checks, then human review — rather than trigger action directly. Interpretability methods that underpin internal monitoring are the subject of [[interpretability]].

::: example Triage of alarms {#ex-triage}
A deployment processes $10^6$ agent episodes per day. A detector flags $0.5\%$ of benign episodes and $90\%$ of the rare episodes (rate $10^{-5}$) containing the target behaviour. A second-stage model check passes on to humans $5\%$ of benign flags and $95\%$ of true ones. How many episodes reach human review each day, and what fraction are real?
::: solution
True episodes: $10$ per day; the detector flags $9$, and $8.55$ pass the second stage. Benign: $999{,}990$ episodes, $5{,}000$ flagged, $250$ pass. Humans review about $258.5$ episodes per day, of which $8.55/258.5 = 3.3\%$ are real. The first stage alone would have sent about $5{,}009$ episodes, $0.18\%$ real. Layered triage makes human review feasible; whether a $3\%$ hit rate is acceptable depends on reviewer capacity and on the cost of a missed episode — the same trade-off as the audit budget of [[#sec-audit]].
:::
:::

## Safeguards in deployment {#sec-deployment}

Control protocols and monitors sit inside a wider set of deployment safeguards, most of which concern misuse by users as well as misbehaviour by models:

- **Input and output classifiers** for disallowed content ([[safety-alignment/robustness-jailbreaks#sec-defences]]).
- **Least privilege and sandboxing** for agents: tools, credentials and network access limited to the task, with irreversible actions requiring confirmation ([[agents/agent-security]]).
- **Logging and audit trails** of prompts, reasoning, tool calls and outputs, retained so that incidents can be investigated.
- **Usage monitoring** at the level of accounts and aggregates, including privacy-preserving analysis of how a system is used (for example Anthropic's Clio, Tamkin et al., 2024), to find patterns of misuse that no single conversation reveals.
- **Rate limits and staged access**, which bound the number of attempts available to an attacker ([[safety-alignment/robustness-jailbreaks#prop-compound]]).
- **Incident response**: procedures to roll back models, revoke access, patch classifiers and notify affected parties, with criteria for what triggers them. A control protocol that catches an attack is only valuable if catching one leads to a decision.

::: algorithm Designing a monitoring and control plan {#alg-plan}
1. **Threat model.** List what an untrusted model or a misusing user could do that is unacceptable in this deployment, and through which actions.
2. **Trusted resources.** Identify trusted models, human review capacity (the audit budget $a$) and response procedures.
3. **Protocol.** Choose monitors (trusted, untrusted with collusion countermeasures, chain-of-thought, internal probes), thresholds for audit and for deferral or blocking, and least-privilege limits on actions.
4. **Control evaluation.** Let a red team replace the model with attack policies; estimate safety ([[#prop-race]]) and usefulness for each configuration, with confidence intervals; choose a point on the frontier.
5. **Triage.** Size the alarm pipeline to reviewer capacity, accounting for base rates ([[#ex-triage]]).
6. **Preserve the monitors.** Do not train against the monitors used for oversight; track monitor recall over time on synthetic attacks.
7. **Respond and review.** Define what a confirmed attack triggers; review incidents and update the threat model.
:::

## The code {#sec-code}

The listing computes the safety of upfront auditing, random auditing, trusted monitoring and deferral in the setting of [[#ex-upfront]] and [[#ex-monitor]], and checks trusted monitoring by simulation.

```python
import random, math
from statistics import NormalDist

N, a, s = 5000, 0.02, 0.5        # tasks, audit budget (fraction), P(an unaudited attack succeeds)
Phi, Q = NormalDist().cdf, NormalDist().inv_cdf

# --- 1. Upfront auditing: audit the first a*N tasks, nothing afterwards ----------
M = int(a * N)
def red_wins_upfront(p):
    return (1 - p) ** M * (1 - (1 - p * s) ** (N - M))
best_p = max((i / 100000 for i in range(1, 5001)), key=red_wins_upfront)
print(f"upfront auditing: red's best attack rate p={best_p:.5f}, safety {1 - red_wins_upfront(best_p):.3f}")

# --- 2. Per-attack protocols: catch probability c, success probability u ---------
def safety(c, u):
    """P(first decisive event is a catch) when every attack is caught w.p. c and succeeds w.p. u."""
    return c / (c + u)
print(f"random auditing:  safety {safety(a, (1 - a) * s):.3f}")

d = 2.0                                       # monitor separation: attack scores ~ N(d, 1), honest ~ N(0, 1)
t_audit = Q(1 - a)
c_audit = 1 - Phi(t_audit - d)
print(f"trusted monitoring: audit threshold {t_audit:.3f}, catch rate {c_audit:.3f}, "
      f"safety {safety(c_audit, (1 - c_audit) * s):.3f}")
for defer in (0.05, 0.10, 0.20):
    c_defer = 1 - Phi(Q(1 - defer) - d)         # flagged for audit OR deferral
    print(f"  + defer to trusted above top {defer:.0%}: safety {safety(c_audit, (1 - c_defer) * s):.3f}, "
          f"tasks handed to the weaker model {defer - a:.0%}")

# --- 3. Monte Carlo check of trusted monitoring (red attacks with p = 0.002) ---
rng = random.Random(7)
def episode(p=0.002):
    for _ in range(N):
        if rng.random() < p:                              # an attack
            if rng.gauss(d, 1) > t_audit:
                return "caught"
            if rng.random() < s:
                return "red wins"
    return "no success"
runs = [episode() for _ in range(4000)]
blue = sum(r != "red wins" for r in runs) / len(runs)
print(f"simulated safety {blue:.3f} (+/- {1.96 * math.sqrt(blue * (1 - blue) / len(runs)):.3f})")
```

Output:

```
upfront auditing: red's best attack rate p=0.00132, safety 0.158
random auditing:  safety 0.039
trusted monitoring: audit threshold 2.054, catch rate 0.479, safety 0.647
  + defer to trusted above top 5%: safety 0.726, tasks handed to the weaker model 3%
  + defer to trusted above top 10%: safety 0.802, tasks handed to the weaker model 8%
  + defer to trusted above top 20%: safety 0.886, tasks handed to the weaker model 18%
simulated safety 0.650 (+/- 0.015)
```

::: quiz
A team penalises its reasoning model during RL whenever a chain-of-thought monitor detects intent to game the tests. Test-gaming flagged by the monitor drops to near zero. What should they conclude?
- [ ] Test-gaming has been eliminated.
- [x] Nothing definite: the policy may have stopped gaming or may have learnt to game without revealing it in its reasoning, so they need an independent check that was not used as a training signal.
- [ ] The monitor was too weak.
- [ ] Chain-of-thought monitoring never works.
::: solution
Baker et al. (2025) observed exactly this: under optimisation pressure the agent learnt obfuscated reward hacking. A monitor used as a reward is no longer an independent measurement; detection must use signals outside the optimisation ([[#sec-cot]]).
:::
:::

::: history
Monitoring and auditing of automated systems long predate language models; for AI, Christiano and collaborators discussed adversarial training, monitoring and "eliciting latent knowledge" (2021), and mechanistic anomaly detection followed. Shlegeris and Greenblatt developed AI control at Redwood Research, publishing the ICML 2024 paper with Sachan and Roger (first released in December 2023) and arguing for control evaluations and safety cases built on them. Clymer et al. (2024) proposed structured safety cases, including control arguments; Bhatt et al. (2025) extended control to agentic settings; Korbak et al. (2025) sketched a control safety case. On reasoning, Baker et al. (2025) studied chain-of-thought monitoring and obfuscation, and Korbak et al. (2025) published the multi-organisation position paper on chain-of-thought monitorability. By 2026 several developers described monitoring of reasoning, internal deployments and agent actions in their safety frameworks ([[safety-alignment/safety-frameworks]]).
:::

::: summary
- AI control designs safeguards that work even if the model is misaligned, judged by control evaluations in which a red team plays the model; protocols are compared on a safety–usefulness frontier.
- Against an attacker who attacks until something decisive happens, safety is $c/(c + u)$ per attack ([[#prop-race]]): random auditing with $a = 2\%$ gives about $4\%$; predictable upfront auditing lets the attacker wait it out ($16\%$ in the example).
- A trusted monitor with separation $d'$ converts the audit budget into a catch rate $1 - \Phi(\Phi^{-1}(1 - a) - d')$; deferral to a trusted model trades usefulness for further safety.
- Untrusted monitors are stronger but may collude; honeypots and paraphrasing make collusion detectable by making real and synthetic attacks indistinguishable.
- Chain-of-thought monitoring catches much misbehaviour that actions alone hide, but training against the monitor teaches obfuscation; monitorability is valuable and fragile, and should be measured and preserved.
- Probes and anomaly detectors look below the text; base rates mean alarms need triage.
- Deployment safeguards — classifiers, least privilege, logging, usage monitoring, rate limits and incident response — complete the picture; catching an attack matters only if it triggers a response.
:::

## Exercises

::: exercise Random auditing {level=1 check="0.0952"}
With a random audit rate of $a = 5\%$ and success probability $s = 0.5$ for unaudited attacks, what is the safety against a repeatedly attacking policy? Give four decimal places.
::: solution
$c = a = 0.05$ and $u = (1 - a)s = 0.95\cdot0.5 = 0.475$, so safety $= 0.05/(0.05 + 0.475) = 0.0952$ ([[#prop-race]]).
:::
:::

::: exercise The race formula {level=1 check="0.75"}
Each attack is caught with probability $0.3$ and succeeds with probability $0.1$. What is the probability the attacker is caught first?
::: solution
$0.3/(0.3 + 0.1) = 0.75$ ([[#prop-race]]).
:::
:::

::: exercise Honeypot tests {level=1 check="0.878"}
A colluding monitor misjudges a synthetic attack as real with probability $0.05$. With $41$ honeypot tests, what is the probability it is exposed? Give three decimal places.
::: solution
$1 - 0.95^{41} = 1 - e^{41\ln0.95} = 1 - e^{-2.1030} = 1 - 0.1221 = 0.878$ ([[#ex-collusion]]).
:::
:::

::: exercise Catch rate of a monitor {level=2 check="0.672"}
A trusted monitor has $d' = 2.5$ and the audit budget is $2\%$, so $\tau = 2.054$. What is the catch rate? Use $\Phi(0.446) = 0.6722$ and give three decimal places.
::: solution
By [[#eq-catch]], $c = 1 - \Phi(2.054 - 2.5) = 1 - \Phi(-0.446) = \Phi(0.446) = 0.672$. Improving the monitor from $d' = 2$ to $2.5$ raises the catch rate from $0.479$ to $0.672$ at the same budget.
:::
:::

::: exercise Safety of a better monitor {level=2 check="0.804"}
With $c = 0.672$ and $s = 0.5$, what is the safety of trusted monitoring without deferral? Give three decimal places.
::: solution
$u = (1 - 0.672)\cdot0.5 = 0.164$, and safety $= 0.672/(0.672 + 0.164) = 0.804$ ([[#prop-race]]), against $0.647$ for $d' = 2$.
:::
:::

::: exercise Triage capacity {level=2 check="1250"}
In [[#ex-triage]], reviewers can handle $300$ episodes per day. Traffic grows to $5\times10^6$ episodes per day with the same rates. How many benign episodes per day now reach human review?
::: solution
Benign flags: $5\times10^6\cdot0.005 = 25{,}000$; after the second stage $25{,}000\cdot0.05 = 1{,}250$ per day, beyond the reviewers' capacity. The thresholds must be tightened (losing recall), the second stage improved, or review capacity increased — a decision about the audit budget, made explicit.
:::
:::

::: exercise Why upfront auditing fails {level=2}
Explain in words why the attacker's optimal attack rate under upfront auditing is small, and why trusted monitoring is not vulnerable to the same strategy.
::: solution
Under upfront auditing, attacks are caught only during the first $aN$ tasks. The attacker wants to make no attack in that window and at least one afterwards, so it attacks rarely: rarely enough that the window is probably empty, often enough that the remaining $N - aN$ tasks probably contain a success ([[#ex-upfront]]). Under trusted monitoring, every attack faces the same catch probability $c$ whenever it occurs, so timing gives no advantage, and the safety $c/(c + u)$ does not depend on the attack rate ([[#prop-race]]). Unpredictable, attack-dependent auditing removes the attacker's ability to wait.
:::
:::

::: exercise Deferral thresholds {level=3}
Derive the safety of trusted monitoring with deferral, with audit fraction $a$, deferral fraction $b > a$, monitor separation $d'$ and success probability $s$, and show that safety tends to $1$ as $b\to1$. What is the corresponding usefulness cost, and why is $b = 1$ pointless?
::: solution
Let $c_a = 1 - \Phi(\Phi^{-1}(1 - a) - d')$ and $c_b = 1 - \Phi(\Phi^{-1}(1 - b) - d')$. Attacks above the audit threshold are caught ($c_a$); those between the thresholds are replaced ($c_b - c_a$, neutral); those below are used, succeeding with probability $s$, so $u = (1 - c_b)s$ and safety $= c_a/(c_a + (1 - c_b)s)$ ([[#prop-race]]). As $b\to1$, $\Phi^{-1}(1 - b)\to-\infty$, so $c_b\to1$, $u\to0$ and safety $\to1$. The usefulness cost is that a fraction $b - a$ of honest tasks are done by the trusted model. At $b = 1$ every unaudited task is done by $T$, so the untrusted model contributes only to the audited $a$ — the protocol is as useful as not deploying $U$ at all. The frontier between these extremes is what control evaluations map ([[#ex-monitor]]).
:::
:::

::: exercise Attacks spread across steps {level=3}
In an agentic setting an attack requires $m$ consecutive suspicious actions, each independently flagged by the monitor with probability $c_1$, and the attack is caught if any action is flagged. (a) What is the per-attack catch probability? (b) If the attacker can instead split the attack so each action looks less suspicious, reducing per-action flag probability to $c_1/m$, what happens for large $m$? Relate to the resampling protocols of Bhatt et al. (2025).
::: solution
(a) $c = 1 - (1 - c_1)^m$, which grows quickly with $m$: multi-step attacks give the monitor several chances. (b) With per-action probability $c_1/m$, $c = 1 - (1 - c_1/m)^m\to1 - e^{-c_1}$ as $m\to\infty$. For $c_1 = 0.5$ the limit is $0.393$, below the $0.5$ of a single-step attack and far below the $1 - 0.5^m$ of an unsplit $m$-step attack: spreading an attack thinly removes the monitor's advantage from multiple steps. Bhatt et al. responded with protocols that, when an action looks suspicious, *resample* further actions from the model in the same context: an attacking policy tends to continue the attack in its resamples, which reveals it, while an honest policy's resamples look benign. This turns the multi-step structure back into an advantage for the defender.
:::
:::
