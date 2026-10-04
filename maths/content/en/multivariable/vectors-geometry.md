The four hydrogen atoms of a methane molecule sit at alternate corners of a cube, with the carbon atom at its centre. What is the angle between two of the carbon–hydrogen bonds? A plane passes through three survey markers on a hillside; how far above the plane is the top of a mast standing nearby? Two straight cables cross a valley without touching; how close do they come?

Each of these is a question about lengths, angles and directions in three-dimensional space, and each has a short answer once we have the right tools. This chapter builds those tools: **vectors**, the **dot product** (which measures angles and lengths), the **cross product** (which produces perpendicular directions and measures areas) and the **scalar triple product** (which measures volumes). With them we write equations of lines and planes, compute distances, and recognise the quadric surfaces that will be our standard examples for the rest of the course. Everything here is linear algebra of $\R^3$ (see [[linear-algebra/matrices]]) given a geometric meaning.

## Points and vectors in space

We locate a point in space by three numbers $(x, y, z)$, its coordinates with respect to three mutually perpendicular axes through an origin $O$. We always use a **right-handed** system: if the fingers of your right hand curl from the positive $x$-axis towards the positive $y$-axis, your thumb points along the positive $z$-axis. The set of all triples is $\R^3$.

Applying Pythagoras' theorem twice (first in the horizontal plane, then in the vertical plane containing the diagonal) gives the **distance** between $P_1 = (x_1, y_1, z_1)$ and $P_2 = (x_2, y_2, z_2)$:

$$
\abs{P_1P_2} = \sqrt{(x_2-x_1)^2 + (y_2-y_1)^2 + (z_2-z_1)^2}.
$$

In particular the **sphere** with centre $(a, b, c)$ and radius $r$, the set of points at distance $r$ from the centre, has equation $(x-a)^2 + (y-b)^2 + (z-c)^2 = r^2$.

::: example Recognising a sphere {#ex-sphere}
Show that $x^2 + y^2 + z^2 - 2x + 4y - 6z = 2$ is a sphere and find its centre and radius.
::: solution
Complete the square in each variable:

$$
(x^2 - 2x + 1) + (y^2 + 4y + 4) + (z^2 - 6z + 9) = 2 + 1 + 4 + 9,
$$

that is, $(x-1)^2 + (y+2)^2 + (z-3)^2 = 16$. This is the sphere with centre $(1, -2, 3)$ and radius $4$. (Had the right-hand side come out negative, the equation would have no solutions at all; had it been $0$, the "sphere" would be a single point.)
:::
:::

A **vector** records a displacement: a length together with a direction. The displacement from $P_1$ to $P_2$ is the vector

$$
\overrightarrow{P_1P_2} = (x_2 - x_1,\; y_2 - y_1,\; z_2 - z_1).
$$

The same vector describes every arrow with the same length and direction, wherever it starts. When the arrow starts at the origin and ends at $P$, the vector $\overrightarrow{OP}$ is the **position vector** of $P$, and it has the same components as $P$ itself; for this reason we use the same notation $(v_1, v_2, v_3)$ for points and vectors, and write vectors in bold.

::: definition Vectors and their length {#def-vector}
A **vector** in $\R^3$ is an ordered triple $\mathbf{v} = (v_1, v_2, v_3)$ of real numbers, its **components**. Vectors are added and multiplied by scalars $c \in \R$ componentwise:

$$
\mathbf{u} + \mathbf{v} = (u_1 + v_1,\, u_2 + v_2,\, u_3 + v_3), \qquad c\,\mathbf{v} = (cv_1, cv_2, cv_3).
$$

The **length** (or **norm**) of $\mathbf{v}$ is $\norm{\mathbf{v}} = \sqrt{v_1^2 + v_2^2 + v_3^2}$. A **unit vector** is a vector of length $1$, and the **standard basis vectors** are $\mathbf{i} = (1,0,0)$, $\mathbf{j} = (0,1,0)$, $\mathbf{k} = (0,0,1)$.
:::

Geometrically, $\mathbf{u} + \mathbf{v}$ is obtained by placing the tail of $\mathbf{v}$ at the head of $\mathbf{u}$ (the triangle law), and $c\mathbf{v}$ stretches $\mathbf{v}$ by the factor $\abs{c}$, reversing it when $c < 0$. These operations satisfy the familiar rules of algebra — commutativity, associativity, distributivity — because they are performed one component at a time; in the language of [[linear-algebra/vector-spaces]], $\R^3$ is a vector space. Every vector is a combination of the basis vectors, $\mathbf{v} = v_1\mathbf{i} + v_2\mathbf{j} + v_3\mathbf{k}$, and $\norm{c\mathbf{v}} = \abs{c}\,\norm{\mathbf{v}}$. Dividing a non-zero vector by its length, $\mathbf{v}/\norm{\mathbf{v}}$, gives the unit vector in the same direction; this is called **normalising** $\mathbf{v}$.

Nothing so far depends on there being exactly three components. Vectors in $\R^n$ are $n$-tuples with the same operations, and most results of the next section hold in $\R^n$ with the same proofs.

## The dot product

How do we detect from components whether two vectors are perpendicular, or compute the angle between them? The answer is a single, remarkably useful number.

::: definition Dot product {#def-dot}
The **dot product** (or **scalar product**) of $\mathbf{u} = (u_1, u_2, u_3)$ and $\mathbf{v} = (v_1, v_2, v_3)$ is the number

$$
\mathbf{u}\cdot\mathbf{v} = u_1v_1 + u_2v_2 + u_3v_3 .
$$
:::

Directly from the formula, for all vectors $\mathbf{u}, \mathbf{v}, \mathbf{w}$ and scalars $c$:

- $\mathbf{u}\cdot\mathbf{v} = \mathbf{v}\cdot\mathbf{u}$ (symmetry);
- $\mathbf{u}\cdot(\mathbf{v} + \mathbf{w}) = \mathbf{u}\cdot\mathbf{v} + \mathbf{u}\cdot\mathbf{w}$ and $(c\mathbf{u})\cdot\mathbf{v} = c(\mathbf{u}\cdot\mathbf{v})$ (linearity);
- $\mathbf{v}\cdot\mathbf{v} = \norm{\mathbf{v}}^2 \ge 0$, with equality only for $\mathbf{v} = \mathbf{0}$.

Each is a one-line check; for example the last holds because $v_1^2 + v_2^2 + v_3^2$ is a sum of squares. These rules let us expand dot products like ordinary products. For instance,

$$
\norm{\mathbf{u} + \mathbf{v}}^2 = (\mathbf{u} + \mathbf{v})\cdot(\mathbf{u} + \mathbf{v}) = \norm{\mathbf{u}}^2 + 2\,\mathbf{u}\cdot\mathbf{v} + \norm{\mathbf{v}}^2 .
$$ {#eq-expand}

### Angles and the Cauchy–Schwarz inequality

The **angle** between non-zero vectors $\mathbf{u}$ and $\mathbf{v}$ is the angle $\theta \in [0, \pi]$ between arrows representing them drawn from a common point.

::: theorem Geometric form of the dot product {#thm-dot-geometric}
If $\theta$ is the angle between non-zero vectors $\mathbf{u}$ and $\mathbf{v}$ in $\R^3$, then

$$
\mathbf{u}\cdot\mathbf{v} = \norm{\mathbf{u}}\,\norm{\mathbf{v}}\cos\theta .
$$
:::

::: proof
Draw $\mathbf{u}$ and $\mathbf{v}$ from a common point. Together with $\mathbf{u} - \mathbf{v}$, which joins their heads, they form a triangle with sides $\norm{\mathbf{u}}$, $\norm{\mathbf{v}}$, $\norm{\mathbf{u}-\mathbf{v}}$ and angle $\theta$ between the first two. The law of cosines gives

$$
\norm{\mathbf{u} - \mathbf{v}}^2 = \norm{\mathbf{u}}^2 + \norm{\mathbf{v}}^2 - 2\norm{\mathbf{u}}\,\norm{\mathbf{v}}\cos\theta .
$$

On the other hand, expanding as in [[#eq-expand]], $\norm{\mathbf{u}-\mathbf{v}}^2 = \norm{\mathbf{u}}^2 - 2\,\mathbf{u}\cdot\mathbf{v} + \norm{\mathbf{v}}^2$. Comparing the two expressions gives $\mathbf{u}\cdot\mathbf{v} = \norm{\mathbf{u}}\norm{\mathbf{v}}\cos\theta$. If $\mathbf{u}$ and $\mathbf{v}$ are parallel the triangle is degenerate, but the law of cosines still holds: for $\mathbf{v} = c\mathbf{u}$ with $c > 0$ (so $\theta = 0$) both sides equal $(1-c)^2\norm{\mathbf{u}}^2$, and $c < 0$ ($\theta = \pi$) is similar.
:::

So the dot product converts a question about angles into arithmetic: $\cos\theta = \dfrac{\mathbf{u}\cdot\mathbf{v}}{\norm{\mathbf{u}}\norm{\mathbf{v}}}$. In particular $\mathbf{u}$ and $\mathbf{v}$ are perpendicular exactly when $\mathbf{u}\cdot\mathbf{v} = 0$. We call vectors with $\mathbf{u}\cdot\mathbf{v} = 0$ **orthogonal**; by convention $\mathbf{0}$ is orthogonal to everything.

::: example The tetrahedral angle {#ex-methane}
Place the carbon atom of methane at the origin and the hydrogen atoms at the cube corners $(1,1,1)$, $(1,-1,-1)$, $(-1,1,-1)$ and $(-1,-1,1)$. Find the H–C–H bond angle.
::: solution
Take the bonds $\mathbf{u} = (1,1,1)$ and $\mathbf{v} = (1,-1,-1)$. Then $\mathbf{u}\cdot\mathbf{v} = 1 - 1 - 1 = -1$ and $\norm{\mathbf{u}} = \norm{\mathbf{v}} = \sqrt3$, so

$$
\cos\theta = \frac{-1}{\sqrt3\cdot\sqrt3} = -\frac13, \qquad \theta = \arccos\left(-\tfrac13\right) \approx 109.47^\circ .
$$

Every pair of the four bonds gives the same dot product $-1$, so all six bond angles are equal — the symmetric arrangement chemists call tetrahedral. The angle is obtuse because the dot product is negative.
:::
:::

In $\R^n$ for $n > 3$ there is no picture to appeal to, and we turn [[#thm-dot-geometric]] around and *define* the angle by $\cos\theta = \mathbf{u}\cdot\mathbf{v}/(\norm{\mathbf{u}}\norm{\mathbf{v}})$. For this to make sense the right-hand side must lie in $[-1, 1]$. That is the content of one of the most useful inequalities in mathematics, and the proof uses only the algebraic rules above, so it is valid in every $\R^n$.

::: theorem Cauchy–Schwarz inequality {#thm-cauchy-schwarz}
For all vectors $\mathbf{u}, \mathbf{v}$ in $\R^n$,

$$
\abs{\mathbf{u}\cdot\mathbf{v}} \le \norm{\mathbf{u}}\,\norm{\mathbf{v}},
$$

with equality if and only if one of the vectors is a scalar multiple of the other.
:::

::: proof
If $\mathbf{v} = \mathbf{0}$ both sides are $0$ and $\mathbf{v} = 0\,\mathbf{u}$, so suppose $\mathbf{v} \neq \mathbf{0}$. For every real $t$,

$$
0 \le \norm{\mathbf{u} - t\mathbf{v}}^2 = \norm{\mathbf{u}}^2 - 2t\,\mathbf{u}\cdot\mathbf{v} + t^2\norm{\mathbf{v}}^2 .
$$

The right-hand side is a quadratic in $t$, smallest at $t_0 = \mathbf{u}\cdot\mathbf{v}/\norm{\mathbf{v}}^2$. Substituting $t = t_0$,

$$
0 \le \norm{\mathbf{u}}^2 - \frac{(\mathbf{u}\cdot\mathbf{v})^2}{\norm{\mathbf{v}}^2},
$$

which rearranges to $(\mathbf{u}\cdot\mathbf{v})^2 \le \norm{\mathbf{u}}^2\norm{\mathbf{v}}^2$; take square roots. Equality holds exactly when $\norm{\mathbf{u} - t_0\mathbf{v}} = 0$, that is $\mathbf{u} = t_0\mathbf{v}$. Conversely if $\mathbf{u} = c\mathbf{v}$ then $\abs{\mathbf{u}\cdot\mathbf{v}} = \abs{c}\norm{\mathbf{v}}^2 = \norm{\mathbf{u}}\norm{\mathbf{v}}$.
:::

::: corollary Triangle inequality {#cor-triangle}
For all $\mathbf{u}, \mathbf{v}$ in $\R^n$, $\norm{\mathbf{u} + \mathbf{v}} \le \norm{\mathbf{u}} + \norm{\mathbf{v}}$.
:::

::: proof
By [[#eq-expand]] and Cauchy–Schwarz,
$\norm{\mathbf{u}+\mathbf{v}}^2 = \norm{\mathbf{u}}^2 + 2\,\mathbf{u}\cdot\mathbf{v} + \norm{\mathbf{v}}^2 \le \norm{\mathbf{u}}^2 + 2\norm{\mathbf{u}}\norm{\mathbf{v}} + \norm{\mathbf{v}}^2 = \bigl(\norm{\mathbf{u}} + \norm{\mathbf{v}}\bigr)^2$. Both sides of the desired inequality are non-negative, so we may take square roots.
:::

Geometrically: one side of a triangle is never longer than the other two together. The triangle inequality is what makes $\norm{\mathbf{u} - \mathbf{v}}$ behave like a distance, the starting point of [[real-analysis/metric-spaces]].

::: quiz
For non-zero vectors $\mathbf{u}$ and $\mathbf{v}$ we are told that $\mathbf{u}\cdot\mathbf{v} < 0$. What can we say about the angle $\theta$ between them?
- [ ] $\theta$ is acute
- [ ] $\theta = \pi/2$
- [x] $\theta$ is obtuse: $\pi/2 < \theta \le \pi$
- [ ] Nothing — the sign of the dot product says nothing about the angle
::: solution
Since $\norm{\mathbf{u}}\norm{\mathbf{v}} > 0$, the sign of $\mathbf{u}\cdot\mathbf{v} = \norm{\mathbf{u}}\norm{\mathbf{v}}\cos\theta$ is the sign of $\cos\theta$. On $[0, \pi]$ the cosine is negative exactly on $(\pi/2, \pi]$. A positive dot product means an acute angle, zero means perpendicular.
:::
:::

### Projections

The dot product also measures how much of one vector points along another. Suppose a force $\mathbf{F}$ drags a box along a floor in the direction of a vector $\mathbf{u}$. Only the part of $\mathbf{F}$ along $\mathbf{u}$ moves the box; the rest presses it into the floor or lifts it.

::: definition Projection {#def-projection}
Let $\mathbf{u} \neq \mathbf{0}$. The **scalar projection** of $\mathbf{v}$ onto $\mathbf{u}$ and the **vector projection** of $\mathbf{v}$ onto $\mathbf{u}$ are

$$
\operatorname{comp}_{\mathbf{u}}\mathbf{v} = \frac{\mathbf{u}\cdot\mathbf{v}}{\norm{\mathbf{u}}}, \qquad \proj_{\mathbf{u}}\mathbf{v} = \frac{\mathbf{u}\cdot\mathbf{v}}{\mathbf{u}\cdot\mathbf{u}}\,\mathbf{u}.
$$
:::

By [[#thm-dot-geometric]], $\operatorname{comp}_{\mathbf{u}}\mathbf{v} = \norm{\mathbf{v}}\cos\theta$: the signed length of the shadow that $\mathbf{v}$ casts on the line of $\mathbf{u}$, negative when the angle is obtuse. Two facts make the projection the right notion of "component along $\mathbf{u}$".

::: proposition The projection is the closest multiple {#prop-projection}
Let $\mathbf{u} \ne \mathbf{0}$ and $\mathbf{p} = \proj_{\mathbf{u}}\mathbf{v}$. Then $\mathbf{v} - \mathbf{p}$ is orthogonal to $\mathbf{u}$, and $\mathbf{p}$ is the multiple of $\mathbf{u}$ closest to $\mathbf{v}$: $\norm{\mathbf{v} - t\mathbf{u}} \ge \norm{\mathbf{v} - \mathbf{p}}$ for every real $t$, with equality only when $t\mathbf{u} = \mathbf{p}$.
:::

::: proof
Write $\mathbf{p} = c\,\mathbf{u}$ with $c = \mathbf{u}\cdot\mathbf{v}/\mathbf{u}\cdot\mathbf{u}$. Then $(\mathbf{v} - c\mathbf{u})\cdot\mathbf{u} = \mathbf{u}\cdot\mathbf{v} - c\,\mathbf{u}\cdot\mathbf{u} = 0$. For any $t$, the vectors $\mathbf{v} - \mathbf{p}$ and $\mathbf{p} - t\mathbf{u} = (c - t)\mathbf{u}$ are therefore orthogonal, and expanding as in [[#eq-expand]] the cross term vanishes (Pythagoras):

$$
\norm{\mathbf{v} - t\mathbf{u}}^2 = \norm{(\mathbf{v} - \mathbf{p}) + (\mathbf{p} - t\mathbf{u})}^2 = \norm{\mathbf{v} - \mathbf{p}}^2 + (c-t)^2\norm{\mathbf{u}}^2 \ge \norm{\mathbf{v}-\mathbf{p}}^2,
$$

with equality only when $t = c$.
:::

The same "drop a perpendicular, then use Pythagoras" argument will give the distance from a point to a plane below, and in [[linear-algebra/least-squares]] it becomes the method of least squares.

::: widget projection
u: 3, 1
v: 1, 2
mode: projection
caption: Drag the tips of $\mathbf{u}$ and $\mathbf{v}$. The projection of $\mathbf{v}$ onto the line of $\mathbf{u}$ and the orthogonal remainder $\mathbf{v} - \proj_{\mathbf{u}}\mathbf{v}$ always meet at a right angle. Make the angle obtuse and watch the projection flip to point against $\mathbf{u}$ — the scalar projection has become negative. Lengthening $\mathbf{u}$ does not change the projection at all.
:::

::: example Splitting a vector into parallel and perpendicular parts {#ex-projection}
Write $\mathbf{v} = (2, 3, 1)$ as the sum of a vector parallel to $\mathbf{u} = (1,1,1)$ and a vector orthogonal to $\mathbf{u}$.
::: solution
We have $\mathbf{u}\cdot\mathbf{v} = 2 + 3 + 1 = 6$ and $\mathbf{u}\cdot\mathbf{u} = 3$, so

$$
\proj_{\mathbf{u}}\mathbf{v} = \frac{6}{3}(1,1,1) = (2,2,2), \qquad \mathbf{v} - \proj_{\mathbf{u}}\mathbf{v} = (0, 1, -1).
$$

Check: $(0,1,-1)\cdot(1,1,1) = 0$. So $\mathbf{v} = (2,2,2) + (0,1,-1)$, and the decomposition is unique: if $\mathbf{v} = a\mathbf{u} + \mathbf{w}$ with $\mathbf{w}\cdot\mathbf{u} = 0$, dotting with $\mathbf{u}$ forces $a = \mathbf{u}\cdot\mathbf{v}/\mathbf{u}\cdot\mathbf{u}$.
:::
:::

::: application Work done by a force
A constant force $\mathbf{F}$ moving an object through a displacement $\mathbf{D}$ does **work** $W = \mathbf{F}\cdot\mathbf{D} = \norm{\mathbf{F}}\norm{\mathbf{D}}\cos\theta$: the component of the force along the motion times the distance moved. A force perpendicular to the motion, such as the tension in the string of a whirling stone, does no work. When the force varies along a curved path, adding up $\mathbf{F}\cdot\Delta\mathbf{r}$ over small steps leads to the line integrals of [[multivariable/line-integrals]].
:::

::: warning The dot product is a number
$\mathbf{u}\cdot\mathbf{v}$ is a scalar, not a vector, so an expression such as $\mathbf{u}\cdot\mathbf{v}\cdot\mathbf{w}$ is meaningless — $(\mathbf{u}\cdot\mathbf{v})\mathbf{w}$ is a vector parallel to $\mathbf{w}$, while $\mathbf{u}(\mathbf{v}\cdot\mathbf{w})$ is parallel to $\mathbf{u}$. Nor can you cancel: $\mathbf{u}\cdot\mathbf{v} = \mathbf{u}\cdot\mathbf{w}$ only says that $\mathbf{v} - \mathbf{w}$ is orthogonal to $\mathbf{u}$. For example $\mathbf{i}\cdot\mathbf{j} = \mathbf{i}\cdot\mathbf{k} = 0$ although $\mathbf{j} \neq \mathbf{k}$.
:::

## The cross product

Many problems in space need a vector perpendicular to two given ones: the normal to a plane, the axis of a rotation, the direction of a torque. The dot product tests perpendicularity; the cross product manufactures it.

::: definition Cross product {#def-cross}
The **cross product** (or **vector product**) of $\mathbf{u} = (u_1,u_2,u_3)$ and $\mathbf{v} = (v_1,v_2,v_3)$ is the vector

$$
\mathbf{u}\times\mathbf{v} = (u_2v_3 - u_3v_2,\; u_3v_1 - u_1v_3,\; u_1v_2 - u_2v_1) = \begin{vmatrix} \mathbf{i} & \mathbf{j} & \mathbf{k} \\ u_1 & u_2 & u_3 \\ v_1 & v_2 & v_3 \end{vmatrix},
$$

where the determinant is a mnemonic: expand it along the first row as in [[linear-algebra/determinants]].
:::

For example, $(1, 3, -1)\times(-1, 1, 3) = (3\cdot 3 - (-1)\cdot 1,\; (-1)(-1) - 1\cdot 3,\; 1\cdot 1 - 3\cdot(-1)) = (10, -2, 4)$, and you can check that $(10,-2,4)$ has zero dot product with both factors.

::: theorem Algebraic properties of the cross product {#thm-cross-props}
For all $\mathbf{u}, \mathbf{v}, \mathbf{w} \in \R^3$ and $c \in \R$:

1. $\mathbf{v}\times\mathbf{u} = -(\mathbf{u}\times\mathbf{v})$, and in particular $\mathbf{u}\times\mathbf{u} = \mathbf{0}$;
2. $(c\mathbf{u})\times\mathbf{v} = c(\mathbf{u}\times\mathbf{v}) = \mathbf{u}\times(c\mathbf{v})$ and $\mathbf{u}\times(\mathbf{v} + \mathbf{w}) = \mathbf{u}\times\mathbf{v} + \mathbf{u}\times\mathbf{w}$;
3. $\mathbf{u}\cdot(\mathbf{u}\times\mathbf{v}) = 0$ and $\mathbf{v}\cdot(\mathbf{u}\times\mathbf{v}) = 0$;
4. $\mathbf{i}\times\mathbf{j} = \mathbf{k}$, $\mathbf{j}\times\mathbf{k} = \mathbf{i}$, $\mathbf{k}\times\mathbf{i} = \mathbf{j}$.
:::

::: proof
Each component of $\mathbf{u}\times\mathbf{v}$ has the form $u_av_b - u_bv_a$. Swapping $\mathbf{u}$ and $\mathbf{v}$ changes the sign of each, which is (1); with $\mathbf{v} = \mathbf{u}$ we get $\mathbf{u}\times\mathbf{u} = -\mathbf{u}\times\mathbf{u}$, so it is $\mathbf{0}$. Each component is linear in $\mathbf{u}$ for fixed $\mathbf{v}$ and vice versa, which is (2). For (3),

$$
\mathbf{u}\cdot(\mathbf{u}\times\mathbf{v}) = u_1(u_2v_3 - u_3v_2) + u_2(u_3v_1 - u_1v_3) + u_3(u_1v_2 - u_2v_1) = 0,
$$

since the six terms cancel in pairs ($u_1u_2v_3$ against $-u_2u_1v_3$, and so on); the second identity follows from the first and (1). Finally (4) is substitution: $(1,0,0)\times(0,1,0) = (0\cdot 0 - 0\cdot 1,\; 0\cdot 0 - 1\cdot 0,\; 1\cdot 1 - 0\cdot 0) = (0,0,1)$, and similarly for the others.
:::

Property (3) is the point of the definition: $\mathbf{u}\times\mathbf{v}$ is orthogonal to both $\mathbf{u}$ and $\mathbf{v}$. Its length has a beautiful interpretation.

### The length of the cross product

::: theorem Lagrange's identity and the area of a parallelogram {#thm-cross-length}
For all $\mathbf{u}, \mathbf{v} \in \R^3$,

$$
\norm{\mathbf{u}\times\mathbf{v}}^2 = \norm{\mathbf{u}}^2\norm{\mathbf{v}}^2 - (\mathbf{u}\cdot\mathbf{v})^2 .
$$

Consequently, if $\theta$ is the angle between non-zero $\mathbf{u}$ and $\mathbf{v}$, then $\norm{\mathbf{u}\times\mathbf{v}} = \norm{\mathbf{u}}\norm{\mathbf{v}}\sin\theta$, which is the area of the parallelogram with sides $\mathbf{u}$ and $\mathbf{v}$. In particular $\mathbf{u}\times\mathbf{v} = \mathbf{0}$ if and only if $\mathbf{u}$ and $\mathbf{v}$ are parallel (one is a multiple of the other).
:::

::: proof
Expand the right-hand side, writing sums over $i, j \in \set{1,2,3}$:

$$
\Bigl(\sum_i u_i^2\Bigr)\Bigl(\sum_j v_j^2\Bigr) - \Bigl(\sum_i u_iv_i\Bigr)^2 = \sum_{i\ne j} u_i^2v_j^2 - 2\sum_{i<j} u_iv_iu_jv_j = \sum_{i<j}\bigl(u_iv_j - u_jv_i\bigr)^2 ,
$$

because the terms with $i = j$ cancel between the two products, and each unordered pair $i < j$ contributes $u_i^2v_j^2 + u_j^2v_i^2 - 2u_iv_ju_jv_i$. The three squares $(u_1v_2 - u_2v_1)^2$, $(u_1v_3 - u_3v_1)^2$, $(u_2v_3 - u_3v_2)^2$ are exactly the squares of the components of $\mathbf{u}\times\mathbf{v}$, which proves the identity.

Using [[#thm-dot-geometric]], the right-hand side equals $\norm{\mathbf{u}}^2\norm{\mathbf{v}}^2(1 - \cos^2\theta) = \norm{\mathbf{u}}^2\norm{\mathbf{v}}^2\sin^2\theta$, and $\sin\theta \ge 0$ for $\theta\in[0,\pi]$. A parallelogram with sides $\norm{\mathbf{u}}$ and $\norm{\mathbf{v}}$ meeting at angle $\theta$ has base $\norm{\mathbf{u}}$ and height $\norm{\mathbf{v}}\sin\theta$. Finally, the identity shows that $\mathbf{u}\times\mathbf{v} = \mathbf{0}$ exactly when equality holds in Cauchy–Schwarz, that is (by [[#thm-cauchy-schwarz]]) when one vector is a multiple of the other.
:::

So the cross product is a vector perpendicular to $\mathbf{u}$ and $\mathbf{v}$ whose length is the area they span. That pins it down up to sign; the sign is fixed by the **right-hand rule**: curl the fingers of your right hand from $\mathbf{u}$ towards $\mathbf{v}$ and your thumb points along $\mathbf{u}\times\mathbf{v}$ — just as $\mathbf{i}\times\mathbf{j} = \mathbf{k}$. (A precise version is in the remark after [[#thm-triple-product]].)

::: intuition The cross product is an oriented area
Think of $\mathbf{u}\times\mathbf{v}$ as the parallelogram spanned by $\mathbf{u}$ and $\mathbf{v}$, recorded as a single arrow: its length is the area, its direction is the normal, and the choice between the two normals records the order in which the sides were traversed. This is why cross products appear whenever we need areas in space — most importantly the area element $\norm{\mathbf{r}_u\times\mathbf{r}_v}\,du\,dv$ of a parametrised surface in [[multivariable/surface-integrals]].
:::

::: example Area of a triangle in space {#ex-triangle}
Find the area of the triangle with vertices $P = (1,0,1)$, $Q = (2,3,0)$ and $R = (0,1,4)$.
::: solution
The triangle is half of the parallelogram spanned by $\overrightarrow{PQ} = (1,3,-1)$ and $\overrightarrow{PR} = (-1,1,3)$. We computed above that

$$
\overrightarrow{PQ}\times\overrightarrow{PR} = (10, -2, 4), \qquad \norm{(10,-2,4)} = \sqrt{100 + 4 + 16} = \sqrt{120} = 2\sqrt{30}.
$$

So the area is $\tfrac12\cdot 2\sqrt{30} = \sqrt{30} \approx 5.48$. We will reuse the normal vector $(10,-2,4)$ in [[#ex-plane]].
:::
:::

::: warning The cross product is not commutative or associative
Order matters: $\mathbf{v}\times\mathbf{u} = -\mathbf{u}\times\mathbf{v}$. Brackets matter too: $\mathbf{i}\times(\mathbf{i}\times\mathbf{j}) = \mathbf{i}\times\mathbf{k} = -\mathbf{j}$, but $(\mathbf{i}\times\mathbf{i})\times\mathbf{j} = \mathbf{0}\times\mathbf{j} = \mathbf{0}$. So $\mathbf{u}\times\mathbf{v}\times\mathbf{w}$ without brackets has no meaning. And the cross product is special to three dimensions: apart from a curious exception in $\R^7$, no $\R^n$ with $n \ge 2$ other than $\R^3$ carries a bilinear product with the orthogonality property of [[#thm-cross-props]] and the length property of [[#thm-cross-length]].
:::

::: application Torque and angular momentum
If a force $\mathbf{F}$ acts at a point with position $\mathbf{r}$ relative to a pivot, its **torque** about the pivot is $\boldsymbol{\tau} = \mathbf{r}\times\mathbf{F}$. Its length $\norm{\mathbf{r}}\norm{\mathbf{F}}\sin\theta$ explains why a spanner is most effective when pushed at right angles and far from the nut, and its direction is the axis about which the force tends to turn the body. Similarly the angular momentum of a particle of mass $m$ and velocity $\mathbf{v}$ is $\mathbf{L} = m\,\mathbf{r}\times\mathbf{v}$; its conservation under central forces underlies Kepler's second law ([[multivariable/vector-functions]]).
:::

### The scalar triple product

Combining the two products gives a number attached to three vectors.

::: theorem Scalar triple product {#thm-triple-product}
For $\mathbf{u}, \mathbf{v}, \mathbf{w} \in \R^3$,

$$
\mathbf{u}\cdot(\mathbf{v}\times\mathbf{w}) = \begin{vmatrix} u_1 & u_2 & u_3 \\ v_1 & v_2 & v_3 \\ w_1 & w_2 & w_3 \end{vmatrix},
$$

and $\abs{\mathbf{u}\cdot(\mathbf{v}\times\mathbf{w})}$ is the volume of the parallelepiped with edges $\mathbf{u}, \mathbf{v}, \mathbf{w}$. In particular $\mathbf{u}, \mathbf{v}, \mathbf{w}$ lie in a common plane through the origin if and only if $\mathbf{u}\cdot(\mathbf{v}\times\mathbf{w}) = 0$.
:::

::: proof
Expanding the determinant along its first row gives

$$
u_1(v_2w_3 - v_3w_2) - u_2(v_1w_3 - v_3w_1) + u_3(v_1w_2 - v_2w_1),
$$

and the three brackets are, in order, the components $(v_2w_3 - v_3w_2)$, $(v_3w_1 - v_1w_3)$, $(v_1w_2 - v_2w_1)$ of $\mathbf{v}\times\mathbf{w}$ (the middle sign absorbs the reversed order). This is $\mathbf{u}\cdot(\mathbf{v}\times\mathbf{w})$.

For the volume, regard the parallelogram spanned by $\mathbf{v}$ and $\mathbf{w}$ as the base. If $\mathbf{v}\times\mathbf{w} = \mathbf{0}$ the base has zero area, the solid is flat, and both sides are $0$. Otherwise the base has area $\norm{\mathbf{v}\times\mathbf{w}}$ by [[#thm-cross-length]], and $\mathbf{n} = \mathbf{v}\times\mathbf{w}$ is normal to it. The height of the parallelepiped is the length of the component of $\mathbf{u}$ along $\mathbf{n}$, namely $\abs{\operatorname{comp}_{\mathbf{n}}\mathbf{u}} = \abs{\mathbf{u}\cdot\mathbf{n}}/\norm{\mathbf{n}}$. Hence

$$
\text{volume} = \text{base}\times\text{height} = \norm{\mathbf{n}}\cdot\frac{\abs{\mathbf{u}\cdot\mathbf{n}}}{\norm{\mathbf{n}}} = \abs{\mathbf{u}\cdot(\mathbf{v}\times\mathbf{w})}.
$$

The three vectors lie in a plane through the origin exactly when the parallelepiped is flat, i.e. has volume zero.
:::

Since swapping two rows of a determinant changes its sign, the triple product is unchanged by cyclic permutations: $\mathbf{u}\cdot(\mathbf{v}\times\mathbf{w}) = \mathbf{v}\cdot(\mathbf{w}\times\mathbf{u}) = \mathbf{w}\cdot(\mathbf{u}\times\mathbf{v})$.

::: remark Orientation and the right-hand rule
The sign of $\det[\mathbf{u}, \mathbf{v}, \mathbf{w}]$ records whether $(\mathbf{u}, \mathbf{v}, \mathbf{w})$ is a right-handed triple (positive, like $(\mathbf{i}, \mathbf{j}, \mathbf{k})$, whose determinant is $1$) or a left-handed one (negative). For non-parallel $\mathbf{u}, \mathbf{v}$ the cyclic symmetry gives $\det[\mathbf{u}, \mathbf{v}, \mathbf{u}\times\mathbf{v}] = (\mathbf{u}\times\mathbf{v})\cdot(\mathbf{u}\times\mathbf{v}) > 0$, so $(\mathbf{u}, \mathbf{v}, \mathbf{u}\times\mathbf{v})$ is always right-handed. This is the precise content of the right-hand rule, and it is why the cross product changes sign if we switch to a left-handed coordinate system.
:::

::: example Four points in a plane {#ex-coplanar}
Do the points $A = (1,0,0)$, $B = (0,1,0)$, $C = (0,0,1)$ and $D = (1,1,-1)$ lie in a common plane?
::: solution
They are coplanar exactly when the three edge vectors from $A$ are, i.e. when the parallelepiped they span is flat. With $\overrightarrow{AB} = (-1,1,0)$, $\overrightarrow{AC} = (-1,0,1)$, $\overrightarrow{AD} = (0,1,-1)$,

$$
\begin{vmatrix} -1 & 1 & 0 \\ -1 & 0 & 1 \\ 0 & 1 & -1 \end{vmatrix} = -1\,(0 - 1) - 1\,(1 - 0) + 0 = 1 - 1 = 0 .
$$

So the four points are coplanar. Indeed all four satisfy $x + y + z = 1$.
:::
:::

::: quiz
Which of these statements hold for **all** vectors $\mathbf{u}, \mathbf{v}, \mathbf{w}$ in $\R^3$? (Select all that apply.)
- [ ] $\mathbf{u}\times\mathbf{v} = \mathbf{v}\times\mathbf{u}$
- [x] $\mathbf{u}\cdot(\mathbf{u}\times\mathbf{v}) = 0$
- [ ] $\mathbf{u}\times(\mathbf{v}\times\mathbf{w}) = (\mathbf{u}\times\mathbf{v})\times\mathbf{w}$
- [x] $\norm{\mathbf{u}\times\mathbf{v}} \le \norm{\mathbf{u}}\,\norm{\mathbf{v}}$
- [x] $\mathbf{u}\cdot(\mathbf{v}\times\mathbf{w}) = \mathbf{w}\cdot(\mathbf{u}\times\mathbf{v})$
::: solution
The cross product is anticommutative, so the first fails whenever $\mathbf{u}\times\mathbf{v} \ne \mathbf{0}$, and it is not associative (see the warning above). The second is [[#thm-cross-props]](3). The fourth follows from $\norm{\mathbf{u}\times\mathbf{v}} = \norm{\mathbf{u}}\norm{\mathbf{v}}\sin\theta$ and $\sin\theta \le 1$. The last is the cyclic symmetry of the triple product.
:::
:::

## Lines and planes

A line is determined by a point on it and a direction. If $\mathbf{r}_0$ is the position vector of a point $P_0$ on the line and $\mathbf{v} \neq \mathbf{0}$ is parallel to it, then the points of the line are exactly those with position vectors

$$
\mathbf{r}(t) = \mathbf{r}_0 + t\,\mathbf{v}, \qquad t\in\R .
$$ {#eq-line}

In components, with $\mathbf{r}_0 = (x_0, y_0, z_0)$ and $\mathbf{v} = (a, b, c)$, these are the **parametric equations** $x = x_0 + at$, $y = y_0 + bt$, $z = z_0 + ct$. If $a, b, c$ are all non-zero we may eliminate $t$ to get the **symmetric equations**

$$
\frac{x - x_0}{a} = \frac{y - y_0}{b} = \frac{z - z_0}{c}.
$$

Think of $t$ as time: [[#eq-line]] describes a particle passing through $P_0$ at $t = 0$ with constant velocity $\mathbf{v}$. In the plane two distinct lines are either parallel or meet; in space there is a third possibility. Two lines that are not parallel and do not meet are called **skew**.

A plane is determined by a point $P_0$ on it and a **normal vector** $\mathbf{n} \ne \mathbf{0}$ perpendicular to it. A point $P$ with position vector $\mathbf{r}$ lies in the plane exactly when $\overrightarrow{P_0P} = \mathbf{r} - \mathbf{r}_0$ is orthogonal to $\mathbf{n}$:

$$
\mathbf{n}\cdot(\mathbf{r} - \mathbf{r}_0) = 0, \qquad\text{or in components}\qquad ax + by + cz = d,
$$ {#eq-plane}

where $\mathbf{n} = (a, b, c)$ and $d = \mathbf{n}\cdot\mathbf{r}_0 = ax_0 + by_0 + cz_0$. Conversely, every equation $ax + by + cz = d$ with $(a,b,c) \ne \mathbf{0}$ describes a plane with normal $(a, b, c)$: pick any solution $\mathbf{r}_0$ (for instance $(d/a, 0, 0)$ if $a \ne 0$); then $ax + by + cz = d$ is equivalent to $\mathbf{n}\cdot\mathbf{r} = \mathbf{n}\cdot\mathbf{r}_0$, which is [[#eq-plane]]. So **the coefficients of a linear equation are a normal vector**, a fact used constantly.

The angle between two planes is defined to be the angle between their normals (or its supplement), two planes are parallel exactly when their normals are, and two non-parallel planes meet in a line whose direction is perpendicular to both normals, namely $\mathbf{n}_1\times\mathbf{n}_2$.

::: example The plane through three points {#ex-plane}
Find an equation of the plane through $P = (1,0,1)$, $Q = (2,3,0)$ and $R = (0,1,4)$.
::: solution
The vectors $\overrightarrow{PQ}$ and $\overrightarrow{PR}$ lie in the plane, so their cross product $(10,-2,4)$ from [[#ex-triangle]] is a normal vector, as is $\mathbf{n} = (5, -1, 2)$. Using the point $P$:

$$
5(x - 1) - (y - 0) + 2(z - 1) = 0, \qquad\text{i.e.}\qquad 5x - y + 2z = 7.
$$

Check with the other two points: $5\cdot2 - 3 + 0 = 7$ and $0 - 1 + 8 = 7$. (If the three points had been collinear, the cross product would have been $\mathbf{0}$ and they would not determine a plane.)
:::
:::

::: quiz
How are the planes $2x - y + 3z = 1$ and $-4x + 2y - 6z = 5$ related?
- [ ] They are the same plane
- [x] They are parallel and distinct
- [ ] They are perpendicular
- [ ] They meet in a line
::: solution
The normals $(2,-1,3)$ and $(-4,2,-6) = -2\,(2,-1,3)$ are parallel, so the planes are parallel. Dividing the second equation by $-2$ gives $2x - y + 3z = -\tfrac52$, which has a different right-hand side from the first, so no point lies on both.
:::
:::

### Distances

To find the distance from a point to a plane we drop a perpendicular, exactly as in [[#prop-projection]].

::: theorem Distance from a point to a plane {#thm-point-plane}
The distance from the point $P_1$ with position vector $\mathbf{r}_1 = (x_1, y_1, z_1)$ to the plane $\Pi\colon ax + by + cz = d$ is

$$
D = \frac{\abs{ax_1 + by_1 + cz_1 - d}}{\sqrt{a^2 + b^2 + c^2}} ,
$$

and the closest point of $\Pi$ to $P_1$ is the foot of the perpendicular, $\mathbf{q} = \mathbf{r}_1 - \lambda\mathbf{n}$ where $\mathbf{n} = (a,b,c)$ and $\lambda = (\mathbf{n}\cdot\mathbf{r}_1 - d)/\norm{\mathbf{n}}^2$.
:::

::: proof
First, $\mathbf{q}$ lies on $\Pi$: $\mathbf{n}\cdot\mathbf{q} = \mathbf{n}\cdot\mathbf{r}_1 - \lambda\norm{\mathbf{n}}^2 = d$. Now let $\mathbf{r}$ be any point of $\Pi$. Then $\mathbf{n}\cdot(\mathbf{q} - \mathbf{r}) = d - d = 0$, so $\mathbf{r}_1 - \mathbf{q} = \lambda\mathbf{n}$ is orthogonal to $\mathbf{q} - \mathbf{r}$, and by Pythagoras

$$
\norm{\mathbf{r}_1 - \mathbf{r}}^2 = \norm{(\mathbf{r}_1 - \mathbf{q}) + (\mathbf{q} - \mathbf{r})}^2 = \lambda^2\norm{\mathbf{n}}^2 + \norm{\mathbf{q} - \mathbf{r}}^2 \ge \lambda^2\norm{\mathbf{n}}^2,
$$

with equality only when $\mathbf{r} = \mathbf{q}$. So the least distance is $\abs{\lambda}\norm{\mathbf{n}} = \abs{\mathbf{n}\cdot\mathbf{r}_1 - d}/\norm{\mathbf{n}}$, which is the stated formula.
:::

For the plane $5x - y + 2z = 7$ of [[#ex-plane]], the distance from the origin is $\abs{0 - 7}/\sqrt{30} = 7/\sqrt{30} \approx 1.28$. The expression inside the absolute value also carries information through its sign: points with $ax+by+cz > d$ lie on the side of the plane into which $\mathbf{n}$ points.

::: example The distance between two skew lines {#ex-skew}
Show that the lines $L_1\colon \mathbf{r} = t(1,1,0)$ and $L_2\colon \mathbf{r} = (1,0,1) + s(0,1,1)$ are skew, and find the distance between them.
::: solution
The directions $\mathbf{v}_1 = (1,1,0)$ and $\mathbf{v}_2 = (0,1,1)$ are not parallel. Their cross product

$$
\mathbf{n} = \mathbf{v}_1\times\mathbf{v}_2 = (1\cdot1 - 0\cdot1,\; 0\cdot0 - 1\cdot1,\; 1\cdot1 - 1\cdot0) = (1, -1, 1)
$$

is perpendicular to both lines. The plane through $L_1$ with normal $\mathbf{n}$ is $x - y + z = 0$, and the plane through $L_2$ with normal $\mathbf{n}$ is $x - y + z = 2$ (substitute the point $(1,0,1)$). These parallel planes contain the two lines, so the distance between the lines is the distance between the planes — by [[#thm-point-plane]], the distance from $(1,0,1)$ to $x - y + z = 0$:

$$
D = \frac{\abs{1 - 0 + 1}}{\sqrt{3}} = \frac{2}{\sqrt3} \approx 1.155 .
$$

Since $D > 0$ the lines do not meet, and they are not parallel, so they are skew. In general, the distance between lines through $P_1, P_2$ with directions $\mathbf{v}_1, \mathbf{v}_2$ is $\abs{\overrightarrow{P_1P_2}\cdot(\mathbf{v}_1\times\mathbf{v}_2)}/\norm{\mathbf{v}_1\times\mathbf{v}_2}$. Minimising the squared distance between $t(1,1,0)$ and $(1,0,1) + s(0,1,1)$ with respect to $t$ and $s$ confirms this: the closest points are $(\tfrac13, \tfrac13, 0)$ and $(1, -\tfrac13, \tfrac23)$, which differ by $\tfrac23(1,-1,1)$, of length $\tfrac{2}{\sqrt3}$ and parallel to $\mathbf{n}$, as it must be.
:::
:::

::: warning A normal vector is not a direction in the plane
The coefficient vector $(a,b,c)$ of $ax+by+cz=d$ is perpendicular to the plane, not along it. So a line with direction $\mathbf{v}$ is *parallel* to the plane when $\mathbf{v}\cdot\mathbf{n} = 0$ and *perpendicular* to it when $\mathbf{v}$ is a multiple of $\mathbf{n}$ — the reverse of what students often first write. Likewise, the direction of the line where two planes meet is $\mathbf{n}_1\times\mathbf{n}_2$, not $\mathbf{n}_1$ or $\mathbf{n}_2$.
:::

::: application Lighting in computer graphics
Rendering software represents a surface by many small triangles. For each triangle with vertices $P, Q, R$ it computes a normal $\overrightarrow{PQ}\times\overrightarrow{PR}$ (the order of the vertices fixes which side is the "outside"), and the brightness under a light coming from the unit direction $\boldsymbol{\ell}$ is taken proportional to $\max(0, \mathbf{n}\cdot\boldsymbol{\ell})$ for the unit normal $\mathbf{n}$ — Lambert's cosine law. Faces whose normals point away from the camera, detected by the sign of a dot product, are not drawn at all. Every frame of a 3D game evaluates millions of the products in this chapter.
:::

## Quadric surfaces

A linear equation in $x, y, z$ describes a plane. The next simplest surfaces are given by equations of the second degree; they are called **quadric surfaces**, and they will be our test cases for tangent planes, extrema, curvature and surface integrals. By translating and rotating the axes, every non-degenerate quadric can be brought to one of a few standard forms (the rotation diagonalises a symmetric matrix, see [[linear-algebra/spectral-theorem]]). With $a, b, c > 0$:

| surface | standard equation | traces (cross-sections) |
|---|---|---|
| ellipsoid | $\dfrac{x^2}{a^2} + \dfrac{y^2}{b^2} + \dfrac{z^2}{c^2} = 1$ | ellipses in all three directions |
| elliptic paraboloid | $z = \dfrac{x^2}{a^2} + \dfrac{y^2}{b^2}$ | ellipses for $z = k > 0$; parabolas for $x = k$ or $y = k$ |
| hyperbolic paraboloid | $z = \dfrac{x^2}{a^2} - \dfrac{y^2}{b^2}$ | hyperbolas for $z = k \ne 0$; parabolas for $x = k$ or $y = k$ |
| cone | $z^2 = \dfrac{x^2}{a^2} + \dfrac{y^2}{b^2}$ | ellipses for $z = k \ne 0$; hyperbolas or line pairs for $x = k$, $y = k$ |
| hyperboloid of one sheet | $\dfrac{x^2}{a^2} + \dfrac{y^2}{b^2} - \dfrac{z^2}{c^2} = 1$ | ellipses for $z = k$; hyperbolas (line pairs when $\abs{k} = a$ or $b$) for $x = k$, $y = k$ |
| hyperboloid of two sheets | $-\dfrac{x^2}{a^2} - \dfrac{y^2}{b^2} + \dfrac{z^2}{c^2} = 1$ | ellipses for $z = k$ with $\abs{k} > c$; hyperbolas for $x = k$, $y = k$ |

The method for recognising a quadric is to look at its **traces**: the curves in which it meets planes parallel to the coordinate planes. Each trace is a conic in two variables, which you already know how to recognise. For the hyperbolic paraboloid $z = x^2 - y^2$, the trace in the plane $y = k$ is the upward parabola $z = x^2 - k^2$, the trace in $x = k$ is the downward parabola $z = k^2 - y^2$, and the trace at height $z = k$ is the hyperbola $x^2 - y^2 = k$ (opening along the $x$-axis if $k > 0$, along the $y$-axis if $k < 0$, and the pair of lines $y = \pm x$ if $k = 0$). The result is the saddle in the figure.

::: widget surface
f: x^2 - y^2
x: -2, 2
y: -2, 2
contours: true
caption: The hyperbolic paraboloid $z = x^2 - y^2$. Rotate it: along the $x$-direction it curves up, along the $y$-direction it curves down, and the contour lines (the traces $z = k$) are hyperbolas, crossing in the pair of lines $y = \pm x$ at height $0$. This saddle reappears as the standard example of a saddle point in [[multivariable/extrema]].
:::

::: example Identifying a quadric {#ex-quadric}
Identify the surface $x^2 + 2z^2 - 6x - y + 10 = 0$.
::: solution
Only $x$ and $z$ appear squared, so complete the square in $x$: $x^2 - 6x = (x - 3)^2 - 9$. The equation becomes

$$
(x - 3)^2 + 2z^2 = y - 1 .
$$

This is an elliptic paraboloid. Its vertex is at $(3, 1, 0)$ and it opens in the direction of increasing $y$: the traces $y = k$ are the ellipses $(x-3)^2 + 2z^2 = k - 1$ for $k > 1$ (empty for $k < 1$), and the traces $z = 0$ and $x = 3$ are the parabolas $y = 1 + (x-3)^2$ and $y = 1 + 2z^2$. Compared with the standard form, the roles of $y$ and $z$ have been exchanged and the vertex moved from the origin.
:::
:::

The hyperboloids and the cone belong to a single family. For a constant $k$, the surface $x^2 + y^2 - z^2 = k$ is a hyperboloid of one sheet when $k > 0$, a cone when $k = 0$ and a hyperboloid of two sheets when $k < 0$. Each horizontal trace is the circle $x^2 + y^2 = k + z^2$, so the surface is swept out by circles of radius $\sqrt{k + z^2}$, which is exactly how the next figure draws it.

::: widget surface
fx: sqrt(max(k + v^2, 0))*cos(u)
fy: sqrt(max(k + v^2, 0))*sin(u)
fz: v
u: 0, 2pi
v: -2, 2
sliders: k=1:-1:1:0.05
caption: The surfaces $x^2 + y^2 - z^2 = k$, drawn as circles of radius $\sqrt{k + z^2}$ at each height $z$. Move $k$ from $1$ down to $-1$: the waist of the hyperboloid of one sheet narrows, pinches to the vertex of a cone at $k = 0$, and then the surface tears into the two sheets of a hyperboloid of two sheets (the figure joins them by a segment of the axis where no real circle exists).
:::

::: application Straight lines on curved surfaces
The hyperboloid of one sheet $x^2 + y^2 - z^2 = 1$ contains infinitely many straight lines: for each angle $t$, every point $(\cos t - s\sin t,\; \sin t + s\cos t,\; s)$, $s \in \R$, satisfies the equation, since $(\cos t - s\sin t)^2 + (\sin t + s\cos t)^2 - s^2 = 1$. The hyperbolic paraboloid is also covered by lines, because $x^2 - y^2 = (x-y)(x+y)$. Such **ruled surfaces** can be built from straight beams, which is why the cooling towers of power stations and many lattice towers are hyperboloids: the shape is curved and strong, but every structural member is straight.
:::

::: history
Coordinates in space are as old as analytic geometry: after Descartes and Fermat introduced coordinate methods in the plane in the 1630s, eighteenth-century mathematicians such as Clairaut and Euler studied curves and surfaces in space through equations in $x$, $y$ and $z$. Vectors as objects of algebra came a century later. In 1843 William Rowan Hamilton discovered the quaternions, numbers of the form $a + b\,i + c\,j + d\,k$, and called the part $b\,i + c\,j + d\,k$ a *vector*; the quaternion product of two vectors has scalar part $-\mathbf{u}\cdot\mathbf{v}$ and vector part $\mathbf{u}\times\mathbf{v}$. In 1844 Hermann Grassmann published his *Ausdehnungslehre*, a theory of vectors and their products in any number of dimensions that was far ahead of its time and little read. In the 1880s Josiah Willard Gibbs at Yale and Oliver Heaviside in England, both working on Maxwell's electromagnetic theory, split Hamilton's product into the separate dot and cross products and created the vector algebra of this chapter. Gibbs's lectures reached a wide audience through the textbook *Vector Analysis* (1901) by his student Edwin Bidwell Wilson.
:::

## Where this leads

Vectors are the language of the rest of this course. Letting the point $\mathbf{r}_0 + t\mathbf{v}$ move along a curved rather than a straight path gives the vector functions of [[multivariable/vector-functions]], where the dot and cross products produce speed, curvature and the binormal. The normal vector of a plane generalises to the gradient, which is normal to level surfaces, and tangent planes to surfaces are written exactly as in [[#eq-plane]] ([[multivariable/gradient]]). The triple product's interpretation as a volume is the reason determinants appear in the change of variables formula ([[multivariable/change-of-variables]]), and the cross product's interpretation as an area gives the surface area element ([[multivariable/surface-integrals]]). In [[linear-algebra/inner-products]] the dot product is generalised to abstract inner products, and Cauchy–Schwarz holds there with the same proof.

::: summary
- Vectors in $\R^3$ are added and scaled componentwise; $\norm{\mathbf{v}} = \sqrt{v_1^2+v_2^2+v_3^2}$, and $\mathbf{v}/\norm{\mathbf{v}}$ is the unit vector in the direction of $\mathbf{v}$.
- The dot product $\mathbf{u}\cdot\mathbf{v} = \sum u_iv_i = \norm{\mathbf{u}}\norm{\mathbf{v}}\cos\theta$ measures angles; $\mathbf{u}\perp\mathbf{v}$ exactly when $\mathbf{u}\cdot\mathbf{v} = 0$ ([[#thm-dot-geometric]]).
- Cauchy–Schwarz $\abs{\mathbf{u}\cdot\mathbf{v}} \le \norm{\mathbf{u}}\norm{\mathbf{v}}$ holds in every $\R^n$ and implies the triangle inequality ([[#thm-cauchy-schwarz]]).
- $\proj_{\mathbf{u}}\mathbf{v} = \frac{\mathbf{u}\cdot\mathbf{v}}{\mathbf{u}\cdot\mathbf{u}}\mathbf{u}$ is the closest multiple of $\mathbf{u}$ to $\mathbf{v}$, and $\mathbf{v} - \proj_{\mathbf{u}}\mathbf{v}\perp\mathbf{u}$.
- $\mathbf{u}\times\mathbf{v}$ is orthogonal to $\mathbf{u}$ and $\mathbf{v}$, follows the right-hand rule and has length $\norm{\mathbf{u}}\norm{\mathbf{v}}\sin\theta$, the area of the parallelogram they span ([[#thm-cross-length]]). It is anticommutative and not associative.
- $\mathbf{u}\cdot(\mathbf{v}\times\mathbf{w}) = \det[\mathbf{u};\mathbf{v};\mathbf{w}]$ is a signed volume; it vanishes exactly for coplanar vectors ([[#thm-triple-product]]).
- Lines: $\mathbf{r} = \mathbf{r}_0 + t\mathbf{v}$. Planes: $\mathbf{n}\cdot(\mathbf{r}-\mathbf{r}_0) = 0$, i.e. $ax + by + cz = d$ with normal $(a,b,c)$. Distance from a point to a plane: $\abs{ax_1+by_1+cz_1-d}/\norm{\mathbf{n}}$.
- Quadric surfaces are recognised from their traces; completing the square locates their centre or vertex.
:::

## Exercises

::: exercise An angle {level=1 check="pi/3"}
Find the angle between $\mathbf{u} = (1, 0, 1)$ and $\mathbf{v} = (0, 1, 1)$, in radians.
::: solution
$\mathbf{u}\cdot\mathbf{v} = 0 + 0 + 1 = 1$ and $\norm{\mathbf{u}} = \norm{\mathbf{v}} = \sqrt2$, so $\cos\theta = \dfrac{1}{\sqrt2\sqrt2} = \dfrac12$ and $\theta = \dfrac{\pi}{3}$.
:::
:::

::: exercise Area of a triangle {level=1 check="7/2"}
Find the area of the triangle with vertices $A = (1,0,0)$, $B = (0,2,0)$ and $C = (0,0,3)$.
::: solution
$\overrightarrow{AB} = (-1, 2, 0)$ and $\overrightarrow{AC} = (-1, 0, 3)$, so

$$
\overrightarrow{AB}\times\overrightarrow{AC} = (2\cdot 3 - 0\cdot 0,\; 0\cdot(-1) - (-1)\cdot 3,\; (-1)\cdot 0 - 2\cdot(-1)) = (6, 3, 2),
$$

of length $\sqrt{36 + 9 + 4} = 7$. The area is half the area of the parallelogram: $\tfrac72$.
:::
:::

::: exercise Distance to a plane {level=1 check="18/7"}
Find the distance from the point $(1, -2, 4)$ to the plane $3x + 2y + 6z = 5$.
::: solution
By [[#thm-point-plane]], $D = \dfrac{\abs{3\cdot1 + 2\cdot(-2) + 6\cdot4 - 5}}{\sqrt{9 + 4 + 36}} = \dfrac{\abs{18}}{7} = \dfrac{18}{7}$.
:::
:::

::: exercise A plane containing a line {level=2}
Find an equation of the plane that contains the point $(1,1,1)$ and the line $\mathbf{r}(t) = (2,0,1) + t(1,-1,2)$.
::: hint
You need two independent directions in the plane: the direction of the line, and the vector from a point of the line to $(1,1,1)$.
:::
::: solution
The plane contains $P = (1,1,1)$ and the point $Q = (2,0,1)$ of the line, so it contains the directions $\overrightarrow{PQ} = (1,-1,0)$ and $\mathbf{v} = (1,-1,2)$. A normal is

$$
\overrightarrow{PQ}\times\mathbf{v} = ((-1)\cdot 2 - 0\cdot(-1),\; 0\cdot 1 - 1\cdot 2,\; 1\cdot(-1) - (-1)\cdot 1) = (-2,-2,0),
$$

so we may take $\mathbf{n} = (1,1,0)$. Through $P$: $(x - 1) + (y - 1) = 0$, that is $x + y = 2$. Check: every point $(2+t, -t, 1+2t)$ of the line satisfies $(2 + t) + (-t) = 2$.
:::
:::

::: exercise Volume of a parallelepiped {level=2 check="1"}
Find the volume of the parallelepiped with edges $\mathbf{u} = (1,2,3)$, $\mathbf{v} = (0,1,4)$ and $\mathbf{w} = (5,6,0)$.
::: solution
By [[#thm-triple-product]] the volume is the absolute value of

$$
\begin{vmatrix} 1 & 2 & 3 \\ 0 & 1 & 4 \\ 5 & 6 & 0 \end{vmatrix} = 1\,(0 - 24) - 2\,(0 - 20) + 3\,(0 - 5) = -24 + 40 - 15 = 1,
$$

so the volume is $1$. (The determinant is positive, so the three vectors are not coplanar and $(\mathbf{u}, \mathbf{v}, \mathbf{w})$ is a right-handed triple.)
:::
:::

::: exercise Volume of a tetrahedron {level=2 check="13/6"}
A tetrahedron with one vertex at $O$ and edges $\mathbf{u}, \mathbf{v}, \mathbf{w}$ from $O$ is a pyramid whose base is half the parallelogram spanned by $\mathbf{v}$ and $\mathbf{w}$. Using "volume of a pyramid $= \tfrac13\times$ base $\times$ height", show that its volume is $\tfrac16\abs{\mathbf{u}\cdot(\mathbf{v}\times\mathbf{w})}$, and find the volume of the tetrahedron with vertices $(0,0,0)$, $(1,2,0)$, $(0,1,3)$ and $(2,0,1)$.
::: solution
The base triangle has area $\tfrac12\norm{\mathbf{v}\times\mathbf{w}}$ and, as in the proof of [[#thm-triple-product]], the height is $\abs{\mathbf{u}\cdot(\mathbf{v}\times\mathbf{w})}/\norm{\mathbf{v}\times\mathbf{w}}$. So the volume is $\tfrac13\cdot\tfrac12\norm{\mathbf{v}\times\mathbf{w}}\cdot\abs{\mathbf{u}\cdot(\mathbf{v}\times\mathbf{w})}/\norm{\mathbf{v}\times\mathbf{w}} = \tfrac16\abs{\mathbf{u}\cdot(\mathbf{v}\times\mathbf{w})}$. For the given vertices,

$$
\begin{vmatrix} 1 & 2 & 0 \\ 0 & 1 & 3 \\ 2 & 0 & 1 \end{vmatrix} = 1\,(1 - 0) - 2\,(0 - 6) + 0 = 13,
$$

so the volume is $\tfrac{13}{6}$.
:::
:::

::: exercise Identify the quadric {level=2}
Identify the surface $4x^2 - y^2 + 2z^2 + 4 = 0$ and describe its traces.
::: solution
Rearranging and dividing by $4$: $\dfrac{y^2}{4} - x^2 - \dfrac{z^2}{2} = 1$. This is a hyperboloid of two sheets whose axis is the $y$-axis (the variable with the positive sign). Traces: for $y = k$, $x^2 + \tfrac{z^2}{2} = \tfrac{k^2}{4} - 1$, an ellipse when $\abs{k} > 2$, the single point $(0, \pm2, 0)$ when $\abs{k} = 2$, and empty when $\abs{k} < 2$ — so there are two sheets, for $y \ge 2$ and $y \le -2$. For $x = k$, $\tfrac{y^2}{4} - \tfrac{z^2}{2} = 1 + k^2$ and for $z = k$, $\tfrac{y^2}{4} - x^2 = 1 + \tfrac{k^2}{2}$: hyperbolas opening along the $y$-axis.
:::
:::

::: exercise Skew lines {level=2 check="sqrt(2)"}
Find the distance between the lines $\mathbf{r} = (1,0,2) + t(2,1,-1)$ and $\mathbf{r} = (0,3,1) + s(1,-1,1)$.
::: solution
The directions are not parallel, and $\mathbf{n} = (2,1,-1)\times(1,-1,1) = (1\cdot 1 - (-1)(-1),\; (-1)\cdot 1 - 2\cdot 1,\; 2\cdot(-1) - 1\cdot 1) = (0,-3,-3)$. With $\overrightarrow{P_1P_2} = (0,3,1) - (1,0,2) = (-1, 3, -1)$, the formula from [[#ex-skew]] gives

$$
D = \frac{\abs{(-1,3,-1)\cdot(0,-3,-3)}}{\norm{(0,-3,-3)}} = \frac{\abs{0 - 9 + 3}}{3\sqrt2} = \frac{6}{3\sqrt2} = \sqrt2 .
$$
:::
:::

::: exercise Distance from a point to a line {level=3}
Let $L$ be the line through $P_0$ with direction $\mathbf{v} \ne \mathbf{0}$. Prove that the distance from a point $P$ to $L$ is $\dfrac{\norm{\overrightarrow{P_0P}\times\mathbf{v}}}{\norm{\mathbf{v}}}$, and use it to find the distance from $(1,2,3)$ to the line through the origin with direction $(1,1,1)$.
::: hint
The distance is the length of the component of $\mathbf{w} = \overrightarrow{P_0P}$ orthogonal to $\mathbf{v}$. Combine [[#prop-projection]] with Lagrange's identity.
:::
::: solution
Let $\mathbf{w} = \overrightarrow{P_0P}$. The points of $L$ are $P_0 + t\mathbf{v}$, and the distance from $P$ to such a point is $\norm{\mathbf{w} - t\mathbf{v}}$. By [[#prop-projection]] this is smallest when $t\mathbf{v} = \proj_{\mathbf{v}}\mathbf{w}$, and the minimum distance $D$ satisfies, by Pythagoras,

$$
D^2 = \norm{\mathbf{w}}^2 - \norm{\proj_{\mathbf{v}}\mathbf{w}}^2 = \norm{\mathbf{w}}^2 - \frac{(\mathbf{v}\cdot\mathbf{w})^2}{\norm{\mathbf{v}}^2} = \frac{\norm{\mathbf{w}}^2\norm{\mathbf{v}}^2 - (\mathbf{v}\cdot\mathbf{w})^2}{\norm{\mathbf{v}}^2} = \frac{\norm{\mathbf{w}\times\mathbf{v}}^2}{\norm{\mathbf{v}}^2}
$$

by Lagrange's identity ([[#thm-cross-length]]). For $P = (1,2,3)$, $P_0 = O$ and $\mathbf{v} = (1,1,1)$: $\mathbf{w}\times\mathbf{v} = (2 - 3,\, 3 - 1,\, 1 - 2) = (-1, 2, -1)$, of length $\sqrt6$, so $D = \sqrt6/\sqrt3 = \sqrt2$.
:::
:::

::: exercise The vector triple product {level=3}
Prove that for all $\mathbf{a}, \mathbf{b}, \mathbf{c} \in \R^3$,

$$
\mathbf{a}\times(\mathbf{b}\times\mathbf{c}) = (\mathbf{a}\cdot\mathbf{c})\,\mathbf{b} - (\mathbf{a}\cdot\mathbf{b})\,\mathbf{c},
$$

and deduce the **Jacobi identity** $\mathbf{a}\times(\mathbf{b}\times\mathbf{c}) + \mathbf{b}\times(\mathbf{c}\times\mathbf{a}) + \mathbf{c}\times(\mathbf{a}\times\mathbf{b}) = \mathbf{0}$.
::: hint
Both sides are linear in each of $\mathbf{a}, \mathbf{b}, \mathbf{c}$, so it is enough to check the identity when each of them is one of $\mathbf{i}, \mathbf{j}, \mathbf{k}$ — or compare first components directly.
:::
::: solution
Compare first components. Since $\mathbf{b}\times\mathbf{c} = (b_2c_3 - b_3c_2,\; b_3c_1 - b_1c_3,\; b_1c_2 - b_2c_1)$, the first component of $\mathbf{a}\times(\mathbf{b}\times\mathbf{c})$ is

$$
a_2(b_1c_2 - b_2c_1) - a_3(b_3c_1 - b_1c_3) = b_1(a_2c_2 + a_3c_3) - c_1(a_2b_2 + a_3b_3).
$$

Adding and subtracting $a_1b_1c_1$ turns this into $b_1(\mathbf{a}\cdot\mathbf{c}) - c_1(\mathbf{a}\cdot\mathbf{b})$, the first component of the right-hand side. The other components follow in the same way (or by cyclically relabelling the coordinates $1\to2\to3\to1$, which preserves both sides). For the Jacobi identity, apply the formula to each term:

$$
\bigl[(\mathbf{a}\cdot\mathbf{c})\mathbf{b} - (\mathbf{a}\cdot\mathbf{b})\mathbf{c}\bigr] + \bigl[(\mathbf{b}\cdot\mathbf{a})\mathbf{c} - (\mathbf{b}\cdot\mathbf{c})\mathbf{a}\bigr] + \bigl[(\mathbf{c}\cdot\mathbf{b})\mathbf{a} - (\mathbf{c}\cdot\mathbf{a})\mathbf{b}\bigr] = \mathbf{0},
$$

since the six terms cancel in pairs by symmetry of the dot product.
:::
:::

::: exercise Parallelograms and their diagonals {level=3}
Let $\mathbf{u}, \mathbf{v}$ be the sides of a parallelogram, so that its diagonals are $\mathbf{u}+\mathbf{v}$ and $\mathbf{u}-\mathbf{v}$. Prove the **parallelogram law** $\norm{\mathbf{u}+\mathbf{v}}^2 + \norm{\mathbf{u}-\mathbf{v}}^2 = 2\norm{\mathbf{u}}^2 + 2\norm{\mathbf{v}}^2$, and prove that the diagonals are perpendicular if and only if the parallelogram is a rhombus ($\norm{\mathbf{u}} = \norm{\mathbf{v}}$), and have equal length if and only if it is a rectangle ($\mathbf{u}\cdot\mathbf{v} = 0$).
::: solution
By [[#eq-expand]], $\norm{\mathbf{u}\pm\mathbf{v}}^2 = \norm{\mathbf{u}}^2 \pm 2\,\mathbf{u}\cdot\mathbf{v} + \norm{\mathbf{v}}^2$; adding the two versions gives the parallelogram law. Next,

$$
(\mathbf{u}+\mathbf{v})\cdot(\mathbf{u}-\mathbf{v}) = \norm{\mathbf{u}}^2 - \mathbf{u}\cdot\mathbf{v} + \mathbf{v}\cdot\mathbf{u} - \norm{\mathbf{v}}^2 = \norm{\mathbf{u}}^2 - \norm{\mathbf{v}}^2,
$$

which vanishes exactly when $\norm{\mathbf{u}} = \norm{\mathbf{v}}$. Finally, subtracting the two expansions, $\norm{\mathbf{u}+\mathbf{v}}^2 - \norm{\mathbf{u}-\mathbf{v}}^2 = 4\,\mathbf{u}\cdot\mathbf{v}$, which vanishes exactly when $\mathbf{u}\cdot\mathbf{v} = 0$, i.e. when adjacent sides are perpendicular.
:::
:::
