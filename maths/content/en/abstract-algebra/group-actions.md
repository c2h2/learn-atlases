How many different necklaces can be made from six beads, each red, green or blue? There are $3^6 = 729$ ways to colour six positions, but rotating a necklace does not change it, so many of these colourings describe the same necklace. How many rotations does a cube have? How many groups of order $15$ are there? These questions look unrelated, but each is answered by the same idea: let a group **act** on a set, and study the **orbits** and **stabilisers** of the action.

Group actions are how groups appear in nature — as symmetries *of* something — and they are also the most powerful tool for studying groups themselves. In this chapter we prove the orbit–stabiliser theorem and Burnside's counting lemma, apply them to symmetry and colouring problems, and then turn the machinery on groups acting on themselves. That yields the class equation, Cauchy's theorem and the three Sylow theorems, which give a partial converse to Lagrange's theorem and let us determine the structure of many groups from their order alone.

## Actions, orbits and stabilisers

::: definition Group action {#def-action}
An **action** of a group $G$ on a set $X$ is a map $G \times X \to X$, $(g, x) \mapsto g\cdot x$, such that for all $x \in X$ and $g, h \in G$:

1. $e \cdot x = x$;
2. $g\cdot(h\cdot x) = (gh)\cdot x$.

We say $G$ **acts on** $X$, and call $X$ a **$G$-set**.
:::

For each $g$, the map $x \mapsto g\cdot x$ is a bijection of $X$, with inverse $x \mapsto g^{-1}\cdot x$ (by the two axioms, $g^{-1}\cdot(g\cdot x) = e\cdot x = x$). So an action gives a map $\rho\colon G \to \operatorname{Sym}(X)$, $\rho(g)(x) = g\cdot x$, and axiom 2 says precisely that $\rho(gh) = \rho(g)\rho(h)$. Conversely every homomorphism $\rho\colon G \to \operatorname{Sym}(X)$ defines an action by $g \cdot x = \rho(g)(x)$. **An action is the same thing as a homomorphism into a symmetric group.** Its kernel, the set of elements acting as the identity, is a normal subgroup of $G$ ([[abstract-algebra/homomorphisms#thm-kernel-normal]]); the action is **faithful** if the kernel is trivial.

The most important examples:

1. $S_n$ acts on $\set{1, \dots, n}$ by $\sigma\cdot i = \sigma(i)$; $D_n$ acts on the vertices of the $n$-gon.
2. Any group acts on itself by **left multiplication**, $g\cdot x = gx$. This action is faithful, and the resulting homomorphism $G \to \operatorname{Sym}(G)$ is exactly the embedding of Cayley's theorem ([[abstract-algebra/permutation-groups#thm-cayley]]).
3. Any group acts on itself by **conjugation**, $g\cdot x = gxg^{-1}$. Axiom 2 holds because $g(hxh^{-1})g^{-1} = (gh)x(gh)^{-1}$.
4. If $H \le G$, then $G$ acts on the set $G/H$ of left cosets by $g\cdot(aH) = (ga)H$.
5. $\mathrm{GL}_n(\R)$ acts on $\R^n$ by $A \cdot v = Av$.
6. The rotations of a cube act on its $6$ faces, its $8$ vertices and its $12$ edges.
7. If $G$ acts on $X$, it acts on colourings $c\colon X \to C$ by $(g\cdot c)(x) = c(g^{-1}\cdot x)$: the colour now at $x$ is the colour that used to be at $g^{-1}\cdot x$. (The inverse makes axiom 2 hold.)

::: definition Orbits, stabilisers and fixed points {#def-orbit-stabiliser}
Let $G$ act on $X$ and $x \in X$. The **orbit** of $x$ is $\operatorname{Orb}(x) = \set{g\cdot x : g \in G}$; the **stabiliser** of $x$ is $\operatorname{Stab}(x) = \set{g \in G : g\cdot x = x}$. For $g \in G$, the **fixed set** of $g$ is $\operatorname{Fix}(g) = \set{x \in X : g\cdot x = x}$. The action is **transitive** if there is only one orbit.
:::

::: proposition Orbits partition, stabilisers are subgroups {#prop-orbits}
The orbits of an action partition $X$, and each $\operatorname{Stab}(x)$ is a subgroup of $G$. Moreover $\operatorname{Stab}(g\cdot x) = g\operatorname{Stab}(x)g^{-1}$.
:::

::: proof
Define $x \sim y$ if $y = g\cdot x$ for some $g$. This is reflexive ($x = e\cdot x$), symmetric (if $y = g\cdot x$ then $x = g^{-1}\cdot y$) and transitive (if $y = g\cdot x$ and $z = h\cdot y$ then $z = (hg)\cdot x$), and its classes are the orbits. For the stabiliser: $e \in \operatorname{Stab}(x)$, and if $g\cdot x = h\cdot x = x$ then $(gh^{-1})\cdot x = g\cdot(h^{-1}\cdot x) = g\cdot x = x$. Finally $k \cdot (g\cdot x) = g\cdot x \iff (g^{-1}kg)\cdot x = x \iff g^{-1}kg \in \operatorname{Stab}(x) \iff k \in g\operatorname{Stab}(x)g^{-1}$.
:::

## The orbit–stabiliser theorem

The bigger the stabiliser of a point, the fewer places the point can be moved to. Exactly:

::: theorem Orbit–stabiliser theorem {#thm-orbit-stabiliser}
Let $G$ act on $X$ and $x \in X$. Then $g\operatorname{Stab}(x) \mapsto g\cdot x$ is a well-defined bijection from the set of left cosets of $\operatorname{Stab}(x)$ to $\operatorname{Orb}(x)$. Hence $\abs{\operatorname{Orb}(x)} = [G : \operatorname{Stab}(x)]$, and if $G$ is finite,

$$
\abs{G} = \abs{\operatorname{Orb}(x)}\cdot\abs{\operatorname{Stab}(x)} .
$$ {#eq-orbit-stabiliser}
:::

::: proof
Write $H = \operatorname{Stab}(x)$. For $g, k \in G$,

$$
g\cdot x = k\cdot x \iff (g^{-1}k)\cdot x = x \iff g^{-1}k \in H \iff gH = kH,
$$

by [[abstract-algebra/lagrange#lem-cosets]]. Read from right to left this says the map $gH \mapsto g\cdot x$ is well defined; from left to right, that it is injective. It is surjective onto $\operatorname{Orb}(x)$ by the definition of the orbit. For finite $G$, Lagrange's theorem gives $[G:H] = \abs{G}/\abs{H}$.
:::

In particular the size of every orbit divides $\abs{G}$. Lagrange's theorem is itself a special case: $H$ acts on $G$ by $h\cdot g = gh^{-1}$, every stabiliser is trivial, and the orbits are the left cosets $gH$, all of size $\abs{H}$.

::: example The rotations of a cube {#ex-cube}
Show that the group $G$ of rotations of a cube has order $24$, and find the orders of the rotation groups of the regular tetrahedron and dodecahedron.
::: solution
$G$ acts on the $6$ faces, and the action is transitive: any face can be rotated to any other. The stabiliser of the top face consists of the rotations about the vertical axis through the centres of the top and bottom faces by $0^\circ$, $90^\circ$, $180^\circ$ and $270^\circ$; any rotation fixing the top face fixes this axis, so these are all. By [[#eq-orbit-stabiliser]],

$$
\abs{G} = 6 \times 4 = 24 .
$$

The same argument for the tetrahedron ($4$ triangular faces, each with a stabiliser of $3$ rotations) gives $4\times 3 = 12$, and for the dodecahedron ($12$ pentagonal faces, stabilisers of order $5$) gives $12\times 5 = 60$. We could equally count with vertices: the cube has $8$ vertices, each fixed by the $3$ rotations about the long diagonal through it, and $8\times3 = 24$ again.
:::
:::

::: quiz
The rotation group of a regular tetrahedron has order $12$ and acts transitively on the $6$ edges. How many rotations fix a given edge (as a set)?
- [ ] $1$
- [x] $2$
- [ ] $3$
- [ ] $6$
::: solution
By orbit–stabiliser, $\abs{\operatorname{Stab}} = 12/6 = 2$: the identity, and the half-turn about the axis through the midpoint of that edge and the midpoint of the opposite edge.
:::
:::

## Counting orbits: Burnside's lemma

Counting objects "up to symmetry" means counting orbits. The following lemma reduces this to counting fixed points, which is usually easy.

::: theorem Burnside's lemma {#thm-burnside}
Let a finite group $G$ act on a finite set $X$. The number of orbits is

$$
\frac{1}{\abs{G}}\sum_{g\in G}\abs{\operatorname{Fix}(g)},
$$ {#eq-burnside}

the average number of points fixed by an element of $G$.
:::

::: proof
Count the set of pairs $F = \set{(g, x) \in G \times X : g\cdot x = x}$ in two ways. Grouping by $g$ gives $\abs{F} = \sum_{g}\abs{\operatorname{Fix}(g)}$. Grouping by $x$ gives $\abs{F} = \sum_x \abs{\operatorname{Stab}(x)}$, and by orbit–stabiliser $\abs{\operatorname{Stab}(x)} = \abs{G}/\abs{\operatorname{Orb}(x)}$. So

$$
\sum_{g}\abs{\operatorname{Fix}(g)} = \abs{G}\sum_{x\in X}\frac{1}{\abs{\operatorname{Orb}(x)}} = \abs{G}\sum_{\text{orbits } O}\ \sum_{x \in O}\frac{1}{\abs{O}} = \abs{G}\cdot(\text{number of orbits}),
$$

since the points of each orbit $O$ contribute $\abs{O}\cdot\frac{1}{\abs O} = 1$. Divide by $\abs{G}$.
:::

To use it on colourings, note that a symmetry $g$ fixes a colouring exactly when the colouring is constant on each cycle of the permutation $g$ induces on the positions. So if $g$ has $c(g)$ cycles (counting fixed positions), it fixes $k^{c(g)}$ colourings with $k$ colours.

::: example Colouring the corners of a square {#ex-square-colourings}
In how many essentially different ways can the four corners of a square be coloured black or white, (a) up to rotation, (b) up to rotations and reflections?
::: solution
(a) $G = \set{e, r, r^2, r^3}$ acts on the $2^4 = 16$ colourings. The identity fixes all $16$. The quarter-turns $r, r^3$ permute the corners in one $4$-cycle, so they fix only the $2$ one-colour squares. The half-turn $r^2 = (1\ 3)(2\ 4)$ has $2$ cycles and fixes $2^2 = 4$ colourings. By Burnside,

$$
\frac{16 + 2 + 4 + 2}{4} = \frac{24}{4} = 6 .
$$

(b) Add the four reflections of $D_4$. The two diagonal reflections, such as $(2\ 4)$, have $3$ cycles and fix $2^3 = 8$ colourings each; the two edge reflections, such as $(1\ 2)(3\ 4)$, have $2$ cycles and fix $4$ each. So

$$
\frac{16 + 2 + 4 + 2 + 8 + 8 + 4 + 4}{8} = \frac{48}{8} = 6 .
$$

Here reflections create no new identifications: the six classes are all white, all black, one black, one white, two adjacent black, and two opposite black.
:::
:::

::: example Necklaces and bracelets {#ex-necklaces}
How many necklaces of six beads can be made with beads of three colours, if necklaces related by rotation are considered the same? How many if turning the necklace over is also allowed?
::: solution
The rotation group $\langle \rho \rangle \cong \Z_6$ acts on the $3^6 = 729$ colourings, where $\rho$ moves each bead one place. The rotation $\rho^k$ splits the six positions into $\gcd(6, k)$ cycles (for example $\rho^2 = (1\ 3\ 5)(2\ 4\ 6)$), so it fixes $3^{\gcd(6,k)}$ colourings:

| rotation | $e$ | $\rho$ | $\rho^2$ | $\rho^3$ | $\rho^4$ | $\rho^5$ |
|---|---|---|---|---|---|---|
| cycles | $6$ | $1$ | $2$ | $3$ | $2$ | $1$ |
| fixed colourings | $729$ | $3$ | $9$ | $27$ | $9$ | $3$ |

The number of necklaces is $(729 + 3 + 9 + 27 + 9 + 3)/6 = 780/6 = 130$.

Allowing flips, the group is $D_6$ of order $12$. Its six reflections are of two kinds: three pass through two opposite beads, with cycle type $(1, 1, 2, 2)$ and $3^4 = 81$ fixed colourings each; three pass between beads, with cycle type $(2, 2, 2)$ and $3^3 = 27$ fixed colourings each. So the number of **bracelets** is

$$
\frac{780 + 3\cdot 81 + 3\cdot 27}{12} = \frac{1104}{12} = 92 .
$$
:::
:::

::: widget permutation
perm: (1 3 5)(2 4 6)
caption: Rotating a six-bead necklace by two places permutes the bead positions as $(1\ 3\ 5)(2\ 4\ 6)$. A colouring is unchanged by this rotation exactly when beads in the same cycle have the same colour, so with three colours it fixes $3^2 = 9$ colourings — the entry under $\rho^2$ in the table of [[#ex-necklaces]]. Try a rotation by one place, $(1\ 2\ 3\ 4\ 5\ 6)$, which has a single cycle.
:::

::: example Colouring the faces of a cube {#ex-cube-colourings}
How many ways are there to colour the faces of a cube with three colours, up to rotation?
::: solution
We need the $24$ rotations of [[#ex-cube]] sorted by how they permute the faces:

| rotations | number | cycles on faces | fixed colourings |
|---|---|---|---|
| identity | $1$ | $6$ | $3^6 = 729$ |
| $\pm 90^\circ$ about a face axis | $6$ | $3$ (a $4$-cycle and two fixed faces) | $3^3 = 27$ |
| $180^\circ$ about a face axis | $3$ | $4$ | $3^4 = 81$ |
| $\pm 120^\circ$ about a vertex axis | $8$ | $2$ (two $3$-cycles) | $3^2 = 9$ |
| $180^\circ$ about an edge axis | $6$ | $3$ (three $2$-cycles) | $3^3 = 27$ |

(There are $3$ face axes, $4$ long diagonals and $6$ axes through midpoints of opposite edges; $1 + 6 + 3 + 8 + 6 = 24$.) By Burnside,

$$
\frac{729 + 6\cdot 27 + 3\cdot 81 + 8\cdot 9 + 6\cdot 27}{24} = \frac{1368}{24} = 57 .
$$

The same table with $2$ colours gives $(64 + 48 + 48 + 32 + 48)/24 = 10$.
:::
:::

::: warning Do not divide by the size of the group
It is tempting to count objects up to symmetry by dividing the total number by $\abs{G}$: $729/6$ necklaces, $3^6/24$ cubes. These are not even integers. Dividing only works when every orbit has size $\abs{G}$, i.e. when no colouring has any symmetry, and that is rarely true (one-colour necklaces are fixed by everything). Burnside's lemma is the correct replacement.
:::

## Conjugacy classes and the class equation

Now let $G$ act on itself by conjugation, $g\cdot x = gxg^{-1}$. The orbit of $a$ is its **conjugacy class**

$$
\operatorname{cl}(a) = \set{gag^{-1} : g \in G},
$$

and its stabiliser is the centraliser $C_G(a) = \set{g : ga = ag}$ ([[abstract-algebra/subgroups#def-centre]]). By orbit–stabiliser,

$$
\abs{\operatorname{cl}(a)} = [G : C_G(a)],
$$

which divides $\abs{G}$. A class has a single element exactly when $gag^{-1} = a$ for all $g$, that is $a \in Z(G)$. Conjugate elements "look alike": they have the same order, and in a permutation group they have the same cycle type. In fact, by [[abstract-algebra/permutation-groups#prop-conjugation]] and [[abstract-algebra/permutation-groups#exr-3-9]], **two permutations are conjugate in $S_n$ if and only if they have the same cycle type**, so the conjugacy classes of $S_4$ have sizes $1, 6, 3, 8, 6$ ([[abstract-algebra/permutation-groups#ex-s4-types]]).

::: theorem The class equation {#thm-class-equation}
Let $G$ be a finite group and let $a_1, \dots, a_k$ be representatives of the conjugacy classes of $G$ having more than one element. Then

$$
\abs{G} = \abs{Z(G)} + \sum_{i=1}^k [G : C_G(a_i)],
$$ {#eq-class-equation}

where each $[G : C_G(a_i)]$ is a divisor of $\abs{G}$ greater than $1$.
:::

::: proof
The conjugacy classes partition $G$. The one-element classes are the $\set{z}$ with $z \in Z(G)$, contributing $\abs{Z(G)}$; the other classes have sizes $[G : C_G(a_i)] > 1$, each dividing $\abs{G}$ by Lagrange.
:::

For $D_4$ the classes are $\set{e}$, $\set{r^2}$, $\set{r, r^3}$, $\set{s, r^2s}$, $\set{rs, r^3s}$, so the class equation reads $8 = 2 + 2 + 2 + 2$. For $S_4$ it is $24 = 1 + 3 + 6 + 6 + 8$. The first striking application concerns groups of prime-power order.

::: theorem p-groups have non-trivial centres {#thm-p-group-centre}
If $p$ is prime and $\abs{G} = p^n$ with $n \ge 1$, then $Z(G) \neq \set{e}$.
:::

::: proof
In the class equation, each $[G : C_G(a_i)]$ is a divisor of $p^n$ greater than $1$, hence divisible by $p$. So $\abs{Z(G)} = \abs{G} - \sum_i[G:C_G(a_i)]$ is divisible by $p$. As $e \in Z(G)$, $\abs{Z(G)} \ge 1$, hence $\abs{Z(G)} \ge p$.
:::

::: corollary Groups of order p² {#cor-p-squared}
Every group of order $p^2$ ($p$ prime) is abelian, and is isomorphic to $\Z_{p^2}$ or $\Z_p\times\Z_p$.
:::

::: proof
By the theorem $\abs{Z(G)} \in \set{p, p^2}$. If $\abs{Z(G)} = p$ then $G/Z(G)$ has order $p$, so it is cyclic, and then $G$ is abelian ([[abstract-algebra/homomorphisms#exr-5-8]]), forcing $Z(G) = G$ — a contradiction. So $Z(G) = G$ and $G$ is abelian. If $G$ has an element of order $p^2$ it is cyclic. Otherwise every non-identity element has order $p$; take $a \neq e$ and $b \notin \langle a\rangle$. Then $\langle a\rangle\cap\langle b\rangle = \set{e}$ (a proper subgroup of a group of order $p$), so the homomorphism $\langle a\rangle\times\langle b\rangle \to G$, $(x, y) \mapsto xy$ (a homomorphism because $G$ is abelian) is injective, hence bijective as both sides have $p^2$ elements. So $G \cong \Z_p \times \Z_p$.
:::

### A₅ is simple

Conjugacy classes also detect normal subgroups: a subgroup $N$ is normal if and only if it is a **union of conjugacy classes**, since $gNg^{-1} \subseteq N$ says exactly that $N$ contains the class of each of its elements.

::: theorem A₅ is simple {#thm-a5-simple}
The alternating group $A_5$, of order $60$, is simple.
:::

::: proof
The elements of $A_5$ are the identity, the $15$ double transpositions, the $20$ three-cycles and the $24$ five-cycles. We find the conjugacy classes *in $A_5$*, using $\abs{\operatorname{cl}_{A_5}(x)} = 60/\abs{C_{A_5}(x)}$ and $C_{A_5}(x) = C_{S_5}(x)\cap A_5$, where $\abs{C_{S_5}(x)}$ is $120$ divided by the number of elements of $S_5$ with the same cycle type as $x$.

- $x = (1\ 2\ 3)$: $\abs{C_{S_5}(x)} = 120/20 = 6$, and $C_{S_5}(x) = \langle(1\ 2\ 3)\rangle\times\langle(4\ 5)\rangle$ contains the odd permutation $(4\ 5)$, so $\abs{C_{A_5}(x)} = 3$ and the class has $20$ elements: all $3$-cycles.
- $x = (1\ 2)(3\ 4)$: $\abs{C_{S_5}(x)} = 120/15 = 8$; it contains the odd $(1\ 2)$, so $\abs{C_{A_5}(x)} = 4$ and the class has $15$ elements.
- $x = (1\ 2\ 3\ 4\ 5)$: $\abs{C_{S_5}(x)} = 120/24 = 5$, so $C_{S_5}(x) = \langle x\rangle \subseteq A_5$, $\abs{C_{A_5}(x)} = 5$ and the class has $12$ elements. The $24$ five-cycles therefore split into two classes of $12$.

So the class sizes are $1, 15, 20, 12, 12$. A normal subgroup $N$ is a union of classes containing $\set{e}$, so $\abs{N} = 1 + (\text{a sum of some of } 15, 20, 12, 12)$, and $\abs{N}$ divides $60$. The possible values of $1 + \text{(sum)}$ are $1, 13, 16, 21, 25, 28, 33, 36, 40, 45, 48, 60$, and of these only $1$ and $60$ divide $60$. So $N = \set{e}$ or $N = A_5$.
:::

## Cauchy's theorem

Lagrange's theorem says the order of an element divides $\abs{G}$, but a divisor of $\abs{G}$ need not be the order of an element ($V_4$ has no element of order $4$). For **prime** divisors, however, elements always exist. The proof uses a counting principle for actions of $p$-groups that we will use repeatedly.

::: lemma Fixed points of p-group actions {#lem-fixed-points}
Let $P$ be a group of order $p^n$ ($p$ prime) acting on a finite set $X$, and let $X^P = \set{x \in X : g\cdot x = x \text{ for all } g \in P}$ be the set of fixed points. Then $\abs{X} \equiv \abs{X^P} \pmod p$.
:::

::: proof
The orbits partition $X$. By orbit–stabiliser each orbit has size dividing $p^n$, so it has size $1$ or a multiple of $p$. The orbits of size $1$ are exactly the fixed points. Hence $\abs{X} = \abs{X^P} + (\text{a multiple of } p)$.
:::

::: theorem Cauchy's theorem {#thm-cauchy}
If $G$ is a finite group and $p$ is a prime dividing $\abs{G}$, then $G$ has an element of order $p$.
:::

::: proof
(This elegant argument is due to James McKay, 1959.) Let

$$
X = \set{(g_1, g_2, \dots, g_p) \in G^p : g_1g_2\cdots g_p = e} .
$$

The first $p - 1$ entries can be chosen freely and then $g_p = (g_1\cdots g_{p-1})^{-1}$ is forced, so $\abs{X} = \abs{G}^{p-1}$, which is divisible by $p$. If $(g_1, \dots, g_p) \in X$ then also $(g_2, \dots, g_p, g_1) \in X$, because $g_2\cdots g_pg_1 = g_1^{-1}(g_1g_2\cdots g_p)g_1 = e$. So the cyclic group $\Z_p$ acts on $X$, the generator shifting each tuple cyclically by one place. A tuple is fixed by this action exactly when all its entries are equal, $(g, g, \dots, g)$ with $g^p = e$. By [[#lem-fixed-points]],

$$
\abs{X^{\Z_p}} \equiv \abs{X} \equiv 0 \pmod p .
$$

The tuple $(e, \dots, e)$ is fixed, so there are at least $p \ge 2$ fixed tuples, and hence some $(g, \dots, g)$ with $g \neq e$ and $g^p = e$. Since $p$ is prime, $\ord(g) = p$.
:::

For example, every group of order $20$ has elements of order $2$ and of order $5$, and every group of order $6$ has elements of order $2$ and $3$ (as we proved by hand in [[abstract-algebra/lagrange#thm-order-6]]).

## The Sylow theorems

Write $\abs{G} = p^am$ with $p$ prime and $p \nmid m$. A subgroup of order $p^a$ — the largest power of $p$ allowed by Lagrange's theorem — is a **Sylow $p$-subgroup** of $G$. A **$p$-subgroup** is a subgroup whose order is a power of $p$. We write $n_p$ for the number of Sylow $p$-subgroups. For example, in $S_4$ (order $24 = 2^3\cdot 3$) the Sylow $2$-subgroups have order $8$ — they are the three copies of $D_4$ obtained by labelling the corners of a square — and the Sylow $3$-subgroups are the four subgroups $\langle(a\ b\ c)\rangle$ of order $3$.

::: theorem Sylow's first theorem {#thm-sylow-1}
Every finite group has a Sylow $p$-subgroup, for every prime $p$.
:::

::: proof
(This counting proof is due to Helmut Wielandt, 1959.) Let $\abs{G} = p^am$ with $p \nmid m$, and let $X$ be the set of all subsets of $G$ with exactly $p^a$ elements. $G$ acts on $X$ by left multiplication, $g\cdot S = gS$ (and $\abs{gS} = \abs{S}$).

*Step 1: $\abs{X} = \binom{p^am}{p^a}$ is not divisible by $p$.* For $0 < k < p$ the prime $p$ divides $\binom pk = \frac{p!}{k!(p-k)!}$ (it divides the numerator but not the denominator), so the polynomials $(1+x)^p$ and $1 + x^p$ have coefficients that agree modulo $p$; we write $(1+x)^p \equiv 1 + x^p$. Congruence of coefficients is preserved by multiplying polynomials, so raising to the $p$-th power repeatedly gives $(1+x)^{p^a} \equiv 1 + x^{p^a}$, and then

$$
(1+x)^{p^am} \equiv (1 + x^{p^a})^m \pmod p .
$$

Comparing coefficients of $x^{p^a}$: $\binom{p^am}{p^a} \equiv \binom m1 = m \not\equiv 0 \pmod p$.

*Step 2: a stabiliser of order $p^a$.* The orbits partition $X$, so not all orbit sizes are divisible by $p$; pick $S \in X$ whose orbit size is not divisible by $p$, and let $H = \operatorname{Stab}(S) = \set{g \in G : gS = S}$. By orbit–stabiliser, $p^am = \abs{\operatorname{Orb}(S)}\cdot\abs{H}$, and since $p \nmid \abs{\operatorname{Orb}(S)}$, $p^a$ divides $\abs{H}$. On the other hand fix $s \in S$: for $h \in H$ we have $hs \in hS = S$, and $h \mapsto hs$ is injective, so $\abs{H} \le \abs{S} = p^a$. Hence $\abs{H} = p^a$, and $H$ is a Sylow $p$-subgroup.
:::

::: theorem Sylow's second theorem {#thm-sylow-2}
Let $P$ be a Sylow $p$-subgroup of a finite group $G$. Every $p$-subgroup $Q$ of $G$ is contained in a conjugate $gPg^{-1}$ of $P$. In particular, any two Sylow $p$-subgroups of $G$ are conjugate.
:::

::: proof
Let $Q$ act on the set $G/P$ of left cosets of $P$ by left multiplication. There are $[G:P] = m$ cosets, and $p \nmid m$. By [[#lem-fixed-points]] the number of fixed cosets is congruent to $m$ modulo $p$, so it is not zero: some coset $gP$ satisfies $qgP = gP$ for all $q \in Q$. Then $g^{-1}qg \in P$ for all $q \in Q$, that is, $Q \subseteq gPg^{-1}$. If $Q$ is itself a Sylow $p$-subgroup, then $\abs{Q} = \abs{gPg^{-1}} = p^a$ and so $Q = gPg^{-1}$.
:::

The **normaliser** of a subgroup $H$ is $N_G(H) = \set{g \in G : gHg^{-1} = H}$, the stabiliser of $H$ under the conjugation action of $G$ on its subgroups. It is the largest subgroup of $G$ in which $H$ is normal.

::: theorem Sylow's third theorem {#thm-sylow-3}
Let $\abs{G} = p^am$ with $p \nmid m$. The number $n_p$ of Sylow $p$-subgroups satisfies

$$
n_p \equiv 1 \pmod p \qquad\text{and}\qquad n_p \mid m .
$$

Moreover $n_p = [G : N_G(P)]$ for any Sylow $p$-subgroup $P$, and $P \trianglelefteq G$ if and only if $n_p = 1$.
:::

::: proof
Let $\mathcal S$ be the set of Sylow $p$-subgroups; $G$ acts on $\mathcal S$ by conjugation, and by Sylow's second theorem the action is transitive. The stabiliser of $P$ is $N_G(P)$, so by orbit–stabiliser $n_p = [G : N_G(P)]$. Since $P \le N_G(P) \le G$, indices multiply ([[abstract-algebra/lagrange#cor-index-tower]]): $m = [G:P] = [G:N_G(P)]\,[N_G(P):P]$, so $n_p \mid m$.

For the congruence, restrict the action to $P$, acting on $\mathcal S$ by conjugation. $P$ itself is a fixed point. Suppose $Q \in \mathcal S$ is fixed, that is $xQx^{-1} = Q$ for all $x \in P$; then $P \le N_G(Q)$. Now $P$ and $Q$ are both Sylow $p$-subgroups of the group $N_G(Q)$ (their order $p^a$ is the largest power of $p$ dividing $\abs{G}$, hence also the largest dividing $\abs{N_G(Q)}$). By Sylow's second theorem in $N_G(Q)$, $P = yQy^{-1}$ for some $y \in N_G(Q)$; but $yQy^{-1} = Q$ by definition of the normaliser. So $P = Q$: the only fixed point is $P$. By [[#lem-fixed-points]], $n_p = \abs{\mathcal S} \equiv 1 \pmod p$.

Finally $n_p = 1$ means $gPg^{-1} = P$ for all $g$, which is normality.
:::

::: remark Subgroups of every prime-power order
Sylow's first theorem can be strengthened: if $p^k$ divides $\abs{G}$, then $G$ has a subgroup of order $p^k$. It suffices to show that a group $P$ of order $p^a$ has subgroups of every order $p^k$, $k \le a$. By [[#thm-p-group-centre]] and Cauchy's theorem, $Z(P)$ contains an element $z$ of order $p$; $\langle z\rangle$ is normal, and by induction $P/\langle z\rangle$ (of order $p^{a-1}$) has a subgroup of each order $p^{k-1}$, whose preimage under the correspondence theorem ([[abstract-algebra/homomorphisms#thm-correspondence]]) has order $p^k$.
:::

::: widget cayley
group: S
n: 4
highlight: (1 2 3 4); (1 3)
mode: table
caption: The Cayley table of $S_4$ (order $24 = 2^3\cdot3$) with a Sylow $2$-subgroup highlighted: $\langle(1\ 2\ 3\ 4), (1\ 3)\rangle$ is the copy of $D_4$ of symmetries of the square with corners $1, 2, 3, 4$ in order. It has $[S_4 : D_4] = 3$ cosets. Sylow's third theorem allows $n_2 \in \set{1, 3}$; in fact $n_2 = 3$, one $D_4$ for each of the three ways to arrange $1, 2, 3, 4$ around a square.
:::

### Applications

The Sylow theorems often pin down $n_p$ from the order of $G$ alone, and a unique Sylow subgroup is normal.

::: example Groups of order 15 are cyclic {#ex-order-15}
Show that every group of order $15$ is cyclic. More generally, if $p < q$ are primes and $p \nmid q - 1$, show that every group of order $pq$ is cyclic.
::: solution
By Sylow III, $n_q$ divides $p$ and $n_q \equiv 1 \pmod q$; since $p < q$, the only possibility is $n_q = 1$. Likewise $n_p \mid q$ and $n_p \equiv 1 \pmod p$, so $n_p \in \set{1, q}$, and $q \not\equiv 1 \pmod p$ by hypothesis; so $n_p = 1$. Thus the Sylow subgroups $P$ (order $p$) and $Q$ (order $q$) are both normal, and $P \cap Q = \set{e}$ since its order divides $\gcd(p, q) = 1$.

Elements of $P$ and $Q$ commute: for $x \in P$, $y \in Q$, the commutator $xyx^{-1}y^{-1}$ equals $(xyx^{-1})y^{-1} \in Q$ and $x(yx^{-1}y^{-1}) \in P$, so it lies in $P\cap Q = \set{e}$. Take $x$ of order $p$ and $y$ of order $q$ (Cauchy). If $(xy)^k = x^ky^k = e$ then $x^k = y^{-k} \in P\cap Q = \set{e}$, so $p \mid k$ and $q \mid k$; hence $\ord(xy) = pq$ and $G$ is cyclic. For $15 = 3\cdot 5$: $3 \nmid 4$, so every group of order $15$ is isomorphic to $\Z_{15}$.
:::
:::

::: example No simple groups of order 12 or 30 {#ex-not-simple}
Show that no group of order $12$ or $30$ is simple.
::: solution
*Order $12 = 2^2\cdot 3$.* $n_3 \mid 4$ and $n_3 \equiv 1 \pmod 3$, so $n_3 \in \set{1, 4}$. If $n_3 = 1$ the Sylow $3$-subgroup is normal. If $n_3 = 4$, the four subgroups of order $3$ intersect pairwise trivially, so they contain $4 \times 2 = 8$ elements of order $3$. That leaves $4$ elements, and a Sylow $2$-subgroup (of order $4$) contains no element of order $3$, so it must consist of exactly these $4$ elements. Hence $n_2 = 1$ and the Sylow $2$-subgroup is normal. ($A_4$ is the case $n_3 = 4$, $n_2 = 1$: its normal Sylow $2$-subgroup is $V$.)

*Order $30 = 2\cdot3\cdot5$.* $n_5 \in \set{1, 6}$ and $n_3 \in \set{1, 10}$. If neither Sylow subgroup were normal, there would be $6\times 4 = 24$ elements of order $5$ and $10 \times 2 = 20$ elements of order $3$ — $44$ elements in a group of order $30$. So $n_5 = 1$ or $n_3 = 1$, and $G$ has a normal subgroup of order $5$ or $3$.
:::
:::

::: widget cayley
group: A
n: 4
highlight: (1 2 3)
mode: table
caption: The Cayley table of $A_4$ with the Sylow $3$-subgroup $\langle(1\ 2\ 3)\rangle$ and its four cosets coloured. Here $n_3 = 4$: the four subgroups $\langle(1\ 2\ 3)\rangle$, $\langle(1\ 2\ 4)\rangle$, $\langle(1\ 3\ 4)\rangle$, $\langle(2\ 3\ 4)\rangle$ are conjugate, as Sylow's second theorem demands, and $4 \equiv 1 \pmod 3$ divides $4$, as the third theorem demands.
:::

::: quiz
How many Sylow $5$-subgroups does a group of order $20$ have?
- [x] $1$
- [ ] $4$
- [ ] $5$
- [ ] It depends on the group
::: solution
$20 = 2^2\cdot 5$, so $n_5$ divides $4$ and $n_5 \equiv 1 \pmod 5$. The divisors of $4$ are $1, 2, 4$, and only $1$ is $\equiv 1 \pmod 5$. So every group of order $20$ has a unique, normal, Sylow $5$-subgroup — and in particular no group of order $20$ is simple.
:::
:::

::: history
William Burnside's lemma, as it is universally known, appears in his book *Theory of Groups of Finite Order* (1897), but the formula was known to Augustin-Louis Cauchy (1845) and Ferdinand Georg Frobenius (1887); it is sometimes called "the lemma that is not Burnside's". Cauchy proved his theorem on elements of prime order in 1845, for permutation groups. Ludwig Sylow published his three theorems in 1872, also for permutation groups; Frobenius gave a proof for abstract groups in 1887. The short proofs used in this chapter are much later: James McKay's proof of Cauchy's theorem and Helmut Wielandt's proof of Sylow's first theorem both appeared in 1959. The study of counting under symmetry was later developed by George Pólya (1937), whose enumeration theory is widely used in chemistry to count isomers.
:::

## Where this leads

Group actions are everywhere in mathematics: Galois groups act on the roots of polynomials ([[abstract-algebra/fields-galois]]), matrix groups act on vector spaces ([[linear-algebra/linear-maps]]), and the fundamental group of a space acts on the fibres of its covering maps (for the covering $\R \to S^1$ of [[topology/fundamental-group]], $\pi_1(S^1) \cong \Z$ acts on each fibre $s + \Z$ by integer translations). The Sylow theorems are the starting point for classifying groups of small order and for proving that groups are not simple; the simplicity of $A_5$ is the reason the general quintic cannot be solved by radicals, as we will see in [[abstract-algebra/fields-galois]]. Burnside's lemma and its refinement by Pólya are standard tools of enumerative combinatorics, extending [[discrete/counting|the basic counting principles]] to counting up to symmetry.

::: summary
- An **action** of $G$ on $X$ is a homomorphism $G \to \operatorname{Sym}(X)$; its orbits partition $X$ and its stabilisers are subgroups, with $\operatorname{Stab}(g\cdot x) = g\operatorname{Stab}(x)g^{-1}$.
- **Orbit–stabiliser**: $\abs{\operatorname{Orb}(x)} = [G : \operatorname{Stab}(x)]$, so $\abs{G} = \abs{\operatorname{Orb}(x)}\abs{\operatorname{Stab}(x)}$; e.g. the cube has $6 \times 4 = 24$ rotations.
- **Burnside**: the number of orbits is the average number of fixed points; a symmetry with $c$ cycles fixes $k^c$ colourings with $k$ colours.
- Conjugacy classes have sizes $[G : C_G(a)]$ dividing $\abs{G}$, and $\abs{G} = \abs{Z(G)} + \sum [G : C_G(a_i)]$ (class equation). Normal subgroups are unions of classes; $A_5$ is simple.
- $p$-groups have non-trivial centres; groups of order $p^2$ are abelian. For $p$-group actions, $\abs{X} \equiv \abs{X^P} \pmod p$.
- **Cauchy**: if $p \mid \abs{G}$, there is an element of order $p$.
- **Sylow**: Sylow $p$-subgroups exist, are all conjugate, and $n_p \equiv 1 \pmod p$, $n_p \mid m$; $n_p = 1$ iff the Sylow subgroup is normal. Hence groups of order $pq$, for primes $p < q$ with $p \nmid q-1$, are cyclic, and no group of order $12$, $20$ or $30$ is simple.
:::

## Exercises

::: exercise The rotations of a dodecahedron {level=1 check="60"}
A regular dodecahedron has $20$ vertices, and each vertex is fixed by exactly $3$ rotations. Use this to compute the order of its rotation group, and check it against [[#ex-cube]].
::: solution
The rotation group acts transitively on the $20$ vertices with stabilisers of order $3$, so its order is $20 \times 3 = 60$, agreeing with the count $12\times 5$ using faces.
:::
:::

::: exercise Colouring the edges of a square {level=1 check="24"}
In how many ways can the four edges of a square be coloured with three colours, up to rotation?
::: solution
The rotations $e, r, r^2, r^3$ permute the four edges like the corners: $e$ fixes $3^4 = 81$ colourings, $r$ and $r^3$ (one $4$-cycle) fix $3$ each, and $r^2$ (two $2$-cycles) fixes $3^2 = 9$. Burnside gives $(81 + 3 + 9 + 3)/4 = 96/4 = 24$.
:::
:::

::: exercise Sylow 3-subgroups of a group of order 18 {level=1 check="1"}
How many Sylow $3$-subgroups does a group of order $18$ have?
::: solution
$18 = 2\cdot 3^2$, so $n_3 \mid 2$ and $n_3 \equiv 1 \pmod 3$. Only $n_3 = 1$ works: there is a unique, normal, Sylow $3$-subgroup of order $9$.
:::
:::

::: exercise The class equation of Q₈ {level=2}
Find the conjugacy classes of the quaternion group $Q_8$ ([[abstract-algebra/homomorphisms#ex-q8]]) and write down its class equation.
::: solution
$Z(Q_8) = \set{\pm1}$. For $i$: its centraliser contains $\langle i\rangle = \set{\pm1, \pm i}$ and not $j$ (as $ij = -ji \ne ji$), so $C(i) = \langle i\rangle$ has index $2$ and $\operatorname{cl}(i)$ has $2$ elements. Since $jij^{-1} = ji(-j) = -(ji)j = kj = -i$, we get $\operatorname{cl}(i) = \set{i, -i}$. Similarly $\operatorname{cl}(j) = \set{\pm j}$ and $\operatorname{cl}(k) = \set{\pm k}$. The class equation is $8 = 2 + 2 + 2 + 2$ (centre of order $2$, three classes of size $2$).
:::
:::

::: exercise Necklaces of five beads {level=2 check="8"}
How many necklaces of five beads, each black or white, are there up to rotation?
::: solution
The rotation group is $\Z_5$. The identity fixes $2^5 = 32$ colourings; each of the four non-trivial rotations moves the five positions in a single $5$-cycle (because $5$ is prime), so fixes only the $2$ one-colour necklaces. Burnside gives $(32 + 4\cdot 2)/5 = 40/5 = 8$.
:::
:::

::: exercise Groups of order 35 {level=2}
Prove that every group of order $35$ is cyclic.
::: solution
$35 = 5\cdot 7$ with $5 < 7$ and $5 \nmid 7 - 1 = 6$, so [[#ex-order-15]] applies: $n_7 \mid 5$ with $n_7 \equiv 1 \pmod 7$ gives $n_7 = 1$; $n_5 \mid 7$ with $n_5 \equiv 1 \pmod 5$ gives $n_5 = 1$; the two normal Sylow subgroups commute elementwise and the product of generators has order $35$.
:::
:::

::: exercise Conjugate stabilisers {level=2}
Let $G$ act transitively on a finite set $X$ with $\abs{X} \ge 2$. Prove that the stabilisers of the points of $X$ are all conjugate, and deduce that $\bigcup_{x\in X}\operatorname{Stab}(x) \neq G$ if $G$ is finite. (So some element of $G$ fixes no point — "a transitive group has a derangement".)
::: hint
Count: there are at most $[G:H]$ conjugates of $H = \operatorname{Stab}(x)$, and they all contain $e$.
:::
::: solution
By [[#prop-orbits]], $\operatorname{Stab}(g\cdot x) = g\operatorname{Stab}(x)g^{-1}$, and transitivity means every point is $g\cdot x$ for some $g$. Let $H = \operatorname{Stab}(x)$, with $\abs{G} = n\abs{H}$ where $n = \abs{X} \ge 2$ (orbit–stabiliser). The conjugates $gHg^{-1}$ depend only on the coset $gH$, so there are at most $n$ of them, each of size $\abs{H}$, all containing $e$. Their union therefore has at most $n(\abs{H} - 1) + 1 = \abs{G} - n + 1 < \abs{G}$ elements. So some $g \in G$ lies in no stabiliser, i.e. fixes no point.
:::
:::

::: exercise Necklaces prove Fermat's little theorem {level=3}
Let $p$ be prime and $a \ge 1$. Show that the number of necklaces of $p$ beads in $a$ colours, up to rotation, is $\dfrac{a^p + (p-1)a}{p}$, and deduce that $p \mid a^p - a$.
::: solution
The rotation group $\Z_p$ acts on the $a^p$ colourings. The identity fixes all of them. Each non-trivial rotation $\rho^k$ ($1 \le k \le p-1$) generates all of $\Z_p$, because $p$ is prime, so the only colourings it fixes are those fixed by every rotation, the $a$ one-colour necklaces. By Burnside the number of orbits is $\frac{a^p + (p-1)a}{p}$. This is an integer, so $p \mid a^p + (p-1)a = (a^p - a) + pa$, and therefore $p \mid a^p - a$. (Equivalently: the $a^p - a$ non-constant colourings fall into orbits of size exactly $p$.)
:::
:::

::: exercise No simple group of order 56 {level=3}
Prove that no group of order $56$ is simple.
::: solution
$56 = 2^3\cdot 7$. $n_7 \mid 8$ and $n_7 \equiv 1 \pmod 7$, so $n_7 \in \set{1, 8}$. If $n_7 = 1$ the Sylow $7$-subgroup is normal. If $n_7 = 8$, the eight subgroups of order $7$ intersect pairwise trivially and contain $8\times 6 = 48$ elements of order $7$. The remaining $8$ elements must contain a Sylow $2$-subgroup (order $8$, with no elements of order $7$), so they *are* that subgroup, which is therefore unique and normal. Either way $G$ has a proper non-trivial normal subgroup.
:::
:::

::: exercise Index equal to the smallest prime {level=3}
Let $G$ be finite, let $p$ be the smallest prime dividing $\abs{G}$, and let $H \le G$ with $[G:H] = p$. Prove that $H \trianglelefteq G$.
::: hint
Let $G$ act on the $p$ left cosets of $H$ and consider the kernel $K$ of the resulting homomorphism $G \to S_p$.
:::
::: solution
$G$ acts on $G/H$ by left multiplication, giving a homomorphism $\rho\colon G \to \operatorname{Sym}(G/H) \cong S_p$ with kernel $K$. If $g \in K$ then $gH = H$, so $g \in H$: thus $K \subseteq H$. By the first isomorphism theorem $G/K$ is isomorphic to a subgroup of $S_p$, so $[G : K]$ divides $p!$; it also divides $\abs{G}$. Every prime factor of $[G:K]$ divides $\abs{G}$, so is at least $p$, and divides $p!$, so is at most $p$; and $p^2 \nmid p!$. Hence $[G:K]$ divides $p$. But $K \subseteq H$ gives $[G:K] \ge [G:H] = p$. So $[G:K] = p = [G:H]$, which with $K \subseteq H$ forces $K = H$. Thus $H$ is a kernel, hence normal. (For $p = 2$ this recovers the fact that subgroups of index $2$ are normal.)
:::
:::
