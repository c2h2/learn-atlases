A statically determinate structure can be solved with a free-body diagram: equilibrium alone gives the internal forces, and the deformations follow afterwards. Most real structures are not like that. A bar held between two walls, a truss with a redundant diagonal, a machine frame with more supports than it strictly needs — all of these have more unknown forces than equilibrium equations, and in [[mechanics-of-materials/axial-loading]] you solved such problems by adding compatibility conditions written specially for each case. This chapter replaces that case-by-case reasoning with a single procedure that works for every linear structure, however many members and supports it has: the **direct stiffness method**. It is the first finite element method, and every idea in it — element stiffness, assembly, supports, solution, recovery of internal forces — reappears unchanged in every later chapter. We develop it for the two simplest elements, the linear spring and the axially loaded bar, where every matrix can be written out by hand.

## Degrees of freedom and the spring element

The unknowns of the direct stiffness method are **displacements** at a finite number of points, not forces. Once the displacements are known, the force in every member follows from its own stiffness, and equilibrium is automatically satisfied. That reversal — solve for displacements first — is what makes the method general: there is always exactly one unknown per possible movement, whatever the degree of indeterminacy.

::: definition Nodes, degrees of freedom and the spring element {#def-spring}
A **node** is a point at which elements are connected or at which loads and supports act. A **degree of freedom** (DOF) is one independent displacement component of a node; in this chapter every node moves only along the $x$ axis, so it has one DOF, the displacement $u_i$, positive in $+x$. A **linear spring element** $e$ joins nodes $i$ and $j$ and carries an axial force proportional to its elongation $u_j - u_i$:
$$
N^{(e)} = k^{(e)}\,(u_j - u_i),
$$
with **stiffness** $k^{(e)} > 0$ (N/m or, more conveniently, N/mm) and the sign convention that a **tensile** force is positive. The **nodal forces** $f_i^{(e)}, f_j^{(e)}$ are the forces that the nodes exert *on the element*, positive in $+x$.
:::

Draw the free-body diagram of the spring alone. If it is in tension $N$, the node at its right end must pull it to the right with $f_j^{(e)} = +N$, and the node at its left end must pull it to the left, $f_i^{(e)} = -N$. Substituting $N = k(u_j - u_i)$ gives two equations,
$$
f_i^{(e)} = k\,u_i - k\,u_j, \qquad f_j^{(e)} = -k\,u_i + k\,u_j,
$$
which in matrix form are the **element equations**
$$
\begin{bmatrix} f_i \\ f_j \end{bmatrix}^{(e)} = k^{(e)} \begin{bmatrix} 1 & -1 \\ -1 & 1 \end{bmatrix} \begin{bmatrix} u_i \\ u_j \end{bmatrix}, \qquad \mathbf{f}^{(e)} = \mathbf{k}^{(e)}\,\mathbf{d}^{(e)}.
$$ {#eq-spring-k}

The matrix $\mathbf{k}^{(e)}$ is the **element stiffness matrix**. Each column has a physical meaning that is worth memorising because it is the quickest way to write down a stiffness matrix for any element: *column $m$ lists the nodal forces needed to hold the element in the configuration where DOF $m$ equals one and every other DOF equals zero.* Push node $j$ one unit to the right while holding node $i$: the spring stretches by one, needs $+k$ at $j$ and $-k$ at $i$ — that is the second column.

Three properties of $\mathbf{k}^{(e)}$ are already visible. It is **symmetric**. Each column sums to zero, because the two nodal forces on a free body must balance. And it is **singular**: the rigid-body motion $u_i = u_j = 1$ produces no force, $\mathbf{k}^{(e)}[1, 1]^{\mathsf T} = \mathbf{0}$, so $\det\mathbf{k}^{(e)} = 0$. A spring on its own can drift away; only supports make the problem solvable.

## The bar element

An elastic bar of length $L$, constant cross-sectional area $A$ and Young's modulus $E$, loaded only at its ends, is a spring. From [[mechanics-of-materials/axial-loading]] its elongation under axial force $N$ is $\delta = NL/(EA)$, so

::: definition Bar element {#def-bar}
A **bar element** (axial element, rod element) of length $L$, area $A$ and modulus $E$, between nodes $i$ and $j$ on the $x$ axis, has stiffness $k = EA/L$ and element stiffness matrix
$$
\mathbf{k}^{(e)} = \frac{EA}{L}\begin{bmatrix} 1 & -1 \\ -1 & 1 \end{bmatrix}.
$$
Within the element the displacement varies linearly, $u(x) = N_i(x)\,u_i + N_j(x)\,u_j$ with **shape functions** $N_i = 1 - x/L$ and $N_j = x/L$ ($x$ measured from node $i$), so the strain and stress are constant:
$$
\varepsilon = \frac{u_j - u_i}{L}, \qquad \sigma = E\varepsilon = \frac{E}{L}\,(u_j - u_i), \qquad N = \sigma A.
$$
:::

The linear displacement field is not an approximation for a uniform bar loaded at its ends — it is the exact solution, because the axial force, and therefore the strain, is constant along such a bar. Approximation enters only when the bar is tapered or loaded along its length (its own weight, a distributed friction force); then a chain of short elements replaces the smooth variation with a staircase of constant strains, and the question of how fine the chain must be is our first encounter with convergence.

With units it is easiest to work in **newtons and millimetres** throughout: then $E$ is in $\mathrm{N/mm^2} = \mathrm{MPa}$, areas in $\mathrm{mm^2}$, lengths in mm, stiffnesses in N/mm, displacements in mm and stresses in MPa, and no conversion factor ever appears. A steel bar with $E = 200\,\mathrm{GPa} = 200\,000\,\mathrm{MPa}$, $A = 400\,\mathrm{mm^2}$ and $L = 300\,\mathrm{mm}$ has $k = 200\,000 \times 400 / 300 = 266\,667\,\mathrm{N/mm}$, i.e. about $267\,\mathrm{kN/mm}$ — bars are stiff.

## Assembly

A structure is a set of elements sharing nodes. At every node the external force applied there must equal the sum of the forces that the node exerts on the elements attached to it (Newton's third law plus equilibrium of the node). If node $I$ carries external force $F_I$, then
$$
F_I = \sum_{e \ni I} f_I^{(e)},
$$ {#eq-node-eq}
the sum running over the elements that contain node $I$. Every $f_I^{(e)}$ is a linear combination of nodal displacements through $\mathbf{k}^{(e)}$, so the whole set of node equations is a linear system $\mathbf{K}\mathbf{d} = \mathbf{F}$ in the global displacement vector $\mathbf{d} = [u_1, \dots, u_n]^{\mathsf T}$. The entries of $\mathbf{K}$ are obtained by adding each element's entries into the rows and columns of its global DOFs:

::: algorithm The direct stiffness method {#alg-dsm}
1. **Number** the nodes $1, \dots, n$ and the global DOFs; write the **connectivity table**: for each element, the global numbers of its nodes (in order $i$, $j$).
2. **Element matrices.** For each element compute $\mathbf{k}^{(e)}$ (and any element load vector).
3. **Assemble.** Start from an $n \times n$ zero matrix $\mathbf{K}$ and a zero vector $\mathbf{F}$. For each element, add entry $k^{(e)}_{ab}$ to $K_{IJ}$, where $I$ and $J$ are the global DOFs of the element's local DOFs $a$ and $b$. Add the applied nodal loads to $\mathbf{F}$.
4. **Supports.** Partition the DOFs into free ($f$) and prescribed ($s$) sets and impose the prescribed values (see [[#prop-partition]]).
5. **Solve** $\mathbf{K}_{ff}\mathbf{d}_f = \mathbf{F}_f - \mathbf{K}_{fs}\mathbf{d}_s$ for the unknown displacements.
6. **Recover** the reactions $\mathbf{R}_s = \mathbf{K}_{sf}\mathbf{d}_f + \mathbf{K}_{ss}\mathbf{d}_s - \mathbf{F}_s$ and, element by element, the strains, stresses and member forces from [[#def-bar]].
7. **Check** that the reactions balance the applied loads and that the deformed shape is plausible.
:::

The word *direct* refers to step 3: the global matrix is built by adding element contributions directly into place, without ever writing the node equilibrium equations explicitly. For a chain of springs, element $e$ connecting nodes $e$ and $e+1$ contributes a $2\times2$ block on the diagonal, the blocks overlap at shared nodes, and $\mathbf{K}$ comes out **tridiagonal**. In general $K_{IJ} \neq 0$ only if nodes $I$ and $J$ belong to a common element, so the global matrix of a large model is overwhelmingly zero — **sparse** — and, if nodes are numbered so that connected nodes have close numbers, **banded**. Real solvers exploit both properties; a model with a million DOFs has perhaps 30 million non-zeros, not $10^{12}$.

::: proposition Properties of the assembled stiffness matrix {#prop-k-props}
For any assembly of springs and bars with positive stiffnesses, before supports are applied:
1. $\mathbf{K}$ is symmetric;
2. $\mathbf{d}^{\mathsf T}\mathbf{K}\mathbf{d} = \sum_e k^{(e)}\,(u_j - u_i)^2 \ge 0$ for every $\mathbf{d}$ (positive semidefinite), and $\tfrac12\mathbf{d}^{\mathsf T}\mathbf{K}\mathbf{d}$ is the strain energy stored;
3. $\mathbf{K}$ is singular: the rigid-body translation $\mathbf{d} = [1, 1, \dots, 1]^{\mathsf T}$ satisfies $\mathbf{K}\mathbf{d} = \mathbf{0}$;
4. if the structure is connected and at least one DOF is prescribed, the reduced matrix $\mathbf{K}_{ff}$ is symmetric positive definite and therefore invertible.
:::

::: proof
(1) Each $\mathbf{k}^{(e)}$ is symmetric, and adding $k^{(e)}_{ab}$ to $K_{IJ}$ always comes with adding $k^{(e)}_{ba} = k^{(e)}_{ab}$ to $K_{JI}$. (2) Assembly is the statement $\mathbf{d}^{\mathsf T}\mathbf{K}\mathbf{d} = \sum_e \mathbf{d}^{(e)\mathsf T}\mathbf{k}^{(e)}\mathbf{d}^{(e)}$, where $\mathbf{d}^{(e)}$ picks out the element's nodal values; for one spring $\mathbf{d}^{(e)\mathsf T}\mathbf{k}^{(e)}\mathbf{d}^{(e)} = k(u_i^2 - 2u_iu_j + u_j^2) = k(u_j - u_i)^2$. Half of this is the strain energy $\tfrac12 k\delta^2$ of a spring stretched by $\delta$. (3) Every element has $u_j - u_i = 0$ under a uniform translation, so each term vanishes, and a semidefinite matrix with $\mathbf{d}^{\mathsf T}\mathbf{K}\mathbf{d} = 0$ has $\mathbf{K}\mathbf{d} = \mathbf{0}$. (4) Suppose $\mathbf{d}_f^{\mathsf T}\mathbf{K}_{ff}\mathbf{d}_f = 0$ with the prescribed DOFs set to zero. Then every element has zero elongation, so displacements are equal across every element; since the structure is connected, all displacements equal the prescribed one, which is zero. Hence the quadratic form is positive for every non-zero $\mathbf{d}_f$.
:::

Part (4) is the mathematical form of a practical rule: *a model is solvable only if supports suppress every rigid-body motion.* An unsupported or under-supported model gives a singular matrix, and a solver reports "zero pivot", "matrix not positive definite" or — worse, with round-off — returns enormous meaningless displacements.

## Boundary conditions

Supports prescribe displacements; at a prescribed DOF the force is unknown (a reaction) while the displacement is known. Every DOF therefore has exactly one known and one unknown quantity, and the equations can be reordered so that the unknowns are isolated.

::: proposition Partitioned solution {#prop-partition}
Order the DOFs as free $f$ (displacement unknown, force known) and prescribed $s$ (displacement known, reaction unknown). Writing the force at a prescribed DOF as applied load plus reaction, $\mathbf{F}_s + \mathbf{R}_s$, the system splits as
$$
\begin{bmatrix} \mathbf{K}_{ff} & \mathbf{K}_{fs} \\ \mathbf{K}_{sf} & \mathbf{K}_{ss} \end{bmatrix}\begin{bmatrix} \mathbf{d}_f \\ \mathbf{d}_s \end{bmatrix} = \begin{bmatrix} \mathbf{F}_f \\ \mathbf{F}_s + \mathbf{R}_s \end{bmatrix},
$$
so the free displacements and the reactions are
$$
\mathbf{d}_f = \mathbf{K}_{ff}^{-1}\left(\mathbf{F}_f - \mathbf{K}_{fs}\mathbf{d}_s\right), \qquad \mathbf{R}_s = \mathbf{K}_{sf}\mathbf{d}_f + \mathbf{K}_{ss}\mathbf{d}_s - \mathbf{F}_s.
$$ {#eq-partition}
:::

::: proof
The first block row is $\mathbf{K}_{ff}\mathbf{d}_f + \mathbf{K}_{fs}\mathbf{d}_s = \mathbf{F}_f$; $\mathbf{d}_s$ is known, so moving it to the right gives a square system whose matrix is invertible by [[#prop-k-props]](4). The second block row then gives $\mathbf{R}_s$ explicitly. No assumption about $\mathbf{d}_s = \mathbf{0}$ is needed: a prescribed non-zero displacement (a support settlement, an imposed fit-up) simply moves the term $\mathbf{K}_{fs}\mathbf{d}_s$ to the right-hand side, where it acts as an equivalent load.
:::

When $\mathbf{d}_s = \mathbf{0}$, the recipe is the familiar "strike out the rows and columns of the supported DOFs". Codes rarely physically reorder the matrix; they either solve the reduced system in place or use the **penalty method**: at each prescribed DOF $m$ add a very large number $C$ to $K_{mm}$ and $C\,\bar d_m$ to $F_m$, which is equivalent to tying the node to the prescribed position with a very stiff spring. The penalty method keeps the matrix size and sparsity pattern unchanged, but the prescribed value is satisfied only approximately, with a relative error of order $k/C$, and too large a $C$ ruins the conditioning of the matrix. A common choice is $C \approx 10^4$ to $10^6$ times the largest diagonal entry of $\mathbf{K}$.

::: warning Units, signs and supports
Three mistakes account for most wrong hand calculations. **Mixed units**: $E$ in GPa with lengths in mm and forces in N gives displacements wrong by $10^3$; choose N–mm–MPa (or N–m–Pa) and stay in it, and remember that $1\,\mathrm{kN/m} = 1\,\mathrm{N/mm}$. **Reaction signs**: a reaction from [[#eq-partition]] is the force that the support exerts *on the structure*, positive in $+x$; a negative value acts to the left, and the reactions must balance the applied loads exactly ($\sum R + \sum F = 0$). **Missing supports**: if you strike out too few rows, $\mathbf{K}_{ff}$ is singular; a "solution" from software in that case is numerical noise, often with displacements of $10^{10}$ mm. Always check the reaction sum and look at the deformed shape.
:::

## Worked examples

::: example Two springs in series {#ex-series}
Two springs, $k_1 = 200\,\mathrm{kN/m}$ (between nodes 1 and 2) and $k_2 = 300\,\mathrm{kN/m}$ (between nodes 2 and 3), hang in a line from a wall at node 1. A force $F = 500\,\mathrm{N}$ in $+x$ acts at node 3. Find the nodal displacements, the spring forces and the wall reaction.
::: solution
Units N and mm: $k_1 = 200\,\mathrm{N/mm}$, $k_2 = 300\,\mathrm{N/mm}$. Free-body diagram of the whole: the 500 N load at node 3 to the right and an unknown reaction $R_1$ at the wall. Assembly (connectivity: element 1 = nodes 1–2, element 2 = nodes 2–3):
$$
\mathbf{K} = \begin{bmatrix} 200 & -200 & 0 \\ -200 & 200 + 300 & -300 \\ 0 & -300 & 300 \end{bmatrix}\ \mathrm{N/mm}.
$$
Node 1 is fixed, $u_1 = 0$, so the reduced system is rows and columns 2 and 3:
$$
\begin{bmatrix} 500 & -300 \\ -300 & 300 \end{bmatrix}\begin{bmatrix} u_2 \\ u_3 \end{bmatrix} = \begin{bmatrix} 0 \\ 500 \end{bmatrix}.
$$
Adding the two equations gives $200\,u_2 = 500$, so $u_2 = 2.50\,\mathrm{mm}$; then $300\,u_3 = 500 + 300 \times 2.50 = 1250$, $u_3 = 4.167\,\mathrm{mm}$.

Spring forces: $N_1 = 200(2.50 - 0) = 500\,\mathrm{N}$, $N_2 = 300(4.167 - 2.50) = 500\,\mathrm{N}$, both tension. Reaction from the first row of the full system: $R_1 = 200 \cdot 0 - 200 \times 2.50 = -500\,\mathrm{N}$, i.e. 500 N to the left.

*Check.* Springs in series carry the same force and have $1/k_\text{eq} = 1/200 + 1/300$, $k_\text{eq} = 120\,\mathrm{N/mm}$; $u_3 = 500/120 = 4.167\,\mathrm{mm}$. The reaction balances the load. Note the magnitudes: with $k$ in N/mm the answers are millimetres — had the stiffnesses been $2000$ and $3000\,\mathrm{N/m}$, the same arithmetic would give metres, and such soft springs would stretch by a quarter of a metre.
:::
:::

::: example A stepped bar between two walls {#ex-stepped}
A steel segment ($E_1 = 200\,\mathrm{GPa}$, $A_1 = 400\,\mathrm{mm^2}$, $L_1 = 300\,\mathrm{mm}$) and an aluminium segment ($E_2 = 70\,\mathrm{GPa}$, $A_2 = 600\,\mathrm{mm^2}$, $L_2 = 200\,\mathrm{mm}$) are joined end to end and fixed between rigid walls. An axial load $P = 60\,\mathrm{kN}$ acts to the right at the junction. Find the junction displacement, the stresses in both segments and the wall reactions.
::: solution
Free-body diagram: load $P$ at node 2 to the right, unknown reactions $R_1$ and $R_3$ at the walls — two unknown forces, one equilibrium equation, so the problem is statically indeterminate to the first degree. The method does not care.

Element stiffnesses (N, mm, MPa):
$$
k_1 = \frac{200\,000 \times 400}{300} = 266\,667\,\mathrm{N/mm}, \qquad k_2 = \frac{70\,000 \times 600}{200} = 210\,000\,\mathrm{N/mm}.
$$
Nodes 1 and 3 are fixed, so only $u_2$ is free, and its row of $\mathbf{K}$ is $[-k_1,\ k_1 + k_2,\ -k_2]$:
$$
(k_1 + k_2)\,u_2 = P \quad\Rightarrow\quad u_2 = \frac{60\,000}{476\,667} = 0.1259\,\mathrm{mm}.
$$
Stresses from [[#def-bar]]:
$$
\sigma_1 = \frac{E_1}{L_1}(u_2 - u_1) = \frac{200\,000}{300}(0.1259) = 83.9\,\mathrm{MPa}, \qquad \sigma_2 = \frac{E_2}{L_2}(u_3 - u_2) = \frac{70\,000}{200}(-0.1259) = -44.1\,\mathrm{MPa}.
$$
The steel is in tension, the aluminium in compression. Reactions from rows 1 and 3: $R_1 = -k_1u_2 = -33.57\,\mathrm{kN}$, $R_3 = -k_2u_2 = -26.43\,\mathrm{kN}$.

*Check.* $R_1 + R_3 + P = -33.57 - 26.43 + 60 = 0$. The load splits in proportion to the stiffnesses of the two paths, $k_1/(k_1 + k_2) = 56\,\%$ to the steel — exactly as in the compatibility solution of [[mechanics-of-materials/axial-loading]], but obtained without writing a compatibility equation: compatibility is built in, because both elements share the single unknown $u_2$.
:::
:::

::: example A prescribed support movement {#ex-settlement}
Three springs in a line, $k_1 = 100$, $k_2 = 200$, $k_3 = 100\,\mathrm{N/mm}$, connect nodes 1–2, 2–3 and 3–4. Node 1 is fixed; node 4 is attached to a support that is moved $5\,\mathrm{mm}$ to the left ($u_4 = -5\,\mathrm{mm}$); a force of $1500\,\mathrm{N}$ in $+x$ acts at node 3. Find $u_2$, $u_3$, the reactions and the spring forces, and compare with a penalty solution.
::: solution
Assembled matrix (N/mm):
$$
\mathbf{K} = \begin{bmatrix} 100 & -100 & 0 & 0 \\ -100 & 300 & -200 & 0 \\ 0 & -200 & 300 & -100 \\ 0 & 0 & -100 & 100 \end{bmatrix}.
$$
Free DOFs $f = \{2, 3\}$, prescribed $s = \{1, 4\}$ with $\mathbf{d}_s = [0, -5]^{\mathsf T}\,\mathrm{mm}$. From [[#eq-partition]] the right-hand side is
$$
\mathbf{F}_f - \mathbf{K}_{fs}\mathbf{d}_s = \begin{bmatrix} 0 \\ 1500 \end{bmatrix} - \begin{bmatrix} -100 & 0 \\ 0 & -100 \end{bmatrix}\begin{bmatrix} 0 \\ -5 \end{bmatrix} = \begin{bmatrix} 0 \\ 1500 - 500 \end{bmatrix} = \begin{bmatrix} 0 \\ 1000 \end{bmatrix}\ \mathrm{N},
$$
and
$$
\begin{bmatrix} 300 & -200 \\ -200 & 300 \end{bmatrix}\begin{bmatrix} u_2 \\ u_3 \end{bmatrix} = \begin{bmatrix} 0 \\ 1000 \end{bmatrix} \quad\Rightarrow\quad u_2 = 4.00\,\mathrm{mm}, \quad u_3 = 6.00\,\mathrm{mm}.
$$
(The determinant is $300^2 - 200^2 = 50\,000$; $u_2 = 200\,000/50\,000$, $u_3 = 300\,000/50\,000$.) Reactions from rows 1 and 4 (no applied load there): $R_1 = -100 \times 4 = -400\,\mathrm{N}$, $R_4 = -100 \times 6 + 100 \times (-5) = -1100\,\mathrm{N}$. Spring forces: $N_1 = 100(4 - 0) = 400\,\mathrm{N}$, $N_2 = 200(6 - 4) = 400\,\mathrm{N}$ (tension), $N_3 = 100(-5 - 6) = -1100\,\mathrm{N}$ (compression).

*Check.* $R_1 + 1500 + R_4 = -400 + 1500 - 1100 = 0$. The left part of the chain carries 400 N, the right spring 1100 N in compression: the applied force is shared, and the imposed movement of node 4 pushes the right spring further.

*Penalty version.* With $C = 3 \times 10^6\,\mathrm{N/mm}$ ($10^4$ times the largest diagonal entry, 300) added to $K_{11}$ and $K_{44}$, and $C \times (-5)$ added to $F_4$, the full $4 \times 4$ system gives $u_1 = 1.3 \times 10^{-4}\,\mathrm{mm}$, $u_2 = 4.0002$, $u_3 = 6.0003$, $u_4 = -4.9996\,\mathrm{mm}$: errors of order $k/C \approx 10^{-4}$, as predicted.
:::
:::

The reduced system of this example can be solved step by step in the figure below, which row-reduces the augmented matrix $[\mathbf{K}_{ff} \mid \mathbf{F}_f - \mathbf{K}_{fs}\mathbf{d}_s]$. Gaussian elimination on a stiffness matrix needs no row exchanges, because a symmetric positive definite matrix has positive pivots — the first pivot here is 300, the second $300 - 200^2/300 = 166.7$.

::: widget rowreduce
matrix: 300,-200,0; -200,300,1000
augmented: true
caption: The reduced stiffness equations of [[#ex-settlement]] (N/mm and N). Step through the elimination: the pivots stay positive without any row swap, as they always do for a properly supported structure, and the last column ends as $u_2 = 4$ mm, $u_3 = 6$ mm. Try replacing a diagonal entry by 200 (a missing support or spring in a real model): the matrix becomes singular and the elimination breaks down.
:::

## Energy: why the method works

So far $\mathbf{K}\mathbf{d} = \mathbf{F}$ came from node equilibrium. The same equations follow from an energy principle, and that second derivation is the one that generalises to continua, where there are no discrete springs to draw.

::: proposition Minimum total potential energy {#prop-mpe}
For a linear elastic assembly with nodal loads $\mathbf{F}$, define the **total potential energy**
$$
\Pi(\mathbf{d}) = U - W = \tfrac12\,\mathbf{d}^{\mathsf T}\mathbf{K}\mathbf{d} - \mathbf{d}^{\mathsf T}\mathbf{F}.
$$ {#eq-pe}
Among all displacement vectors that satisfy the prescribed support conditions, the equilibrium configuration is the one that makes $\Pi$ stationary; it satisfies $\mathbf{K}_{ff}\mathbf{d}_f = \mathbf{F}_f - \mathbf{K}_{fs}\mathbf{d}_s$, and when $\mathbf{K}_{ff}$ is positive definite the stationary point is the unique minimum.
:::

::: proof
The strain energy is $U = \sum_e \tfrac12 k^{(e)}(u_j - u_i)^2 = \tfrac12\mathbf{d}^{\mathsf T}\mathbf{K}\mathbf{d}$ by [[#prop-k-props]], and the loads are constant (dead loads), so their potential is $-\mathbf{d}^{\mathsf T}\mathbf{F}$. Only the free DOFs may vary. Since $\mathbf{K}$ is symmetric, $\partial\Pi/\partial\mathbf{d}_f = \mathbf{K}_{ff}\mathbf{d}_f + \mathbf{K}_{fs}\mathbf{d}_s - \mathbf{F}_f$, and setting it to zero gives the first row of [[#prop-partition]]. The Hessian of $\Pi$ with respect to $\mathbf{d}_f$ is $\mathbf{K}_{ff}$; if it is positive definite, $\Pi$ is a strictly convex quadratic and the stationary point is its unique minimum. Assumptions: linear elasticity, small displacements (the geometry used to write $\mathbf{k}^{(e)}$ does not change), loads that do not change with deformation.
:::

For a single spring, $\Pi = \tfrac12 ku^2 - Fu$ is a parabola with its bottom at $u = F/k$. For a continuum the displacement field has infinitely many DOFs; the finite element method restricts it to fields described by a finite number of nodal values and minimises $\Pi$ over that restricted set. The resulting $\mathbf{K}$ is still assembled element by element, because energy is additive over elements. This is the idea developed properly in [[finite-element-method/weak-forms]].

## Loads along an element: thermal strain and distributed loads

Loads that act inside an element rather than at its nodes must be converted to **equivalent nodal loads**. The simplest and most common case is a temperature change. A bar heated by $\Delta T$ with coefficient of thermal expansion $\alpha$ has total strain $\varepsilon = \sigma/E + \alpha\,\Delta T$, so its axial force is $N = EA\left[(u_j - u_i)/L - \alpha\Delta T\right]$. Writing the nodal forces as before,
$$
\mathbf{f}^{(e)} = \mathbf{k}^{(e)}\mathbf{d}^{(e)} - EA\alpha\,\Delta T\begin{bmatrix} -1 \\ 1 \end{bmatrix},
$$ {#eq-thermal}
and moving the second term to the load side shows that the heated element pushes outwards on its nodes with forces $EA\alpha\Delta T$: a **thermal load vector** $\mathbf{f}_T^{(e)} = EA\alpha\Delta T\,[-1, 1]^{\mathsf T}$ is assembled into $\mathbf{F}$ like any other load. After solving, the stress must be recovered from the *mechanical* strain, $\sigma = E\left[(u_j - u_i)/L - \alpha\Delta T\right]$; forgetting the $\alpha\Delta T$ term at this step is a classic error that reports a stress-free constrained bar as highly stressed or vice versa.

A tapered bar, or a bar loaded along its length, is handled by subdivision. Each element is given a constant area — for example the area at its midpoint — and the distributed load is lumped to the nodes (half of each element's share to each end; the consistent rule is derived in [[finite-element-method/weak-forms]]). The answer is then no longer exact, but it converges as the elements shrink.

::: example A tapered bar by one, two and four elements {#ex-taper}
An aluminium bar ($E = 70\,\mathrm{GPa}$) of length $L = 1.2\,\mathrm{m}$ is fixed at $x = 0$, where its area is $A_0 = 600\,\mathrm{mm^2}$; the area falls linearly to $A_0/2 = 300\,\mathrm{mm^2}$ at the free end, where an axial load $P = 20\,\mathrm{kN}$ acts. Compare the tip displacement from $n = 1, 2, 4$ equal elements with midpoint areas against the exact value.
::: solution
*Exact.* The force is $P$ everywhere and $A(x) = A_0(1 - x/2L)$, so
$$
\delta = \int_0^L \frac{P\,dx}{EA_0(1 - x/2L)} = \frac{PL}{EA_0}\,2\ln 2 = \frac{20\,000 \times 1200}{70\,000 \times 600}(1.3863) = 0.5714 \times 1.3863 = 0.7922\,\mathrm{mm}.
$$
*Finite elements.* With $n$ elements in series and a single end load, every element carries $P$ and the tip displacement is the sum of the element elongations, $\delta_n = \sum_e PL_e/(EA_e)$, which is exactly what the assembled tridiagonal system gives.
- $n = 1$: $A = 450\,\mathrm{mm^2}$, $\delta_1 = 20\,000 \times 1200/(70\,000 \times 450) = 0.7619\,\mathrm{mm}$ (error $3.82\,\%$).
- $n = 2$: areas $525$ and $375\,\mathrm{mm^2}$, $L_e = 600\,\mathrm{mm}$: $\delta_2 = \frac{20\,000 \times 600}{70\,000}\left(\frac{1}{525} + \frac{1}{375}\right) = 171.43 \times 0.0045714 = 0.7837\,\mathrm{mm}$ (error $1.07\,\%$).
- $n = 4$: areas $562.5, 487.5, 412.5, 337.5\,\mathrm{mm^2}$: $\delta_4 = 0.7900\,\mathrm{mm}$ (error $0.28\,\%$).

*Check.* Each halving of the element length cuts the error by a factor of about 3.6 to 3.9, approaching 4: the error behaves like $h^2$, the signature of the midpoint rule hidden in the "midpoint area" choice. The FE answers lie *below* the exact one — the stepped model is stiffer than the real bar — a pattern we will meet again and prove in [[finite-element-method/weak-forms]].
:::
:::

::: widget plot
f: 100*(1 - sum(1/(floor(x)*(1-(k-0.5)/(2*floor(x)))), k, 1, floor(x))/(2*ln(2)))
x: 1, 12
y: 0, 4
labels: \text{error in tip displacement (\%)}
points: 1,3.820; 2,1.072; 4,0.278
caption: Percentage error of the tip displacement of the tapered bar of [[#ex-taper]] against the number of equal elements $n$ (read $n$ as the integer part of $x$). The marked points are the hand results. Notice how quickly the error falls — doubling $n$ divides it by almost 4 — and that it never changes sign: the stepped bar is always too stiff. How many elements are needed for an error below $0.5\,\%$?
:::

::: example Thermal stress in a constrained two-material bar {#ex-thermal}
The steel–aluminium bar of [[#ex-stepped]] is fitted stress-free between the walls with no mechanical load and then heated uniformly by $\Delta T = 40\,\mathrm{K}$. Take $\alpha_\text{steel} = 12 \times 10^{-6}\,\mathrm{K^{-1}}$ and $\alpha_\text{Al} = 23 \times 10^{-6}\,\mathrm{K^{-1}}$. Find the junction displacement and the stresses.
::: solution
Thermal forces $E A\alpha\Delta T$ (N): steel $200\,000 \times 400 \times 12\times10^{-6} \times 40 = 38\,400\,\mathrm{N}$; aluminium $70\,000 \times 600 \times 23\times10^{-6} \times 40 = 38\,640\,\mathrm{N}$. From [[#eq-thermal]], element 1 contributes $+38\,400$ to node 2 and element 2 contributes $-38\,640$ to node 2, so
$$
(k_1 + k_2)\,u_2 = 38\,400 - 38\,640 = -240\,\mathrm{N} \quad\Rightarrow\quad u_2 = \frac{-240}{476\,667} = -5.03 \times 10^{-4}\,\mathrm{mm}.
$$
Stresses from the mechanical strain:
$$
\sigma_1 = 200\,000\left(\frac{-5.03\times10^{-4}}{300} - 12\times10^{-6} \times 40\right) = -96.3\,\mathrm{MPa}, \qquad \sigma_2 = 70\,000\left(\frac{0 + 5.03\times10^{-4}}{200} - 23\times10^{-6} \times 40\right) = -64.2\,\mathrm{MPa}.
$$
Member forces: $\sigma_1A_1 = -38.53\,\mathrm{kN}$ and $\sigma_2A_2 = -38.53\,\mathrm{kN}$ — equal, as they must be in a series bar with no load at the junction.

*Check.* Classical compatibility: the free thermal elongation $(\alpha_1L_1 + \alpha_2L_2)\Delta T = 0.328\,\mathrm{mm}$ must be removed by a force $N$ with flexibility $L_1/(E_1A_1) + L_2/(E_2A_2) = 8.512 \times 10^{-6}\,\mathrm{mm/N}$, giving $N = -38.53\,\mathrm{kN}$. The junction hardly moves because the two thermal forces almost cancel. Had we computed stress from total strain we would have reported $-0.34\,\mathrm{MPa}$ in the steel — wrong by a factor of almost 300.
:::
:::

::: quiz
A model of five bars in a straight line (six nodes, one DOF each) is supported only at node 1. Someone also deletes the row and column of node 6 "to be safe", although node 6 carries an applied load. What is the effect?
- [ ] None: deleting extra rows only makes the system smaller and faster.
- [x] Node 6 is now held at $u_6 = 0$: the model has an extra support that does not exist, the load at node 6 goes straight into a fictitious reaction, and all displacements are wrong.
- [ ] The matrix becomes singular and the solver stops.
- [ ] The answers are unchanged because the stiffness matrix is symmetric.
::: solution
Striking out a row and column is the same as prescribing that displacement to be zero. The reduced matrix is still positive definite (there are now two supports), so the solver runs happily and returns wrong answers. The reaction check exposes the error: the program reports a reaction at node 6 that the real structure does not have.
:::
:::

::: history
Matrix methods for structures grew out of aircraft engineering in the late 1940s and 1950s, when swept and delta wings could not be analysed as simple beams. John Argyris, at Imperial College, set out a general matrix theory of structures in a series of articles, "Energy theorems and structural analysis", in *Aircraft Engineering* in 1954–55. At Boeing, M. J. Turner, working with Ray Clough (then on summer leave from Berkeley), H. C. Martin and L. J. Topp, analysed a delta wing by deriving stiffness matrices for bars and triangular plates and adding them into a global matrix; their 1956 paper "Stiffness and deflection analysis of complex structures" in the *Journal of the Aeronautical Sciences* is usually taken as the beginning of the finite element method, and the assembly procedure in it is the direct stiffness method of this chapter. Earlier, in 1941, Alexander Hrennikoff had modelled continua as frameworks of bars, and in 1943 Richard Courant had minimised the energy of a torsion problem over piecewise-linear functions on triangles; neither was taken up at the time, because the matrix computations needed electronic computers. Clough named the method in 1960.
:::

::: summary
- The unknowns of the direct stiffness method are nodal displacements; member forces follow from element stiffness, so compatibility is automatic and statical indeterminacy is irrelevant.
- A spring or uniform bar has $\mathbf{k}^{(e)} = k[1, -1; -1, 1]$ with $k = EA/L$; column $m$ is the set of nodal forces for a unit value of DOF $m$.
- Assembly adds element entries into the global rows and columns of their DOFs; $\mathbf{K}$ is symmetric, sparse, banded with good numbering, positive semidefinite and singular until supports remove every rigid-body motion.
- Supports are imposed by partitioning: $\mathbf{K}_{ff}\mathbf{d}_f = \mathbf{F}_f - \mathbf{K}_{fs}\mathbf{d}_s$, then $\mathbf{R}_s = \mathbf{K}_{sf}\mathbf{d}_f + \mathbf{K}_{ss}\mathbf{d}_s - \mathbf{F}_s$; prescribed non-zero displacements become equivalent loads. The penalty method approximates the same thing with error $\sim k/C$.
- $\mathbf{K}\mathbf{d} = \mathbf{F}$ is the stationarity condition of the total potential energy $\tfrac12\mathbf{d}^{\mathsf T}\mathbf{K}\mathbf{d} - \mathbf{d}^{\mathsf T}\mathbf{F}$, the form that extends to continua.
- Thermal strain enters as the load $EA\alpha\Delta T[-1, 1]^{\mathsf T}$; stress is recovered from mechanical strain only. Tapered or internally loaded bars need several elements, and the error then falls like $h^2$.
- Always check that reactions balance loads, and use one consistent unit system (N, mm, MPa is the easiest).
:::

## Exercises

::: exercise Stiffness of a steel rod {level=1 check="41.888"}
A solid steel rod of diameter $20\,\mathrm{mm}$ and length $1.5\,\mathrm{m}$ has $E = 200\,\mathrm{GPa}$. What is its axial stiffness $k = EA/L$? (Enter $k$ in kN/mm.)
::: solution
$A = \pi(10)^2 = 314.16\,\mathrm{mm^2}$, so $k = 200\,000 \times 314.16/1500 = 41\,888\,\mathrm{N/mm} = 41.888\,\mathrm{kN/mm}$.
:::
:::

::: exercise Springs in parallel {level=1 check="5"}
Two springs, $k_a = 50\,\mathrm{N/mm}$ and $k_b = 30\,\mathrm{N/mm}$, both connect node 1 (fixed) to node 2. A force of $400\,\mathrm{N}$ acts at node 2. Assemble the $2 \times 2$ global matrix and find $u_2$. (Enter $u_2$ in mm.)
::: solution
Both elements add into the same four positions: $\mathbf{K} = 80\,[1, -1; -1, 1]\ \mathrm{N/mm}$. With $u_1 = 0$, $80\,u_2 = 400$ and $u_2 = 5\,\mathrm{mm}$. Assembly automatically produces the parallel rule $k_\text{eq} = k_a + k_b$.
:::
:::

::: exercise A diagonal entry {level=1 check="50"}
A chain of springs has $k_1 = 10\,\mathrm{kN/m}$ between nodes 1 and 2, $k_2 = 20\,\mathrm{kN/m}$ between nodes 2 and 3, and $k_3 = 30\,\mathrm{kN/m}$ between nodes 3 and 4. What is the entry $K_{33}$ of the assembled global matrix, and what are $K_{32}$ and $K_{31}$? (Enter $K_{33}$ in kN/m.)
::: solution
Node 3 belongs to elements 2 and 3, so $K_{33} = k_2 + k_3 = 50\,\mathrm{kN/m}$. $K_{32} = -k_2 = -20\,\mathrm{kN/m}$, and $K_{31} = 0$ because nodes 1 and 3 share no element. Physically, $K_{33}$ is the force needed at node 3 to move it by one unit while all other nodes are held.
:::
:::

::: exercise Tip displacement of a stepped bar {level=2 check="0.25"}
A steel bar ($E = 200\,\mathrm{GPa}$) fixed at its left end consists of a segment of area $500\,\mathrm{mm^2}$ and length $400\,\mathrm{mm}$ followed by a segment of area $250\,\mathrm{mm^2}$ and length $300\,\mathrm{mm}$. A tensile load of $25\,\mathrm{kN}$ acts at the free end. Set up the two-element model, solve it and find the tip displacement. (Enter it in mm.)
::: solution
$k_1 = 200\,000 \times 500/400 = 250\,000\,\mathrm{N/mm}$, $k_2 = 200\,000 \times 250/300 = 166\,667\,\mathrm{N/mm}$. Reduced system:
$$
\begin{bmatrix} k_1 + k_2 & -k_2 \\ -k_2 & k_2 \end{bmatrix}\begin{bmatrix} u_2 \\ u_3 \end{bmatrix} = \begin{bmatrix} 0 \\ 25\,000 \end{bmatrix}.
$$
Adding rows: $k_1u_2 = 25\,000$, $u_2 = 0.100\,\mathrm{mm}$; then $u_3 = u_2 + 25\,000/k_2 = 0.100 + 0.150 = 0.250\,\mathrm{mm}$. Stresses $50$ and $100\,\mathrm{MPa}$. Statically determinate, so this agrees with $\sum PL/(EA)$.
:::
:::

::: exercise Closing a gap {level=2 check="6.6"}
An aluminium bar ($E = 70\,\mathrm{GPa}$, $A = 200\,\mathrm{mm^2}$, $L = 500\,\mathrm{mm}$) is fixed at its left end (node 1). Its right end (node 2) carries a load of $50\,\mathrm{kN}$ to the right. A spring of stiffness $12\,\mathrm{kN/mm}$, whose far end is fixed, sits with its free end $1.0\,\mathrm{mm}$ to the right of node 2, so it is touched only after node 2 has moved $1.0\,\mathrm{mm}$. Find the force in the spring. (Enter it in kN, as a positive number.)
::: hint
First assume no contact and check whether the gap closes. If it does, the spring acts between node 2 and a point that is effectively "prescribed" $1\,\mathrm{mm}$ away.
:::
::: solution
Bar stiffness $k_1 = 70\,000 \times 200/500 = 28\,000\,\mathrm{N/mm}$. Without contact $u_2 = 50\,000/28\,000 = 1.786\,\mathrm{mm} > 1.0$, so the gap closes. In contact, the spring force is $k_2(u_2 - 1.0)$ to the left, and node equilibrium gives
$$
28\,000\,u_2 + 12\,000\,(u_2 - 1.0) = 50\,000 \quad\Rightarrow\quad u_2 = \frac{62\,000}{40\,000} = 1.55\,\mathrm{mm}.
$$
Spring force $= 12\,000 \times 0.55 = 6600\,\mathrm{N} = 6.6\,\mathrm{kN}$ (compression); the bar carries $28\,000 \times 1.55 = 43.4\,\mathrm{kN}$. Check: $43.4 + 6.6 = 50\,\mathrm{kN}$. This is the simplest contact problem: the model is linear only once you know which state (open or closed) is correct, which is why contact is treated as a nonlinearity in [[finite-element-method/nonlinear-analysis]].
:::
:::

::: exercise A stiffer steel segment {level=2 check="43.05"}
In [[#ex-stepped]] the steel area is doubled to $800\,\mathrm{mm^2}$, everything else unchanged. Find the magnitude of the reaction at the left (steel) wall. (Enter it in kN.)
::: solution
$k_1 = 200\,000 \times 800/300 = 533\,333\,\mathrm{N/mm}$, $k_2 = 210\,000\,\mathrm{N/mm}$. $u_2 = 60\,000/743\,333 = 0.08072\,\mathrm{mm}$, $R_1 = -k_1u_2 = -43\,049\,\mathrm{N}$, so the magnitude is $43.05\,\mathrm{kN}$ (and $R_3 = -16.95\,\mathrm{kN}$). Stiffening one load path attracts load to it: the steel share rises from 56 % to 72 %.
:::
:::

::: exercise Thermal stress in a fixed bar {level=2 check="-80.5"}
An aluminium bar ($E = 70\,\mathrm{GPa}$, $\alpha = 23 \times 10^{-6}\,\mathrm{K^{-1}}$) is fixed between rigid walls and heated by $50\,\mathrm{K}$. Model it with two equal elements and show that the finite element solution is exact. What is the stress? (Enter $\sigma$ in MPa, with sign.)
::: solution
Each element has stiffness $k = 2EA/L$ and thermal load $EA\alpha\Delta T[-1, 1]^{\mathsf T}$. At the middle node the contributions $+EA\alpha\Delta T$ (element 1) and $-EA\alpha\Delta T$ (element 2) cancel, so $2k\,u_2 = 0$ and $u_2 = 0$. The stress is then $\sigma = E(0 - \alpha\Delta T) = -70\,000 \times 23\times10^{-6} \times 50 = -80.5\,\mathrm{MPa}$, independent of $A$ and $L$, which is the classical result. The FE solution is exact because the exact displacement ($u \equiv 0$) is linear in each element.
:::
:::

::: exercise How large a penalty? {level=3 check="999"}
A node is connected to the ground by a spring of stiffness $k$ and must be given the prescribed displacement $\bar d$ by the penalty method, i.e. by adding $C$ to its diagonal entry and $C\bar d$ to its load (no other load acts). Derive the computed displacement and the smallest ratio $C/k$ for which the relative error in the imposed displacement is at most $0.1\,\%$. (Enter $C/k$.)
::: solution
The single equation is $(k + C)\,u = C\bar d$, so $u = \bar d\,C/(k + C)$ and the relative error is $(\bar d - u)/\bar d = k/(k + C)$. Requiring $k/(k + C) \le 10^{-3}$ gives $k + C \ge 1000k$, i.e. $C/k \ge 999$. In practice one takes $C$ several orders larger, but not so large that $k$ is lost in the round-off of $k + C$: with double precision (about 16 digits) a ratio of $10^{8}$ still leaves 8 good digits of $k$.
:::
:::

::: exercise The stiffness matrix from energy {level=3}
For a uniform bar element with linear displacement $u(x) = (1 - x/L)\,u_1 + (x/L)\,u_2$, write the strain energy $U = \int_0^L \tfrac12 EA\,(du/dx)^2\,dx$ as a quadratic form in $u_1, u_2$ and obtain $\mathbf{k}^{(e)}$ as the Hessian $\partial^2U/\partial u_a\partial u_b$. Then repeat for a bar whose area varies linearly from $A_1$ to $A_2$, keeping the same linear displacement, and show that the result is the uniform-bar matrix with the average area $(A_1 + A_2)/2$.
::: solution
$du/dx = (u_2 - u_1)/L$ is constant, so $U = \tfrac12 EA\,L\,(u_2 - u_1)^2/L^2 = \tfrac12 (EA/L)(u_1^2 - 2u_1u_2 + u_2^2)$. The Hessian is $(EA/L)[1, -1; -1, 1]$. For varying area, $U = \tfrac12 E\,(u_2 - u_1)^2L^{-2}\int_0^L A(x)\,dx = \tfrac12 E\,\bar A\,(u_2 - u_1)^2/L$ with $\bar A = (A_1 + A_2)/2$, so $\mathbf{k}^{(e)} = (E\bar A/L)[1, -1; -1, 1]$. Because the assumed strain is constant, only the integral of $A$ matters. (The exact stiffness of a tapered bar uses the harmonic mean of the area, $\int dx/A$; the linear-displacement element is stiffer, consistent with the minimum-energy property — an assumed displacement field always overestimates stiffness.)
:::
:::

::: exercise How many elements? {level=3 check="3"}
For the tapered bar of [[#ex-taper]] modelled with $n$ equal elements using midpoint areas, find the smallest $n$ for which the tip displacement is within $0.5\,\%$ of the exact value. Then, as a design question, suggest a non-uniform subdivision that would reach the same accuracy with fewer elements, and explain why.
::: solution
With $\rho_n = \delta_n/\delta = \frac{1}{2\ln 2}\sum_{k=1}^n \frac{1/n}{1 - (k - 1/2)/(2n)}$: $\rho_2 = 0.98928$ (error 1.07 %), $\rho_3 = 0.99511$ (error 0.489 %), so $n = 3$ is the smallest. The error of each element is largest where the area changes fastest relative to its value, i.e. near the thin tip ($1/A$ is most curved there). Grading the mesh — shorter elements near the free end — reduces the error per element where it is largest; this is a first example of the mesh grading discussed in [[finite-element-method/convergence-meshing]]. For this mild taper the gain is small: a two-element mesh with its break moved from $0.5L$ to $0.6L$ reduces the error only from 1.07 % to 0.99 %, so a third element is still needed. Grading pays off when the variation is strongly concentrated (a sharp change of section, a stress concentration); for a gentle, smooth variation uniform refinement is nearly as good. Checking such a claim with a five-line script, rather than trusting intuition, is the habit to acquire.
:::
:::
