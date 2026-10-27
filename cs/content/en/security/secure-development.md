Most vulnerabilities are not exotic. They are ordinary bugs — a missing check, a misunderstood input, an assumption that held in testing and not in production — that happen to be reachable by someone with a motive. The previous chapters studied particular classes of flaw and particular defences; this chapter asks how an organisation can build software that has fewer of them in the first place, find the ones that remain before attackers do, and handle the ones found afterwards responsibly. The answer is not a single tool but a process: security requirements and threat models at design time, safe defaults and robust input handling in the code, review and static analysis, testing aimed at the unexpected — above all **fuzzing** — control of the supply chain of components and builds, and a disciplined way of receiving and fixing vulnerability reports.

We study each step with the tools that make it concrete: a taint analysis traced by hand, the precision and recall of a static analyser, a proof (from Rice's theorem) that no analyser can be perfect, a mutation fuzzer that finds a bug in a toy parser in under a thousand inputs where random testing finds nothing in two hundred thousand, the probability arithmetic that explains the difference, and the timeline of a coordinated disclosure. Software-engineering practice in general — process, requirements, testing, verification — is in [[software-engineering]], especially [[software-engineering/testing]] and [[software-engineering/verification]]; here we concentrate on what security adds.

## Security in the development life cycle

In January 2002 Bill Gates's "Trustworthy Computing" memo stopped much of Microsoft's Windows development for security training and review; the resulting **Security Development Lifecycle** (SDL, published 2004 onwards) made security activities mandatory at each phase. NIST's **Secure Software Development Framework** (SP 800-218, 2022) and the OWASP SAMM maturity model describe the same ideas for any organisation.

::: definition Secure development practices {#def-sdl}
A **secure development life cycle** attaches security activities to each phase of development:

1. **Requirements**: security and privacy requirements, abuse cases ("as an attacker, I want …"), and the risk level of the project.
2. **Design**: a threat model ([[security/security-principles#def-threat-model]]) of the architecture, with mitigations chosen for its threats; attack-surface review; secure defaults.
3. **Implementation**: approved languages, libraries and configurations; banned dangerous functions; code review; static analysis.
4. **Verification**: security testing, fuzzing, dynamic analysis and penetration testing *by authorised testers*.
5. **Release and response**: a final security review, signed and reproducible builds, an incident-response plan, and a process for receiving and fixing vulnerability reports.
:::

The economics favours early work: a design flaw found in a threat-modelling session costs a conversation, while the same flaw found after release costs a patch, a coordinated disclosure, emergency deployment by every customer and possibly a breach. The precise multipliers often quoted are poorly supported, but the direction is not in doubt.

### Design: make the secure path the easy path

The most effective secure-design decisions remove whole classes of bug instead of asking every programmer to avoid them every time.

- **Choose memory-safe languages** for new code, especially code that parses untrusted input. Google reported in 2024 that the share of Android's vulnerabilities due to memory-safety bugs fell from 76% in 2019 to 24% in 2024 as new code shifted to memory-safe languages, without rewriting the old.
- **Use safe-by-construction interfaces.** Parameterised query APIs instead of string concatenation, templating engines that encode output by default, file APIs that take descriptors rather than paths ([[security/access-control#def-toctou]]). A programmer cannot forget a check that the interface performs.
- **Parse, don't validate.** Convert untrusted input once, at the boundary, into a typed internal representation (an `EmailAddress`, a `UserId`, a bounded integer), rejecting what does not parse, and let the rest of the program handle only well-typed values. Scattered ad-hoc validation inevitably misses a path.
- **Allow lists over deny lists**, default deny ([[security/security-principles#def-saltzer-schroeder]]): accept the input forms you know to be safe rather than trying to enumerate the dangerous ones.
- **Secure defaults.** Ship with encryption on, debug interfaces off, no default passwords, least privilege for services. Most deployments never change a default.
- **Minimise and isolate.** Fewer features, fewer parsers, fewer privileges in the parts that touch untrusted data ([[security/access-control]]).

::: example A threat model drives the design {#ex-design}
A team is adding "upload a profile picture" to a web application. Use STRIDE-style questions to derive design decisions before any code is written.
::: solution
*Tampering / elevation of privilege*: an uploaded file is attacker-controlled input to an image decoder — historically a rich source of memory-safety bugs. Decision: decode in a separate sandboxed process with no network or file-system access beyond its input and output, using a maintained library in a memory-safe language if one is available, and re-encode every image into a canonical format so that only the re-encoded file is ever served. *Information disclosure*: photos carry metadata (location, camera serial number). Decision: strip metadata during re-encoding — data minimisation ([[security/privacy]]). *Spoofing / elevation*: a file named `avatar.html` served from the application's own origin could run script in users' browsers. Decision: store files under generated names, serve them from a separate domain with a fixed image content type, never with the user's file name. *Denial of service*: a small compressed image can decode to gigabytes. Decision: limit file size, image dimensions and decoding time. *Repudiation*: log uploads with user and time. Each decision removes a class of problem for every future change to the feature, which is cheaper than reviewing each change for it.
:::
:::

## Review and static analysis

**Code review** by a second person catches many defects, and security review adds specific questions: where does untrusted data enter, where does it go, which checks guard each sensitive operation, and what happens on every error path? Reviewers are good at design-level problems — a missing authorisation check, a misuse of a cryptographic API — and bad at exhaustive checking, which is where tools help.

**Static analysis** examines code without running it. The simplest analysers flag dangerous functions and patterns (`gets`, string-formatted SQL, `eval` on input); compilers' warnings (`-Wall -Wextra -Wformat-security`) are static analysis too. More powerful analysers track how data flows through the program.

::: definition Taint analysis {#def-taint}
**Taint analysis** marks values from untrusted **sources** (request parameters, file contents, environment variables) as **tainted**, propagates taint through computation (a value computed from a tainted value is tainted), removes it at designated **sanitisers** (a validation or encoding function appropriate to the use), and reports any path on which a tainted value reaches a sensitive **sink** (a query, a shell command, a file path, an HTML page) without passing a sanitiser for that sink.
:::

::: example Tracing taint {#ex-taint}
Trace taint through this fragment of a (fictional) request handler. The source is `request.args`; sinks are `db.execute` (SQL) and `render` (HTML); `int()` is a sanitiser for SQL (an integer cannot carry SQL syntax) and `html.escape` for HTML.

```python
name  = request.args["name"]                 # 1
uid   = int(request.args["id"])              # 2
greet = "Hello, " + name                     # 3
db.execute("SELECT * FROM t WHERE id = " + str(uid))   # 4
db.execute("SELECT * FROM t WHERE name = '" + name + "'")  # 5
render("<p>" + html.escape(greet) + "</p>")  # 6
render("<p>" + greet + "</p>")               # 7
```
::: solution
| line | effect | tainted afterwards |
|---|---|---|
| 1 | `name` from a source | `name` |
| 2 | `int()` sanitises for SQL | `name` (`uid` clean for SQL) |
| 3 | concatenation propagates | `name`, `greet` |
| 4 | `uid` reaches the SQL sink sanitised | — no report |
| 5 | `name` reaches the SQL sink | **report: SQL injection** |
| 6 | `greet` escaped for HTML | — no report |
| 7 | `greet` reaches the HTML sink | **report: cross-site scripting** |

Two findings. The fix for line 5 is not a sanitiser but a parameterised query, `db.execute("SELECT * FROM t WHERE name = ?", (name,))`, which keeps data out of the query's syntax altogether; line 7 should use the escaped value or, better, a template engine that escapes by default. Note that sanitisers are sink-specific: `html.escape` would not make `name` safe at line 5, and an analyser must know which sanitiser fits which sink.
:::
:::

Every analyser faces a fundamental limit.

::: theorem No perfect analyser {#thm-no-perfect}
Let a **taint bug** be an execution in which a tainted value reaches a sink. There is no algorithm that, given any program, always terminates and answers correctly whether some execution of the program has a taint bug. Consequently every terminating analyser either misses some bugs (is **unsound**) or reports some programs that have none (is **incomplete**), or both.
:::

::: proof
Reduce the halting problem ([[theory-of-computation/reductions]]). Given a Turing machine $M$ and input $w$, construct the program $P_{M,w}$: read a value $x$ from a source; simulate $M$ on $w$; if the simulation halts, pass $x$ to a sink. $P_{M,w}$ has a taint bug if and only if $M$ halts on $w$, and the construction is computable. A terminating, always-correct analyser would therefore decide the halting problem, which is impossible. (This is an instance of Rice's theorem: any non-trivial property of a program's behaviour is undecidable.)
:::

Practical analysers therefore choose. **Sound** tools (used for safety-critical code, often with annotations) report everything that might be a bug, accepting false positives; most commercial and open-source bug-finders are deliberately unsound to keep false positives low, because developers stop reading warnings that are usually wrong — the base-rate problem of [[security/network-security#prop-base-rate]] in another guise. Their quality is measured like a detector's.

::: example Precision and recall of an analyser {#ex-precision}
A code base contains $40$ real injection bugs (found later by other means). An analyser produces $120$ warnings, of which $30$ are real bugs. Compute its precision and recall, and the effect of a configuration change that cuts warnings to $40$ of which $24$ are real.
::: solution
**Precision** is the fraction of warnings that are real: $30/120 = 25\%$. **Recall** is the fraction of real bugs reported: $30/40 = 75\%$. After the change, precision is $24/40 = 60\%$ and recall $24/40 = 60\%$. Which is better depends on use: the second configuration wastes far less reviewer time (16 false warnings instead of 90) and is more likely to be heeded in day-to-day development; the first finds more bugs and may suit a one-off security audit. Many teams run the high-precision set on every change and the high-recall set periodically.
:::
:::

## Testing for the unexpected: fuzzing

Ordinary tests check that the program does the right thing on inputs the programmer thought of. Attackers use inputs the programmer did not think of. **Fuzzing** generates enormous numbers of such inputs automatically and watches for failures.

::: definition Fuzzing {#def-fuzzing}
A **fuzzer** repeatedly generates inputs, runs a program on them, and records those that trigger a failure detected by an **oracle**: a crash, a failed assertion, a hang, an unexpected exception, or a report from a sanitiser such as AddressSanitizer. A **generational** fuzzer builds inputs from scratch (randomly or from a grammar); a **mutational** fuzzer modifies inputs from a **corpus** of examples; a **coverage-guided** fuzzer (AFL, libFuzzer) instruments the program, keeps every mutated input that reaches new code in the corpus, and mutates those further.
:::

Barton Miller's 1990 study, in which random input crashed about a quarter to a third of the Unix utilities tested, started the field. Its modern form, coverage-guided fuzzing combined with sanitisers, has found tens of thousands of bugs; Google's OSS-Fuzz service has fuzzed critical open-source projects continuously since 2016.

The power of guidance is best seen through probabilities. Bugs usually hide behind checks — a magic number, a version field, a checksum — that random inputs almost never pass.

::: proposition The cost of a magic number {#prop-magic}
Suppose a bug is reached only by inputs whose first $k$ bytes equal a fixed string, and a fuzzer generates inputs with independent uniform bytes. Each input reaches the bug with probability $2^{-8k}$, and the expected number of inputs until the first success is $2^{8k}$. If instead the program's comparison is made byte by byte and the fuzzer keeps any input that passes one more byte than before (as coverage feedback does when each byte comparison is a separate branch), the expected number is at most $k \cdot 2^8$.
:::

::: proof
For independent uniform bytes, each of the $k$ bytes matches with probability $2^{-8}$, so all match with probability $2^{-8k}$; the number of trials until the first success is geometric with mean $1/2^{-8k} = 2^{8k}$. With feedback, consider stage $j$, in which the corpus holds an input matching the first $j - 1$ bytes and the fuzzer mutates byte $j$ to a uniform value: each try succeeds with probability $2^{-8}$, so stage $j$ takes $2^8$ tries in expectation (more if the fuzzer sometimes mutates other bytes, which changes only the constant). By linearity of expectation over the $k$ stages, the total is $k \cdot 2^8$ (times that constant).
:::

For a 4-byte magic number, that is $2^{32} \approx 4.3 \times 10^9$ blind attempts against about $1000$ guided ones. Compilers help guidance further by splitting multi-byte comparisons into single-byte branches, and modern fuzzers also read comparison operands directly from the running program.

::: widget plot
f: 1 - exp(-x/2^k)
x: 0, 100000
y: 0, 1
sliders: k=16:8:32:1
labels: P(bug found after x random inputs)
caption: The probability that a random fuzzer has passed a check of $k$ bits after $x$ inputs, $1 - (1 - 2^{-k})^x \approx 1 - e^{-x/2^k}$ ([[#prop-magic]]). At $k = 16$ (a two-byte magic number) a hundred thousand inputs nearly always succeed; move $k$ up to $24$ or $32$ and the curve flattens onto the axis. Guided fuzzing breaks a $k$-bit check into small steps, turning the exponential $2^k$ into a sum of small terms.
:::

::: example Fuzzing a toy parser {#ex-fuzz}
A small parser for a made-up record format should either return a list of entries or raise `FormatError`; anything else is a bug. Compare a fuzzer that feeds random bytes with a mutation fuzzer seeded with one valid input.
::: solution
```python
import random

class FormatError(Exception):
    """The documented way for parse() to reject malformed input."""

def parse(data: bytes) -> list[bytes]:
    """Toy format: b"TR", version byte, count byte, then count entries (length byte + bytes).
    Version 2 adds a one-byte checksum after the entries."""
    if len(data) < 4 or data[:2] != b"TR":
        raise FormatError("bad header")
    version, count, pos, items = data[2], data[3], 4, []
    for _ in range(count):
        if pos >= len(data):
            raise FormatError("truncated")
        n = data[pos]
        if pos + 1 + n > len(data):
            raise FormatError("truncated entry")
        items.append(data[pos + 1:pos + 1 + n]); pos += 1 + n
    if version == 2 and sum(map(len, items)) % 256 != data[pos]:   # bug: pos may be past the end
        raise FormatError("bad checksum")
    return items

def run(gen, trials, rng):
    """Feed generated inputs to parse(); anything but success or FormatError is a bug."""
    for i in range(1, trials + 1):
        x = gen(rng)
        try:
            parse(x)
        except FormatError:
            pass
        except Exception as e:
            return i, x, type(e).__name__
    return trials, None, None

def random_bytes(rng):
    return bytes(rng.randrange(256) for _ in range(rng.randrange(1, 12)))

SEED = b"TR\x01\x01\x03abc"                                  # one valid input
def mutate(rng):
    x = bytearray(SEED)
    for _ in range(rng.randrange(1, 3)):                     # change one or two bytes
        x[rng.randrange(len(x))] = rng.randrange(256)
    return bytes(x)

print("random:  ", run(random_bytes, 200_000, random.Random(1)))
print("mutation:", run(mutate, 200_000, random.Random(1)))
```

```console
random:   (200000, None, None)
mutation: (856, b'TR\x02\x01\x03abc', 'IndexError')
```

Random bytes never got past the two-byte header plus a version byte of `2` — by [[#prop-magic]] about $2^{24} \approx 1.7 \times 10^7$ inputs would be needed in expectation, before counting the structural checks. The mutation fuzzer, starting from a valid input, needed only to change the version byte to `2` (probability about $\frac{1}{8} \cdot \frac{1}{256}$ per single-byte mutation) and found the bug in $856$ inputs: a version-2 record without its checksum byte makes `data[pos]` read past the end. The fix is the missing bounds check — `if pos >= len(data): raise FormatError("missing checksum")` — and the failing input goes into the regression test suite so that the bug never returns. In C the same mistake would be an out-of-bounds read, found only if the fuzzer runs with a sanitiser as its oracle; Python's bounds checks made it an exception instead.
:::
:::

Fuzzing complements, not replaces, other testing. **Property-based testing** ([[software-engineering/testing]]) states what should hold for all inputs (decode inverts encode); **differential testing** runs two implementations of the same specification and flags disagreements; **sanitisers** turn silent memory and undefined-behaviour bugs into loud failures. **Penetration testing** — authorised experts attacking a system as an adversary would, under a written agreement about scope — tests the whole deployment, including configuration and people. Testing any system you do not own or have explicit permission to test is unethical and, in most countries, illegal ([[software-engineering/professional-ethics]]).

::: quiz
A fuzzer has run for a week on a parser without finding a crash. What can you conclude?

- [ ] The parser has no memory-safety bugs.
- [x] Only that the inputs it generated, with its oracle, revealed no failure; bugs behind checks it never passed, or failures the oracle cannot see, may remain.
- [ ] The parser is secure if the fuzzer was coverage-guided.
- [ ] Fuzzing for longer cannot find anything new.
::: solution
Testing shows the presence of bugs, never their absence. Coverage reports show which code the fuzzer reached; unreached code is untested, and reached code may still hide bugs that need a specific value, or that do not crash without a sanitiser. Improving the seed corpus, adding a format dictionary, enabling sanitisers and writing harnesses for deeper functions often finds more.
:::
:::

## The supply chain

Modern applications consist mostly of other people's code: libraries, frameworks, build tools, container base images and the services that build and distribute them. Each is part of the trusted computing base, and attackers increasingly target the chain rather than the product. The Log4Shell vulnerability of December 2021 (CVE-2021-44228) sat in a logging library embedded, often several dependencies deep, in a vast number of Java applications whose owners did not know they used it. The SolarWinds compromise discovered in December 2020 inserted malicious code into the vendor's build process, so that signed updates delivered it to thousands of customers. In March 2024 Andres Freund, investigating a small slowdown in SSH logins, discovered that the compression library xz-utils had been given a backdoor (CVE-2024-3094) by a maintainer who had built up trust in the project over about two years; it was caught just before it reached the stable releases of major Linux distributions.

The defences address each link.

- **Know what you ship.** A **software bill of materials** (SBOM, in formats such as SPDX and CycloneDX) lists every component and version, so that when a vulnerability is announced you can find in minutes whether you are affected — the question many organisations could not answer for Log4Shell.
- **Keep dependencies few, current and pinned.** Pin exact versions with checksums (lock files), update deliberately and promptly, and prefer well-maintained projects. Automated tools match dependencies against vulnerability databases.
- **Protect the build.** Builds run on isolated, ephemeral machines from reviewed source; the outputs are signed, and **provenance** records (as in the SLSA framework) state which source and which build produced each artefact. **Reproducible builds** — bit-for-bit identical outputs from the same source on independent machines — let anyone check that a binary matches its source.
- **Verify what you install.** Check signatures on packages and updates, with keys whose compromise would be detected; transparency logs (as in Sigstore, 2021) record every signature publicly so that a stolen key's misuse is visible.
- **Support the maintainers.** Much critical infrastructure is maintained by a few unpaid volunteers; the xz case was, above all, a social attack on an overloaded maintainer.

::: warning "Our code is reviewed, so the product is safe"
Reviewing your own code is necessary and far from sufficient. Ken Thompson's Turing Award lecture "Reflections on trusting trust" (1984) described a compiler modified to insert a backdoor into the login program *and* to reproduce the modification whenever it compiled a clean copy of itself — so that inspecting all source code reveals nothing. His conclusion: "You can't trust code that you did not totally create yourself." Nobody can create everything, so the practical answer is to reduce and verify trust: few dependencies, reproducible builds, independent rebuilds (David Wheeler's *diverse double-compiling* detects a Thompson-style compiler by compiling it with an independent compiler), signatures and transparency.
:::

## Vulnerability disclosure and response

However good the process, vulnerabilities will be found after release — by the vendor, by users, by researchers, or by attackers. What happens next decides how much harm they do.

::: definition Coordinated vulnerability disclosure {#def-cvd}
In **coordinated vulnerability disclosure**, a finder reports a vulnerability privately to the vendor (or through a coordinator such as a national CERT), the vendor confirms it, develops and releases a fix, and details are published once users have had a reasonable opportunity to update, usually within an agreed or announced deadline. The vulnerability is given a **CVE identifier** (a catalogue maintained since 1999), and its severity is often summarised by a **CVSS** score from $0$ to $10$.
:::

Each element exists for a reason. Private reporting avoids giving attackers a head start; a **deadline** (Google Project Zero's policy since 2014 is 90 days, with a grace period if a fix is imminent) stops vendors from sitting on reports indefinitely; publication lets defenders understand the risk and the research community learn from it. Vendors make reporting easy with a published policy and contact (a `security.txt` file, RFC 9116, 2022), a promise not to take legal action against good-faith research within the policy's scope, and often a **bug bounty** that pays for valid reports. The international standards ISO/IEC 29147 (disclosure) and 30111 (handling) describe the vendor side.

::: example A disclosure timeline {#ex-disclosure}
A researcher finds, in software she is authorised to test, a flaw that lets one customer read another's invoices in a vendor's application. Write a sensible timeline under a 90-day policy, and say what the vendor should do at each step.
::: solution
*Day 0*: she reports it through the vendor's published channel with a minimal description and reproduction steps, accessing no more data than needed to demonstrate the issue. *Day 2*: the vendor acknowledges, assigns a tracking number and a severity estimate (unauthorised access to other customers' data: high). *Days 2–10*: the vendor triages, reproduces, identifies the root cause — a missing per-object authorisation check, [[security/access-control#def-refmon]] — searches for the same pattern elsewhere in its code, and checks its logs for past exploitation. *Day 21*: a fix is deployed (for a hosted service, the vendor deploys it; for installed software it ships an update and an advisory). *Day 21 onwards*: if logs show that data was accessed, the vendor's incident-response and data-breach notification obligations begin ([[security/privacy]]). *Day 90 or earlier by agreement*: a joint advisory is published with a CVE identifier, credit to the researcher, affected versions and the fix; a regression test and a review of why the check was missing (a design-level fix, such as a data-access layer that enforces ownership automatically) follow. The vendor's most important acts are the variant search and the root-cause fix, which prevent the next ten reports.
:::
:::

Disclosure is only the visible part of response. Behind it sit **patch management** at the vendor's customers (most successful attacks use vulnerabilities for which a fix was already available), **monitoring** for exploitation, and the incident-response processes of [[security/malware]]. A vendor that publishes clear advisories, ships fixes promptly and makes updating automatic protects its users far more than one that ships fewer, quieter fixes.

::: history
Ken Thompson's "Reflections on trusting trust" appeared in 1984. Barton Miller's fuzzing study was published in *Communications of the ACM* in 1990 (the experiment began as a class project in 1988). The CVE list was launched by MITRE in 1999. Bill Gates's Trustworthy Computing memo of January 2002 led to Microsoft's Security Development Lifecycle; the first CVSS was released in 2005, and version 4.0 in 2023. Taint checking appeared in Perl's taint mode (1989), and large-scale static bug-finding grew from work such as Dawson Engler's meta-level compilation (2000) and the Coverity tools that followed. Konstantin Serebryany and colleagues introduced AddressSanitizer in 2012; Michał Zalewski released the coverage-guided fuzzer AFL in 2013, libFuzzer followed in 2015 and Google's OSS-Fuzz in 2016. Google Project Zero (2014) popularised fixed disclosure deadlines. NIST published its Secure Software Development Framework in 2022, and the xz-utils backdoor of 2024 brought the security of open-source maintenance to wide attention.
:::

## Where this leads

This chapter closes the course by turning its ideas into practice. Threat modelling ([[security/security-principles]]) becomes a design activity; access-control mistakes ([[security/access-control]]) and injection and memory bugs ([[security/web-security]], [[security/memory-safety]]) become targets for review, analysis and fuzzing; and the response to what slips through connects to [[security/malware]]. The verification techniques that can *prove* the absence of whole bug classes — type systems, model checking, deductive verification — are in [[software-engineering/verification]] and [[programming-languages/type-systems]], and the professional obligations of security work, including authorisation for testing and responsible disclosure, in [[software-engineering/professional-ethics]].

::: summary
- Security is built into every phase ([[#def-sdl]]): requirements and abuse cases, threat-model-driven design, safe implementation, security testing, and release with a response process.
- The best design decisions remove bug classes: memory-safe languages, safe-by-construction interfaces (parameterised queries, auto-escaping templates), parse-don't-validate, allow lists, secure defaults, isolation of parsers.
- **Taint analysis** ([[#def-taint]]) tracks untrusted data from sources to sinks through sanitisers; no analyser can be both sound and complete ([[#thm-no-perfect]]), so tools trade **precision** against **recall**.
- **Fuzzing** ([[#def-fuzzing]]) with sanitisers finds the unexpected; coverage guidance turns a $2^{8k}$ search for a $k$-byte check into about $k \cdot 2^8$ steps ([[#prop-magic]]). Fuzzing finds bugs; it does not prove their absence.
- The **supply chain** is part of the TCB: know your components (SBOM), pin and update them, protect and reproduce builds, and verify signatures — trusting trust has no complete solution.
- **Coordinated disclosure** ([[#def-cvd]]) — private report, fix, deadline, advisory with a CVE — plus root-cause fixes and variant searches turns each found vulnerability into fewer future ones.
:::

## Exercises

::: exercise Blind search for a magic number {level=1 check="65536"}
A bug is reached only by inputs whose first two bytes are `0xCA 0xFE`. What is the expected number of uniformly random inputs needed to reach it? (Enter the number.)
::: solution
By [[#prop-magic]] with $k = 2$, $2^{16} = 65{,}536$.
:::
:::

::: exercise Guided search {level=1 check="1024"}
Using the byte-by-byte bound of [[#prop-magic]], about how many inputs does a coverage-guided fuzzer need to pass a 4-byte magic number? (Enter the bound $k \cdot 2^8$.)
::: solution
$4 \times 256 = 1024$, against $2^{32} \approx 4.3 \times 10^9$ for blind random inputs.
:::
:::

::: exercise Precision and recall {level=1 check="0.8"}
An analyser reports $50$ warnings, $40$ of which are real bugs; the code has $100$ real bugs. What is its precision? (Enter a decimal.)
::: solution
Precision $= 40/50 = 0.8$; recall $= 40/100 = 0.4$.
:::
:::

::: exercise Taint with a wrong sanitiser {level=2}
In [[#ex-taint]], a developer "fixes" line 5 by writing `db.execute("SELECT * FROM t WHERE name = '" + html.escape(name) + "'")`. Should a taint analyser still report it? Explain, and give the right fix.
::: solution
Yes. `html.escape` encodes `<`, `>`, `&` and quotes as HTML entities, which happens to change `'` into `&#x27;` — but sanitisers are sink-specific, and HTML escaping is not a defence for SQL in general (it leaves backslashes and other syntax of some SQL dialects untouched, and it corrupts legitimate data containing those characters). A correct analyser treats `html.escape` as a sanitiser only for HTML sinks and still reports the flow. The right fix is a parameterised query, `db.execute("SELECT * FROM t WHERE name = ?", (name,))`, which never interprets `name` as SQL.
:::
:::

::: exercise Fix and regress {level=2}
Fix the bug in the parser of [[#ex-fuzz]], rerun the mutation fuzzer for $200{,}000$ inputs, and explain why the crashing input should be added to the test suite even though the bug is fixed.
::: solution
Add a bounds check before the checksum comparison:

```python
    if version == 2:
        if pos >= len(data):
            raise FormatError("missing checksum")
        if sum(map(len, items)) % 256 != data[pos]:
            raise FormatError("bad checksum")
```

Rerunning `run(mutate, 200_000, random.Random(1))` now returns `(200000, None, None)`: no input produced anything but success or `FormatError`. The crashing input `b'TR\x02\x01\x03abc'` should become a regression test asserting that `parse` raises `FormatError`, because later changes (a refactoring, a version 3 of the format) can reintroduce the same mistake, and a stored input re-checks it in milliseconds on every build. Fuzzing corpora are kept for the same reason.
:::
:::

::: exercise Reading an SBOM {level=2}
A vulnerability is announced in version $2.14.0$ to $2.14.1$ of a library `logfmt`. Your application's SBOM lists `logfmt 2.13.3` as a direct dependency and, via another library, `logfmt 2.14.1` as a transitive one. Are you affected, what do you do, and what would you have done without the SBOM?
::: solution
Probably yes: the transitive copy $2.14.1$ is in the affected range, and in many ecosystems both copies (or only the newer) end up in the build, so you must check which one is actually loaded and whether the vulnerable code path is reachable. Update the intermediate library to a version that depends on a fixed `logfmt`, or override the transitive version to a fixed release, rebuild, test and deploy; then check logs for signs of exploitation during the exposure window. Without an SBOM you would first have to discover that `logfmt` is in the product at all — for transitive dependencies often by scanning every built artefact — which is exactly the delay many organisations suffered with Log4Shell.
:::
:::

::: exercise An analyser for a decidable fragment {level=3}
[[#thm-no-perfect]] says taint bugs are undecidable in general. Consider instead straight-line programs: sequences of assignments `x = e` where `e` is a source, a constant, a variable, a sanitiser applied to a variable, or a concatenation of variables and constants, followed by sink calls on variables. Give a terminating, sound and complete algorithm for this fragment, prove it correct, and explain which feature of real programs breaks the argument.
::: solution
Process the statements in order, maintaining the set $T$ of tainted variables: `x = source` adds `x`; `x = constant` or `x = sanitiser(y)` removes `x`; `x = y` or a concatenation sets `x` tainted iff some variable in the expression is in $T$; `sink(x)` is reported iff `x` is in $T$. This takes time linear in the program size. **Correctness**, by induction on the number of statements executed: the invariant is "after each statement, $x \in T$ if and only if the current value of $x$ is derived from a source without passing a sanitiser". It holds initially ($T$ empty, no values derived). Each assignment rule re-establishes it for the assigned variable, by the definition of taint propagation, and other variables are unchanged. A straight-line program has exactly one execution, so the analyser's report at a sink is correct for that execution: sound (no missed bugs) and complete (no false reports). The argument breaks with **branches and loops** (the analyser must merge sets from paths, and whether a path is feasible depends on data — the route to undecidability), with **function calls and aliasing** (two names for one value), and with **implicit flows** (`if secret: x = 1`), which propagate information without direct assignment.
:::
:::

::: exercise Expected cost of a guided search with noise {level=3}
Refine [[#prop-magic]]: at each stage, the fuzzer picks one of $L$ byte positions uniformly to mutate, and only mutating the next unmatched position (to the right value) makes progress. Show that the expected number of inputs to pass a $k$-byte check is $k \cdot L \cdot 2^8$, and evaluate it for $k = 4$, $L = 64$.
::: solution
In each stage, an input makes progress if the fuzzer chooses the right position (probability $1/L$) and the right value (probability $2^{-8}$), independently: probability $1/(L \cdot 2^8)$ per input, so the stage length is geometric with mean $L \cdot 2^8$. The $k$ stages are passed one after another, so by linearity of expectation the total is $k \cdot L \cdot 2^8$. With $k = 4$ and $L = 64$: $4 \times 64 \times 256 = 65{,}536$ inputs — still about $65{,}000$ times fewer than the $2^{32}$ needed blind, and a fuzzer running thousands of inputs per second passes it in well under a minute.
:::
:::
