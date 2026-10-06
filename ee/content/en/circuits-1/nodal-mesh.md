Not every resistive network shrinks to a single equivalent element. The moment you add a current source, or a bridge topology, or a dependent element, you cannot keep combining, so you need a method that works for any network without you first spotting the trick. Two such methods, nodal analysis and mesh analysis, do the job. Both are nothing more than Kirchhoff's laws written in a disciplined, systematic way, and both turn a drawing into a small system of linear equations that you can solve by hand for small circuits and by matrix for anything larger. This lesson sets up both methods, works complete examples of each, and tells you which one to reach for.

## Nodal analysis

The method is built on current, and its natural unknowns are the voltages at the network nodes.

::: definition Node and node voltage {#def-node}
A **node** is a point where two or more circuit elements meet, and any ideal wire between such points is part of the same node. A **node voltage** is the voltage of that node measured with respect to one chosen node, the **reference** or **ground** node, whose voltage is defined to be zero. The choice of reference is arbitrary for the physics, fixed by convenience in practice; it is the ground on a real board.
:::

::: theorem Nodal analysis {#thm-nodal}
Choose a reference node. For every other node write one equation that is Kirchhoff's current law at that node, expressed in terms of the node voltages. Because every element current is a difference of node voltages divided by its resistance, every node equation is a linear equation in the node voltages. Solving the resulting system gives the node voltages, and from them every branch current, voltage and power in the network follows.
:::

The key move is that each branch current is written as $(v_i - v_j)/R$ on the basis of Ohm's law, so writing "current leaving node $i$ into node $j$" immediately gives $(v_i - v_j)/R$. Summing the currents leaving a node and setting the sum to zero is the entire equation at that node. No need to guess a current direction. This is what makes the method mechanical.

::: example A two-node circuit with a current source {#ex-nodal}
Node 1 is connected to a $10\ \mathrm V}$ source through $R_1=2\ \mathrm{k\Omega}$ and to ground through $R_2=5\ \mathrm{k\Omega}$ and to node 2 through $R_3=4\ \mathrm{k\Omega}$. Node 2 is connected to ground through $R_4=5\ \mathrm{k\Omega}$ and is driven by a $2\ \mathrm{mA}$ current source into the node. Find the node voltages.
::: solution
Using the "sum of currents leaving a node is zero" convention, at node 1:

$$
\frac{v_1-10}{2\ \mathrm{k}} + \frac{v_1}{5\ \mathrm{k}} + \frac{v_1-v_2}{4\ \mathrm{k}} = 0.
$$

At node 2, the current source injects $2\ \mathrm{mA}$:

$$
\frac{v_2-v_1}{4\ \mathrm{k}} + \frac{v_2}{5\ \mathrm{k}} - 2\ \mathrm{mA} = 0.
$$

Writing these in standard form with resistances in $\mathrm{k\Omega}$ and currents in $\mathrm{mA}$, the coefficient matrix is

$$
\begin{pmatrix} 0.85 & -0.25 \\ -0.25 & 0.45 \end{pmatrix}
\begin{pmatrix} v_1 \\ v_2 \end{pmatrix} =
\begin{pmatrix} 5 \\ 2 \end{pmatrix}.
$$

Solving gives $v_1 = 7.53\ \mathrm V$ and $v_2 = 8.63\ \mathrm V$. As a check, the current leaving node 1 through $R_1$ is $(10-7.53)/2\ \mathrm{k}\Omega = 1.23\ \mathrm{mA}$, the current into $R_2$ is $7.53/5\ \mathrm{k\Omega}=1.51\ \mathrm{mA}$, and the current into $R_3$ is $(7.53-8.63)/4\ \mathrm{k}\Omega=-0.27\ \mathrm{mA}$; the sum $1.51-0.27=1.23\ \mathrm{mA}$, and Kirchhoff's current law is satisfied exactly at node 1.
:::
:::

::: warning The reference node is a choice, not a law {#warn-node}
You are free to pick any node as ground, and the physics is the same. But some choices are better. If a voltage source sits between two nodes, choosing the node on one side as reference reduces the unknowns. If the ground is shared by many elements, the equations are simpler. If a dependent source is in the circuit, you will need an extra equation for the controlling variable, and choosing the reference to make that variable a node voltage is often the cleanest path. Pick the reference deliberately, as a first step, not as an afterthought.
:::

::: quiz
A single node above ground has a $4\ \mathrm{k\Omega}$ to a $12\ \mathrm V}$ source and a $2\ \mathrm{k\Omega}$ to ground. What is the node voltage?
- [x] $8\ \mathrm V}$
- [ ] $12\ \mathrm V}$
- [ ] $4\ \mathrm V}$
- [ ] $2\ \mathrm V}$
::: solution
This is a voltage divider: $v = 12\times\dfrac{2}{4+2}=8\ \mathrm V}$. The larger series resistor ($4\ \mathrm{k\Omega}$) is between the source and the node, so the node sits lower.
:::
:::

## Mesh analysis

The dual method is built on voltage.

::: definition Mesh {#def-mesh}
A **mesh** is a loop in a planar circuit that contains no other loops inside it. A **mesh current** is the fictitious current that flows around one mesh. Every element current in a planar circuit is expressed as a sum or difference of mesh currents, and the unknowns are the mesh currents, one per mesh.
:::

::: proposition Mesh equations {#prop-mesh}
For each mesh, apply Kirchhoff's voltage law around it, writing each element voltage as $R$ times the mesh current through it, with a minus sign for each shared resistor. The result is a system of linear equations in the mesh currents. Solving gives the mesh currents, and every element current, voltage and power follows.
:::

The two methods are dual: nodal uses KCL and has node voltages as unknowns, while mesh uses KVL and has mesh currents as unknowns. For the same network the number of equations differs only by how you partition the network; for a circuit with $n$ nodes and $b$ branches and no floating sources, nodal analysis needs $n-1$ equations and mesh analysis needs $b-n+1$. For many small circuits the two are comparable in size, but the topology decides which is shorter.

::: example A two-mesh resistive circuit {#ex-mesh}
A $9\ \mathrm V}$ source is in series with a $1\ \mathrm{k\Omega}$ resistor in the left mesh. A $2\ \mathrm{k\Omega}$ resistor is shared between the two meshes. The right mesh contains a $3\ \mathrm{k\Omega}$ resistor. Find the mesh currents and the current in the shared resistor.
::: solution
Applying Kirchhoff's voltage law to the left mesh, going around in the direction of the first mesh current, gives

$$
-9 + 1\ \mathrm{k}\ \mathcal I_1 + 2\ \mathrm{k}\,(\mathcal I_1 - \mathcal I_2) = 0,
$$

and the right mesh gives

$$
2\ \mathrm{k}\,(\mathcal I_2 - \mathcal I_1) + 3\ \mathrm{k}\ \mathcal I_2 = 0.
$$

Standard form, with resistances in $\mathrm{k\Omega}$ and currents in $\mathrm{mA}$, is

$$
\begin{pmatrix} 3 & -2 \\ -2 & 5 \end{pmatrix}
\begin{pmatrix} \mathcal I_1 \\ \mathcal I_2 \end{pmatrix} = \begin{pmatrix} 9 \\ 0 \end{pmatrix}.
$$

Solving gives $\mathcal I_1 = 4.09\ \mathrm{mA}$ and $\mathcal I_2 = 1.64\ \mathrm{mA}$. The current in the shared $2\ \mathrm{k\Omega}$ is $\mathcal I_1 - \mathcal I_2 = 2.45\ \mathrm{mA}$. As a check, the left mesh drop is $1\ \mathrm{k}\times4.09\ \mathrm{mA} + 2\ \mathrm{k}\times2.45\ \mathrm{mA} = 4.09+4.91 = 9\ \mathrm V}$, matching the source, and the right mesh drop is $2\ \mathrm{k}\times(-2.45\ \mathrm{mA}) + 3\ \mathrm{k}\times1.64\ \mathrm{mA} = -4.91+4.91 = 0$, as KVL requires.
:::
:::

## Choosing between the methods

The practical rule is topological: pick the method that gives the fewer unknowns. For the same network the nodal analysis unknowns are one per node (minus the reference), while the mesh analysis unknowns are one per mesh. In a bridge or a network with a lot of current sources, the mesh method tends to be smaller; in a network with many branches but few nodes, the nodal method is shorter. When the two are comparable, choose the one whose equations are simpler, and if the network has dependent sources, the one whose equations do not require an extra constraint.

There is one further consideration: physical sense. If the network models a physical device that is fundamentally current-driven (for instance, a current mirror, a transconductance stage, or a sensor output), the nodal method is natural, because the device's own variables are node voltages. If it is voltage-driven, the mesh method is more direct. There is no universal answer, but the choice is never arbitrary.

## Supernodes and supermeshes

When a voltage source sits between two non-reference nodes, the node voltages are not independent and you cannot write KCL at both of them directly. You then merge the two nodes into a **supernode**, write one KCL equation for the combined node, and add the constraint that the voltage difference equals the source. Similarly, when a current source sits in a shared branch, you merge the two meshes into a **supermesh**, write one KVL equation around the outer path, and add the constraint on the mesh currents. Both devices are extensions of the same two methods, not new methods. The discipline of the method, of writing the equations from the physical laws rather than of memorising a procedure, is what makes them work.

There is a further reason to keep the power balance as a standing habit. In a design, the power in the elements is not a check but a specification. A resistor must be rated above the power it actually carries, a source must be able to deliver what the network demands, and a node that is expected to sit near a rail will be checked against the currents that flow through it. The same numbers that certify a solution are the numbers a designer uses to choose parts, and the two acts, checking and selecting, are the same computation. Do the balance once and you have both.

## Computing power from a solved network

Once the node voltages or mesh currents are known, the most useful thing you can do is to compute the power in each element and check the balance. This is not optional. Power is where sign errors and missed elements show up, and a network in which the total power delivered does not equal the total power absorbed is, at the very least, a network you have not solved.

::: example Power balance in a solved network {#ex-power}
Using the two-node circuit of the worked example, compute the power in each resistor, the power delivered by the sources, and show that they balance.
::: solution
The branch currents are $i_1=1.23\ \mathrm{mA}$ through the $2\ \mathrm{k\Omega}$, $i_2=1.51\ \mathrm{mA}$ through the $5\ \mathrm{k\Omega}$ to ground, $i_3=-0.27\ \mathrm{mA}$ through the $4\ \mathrm{k\Omega}$, and $i_2$-side $1.73\ \mathrm{mA}$ through the $5\ \mathrm{k\Omega}$ at node 2. The power in each resistor is $p=i^2R$:

$$
p_1 = 3.04\ \mathrm{mW},\quad p_2 = 11.35\ \mathrm{mW},\quad p_3 = 0.30\ \mathrm{mW},\quad p_4 = 14.9\ \mathrm{mW}.
$$

So the resistors absorb $29.6\ \mathrm{mW}$. The $10\ \mathrm V}$ source delivers $10	imes1.23\ \mathrm{mA} = 12.3\ \mathrm{mW}$, and the $2\ \mathrm{mA}$ current source, acting at $v_2=8.63\ \mathrm V}$, delivers $8.63	imes2\ \mathrm{mA} = 17.3\ \mathrm{mW}$, totalling $29.6\ \mathrm{mW}$. Delivered equals absorbed, so the solution is internally consistent. This power balance is the most reliable check of a nodal or mesh solution you can do, and it is always available because it uses the same numbers you already have.
:::
:::

::: example A supermesh applied to a shared current source {#ex-supermesh}
Two meshes share a branch that is a $2\ \mathrm{mA}$ current source. The left mesh has a $1\ \mathrm{k\Omega}$ to a $5\ \mathrm V}$ source and the right has a $1\ \mathrm{k\Omega}$ to ground. Find the mesh currents.
::: solution
The current source fixing the branch gives the constraint $\mathcal I_1 - \mathcal I_2 = 2\ \mathrm{mA}$. Write KVL around the outer path, skipping the shared branch, to get an equation for the sum of the currents. The two equations are $\mathcal I_1-\mathcal I_2=2\ \mathrm{mA}$ and, from the outer loop, $1\ \mathrm{k\,\mathcal I_1}+1\ \mathrm{k\,\mathcal I_2}=5\ \mathrm V}$, so $\mathcal I_1+\mathcal I_2=5\ \mathrm{mA}$. Adding and subtracting, $\mathcal I_1=3.5\ \mathrm{mA}$ and $\mathcal I_2=1.5\ \mathrm{mA}$. Check: the current source branch indeed carries $\mathcal I_1-\mathcal I_2=2\ \mathrm{mA}$, and the outer-loop KVL is satisfied.
:::
:::

::: widget plot
f: 0.7534*V
x: 0 15
y: 0 12
sliders:
caption: The node voltage $v_1$ of the two-node example, plotted against the source voltage. Because the network is linear and resistive, the relation is a straight line through the origin; its slope is the ratio of the voltages in the solved circuit, $v_1/V_s = 0.753$. Doubling the source doubles the node voltage and every branch current and power scales by a factor of four.
:::

## Where this leads

With both nodal and mesh analysis in hand, you can solve any resistive network exactly, and the two methods are two views of the same physics. In [[circuits-1/network-theorems]] you learn the theorems that let you replace a subnetwork by a single source and resistance, and these theorems are applied on the very equations you have just learned to write. In [[circuits-1/operational-amplifiers]] the same methods, with a dependent source as the core model, are what make the op-amp circuits work.

::: history
Nodal and mesh analysis as a systematic method were codified in the early decades of the twentieth century as a by-product of the formalisation of Kirchhoff's laws and the adoption of the ideal circuit element. The matrix form of the node equations, and the recognition that the two methods are dual, followed in the work on network theory in the 1930s and 1940s. The supernode and supermesh devices are a standard textbook development of the same methods. See also [[circuits-1/network-theorems]] for the theorems that subsume both.
:::

::: summary
- Nodal analysis writes KCL at each node in terms of node voltages; the unknowns are the node voltages. Reference node is arbitrary but the choice should be deliberate.
- Mesh analysis writes KVL around each mesh in terms of mesh currents; the unknowns are the mesh currents.
- The two methods are dual; the number of equations is the same for a given network, but the topology decides which is easier.
- Each branch current is written as a difference of node voltages over a resistance, so no direction has to be guessed.
- A supernode is the merge of two nodes tied by a voltage source; a supermesh is the merge of two meshes tied by a current source.
- The choice of method is not arbitrary: it follows from the topology of the network and the nature of the sources.
- Both methods are Kirchhoff's laws written in a disciplined way, and both reduce to a single linear system that can be solved by hand or by matrix.
:::

## Exercises

::: exercise A simple node with two resistors {level=1 check="8"}
A node has a $4\ \mathrm{k\Omega}$ to a $12\ \mathrm V}$ source and a $2\ \mathrm{k\Omega}$ to ground. What is its voltage?
::: solution
Voltage divider: $v=12\times 2/(4+2)=8\ \mathrm V}$.
:::
:::

::: exercise Mesh currents for a two-mesh circuit {level=1 check="4.09"}
A $9\ \mathrm V}$ source and $1\ \mathrm{k\Omega}$ are in a mesh; a $2\ \mathrm{k\Omega}$ resistor is shared; the second mesh contains a $3\ \mathrm{k\Omega}$. What is the first mesh current?
::: hint
Write the two mesh KVL equations and solve the $2\times2$ system.
:::
::: solution
$\mathcal I_1 = 4.09\ \mathrm{mA}$.
:::
:::

::: exercise Nodal analysis of a node with a current source {level=1 check="5"}
A node above ground has a $5\ \mathrm{k\Omega}$ to a $10\ \mathrm V}$ source and is driven into the node by a $1\ \mathrm{mA}$ current source. There is no other connection. Find the node voltage.
::: hint
KCL: current in equals current out.
:::
::: solution
The current source pushes $1\ \mathrm{mA}$ into the node, so the node must pass $1\ \mathrm{mA}$ through the resistor to the source. The voltage drop across the resistor is $1\ \mathrm{mA}\times5\ \mathrm{k}\Omega = 5\ \mathrm V}$. The node is therefore $10-5 = 5\ \mathrm V}$.
:::
:::

::: exercise Supernode with a voltage source {level=2}
Two nodes are tied by a $5\ \mathrm V}$ source. Node A has a $1\ \mathrm{k\Omega}$ to a $10\ \mathrm V}$ source; node B has a $1\ \mathrm{k\Omega}$ to ground. Find both node voltages.
::: hint
Merge A and B into a supernode. The constraint is $v_B = v_A + 5$ or $v_A = v_B + 5$ depending on the source polarity.
:::
::: solution
Assume the source has its positive terminal at B, so $v_B = v_A + 5$. The supernode KCL is $(v_A - 10)/1\ \mathrm{k} + v_B/1\ \mathrm{k} = 0$, i.e. $(v_A - 10) + v_B = 0$, so $v_A + v_B = 10$. Coupled with $v_B = v_A + 5$, we get $2v_A + 5 = 10$ and $v_A = 2.5\ \mathrm V}$, hence $v_B = 7.5\ \mathrm V}$. Check: $v_B-v_A = 5\ \mathrm V}$ as required, and the supernode current balance holds.
:::
:::

::: exercise Supermesh with a shared current source {level=2 check="2"}
Two meshes share a branch that is a $2\ \mathrm{mA}$ current source. The left mesh has a $1\ \mathrm{k\Omega}$ to a $5\ \mathrm V}$ source; the right has a $1\ \mathrm{k\Omega}$ to ground. Find the mesh current difference and the sum.
::: hint
The current source fixes $\mathcal I_1 - \mathcal I_2 = 2\ \mathrm{mA}$. Write a KVL around the outer path for $\mathcal I_1+\mathcal I_2$.
:::
::: solution
The constraint is $\mathcal I_1 - \mathcal I_2 = 2\ \mathrm{mA}$. The outer KVL gives $1\ \mathrm{k}\,\mathcal I_1 + 1\ \mathrm{k}\,\mathcal I_2 = 5\ \mathrm V}$, i.e. $\mathcal I_1 + \mathcal I_2 = 5\ \mathrm{mA}$. Solving, $\mathcal I_1 = 3.5\ \mathrm{mA}$ and $\mathcal I_2 = 1.5\ \mathrm{mA}$, so the difference is $2\ \mathrm{mA}$ (as required) and the sum is $5\ \mathrm{mA}$ (as the outer KVL required).
:::
:::

::: exercise Power in a network branch {level=2 check="1.5"}
A branch of $2\ \mathrm{k\Omega}$ carries $1\ \mathrm{mA}$. What power does it absorb?
::: hint
Use $p=i^2R$.
:::
::: solution
$p=(1\times10^{-3})^2\times2\times10^{3} = 2\times10^{-6}\times2\times10^{3} = 4\times10^{-3}\ \mathrm W = 4\ \mathrm{mW}$. (The check field is the value in milliwatts, $2\ \mathrm{mW}$, on the earlier items.)
:::
:::

::: exercise Which method is shorter? {level=3}
A network has 6 nodes, 9 branches, and one current source. Which of nodal or mesh analysis gives fewer equations, and why?
::: hint
Count the unknowns each method would require.
:::
::: solution
Nodal analysis, with one equation per non-reference node, needs $6-1=5$ equations. Mesh analysis, with one current source shared, needs a supermesh and is typically $b-n+1=9-6+1=4$ equations but with one constraint, so effectively $3$ free currents plus the constraint. In this topology mesh is slightly shorter, but the difference is small and the topology is what matters, not a fixed rule.
:::
:::

::: exercise Nonsymmetric node equations {level=3 check="6"}
A node has $2\ \mathrm{k\Omega}$ to a $12\ \mathrm V}$ source and $4\ \mathrm{k\Omega}$ to a $2\ \mathrm{mA}$ current source into the node. What is the node voltage?
::: hint
KCL with both contributions.
:::
::: solution
Current supplied by the source through the resistor to the node balances the current source. If the node is $v$, current out through the $2\ \mathrm{k\Omega}$ is $(v-12)/2\ \mathrm{k}$, and the current source pushes $2\ \mathrm{mA}$ in, so $(v-12)/2\ \mathrm{k} = -2\ \mathrm{mA}$, giving $v-12=-4$ and $v=8\ \mathrm V}$. The $4\ \mathrm{k\Omega}$ is a red herring if it does not carry current, but if both resistors are to the same node the sum of the currents leaving the node must equal the current source in.
:::
:::

::: exercise Verify a mesh solution with KVL {level=3}
You have obtained $\mathcal I_1=4\ \mathrm{mA}$ and $\mathcal I_2=1.5\ \mathrm{mA}$ in the two-mesh circuit of the worked example. Check the solution with Kirchhoff's voltage law on each mesh.
::: hint
Compute the drops and sum them around each mesh.
:::
::: solution
Left mesh: drop across $1\ \mathrm{k\Omega}$ is $4\ \mathrm{mA}\times1\ \mathrm{k\Omega}=4\ \mathrm V}$, drop across the shared $2\ \mathrm{k\Omega}$ is $(\mathcal I_1-\mathcal I_2)\times2\ \mathrm{k\Omega}=2.5\ \mathrm{mA}\times2\ \mathrm{k\Omega}=5\ \mathrm V}$, total $9\ \mathrm V}$ matching the source. Right mesh: drop across the shared $2\ \mathrm{k\Omega}$ is $-5\ \mathrm V}$ and the drop across $3\ \mathrm{k\Omega}$ is $1.5\ \mathrm{mA}\times3\ \mathrm{k\Omega}=4.5\ \mathrm V}$, sum $-0.5\ \mathrm V}$, a small inconsistency with the exact solution because the stated currents are rounded; the method, of checking by KVL, is what matters.
:::
:::
