语言模型只产出文本，别的什么也做不了。它查不到今天的汇率，读不了文件，查询不了数据库，也发不出消息。然而构建在语言模型之上的助手却把这些都做了，而其机制简单得几乎令人难为情：模型写下一个简短的结构化请求——**用这些参数调用函数 `convert`**——一个普通程序读取这个请求，运行那个函数，再把结果贴回模型的上下文。模型于是继续往下走，此时它手里有了自己原本绝不可能产出的信息。这就是**函数调用**（function calling），或称**工具调用**（tool use），本课程的每一个智能体都建立在它之上。

这个想法有三个部分，本章依次展开。第一部分是**界面**：怎样向模型描述一个工具（一个名称、一段描述、一份参数模式），一次调用和一个结果长什么样，以及如何一次发出多次调用。第二部分是**运行时**：模型外围那些校验参数、执行调用、处理错误、决定提供哪些工具的代码——它是让工具调用变得可靠的部分，也是最常被忽视的部分。第三部分是**训练**：模型如何学会何时调用工具、如何填写参数——从 Toolformer 的自监督过滤，到在海量真实接口上微调，再到这一能力如何被度量。一段用普通 Python 写成的简短清单实现了工具注册表、模式（schema）校验器和分发器，让每一步都落到实处。函数调用就是模式描述函数参数的结构化输出（[[prompting-rag/structured-output]]）；模式与受约束解码依托那一章，这里不再重复。

## 工具与调用 {#sec-tools}

**工具**是程序能够代表模型做的任何事：一个纯函数（算术、单位换算）、一次只读查询（搜索、数据库查询、读文件），或一个有副作用的动作（写文件、发邮件、付款）。对模型来说，工具只是一段描述；对运行时来说，它是代码。

::: definition 工具、工具调用与工具结果 {#def-tool}
一个**工具**是一个三元组 $(n, d, S)$：唯一的**名称** $n$、一段自然语言**描述** $d$、一个**参数模式** $S$——描述参数对象的一个 JSON Schema（[[prompting-rag/structured-output#def-schema]]）——再加上一个实现 $f$，由运行时而非模型执行。**工具调用**是模型发出的结构化消息 $(\iota, n, a)$，包含一个调用标识符 $\iota$、一个工具名 $n$ 和一个参数对象 $a$。当 $n$ 是某个已提供工具的名称、且 $a$ 能通过其模式 $S$ 的校验时，这次调用称为**格式良构**。**工具结果**是一条消息 $(\iota, y)$，携带同一个标识符，内容是输出 $y = f(a)$ 或一段错误描述。
:::

一旦模型在一轮之中发出多次调用，标识符就变得要紧：结果可能以任意顺序返回，标识符告诉模型哪个结果对应哪个调用。

一次完整的交换是一段包含四种消息的简短对话。应用发送一份工具列表和到目前为止的对话；模型或回复文本（最终答案），或发出一至多次工具调用；运行时执行这些调用，并为每次调用追加一条**工具消息**；然后在扩充后的对话上再次调用模型。用与提供商无关的形式写出来，一轮大致如下：

```text
system:    You can call tools. Available: get_weather(city, unit?), convert(amount, from, to)
user:      I'm flying to Oslo with 200 euros. What's the weather and how many dollars is that?
assistant: [call c1] get_weather {"city": "Oslo"}
           [call c2] convert {"amount": 200, "from": "EUR", "to": "USD"}
tool c1:   {"temp": -3, "sky": "snow"}
tool c2:   {"result": 216.0}
assistant: It is −3 °C and snowing in Oslo; 200 euros is about 216 dollars.
```

模型被调用了两次。第一次调用产出两个工具调用，第二次产出答案。模型里没有任何东西在「运行」`get_weather`：它预测出的词元被运行时解析成了一次调用，正如它预测其他任何词元一样。不同提供商会把这些消息包在不同的 JSON 封装和特殊词元里，开放权重模型的聊天模板则用保留词元标记一次调用的起止，但结构——工具列表进、调用出、结果进、答案出——到处都一样。

::: example 模型实际看到什么 {#ex-serialised}
某模型被提供两个工具，其定义序列化进提示后分别占 $120$ 和 $95$ 个词元。上面的对话中用户消息占 $40$ 个词元；两次调用占 $35$ 个词元，两条结果占 $25$ 个。最终答案占 $30$ 个词元。假设除工具定义外的系统文本为 $60$ 个词元，两次模型调用各消耗多少输入与输出词元？
::: solution
第一次调用：输入是系统文本、工具定义和用户消息，$60 + 120 + 95 + 40 = 315$ 个词元；输出是两次调用，$35$ 个词元。第二次调用：整个对话连同调用与结果再发一遍，$315 + 35 + 25 = 375$ 个输入词元；输出 $30$ 个词元。合计输入 $690$、输出 $65$ 个词元。由此得出两条教训。工具定义在**每一次**调用上都要付费（提示缓存（[[inference/kv-cache]]）能降低重复前缀的成本，但省不下它占的空间）；而且输入随每一轮增长，这是 [[agents/memory-context]] 的主题。
:::
:::

### 把工具描述好

描述和模式是模型关于工具的全部知识，因此它们本身就是一则提示（[[prompting-rag/prompt-design]]），值得同样多的推敲。好的定义会说明工具做什么、什么时候**不要**用它，参数名不含糊（`amount_in_cents`，而不是 `amount`），在取值集合封闭之处用枚举而不是自由字符串，为可选参数标出默认值，并说明单位与格式（`"date in YYYY-MM-DD"`）。模式应收紧到实现所要求的最紧——`additionalProperties: false`、上下界、模式串——因为这样校验器就能在错误到达实现之前把它们拦下。

::: example 一个日历工具的模式 {#ex-calendar}
为 `create_event` 写一个工具定义，它向用户的日历添加一条日程。它需要一个标题、一个开始时间、一个 $5$ 到 $480$ 分钟之间的时长，以及一个至多 $20$ 个参会者邮箱地址的可选列表。
::: solution
```json
{
  "name": "create_event",
  "description": "Add an event to the user's own calendar. Use only after the user has agreed on the time. Does not send invitations.",
  "parameters": {
    "type": "object",
    "properties": {
      "title":            {"type": "string", "maxLength": 200},
      "start":            {"type": "string", "format": "date-time",
                           "description": "ISO 8601 with offset, e.g. 2026-03-02T14:00:00+01:00"},
      "duration_minutes": {"type": "integer", "minimum": 5, "maximum": 480},
      "attendees":        {"type": "array", "maxItems": 20,
                           "items": {"type": "string", "format": "email"}}
    },
    "required": ["title", "start", "duration_minutes"],
    "additionalProperties": false
  }
}
```

描述告诉模型一个前提条件（「在用户商定时间之后」）和一个非效果（「不发送邀请」），两者都会改变它**何时**调用工具。用时长而不是结束时间，消除了一类错误（结束早于开始）；显式的时区偏移消除了另一类。模式表达不了「开始时间应晚于当前」这一约束；实现必须检查它，不满足就返回一条错误信息。
:::
:::

## 校验、执行与错误 {#sec-runtime}

在模型的输出与工具的实现之间站着**运行时**：解析调用、检查调用、执行调用的那段代码。模型的调用是一个不可信的请求：它可能点名一个不存在的工具，在该放数字的地方放一个字符串，凭空造出一个字段，或者完全格式良构却仍然是错的。运行时的职责是尽力拦截，把每一次失败都变成模型能用的信息，并且绝不让一个格式不良的请求弄崩应用。

::: algorithm 执行一次工具调用 {#alg-execute}
给定一次调用 $(\iota, n, a)$ 和已提供的工具集合：
1. **解析。** 若没有名为 $n$ 的已提供工具，返回错误结果 $(\iota, \text{"不存在名为 } n\text{ 的工具"})$。
2. **校验。** 把 $a$ 对照模式 $S_n$ 校验；若有违例，把它们全部作为错误结果返回，每条附上出错字段的路径。
3. **授权。** 若工具带有需要确认的副作用、或当前上下文缺乏所需权限，停下来询问（见 [[agents/agent-security]]）。
4. **执行** $f_n(a)$，带超时。若它抛出异常或超时，返回一个错误结果，用模型能据以行动的措辞描述这次失败。
5. **返回** $(\iota, f_n(a))$，超过大小限制则截断或摘要。
:::

每个分支都向模型返回一条消息，而不是在应用里抛出异常。这是核心的设计选择：作为工具结果返回的错误，和其他观察一样只是一条观察，而模型通常很擅长读 `"$.amount: expected number, got str"` 并发出一次改正后的调用。重试的概率计算见 [[prompting-rag/structured-output#prop-retries]]；这里的区别在于，重试带着一则具体的错误信息，这通常让第二次尝试的成功率远高于第一次——也让那条命题背后的独立性假设更加站不住脚。

### 用普通 Python 写成的工具运行时

下面的清单定义了那两个工具、一个针对它们所用到的 JSON Schema 子集的校验器、确定性的替身实现，以及 [[#alg-execute]]（不含授权一步）。用一个固定脚本代替模型，发出模型可能发出的调用：第一轮并行发出两次调用，其中一次的金额是字符串；第二轮是一次修复后的调用，外加一次对工具不认识的城市的调用。

```python
import json

TOOLS = {
    "get_weather": {
        "description": "Current weather for a city.",
        "parameters": {
            "type": "object",
            "properties": {
                "city": {"type": "string"},
                "unit": {"type": "string", "enum": ["celsius", "fahrenheit"]},
            },
            "required": ["city"],
            "additionalProperties": False,
        },
    },
    "convert": {
        "description": "Convert an amount between currencies.",
        "parameters": {
            "type": "object",
            "properties": {
                "amount": {"type": "number", "minimum": 0},
                "from": {"type": "string", "enum": ["EUR", "GBP", "USD"]},
                "to": {"type": "string", "enum": ["EUR", "GBP", "USD"]},
            },
            "required": ["amount", "from", "to"],
            "additionalProperties": False,
        },
    },
}

TYPES = {"string": str, "number": (int, float), "integer": int,
         "boolean": bool, "object": dict}

def validate(value, schema, path="$"):
    """返回错误消息列表（若值通过校验则为空）。"""
    errs = []
    t = schema.get("type")
    if t and not (isinstance(value, TYPES[t]) and not
                  (t in ("number", "integer") and isinstance(value, bool))):
        return [f"{path}: expected {t}, got {type(value).__name__}"]
    if "enum" in schema and value not in schema["enum"]:
        errs.append(f"{path}: {value!r} not in {schema['enum']}")
    if "minimum" in schema and value < schema["minimum"]:
        errs.append(f"{path}: {value} < minimum {schema['minimum']}")
    if t == "object":
        props = schema.get("properties", {})
        for k in schema.get("required", []):
            if k not in value:
                errs.append(f"{path}: missing required field {k!r}")
        for k, v in value.items():
            if k in props:
                errs += validate(v, props[k], f"{path}.{k}")
            elif schema.get("additionalProperties") is False:
                errs.append(f"{path}: unexpected field {k!r}")
    return errs

# 确定性的实现（真实系统会去调用服务）。
WEATHER = {"Oslo": (-3, "snow"), "Lisbon": (17, "sun")}
RATES = {("EUR", "USD"): 1.08, ("GBP", "EUR"): 1.17}
def get_weather(city, unit="celsius"):
    if city not in WEATHER:
        raise KeyError(f"unknown city {city!r}")
    c, sky = WEATHER[city]
    return {"temp": c if unit == "celsius" else round(c * 9 / 5 + 32), "sky": sky}
def convert(amount, to, **kw):
    return {"result": round(amount * RATES[(kw["from"], to)], 2)}
IMPL = {"get_weather": get_weather, "convert": convert}

def execute(call):
    """校验模型的工具调用，运行它，返回一条工具结果消息。"""
    name, args = call["name"], call["arguments"]
    if name not in TOOLS:
        return {"id": call["id"], "error": f"no tool named {name!r}"}
    errs = validate(args, TOOLS[name]["parameters"])
    if errs:
        return {"id": call["id"], "error": "; ".join(errs)}
    try:
        return {"id": call["id"], "content": IMPL[name](**args)}
    except Exception as e:                       # 工具失败 -> 返回消息，而不是崩溃
        return {"id": call["id"], "error": f"{type(e).__name__}: {e}"}

# 模型的脚本化替身：第一轮并行发出两次调用，其中一次参数格式不良；
# 第二轮读到错误后把它修复。
SCRIPT = [
    [{"id": "c1", "name": "get_weather", "arguments": {"city": "Oslo"}},
     {"id": "c2", "name": "convert",
      "arguments": {"amount": "200", "from": "EUR", "to": "USD"}}],
    [{"id": "c3", "name": "convert",
      "arguments": {"amount": 200, "from": "EUR", "to": "USD"}},
     {"id": "c4", "name": "get_weather", "arguments": {"city": "Bergen"}}],
]
for turn, calls in enumerate(SCRIPT, 1):
    for call in calls:
        print(turn, json.dumps(execute(call)))
print(validate({"city": "Oslo", "units": "C", "unit": "kelvin"},
               TOOLS["get_weather"]["parameters"]))
```

```text
1 {"id": "c1", "content": {"temp": -3, "sky": "snow"}}
1 {"id": "c2", "error": "$.amount: expected number, got str"}
2 {"id": "c3", "content": {"result": 216.0}}
2 {"id": "c4", "error": "KeyError: \"unknown city 'Bergen'\""}
["$: unexpected field 'units'", "$.unit: 'kelvin' not in ['celsius', 'fahrenheit']"]
```

三种失败都出现了，而且三种都变成了消息：执行前被拦下的模式违例（`c2`）、被异常处理器接住的实现失败（`c4`）、以及最后一行里一并报出的两处违例，使一次重试就能都修好。注意 `validate` 里把布尔值从 `number` 中排除的检查：在 Python 里 `True` 是 `int` 的实例，忘了这一点的校验器会接受 `{"amount": true}`。JSON Schema 本身把布尔值和数字当作不同的类型。

清单没有使用受约束解码。如果配上模式约束的解码器（[[prompting-rag/structured-output#def-constrained]]），`c2` 里的 `"200"` 根本不可能被生成；许多推理服务为工具参数提供这样的「严格」模式。校验仍然是必需的——对约束器不支持的那部分 JSON Schema、对来自没有此功能的模型或服务的调用，而且因为一次格式正确的调用的**内容**仍然可能是错的。

::: warning 格式正确的调用不等于正确的调用
模式校验检查的是形状，不是意图。`convert {"amount": 200, "from": "USD", "to": "EUR"}` 能通过一切检查，答的却是错的问题。为函数调用评分的基准会区分这些错误（选错工具、参数值错、在不需要调用时发起调用），其中语义类错误最常见。能在实现里检查的就检查——未来的日期、属于当前用户的账户——而对要紧的动作，在调用运行之前拿给用户看。
:::

### 错误、重试与副作用

与网络打交道的工具会暂时性失败：超时、限流、短暂的中断。标准对策比语言模型更老，即带**指数退避**（exponential backoff）的重试——先等 $w_0$ 秒，再 $2w_0$，再 $4w_0$，直到某个上限——并加一点随机抖动，免得众多客户端步调一致地同时重试。运行时是悄悄重试，还是把失败报告给模型，是一个设计选择：暂时性的基础设施错误最好由运行时重试，因为只有它知道那是暂时的；模型造成的错误，比如参数非法或记录不存在，则属于工具结果，模型才纠正得了。

只有对**幂等**操作，重试才是安全的——其重复执行与只执行一次效果相同的操作。读文件是幂等的；往文件里追加不是；「给卡扣 \$50」尤其不是。一笔付款请求超时时，运行时无法知道扣款成功没有，盲目重试可能扣两次。补救办法在分布式系统里同样是标准做法——**幂等键**：运行时为每个逻辑操作生成一个唯一的键，随每次尝试一同发送，服务对同一个键至多执行一次。既然模型也可能重新发出它以为失败了的调用，键应当挂在模型的调用标识符上，而不是挂在单次网络尝试上。

::: example 重试策略的最坏情况延迟 {#ex-backoff}
一个搜索工具在 $4$ s 后超时。运行时至多重试 $3$ 次，退避等待为 $0.5$、$1$ 和 $2$ s。在一次工具调用向模型报错之前，它最长可能耗时多久？若每次尝试都以 $0.1$ 的概率独立失败，整个调用彻底失败的概率是多少？
::: solution
四次至多 $4$ s 的尝试加三段等待：$4\cdot4 + (0.5 + 1 + 2) = 16 + 3.5 = 19.5$ s。四次尝试全部失败的概率是 $0.1^4 = 10^{-4}$。对智能体而言，要紧的数字是延迟：一个要发起三十次工具调用的循环，最坏情况可能花上十分钟干等，所以长程智能体既需要单次调用的限额，也需要整体的时间预算。
:::
:::

## 并行调用 {#sec-parallel}

当一个请求需要若干相互独立的信息——三个城市的天气、四个文件的内容——模型可以在一轮里发出多次调用，运行时则可以让它们并发执行。这种**并行函数调用**既省模型调用（一轮代替数轮），又省墙钟时间（调用彼此重叠）。相互依赖的调用无法并行：要换算一个价格，模型必须先查出它。这一结构是一个有向无环图。

::: definition 调用图与轮 {#def-call-graph}
一个任务的**调用图**是一个有向无环图 $G = (V, E)$，其顶点是任务需要的各次工具调用，边 $u\to v$ 表示 $v$ 的参数依赖 $u$ 的结果。**按轮调度**给每次调用 $v$ 指派一个轮次 $\rho(v)\in\{1, 2, \dots\}$，使得对每条边 $u\to v$ 都有 $\rho(u) < \rho(v)$；同一轮的所有调用在模型的一轮之中一起发出。
:::

::: proposition 轮数的最小值 {#prop-rounds}
所有调度中所需轮数的最小值等于 $G$ 上一条最长路径上的顶点数。若调用 $v$ 耗时 $t_v$，且同一轮内的调用并发执行，那么在所有「输入就绪即执行」的方式中，最小总执行时间是各条有向路径 $P$ 上和式 $\sum_{v\in P}t_v$ 的最大值——即**关键路径**的长度。
:::

::: proof
**下界。** 沿一条路径 $v_1\to v_2\to\dots\to v_m$，调度必须满足 $\rho(v_1) < \rho(v_2) < \dots < \rho(v_m)$，因此至少要占用 $m$ 个不同的轮次。**上界。** 把 $\rho(v)$ 定义为以 $v$ 结束的最长路径上的顶点数。因为 $G$ 无环，这是良定义的；而对一条边 $u\to v$，任何以 $u$ 结束的最长路径都能延伸为一条以 $v$ 结束的路径，故 $\rho(v)\ge\rho(u) + 1$。这样得到的调度是合法的，且其最大轮次就是最长路径上的顶点数。关于时间的结论同理：一次调用在其每个前驱完成之前不能开始，所以沿一条路径，完成时刻至少是各 $t_v$ 的部分和；反过来，让每次调用在前驱一完成就开始，沿拓扑序归纳可知 $v$ 的完成时刻恰等于以 $v$ 结束的最大路径和。
:::

::: widget graph
nodes: flights@0,2; hotel@0,0; weather@0,1; price@1,2; convert@2,2; budget@3,1
edges: flights>price; price>convert; convert>budget; hotel>budget; weather>budget
algorithm: topo
start: flights
caption: 一个出行请求的调用图：查航班、查酒店、查天气（相互独立），再取所选航班的价格、做汇率换算，最后综合全部信息算预算。沿拓扑序一步步执行。最长路径 flights → price → convert → budget 有四个顶点，所以由 [[#prop-rounds]]，既需要且只需要四轮：{flights, hotel, weather}、{price}、{convert}、{budget}。若每轮只发一次调用，则要六轮。
:::

::: example 轮数与延迟 {#ex-rounds}
在图中的调用图里，每次查找（flights、hotel、weather、price）耗时 $1.2$ s，`convert` 耗时 $0.2$ s，`budget` 耗时 $0.1$ s，而每一轮模型生成另加 $2$ s。比较「每轮一次调用」与「按轮调度」。
::: solution
每轮一次调用：六轮，生成耗时 $6\cdot2 = 12$ s，执行耗时 $4\cdot1.2 + 0.2 + 0.1 = 5.1$ s，合计 $17.1$ s，再加上产出答案的最后一轮（$2$ s），共 $19.1$ s。按轮调度：四轮，生成 $8$ s；每轮执行取其中最慢的调用，$1.2 + 1.2 + 0.2 + 0.1 = 2.7$ s；加上最后一轮，$8 + 2.7 + 2 = 12.7$ s。关键路径占主导地位，进一步的提速必须去缩短它——例如让工具在返回搜索结果时就附上航班的价格。
:::
:::

并行调用有可靠性的代价。一轮必须产出 $m$ 次正确的调用，只有它们全部正确，这一轮才算成功。

::: proposition 全部调用都正确 {#prop-all-correct}
若一个任务中 $m$ 次调用各自以概率 $q$ 独立正确，则全部正确的概率为 $q^m$，错误调用次数的期望为 $m(1 - q)$。当 $q$ 接近 $1$ 时，$q^m\approx 1 - m(1 - q)$。
:::

::: proof
独立性给出乘积 $q^m$；期望的线性性给出 $\E[\#\text{错误}] = \sum_{i=1}^{m}(1 - q)$。近似式是二项展开 $(1 - \varepsilon)^m = 1 - m\varepsilon + \binom{m}{2}\varepsilon^2 - \dots$ 的前两项，其中 $\varepsilon = 1 - q$，在 $m\varepsilon\ll1$ 时准确。
:::

::: widget plot
f: q^x; 1 - x*(1 - q)
x: 1, 30
y: 0, 1.02
sliders: q=0.97:0.8:0.999:0.001
labels: 全部 $m$ 次调用都正确 $q^m$; 线性近似 $1 - m(1-q)$
points: 5,0.8587; 20,0.5438
caption: $m$ 次独立调用全部正确的概率随 $m$ 的变化。$q = 0.97$ 时，五次调用一起成功的比例为 $86\%$，二十次只剩 $54\%$。当 $m(1 - q)$ 很小时，线性近似很好。同样的算术用在步骤而非并行调用上，支配的正是智能体循环（[[agents/agent-loops]]）。
:::

## 在大量工具之间选择 {#sec-selection}

只有两个工具时，模型很少选错。有二百个工具时——公司内部服务的每一个端点——模型面对的是一个实实在在的检索问题，而且光是这些定义就可能占掉其上下文的大半。

::: example 工具目录的上下文成本 {#ex-catalogue}
一个应用提供 $150$ 个工具，其定义平均 $220$ 个词元。模型的上下文窗口是 $128{,}000$ 个词元。这些定义占窗口的多大比例？若一个检索器为每个请求挑出最相关的 $8$ 个工具，每次调用省下多少？又引入了什么新的失败？
::: solution
$150\cdot220 = 33{,}000$ 个词元，占窗口的 $33{,}000/128{,}000 = 25.8\%$，而且每次调用都要付费。八个工具占 $8\cdot220 = 1{,}760$ 个词元，每次调用省下 $31{,}240$ 个词元。新的失败是检索落空：若对的工具不在八个里，模型就调不到它，反而可能调一个差一点的工具。于是检索器的前 $8$ 召回率（[[prompting-rag/rag-evaluation]]）成了整个系统准确率的上限。
:::
:::

用请求与工具描述之间的嵌入相似度来检索工具（[[prompting-rag/text-embeddings]]）是最常见的补救；此外还有层次式菜单（模型先选类别，再在类别内选工具）、能列出或搜索其他工具的工具，以及把许多窄工具合并成少数带枚举 `action` 参数的宽工具。每一种都拿上下文换回一个可能出错的额外决定。

是否调用工具的决定，与在工具之间选择同样重要。被问「挪威的首都是哪里？」却去调用 `get_weather` 的模型浪费一轮；凭记忆回答今天的汇率、不调用 `convert` 的模型给出的则是过期或编造的数字。因此评测会包含**相关性检测**：对所提供的工具都不适用的请求，正确的行为是直接回答，或说明此事办不了。

## 训练模型调用工具 {#sec-training}

最早使用工具的语言模型是靠几条调用示范来提示的。指令微调的模型（[[post-training/instruction-tuning]]）一旦其微调数据里出现工具调用，使用工具就更可靠；截至 2026 年，多数聊天模型都经过了微调，并常常在含有工具定义、调用与结果的记录（按模型的聊天模板排版）上以强化学习（[[post-training/rl-for-language-models]]）进一步训练。2023 年的两篇论文标记了其中的主要思想。

### Toolformer：学会何时调用有帮助

Schick 等（2023）问道：模型能不能*自己*学会用工具——每个工具只有寥寥几条人写的示范。他们的 **Toolformer** 用了一个计算器、一个日历、一个问答系统、一个维基百科搜索引擎和一个机器翻译系统。关键思想是一个自监督过滤器：若一个调用的结果能让后续文本变得更可预测，它就值得留在训练数据里。

::: definition Toolformer 过滤器 {#def-toolformer}
取一段文本 $x = (x_1, \dots, x_T)$ 和一个候选 API 调用 $c$——由模型自己采样——在位置 $i$ 处插入，其结果为 $r$。设 $L_i(z)$ 为在位置 $i$ 之前插入前缀 $z$ 之后，模型在词元 $x_i, x_{i+1}, \dots$ 上的加权交叉熵，权重随与 $i$ 的距离衰减。比较
$$
L_i^{+} = L_i\big(e(c, r)\big), \qquad L_i^{-} = \min\big(L_i(\varepsilon),\ L_i(e(c, \varepsilon))\big),
$$
其中 $e(c, r)$ 是连同其结果一起写出的调用，$e(c, \varepsilon)$ 是不带结果的调用，$\varepsilon$ 是空序列。若 $L_i^{-} - L_i^{+}\ge\tau_f$（$\tau_f$ 为阈值），就保留这个调用。然后在原文本中插入被保留的调用与结果，对模型做微调。
:::

$L_i^{-}$ 中的最小值正是过滤器诚实的地方。一个调用只因它的**结果**记功：它必须同时胜过完全不调用、以及不带结果的光杆调用（后者可能只是因为暗示了答案才显得有帮助）。

::: example 应用过滤器 {#ex-toolformer}
在文本「1400 名参与者中，400 人（占 29%）通过了测试」中，一个候选调用 `Calculator(400 / 1400)` 插在「29%」之前，结果为 `0.29`。续写的加权损失为：不调用 $L_i(\varepsilon) = 2.10$；不带结果的调用 $L_i(e(c, \varepsilon)) = 1.95$；带结果的调用 $L_i(e(c, r)) = 0.40$。当 $\tau_f = 1.0$ 时，这个调用会被保留吗？若结果换成 `0.2857142857`、带结果的损失为 $1.20$ 呢？
::: solution
$L_i^{-} = \min(2.10, 1.95) = 1.95$ 而 $L_i^{+} = 0.40$，增益为 $1.55\ge1.0$：保留。第二种情形的增益是 $1.95 - 1.20 = 0.75 < 1.0$：拒绝——尽管这个调用在算术上是对的，它的结果按那种格式写出来，并没有让文本「29%」变得可预测多少。过滤器选出的是在该位置上**对语言模型有用**的调用，这与正确的调用并不总是一回事。
:::
:::

Schick 等报告：一个 $67$ 亿参数的模型这样微调后，在零样本算术、事实问答与时间类问题上大幅改进，并在其中若干项上胜过远大于它的 GPT-3，而语言建模能力并未受损。这个方法的局限也有启发性：它每个位置至多插入一个调用，无法串联调用（把一个工具的输出作为另一个工具的输入），也不让模型交互式地对结果作出反应。而这些正是智能体循环（[[agents/agent-loops]]）补上的能力。

### 学习真实接口

计算器只有一个参数；真实接口有几十个参数，有版本、有必须搭配的参数组合、还有会变动的文档。Patil 等（2023）构建了 **Gorilla**：一个基于 LLaMA 的模型，微调后能对来自三个公共模型中心的约 $1{,}600$ 个机器学习 API 写出调用（其基准为 APIBench）；训练时在提示中放入检索来的文档，使模型学会的是遵循文档而不是背诵文档。他们度量**幻觉调用**——调用不存在的 API——办法是把生成调用的抽象语法树与真实 API 数据库做匹配，并发现带检索的训练减少了幻觉调用。Qin 等（2024，2023 年首发）从一个公共 API 市场收集了一万六千多个真实 REST API，构建 **ToolBench**，生成了需要多次调用的多步指令，并在深度优先搜索找出的调用序列解上微调了一个开放模型（ToolLLaMA）；他们用模型评分的通过率做评测。同一思想在更大规模上的再现——在真实或模拟接口上生成合成任务、用执行结果过滤解——支撑了后来大多数的工具调用训练数据。

### 度量工具调用

一次工具调用可以用两种方式评分，基准两者都用。

- **结构匹配**把生成的调用与参考调用比较：同一个工具、必填参数齐全、每个取值与参考相等（或落在参考可接受的取值之中）。它不需要执行，因而能覆盖无法安全调用的接口，但一条不同却能奏效的调用得不到分。
- **可执行评测**运行这次调用——对真实服务、录制的响应或模拟器——并检查结果。它对任何正确的调用都给分，但需要一个可用的环境。

Gorilla 团队发布的伯克利函数调用排行榜（Berkeley Function Calling Leaderboard，2024 年首发）普及了一套为后来多数评测沿用的分类法：**simple**（一个工具、一次调用）、**multiple**（在多个工具中选一个）、**parallel**（一轮中对同一工具发起多次调用）、**parallel multiple**（一轮中对多个工具发起多次调用）、**relevance**（没有工具适用），后来又扩展到多轮对话。截至 2026 年，最好的模型在单一、界定清楚的调用上得分很高，而在信息缺失或工具列表很长的多轮任务上要明显差一些。具体分数变得太快，不值得引用；这些类别才是持久的部分。

::: quiz
一个能访问 `search_orders(customer_id)` 工具的模型，被一个它不知道客户标识符的用户问道：「我的订单到哪了？」最佳行为是什么？
- [ ] 用一个看起来合理的标识符调用 `search_orders`，让用户尽快得到答案。
- [ ] 用一个空字符串调用 `search_orders`，因为模式要求这个字段。
- [x] 向用户索要标识符（或调用一个能从会话中取出它的工具），之后再调用 `search_orders`。
- [ ] 回答订单已经在路上，因为多数订单都是。
::: solution
编造的参数会产生一次格式正确的调用，返回的是另一个客户的订单——或什么都没有——这是任何校验器都拦不住的语义错误，还可能是一次隐私泄露。空字符串会在校验或实现处失败。不调用工具就作答是编造。缺少必填信息正是提问的理由，多轮函数调用评测考的恰恰是这个。
:::
:::

## 连接模型与工具的协议 {#sec-protocols}

每个给模型提供工具的应用都必须描述这些工具、把调用路由给它们、再返回结果。当每个应用都按自己的方式来一遍时，每个工具就必须在每个应用那里重新集成一次。有两个发展把接口标准化了，两者最好都当作技术而不是产品来理解。

**模型 API 中用模式描述的工具。** 自 2023 年 6 月起，托管模型 API 开始接受用 JSON Schema 描述的函数列表，并把调用作为结构化对象（而非待解析的文本）返回；2023 年晚些时候又有了并行调用；截至 2026 年，这套调用约定——各提供商之间、以及开放权重聊天模板中有细微差别——已近乎通用。这一约定固定的是 [[#def-tool]] 的消息结构，而不是任何工具做什么。

**客户端–服务器工具协议。** **模型上下文协议**（Model Context Protocol，MCP）由 Anthropic 于 2024 年 11 月作为开放规范发布，把工具的提供方与使用它的应用分开。**服务器**暴露三类能力——**工具**（带 JSON Schema 输入的函数）、**资源**（应用可以读入上下文的数据）与**提示**（模板）；宿主应用内的**客户端**在运行时发现它们、把清单展示给模型、并转发调用。消息是 JSON-RPC 2.0，本地服务器经由标准输入输出承载，远程服务器经由 HTTP 承载。收益是任何协议都带来过的那个众所周知的收益：$a$ 个应用和 $b$ 个工具提供方需要 $a + b$ 份实现，而不是 $a\cdot b$ 份集成。2025 年间，其他模型提供商、开发工具和开源项目广泛采用了 MCP；2025 年 12 月，其管理权移交至一个由 Linux 基金会托管的基金会。它只是这种模式的一个例子；其他协议处理的是智能体**之间**的通信（[[agents/multi-agent-systems]]）。

一个允许应用在运行时从第三方加载工具的协议，也会把它们的描述加载进模型的上下文，而这些描述是模型可能照做的文本。工具描述和工具结果一样，是不可信的输入——间接提示注入（[[prompting-rag/prompt-design#def-injection]]）的根源所在，[[agents/agent-security]] 会回到这个话题。

::: example 有协议与无协议下的集成 {#ex-protocol}
某组织使用 $6$ 个嵌入了模型的应用（一个聊天助手、两个编程工具、一个客服机器人、一个文档编辑器、一个数据笔记本），并希望每个应用都能访问同样 $14$ 个内部系统。没有共享协议时需要多少份集成？有协议时需要多少个组件？
::: solution
没有协议时，每个应用集成每个系统：$6\cdot14 = 84$ 份集成，每份都要维护。有协议时，每个应用只需实现一次客户端、每个系统只需实现一次服务器：$6 + 14 = 20$ 个组件。节省随两个数字一起增长；代价是每个服务器的描述与结果如今会进入每个应用的模型，于是权限必须按服务器、按应用来管理，而不是按集成来管理。
:::
:::

::: application 实践中工具调用出错的地方
在部署系统里见到的失败模式大多平平无奇：描述重叠、模型分不清的工具；没有覆盖某个真实情形的枚举，于是模型挑一个最接近的错误取值；对上下文而言太大的结果（一次返回一万行的数据库查询），运行时必须分页或摘要；时区与单位；以及错误含混不清的工具（`"500 Internal Server Error"`），模型因此没法纠正自己的调用。多数修复在工具定义和运行时里，不在模型里。
:::

::: history
语言模型把任务委托给外部模块的想法，比函数调用 API 更老。Karpas 等（2022）提出 MRKL 架构，由语言模型把查询路由给计算器一类的专家模块；Parisi 等（2022）用迭代自博弈训练了工具增强模型（TALM）；Gao 等（2022）让模型写 Python 交给解释器执行（PAL）；Nakano 等（2021）训练 WebGPT 发出搜索与浏览命令。Schick 等（2023）用 Toolformer 证明模型能靠自监督过滤器自己选出有用的调用。带 JSON Schema 定义的函数调用于 2023 年 6 月进入托管模型 API，同年晚些时候有了并行调用。Patil 等（2023，Gorilla）与 Qin 等（ToolLLM 与 ToolBench，2023；ICLR 2024）把工具调用扩展到数千个真实 API，带来了这些基准和幻觉调用问题；伯克利函数调用排行榜（2024）把评测类别标准化了。Anthropic 于 2024 年 11 月发布模型上下文协议；它在 2025 年被广泛采用，并于 2025 年 12 月移交到一个开放的基金会。
:::

::: summary
- 工具是模型看到的名称、描述与参数模式，加上由应用运行的实现；调用是一条指明工具及其参数的结构化消息，结果以同一个标识符返回给模型。
- 模型只预测调用；运行时负责解析、校验、授权与执行，并把每一次失败变成模型读得懂的工具结果，而不是异常。
- 校验检查形状而非含义；语义错误（选错工具、值错、编造参数）最常见，需要实现中的检查或人来确认。
- 暂时性故障用指数退避重试，但只对幂等操作——或者使用挂在调用上的幂等键。
- 独立的调用可以并行发出；所需轮数的最小值是调用图最长路径上的顶点数，而 $m$ 次调用全部正确的概率是 $q^m$。
- 大型工具目录既费上下文又招来混乱；工具检索用检索落空换掉这笔账。
- Toolformer 保留那些结果能降低后续文本损失的自生成调用；后续工作在数千个真实 API 上训练并度量幻觉调用；基准按结构或按执行给调用评分。
- 协议——JSON Schema 调用约定（2023）与模型上下文协议（2024 年 11 月）——把接口标准化；工具描述与结果仍属不可信输入。
:::

## 习题

::: exercise 一轮中的五次调用 {level=1 check="0.859"}
模型发出 $5$ 次并行调用，每次独立地以 $0.97$ 的概率正确。五次全部正确的概率是多少？保留三位小数。
::: solution
$0.97^5 = 0.8587$，保留三位小数为 $0.859$（[[#prop-all-correct]]）。线性近似 $1 - 5\cdot0.03 = 0.85$ 与之很接近。
:::
:::

::: exercise 窗口中的定义 {level=1 check="0.225"}
某助手提供 $40$ 个工具，其定义平均 $180$ 个词元，上下文窗口为 $32{,}000$ 个词元。这些定义占窗口的多大比例？保留三位小数。
::: solution
$40\cdot180 = 7{,}200$ 个词元；$7{,}200/32{,}000 = 0.225$——用户还没开口，近四分之一的窗口已被占用。
:::
:::

::: exercise 退避等待 {level=1 check="15.5"}
某运行时对失败的调用至多重试 $5$ 次，第一次重试前等 $0.5$ s，其后每次把等待时间翻倍。若用满全部重试，总等待时间是多少秒？
::: solution
$0.5 + 1 + 2 + 4 + 8 = 0.5\,(2^5 - 1) = 15.5$ s，由等比求和 $\sum_{j=0}^{4}0.5\cdot2^j$。
:::
:::

::: exercise 一个研究任务的轮数 {level=2 check="4"}
一个研究请求需要这些调用：搜索网络（A）并搜索内部 wiki（B）；抓取 A 找到的两个页面（C、D）和 B 找到的一个页面（E）；从 C 和 E 中提取数字（F）；再根据 D 和 F 写一份摘要（G）。画出调用图并求最少轮数。
::: solution
边：$A\to C$、$A\to D$、$B\to E$、$C\to F$、$E\to F$、$D\to G$、$F\to G$。最长路径：$A\to C\to F\to G$ 与 $B\to E\to F\to G$，各含 $4$ 个顶点。由 [[#prop-rounds]]，最少 $4$ 轮：$\{A, B\}$、$\{C, D, E\}$、$\{F\}$、$\{G\}$。
:::
:::

::: exercise 应用 Toolformer 过滤器 {level=2}
对某个候选搜索调用，续写的加权损失为 $L_i(\varepsilon) = 3.0$、$L_i(e(c, \varepsilon)) = 2.2$、$L_i(e(c, r)) = 1.6$。当 $\tau_f = 1.0$ 时，这个调用会被保留吗？解释：若过滤器只与不调用的损失比较，它本会被保留，而为什么那样是错的。
::: solution
$L_i^{-} = \min(3.0, 2.2) = 2.2$，增益为 $2.2 - 1.6 = 0.6 < 1.0$：拒绝。若只与不调用比较，增益将是 $3.0 - 1.6 = 1.4$，调用就会被保留。但其中大部分（$3.0 - 2.2 = 0.8$）来自调用文本本身——查询词让续写更可预测，无论搜索返回什么。用这样的调用训练，会教模型发出结果无所谓的调用。取最小值，才是把功劳只记在结果带来的改进上。
:::
:::

::: exercise 并行调用的期望延迟 {level=2 check="1.5"}
一轮发出 $3$ 次并行调用，延迟相互独立，均匀分布在 $0$ 到 $2$ s 之间。这一轮要等齐全部调用。期望等待时间是多少秒？（提示：$[0, 1]$ 上 $m$ 个独立均匀变量之最大值的期望为 $m/(m + 1)$。）
::: solution
$[0, 2]$ 上三个均匀变量之最大值是 $[0, 1]$ 上三个之最大值的 $2$ 倍，故其期望为 $2\cdot\frac34 = 1.5$ s，而单次调用的平均延迟是 $1$ s。$m$ 次调用时为 $2m/(m + 1)$，趋于最大值 $2$ s：等齐很多次调用里最慢的一个，起作用的是延迟分布的尾部，不是均值。（提示由 $\Prob(\max\le x) = x^m$ 得出：密度为 $mx^{m-1}$，$\E\max = \int_0^1 x\cdot mx^{m-1}\,dx = m/(m+1)$。）
:::
:::

::: exercise 扩展校验器 {level=2}
把清单中的 `validate` 扩展到支持 `integer`（拒绝 `2.5` 和布尔值）、带 `items`、`minItems` 与 `maxItems` 的 `array`，以及 `maximum`。用 [[#ex-calendar]] 的模式（忽略 `format` 和 `maxLength`）测试它：时长取 $500$，参会者取 $21$ 人。
::: solution
```python
def validate(value, schema, path="$"):
    errs, t = [], schema.get("type")
    ok = {"string": lambda v: isinstance(v, str),
          "number": lambda v: isinstance(v, (int, float)) and not isinstance(v, bool),
          "integer": lambda v: isinstance(v, int) and not isinstance(v, bool),
          "boolean": lambda v: isinstance(v, bool),
          "array": lambda v: isinstance(v, list),
          "object": lambda v: isinstance(v, dict)}
    if t and not ok[t](value):
        return [f"{path}: expected {t}, got {type(value).__name__}"]
    if "enum" in schema and value not in schema["enum"]:
        errs.append(f"{path}: {value!r} not in {schema['enum']}")
    if "minimum" in schema and value < schema["minimum"]:
        errs.append(f"{path}: {value} < minimum {schema['minimum']}")
    if "maximum" in schema and value > schema["maximum"]:
        errs.append(f"{path}: {value} > maximum {schema['maximum']}")
    if t == "array":
        if len(value) < schema.get("minItems", 0):
            errs.append(f"{path}: fewer than {schema['minItems']} items")
        if "maxItems" in schema and len(value) > schema["maxItems"]:
            errs.append(f"{path}: more than {schema['maxItems']} items")
        for i, v in enumerate(value):
            errs += validate(v, schema.get("items", {}), f"{path}[{i}]")
    if t == "object":
        props = schema.get("properties", {})
        errs += [f"{path}: missing required field {k!r}"
                 for k in schema.get("required", []) if k not in value]
        for k, v in value.items():
            if k in props:
                errs += validate(v, props[k], f"{path}.{k}")
            elif schema.get("additionalProperties") is False:
                errs.append(f"{path}: unexpected field {k!r}")
    return errs

S = {"type": "object",
     "properties": {"title": {"type": "string"}, "start": {"type": "string"},
                    "duration_minutes": {"type": "integer", "minimum": 5, "maximum": 480},
                    "attendees": {"type": "array", "maxItems": 20, "items": {"type": "string"}}},
     "required": ["title", "start", "duration_minutes"], "additionalProperties": False}
print(validate({"title": "Review", "start": "2026-03-02T14:00:00+01:00",
                "duration_minutes": 500, "attendees": ["a@x.org"] * 21}, S))
print(validate({"title": "Review", "start": "x", "duration_minutes": 2.5}, S))
```

```text
['$.duration_minutes: 500 > maximum 480', '$.attendees: more than 20 items']
['$.duration_minutes: expected integer, got float']
```

第一次调用的两处违例被一并报出，一次重试就能都修好；$2.5$ 被当作非整数拒绝。
:::
:::

::: exercise 幂等性 {level=2}
一个 `send_payment(to, amount)` 工具调用银行的接口，银行在负载下要 $30$ s 才响应。运行时的超时是 $10$ s，并重试两次。描述可能发生的事情，并设计工具接口与运行时行为，使得即使模型在后续轮次重新发出这个调用，付款至多发生一次。
::: solution
每次尝试在 $10$ s 后超时，而银行仍在继续处理，于是最多可能付出去三笔款；模型看到错误后，还可能再发出第四笔。补救办法：(1) 在首次收到模型的调用时生成一个幂等键，由对话和调用标识符导出，随每次尝试发送；银行对同一个键至多执行一次。(2) 把工具做成异步：`send_payment` 立即返回一个待处理付款标识符，另用一个 `payment_status(id)` 工具报告其状态，模型便无须自己重试这个副作用。(3) 对每一笔不同的付款要求用户确认，展示金额与收款人；确认绑定在这笔付款上，对同一笔付款的重复调用不会再次询问，而是返回已有的状态。(4) 运行时绝不悄悄重试非幂等调用。
:::
:::

::: exercise 带时长的关键路径 {level=3}
详细证明 [[#prop-rounds]] 中关于时间的断言：若每次调用 $v$ 在所有前驱完成后立即开始、耗时 $t_v$，则其完成时刻为 $F(v) = t_v + \max_{u\to v}F(u)$（空集上的最大值取 $0$），而整体完成时间 $\max_vF(v)$ 等于最大路径和。再举一个例子说明：把调用归进模型的轮次会令总执行时间严格大于关键路径。
::: solution
把顶点按拓扑序排列并归纳。对源点，$F(v) = t_v$，即单顶点路径之和。若断言对 $v$ 的所有前驱成立，则 $F(v) = t_v + \max_{u\to v}\max_{P\text{ 以 }u\text{ 结束}}\sum_{w\in P}t_w$，这正是以 $v$ 结束的路径上路径和的最大值，因为任何长度超过一的此类路径，都是以某个前驱结束的路径再接上 $v$。对一切 $v$ 取最大即得全局最大路径和；任何调度都不可能更好，因为沿任何一条路径，每次调用都必须等前一次完成。有了轮次，第 $k + 1$ 轮中的调用要等第 $k$ 轮**全部**调用完成，而不只是它自己的前驱。例：$A\to B$，$t_A = 1$，$t_B = 1$，另有一次独立调用 $C$，$t_C = 2$，把 $C$ 与 $A$ 同放第 $1$ 轮。关键路径为 $\max(1 + 1, 2) = 2$，但轮次给出 $\max(t_A, t_C) + t_B = 2 + 1 = 3$。把 $C$ 改放第 $2$ 轮与 $B$ 同轮，也得 $1 + \max(1, 2) = 3$。轮次是同步点；一个结果一到就把它喂给模型的异步运行时可以逼近关键路径，代价是更多的模型调用。
:::
:::

::: exercise 工具选择的错误预算 {level=3 check="0.812"}
某系统先为每个请求检索 $8$ 个工具，召回率 $0.95$（对的工具在其中的情况占 $95\%$）。给定对的工具在候选之中，模型以概率 $0.90$ 选中它，并以概率 $0.95$ 正确填写其参数。一个请求产生完全正确的调用的概率是多少？保留三位小数。你会先改进哪个环节？怎么查？
::: solution
$0.95\cdot0.90\cdot0.95 = 0.81225$，即 $0.812$。要点在分解：$18.8\%$ 的失败请求中，检索处丢 $5$ 个百分点，选择处丢 $0.95\cdot0.10 = 9.5$ 个，参数处丢 $0.95\cdot0.90\cdot0.05 = 4.3$ 个。选择处最大，所以先改工具描述或候选清单。查法是：在有标注的样本上分段记录——对的工具被检索到了吗、被选中了吗、调用对了吗——而不是只测端到端成功率，后者分不清各环节。
:::
:::
