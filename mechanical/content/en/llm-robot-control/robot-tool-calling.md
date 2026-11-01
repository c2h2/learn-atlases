The previous chapter let the model write a whole program and then checked it. This chapter takes the opposite approach, which by 2026 had become the default industrial interface: the robot's capabilities are offered to the model as a small set of **typed tools**, each with a name, a description and a JSON schema for its arguments, and the model calls them one or a few at a time in a loop, reading each result before deciding what to do next. Every call is a structured object that can be validated before anything happens, every result is information the model sees before its next decision, and the loop naturally interleaves perception and action. We show how to write tool schemas for robot skills, how structured outputs guarantee well-formed calls, a minimal agent loop in Python, how tools map onto ROS 2 services and actions, how the Model Context Protocol (MCP) exposes a robot to any compatible assistant, and the distributed-systems details that decide whether such a system works on a real network: timeouts, cancellation and idempotency. The general mechanics of function calling are taught in the LLM Atlas chapters [Function calling and tools](/learn/llm/lesson.php?c=agents&l=function-calling), [Agent loops](/learn/llm/lesson.php?c=agents&l=agent-loops) and [Structured output](/learn/llm/lesson.php?c=prompting-rag&l=structured-output).

## Tools as typed skills {#sec-tools}

::: definition Tool {#def-tool}
A **tool** offered to a language model consists of a **name**, a natural-language **description** of what it does and when to use it, and an **input schema** — a JSON Schema object specifying the arguments, their types, units, ranges and which are required. The model requests a call by emitting a structured **tool call** (the tool's name and a JSON object of arguments); the application, not the model, validates and executes it and returns a **tool result** (a JSON object or text, flagged as an error if the call failed), which is appended to the conversation.
:::

For a robot, each tool should be a skill in the sense of [[llm-robot-control/grounded-task-planning#def-skill]]: the largest unit that can be validated on its own. Two schemas show the style.

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

Units are in the property names (`x_m`, `grip_force_n`), so they are visible every time the model writes an argument. Speeds are a two-value enumeration rather than a number: the model chooses intent ("slow" near people or fragile parts), and the controller maps it to calibrated values. The description says *when not* to use the tool, which steers the model away from building grasps out of `move_to_pose` calls. `additionalProperties: false` rejects invented arguments such as `"collision_checking": false`.

::: warning A schema is a contract, not a safety function
The `minimum` and `maximum` in a schema help the model choose sensible values and let the application reject malformed calls cheaply, but they are enforced — if at all — by software that the model's provider or your own validator runs. The workspace limit must also be enforced in the robot process that executes `move_to_pose`, and the safety-rated limits in the robot controller ([[robot-arm-design/arm-safety]]). If someone edits the schema, or a second client calls the robot without it, the lower layers must still hold.
:::

### Designing the tool set

A tool set for a pick-and-place cell might be:

| tool | kind | typical duration | notes |
|---|---|---|---|
| `get_scene` | query | 0.1–0.5 s | object ids, classes, poses, confidences |
| `get_robot_state` | query | < 10 ms | joint positions, gripper state, held object, errors |
| `move_to_pose` | action | 1–5 s | linear move, workspace-checked |
| `grasp` | action | 2–6 s | by object id |
| `place` | action | 2–6 s | at a named location or a pose |
| `pick_and_place` | action | 5–12 s | the common case in one call |
| `ask_operator` | interaction | seconds to minutes | question with options; result is the answer |
| `stop` | action | < 0.1 s | controlled stop, always available |

Two principles from [[llm-robot-control/language-and-robots#sec-latency]] apply. Each tool should do substantial work — `pick_and_place` saves two model turns per object compared with `grasp` then `place`. And the number of tools should stay small (well under twenty): every tool's schema is in the prompt on every turn, and models choose less reliably among many similar tools.

## Structured outputs {#sec-structured}

Early function calling simply asked the model to emit JSON, and models sometimes produced invalid JSON or wrong types. By 2025 the major APIs offered **strict** tool schemas and structured outputs.

::: definition Structured output by constrained decoding {#def-constrained}
**Constrained decoding** restricts, at each generation step, the tokens the model may produce to those that keep the output a valid prefix of some string accepted by a grammar — here, the grammar of JSON objects that satisfy a given schema. The result is guaranteed to parse and to match the schema's structure (property names, types, required fields, enumerations); whether every constraint (numeric ranges, patterns) is enforced during decoding depends on the provider, so the application must still validate.
:::

With Anthropic's Messages API, for example, a tool definition can carry `"strict": true` (with `additionalProperties: false` and an explicit `required` list), which guarantees that the arguments of each call match the schema. Strictness removes a class of nuisance errors — a string where a number belongs, a missing field — but it does not and cannot make the *content* right: a schema-valid `grasp("bolt_m8_1")` when the operator asked for the M6 bolt is still wrong. The application therefore always runs its own validation, in this order: schema (with a library such as `jsonschema`), allow-list (is this tool permitted in the current mode?), semantic checks (does `bolt_m8_1` exist in the latest scene? is the held object compatible with this place target?), then the skill's own precondition checks.

::: example Validating a call {#ex-validate-call}
The model emits `move_to_pose` with arguments `{"x_m": 0.55, "y_m": -0.45, "z_m": 0.12, "speed": "fast"}`. Which checks fail, and what should the tool result say?
::: solution
Two schema violations: $y = -0.45 < -0.40$ (below `minimum`), and `"fast"` is not in the enumeration `["slow", "normal"]`. With strict decoding the enumeration violation would have been impossible; the range violation may or may not be caught by the provider. The application's validator reports both, and the tool result, flagged `is_error`, should be specific enough for the model to fix the call: "y_m = −0.45 is outside the workspace [−0.40, 0.40] m; speed must be 'slow' or 'normal'". Nothing is sent to the robot. A vague error ("invalid input") would cost another model turn of guessing; a precise one usually costs exactly one corrected call.
:::
:::

## The agent loop {#sec-loop}

The loop is the heart of the system. It is short; the care goes into what surrounds each step.

::: algorithm Robot agent loop {#alg-agent-loop}
Input: operator command; tool definitions; system prompt; limits on turns, total time and actions.
1. Start the conversation with the system prompt (role, rules, conventions, cell description) and the command.
2. Call the model with the conversation and the tool definitions.
3. If the model's reply contains no tool calls, it is the final answer: report it to the operator and stop.
4. Otherwise, for each tool call **in order** (motion tools are never executed concurrently): validate it ([[#sec-structured]]); if validation fails, prepare an error result; else execute it with a timeout ([[#sec-timeouts]]) and prepare its result, flagged as an error if the skill failed.
5. Append the model's reply and all the tool results to the conversation, log everything, and return to step 2.
6. At any point, if the turn, time or action limit is exceeded, the operator presses stop, or the model's reply ends for any other reason (output truncated, refusal), stop the robot in a controlled way and report.
:::

In Python with the Anthropic SDK (as of late 2026; other providers' APIs have the same structure with different field names):

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

The function `execute_tool` is where the engineering lives: it validates the arguments against the schema, checks the allow-list and the semantic constraints, dispatches to the skill, enforces the timeout, and converts every failure into a `ToolError` with a precise message. The model is never handed an exception trace, and no exception escapes the loop without stopping the robot.

Three details matter in practice. All results of one model turn go back in **one** message, as the API expects. If a model emits several tool calls in one turn, the loop runs them **sequentially** — a robot cannot pick two objects at once, and running queries in parallel with motions invites races; some APIs also let you disable parallel tool calls. And the loop should *let* the model call tools rather than force a particular one: forcing a tool is not always available (with extended thinking enabled, for example, Claude accepts only `auto` or `none` as the tool choice), and a prompt instruction plus strict schemas usually achieves the same effect.

::: example A loop trace and its cost in time {#ex-trace}
Command: "Put both M6 bolts in the left tray." Trace: (1) model calls `get_scene`; (2) model calls `pick_and_place(bolt_m6_1, left_tray)`; (3) result OK; model calls `pick_and_place(bolt_m6_2, left_tray)`; (4) result: error, "grasp failed: no object held"; model calls `get_scene`; (5) the scene shows `bolt_m6_2` moved by $2\,\mathrm{cm}$; model calls `pick_and_place(bolt_m6_2, left_tray)`; (6) OK; model calls `get_robot_state`; (7) model replies "Both M6 bolts are in the left tray." With $t_{\text{ft}} = 0.7\,\mathrm s$, $90$ output tokens per turn at $100$ tokens/s, and each `pick_and_place` taking $8\,\mathrm s$, estimate the command's duration.
::: solution
Seven model turns at $0.7 + 90/100 = 1.6\,\mathrm s$ each: $11.2\,\mathrm s$. Three `pick_and_place` executions (one failed after its grasp attempt; count it as a full cycle): $24\,\mathrm s$. Two `get_scene` calls and one state query: under $1\,\mathrm s$. Total about $36\,\mathrm s$, of which almost a third is model time. The failed grasp was recovered without the operator because the error result was specific and the model re-observed before retrying. Sanity check: removing the final `get_robot_state` (the cell could append the robot state to every action result automatically) saves one turn, $1.6\,\mathrm s$ — small changes to tool design move the total noticeably.
:::
:::

## Tools on top of ROS 2 {#sec-ros}

Most research and a growing share of industrial arms run their software on ROS 2 (see [[robot-arm-design/software-stack]] and Quigley, Gerkey and Smart). ROS 2 offers three communication patterns, and each tool maps naturally onto one of them.

| ROS 2 pattern | semantics | maps to tools that … | examples |
|---|---|---|---|
| **topic** | continuous publish/subscribe stream | read the latest state (the tool returns the most recent message) | joint states, camera images, detections |
| **service** | request → response, short | query or change something quickly | inverse kinematics, scene query, gripper status, set a parameter |
| **action** | goal → feedback stream → result, cancellable | perform something that takes time | move to pose (e.g. MoveIt's move-group action), follow a trajectory, gripper command, pick |

The action pattern is the important one: it gives a robot tool exactly what it needs — a goal that the server may *reject* (if it fails its checks), *feedback* during execution, a *result* with success or failure, and *cancellation*. A tool wrapper for a gripper using `rclpy` and the standard `control_msgs/action/GripperCommand`:

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

The result returned to the model is small and in the tool's own vocabulary (`opening_m`, `stalled`), not a raw ROS message. A `stalled` gripper with an opening of $9\,\mathrm{mm}$ means "something about 9 mm wide is held" — the success check of a grasp; an opening of zero means the fingers closed on nothing.

## The Model Context Protocol {#sec-mcp}

Writing tool wrappers for one application ties the robot to that application. The **Model Context Protocol** separates the two.

::: definition Model Context Protocol (MCP) {#def-mcp}
The **Model Context Protocol** is an open protocol, published by Anthropic in November 2024 and since implemented by many assistants and frameworks, through which an application hosting a language model (the **host**, with one **client** per connection) discovers and uses capabilities offered by **servers**. A server exposes **tools** (callable functions with JSON-schema inputs), **resources** (readable data such as a scene description or a manual) and **prompts** (templates). Messages are JSON-RPC 2.0, carried over standard input/output for a local server or over HTTP for a remote one.
:::

An MCP server for a robot cell publishes the same tools as above, once, and any MCP-capable host — a chat assistant on an engineer's laptop, an internal operator console, an automated test harness — can use them. A server written with the official Python SDK is compact:

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

The SDK derives the input schema from the type hints and the description from the docstring. During 2025 several open-source MCP servers appeared that bridge to ROS and ROS 2 — exposing topics, services and actions of a running robot to an assistant — and robot vendors began to ship MCP interfaces for their controllers. The protocol makes connection easy, which is exactly why it needs care: an MCP server that offers raw topic publishing gives the model a way around every skill-level check. For a production cell, expose *skills*, not the ROS graph; run the server on the cell's network only, authenticate clients, and keep the allow-list, limits and logging in the server, where every client must pass through them.

::: quiz
An engineer connects a general-purpose assistant to a ROS 2 MCP bridge that can publish to any topic, and asks it to "nudge the arm 2 cm up". The assistant publishes a joint-trajectory message directly. Which statement is correct?
- [ ] This is fine, because the assistant computed the trajectory correctly
- [ ] The MCP protocol prevents unsafe messages
- [x] The motion bypassed every skill-level check; only the controller's own limits and the safety system stood between the message and the arm
- [ ] The motion is safe because it is small
::: solution
A raw topic interface lets the model address the robot below the layer where workspace, collision and object checks live. The trajectory may have been right, but nothing verified it except whatever the joint controller and the safety-rated controller enforce. MCP is a transport for tools and data; it has no notion of robot safety. For development such bridges are useful; in production, expose validated skills only.
:::
:::

## Timeouts, cancellation and idempotency {#sec-timeouts}

A tool call travels from the model to the application, possibly across a network to an MCP server, to a ROS action server and to the controller. Any link can be slow or fail, and the classic distributed-systems problems arrive with it.

**Timeouts.** Every action tool needs a timeout after which the call is declared failed and the action is cancelled. Too short a timeout aborts motions that would have succeeded; too long a timeout leaves the operator waiting while a jammed gripper stalls. A principled choice uses the measured distribution of the skill's duration.

::: example Choosing a timeout from data {#ex-timeout}
Logged durations of a `pick_and_place` skill in normal operation are approximately normally distributed with mean $4.2\,\mathrm s$ and standard deviation $0.6\,\mathrm s$. Choose a timeout so that no more than 0.1% of normal executions are cut short. What fraction would a $5\,\mathrm s$ timeout abort?
::: solution
The one-sided 99.9% point of the standard normal distribution is $z = 3.09$, so the timeout is $4.2 + 3.09\times0.6 = 6.05\,\mathrm s$; round to $6.1\,\mathrm s$. A $5\,\mathrm s$ timeout is $z = (5 - 4.2)/0.6 = 1.33$ standard deviations above the mean and aborts $\Prob(Z > 1.33) = 9.1\%$ of normal executions — far too many. Real duration distributions have a heavier right tail than the normal (occasional replanning, a slow approach), so the timeout should be set from the empirical 99.9th percentile of logged durations and checked again after any change to the skill. Sanity check: $6\,\mathrm s$ is 1.4 times the mean, a common rule-of-thumb ratio for well-behaved skills.
:::
:::

::: widget distribution
dist: normal
params: mu=4.2, sigma=0.6
a: 6.05
b: 9
caption: Duration of a pick-and-place skill, modelled as normal with mean 4.2 s and standard deviation 0.6 s. The shaded tail beyond the timeout of 6.05 s is the fraction of normal executions that the timeout would abort (0.1%). Move $a$ down to 5 s to see the 9% that a tight timeout would cut short; change $\sigma$ to see how a less consistent skill forces a longer timeout.
:::

**Cancellation.** When a timeout fires, the operator presses stop, or the agent loop ends abnormally, the running action must be cancelled *explicitly* — the ROS action's cancel request in the code above — and the robot brought to a controlled stop. A timeout that merely stops waiting, leaving the motion running, is the most dangerous bug in this chapter: the model, told that the call failed, may issue a new motion while the old one continues.

**Idempotency.** Suppose a `pick_and_place` request reaches the robot, the robot performs it, and the reply is lost on the network. The client sees a timeout and retries. Without care, the robot performs the action twice — picking a second part that nobody asked for.

::: definition Idempotent tool call {#def-idempotent}
A tool call is **idempotent** if performing it twice with the same arguments has the same effect as performing it once. Queries are idempotent; `move_to_pose(x, y, z)` to an absolute target is idempotent (the second call finds the arm already there); `pick_and_place(object, target)` is idempotent if it first checks whether the object is already at the target; `move_relative(dz = 0.02)` and `dispense(5 ml)` are not.
:::

::: proposition At-most-once execution with request identifiers {#prop-at-most-once}
Let every action request carry an identifier chosen by the client, unique for each logical action and reused unchanged on every retry of that action. Let the server, before executing a request, atomically check a durable record of identifiers: if the identifier has been seen, it returns the stored outcome (or "in progress") without executing; otherwise it records the identifier and executes, then stores the outcome. Then each logical action is executed at most once, however many times its request is retried or duplicated by the network.
:::

::: proof
Consider one logical action with identifier $r$ and any sequence of deliveries of requests carrying $r$. The first delivery to reach the check finds $r$ unseen, records it and executes. Because the check and the recording are a single atomic step, every later delivery — whether a retry, a network duplicate or a concurrent request — finds $r$ already recorded and does not execute. Because the record is durable, this holds even if the server restarts after recording. Hence at most one execution. "At most once" is the right guarantee for a robot: if the first delivery never arrives, there are zero executions, and the client's retry provides the one.
:::

In the agent loop, the identifier is natural: each tool call already has a unique `tool_use_id` (or the application can generate one per call), and the MCP server or skill server keeps the record. Combined with absolute rather than relative tool arguments, it makes retries safe.

::: example A lost reply {#ex-lost-reply}
A cell processes 2,000 commands a day with an average of three action calls each. Network monitoring shows that 0.2% of replies from the skill server arrive after the client's timeout. Without request identifiers, the client retries every timed-out call. How many duplicate actions occur per day, and what changes with identifiers?
::: solution
Action calls per day: $2000\times3 = 6000$. Late replies: $6000\times0.002 = 12$; each triggers a retry of an action that already ran, so about 12 duplicate actions per day — a second part placed, a second screw driven. (Some duplicates are harmless because the tool happens to be idempotent; a `pick_and_place` of an object that is already in its target finds nothing to pick and fails cleanly.) With request identifiers and [[#prop-at-most-once]], each retry returns the stored outcome of the first execution and no duplicates occur; the 12 late replies cost only the time of the retries.
:::
:::

::: warning "Stop" is a different kind of tool
The model's `stop` tool, the operator's stop button in the user interface and the emergency stop are three different things. The first two request a controlled stop through software and are useful conveniences. The **emergency stop** is a safety function implemented in hardware and the safety-rated controller (ISO 10218 and ISO 13850 set the requirements); it must work when the language model, the network and the agent process have all failed. Never present the model's `stop` tool, or any software path, as an emergency stop.
:::

::: history
Calling external functions from a language model was demonstrated in research systems in 2022–2023 (for example Toolformer, Schick et al., 2023, which taught a model to insert API calls into its text, and ReAct, Yao et al., 2022, which interleaved reasoning and actions). OpenAI added function calling to its chat API in June 2023, and the other major providers followed within months; constrained decoding to JSON schemas ("structured outputs", "strict" tools) became widely available in 2024–2025. In robotics, ROS 2 had standardised the topic, service and action interfaces years earlier (ROS 2 was first released in 2017, building on the action concept of ROS 1's `actionlib`), so wrapping actions as tools was a short step. Anthropic published the Model Context Protocol in November 2024; during 2025 it was adopted by other model providers and development tools, and community MCP servers bridging to ROS appeared, making it possible to talk to a ROS-based robot from a general-purpose assistant.
:::

::: summary
- A **tool** ([[#def-tool]]) is a name, a description (including when not to use it) and a JSON input schema; robot tools should be validated skills, few in number, with units in their argument names.
- **Strict** schemas and constrained decoding ([[#def-constrained]]) guarantee well-formed calls, not correct ones; always validate schema, allow-list, semantics and preconditions in the application, and enforce limits again in the robot.
- The **agent loop** ([[#alg-agent-loop]]) calls the model, validates and executes tool calls sequentially, returns all results in one message, and stops the robot on any abnormal end, with limits on turns, actions and time.
- ROS 2 **services** fit short queries, **actions** (goal, feedback, result, cancel) fit motions; return small results in the tool's vocabulary.
- **MCP** ([[#def-mcp]]) exposes a robot's tools to any compatible host; expose skills, not the raw ROS graph, and keep checks in the server.
- Set **timeouts** from the measured duration distribution; on timeout **cancel** the action explicitly; make calls **idempotent** with absolute arguments and request identifiers for at-most-once execution ([[#prop-at-most-once]]).
- A software stop tool is not an emergency stop.
:::

## Exercises

::: exercise Timeout from a percentile {level=1 check="5.6"}
A skill's duration is approximately normal with mean $4.2\,\mathrm s$ and standard deviation $0.6\,\mathrm s$. What timeout aborts 1% of normal executions? Use $z_{0.99} = 2.326$. (Enter the timeout in s to one decimal place.)
::: solution
$4.2 + 2.326\times0.6 = 5.60\,\mathrm s$.
:::
:::

::: exercise Which calls are idempotent? {level=1}
Classify as idempotent or not: `get_scene()`; `move_to_pose(0.5, 0.0, 0.3)`; `rotate_wrist_by(15°)`; `open_gripper()`; `dispense_glue(0.2 ml)`; `place(obj, left_tray)` implemented as "lower and open wherever the gripper is above the tray".
::: solution
Idempotent: `get_scene`, the absolute `move_to_pose`, `open_gripper` (a second call leaves it open). Not idempotent: `rotate_wrist_by` (relative), `dispense_glue` (each call adds glue). `place` as described is idempotent in its effect on the held object only if a second call with nothing held does nothing; if the second call lowers the empty gripper into the tray, it is not harmless — the implementation should check that an object is held and fail otherwise.
:::
:::

::: exercise Model time of a loop {level=1 check="12.8"}
A command needs eight model turns, each with time to first token $0.6\,\mathrm s$ and 100 output tokens at 100 tokens/s. What is the total model time? (Enter the time in s.)
::: solution
$8\times(0.6 + 100/100) = 8\times1.6 = 12.8\,\mathrm s$.
:::
:::

::: exercise Duplicates without identifiers {level=2 check="18"}
A cell makes 4,500 action calls a day; 0.4% of replies arrive after the timeout and every timed-out call is retried once without a request identifier. Assuming every retried action had in fact completed, how many duplicate executions occur per day?
::: solution
$4500\times0.004 = 18$ duplicates per day.
:::
:::

::: exercise Write a schema {level=2}
Write a JSON input schema for a tool `place_in_slot` that places the held object in one of the twelve slots `A1`…`C4` of a tray, with an optional insertion force limit between 5 and 30 N (default 15 N). Make invented arguments impossible.
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
An enumeration is better than a pattern such as `^[A-C][1-4]$` because it is shown to the model explicitly and is enforced by strict decoding; the implementation still checks that the slot is free and that an object is held.
:::
:::

::: exercise A timeout that does not cancel {level=2}
Describe step by step what can happen if the timeout in `execute_tool` stops waiting for a `move_to_pose` action but does not cancel it, and the model then calls `move_to_pose` to a different target.
::: solution
The first motion continues after the timeout. The second goal arrives at the action server: depending on the server's policy it is rejected (busy), queued (executed after the first, from an unexpected start), or it pre-empts the first (an abrupt change of direction mid-motion). The model believes the first move failed and the arm is at its starting point; the arm is in fact somewhere along the first path or at its target. Subsequent relative reasoning ("move up from here") is based on a wrong state; collision checks for the second motion may have been computed from the wrong start configuration. Fix: on timeout, send the cancel request, wait for confirmation that the action has stopped (or command a controlled stop), read the actual robot state, and include it in the error result returned to the model.
:::
:::

::: exercise Choosing service or action {level=2}
For each operation choose a ROS 2 service or action and justify: (a) compute inverse kinematics for a pose; (b) move along a planned trajectory; (c) query the gripper's current opening; (d) run a three-minute calibration routine; (e) switch the active tool frame.
::: solution
(a) Service: a short computation with a response. (b) Action: takes seconds, needs feedback and cancellation. (c) Service (or read the latest message on a state topic). (d) Action: long, must report progress and be cancellable. (e) Service: a quick configuration change — but one that changes the meaning of all later poses, so it should be an allow-listed, logged tool, possibly requiring confirmation.
:::
:::

::: exercise Proof with a non-durable record {level=3}
In [[#prop-at-most-once]], suppose the server keeps its record of identifiers only in memory and may restart. Give a sequence of events that leads to a duplicate execution, and state the weakest change that restores the guarantee.
::: solution
Sequence: request $r$ arrives; the server records $r$ in memory and executes the action; the reply is lost; the server restarts (memory cleared); the client retries $r$; the server finds $r$ unseen and executes again. The guarantee is restored if the record of $r$ (at least the fact that execution has started) is written to durable storage *before* execution begins, and outcomes are written when known. After a restart, requests whose identifiers are marked "started" but have no outcome must not be re-executed automatically; the server reports "outcome unknown", and the application re-observes the scene (the cell's sensors are the ground truth) before deciding.
:::
:::

::: exercise A robot MCP server for a customer {level=3}
Your company wants to ship an MCP server with its arm so that customers can command it from their own assistants. Specify the tools, resources and security measures you would include in version 1, and explain what you would deliberately leave out.
::: solution
Tools: `get_scene`, `get_robot_state`, `pick_and_place(object_id, location)`, `move_to_named_pose(name)` (poses taught by the integrator, not arbitrary coordinates), `ask_operator`, `stop`. Resources: a cell description (named locations, workspace, gripper, payload), the current scene as a readable resource, the last 50 action log entries. Security: local network only or authenticated HTTPS; per-client credentials with roles (read-only, operator); an allow-list of tools per role; rate limits; request identifiers for idempotency; all limit checks and logging in the server; a "maintenance mode" that disables action tools when the cell is open. Left out deliberately: raw joint or Cartesian streaming, arbitrary-coordinate moves (until customers' use shows a need and the workspace check is proven), parameter changes to the safety configuration (never through MCP), file access to the controller, and any tool that executes code. The guiding rule: the server exposes what an operator at the pendant could do in automatic mode with validated programs — nothing more.
:::
:::
