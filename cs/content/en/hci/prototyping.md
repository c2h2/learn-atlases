For the 1984 Olympic Games in Los Angeles, IBM built a voice-messaging system that let athletes from around the world send and receive spoken messages from telephones and kiosks in the Olympic Village. The users would speak dozens of languages, many had never used a computer, the system had to work from the first day of the Games, and there would be no second chance. John Gould and his colleagues, reporting the project in *Communications of the ACM* in 1987, described what they did instead of writing a specification and hoping: they wrote the user guide first and tested it on people; they ran simulations in which a person behind the scenes played the computer; they put early versions in a hallway and invited passers-by to try them; they took prototype kiosks to an Olympic trial event; and in a final "try to destroy it" test they invited people to break the system. Each round found problems that would have been fatal at the Games and cheap to fix before them.

A **prototype** is anything that lets people experience a design before it exists — a sketch, a paper mock-up, a clickable simulation, a person pretending to be a computer. This chapter is about choosing and using prototypes: what a prototype is meant to answer, why it pays to explore many designs before refining one, how to run paper prototypes and Wizard-of-Oz studies, how to treat an interactive prototype as a state machine whose navigation can be checked by graph search, and how iteration converges — or fails to. It builds on [[hci/user-centred-design]], which supplies the users, tasks and requirements a prototype is tested against.

## What a prototype is for

::: definition Prototype {#def-prototype}
A **prototype** is a representation of a design, made before the final artefact exists, in order to *answer questions* about it — for the designers, users or other stakeholders. Its **fidelity** is how closely it resembles the final product in a given respect (appearance, interactivity, content, performance). A prototype is **throwaway** if it is discarded once it has answered its questions, and **evolutionary** if it is developed into the product.
:::

The definition puts the *question* first. Stephanie Houde and Charles Hill ("What do prototypes prototype?", 1997) proposed that every prototype addresses some mix of three questions: its **role** in the user's life (what is it for, and does that matter to anyone?), its **look and feel** (what is it like to see and use?), and its **implementation** (can it be built, and how will it work?). A cardboard model of a phone carried in a pocket for a week answers a role question; a polished animation of a new gesture answers a look-and-feel question; a rough program that streams video at the target frame rate answers an implementation question. Choosing a prototype starts from the question, and then picks the lowest fidelity that can answer it.

### Fidelity and scope

**Low-fidelity** prototypes — sketches, paper screens, storyboards, cardboard models — are fast, cheap and visibly unfinished. That last property is an advantage: people criticise a sketch freely, whereas a polished screen invites comments on colours and fonts and discourages criticism of the concept. **High-fidelity** prototypes — interactive simulations that look like the real product, or working code — are needed to answer questions about timing, animation, real data, and fine visual detail, and to convince stakeholders.

Does low fidelity find fewer usability problems? Robert Virzi, Jeffrey Sokolov and Demetrios Karis (CHI 1996) compared paper and high-fidelity prototypes of two products and found that they revealed substantially the same problems; later comparisons, such as Sefelin, Tscheligi and Giller (2003), reached similar conclusions about the number of problems found, while noting that participants sometimes prefer the computer version. These studies are small and specific to their products, so the safe conclusion is modest: for questions about structure, wording and flow, low fidelity is usually enough; for questions about timing, motion and visual detail it is not.

::: definition Horizontal and vertical prototypes {#def-scope}
A **horizontal prototype** shows the breadth of a system — many features or screens — with little functionality behind each. A **vertical prototype** implements a few features in depth, down to real data and behaviour. A **T-prototype** combines a horizontal overview with one or two vertical slices through the most important or most uncertain tasks.
:::

A horizontal prototype tests navigation and the conceptual model ("where would you go to change your delivery address?"); a vertical one tests whether a specific task can actually be completed and how long it takes. The T shape spends depth only where the risk is.

::: warning "The prototype looks finished, so the product is nearly done"
A high-fidelity prototype can look exactly like a finished product while having nothing behind it: no error handling, no security, no data, no performance. Stakeholders who see it routinely conclude that the work is almost done and ask for it to ship. Make the status of prototypes explicit (label them, use placeholder content, keep them in a separate tool), agree in advance whether a prototype is throwaway or evolutionary, and never let throwaway prototype code drift into production — it was written to answer a question quickly, not to be maintained ([[software-engineering/software-process]]).
:::

## Sketching and exploring alternatives

Bill Buxton (*Sketching User Experiences*, 2007) distinguished **sketches** from prototypes by their purpose. Sketches are quick, cheap, plentiful, ambiguous and disposable; they are made to *explore* — to suggest and question. Prototypes are more refined and are made to *test* and *refine* a chosen direction. Good design work does a lot of the first before the second: Buxton's phrase was "getting the right design" before "getting the design right".

Two experiments support exploring several designs in parallel. Maryam Tohidi, William Buxton, Ronald Baecker and Abigail Sellen ("Getting the right design and the design right", CHI 2006) showed participants either one prototype of a house-climate control or three different ones; those who saw three gave more critical comments and fewer purely positive ones, apparently because seeing alternatives made it acceptable to criticise. Steven Dow and colleagues ("Parallel prototyping leads to better design results, more divergence, and increased self-efficacy", *ACM TOCHI*, 2010) had participants design web banner advertisements with the same total time, either creating and getting feedback on several designs at once or one after another; the parallel group's final ads were rated higher by experts and drew more clicks when run online. Both are single studies with particular tasks, but they point the same way: early commitment to one design is costly.

A **design space** makes the alternatives explicit. List the dimensions along which designs can vary and the options on each; every combination is a candidate design.

::: example A design space for a parking app's payment flow {#ex-design-space}
A city wants an app to pay for street parking. Lay out a design space with four dimensions — how the location is identified, how the duration is set, when payment happens, and how the user is reminded — and count the designs. How would you explore it?
::: solution
One possible space:

| dimension | options |
|---|---|
| location | GPS automatic; type zone number; scan sign's QR code |
| duration | choose end time; start/stop (pay as you park); fixed blocks |
| payment | per session; monthly bill; prepaid wallet |
| reminder | push notification; SMS; none |

There are $3^4 = 81$ combinations — too many to prototype, but far too many to have considered only one of. Some combinations are incoherent (start/stop with fixed blocks is not a thing, so the dimensions are not entirely independent) and some are dominated (no reminders with fixed blocks risks fines). A sensible exploration sketches perhaps six to ten *diverse* combinations in an hour, tests three of them as paper prototypes against the key scenarios (arriving in a hurry, extending from a café, a visitor with no account), and only then refines one — perhaps borrowing the best idea of another. The table also documents **design rationale**: which options were considered and why they were rejected.
:::
:::

## Paper prototyping

In a **paper prototype** each screen, menu, dialogue and message is drawn on paper or card, and a person moves the pieces in response to the participant's actions. Carolyn Snyder's *Paper Prototyping* (2003) and Marc Rettig's article "Prototyping for tiny fingers" (*Communications of the ACM*, 1994) set out the method. A session has three roles:

- the **facilitator** gives the participant tasks, asks them to think aloud, and keeps the session moving without helping;
- the **computer** — a team member who knows the design well — responds to each "click" or "tap" by placing the right piece, silently and exactly as the system would, including error messages;
- one or more **observers** take notes on what the participant does and says, especially hesitations, wrong turns and comments.

Paper prototypes can be changed *between* sessions — or even during one, if a label is clearly misleading — which makes them a very fast way to iterate. They are weak at representing scrolling, timing, animation, drag and drop, and large data, and the "computer" must take care not to give hints with their hands or eyes.

::: example Planning a paper prototype session {#ex-paper}
Plan a 30-minute paper prototype session for the parking app of [[#ex-design-space]], using the "start/stop, GPS location, prepaid wallet" design.
::: solution
*Tasks* (written on cards, phrased as goals without interface words): (1) "You have just parked in front of the library. Pay for your parking." (2) "You are in a café and want to stay another hour. Make sure you won't get a ticket." (3) "You have finished. Stop paying." (4) "How much did parking cost you last week?"

*Materials*: home screen with the map; a location confirmation ("You are in zone 4127 — Library Street") with an alternative "Wrong zone?"; a running-session screen with the elapsed time and cost; a low-balance warning; top-up screens; a notification card ("Your parking will reach the 2-hour limit in 10 minutes"); a history screen; error states (GPS unavailable, no balance). Blank cards and a pen for changes.

*Script*: consent and an explanation that the *design* is being tested, not the participant (5 min); a practice task on something unrelated; the four tasks with think-aloud (20 min); a short debrief ("What was most confusing?") (5 min). Observers record, for each task, success, wrong turns and quotes.

*What to watch for*: does the participant trust the automatically detected zone? Does "start/stop" match their mental model, or do they expect to pay for a duration up front ([[hci/human-factors]], mental models)? Do they notice the running session after leaving the app? Task 2 tests the notification card, which the "computer" slides in after a pause.
:::
:::

## Wizard of Oz

Some designs cannot be prototyped convincingly by moving paper: a speech interface, a recommendation system, a conversational assistant, gesture recognition. The **Wizard-of-Oz** technique, named by John Kelley (*ACM Transactions on Office Information Systems*, 1984) after the man behind the curtain in Frank Baum's story, has a hidden human perform the part of the system that does not yet exist.

::: definition Wizard-of-Oz prototype {#def-woz}
In a **Wizard-of-Oz** study, participants interact with what appears to be a working system, while some or all of its responses are produced by a hidden human operator (the **wizard**) following a defined protocol. It is used to study how people would interact with a capability before building it, and to collect realistic input data (for example, the phrases people actually use) for building it.
:::

Kelley used the method to develop a natural-language calendar program: participants typed requests, a wizard answered, and their inputs were used to grow the program's vocabulary and grammar over several iterations until it could run without the wizard. The method has three requirements. The wizard must follow **rules** that reflect what the system could plausibly do — a wizard who understands everything simulates an impossible system and the results will not transfer. The wizard's **response time** must be realistic and consistent, which is hard for humans. And the deception must be handled **ethically**: participants are debriefed afterwards, told that a person was involved, and given the chance to withdraw their data.

::: quiz
A team uses a Wizard-of-Oz study to test a voice assistant for booking medical appointments. The wizard is a doctor's receptionist who understands every request perfectly, including vague ones like "sometime next week when Dr Patel's free, not Monday". What is the main risk?
- [ ] Participants will notice that a human is responding.
- [x] The study simulates a system far more capable than any that will be built, so its results about usability and satisfaction may not transfer.
- [ ] The receptionist will be too slow.
- [ ] There is no risk; a perfect wizard gives the best data.
::: solution
The value of a Wizard-of-Oz study depends on the wizard behaving like the *planned* system. A perfect wizard lets participants speak freely and succeed every time; the real system will misunderstand some requests, and how people recover from misunderstandings is exactly what needs designing. Give the wizard explicit rules (which request forms to accept, when to ask for clarification, a deliberate error rate) and a scripted set of responses. Detection is a real but secondary concern; speed matters too, but is easier to control.
:::
:::

## Interactive prototypes as state machines

A clickable prototype — screens joined by links — is a **finite-state machine** in the sense of [[theory-of-computation]]: screens are states, user actions are labelled transitions. Seeing it this way lets us check a prototype's navigation mechanically before showing it to anyone.

::: definition Navigation model {#def-nav-model}
A **navigation model** of an interface is a directed graph $G = (V, E)$ whose vertices are the interface's states (screens, dialogues, modes) and whose edges $(u, v)$ are labelled with the user actions that take $u$ to $v$, together with a **start** state $s \in V$. A state $v$ is **reachable** if there is a path from $s$ to $v$; it is a **dead end** if it has no outgoing edges; and the model is **recoverable** if from every reachable state there is a path back to $s$.
:::

::: proposition Checking navigation by search {#prop-nav-check}
Breadth-first search from $s$ finds every reachable state and, for each, a shortest sequence of actions from $s$, in $O(\lvert V\rvert + \lvert E\rvert)$ time. Recoverability can be checked in the same time by one breadth-first search from $s$ in the **reversed** graph: the model is recoverable if and only if every state reachable from $s$ is also reached in that reverse search.
:::

::: proof
Correctness and running time of breadth-first search, including the shortest-path property of its predecessor tree, are proved in [[algorithms]]. For recoverability: $v$ has a path to $s$ in $G$ iff $s$ has a path to $v$ in the reversed graph $G^R$, because reversing every edge of a path from $v$ to $s$ gives a path from $s$ to $v$ in $G^R$ and conversely. So a single search from $s$ in $G^R$ finds exactly the states from which $s$ can be reached, and the model is recoverable iff this set contains every state reachable in $G$. Building $G^R$ and searching it both take $O(\lvert V\rvert + \lvert E\rvert)$ time.
:::

The length of the shortest path to a state is a first, crude measure of how costly a task is — the number of screens a user must pass through — which [[hci/interaction-techniques]] refines into times with the keystroke-level model.

::: example Checking a food-ordering prototype {#ex-nav-check}
A team's clickable prototype has the screens and links below. Check it for unreachable screens, dead ends and states from which the user cannot return home, and give the minimum number of actions to complete an order.
::: solution
```python
from collections import deque

# A clickable prototype of a food-ordering app: screen -> {action label: target screen}
proto = {
    "Home":     {"search": "Results", "basket": "Basket", "account": "Account"},
    "Results":  {"open item": "Item", "back": "Home"},
    "Item":     {"add to basket": "Basket", "back": "Results"},
    "Basket":   {"checkout": "Payment", "back": "Home"},
    "Payment":  {"pay": "Done", "edit address": "Address"},
    "Address":  {"save": "Payment"},
    "Done":     {},                       # order confirmation
    "Account":  {"order history": "History", "back": "Home"},
    "History":  {"reorder": "Basket"},
    "Help":     {"back": "Home"},         # nothing links here yet
}

def bfs(graph, start):
    """Shortest action sequence from start to every reachable screen."""
    path = {start: []}
    queue = deque([start])
    while queue:
        s = queue.popleft()
        for action, t in graph[s].items():
            if t not in path:
                path[t] = path[s] + [action]
                queue.append(t)
    return path

reach = bfs(proto, "Home")
for screen, actions in reach.items():
    print(f"{screen:8} {len(actions)} step(s): {' > '.join(actions)}")
print("unreachable:", sorted(set(proto) - set(reach)))
print("dead ends:  ", sorted(s for s in proto if not proto[s]))
stuck = [s for s in reach if "Home" not in bfs(proto, s)]
print("no way home:", sorted(stuck))
```

```console
$ python3 proto.py
Home     0 step(s): 
Results  1 step(s): search
Basket   1 step(s): basket
Account  1 step(s): account
Item     2 step(s): search > open item
Payment  2 step(s): basket > checkout
History  2 step(s): account > order history
Done     3 step(s): basket > checkout > pay
Address  3 step(s): basket > checkout > edit address
unreachable: ['Help']
dead ends:   ['Done']
no way home: ['Address', 'Done', 'Payment']
```

(For simplicity the program runs one search per state instead of the single reverse search of [[#prop-nav-check]]; for a prototype of a few dozen screens either is instant.) Three findings. **Help is unreachable**: a screen was drawn but never linked. **Done is a dead end**: after ordering, the user is stuck on the confirmation — it needs a link home or to order tracking. **Payment has no way back**: once a user reaches checkout, they cannot return to the basket to change their order, and the Address screen only leads back to Payment, so three states trap the user. Finally, the shortest path to Done goes `basket > checkout > pay` from a basket that already contains food; from an empty basket, a real order needs `search > open item > add to basket > checkout > pay`, five actions. None of these needed a participant to find — save participants for the questions only people can answer.
:::
:::

::: widget graph
nodes: Home@0,2; Results@1,3; Item@2,3; Basket@2,2; Payment@3,2; Address@4,3; Done@4,1; Account@1,1; History@2,1; Help@0,0
edges: Home>Results; Home>Basket; Home>Account; Results>Item; Results>Home; Item>Basket; Item>Results; Basket>Payment; Basket>Home; Payment>Done; Payment>Address; Address>Payment; Account>History; Account>Home; History>Basket; Help>Home
algorithm: bfs
start: Home
caption: The navigation model of [[#ex-nav-check]]. Step through breadth-first search from Home: the order in which screens are reached gives the minimum number of actions to reach each, and Help is never reached. Then choose Payment as the start vertex: Home is never reached, so the prototype traps its users at checkout.
:::

Model-based checks like this scale up: tools for model-based testing of user interfaces derive navigation graphs from real applications and generate test sequences from them ([[software-engineering/testing]]), and safety-critical interfaces such as infusion pumps have been verified with model checkers against properties like "every number entry can be cancelled" ([[software-engineering/verification]]).

## Iterating

The point of a cheap prototype is to be changed. Iterative design runs the human-centred cycle ([[hci/user-centred-design#def-hcd]]) repeatedly: prototype, evaluate with users, fix, repeat. How many iterations are needed? A simple model makes the trade-offs visible.

::: proposition A model of iterative improvement {#prop-iteration}
Suppose a design starts with $R_0$ usability problems; each iteration's evaluation finds each remaining problem independently with probability $q$; every problem found is fixed; and each fix independently introduces a new problem with probability $r$. Then the expected number of problems after $k$ iterations is

$$
\E[R_k] = R_0\,\bigl(1 - q(1-r)\bigr)^k,
$$ {#eq-iteration}

and the expected number falls below a fraction $f$ of $R_0$ once $k \ge \ln f / \ln\bigl(1 - q(1 - r)\bigr)$.
:::

::: proof
Given $R_k$ problems, the number found in the next round has expectation $qR_k$, so the number left unfound has expectation $(1-q)R_k$; the found ones are fixed, each creating a new problem with probability $r$, contributing expectation $r\,qR_k$. So $\E[R_{k+1} \mid R_k] = R_k(1 - q + qr) = R_k\bigl(1 - q(1-r)\bigr)$, and taking expectations, $\E[R_{k+1}] = \bigl(1 - q(1-r)\bigr)\E[R_k]$. By induction, $\E[R_k] = R_0(1 - q(1-r))^k$. The bound on $k$ follows by taking logarithms, as in [[hci/user-centred-design#prop-detect]].
:::

This is a model, not a measurement: real problems differ in how easily they are found, fixes interact, and each new prototype is also a chance to add features (and problems). Its value is in what it shows qualitatively. Improvement is geometric while $q(1 - r)$ is reasonably large, so the first few iterations deliver most of the benefit. A sloppy fixing process ($r$ near 1) stalls improvement no matter how good the evaluation is. And because problems that *every* round misses ($q$ small for them) are never found, iteration with the same method and the same kind of participants has diminishing returns — change the method or the participants from time to time.

::: example How many rounds? {#ex-rounds}
Each round of testing finds about half the remaining problems, and about one fix in five introduces a new problem. How many rounds are needed, under [[#prop-iteration]], to bring the expected number of problems below 10% of the initial number?
::: solution
With $q = 0.5$ and $r = 0.2$, the factor per round is $1 - 0.5 \times 0.8 = 0.6$. We need $0.6^k \le 0.1$, so $k \ge \ln 0.1 / \ln 0.6 \approx 4.51$: five rounds ($0.6^4 \approx 0.130$, $0.6^5 \approx 0.078$). With perfect fixes ($r = 0$) the factor would be $0.5$ and four rounds would do ($0.5^4 = 0.0625$). Five small rounds with paper prototypes can take less time than one large test of a finished product — which is the economic argument for prototyping.
:::
:::

## Prototyping in practice

As of 2026, most interface prototyping is done in collaborative, browser-based design tools that produce clickable high-fidelity mock-ups from shared component libraries, and generative tools can turn sketches or text descriptions into draft screens. These change the cost of fidelity but not the principles. Easy high fidelity tempts teams to skip divergent sketching and to polish the first idea; tool-generated designs need the same testing with users as hand-drawn ones; and a library of standard components — the **design system** of an organisation — makes prototypes consistent and accessible by default, provided the components themselves have been tested ([[hci/accessibility-ethics]]). Paper and whiteboards remain the fastest tools for the first hour of any design problem.

::: history
Prototyping as a deliberate method in interface design dates from the late 1970s and early 1980s, when researchers at Xerox PARC built and tested many interface prototypes for the Alto and the Star. John Kelley's Wizard-of-Oz method (1984), the Olympic Message System (1984, reported 1987), and Apple's HyperCard (1987), which let designers build clickable prototypes without programming, made prototyping practical. Marc Rettig's "Prototyping for tiny fingers" (1994) popularised paper prototyping, and the "low- versus high-fidelity" debate was summarised by Jim Rudd, Ken Stern and Scott Isensee in *Interactions* (1996). Stephanie Houde and Charles Hill's "What do prototypes prototype?" appeared in the *Handbook of Human–Computer Interaction* (1997), Carolyn Snyder's *Paper Prototyping* in 2003, and Bill Buxton's *Sketching User Experiences* in 2007.
:::

## Where this leads

Prototypes exist to be evaluated: [[hci/usability-evaluation]] covers how to find problems in them, with experts and with users, and how many users that takes — the same geometric curve as [[#prop-iteration]] appears there as the Nielsen–Landauer model. The interaction techniques prototypes are built from are the subject of [[hci/interaction-techniques]], and their visual design of [[hci/visual-design]]. The process side — where prototyping fits in agile development, and throwaway versus evolutionary prototypes — is in [[software-engineering/software-process]].

::: summary
- A **prototype** ([[#def-prototype]]) exists to answer questions — about role, look and feel, or implementation (Houde and Hill). Choose the lowest fidelity that answers yours.
- **Horizontal**, **vertical** and **T-shaped** prototypes ([[#def-scope]]) trade breadth for depth; low fidelity finds most structural problems and invites criticism.
- **Sketch** many alternatives before refining one; explicit **design spaces** and parallel prototyping help (Tohidi et al. 2006; Dow et al. 2010).
- **Paper prototypes** need a facilitator, a "computer" and observers; they iterate fast but cannot show timing or motion.
- **Wizard-of-Oz** studies ([[#def-woz]]) simulate capabilities that do not exist yet; the wizard must follow the planned system's limits, and participants must be debriefed.
- A clickable prototype is a **state machine** ([[#def-nav-model]]): breadth-first search finds unreachable screens, dead ends, traps and minimal action counts ([[#prop-nav-check]]).
- Iteration improves a design geometrically under simple assumptions ([[#prop-iteration]]), with diminishing returns and stalling when fixes introduce new problems.
:::

## Exercises

::: exercise Size of a design space {level=1 check="48"}
A design space for a smartwatch alarm has four dimensions: alert type (vibrate, sound, both), snooze gesture (tap, shake), dismiss gesture (swipe, button, crown press, voice) and display (time only, time and next event). How many designs does it contain? (Enter the number.)
::: solution
$3 \times 2 \times 4 \times 2 = 48$.
:::
:::

::: exercise Choose the prototype {level=1}
Which kind of prototype (sketch, paper, Wizard of Oz, high-fidelity interactive, or working code) would you choose to answer each question, and why? (a) Will people understand the menu structure of a new banking app? (b) Do people trust a car's spoken navigation instructions when they arrive slightly late? (c) Can the server return search results within 200 ms? (d) Which of five layout ideas for a dashboard should we pursue?
::: solution
(a) Paper or a simple clickable horizontal prototype: structure and wording, no need for visual polish. (b) Wizard of Oz in a driving simulator, or in a car with a safety driver: timing matters and the capability is hard to build, so a wizard triggers instructions with controlled delays. (c) Working code: an implementation question that only real software on representative hardware and data can answer. (d) Sketches: cheap and fast for divergence, and their roughness invites honest critique.
:::
:::

::: exercise Rounds of iteration {level=1 check="5"}
Under [[#prop-iteration]] with $q = 0.4$ and $r = 0.25$, what is the smallest number of iterations after which the expected number of problems is below 20% of the original? (Enter the number of iterations.)
::: solution
The factor per round is $1 - 0.4 \times 0.75 = 0.7$. We need $0.7^k < 0.2$, that is $k > \ln 0.2 / \ln 0.7 \approx 4.51$, so $k = 5$. Check: $0.7^4 \approx 0.240$ is not yet below 0.2, and $0.7^5 \approx 0.168$ is.
:::
:::

::: exercise Finding traps {level=2 check="1"}
What is the smallest number of links that must be added to the prototype of [[#ex-nav-check]], without removing any, so that every screen is reachable from Home and the model is recoverable ([[#def-nav-model]])? Give such a set and say whether it is a good design. (Enter the number of links.)
::: solution
**One** link suffices: `Done > Help`. Help becomes reachable (Home → Basket → Payment → Done → Help), and Help already links to Home; Done can now return home through Help, Payment through Done, Address through Payment, and History through Basket, while the other screens already had a way back. At least one link is needed, because Done has no outgoing edge. So the minimum is 1.

It is a terrible design: every order would end on the help page. A sensible revision adds `Done > Home` (or to order tracking), a Help link from Home, and a "back" from Payment to Basket — the last is not needed for recoverability but is needed for the *task* of changing an order before paying. Model checks find defects; they do not choose designs.
:::
:::

::: exercise Wizard protocol {level=2}
Write a one-page protocol for the wizard in a study of a voice interface that lets people control a home heating system ("make it warmer in the bedroom"). Include what the wizard may understand, how errors are introduced, response timing, and the debrief.
::: solution
A good protocol includes: **vocabulary** — the wizard accepts only commands that name a room from the configured list (or "here", using the device's location) and a direction or target ("warmer", "21 degrees", "off until 6"), and treats anything else as not understood; **responses** — a fixed script ("Setting the bedroom to 21 degrees", "Sorry, which room?", "I can't do that yet"), read by text-to-speech, never improvised; **errors** — on a pre-generated random schedule, about one command in ten is misheard as a different room, to observe recovery; **timing** — the wizard presses a key to trigger each response, and the software adds a delay so that responses arrive about 1 s after the end of speech regardless of the wizard's speed; **logging** — every utterance and response recorded with times; **debrief** — at the end, the facilitator explains that a person controlled the responses, why that was necessary, answers questions and offers withdrawal of the recordings ([[#def-woz]]).
:::
:::

::: exercise Shortest paths as a cost {level=2}
In the navigation model of [[#ex-nav-check]], the team proposes adding a "quick reorder" link from Home directly to Basket with the last order pre-filled. Using the BFS output, which task becomes shorter, by how many actions, and what does this measure fail to capture?
::: solution
Reordering previously went `account > order history > reorder` (three actions to reach a filled Basket), then `checkout > pay`: five actions. With the new link it is `quick reorder > checkout > pay`: three actions, two fewer. But the path length counts screens, not effort: it ignores the time to *find* the link (a crowded Home may slow every other task), reading and decision time, typing, and errors — it treats a tap on a large nearby button and on a tiny distant one alike ([[hci/human-factors]]). The keystroke-level model of [[hci/interaction-techniques]] gives a better estimate, and a test with users the best.
:::
:::

::: exercise Reverse search {level=3}
Implement the single reverse breadth-first search of [[#prop-nav-check]] for the prototype dictionary of [[#ex-nav-check]], returning the set of reachable states from which the start state cannot be reached, and check that it agrees with the program in the example. Prove that it runs in $O(\lvert V\rvert + \lvert E\rvert)$ time.
::: solution
```python
from collections import deque

def unrecoverable(graph, start):
    """Reachable states with no path back to start, via one forward and one reverse BFS."""
    def bfs(adj, s):
        seen, queue = {s}, deque([s])
        while queue:
            u = queue.popleft()
            for v in adj.get(u, ()):
                if v not in seen:
                    seen.add(v)
                    queue.append(v)
        return seen
    forward = {u: set(targets.values()) for u, targets in graph.items()}
    reverse = {u: set() for u in graph}
    for u, vs in forward.items():
        for v in vs:
            reverse[v].add(u)
    return bfs(forward, start) - bfs(reverse, start)

proto = {
    "Home": {"search": "Results", "basket": "Basket", "account": "Account"},
    "Results": {"open item": "Item", "back": "Home"},
    "Item": {"add to basket": "Basket", "back": "Results"},
    "Basket": {"checkout": "Payment", "back": "Home"},
    "Payment": {"pay": "Done", "edit address": "Address"},
    "Address": {"save": "Payment"}, "Done": {},
    "Account": {"order history": "History", "back": "Home"},
    "History": {"reorder": "Basket"}, "Help": {"back": "Home"},
}
print(sorted(unrecoverable(proto, "Home")))
```

```console
$ python3 recover.py
['Address', 'Done', 'Payment']
```

The result agrees with the example. Running time: building `forward` and `reverse` visits each vertex and edge once, $O(\lvert V\rvert + \lvert E\rvert)$. Each BFS adds a vertex to `seen` and the queue at most once and, when it removes a vertex, scans its adjacency set once, so the total work is $O(\lvert V\rvert + \lvert E\rvert)$ per search (with set operations taking expected constant time). The set difference is $O(\lvert V\rvert)$. Correctness is [[#prop-nav-check]]: the forward search finds the reachable states, the reverse search the states that can reach `start`.
:::
:::

::: exercise When iteration stalls {level=3}
Generalise [[#prop-iteration]] to two kinds of problems: a fraction $\alpha$ are "easy" (found with probability $q_1$ per round) and the rest "hard" (probability $q_2 < q_1$), with perfect fixes ($r = 0$). Derive the expected fraction remaining after $k$ rounds, show that for large $k$ almost all remaining problems are hard, and compute the fraction remaining after 5 rounds for $\alpha = 0.7$, $q_1 = 0.6$, $q_2 = 0.1$. What does this imply for evaluation practice?
::: solution
Each kind decays independently: the expected fraction remaining is

$$
F_k = \alpha(1 - q_1)^k + (1 - \alpha)(1 - q_2)^k.
$$

The proportion of the remainder that is hard is $(1-\alpha)(1-q_2)^k / F_k = 1 / \bigl(1 + \tfrac{\alpha}{1-\alpha}\bigl(\tfrac{1-q_1}{1-q_2}\bigr)^k\bigr)$, and since $(1-q_1)/(1-q_2) < 1$ the power tends to 0, so the proportion tends to 1. With the numbers given, $F_5 = 0.7 \times 0.4^5 + 0.3 \times 0.9^5 = 0.7 \times 0.01024 + 0.3 \times 0.59049 \approx 0.00717 + 0.17715 = 0.184$: about 18% of the problems remain, and 96% of those are hard. Compared with a single-kind model with the same average detection rate, $\bar q = 0.7 \times 0.6 + 0.3 \times 0.1 = 0.45$, which predicts $0.55^5 \approx 0.050$, the mixture leaves nearly four times as many problems. Repeating the same method on similar participants keeps finding the easy problems' replacements and rarely the hard ones; change methods (field studies, expert review, accessibility testing, different user groups, longer tasks) to raise $q_2$. The same heterogeneity effect undermines the Nielsen–Landauer model in [[hci/usability-evaluation]].
:::
:::
