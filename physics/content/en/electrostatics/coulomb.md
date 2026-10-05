A glass rod rubbed with silk and a second glass rod push each other apart. The same rod and a piece of amber rubbed with wool pull towards each other. Gravity cannot do this. Weight is always attractive, and for objects you can hold it is far too small to feel as a push between them. The new property of matter that the push responds to is **electric charge**.

Newton's second law, in [[mechanics/newton-laws]], turns a known force into an acceleration. This chapter is about that force for charges at rest, small enough to treat as points, in vacuum. A charged rod is not a point: the force on a nearby pith ball is an integral built from the point-charge law. [[electrostatics/electric-field]] and [[electrostatics/gauss-law]] reorganise the same law. They do not replace it.

## Charge

Charge comes in two signs, it is conserved, and the charge on a free particle is a whole number of elementary charges. Those three facts are independent of the force law, and they are the reason the force law has the shape it has.

Rubbing does not create charge out of nothing. It moves charge from one body to the other. The glass rod ends positive and the silk ends negative by the same amount, if the pair is isolated from everything else. Benjamin Franklin's choice, still the one we use, calls the glass positive and the amber, or the rubber, negative. The names are a convention. The fact that there are two kinds, and that like kinds repel while unlike kinds attract, is not a convention.

::: definition Electric charge {#def-charge}
**Electric charge** is the scalar property of matter on which the electrostatic force depends. It may be positive or negative. Charges of the same sign repel one another; charges of opposite sign attract. In an isolated system the algebraic sum of the charge is constant: charge is **conserved**. The SI unit of charge is the coulomb, abbreviated $\mathrm{C}$.
:::

Conservation counts sign. Pair creation and annihilation change how much positive charge is present, and they leave the algebraic total unchanged. In the processes of this course — rubbing, contact, currents — charge moves from one place to another. The coulomb is a large unit for static experiments: everyday charges are nanocoulombs or microcoulombs, while one ampere carries one coulomb past a point in one second.

::: definition Elementary charge {#def-elementary}
The charge of any free particle is an integer multiple of the **elementary charge**

$$
e = 1.602176634\times 10^{-19}\,\mathrm{C}.
$$ {#eq-elementary}

The electron carries $-e$ and the proton carries $+e$. In the SI this value of $e$ is exact: the coulomb is defined so that the elementary charge has these digits. Charge is **quantised**.
:::

A microcoulomb already contains about $10^{13}$ elementary charges, so the force law below treats $q$ as continuous. That model is the wrong one for a single electron bound to a single proton, and the right one for every macroscopic charge in this chapter.

::: example Electrons in a microcoulomb {#ex-count}
How many electrons must be removed from a neutral body to leave it with charge $+1.00\,\mu\mathrm{C}$? One mole of elementary charges is how many coulombs?
::: solution
Removing an electron leaves the body with charge $+e$. The number that must be removed is

$$
N = \frac{1.00\times 10^{-6}}{e} = \frac{1.00\times 10^{-6}}{1.602176634\times 10^{-19}} = 6.241509074\times 10^{12}.
$$

To three significant figures, matching the $1.00$ in the charge, $N = 6.24\times 10^{12}$.

A mole is $N_{\mathrm{A}} = 6.02214076\times 10^{23}$ particles, another exact SI constant. The charge of one mole of elementary charges is

$$
N_{\mathrm{A}} e = 96485.332\,\mathrm{C}.
$$

That product is the Faraday constant. A mole of elementary charges is not a static charge you put on a rod. It is the charge a current of one ampere carries in about a day.
:::
:::

A body of charge $1.00\,\mu\mathrm{C}$ has gained or lost $6.24\times 10^{12}$ electrons. Set beside the number of atoms in a gram of ordinary matter, that fraction is tiny, and [[#ex-gravity]] shows why the force is not. Whether the excess stays where you put it depends on the material.

::: definition Conductor and insulator {#def-conductor}
In a **conductor**, some charges are free to move through the material over laboratory distances. Metals are conductors because some electrons are not bound to a particular atom. In an **insulator**, charges are bound to atoms or molecules and do not travel across the sample. Electrostatic **equilibrium** means that every free charge has stopped moving. The net force on each of them is then zero.
:::

Glass, rubber, dry air and most plastics are good insulators here. Metals are good conductors. Pure water conducts poorly; tap water, with dissolved ions, conducts well enough to discharge a rubbed rod. This chapter uses the two extremes.

Three ways of charging follow from the definitions, without a force law. Rubbing separates charge between two insulators, and the charges stay where the contact occurred. Contact with a conductor lets free charge flow: identical isolated metal spheres share charge equally, and the dependence on shape is a question for [[electrostatics/potential]]. Induction never touches the rod to the body you want to charge. A negatively charged rod near a neutral conductor drives free electrons to the far side. Ground the far side and those electrons leave; break the ground, then remove the rod, and the conductor is left positive. A positive rod leaves it negative. The rod's own charge is unchanged. The algebraic total, ground included, is still conserved.

Equilibrium means the net force on every free charge vanishes. That the field inside the conducting material is zero, and that excess charge sits on the surface, are theorems of [[electrostatics/gauss-law]], once [[electrostatics/electric-field]] has turned force per charge into a field.

::: intuition What "neutral" actually means
A neutral metal sphere is not a sphere with no charges in it. It is a sphere in which the negative charge of the electrons cancels the positive charge of the nuclei to a precision far beyond a microcoulomb. Charging the sphere adds a small imbalance. The forces in this chapter are forces between imbalances.
:::

## Coulomb's law

The force between two small charged bodies at rest depends on both charges and on the distance between them. Charles-Augustin de Coulomb measured that dependence in 1785. The result, for points, is the law that carries his name.

::: theorem Coulomb's law {#thm-coulomb}
The electrostatic force on a point charge $q_2$, due to a point charge $q_1$, when both are at rest in vacuum and the distance $r$ between them is positive, is

$$
\mathbf{F}_{21} = \frac{1}{4\pi\varepsilon_0}\,\frac{q_1 q_2}{r^{2}}\,\hat{\mathbf{r}}_{21}.
$$ {#eq-coulomb}

The unit vector $\hat{\mathbf{r}}_{21}$ points from the location of $q_1$ to the location of $q_2$. The force is repulsive when $q_1 q_2 > 0$ and attractive when $q_1 q_2 < 0$. With $\mathbf{r}_1$ and $\mathbf{r}_2$ the positions,

$$
r = \abs{\mathbf{r}_2 - \mathbf{r}_1}, \qquad \hat{\mathbf{r}}_{21} = \frac{\mathbf{r}_2 - \mathbf{r}_1}{r}.
$$ {#eq-rhat}
:::

::: proof
Coulomb's law is an experimental law. Nothing in this chapter derives the inverse square from a more primitive dynamical principle. What the experiment fixes, and what [[#eq-coulomb]] records, is three things: the force is proportional to each charge separately, it falls as the inverse square of the separation, and it lies along the line joining the two charges. The proof here is the deduction of the working rules from that vector statement.

The magnitude of $\hat{\mathbf{r}}_{21}$ is $1$, so

$$
\abs{\mathbf{F}_{21}} = \frac{1}{4\pi\varepsilon_0}\,\frac{\abs{q_1 q_2}}{r^{2}}.
$$ {#eq-coulomb-mag}

The sign of the product $q_1 q_2$ is not inside the absolute value. It decides the sense along the line. If the product is positive, $\mathbf{F}_{21}$ is parallel to $\hat{\mathbf{r}}_{21}$, so $q_2$ is pushed away from $q_1$. If the product is negative, $\mathbf{F}_{21}$ is antiparallel to $\hat{\mathbf{r}}_{21}$, so $q_2$ is pulled towards $q_1$.

The force on $q_1$ due to $q_2$ is the same formula with the labels exchanged. The separation is the same number, $r_{12} = r_{21}$. The unit vector reverses, $\hat{\mathbf{r}}_{12} = -\hat{\mathbf{r}}_{21}$, because $\mathbf{r}_1 - \mathbf{r}_2 = -(\mathbf{r}_2 - \mathbf{r}_1)$. The product $q_2 q_1$ equals $q_1 q_2$. Therefore

$$
\mathbf{F}_{12} = \frac{1}{4\pi\varepsilon_0}\,\frac{q_2 q_1}{r^{2}}\,\hat{\mathbf{r}}_{12} = -\mathbf{F}_{21}.
$$ {#eq-third}

The two forces are equal in magnitude, opposite in direction, and act on different bodies. They are an electrostatic third-law pair in the sense of [[mechanics/newton-laws]]. The force on one charge is one of them, not their sum. Their sum is the net force on the pair, and it is zero.
:::

The constant in front of the charges is fixed by the SI definition of the coulomb and by measurements of the force. We write it in either of two ways.

$$
k = \frac{1}{4\pi\varepsilon_0} = 8.9875517923\times 10^{9}\,\mathrm{N\cdot m^{2}/C^{2}},
$$ {#eq-k}

$$
\varepsilon_0 = 8.854187817\times 10^{-12}\,\mathrm{C^{2}/(N\cdot m^{2})}.
$$ {#eq-eps0}

Here $k$ is Coulomb's constant and $\varepsilon_0$ is the permittivity of vacuum. With the digits in [[#eq-k]] and [[#eq-eps0]], $4\pi\varepsilon_0 k$ differs from $1$ by a few parts in $10^{10}$, finer than any result below, so numerical work uses the stated $k$. The $4\pi$ sits in the denominator so that Gauss's law, later, has none. Charge squared over length squared, times this $k$, is a newton. A formula that did not come out in newtons would be a wrong formula.

::: warning Point charges, at rest, one force at a time
[[#eq-coulomb]] applies to point charges at rest in vacuum. A body with the charge spread over a volume or a surface is not a point. The force on a point charge $q_0$ near it is an integral of [[#eq-coulomb]] over the distribution,

$$
\mathbf{F} = \frac{1}{4\pi\varepsilon_0}\, q_0 \int \frac{\mathrm{d}q}{r^{2}}\,\hat{\mathbf{r}},
$$

with $r$ and $\hat{\mathbf{r}}$ taken from the element $\mathrm{d}q$ to $q_0$. Putting the total charge into [[#eq-coulomb-mag]] at the distance to the centre is a different, and usually wrong, calculation. Moving charges bring in magnetic forces, which are not part of this law; they begin in [[magnetism]]. And the force on one charge is $\mathbf{F}_{21}$ or $\mathbf{F}_{12}$, not $2\abs{\mathbf{F}_{21}}$. The third-law partner is the force on the other body. It has already been counted once you have named the body you are drawing the forces on.
:::

Two charges of a coulomb each, a metre apart, would repel with force $k = 8.9875517923\times 10^{9}\,\mathrm{N}$. Near the Earth that is the weight of a mass $k/g$. With $g = 9.80\,\mathrm{m/s^{2}}$,

$$
\frac{k}{g} = \frac{8.9875517923\times 10^{9}}{9.80} = 9.171\times 10^{8}\,\mathrm{kg}.
$$

A coulomb is an absurd amount of static charge. The useful laboratory scale is the microcoulomb at a separation of centimetres to tens of centimetres, where the force is a fraction of a newton up to a few newtons, large enough to measure and small enough to set up.

::: example Two microcoulomb charges {#ex-pair}
A charge $q_1 = +2.00\,\mu\mathrm{C}$ and a charge $q_2 = -3.00\,\mu\mathrm{C}$ are $0.200\,\mathrm{m}$ apart, at rest in vacuum. Find the force on each.
::: solution
The product $q_1 q_2$ is negative, so the force is attractive. The magnitude is [[#eq-coulomb-mag]] with $k$ from [[#eq-k]]:

$$
\abs{\mathbf{F}} = \frac{k\,\abs{q_1 q_2}}{r^{2}} = \frac{(8.9875517923\times 10^{9})\,(2.00\times 10^{-6})\,(3.00\times 10^{-6})}{(0.200)^{2}}.
$$

The numerator without $k$ is $6.00\times 10^{-12}$, and $r^{2} = 0.0400$, so the ratio of those two is $1.50\times 10^{-10}$. Multiplying by $k$ gives

$$
\abs{\mathbf{F}} = 1.348\,\mathrm{N}.
$$

The unrounded product is $1.34813\,\mathrm{N}$. The force on $q_2$ points towards $q_1$, and the force on $q_1$ points towards $q_2$. They are the pair [[#eq-third]]. Neither magnitude is $2.696\,\mathrm{N}$.
:::
:::

::: quiz
The separation of two point charges is doubled, and one of the two charges is also doubled. The magnitude of the electrostatic force becomes
- [ ] four times the original force
- [ ] twice the original force
- [x] half the original force
- [ ] a quarter of the original force
::: solution
The magnitude is proportional to the product of the charges and to $1/r^{2}$. Doubling one charge multiplies the product by $2$. Doubling the separation multiplies $1/r^{2}$ by $1/4$. The force is multiplied by $2/4 = 1/2$.
:::
:::

::: corollary Scaling {#cor-scaling}
If $q_1$ is multiplied by a factor $\alpha$, $q_2$ by a factor $\beta$, and the separation by a factor $\gamma > 0$, the Coulomb force is multiplied by $\alpha\beta/\gamma^{2}$. In particular, multiplying both charges by $-1$ does not change the force, and doubling the separation divides the force by four.
:::

::: proof
Substitute $\alpha q_1$, $\beta q_2$ and $\gamma r$ into [[#eq-coulomb]]. The unit vector along the line is unchanged if the charges keep their order on that line. The scalar factor in front of it changes by $\alpha\beta/\gamma^{2}$. Changing the sign of both charges multiplies the product by $(+1)$, so the force vector is the same. Replacing $r$ by $2r$ divides the force by $4$.
:::

## Superposition

Coulomb's law is a statement about a pair. A third charge does not oblige the pair to stop exerting that force. The extra charge exerts a force of its own, and the two forces add as vectors. This is a further experimental fact, not an algebraic consequence of [[#eq-coulomb]].

::: axiom Superposition {#ax-superposition}
The electrostatic force on a point charge due to a collection of other point charges, all at rest in vacuum, is the vector sum of the Coulomb forces that each of those charges would exert if it acted alone. The forces do not alter one another.
:::

Doubling every source charge doubles the net force on a test charge. At laboratory strengths the vacuum is linear, and superposition is exact for this course. Most wrong answers come from skipping a step of the procedure.

::: algorithm Net Coulomb force {#alg-super}
Work in SI units from the start: metres and coulombs, not centimetres and microcoulombs left unconverted. Choose the one charge whose force you want, and draw only the forces on it. For each other charge, compute $k\abs{q_i q}/r_i^{2}$ and decide the sense from the sign of $q_i q$: away from $q_i$ if the product is positive, towards $q_i$ if it is negative. Resolve those forces into components along fixed axes. Add the components. Add the magnitudes only when the forces are parallel. Do not include a force of a charge on itself. The third-law partners act on the other charges and are not extra terms in this sum.
:::

::: example A third charge at the midpoint {#ex-mid}
The charges of [[#ex-pair]] stay fixed: $+2.00\,\mu\mathrm{C}$ at $x = 0$ and $-3.00\,\mu\mathrm{C}$ at $x = 0.200\,\mathrm{m}$. A third charge $q_3 = +1.00\,\mu\mathrm{C}$ is placed at the midpoint, $x = 0.100\,\mathrm{m}$. Find the net force on $q_3$.
::: solution
The midpoint is $0.100\,\mathrm{m}$ from each charge, so $r^{2} = 0.0100\,\mathrm{m^{2}}$ for both forces.

The product of $q_3$ with the charge at the origin is positive. That force is repulsive, and from $x = 0.100\,\mathrm{m}$ "away from the origin" is the positive $x$ direction. Its magnitude is

$$
F_{1} = \frac{k\,(2.00\times 10^{-6})\,(1.00\times 10^{-6})}{0.0100} = 1.7975\,\mathrm{N}.
$$

The product of $q_3$ with the charge at $x = 0.200\,\mathrm{m}$ is negative. That force is attractive, towards the negative charge, which is also the positive $x$ direction. Its magnitude is

$$
F_{2} = \frac{k\,(3.00\times 10^{-6})\,(1.00\times 10^{-6})}{0.0100} = 2.6963\,\mathrm{N}.
$$

The two forces are parallel. Superposition says add them, not subtract them:

$$
F_{\mathrm{net}} = 1.7975 + 2.6963 = 4.4938\,\mathrm{N},
$$

in the positive $x$ direction, towards the negative charge. To three significant figures, $4.49\,\mathrm{N}$. Subtracting would answer a question in which the forces pointed opposite ways. They do not: the test charge is pushed away by the positive charge and pulled towards the negative one.
:::
:::

When the forces are not parallel, the next step is components rather than a sum of magnitudes.

::: example Three charges, not in a line {#ex-triangle}
A charge $q_1 = +5.00\,\mu\mathrm{C}$ is at the origin, and a charge $q_2 = +3.00\,\mu\mathrm{C}$ is at $(0.300\,\mathrm{m},\, 0)$. Find the net force on $q_3 = +2.00\,\mu\mathrm{C}$ at $(0.300\,\mathrm{m},\, 0.400\,\mathrm{m})$.
::: solution
The distance from $q_1$ to $q_3$ is $\sqrt{0.300^{2} + 0.400^{2}} = 0.500\,\mathrm{m}$, a $3$-$4$-$5$ triangle scaled by $0.100\,\mathrm{m}$. The distance from $q_2$ to $q_3$ is $0.400\,\mathrm{m}$. All three products of charges are positive, so both forces on $q_3$ are repulsive.

$$
F_{1} = \frac{k\,(5.00\times 10^{-6})\,(2.00\times 10^{-6})}{(0.500)^{2}} = 0.35950\,\mathrm{N},
$$

directed from the origin towards $q_3$, along the unit vector $(0.600,\, 0.800)$.

$$
F_{2} = \frac{k\,(3.00\times 10^{-6})\,(2.00\times 10^{-6})}{(0.400)^{2}} = 0.33703\,\mathrm{N},
$$

directed straight up, away from $q_2$, along $(0,\, 1)$.

The components of the net force are

$$
\begin{aligned}
F_x &= 0.35950\times 0.600 = 0.21570\,\mathrm{N}, \\
F_y &= 0.35950\times 0.800 + 0.33703 = 0.28760 + 0.33703 = 0.62463\,\mathrm{N}.
\end{aligned}
$$

The magnitude and the direction above the positive $x$ axis are

$$
\abs{\mathbf{F}} = \sqrt{0.21570^{2} + 0.62463^{2}} = 0.66083\,\mathrm{N}, \qquad \theta = \tan^{-1}\frac{0.62463}{0.21570} = 70.95^{\circ}.
$$

The two forces are $53.13^{\circ}$ apart, so the sum of the magnitudes is not the magnitude of the sum.
:::
:::

Superposition also says where a third charge can sit so that the net force on it vanishes. The location is fixed by the source charges alone.

::: proposition Null between two like charges {#prop-null}
Fix a charge $Q \neq 0$ at $x = 0$ and a charge $\alpha Q$ at $x = L > 0$, with $\alpha > 0$. A third charge $q \neq 0$, placed on the open segment between them, feels zero net Coulomb force at the single point

$$
x = \frac{L}{1 + \sqrt{\alpha}}.
$$ {#eq-null}

The coordinate does not depend on $q$ or on the sign of $Q$. There is no such point on the segment if the two fixed charges have opposite signs. If $q$ has the same sign as $Q$, a small displacement along the line is opposed by the net force, whereas a small displacement off the line is not. If $q$ has the opposite sign to $Q$, the along-line displacement is the one that runs away.
:::

::: proof
Take $q$ at coordinate $x$ with $0 < x < L$. The distance to $Q$ is $x$ and the distance to $\alpha Q$ is $L - x$.

Suppose first that $Q$ and $q$ have the same sign, so $C = k Q q > 0$. Repulsion by $Q$ pushes $q$ in the positive $x$ direction. Repulsion by $\alpha Q$ pushes $q$ in the negative $x$ direction. The net force is

$$
F_x = C\left(\frac{1}{x^{2}} - \frac{\alpha}{(L - x)^{2}}\right).
$$

This vanishes when $(L - x)/x = \sqrt{\alpha}$, the positive root because both distances are positive. Hence $L - x = x\sqrt{\alpha}$, so $x(1 + \sqrt{\alpha}) = L$, which is [[#eq-null]]. The negative root of the square would put one of the distances on the wrong side of zero and is discarded. If instead $q$ and $Q$ have opposite signs, both forces reverse, $C$ changes sign, and the same bracket still vanishes at the same $x$. The location is therefore independent of $q$ and of the sign of $Q$, provided $\alpha > 0$ so that the fixed charges have the same sign.

If the fixed charges have opposite signs, take $\alpha < 0$. On the segment, a positive test charge is repelled by the positive fixed charge and attracted by the negative one, and those two directions coincide. A negative test charge has both forces reversed, and they still coincide with each other. The two contributions to $F_x$ have the same sign everywhere on the open segment, so $F_x$ has no zero there.

For the stability when $\alpha > 0$, differentiate the same-sign expression:

$$
\deriv{F_x}{x} = C\left(-\frac{2}{x^{3}} - \frac{2\alpha}{(L - x)^{3}}\right).
$$

The bracket is negative for every $x$ in the segment. If $C > 0$, the derivative is negative: moving $q$ to the right makes $F_x$ negative, back towards the null, and moving it to the left makes $F_x$ positive, again back towards the null. If $C < 0$, the derivative is positive and the along-line null is unstable.

Sideways, the null is not a minimum for every sign. If $Q > 0$ and $q > 0$, each repulsion has a component pointing further off the axis, so a transverse displacement runs away. If $q$ is negative, the transverse components restore and the along-line direction, already unstable, is the one that runs away. In neither case is the null stable against every small displacement. Samuel Earnshaw proved in 1842 that this is general: electrostatic forces alone cannot hold a charge in stable equilibrium in an empty region. The derivative above is the check for this one arrangement, not that theorem.
:::

::: example The null for a charge and four times that charge {#ex-null}
A charge $Q = +2.00\,\mu\mathrm{C}$ is fixed at $x = 0$ and a charge $4Q = +8.00\,\mu\mathrm{C}$ at $x = 0.300\,\mathrm{m}$. Where does a charge $q = +1.00\,\mathrm{nC}$ feel no net force, and what is the magnitude of each separate force there?
::: solution
Here $\alpha = 4$ and $\sqrt{\alpha} = 2$, so [[#eq-null]] gives $x = L/3 = 0.100\,\mathrm{m}$ from the smaller charge, and $0.200\,\mathrm{m}$ from the larger one. The test charge is closer to the smaller source. That is the pattern: the null sits nearer the charge with the smaller magnitude, so that the weaker source can match the stronger one by being closer.

Each force has magnitude

$$
F = \frac{k\,(2.00\times 10^{-6})\,(1.00\times 10^{-9})}{(0.100)^{2}} = 1.7975\times 10^{-3}\,\mathrm{N}.
$$

The force from $4Q$ is

$$
\frac{k\,(8.00\times 10^{-6})\,(1.00\times 10^{-9})}{(0.200)^{2}} = \frac{k\,(8.00\times 10^{-15})}{0.0400} = 1.7975\times 10^{-3}\,\mathrm{N},
$$

the same value, in opposite directions. The net force is zero. Since $q$ and $Q$ are both positive, the balance restores along the line and fails off it. A bead on a smooth insulating wire would stay; a free charge in the plane would slip off.
:::
:::

::: widget charges
charges: 2, -1.2, 0; -3, 1.2, 0
caption: A charge $+2$ is on the left and a charge $-3$ on the right, in arbitrary units. Every arrow is drawn with the same length, so the length is not the magnitude. The direction is the direction of the force on a positive test charge. Between the charges the arrows run from the positive charge towards the negative one, which is why the two forces in the midpoint example point the same way. The pattern of arrows is the electric field, the subject of the next chapter.
:::

::: quiz
In [[#ex-mid]] the two forces on the midpoint charge are
- [ ] equal and opposite, so the net force is zero because the point is halfway
- [ ] in opposite directions, and the larger magnitude wins
- [x] in the same direction, both towards the negative charge, so they add
- [ ] each equal to $k q_1 q_2 / r^{2}$ computed with the full $0.200\,\mathrm{m}$ separation
::: solution
The positive midpoint charge is repelled by $+2.00\,\mu\mathrm{C}$, towards the right, and attracted by $-3.00\,\mu\mathrm{C}$, also towards the right. The distances that enter Coulomb's law are the $0.100\,\mathrm{m}$ distances to each source, not the $0.200\,\mathrm{m}$ between the sources. The magnitudes $1.7975\,\mathrm{N}$ and $2.6963\,\mathrm{N}$ add.
:::
:::

## How large the force is

The inverse square is also the shape of Newton's law of gravitation, in [[mechanics/gravitation]]. The comparison is worth a number, because it explains why a nearly neutral body can still exert a force you feel, and why gravity, not electricity, governs the motion of planets.

::: example Electricity against gravity {#ex-gravity}
Compare the electrostatic repulsion of two protons with their gravitational attraction. Then compare the electrostatic attraction of an electron and a proton with their gravitational attraction. Use $m_p = 1.673\times 10^{-27}\,\mathrm{kg}$ for the proton, $m_e = 9.109\times 10^{-31}\,\mathrm{kg}$ for the electron, and $G = 6.67430\times 10^{-11}\,\mathrm{N\cdot m^{2}/kg^{2}}$. The separation cancels; do not assume one.
::: solution
Both forces are inverse-square, so the ratio is independent of $r$. For two protons the electrostatic force is repulsive and the gravitational force is attractive:

$$
\frac{F_e}{F_g} = \frac{k e^{2}/r^{2}}{G m_p^{2}/r^{2}} = \frac{k e^{2}}{G m_p^{2}}.
$$

Inserting [[#eq-k]], [[#eq-elementary]] and the masses above,

$$
\frac{k e^{2}}{G m_p^{2}} = 1.235\times 10^{36}.
$$

For an electron and a proton the electrostatic force is attractive, as gravity is, and the ratio is larger still because the electron is lighter:

$$
\frac{k e^{2}}{G m_e m_p} = 2.268\times 10^{39}.
$$

Ordinary matter must be neutral to an absurd precision, or electricity would overwhelm weight. Planetary orbits ignore charge because planets are neutral to that precision, not because the electrostatic force is weak.
:::
:::

For pith balls in air, centimetres apart, [[#eq-coulomb]] is the working law. A distributed source is the integral in the warning, not the total charge parked at the centre, unless a theorem says otherwise. The outside of a uniform spherical shell is that theorem, proved in [[electrostatics/gauss-law]].

::: history The torsion balance, and a null result before it
In 1767 Joseph Priestley, in *The History and Present State of Electricity*, argued that the electric force should fall as the inverse square of distance. The evidence he used was a null result: no force on a charge placed inside a charged hollow conductor. Newton had shown that a uniform spherical shell of mass exerts no gravitational force on a mass in its interior, and that the proof uses the inverse square. Priestley read the electrical null result as the same theorem with a different force. Henry Cavendish, around 1773, tested the exponent with concentric spheres to a precision much finer than a direct force measurement of that date. He did not publish it. Maxwell published Cavendish's electrical researches in 1879.

Coulomb's own measurement came in 1785, with a torsion balance: a charged pith ball on a rod hung from a fine fibre, repelled by a second charged ball. The twist of the fibre measures the force. Varying the separation and the charges produced the inverse square and the proportionality to each charge. [[#eq-coulomb]] is that result in SI units, for charges at rest in vacuum.
:::

## Where this leads

The force on a chosen charge is what Newton's second law needs. [[#ax-superposition]] supplies the net force, and $m\mathbf{a} = \mathbf{F}_{\mathrm{net}}$ does the rest. If the sources are free to move as well, every force changes as the positions change. The fixed-source problems here are that coupled problem with infinite source masses.

Dividing the force by the charge that feels it removes that charge from the description. What remains is the electric field of [[electrostatics/electric-field]]. Potential, in [[electrostatics/potential]], turns the vector problem into a scalar one. Neither step changes [[#eq-coulomb]] for two points at rest in vacuum.

::: summary
- Charge has two signs. Like signs repel and unlike signs attract. In an isolated system the algebraic sum of charge is constant, and free particles carry integer multiples of the exact elementary charge $e = 1.602176634\times 10^{-19}\,\mathrm{C}$.
- In a conductor some charges move freely; in an insulator they do not. Electrostatic equilibrium means the net force on every free charge is zero. Rubbing, contact and induction move charge around; they do not create a net charge from none.
- Coulomb's law gives the force on $q_2$ due to $q_1$ as $k q_1 q_2 \hat{\mathbf{r}}_{21}/r^{2}$, with $k = 1/(4\pi\varepsilon_0) = 8.9875517923\times 10^{9}\,\mathrm{N\cdot m^{2}/C^{2}}$. The force is repulsive when the product of the charges is positive. It is a law for point charges at rest in vacuum.
- The two forces in a Coulomb pair are equal and opposite and act on different bodies. The force on one body is not twice the magnitude in [[#eq-coulomb-mag]].
- Superposition: the net force is the vector sum of the individual Coulomb forces. Components first, then the magnitude. Parallel forces may have their magnitudes added only after the directions have been shown to agree.
- Between two fixed charges of the same sign, a third charge feels zero net force at $x = L/(1+\sqrt{\alpha})$, closer to the smaller charge. The null is not stable in every direction.
- A distributed charge is an integral of Coulomb's law. The total charge placed at the centre is not a substitute for that integral. Magnetic forces on moving charges are outside this chapter.
:::

## Exercises

::: exercise Repulsion of two small charges {#exr-pair level=1}
A charge $+3.00\,\mu\mathrm{C}$ and a charge $+6.00\,\mu\mathrm{C}$ are $0.120\,\mathrm{m}$ apart in vacuum, at rest. Find the magnitude of the force on each, and say whether the force is attractive or repulsive.
::: solution
The product of the charges is positive, so each force is repulsive. The magnitude is the same for both, by [[#eq-third]]:

$$
\abs{\mathbf{F}} = \frac{k\,(3.00\times 10^{-6})\,(6.00\times 10^{-6})}{(0.120)^{2}} = \frac{k\,(1.80\times 10^{-11})}{0.0144} = k\,(1.25\times 10^{-9}).
$$

With [[#eq-k]],

$$
\abs{\mathbf{F}} = 11.234\,\mathrm{N},
$$

which is $11.23\,\mathrm{N}$ to four significant figures. Each force points away from the other charge. Twice that magnitude would be the doubling mistake.
:::
:::

::: exercise Sharing a microcoulomb with the elementary charge {#exr-count level=1}
A neutral insulating bead is given a charge of $-1.00\,\mathrm{nC}$ by contact. How many extra electrons does that represent? Use the exact elementary charge.
::: solution
A charge $-1.00\times 10^{-9}\,\mathrm{C}$ is an excess of electrons, not a deficit. The number is

$$
N = \frac{1.00\times 10^{-9}}{e} = \frac{1.00\times 10^{-9}}{1.602176634\times 10^{-19}} = 6.241509074\times 10^{9}.
$$

To three significant figures, $6.24\times 10^{9}$ electrons. The same count at the microcoulomb scale was [[#ex-count]], a thousand times larger, and both numbers are enormous compared with $1$.
:::
:::

::: exercise Doubling a charge and tripling the gap {#exr-scale level=1 check="2/9"}
Two point charges at rest exert Coulomb forces of magnitude $F$ on each other. One charge is then doubled, the other is left unchanged, and the separation is made three times as large. The new magnitude is $f F$. Find the number $f$.
::: solution
[[#cor-scaling]] multiplies the force by $\alpha\beta/\gamma^{2}$. Here $\alpha = 2$, $\beta = 1$ and $\gamma = 3$, so

$$
f = \frac{2\times 1}{3^{2}} = \frac{2}{9}.
$$

The tripling of the distance divides the force by nine, and the doubled charge does not make that up.
:::
:::

::: exercise Off the midpoint {#exr-off level=2}
A charge $+5.00\,\mu\mathrm{C}$ is fixed at $x = 0$ and a charge $-2.00\,\mu\mathrm{C}$ at $x = 0.500\,\mathrm{m}$. A charge $+1.00\,\mu\mathrm{C}$ is placed at $x = 0.200\,\mathrm{m}$. Find the net force on it. Give the direction relative to the positive $x$ axis.
::: solution
The test charge is $0.200\,\mathrm{m}$ from the positive source and $0.300\,\mathrm{m}$ from the negative source.

The force from $+5.00\,\mu\mathrm{C}$ is repulsive. At $x = 0.200\,\mathrm{m}$ that direction is $+x$. Its magnitude is

$$
F_{+} = \frac{k\,(5.00\times 10^{-6})\,(1.00\times 10^{-6})}{(0.200)^{2}} = 1.1234\,\mathrm{N}.
$$

The force from $-2.00\,\mu\mathrm{C}$ is attractive, towards $x = 0.500\,\mathrm{m}$, which is also $+x$. Its magnitude is

$$
F_{-} = \frac{k\,(2.00\times 10^{-6})\,(1.00\times 10^{-6})}{(0.300)^{2}} = 0.19972\,\mathrm{N}.
$$

The forces are parallel, so

$$
F_{\mathrm{net}} = 1.1234 + 0.19972 = 1.3232\,\mathrm{N}
$$

in the positive $x$ direction, towards the negative charge. To four significant figures, $1.323\,\mathrm{N}$. The directions agree because the test charge lies between opposite signs, as in [[#ex-mid]]. Like signs would oppose, which is [[#prop-null]].
:::
:::

::: exercise A charge above the line {#exr-components level=2}
A charge $+2.00\,\mu\mathrm{C}$ is at the origin and a charge $-5.00\,\mu\mathrm{C}$ is at $(0.800\,\mathrm{m},\, 0)$. Find the net force on a charge $+1.00\,\mu\mathrm{C}$ placed at $(0.800\,\mathrm{m},\, 0.600\,\mathrm{m})$.
::: solution
The distance from the origin to the test charge is $\sqrt{0.800^{2} + 0.600^{2}} = 1.000\,\mathrm{m}$. The distance from the negative charge to the test charge is $0.600\,\mathrm{m}$.

The force from $+2.00\,\mu\mathrm{C}$ is repulsive, along the unit vector $(0.800,\, 0.600)$:

$$
F_{1} = \frac{k\,(2.00\times 10^{-6})\,(1.00\times 10^{-6})}{(1.000)^{2}} = 1.7975\times 10^{-2}\,\mathrm{N}.
$$

The force from $-5.00\,\mu\mathrm{C}$ is attractive. The negative charge is directly below the test charge, so "towards it" is the negative $y$ direction:

$$
F_{2} = \frac{k\,(5.00\times 10^{-6})\,(1.00\times 10^{-6})}{(0.600)^{2}} = 0.12483\,\mathrm{N}.
$$

Components, with $+x$ to the right and $+y$ upward:

$$
\begin{aligned}
F_x &= (1.7975\times 10^{-2})\times 0.800 = 1.4380\times 10^{-2}\,\mathrm{N}, \\
F_y &= (1.7975\times 10^{-2})\times 0.600 - 0.12483 = 1.0785\times 10^{-2} - 0.12483 = -0.11404\,\mathrm{N}.
\end{aligned}
$$

$$
\abs{\mathbf{F}} = \sqrt{(1.4380\times 10^{-2})^{2} + (0.11404)^{2}} = 0.1149\,\mathrm{N}.
$$

The direction is below the positive $x$ axis,

$$
\theta = \tan^{-1}\frac{-0.11404}{1.4380\times 10^{-2}} = -82.81^{\circ}.
$$

The large piece is the downward attraction onto the nearer charge. The distant repulsion supplies the whole of $F_x$, so dropping it would be a different problem.
:::
:::

::: exercise Three equal charges {#exr-equilateral level=2 check="sqrt(3)"}
Three equal charges $q$ sit at the corners of an equilateral triangle of side $a$. The net force on any one of them has magnitude $f\, k q^{2}/a^{2}$. Find the number $f$. Take $q \neq 0$ and $a > 0$, and assume the charges are held fixed.
::: hint
The two forces on a chosen charge have equal magnitude and the angle between them is the angle of the triangle. Either the cosine rule for the magnitude of a sum, or components along the angle bisector, will do.
:::
::: solution
Each neighbouring charge exerts a force of magnitude $F = k q^{2}/a^{2}$. Both products are positive if $q > 0$, so both forces are repulsive, directed away from the neighbours and therefore outward along the two sides. If $q < 0$ both forces are attractive, inward along the two sides. In either case the two force vectors on the chosen charge have the same magnitude and the angle between their lines is $60^{\circ}$, the angle of an equilateral triangle.

The magnitude of the sum of two vectors of equal length $F$ with angle $60^{\circ}$ between them is

$$
\abs{\mathbf{F}_{\mathrm{net}}}^{2} = F^{2} + F^{2} + 2 F F \cos 60^{\circ} = 2F^{2} + 2F^{2}\cdot\tfrac{1}{2} = 3F^{2}.
$$

Hence $\abs{\mathbf{F}_{\mathrm{net}}} = F\sqrt{3}$, so $f = \sqrt{3}$. Components along the bisector give the same factor: each force contributes $F\cos 30^{\circ}$, the transverse pieces cancel, and the sign of $q$ reverses both forces together, leaving $f$ unchanged.
:::
:::

::: exercise Outside two opposite charges {#exr-opposite level=3 check="1/2"}
A charge $+Q$ is fixed at $x = 0$ and a charge $-9Q$ at $x = L > 0$, with $Q \neq 0$. A positive test charge is in equilibrium on the $x$ axis at $x = -d$, where $d > 0$. Find the number $d/L$.
::: hint
At $x = -d$ the repulsion from $+Q$ and the attraction towards $-9Q$ point in opposite directions. Set the magnitudes equal. Then check the region $x > L$ and the open segment, enough to see that this is the only null.
:::
::: solution
Place the test charge $q > 0$ at $x = -d$. The charge $+Q$ repels it, towards the negative $x$ direction, with magnitude $k Q q/d^{2}$. The charge $-9Q$ attracts it, towards the positive $x$ direction, with magnitude $k\,(9Q)\,q/(L + d)^{2}$. These are opposite directions, so a null is possible. Setting the magnitudes equal,

$$
\frac{1}{d^{2}} = \frac{9}{(L + d)^{2}}.
$$

Both distances are positive, so $L + d = 3d$, hence $L = 2d$ and $d/L = 1/2$. The negative root $L + d = -3d$ would require a negative distance and is discarded. The null lies outside the segment, nearer the smaller magnitude, which is $Q$ rather than $9Q$.

On the open segment $0 < x < L$, a positive test charge is repelled to the right by $+Q$ and attracted to the right by $-9Q$. The forces are parallel. There is no null between the sources.

On the far side, $x = L + s$ with $s > 0$, repulsion from $+Q$ points to the right and attraction to $-9Q$ points to the left, so a null is geometrically possible. The magnitudes give $Q/(L + s)^{2} = 9Q/s^{2}$, so $(L + s)/s = 1/3$ after taking the positive square root of $1/9$. Then $L + s = s/3$, which forces $L < 0$, contradicting $L > 0$. There is no null beyond the larger charge. The only equilibrium on the axis is at $d = L/2$.

Along the line the null is unstable: moving closer to $+Q$ strengthens the repulsion and drives the test charge further off the null. Opposite signs reverse the restoring conclusion of [[#prop-null]].
:::
:::

::: exercise Four charges on a square {#exr-square level=3 check="sqrt(2)+1/2"}
Four equal charges $q$ are fixed at the corners of a square of side $a > 0$. The net force on any one of them has magnitude $f\, k q^{2}/a^{2}$. Find the number $f$.
::: hint
Two of the forces have equal magnitude and are perpendicular. Their resultant lies along the diagonal. The third force, from the opposite corner, lies on that same diagonal. The distance to the opposite corner is $a\sqrt{2}$.
:::
::: solution
Label the square $ABCD$ and compute the force on the charge at $A$. The charges at $B$ and at $D$, the two adjacent corners, each exert a force of magnitude

$$
F_{\mathrm{adj}} = \frac{k q^{2}}{a^{2}}.
$$

These two forces are perpendicular. For $q > 0$ they point outward along the edges, and their resultant has magnitude

$$
\sqrt{F_{\mathrm{adj}}^{2} + F_{\mathrm{adj}}^{2}} = F_{\mathrm{adj}}\sqrt{2} = \sqrt{2}\,\frac{k q^{2}}{a^{2}},
$$

directed outward along the diagonal. If $q < 0$ the resultant reverses and keeps the same magnitude. The opposite corner $C$ is at distance $a\sqrt{2}$ and exerts

$$
F_{\mathrm{diag}} = \frac{k q^{2}}{(a\sqrt{2})^{2}} = \frac{k q^{2}}{2a^{2}},
$$

along the same diagonal. For either sign of $q$ this force is parallel to the resultant of the two adjacent forces: all three are repulsions, or all three are attractions, and the geometry puts them on one line.

The net magnitude is therefore

$$
\left(\sqrt{2} + \frac{1}{2}\right)\frac{k q^{2}}{a^{2}}.
$$

The number asked for is $f = \sqrt{2} + 1/2$, or equivalently $(2\sqrt{2} + 1)/2$. For a check of the arithmetic, $q = 2.00\,\mu\mathrm{C}$ and $a = 0.100\,\mathrm{m}$ give $k q^{2}/a^{2} = 3.5950\,\mathrm{N}$ and a net force $6.8816\,\mathrm{N}$. The factor $f$ itself does not depend on those values.
:::
:::
