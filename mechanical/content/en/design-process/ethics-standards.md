An engineer's design leaves the drawing office to be built, sold and used by people who never see the calculations. Society protects them in three overlapping ways. **Standards** record agreed good practice — dimensions, test methods, safety distances, design rules — so that each designer need not rediscover them. **Law** makes some of that practice compulsory before a product may be sold, makes the producer pay for harm caused by defective products, and gives inventors and designers limited monopolies in return for disclosing their work. **Professional ethics** covers what neither standards nor law can reach: the judgement of the individual engineer when the calculation is uncertain, the schedule is tight and someone with more authority wants a different answer. This chapter treats the three in turn — standards and the European system of essential requirements, harmonised standards and CE marking; product liability; intellectual property — and then professional codes, ethical reasoning and whistle-blowing, illustrated by four cases whose facts are well documented: the Hyatt Regency walkways, the Pinto fuel tank, the Citicorp Center and the Challenger. It describes the principles; it is not legal advice, and the regulations it cites change, so their current texts must be consulted. Risk analysis itself is taught in [[design-process/reliability-risk]].

## Standards {#sec-standards}

::: definition Standard {#def-standard}
A **standard** is a document, established by consensus and approved by a recognised body, that provides for common and repeated use rules, guidelines or characteristics for products, processes or services (the definition of ISO/IEC Guide 2). Standards are prepared by committees of manufacturers, users, test houses, regulators and researchers, are reviewed periodically (ISO standards at least every five years), and are identified by number and year — ISO 12100:2010, EN ISO 13849-1:2023 — because the requirements change between editions.
:::

Engineers meet several kinds: **dimensional and interchangeability** standards (screw threads, ISO 286 limits and fits, bearing dimensions), **test-method** standards (tensile testing to ISO 6892-1, hardness, fatigue), **design and product** standards (pressure vessels, cranes, machine guards, gears), and **management-system** standards (ISO 9001 for quality, ISO 14001 for environmental management). The international bodies are ISO (founded 1947) and, for electrotechnology, IEC (1906); in Europe CEN and CENELEC publish European Norms (EN), which every member's national body (BSI, DIN, AFNOR …) must adopt unchanged and withdraw conflicting national standards; in the United States, standards come from many accredited developers such as ASME, ASTM and SAE, coordinated by ANSI.

A standard is in itself **voluntary**: nobody is obliged to follow it. It becomes effectively or legally compulsory in three ways: when a law refers to it (many US states make the ASME Boiler and Pressure Vessel Code mandatory for boilers within their jurisdiction), when a contract specifies it, or — the European approach below — when following it is the easiest way to demonstrate that the law's requirements are met. And in a court, a published standard is strong evidence of what a competent engineer should have known and done at the time.

### The hierarchy of machinery safety standards

Machinery safety standards are organised in three types, as described in ISO 12100:

- **Type-A** (basic safety) standards give concepts and principles for all machinery — chiefly ISO 12100:2010, *Safety of machinery — General principles for design — Risk assessment and risk reduction*.
- **Type-B** (generic) standards deal with one safety aspect or one type of safeguard across many machines — safety distances (ISO 13857), safety-related parts of control systems (ISO 13849-1), emergency stop (ISO 13850), interlocking devices (ISO 14119), guards (ISO 14120).
- **Type-C** (machine-specific) standards give detailed requirements for a particular kind of machine — presses, robots, lifts, machine tools. Where a type-C standard exists and covers a hazard, its requirements take precedence over the A and B standards for that machine.

::: algorithm Risk assessment and the three-step method (ISO 12100) {#alg-iso12100}
1. **Determine the limits of the machine**: intended use and *reasonably foreseeable misuse*, all phases of life (transport, installation, operation, cleaning, maintenance, decommissioning), the people exposed, space and time limits.
2. **Identify the hazards** (mechanical, electrical, thermal, noise, vibration, radiation, materials, ergonomic …) and the hazardous situations in every phase.
3. **Estimate the risk** of each: the severity of the possible harm combined with its probability — which depends on exposure, the occurrence of the hazardous event and the possibility of avoiding or limiting the harm.
4. **Evaluate the risk**: is further reduction required?
5. **Reduce the risk**, in this order of priority:
   (a) **inherently safe design** — remove the hazard or reduce it by the design itself (lower forces and speeds, no trapping gaps, rounded edges, low voltage, stable geometry);
   (b) **safeguarding and complementary protective measures** — fixed and interlocked guards, light curtains, two-hand controls, emergency stops;
   (c) **information for use** — warnings, signs, instructions, training requirements, personal protective equipment.
   After each measure, return to step 2: a measure can introduce new hazards.
:::

The order matters: a warning label does not reduce risk the way removing the hazard does, and a designer may not move to the next step merely because it is cheaper.

::: example Applying the three-step method to a belt conveyor {#ex-conveyor}
A belt conveyor in a packing line has an exposed in-running nip where the belt wraps the drive drum, a $0.75\,\mathrm{kW}$ geared motor, and is cleaned daily by operators who brush product residue off the belt near the drum. Apply the three-step method to the nip.
::: solution
*Limits and hazard:* intended use includes daily cleaning; reasonably foreseeable misuse includes cleaning while the belt runs. Hazard: drawing-in and crushing of hands and arms at the nip, possibly leading to amputation (high severity); exposure daily.

*Step 1, inherent design:* can the hazard be removed? Moving the drive to a position the cleaner never needs to reach, using a drum design that leaves no nip (for example a gap too small to admit fingers — the permissible values are in the relevant B-standard), reducing belt tension and drive torque so that a trapped hand can be pulled free, and redesigning the residue path so that cleaning near the drum is unnecessary.

*Step 2, safeguarding:* where the nip remains, a fixed guard enclosing it, removable only with a tool; if access is needed frequently, an interlocked guard that stops the drive before the nip can be reached (stopping time and the safety distances of ISO 13857 determine the geometry); a scraper fitted at the drum so that brushes are not needed.

*Step 3, information:* instruction to isolate before cleaning, lock-out procedure, a warning sign at the guard.

*Check:* the residual risk is re-evaluated after each step; the guard must not create new hazards (a heavy guard that falls on the hand) and must not encourage defeat (a guard that makes cleaning slow will be removed — so the design of the cleaning task is part of the safety design).
:::
:::

## Regulation: essential requirements and CE marking {#sec-regulation}

Products sold in the European Union fall under the **New Legislative Framework** (Regulation (EC) 765/2008 and Decision 768/2008/EC) and the product legislation built on it. The law states **essential requirements** — what must be achieved, for example that moving parts must be designed to prevent risks of contact — and leaves the technical means to standards.

::: definition Harmonised standard and presumption of conformity {#def-harmonised}
A **harmonised standard** is a European standard (EN) developed by CEN, CENELEC or ETSI at the request of the European Commission to support a piece of product legislation, whose reference has been published in the Official Journal of the EU. A product designed in accordance with a harmonised standard benefits from a **presumption of conformity** with the essential requirements that the standard covers. The manufacturer may use other means, but must then demonstrate conformity directly.
:::

For a machine the manufacturer must carry out the risk assessment, design to meet the essential health and safety requirements, compile a **technical file** (drawings, calculations, risk assessment, test reports, the standards applied, instructions), follow the applicable **conformity-assessment procedure** — self-assessment for most machinery, involvement of a third-party *notified body* for listed high-risk categories — draw up and sign an **EU declaration of conformity**, and affix the **CE marking**. The CE marking is the manufacturer's declaration that the product meets all applicable EU legislation; it is not a quality mark and it is not, for most machinery, a third-party approval.

The rules for machinery are in the **Machinery Directive 2006/42/EC**, which is replaced by the **Machinery Regulation (EU) 2023/1230**, applicable from 20 January 2027. The Regulation applies directly in every member state, extends the essential requirements to cover, among other things, machinery whose safety functions involve software and self-evolving behaviour, and allows the instructions to be supplied in digital form. In Great Britain, the UKCA marking and the Supply of Machinery (Safety) Regulations 2008 play a parallel role (with recognition of CE marking extended; check the current position). In the United States there is no general pre-market approval for machinery; workplace safety is regulated by OSHA, consumer products by the CPSC, and many codes are given force by state law or by contract — the legal consequences of an unsafe design arrive mainly through product-liability litigation.

::: warning "It complies with the standard, so it is safe"
Compliance with a harmonised standard creates a *presumption* of conformity, not a guarantee of safety. Standards lag behind technology, cover only the hazards they list, and assume the intended use their authors foresaw. A designer must still carry out the risk assessment for the actual machine, including foreseeable misuse; where a hazard is not covered by the standard (a new material, an unusual operating mode, software behaviour), the standard is silent and the duty to reduce the risk remains. Conversely, departing from a standard is not automatically wrong — but the reason and the alternative evidence must be documented.
:::

## Product liability {#sec-liability}

When a product injures someone, the injured person can claim compensation from the producer. Two legal bases matter. In **negligence** the claimant must prove that the producer owed a duty of care, breached it by falling below the standard of a reasonably competent producer, and thereby caused the damage. In **strict liability** fault need not be proved.

::: definition Defective product (EU strict liability) {#def-defect}
Under the EU Product Liability Directive 85/374/EEC, the producer is liable without fault for damage caused by a defect in its product. A product is **defective** when it does not provide the safety which a person is entitled to expect, taking all circumstances into account, including its presentation, the use to which it could reasonably be expected to be put, and the time when it was put into circulation. Defences include that the defect did not exist when the product was put into circulation, and the *development-risks defence*: that the state of scientific and technical knowledge at that time did not enable the defect to be discovered. Claims must be brought within three years of the claimant becoming aware of the damage, defect and producer, and no later than ten years after the product was put into circulation.
:::

The Directive has been replaced by the revised **Product Liability Directive (EU) 2024/2853**, which member states must transpose by 9 December 2026 and which applies to products placed on the market after that date. It explicitly brings software (including software supplied as a service or as an update) within the definition of a product, and eases the burden of proof for claimants in technically complex cases.

Defects are commonly classified as **manufacturing defects** (this unit differs from the design — a missing weld), **design defects** (every unit is dangerous because of the design), and **warning or instruction defects**. Design defects are the engineer's direct responsibility, and courts in many jurisdictions weigh them by a risk–utility test: could a reasonable alternative design, technically and economically feasible at the time, have reduced the risk? The design file — the risk assessment, the alternatives considered and the reasons for rejecting them — is therefore also the producer's evidence. In the US, *Grimshaw v. Ford Motor Co.* (California, jury verdict February 1978) concerned a Pinto struck from behind whose fuel tank was ruptured: the jury awarded $125 million in punitive damages in addition to compensatory damages, later reduced by the judge to $3.5 million.

## Intellectual property {#sec-ip}

A design represents knowledge that competitors could copy. Intellectual property law grants limited exclusive rights in return for — in the case of patents — public disclosure.

::: definition Patentability {#def-patent}
Under the European Patent Convention (Articles 52–57), a **patent** is granted for an invention in any field of technology that is **new** (not part of the state of the art — anything made available to the public anywhere, by any means, before the filing or priority date, including the inventor's own publication), involves an **inventive step** (is not obvious to a person skilled in the art), and is **susceptible of industrial application**. Discoveries, scientific theories, mathematical methods, aesthetic creations and presentations of information as such are excluded. The patent confers the right to prevent others from making, using, selling or importing the claimed invention in the territories where it is granted, for at most **20 years from the filing date**, subject to annual renewal fees. The application is published 18 months after the priority date.
:::

The **claims** define the protected scope; the description must disclose the invention clearly enough for a skilled person to carry it out. Under the Paris Convention an applicant who files first in one country has 12 months of **priority** to file elsewhere and keep the first date. Europe has essentially no grace period: an engineer who presents a new mechanism at a conference before filing has destroyed its novelty. The United States allows the inventor a one-year grace period for the inventor's own disclosures, but relying on it forfeits rights in Europe.

The other rights:

- **Registered designs** protect the appearance of a product (shape, contours, surface); in the UK and EU they last up to 25 years in five-year terms. **Unregistered design rights** give shorter, automatic protection against copying.
- **Trade marks** protect signs that distinguish a company's goods; registration lasts ten years and can be renewed indefinitely.
- **Copyright** protects drawings, documentation and software code automatically, in the EU and UK for 70 years after the author's death; it protects the expression, not the idea.
- **Trade secrets** — process parameters, recipes, supplier know-how — are protected as long as they are kept secret by reasonable measures (in the EU under Directive (EU) 2016/943); they last indefinitely but give no protection against independent discovery or reverse engineering.

Engineers use patents in two directions. Searching patent databases (Espacenet, Google Patents) is a source of concepts ([[design-process/concept-generation]]) and shows the state of the art. Before launching a product, a **freedom-to-operate** (FTO) analysis checks whether it would infringe the claims of patents in force in the countries of manufacture and sale; expired patents and patents not validated in a country may be used freely there.

::: example Patent dates {#ex-patent-dates}
An engineer files a UK patent application for a new clamping mechanism on 15 March 2020, then files a European application claiming its priority on 15 March 2021. When is the European application published, and when does the European patent expire if all renewal fees are paid? What should the company have avoided between the two filings?
::: solution
Publication is 18 months after the *priority* date: September 2021. The term is 20 years from the *filing date* of the European application: the patent expires on 15 March 2041. Claiming priority thus extends the end of protection to 21 years after the first filing, while the novelty of the European application is judged at the priority date. Between filings the company could disclose the invention as described in the priority application without harming novelty; but any *new* features added later and disclosed before their own filing would not be protected, so improvements should be filed before they are shown.

*Check:* term and publication are counted from different dates — a frequent source of error.
:::
:::

## Professional responsibility {#sec-professional}

Professional engineers are trusted because the public cannot check their work. Codes of conduct make the terms of that trust explicit. The Code of Ethics of the US National Society of Professional Engineers (NSPE) begins its fundamental canons with the duty to **"hold paramount the safety, health, and welfare of the public"**, followed by performing services only in areas of competence, issuing public statements only in an objective and truthful manner, acting for each employer or client as faithful agents or trustees, avoiding deceptive acts, and conducting themselves honourably and lawfully. Its rules add that if engineers' judgement is overruled in circumstances that endanger life or property, they shall notify their employer or client and such other authority as may be appropriate. In the UK, the Statement of Ethical Principles of the Engineering Council and the Royal Academy of Engineering, which underpins the codes of the professional institutions, was updated in February 2026 and now lists five principles: honesty and integrity; responsibility to society; accuracy and rigour; leadership and communication; and responsibility for the future of technology, society and the environment. Registration as a Chartered Engineer or a licensed Professional Engineer binds the engineer to a code, and breaches can lead to loss of the title or licence.

### Ways of reasoning about a dilemma

Codes cannot settle every case, so it helps to know the main ethical theories, which usually agree and are most useful where they do not.

- **Consequentialism** (utilitarianism) judges an action by its outcomes: choose the option with the greatest balance of benefit over harm for all affected. It underlies cost–benefit analysis and quantitative risk assessment. Its weakness is that it can justify imposing serious harm on a few for a small gain to many, and that it depends on valuing things — injuries, lives — that resist valuation.
- **Duty-based** (deontological) ethics, associated with Kant, judges actions by whether they respect duties and rights: do not deceive, keep promises, do not treat people merely as means. It explains why informed consent matters — people may accept a risk they know about, but not one hidden from them.
- **Virtue ethics** asks what a person of good character — honest, competent, courageous, conscientious — would do, and is close to how engineers describe professional integrity.

::: algorithm A practical approach to an engineering dilemma {#alg-dilemma}
1. **Establish the facts**: what is known, what is uncertain, what tests or calculations could reduce the uncertainty, and how soon.
2. **Identify the stakeholders** and what each stands to gain or lose, including those not in the room (users, the public, future owners).
3. **Identify the obligations**: law, standards, the employer's procedures, the professional code — and where they conflict, recall that the codes put public safety first.
4. **Generate options** — rarely only "comply" or "refuse": further tests, a reduced operating envelope, a temporary restriction, escalation within the organisation, independent review.
5. **Test the options**: consequences for each stakeholder; would the affected people consent if fully informed; would you be comfortable seeing the decision and its reasoning reported publicly.
6. **Act and document**: record the facts, the advice given and the decision.
:::

**Whistle-blowing** — disclosing a danger or wrongdoing outside the normal chain of authority — is the last resort in step 4. A widely used set of conditions, due to the philosopher Richard De George, holds that an engineer is *permitted* to blow the whistle publicly when the harm is serious and considerable, the concern has been reported to the immediate superior, and internal channels up to the highest level have been exhausted; and is *obliged* to do so when, in addition, there is documented evidence that would convince a reasonable impartial observer and good reason to believe disclosure will prevent the harm. Many jurisdictions protect workers who make such disclosures in good faith through prescribed channels — in the UK the Public Interest Disclosure Act 1998, in the EU the Whistleblower Protection Directive (EU) 2019/1937.

## Four cases {#sec-cases}

### The Hyatt Regency walkways, 1981

On 17 July 1981, during a tea dance in the atrium of the Hyatt Regency hotel in Kansas City, Missouri, two suspended walkways collapsed: the fourth-floor walkway, with the second-floor walkway hung directly below it, fell onto the crowded lobby. 114 people were killed and more than 200 injured. The original design hung both walkways from continuous rods running from the atrium roof down through the fourth-floor box beams to the second-floor box beams, each beam supported by a nut and washer on the rod. During fabrication, the steel fabricator proposed replacing each continuous rod by two rods — one from the roof to the fourth-floor beam, a second from the fourth-floor beam down to the second-floor beam — and the change was accepted by the structural engineers without the connection being recalculated.

::: proposition Load on the fourth-floor connection {#prop-hyatt}
Let each hanger connection carry a load $P_4$ from the fourth-floor walkway and $P_2$ from the second-floor walkway. With a continuous rod, the nut under the fourth-floor box beam transmits $P_4$. With the two-rod detail, it transmits $P_4 + P_2$ — twice as much for equal walkway loads.
:::

::: proof
*Continuous rod.* Free body of the fourth-floor box beam at one hanger: downward the walkway load $P_4$; upward the nut reaction $N_4$. The rod passes through the beam without being attached except by that nut, so $N_4 = P_4$. The second-floor load $P_2$ travels up the rod, past the fourth floor, to the roof; the rod above the fourth floor carries $P_4 + P_2$ in tension but the beam does not.

*Two rods.* Free body of the fourth-floor box beam: downward $P_4$ and the tension of the lower rod, which hangs from this beam and carries the second-floor beam, $T_{\mathrm{lower}} = P_2$ (from the free body of the second-floor beam); upward the nut of the upper rod, $N_4$. Equilibrium gives $N_4 = P_4 + P_2$. With $P_4 = P_2 = P$, $N_4 = 2P$. The force passes through the nut, washer and the welded seam of the box beam — the weak point in both designs. (Rod-to-beam friction and the self-weight of the rods are neglected.)
:::

The investigation by the US National Bureau of Standards found that even the original detail would have had only about 60 % of the capacity required by the Kansas City building code; the as-built detail doubled the demand on it. The Missouri licensing board found the engineers responsible for the structural design guilty of gross negligence, misconduct and unprofessional conduct in the practice of engineering, and in 1984 their Missouri licences were revoked, together with their firm's certificate of authority. The engineer of record later accepted responsibility for the failure. The American Society of Civil Engineers subsequently adopted the position that the structural engineer of record is responsible for reviewing shop drawings and connection details. The lesson for designers: **a change made for constructability is a design change**, and a design change must go through the same calculation and review as the original.

### The Pinto fuel system and the 1973 cost–benefit memo

The Ford Pinto, introduced in 1971, had its fuel tank between the rear axle and the rear bumper, where it could be punctured in rear-end collisions. After a 1977 magazine article and investigation by the National Highway Traffic Safety Administration, which in May 1978 determined that the fuel system was defective, Ford recalled about 1.5 million Pintos and Mercury Bobcats in June 1978 — then the largest recall in automotive history. In 1980 an Indiana jury found Ford not guilty of reckless homicide over the deaths of three teenagers in a 1973 Pinto, the first criminal prosecution of a US corporation over a product design. The case is remembered above all for a 1973 Ford memorandum, "Fatalities Associated with Crash-Induced Fuel Leakage and Fires" (by E. S. Grush and C. S. Saunby), submitted to the regulator to oppose a proposed fuel-system standard. Contrary to many retellings, it was not an analysis of the Pinto's rear-end problem but a cost–benefit analysis of a rollover fuel-leakage requirement for all cars and light trucks sold in the US.

::: example The arithmetic of the 1973 memo {#ex-pinto}
The memo estimated that the requirement would prevent 180 burn deaths, 180 serious burn injuries and 2100 burned vehicles a year, valued (using regulator figures of 1972) at \$200 000 per death, \$67 000 per injury and \$700 per vehicle, at a cost of \$11 per vehicle for 12.5 million vehicles (11 million cars and 1.5 million light trucks). Reproduce the totals, and identify what the arithmetic leaves out.
::: solution
Benefits: $180\times200\,000 + 180\times67\,000 + 2100\times700 = 36.0 + 12.06 + 1.47 = \$49.53$ million. Costs: $12.5\times10^6\times11 = \$137.5$ million (reported as \$137 million). On these figures the costs exceed the benefits by a factor of about 2.8.

The arithmetic is correct; what makes the memo notorious is what it embodies. It puts a price on deaths and injuries in a way that the people at risk never accepted; it counts only some harms (no pain and suffering beyond the regulator's figures, no loss of trust); it treats an \$11 cost spread over everyone as commensurable with death concentrated on a few; and it does not ask whether cheaper fixes existed. Regulators do use values of statistical life to set priorities between safety measures — the method itself is not unethical — but it is a tool for comparing ways of saving lives, not a licence to keep a known, cheaply avoidable hazard. *Sanity check:* $\$137.5\mathrm{M}/12.5\mathrm{M} = \$11$ per vehicle, $\$49.53\mathrm{M}/12.5\mathrm{M} \approx \$3.96$ per vehicle — the "benefit per vehicle" a consumer was implicitly told the fix was worth.
:::
:::

### The Citicorp Center, 1978

The 59-storey Citicorp Center in New York (completed 1977), designed structurally by William LeMessurier, stands on four columns placed at the midpoints of its sides rather than its corners, with stacked chevron braces in each face carrying the wind loads down to them, and a tuned mass damper at the top to reduce sway. In 1978, prompted by questions from a Princeton student, Diane Hartley, about winds striking the building at 45° ("quartering winds"), and having learnt that the fabricator had substituted bolted for welded brace connections, LeMessurier recalculated the structure. He found that quartering winds raised the forces in some braces by 40 % and those in the bolted connections by 160 %, and estimated that a storm able to fail the critical joint would occur on average once in 16 years if the damper lost power, once in 55 years with it working. He informed the owners and the city; over August–October 1978, with a backup generator installed for the damper and an evacuation plan prepared, steel plates were welded over the bolted joints at night. A hurricane (Ella) approached in early September before turning out to sea. The story became public only in 1995, in an article by Joe Morgenstern in *The New Yorker*. (A later reassessment by NIST suggested the quartering-wind loads were less severe than LeMessurier had calculated; the case is still the classic example of an engineer reporting his own error.)

::: proposition Probability of at least one exceedance {#prop-exceedance}
If an event (such as a wind speed above a given value) has probability $p$ of occurring in any one year, independently from year to year, the probability that it occurs at least once in $n$ years is
$$
P_n = 1 - (1-p)^n \approx np \quad (np \ll 1).
$$ {#eq-exceedance}
The mean interval between occurrences — the **return period** — is $T = 1/p$.
:::

::: proof
The probability of no occurrence in one year is $1-p$; by independence, of none in $n$ years $(1-p)^n$; the complement is at least one occurrence. For small $np$, $(1-p)^n = e^{n\ln(1-p)} \approx e^{-np} \approx 1 - np$. The number of years until the first occurrence is geometrically distributed with mean $1/p$.
:::

::: example What "once in 16 years" means {#ex-citicorp}
Using LeMessurier's estimates, find the probability that the critical storm occurs (a) in one year with the damper unpowered, (b) during a 50-year design life with the damper working.
::: solution
(a) $p = 1/16 = 0.0625$: 6.25 % per year. (b) $p = 1/55$: $P_{50} = 1 - (54/55)^{50} = 1 - 0.400 = 0.600$ — a 60 % chance over the life, for a failure that could have toppled an occupied tower. By comparison, design codes aim for annual probabilities of structural collapse many orders of magnitude lower. *Sanity check:* the approximation $np = 50/55 = 0.91$ is poor here because $np$ is not small; the exact formula must be used, and it can never exceed 1.
:::
:::

::: widget plot
f: 1 - (1 - 1/T)^x; 1 - (1 - 1/(4*T))^x
x: 0, 100
y: 0, 1
sliders: T=55:5:500:5
labels: P_n,\ \text{return period }T; P_n,\ \text{return period }4T
caption: Probability of at least one occurrence of an event with return period $T$ years within $n$ years (horizontal axis). Set $T = 50$: over a 50-year life the "50-year event" is more likely than not to happen (63.6 %). Now set $T = 16$ to see LeMessurier's unpowered-damper case, and compare the second curve to see how much a fourfold increase in return period buys. Notice how far from "safe" a return period equal to the design life is.
:::

### The Challenger, 1986

On 28 January 1986 the Space Shuttle *Challenger* broke apart 73 seconds after launch, killing its seven crew. The Presidential Commission chaired by William P. Rogers found that the cause was the failure of the O-ring seals in the aft field joint of the right solid rocket booster, which allowed hot combustion gas to escape and burn through the external tank attachment and tank. Erosion and blow-by of O-rings had been seen on earlier flights and were known to worsen at low temperature, when the rubber is less resilient. On the eve of the launch, with a forecast morning temperature far below that of any previous launch (the coldest had been about 12 °C, 53 °F; the air temperature at launch was about 2 °C, 36 °F), engineers of the booster contractor Morton Thiokol, among them Roger Boisjoly and Arnold Thompson, recommended against launching below 12 °C. NASA managers challenged the recommendation; in an off-line caucus, Thiokol's senior management reversed it — one manager was asked to "take off his engineering hat and put on his management hat" — and Thiokol signed a recommendation to launch. The Commission (report of June 1986) criticised a decision process in which the burden of proof had shifted to the engineers to prove that flight was unsafe, and in which the concerns were not passed to the top-level launch decision makers. In his appendix to the report, Richard Feynman wrote: "For a successful technology, reality must take precedence over public relations, for nature cannot be fooled."

::: quiz
In the Challenger teleconference, which shift in reasoning did the Rogers Commission identify as the core failure of the decision process?
- [ ] the engineers used the wrong material data for the O-rings
- [x] the burden of proof moved from showing the launch was safe to showing it was unsafe
- [ ] the launch was delayed too often, increasing schedule pressure
- [ ] the engineers failed to raise any concern before launch
::: solution
The engineers did raise their concern and recommended against launch. The failure was that, with incomplete data, the default became "launch unless proved unsafe", inverting the normal requirement in safety-critical engineering to demonstrate safety before proceeding. Uncertainty about a safety-critical item is a reason to stop, not to go.
:::
:::

::: history
Codes and standards have repeatedly followed disasters. The boiler explosion at the Grover Shoe Factory in Brockton, Massachusetts, on 20 March 1905, which killed 58 people, led Massachusetts to adopt boiler rules, and ASME formed a Boiler Code Committee in 1911 whose first code, dated 1914, was published in 1915; it became the ASME Boiler and Pressure Vessel Code. The British Engineering Standards Committee, the origin of BSI, was formed in 1901; the IEC was founded in 1906 and ISO in 1947. Product-liability law grew in the US courts in the 1960s and in Europe with Directive 85/374/EEC of 1985. Professional codes such as the NSPE's grew in importance after cases like the Hyatt Regency collapse (1981) and the Challenger accident (1986), which became core material of engineering ethics teaching.
:::

::: summary
- Standards are consensus documents, voluntary in themselves, made compulsory by law, contract, or — in the EU — by giving a presumption of conformity with legal essential requirements. Quote them with their year.
- ISO 12100: determine limits, identify hazards, estimate and evaluate risk, then reduce it by inherently safe design first, safeguarding second and information last. Type-A, B and C standards form the machinery hierarchy.
- CE marking is the manufacturer's declaration of conformity, backed by a technical file; machinery moves from Directive 2006/42/EC to Regulation (EU) 2023/1230 on 20 January 2027.
- EU product liability is strict: a product is defective if it lacks the safety people are entitled to expect; Directive (EU) 2024/2853 extends it to software from December 2026. The design file is the producer's evidence.
- Patents require novelty, inventive step and industrial application and last at most 20 years from filing; file before disclosing. Use patent searches for ideas and FTO analysis before launch.
- Codes put public safety first; consequentialist, duty-based and virtue reasoning illuminate dilemmas; whistle-blowing is a last resort after internal channels, with legal protection in many countries.
- Hyatt Regency: a constructability change doubled a connection load — every change is a design change. Pinto: cost–benefit is a tool, not a licence. Citicorp: report your own error. Challenger: under uncertainty, the burden of proof lies on showing safety.
:::

## Exercises

::: exercise Patent expiry {#exr-patent level=1 check="2041"}
A European patent application is filed on 1 June 2021, claiming priority from a national application filed on 1 June 2020. In which year does the patent expire if all renewal fees are paid? (Enter the year.)
::: solution
20 years from the filing date of the European application: 1 June 2041. The priority date (2020) governs novelty and the publication date (December 2021, 18 months after priority), not the term.
:::
:::

::: exercise The 50-year wind {#exr-fifty level=1 check="0.64"}
A structure is designed for the wind speed with a return period of 50 years. What is the probability that this wind is exceeded at least once during a 50-year design life? (Enter the probability rounded to two decimal places.)
::: solution
$1 - (1 - 0.02)^{50} = 1 - 0.364 = 0.636 \approx 0.64$. This is why codes apply load factors to the characteristic wind: the 50-year value is not a rare event over the life of a structure.
:::
:::

::: exercise Hyatt connection force {#exr-hyatt level=1 check="180"}
In a two-rod hanger detail like that of [[#prop-hyatt]], each hanger connection carries $90\,\mathrm{kN}$ from the fourth-floor walkway and $90\,\mathrm{kN}$ from the second-floor walkway. What force does the nut under the fourth-floor box beam transmit? (Enter it in kN.) What would it be with a continuous rod?
::: solution
Two rods: $N_4 = P_4 + P_2 = 90 + 90 = 180\,\mathrm{kN}$. Continuous rod: $N_4 = P_4 = 90\,\mathrm{kN}$. The rod above the fourth floor carries $180\,\mathrm{kN}$ in both cases; only the path through the box beam changes.
:::
:::

::: exercise Recomputing the memo {#exr-pinto level=2 check="49.53"}
Using the figures in [[#ex-pinto]], compute the memo's total annual benefit. (Enter it in millions of dollars.) Then find the value per death at which benefits would equal costs, keeping the other figures fixed, and comment.
::: solution
Benefits $= 36.0 + 12.06 + 1.47 = 49.53$ million dollars. For equality, $180V + 12.06 + 1.47 = 137.5$, so $V = (137.5 - 13.53)/180 = 0.689$ million dollars per death — about 3.4 times the figure used. The decision flips within the plausible range of such valuations (and of the cost and casualty estimates), which shows how fragile a cost–benefit "proof" is when it turns on a contested valuation, and why the uncertainty in each input should be stated.
:::
:::

::: exercise Ten years with an unpowered damper {#exr-citicorp level=2 check="0.476"}
Using LeMessurier's estimate of a 1-in-16-year critical storm with the damper unpowered, what is the probability of at least one such storm in 10 years? (Enter it rounded to three decimal places.) How many years with the damper working (1 in 55) give a 50 % chance?
::: solution
$1 - (15/16)^{10} = 1 - 0.5245 = 0.476$. For 50 % with $p = 1/55$: $n = \ln 0.5/\ln(54/55) = 37.8$, so about 38 years. Either figure is unacceptable for the collapse of an occupied building, which justified the urgent repair.
:::
:::

::: exercise Classifying standards {#exr-classify level=2}
Classify each as a type-A, type-B or type-C machinery standard, and say which governs if they conflict for a given hazard on a hydraulic press brake: (a) ISO 12100; (b) ISO 13857, safety distances to prevent hazard zones being reached; (c) EN 12622, safety of hydraulic press brakes; (d) ISO 13850, emergency stop.
::: solution
(a) Type A; (b) Type B; (c) Type C; (d) Type B. For a hazard that the type-C standard covers, its requirements take precedence for that machine; the A and B standards apply where it is silent and supply the general method (risk assessment) and generic safeguards.
:::
:::

::: exercise Disclosure before filing {#exr-disclosure level=2}
A student team designs a novel quick-release mechanism for bicycle wheels, presents it at a public design show in May, and files a UK patent application in July. A sponsor wants to patent it in Germany and the US. Advise them.
::: solution
The public presentation in May is part of the state of the art for a July filing under the European rules (the UK follows the European Patent Convention), so the UK and any European application lack novelty for whatever was shown; only features not disclosed at the show can be protected. In the US the inventors' own disclosure is within a one-year grace period, so a US application filed before May of the following year could still be valid, but this does not rescue Europe. Lessons: file before disclosing (or disclose under a confidentiality agreement); consider registered design protection for the appearance (the UK and EU allow a 12-month grace period for designs); and keep dated records of the development.
:::
:::

::: exercise A signature under pressure {#exr-dilemma level=3}
You are the engineer responsible for the design calculations of a lifting beam for a new production line. Two days before commissioning, a colleague notices that the fatigue check used a load spectrum for one shift a day, whereas the plant will run three shifts. Your quick estimate suggests the fatigue life falls from 25 years to about 8. The beam is statically safe. Your manager points out that the line must start on schedule and that "eight years is longer than the product will be made". Use [[#alg-dilemma]] to analyse the situation and say what you would do.
::: solution
*Facts:* static safety is unaffected, but the fatigue life now relies on an assumption (the product's production life) that is not under engineering control, and fatigue failure of a lifting beam is sudden and potentially fatal. A proper recalculation (with the correct spectrum, detail categories and inspection possibilities) can probably be done in hours. *Stakeholders:* operators below the beam, maintenance staff, the company, future owners of the equipment. *Obligations:* the professional codes (safety first; accuracy and rigour), lifting-equipment regulations and standards (which require the design to suit the actual duty), the employer's interest in avoiding liability. *Options:* recalculate now; if the life is confirmed short, commission with a documented restriction (reduced load or duty), a defined inspection interval for crack detection at the critical details and a dated replacement or reinforcement; reinforce the details before or soon after start-up; inform the client in writing. Signing the original calculation unchanged is not an option: the calculation is now known to be wrong, and its conclusion depends on a commercial assumption presented as an engineering one. *Act and document:* tell the manager the result and the options in writing; most such conflicts are resolved by a short delay or a documented restriction, without escalation. Only if overruled on a matter that endangers life would you escalate further, as the codes require.
:::
:::

::: exercise Design review of a constructability change {#exr-change level=3}
A fabricator proposes, to simplify erection, that a pin-ended tie in a mezzanine floor be replaced by two shorter ties bolted to a gusset plate at mid-length, and asks for approval by email "today". Explain, with a free-body argument like that of [[#prop-hyatt]], what you must check before approving, and draft the process your firm should follow for all such requests.
::: solution
Free body of the new gusset plate: it now transmits the full tie force between the two ties through two bolt groups and the plate, a load path that did not exist before; the plate's net section, block shear, bolt shear and bearing, and any eccentricity (if the ties are not on a common line, the plate and ties carry bending) must be checked, and the stiffness of the tie changes (bolt slip), which may redistribute forces in an indeterminate floor. The process: every proposed change is recorded as a formal change request with drawings; the engineer of record (or a delegate with the competence) checks the changed load path with calculations, not by inspection; the check is reviewed by a second engineer in proportion to the consequence of failure; approval is given in writing on the shop drawings; and changes are traceable in the design file. The Hyatt Regency case shows that a change "only to the detailing" can double a force, and that telephone or email approvals without calculations are the weak point.
:::
:::

## Further reading

Harris, Pritchard, Rabins, James and Englehardt, *Engineering Ethics: Concepts and Cases* (Cengage), and Martin and Schinzinger, *Ethics in Engineering* (4th edition, McGraw-Hill, 2005), discuss the theories, codes and many cases, including those above. The *Report of the Presidential Commission on the Space Shuttle Challenger Accident* (1986) and the National Bureau of Standards' investigation of the Kansas City Hyatt Regency walkways (1982) are the primary accounts of two of them; Morgenstern's "The fifty-nine-story crisis" (*The New Yorker*, 29 May 1995) tells the Citicorp story. For machinery safety, ISO 12100:2010 is the starting point; the European Commission's guides to the Machinery Directive and Regulation explain the conformity procedures.
