*I saw the man with the telescope.* The sentence has two meanings. In one, I used the telescope to see the man; in the other, the man I saw was holding a telescope. The words are the same and so is their order, and neither *saw* nor *with* nor *telescope* is ambiguous by itself. What differs is how the words are **grouped**. In the first meaning, *with the telescope* belongs with *saw the man*: it says how I saw him. In the second, it belongs with *the man*: it says which man. Grammar, in other words, is not a matter of words in a line. Sentences have a hierarchical structure, and two structures can share the same string of words.

This chapter is about that structure. It introduces the idea of a **constituent**, the tests that linguists use to find constituents, the difference between the **category** of a phrase and its **function**, the parts of a phrase (head, complement, modifier), and the tree diagrams that show how phrases are built. It ends with ambiguity, with an alternative way of showing structure (dependency grammar) and with a comparison of English and Mandarin phrase structure. The clause elements of school grammar — subject, verb, object, complement, adverbial — are taken as known from [[core-grammar/sentence-patterns]], and the parts of a clause and a complex sentence from [[complex-sentences/clause-structure]].

## Constituents

::: definition Constituent {#def-constituent}
A **constituent** is a word or a group of words that functions as a unit in the structure of a sentence. Constituents are built inside constituents: in *The old dog barked*, *old dog* is a constituent inside the larger constituent *the old dog*, which, together with *barked*, makes up the whole sentence. The constituents that a larger constituent is directly divided into are its **immediate constituents**: those of the sentence are *the old dog* and *barked*.
:::

Leonard Bloomfield introduced immediate-constituent analysis in *Language* (1933), and Rulon Wells developed it in an article of 1947. The idea is simple: a sentence is divided into two or more parts, each part is divided again, and so on down to the words. The hard question is how to know where the divisions are. In *The old dog barked*, why is the first division between *dog* and *barked*, and not between *old* and *dog*? Intuition says so, but linguistics needs tests that anyone can apply and that give the same answer for sentences where intuition is unclear.

## Constituency tests

::: theorem Six tests for constituents {#rule-tests}
A string of words is probably a constituent if it can do one or more of the following without changing the basic meaning of the sentence. The examples test strings in *The children played football in the park on Sunday.*

1. **Substitution (replacement by a pro-form).** Replace the string with one word — a pronoun (*they*, *it*), *there*, *then*, *one*, or *do so* / *do it* for a verb phrase. ✓ ***They** played football in the park on Sunday* (*the children*). ✓ *The children played football **there** on Sunday* (*in the park*). ✓ *The children **did so** on Sunday* (*played football in the park*).
2. **Movement (fronting).** Move the string to the front of the sentence. ✓ ***In the park**, the children played football on Sunday.* ✓ ***On Sunday**, the children played football in the park.* ✗ ***Football in**, the children played the park on Sunday.*
3. **Clefting.** Put the string in the frame *It was ___ that …*. ✓ *It was **football** that the children played in the park on Sunday.* ✓ *It was **in the park** that the children played football.* ✗ *It was **football in the** that the children played park.*
4. **Coordination.** Join the string with another string of the same kind using *and* or *or*. ✓ *The children played **football** and **cricket** in the park.* ✓ *The children played football **in the park** and **on the beach**.*
5. **Ellipsis.** Leave the string out where it can be recovered from the context. ✓ *The children played football in the park, and the parents did __ too* (= *played football in the park*).
6. **Fragment answer.** Use the string alone as the answer to a question. *Where did the children play football?* — ✓ ***In the park.*** *What did they do?* — ✓ ***Played football in the park.*** (in informal speech).
:::

::: proof
The tests work because the rules of grammar refer to constituents, not to arbitrary strings. A pronoun stands for a noun phrase, so a string that can be replaced by *they* behaves as a noun phrase; the rule that fronts material in English moves whole phrases; the cleft frame takes one phrase in its focus position; *and* joins units of the same kind. If a string passes several tests, the evidence that it is a unit is strong.

The tests have limits, and good analysis knows them. Not every constituent passes every test: a verb phrase cannot be clefted in standard English (✗ *It was play football that the children did*), though it can be fronted in some contexts (*They said they would win, and **win** they did*), and a determiner such as *the* cannot be replaced by a pro-form at all. More seriously, the coordination test sometimes seems to show constituents that the other tests do not: *Lin gave **Sam a pen** and **Kim a book*** coordinates *Sam a pen*, which fails substitution and movement. Such **non-constituent coordination** is analysed in different ways — as coordination of whole verb phrases with the verb left out of the second, or as evidence for more flexible structures — and it shows that the tests are evidence to be weighed, not a mechanical procedure. Carnie (2021) and Huddleston and Pullum (2002) both treat the tests in this spirit.
:::

::: example Applying the tests {#ex-tests}
Is *a letter to her sister* a constituent in (a) *Mei wrote a letter to her sister* and (b) *Mei sent a letter to her sister*? Apply at least three tests.
::: solution
**(a) *Mei wrote a letter to her sister.*** On the most natural reading the letter is addressed to her sister.
- Substitution: ✓ *Mei wrote **it*** (= *a letter to her sister*), and the sentence still mentions the sister's letter only if *it* includes *to her sister*.
- Clefting: ✓ *It was **a letter to her sister** that Mei wrote.*
- Fragment answer: *What did Mei write?* — ✓ ***A letter to her sister.***
So *a letter to her sister* is a constituent: a noun phrase with *to her sister* inside it. (A second reading is possible, with *to her sister* outside the noun phrase, as in (b).)

**(b) *Mei sent a letter to her sister.*** Here *send* takes two complements, the thing sent and the recipient.
- Substitution: *Mei sent **it** to her sister* is the natural pronoun version, with *it* = *a letter* only. ? *Mei sent **it*** with *it* = *a letter to her sister* is odd.
- Clefting: ✓ *It was **to her sister** that Mei sent a letter*, which separates the two.
- Movement: ✓ ***To her sister**, Mei sent a letter; to her brother, a postcard.*
- Fragment answer: *Who did Mei send a letter to?* — ✓ ***(To) her sister.***
So in (b), *a letter* and *to her sister* are two separate constituents, both complements of *sent*. The same words have different structures with different verbs, because *send* selects a recipient and *write* does not have to.
:::
:::

## Categories and functions

Grammar uses two different kinds of label, and confusing them is the commonest source of muddle in sentence analysis.

::: definition Category and function {#def-category-function}
A **category** says what kind of unit a constituent is, by its internal structure: noun phrase (NP), verb phrase (VP), adjective phrase (AdjP), adverb phrase (AdvP), preposition phrase (PP), clause. A **function** says what job a constituent does in the larger unit it belongs to: subject, object, predicative complement, adjunct (adverbial), modifier, determiner. Categories are labels for **forms**; functions are labels for **relations**.
:::

The two vary independently. One category can have many functions, and one function can be filled by different categories:

| category | function | example |
|---|---|---|
| NP | subject | ***The new manager** arrived.* |
| NP | object | *We met **the new manager**.* |
| NP | predicative complement | *She is **the new manager**.* |
| NP | adjunct (time) | *She arrived **last week**.* |
| PP | subject | ***After lunch** suits me.* |
| clause | subject | ***That she resigned** surprised us.* |
| AdjP | predicative complement | *She seems **very capable**.* |

Huddleston and Pullum (2002) insist on this distinction more strictly than traditional grammar, which often mixes the two (calling *last week* an "adverb" because it does the job of one). Their grammar has a further category, the **determinative**, for words such as *the*, *a*, *this*, *some* and *every*, and uses **determiner** for the function these usually have in a noun phrase — a function that a possessive NP can also fill (***the manager's** office*). The school terms of [[core-grammar/word-classes]] are close enough for most purposes, but at this level it helps to ask two questions about every constituent: *what is it?* and *what is it doing?*

::: quiz
In *She left **the next morning***, what are the category and the function of the phrase in bold?
- [ ] adverb phrase; adjunct
- [x] noun phrase; adjunct of time
- [ ] noun phrase; object
- [ ] preposition phrase; adjunct
::: solution
Its category is noun phrase: its head is the noun *morning*, with the determinative *the* and the adjective *next*, and it could be the subject of another sentence (*The next morning was cold*). Its function is adjunct (adverbial) of time — it says when she left, and it is not an object, because *leave* here does not take one (compare *She left the room*, where *the room* is the object). Calling it an "adverb phrase" mixes up category and function.
:::
:::

::: example Two labels for every phrase {#ex-labels}
Give the category and the function of each immediate constituent of the clause *Last Friday the new students from Guilin gave their teacher a surprise party.*
::: solution
1. **Find the verb**: *gave*, a verb that takes two objects (pattern SVOO, [[core-grammar/sentence-patterns#rule-seven]]).
2. **Find the subject**: the NP before the verb that agrees with it and would invert in a question (*Did the new students from Guilin give …?*): *the new students from Guilin*. Category NP (head *students*); function subject.
3. **Find what follows the verb**: *their teacher* and *a surprise party* are two NPs. *Their teacher* is the recipient — function indirect object; *a surprise party* is the thing given — function direct object. Test: *They gave **her** **one*** replaces each separately.
4. **What is left**: *Last Friday*. Category NP (head *Friday*); function adjunct of time. It moves freely (*The new students … gave … a surprise party last Friday*), as adjuncts usually do.
5. **Inside the constituents**: *from Guilin* is a PP (category) functioning as a modifier of *students*; *new* is an adjective functioning as a modifier; *the* and *their* are a determinative and a possessive pronoun, both functioning as determiner; *surprise* is a noun functioning as a modifier of *party*.

The labels show the independence of the two kinds: NPs fill three different functions here (subject, objects, adjunct), and the determiner function is filled by two different categories.
:::
:::

## Heads, complements and modifiers

Every phrase is built around one word, which determines its category and much of its behaviour.

::: definition Head, complement and modifier {#def-head}
The **head** of a phrase is the word that determines its category and is essential to it: the noun *student* in *a physics student from Lagos*, the verb *put* in *put the box on the shelf*, the preposition *on* in *on the shelf*, the adjective *proud* in *very proud of her work*. A **complement** is a dependent that the head selects — that completes its meaning and is often required by it: *the box* and *on the shelf* with *put*; *of her work* with *proud*. A **modifier** (or **adjunct**) is an optional dependent that adds information and is not selected by the head: *very* in *very proud*, *from Lagos* in *a student from Lagos*.
:::

::: theorem Telling complements from modifiers {#rule-complement}
1. **Selection.** Complements are licensed by particular heads; modifiers can go with almost any head of the category. *Put* requires a location (✗ *She put the box*); *in the morning* can modify almost any verb.
2. **Order.** In English, a complement normally comes closer to the head than a modifier: ✓ *a student **of physics** with long hair*, ? *a student with long hair **of physics***.
3. **The *do so* test.** *Do so* replaces a verb together with its complements, but can leave modifiers behind: ✓ *Kim read the report **in the morning**, and Lee did so **in the evening*** (*in the morning* is a modifier). ✗ *Kim put the book **on the shelf**, and Lee did so **on the table*** (*on the shelf* is a complement of *put*). With nouns, *one* does the same job: ✓ *the student with long hair and the one with short hair*; ? *the student of physics and the one of chemistry*.
4. **Iteration.** Modifiers can be stacked (*a student from Lagos with long hair in my class*); a head usually takes each complement only once.
:::

::: proof
The distinction reflects the fact that heads come with requirements. A dictionary entry for *put* must say that it needs an object and a location; one for *depend* that it takes a PP with *on*; one for *fond* that it takes a PP with *of*. These requirements are part of the head's meaning, which is why complements are close to the head and are included when a pro-form like *do so* or *one* stands for the head. Modifiers are not part of any head's entry, so they attach further out and can repeat. The four criteria usually agree, but some cases are unclear: in *She lives in Paris*, *in Paris* is required (✗ *She lives*, in this sense) and so behaves as a complement, though PPs of place are usually modifiers. [[verb-patterns/transitive-intransitive]] and [[verb-patterns/prepositional-verbs]] list the complement patterns of common English verbs.
:::

::: quiz
In *She put the vase on the table in the evening*, which PP is a **complement** of *put*?
- [x] *on the table*
- [ ] *in the evening*
- [ ] both
- [ ] neither
::: solution
*Put* requires a location: ✗ *She put the vase in the evening.* The *do so* test agrees: ✓ *She put the vase on the table in the evening, and he did so in the morning* leaves *in the morning* outside, but ✗ *… and he did so on the shelf* fails, because *do so* already includes the location complement. *In the evening* is a modifier.
:::
:::

## Trees and phrase structure rules

The structure that the tests reveal can be shown as a **tree**: each constituent is a node, labelled with its category, and lines connect it to its immediate constituents. Brackets show the same thing in a line of text: [S [NP the children ] [VP played [NP football ] [PP in [NP the park ] ] ] ], with the category written just inside each opening bracket — though from here on we use trees, which are easier to read.

A grammar can describe all the trees of a language with a small set of **phrase structure rules**, which say what each category may consist of. A simplified set for English:

| rule | read as | example |
|---|---|---|
| S → NP VP | a clause consists of a noun phrase and a verb phrase | *the children* + *played football* |
| NP → (Det) (AdjP) N (PP) | an NP has a noun head, optionally with a determiner, a pre-head adjective phrase and a post-head PP | *the* + *old* + *man* + *with a stick* |
| VP → V (NP) (NP) (PP) | a VP has a verb head with up to two NPs and a PP | *gave* + *Sam* + *a book* + *on Monday* |
| PP → P NP | a PP has a preposition head and an NP complement | *in* + *the park* |
| AdjP → (AdvP) Adj (PP) | an AdjP has an adjective head | *very* + *proud* + *of her work* |

Parentheses mark optional elements. The rules are simplified — real English NPs can have several modifiers, VPs can have clauses as complements, and so on — but they already show one essential property: the rules for NP and PP refer to each other. A PP contains an NP, and an NP can contain a PP, so one can be put inside the other again and again: *the book [ on the table [ in the room [ at the end [ of the corridor ] ] ] ]*. This is **recursion** ([[linguistics/what-linguistics-studies#rule-design-features]]), and it is why a finite grammar can describe an unlimited number of sentences.

::: theorem Phrases share one shape {#rule-xbar}
In English, phrases of different categories are built on a common pattern:

1. the **head** is combined first with its **complements**;
2. **modifiers** are added outside that unit, and can be repeated;
3. some phrases have a **specifier** at the outer edge — the determiner of an NP (*the*), the degree word of an AdjP in some analyses (*so*), the subject of a clause;
4. in English the head comes **before** its complements in every category: verb before object (*read books*), preposition before its NP (*on Monday*), noun before its PP complement (*students of physics*), adjective before its PP (*proud of her*).
:::

::: proof
The idea that all phrases share a structure was proposed by Chomsky (1970) and worked out by Ray Jackendoff in *X-bar Syntax* (1977); it is called **X-bar theory** because the intermediate level between head and full phrase was written with a bar over the category letter (X̄). In generative grammar it captures the parallels between categories: *destroy the city* and *the destruction of the city* have the same head–complement relation. Part 4 is a fact about English that has a typological side. Joseph Greenberg (1963) observed that languages with verb–object order tend to have prepositions, and languages with object–verb order postpositions (Japanese *Tōkyō ni* ‘Tokyo to’); Matthew Dryer (1992) confirmed many such correlations in a sample of over six hundred languages. Languages tend to be consistently head-initial or head-final, though few are perfectly consistent — and, as the note on Chinese below shows, Mandarin is an interesting mixed case. Other frameworks describe the same parallels without bars: Huddleston and Pullum (2002) use head, complement, modifier and determiner functions for every phrase, and construction grammar sees them as similarities between stored patterns.
:::

## Structural ambiguity

Now the sentence at the start of the chapter can be analysed. *I saw the man with the telescope* has two trees.

::: widget graph
title: Reading 1, *with the telescope* modifies the seeing
nodes: S@0,6; NP I@-4,4; VP@2,4; V saw@-1,2; NP the man@2,2; PP with the telescope@5,2; P with@4,0; NP the telescope@6,0
edges: S>NP I; S>VP; VP>V saw; VP>NP the man; VP>PP with the telescope; PP with the telescope>P with; PP with the telescope>NP the telescope
caption: In the first reading, the PP is a dependent of the verb: it is an immediate constituent of the VP, beside the object *the man*. It says how the seeing was done. Test: *I saw him with the telescope* — the pronoun *him* replaces only *the man*, and the PP is left outside it.
:::

::: widget graph
title: Reading 2, *with the telescope* modifies *the man*
nodes: S@0,6; NP I@-4,4; VP@2,4; V saw@-1,2; NP the man with the telescope@3,2; Det the@1,0; N man@3,0; PP with the telescope@5,0
edges: S>NP I; S>VP; VP>V saw; VP>NP the man with the telescope; NP the man with the telescope>Det the; NP the man with the telescope>N man; NP the man with the telescope>PP with the telescope
caption: In the second reading, the PP is inside the noun phrase, as a modifier of *man*: the man who had the telescope. Test: *I saw him* — now *him* replaces the whole of *the man with the telescope*. Compare the two trees: the same words, in the same order, attached at different points. Drag the nodes to compare them side by side.
:::

::: definition Structural and lexical ambiguity {#def-ambiguity}
A sentence is **structurally ambiguous** when its words can be grouped into constituents in more than one way, each grouping giving a different meaning: *I saw the man with the telescope*, *old men and women*, *the French history teacher*. It is **lexically ambiguous** when one of its words has two meanings, with no difference in structure: *She went to the bank* (‘river side’ or ‘financial institution’).
:::

::: example Two structures {#ex-ambiguity}
Give the two structures of each phrase in bracket notation, and paraphrase each meaning.

1. *old men and women*
2. *the French history teacher*
3. *Visiting relatives can be boring.*
::: solution
1. [ old [men and women] ] — both the men and the women are old; [ [old men] and women ] — only the men are old. The coordination test helps: *old men and young women* forces the second structure.
2. [ French [history teacher] ] — a history teacher who is French; [ [French history] teacher ] — a teacher of French history. In speech the stress often differs: *the French ˈhistory teacher* for the second, *the ˈFrench history teacher* or even stress on both for the first.
3. [ [visiting] [relatives] ] as an NP with *visiting* as a modifier — ‘relatives who visit’; [ visiting [relatives] ] as a non-finite clause with *relatives* as the object of *visiting* — ‘going to visit relatives’. The agreement test separates them: *Visiting relatives **are** boring* (plural NP, first reading) versus *Visiting relatives **is** boring* (clause, second reading). The modal *can* does not show agreement, which is why the sentence is ambiguous.
:::
:::

::: warning Bracketing that cuts across a constituent
When you analyse a sentence, never draw a bracket that splits a phrase from its head. ✗ [ The children played ] [ football in the park ]: *the children played* is not a constituent (it fails substitution, movement and clefting), and *football in the park* is a constituent only in the unlikely reading where the park belongs to the football. ✓ [ The children ] [ played football in the park ]: subject NP and VP. The first division of a declarative clause in English is almost always between the subject and the rest.
:::

## Another way to show structure: dependencies

Phrase structure is not the only way to represent sentence structure. **Dependency grammar**, developed by Lucien Tesnière in *Éléments de syntaxe structurale* (published in 1959, after his death), represents structure as relations between words. Each word except one (the main verb, called the **root**) depends on exactly one other word, its head, and the relations are labelled: in *The children played football*, *children* depends on *played* as its subject, *football* depends on *played* as its object, and *the* depends on *children* as its determiner. There are no phrase nodes; a phrase is simply a head together with everything that depends on it.

The two representations carry much of the same information. A head in a dependency structure corresponds to the head of a phrase in a tree, and a word with all its dependents corresponds to a constituent. Dependency structures are popular in computational linguistics, and the **Universal Dependencies** project (begun in 2014) has annotated corpora of more than a hundred languages, Mandarin among them, with one shared set of relations — which makes it possible to compare, for example, how often languages put objects after verbs. Phrase structure trees remain standard in most syntax textbooks because they show intermediate units and ambiguity of attachment clearly. Neither is "the true" structure: they are two notations, each suited to different questions.

::: example A dependency analysis {#ex-dependency}
Give the head of every word in *My sister bought a very old bicycle*, and say which word is the root.
::: solution
- *bought* is the **root**: it depends on nothing.
- *sister* → *bought* (subject).
- *My* → *sister* (determiner).
- *bicycle* → *bought* (object).
- *a* → *bicycle* (determiner).
- *old* → *bicycle* (modifier).
- *very* → *old* (modifier of the adjective).

Each phrase of a tree is recoverable: *bicycle* with all its dependents gives *a very old bicycle*, the object NP; *old* with its dependent gives the AdjP *very old*.
:::
:::

::: note English and Chinese
Mandarin and English agree on several points of phrase structure: both are basically subject–verb–object, and in both the verb comes before its object (读书 ‘read books’). They differ sharply in the noun phrase. In Mandarin, **all modifiers come before the noun**, including those that English puts after it: 桌子上的书 ‘the book on the table’, 我昨天买的书 ‘the book (that) I bought yesterday’. The particle 的 marks the boundary between modifier and head. English allows short modifiers before the noun (*the new book*) but puts PPs and relative clauses after it ([[nouns-and-articles/noun-phrases#rule-postmodifiers]]). Dryer (1992) noted that this combination in Mandarin — verb–object order, but relative clauses before the noun — is very rare among the world's languages; most VO languages put relative clauses after the noun, as English does. Mandarin adverbial PPs also come before the verb (在公园踢足球 ‘play football in the park’), where English puts them after.

Mandarin also has a constituent English lacks: the **numeral–classifier** sequence. In 三本书 ‘three books’, the classifier 本 (for bound volumes) must appear between the numeral and the noun. Constituency tests suggest that 三本 is a unit: it can stand alone as a fragment answer (你要几本? — 三本) and the noun can be left out when it is known (那三本很贵 ‘those three are expensive’). English has a partial parallel in measure phrases (*three loaves of bread*, *two pieces of advice*), which are needed with uncountable nouns; Mandarin needs a classifier with every noun when it is counted. Li and Thompson (1981) describe the classifier system, and [[linguistics/semantics]] looks at what classifiers mean.

For learners, the practical consequence is the "reversal" of long modifiers in translation, which [[nouns-and-articles/noun-phrases#ex-chinese-order]] practises: a long prenominal modifier with 的 in Chinese usually becomes a PP or relative clause after the noun in English.
:::

::: quiz
Which string is a **constituent** in *The man in the blue coat is waiting outside*?
- [ ] *man in the*
- [ ] *coat is waiting*
- [x] *the man in the blue coat*
- [ ] *blue coat is*
::: solution
*The man in the blue coat* can be replaced by *he*, clefted (*It is the man in the blue coat who is waiting*) and used as a fragment answer (*Who is waiting outside?* — *The man in the blue coat*). It is the subject NP. The other strings cut across phrase boundaries and fail every test.
:::
:::

::: history
Immediate-constituent analysis was a central method of American structural linguistics, from Bloomfield (1933) through Wells (1947) and Zellig Harris. Chomsky's *Syntactic Structures* (1957) made it formal: a **phrase structure grammar** is a set of rewrite rules like S → NP VP, and Chomsky argued that such rules alone were not enough for English and needed to be supplemented by transformations ([[linguistics/clauses-movement]]). The tree diagram itself became the standard notation in the 1960s. X-bar theory (Chomsky 1970; Jackendoff 1977) generalised the rules across categories. In parallel, dependency grammar developed in Europe from Tesnière (1959), and functional grammars, such as Michael Halliday's systemic functional grammar, analysed clauses by functions — subject, process, participant — rather than by tree shape. The descriptive grammars of English most used today, Quirk et al. (1985) and Huddleston and Pullum (2002), use constituent structure with function labels, which combines the two traditions.
:::

## Where this leads

The next chapter, [[linguistics/clauses-movement]], looks at relations between structures: questions, passives and relative clauses, and how syntactic theories model them. The structure of complex sentences in practice is taught in [[complex-sentences/clause-structure]] and the lessons that follow it; the noun phrase in [[nouns-and-articles/noun-phrases]]; verb complements in the *Verb Patterns* course. How constituent structure affects meaning, for example in quantifier scope, is part of [[linguistics/semantics]]; and how readers deal with ambiguity as they read is part of psycholinguistics, touched on in [[linguistics/what-linguistics-studies#def-acceptability]].

::: summary
- Sentences have **hierarchical structure**: words group into **constituents**, which group into larger ones; **structural ambiguity** arises when one string has two groupings.
- **Constituency tests** — substitution, movement, clefting, coordination, ellipsis, fragment answers — are evidence for units; they can disagree, especially coordination.
- Distinguish **category** (NP, VP, AdjP, AdvP, PP, clause) from **function** (subject, object, complement, adjunct, modifier, determiner).
- Each phrase has a **head**; **complements** are selected by the head and come closer to it; **modifiers** are optional, outside and repeatable (the *do so* and *one* tests).
- **Phrase structure rules** generate trees, and because NP and PP can contain each other, they are **recursive**. X-bar theory states a shared shape; English is head-initial.
- **Dependency grammar** represents the same information as head–dependent relations between words.
- Mandarin is VO like English but puts all noun modifiers, including relative clauses, before the noun, and uses **numeral–classifier** constituents.
:::

## Exercises

::: exercise Find the head {level=1}
Give the head and the category of each phrase: (a) *extremely tired of waiting*; (b) *the lid of the box*; (c) *right behind the door*; (d) *has been sleeping*; (e) *quite quickly*.
::: solution
(a) *tired*, AdjP. (b) *lid*, NP. (c) *behind*, PP (*right* is a modifier). (d) *sleeping* is the lexical verb; most analyses treat the whole as a VP whose structure includes the auxiliaries *has* and *been*, and some (including Huddleston and Pullum) treat each auxiliary as the head of its own VP with the next VP as complement. (e) *quickly*, AdvP.
:::
:::

::: exercise Category and function {level=1}
Give the category and function of each phrase in bold.

1. ***Last summer** was very hot.*
2. *We went to Xi'an **last summer**.*
3. *He seems **unhappy about the result**.*
4. *They elected **her** chair.*
::: solution
1. NP, subject.
2. NP, adjunct of time.
3. AdjP, predicative complement (of *seems*).
4. NP (a pronoun), object; *chair* is an NP functioning as object predicative complement (pattern SVOC).
:::
:::

::: exercise Apply a test {level=1}
Use the substitution test to show that *in the drawer* is a constituent in *I left my keys in the drawer*, and that *my keys in* is not.
::: solution
*In the drawer* can be replaced by *there*: ✓ *I left my keys there.* No single word can replace *my keys in*: ✗ *I left it the drawer* is ungrammatical, and no pro-form stands for a noun phrase plus a preposition. Movement confirms it: ✓ *In the drawer, I left my keys* (in a contrast) but ✗ *My keys in, I left the drawer.*
:::
:::

::: exercise Complement or modifier? {level=2}
Is the PP in bold a complement or a modifier? Use one of the tests of [[#rule-complement]].

1. *She relied **on her colleagues**.*
2. *She worked **on Saturday**.*
3. *a teacher **of English***
4. *a teacher **from Chengdu***
::: solution
1. Complement: *rely* selects a PP with *on*; *do so* cannot leave it behind: ✗ *She relied on her colleagues, and he did so on his friends.*
2. Modifier: ✓ *She worked on Saturday, and he did so on Sunday.*
3. Complement: *of English* says what is taught; ? *the teacher of English and the one of maths* is awkward, and the order test agrees (*a teacher of English from Chengdu*, not ? *a teacher from Chengdu of English*).
4. Modifier: ✓ *the teacher from Chengdu and the one from Harbin.*
:::
:::

::: exercise Disambiguate {level=2}
Each sentence is structurally ambiguous. Give both meanings and a version of the sentence that has only one.

1. *We discussed the problem with the manager.*
2. *She hit the man with a stick.*
3. *The girl saw a boy in the library with a camera.*
::: solution
1. ‘We and the manager discussed the problem’ (PP modifies the VP) / ‘We discussed the manager's problem’ (PP inside the NP). Unambiguous: *We and the manager discussed the problem* / *We discussed the manager's problem.*
2. ‘She used a stick to hit him’ / ‘She hit the man who had a stick’. Unambiguous: *She used a stick to hit the man* / *She hit the man who was holding a stick.*
3. At least three readings: the girl had the camera, the boy had it, or the library had it (a library with a camera). Disambiguate by rewording: *In the library, the girl saw a boy who had a camera*, and so on.
:::
:::

::: exercise Build a tree {level=2}
Draw a tree (on paper, or as a `graph` figure in the style of this chapter) for *The students from Dalian read a long report on Monday.* Use the categories S, NP, VP, PP, Det, AdjP or Adj, N, V and P, and justify the attachment of the two PPs.
::: solution
S → NP [the students from Dalian] + VP [read a long report on Monday].
- NP: Det *the* + N *students* + PP *from Dalian* (P *from* + NP *Dalian*). The PP is inside the NP because it identifies the students: ✓ *They read a long report* (where *they* = *the students from Dalian*).
- VP: V *read* + NP [Det *a* + Adj *long* + N *report*] + PP [P *on* + NP *Monday*]. *On Monday* attaches to the VP as a modifier of time: ✓ *The students from Dalian did so on Monday*; it cannot be inside the NP *a long report* on the natural reading, since reports are not "on Monday". (A reading where the report is *about* Monday would put it inside the NP — the sentence is ambiguous in principle.)
:::
:::

::: exercise Tests that disagree {level=3}
In *Li Na gave Sam a pen and Kim a book*, the coordination test suggests that *Sam a pen* is a constituent. Apply two other tests to *Sam a pen*, state the conflict, and describe two ways a grammar might resolve it.
::: hint
Try substitution and fronting. Then think about what might be left unsaid in the second half.
:::
::: solution
*Sam a pen* fails substitution (no pro-form replaces it: ✗ *Li Na gave it*, with *it* = *Sam a pen*) and movement (✗ *Sam a pen, Li Na gave*), and it cannot be a fragment answer to one question. So coordination conflicts with the other tests.

Resolution 1 (ellipsis): the sentence is a coordination of two VPs, *gave Sam a pen* and *gave Kim a book*, with the verb left out of the second — a kind of ellipsis called **gapping** in some analyses. Then what is coordinated is constituents after all, and the tests agree.

Resolution 2 (flexible constituency): some grammars, such as Combinatory Categorial Grammar, allow *Sam a pen* to be a constituent of a less obvious kind, so that coordination shows real but unusual units which other tests cannot detect.

A good answer states that the tests are evidence to be weighed and that the choice between the analyses depends on the theory's other commitments.
:::
:::

::: exercise A Chinese noun phrase in English {level=3}
Analyse the Mandarin NP 那三位从北京来的年轻老师 into its parts (demonstrative, numeral, classifier, modifiers, head), translate it into natural English, and explain in 100–150 words how the order of the parts differs between the two languages and why.
::: solution
Parts: 那 (demonstrative ‘that/those’) + 三 (numeral) + 位 (classifier for people, polite) + 从北京来的 (a relative modifier, ‘who come/came from Beijing’, marked by 的) + 年轻 (adjective ‘young’) + 老师 (head noun ‘teacher’).

English: *those three young teachers from Beijing*.

Explanation (model): *In both languages the determiner and the numeral come first and the head noun has its adjective immediately before it (*young teachers*, 年轻老师). The difference is the modifier ‘from Beijing’: Mandarin puts every modifier before the noun, so the relative modifier with 的 comes between the classifier and the adjective, while English puts a PP after the noun. English also has no classifier: the plural *-s* on* teachers *and the numeral are enough. Mandarin's order follows its general rule for noun phrases (modifier before head); English follows its rule that short modifiers precede the noun and phrasal ones follow it. A literal order (✗* those three from Beijing young teachers*) is impossible in English.*
:::
:::
