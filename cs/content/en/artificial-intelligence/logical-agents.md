A hospital's scheduling system knows that no surgeon operates in two theatres at once, that every operation needs an anaesthetist, and that Dr Okafor is on leave on Tuesday. A configuration tool knows which components are compatible. A verification tool knows the transition rules of a chip. None of these systems was programmed with the answer to every question it will be asked; each was given **knowledge** in a formal language, and it *derives* answers by reasoning. Asked "can operation 17 go ahead on Tuesday morning?", it should answer "yes" only if that follows from what it knows — in every situation consistent with its knowledge — and it should be able to find the answer whenever it does follow.

This is the agenda of **knowledge-based agents**: keep a **knowledge base** (KB) of sentences in a logic, add percepts to it with an operation `Tell`, and ask what follows with `Ask`. The design separates *what* the agent knows (declarative knowledge, which can be inspected and changed) from *how* it reasons (a general inference procedure). This chapter develops the two logics on which most of classical AI rests. In **propositional logic** we define entailment, decide it by model checking and by **resolution**, prove that resolution is sound and refutation-complete, and show that for **Horn clauses** forward chaining decides entailment in linear time. In **first-order logic**, which talks about objects and relations, we introduce quantifiers, **unification** and lifted resolution, and meet the fundamental limit: entailment is only semi-decidable. Propositional logic itself — syntax, truth tables, normal forms — is taught in [Maths Atlas: propositional logic](/learn/maths/lesson.php?c=proofs&l=propositional-logic); here we concentrate on inference algorithms.

## Entailment and inference

We fix a set of **proposition symbols** $P, Q, R, \dots$ Sentences are built from symbols and $\top$, $\bot$ with $\lnot$, $\land$, $\lor$, $\Rightarrow$ and $\Leftrightarrow$, with the usual truth tables.

::: definition Models, satisfiability and entailment {#def-entailment}
A **model** $m$ is an assignment of truth values to the proposition symbols. A sentence $\alpha$ is **true in** $m$ (written $m \models \alpha$) according to the truth tables; $M(\alpha)$ is the set of models of $\alpha$. A sentence is **satisfiable** if it has a model, **valid** (a **tautology**) if it is true in every model. A set (conjunction) of sentences $\mathit{KB}$ **entails** $\alpha$, written $\mathit{KB} \models \alpha$, if $\alpha$ is true in every model of $\mathit{KB}$: $M(\mathit{KB}) \subseteq M(\alpha)$.
:::

Entailment is the semantic relation we care about: $\alpha$ follows from what we know. An **inference procedure** is a syntactic procedure $i$ that derives sentences from sentences; we write $\mathit{KB} \vdash_i \alpha$. It is **sound** if it derives only entailed sentences ($\mathit{KB} \vdash_i \alpha$ implies $\mathit{KB} \models \alpha$) and **complete** if it derives every entailed sentence. Soundness is non-negotiable — an unsound procedure can "prove" falsehoods. Completeness is desirable but, as we shall see, sometimes traded for efficiency.

::: theorem Entailment, validity and unsatisfiability {#thm-refutation}
For sentences $\mathit{KB}$ and $\alpha$, the following are equivalent:
1. $\mathit{KB} \models \alpha$;
2. $\mathit{KB} \Rightarrow \alpha$ is valid (the **deduction theorem**);
3. $\mathit{KB} \land \lnot\alpha$ is unsatisfiable.
:::

::: proof
(1 ⇒ 2) In a model where $\mathit{KB}$ is false, $\mathit{KB} \Rightarrow \alpha$ is true; in a model where $\mathit{KB}$ is true, $\alpha$ is true by (1), so $\mathit{KB} \Rightarrow \alpha$ is true. (2 ⇒ 3) If $\mathit{KB} \Rightarrow \alpha$ is true in every model, no model makes $\mathit{KB}$ true and $\alpha$ false, i.e. none satisfies $\mathit{KB} \land \lnot\alpha$. (3 ⇒ 1) If no model satisfies $\mathit{KB} \land \lnot\alpha$, every model of $\mathit{KB}$ satisfies $\alpha$.
:::

So entailment reduces to unsatisfiability — **proof by refutation**, or *reductio ad absurdum*: to show $\mathit{KB} \models \alpha$, add $\lnot\alpha$ and derive a contradiction. Since satisfiability is $\mathsf{NP}$-complete (the Cook–Levin theorem, [[complexity/np-completeness#thm-cook-levin]]), propositional entailment is $\mathsf{coNP}$-complete: no algorithm is expected to be fast on every input.

The simplest complete procedure is **model checking**: enumerate all $2^n$ models of the $n$ symbols and check that $\alpha$ is true in each one where $\mathit{KB}$ is. It is sound and complete, and takes $O(2^n)$ time and $O(n)$ space.

::: example Entailment by enumerating models {#ex-model-checking}
Let the knowledge base say: if it rains the match is cancelled ($R \Rightarrow M$); if the match is cancelled, Ann goes to the cinema or stays at home ($M \Rightarrow C \lor H$); Ann does not stay at home ($\lnot H$); and it rains ($R$). Does $\mathit{KB} \models C$? Does $\mathit{KB} \models M \land C$? Does $\mathit{KB}$ entail $\lnot C$?
::: solution
There are $2^4 = 16$ models of $R, M, C, H$. $R$ and $\lnot H$ fix $R = \text{true}$, $H = \text{false}$. Then $R \Rightarrow M$ forces $M = \text{true}$, and $M \Rightarrow C \lor H$ forces $C \lor H$, hence $C = \text{true}$. So exactly one model satisfies $\mathit{KB}$: $R = M = C = \text{true}$, $H = \text{false}$. In it $C$ and $M \land C$ are true, so $\mathit{KB} \models C$ and $\mathit{KB} \models M \land C$; $\lnot C$ is false in it, so $\mathit{KB} \not\models \lnot C$. With $n$ symbols the enumeration takes $2^n$ steps however simple the reasoning: here it examined $16$ models to find a conclusion that three short steps of reasoning give directly. Inference rules let us take those steps.
:::
:::

::: widget truthtable
formula: ((a | b) & (~b | c)) -> (a | c)
caption: The resolution rule as a tautology: from $a \lor b$ and $\lnot b \lor c$ infer $a \lor c$. Every row of the final column is true, so the inference is sound. Notice the rows where $b$ is true and where it is false: in each, one of the two premises "passes the work" to the conclusion. Edit the formula — for example to $((a \lor b) \land (\lnot b \lor c)) \to c$ — to see an unsound rule fail in some row.
:::

## Resolution

**Modus ponens** — from $\alpha \Rightarrow \beta$ and $\alpha$ infer $\beta$ — is sound but not complete on its own. Robinson's **resolution** rule is a single rule that, combined with refutation, gives a complete procedure. It works on sentences in a normal form.

::: definition Clauses and conjunctive normal form {#def-cnf}
A **literal** is a symbol $P$ or its negation $\lnot P$. A **clause** is a disjunction of literals, which we treat as a set ($\{P, \lnot Q\}$ for $P \lor \lnot Q$); the **empty clause** $\square$, with no literals, is false in every model. A sentence is in **conjunctive normal form** (CNF) if it is a conjunction of clauses. Every sentence is equivalent to one in CNF, obtained by eliminating $\Leftrightarrow$ and $\Rightarrow$ ($\alpha \Rightarrow \beta \equiv \lnot\alpha \lor \beta$), pushing $\lnot$ inwards by De Morgan's laws and double negation, and distributing $\lor$ over $\land$.
:::

::: widget truthtable
formula: (p -> q) & (q -> r)
compare: (~p | q) & (~q | r)
caption: A sentence and its conjunctive normal form, compared row by row: eliminating $\Rightarrow$ by $\alpha \Rightarrow \beta \equiv \lnot\alpha \lor \beta$ gives two clauses, and the figure confirms the two formulas are equivalent. Try converting $p \leftrightarrow q$ yourself and enter your CNF as the second formula to check it.
:::

Distribution can blow up the formula exponentially; the **Tseitin transformation** instead introduces a new symbol for each subformula and produces an *equisatisfiable* CNF (satisfiable exactly when the original is) of linear size — enough for refutation, and the method every SAT solver uses.

::: definition Resolution rule {#def-resolution}
If clause $C_1$ contains a literal $\ell$ and clause $C_2$ contains its complement $\bar\ell$, their **resolvent** on $\ell$ is
$$
\mathrm{Res}_\ell(C_1, C_2) = (C_1 \setminus \{\ell\}) \cup (C_2 \setminus \{\bar\ell\}).
$$
The **resolution closure** $\mathrm{RC}(S)$ of a set of clauses $S$ is the smallest set containing $S$ and closed under taking resolvents.
:::

::: lemma Resolution is sound {#lem-resolution-sound}
Every model of $C_1$ and $C_2$ is a model of $\mathrm{Res}_\ell(C_1, C_2)$. Hence every clause in $\mathrm{RC}(S)$ is entailed by $S$, and if $\square \in \mathrm{RC}(S)$ then $S$ is unsatisfiable.
:::

::: proof
Let $m$ satisfy $C_1$ and $C_2$. If $\ell$ is true in $m$, then $\bar\ell$ is false, so some other literal of $C_2$ is true in $m$, and it belongs to the resolvent. If $\ell$ is false, some other literal of $C_1$ is true, and it belongs to the resolvent. The second sentence follows by induction on the number of resolution steps, and the third because $\square$ has no models.
:::

The converse — every unsatisfiable set yields $\square$ — is the heart of the method.

::: theorem Ground resolution theorem (refutation completeness) {#thm-resolution-complete}
If a finite set $S$ of propositional clauses is unsatisfiable, then $\square \in \mathrm{RC}(S)$. Consequently, $\mathit{KB} \models \alpha$ if and only if resolution derives $\square$ from the clauses of $\mathit{KB} \land \lnot\alpha$.
:::

::: proof
We prove the contrapositive: if $\square \notin \mathrm{RC}(S)$, we construct a model of $\mathrm{RC}(S)$, hence of $S$. Discard tautological clauses (containing both $P$ and $\lnot P$; they are true in every model). Let $P_1, \dots, P_k$ be the symbols occurring in $S$; $\mathrm{RC}(S)$ is finite, since there are finitely many clauses over these symbols. Assign values in order: for $i = 1, \dots, k$, make $P_i$ **false** if $\mathrm{RC}(S)$ contains a clause that contains $\lnot P_i$ and whose other literals are all false under the values already chosen for $P_1, \dots, P_{i-1}$ (so it would be falsified by making $P_i$ true); otherwise make $P_i$ **true**.

Suppose some clause of $\mathrm{RC}(S)$ is false under the final assignment, and let $i$ be the least index such that some clause $C$ that mentions only $P_1, \dots, P_i$ is falsified by the values of $P_1, \dots, P_i$. $C$ must contain $P_i$ or $\lnot P_i$ (otherwise $i$ was not least, or $C = \square$, which is excluded), and not both. If $C$ contains $\lnot P_i$, then $\lnot P_i$ is false, so $P_i$ was made true — but $C$ itself is a clause containing $\lnot P_i$ whose other literals are false under $P_1, \dots, P_{i-1}$, so the rule would have made $P_i$ false. Contradiction. So $C$ contains $P_i$, and $P_i$ was made false because some clause $C'$ contains $\lnot P_i$ with all its other literals false under $P_1, \dots, P_{i-1}$. Then the resolvent $R = \mathrm{Res}_{P_i}(C, C')$ is in $\mathrm{RC}(S)$ and consists of literals of $C$ and $C'$ other than $P_i$ and $\lnot P_i$, all false under the values of $P_1, \dots, P_{i-1}$. If $R$ is a tautology this is impossible (one of a complementary pair is true); otherwise $R$ is a clause on $P_1, \dots, P_{i-1}$ that is falsified there — contradicting the minimality of $i$ — or $R = \square$, contradicting $\square \notin \mathrm{RC}(S)$. So every clause of $\mathrm{RC}(S)$ is true: $S$ is satisfiable. The final statement follows from [[#thm-refutation]] and [[#lem-resolution-sound]].
:::

Resolution is complete *for refutation*, not for generating consequences: from $\{P\}$ resolution derives nothing, although $P \lor Q$ is entailed. That is why we always resolve the KB together with the *negated* query.

::: algorithm Resolution refutation {#alg-resolution}
```python
from itertools import combinations

def neg(l): return l[1:] if l.startswith("~") else "~" + l
def show(c): return "{" + ", ".join(sorted(c)) + "}" if c else "EMPTY"

def resolvents(c1, c2):
    """All non-tautological resolvents of two clauses (frozensets of literals 'P', '~P')."""
    out = []
    for lit in sorted(c1):
        if neg(lit) in c2:
            r = (c1 - {lit}) | (c2 - {neg(lit)})
            if not any(neg(l) in r for l in r):
                out.append(frozenset(r))
    return out

def refute(clauses, trace=False):
    """Saturate by resolution; True iff the empty clause is derived (the set is unsatisfiable)."""
    known = [frozenset(c) for c in clauses]
    while True:
        new = []
        for c1, c2 in combinations(known, 2):
            for r in resolvents(c1, c2):
                if r not in known and r not in new:
                    if trace: print(f"{show(c1)} + {show(c2)} -> {show(r)}")
                    if not r: return True
                    new.append(r)
        if not new: return False                  # saturated without the empty clause
        known += new
```
:::

The procedure terminates because there are finitely many clauses over the given symbols; by [[#thm-resolution-complete]] it returns True exactly when the clause set is unsatisfiable.

::: example A resolution refutation {#ex-resolution}
Prove $\mathit{KB} \models C$ for the knowledge base of [[#ex-model-checking]] by resolution, by hand and with the program.
::: solution
In clause form the KB is $\{\lnot R, M\}$, $\{\lnot M, C, H\}$, $\{\lnot H\}$, $\{R\}$, and the negated query is $\{\lnot C\}$. A short refutation:

1. $\{\lnot R, M\}$ and $\{R\}$ give $\{M\}$;
2. $\{\lnot M, C, H\}$ and $\{M\}$ give $\{C, H\}$;
3. $\{C, H\}$ and $\{\lnot H\}$ give $\{C\}$;
4. $\{C\}$ and $\{\lnot C\}$ give $\square$.

The program saturates blindly, level by level:

```console
$ python3 resolution.py
{M, ~R} + {C, H, ~M} -> {C, H, ~R}
{M, ~R} + {R} -> {M}
{C, H, ~M} + {~H} -> {C, ~M}
{C, H, ~M} + {~C} -> {H, ~M}
{M, ~R} + {C, ~M} -> {C, ~R}
{M, ~R} + {H, ~M} -> {H, ~R}
{C, H, ~M} + {M} -> {C, H}
{~H} + {H, ~M} -> {~M}
{M} + {C, ~M} -> {C}
{M} + {H, ~M} -> {H}
{M, ~R} + {~M} -> {~R}
{~H} + {H} -> EMPTY
True
False
```

It derives eleven clauses before the empty one (from $\{\lnot H\}$ and $\{H\}$ — a different refutation from ours, equally valid). The last line shows that adding $\{C\}$ instead (testing whether $\mathit{KB} \models \lnot C$) saturates without $\square$: the KB together with $C$ is satisfiable, so $\lnot C$ is not entailed. Unrestricted saturation can generate exponentially many clauses; practical provers use **strategies** — unit preference, the **set-of-support** strategy (always resolve with a clause descended from the negated query) and subsumption deletion — while preserving completeness.
:::
:::

::: quiz
Resolution saturates a clause set $S$ and finds no empty clause. What follows?

- [ ] $S$ is unsatisfiable, but the proof was too long to find.
- [x] $S$ is satisfiable.
- [ ] Nothing: resolution is incomplete.
- [ ] Every clause of $S$ is valid.
::: solution
By the ground resolution theorem ([[#thm-resolution-complete]]), if $S$ were unsatisfiable the closure would contain $\square$. Saturation computes the whole closure (it is finite), so $S$ is satisfiable; the proof even constructs a model. Resolution is incomplete only in the sense that it does not *generate* every entailed clause, which refutation does not need.
:::
:::

### SAT solvers

Model checking can be made far smarter than enumeration. The **DPLL** algorithm ([[complexity/coping-with-hardness#alg-dpll]]) is backtracking search over truth assignments with unit propagation — exactly the constraint satisfaction machinery of [[artificial-intelligence/constraint-satisfaction]] specialised to clauses — and modern **CDCL** solvers add clause learning, which is resolution performed on demand to explain conflicts. Local search (WalkSAT) is the analogue of min-conflicts. Since DPLL on an unsatisfiable formula implicitly builds a resolution refutation, the exponential lower bounds for resolution on pigeonhole formulas ([[complexity/coping-with-hardness#thm-haken]]) bound these solvers too. In practice, as of 2026, SAT solvers decide industrial formulas with millions of clauses, and many AI problems — planning, scheduling, configuration, verification — are solved by encoding them into SAT.

## Horn clauses and chaining

Many knowledge bases consist of rules of the form "if these conditions hold, then that holds". These have a special form that makes inference fast.

::: definition Horn and definite clauses {#def-horn}
A **definite clause** is a clause with exactly one positive literal; it can be written as an implication $P_1 \land \dots \land P_k \Rightarrow Q$ (with $k = 0$ for a **fact** $Q$). A **Horn clause** has *at most* one positive literal; a Horn clause with none, $\lnot P_1 \lor \dots \lor \lnot P_k$, is a **goal clause** (it says the $P_i$ are not all true).
:::

For definite clauses, entailment of a symbol can be decided by **forward chaining**: start with the known facts, and whenever all premises of a rule are known, add its conclusion.

::: algorithm Forward chaining {#alg-forward-chaining}
```python
from collections import deque

def forward_chain(rules, facts, query, trace=False):
    """rules: list of (premises, conclusion) definite clauses. Linear-time forward chaining."""
    count = [len(p) for p, _ in rules]               # premises not yet known, per rule
    uses = {}                                        # symbol -> rules in whose premises it occurs
    for i, (prem, _) in enumerate(rules):
        for s in prem: uses.setdefault(s, []).append(i)
    inferred = set(); agenda = deque(facts)
    while agenda:
        p = agenda.popleft()
        if p == query: return True
        if p in inferred: continue
        inferred.add(p)
        for i in uses.get(p, []):
            count[i] -= 1
            if count[i] == 0:                        # all premises known: fire the rule
                if trace: print(f"{' & '.join(rules[i][0])} -> {rules[i][1]}")
                agenda.append(rules[i][1])
    return False
```
:::

::: theorem Forward chaining is sound, complete and linear {#thm-forward-chaining}
Let $\mathit{KB}$ be a set of definite clauses and $q$ a symbol. Forward chaining returns True if and only if $\mathit{KB} \models q$. It runs in time linear in the total size of $\mathit{KB}$.
:::

::: proof
*Soundness.* Every symbol added to the agenda is a fact of $\mathit{KB}$ or the conclusion of a rule all of whose premises were previously inferred; by induction and modus ponens, each is entailed by $\mathit{KB}$.

*Completeness.* Run the algorithm to the end (ignore the early return). Let $I$ be the final set of inferred symbols, and let $m$ be the model that makes the symbols in $I$ true and all others false. Every clause of $\mathit{KB}$ is true in $m$: a fact is in $I$; for a rule $P_1 \land \dots \land P_k \Rightarrow Q$, if all $P_j \in I$, then the rule's counter reached $0$ and $Q$ was added to the agenda and hence to $I$, so the rule is true in $m$; if some $P_j \notin I$, its premise is false in $m$ and the rule is true. So $m$ is a model of $\mathit{KB}$. If $\mathit{KB} \models q$, then $q$ is true in $m$, so $q \in I$, and the algorithm returns True when it pops $q$.

*Time.* Each symbol is processed once (later copies are skipped by the `inferred` test), and processing it decrements the counter of each rule in which it appears as a premise, once per occurrence. Each rule fires at most once (its counter reaches $0$ once). So the total work is proportional to the number of symbols plus the total number of premise occurrences — the size of $\mathit{KB}$.
:::

The model $m$ in the proof is the *least* model of $\mathit{KB}$: it makes true exactly the entailed symbols. With goal clauses as well, the same algorithm decides Horn satisfiability in linear time: a Horn set is unsatisfiable exactly when forward chaining from its definite clauses infers all the symbols of some goal clause. This is why Horn clauses — the basis of logic programming and of many rule engines — are the tractable core of propositional reasoning, while general clauses are $\mathsf{NP}$-hard.

::: example Forward chaining {#ex-forward-chaining}
A car-diagnosis knowledge base has the rules $\mathit{Key} \Rightarrow \mathit{Unlocked}$; $\mathit{Unlocked} \land \mathit{Battery} \Rightarrow \mathit{Ignition}$; $\mathit{Battery} \Rightarrow \mathit{Lights}$; $\mathit{Ignition} \land \mathit{Fuel} \Rightarrow \mathit{Running}$; $\mathit{Running} \land \mathit{Lights} \Rightarrow \mathit{CanDrive}$; $\mathit{Gauge} \Rightarrow \mathit{Fuel}$; $\mathit{Running} \land \mathit{Siren} \Rightarrow \mathit{Alarm}$, and the facts $\mathit{Key}$, $\mathit{Battery}$, $\mathit{Gauge}$. Is $\mathit{CanDrive}$ entailed? Is $\mathit{Alarm}$?
::: solution
```console
$ python3 fc.py
Key -> Unlocked
Battery -> Lights
Gauge -> Fuel
Unlocked & Battery -> Ignition
Ignition & Fuel -> Running
Running & Lights -> CanDrive
True
False
```

The facts are processed in order; each decrements the counters of the rules that mention it, and rules fire when their counters reach zero. $\mathit{CanDrive}$ is derived after six rule firings. $\mathit{Alarm}$ is not entailed: the rule for it needs $\mathit{Siren}$, which nothing provides, and in the least model (all symbols inferred true, $\mathit{Siren}$ and $\mathit{Alarm}$ false) $\mathit{Alarm}$ is false.
:::
:::

**Backward chaining** works from the query: to prove $q$, find a rule with conclusion $q$ and recursively prove its premises (avoiding loops by remembering the goals on the current path, and caching results). It is the depth-first, goal-directed counterpart of forward chaining, and it often touches far less of the KB, since it looks only at rules relevant to the question. Forward chaining is **data-driven** — natural for an agent updating its beliefs as percepts arrive — and backward chaining **goal-driven**, natural for answering questions. Prolog executes programs by backward chaining on first-order definite clauses.

::: warning Logical implication is not causation, and "not derivable" is not "false"
Two confusions are common. First, $P \Rightarrow Q$ is true whenever $P$ is false or $Q$ is true; it asserts no connection between them. "If the moon is made of cheese then $2 + 2 = 5$" is a true implication. Knowledge bases encode causal or definitional knowledge in implications, but the logic does not know that. Second, the fact that forward chaining fails to derive $\mathit{Alarm}$ means only that $\mathit{Alarm}$ is *not entailed*, not that $\lnot \mathit{Alarm}$ is entailed — the KB says nothing about sirens. Logic programming languages and databases often adopt the **closed-world assumption** ("whatever is not derivable is false", negation as failure), which is a different, non-monotonic logic: adding a fact can retract a conclusion.
:::

## First-order logic

Propositional logic cannot say "every patient with a fever needs a test" except by writing one sentence per patient. **First-order logic** (FOL), also called predicate logic, talks about **objects**, their **properties** and the **relations** among them, and quantifies over objects.

::: definition Syntax and semantics of first-order logic {#def-fol}
A first-order language has **constant symbols** ($\mathit{Ann}$, $\mathit{Bob}$), **predicate symbols** with arities ($\mathit{Patient}(x)$, $\mathit{Knows}(x, y)$), **function symbols** with arities ($\mathit{Mother}(x)$) and **variables** ($x, y, z$). **Terms** are constants, variables and $f(t_1, \dots, t_k)$ for terms $t_i$. **Atomic sentences** are $P(t_1, \dots, t_k)$ and $t_1 = t_2$; sentences are built from them with the connectives and the quantifiers $\forall x$ and $\exists x$. A **model** consists of a non-empty **domain** of objects and an **interpretation** mapping each constant to an object, each $k$-ary predicate to a $k$-ary relation on the domain and each function symbol to a function. $\forall x\, \varphi$ is true if $\varphi$ is true for every object assigned to $x$, and $\exists x\, \varphi$ if for some object. Entailment is defined as before: $\mathit{KB} \models \alpha$ if $\alpha$ is true in every model of $\mathit{KB}$.
:::

Some patterns recur. "All $P$s are $Q$s" is $\forall x\, (P(x) \Rightarrow Q(x))$ — with $\Rightarrow$, not $\land$, since $\forall x\, (P(x) \land Q(x))$ says everything is both. "Some $P$ is a $Q$" is $\exists x\, (P(x) \land Q(x))$ — with $\land$, since $\exists x\, (P(x) \Rightarrow Q(x))$ is true as soon as anything is not a $P$. Quantifiers do not commute in general: $\forall x\, \exists y\, \mathit{Knows}(x, y)$ (everyone knows someone) differs from $\exists y\, \forall x\, \mathit{Knows}(x, y)$ (someone is known by everyone); see [Maths Atlas: quantifiers](/learn/maths/lesson.php?c=proofs&l=quantifiers).

Models of FOL can have infinite domains, so model checking is impossible in general. Inference instead works syntactically. The key step is to match a rule like $\forall x\, (\mathit{Fever}(x) \Rightarrow \mathit{NeedsTest}(x))$ against a fact like $\mathit{Fever}(\mathit{Ann})$ by finding a **substitution** $\theta = \{x / \mathit{Ann}\}$ that makes them identical.

::: definition Unifier and most general unifier {#def-unifier}
A **substitution** $\theta$ maps variables to terms; $\alpha\theta$ is the result of replacing each variable $x$ in $\alpha$ by $\theta(x)$. A **unifier** of $\alpha$ and $\beta$ is a substitution with $\alpha\theta = \beta\theta$. A unifier $\theta$ is a **most general unifier** (MGU) if every unifier $\sigma$ of $\alpha$ and $\beta$ is $\theta$ followed by some further substitution: $\sigma = \theta\lambda$.
:::

::: algorithm Unification {#alg-unify}
```python
def is_var(t): return isinstance(t, str) and t[:1].islower()   # variables: lower case; constants: Upper

def walk(t, s):
    while is_var(t) and t in s: t = s[t]
    return t

def occurs(v, t, s):
    t = walk(t, s)
    return t == v or (isinstance(t, tuple) and any(occurs(v, a, s) for a in t[1:]))

def unify(x, y, s=None):
    """Most general unifier of terms x, y (extending substitution s), or None. Compound: ('f', args...)."""
    s = {} if s is None else s
    x, y = walk(x, s), walk(y, s)
    if x == y: return s
    if is_var(x): return None if occurs(x, y, s) else {**s, x: y}
    if is_var(y): return None if occurs(y, x, s) else {**s, y: x}
    if isinstance(x, tuple) and isinstance(y, tuple) and x[0] == y[0] and len(x) == len(y):
        for a, b in zip(x[1:], y[1:]):
            s = unify(a, b, s)
            if s is None: return None
        return s
    return None
```
Atoms and compound terms are tuples whose first entry is the predicate or function symbol.
:::

::: theorem Unification theorem (Robinson, 1965) {#thm-unify}
If two terms (or atomic sentences) have a unifier, then they have a most general unifier, unique up to renaming of variables, and the unification algorithm returns it; if they have no unifier, the algorithm returns failure. It always terminates.
:::

We do not prove this here; the proof is an induction on the number of variables and the size of the terms, showing that each binding the algorithm makes is forced (it is part of every unifier, up to the bindings made before) and that the **occurs check** — refusing to bind $x$ to a term containing $x$ — is exactly what is needed, since $x$ and $f(x)$ have no finite common instance. Without the occurs check (as in most Prolog implementations, for speed) unification can "succeed" on non-unifiable terms and inference becomes unsound.

::: example Unifying terms {#ex-unify}
Find most general unifiers of: (a) $\mathit{Knows}(\mathit{Ann}, x)$ and $\mathit{Knows}(y, \mathit{Mother}(y))$; (b) $\mathit{Knows}(\mathit{Ann}, x)$ and $\mathit{Knows}(x, \mathit{Bob})$; (c) $\mathit{Knows}(\mathit{Ann}, x)$ and $\mathit{Knows}(y, z)$; (d) $P(x, f(x))$ and $P(f(y), y)$.
::: solution
```console
$ python3 unify.py
('Knows', 'Ann', 'x') ('Knows', 'y', ('Mother', 'y')) -> {'y': 'Ann', 'x': ('Mother', 'Ann')}
('Knows', 'Ann', 'x') ('Knows', 'x', 'Bob') -> None
('Knows', 'Ann', 'x') ('Knows', 'y', 'z') -> {'y': 'Ann', 'x': 'z'}
('P', 'x', ('f', 'x')) ('P', ('f', 'y'), 'y') -> None
```

(a) The first arguments give $y = \mathit{Ann}$; the second then give $x = \mathit{Mother}(\mathit{Ann})$. (b) The first arguments force $x = \mathit{Ann}$ and the second $x = \mathit{Bob}$: no unifier. This failure is an artefact of *sharing* the variable name $x$ between two sentences that are meant independently; before resolving, sentences are **standardised apart** by renaming their variables, after which $\mathit{Knows}(x_1, \mathit{Bob})$ unifies with $\theta = \{x / \mathit{Bob}, x_1 / \mathit{Ann}\}$. (c) $\{y / \mathit{Ann}, x / z\}$ is most general; $\{y / \mathit{Ann}, x / \mathit{Bob}, z / \mathit{Bob}\}$ is also a unifier but less general — it is the MGU followed by $\{z / \mathit{Bob}\}$. (d) The first arguments give $x = f(y)$, and then the second need $f(f(y)) = y$, which the occurs check rejects: no finite term satisfies it.
:::
:::

### Lifted inference

With unification, the propositional rules lift to first-order logic. **Generalised modus ponens**: from $p'_1, \dots, p'_k$ and $(p_1 \land \dots \land p_k \Rightarrow q)$, if $\theta$ unifies each $p'_i$ with $p_i$, infer $q\theta$. Forward and backward chaining on first-order definite clauses use it, and are sound and complete for definite clauses (forward chaining may not terminate when function symbols allow infinitely many terms; Datalog — definite clauses without function symbols — always terminates).

For full first-order logic, sentences are converted to **clausal form**: eliminate implications, push negations inwards, standardise variables apart, eliminate existential quantifiers by **Skolemisation** (replace $\exists y$ inside the scope of $\forall x$ by a new function $F(x)$, so $\forall x\, \exists y\, \mathit{Knows}(x, y)$ becomes $\forall x\, \mathit{Knows}(x, F(x))$ — an equisatisfiable sentence), drop the universal quantifiers, and convert to CNF. The **binary resolution** rule resolves two clauses containing literals $\ell$ and $\lnot \ell'$ where $\ell$ and $\ell'$ unify with MGU $\theta$, giving the resolvent with $\theta$ applied; together with **factoring** (unifying two literals of the same clause) it is the lifted form of [[#def-resolution]].

::: theorem Soundness and refutation completeness of first-order resolution {#thm-fol-resolution}
*(Robinson, 1965.)* Binary resolution with factoring is sound, and it is refutation-complete: if a set of first-order clauses is unsatisfiable, then the empty clause can be derived from it in finitely many steps.
:::

We state this without proof. The proof combines **Herbrand's theorem** — an unsatisfiable set of clauses has a finite unsatisfiable set of *ground instances*, obtained by substituting terms built from the constants and functions of the clauses — with the ground resolution theorem ([[#thm-resolution-complete]]) and a **lifting lemma** showing that each ground resolution step is an instance of a first-order one with MGUs.

::: example A first-order refutation {#ex-fol-resolution}
Knowledge: every patient with a fever needs a test; every patient who needs a test is assigned to some doctor; Ann is a patient with a fever. Prove that Ann is assigned to someone.
::: solution
In FOL: (1) $\forall x\, (\mathit{Patient}(x) \land \mathit{Fever}(x) \Rightarrow \mathit{NeedsTest}(x))$; (2) $\forall x\, (\mathit{Patient}(x) \land \mathit{NeedsTest}(x) \Rightarrow \exists y\, \mathit{Assigned}(x, y))$; (3) $\mathit{Patient}(\mathit{Ann})$; (4) $\mathit{Fever}(\mathit{Ann})$. Query: $\exists y\, \mathit{Assigned}(\mathit{Ann}, y)$.

Clausal form, with Skolem function $D(x)$ for "the doctor assigned to $x$": (1) $\lnot \mathit{Patient}(x) \lor \lnot \mathit{Fever}(x) \lor \mathit{NeedsTest}(x)$; (2) $\lnot \mathit{Patient}(x_2) \lor \lnot \mathit{NeedsTest}(x_2) \lor \mathit{Assigned}(x_2, D(x_2))$; (3) $\mathit{Patient}(\mathit{Ann})$; (4) $\mathit{Fever}(\mathit{Ann})$; negated query (5) $\lnot \mathit{Assigned}(\mathit{Ann}, y)$ (the negation of $\exists y$ is $\forall y\, \lnot$).

Resolution: (5) with (2), unifying $\mathit{Assigned}(\mathit{Ann}, y)$ with $\mathit{Assigned}(x_2, D(x_2))$ by $\{x_2 / \mathit{Ann}, y / D(\mathit{Ann})\}$: (6) $\lnot \mathit{Patient}(\mathit{Ann}) \lor \lnot \mathit{NeedsTest}(\mathit{Ann})$. With (3): (7) $\lnot \mathit{NeedsTest}(\mathit{Ann})$. With (1), $\{x / \mathit{Ann}\}$: (8) $\lnot \mathit{Patient}(\mathit{Ann}) \lor \lnot \mathit{Fever}(\mathit{Ann})$. With (3): (9) $\lnot \mathit{Fever}(\mathit{Ann})$. With (4): $\square$. The binding $y / D(\mathit{Ann})$ even names the witness: Ann's assigned doctor — an **answer extraction** that resolution provers and Prolog exploit.
:::
:::

### The limits of first-order inference

::: theorem First-order entailment is semi-decidable {#thm-semidecidable}
There is an algorithm that, given finite $\mathit{KB}$ and $\alpha$ in first-order logic, halts with "yes" if $\mathit{KB} \models \alpha$, but there is no algorithm that always halts and answers correctly whether $\mathit{KB} \models \alpha$ *(Church and Turing, 1936)*.
:::

::: proof
*Semi-decision.* Enumerate resolution derivations from the clauses of $\mathit{KB} \land \lnot\alpha$ breadth-first (level by level: all resolvents of the clauses so far, with factoring). Each level is finite. By [[#thm-fol-resolution]], if $\mathit{KB} \models \alpha$ the empty clause appears at some finite level, and the procedure halts with "yes". (If not, it may run for ever.) *Undecidability* is the theorem of Church and Turing: the halting problem ([[theory-of-computation/decidability]]) reduces to first-order validity, by writing a sentence that describes the computation of a Turing machine and asserts that it halts. We do not reproduce the construction.
:::

So a complete first-order prover must sometimes run for ever on non-theorems; practical systems use time limits, restricted fragments (Datalog, description logics, which are decidable and underlie ontology languages such as OWL) or human guidance (interactive proof assistants). Gödel's completeness theorem (1929) says that a standard proof system derives every valid first-order sentence; his incompleteness theorem (1931) concerns something different — no consistent, effectively axiomatised theory of arithmetic proves all *true* arithmetic statements.

::: quiz
Which translation of "every student who passed the exam got a certificate" into first-order logic is correct?

- [ ] $\forall x\, (\mathit{Student}(x) \land \mathit{Passed}(x) \land \mathit{Certificate}(x))$
- [x] $\forall x\, (\mathit{Student}(x) \land \mathit{Passed}(x) \Rightarrow \mathit{Certificate}(x))$
- [ ] $\exists x\, (\mathit{Student}(x) \land \mathit{Passed}(x) \Rightarrow \mathit{Certificate}(x))$
- [ ] $\forall x\, \mathit{Student}(x) \land \mathit{Passed}(x) \Rightarrow \mathit{Certificate}(x)$
::: solution
A universally quantified statement about the members of a class uses $\Rightarrow$: for every object, *if* it is a student who passed, *then* it got a certificate. The first option says that everything is a student who passed and got a certificate. The third is true if there is any object that is not a student who passed. The fourth, read with the usual precedence, quantifies only $\mathit{Student}(x)$, leaving $x$ free in the rest.
:::
:::

::: history
George Boole's *The Laws of Thought* (1854) gave an algebra of propositions, and Gottlob Frege's *Begriffsschrift* (1879) introduced first-order logic with quantifiers. Kurt Gödel proved the completeness of first-order logic in his 1929 dissertation (published 1930), and Alonzo Church and Alan Turing proved the undecidability of first-order validity in 1936. Jacques Herbrand's thesis (1930) reduced first-order unsatisfiability to propositional. Martin Davis and Hilary Putnam (1960) and Davis, George Logemann and Donald Loveland (1962) gave the DP and DPLL procedures. John Alan Robinson's "A machine-oriented logic based on the resolution principle" (*Journal of the ACM*, 1965) introduced resolution and unification. John McCarthy's "Programs with common sense" (1958) proposed reasoning agents built on logic. Alfred Horn studied Horn clauses in 1951; Robert Kowalski's procedural interpretation of Horn clauses (1974) and Alain Colmerauer's Prolog (1972) created logic programming. William Dowling and Jean Gallier gave the linear-time Horn satisfiability algorithm in 1984.
:::

## Where this leads

Logical representations of states and actions are the basis of classical planning ([[artificial-intelligence/planning]]), where actions are described by preconditions and effects, and plans can be found by SAT solving. When knowledge is uncertain, truth values give way to degrees of belief, and the factored structure of logical knowledge bases reappears as Bayesian networks ([[artificial-intelligence/probabilistic-reasoning]]). The theory behind decidability and complexity of inference is in [[theory-of-computation/decidability]] and [[complexity]]; type systems and logic programming languages are treated in [[programming-languages]].

::: summary
- $\mathit{KB} \models \alpha$ means $\alpha$ is true in every model of $\mathit{KB}$ ([[#def-entailment]]); it holds iff $\mathit{KB} \land \lnot\alpha$ is unsatisfiable ([[#thm-refutation]]), so entailment reduces to (un)satisfiability, which is $\mathsf{coNP}$-complete.
- **Resolution** on clauses ([[#def-resolution]]) is sound ([[#lem-resolution-sound]]) and **refutation-complete**: an unsatisfiable clause set yields the empty clause ([[#thm-resolution-complete]]). DPLL and CDCL SAT solvers are the practical form of propositional reasoning.
- For **definite clauses**, forward chaining is sound, complete and linear-time ([[#thm-forward-chaining]]); backward chaining is its goal-directed counterpart.
- **First-order logic** adds objects, relations, functions and quantifiers ([[#def-fol]]); inference lifts propositional rules by **unification** ([[#alg-unify]], [[#thm-unify]]), with the occurs check.
- First-order resolution with factoring is sound and refutation-complete ([[#thm-fol-resolution]]), but first-order entailment is only **semi-decidable** ([[#thm-semidecidable]]).
:::

## Exercises

::: exercise Counting models {level=1 check="4"}
How many of the $8$ models of $P, Q, R$ satisfy $(P \lor Q) \land (Q \Rightarrow R)$? (Enter the number of models.)
::: solution
$Q \Rightarrow R$ rules out $Q = \text{true}, R = \text{false}$. If $Q$ is true, $R$ must be true and $P$ is free: $2$ models. If $Q$ is false, $P$ must be true (for $P \lor Q$) and $R$ is free: $2$ models. In all, $4$ models: $(P, Q, R) = (T, T, T)$, $(F, T, T)$, $(T, F, T)$, $(T, F, F)$.
:::
:::

::: exercise Resolvents {level=1}
List all resolvents of $\{P, \lnot Q, R\}$ and $\{Q, \lnot R, S\}$. Why is none of them useful?
::: solution
Resolving on $Q$: $\{P, R, \lnot R, S\}$. Resolving on $R$: $\{P, \lnot Q, Q, S\}$. Both are tautologies (they contain a complementary pair) and are true in every model, so they carry no information and are discarded. Note that one may *not* resolve on $Q$ and $R$ at once to obtain $\{P, S\}$: that inference is unsound (take $P$, $S$ false, $Q$ true, $R$ true: both premises are true and $\{P, S\}$ is false).
:::
:::

::: exercise Forward chaining by hand {level=1 check="3"}
With the rules $A \land B \Rightarrow C$, $C \Rightarrow D$, $B \land D \Rightarrow E$, $E \Rightarrow A$ and the facts $A$, $B$, how many rules fire before $E$ is inferred? (Enter the number of rule firings.)
::: solution
From $A$ and $B$ the first rule fires, giving $C$ ($1$); then $C \Rightarrow D$ ($2$); then $B \land D \Rightarrow E$ ($3$). $E$ is inferred after three firings. (The rule $E \Rightarrow A$ would fire next but adds nothing new.)
:::
:::

::: exercise CNF and Tseitin {level=2 check="8"}
(a) Convert $(P_1 \land Q_1) \lor (P_2 \land Q_2) \lor (P_3 \land Q_3)$ to CNF by distribution. How many clauses result? (Enter the number of clauses.) (b) How many clauses does distribution produce for $n$ such conjunctions? (c) Describe an equisatisfiable CNF of linear size.
::: solution
(a) Distributing gives one clause for each way of choosing one literal from each conjunction: $\{x_1, x_2, x_3\}$ with $x_i \in \{P_i, Q_i\}$, so $2^3 = 8$ clauses. (b) $2^n$ clauses — exponential. (c) Introduce new symbols $T_i \Leftrightarrow (P_i \land Q_i)$; it suffices to keep the direction $T_i \Rightarrow P_i \land Q_i$, i.e. clauses $\{\lnot T_i, P_i\}$ and $\{\lnot T_i, Q_i\}$, plus $\{T_1, T_2, T_3\}$. That is $2n + 1$ clauses, satisfiable exactly when the original is (a model of the original extends by setting $T_i$ to the value of $P_i \land Q_i$; a model of the new clauses makes some $T_i$ true and hence $P_i \land Q_i$ true).
:::
:::

::: exercise Horn satisfiability {level=2}
Show that a set of Horn clauses is unsatisfiable if and only if forward chaining from its definite clauses infers every symbol of some goal clause $\lnot P_1 \lor \dots \lor \lnot P_k$. Deduce a linear-time algorithm for Horn-SAT.
::: solution
If forward chaining infers $P_1, \dots, P_k$, these are entailed by the definite clauses (soundness), so every model of the definite clauses makes the goal clause false: the set is unsatisfiable. Conversely, if no goal clause has all its symbols inferred, consider the least model $m$ of the definite clauses from the proof of [[#thm-forward-chaining]] (inferred symbols true, others false). It satisfies all definite clauses, and every goal clause has some symbol $P_j$ not inferred, which is false in $m$, so $\lnot P_j$ is true and the goal clause is satisfied: the set is satisfiable. Algorithm: treat each goal clause as a rule $P_1 \land \dots \land P_k \Rightarrow \bot$, run forward chaining to completion, and report "unsatisfiable" iff $\bot$ is inferred. By [[#thm-forward-chaining]] this is linear in the size of the clause set.
:::
:::

::: exercise Is it a theorem? {level=2}
Decide, giving a resolution refutation or a countermodel: (a) $\{P \Rightarrow Q, Q \Rightarrow R\} \models P \Rightarrow R$; (b) $\{P \lor Q, \lnot P \lor R\} \models Q \lor R$; (c) $\{P \Rightarrow Q\} \models Q \Rightarrow P$.
::: solution
(a) Clauses $\{\lnot P, Q\}$, $\{\lnot Q, R\}$, and the negation of $P \Rightarrow R$, which is $P \land \lnot R$: $\{P\}$, $\{\lnot R\}$. Resolve $\{P\}$ with $\{\lnot P, Q\}$: $\{Q\}$; with $\{\lnot Q, R\}$: $\{R\}$; with $\{\lnot R\}$: $\square$. Entailed. (b) Negated query: $\{\lnot Q\}$, $\{\lnot R\}$. $\{P, Q\}$ with $\{\lnot P, R\}$: $\{Q, R\}$; with $\{\lnot Q\}$: $\{R\}$; with $\{\lnot R\}$: $\square$. Entailed — this is resolution itself. (c) Not entailed: the model $P = \text{false}$, $Q = \text{true}$ satisfies $P \Rightarrow Q$ but not $Q \Rightarrow P$ (the converse fallacy). Resolution on $\{\lnot P, Q\}$, $\{Q\}$, $\{\lnot P\}$ produces no resolvents at all, so it saturates without $\square$.
:::
:::

::: exercise Proof of the occurs check {level=3}
(a) Show that $x$ and $f(x)$ have no unifier. (b) Give an example where unification *without* the occurs check makes a resolution prover derive the empty clause from a satisfiable set of clauses. (c) Explain why the unification algorithm terminates even though it may substitute terms for variables repeatedly.
::: solution
(a) If $\theta$ unified them, $x\theta$ and $f(x)\theta = f(x\theta)$ would be the same term; but $f(x\theta)$ is strictly larger than $x\theta$ (it has one more symbol), so they cannot be equal. (b) The clauses $\{P(x, f(x))\}$ (for every $x$, $x$ is related to $f(x)$) and $\{\lnot P(y, y)\}$ (nothing is related to itself) are satisfiable: take the natural numbers with $f(n) = n + 1$ and $P$ the relation $<$. Without the occurs check, $P(x, f(x))$ and $P(y, y)$ "unify" by $y = x$, $x = f(x)$, and resolution produces $\square$ — an unsound refutation. (c) Each time the algorithm binds a variable, that variable disappears from the rest of the problem (every later occurrence is replaced through `walk`), and the occurs check guarantees that a variable is never bound to a term containing it, so no cycle of bindings arises. The number of unbound variables strictly decreases with each binding, and between bindings the recursion follows the finite structure of the two terms; so the algorithm terminates.
:::
:::

::: exercise Implementing backward chaining {level=3}
Write a propositional backward chainer for definite clauses that avoids infinite loops (for example the rules $P \Rightarrow Q$, $Q \Rightarrow P$), and test it on [[#ex-forward-chaining]]. Show that a naive depth-first implementation without loop checking does not terminate on the rules $P \Rightarrow Q$, $Q \Rightarrow P$, $R \Rightarrow Q$ with fact $R$ and query $P$ if the rules are tried in this order.
::: solution
```python
def backward_chain(rules, facts, goal, path=frozenset(), memo=None):
    """True iff goal follows from the definite clauses; path holds the goals being proved."""
    memo = {} if memo is None else memo
    if goal in facts: return True
    if goal in memo: return memo[goal]
    if goal in path: return False                  # a loop: this branch cannot help
    for premises, conclusion in rules:
        if conclusion == goal and all(backward_chain(rules, facts, p, path | {goal}, memo)
                                      for p in premises):
            memo[goal] = True; return True
    if not path: memo[goal] = False                # only cache failures found at top level
    return False

rules = [(["Key"], "Unlocked"), (["Unlocked", "Battery"], "Ignition"), (["Battery"], "Lights"),
         (["Ignition", "Fuel"], "Running"), (["Running", "Lights"], "CanDrive"),
         (["Gauge"], "Fuel"), (["Running", "Siren"], "Alarm")]
facts = {"Key", "Battery", "Gauge"}
print(backward_chain(rules, facts, "CanDrive"), backward_chain(rules, facts, "Alarm"))
loop = [(["P"], "Q"), (["Q"], "P"), (["R"], "Q")]
print(backward_chain(loop, {"R"}, "P"))
```

```console
$ python3 bc.py
True False
True
```

Failures are cached only at the top level because a failure found inside a loop check ("$P$ is already on the path") depends on the path and may not be a real failure. Without the path check, proving $P$ calls $Q$ (rule $Q \Rightarrow P$), which tries its first rule $P \Rightarrow Q$ and calls $P$ again, and so on for ever — the rule $R \Rightarrow Q$, which would succeed, is never reached. This is exactly how a Prolog program with left-recursive rules loops; tabled resolution (as in some Prolog systems) adds memoisation of this kind.
:::
:::
