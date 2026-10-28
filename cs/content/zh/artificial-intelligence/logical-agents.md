一家医院的排班系统知道：没有外科医生会同时在两个手术室动手术，每台手术都需要一名麻醉师，奥卡福医生星期二休假。一个配置工具知道哪些部件互相兼容。一个验证工具知道一块芯片的转移规则。这些系统都没有被编程写入它将被问到的每个问题的答案；每个系统只是用形式语言得到了**知识**，它*依靠推理推导*出答案。被问"手术 17 星期二上午可以进行吗？"时，它应当只在"这从它所知道的东西推出"——在每一个与其知识相容的情形下都成立——时才回答"可以"，并且只要结论确实成立，它就应当能找到答案。

这正是**基于知识的智能体**的纲领：在一门逻辑中维护一个**知识库**（KB），用 `Tell` 操作把感知加入其中，用 `Ask` 询问什么是它的推论。这一设计把智能体*知道什么*（陈述性知识，可供检查与修改）与*如何推理*（一般的推理过程）分开。本章展开经典 AI 赖以立足的两门逻辑。在**命题逻辑**中，我们定义蕴含，用模型检验与**消解**判定它，证明消解可靠且反驳完备，并证明对**霍恩子句**，正向链可在线性时间内判定蕴含。在谈论对象与关系的**一阶逻辑**中，我们引入量词、**合一**与提升消解，并遇到根本的限制：蕴含只是半可判定的。命题逻辑本身——语法、真值表、范式——在 [Maths Atlas：命题逻辑](/learn/maths/lesson.php?c=proofs&l=propositional-logic) 中讲授；这里我们专注于推理算法。

## 蕴含与推理

我们固定一组**命题符号** $P, Q, R, \dots$。句子由符号与 $\top$、$\bot$ 经 $\lnot$、$\land$、$\lor$、$\Rightarrow$ 和 $\Leftrightarrow$ 构成，真值表如常。

::: definition 模型、可满足与蕴含 {#def-entailment}
**模型** $m$ 是给命题符号指派真值的一种指派。句子 $\alpha$ **在** $m$ **中为真**（写作 $m \models \alpha$）按真值表定义；$M(\alpha)$ 是 $\alpha$ 的模型之集。一个句子若有模型则称**可满足**，若在每个模型中都为真则称**有效**（**重言式**）。句子集（合取式）$\mathit{KB}$ **蕴含** $\alpha$，写作 $\mathit{KB} \models \alpha$，指 $\alpha$ 在 $\mathit{KB}$ 的每个模型中为真：$M(\mathit{KB}) \subseteq M(\alpha)$。
:::

蕴含是我们关心的语义关系：$\alpha$ 从我们所知道的推出。**推理过程**是一个句法过程 $i$，从句子推出句子；我们写作 $\mathit{KB} \vdash_i \alpha$。若它只推出被蕴含的句子（$\mathit{KB} \vdash_i \alpha$ 蕴涵 $\mathit{KB} \models \alpha$），则称它**可靠**；若它推出每个被蕴含的句子，则称它**完备**。可靠性不容妥协——不可靠的过程能"证明"谬误。完备性是可取的，但正如我们将看到的，有时要用它换效率。

::: theorem 蕴含、有效与不可满足 {#thm-refutation}
对句子 $\mathit{KB}$ 与 $\alpha$，下面几条等价：
1. $\mathit{KB} \models \alpha$；
2. $\mathit{KB} \Rightarrow \alpha$ 有效（**演绎定理**）；
3. $\mathit{KB} \land \lnot\alpha$ 不可满足。
:::

::: proof
(1 ⇒ 2) 在 $\mathit{KB}$ 为假的模型中，$\mathit{KB} \Rightarrow \alpha$ 为真；在 $\mathit{KB}$ 为真的模型中，$\alpha$ 由 (1) 为真，所以 $\mathit{KB} \Rightarrow \alpha$ 为真。(2 ⇒ 3) 若 $\mathit{KB} \Rightarrow \alpha$ 在每个模型中为真，就没有模型使 $\mathit{KB}$ 真而 $\alpha$ 假，即没有模型满足 $\mathit{KB} \land \lnot\alpha$。(3 ⇒ 1) 若没有模型满足 $\mathit{KB} \land \lnot\alpha$，则 $\mathit{KB}$ 的每个模型都满足 $\alpha$。
:::

于是蕴含归约为不可满足性——**归谬证明**，即*反证法*：要证 $\mathit{KB} \models \alpha$，把 $\lnot\alpha$ 加进去推出矛盾。由于可满足性是 $\mathsf{NP}$ 完全的（Cook–Levin 定理，[[complexity/np-completeness#thm-cook-levin]]），命题蕴含是 $\mathsf{coNP}$ 完全的：预计不存在对每个输入都快的算法。

最简单的完备过程是**模型检验**：枚举 $n$ 个符号的全部 $2^n$ 个模型，检查 $\alpha$ 在每个使 $\mathit{KB}$ 为真的模型中为真。它可靠且完备，时间 $O(2^n)$，空间 $O(n)$。

::: example 枚举模型判定蕴含 {#ex-model-checking}
设知识库说：下雨则比赛取消（$R \Rightarrow M$）；比赛取消则安去看电影或待在家里（$M \Rightarrow C \lor H$）；安没有待在家里（$\lnot H$）；并且下雨了（$R$）。问 $\mathit{KB} \models C$ 吗？$\mathit{KB} \models M \land C$ 吗？$\mathit{KB}$ 蕴含 $\lnot C$ 吗？
::: solution
$R, M, C, H$ 共有 $2^4 = 16$ 个模型。$R$ 与 $\lnot H$ 把 $R = \text{真}$、$H = \text{假}$ 固定下来。于是 $R \Rightarrow M$ 强制 $M = \text{真}$，而 $M \Rightarrow C \lor H$ 强制 $C \lor H$，从而 $C = \text{真}$。所以恰有一个模型满足 $\mathit{KB}$：$R = M = C = \text{真}$、$H = \text{假}$。在这个模型中 $C$ 与 $M \land C$ 为真，所以 $\mathit{KB} \models C$ 且 $\mathit{KB} \models M \land C$；$\lnot C$ 在其中为假，所以 $\mathit{KB} \not\models \lnot C$。不管推理多么简单，$n$ 个符号的枚举都要 $2^n$ 步：这里它考察了 $16$ 个模型，才找到一个三步短推理直接给出的结论。推理规则让我们能走那些步。
:::
:::

::: widget truthtable
formula: ((a | b) & (~b | c)) -> (a | c)
caption: 把消解规则看成一个重言式：由 $a \lor b$ 与 $\lnot b \lor c$ 推出 $a \lor c$。最后一列的每一行都是真，所以这个推理是可靠的。注意 $b$ 为真与 $b$ 为假的那些行：在每一类行里，两个前提之一把"活儿"交给了结论。编辑这个公式——比如改成 $((a \lor b) \land (\lnot b \lor c)) \to c$——看看不可靠的规则如何在某一行被驳倒。
:::

## 消解

**肯定前件**（modus ponens）——由 $\alpha \Rightarrow \beta$ 与 $\alpha$ 推出 $\beta$——是可靠的，但单靠它不完备。鲁滨逊（Robinson）的**消解**（resolution）规则是一条单一规则，配上归谬就给出完备的过程。它在某种范式下的句子上工作。

::: definition 子句与合取范式 {#def-cnf}
**文字**是符号 $P$ 或其否定 $\lnot P$。**子句**是文字的析取，我们把它当作集合处理（$P \lor \lnot Q$ 写作 $\{P, \lnot Q\}$）；不含文字的**空子句** $\square$ 在每个模型中为假。一个句子若是子句的合取，则称它处于**合取范式**（CNF）。每个句子都等价于一个合取范式，求法是：消去 $\Leftrightarrow$ 与 $\Rightarrow$（$\alpha \Rightarrow \beta \equiv \lnot\alpha \lor \beta$），用德摩根律与双重否定把 $\lnot$ 推入内部，再把 $\lor$ 对 $\land$ 分配。
:::

::: widget truthtable
formula: (p -> q) & (q -> r)
compare: (~p | q) & (~q | r)
caption: 一个句子与其合取范式逐行比较：用 $\alpha \Rightarrow \beta \equiv \lnot\alpha \lor \beta$ 消去 $\Rightarrow$ 得到两个子句，图中确认两个公式等价。试亲手把 $p \leftrightarrow q$ 化为范式，把你得到的 CNF 作为第二个公式输入以作检验。
:::

分配可能使公式指数膨胀；**采廷（Tseitin）变换**则改为给每个子公式引入一个新符号，产生一个线性规模的**等可满足** CNF（恰在原公式可满足时才可满足）——对归谬已经够用，也是每个 SAT 求解器采用的方法。

::: definition 消解规则 {#def-resolution}
若子句 $C_1$ 含文字 $\ell$ 而子句 $C_2$ 含其补文字 $\bar\ell$，则它们关于 $\ell$ 的**消解式**是
$$
\mathrm{Res}_\ell(C_1, C_2) = (C_1 \setminus \{\ell\}) \cup (C_2 \setminus \{\bar\ell\}).
$$
子句集 $S$ 的**消解闭包** $\mathrm{RC}(S)$ 是包含 $S$ 且对取消解式封闭的最小集合。
:::

::: lemma 消解是可靠的 {#lem-resolution-sound}
$C_1$ 与 $C_2$ 的每个模型都是 $\mathrm{Res}_\ell(C_1, C_2)$ 的模型。因此 $\mathrm{RC}(S)$ 中的每个子句都被 $S$ 蕴含；并且若 $\square \in \mathrm{RC}(S)$，则 $S$ 不可满足。
:::

::: proof
设 $m$ 满足 $C_1$ 与 $C_2$。若 $\ell$ 在 $m$ 中为真，则 $\bar\ell$ 为假，于是 $C_2$ 的某个其他文字在 $m$ 中为真，它属于消解式。若 $\ell$ 为假，则 $C_1$ 的某个其他文字为真，它属于消解式。第二句对消解步数归纳，第三句因为 $\square$ 没有模型。
:::

逆命题——每个不可满足的集合都能推出 $\square$——才是方法的核心。

::: theorem 基消解定理（反驳完备性） {#thm-resolution-complete}
若命题子句的有限集 $S$ 不可满足，则 $\square \in \mathrm{RC}(S)$。于是，$\mathit{KB} \models \alpha$ 当且仅当消解能从 $\mathit{KB} \land \lnot\alpha$ 的子句推出 $\square$。
:::

::: proof
我们证明逆否命题：若 $\square \notin \mathrm{RC}(S)$，就构造出 $\mathrm{RC}(S)$（从而 $S$）的一个模型。丢弃重言式子句（同时含 $P$ 与 $\lnot P 的；它们在每个模型中为真）。设 $P_1, \dots, P_k$ 为 $S$ 中出现的符号；$\mathrm{RC}(S)$ 是有限的，因为这些符号构成的子句只有有限多个。按次序赋值：对 $i = 1, \dots, k$，若 $\mathrm{RC}(S)$ 含有一个子句，它包含 $\lnot P_i$ 且其余文字在 $P_1, \dots, P_{i-1}$ 的已选值下全为假（即若把 $P_i$ 置真它就会为假），则把 $P_i$ 置**假**；否则把 $P_i$ 置**真**。

设最终指派下有 $\mathrm{RC}(S)$ 的某个子句为假，并设 $i$ 是使"某个只提到 $P_1, \dots, P_i$ 的子句 $C$ 已被 $P_1, \dots, P_i$ 的值驳倒"成立的最小指标。$C$ 必含 $P_i$ 或 $\lnot P_i$（否则 $i$ 不是最小，或 $C = \square$，而这是不可能的），且不能两者都含。若 $C$ 含 $\lnot P_i$，则 $\lnot P_i$ 为假，所以 $P_i$ 被置了真——可 $C$ 本身就是一个含 $\lnot P_i$、其余文字在 $P_1, \dots, P_{i-1}$ 下为假的子句，规则本会把 $P_i$ 置假。矛盾。所以 $C$ 含 $P_i$，而 $P_i$ 被置假是因为某个子句 $C'$ 含 $\lnot P_i$ 且其所有其余文字在 $P_1, \dots, P_{i-1}$ 下为假。于是消解式 $R = \mathrm{Res}_{P_i}(C, C')$ 属于 $\mathrm{RC}(S)$，由 $C$ 与 $C'$ 中除 $P_i$、$\lnot P_i$ 之外的文字组成，这些文字在 $P_1, \dots, P_{i-1}$ 的值下全为假。若 $R$ 是重言式就不可能如此（互补对中必有一个为真）；否则 $R$ 是在 $P_1, \dots, P_{i-1}$ 上、并在该处被驳倒的子句——与 $i$ 的最小性矛盾——或者 $R = \square$，与 $\square \notin \mathrm{RC}(S)$ 矛盾。所以 $\mathrm{RC}(S)$ 的每个子句都为真：$S$ 可满足。最后一段结论由 [[#thm-refutation]] 与 [[#lem-resolution-sound]] 得出。
:::

消解对*归谬*是完备的，对生成一切后承则不完备：从 $\{P\}$ 消解推不出任何东西，尽管 $P \lor Q$ 确实被蕴含。这就是为什么我们总是把 KB 与被*否定*的询问放在一起消解。

::: algorithm 消解归谬 {#alg-resolution}
```python
from itertools import combinations

def neg(l): return l[1:] if l.startswith("~") else "~" + l
def show(c): return "{" + ", ".join(sorted(c)) + "}" if c else "EMPTY"

def resolvents(c1, c2):
    """两个子句的全部非重言式消解式（文字 'P'、'~P' 构成的 frozenset）。"""
    out = []
    for lit in sorted(c1):
        if neg(lit) in c2:
            r = (c1 - {lit}) | (c2 - {neg(lit)})
            if not any(neg(l) in r for l in r):
                out.append(frozenset(r))
    return out

def refute(clauses, trace=False):
    """按消解饱和；当且仅当推出空子句（子句集不可满足）时返回 True。"""
    known = [frozenset(c) for c in clauses]
    while True:
        new = []
        for c1, c2 in combinations(known, 2):
            for r in resolvents(c1, c2):
                if r not in known and r not in new:
                    if trace: print(f"{show(c1)} + {show(c2)} -> {show(r)}")
                    if not r: return True
                    new.append(r)
        if not new: return False                  # 已饱和而不得空子句
        known += new
```
:::

过程会停机，因为给定符号构成的子句只有有限多个；由 [[#thm-resolution-complete]]，当且仅当子句集不可满足时它返回 True。

::: example 一次消解归谬 {#ex-resolution}
用消解证明 [[#ex-model-checking]] 中知识库的 $\mathit{KB} \models C$，先手算，再用程序。
::: solution
子句形式下 KB 是 $\{\lnot R, M\}$、$\{\lnot M, C, H\}$、$\{\lnot H\}$、$\{R\}$，否定的询问是 $\{\lnot C\}$。一个简短的归谬：

1. $\{\lnot R, M\}$ 与 $\{R\}$ 给出 $\{M\}$；
2. $\{\lnot M, C, H\}$ 与 $\{M\}$ 给出 $\{C, H\}$；
3. $\{C, H\}$ 与 $\{\lnot H\}$ 给出 $\{C\}$；
4. $\{C\}$ 与 $\{\lnot C\}$ 给出 $\square$。

程序则一层一层地盲目饱和：

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

它在空子句之前推出了十一个子句（最后一步由 $\{\lnot H\}$ 与 $\{H\}$ 得到——与我们的归谬不同，但同样有效）。最后一行表明：若改加 $\{C\}$（检验 $\mathit{KB} \models \lnot C$ 是否成立），饱和时没有 $\square$：KB 连同 $C$ 是可满足的，所以 $\lnot C$ 不被蕴含。不加限制的饱和可能生成指数多个子句；实用求解器使用各种**策略**——单元优先、**支持集**策略（每次消解必与一个由否定询问派生的子句消解）以及删除被包摄子句——同时保持完备性。
:::
:::

::: quiz
消解把子句集 $S$ 饱和了，没有找到空子句。能推出什么？

- [ ] $S$ 不可满足，只是证明太长而找不到。
- [x] $S$ 可满足。
- [ ] 什么也推不出：消解不完备。
- [ ] $S$ 的每个子句都有效。
::: solution
由基消解定理（[[#thm-resolution-complete]]），若 $S$ 不可满足，闭包中就会有 $\square$。饱和算出整个闭包（它是有限的），所以 $S$ 可满足；证明甚至构造出一个模型。消解"不完备"只是指它不*生成*每个被蕴含的子句，而归谬并不需要这一点。
:::
:::

### SAT 求解器

模型检验可以比枚举聪明得多。**DPLL** 算法（[[complexity/coping-with-hardness#alg-dpll]]）是对真值指派的回溯搜索加单元传播——正是 [[artificial-intelligence/constraint-satisfaction]] 的约束满足机器对子句的特化——而现代 **CDCL** 求解器再加上子句学习，那是按需进行、用来解释冲突的消解。局部搜索（WalkSAT）是最小冲突的对应物。由于 DPLL 在不可满足的公式上隐含地构造了一次消解归谬，鸽笼公式上消解的指数下界（[[complexity/coping-with-hardness#thm-haken]]）也约束着这些求解器。实践中，截至 2026 年，SAT 求解器能判定含数百万子句的工业公式，而许多 AI 问题——规划、排程、配置、验证——都通过编码成 SAT 来求解。

## 霍恩子句与链式推理

许多知识库由"若这些条件成立，则那件事成立"式的规则构成。它们有一种使推理飞快的特殊形式。

::: definition 确定子句与霍恩子句 {#def-horn}
**确定子句**是恰含一个正文字的子句；它可以写成蕴含式 $P_1 \land \dots \land P_k \Rightarrow Q$（$k = 0$ 时就是**事实** $Q$）。**霍恩子句**（Horn clause）*至多*含一个正文字；一个不含正文字的霍恩子句 $\lnot P_1 \lor \dots \lor \lnot P_k$ 称为**目标子句**（它说的是 $P_1, \dots, P_k$ 不能全真）。
:::

对确定子句，符号的蕴含可以用**正向链**（forward chaining）判定：从已知的事实出发，每当某条规则的全部前提都已知，就把它的结论加入。

::: algorithm 正向链 {#alg-forward-chaining}
```python
from collections import deque

def forward_chain(rules, facts, query, trace=False):
    """rules: (前提, 结论) 形式的确定子句列表。线性时间的正向链。"""
    count = [len(p) for p, _ in rules]               # 每条规则尚未知的前提数
    uses = {}                                        # 符号 -> 以其为前提的规则
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
            if count[i] == 0:                        # 前提全部已知：触发规则
                if trace: print(f"{' & '.join(rules[i][0])} -> {rules[i][1]}")
                agenda.append(rules[i][1])
    return False
```
:::

::: theorem 正向链可靠、完备且线性 {#thm-forward-chaining}
设 $\mathit{KB}$ 是一族确定子句，$q$ 是一个符号。正向链返回 True 当且仅当 $\mathit{KB} \models q$。它的运行时间与 $\mathit{KB}$ 的总规模成线性。
:::

::: proof
*可靠性。* 每个加入议程的符号，或是 $\mathit{KB}$ 中的事实，或是某条规则的结论、而该规则的前提都是先前推出过的；归纳并使用肯定前件，每一个都被 $\mathit{KB}$ 蕴含。

*完备性。* 让算法跑完（忽略提前返回）。设 $I$ 为最终推出的符号集，$m$ 是使 $I$ 中符号为真、其余全为假的模型。$\mathit{KB}$ 的每个子句在 $m$ 中为真：事实属于 $I$；对规则 $P_1 \land \dots \land P_k \Rightarrow Q$，若所有 $P_j \in I$，则该规则的计数减到了 $0$，$Q$ 被加入议程因而在 $I$ 中，规则在 $m$ 中为真；若某个 $P_j \notin I$，其前提在 $m$ 中为假，规则为真。所以 $m$ 是 $\mathit{KB}$ 的模型。若 $\mathit{KB} \models q$，则 $q$ 在 $m$ 中为真，故 $q \in I$，算法在弹出 $q$ 时返回 True。

*时间。* 每个符号只处理一次（后来的副本被 `inferred` 检查跳过），处理它时把它作为前提出现的每条规则的计数各按出现次数减一。每条规则至多触发一次（其计数归零一次）。所以总代价与符号数加前提出现总次数成正比——即 $\mathit{KB}$ 的规模。
:::

证明中的模型 $m$ 是 $\mathit{KB}$ 的*最小*模型：恰使被蕴含的符号为真。连同目标子句，同一个算法仍在线性时间内判定霍恩可满足性：一个霍恩集不可满足，恰当从它的确定子句出发的正向链推出了某个目标子句的全部符号。这就是为什么霍恩子句——逻辑程序设计与许多规则引擎的基础——是命题推理中易处理的核心，而一般子句是 $\mathsf{NP}$-难的。

::: example 正向链 {#ex-forward-chaining}
一个汽车故障诊断知识库有规则 $\mathit{Key} \Rightarrow \mathit{Unlocked}$；$\mathit{Unlocked} \land \mathit{Battery} \Rightarrow \mathit{Ignition}$；$\mathit{Battery} \Rightarrow \mathit{Lights}$；$\mathit{Ignition} \land \mathit{Fuel} \Rightarrow \mathit{Running}$；$\mathit{Running} \land \mathit{Lights} \Rightarrow \mathit{CanDrive}$；$\mathit{Gauge} \Rightarrow \mathit{Fuel}$；$\mathit{Running} \land \mathit{Siren} \Rightarrow \mathit{Alarm}$，以及事实 $\mathit{Key}$、$\mathit{Battery}$、$\mathit{Gauge}$。$\mathit{CanDrive}$ 被蕴含吗？$\mathit{Alarm}$ 呢？
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

事实按次序处理；每个事实把它所提到的各规则的计数减一，规则计数归零时触发。$\mathit{CanDrive}$ 在六次规则触发后推出。$\mathit{Alarm}$ 不被蕴含：它的规则需要 $\mathit{Siren}$，而没有任何东西提供 $\mathit{Siren}$；并且在最小模型（所有推出的符号为真，$\mathit{Siren}$ 与 $\mathit{Alarm}$ 为假）中 $\mathit{Alarm}$ 为假。
:::
:::

**反向链**（backward chaining）从询问出发：要证 $q$，找一条结论为 $q$ 的规则并递归地证明它的前提（记住当前路径上的目标以避免循环，并缓存结果）。它是正向链的深度优先、目标导向的对应物，常常只触及 KB 的一小部分，因为它只看与问题相关的规则。正向链是**数据驱动**的——适合随感知到来而更新信念的智能体——反向链是**目标驱动**的——适合回答问题。Prolog 就是在一阶确定子句上执行反向链来运行程序的。

::: warning 逻辑蕴含不是因果，"推不出"不是"假"
两种混淆很常见。第一，只要 $P$ 为假或 $Q$ 为真，$P \Rightarrow Q$ 就为真；它本身并不断言两者之间有任何联系。"若月亮是奶酪做的，则 $2 + 2 = 5$"是一个真的蕴含式。知识库用蕴含式编码因果或定义性知识，但逻辑并不知道这一点。第二，正向链推不出 $\mathit{Alarm}$，只意味着 $\mathit{Alarm}$ *不被蕴含*，并不意味着 $\lnot\mathit{Alarm}$ 被蕴含——KB 对警笛没有任何说法。逻辑程序设计语言与数据库常采用**闭世界假设**（"推不出的就是假的"，即失败即否定），那是一种不同的、非单调的逻辑：加入一条事实可能推翻一个旧结论。
:::

## 一阶逻辑

命题逻辑无法说出"每个发烧的病人都需要检查"，除非给每个病人写一个句子。**一阶逻辑**（FOL），又称谓词逻辑，谈论**对象**、它们的**属性**以及它们之间的**关系**，并对对象量化。

::: definition 一阶逻辑的语法与语义 {#def-fol}
一阶语言有**常量符号**（$\mathit{Ann}$、$\mathit{Bob}$）、带元数的**谓词符号**（$\mathit{Patient}(x)$、$\mathit{Knows}(x, y)$）、带元数的**函数符号**（$\mathit{Mother}(x)$）与**变量**（$x, y, z$）。**项**是常量、变量以及以项 $t_i$ 构成的 $f(t_1, \dots, t_k)$。**原子句子**是 $P(t_1, \dots, t_k)$ 与 $t_1 = t_2$；句子由原子句子经联结词与量词 $\forall x$、$\exists x$ 构成。**模型**由一个非空的对象**域**和一个**解释**构成：解释把每个常量映到一个对象、每个 $k$ 元谓词映到域上的一个 $k$ 元关系、每个函数符号映到一个函数。$\forall x\, \varphi$ 为真，当 $\varphi$ 对指派给 $x$ 的每个对象都为真；$\exists x\, \varphi$ 为真，当它对某个对象为真。蕴含的定义同前：$\mathit{KB} \models \alpha$ 指 $\alpha$ 在 $\mathit{KB}$ 的每个模型中为真。
:::

有些模式反复出现。"每个 $P$ 都是 $Q$"是 $\forall x\, (P(x) \Rightarrow Q(x))$——用 $\Rightarrow$ 而不是 $\land$，因为 $\forall x\, (P(x) \land Q(x))$ 说的是万物都是 $Q$ 的 $P$。"有 $P$ 是 $Q$"是 $\exists x\, (P(x) \land Q(x))$——用 $\land$，因为只要有东西不是 $P$，$\exists x\, (P(x) \Rightarrow Q(x))$ 就为真。量词一般不可交换：$\forall x\, \exists y\, \mathit{Knows}(x, y)$（人人都认识某个人）不同于 $\exists y\, \forall x\, \mathit{Knows}(x, y)$（有一个人被所有人认识）；见 [Maths Atlas：量词](/learn/maths/lesson.php?c=proofs&l=quantifiers)。

一阶逻辑的模型可以有无穷域，所以模型检验一般行不通。推理于是走句法的道路。关键一步是把 $\forall x\, (\mathit{Fever}(x) \Rightarrow \mathit{NeedsTest}(x))$ 这样的规则用于 $\mathit{Fever}(\mathit{Ann})$ 这样的事实——即找一个**代换** $\theta = \{x / \mathit{Ann}\}$ 使两者变得相同。

::: definition 合一子与最一般合一子 {#def-unifier}
**代换** $\theta$ 把变量映到项；$\alpha\theta$ 是把 $\alpha$ 中每个变量 $x$ 换成 $\theta(x)$ 的结果。$\alpha$ 与 $\beta$ 的一个**合一子**是使 $\alpha\theta = \beta\theta$ 的代换。若合一子 $\theta$ 满足：$\alpha$ 与 $\beta$ 的每个合一子 $\sigma$ 都是 $\theta$ 再复合某个进一步的代换，即 $\sigma = \theta\lambda$，则称 $\theta$ 为**最一般合一子**（MGU）。
:::

::: algorithm 合一 {#alg-unify}
```python
def is_var(t): return isinstance(t, str) and t[:1].islower()   # 变量小写开头；常量大写开头

def walk(t, s):
    while is_var(t) and t in s: t = s[t]
    return t

def occurs(v, t, s):
    t = walk(t, s)
    return t == v or (isinstance(t, tuple) and any(occurs(v, a, s) for a in t[1:]))

def unify(x, y, s=None):
    """项 x, y 的最一般合一（在代换 s 上扩展），不存在则 None。复合项形如 ('f', args...)。"""
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
原子与复合项都是元组，首元素是谓词符号或函数符号。
:::

::: theorem 合一定理（鲁滨逊（Robinson），1965） {#thm-unify}
若两个项（或原子句子）有合一子，则它们有最一般合一子，在变量更名意义下唯一，且合一算法就返回它；若它们没有合一子，算法返回失败。算法总是停机。
:::

这里不作证明；证明对变量个数与项的大小作归纳，表明算法每次做的绑定都是被强制的（在先此做出的绑定之外，它属于每个合一子），并且**发生检查**——拒绝把 $x$ 绑定到含 $x$ 的项——正是所需要的，因为 $x$ 与 $f(x)$ 没有有限的公共实例。没有发生检查（多数 Prolog 实现为了速度都省掉了它）时，合一可能对不可合一的项"成功"，推理就变成不可靠的。

::: example 合一各对项 {#ex-unify}
求下列各对项的最一般合一子：(a) $\mathit{Knows}(\mathit{Ann}, x)$ 与 $\mathit{Knows}(y, \mathit{Mother}(y))$；(b) $\mathit{Knows}(\mathit{Ann}, x)$ 与 $\mathit{Knows}(x, \mathit{Bob})$；(c) $\mathit{Knows}(\mathit{Ann}, x)$ 与 $\mathit{Knows}(y, z)$；(d) $P(x, f(x))$ 与 $P(f(y), y)$。
::: solution
```console
$ python3 unify.py
('Knows', 'Ann', 'x') ('Knows', 'y', ('Mother', 'y')) -> {'y': 'Ann', 'x': ('Mother', 'Ann')}
('Knows', 'Ann', 'x') ('Knows', 'x', 'Bob') -> None
('Knows', 'Ann', 'x') ('Knows', 'y', 'z') -> {'y': 'Ann', 'x': 'z'}
('P', 'x', ('f', 'x')) ('P', ('f', 'y'), 'y') -> None
```

(a) 第一个参数给出 $y = \mathit{Ann}$；于是第二个参数给出 $x = \mathit{Mother}(\mathit{Ann})$。(b) 第一个参数强制 $x = \mathit{Ann}$，第二个参数强制 $x = \mathit{Bob}$：没有合一子。这个失败是两个本应独立理解的句子*共用*变量名 $x$ 造成的假象；消解之前，句子会先更改变量名以**标准化分离**（standardised apart），此后 $\mathit{Knows}(x_1, \mathit{Bob})$ 就能合一，$\theta = \{x / \mathit{Bob}, x_1 / \mathit{Ann}\}$。(c) $\{y / \mathit{Ann}, x / z\}$ 是最一般的；$\{y / \mathit{Ann}, x / \mathit{Bob}, z / \mathit{Bob}\}$ 也是合一子但更特殊——它是该 MGU 再复合 $\{z / \mathit{Bob}\}$。(d) 第一个参数给出 $x = f(y)$，于是第二个参数需要 $f(f(y)) = y$，发生检查拒绝它：没有有限项满足它。
:::
:::

### 提升推理

有了合一，命题规则就提升到一阶逻辑。**广义肯定前件**：由 $p'_1, \dots, p'_k$ 与 $(p_1 \land \dots \land p_k \Rightarrow q)$，若 $\theta$ 把每个 $p'_i$ 与 $p_i$ 合一，则推出 $q\theta$。一阶确定子句上的正向链与反向链都使用它，并且对确定子句可靠且完备（函数符号允许无穷多项时，正向链可能不停机；Datalog——不带函数符号的确定子句——总是停机）。

对完整的一阶逻辑，句子被化为**子句形式**：消去蕴含式，把否定推入内部，更改变量名使变量分离，用**斯科伦化**（Skolemisation）消去存在量词（把 $\forall x$ 辖域内的 $\exists y$ 换成一个新函数 $F(x)$，于是 $\forall x\, \exists y\, \mathit{Knows}(x, y)$ 变成 $\forall x\, \mathit{Knows}(x, F(x))$——得到一个等可满足的句子），丢掉全称量词，再化为 CNF。**二元消解**规则取两个分别含文字 $\ell$ 与 $\lnot \ell'$ 的子句，其中 $\ell$ 与 $\ell'$ 以 MGU $\theta$ 合一，返回施加了 $\theta$ 的消解式；它与**包因式分解**（factoring，把同一子句中两个文字合一）一起，正是 [[#def-resolution]] 的提升形式。

::: theorem 一阶消解的可靠性与反驳完备性 {#thm-fol-resolution}
*（鲁滨逊（Robinson），1965。）* 带包因式分解的二元消解是可靠的，并且反驳完备：若一阶子句集不可满足，则能在有限步内从中推出空子句。
:::

我们只陈述不证明。证明把**埃尔布朗（Herbrand）定理**——不可满足的子句集有一组有限的不可满足的*基实例*，把由子句中的常量与函数构成的项代入即得——与基消解定理（[[#thm-resolution-complete]]）以及一条表明每个基消解步都是一阶消解步（用 MGU）的实例的**提升引理**结合起来。

::: example 一次一阶归谬 {#ex-fol-resolution}
知识：每个发烧的病人都需要检查；每个需要检查的病人都会被分配给某个医生；安是一个发烧的病人。证明安被分配给了某个人。
::: solution
一阶写法：(1) $\forall x\, (\mathit{Patient}(x) \land \mathit{Fever}(x) \Rightarrow \mathit{NeedsTest}(x))$；(2) $\forall x\, (\mathit{Patient}(x) \land \mathit{NeedsTest}(x) \Rightarrow \exists y\, \mathit{Assigned}(x, y))$；(3) $\mathit{Patient}(\mathit{Ann})$；(4) $\mathit{Fever}(\mathit{Ann})$。询问：$\exists y\, \mathit{Assigned}(\mathit{Ann}, y)$。

子句形式，取"分配给 $x$ 的医生"为斯科伦函数 $D(x)$：(1) $\lnot \mathit{Patient}(x) \lor \lnot \mathit{Fever}(x) \lor \mathit{NeedsTest}(x)$；(2) $\lnot \mathit{Patient}(x_2) \lor \lnot \mathit{NeedsTest}(x_2) \lor \mathit{Assigned}(x_2, D(x_2))$；(3) $\mathit{Patient}(\mathit{Ann})$；(4) $\mathit{Fever}(\mathit{Ann})$；否定的询问 (5) $\lnot \mathit{Assigned}(\mathit{Ann}, y)$（$\exists y$ 的否定是 $\forall y\, \lnot$）。

消解：(5) 与 (2)，用 $\{x_2 / \mathit{Ann}, y / D(\mathit{Ann})\}$ 把 $\mathit{Assigned}(\mathit{Ann}, y)$ 与 $\mathit{Assigned}(x_2, D(x_2))$ 合一：(6) $\lnot \mathit{Patient}(\mathit{Ann}) \lor \lnot \mathit{NeedsTest}(\mathit{Ann})$。再与 (3)：(7) $\lnot \mathit{NeedsTest}(\mathit{Ann})$。再与 (1)、$\{x / \mathit{Ann}\}$：(8) $\lnot \mathit{Patient}(\mathit{Ann}) \lor \lnot \mathit{Fever}(\mathit{Ann})$。再与 (3)：(9) $\lnot \mathit{Fever}(\mathit{Ann})$。再与 (4)：$\square$。绑定 $y / D(\mathit{Ann})$ 甚至说出了见证的名字：安被分配到的医生——这是消解求解器与 Prolog 都会利用的**答案提取**。
:::
:::

### 一阶推理的限度

::: theorem 一阶蕴含是半可判定的 {#thm-semidecidable}
存在一个算法，对给定的有限一阶 $\mathit{KB}$ 与 $\alpha$，只要 $\mathit{KB} \models \alpha$ 就停机并答"是"；但不存在总能停机并正确判定 $\mathit{KB} \models \alpha$ 是否成立的算法 *（丘奇（Church）与图灵（Turing），1936）*。
:::

::: proof
*半过程。* 从 $\mathit{KB} \land \lnot\alpha$ 的子句逐层（广度优先：先已有子句的全部消解式，带包因式分解）枚举消解推导。每一层是有限的。由 [[#thm-fol-resolution]]，若 $\mathit{KB} \models \alpha$，空子句会出现在某个有限层，过程停机答"是"。（若否，它可能永远跑下去。）*不可判定性*是丘奇与图灵的定理：停机问题（[[theory-of-computation/decidability]]）可归约到一阶有效性——写下一个描述某图灵机的计算并断言它会停机的句子即可。构造不在此复述。
:::

所以一个完备的一阶证明器有时必须在非定理上永远跑下去；实用系统使用时限、受限的片段（Datalog、描述逻辑——它们可判定，并且是 OWL 等本体语言的基础）或人的引导（交互式证明助手）。哥德尔（Gödel）的完备性定理（1929）说标准证明系统能推出每个有效的一阶句子；他的不完备性定理（1931）说的是另一回事——没有相容的、可有效公理化的算术理论能证明*所有*为真的算术命题。

::: quiz
"每个通过考试的学生都拿到了证书"翻译成下面哪一个一阶逻辑公式是正确的？

- [ ] $\forall x\, (\mathit{Student}(x) \land \mathit{Passed}(x) \land \mathit{Certificate}(x))$
- [x] $\forall x\, (\mathit{Student}(x) \land \mathit{Passed}(x) \Rightarrow \mathit{Certificate}(x))$
- [ ] $\exists x\, (\mathit{Student}(x) \land \mathit{Passed}(x) \Rightarrow \mathit{Certificate}(x))$
- [ ] $\forall x\, \mathit{Student}(x) \land \mathit{Passed}(x) \Rightarrow \mathit{Certificate}(x)$
::: solution
关于一类成员的全体性陈述用 $\Rightarrow$：对每个对象，*如果*它是通过考试的学生，*那么*它拿到了证书。第一项说万物都是通过考试并拿到证书的学生。第三项只要存在任何不是"通过考试的学生"的对象就为真。第四项按通常的结合顺序只量化 $\mathit{Student}(x)$，其余部分中 $x$ 是自由的。
:::
:::

::: history
乔治·布尔（George Boole）的 *The Laws of Thought*（1854）给出了命题的代数；戈特洛布·弗雷格（Gottlob Frege）的 *Begriffsschrift*（1879）引入了带量词的一阶逻辑。库尔特·哥德尔（Kurt Gödel）在 1929 年的博士论文（1930 年发表）中证明了一阶逻辑的完备性；阿隆佐·丘奇（Alonzo Church）与艾伦·图灵（Alan Turing）于 1936 年证明了一阶有效性的不可判定性。雅克·埃尔布朗（Jacques Herbrand）的博士论文（1930）把一阶不可满足性归约为命题情形。马丁·戴维斯（Martin Davis）与希拉里·帕特南（Hilary Putnam）（1960），以及戴维斯、乔治·洛格曼（George Logemann）与唐纳德·洛弗兰德（Donald Loveland）（1962）给出了 DP 与 DPLL 过程。约翰·艾伦·鲁滨逊（John Alan Robinson）的 "A machine-oriented logic based on the resolution principle"（*Journal of the ACM*，1965）提出了消解与合一。约翰·麦卡锡（John McCarthy）的 "Programs with common sense"（1958）提出了建立在逻辑之上的会推理的智能体。阿尔弗雷德·霍恩（Alfred Horn）于 1951 年研究了霍恩子句；罗伯特·科瓦尔斯基（Robert Kowalski）对霍恩子句的过程性解释（1974）与阿兰·科尔梅罗（Alain Colmerauer）的 Prolog（1972）开创了逻辑程序设计。威廉·道林（William Dowling）与让·加列尔（Jean Gallier）于 1984 年给出霍恩可满足性的线性时间算法。
:::

## 后续内容

状态与动作的逻辑表示是经典规划的基础（[[artificial-intelligence/planning]]），那里的动作由前置条件与效果描述，计划可以由 SAT 求解找到。当知识不确定时，真值让位于信任度，逻辑知识库的因子化结构以贝叶斯网络的面目重新出现（[[artificial-intelligence/probabilistic-reasoning]]）。推理的可判定性与复杂性理论见 [[theory-of-computation/decidability]] 与 [[complexity]]；类型系统与逻辑程序设计语言在 [[programming-languages]] 中讲授。

::: summary
- $\mathit{KB} \models \alpha$ 表示 $\alpha$ 在 $\mathit{KB}$ 的每个模型中为真（[[#def-entailment]]）；它成立当且仅当 $\mathit{KB} \land \lnot\alpha$ 不可满足（[[#thm-refutation]]），所以蕴含归约为（不可）满足性，而后者是 $\mathsf{coNP}$ 完全的。
- 子句上的**消解**（[[#def-resolution]]）可靠（[[#lem-resolution-sound]]）且**反驳完备**：不可满足的子句集能推出空子句（[[#thm-resolution-complete]]）。DPLL 与 CDCL SAT 求解器是命题推理的实用形态。
- 对**确定子句**，正向链可靠、完备且线性时间（[[#thm-forward-chaining]]）；反向链是它的目标导向对应物。
- **一阶逻辑**增加了对象、关系、函数与量词（[[#def-fol]]）；推理借**合一**把命题规则提升到一阶（[[#alg-unify]]、[[#thm-unify]]），需要发生检查。
- 带包因式分解的一阶消解可靠且反驳完备（[[#thm-fol-resolution]]），但一阶蕴含只是**半可判定**的（[[#thm-semidecidable]]）。
:::

## 习题

::: exercise 数模型 {level=1 check="4"}
$P, Q, R$ 的 $8$ 个模型中有多少个满足 $(P \lor Q) \land (Q \Rightarrow R)$？（填入模型数。）
::: solution
$Q \Rightarrow R$ 排除 $Q = \text{真}$、$R = \text{假}$。若 $Q$ 为真，$R$ 必为真而 $P$ 任意：$2$ 个模型。若 $Q$ 为假，$P$ 必为真（为了使 $P \lor Q$）而 $R$ 任意：$2$ 个模型。共 $4$ 个模型：$(P, Q, R) = (T, T, T)$、$(F, T, T)$、$(T, F, T)$、$(T, F, F)$。
:::
:::

::: exercise 消解式 {level=1}
列出 $\{P, \lnot Q, R\}$ 与 $\{Q, \lnot R, S\}$ 的全部消解式。为什么它们都没有用？
::: solution
对 $Q$ 消解：$\{P, R, \lnot R, S\}$。对 $R$ 消解：$\{P, \lnot Q, Q, S\}$。两者都是重言式（含有互补对），在每个模型中为真，所以不携带任何信息，应当丢弃。注意*不能*同时对 $Q$ 与 $R$ 消解而得到 $\{P, S\}$：那个推理不可靠（取 $P$、$S$ 假而 $Q$、$R$ 真：两个前提为真而 $\{P, S\}$ 为假）。
:::
:::

::: exercise 手算正向链 {level=1 check="3"}
给定规则 $A \land B \Rightarrow C$、$C \Rightarrow D$、$B \land D \Rightarrow E$、$E \Rightarrow A$ 与事实 $A$、$B$，在 $E$ 被推出之前有多少条规则触发？（填入触发次数。）
::: solution
由 $A$ 与 $B$ 触发第一条规则，得 $C$（$1$）；然后 $C \Rightarrow D$（$2$）；然后 $B \land D \Rightarrow E$（$3$）。$E$ 在三次触发后被推出。（规则 $E \Rightarrow A$ 接下来会触发，但不增添新东西。）
:::
:::

::: exercise CNF 与采廷变换 {level=2 check="8"}
(a) 用分配把 $(P_1 \land Q_1) \lor (P_2 \land Q_2) \lor (P_3 \land Q_3)$ 化为 CNF。得到多少个子句？（填入子句数。）(b) $n$ 个这样的合取式，分配会产生多少个子句？(c) 描述一个线性规模的等可满足 CNF。
::: solution
(a) 分配后，从每个合取式中选一个文字的每种选法各对应一个子句：$\{x_1, x_2, x_3\}$，其中 $x_i \in \{P_i, Q_i\}$，所以 $2^3 = 8$ 个子句。(b) $2^n$ 个子句——指数级。(c) 引入新符号 $T_i \Leftrightarrow (P_i \land Q_i)$；只需保留方向 $T_i \Rightarrow P_i \land Q_i$，即子句 $\{\lnot T_i, P_i\}$ 与 $\{\lnot T_i, Q_i\}$，再加上 $\{T_1, T_2, T_3\}$。一共 $2n + 1$ 个子句，且恰在原式可满足时可满足（原式的一个模型通过令 $T_i$ 取 $P_i \land Q_i$ 的值来扩展；新子句集的一个模型使某个 $T_i$ 为真，从而 $P_i \land Q_i$ 为真）。
:::
:::

::: exercise 霍恩可满足性 {level=2}
证明一个霍恩子句集不可满足，当且仅当从它的确定子句出发的正向链推出了某个目标子句 $\lnot P_1 \lor \dots \lor \lnot P_k$ 的每个符号。由此导出霍恩-SAT 的线性时间算法。
::: solution
若正向链推出了 $P_1, \dots, P_k$，则它们被确定子句蕴含（可靠性），所以确定子句的每个模型都使该目标子句为假：整个集合不可满足。反之，若没有目标子句的符号被全部推出，就考虑 [[#thm-forward-chaining]] 证明中确定子句的最小模型 $m$（推出的符号为真，其余为假）。它满足所有确定子句；而每个目标子句都有某个未被推出的符号 $P_j$，它在 $m$ 中为假，于是 $\lnot P_j$ 为真、目标子句被满足：整个集合可满足。算法：把每个目标子句当作规则 $P_1 \land \dots \land P_k \Rightarrow \bot$，把正向链运行到底，当且仅当推出 $\bot$ 时报告"不可满足"。由 [[#thm-forward-chaining]]，这对子句集的规模是线性的。
:::
:::

::: exercise 它是定理吗？ {level=2}
判定下列各题，给出消解归谬或反模型：(a) $\{P \Rightarrow Q, Q \Rightarrow R\} \models P \Rightarrow R$；(b) $\{P \lor Q, \lnot P \lor R\} \models Q \lor R$；(c) $\{P \Rightarrow Q\} \models Q \Rightarrow P$。
::: solution
(a) 子句 $\{\lnot P, Q\}$、$\{\lnot Q, R\}$，以及 $P \Rightarrow R$ 的否定 $P \land \lnot R$：$\{P\}$、$\{\lnot R\}$。用 $\{P\}$ 与 $\{\lnot P, Q\}$ 消解：$\{Q\}$；与 $\{\lnot Q, R\}$：$\{R\}$；与 $\{\lnot R\}$：$\square$。被蕴含。(b) 否定的询问：$\{\lnot Q\}$、$\{\lnot R\}$。$\{P, Q\}$ 与 $\{\lnot P, R\}$：$\{Q, R\}$；与 $\{\lnot Q\}$：$\{R\}$；与 $\{\lnot R\}$：$\square$。被蕴含——这本身正是消解。(c) 不被蕴含：模型 $P = \text{假}$、$Q = \text{真}$ 满足 $P \Rightarrow Q$ 但不满足 $Q \Rightarrow P$（肯定后件的谬误）。对 $\{\lnot P, Q\}$、$\{Q\}$、$\{\lnot P\}$ 作消解根本产生不了消解式，于是饱和时没有 $\square$。
:::
:::

::: exercise 发生检查的证明 {level=3}
(a) 证明 $x$ 与 $f(x)$ 没有合一子。(b) 举一个例子：*不带*发生检查的合一会使消解求解器从一个可满足的子句集推出空子句。(c) 解释为什么合一算法即使可能反复地以项代入变量也仍然停机。
::: solution
(a) 若 $\theta$ 合一它们，则 $x\theta$ 与 $f(x)\theta = f(x\theta)$ 应是同一个项；但 $f(x\theta)$ 严格大于 $x\theta$（多一个符号），不可能相等。(b) 子句 $\{P(x, f(x))\}$（对每个 $x$，$x$ 与 $f(x)$ 有关系）与 $\{\lnot P(y, y)\}$（没有对象与自身有关系）是可满足的：取自然数集，$f(n) = n + 1$，$P$ 取关系 $<$。没有发生检查时，$P(x, f(x))$ 与 $P(y, y)$ 靠 $y = x$、$x = f(x)$"合一"，消解于是产生 $\square$——一次不可靠的归谬。(c) 算法每绑定一个变量，该变量就从问题的其余部分消失（之后每次出现都经 `walk` 被替换掉），而发生检查保证变量绝不会被绑定到含它自身的项，所以不会形成绑定环。未绑定变量的个数随每次绑定严格减少，而两次绑定之间的递归沿两个项的有限结构进行；故算法停机。
:::
:::

::: exercise 实现反向链 {level=3}
写一个确定子句的命题反向链程序，避免无穷循环（比如规则 $P \Rightarrow Q$、$Q \Rightarrow P$），并在 [[#ex-forward-chaining]] 上测试。再说明：一个不做循环检查的朴素深度优先实现，对规则 $P \Rightarrow Q$、$Q \Rightarrow P$、$R \Rightarrow Q$，事实 $R$ 与询问 $P$，若按此顺序尝试规则就不会停机。
::: solution
```python
def backward_chain(rules, facts, goal, path=frozenset(), memo=None):
    """询问 goal 是否由确定子句推出即返回 True；path 存放正在证明的目标。"""
    memo = {} if memo is None else memo
    if goal in facts: return True
    if goal in memo: return memo[goal]
    if goal in path: return False                  # 循环：这条分支帮不上忙
    for premises, conclusion in rules:
        if conclusion == goal and all(backward_chain(rules, facts, p, path | {goal}, memo)
                                      for p in premises):
            memo[goal] = True; return True
    if not path: memo[goal] = False                # 只缓存顶层发现的失败
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

失败只在顶层缓存，因为在循环检查内部发现的失败（"$P$ 已在路径上"）依赖于路径，未必是真正的失败。没有路径检查时，证明 $P$ 要调用 $Q$（规则 $Q \Rightarrow P$），$Q$ 又先试规则 $P \Rightarrow Q$ 再次调用 $P$，如此无穷——本来会成功的规则 $R \Rightarrow Q$ 永远轮不到。这正是带左递归规则的 Prolog 程序死循环的方式；带表（tabled）消解（某些 Prolog 系统有）正是在加这类备忘录。
:::
:::
