A program arrives at the compiler as a sequence of characters:

```text
fn max(a: int, b: int) -> int {
    if a >= b { return a; }   // ties go to a
    return b;
}
```

To the parser, most of these characters are noise. It wants to know that the program begins with the keyword `fn`, then an identifier, an opening parenthesis, another identifier, a colon, the keyword `int` and so on; it does not care that the identifier was spelt `max`, how many spaces separated the words, or what the comment said. The **lexical analyser** (or **lexer**, or **scanner**) is the phase that reads the characters and groups them into these words, the **tokens**, discarding white space and comments on the way. It is the only phase that looks at every character, so it must be fast; and its rules — what counts as an identifier, a number, an operator — are exactly the kind of pattern that regular expressions describe.

This chapter builds a **lexer generator**: a program that takes a list of token definitions as regular expressions and produces a deterministic finite automaton that recognises them all at once, with a driver that cuts the input into the longest possible tokens. It uses the theory of [[theory-of-computation/regular-expressions]] and [[theory-of-computation/nondeterminism]] — Thompson's construction and the subset construction — and adds what a compiler needs on top: several patterns at once, priorities between them, the longest-match rule, and the practical matters of keywords, line numbers, comments and layout. Along the way we meet a surprise: the obvious algorithm, used in nearly every lexer, can take quadratic time.

## Tokens, lexemes and patterns

::: definition Token, lexeme, pattern {#def-token}
A **token** is a pair (*kind*, *attribute*) where the kind is a symbol of the grammar used by the parser — `ID`, `NUM`, `IF`, `PLUS` — and the attribute carries the information the later phases need, such as the identifier's name or the number's value. A **lexeme** is the sequence of characters in the source that forms one token, for example `max` or `>=`. A **pattern** is a description, normally a regular expression, of the set of lexemes of a token kind.
:::

The split between kinds and attributes matters because the parser only looks at kinds: the grammar says "an expression may be an `ID`", not "an expression may be `max`". Semantic analysis then uses the attribute. Lexers also attach a **source position** (file, line, column) to every token so that later phases can report errors at the right place, which is surprisingly important for the usability of a compiler.

Our running language, **Mini**, has the token kinds below; [[compilers/semantic-analysis]] gives its grammar and types. We write character classes as in Python's `re`: `[a-z]` is one lowercase letter, `[^\n]` any character except newline.

| kind | pattern | examples |
|---|---|---|
| keywords `FN`, `LET`, `IF`, `ELSE`, `WHILE`, `RETURN`, `INT`, `BOOL`, `TRUE`, `FALSE` | the word itself | `fn`, `while` |
| `ID` | `[a-zA-Z_][a-zA-Z0-9_]*` | `max`, `x1`, `_tmp` |
| `NUM` | `[0-9]+` | `0`, `42` |
| `OP` | `==`, `!=`, `<=`, `>=`, `&&`, `\|\|`, `->` or one of `-+*/%<>=!(){},;:` | `>=`, `{` |
| `WS` (discarded) | `[ \t\n]+` | |
| `COMMENT` (discarded) | `//[^\n]*` | `// ties go to a` |

(For brevity all punctuation shares the kind `OP` with the lexeme as attribute; a production lexer gives each its own kind.)

The patterns overlap. The lexeme `if` matches both the keyword pattern and the `ID` pattern; `iffy` matches `ID`, and its prefix `if` matches the keyword; `>=` matches the two-character operator and its prefix `>` the one-character one. A lexer therefore needs rules for choosing, and every lexer in common use applies the same two.

::: definition The maximal-munch rule {#def-munch}
Given token patterns $R_1, \dots, R_k$ listed in **priority order** and the remaining input $w$, the next token is determined as follows.
1. **Longest match**: take the longest prefix $u$ of $w$ such that $u \in L(R_i)$ for some $i$.
2. **Priority**: among the patterns that match $u$, choose the one with the smallest index $i$.

The token is $(\text{kind of } R_i, u)$; scanning continues after $u$. If no non-empty prefix matches any pattern, the input has a **lexical error** at this position.
:::

Under these rules, with the keyword patterns listed before `ID`, the input `iffy if` gives `ID(iffy)` (longest match beats the keyword prefix) and then `IF` (for the lexeme `if`, both `IF` and `ID` match a prefix of the same length, and `IF` comes first). The input `a>=b` gives `ID(a)`, `OP(>=)`, `ID(b)`.

::: example Maximal munch in C {#ex-munch-c}
How does a C lexer, which uses maximal munch over the operator set `+`, `++`, `+=`, `-`, `--`, `->`, `>`, `>=`, … split (a) `x+++++y`, (b) `a-->b`, (c) `0x1`, and what are the consequences?
::: solution
(a) The longest operator at `+++++` is `++`, then `++` again, then `+`: the tokens are `x ++ ++ + y`, which parses as `(x++)++ + y` — an error, because `x++` is not something that can be incremented. GCC 15.2 reports `error: lvalue required as increment operand`, although the reading `x++ + ++y` would have been fine. The lexer does not consult the parser, so it cannot know which split the programmer meant; you must write the spaces.

(b) `a -- > b`: "decrement `a` and compare the old value with `b`", the famous "goes to" operator of `while (i --> 0)`. It is not a new operator at all, just maximal munch.

(c) In C, `0x1` is one token, the hexadecimal constant $1$, because C's pattern for numbers includes the `0x` prefix. In Mini, whose `NUM` pattern is `[0-9]+`, our lexer splits it into `NUM(0)` and `ID(x1)` — a perfectly legal pair of tokens that the parser will then reject. Which split is right depends entirely on the patterns.
:::
:::

::: warning Maximal munch does not search for a tokenisation
The rule is *greedy*. It never reconsiders a token once taken, so it can fail on inputs that do have a split into tokens. With patterns `ab`, `a` and `bc` and the input `abc`, the longest match is `ab`, after which `c` matches nothing — a lexical error — although `a` followed by `bc` was available. Languages are designed so that greediness gives the intended reading (or an error the programmer can fix by adding a space); a lexer that searched over all tokenisations would be slower, ambiguous, and surprising to read.
:::

## From patterns to one automaton

A lexer could test the patterns one by one at each position with a regular-expression library, but that repeats work for every pattern and every position. Instead, a lexer generator compiles all the patterns into **one** deterministic automaton that is run once over the input. The construction has three steps:

::: algorithm Lexer generation {#alg-lexgen}
Input: token patterns $R_1, \dots, R_k$ in priority order. Output: a DFA whose states are tagged with token kinds.
1. For each $R_i$ build an NFA $N_i$ by Thompson's construction ([[theory-of-computation/regular-expressions#thm-thompson]]), with a single accepting state $f_i$.
2. Make a new start state $s$ with $\varepsilon$-transitions to the start states of $N_1, \dots, N_k$. Call the combined NFA $N$; it accepts $L(R_1) \cup \dots \cup L(R_k)$.
3. Apply the subset construction ([[theory-of-computation/nondeterminism#alg-subset]]) to $N$, building only the states reachable from $\varepsilon\text{-closure}(\set{s})$. Tag each DFA state $D$ (a set of NFA states) with the kind of $R_i$ for the **smallest** $i$ such that $f_i \in D$, or leave it untagged if there is none.
4. Optionally minimise the DFA ([[theory-of-computation/non-regular-languages#alg-moore]]), starting the partition refinement from the partition of states **by tag** rather than accepting/non-accepting.
:::

::: theorem Correctness of the tagged subset construction {#thm-tagged}
Let $\hat\delta(w)$ denote the DFA state reached from the start by reading $w$ (if the run does not fall off the automaton). Then for every string $w$: $\hat\delta(w)$ is defined if and only if $w$ is a prefix of some string in $L(R_1) \cup \dots \cup L(R_k)$; and $\hat\delta(w)$ is tagged with kind $i$ if and only if $i$ is the smallest index with $w \in L(R_i)$.
:::

::: proof
By [[theory-of-computation/nondeterminism#lem-reach]], $\hat\delta(w)$ is the set of NFA states reachable from $s$ by paths spelling $w$ (the construction skips the empty set, so the run is undefined exactly when that set is empty). An NFA state is reachable on $w$ if and only if $w$ is a prefix of a string accepted from it onwards — in Thompson's construction every state lies on a path from its fragment's start to its accepting state, so "reachable on $w$" means "$w$ can be extended to a string of some $L(R_i)$". Next, since the fragments $N_i$ share no states and are entered only through $s$, the state $f_i$ is reachable on $w$ if and only if $N_i$ accepts $w$, that is, $w \in L(R_i)$. The tag rule picks the smallest such $i$.
:::

Since the DFA's tag at every prefix tells us which pattern (if any) that prefix matches, the maximal-munch rule can be implemented by running the DFA from the current position as far as it can go, remembering the last tagged state passed. That is the scanner below. First, the generator. It parses each regular expression into a tree (union `|`, concatenation, `*`, `+`, `?`, parentheses, character classes `[…]` and the escapes `\n`, `\t`):

```python
ALPHA = {chr(c) for c in range(32, 127)} | {"\t", "\n"}

def parse_regex(rx):
    pos = 0
    def peek(): return rx[pos] if pos < len(rx) else None
    def take():
        nonlocal pos; pos += 1; return rx[pos - 1]
    def alt():                          # alt := cat ('|' cat)*
        r = cat()
        while peek() == "|":
            take(); r = ("alt", r, cat())
        return r
    def cat():                          # cat := post*
        r = ("eps",)
        while peek() not in (None, "|", ")"):
            r = ("cat", r, post())
        return r
    def post():                         # post := atom ('*' | '+' | '?')*
        r = atom()
        while peek() in ("*", "+", "?"):
            op = take()
            r = (("star", r) if op == "*" else
                 ("cat", r, ("star", r)) if op == "+" else ("alt", r, ("eps",)))
        return r
```

The desugaring of $R^+$ into $RR^*$ and $R?$ into $R \mid \varepsilon$ happens here, so the later steps only see the five constructs of [[theory-of-computation/regular-expressions#def-regex]]. Atoms are single characters, `.` (any character except newline) and classes; a class becomes a set of characters, so a transition on `[a-z]` is one edge labelled with a set rather than 26 edges.

```python
    def atom():
        c = take()
        if c == "(":
            r = alt(); take(); return r     # skip ')'
        if c == "[": return ("set", charclass())
        if c == ".": return ("set", ALPHA - {"\n"})
        if c == "\\": c = {"n": "\n", "t": "\t"}.get(peek(), peek()); take()
        return ("set", {c})
    def charclass():                    # [abc], [a-z0-9_], [^"\n]
        neg = peek() == "^"
        if neg: take()
        s = set()
        while peek() != "]":
            c = take()
            if c == "\\": c = {"n": "\n", "t": "\t"}.get(peek(), peek()); take()
            if peek() == "-" and rx[pos + 1] != "]":
                take(); hi = take(); s |= {chr(x) for x in range(ord(c), ord(hi) + 1)}
            else: s.add(c)
        take()
        return ALPHA - s if neg else s
    return alt()
```

Thompson's construction ([[theory-of-computation/regular-expressions#thm-thompson]]) turns each tree into an NFA fragment with one start and one accepting state:

```python
class NFA:
    def __init__(self):
        self.eps, self.edges = [], []   # eps[q]: list of states; edges[q]: (set, state)
    def new(self):
        self.eps.append([]); self.edges.append([]); return len(self.eps) - 1

def thompson(nfa, r):
    """Add a fragment for regex AST r; return its (start, accept) states."""
    kind = r[0]
    if kind in ("eps", "set"):
        s, f = nfa.new(), nfa.new()
        if kind == "eps": nfa.eps[s].append(f)
        else: nfa.edges[s].append((frozenset(r[1]), f))
        return s, f
    if kind == "cat":
        s1, f1 = thompson(nfa, r[1]); s2, f2 = thompson(nfa, r[2])
        nfa.eps[f1].append(s2)
        return s1, f2
    s, f = nfa.new(), nfa.new()
    if kind == "alt":
        for sub in r[1:]:
            s1, f1 = thompson(nfa, sub)
            nfa.eps[s] += [s1]; nfa.eps[f1] += [f]
    else:                               # star
        s1, f1 = thompson(nfa, r[1])
        nfa.eps[s] += [s1, f]; nfa.eps[f1] += [s1, f]
    return s, f
```

Finally, all the fragments are joined under one start state and the subset construction is run, tagging each DFA state with the earliest rule whose accepting state it contains, exactly as in [[#alg-lexgen]]:

```python
def closure(nfa, states):
    stack, seen = list(states), set(states)
    while stack:
        for p in nfa.eps[stack.pop()]:
            if p not in seen: seen.add(p); stack.append(p)
    return frozenset(seen)

def build_dfa(rules):
    """rules: list of (token name, regex) in priority order."""
    nfa = NFA(); start = nfa.new(); accept = {}
    for i, (name, rx) in enumerate(rules):
        s, f = thompson(nfa, parse_regex(rx))
        nfa.eps[start].append(s); accept[f] = i
    d0 = closure(nfa, [start])
    index, trans, tag, work = {d0: 0}, [{}], [None], [d0]
    while work:
        D = work.pop(); i = index[D]
        hits = [accept[q] for q in D if q in accept]
        tag[i] = rules[min(hits)][0] if hits else None   # earliest rule wins
        for c in sorted(ALPHA):
            E = closure(nfa, [p for q in D for (cs, p) in nfa.edges[q] if c in cs])
            if not E: continue
            if E not in index:
                index[E] = len(trans); trans.append({}); tag.append(None); work.append(E)
            trans[i][c] = index[E]
    return trans, tag, len(nfa.eps)
```

The DFA is a list of dictionaries, `trans[state][char]`, with missing entries meaning "no transition" (the dead state of the subset construction is never built). A production generator such as flex compresses this into arrays indexed by character class, but the information is the same.

::: example Building a DFA by hand {#ex-ifid}
Construct the tagged DFA for two rules, `IF` = `if` and `ID` = `[a-z]+`, using a hand-made NFA: start state $0$ with $\varepsilon$-moves to $1$ and $4$; $1 \xrightarrow{i} 2 \xrightarrow{f} 3$ with $3$ accepting `IF`; $4 \xrightarrow{[a-z]} 5$ and $5 \xrightarrow{[a-z]} 5$ with $5$ accepting `ID`. Then minimise it.
::: solution
Start: $A = \set{0, 1, 4}$, untagged. From $A$: on `i`, the NFA can go $1 \to 2$ and $4 \to 5$, giving $B = \set{2, 5}$, tagged `ID` (it contains $5$ but not $3$); on any other letter, only $4 \to 5$, giving $D = \set{5}$, tagged `ID`.
From $B$: on `f`, $2 \to 3$ and $5 \to 5$ give $C = \set{3, 5}$; both accepting states are present, and `IF` has priority, so $C$ is tagged `IF`. On any other letter, $D$.
From $C$ and from $D$: on any letter, $D$.

| state | NFA set | tag | on `i` | on `f` | on other letters |
|---|---|---|---|---|---|
| $A$ | $\set{0,1,4}$ | — | $B$ | $D$ | $D$ |
| $B$ | $\set{2,5}$ | `ID` | $D$ | $C$ | $D$ |
| $C$ | $\set{3,5}$ | `IF` | $D$ | $D$ | $D$ |
| $D$ | $\set{5}$ | `ID` | $D$ | $D$ | $D$ |

Minimisation starts from the partition by tag: $\set{A}$, $\set{B, D}$, $\set{C}$. $B$ and $D$ are separated because on `f` one goes to $C$ and the other stays in $\set{B, D}$. So all four states are distinct, and the minimal DFA has 4 states. Our generator, run on the same two rules (with Thompson's NFA instead of the hand-made one), builds 5 DFA states and minimises them to 4 — the extra state is a second copy of $D$, reached from $A$ on letters other than `i` before any letter is seen twice.
:::
:::

::: widget graph
nodes: A@0,1; B@2,0; C@4,0; D@3,2
edges: A>B; A>D; B>C; B>D; C>D; D>D
algorithm: bfs
start: A
caption: The minimal DFA of [[#ex-ifid]]. Edge labels are omitted: $A \to B$ on `i`, $B \to C$ on `f`, and every other edge on the remaining letters. $B$ and $D$ are tagged `ID`, $C$ is tagged `IF`. Run breadth-first search from $A$ to see that every state is reachable within two steps — any state reached by a longer string is $D$. Scanning `ifs` visits $A, B, C, D$: the last tagged state is $D$ (`ID`), so `ifs` is an identifier; scanning `if ` stops at $C$ and yields the keyword.
:::

## The scanner

::: algorithm Maximal-munch scanner {#alg-scan}
Input: the tagged DFA, the text $w = w_0 w_1 \cdots w_{n-1}$.
1. $\mathit{pos} \gets 0$.
2. While $\mathit{pos} < n$:
    1. $q \gets$ start state; $i \gets \mathit{pos}$; $\mathit{last} \gets$ none.
    2. While $i < n$ and $q$ has a transition on $w_i$: $q \gets \delta(q, w_i)$; $i \gets i + 1$; if $q$ is tagged with kind $k$, $\mathit{last} \gets (k, i)$.
    3. If $\mathit{last}$ is none, report a lexical error at $\mathit{pos}$.
    4. Otherwise $(k, e) \gets \mathit{last}$; emit the token $(k, w_{\mathit{pos}..e-1})$ unless $k$ is to be skipped; $\mathit{pos} \gets e$.
:::

By [[#thm-tagged]], the run in step 2.2 follows exactly the prefixes of the remaining input that can still be extended to some token, and $\mathit{last}$ records the longest one that is a token, with the tag giving the highest-priority pattern — so the scanner implements [[#def-munch]] exactly. The characters read after the last tagged state are given back: scanning resumes at $e$, not at $i$. In Python:

```python
def scan(dfa, text, skip=("WS", "COMMENT")):
    trans, tag, _ = dfa
    pos, line, steps = 0, 1, 0
    while pos < len(text):
        state, i, last = 0, pos, None       # last = (token, end) of longest match
        while i < len(text) and text[i] in trans[state]:
            state = trans[state][text[i]]; i += 1; steps += 1
            if tag[state]: last = (tag[state], i)
        if last is None:
            raise SyntaxError(f"line {line}: unexpected {text[pos]!r}")
        kind, end = last
        lexeme = text[pos:end]
        if kind not in skip: yield (kind, lexeme, line)
        line += lexeme.count("\n"); pos = end
    scan.steps = steps
```

Line numbers are kept by counting the newlines in each lexeme, including the skipped white space and comments. The `steps` counter records the number of DFA transitions taken; we use it below to measure the cost.

::: example Scanning Mini {#ex-scan-mini}
Generate the lexer for Mini from the rules in the table above and run it on the function `max` from the start of the chapter.
::: solution
```python
from lexgen import build_dfa, scan, minimise
KEYWORDS = ["fn", "let", "if", "else", "while", "return", "int", "bool", "true", "false"]
RULES = [(k.upper(), k) for k in KEYWORDS] + [
    ("ID",      "[a-zA-Z_][a-zA-Z0-9_]*"),
    ("NUM",     "[0-9]+"),
    ("OP",      "==|!=|<=|>=|&&|[|][|]|->|[-+*/%<>=!(){},;:]"),
    ("WS",      "[ \t\n]+"),
    ("COMMENT", "//[^\n]*"),
]
DFA = build_dfa(RULES)
toks = list(scan(DFA, src))         # src = the text of max
for t in toks[:12]: print(t)
print(len(toks), "tokens;", scan.steps, "DFA steps for", len(src), "characters")
print("NFA states:", DFA[2], " DFA states:", len(DFA[0]), " minimal:", minimise(DFA))
```

```text
('FN', 'fn', 1)
('ID', 'max', 1)
('OP', '(', 1)
('ID', 'a', 1)
('OP', ':', 1)
('INT', 'int', 1)
('OP', ',', 1)
('ID', 'b', 1)
('OP', ':', 1)
('INT', 'int', 1)
('OP', ')', 1)
('OP', '->', 1)
27 tokens; 93 DFA steps for 93 characters
NFA states: 191  DFA states: 61  minimal: 47
```

The 93 characters became 27 tokens; the comment and all spaces and newlines were dropped. Each character cost exactly one DFA transition: for Mini, the DFA never runs past the end of a token and then has to give characters back (see [[#thm-scan-cost]]). Thompson's construction made 191 NFA states, the subset construction 61 reachable DFA states, and minimisation 47. Generating the whole lexer takes about 30 ms in Python on this machine.
:::
:::

The minimisation routine used here is Moore's partition refinement, with the initial partition given by the tags:

```python
def minimise(dfa):
    trans, tag, _ = dfa
    n = len(trans)
    block = [tag[q] for q in range(n)]          # start: group by token tag
    while True:
        sig = [(block[q],) + tuple(block[trans[q][c]] if c in trans[q] else None
                                   for c in sorted(ALPHA)) for q in range(n)]
        ids = {}
        new = [ids.setdefault(s, len(ids)) for s in sig]
        if len(ids) == len(set(block)): return len(ids)
        block = new
```

Two states with different tags must never be merged — one ends an identifier, the other a keyword — which is why the refinement starts from the partition by tag. The proof of [[theory-of-computation/non-regular-languages#thm-minimise]] goes through unchanged with "same tag" in place of "both accepting or both rejecting". (This function returns only the number of blocks; a full version would also build the quotient automaton.)

::: quiz
With the Mini rules (keywords listed before `ID`), what tokens does `iffy if0 if 0x1` produce?
- [ ] `IF(if) ID(fy) IF(if) NUM(0) IF(if) NUM(0) ID(x1)`
- [x] `ID(iffy) ID(if0) IF(if) NUM(0) ID(x1)`
- [ ] `ID(iffy) IF(if) NUM(0) IF(if) NUM(0x1)`
- [ ] a lexical error at `0x1`
::: solution
Longest match makes `iffy` and `if0` identifiers: the `ID` pattern allows digits after the first character. The lexeme `if` alone matches both `IF` and `ID` with the same length, and `IF` has priority. `0x1` is not a Mini number; the longest token at `0` is `NUM(0)`, after which `x1` is an identifier. The program prints `[('ID', 'iffy', 1), ('ID', 'if0', 1), ('IF', 'if', 1), ('NUM', '0', 1), ('ID', 'x1', 1)]`.
:::
:::

## How fast is a scanner?

The DFA does constant work per transition, so the cost of scanning is the number of transitions. The scanner reads each character at least once, but it may read characters beyond the end of a token and then give them back.

::: definition Overshoot {#def-overshoot}
For one iteration of the outer loop of [[#alg-scan]] that ends with token end $e$ and inner index $i$, the **overshoot** is $i - e$: the number of characters read after the last tagged state.
:::

::: theorem Cost of maximal-munch scanning {#thm-scan-cost}
On an input of length $n$ that is scanned without error, the number of DFA transitions is $n + \Omega$, where $\Omega$ is the sum of the overshoots of all tokens. If every overshoot is at most $c$, the scanner runs in $O((c + 1)\, n)$ time. In general the number of transitions can be $\Theta(n^2)$.
:::

::: proof
Each iteration starting at $\mathit{pos}$ takes $i - \mathit{pos} = (e - \mathit{pos}) + (i - e)$ transitions: the length of the token plus the overshoot. The tokens partition the input, so their lengths sum to $n$, and the total is $n + \Omega$. If every overshoot is at most $c$ and there are at most $n$ tokens, $\Omega \le cn$.

For the lower bound, take the two rules `A` = `a` and `B` = `a*b` and the input $a^n$. At position $p$ the DFA can follow `a`s for as long as they last (a `b` might still come, completing a `B`), so it reads all $n - p$ remaining characters before falling off the end, and the last tagged state was after one character: the token is `A(a)` with overshoot $n - p - 1$. The total is $\sum_{p=0}^{n-1} (n - p) = n(n+1)/2$ transitions. Since no iteration takes more than $n$ transitions and there are at most $n$ iterations, $O(n^2)$ is also an upper bound.
:::

Running our scanner confirms the count exactly:

```console
$ python3 -c "
from lexgen import build_dfa, scan
q = build_dfa([('A', 'a'), ('B', 'a*b')])
for n in [10, 100, 1000]:
    toks = list(scan(q, 'a' * n)); print(n, len(toks), 'tokens', scan.steps, 'steps')"
10 10 tokens 55 steps
100 100 tokens 5050 steps
1000 1000 tokens 500500 steps
```

Real token sets have small overshoot. In Mini the overshoot is always $0$ on valid input: every proper prefix of an operator is itself an operator or cannot be followed by anything else, which is why scanning `max` took exactly one step per character. In C it is a small constant: after `..` the scanner must look at the next character to see whether it is the `...` token, and if it is not, it gives back one `.`. Our scanner on `a..b` with tokens `...`, `.` and identifiers produces `ID(a) DOT DOT ID(b)` in 5 transitions for 4 characters. Thomas Reps showed in 1998 that maximal munch can always be done in linear time, by remembering which (state, position) pairs have already failed to lead to a token — a dynamic-programming table of size $O(\lvert Q\rvert n)$ — but because real languages have tiny overshoot, production lexers simply use [[#alg-scan]].

::: example An unterminated comment {#ex-quadratic}
A lexer for a C-like language has the rules `COMMENT` = `/[*]([^*]|[*]+[^*/])*[*]+/` (a block comment `/* … */`), `DIV` = `/`, `MUL` = `[*]` and `ID` = `[a-z]+`. Count the DFA transitions on the input $(\texttt{/*a})^k$ of length $n = 3k$, which contains no `*/`.
::: solution
At a `/` at position $3j$ the DFA enters the comment pattern on `/*` and keeps going — `a`, `/`, `*a`, … are all legal inside a comment — until the input ends, never reaching an accepting state after the first `/`. It backs up to `DIV(/)`, having made $n - 3j$ transitions. Then `*` gives `MUL` in 1 transition and `a` gives `ID` in 1. The total is
$$
\sum_{j=0}^{k-1} (3k - 3j) + 2k = \frac{3k(k+1)}{2} + 2k ,
$$
which is quadratic in $n$. Our scanner agrees: for $k = 10, 100, 1000$ it makes $185$, $15\,350$ and $1\,503\,500$ transitions. Real C lexers avoid this by *committing* on `/*`: once a comment has started, reaching the end of the file is reported as an "unterminated comment" error rather than backing up. That one design decision bounds the overshoot.
:::
:::

## Lexers in practice

### Keywords

Listing every keyword as its own pattern, as we did for Mini, makes the DFA large: our generator gives 61 DFA states (47 minimal) for Mini, but only 25 (11 minimal) when the ten keyword rules are removed. The usual alternative is to recognise keywords as identifiers and then look the lexeme up in a hash table of reserved words before returning the token; the table lookup costs one hash per identifier and keeps the automaton small. Both methods give the same tokens, because by the priority rule a keyword is exactly an identifier lexeme that appears in the keyword list. Hand-written lexers almost always use the table.

### Hand-written lexers

Despite the elegance of generated scanners, the lexers of GCC, Clang, the Go and Rust compilers and most JavaScript engines are hand-written: a `switch` on the first character, then a loop for identifiers or numbers. A hand-written lexer is the same DFA expressed as code; it is easy to make fast (one indirect jump per token, tight loops for identifier characters), and it is the natural place for the irregular parts of real languages: escape sequences in string literals, numeric literals with suffixes and digit separators, Unicode identifiers, and the context dependencies below. Generators (lex and flex for C, re2c, ANTLR's lexer, Rust's `logos`) remain popular for tools and smaller languages.

### Where regular expressions are not enough

Some lexical features are not regular, or depend on context.

- **Nested comments.** OCaml's `(* … *)` and Rust's `/* … */` comments may nest. The set of correctly nested comments is not regular, for the same reason that balanced brackets are not ([[theory-of-computation/non-regular-languages]]). The lexer handles them with a counter: on `/*` increment, on `*/` decrement, finish when it reaches zero — a tiny pushdown automaton inside the lexer.
- **Lexer states.** Inside a string literal or a template string, different rules apply (`//` is not a comment inside `"http://…"`). Generators support **start conditions**: the lexer switches between several DFAs.
- **Feedback from the parser.** In C, `T * x;` is a declaration of a pointer if `T` names a type (declared by `typedef`), and a multiplication otherwise. Since the grammar needs to know which, C lexers consult the symbol table and return a different token kind for type names — the "lexer hack". Similarly, the lexer of a language with user-defined operators must know which operators have been declared.
- **Layout.** In Python and Haskell, indentation delimits blocks. The lexer turns changes in indentation into explicit `INDENT` and `DEDENT` tokens using a stack of open indentation widths, so that the grammar can treat them like braces.

::: example INDENT and DEDENT tokens {#ex-layout}
Write the layout algorithm and run it on a small Python fragment, and on one with an inconsistent dedent.
::: solution
```python
def layout(lines):
    """Turn leading spaces into INDENT/DEDENT tokens, as Python's tokenizer does."""
    stack = [0]                          # indentation widths of open blocks
    for n, line in enumerate(lines, 1):
        if not line.strip(): continue    # blank lines do not count
        width = len(line) - len(line.lstrip(" "))
        if width > stack[-1]:
            stack.append(width); yield "INDENT"
        while width < stack[-1]:
            stack.pop(); yield "DEDENT"
        if width != stack[-1]:
            raise IndentationError(f"line {n}: unindent does not match any outer level")
        yield f"LINE({line.strip()})"
    while len(stack) > 1:                # close blocks still open at end of file
        stack.pop(); yield "DEDENT"

src = """while n > 1:
    if n % 2:
        n = 3*n + 1
    else:
        n = n // 2
print(n)"""
print(" ".join(layout(src.split("\n"))))
try: list(layout(["if x:", "        a", "    b"]))
except IndentationError as e: print("IndentationError:", e)
```

```text
LINE(while n > 1:) INDENT LINE(if n % 2:) INDENT LINE(n = 3*n + 1) DEDENT LINE(else:) INDENT LINE(n = n // 2) DEDENT DEDENT LINE(print(n))
IndentationError: line 3: unindent does not match any outer level
```

A line indented more than the top of the stack opens a block; a line indented less closes blocks until the widths match, emitting one `DEDENT` each, so the last line closes two blocks at once. A width that falls strictly between two open levels is an error; CPython's tokenizer reports the same case as `IndentationError: unindent does not match any outer indentation level`. (The real tokenizer also handles tabs, line continuations and brackets, inside which indentation is ignored.)
:::
:::

### Errors

A lexical error — a character that cannot begin any token, an unterminated string or comment — is usually reported and then **recovered** from by skipping the offending character, so that the compiler can go on to report later errors too. Good lexers also catch likely mistakes early: a missing closing quote is reported at the line where the string began, not at the end of the file.

::: history
The first systematic treatment of lexical analysis by finite automata was "Automatic generation of efficient lexical processors using finite state techniques" by Walter Johnson, James Porter, Stephanie Ackley and Douglas Ross (*Communications of the ACM*, 1968), describing the RWORD system of MIT's AED project. Ken Thompson's regular-expression compiler appeared the same year. Mike Lesk wrote **Lex** at Bell Labs; the 1975 technical report "Lex — a lexical analyzer generator" (with Eric Schmidt, who wrote the DFA-based version) made it part of Unix, paired with Stephen Johnson's parser generator Yacc. Vern Paxson's **flex** (around 1987) became the free, faster replacement and is still widely used; re2c (Peter Bumbulis and Donald Cowan, 1994) generates the DFA directly as C code. The longest-match rule is part of the definition of most languages; Thomas Reps's "Maximal-munch tokenization in linear time" (*ACM TOPLAS*, 1998) showed that its quadratic worst case can be avoided.
:::

## Where this leads

The lexer delivers a stream of tokens; [[compilers/top-down-parsing]] and [[compilers/bottom-up-parsing]] build the structure that the token stream encodes, using context-free grammars ([[theory-of-computation/context-free-grammars]]) whose terminal symbols are exactly the token kinds of this chapter. The same automata techniques reappear in the LR parsers of [[compilers/bottom-up-parsing]], whose central object is a DFA over grammar symbols.

::: summary
- The lexer turns characters into **tokens** (kind plus attribute, with a source position), discarding white space and comments ([[#def-token]]).
- Overlapping patterns are resolved by **maximal munch**: longest match first, then rule priority ([[#def-munch]]). It is greedy and may reject inputs that have some other tokenisation.
- A lexer generator joins Thompson NFAs for all patterns under one start state and runs the subset construction, **tagging** each DFA state with the highest-priority pattern it accepts ([[#alg-lexgen]], [[#thm-tagged]]); minimisation starts from the partition by tag.
- The scanner runs the DFA as far as possible and backs up to the last tagged state ([[#alg-scan]]). Its cost is $n$ plus the total **overshoot**: linear for real token sets, quadratic in the worst case ([[#thm-scan-cost]]).
- Keywords are best recognised as identifiers and looked up in a table; this shrank the Mini DFA from 47 to 11 minimal states.
- Nested comments, string-literal modes, C's typedef names and indentation-based layout go beyond regular expressions and are handled by counters, lexer states, feedback from the parser and an indentation stack.
:::

## Exercises

::: exercise Counting tokens {level=1 check="11"}
How many tokens (excluding white space and comments) does the Mini lexer produce for `let x1 = 0x2 >= y && !z; // done`? (Enter the number.)
::: solution
`LET`, `ID(x1)`, `OP(=)`, `NUM(0)`, `ID(x2)`, `OP(>=)`, `ID(y)`, `OP(&&)`, `OP(!)`, `ID(z)`, `OP(;)`: eleven tokens. Note that `0x2` is two tokens, `NUM(0)` and `ID(x2)`, as in the quiz; the comment is discarded.
:::
:::

::: exercise Longest match and priority {level=1}
Patterns, in priority order: `IF` = `if`, `ID` = `[a-z]+`, `NUM` = `[0-9]+`, `REAL` = `[0-9]+\.[0-9]+`, `DOT` = `\.`, and white space. Tokenise (a) `if ifx 3.14`, (b) `3.x`, (c) `3..4`.
::: solution
(a) `IF`, `ID(ifx)`, `REAL(3.14)`. (b) From `3`, the DFA reads `3` (tagged `NUM`) and `.` (a `REAL` might follow, but this state is untagged), then cannot continue on `x`; it backs up to `NUM(3)` with overshoot 1; then `DOT`, `ID(x)`. (c) `NUM(3)` (overshoot 1, as in (b): after `3.` the DFA needs a digit and sees `.`), then `DOT`, `DOT` and `NUM(4)`. Our generator produces exactly these token sequences for all three inputs.
:::
:::

::: exercise Quadratic scanning {level=1 check="210"}
With the rules `A` = `a` and `B` = `a*b`, how many DFA transitions does the scanner make on the input $a^{20}$? (Enter the number.)
::: solution
By the proof of [[#thm-scan-cost]], the scan starting at position $p$ makes $20 - p$ transitions, for $p = 0, \dots, 19$: the total is $20 + 19 + \dots + 1 = 20 \cdot 21 / 2 = 210$. Our scanner reports 210. On $a^{20}b$ it makes only 21: the first token is all of `aaaa…ab`.
:::
:::

::: exercise Greedy failure {level=2}
(a) Show that with patterns `ab`, `a`, `bc` the input `abc` has a tokenisation but maximal munch reports an error. (b) Show that if every single character of the alphabet is a token, maximal munch never reports an error. (c) Show that the set $\{$`a`, `b`, `ab`$\}$ satisfies your condition.
::: solution
(a) `a` + `bc` is a tokenisation. Maximal munch takes `ab` (longest), then nothing matches `c`. Our generator agrees: `SyntaxError: line 1: unexpected 'c'`; with an extra pattern `c` it produces `AB(ab) C(c)`.

(b) Suppose every single character of the alphabet $\Sigma$ is itself a token. Then at every position the one-character prefix of the remaining input matches some pattern, so a longest match always exists, and maximal munch never reports an error on any string over $\Sigma$ — in particular it succeeds on every string in $L(P)^*$. (The tokenisation it finds may differ from the one intended, but it exists.)

(c) Over $\Sigma = \{a, b\}$ both single characters are tokens, so (b) applies: every string is split into `ab`s and single letters without getting stuck. For example `abbaab` gives `AB B A AB`.
:::
:::

::: exercise Keywords by table lookup {level=2}
Modify the Mini lexer so that keywords are not separate rules: `ID` tokens whose lexeme is in a set `KEYWORDS` are returned with the keyword's kind instead. Prove that the resulting token stream is identical to the one produced by the original lexer on every input, and state how many DFA states are saved (use the numbers in the text).
::: solution
Implementation: build the DFA from `RULES` without the keyword rules, and wrap the scanner:

```python
def scan_kw(dfa, text):
    for kind, lexeme, line in scan(dfa, text):
        if kind == "ID" and lexeme in KEYWORDS: kind = lexeme.upper()
        yield (kind, lexeme, line)
```

Proof of equivalence. Every keyword lexeme is also an `ID` lexeme. *Same token boundaries:* the longest-match length at a position depends only on the union of all patterns' languages, and adding or removing the keyword patterns does not change the union (they are subsets of `ID`'s language), so the longest prefix that is some token is the same in both lexers. *Same kinds:* if the chosen lexeme is a keyword, the original lexer tags it with the keyword (keywords have priority), and the new lexer tags it `ID` and then renames it to the keyword; if it is not a keyword, neither lexer can tag it as one, and both choose the same remaining rule. The DFA shrinks from 61 to 25 states (from 47 to 11 after minimisation), a saving of 36 states.
:::
:::

::: exercise Nested comments are not regular {level=2}
Let $C$ be the set of strings over $\{$`(`, `)`, `x`$\}$ that form a correctly nested comment in a language where `(` opens and `)` closes a comment level (think of `/*` and `*/` as single symbols), that is, strings of the form `(` $w$ `)` with $w$ balanced. Prove that $C$ is not regular, and write a scanner fragment that recognises such comments with a counter.
::: solution
Suppose $C$ were regular. The strings $\texttt{(}^k$ for $k = 1, 2, \dots$ are pairwise distinguishable: for $j \ne k$, $\texttt{(}^j \texttt{)}^j \in C$ but $\texttt{(}^k \texttt{)}^j \notin C$ (unbalanced). By [[theory-of-computation/non-regular-languages#lem-dist]], a DFA for $C$ would need infinitely many states — contradiction.

Scanner fragment (call it after reading an opening `(`):

```python
def skip_comment(text, pos):          # text[pos - 1] == "(" has just been read
    depth = 1
    while depth > 0:
        if pos == len(text): raise SyntaxError("unterminated comment")
        depth += {"(": 1, ")": -1}.get(text[pos], 0)
        pos += 1
    return pos                        # position just after the closing ")"
```

The counter is the stack of a pushdown automaton with a one-letter stack alphabet. Real lexers do the same with the two-character delimiters, checking `/*` and `*/` at each position.
:::
:::

::: exercise Overshoot of a token set {level=3}
(a) For the Mini rules, prove that the overshoot of every token in a successful scan is $0$. (b) For a finite set of patterns, give an algorithm, working on the tagged DFA, that computes the maximum overshoot over all inputs (or reports that it is unbounded), and apply it to the rules `A` = `a`, `B` = `a*b`.
::: solution
(a) The overshoot is positive only if the DFA passes through an untagged state after a tagged one before stopping. For Mini, consider each token kind. Identifiers, numbers, white space and comments: every non-empty prefix of a lexeme that the DFA can extend is itself a complete lexeme of the same kind (the patterns are of the form $x y^*$), so every state after the first transition on such a path is tagged. Operators: the multi-character operators `==`, `!=`, `<=`, `>=`, `&&`, `||`, `->` have first characters `=`, `!`, `<`, `>`, `&`, `|`, `-`; of these `&` and `|` alone are not tokens, but they occur only as *first* characters, so an untagged state is reached only before any tagged one. After a tagged state with no tagged successor, the DFA stops. So no untagged state ever follows a tagged one: the overshoot is $0$, which is why the scan in [[#ex-scan-mini]] took exactly 93 steps for 93 characters.

(b) Let $T$ be the set of tagged states. The overshoot of a scan is the length of the run after the last visit to $T$. So the maximum overshoot is the length of the longest path in the DFA that starts at a tagged state, uses only untagged states afterwards, and leaves $T$ immediately — more precisely, the longest path $q_0 \to q_1 \to \cdots \to q_m$ with $q_0$ tagged (and reachable) and $q_1, \dots, q_m$ untagged. Restrict the DFA to untagged states: if the subgraph of untagged states reachable from a tagged state contains a cycle, the overshoot is unbounded; otherwise it is a DAG and the longest path is found by dynamic programming in topological order ([[algorithms]]), in time linear in the size of the DFA. For `A`, `B`: after reading `a` the DFA is in a state tagged `A` that also contains the $a^*$ loop of `B`; reading more `a`s leads to an untagged state with a loop on `a` (still waiting for `b`). The untagged subgraph has a cycle, so the overshoot is unbounded, matching the quadratic behaviour.
:::
:::

::: exercise Line and column numbers {level=3}
Extend `scan` so that every token carries its column as well as its line, where columns count from 1 and a tab advances to the next multiple of 8 plus 1 (columns 1, 9, 17, …). State an invariant relating `pos`, `line` and `col` to the text, and prove that your code maintains it.
::: solution
Keep `col` alongside `line`, initially `1`. After taking a lexeme, update both by walking its characters:

```python
def advance(line, col, lexeme):
    for ch in lexeme:
        if ch == "\n": line, col = line + 1, 1
        elif ch == "\t": col = (col - 1) // 8 * 8 + 9
        else: col += 1
    return line, col
```

and yield `(kind, lexeme, line, col)` before calling `line, col = advance(line, col, lexeme)`.

Invariant: at the top of the outer loop, `line` is $1$ plus the number of newlines in `text[:pos]`, and `col` is the display column of position `pos`, defined by applying the same three rules to the characters of `text[:pos]` after the last newline. Initially `pos = 0`, `line = 1`, `col = 1`: true. If the invariant holds before a token `text[pos:end]`, then `advance` applies the rules to exactly the characters `text[pos:end]`; a newline among them resets the column, so afterwards `col` depends only on the characters after the last newline in `text[:end]`, and `line` has increased by the number of newlines in the lexeme. So the invariant holds for `end`, the new `pos`. The yielded position is the one *before* `advance`, which by the invariant is the position of the token's first character. A tab moves from column $c$ to $\lfloor (c-1)/8 \rfloor \cdot 8 + 9$, the next tab stop: from columns 1–8 to 9, from 9–16 to 17.
:::
:::
