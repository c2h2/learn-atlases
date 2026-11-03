上一章让模型写出整个程序，然后再检查它。本章走相反的路，而这条路到2026年已成为默认的工业接口：把机器人的能力作为一小组**带类型的工具**提供给模型，每个工具带一个名字、一段描述和一个参数的JSON schema，模型在循环里一次一个或几个地调用它们，读过每个结果再决定下一步做什么。每次调用都是一个能在任何事情发生之前被验证的结构化对象，每个结果都是模型在下次决定之前看到的信息，而这个循环天然地把感知与动作交织在一起。我们展示如何为机器人技能编写工具schema、结构化输出如何保证格式良好的调用、一个Python的最小智能体循环、工具如何映射到ROS 2服务与动作、模型上下文协议（MCP）如何把机器人暴露给任何兼容的助手，以及决定这样的系统能否在真实网络上跑通的分布式系统细节：超时、取消与幂等。函数调用的一般机制在LLM图谱的[函数调用与工具](/learn/llm/lesson.php?c=agents&l=function-calling)、[智能体循环](/learn/llm/lesson.php?c=agents&l=agent-loops)与[结构化输出](/learn/llm/lesson.php?c=prompting-rag&l=structured-output)各章讲授。

## 工具即带类型的技能 {#sec-tools}

::: definition 工具 {#def-tool}
提供给语言模型的**工具**由一个**名字**、一段说明它做什么以及何时使用的自然语言**描述**，以及一个**输入schema**——一个规定参数、其类型、单位、取值范围以及哪些必填的JSON Schema对象——组成。模型通过发出一个结构化的**工具调用**（工具名与一个参数JSON对象）来请求一次调用；验证并执行它、返回**工具结果**（一个JSON对象或文本，调用失败则标记为错误）的是应用而不是模型，工具结果被追加到对话里。
:::

对机器人来说，每个工具都应当是[[llm-robot-control/grounded-task-planning#def-skill]]意义上的一个技能：能够独立验证的最大单元。两个schema展示这种风格。

```json
{
  "name": "move_to_pose",
  "description": "Move the tool centre point in a straight line to a pose in the robot base frame (x forward, y left, z up; metres). The gripper points down; yaw is the rotation about z in degrees. Use only for repositioning; to pick or place an object use grasp or place. Fails if the pose is outside the workspace or unreachable.",
  "input_schema": {
    "type": "object",
    "properties": {
      "x_m":   {"type": "number", "minimum": 0.20, "maximum": 0.70},
      "y_m":   {"type": "number", "minimum": -0.40, "maximum": 0.40},
      "z_m":   {"type": "number", "minimum": 0.02, "maximum": 0.50},
      "yaw_deg": {"type": "number", "minimum": -180, "maximum": 180, "default": 0},
      "speed": {"type": "string", "enum": ["slow", "normal"], "default": "normal"}
    },
    "required": ["x_m", "y_m", "z_m"],
    "additionalProperties": false
  }
}
```

```json
{
  "name": "grasp",
  "description": "Pick up a detected object by its id (from get_scene). Approaches from above, closes the gripper with the given force and lifts 10 cm. Returns whether an object is held and the measured finger opening.",
  "input_schema": {
    "type": "object",
    "properties": {
      "object_id": {"type": "string", "pattern": "^[a-z0-9_]+$",
                    "description": "An id returned by get_scene, e.g. 'bolt_m6_2'."},
      "grip_force_n": {"type": "number", "minimum": 5, "maximum": 40, "default": 20}
    },
    "required": ["object_id"],
    "additionalProperties": false
  }
}
```

单位写在属性名里（`x_m`、`grip_force_n`），所以模型每次写参数都看得见它们。速度是二值枚举而不是数字：模型选择意图（在人或易碎零件附近用“slow”），而控制器把它映射到标定好的数值。描述里写了*什么时候不该*用这个工具，这让模型不会拿`move_to_pose`调用来搭抓取。`additionalProperties: false`会拒绝诸如`"collision_checking": false`这种臆造的参数。

::: warning schema是契约，不是安全功能
schema里的`minimum`与`maximum`帮助模型选择合理的数值，并让应用廉价地拒绝畸形调用，但它们由模型提供商或你自己的验证器运行的软件来强制执行（如果真被执行的话）。工作空间限值还必须在执行`move_to_pose`的机器人进程里强制执行，以及机器人控制器里的安全额定限值（[[robot-arm-design/arm-safety]]）。如果有人编辑了schema，或第二个客户端绕过它直接调用机器人，更低的层必须依然守得住。
:::

### 设计工具集

一个用于拾放单元的工具集可能如下：

| 工具 | 种类 | 典型时长 | 说明 |
|---|---|---|---|
| `get_scene` | 查询 | 0.1–0.5 s | 物体标识符、类别、位姿、置信度 |
| `get_robot_state` | 查询 | < 10 ms | 关节位置、夹爪状态、所持物体、错误 |
| `move_to_pose` | 动作 | 1–5 s | 直线运动，经工作空间检查 |
| `grasp` | 动作 | 2–6 s | 按物体标识符 |
| `place` | 动作 | 2–6 s | 放到命名位置或某个位姿 |
| `pick_and_place` | 动作 | 5–12 s | 常见情形一次调用完成 |
| `ask_operator` | 交互 | 数秒到数分钟 | 带选项的提问；结果就是答案 |
| `stop` | 动作 | < 0.1 s | 受控停止，始终可用 |

[[llm-robot-control/language-and-robots#sec-latency]]中的两条原则适用。每个工具应当做足量的工作——与`grasp`之后再`place`相比，`pick_and_place`每个物体省两轮模型。而工具数量应当保持很小（远少于二十个）：每个工具的schema在每一轮都待在提示词里，而模型在众多相似工具之间选择时可靠性更低。

## 结构化输出 {#sec-structured}

早期的函数调用只是请模型发出JSON，而模型有时产出的JSON无效或类型不对。到2025年，各大API都提供**严格**的工具schema和结构化输出。

::: definition 通过受约束解码得到结构化输出 {#def-constrained}
**受约束解码**在每个生成步骤把模型可能产出的词元限制为那些使输出仍是某个被文法接受的字符串之有效前缀的词元——这里是满足给定schema的JSON对象的文法。结果保证能解析、并匹配schema的结构（属性名、类型、必填字段、枚举）；至于每个约束（数值范围、模式）是否在解码期间被强制执行则取决于提供商，所以应用仍必须自己验证。
:::

例如，在Anthropic的Messages API里，工具定义可以带上`"strict": true`（配合`additionalProperties: false`与显式的`required`列表），它保证每次调用的参数都匹配schema。严格性消除了一类烦人的错误——该是数字的地方是字符串、缺了一个字段——但它并没有也不能让*内容*正确：操作员要的是M6螺栓时，一个schema合法的`grasp("bolt_m8_1")`仍然是错的。因此应用总是运行自己的验证，顺序如下：schema（用`jsonschema`之类的库）、允许清单（当前模式下允许这个工具吗？）、语义检查（`bolt_m8_1`在最新场景里存在吗？所持物体与这个放置目标兼容吗？）、然后是技能自身的前置条件检查。

::: example 验证一次调用 {#ex-validate-call}
模型发出`move_to_pose`，参数为`{"x_m": 0.55, "y_m": -0.45, "z_m": 0.12, "speed": "fast"}`。哪些检查会失败？工具结果该说什么？
::: solution
两处schema违规：$y = -0.45 < -0.40$（低于`minimum`），而`"fast"`不在枚举`["slow", "normal"]`里。若用严格解码，枚举违规本不可能发生；范围违规可能被提供商抓到，也可能不会。应用的验证器报告两处，而带`is_error`标记的工具结果应当具体到模型能据此修正调用：“y_m = −0.45 is outside the workspace [−0.40, 0.40] m; speed must be 'slow' or 'normal'”。任何东西都不会发给机器人。含糊的错误（“invalid input”）会再花一轮模型去猜；精确的错误通常恰好只花一次修正后的调用。
:::
:::

## 智能体循环 {#sec-loop}

循环是系统的心脏。它很短；功夫下在每一步周围的东西上。

::: algorithm 机器人智能体循环 {#alg-agent-loop}
输入：操作员命令；工具定义；系统提示词；对轮数、总时间与动作数的限制。
1. 用系统提示词（角色、规则、约定、单元描述）与命令开始对话。
2. 带对话与工具定义调用模型。
3. 若模型的回复不含工具调用，它就是最终答案：报告给操作员并停止。
4. 否则，对每个工具调用**按顺序**（运动工具绝不并发执行）：验证（[[#sec-structured]]）；验证失败则准备一个错误结果；否则带超时执行（[[#sec-timeouts]]）并准备其结果，技能失败则标记为错误。
5. 把模型的回复与全部工具结果追加到对话，记录一切日志，回到第2步。
6. 在任何时刻，若超出轮数、时间或动作限制、操作员按下停止，或模型的回复因任何其他原因结束（输出被截断、拒绝），就以受控方式停止机器人并报告。
:::

用Anthropic SDK在Python里实现（截至2026年末；其他提供商的API结构相同、字段名不同）：

```python
import json
import anthropic

client = anthropic.Anthropic()                 # reads ANTHROPIC_API_KEY
MODEL = "claude-sonnet-5-5"                    # a current Claude model id (late 2026)
TOOLS = [GET_SCENE, GET_ROBOT_STATE, MOVE_TO_POSE, GRASP, PLACE, ASK_OPERATOR]

def run_command(command: str, max_turns: int = 15, max_actions: int = 30) -> str:
    messages = [{"role": "user", "content": command}]
    actions = 0
    for _ in range(max_turns):
        reply = client.messages.create(
            model=MODEL, max_tokens=4096, system=SYSTEM_PROMPT,
            tools=TOOLS, messages=messages)
        messages.append({"role": "assistant", "content": reply.content})
        log_model_turn(reply)

        if reply.stop_reason == "end_turn":                    # final answer
            return "".join(b.text for b in reply.content if b.type == "text")
        if reply.stop_reason != "tool_use":                    # truncated, refused, ...
            robot.controlled_stop()
            return f"Stopped: model ended with {reply.stop_reason}."

        results = []
        for call in (b for b in reply.content if b.type == "tool_use"):
            actions += call.name in ACTION_TOOLS
            if actions > max_actions:
                robot.controlled_stop()
                return "Stopped: action budget exceeded."
            try:
                output = execute_tool(call.name, call.input)   # validate, run, timeout
                results.append({"type": "tool_result", "tool_use_id": call.id,
                                "content": json.dumps(output)})
            except ToolError as err:                           # validation or skill failure
                results.append({"type": "tool_result", "tool_use_id": call.id,
                                "content": str(err), "is_error": True})
            log_tool_call(call, results[-1])
        messages.append({"role": "user", "content": results})  # all results in one message

    robot.controlled_stop()
    return "Stopped: turn limit reached."
```

函数`execute_tool`是工程所在之处：它对照schema验证参数，检查允许清单与语义约束，分派给技能，强制执行超时，并把每一次失败转换成带精确消息的`ToolError`。模型从不被递上一个异常回溯，也没有任何异常能不触发机器人停止就逃出循环。

实践中有三个细节要紧。一个模型轮的全部结果如API所期望的那样在**一条**消息里发回。若模型在一轮里发出多个工具调用，循环**顺序**执行它们——机器人不能同时抓两个物体，让查询与运动并行会招来竞态；一些API也允许你禁用并行工具调用。而且循环应当*让*模型自己选择调哪个工具，而不是强制某个特定工具：强制工具并非总是可用（比如启用扩展思考时，Claude只接受`auto`或`none`作为工具选择），而一条提示词指令加严格schema通常能达到同样的效果。

::: example 一次循环轨迹及其时间代价 {#ex-trace}
命令：“把两颗M6螺栓都放进左托盘。”轨迹：(1)模型调`get_scene`；(2)模型调`pick_and_place(bolt_m6_1, left_tray)`；(3)结果OK；模型调`pick_and_place(bolt_m6_2, left_tray)`；(4)结果：错误，“grasp failed: no object held”；模型调`get_scene`；(5)场景显示`bolt_m6_2`移动了$2\,\mathrm{cm}$；模型调`pick_and_place(bolt_m6_2, left_tray)`；(6)OK；模型调`get_robot_state`；(7)模型回复“两颗M6螺栓都在左托盘里。”设$t_{\text{ft}} = 0.7\,\mathrm s$、每轮输出$90$个词元、速度$100$词元/s、每次`pick_and_place`花$8\,\mathrm s$，估计这条命令的时长。
::: solution
七轮模型，每轮$0.7 + 90/100 = 1.6\,\mathrm s$：$11.2\,\mathrm s$。三次`pick_and_place`执行（一次在抓取尝试后失败；按整个周期计）：$24\,\mathrm s$。两次`get_scene`调用与一次状态查询：不到$1\,\mathrm s$。总计约$36\,\mathrm s$，其中几乎三分之一是模型时间。抓取失败没有惊动操作员就恢复了，因为错误结果足够具体，而模型在重试前先重新观察了。合理性检查：去掉最后的`get_robot_state`（单元可以自动把机器人状态附加到每个动作结果上）省一轮、$1.6\,\mathrm s$——对工具设计的小改动会明显移动总数。
:::
:::

## 工具架在ROS 2之上 {#sec-ros}

大多数研究以及越来越多的工业机械臂在ROS 2上运行其软件（见[[robot-arm-design/software-stack]]与Quigley、Gerkey和Smart）。ROS 2提供三种通信模式，每个工具都自然地映射到其中之一。

| ROS 2模式 | 语义 | 适合的工具会…… | 例子 |
|---|---|---|---|
| **话题** | 连续的发布/订阅流 | 读取最新状态（工具返回最近一条消息） | 关节状态、相机图像、检测结果 |
| **服务** | 请求 → 响应，简短 | 快速查询或改动某物 | 逆运动学、场景查询、夹爪状态、设一个参数 |
| **动作** | 目标 → 反馈流 → 结果，可取消 | 执行需要时间的事 | 移到某个位姿（如MoveIt的move-group动作）、跟随一条轨迹、夹爪命令、抓取 |

动作模式是要紧的那个：它恰好给出机器人工具所需的一切——一个服务器可以*拒绝*（若它没通过自己的检查）的目标、执行期间的*反馈*、带成功或失败的*结果*，以及*取消*。一个用`rclpy`与标准`control_msgs/action/GripperCommand`写的夹爪工具包装：

```python
import rclpy
from rclpy.action import ActionClient
from control_msgs.action import GripperCommand

class GripperTool:
    """Wraps the gripper action server as a tool; run in a node that is not spun elsewhere."""
    def __init__(self, node, name="/gripper_controller/gripper_cmd"):
        self.node = node
        self.client = ActionClient(node, GripperCommand, name)

    def close(self, max_effort_n: float, timeout_s: float = 5.0) -> dict:
        if not self.client.wait_for_server(timeout_sec=1.0):
            raise ToolError("gripper action server not available")
        goal = GripperCommand.Goal()
        goal.command.position = 0.0                 # fully closed (m)
        goal.command.max_effort = max_effort_n      # N, already range-checked
        sent = self.client.send_goal_async(goal)
        rclpy.spin_until_future_complete(self.node, sent, timeout_sec=1.0)
        handle = sent.result()
        if handle is None or not handle.accepted:
            raise ToolError("gripper goal rejected by the controller")
        done = handle.get_result_async()
        rclpy.spin_until_future_complete(self.node, done, timeout_sec=timeout_s)
        if not done.done():
            handle.cancel_goal_async()              # never leave a goal running unobserved
            raise ToolError(f"gripper did not finish within {timeout_s} s; goal cancelled")
        r = done.result().result
        return {"opening_m": round(r.position, 4), "stalled": r.stalled,
                "reached_goal": r.reached_goal}
```

返回给模型的结果很小，且用的是工具自己的词汇（`opening_m`、`stalled`），而不是原始ROS消息。一个卡停、开口$9\,\mathrm{mm}$的夹爪意味着“夹着某个约9 mm宽的东西”——这正是抓取的成功检查；开口为零则意味着手指关在了空处。

## 模型上下文协议 {#sec-mcp}

为一个应用编写工具包装会把机器人绑死在那个应用上。**模型上下文协议**把两者分开。

::: definition 模型上下文协议（MCP） {#def-mcp}
**模型上下文协议**是一个开放协议，由Anthropic于2024年11月发布，此后被众多助手与框架实现；通过它，承载语言模型的应用（**宿主**，每条连接一个**客户端**）发现并使用**服务器**提供的能力。服务器暴露**工具**（带JSON schema输入的可调用函数）、**资源**（可读数据，如场景描述或手册）与**提示**（模板）。消息是JSON-RPC 2.0，本地服务器经由标准输入/输出承载，远程服务器经由HTTP承载。
:::

一个机器人单元的MCP服务器一次发布与上面相同的工具，任何支持MCP的宿主——工程师笔记本上的聊天助手、内部操作员控制台、自动化测试台——都能使用它们。用官方Python SDK写的服务器很紧凑：

```python
from mcp.server.fastmcp import FastMCP

mcp = FastMCP("cell-7-arm")

@mcp.tool()
def get_scene() -> dict:
    """Objects currently detected in cell 7: ids, classes, poses (base frame, m), confidences."""
    return robot.scene_summary()

@mcp.tool()
def pick_and_place(object_id: str, target: str) -> dict:
    """Pick a detected object by id and place it at a named location
    ('left_tray', 'right_tray', 'fixture_a'). Fails if either is unknown or unreachable."""
    return robot.pick_and_place(object_id, target)     # all checks inside

if __name__ == "__main__":
    mcp.run()                                          # stdio transport by default
```

SDK从类型注解推导输入schema，从文档字符串推导描述。2025年间出现了若干桥接到ROS与ROS 2的开源MCP服务器——把运行中机器人的话题、服务与动作暴露给助手——机器人厂商也开始为其控制器配备MCP接口。协议让连接变得容易，这正是它需要小心的原因：一个提供原始话题发布能力的MCP服务器，等于给模型开了一条绕过一切技能级检查的通道。对生产单元，暴露*技能*而不是ROS图；服务器只跑在单元的网络上，对客户端做认证，并把允许清单、限制与日志留在服务器里，让每个客户端都必须从它们中间穿过。

::: quiz
一位工程师把一个通用助手接到一个可向任意话题发布的ROS 2 MCP桥上，让它“把机械臂往上挪2 cm”。助手直接发布了一条关节轨迹消息。哪个说法正确？
- [ ] 这没问题，因为助手把轨迹算对了
- [ ] MCP协议会阻止不安全的消息
- [x] 这个运动绕过了每一个技能级检查；在消息与机械臂之间，只有控制器自己的限值与安全系统把守
- [ ] 运动是安全的，因为它很小
::: solution
原始话题接口让模型能在低于工作空间、碰撞与物体检查所在的那一层直接寻址机器人。轨迹可能是对的，但除了关节控制器与安全额定控制器所强制的东西之外，没有任何东西验证过它。MCP是工具与数据的传输层；它没有机器人安全的概念。开发期间这样的桥是有用的；生产中只暴露经过验证的技能。
:::
:::

## 超时、取消与幂等 {#sec-timeouts}

一次工具调用从模型走到应用，可能跨越网络走到一个MCP服务器、走到ROS动作服务器、再走到控制器。任何链路都可能变慢或失效，经典的分布式系统问题随之而来。

**超时。**每个动作工具都需要一个超时，超时后调用被判失败、动作被取消。超时太短会中断本会成功的运动；太长会让操作员干等，而卡住的夹爪正在堵转。有原则的选法使用技能时长的实测分布。

::: example 从数据选超时 {#ex-timeout}
正常运行中记录的`pick_and_place`技能时长近似服从均值$4.2\,\mathrm s$、标准差$0.6\,\mathrm s$的正态分布。选一个超时，使正常执行中被中断的不超过0.1%。$5\,\mathrm s$的超时会中断多大比例？
::: solution
标准正态分布的单侧99.9%分位点是$z = 3.09$，于是超时为$4.2 + 3.09\times0.6 = 6.05\,\mathrm s$；取整到$6.1\,\mathrm s$。$5\,\mathrm s$的超时在均值以上$z = (5 - 4.2)/0.6 = 1.33$个标准差处，会中断$\Prob(Z > 1.33) = 9.1\%$的正常执行——太多了。真实的时长分布有比正态更重的右尾（偶发的重规划、一次慢速接近），所以超时应由记录时长的经验99.9分位数确定，并在技能有任何改动之后重新校核。合理性检查：$6\,\mathrm s$是均值的1.4倍，对表现良好的技能这是常用的经验比值。
:::
:::

::: widget distribution
dist: normal
params: mu=4.2, sigma=0.6
a: 6.05
b: 9
caption: 拾放技能的时长，建模为均值4.2 s、标准差0.6 s的正态分布。超时6.05 s以外的阴影尾部，是超时将中断的正常执行比例（0.1%）。把$a$往下移到5 s，看紧超时会砍掉的9%；改$\sigma$，看不那么稳定的技能如何迫使更长的超时。
:::

**取消。**当超时触发、操作员按下停止、或智能体循环异常结束时，正在执行的动作必须被*显式*取消——就是上面代码里ROS动作的取消请求——并把机器人带到受控停止。只停止等待、任由运动继续跑的超时，是本章最危险的bug：被告知调用已失败的模型，可能在旧运动仍在继续时发出一个新运动。

**幂等。**假设一个`pick_and_place`请求到达了机器人、机器人执行了它、而回复在网络路上丢了。客户端看到超时并重试。若不留心，机器人会把动作做两遍——去抓第二个没人要的零件。

::: definition 幂等的工具调用 {#def-idempotent}
一次工具调用是**幂等的**，如果用相同参数执行它与执行一次效果相同。查询是幂等的；到绝对目标的`move_to_pose(x, y, z)`是幂等的（第二次调用发现机械臂已在处）；`pick_and_place(object, target)`若先检查物体是否已在目标处就是幂等的；`move_relative(dz = 0.02)`与`dispense(5 ml)`则不是。
:::

::: proposition 用请求标识符实现至多一次执行 {#prop-at-most-once}
让每个动作请求都携带一个由客户端选定的标识符，对每个逻辑动作唯一、且该动作每次重试时原样复用。让服务器在执行请求之前，原子地检查一份持久的标识符记录：若标识符已见过，就不执行而返回存储的结果（或“进行中”）；否则记录标识符并执行，然后存储结果。于是每个逻辑动作至多执行一次，无论其请求被重试或网络复制多少次。
:::

::: proof
考虑一个带标识符$r$的逻辑动作及携带$r$的请求的任意投递序列。第一个到达检查的投递发现$r$未见过，记录它并执行。因为检查与记录是单个原子步骤，每个后来的投递——无论是重试、网络重复还是并发请求——都发现$r$已记录，于是不执行。因为记录是持久的，即使服务器在记录之后重启，这依然成立。所以至多一次执行。“至多一次”正是机器人要的保证：若第一个投递从未到达，就零次执行，客户端的重试提供那一次。
:::

在智能体循环里，标识符是现成的：每个工具调用本就有唯一的`tool_use_id`（或者应用可以每次调用生成一个），而MCP服务器或技能服务器保存记录。配合绝对而非相对的工具参数，它使重试变得安全。

::: example 丢失的回复 {#ex-lost-reply}
一个单元每天处理2,000条命令，平均每条三个动作调用。网络监控显示，0.2%的技能服务器回复在客户端超时之后才到达。若没有请求标识符，客户端会重试每个超时的调用。每天发生多少次重复动作？有了标识符会怎样？
::: solution
每天动作调用数：$2000\times3 = 6000$。迟到回复：$6000\times0.002 = 12$；每次都触发对一个已经执行过的动作的重试，所以每天约12次重复动作——多放了一个零件、多拧了一颗螺钉。（有些重复无害，因为工具恰好是幂等的；对已在目标处的物体做`pick_and_place`会没东西可抓而干净地失败。）有了请求标识符与[[#prop-at-most-once]]，每次重试返回首次执行存储的结果，不发生重复；那12次迟到回复只花了重试的时间。
:::
:::

::: warning “停止”是一类不同的工具
模型的`stop`工具、用户界面里操作员的停止按钮、急停，是三件不同的东西。前两个通过软件请求受控停止，是有用的便利。**急停**是在硬件与安全额定控制器里实现的安全功能（ISO 10218与ISO 13850规定其要求）；它必须在语言模型、网络与智能体进程全都失效时仍然工作。绝不要把模型的`stop`工具或任何软件路径称作急停。
:::

::: history
从语言模型调用外部函数在2022–2023年的研究系统中已有演示（例如Toolformer，Schick等，2023，教模型把API调用插进自己的文本；以及ReAct，Yao等，2022，把推理与动作交织）。OpenAI在2023年6月为其聊天API加上了函数调用，其他主要提供商在几个月内跟进；到JSON schema的受约束解码（“结构化输出”、“strict”工具）在2024–2025年广泛可用。在机器人领域，ROS 2早在多年前就标准化了话题、服务与动作接口（ROS 2首个版本发布于2017年，继承了ROS 1的`actionlib`的动作概念），于是把动作包装成工具是一步之遥。Anthropic于2024年11月发布了模型上下文协议；2025年间它被其他模型提供商与开发工具采用，桥接到ROS的社区MCP服务器相继出现，使从通用助手与基于ROS的机器人对话成为可能。
:::

::: summary
- **工具**（[[#def-tool]]）是一个名字、一段描述（包括何时不该用）与一个JSON输入schema；机器人工具应当是经过验证的技能，数量要少，参数名里带单位。
- **严格**schema与受约束解码（[[#def-constrained]]）保证调用格式良好，但不保证正确；总是在应用里验证schema、允许清单、语义与前置条件，并在机器人里再次强制限值。
- **智能体循环**（[[#alg-agent-loop]]）调用模型，顺序验证并执行工具调用，一条消息返回全部结果，并在任何异常结束时停止机器人，配有轮数、动作数与时间的限制。
- ROS 2**服务**适合简短查询，**动作**（目标、反馈、结果、取消）适合运动；返回用工具词汇的小结果。
- **MCP**（[[#def-mcp]]）把机器人的工具暴露给任何兼容的宿主；暴露技能而不是原始ROS图，并把检查留在服务器里。
- 由实测时长分布定**超时**；超时时**取消**动作；用绝对参数与请求标识符使调用**幂等**，实现至多一次执行（[[#prop-at-most-once]]）。
- 软件停止工具不是急停。
:::

## 习题

::: exercise 由分位数定超时 {level=1 check="5.6"}
某技能的时长近似正态，均值$4.2\,\mathrm s$、标准差$0.6\,\mathrm s$。什么超时会中断1%的正常执行？用$z_{0.99} = 2.326$。（超时以s计，保留一位小数。）
::: solution
$4.2 + 2.326\times0.6 = 5.60\,\mathrm s$。
:::
:::

::: exercise 哪些调用是幂等的？ {level=1}
判断下列是否幂等：`get_scene()`；`move_to_pose(0.5, 0.0, 0.3)`；`rotate_wrist_by(15°)`；`open_gripper()`；`dispense_glue(0.2 ml)`；实现为“在夹爪位于托盘上方之处下降并张开”的`place(obj, left_tray)`。
::: solution
幂等：`get_scene`、绝对的`move_to_pose`、`open_gripper`（第二次调用让它保持张开）。不幂等：`rotate_wrist_by`（相对）、`dispense_glue`（每次调用都加胶）。如上实现的`place`，只有当“第二次调用在空爪时什么都不做”时，它对所持物体的效果才是幂等的；若第二次调用会把空夹爪降进托盘，它就并非无害——实现应当检查是否夹着物体，否则失败。
:::
:::

::: exercise 循环的模型时间 {level=1 check="12.8"}
一条命令需要八轮模型，每轮首词元时间$0.6\,\mathrm s$、输出100个词元、速度100词元/s。模型总时间是多少？（时间以s计。）
::: solution
$8\times(0.6 + 100/100) = 8\times1.6 = 12.8\,\mathrm s$。
:::
:::

::: exercise 没有标识符的重复 {level=2 check="18"}
一个单元每天发出4,500次动作调用；0.4%的回复在超时之后到达，而每个超时的调用都在没有请求标识符的情况下重试一次。假设每个被重试的动作其实都已完成，每天发生多少次重复执行？
::: solution
$4500\times0.004 = 18$次重复执行每天。
:::
:::

::: exercise 写一个schema {level=2}
为工具`place_in_slot`写一个JSON输入schema，它把所持物体放入托盘的十二个槽位`A1`…`C4`之一，带一个可选的、介于5与30 N（默认15 N）之间的插入力上限。使臆造参数成为不可能。
::: solution
```json
{"type": "object",
 "properties": {
   "slot": {"type": "string",
            "enum": ["A1","A2","A3","A4","B1","B2","B3","B4","C1","C2","C3","C4"]},
   "max_force_n": {"type": "number", "minimum": 5, "maximum": 30, "default": 15}},
 "required": ["slot"],
 "additionalProperties": false}
```
枚举好于`^[A-C][1-4]$`这样的模式，因为枚举被显式展示给模型、并由严格解码强制执行；实现仍应检查槽位是空的、且夹着物体。
:::
:::

::: exercise 不取消的超时 {level=2}
设`execute_tool`里的超时不再等待一个`move_to_pose`动作、却不取消它，随后模型又向另一个目标调用`move_to_pose`。逐步描述可能发生什么。
::: solution
超时后第一个运动继续。第二个目标到达动作服务器：依服务器的策略，它被拒绝（忙）、排队（在第一个之后、从一个意外的起点执行）、或抢占第一个（运动中途方向突变）。模型以为第一个运动失败了、机械臂还在起点；机械臂其实还在第一条路径中途或已达其目标。随后的相对推理（“从这里往上升”）基于错误的状态；第二个运动的碰撞检查可能是从错误的起始位形算的。修正：超时时发出取消请求，等待动作已停止的确认（或下令受控停止），读取真实的机器人状态，并把它写进返回给模型的错误结果里。
:::
:::

::: exercise 选服务还是动作 {level=2}
对每个操作选ROS 2服务还是动作并说明理由：(a)算某个位姿的逆运动学；(b)沿一条规划好的轨迹运动；(c)查询夹爪的当前开口；(d)跑一个三分钟的标定流程；(e)切换当前工具坐标系。
::: solution
(a)服务：一次带响应的短计算。(b)动作：耗时数秒，需要反馈与取消。(c)服务（或读状态话题的最近消息）。(d)动作：很长，必须报告进度且可取消。(e)服务：一次快速的配置改动——但它改变之后所有位姿的含义，所以应当是允许清单内、记日志的工具，可能还需要确认。
:::
:::

::: exercise 记录不持久的证明 {level=3}
在[[#prop-at-most-once]]中，假设服务器只在内存里保存标识符记录且可能重启。给出一个导致重复执行的事件序列，并说出能恢复该保证的最弱改动。
::: solution
序列：请求$r$到达；服务器在内存记录$r$并执行动作；回复丢失；服务器重启（内存清空）；客户端重试$r$；服务器发现$r$未见过，再次执行。若对$r$的记录（至少“执行已开始”这一事实）在执行开始*之前*写入持久存储、结果在已知时写入，保证即恢复。重启后，标识符标为“已开始”但没有结果的请求绝不能自动重执行；服务器报告“结果未知”，应用先重新观察场景（单元的传感器是真值来源）再作决定。
:::
:::

::: exercise 为客户做一个机器人MCP服务器 {level=3}
你的公司想随其机械臂附送一个MCP服务器，让客户能从自己的助手指挥它。指定你在版本1里会包含的工具、资源与安全措施，并说明你会有意不放出什么。
::: solution
工具：`get_scene`、`get_robot_state`、`pick_and_place(object_id, location)`、`move_to_named_pose(name)`（位姿由集成商示教，不是任意坐标）、`ask_operator`、`stop`。资源：一份单元描述（命名位置、工作空间、夹爪、负载）、作为可读资源的当前场景、最近50条动作日志。安全措施：仅本地网络或带认证的HTTPS；按客户端配角色的凭证（只读、操作员）；按角色的工具允许清单；速率限制；用于幂等的请求标识符；全部限值检查与日志在服务器里；一个在单元打开时禁用动作工具的“维护模式”。有意不放出的：原始关节或笛卡尔流、任意坐标的运动（直到客户的用法表明需求、且工作空间检查经过证明）、安全配置的参数改动（绝不通过MCP）、控制器的文件访问，以及任何执行代码的工具。指导原则：服务器暴露自动模式下持示教器的操作员用经过验证的程序能做的事——仅此而已。
:::
:::
