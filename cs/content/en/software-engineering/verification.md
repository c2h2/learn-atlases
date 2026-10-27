On 4 June 1996, about 37 seconds after lift-off, the first Ariane 5 rocket veered off course and broke up. The inquiry board, chaired by Jacques-Louis Lions, traced the loss to a few lines of code in the inertial reference system. A 64-bit floating-point value related to the rocket's horizontal velocity was converted to a 16-bit signed integer; the value exceeded 32,767, the conversion raised an exception, and the exception was not handled, so the inertial reference computer shut down. The backup computer, running the same software, had failed the same way a fraction of a second earlier. The main computer then read diagnostic data as if it were flight data and commanded a full deflection of the nozzles. The software had been reused from Ariane 4, whose trajectory kept the value small; the conversion had been deliberately left unprotected on the basis of an analysis that was correct for Ariane 4. Worse, the function involved served no purpose after lift-off. No test had used the Ariane 5 trajectory.

Testing samples behaviour; the Ariane failure lay in inputs nobody sampled. This chapter is about techniques that reason about *all* behaviours, or that give quantitative confidence where testing cannot: the vocabulary of **dependability**, the limits of what testing can show about very reliable systems, **static analysis** and its fundamental limits, **formal specification** and **design by contract**, **model checking** of concurrent designs, and the standards and practices of **safety-critical** software. Logic for reasoning about programs — Hoare triples, invariants — was developed in [[program-design/abstraction-specifications]]; here we apply such reasoning with tools.

## Dependability

::: definition Fault, error, failure {#def-fault-error-failure}
A **failure** is an event in which the service a system delivers deviates from correct service — from what its specification requires. An **error** is the part of the system's state that may lead to a failure. A **fault** is the adjudged or hypothesised cause of an error — a defect in the code, a hardware fault, a wrong operator action. A fault is **active** when it produces an error, and an error **propagates** until it either is detected and handled, or causes a failure.
:::

This terminology, from Avižienis, Laprie, Randell and Landwehr's "Basic concepts and taxonomy of dependable and secure computing" (*IEEE Transactions on Dependable and Secure Computing*, 2004), separates the chain fault → error → failure, and each link is a place to intervene. **Fault prevention** (good design, careful languages), **fault removal** (testing, review, verification) and **fault tolerance** (detecting errors and recovering before they become failures — redundancy, exception handling, restart) are complementary. At Ariane, the fault was the unprotected conversion, the error was the overflowed value, and it became a failure because the error-handling design — shut down the computer on any exception, assuming a hardware fault — was wrong for a software fault that affected both computers equally.

**Reliability** is the probability of failure-free operation for a given time in a given environment; **availability** the fraction of time the system is ready for use; **safety** the absence of catastrophic consequences for people and the environment; **security** the protection of confidentiality, integrity and availability against deliberate attack ([[security/security-principles]]). They differ: a train that never leaves the station is safe but not available.

::: proposition Steady-state availability {#prop-availability-mc}
Model a repairable system as a two-state Markov chain observed once per hour: when up, it fails in the next hour with probability $p$; when down, it is repaired in the next hour with probability $q$ (with $0 < p, q \le 1$). The long-run fraction of time it is up is
$$
A = \frac{q}{p + q} = \frac{\mathrm{MTTF}}{\mathrm{MTTF} + \mathrm{MTTR}},
$$
where $\mathrm{MTTF} = 1/p$ and $\mathrm{MTTR} = 1/q$ are the mean times to failure and to repair, in hours.
:::

::: proof
The chain is irreducible and aperiodic when $p, q > 0$ and not both equal to 1 (the case $p = q = 1$, alternating every hour, has time-average $1/2$, which agrees with the formula). Its stationary distribution $(\pi_u, \pi_d)$ satisfies the balance equation $\pi_u p = \pi_d q$ — the flow from up to down equals the flow from down to up — and $\pi_u + \pi_d = 1$, giving $\pi_u = q/(p+q)$; by the ergodic theorem for Markov chains ([Maths Atlas: Markov chains](/learn/maths/lesson.php?c=probability&l=markov-chains)) this is the long-run fraction of hours spent up. The time to failure from the up state is geometric with mean $1/p$, and the time to repair geometric with mean $1/q$; substituting $p = 1/\mathrm{MTTF}$ and $q = 1/\mathrm{MTTR}$ gives the second form.
:::

::: widget markov
matrix: 0.999, 0.001; 0.25, 0.75
states: Up; Down
start: 0
steps: 50
caption: The chain of [[#prop-availability-mc]] with $p = 0.001$ per hour ($\mathrm{MTTF} = 1000$ h) and $q = 0.25$ per hour ($\mathrm{MTTR} = 4$ h). The stationary distribution gives $A = 0.25/0.251 \approx 0.99602$, as does $1000/1004$. Try halving the repair time (set the Down row to 0.5, 0.5): availability rises to about 0.998, the same gain as doubling the MTTF. Faster recovery is often the cheaper route to availability, one reason why the *time to restore service* is a delivery metric ([[software-engineering/software-process]]).
:::

### What testing cannot show

Suppose we want to show that a flight-control function fails less often than once in $10^9$ hours, a figure of the order required for catastrophic failure conditions in civil aircraft. Testing under realistic conditions ("statistical testing" against an operational profile) can estimate failure rates, but the arithmetic is unforgiving.

::: proposition Testing for ultra-high reliability {#prop-test-infeasible}
Assume failures occur as a Poisson process with constant rate $\lambda$ per hour of operation. If the system runs for $t$ hours of realistic testing without failure, then the claim $\lambda \le \lambda_0$ is supported at confidence level $1 - \alpha$ (in the sense that a system with $\lambda > \lambda_0$ would pass such a test with probability less than $\alpha$) only if
$$
t \ge \frac{\ln(1/\alpha)}{\lambda_0}.
$$
:::

::: proof
Under the model, the number of failures in $t$ hours is Poisson with mean $\lambda t$, so the probability of none is $e^{-\lambda t}$. For a system with rate $\lambda > \lambda_0$ this is less than $e^{-\lambda_0 t}$. We need $e^{-\lambda_0 t} \le \alpha$, that is $\lambda_0 t \ge \ln(1/\alpha)$.
:::

For $\lambda_0 = 10^{-9}$ per hour and 99% confidence, $t \ge \ln 100 / 10^{-9} \approx 4.6 \times 10^{9}$ hours — over 500,000 years of failure-free testing. Ricky Butler and George Finelli made this argument in "The infeasibility of quantifying the reliability of life-critical real-time software" (*IEEE TSE*, 1993). Running many copies in parallel does not escape it in practice, and Bayesian refinements soften the numbers only modestly. The conclusion is not that such software cannot be built, but that its dependability cannot be *demonstrated* by testing alone: the evidence must also come from the way it is built — rigorous process, analysis, proof, architecture — and from experience with similar systems. The model's assumption that failures are random is itself questionable for software, whose faults are deterministic; the randomness lies in which inputs arrive.

Another route to high reliability is **design diversity**: build several versions independently and vote. If versions failed independently, three versions with failure probability $10^{-4}$ each would almost never be outvoted. John Knight and Nancy Leveson tested the independence assumption experimentally ("An experimental evaluation of the assumption of independence in multiversion programming", *IEEE TSE*, 1986): 27 versions of a program written independently from the same specification failed together on the same inputs far more often than independence predicts, and the hypothesis of independence was rejected — people make the same mistakes on the same hard parts of a problem. Diversity helps, but less than multiplying probabilities suggests (the common-cause model of [[software-engineering/software-architecture]] applies).

## Static analysis

**Static analysis** examines a program without running it, to establish properties of all its executions: "no variable is used before assignment", "this index is always in range", "no `None` reaches this addition". Compilers' type checkers are static analysers; so are linters, and tools that prove the absence of run-time errors.

::: definition Sound and complete analysis {#def-sound}
Let $\Phi$ be a property of programs (such as "never divides by zero"). An analysis that answers "yes, the program has $\Phi$" or "possibly not" is **sound** if whenever it says yes, the program really has $\Phi$ (no missed violations, or **false negatives**); it is **complete** if whenever the program has $\Phi$, it says yes (no **false alarms**, or false positives).
:::

::: proposition No analysis is perfect {#prop-rice}
For any non-trivial semantic property $\Phi$ of programs in a Turing-complete language — one that depends only on the program's input–output behaviour and holds for some programs but not others — there is no analysis that always terminates and is both sound and complete for $\Phi$.
:::

::: proof
Such an analysis would decide $\Phi$: answer "has $\Phi$" when it says yes and "lacks $\Phi$" when it says "possibly not" (which, by completeness, it says only for programs lacking $\Phi$). By Rice's theorem ([[theory-of-computation/decidability]]), no algorithm decides a non-trivial semantic property, so no such analysis exists.
:::

Every practical analyser therefore gives something up. **Sound** analysers, used for safety-critical code, may raise false alarms that a person must examine. **Unsound** bug-finders, used in most development, report likely bugs and accept that they will miss some, in return for few false alarms — a tool that cries wolf is ignored. Type checkers such as `mypy` are a pragmatic middle: sound for the fragment of Python they understand, with escape hatches (`Any`, `cast`) where they do not.

::: example A None that slips through {#ex-mypy-none}
A function returns a member's loan limit, or `None` for an unknown member. Show how a type checker finds the place where `None` would cause a run-time failure.
::: solution
```python
def loan_limit(limits: dict[str, int], member: str) -> int | None:
    """The member's loan limit, or None for an unknown member."""
    return limits.get(member)

def can_borrow(limits: dict[str, int], member: str, on_loan: int) -> bool:
    return on_loan < loan_limit(limits, member)
```

```console
$ mypy members.py
members.py:6: error: Unsupported operand types for < ("int" and "None")  [operator]
members.py:6: note: Right operand is of type "int | None"
Found 1 error in 1 file (checked 1 source file)
```

Every test with known members passes; the defect appears only for an unknown member, when Python raises `TypeError` at run time. The checker reasons about *all* inputs: the declared result type `int | None` includes `None`, and `<` is not defined for it. The fix makes the case explicit, and the checker follows the `if` to know that `limit` is an `int` afterwards:

```python
def can_borrow(limits: dict[str, int], member: str, on_loan: int) -> bool:
    limit = loan_limit(limits, member)
    if limit is None:              # the checker now knows limit is an int below
        return False
    return on_loan < limit
```

```console
$ mypy members_fixed.py
Success: no issues found in 1 source file
```

Tony Hoare, who introduced null references in ALGOL W in 1965, later called them his "billion-dollar mistake"; making absence part of the type, as here, is the static-analysis remedy.
:::
:::

### Abstract interpretation

How can an analyser reason about all inputs without trying them? **Abstract interpretation**, formalised by Patrick and Radhia Cousot (POPL 1977), runs the program on *abstract values* that each stand for a set of concrete values — signs, intervals, sets of possible types — using abstract versions of the operations that are guaranteed to over-approximate the concrete ones.

::: proposition Interval arithmetic is sound {#prop-intervals}
Let each variable $x$ of an arithmetic expression built from constants, variables, $+$, $-$ and $\times$ be assigned an interval $[a_x, b_x]$, and compute an interval for the expression by the rules $[a, b] + [c, d] = [a + c,\ b + d]$, $[a, b] - [c, d] = [a - d,\ b - c]$ and $[a, b] \times [c, d] = [\min P, \max P]$ with $P = \{ac, ad, bc, bd\}$. Then for every assignment of values $x \in [a_x, b_x]$, the value of the expression lies in the computed interval.
:::

::: proof
By induction on the expression. A constant $k$ gets $[k, k]$, a variable its own interval: both contain the value. For $e_1 + e_2$ with $u \in [a, b]$ and $v \in [c, d]$ by the induction hypothesis, $a + c \le u + v \le b + d$. For subtraction, $u - v$ is smallest when $u = a$ and $v = d$, and largest when $u = b$ and $v = c$. For multiplication, for fixed $v$ the function $u \mapsto uv$ is linear, so its extremes over $[a, b]$ are at $u = a$ or $u = b$; similarly for $v$; so the extremes of $uv$ over the rectangle are among the four corner products $P$.
:::

The rules are sound but not complete: for $x \in [0, 1]$, the expression $x - x$ gets the interval $[-1, 1]$ although its value is always $0$, because the rules forget that both operands are the same variable. That imprecision is the price of termination and speed, and it is where false alarms come from.

::: example Could this conversion overflow? {#ex-intervals}
A navigation routine computes `64 * v - 3 * drift` and stores the result in a 16-bit signed integer. For the old vehicle, $v \in [0, 400]$ and $\mathit{drift} \in [-50, 50]$; for a new, faster one, $v \in [0, 600]$. (The numbers are illustrative.) Prove the conversion safe or flag it.
::: solution
```python
import ast

def interval(node, env):
    """Smallest interval [lo, hi] that contains every possible value of the
    expression, given intervals for its variables (abstract interpretation)."""
    if isinstance(node, ast.Constant):
        return (node.value, node.value)
    if isinstance(node, ast.Name):
        return env[node.id]
    if isinstance(node, ast.BinOp):
        (a, b), (c, d) = interval(node.left, env), interval(node.right, env)
        if isinstance(node.op, ast.Add):
            return (a + c, b + d)
        if isinstance(node.op, ast.Sub):
            return (a - d, b - c)
        if isinstance(node.op, ast.Mult):
            products = [a * c, a * d, b * c, b * d]
            return (min(products), max(products))
    raise ValueError(f"unsupported: {ast.dump(node)}")

INT16 = (-32768, 32767)

def check_int16(expr, env):
    lo, hi = interval(ast.parse(expr, mode="eval").body, env)
    safe = INT16[0] <= lo and hi <= INT16[1]
    print(f"{expr} in [{lo}, {hi}]:", "safe" if safe else "MAY OVERFLOW int16")

expr = "64 * v - 3 * drift"
check_int16(expr, {"v": (0, 400), "drift": (-50, 50)})     # the old vehicle's envelope
check_int16(expr, {"v": (0, 600), "drift": (-50, 50)})     # a faster vehicle
```

```console
$ python3 intervals.py
64 * v - 3 * drift in [-150, 25750]: safe
64 * v - 3 * drift in [-150, 38550]: MAY OVERFLOW int16
```

For the old envelope, [[#prop-intervals]] *proves* that every value fits in $[-32768, 32767]$: no test could establish that for all inputs. For the new one, the analyser flags the conversion. Here the alarm is real ($v = 600$, $\mathit{drift} = -50$ gives $38{,}550$), though in general an alarm only means "possibly". This is the Ariane lesson: the proof of safety depended on an assumption about the inputs ($v \le 400$), and reuse silently changed the assumption. What happens on overflow is a separate design choice. Python's `struct.pack("<h", 38000)` raises an error, like Ariane's Ada code; `ctypes.c_int16(38000).value` silently wraps to $-27{,}536$, like C. Neither is safe; the safe design checks the range and handles out-of-range values explicitly.
:::
:::

Industrial sound analysers are built this way, with far richer abstract domains. Astrée, developed at the École normale supérieure, was used from 2003 to prove the absence of run-time errors (overflows, divisions by zero, out-of-bounds accesses) in the C code of Airbus fly-by-wire software, with few or no false alarms on that code. Unsound but scalable analysers based on similar ideas are run on every change at large technology companies.

## Specifying behaviour

Static analysis proves *generic* properties — no crashes, no overflows. To prove that a program does what it should, we need a **formal specification** of what it should do: a precise statement in logic or a mathematical notation. Specification languages include **Z** (Jean-Raymond Abrial and others at Oxford, from the late 1970s), **VDM**, the **B method** (Abrial, used for the driverless Paris Métro line 14, opened in 1998), Leslie Lamport's **TLA+** (*Specifying Systems*, 2002) for concurrent and distributed systems, and Daniel Jackson's **Alloy** (2002) for structural models with an automatic analyser. Writing a formal specification is valuable even if nothing is ever proved: it forces ambiguities in the requirements ([[software-engineering/requirements]]) into the open.

At the level of code, **design by contract** — Bertrand Meyer's term, built into his Eiffel language (1986) — attaches to each routine a **precondition** the caller must establish, a **postcondition** the routine guarantees, and to each class an **invariant** every public operation preserves. These are the specifications and representation invariants of [[program-design/abstraction-specifications]] and [[program-design/abstract-data-types]], made executable: checked at run time during testing, and the targets of proof in verification tools. Contracts also decide *blame*: a violated precondition is the caller's fault, a violated postcondition the routine's.

::: example Contracts as assertions {#ex-contracts}
Give a bounded stack a precondition, postcondition and invariant for each operation, written as assertions, and show what happens when a client violates a precondition — with and without Python's `-O` option.
::: solution
```python
class BoundedStack:
    """A stack holding at most `capacity` items.
    Invariant: 0 <= len(self._items) <= self.capacity."""
    def __init__(self, capacity):
        assert capacity >= 1, "precondition: capacity >= 1"
        self.capacity, self._items = capacity, []
        self._check()

    def _check(self):
        assert 0 <= len(self._items) <= self.capacity, "invariant broken"

    def push(self, x):
        assert len(self._items) < self.capacity, "precondition: stack not full"
        old = len(self._items)
        self._items.append(x)
        assert len(self._items) == old + 1 and self._items[-1] == x, "postcondition"
        self._check()

    def pop(self):
        assert self._items, "precondition: stack not empty"
        x = self._items.pop()
        self._check()
        return x

s = BoundedStack(2)
s.push("a"); s.push("b")
print(s.pop(), s.pop())
s.push("c"); s.push("d"); s.push("e")
```

```console
$ python3 contracts.py
b a
Traceback (most recent call last):
  File ".../contracts.py", line 28, in <module>
    s.push("c"); s.push("d"); s.push("e")
                              ~~~~~~^^^^^
  File ".../contracts.py", line 13, in push
    assert len(self._items) < self.capacity, "precondition: stack not full"
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
AssertionError: precondition: stack not full
$ python3 -O contracts.py; echo "exit $?"
b a
exit 0
```

The third `push` violates the precondition, and the message says so: the defect is in the *caller*, which pushed onto a full stack, not in `push`. The postcondition and invariant checks guard the stack's own code; they never fire here, which is what we want. Under `python3 -O` every `assert` is removed ([[programming-1/testing-debugging]]), and the program silently pushes a third item onto a stack of capacity 2 — the invariant is broken and nobody is told. That is acceptable for checks that are only a *debugging* aid in a program already verified to respect them; if callers outside your control might violate the precondition, check it with an `if` and raise an exception that is part of the interface. Run-time contract checking finds violations only on the inputs that are run; the same contracts, given to a verifier, can be proved for all inputs.
:::
:::

## Model checking

Concurrent programs are where intuition fails most often, because the number of interleavings of even two short processes is large and the bad ones are rare in testing. **Model checking** explores *every* reachable state of a finite model of the system.

::: definition Transition system, invariant, counterexample {#def-transition-system}
A **transition system** consists of a set of **states** $S$, an **initial state** $s_0 \in S$, and a **successor** relation giving, for each state, the states reachable in one step. A state is **reachable** if there is a path of steps to it from $s_0$. An **invariant** is a predicate $I$ on states; the system **satisfies** it if $I$ holds in every reachable state. A **counterexample** is a path from $s_0$ to a reachable state where $I$ is false.
:::

::: algorithm Explicit-state invariant checking {#alg-model-check}
**Input:** a transition system with finitely many reachable states, an invariant $I$. **Output:** "satisfied", or a shortest counterexample.

1. Mark $s_0$ as seen, with no parent, and put it in a FIFO queue.
2. While the queue is not empty:
   1. Remove the first state $s$.
   2. If $I(s)$ is false, follow parent links from $s$ back to $s_0$ and return the reversed path.
   3. For each successor $t$ of $s$ not yet seen: mark it seen, record $s$ as its parent, and append it to the queue.
3. Return "satisfied".
:::

::: theorem Model checking is sound, complete and finds shortest counterexamples {#thm-model-check}
On a transition system with finitely many reachable states, [[#alg-model-check]] terminates; it returns "satisfied" if and only if the invariant holds in every reachable state; and when it returns a counterexample, no shorter counterexample exists.
:::

::: proof
This is breadth-first search ([[algorithms/graph-search#thm-bfs]]). Each reachable state enters the queue at most once, because it is marked when first enqueued, and there are finitely many, so the loop terminates. Every state enqueued is reachable (its parent chain is a path from $s_0$), and every reachable state is eventually enqueued and examined unless the algorithm stops earlier: by induction on the length of a shortest path to it, since its predecessor on that path is examined and enqueues it if no one has. So if the invariant fails somewhere, some violating state is examined and a counterexample returned; if it holds everywhere, the queue empties and "satisfied" is returned. Breadth-first search examines states in non-decreasing order of their distance from $s_0$, and the parent links record shortest paths; so the first violating state examined is one at minimum distance, and its path is a shortest counterexample.
:::

::: example A broken lock {#ex-model-check}
Two processes share a lock built from two flags. Each process repeatedly runs: *wait while the other's flag is up; raise my flag; enter the critical section; lower my flag.* Check the invariant that both are never in the critical section at once.
::: solution
The checker is the algorithm above, written generically:

```python
from collections import deque

def check(initial, successors, invariant):
    """Breadth-first search of all reachable states. Returns (number of states
    explored, None) if the invariant holds everywhere, or (n, path) where path
    is a shortest sequence of states from the initial state to a violation."""
    parent = {initial: None}
    queue = deque([initial])
    while queue:
        s = queue.popleft()
        if not invariant(s):
            path = []
            while s is not None:
                path.append(s)
                s = parent[s]
            return len(parent), path[::-1]
        for t in successors(s):
            if t not in parent:
                parent[t] = s
                queue.append(t)
    return len(parent), None
```

A state is the pair of program counters and the pair of flags; each step lets one process execute one statement:

```python
from modelcheck import check

# Each process runs:  while flag[other]: wait;  flag[me] = True;  critical;  flag[me] = False
# Program counters: 0 = test the other's flag, 1 = set my flag, 2 = critical section.
def naive_successors(state):
    pc, flag = list(state[0]), list(state[1])
    for me in (0, 1):
        other = 1 - me
        p, f = pc[:], flag[:]
        if pc[me] == 0:
            if flag[other]:
                continue                 # blocked: the other's flag is up
            p[me] = 1
        elif pc[me] == 1:
            f[me], p[me] = True, 2
        else:                            # leave the critical section
            f[me], p[me] = False, 0
        yield (tuple(p), tuple(f))

mutex = lambda s: s[0] != (2, 2)         # never both in the critical section
n, trace = check(((0, 0), (False, False)), naive_successors, mutex)
print(n, "states explored; counterexample:")
for pcs, flags in trace:
    print("  pc =", pcs, " flags =", flags)
```

```console
$ python3 locks.py
9 states explored; counterexample:
  pc = (0, 0)  flags = (False, False)
  pc = (1, 0)  flags = (False, False)
  pc = (1, 1)  flags = (False, False)
  pc = (2, 1)  flags = (True, False)
  pc = (2, 2)  flags = (True, True)
```

Read the trace: process 0 sees flag 1 down and moves on; *before it raises its own flag*, process 1 also sees flag 0 down and moves on; then both raise their flags and both enter. The test and the set are not atomic. The bug needs one particular interleaving of four steps; a test running the two processes as threads might pass thousands of times. Gary Peterson's algorithm (1981) fixes it by adding a shared `turn` variable: *raise my flag; give the turn to the other; wait while the other's flag is up and it is the other's turn*. Modelled the same way (see [[#ex-peterson]]), the checker explores all 20 reachable states and reports that mutual exclusion holds. On real hardware, Peterson's algorithm also needs memory barriers, because processors reorder memory operations ([[operating-systems/synchronisation]]); the model assumes they do not.
:::
:::

::: widget graph
nodes: 00FF@0,0; 10FF@1,0; 20TF@2,0; 01FF@0,1; 11FF@1,1; 21TF@2,1; 02FT@0,2; 12FT@1,2; 22TT@2,2
edges: 00FF>01FF; 00FF>10FF; 01FF>02FT; 01FF>11FF; 02FT>00FF; 10FF>11FF; 10FF>20TF; 11FF>12FT; 11FF>21TF; 12FT>10FF; 12FT>22TT; 20TF>00FF; 21TF>01FF; 21TF>22TT; 22TT>02FT; 22TT>20TF
algorithm: bfs
start: 00FF
caption: The complete state space of the broken lock in [[#ex-model-check]]: each state is written as the two program counters followed by the two flags (`T`/`F`), laid out with process 0's counter across and process 1's down. Run breadth-first search from `00FF`: it reaches `22TT`, the state with both processes in the critical section, at depth 4, by the path the checker printed. All 9 states are reachable; for $k$ processes with $m$ local states each, the space can grow like $m^k$ — the **state explosion** that limits explicit-state model checking.
:::

Real model checkers — SPIN (Gerard Holzmann, Bell Labs), the TLC checker for TLA+, NuSMV, CBMC for C — do the same thing with industrial engineering: compact state storage, partial-order reduction (skipping interleavings that cannot matter), symbolic representations with binary decision diagrams, and **bounded model checking**, which encodes "is there a counterexample of length at most $k$?" as a satisfiability problem for a SAT or SMT solver. They also check **liveness** properties ("every process that wants the lock eventually gets it"), expressed in temporal logics such as LTL. Edmund Clarke, Allen Emerson and Joseph Sifakis received the 2007 Turing Award for founding the field in 1981–82. A widely cited industrial report, Newcombe and colleagues' "How Amazon Web Services uses formal methods" (*Communications of the ACM*, 2015), describes engineers specifying distributed algorithms in TLA+ and finding subtle design bugs with the model checker — one in DynamoDB's replication whose shortest counterexample had 35 steps — that had passed reviews and extensive testing.

### Verified software

Full proof that code meets a formal specification has moved from research to a small number of real systems. The **seL4** microkernel (Klein and colleagues, SOSP 2009) was proved, in the Isabelle/HOL proof assistant, to implement its abstract specification, so that whole classes of bugs — crashes, buffer overflows, null dereferences — are absent from its C code under the proof's assumptions (about the compiler, hardware and boot code). Xavier Leroy's **CompCert** C compiler (from 2006) was proved in Coq to preserve the meaning of programs. When Yang, Chen, Eide and Regehr tested C compilers with randomly generated programs ("Finding and understanding bugs in C compilers", PLDI 2011), they found hundreds of bugs in GCC and LLVM, and none in the verified parts of CompCert — a striking piece of evidence for what proof buys, and for its limits, since they did find bugs in CompCert's unverified front end. The cost is high — seL4's proof took on the order of 20 person-years for about 10,000 lines of C — so full verification is reserved for small, critical cores.

::: warning "Formally verified" does not mean "cannot fail"
A proof shows that a model satisfies a specification under stated assumptions. The specification may be wrong or incomplete (it says nothing about the case that matters); the model may differ from the code or the code from what actually runs (a compiler, a library, the hardware); and the assumptions may fail in the field (Ariane's input range). Verification moves the risk from "the code has a bug" to "the specification and assumptions are wrong", which is a large gain because specifications are shorter and can be reviewed — but the remaining risk must still be managed by review, testing and safe design. Conversely, "we tested it thoroughly" says nothing about inputs that were not tested.
:::

::: quiz
A static analyser for division by zero reports no warnings on a program. In which case can you conclude that the program never divides by zero?
- [x] The analyser is sound for that property and the program stays within the language features it models.
- [ ] The analyser is complete for that property.
- [ ] The program also passed a test suite with 100% branch coverage.
- [ ] The analyser reported no false alarms on other programs.
::: solution
"No warnings" means "the analyser says yes, the property holds". Soundness ([[#def-sound]]) is exactly the guarantee that a yes is true. Completeness promises the opposite direction (no false alarms), so a complete but unsound analyser can miss real violations. Tests and a low false-alarm rate on other programs are evidence, not proof. And soundness is always relative to a model of the language: casts, foreign code or features the analyser ignores can break it.
:::
:::

## Safety-critical software

Where software failure can kill, its development is regulated by standards that prescribe process, evidence and independence according to the severity of possible failures. **DO-178C** (RTCA, 2011; its predecessor DO-178B dates from 1992) governs airborne software and assigns each function a level from A (failure could be catastrophic) to E (no safety effect); Level A requires, among much else, requirements-based testing with MC/DC structural coverage ([[software-engineering/testing#def-mcdc]]) and bidirectional traceability ([[software-engineering/requirements#def-traceability]]), with supplements permitting formal methods to replace some testing. **IEC 61508** is the generic standard for electrical and programmable safety systems, with safety integrity levels SIL 1 to 4; **ISO 26262** (2011, second edition 2018) adapts it to road vehicles and **IEC 62304** governs medical-device software. They share a philosophy: identify hazards first, derive safety requirements from them, and produce a **safety case** — a structured argument, supported by evidence, that the system is acceptably safe in its context.

The cautionary case most often taught is the **Therac-25**, a radiation-therapy machine whose software contributed to six known accidents between 1985 and 1987 in which patients received massive overdoses, some fatal (Nancy Leveson and Clark Turner, "An investigation of the Therac-25 accidents", *IEEE Computer*, 1993). The causes were not one bug but a system: the hardware interlocks of earlier models had been removed in favour of software checks; a race condition let a fast operator's edit leave the machine in an inconsistent state; error messages ("MALFUNCTION 54") were cryptic and so frequent that operators learned to override them; and the manufacturer's early responses assumed hardware faults and overestimated the software's reliability because it had been reused from earlier machines. Every one of these — removing defence in depth, concurrency bugs, poor human interfaces, overconfidence from reuse — reappears in later accidents, including Ariane 5.

::: history
Alan Turing's 1949 note "Checking a large routine" and Robert Floyd's 1967 "Assigning meanings to programs" began program proof, and C. A. R. Hoare's 1969 axiomatic basis made it a logic. Rice's theorem (1953) set the limits of automatic analysis. Patrick and Radhia Cousot introduced abstract interpretation in 1977. Edmund Clarke and Allen Emerson (1981) and, independently, Jean-Pierre Queille and Joseph Sifakis (1982) invented model checking; Gerard Holzmann's SPIN, developed at Bell Labs in the 1980s, received the ACM Software System Award in 2001. The Ariane 5 inquiry reported in July 1996, Leveson and Turner's Therac-25 investigation appeared in 1993, and Butler and Finelli's infeasibility argument the same year. seL4's proof was published in 2009, the year CompCert's verification was summarised in *Communications of the ACM*.
:::

## Where this leads

Theoretical foundations are elsewhere in the atlas: the undecidability behind [[#prop-rice]] in [[theory-of-computation/decidability]], type systems as the most widely used static analysis in [[programming-languages/type-systems]], and dataflow analysis, the compiler's workhorse static analysis, in [[compilers/dataflow-optimisation]]. Concurrency and the mutual-exclusion problem are in [[operating-systems/synchronisation]], and distributed protocols — where TLA+ is most used — in [[distributed-systems/consensus]]. Secure-development practices, including fuzzing and analysis for vulnerabilities, are in [[security/secure-development]]. The responsibilities of engineers who build systems on which lives depend are the subject of [[software-engineering/professional-ethics]].

::: summary
- Distinguish **fault → error → failure** ([[#def-fault-error-failure]]); prevent faults, remove them, and tolerate the rest. Availability is $\mathrm{MTTF}/(\mathrm{MTTF} + \mathrm{MTTR})$ ([[#prop-availability-mc]]): faster repair helps as much as rarer failure.
- Demonstrating a failure rate $\lambda_0$ by testing needs about $\ln(1/\alpha)/\lambda_0$ failure-free hours ([[#prop-test-infeasible]]) — infeasible for $10^{-9}$ per hour. Independent versions fail together more than independence predicts.
- No analysis of a non-trivial semantic property is sound, complete and terminating ([[#prop-rice]]); sound analysers raise false alarms, bug-finders miss bugs ([[#def-sound]]).
- **Abstract interpretation** computes over-approximations such as intervals ([[#prop-intervals]]) and can prove the absence of overflows for *all* inputs — under stated assumptions about the inputs.
- **Formal specification** and **design by contract** make requirements precise and code checkable.
- **Model checking** explores every reachable state of a finite model and returns a shortest counterexample ([[#alg-model-check]], [[#thm-model-check]]); state explosion is its limit.
- Safety-critical software follows standards (DO-178C, IEC 61508, ISO 26262) and argues safety in a **safety case**; Ariane 5 and Therac-25 show how reuse, removed safeguards and unchecked assumptions combine.
:::

## Exercises

::: exercise Availability {level=1 check="0.995"}
A service fails on average every 199 hours and takes on average 1 hour to restore. What is its steady-state availability? (Enter the number.)
::: solution
By [[#prop-availability-mc]], $A = 199/(199 + 1) = 0.995$: down about 3.6 hours a month.
:::
:::

::: exercise Fault, error or failure? {level=1}
Classify each in the Ariane 5 story by [[#def-fault-error-failure]]: (a) the absence of a range check on the conversion; (b) the overflowed value in the inertial reference computer; (c) the rocket's deviation from its trajectory; (d) the diagnostic bit pattern sent to the main computer and interpreted as flight data.
::: solution
(a) Fault — the cause (as was the decision to shut down on any exception). (b) Error — erroneous state. (c) Failure — the delivered service (flying the trajectory) deviated from the specification. (d) An error that propagated: wrong state in the main computer, caused by the first computer's failure, which from the main computer's point of view was a fault in its input.
:::
:::

::: exercise Sound or complete? {level=1}
Three tools check a program for possible null dereferences. Tool A reports every real null dereference and some false ones. Tool B reports only real ones but misses some. Tool C reports nothing on any program. Which are sound, which complete (taking "no null dereference" as the property $\Phi$ and "no report" as the tool's "yes")?
::: solution
A is sound: when it says yes (no report), there really is no null dereference; it is not complete, since it raises false alarms on some correct programs. B is complete: every correct program gets no report; it is unsound, since it says yes on some incorrect programs. C says yes always: it is complete (trivially) and wildly unsound. By [[#prop-rice]], no tool can be both sound and complete and always terminate.
:::
:::

::: exercise How much testing? {level=2 check="46052"}
Under the model of [[#prop-test-infeasible]], how many hours of failure-free testing are needed to support $\lambda \le 10^{-4}$ failures per hour at 99% confidence? Round up to a whole number of hours. (Enter the number.)
::: solution
$t \ge \ln(100)/10^{-4} = 4.60517 \times 10^4 \approx 46{,}051.7$ hours, so $46{,}052$ hours — about 5.3 years. Feasible with many machines in parallel for a modest target like this; the problem is the five orders of magnitude between this and $10^{-9}$.
:::
:::

::: exercise A false alarm {level=2}
Using the rules of [[#prop-intervals]], compute the interval for `x * x - 2 * x + 1` with $x \in [0, 2]$, and compare it with the true range. Rewrite the expression so that the interval analysis is exact.
::: solution
`x * x`: corners $0, 0, 0, 4$, so $[0, 4]$. `2 * x`: $[0, 4]$. Their difference: $[0 - 4, 4 - 0] = [-4, 4]$. Adding $1$: $[-3, 5]$. The true range of $x^2 - 2x + 1 = (x - 1)^2$ on $[0, 2]$ is $[0, 1]$. The analysis is sound ($[0, 1] \subseteq [-3, 5]$) but imprecise, because it treats the two occurrences of $x$ as independent. Writing `(x - 1) * (x - 1)` gives `x - 1` $\in [-1, 1]$, then corners $1, -1, -1, 1$, so $[-1, 1]$ — still imprecise, for the same reason. A squaring operation with its own rule ($[a, b]^2 = [0, \max(a^2, b^2)]$ when $a \le 0 \le b$) gives $[0, 1]$, exact. Real analysers use such special rules and relational domains (which track relations like $y = x - 1$) to reduce false alarms.
:::
:::

::: exercise Peterson's algorithm {level=2 #ex-peterson}
Model Peterson's algorithm as described in [[#ex-model-check]] — program counters 0 (raise my flag), 1 (give the turn to the other), 2 (wait while the other's flag is up and it is the other's turn), 3 (critical section; leaving lowers my flag) — and check mutual exclusion with the same checker. Also check that no reachable state is a **deadlock** (a state with no successors).
::: solution
```python
from modelcheck import check

# Peterson's algorithm. pc: 0 = raise my flag, 1 = give the turn away,
# 2 = wait while (other's flag up and it is the other's turn), 3 = critical.
def peterson_successors(state):
    pc, flag, turn = state
    for me in (0, 1):
        other = 1 - me
        p, f, t = list(pc), list(flag), turn
        if pc[me] == 0:
            f[me], p[me] = True, 1
        elif pc[me] == 1:
            t, p[me] = other, 2
        elif pc[me] == 2:
            if flag[other] and turn == other:
                continue                 # still waiting
            p[me] = 3
        else:
            f[me], p[me] = False, 0      # leave the critical section
        yield (tuple(p), tuple(f), t)

mutex = lambda s: s[0] != (3, 3)
print(check(((0, 0), (False, False), 0), peterson_successors, mutex))
no_deadlock = lambda s: any(True for _ in peterson_successors(s))
print(check(((0, 0), (False, False), 0), peterson_successors, no_deadlock))
```

```console
$ python3 peterson.py
(20, None)
(20, None)
```

All 20 reachable states satisfy both invariants: mutual exclusion holds and every state has a successor. (Absence of deadlock is weaker than **starvation-freedom** — every waiting process eventually enters — which is a liveness property; it also holds for Peterson's algorithm, but checking it needs a fairness assumption and a cycle search rather than a reachability search.)
:::
:::

::: exercise Independent versions {level=3}
Three independently developed versions vote, and the system fails if at least two versions fail on the same input. (a) If each version fails on an input with probability $p = 10^{-3}$, independently, what is the probability that the system fails on an input? (b) Suppose instead that a fraction $\theta = 10^{-4}$ of inputs are "hard", and on a hard input each version fails with probability $0.5$ (independently, given that the input is hard), while on other inputs the versions never fail. Each version's failure probability is then $\theta/2 = 5 \times 10^{-5}$. What is the system's failure probability now, and what does the comparison show?
::: solution
(a) The system fails if exactly two or all three fail: $3p^2(1 - p) + p^3 = 3 \times 10^{-6} \times 0.999 + 10^{-9} \approx 2.998 \times 10^{-6}$ — about 333 times better than one version.

(b) On a hard input, the probability that at least two of three fail is $3 \times 0.5^2 \times 0.5 + 0.5^3 = 0.5$. So the system fails with probability $\theta \times 0.5 = 5 \times 10^{-5}$ — *exactly the same as a single version*. Independence was assumed for (a) and is false for (b): failures are concentrated on the same hard inputs, so they coincide. This is the phenomenon Knight and Leveson observed experimentally, explained by a model due to Eckhardt and Lee (1985): even when versions are developed independently, the *difficulty* of inputs is shared, and voting helps only to the extent that versions fail on different inputs.
:::
:::

::: exercise Shortest counterexamples need breadth-first search {level=3}
Replace the queue in [[#alg-model-check]] by a stack (depth-first search). Show that the modified algorithm still terminates and is still sound and complete for invariants, but give a transition system on which it returns a counterexample that is not shortest. Why do practical model checkers nevertheless often use depth-first search?
::: solution
Termination, soundness and completeness carry over from the proof of [[#thm-model-check]]: each reachable state is pushed at most once, every pushed state is reachable, and every reachable state is eventually pushed and examined unless a violation is found first — that part of the argument did not depend on the order of removal. Only the shortest-path claim used the FIFO order. A counterexample: states $s_0, a, b, c, d$ with steps $s_0 \to c$, $s_0 \to a$ (successors generated in that order), $a \to b$, $b \to d$, $c \to d$, and the invariant false only at $d$.

```python
def check_dfs(initial, successors, invariant):
    """As check(), but with a stack instead of a queue."""
    parent, stack = {initial: None}, [initial]
    while stack:
        s = stack.pop()
        if not invariant(s):
            path = []
            while s is not None:
                path.append(s)
                s = parent[s]
            return path[::-1]
        for t in successors(s):
            if t not in parent:
                parent[t] = s
                stack.append(t)
    return None

from modelcheck import check
graph = {"s0": ["c", "a"], "a": ["b"], "b": ["d"], "c": ["d"], "d": []}
ok = lambda s: s != "d"
print("DFS:", check_dfs("s0", graph.__getitem__, ok))
print("BFS:", check("s0", graph.__getitem__, ok)[1])
```

```console
$ python3 dfscheck.py
DFS: ['s0', 'a', 'b', 'd']
BFS: ['s0', 'c', 'd']
```

The stack pops $a$ (pushed last) before $c$, and reaches $d$ through $a$ and $b$ before $c$ is ever expanded, so it records $b$ as $d$'s parent and returns a counterexample of 3 steps when one of 2 exists. Depth-first search is nevertheless popular — SPIN uses it by default — because the search stack *is* the current path, which makes the cycle detection needed for liveness properties natural (nested depth-first search) and needs memory only for the visited set and one path; a shorter counterexample can be sought afterwards, by iterative deepening or a breadth-first re-run. Long counterexamples are not wrong, only harder to read.
:::
:::
