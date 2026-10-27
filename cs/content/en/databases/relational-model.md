A university keeps records of its students, its courses and who is enrolled on what. In the 1960s such data lived in files designed for particular programs: a file of student records, each containing a repeating group of course entries, laid out so that the registration program could read it quickly. Every new question — which students take a mathematics course? which courses has nobody chosen? — meant a new program that knew exactly how the file was laid out, and every change to the layout broke the programs that already existed. Worse, the same fact was often stored in several files, and the copies drifted apart.

The **relational model**, proposed by Edgar F. Codd in 1970, replaced this with a simple idea: store all data as **tables** of values, and ask questions in a high-level language that says *what* is wanted, not *how* to find it. The system decides how to answer, and the physical layout can change without changing the questions. This chapter defines relations precisely, introduces keys and integrity constraints, and develops the **relational algebra**: a small set of operations on tables that is the mathematical core of SQL ([[databases/sql]]) and the language in which database engines plan and optimise queries ([[databases/query-optimisation]]).

## Data independence

A **database** is a collection of related data; a **database management system** (DBMS) is the software that stores it, answers queries, enforces rules about it and keeps it safe from crashes and concurrent users. The central design principle of a DBMS is to separate *levels of description*:

- the **physical level** says how data is stored: files, pages, record formats, indexes ([[databases/storage-indexing]]);
- the **logical level** says what data is stored: the tables, their columns and the constraints on them;
- the **view level** gives each application the part of the data it needs, possibly restructured.

**Physical data independence** means that the physical level can change — a new index, a different file organisation — without changing programs written against the logical level. **Logical data independence** means that the logical schema can grow (a new column, a new table) without breaking views that do not mention the change. The relational model delivers physical independence almost completely, which is its great practical achievement: the same SQL query runs unchanged whether the table is a few kilobytes in memory or terabytes spread over many disks.

## Relations, schemas and instances

We fix an infinite set of **attribute names** (`sid`, `name`, `code` …) and, for each attribute $A$, a set $\operatorname{dom}(A)$ of allowed values, its **domain** — integers, strings of at most 40 characters, dates. Domains are **atomic**: the model treats each value as indivisible (a string, not a list of courses). This requirement is called **first normal form**.

::: definition Relation schema, tuple and relation {#def-relation}
A **relation schema** $R(A_1, \dots, A_n)$ is a name $R$ with a finite list of distinct attributes; $n$ is its **arity** (or degree). A **tuple** over the schema assigns to each attribute $A_i$ a value in $\operatorname{dom}(A_i)$; we write $t[A_i]$ for that value and $t[X]$ for the restriction of $t$ to a set $X$ of attributes. A **relation** (or **relation instance**) over the schema is a *finite set* of tuples. Its **cardinality** $\lvert r \rvert$ is the number of tuples.
:::

A **database schema** is a set of relation schemas, and a **database instance** gives one relation for each. The schema is the stable part — it changes rarely, by deliberate design — while the instance changes with every insertion and deletion. The running example of this course is the following instance:

**Student**

| sid | name | year |
|---|---|---|
| 1 | Ada | 2 |
| 2 | Bao | 1 |
| 3 | Chen | 3 |
| 4 | Dara | 2 |
| 5 | Eli | 1 |

**Course**

| code | title | dept | credits |
|---|---|---|---|
| CS101 | Programming | CS | 15 |
| CS202 | Databases | CS | 15 |
| MA101 | Calculus | MA | 15 |
| MA210 | Statistics | MA | 10 |

**Enrolled**

| sid | code | grade |
|---|---|---|
| 1 | CS101 | A |
| 1 | CS202 | B |
| 1 | MA101 | A |
| 2 | CS101 | C |
| 2 | MA210 | B |
| 3 | CS202 | A |
| 3 | MA101 | B |
| 3 | MA210 | A |
| 4 | CS101 | B |
| 4 | CS202 | B |

Three consequences of [[#def-relation]] are worth stating, because SQL relaxes each of them:

1. **No duplicate tuples.** A relation is a set, so the same row cannot occur twice. (SQL tables are *bags* — multisets — unless a key forbids duplicates; see [[databases/sql]].)
2. **No order of tuples.** The rows above are listed in some order for printing, but $\set{t_1, t_2} = \set{t_2, t_1}$. Any order a query result has must be requested explicitly.
3. **Attributes are named.** We refer to columns by name, not by position, so the order of columns is immaterial too. (Codd's original paper used positions; the named perspective is the usual one today.)

The model also has no notion of *pointers* between tuples. Enrolled refers to students by the *value* `sid`, not by the address of a record. This is what lets the storage layer move records freely.

## Keys and integrity constraints

Not every set of tuples is a sensible instance. Two students must not share a `sid`; an enrolment must not name a course that does not exist. Such rules are **integrity constraints**: conditions that every legal instance must satisfy. They are part of the schema, declared once, and the DBMS rejects any update that would violate them.

::: definition Superkey, candidate key and primary key {#def-key}
A set $K$ of attributes of $R$ is a **superkey** if no legal instance of $R$ contains two distinct tuples $t \ne u$ with $t[K] = u[K]$. A **candidate key** is a superkey that is minimal: no proper subset of it is a superkey. The **primary key** is one candidate key chosen by the designer to identify tuples; we underline its attributes, as in Student($\underline{\text{sid}}$, name, year).
:::

The key of Enrolled is $\set{\text{sid}, \text{code}}$: a student takes a course once, but takes several courses, and a course has several students. Neither `sid` nor `code` alone is a key. Note the word *legal*: a key is a statement about *all* instances the application allows, not a fact we can read off one instance. In the instance above no two students share a name, but `name` is not a key — the university may admit a second Ada tomorrow.

::: proposition Every relation schema has a candidate key {#prop-key-exists}
For any relation schema $R$ with attribute set $U$, the set $U$ itself is a superkey, and at least one candidate key exists.
:::

::: proof
A relation is a set, so two distinct tuples differ on at least one attribute, that is $t[U] \ne u[U]$; hence $U$ is a superkey. Among the finitely many subsets of $U$ that are superkeys (there is at least one), choose one of smallest size. None of its proper subsets is a superkey, because they are smaller still; so it is minimal, a candidate key.
:::

A schema can have several candidate keys. A Course relation might be identified both by `code` and by the pair $\set{\text{dept}, \text{title}}$ if the university promises that titles are unique within a department. The choice of primary key among them is a design decision; the others are declared `UNIQUE` in SQL.

::: example Candidate keys of a timetable {#ex-timetable-keys}
A timetable relation Slot(code, day, hour, room, lecturer) lists the weekly class meetings. The rules of the university are: (a) a room holds at most one class at any day and hour; (b) a lecturer teaches at most one class at any day and hour; (c) a course meets at most once a day. Find three candidate keys and justify that each is minimal.
::: solution
- $\set{\text{room}, \text{day}, \text{hour}}$ is a superkey by (a): two distinct meetings in the same room at the same time are forbidden. It is minimal: $\set{\text{day}, \text{hour}}$ is not a superkey (several rooms are in use at 10:00 on Monday), $\set{\text{room}, \text{day}}$ is not (a room is used at several hours), and $\set{\text{room}, \text{hour}}$ is not (it is used on several days).
- $\set{\text{lecturer}, \text{day}, \text{hour}}$ is a candidate key by (b), with the same minimality argument.
- $\set{\text{code}, \text{day}}$ is a superkey by (c). Neither `code` (a course meets on several days) nor `day` alone is one.

Each minimality argument appeals to a situation the rules *allow*, not to the current instance. The designer would pick one key as primary — perhaps $\set{\text{code}, \text{day}}$, the shortest — and declare the other two `UNIQUE`, so that the DBMS enforces all three rules. [[databases/normalisation]] shows how to derive all candidate keys systematically from such rules, written as functional dependencies.
:::
:::

::: definition Foreign key and referential integrity {#def-foreign-key}
A list of attributes $F$ of a relation $R$ is a **foreign key** referencing relation $S$ with primary key $K$ (of the same length and compatible domains) if, in every legal instance, for every tuple $t \in R$ there is a tuple $u \in S$ with $t[F] = u[K]$. This condition is **referential integrity**.
:::

Enrolled.sid references Student.sid and Enrolled.code references Course.code. Inserting $(9, \text{CS101}, \text{A})$ into Enrolled would violate referential integrity, since there is no student $9$. Deleting student $1$ would also violate it, leaving three enrolments pointing at nothing. The schema declares what should happen then: reject the deletion (`RESTRICT` or `NO ACTION`), delete the dependent enrolments too (`CASCADE`), or set the foreign key to a null value or default (`SET NULL`, `SET DEFAULT`). Other kinds of constraints restrict single values (`year` between $1$ and $4$, `credits` positive) — **domain constraints** — and the **entity integrity** rule says that primary-key attributes may not be null.

A foreign key turns each referencing tuple into a pointer, by value, to exactly one referenced tuple: it is a *function* from the rows of Enrolled to the rows of Student.

::: widget mapping
domain: 1·CS101; 1·CS202; 1·MA101; 2·CS101; 2·MA210; 3·CS202; 3·MA101; 3·MA210; 4·CS101; 4·CS202
codomain: Ada; Bao; Chen; Dara; Eli
map: 1·CS101>Ada; 1·CS202>Ada; 1·MA101>Ada; 2·CS101>Bao; 2·MA210>Bao; 3·CS202>Chen; 3·MA101>Chen; 3·MA210>Chen; 4·CS101>Dara; 4·CS202>Dara
caption: The foreign key Enrolled.sid → Student.sid as a function from enrolments (labelled by sid·code) to students. Referential integrity says exactly that every enrolment has an arrow to an existing student. The function is not injective (Ada has three enrolments) and not surjective (Eli has none). Drag Bao's two arrows to Eli: the map is still not surjective, now because Bao has no enrolment. However you edit it, each enrolment keeps exactly one arrow — an enrolment cannot point at two students, because sid is Student's key — and the map could only be surjective with at least as many enrolments as students.
:::

## The relational algebra

Codd proposed that queries be written as expressions over relations. The **relational algebra** is a set of operators, each taking one or two relations and producing a relation, so that operators compose: the output of one is the input of the next. Because results are relations again, the algebra is **closed**, and every query is a tree of operators — exactly the form in which a DBMS represents a query plan.

::: definition The basic operators of relational algebra {#def-algebra}
Let $r$ be a relation over attributes $U$ and $s$ a relation over $V$.

- **Selection** $\sigma_\theta(r) = \set{t \in r : \theta(t)}$, where the condition $\theta$ is built from comparisons $A \mathbin{op} B$ and $A \mathbin{op} c$ ($op \in \set{=, \ne, <, \le, >, \ge}$, $A, B \in U$, $c$ a constant) with $\wedge$, $\vee$, $\neg$.
- **Projection** $\pi_X(r) = \set{t[X] : t \in r}$ for $X \subseteq U$.
- **Renaming** $\rho_{B \leftarrow A}(r)$ renames attribute $A$ to $B$ (not already in $U$); $\rho_S(r)$ renames the relation itself.
- **Union** $r \cup s$ and **difference** $r - s$, defined only when $U = V$ (the relations are **union-compatible**), as the set union and difference of tuples.
- **Cartesian product** $r \times s$, defined when $U \cap V = \emptyset$, is the set of tuples over $U \cup V$ obtained by combining each $t \in r$ with each $u \in s$.
:::

Selection picks rows, projection picks columns, and product combines two relations in every possible way. Two details matter. Projection returns a *set*: if two tuples agree on $X$, the result contains $t[X]$ once, so $\lvert \pi_X(r) \rvert \le \lvert r \rvert$, with strict inequality possible. And the attribute-name conditions on $\cup$, $-$, $\times$ are what renaming is for: to compute the product of Enrolled with itself we must first rename the attributes of one copy.

### Derived operators

Several frequently used operators are abbreviations for combinations of the basic ones.

::: definition Joins, intersection and division {#def-derived}
- **Intersection** $r \cap s = r - (r - s)$ for union-compatible $r, s$.
- **Theta join** $r \bowtie_\theta s = \sigma_\theta(r \times s)$, for $U \cap V = \emptyset$. When $\theta$ is a conjunction of equalities it is an **equijoin**.
- **Natural join** $r \bowtie s$ is the set of tuples $t$ over $U \cup V$ such that $t[U] \in r$ and $t[V] \in s$: tuples of $r$ and $s$ are combined when they agree on all common attributes $U \cap V$, and those attributes appear once.
- **Semijoin** $r \ltimes s = \pi_U(r \bowtie s)$: the tuples of $r$ that join with at least one tuple of $s$.
- **Division** $r \div s$, for $V \subseteq U$, is the largest relation $q$ over $U - V$ with $q \times s \subseteq r$: the tuples $x$ over $U - V$ such that $(x, y) \in r$ for *every* $y \in s$.
:::

The natural join, too, is expressible by the basic operators: rename the common attributes of $s$ apart, take the product, select equality of each pair of renamed attributes, and project away the copies. For Enrolled $\bowtie$ Course on the common attribute `code`:

$$
\text{Enrolled} \bowtie \text{Course} = \pi_{\text{sid},\text{code},\text{grade},\text{title},\text{dept},\text{credits}}\Bigl(\sigma_{\text{code} = c}\bigl(\text{Enrolled} \times \rho_{c \leftarrow \text{code}}(\text{Course})\bigr)\Bigr).
$$ {#eq-join-basic}

Two edge cases are useful to remember: if $U \cap V = \emptyset$ the natural join is the Cartesian product, and if $U = V$ it is the intersection.

::: proposition Division by the basic operators {#prop-division}
For $r$ over $U$ and $s$ over $V \subseteq U$, with $W = U - V$,

$$
r \div s = \pi_W(r) - \pi_W\bigl((\pi_W(r) \times s) - r\bigr).
$$ {#eq-division}
:::

::: proof
Let $x$ be a tuple over $W$. Any tuple of $r \div s$ must be in $\pi_W(r)$ when $s$ is non-empty, so consider $x \in \pi_W(r)$. The relation $(\pi_W(r) \times s) - r$ contains exactly the pairs $(x', y)$ with $x' \in \pi_W(r)$, $y \in s$ and $(x', y) \notin r$ — the "missing" combinations. Hence $x$ is in its projection $\pi_W(\cdots)$ if and only if some $y \in s$ has $(x, y) \notin r$. Subtracting, $x$ is in the right-hand side if and only if $x \in \pi_W(r)$ and $(x, y) \in r$ for every $y \in s$, which is the definition of $r \div s$ restricted to $\pi_W(r)$. (If $s = \emptyset$, the condition "for every $y \in s$" holds vacuously for all $x$, and the formula returns $\pi_W(r)$; the "largest $q$" definition would in principle allow every tuple over $W$, so by convention division is taken within $\pi_W(r)$.)
:::

Division answers "for all" questions: which students take *every* CS course?

::: example Evaluating a division {#ex-division}
Compute $\pi_{\text{sid},\text{code}}(\text{Enrolled}) \div \pi_{\text{code}}(\sigma_{\text{dept} = \text{'CS'}}(\text{Course}))$ using [[#eq-division]].
::: solution
Let $r = \pi_{\text{sid},\text{code}}(\text{Enrolled})$ (ten pairs) and $s = \set{(\text{CS101}), (\text{CS202})}$, so $W = \set{\text{sid}}$.

1. $\pi_{\text{sid}}(r) = \set{1, 2, 3, 4}$. (Student 5 has no enrolments, so cannot qualify.)
2. $\pi_{\text{sid}}(r) \times s$ has $4 \cdot 2 = 8$ pairs: $(1,\text{CS101}), (1,\text{CS202}), (2,\text{CS101}), (2,\text{CS202}), (3,\text{CS101}), (3,\text{CS202}), (4,\text{CS101}), (4,\text{CS202})$.
3. Subtracting $r$ leaves the missing combinations $(2, \text{CS202})$ and $(3, \text{CS101})$.
4. Their projection on sid is $\set{2, 3}$: these students miss at least one CS course.
5. $\set{1,2,3,4} - \set{2,3} = \set{1, 4}$.

Ada (1) and Dara (4) take every CS course. Check directly: Ada takes CS101 and CS202, Dara takes CS101 and CS202, Bao lacks CS202, Chen lacks CS101.
:::
:::

### Writing queries

A query in the algebra is an expression; to write one, work outwards from the relations that hold the needed facts. A small Python model makes the definitions concrete — a relation is a schema with a set of tuples:

```python
# A relation is a pair (schema, set of tuples); schema is a tuple of attribute names.
def select(r, pred):
    s, rows = r
    return s, {t for t in rows if pred(dict(zip(s, t)))}

def project(r, attrs):
    s, rows = r
    idx = [s.index(a) for a in attrs]
    return tuple(attrs), {tuple(t[i] for i in idx) for t in rows}   # a set: duplicates vanish

def natural_join(r1, r2):
    (s1, rows1), (s2, rows2) = r1, r2
    common = [a for a in s1 if a in s2]
    extra = [a for a in s2 if a not in s1]
    out = set()
    for t in rows1:
        d1 = dict(zip(s1, t))
        for u in rows2:
            d2 = dict(zip(s2, u))
            if all(d1[a] == d2[a] for a in common):        # agree on the shared attributes
                out.add(t + tuple(d2[a] for a in extra))
    return s1 + tuple(extra), out
```

With Enrolled and Course entered as above (ten and four tuples), the students taking a mathematics course and the students with at least one A are

```python
ma = select(Course, lambda t: t["dept"] == "MA")
print(sorted(project(natural_join(Enrolled, ma), ["sid"])[1]))
print(sorted(project(select(Enrolled, lambda t: t["grade"] == "A"), ["sid"])[1]))
```

```console
$ python3 ra.py
[(1,), (2,), (3,)]
[(1,), (3,)]
```

The nested loops in `natural_join` take $\Theta(\lvert r_1 \rvert \cdot \lvert r_2 \rvert)$ time; [[databases/query-processing]] shows how real systems join far faster with sorting, hashing and indexes. The algebra specifies *what* the join is, not how to compute it.

::: example Names of students taking a mathematics course {#ex-ma-names}
Write an algebra expression for the names of students enrolled on at least one MA course, and evaluate it step by step.
::: solution
The facts are spread over three relations: the department is in Course, the enrolment in Enrolled, the name in Student. Join them and project:

$$
\pi_{\text{name}}\bigl(\text{Student} \bowtie \text{Enrolled} \bowtie \sigma_{\text{dept}=\text{'MA'}}(\text{Course})\bigr).
$$

1. $\sigma_{\text{dept}=\text{'MA'}}(\text{Course})$ = {MA101 Calculus, MA210 Statistics}.
2. Joining with Enrolled on `code` keeps the enrolments $(1,\text{MA101},\text{A})$, $(2,\text{MA210},\text{B})$, $(3,\text{MA101},\text{B})$, $(3,\text{MA210},\text{A})$ — four tuples, extended with title, dept and credits.
3. Joining with Student on `sid` adds names: Ada, Bao, Chen, Chen.
4. Projecting on `name` gives the *set* {Ada, Bao, Chen}: Chen appears once although she takes two MA courses.

Selecting early (step 1 before the joins) gives the same answer as joining first and selecting last, and is cheaper: the intermediate results are smaller. Such equivalences are the basis of query optimisation ([[databases/query-optimisation]]).
:::
:::

::: example Courses that nobody takes, and students who take none {#ex-difference}
Which students are not enrolled on any course? Which students take both CS101 and MA101?
::: solution
"Not enrolled on anything" is a difference: all student ids minus those that appear in Enrolled,

$$
\pi_{\text{sid}}(\text{Student}) - \pi_{\text{sid}}(\text{Enrolled}) = \set{1,2,3,4,5} - \set{1,2,3,4} = \set{5}.
$$

So Eli. To get the name, join back: $\pi_{\text{name}}(\text{Student} \bowtie (\ldots))$ = {Eli}. A common error is to write $\sigma_{\text{sid} \ne \ldots}$ — selection looks at one tuple at a time and cannot see that a student has *no* matching tuple elsewhere; "no", "none" and "only" need difference.

"Both CS101 and MA101" is an intersection of two selections, *not* one selection with $\text{code} = \text{'CS101'} \wedge \text{code} = \text{'MA101'}$, which no single tuple satisfies:

$$
\pi_{\text{sid}}(\sigma_{\text{code}=\text{'CS101'}}(\text{Enrolled})) \cap \pi_{\text{sid}}(\sigma_{\text{code}=\text{'MA101'}}(\text{Enrolled})) = \set{1,2,4} \cap \set{1,3} = \set{1}.
$$

Only Ada. Equivalently, join Enrolled with a renamed copy of itself on `sid` and select one copy's code to be CS101 and the other's MA101.
:::
:::

Set operations on union-compatible relations behave exactly like operations on sets of elements, which is what a Venn diagram shows.

::: widget venn
sets: 2
labels: R; S
expr: R - S
caption: Two union-compatible relations as sets of tuples. The shaded region is $R - S$: the tuples of $R$ not in $S$. Type `R | S`, `R & S` and `R - (R - S)` to see union, intersection and why $r \cap s = r - (r - s)$ ([[#def-derived]]). Notice that $R - S$ and $S - R$ are different regions: difference, unlike union and intersection, is not commutative.
:::

::: quiz
Relation $r(A, B)$ has $6$ tuples, and $A$ is a key of $r$. What can you say about $\lvert \pi_B(r) \rvert$ and $\lvert \pi_A(r) \rvert$?
- [ ] Both are exactly $6$.
- [x] $\lvert\pi_A(r)\rvert = 6$, and $1 \le \lvert\pi_B(r)\rvert \le 6$.
- [ ] $\lvert\pi_B(r)\rvert = 6$, and $\lvert\pi_A(r)\rvert \le 6$.
- [ ] Both can be anything from $0$ to $6$.
::: solution
Because $A$ is a key, the six tuples have six different $A$-values, so projecting on $A$ removes no duplicates. Projection on the non-key $B$ can merge tuples with equal $B$: if all six share one $B$ value, $\pi_B(r)$ has a single tuple. It cannot be empty, since $r$ is not.
:::
:::

## The algebra as a language: equivalence and expressive power

Two expressions are **equivalent**, $E_1 \equiv E_2$, if they produce the same result on *every* database instance. Equivalence on one instance proves nothing; equivalence is proved from the definitions. Some laws we will use constantly:

- $\sigma_{\theta_1 \wedge \theta_2}(r) \equiv \sigma_{\theta_1}(\sigma_{\theta_2}(r))$, so selections commute and cascade;
- $\sigma_\theta(r \times s) \equiv \sigma_\theta(r) \times s$ if $\theta$ mentions only attributes of $r$ — **pushing selections** below joins;
- $r \bowtie s \equiv s \bowtie r$ and $(r \bowtie s) \bowtie t \equiv r \bowtie (s \bowtie t)$ for natural joins — so joins may be **reordered**;
- $\pi_X(r \cup s) \equiv \pi_X(r) \cup \pi_X(s)$, but in general $\pi_X(r - s) \not\equiv \pi_X(r) - \pi_X(s)$ ([[#ex-project-diff]]).

[[databases/query-optimisation]] lists and proves the full set of rules. Here we use the algebra to ask a different question: what *cannot* it express?

::: definition Monotone query {#def-monotone}
A query $Q$ (a function from database instances to relations) is **monotone** if, whenever $I \subseteq I'$ — every relation of instance $I$ is a subset of the corresponding relation of $I'$ — we have $Q(I) \subseteq Q(I')$.
:::

Adding tuples to the input of a monotone query can only add tuples to its output. "Students taking a mathematics course" is monotone: a new enrolment can create a new answer but never cancel one. "Students taking no course" is not: enrolling Eli removes him from the answer.

::: theorem Difference-free algebra is monotone {#thm-monotone}
Every expression built from relation names and constant relations with $\sigma$, $\pi$, $\rho$, $\times$, $\cup$, $\cap$ and $\bowtie$ (but not $-$ or $\div$) defines a monotone query.
:::

::: proof
By structural induction on the expression $E$. Suppose $I \subseteq I'$.

*Base cases.* If $E$ is a relation name $R$, then $E(I) = R^I \subseteq R^{I'} = E(I')$ by assumption. If $E$ is a constant relation, $E(I) = E(I')$.

*Inductive step.* Assume $E_1(I) \subseteq E_1(I')$ and $E_2(I) \subseteq E_2(I')$.

- $\sigma_\theta(E_1)$: a tuple of $E_1(I)$ satisfying $\theta$ is a tuple of $E_1(I')$ satisfying $\theta$, because $\theta$ depends only on the tuple itself.
- $\pi_X(E_1)$: if $t[X]$ comes from $t \in E_1(I)$, then $t \in E_1(I')$, so $t[X] \in \pi_X(E_1(I'))$. Renaming is similar.
- $E_1 \times E_2$: a combined tuple $(t, u)$ with $t \in E_1(I)$, $u \in E_2(I)$ has $t \in E_1(I')$ and $u \in E_2(I')$, so $(t, u) \in E_1(I') \times E_2(I')$.
- $E_1 \cup E_2$ and $E_1 \cap E_2$: union and intersection of sets are monotone in each argument.
- $E_1 \bowtie E_2$: a natural join is a projection of a selection of a product of renamings ([[#eq-join-basic]]), each of which preserves inclusion by the cases above.

In every case $E(I) \subseteq E(I')$.
:::

::: corollary Difference is not expressible from the other operators {#cor-difference}
No expression built with $\sigma, \pi, \rho, \times, \cup, \cap, \bowtie$ is equivalent to $R - S$.
:::

::: proof
The query $R - S$ is not monotone: take $I$ with $R = \set{t}$, $S = \emptyset$, and $I'$ with $R = S = \set{t}$. Then $I \subseteq I'$, but $(R - S)(I) = \set{t} \not\subseteq \emptyset = (R - S)(I')$. By [[#thm-monotone]] every difference-free expression is monotone, so none equals $R - S$.
:::

So difference is genuinely needed: every question involving "not", "no", "only" or "all" (division) requires it. The six operators $\sigma, \pi, \rho, \cup, -, \times$ are in fact **independent** — none of them can be expressed by the other five — and an expression language with the power of these six is called **relationally complete**, Codd's benchmark for query languages.

The algebra has limits too. It cannot compute the **transitive closure** of a relation: given Prereq(course, required), no single algebra expression returns all pairs (course, required) at any depth of the prerequisite chain, for every instance. Each expression can follow only a fixed number of joins, while the chains in the data can be arbitrarily long. (The precise statement and proof are due to Aho and Ullman, 1979; we do not prove it here.) SQL added recursive queries in 1999 for exactly this reason ([[databases/sql]]).

::: warning Relational algebra is not SQL, and a relation is not a table
Three differences catch people out. First, the algebra works with *sets*, so $\pi_{\text{name}}$ removes duplicates, while SQL's `SELECT name` keeps them unless you write `SELECT DISTINCT`. Second, the algebra has no null values: every tuple has a value for every attribute, while SQL tables may contain `NULL`, which changes the logic of conditions ([[databases/sql]]). Third, a relation has no row order; a query result that "comes out sorted" in some system on some day is not sorted unless the query says `ORDER BY`. Reasoning about SQL as if it were the set algebra gives wrong row counts and wrong answers to queries with `NOT IN`.
:::

::: proposition Size of a natural join {#prop-join-size}
Let $r$ over $U$ and $s$ over $V$ be relations, with common attributes $C = U \cap V$.
1. $0 \le \lvert r \bowtie s \rvert \le \lvert r \rvert \cdot \lvert s \rvert$.
2. If $C$ contains a key of $s$, then $\lvert r \bowtie s \rvert \le \lvert r \rvert$.
3. If moreover $C$ is a foreign key of $r$ referencing $s$, then $\lvert r \bowtie s \rvert = \lvert r \rvert$.
:::

::: proof
(1) Each output tuple $t$ is determined by the pair $(t[U], t[V]) \in r \times s$, so there are at most $\lvert r \rvert\,\lvert s \rvert$; with no matching pairs there are none. (2) If $C$ contains a key of $s$, each $t \in r$ agrees on $C$ with at most one tuple of $s$, so it contributes at most one output tuple. (3) Referential integrity guarantees at least one matching tuple of $s$ for each $t \in r$, so exactly one; distinct $t$ give distinct output tuples.
:::

Thus Enrolled $\bowtie$ Course has exactly $10$ tuples, one per enrolment, and Student $\times$ Course has $5 \cdot 4 = 20$. Estimating join sizes between these extremes is the hardest part of query optimisation ([[databases/query-optimisation]]).

::: quiz
Which of these queries can be written in relational algebra *without* the difference operator?
- [x] Students who have an A in some course.
- [ ] Students who have no A in any course.
- [ ] Students who have an A in every course they take.
- [x] Courses taken by at least two different students.
::: solution
The first and fourth are monotone: adding enrolments can only add answers. The fourth is $\pi_{\text{code}}(\sigma_{\text{sid} \ne \text{sid}'}(\text{Enrolled} \bowtie_{\text{code}=\text{code}'} \rho'(\text{Enrolled})))$, a self-join with a selection. The second and third are not monotone: adding an enrolment with grade A removes a student from the second answer, and adding an enrolment with grade C removes one from the third. By [[#thm-monotone]] they need difference.
:::
:::

## Beyond the algebra: calculus and constraints

The algebra is **procedural** in flavour: an expression says which operations to apply in which order. Codd also defined a **relational calculus**, a form of first-order logic in which a query describes the answer by a property. The students taking every CS course are

$$
\set{ s.\text{sid} \mid s \in \text{Student} \wedge \forall c \in \text{Course}\,\bigl(c.\text{dept} = \text{'CS'} \rightarrow \exists e \in \text{Enrolled}\,(e.\text{sid} = s.\text{sid} \wedge e.\text{code} = c.\text{code})\bigr) }.
$$

This is the tuple relational calculus. A calculus query must be **safe** — its answer must depend only on values that occur in the database, so that $\set{t \mid \neg (t \in \text{Student})}$, an infinite set, is excluded. **Codd's theorem** (1972) states that the relational algebra and the safe relational calculus have the same expressive power: every algebra expression has an equivalent safe calculus query and vice versa. SQL is closer to the calculus — its `WHERE NOT EXISTS (...)` reads like the formula above — while the engine translates it to an algebra plan. The logic is that of [Maths Atlas: quantifiers](/learn/maths/lesson.php?c=proofs&l=quantifiers).

::: history
Edgar F. "Ted" Codd, a mathematician at IBM's San Jose laboratory, published "A relational model of data for large shared data banks" in *Communications of the ACM* in June 1970, motivated by data independence; an IBM internal report had appeared in 1969, and David Childs had described set-theoretic data structures in 1968. Codd's "Relational completeness of data base sublanguages" (1972) defined the algebra and calculus and proved them equivalent. IBM was slow to adopt the idea, which threatened its hierarchical IMS product, but its System R project (from 1974, San Jose) and the Ingres project of Michael Stonebraker and Eugene Wong at Berkeley (from 1973) showed that relational systems could be efficient. Relational Software (later Oracle) shipped the first commercial SQL system in 1979, and IBM's SQL/DS and DB2 followed in 1981 and 1983. Codd received the Turing Award in 1981.
:::

## Where this leads

SQL ([[databases/sql]]) is the practical language built on the algebra and the calculus, extended with bags, nulls, aggregation and recursion. Conceptual design ([[databases/conceptual-design]]) and normalisation ([[databases/normalisation]]) answer the question this chapter left open: which relation schemas should a database have, and which keys and constraints? The second half of the course looks inside the engine: how relations are stored and indexed ([[databases/storage-indexing]]), how each algebra operator is implemented ([[databases/query-processing]]), and how equivalences between expressions let the system choose a fast plan ([[databases/query-optimisation]]). The relational model is not the only data model — document, graph and key–value stores make different trade-offs, compared well in Kleppmann's book — but its algebra remains the reference point against which the others are explained.

::: summary
- A **relation** is a finite *set* of tuples over a schema of named attributes with atomic domains; the schema is stable, the instance changes.
- **Data independence** — separating the logical schema from physical storage — is the main achievement of the relational model.
- A **superkey** identifies tuples in every legal instance; a **candidate key** is a minimal superkey; a **foreign key** must match the key of a tuple in the referenced relation (**referential integrity**).
- The **relational algebra** has six basic operators $\sigma, \pi, \rho, \cup, -, \times$; joins, intersection, semijoin and division are derived from them, and the algebra is closed, so queries are operator trees.
- Projection removes duplicates; "for all" queries use **division**, and "not / no / only" queries need **difference**.
- Difference-free expressions are **monotone** ([[#thm-monotone]]), so difference cannot be expressed by the other operators; the algebra also cannot express transitive closure.
- A join on a foreign key to a key returns exactly one tuple per referencing tuple ([[#prop-join-size]]).
- The algebra and the safe relational calculus are equally expressive (Codd's theorem); SQL builds on both.
:::

## Exercises

::: exercise Counting a selection {level=1 check="3"}
How many tuples does $\sigma_{\text{credits} = 15}(\text{Course})$ have in the running example? And $\pi_{\text{credits}}(\text{Course})$? (Enter the first number.)
::: solution
CS101, CS202 and MA101 have 15 credits, so the selection has $3$ tuples. The projection $\pi_{\text{credits}}(\text{Course})$ has only $2$ tuples, $\set{(15), (10)}$, because projection removes duplicates.
:::
:::

::: exercise Counting superkeys {level=1 check="8"}
A relation schema $R(A, B, C, D)$ has $\set{A}$ as its only candidate key. How many superkeys does it have? (Enter the number.)
::: solution
A set of attributes is a superkey exactly when it contains a candidate key. Here that means containing $A$: the superkeys are $\set{A} \cup Y$ for any $Y \subseteq \set{B, C, D}$, and there are $2^3 = 8$ of them. (If a superkey did not contain $A$, it would contain some minimal superkey — a candidate key — other than $\set{A}$, which does not exist.)
:::
:::

::: exercise Ada's course titles {level=1}
Write a relational algebra expression for the titles of the courses Ada is enrolled on, and evaluate it.
::: solution
$$
\pi_{\text{title}}\bigl(\sigma_{\text{name}=\text{'Ada'}}(\text{Student}) \bowtie \text{Enrolled} \bowtie \text{Course}\bigr).
$$

The selection gives Ada's tuple $(1, \text{Ada}, 2)$; joining with Enrolled gives her three enrolments (CS101, CS202, MA101); joining with Course adds the titles; the projection gives {Programming, Databases, Calculus}. Selecting Ada before the joins keeps the intermediate results to three tuples.
:::
:::

::: exercise Bounds on result sizes {level=2}
Let $r(A, B)$ have $100$ tuples and $s(A, B)$ have $50$. Give the smallest and largest possible sizes of $r \cup s$, $r \cap s$, $r - s$ and $r \times \rho_{A' \leftarrow A,\, B' \leftarrow B}(s)$, and an instance attaining each bound.
::: solution
- $r \cup s$: between $100$ (when $s \subseteq r$) and $150$ (when they are disjoint).
- $r \cap s$: between $0$ (disjoint) and $50$ ($s \subseteq r$).
- $r - s$: between $50$ ($s \subseteq r$, removing $50$) and $100$ (disjoint).
- The product always has exactly $100 \cdot 50 = 5000$ tuples: each pair of tuples gives a distinct combined tuple.

For the extremes take $r = \set{(i, 0) : 1 \le i \le 100}$ and either $s = \set{(i, 0) : 1 \le i \le 50}$ (subset) or $s = \set{(i, 1) : 1 \le i \le 50}$ (disjoint).
:::
:::

::: exercise Division for mathematics courses {level=2 check="3"}
Compute $\pi_{\text{sid},\text{code}}(\text{Enrolled}) \div \pi_{\text{code}}(\sigma_{\text{dept}=\text{'MA'}}(\text{Course}))$ with [[#eq-division]], showing the intermediate relations. (Enter the sid of the answer.)
::: solution
$s = \set{\text{MA101}, \text{MA210}}$ and $\pi_{\text{sid}}(r) = \set{1,2,3,4}$. The product $\pi_{\text{sid}}(r) \times s$ has $8$ pairs; those not in $r$ are $(1,\text{MA210})$, $(2,\text{MA101})$, $(4,\text{MA101})$, $(4,\text{MA210})$. Their sids are $\set{1,2,4}$, and $\set{1,2,3,4} - \set{1,2,4} = \set{3}$. Only Chen (sid $3$) takes both mathematics courses.
:::
:::

::: exercise Special cases of the natural join {level=2}
Prove from [[#def-derived]] that if $U \cap V = \emptyset$ then $r \bowtie s = r \times s$, and if $U = V$ then $r \bowtie s = r \cap s$. Prove also that $r \cap s = r - (r - s)$.
::: solution
The natural join contains the tuples $t$ over $U \cup V$ with $t[U] \in r$ and $t[V] \in s$. If $U \cap V = \emptyset$, a tuple over $U \cup V$ is exactly a pair of a tuple over $U$ and a tuple over $V$, with no further condition, so the join is the set of all combinations of $t[U] \in r$ and $t[V] \in s$ — the product. If $U = V$, then $t[U] = t[V] = t$, and the condition reads $t \in r$ and $t \in s$: the intersection.

For the last identity: $t \in r - (r - s)$ iff $t \in r$ and $t \notin r - s$; and $t \notin r - s$ with $t \in r$ means $t \in s$. So $t \in r - (r - s)$ iff $t \in r$ and $t \in s$.
:::
:::

::: exercise Referential actions {level=2 check="7"}
The foreign keys of Enrolled are declared `ON DELETE CASCADE`. Student 3 is deleted. Which tuples remain in Enrolled? What happens instead under `RESTRICT`, and why would `SET NULL` be rejected here? (Enter the number of tuples left in Enrolled after the cascade.)
::: solution
Cascading deletes Chen's three enrolments (CS202, MA101, MA210), leaving $10 - 3 = 7$ tuples. Under `RESTRICT` the deletion of student 3 is refused, since enrolments still reference her, and nothing changes. `SET NULL` would set `sid` to null in those enrolments, but `sid` is part of Enrolled's primary key, and entity integrity forbids nulls in a primary key — so the update fails.
:::
:::

::: exercise Projection and difference {#ex-project-diff level=2}
Show that $\pi_X(r \cup s) \equiv \pi_X(r) \cup \pi_X(s)$ always holds, but $\pi_X(r - s) \equiv \pi_X(r) - \pi_X(s)$ does not. Under what condition on $X$ does the second become an equivalence?
::: solution
$x \in \pi_X(r \cup s)$ iff $x = t[X]$ for some $t$ in $r$ or in $s$, iff $x \in \pi_X(r)$ or $x \in \pi_X(s)$. For difference, take $r = \set{(1, a), (1, b)}$ and $s = \set{(1, b)}$ over $(A, B)$, $X = \set{A}$: $\pi_A(r - s) = \pi_A(\set{(1,a)}) = \set{1}$, but $\pi_A(r) - \pi_A(s) = \set{1} - \set{1} = \emptyset$. The inclusion $\pi_X(r) - \pi_X(s) \subseteq \pi_X(r - s)$ always holds (if $x = t[X]$ with $t \in r$ and no tuple of $s$ projects to $x$, then $t \notin s$). Equality holds when $X$ is a superkey of the union $r \cup s$ — then a tuple is determined by its $X$-value, and $t[X] \in \pi_X(s)$ implies $t \in s$.
:::
:::

::: exercise Division is not monotone {level=3}
Show that the query $R \div S$ is not monotone in $S$, and that it is not monotone in $R$ either, in the sense of [[#def-monotone]]. Conclude that division cannot be expressed without difference, and explain why this is consistent with [[#prop-division]].
::: solution
In $S$: let $R = \set{(x, y_1)}$ over $(A, B)$. With $S = \set{(y_1)}$, $R \div S = \set{(x)}$; with $S' = \set{(y_1), (y_2)} \supseteq S$, $R \div S' = \emptyset$, since $(x, y_2) \notin R$. Growing the input shrank the output.

In $R$ the query is monotone if $S$ is fixed — more tuples in $R$ can only complete more groups — but a monotone query must respect *all* inputs growing together, and the example above has $R$ fixed and $S$ growing. So $R \div S$ is not a monotone query, and by [[#thm-monotone]] no difference-free expression computes it. This is consistent with [[#eq-division]], which uses difference twice: once to find the missing combinations and once to remove the students who have any.
:::
:::

::: exercise Implementing union, difference and division {level=3}
Extend the Python model of the chapter with `union(r, s)`, `difference(r, s)` (both checking union-compatibility) and `divide(r, s)` implemented *literally* by [[#eq-division]] (you will need a `product` function). Test `divide` on the CS and MA divisions of the running example.
::: solution
Here the schemas must match exactly, including the order of attributes; a more forgiving version would reorder columns by name.

```python
def union(r, s):
    assert r[0] == s[0], "union needs equal schemas"
    return r[0], r[1] | s[1]

def difference(r, s):
    assert r[0] == s[0], "difference needs equal schemas"
    return r[0], r[1] - s[1]

def product(r, s):
    assert not set(r[0]) & set(s[0]), "rename common attributes first"
    return r[0] + s[0], {t + u for t in r[1] for u in s[1]}

def divide(r, s):
    w = [a for a in r[0] if a not in s[0]]
    pw = project(r, w)
    all_pairs = project(product(pw, s), list(r[0]))   # reorder columns as in r
    missing = difference(all_pairs, r)
    return difference(pw, project(missing, w))

pairs = project(Enrolled, ["sid", "code"])
cs = project(select(Course, lambda t: t["dept"] == "CS"), ["code"])
ma = project(select(Course, lambda t: t["dept"] == "MA"), ["code"])
print(sorted(divide(pairs, cs)[1]), sorted(divide(pairs, ma)[1]))
```

```console
$ python3 ra_divide.py
[(1,), (4,)] [(3,)]
```

The results agree with [[#ex-division]] and the exercise above. The `project(..., list(r[0]))` step reorders the product's columns to match $r$'s schema so that the difference is well defined — the positional implementation needs it, while the named perspective of the algebra does not.
:::
:::
