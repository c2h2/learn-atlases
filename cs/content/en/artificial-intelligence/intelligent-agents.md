A thermostat reads the temperature and switches the heating on or off. A chess program reads a board position and chooses a move. A route planner reads a map, the traffic reports and your destination and proposes a route; a robot vacuum cleaner reads its bump and dirt sensors and decides where to drive next. These systems differ enormously in sophistication, but they share a shape: each repeatedly **perceives** something about its surroundings and **acts** on them, and each is judged by how well the resulting course of events serves some purpose. Artificial intelligence, in the view taken by this course and by most modern textbooks, is the study of how to build such systems so that they act *well* — how to design **rational agents**.

This chapter sets up the vocabulary for the whole course. We define agents and environments precisely, say what it means for an agent to be rational, classify environments by the properties that make them easy or hard, and describe the main ways of structuring an agent program — from simple reflexes to agents that plan, reason about probabilities and learn. Along the way we prove three small but instructive results: a simple reflex agent can be perfectly rational in a simple world, the same kind of agent can fail forever once it loses one sensor (and randomisation rescues it), and most agent functions cannot be implemented by any program at all.

## Agents and environments

::: definition Agent, percept and action {#def-agent}
An **agent** interacts with an **environment** in discrete time steps $t = 1, 2, \dots$. At each step it receives a **percept** $p_t$ from a set $P$ of possible percepts and then performs an **action** $a_t$ from a set $A$ of possible actions. The **percept sequence** at time $t$ is $p_{1:t} = \langle p_1, \dots, p_t\rangle$. The agent's behaviour is described by its **agent function**
$$
f\colon P^+ \to A, \qquad a_t = f(p_{1:t}),
$$
where $P^+$ is the set of non-empty finite sequences of percepts. An **agent program** is a concrete program, running on some physical machine (the **architecture**), that implements an agent function: it receives one percept at a time and returns one action at a time, keeping whatever internal state it needs.
:::

The distinction between the agent *function* and the agent *program* matters. The function is a mathematical object — an infinite table, in principle — and it is what an outside observer sees. The program is what we write. Two very different programs may implement the same function; and, as we shall see in [[#thm-uncountable]], most functions have no program at all.

Here is the running example of this chapter, a deliberately tiny world. A robot vacuum cleaner lives in a world of two squares, $A$ (on the left) and $B$ (on the right). Each square is either dirty or clean. The agent perceives which square it is in and whether that square is dirty, so a percept is a pair such as $(A, \textit{Dirty})$; there are $\lvert P\rvert = 4$ percepts. Its actions are *Left*, *Right*, *Suck* and, in some variants, *NoOp* (do nothing). *Suck* cleans the current square; *Left* and *Right* move to $A$ and $B$ respectively (moving left from $A$ leaves the agent at $A$).

A simple agent program for this world is a **condition–action rule** set:

```python
def reflex_vacuum_agent(percept):
    location, dirty = percept
    if dirty:
        return "Suck"
    return "Right" if location == "A" else "Left"
```

It implements the agent function whose table begins

| percept sequence | action |
|---|---|
| $(A, \textit{Clean})$ | *Right* |
| $(A, \textit{Dirty})$ | *Suck* |
| $(B, \textit{Clean})$ | *Left* |
| $(B, \textit{Dirty})$ | *Suck* |
| $(A, \textit{Clean}), (A, \textit{Clean})$ | *Right* |
| $(A, \textit{Clean}), (A, \textit{Dirty})$ | *Suck* |
| $\vdots$ | $\vdots$ |

— a table in which the action depends only on the last percept. Such an agent is called a **simple reflex agent**. Whether it is a *good* agent depends on what we want from it, which is the subject of the next section.

::: example How large is the table? {#ex-table-size}
An agent that simply looks up its action in an explicit table indexed by percept sequences (a **table-driven agent**) needs one entry for every sequence it might see. How many entries are needed for a lifetime of $T$ steps with $\lvert P\rvert$ possible percepts? Evaluate for the vacuum world with $T = 10$, and for a camera producing $640 \times 480$ greyscale images with $256$ levels, for $T = 1$.
::: solution
A percept sequence of length $t$ is an element of $P^t$, so there are $\lvert P\rvert^t$ of them, and the table needs
$$
\sum_{t=1}^{T} \lvert P\rvert^t = \frac{\lvert P\rvert^{T+1} - \lvert P\rvert}{\lvert P\rvert - 1}
$$
entries (for $\lvert P\rvert \ge 2$). For the vacuum world, $\lvert P\rvert = 4$ and $T = 10$ give $(4^{11} - 4)/3 = 1{,}398{,}100$ entries — already more than a million for ten steps in a two-square world. For the camera, a single image is one of $256^{640 \cdot 480} = 2^{2{,}457{,}600}$ percepts, so even a table for a single step has about $10^{739{,}811}$ entries, against roughly $10^{80}$ atoms in the observable universe. The table-driven agent is a thought experiment, not a design: the whole challenge of AI is to write *small programs* that produce rational behaviour from *large* percept histories.
:::
:::

::: widget plot
f: 4^x; 3^x; 2^x
x: 1, 10
labels: \lvert P\rvert = 4; \lvert P\rvert = 3; \lvert P\rvert = 2
caption: The number of percept sequences of length $t$, $\lvert P\rvert^t$, for two tiny percept sets. Even a world with four possible percepts needs more than a million table rows for sequences of length 10 alone, and each extra step multiplies the count by $\lvert P\rvert$. Change the plotting range to see how quickly any table-driven design becomes impossible.
:::

## Rationality

An agent's actions cause the environment to pass through a sequence of states. We judge the agent by that sequence.

::: definition Performance measure and rational agent {#def-rational}
A **performance measure** assigns a number to each sequence of environment states (the higher the better). Given the performance measure, the agent's prior knowledge of the environment and the actions it can perform, an agent is **rational** if for every possible percept sequence it selects an action that maximises the *expected* value of the performance measure, given the evidence provided by the percept sequence and its built-in knowledge.
:::

Four points about this definition are worth making explicit.

1. **The measure is about the environment, not the agent's opinion.** The designer decides what counts as success. A vacuum cleaner rewarded for "amount of dirt sucked up" could maximise it by dumping the dirt back on the floor and sucking it up again; a better measure rewards clean floors. As a rule, it is better to design performance measures according to what one actually wants in the environment than according to how one thinks the agent should behave.
2. **Rationality is not omniscience.** A rational agent maximises *expected* performance given what it has perceived. If you cross the road after looking both ways and are hit by a meteorite, you were not irrational. Conversely, an agent that does not look before crossing is irrational even if it happens to survive: it failed to take an information-gathering action whose expected value was positive.
3. **Rationality is relative to the agent's knowledge and actions.** An agent that does not know the geography of its world cannot be blamed for exploring it, and an agent without a *NoOp* action cannot be blamed for moving.
4. **Rationality is defined per percept sequence.** This is what makes the definition usable: it constrains the agent function entry by entry, and the agent program must get every entry right.

To make this concrete we need to fix the performance measure. Consider the following assumptions about the vacuum world:

- the performance measure awards one point for each clean square at the end of each time step, over a lifetime of $T$ steps;
- the geography is known in advance, but the initial dirt and the agent's initial location are not;
- dirt never reappears once a square is clean; *Suck* cleans the current square; *Left* and *Right* move as described above and are free;
- the agent perceives its location and whether the current square is dirty.

::: theorem The reflex vacuum agent is rational {#thm-reflex-rational}
Under the assumptions above, the simple reflex agent `reflex_vacuum_agent` achieves, from every initial state, the largest score achievable by *any* agent from that state. In particular it is rational, whatever the probabilities of the initial states.
:::

::: proof
Let $c_t \in \{0, 1, 2\}$ be the number of clean squares after step $t$ (with $c_0$ the initial number), so the score is $\sum_{t=1}^T c_t$. We show that the reflex agent maximises every $c_t$ simultaneously; then it maximises their sum.

First an upper bound valid for every agent. Only *Suck* changes the dirt, and it cleans only the current square, so $c_t \le c_{t-1} + 1$, with equality only if the agent sucks on a dirty square at step $t$; and $c_t \le 2$. Moreover, if the agent's current square is clean at the start of a step while the other square is dirty, then $c_t = c_{t-1}$ for that step (it cannot clean the other square without first moving there).

Now distinguish the initial situations. (i) $c_0 = 2$: every agent has $c_t = 2$ for all $t$, the maximum. (ii) Exactly one square is dirty and the agent is on it: the reflex agent sucks, so $c_t = 2$ for all $t \ge 1$, which is the maximum. (iii) Exactly one square is dirty and the agent is on the other one: by the remark above every agent has $c_1 = 1$, and then $c_t \le 2$; the reflex agent moves at step 1 and sucks at step 2, so it has $c_1 = 1$ and $c_t = 2$ for $t \ge 2$ — again maximal at every step. (iv) Both squares are dirty: every agent has $c_1 \le 1$; and $c_2 \le 1$ as well, because after step 1 either the agent has not sucked (so $c_1 = 0$ and $c_2 \le 1$) or it has sucked its own square and stands on a clean square with the other one dirty (so $c_2 = c_1 = 1$). The reflex agent achieves $c_1 = 1$ (suck), $c_2 = 1$ (move) and $c_t = 2$ for $t \ge 3$; since $c_t \le 2$ always, it is maximal at every step.

So in every case the reflex agent attains the pointwise maximum of each $c_t$, hence of the score. An agent that maximises the score in every state maximises the expected score under any probability distribution over initial states, and it does so after every percept sequence, which is [[#def-rational]].
:::

The theorem depends on every one of its assumptions. Change one, and the same agent becomes irrational.

::: example Charging for movement {#ex-move-cost}
Keep the vacuum world, but subtract one point for each *Left* or *Right* and give the agent a *NoOp* action. Compare the reflex agent with a **model-based** agent that remembers which squares it has seen clean and does nothing once both are clean. Simulate both for $T = 1000$ steps from each of the eight initial states.
::: solution
The reflex agent never stops moving: once both squares are clean it shuttles between them, paying one point per step. The model-based agent keeps a tiny internal state:

```python
from itertools import product

def run(agent, loc, dirt, T, move_cost):
    """Simulate the two-square world for T steps; return the score."""
    dirt = dict(dirt); memory = {}; score = 0
    for t in range(T):
        action = agent((loc, dirt[loc]), memory)
        if action == "Suck":
            dirt[loc] = False
        elif action in ("Left", "Right"):
            loc = "A" if action == "Left" else "B"
            score -= move_cost
        score += sum(not d for d in dirt.values())   # +1 per clean square per step
    return score

def reflex(percept, memory):
    loc, dirty = percept
    if dirty: return "Suck"
    return "Right" if loc == "A" else "Left"

def model_based(percept, memory):
    loc, dirty = percept
    memory[loc] = "clean"                     # after this step it will be clean
    if dirty: return "Suck"
    other = "B" if loc == "A" else "A"
    if memory.get(other) == "clean": return "NoOp"
    return "Right" if loc == "A" else "Left"

for cost in (0, 1):
    for name, agent in (("reflex", reflex), ("model-based", model_based)):
        scores = [run(agent, loc, {"A": a, "B": b}, 1000, cost)
                  for loc, a, b in product("AB", (True, False), (True, False))]
        print(f"move cost {cost}: {name:12s} scores {scores} mean {sum(scores)/8}")
```

```console
$ python3 vacuum.py
move cost 0: reflex       scores [1998, 2000, 1999, 2000, 1998, 1999, 2000, 2000] mean 1999.25
move cost 0: model-based  scores [1998, 2000, 1999, 2000, 1998, 1999, 2000, 2000] mean 1999.25
move cost 1: reflex       scores [1000, 1001, 1000, 1000, 1000, 1000, 1001, 1000] mean 1000.25
move cost 1: model-based  scores [1997, 1999, 1998, 1999, 1997, 1998, 1999, 1999] mean 1998.25
```

The initial states are listed in the order (location, $A$ dirty, $B$ dirty) $= (A, \text{yes}, \text{yes}), (A, \text{yes}, \text{no}), \dots, (B, \text{no}, \text{no})$. With free movement the two agents score identically, as [[#thm-reflex-rational]] predicts: both attain the maximum. With a movement cost the reflex agent loses almost half its score. For instance from $(A, \text{yes}, \text{yes})$ the model-based agent sucks ($+1$), moves ($-1 + 1$), sucks ($+2$) and then idles for $997$ steps ($+2$ each): $1 + 0 + 2 + 1994 = 1997$. The memory costs one bit per square and buys a factor of two.

Notice that the model-based agent still moves once even when both squares start clean: it cannot know that the other square is clean without looking. Given a uniform prior over initial states, that one look is worth it — the other square is dirty half the time, and finding out early is worth hundreds of points.
:::
:::

::: warning Rational does not mean successful, and a good score does not mean rational
Students often read "rational" as "gets the best outcome". It does not: rationality is about the *expected* performance given the percepts so far. An agent that bets everything on a long shot and wins was lucky, not rational; an agent that takes a well-judged risk and loses was unlucky, not irrational. Conversely, it is easy to build an agent that scores well on the test cases you happened to try while making poor decisions in situations you did not test. Evaluate agents over the whole distribution of environments they will face — and choose the performance measure with care, because an agent that optimises the wrong measure well is worse than one that optimises the right measure badly.
:::

::: quiz
A vacuum agent that perceives only "dirty" or "clean" (not its location) is placed in the two-square world with free movement. Which statement is correct?

- [ ] It can be rational only if it never moves.
- [x] Whether it is rational depends on what it does for each percept sequence; an agent that remembers past percepts can still clean both squares reliably.
- [ ] Rationality requires the agent to know its location, so no such agent is rational.
- [ ] It is rational exactly when it is a simple reflex agent.
::: solution
Rationality is relative to the agent's percepts and knowledge ([[#def-rational]]): an agent is not irrational for lacking a sensor, only for making poor use of the information it has. An agent with memory can, for example, alternate *Right*, *Suck* if dirty, *Left*, *Suck* if dirty, which cleans both squares whatever its starting point. A simple reflex agent is in fact the *worst* choice here — see [[#thm-blind-reflex]].
:::
:::

## Environments

The design of an agent depends heavily on its environment. The **task environment** is specified by four things, often abbreviated **PEAS**: the **P**erformance measure, the **E**nvironment, the **A**ctuators and the **S**ensors.

::: example PEAS for three agents {#ex-peas}
Give a PEAS description for an automated taxi, a program that plays chess against a human with a clock, and a spam filter.
::: solution
| agent | performance measure | environment | actuators | sensors |
|---|---|---|---|---|
| automated taxi | safe arrival, journey time, legality, comfort, fare income | roads, other traffic, pedestrians, passengers, weather | steering, accelerator, brake, indicators, display | cameras, radar or lidar, GPS, speedometer, odometer, microphone |
| chess program | games won (draws count half), within the time control | the board, the opponent, the clock | move output | move input (the opponent's moves), clock |
| spam filter | spam blocked, legitimate mail delivered (blocking a wanted message is usually costed much more highly than letting a spam message through) | the user's mailbox, senders, the user's corrections | mark as spam, deliver, quarantine | message headers and text, the user's "not spam" clicks |

The exercise is less about the table than about the thinking it forces. The taxi's measure has several conflicting components, so the designer must decide how to trade them off — the question of utility that [[artificial-intelligence/decision-making]] takes up. The spam filter's measure is asymmetric, which changes the best decision threshold even with the same probability estimates.
:::
:::

Environments differ along several dimensions, and each dimension decides which techniques of this course apply.

::: definition Properties of task environments {#def-env-properties}
- **Fully** or **partially observable**: is the complete relevant state of the environment available in each percept? (An environment with no sensors at all is **unobservable**.)
- **Single-agent** or **multi-agent**: are there other agents whose performance measures depend on our actions? A multi-agent environment may be **competitive** (chess) or **cooperative** (cars avoiding collisions), or mixed.
- **Deterministic** or **nondeterministic**: is the next state completely determined by the current state and the action? A nondeterministic environment whose outcomes have known probabilities is called **stochastic**.
- **Episodic** or **sequential**: does experience divide into independent episodes (classify this image, then the next), or can the current action affect all future decisions?
- **Static** or **dynamic**: can the environment change while the agent deliberates? (It is **semi-dynamic** if only the score changes, as in chess with a clock.)
- **Discrete** or **continuous**: in the states, in time, in percepts and in actions.
- **Known** or **unknown**: does the *agent* (or its designer) know the rules — the outcomes or outcome probabilities of every action?
:::

"Known" is a property of the agent's knowledge, not of the world: a known environment can be partially observable (solitaire card games: you know the rules but not the order of the cards), and an unknown one can be fully observable (a new video game whose screen shows everything but whose buttons you have not yet tried).

::: example Classifying environments {#ex-classify}
Classify the following along the dimensions of [[#def-env-properties]]: (a) a crossword puzzle; (b) chess with a clock; (c) poker; (d) taxi driving; (e) medical diagnosis; (f) detecting defects in images of parts on a production line.
::: solution
| task | observable | agents | deterministic | episodic | static | discrete |
|---|---|---|---|---|---|---|
| crossword | fully | single | deterministic | sequential | static | discrete |
| chess with clock | fully | multi (competitive) | deterministic | sequential | semi-dynamic | discrete |
| poker | partially | multi (competitive) | stochastic | sequential | static | discrete |
| taxi driving | partially | multi (mixed) | stochastic | sequential | dynamic | continuous |
| medical diagnosis | partially | single (patient not modelled as an agent) | stochastic | sequential | dynamic | continuous |
| part inspection | fully (per image) | single | deterministic (per image) | episodic | semi-dynamic | continuous percepts |

Some entries are judgement calls — the point of the classification is to choose techniques. Chess is deterministic but adversarial, so it calls for game-tree search ([[artificial-intelligence/adversarial-search]]); poker adds hidden information and chance. Taxi driving has every hard property at once, which is why it took decades longer than chess. The inspection task is episodic: each decision stands alone, and the classic tool is a learned classifier, a topic of the LLM Atlas.
:::
:::

The hardest case is partially observable, multi-agent, stochastic, sequential, dynamic, continuous and unknown — which describes most of the real world. The course moves through these dimensions roughly in order: fully observable deterministic single-agent problems first ([[artificial-intelligence/search]]), then other agents ([[artificial-intelligence/adversarial-search]]), structured states ([[artificial-intelligence/constraint-satisfaction]], [[artificial-intelligence/logical-agents]], [[artificial-intelligence/planning]]), uncertainty ([[artificial-intelligence/probabilistic-reasoning]], [[artificial-intelligence/decision-making]]), and finally unknown environments ([[artificial-intelligence/reinforcement-learning]]).

### Partial observability defeats simple reflexes

Remove the location sensor from the vacuum agent, so that it perceives only *Dirty* or *Clean*. Its world is now partially observable, and the consequences are drastic for simple reflex agents.

::: theorem Blind reflex agents can fail forever {#thm-blind-reflex}
In the two-square world with free movement, let the agent perceive only whether its current square is dirty. Then for every deterministic simple reflex agent there is an initial state from which some square is never cleaned. On the other hand, the randomised reflex agent that sucks if the square is dirty and otherwise moves *Left* or *Right* with probability $1/2$ each cleans both squares with probability $1$, from every initial state.
:::

::: proof
A deterministic simple reflex agent is a map $f$ from $\{\textit{Dirty}, \textit{Clean}\}$ to actions. A square becomes clean only when the agent performs *Suck* on it while it is dirty, which happens only if $f(\textit{Dirty}) = \textit{Suck}$; if not, start from any state with a dirty square, and that square is never cleaned. So assume $f(\textit{Dirty}) = \textit{Suck}$ and look at $f(\textit{Clean})$. If it is *Suck* or *NoOp*, start the agent on a clean square with the other square dirty: it never moves, and the other square stays dirty forever. If it is *Left*, start the agent on $A$ with $A$ clean and $B$ dirty: it perceives *Clean* and moves left, which leaves it on $A$, and this repeats forever. The case *Right* is symmetric (start on $B$, clean, with $A$ dirty). In every case some square stays dirty.

For the randomised agent: whenever it stands on a dirty square it sucks immediately, so it is enough that it eventually visits every dirty square. While some square is dirty and the agent is on a clean square, each step moves it to the other square with probability $1/2$ (the move in the direction of the other square; the other direction leaves it where it is). The probability that it has not reached the other square after $k$ such steps is $2^{-k} \to 0$, so with probability $1$ it arrives, sucks, and the world is clean.
:::

Randomisation helps precisely because the agent cannot tell its situations apart: any deterministic reaction to "clean" is a bad choice in one of the indistinguishable situations, while a random reaction is reasonable in all of them. But randomisation is a crutch. A **model-based** agent that remembers what it has done — for instance one that alternates its direction after each move — does better still, because it uses the information in its percept history.

::: example How long does the blind agent take? {#ex-blind-time}
Compute the expected number of steps the randomised blind agent of [[#thm-blind-reflex]] needs to clean both squares, from each initial state.
::: solution
Let $h(s)$ be the expected number of steps to reach a clean world from state $s$. A clean world has $h = 0$. If the agent stands on a dirty square it sucks: $h(s) = 1 + h(s')$ for the state $s'$ with that square cleaned. If it stands on a clean square, then $h(s) = 1 + \tfrac12 h(s_{\text{stay}}) + \tfrac12 h(s_{\text{move}})$.

On $A$ with only $B$ dirty: $h = 1 + \tfrac12 h + \tfrac12 h(B, B \text{ dirty})$, and $h(B, B \text{ dirty}) = 1$ (suck). So $\tfrac12 h = 1 + \tfrac12$, giving $h = 3$. On $A$ with only $A$ dirty, $h = 1$. With both dirty, the agent sucks first and is then in the previous situation: $h = 1 + 3 = 4$. By symmetry the values from $B$ are the same. A short program confirms this, by iterating the equations to a fixed point and by simulation with a fixed seed (100,000 runs from $A$ with both squares dirty gave a mean of $3.99$). The location-aware reflex agent needs at most $3$ steps; the cost of blindness here is one expected step, but in a corridor of $n$ squares a blind random walk needs on the order of $n^2$ steps where a sighted sweep needs $n$.
:::
:::

::: widget markov
matrix: 0.5,0.5,0; 0,0,1; 0,0,1
states: on A (clean), B dirty; on B, B dirty; both clean
start: 0
steps: 10
caption: The blind randomised agent from $A$ with only $B$ dirty, as a Markov chain. From state 0 it stays on $A$ or moves to $B$ with probability $1/2$ each; on $B$ it sucks and the world is clean. Run the walk several times and watch the distribution after $n$ steps: the probability of still being in state 0 halves at every step, so the expected number of steps is $2 + 1 = 3$, as computed in the example.
:::

## Structuring agent programs

The agent function says *what* to do; the agent program has to compute it from a short description. Textbooks distinguish a handful of program structures, in increasing order of generality.

1. A **simple reflex agent** chooses its action from the current percept alone, using condition–action rules. It is fast and small, and correct only when the right action can be read off the current percept — essentially when the environment is fully observable.
2. A **model-based reflex agent** keeps an internal **state** that summarises the percept history. It updates the state with a **transition model** (how the world evolves, and how its actions affect it) and a **sensor model** (how the state of the world shows up in percepts). It handles partial observability, as the memory in [[#ex-move-cost]] did. Its state might be a belief about the world's state, or a probability distribution over states — the **belief state** that [[artificial-intelligence/probabilistic-reasoning]] computes with the forward algorithm.
3. A **goal-based agent** knows which states are desirable and chooses actions by considering their future consequences: "what will happen if I do this, and will it bring me closer to the goal?". This is the province of **search** and **planning**. It is more flexible than a reflex agent — change the goal, and the same program does something different — at the price of computation.
4. A **utility-based agent** has a **utility function** that scores states (or histories) by how desirable they are, so that it can trade off conflicting goals and weigh likely outcomes against unlikely ones. A rational utility-based agent chooses the action with the highest *expected* utility.
5. A **learning agent** improves any of these components from experience: a *critic* compares outcomes with the performance standard, a *learning element* updates the agent's rules, models or utility estimates, and a *problem generator* suggests exploratory actions.

These are not rival designs so much as layers; a self-driving car has reflexes (emergency braking), models (tracking other vehicles), goals (the destination), utilities (comfort against speed) and learned components (perception).

A second axis is how the agent **represents** the state of the world:

- **atomic**: a state is an indivisible label ("we are in Bucharest"); search algorithms ([[artificial-intelligence/search]], [[artificial-intelligence/adversarial-search]]) and Markov decision processes ([[artificial-intelligence/decision-making]]) work at this level;
- **factored**: a state is a vector of variable values ("fuel $= 0.4$, position $= (3, 7)$, door open"); constraint satisfaction, propositional logic, planning and Bayesian networks exploit this structure;
- **structured**: a state contains objects and relations between them ("the truck in front of me is backing into the dairy farm's driveway"); first-order logic ([[artificial-intelligence/logical-agents]]) represents it.

More expressive representations describe the world more concisely — a rule of chess takes a page in first-order logic but thousands of pages in propositional logic — but reasoning with them is harder.

::: quiz
A delivery robot keeps track of which rooms it has visited and chooses routes to the next pick-up by searching a map. Which descriptions fit it?

- [x] Model-based, since it maintains internal state.
- [x] Goal-based, since it chooses actions by considering where they lead.
- [ ] Simple reflex, since it reacts to its sensors.
- [ ] Table-driven, since a map is a table.
::: solution
Remembering visited rooms is internal state (model-based), and route search considers the consequences of actions with respect to a goal (goal-based). It is not a simple reflex agent, whose action depends only on the current percept, and the map is a model of the world used to compute actions, not a table from percept sequences to actions.
:::
:::

### Not every agent function has a program

Is every agent function implementable? The question is not idle: it separates the specification (the function) from the engineering (the program), and it has a crisp answer.

::: theorem Most agent functions are not computable {#thm-uncountable}
Let $P$ be a finite set of percepts with $\lvert P\rvert \ge 1$ and $A$ a set of actions with $\lvert A\rvert \ge 2$. Then the set of agent functions $f\colon P^+ \to A$ is uncountable, while the set of agent programs (in any fixed programming language) is countable. Hence there are agent functions that no program implements.
:::

::: proof
The set $P^+$ is countably infinite: list sequences by length, and sequences of the same length in lexicographic order, $s_1, s_2, s_3, \dots$. Fix two distinct actions $a, b \in A$. Suppose the agent functions with values in $\{a, b\}$ could be listed as $f_1, f_2, \dots$. Define $g(s_i) = b$ if $f_i(s_i) = a$, and $g(s_i) = a$ otherwise. Then $g$ differs from every $f_i$ at $s_i$, so it is missing from the list — Cantor's diagonal argument. So the agent functions are uncountable. Programs are finite strings over a finite alphabet, and there are countably many such strings. So there are more functions than programs, and most functions have none.
:::

This is the same counting argument that shows most languages are undecidable ([[theory-of-computation/decidability]]); see also [Maths Atlas: cardinality](/learn/maths/lesson.php?c=proofs&l=cardinality). Its moral for AI is mild but real: the rational agent function for a given environment may simply not be computable, and even when it is, computing it exactly may take far too long. Practical AI therefore aims at **bounded rationality**: the best program for the given machine, given that computing takes time — an agent that makes a good decision now often beats one that would make a perfect decision too late.

## What problems does AI address?

With this vocabulary we can describe the field's main problem classes and the chapters that treat them:

- **Search** finds a sequence of actions that reaches a goal in a known, fully observable, deterministic environment with atomic states ([[artificial-intelligence/search]]); in games the environment contains an adversary ([[artificial-intelligence/adversarial-search]]).
- **Constraint satisfaction** finds assignments to factored states that meet constraints ([[artificial-intelligence/constraint-satisfaction]]).
- **Logical reasoning** derives new facts from knowledge expressed in a formal language, guaranteeing that the conclusions are true in every world consistent with the knowledge ([[artificial-intelligence/logical-agents]]); **planning** uses such representations to construct courses of action ([[artificial-intelligence/planning]]).
- **Probabilistic reasoning** maintains degrees of belief when the world is only partly observed and the rules are uncertain ([[artificial-intelligence/probabilistic-reasoning]]), and **decision theory** chooses actions that maximise expected utility, including over long horizons ([[artificial-intelligence/decision-making]]).
- **Learning** improves an agent from experience. Reinforcement learning, which learns to act from reward, ends this course ([[artificial-intelligence/reinforcement-learning]]); supervised learning, neural networks and language models are taught in the [LLM Atlas](/learn/llm/), starting with [the learning problem](/learn/llm/lesson.php?c=ml-fundamentals&l=learning-problem).

Running through all of these is a tension between **knowledge** and **computation**. The more an agent knows about its environment — a good heuristic, a good model, strong constraints — the less it has to search. Most of the theorems in this course make this precise: a better heuristic expands fewer nodes ([[artificial-intelligence/search]]), better move ordering lets alpha–beta search twice as deep ([[artificial-intelligence/adversarial-search]]), conditional independence makes probabilistic inference tractable ([[artificial-intelligence/probabilistic-reasoning]]).

::: history
Alan Turing's "Computing machinery and intelligence" (*Mind*, 1950) proposed the "imitation game", now called the Turing test, and answered objections to the idea of thinking machines. John McCarthy, Marvin Minsky, Nathaniel Rochester and Claude Shannon wrote the proposal for the 1956 Dartmouth Summer Research Project on Artificial Intelligence, which named the field; there Allen Newell and Herbert Simon presented the Logic Theorist. Newell and Simon's General Problem Solver (1959) and their physical symbol system hypothesis (1976) framed intelligence as symbol manipulation. The view of AI as the design of rational agents became the organising idea of textbooks in the 1990s, notably Stuart Russell and Peter Norvig's *Artificial Intelligence: A Modern Approach* (first edition 1995, fourth edition 2020); Herbert Simon's notion of **bounded rationality** goes back to the 1950s, and Russell and Devika Subramanian's "Provably bounded-optimal agents" (1995) made bounded optimality precise. Rodney Brooks's subsumption architecture (1986) championed layered reflexive robots built without central models.
:::

## Where this leads

The next chapter, [[artificial-intelligence/search]], builds the first goal-based agents: given a description of a problem, they find a sequence of actions that solves it, and with a good heuristic they do so while examining only a tiny part of the state space. The theme of rationality under limited information returns in [[artificial-intelligence/probabilistic-reasoning]] (maintaining a belief state, the model-based agent's internal state made precise) and [[artificial-intelligence/decision-making]] (choosing actions that maximise expected utility). Agents built around language models — which plan, call tools and act in software environments — are a recent and rapidly changing application of the same agent loop; they are taught in the LLM Atlas's course on [agents](/learn/llm/course.php?c=agents).

::: summary
- An **agent** maps percept sequences to actions; the **agent function** is the specification, the **agent program** its implementation ([[#def-agent]]). Explicit tables need $\sum_t \lvert P\rvert^t$ entries and are infeasible ([[#ex-table-size]]).
- A **rational** agent maximises *expected* performance given its percepts and knowledge ([[#def-rational]]); rationality is not omniscience, and it depends on the performance measure, which should describe what we want in the environment.
- The reflex vacuum agent is optimal in the simplest vacuum world ([[#thm-reflex-rational]]), but adding a cost for movement or removing a sensor breaks it ([[#ex-move-cost]], [[#thm-blind-reflex]]); randomisation and, better, internal state repair partial observability.
- Task environments are specified by **PEAS** and classified as observable, multi-agent, deterministic, episodic, static, discrete and known, or not ([[#def-env-properties]]); the properties determine the techniques.
- Agent programs range from **simple reflex** through **model-based**, **goal-based** and **utility-based** to **learning** agents; states are **atomic**, **factored** or **structured**.
- Most agent functions are not computable ([[#thm-uncountable]]); practical AI seeks **bounded rationality**.
:::

## Exercises

::: exercise Counting table entries {level=1 check="1398100"}
Using the formula of [[#ex-table-size]], how many entries does a table-driven vacuum agent with four percepts need for a lifetime of $T = 10$ steps? Check the closed form against the sum. (Enter the number of entries.)
::: solution
$\sum_{t=1}^{10} 4^t = 4 + 16 + 64 + 256 + 1024 + 4096 + 16384 + 65536 + 262144 + 1048576 = 1{,}398{,}100$, and the closed form gives $(4^{11} - 4)/3 = (4{,}194{,}304 - 4)/3 = 1{,}398{,}100$.
:::
:::

::: exercise The best possible score {level=1 check="1998"}
In the vacuum world with free movement and a lifetime of $T = 1000$ steps, what is the largest score any agent can achieve when it starts on $A$ with both squares dirty? (Enter the score.)
::: solution
By the proof of [[#thm-reflex-rational]], $c_1 \le 1$, $c_2 \le 1$ and $c_t \le 2$ for $t \ge 3$, and the reflex agent attains these bounds. The score is $1 + 1 + 2 \cdot 998 = 1998$, as the simulation in [[#ex-move-cost]] printed.
:::
:::

::: exercise Classify and justify {level=1}
Classify these task environments along the dimensions of [[#def-env-properties]], justifying any entry you think debatable: (a) solving a Rubik's cube from a known scrambled position; (b) a backgammon program; (c) a robot that sorts parcels on a moving conveyor belt; (d) an online English-to-French translator handling one sentence at a time.
::: solution
(a) Fully observable, single-agent, deterministic, sequential, static, discrete, known — the classic setting for search. (b) Fully observable (the board and dice are visible), multi-agent competitive, stochastic (the dice), sequential, static (semi-dynamic with a clock), discrete, known. (c) Partially observable (labels may be occluded, sensors are noisy), single-agent (or multi-agent if other robots share the belt), stochastic, episodic for each parcel to a first approximation (sequential if the robot's placements affect later parcels), dynamic (the belt keeps moving while the robot thinks), continuous, and largely known. (d) Fully observable input (the sentence) but the "state" that matters — the intended meaning — is hidden, so partially observable in the relevant sense; single-agent; deterministic program, though the right output is uncertain; episodic per sentence (sequential if context from earlier sentences is used); static; discrete; and the rules of translation are not known explicitly, which is why such systems are learned.
:::
:::

::: exercise A blind agent with memory {level=2}
The vacuum agent of [[#thm-blind-reflex]] perceives only *Dirty* or *Clean* and has free movement. Design a deterministic agent with a constant amount of memory that cleans both squares from every initial state, and give the worst-case number of steps it needs.
::: solution
Let the agent count its steps (a counter that stops at $6$) and follow a fixed plan, where "clean" means *Suck* if the percept is *Dirty* and *NoOp* otherwise: step 1 clean; step 2 *Right*; step 3 clean; step 4 *Left*; step 5 clean; from step 6 on, *NoOp*. If it starts on $A$, steps 1 and 3 clean $A$ and $B$. If it starts on $B$, step 1 cleans $B$, step 2 leaves it on $B$, step 4 moves it to $A$ and step 5 cleans $A$. So both squares are clean after at most $5$ steps, and $5$ are needed when it starts on $B$ with $A$ dirty. The memory is three bits for the counter. This shows that internal state, not randomness, is the real cure for partial observability.
:::
:::

::: exercise When is the reflex agent irrational? {level=2}
For each change to the assumptions of [[#thm-reflex-rational]], say whether the reflex vacuum agent remains rational, and if not describe a better agent: (a) the lifetime $T$ is $1$; (b) clean squares become dirty again with probability $0.1$ per step; (c) the agent does not know the geography — there might be a third square to the right of $B$.
::: solution
(a) Rational: the proof covers every $T$. With $T = 1$ only the first action matters, and sucking if dirty (otherwise anything) is optimal. (b) The reflex agent keeps moving and sucking whenever it finds dirt, which is now sensible: dirt reappears, so the agent must keep checking. With free movement, patrolling and sucking on dirt is a reasonable policy — staying put can never clean the other square, and moving costs nothing — though proving it optimal needs the tools of [[artificial-intelligence/decision-making]]. With a movement cost, a better agent waits for a while and returns at intervals that balance the cost against the expected dirt, as [[#ex-regrow]] explores. (c) Not rational in general: an agent that never explores to the right of $B$ might leave a dirty square forever. A rational agent would explore — try *Right* from $B$ and see whether its location changes — and its percepts, which include its location, would tell it whether a third square exists.
:::
:::

::: exercise The expected time in a corridor {level=2 check="12"}
The randomised blind agent of [[#thm-blind-reflex]] lives in a corridor of squares $1, 2, 3, 4$ (moving left from $1$ or right from $4$ leaves it in place). Only square $4$ is dirty and the agent starts on square $1$. What is the expected number of *moves* (steps on clean squares) before it first reaches square $4$? (Enter the expected number of moves.)
::: solution
Let $m_i$ be the expected number of moves to reach $4$ from square $i$, so $m_4 = 0$. On square 1, a move stays with probability $1/2$ and goes to 2 with probability $1/2$: $m_1 = 1 + \tfrac12 m_1 + \tfrac12 m_2$, so $m_1 = 2 + m_2$. For $i = 2, 3$: $m_i = 1 + \tfrac12 m_{i-1} + \tfrac12 m_{i+1}$. Write $d_i = m_i - m_{i+1}$; then $d_1 = 2$ and the interior equations give $d_i = d_{i-1} + 2$, so $d_2 = 4$ and $d_3 = 6$. Hence $m_1 = d_1 + d_2 + d_3 = 2 + 4 + 6 = 12$. In general for a corridor of $n$ squares the answer is $2 + 4 + \dots + 2(n-1) = n(n-1)$, quadratic in $n$, compared with $n - 1$ moves for an agent that knows where it is.
:::
:::

::: exercise A model-based agent for regrowing dirt {#ex-regrow level=3}
In the two-square world each clean square becomes dirty with probability $q$ at the end of each step, independently. Movement costs $\mu$ points and each clean square scores one point per step. An agent on a square it has just cleaned can either stay (*NoOp*) or move to the other square, which it last saw clean $k$ steps ago. (a) Show that the other square is dirty with probability $1 - (1 - q)^k$. (b) Argue roughly when moving is better than waiting, and implement a simulation (with a fixed seed) that compares the reflex agent with an agent that moves only when $1 - (1-q)^k$ exceeds a threshold $\theta$, for $q = 0.05$, $\mu = 1$ and a few values of $\theta$.
::: solution
(a) The square stays clean in each of the $k$ steps with probability $1 - q$, independently, so it is still clean with probability $(1 - q)^k$ and dirty with probability $1 - (1 - q)^k$.

(b) Moving costs $\mu$ now; if the other square is dirty, getting there and sucking it restores a point per step for as long as it stays clean, an expected $1/q$ steps or so. A crude rule is to move when $(1 - (1-q)^k) / q \gtrsim \mu$, which with $q = 0.05$, $\mu = 1$ gives a threshold near $\theta = 0.05$ — but waiting also lets the agent's own square get dirty while it is away, so the exact optimum is best found by the methods of [[artificial-intelligence/decision-making]] or by experiment:

```python
import random

def simulate(theta, q=0.05, mu=1, T=100_000, seed=0):
    rng = random.Random(seed)
    dirt = {"A": False, "B": False}; loc = "A"; last_seen = {"A": 0, "B": 0}; score = 0
    for t in range(1, T + 1):
        other = "B" if loc == "A" else "A"
        if dirt[loc]:
            dirt[loc] = False                       # Suck
        elif theta is None or 1 - (1 - q) ** (t - last_seen[other]) > theta:
            loc = other; score -= mu                # move (always, for the reflex agent)
        last_seen[loc] = t
        score += sum(not d for d in dirt.values())
        for s in dirt:                              # dirt regrows
            if not dirt[s] and rng.random() < q:
                dirt[s] = True
    return score / T

print("reflex", round(simulate(None), 3))
for theta in (0.1, 0.3, 0.5, 0.7):
    print(theta, round(simulate(theta), 3))
```

```console
$ python3 regrow.py
reflex 1.043
0.1 1.437
0.3 1.673
0.5 1.628
0.7 1.526
```

The reflex agent pays for a move on most steps and averages about $1.04$ points per step; waiting until the other square is fairly likely to be dirty does much better — of the thresholds tried, $\theta = 0.3$ is best, at about $1.67$ points per step. The precise optimum depends on $q$ and $\mu$; the point is that a little internal state (the time since each square was seen) and a little probabilistic reasoning turn an irrational reflex into a reasonable policy.
:::
:::

::: exercise Countably many finite-state agents {level=3}
(a) How many simple reflex agent functions are there for $\lvert P\rvert$ percepts and $\lvert A\rvert$ actions? (b) A **finite-state agent** has a finite set $Q$ of internal states, an initial state $q_0$, an update function $u\colon Q \times P \to Q$ and an output function $o\colon Q \times P \to A$; on each percept it outputs $o(q, p)$ and moves to state $u(q, p)$. Prove that, for finite $P$ and $A$, the set of agent functions implemented by finite-state agents is countable. (c) Why does (b) not contradict the existence of rational agents for the vacuum world?
::: solution
(a) A simple reflex agent function is determined by its action on each single percept, so there are $\lvert A\rvert^{\lvert P\rvert}$ of them — for the vacuum world $4^4 = 256$ with four actions.

(b) Without loss of generality $Q = \{1, \dots, k\}$ for some $k \ge 1$. For each $k$ there are finitely many choices of $q_0$, $u$ and $o$ — at most $k \cdot k^{k\lvert P\rvert} \cdot \lvert A\rvert^{k\lvert P\rvert}$ — so the set of finite-state agents is a countable union of finite sets, hence countable, and so is the set of agent functions they implement (each agent implements one function). By [[#thm-uncountable]] almost all agent functions are therefore not implemented by any finite-state agent.

(c) Uncountably many agent functions are not finite-state, but the ones we need often are: the rational vacuum agent of [[#thm-reflex-rational]] is even a simple reflex agent, and the model-based agent of [[#ex-move-cost]] has four internal states. The counting argument says that *most* functions are unimplementable, not that the *useful* ones are.
:::
:::

::: exercise Specifying a performance measure {level=2}
A company wants an agent that schedules the lifts in an office building. Propose a performance measure, explain what could go wrong if the measure were simply "average waiting time", and give a PEAS description.
::: solution
Average waiting time alone ignores the variance and the tail: an agent might serve busy floors very quickly while leaving a passenger on a quiet floor waiting for ten minutes, achieving a good average with intolerable worst cases. It also ignores the time spent inside the lift and energy use. A better measure combines, with weights agreed with the client, the mean waiting time, a large penalty for waits over (say) two minutes, the mean journey time, and the energy consumed; safety constraints (door operation, capacity) are hard constraints rather than terms in the measure. PEAS: *performance* as above; *environment*: the building, passengers arriving at floors with their destinations, the lifts' mechanics; *actuators*: commands to move each lift to a floor and open or close its doors; *sensors*: call buttons on each floor (and destination panels if present), lift positions and loads, door sensors, the clock. The environment is partially observable (the agent does not know who will arrive), stochastic, multi-agent in a weak sense (passengers react to the lifts), sequential, dynamic, and mixes discrete floors with continuous time.
:::
:::
