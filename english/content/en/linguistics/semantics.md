*Every student in the class read a book over the holiday.* Did they all read the same book, or did each read a different one? The sentence allows both, though the second is more likely. Now compare *A book was read by every student in the class*: here many readers first understand one particular book that everyone read. The words mean the same, the grammar is close, and yet the meanings divide differently. Or take two sentences that are both true: *The morning star is the morning star* and *The morning star is the evening star.* Both names refer to the same object, the planet Venus, so the sentences say the same thing about the world. But the first tells you nothing, while the second records a discovery made by ancient astronomers.

Puzzles like these show that meaning is more than a list of things that words point to, and that the meaning of a sentence depends in exact ways on its words and their structure. **Semantics** is the study of that meaning: of words (lexical semantics) and of sentences (compositional or formal semantics). This chapter introduces the distinction between sense and reference, the relations between word meanings, how categories are organised, and the meaning of sentences as truth conditions, with the logical words and quantifiers that formal semantics studies most closely. It ends with the old question of whether the language you speak shapes the way you think. Meaning in context — implicature, presupposition, speech acts — is the subject of [[linguistics/pragmatics-discourse]] and of the course *Pragmatics*.

## Sense and reference

::: definition Sense and reference {#def-sense-reference}
The **reference** of an expression is the thing in the world it picks out on an occasion of use: *the morning star* and *the evening star* both refer to Venus. Its **sense** is the way it presents that thing — the concept or mode of presentation by which a speaker identifies the referent: ‘the bright star seen before sunrise’ versus ‘the bright star seen after sunset’. Two expressions can have the same reference and different senses. The distinction is due to the German philosopher and logician Gottlob Frege (*Über Sinn und Bedeutung*, 1892).
:::

Sense explains why *The morning star is the evening star* is informative: the two senses are different, and it is a fact about the world, not about language, that they pick out one planet. Sense also explains how words can be meaningful without a referent: *the present king of France* has a sense — you know what you would be looking for — though nothing answers to it today. And it explains how we can learn the meaning of a word without meeting its referent: few readers have seen a *pangolin*, but a description gives them its sense.

Two related terms are used of words rather than expressions on occasions. The **denotation** of a word is the whole class of things it can be used for — the denotation of *dog* is all dogs — and its **connotation** is the associations it carries beyond that: *cur* and *mutt* denote dogs and connote contempt or affection. Connotation is mostly a matter of use and register, treated in [[collocation-and-register/connotation]].

## Relations between word meanings

The senses of words are not isolated. They are defined partly by their relations to other senses, and a learner who knows those relations knows much of a word's meaning.

::: definition Sense relations {#def-sense-relations}
- **Synonymy**: two words with the same, or nearly the same, sense: *begin* and *start*, *sofa* and *couch*. Exact synonyms, interchangeable in every context, are very rare; most pairs differ in register, collocation or connotation (*start a car* but not ✗ *begin a car*).
- **Antonymy**: words with opposite senses (three kinds, below).
- **Hyponymy**: inclusion of meaning. *Tulip* is a **hyponym** of *flower*, and *flower* is the **hypernym** (or **superordinate**) of *tulip*; *tulip*, *rose* and *daisy* are **co-hyponyms**. Everything that is a tulip is a flower, not the reverse.
- **Meronymy**: the part–whole relation. *Wheel* is a meronym of *car*, *page* of *book*, *finger* of *hand*.
- **Polysemy**: one word with several related senses: *mouth* of a person and of a river; *head* of the body and of a department.
- **Homonymy**: two different words that happen to share a form: *bank* ‘river side’ and *bank* ‘financial institution’; *bat* ‘club’ and *bat* ‘animal’. They are listed as separate entries in a dictionary.
:::

::: theorem Three kinds of opposite {#rule-antonyms}
1. **Gradable antonyms** name the ends of a scale with a middle ground: *hot*–*cold*, *long*–*short*, *happy*–*sad*. They take degree words (*very hot*, *hotter*); denying one does not assert the other (*not hot* need not be *cold*); and one member is often **unmarked**, used neutrally in questions (*How long is it?* does not suggest it is long, while *How short is it?* does).
2. **Complementary antonyms** divide a domain into two with no middle: *alive*–*dead*, *pass*–*fail*, *true*–*false*. Denying one asserts the other: *not alive* means *dead*. They are odd with degree words, though speakers sometimes use them so for effect (*very dead*).
3. **Converses** describe one relation from two sides: *buy*–*sell*, *parent*–*child*, *above*–*below*, *lend*–*borrow*. *A sold the car to B* is true exactly when *B bought the car from A* is true.
:::

::: proof
The three kinds follow from different logical structures. Gradable antonyms are points on a scale relative to a norm (*a long pencil* is shorter than *a short road*), so they leave a middle region and have comparatives. Complementaries are a partition of a set: everything in the domain is in one half or the other. Converses are one relation with its arguments in reverse order. The distinctions were set out in their modern form by John Lyons (*Semantics*, 1977) and D. A. Cruse (*Lexical Semantics*, 1986). The tests are useful for learners because languages divide the same field differently: Mandarin 借 covers both *lend* and *borrow*, with the direction shown by the structure (借给 ‘lend to’, 向……借 ‘borrow from’), so the English converse pair is a common source of error (✗ *Can you borrow me your pen?*).
:::

::: quiz
*Is the water hot?* — *No, but it isn't cold either.* What does this exchange show about *hot* and *cold*?
- [ ] They are complementary antonyms.
- [x] They are gradable antonyms: denying one does not assert the other.
- [ ] They are converses.
- [ ] They are synonyms.
::: solution
Gradable antonyms leave a middle ground (*warm*, *lukewarm*), so *not hot* does not mean *cold*. With complementaries such as *alive*–*dead*, the reply *No, but it isn't dead either* would be contradictory.
:::
:::

::: widget graph
title: A small hyponymy tree
nodes: animal@0,6; bird@-4,4; mammal@0,4; fish@4,4; robin@-6,2; sparrow@-4,2; penguin@-2,2; dog@-1,2; whale@1,2; salmon@4,2; wing (part of bird)@-4,0
edges: animal>bird; animal>mammal; animal>fish; bird>robin; bird>sparrow; bird>penguin; mammal>dog; mammal>whale; fish>salmon; bird>wing (part of bird)
caption: Arrows from a hypernym to its hyponyms, with one meronym (*wing*) added for contrast: a wing is a part of a bird, not a kind of bird. The tree follows biological classification, which in this case agrees with everyday English — though not everywhere: in everyday speech many people would not call a *whale* a fish, but historically the word *fish* was used more widely, and *shellfish* and *starfish* are not fish in biology. Drag the nodes to add your own branches.
:::

::: example Identifying sense relations {#ex-relations}
Name the relation between each pair and give the test you used.

1. *rent* (as a tenant) – *let* (as an owner, BrE)
2. *even* – *odd* (of numbers)
3. *cheap* – *expensive*
4. *keyboard* – *laptop*
5. *ear* (of the body) – *ear* (of corn)
6. *ear* (of the body) – *ear* ‘ability to hear music’ (*an ear for music*)
::: solution
1. **Converses**: *A lets the flat to B* is true exactly when *B rents the flat from A*. (*Rent* can also be used from the owner's side, *A rents the flat to B*, so English blurs the pair.)
2. **Complementary antonyms**: every whole number is one or the other; *not even* = *odd*; ✗ *very even*.
3. **Gradable antonyms**: *very cheap*, *cheaper*; *not cheap* is not the same as *expensive*.
4. **Meronymy**: a keyboard is a part of a laptop, not a kind of laptop.
5. **Homonymy**: the two words have different origins (Old English *ēare* and *ēar*) and no related sense.
6. **Polysemy**: the musical sense is a metaphorical extension of the organ of hearing, and it is listed under the same headword in dictionaries.
:::
:::

## Categories and prototypes

What does it take to be a *bird*? A classical answer, going back to Aristotle, is a definition by necessary and sufficient conditions: a bird is an animal with feathers, wings and a beak that lays eggs. **Componential analysis**, popular in the 1960s, stated word meanings in this way with semantic features: *man* = [+HUMAN, +ADULT, +MALE], *girl* = [+HUMAN, −ADULT, −MALE]. Features are useful for showing contrasts within a field, but they meet two problems. Many categories have no clear boundary (where does a *cup* end and a *bowl* begin?), and members of a category are not equally good members.

::: definition Prototype {#def-prototype}
A **prototype** is the best, most typical example of a category, or the set of features that the most typical members share. Membership is graded: other members are judged by how much they resemble the prototype. In experiments by Eleanor Rosch in the 1970s (for example Rosch 1975), American students rated *robin* and *sparrow* as very good examples of *bird*, *chicken* as less good and *penguin* and *ostrich* as poor examples, and they answered questions such as *Is a robin a bird?* faster than *Is a penguin a bird?*
:::

William Labov (1973) showed the fuzzy boundaries directly: he showed people drawings of containers that varied gradually in width and depth, with or without a handle, and asked them to name them. The names *cup*, *mug*, *bowl* and *vase* shifted gradually, and the shift depended on context — the same object was more often called a *bowl* when it was said to contain mashed potatoes. Prototype theory does not replace definitions entirely. A penguin is fully a bird, not partly one: the biological category has a definition, while typicality is a fact about how people think of it. The two kinds of knowledge coexist.

::: quiz
In prototype theory, why do people answer *Is a robin a bird?* faster than *Is a penguin a bird?*
- [ ] because penguins are not really birds
- [x] because the robin is closer to the prototype of the category *bird*
- [ ] because *robin* is a shorter word
- [ ] because penguins live far away
::: solution
Category membership is graded in people's minds: members that share more features with the prototype (small, flies, sings, perches in trees) are verified faster and rated as better examples. The penguin is still fully a bird biologically; typicality concerns how the category is represented, not who belongs to it.
:::
:::

::: note English and Chinese
Mandarin **classifiers** (量词) are a system of categorisation built into grammar. When a noun is counted or used with a demonstrative, a classifier must come between the numeral and the noun ([[linguistics/phrases-constituents]]): 一**本**书 ‘a book’, 三**张**纸 ‘three sheets of paper’, 两**条**鱼 ‘two fish’, 一**只**猫 ‘a cat’. Many classifiers group nouns by shape and other properties, as Li and Thompson (1981) describe: 条 for long, often flexible things (鱼, 河, 路, 裤子, and 狗, which also takes 只); 张 for flat surfaces (纸, 桌子, 床, 脸, 票); 本 for bound volumes; 只 for many animals and for one of a pair (一只手, 一只鞋); 位 as a polite classifier for people. The general classifier 个 can replace many others in speech, and learners and young children use it widely. The system is partly semantic and partly conventional — why 床 takes 张 is clear once you think of its flat surface, but why 狗 can take 条 is less clear — exactly the mixture of prototype and convention found in English categories.

English has no classifiers for count nouns, but it needs **measure words** for uncountable ones: *a piece of advice*, *a loaf of bread*, *a sheet of paper*, *a cup of tea*, *an item of news*. The Mandarin learner's difficulty is not the idea of a measure word but the line between count and mass, which English draws partly arbitrarily (*advice* and *information* are uncountable; *suggestion* and *fact* are countable) — see [[nouns-and-articles/countable-uncountable]].
:::

## Sentence meaning and truth

A speaker who knows the meanings of the words of a language and its rules of combination can understand sentences never met before. Frege is credited with the principle that explains this.

::: definition Compositionality and truth conditions {#def-truth-conditions}
The **principle of compositionality** states that the meaning of a complex expression is determined by the meanings of its parts and the way they are combined. To know the meaning of a declarative sentence, on the most influential account, is to know its **truth conditions**: what the world would have to be like for it to be true. *Snow is white* is true if and only if snow is white — trivial-looking, but the point is that the right-hand side is a condition on the world and the left-hand side a sentence. This approach comes from the logician Alfred Tarski's definition of truth (1933) and was applied to natural language by Donald Davidson and Richard Montague in the late 1960s and early 1970s.
:::

Truth conditions allow precise definitions of relations between sentences, parallel to the sense relations between words.

::: theorem Entailment, contradiction and paraphrase {#rule-entailment}
1. A sentence A **entails** a sentence B if, whenever A is true, B must also be true. *Mia killed the spider* entails *The spider died*; *Kim is a tulip grower* entails *Kim is a flower grower* (because *tulip* is a hyponym of *flower*).
2. A **contradicts** B if they cannot both be true: *The door is open* and *The door is shut* (complementaries).
3. A and B are **paraphrases** (synonymous) if each entails the other: *Sam sold Lin the car* and *Lin bought the car from Sam*.
4. **Test for entailment:** an entailment cannot be denied without contradiction. ✗ *Mia killed the spider, but it didn't die* is contradictory, so the entailment holds. Compare an implicature, which can be cancelled: ✓ *Some of the students passed — in fact all of them did* ([[pragmatics/meaning-beyond-words#rule-cancel]]).
:::

::: proof
The definitions use only the notion of truth, which makes them testable: to show that A does not entail B, it is enough to describe one situation in which A is true and B false. The test in part 4 follows directly: if A entails B, then *A and not B* describes no possible situation, so it is a contradiction. The definitions explain, for example, why hyponymy yields entailment in positive sentences — the set of tulip growers is inside the set of flower growers — and why it reverses under negation: *Kim isn't a flower grower* entails *Kim isn't a tulip grower*, not the other way round. This reversal is the basis of the theory of quantifiers below.
:::

::: example Entailment or not? {#ex-entailment}
For each pair, does A entail B? Justify your answer with the test or a counterexample.

1. A: *Wang Fang managed to finish the report.* B: *Wang Fang finished the report.*
2. A: *Wang Fang tried to finish the report.* B: *Wang Fang finished the report.*
3. A: *Some of the guests left early.* B: *Not all of the guests left early.*
4. A: *Every guest brought a gift.* B: *Some guest brought a gift.*
::: solution
1. **Yes.** ✗ *She managed to finish the report, but she didn't finish it* is a contradiction. (*Manage* also suggests that it was difficult — a further meaning, not an entailment of the same kind.)
2. **No.** ✓ *She tried to finish the report, but she didn't finish it* is coherent. *Try* suggests failure or doubt but does not entail either.
3. **No.** ✓ *Some of the guests left early — in fact all of them did* is coherent, so B is an implicature, not an entailment ([[linguistics/pragmatics-discourse]]).
4. **Yes, if there were guests.** If there were no guests at all, logicians count *Every guest brought a gift* as (vacuously) true and *Some guest brought a gift* as false. In ordinary use speakers take it for granted that there were guests, so in context the entailment holds. This "existential import" of *every* is a known difference between logic and everyday language.
:::
:::

## Logical words

The words *and*, *or*, *not* and *if* correspond, at least partly, to the connectives of propositional logic: ∧ (and), ∨ (or), ¬ (not) and → (if … then). A truth table lists the truth value of a combination for every combination of truth values of its parts.

::: widget truthtable
title: *Unless*
formula: ~q -> p
compare: p | q
caption: Let *p* be "the match goes ahead" and *q* be "it rains". *The match will go ahead unless it rains* means, on its truth-conditional core, "if it does not rain, the match goes ahead" (¬q → p). The comparison shows that this is equivalent to "the match goes ahead **or** it rains" (p ∨ q). Look at the row where both are true — it rains and the match goes ahead anyway: the formula counts the sentence as true, yet many hearers feel that *unless* suggests the match will **not** go ahead if it rains. That extra meaning is usually analysed as an implicature (a "conditional perfection"), not part of the truth conditions. Type *(~q -> p) & (q -> ~p)* to see the stronger reading.
:::

The match between English and logic is close but not exact, and the differences are instructive:

- *And* in logic is symmetric: *p ∧ q* = *q ∧ p*. In English, *She got married and had a baby* tells a different story from *She had a baby and got married*. The order of events is usually explained as pragmatic, following Grice's maxim of manner (‘be orderly’), not as part of the meaning of *and*.
- *Or* in logic is inclusive (true if both parts are true). English *or* is often understood as exclusive (*tea or coffee?*), again usually explained pragmatically ([[pragmatics/meaning-beyond-words]] has a truth table of the two).
- *If … then* in logic (material implication) is true whenever *p* is false: *If the moon is made of cheese, then 2 + 2 = 4* comes out true. English conditionals are not like this — most speakers would call that sentence odd or false — and the semantics of conditionals is one of the most debated areas of the subject ([[complex-sentences/conditionals]] treats their grammar).

::: quiz
Which English sentence has the same truth conditions as *If it doesn't rain, we'll eat outside*?
- [ ] *We'll eat outside if it rains.*
- [x] *We'll eat outside unless it rains.*
- [ ] *We won't eat outside unless it rains.*
- [ ] *It will rain and we'll eat outside.*
::: solution
*P unless Q* has the core meaning ‘if not Q, then P’, so *We'll eat outside unless it rains* = *If it doesn't rain, we'll eat outside*. The first option reverses the condition; the third adds a negation; the fourth asserts both events.
:::
:::

## Quantifiers

Words such as *all*, *every*, *some*, *no*, *most* and *few* are **quantifiers**. They cannot be analysed as referring to things: *no student* does not refer to a strange, absent student. Instead, modern semantics treats a quantifier as a relation between two sets.

::: theorem Quantifiers as relations between sets {#rule-quantifiers}
In *Q A are B* (*All students passed*, *Some students passed*), let A be the set named by the noun (students) and B the set named by the predicate (people who passed). Then:

| quantifier | true if … | in set terms |
|---|---|---|
| *all* / *every* A are B | every A is a B | A − B is empty |
| *some* A are B | at least one A is a B | A ∩ B is not empty |
| *no* A are B | no A is a B | A ∩ B is empty |
| *most* A are B | more As are Bs than are not | A ∩ B is larger than A − B |

This is the theory of **generalised quantifiers**, applied to natural language by Jon Barwise and Robin Cooper (1981). It explains why *most* cannot be defined in ordinary first-order logic with *all* and *some*: it compares the sizes of two sets.
:::

::: widget venn
title: *All students passed*
sets: 2
labels: student; passed
expr: student - passed
caption: The left circle is the set of students, the right the set of people who passed. The shaded region is the students who did **not** pass. *All students passed* is true exactly when this region is empty; *Not all students passed* when it has at least one member. Type *student & passed* to shade the region that must be non-empty for *Some students passed*, and that must be empty for *No students passed*.
:::

The set view also explains a subtle pattern. In *Some students drink coffee*, you can replace the predicate with a more general one and keep the truth: it entails *Some students drink something hot*. Quantifiers that allow this are **upward entailing** in their predicate. *No* reverses the direction: *No students drink anything hot* entails *No students drink coffee*. It is **downward entailing**. William Ladusaw (1979) observed that **negative polarity items** — *any*, *ever*, *at all*, *yet*, *lift a finger* — appear in downward-entailing contexts: ✓ *No student has ever complained*, ✗ *Some student has ever complained*; ✓ *I doubt she'll lift a finger*, ✗ *I'm sure she'll lift a finger*. A grammar rule that learners often meet as "use *any* in negatives and questions" is in fact a consequence of this semantic property.

::: definition Scope {#def-scope}
When a sentence contains two operators — quantifiers, negation, modals — one may be interpreted inside the other. The one interpreted outside has **wide scope**. *Every student read a book* has two readings: with *every* wide (‘for every student, there is some book they read’ — possibly different books) and with *a book* wide (‘there is one book that every student read’). *All the students didn't pass* can mean ‘none passed’ (*all* wide) or ‘not all passed’ (*not* wide); in speech, intonation often decides.
:::

::: example Reading scope {#ex-scope}
Give the readings of each sentence by paraphrasing them, and say which is more likely.

1. *Everyone in the office speaks two languages.*
2. *A doctor examined every patient.*
3. *Everything that glitters is not gold.*
::: solution
1. (a) *everyone* wide: each person speaks two languages, perhaps different ones — the natural reading. (b) *two languages* wide: there are two particular languages that everyone speaks. Reading (b) needs context (*… namely English and Cantonese*).
2. (a) *a doctor* wide: one doctor examined all the patients. (b) *every* wide: each patient was examined by a doctor, perhaps different ones. Speakers vary; the surface order favours (a), but knowledge of hospitals favours (b).
3. (a) *everything* wide: nothing that glitters is gold — false, and not what the proverb means. (b) *not* wide: not everything that glitters is gold — the intended meaning. The proverb (Shakespeare wrote *All that glisters is not gold*) shows that negation can take wide scope over a quantifier that precedes it.

Huang (1982) observed that Mandarin sentences with two quantifiers tend to have only the reading that matches the surface order: 有一个医生检查了每个病人 is normally understood as one doctor. Whether that is a strict rule or a strong preference has been discussed since.
:::
:::

::: warning *Any* in positive sentences
Because *any* belongs in downward-entailing contexts, ✗ *I have any questions* and ✗ *Some of them have any money* are ungrammatical. ✓ *I don't have any questions*; ✓ *Do you have any questions?*; ✓ *Few of them have any money* (*few* is downward entailing). But *any* also has a different, "free choice" use, stressed, in positive sentences: ✓ *Any student can apply* ‘every student, whichever one’. That is a separate meaning, related to *whichever*, not the polarity item.
:::

## Language and thought

Do speakers of different languages think differently because of the languages they speak? The idea is associated with Edward Sapir and his student Benjamin Lee Whorf, who wrote in the 1930s and 1940s that the categories of a language — such as the way Hopi grammar treats time, as Whorf described it — shape how its speakers perceive the world. In its **strong** form, linguistic **determinism**, the hypothesis says that language determines thought, so that what cannot be said cannot be thought. In its **weak** form, linguistic **relativity**, it says that language influences some kinds of thinking.

::: theorem What the evidence shows {#rule-relativity}
1. The strong form is not supported. People can think about distinctions their language does not name, translation between languages is possible, and Whorf's claims about Hopi time were challenged by Ekkehart Malotki's *Hopi Time* (1983), which documented the Hopi vocabulary of time in detail.
2. Weak effects have been found in specific domains, under specific conditions. Russian has two basic terms for blue, *goluboy* (light blue) and *siniy* (dark blue); Winawer and colleagues (2007) found that Russian speakers discriminated two blues faster when they fell on opposite sides of that boundary, and that the advantage disappeared when the participants had to do a verbal task at the same time — English speakers showed no such effect.
3. In **spatial** reasoning, speakers of languages that use absolute directions (north, south) rather than *left* and *right*, such as the Australian language Guugu Yimithirr, tend to solve non-verbal spatial tasks in absolute terms (Levinson, *Space in Language and Cognition*, 2003); the interpretation of these results is still debated.
4. Several famous claims have **not replicated**. Lera Boroditsky (2001) reported that Mandarin speakers think of time vertically (上个月 ‘last month’, literally ‘the up month’); later studies, including Chen (2007) and January and Kako (2007), failed to reproduce the result, and the effect remains contested.
5. Effects that are found are usually effects on attention, memory and speed in particular tasks, often strongest when language is used during the task — not effects on what people are able to perceive or think.
:::

::: example Testing a claim about Chinese {#ex-counterfactual}
In *The Linguistic Shaping of Thought* (1981), Alfred Bloom argued that because Chinese has no special grammatical form for counterfactual conditionals (like the English *If he had come, she would have been pleased*), Chinese speakers find counterfactual reasoning harder. How would you evaluate this claim, and what happened to it?
::: solution
1. **Check the linguistic premise.** Mandarin has no subjunctive or past-perfect form, but it has many ways of marking a condition as contrary to fact: 要是……就……, 如果……的话, 要不是 ‘if it weren't for’, 早知道 ‘had I known’, and context. So the premise "no counterfactual marking" is too strong: the difference is in grammaticalised form, not in the availability of the meaning.
2. **Check the experiment.** Bloom gave Chinese and American participants a story with counterfactual reasoning and found that fewer Chinese participants drew the counterfactual conclusions. Terry Kit-fong Au (1983) repeated the study with better translations of the story and found that Chinese speakers performed as well as English speakers; she suggested that the original Chinese version was unidiomatic. Lisa Liu (1985) reached a similar conclusion.
3. **Conclusion.** The claim, in its strong form, was not supported. The case is a classic lesson in how a hypothesis about language and thought must separate the grammar of a language from the expressive resources of its speakers, and must make sure that experimental materials are equally natural in both languages.
:::
:::

::: history
Semantics as a branch of linguistics is young. The word *sémantique* was introduced by the French linguist Michel Bréal in an article of 1883 and a book of 1897, mainly about how word meanings change. Frege's work on sense and reference (1892) and Tarski's on truth (1933) belonged to logic and philosophy, and American structuralists such as Bloomfield considered meaning too hard to study scientifically. In the 1960s Jerrold Katz and Jerry Fodor proposed semantic features as part of generative grammar, and around 1970 Richard Montague showed, in papers such as "English as a formal language", that a fragment of English could be given a precise compositional semantics like a logical language. Formal semantics grew from that work; at the same time Eleanor Rosch's research on prototypes, George Lakoff's *Women, Fire, and Dangerous Things* (1987) — whose title comes from a noun class of the Australian language Dyirbal described by R. M. W. Dixon — and Ronald Langacker's work founded **cognitive semantics**, which studies meaning as conceptualisation. Lexical semantics in dictionaries gained a new basis with corpora ([[linguistics/corpus-linguistics]]).
:::

## Where this leads

Meaning in context — implicature, presupposition, deixis and the structure of conversation — is in [[linguistics/pragmatics-discourse]]. The practical side of word meaning is in the *Collocation and Register* course, especially [[collocation-and-register/connotation]] and [[collocation-and-register/false-friends-chinglish]]; logical words in argument are in [[complex-sentences/adverbial-clauses]] and [[sentences-and-paragraphs/coordination]]. Countability and the meaning of articles are in [[nouns-and-articles/countable-uncountable]] and [[nouns-and-articles/a-and-the]].

::: summary
- **Reference** is what an expression picks out; **sense** is how it presents it (Frege 1892): *the morning star* and *the evening star*.
- Word senses are related by **synonymy**, **antonymy** (gradable, complementary, converse), **hyponymy**, **meronymy**; **polysemy** is one word with related senses, **homonymy** two words with one form.
- Categories have **prototypes** and fuzzy boundaries (Rosch, Labov); Mandarin classifiers are a grammatical system of categorisation, partly semantic and partly conventional.
- Sentence meaning is **compositional**; knowing it is knowing its **truth conditions**. **Entailment** cannot be cancelled; implicature can.
- *And*, *or*, *not*, *if* and *unless* correspond only partly to logical connectives; the differences are often pragmatic.
- **Quantifiers** are relations between sets; **downward-entailing** contexts license *any* and *ever*; sentences with two operators can have **scope ambiguity**.
- On **language and thought**, the strong Sapir–Whorf hypothesis is not supported; some weak, task-specific effects are, and several famous claims (including Mandarin vertical time and Chinese counterfactuals) have not replicated.
:::

## Exercises

::: exercise Kinds of opposite {level=1}
Classify each pair as gradable, complementary or converse: *wide*–*narrow*, *teacher*–*student*, *present*–*absent*, *above*–*below*, *young*–*old*, *win*–*lose* (a match).
::: solution
*wide*–*narrow*: gradable. *teacher*–*student*: converse (of the relation ‘teaches’). *present*–*absent*: complementary. *above*–*below*: converse. *young*–*old*: gradable (*old* is the unmarked member: *How old is she?*). *win*–*lose*: complementary for a match with no draw, though many sports allow draws, which makes the pair gradable-like in practice.
:::
:::

::: exercise Hyponym or meronym? {level=1}
For each pair, say whether the first is a hyponym or a meronym of the second: *spoon*–*cutlery*, *chapter*–*book*, *oak*–*tree*, *branch*–*tree*, *violin*–*orchestra*, *violin*–*instrument*.
::: solution
*spoon*: hyponym of *cutlery*. *chapter*: meronym of *book*. *oak*: hyponym of *tree*. *branch*: meronym of *tree*. *violin*–*orchestra*: meronym (a member of the whole). *violin*–*instrument*: hyponym.
:::
:::

::: exercise Polysemy or homonymy? {level=1}
Say whether each pair is polysemy or homonymy: *foot* (of a person / of a mountain); *bark* (of a dog / of a tree); *bright* (light / clever); *match* (for lighting a fire / a football game).
::: solution
*foot*: polysemy (the lowest part, by metaphor). *bark*: homonymy (different origins). *bright*: polysemy (a metaphor from light to intelligence, as in Mandarin 聪明, which contains 明 ‘bright’). *match*: homonymy (different origins).
:::
:::

::: exercise Entailment {level=2}
Does A entail B? Answer yes or no and justify.

1. A: *Lin regretted leaving.* B: *Lin left.*
2. A: *Lin left.* B: *Lin regretted leaving.*
3. A: *No student failed the exam.* B: *No student failed the written part of the exam.*
4. A: *Lin owns a dog.* B: *Lin owns an animal.*
::: solution
1. Yes (✗ *Lin regretted leaving, but she didn't leave*). The relation is also a presupposition, since it survives negation (*Lin didn't regret leaving* still implies she left) — see [[linguistics/pragmatics-discourse]].
2. No.
3. Yes: *no* is downward entailing, and failing the written part is a more specific case. (Assuming failing the written part counts as failing; if one can fail a part but pass overall, the answer depends on what *failed the exam* means — a good example of how entailment depends on precise senses.)
4. Yes, by hyponymy in an upward-entailing context.
:::
:::

::: exercise Venn diagrams for quantifiers {level=2}
For each sentence, say which region of a two-set Venn diagram (labels *bird* and *flies*) must be empty or non-empty for it to be true. Write the region as a set expression with the label names.

1. *All birds fly.*
2. *Some birds don't fly.*
3. *No birds fly.*
::: solution
1. *bird - flies* is empty.
2. *bird - flies* is non-empty (true: penguins, ostriches).
3. *bird & flies* is empty.

Sentences 1 and 2 contradict each other: one says a region is empty, the other that it is not. You can check each region with the Venn figure by typing the expression.
:::
:::

::: exercise *Any* and *ever* {level=2}
Mark each sentence ✓ or ✗ and explain with the notion of downward entailment.

1. *Few people have ever seen it.*
2. *Many people have ever seen it.*
3. *If you have any questions, ask.*
4. *She has any idea.*
::: solution
1. ✓ *few* is downward entailing in its predicate.
2. ✗ *many* is upward entailing.
3. ✓ the *if*-clause of a conditional is a downward-entailing context.
4. ✗ a positive declarative is upward entailing; ✓ *She doesn't have any idea* / *Does she have any idea?*
:::
:::

::: exercise Scope in a notice {level=3}
A notice in a library says: *All books may not be borrowed.* Give its two readings, say which the library probably means, and rewrite it twice so that each version has only one reading. Then explain in two or three sentences why the original is ambiguous.
::: solution
Readings: (a) *all* wide — ‘no book may be borrowed’; (b) *not* wide — ‘not all books may be borrowed; some are for reference only’. The library probably means (b).

Unambiguous versions: (a) *No books may be borrowed.* (b) *Not all books may be borrowed* or *Some books may not be borrowed.*

Explanation: the sentence contains two scope-taking elements, the quantifier *all* and the negation *not*. English allows the negation to take scope over a quantifier in subject position, as in *All that glitters is not gold*, as well as the reverse, so the sentence has both readings, and only context or intonation decides.
:::
:::

::: exercise Evaluate a claim {level=3}
Write 150–200 words evaluating this claim from a magazine: "English has no word for 缘分, so English speakers cannot understand the idea of fated connection between people."
::: hint
Separate the claim about words from the claim about thought. What evidence would test the second? Can the idea be expressed in English without a single word?
:::
::: solution
A model answer:

*The claim moves from a fact about vocabulary to a conclusion about thought, which is the strong form of the Sapir–Whorf hypothesis. The first part is roughly true: English has no single common word with the sense of* 缘分*, and translations such as* fate*,* destiny *or* serendipity *each miss part of it. But lacking a word is not the same as lacking a concept. The idea can be expressed in English by a phrase or a sentence — "a connection that seems meant to be", "we were fated to meet" — and English speakers who have it explained can recognise situations to which it applies, which is how loanwords such as* schadenfreude *or* feng shui *enter English. The strong form of the hypothesis is not supported by research: people can think about distinctions their language does not name. What studies of language and thought have found are weaker effects — on attention, memory and speed in particular tasks. A reasonable claim would be that speakers of Chinese have a ready-made category that makes the idea easier to notice and talk about; whether it changes how they think could only be tested experimentally.*
:::
:::
