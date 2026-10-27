In 1936 Alan Turing asked what a person does when computing with pencil and paper. They look at a few symbols at a time; depending on what they see and on their current "state of mind", they write or erase a symbol, move their attention to a nearby place on the paper, and change their state of mind. There are only finitely many states of mind and finitely many symbols, but the paper is unlimited. Turing argued that any such process can be carried out by a very simple machine: a finite control, an unbounded **tape** divided into cells, and a **head** that reads and writes one cell at a time and moves one cell left or right. This is the **Turing machine**.

Finite automata have no memory beyond their states, and pushdown automata can only use a stack. A Turing machine can read and rewrite its memory anywhere, and this turns out to be enough for *every* computation that any computer — or any human following rules — can perform. That claim, the **Church–Turing thesis**, is not a theorem but the foundation on which the rest of the theory stands: it is what lets us later prove that certain problems cannot be solved by *any* program.

This chapter defines Turing machines precisely, shows how to program them, proves that natural extensions (several tapes, nondeterminism, enumerators) add no power, discusses the Church–Turing thesis, and builds a **universal Turing machine** — a single machine that can simulate any other machine given its description, the theoretical ancestor of the stored-program computer and of every interpreter.

## The Turing machine

::: definition Turing machine {#def-tm}
A **Turing machine** (TM) is a 7-tuple $M = (Q, \Sigma, \Gamma, \delta, q_0, q_{\text{acc}}, q_{\text{rej}})$ where $Q$, $\Sigma$, $\Gamma$ are finite sets and

1. $Q$ is the set of **states**;
2. $\Sigma$ is the **input alphabet**, not containing the **blank** symbol $\sqcup$;
3. $\Gamma$ is the **tape alphabet**, with $\sqcup \in \Gamma$ and $\Sigma \subseteq \Gamma$;
4. $\delta\colon (Q \setminus \{q_{\text{acc}}, q_{\text{rej}}\}) \times \Gamma \to Q \times \Gamma \times \{L, R\}$ is the **transition function**;
5. $q_0 \in Q$ is the start state, and $q_{\text{acc}} \ne q_{\text{rej}}$ are the **accept** and **reject** states.
:::

The tape has a left end and is infinite to the right. Initially it holds the input $w = w_1 \cdots w_n$ in its leftmost $n$ cells, followed by blanks; the head is on the leftmost cell and the machine is in $q_0$. If $\delta(q, a) = (r, b, D)$, then in state $q$ reading $a$ the machine writes $b$ in place of $a$, moves the head one cell in direction $D$ (left or right) and enters state $r$. A move left from the leftmost cell leaves the head where it is. The machine **halts** as soon as it enters $q_{\text{acc}}$ or $q_{\text{rej}}$; otherwise it runs for ever.

To describe a computation we record the whole situation in a string.

::: definition Configurations and acceptance {#def-tm-config}
A **configuration** of $M$ is written $u\,q\,v$ with $u, v \in \Gamma^*$ and $q \in Q$: the tape holds $uv$ followed by blanks, the machine is in state $q$, and the head is on the first symbol of $v$ (on a blank if $v = \varepsilon$). Configuration $C$ **yields** $C'$ if one move of $M$ leads from $C$ to $C'$: for $a, b, c \in \Gamma$ and $u, v \in \Gamma^*$,

- $u\,a\,q\,b\,v$ yields $u\,q'\,a\,c\,v$ if $\delta(q, b) = (q', c, L)$, and $q\,b\,v$ yields $q'\,c\,v$ in that case (left end);
- $u\,q\,b\,v$ yields $u\,c\,q'\,v$ if $\delta(q, b) = (q', c, R)$.

The **start configuration** on input $w$ is $q_0\,w$. An **accepting** (respectively **rejecting**) configuration is one whose state is $q_{\text{acc}}$ ($q_{\text{rej}}$); both are **halting**. $M$ **accepts** $w$ if there is a sequence of configurations $C_1, \dots, C_k$ in which $C_1$ is the start configuration, each $C_i$ yields $C_{i+1}$, and $C_k$ is accepting. The **language of $M$** is $L(M) = \{w : M \text{ accepts } w\}$.
:::

On any input, a Turing machine does one of three things: it **accepts**, it **rejects**, or it **loops** (never halts). This third possibility is new — every DFA and PDA reading its input once stops at the end — and it is the source of everything interesting in the rest of the course.

::: definition Recognisable and decidable languages {#def-recognisable}
A language $L$ is **Turing-recognisable** (or *recursively enumerable*) if $L = L(M)$ for some TM $M$. A TM that halts on every input is a **decider**; a language is **decidable** (or *recursive*) if some decider recognises it. A decider for $L$ **decides** $L$.
:::

A recogniser for $L$ must accept every string of $L$, and must not accept any other string — but on strings outside $L$ it may reject *or loop*. A decider must always give an answer. [[theory-of-computation/decidability]] shows that the two notions are genuinely different.

### Programming a Turing machine

Turing machines are programmed by moving back and forth, marking symbols as they are processed. Here is a machine for a language that no pushdown automaton can recognise ([[theory-of-computation/pushdown-automata#ex-anbncn]]).

::: example A Turing machine for $a^nb^nc^n$ {#ex-tm-abc}
Design a TM deciding $T = \{a^nb^nc^n : n \ge 0\}$, first in words, then as a transition table.
::: solution
*In words.* Repeatedly: cross off the leftmost remaining $a$ (replace it by $X$), then the leftmost $b$ (by $Y$), then the leftmost $c$ (by $Z$), and return to the left. When no $a$ is left, check that only $Y$s and $Z$s remain. Reject whenever the expected symbol is not found.

*Formally*, with $\Gamma = \{a, b, c, X, Y, Z, \sqcup\}$ and every missing entry going to $q_{\text{rej}}$:

| state | meaning | transitions |
|---|---|---|
| $q_1$ | at the first uncrossed symbol | $a \to X, R, q_2$; $\ Y \to Y, R, q_5$; $\ \sqcup \to \sqcup, R, q_{\text{acc}}$ |
| $q_2$ | find a $b$ | $a \to a, R$; $\ Y \to Y, R$; $\ b \to Y, R, q_3$ |
| $q_3$ | find a $c$ | $b \to b, R$; $\ Z \to Z, R$; $\ c \to Z, L, q_4$ |
| $q_4$ | return left | $a, b, Y, Z$: move $L$; $\ X \to X, R, q_1$ |
| $q_5$ | check the rest | $Y \to Y, R$; $\ Z \to Z, R$; $\ \sqcup \to \sqcup, R, q_{\text{acc}}$ |

(An entry without a new state stays in the same state, and "move $L$" writes back the symbol read.) On $abc$ the computation is

$$
q_1abc \vdash Xq_2bc \vdash XYq_3c \vdash Xq_4YZ \vdash q_4XYZ \vdash Xq_1YZ \vdash XYq_5Z \vdash XYZq_5 \vdash XYZ\sqcup q_{\text{acc}},
$$

eight moves. Each pass crosses off one symbol of each kind and costs $O(n)$ moves, and there are $n$ passes, so the machine halts within $O(n^2)$ steps on every input: it is a decider.
:::
:::

The table is the whole program, and a simulator is a dozen lines. Missing transitions reject, and the tape grows to the right as needed:

```python
BLANK = "_"

def run(delta, w, start="q1", max_steps=10_000):
    """Simulate a single-tape TM; missing transitions go to the reject state."""
    tape, head, q, steps = list(w) or [BLANK], 0, start, 0
    while q not in ("acc", "rej") and steps < max_steps:
        q, write, move = delta.get((q, tape[head]), ("rej", tape[head], "R"))
        tape[head] = write
        head = max(0, head + (1 if move == "R" else -1))   # left end: stay put
        if head == len(tape):
            tape.append(BLANK)                # the tape is unbounded to the right
        steps += 1
    return q, steps, "".join(tape).rstrip(BLANK)

# a^n b^n c^n: cross off one a (X), one b (Y), one c (Z) per pass
D = {("q1", "a"): ("q2", "X", "R"), ("q1", "Y"): ("q5", "Y", "R"), ("q1", "_"): ("acc", "_", "R"),
     ("q2", "a"): ("q2", "a", "R"), ("q2", "Y"): ("q2", "Y", "R"), ("q2", "b"): ("q3", "Y", "R"),
     ("q3", "b"): ("q3", "b", "R"), ("q3", "Z"): ("q3", "Z", "R"), ("q3", "c"): ("q4", "Z", "L"),
     **{("q4", s): ("q4", s, "L") for s in "abYZ"}, ("q4", "X"): ("q1", "X", "R"),
     ("q5", "Y"): ("q5", "Y", "R"), ("q5", "Z"): ("q5", "Z", "R"), ("q5", "_"): ("acc", "_", "R")}

if __name__ == "__main__":
    for w in ["", "abc", "aabbcc", "aabbc", "abcabc", "aaabbbccc"]:
        q, steps, tape = run(D, w)
        print(f"{w!r:12} {q}  after {steps:3} steps   tape {tape}")
```

```console
$ python3 tm.py
''           acc  after   1 steps   tape 
'abc'        acc  after   8 steps   tape XYZ
'aabbcc'     acc  after  23 steps   tape XXYYZZ
'aabbc'      rej  after  14 steps   tape XXYYZ
'abcabc'     rej  after   8 steps   tape XYZabc
'aaabbbccc'  acc  after  46 steps   tape XXXYYYZZZ
```

The step limit `max_steps` is ours, not the machine's: a real Turing machine may run for ever, and the simulator would then stop with the state neither `acc` nor `rej`. Running the program on every string over $\{a, b, c\}$ of length at most $9$ and comparing with the definition of $T$ finds no disagreement.

::: widget graph
nodes: q1@0,1; q2@2,2; q3@4,2; q4@3,0; q5@2,-1; acc@5,-1
edges: q1>q2; q2>q2; q2>q3; q3>q3; q3>q4; q4>q4; q4>q1; q1>q5; q5>q5; q5>acc; q1>acc
algorithm: dfs
start: q1
caption: The state diagram of the machine in [[#ex-tm-abc]] (labels omitted; see the table). The cycle $q_1 \to q_2 \to q_3 \to q_4 \to q_1$ is one pass that crosses off an $a$, a $b$ and a $c$; the exit through $q_5$ checks that nothing else remains. The reject state and the arrows into it are not drawn, following the usual convention. Depth-first search from $q_1$ shows that every state is reachable — but unlike for finite automata, reachability in the diagram tells us little about the *language*, because what the machine does depends on the tape.
:::

::: quiz
On input $aabbc$ the machine of [[#ex-tm-abc]] rejects. In which state, reading which symbol, does it reject?
- [ ] $q_1$ reading $a$
- [ ] $q_2$ reading $c$
- [x] $q_3$ reading $\sqcup$
- [ ] $q_5$ reading $b$
::: solution
The first pass crosses off $a$, $b$ and $c$, giving $XaYbZ$. The second pass crosses off the second $a$ ($XXYbZ$) and the second $b$ ($XXYYZ$), and then $q_3$ moves right over $Z$ looking for a $c$, finds the blank, and has no transition: reject. The program prints the tape at that point as `XXYYZ`.
:::
:::

## Variants of the model

Turing's definition is deliberately minimal. Many variants are more convenient — and all of them recognise exactly the same languages. This robustness is the first piece of evidence that the model captures something fundamental.

Small changes are easy to absorb: allowing the head to **stay put** ($D = S$) is simulated by a move right followed by a move left; a **two-way infinite** tape is simulated by folding it at the origin onto two tracks of a one-way tape. More substantial are multiple tapes, nondeterminism and enumerators.

### Multitape machines

A **$k$-tape Turing machine** has $k$ tapes, each with its own head; the input starts on tape $1$ and the others are blank. Its transition function is $\delta\colon Q \times \Gamma^k \to Q \times \Gamma^k \times \{L, R, S\}^k$: it reads all $k$ symbols under the heads, writes $k$ new symbols and moves each head independently.

::: theorem Multitape machines are no more powerful {#thm-multitape}
Every $k$-tape TM $M$ has an equivalent single-tape TM $S$. If $M$ halts within $t(n) \ge n$ steps on inputs of length $n$, then $S$ halts within $O(t(n)^2)$ steps.
:::

::: proof
$S$ keeps the contents of all $k$ tapes on its single tape, separated by a new symbol $\#$: $\#\,w_1\,\#\,w_2\,\# \cdots \#\,w_k\,\#$. To record the head positions it uses a **dotted** copy $\dot a$ of each tape symbol $a$, marking the symbol under each virtual head. On input $w$, $S$ first writes $\#\dot w_1 w_2 \cdots w_n \# \dot\sqcup \# \cdots \# \dot\sqcup \#$.

To simulate one move of $M$, $S$ sweeps from the left $\#$ to the right end, remembering in its finite control the $k$ dotted symbols (there are finitely many possibilities, so this is a finite amount of state). It now knows $M$'s transition. A second sweep writes the new symbols and moves the dots left or right. If a dot moves onto a $\#$ — the virtual head has reached unused space on its tape — $S$ shifts the whole tape contents from that point one cell to the right and writes a blank there. When $M$ halts, $S$ halts in the same way. So $S$ accepts, rejects or loops exactly when $M$ does.

*Time.* In $t(n)$ steps each of $M$'s heads visits at most $t(n)$ cells, so the active part of $S$'s tape has length $O(k \cdot t(n)) = O(t(n))$ (using $t(n) \ge n$ for the input). One simulated step consists of two sweeps and at most $k$ shifts, each $O(t(n))$, and there are $t(n)$ steps: $O(t(n)^2)$ in all, plus $O(n)$ for the set-up.
:::

Multitape machines are often far easier to program, and faster.

::: example Two tapes for $w\#w$ {#ex-two-tape}
Describe a 2-tape TM deciding $\{w\#w : w \in \{0,1\}^*\}$ in $O(n)$ steps.
::: solution
1. Move head 1 right over the input, copying each symbol to tape 2, until head 1 reads $\#$ (reject if there is no $\#$). Tape 2 now holds the part before $\#$.
2. Move head 2 back to the left end of tape 2 (moving left until the leftmost cell; a marker written in the first cell in step 1 tells the machine when it has arrived).
3. Move head 1 right past $\#$. Now move both heads right together, comparing the symbols under them; reject at the first difference.
4. Accept if both heads reach a blank at the same time; reject if only one does.

Each step is one sweep, so the machine makes $O(n)$ moves. A single-tape machine must instead zig-zag across the $\#$ once for each symbol, which takes $\Theta(n^2)$ moves — the quadratic gap of [[#thm-multitape]] is sometimes real.
:::
:::

### Nondeterministic machines

A **nondeterministic** TM has $\delta\colon Q \times \Gamma \to \mathcal{P}(Q \times \Gamma \times \{L, R\})$; at each step it may have several possible moves. Its computations form a **tree** whose nodes are configurations, and it accepts $w$ if *some* branch reaches an accepting configuration.

::: theorem Nondeterminism adds no power to Turing machines {#thm-ntm}
Every nondeterministic TM $N$ has an equivalent deterministic TM $D$. If every branch of $N$ halts on every input, $D$ can be made a decider.
:::

::: proof
$D$ searches $N$'s computation tree **breadth first**. (Depth-first search would be wrong: it could follow an infinite branch for ever and miss an accepting configuration on another branch.) Let $b$ be the largest number of choices $N$ has in any situation. Each node of the tree is identified by an **address**: a string over $\{1, \dots, b\}$ giving the choices made on the way from the root. $D$ uses three tapes — the input (never changed), a simulation tape, and an address tape — and repeats:

1. copy the input to the simulation tape;
2. simulate $N$ on it, using the address tape to make the choices: at the $i$-th step take the choice given by the $i$-th symbol of the address (if that choice does not exist, or the address runs out, abandon this branch); if an accepting configuration is reached, **accept**;
3. replace the address by the next string in shortlex order ([[theory-of-computation/finite-automata#def-lang-ops]]) and go back to 1.

Shortlex order visits all addresses of length $\ell$ before any of length $\ell + 1$, so every node of the tree is eventually simulated, in breadth-first order. If $N$ has an accepting branch, $D$ reaches its accepting node after finitely many rounds and accepts. If not, $D$ never accepts. So $L(D) = L(N)$, and by [[#thm-multitape]] $D$ can be converted to a single-tape machine.

For the decider claim: if every branch halts, the tree has finite branching and no infinite path, so by **König's lemma** it is finite, of some depth $h$. Modify $D$ to also record whether, during the round of addresses of length $\ell$, any branch was still running after $\ell$ steps. If after some full round no branch was still running and none accepted, every branch has halted without accepting, and $D$ rejects. This happens at the latest after the round $\ell = h$.
:::

::: example Guessing a factor {#ex-ntm-composite}
Give a nondeterministic TM that decides $\mathrm{COMP} = \{1^n : n \text{ is composite}\}$, and describe what the deterministic simulation of [[#thm-ntm]] does on $1^6$.
::: solution
On input $1^n$, the machine (with three tapes) nondeterministically writes a string $1^p$ on tape 2 and $1^q$ on tape 3, choosing at each step whether to write another $1$ or stop, up to length $n$; it rejects unless $2 \le p, q$. Then it checks deterministically whether $p \cdot q = n$ — for each $1$ on tape 2, sweep head 3 across tape 3 while advancing head 1 one cell per $1$ — and accepts iff the input is used up exactly. Every branch halts, since the guesses are bounded by $n$. Some branch accepts iff $n = pq$ with $p, q \ge 2$, i.e. iff $n$ is composite.

On $1^6$ the computation tree has a branch for each pair $(p, q)$ with $0 \le p, q \le 6$; the breadth-first simulation tries them in order of the length of their addresses, and finds the accepting branches $(2, 3)$ and $(3, 2)$. A deterministic machine could of course just try every divisor — the point is that the nondeterministic machine *guesses a certificate* (the factorisation) and *checks* it, a pattern that becomes the definition of $\mathsf{NP}$ in [[complexity]].
:::
:::

The simulation may take time exponential in the depth of the tree: $N$ running for $t$ steps has up to $b^t$ branches. Whether this exponential cost is necessary for *polynomial-time* machines is the $\mathsf{P}$ versus $\mathsf{NP}$ question of [[complexity]].

::: widget graph
nodes: C0@3,3; C1@1.5,2; C2@4.5,2; C3@0.5,1; C4@2.5,1; C5@4.5,1; C6@0,0; C7@1,0; C8@3,0; C9@4,0; C10@5,0
edges: C0>C1; C0>C2; C1>C3; C1>C4; C2>C5; C3>C6; C3>C7; C4>C8; C5>C9; C5>C10
algorithm: bfs
start: C0
caption: A nondeterministic computation tree: $C_0$ is the start configuration and each arrow is one possible move. Step through breadth-first search, which is what the simulation of [[#thm-ntm]] does: it visits the configurations level by level, $C_0$, then $C_1, C_2$, then $C_3, C_4, C_5$, and so on. Suppose $C_9$ is accepting and the branch through $C_3$ and $C_6$ continues for ever below the picture: breadth-first search still reaches $C_9$, whereas a depth-first search that went left first would never come back.
:::

### Enumerators

An **enumerator** is a TM with an attached printer. It starts on a blank tape and from time to time prints a string; it may run for ever, printing infinitely many strings, in any order and with repetitions. The language it **enumerates** is the set of strings it ever prints. This is the origin of the name *recursively enumerable*.

::: theorem Recognisers and enumerators {#thm-enumerator}
A language is Turing-recognisable if and only if some enumerator enumerates it.
:::

::: proof
*($\Leftarrow$)* Given an enumerator $E$, build a recogniser $M$: on input $w$, run $E$, and every time $E$ prints a string, compare it with $w$; if they are equal, accept. $M$ accepts exactly the strings that $E$ eventually prints (and loops on the others).

*($\Rightarrow$)* Given a recogniser $M$, let $s_1, s_2, s_3, \dots$ be all strings of $\Sigma^*$ in shortlex order. The enumerator $E$ does not simply run $M$ on $s_1$, then $s_2$, … — it could get stuck for ever on a string where $M$ loops. Instead it **dovetails**: for $i = 1, 2, 3, \dots$, run $M$ for $i$ steps on each of $s_1, \dots, s_i$, and print every $s_j$ that is accepted within those $i$ steps. If $M$ accepts $s_j$, it does so within some number $t$ of steps, and $s_j$ is printed in round $\max(j, t)$ (and again in every later round, which is allowed). Strings that $M$ does not accept are never printed.
:::

Dovetailing — interleaving infinitely many possibly infinite computations so that each gets an unbounded share of time — is a technique we will meet again.

## The Church–Turing thesis

In the 1930s several mathematicians independently proposed precise definitions of "effectively computable function": Alonzo Church's **λ-calculus**, the **general recursive functions** of Gödel, Herbrand and Kleene, Emil Post's **production systems**, and Turing's machines. Each was quickly proved equivalent to the others: a function is λ-definable iff it is general recursive iff it is Turing-computable. Since then every model of computation proposed — register machines, random-access machines, cellular automata, every general-purpose programming language with unbounded memory — has turned out to compute exactly the same functions.

::: definition Church–Turing thesis {#def-church-turing}
**Church–Turing thesis.** Every function that can be computed by an effective procedure — a finite set of instructions that can be followed mechanically, without insight or ingenuity, using unbounded time and memory — can be computed by a Turing machine. Equivalently, the intuitive notion of an **algorithm** coincides with the formal notion of a Turing machine that halts on every input.
:::

The thesis cannot be proved, because one side of it — "effective procedure" — is informal; it is a claim about how a mathematical definition relates to the world. The evidence for it is of three kinds: Turing's analysis of what a human computer does, which seems to leave nothing out; the equivalence of all the independently proposed models; and the absence, in ninety years, of any counterexample. It is in the same position as a well-tested law of physics.

In this course the thesis plays a practical role. We describe Turing machines at three levels: a **formal description** (states and a transition table, as in [[#ex-tm-abc]]); an **implementation description** (in words, saying how the head moves and what is written on the tapes); and a **high-level description** (an algorithm in ordinary language or pseudocode, ignoring the tape). The thesis, together with theorems like [[#thm-multitape]], is what lets us move freely from the third level to the first: if we can describe an algorithm clearly, a Turing machine for it exists. From now on we mostly write high-level descriptions.

::: warning What the Church–Turing thesis does not say
The thesis is about *what* can be computed, not *how fast*. A Turing machine can simulate a modern computer, but with a polynomial slowdown ([[#thm-multitape]] shows a quadratic one for one feature alone), so statements such as "this takes $O(n \log n)$ time" depend on the model, and complexity theory fixes models carefully ([[complexity]]). The **extended** (or *strong*) Church–Turing thesis — that every physically realisable computer can be simulated by a probabilistic Turing machine with only polynomial slowdown — is a different and much more doubtful claim: quantum computers appear to violate it, since they can factor integers in polynomial time and no classical polynomial-time algorithm for that is known ([[quantum-computing]]). Quantum computers do *not* violate the Church–Turing thesis itself; they compute nothing a Turing machine cannot. Nor does the thesis claim that the brain or the universe "is" a Turing machine; it concerns effective procedures.
:::

## Encodings and the universal machine

Algorithms take as input not only strings and numbers but graphs, grammars, automata and programs. A Turing machine only reads strings, so we fix an **encoding**: for an object $O$, $\langle O\rangle$ denotes its representation as a string over some fixed alphabet, and $\langle O_1, O_2 \rangle$ the encoding of a pair. Any reasonable encoding will do, as long as a Turing machine can decode it and check whether a given string is a valid encoding. For example a DFA can be encoded as the list of its states, its alphabet, its transition table, its start state and its accepting states, written in binary with separators; a graph by its vertex list and edge list ([[data-structures/graph-representations]]).

In particular, Turing machines themselves can be encoded. Number the states $q_1, \dots, q_m$ and the tape symbols $a_1, \dots, a_s$; write each transition $\delta(q_i, a_j) = (q_k, a_l, D)$ as $0^i10^j10^k10^l10^{d}$ with $d = 1$ for $L$ and $d = 2$ for $R$; and separate transitions by $11$. Then every TM $M$ has a binary description $\langle M\rangle$, and every binary string is either the description of some machine or can be decided not to be.

::: theorem Universal Turing machine {#thm-utm}
There is a Turing machine $U$ such that for every TM $M$ and string $w$, $U$ on input $\langle M, w\rangle$ accepts if $M$ accepts $w$, rejects if $M$ rejects $w$, and loops if $M$ loops on $w$. Moreover $U$ simulates $M$ with only a polynomial slowdown: $t$ steps of $M$ take a number of steps of $U$ polynomial in $t$ and $\lvert\langle M\rangle\rvert$.
:::

::: proof
We give an implementation description of a 3-tape machine; [[#thm-multitape]] converts it to one tape. Tape 1 holds $\langle M, w\rangle$. $U$ first checks that the input is a valid encoding (if not, it rejects). It leaves $M$'s transition list on tape 1, writes the initial contents of $M$'s tape on tape 2, each of $M$'s tape symbols $a_j$ encoded as the block $0^j$ separated by $1$s; and it writes $0$, the code of $M$'s start state $q_1$, on tape 3.

To simulate one move of $M$, $U$ reads the code of the current state (tape 3) and of the symbol in the block under its head on tape 2, and scans the transition list on tape 1 for the matching entry $0^i10^j1\cdots$; comparing codes of unary numbers is a simple back-and-forth matching. It then rewrites the symbol block on tape 2 (shifting the rest of tape 2 if the new block has a different length — or, to avoid shifting, pads every block to the same length, the number of $M$'s symbols), moves to the neighbouring block, and overwrites tape 3 with the new state's code. If the new state is $M$'s accept or reject state, $U$ accepts or rejects. Each simulated step scans $\langle M\rangle$ once and touches $O(\lvert\langle M\rangle\rvert)$ cells of the other tapes, so $t$ steps cost $O(t \cdot \lvert\langle M\rangle\rvert)$ moves of the 3-tape machine, and by [[#thm-multitape]] a polynomial number on one tape. $U$ halts exactly when $M$ does, with the same result.
:::

The universal machine is a single, fixed program that can run any other program given as data. That is precisely the idea of the **stored-program computer** — instructions held in the same memory as data — described in John von Neumann's 1945 report on the EDVAC, and of every interpreter ([[programming-1/computation-and-programs]] shows Python's). It also makes possible the self-reference at the heart of [[theory-of-computation/decidability]]: machines that take machines, including themselves, as input. Remarkably small universal machines exist; Marvin Minsky gave one with 7 states and 4 symbols in 1962.

::: example A two-stack machine is a Turing machine {#ex-two-stacks}
A pushdown automaton with *two* stacks (moves may read an input symbol, pop and push on each stack) is as powerful as a Turing machine. Explain why.
::: solution
*A TM can simulate a two-stack PDA:* keep each stack on its own tape, top at the right end; by [[#thm-multitape]] a single tape suffices.

*A two-stack PDA can simulate a TM $M$:* first copy the input onto stack 1 (read it all, pushing) and then move everything to stack 2, so that stack 2 holds $w$ with $w_1$ on top. From then on the TM tape is represented by the two stacks: stack 1 holds the cells to the left of the head (nearest cell on top) and stack 2 holds the cell under the head and everything to its right (head cell on top); an empty stack 2 means the head is on a blank. A move $\delta(q, a) = (r, b, R)$ pops $a$ from stack 2 and pushes $b$ on stack 1. A move $\delta(q, a) = (r, b, L)$ pops $a$ from stack 2, pushes $b$ on stack 2, then pops the top $c$ of stack 1 (if stack 1 is empty, the head is at the left end and stays) and pushes $c$ on stack 2. The finite control tracks $M$'s state, and the PDA accepts when $M$ does. So two stacks give full Turing power, while one stack gives only the context-free languages — a sharp illustration of how little memory structure separates the levels of the hierarchy.
:::
:::

::: quiz
Which of the following recognise exactly the Turing-recognisable languages?
- [x] Nondeterministic Turing machines
- [x] Turing machines with a tape infinite in both directions
- [ ] Pushdown automata with one stack
- [x] Finite automata with two stacks
- [x] Enumerators
::: solution
All the variants recognise the same languages ([[#thm-ntm]], the folding argument, [[#ex-two-stacks]], [[#thm-enumerator]]). A single stack gives only the context-free languages, a proper subset: $\{a^nb^nc^n\}$ is decidable but not context-free.
:::
:::

::: history
Alan Turing's "On computable numbers, with an application to the Entscheidungsproblem" was received by the London Mathematical Society in May 1936 and published in its *Proceedings* in 1936–37. It defined the machines, the universal machine and an unsolvable problem, and answered negatively the *Entscheidungsproblem* — whether there is an algorithm deciding validity in first-order logic — posed by David Hilbert and Wilhelm Ackermann in 1928. Alonzo Church had answered the same question a few weeks earlier with the λ-calculus, in "An unsolvable problem of elementary number theory" (1936) and "A note on the Entscheidungsproblem" (1936). Emil Post independently described a model close to Turing's in "Finite combinatory processes — formulation 1" (1936), and Stephen Kleene developed the theory of recursive functions and gave the thesis its classical formulation in *Introduction to Metamathematics* (1952). Turing, then Church's doctoral student at Princeton, proved the equivalence of his machines with λ-definability in 1937.
:::

## Where this leads

With a precise definition of "algorithm" we can at last prove that some problems have no algorithm. [[theory-of-computation/decidability]] shows that many questions about automata and grammars are decidable, and then uses diagonalisation and the universal machine to prove that the **halting problem** — does a given program halt on a given input? — is undecidable. [[theory-of-computation/reductions]] spreads that impossibility to a whole family of problems about programs. Measuring the *resources* Turing machines need — time and space — is the subject of [[complexity]].

::: summary
- A **Turing machine** ([[#def-tm]]) has a finite control and an unbounded tape it can read, write and move along in both directions; on each input it **accepts**, **rejects** or **loops** ([[#def-tm-config]]).
- A language is **Turing-recognisable** if some TM accepts exactly its strings, and **decidable** if some TM that always halts does ([[#def-recognisable]]).
- Machines are programmed by marking symbols and sweeping; [[#ex-tm-abc]] decides $\{a^nb^nc^n\}$, which no PDA can recognise.
- Multitape TMs ([[#thm-multitape]], quadratic slowdown), nondeterministic TMs ([[#thm-ntm]], breadth-first search of the computation tree, exponential slowdown), enumerators ([[#thm-enumerator]], dovetailing) and two-stack automata all recognise the same languages.
- The **Church–Turing thesis** ([[#def-church-turing]]) identifies algorithms with Turing machines; it is a thesis about the world, supported by evidence, not a theorem — and it says nothing about efficiency.
- Machines can be encoded as strings, and a **universal TM** ([[#thm-utm]]) simulates any machine from its description: the stored-program idea.
:::

## Exercises

::: exercise Counting steps {level=1 check="77"}
How many moves does the machine of [[#ex-tm-abc]], as implemented by the simulator, make on input $a^4b^4c^4$? (Enter the number.) Find a formula for the number of moves on $a^nb^nc^n$.
::: solution
The simulator reports $8, 23, 46$ moves for $n = 1, 2, 3$. The differences are $15, 23$, growing by $8$, so the count is a quadratic $f(n) = 4n^2 + 3n + 1$; this gives $f(4) = 64 + 12 + 1 = 77$, which the simulator confirms. Derivation: pass $k$ (for $k = 1, \dots, n$, numbering cells from $0$) starts in $q_1$ on the $k$-th $a$, in cell $k - 1$. It moves right to the $k$-th $c$, in cell $2n + k - 1$: $2n$ moves (crossing off an $a$ and a $b$ on the way). Crossing off the $c$ is one move, to the left. Then $q_4$ moves left to the $X$ in cell $k - 1$, another $2n - 1$ moves, and one move right from the $X$ starts the next pass. So each pass takes $4n + 1$ moves, and the $n$ passes take $4n^2 + n$. Finally $q_1$ reads the first $Y$ and $q_5$ moves right over $2n$ cells of $Y$s and $Z$s and makes one accepting move on the blank: $2n + 1$ moves. The total is $4n^2 + 3n + 1$.
:::
:::

::: exercise A configuration trace {level=1}
Write out the sequence of configurations of the machine of [[#ex-tm-abc]] on input $ab$, and say how it halts.
::: solution
$q_1ab \vdash Xq_2b \vdash XYq_3\sqcup$. In $q_3$ reading $\sqcup$ there is no transition, which by our convention means a move to $q_{\text{rej}}$: reject after three moves (counting the rejecting move). The simulator agrees, since $ab$ is not of the form $a^nb^nc^n$.
:::
:::

::: exercise Variants {level=1}
Explain how a single-tape TM with moves $\{L, R, S\}$ ("stay put") is simulated by an ordinary TM, and how a TM with a tape infinite in both directions is simulated by one with a left end.
::: solution
*Stay put:* replace each transition $\delta(q, a) = (r, b, S)$ by $\delta(q, a) = (r', b, R)$ with a new state $r'$ whose transitions are $\delta(r', c) = (r, c, L)$ for every $c$: move right and immediately back. (At the left end a move left stays, so moving right first is the safe order.)

*Two-way infinite tape:* fold the tape at cell $0$. The one-way tape has two tracks — each cell holds a pair of symbols, a finite tape alphabet $\Gamma \times \Gamma$ plus a left-end mark. The upper track holds cells $0, 1, 2, \dots$ and the lower track cells $-1, -2, \dots$. The finite control remembers which track the head is on; on the lower track, left and right are exchanged; and crossing between cell $0$ and cell $-1$ happens at the marked leftmost cell.
:::
:::

::: exercise Implementation description {level=2}
Give an implementation-level description of a single-tape TM deciding $\{w\#w : w \in \{0,1\}^*\}$, and show it runs in $O(n^2)$ time.
::: solution
Zig-zag across the $\#$, crossing off matching symbols. 1. If the first unmarked symbol to the left of $\#$ is $\#$ itself (everything on the left is crossed off), go to step 4. Otherwise remember it ($0$ or $1$) in the state, cross it off with $x$, and move right past $\#$ to the first unmarked symbol on the right. 2. If it differs from the remembered symbol (or is blank), reject; otherwise cross it off. 3. Move left back to the leftmost unmarked symbol (past $\#$ and the crossed-off symbols) and go to step 1. 4. Move right past $\#$ and the crossed-off symbols; accept if the next symbol is blank, reject otherwise.

Each round crosses off two symbols and moves at most twice across the input, $O(n)$ moves; there are at most $n/2$ rounds; so $O(n^2)$ in total. (It is known that every single-tape TM for this language needs $\Omega(n^2)$ time in the worst case.)
:::
:::

::: exercise Closure of decidable languages {level=2}
Prove that the decidable languages are closed under union, intersection, complement, concatenation and star, and that the recognisable languages are closed under union, intersection, concatenation and star.
::: solution
Let $M_1, M_2$ decide $A_1, A_2$. *Complement:* swap accept and reject. *Union/intersection:* run $M_1$, then $M_2$ (both halt), and combine the answers. *Concatenation:* for each of the $n + 1$ ways to split $w = xy$, run $M_1$ on $x$ and $M_2$ on $y$; accept if some split gives two acceptances. *Star:* for $w \ne \varepsilon$, try every way of cutting $w$ into non-empty pieces (finitely many, $2^{n-1}$) and run $M_1$ on each piece; accept $\varepsilon$ immediately.

For recognisers $M_1, M_2$ that may loop: *intersection* — run $M_1$ then $M_2$ (if either loops, $w$ is not in both anyway). *Union* — running one after the other fails if the first loops on a string the second accepts; instead run them **in parallel**, alternating one step of each, and accept if either accepts. *Concatenation and star* — nondeterministically guess the split (or the cut points) and run the recognisers on the pieces, then convert the nondeterministic machine to a deterministic one by [[#thm-ntm]]; equivalently, dovetail over all splits. (Complement is missing for recognisable languages, and for good reason: [[theory-of-computation/decidability]].)
:::
:::

::: exercise Enumerating in order {level=2}
Prove that a language $L$ is decidable if and only if some enumerator enumerates it in shortlex order (each string at most once, shorter strings first).
::: solution
($\Rightarrow$) If $M$ decides $L$, the enumerator runs $M$ on $s_1, s_2, s_3, \dots$ in shortlex order and prints those accepted. Each run halts, so the enumerator reaches every string, and the order is shortlex.

($\Leftarrow$) If $L$ is finite it is decidable (a machine can store the finite list in its states). Otherwise let $E$ enumerate $L$ in shortlex order. On input $w$, run $E$ until it prints $w$ (accept) or a string that comes after $w$ in shortlex order (reject). Since $L$ is infinite and printed in increasing order, one of the two happens after finitely many steps, and in the second case $w$ cannot be printed later. So this machine is a decider.
:::
:::

::: exercise Queue automata {level=3}
A **queue automaton** is like a PDA but with a queue instead of a stack: it can add symbols at the back and remove them from the front. Show that queue automata (with deterministic control, starting with the input in the queue) are equivalent in power to Turing machines.
::: solution
A TM simulates a queue on a tape easily: keep the queue contents between two markers, add a symbol by writing it at the right end, and remove one by erasing the leftmost symbol and moving the left marker one cell right. So queue automata recognise only recognisable languages.

Conversely, a queue automaton $A$ simulates a TM $M$. The queue holds the TM's tape contents with a marker $\dot a$ on the head cell and an end marker $\$$, as one cyclic string: $\$\, t_1 t_2 \cdots \dot t_h \cdots t_m$. To simulate a move, $A$ rotates the queue — repeatedly removes the front symbol and adds it at the back — until the marked symbol reaches the front, applies $M$'s transition, and re-adds the symbols with the mark moved. A move right is easy: remove $\dot t_h$, add the new symbol $b$, and mark the next symbol as it comes round (if it is $\$$, add a blank marked cell before re-adding $\$$, extending the tape). A move left needs to mark the *previous* symbol, which has already gone to the back; the standard trick is to delay every symbol by one position — the control remembers the last symbol removed and adds it only after seeing the next one — so that when $\dot t_h$ reaches the front, its left neighbour is still in the control and can be re-added marked. Each simulated move costs one rotation, $O(m)$ queue operations. The control tracks $M$'s state, and $A$ accepts when $M$ does.
:::
:::

::: exercise The busy beaver {level=3}
Let $\mathrm{BB}(n)$ be the largest number of moves made by any $n$-state Turing machine over the tape alphabet $\{0, 1\}$ (with $0$ as the blank) that halts when started on an all-zero tape infinite in both directions (halting states not counted among the $n$; the halting move counted). (a) Show that $\mathrm{BB}(1) = 1$. (b) Show that $\mathrm{BB}(n)$ is well defined for every $n$. (c) Using a two-way infinite tape and the simulator idea above, check by running it that the $2$-state machine $A0 \to 1RB$, $A1 \to 1LB$, $B0 \to 1LA$, $B1 \to 1RH$ halts after $6$ moves leaving four $1$s. (It is known that $\mathrm{BB}(2) = 6$; the value $\mathrm{BB}(5) = 47{,}176{,}870$ was established, with a computer-checked proof, in 2024.)
::: solution
(a) With one state $A$, the machine's first move reads a $0$. If the transition on $0$ halts, the machine halts after one move. Otherwise it is $A0 \to bDA$ for some $b$ and direction $D$: the machine stays in $A$ and moves to a cell it has never visited, which holds $0$; so it makes the same move again, and again, moving in direction $D$ for ever. Hence every halting one-state machine halts on its first move, and $\mathrm{BB}(1) = 1$.

(b) There are finitely many $n$-state machines (each of the $2n$ transitions has $2 \cdot 2 \cdot (n + 1)$ choices), and among them finitely many halt on the blank tape; the maximum of finitely many numbers exists. It is well defined but not *computable*: a program computing $\mathrm{BB}$ would solve the halting problem on blank tapes ([[theory-of-computation/decidability]]).

(c) With a dictionary as a two-way tape:

```python
def busy(delta, limit=1000):
    tape, head, q, steps = {}, 0, "A", 0
    while q != "H" and steps < limit:
        write, move, q = delta[q, tape.get(head, 0)]
        tape[head] = write
        head += 1 if move == "R" else -1
        steps += 1
    return steps, sum(tape.values())

BB2 = {("A", 0): (1, "R", "B"), ("A", 1): (1, "L", "B"),
       ("B", 0): (1, "L", "A"), ("B", 1): (1, "R", "H")}
print(busy(BB2))
```

```console
$ python3 busy.py
(6, 4)
```

Six moves, four $1$s on the tape.
:::
:::
