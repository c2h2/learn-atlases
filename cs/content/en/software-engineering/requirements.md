"The system shall lock a user's account after three failed login attempts." The sentence looks finished. Now try to implement it. Three failures in a row, or three in total? Over what period — a minute, a day, the account's lifetime? Does a successful login reset the count? For how long is the account locked, and who unlocks it? Is the count per account or per network address? Each question has several sensible answers, a programmer who does not ask will silently pick one, and the choices matter: a lockout with no time limit lets anyone who knows your username lock you out of your own account for ever, which turns a security feature into a denial-of-service attack.

**Requirements engineering** is the work of finding out what a system should do, writing it down precisely enough to build and check, and keeping that description right as the world changes. Frederick Brooks called it the hardest part of the job: "The hardest single part of building a software system is deciding precisely what to build" ("No Silver Bullet", 1986). This chapter develops the vocabulary — functional and non-functional requirements, the distinction between the world and the machine — and the techniques: elicitation, structured natural language, use cases, user stories with executable acceptance criteria, decision tables that can be checked mechanically for gaps and contradictions, and traceability from requirements to tests.

## What a requirement is

::: definition Requirement {#def-requirement}
A **requirement** is a statement of a property that a system must have to satisfy its stakeholders. **Stakeholders** are the people and organisations affected by the system: users, customers who pay, operators, regulators, and others whose interests it touches. A **functional requirement** states something the system must *do* — a behaviour, as a response to inputs or events. A **non-functional requirement** (or **quality requirement**) states how well it must do it or under what conditions: performance, reliability, security, usability, accessibility, maintainability, portability. A **constraint** restricts the solution: the programming language, a regulation to comply with, an existing system to interoperate with.
:::

Requirements are written at different levels of detail for different readers. **User requirements** describe in the users' language what they need ("a customer can see which seats are free"). **System requirements** describe precisely what the software must do to meet them ("the seat map shall show each seat's status as free, held or sold, updated within 2 seconds of any change"). Both are about *what*, not *how*: "store the seats in a hash table" is a design decision, and putting it in the requirements would forbid better designs for no reason.

### The world and the machine

Requirements are about the world, but software can only control the machine. Michael Jackson and Pamela Zave made this distinction precise in "Four dark corners of requirements engineering" (*ACM TOSEM*, 1997).

::: definition Requirements, specification, domain knowledge {#def-wsr}
Let $R$ (the **requirements**) be the desired properties of the world; $S$ (the **specification**) the required behaviour of the machine at its interface with the world — its inputs and outputs; and $W$ (the **domain knowledge**, or domain assumptions) the facts and assumptions about the world that hold whatever the machine does. The specification is **adequate** if
$$
W \wedge S \;\vdash\; R ,
$$ {#eq-wsr}
that is, in every situation where the domain assumptions hold and the machine meets its specification, the requirements are met.
:::

The definition explains a familiar experience: the software met its specification and the system still failed. If the domain assumption $W$ is false, then [[#eq-wsr]] promises nothing. The point is not that the reasoning was wrong but that one of its premises was about the world, where engineers cannot simply decide what is true.

::: example A domain assumption that failed {#ex-warsaw}
On 14 September 1993 an Airbus A320 landed at Warsaw in heavy rain with a strong crosswind and ran off the end of the runway; two people died. The requirement was $R$: *reverse thrust and spoilers are enabled if and only if the aircraft is on the ground* (deploying them in the air is dangerous). Write $g$ for "on the ground", $w$ for "both main landing gears report weight on wheels", $s$ for "the wheels are spinning above a threshold speed" and $e$ for "braking systems enabled". Show that the specification $S: e \leftrightarrow (w \vee s)$ is adequate under the domain assumption $W: g \leftrightarrow (w \vee s)$, and explain what happened.
::: solution
We must show that $\bigl(g \leftrightarrow (w \vee s)\bigr) \wedge \bigl(e \leftrightarrow (w \vee s)\bigr) \to (g \leftrightarrow e)$ is a tautology. If both conjuncts hold, $g$ and $e$ each have the same truth value as $w \vee s$, hence the same truth value as each other. (The figure below checks all 16 rows.) So the machine's design was correct relative to $W$.

But $W$ was false that day. The aircraft touched down on one main gear first, because of the crosswind, so $w$ was false; and on the flooded runway the wheels aquaplaned instead of spinning up, so $s$ was false. The aircraft was on the ground ($g$ true) while $w \vee s$ was false, so the machine correctly, by its specification, kept the brakes disabled for several seconds. The investigation found several contributing factors, including the crew's approach speed and wind information, but the case is the standard illustration of the formula: the logic was correct, and the assumption about the world was not. The fix is in $W$ and $S$ together — what sensor evidence counts as "on the ground", and how long the machine may wait.
:::
:::

::: widget truthtable
formula: ((g <-> (w | s)) & (e <-> (w | s))) -> (g <-> e)
caption: The adequacy argument of [[#ex-warsaw]]: $W \wedge S \to R$ with $g$ = on the ground, $w$ = weight on both gears, $s$ = wheels spinning, $e$ = brakes enabled. The last column is true in every row, so the implication is a tautology. Now look at the rows where $g$ is true and $w$ and $s$ are false: there $W$ is false, the premise fails, and the requirement $g \leftrightarrow e$ is false too. That is the Warsaw landing.
:::

The lesson generalises: a requirements document should record its domain assumptions explicitly ("trains do not exceed 200 km/h on this line", "users have a working e-mail address", "the clock never runs backwards"), so that they can be reviewed by people who know the domain and monitored in operation.

## Eliciting requirements

Requirements are not lying about waiting to be collected; they are discovered, negotiated and sometimes invented. **Elicitation** uses several complementary techniques. **Interviews** with stakeholders, open (exploring) or structured (with prepared questions). **Observation** of people doing the work the system will support — ethnographic studies often reveal that the documented procedure is not what people actually do. **Workshops** bring conflicting stakeholders together to negotiate. **Scenarios** walk through a concrete episode step by step. **Prototypes**, from paper sketches to clickable mock-ups ([[hci]]), let users react to something concrete, which is far easier than describing what you want in the abstract.

Elicitation is hard for reasons that are not technical. Much domain knowledge is **tacit**: an experienced nurse knows which alarms to ignore and cannot easily say how. Stakeholders' needs **conflict**: the finance department wants every expense approved by two managers, staff want reimbursement in a day. People describe solutions rather than problems ("we need a dropdown menu") and the analyst must ask what the solution is for. And the act of building the system changes the requirements, because users who see it working discover what they really need.

::: warning "The customer knows what they want"
It is tempting to treat requirements as a list the customer hands over, so that any later change is the customer's fault. Experience says otherwise: the requirements of any system that people use will change, because the people learn, the business changes and the system itself changes their work. Treat requirements as a model to be validated and revised, budget for change, and prefer processes ([[software-engineering/software-process]]) that expose working software to users early. The opposite mistake is **gold plating**: adding features nobody asked for because they seem useful. Every feature has a cost in testing and maintenance forever; a requirement should trace back to a stakeholder need.
:::

## Writing requirements down

### Structured natural language

Most requirements are written in natural language, which is expressive and universally readable — and ambiguous. Good practice constrains it. Each requirement is a single sentence, uses "shall" for mandatory behaviour, has an identifier, and is **verifiable**: there is a finite test or inspection that would show whether it holds.

::: definition Verifiable requirement {#def-verifiable}
A requirement is **verifiable** if there is an objective, finite procedure — a test, a measurement, an inspection or an analysis — whose outcome determines whether a system satisfies it. Words such as *fast*, *user-friendly*, *robust*, *flexible*, *as appropriate*, *etc.* and *minimise* without a measure make a requirement unverifiable.
:::

Non-functional requirements are the usual offenders, and the remedy is to make them measurable: name the measure, the target value and the conditions under which it must hold.

| vague | verifiable |
|---|---|
| Search shall be fast. | 95% of searches shall return results within 300 ms with 200 concurrent users on the reference hardware. |
| The system shall be reliable. | The booking service shall be available 99.9% of each calendar month, excluding announced maintenance. |
| The interface shall be easy to use. | After a 10-minute introduction, 9 of 10 first-time users from the target group shall complete a booking without help. |
| The system shall be secure. | Passwords shall be stored only as salted hashes using a memory-hard function ([[security/authentication]]). |

A widely used discipline for functional requirements is **EARS**, the Easy Approach to Requirements Syntax (Mavin and colleagues at Rolls-Royce, 2009). It offers five sentence patterns, each with a fixed order of clauses:

- *Ubiquitous*: "The ⟨system⟩ shall ⟨response⟩." — The kiosk shall display prices in pounds sterling.
- *Event-driven*: "When ⟨trigger⟩, the ⟨system⟩ shall ⟨response⟩." — When a card is inserted, the kiosk shall request the PIN.
- *State-driven*: "While ⟨state⟩, the ⟨system⟩ shall ⟨response⟩." — While the account is locked, the system shall reject every login attempt.
- *Unwanted behaviour*: "If ⟨condition⟩, then the ⟨system⟩ shall ⟨response⟩." — If three consecutive login attempts within 15 minutes fail, then the system shall lock the account for 30 minutes.
- *Optional feature*: "Where ⟨feature is included⟩, the ⟨system⟩ shall ⟨response⟩." — Where two-factor authentication is enabled, the system shall request a one-time code after the password.

The patterns do not remove ambiguity by magic, but they force the writer to say what triggers a behaviour and in which state, which is where most omissions hide.

::: quiz
Which of these requirements is verifiable as written?
- [ ] The system shall respond quickly to user input.
- [ ] The system shall support a large number of users.
- [x] When the user submits the form, the system shall display a confirmation within 2 seconds in 99% of cases under the reference load.
- [ ] The system shall be as reliable as possible.
::: solution
Only the third names a trigger, a response, a measure (time to confirmation), a target (2 seconds, 99%) and a condition (the reference load), so a test can decide it. "Quickly", "a large number" and "as reliable as possible" give no threshold; any system could be argued to satisfy or violate them.
:::
:::

### Use cases

A **use case** (Ivar Jacobson, 1987; developed by Alistair Cockburn in *Writing Effective Use Cases*, 2001) describes how an **actor** — a person or another system — uses the system to achieve a goal. It consists of a **main success scenario**, a numbered sequence of steps in which everything goes right, and **extensions**, which say what happens when a step goes differently. Writing the extensions is where the real requirements are found.

::: example A use case for withdrawing cash {#ex-use-case}
Write the main success scenario and the extensions for a customer withdrawing cash from a bank's cash machine.
::: solution
**Use case:** Withdraw cash. **Primary actor:** account holder. **Other actors:** the bank's account system. **Precondition:** the machine is in service. **Success guarantee:** the customer has the cash and the card, and the account is debited by exactly the amount dispensed.

*Main success scenario.*

1. The customer inserts a card.
2. The machine reads the card and asks for the PIN.
3. The customer enters the PIN; the bank validates it.
4. The customer chooses an amount.
5. The bank authorises the withdrawal and places a hold on the amount.
6. The machine returns the card, then dispenses the cash.
7. The machine confirms to the bank that the cash was taken; the bank debits the account.

*Extensions.*

- 2a. The card cannot be read: the machine returns it and shows a message.
- 3a. The PIN is wrong: the machine asks again; after the third wrong PIN it retains the card.
- 4a. The amount is not a multiple of the smallest note: the machine asks for another amount.
- 5a. Insufficient funds: the machine offers a smaller amount or returns the card.
- 5b. The bank does not respond: the machine returns the card and dispenses nothing.
- 6a. The cash is not taken within 30 seconds: the machine retracts it and tells the bank to release the hold.
- \*a. Power fails at any point after step 5: on restart the machine reports to the bank whether cash was dispensed.

Notice what the extensions forced us to decide. Returning the card *before* the cash (step 6) is a deliberate requirement: customers forget whatever comes second, and a forgotten card is worse than forgotten cash. Extensions 6a and \*a connect to the success guarantee — the account must be debited by exactly what was dispensed, even when things fail midway — which is a transactional requirement of the kind studied in [[databases/transactions]] and [[distributed-systems]].
:::
:::

### User stories and acceptance criteria

Agile teams usually record requirements as **user stories**, short statements in the users' terms, conventionally in the form popularised at the British company Connextra around 2001:

> As a ⟨role⟩, I want ⟨goal⟩, so that ⟨benefit⟩.

"As an account holder, I want my account locked after repeated failed logins, so that someone guessing my password cannot get in." A story is deliberately incomplete: Ron Jeffries described it as a *card* (the sentence), a *conversation* (the discussion that fills in details) and a *confirmation* (the acceptance criteria that say when it is done). Bill Wake's mnemonic **INVEST** (2003) lists the qualities of a good story: Independent, Negotiable, Valuable, Estimable, Small and Testable.

The confirmation is where precision enters. Acceptance criteria are often written as **scenarios** in the *Given–When–Then* form of behaviour-driven development (Dan North, 2006): *given* a starting state, *when* an event happens, *then* an outcome is observed. Written that way they translate almost line for line into automated tests — the requirement becomes **executable**.

::: example Executable acceptance criteria {#ex-acceptance}
The team resolves the questions of the introduction: three *consecutive* failures, all within 15 minutes, lock the account for 30 minutes; a successful login resets the count. Write the acceptance criteria as automated tests, and an implementation that passes them.
::: solution
The implementation keeps the times of recent consecutive failures. To make the time-dependent behaviour testable without waiting, the clock is a parameter (a technique we return to in [[software-engineering/testing]]):

```python
LIMIT = 3                 # consecutive failures that lock the account
WINDOW = 15 * 60          # ... if they all fall within 15 minutes (seconds)
LOCK_TIME = 30 * 60       # how long the account stays locked (seconds)

class Account:
    def __init__(self, password, clock):
        self._password = password   # a real system stores a salted hash
        self._clock = clock         # a function returning the time in seconds
        self._failures = []         # times of consecutive failed attempts
        self._locked_until = None

    def locked(self):
        return self._locked_until is not None and self._clock() < self._locked_until

    def login(self, attempt):
        if self.locked():
            return "locked"
        now = self._clock()
        if attempt == self._password:
            self._failures = []
            return "ok"
        self._failures = [t for t in self._failures if now - t < WINDOW] + [now]
        if len(self._failures) >= LIMIT:
            self._locked_until = now + LOCK_TIME
            self._failures = []
            return "locked"
        return "wrong"
```

The tests use pytest, in which a test is any function whose name starts with `test_` and checks with plain `assert` ([[programming-1/testing-debugging]]). The comments carry the Given–When–Then structure:

```python
from lockout import Account

class FakeClock:
    """A clock the test controls, so that no test has to wait."""
    def __init__(self):
        self.now = 0.0
    def __call__(self):
        return self.now
    def advance(self, minutes):
        self.now += 60 * minutes

def make():
    clock = FakeClock()
    return Account("correct horse", clock), clock

def test_three_failures_within_window_lock_the_account():
    # Given an account with no recent failures
    acct, clock = make()
    # When the wrong password is entered three times in ten minutes
    for _ in range(3):
        result = acct.login("guess")
        clock.advance(5)
    # Then the third attempt reports the account locked
    assert result == "locked"
    # And even the correct password is refused while it is locked
    assert acct.login("correct horse") == "locked"

def test_failures_spread_over_more_than_the_window_do_not_lock():
    acct, clock = make()
    for _ in range(3):
        assert acct.login("guess") == "wrong"
        clock.advance(10)          # failures at 0, 10 and 20 minutes

def test_lock_expires_after_thirty_minutes():
    acct, clock = make()
    for _ in range(3):
        acct.login("guess")
    clock.advance(30)
    assert acct.login("correct horse") == "ok"
```

```console
$ pytest -v test_lockout.py
...
test_lockout.py::test_three_failures_within_window_lock_the_account PASSED [ 33%]
test_lockout.py::test_failures_spread_over_more_than_the_window_do_not_lock PASSED [ 66%]
test_lockout.py::test_lock_expires_after_thirty_minutes PASSED           [100%]

============================== 3 passed in 0.16s ===============================
```

The test names read as requirements, and the second test pins down an interpretation that the English left open: the window *slides* (at minute 20 the failure at minute 0 no longer counts), rather than being a fixed 15-minute bucket. If the stakeholders meant something else, the disagreement is now visible in one line of a test rather than buried in an implementation. Stories still need non-functional criteria: here a security reviewer would ask that the lockout be combined with rate limiting, because a fixed lockout lets an attacker lock out any account whose name is known ([[security/authentication]]).
:::
:::

::: widget graph
nodes: Active@0,1; OneFailure@1,0; TwoFailures@2,0; Locked@3,1
edges: Active>OneFailure; OneFailure>TwoFailures; TwoFailures>Locked; OneFailure>Active; TwoFailures>Active; Locked>Active
algorithm: bfs
start: Locked
caption: The lockout requirement as a state machine, simplified by ignoring the 15-minute window: a failure moves right, a success returns to `Active`, and the 30-minute timer leads from `Locked` back to `Active`. Run breadth-first search from `Locked`: every state is reachable from it, so the account can never become locked for ever. State models like this make requirements such as "the user can always recover" checkable by graph search; [[software-engineering/verification]] automates the idea as model checking.
:::

## Checking requirements for completeness and consistency

Many requirements are rules that choose an action from a combination of conditions: discounts, fees, eligibility, access permissions. Written as prose, such rules often leave combinations uncovered or cover some twice with different results. Written as a **decision table**, they can be checked mechanically.

::: definition Decision table, completeness and consistency {#def-decision-table}
Let $c_1, \dots, c_k$ be Boolean **conditions**. A **case** is an assignment of true or false to every condition; there are $2^k$ cases. A **rule** is a pair (pattern, action), where the pattern assigns values to some of the conditions and leaves the rest as "don't care"; it **matches** a case if the case agrees with every value in the pattern. A **decision table** is a list of rules. It is **complete** if every case is matched by at least one rule, and **consistent** if no case is matched by two rules with different actions.
:::

::: proposition Counting the cases a rule covers {#prop-rule-cover}
A rule whose pattern specifies $j$ of the $k$ conditions matches exactly $2^{k-j}$ cases. Two rules match a common case if and only if their patterns agree on every condition that both specify.
:::

::: proof
A matching case is determined by the values of the $k - j$ unspecified conditions, each of which can be chosen freely, so there are $2^{k-j}$ of them. For the second claim: if the patterns disagree on some condition that both specify, no case can agree with both, so none matches both. If they agree on every common condition, build a case taking the specified value for each condition specified by either rule (there is no clash) and any value elsewhere; it matches both rules.
:::

The proposition gives a quick hand check — if the rules' coverage counts $2^{k-j}$ sum to less than $2^k$, the table cannot be complete — and a quadratic check for inconsistency: compare every pair of rules with different actions. For small $k$ it is simplest to enumerate all $2^k$ cases.

::: example Delivery charges {#ex-decision-table}
The product manager writes: "Standard delivery is free for members and for orders over £50. Express delivery costs £9.99 for non-members and £4.99 on orders over £50." Turn this into a decision table and check it.
::: solution
The conditions are `member`, `over_50` and `express`, so there are $2^3 = 8$ cases. Each sentence fragment becomes a rule, and a short program enumerates the cases:

```python
from itertools import product

CONDITIONS = ["member", "over_50", "express"]
# Each rule: (pattern, action). A pattern maps a condition to True or False;
# conditions it does not mention are "don't care".
RULES = [
    ({"express": False, "member": True},  "free"),
    ({"express": False, "over_50": True}, "free"),
    ({"express": True,  "member": False}, "9.99"),
    ({"express": True,  "over_50": True}, "4.99"),
]

def matches(pattern, case):
    return all(case[c] == v for c, v in pattern.items())

def check(conditions, rules):
    """Report every combination of conditions with no rule (a gap) or with
    rules that prescribe different actions (a conflict)."""
    for values in product([False, True], repeat=len(conditions)):
        case = dict(zip(conditions, values))
        actions = {a for p, a in rules if matches(p, case)}
        if not actions:
            print("gap:     ", case)
        elif len(actions) > 1:
            print("conflict:", case, sorted(actions))

check(CONDITIONS, RULES)
```

```console
$ python3 decision_table.py
gap:      {'member': False, 'over_50': False, 'express': False}
conflict: {'member': False, 'over_50': True, 'express': True} ['4.99', '9.99']
gap:      {'member': True, 'over_50': False, 'express': True}
```

Three questions for the product manager, none of which a careful reader of the prose would necessarily notice: what does standard delivery cost a non-member on a small order (presumably a standard fee nobody mentioned); what does express cost a member on a small order (the text gives no price); and does a non-member with a large order pay £9.99 or £4.99? By [[#prop-rule-cover]] each rule specifies 2 of 3 conditions and covers $2^1 = 2$ cases, so the four rules cover at most 8 case-slots — the overlap on one case explains why two cases are left over. Overlap between rules with the *same* action (members with large standard orders) is harmless.
:::
:::

For larger tables, enumerating $2^k$ cases becomes impractical, and the questions "is there a case matching no rule?" and "is there a case matching two conflicting rules?" become satisfiability problems — which SAT and SMT solvers answer routinely for hundreds of conditions ([[software-engineering/verification]]). The same idea, applied to firewall rules and access-control policies, finds real security holes.

## Validating and managing requirements

**Validation** asks whether the requirements describe what the stakeholders actually need; **verification**, later, asks whether the system meets them ("are we building the right product?" versus "are we building the product right?", in Boehm's phrasing). Validation techniques include **reviews** in which stakeholders and developers read the requirements systematically against a checklist (verifiable? consistent? complete? feasible? traceable?), **prototyping**, and **test-case generation**: if you cannot write a test for a requirement, it is not yet a requirement.

A **requirement change** is the rule, not the exception, so requirements are managed like code: each has an identifier, an owner, a status, a priority and a history. Two tools stand out.

**Prioritisation.** Not everything can be built at once. **MoSCoW** (from the DSDM method, 1990s) sorts requirements into *Must have*, *Should have*, *Could have* and *Won't have this time*. The **Kano model** (Noriaki Kano, 1984) distinguishes *basic* expectations (their absence causes dissatisfaction, their presence goes unnoticed), *performance* attributes (more is better) and *delighters* (unexpected features that please). Agile teams order the product backlog by value and cost, and revisit the order every iteration.

::: definition Traceability {#def-traceability}
**Traceability** is the ability to follow the life of a requirement in both directions: back to its source (a stakeholder, a regulation, a higher-level goal) and forward to the design elements, code and tests that realise and check it. A **traceability matrix** records the links. **Forward completeness** holds if every requirement is linked to at least one test; **backward completeness** if every test (and every piece of design) is linked to at least one requirement.
:::

::: example Checking traceability {#ex-trace}
Four requirements for the lockout feature and four tests are linked as below. Find the gaps.
::: solution
```python
requirements = {
    "R1": "Lock the account after 3 failures within 15 minutes",
    "R2": "Unlock automatically after 30 minutes",
    "R3": "Notify the user by e-mail when the account is locked",
    "R4": "Log every failed attempt with its time",
}
tests = {   # test name -> requirements it checks (e.g. from a marker in the test file)
    "test_three_failures_within_window_lock_the_account": {"R1"},
    "test_failures_spread_over_more_than_the_window_do_not_lock": {"R1"},
    "test_lock_expires_after_thirty_minutes": {"R2"},
    "test_password_is_case_sensitive": set(),
}
covered = set().union(*tests.values())
print("untested requirements:", sorted(set(requirements) - covered))
print("tests tracing to no requirement:", [t for t, rs in tests.items() if not rs])
print("unknown requirement ids:", sorted(covered - set(requirements)))
```

```console
$ python3 trace.py
untested requirements: ['R3', 'R4']
tests tracing to no requirement: ['test_password_is_case_sensitive']
unknown requirement ids: []
```

R3 and R4 have no tests: forward completeness fails, and either tests must be written or the requirements are not being delivered. The case-sensitivity test checks behaviour nobody has written down: either a requirement is missing (password comparison is case-sensitive — surely intended) or the test checks something nobody needs. In safety-critical industries, standards such as DO-178C for airborne software require complete bidirectional traceability as evidence for certification; in most other projects a lighter version — test names or markers that cite story identifiers — gives most of the benefit.
:::
:::

How much does it matter to get requirements right *early*? A claim repeated in many textbooks, and often traced to Boehm's *Software Engineering Economics* (1981), is that a defect costs 10 to 100 times more to fix after delivery than during requirements. Boehm's data came from large plan-driven projects of the 1970s, where a late change meant revising many documents. Later evidence is mixed: Menzies, Nichols, Shull and Layman ("Are delayed issues harder to resolve?", *Empirical Software Engineering*, 2017) examined 171 projects using a disciplined process and found no general increase in the effort to fix issues found later. The careful reading is that the cost of late discovery depends on the process and on the kind of error — a misunderstood core business rule is expensive to undo in any process, a typo in a label is not — so treat "100×" as a hypothesis about some projects, not a constant of nature.

::: history
Douglas Ross and Kenneth Schoman's "Structured analysis for requirements definition" (*IEEE Transactions on Software Engineering*, 1977) was an early call to treat requirements as a discipline of its own. The IEEE's *Recommended Practice for Software Requirements Specifications* (IEEE 830, first issued in 1984 and revised in 1998) set out the qualities of a good specification — correct, unambiguous, complete, consistent, ranked, verifiable, modifiable, traceable — and was superseded by ISO/IEC/IEEE 29148 (2011, revised 2018). Ivar Jacobson introduced use cases at OOPSLA in 1987. Pamela Zave and Michael Jackson's 1997 paper separated world from machine. Kent Beck's Extreme Programming (1999) made the user story the unit of planning, Mike Cohn's *User Stories Applied* (2004) codified it, and Alistair Mavin's EARS patterns (2009) came from writing requirements for jet-engine control software.
:::

## Where this leads

Requirements feed every later activity. Quality requirements drive the architecture ([[software-engineering/software-architecture]]); acceptance criteria become system and acceptance tests ([[software-engineering/testing]]); formal requirements become the properties that model checkers verify ([[software-engineering/verification]]); and the people whose needs requirements describe are studied systematically in user-centred design ([[hci/user-centred-design]]). Requirements about personal data and accessibility are often legal obligations, discussed in [[software-engineering/professional-ethics]].

::: summary
- A **requirement** states a property stakeholders need; distinguish functional requirements, non-functional (quality) requirements and constraints ([[#def-requirement]]), and keep *what* separate from *how*.
- Requirements live in the world, specifications at the machine's interface: the specification is adequate if $W \wedge S \vdash R$ ([[#def-wsr]]). Write domain assumptions down; when they fail, correct software can cause a failed system.
- Elicit with interviews, observation, workshops, scenarios and prototypes; expect tacit knowledge, conflict and change.
- Make every requirement **verifiable** ([[#def-verifiable]]): measures, targets and conditions for qualities; EARS patterns for behaviour.
- **Use cases** find requirements in their extensions; **user stories** need acceptance criteria, ideally executable Given–When–Then tests.
- Rule-based requirements belong in **decision tables**, which can be checked mechanically for gaps and conflicts ([[#def-decision-table]], [[#prop-rule-cover]]).
- **Traceability** links requirements to sources and tests in both directions ([[#def-traceability]]). The "100× cost of late fixes" is a contested claim, not a law.
:::

## Exercises

::: exercise Classify {level=1}
Classify each as a functional requirement, a non-functional requirement or a constraint: (a) The system shall export reports as PDF. (b) The system shall run on the hospital's existing Linux servers. (c) 99% of page loads shall complete within 1 second. (d) When a payment fails, the system shall e-mail the customer. (e) The system shall comply with the EU General Data Protection Regulation. (f) A trained clerk shall be able to register a new patient in under 3 minutes.
::: solution
(a) Functional: a behaviour. (b) Constraint: it restricts the solution's platform. (c) Non-functional (performance). (d) Functional (event-driven, in EARS form). (e) Constraint (regulatory), from which many functional and non-functional requirements will be derived — rights of access and erasure, for instance. (f) Non-functional (usability), and verifiable as written: it names the user group, the task, the measure and the target.
:::
:::

::: exercise How many cases? {level=1 check="48"}
An insurance-quote rule depends on four yes/no conditions and the customer's age band, which is one of three values. How many distinct cases must a complete decision table cover? (Enter the number.)
::: solution
Each Boolean condition doubles the number of cases and the three-valued one triples it: $2^4 \times 3 = 48$.
:::
:::

::: exercise Rewrite in EARS {level=1}
Rewrite each requirement in an EARS pattern, making it verifiable and naming any decisions you had to make: (a) "The heater should not overheat." (b) "The app should work offline." (c) "Users get a warning before their session ends."
::: solution
(a) *Unwanted behaviour*: "If the water temperature exceeds 85 °C, then the controller shall switch off the heating element within 1 second." Decisions: the threshold, the response, and the response time. (b) *State-driven*: "While no network connection is available, the app shall let the user view and edit previously downloaded notes, and shall upload the edits within 60 seconds of the connection returning." Decision: *which* features work offline — "work offline" usually means some, not all. (c) *Event-driven*: "When 2 minutes of an idle session remain, the system shall display a warning offering to extend the session." Decisions: how long before the end, and what the user can do about it (an accessibility requirement — [[hci/accessibility-ethics]] — since some users need more time).
:::
:::

::: exercise Coverage of a rule {level=2 check="8"}
A decision table has $k = 5$ Boolean conditions. How many cases does a rule match whose pattern specifies exactly 2 conditions? (Enter the number.)
::: solution
By [[#prop-rule-cover]], $2^{5 - 2} = 8$ cases. So, for example, four such rules match at most 32 case-slots, which is exactly $2^5$; they form a complete table only if they never overlap.
:::
:::

::: exercise A story that fails INVEST {level=2}
Criticise this user story with the INVEST criteria and rewrite it: "As a user, I want the system to be redesigned with a modern database and better performance and a mobile app."
::: solution
It is not *Independent* (three unrelated pieces of work are bundled), not *Small* (each is a project), hardly *Valuable* as stated (which user benefits, and how?), not *Estimable* (nothing is specified enough to estimate), not *Testable* ("modern" and "better" have no criteria), and "a modern database" is a design decision, not a need. Split it into stories with a real role and benefit, for instance: "As a field engineer, I want to look up a customer's service history on my phone, so that I can diagnose faults on site," with acceptance criteria such as "Given a customer with 50 past visits, when I open their history on a mid-range phone over 4G, then the 10 most recent visits appear within 2 seconds." Performance becomes a measurable criterion; the database choice is left to the developers.
:::
:::

::: exercise World, machine and assumptions {level=2}
A level crossing controller lowers the barriers when sensors detect an approaching train. The requirement $R$ is "no car is on the crossing when a train passes". Write a specification $S$ and the domain assumptions $W$ needed for $W \wedge S \vdash R$. Which assumptions are most likely to fail?
::: solution
$S$: when the approach sensor (placed at least distance $d$ before the crossing) detects a train, the controller shall start the warning lights immediately and lower the barriers 8 seconds later; the barriers shall stay down until the exit sensor detects that the train has passed. $W$ includes: (1) every train is detected by the approach sensor; (2) no train travels faster than $v_{\max}$, so with $d \ge v_{\max} \cdot t$ (where $t$ covers the warning and lowering time) the barriers are down before it arrives; (3) the barriers, once down, physically prevent cars from entering; (4) drivers do not enter the crossing once the lights flash, and cars already on it can leave within 8 seconds; (5) the exit sensor detects the end of the train. Assumptions about human behaviour — (4) — and about physical devices — (1), (3) — are the most fragile: drivers do zigzag around half-barriers, and sensors fail. Real designs add obstacle detection on the crossing (turning an assumption into a monitored condition) and fail safe: any sensor fault lowers the barriers.
:::
:::

::: exercise A table with multi-valued conditions {level=3}
Generalise the checker of [[#ex-decision-table]] to conditions with any finite set of values (given as a dictionary from condition name to list of values), and use it to check these parking-fee rules: vehicle type ∈ {car, motorbike, van}, time ∈ {day, night}, resident ∈ {yes, no}. Rules: residents park free; motorbikes park free at night; cars pay £2 by day; vans pay £5; non-residents pay £1 at night.
::: solution
```python
from itertools import product

def check(conditions, rules):
    """conditions: name -> list of values; rules: list of (pattern, action)."""
    names = list(conditions)
    for values in product(*(conditions[n] for n in names)):
        case = dict(zip(names, values))
        actions = {a for p, a in rules if all(case[c] == v for c, v in p.items())}
        if not actions:
            print("gap:     ", case)
        elif len(actions) > 1:
            print("conflict:", case, sorted(actions))

conditions = {"vehicle": ["car", "motorbike", "van"],
              "time": ["day", "night"], "resident": ["yes", "no"]}
rules = [({"resident": "yes"}, "free"),
         ({"vehicle": "motorbike", "time": "night"}, "free"),
         ({"vehicle": "car", "time": "day"}, "2"),
         ({"vehicle": "van"}, "5"),
         ({"resident": "no", "time": "night"}, "1")]
check(conditions, rules)
```

```console
$ python3 parking.py
conflict: {'vehicle': 'car', 'time': 'day', 'resident': 'yes'} ['2', 'free']
gap:      {'vehicle': 'motorbike', 'time': 'day', 'resident': 'no'}
conflict: {'vehicle': 'motorbike', 'time': 'night', 'resident': 'no'} ['1', 'free']
conflict: {'vehicle': 'van', 'time': 'day', 'resident': 'yes'} ['5', 'free']
conflict: {'vehicle': 'van', 'time': 'night', 'resident': 'yes'} ['5', 'free']
conflict: {'vehicle': 'van', 'time': 'night', 'resident': 'no'} ['1', '5']
```

There are $3 \times 2 \times 2 = 12$ cases. Five conflicts and one gap: do residents' cars and vans really park free, or does "residents park free" mean residents' *cars*? Which wins for a non-resident's motorbike at night? What does a non-resident's motorbike pay by day? Prose rules like these are often meant to be read in order, the first matching rule winning; if that is the intention, it must be stated as a requirement, and the checker changed to report only gaps and rules that can never fire.
:::
:::

::: exercise Proving the checker right {level=3}
Prove that the function `check` of [[#ex-decision-table]] prints a line for a case if and only if that case shows the table to be incomplete or inconsistent, and that it prints nothing exactly when the table is complete and consistent ([[#def-decision-table]]). What is its running time for $k$ conditions and $r$ rules, and why does [[#prop-rule-cover]] give a faster test for inconsistency when $r$ is small and $k$ large?
::: solution
`product([False, True], repeat=k)` yields each of the $2^k$ assignments exactly once, and `case` is that assignment as a dictionary, so the loop visits every case exactly once. For a case, `matches(p, case)` is true exactly when the case agrees with every value in pattern `p`, which is the definition of matching; so `actions` is the set of actions of the matching rules. The case is a witness of incompleteness iff no rule matches, iff `actions` is empty, and then "gap" is printed; it witnesses inconsistency iff two matching rules have different actions, iff the set has at least two elements, and then "conflict" is printed. Otherwise nothing is printed for it. Hence nothing at all is printed iff no case is a witness, iff the table is complete and consistent.

Each case costs $O(r k)$ to match against all rules, so the time is $O(2^k r k)$. By [[#prop-rule-cover]], two rules share a case iff their patterns agree on their common conditions, which takes $O(k)$ to test; checking all pairs with different actions finds every inconsistency in $O(r^2 k)$ time, independent of $2^k$. Completeness has no such shortcut in general: deciding whether the patterns cover every case is the complement of a satisfiability question ("is there a case violating every rule's pattern?"), so finding an uncovered case is $\mathsf{NP}$-complete and deciding completeness is $\mathsf{coNP}$-complete ([[complexity]]) — but SAT solvers handle typical instances well.
:::
:::
