一个运费函数有一个测试套件，执行了它 87% 的分支并且全部通过。然后一位顾客为一个正好 2 kg 的包裹被收了 £6.00，而价目表上写着 £3.50。测试试过 1 kg、5 kg 和 20 kg——合理、典型的值——没有一个落在边界上。更糟的是，一次刻意的实验表明：就算把函数里*每个*比较运算符从 `<=` 改成 `<` 或反向改，这个套件也照样通过——它执行了代码，却几乎什么都没检查。

[[programming-1/testing-debugging]] 介绍了单个函数的测试：测试用例、断言、单元测试、等价类、语句覆盖与分支覆盖、对照预言机（oracle）的随机测试、二分法。本章把测试当作覆盖整个系统的工程学科来对待。我们区分测试运行的**层次**，让测试设计系统化——边界、组合覆盖、飞行软件要求的 MC/DC 准则——并用**变异测试**度量套件的强度：与覆盖率不同，它问的是测试能不能*察觉*缺陷。我们用**测试替身**隔离被测单元，用**基于属性的测试**生成输入，并考察测试驱动开发是什么、证据怎么说。下面的测试用 pytest 9 与 Hypothesis 6——装在虚拟环境里的第三方包。

## 测试层次

::: definition 测试层次 {#def-test-levels}
**单元测试**检查一个单元——函数、类或模块——与系统其余部分相隔离。**集成测试**检查若干单元、或一个单元与真实外部资源（数据库、文件系统、另一个服务）经由接口协同工作。**系统测试**经由外部接口，对照需求检查完整的、已部署的系统。**验收测试**通常与客户一起或代表客户检查系统满足用户的需要——常常就是 [[software-engineering/requirements#ex-acceptance]] 中可执行的验收标准。任何层次上、在每次改动后重跑以发现意外效果的测试都是**回归测试**。
:::

不同层次抓到不同的缺陷。单元测试快速发现逻辑错误并指出其位置；集成测试发现单元之间假设的不匹配（一边传便士，另一边等英镑；一边关掉了另一边还在用的连接）——用模拟协作者的单元测试看不到这些；系统测试发现只在组装成的整体上才显现的问题——配置错误、负载下的性能、安全漏洞。**非功能**测试检查质量需求：**负载测试**度量预期流量下的行为，**压力测试**超出预期的流量，**安全测试**探查漏洞（[[security/secure-development]]），**可用性测试**观察真实用户（[[hci/usability-evaluation]]）。

迈克·科恩（Mike Cohn）的**测试金字塔**（*Succeeding with Agile*，2009）建议底层是大量快速的单元测试，中间是较少的集成测试，顶部是少量缓慢的端到端测试，因为越靠上的测试越慢、越脆弱、失败时越难诊断。它是关于成本的启发式，不是定律：一个主要在服务之间做粘合的系统，可能需要比单元测试更多的集成测试。

每个测试都需要一个**预言机**（oracle）——判断输出对不对的办法。有时规格说明直接给了；常常没给（「这条路线最短吗？」「这张图渲染得对吗？」）。部分预言机也有帮助：每个正确输出都有的性质、一个更慢的参考实现、或者用旧版本的输出来做回归（**金标准**（golden）或**快照**测试）。预言机问题是测试难以完全自动化的原因之一。

## 设计测试用例

### 划分与边界

**划分测试**把输入域分成规格说明同等对待的类，逐类测试；**边界值分析**再在每个类边界处及其相邻处加上测试值——差一错误与错误的比较运算符就住在那里。这些在 [[programming-1/testing-debugging]] 中已经引入；这里系统地加以应用，并让测试框架为每个用例生成一个测试。

::: example 运费的边界 {#ex-boundaries}
运费规则：不超过 2 kg £3.50，超过 2 kg 不超过 10 kg £6.00，超过 10 kg 不超过 30 kg £12.00；更重或非正的重量被拒绝；快递运费翻倍。用 pytest 的 `parametrize` 写边界测试。
::: solution
```python
def shipping_fee(weight_kg: float, express: bool) -> float:
    """运费（英镑）。不超过 2 kg：3.50；超过 2 kg 不超过 10 kg：6.00；
    超过 10 kg 不超过 30 kg：12.00；更重的包裹被拒绝。
    快递运费加倍。"""
    if weight_kg <= 0 or weight_kg > 30:
        raise ValueError("weight must be in (0, 30] kg")
    if weight_kg <= 2:
        fee = 3.50
    elif weight_kg <= 10:
        fee = 6.00
    else:
        fee = 12.00
    return fee * 2 if express else fee
```

划分为：非法低端（$\le 0$）、类 1 $(0, 2]$、类 2 $(2, 10]$、类 3 $(10, 30]$、非法高端（$> 30$）。它们的边界是 $0$、$2$、$10$ 和 $30$，对每个边界测试边界本身和恰好越过它的值，步长用 0.01 kg（业务采用的精度）：

```python
import pytest
from shipping import shipping_fee

@pytest.mark.parametrize("weight, expected", [
    (0.01, 3.50), (2.0, 3.50),        # 最低一档：最小值、上边界
    (2.01, 6.00), (10.0, 6.00),       # 略大于 2、上边界 10
    (10.01, 12.00), (30.0, 12.00),    # 略大于 10、允许的最大值
])
def test_standard_fee_at_boundaries(weight, expected):
    assert shipping_fee(weight, express=False) == expected

def test_express_doubles():
    assert shipping_fee(5, express=True) == 12.00

@pytest.mark.parametrize("weight", [0, -1, 30.01])
def test_invalid_weights_are_refused(weight):
    with pytest.raises(ValueError):
        shipping_fee(weight, express=False)
```

```console
$ pytest -v test_shipping.py
...
test_shipping.py::test_standard_fee_at_boundaries[0.01-3.5] PASSED       [ 10%]
test_shipping.py::test_standard_fee_at_boundaries[2.0-3.5] PASSED        [ 20%]
test_shipping.py::test_standard_fee_at_boundaries[2.01-6.0] PASSED       [ 30%]
test_shipping.py::test_standard_fee_at_boundaries[10.0-6.0] PASSED       [ 40%]
test_shipping.py::test_standard_fee_at_boundaries[10.01-12.0] PASSED     [ 50%]
test_shipping.py::test_standard_fee_at_boundaries[30.0-12.0] PASSED      [ 60%]
test_shipping.py::test_express_doubles PASSED                            [ 70%]
test_shipping.py::test_invalid_weights_are_refused[0] PASSED             [ 80%]
test_shipping.py::test_invalid_weights_are_refused[-1] PASSED            [ 90%]
test_shipping.py::test_invalid_weights_are_refused[30.01] PASSED         [100%]
```

`parametrize` 把一个测试函数变成每行一个测试，每个单独报告，所以失败会指名确切的输入。这里用 `==` 比较浮点数是安全的，因为期望值都能精确表示（$3.5$、$6$、$12$ 和它们的二倍）；对计算出来的值用 `pytest.approx`（[[programming-1/values-types]]）。
:::
:::

### 参数的组合

许多故障只在特定的输入或配置*组合*下出现：支付页面只在 macOS 上的 Safari 里、语言设为中文时失败。测试所有组合通常不可能——十个参数、每个四种取值就是 $4^{10} \approx 10^6$ 种配置——但多数此类故障只同时涉及少数几个参数。库恩（Kuhn）、华莱士（Wallace）与加洛（Gallo）（"Software fault interactions and implications for software testing"，*IEEE TSE*，2004）检查了几类系统（医疗设备、浏览器、服务器、数据库）的故障报告，发现大多数缺陷由单个参数或两个参数的交互触发，而他们研究的所有缺陷至多由六个参数的交互触发。这一观察是关于所研究系统的、未必适用于别处，它启示我们覆盖所有小的组合而不是全部组合。

::: definition $t$ 路覆盖 {#def-t-way}
设系统有参数 $p_1, \dots, p_k$，参数 $p_i$ 在有限域 $D_i$ 中取值。**测试**给每个参数指定一个值。若对 $t$ 个不同参数的每一种选取以及它们的每一种取值组合，都有某个测试给这些参数赋上这些值，则测试集达到 **$t$ 路**（$t = 2$ 时称**成对**）**覆盖**。这样的测试集称为**覆盖表**（covering array）。
:::

::: proposition 成对测试集的规模下界 {#prop-pairwise-bound}
对每对 $i \ne j$，任何成对测试集都至少有 $\lvert D_i\rvert \cdot \lvert D_j\rvert$ 个测试，从而至少是最大两个域大小之积。作为对照，穷尽测试需要 $\prod_i \lvert D_i\rvert$ 个测试。
:::

::: proof
固定 $i \ne j$。$(p_i, p_j)$ 共有 $\lvert D_i\rvert \cdot \lvert D_j\rvert$ 对取值，每一对都必须出现在某个测试中，而每个测试对 $(p_i, p_j)$ 恰含一对取值。所以至少需要那么多个测试。穷尽测试把每个完整赋值恰含一次，共 $\prod_i \lvert D_i\rvert$ 个。
:::

这个下界常常几乎可以达到，一个简单的贪心算法在实践中就很接近；科恩（Cohen）、达拉尔（Dalal）、弗雷德曼（Fredman）与巴顿（Patton）的 AETG 系统（"The AETG system"，*IEEE TSE*，1997）表明，贪心策略产生的成对测试集，其规模只随参数个数 $k$ *对数*增长。

::: algorithm 贪心成对测试生成 {#alg-pairwise}
**输入：**域 $D_1, \dots, D_k$。**输出：**一个成对测试集。

1. 令 $U$ 为所有形如 $((i, a), (j, b))$ 的取值对（$i < j$、$a \in D_i$、$b \in D_j$）组成的集合，即未覆盖的对，并令 $T \gets \emptyset$。
2. 当 $U \ne \emptyset$：
   1. 选取覆盖 $U$ 中最多取值对的完整赋值 $x$。
   2. 把 $x$ 加入 $T$，并从 $U$ 中删去 $x$ 覆盖的对。
3. 返回 $T$。
:::

每轮至少新覆盖一对（任何未覆盖的对都能补全成一个完整赋值），所以循环终止，且终止时每一对都被覆盖。步骤 2.1 中搜索所有完整赋值对 $k$ 是指数级的；真实工具改为一个参数一个参数地构造 $x$。

::: example 成对配置 {#ex-pairwise}
一家网店必须在三种浏览器、三种操作系统、两种语言、两种支付方式下工作。生成一个成对测试集。
::: solution
```python
from itertools import combinations, product

def pairs_of(test):
    """一个测试覆盖的 ((参数 i, 取值), (参数 j, 取值)) 对集合。"""
    return {((i, test[i]), (j, test[j])) for i, j in combinations(range(len(test)), 2)}

def pairwise(domains):
    """贪心：反复加入覆盖最多未覆盖对的完整组合。"""
    candidates = list(product(*domains))
    uncovered = set().union(*(pairs_of(t) for t in candidates))
    tests = []
    while uncovered:
        best = max(candidates, key=lambda t: len(pairs_of(t) & uncovered))
        tests.append(best)
        uncovered -= pairs_of(best)
    return tests

domains = [["Chrome", "Firefox", "Safari"], ["Windows", "macOS", "Linux"],
           ["en", "zh"], ["card", "paypal"]]
tests = pairwise(domains)
for t in tests:
    print(*t)
print(len(tests), "tests instead of", len(list(product(*domains))))
```

```console
$ python3 pairwise.py
Chrome Windows en card
Chrome macOS zh paypal
Firefox Linux en paypal
Safari Linux zh card
Firefox Windows zh card
Safari Windows en paypal
Firefox macOS en card
Chrome Linux en card
Safari macOS en card
9 tests instead of 36
```

由 [[#prop-pairwise-bound]] 至少需要 $3 \times 3 = 9$ 个测试，所以这个集是最优的。（截至 2026 年，Safari 在 Windows 上并不是真实配置；真实工具接受**约束**以排除不可能的组合。）每一对取值都出现了——比如 (Safari, zh) 在第 4 个测试、(macOS, paypal) 在第 2 个——但不是每个三元组：Safari、macOS 和中文从不同时出现，需要一个三者同时具备的故障会被漏掉。
:::
:::

::: widget plot
f: v^x; v^2
x: 1, 10
y: 0, 400
sliders: v=2:1:6:3
labels: \text{穷尽测试：} v^k; \text{成对测试下界：} v^2
caption: 对 $k$ 个参数（横轴）、每个 $v$ 种取值：穷尽测试需要 $v^k$ 个测试，而 [[#prop-pairwise-bound]] 对成对覆盖只强制 $v^2$，贪心算法大致达到 $v^2$ 乘以 $k$ 的对数。$v = 3$、$k = 10$ 时，穷尽测试需要 $59{,}049$ 种配置（远超图的范围）；成对只需 15 个上下。增大 $v$：差距张开得更快。
:::

## 有意义的覆盖率

语句覆盖与分支覆盖（[[programming-1/testing-debugging#def-coverage]]）度量了哪些代码运行过。对 `if a and (b or c):` 这样的判定，分支覆盖只需两个测试，一个让整个判定为真，一个为假——它并不追问每个条件是否真的影响结果。航空电子标准要求的更多。

::: definition 修正条件/判定覆盖 {#def-mcdc}
设**判定**是由**条件** $c_1, \dots, c_n$（不含布尔运算符的布尔子表达式）构成的布尔表达式。若测试集满足：每个判定取过两种结果，每个条件取过两个值，且每个条件 $c_i$ 都被证明能**独立影响**结果——集里存在两个测试，只在 $c_i$ 的取值上不同而结果不同（$c_i$ 的一个**独立对**）——则称其达到**修正条件/判定覆盖**（MC/DC）。
:::

DO-178B（1992）及其后继 DO-178C（2011）要求最高关键级（A 级）机载软件采用 MC/DC（[[software-engineering/verification]]）。它吸引人的地方在于成本随条件个数线性增长，而测试所有组合是指数增长。

::: proposition MC/DC 至少需要 $n + 1$ 个测试 {#prop-mcdc}
对 $n$ 个条件的判定，任何 MC/DC 测试集至少有 $n + 1$ 个测试（$n \ge 1$ 时）；若每个条件都能独立影响结果，$2n$ 个测试总是够用。
:::

::: proof
*下界。* 为每个条件选定一个独立对，构造一张图：顶点是测试，边是所选的对。$c_i$ 的边连接两个恰在第 $i$ 个坐标上不同的赋值。设这 $n$ 条边中含一个环。绕环一周回到起始赋值，每个坐标必须被翻转偶数次；但每条边翻转的坐标各不相同，于是环上每个坐标恰被翻转一次——矛盾。所以边构成森林，而 $n$ 条边的森林至少有 $n + 1$ 个顶点。*上界。* 为每个条件各取一个独立对，至多得到 $2n$ 个不同测试，它们已让每个条件取遍两个值，又因每对的结果不同，判定也取遍两种结果。
:::

::: example 一个守卫条件的 MC/DC {#ex-mcdc}
为 `a and (b or c)` 找一个最小的 MC/DC 测试集。
::: solution
枚举独立对，把赋值写成形如 `TFT` 的字符串（表示 $a$ 真、$b$ 假、$c$ 真），再搜索包含每个条件的一对的最小行集：

```python
from itertools import product, combinations

def decision(a, b, c):
    return a and (b or c)

names = "abc"
rows = list(product([False, True], repeat=3))
# 对每个条件：只在该条件上不同、且改变结果的行对。
pairs = {k: [(r, s) for r, s in combinations(rows, 2)
             if [i for i in range(3) if r[i] != s[i]] == [k]
             and decision(*r) != decision(*s)]
         for k in range(3)}
for k in range(3):
    print(names[k], [("".join("TF"[not v] for v in r), "".join("TF"[not v] for v in s))
                     for r, s in pairs[k]])
# 对每个条件都含一个独立对的最小行集。
for size in range(1, len(rows) + 1):
    for chosen in combinations(rows, size):
        if all(any(r in chosen and s in chosen for r, s in pairs[k]) for k in range(3)):
            print("minimal MC/DC set:", ["".join("TF"[not v] for v in r) for r in chosen])
            break
    else:
        continue
    break
```

```console
$ python3 mcdc.py
a [('FFT', 'TFT'), ('FTF', 'TTF'), ('FTT', 'TTT')]
b [('TFF', 'TTF')]
c [('TFF', 'TFT')]
minimal MC/DC set: ['FFT', 'TFF', 'TFT', 'TTF']
```

四个测试，恰合 [[#prop-mcdc]] 的下界 $n + 1 = 4$。条件 $b$ 与 $c$ 各只有一个独立对，二者都需要 `TFF`（$a$ 为真而 $b, c$ 中另一个为假，所讨论的条件才能左右结果）。测试集是：`TFF`（假）、`TTF`（真：显示 $b$）、`TFT`（真：显示 $c$），再加 `FFT`（假），它与 `TFT` 配对来显示 $a$。分支覆盖只要 `TTF` 与 `FFF` 就满足了——而且 `or` 被误写成 `and` 也不会被察觉，而这个故障是 MC/DC 集能发现的（`TTF` 会变成假）。
:::
:::

::: widget truthtable
formula: a & (b | c)
compare: a & (b & c)
caption: [[#ex-mcdc]] 的判定与一个把 `or` 误写成 `and` 的错误版本。两者在 `TTF` 和 `TFT` 两行上不同——恰恰是 MC/DC 集用来显示 $b$ 与 $c$ 独立影响结果的那两行，所以 MC/DC 集能抓住这个错误。而给出完整分支覆盖的 `TTT` 与 `FFF` 测试集，对两个公式给出相同的答案。
:::

### 变异测试

覆盖率问测试是否*执行过*代码；它不问若代码写错了测试会不会*察觉*。**变异测试**问的正是这个——通过故意把代码写错。

::: definition 变异体与变异得分 {#def-mutation}
程序的**变异体**是做了某处小的语法改动的拷贝，改动由**变异算子**完成——`<` 换成 `<=`、`+` 换成 `-`、`and` 换成 `or`、常量换成另一个常量、删去一条语句。若至少一个测试在变异体上失败，测试套件就**杀死**该变异体。一个在所有输入下都与原程序行为完全相同的变异体是**等价的**，无法被杀死。套件的**变异得分**是它杀死的非等价变异体的比例。
:::

这个方法建立在德米洛（DeMillo）、利普顿（Lipton）与塞沃德（Sayward）（"Hints on test data selection"，*IEEE Computer*，1978）提出的两个假设之上：**胜任程序员假设**——真实程序通常离正确不远，所以真实缺陷与小变异相似——以及**耦合效应**——能发现简单缺陷的测试往往也能发现复杂缺陷。实证支持相当充分但并非无条件：贾斯特（Just）等人（"Are mutants a valid substitute for real faults in software testing?"，FSE 2014）用五个 Java 开源程序的 357 个真实缺陷发现，套件的变异得分与其发现真实缺陷的能力相关，即使在控制了覆盖率之后仍然如此。

::: example 对运费做变异测试 {#ex-mutation}
写一个换比较运算符的小型变异工具，分别用 [[#ex-boundaries]] 的边界套件和引言里的三个「典型值」测试来测试运费函数。
::: solution
工具用 Python 的 `ast` 模块：解析源代码，改一个比较运算符，用 `ast.unparse` 把语法树变回源代码，覆写该模块，运行 pytest，最后恢复原状。

```python
import ast, subprocess, sys

SWAPS = {ast.Lt: ast.LtE, ast.LtE: ast.Lt, ast.Gt: ast.GtE, ast.GtE: ast.Gt,
         ast.Eq: ast.NotEq, ast.NotEq: ast.Eq}

def mutants(source):
    """依次产出 (描述, 变异后的源代码)，每次改一个比较运算符。"""
    n_compares = sum(isinstance(n, ast.Compare) for n in ast.walk(ast.parse(source)))
    for k in range(n_compares):
        tree = ast.parse(source)
        node = [n for n in ast.walk(tree) if isinstance(n, ast.Compare)][k]
        old = type(node.ops[0])
        if old in SWAPS:
            node.ops[0] = SWAPS[old]()
            yield (f"line {node.lineno}: {old.__name__} -> {SWAPS[old].__name__}",
                   ast.unparse(tree))

def run_tests():
    return subprocess.run([sys.executable, "-m", "pytest", "-q", "-x", sys.argv[2]],
                          capture_output=True).returncode == 0

target = sys.argv[1]
original = open(target).read()
killed = total = 0
try:
    for desc, src in mutants(original):
        open(target, "w").write(src)
        total += 1
        survived = run_tests()
        killed += not survived
        print(("SURVIVED " if survived else "killed   ") + desc)
finally:
    open(target, "w").write(original)      # 总是恢复真正的代码
print(f"mutation score: {killed}/{total}")
```

弱套件测 1 kg、5 kg 和 20 kg（快递）：

```python
from shipping import shipping_fee
def test_typical_values():
    assert shipping_fee(1, False) == 3.50
    assert shipping_fee(5, False) == 6.00
    assert shipping_fee(20, True) == 24.00
```

```console
$ python3 mutate.py shipping.py test_shipping.py
killed   line 7: LtE -> Lt
killed   line 5: LtE -> Lt
killed   line 5: Gt -> GtE
killed   line 9: LtE -> Lt
mutation score: 4/4
$ python3 mutate.py shipping.py test_weak.py
SURVIVED line 7: LtE -> Lt
SURVIVED line 5: LtE -> Lt
SURVIVED line 5: Gt -> GtE
SURVIVED line 9: LtE -> Lt
mutation score: 0/4
$ coverage run --branch -m pytest -q test_weak.py
$ coverage report -m --include=shipping.py
Name          Stmts   Miss Branch BrPart  Cover   Missing
---------------------------------------------------------
shipping.py       9      1      6      1    87%   6
---------------------------------------------------------
TOTAL             9      1      6      1    87%
```

弱套件有 87% 的分支覆盖（只漏掉第 6 行的 `raise`），却*一个*变异体都没杀死：每个边界都可能错，它照样通过。边界套件把四个全杀了，因为每个变异体恰在一个边界值上改变答案，而套件测了每个边界。这才是边界值分析的真正理由。（Python 的变异工具如 mutmut 原理相同、算子多得多；它们很慢——每个变异体跑一遍套件——所以用在关键模块上，或放在夜间运行。）
:::
:::

::: quiz
变异工具把一个函数的 `if n > 0:` 改成 `if n >= 0:`，该函数的前置条件是 `n` 为正整数。变异体在所有测试下存活。你应当得出什么结论？
- [ ] 测试套件太弱，需要一个 `n = 0` 的测试。
- [x] 相对于规格说明，变异体可能是等价的：没有合法输入能区分它。
- [ ] 变异工具有毛病。
- [ ] 原代码在 `n = 0` 处有缺陷。
::: solution
两个条件只在 `n = 0` 处不同，而前置条件排除了它，所以没有*合法*测试能杀死这个变异体：对函数承诺处理的一切输入，它都是等价的。加一个 `n = 0` 的测试将检验规格说明之外的行为。识别等价变异体一般是不可判定的（那是程序等价性问题，[[theory-of-computation/decidability]]），所以变异得分是相对未被判定为等价的变异体报告的。
:::
:::

## 隔离被测对象

结账函数的单元测试不该真刷信用卡、也不该真发电子邮件。单元的协作者被**测试替身**（test double）顶替。杰拉尔德·梅萨罗斯（Gerard Meszaros）的《xUnit 测试模式》（*xUnit Test Patterns*，2007）给出了标准词汇。

::: definition 测试替身 {#def-doubles}
**测试替身**是在测试中顶替真实协作者的对象。**哑对象**（dummy）被传入但从不使用。**桩**（stub）对调用返回预先备好的答案。**间谍**（spy）是同时记录调用情况的桩。**模拟对象**（mock）预先编程了它应收到的调用的期望，期望不满足则测试失败。**伪造对象**（fake）是一个能工作但简化的实现，例如内存数据库，或 [[software-engineering/requirements#ex-acceptance]] 中的假时钟。
:::

只有单元接收协作者而不是自己创建协作者时，替身才能被顶替进去——即 [[software-engineering/design-principles#ex-dip]] 的依赖倒置。Python 标准库的 `unittest.mock.Mock` 对象可以扮演桩、间谍和模拟对象的角色。

::: example 检查交互 {#ex-mocks}
`checkout` 函数向支付网关收款并发电子邮件收据；付款被拒绝时绝不能发任何邮件。用替身测试两种行为，然后展示该测试如何抓到一个「先发邮件后收款」的缺陷。
::: solution
```python
class PaymentDeclined(Exception):
    pass

def checkout(cart, gateway, mailer):
    """对购物车总额收款并发邮件收据；收款失败则不发邮件。"""
    total = round(sum(cart["prices"]), 2)
    if not gateway.charge(cart["card"], total):
        raise PaymentDeclined(total)
    mailer.send(cart["email"], f"Receipt: {total:.2f}")
    return total
```

```python
from unittest.mock import Mock
import pytest
from checkout import checkout, PaymentDeclined

CART = {"prices": [12.5, 7.25], "card": "tok_123", "email": "ada@example.org"}

def test_successful_checkout_charges_once_and_sends_receipt():
    gateway = Mock()
    gateway.charge.return_value = True          # 桩：备好的答案
    mailer = Mock()                             # 模拟对象：记录它收到的调用
    assert checkout(CART, gateway, mailer) == 19.75
    gateway.charge.assert_called_once_with("tok_123", 19.75)
    mailer.send.assert_called_once_with("ada@example.org", "Receipt: 19.75")

def test_declined_payment_sends_no_receipt():
    gateway = Mock()
    gateway.charge.return_value = False
    mailer = Mock()
    with pytest.raises(PaymentDeclined):
        checkout(CART, gateway, mailer)
    mailer.send.assert_not_called()
```

```console
$ pytest -q test_checkout.py
..                                                                       [100%]
2 passed in 0.16s
```

现在把 `mailer.send` 那行移到收款之前——一次看似合理的重构失误——并重跑：

```console
$ pytest -q test_checkout.py
...
E           AssertionError: Expected 'send' to not have been called. Called 1 times.
E           Calls: [call('ada@example.org', 'Receipt: 19.75')].
...
FAILED test_checkout.py::test_declined_payment_sends_no_receipt - AssertionEr...
1 failed, 1 passed in 0.23s
```

第二个测试失败了，它的消息展示了惹祸的调用。注意这些测试*没有*检查什么：真实网关是否接受 `"tok_123"` 和以英镑计的金额，或者真实邮件程序能否连上服务器。那是集成测试的事。
:::
:::

::: warning 万物皆可 mock，等于什么都没测
替身强大，也容易被滥用。一个 mock 掉每个协作者、断言调用序列分毫不差的测试，检验的是*实现*，不是行为：代码哪怕正确地重组，它也会失败；而当真实协作者本会拒绝这些调用时它反而通过，因为 mock 让它说什么就信什么。当真实对象快而确定（纯函数、内存数据结构）时优先用真实对象，慢资源用伪造对象，模拟对象主要用在系统边界上——支付、邮件、时钟、随机数。只由 mock 的单元测试搭成的套件可能全部通过，而组装起来的系统根本不能工作。
:::

### 不稳定测试

**不稳定**（flaky）测试在同一份代码上一会儿通过一会儿失败。罗（Luo）、哈里里（Hariri）、埃尔西（Eloussi）与马里诺夫（Marinov）（"An empirical analysis of flaky tests"，FSE 2014）研究了开源项目中 201 个不稳定测试的修复，发现最常见的原因是异步等待（睡固定时长、指望操作已完成）、并发、以及依赖测试的运行次序。其他来源还有真实时钟、不设种子的随机数、网络访问。对策随之而来：等待条件而不是等待时间，注入时钟和带种子的随机生成器，让每个测试有自己的全新状态（pytest **fixture** 每个测试创建一个），并让网络远离单元测试。不稳定测试会训练人们无视失败，所以必须立刻修复或隔离（[[software-engineering/version-control#def-ci]]）。

## 由性质生成测试

手工挑选的测试反映测试者的想象力。**基于属性的测试**在 [[programming-1/testing-debugging]] 中引入：陈述一条对一切输入都必须成立的性质，让库生成数百个输入，再把任何失败输入**缩小**为最小者。

::: example 一个会失败的往返 {#ex-hypothesis}
游程编码把 `"aaab"` 变成 `"3a1b"`。测试这条性质：对一切字符串，解码编码结果应还原原串。
::: solution
```python
import re

def encode(s: str) -> str:
    """游程编码：'aaab' -> '3a1b'。"""
    return "".join(f"{len(m.group(0))}{m.group(1)}" for m in re.finditer(r"(.)\1*", s))

def decode(code: str) -> str:
    return "".join(int(n) * ch for n, ch in re.findall(r"(\d+)(\D)", code))
```

```python
from hypothesis import given, strategies as st
from rle import encode, decode

def test_examples():
    assert encode("aaab") == "3a1b"
    assert decode("3a1b") == "aaab"
    assert decode(encode("x" * 12)) == "x" * 12

@given(st.text())
def test_decode_inverts_encode(s):
    assert decode(encode(s)) == s
```

```console
$ pytest -q test_rle.py
.F                                                                       [100%]
...
s = '0'

    @given(st.text())
    def test_decode_inverts_encode(s):
>       assert decode(encode(s)) == s
E       AssertionError: assert '' == '0'
E         
E         - 0
E       Failing test case: test_decode_inverts_encode(
E           s='0',
E       )
...
FAILED test_rle.py::test_decode_inverts_encode - AssertionError: assert '' ==...
1 failed, 1 passed in 2.05s
```

示例测试都通过，包括多位计数。Hypothesis 不停生成字符串直到出现一个失败的，然后把它缩小成最简单的失败输入——单字符串 `"0"`：它的编码 `"10"` 不含非数字字符，所以 `decode` 返回空串。只要文本含数字，这个格式就有歧义。想着「字符串」的测试者脑子里是字母；生成器没有这种偏见。[[#ex-rle-fix]] 将修复这个格式。
:::
:::

## 测试驱动开发

::: definition 测试驱动开发 {#def-tdd}
**测试驱动开发**（TDD）是一种以极短的三步循环编写代码的方式：**红**——为一个尚不存在的行为写一个小测试，看它失败；**绿**——写出让所有测试通过的最简单的代码；**重构**——在保持所有测试通过的前提下改进代码与测试的结构（[[software-engineering/refactoring-maintenance]]）。每个循环以分钟计。
:::

贝克（Kent Beck）在极限编程中发展了这一实践，并在 *Test-Driven Development: By Example*（2002）中作了描述。先看到每个测试失败一次，检验了「这个测试是会失败的」——一个在代码还不存在时就通过的测试什么也没检验——而先写测试迫使你从调用方一侧设计接口。

::: example 三个循环 {#ex-tdd}
用 TDD 开发 `seconds(text)`，它把 `"45s"`、`"2m"`、`"1h30m"` 这样的时长转成秒数。
::: solution
*循环 1，红。* 对着桩 `def seconds(text): pass` 测试 `seconds("45s") == 45`：

```console
$ pytest -q test_duration.py
E       AssertionError: assert None == 45
E        +  where None = seconds('45s')
1 failed in 0.15s
```

*绿。* 能通过的最简单代码是 `return int(text[:-1])`——故意很天真：`1 passed`。*重构：* 无事可做。

*循环 2，红。* 添加测试 `seconds("2m") == 120` 和 `seconds("1h30m") == 5400`：

```console
$ pytest -q test_duration.py
E       AssertionError: assert 2 == 120
E        +  where 2 = seconds('2m')
1 failed, 1 passed in 0.13s
```

*绿。* 现在需要一个真正的解析器：

```python
import re

UNITS = {"h": 3600, "m": 60, "s": 1}

def seconds(text):
    """'1h30m' -> 5400。单位 h、m、s，各至多出现一次，按此顺序。"""
    m = re.fullmatch(r"(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?", text)
    if not m or not text:
        raise ValueError(f"not a duration: {text!r}")
    return sum(int(v) * UNITS[u] for v, u in zip(m.groups(), "hms") if v)
```

`2 passed`。*循环 3，红—绿。* docstring 许下了测试未检查的承诺，所以添加一个参数化测试，检查 `""`、`"90"`、`"1m1h"`、`"5x"` 都抛 `ValueError`；它立刻通过（`6 passed`）。这里可以接受，因为这个行为是循环 2 里写下的——但一个从未失败过的测试值得怀疑一下，你可以临时破坏代码来检验。*重构：* `UNITS` 表和 docstring 本身就是那次清理。这些测试现在记录了函数的行为，包括它的拒绝。
:::
:::

TDD 有效吗？证据比其拥趸声称的弱，也比其批评者说的更正面。纳加潘（Nagappan）、马克西米利安（Maximilien）、巴特（Bhat）与威廉斯（Williams）（"Realizing quality improvement through test driven development"，*Empirical Software Engineering*，2008）报告，微软与 IBM 采用 TDD 的四个工业团队，其发布前缺陷密度比不用 TDD 的相似项目低 40–90%，而初始开发时间多 15–35%——但对照项目并未控制，而团队是自愿选择 TDD 的。拉菲克（Rafique）与米希奇（Mišić）的元分析（*IEEE TSE*，2013）综合 27 项研究，发现对外部质量有小的正面效应，对生产率没有清楚效应，研究之间差异很大。富奇（Fucci）等人（"A dissection of the test-driven development process"，*IEEE TSE*，2017）分析专业开发者的细粒度日志，发现以小而稳定的节奏工作与更好的结果相关联，而测试写在代码*之前*还是*之后*没有可检测的差别。谨慎的解读是：小步增量加上即时测试有帮助；次序也许不如节奏重要。

::: history
格伦福德·迈尔斯（Glenford Myers）的《软件测试的艺术》（*The Art of Software Testing*，1979）把黑盒与白盒测试设计系统化了；更早的 1978 年，德米洛、利普顿与塞沃德提出了变异测试。鲍里斯·贝泽（Boris Beizer）的《软件测试技术》（*Software Testing Techniques*，1983，第 2 版 1990）发展了路径测试与领域测试。组合测试源自实验设计；科恩等人的 AETG 系统发表于 1997 年。MC/DC 于 1992 年进入航空电子标准 DO-178B。贝克（Kent Beck）的 SUnit 以及他与伽玛（Erich Gamma）合作的 JUnit（1997）开创了 xUnit 框架家族；贝克的《测试驱动开发》2002 年出版，梅萨罗斯的测试替身名录 2007 年问世。克劳森（Koen Claessen）与休斯（John Hughes）的 QuickCheck（2000）开创了基于属性的测试；麦基弗（David MacIver）的 Hypothesis 于 2013 年把它带入 Python。
:::

## 后续内容

测试是对行为的采样；[[software-engineering/verification]] 介绍对*一切*行为进行推理的技术——静态分析、形式化规格说明、模型检查——以及要求 MC/DC 的安全攸关系统标准。测试是使 [[software-engineering/refactoring-maintenance]] 成为可能的安全网，而持续集成（[[software-engineering/version-control]]）在每次改动时运行它们。安全测试，包括模糊测试——以崩溃为目标的随机测试——见 [[security/secure-development]]，与用户的实验见 [[hci/usability-evaluation]]。

::: summary
- 测试在若干**层次**运行——单元、集成、系统、验收——各自抓到不同的缺陷（[[#def-test-levels]]）；让多数测试保持快速、位于金字塔下层，但别是全部。
- 由**划分与边界**设计测试；每个边界两侧各应有一个测试。
- **成对**覆盖（[[#def-t-way]]）用少至 $\lvert D_i\rvert\lvert D_j\rvert$ 个测试（[[#prop-pairwise-bound]]）测遍所有取值对，而不是所有组合；贪心生成（[[#alg-pairwise]]）就很接近。
- **MC/DC**（[[#def-mcdc]]）显示每个条件独立影响判定；它至少需要 $n + 1$ 个、至多 $2n$ 个测试（[[#prop-mcdc]]）。
- **变异测试**（[[#def-mutation]]）度量测试是否察觉缺陷；高覆盖率、低变异得分，意味着测试只是运行代码而没有检查代码。
- **测试替身**（[[#def-doubles]]）隔离单元，但过度 mock 检验的是实现；不稳定测试要立刻修复。
- **基于属性的测试**能找到没人想到的输入并把它们缩小；**TDD**（[[#def-tdd]]）以红—绿—重构循环工作，其益处的证据平稳而褒贬不一。
:::

## 习题

::: exercise 边界输入 {level=1 check="8"}
某函数接受 18 到 65 岁（含两端），分三个类：18–25、26–40 和 41–65；其余年龄被拒绝。对每两个相邻类之间（含有效/无效的边界）的边界，列出其两侧的取值，一共得到多少个互不相同的整数测试输入？（输入数值。）
::: solution
边界在 17 | 18、25 | 26、40 | 41 和 65 | 66 之间，给出输入 17、18、25、26、40、41、65、66：八个值。期望结果依次是：拒绝、类 1、类 1、类 2、类 2、类 3、类 3、拒绝。
:::
:::

::: exercise 成对下界 {level=1 check="12"}
一个系统有四个参数，取值数分别为 4、3、3、2。[[#prop-pairwise-bound]] 对成对测试集规模的下界是多少？（输入数值。）
::: solution
最大两个域大小之积，$4 \times 3 = 12$；作为对照，穷尽测试要 $4 \times 3 \times 3 \times 2 = 72$。
:::
:::

::: exercise 给替身归类 {level=1}
按 [[#def-doubles]] 给每个归类：(a) 一个 `now()` 方法返回测试设定的时间的对象；(b) 一个构造函数要求传入、但测试中从未调用的 `logger` 参数；(c) 一个实现与生产键值存储相同接口的内存字典；(d) 一个除非 `send` 恰好用给定参数调用一次否则就让测试失败的对象。
::: solution
(a) 桩（它返回备好的答案；若有推进时间的方法，如需求章那个，它同时也是简单的伪造对象）。(b) 哑对象。(c) 伪造对象。(d) 模拟对象——它的期望是测试的一部分。
:::
:::

::: exercise 析取式的 MC/DC {level=2 check="4"}
`a or b or c` 的 MC/DC 最少需要多少个测试？给出这样一个测试集。（输入数值。）
::: solution
由 [[#prop-mcdc]]，至少 $n + 1 = 4$。对析取式，条件 $x$ 仅当其余条件为假时才独立影响结果，所以独立对是 `FFF`–`TFF`、`FFF`–`FTF` 和 `FFF`–`FFT`。集合 {`FFF`, `TFF`, `FTF`, `FFT`} 包含全部三对，所以 $4$ 个测试够用。（`a and b and c` 可用镜像：`TTT` 和三个恰有一个条件为假的赋值。）
:::
:::

::: exercise 等价还是不等价？ {level=2}
对 `def clamp(x, lo, hi): return max(lo, min(x, hi))`（前置条件 `lo <= hi`），判断每个变异体是否等价：(a) `min` 与 `max` 互换，得 `min(lo, max(x, hi))`；(b) 把 `max(lo, min(x, hi))` 换成 `min(hi, max(x, lo))`；(c) 把 `min(x, hi)` 换成 `min(hi, x)`。
::: solution
(a) 不等价：$lo = 0$、$hi = 10$、$x = 5$ 时它给出 $\min(0, \max(5, 10)) = 0$ 而不是 $5$。(b) 在前置条件下等价：两者都计算 $x$ 夹到 $[lo, hi]$ 内的值——$x < lo$ 时都给 $lo$，$x > hi$ 时都给 $hi$，否则都给 $x$——所以没有合法测试能杀死它。没有前置条件时两者不同（$lo = 10$、$hi = 0$、$x = 5$ 分别给出 $10$ 和 $0$）。(c) 对数是等价的，因为 `min` 是对称的。它只在 `x` 与 `hi` 比较相等但可区分时不同——`min(1, 1.0)` 返回 `1`，`min(1.0, 1)` 返回 `1.0`——一个严格检查结果类型的测试能发现这一点：「等价」与「不等价」的边界取决于规格说明承诺了什么。
:::
:::

::: exercise 修复编码 {level=2 #ex-rle-fix}
通过在计数与字符之间写入分隔符（`"aaab"` 变成 `"3:a1:b"`），修复 [[#ex-hypothesis]] 的游程编码，并重跑属性测试。若它失败，弄清原因并修复。
::: solution
第一次尝试：

```python
import re

def encode(s: str) -> str:
    return "".join(f"{len(m.group(0))}:{m.group(1)}" for m in re.finditer(r"(.)\1*", s))

def decode(code: str) -> str:
    return "".join(int(n) * ch for n, ch in re.findall(r"(\d+):(.)", code))
```

现在数字安全了，因为每个冒号后恰跟一个字符。但 Hypothesis 报告了一个新的最小失败：

```console
$ pytest -q test_rle.py
...
E           s='\n',
...
1 failed in 0.37s
```

在 Python 的正则表达式里 `.` 不匹配换行符，所以 `encode("\n")` 为空。给 `re.finditer` 和 `re.findall` 都加上标志 `re.DOTALL`，让 `.` 匹配每个字符：

```python
import re

def encode(s: str) -> str:
    """带分隔符的游程编码：'aaab' -> '3:a1:b'。"""
    return "".join(f"{len(m.group(0))}:{m.group(1)}"
                   for m in re.finditer(r"(.)\1*", s, re.DOTALL))

def decode(code: str) -> str:
    return "".join(int(n) * ch for n, ch in re.findall(r"(\d+):(.)", code, re.DOTALL))
```

```console
$ pytest -q test_rle.py
.                                                                        [100%]
1 passed in 2.05s
```

属性测试找到了两个不同的缺陷，每个都缩小成一个字符的输入；手写的例子一个也发现不了。
:::
:::

::: exercise 合取式的 MC/DC {level=3}
证明：对判定 $c_1 \wedge c_2 \wedge \dots \wedge c_n$，最小 MC/DC 测试集恰有 $n + 1$ 个测试，且独立对是被强制的：每一对都由全真赋值与一个恰有一个条件为假的赋值组成。
::: solution
*被强制的对。* 设两个赋值只在 $c_i$ 上不同而结果不同。其中之一使合取式为真，所以它的所有条件都为真：它就是全真赋值 $\mathbf{T}$。另一个与它只在 $c_i$ 上不同，所以它是把 $c_i$ 置假的 $\mathbf{T}$，记作 $\mathbf{T}_{\bar i}$；其结果为假，符合要求。于是 $c_i$ 唯一的独立对是 $\{\mathbf{T}, \mathbf{T}_{\bar i}\}$。

*恰为 $n + 1$。* 因此任何 MC/DC 集都必须包含 $\mathbf{T}$ 和全部 $n$ 个赋值 $\mathbf{T}_{\bar 1}, \dots, \mathbf{T}_{\bar n}$，它们互不相同：$n + 1$ 个测试。反过来，这 $n + 1$ 个测试包含每个独立对，使每个条件既取过真也取过假，并给出两种结果，所以它们构成一个 MC/DC 集。这与 [[#prop-mcdc]] 的一般下界吻合，并表明它是紧的；该证明中对应的图是以 $\mathbf{T}$ 为中心的星。与穷尽测试的 $2^n$ 比较：$n = 10$ 时，11 个测试而不是 1024 个。
:::
:::

::: exercise 更多变异算子 {level=3}
给 [[#ex-mutation]] 的变异工具添上换 `+`/`-`、`*`/`/` 和 `and`/`or` 的算子，用边界套件在运费函数上运行它。每个新变异体都被杀死了吗，为什么？
::: solution
扩展版按固定次序收集每个带可变异运算符的节点——比较、二元运算和布尔运算——每次运行变异一处并记录结果：

```python
import ast, subprocess, sys

SWAPS = {ast.Lt: ast.LtE, ast.LtE: ast.Lt, ast.Gt: ast.GtE, ast.GtE: ast.Gt,
         ast.Eq: ast.NotEq, ast.NotEq: ast.Eq,
         ast.Add: ast.Sub, ast.Sub: ast.Add, ast.Mult: ast.Div, ast.Div: ast.Mult,
         ast.And: ast.Or, ast.Or: ast.And}

def sites(tree):
    """按固定次序给出每个带我们会变异的运算符的节点。"""
    out = []
    for n in ast.walk(tree):
        if isinstance(n, ast.Compare) and type(n.ops[0]) in SWAPS:
            out.append((n, "ops"))
        elif isinstance(n, (ast.BinOp, ast.BoolOp)) and type(n.op) in SWAPS:
            out.append((n, "op"))
    return out

def mutants(source):
    for k in range(len(sites(ast.parse(source)))):
        tree = ast.parse(source)
        node, field = sites(tree)[k]
        old = type(node.ops[0]) if field == "ops" else type(node.op)
        if field == "ops":
            node.ops[0] = SWAPS[old]()
        else:
            node.op = SWAPS[old]()
        yield f"line {node.lineno}: {old.__name__} -> {SWAPS[old].__name__}", ast.unparse(tree)

def killed(target, src, tests):
    open(target, "w").write(src)
    return subprocess.run([sys.executable, "-m", "pytest", "-q", "-x", tests],
                          capture_output=True).returncode != 0

target, tests = sys.argv[1], sys.argv[2]
original = open(target).read()
try:
    results = [(desc, killed(target, src, tests)) for desc, src in mutants(original)]
finally:
    open(target, "w").write(original)
for desc, k in results:
    print(("killed   " if k else "SURVIVED ") + desc)
print(f"mutation score: {sum(k for _, k in results)}/{len(results)}")
```

```console
$ python3 mutate2.py shipping.py test_shipping.py
killed   line 5: Or -> And
killed   line 7: LtE -> Lt
killed   line 5: LtE -> Lt
killed   line 5: Gt -> GtE
killed   line 9: LtE -> Lt
killed   line 13: Mult -> Div
mutation score: 6/6
```

出现了两个新变异体。把第 5 行的 `or` 改成 `and`，有效性检查就成了 `weight_kg <= 0 and weight_kg > 30`，永不为真，于是非法重量会被接受：非法重量测试杀死了它。把 `fee * 2` 改成 `fee / 2` 使快递运费减半，被 `test_express_doubles` 杀死。函数里没有 `+` 或 `-`，所以那些算子产生不出变异体。套件的设计体现在得分里：每个测试的存在都是为了钉住规格说明的一个部分，而每个变异体都违反一个部分。（行的先后次序跟随 `ast.walk`，它先访问外层节点再访问内层节点。）
:::
:::
