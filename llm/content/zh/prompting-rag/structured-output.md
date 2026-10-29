人读模型的回答，容得下一句跑题的话、一个不一样的标题，或一个用文字写出的数字。程序容不下。当语言模型的输出要喂给数据库、用户界面、函数调用或另一个模型时，它必须是**机器可读的**：带正确字段与类型的合法 JSON、一种格式的日期、固定集合里的一个标签。一个 $99\%$ 的情况下格式都对的模型，对于要调用一百万次的流水线而言，就会失败一万次。

有三条路可以走到这里，按可靠性从低到高排列：**请求**某种格式再检查结果；**训练**模型遵循格式；以及**约束**解码，让非法输出根本不可能出现。本章讲解模式、校验—重试循环，以及讲得最细的受约束解码——文法或有限自动机如何在每一步化为词表上的一张掩码，它能保证什么，又悄悄改变了模型所采样分布的什么。一个用纯 Python 为 JSON 数字写的小受约束解码器让机制变得具体。其他章节在本章之上展开：函数调用（[[agents/function-calling]]）就是模式描述工具参数的结构化输出。

## 模式 {#sec-schemas}

格式首先要精确地指定。对 JSON 而言，标准词汇表是 **JSON Schema**：一份描述哪些 JSON 值是合法的 JSON 文档。

::: definition JSON Schema（核心关键字） {#def-schema}
**JSON Schema** 是一个 JSON 对象，它的关键字对一个值加以约束。最常用的是：`type`（取 `object`、`array`、`string`、`number`、`integer`、`boolean`、`null` 之一）；对对象，`properties`（每个具名字段的模式）、`required`（必须出现的字段）与 `additionalProperties`（是否允许其他字段）；对数组，`items`（每个元素的模式）配 `minItems` 与 `maxItems`；对字符串，`enum`（固定的合法值列表）、`pattern`（正则表达式）与 `format`（例如 `date`）；对数字，`minimum` 与 `maximum`。一个值满足每一个关键字，就称它**通过**该模式的**校验**。
:::

::: example 提取发票的模式 {#ex-schema}
为发票抽取器的输出写一个模式：供应商名称必填，总额必填且为非负数字，货币必填且取自 EUR、USD、GBP，另有一个可选的明细项列表，每项含描述与金额。
::: solution
```json
{
  "type": "object",
  "properties": {
    "supplier": {"type": "string"},
    "total":    {"type": "number", "minimum": 0},
    "currency": {"type": "string", "enum": ["EUR", "USD", "GBP"]},
    "items": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {"description": {"type": "string"}, "amount": {"type": "number"}},
        "required": ["description", "amount"],
        "additionalProperties": false
      }
    }
  },
  "required": ["supplier", "total", "currency"],
  "additionalProperties": false
}
```

`{"supplier": "Acme", "total": 120.5, "currency": "EUR"}` 通过校验；`{"supplier": "Acme", "total": "120.50 €"}` 有两处不合法——`total` 是字符串，而且 `currency` 缺失。注意模式说不出什么：总额应等于各明细项之和，或供应商应为发票上印着的那一家。
:::
:::

模式同时起三个作用：它是指令的一部分（模型看到格式时遵循得更好）；它是校验所依据的规范；而且如下文所述，它可以被编译成对解码的约束。

## 请求、校验与重试 {#sec-retry}

最简单的方法不需要特殊的解码。把模式和一个示例放进提示（[[prompting-rag/prompt-design#def-components]]），解析输出，校验它，失败就再调用一次模型——最好把错误信息一并给它，让它有机会自我纠正。

::: proposition 重试到成功为止 {#prop-retries}
若每次尝试都独立地以概率 $q > 0$ 得到合法输出，则到第一个合法输出为止的尝试次数服从几何分布：尝试次数的期望是 $1/q$，而 $r$ 次尝试全部失败的概率是 $(1 - q)^r$。
:::

::: proof
第一次成功发生在第 $j$ 次尝试的概率是 $(1 - q)^{j-1}q$。由独立性，前 $r$ 次全部失败的概率是 $(1 - q)^r$。期望为 $\sum_{j\ge1}j(1 - q)^{j-1}q = q\cdot\frac{1}{(1 - (1 - q))^2} = \frac1q$，用到 $\lvert x\rvert < 1$ 时的 $\sum_{j\ge1}jx^{j-1} = 1/(1 - x)^2$。
:::

::: example 要重试几次？ {#ex-retries}
某个提示 $90\%$ 的情况下给出合法 JSON。每个合法结果的期望调用次数是多少？在 $3$ 次尝试的上限下，仍有失败的请求占多大比例？如果失败并不独立呢？
::: solution
期望调用 $1/0.9 = 1.11$ 次，多出 $11\%$ 的开销。三次尝试全部失败的概率是 $0.1^3 = 0.001$，一千个请求里有一个。独立假设是薄弱环节：失败集中在特定输入上——超长的文档、不寻常的字符——失败过一次的输入更可能再次失败。在相信 $(1 - q)^r$ 之前，先在真实失败上测量重试的成功率。
:::
:::

::: widget plot
f: 1 - (1 - q)^x
x: 0, 6
y: 0, 1.05
sliders: q=0.9:0.05:0.99:0.01
labels: probability of a valid output within $r$ attempts
points: 1,0.9; 3,0.999
caption: $r$ 次独立尝试中至少一次合法的概率 $1 - (1 - q)^r$ 对 $r$ 的曲线。$q = 0.9$ 时三次尝试达到 $0.999$，见 [[#ex-retries]]。即便单次合法率很低，曲线也升得很快——前提是尝试真的独立，而难输入上相关的失败恰恰违背这一点。
:::

重试与模型无关，只需要一个校验器，这就是它作为万能兜底办法的原因。它的代价是每次重试的延迟与词元，它给的保证也只是概率性的。许多推理服务与开源服务器还提供保证语法合法 JSON 的 **JSON 模式**，或接受 JSON Schema 的 **schema 模式**；到 2026 年，这些功能的实现方式就是下一节的受约束解码，有时再配上为遵循模式微调过的模型。

## 受约束的解码 {#sec-constrained}

语言模型靠反复计算下一词元 logits $\mathbf{z}_t\in\R^{\lvert\mathcal{V}\rvert}$ 并挑一个词元来生成（[[inference/decoding-sampling]]）。没有任何东西阻止我们在挑之前改动 logits。若我们知道哪些词元仍可能延展出合法输出，就能把其余词元的 logits 设为 $-\infty$；softmax 于是给它们零概率，非法输出再也不可能被生成。

::: definition 受约束的解码 {#def-constrained}
设 $L$ 是允许的字符串集合（一个**形式语言**，例如所有通过某模式校验的字符串），$\operatorname{Pref}(L)$ 是它的前缀集合。给定已生成的文本 $s$，**允许集合**为

$$
A(s) = \{v\in\mathcal{V} : s\,v\in\operatorname{Pref}(L)\}\ \cup\ \{\texttt{<eos>} : s\in L\},
$$

其中 $s\,v$ 是 $s$ 与词元 $v$ 的字符拼接。**受约束的解码**从掩蔽后的分布

$$
q(v\mid s) = \frac{p_\theta(v\mid s)\,\mathbb{1}[v\in A(s)]}{\sum_{u\in A(s)}p_\theta(u\mid s)}.
$$ {#eq-masked}
:::

::: proposition 受约束解码是可靠的 {#prop-sound}
假设词表包含 $L$ 中字符串出现的每一个单字符，且解码从空串开始——当 $L$ 非空时空串属于 $\operatorname{Pref}(L)$。那么每一步的允许集合 $A(s)$ 都非空；并且如果受约束解码因输出 `<eos>` 而停止，其输出属于 $L$。
:::

::: proof
用归纳法证明已生成的文本 $s$ 始终属于 $\operatorname{Pref}(L)$。初始时 $s$ 为空，是任何串的前缀。若 $s\in\operatorname{Pref}(L)$，下一个词元 $v$ 取自 $A(s)$，于是按定义，或者 $v$ 是 `<eos>`，或者 $s\,v\in\operatorname{Pref}(L)$。再证非空：由 $s\in\operatorname{Pref}(L)$，存在 $s\,w\in L$。若 $w$ 为空，则 $s\in L$，`<eos>` 被允许；否则 $w$ 的第一个字符 $c$ 按假设是一个词元，而 $s\,c$ 是 $s\,w$ 的前缀，故 $c\in A(s)$。最后，`<eos>` 只在 $s\in L$ 时被允许，所以完成的输出属于 $L$。
:::

关于单字符的假设不是走过场。若词表能走到某个前缀、却不能从那里继续——比如在含有词元 `bl` 却不含词元 `l` 的词表里，词 `blue` 的前缀 `b`——解码器就会卡住。真实的分词器包含全部字节，所以字节层面不会出这种事；但当受约束器在受限的词元集上工作时就会。一道习题会构造这样的例子。终止是另一回事：[[#prop-sound]] 对从不选 `<eos>` 的模型不置一词，而对词元数的硬上限可能在非法状态下把输出拦腰截断——除非受约束器在接近上限时强制补全。

### 正则语言与有限自动机

允许集合必须在每一步对上 $10^5$ 甚至更多的词元算出来，所以它必须便宜。对许多格式——数字、日期、标识符、枚举，以及固定、非递归模式的 JSON 对象——语言 $L$ 是**正则的**：可由正则表达式描述，由**确定有限自动机**（DFA）识别。DFA 是一个有限状态集，带一个起始状态、一个转移函数 $\delta(\text{state}, \text{character})$ 和一个接受状态集。一个串是 $L$ 的前缀，当且仅当在它上面运行 DFA 从不落入**死状态**（在剪枝之后我们不妨假设每个别的状态都能到达某个接受状态）。

Willard 与 Louf（2023）的关键观察是：DFA 的状态很少，而词表很大且固定，所以这份功课可以一劳永逸地提前做完。

::: algorithm 基于索引的受约束解码 {#alg-index}
**预计算**（每个语言与分词器只做一次）。对每个 DFA 状态 $q$ 与每个词元 $v$，把 $v$ 的字符逐一喂给从 $q$ 出发的 DFA；若始终不落进死状态，就把 $v$ 记为在 $q$ 处允许，并记下终止状态 $\delta^*(q, v)$。给每个接受状态的允许集合加上 `<eos>`。

**解码。** 从起始状态出发。每一步查当前状态的允许集合，把其他 logits 全部掩成 $-\infty$，挑一个词元，走到它记下的终止状态。遇到 `<eos>` 停止。
:::

每步的成本是一次查表加一次带掩码的 softmax，与模型的前向传播相比几乎免费。跨越多步 DFA 转移的词元——`3.14` 在许多词表里就是一个词元——能被自然地处理，因为索引让自动机在整个词元上跑一遍。

::: example `-` 之后允许哪些词元 {#ex-allowed}
词表包含词元 `-`、`.`、`0`、`7`、`12`、`00`、`.5`、`-3`、`3.14`、`e` 与 `<eos>`。用上面那个 DFA，模型已产出 `-` 时哪些词元被允许？已产出 `-7` 时呢？
::: solution
`-` 之后 DFA 在状态 $M$，必须跟数字。允许的：`0`（到 $Z$）、`7` 与 `12`（到 $I$）、`3.14`（经 $I$、$D$ 到 $F$）。不允许的：`-` 与 `-3`（第二个负号）、`.` 与 `.5`（小数点前没有数字）、`00`（从 $M$ 起 `0` 到 $Z$，而 $Z$ 不再接受数字）、`e`（不在这个语言里）与 `<eos>`（$M$ 不是接受状态）。`-7` 之后状态是 $I$：允许的是 `.`、`0`、`7`、`12`、`00`、`.5`、`3.14` 与 `<eos>`，而 `-`、`-3`、`e` 不允许。
:::
:::

### 纯 Python 实现的受约束解码器

下面这段代码为数字 DFA 实现了 [[#alg-index]]：配一个玩具词表，并用随机 logits 代替语言模型。它先自由生成 $200$ 个输出，再带掩码生成 $200$ 个；第三遍加一条规则：在最后一个允许的步，只允许以接受状态收尾的词元。

```python
import math, random

# DFA for the JSON number subset  -?(0|[1-9][0-9]*)(\.[0-9]+)?
DIG = "0123456789"
def step(state, ch):
    if state == "S":                       # start
        if ch == "-": return "M"
        if ch == "0": return "Z"
        if ch in DIG: return "I"
    elif state == "M":                     # after a minus sign
        if ch == "0": return "Z"
        if ch in DIG: return "I"
    elif state in ("Z", "I"):              # integer part done (Z: a lone 0)
        if ch == ".": return "D"
        if state == "I" and ch in DIG: return "I"
    elif state in ("D", "F"):              # after '.', then fraction digits
        if ch in DIG: return "F"
    return None                            # dead state
ACCEPT = {"Z", "I", "F"}

VOCAB = ["<eos>", "-", ".", "0", "1", "2", "3", "7", "9", "12", "42", "00",
         ".5", "-3", "3.14", "e", " ", "abc", "\"", "1,"]
EOS = 0

def run(state, tok):                       # feed a whole token, char by char
    for ch in tok:
        state = step(state, ch)
        if state is None: return None
    return state

# Precompute the index: DFA state -> ids of allowed tokens (Willard & Louf 2023)
INDEX = {}
for q in ["S", "M", "Z", "I", "D", "F"]:
    ok = [i for i, t in enumerate(VOCAB) if i != EOS and run(q, t) is not None]
    if q in ACCEPT: ok.append(EOS)
    INDEX[q] = sorted(ok)

def toy_logits(rng):                       # stand-in for a language model
    return [rng.gauss(0, 1.5) for _ in VOCAB]

def sample(logits, allowed, rng):
    m = max(logits[i] for i in allowed)
    w = [math.exp(logits[i] - m) for i in allowed]       # masked softmax
    r, acc = rng.random() * sum(w), 0.0
    for i, wi in zip(allowed, w):
        acc += wi
        if r <= acc: return i
    return allowed[-1]

def generate(rng, constrained, max_tokens=8, finish=False):
    state, out = "S", ""
    for t in range(max_tokens):
        allowed = INDEX[state] if constrained else list(range(len(VOCAB)))
        if finish and t == max_tokens - 1:   # last step: must end in an accepting state
            allowed = [i for i in allowed if i == EOS or run(state, VOCAB[i]) in ACCEPT]
        i = sample(toy_logits(rng), allowed, rng)
        if i == EOS: break
        out += VOCAB[i]
        if constrained: state = run(state, VOCAB[i])
    return out

def valid(s):
    q = "S"
    for ch in s:
        q = step(q, ch)
        if q is None: return False
    return q in ACCEPT

for q in INDEX: print(q, [VOCAB[i] for i in INDEX[q]])
rng = random.Random(0)
for name, c, f in (("free", False, False), ("masked", True, False), ("masked+finish", True, True)):
    outs = [generate(rng, c, finish=f) for _ in range(200)]
    bad = [o for o in outs if not valid(o)]
    print(f"{name:14s} valid {200 - len(bad)}/200  e.g. {outs[:3]}  invalid e.g. {bad[:2]}")
```

```text
S ['-', '0', '1', '2', '3', '7', '9', '12', '42', '-3', '3.14']
M ['0', '1', '2', '3', '7', '9', '12', '42', '3.14']
Z ['<eos>', '.', '.5']
I ['<eos>', '.', '0', '1', '2', '3', '7', '9', '12', '42', '00', '.5', '3.14']
D ['0', '1', '2', '3', '7', '9', '12', '42', '00']
F ['<eos>', '0', '1', '2', '3', '7', '9', '12', '42', '00']
free           valid 9/200  e.g. ['-33.14e.51', ' 0702e001,', '3422']  invalid e.g. ['-33.14e.51', ' 0702e001,']
masked         valid 198/200  e.g. ['200713.14742', '21221', '12391707']  invalid e.g. ['1742000009.', '1199937.']
masked+finish  valid 200/200  e.g. ['1.2', '142707313.14', '9422.511009']  invalid e.g. []
```

自由的"模型" $200$ 次里只产出 $9$ 个合法数字。掩蔽把它抬到 $198$；两处失败是在状态 $D$、刚过小数点时被 $8$ 词元上限截断的输出——就是 [[#prop-sound]] 之后那条关于终止的保留意见。在最后一步强制接受状态补上了这个缺口。输出显得很长，是因为随机 logits 不给 `<eos>` 任何偏爱；真实模型会在训练教会它数字结束的地方收尾，掩蔽就很少用得上了。

### 上下文无关文法

DFA 只有有限多个状态，因此不会计数；平衡括号的语言——因而带有任意嵌套对象与数组的 JSON——不是正则的。带递归的格式由**上下文无关文法**描述，由带栈的自动机识别。允许集合此时既依赖状态也依赖栈，无法完全预计算；文法受约束解码器增量地跟踪解析器状态、现算掩码，并对众多合法性不依赖栈的词元做预计算（Dong et al., 2024 报告，这在他们自己的系统中使 JSON 的开销可以忽略）。实践中，没有递归引用的 JSON Schema 编译成正则表达式，有递归的编译成文法。截至 2026 年，若干开源库两者兼备（其中有 Outlines、Guidance、llama.cpp 的 GBNF 文法与 XGrammar），许多托管推理服务接受 JSON Schema 并把解码约束到它。

## 掩蔽对分布做了什么 {#sec-distortion}

掩蔽保证合法性，但它采样的并不是人们可能预期的那个分布。自然的目标是模型分布以合法为**条件**的分布 $p_\theta(x\mid x\in L) = p_\theta(x)/p_\theta(L)$。受约束解码产出的是别的东西。

::: proposition 受约束解码的分布 {#prop-distortion}
对以 `<eos>` 结尾的输出 $x = (x_1, \dots, x_T)$，记 $Z_t(x) = \sum_{u\in A(x_{<t})}p_\theta(u\mid x_{<t})$ 为第 $t$ 步模型放在允许词元上的概率质量。则受约束采样以如下概率产出 $x\in L$：

$$
q(x) = \frac{p_\theta(x)}{\prod_{t=1}^{T}Z_t(x)},
$$

并且当且仅当 $\prod_t Z_t(x)$ 对所有满足 $p_\theta(x) > 0$ 的 $x\in L$ 取同一个值时，$q(x) = p_\theta(x\mid x\in L)$ 对一切 $x\in L$ 成立。
:::

::: proof
由链式法则与 [[#eq-masked]]，$q(x) = \prod_t p_\theta(x_t\mid x_{<t})/Z_t(x) = p_\theta(x)/\prod_tZ_t(x)$，因为属于 $L$ 的输出的每个词元当时都是允许的。若对所有这样的 $x$ 有 $\prod_tZ_t(x) = c$，则 $q(x) = p_\theta(x)/c$；对 $L$ 求和得 $c = p_\theta(L)$，所以 $q$ 正是条件分布。反过来，若对一切 $x$ 都有 $q(x) = p_\theta(x)/p_\theta(L)$，把两个表达式相除即得每个 $x$ 的 $\prod_tZ_t(x) = p_\theta(L)$。
:::

掩蔽是贪心的：因为存在某个合法的延续，它就定下当前前缀，却不问这些合法延续的值钱程度。

::: example 一次被扭曲的选择 {#ex-distortion}
设 $L = \{\texttt{ab}, \texttt{ba}\}$。模型以概率 $0.9$ 以 `a` 开头、以 $0.1$ 以 `b` 开头。在 `a` 之后，它以 $0.01$ 的概率接 `b`（它强烈偏好某个非法词元）；在 `b` 之后，以 $0.9$ 的概率接 `a`。设此后 `<eos>` 的概率为 $1$。比较条件分布与受约束解码。
::: solution
模型给出 $p(\texttt{ab}) = 0.9\cdot0.01 = 0.009$，$p(\texttt{ba}) = 0.1\cdot0.9 = 0.09$，于是 $p(\texttt{ab}\mid L) = 0.009/0.099 = 0.091$：以合法为条件，`ba` 的可能性是它的十倍。受约束解码两个首词元都允许（各自开启一个合法串），以概率 $0.9$ 挑 `a`；随后只允许 `b`，掩蔽把它的概率从 $0.01$ 抬到 $1$。于是 $q(\texttt{ab}) = 0.9$。用 [[#prop-distortion]] 的语言说，$Z_2(\texttt{ab}) = 0.01$ 与 $Z_2(\texttt{ba}) = 0.9$ 相差悬殊，这正是两个分布对不上的原因。
:::
:::

这个例子很极端，但现象是真的：当掩蔽把模型推离它偏好的路径时，被推上去的路径的概率被抬高，模型可能被逼进它认为极不可能的延续——字段里填了个占位符，或仅仅因为格式没给"我不知道"留位置就选了一个答案。Park et al.（2024）分析了文法受约束解码的这种扭曲，并提出了渐近纠正它的采样方法；基于序贯蒙特卡洛的方法追求同一目标。多数应用中扭曲很小，因为好的提示本来就使模型把大部分概率质量放在合法输出上：此时每个 $Z_t$ 都接近 $1$。

::: warning 合法不等于正确
模式保证的是形状，不是真相。对一张模型找不到总额的发票，受约束解码照样会生成一个完全合法的 `{"total": 0}`，因为模式要求一个数字、又没提供别的出路。给模式留出表达不确定的余地——一个可空字段、`"unknown"` 这样的枚举值、一个显式的 `"found": false`——解析之后还要校验**内容**（求和、区间、相互引用）。
:::

## 为模型设计格式 {#sec-design}

从自回归模型的生成方式可以推出几条设计守则。

- **让推理排在结论之前。** 键按顺序生成。若 `"answer"` 排在 `"explanation"` 之前，回答就在任何解释存在之前被产出，解释只能事后替它找理由。把自由文本的推理字段放在最前，模型就在格式之内享受到思维链的好处（[[prompting-rag/prompt-design#def-cot]]）。
- **别把自由文本逼得太死。** Tam et al.（2024）报告，与先自由作答、事后再转换相比，严格的格式约束在某些推理任务上拉低了模型的准确率；另一些评测则发现，只要格式给推理留有余地，损失很小甚至没有。稳妥的做法是在你自己的任务上把两种方式都测一遍。
- **让提示与约束保持一致。** 在提示里展示模式或一个示例；模型被强行塞进没有被告知的格式时，更容易被推到低概率路径上，如 [[#ex-distortion]]。
- **留心分词器。** 掩蔽在词元上起作用，不在字符上；模型对某个串的天然分词可能与掩码允许的分词不同——例如当提示正好断在通常是一个词元的地方中间。库的做法是"词元愈合"（回退一个词元，并约束重新生成的词元以被删掉的文本开头）或预计算词元级自动机。
- **无论如何都要校验。** 即便有受约束解码，也要解析并校验：库只支持 JSON Schema 的子集，长度上限会截断输出，内容约束在模式之外。

::: quiz
一个模式受约束的抽取器被要求对每条影评输出 `{"sentiment": "positive" | "negative"}`。对明明是中立的影评，它 $80\%$ 的情况下返回 `positive`。最可能的解释是什么？
- [ ] 受约束解码坏了：它本该报一个错误。
- [x] 模式没有中立选项，于是掩蔽强迫在两个标签中二选一，把模型放在它们身上的再小的概率质量也归一化到二者上。
- [ ] 模型的分词器无法表示 neutral 这个词。
- [ ] JSON Schema 不支持枚举。
::: solution
受约束解码做的正是被要求做的事：只允许 `positive` 与 `negative`，于是全部概率都被归一化到它们上（[[#eq-masked]]），无论模型觉得两者多么不像话。解决办法在模式里——加上 `neutral` 或 `unknown`——不在解码器里。
:::
:::

::: history
把生成约束到某个词表或文法，比大语言模型更老：面向翻译的词法约束解码（Hokamp 与 Liu, 2017）强制指定的词出现；文法受约束解码被用于语义解析与代码生成，例如 Shin et al.（2021）把输出约束到一种典范子语言。到了大模型时代，对可靠 JSON 的需求让这项技术走进主流。开源库 Guidance（2022–2023）把提示与约束交替起来；Willard 与 Louf（2023）展示了如何把正则表达式或文法对着词表建索引，使掩蔽几乎不花钱，并在 Outlines 库中实现；llama.cpp 于 2023 年加入 GBNF 文法；2023–2024 年起，托管推理服务纷纷加上 JSON 模式与模式（schema）模式。Dong et al.（2024）让上下文无关格式的文法掩码变快（XGrammar），Park et al.（2024）分析并纠正了掩蔽引入的扭曲。
:::

::: summary
- 机器可读的输出需要精确的规范；JSON Schema 描述类型、必填字段、枚举、模式与取值范围。
- 请求、校验、重试适用于任何模型；各次尝试独立、成功率为 $q$ 时平均需要 $1/q$ 次尝试，但现实中的失败是相关的。
- 受约束解码掩掉一切无法把输出延续成该语言中字符串的词元；只要单字符都在词表里，它就永不会卡住、且只输出合法串，尽管长度上限仍可能截断。
- 正则格式编译成 DFA，其按状态乘词元的掩码可以预计算；递归格式需要文法与栈，掩码增量计算。
- 掩蔽从 $p_\theta(x)/\prod_tZ_t(x)$ 采样，而不是从 $p_\theta(x\mid x\in L)$ 采样；它会抬高模型本来看不上眼的延续。
- 模式合法的回答仍然可能是错的：给模式留出不确定的余地，把推理放在结论之前，解析之后校验内容。
:::

## 习题

::: exercise 期望尝试次数 {level=1 check="1.25"}
某个提示每次尝试独立地以概率 $0.8$ 产生模式合法的输出。每个合法输出的期望尝试次数是多少？
::: solution
由 [[#prop-retries]]，$1/0.8 = 1.25$。
:::
:::

::: exercise 连续三次失败 {level=1 check="0.000125"}
每次独立尝试的合法输出率为 $0.95$ 时，三次尝试全部失败的概率是多少？
::: solution
$(1 - 0.95)^3 = 0.05^3 = 0.000125$。
:::
:::

::: exercise 数允许词元 {level=1 check="13"}
在代码清单的 $20$ 个词元（含 `<eos>`）中，状态 $I$ 下允许多少个？解释为什么 `00` 在 $I$ 下允许、在 $M$ 下不允许。
::: solution
代码清单打印出 $13$ 个：`<eos>`、`.`、`0`、`1`、`2`、`3`、`7`、`9`、`12`、`42`、`00`、`.5` 与 `3.14`。在 $I$ 下，整数部分已经以非零数字开头，其后再来多少个零都行（`700`）。在 $M$ 下，一个零通往 $Z$——单独的前导零——此后不允许再跟任何数字；`00` 将是一个带前导零的数字，在 JSON 中不被允许。
:::
:::

::: exercise 一个较小的扭曲 {level=2 check="0.375"}
设 $L = \{\texttt{ab}, \texttt{ba}\}$，模型以概率 $0.6$ 以 `a` 开头、以 $0.4$ 以 `b` 开头；`a` 之后以 $0.2$ 的概率接 `b`，`b` 之后以 $0.5$ 的概率接 `a`。计算 $p_\theta(\texttt{ab}\mid L)$ 与受约束解码产出 `ab` 的概率。
::: solution
$p(\texttt{ab}) = 0.6\cdot0.2 = 0.12$，$p(\texttt{ba}) = 0.4\cdot0.5 = 0.2$，故 $p(\texttt{ab}\mid L) = 0.12/0.32 = 0.375$。受约束解码自由地挑第一个词元，所以它以概率 $0.6$ 产出 `ab`、以 $0.4$ 产出 `ba`。
:::
:::

::: exercise 掩码表的大小 {level=2 check="96000"}
某个正则表达式编译成含 $6$ 个活跃状态的 DFA，分词器有 $128{,}000$ 个词元。按每个（状态，词元）一位计，允许词元的位掩码表需要多少字节？为什么一个大型 JSON Schema 会让这张表大得多？
::: solution
$6\cdot128{,}000 = 768{,}000$ 位 $= 96{,}000$ 字节。字段、枚举与模式很多的模式会编译出成千上万个状态的 DFA——每个固定键名的每个位置、每个枚举值、每个子模式都贡献状态——于是表成比例地膨胀；库会压缩它、只为允许的（状态，词元）对存终止状态，或按需惰性计算一部分。
:::
:::

::: exercise 加上指数部分 {level=2}
把图中的 DFA 扩展到完整的 JSON 数字语法：整数部分或小数部分之后允许可选的指数 `[eE][+-]?[0-9]+`。列出新增的状态、它们的转移以及新的接受状态集。
::: solution
新增三个状态：$E$（`e` 或 `E` 之后）、$P$（指数的符号之后）与 $X$（指数数字）。新增转移：从 $Z$、$I$、$F$ 在 `e` 或 `E` 下到 $E$；从 $E$ 在 `+` 或 `-` 下到 $P$；从 $E$ 与 $P$ 在数字下到 $X$；从 $X$ 在数字下到 $X$。接受状态变为 $Z$、$I$、$F$ 与 $X$；$E$ 与 $P$ 不是接受状态，因为 `1e` 与 `1e+` 都还不完整。每个新状态都能到达 $X$，所以依然没有废状态。
:::
:::

::: exercise 留出疑问余地的模式 {level=2}
改写 [[#ex-schema]] 的模式，让抽取器可以说它既没找到总额也没找到货币、而无需编造数值，并让下游程序能区分"未找到"与真正的零。然后解释把 `"evidence"`（发票原文的引文）排在 `"total"` 之前为什么可能提高准确率。
::: solution
一种做法：把 `total` 的类型写成 `["number", "null"]`，把 `currency` 写成包含 `null`（或字符串 `"UNKNOWN"`）的枚举，两者保持必填，并说明 `null` 表示"发票上没有写"。这样真正的零是 `0`，缺失是 `null`。把必填的 `"evidence"` 字符串放在最前面，会促使模型先抄下写明总额的那句话、再生成数字；生成是自回归的，于是这个数字以引文为条件，而引文还可以自动与原文核对。
:::
:::

::: exercise 证明重试公式 {level=2}
证明 $\lvert x\rvert < 1$ 时 $\sum_{j\ge1}jx^{j-1} = 1/(1 - x)^2$，并由此证明在 $r$ 次尝试的上限下，期望调用次数是 $(1 - (1 - q)^r)/q$。
::: solution
对几何级数 $\sum_{j\ge0}x^j = 1/(1 - x)$ 逐项求导——在其收敛半径内这是允许的——得 $\sum_{j\ge1}jx^{j-1} = 1/(1 - x)^2$。设有上限 $r$，调用次数 $N\ge j$ 当且仅当前 $j - 1$ 次尝试全部失败（$j\le r$），故 $\E N = \sum_{j=1}^{r}\Prob(N\ge j) = \sum_{j=1}^{r}(1 - q)^{j-1} = \frac{1 - (1 - q)^r}{q}$。当 $r\to\infty$ 时它趋于 $1/q$，与 [[#prop-retries]] 一致。
:::
:::

::: exercise 枚举值的 trie 受约束器 {level=3}
用纯 Python 实现对 `["red", "green", "grey", "blue"]` 中单个取值的受约束解码，词表用包含多字符词元的玩具词表。找一个词表，使 [[#def-constrained]] 的字符级前缀检验卡住；然后只允许"能用现有词元到达完整取值"的前缀，把它修好。
::: solution
```python
import math, random
from collections import Counter
CHOICES = ["red", "green", "grey", "blue"]
VOCAB = ["<eos>", "r", "re", "red", "g", "gr", "gre", "green", "grey", "ey", "een",
         "b", "bl", "blue", "ue", "e", "d", "n", "x"]
PREFIXES = {c[:k] for c in CHOICES for k in range(len(c) + 1)}   # character-level trie

# A prefix is live if it is a full choice or some token extends it to a live prefix.
# (Character prefixes such as "b" can be dead: no token continues "b" towards "blue".)
live = set(CHOICES)
changed = True
while changed:
    changed = False
    for p in PREFIXES - live:
        if any(p + t in live for t in VOCAB[1:]):
            live.add(p); changed = True

def allowed(prefix, check_live):
    ok_set = live if check_live else PREFIXES
    ok = [i for i, t in enumerate(VOCAB) if i > 0 and prefix + t in ok_set]
    if prefix in CHOICES: ok.append(0)                 # <eos> only after a full choice
    return ok

def generate(rng, check_live):
    out = ""
    while True:
        ids = allowed(out, check_live)
        if not ids: return "STUCK at " + repr(out)
        logits = [rng.gauss(0, 1) for _ in VOCAB]      # toy model
        i = rng.choices(ids, weights=[math.exp(logits[j]) for j in ids])[0]
        if i == 0: return out
        out += VOCAB[i]

rng = random.Random(0)
print("dead prefixes:", sorted(PREFIXES - live))
for check_live in (False, True):
    print(check_live, Counter(generate(rng, check_live) for _ in range(4000)).most_common())
```

```text
dead prefixes: ['b']
False [('green', 1220), ('red', 1106), ('blue', 775), ('grey', 519), ("STUCK at 'b'", 380)]
True [('green', 1402), ('red', 1153), ('blue', 810), ('grey', 635)]
```

这个词表有 `b` 与 `bl`，却没有 `l` 或 `lu`，所以词元 `b` 之后没有任何东西能朝 `blue` 继续：[[#prop-sound]] 的前提（每个字符都是词元）不成立，朴素的受约束器在 $4000$ 次里卡住了 $380$ 次。用定点迭代算出可继续的前缀、只允许这些前缀，每条死路就都消失了。另请注意，即便玩具模型是对称的，各个取值也不等可能：`green` 可以由许多词元路径到达，`grey` 则少得多——这正是 [[#sec-distortion]] 的扭曲的一个实例。
:::
:::

::: exercise JSON 为什么需要栈 {level=3}
证明平衡括号的语言 $\{\,\texttt{[}^n\texttt{]}^n : n\ge0\,\}$ 不被任何 DFA 识别，并推出：对嵌套无界的 JSON，受约束器不可能是一个 DFA。实际系统对许多模式只用 DFA，是怎么蒙混过关的？
::: solution
反设一个有 $k$ 个状态的 DFA 识别该语言。把 $\texttt{[}^0, \texttt{[}^1, \dots, \texttt{[}^k$ 喂给它：这是 $k + 1$ 个串，于是其中两个——$\texttt{[}^i$ 与 $\texttt{[}^j$，$i < j$——到达同一个状态。那么 $\texttt{[}^i\texttt{]}^i$ 与 $\texttt{[}^j\texttt{]}^i$ 也会停在同一个状态，因为 DFA 到达该状态之后的行为只取决于剩余输入。前者在语言中、后者不在，矛盾。JSON 含有这样的嵌套（数组的数组），所以全体 JSON 值的集合不是正则的。不过，不含递归的模式给深度设置了上界：每个嵌套的对象或数组由各自的子模式描述，而子模式只有有限多个，于是它允许的串构成正则语言、可编译成 DFA。只有递归的模式（比如带回复的评论树）才需要栈——或者给深度设上限，那又让语言回到正则。
:::
:::
