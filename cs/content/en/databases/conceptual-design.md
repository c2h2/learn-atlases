Before a single `CREATE TABLE` is written, someone must decide what the database is *about*. The registrar says: "We have students and courses; courses are run as sections each term, taught by a lecturer; lecturers belong to departments, and each department has a head; students enrol on sections and get grades; some courses require others." That paragraph contains every decision that matters — which things exist, how they are identified, how they are related and how many of each may be related to how many of the other — but in a form no DBMS can use, and with ambiguities nobody has noticed yet. Can a section have two lecturers? Must every lecturer belong to a department? Is a grade a property of the student, the course, or the enrolment?

**Conceptual design** turns such requirements into a precise, diagrammatic model that users can check and that can be translated mechanically into relation schemas. The standard tool is the **entity–relationship (ER) model** of Peter Chen (1976). This chapter defines its concepts — entity sets, attributes, relationship sets, cardinality and participation constraints, weak entity sets, specialisation — gives an algorithm that translates an ER design into tables with keys and foreign keys, and proves what each translation step preserves. The remaining defects of a design are then caught by normalisation ([[databases/normalisation]]).

## Entities and attributes

::: definition Entity set and attribute {#def-entity}
An **entity** is a distinguishable thing in the application domain — a student, a course, a department. An **entity set** is a collection of entities of the same kind, described by the same **attributes**, each with a domain. A **key** of an entity set is a minimal set of attributes whose values distinguish any two entities of the set, in every legal state.
:::

In the university, Student has attributes sid, name and year with key sid; Course has code, title and credits with key code; Department has dname and building; Lecturer has lid and name. In Chen's diagram notation entity sets are rectangles, attributes ovals attached to them, and key attributes underlined; most tools today draw the compact UML-style boxes that list attributes inside the rectangle. Notation varies, the concepts do not.

Attributes come in several kinds, and each kind translates differently:

- **simple** attributes hold one atomic value (year);
- **composite** attributes have parts (an address with street, city and postcode) and are flattened into their parts in a table;
- **multivalued** attributes hold a set of values per entity (a student's phone numbers) and need a table of their own, since a relation's values are atomic;
- **derived** attributes can be computed from others (a student's age from a date of birth, a total of credits from enrolments) and are usually not stored.

## Relationships

::: definition Relationship set {#def-relationship}
A **relationship set** $R$ among entity sets $E_1, \dots, E_k$ (not necessarily distinct) is a set of tuples $(e_1, \dots, e_k)$ with $e_i \in E_i$; each tuple is a **relationship**, and $k$ is the **degree** of $R$. When the same entity set occurs more than once, each occurrence has a **role** name. A relationship set may have its own attributes, which describe the relationship rather than any one participant.
:::

Enrolled relates Student and Section and has the attribute grade, which belongs to neither: Ada's B is a fact about Ada's enrolment on that section. Prereq relates Course to Course, with roles *course* and *needs*. Since a relationship set is a *set*, a given combination of entities is related at most once; if a student could enrol on the same section twice (say, after withdrawing), the design would need a different structure, such as an Enrolment entity with its own identifier.

### Cardinality constraints

The most important constraints in a design say how many entities may be related to how many.

::: definition Mapping cardinality and participation {#def-cardinality}
Let $R$ be a binary relationship set between $A$ and $B$.
- $R$ is **many-to-one from $A$ to $B$** if each $a \in A$ is related to *at most one* $b \in B$; then $R$ is a partial function from $A$ to $B$.
- $R$ is **one-to-one** if it is many-to-one in both directions.
- $R$ is **many-to-many** if neither restriction applies.

The participation of $A$ in $R$ is **total** if every $a \in A$ is related to at least one $b$, and **partial** otherwise. More generally a **(min, max) constraint** on $A$'s participation says each $a$ occurs in between min and max relationships of $R$.
:::

For the university: Teaches is many-to-one from Section to Lecturer (a section has one lecturer; a lecturer may teach several sections), with total participation of Section (every section has a lecturer) and partial participation of Lecturer (a lecturer on research leave teaches nothing). Offers is many-to-one from Course to Department, total for Course. Head is one-to-one between Department and Lecturer, partial on both sides (a department may be between heads; most lecturers are not heads). Enrolled and Prereq are many-to-many.

::: widget mapping
domain: CS101/1; CS101/2; CS202/1; MA101/1; MA210/1
codomain: Rao; Kim; Silva; Lee
map: CS101/1>Rao; CS101/2>Kim; CS202/1>Rao; MA101/1>Silva; MA210/1>Silva
caption: The relationship Teaches between sections (course/section number) and lecturers. Because it is many-to-one from Section to Lecturer, it is a function, and total participation of Section means every section has an arrow. The map is not injective — Rao and Silva each teach two sections — and not surjective: Lee teaches nothing, so Lecturer's participation is partial. Move arrows until the map is injective: Teaches would then be one-to-one, a much stronger claim that the registrar would have to confirm.
:::

::: example Reading constraints from requirements {#ex-requirements}
An airline states: "A flight (number and date) is operated by one aircraft (registration); an aircraft flies many flights, and new aircraft may not have flown yet. Passengers (passport number) book flights; a booking gives one seat on one flight, and a passenger may book many flights. Every flight has a captain, who is a pilot; a pilot may captain many flights." Identify entity sets, relationship sets, cardinalities and participation, and the questions still to ask.
::: solution
Entity sets: Flight (key number, date), Aircraft (registration), Passenger (passport), Pilot (staff id).

- Operates: many-to-one from Flight to Aircraft; Flight total ("is operated by one"), Aircraft partial ("may not have flown yet").
- Booking: many-to-many between Passenger and Flight with attribute seat; both participations partial (an empty flight is possible, as is a passenger without bookings). The rule "one seat per booking" makes seat an attribute; "a seat is held by at most one passenger on a flight" says that (flight, seat) is a second candidate key of Booking.
- Captains: many-to-one from Flight to Pilot, total for Flight.

Questions to ask: can a passenger book the same flight twice (for example for a second seat)? If so, Booking needs a key including seat. Can the aircraft of a flight change after booking (a swap), and must the history be kept? Is every pilot a member of staff, so that Pilot should be a subclass of Employee? The answers change keys and tables, which is why they must be asked before translation.
:::
:::

Cardinalities are claims about the *world*, and they matter because they become keys and foreign keys. A design that says "each section has one lecturer" will produce a schema that *cannot* record team teaching. Getting them right means asking users precise questions — "can a section ever have two lecturers? can a lecturer have none?" — rather than guessing from sample data.

::: proposition Keys of a binary relationship set {#prop-rel-key}
Let $R$ relate $A$ (key $K_A$) and $B$ (key $K_B$), and identify each relationship by the keys of its participants, $K_A \cup K_B$. Then:
1. if $R$ is many-to-many, $K_A \cup K_B$ is the only candidate key of $R$;
2. if $R$ is many-to-one from $A$ to $B$, then $K_A$ is a candidate key of $R$;
3. if $R$ is one-to-one, both $K_A$ and $K_B$ are candidate keys.
:::

::: proof
A relationship set is a set of pairs, so $K_A \cup K_B$ is a superkey. (1) In a many-to-many relationship, some legal state relates one $a$ to two $b$'s, so $K_A$ alone is not a superkey, and likewise $K_B$; no proper subset of $K_A \cup K_B$ that omits attributes of $K_A$ can identify $a$ — it omits an attribute of a minimal key of $A$, so two different entities of $A$ may agree on it — and similarly for $B$. Hence $K_A \cup K_B$ is minimal. (2) If each $a$ is related to at most one $b$, two relationships with the same $a$ are equal, so $K_A$ is a superkey, and it is minimal because $K_A$ is minimal for $A$. (3) Apply (2) in both directions.
:::

### Higher degrees, roles and aggregation

Some facts relate three things at once. A supplier supplies a part *for* a project; a lecturer teaches a course *in* a room. It is tempting to replace a ternary relationship by three binary ones, but they do not say the same thing.

::: proposition A ternary relationship is not determined by its binary projections {#prop-ternary}
There are two different instances of a ternary relationship set Supplies(Supplier, Part, Project) whose three binary projections — Supplier–Part, Part–Project and Supplier–Project — are identical.
:::

::: proof
Let $I_1 = \set{(s_1, p_1, j_2), (s_1, p_2, j_1), (s_2, p_1, j_1)}$ and $I_2 = I_1 \cup \set{(s_1, p_1, j_1)}$. The projections of $I_1$ are

- Supplier–Part: $\set{(s_1, p_1), (s_1, p_2), (s_2, p_1)}$,
- Part–Project: $\set{(p_1, j_2), (p_2, j_1), (p_1, j_1)}$,
- Supplier–Project: $\set{(s_1, j_2), (s_1, j_1), (s_2, j_1)}$.

The extra tuple $(s_1, p_1, j_1)$ of $I_2$ projects to $(s_1, p_1)$, $(p_1, j_1)$ and $(s_1, j_1)$, all of which are already present. So $I_1 \ne I_2$ have the same three projections, and no design that stores only the binary relationships can distinguish them.
:::

In words: knowing that $s_1$ supplies $p_1$ to someone, that $p_1$ goes to $j_1$ from someone, and that $s_1$ supplies $j_1$ with something, does not tell us that $s_1$ supplies $p_1$ to $j_1$. If the application needs that fact, the relationship is genuinely ternary. Conversely, if the business rule is that the three binary facts *imply* the ternary one, the binary design is correct and smaller; this is a **join dependency**, revisited in [[databases/normalisation]].

Sometimes a relationship must participate in another relationship: a section's lecturer may be *assessed* by a reviewer. **Aggregation** treats the relationship Teaches, with its participants, as a higher-level entity that can take part in a relationship Reviews; in tables this simply means that Reviews references the key of Teaches.

## Weak entity sets

A section of a course is identified as "section 2 of CS101 in term 2026A". The section number $2$ alone identifies nothing — every course has a section 2 — and a section cannot exist without its course.

::: definition Weak entity set {#def-weak}
A **weak entity set** $W$ has no key of its own. Each weak entity is identified by its relationship to an entity of an **identifying owner** set $E$, through an **identifying relationship** that is many-to-one from $W$ to $E$ with total participation of $W$, together with a **partial key** (discriminator) of $W$ that distinguishes the weak entities with the same owner. The key of $W$ is the key of $E$ together with the partial key.
:::

Section is weak with owner Course and partial key (term, num); its key is (code, term, num). Deleting a course must delete its sections (they cannot exist without an owner), which in SQL is `ON DELETE CASCADE` on the foreign key. Weak entities can be owners in turn — an exam paper of a section is identified by section and paper number.

A weak entity set could always be made strong by inventing an identifier (a `section_id` counter), and many real schemas do. The weak form is preferable when the natural identifier is meaningful to users and when ownership should be enforced; a surrogate key is preferable when the natural key is long, changes, or is referenced from many tables.

## Specialisation and generalisation

Students and lecturers share attributes — both are people with a name, an e-mail address and a date of birth — and each has its own attributes and relationships.

::: definition Specialisation {#def-isa}
A **specialisation** (ISA hierarchy) declares entity sets $S_1, \dots, S_m$ as **subclasses** of a **superclass** $E$: every entity of $S_i$ is an entity of $E$, inherits its attributes and key, and may have attributes and relationships of its own. The specialisation is **disjoint** if no entity belongs to two subclasses, and **overlapping** otherwise; it is **total** (covering) if every entity of $E$ belongs to some subclass, and **partial** otherwise. Building a superclass from existing entity sets is called **generalisation**.
:::

If Person(pid, name, email) has subclasses Student(year) and Lecturer(office), the specialisation is overlapping (a doctoral student may also teach) and partial (an administrator is neither). There are three standard ways to translate it:

1. **A table per entity set** — Person(pid, name, email), Student(pid, year), Lecturer(pid, office), with each subclass's pid a foreign key referencing Person. It handles every case, but reading a whole student requires a join.
2. **A table per subclass only** — Student(pid, name, email, year), Lecturer(pid, name, email, office). This avoids joins but works only for a total specialisation (otherwise administrators have nowhere to live), and for an overlapping one it duplicates name and email for people in both subclasses.
3. **A single table** — Person(pid, name, email, is_student, year, is_lecturer, office), with nulls for inapplicable attributes. Queries are simple, but nulls multiply ([[#ex-isa-nulls]]) and constraints such as "year is non-null exactly when is_student" need `CHECK` clauses.

::: example Choosing an ISA translation {#ex-isa}
A sports centre records Member(mid, name, phone) with disjoint subclasses Junior(guardian, school) and Senior(employer), and members who are neither (day visitors). Which translation should it choose, and why?
::: solution
The specialisation is disjoint and *partial* (day visitors are members in neither subclass). Strategy 2 is ruled out: day visitors would have no table. Strategy 3 gives one table Member(mid, name, phone, kind, guardian, school, employer), where for every row two or three of the last three columns are null, and a check such as `CHECK ((kind = 'junior') = (guardian IS NOT NULL))` is needed to keep the type column consistent. Strategy 1 gives Member(mid, name, phone), Junior(mid, guardian, school) and Senior(mid, employer) with foreign keys to Member; disjointness is not automatic — a mid could appear in both Junior and Senior — and needs a trigger or a `kind` column copied into the subclass keys.

With few subclass attributes and queries that mostly list all members, the single table is a reasonable choice; with many subclass-specific attributes and relationships (only juniors have a guardian who signs forms), strategy 1 keeps the schema clean. The decision depends on the workload, not only on the diagram.
:::
:::

## From ER design to relation schemas

The translation is mechanical once the design is fixed. We give it as an algorithm and then justify it.

::: algorithm ER to relational translation {#alg-er-translate}
1. **Strong entity sets.** For each strong entity set $E$, create a table with its simple attributes (composite attributes flattened into their components) and its key as primary key.
2. **Weak entity sets.** For each weak entity set $W$ with owner $E$, create a table with $W$'s attributes and the key of $E$ as a foreign key (`ON DELETE CASCADE`); the primary key is the owner's key plus the partial key.
3. **Many-to-one relationships.** For each binary relationship $R$ that is many-to-one from $A$ to $B$, add the key of $B$ as a foreign key column of $A$'s table, with $R$'s attributes. If $A$'s participation is total, declare the column `NOT NULL`. If $R$ is one-to-one, add the column on one side only and declare it `UNIQUE` (choose the side with total participation, to avoid nulls, when there is one).
4. **Many-to-many and higher-degree relationships.** For each remaining relationship set $R$, create a table whose columns are the keys of all participants (each a foreign key, with role names for repeated entity sets) and $R$'s attributes; its primary key is given by [[#prop-rel-key]] (for degree $k > 2$, the keys of the participants not on the "one" side of any functional constraint).
5. **Multivalued attributes.** For each multivalued attribute $M$ of $E$, create a table with the key of $E$ (foreign key) and $M$; the primary key is both.
6. **Specialisations.** Translate each ISA hierarchy by one of the three strategies of [[#def-isa]].
:::

::: proposition Folding a many-to-one relationship into a table {#prop-fold}
In step 3 of [[#alg-er-translate]], storing a many-to-one relationship $R$ from $A$ to $B$ as a column of $A$'s table represents exactly the same information as a separate table $R(K_A, K_B)$, and the key of $A$'s table is unchanged. If $A$'s participation in $R$ is partial, the column must allow nulls.
:::

::: proof
By [[#prop-rel-key]], $K_A$ is a key of the separate table $R(K_A, K_B, \ldots)$: each $a$ appears in at most one row. So $R$ is a partial function $a \mapsto (b, \text{attributes})$, and storing its value in the row of $a$, or a null when $a$ is unrelated, is a bijection between legal instances of the two designs. The rows of $A$'s table are still identified by $K_A$, since each $a$ still has exactly one row. If some $a$ is unrelated (partial participation), its row needs a value in the new column, and only null expresses "no related $b$"; with total participation the column is never null, which `NOT NULL` enforces.
:::

The proof also shows why the translation fails for many-to-many relationships: a column of $A$'s table can hold only one $b$ per $a$. Stuffing several (a comma-separated list of course codes) breaks first normal form and makes the data invisible to joins, keys and constraints.

::: example Translating the university design {#ex-university}
Translate the university design of this chapter — Student, Course, Department, Lecturer, weak Section (owner Course, partial key term and number), Enrolled (Student–Section, many-to-many, attribute grade), Teaches (Section → Lecturer, total for Section), Offers (Course → Department, total for Course), WorksIn (Lecturer → Department, total for Lecturer), Head (Department–Lecturer, one-to-one, partial on both sides), Prereq (Course–Course, many-to-many) — and run the result.
::: solution
Steps 1–4 of [[#alg-er-translate]] give seven tables. Teaches, Offers and WorksIn become foreign-key columns; Head becomes a `UNIQUE` column of Department (it could equally live in Lecturer, but then nearly every lecturer row would hold a null); Enrolled and Prereq become tables. In SQLite 3.46.1:

```sql
PRAGMA foreign_keys = ON;
CREATE TABLE Department (
  dname    TEXT PRIMARY KEY,
  building TEXT,
  head     INTEGER UNIQUE REFERENCES Lecturer(lid)   -- one-to-one, partial: may be NULL
);
CREATE TABLE Lecturer (
  lid    INTEGER PRIMARY KEY,
  name   TEXT NOT NULL,
  dname  TEXT NOT NULL REFERENCES Department(dname)  -- WorksIn: many-to-one, total
);
CREATE TABLE Course (
  code    TEXT PRIMARY KEY,
  title   TEXT NOT NULL,
  credits INTEGER NOT NULL,
  dname   TEXT NOT NULL REFERENCES Department(dname) -- Offers: many-to-one, total
);
CREATE TABLE Section (                               -- weak entity, owner Course
  code   TEXT REFERENCES Course(code) ON DELETE CASCADE,
  term   TEXT,
  num    INTEGER,
  lid    INTEGER NOT NULL REFERENCES Lecturer(lid),  -- Teaches: many-to-one, total
  PRIMARY KEY (code, term, num)
);
CREATE TABLE Student (sid INTEGER PRIMARY KEY, name TEXT NOT NULL, year INTEGER);
CREATE TABLE Enrolled (                              -- many-to-many with attribute
  sid   INTEGER REFERENCES Student(sid),
  code  TEXT, term TEXT, num INTEGER,
  grade TEXT,
  PRIMARY KEY (sid, code, term, num),
  FOREIGN KEY (code, term, num) REFERENCES Section ON DELETE CASCADE
);
CREATE TABLE Prereq (                                -- recursive, with roles
  course TEXT REFERENCES Course(code),
  needs  TEXT REFERENCES Course(code),
  PRIMARY KEY (course, needs)
);
```

After inserting two departments, three lecturers (Rao and Kim in CS, Silva in MA), CS101 and MA101 with three sections and three enrolments, the constraints behave as designed:

```console
$ sqlite3 -cmd "PRAGMA foreign_keys=ON" er.db "UPDATE Department SET head = 10 WHERE dname = 'MA';"
Error: stepping, UNIQUE constraint failed: Department.head (19)
$ sqlite3 -cmd "PRAGMA foreign_keys=ON" er.db "INSERT INTO Course VALUES ('CS999','Orphan',5,NULL);"
Error: stepping, NOT NULL constraint failed: Course.dname (19)
$ sqlite3 -cmd "PRAGMA foreign_keys=ON" er.db "DELETE FROM Course WHERE code='CS101'; SELECT COUNT(*) FROM Section; SELECT COUNT(*) FROM Enrolled;"
1
1
```

Rao (lecturer 10) already heads CS, so he cannot also head MA: one-to-one. A course without a department is rejected: total participation. Deleting CS101 cascades to its two sections and from them to their two enrolments, leaving one section and one enrolment (MA101). (The `PRAGMA` must be issued on every connection, hence the `-cmd` option.)

Note the circular reference: Department.head references Lecturer and Lecturer.dname references Department. Rows must therefore be inserted in an order that satisfies both — departments first with a null head, then lecturers, then the heads — or with the constraints declared `DEFERRABLE INITIALLY DEFERRED`, which postpones checking to the end of the transaction ([[databases/transactions]]).
:::
:::

The whole design, entity sets and relationship sets alike, forms a graph, and a query follows paths in it: the names of the lecturers of Ada's sections are reached by the path Student — Enrolled — Section — Teaches — Lecturer.

::: widget graph
nodes: Student@0,1; Enrolled@1,1; Section@2,1; Course@3,1; Teaches@2,0; Lecturer@3,0; WorksIn@4,0; Department@4,1; Offers@3.5,1.6; Head@4.6,0.5; Prereq@3,2
edges: Student-Enrolled; Enrolled-Section; Section-Course; Section-Teaches; Teaches-Lecturer; Lecturer-WorksIn; WorksIn-Department; Course-Offers; Offers-Department; Department-Head; Head-Lecturer; Course-Prereq
algorithm: bfs
start: Student
caption: The university design as a graph: entity sets (Student, Section, Course, Lecturer, Department) alternate with relationship sets (Enrolled, Teaches, WorksIn, Offers, Head, Prereq); the edge Section–Course is Section's identifying relationship. Breadth-first search from Student finds the shortest chain of joins from students to everything else — Lecturer is $4$ steps away, Department $5$ or $6$ depending on the route. After translation the many-to-one relationships disappear into foreign-key columns, so each such pair of steps becomes a single join.
:::

::: quiz
A relationship Advises between Student and Lecturer is many-to-one from Student to Lecturer, and every student must have an adviser. How should it be translated?
- [ ] A table Advises(sid, lid) with primary key (sid, lid).
- [x] A column `adviser` in Student, referencing Lecturer, declared `NOT NULL`.
- [ ] A column `advisee` in Lecturer, referencing Student.
- [ ] A column `adviser` in Student, declared `UNIQUE`.
::: solution
Many-to-one from Student means each student has at most one adviser, so by [[#prop-fold]] the lecturer's key can be stored in the student's row; total participation makes it `NOT NULL`. A table with key (sid, lid) would allow a student two advisers. A column in Lecturer could hold only one advisee per lecturer. `UNIQUE` would forbid two students from sharing an adviser, making the relationship one-to-one.
:::
:::

## Design choices and common errors

ER modelling is not unique: the same requirements admit several correct designs, and the art is to choose the one that captures the rules users care about with the least redundancy.

- **Entity or attribute?** Department could be a string attribute of Course. Make it an entity set when it has attributes of its own (building, head) or participates in other relationships; otherwise an attribute suffices, perhaps with a check constraint or a small reference table listing valid values.
- **Entity or relationship?** An enrolment can be a relationship (as here) or an entity Enrolment with its own key. Choose an entity when the thing has an identity of its own — it may occur several times between the same participants, or other things refer to it.
- **Where does an attribute belong?** Grade belongs to Enrolled, not to Student (a student has many grades) nor to Section (a section has many students). An attribute placed on the wrong side causes repetition — exactly the anomalies of [[databases/normalisation]].
- **Redundant relationships.** If Course–Department (Offers) is stored, a relationship Section–Department would be redundant: it is derivable through Course. Storing it invites inconsistency.

::: warning Cardinalities read from sample data are guesses
Looking at today's data and observing that no section has two lecturers does not show that Teaches is many-to-one; it shows that it has not happened *yet*. Constraints in a design are commitments that the schema will enforce for ever, and an over-restrictive one — a `UNIQUE` or a foreign-key column where a relationship table was needed — makes legitimate facts impossible to record, which in practice leads to workarounds such as a second lecturer typed into a comments field. Under-restrictive designs have the opposite problem: they accept nonsense. Settle every cardinality by asking the people who know the rules, and record why.
:::

Some rules are beyond the ER model altogether: "the head of a department works in that department" relates two relationships (Head and WorksIn). It can still be enforced in SQL, by a composite foreign key ([[#ex-head]]), a `CHECK` with a subquery where supported, or a trigger. Recording such rules alongside the diagram is part of the design.

::: example Cardinality arithmetic {#ex-min-max}
In a tutorial scheme, each student attends exactly $2$ tutorial groups and each group has exactly $5$ students. If there are $30$ students, how many groups are there? Can there be $31$ students?
::: solution
Count the relationships of Attends in two ways: each student contributes $2$, each group $5$, so $2 \cdot \lvert \text{Student} \rvert = 5 \cdot \lvert \text{Group} \rvert$. With $30$ students there are $60$ attendances and $12$ groups. With $31$ students, $62$ attendances would have to equal $5\lvert\text{Group}\rvert$, impossible since $5 \nmid 62$. So exact (min, max) constraints on both sides can make some numbers of entities impossible — the constraints are consistent only when $\lvert\text{Student}\rvert$ is a multiple of $5$. The double-counting argument is the handshake lemma of [Maths Atlas: graphs](/learn/maths/lesson.php?c=discrete&l=graphs), applied to the bipartite graph of the relationship.
:::
:::

::: history
Peter Pin-Shan Chen introduced the entity–relationship model in "The entity-relationship model — toward a unified view of data" (*ACM Transactions on Database Systems*, 1976), proposing it as a bridge between the network, relational and entity-set views of data, together with the diamond-and-rectangle diagrams. Extensions for specialisation, generalisation and aggregation followed in the late 1970s and 1980s (John and Diane Smith's "Database abstractions: aggregation and generalization", 1977, introduced the latter two terms), leading to the "enhanced" ER models of the textbooks. Crow's-foot notation, from Gordon Everest's work around 1976, became common in industrial tools, and UML class diagrams (standardised in 1997) are now widely used for the same purpose. The relational translation of [[#alg-er-translate]] is folklore of the late 1970s and appears, with small variations, in every database textbook.
:::

## Where this leads

The ER design fixes which tables exist and how they reference each other, but not whether each table is free of redundancy: a design that puts the department's building into the Course entity set translates without complaint into a table that repeats the building for every course. Functional dependencies and normal forms ([[databases/normalisation]]) give a precise test for such problems and algorithms to repair them, and the keys found here are their starting point. The relationships of the design become the join paths of queries ([[databases/sql]]) and the foreign keys that the optimiser uses to estimate join sizes ([[databases/query-optimisation]]). Larger systems also model data for software design — see [[software-engineering]] for UML and domain modelling.

::: summary
- Conceptual design captures **entity sets**, their **attributes** and **keys**, and **relationship sets** with their own attributes, before any table is written.
- **Cardinality** (many-to-one, one-to-one, many-to-many) and **participation** (total or partial) constraints are claims about the world; they become keys, foreign keys, `UNIQUE` and `NOT NULL`.
- The key of a binary relationship set is $K_A \cup K_B$ for many-to-many, $K_A$ for many-to-one from $A$ ([[#prop-rel-key]]).
- A **ternary** relationship is not determined by its three binary projections ([[#prop-ternary]]).
- A **weak entity set** is identified by its owner's key plus a partial key; its foreign key to the owner cascades on delete.
- ISA hierarchies translate as a table per entity set, a table per subclass, or a single table with nulls — a trade-off between joins, duplication and nulls.
- [[#alg-er-translate]] turns a design into tables mechanically; many-to-one relationships fold into foreign-key columns ([[#prop-fold]]), many-to-many ones need their own table.
:::

## Exercises

::: exercise Maximum size of a relationship {level=1 check="240"}
A university has $40$ students and $6$ clubs, and Member is a many-to-many relationship between them. What is the largest possible number of relationships in Member? What would it be if Member were many-to-one from Student to Club? (Enter the first number.)
::: solution
A many-to-many relationship set is a subset of Student $\times$ Club, so it has at most $40 \cdot 6 = 240$ relationships (every student in every club). If it were many-to-one from Student, each student could appear at most once, so at most $40$.
:::
:::

::: exercise Keys from cardinalities {level=1}
Give the primary key of the table for each relationship set, where Patient has key pid, Doctor key did and Ward key wid: (a) Treats, many-to-many between Patient and Doctor, with attribute since; (b) AdmittedTo, many-to-one from Patient to Ward; (c) Manages, one-to-one between Doctor and Ward.
::: solution
By [[#prop-rel-key]]: (a) (pid, did); the attribute since is not part of the key. (b) pid — and by [[#prop-fold]] it would normally be folded into Patient as a column `wid`. (c) Either did or wid is a candidate key; choose one as primary and declare the other `UNIQUE`, or fold the relationship into Ward as a `UNIQUE` column `manager`.
:::
:::

::: exercise Counting tables {level=1 check="6"}
A design has strong entity sets Author, Book and Publisher; a many-to-many relationship Wrote(Author, Book) with attribute position; a many-to-one relationship PublishedBy from Book to Publisher; a multivalued attribute keywords of Book; and a weak entity set Edition with owner Book. How many tables does [[#alg-er-translate]] produce? (Enter the number.)
::: solution
Author, Book, Publisher (step 1), Edition (step 2), Wrote (step 4) and BookKeyword (step 5): $6$ tables. PublishedBy becomes a foreign-key column `publisher` of Book (step 3), not a table.
:::
:::

::: exercise A library design {level=2}
A library lends physical copies of books. A book (ISBN, title, year) has several copies, each numbered $1, 2, \ldots$ within the book and with a shelf location. Members (member number, name) borrow copies; a loan records the date out and the date returned (null while on loan), and the same member may borrow the same copy again later. Draw (in words) an ER design and translate it into tables with keys.
::: solution
Entity sets: Book($\underline{\text{isbn}}$, title, year), Member($\underline{\text{mno}}$, name), and Copy as a *weak* entity set with owner Book and partial key copy_no, attribute shelf. Loan cannot be a plain relationship set between Member and Copy, because the same pair may occur several times (a relationship set holds each pair once). Either make Loan an entity set with a surrogate key, or a relationship whose key includes date_out — assuming a copy cannot be lent twice on the same day. Tables:

- Book(isbn, title, year), primary key isbn;
- Copy(isbn, copy_no, shelf), primary key (isbn, copy_no), isbn references Book `ON DELETE CASCADE`;
- Member(mno, name);
- Loan(isbn, copy_no, date_out, mno, date_returned), primary key (isbn, copy_no, date_out), (isbn, copy_no) references Copy, mno references Member `NOT NULL`.

The rule "a copy is on loan to at most one member at a time" is not captured by these keys; it needs a check that no two loans of the same copy have overlapping periods, typically a trigger (or, in PostgreSQL, an exclusion constraint).
:::
:::

::: exercise Ternary or binary? {level=2}
A company records which engineer uses which skill on which project. Explain, using [[#prop-ternary]], when Uses(Engineer, Skill, Project) can be replaced by HasSkill(Engineer, Skill), Needs(Project, Skill) and WorksOn(Engineer, Project), and give an instance showing what is lost when it cannot.
::: solution
The binary design stores only the three projections. It is correct exactly when the business rule says "an engineer uses a skill on a project whenever she has the skill, the project needs it and she works on the project" — then the ternary relation is the join of the three binary ones and nothing is lost. If engineers use only some of their skills on some of their projects, the ternary is needed. Instance: Ana has skills SQL and Java and works on projects P and Q; P needs SQL and Java, Q needs SQL. If she uses Java on P and SQL only on Q, the ternary is {(Ana, Java, P), (Ana, SQL, Q)}, but the join of the projections also contains (Ana, SQL, P) — a fact that is false.
:::
:::

::: exercise Nulls in a single-table ISA {#ex-isa-nulls level=2 check="3300"}
Person has $1000$ entities with a disjoint, partial specialisation into Student ($700$ entities, $2$ own attributes) and Staff ($100$ entities, $3$ own attributes); the other $200$ are neither. With the single-table strategy, how many null values do the subclass attribute columns contain? (Enter the number.)
::: solution
The single table has $5$ subclass columns. A student row leaves the $3$ staff columns null: $700 \cdot 3 = 2100$. A staff row leaves the $2$ student columns null: $100 \cdot 2 = 200$. A row that is neither leaves all $5$ null: $200 \cdot 5 = 1000$. Total $3300$ of the $5000$ subclass cells — two-thirds of them. With a table per entity set there would be no nulls at all.
:::
:::

::: exercise One-to-one with total participation {level=2}
Each employee has exactly one company car, and each car is assigned to at most one employee (some cars are spare). Where should the relationship go in the tables, and which constraints make the schema enforce the rule?
::: solution
The relationship is one-to-one, total for Employee and partial for Car. Following step 3 of [[#alg-er-translate]], put it on the total side: Employee(eid, …, car NOT NULL UNIQUE REFERENCES Car). `NOT NULL` enforces that every employee has a car, `UNIQUE` that no car has two employees, and the foreign key that the car exists. Spare cars are simply cars no employee references. Putting the column in Car instead (`driver UNIQUE`) would need nulls for spare cars and could not enforce that every employee has a car.
:::
:::

::: exercise Heads work in their department {#ex-head level=3}
In [[#ex-university]] nothing stops a lecturer from CS being made head of MA. Show how a composite foreign key enforces "the head of a department works in that department", using only `PRIMARY KEY`, `UNIQUE` and `FOREIGN KEY`, and test it in SQLite.
::: solution
Make (lid, dname) a referencable key of Lecturer — it is a superkey because lid is a key — and let Department reference the pair (head, dname):

```sql
PRAGMA foreign_keys = ON;
CREATE TABLE Department (
  dname TEXT PRIMARY KEY,
  head  INTEGER UNIQUE,
  FOREIGN KEY (head, dname) REFERENCES Lecturer (lid, dname)
);
CREATE TABLE Lecturer (
  lid   INTEGER PRIMARY KEY,
  dname TEXT NOT NULL REFERENCES Department(dname),
  UNIQUE (lid, dname)                  -- target of the composite foreign key
);
INSERT INTO Department (dname) VALUES ('CS'), ('MA');
INSERT INTO Lecturer VALUES (10, 'CS'), (11, 'MA'), (12, 'CS');
UPDATE Department SET head = 10 WHERE dname = 'CS';
UPDATE Department SET head = 11 WHERE dname = 'MA';
SELECT * FROM Department;
UPDATE Department SET head = 12 WHERE dname = 'MA';
```

```console
$ sqlite3 h.db < head.sql
CS|10
MA|11
Runtime error near line 17: FOREIGN KEY constraint failed (19)
```

Making Kim (12, in CS) head of MA requires a Lecturer row (12, 'MA'), which does not exist, so the update is rejected. While `head` is null the composite foreign key is not checked (SQL's default `MATCH SIMPLE` rule ignores a foreign key with any null component), so a department may still be without a head.
:::
:::

::: exercise Consistency of cardinality constraints {level=3 check="3"}
Entity sets $A$ and $B$ are related by $R$. Each $a \in A$ participates in exactly $2$ relationships and each $b \in B$ in exactly $3$, and $R$ is a set (no repeated pairs). Prove that $\lvert A \rvert$ must be a multiple of $3$, and find the smallest positive $\lvert A\rvert$ for which a legal instance exists. (Enter that number.)
::: solution
Counting relationships from both sides, $\lvert R\rvert = 2\lvert A\rvert = 3\lvert B\rvert$, so $3 \mid 2\lvert A\rvert$, and since $\gcd(2, 3) = 1$, $3 \mid \lvert A\rvert$. For $\lvert A\rvert = 3$ we need $\lvert B\rvert = 2$ and $6$ relationships: relate every $a_i$ to both $b_1$ and $b_2$. Each $a$ has $2$ partners and each $b$ has $3$, with no pair repeated. So the smallest positive size is $3$. (In general an instance exists for every $\lvert A\rvert = 3k$, $\lvert B\rvert = 2k$: take $k$ disjoint copies.)
:::
:::

::: exercise Testing a translation {level=3}
Write the SQL for the design of the library exercise above and, in Python with parameterised queries, check three things: deleting a book deletes its copies; a loan of a non-existent copy is rejected; the same member may borrow the same copy on two different dates but not twice on the same date.
::: solution
```python
import sqlite3
con = sqlite3.connect(":memory:")
con.execute("PRAGMA foreign_keys = ON")
con.executescript("""
CREATE TABLE Book (isbn TEXT PRIMARY KEY, title TEXT NOT NULL, year INTEGER);
CREATE TABLE Copy (isbn TEXT REFERENCES Book ON DELETE CASCADE, copy_no INTEGER,
                   shelf TEXT, PRIMARY KEY (isbn, copy_no));
CREATE TABLE Member (mno INTEGER PRIMARY KEY, name TEXT NOT NULL);
CREATE TABLE Loan (isbn TEXT, copy_no INTEGER, date_out TEXT, mno INTEGER NOT NULL
                   REFERENCES Member, date_returned TEXT,
                   PRIMARY KEY (isbn, copy_no, date_out),
                   FOREIGN KEY (isbn, copy_no) REFERENCES Copy ON DELETE CASCADE);
""")
con.execute("INSERT INTO Book VALUES (?, ?, ?)", ("978-0", "Dune", 1965))
con.executemany("INSERT INTO Copy VALUES (?, ?, ?)", [("978-0", 1, "A1"), ("978-0", 2, "A1")])
con.execute("INSERT INTO Member VALUES (?, ?)", (7, "Zoe"))
def loan(isbn, n, day):
    try:
        con.execute("INSERT INTO Loan VALUES (?, ?, ?, ?, NULL)", (isbn, n, day, 7))
        return "ok"
    except sqlite3.IntegrityError as e:
        return str(e)
print(loan("978-0", 1, "2026-03-01"), loan("978-0", 1, "2026-04-01"),
      loan("978-0", 1, "2026-04-01"), loan("978-0", 3, "2026-04-02"), sep=" | ")
con.execute("DELETE FROM Book WHERE isbn = ?", ("978-0",))
print(con.execute("SELECT COUNT(*) FROM Copy").fetchone()[0],
      con.execute("SELECT COUNT(*) FROM Loan").fetchone()[0])
```

```console
$ python3 library.py
ok | ok | UNIQUE constraint failed: Loan.isbn, Loan.copy_no, Loan.date_out | FOREIGN KEY constraint failed
0 0
```

The second loan on a new date is accepted, the repeat on the same date violates the primary key, copy 3 does not exist, and deleting the book cascades to its copies and from them to the loans. Whether loans *should* disappear with the book is itself a design question — a library would rather keep its history, and would use `ON DELETE RESTRICT` and mark books as withdrawn.
:::
:::
