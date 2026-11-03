A three-year-old tells her father: *I goed to the park and I seed two sheeps.* She has never heard an adult say *goed*, *seed* or *sheeps*. A few months earlier she said *went* correctly; in a year or two she will say it correctly again. In the meantime she has discovered that English past tenses end in *-ed* and plurals in *-s*, and she is applying the rules a little too well. Her errors are not failures of imitation. They are evidence that she is building a grammar.

Now consider her mother, who moved to Manchester from Shenyang at the age of thirty and has used English at work every day for ten years. She writes fluent, accurate reports, but she still sometimes leaves out the *-s* of *she works*, and colleagues hear at once that English is not her first language. Her daughter, who arrived at the age of two, will probably sound like any other Mancunian child by the time she is seven.

Both observations raise the central questions of language acquisition. How do children acquire a language so fast, with no teaching, from input that seems so limited? And why does learning a second language later in life usually turn out differently? This chapter surveys what is known, keeping close to the evidence, because few areas of linguistics have produced more confident claims that the evidence does not support.

## The course of first-language acquisition

::: definition First and second language acquisition {#def-acquisition}
**First language (L1) acquisition** is the development of a language from birth, or from very early childhood; a child who acquires two languages in this way is a **simultaneous bilingual**. **Second language (L2) acquisition** is the learning of a language after a first language has been established, whether in a country where it is spoken ("naturalistic" learning) or in a classroom (where it is often called a **foreign language**). The term "acquisition" is used for both, and does not imply that one process is unconscious and the other conscious.
:::

Children acquiring any language pass through broadly similar stages, at broadly similar ages, though with wide individual differences: some children say their first word at nine months and others at eighteen, and both are normal.

| approximate age | typical behaviour | examples |
|---|---|---|
| from birth | prefers the sounds of the mother's language and of speech in general | — |
| about 2–4 months | cooing: vowel-like sounds | *ooo*, *aah* |
| about 6–10 months | canonical babbling: repeated consonant–vowel syllables | *bababa*, *dadada* |
| about 10–15 months | first words | *mama*, *ball*, *more*, *up* |
| about 18–24 months | a rapid rise in vocabulary for many children; first two-word combinations | *more juice*, *daddy go*, *no bed* |
| about 2–3 years | grammatical morphemes begin to appear; "telegraphic" speech gives way to fuller sentences | *Mummy eating*; *two shoes*; *That my ball* |
| about 3–5 years | questions, negation, embedded clauses, most of the basic grammar | *Why is the dog barking?*; *I think it's broken* |
| school years and beyond | complex structures (passives with full meaning, some relative clauses), vocabulary growth of thousands of words a year, literacy, discourse skills | — |

The table is a summary of the textbook consensus (see Lightbown and Spada 2021 for a survey), not a set of norms. Two findings about it are particularly important. Deaf children who are exposed to a sign language from birth pass through comparable stages, including a form of babbling with the hands (Petitto and Marentette 1991), which suggests that the timetable belongs to language, not to speech. And the timetable is similar across very different languages and very different cultures of child-rearing, including cultures in which adults rarely speak to infants directly.

## Learning the sounds

Infants begin by being sensitive to the sound contrasts of all languages, and then narrow their perception to their own.

::: theorem Perceptual narrowing {#rule-narrowing}
1. Young infants discriminate many consonant contrasts that their parents' language does not use. Janet Werker and Richard Tees (1984) found that English-learning infants of six to eight months could tell apart Hindi and Nthlakampx (Salish) contrasts that English-speaking adults could not; by ten to twelve months, most of them no longer did.
2. The narrowing depends on experience, and in the studies that have tested it, on **social** experience. Patricia Kuhl and her colleagues (2003) gave nine-month-old American infants twelve short sessions with a Mandarin speaker who played and read with them; afterwards the infants discriminated a Mandarin consonant contrast that English does not have about as well as Taiwanese infants of the same age. Infants who heard the same amount of Mandarin from video or audio recordings showed no such effect.
3. Perception of vowels narrows earlier than perception of consonants, from about six months.
:::

::: proof
These findings come from experiments in which infants are trained to turn their heads when they hear a change in a repeated sound; if they turn at the right moment more often than by chance, they can hear the difference. The pattern — broad sensitivity, then narrowing towards the native language within the first year — has been replicated many times. Its interpretation is more cautious than popular accounts suggest. Narrowing does not mean that the ability is lost forever: adults can be trained to improve their perception of non-native contrasts, and some non-native contrasts remain easy throughout life. And the role of social interaction in Kuhl's study comes from one experiment with small groups of infants; later work has found that some screen-based exposure can work when it is interactive. The safe conclusion is that early perception is tuned by the language a child hears, starting long before the first words.
:::

How do infants find words in continuous speech, where there are no pauses between them? One answer is that they track statistics. Jenny Saffran, Richard Aslin and Elissa Newport (1996) played eight-month-old infants a two-minute stream of synthetic speech made of four invented three-syllable "words" — *tupiro*, *golabu*, *bidaku*, *padoti* — run together in random order with no pauses or stress. Inside a word, each syllable was always followed by the same next syllable; across a word boundary, the next syllable could be the start of any of the other words. In a test, the infants listened longer to syllable strings that crossed word boundaries than to the words themselves, showing that they had distinguished them.

::: widget markov
title: Transitional probabilities in an artificial language
matrix: 0,1,0,0,0,0,0,0,0; 0,0,1,0,0,0,0,0,0; 0,0,0,0.5,0,0,0.5,0,0; 0,0,0,0,1,0,0,0,0; 0,0,0,0,0,1,0,0,0; 0.5,0,0,0,0,0,0.5,0,0; 0,0,0,0,0,0,0,1,0; 0,0,0,0,0,0,0,0,1; 0.5,0,0,0.5,0,0,0,0,0
states: tu; pi; ro; go; la; bu; bi; da; ku
start: 0
steps: 30
caption: A simplified model of the kind of stream used by Saffran, Aslin and Newport (1996), built for this lesson from three of their four "words", *tupiro*, *golabu* and *bidaku* (the original also had *padoti*). Inside a word, the next syllable is certain (probability 1: *tu* → *pi* → *ro*). At the end of a word, the next syllable is the start of one of the other two words, each with probability 0.5 (with four words, as in the study, it was about one in three). Run the walk: the stream has no pauses, yet the dips in predictability mark the word boundaries — the information infants appear to use.
:::

## Learning grammar

::: theorem What children's grammatical development shows {#rule-l1-grammar}
1. **Order of morphemes.** Roger Brown (*A First Language*, 1973), following three American children closely, found that fourteen English grammatical morphemes appeared in a similar order in all three: the progressive *-ing* and the prepositions *in* and *on* early, the plural *-s* soon after, then the irregular past, the possessive *'s*, the articles, the regular past *-ed* and the third person *-s*, with the contracted auxiliary and copula among the last. Later studies with more children broadly confirmed the order.
2. **Rules and overregularisation.** Children apply productive rules to new words (Berko's wug test, [[linguistics/morphology]]) and to irregular ones (*goed*, *foots*). Overregularisation often follows a period of correct irregular forms, giving a U-shaped curve of accuracy. Gary Marcus and colleagues (1992), analysing the speech of many children, found that overregularisation errors were in fact a small minority of irregular past forms — a persistent but low-level phenomenon, not a stage in which all irregulars are lost.
3. **Developmental sequences.** Questions and negatives develop through characteristic stages. Children ask *What you are doing?* (with the *wh*-word fronted but no inversion) before *What are you doing?*, and say *No go* and *I not go* before *I don't go* — stages described by Edward Klima and Ursula Bellugi (1966).
4. **Little correction.** Parents rarely correct grammar explicitly. Brown and Camille Hanlon (1970) found that parents' approval and disapproval depended on whether what the child said was true, not on whether it was grammatical. Parents do often **recast** a child's sentence in correct form (*I goed there* — *Oh, you went there?*), and whether such recasts function as negative evidence is debated.
:::

::: example Reading a child's grammar {#ex-child}
Here are utterances from an imaginary English-speaking child at about two and a half (written for this lesson, modelled on the patterns in the research). For each, say what the child knows and what is not yet adult-like.

1. *Daddy shoes.*
2. *Him eating my biscuit!*
3. *Where Mummy going?*
4. *I falled down and hurted my knee.*
5. *No want bath.*
::: solution
1. Knows possessor–possessed order; has not yet used the possessive *'s* (*Daddy's shoes*), which appears relatively late in Brown's order.
2. Knows SVO order and the progressive *-ing* (an early morpheme); uses the object pronoun *him* as subject, a common error at this age; leaves out the auxiliary *is* (contractible auxiliaries are among the last morphemes).
3. Fronts the *wh*-word and uses *-ing*, but has no auxiliary and therefore no inversion — an early stage in the development of questions.
4. Applies the regular past *-ed* productively, overregularising the irregular verbs *fall* and *hurt*. This is evidence of a rule, not of imitation, and it is a sign of progress.
5. Expresses negation with *no* at the front of the utterance, an early stage before *I don't want …*. The meaning is clear; the auxiliary system that English negation needs is not yet in place.

None of these is a random error: each follows from a system with some but not all of the adult rules.
:::
:::

## Theories of first-language acquisition

How can these facts be explained? The theories differ in how much they think the child brings to the task and how much the input provides.

::: theorem Three families of theory {#rule-l1-theories}
1. **Nativist** theories, associated with Noam Chomsky, hold that children are born with a language faculty that contains knowledge of the possible forms of human grammar (**Universal Grammar**); experience sets the options of the particular language. The central argument is the **poverty of the stimulus**: children come to know properties of grammar for which their input seems to give too little evidence.
2. **Usage-based** (constructivist) theories, associated with Michael Tomasello (*Constructing a Language*, 2003), hold that children build grammar gradually from the utterances they hear, using general cognitive abilities — pattern-finding, analogy, categorisation and, above all, understanding the intentions of others. Early grammar is **item-based**: children first learn constructions with particular words (*Where's the X?*, *I want X*) and only slowly generalise to abstract categories.
3. **Interactionist** and **statistical-learning** accounts emphasise what the environment provides and how efficiently children use it: child-directed speech, joint attention and conversational turns, and the statistical regularities that infants track from the first months.
:::

::: proof
The classic poverty-of-the-stimulus example concerns English yes–no questions. To form a question from *The man who is tall is happy*, a child must front the auxiliary of the main clause (*Is the man who is tall __ happy?*), not the first auxiliary in the string (✗ *Is the man who __ tall is happy?*). The rule depends on structure, not on linear order ([[linguistics/phrases-constituents]]). Stephen Crain and Mineharu Nakayama (1987) elicited such questions from children aged three to five and found that they did not produce the structure-independent error, though they made other errors. Nativists argue that children could not have learned structure dependence from the input, because questions of this kind are very rare in speech to children; Geoffrey Pullum and Barbara Scholz (2002) replied that relevant examples are less rare than claimed, and computational studies have since shown that some learners without built-in structure dependence can acquire the generalisation from realistic input, while others cannot. On the other side, usage-based researchers point to evidence that young children's grammar is more conservative than adult grammar: Tomasello's studies found that two-year-olds taught a new verb in one construction rarely used it in another, which suggests that early knowledge is tied to individual words. Each family explains some findings better than others, and many researchers now combine them — some innate biases with powerful learning from rich input. What is not in dispute is that children do not learn mainly by imitation or by correction, as the errors and the parents' responses show.
:::

::: example Structure dependence {#ex-structure}
A child has heard many simple questions such as *Is the dog hungry?* (from *The dog is hungry*). Consider two hypotheses she might form: (A) "move the first *is* in the sentence to the front"; (B) "move the *is* of the main clause to the front". Show what each predicts for *The dog that is barking is hungry*, and explain why the result matters for theories of acquisition.
::: solution
1. **Simple sentences do not distinguish the hypotheses.** In *The dog is hungry* the first *is* and the main-clause *is* are the same word, so both give *Is the dog hungry?*
2. **Hypothesis A** (linear) moves the first *is*, which is inside the relative clause: ✗ *Is the dog that __ barking is hungry?*
3. **Hypothesis B** (structural) moves the *is* of the main clause, after the whole subject NP *the dog that is barking*: ✓ *Is the dog that is barking __ hungry?*
4. **What children do.** In Crain and Nakayama's (1987) elicitation study, children aged three to five did not produce questions of type A, though they made other errors — for example repeating the auxiliary (*Is the dog that is barking is hungry?*).
5. **Why it matters.** Hypothesis A is simpler to state for a learner who sees sentences as strings of words, and the input contains few questions that would show it to be wrong. Nativists take the children's behaviour as evidence of an innate bias towards structure; usage-based and statistical researchers argue that structure can be learned from other evidence in the input, such as how noun phrases with relative clauses behave elsewhere. Both sides agree on the facts in steps 2–4.
:::
:::

::: warning "Children learn languages effortlessly"
✗ *Children learn languages effortlessly and perfectly, without any input.* Children need years of rich input and interaction: a typical child hears many thousands of words a day, and children who hear less language tend to develop vocabulary more slowly. They also make many errors along the way, and some aspects of grammar and vocabulary continue to develop into adolescence. ✓ *Children acquire their first language without instruction, from the language around them, along a remarkably similar path.* The second statement is what the evidence supports.
:::

::: quiz
What did Saffran, Aslin and Newport's (1996) experiment show?
- [ ] that infants are born knowing the words of their language
- [x] that eight-month-olds can use the predictability of one syllable from the previous one to find word-like units in continuous speech
- [ ] that infants learn words only from their parents' corrections
- [ ] that adults learn languages faster than infants
::: solution
After two minutes of listening to a stream with no pauses, the infants treated syllable sequences inside the invented words differently from sequences that crossed word boundaries. The only cue was the transitional probability between syllables. The experiment shows a learning ability; it does not show that this is the only way infants find words.
:::
:::

## Age and the critical period

::: definition Critical and sensitive period {#def-critical-period}
The **critical period hypothesis** holds that there is a limited period of development — often said to end around puberty — during which a language can be acquired fully, and after which full, native-like acquisition is no longer possible. The idea was made influential by Eric Lenneberg's *Biological Foundations of Language* (1967). Many researchers now prefer the term **sensitive period**, for a period of heightened sensitivity whose end is gradual, not sharp.
:::

The evidence for an age effect is strong; the evidence about its shape and causes is mixed.

::: theorem What the evidence on age shows {#rule-age}
1. **First language.** Children deprived of language input in early childhood show lasting deficits. The best-known case, the girl known as Genie, discovered in Los Angeles in 1970 at the age of thirteen, learned many words but never mastered English grammar (Susan Curtiss, 1977); but she had also suffered severe abuse and isolation, so her case cannot isolate the effect of age. Better evidence comes from deaf people who first met a sign language at different ages: in studies by Rachel Mayberry and Elissa Newport, those exposed later performed less well as adults, even after decades of use.
2. **Second language: ultimate attainment.** Jacqueline Johnson and Elissa Newport (1989) tested 46 native speakers of Chinese and Korean who had moved to the United States between the ages of three and thirty-nine, using a grammaticality judgment task. Those who arrived before about seven performed like native speakers; performance declined steadily with age of arrival up to puberty; and after that it was lower and much more variable.
3. **The shape is debated.** Some later studies found no clear break at puberty but a decline continuing into adulthood: David Birdsong and Michelle Molis (2001), repeating Johnson and Newport's test with Spanish speakers, and Kenji Hakuta, Ellen Bialystok and Edward Wiley (2003), using United States census data on the self-reported English of over two million immigrants from Chinese- and Spanish-speaking backgrounds, found that proficiency fell with age of arrival in a smooth line, without the discontinuity a critical period predicts. Joshua Hartshorne, Joshua Tenenbaum and Steven Pinker (2018), with an online grammar test taken by about 670,000 people, estimated that the ability to learn grammar stays high until late adolescence (about 17) and then declines, but that native-like grammar is reached only by those who start in childhood (before about 10).
4. **Pronunciation** shows the strongest age effects: an accent is very common in people who began a language after childhood (Flege, Munro and MacKay 1995, with Italian immigrants in Canada).
5. **Rate is not the same as end point.** In the short term older learners often learn faster than younger ones: Catherine Snow and Marian Hoefnagel-Höhle (1978) found that English-speaking adolescents and adults living in the Netherlands made faster initial progress in Dutch than young children. In classrooms with a few hours a week, an early start does not by itself guarantee an advantage: Carmen Muñoz (2006) found that, after the same number of hours, learners in Spain who began English later performed as well as or better than early starters.
6. **Native-like attainment after childhood is rare but not impossible.** Niclas Abrahamsson and Kenneth Hyltenstam (2009) found that a small number of adult learners of Swedish could pass as native speakers to listeners, but that almost none of them matched natives on very detailed tests.
:::

::: proof
Why do these results differ? Partly because they measure different things — grammaticality judgments, accent ratings, self-reports, scores on detailed tests — and partly because age of arrival is confounded with many other variables: the amount and kind of input, schooling in the new language, motivation, identity, how much the first language continues to be used. Explanations of the age effect range from maturational change in the brain, to the entrenchment of the first language (the more established L1 categories are, the more they filter the new language), to social factors. Most researchers accept that age matters; few now believe that a sharp biological cut-off at puberty makes high attainment impossible. The practical implication is modest and evidence-based: younger is often better in the long run *with extensive exposure*, older learners learn faster at first, and starting later is no reason to stop.
:::

::: example Evaluating a claim about age {#ex-age-claim}
An advertisement for an English programme for toddlers says: "Science proves that after the age of six your child will never be able to speak English properly. Start now!" Evaluate the claim, using the evidence in [[#rule-age]].
::: solution
1. **"Science proves"**: the research shows a statistical relationship between age of starting and ultimate attainment among immigrants with extensive exposure, with debate about its shape. It does not prove a cut-off at six for anyone.
2. **"After the age of six"**: Johnson and Newport found native-like scores for arrivals before about seven, but the decline after that was gradual, and later studies found no sharp break at any age. Hartshorne et al. (2018) put the end of native-like grammar learning at about ten for those who start then *and* continue with substantial exposure.
3. **"Never … properly"**: many people who start later reach very high levels of English; native-likeness in every detail is rare after childhood, but that is not the same as not speaking "properly".
4. **The relevant context**: the studies concern people immersed in an English-speaking country. For classroom learning of a few hours a week, Muñoz (2006) and similar studies found no automatic advantage for an early start; the amount and quality of input matter more.
5. **Conclusion**: the claim overstates and misapplies the evidence. An early start can help if it brings a great deal of meaningful input over many years; it is not a deadline.
:::
:::

::: quiz
Which conclusion about age and second-language learning is best supported by the studies in this chapter?
- [ ] No one who starts after puberty can reach a high level.
- [ ] Age has no effect at all.
- [x] Long-term attainment tends to decline with age of starting, especially in pronunciation, but the decline is gradual and high levels remain possible.
- [ ] Children always learn faster than adults in the first months.
::: solution
Johnson and Newport (1989), Hakuta, Bialystok and Wiley (2003), Hartshorne et al. (2018) and others all find an age effect on ultimate attainment, but the later studies do not find a sharp cut-off, and many late learners reach high proficiency. In the short term, older learners are often faster (Snow and Hoefnagel-Höhle 1978).
:::
:::

## Second-language acquisition

::: definition Interlanguage and transfer {#def-interlanguage}
**Interlanguage** (Larry Selinker, 1972) is the systematic language of a learner, which has rules of its own, partly from the first language, partly from the target language and partly from neither. **Transfer** is the influence of the first language on the second: positive when the two agree, negative (interference) when they differ. **Fossilisation** is the persistence of interlanguage features despite continued exposure.
:::

The first theory of L2 difficulty, the **contrastive analysis hypothesis** (Robert Lado, *Linguistics Across Cultures*, 1957), predicted that differences between L1 and L2 would cause errors and similarities would make learning easy. It was partly right — transfer is real and is the reason this atlas has notes on English and Chinese — but it predicted errors that do not occur and missed many that do. Studies in the 1970s found that learners with very different first languages share many of the same errors and developmental sequences. Heidi Dulay and Marina Burt (1974) found that Chinese- and Spanish-speaking children learning English acquired English grammatical morphemes in similar orders, different in detail from the L1 order but similar to each other; and stages of question formation like those of children ([[#rule-l1-grammar]], rule 3) are found in adult learners as well. Transfer and developmental universals act together: the third person *-s* is learned late by almost all learners, and for speakers of Mandarin, which has no inflection for person or tense, it may be especially persistent.

::: theorem Main ideas in second-language acquisition research {#rule-sla}
1. **Input** is necessary. Stephen Krashen's **input hypothesis** (1982) claimed that comprehensible input, slightly beyond the learner's level, is not only necessary but sufficient, and that conscious learning plays little part in fluent use. The first part is widely accepted; the strong claims have been criticised as untestable, and later research does not support them.
2. **Interaction** helps: negotiating meaning in conversation (asking for clarification, getting reformulations) makes input comprehensible and draws attention to forms (Michael Long's **interaction hypothesis**, 1996).
3. **Output** helps: having to speak or write pushes learners to notice what they cannot yet say (Merrill Swain's **output hypothesis**, 1985, based on Canadian French immersion students who understood French very well but made persistent grammatical errors).
4. **Noticing** matters: Richard Schmidt (1990) argued that learners must notice a form in the input for it to become intake, a view supported by much later research on attention.
5. **Instruction** works. Meta-analyses of experimental studies, beginning with John Norris and Lourdes Ortega (2000), found that form-focused instruction, especially explicit instruction, leads to substantial gains, and that the gains are reasonably durable — although some developmental sequences cannot be skipped by teaching.
6. **Individual differences** — aptitude, motivation, anxiety, working memory, opportunities for use — explain much of the variation between learners with the same starting age.
:::

::: example Diagnosing an interlanguage {#ex-interlanguage}
A Mandarin-speaking learner of English writes (a text written for this lesson):

*Yesterday I go to supermarket buy some fruit. The apple is very cheap, so I buy three kilo. My roommate she don't like apple, she like banana.*

Identify the features that may come from transfer, those that are common developmental features of many learners, and one feature that is already target-like.
::: solution
**Likely transfer from Mandarin**
- No past tense marking (*go*, *buy* for *went*, *bought*) after a time word: Mandarin marks time lexically (昨天) and has no tense inflection ([[tense-and-aspect/tense-and-chinese]]).
- Missing articles (*to supermarket*): Mandarin has no articles.
- Serial verbs without a link (*go to supermarket buy some fruit*): Mandarin 去超市买水果 needs no connecting word; English needs *to buy*.
- Topic–comment with a resumptive pronoun (*My roommate she …*): [[linguistics/clauses-movement]].
- Plurals missing after a numeral (*three kilo*, *like apple*): Mandarin marks number with numerals and classifiers, not on the noun.

**Common developmental features of many learners**
- Missing third person *-s* (*she like*) and *don't* for *doesn't*: learned late by learners of almost every L1 (and by children).
- Overextension of the present simple for past events in narratives is also found in learners from other backgrounds.

**Target-like**
- SVO order throughout, the *so* clause of result, adjective placement (*very cheap*) and the partitive *some fruit* are all correct English.

A teacher who knows which errors come from which source can predict which will need explicit attention (the past tense, articles) and which are part of a normal developmental sequence.
:::
:::

::: note English and Chinese
Mandarin-speaking children show the general patterns of acquisition with features of their own language. Charles Li and Sandra Thompson (1977) found that children acquire the four tones early — before they have mastered all the consonants and vowels — and studies of Mandarin classifiers, beginning with Mary Erbaugh's (1986), report that the general classifier 个 is learned first and used widely in place of the specific ones before children learn the shape-based classifiers (张, 条, 本). Both findings are reminders that what is "hard" depends on the system being learned: tone is a prominent, early-learned property for a child acquiring Mandarin, though it is notoriously hard for adult learners of Mandarin, just as English vowel reduction and inflection are easy for English-speaking children and hard for adult Chinese learners of English.

For Chinese learners of English, the research has several practical messages. A great deal of input — reading and listening far beyond the textbook — matters more than the age at which classes began. Explicit attention helps with features that transfer makes hard to notice, such as articles, the third person *-s* and the past tense, because they carry little meaning that the context does not already supply. Errors of the kind analysed in [[#ex-interlanguage]] are normal stages, not signs of failure. And an accent after childhood is the norm, not a deficiency: the goal is intelligibility, which an accent need not reduce ([[sounds-of-english/sounds-for-chinese-speakers]]).
:::

::: history
The modern study of child language began with diaries kept by parents, such as those of Clara and William Stern in Germany (1907). In 1959 Chomsky's review of B. F. Skinner's *Verbal Behavior* argued that behaviourist accounts of learning by imitation and reinforcement could not explain language, and research in the 1960s and 1970s — Berko's wug test (1958), Brown's longitudinal studies of "Adam, Eve and Sarah" (1973) — documented the rule-governed nature of child language. Brian MacWhinney and Catherine Snow founded the CHILDES database in 1984, a shared archive of transcribed child speech in many languages that made large-scale corpus studies of acquisition possible. Second-language acquisition became a field of its own after Pit Corder's article "The significance of learners' errors" (1967) and Selinker's "Interlanguage" (1972). From the 1990s experimental methods with infants (head-turn and looking-time studies) and, more recently, brain imaging and computational modelling have joined observation and corpus work.
:::

## Where this leads

The structures whose acquisition this chapter described — morphology, questions, relative clauses — are analysed in [[linguistics/morphology]] and [[linguistics/clauses-movement]]. How learners can use what is known about learning is the subject of practical lessons such as [[core-vocabulary/learning-and-remembering]] and [[listening-and-conversation/how-listening-works]]. Pronunciation goals for adult learners are in [[sounds-of-english/sounds-for-chinese-speakers]] and in the course *World Englishes*. Language models that learn from text alone, and how they differ from children, are discussed in the [LLM Atlas](/learn/llm/).

::: summary
- Children acquire their first language without instruction along a similar path in all languages, spoken or signed, with wide individual variation in timing.
- Infants' perception **narrows** to the contrasts of their language in the first year, shaped by (social) experience; infants track **transitional probabilities** to find words.
- Grammatical morphemes appear in a broadly fixed **order**; **overregularisation** (*goed*) shows rule learning; questions and negatives develop in stages; explicit correction is rare.
- **Nativist**, **usage-based** and **interactionist** theories explain different findings; the poverty-of-the-stimulus argument (structure dependence) remains debated.
- **Age** affects ultimate attainment, especially in pronunciation, but the shape of the decline is debated (no sharp cut-off in several large studies); older learners are faster at first; classroom start age matters less than input.
- L2 learners build an **interlanguage** shaped by **transfer** and by developmental sequences shared across L1s.
- Input, interaction, output, noticing and explicit instruction all contribute; individual differences matter.
:::

## Exercises

::: exercise Stages {level=1}
Put these utterances in the order in which they would typically appear in an English-speaking child's development: (a) *Where are you going?*; (b) *bababa*; (c) *more juice*; (d) *Where you going?*; (e) *ball*.
::: solution
(b) babbling → (e) first word → (c) two-word combination → (d) *wh*-question without inversion → (a) adult question.
:::
:::

::: exercise What does the error show? {level=1}
What does each child's error show about the rule the child is using?

1. *two mouses*
2. *She singed a song.*
3. *I brang it.*
::: solution
1. The regular plural *-s* applied to an irregular noun (overregularisation).
2. The regular past *-ed* applied to an irregular verb.
3. Analogy with an irregular family (*sing–sang*, *ring–rang*): the child has generalised a minor pattern, which shows that irregular forms are also related in the mind, not just memorised one by one.
:::
:::

::: exercise True or false? {level=1}
Mark each statement true or false according to the evidence in this chapter.

1. Parents usually correct their young children's grammar.
2. Deaf children exposed to a sign language from birth babble with their hands.
3. Older learners make faster initial progress than young children in some studies.
4. Johnson and Newport (1989) studied native speakers of Spanish.
::: solution
1. False (Brown and Hanlon 1970). 2. True (Petitto and Marentette 1991). 3. True (Snow and Hoefnagel-Höhle 1978). 4. False: Chinese and Korean; Birdsong and Molis (2001) used Spanish speakers.
:::
:::

::: exercise Transfer or development? {level=2}
For each learner error, say whether it is more likely transfer from Mandarin, a developmental error common to many learners, or both, and explain.

1. ✗ *He have two child.*
2. ✗ *Although it was raining, but we went out.*
3. ✗ *I very like this film.*
4. ✗ *What you want?*
::: solution
1. Both: missing third person *-s* is developmental for all learners; the missing plural after a numeral also reflects Mandarin, where number is not marked on the noun.
2. Transfer: Mandarin 虽然……但是…… uses both connectives; English uses one ([[complex-sentences/adverbial-clauses]]).
3. Transfer: 我很喜欢 places 很 before the verb.
4. Developmental: a stage in question formation for children and for learners of many first languages; Mandarin (which has no inversion) may also reinforce it.
:::
:::

::: exercise Rate and attainment {level=2}
Explain in three or four sentences the difference between the **rate** of learning and **ultimate attainment**, and why a study of each can seem to give opposite answers about age.
::: solution
Rate is how quickly learners progress in a given time; ultimate attainment is the level they eventually reach after many years. Older learners can use more developed memory, literacy and strategies, so they often progress faster at first (Snow and Hoefnagel-Höhle 1978). But in studies of people with long-term exposure, those who started younger tend to reach higher levels (Johnson and Newport 1989). The two findings are compatible: older starters are faster in the short run, younger starters in the long run, given enough input.
:::
:::

::: exercise Transitional probabilities {level=2 check="0.5"}
In a stream built from the invented words *badu*, *kito* and *bago*, where each word is followed by one of the others at random, what is the transitional probability from *ba* to *du*? (Give a decimal.)
::: solution
*ba* begins two words, *badu* and *bago*, which (over a long stream) occur equally often. So after *ba*, the next syllable is *du* half the time and *go* half the time: P(*du* | *ba*) = **0.5**. Transitional probability inside a word is not always 1 when words share syllables, which makes segmentation harder — as in real languages.
:::
:::

::: exercise Evaluate a teaching claim {level=3}
A school brochure says: "Our immersion method means children absorb English naturally, just like their mother tongue, so we never teach grammar." Write 150–200 words evaluating this claim with evidence from this chapter.
::: hint
Consider the amount of input, the immersion evidence behind Swain's output hypothesis, and the meta-analyses of instruction.
:::
::: solution
A model answer:

*The claim contains a reasonable idea — that a great deal of meaningful input is essential — but it goes beyond the evidence in two ways. First, a school programme is not the same as first-language acquisition: a child acquiring a first language hears it for most of every waking day for years, with constant interaction, while even an intensive programme provides a fraction of that. Second, the best-known immersion programmes, in Canada, showed that students who received rich input for years understood French very well but continued to make grammatical errors in speaking and writing; this is what led Merrill Swain to argue that learners also need to produce language and to notice what they cannot say. Meta-analyses of experimental studies (Norris and Ortega 2000 and later) found that explicit, form-focused instruction leads to substantial and durable gains, especially for features that are hard to notice, such as articles and the third person -*s*. The evidence therefore supports combining rich input with interaction, output and some explicit attention to form. "Never" teaching grammar is not supported.*
:::
:::

::: exercise A language biography {level=3}
Write 200–250 words describing your own learning of English (or of another language), using at least five terms from this chapter (for example *input*, *interaction*, *transfer*, *interlanguage*, *noticing*, *fossilisation*, *sensitive period*, *explicit instruction*). For one feature of your English that has been hard to acquire, explain which factors from the chapter might account for it.
::: solution
Answers will vary. A good answer uses the terms accurately (for example, *transfer* for an L1-based pattern, not for any error), relates at least one difficulty to both a transfer explanation and a developmental or input-based one, and avoids overclaiming — for instance, it does not say that it is "too late" to improve because of a critical period, since the evidence does not support a fixed cut-off.
:::
:::
