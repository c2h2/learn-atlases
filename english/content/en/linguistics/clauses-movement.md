Consider the question *Who do you think Mia invited?* The word *who* stands at the very front of the sentence, but its job is somewhere else entirely: it is the object of *invited*, in a clause two levels down. The answer shows this — *I think Mia invited **Chen***, with *Chen* in the object position after *invited*. In the question that position is empty, and the reader understands *who* as filling it. Compare a Mandarin speaker's version: 你觉得米娅请了谁? Here 谁 sits exactly where the answer goes, after 请了, and nothing moves at all.

English grammar is full of such relations between a position where something is **heard** and a position where it is **understood**: in questions, in relative clauses (*the guest **who** Mia invited __*), in topicalised sentences (***That film** I've never seen __*), and, in a different way, in passives (***The report** was written __ by the committee*). This chapter is about those relations. It sets out the clause types of English and the auxiliary system that forms questions; describes *wh*-questions, relative clauses and passives as relations between structures; introduces the surprising restrictions called **islands**; and then shows how different theories of syntax — transformational, constraint-based, construction-based and functional — model the same facts. It builds on the constituent structure of [[linguistics/phrases-constituents]]. The practical forms are taught in [[core-grammar/questions-and-negatives]], [[verb-patterns/the-passive]] and [[complex-sentences/relative-clauses]], and are taken as known.

## Clause types and the auxiliary system

::: definition Clause types {#def-clause-types}
English main clauses fall into five syntactic **clause types**, each with a characteristic form and a typical (but not invariable) use:

| clause type | form | example | typical use |
|---|---|---|---|
| **declarative** | subject before verb | *Mia invited Chen.* | statement |
| **closed interrogative** | auxiliary before subject | *Did Mia invite Chen?* | yes–no question |
| **open interrogative** | *wh*-phrase first, usually with auxiliary before subject | *Who did Mia invite?* | *wh*-question |
| **imperative** | no subject, plain form of verb | *Invite Chen.* | directive |
| **exclamative** | *what* or *how* phrase first, no inversion | *What a party Mia gave!* | exclamation |

The terms are those of Huddleston and Pullum (2002). The distinction between form and use matters: *You're leaving?* is declarative in form but a question in use; *Could you close the door?* is interrogative in form but a request in use ([[pragmatics/speech-acts#def-indirect-act]]).
:::

The interrogative forms rest on a small class of verbs with special syntax. English **auxiliaries** — *be*, *have*, *do* and the modals *can*, *will*, *must*, *should* and the rest — have properties that lexical verbs lack, collected under the acronym **NICE** by the linguist Rodney Huddleston: they take **N**egation directly (*She can't swim*), they **I**nvert with the subject (*Can she swim?*), they can stand for an elided verb phrase — **C**ode (*Kim can swim and so can Lee*) — and they carry **E**mphasis (*She CAN swim*). A lexical verb in present-day standard English can do none of these: ✗ *She swims not*, ✗ *Swims she?*

::: theorem Subject–auxiliary inversion and *do*-support {#rule-do-support}
1. In closed and most open interrogatives, the first auxiliary of the verb phrase is placed before the subject: *She **has** left* → ***Has** she left?*; *They **will** be waiting* → ***Will** they be waiting?*
2. If the verb phrase contains no auxiliary, the dummy auxiliary *do* is inserted to carry tense and agreement, and the lexical verb appears in its plain form: *She left* → ***Did** she **leave**?*; *He works here* → ***Does** he **work** here?*
3. *Do* is inserted in the same way for negation (*She **didn't** leave*), emphasis (*She **did** leave*) and code (*Lin left, and so **did** Sam*).
4. In an open interrogative where the *wh*-phrase is the subject, there is no inversion and no *do*: ***Who** left?* not ✗ *Who did leave?* (except with emphasis).
:::

::: proof
The rule describes standard present-day English and is set out in all the major grammars (Quirk et al. 1985; Huddleston and Pullum 2002). Its history explains its oddity. In Early Modern English, lexical verbs could still invert and take *not* directly — Shakespeare's characters say *Know you not …?* and *I know not* — while *do* was used optionally. Between the sixteenth and eighteenth centuries periphrastic *do* became obligatory in questions and negatives, and Anthony Kroch (1989) used dated texts to show that its spread followed the same rate in different contexts, as one change. Rule 4 follows from the logic of rules 1 and 2: inversion puts the auxiliary before the subject, but when the *wh*-word *is* the subject and is already at the front, there is nothing for the auxiliary to cross ([[core-grammar/questions-and-negatives#rule-subject-question]]).
:::

::: example Forming a question in steps {#ex-do-support}
Form the yes–no question and the question about the object for *Their daughter found a job in Shenzhen last year*, and show each step.
::: solution
**Yes–no question.**
1. Find the first auxiliary of the verb phrase: there is none — *found* is a lexical verb in the past tense.
2. Insert *do* to carry the tense: past tense *did*; the lexical verb goes into its plain form *find*.
3. Put the auxiliary before the subject NP (the whole NP *their daughter*, not just *daughter*): ***Did** their daughter **find** a job in Shenzhen last year?*

**Question about the object** (*a job*).
1. Replace the object NP with the *wh*-phrase *what*: *Their daughter found **what** in Shenzhen last year.* (This order is possible as an echo question, said with surprise.)
2. Move the *wh*-phrase to the front, leaving a gap: ***What** their daughter found __ in Shenzhen last year?*
3. Apply inversion with *do*-support: ***What did** their daughter **find** __ in Shenzhen last year?*

The steps are a description, not a claim that speakers go through them one by one in real time; how theories interpret them is discussed below.
:::
:::

## *Wh*-questions: fillers and gaps

::: definition Filler, gap and unbounded dependency {#def-gap}
In an English open interrogative, the *wh*-phrase at the front is a **filler**, and the position where it is understood — empty in the sentence — is a **gap**, written __ in analyses. The relation between them is a **dependency**. It is called **unbounded** (or long-distance) because any number of clauses can come between the filler and the gap: *Who did Mia invite __?* — *Who do you think Mia invited __?* — *Who did Sam say you think Mia invited __?*
:::

The gap is not a figment of analysis. Two facts show that it is real for speakers. First, the verb that has the gap behaves as if its object were present: *invite* normally needs an object (✗ *Mia invited*), and in *Who did Mia invite?* it is satisfied by *who*. Second, the gap interacts with other rules: in many varieties of English, *want to* can contract to *wanna* in *Who do you wanna see __?* (the gap is after *see*) but not in ✗ *Who do you wanna see you?*, where the gap is between *want* and *to* (*Who do you want __ to see you?*) and blocks the contraction. [[connected-speech/elision-assimilation#rule-gonna]] gives the practical side; the syntactic explanation was proposed in the 1970s, and it is still debated whether the gap or some other factor is responsible.

::: widget graph
title: A long-distance dependency
nodes: S@0,8; who (filler)@-6,6; do@-3,6; you@-1,6; VP think@2,6; V think@0,4; clause Mia invited@4,4; Mia@2,2; VP invited@6,2; V invited@5,0; gap __@7,0
edges: S>who (filler); S>do; S>you; S>VP think; VP think>V think; VP think>clause Mia invited; clause Mia invited>Mia; clause Mia invited>VP invited; VP invited>V invited; VP invited>gap __; gap __>who (filler)
caption: A simplified tree of *Who do you think Mia invited __?* The object position of *invited*, deep in the embedded clause, is empty; the arrow from the gap back to *who* shows where the filler is interpreted. Transformational grammar describes this as movement of *who* from the gap to the front; other theories describe it as a link passed up the tree from the gap to the filler. The tree leaves out intermediate levels. Drag the nodes to follow the path from the gap up to the filler.
:::

::: example Finding the gap {#ex-gap}
Find the gap in each question and give an answer that fills it.

1. *What did the doctor say the test showed?*
2. *Which flat did they decide to rent?*
3. *Who did you give the keys to?*
4. *How long do you think the meeting will last?*
::: solution
1. *What did the doctor say the test showed __?* The gap is the object of *showed* (two clauses down). Answer: *The doctor said the test showed **an infection**.*
2. *Which flat did they decide to rent __?* The gap is the object of *rent*, inside the non-finite clause *to rent*. Answer: *They decided to rent **the one near the station**.*
3. *Who did you give the keys to __?* The gap is the object of the preposition *to*, which is left "stranded" at the end. Answer: *I gave the keys to **my neighbour**.* The formal alternative *To whom did you give the keys?* moves the whole PP, so the gap is after *the keys*.
4. *How long do you think the meeting will last __?* The gap is an adjunct of duration after *last*. Answer: *I think it will last **about an hour**.*

In each case the filler is interpreted in the gap: the method for understanding a long question is to find the verb or preposition that is missing a dependent.
:::
:::

## Islands

The dependency between filler and gap can cross any number of clauses — but not any kind of structure. John Robert Ross, in his MIT dissertation *Constraints on Variables in Syntax* (1967), showed that some constituents are **islands**: a gap inside them cannot be linked to a filler outside.

::: theorem Some islands of English {#rule-islands}
1. **Complex noun phrases.** A gap cannot be inside a clause that modifies or complements a noun. *You met the man who invited Chen* → ✗ *Who did you meet the man who invited __?* *You heard the rumour that Mia invited Chen* → ✗ *Who did you hear the rumour that Mia invited __?*
2. **Coordinate structures.** A gap cannot be in one conjunct only. *You bought rice and fish* → ✗ *What did you buy rice and __?* A gap in every conjunct is possible: ✓ *What did you buy __ and Sam cook __?* (this is called **across-the-board** extraction).
3. **Subjects.** A gap inside a subject phrase is usually impossible. *A picture of Chen was on the wall* → ✗ *Who was a picture of __ on the wall?* compare the object: ✓ *Who did you see a picture of __?*
4. **Adjunct clauses.** A gap inside an adverbial clause is impossible. *She left because Mia invited Chen* → ✗ *Who did she leave because Mia invited __?*
5. ***Wh*-islands.** A gap inside an embedded question is degraded. *You wonder whether Mia invited Chen* → ? *Who do you wonder whether Mia invited __?* (worse for many speakers with an adjunct: ✗ *How do you wonder whether Mia fixed the car __?*)
:::

::: proof
The constraints are among the best-established facts of English syntax: they are found with questions, relative clauses (✗ *the person who you met the man who invited __*) and topicalisation alike, which shows that they are properties of the filler–gap dependency, not of one construction. Many other languages show similar islands, which is why generative grammar has treated them as evidence for universal principles of grammar — in the 1970s and 1980s the principle of **subjacency**, which limits how many boundaries a dependency can cross in one step. There is a long-running alternative view: that at least some islands are effects of processing. A filler must be held in memory until its gap is found, and complex NPs, adjunct clauses and embedded questions add a heavy load at the same time. Studies such as those of Robert Kluender, and of Philip Hofmeister and Ivan Sag (2010), found that island sentences become more acceptable when the processing load is reduced (for example with a more specific filler such as *which of the guests*). Others have replied that the effects of processing do not explain all islands. The debate is open; what is not in doubt is that English speakers share sharp judgments about these sentences although they were never taught them.
:::

::: warning Repairing an island with a pronoun
Learners sometimes try to make a question out of an island by leaving a pronoun in the gap: ✗ *Who did you meet the man who invited him?* In standard English this is still unacceptable. Ask the question in a way that avoids the island: ✓ *Who was invited by the man you met?* ✓ *The man you met invited someone — who was it?* Speakers do use such "resumptive" pronouns in unplanned speech when a sentence has become too complex, but they are a repair, and in writing they read as errors.
:::

::: quiz
Which question is **grammatical** in standard English?
- [ ] *What did Lin eat noodles and __?*
- [ ] *Who did you complain because Sam had insulted __?*
- [x] *Who did Lin say that Sam had insulted __?*
- [ ] *Who did you believe the claim that Sam had insulted __?*
::: solution
The third question has a gap in the complement clause of *say*, which is not an island: dependencies can cross any number of such clauses. The others put the gap inside a coordinate structure, an adjunct clause and a complex noun phrase (*the claim that …*), all islands.
:::
:::

## Passives

The passive is a different kind of relation. Nothing is left at the front with a gap far below; instead, the same event is presented with a different choice of subject.

::: definition Passive clause {#def-passive-clause}
A **passive** clause corresponds to an active clause with the same core meaning, in which (1) the active object (or another complement) becomes the subject, (2) the verb appears as a past participle after an auxiliary — usually *be*, sometimes *get* — and (3) the active subject either disappears or appears as the complement of *by*: *The committee approved the plan* → *The plan was approved (by the committee).* The passive subject corresponds to a gap in the object position of the participle.
:::

::: theorem What can be passivised {#rule-passive}
1. The passive subject usually corresponds to a **direct object**: *They built the bridge in 1932* → *The bridge was built in 1932.*
2. With two-object verbs, either object can usually become subject, the indirect object more commonly: *They gave Mei a prize* → *Mei was given a prize* / *A prize was given to Mei.*
3. The object of a preposition can sometimes become subject — a **prepositional passive**, very unusual among languages: *Someone has slept in this bed* → *This bed has been slept in.* It is possible when the verb + preposition describes something that affects the subject.
4. Some transitive verbs, especially of possession and measurement, do not passivise: *She has a car* → ✗ *A car is had by her*; *The book costs £20* → ✗ *£20 is cost by the book*; *The dress suits you* → ✗ *You are suited by the dress*.
5. **Most passives have no *by*-phrase.** The passive is used above all when the agent is unknown, obvious or unimportant, or when the writer wants to keep a given topic as subject.
:::

::: proof
These generalisations are standard (Quirk et al. 1985; Huddleston and Pullum 2002; and, for frequency, Biber et al. 1999, who find the passive far more common in academic prose and news than in conversation, and most passives without an agent). Rule 3 is often given as a sign that English allows the relation to be stated over the verb phrase as a whole, not just between a verb and its object: *slept in* is treated as a unit. Rule 4 shows that the passive is not a purely formal operation: the passive subject is typically something affected by the event, which is why the verbs that resist it describe states and relations rather than actions. [[verb-patterns/the-passive#rule-use]] gives the practical reasons for choosing the passive; [[linguistics/pragmatics-discourse]] explains the information-structure reasons more generally.
:::

::: example Why a passive here? {#ex-passive-text}
In this short text, written for this lesson, explain why the writer chose a passive in the second sentence and whether the third sentence should be passive or active.

*The museum opened in 1998. It was designed by a young architect from Hangzhou. (A) The architect later designed three other museums. (B) Three other museums were later designed by the architect.*
::: solution
1. **The second sentence.** The topic of the text so far is *the museum*. The passive *It was designed by a young architect* keeps that topic as subject (*it*) and puts the new information, *a young architect from Hangzhou*, at the end, where English places new and heavy material (end-focus, [[complex-sentences/emphasis-inversion#def-focus]]). An active version, *A young architect from Hangzhou designed it*, would start with new information and is slightly less natural here. The *by*-phrase is kept because the agent is the point of the sentence.
2. **The third sentence.** The topic has now shifted: *the architect* was introduced at the end of sentence 2 and is now given information. (A), active, puts *the architect* as subject and the new information, *three other museums*, at the end. (B) would put new information first and the given *the architect* last. So (A) is better.

The example shows that the choice between active and passive is usually a choice about information order, not about meaning.
:::
:::

## Relative clauses

A relative clause modifies a noun and contains a gap that is understood as that noun: *the guest [ that Mia invited __ ]*. In English it follows the noun; the relative word (*who*, *which*, *that*) or nothing at all introduces it ([[complex-sentences/relative-clauses#rule-gap]]).

::: theorem Gaps in relative clauses {#rule-relative-gaps}
1. A relative clause contains one gap, which can be the subject, the object, the object of a preposition or a possessor: *the student **who** __ won*, *the student (**that**) we met __*, *the student (**that**) we spoke to __*, *the student **whose** essay __ won*.
2. When the gap is the object of a preposition, the preposition can stay in place (**stranding**: *the student who we spoke **to***) or move with the relative word (**pied-piping**: *the student **to whom** we spoke*), the second being formal.
3. The relative word can be left out only when the gap is not the subject: ✓ *the student we met*, ✗ *the student __ won the prize* (as a relative clause).
4. Standard English does not fill the gap with a pronoun: ✗ *the book that I read **it***.
:::

Languages differ in which positions can be relativised. Edward Keenan and Bernard Comrie (1977), comparing about fifty languages, proposed the **accessibility hierarchy**: subject > direct object > indirect object > oblique (object of a preposition) > possessor > object of comparison. Every language can relativise subjects; if a language can relativise one position on the hierarchy, it can relativise all positions to the left of it; and in many languages the lower positions need a **resumptive pronoun** in the gap, or are impossible. English can relativise all six positions with a gap (*the person I'm taller than __*). The hierarchy also predicts difficulty: in studies of second-language learners, relative clauses on the subject are produced and understood earlier and more accurately than those lower down.

::: widget graph
title: The accessibility hierarchy
nodes: subject@0,0; direct object@2,0; indirect object@4,0; oblique@6,0; possessor@8,0; object of comparison@10,0
edges: subject>direct object; direct object>indirect object; indirect object>oblique; oblique>possessor; possessor>object of comparison
caption: Keenan and Comrie's (1977) hierarchy of positions that can be relativised, from the most accessible (left) to the least. If a language can form relative clauses on a position, it can form them on every position to its left. English relativises all six with a gap: *the woman __ who left*, *the woman I saw __*, *the woman I gave the book to __*, *the woman I sat beside __*, *the woman whose son __ I teach*, *the woman I am older than __*. In Mandarin, subject and object relatives normally have a gap, while some lower positions need a pronoun.
:::

::: example Learners' relative clauses {#ex-relatives}
Correct each sentence, say which position on the hierarchy is relativised, and explain the error.

1. ✗ *This is the book which I bought it yesterday.*
2. ✗ *The man is standing there is my uncle.*
3. ✗ *That's the colleague I told you.*
4. ✗ *She is the friend whom her brother lives in Wuhan.*
::: solution
1. ✓ *This is the book (which) I bought __ yesterday.* Direct object. The error is a resumptive pronoun (*it*) in the gap; English relative clauses leave the gap empty ([[#rule-relative-gaps]], rule 4).
2. ✓ *The man (who is) standing there is my uncle.* Subject. A subject relative cannot drop its relative word (rule 3); alternatively, a reduced relative with *standing* and no *is*.
3. ✓ *That's the colleague I told you about.* Oblique (object of *about*). The preposition has been dropped; the gap needs its preposition, stranded or pied-piped (*about whom I told you*).
4. ✓ *She is the friend whose brother lives in Wuhan.* Possessor. The possessive relative *whose* replaces both the relative word and the possessive *her*.

Errors 1 and 4 often reflect a language in which pronouns are used in relative clauses; error 3 is common to learners of many first languages. Positions low on the hierarchy (3 and 4) are the ones learners attempt least and get wrong most, as the hierarchy predicts.
:::
:::

## How theories model these relations

All syntacticians agree on the facts above — the gap, the islands, the correspondence between active and passive. They differ on how to represent them, and the differences are worth knowing, because textbooks of each school present their own view as the obvious one.

::: theorem Four ways of modelling clause relations {#rule-frameworks}
1. **Transformational (generative) grammar.** Chomsky's *Syntactic Structures* (1957) proposed that sentences are derived from underlying structures by **transformations**: a question is formed by moving the *wh*-phrase from the gap to the front; a passive by moving the object into subject position. In later versions (Government and Binding theory, 1981; the Minimalist Program, from 1995) movement leaves a **trace** or a silent **copy** in the gap, and islands follow from general limits on movement.
2. **Constraint-based (lexicalist) grammars.** Lexical-Functional Grammar (Joan Bresnan and Ronald Kaplan, 1982) and Head-Driven Phrase Structure Grammar (Carl Pollard and Ivan Sag, 1994) have no movement. A sentence has one structure, which must satisfy a set of constraints; the gap is a missing dependent whose information is passed up the tree to the filler; the passive is a **lexical rule** relating the active and passive entries of a verb.
3. **Construction grammar.** Adele Goldberg's *Constructions* (1995) and related work treat grammar as an inventory of **constructions** — pairings of form and meaning at every size, from words to abstract patterns. The passive, the *wh*-question and the relative clause are constructions in their own right, each with its own form, meaning and use; what they have in common is captured by links between constructions, not by derivation. Goldberg's evidence includes sentences such as *She sneezed the napkin off the table*, where the meaning ‘cause to move’ comes from the pattern, not from the verb *sneeze*.
4. **Functional approaches** (for example Halliday's systemic functional grammar, and the work of Talmy Givón and others) ask why each structure exists: the passive serves topic continuity and agent demotion; fronting of *wh*-phrases puts the requested information first. They focus less on formal representation and more on the communicative purposes that shape grammar.
:::

::: proof
The four approaches make different claims about the mind, but on the core English data they largely agree, which is why this chapter could describe the facts first. They disagree mainly on three questions. Are the active and the passive related by an operation (transformations) or simply listed side by side with a correspondence (lexical rules, constructions)? Are islands constraints of grammar (generative and many constraint-based accounts) or effects of processing and information structure (many functionalist and some constraint-based accounts)? And how much of grammar is innate and universal? The last question returns in [[linguistics/language-acquisition]]. In practice, the descriptive grammars of English — Quirk et al. (1985), Biber et al. (1999), Huddleston and Pullum (2002) — avoid commitment to one framework, and so does this course; Carnie (2021) is a good introduction to the generative view, Goldberg (1995, 2006) to construction grammar.
:::

::: quiz
Which statement fits **construction grammar** best?
- [ ] A passive is derived from an active by moving the object into subject position.
- [x] A passive is a stored pairing of a form with a meaning and a use, related to the active by links between constructions.
- [ ] A passive is an effect of processing load.
- [ ] Passives do not exist in English.
::: solution
Construction grammar treats patterns of every size as stored pairings of form and meaning. The first option describes transformational grammar; the third confuses the passive with explanations offered for islands.
:::
:::

::: note English and Chinese
**Questions.** Mandarin *wh*-words stay in the position of the answer: 你买了什么? ‘you bought what?’ = ‘What did you buy?’; 你觉得米娅请了谁? ‘Who do you think Mia invited?’. There is no fronting and no inversion; yes–no questions use the particle 吗 or the A-not-A form (你去不去?). C.-T. James Huang, in his MIT dissertation (1982), argued that Mandarin *wh*-words nonetheless obey some restrictions similar to English islands, which suggested that the dependency exists at the level of meaning even when nothing moves. For Chinese learners, the two English operations — fronting the *wh*-phrase and inverting the auxiliary, with *do*-support — are separate things to learn, and the second is the one most often forgotten (✗ *What you bought?*).

**Topic and subject.** Charles Li and Sandra Thompson (1976) proposed that languages differ in whether the **subject** or the **topic** is the basic organising element of the sentence. English is subject-prominent: every clause has a subject, even an empty one (*It is raining*, *There is a problem*). Mandarin is topic-prominent: a sentence can begin with a topic that is not an argument of the verb at all, followed by a comment about it — 大象鼻子长 ‘elephants, (their) noses are long’; 那本书我已经看完了 ‘that book, I've already finished reading’. Yuen Ren Chao (1968) went further and treated the Mandarin subject itself as a topic. English has topicalisation too (*That book I've already finished*), but it is marked, used mainly for contrast, and the topic must correspond to a gap. Transfer from 主题-述题 structure lies behind sentences such as ✗ *Elephants noses are long* or ✗ *This city, the traffic is terrible*, which in written English need a subject–predicate form: ✓ *Elephants have long noses*; ✓ *The traffic in this city is terrible* ([[core-grammar/sentence-patterns#ex-topic]]).

**Passives.** The 被 passive has traditionally been used mostly for events that are unpleasant for the subject (他被骗了 ‘he was cheated’); its use for neutral events grew in the twentieth century, partly under the influence of translation from European languages. Many English passives therefore correspond to Chinese sentences with no passive marker at all (这本书写得很好 ‘this book is well written’) — [[verb-patterns/the-passive#ex-chinese]] practises this.

**Relative clauses.** Mandarin relative clauses come before the noun and end in 的, with a gap for subjects and objects (米娅请的客人 ‘the guest Mia invited’). With some lower positions a pronoun is required: 我跟他一起工作的那个人 ‘the person I work with’ keeps 他 after 跟. Learners who transfer this pattern produce the resumptive pronouns of [[#ex-relatives]].
:::

::: history
The idea that sentences of different types are related goes back to traditional grammar, which taught "how to turn an active sentence into a passive". Zellig Harris made it formal in the 1950s as transformations between sentences; his student Noam Chomsky, in *Syntactic Structures* (1957), made transformations part of a generative grammar, applying to abstract underlying structures, and in *Aspects of the Theory of Syntax* (1965) introduced the distinction between **deep structure** and **surface structure**. Ross's dissertation (1967) discovered the islands, which became the central testing ground for theories of movement. In reaction to the growing complexity of transformational grammar, the 1970s and 1980s produced theories without transformations — Generalized Phrase Structure Grammar (Gazdar, Klein, Pullum and Sag, 1985), LFG and HPSG — and, from the late 1980s, construction grammar (Fillmore, Kay and O'Connor's 1988 study of *let alone*; Goldberg 1995). Keenan and Comrie's accessibility hierarchy (1977) is one of the best-known results of the typological tradition, which compares many languages to find what all of them share.
:::

## Where this leads

The practical forms are in [[core-grammar/questions-and-negatives]], [[verb-patterns/the-passive]], [[complex-sentences/relative-clauses]] and [[complex-sentences/noun-clauses]] (embedded questions). Fronting and clefting for emphasis are in [[complex-sentences/emphasis-inversion]]. Why one structure is chosen over another in a text — given and new information, topic and focus — is part of [[linguistics/pragmatics-discourse]]. How children learn questions and passives, and what that tells us about innate knowledge, is in [[linguistics/language-acquisition]].

::: summary
- English has five **clause types** (declarative, closed and open interrogative, imperative, exclamative), distinct from their uses.
- **Auxiliaries** have the NICE properties; questions use **subject–auxiliary inversion**, with ***do*-support** when there is no auxiliary, except when the *wh*-phrase is the subject.
- *Wh*-questions, relative clauses and topicalisation involve a **filler** linked to a **gap**, across any number of clauses — an **unbounded dependency**.
- **Islands** (complex NPs, coordinate structures, subjects, adjuncts, embedded questions) block the dependency; whether they are grammar or processing is debated.
- The **passive** makes an object (or prepositional object) the subject; most passives have no *by*-phrase, and the choice is usually about information order.
- Relative clauses have one gap; the **accessibility hierarchy** predicts which positions languages relativise and which learners find hard.
- Transformational, constraint-based, construction-based and functional theories model the same facts differently.
- Mandarin keeps *wh*-words in place, is **topic-prominent**, uses 被 mainly for adverse events traditionally, and puts relative clauses before the noun.
:::

## Exercises

::: exercise Name the clause type {level=1}
Give the clause type of each sentence (form, not use).

1. *How tall she has grown!*
2. *Sit down, please.*
3. *Where did you park?*
4. *You've finished already?*
5. *Is it raining?*
::: solution
1. Exclamative. 2. Imperative. 3. Open interrogative. 4. Declarative (used as a question). 5. Closed interrogative.
:::
:::

::: exercise *Do*-support {level=1}
Make a yes–no question and a negative from each sentence.

1. *He speaks Cantonese.*
2. *They have been told.*
3. *She went home early.*
::: solution
1. *Does he speak Cantonese?* / *He doesn't speak Cantonese.* (*do*-support; plain form *speak*)
2. *Have they been told?* / *They haven't been told.* (first auxiliary *have* inverts)
3. *Did she go home early?* / *She didn't go home early.* (*do*-support; plain form *go*)
:::
:::

::: exercise Count the clauses {level=1 check="3"}
How many clauses does *Which city did your sister say she wanted to move to?* contain? Then find the gap.
::: solution
**3**: the main clause *which city did your sister say …*, the finite clause *she wanted …* (the complement of *say*) and the non-finite clause *to move to __* (the complement of *wanted*). The gap is after the stranded preposition *to*, in the lowest clause: *She wanted to move to **Hangzhou***. The filler *which city* is linked to it across two clause boundaries.
:::
:::

::: exercise Island or not? {level=2}
Mark each question ✓ or ✗ and name the island where there is one.

1. *What did you say that Lin bought __?*
2. *What did you meet the person who bought __?*
3. *Who did you go home after Lin phoned __?*
4. *What did Lin buy __ and Sam return __?*
5. *Who was the story about __ surprising?*
::: solution
1. ✓ (complement clause of *say*, not an island).
2. ✗ complex NP (relative clause on *the person*).
3. ✗ adjunct clause (*after Lin phoned …*).
4. ✓ across-the-board extraction from both conjuncts.
5. ✗ subject island (the gap is inside the subject *the story about __*).
:::
:::

::: exercise Passives {level=2}
Make a passive from each active sentence where possible; if it is not possible or very odd, say why.

1. *Someone has eaten my sandwich.*
2. *The jacket fits you.*
3. *People have lived in this house for centuries.*
4. *The company offered Wang Lei a job.*
::: solution
1. *My sandwich has been eaten.* (agent dropped, as usual)
2. ✗ *You are fitted by the jacket* — *fit* in this sense is a relation, not an action, and does not passivise.
3. *This house has been lived in for centuries.* — a prepositional passive, natural because the house is affected (characterised) by being lived in.
4. *Wang Lei was offered a job (by the company)* or *A job was offered to Wang Lei.* The first is more common.
:::
:::

::: exercise Topic–comment into English {level=2}
Translate each Mandarin sentence into natural English with a subject–predicate structure, and say what happened to the topic.

1. 这家饭馆菜很好吃。
2. 那件事我早就忘了。
3. 北京秋天最美。
::: solution
1. *The food in this restaurant is delicious* / *This restaurant's food is very good.* The topic 这家饭馆 becomes a modifier inside the subject NP.
2. *I forgot about that long ago* / *That, I forgot long ago* (topicalised, for contrast). The topic becomes the object (or a PP), and 我 becomes the subject.
3. *Autumn is the most beautiful season in Beijing* / *Beijing is at its most beautiful in autumn.* The topic becomes a PP adjunct or the subject; 秋天, the subject of 最美 in Chinese, becomes the subject or an adjunct.
:::
:::

::: exercise Two frameworks, one sentence {level=3}
Describe the relation between *The committee rejected the proposal* and *The proposal was rejected* in (a) a transformational analysis and (b) a construction-grammar analysis, in 100–150 words each. Say what each analysis predicts about the passive of *The dress suits you*.
::: solution
(a) Transformational (model): *The passive is derived from an underlying structure like that of the active, with* the proposal *as object of* rejected*. A transformation moves the object into the empty subject position and the verb appears as a participle after* be*; the agent, if expressed, appears in a* by*-phrase. A trace or copy remains in the object position. Because movement applies to objects, the theory predicts that any verb with an object can passivise; the failure of ✗* You are suited by the dress *must be explained by an extra condition, for example on the thematic role of the object (it must be affected).*

(b) Construction grammar (model): *The passive is a construction in its own right: a subject that is the undergoer of an event, the auxiliary* be *or* get *with a past participle, and an optional* by*-phrase, used to present an event from the undergoer's point of view. It is related to the active by a link between the two constructions, not by derivation. The construction's meaning requires an undergoer that is affected or characterised by the event, so a relation like* suit *is a poor fit, and ✗* You are suited by the dress *is predicted to be odd by the construction's meaning itself.*

Both analyses can account for the data; they differ in where the restriction is stated.
:::
:::

::: exercise Explaining a learner error {level=3}
A student writes: ✗ *The problem which we discussed it yesterday it is very serious.* Write a short explanation (120–180 words) for the student of what is wrong, using the terms *gap*, *relative clause*, *subject* and *topic*, and suggest what in the student's first language might have led to it. Assume the student's first language is Mandarin.
::: solution
A model answer:

*Your sentence has two extra pronouns. First, inside the relative clause* which we discussed it yesterday*, the word* which *already stands for the object of* discussed*: in English a relative clause has a gap where that object would be, so* it *must be left out —* the problem which we discussed __ yesterday*. Second,* the problem which we discussed yesterday *is the subject of the main clause, and English does not repeat a subject with a pronoun after it: the predicate* is very serious *follows directly. Corrected:* The problem (which) we discussed yesterday is very serious.

*The second error probably comes from Mandarin topic–comment structure, where a topic can be followed by a full comment:* 我们昨天讨论的那个问题，它很严重 *is possible in speech, though the* 它 *is often left out. In English the subject is not a separate topic, so it cannot be repeated. The first error is common among learners of many languages that use pronouns in some relative clauses.*
:::
:::
