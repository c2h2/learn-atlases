程序到达编译器时是一串字符：

```text
fn max(a: int, b: int) -> int {
    if a >= b { return a; }   // 平局时取 a
    return b;
}
```

对语法分析器来说，这些字符多半是噪音。它想知道的是：程序以关键字 `fn` 开头，接着是一个标识符、一个左圆括号、又一个标识符、一个冒号、关键字 `int`，如此等等；它不在乎标识符拼作 `max`、单词之间隔了几个空格、注释写了什么。**词法分析器**（lexer，又称**扫描器**）就是读入字符并把它们归并成这些“词”的阶段，这些词就是**单词符号**，空格与注释则顺手丢弃。它是唯一逐字符查看的阶段，所以必须快；而它的规则——什么算标识符、什么算数、什么算运算符——恰是正则表达式所描述的那一类模式。

本章构造一个**词法分析器生成器**：它接受一组以正则表达式写成的单词符号定义，产出一个一次识别全部定义的确定有限自动机，再配一个驱动程序按最长匹配把输入切成单词符号。它用到的理论是 [[theory-of-computation/regular-expressions]] 和 [[theory-of-computation/nondeterminism]]——汤普森构造法与子集构造法——并加上编译器在顶层需要的东西：同时处理多个模式、模式之间的优先级、最长匹配规则，以及关键字、行号、注释与布局等实际问题。途中还会遇到一个意外：几乎每个词法分析器都在用的那个显而易见的算法，可能耗时平方级。

## 单词符号、词素与模式

::: definition 单词符号、词素、模式 {#def-token}
**单词符号**是一个二元组（*种别*，*属性*）：种别是语法分析器所用文法中的一个符号——`ID`、`NUM`、`IF`、`PLUS`——属性携带后续阶段需要的信息，例如标识符的名字或数的数值。**词素**是源程序中构成一个单词符号的字符序列，例如 `max` 或 `>=`。**模式**是对某个种别的词素集合的一种描述，通常是一个正则表达式。
:::

种别与属性的划分之所以要紧，是因为语法分析器只看种别：文法说的是“表达式可以是 `ID`”，而不是“表达式可以是 `max`”。语义分析随后使用属性。词法分析器还会给每个单词符号附上一个**源位置**（文件、行、列），让后续阶段能在正确的位置报告错误——这对编译器的易用性重要得超乎意料。

我们的运行语言 **Mini** 有如下单词符号种别；它的文法和类型在 [[compilers/semantic-analysis]] 给出。字符类按 Python `re` 的写法书写：`[a-z]` 是一个小写字母，`[^\n]` 是除换行符外的任意字符。

| 种别 | 模式 | 例 |
|---|---|---|
| 关键字 `FN`、`LET`、`IF`、`ELSE`、`WHILE`、`RETURN`、`INT`、`BOOL`、`TRUE`、`FALSE` | 该单词本身 | `fn`、`while` |
| `ID` | `[a-zA-Z_][a-zA-Z0-9_]*` | `max`、`x1`、`_tmp` |
| `NUM` | `[0-9]+` | `0`、`42` |
| `OP` | `==`、`!=`、`<=`、`>=`、`&&`、`\|\|`、`->` 或 `-+*/%<>=!(){},;:` 之一 | `>=`、`{` |
| `WS`（丢弃） | `[ \t\n]+` | |
| `COMMENT`（丢弃） | `//[^\n]*` | `// ties go to a` |

（为省笔墨，所有标点都共用种别 `OP`，属性为词素本身；生产级的词法分析器会给每个标点单独一种种别。）

模式之间有重叠。词素 `if` 既匹配关键字模式又匹配 `ID` 模式；`iffy` 匹配 `ID`，它的前缀 `if` 匹配关键字；`>=` 匹配两字符运算符，它的前缀 `>` 匹配一字符的那个。所以词法分析器需要抉择的规则，而一切通行的词法分析器用的都是同两条。

::: definition 最长匹配规则 {#def-munch}
给定按**优先顺序**列出的单词符号模式 $R_1, \dots, R_k$ 和剩余输入 $w$，下一个单词符号按如下方式确定。
1. **最长匹配**：取 $w$ 的最长前缀 $u$，使 $u \in L(R_i)$ 对某个 $i$ 成立。
2. **优先级**：在匹配 $u$ 的那些模式中，选下标 $i$ 最小的那个。

单词符号即 $(\text{种别 } R_i, u)$；扫描从 $u$ 之后继续。若没有任何非空前缀匹配任何模式，则输入在该位置发生**词法错误**。
:::

按这些规则，把关键字模式列在 `ID` 之前，输入 `iffy if` 给出 `ID(iffy)`（最长匹配压过关键字前缀），接着是 `IF`（对词素 `if`，`IF` 和 `ID` 匹配同样长的前缀，而 `IF` 排在前面）。输入 `a>=b` 给出 `ID(a)`、`OP(>=)`、`ID(b)`。

::: example C 中的最长匹配 {#ex-munch-c}
C 的词法分析器对运算符集合 `+`、`++`、`+=`、`-`、`--`、`->`、`>`、`>=`、…使用最长匹配，它会把 (a) `x+++++y`、(b) `a-->b`、(c) `0x1` 切成什么样？后果如何？
::: solution
(a) 在 `+++++` 处最长的运算符是 `++`，再来一个 `++`，然后是 `+`：单词符号是 `x ++ ++ + y`，它被分析成 `(x++)++ + y`——这是错误，因为 `x++` 不能再被递增。GCC 15.2 报告 `error: lvalue required as increment operand`，尽管读作 `x++ + ++y` 本来完全没问题。词法分析器不请教语法分析器，无从知道程序员想要哪种切法；空格必须由你来写。

(b) `a -- > b`：“把 `a` 减一，拿旧值与 `b` 比较”，这就是 `while (i --> 0)` 里著名的“递减至”运算符。它根本不是一个新运算符，只是最长匹配使然。

(c) 在 C 中 `0x1` 是一个单词符号，即十六进制常量 $1$，因为 C 的数的模式包含 `0x` 前缀。在 Mini 里，`NUM` 的模式是 `[0-9]+`，我们的词法分析器会把它切成 `NUM(0)` 和 `ID(x1)`——一对完全合法的单词符号，随后会被语法分析器拒绝。哪种切法对，完全取决于模式。
:::
:::

::: warning 最长匹配不搜索切分方案
这条规则是*贪心*的。单词符号一旦取定就绝不回头，所以它会在那些其实可以切成单词符号的输入上失败。取模式 `ab`、`a` 和 `bc`，输入 `abc`：最长匹配是 `ab`，此后 `c` 什么都不匹配——词法错误——尽管 `a` 后接 `bc` 明明可行。语言的设计要使贪心恰好给出预期的读法（或者给出程序员加个空格就能修好的错误）；一个对所有切法都做搜索的词法分析器会更慢、含义更模糊，读起来也更意外。
:::

## 从模式到一台自动机

词法分析器可以在每个位置上用正则表达式库逐个试模式，但那样每个模式、每个位置都在重复劳动。词法分析器生成器的做法是：把所有模式编译成**一台**确定自动机，对输入只跑一遍。构造分三步：

::: algorithm 词法分析器的生成 {#alg-lexgen}
输入：按优先顺序排列的单词符号模式 $R_1, \dots, R_k$。输出：状态带有单词符号种别标记的 DFA。
1. 对每个 $R_i$，用汤普森构造法（[[theory-of-computation/regular-expressions#thm-thompson]]）造出 NFA $N_i$，带单一接受状态 $f_i$。
2. 新建开始状态 $s$，加 $\varepsilon$-转移到 $N_1, \dots, N_k$ 的开始状态。合并后的 NFA 称为 $N$；它接受 $L(R_1) \cup \dots \cup L(R_k)$。
3. 对 $N$ 施行子集构造法（[[theory-of-computation/nondeterminism#alg-subset]]），只构造从 $\varepsilon\text{-closure}(\set{s})$ 可达的状态。给每个 DFA 状态 $D$（一个 NFA 状态集合）标记 $f_i \in D$ 成立的**最小** $i$ 对应的 $R_i$ 的种别；若这样的 $i$ 不存在则不标记。
4. 可选：最小化 DFA（[[theory-of-computation/non-regular-languages#alg-moore]]），分割细化从**按标记**的分割出发，而不是按接受/非接受。
:::

::: theorem 带标记子集构造的正确性 {#thm-tagged}
记 $\hat\delta(w)$ 为从开始状态读入 $w$ 到达的 DFA 状态（若该运行没有掉出自动机）。则对每个串 $w$：$\hat\delta(w)$ 有定义当且仅当 $w$ 是 $L(R_1) \cup \dots \cup L(R_k)$ 中某个串的前缀；且 $\hat\delta(w)$ 带种别 $i$ 的标记当且仅当 $i$ 是满足 $w \in L(R_i)$ 的最小下标。
:::

::: proof
由 [[theory-of-computation/nondeterminism#lem-reach]]，$\hat\delta(w)$ 就是从 $s$ 出发、沿拼出 $w$ 的路径可达的 NFA 状态集合（构造跳过空集，故该运行恰好在这个集合为空时无定义）。一个 NFA 状态沿 $w$ 可达，当且仅当 $w$ 是某个从此处往后接受的串的前缀——汤普森构造法中每个状态都在从其片段开始状态到接受状态的路径上，所以“沿 $w$ 可达”的意思是“$w$ 可以扩充成某个 $L(R_i)$ 中的串”。其次，由于各片段 $N_i$ 不共享状态、只经由 $s$ 进入，$f_i$ 沿 $w$ 可达当且仅当 $N_i$ 接受 $w$，即 $w \in L(R_i)$。标记规则取其中最小的 $i$。
:::

由于 DFA 在每个前缀处的标记恰好告诉我们该前缀匹配哪个模式（若有），最长匹配规则可以这样实现：从当前位置开始尽量往前跑 DFA，记住途中经过的最后一个带标记状态。下面的扫描器就是这么做的。先生成器。它把每个正则表达式解析成一棵树（并 `|`、连接、`*`、`+`、`?`、圆括号、字符类 `[…]` 以及转义符 `\n`、`\t`）：

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

$R^+$ 去糖为 $RR^*$、$R?$ 去糖为 $R \mid \varepsilon$ 就发生在这里，于是后面的各步只见 [[theory-of-computation/regular-expressions#def-regex]] 的那五种构造。原子是单个字符、`.`（除换行符外的任意字符）和字符类；字符类化成一个字符集合，于是沿 `[a-z]` 的转移是一条以集合为标签的边，而不是 26 条边。

```python
    def atom():
        c = take()
        if c == "(":
            r = alt(); take(); return r     # 跳过 ')'
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

汤普森构造法（[[theory-of-computation/regular-expressions#thm-thompson]]）把每棵树变成一个带单一开始状态和单一接受状态的 NFA 片段：

```python
class NFA:
    def __init__(self):
        self.eps, self.edges = [], []   # eps[q]：状态列表；edges[q]：(集合, 状态)
    def new(self):
        self.eps.append([]); self.edges.append([]); return len(self.eps) - 1

def thompson(nfa, r):
    """为正则表达式 AST r 添加一个片段；返回其（开始, 接受）状态。"""
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

最后，所有片段挂到一个开始状态之下，再跑子集构造，给每个 DFA 状态标记它所包含的接受状态中最早那条规则的种别，恰如 [[#alg-lexgen]] 所言：

```python
def closure(nfa, states):
    stack, seen = list(states), set(states)
    while stack:
        for p in nfa.eps[stack.pop()]:
            if p not in seen: seen.add(p); stack.append(p)
    return frozenset(seen)

def build_dfa(rules):
    """rules：(单词符号名, 正则表达式) 的列表，按优先顺序。"""
    nfa = NFA(); start = nfa.new(); accept = {}
    for i, (name, rx) in enumerate(rules):
        s, f = thompson(nfa, parse_regex(rx))
        nfa.eps[start].append(s); accept[f] = i
    d0 = closure(nfa, [start])
    index, trans, tag, work = {d0: 0}, [{}], [None], [d0]
    while work:
        D = work.pop(); i = index[D]
        hits = [accept[q] for q in D if q in accept]
        tag[i] = rules[min(hits)][0] if hits else None   # 最早的规则胜出
        for c in sorted(ALPHA):
            E = closure(nfa, [p for q in D for (cs, p) in nfa.edges[q] if c in cs])
            if not E: continue
            if E not in index:
                index[E] = len(trans); trans.append({}); tag.append(None); work.append(E)
            trans[i][c] = index[E]
    return trans, tag, len(nfa.eps)
```

DFA 是一个字典列表 `trans[state][char]`，缺项意为“无转移”（子集构造的死状态从不构造）。flex 这样的生产级生成器会把它压缩成按字符类索引的数组，但信息完全相同。

::: example 手工构造 DFA {#ex-ifid}
对 `IF` = `if` 和 `ID` = `[a-z]+` 两条规则构造带标记的 DFA，用一台手工制作的 NFA：开始状态 $0$，带 $\varepsilon$-转移到 $1$ 和 $4$；$1 \xrightarrow{i} 2 \xrightarrow{f} 3$，其中 $3$ 接受 `IF`；$4 \xrightarrow{[a-z]} 5$ 且 $5 \xrightarrow{[a-z]} 5$，其中 $5$ 接受 `ID`。然后最小化它。
::: solution
开始状态：$A = \set{0, 1, 4}$，无标记。从 $A$ 出发：读 `i`，NFA 可走 $1 \to 2$ 和 $4 \to 5$，得 $B = \set{2, 5}$，标记 `ID`（它含 $5$ 但不含 $3$）；读其他字母，只有 $4 \to 5$，得 $D = \set{5}$，标记 `ID`。
从 $B$ 出发：读 `f`，$2 \to 3$ 和 $5 \to 5$ 得 $C = \set{3, 5}$；两个接受状态都在场，而 `IF` 优先，故 $C$ 标记 `IF`。读其他字母，得 $D$。
从 $C$ 和从 $D$ 出发：读任何字母都得 $D$。

| 状态 | NFA 集合 | 标记 | 读 `i` | 读 `f` | 读其他字母 |
|---|---|---|---|---|---|
| $A$ | $\set{0,1,4}$ | — | $B$ | $D$ | $D$ |
| $B$ | $\set{2,5}$ | `ID` | $D$ | $C$ | $D$ |
| $C$ | $\set{3,5}$ | `IF` | $D$ | $D$ | $D$ |
| $D$ | $\set{5}$ | `ID` | $D$ | $D$ | $D$ |

最小化从按标记的分割 $\set{A}$、$\set{B, D}$、$\set{C}$ 出发。$B$ 和 $D$ 会被分开，因为读 `f` 时一个去 $C$、另一个留在 $\set{B, D}$ 中。所以四个状态两两不同，最小 DFA 有 4 个状态。我们的生成器（对同样的两条规则，用汤普森 NFA 代替手工的那台）构造出 5 个 DFA 状态并最小化到 4 个——多出的那个状态是 $D$ 的第二份拷贝，从 $A$ 读入 `i` 以外的字母、且任何字母都未读第二次之前即可到达。
:::
:::

::: widget graph
nodes: A@0,1; B@2,0; C@4,0; D@3,2
edges: A>B; A>D; B>C; B>D; C>D; D>D
algorithm: bfs
start: A
caption: [[#ex-ifid]] 的最小 DFA。边的标签省略：$A \to B$ 读 `i`，$B \to C$ 读 `f`，其余每条边读剩下的字母。$B$ 和 $D$ 标记 `ID`，$C$ 标记 `IF`。从 $A$ 出发逐步演示广度优先搜索，可见每个状态都在两步之内可达——任何更长的串到达的状态都是 $D$。扫描 `ifs` 依次经过 $A, B, C, D$：最后经过的带标记状态是 $D$（`ID`），所以 `ifs` 是标识符；扫描 `if ` 停在 $C$，得到关键字。
:::

## 扫描器

::: algorithm 最长匹配扫描器 {#alg-scan}
输入：带标记的 DFA，正文 $w = w_0 w_1 \cdots w_{n-1}$。
1. $\mathit{pos} \gets 0$。
2. 当 $\mathit{pos} < n$：
    1. $q \gets$ 开始状态；$i \gets \mathit{pos}$；$\mathit{last} \gets$ 无。
    2. 当 $i < n$ 且 $q$ 在 $w_i$ 上有转移：$q \gets \delta(q, w_i)$；$i \gets i + 1$；若 $q$ 带种别 $k$ 的标记，则 $\mathit{last} \gets (k, i)$。
    3. 若 $\mathit{last}$ 为无，在 $\mathit{pos}$ 处报告词法错误。
    4. 否则 $(k, e) \gets \mathit{last}$；除非 $k$ 应被跳过，发出单词符号 $(k, w_{\mathit{pos}..e-1})$；$\mathit{pos} \gets e$。
:::

由 [[#thm-tagged]]，第 2.2 步的运行恰好沿着剩余输入中那些仍可扩充成某个单词符号的前缀走，而 $\mathit{last}$ 记录其中最长的、确实是单词符号的那个，其标记给出优先级最高的模式——所以这个扫描器正是 [[#def-munch]] 的实现。最后带标记状态之后读入的字符是要交还的：扫描从 $e$ 恢复，而不是 $i$。用 Python 写：

```python
def scan(dfa, text, skip=("WS", "COMMENT")):
    trans, tag, _ = dfa
    pos, line, steps = 0, 1, 0
    while pos < len(text):
        state, i, last = 0, pos, None       # last = 最长匹配的（单词符号, 终点）
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

行号靠数每个词素中的换行符来维护，被跳过的空格与注释也算在内。计数器 `steps` 记录 DFA 转移的步数；下文用它来度量开销。

::: example 扫描 Mini {#ex-scan-mini}
按上面表中的规则为 Mini 生成词法分析器，在它开头的那个函数 `max` 上运行。
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
toks = list(scan(DFA, src))         # src = max 的正文
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

93 个字符变成了 27 个单词符号；注释和所有空格换行都被丢掉。每个字符恰好花一步 DFA 转移：对 Mini，DFA 从不跑到单词符号末尾之外再回头交还字符（见 [[#thm-scan-cost]]）。汤普森构造造出 191 个 NFA 状态，子集构造造出 61 个可达的 DFA 状态，最小化后剩 47 个。在这台机器上，用 Python 生成整个词法分析器约需 30 毫秒。
:::
:::

这里用的最小化例程就是 Moore 的分割细化，初始分割由标记给出：

```python
def minimise(dfa):
    trans, tag, _ = dfa
    n = len(trans)
    block = [tag[q] for q in range(n)]          # 起点：按单词符号标记分组
    while True:
        sig = [(block[q],) + tuple(block[trans[q][c]] if c in trans[q] else None
                                   for c in sorted(ALPHA)) for q in range(n)]
        ids = {}
        new = [ids.setdefault(s, len(ids)) for s in sig]
        if len(ids) == len(set(block)): return len(ids)
        block = new
```

标记不同的两个状态绝不能合并——一个结束标识符，另一个结束关键字——所以细化从按标记的分割起步。[[theory-of-computation/non-regular-languages#thm-minimise]] 的证明把“同接受或同拒绝”换成“同标记”后原样成立。（这个函数只返回块数；完整版本还应构造商自动机。）

::: quiz
按 Mini 的规则（关键字列在 `ID` 之前），`iffy if0 if 0x1` 产生哪些单词符号？
- [ ] `IF(if) ID(fy) IF(if) NUM(0) IF(if) NUM(0) ID(x1)`
- [x] `ID(iffy) ID(if0) IF(if) NUM(0) ID(x1)`
- [ ] `ID(iffy) IF(if) NUM(0) IF(if) NUM(0x1)`
- [ ] 在 `0x1` 处发生词法错误
::: solution
最长匹配使 `iffy` 和 `if0` 成为标识符：`ID` 模式允许首字符之后出现数字。单独的词素 `if` 同时匹配 `IF` 和 `ID` 且长度相同，`IF` 优先。`0x1` 不是 Mini 的数；`0` 处最长的单词符号是 `NUM(0)`，随后 `x1` 是标识符。程序打印 `[('ID', 'iffy', 1), ('ID', 'if0', 1), ('IF', 'if', 1), ('NUM', '0', 1), ('ID', 'x1', 1)]`。
:::
:::

## 扫描器有多快？

DFA 每步转移做的工作是常数，所以扫描的开销就是转移步数。扫描器至少把每个字符读一遍，但它可能读到单词符号末尾之外的字符再交还回去。

::: definition 超出量 {#def-overshoot}
对 [[#alg-scan]] 外层循环的一次以单词符号终点 $e$ 和内层下标 $i$ 结束的执行，**超出量**是 $i - e$：最后带标记状态之后读入的字符数。
:::

::: theorem 最长匹配扫描的开销 {#thm-scan-cost}
在一个能无错扫描完的长度为 $n$ 的输入上，DFA 转移步数为 $n + \Omega$，其中 $\Omega$ 是所有单词符号的超出量之和。若每个超出量都不超过 $c$，扫描器以 $O((c + 1)\, n)$ 时间运行。一般情况下转移步数可达 $\Theta(n^2)$。
:::

::: proof
每次从 $\mathit{pos}$ 出发的迭代花 $i - \mathit{pos} = (e - \mathit{pos}) + (i - e)$ 步转移：单词符号的长度加上超出量。单词符号划分了整个输入，其长度之和为 $n$，故总数为 $n + \Omega$。若每个超出量都不超过 $c$ 且单词符号至多 $n$ 个，则 $\Omega \le cn$。

下界：取两条规则 `A` = `a` 和 `B` = `a*b`，输入为 $a^n$。在位置 $p$，DFA 可以一路跟读 `a` 直到读不动为止（`b` 也许还会来，凑成一个完整的 `B`），于是它读完剩下的全部 $n - p$ 个字符才掉出末尾，而最后一个带标记状态在一字符之后：单词符号是 `A(a)`，超出量 $n - p - 1$。总数为 $\sum_{p=0}^{n-1} (n - p) = n(n+1)/2$ 步。又因为每次迭代不超过 $n$ 步、迭代至多 $n$ 次，$O(n^2)$ 同时是上界。
:::

运行我们的扫描器，步数与该计数分毫不差：

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

真实的单词符号集合超出量很小。在 Mini 上，合法输入的超出量恒为 $0$：每个运算符的每个真前缀要么是运算符本身，要么后面不能再跟别的东西，这就是扫描 `max` 每字符恰好一步的原因。在 C 中它是个小常数：读过 `..` 之后，扫描器必须再看下一个字符，判断它是否构成 `...` 这个单词符号，若不是就交还一个 `.`。我们的扫描器对 `a..b`、以 `...`、`.` 和标识符为单词符号时，用 5 步转移处理 4 个字符，产出 `ID(a) DOT DOT ID(b)`。Thomas Reps 在 1998 年证明最长匹配总能在线性时间内完成：记住哪些（状态，位置）对已经失败过、不再通向单词符号——一张 $O(\lvert Q\rvert n)$ 的动态规划表——但由于真实语言的超出量极小，生产级词法分析器就直接用 [[#alg-scan]]。

::: example 一个未闭合的注释 {#ex-quadratic}
某个 C 风格语言的词法分析器有规则 `COMMENT` = `/[*]([^*]|[*]+[^*/])*[*]+/`（块注释 `/* … */`）、`DIV` = `/`、`MUL` = `[*]` 和 `ID` = `[a-z]+`。数一数长 $n = 3k$、不含 `*/` 的输入 $(\texttt{/*a})^k$ 上的 DFA 转移步数。
::: solution
在位置 $3j$ 的 `/` 处，DFA 读 `/*` 进入块注释模式后一路走下去——`a`、`/`、`*a`、…在注释内都合法——直到输入结束，在第一个 `/` 之后再没到达过接受状态。它回退到 `DIV(/)`，已花去 $n - 3j$ 步转移。随后 `*` 一步给出 `MUL`，`a` 一步给出 `ID`。总数为
$$
\sum_{j=0}^{k-1} (3k - 3j) + 2k = \frac{3k(k+1)}{2} + 2k ,
$$
是 $n$ 的二次函数。我们的扫描器结果一致：对 $k = 10, 100, 1000$ 分别花 $185$、$15\,350$ 和 $1\,503\,500$ 步转移。真实的 C 词法分析器靠读到 `/*` 时**承诺投入**来回避这一点：注释一旦开始，到达文件末尾就报告“unterminated comment”错误，而不再回退。仅此一个设计决定就给超出量设了界。
:::
:::

## 词法分析器实务

### 关键字

像我们为 Mini 那样把每个关键字单列一条模式，会让 DFA 变大：我们的生成器对 Mini 给出 61 个 DFA 状态（最小化后 47 个），而去掉那十条关键字规则只剩 25 个（最小化后 11 个）。通行的替代做法是把关键字当标识符识别，然后在返回单词符号之前到保留字哈希表里查一下词素；查表为每个标识符花一次哈希，却保住了自动机的小身材。两种方法给出相同的单词符号，因为按优先级规则，关键字恰好就是出现在关键字表里的标识符词素。手写词法分析器几乎总用查表。

### 手写词法分析器

尽管生成的扫描器很优雅，GCC、Clang、Go 与 Rust 编译器以及多数 JavaScript 引擎的词法分析器却是手写的：对首字符作 `switch`，标识符或数字再用紧凑的循环。手写词法分析器就是同一台 DFA 以代码形态呈现；它很容易做得快（每个单词符号一次间接跳转，标识符字符用紧凑循环），而且它天然是安置真实语言中那些不规整特性的地方：字符串字面量里的转义序列、带后缀和数字分隔符的数值字面量、Unicode 标识符，以及下面这些上下文依赖。生成器（面向 C 的 lex 和 flex、re2c、ANTLR 的词法分析器、Rust 的 `logos`）在工具和小型语言上依然流行。

### 正则表达式力不从心之处

有些词法特性不是正则的，或者依赖上下文。

- **嵌套注释。**OCaml 的 `(* … *)` 和 Rust 的 `/* … */` 注释可以嵌套。正确嵌套的注释集不是正则的，理由与括号平衡不是正则的一样（[[theory-of-computation/non-regular-languages]]）。词法分析器用一个计数器处理它们：见 `/*` 加一，见 `*/` 减一，减到零即完成——扫描器里藏着一台微型下推自动机。
- **扫描器状态。**字符串字面量或模板字符串内部规则不同（`"http://…"` 里的 `//` 不是注释）。生成器支持**开始条件**：扫描器在若干台 DFA 之间切换。
- **来自语法分析器的反馈。**在 C 中，`T * x;` 当 `T` 是一个类型名（由 `typedef` 声明）时是指针声明，否则是乘法。既然文法需要知道是哪种，C 的词法分析器就查看符号表，为类型名返回不同的种别——所谓“词法分析器技巧”（lexer hack）。类似地，一门允许用户自定义运算符的语言，其词法分析器必须知道哪些运算符已被声明。
- **布局。**在 Python 和 Haskell 中，缩进划定程序块。词法分析器借助一个存放已打开缩进宽度的栈，把缩进变化翻译成显式的 `INDENT` 和 `DEDENT` 单词符号，让文法可以像对待花括号那样对待它们。

::: example INDENT 与 DEDENT 单词符号 {#ex-layout}
写出布局算法，在一个小的 Python 片段和一个缩进回退不一致的片段上运行。
::: solution
```python
def layout(lines):
    """把行首空格变成 INDENT/DEDENT 单词符号，如同 Python 的分词器。"""
    stack = [0]                          # 已打开块的缩进宽度
    for n, line in enumerate(lines, 1):
        if not line.strip(): continue    # 空行不计
        width = len(line) - len(line.lstrip(" "))
        if width > stack[-1]:
            stack.append(width); yield "INDENT"
        while width < stack[-1]:
            stack.pop(); yield "DEDENT"
        if width != stack[-1]:
            raise IndentationError(f"line {n}: unindent does not match any outer level")
        yield f"LINE({line.strip()})"
    while len(stack) > 1:                # 文件末尾仍未闭合的块
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

比栈顶缩进更多的行开一个新块；缩进更少的行不断闭合块直到宽度吻合，每闭合一个发一个 `DEDENT`，所以最后一行一口气闭了两个块。宽度落在两个已打开层次严格之间的行是错误；CPython 的分词器对同样情形的报告是 `IndentationError: unindent does not match any outer indentation level`。（真正的分词器还要处理制表符、续行符和括号——括号内部的缩进会被忽略。）
:::
:::

### 错误

词法错误——无法作为任何单词符号开头的字符、未闭合的字符串或注释——通常先报告，然后**恢复**：跳过肇事字符，好让编译器继续报告后面的错误。好的词法分析器还会及早抓住可料的失误：缺失的引号在字符串开始的那一行报告，而不是到文件末尾才报。

::: history
用有限自动机系统处理词法分析的首个工作，是 Walter Johnson、James Porter、Stephanie Ackley 与 Douglas Ross 的“Automatic generation of efficient lexical processors using finite state techniques”（*Communications of the ACM*，1968 年），描述 MIT 的 AED 项目中的 RWORD 系统。肯·汤普森（Thompson）的正则表达式编译器发表于同年。Mike Lesk 在贝尔实验室写出 **Lex**；1975 年的技术报告“Lex — a lexical analyzer generator”（与写出了基于 DFA 版本的那个 Eric Schmidt 合作）使它进入 Unix，与 Stephen Johnson 的语法分析器生成器 Yacc 配成一对。Vern Paxson 的 **flex**（约 1987 年）成为自由且更快的替代品，沿用至今；re2c（Peter Bumbulis 与 Donald Cowan，1994 年）把 DFA 直接生成为 C 代码。最长匹配规则是多数语言定义的一部分；Thomas Reps 的“Maximal-munch tokenization in linear time”（*ACM TOPLAS*，1998 年）证明其平方级最坏情形可以避免。
:::

## 后续内容

词法分析器交付一串单词符号；[[compilers/top-down-parsing]] 和 [[compilers/bottom-up-parsing]] 搭建单词符号流所编码的结构，使用的是上下文无关文法（[[theory-of-computation/context-free-grammars]]），其终结符恰好就是本章的单词符号种别。同样的自动机技术在 [[compilers/bottom-up-parsing]] 的 LR 语法分析器中重现，其核心对象是文法符号上的一台 DFA。

::: summary
- 词法分析器把字符变成**单词符号**（种别加属性，并带源位置），顺手丢弃空格与注释（[[#def-token]]）。
- 相互重叠的模式由**最长匹配**裁决：先取最长，再按规则优先级（[[#def-munch]]）。它是贪心的，可能拒绝某些其实存在别种切法的输入。
- 词法分析器生成器把全部模式的汤普森 NFA 挂到同一个开始状态下，然后跑子集构造，给每个 DFA 状态**标记**它能接受的最高优先级模式（[[#alg-lexgen]]、[[#thm-tagged]]）；最小化从按标记的分割起步。
- 扫描器尽量往前跑 DFA，再回退到最后的带标记状态（[[#alg-scan]]）。开销为 $n$ 加上**超出量**总和：对真实单词符号集合是线性的，最坏情形是平方（[[#thm-scan-cost]]）。
- 关键字最好当作标识符识别、再查表；这使 Mini 的 DFA 从最小化后的 47 个状态缩到 11 个。
- 嵌套注释、字符串字面量状态、C 的 typedef 名字与基于缩进的布局超出了正则表达式的能力，分别用计数器、扫描器状态、来自语法分析器的反馈和缩进栈处理。
:::

## 习题

::: exercise 数单词符号 {level=1 check="11"}
Mini 词法分析器对 `let x1 = 0x2 >= y && !z; // done` 产生多少个单词符号（不计空格与注释）？（填入数字。）
::: solution
`LET`、`ID(x1)`、`OP(=)`、`NUM(0)`、`ID(x2)`、`OP(>=)`、`ID(y)`、`OP(&&)`、`OP(!)`、`ID(z)`、`OP(;)`：十一个单词符号。注意 `0x2` 是两个单词符号 `NUM(0)` 和 `ID(x2)`，与选择题中一样；注释被丢弃。
:::
:::

::: exercise 最长匹配与优先级 {level=1}
模式按优先顺序为：`IF` = `if`、`ID` = `[a-z]+`、`NUM` = `[0-9]+`、`REAL` = `[0-9]+\.[0-9]+`、`DOT` = `\.`，以及空白。切分 (a) `if ifx 3.14`、(b) `3.x`、(c) `3..4`。
::: solution
(a) `IF`、`ID(ifx)`、`REAL(3.14)`。(b) 从 `3` 起，DFA 读入 `3`（带标记 `NUM`）和 `.`（可能有 `REAL` 跟来，但该状态无标记），随后 `x` 走不下去；回退到 `NUM(3)`，超出量 1；随后 `DOT`、`ID(x)`。(c) `NUM(3)`（超出量 1，同 (b)：读过 `3.` 后 DFA 期待一个数字，看到的却是 `.`），然后 `DOT`、`DOT` 和 `NUM(4)`。我们的生成器对这三个输入产出的单词符号序列恰恰如此。
:::
:::

::: exercise 平方级扫描 {level=1 check="210"}
对规则 `A` = `a` 和 `B` = `a*b`，扫描器在输入 $a^{20}$ 上做多少次 DFA 转移？（填入数字。）
::: solution
由 [[#thm-scan-cost]] 的证明，从位置 $p$ 开始的扫描花 $20 - p$ 步转移，$p = 0, \dots, 19$：总数是 $20 + 19 + \dots + 1 = 20 \cdot 21 / 2 = 210$。我们的扫描器报告 210。在 $a^{20}b$ 上只花 21 步：第一个单词符号是全部的 `aaaa…ab`。
:::
:::

::: exercise 贪心的失败 {level=2}
(a) 证明对模式 `ab`、`a`、`bc`，输入 `abc` 存在一种切分，而最长匹配却报告错误。(b) 证明若字母表的每个单字符本身都是单词符号，则最长匹配从不报告错误。(c) 证明集合 $\{$`a`、`b`、`ab`$\}$ 满足你在 (b) 中给出的条件。
::: solution
(a) `a` + `bc` 就是一种切分。最长匹配取 `ab`（最长），随后没有模式匹配 `c`。我们的生成器结论一致：`SyntaxError: line 1: unexpected 'c'`；再加一条模式 `c` 便产出 `AB(ab) C(c)`。

(b) 设字母表 $\Sigma$ 的每个单字符自身都是单词符号。那么在任何位置，剩余输入的长度一前缀都匹配某个模式，所以最长匹配总是存在，最长匹配对 $\Sigma$ 上的任何串都从不报告错误——特别地，它对 $L(P)^*$ 中的每个串都能成功。（它找到的切分可能与预期不同，但切分存在。）

(c) 在 $\Sigma = \{a, b\}$ 上两个单字符都是单词符号，故 (b) 适用：每个串都能被切成 `ab` 和单字母而不卡住。例如 `abbaab` 给出 `AB B A AB`。
:::
:::

::: exercise 查表识别关键字 {level=2}
改造 Mini 词法分析器，使关键字不再是独立的规则：词素属于集合 `KEYWORDS` 的 `ID` 单词符号改以关键字的种别返回。证明在一切输入上，所得单词符号流与原词法分析器完全相同，并说出省下了多少个 DFA 状态（用正文中的数字）。
::: solution
实现：用不含关键字规则的 `RULES` 构造 DFA，并包一层扫描器：

```python
def scan_kw(dfa, text):
    for kind, lexeme, line in scan(dfa, text):
        if kind == "ID" and lexeme in KEYWORDS: kind = lexeme.upper()
        yield (kind, lexeme, line)
```

等价性证明。每个关键字词素同时也是 `ID` 词素。*单词符号边界相同*：某位置上的最长匹配长度只依赖全部模式语言的并集，而增删关键字模式不改变并集（它们是 `ID` 语言的子集），所以“作为某个单词符号的最长前缀”在两个词法分析器中相同。*种别相同*：若选中的词素是关键字，原词法分析器给它打上关键字标记（关键字优先），新词法分析器给它打 `ID` 标记再改名为关键字；若它不是关键字，两个词法分析器都不能把它标成关键字，且都选同一条其余规则。DFA 从 61 个状态缩到 25 个（最小化后从 47 缩到 11），省了 36 个状态。
:::
:::

::: exercise 嵌套注释不是正则的 {level=2}
设 $C$ 是字母表 $\{$`(`、`)`、`x`$\}$ 上构成正确嵌套注释的串的集合，该语言中 `(` 打开一层注释、`)` 闭合一层（把 `/*` 和 `*/` 想成单个符号即可），即形如 `(` $w$ `)` 且 $w$ 平衡的串。证明 $C$ 不是正则的，并写一段扫描器代码，用计数器识别这样的注释。
::: solution
反设 $C$ 正则。串 $\texttt{(}^k$（$k = 1, 2, \dots$）两两可分辨：对 $j \ne k$，$\texttt{(}^j \texttt{)}^j \in C$ 而 $\texttt{(}^k \texttt{)}^j \notin C$（不平衡）。由 [[theory-of-computation/non-regular-languages#lem-dist]]，$C$ 的 DFA 将需要无穷多个状态——矛盾。

扫描器片段（读入开头的 `(` 之后调用）：

```python
def skip_comment(text, pos):          # text[pos - 1] == "(" 刚刚读过
    depth = 1
    while depth > 0:
        if pos == len(text): raise SyntaxError("unterminated comment")
        depth += {"(": 1, ")": -1}.get(text[pos], 0)
        pos += 1
    return pos                        # 恰在闭合的 ")" 之后的位置
```

计数器就是一台栈字母表只有一个字母的下推自动机的栈。真实的词法分析器对双字符定界符照同样办法处理，在每个位置检查 `/*` 和 `*/`。
:::
:::

::: exercise 单词符号集合的超出量 {level=3}
(a) 对 Mini 的规则，证明成功扫描中每个单词符号的超出量都是 $0$。(b) 对一个有限的模式集合，给出一个在带标记 DFA 上工作的算法，计算一切输入上的最大超出量（或报告它无界），并把它应用到规则 `A` = `a`、`B` = `a*b`。
::: solution
(a) 只有当 DFA 在带标记状态之后、停下之前经过无标记状态时，超出量才为正。对 Mini 逐种种别考察。标识符、数字、空白和注释：词素的每个可被 DFA 继续延长的非空前缀自身就是同种别的完整词素（模式形如 $x y^*$），所以这条路上首步转移之后的每个状态都带标记。运算符：多字符运算符 `==`、`!=`、`<=`、`>=`、`&&`、`||`、`->` 的首字符是 `=`、`!`、`<`、`>`、`&`、`|`、`-`；其中 `&` 和 `|` 单独不是单词符号，但它们只作为*首*字符出现，所以无标记状态只可能在任何带标记状态*之前*到达。带标记状态若无带标记后继，DFA 便停下。于是无标记状态从不紧跟在带标记状态之后：超出量为 $0$，这正是 [[#ex-scan-mini]] 的扫描对 93 个字符恰好花 93 步的原因。

(b) 设 $T$ 为带标记状态集。一次扫描的超出量是最后一次造访 $T$ 之后运行的长度。于是最大超出量是 DFA 中从带标记状态出发、之后只用无标记状态、并立即离开 $T$ 的最长路径——更准确地说，是满足 $q_0$ 带标记（且可达）、$q_1, \dots, q_m$ 无标记的最长路径 $q_0 \to q_1 \to \cdots \to q_m$。把 DFA 限制在无标记状态上：若从某个带标记状态可达的无标记状态子图含圈，超出量无界；否则它是一个 DAG，最长路径可按拓扑序动态规划求出（[[algorithms]]），时间与 DFA 大小成线性。对 `A`、`B`：读 `a` 之后，DFA 处于一个标记 `A` 的状态，它还包含 `B` 的 $a^*$ 环；再读 `a` 进入一个带 `a` 自环的无标记状态（仍在等 `b`）。无标记子图有圈，所以超出量无界，与平方级的行为吻合。
:::
:::

::: exercise 行号与列号 {level=3}
扩展 `scan`，使每个单词符号除行号外还带列号，其中列从 1 数起，制表符推进到下一个 8 的倍数加 1（列 1、9、17、…）。给出联系 `pos`、`line`、`col` 与正文的一个不变式，并证明你的代码保持它。
::: solution
让 `col` 与 `line` 并排维护，初始为 `1`。每取一个词素后，沿它的字符走一遍来更新两者：

```python
def advance(line, col, lexeme):
    for ch in lexeme:
        if ch == "\n": line, col = line + 1, 1
        elif ch == "\t": col = (col - 1) // 8 * 8 + 9
        else: col += 1
    return line, col
```

并在调用 `line, col = advance(line, col, lexeme)` 之前 yield `(kind, lexeme, line, col)`。

不变式：外层循环循环入口处，`line` 等于 `text[:pos]` 中换行符的个数加 $1$，`col` 是位置 `pos` 的显示列，其定义是把同样三条规则依次施加于 `text[:pos]` 中最后一个换行符之后的字符。初始 `pos = 0`、`line = 1`、`col = 1`：成立。若不变式在单词符号 `text[pos:end]` 之前成立，则 `advance` 恰好对 `text[pos:end]` 这些字符施加规则；其中若有换行符则列归零重计，所以此后 `col` 只依赖 `text[:end]` 中最后一个换行符之后的字符，而 `line` 增加了该词素中换行符的个数。于是不变式对 `end`、即新的 `pos` 成立。yield 出的位置是 `advance` *之前*的位置，由不变式正是单词符号首字符的位置。制表符把列 $c$ 移到 $\lfloor (c-1)/8 \rfloor \cdot 8 + 9$，即下一个制表位：从列 1–8 到 9，从 9–16 到 17。
:::
:::
