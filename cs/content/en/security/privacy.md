A hospital wants to help researchers study a disease, so it releases its admission records with the names removed. A city publishes the journeys made by its shared bicycles, keyed by a random number instead of the rider. A phone vendor wants to know which emoji its users type most, without learning what any individual typed. Each of these is a reasonable goal, and in each the obvious method — delete the names — has been shown, again and again, to fail: a person's birth date, postcode and sex, or a handful of their journeys, or the films they rated, single them out almost as reliably as a name does.

This chapter is about **privacy**: protecting people from harm caused by the collection, use and disclosure of information about them. It differs from the confidentiality of [[security/security-principles]] in whose interests are protected — the data subjects', who are often not the system's users or owners at all. We look first at what privacy means and at the principles of data-protection law, then at **tracking** on the web and how much information a "fingerprint" carries, measured in bits; at **anonymous communication** and anonymity sets; at **de-identification**, its failures, and the $k$-anonymity model that tried to repair it; and finally at **differential privacy**, a mathematical definition with provable guarantees, with the Laplace mechanism, composition and randomised response proved and simulated. All people and data sets in this chapter are fictional.

## What privacy is

Privacy is notoriously hard to define. Samuel Warren and Louis Brandeis called it "the right to be let alone" (1890); Alan Westin, in 1967, the claim of individuals to determine for themselves when, how and to what extent information about them is communicated to others. For engineers the most useful account is Helen Nissenbaum's.

::: definition Contextual integrity {#def-contextual-integrity}
An **information flow** is described by its sender, recipient, subject (whom the information is about), information type and **transmission principle** (the conditions under which it flows: in confidence, with consent, as required by law, in exchange for payment). Each social context — health care, education, employment, friendship — has **informational norms** stating which flows are appropriate. A flow **preserves contextual integrity** if it conforms to the norms of the context in which the information was shared, and **violates** it otherwise.
:::

The definition explains intuitions that "public versus private" cannot. A patient's diagnosis flowing to her doctor is appropriate; the same diagnosis flowing to her employer is not, though it is the same information. A person's address is known to neighbours and the postman, but compiled with thousands of others into a searchable database it supports flows — stalking, targeted burglary — that no context sanctioned. Aggregation, inference and re-purposing are the typical violations, and they are exactly what computing makes cheap.

Data-protection law turns similar ideas into obligations. The EU's General Data Protection Regulation (GDPR, adopted 2016, applicable from May 2018), and many laws modelled on it, require that personal data be processed **lawfully, fairly and transparently**; collected for specified purposes and not used incompatibly (**purpose limitation**); limited to what is necessary (**data minimisation**); accurate; kept no longer than needed (**storage limitation**); and protected by appropriate security (**integrity and confidentiality**). Controllers must be able to demonstrate compliance (**accountability**), and the regulation asks for **data protection by design and by default**. Laws differ between jurisdictions and change, so engineers should work from current legal advice; but the principles are good engineering in any case. Data minimisation in particular is the strongest privacy technique there is: data that was never collected cannot leak, be subpoenaed or be misused by a later owner of the company — the "avoid" response to risk ([[security/security-principles]]).

## Tracking and fingerprinting

Web pages load resources from many parties, and each resource request can carry an identifier. A **third-party cookie** set by an advertising network embedded on many sites lets that network recognise the same browser everywhere and assemble its browsing history. Browsers have increasingly blocked or partitioned third-party cookies (keying them by the top-level site, so that the same embedded network gets a different cookie on each site), and trackers have responded with techniques that need no stored identifier at all.

A **browser fingerprint** combines attributes that a page can read — the browser version, language, time zone, screen size, installed fonts, graphics-rendering quirks — into a value that is often unique. How identifying an attribute is can be measured in bits.

::: definition Surprisal {#def-surprisal}
If an attribute takes a value $v$ shared by a fraction $p_v$ of a population, observing $v$ conveys $I(v) = -\log_2 p_v$ bits of **self-information** (surprisal) about the person's identity. The **entropy** of the attribute is the expected surprisal $H = -\sum_v p_v \log_2 p_v$. For independent attributes, surprisals add.
:::

Since there are about $8 \times 10^9 \approx 2^{33}$ people, about $33$ bits of surprisal single out one person in the world, and far fewer suffice among the users of one website. In 2010 the Electronic Frontier Foundation's Panopticlick experiment found that over 80% of the browsers it sampled had a unique fingerprint.

::: example Bits in a fingerprint {#ex-fingerprint}
A (fictional) visitor's browser reports a time zone shared by $1$ in $20$ of the site's visitors, a language setting shared by $1$ in $50$, a screen size shared by $1$ in $200$ and a font list shared by $1$ in $1000$. Assuming independence, how many bits does the combination carry, and among how many visitors would we expect it to be unique?
::: solution
The surprisals are $\log_2 20 \approx 4.32$, $\log_2 50 \approx 5.64$, $\log_2 200 \approx 7.64$ and $\log_2 1000 \approx 9.97$ bits, a total of about $27.6$ bits: the combination is shared by a fraction $1/(20 \cdot 50 \cdot 200 \cdot 1000) = 1/(2 \times 10^8)$ of visitors. On a site with a few million visitors it is very likely unique. Real attributes are correlated (language and time zone go together), so the true figure is smaller, but the lesson stands: individually innocuous attributes combine into an identifier. Defences reduce the bits: browsers that report standardised values (a fixed list of fonts, rounded screen sizes, a uniform user agent — the approach of the Tor Browser), or that add noise to rendering results; and law and policy, since fingerprinting is a form of processing personal data.
:::
:::

Tracking does not stop at the browser. Mobile apps embed analytics and advertising libraries; location data from phones is sold through data brokers; and even encrypted network traffic reveals which servers a device talks to, when and how much ([[networks/application-layer]]). A recurring finding is that **location traces are highly identifying**: a few points of where and when a person was are usually enough to single them out from millions.

## Anonymous communication

Encryption hides *what* is said, not *who is talking to whom*. Sometimes that metadata is itself the secret — a journalist's source, a patient contacting a clinic, a citizen reading a banned news site — and protecting it needs a different tool.

::: definition Anonymity set and degree of anonymity {#def-anonymity-set}
Against a given adversary, the **anonymity set** of an action is the set of subjects who might, as far as the adversary can tell, have performed it. If the adversary assigns probabilities $p_1, \dots, p_N$ to the $N$ members, the **effective size** of the set is $2^H$, where $H = -\sum_i p_i \log_2 p_i$ is the entropy of that distribution; $H$ is at most $\log_2 N$, with equality exactly when the adversary's distribution is uniform.
:::

::: example Entropy of an anonymity set {#ex-anonymity}
A message leaves an anonymity network, and an adversary who watches the network's entry points knows it came from one of $5$ users. (a) If the adversary has no further information, what is the effective anonymity set size? (b) If timing analysis makes one user $50\%$ likely and the other four $12.5\%$ each?
::: solution
(a) The distribution is uniform, $H = \log_2 5 \approx 2.32$ bits, effective size $5$. (b) $H = -(0.5\log_2 0.5 + 4 \times 0.125 \log_2 0.125) = 0.5 + 4 \times 0.125 \times 3 = 2$ bits, effective size $2^2 = 4$. The set still has five members, but the adversary's information has shrunk it to the equivalent of four equally likely senders — and a few more observations of the same skewed kind, if independent, would shrink it rapidly.
:::
:::

David Chaum's **mix networks** (1981) hide the link between senders and receivers by passing messages through relays that decrypt one layer each, batch messages and reorder them before sending them on. **Tor** (Dingledine, Mathewson and Syverson, 2004) applies the layered-encryption idea, **onion routing**, to low-latency traffic such as web browsing: the client chooses a circuit of three relays and wraps its traffic in three layers of encryption, so the first relay knows the client but not the destination, the last knows the destination but not the client, and no single relay knows both. To keep latency low Tor does not batch or delay traffic, so it does not resist an adversary who can watch *both* ends of a circuit and correlate the timing and volume of traffic — a limitation stated in its design. The anonymity a user gets also depends on how many others use the system and how alike they look: an anonymity network is only as good as its crowd, which is why usability is a security property here.

## De-identification and its failures

The usual way to share data about people is to **de-identify** it: remove **direct identifiers** (names, ID numbers, email addresses), and perhaps replace them by **pseudonyms**. The remaining attributes, however, are often **quasi-identifiers**: not identifying alone, but identifying in combination, and available in other data sets that *do* carry names.

The canonical demonstration came from Latanya Sweeney in the 1990s. A state agency in Massachusetts released hospital-visit records of state employees with names removed but with ZIP code, birth date and sex. Sweeney bought the voter roll of the city of Cambridge, which listed those three attributes with names, and linked the two to find the medical records of the state's governor. She later estimated from census data that about 87% of the US population is uniquely identified by five-digit ZIP code, birth date and sex. Similar **linkage attacks** re-identified users from AOL's released search logs (2006), and Arvind Narayanan and Vitaly Shmatikov showed in 2008 that a few film ratings with approximate dates sufficed to identify most records in the "anonymised" data set of the Netflix Prize, by matching them with public reviews.

::: warning "The data is anonymous because we removed the names"
Removing names is pseudonymisation at best. Any attribute that is rare, or rare in combination with others, and that also appears in some other data set, can link a record back to a person — and you cannot know every data set an adversary has or will have. Rich, high-dimensional data (location traces, purchase histories, browsing logs, genomes) is almost always identifiable. Treat de-identified individual-level data as personal data unless you can *prove* a guarantee about what it reveals, which is what differential privacy offers.
:::

Pierangela Samarati and Sweeney proposed a syntactic repair in 1998.

::: definition $k$-anonymity {#def-k-anonymity}
A table released with a chosen set of quasi-identifier attributes is **$k$-anonymous** if every combination of quasi-identifier values that appears in it appears in at least $k$ records. The sets of records sharing a combination are its **equivalence classes**. $k$-anonymity is achieved by **generalising** values (replacing an age by a range, a postcode by its prefix) and **suppressing** values or records.
:::

::: example Making a table 4-anonymous {#ex-k-anon}
A fictional clinic's table has quasi-identifiers postcode, age and sex and the sensitive attribute diagnosis:

| postcode | age | sex | diagnosis |
|---|---|---|---|
| 13053 | 28 | F | flu |
| 13068 | 29 | M | asthma |
| 13068 | 21 | F | flu |
| 13053 | 23 | M | bronchitis |
| 14853 | 50 | F | diabetes |
| 14853 | 55 | M | diabetes |
| 14850 | 47 | F | diabetes |
| 14850 | 49 | M | diabetes |

Generalise it to be 4-anonymous and examine what it still reveals.
::: solution
Generalise postcodes to their first three digits, ages to "under 30" and "40 or over", and suppress sex:

| postcode | age | sex | diagnosis |
|---|---|---|---|
| 130\*\* | < 30 | \* | flu |
| 130\*\* | < 30 | \* | asthma |
| 130\*\* | < 30 | \* | flu |
| 130\*\* | < 30 | \* | bronchitis |
| 148\*\* | ≥ 40 | \* | diabetes |
| 148\*\* | ≥ 40 | \* | diabetes |
| 148\*\* | ≥ 40 | \* | diabetes |
| 148\*\* | ≥ 40 | \* | diabetes |

There are two equivalence classes of four records each, so the table is 4-anonymous: nobody's record can be pinned down to fewer than four. But anyone who knows that a neighbour aged 50 from postcode 14853 visited the clinic learns that he has diabetes, because every record in his class has it — a **homogeneity attack**. Machanavajjhala and colleagues' **$\ell$-diversity** (2006) asks for at least $\ell$ "well-represented" sensitive values in each class (here the second class has only one); **$t$-closeness** (2007) asks each class's distribution to be close to the overall one. Each refinement patches one attack, and none controls what an adversary with other background knowledge learns, nor what several releases reveal together.
:::
:::

The deeper problem is that these definitions are properties of the *output table*, not of the *process* that produced it, and so say nothing about an adversary's auxiliary information. Irit Dinur and Kobbi Nissim made the danger precise in 2003: if a database answers too many statistical queries too accurately — in their model, with error much smaller than $\sqrt n$ on $n$ records — then an adversary can reconstruct almost all of the private bits. Every release of statistics "uses up" some privacy, and accuracy and privacy must be traded against each other explicitly.

## Differential privacy

Cynthia Dwork, Frank McSherry, Kobbi Nissim and Adam Smith (2006) proposed a definition that sidesteps the adversary's knowledge altogether: the output of an analysis should be almost equally likely whether or not any single person's data is included. Whatever an adversary knows, it learns almost nothing more about *you* from a release than it would have learnt had your record been absent.

::: definition Differential privacy {#def-dp}
Two data sets $D, D'$ are **neighbours** if they differ in the record of one individual. A randomised algorithm $\mathcal M$ is **$\varepsilon$-differentially private** if for all neighbouring $D, D'$ and every set $S$ of possible outputs,
$$
\Pr[\mathcal M(D) \in S] \le e^{\varepsilon} \Pr[\mathcal M(D') \in S].
$$ {#eq-dp}
The parameter $\varepsilon > 0$ is the **privacy loss**: smaller is more private.
:::

Two remarks make the definition concrete. First, it must be *randomised*: a deterministic non-constant function of the data changes its output for some pair of neighbours, violating [[#eq-dp]] with $S$ the set containing one of the outputs. Second, the guarantee is about the mechanism, not about a particular output, and holds against adversaries with any auxiliary information — including knowledge of every other record — because it compares worlds that differ only in one person's data.

To release a numerical statistic privately we add noise scaled to how much one person can change it.

::: definition Sensitivity and the Laplace mechanism {#def-laplace}
The **sensitivity** of a function $f$ from data sets to $\R$ is $\Delta f = \max \abs{f(D) - f(D')}$ over all neighbouring $D, D'$. The **Laplace distribution** $\mathrm{Lap}(b)$ has density $\frac{1}{2b} e^{-\abs{x}/b}$, mean $0$ and mean absolute value $b$. The **Laplace mechanism** releases $\mathcal M(D) = f(D) + Y$ with $Y \sim \mathrm{Lap}(\Delta f / \varepsilon)$.
:::

::: theorem The Laplace mechanism is differentially private {#thm-laplace}
For every $f$ with finite sensitivity $\Delta f$ and every $\varepsilon > 0$, the Laplace mechanism is $\varepsilon$-differentially private.
:::

::: proof
Let $D, D'$ be neighbours and write $b = \Delta f/\varepsilon$. The output densities at a point $z$ are $p_D(z) = \frac{1}{2b}e^{-\abs{z - f(D)}/b}$ and $p_{D'}(z) = \frac{1}{2b}e^{-\abs{z - f(D')}/b}$. Their ratio is
$$
\frac{p_D(z)}{p_{D'}(z)} = \exp\left(\frac{\abs{z - f(D')} - \abs{z - f(D)}}{b}\right) \le \exp\left(\frac{\abs{f(D) - f(D')}}{b}\right) \le \exp\left(\frac{\Delta f}{b}\right) = e^{\varepsilon},
$$
using the triangle inequality $\abs{z - f(D')} \le \abs{z - f(D)} + \abs{f(D) - f(D')}$ and the definition of sensitivity. Integrating $p_D(z) \le e^\varepsilon p_{D'}(z)$ over any set $S$ gives [[#eq-dp]].
:::

::: widget plot
f: exp(-abs(x)/b)/(2*b); exp(-abs(x-1)/b)/(2*b)
x: -8, 9
y: 0, 0.6
sliders: b=2:0.5:6:0.1
labels: output density with your record; output density without it
caption: The two output densities of the Laplace mechanism for a count that is $0$ or $1$ higher depending on whether one person's record is included (sensitivity $1$), with noise scale $b = 1/\varepsilon$. At every point the ratio of the curves is at most $e^{1/b} = e^{\varepsilon}$ ([[#thm-laplace]]). Make $b$ small (large $\varepsilon$): the peaks separate and an observer can tell the worlds apart. Make $b$ large: the curves almost coincide — strong privacy, but noisier answers.
:::

::: example Releasing a count {#ex-laplace}
A (fictional) study wants to publish how many of its participants have a condition; the true count is $412$. Release it with $\varepsilon = 0.5$, and check the size of the error empirically.
::: solution
Adding or removing one person changes a count by at most $1$, so $\Delta f = 1$ and $b = 1/\varepsilon = 2$.

```python
import math, random

def laplace(b, rng):
    """Sample Laplace(0, b) by inverting its distribution function."""
    u = rng.random() - 0.5
    return -b * math.copysign(1, u) * math.log(1 - 2 * abs(u))

rng = random.Random(7)
true_count, eps = 412, 0.5                 # a counting query has sensitivity 1
b = 1 / eps
releases = [true_count + laplace(b, rng) for _ in range(5)]
print([round(x, 1) for x in releases])
errs = [abs(laplace(b, rng)) for _ in range(100_000)]
print(f"mean |error| {sum(errs)/len(errs):.3f}  (theory b = {b})")
print(f"P(|error| > 6) {sum(e > 6 for e in errs)/len(errs):.4f}  (theory e^-3 = {math.exp(-3):.4f})")
```

```console
[411.1, 409.6, 412.7, 408.1, 412.1]
mean |error| 1.997  (theory b = 2.0)
P(|error| > 6) 0.0493  (theory e^-3 = 0.0498)
```

A single release would be one of these numbers, typically within $2$ of the truth, and off by more than $6$ only about $5\%$ of the time ($\Pr[\abs Y > t] = e^{-t/b}$). For a count of several hundred that is very accurate, while the presence of any one participant is well hidden. Note the five releases above: publishing *many* noisy answers to the same question would let anyone average the noise away — which is what composition accounts for. (This sampler is for illustration; production systems use vetted libraries that also guard against floating-point side channels in noise generation.)
:::
:::

::: theorem Sequential composition {#thm-composition}
If $\mathcal M_1$ is $\varepsilon_1$-differentially private and $\mathcal M_2$ is $\varepsilon_2$-differentially private, and they use independent randomness, then releasing both $(\mathcal M_1(D), \mathcal M_2(D))$ is $(\varepsilon_1 + \varepsilon_2)$-differentially private. By induction, $k$ releases with losses $\varepsilon_1, \dots, \varepsilon_k$ have total loss $\sum_i \varepsilon_i$.
:::

::: proof
Take outputs in a discrete space for simplicity (the continuous case is the same with densities). For neighbours $D, D'$ and any pair of outputs $(a, b)$, independence gives
$$
\Pr[(\mathcal M_1(D), \mathcal M_2(D)) = (a, b)] = \Pr[\mathcal M_1(D) = a]\Pr[\mathcal M_2(D) = b] \le e^{\varepsilon_1}\Pr[\mathcal M_1(D') = a] \cdot e^{\varepsilon_2}\Pr[\mathcal M_2(D') = b],
$$
which is $e^{\varepsilon_1 + \varepsilon_2}\Pr[(\mathcal M_1(D'), \mathcal M_2(D')) = (a, b)]$. Summing over the pairs in any set $S$ gives [[#eq-dp]] with $\varepsilon_1 + \varepsilon_2$. The same holds if $\mathcal M_2$ is chosen adaptively after seeing $\mathcal M_1$'s output, since the bound for $\mathcal M_2$ holds conditionally on every value of $a$.
:::

Composition turns privacy into a **budget**: an organisation fixes a total $\varepsilon$ for a data set and spends it across all the statistics it ever releases, which is precisely the discipline that Dinur and Nissim's reconstruction result shows to be necessary. A second basic property, **post-processing**, says that any computation on the output of an $\varepsilon$-differentially private mechanism that does not look at the data again is still $\varepsilon$-differentially private, so released statistics can be rounded, made consistent or used to fit models freely.

### Local differential privacy and randomised response

When users do not trust the collector at all, each user can randomise their own data before sending it. The oldest such method predates computers: Stanley Warner's **randomised response** (1965), designed for surveys on embarrassing questions.

::: proposition Randomised response {#prop-rr}
Each respondent with a true answer $t \in \{\text{yes}, \text{no}\}$ flips a fair coin. On heads they answer truthfully; on tails they flip again and answer "yes" on heads and "no" on tails. Then (a) each individual's answer is $\ln 3$-differentially private with respect to their own true answer; (b) if a fraction $p$ of the population truly answers yes, the expected fraction of "yes" responses is $\lambda = p/2 + 1/4$, so $\hat p = 2\hat\lambda - 1/2$ is an unbiased estimator of $p$ from the observed fraction $\hat\lambda$.
:::

::: proof
(a) Here the neighbouring inputs are the two possible true answers. If $t = \text{yes}$, the response is yes with probability $\frac12 + \frac12 \cdot \frac12 = \frac34$, and no with probability $\frac14$; if $t = \text{no}$, yes with $\frac14$ and no with $\frac34$. The largest ratio between the probabilities of the same response under the two inputs is $\frac{3/4}{1/4} = 3 = e^{\ln 3}$. (b) A random respondent is a true "yes" with probability $p$, so $\lambda = \frac34 p + \frac14(1 - p) = \frac p2 + \frac14$. Solving, $p = 2\lambda - \frac12$; since $\hat\lambda$ is an unbiased estimate of $\lambda$ and the map is linear, $\hat p = 2\hat\lambda - \frac12$ is unbiased.
:::

::: example Simulating a survey {#ex-rr}
Simulate $10{,}000$ fictional respondents of whom about $30\%$ truly answer yes, apply randomised response, and estimate $p$.
::: solution
```python
import random

def respond(truth: bool, rng) -> bool:
    """Randomised response: first coin heads -> tell the truth; tails -> answer a second coin."""
    if rng.random() < 0.5:
        return truth
    return rng.random() < 0.5

rng = random.Random(2026)                  # fixed seed: the same output on every run
n, p = 10_000, 0.30                        # 30% of the (fictional) population truly answer yes
truths = [rng.random() < p for _ in range(n)]
answers = [respond(t, rng) for t in truths]
lam = sum(answers) / n                     # observed fraction of "yes"
print(f"observed yes: {lam:.4f}   estimate of p: {2 * lam - 0.5:.4f}   true p: {sum(truths) / n:.4f}")
```

```console
observed yes: 0.4102   estimate of p: 0.3204   true p: 0.3033
```

The estimate is $0.320$ against a true $0.303$. Its standard deviation is $2\sqrt{\lambda(1-\lambda)/n} \approx 2\sqrt{0.41 \times 0.59/10^4} \approx 0.0098$, so the error of $0.017$ is about $1.7$ standard deviations — typical. Without randomisation the standard deviation would be $\sqrt{p(1-p)/n} \approx 0.0046$: local privacy costs roughly a factor of two in accuracy here, and the price grows as $\varepsilon$ shrinks. Yet no individual's answer reveals much: a "yes" is only three times as likely from a true yes as from a true no.
:::
:::

Large deployments use the local model for telemetry — Google's RAPPOR in Chrome (2014) and Apple's collection of usage statistics — and the central model for official statistics: the US Census Bureau protected its 2020 census publications with a differentially private system, a decision that also showed how hard it is to choose $\varepsilon$ and to explain the resulting noise to data users. Differential privacy is not a cure-all: it protects individuals, not groups (a study can still reveal that smokers get cancer, which affects every smoker), its guarantee degrades with $\varepsilon$ in a way that must be chosen by policy, and correlated records (a family's data) weaken the "one person" unit unless it is chosen carefully.

::: quiz
A company releases the exact average salary of its 50 employees, and the next month — after one employee leaves — the exact average of the remaining 49. What has happened?

- [ ] Nothing harmful: averages are aggregate statistics.
- [x] Anyone who knows who left can compute that person's salary exactly.
- [ ] The releases are 1-differentially private because each is an average.
- [ ] Only someone with access to the payroll database could learn anything.
::: solution
The leaver's salary is $50\bar x_{50} - 49\bar x_{49}$, a **differencing attack**. Exact statistics are deterministic functions of the data and cannot be differentially private ([[#def-dp]]); aggregation alone protects nobody when releases can be compared. A differentially private release would add noise scaled to the sensitivity of each average and charge both releases to a privacy budget ([[#thm-composition]]).
:::
:::

## Privacy by design

The techniques combine into an engineering practice. **Minimise** what is collected and how long it is kept; **separate** identifiers from data (pseudonymisation with keys held elsewhere) and limit who can join them; **aggregate** and add noise before release; process data **locally** on users' devices when possible, sending only results; **encrypt** at rest and in transit; and give people **transparency and control** — notice, consent where it is the lawful basis, access and deletion. A **privacy impact assessment** (in GDPR terms, a data protection impact assessment) is the privacy counterpart of threat modelling: describe the flows, identify who could be harmed and how, and choose mitigations before building. Cryptography offers more specialised tools — private set intersection, secure multiparty computation ([[cryptography/protocols]]) and homomorphic encryption — that compute on data without revealing it, at a cost that has fallen to practical levels for some tasks.

::: history
Samuel Warren and Louis Brandeis's "The right to privacy" (*Harvard Law Review*, 1890) responded to instant photography and the popular press. Alan Westin's *Privacy and Freedom* (1967) shaped the fair-information-practice principles of the 1970s, which the OECD guidelines of 1980 and the EU's data-protection directive (1995) and GDPR (2016) codified. Stanley Warner introduced randomised response in 1965 and David Chaum mix networks in 1981; Roger Dingledine, Nick Mathewson and Paul Syverson published the design of Tor in 2004. Latanya Sweeney's re-identification work in the late 1990s and her paper with Pierangela Samarati on $k$-anonymity (1998) opened the study of de-identification; Helen Nissenbaum proposed contextual integrity in 2004; Irit Dinur and Kobbi Nissim proved their reconstruction theorem in 2003; and Cynthia Dwork, Frank McSherry, Kobbi Nissim and Adam Smith defined differential privacy in 2006, a contribution recognised by the Gödel Prize in 2017. Arvind Narayanan and Vitaly Shmatikov's Netflix-Prize study (2008) and Peter Eckersley's browser-fingerprinting study (2010) showed how identifiable "anonymous" data and browsers are.
:::

## Where this leads

Privacy depends on all the security mechanisms of this course: personal data must be protected by access control ([[security/access-control]]) and encryption, and its leakage through breaches is a central concern of incident response ([[security/malware]]). Data protection by design is part of the development process of [[security/secure-development]]. Differential privacy connects to machine learning — training models without memorising individual examples — and to the probability in Maths Atlas ([Maths Atlas: probability](/learn/maths/course.php?c=probability)); the cryptographic techniques for computing on private data are in [[cryptography]], and the ethical questions of data collection in [[software-engineering/professional-ethics]] and [[hci]].

::: summary
- Privacy protects data subjects. **Contextual integrity** ([[#def-contextual-integrity]]) judges a flow by the norms of the context in which information was shared; data-protection law adds purpose limitation, **data minimisation**, storage limitation and accountability.
- Trackers use cookies and **fingerprints**; identifying power is measured by **surprisal** in bits, which adds for independent attributes ([[#def-surprisal]]), and about $33$ bits identify anyone on Earth.
- **Anonymity** is measured by the entropy of the adversary's view of the anonymity set ([[#def-anonymity-set]]); Tor's onion routing hides who talks to whom from any single relay but not from an adversary watching both ends.
- **De-identification** by removing names fails against **linkage** with quasi-identifiers; **$k$-anonymity** ([[#def-k-anonymity]]) and its refinements are properties of a table and fall to homogeneity and background-knowledge attacks.
- **Differential privacy** ([[#def-dp]]) bounds how much any one person's data can change the distribution of outputs, against any adversary. The **Laplace mechanism** adds noise of scale $\Delta f/\varepsilon$ ([[#thm-laplace]]); privacy losses **add up** under composition ([[#thm-composition]]); **randomised response** is $\ln 3$-private locally ([[#prop-rr]]).
:::

## Exercises

::: exercise Surprisal of a birthday {level=1 check="8.51"}
Assuming birthdays are uniform over $365$ days, how many bits of surprisal does a person's birthday (day and month) carry? (Enter the value to two decimal places.)
::: solution
$\log_2 365 \approx 8.51$ bits.
:::
:::

::: exercise Laplace scale {level=1 check="10"}
A counting query (sensitivity $1$) is released with the Laplace mechanism at $\varepsilon = 0.1$. What is the scale $b$ of the noise, which is also its mean absolute error? (Enter $b$.)
::: solution
$b = \Delta f/\varepsilon = 1/0.1 = 10$.
:::
:::

::: exercise A privacy budget {level=1 check="0.25"}
An agency has a total budget of $\varepsilon = 1$ for a data set and wants to release $4$ statistics with equal shares. What $\varepsilon$ may each release use? (Enter the value.)
::: solution
By [[#thm-composition]], losses add, so each may use $1/4 = 0.25$.
:::
:::

::: exercise $k$ of a table {level=2 check="1"}
In the *original* table of [[#ex-k-anon]], taking postcode, age and sex as quasi-identifiers, what is the largest $k$ for which it is $k$-anonymous? And what is the largest $\ell$ for which the generalised table is $\ell$-diverse, if $\ell$-diversity means at least $\ell$ distinct sensitive values in every class? (Enter the largest $k$ for the original table.)
::: solution
Every row of the original has a distinct combination of postcode, age and sex, so each class has one record: $k = 1$. In the generalised table the second class contains only "diabetes", so the table is only $1$-diverse (the first class has three distinct values), even though it is $4$-anonymous.
:::
:::

::: exercise Sensitivity of an average {level=2}
Salaries in a data set are known to lie in $[0, 200{,}000]$, and the number of records $n$ is public and fixed (neighbouring data sets *replace* one person's record by another's). What is the sensitivity of the average salary? Design an $\varepsilon$-differentially private release of the average and give its mean absolute error for $n = 1000$ and $\varepsilon = 1$.
::: solution
Replacing one record changes the sum by at most $200{,}000$ and so the average by at most $200{,}000/n$; this bound is attained (replace a salary of $0$ by $200{,}000$), so $\Delta f = 200{,}000/n$. Release the average plus $\mathrm{Lap}(\Delta f/\varepsilon)$ noise; by [[#thm-laplace]] it is $\varepsilon$-differentially private. With $n = 1000$ and $\varepsilon = 1$, the scale and mean absolute error are $200$, small compared with typical salaries. Values outside the range must be **clipped** into it first, or the sensitivity bound is false.
:::
:::

::: exercise Randomised response with a biased coin {level=2}
Generalise [[#prop-rr]]: a respondent answers truthfully with probability $q > 1/2$ and otherwise gives the opposite answer. Compute the privacy loss $\varepsilon$ and an unbiased estimator of $p$. For which $q$ is $\varepsilon = 1$?
::: solution
If $t = \text{yes}$, the response is yes with probability $q$; if $t = \text{no}$, with probability $1 - q$. The largest ratio is $q/(1-q)$, so $\varepsilon = \ln\frac{q}{1-q}$. The expected yes fraction is $\lambda = qp + (1 - q)(1 - p) = (2q - 1)p + 1 - q$, so $\hat p = (\hat\lambda - 1 + q)/(2q - 1)$, unbiased as before. $\varepsilon = 1$ when $q/(1-q) = e$, i.e. $q = e/(1+e) \approx 0.731$. (Warner's original scheme is of this form; the two-coin scheme corresponds to $q = 3/4$, $\varepsilon = \ln 3$.)
:::
:::

::: exercise Deterministic mechanisms are not private {level=3}
Prove that no deterministic algorithm $\mathcal M$ whose output is not the same for all data sets is $\varepsilon$-differentially private for any finite $\varepsilon$, assuming any two data sets are connected by a chain of neighbours. Then explain why rounding the *output* of the Laplace mechanism to the nearest integer does not contradict this.
::: solution
Since $\mathcal M$ is not constant there are data sets $D_0, D_m$ with $\mathcal M(D_0) \ne \mathcal M(D_m)$. Join them by a chain of neighbours $D_0, D_1, \dots, D_m$; the outputs cannot all be equal, so some adjacent pair has $\mathcal M(D_i) = a \ne \mathcal M(D_{i+1})$. Take $S = \{a\}$: $\Pr[\mathcal M(D_i) \in S] = 1$ while $\Pr[\mathcal M(D_{i+1}) \in S] = 0$, and $1 \le e^\varepsilon \cdot 0$ is false for every finite $\varepsilon$. Rounding the Laplace mechanism's output is a deterministic function applied to an already randomised, private output; by post-processing the composite remains $\varepsilon$-differentially private. The mechanism as a whole is randomised, so the argument above does not apply to it.
:::
:::

::: exercise Implementing a private histogram {level=3}
A histogram counts the records in each of $m$ disjoint categories. Show that adding independent $\mathrm{Lap}(1/\varepsilon)$ noise to *every* count gives an $\varepsilon$-differentially private release, even though $m$ numbers are released — and explain why this does not contradict composition. Implement it for the fictional counts `{"flu": 120, "asthma": 45, "diabetes": 80}` with $\varepsilon = 1$ and seed $3$.
::: solution
Under add/remove neighbours, adding or removing one record changes exactly one count by exactly $1$, so the vector of counts has sensitivity $1$ in the $\ell_1$ norm (sum of absolute changes). For the vector mechanism the density ratio at an output $z$ is $\prod_j \exp((\abs{z_j - c'_j} - \abs{z_j - c_j})\varepsilon) \le \exp(\varepsilon \sum_j \abs{c_j - c'_j}) = e^{\varepsilon}$, as in the proof of [[#thm-laplace]]. Composition would charge $m\varepsilon$ if each count could change independently; here one person affects only one count (**parallel composition** over disjoint parts of the data), so the total is $\varepsilon$.

```python
import math, random

def laplace(b, rng):
    u = rng.random() - 0.5
    return -b * math.copysign(1, u) * math.log(1 - 2 * abs(u))

rng = random.Random(3)
counts = {"flu": 120, "asthma": 45, "diabetes": 80}
print({k: round(v + laplace(1.0, rng), 1) for k, v in counts.items()})
```

```console
{'flu': 119.3, 'asthma': 45.1, 'diabetes': 79.7}
```

(Your values depend on the generator; these are from Python 3.14 with seed $3$.) Negative or fractional noisy counts may be rounded and clipped at zero afterwards by post-processing.
:::
:::
