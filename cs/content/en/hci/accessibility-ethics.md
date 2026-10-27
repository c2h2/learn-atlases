A blind customer uses a screen reader to buy a train ticket. The page reads out "button", "button", "button" — three icons with no text — and then "clickable", for a styled `<div>` that acts as the *Buy* button but cannot be reached with the keyboard. The purchase is impossible, though the page looks perfect. On the next site, a cookie banner offers a large "Accept all" button; refusing tracking takes a click on a small grey "Manage options" link, three switches and a confirmation, about five times as long by the keystroke-level model. Both pages were built by competent developers. The first excludes people by neglect; the second steers people by design.

This final chapter is about the people interfaces leave out and the people interfaces push around. **Accessibility** is the practice of making systems usable by people with the widest range of abilities, and it is now a legal requirement in much of the world. **Ethics** in interaction design concerns the power that designers have over users' attention, choices and data. We look at disability and the assistive technologies people use; how interfaces expose their structure to those technologies; the Web Content Accessibility Guidelines (WCAG) 2.2, with a worked target-size calculation; the law as of 2026, including the European Accessibility Act; how to evaluate accessibility; and **deceptive design patterns**, their measurement and their regulation. The professional and legal framework of software ethics in general is in [[software-engineering/professional-ethics]].

## Disability and accessibility

Two ways of thinking about disability shape design. The **medical model** locates disability in a person's impairment, to be treated or compensated. The **social model**, developed by disabled activists in the United Kingdom in the 1970s and named by Mike Oliver in 1983, locates it in the barriers that the built and designed world puts in the way of people with impairments: a wheelchair user is disabled by stairs, not by their legs. The World Health Organization's *International Classification of Functioning, Disability and Health* (2001) combines the two, describing disability as the interaction between a health condition and contextual factors. For designers the social model is the productive one: an inaccessible interface is a design defect, and it can be fixed.

The numbers are large. The WHO's *Global Report on Health Equity for Persons with Disabilities* (2022) estimates that about 1.3 billion people — roughly 16% of the world's population — experience significant disability, and the proportion rises with age. Impairments may be **permanent** (blindness, deafness, a missing limb), **temporary** (a broken arm, recovery from eye surgery) or **situational** (bright sunlight on a phone, a baby in one arm, a noisy station, a second language); designing for the first group very often helps the other two.

::: definition Accessibility {#def-accessibility}
**Accessibility** is the extent to which products, systems, services and environments can be used by people from a population with the widest range of user needs, characteristics and capabilities, to achieve identified goals in identified contexts of use (after ISO 9241-112 and ISO 9241-171). It is usability ([[hci/user-centred-design#def-usability]]) with the "specified users" taken to include people with disabilities.
:::

| impairment | examples of barriers | assistive technology and adaptation |
|---|---|---|
| blindness | images without text, unlabelled controls, mouse-only interaction | screen readers (speech or braille output), keyboard navigation |
| low vision | small text, low contrast, layouts that break when zoomed | magnification, high contrast and dark modes, text resizing |
| colour-vision deficiency | colour as the only cue | patterns, labels and safe palettes ([[hci/visual-design]]) |
| deafness, hard of hearing | audio without captions, phone-only support | captions, transcripts, sign-language interpretation, text chat |
| motor impairment | small targets, time limits, drag-only or multi-finger gestures | switch access, voice control, eye tracking, keyboard alternatives |
| cognitive and learning disability | dense text, complex navigation, memory-based puzzles | plain language, consistent layout, no time pressure, recognition not recall |
| photosensitive epilepsy | flashing content | no content that flashes more than three times a second |

## How assistive technology sees an interface

A screen reader cannot see pixels. It reads a structured description of the interface that the platform builds from the application's code and exposes through an **accessibility API**.

::: definition Accessibility tree {#def-accessibility-tree}
The **accessibility tree** is a tree of the user-interface objects of an application, derived by the browser or toolkit from its document or widget tree and exposed to assistive technologies. Each node has a **role** (button, link, checkbox, heading, text field…), an **accessible name** (the text announced for it — from its content, a `<label>`, an `alt` attribute or `aria-label`), optional **states and properties** (checked, expanded, disabled, required) and a value; and the platform delivers **events** when these change. A control is operable by assistive technology only if its node has the right role, a meaningful name, correct states, and accepts the standard keyboard or accessibility actions.
:::

Native HTML elements come with the right roles, names and keyboard behaviour for free: a `<button>` is focusable, activated by Enter and Space, and announced as "button" with its text. A `<div>` styled as a button has none of this. WAI-ARIA (Accessible Rich Internet Applications, a W3C specification; version 1.2 became a Recommendation in 2023) lets authors add roles and states to custom widgets, but its own guidance begins with the "first rule of ARIA use": if a native element with the semantics you need exists, use it instead. ARIA changes only what assistive technology is *told*; it does not add keyboard behaviour, so a `<div role="button">` still needs `tabindex="0"` and key handlers — and an ARIA role that does not match behaviour is worse than none.

::: example Finding machine-detectable failures {#ex-a11y-check}
Write a small checker that flags images without `alt`, buttons without accessible names, form inputs without labels and click handlers on non-interactive elements, and run it on a fragment of the ticket page.
::: solution
```python
from html.parser import HTMLParser

class Checker(HTMLParser):
    """Flags a few machine-detectable failures; most of WCAG needs human judgement."""
    def __init__(self):
        super().__init__()
        self.problems, self.labels, self.inputs = [], set(), []
        self.button = None                         # text collected inside an open <button>
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "img" and "alt" not in a:
            self.problems.append(f"img {a.get('src')}: no alt attribute (1.1.1)")
        if tag == "label" and "for" in a:
            self.labels.add(a["for"])
        if tag == "input" and a.get("type") not in ("hidden", "submit", "button"):
            self.inputs.append(a)
        if tag == "button":
            self.button = a.get("aria-label", "")
        if "onclick" in a and tag not in ("button", "a", "input"):
            self.problems.append(f"<{tag} onclick>: not keyboard-operable by default (2.1.1)")
    def handle_data(self, data):
        if self.button is not None:
            self.button += data.strip()
    def handle_endtag(self, tag):
        if tag == "button":
            if not self.button:
                self.problems.append("button with no accessible name (4.1.2)")
            self.button = None
    def report(self):
        for a in self.inputs:
            if a.get("id") not in self.labels and "aria-label" not in a:
                self.problems.append(f"input {a.get('name')}: no label (1.3.1, 4.1.2)")
        return self.problems

page = """
<img src="logo.png">
<img src="divider.png" alt="">
<label for="q">Search</label> <input id="q" name="q" type="search">
<input name="email" type="email" placeholder="Email">
<button><svg aria-hidden="true"></svg></button>
<button aria-label="Close dialog"><svg aria-hidden="true"></svg></button>
<div class="btn" onclick="buy()">Buy now</div>
"""
c = Checker()
c.feed(page)
for p in c.report():
    print(p)
```

```console
$ python3 a11y.py
img logo.png: no alt attribute (1.1.1)
button with no accessible name (4.1.2)
<div onclick>: not keyboard-operable by default (2.1.1)
input email: no label (1.3.1, 4.1.2)
```

The numbers are WCAG success criteria. Note what is *not* flagged: `alt=""` on the divider is correct, marking a decorative image for screen readers to skip; the labelled search field and the named close button pass; and a placeholder is not a label, since it disappears while typing. The fixes: `<img src="logo.png" alt="Northern Rail home">`, `<label for="email">Email</label>`, `<button aria-label="Open menu">` (or visible text), and a real `<button>` for *Buy now*. The checker cannot tell whether an `alt` text is *meaningful* ("image123.png" passes), whether the reading order makes sense, or whether a task can be completed by keyboard — which is why automated checking is only the start of accessibility evaluation.
:::
:::

## WCAG 2.2

The **Web Content Accessibility Guidelines** are published by the W3C's Web Accessibility Initiative. WCAG 2.2 became a W3C Recommendation on 5 October 2023 (with an updated edition in December 2024), and is backwards compatible with WCAG 2.0 (2008) and 2.1 (2018): content that conforms to 2.2 also conforms to the earlier versions. Despite its name it applies well beyond web pages, and standards such as the European EN 301 549 apply its criteria to documents, software and mobile apps.

::: definition WCAG structure and conformance {#def-wcag}
WCAG 2.2 is organised under four **principles** — content must be **Perceivable**, **Operable**, **Understandable** and **Robust** (POUR) — which contain 13 **guidelines**, which contain 86 testable **success criteria**, each at **level A**, **AA** or **AAA**. A web page **conforms** at level AA if it satisfies every level A and level AA success criterion (or provides a conforming alternative version), for complete pages and complete processes, using only accessibility-supported technologies, without interfering with the rest of the page. Level AA is the level referenced by most laws and policies.
:::

Some of the most important criteria:

| criterion | level | requirement (paraphrased) |
|---|---|---|
| 1.1.1 Non-text content | A | text alternatives for images and other non-text content |
| 1.2.2 Captions (prerecorded) | A | captions for prerecorded audio in synchronised media |
| 1.3.1 Info and relationships | A | structure (headings, lists, tables, labels) is available programmatically |
| 1.4.1 Use of colour | A | colour is not the only visual means of conveying information |
| 1.4.3 Contrast (minimum) | AA | 4.5:1 for text, 3:1 for large text ([[hci/visual-design#def-contrast]]) |
| 1.4.10 Reflow | AA | content works at 320 CSS px width without two-dimensional scrolling |
| 2.1.1 Keyboard | A | all functionality is operable from a keyboard |
| 2.2.1 Timing adjustable | A | users can turn off, adjust or extend time limits |
| 2.4.7 Focus visible | AA | the keyboard focus indicator is visible |
| 2.5.8 Target size (minimum) | AA | pointer targets at least 24 × 24 CSS px, with exceptions |
| 3.3.1 Error identification | A | input errors are identified and described in text |
| 3.3.8 Accessible authentication (minimum) | AA | no cognitive function test (such as remembering or transcribing) to log in, unless an alternative or assistance (such as paste or a password manager) is available |
| 4.1.2 Name, role, value | A | user-interface components expose name, role, states and values ([[#def-accessibility-tree]]) |

WCAG 2.2 added nine success criteria — 2.4.11 Focus Not Obscured (Minimum, AA), 2.4.12 Focus Not Obscured (Enhanced, AAA), 2.4.13 Focus Appearance (AAA), 2.5.7 Dragging Movements (AA), 2.5.8 Target Size (Minimum, AA), 3.2.6 Consistent Help (A), 3.3.7 Redundant Entry (A), 3.3.8 and 3.3.9 Accessible Authentication (Minimum, AA; Enhanced, AAA) — and removed 4.1.1 Parsing, which no longer had any practical effect. Many of the new criteria help people with motor and cognitive impairments, who were less well served by earlier versions.

### A worked criterion: target size

Success criterion 2.5.8 requires a pointer target to be at least 24 by 24 CSS pixels, *except* when, among other exceptions, undersized targets are spaced so that a circle of 24 CSS px diameter centred on each target's bounding box does not intersect another target or the circle of another undersized target. The criterion is motivated by Fitts's law and touch accuracy ([[hci/interaction-techniques]]), and its spacing exception can be turned into a simple inequality.

::: proposition Spacing for small targets in a row {#prop-target-spacing}
Consider identical square targets of side $s < 24$ CSS px in a horizontal row, with gaps of $g$ px between neighbours, so that their centres are $s + g$ apart. They satisfy the spacing exception of WCAG 2.2 success criterion 2.5.8 if and only if $s + g \ge 24$, that is $g \ge 24 - s$.
:::

::: proof
Each target gets a circle of radius 12 centred on its centre. Two neighbouring circles do not intersect iff the distance between their centres is at least the sum of their radii: $s + g \ge 24$. A circle must also not intersect a neighbouring *target*: the nearest point of the neighbour's square to the first centre is its near edge, at horizontal distance $(s + g) - s/2 = s/2 + g$, so the condition is $s/2 + g \ge 12$, i.e. $s + 2g \ge 24$. Since $g \ge 0$, $s + 2g \ge s + g$, so the second condition follows from the first. Targets further along the row are further away. Hence the exception holds iff $s + g \ge 24$. (We treat "touching" circles as not intersecting, the usual reading.)
:::

::: example A toolbar of small icons {#ex-target-size}
A text editor's toolbar has 16 × 16 px icon buttons with 4 px between them. Does it meet 2.5.8? What gap is needed, and what are the alternatives?
::: solution
The targets are undersized ($16 < 24$), so they need the spacing exception: by [[#prop-target-spacing]] the gap must be at least $24 - 16 = 8$ px. With 4 px, the centres are 20 px apart and neighbouring 24-px circles overlap; the toolbar fails. Options: increase the gap to 8 px (the icons need not grow — the circle test is about spacing); enlarge the clickable area of each button to 24 × 24 px with padding while keeping the 16-px icon (the usual fix, and better for everyone by Fitts's law); or provide an equivalent control elsewhere that meets the criterion, such as the same commands in a menu (the "equivalent" exception). The 24-px floor is a minimum: platform guidance for touch, as noted in [[hci/interaction-techniques]], is around 44–48 units, and WCAG's AAA criterion 2.5.5 asks for 44 × 44 CSS px.
:::
:::

::: widget plot
f: 0.1 + 0.15*log2(400/x + 1); 0.1 + b*log2(400/x + 1)
x: 8, 64
y: 0, 3
sliders: b=0.45:0.15:1:0.05
labels: \text{typical slope } 0.15 \text{ s/bit}; \text{slope } b
vlines: 24; 44
caption: Fitts's-law pointing time (s) to a target 400 px away against its width, for a typical user (first curve) and for a user whose pointing slope is $b$ (second curve; larger slopes model, for example, tremor or a head pointer — the values are illustrative, not measurements). The vertical lines mark the 24-px minimum of 2.5.8 and the 44-px enhanced target of 2.5.5. Growing a target from 16 to 44 px saves the typical user about 0.21 s and a user with $b = 0.45$ three times as much, about 0.62 s: larger targets help everyone, and help most those who find pointing hardest.
:::

::: quiz
A login page asks users to retype a six-digit code sent by text message, and the code field blocks pasting. A user with dyslexia and short-term memory difficulties cannot reliably transcribe the code. Which WCAG 2.2 criterion is most directly at issue, and what fixes it?
- [ ] 1.4.3 Contrast; increase the contrast of the code field.
- [x] 3.3.8 Accessible Authentication (Minimum); allow pasting and automatic filling of the code (for example via the platform's one-time-code autofill), or offer a method that needs no transcription.
- [ ] 2.5.8 Target Size; make the code field larger.
- [ ] 1.1.1 Non-text content; add alt text to the field.
::: solution
Transcribing a code is a cognitive function test under 3.3.8 unless the user is helped — by allowing paste or autofill, so the code never has to be remembered or retyped — or offered an alternative such as a magic link or a passkey. Blocking paste is a common failure that also weakens security, since it discourages password managers.
:::
:::

::: example Auditing a sign-up form {#ex-audit}
A sign-up form has fields whose only labels are placeholders; required fields are marked by a red border alone; after five minutes the session expires and the form is cleared; an image CAPTCHA must be solved to submit; and error messages appear only as a red banner at the top of the page. Which WCAG 2.2 success criteria does it fail, and how would you fix each?
::: solution
- *Placeholder-only labels*: fails 1.3.1 Info and relationships and 3.3.2 Labels or instructions (A), and usually 4.1.2 if no accessible name is computed; placeholders also vanish while typing, burdening memory. Fix: visible `<label>` elements.
- *Required fields shown by colour alone*: fails 1.4.1 Use of colour (A); the red border may also fail 1.4.11 Non-text contrast (AA) if below 3:1 against the background. Fix: the word "required" in the label (and the `required` attribute, which assistive technology announces).
- *Five-minute expiry that clears the form*: fails 2.2.1 Timing adjustable (A) unless users are warned and can extend the time (at least ten times the default, or by a simple action with 20 seconds' notice). Fix: warn before expiry with an "Extend" button, and preserve entered data.
- *Image CAPTCHA*: a CAPTCHA needs a text alternative describing its purpose and an alternative form in a different modality (1.1.1); if it is part of signing in, a puzzle is a cognitive function test under 3.3.8 (AA). Fix: a less burdensome bot check (rate limiting, invisible risk scoring) or an accessible alternative.
- *Errors only in a banner at the top*: 3.3.1 Error identification (A) requires the field in error to be identified and the error described in text; 3.3.3 Error suggestion (AA) asks for a suggested correction; and 4.1.3 Status messages (AA) requires the message to be announced to screen readers. Fix: messages next to each field, linked to it programmatically (for example with `aria-describedby`), a summary at the top that links to each field, and focus moved to the summary.

Each failure also harms users without disabilities — placeholder labels and lost data are among the most common complaints in usability tests ([[hci/usability-evaluation]]) — which is a recurring finding: accessible design is usually better design.
:::
:::

## The law, as of 2026

Accessibility is increasingly a legal duty, not merely good practice. The details change; the following summarises the position as of 2026.

- **United Nations.** The *Convention on the Rights of Persons with Disabilities* (2006) obliges states parties to ensure access to information and communications technologies (Article 9).
- **European Union.** The **European Accessibility Act**, Directive (EU) 2019/882, has applied since **28 June 2025**. It covers products such as computers, smartphones, self-service terminals and e-readers, and services including e-commerce, consumer banking, e-books, electronic communications and ticketing for passenger transport; microenterprises providing services are exempt, and there are transition periods for services and terminals already in use. Conformance with the harmonised standard EN 301 549, whose web requirements incorporate WCAG at level AA, gives a presumption of conformity. The earlier Web Accessibility Directive (EU) 2016/2102 covers public-sector websites and apps.
- **United States.** The Americans with Disabilities Act (1990) is widely applied to websites through litigation. Section 508 of the Rehabilitation Act requires federal agencies' ICT to be accessible, with a 2017 refresh incorporating WCAG 2.0 AA. In April 2024 the Department of Justice adopted a rule under ADA Title II requiring state and local governments' web content and mobile apps to meet WCAG 2.1 AA; in April 2026 an interim final rule postponed the compliance dates to April 2027 for larger entities and April 2028 for smaller ones.
- **United Kingdom.** The Equality Act 2010 requires reasonable adjustments, and the Public Sector Bodies Accessibility Regulations 2018 require public-sector sites to meet WCAG AA and publish accessibility statements.

Laws reference specific WCAG versions, which lag the current one; designing to WCAG 2.2 AA satisfies the technical requirements of all of these, but none of them is satisfied by a checklist alone.

## Evaluating accessibility

Accessibility evaluation combines three methods, in increasing order of cost and insight.

**Automated testing** finds failures that can be detected from code: missing alternative text, missing labels, low contrast, empty links and buttons, missing document language. It is fast and repeatable and belongs in continuous integration. It is also very incomplete: it cannot judge whether alternative text is meaningful, whether focus order is logical, or whether a task can be completed. Even so, it shows how far most of the web is from the minimum: the WebAIM Million report, which runs an automated checker over the home pages of the top million websites each year, found detectable WCAG 2 failures on **95.9%** of home pages in February 2026, an average of 56 errors per page, with low-contrast text the most common failure (83.9% of pages), followed by missing alternative text and missing form labels.

**Manual expert testing** walks through pages and tasks with the keyboard alone (can everything be reached and operated? is the focus always visible? is there a keyboard trap?), with a screen reader (are names, roles and states announced sensibly? is the reading order right? are changes announced?), at 200% and 400% zoom, with simulated colour-vision deficiency ([[hci/visual-design#ex-cvd]]), and against each WCAG success criterion.

**Testing with disabled users** — usability testing ([[hci/usability-evaluation#def-usability-test]]) with participants who use assistive technology in daily life — finds what conformance checking cannot: whether the experience is actually usable, efficient and dignified. A page can conform to WCAG and still be exhausting to use with a screen reader. Recruit purposively ([[hci/user-centred-design#ex-rare]]), pay participants fairly, let them use their own devices and settings, and allow more time.

::: warning "An overlay widget makes the site accessible"
Third-party "accessibility overlays" — scripts that add a toolbar and claim to fix accessibility automatically — cannot repair missing semantics, keyboard traps or meaningless labels reliably, can interfere with users' own assistive technology, and do not create legal compliance. In 2021 several hundred accessibility practitioners and disabled users signed the *Overlay Fact Sheet* urging organisations not to rely on them. Accessibility comes from correct markup, design and testing, ideally built into components and design systems so that every page inherits it. Equally, "we'll add accessibility at the end" fails for the same reason as late security: retrofitting is far more expensive than building in.
:::

## Ethics: deceptive design

The techniques of this course — knowledge of attention, memory, defaults and effort — can be used to help people achieve their goals or to make them do what they would not otherwise choose. The second use has a name.

::: definition Deceptive design pattern {#def-dark-pattern}
A **deceptive design pattern** ("dark pattern", a term coined by Harry Brignull in 2010) is a user-interface design that benefits the service at the expense of the user by deceiving, coercing or manipulating them into choices they would not make if fully informed and unimpeded. Colin Gray and colleagues (CHI 2018) grouped such patterns into five strategies: **nagging** (repeated interruption), **obstruction** (making a task harder than necessary, such as a cancellation maze), **sneaking** (hiding or delaying relevant information, such as hidden costs or items added to a basket), **interface interference** (manipulating the interface so that some actions are favoured, such as pre-ticked boxes, disguised adverts or "confirmshaming" — "No thanks, I don't like saving money"), and **forced action** (requiring an unrelated action to proceed).
:::

Such patterns are common. Arunesh Mathur and colleagues ("Dark patterns at scale", *Proceedings of the ACM on Human–Computer Interaction*, CSCW 2019) crawled about 11,000 shopping websites and found 1,818 instances of dark patterns on 1,254 of them — about 11% — including fake countdown timers and fabricated "low stock" and "others are viewing this" messages. Because many are invisible to automated crawls, the true prevalence is likely higher. Asymmetry of effort, a form of obstruction, can be quantified with the tools of [[hci/interaction-techniques]].

::: example Measuring an asymmetric cookie banner {#ex-banner}
A banner offers "Accept all" as a large button. Rejecting requires "Manage options", then switching off three pre-ticked categories, then "Confirm my choices". Estimate both paths with the keystroke-level model, the hand already on the mouse.
::: solution
Each step is a decision, a pointing movement and a click, $M\,P\,K$ ([[hci/interaction-techniques#def-klm]]).

```python
# KLM estimate (hand already on the mouse) for two paths through a cookie banner.
T = {"M": 1.35, "P": 1.10, "K": 0.20}
def klm(ops):
    return sum(T[o] for o in ops.split())

accept = "M P K"                                   # "Accept all"
reject = ("M P K "                                 # "Manage options"
          "M P K M P K M P K "                      # switch off three pre-ticked categories
          "M P K")                                  # "Confirm my choices"
print(f"accept: {klm(accept):.2f} s, reject: {klm(reject):.2f} s, ratio {klm(reject) / klm(accept):.1f}")
```

```console
$ python3 banner.py
accept: 2.65 s, reject: 13.25 s, ratio 5.0
```

Rejecting costs five times the expert execution time, and the estimate is generous to the design: it ignores reading the options, finding a small grey link (a smaller $W$ and a larger Fitts index than the big button), and the uncertainty about what each switch does — and every user pays it on every site. Pre-ticked switches are themselves invalid as consent under the EU's GDPR as interpreted by the Court of Justice in *Planet49* (2019). A symmetric design offers "Accept all" and "Reject all" as equally prominent buttons on the first layer.
:::
:::

Regulators have moved against such designs. The EU's General Data Protection Regulation (2016) requires consent to be freely given, specific, informed and unambiguous, and withdrawal to be as easy as giving it (Article 7); the Digital Services Act, Regulation (EU) 2022/2065, prohibits online platforms from designing interfaces that deceive or manipulate users or materially distort their ability to make free and informed decisions (Article 25); and the US Federal Trade Commission's 2022 staff report *Bringing Dark Patterns to Light* documented the practices it treats as unfair or deceptive. The law catches only the clearest cases; the rest is professional responsibility.

### Designing responsibly

Beyond avoiding deception, several frameworks help designers reason about values. **Value sensitive design** (Batya Friedman, 1996; Friedman and David Hendry's book, 2019) identifies direct and indirect stakeholders and the values at stake — privacy, autonomy, fairness, trust, accessibility — and investigates them conceptually, empirically and technically throughout the design process. B. J. Fogg's *Persuasive Technology* (2003) described how computers can change attitudes and behaviour, and the field it named now asks when persuasion respects autonomy (reminders a user chose to receive) and when it exploits weaknesses (variable-reward notifications engineered to maximise time spent). **Privacy by design** — collecting the minimum data, defaulting to the protective option, making data flows visible — is a legal duty under the GDPR ("data protection by design and by default", Article 25). And systems that make decisions about people with machine-learning models raise questions of fairness, transparency and contestability treated in the [LLM Atlas](/learn/llm/).

Practical questions for any design review: Who benefits from this default? Would users choose the same if every option were equally easy? Would we be comfortable if users saw how this flow was designed and why? Who is excluded by this design, and have we tested with them? The ACM Code of Ethics (2018) asks computing professionals to "avoid harm" and to design systems that are "fair and take action not to discriminate" ([[software-engineering/professional-ethics]]); accessibility and honest design are where those principles meet the interface.

::: history
Section 508 of the US Rehabilitation Act was strengthened in 1998 to cover federal electronic and information technology, two years after the W3C launched its Web Accessibility Initiative (1997); WCAG 1.0 followed in 1999, WCAG 2.0 in 2008 (adopted as ISO/IEC 40500 in 2012), WCAG 2.1 in 2018 and WCAG 2.2 in 2023. The Americans with Disabilities Act was passed in 1990 and the UN Convention on the Rights of Persons with Disabilities adopted in 2006. Ron Mace coined "universal design" in the 1980s. On ethics, Batya Friedman introduced value sensitive design in 1996, B. J. Fogg's *Persuasive Technology* appeared in 2003, Harry Brignull coined "dark patterns" in 2010, and Gray and colleagues' taxonomy (2018) and Mathur and colleagues' crawl (2019) brought them into research. The GDPR applied from 2018, the Digital Services Act's obligations from 2024 for all platforms, and the European Accessibility Act from June 2025.
:::

## Where this leads

Accessibility and ethics are not a final chapter so much as a lens on all the others: the perceptual and motor variation of [[hci/human-factors]], the "specified users" of [[hci/user-centred-design]], the targets and gestures of [[hci/interaction-techniques]], the contrast and colour of [[hci/visual-design]], the participants of [[hci/usability-evaluation]] and the consent of [[hci/experiments]]. The professional, legal and societal responsibilities of software engineers in general are the subject of [[software-engineering/professional-ethics]], and the security side of honest design — phishing-resistant authentication, warnings people heed — of [[security]].

::: summary
- Disability arises from the interaction of impairments with barriers (the **social model**); about 16% of people experience significant disability (WHO 2022), and situational impairments affect everyone. **Accessibility** is usability for the widest range of users ([[#def-accessibility]]).
- Assistive technologies read the **accessibility tree** ([[#def-accessibility-tree]]): every control needs a role, a name and states. Use native elements first; ARIA describes but does not implement behaviour.
- **WCAG 2.2** (2023): four principles, 13 guidelines, 86 success criteria at levels A, AA and AAA ([[#def-wcag]]); AA is the legal benchmark. New criteria include target size, dragging alternatives and accessible authentication.
- Small targets meet 2.5.8 by spacing: centres at least 24 CSS px apart ([[#prop-target-spacing]]).
- As of 2026 the **European Accessibility Act** has applied since 28 June 2025; US and UK law also require accessibility, and most laws reference WCAG AA.
- Evaluate with automated tools (95.9% of top home pages fail even these, WebAIM 2026), manual keyboard and screen-reader testing, and testing with disabled users; overlays are not a fix.
- **Deceptive design patterns** ([[#def-dark-pattern]]) exploit attention, defaults and effort; quantify asymmetry with the KLM ([[#ex-banner]]); GDPR and the DSA prohibit the clearest cases. Value sensitive design and privacy by design help build responsibly.
:::

## Exercises

::: exercise Minimum gap {level=1 check="6"}
Icon buttons are 18 × 18 CSS px in a row. What is the smallest gap between them, in CSS px, for the spacing exception of WCAG 2.2 success criterion 2.5.8 to apply? (Enter the gap.)
::: solution
By [[#prop-target-spacing]], $g \ge 24 - 18 = 6$ px.
:::
:::

::: exercise Name, role, value {level=1}
For each element, say what a screen reader would announce and how to fix it: (a) `<div class="toggle on" onclick="flip()"></div>` used as a switch; (b) `<a href="/report.pdf">Click here</a>`; (c) `<img src="chart.png" alt="chart">` showing quarterly sales; (d) `<input type="checkbox" id="t"> I agree` with no label element.
::: solution
(a) Nothing useful — at best "clickable", with no role, name or state, and it cannot be focused. Use `<button role="switch" aria-checked="true">Notifications</button>` (with keyboard support coming from the native button), or a native checkbox styled as a switch. (b) "Click here, link" — meaningless out of context, and screen-reader users often navigate a list of links. Use "Download the 2025 annual report (PDF, 2 MB)". (c) "chart, image" — the information is lost. Give a short alternative summarising the message ("Sales rose each quarter, from £1.2m to £1.9m") and the data in a table nearby. (d) "checkbox, not checked" with no name. Use `<input type="checkbox" id="t"> <label for="t">I agree to the terms</label>`, which also makes the text clickable — a bigger target.
:::
:::

::: exercise Classify the pattern {level=1}
Classify each deceptive pattern into Gray and colleagues' five strategies ([[#def-dark-pattern]]): (a) a subscription that can be started online but only cancelled by phone during office hours; (b) a "Rate our app!" prompt shown every time the app opens; (c) travel insurance added to the basket by default; (d) a countdown "Offer ends in 09:59" that restarts on reload; (e) having to create an account to read a public article.
::: solution
(a) Obstruction (a "roach motel": easy in, hard out). (b) Nagging. (c) Sneaking (a sneak into basket); arguably interface interference via a pre-selected default. (d) Interface interference — false urgency; Mathur and colleagues classed fake timers under urgency, and they are also deceptive in the legal sense. (e) Forced action.
:::
:::

::: exercise Contrast for a button {level=2}
A design system's primary button is white text on `#0066CC`, and its disabled state is `#A0A0A0` text on `#E0E0E0`. Using the contrast computation of [[hci/visual-design#ex-contrast]], check both against WCAG 2.2 and comment.
::: solution
White on `#0066CC` has a ratio of about 5.57:1, passing 1.4.3 at AA for normal text. For the disabled state, `#A0A0A0` has $L \approx 0.3515$ and `#E0E0E0` $L \approx 0.7454$, so the ratio is $(0.7454 + 0.05)/(0.3515 + 0.05) \approx 1.98$. That would fail 1.4.3 — but WCAG exempts text in **inactive** user-interface components from the contrast requirement. The exemption makes the design conforming, not necessarily good: users with low vision may still need to *read* a disabled button to know what it would do, so many design systems keep disabled text closer to 3:1 and explain why the control is disabled.
:::
:::

::: exercise Keyboard path {level=2 check="9"}
A page has a header with 6 links, a search box with its submit button, and then the main content, whose first link is the one the user needs. With the keyboard alone, how many presses of Tab are needed to reach that link, starting before the first header link, if there is no skip link? How would a "Skip to main content" link (WCAG 2.4.1) change it? (Enter the number of Tab presses without a skip link.)
::: solution
Each focusable element is one Tab stop: 6 header links (presses 1–6), the search box (7) and its button (8), so the first content link is reached on press **9**. A skip link, as the first focusable element, takes the user to the main content with Tab, Enter and one more Tab: three presses on every page, instead of nine. For screen-reader users, headings and landmarks (`<main>`, `<nav>`) offer similar shortcuts.
:::
:::

::: exercise The cost of a cancellation maze {level=2}
A subscription can be cancelled only through a flow of five screens, each requiring a decision and a click, and each offering a discount to stay. Estimate the expert execution time with the KLM, and argue whether the flow is lawful in the EU and acceptable under the ACM Code of Ethics. Propose an alternative.
::: solution
Five steps of $M\,P\,K$ at 2.65 s each is about 13 s of execution, plus reading time for five retention offers — realistically a minute or more, against a few seconds to subscribe ([[#ex-banner]]). In the EU, Article 25 of the Digital Services Act prohibits manipulative interface design on online platforms and lists "making the procedure for terminating a service more difficult than subscribing to it" among the practices it targets, and unfair-commercial-practices law applies to traders generally; national rules on cancelling subscriptions vary, so check the jurisdiction. Under the ACM Code, deliberately obstructing a user's choice harms them and fails the principle of honesty. Alternative: a clearly labelled "Cancel subscription" in account settings leading to one confirmation screen, which may mention a retention offer once, with a single "Cancel" button of equal prominence, and an e-mail confirming the cancellation.
:::
:::

::: exercise A two-dimensional spacing check {level=3}
Generalise [[#prop-target-spacing]] to a grid: square targets of side $s < 24$ arranged in rows and columns with horizontal and vertical gaps $g$. Show that the condition $s + g \ge 24$ still suffices, including for diagonal neighbours, and write a function that checks the spacing exception for any list of axis-aligned rectangular targets, given as $(x, y, w, h)$ in CSS px, treating each undersized target's circle as centred on its bounding box. Test it on a $3 \times 3$ grid of 16-px icons with 8-px gaps and with 6-px gaps.
::: solution
In a grid, horizontally and vertically adjacent targets are at centre distance $s + g$, and diagonal neighbours at $\sqrt2\,(s + g)$, larger; the distance from a centre to the nearest point of a diagonal neighbour is $\sqrt2\,(s/2 + g)$, larger than the horizontal $s/2 + g$. So all conditions reduce to the horizontal ones, and $s + g \ge 24$ suffices.

```python
from math import hypot

def nearest_distance(cx, cy, rect):
    """Distance from point (cx, cy) to the nearest point of an axis-aligned rectangle."""
    x, y, w, h = rect
    dx = max(x - cx, 0, cx - (x + w))
    dy = max(y - cy, 0, cy - (y + h))
    return hypot(dx, dy)

def spacing_ok(targets, size=24):
    r = size / 2
    small = [t for t in targets if t[2] < size or t[3] < size]
    centre = lambda t: (t[0] + t[2] / 2, t[1] + t[3] / 2)
    for t in small:
        cx, cy = centre(t)
        for u in targets:
            if u is t:
                continue
            if nearest_distance(cx, cy, u) < r:                      # circle hits a target
                return False
            if u in small and hypot(cx - centre(u)[0], cy - centre(u)[1]) < 2 * r:
                return False                                          # two circles intersect
    return True

def grid(s, g, n=3):
    return [(i * (s + g), j * (s + g), s, s) for i in range(n) for j in range(n)]

print(spacing_ok(grid(16, 8)), spacing_ok(grid(16, 6)), spacing_ok(grid(24, 0)))
```

```console
$ python3 spacing.py
True False True
```

With 8-px gaps the centres are 24 px apart and the grid passes; with 6-px gaps they are 22 px apart and it fails; 24-px targets with no gaps are not undersized and pass trivially. (Circles exactly touching, at distance 24, count as not intersecting here, as in the proof.)
:::
:::

::: exercise Default effects and consent {level=3}
A study finds that when an organ-donation, pension or cookie choice is presented with "yes" pre-selected, far more people end up with "yes" than when "no" is pre-selected, although both are one click away. Using the KLM and what you know of human decision-making, explain why defaults are so powerful even when changing them is cheap, and argue when a default is a legitimate design choice and when it becomes a deceptive pattern. Relate your answer to GDPR consent.
::: solution
The KLM shows that changing a default costs little *execution* time ($M\,P\,K$, under 3 s), so the effect is not mainly about effort: it is about decision-making. Defaults are read as **recommendations** (the designer presumably chose the sensible option), they avoid the cognitive work of deciding — the $M$ operator is the costly one, and for an unfamiliar question it is far longer than 1.35 s — and people anchor on the status quo; Eric Johnson and Daniel Goldstein's analysis of organ-donor registration across European countries ("Do defaults save lives?", *Science*, 2003) is the classic demonstration. A default is legitimate when it is the option most users would choose if they thought about it, serves the user's interests, is disclosed clearly, and can be changed as easily as kept — a pension auto-enrolment with an easy opt-out is the standard example. It becomes deceptive when it serves the service against the user's likely preference and relies on inattention to stick, especially combined with obstruction (making the alternative harder) or sneaking (not disclosing it). Under the GDPR, consent must be an affirmative act, so a pre-ticked box cannot constitute consent at all (*Planet49*, 2019): for personal data, the legal default is "no" until the user says "yes".
:::
:::
