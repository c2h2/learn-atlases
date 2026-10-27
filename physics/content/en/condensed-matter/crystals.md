A grain of table salt and a copper wire look nothing alike, but both are crystals: the atoms sit on a pattern that repeats, identically, from one side of the sample to the other. Repetition is the single most useful fact about a solid. It is what makes a problem with $10^{23}$ atoms tractable, because a function that is periodic in space can be expanded in a Fourier series, and the allowed wavevectors of that series form a second lattice that controls everything from X-ray patterns to electron bands.

This chapter sets up the geometry. We define a Bravais lattice and a basis, meet the cubic lattices that recur throughout the course, and construct the reciprocal lattice. Then we use it. A crystal diffracts X-rays only in special directions, and we derive the condition twice: once in the picture of reflection from planes, due to the Braggs, and once in the picture of interfering waves, due to von Laue. The two are shown to be the same statement. Finally the structure factor explains why some reflections that the lattice allows are missing, and we read the lattice of copper from its measured powder pattern.

Only elementary vector algebra and the idea of a plane wave $e^{i\mathbf k\cdot\mathbf r}$ from [[quantum-1/schrodinger-equation]] are needed. Interference and diffraction by a grating, from [[optics/interference]] and [[optics/diffraction]], are useful background: a crystal is a three-dimensional grating.

## Lattices and bases {#lattices}

A real crystal is a pattern of atoms. To describe it we separate two things: the set of points at which the pattern repeats, and the group of atoms that is repeated.

::: definition Bravais lattice {#def-bravais}
A **Bravais lattice** is an infinite set of points

$$
\mathbf R = n_1 \mathbf a_1 + n_2 \mathbf a_2 + n_3 \mathbf a_3, \qquad n_1, n_2, n_3 \in \Z,
$$ {#eq-lattice}

where $\mathbf a_1, \mathbf a_2, \mathbf a_3$ are three vectors not in one plane, called **primitive vectors**. Equivalently, it is a set of points from which the arrangement looks exactly the same, in orientation as well as distance, whichever point is chosen as the observer.
:::

The two descriptions agree. If the points are given by [[#eq-lattice]], then shifting the origin to any $\mathbf R'$ maps the set onto itself, because $\mathbf R - \mathbf R'$ again has integer coefficients. Conversely, a set that looks the same from every point is closed under subtraction, and one can show that it has a basis of three primitive vectors. The vectors $\mathbf R$ are the **lattice vectors** or **translations** of the crystal.

The primitive vectors are not unique. In two dimensions, $\mathbf a_1$ and $\mathbf a_2$ may be replaced by $\mathbf a_1$ and $\mathbf a_1 + \mathbf a_2$ without changing the set of points; in general, any integer matrix with determinant $\pm 1$ turns one primitive set into another. What is unique is the volume they span.

::: definition Primitive cell, unit cell and basis {#def-cell}
A **primitive cell** is a region of space that, translated by all the lattice vectors, fills space without overlap and contains exactly one lattice point. The parallelepiped spanned by $\mathbf a_1, \mathbf a_2, \mathbf a_3$ is one; its volume is

$$
V_c = \abs{\mathbf a_1 \cdot (\mathbf a_2 \times \mathbf a_3)}.
$$ {#eq-vcell}

The **Wigner–Seitz cell** is the primitive cell consisting of all points closer to a given lattice point than to any other. A **conventional unit cell** is a larger cell, chosen to display the symmetry, that fills space when translated by a subset of the lattice vectors. A **crystal structure** is a Bravais lattice together with a **basis**: a group of atoms at positions $\mathbf r_1, \dots, \mathbf r_p$ within the primitive cell, repeated at every lattice point.
:::

All primitive cells have the same volume $V_c$, because each holds one lattice point and a large region of volume $V$ contains $V/V_c$ of them. The Wigner–Seitz cell is worth its definition because it has the full symmetry of the lattice: no choice of primitive vectors went into it.

### The cubic lattices

In three dimensions there are exactly fourteen Bravais lattices, sorted by symmetry into seven crystal systems (cubic, tetragonal, orthorhombic, monoclinic, triclinic, trigonal, hexagonal). Bravais's count, published in 1848, is a theorem of geometry; the proof is a careful classification of the rotations compatible with a lattice, and it can be found in Ashcroft and Mermin, chapter 7. Three cubic lattices will carry most of this course.

- **Simple cubic (sc).** Primitive vectors $a\hat{\mathbf x}, a\hat{\mathbf y}, a\hat{\mathbf z}$. One lattice point per cube of side $a$, six nearest neighbours at distance $a$. Polonium is the only element that crystallises this way at ordinary pressure.
- **Body-centred cubic (bcc).** The cube corners plus the cube centre. Primitive vectors can be taken as $\frac a2(-1,1,1)$, $\frac a2(1,-1,1)$, $\frac a2(1,1,-1)$. Two lattice points per conventional cube, $V_c = a^3/2$, eight nearest neighbours at distance $\sqrt3\,a/2$. Iron at room temperature, sodium, chromium and tungsten are bcc.
- **Face-centred cubic (fcc).** The cube corners plus the centres of the six faces. Primitive vectors $\frac a2(0,1,1)$, $\frac a2(1,0,1)$, $\frac a2(1,1,0)$. Four lattice points per conventional cube, $V_c = a^3/4$, twelve nearest neighbours at distance $a/\sqrt2$. Copper, aluminium, silver, gold and nickel are fcc.

The number $a$ is the **lattice constant**, always the side of the conventional cube. Quoting the lattice constant of a bcc or fcc metal therefore does not quote the length of a primitive vector, and it is a frequent source of factors of $\sqrt2$.

Most crystals need a basis of more than one atom. Sodium chloride is an fcc lattice with a basis of $\mathrm{Na}$ at $(0,0,0)$ and $\mathrm{Cl}$ at $\frac a2(1,0,0)$: two interpenetrating fcc lattices, each ion surrounded by six of the other kind. Caesium chloride is simple cubic with $\mathrm{Cs}$ at the corner and $\mathrm{Cl}$ at the centre. It looks like bcc, but it is not, because the centre site holds a different atom and so is not equivalent to the corner. Diamond, silicon and germanium have the **diamond structure**: fcc with two identical atoms at $(0,0,0)$ and $\frac a4(1,1,1)$, each atom bonded tetrahedrally to four neighbours. Zinc blende ($\mathrm{GaAs}$, $\mathrm{ZnS}$) is the same with two different atoms. The crystal chemistry of these and many other structures is surveyed in Chemistry Atlas ([crystal structures](/learn/chemistry/lesson.php?c=materials-chemistry&l=crystal-structures)).

::: example Packing fractions {#ex-packing}
Treat the atoms as hard spheres that touch their nearest neighbours. Find the fraction of space they fill in the sc, bcc and fcc lattices.
::: solution
Spheres that touch have radius $r$ equal to half the nearest-neighbour distance. The packing fraction is the volume of the spheres in one conventional cube divided by $a^3$.

For sc, one sphere per cube with $r = a/2$:

$$
f_\mathrm{sc} = \frac{\frac43\pi (a/2)^3}{a^3} = \frac{\pi}{6} = 0.524.
$$

For bcc, two spheres per cube touching along the body diagonal, so $4r = \sqrt3\,a$:

$$
f_\mathrm{bcc} = \frac{2\cdot\frac43\pi\bigl(\sqrt3 a/4\bigr)^3}{a^3} = \frac{\sqrt3\,\pi}{8} = 0.680.
$$

For fcc, four spheres per cube touching along a face diagonal, so $4r = \sqrt2\,a$:

$$
f_\mathrm{fcc} = \frac{4\cdot\frac43\pi\bigl(\sqrt2 a/4\bigr)^3}{a^3} = \frac{\pi}{3\sqrt2} = 0.740.
$$

The fcc value is the densest possible packing of equal spheres, a fact conjectured by Kepler and proved by Hales in 1998. Hexagonal close packing achieves the same fraction with a different stacking of the same close-packed layers. Metals with no directional bonding tend to choose one of the two.
:::
:::

::: example The density of copper {#ex-cu-density}
Copper is fcc with lattice constant $a = 3.615\,\text{Å}$ at room temperature, and its molar mass is $63.546\,\mathrm{g/mol}$. Predict its density.
::: solution
The conventional cube contains four atoms: eight corners each shared by eight cubes, and six faces each shared by two, so $8\cdot\frac18 + 6\cdot\frac12 = 4$. The mass of one atom is $M/N_A$. Hence

$$
\rho = \frac{4M}{N_A a^3} = \frac{4 \times 63.546\times10^{-3}\,\mathrm{kg/mol}}{(6.02214\times10^{23}\,\mathrm{mol^{-1}})(3.615\times10^{-10}\,\mathrm{m})^3} = 8.93\times10^{3}\,\mathrm{kg/m^3}.
$$

The handbook density of copper is $8.96\,\mathrm{g/cm^3}$. The agreement to a third of a per cent is a test of the whole picture: atoms on an fcc lattice, with a lattice constant that is measured, as we shall see, by X-ray diffraction. Run the argument backwards and a measured density and a measured lattice constant give Avogadro's number; that is how the most precise determinations of $N_A$ were made before its value was fixed by definition in 2019.
:::
:::

::: quiz
The honeycomb pattern of carbon atoms in graphene repeats in the plane. Is the set of carbon positions a Bravais lattice?
- [ ] Yes, because it is periodic.
- [x] No; it is a triangular Bravais lattice with a two-atom basis.
- [ ] No, because the atoms do not touch.
- [ ] Yes, but only if the two sublattices are ignored.
::: solution
Stand on one carbon atom: its three neighbours point "up-left, up-right, down". On a neighbouring atom they point "down-left, down-right, up". The surroundings are the same distances but rotated, so the two sites are not equivalent, and the set fails the second form of [[#def-bravais]]. The honeycomb is a triangular lattice with two atoms per primitive cell. Periodicity alone is not enough; every point must see the same view.
:::
:::

## Lattice planes and Miller indices {#planes}

Any three lattice points not on a line define a plane containing infinitely many lattice points, called a **lattice plane**. Translating it by all lattice vectors produces a family of parallel, equally spaced planes that together contain every lattice point. Diffraction is about these families, so we need a label for them.

::: definition Miller indices {#def-miller}
Take a family of lattice planes and the plane of the family nearest the origin that does not pass through it. Let it cut the axes along the conventional cell vectors at $x_1 \mathbf a$, $x_2 \mathbf b$, $x_3 \mathbf c$. The **Miller indices** $(hkl)$ of the family are the reciprocals $1/x_1, 1/x_2, 1/x_3$ multiplied by the smallest factor that makes them integers with no common divisor. A plane parallel to an axis has intercept $\infty$ and index $0$; a negative index is written with a bar, $(\bar1 10)$. The **interplanar spacing** $d_{hkl}$ is the distance between neighbouring planes of the family.
:::

A plane cutting the cubic axes at $(a, \infty, \infty)$ is $(100)$, a cube face. One cutting at $(a, a, \infty)$ is $(110)$, through a face diagonal. One cutting at $(a,a,a)$ is $(111)$, perpendicular to a body diagonal. In a cubic crystal $(100)$, $(010)$ and $(001)$ are related by symmetry; the whole set of equivalent families is written $\{100\}$. For cubic lattices with the conventional cube as reference, the spacing is

$$
d_{hkl} = \frac{a}{\sqrt{h^2 + k^2 + l^2}},
$$ {#eq-dcubic}

which we will prove in [[#cor-dcubic]] from the reciprocal lattice. It is the formula used, more than any other, in analysing diffraction from cubic crystals. Miller indices are sometimes defined with respect to primitive vectors instead of the conventional cell; in this course they always refer to the conventional cube.

## The reciprocal lattice {#reciprocal}

A quantity that has the periodicity of the lattice, such as the electron density $n(\mathbf r)$ or the potential felt by an electron, satisfies $n(\mathbf r + \mathbf R) = n(\mathbf r)$ for every lattice vector $\mathbf R$. Such a function can be expanded in plane waves $e^{i\mathbf G\cdot \mathbf r}$, but only those plane waves that are themselves periodic: we need $e^{i\mathbf G\cdot(\mathbf r + \mathbf R)} = e^{i\mathbf G\cdot\mathbf r}$ for all $\mathbf R$.

::: definition Reciprocal lattice {#def-reciprocal}
The **reciprocal lattice** of a Bravais lattice $\{\mathbf R\}$ is the set of all wavevectors $\mathbf G$ such that

$$
e^{i\mathbf G\cdot\mathbf R} = 1 \qquad \text{for every lattice vector } \mathbf R.
$$ {#eq-recip-def}

The original lattice is called the **direct lattice**. The Wigner–Seitz cell of the reciprocal lattice is the **first Brillouin zone**.
:::

The definition does not yet show that the $\mathbf G$ form a lattice. The next theorem constructs it.

::: theorem Primitive vectors of the reciprocal lattice {#thm-recip-basis}
Let $\mathbf a_1, \mathbf a_2, \mathbf a_3$ be primitive vectors with $V = \mathbf a_1\cdot(\mathbf a_2\times\mathbf a_3)$, and define

$$
\mathbf b_1 = \frac{2\pi}{V}\,\mathbf a_2 \times \mathbf a_3, \qquad
\mathbf b_2 = \frac{2\pi}{V}\,\mathbf a_3 \times \mathbf a_1, \qquad
\mathbf b_3 = \frac{2\pi}{V}\,\mathbf a_1 \times \mathbf a_2.
$$ {#eq-bvectors}

Then $\mathbf a_i \cdot \mathbf b_j = 2\pi\,\delta_{ij}$, and the reciprocal lattice is exactly the set $\mathbf G = m_1\mathbf b_1 + m_2\mathbf b_2 + m_3\mathbf b_3$ with $m_1, m_2, m_3 \in \Z$. It is a Bravais lattice, with primitive cell volume $(2\pi)^3/V_c$.
:::

::: proof
First the dot products. $\mathbf a_1\cdot\mathbf b_1 = (2\pi/V)\,\mathbf a_1\cdot(\mathbf a_2\times\mathbf a_3) = 2\pi$. $\mathbf a_2\cdot\mathbf b_1 = (2\pi/V)\,\mathbf a_2\cdot(\mathbf a_2\times\mathbf a_3) = 0$, since a cross product is perpendicular to each factor, and likewise $\mathbf a_3\cdot\mathbf b_1 = 0$. The other two columns follow by cyclic permutation, using $\mathbf a_2\cdot(\mathbf a_3\times\mathbf a_1) = \mathbf a_3\cdot(\mathbf a_1\times\mathbf a_2) = V$.

The $\mathbf b_j$ are linearly independent: if $\sum_j c_j\mathbf b_j = 0$, dot with $\mathbf a_i$ to get $2\pi c_i = 0$. So any wavevector can be written $\mathbf k = \sum_j m_j \mathbf b_j$ with real $m_j$. For a lattice vector $\mathbf R = \sum_i n_i\mathbf a_i$,

$$
\mathbf k\cdot\mathbf R = \sum_{i,j} n_i m_j\, \mathbf a_i\cdot\mathbf b_j = 2\pi\,(n_1m_1 + n_2m_2 + n_3m_3).
$$

If every $m_j$ is an integer, this is $2\pi$ times an integer for all integer $n_i$, and [[#eq-recip-def]] holds. Conversely, if [[#eq-recip-def]] holds for every $\mathbf R$, take $\mathbf R = \mathbf a_1$: then $2\pi m_1$ is a multiple of $2\pi$, so $m_1\in\Z$, and similarly $m_2, m_3\in\Z$. The reciprocal lattice is therefore the integer span of the $\mathbf b_j$, a Bravais lattice. Its primitive cell volume is $\abs{\mathbf b_1\cdot(\mathbf b_2\times\mathbf b_3)}$; the matrix with rows $\mathbf a_i$ times the matrix with columns $\mathbf b_j$ is $2\pi$ times the identity, so the product of their determinants is $(2\pi)^3$ and the volume is $(2\pi)^3/V_c$.
:::

The relation $\mathbf a_i\cdot\mathbf b_j = 2\pi\delta_{ij}$ is symmetric between the two sets, so the reciprocal of the reciprocal lattice is the direct lattice. Long primitive vectors give short reciprocal ones: the reciprocal lattice of a simple cubic lattice of side $a$ is simple cubic of side $2\pi/a$.

::: example The reciprocal of fcc is bcc {#ex-fcc-recip}
Find the reciprocal lattice of the fcc lattice with conventional cube side $a$, and the shortest nonzero reciprocal lattice vectors.
::: solution
Use $\mathbf a_1 = \frac a2(0,1,1)$, $\mathbf a_2 = \frac a2(1,0,1)$, $\mathbf a_3 = \frac a2(1,1,0)$. The cross product is

$$
\mathbf a_2\times\mathbf a_3 = \frac{a^2}{4}\bigl((0)(0) - (1)(1),\ (1)(1) - (1)(0),\ (1)(1) - (0)(1)\bigr) = \frac{a^2}{4}(-1, 1, 1),
$$

and $V = \mathbf a_1\cdot(\mathbf a_2\times\mathbf a_3) = \frac a2\cdot\frac{a^2}{4}(0 + 1 + 1) = a^3/4$, the volume of a quarter cube, as it should be. So

$$
\mathbf b_1 = \frac{2\pi}{a^3/4}\cdot\frac{a^2}{4}(-1,1,1) = \frac{2\pi}{a}(-1, 1, 1),
$$

and by symmetry $\mathbf b_2 = \frac{2\pi}{a}(1,-1,1)$, $\mathbf b_3 = \frac{2\pi}{a}(1,1,-1)$. These are exactly the primitive vectors of a bcc lattice whose conventional cube has side $4\pi/a$. The shortest nonzero vectors are the eight $\frac{2\pi}{a}(\pm1,\pm1,\pm1)$, of length $2\sqrt3\,\pi/a$, and next come the six $\frac{2\pi}{a}(\pm2, 0, 0)$ and permutations, of length $4\pi/a$. The first Brillouin zone of an fcc crystal is the Wigner–Seitz cell of this bcc lattice, a truncated octahedron with eight hexagonal faces bisecting the first set and six square faces bisecting the second. That shape appears in every band-structure diagram of copper, silicon and gallium arsenide.
:::
:::

The reciprocal lattice is not an abstraction laid on top of the crystal. Each of its vectors is attached to a family of lattice planes, and its length encodes their spacing.

::: theorem Reciprocal vectors and lattice planes {#thm-planes}
For each family of lattice planes with spacing $d$ there are reciprocal lattice vectors perpendicular to the planes, and the shortest of them has length $2\pi/d$. Conversely, for each nonzero reciprocal lattice vector $\mathbf G$ there is a family of lattice planes perpendicular to $\mathbf G$ with spacing $d$ such that $\abs{\mathbf G} = 2\pi n/d$ for some positive integer $n$.
:::

::: proof
Converse first. Let $\mathbf G \neq 0$ be in the reciprocal lattice and write $\mathbf G = n\mathbf G_0$, where $\mathbf G_0$ is the shortest reciprocal lattice vector parallel to $\mathbf G$ and $n$ is a positive integer. For any lattice vector, $\mathbf G_0\cdot\mathbf R = 2\pi m$ with $m\in\Z$. The lattice points with a given $m$ lie in the plane $\mathbf G_0\cdot\mathbf r = 2\pi m$, which is perpendicular to $\mathbf G_0$, and consecutive values of $m$ give planes a distance $2\pi/\abs{\mathbf G_0}$ apart. Every lattice point lies on one of these planes. Each plane actually contains lattice points: with $\mathbf G_0 = \sum m_j\mathbf b_j$ the integers $m_j$ have no common factor (otherwise $\mathbf G_0$ would not be shortest), so by Bézout there are integers $n_j$ with $\sum n_jm_j = 1$, giving a lattice point $\mathbf R_1$ with $m = 1$, and multiples of $\mathbf R_1$ reach every $m$. A plane containing one lattice point contains a two-dimensional lattice of them, since the lattice vectors with $\mathbf G_0\cdot\mathbf R = 0$ span that plane. So the planes form a family of lattice planes with spacing $d = 2\pi/\abs{\mathbf G_0}$, and $\abs{\mathbf G} = 2\pi n/d$.

Now the direct statement. Given a family of planes with spacing $d$ and unit normal $\hat{\mathbf n}$, with one plane through the origin, every lattice point satisfies $\hat{\mathbf n}\cdot\mathbf R = jd$ for an integer $j$. Put $\mathbf G = (2\pi/d)\hat{\mathbf n}$. Then $e^{i\mathbf G\cdot\mathbf R} = e^{2\pi i j} = 1$ for all $\mathbf R$, so $\mathbf G$ is in the reciprocal lattice. A shorter parallel vector $(2\pi/d')\hat{\mathbf n}$ with $d' > d$ would need $jd/d'$ to be an integer for every $j$ that occurs, including $j = 1$ (the neighbouring plane contains lattice points), which is impossible for $d' > d$. So $2\pi/d$ is the shortest length.
:::

::: corollary Spacing of cubic planes {#cor-dcubic}
In a cubic crystal with conventional cube side $a$, the family with Miller indices $(hkl)$ is perpendicular to $\mathbf G = \frac{2\pi}{a}(h,k,l)$, and its spacing is $d_{hkl} = a/\sqrt{h^2+k^2+l^2}$.
:::

::: proof
Work in the simple cubic lattice generated by the conventional cube; its reciprocal lattice is $\frac{2\pi}{a}(h,k,l)$ with integer components. The plane with intercepts $a/h, a/k, a/l$ is $hx + ky + lz = a$, whose normal is $(h,k,l)$, so it is perpendicular to $\mathbf G = \frac{2\pi}{a}(h,k,l)$. With $h,k,l$ coprime this $\mathbf G$ is the shortest in its direction, and [[#thm-planes]] gives $d = 2\pi/\abs{\mathbf G} = a/\sqrt{h^2+k^2+l^2}$. For bcc and fcc the true lattice has more points than the simple cubic one, and some families of the sc lattice are interleaved by extra planes. Those families appear in diffraction with the same $d_{hkl}$ formula but with indices that the structure factor of [[#structure-factor]] restricts.
:::

::: intuition Why "reciprocal"
A family of planes is a set of wavefronts. The reciprocal lattice vector is the wavevector of those wavefronts: it points across the planes, and its length is $2\pi$ divided by their spacing, exactly as $k = 2\pi/\lambda$ for a wave. Closely spaced planes have long $\mathbf G$. A dense reciprocal lattice belongs to a dilute direct lattice. Every periodic function of position is a superposition of these wavefronts, $n(\mathbf r) = \sum_{\mathbf G} n_{\mathbf G}\,e^{i\mathbf G\cdot\mathbf r}$, which is the Fourier series of [[math-methods/fourier]] in three dimensions.
:::

## Diffraction: Bragg and Laue {#diffraction}

X-rays have wavelengths of order an ångström, comparable to interatomic distances, so a crystal acts on them as a grating. A copper anode bombarded by electrons emits the characteristic $\mathrm{K\alpha}$ line at $\lambda = 1.5406\,\text{Å}$, a photon energy of $8.05\,\mathrm{keV}$, and that is the wavelength of most laboratory diffractometers.

### The Bragg picture

The Braggs pictured a family of lattice planes as a stack of weakly reflecting mirrors. Each plane reflects specularly a small part of the incident beam, with angle of reflection equal to angle of incidence. The angle $\theta$ is measured from the plane, not from its normal. Rays reflected from adjacent planes travel paths that differ by $2d\sin\theta$: the lower ray goes an extra distance $d\sin\theta$ down to its plane and the same distance back up. The reflections add constructively when that difference is a whole number of wavelengths:

$$
2d\sin\theta = n\lambda, \qquad n = 1, 2, 3, \dots
$$ {#eq-bragg}

This is **Bragg's law**. The beam is deflected through $2\theta$ in total, and it is $2\theta$ that a diffractometer records. Since $\sin\theta \le 1$, only planes with $d \ge \lambda/2$ can reflect, which is why visible light, with $\lambda$ thousands of times $d$, is not diffracted by a crystal.

The mirror picture is a model, not a derivation: it does not say why atoms in a plane should reflect like a mirror, or what the intensity is. Von Laue's picture answers both.

### The Laue picture

Let a plane wave with wavevector $\mathbf k$ fall on the crystal and consider the wave scattered elastically into the direction of wavevector $\mathbf k'$, with $\abs{\mathbf k'} = \abs{\mathbf k} = 2\pi/\lambda$. A small volume at position $\mathbf r$, holding electron density $n(\mathbf r)$, scatters with an amplitude proportional to $n(\mathbf r)$ and a phase fixed by the path: relative to a scatterer at the origin, the incident wave arrives with extra phase $\mathbf k\cdot\mathbf r$ and the outgoing wave leaves with phase $-\mathbf k'\cdot\mathbf r$. Far from the crystal, the total scattered amplitude is therefore proportional to

$$
F(\Delta\mathbf k) = \int n(\mathbf r)\,e^{-i\Delta\mathbf k\cdot\mathbf r}\,\dd^3 r, \qquad \Delta\mathbf k = \mathbf k' - \mathbf k.
$$ {#eq-amplitude}

The **scattering vector** $\Delta\mathbf k$ is the momentum transfer divided by $\hbar$. Insert the Fourier series of the periodic density, $n(\mathbf r) = \sum_{\mathbf G} n_{\mathbf G} e^{i\mathbf G\cdot\mathbf r}$:

$$
F(\Delta\mathbf k) = \sum_{\mathbf G} n_{\mathbf G} \int e^{i(\mathbf G - \Delta\mathbf k)\cdot\mathbf r}\,\dd^3 r.
$$

For a large crystal the integral is negligibly small unless the exponent vanishes, in which case it equals the volume of the crystal. A sharp diffracted beam therefore appears only when

$$
\Delta\mathbf k = \mathbf k' - \mathbf k = \mathbf G \quad \text{for some reciprocal lattice vector } \mathbf G.
$$ {#eq-laue}

This is the **Laue condition**: the scattering vector must be a reciprocal lattice vector. Its amplitude is then proportional to the Fourier coefficient $n_{\mathbf G}$. The reason for the sharpness is the same as for a grating with many slits, and the figure below shows it for a line of $N$ atoms.

::: widget plot
f: sin(pi*N*x)^2/(N^2*sin(pi*x)^2)
x: -0.49, 3.49
y: 0, 1.05
sliders: N=6:1:40:1
caption: The intensity scattered by a line of $N$ identical atoms with spacing $a$, divided by its maximum $N^2$, against $x = \Delta k\,a/2\pi$. The peaks sit at integer $x$, where $\Delta k$ is a reciprocal lattice vector $2\pi m/a$. Increase $N$ and watch them narrow: the width is about $1/N$ while the height (before dividing) grows as $N^2$, so the integrated intensity grows as $N$. For a crystal with $10^7$ atoms along each edge only the Laue condition survives. Set $N = 1$ and the single atom scatters in every direction.
:::

::: theorem Bragg and Laue are equivalent {#thm-bragg-laue}
For elastic scattering, $\abs{\mathbf k'} = \abs{\mathbf k} = 2\pi/\lambda$, the Laue condition $\mathbf k' - \mathbf k = \mathbf G$ holds for some nonzero reciprocal lattice vector $\mathbf G$ if and only if the incident and scattered beams make equal angles $\theta$ with a family of lattice planes perpendicular to $\mathbf G$, with spacing $d$, satisfying $2d\sin\theta = n\lambda$ where $\abs{\mathbf G} = 2\pi n/d$.
:::

::: proof
Suppose $\mathbf k' = \mathbf k + \mathbf G$. Squaring and using $\abs{\mathbf k'} = \abs{\mathbf k}$ gives $2\mathbf k\cdot\mathbf G + G^2 = 0$, that is,

$$
\mathbf k\cdot\hat{\mathbf G} = -\tfrac12 \abs{\mathbf G},
$$

and then $\mathbf k'\cdot\hat{\mathbf G} = \mathbf k\cdot\hat{\mathbf G} + \abs{\mathbf G} = +\tfrac12\abs{\mathbf G}$. The components of $\mathbf k$ and $\mathbf k'$ along $\hat{\mathbf G}$ are equal and opposite, and their components perpendicular to $\hat{\mathbf G}$ are equal because $\mathbf k' - \mathbf k$ has no perpendicular part. So $\mathbf k'$ is the mirror image of $\mathbf k$ in a plane perpendicular to $\mathbf G$: specular reflection. Let $\theta$ be the angle between $\mathbf k$ and that plane. The component of $\mathbf k$ normal to the plane has magnitude $k\sin\theta$, so

$$
k\sin\theta = \tfrac12\abs{\mathbf G}, \qquad \frac{2\pi}{\lambda}\sin\theta = \frac{1}{2}\cdot\frac{2\pi n}{d},
$$

where [[#thm-planes]] has been used to write $\abs{\mathbf G} = 2\pi n/d$ for the family of lattice planes perpendicular to $\mathbf G$. Rearranged, $2d\sin\theta = n\lambda$.

Conversely, suppose the beams make equal angles $\theta$ with a family of planes of spacing $d$, with $\mathbf k'$ the mirror image of $\mathbf k$, and $2d\sin\theta = n\lambda$. The difference $\mathbf k' - \mathbf k$ is then normal to the planes with magnitude $2k\sin\theta = (4\pi/\lambda)\sin\theta = 2\pi n/d$. By [[#thm-planes]], $(2\pi/d)\hat{\mathbf n}$ is a reciprocal lattice vector, hence so is $n$ times it, and $\mathbf k' - \mathbf k$ is a reciprocal lattice vector.
:::

The proof also says how to read the order $n$. An $n$th-order reflection from planes of spacing $d$ is the same thing as a first-order reflection from fictitious planes of spacing $d/n$. Crystallographers therefore drop the $n$ and write the $(200)$ reflection instead of "the second-order $(100)$ reflection", using [[#eq-bragg]] with $n = 1$ and $d_{hkl}$ from [[#eq-dcubic]] with indices that may have a common factor.

::: warning Angles in diffraction
Three errors recur. First, $\theta$ in Bragg's law is the angle between the beam and the planes, not between the beam and the normal; using the angle of incidence of optics gives $\cos$ where $\sin$ belongs. Second, the diffractometer reports $2\theta$, the total deflection, and halving it is easy to forget. Third, the Laue condition contains $\mathbf G$ with no factor of $2$, while Bragg's law has $2d$: the factor reappears through $\abs{\mathbf k'-\mathbf k} = 2k\sin\theta$. If an answer comes out with $\sin\theta > 1$, one of these has gone wrong, or that reflection is not reachable at that wavelength.
:::

The Laue condition has a construction due to Ewald. Draw the reciprocal lattice, draw $\mathbf k$ ending at the origin, and draw a sphere of radius $k$ centred at the start of $\mathbf k$. Any reciprocal lattice point on the sphere gives a diffracted beam pointing from the centre to it. For a fixed crystal and a single wavelength, the sphere generically passes through no lattice point other than the origin, and nothing is seen. Experiments therefore vary something. Laue used a continuous spectrum, giving a range of sphere radii; the Braggs rotated the crystal; the **powder method** of Debye and Scherrer uses a fine powder, in which every orientation is present, so every reflection with $d \ge \lambda/2$ appears as a cone of half-angle $2\theta$ about the beam.

## The structure factor {#structure-factor}

The Laue condition says where the beams may go. How bright they are depends on what sits in the cell. Let the basis have atoms at $\mathbf r_1, \dots, \mathbf r_p$, and let the electron density near atom $j$ be $n_j(\mathbf r - \mathbf r_j)$. Evaluating [[#eq-amplitude]] at $\Delta\mathbf k = \mathbf G$ cell by cell, every cell contributes the same amount, so the amplitude is the number of cells $N$ times

$$
\int_\text{cell} n(\mathbf r)\,e^{-i\mathbf G\cdot\mathbf r}\,\dd^3r = \sum_{j=1}^{p} e^{-i\mathbf G\cdot\mathbf r_j}\int n_j(\boldsymbol\rho)\,e^{-i\mathbf G\cdot\boldsymbol\rho}\,\dd^3\rho.
$$

::: definition Structure factor {#def-structure-factor}
The **atomic form factor** of atom $j$ is $f_j(\mathbf G) = \int n_j(\boldsymbol\rho)\,e^{-i\mathbf G\cdot\boldsymbol\rho}\,\dd^3\rho$. The **geometric structure factor** of the basis is

$$
S_{\mathbf G} = \sum_{j=1}^{p} f_j(\mathbf G)\,e^{-i\mathbf G\cdot\mathbf r_j}.
$$ {#eq-structure}

The intensity of the reflection at $\mathbf G$ is proportional to $\abs{S_{\mathbf G}}^2$.
:::

At $\mathbf G = 0$ the form factor is the number of electrons on the atom, $Z$ for a neutral atom, and it falls with $\abs{\mathbf G}$ because the electron cloud has a finite size. Heavier atoms scatter X-rays more strongly; hydrogen is nearly invisible, which is one reason neutron diffraction, scattering from nuclei, complements X-rays. What matters most is the interference between atoms of the basis. If the phases in [[#eq-structure]] cancel, a reflection that the lattice allows has zero intensity: a **systematic absence**.

The most important case is a cubic Bravais lattice described with the conventional cube. The cube is not primitive for bcc or fcc, but we may treat bcc as a simple cubic lattice with a two-point basis and fcc as simple cubic with a four-point basis, all points identical. The Laue condition then runs over the sc reciprocal lattice $\mathbf G = \frac{2\pi}{a}(h,k,l)$, and the structure factor removes the vectors that are not in the true reciprocal lattice.

::: theorem Systematic absences in bcc and fcc {#thm-absences}
For a monatomic crystal described by its conventional cube, with $\mathbf G = \frac{2\pi}{a}(h,k,l)$ and form factor $f$,

$$
S^\mathrm{bcc}_{hkl} = f\bigl(1 + (-1)^{h+k+l}\bigr) =
\begin{cases} 2f, & h+k+l \text{ even}, \\ 0, & h+k+l \text{ odd}; \end{cases}
$$ {#eq-s-bcc}

$$
S^\mathrm{fcc}_{hkl} = f\bigl(1 + (-1)^{h+k} + (-1)^{k+l} + (-1)^{h+l}\bigr) =
\begin{cases} 4f, & h,k,l \text{ all even or all odd}, \\ 0, & \text{otherwise}. \end{cases}
$$ {#eq-s-fcc}
:::

::: proof
For bcc the basis is $\mathbf r_1 = 0$, $\mathbf r_2 = \frac a2(1,1,1)$. Then $\mathbf G\cdot\mathbf r_2 = \pi(h+k+l)$ and $e^{-i\pi(h+k+l)} = (-1)^{h+k+l}$, so [[#eq-structure]] gives [[#eq-s-bcc]].

For fcc the basis is $0$, $\frac a2(0,1,1)$, $\frac a2(1,0,1)$, $\frac a2(1,1,0)$, with phases $\pi(k+l)$, $\pi(h+l)$, $\pi(h+k)$, which gives the first form of [[#eq-s-fcc]]. If $h,k,l$ have the same parity, every pairwise sum is even and $S = 4f$. If not, two of them share a parity and the third differs; then exactly one of the three pairwise sums is even and two are odd, and $S = f(1 + 1 - 1 - 1) = 0$.
:::

The theorem is consistent with [[#ex-fcc-recip]]: the surviving fcc indices $(111)$, $(200)$, $(220)$, $(311)$, … are exactly the points $\frac{2\pi}{a}(h,k,l)$ of the bcc reciprocal lattice found there. The structure factor did not invent anything; it reconstructed the true reciprocal lattice from an oversized one.

::: example The powder pattern of copper {#ex-cu-xrd}
A copper powder is examined with copper $\mathrm{K\alpha}$ radiation, $\lambda = 1.5406\,\text{Å}$. Copper is fcc with $a = 3.6149\,\text{Å}$. Predict the angles $2\theta$ of the first five reflections.
::: solution
By [[#thm-absences]] the allowed indices have $h,k,l$ all even or all odd. In order of increasing $s = h^2+k^2+l^2$ they are $(111)$ with $s = 3$, $(200)$ with $s = 4$, $(220)$ with $s = 8$, $(311)$ with $s = 11$ and $(222)$ with $s = 12$. The values $s = 1, 2, 5, 6, 9, 10$ are absent. For each line, [[#eq-dcubic]] gives $d$ and Bragg's law with $n = 1$ gives $\sin\theta = \lambda/2d$:

| $hkl$ | $s$ | $d\ (\text{Å})$ | $\theta$ | $2\theta$ |
|---|---|---|---|---|
| $111$ | $3$ | $2.0871$ | $21.66^\circ$ | $43.32^\circ$ |
| $200$ | $4$ | $1.8075$ | $25.23^\circ$ | $50.45^\circ$ |
| $220$ | $8$ | $1.2781$ | $37.06^\circ$ | $74.13^\circ$ |
| $311$ | $11$ | $1.0899$ | $44.97^\circ$ | $89.94^\circ$ |
| $222$ | $12$ | $1.0435$ | $47.58^\circ$ | $95.15^\circ$ |

For the first line, $d_{111} = 3.6149/\sqrt3 = 2.0871\,\text{Å}$ and $\sin\theta = 1.5406/(2\times2.0871) = 0.36908$, so $\theta = 21.66^\circ$. The measured pattern of copper, in the standard powder-diffraction files, has its strongest peaks at $43.3^\circ$, $50.4^\circ$ and $74.1^\circ$, as computed. The spacing of the first two lines, close together, followed by a gap, is the fingerprint of fcc. Read in reverse, the position of a single indexed peak gives $a$ to four or five significant figures, which is how the lattice constant used in [[#ex-cu-density]] was obtained.
:::
:::

::: example Indexing an unknown cubic pattern {#ex-indexing}
A cubic metal gives, with $\lambda = 1.5406\,\text{Å}$, lines at $2\theta = 40.26^\circ, 58.25^\circ, 73.19^\circ, 87.00^\circ, 100.63^\circ, 114.93^\circ, 131.17^\circ$. Identify the lattice and find $a$.
::: solution
From Bragg's law and [[#eq-dcubic]],

$$
\sin^2\theta = \frac{\lambda^2}{4a^2}\,(h^2+k^2+l^2),
$$

so the values of $\sin^2\theta$ must be proportional to integers $s$ of the form $h^2+k^2+l^2$. Halving the angles and squaring the sines gives

$$
0.1184,\ 0.2369,\ 0.3554,\ 0.4738,\ 0.5922,\ 0.7108,\ 0.8292,
$$

in the ratios $1 : 2.000 : 3.00 : 4.00 : 5.00 : 6.00 : 7.00$. For fcc the ratios would begin $3:4:8$, which these do not. For simple cubic every $s$ is allowed except those that are not sums of three squares, the first of which is $7$; a seventh line in the ratio $7$ is therefore impossible for sc. For bcc the allowed $s$ are the even ones, $2, 4, 6, 8, 10, 12, 14$, in the ratios $1:2:3:4:5:6:7$. The lattice is bcc, and the first line is $(110)$ with $s = 2$:

$$
a = \frac{\lambda\sqrt{s}}{2\sin\theta} = \frac{1.5406\,\text{Å}\times\sqrt2}{2\sqrt{0.11844}} = 3.165\,\text{Å}.
$$

This is tungsten, with $a = 3.165\,\text{Å}$ and density $2\times183.84\,\mathrm{g/mol}/(N_A a^3) = 19.25\,\mathrm{g/cm^3}$. Had only the first six lines been recorded, sc and bcc could not have been told apart from positions alone; the density would then decide, since an sc lattice with $a = 3.165/\sqrt2\,\text{Å}$ would imply a different density.
:::
:::

With a basis of different atoms the cancellation is incomplete. In rock salt, $\mathrm{NaCl}$, the fcc factor of [[#eq-s-fcc]] multiplies the basis factor $f_\mathrm{Na} + f_\mathrm{Cl}(-1)^{h+k+l}$. All-even reflections are strong, $\propto f_\mathrm{Na}+f_\mathrm{Cl}$, and all-odd ones weak, $\propto f_\mathrm{Cl}-f_\mathrm{Na}$. In $\mathrm{KCl}$ the two ions are isoelectronic, each with $18$ electrons, so $f_\mathrm{K}\approx f_\mathrm{Cl}$ and the odd reflections almost vanish: X-rays see a simple cubic lattice of side $a/2$. The next figure lets you produce the one-dimensional version.

::: widget plot
f: (1 + F^2 + 2*F*cos(2*pi*u*x))/(1 + F)^2*sin(12*pi*x)^2/(144*sin(pi*x)^2)
x: -0.49, 4.49
y: 0, 1.05
sliders: u=0.3:0:0.5:0.01; F=1:0:1:0.05
caption: A chain of $12$ cells of length $a$, each holding an atom of form factor $1$ at $0$ and one of form factor $F$ at $ua$, plotted against $x = \Delta k\,a/2\pi$. The lattice fixes the peak positions at integer $x$; the basis sets their heights through $\abs{1 + F e^{2\pi i u x}}^2$. Slide $u$ to $0.5$ with $F = 1$: the odd peaks vanish and the chain is revealed as a lattice of spacing $a/2$, the analogue of the bcc absences. Then lower $F$, as for $\mathrm{NaCl}$, and the odd peaks return, weak but present.
:::

::: quiz
Which of these reflections appear in the powder pattern of a bcc metal?
- [x] $(110)$
- [ ] $(111)$
- [x] $(200)$
- [ ] $(210)$
- [x] $(211)$
::: solution
By [[#eq-s-bcc]] a bcc reflection survives when $h+k+l$ is even: $(110)$ gives $2$, $(200)$ gives $2$, $(211)$ gives $4$. The $(111)$ and $(210)$ reflections have odd sums and are absent. Physically, for $(100)$-type planes of the cube, the body-centre atoms form an extra plane halfway between, scattering exactly out of phase. The rule "all even or all odd" belongs to fcc, not bcc.
:::
:::

::: history From Laue's spots to the Braggs' law
In 1912, in Munich, Max von Laue suggested that a crystal should diffract X-rays if their wavelength were comparable to atomic spacings; Walter Friedrich and Paul Knipping passed a beam through copper sulphate and recorded the pattern of spots that settled two questions at once, that X-rays are waves and that crystals are lattices. Laue received the Nobel Prize for physics in 1914. Later in 1912 and in 1913 William Lawrence Bragg, then a student at Cambridge, reinterpreted the spots as reflections from lattice planes, and with his father William Henry Bragg built the X-ray spectrometer and determined the structures of $\mathrm{NaCl}$, $\mathrm{KCl}$ and diamond. Father and son shared the 1915 Nobel Prize; the younger Bragg, aged 25, remains the youngest physics laureate. The fourteen lattices had been enumerated by Auguste Bravais in 1848, the reciprocal-lattice construction was developed by Paul Ewald in 1913 and 1921, and Peter Debye and Paul Scherrer introduced powder diffraction in 1916.
:::

## Where this leads {#leads}

The reciprocal lattice is the arena of the rest of the course. In [[condensed-matter/lattice-vibrations]] the wavevector of a lattice vibration is defined only up to a reciprocal lattice vector, and the first Brillouin zone holds one copy of each mode. In [[condensed-matter/free-electrons]] the electron states are counted in $\mathbf k$-space, and in [[condensed-matter/band-structure]] the Laue condition reappears as the condition for an electron wave to be Bragg-reflected by the lattice, which is where band gaps open. Neutron scattering, which measures phonons and magnetic order, is the Laue condition with energy transfer added. The mathematics behind all of it is the Fourier series of [[math-methods/fourier]].

::: summary
- A crystal is a Bravais lattice $\mathbf R = \sum n_i\mathbf a_i$ plus a basis of atoms repeated at each point; sc, bcc and fcc have $1$, $2$ and $4$ lattice points per conventional cube.
- The reciprocal lattice is the set of $\mathbf G$ with $e^{i\mathbf G\cdot\mathbf R} = 1$; its primitive vectors satisfy $\mathbf a_i\cdot\mathbf b_j = 2\pi\delta_{ij}$, and fcc and bcc are reciprocal to each other.
- Each reciprocal lattice vector is normal to a family of lattice planes, with $\abs{\mathbf G_\text{min}} = 2\pi/d$; in cubic crystals $d_{hkl} = a/\sqrt{h^2+k^2+l^2}$.
- Diffraction requires $\mathbf k' - \mathbf k = \mathbf G$ (Laue), which for elastic scattering is equivalent to $2d\sin\theta = n\lambda$ (Bragg).
- The intensity of a reflection is $\propto\abs{S_\mathbf G}^2$ with $S_\mathbf G = \sum_j f_j e^{-i\mathbf G\cdot\mathbf r_j}$; bcc needs $h+k+l$ even, fcc needs $h,k,l$ unmixed.
- The ratios of $\sin^2\theta$ in a powder pattern identify the cubic lattice, and one indexed line gives the lattice constant.
:::

## Exercises {#exercises}

::: exercise Nearest neighbours in iron {level=1 check="2.482"}
Iron at room temperature is bcc with $a = 2.8665\,\text{Å}$. Find the nearest-neighbour distance in ångströms.
::: solution
In bcc the nearest neighbours of a corner atom are the eight body-centre atoms of the cubes that share the corner. The distance from a corner to the centre is half the body diagonal:

$$
d_\mathrm{nn} = \frac{\sqrt3}{2}a = 0.86603 \times 2.8665\,\text{Å} = 2.482\,\text{Å}.
$$

The next neighbours, six of them along the cube edges, are at $a = 2.8665\,\text{Å}$, only $15\%$ further away. That small gap is why bcc is sometimes said to have "eight plus six" neighbours.
:::
:::

::: exercise A Bragg angle {level=1 check="15.85"}
The $(200)$ planes of rock salt have spacing $d = 2.8201\,\text{Å}$. Find the Bragg angle $\theta$, in degrees, for copper $\mathrm{K\alpha}$ radiation, $\lambda = 1.5406\,\text{Å}$, in first order.
::: solution
From [[#eq-bragg]] with $n = 1$,

$$
\sin\theta = \frac{\lambda}{2d} = \frac{1.5406}{2\times2.8201} = 0.27315, \qquad \theta = 15.85^\circ.
$$

The detector would be at $2\theta = 31.70^\circ$. The spacing is $a/2$ for $a = 5.6402\,\text{Å}$, as [[#eq-dcubic]] gives for $(200)$.
:::
:::

::: exercise Simple cubic packing {level=1 check="pi/6"}
Show that hard spheres touching on a simple cubic lattice fill a fraction $\pi/6$ of space, and give that fraction.
::: solution
There is one sphere per cube of side $a$, and neighbours touch along an edge, so $r = a/2$. The fraction is $\frac43\pi(a/2)^3/a^3 = \pi/6 \approx 0.524$, as in [[#ex-packing]]. Barely more than half the space is filled, which is one reason almost no element adopts this structure.
:::
:::

::: exercise The reciprocal of bcc {level=2 check="sqrt(2)"}
Using primitive vectors $\mathbf a_1 = \frac a2(-1,1,1)$, $\mathbf a_2 = \frac a2(1,-1,1)$, $\mathbf a_3 = \frac a2(1,1,-1)$, find the reciprocal lattice of bcc. Give the length of its shortest nonzero vector in units of $2\pi/a$.
::: solution
Compute $\mathbf a_2\times\mathbf a_3 = \frac{a^2}{4}\bigl((-1)(-1) - (1)(1),\ (1)(1) - (1)(-1),\ (1)(1) - (-1)(1)\bigr) = \frac{a^2}{4}(0, 2, 2)$ and $V = \mathbf a_1\cdot(\mathbf a_2\times\mathbf a_3) = \frac{a^3}{8}(0 + 2 + 2) = a^3/2$. So

$$
\mathbf b_1 = \frac{2\pi}{a^3/2}\cdot\frac{a^2}{4}(0,2,2) = \frac{2\pi}{a}(0,1,1),
$$

and by symmetry $\mathbf b_2 = \frac{2\pi}{a}(1,0,1)$, $\mathbf b_3 = \frac{2\pi}{a}(1,1,0)$. These are fcc primitive vectors for a cube of side $4\pi/a$. The shortest vectors are the twelve of the form $\frac{2\pi}{a}(\pm1,\pm1,0)$, of length $\sqrt2$ in units of $2\pi/a$. They correspond to the $\{110\}$ reflections, which by [[#eq-s-bcc]] are the first lines in a bcc pattern.
:::
:::

::: exercise The first line of iron {level=2 check="44.67"}
Predict the angle $2\theta$, in degrees, of the first line in the powder pattern of bcc iron, $a = 2.8665\,\text{Å}$, with $\lambda = 1.5406\,\text{Å}$.
::: solution
The smallest $s = h^2+k^2+l^2$ with $h+k+l$ even and not all zero is $s = 2$, the $(110)$ reflection. Then $d_{110} = 2.8665/\sqrt2 = 2.0269\,\text{Å}$ and

$$
\sin\theta = \frac{1.5406}{2\times2.0269} = 0.38004, \qquad \theta = 22.335^\circ, \qquad 2\theta = 44.67^\circ.
$$

It lies close to the copper $(111)$ line at $43.32^\circ$, which is why an iron–copper mixture needs care.
:::
:::

::: exercise The diamond structure factor {level=2 check="32"}
The diamond structure is fcc with identical atoms at $0$ and $\frac a4(1,1,1)$. Show that its structure factor is $S^\mathrm{fcc}_{hkl}\bigl(1 + e^{-i\pi(h+k+l)/2}\bigr)$ and find $\abs{S_{111}}^2/f^2$. Show also that $(200)$ is absent although it is allowed in fcc.
::: hint
Treat diamond as an fcc lattice with a two-atom basis, so the structure factor is a product.
:::
::: solution
Each of the four fcc points carries two atoms, at $\mathbf r$ and $\mathbf r + \frac a4(1,1,1)$, so the sum in [[#eq-structure]] factorises into the fcc sum times $1 + e^{-i\mathbf G\cdot\frac a4(1,1,1)} = 1 + e^{-i\pi(h+k+l)/2}$. For $(111)$ the fcc factor is $4f$ and the second factor is $1 + e^{-3\pi i/2} = 1 + i$, of squared modulus $2$:

$$
\abs{S_{111}}^2 = 16f^2\times2 = 32f^2.
$$

For $(200)$ the fcc factor is $4f$ but $1 + e^{-i\pi} = 0$. In general, among the all-even reflections, those with $h+k+l = 4m+2$ vanish. Silicon thus shows $(111)$, $(220)$ and $(311)$ but not $(200)$ or $(222)$, apart from a weak $(222)$ caused by the bonding charge, which is not spherical.
:::
:::

::: exercise A lattice constant from one line {level=2 check="4.050"}
Aluminium (fcc) shows its first line at $2\theta = 38.47^\circ$ with $\lambda = 1.5406\,\text{Å}$. Find $a$ in ångströms, to four significant figures.
::: solution
The first fcc line is $(111)$, $s = 3$. With $\theta = 19.235^\circ$, $\sin\theta = 0.32947$, so

$$
a = \frac{\lambda\sqrt3}{2\sin\theta} = \frac{1.5406\times1.73205}{0.65894} = 4.050\,\text{Å}.
$$

The accepted value at room temperature is $4.0495\,\text{Å}$. Angles measured to $0.01^\circ$ give $a$ to about one part in $3000$ at this angle; high-angle lines, where $\cot\theta$ is small, do much better, since $\delta a/a = -\cot\theta\,\delta\theta$.
:::
:::

::: exercise The reciprocal cell volume {level=3}
Prove directly from [[#eq-bvectors]] that $\mathbf b_1\cdot(\mathbf b_2\times\mathbf b_3) = (2\pi)^3/V$, without using determinants.
::: hint
Use the identity $(\mathbf A\times\mathbf B)\times(\mathbf C\times\mathbf D) = [\mathbf A\cdot(\mathbf B\times\mathbf D)]\,\mathbf C - [\mathbf A\cdot(\mathbf B\times\mathbf C)]\,\mathbf D$.
:::
::: solution
Write $\mathbf b_2\times\mathbf b_3 = (2\pi/V)^2(\mathbf a_3\times\mathbf a_1)\times(\mathbf a_1\times\mathbf a_2)$. Apply the identity with $\mathbf A = \mathbf a_3$, $\mathbf B = \mathbf a_1$, $\mathbf C = \mathbf a_1$, $\mathbf D = \mathbf a_2$:

$$
(\mathbf a_3\times\mathbf a_1)\times(\mathbf a_1\times\mathbf a_2) = [\mathbf a_3\cdot(\mathbf a_1\times\mathbf a_2)]\,\mathbf a_1 - [\mathbf a_3\cdot(\mathbf a_1\times\mathbf a_1)]\,\mathbf a_2 = V\mathbf a_1,
$$

because $\mathbf a_1\times\mathbf a_1 = 0$ and the triple product is cyclic. So $\mathbf b_2\times\mathbf b_3 = (2\pi)^2\mathbf a_1/V$, and

$$
\mathbf b_1\cdot(\mathbf b_2\times\mathbf b_3) = \frac{2\pi}{V}(\mathbf a_2\times\mathbf a_3)\cdot\frac{(2\pi)^2}{V}\mathbf a_1 = \frac{(2\pi)^3}{V^2}\,V = \frac{(2\pi)^3}{V}.
$$

The same computation shows $\mathbf b_2\times\mathbf b_3 \propto \mathbf a_1$, the vector form of the statement that the reciprocal of the reciprocal lattice is the direct lattice.
:::
:::

::: exercise The lattice sum {level=3}
For $N$ identical scatterers at $x = 0, a, \dots, (N-1)a$, show that the scattered intensity is proportional to $\sin^2(N\phi/2)/\sin^2(\phi/2)$ with $\phi = \Delta k\,a$. Show that its maxima at $\phi = 2\pi m$ have height $N^2$, that the first zeros lie at $\phi = 2\pi m \pm 2\pi/N$, and deduce that the area under each peak grows as $N$.
::: solution
The amplitude is the geometric series

$$
A = \sum_{n=0}^{N-1} e^{-in\phi} = \frac{1 - e^{-iN\phi}}{1 - e^{-i\phi}} = e^{-i(N-1)\phi/2}\,\frac{\sin(N\phi/2)}{\sin(\phi/2)},
$$

where we factored $e^{-iN\phi/2}$ from the numerator and $e^{-i\phi/2}$ from the denominator and used $e^{ix}-e^{-ix} = 2i\sin x$. The intensity is $\abs A^2 = \sin^2(N\phi/2)/\sin^2(\phi/2)$. At $\phi = 2\pi m$ every term of the series is $1$, so $A = N$ and the intensity is $N^2$. The numerator vanishes when $N\phi/2 = \pi(Nm \pm 1)$, that is $\phi = 2\pi m \pm 2\pi/N$, and the denominator does not, so these are the zeros bounding the central peak, whose width is of order $2\pi/N$. Height $N^2$ times width $\propto 1/N$ gives an area $\propto N$. Exactly, the average of $\abs A^2$ over one period is $\sum_{n,n'}\langle e^{-i(n-n')\phi}\rangle = N$, since only the $N$ diagonal terms survive averaging. Each atom contributes its own scattered power, and the lattice only redistributes it into the Laue directions.
:::
:::
