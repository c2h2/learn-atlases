In September 2015 the US Environmental Protection Agency announced that diesel cars sold by Volkswagen contained software that detected when a car was being tested for emissions — from the pattern of speed, steering and other inputs typical of a laboratory test — and only then ran the engine in a mode that met the limits. On the road, the cars emitted nitrogen oxides at many times the permitted level. Volkswagen said about eleven million vehicles worldwide were affected; the company paid billions in fines and settlements, and in 2017 a Volkswagen engineer who had worked on the software was sentenced in the United States to 40 months in prison. The code was, in a narrow sense, well engineered: it did exactly what it was designed to do.

Every previous chapter has asked how to build software right. This one asks what it means to build the *right* software, and what engineers owe to the people their systems affect. We look at the professional **codes of ethics** and how to use them, the **intellectual property** rules and **licences** that govern code, **privacy** and data protection, **accessibility**, and **accountability** for automated systems — including a theorem that limits what "fair" can mean. Where the law is involved we describe it as of 2026, in outline; it varies between countries and changes, and nothing here is legal advice.

## Professional responsibility

Software engineering is not a licensed profession in most countries, unlike medicine or (in many places) civil engineering: anyone may write software, and few jurisdictions require a qualification to build even critical systems. But it has the other marks of a profession — specialised knowledge that the public cannot check, and work whose failures harm people who had no say in it — and professional societies have codes of conduct to say what responsibilities follow.

::: definition Codes of ethics {#def-codes}
The **ACM Code of Ethics and Professional Conduct** (Association for Computing Machinery, revised 2018) states general ethical principles — contribute to society and human well-being; avoid harm; be honest and trustworthy; be fair and take action not to discriminate; respect the work required to produce new ideas and artefacts; respect privacy; honour confidentiality — followed by professional responsibilities (such as high-quality work, competence, knowing the relevant laws, accepting and giving review, thorough evaluation of risks, and building systems that are robustly and usably secure) and duties of leadership. The **Software Engineering Code of Ethics and Professional Practice** (ACM and IEEE Computer Society, 1999) organises its clauses under eight principles: **Public**, **Client and employer**, **Product**, **Judgment**, **Management**, **Profession**, **Colleagues** and **Self**, the first being that software engineers shall act consistently with the public interest.
:::

Codes do not settle hard cases mechanically; they give a structure for thinking about them and a shared standard to appeal to. Both codes place the public interest above the interests of employer and client when they conflict, and both expect an engineer who sees a risk of harm to say so. The ACM code's principle on avoiding harm adds that a computing professional has an obligation to report signs of system risks that might result in harm, and recognises that blowing the whistle carries costs and should be done carefully, after attempts to resolve the issue inside the organisation.

A practical method for an ethical question at work:

1. **State the facts** and identify who is affected — not only the client and users, but third parties, and people who will never use the system but are judged by it.
2. **Identify the obligations** that apply: law, contract, the codes, the organisation's own policies, and ordinary moral duties (honesty, avoiding harm, fairness, respecting autonomy).
3. **Generate options** beyond comply/refuse: ask questions, propose a safer design, document your concerns, escalate, involve legal or compliance staff, and only as a last resort refuse or report externally.
4. **Evaluate** each option by its consequences for those affected and by whether you could defend it publicly — the "front page test".
5. **Act and record** what you did and why.

::: example A request from a manager {#ex-ethics-case}
You work on a subscription service. Your manager asks you to make cancellation harder: the "cancel" link should be moved to the bottom of a settings page, and cancellation should require a phone call during office hours, although sign-up takes one click online. Analyse the request with the method above.
::: solution
*Facts and stakeholders.* Customers who want to cancel, including those with disabilities or who work during office hours; the company, whose revenue depends on retention; customer-service staff who will take the calls; you, asked to implement it.

*Obligations.* Honesty and avoiding harm (ACM 1.2, 1.3): a design whose purpose is to make customers fail at something they are entitled to do is a **dark pattern**, deliberately deceptive or obstructive. Fairness (1.4): a phone-only cancellation path excludes people who are deaf or have speech impairments unless an alternative exists. Law: as of 2026 many jurisdictions regulate this — consumer-protection rules in the EU and UK require cancellation to be possible as easily as sign-up for many contracts, and the US Federal Trade Commission has pursued "negative option" practices — so the request may also be unlawful; the company's lawyers should be asked.

*Options.* (a) Implement it as asked. (b) Refuse outright. (c) Ask what problem the manager is trying to solve — perhaps customers leave for a fixable reason — and propose alternatives: an online cancellation flow with one retention offer (honest, skippable) and an exit survey, which addresses the business goal without obstruction. (d) If the manager insists, put your concern in writing, consult legal or compliance, and decide whether you are willing to build it.

*Evaluation.* (c) serves the company's legitimate interest and the customers'; (a) fails the front page test; (b) is defensible but forgoes the chance to fix the problem. Most real ethical problems at work are like this: not heroic refusals but the persistent offering of a better alternative, and a record of having done so.
:::
:::

David Parnas offered a well-known example of professional judgement in 1985, when he resigned from a US advisory panel on software for the Strategic Defense Initiative, explaining in a series of papers ("Software aspects of strategic defense systems", *Communications of the ACM*, 1985) that software of the required kind could not be tested under realistic conditions and so could never be trusted to work the first time it was needed — the argument of [[software-engineering/verification#prop-test-infeasible]], applied to a policy question.

## Intellectual property and licences

Code is protected by several kinds of **intellectual property** law. **Copyright** protects the expression of a program — its source and object code — automatically from the moment it is written, without registration, in the countries of the Berne Convention; it does not protect the underlying ideas or algorithms. **Patents**, where software patents are granted (rules differ sharply between the US and Europe), protect inventions, including some algorithms and techniques, for about twenty years and must be applied for. **Trade secrets** protect confidential information that a company keeps secret. **Trademarks** protect names and logos. For an employee, the employer usually owns the copyright in code written as part of the job; for a contractor, ownership depends on the contract.

Because copyright is automatic, code found on the internet is *not* free to use unless its owner grants permission. That permission is a **licence**.

::: definition Free and open-source licences {#def-licences}
A **free software** or **open-source** licence grants everyone the rights to use, study, modify and redistribute the software. **Permissive** licences (MIT, BSD, Apache 2.0) impose few conditions — typically keeping the copyright notice, and for Apache 2.0 stating changes and respecting its patent terms — and allow the code to be included in proprietary software. **Copyleft** licences (the GNU General Public License, GPL; the LGPL; the AGPL) require that distributed modified versions and, for the GPL, larger works based on the code be licensed under the same terms, with source code available; the AGPL extends this to software offered to users over a network. Two licences are **compatible** if code under both can be combined into one work that satisfies both.
:::

The Free Software Foundation's definition of free software (from the 1980s; Richard Stallman announced the GNU project in 1983) and the Open Source Initiative's Open Source Definition (1998) describe nearly the same set of licences from different philosophical starting points — freedom of users as a moral matter, or a development method with practical advantages. Standard short identifiers from the **SPDX** project (`MIT`, `Apache-2.0`, `GPL-3.0-only`, `GPL-2.0-or-later`) let tools read licences reliably.

::: example Checking dependency licences {#ex-licences}
A project depends on four (fictional) libraries. Using a simplified table of compatibility, based on the Free Software Foundation's published views, check whether each can be used in the project if the project is distributed under GPL-3.0 or under Apache-2.0.
::: solution
```python
# A deliberately simplified compatibility table: may code under the licence in the
# row be combined into a program distributed under the licence in the column?
# (Based on the Free Software Foundation's published views; not legal advice.)
OK = {
    ("MIT", "MIT"), ("MIT", "Apache-2.0"), ("MIT", "GPL-2.0-only"), ("MIT", "GPL-3.0-only"),
    ("BSD-3-Clause", "Apache-2.0"), ("BSD-3-Clause", "GPL-2.0-only"),
    ("BSD-3-Clause", "GPL-3.0-only"),
    ("Apache-2.0", "Apache-2.0"), ("Apache-2.0", "GPL-3.0-only"),
    ("GPL-2.0-only", "GPL-2.0-only"), ("GPL-3.0-only", "GPL-3.0-only"),
}

def check(project_licence, dependencies):
    for name, lic in dependencies.items():
        verdict = "ok" if (lic, project_licence) in OK else "CONFLICT - ask"
        print(f"  {name:10} {lic:14} {verdict}")

deps = {"httpkit": "Apache-2.0", "tinyparse": "MIT",
        "oldcrypto": "GPL-2.0-only", "plotlib": "BSD-3-Clause"}
for project in ("GPL-3.0-only", "Apache-2.0"):
    print("project under", project)
    check(project, deps)
```

```console
$ python3 licences.py
project under GPL-3.0-only
  httpkit    Apache-2.0     ok
  tinyparse  MIT            ok
  oldcrypto  GPL-2.0-only   CONFLICT - ask
  plotlib    BSD-3-Clause   ok
project under Apache-2.0
  httpkit    Apache-2.0     ok
  tinyparse  MIT            ok
  oldcrypto  GPL-2.0-only   CONFLICT - ask
  plotlib    BSD-3-Clause   ok
```

The permissive libraries are fine either way. `oldcrypto` conflicts with both. Under Apache-2.0 the reason is copyleft: distributing it inside the project would require the combined work to be under GPL-2.0. Under GPL-3.0 the reason is subtler: "GPL-2.0-only" forbids relicensing under later versions, and GPL-2.0 and GPL-3.0 impose different conditions, so the Free Software Foundation regards them as incompatible; had the library been "GPL-2.0-or-later", it could be used under GPL-3.0. Apache-2.0 code is compatible with GPL-3.0 but, in the FSF's view, not with GPL-2.0, because of Apache's patent terms. Real compatibility depends on how the code is combined and distributed (linking, separate programs, use only on a server), which is where legal advice is needed; the program's value is to flag the questions automatically, in continuous integration ([[software-engineering/version-control]]), before a release.
:::
:::

Two further obligations are easy to forget. Distributing software under a licence's terms usually requires passing on its notices — so a product that bundles hundreds of open-source components must ship hundreds of notices. And the status of code produced by machine-learning assistants trained on public code — who owns it, and whether it can reproduce licensed code verbatim — was, as of 2026, the subject of ongoing litigation and differing official guidance; organisations increasingly set policies for its use and scan its output like any other contribution.

## Privacy

Most software processes personal data, and its developers decide, often without noticing, what is collected, how long it is kept and who can see it. Data protection law makes some of these decisions obligatory. The most influential is the European Union's **General Data Protection Regulation** (GDPR, Regulation (EU) 2016/679), which applies from 25 May 2018 to processing of personal data of people in the EU, wherever the processor is; the UK retained it in its own law after leaving the EU, and many other countries have modelled laws on it.

::: definition Data protection principles {#def-gdpr}
Under Article 5 of the GDPR, personal data — information relating to an identified or identifiable living person — must be processed **lawfully, fairly and transparently**; collected for specified, explicit and legitimate purposes and not used incompatibly with them (**purpose limitation**); adequate, relevant and limited to what is necessary (**data minimisation**); **accurate**; kept in identifiable form no longer than necessary (**storage limitation**); and processed securely (**integrity and confidentiality**). The controller must be able to demonstrate compliance (**accountability**). Article 25 requires **data protection by design and by default**: appropriate measures built into systems from the start, and settings that by default process only the data necessary for each purpose.
:::

The regulation also gives individuals rights — of access, rectification, erasure and portability, and not to be subject to some decisions based solely on automated processing — and requires notification of serious personal-data breaches to the regulator, where feasible within 72 hours. Fines can reach €20 million or 4% of worldwide annual turnover. For developers the principles translate into concrete requirements ([[software-engineering/requirements]]): do not collect a field "in case it is useful"; attach a retention period to every kind of record and delete on schedule; design the erasure path at the same time as the sign-up path; log access to sensitive data; encrypt it in transit and at rest ([[security/privacy]]).

### Identifiability

Removing names does not make data anonymous. Latanya Sweeney estimated from 1990 US census data that 87% of the US population was uniquely identified by the combination of five-digit ZIP code, sex and full date of birth ("Simple demographics often identify people uniquely", 2000); Philippe Golle, repeating the analysis with 2000 census data (WPES 2006), found about 63% — lower, but still a majority. Data sets "anonymised" by removing names have been re-identified by linking them with other data: Sweeney identified the medical records of the governor of Massachusetts in a released hospital data set in the 1990s, and Narayanan and Shmatikov (IEEE Symposium on Security and Privacy, 2008) re-identified users in the Netflix Prize ratings by comparison with public reviews. The GDPR accordingly distinguishes **pseudonymised** data — identifiers replaced, but re-identifiable with additional information — which is still personal data, from truly **anonymous** data, which is not.

::: definition $k$-anonymity {#def-k-anonymity}
In a table, the **quasi-identifiers** are attributes that are not identifying alone but may identify in combination or by linking with other data (postcode, birth date, sex). The table is **$k$-anonymous** if every combination of quasi-identifier values that occurs in it occurs in at least $k$ rows, so that each person is indistinguishable from at least $k - 1$ others.
:::

::: example Measuring and improving $k$ {#ex-k-anonymity}
A fictional data set records postcode, birth year, sex and diagnosis for eight people. Compute $k$, then generalise postcodes to districts and birth years to five-year bands and compute it again.
::: solution
```python
from collections import Counter

# A fictional data set: quasi-identifiers (postcode, birth year, sex) and a diagnosis.
rows = [
    ("LS6 1AB", 1990, "F", "asthma"),   ("LS6 2CD", 1991, "F", "flu"),
    ("LS6 1AB", 1990, "M", "diabetes"), ("LS6 3EF", 1993, "M", "asthma"),
    ("LS2 9JT", 1975, "F", "migraine"), ("LS2 7HY", 1978, "F", "flu"),
    ("LS2 9JT", 1976, "M", "asthma"),   ("LS2 8QQ", 1979, "M", "flu"),
]

def k_anonymity(records, generalise):
    """Smallest group size when records are grouped by generalised quasi-identifiers."""
    groups = Counter(generalise(r) for r in records)
    return min(groups.values()), groups

exact = lambda r: r[:3]
coarse = lambda r: (r[0].split()[0], r[1] // 5 * 5, r[2])  # district, 5-year band, sex

if __name__ == "__main__":
    for name, g in (("exact", exact), ("generalised", coarse)):
        print(f"{name}: k = {k_anonymity(rows, g)[0]}")
    for key, n in sorted(k_anonymity(rows, coarse)[1].items()):
        print("  ", key, n)
```

```console
$ python3 kanon.py
exact: k = 1
generalised: k = 2
   ('LS2', 1975, 'F') 2
   ('LS2', 1975, 'M') 2
   ('LS6', 1990, 'F') 2
   ('LS6', 1990, 'M') 2
```

With exact values every person is unique ($k = 1$): anyone who knows a neighbour's postcode, birth year and sex learns their diagnosis. After generalisation, $k = 2$. That is still weak, and $k$-anonymity has a known gap: if both people in a group had the same diagnosis, the group would reveal it anyway (a **homogeneity** attack), which led to refinements such as $\ell$-diversity (Machanavajjhala and colleagues, 2006). The strongest modern approach, **differential privacy** (Dwork, McSherry, Nissim and Smith, 2006), protects aggregate statistics by adding calibrated random noise, with a mathematical guarantee that no individual's presence changes the output distribution by much ([[security/privacy]]).
:::
:::

A related error is to "anonymise" identifiers by hashing them. If the identifiers come from a small space — six-digit staff numbers, phone numbers, car registrations — anyone can hash every possible value and look the results up. On the reader's own machine, for a toy data set:

```python
import hashlib, hmac, secrets

def naive_pseudonym(staff_id):            # unkeyed hash: anyone can recompute it
    return hashlib.sha256(staff_id.encode()).hexdigest()[:16]

KEY = secrets.token_bytes(32)             # kept separately from the data set

def keyed_pseudonym(staff_id):            # HMAC: needs the key to recompute
    return hmac.new(KEY, staff_id.encode(), hashlib.sha256).hexdigest()[:16]

published = naive_pseudonym("482913")     # appears in a "pseudonymised" export
# Staff IDs are six digits, so an outsider can simply try all 10**6 of them:
recovered = next(f"{n:06d}" for n in range(10**6) if naive_pseudonym(f"{n:06d}") == published)
print("naive pseudonym", published, "-> staff ID", recovered)
print("keyed pseudonym", len(keyed_pseudonym("482913")), "hex digits; without KEY,",
      "enumerating IDs does not help")
```

```console
$ time python3 pseudonym.py
naive pseudonym 4a8eec4925826f4b -> staff ID 482913
keyed pseudonym 16 hex digits; without KEY, enumerating IDs does not help

real	0m0.727s
```

Under a second to reverse. A keyed hash (HMAC) with a secret key stored apart from the data cannot be recomputed by an outsider, which makes it a reasonable pseudonymisation technique — but the result is still pseudonymised, not anonymous, because whoever holds the key can re-identify. (Use a vetted library's HMAC, as here, never a home-made construction; [[cryptography]].)

## Accessibility

About one person in six lives with a significant disability, according to the World Health Organization's 2023 estimate, and everyone is temporarily impaired at times — a broken arm, bright sunlight on a screen, a noisy train. Software that cannot be used with a screen reader, a keyboard alone, magnification or captions excludes these people from services that are increasingly online only. **Accessibility** is the design of systems that people with the widest range of abilities can use.

The standard reference is the W3C's **Web Content Accessibility Guidelines** (WCAG 2.0 in 2008, 2.1 in 2018, 2.2 in October 2023), whose success criteria are organised under four principles — content must be **perceivable**, **operable**, **understandable** and **robust** — and graded at levels A, AA and AAA. Level AA is the usual legal and contractual target: in the EU, the European Accessibility Act applies to many products and services from 28 June 2025, and public-sector websites in many countries must meet WCAG AA. Typical requirements: every image has a text alternative; everything works from a keyboard, with a visible focus; forms have labels and clear error messages; video has captions; and text has enough **contrast** with its background.

::: definition Contrast ratio {#def-contrast}
For an sRGB colour with 8-bit components $R, G, B$, let each component $v \in \set{R, G, B}$ be linearised as $c = v/255$, then $c_{\text{lin}} = c/12.92$ if $c \le 0.04045$ and $\bigl((c + 0.055)/1.055\bigr)^{2.4}$ otherwise. The **relative luminance** is $L = 0.2126\,R_{\text{lin}} + 0.7152\,G_{\text{lin}} + 0.0722\,B_{\text{lin}}$, from $0$ (black) to $1$ (white). The **contrast ratio** of two colours with luminances $L_1 \ge L_2$ is
$$
\frac{L_1 + 0.05}{L_2 + 0.05},
$$
from $1$ to $21$. WCAG 2.2 success criterion 1.4.3 (level AA) requires at least $4.5$ for normal text and $3$ for large text; criterion 1.4.6 (AAA) requires $7$ and $4.5$.
:::

(Earlier WCAG versions gave the linearisation threshold as $0.03928$, a difference with no effect on 8-bit colours.)

::: example Checking colour contrast {#ex-contrast}
Implement [[#def-contrast]] and classify six colour pairs, including two greys that differ by one step.
::: solution
```python
def luminance(hex_colour):
    """Relative luminance of an sRGB colour such as '#767676' (WCAG 2.x)."""
    def linear(c):
        c /= 255
        return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4
    r, g, b = (int(hex_colour[i:i + 2], 16) for i in (1, 3, 5))
    return 0.2126 * linear(r) + 0.7152 * linear(g) + 0.0722 * linear(b)

def contrast(fg, bg):
    hi, lo = sorted((luminance(fg), luminance(bg)), reverse=True)
    return (hi + 0.05) / (lo + 0.05)

for fg, bg in [("#000000", "#FFFFFF"), ("#767676", "#FFFFFF"), ("#777777", "#FFFFFF"),
               ("#FF0000", "#FFFFFF"), ("#0000EE", "#FFFFFF"), ("#AAAAAA", "#000000")]:
    r = contrast(fg, bg)
    verdict = "AAA" if r >= 7 else "AA" if r >= 4.5 else "AA large text only" if r >= 3 else "fails"
    print(f"{fg} on {bg}: {r:5.2f}:1  {verdict}")
```

```console
$ python3 contrast.py
#000000 on #FFFFFF: 21.00:1  AAA
#767676 on #FFFFFF:  4.54:1  AA
#777777 on #FFFFFF:  4.48:1  AA large text only
#FF0000 on #FFFFFF:  4.00:1  AA large text only
#0000EE on #FFFFFF:  9.40:1  AAA
#AAAAAA on #000000:  9.04:1  AAA
```

`#767676` is the lightest grey that passes AA on white; one step lighter fails. Pure red on white fails for normal text.
:::
:::

Automated checks like this are valuable in continuous integration, but they catch only part of the problem: WebAIM's annual automated survey of the home pages of the top million websites has found detectable WCAG failures — low-contrast text the most common — on more than 90% of them in every year since it began in 2019, and automated tools cannot judge whether alternative text is meaningful or a flow is usable with a screen reader. Testing with assistive technology and with disabled users ([[hci/accessibility-ethics]]) is the rest.

::: widget plot
f: 1.05/(((x + 0.055)/1.055)^2.4 + 0.05)
x: 0.05, 1
y: 1, 21
hlines: 3; 4.5; 7
labels: \text{contrast of grey } x \text{ against white}
caption: The contrast ratio of [[#def-contrast]] between a grey with all three components equal to $x$ (as a fraction of 255, horizontal axis) and white. The horizontal lines are the thresholds 3 (large text, AA), 4.5 (normal text, AA) and 7 (normal text, AAA). The curve crosses 4.5 at $x \approx 0.46$, that is about 118 of 255 (`#767676`). Notice how non-linear perception is: mid-grey ($x = 0.5$) is already below 4:1 against white.
:::

## Accountability for automated decisions

When software makes or supports decisions about people — credit, hiring, policing, benefits, medical triage — its errors fall on individuals who usually cannot see the code, and its patterns of error can systematically disadvantage groups. The professional duties of fairness and of evaluating risks apply with special force, and the law increasingly agrees: the GDPR restricts decisions based solely on automated processing, and the EU's Artificial Intelligence Act (Regulation (EU) 2024/1689) imposes obligations on "high-risk" systems that are being phased in between 2025 and 2027.

A case that shaped the debate: in 2016 the journalists of ProPublica analysed COMPAS, a commercial tool that scores defendants' risk of reoffending, and reported that among defendants who did *not* reoffend, Black defendants had been labelled high-risk about twice as often as white defendants. The vendor replied that the scores were equally accurate for both groups: a high-risk label meant the same probability of reoffending whatever the defendant's race. Both statements were true of the same data. The following result, due to Alexandra Chouldechova ("Fair prediction with disparate impact", 2017; closely related results are by Kleinberg, Mullainathan and Raghavan, 2016), explains why.

::: proposition Fairness criteria conflict {#prop-fairness}
For a binary classifier applied to a group in which a fraction $p$ (the **base rate**, $0 < p < 1$) are actually positive, let $\mathrm{PPV}$ be its positive predictive value (the fraction of predicted positives that are positive, assumed $> 0$), $\mathrm{FNR}$ its false-negative rate and $\mathrm{FPR}$ its false-positive rate. Then
$$
\mathrm{FPR} = \frac{p}{1 - p} \cdot \frac{1 - \mathrm{PPV}}{\mathrm{PPV}} \cdot (1 - \mathrm{FNR}).
$$ {#eq-chouldechova}
Consequently, if two groups have different base rates, a classifier that has the same $\mathrm{PPV}$ and the same $\mathrm{FNR}$ in both groups must have different false-positive rates — unless it is perfect.
:::

::: proof
Let the group have $N$ members, so $pN$ are positive and $(1-p)N$ negative, and let $\mathit{TP}$ and $\mathit{FP}$ be the numbers of true and false positives. By definition $\mathrm{FNR} = 1 - \mathit{TP}/(pN)$, so $\mathit{TP} = (1 - \mathrm{FNR})\,pN$. Also $\mathrm{PPV} = \mathit{TP}/(\mathit{TP} + \mathit{FP})$, so $\mathit{FP} = \mathit{TP}\,(1 - \mathrm{PPV})/\mathrm{PPV}$. Then
$$
\mathrm{FPR} = \frac{\mathit{FP}}{(1-p)N} = \frac{(1-\mathrm{FNR})\,pN\,(1-\mathrm{PPV})}{\mathrm{PPV}\,(1-p)N},
$$
which is [[#eq-chouldechova]]. If $\mathrm{PPV}$ and $\mathrm{FNR}$ are fixed and $\mathrm{PPV} < 1$, $\mathrm{FNR} < 1$, then $\mathrm{FPR}$ is a strictly increasing function of $p/(1-p)$, and so of $p$; different base rates give different false-positive rates. The only escapes are $\mathrm{PPV} = 1$ (no false positives at all) or $\mathrm{FNR} = 1$ (no true positives at all).
:::

With base rates $0.5$ and $0.2$, a classifier with $\mathrm{PPV} = 0.6$ and $\mathrm{FNR} = 0.3$ in both groups has false-positive rates $1 \cdot \tfrac{0.4}{0.6} \cdot 0.7 \approx 0.47$ and $0.25 \cdot \tfrac{0.4}{0.6} \cdot 0.7 \approx 0.12$: people in the first group who would not reoffend are four times as likely to be wrongly labelled. The mathematics does not say which criterion is right; it says that a choice must be made, that it is a value judgement with consequences for real people, and that it should be made explicitly, by people accountable for it, rather than left implicit in an engineer's choice of loss function.

::: widget bayes
mode: test
prevalence: 0.2
sensitivity: 0.7
specificity: 0.9
caption: Bayes' theorem as natural frequencies for a screening test or classifier: base rate (prevalence) $0.2$, true-positive rate $1 - \mathrm{FNR} = 0.7$, true-negative rate $1 - \mathrm{FPR} = 0.9$. Read off the positive predictive value. Now lower the prevalence to $0.05$, keeping the error rates fixed: most positives become false positives. The same classifier, applied to two groups with different base rates, cannot have equal predictive values *and* equal error rates — the content of [[#prop-fairness]].
:::

Accountability also means not trusting software more than it deserves. Between 1999 and 2015 the UK Post Office prosecuted hundreds of sub-postmasters for theft and false accounting, on the strength of shortfalls reported by its Horizon accounting system; many were convicted, imprisoned or bankrupted. In *Bates v Post Office* (2019) the High Court found that Horizon had contained bugs, errors and defects capable of causing such shortfalls, and from 2021 the courts, and in 2024 an Act of Parliament, quashed convictions. A legal presumption that computer evidence is reliable unless shown otherwise had placed the burden on defendants who had no access to the system's internals. The engineering lessons are the ones of this course: systems have defects ([[software-engineering/testing]]), their records need audit trails that can be independently checked, and the people who know about defects have a duty to disclose them.

::: warning "I just write the code"
It is tempting to believe that ethical responsibility lies with whoever decides *what* to build — managers, clients, regulators — and that implementing a specification is morally neutral. The codes reject this, and so have courts: the Volkswagen engineer was not the person who conceived the defeat device, but he implemented it knowing what it was for. Engineers are often the first to know that a system is unsafe, deceptive, discriminatory or unlawful, because they know what it actually does. "I was told to" is an explanation, not a defence. The opposite error is to treat every disagreement as an ethical emergency: most decisions are legitimate trade-offs that belong to the people responsible for them, and the engineer's duty is to make the consequences clear, not to substitute their own preferences.
:::

::: quiz
A company publishes a data set of user activity in which each user's e-mail address has been replaced by its SHA-256 hash. Under the GDPR, what is the data set?
- [ ] Anonymous data, because hashing is irreversible.
- [x] Pseudonymised personal data, still subject to the regulation.
- [ ] Not personal data, because no names are included.
- [ ] Encrypted data, which may be published freely.
::: solution
Anyone with a list of e-mail addresses can hash them and match the results, and activity patterns can identify people by themselves, so the data relate to identifiable people: they are personal data, and replacing identifiers by hashes is at best pseudonymisation (GDPR recital 26). A hash is not encryption, and "irreversible" does not mean "unlinkable" when the inputs can be guessed.
:::
:::

::: history
Norbert Wiener's *The Human Use of Human Beings* (1950) raised the social consequences of computing at the start of the field. The ACM adopted its first code of professional conduct in 1972, revising it in 1992 and 2018; the joint ACM/IEEE-CS Software Engineering Code followed in 1999. Richard Stallman announced GNU in 1983 and the first GNU General Public License appeared in 1989 (version 2 in 1991, version 3 in 2007); the Open Source Initiative was founded in 1998. The Therac-25 accidents (1985–87) and David Parnas's 1985 SDI papers made software safety a public concern. The W3C published WCAG 1.0 in 1999 and 2.0 in 2008. The GDPR was adopted in 2016 and applied from 2018, the year the revised ACM code appeared; the debate on algorithmic fairness crystallised around the COMPAS analyses of 2016–17.
:::

## Where this leads

Privacy engineering and the attacks it defends against are treated in [[security/privacy]], and secure development in [[security/secure-development]]. Accessibility, inclusive design and the ethics of research with users are in [[hci/accessibility-ethics]] and [[hci/experiments]]. Fairness in machine-learning systems, and the techniques for measuring and mitigating bias, are taught in the [LLM Atlas](/learn/llm/). Above all, the questions of this chapter apply to every other: the requirements you elicit, the architectures you choose, the tests you skip and the warnings you raise are where professional responsibility is actually exercised.

::: summary
- Software engineers' work harms people who never chose it when it fails; the **ACM Code** and the **Software Engineering Code** ([[#def-codes]]) put the public interest first and expect engineers to raise risks. Analyse hard cases: facts, obligations, options, evaluation, record.
- Code is protected by **copyright** automatically; using others' code needs a **licence** ([[#def-licences]]). Permissive licences allow proprietary use; copyleft requires sharing derived works; check compatibility before combining.
- **Data protection** (the GDPR) requires lawful, purpose-limited, minimal, accurate, time-limited, secure processing, by design and by default ([[#def-gdpr]]).
- Removing names does not anonymise: quasi-identifiers re-identify people. Measure **$k$-anonymity** ([[#def-k-anonymity]]), prefer aggregation or differential privacy, and never treat an unkeyed hash of a small identifier space as anonymous.
- **Accessibility** follows WCAG's four principles; contrast ratio $(L_1 + 0.05)/(L_2 + 0.05)$ must be at least 4.5 for normal text at AA ([[#def-contrast]]). Automated checks find only part of the problems.
- With different base rates, equal predictive value and equal error rates cannot all hold ([[#prop-fairness]]); fairness criteria are value choices that must be made explicitly and accountably.
- Accountability means disclosing known defects and risks; "I just write the code" is not a defence.
:::

## Exercises

::: exercise A contrast check {level=1 check="5.13"}
Using [[#def-contrast]] (or the program above), compute to two decimal places the contrast ratio of white text on the green `#2E7D32`. Does it meet AA for normal text? (Enter the ratio.)
::: solution
`contrast("#FFFFFF", "#2E7D32")` gives $5.127\ldots \approx 5.13$, which meets AA for normal text ($\ge 4.5$) but not AAA ($\ge 7$).
:::
:::

::: exercise Which principle? {level=1}
Name the GDPR principle of [[#def-gdpr]] most directly at stake: (a) a fitness app keeps users' location histories indefinitely "for future features"; (b) a newsletter sign-up form requires a date of birth; (c) customer data collected for delivery is sold to an advertising company; (d) a database of patient records is left accessible without a password.
::: solution
(a) Storage limitation (and purpose limitation: "future features" is not a specified purpose). (b) Data minimisation: a date of birth is not necessary for sending a newsletter. (c) Purpose limitation, and lawfulness and transparency unless customers were told and gave valid consent. (d) Integrity and confidentiality (security), and a personal-data breach that must be notified.
:::
:::

::: exercise Can I use this code? {level=1}
For each case, say whether you may do what is described, and what you must do: (a) copy a function from a blog post that states no licence into your company's product; (b) include an MIT-licensed library in a proprietary mobile app; (c) modify a GPL-3.0 command-line tool and distribute the modified binary to customers; (d) run a modified AGPL-3.0 web application on your own server for public users.
::: solution
(a) Not safely: copyright applies automatically, so without a licence you have no permission (beyond limited exceptions such as fair use, which you should not rely on). Ask the author or write your own. (b) Yes; keep the copyright and licence notice, typically in the app's "open-source licences" screen. (c) Yes, but you must license the modified program under GPL-3.0 and make its corresponding source code available to those customers. (d) Yes, but the AGPL requires you to offer the source of your modified version to the users who interact with it over the network.
:::
:::

::: exercise Re-identifying by enumeration {level=2 check="10"}
UK mobile numbers have the form 07 followed by nine digits. A data set replaces each number with its unkeyed SHA-256 hash. If an attacker can compute $10^8$ hashes per second, how many seconds does it take, at most, to hash every possible number and so reverse the whole data set? (Enter the number of seconds.)
::: solution
There are $10^9$ possible numbers, and $10^9 / 10^8 = 10$ seconds — a little more for the table lookups. Commodity graphics processors compute billions of SHA-256 hashes per second, so the real figure is smaller still. A slow password-hashing function would raise the cost but not change the conclusion for such a small space; a keyed HMAC with a secret key, or not publishing the identifiers at all, is needed.
:::
:::

::: exercise False-positive rates {level=2 check="0.114"}
A classifier has $\mathrm{PPV} = 0.75$ and $\mathrm{FNR} = 0.2$ in a group whose base rate is $p = 0.3$. Use [[#eq-chouldechova]] to compute its false-positive rate in that group, to three decimal places. (Enter the rate.)
::: solution
$\mathrm{FPR} = \tfrac{0.3}{0.7} \cdot \tfrac{0.25}{0.75} \cdot 0.8 = 0.42857 \times 0.33333 \times 0.8 \approx 0.114$. Check with counts: of 1000 people, 300 are positive, and 240 of them are flagged ($\mathrm{FNR} = 0.2$); with $\mathrm{PPV} = 0.75$, the 240 true positives are three quarters of all flagged, so 80 negatives are flagged out of 700: $80/700 \approx 0.114$.
:::
:::

::: exercise A safety concern {level=2}
You are a developer on an infusion-pump controller. A week before a release you find that, under a rare sequence of button presses, the displayed dose can differ from the dose delivered. Your manager says the release date is fixed and the scenario is "unrealistic". Using [[#def-codes]] and the method of this chapter, decide what to do.
::: solution
*Facts:* a defect with potential for serious harm to patients, who are third parties with no voice in the decision; "rare" sequences occur in practice when thousands of devices are used daily, and display/delivery mismatches are a classic cause of medication errors. *Obligations:* both codes put the public (Public, Product principles; ACM 1.2) above schedule pressure; medical-device regulation (for example IEC 62304 processes) requires such anomalies to be recorded and assessed; you are competent to judge the technical facts, not to accept the risk on patients' behalf. *Options:* document the defect precisely, with a reproduction and an assessment of severity, in the defect tracker; raise it formally with the manager and the safety or quality function responsible for risk acceptance; propose mitigations (a fix if small, a release with the affected function disabled, or a delay); do not quietly fix it without review, and do not stay silent. *Evaluation:* only the people accountable for safety can decide to release with a known hazard, and they must do so knowingly and on the record. If the organisation still suppresses the issue, the codes support escalation, ultimately to the regulator, after internal routes are exhausted — the costs to you are real, which is why the internal steps and the record matter.
:::
:::

::: exercise The impossibility, precisely {level=3}
Prove from [[#eq-chouldechova]] that if two groups have base rates $p_1 \ne p_2$, then a classifier cannot have equal $\mathrm{PPV}$, equal $\mathrm{FNR}$ and equal $\mathrm{FPR}$ in both groups unless $\mathrm{PPV} = 1$ or $\mathrm{FNR} = 1$ in both. Then show by an example that equal $\mathrm{FPR}$ and equal $\mathrm{FNR}$ *can* be achieved when base rates differ, and compute what happens to the predictive values.
::: solution
Suppose $\mathrm{PPV}$, $\mathrm{FNR}$ and $\mathrm{FPR}$ are equal in both groups, with common values $v$, $f$ and $r$. By [[#eq-chouldechova]], $r = \tfrac{p_i}{1-p_i} \cdot \tfrac{1-v}{v} \cdot (1-f)$ for $i = 1, 2$. If $v < 1$ and $f < 1$, the factor $\tfrac{1-v}{v}(1-f)$ is positive, so $\tfrac{p_1}{1-p_1} = \tfrac{p_2}{1-p_2}$; since $x \mapsto x/(1-x)$ is injective on $(0, 1)$, $p_1 = p_2$, a contradiction. So $v = 1$ or $f = 1$.

*Equal error rates are possible.* Take $\mathrm{FNR} = 0.2$ and $\mathrm{FPR} = 0.1$ in both groups, with base rates $0.5$ and $0.2$. For 1000 people in group 1: 500 positives, 400 flagged; 500 negatives, 50 flagged; $\mathrm{PPV}_1 = 400/450 \approx 0.89$. Group 2: 200 positives, 160 flagged; 800 negatives, 80 flagged; $\mathrm{PPV}_2 = 160/240 \approx 0.67$. Equal error rates force unequal predictive values: a flag means an 89% chance of being positive in one group and 67% in the other. Whether that is acceptable — or whether a flag should mean the same thing for everyone, at the price of unequal error rates — is not a mathematical question.
:::
:::

::: exercise Reaching a target $k$ {level=3}
Extend [[#ex-k-anonymity]]: write a function that tries generalisations of increasing coarseness — postcode to district, then to the area letters only; birth year to 5-, 10- and then 20-year bands; sex kept or suppressed — and returns the least coarse combination achieving a target $k$, measuring coarseness as the sum of the levels. Run it for $k = 2$ and $k = 4$ on the fictional data set. Why is "least coarse" a reasonable but imperfect objective?
::: solution
```python
from collections import Counter
from itertools import product
from kanon import rows

POSTCODE = [lambda p: p, lambda p: p.split()[0], lambda p: p[:2]]   # full, district, area
YEAR = [lambda y: y, lambda y: y // 5 * 5, lambda y: y // 10 * 10, lambda y: y // 20 * 20]
SEX = [lambda s: s, lambda s: "*"]

def k_of(levels):
    pc, yr, sx = POSTCODE[levels[0]], YEAR[levels[1]], SEX[levels[2]]
    return min(Counter((pc(p), yr(y), sx(s)) for p, y, s, _ in rows).values())

def least_coarse(k):
    options = sorted(product(range(3), range(4), range(2)), key=lambda l: (sum(l), l))
    return next(l for l in options if k_of(l) >= k)

for k in (2, 4):
    levels = least_coarse(k)
    print(f"k >= {k}: postcode level {levels[0]}, year level {levels[1]}, "
          f"sex level {levels[2]} (actual k = {k_of(levels)})")
```

```console
$ python3 generalise.py
k >= 2: postcode level 1, year level 1, sex level 0 (actual k = 2)
k >= 4: postcode level 1, year level 1, sex level 1 (actual k = 4)
```

For $k \ge 2$ the search rediscovers the generalisation of [[#ex-k-anonymity]] — districts and five-year bands, sex kept — because no option of total level 2 or less that keeps full postcodes works: several full postcodes occur only once. For $k \ge 4$ it suppresses sex as well. "Sum of levels" treats a step in any attribute as equally costly, which is arbitrary: a researcher studying sex differences would rather coarsen postcodes further than lose sex entirely. Better objectives weight attributes by their value for the intended analysis — and whatever the objective, $k$-anonymity does not protect against homogeneity or linkage with external data, so the generalised table should still be treated as personal data unless a stronger guarantee applies.
:::
:::
