*Have you stopped wasting money on lottery tickets?* If you answer *yes*, you admit that you used to waste money on them; if you answer *no*, you admit that you still do. Either way you have accepted something the question never asserted — that you have been buying lottery tickets. Lawyers know this trick as the "loaded question", and linguists call the hidden assumption a **presupposition**. It is one of the ways in which a sentence communicates more than its truth conditions.

Here is another case, an exchange written for this lesson:

> **Zhou Min:** *Are you coming to the department dinner on Friday?*
> **Tom:** *Well … I've got a lot on this week, actually.*

Tom does not say *no*. He does not even mention the dinner. Yet Zhou Min understands at once that he is probably not coming, and she also understands that he is being careful about saying so. Everything about the shape of his turn — the *well*, the pause, the explanation without an answer, the *actually* — tells her that a refusal is on its way.

Semantics, in the previous chapter, studied meaning that belongs to sentences: what must be true if a sentence is true. **Pragmatics** studies what speakers mean by using sentences in context, and **discourse analysis** studies how utterances combine into texts and conversations. The course *Pragmatics* teaches the practical side — Grice's maxims and implicature ([[pragmatics/meaning-beyond-words]]), speech acts ([[pragmatics/speech-acts]]), politeness ([[pragmatics/politeness-face]]), requests and refusals ([[pragmatics/requests-refusals]]). This chapter takes those as known and adds the theoretical tools that sit beside them: deixis, presupposition, the classification of implicatures, information structure, the cohesion and coherence of texts, and the organisation of conversation.

## Deixis: words that point

Some words cannot be interpreted at all without knowing who is speaking, to whom, when and where. *I'll meet you here tomorrow* is a perfectly clear sentence, but until we know the speaker, the hearer, the place and the date, we do not know what it says.

::: definition Deixis {#def-deixis}
**Deixis** (from Greek ‘pointing’) is the use of expressions whose reference depends on the context of utterance. The main kinds are:

- **person deixis**: *I*, *you*, *we*; *we* may include the hearer (*Shall we go?*) or exclude them (*We'll let you know*);
- **place deixis**: *here*, *there*, *this*, *that*, *come*, *go*, *bring*, *take*;
- **time deixis**: *now*, *then*, *today*, *yesterday*, *next week*, and tense itself;
- **discourse deixis**: expressions that point to parts of the text: *the following*, *the above*, *this point*;
- **social deixis**: forms that encode the social relation between speaker and hearer, such as titles and honorifics.

The point of reference — normally the speaker's place and time — is the **deictic centre**.
:::

The deictic centre can shift. In a letter, *now* may mean the time of writing or the time of reading; in a story, *here* and *now* can be the place and time of a character; and *come* can be used towards the hearer's position (*I'll come to your office at three*) as well as the speaker's. English verbs of motion are subtle in this way, and Mandarin 来 and 去 do not map onto *come* and *go* one to one in every context, so learners need to notice whose position is the centre.

Social deixis is where English and Mandarin differ most visibly. Many European languages distinguish a familiar and a polite second-person pronoun — French *tu* and *vous*, German *du* and *Sie* — a distinction Roger Brown and Albert Gilman analysed as "the pronouns of power and solidarity" (1960). Mandarin has the polite 您 beside 你; English lost its parallel distinction when *thou* fell out of ordinary use, mostly by the eighteenth century, and now marks the relation with titles, names and choice of words (*Professor Li* versus *Li Wei*; *Could I possibly …* versus *Can I …*). [[pragmatics/politeness-face]] discusses what these choices do.

## Presupposition

::: definition Presupposition {#def-presupposition}
A **presupposition** is a proposition that a speaker takes for granted as part of the background when making an utterance, and that the utterance needs in order to be appropriate. *Lin's brother is a pilot* presupposes that Lin has a brother. The expression that brings in a presupposition is its **trigger**.
:::

The test that distinguishes a presupposition from an entailment is what happens under negation and in other environments that cancel ordinary assertions.

::: theorem Testing for presupposition {#rule-presupposition}
1. **Constancy under negation.** A presupposition survives when the sentence is negated; an ordinary entailment does not. *Lin's brother is a pilot* entails *Lin's brother can fly a plane* and presupposes *Lin has a brother*. *Lin's brother isn't a pilot* no longer entails that he can fly a plane, but still presupposes that Lin has a brother.
2. **The family of sentences.** A presupposition also survives in a question (*Is Lin's brother a pilot?*), after a modal (*Lin's brother might be a pilot*) and in the *if*-clause of a conditional (*If Lin's brother is a pilot, he travels a lot*). Testing all of these together gives a reliable result.
3. **Common triggers:**

| trigger | example | presupposition |
|---|---|---|
| definite descriptions and possessives | *the director of the lab*; *Lin's car* | there is such a person or thing |
| factive verbs | *She regrets / knows / realised that she left* | she left |
| change-of-state verbs | *He stopped / started / continued smoking* | he had (not) been smoking before |
| iteratives | *She failed again*; *He came back* | she had failed before; he had been there before |
| *it*-clefts and *wh*-clefts | *It was Sam who broke it*; *What Sam broke was the vase* | someone broke it; Sam broke something |
| temporal clauses | *Before she moved to Xi'an, she taught in Lanzhou* | she moved to Xi'an |
| implicative and other verbs | *He managed to finish* | he tried or it was difficult |
:::

::: proof
The negation test follows from the definition. An assertion is what a sentence puts forward as new; negation denies what is put forward, so it removes the entailments that depend on the assertion. A presupposition is not put forward but taken for granted, so the negation leaves it alone. The family-of-sentences test is a refinement found in standard textbooks of semantics (for example Chierchia and McConnell-Ginet, *Meaning and Grammar*, 1990), because negation alone is sometimes unclear. Presuppositions have two further properties that have kept theorists busy since the 1970s. They can be **cancelled** in special contexts: *Lin's brother isn't a pilot — Lin doesn't have a brother!* is coherent as a correction (a "metalinguistic" negation). And they can be **accommodated**: if a colleague says *Sorry I'm late — my car broke down*, you accept without objection that she has a car, though you did not know it before. David Lewis (1979) described accommodation as the conversation adjusting its background to make an utterance appropriate. The *projection problem* — how the presuppositions of parts become presuppositions of the whole sentence (*If Lin has a brother, her brother is a pilot* does not presuppose that she has one) — is still the subject of research.
:::

::: example Finding presuppositions {#ex-presupposition}
List the presuppositions of each sentence and name the trigger. Then show with the negation test that each is a presupposition.

1. *Mei realised that the meeting had been cancelled.*
2. *It was the second paragraph that confused the readers.*
3. *Wang Lei has started taking the bus to work again.*
::: solution
1. Trigger: the factive verb *realise*. Presupposition: *the meeting had been cancelled*. Test: *Mei didn't realise that the meeting had been cancelled* — still implies it had been cancelled. (Compare non-factive *believe*: *Mei didn't believe that the meeting had been cancelled* says nothing about whether it was.)
2. Trigger: the *it*-cleft. Presupposition: *something confused the readers*. Test: *It wasn't the second paragraph that confused the readers* — still implies that something did. (Also: the definite *the second paragraph* presupposes that there is a second paragraph.)
3. Triggers: *start* (change of state) and *again* (iterative). Presuppositions: *Wang Lei had not been taking the bus to work recently* (from *start*) and *he had taken the bus to work at some earlier time* (from *again*). Test: *Wang Lei hasn't started taking the bus again* — still implies both.
:::
:::

::: warning Presuppositions in questions
Because presuppositions survive in questions, a question can smuggle in a claim the hearer has not accepted. ✗ *Why is your method less accurate than ours?* (presupposes that it is less accurate) in a seminar is a challenge disguised as a question; ✓ *Is your method less accurate than ours? Our results suggest it might be.* Survey designers avoid such questions (✗ *How much has the new policy improved your life?*), and careful academic writers notice them in their own drafts.
:::

## Implicature: a classification

[[pragmatics/meaning-beyond-words]] introduced Grice's Cooperative Principle, the maxims, and the way implicatures arise when a speaker flouts a maxim. Grice himself (1975) distinguished several kinds of non-literal meaning, and later theorists sharpened the distinctions.

::: definition Kinds of implicature {#def-implicature-kinds}
- A **conversational implicature** arises from the assumption that the speaker is cooperative, and depends on context. It may be **particularised** (arising only in a special context: *I've got a lot on this week* implicating ‘I won't come to the dinner’) or **generalised** (arising in almost any context unless something blocks it: *some* implicating ‘not all’; *I met a woman yesterday* implicating that she is not my wife or sister).
- A **conventional implicature** is attached to the meaning of a particular word, not derived from the maxims, and is not part of the truth conditions: *She is poor but honest* is true if and only if she is poor and honest; *but* adds a contrast between the two, which is not part of what makes the sentence true. *Even*, *therefore* and *yet* are other standard examples.
:::

::: theorem Properties of conversational implicatures {#rule-implicature-tests}
1. **Cancellable**: they can be denied without contradiction (*Some of the students passed — in fact all of them did*).
2. **Calculable**: the hearer can reconstruct how they arise from what was said and the assumption of cooperation.
3. **Non-detachable**: saying the same thing in other words gives the same implicature (*A few of the students passed*, *Not every student failed*).
4. **Context-dependent**: a particularised implicature may vanish in another context (*I've got a lot on this week* in reply to *How's work?* implies nothing about a dinner).

Conventional implicatures are not cancellable (✗ *She is poor but honest, though I see no contrast between these*) and are detachable (*She is poor and honest* says the same thing without the contrast).
:::

::: proof
The tests come from Grice (1975) and were developed by Gerald Gazdar (1979) and Stephen Levinson (*Pragmatics*, 1983). They follow from what conversational implicatures are: inferences about the speaker, not parts of the sentence's meaning, so denying them contradicts nothing; based on what was said and not how, so other wordings give them too. **Scalar** implicatures are the best-studied generalised kind. Laurence Horn (1972) observed that words fall on scales of informativeness — ⟨*some*, *most*, *all*⟩, ⟨*warm*, *hot*⟩, ⟨*possible*, *certain*⟩, ⟨*or*, *and*⟩ — and that using a weaker term implicates that the speaker is not in a position to use a stronger one. Two later families of theory try to explain these facts more economically: **neo-Gricean** accounts (Horn 1984; Levinson, *Presumptive Meanings*, 2000), which reduce the maxims to two or three principles, and **relevance theory** (Dan Sperber and Deirdre Wilson, *Relevance*, 1986), which replaces them with a single principle of relevance and argues that much of what Grice counted as implicature is part of what is said, enriched by context (the "explicature", [[pragmatics/meaning-beyond-words#def-relevance]]).
:::

::: example Entailment, presupposition or implicature? {#ex-three-kinds}
Each sentence A suggests B. Decide whether B is an entailment, a presupposition, a conversational implicature or a conventional implicature, and give the test you used.

1. A: *Most of the tickets have been sold.* B: *Not all of the tickets have been sold.*
2. A: *Even the director came to the party.* B: *The director was among the least likely people to come.*
3. A: *Sam's sister lives in Kunming.* B: *Sam has a sister.*
4. A: *Sam's sister lives in Kunming.* B: *Sam's sister lives in China.*
::: solution
1. **Conversational (scalar) implicature.** Cancellable: ✓ *Most of the tickets have been sold — in fact all of them have.*
2. **Conventional implicature** of *even*. Not cancellable (✗ *Even the director came, and she was the most likely person to come* is odd), but not part of the truth conditions: if the director came, A is true whether or not she was unlikely to.
3. **Presupposition** (trigger: possessive *Sam's sister*). Survives negation: *Sam's sister doesn't live in Kunming* still implies he has one.
4. **Entailment** (Kunming is in China). Does not survive negation: *Sam's sister doesn't live in Kunming* says nothing about whether she lives in China. Cannot be cancelled: ✗ *Sam's sister lives in Kunming but not in China.*
:::
:::

## Information structure

A sentence also tells the hearer which part of its content is already shared and which is new. The same proposition can be packaged in many ways.

::: definition Given and new, topic and focus {#def-information-structure}
**Given** information is what the speaker treats as already known or available to the hearer; **new** information is what the speaker presents as not recoverable. The **topic** is what the sentence is about; the **focus** is the part that carries the main new information, marked in English by the main pitch accent (the nucleus) and often by position at the end of the clause (**end-focus**). The terms come from the Prague School (Vilém Mathesius, from the 1920s) and from Halliday's work on English (1967).
:::

English uses several structures to place focus where the speaker wants it: intonation ([[connected-speech/sentence-stress#rule-focus]]), clefts and fronting ([[complex-sentences/emphasis-inversion]]), the passive ([[linguistics/clauses-movement#ex-passive-text]]) and the choice of subject. Usually focus does not change truth conditions: *Sam broke the VASE* and *SAM broke the vase* are true in the same situations, and differ in what they answer (*What did Sam break?* versus *Who broke the vase?*). But with **focus-sensitive** words such as *only*, *even* and *also*, focus changes what is said.

::: example Focus and *only* {#ex-focus}
Mia gave books and flowers to her two friends, Chen and Sam: books to Chen, and books and flowers to Sam. Which of these sentences are true, with the stressed word in capitals?

1. *Mia only gave BOOKS to Chen.*
2. *Mia only gave books to CHEN.*
3. *Mia only gave books to SAM.*
4. *Mia only gave FLOWERS to Sam.*
::: solution
*Only* says that the focused element is the only one of its kind for which the sentence is true (Mats Rooth's analysis of focus, 1985).

1. **True**: of the things Mia gave Chen, books were the only kind.
2. **False**: Chen was not the only person she gave books to; Sam received books too.
3. **False**: Sam was not the only one either.
4. **False**: she gave Sam books as well as flowers.

The words of 1 and 2 are identical; only the position of the stress differs, and one is true while the other is false. Focus is therefore not only a matter of emphasis: with *only* it is part of the truth conditions. In writing, where there is no stress, place *only* next to what it modifies — *Mia gave books only to Chen* — to remove the ambiguity.
:::
:::

## Texts: cohesion and coherence

::: definition Cohesion and coherence {#def-cohesion}
**Cohesion** is the set of linguistic links that tie sentences of a text together: in Halliday and Hasan's *Cohesion in English* (1976), **reference** (*she*, *this*, *the*), **substitution** (*one*, *do so*), **ellipsis** (*I can't, but Sam can*), **conjunction** (*however*, *so*, *then*) and **lexical cohesion** (repetition, synonyms, hyponyms, collocations). **Coherence** is the property of a text making sense as a whole: its sentences are connected by relations of meaning — cause, contrast, elaboration, sequence — which the reader can infer, whether or not they are marked by cohesive devices. [[sentences-and-paragraphs/coherence#def-coherence]] introduced the practical distinction.
:::

Cohesion is neither necessary nor sufficient for coherence. *The lift is out of order. Use the stairs.* has no cohesive tie between the sentences, yet it is perfectly coherent: the reader infers a relation of cause. Conversely, *I bought a bicycle. Bicycles have two wheels. Wheels are round. The Earth is round too.* is full of lexical cohesion and makes no sense as a text. Theories of coherence, such as Jerry Hobbs's (1979) or Rhetorical Structure Theory (William Mann and Sandra Thompson, 1988), describe a small set of **coherence relations** that readers infer between parts of a text, of which cohesive devices are only signals.

::: example Analysing cohesion {#ex-cohesion}
Identify the cohesive devices in this paragraph, written for this lesson, and say what coherence relation links the last sentence to the rest.

*The city introduced a congestion charge in 2019. Since then, traffic in the centre has fallen by about a fifth, according to the council. Not everyone is pleased, however. Shopkeepers say that fewer customers come by car, and some have closed.*

(The city and its figures are invented for the exercise.)
::: solution
1. **Reference**: *then* (in *since then*) points back to *2019*; *the centre* and *the council* are definite because the city is already given; *some* (of the shopkeepers) relies on the previous noun.
2. **Conjunction**: *however* marks contrast between sentences 2 and 3.
3. **Lexical cohesion**: *city* – *centre* – *council* (a field of local government); *traffic* – *by car*; *congestion charge* – *pleased* (an evaluation of the charge); *shopkeepers* – *customers* (related roles).
4. **Ellipsis**: *some have closed* = *some shops have closed*; *Not everyone is pleased* = *not everyone is pleased [with the charge]*.
5. **Coherence**: sentence 4 **elaborates** sentence 3 — it gives evidence for *Not everyone is pleased*; within sentence 4, the second clause (*some have closed*) is a **result** of the first. These relations are not marked by connectives; the reader infers them.
:::
:::

## Conversation

Conversation is the basic form of language use, and it has an organisation of its own, studied in detail by **conversation analysis** (CA), founded by the sociologists Harvey Sacks, Emanuel Schegloff and Gail Jefferson in the 1960s and 1970s from recordings of real talk.

::: theorem The organisation of conversation {#rule-conversation}
1. **Turn-taking.** In ordinary conversation, overwhelmingly one person speaks at a time, and the change of speaker happens at **transition-relevance places** — points where a turn could be complete in grammar, intonation and action. Sacks, Schegloff and Jefferson (1974) set out the rules: the current speaker may select the next (by addressing them), otherwise any participant may start, otherwise the current speaker may continue.
2. **Adjacency pairs.** Many turns come in pairs of types — question–answer, greeting–greeting, invitation–acceptance/refusal, offer–acceptance/refusal, assessment–agreement/disagreement — in which the first part makes a particular second part expected next.
3. **Preference organisation.** The possible second parts are not equal. **Preferred** responses (accepting an invitation, agreeing with an assessment) are usually immediate, short and direct. **Dispreferred** responses (refusing, disagreeing) are usually delayed, prefaced (*well*, *uh*), softened, accompanied by an account or reason, and often not stated outright. "Preferred" is a structural term describing these forms, not a claim about what the speaker wants (Anita Pomerantz 1984; Levinson 1983).
4. **Repair.** Speakers fix problems of speaking, hearing and understanding in an organised way; there is a strong preference for the speaker to repair their own trouble rather than be corrected by others (Schegloff, Jefferson and Sacks 1977).
:::

::: proof
These findings rest on close analysis of thousands of recorded conversations, transcribed with a system developed by Gail Jefferson that shows pauses, overlaps and stress. Their generality has been tested across languages. Stivers and colleagues (2009) measured the gap between questions and answers in ten languages from five continents, among them Japanese, Danish and the Mayan language Tzeltal, and found the same tendency everywhere to avoid both overlap and long silence, with most answers beginning within a fraction of a second, and only modest differences between languages in average gap. They also found that, in all ten, answers that agreed or confirmed came faster than those that did not — the timing side of preference organisation. Rule 3 explains Tom's reply at the start of this chapter: everything about it is the shape of a dispreferred second, so Zhou Min hears a refusal before it is stated.
:::

::: widget graph
title: First parts and their seconds
nodes: invitation@-6,4; offer@-2,4; assessment@2,4; request@6,4; accept@-7,1; refuse@-5,1; accept offer@-3,1; decline offer@-1,1; agree@1,1; disagree@3,1; grant@5,1; refuse request@7,1
edges: invitation>accept; invitation>refuse; offer>accept offer; offer>decline offer; assessment>agree; assessment>disagree; request>grant; request>refuse request
caption: Four common first pair parts and their possible second parts. In each pair the left response is structurally **preferred** — typically immediate and plain (*I'd love to!*) — and the right one **dispreferred**, typically delayed and softened, with a reason (*Well … I'd love to, but I've got a lot on this week*). With self-deprecating assessments the pattern reverses: after *I'm hopeless at this*, agreement is the dispreferred response (Pomerantz 1984). Drag the nodes to add other pairs, such as *compliment* and its responses.
:::

::: example A dispreferred response {#ex-dispreferred}
Here is an exchange written for this lesson, in a simplified CA transcription: (0.8) is a pause in seconds, and *.hh* an in-breath.

> **Li Na:** *D'you want to come and see the new flat on Saturday?*
> **Ruth:** (0.8) *.hh oh that's really kind (.) um (.) I'd love to but my parents are visiting this weekend.*
> **Li Na:** *Oh no worries, another time.*

Identify the features of Ruth's turn that mark it as dispreferred, and explain how Li Na shows that she has understood.
::: solution
1. **Delay**: a pause of almost a second before Ruth starts, and further short pauses (.) inside the turn.
2. **Preface**: an in-breath and *oh*, then appreciation of the invitation (*that's really kind*) before any answer.
3. **Hesitation**: *um*.
4. **Token acceptance**: *I'd love to*, which expresses willingness before the refusal.
5. **Account**: a reason that is outside Ruth's control (*my parents are visiting*), which protects both speakers' face.
6. **No explicit *no***: the refusal itself is never stated; it is inferred from *but* and the account.

Li Na shows understanding by responding to the refusal that was never said (*no worries*) and by proposing a future occasion (*another time*), which treats the refusal as an obstacle rather than a rejection. [[pragmatics/requests-refusals#rule-refusal]] gives practical advice on refusals in English.
:::
:::

::: quiz
Which response to *What a beautiful day!* is structurally **dispreferred**?
- [ ] *Isn't it gorgeous!*
- [x] *Mm … bit cold, though, isn't it?*
- [ ] *Yes, lovely.*
- [ ] *Absolutely beautiful.*
::: solution
An assessment prefers agreement. The second response disagrees, and has the typical shape of a dispreferred turn: a delay (*Mm …*), a weak token of agreement, and a softened disagreement with *though* and a tag question. The other three agree, promptly and directly.
:::
:::

::: quiz
In *Lin hasn't stopped smoking*, what is the status of ‘Lin used to smoke’?
- [ ] an entailment that disappears under negation
- [x] a presupposition, triggered by *stop*, which survives negation
- [ ] a conversational implicature
- [ ] it is not implied
::: solution
*Stop* is a change-of-state verb that presupposes the earlier state. The presupposition survives negation: whether or not Lin has stopped, the sentence takes it for granted that she used to smoke.
:::
:::

::: note English and Chinese
Mandarin discourse relies much more than English on **zero anaphora**: once a topic is established, it can be left unexpressed in several following clauses. Li and Thompson (1979) showed that a topic introduced at the start of a stretch of discourse is typically followed by a chain of clauses with no pronoun, a "topic chain", and that a pronoun reappears mainly at a break in the discourse: 老王是我的邻居，∅ 每天早上六点起床，∅ 跑步半小时，∅ 然后去上班 ‘Old Wang is my neighbour; (he) gets up at six every morning, (he) runs for half an hour, and then (he) goes to work’. English requires a subject in every finite clause and uses pronouns for the same chains (*He gets up …, he runs …*), or coordination with a shared subject (*gets up at six, runs for half an hour and then goes to work*). Learners who transfer the Mandarin pattern produce subjectless clauses (✗ *My neighbour is Old Wang. Gets up at six every morning.*), which [[core-grammar/sentence-patterns#rule-subject]] corrects.

Mandarin also uses **sentence-final particles** for work that English does with intonation, tags and discourse markers: 吧 for suggestion or seeking agreement (我们走吧 ‘let's go’; 你是学生吧? ‘you're a student, aren't you?’), 呢 in follow-up questions and for continuing states, 啊 and 嘛 for various attitudes. English equivalents are spread across tag questions (*aren't you?*), markers such as *well*, *so*, *you know*, *I mean* — whose functions Deborah Schiffrin analysed in *Discourse Markers* (1987) — and intonation. There is rarely a one-word translation; learners do better to notice what each English marker does in a conversation.
:::

::: history
Pragmatics grew out of philosophy. The term was used in Charles Morris's division of the study of signs (1938) into syntax, semantics and pragmatics. In Oxford in the 1950s, J. L. Austin's lectures, published as *How to Do Things with Words* (1962), introduced speech acts, and H. P. Grice's William James Lectures at Harvard (1967; published in part as "Logic and conversation", 1975) introduced implicature. The study of presupposition goes back to Frege (1892) and to the debate between Bertrand Russell ("On denoting", 1905) and P. F. Strawson ("On referring", 1950) about sentences like *The king of France is bald*. Conversation analysis began in California in the 1960s with Harvey Sacks's lectures, and the 1974 paper on turn-taking became one of the most cited in the social sciences. Text linguistics and discourse analysis developed in Europe and in Halliday's school; Levinson's *Pragmatics* (1983) brought these strands together into the textbook form still used.
:::

## Where this leads

Practical pragmatics is the subject of the *Pragmatics* course: [[pragmatics/meaning-beyond-words]], [[pragmatics/speech-acts]], [[pragmatics/politeness-face]], [[pragmatics/requests-refusals]] and [[pragmatics/directness-across-cultures]]. Conversation in practice is in [[listening-and-conversation/turn-taking]]; cohesion and coherence in writing in [[sentences-and-paragraphs/coherence]] and [[style-and-rhetoric/cohesion-emphasis]]. Focus and intonation are in [[connected-speech/sentence-stress]] and [[connected-speech/intonation-meaning]]. How large collections of texts and conversations are studied with computers is the subject of the next chapter, [[linguistics/corpus-linguistics]].

::: summary
- **Pragmatics** studies speaker meaning in context; **discourse analysis** studies texts and conversations.
- **Deixis** (person, place, time, discourse, social) depends on the context of utterance and its deictic centre; English lost its T/V pronoun distinction, Mandarin keeps 您.
- **Presuppositions** are taken for granted; they survive negation, questions, modals and conditionals, have triggers (definites, factives, change-of-state verbs, *again*, clefts) and can be **accommodated**.
- **Conversational implicatures** (particularised or generalised, including **scalar**) are cancellable, calculable and non-detachable; **conventional implicatures** (*but*, *even*) are not cancellable but are not truth conditions.
- **Information structure** separates given from new and topic from **focus**; with *only*, focus changes truth conditions.
- **Cohesion** (reference, substitution, ellipsis, conjunction, lexical) signals **coherence**, which is inferred and can exist without it.
- Conversation has **turn-taking**, **adjacency pairs**, **preference organisation** (dispreferred seconds are delayed, softened and accounted for) and organised **repair**.
- Mandarin discourse uses **zero anaphora** in topic chains and **sentence-final particles**; English needs subjects and uses tags, markers and intonation.
:::

## Exercises

::: exercise Kinds of deixis {level=1}
Name the kind of deixis in each word in bold.

1. *Can you bring it **here**?*
2. ***Yesterday** was the deadline.*
3. *As mentioned **above**, the sample was small.*
4. *Excuse me, **sir**.*
5. ***We** have decided to offer you the job.*
::: solution
1. Place (*here*; also *bring*, motion towards the deictic centre). 2. Time. 3. Discourse. 4. Social. 5. Person (exclusive *we*: the speaker's side, not the hearer).
:::
:::

::: exercise Name the trigger {level=1}
Give the presupposition and its trigger.

1. *Kim forgot to lock the door again.*
2. *What surprised me was the price.*
3. *Since Ana left, the office has been quiet.*
::: solution
1. Kim had forgotten to lock the door before (*again*, iterative); also, Kim was supposed to or intended to lock it (*forget to*, an implicative verb).
2. Something surprised me (*wh*-cleft).
3. Ana left (temporal clause with *since*).
:::
:::

::: exercise Preferred or dispreferred? {level=1}
Mark each response P (preferred) or D (dispreferred) and give the features that show it.

1. *Want a lift?* — *Oh, yes please!*
2. *Could you lend me your notes?* — *Erm … the thing is, I haven't really finished them.*
3. *This essay's rubbish, isn't it?* (about the speaker's own essay) — *No, it's really good!*
::: solution
1. P: immediate, short, direct.
2. D: delay (*Erm …*), preface (*the thing is*), account, no explicit *no*.
3. P: after a self-deprecating assessment, disagreement is the preferred response — and it is immediate and direct.
:::
:::

::: exercise Entailment, presupposition, implicature {level=2}
For each pair, say what kind of inference B is from A, with the test.

1. A: *The talk was quite interesting.* B: *The talk was not very interesting.*
2. A: *Hu Jun knows that the deadline has passed.* B: *The deadline has passed.*
3. A: *Hu Jun is tall but good at gymnastics.* B: *Tall people are not usually good at gymnastics.*
4. A: *Every member voted.* B: *Some member voted.*
::: solution
1. Conversational implicature (scale ⟨*interesting*, *very interesting*⟩; also the British use of *quite* as a downtoner); cancellable: *quite interesting — in fact very interesting*.
2. Presupposition (factive *know*); survives negation: *Hu Jun doesn't know that the deadline has passed*.
3. Conventional implicature of *but*: not cancellable, not part of truth conditions.
4. Entailment, assuming there are members ([[linguistics/semantics#ex-entailment]]).
:::
:::

::: exercise Focus with *only* and *even* {level=2}
Lin passed maths and physics; Sam passed only maths. Which are true?

1. *Only LIN passed physics.*
2. *Lin only passed PHYSICS.*
3. *Even SAM passed maths.*
::: solution
1. True: Lin is the only person who passed physics.
2. False: Lin did not pass only physics; she passed maths too.
3. True as to truth conditions (Sam passed maths); the conventional implicature of *even* — that Sam was the least likely to pass — is an extra meaning that may or may not be appropriate.
:::
:::

::: exercise Cohesion in your own text {level=2}
Write a paragraph of four or five sentences on a topic of your choice. Then list its cohesive devices under Halliday and Hasan's five headings and name the coherence relation between each pair of sentences.
::: solution
Answers will vary. A good answer has at least one device of most kinds (a pronoun or *the*, a conjunction, an ellipsis or substitution, repeated or related words) and names relations such as cause, result, contrast, elaboration, example and sequence. It should notice at least one relation that is inferred without a cohesive signal.
:::
:::

::: exercise A loaded interview question {level=3}
A journalist asks a researcher: *When did you realise that your experiment had failed?* Explain, with the terms of this chapter, why the question is difficult to answer, and write a reply of two or three sentences that rejects its presupposition politely.
::: solution
The question has two presupposition triggers: the factive verb *realise*, which presupposes that the experiment failed, and the *when*-question, which presupposes that the realisation happened at some time. Any direct answer (*Last March*) accepts both. Because presuppositions survive in questions, the hearer has to challenge the background, not answer the question — an awkward, dispreferred move.

A model reply: *I'd put it a little differently. The experiment didn't fail — it gave a result we didn't expect, and we've spent the last few months working out what it means.* (The reply prefaces the disagreement, reframes rather than contradicts bluntly, and gives an account, the typical shape of a dispreferred second.)
:::
:::

::: exercise Topic chains in translation {level=3}
Translate this Mandarin passage into natural English and explain in 80–120 words what you did with the zero anaphora and why: 我妹妹去年大学毕业了，现在在一家医院工作，每天很忙，但是很喜欢这份工作。
::: solution
A model translation: *My younger sister graduated from university last year. She now works in a hospital and is very busy every day, but she loves the job.*

Explanation (model): *The Mandarin passage introduces the topic 我妹妹 once and then omits it in three further clauses, a typical topic chain. English needs a subject for every finite clause, so the topic has to be expressed either with a pronoun (*She now works …*) or with coordinated verb phrases that share one subject (*works in a hospital and is very busy*). I started a new sentence at* She now works *because the time shifts from last year to now, and coordinated the next clauses under one* she*. A literal version without subjects (✗* … last year. Now works in a hospital*) would be ungrammatical in written English.*
:::
:::
