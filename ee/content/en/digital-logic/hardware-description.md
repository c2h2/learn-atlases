Every design in this course so far has been drawn by hand: truth tables, Karnaugh maps, state tables, gate schematics. That works for a few dozen gates. A modern chip has billions of transistors, and an FPGA design for a student project may have tens of thousands of LUTs. At that scale designers *describe* hardware in text, in a **hardware description language** (HDL), and leave the translation into gates to software: a **simulator** executes the description to check its behaviour, and a **synthesis** tool maps it onto a library of cells or onto FPGA resources. A **static timing analyser** then checks every path against the clock, using exactly the setup and hold constraints of [[digital-logic/latches-flip-flops]].

This chapter introduces Verilog, the most widely used HDL, in the subset that synthesises into hardware; shows how the blocks of the previous chapters are written in it; explains how simulation and synthesis interpret the same text differently; develops static timing analysis; and collects the rules of synchronous design practice that make large designs work. The other major HDL, VHDL, expresses the same ideas with a stricter, more verbose syntax; SystemVerilog (IEEE 1800, which has absorbed Verilog) adds features for verification. The key idea is the same in all of them: **you are describing hardware, not writing a program**. Every line should correspond to a circuit you could draw.

## Modules and combinational logic

The unit of a Verilog design is the **module**: a block with named ports, like a chip with pins. Inside, signals are declared as **wires** (connections, driven continuously) or **regs** (variables assigned in procedural blocks; despite the name, not necessarily registers). Signals may be **vectors**: `wire [7:0] a;` is an 8-bit bus with `a[7]` the most significant bit.

```verilog
module full_adder (
  input  wire a, b, cin,
  output wire s, cout
);
  assign s    = a ^ b ^ cin;                 // sum: parity of the three inputs
  assign cout = (a & b) | (cin & (a ^ b));   // carry: majority
endmodule
```

A **continuous assignment** `assign y = expression;` describes combinational logic: whenever any signal on the right changes, `y` is recomputed. The operators are those of C applied bitwise: `~` (NOT), `&` (AND), `|` (OR), `^` (XOR), plus arithmetic `+ - *`, comparisons `== != < >`, shifts `<< >>`, concatenation `{a, b}` and the conditional `s ? x : y`, which synthesises to a multiplexer. Literals carry a width and a base: `4'b1010`, `8'hA5`, `16'd1000`. Writing the width explicitly avoids a large class of bugs.

Larger designs are built by **instantiating** modules and wiring them together, exactly as on a schematic:

```verilog
module adder4 (
  input  wire [3:0] a, b,
  input  wire       cin,
  output wire [3:0] s,
  output wire       cout
);
  wire c1, c2, c3;   // internal carries
  full_adder fa0 (.a(a[0]), .b(b[0]), .cin(cin), .s(s[0]), .cout(c1));
  full_adder fa1 (.a(a[1]), .b(b[1]), .cin(c1),  .s(s[1]), .cout(c2));
  full_adder fa2 (.a(a[2]), .b(b[2]), .cin(c2),  .s(s[2]), .cout(c3));
  full_adder fa3 (.a(a[3]), .b(b[3]), .cin(c3),  .s(s[3]), .cout(cout));
endmodule
```

This is the ripple-carry adder of [[digital-logic/combinational-building-blocks]], written **structurally**. The same adder can be written **behaviourally** as `assign {cout, s} = a + b + cin;`, and a synthesis tool will then choose an adder architecture — ripple, carry-lookahead or prefix — to meet the timing constraint. Behavioural descriptions of arithmetic are almost always preferable: shorter, clearer, and they let the tool optimise.

### Procedural combinational logic

More complex combinational logic is written in an `always` block with a sensitivity list `@(*)`, meaning "re-evaluate whenever any input changes". Inside, `if` and `case` statements describe priority logic and multiplexers:

```verilog
module mux4 (
  input  wire [1:0] sel,
  input  wire [7:0] d0, d1, d2, d3,
  output reg  [7:0] y
);
  always @(*) begin
    case (sel)
      2'd0: y = d0;
      2'd1: y = d1;
      2'd2: y = d2;
      default: y = d3;
    endcase
  end
endmodule
```

::: definition Synthesisable combinational always block {#def-comb}
An `always @(*)` block describes combinational logic if and only if, on **every** path through the block, **every** signal assigned anywhere in the block is assigned a value, and no signal is read before it is assigned. Assignments in such blocks use the **blocking** operator `=`, which updates its left-hand side immediately, so later statements see the new value — as a chain of gates would.
:::

If some path leaves an output unassigned, the language semantics say it keeps its old value — and keeping a value requires memory. The synthesis tool then **infers a latch**, almost never what was intended:

```verilog
always @(*) begin
  if (en) y = d;      // no else: y must hold its value when en = 0  ->  a latch
end
```

The cure is to assign every output on every path, most simply by giving default values at the top of the block (`y = 8'd0;` before the `if`), or by including `default` in every `case`.

::: warning Inferred latches
A synthesis warning such as "latch inferred for signal y" is nearly always a bug. The latch is transparent while its enable is active, so the circuit's behaviour depends on gate delays, timing analysis treats it differently from a flip-flop, and simulation of the RTL may not match the gate-level netlist. Treat inferred-latch warnings as errors, and check the synthesis report for them on every run.
:::

## Sequential logic

Flip-flops are described by an `always` block triggered on a clock edge:

```verilog
module counter8 (
  input  wire       clk, rst, en,
  output reg  [7:0] q
);
  always @(posedge clk) begin
    if (rst)      q <= 8'd0;       // synchronous reset
    else if (en)  q <= q + 8'd1;   // count when enabled
  end                              // otherwise q holds: a register with enable
endmodule
```

Here *not* assigning `q` on some path is exactly right: in a clocked block "hold the value" is what a flip-flop does. The tool builds an 8-bit register, an incrementer, and the enable and reset multiplexers of [[digital-logic/registers-counters#prop-synccount]]. An **asynchronous** reset is written by adding it to the sensitivity list: `always @(posedge clk or posedge arst)`, with the reset tested first.

::: definition Blocking and nonblocking assignment {#def-nonblocking}
In a clocked `always` block, the **nonblocking** assignment `q <= expr;` evaluates `expr` immediately but schedules the update of `q` for the end of the current simulation time step, after all blocks triggered by the same clock edge have evaluated their right-hand sides. All nonblocking assignments triggered by one edge therefore read the values from *before* the edge and update together, which is how a bank of flip-flops sharing a clock behaves.
:::

The difference matters as soon as one register feeds another:

```verilog
always @(posedge clk) begin   // correct: a two-stage shift register
  q1 <= d;
  q2 <= q1;                   // reads the OLD q1
end

always @(posedge clk) begin   // wrong: q2 gets d in the same cycle
  q1 = d;
  q2 = q1;                    // reads the NEW q1; synthesis builds one register
end
```

The rule that avoids the trouble is simple and universal: **use `<=` in clocked blocks and `=` in combinational blocks, and never mix them in one block.**

### Finite-state machines in Verilog

The recommended style mirrors the structure of [[digital-logic/finite-state-machines]]: a clocked block for the state register, a combinational block for the next-state logic, and separate logic for the outputs. Here is the Moore 101 detector of [[digital-logic/finite-state-machines#ex-101]]:

```verilog
module detect101 (
  input  wire clk, rst, x,
  output wire z
);
  localparam S0 = 2'b00, S1 = 2'b01, S2 = 2'b10, S3 = 2'b11;
  reg [1:0] state, next;

  always @(posedge clk)              // state register
    if (rst) state <= S0;
    else     state <= next;

  always @(*) begin                  // next-state logic
    case (state)
      S0: next = x ? S1 : S0;
      S1: next = x ? S1 : S2;
      S2: next = x ? S3 : S0;
      S3: next = x ? S1 : S2;
      default: next = S0;            // safe recovery from illegal codes
    endcase
  end

  assign z = (state == S3);          // Moore output
endmodule
```

The code is a direct transcription of the state table, with the state codes named. A synthesis tool recognises the structure, may re-encode the states (for instance one-hot on an FPGA), and minimises the logic — you never draw the Karnaugh maps.

::: quiz
Which code infers a flip-flop and no latch, for an 8-bit signal `y`?
- [ ] `always @(*) if (load) y = d;`
- [x] `always @(posedge clk) if (load) y <= d;`
- [ ] `always @(*) begin y = 8'd0; if (load) y <= d; end`
- [ ] `assign y = load ? d : y;`
::: solution
In a clocked block, holding the value when `load` is false is what a register with enable does, so the second line gives eight flip-flops and a multiplexer. The first infers a latch (no assignment when `load` is false). The third mixes blocking and nonblocking assignments in a combinational block, which is poor style and simulates confusingly. The fourth is a combinational loop — `y` depends on itself with no clock — which synthesises to an asynchronous latch-like feedback circuit, or is rejected.
:::
:::

## Simulation and testbenches

A Verilog simulator is **event-driven**: it keeps a queue of times at which signals change and, at each time, evaluates the blocks sensitive to those changes until nothing more changes. Signals are four-valued: `0`, `1`, `x` (unknown — for example an uninitialised register, or two drivers in conflict) and `z` (high impedance, an undriven tristate). An `x` that propagates to an output usually reveals a missing reset or an unassigned signal.

A **testbench** is a module with no ports that instantiates the design under test, generates a clock and stimulus, and checks the outputs. It uses constructs that have no hardware meaning — delays `#5`, `initial` blocks, `$display` — and is never synthesised.

```verilog
module tb_detect101;
  reg  clk = 1'b0, rst = 1'b1, x = 1'b0;
  wire z;
  detect101 dut (.clk(clk), .rst(rst), .x(x), .z(z));

  always #5 clk = ~clk;              // 10 ns clock period

  reg [7:0] pattern = 8'b1010_1101;
  integer i;
  initial begin
    @(negedge clk) rst = 1'b0;       // release reset away from the active edge
    for (i = 7; i >= 0; i = i - 1) begin
      x = pattern[i];                // apply the next bit, MSB first
      @(negedge clk);                // one rising edge later, look at z
      $display("x=%b z=%b", x, z);
    end
    $finish;
  end
endmodule
```

Stimulus is applied on the *falling* edge so that it is stable around the rising edge where the design samples it — the testbench equivalent of meeting setup and hold. For the input bits $1, 0, 1, 0, 1, 1, 0, 1$ the expected output column is $0, 0, 1, 0, 1, 0, 0, 1$: the pattern completes after the third, fifth and eighth bits. A good testbench computes the expected values itself (from a simple reference model) and compares them automatically, rather than relying on someone reading the printout.

::: example From Verilog to hardware {#ex-synth}
What hardware does a synthesis tool build for the following module, and how many flip-flops does it contain?

```verilog
module edge_detect (
  input  wire clk, a,
  output wire rise
);
  reg a_d;
  always @(posedge clk) a_d <= a;
  assign rise = a & ~a_d;
endmodule
```
::: solution
The clocked block creates one D flip-flop storing the value of `a` from the previous cycle. The continuous assignment is an AND gate with one inverted input. So `rise` is $1$ during a cycle in which `a` is $1$ but was $0$ at the previous clock edge: a **rising-edge detector** producing a one-cycle pulse, one flip-flop and one gate. It is a Mealy output (it depends on the present `a` combinationally); if `a` comes from outside the clock domain it must first pass through a synchroniser ([[digital-logic/latches-flip-flops#thm-mtbf]]), giving three flip-flops in all.
:::
:::

## Static timing analysis

Simulation checks *function* for the test cases you thought of. **Static timing analysis** (STA) checks *timing* for every path, without any test vectors, by treating the circuit as a graph.

::: definition Timing graph, arrival time and slack {#def-sta}
The **timing graph** of a synchronous circuit has a node for each gate output (and each register output and input) and an edge from each gate input to its output weighted by the gate's delay. Paths start at register outputs (launched at $t_{pcq}$ after the clock edge) or primary inputs, and end at register inputs or primary outputs. The **arrival time** $AT(v)$ of a node is the latest time at which its signal can settle; the **required time** $RT(v)$ is the latest time at which it may settle without violating a setup constraint downstream. The **slack** is $RT(v) - AT(v)$. A negative slack anywhere is a timing violation; the **critical path** passes through the nodes of least slack.
:::

::: theorem Arrival and required times {#thm-sta}
For an acyclic timing graph, the arrival times satisfy

$$
AT(v) = \max_{u \to v}\bigl(AT(u) + d_{uv}\bigr),
$$ {#eq-at}

with $AT = t_{pcq}$ at register outputs, and the required times satisfy

$$
RT(u) = \min_{u \to v}\bigl(RT(v) - d_{uv}\bigr),
$$ {#eq-rt}

with $RT = T_c - t_{setup}$ at register inputs. Both are computed in a single pass over the nodes in topological order (forward for $AT$, backward for $RT$), in time proportional to the number of edges. A circuit meets its setup constraints iff every slack is non-negative.
:::

::: proof
The combinational logic between registers contains no cycles (every cycle passes through a register), so the graph is a directed acyclic graph and has a topological order. A node's signal settles once its latest input has settled and the gate delay has elapsed; this is [[#eq-at]], and since all predecessors precede $v$ in topological order their arrival times are known when $v$ is processed. By induction $AT(v)$ is the maximum over all paths into $v$ of the path delay. Symmetrically, $u$ must settle early enough for every successor to meet its own required time, which is [[#eq-rt]], computed in reverse topological order; $RT(u)$ is the minimum over all paths out of $u$. A register input meets setup iff $AT \le T_c - t_{setup}$; and $RT(v) - AT(v) \ge 0$ at every node iff this holds at every endpoint, because the slack along a path is non-increasing towards the worst endpoint. Each edge is visited once in each pass.
:::

Hold analysis is the mirror image: it uses **minimum** delays (contamination delays) and the earliest arrival times, $AT_{min}(v) = \min_u(AT_{min}(u) + d^{min}_{uv})$, compared against $t_{hold}$ at register inputs.

::: widget graph
nodes: A@0,0; B@0,2; C@0,4; G1@2,1; G2@2,3; G4@4,4; G3@4,2; G5@6,3
edges: A>G1:40; B>G1:40; B>G2:60; C>G2:60; G1>G3:50; G2>G3:50; G2>G4:30; C>G4:30; G3>G5:45; G4>G5:45
algorithm: topo
caption: The timing graph of the example below. Each edge carries the delay (in ps) of the gate it enters. Step through the topological sort: this is the order in which a timing analyser visits the nodes to compute arrival times, each node only after all of its inputs. Drag the nodes to tidy the picture.
:::

::: example A static timing analysis {#ex-sta}
Registers drive signals $A$, $B$, $C$ with $t_{pcq} = 50\,\mathrm{ps}$. Gate $G_1$ (inputs $A, B$) has delay $40\,\mathrm{ps}$, $G_2$ ($B, C$) $60\,\mathrm{ps}$, $G_3$ ($G_1, G_2$) $50\,\mathrm{ps}$, $G_4$ ($G_2, C$) $30\,\mathrm{ps}$ and $G_5$ ($G_3, G_4$) $45\,\mathrm{ps}$; $G_5$ drives a register with $t_{setup} = 30\,\mathrm{ps}$. The clock period is $250\,\mathrm{ps}$. Find all arrival times, required times and slacks, and the critical path.
::: solution
*Arrival times* (forward, [[#eq-at]]): $AT(A) = AT(B) = AT(C) = 50$. $AT(G_1) = 50 + 40 = 90$; $AT(G_2) = 50 + 60 = 110$; $AT(G_3) = \max(90, 110) + 50 = 160$; $AT(G_4) = \max(110, 50) + 30 = 140$; $AT(G_5) = \max(160, 140) + 45 = 205\,\mathrm{ps}$.

*Required times* (backward, [[#eq-rt]]): $RT(G_5) = 250 - 30 = 220$. $RT(G_3) = RT(G_4) = 220 - 45 = 175$. $RT(G_1) = 175 - 50 = 125$; $RT(G_2) = \min(175 - 50, 175 - 30) = 125$. $RT(A) = 125 - 40 = 85$; $RT(B) = \min(125 - 40, 125 - 60) = 65$; $RT(C) = \min(125 - 60, 175 - 30) = 65$.

*Slacks* ($RT - AT$): $A$: $35$; $B$: $15$; $C$: $15$; $G_1$: $35$; $G_2$: $15$; $G_3$: $15$; $G_4$: $35$; $G_5$: $15\,\mathrm{ps}$.

All slacks are positive, so timing is met with $15\,\mathrm{ps}$ to spare. The critical path is the chain of least slack, $B$ (or $C$) $\to G_2 \to G_3 \to G_5$, of delay $50 + 60 + 50 + 45 = 205\,\mathrm{ps}$; the minimum clock period is $205 + 30 = 235\,\mathrm{ps}$. Speeding up $G_1$ or $G_4$ would gain nothing.
:::
:::

Timing analysers also need to be told what *not* to check. A **false path** is a structural path that can never be exercised (for example through two multiplexers whose selects are mutually exclusive); a **multicycle path** is one whose result is only sampled every second or third cycle. These **timing exceptions** are part of the design's constraints, together with the clock definitions and input/output delays, and wrong exceptions are a classic cause of chips that pass STA and fail in the lab.

::: widget plot
f: 1/x - D
x: 0.3, 3
y: -0.8, 2.5
sliders: D=0.69:0.2:1.5:0.01
hlines: 0
labels: \text{slack } T_c - (t_{pcq} + t_{pd} + t_{setup}) \text{ in ns}
caption: The setup slack of the critical path against the clock frequency in gigahertz, for a path delay $D = t_{pcq} + t_{pd} + t_{setup}$ in nanoseconds. Slack falls as $1/f$ and crosses zero at $f_{max} = 1/D$; with $D = 0.69\,\mathrm{ns}$ (the path of [[digital-logic/latches-flip-flops#ex-timing]]) that is $1.45\,\mathrm{GHz}$. Hover to read the slack at a given target frequency.
:::

::: example Pipelining to meet timing {#ex-pipeline}
A block of combinational logic has $t_{pd} = 1.2\,\mathrm{ns}$ between registers with $t_{pcq} + t_{setup} = 0.1\,\mathrm{ns}$. The target clock is $1\,\mathrm{GHz}$. The logic can be split by a register into parts of $0.7\,\mathrm{ns}$ and $0.5\,\mathrm{ns}$. Compare the maximum frequency, latency and throughput before and after.
::: solution
*Before:* $T_c \ge 1.2 + 0.1 = 1.3\,\mathrm{ns}$, $f_{max} = 769\,\mathrm{MHz}$: the slack at $1\,\mathrm{GHz}$ is $1.0 - 1.3 = -0.3\,\mathrm{ns}$, a violation. Latency: one cycle of $1.3\,\mathrm{ns}$.

*After:* the two stages need $0.7 + 0.1 = 0.8\,\mathrm{ns}$ and $0.5 + 0.1 = 0.6\,\mathrm{ns}$; the slower stage sets $T_c \ge 0.8\,\mathrm{ns}$, $f_{max} = 1.25\,\mathrm{GHz}$, and the $1\,\mathrm{GHz}$ target is met with $0.2\,\mathrm{ns}$ of slack. Latency: two cycles, $2\,\mathrm{ns}$ at $1\,\mathrm{GHz}$ — longer than before. Throughput: one result per cycle, $10^9$ per second instead of at most $7.7\times10^8$.

Pipelining trades latency (and a register's worth of area and power) for throughput. An unbalanced split wastes some of the gain: a perfect split into $0.6 + 0.6$ would allow $T_c = 0.7\,\mathrm{ns}$.
:::
:::

## Synchronous design practice

Static timing analysis, synthesis and simulation all rest on assumptions. A design that respects them can be verified and will work; a design that breaks them may pass simulation and still fail on the bench. The assumptions are the rules of **synchronous design**.

::: algorithm Rules of synchronous design {#alg-sync}
1. **One clock, one edge.** Clock all flip-flops of a block by the same clock on the same edge, distributed by a dedicated clock network (a clock tree in an ASIC, global clock buffers in an FPGA).
2. **No logic on clocks.** Never drive a clock input from logic (a gate, a counter bit, a multiplexer). To make a register load only sometimes, use a clock *enable*. Clock gating for power saving uses special integrated clock-gating cells, inserted by tools.
3. **No combinational loops.** Every feedback path passes through a flip-flop.
4. **Synchronise every asynchronous input** with a two-flip-flop synchroniser before it is used, and only ever synchronise single bits or Gray-coded values.
5. **Reset deliberately.** Assert reset asynchronously if necessary, but release it synchronously, so that all flip-flops leave reset in the same cycle.
6. **Register outputs** of blocks (and of the chip) where glitches or long combinational paths would harm the receiver.
7. **Constrain and analyse.** Give the timing tool every clock, input and output delay; fix every negative slack and every unexplained exception.
:::

The reset rule deserves an example. If an asynchronous reset is released close to a clock edge, some flip-flops may leave reset in one cycle and some in the next — a recovery-and-removal violation, the reset equivalent of setup and hold — and a state machine may start in an illegal state. The **reset synchroniser** asserts the internal reset immediately but releases it through two flip-flops:

```verilog
module reset_sync (
  input  wire clk, arst_n,      // asynchronous, active-low reset input
  output wire rst_n             // reset for the clock domain
);
  reg r1, r2;
  always @(posedge clk or negedge arst_n)
    if (!arst_n) {r2, r1} <= 2'b00;          // assert at once
    else         {r2, r1} <= {r1, 1'b1};     // release two edges later
  assign rst_n = r2;
endmodule
```

::: example A debounced push button {#ex-debounce}
A push button on an FPGA board bounces for up to $5\,\mathrm{ms}$ after each press or release. Design, in Verilog, a circuit clocked at $50\,\mathrm{MHz}$ that produces a clean, synchronised level `btn_clean` and a one-cycle pulse `press` on each press, following the rules above.
::: solution
*Structure.* (1) A two-flip-flop synchroniser brings the asynchronous pin into the clock domain. (2) A counter measures how long the synchronised input has differed from the current clean output; only when it has differed for longer than the bounce time is the clean output updated. (3) The rising-edge detector of [[#ex-synth]] turns the clean level into a pulse.

*Counter size.* $5\,\mathrm{ms}\times 50\,\mathrm{MHz} = 250\,000$ cycles. An 18-bit counter overflows after $2^{18} = 262\,144$ cycles $= 5.24\,\mathrm{ms}$, just longer than the bounce time, so we update the output when the counter reaches its maximum.

```verilog
module debounce (
  input  wire clk, btn_pin,
  output reg  btn_clean,
  output wire press
);
  reg s1, s2;                        // synchroniser
  always @(posedge clk) begin
    s1 <= btn_pin;
    s2 <= s1;
  end

  reg [17:0] cnt;                    // time the input has disagreed
  always @(posedge clk) begin
    if (s2 == btn_clean)
      cnt <= 18'd0;                  // agreement: restart the timer
    else if (cnt == 18'h3FFFF) begin
      btn_clean <= s2;               // stable long enough: accept
      cnt <= 18'd0;
    end else
      cnt <= cnt + 18'd1;
  end

  reg clean_d;                       // edge detector
  always @(posedge clk) clean_d <= btn_clean;
  assign press = btn_clean & ~clean_d;
endmodule
```

Everything is clocked by the one $50\,\mathrm{MHz}$ clock, the asynchronous input is synchronised before use, every register update uses `<=`, and `press` lasts exactly one cycle, so it can enable a counter elsewhere. (In a real design `btn_clean` would also be given a reset value.) The circuit uses $2 + 18 + 1 + 1 = 22$ flip-flops.
:::
:::

::: quiz
A signal generated in a $100\,\mathrm{MHz}$ domain is used in a $33\,\mathrm{MHz}$ domain. It is a single-cycle pulse in the fast domain. Why will a plain two-flip-flop synchroniser in the slow domain not work reliably?
- [ ] Because two flip-flops are never enough at $33\,\mathrm{MHz}$
- [x] Because the $10\,\mathrm{ns}$ pulse can fall entirely between two $30\,\mathrm{ns}$ clock edges and never be sampled
- [ ] Because the pulse must be Gray-coded first
- [ ] Because synchronisers only work from slow to fast domains
::: solution
A pulse that lasts one fast cycle ($10\,\mathrm{ns}$) is shorter than the slow clock period ($30\,\mathrm{ns}$), so it is often missed altogether — a functional failure, not a metastability one. Convert it into a level change first (toggle a flip-flop in the fast domain for each pulse), synchronise the level, and detect its edges in the slow domain; or use a handshake. Two flip-flops are normally plenty for metastability at $33\,\mathrm{MHz}$.
:::
:::

### Crossing clock domains

Large systems have several clocks: a processor clock, a memory interface clock, a USB clock. Signals crossing from one **clock domain** to another are asynchronous to the receiver and need the treatment of [[digital-logic/latches-flip-flops#thm-mtbf]]:

- a **single control bit** goes through a two-flip-flop synchroniser; if it is a pulse shorter than the receiver's clock period it must first be stretched, or converted into a toggle;
- a **multi-bit value that changes rarely** is sent with a **handshake**: the sender holds the data stable and toggles a request bit; the receiver synchronises the request, captures the (now stable) data, and returns a synchronised acknowledge;
- a **stream of data** goes through an **asynchronous FIFO**: a dual-port memory written in one domain and read in the other, with write and read pointers that are converted to Gray code before being synchronised into the opposite domain, so that a pointer sampled mid-change is wrong by at most one position ([[digital-logic/number-systems#prop-gray]]). Comparing the synchronised pointers yields conservative "full" and "empty" flags.

::: warning Simulation does not show metastability or CDC bugs
An RTL simulator treats every flip-flop as ideal: a signal that changes exactly at a clock edge is resolved one way or the other, never left in between. A design with an unsynchronised clock-domain crossing therefore usually simulates perfectly and fails occasionally in hardware — perhaps once a day, in a different place each time. Such bugs are found by design rules and by dedicated **CDC checking** tools that trace every path between clock domains, not by simulation.
:::

::: application The design flow
As of 2026 a typical digital design flow, for an ASIC or an FPGA, runs: RTL in Verilog, SystemVerilog or VHDL (increasingly also generated from higher-level languages such as Chisel or from C++ by high-level synthesis); simulation with self-checking testbenches, often in the UVM methodology, plus formal property checking; lint and CDC checks; logic synthesis against timing constraints; placement and routing (for an ASIC, also clock-tree synthesis and hold fixing); static timing analysis at every process, voltage and temperature corner; and, for an FPGA, bitstream generation. Open-source tools — Icarus Verilog and Verilator for simulation, Yosys for synthesis, nextpnr and OpenROAD for physical design — now cover this whole flow for FPGAs and for open process design kits.
:::

::: history
Early hardware description languages appeared in the 1960s and 1970s for documentation and simulation. Verilog was created around 1984 by Phil Moorby and Prabhu Goel at Gateway Design Automation as a simulation language; Cadence acquired Gateway in 1989 and opened the language, which became IEEE Standard 1364 in 1995 and was merged into SystemVerilog (IEEE 1800) in 2009. VHDL grew out of the US Department of Defense's VHSIC programme and was standardised as IEEE 1076 in 1987. Logic synthesis from HDL became commercially practical in the late 1980s, notably with the tools of Synopsys (founded 1986). Static timing analysis replaced exhaustive gate-level timing simulation for sign-off during the 1990s, as designs outgrew what simulation could cover.
:::

## Where this leads

The Verilog style of this chapter is used to build complete processors in [[computer-architecture/single-cycle-processor]] and [[computer-architecture/pipelining]], where pipelining is applied systematically. The physical side of timing — wire delay, clock distribution and skew, and the energy cost of switching — is developed in [[digital-ic/interconnect]], [[digital-ic/sequential-circuits-clocking]] and [[digital-ic/power-dissipation]]. Microcontrollers ([[embedded-systems/microcontrollers]]) are such designs, seen from the software side.

::: summary
- An HDL describes hardware: modules with ports, instantiated and wired like a schematic. Simulation executes the description; synthesis maps it to gates, LUTs and flip-flops.
- `assign` and `always @(*)` describe combinational logic; every output must be assigned on every path, or a latch is inferred. Use blocking `=` there.
- `always @(posedge clk)` describes flip-flops; use nonblocking `<=`, so that all registers update together. Never mix `=` and `<=` in one block.
- Write FSMs as a state register, a next-state `case` block with a `default`, and output logic.
- Testbenches generate clocks and stimulus, apply inputs away from the active edge, and check outputs automatically.
- Static timing analysis computes arrival times $AT(v) = \max(AT(u) + d)$ forward and required times $RT(u) = \min(RT(v) - d)$ backward in topological order; negative slack is a violation; hold analysis uses minimum delays.
- Pipelining raises the clock frequency and throughput at the cost of latency.
- Synchronous design rules: one clock edge, no logic on clocks, no combinational loops, synchronised asynchronous inputs, synchronous reset release, and safe clock-domain crossings (synchronisers, handshakes, Gray-pointer FIFOs).
:::

## Exercises

::: exercise Reading a literal {level=1 check="165"}
What is the decimal value of the Verilog literal `8'hA5`, and how is it written in binary?
::: solution
$\mathrm{A5}_{16} = 10\cdot16 + 5 = 165$, in binary `8'b1010_0101`.
:::
:::

::: exercise What hardware? {level=1}
What circuit does each line describe? (a) `assign y = s ? a : b;` (b) `assign eq = (a == b);` for 4-bit `a`, `b`. (c) `always @(posedge clk) q <= d;`
::: solution
(a) A 2-to-1 multiplexer, $y = s\,a + \overline{s}\,b$. (b) A 4-bit equality comparator: four XNOR gates and a 4-input AND. (c) A D flip-flop (one per bit of `q`).
:::
:::

::: exercise Setup slack {level=1 check="30e-12"}
A register-to-register path has $t_{pcq} = 50\,\mathrm{ps}$, $t_{pd} = 880\,\mathrm{ps}$ and $t_{setup} = 40\,\mathrm{ps}$, with a $1\,\mathrm{GHz}$ clock and no skew. What is its setup slack, in seconds?
::: solution
$T_c - (t_{pcq} + t_{pd} + t_{setup}) = 1000 - 970 = 30\,\mathrm{ps} = 3\times10^{-11}\,\mathrm{s}$.
:::
:::

::: exercise Find the latch {level=2}
The following block is meant to be a priority encoder. Explain why it infers latches and correct it.

```verilog
always @(*) begin
  if      (req[3]) begin code = 2'd3; valid = 1'b1; end
  else if (req[2]) begin code = 2'd2; valid = 1'b1; end
  else if (req[1]) begin code = 2'd1; valid = 1'b1; end
  else if (req[0]) begin code = 2'd0; valid = 1'b1; end
end
```
::: solution
When `req` is `4'b0000` no branch executes, so `code` and `valid` are not assigned on that path and must hold their old values: latches are inferred for both. Add defaults at the top of the block, `code = 2'd0; valid = 1'b0;`, or a final `else begin code = 2'd0; valid = 1'b0; end`. Then the block is the combinational priority encoder of [[digital-logic/combinational-building-blocks#ex-prio]].
:::
:::

::: exercise Blocking versus nonblocking {level=2}
Registers `a` and `b` hold $3$ and $5$ before a rising clock edge. What do they hold after the edge for (a) `always @(posedge clk) begin a <= b; b <= a; end` and (b) `always @(posedge clk) begin a = b; b = a; end`?
::: solution
(a) Both right-hand sides are evaluated before either update, so `a` becomes $5$ and `b` becomes $3$: a swap, exactly what two cross-connected flip-flops do. (b) `a = b` sets `a` to $5$ immediately; then `b = a` reads the new value, so `b` becomes $5$ as well. The blocking version does not describe two flip-flops exchanging values, and synthesis and simulation may even disagree about it.
:::
:::

::: exercise Arrival times {level=2 check="175e-12"}
Register outputs $X$ and $Y$ are valid at $30\,\mathrm{ps}$. $N_1 = \mathrm{NAND}(X, Y)$ has delay $25\,\mathrm{ps}$, $N_2 = \mathrm{NOR}(Y, N_1)$ $35\,\mathrm{ps}$, $N_3 = \mathrm{XOR}(X, N_2)$ $55\,\mathrm{ps}$ and $N_4 = \mathrm{AND}(N_1, N_3)$ $30\,\mathrm{ps}$. Find the arrival time of $N_4$ in seconds, and the earliest time at which $N_4$ can change if the contamination delays equal the propagation delays.
::: solution
Latest arrivals: $N_1 = 30 + 25 = 55$; $N_2 = \max(30, 55) + 35 = 90$; $N_3 = \max(30, 90) + 55 = 145$; $N_4 = \max(55, 145) + 30 = 175\,\mathrm{ps} = 1.75\times10^{-10}\,\mathrm{s}$.

Earliest changes (minimum over inputs): $N_1 = 55$; $N_2 = \min(30, 55) + 35 = 65$; $N_3 = \min(30, 65) + 55 = 85$; $N_4 = \min(55, 85) + 30 = 85\,\mathrm{ps}$. The output is unstable between $85$ and $175\,\mathrm{ps}$ after the clock edge.
:::
:::

::: exercise A decade counter in Verilog {level=2}
Write a synthesisable Verilog module for a synchronous counter that counts $0$ to $9$ and wraps, with synchronous reset `rst`, enable `en` and a terminal-count output `tc` that is $1$ when the count is $9$ and `en` is $1$.
::: solution
```verilog
module decade (
  input  wire       clk, rst, en,
  output reg  [3:0] q,
  output wire       tc
);
  assign tc = en & (q == 4'd9);
  always @(posedge clk) begin
    if (rst)       q <= 4'd0;
    else if (tc)   q <= 4'd0;
    else if (en)   q <= q + 4'd1;
  end
endmodule
```

The wrap is a synchronous load of $0$ when the count is $9$ (never an asynchronous reset on detecting $10$; see [[digital-logic/registers-counters]]). Cascading: the `tc` of this counter can drive the `en` of the next decade.
:::
:::

::: exercise A reset synchroniser {level=3}
Explain, cycle by cycle, what the `reset_sync` module above does when `arst_n` falls (reset asserted) and when it rises (reset released) close to a clock edge, and why its output can safely drive the synchronous logic of the domain.
::: solution
*Assertion.* When `arst_n` falls, the asynchronous clause forces `r1` and `r2` to $0$ immediately, without waiting for a clock, so `rst_n` goes low at once and the domain enters reset even if its clock is stopped.

*Release.* When `arst_n` rises, the flip-flops leave their asynchronous reset. If this happens close to a clock edge, `r1` may go metastable while sampling the constant $1$ — but `r2` samples `r1` one clock later, so `r2` has a full clock period of resolution time ([[digital-logic/latches-flip-flops#thm-mtbf]]). At the first or second rising edge after release `r1` becomes $1$, and one edge later `r2` (and so `rst_n`) becomes $1$, *synchronously* with the clock. Every flip-flop in the domain therefore sees reset released at the same edge, and the setup/hold-like recovery and removal times of their asynchronous reset pins are met by construction, because `rst_n` changes only $t_{pcq}$ after an edge, like any other register output.
:::
:::

::: exercise Pipelining a multiplier {level=3}
A combinational $16\times16$ multiplier has $t_{pd} = 2.4\,\mathrm{ns}$; register overhead is $t_{pcq} + t_{setup} = 0.1\,\mathrm{ns}$. (a) What is $f_{max}$ unpipelined? (b) If the multiplier can be cut into $k$ equal stages, with each pipeline register adding the same overhead, give $f_{max}$ and the latency in nanoseconds as functions of $k$, and evaluate them for $k = 4$. (c) Why do returns diminish as $k$ grows?
::: solution
(a) $T_c = 2.5\,\mathrm{ns}$, $f_{max} = 400\,\mathrm{MHz}$.

(b) Each stage has $2.4/k$ of logic, so $T_c = 2.4/k + 0.1\,\mathrm{ns}$, $f_{max} = 1/(2.4/k + 0.1)$, and the latency is $kT_c = 2.4 + 0.1k\,\mathrm{ns}$. For $k = 4$: $T_c = 0.7\,\mathrm{ns}$, $f_{max} = 1.43\,\mathrm{GHz}$, latency $2.8\,\mathrm{ns}$.

(c) As $k$ grows, $T_c$ approaches the fixed overhead $0.1\,\mathrm{ns}$, so $f_{max}$ can never exceed $10\,\mathrm{GHz}$ however finely the logic is cut, while latency, register count and clock power keep growing linearly. In practice logic cannot be cut into perfectly equal stages either, and clock skew adds to the overhead.
:::
:::

::: exercise An asynchronous FIFO pointer {level=3}
An asynchronous FIFO of depth $8$ uses 4-bit write and read pointers (one extra bit to distinguish full from empty), passed between domains in Gray code. Show that if the write pointer changes from $7$ to $8$ while the read domain samples it, the synchronised value can only be $7$ or $8$, and explain why that is safe for the "empty" flag.
::: hint
Write the Gray codes of $7$ and $8$.
:::
::: solution
In 4-bit Gray code ([[digital-logic/number-systems#def-gray]]), $7 = 0111 \to 0100$ and $8 = 1000 \to 1100$: they differ only in the most significant bit. Each synchronising flip-flop sees either the old or the new value of its own bit (after resolving any metastability), and only one bit is changing, so the sampled pointer is either $0100$ ($7$) or $1100$ ($8$) — never a third value. In binary, $0111 \to 1000$ changes all four bits, and a mixed sample could be anything from $0$ to $15$.

The read domain declares "empty" when its read pointer equals the synchronised write pointer. If it sees the old value $7$ although $8$ has been written, it believes the FIFO holds one entry fewer than it does: it may report empty a cycle too long, which is safe (it waits), but it will never read an entry that has not been written. The same argument applied to the read pointer in the write domain makes "full" conservative.
:::
:::
