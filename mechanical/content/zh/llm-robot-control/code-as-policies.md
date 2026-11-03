“把红色方块在蓝碗前面排成一排，间隔五厘米。”[[llm-robot-control/grounded-task-planning]]里那种技能规划器，只有在有人写过`make_row`技能的情况下才能处理这句话。给机器人编程的人会写四行：找到碗，找到红色方块，为每个方块算出一个目标，然后循环调用pick和place。语言模型写这样的代码行很溜，而这个观察正是**Code as Policies**（代码即策略）的基础：模型不从技能菜单里挑，而是针对机器人API写一个短程序，而程序——带着循环、算术和条件判断——就是策略。本章说明如何设计API使生成的代码既短又便于检查、如何为它写提示词、生成的代码长什么样，以及最要紧的：在不信任模型所写代码的前提下如何运行它——静态检查、受限命名空间、进程隔离与超时、一次记录预期动作的试运行，以及在任何运动到达机械臂之前的限值检查。写代码智能体的通用技术见LLM图谱的[代码生成与执行](/learn/llm/lesson.php?c=agents&l=code-agents)章；这里我们把它们专门化到一台会动的机器上。

## 为什么用代码？ {#sec-why-code}

有三类指令，作为技能序列很别扭，作为程序很自然。

- **算术与空间模式。**“间隔五厘米的一排”“30 mm间距的4 × 3网格”“两个夹具的正中间”“把它转90度”。这些数字必须由感知到的位姿算出来，而程序能精确地算出来。
- **对感知结果的迭代。**“每个红色方块”“所有还没拧过的螺钉”“直到托盘装满”。步数在计划写下之时并不知道。
- **条件判断。**“如果零件是底朝上的，先把它翻过来”，“有划痕的就跳过”。

最初的**Code as Policies**工作（Liang等，2022）表明：给一个语言模型少量“指令与实现它的代码”的示例作提示，它就能为桌面操作、绘画和移动机器人生成前所未有的程序，其中包括空间几何推理（“稍微往左一点”“离碗最近的那个角”），模型通过调用数值库来表达它们。

::: definition Code-as-policy {#def-cap}
**Code-as-policy**（原论文中称作*语言模型程序*）是由语言模型根据一条指令和一份提示词生成的程序$P$，它调用一组固定的机器人API$\mathcal A$，其中是感知与动作函数。执行$P$把经感知调用获得的观测映射为经动作调用发出的动作；因此这个程序就是一个策略。模型从不直接发出动作；对世界的一切影响都经由$\mathcal A$的某个函数。
:::

定义的最后这句话，正是该方法安全到可以使用的理由：API是一切效果通过的细腰，于是所有检查都可以放在这里。

## 设计机器人API {#sec-api}

生成代码的质量，与其说取决于模型，不如说取决于API。为人类设计的API——几十个函数、配置对象、隐含的单位——会产出许多处可能出错的长代码。为生成而设计的API则小巧、显式，并且在该宽容的地方宽容。

::: definition 面向代码生成的机器人API {#def-api}
**面向代码生成的机器人API**是一组函数，满足
- **感知查询**返回朴素数据：带标识符、位姿和置信度的物体列表（`detect`、`get_pose`）；
- **动作**处于经验证技能的层级（`move_to`、`grasp`、`place`、`release`），绝不暴露关节力矩或原始轨迹；
- **约定只声明一次**：单位（米、弧度）、参考坐标系（机器人基坐标系，$z$向上）、位姿的含义；
- **以异常失败**：无法执行的动作抛出带可读消息的错误，而不是返回一个可能被代码忽略的状态码；
- **内置检查**：每个动作在做任何事之前，都先按机器人的限值校验自己的参数（见[[#sec-limits]]）。
:::

下面是一个为带平行夹爪和已标定RGB-D相机的桌面机械臂设计的完整小API。文档字符串就是模型会看到的文档。

```python
"""Robot API. All positions are in metres in the robot base frame:
x forward, y left, z up, origin at the base on the table surface.
Orientations: yaw in radians about z (gripper always points down)."""

from dataclasses import dataclass

@dataclass(frozen=True)
class Obj:
    id: str        # unique identifier, e.g. "red_block_2"
    name: str      # class name from the detector, e.g. "red block"
    x: float       # centre position, m
    y: float
    z: float
    yaw: float     # rad
    size: tuple    # (length, width, height), m
    score: float   # detector confidence 0..1

def detect(query: str) -> list[Obj]:
    """Objects matching a short description ("red block", "bowl"),
    sorted by confidence. Returns [] if none is found."""

def get_pose(query: str) -> Obj:
    """The single most confident object matching query.
    Raises NotFound if there is none."""

def move_to(x: float, y: float, z: float, yaw: float = 0.0, speed: float = 0.1):
    """Move the tool point in a straight line to (x, y, z), gripper down.
    speed in m/s, at most 0.25. Raises LimitError if outside the workspace."""

def grasp(obj_id: str):
    """Pick the object: approach from above, close the gripper, lift 10 cm.
    Raises GraspFailed if nothing is held afterwards."""

def place(x: float, y: float, z: float, yaw: float = 0.0):
    """Lower the held object until its base is at height z (m),
    centred at (x, y), open the gripper and retreat 10 cm."""

def release():
    """Open the gripper where it is."""

def say(text: str):
    """Report to the operator."""
```

这里的几个选择是有意为之。`grasp`拿的是物体标识符，不是位姿：模型不能为抓取编造坐标，只能引用检测器找到过的东西。`place`拿的是物体的*底部高度*而不是工具高度，模型因此不必知道物体的高度或夹爪的长度。速度有硬上限，写在文档字符串里、并在实现中强制执行。没有`set_joint_positions`，没有`set_force_limit`，没有`disable_collision_checking`：API里没有的，就调用不了。

::: warning 单位与坐标系是最常见的错误
生成的机器人代码里最常犯的错误不是逻辑，而是**单位与坐标系**：该传米的地方传了毫米，把相机坐标系里的位置当成基坐标系里的用，把度当弧度。训练数据里见过两套约定的模型会把它们混着用。在API开头把约定声明一次，处处只用这一套约定，让函数拒绝离谱的取值（$350\,\mathrm m$的位置是单位错误，不是遥远的目标），并且绝不暴露两个以不同单位接受同一物理量的函数。
:::

## 用提示词生成代码 {#sec-prompt}

提示词由四部分组成，顺序固定，好让稳定的部分可以被缓存（见[[llm-robot-control/language-and-robots#sec-latency]]）：

1. **角色与规则**：“你编写通过下面这个API控制机器人机械臂的Python。只使用API函数和内置算术。不要import模块。只输出代码。”
2. **API**及其文档字符串，与上文完全一致。
3. **示例**：三到十对“指令（作注释）与实现它的程序”，选例要展示你要的模式——对检测结果做迭代、计算偏移、处理“没有找到”、用`say`汇报。
4. **指令**，作注释，其后什么都不写：模型接着往下写代码。

一个好示例胜过任何规则。一个示例：

```python
# Instruction: put the screw in the cup.
screw = get_pose("screw")
cup = get_pose("cup")
grasp(screw.id)
place(cup.x, cup.y, cup.z + 0.01)
say("The screw is in the cup.")

# Instruction: stack all the green blocks on the yellow block.
base = get_pose("yellow block")
top = base.z + base.size[2]
for b in detect("green block"):
    grasp(b.id)
    place(base.x, base.y, top)
    top = top + b.size[2]
say("Stacked the green blocks.")
```

示例应当包含你希望被处理的那种失败情形——`detect`返回空列表时该怎么办——因为模型会模仿示例做的一切。

::: example 生成一排方块的代码 {#ex-row}
指令：“把三个红色方块在蓝碗前面排成一排，间隔五厘米。”检测器报告蓝碗在$(0.45, 0.10, 0.00)\,\mathrm m$处（碗底在桌面上），另有四个尺寸为$0.04\times0.04\times0.04\,\mathrm m$的红色方块。“在……前面”指更靠近机器人，即$x$更小。一个典型的生成程序是
```python
bowl = get_pose("blue bowl")
blocks = detect("red block")
if len(blocks) < 3:
    say(f"I can only see {len(blocks)} red blocks.")
else:
    for i, b in enumerate(blocks[:3]):
        grasp(b.id)
        place(bowl.x - 0.10, bowl.y - 0.05 + 0.05 * i, 0.0)
    say("Placed three red blocks in a row in front of the bowl.")
```
方块会放在哪里？程序是对的吗？
::: solution
目标是$x = 0.45 - 0.10 = 0.35\,\mathrm m$、$y = 0.10 - 0.05 + 0.05i$，其中$i = 0, 1, 2$，即$y = 0.05$、$0.10$、$0.15\,\mathrm m$，方块底面在桌面上（$z = 0$）。这一排以碗的$y$为中心、在其前方$10\,\mathrm{cm}$，中心间隔$5\,\mathrm{cm}$。由于方块宽$4\,\mathrm{cm}$，相邻方块间的缝隙只有$1\,\mathrm{cm}$——对指厚可能有$1\,\mathrm{cm}$的平行夹爪来说很紧，所以第三次放置可能撞到第二个方块。程序在逻辑上是对的，在物理上是打擦边球的；“间隔五厘米”被解释成了中心间距，这是通常的读法，但发现这个问题的办法是几何检查（张开的夹爪手指与相邻方块之间）。模型没被告知就把$10\,\mathrm{cm}$选了作“在……前面”——这是个说得过去的默认值，操作员可能想改。算术合理性检查：$0.05 + 2\times0.05 = 0.15$ ✓。
:::
:::

Code as Policies工作的两个改进值得了解。**分层生成**：如果生成的代码调用了一个尚不存在的函数（比如`make_grid(objects, rows, cols, pitch)`），就请第二次模型调用去写那个函数，递归地做，于是复杂行为由短小的片段搭起来。**第三方库**：原系统允许用`numpy`做几何；在生产系统里，每个这样的库都会拓宽代码能做的事，设计沙箱时必须考虑——暴露几个经过审查的辅助函数（`midpoint`、`offset`、`grid_positions`）通常比暴露整个数值库更安全。

## 运行不可信的代码 {#sec-sandbox}

生成的代码必须被当成匿名陌生人寄来的代码一样对待：它可能是错的；而如果提示词或场景里含有敌意文本（见[[llm-robot-control/llm-guardrails]]），它还可能包藏祸心。Python的灵活让这件事很严重——一行代码就能`import os`、删文件、开网络连接，或者伸进API的内部绕过它的检查。

::: definition 沙箱 {#def-sandbox}
生成机器人代码的**沙箱**是一起起作用的机制集合，保证程序(i)只能调用机器人API的函数和一小撮纯内置函数；(ii)访问不了文件、网络、其他进程和API的内部；(iii)在时限和API调用次数上限之内终止；(iv)除了参数经过检查的API调用之外，无法以任何方式影响机器人。没有哪个单一机制能同时做到这四点；要把它们分层叠加。
:::

各层由弱到强：

1. **语法树上的静态检查。**运行之前先用Python的`ast`模块解析代码，凡超出一个小型节点类型允许清单的一律拒绝：不许`import`，不许定义函数或类，不许`while`循环（只许对有穷序列的`for`），除纯数据字段外不许属性访问，不许以下划线开头的名字，只许调用API函数。
2. **受限命名空间。**用`exec(code, {"__builtins__": SAFE_BUILTINS, **API_FUNCTIONS})`执行，其中`SAFE_BUILTINS`只含`range`、`len`、`min`、`max`、`abs`、`round`、`enumerate`、`sorted`。
3. **进程隔离。**把解释器跑在独立的操作系统进程（或容器）里：没有文件系统写权限、没有网络、有内存上限、有CPU时间上限；机器人API经由一条窄消息通道（管道或套接字）通往机器人进程，而后者自己执行全部检查。
4. **运行时预算。**给整个程序设墙钟超时，并设动作调用次数上限（对“三个方块”的指令，20次差不多）；超过任何一个，就同时停程序和机械臂。

第一层的静态检查器很短：

```python
import ast

ALLOWED_NODES = (
    ast.Module, ast.Expr, ast.Assign, ast.AugAssign, ast.Name, ast.Load, ast.Store,
    ast.Constant, ast.Call, ast.keyword, ast.Attribute, ast.Subscript, ast.Slice,
    ast.Tuple, ast.List, ast.Dict, ast.BinOp, ast.UnaryOp, ast.BoolOp, ast.Compare,
    ast.If, ast.For, ast.Break, ast.Continue, ast.IfExp, ast.JoinedStr,
    ast.FormattedValue, ast.comprehension, ast.ListComp,
    ast.Add, ast.Sub, ast.Mult, ast.Div, ast.FloorDiv, ast.Mod, ast.USub, ast.UAdd,
    ast.And, ast.Or, ast.Not, ast.Eq, ast.NotEq, ast.Lt, ast.LtE, ast.Gt, ast.GtE,
    ast.In, ast.NotIn,
)
API = {"detect", "get_pose", "move_to", "grasp", "release", "place", "say",
       "range", "len", "min", "max", "abs", "round", "enumerate", "sorted"}
DATA_FIELDS = {"id", "name", "x", "y", "z", "yaw", "size", "score"}

def check_program(src: str, max_loops: int = 3) -> list[str]:
    """Return a list of problems; an empty list means the program may run."""
    try:
        tree = ast.parse(src, mode="exec")
    except SyntaxError as e:
        return [f"syntax error: {e.msg} (line {e.lineno})"]
    problems, loops = [], 0
    for node in ast.walk(tree):
        line = getattr(node, "lineno", "?")
        if isinstance(node, (ast.For, ast.comprehension)):
            loops += 1
        if not isinstance(node, ALLOWED_NODES):
            problems.append(f"line {line}: {type(node).__name__} is not allowed")
        elif isinstance(node, ast.Attribute) and node.attr not in DATA_FIELDS:
            problems.append(f"line {line}: attribute .{node.attr} is not allowed")
        elif isinstance(node, ast.Name) and node.id.startswith("_"):
            problems.append(f"line {line}: name {node.id} is not allowed")
        elif isinstance(node, ast.Name) and isinstance(node.ctx, ast.Store) \
                and node.id in API:
            problems.append(f"line {line}: cannot rebind {node.id}")
        elif isinstance(node, ast.Call):
            if not (isinstance(node.func, ast.Name) and node.func.id in API):
                problems.append(f"line {line}: only API functions may be called")
    if loops > max_loops:
        problems.append(f"{loops} loops (limit {max_loops})")
    return problems
```

对[[#ex-row]]的程序，它返回空列表。而对包含`import os`、`while True:`或`(1).__class__.__bases__`的程序，它每个违规返回一条消息，可以送回给模型换取修正版。

::: warning 限制Python的命名空间不是安全边界
有人想做完第1、2层就收工。别。Python有一长串通过内省（`__class__`、`__subclasses__`、帧对象）从“受限”执行中逃脱的历史，而且新的逃法不断被发现；Python文档自己就说，带受限globals的`exec`不是沙箱。静态检查和命名空间擅长抓*错误*、产出好的错误消息。防*恶意*代码需要操作系统级隔离（第3层）；而保护人和机器，需要的是在机器人进程和安全控制器里执行的限值——那是任何Python代码都根本够不到的。
:::

::: quiz
上面这个静态检查器会拒绝下列哪些生成的代码行？
- [ ] `top = base.z + base.size[2]`
- [x] `import math`
- [x] `while not done: grasp(b.id)`
- [x] `move_to.__defaults__ = (0.0, 2.0)`
- [ ] `for b in sorted(blocks, key=None): grasp(b.id)`
::: solution
`import`不在允许的节点之列；`while`不被允许（只许有界的`for`循环）；`__defaults__`是数据字段之外的属性（而且是试图绕过API悄悄改掉`move_to`的默认速度——正是检查器存在的意义所在的那种小动作）。第一行只用数据字段、下标和算术。最后一行用带关键字参数的`sorted`；`keyword`节点是允许的，`None`是常量，所以它能通过——而且无害。
:::
:::

## 运动前的限值检查 {#sec-limits}

沙箱管住的是*代码能调用什么*。限值检查管住的是*这些调用能做出什么*。它们住在机器人进程里每个API动作的实现中，对每一次调用执行，不管调用来自哪里。

最简单也最重要的检查是**工作空间盒**：基坐标系内一个与坐标轴对齐的长方体，工具点必须留在其中；选它时要排除操作员那一侧的工作台、夹具的夹持区域，以及安全高度以上的一切。

::: proposition 直线运动保持在凸工作空间内 {#prop-convex}
设允许的工作空间$W\subset\R^3$是凸的——例如长方体$W = [x_{\min}, x_{\max}]\times[y_{\min}, y_{\max}]\times[z_{\min}, z_{\max}]$。若一条直线笛卡尔运动的起点$\mathbf p_0$与目标$\mathbf p_1$都在$W$内，则路径$\mathbf p(s) = (1 - s)\mathbf p_0 + s\mathbf p_1$，$s\in[0, 1]$上的每一点都在$W$内。因此对长方体而言，在当前位形在内这一点成立时，只需检查每次直线运动的目标。
:::

::: proof
一个集合是凸的，当且仅当它包含其任意两点之间的线段；这就是定义，所以剩下要验证的只是长方体是凸的。若$\mathbf p_0, \mathbf p_1\in W$，则对每个坐标，比如$x$，有$x_{\min}\le x_0, x_1\le x_{\max}$，而$(1 - s)x_0 + sx_1$是$x_0$与$x_1$的加权平均，权重非负且和为1，因而落在两者之间，也就落在$[x_{\min}, x_{\max}]$里。对$y$和$z$同理，所以$\mathbf p(s)\in W$。真正要紧的假设是控制器确实在走直线：在*关节*空间插补的运动产生的是一条弯曲的工具路径，即使两个端点都在内，它也可能离开凸的长方体，因此必须用正运动学对路径采样来检查。
:::

这个命题正是API的`move_to`是*线性*运动的原因：它的安全检查是每个坐标一次比较。一套完整的每次调用检查如下：

::: algorithm 执行生成的程序 {#alg-execute}
1. 对程序做**静态检查**（[[#sec-sandbox]]）。失败时，把问题返回给模型修复（至多两三次），然后放弃并告知操作员。
2. **试运行。**在沙箱里，针对API的*录制*实现执行程序：感知调用返回当前场景快照；动作调用检查自己的参数（第3步），并把预期动作追加到一条日志里而不是真的运动。任何异常都中止。
3. **逐动作检查**（试运行中做一遍，执行时再做一遍）：每个目标都在工作空间盒内；速度不超过配置的上限；`grasp`的对象存在于当前检测列表中且置信度高于阈值；物体的估计质量不超过机械臂负载；存在逆运动学解和无碰撞路径。
4. **对动作日志做计划级检查**：动作数在预算内；总运动时间在预算内；没有动作落在需要确认的区域内（若有，向操作员求证，展示计划中的动作）。
5. **执行**：在带超时的沙箱里，对着真实API真正运行程序——API的动作会用新鲜的感知重复第3步的检查，因为场景可能已随试运行而改变。
6. **汇报**：连同动作日志一起，报告给操作员和日志存储。
:::

::: example 对照工作空间检查一次运动 {#ex-workspace}
工作空间盒是$x\in[0.20, 0.70]$、$y\in[-0.40, 0.40]$、$z\in[0.00, 0.50]\,\mathrm m$，速度上限$0.25\,\mathrm m/\mathrm s$。一个生成程序从当前位置$(0.35, 0.05, 0.25)\,\mathrm m$调用`move_to(0.62, -0.31, 0.20, speed=0.4)`，之后又调用`move_to(0.72, 0.10, 0.10)`。各检查会报告什么？第一次运动在允许速度下的最短时间是多少？
::: solution
第一次运动：目标满足$0.20\le0.62\le0.70$、$-0.40\le-0.31\le0.40$、$0\le0.20\le0.50$，在盒内；由[[#prop-convex]]，整条直线路径也在内。请求的速度$0.4\,\mathrm m/\mathrm s$超过上限。API应当*抛出异常*而不是悄悄钳到上限，好让模型和日志都看到问题：`LimitError: speed 0.40 m/s exceeds 0.25 m/s`。（对速度而言，钳到上限是站得住的，因为它只影响时间，但必须记入日志。）按$0.25\,\mathrm m/\mathrm s$，距离$\sqrt{0.27^2 + 0.36^2 + 0.05^2} = 0.453\,\mathrm m$至少需要$0.453/0.25 = 1.81\,\mathrm s$，再加上加速段。第二次运动：$x = 0.72 > 0.70$，在盒外，于是`LimitError: x = 0.72 m outside [0.20, 0.70]`——发生在试运行里，在任何东西动之前。合理性检查：两厘米的越界，典型情形是模型往边缘附近的位姿上又加了一个偏移；正确的行为是停下并报告，而不是移到最近的允许点——那会把物体放到操作员没有要求的地方。
:::
:::

::: example 一个网格程序的试运行 {#ex-dryrun}
指令：“从$(0.40, -0.045)$开始，把十二个垫圈排成网格，横三竖四，间隔30 mm。”生成程序对行$r = 0..3$、列$c = 0..2$做循环，对每个垫圈调用`grasp(w.id)`和`place(0.40 + 0.03*c, -0.045 + 0.03*r, 0.0)`。单元的默认动作预算是20个动作，其规则是：估计运动超过$60\,\mathrm s$的程序要拿给操作员确认。一个pick-and-place周期约需$5\,\mathrm s$。试运行会报告什么？
::: solution
动作日志里有$12$次`grasp`和$12$次`place`，合计$24$个动作，所以在默认预算下，试运行会在第21个动作处停下，报`BudgetExceeded: 20 actions`。对这个指令来说预算太低了，而不是程序太长：更好的规则是从请求推导预算，例如$2\times(\text{被点名的物体数}) + 4 = 28$。用这个预算，日志就能通过。目标：$x\in\{0.40, 0.43, 0.46\}\,\mathrm m$、$y\in\{-0.045, -0.015, 0.015, 0.045\}\,\mathrm m$；极端的角点$(0.40, -0.045)$与$(0.46, 0.045)$在[[#ex-workspace]]的工作空间盒内，于是由凸性，所有目标都在内。估计运动时间$12\times5 = 60\,\mathrm s$，恰在确认阈值上，于是把计划中的十二个位置展示给操作员确认（配一张网格小图最理想）。合理性检查：30 mm的间距配上比如外径24 mm的垫圈，留下6 mm的缝隙，对吸盘够用，对平行夹爪的手指则不够——又一个需要相邻几何检查的例子。
:::
:::

::: remark 为什么试运行还不够
试运行针对一份快照执行程序。若程序的行为取决于执行期间会改变的感知结果——方块被撞倒，某次`detect`调用返回了不同的列表——真实运行就可能走一条试运行从未走过的分支。这就是第5步要重复每项检查的原因；也正是频繁交织感知与动作的程序，更适合交给[[llm-robot-control/robot-tool-calling]]的工具调用循环的原因——在那里，每个动作都在被请求的那一刻受检。
:::

## 采样多个程序 {#sec-sampling}

同一个提示词问两次程序，只要采样温度高于零，模型写的程序就不同。有的过不了静态检查或试运行，有的能过。由于检查相对机器人时间很便宜，生成若干候选、保留第一个通过的，可能是划算的。

::: proposition 带验证器的Best-of-$k$ {#prop-best-of-k}
设每个生成的程序以概率$q$独立地通过全部检查。在并行生成的$k$个程序中，至少一个通过的概率是
$$
1 - (1 - q)^k ,
$$ {#eq-best-of-k}
而当程序逐个生成、生成到某个通过为止时，生成次数的期望是$1/q$。要达到通过概率$P$，需要的并行样本数为$k = \lceil\ln(1 - P)/\ln(1 - q)\rceil$。
:::

::: proof
$k$个独立程序全部失败的概率是$(1 - q)^k$；其对立事件就是至少一个通过。逐个生成时，第一个通过程序的序号服从成功概率为$q$的几何分布，其均值为$\sum_{j\ge1} j\,q(1 - q)^{j-1} = 1/q$。对$k$解$1 - (1 - q)^k\ge P$得$k\ge\ln(1 - P)/\ln(1 - q)$（两个对数都是负的，所以相除时不等号方向保持不变）。
:::

独立性是乐观的：同一提示词的样本共享模型的误解，所以如果模型读错了指令，所有样本都会以同样的方式读错。通过检查也不意味着做的是操作员想要的——检查抓的是不安全或不可能的程序，而不是错误的程序。因此Best-of-$k$是对付*语法与限值*失败的武器，对付不了误解；那需要确认（把计划的放置展示给操作员）或反馈。

::: widget plot
f: 1 - (1 - q)^x
x: 0, 10
y: 0, 1
sliders: q=0.6:0.05:0.95:0.01
hlines: 0.95; 0.99
labels: P(\text{至少一个通过，共 } k \text{ 个})
caption: $k$个独立生成的程序中至少一个通过静态检查与试运行的概率（横轴$k$），单程序通过率为$q$。在$q = 0.6$时，三个样本给94%，五个给99%。把$q$降到0.2——难指令配差提示词的情形——看需要多少样本：改进提示词和API能提高$q$，这比多加样本值钱得多。
:::

::: example 并行样本与延迟 {#ex-samples}
程序通过检查的概率为$q = 0.6$。每次生成花$5.8\,\mathrm s$（出自[[llm-robot-control/language-and-robots#ex-latency]]），检查花$0.3\,\mathrm s$。比较并行生成三个与逐个生成直到成功。
::: solution
并行时，三次生成在墙钟上约花$5.8\,\mathrm s$（提供商并发服务它们）加$0.3\,\mathrm s$用于检查，并以概率$1 - 0.4^3 = 0.936$成功。逐个生成时，期望生成次数为$1/0.6 = 1.67$，即期望$1.67\times(5.8 + 0.3) = 10.2\,\mathrm s$，且带着长尾（16%的概率需要三次以上）。并行采样把token成本变成三倍，但削减了延迟及其方差；对交互使用，通常是更划算的交换。
:::
:::

::: history
用文本语言给机器人编程与工业机器人同龄：Unimation的VAL（1979）和IBM的AML（1982）让集成商编写运动程序，而每家机器人厂商都有自己的语言。机器人的自然语言编程从1970年代起就被研究，用的是手写语法；2010年代，统计语义解析器把指令翻译成短程序。在代码上训练的大语言模型改变了经济账：OpenAI的Codex（2021）表明模型能从文档字符串写出可用的Python。2022年，Code as Policies（Google的Jacky Liang、Andy Zeng及其同事）用一个感知与控制API加几个示例提示这样的模型，为桌面操作、白板绘画和移动操作机械臂生成了策略，还包括对未定义函数的分层生成；ProgPrompt（Singh等，2022）用程序风格的提示做家务任务计划。后续工作把代码生成与视觉-语言模型结合做三维空间推理（VoxPoser，2023），并与来自执行错误的自我纠正结合；而工业部署则把生成的代码放到了沙箱和带类型的工具接口后面。
:::

::: summary
- **Code-as-policy**（[[#def-cap]]）是模型写的、调用固定机器人API的程序；循环、算术与条件判断让空间模式和依赖感知的任务变得自然。
- 为生成而设计API（[[#def-api]]）：函数少、数据朴素、动作在技能层级、单位与坐标系约定只声明一套、以异常失败、每个动作内部有检查。
- 提示词的顺序是：规则、API、做过的示例（含失败处理）、指令。
- 分**层**运行生成的代码（[[#def-sandbox]]）：AST允许清单、受限命名空间、操作系统级进程隔离、超时与调用预算；单靠Python命名空间限制不是安全边界。
- 每个动作都对照工作空间、速度、负载、检测与碰撞限值检查；对凸工作空间，直线运动只需检查目标（[[#prop-convex]]）。
- 对着录制API做试运行，检查动作日志，然后重复全部检查再执行（[[#alg-execute]]）。
- Best-of-$k$采样把得到合法程序的概率提高到$1 - (1 - q)^k$（[[#prop-best-of-k]]），但修不好误解。
:::

## 习题

::: exercise 一排的位置 {level=1 check="0.22"}
把[[#ex-row]]的程序推广到$n$个方块，使这一排始终以碗为中心：方块$i$（$i = 0, \dots, n - 1$）放到$y = y_{\text{bowl}} - 0.05(n - 1)/2 + 0.05i$。五个方块、碗在$(0.50, 0.12, 0.00)\,\mathrm m$时，最后放置的方块的$y$坐标是多少？（$y$以m计。）
::: solution
对中偏移为$-0.05\times4/2 = -0.10\,\mathrm m$，最后一个方块$i = 4$：$y = 0.12 - 0.10 + 0.20 = 0.22\,\mathrm m$。这一排覆盖$y = 0.02$到$0.22\,\mathrm m$，关于$0.12$对称 ✓。注意原程序硬编码了偏移$-0.05$，它只对$n = 3$成立——这类沉默的假设，正是对生成代码做“小改动”危险的原因。
:::
:::

::: exercise 在盒内吗？ {level=1}
用[[#ex-workspace]]的工作空间盒，目标$(0.25, 0.39, 0.05)$、$(0.45, -0.42, 0.20)$、$(0.65, 0.00, 0.55)$哪些是允许的？
::: solution
只有第一个：$(0.45, -0.42, 0.20)$的$y < -0.40$，$(0.65, 0.00, 0.55)$的$z > 0.50$。
:::
:::

::: exercise 通过概率 {level=1 check="0.9085"}
每个程序以概率$q = 0.45$通过检查。四个并行样本中至少一个通过的概率是多少？（概率保留四位小数。）
::: solution
$1 - 0.55^4 = 1 - 0.0915 = 0.9085$。
:::
:::

::: exercise 达到95%需要的样本数 {level=2 check="6"}
在$q = 0.45$下，要有至少95%的机会让一个通过，需要多少个并行样本？（填入整数$k$。）
::: solution
$k\ge\ln(0.05)/\ln(0.55) = (-2.996)/(-0.598) = 5.01$，所以$k = 6$。五个样本给$1 - 0.55^5 = 0.9497$，差一点到95%；六个给$0.9723$。
:::
:::

::: exercise 最短运动时间 {level=2 check="1.811"}
在$0.25\,\mathrm m/\mathrm s$的速度上限下，忽略加速，从$(0.35, 0.05, 0.25)$到$(0.62, -0.31, 0.20)\,\mathrm m$的直线运动最短要多久？（时间以s计，保留三位小数。）
::: solution
距离$\sqrt{0.27^2 + 0.36^2 + 0.05^2} = \sqrt{0.0729 + 0.1296 + 0.0025} = \sqrt{0.205} = 0.4528\,\mathrm m$；时间$0.4528/0.25 = 1.811\,\mathrm s$。
:::
:::

::: exercise 一个单位错误 {level=2}
“把杯子向右移5 cm”的生成程序写的是`cup = get_pose("cup"); grasp(cup.id); place(cup.x, cup.y - 5, cup.z)`。解释哪里出了错、哪个检查会抓住它，以及API或提示词如何能让这个错误更不容易发生。
::: solution
从机器人的观点看，“右”在所声明的坐标系（x向前，y向左）里是$-y$，所以方向是对的；但`5`是厘米，而期望的是米：目标在右$5\,\mathrm m$处。工作空间检查在试运行里就拒绝它（$y < -0.40\,\mathrm m$），在任何东西移动之前。缓解办法：在每个函数的文档字符串里写明单位，在提示词里放一个使用以米为单位的小偏移的示例（`cup.y - 0.05`），并让`place`以一个明确的消息拒绝任何幅度超出臂展的坐标（“y = −4.88 m is outside the reach of the arm; positions are in metres”），把程序该怎么改明明白白告诉模型。
:::
:::

::: exercise 关节空间的路径 {level=3}
用一个简单的平面例子证明：在关节空间线性插补的运动，即使两个端点都在凸工作空间内，也可能离开它；并说明对这类运动，[[#prop-convex]]的检查必须怎么改。
::: solution
取平面2R机械臂，$L_1 = L_2 = 0.4\,\mathrm m$，工作空间为长方体$x\in[0.2, 0.75]$、$y\in[-0.3, 0.3]$。位形A：$\theta_1 = -60^\circ$、$\theta_2 = 90^\circ$，工具在$(0.4\cos(-60^\circ) + 0.4\cos 30^\circ,\ 0.4\sin(-60^\circ) + 0.4\sin 30^\circ) = (0.546, -0.146)$。位形B：$\theta_1 = 60^\circ$、$\theta_2 = -90^\circ$，得$(0.546, 0.146)$。两者都在盒内。关节空间中点处，$\theta_1 = 0$、$\theta_2 = 0$：臂伸直，工具在$(0.8, 0)$，出盒$5\,\mathrm{cm}$。关节插补的工具路径是一条曲线，$W$的凸性对它什么也说不了。对关节空间运动，检查必须用正运动学以细到足以匹配工具速度的分辨率对路径采样（或加界），或者由运动规划器针对工作空间约束来规划并检查该运动。
:::
:::

::: exercise 绕过检查器 {level=3}
静态检查器只允许对`DATA_FIELDS`做属性访问。解释为什么一个控制着指令的攻击者仍能不破坏沙箱就造成伤害，以及还剩哪些防御。
::: solution
检查器限制的是程序*如何*行动，不是它*意图什么*。一个只用允许结构的程序，仍然可以，比如，抓起操作员的手机（如果检测器能找到它）放进废品箱，或者以允许的最大速度反复在工作空间边缘附近运动。沙箱之外的防御：API里的按物体策略（`grasp`拒绝不在本单元允许清单上的类别的物体）；需要操作员确认的区域；动作预算；对不寻常的命令，在执行前把计划动作日志拿给操作员过目；以及安全控制器的速度、力与分离监控——无论程序做什么，它们都为对人的伤害封顶。总的观点（在[[llm-robot-control/llm-guardrails]]中展开）是：代码检查抓的是畸形程序，而保护人的限值坐在一切代码之下。
:::
:::

::: exercise 为码垛设计API {level=3}
为一台把几种尺寸的箱子码上托盘的机械臂，设计一个代码生成API（五到八个函数，带签名和一行文档字符串），要求能接受“用400 × 300的箱子码两层砖砌交叠图案”这样的指令。写出约定、每个动作执行哪些检查，以及一个用于提示词的示例。
::: solution
一个可能的设计。约定：米；托盘坐标系原点在近左角，$x$沿托盘长度、$y$沿宽度、$z$从托盘面竖直向上；yaw以弧度计，只取$0$或$\pi/2$。函数：`pallet() -> Pallet`（length、width、max_height、max_mass）；`box_types() -> list[BoxType]`（id、长、宽、高、质量）；`next_box(type_id) -> Box`（等待该类型的箱子到达进料输送线）；`place_box(box, x, y, layer, yaw)`（把箱子的近左角放到指定层$(x, y)$处；检查：占地在托盘内、与该层已放的箱子不重叠、下层对占地的支撑至少70%、总高与总质量在限值内）；`layer_height(layer) -> float`；`say(text)`。提示词示例：在$1.2\times0.8$的托盘上用$0.4\times0.3$的箱子码单层，摆成$3\times2$网格，循环计算$x = 0.4i$、$y = 0.3j$，并以注释说明$3\times0.4 = 1.2$且$2\times0.3 = 0.6 \le 0.8$。把重叠与支撑检查放进`place_box`内部，意味着模型给错的交叠图案会抛出精确的错误（“box overlaps box 4 in layer 2”），而不是码出一个要倒的托盘。
:::
:::
