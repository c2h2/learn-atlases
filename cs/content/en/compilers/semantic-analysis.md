Here is a Mini function that the parser of the previous chapters accepts without complaint:

```text
fn f(n: int) -> bool {
    let x = n + true;
    let y = undefined * 2;
    if n { return 1; }
    g(n);
}
```

Every line is grammatical, and every line is wrong: an integer is added to a Boolean, a variable is used that was never declared, an integer is used as a condition, an integer is returned from a function declared to return a Boolean, a function `g` is called that does not exist, and the function can reach its end without returning anything. A context-free grammar cannot catch any of these errors. "Every variable is declared before it is used" is not a context-free property (it is the language $\set{wcw}$ in disguise, which [[theory-of-computation/pushdown-automata#ex-ww]] shows is not context-free), and type rules depend on information arbitrarily far away in the program.

**Semantic analysis** is the phase that enforces such rules. It works on a tree, the **abstract syntax tree**, not on tokens. It resolves every use of a name to its declaration, using a **symbol table** organised by **scopes**; it computes a **type** for every expression and checks that each operation is applied to operands of the right types; and it checks other static rules, such as "every path through a function returns a value". What it learns is recorded in the tree, which is passed on, **decorated** with types and declarations, to the generation of intermediate code. In this chapter we write the complete front end for Mini — a parser that builds abstract syntax trees and a checker that reports all six errors above — and study the theory that says what the checker should do: type systems written as inference rules, the proof that the checker implements them, and the theorem that well-typed programs cannot go wrong.

## Abstract syntax trees

A parse tree records every detail of how a string was derived: the nonterminals introduced only to encode precedence ($E$, $T$, $F$), the parentheses, the semicolons, the keywords. None of this matters after parsing. An **abstract syntax tree** keeps only the structure that has meaning.

::: definition Abstract syntax tree {#def-ast}
An **abstract syntax tree** (AST) of a program is a tree whose interior nodes are labelled by language constructs (binary operation, call, assignment, `while` loop, function definition…) and whose children are the construct's meaningful components. Punctuation, keywords and grouping parentheses are not represented, chains of single-child nonterminals are collapsed, and lists are represented directly. Each node usually carries a source position for error messages.
:::

The **abstract syntax** of a language is the grammar of its ASTs, which is usually ambiguous and does not care: it is not used for parsing. For Mini:

$$
\begin{aligned}
e &::= n \mid \mathtt{true} \mid \mathtt{false} \mid x \mid \ominus e \mid e_1 \oplus e_2 \mid f(e_1, \dots, e_k) \\
s &::= \mathtt{let}\ x\,[{:}\,\tau] = e \mid x = e \mid \mathtt{if}\ e\ s_1\ [s_2] \mid \mathtt{while}\ e\ s \mid \mathtt{return}\ e \mid e \mid \set{s_1 \cdots s_k} \\
d &::= \mathtt{fn}\ f(x_1{:}\,\tau_1, \dots, x_k{:}\,\tau_k) \to \tau\ s \qquad \tau ::= \mathtt{int} \mid \mathtt{bool}
\end{aligned}
$$ {#eq-mini-abstract}

where $\ominus$ ranges over the unary operators `-` and `!`, and $\oplus$ over the thirteen binary operators. A program is a list of function definitions; the built-in function `print(int) -> int` writes its argument. In Python, every node is an object with a kind, a line number and a list of children:

```python
class N:
    """AST node: kind, source line, children; .type is filled in by the checker."""
    def __init__(self, kind, line, *kids):
        self.kind, self.line, self.kids, self.type = kind, line, list(kids), None
    def __repr__(self):
        return f"{self.kind}({', '.join(map(repr, self.kids))})"
```

The parser is the recursive-descent parser of [[compilers/top-down-parsing]], extended to statements and functions, with each procedure returning a node. (The complete file, `mini_parse.py`, has 120 lines: declarations, statements, and the precedence-climbing expression parser of [[compilers/top-down-parsing#alg-precedence]] building `N("bin", line, op, left, right)` instead of tuples.) The statement procedure shows the main decisions:

```python
    def statement(self):
        line, k = self.line(), self.kind()
        if k == "LET":
            self.next(); name = self.ident(); ty = None
            if self.at(":"): self.next(); ty = self.type_()
            self.expect("="); e = self.expr(); self.expect(";")
            return N("let", line, name, ty, e)
        if k == "IF":
            self.next(); c = self.expr(); then = self.block(); els = None
            if self.kind() == "ELSE":
                self.next(); els = self.statement() if self.kind() == "IF" else self.block()
            return N("if", line, c, then, els)
        if k == "WHILE":
            self.next(); c = self.expr(); return N("while", line, c, self.block())
        if k == "RETURN":
            self.next(); e = self.expr(); self.expect(";"); return N("return", line, e)
        if self.at("{"): return self.block()
        if k == "ID" and self.toks[self.pos + 1][1] == "=":      # two tokens of look-ahead
            name = self.ident(); self.next(); e = self.expr(); self.expect(";")
            return N("assign", line, name, e)
        e = self.expr(); self.expect(";"); return N("exprstmt", line, e)
```

Because blocks are compulsory after `if` and `while`, Mini has no dangling-`else` problem; `else if` is allowed by parsing an `if` statement directly after `else`. An identifier at the start of a statement begins an assignment if the *next* token is `=` and an expression statement (such as a call) otherwise — the one place where Mini needs two tokens of look-ahead.

::: example The AST of Euclid's algorithm {#ex-gcd-ast}
Parse this program and print the AST of `gcd`.

```text
fn gcd(a: int, b: int) -> int {
    while b != 0 {
        let t = a % b;
        a = b;
        b = t;
    }
    return a;
}
fn main() -> int {
    print(gcd(1071, 462));
    return 0;
}
```
::: solution
```text
fn('gcd', [('a', 'int'), ('b', 'int')], 'int', block([while(bin('!=', var('b'), num(0)), block([let('t', None, bin('%', var('a'), var('b'))), assign('a', var('b')), assign('b', var('t'))])), return(var('a'))]))
```

The 39 tokens of `gcd` have become 17 nodes. The parentheses, braces, colons, semicolons and keywords are gone; `let t = a % b;` has no declared type (`None`: it will be inferred from the initialiser); the condition `b != 0` is a single `bin` node, where a parse tree in the layered grammar would have had a chain of a dozen nonterminals above each operand. The program has no semantic errors, and the checker below returns an empty list.
:::
:::

## Names and scopes

::: definition Declaration, scope, binding {#def-scope}
A **declaration** introduces a name with some meaning — a variable, a function, a type. The **scope** of a declaration is the region of the program text in which uses of the name refer to it. Resolving a use to its declaration is **binding** it. In a language with **lexical** (or **static**) **scope**, the scope is determined by the program text alone: a use of $x$ refers to the declaration of $x$ in the innermost enclosing block that has one, provided the declaration precedes the use.
:::

Mini's rules, which are those of most languages descended from ALGOL: a block `{ … }` opens a new scope; a `let` declares a variable from the next statement to the end of its block; a declaration in an inner block may **shadow** one of the same name in an outer block, but two declarations of the same name in one block are an error; function parameters are in a scope that encloses the function body; and functions are declared at the top level, all visible in every function body, so that functions can call each other in any order.

A symbol table for lexical scope is a **stack of dictionaries**: entering a block pushes an empty dictionary, leaving it pops; a declaration goes into the top dictionary; a lookup searches from the top down.

```python
class Symbol:
    def __init__(self, name, kind, type, line, index=None):
        self.name, self.kind, self.type, self.line = name, kind, type, line
        self.index = index                # variables: a unique number per function

class Scopes:
    def __init__(self): self.stack = [{}]
    def enter(self): self.stack.append({})
    def leave(self): self.stack.pop()
    def declare(self, sym):
        if sym.name in self.stack[-1]:
            return self.stack[-1][sym.name]      # clash: return the earlier symbol
        self.stack[-1][sym.name] = sym
    def lookup(self, name):
        for scope in reversed(self.stack):       # innermost scope first
            if name in scope: return scope[name]
        return None
```

`declare` and `enter`/`leave` take constant time and `lookup` takes time proportional to the nesting depth, which is small in practice. (A compiler for a language with very deep nesting can keep one hash table mapping each name to a stack of its current declarations, plus a list of the names declared in each open scope to undo on leaving: then every operation is constant time.) Each variable symbol gets a number, unique within its function, so that later phases can tell apart two different variables that happen to have the same name.

::: example Resolving names {#ex-scopes}
In the function below, which declaration does each use of `x` refer to, and what does the scope stack look like at the line marked `(*)`?

```text
fn h(x: int) -> int {
    let y = x;            // (1)
    {
        let x = y + 1;    // (2)
        let z = x * 2;    // (3)  (*)
        y = z;
    }
    return x + y;         // (4)
}
```
::: solution
The scope stack at `(*)`, from the bottom: the global scope $\set{\mathtt{print}, \mathtt{h}}$; the parameter scope $\set{x_0}$ (the parameter, number 0); the function body $\set{y_1}$; the inner block $\set{x_2}$, to which $z_3$ is added once line (3) has been checked. Use (1) is in the function body, where the innermost `x` is the parameter $x_0$. In line (2) the initialiser `y + 1` is checked *before* the new `x` is declared, so the `y` is $y_1$; the new $x_2$ shadows the parameter. Use (3) finds $x_2$ in the top scope. At (4) the inner block has been popped, so `x` is the parameter $x_0$ again, and `y` is $y_1$, whose value was changed inside the block. If the program ran with argument 5, it would return $5 + 12 = 17$.
:::
:::

Checking the initialiser before declaring the name is a deliberate choice: in `let x = x + 1;` inside a block, the `x` on the right refers to the outer `x` (Rust's rule as well). C makes the opposite choice — a declarator's scope begins at the end of the declarator, so in `int x = x + 1;` the `x` on the right is the new, uninitialised variable, which is undefined behaviour; GCC 15.2 warns ("'x' is used uninitialized") only with `-Wall`.

Two passes are needed for the functions. If the checker processed functions in order, declaring each one as it went, then `even` could not call `odd` if `odd` were defined after it. Mini's checker first enters every function's signature in the global scope (pass 1), then checks the bodies (pass 2). C, designed for one-pass compilers, instead requires a **prototype** before the first call.

::: widget graph
nodes: main@0,1; gcd@2,0; print@2,2; even@4,0; odd@4,2
edges: main>gcd; main>print; main>even; even>odd; odd>even
algorithm: topo
caption: A **call graph**: an edge $f \to g$ means that the body of $f$ calls $g$. If the graph has no cycles, checking the functions in reverse topological order would find every callee already declared — run the topological sort to see that it fails here, because `even` and `odd` call each other (mutual recursion). Collecting all signatures in a first pass, as Mini's checker does, removes any dependence on the order of definitions. The same graph is used much later by optimisers that inline functions or analyse them bottom-up, where cycles are handled by grouping strongly connected components.
:::

## Types

A **type system** assigns types to the phrases of a program by rules that follow the structure of the AST. The standard way to write such rules is as **inference rules**: premises above a line, conclusion below.

::: definition Typing judgement and typing rules for Mini expressions {#def-typing}
A **type environment** $\Gamma$ is a finite map from variable names to types and from function names to signatures $(\tau_1, \dots, \tau_k) \to \tau$. The **judgement** $\Gamma \vdash e : \tau$ ("in environment $\Gamma$, expression $e$ has type $\tau$") holds when it can be derived by the following rules, in which $n$ is any integer literal, $\oplus_{\mathit{a}} \in \set{+, -, *, /, \%}$, $\oplus_{\mathit{o}} \in \set{<, \le, >, \ge}$, $\oplus_{\mathit{l}} \in \set{\&\&, \|\|}$ and $\oplus_{\mathit{e}} \in \set{==, !=}$:

$$
\frac{}{\Gamma \vdash n : \mathtt{int}} \qquad
\frac{}{\Gamma \vdash \mathtt{true} : \mathtt{bool}} \qquad
\frac{}{\Gamma \vdash \mathtt{false} : \mathtt{bool}} \qquad
\frac{\Gamma(x) = \tau}{\Gamma \vdash x : \tau}
$$

$$
\frac{\Gamma \vdash e : \mathtt{int}}{\Gamma \vdash -e : \mathtt{int}} \qquad
\frac{\Gamma \vdash e : \mathtt{bool}}{\Gamma \vdash\ !e : \mathtt{bool}} \qquad
\frac{\Gamma \vdash e_1 : \mathtt{int} \quad \Gamma \vdash e_2 : \mathtt{int}}{\Gamma \vdash e_1 \oplus_{\mathit{a}} e_2 : \mathtt{int}} \qquad
\frac{\Gamma \vdash e_1 : \mathtt{int} \quad \Gamma \vdash e_2 : \mathtt{int}}{\Gamma \vdash e_1 \oplus_{\mathit{o}} e_2 : \mathtt{bool}}
$$

$$
\frac{\Gamma \vdash e_1 : \mathtt{bool} \quad \Gamma \vdash e_2 : \mathtt{bool}}{\Gamma \vdash e_1 \oplus_{\mathit{l}} e_2 : \mathtt{bool}} \qquad
\frac{\Gamma \vdash e_1 : \tau \quad \Gamma \vdash e_2 : \tau}{\Gamma \vdash e_1 \oplus_{\mathit{e}} e_2 : \mathtt{bool}} \qquad
\frac{\Gamma(f) = (\tau_1, \dots, \tau_k) \to \tau \quad \Gamma \vdash e_i : \tau_i \ (1 \le i \le k)}{\Gamma \vdash f(e_1, \dots, e_k) : \tau}
$$
:::

The rules for statements use a judgement $\Gamma \vdash_{\rho} s \Rightarrow \Gamma'$, "in environment $\Gamma$, inside a function returning $\rho$, statement $s$ is well typed and leaves the environment $\Gamma'$ for the statements after it". The interesting ones are

$$
\frac{\Gamma \vdash e : \tau}{\Gamma \vdash_{\rho} \mathtt{let}\ x = e \Rightarrow \Gamma[x \mapsto \tau]} \qquad
\frac{\Gamma(x) = \tau \quad \Gamma \vdash e : \tau}{\Gamma \vdash_{\rho} x = e \Rightarrow \Gamma} \qquad
\frac{\Gamma \vdash e : \rho}{\Gamma \vdash_{\rho} \mathtt{return}\ e \Rightarrow \Gamma} \qquad
\frac{\Gamma \vdash e : \mathtt{bool} \quad \Gamma \vdash_{\rho} s \Rightarrow \Gamma'}{\Gamma \vdash_{\rho} \mathtt{while}\ e\ s \Rightarrow \Gamma}
$$

where $\Gamma[x \mapsto \tau]$ is $\Gamma$ updated (or extended) with $x$ of type $\tau$, and a block threads the environment through its statements and then restores the outer one — which is exactly what the scope stack does. A function definition is well typed if its body is well typed in the environment of all signatures plus its parameters, with $\rho$ its declared result type.

::: example A typing derivation {#ex-derivation}
Derive the type of `x < y + 1 && !done` in $\Gamma = \set{x : \mathtt{int},\ y : \mathtt{int},\ \mathit{done} : \mathtt{bool}}$.
::: solution
Building the derivation from the leaves:

$$
\dfrac{
  \dfrac{\dfrac{\Gamma(x) = \mathtt{int}}{\Gamma \vdash x : \mathtt{int}} \quad
         \dfrac{\dfrac{\Gamma(y) = \mathtt{int}}{\Gamma \vdash y : \mathtt{int}} \quad \dfrac{}{\Gamma \vdash 1 : \mathtt{int}}}{\Gamma \vdash y + 1 : \mathtt{int}}}
        {\Gamma \vdash x < y + 1 : \mathtt{bool}}
  \qquad
  \dfrac{\dfrac{\Gamma(\mathit{done}) = \mathtt{bool}}{\Gamma \vdash \mathit{done} : \mathtt{bool}}}{\Gamma \vdash\ !\mathit{done} : \mathtt{bool}}
}{\Gamma \vdash x < y + 1\ \&\&\ !\mathit{done} : \mathtt{bool}}
$$

The derivation has exactly the shape of the AST: one rule per node, and at each node the only rule whose conclusion has the right form. The checker computes the same thing bottom-up, and the decorated tree it leaves behind records the type at every node:

```text
bin ['&&'] bool
  bin ['<'] bool
    var ['x'] int
    bin ['+'] int
      var ['y'] int
      num [1] int
  un ['!'] bool
    var ['done'] bool
```
:::
:::

### The checker

The checker is a recursive function over the AST that computes, for each expression, the unique type that the rules allow, or reports an error. To avoid an avalanche of messages caused by one mistake, it gives an erroneous expression the special type `error`, which every rule accepts silently: once `n + true` has been reported, `x` (initialised with it) has type `error`, and `while x` causes no second message.

```python
    ARITH = {"+", "-", "*", "/", "%"}; ORDER = {"<", "<=", ">", ">="}; LOGIC = {"&&", "||"}

    def expr(self, e):
        e.type = self.infer(e); return e.type

    def infer(self, e):
        k = e.kind
        if k == "num": return "int"
        if k == "bool": return "bool"
        if k == "var":
            sym = self.scopes.lookup(e.kids[0]); e.sym = sym
            if sym is None: self.error(e.line, f"{e.kids[0]} is not declared"); return "error"
            if sym.kind != "var": self.error(e.line, f"{e.kids[0]} is a function"); return "error"
            return sym.type
        if k == "un":
            op, a = e.kids; t = self.expr(a); want = "int" if op == "-" else "bool"
            if t == "error": return "error"
            if t != want: self.error(e.line, f"operand of {op} is {t}, not {want}"); return "error"
            return want
        if k == "bin":
            op, a, b = e.kids; ta, tb = self.expr(a), self.expr(b)
            if "error" in (ta, tb): return "error"
            if op in self.ARITH or op in self.ORDER: want = "int"
            elif op in self.LOGIC: want = "bool"
            else: want = ta                       # == and != : both sides alike
            if ta != want or tb != want:
                self.error(e.line, f"operands of {op} are {ta} and {tb}"); return "error"
            return "int" if op in self.ARITH else "bool"
        if k == "call":
            name, args = e.kids; ts = [self.expr(a) for a in args]
            sym = self.scopes.lookup(name); e.sym = sym
            if sym is None or sym.kind != "fn":
                self.error(e.line, f"{name} is not a function"); return "error"
            ptypes, ret = sym.type
            if len(ts) != len(ptypes):
                self.error(e.line, f"{name} takes {len(ptypes)} arguments, not {len(ts)}")
            for i, (t, p) in enumerate(zip(ts, ptypes)):
                if t not in (p, "error"): self.error(e.line, f"argument {i + 1} of {name} is {t}, not {p}")
            return ret
```

Each `var` and `call` node is decorated with its symbol (`e.sym`), and every expression node with its type; later phases use both and never look a name up again.

::: theorem The checker decides the typing judgement {#thm-checker}
For every expression $e$ and every environment $\Gamma$ (represented by the scope stack), `expr(e)` returns a type $\tau \ne$ `error` and reports no error if and only if $\Gamma \vdash e : \tau$ is derivable. Moreover, every expression has at most one type: if $\Gamma \vdash e : \tau$ and $\Gamma \vdash e : \tau'$ then $\tau = \tau'$.
:::

::: proof
By structural induction on $e$. In each case exactly one rule of [[#def-typing]] has a conclusion whose expression has the form of $e$ — the rules are **syntax-directed** — so a derivation for $e$, if there is one, must end with that rule, applied to derivations for the subexpressions.

*Literals and variables.* The literal rules have no premises, and the checker returns their types. For a variable, the rule requires $\Gamma(x) = \tau$; `lookup` returns the innermost declaration of $x$, which by the scoping rules is what $\Gamma(x)$ means; the checker returns its type, and reports an error exactly when $x$ is undeclared or is a function, in which case no rule applies.

*Operators.* For $e_1 \oplus_{\mathit a} e_2$, a derivation exists iff derivations of $\Gamma \vdash e_1 : \mathtt{int}$ and $\Gamma \vdash e_2 : \mathtt{int}$ exist. By the induction hypothesis, that holds iff the recursive calls return `int` without errors; the checker returns `int` in exactly that case and reports an error (or propagates `error`) otherwise. The other operators are identical except for the types involved; for $==$ the checker requires the two operand types, which are unique by induction, to be equal, which is the condition of the rule. Calls are the same, with the signature from the table.

*Uniqueness.* By induction as well: the last rule is determined by the form of $e$, and its conclusion's type is determined by the premises' types (for example, $\oplus_{\mathit o}$ always gives `bool`), which are unique by the induction hypothesis.
:::

Statements are checked by the same kind of recursion, with the scope stack playing the role of the threaded environment:

```python
    def stmt(self, s):
        """Check statement s; return True if every path through it returns."""
        k = s.kind
        if k == "block":
            self.scopes.enter(); returns = False
            for t in s.kids[0]:
                if returns: self.error(t.line, "unreachable statement")
                returns = self.stmt(t) or returns
            self.scopes.leave(); return returns
        if k == "let":
            name, declared, e = s.kids
            t = self.expr(e)                     # checked before name is in scope
            if declared and t != "error" and t != declared:
                self.error(s.line, f"{name} is declared {declared} but initialised with {t}")
            s.sym = self.declare_var(name, declared or t, s.line)
        elif k == "assign":
            name, e = s.kids; t = self.expr(e); sym = self.scopes.lookup(name)
            if sym is None or sym.kind != "var": self.error(s.line, f"{name} is not a variable")
            elif t != "error" and t != sym.type:
                self.error(s.line, f"cannot assign {t} to {name}, which is {sym.type}")
            s.sym = sym
        elif k == "if":
            c, then, els = s.kids; self.condition(c, "if")
            r1 = self.stmt(then); r2 = self.stmt(els) if els else False
            return r1 and r2
        elif k == "while":
            self.condition(s.kids[0], "while"); self.stmt(s.kids[1])
        elif k == "return":
            t = self.expr(s.kids[0])
            if t != "error" and t != self.ret:
                self.error(s.line, f"returning {t} from a function declared to return {self.ret}")
            return True
        elif k == "exprstmt":
            self.expr(s.kids[0])
        return False
```

The method returns a second piece of information, a Boolean saying whether *every* path through the statement ends in a `return`: true for `return`, for an `if` both of whose branches return, and for a block containing such a statement; false otherwise. This is a tiny **static analysis**, which we use to report functions that may fall off their end, and statements after a `return` that can never run. The remaining methods enter all signatures, then check each function body with its parameters in scope:

```python
    def program(self, prog):
        self.scopes.declare(Symbol("print", "fn", (["int"], "int"), 0))   # built-in
        for f in prog.kids[0]:                   # pass 1: all signatures, for recursion
            name, params, ret, _ = f.kids
            if self.scopes.declare(Symbol(name, "fn", ([t for _, t in params], ret), f.line)):
                self.error(f.line, f"function {name} is already defined")
        for f in prog.kids[0]: self.function(f)  # pass 2: the bodies
        return self.errors

    def function(self, f):
        name, params, ret, body = f.kids
        self.ret, self.nvars = ret, 0
        self.scopes.enter()
        for pname, ptype in params: self.declare_var(pname, ptype, f.line)
        if not self.stmt(body):
            self.error(f.line, f"function {name} may finish without returning a value")
        self.scopes.leave()

    def declare_var(self, name, type, line):
        sym = Symbol(name, "var", type, line, self.nvars); self.nvars += 1
        if (old := self.scopes.declare(sym)):
            self.error(line, f"{name} is already declared in this scope (line {old.line})")
        return sym
```

(`condition` checks that an expression has type `bool`, and `error` appends a message with its line number.)

::: example Checking the bad function {#ex-errors}
Run the checker on the function from the start of the chapter, with one extra line, `while x { x = x - 1; }`, before the end.
::: solution
```text
line 2: operands of + are int and bool
line 3: undefined is not declared
line 4: if condition is int, not bool
line 4: returning int from a function declared to return bool
line 5: g is not a function
line 1: function f may finish without returning a value
```

Six messages for six mistakes. The `while x` loop produces no message although `x` is not a Boolean: `x` has type `error`, because its initialiser was erroneous, and the checker does not repeat itself. The missing-return message comes last because it is discovered only after the whole body has been checked. `y`, initialised with an erroneous expression, also gets type `error`.
:::
:::

::: quiz
With the checker above, how many error messages does this function produce?

```text
fn k(a: int) -> int {
    let b = a < 1;
    let c = b + 1;
    let d = c * 2;
    return d;
}
```
- [ ] none
- [x] one
- [ ] two
- [ ] three
::: solution
`b` has type `bool`, so `b + 1` is reported ("operands of + are bool and int") and gets type `error`. Then `c` is declared with type `error`, so `c * 2` has type `error` silently, `d` has type `error`, and `return d` is not reported because the returned type is `error`. One message — the only real mistake. Without the `error` type the checker would have to choose a type for `c` and would likely report a cascade of follow-up errors.
:::
:::

## Type safety

What does the type checker buy us? The classic answer, due to Robin Milner (1978), is: **well-typed programs cannot go wrong**. "Going wrong" means reaching a state in which the language's semantics does not say what to do — adding a Boolean to an integer, using an integer as a condition, calling a function with the wrong number of arguments. For Mini expressions we can prove it directly. Define the values of the two types, $\mathcal V(\mathtt{int}) = \Z_{2^{64}}$ (64-bit integers) and $\mathcal V(\mathtt{bool}) = \set{\mathit{true}, \mathit{false}}$, and say that a run-time **store** $\sigma$ (a map from variables to values) **matches** $\Gamma$ if $\sigma(x) \in \mathcal V(\Gamma(x))$ for every variable $x$ in $\Gamma$.

::: theorem Type soundness for Mini expressions {#thm-soundness}
Assume that every function $f$ with $\Gamma(f) = (\tau_1, \dots, \tau_k) \to \tau$, called with arguments $v_i \in \mathcal V(\tau_i)$, either returns a value in $\mathcal V(\tau)$ or does not return. If $\Gamma \vdash e : \tau$ and $\sigma$ matches $\Gamma$, then evaluating $e$ in $\sigma$ never applies an operation to operands outside its domain of definition; it either produces a value in $\mathcal V(\tau)$, or does not terminate (inside a call), or stops with a division by zero.
:::

::: proof
By induction on the derivation of $\Gamma \vdash e : \tau$.
- *Literals*: an integer literal evaluates to an integer, `true` and `false` to Booleans.
- *Variable*: $\sigma(x) \in \mathcal V(\Gamma(x)) = \mathcal V(\tau)$ because $\sigma$ matches $\Gamma$.
- *Arithmetic*: by the induction hypothesis $e_1$ and $e_2$ produce integers (or fail to terminate, or divide by zero, which propagate); integer addition, subtraction and multiplication modulo $2^{64}$ are defined on all integers and give integers; division and remainder are defined except for a zero divisor (and, with wrap-around semantics, $-2^{63} / -1$ is defined as $-2^{63}$).
- *Comparisons, logic, equality*: the operands have the types the operator requires, by the induction hypothesis — for $==$ both have the same type $\tau$, and equality is defined on $\mathcal V(\tau)$ — and the result is a Boolean.
- *Call*: the arguments evaluate to values of the parameter types (induction), so by the assumption on $f$ the call returns a value of type $\tau$ or does not return.

In no case is an operation applied to a value of the wrong kind.
:::

The assumption on functions is discharged by checking each function body with its parameters at their declared types: a proof for whole programs is an induction on the length of the execution, the same theorem for statements, and the return rule, which guarantees that every `return` produces a value of the declared result type. The definite-return check guarantees that there is a `return` at all. This is the structure of every type-safety proof; for languages with recursion, higher-order functions and polymorphism it is usually presented as two lemmas, **progress** (a well-typed program that has not finished can take a step) and **preservation** (a step preserves the type), proved by Andrew Wright and Matthias Felleisen in 1994 for a core of ML.

Note what type soundness does not promise. Division by zero is still possible, and so are array indices out of range, null pointers, infinite loops and wrong answers: the type system rules out only the errors it was designed to rule out. A richer type system rules out more — Rust's ownership types rule out data races and use-after-free; dependent types can rule out out-of-range indices — at the price of more work for the programmer and the compiler.

::: warning Implicit conversions are part of the type system
Mini has no implicit conversions: `1 + true` is an error. C has many, and they can turn a comparison upside down. In C, comparing an `unsigned int` with an `int` converts the `int` to `unsigned`, so `-1` becomes $2^{32} - 1$:

```c
unsigned int u = 1;
int i = -1;
printf("%d\n", u > i);           /* i is converted to unsigned */
printf("%d\n", (long)u > i);     /* both converted to long */
```

prints `0` and then `1` (GCC 15.2, x86-64). The type checker is doing exactly what the C standard's "usual arithmetic conversions" require; the program is well typed and its behaviour is defined, but almost certainly not what was meant. GCC warns only with `-Wextra` ("comparison of integer expressions of different signedness"). When reading a type checker, always ask which conversions it inserts silently — in the AST they appear as explicit conversion nodes, which is how C compilers represent them.
:::

## Attributes and syntax-directed translation

The checker computes values — types, symbols, "always returns" — at the nodes of the tree. Donald Knuth's **attribute grammars** (1968) make this the definition of a language's static semantics: each grammar symbol has **attributes**, and each production has **semantic rules** that compute them.

::: definition Synthesised and inherited attributes {#def-attributes}
In an attribute grammar, an attribute of a node is **synthesised** if its value is computed by the rule of the production at that node, from attributes of the node's children (information flowing up the tree), and **inherited** if it is computed by the rule of the production at the node's *parent*, from attributes of the parent and of the node's siblings (information flowing down or sideways). An attribute grammar is **S-attributed** if all its attributes are synthesised, and **L-attributed** if each inherited attribute of a child depends only on inherited attributes of the parent and on attributes of the siblings to its *left*.
:::

In our checker, the type of an expression is synthesised; the environment $\Gamma$ is inherited (it comes from the enclosing declarations, to the left); and "always returns" is synthesised. L-attributed grammars can be evaluated in a single left-to-right depth-first traversal, which is why both a recursive-descent parser and our checker can do everything in one walk; S-attributed grammars can be evaluated during LR parsing, by computing a production's attributes when it is reduced — the `$$ = $1 + $3` actions of Yacc and Bison.

::: example Evaluating attributes during parsing {#ex-attributes}
Give an S-attributed grammar that computes the value of an arithmetic expression, and show the attribute values computed during the SLR parse of `2 * 3 + 4` (with numbers as tokens whose attribute is their value).
::: solution
Rules, with the attribute $\mathit{val}$:

| production | semantic rule |
|---|---|
| $E \to E_1 + T$ | $E.\mathit{val} = E_1.\mathit{val} + T.\mathit{val}$ |
| $E \to T$ | $E.\mathit{val} = T.\mathit{val}$ |
| $T \to T_1 * F$ | $T.\mathit{val} = T_1.\mathit{val} \times F.\mathit{val}$ |
| $T \to F$ | $T.\mathit{val} = F.\mathit{val}$ |
| $F \to (E)$ | $F.\mathit{val} = E.\mathit{val}$ |
| $F \to \mathrm{num}$ | $F.\mathit{val} = \mathrm{num}.\mathit{lexval}$ |

The LR parser keeps a value next to each state on its stack. The reductions of [[compilers/bottom-up-parsing#ex-slr-trace]] (with `num` for `id`) compute: $F \to \mathrm{num}$ gives $F.\mathit{val} = 2$; $T \to F$ gives $2$; after shifting `*` and `3`, $F \to \mathrm{num}$ gives $3$ and $T \to T * F$ gives $2 \times 3 = 6$; $E \to T$ gives $6$; after `+ 4`, $F$, $T$ give $4$ and $E \to E + T$ gives $6 + 4 = 10$. Each value is computed when its production is reduced, from values already on the stack: a reduction pops $\lvert\beta\rvert$ values and pushes one. Replacing the arithmetic by node construction ($E.\mathit{node} = N(\texttt{"bin"}, \texttt{"+"}, E_1.\mathit{node}, T.\mathit{node})$) builds the AST in the same way.
:::
:::

Attribute grammars were developed into compiler-generator systems in the 1970s and 1980s, but production compilers implement semantic analysis by hand, as a tree walk like ours (or several: Clang's semantic analysis runs while parsing, GCC's partly afterwards). The concepts remain useful for thinking about what information flows where, and they reappear, generalised from trees to graphs, in the data-flow analyses of [[compilers/dataflow-optimisation]].

### Beyond Mini

Real languages add many features to this core, and each affects the symbol table and the checker:

- **Overloading**: one name, several functions distinguished by parameter types (C++, Java). Lookup returns a set of candidates, and **overload resolution** chooses the best match given the argument types, according to ranking rules.
- **Records and classes**: each `struct` or class has its own scope of field and method names; `p.x` is resolved in the scope of `p`'s type. Inheritance chains these scopes.
- **Modules and imports**: names are qualified (`std::vector`, `os.path.join`), and the symbol table becomes a tree of namespaces.
- **Type inference**: Mini infers the type of `let t = a % b` from its initialiser — local inference, which C++ (`auto`), Java (`var`), Go (`:=`), Rust and TypeScript also do. ML and Haskell infer the types of whole functions, including polymorphic ones, by the Hindley–Milner algorithm, which solves type equations by unification.
- **Generics** and **subtyping**: a type variable or a subtype relation replaces type equality in the rules, so the checker must test $\tau \le \tau'$ or instantiate type parameters.

::: history
The distinction between concrete and abstract syntax goes back to John McCarthy's 1962 work on LISP and the semantics of programming languages. Donald Knuth introduced attribute grammars in "Semantics of context-free languages" (*Mathematical Systems Theory*, 1968), with inherited and synthesised attributes and a test for circularity. ALGOL 60 (1960) established block structure and lexical scope, and the stack-of-tables symbol table followed with its compilers. Robin Milner's "A theory of type polymorphism in programming" (*Journal of Computer and System Sciences*, 1978) gave the type-inference algorithm of ML, building on Roger Hindley's 1969 work, and coined "well-typed programs cannot go wrong". Luca Cardelli and Peter Wegner's survey "On understanding types, data abstraction, and polymorphism" (1985) and Andrew Wright and Matthias Felleisen's "A syntactic approach to type soundness" (1994), which introduced the progress-and-preservation method, shaped how type systems are presented today; Benjamin Pierce's *Types and Programming Languages* (2002) is the standard textbook.
:::

## Where this leads

The decorated AST is the input to [[compilers/intermediate-representations]], which translates Mini functions into three-address code and control-flow graphs, using the symbols' unique numbers to name variables and the types to choose operations. The definite-return check was a first data-flow analysis on a tree; [[compilers/dataflow-optimisation]] does the same kind of reasoning on control-flow graphs, where loops make the equations recursive.

::: summary
- Semantic analysis enforces rules that grammars cannot express — declaration before use, type correctness, definite return — on the **abstract syntax tree** ([[#def-ast]]), which keeps only meaningful structure.
- **Lexical scope** ([[#def-scope]]) is implemented by a **stack of symbol tables**: push on entering a block, pop on leaving, look up innermost first. Mutually recursive functions need a first pass that collects all signatures.
- A **type system** is a set of syntax-directed inference rules for judgements $\Gamma \vdash e : \tau$ ([[#def-typing]]); the checker is a recursive function that decides them and gives each expression its unique type ([[#thm-checker]]).
- An `error` type stops one mistake from causing a cascade of messages.
- **Type soundness** ([[#thm-soundness]]): well-typed programs never apply an operation to values outside its domain; they can still divide by zero or loop. Implicit conversions are part of the type system and can be surprising.
- **Attribute grammars** ([[#def-attributes]]) describe the information flow: synthesised attributes flow up (types), inherited attributes flow down (environments); S-attributed definitions are evaluated during LR parsing.
:::

## Exercises

::: exercise Counting AST nodes {level=1 check="8"}
How many nodes does the AST of the expression `x < y + 1 && !done` have, counting every `bin`, `un`, `var` and `num` node? (Enter the number.)
::: solution
By kind: `bin` nodes `&&`, `<`, `+` (3); `un` node `!` (1); `var` nodes `x`, `y`, `done` (3); `num` node `1` (1). Total $3 + 1 + 3 + 1 = 8$, matching the decorated tree printed in [[#ex-derivation]]. A parse tree in the layered grammar of [[compilers/top-down-parsing]] would have several times as many nodes.
:::
:::

::: exercise Scope stacks {level=1}
For the function `h` of [[#ex-scopes]], list the contents of the scope stack (all scopes, bottom to top) just before the `return` statement is checked, and say what `h(1)` returns.
::: solution
Global $\set{\mathtt{print}, \mathtt{h}}$; parameters $\set{x_0}$; function body $\set{y_1}$. The inner block's scope $\set{x_2, z_3}$ has been popped. With argument 1: $y = 1$; inside the block $x_2 = 2$, $z = 4$, $y = 4$; then `return x + y` uses the parameter: $1 + 4 = 5$.
:::
:::

::: exercise Typing rules for conditionals {level=1}
Write the typing rule for an `if` statement with an `else` branch, in the style of the statement rules above, and for a conditional *expression* `c ? e1 : e2` (as in C). Which of the two needs the branches to have the same type, and why?
::: solution
$$
\frac{\Gamma \vdash e : \mathtt{bool} \quad \Gamma \vdash_\rho s_1 \Rightarrow \Gamma_1 \quad \Gamma \vdash_\rho s_2 \Rightarrow \Gamma_2}{\Gamma \vdash_\rho \mathtt{if}\ e\ s_1\ s_2 \Rightarrow \Gamma}
\qquad
\frac{\Gamma \vdash c : \mathtt{bool} \quad \Gamma \vdash e_1 : \tau \quad \Gamma \vdash e_2 : \tau}{\Gamma \vdash c\ ?\ e_1 : e_2 : \tau}
$$
The conditional expression needs both branches to have the same type $\tau$, because its value is used: whichever branch is taken, the result must have the single type $\tau$ claimed for the whole expression. The statement produces no value, so its branches are checked independently (and declarations inside them do not escape: the result environment is $\Gamma$).
:::
:::

::: exercise Counting error messages {level=2 check="3"}
How many messages does the Mini checker report for the following function? (Enter the number.)

```text
fn m(p: bool) -> int {
    let q = p + 1;
    let r: bool = 3;
    if q { return 1; }
    return r;
}
```
::: solution
Line 2: `p + 1` has operands `bool` and `int`: one message; `q` gets type `error`. Line 3: `r` is declared `bool` but initialised with `int`: a second message; `r` gets the declared type `bool`. Line 4: the condition `q` has type `error`: no message. Line 5: returning `bool` from a function declared to return `int`: a third message. The function always returns, so no missing-return message. Total $3$.
:::
:::

::: exercise A conservative analysis {level=2}
(a) The checker reports "may finish without returning a value" for `fn f(n: int) -> int { while true { if n > 0 { return n; } n = n + 1; } }`, although the function can only leave the loop by returning. Explain why, and modify `stmt` so that a `while` whose condition is the literal `true` counts as "always returns" when its body contains no `break` (Mini has none). (b) Is the modified analysis still sound — that is, if it says "always returns", does every execution that reaches the end of the statement return? (c) Why can no compiler decide exactly whether a function can reach its end?
::: solution
(a) The rule for `while` returns False: in general the loop may run zero times and then fall through. Add, in the `while` case:

```python
        elif k == "while":
            self.condition(s.kids[0], "while"); self.stmt(s.kids[1])
            c = s.kids[0]
            return c.kind == "bool" and c.kids[0] is True     # 'while true' never falls through
```

(b) Yes. `while true` without `break` can only be left by a `return` inside it (or not at all), so no execution falls through to the statement after it. "Always returns" for a statement means "no execution completes it normally", and that holds. This is the rule used by Java (a `while` whose condition is the constant `true` "cannot complete normally") and the reason Rust has a separate `loop` construct: `rustc` 1.95 rejects the `while true` version with "mismatched types" (and suggests `loop`) but accepts the `loop` version.

(c) Deciding whether execution can reach the end of a function would decide the halting problem: given a program $P$, the function `{ P; }` (followed by nothing) reaches its end iff $P$ halts. So every such check is a conservative approximation: it may reject correct programs, but must never accept wrong ones.
:::
:::

::: exercise Shadowing rules {level=2}
Change the Mini checker so that (a) a `let` in the outermost block of a function may not shadow a parameter (C's rule), and (b) `let x = x + 1;` refers to the new `x` on the right-hand side, as in C, and is reported as "x is used in its own initialiser". Describe the changes and give a test for each.
::: solution
(a) Parameters live in their own scope, below the body's. In `function`, instead of letting the body's `stmt` call push a new scope, declare the parameters in the scope that the body will use: e.g. check the body's statement list directly in the parameter scope (`for t in body.kids[0]: …`) rather than calling `stmt(body)`; then `declare` finds the parameter in the same dictionary and reports "already declared in this scope". Test: `fn f(n: int) -> int { let n = 3; return n; }` must give one error.

(b) In the `let` case, declare the symbol *before* checking the initialiser, but mark it as "being initialised"; in `infer` for `var`, if the symbol found is marked, report "x is used in its own initialiser"; clear the mark after the initialiser has been checked. Test: in `fn g(x: int) -> int { { let x = x + 1; return x; } }` the original checker accepts (the right-hand `x` is the parameter); the modified one reports one error. Note the change in meaning: the scope of the new declaration now starts at its name, not after its initialiser.
:::
:::

::: exercise Soundness of the return rule {level=3}
Prove: if a statement $s$ is well typed in a function returning $\rho$, the `stmt` method returns True for $s$, and some execution of $s$ (starting in a store that matches the environment) terminates, then that execution ends by executing `return e` with a value of type $\rho$ — it never finishes $s$ normally. State clearly what induction you use.
::: solution
Induction on the structure of $s$, proving: if `stmt(s)` returns True, no terminating execution of $s$ completes normally (it ends with a `return`); combined with the typing of `return` (the value has type $\rho$, by [[#thm-soundness]]) this gives the claim.
- `return e`: the execution evaluates $e$ and returns; it does not complete normally.
- `if e s1 s2`: True requires both `stmt(s1)` and `stmt(s2)` True. An execution evaluates $e$ (which, being well typed, gives a Boolean or does not terminate) and then executes one branch; by the induction hypothesis that branch does not complete normally, so neither does the `if`.
- A block $\set{t_1 \cdots t_k}$: True means some $t_j$ has `stmt` True. An execution runs $t_1, t_2, \dots$ in order; if it reaches $t_j$, by the induction hypothesis $t_j$ does not complete normally, so the block does not; if it does not reach $t_j$, then some earlier $t_i$ did not complete normally, so again the block does not.
- `let`, assignment, expression statement, `while`: `stmt` returns False, so there is nothing to prove.
The induction is on the AST (structural); executions of loops are infinite in general, but we never need to induct on them because `while` is a base case returning False.
:::
:::

::: exercise Overload resolution {level=3}
Suppose Mini allowed several functions with the same name but different parameter types, e.g. `fn show(x: int) -> int` and `fn show(b: bool) -> int`. (a) Change the symbol table and the `call` case of the checker to support this, with the rule that a call is resolved to the unique candidate whose parameter types equal the argument types. (b) What should happen when an argument has type `error`? (c) Explain why overloading interacts badly with Mini's type inference for `let`, using the example `let f = show;` in a language with function values.
::: solution
(a) Store a list of function symbols per name: `declare` for functions appends to the list (reporting an error only if a candidate with the same parameter types exists). In `call`, compute the argument types first, then filter the candidates: `[s for s in cands if s.type[0] == ts]`. If exactly one remains, decorate the call with it (`e.sym = it`) and return its result type; if none, report "no function show for (bool, int)"; if several (possible only if equal signatures were allowed), report an ambiguity.

(b) If any argument has type `error`, resolution cannot be trusted: report nothing more and return `error` (or, if all candidates have the same result type, return that type to reduce cascades further). This is the error-type discipline applied to resolution.

(c) Resolution needs the argument types, but `let f = show;` has no arguments: the name alone denotes a *set* of functions, and the type of `f` cannot be inferred from the initialiser. Languages resolve this by requiring a type annotation (`let f: fn(int) -> int = show;`), which provides the expected type from the context — information flowing *down* the tree, an inherited attribute — as C++ does when taking the address of an overloaded function, or by forbidding overloading altogether, as ML, Haskell (outside type classes), Go and Rust do, partly to keep type inference simple.
:::
:::
