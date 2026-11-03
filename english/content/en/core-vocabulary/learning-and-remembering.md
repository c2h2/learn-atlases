On Monday evening, Liu Yang learns thirty new words from a list. He reads the list again and again until he can say every meaning. He feels sure he knows them. On Friday, his teacher gives a short test, and he remembers only nine.

Every learner knows this experience. It does not mean that Liu Yang has a bad memory. It means that the way he studied — reading a list many times in one evening — is one of the least effective ways to keep words. Research on memory, from the 1880s to today, shows clearly what helps: **testing yourself** instead of rereading, and **spreading your practice** over days and weeks instead of doing it all at once. This chapter explains why we forget, what helps words stay, how to make and use word cards, and how to build a daily routine. No method makes words stay without effort, and no single routine suits everyone; but some kinds of effort pay much better than others.

## Why we forget

::: definition Forgetting curve {#def-forgetting-curve}
A **forgetting curve** is a graph that shows how much of something learned is still remembered as time passes. Forgetting is fastest soon after learning and then slows down.
:::

The first careful measurements of forgetting were made by the German psychologist Hermann Ebbinghaus, who published them in *Über das Gedächtnis* (*On Memory*, 1885). He learned lists of nonsense syllables (such as *DAX* and *BOK*), waited for different times, and measured how much time he **saved** when he learned the same list again. His results:

| time after learning | savings (time saved in relearning) |
|---|---|
| 20 minutes | about 58% |
| 1 hour | about 44% |
| 1 day | about 34% |
| 6 days | about 25% |
| 31 days | about 21% |

Most of the loss happens in the first hours and the first day; after that, forgetting is much slower. Ebbinghaus tested only himself, but his main result has been found again and again. In 2015, Jaap Murre and Joeri Dros repeated his experiment carefully and found a very similar curve.

::: example Reading Ebbinghaus's table {#ex-ebbinghaus}
What does "34% savings after one day" mean? If learning a list took 20 minutes, about how long would relearning it take after one day, and after 31 days?
::: solution
Savings measure how much **less** time relearning needs than first learning. 34% savings after one day means that relearning took about 34% less time — about 66% of the original time.

- After 1 day: 66% of 20 minutes ≈ **13 minutes**.
- After 31 days: savings are about 21%, so relearning takes about 79% of 20 minutes ≈ **16 minutes**.

Two lessons: first, something is still left even after a month (relearning is faster than learning from zero); second, most of what is lost is lost in the first day. That is why a first review soon after learning is so useful.
:::
:::

## Testing yourself: retrieval practice

::: definition Retrieval practice {#def-retrieval}
**Retrieval practice** (提取练习) means trying to bring something back from memory — for example, looking at a Chinese meaning and trying to recall the English word — instead of looking at the answer again. It is also called the **testing effect**, because a test is a kind of retrieval.
:::

::: theorem Retrieving is better than rereading {#rule-retrieval}
Trying to recall a word from memory, and then checking the answer, makes it stay in memory longer than reading the word and its meaning again for the same time. The effort of recalling is part of what makes the memory stronger, even when the first attempt fails.
:::

::: proof
Many experiments show this. Henry Roediger and Jeffrey Karpicke (2006) found that students who were tested on a text remembered more of it a week later than students who spent the same time reading it again — although the readers had felt more confident. Karpicke and Roediger (2008) taught students foreign-language word pairs; words that students kept practising by recalling them were remembered much better a week later than words they only kept studying. Each successful retrieval makes the route to the word easier to find next time. Rereading, by contrast, makes a word look familiar, and that feeling of familiarity is easily mistaken for knowing it. Karpicke, Butler and Roediger (2009) found that most students choose rereading when they study on their own.
:::

::: warning "I read the list ten times, so I know it"
Reading a list again and again feels like learning, because the words become familiar. But familiarity is receptive and short-lived ([[core-vocabulary/knowing-a-word]]). The test of knowing a word is whether you can bring it back **without looking**. Cover the English, look at the meaning, and say or write the word; then check. The words you could not recall are the ones to practise.
:::

::: quiz
Which of these is retrieval practice?
- [ ] reading a word list aloud three times
- [ ] copying new words into a notebook
- [x] covering the English words and trying to write them from the Chinese meanings
- [ ] highlighting new words in a text
::: solution
Only the third task makes you bring the word back from memory. The others can be done while looking at the word. (Copying and highlighting can help you notice words, but they are not retrieval.)
:::
:::

## Spacing

::: definition Spaced and massed practice {#def-spacing}
**Massed practice** means studying something many times in one session (Liu Yang's Monday evening). **Spaced practice** (also called **distributed practice**) means spreading the same amount of study over several sessions with gaps between them. A system of reviews at growing intervals is often called **spaced repetition** (间隔重复).
:::

::: theorem Spread your reviews over time {#rule-spacing}
For the same total study time, reviews spread over several days are remembered much longer than the same reviews done in one session. The longer you need to remember something, the longer the gaps between reviews should become.
:::

::: proof
This **spacing effect** is one of the best-supported findings in the study of memory. Nicholas Cepeda and colleagues (2006) reviewed several hundred experiments on spaced and massed practice and found a clear advantage for spacing. In a later large study (Cepeda et al. 2008), the best gap between two study sessions grew with the time until the final test: short gaps were best for a test a few days later, longer gaps for a test months later. One explanation is that a review after a gap needs more effort to retrieve, and effortful retrieval strengthens memory ([[#rule-retrieval]]); another is that reviews on different days link the word to more different contexts. For words, the practical result is: review soon after learning, then again after longer and longer gaps.
:::

::: widget plot
f: 100*exp(-x/s); if(x<1, 100*exp(-x/s), if(x<3, 100*exp(-(x-1)/(2*s)), if(x<7, 100*exp(-(x-3)/(4*s)), 100*exp(-(x-7)/(8*s)))))
x: 0, 30
y: 0, 100
sliders: s=2:0.5:6:0.5
vlines: 1; 3; 7
labels: no review; reviews on days 1, 3 and 7
caption: A simple **model**, not data: the chance of recalling a word (in %) over 30 days. Without review (blue) it falls quickly. In the orange curve the word is reviewed on days 1, 3 and 7 (the dotted lines); in this model each successful review brings recall back to 100% and makes forgetting twice as slow. The slider *s* sets how slowly a word is forgotten at first (harder words have a smaller *s*). Real memory is more complicated, but the shape — fast early forgetting, and slower forgetting after each spaced review — follows the findings of Ebbinghaus (1885) and of spacing research (Cepeda et al. 2006).
:::

::: example Planning reviews {#ex-plan-reviews}
On Monday, Liu Yang learns 20 new words with word cards. He has 15 minutes for vocabulary every day. Make a review plan for the next two weeks that follows [[#rule-spacing]].
::: solution
A plan with growing gaps:

| day | what he does |
|---|---|
| Monday (day 0) | learn the 20 words with cards: look, recall, check |
| Tuesday (day 1) | first review: go through all 20 cards from memory |
| Thursday (day 3) | second review; put the cards he recalled easily in a "later" pile |
| Monday (day 7) | third review of all 20; the hard ones again at the end |
| Monday (day 14) | fourth review; easy cards go to a monthly pile |

On the other days he learns new words and reviews those. Each review takes only a few minutes, because he is recalling, not relearning. The gaps (1, 2, 4, 7 days) grow, as the rule says. The exact days do not matter much; what matters is that the first review comes soon and the gaps then get longer.
:::
:::

## Word cards

Word cards (flash cards) are an old and simple tool, and research supports them when they are used with retrieval and spacing. Paul Nation (2013) gives detailed advice on using them; the rule below follows it.

::: theorem How to use word cards {#rule-word-cards}
1. Put the English word (and its pronunciation) on one side and the meaning — a Chinese translation is fine — on the other, with a short example or collocation.
2. **Recall before you turn**: look at one side, say or write the other, then check.
3. Practise in both directions: from English to meaning (for understanding) and from meaning to English (for use).
4. Keep a pack small enough to go through in a few minutes, and **change the order** each time so that you do not learn the sequence.
5. Move cards you know well to a pile for later review, and keep hard cards in the daily pile.
6. For a very hard word, make a memory link — an image, a sentence, a sound link ([[#ex-keyword]]) — and then use the word in a real sentence.
:::

::: proof
Steps 2 and 5 put retrieval practice and spacing into the cards: every look at a card is a small test, and easy cards come back less often than hard ones. Step 3 matters because receptive and productive knowledge are different ([[core-vocabulary/knowing-a-word]]): recalling the meaning of *afraid* does not train you to produce *afraid* when you need it. Step 4 avoids learning the position of a word in the pack instead of the word. A card system with boxes for "new", "known" and "well known" — cards move forward when you know them and go back to the first box when you do not — was described by the German writer Sebastian Leitner in 1972; many paper and computer systems use the same idea. Step 6 uses the fact that a memory with more links is easier to find.
:::

::: example Making a good word card {#ex-word-card}
Wang Fang meets *afraid* in a story: *The little boy was afraid of the dark.* Make a word card for it.
::: solution
**Front:**

*afraid* /əˈfreɪd/ — adjective

**Back:**

害怕的 — *afraid of something*: *She's afraid of dogs.* Also *I'm afraid …* = a polite way to give bad news: *I'm afraid I can't come.*（恐怕我来不了。）

Notes on the card: the pattern *afraid of* (not ✗ *afraid with*); *afraid* is not used before a noun (✗ *an afraid boy*; say *a frightened boy* or *a scared boy*); a second, very common use in polite speech. When she practises, she looks at the front and tries to say the meaning and the pattern; then she looks at the back and tries to say *afraid of* + a noun.
:::
:::

::: example A memory link for a hard word {#ex-keyword}
Chen Yu keeps forgetting *candle* /ˈkændl/ ‘蜡烛’. How can a sound link help?
::: solution
The **keyword method** (Atkinson and Raugh 1975) links the sound of a new word to a word you know, and then links both to an image.

1. Find a familiar word that sounds similar: *candle* /ˈkændl/ sounds a little like 看到 (kàndào).
2. Make an image that joins the sound and the meaning: in a dark room you can only **看到** things when you light a *candle*.
3. Use the word: *We lit a candle when the lights went out.*

The link is only a bridge. It helps the first few times; after that, meeting and using the word make it stay, and the bridge is forgotten. The method works well for some words and some learners, especially for concrete nouns; for words like *however* or *although*, example sentences work better.
:::
:::

## Meeting words again

Cards are good for the first step: connecting a form and a meaning. But knowing a word well — its collocations, its grammar, its register — needs many meetings in real language. Paul Nation describes a balanced language course as four "strands" of roughly equal size: learning from **meaning-focused input** (reading and listening), learning through **meaning-focused output** (speaking and writing), **language-focused learning** (deliberate study, such as word cards and dictionary work), and **fluency development** (using what you know quickly and easily) (Nation 2007). Word cards belong to the third strand. Without the other three, words learned from cards stay thin and unused.

::: note English and Chinese
Many Chinese learners grew up with 背单词: memorising word lists, often in alphabetical order, and practising with 默写 (writing words from dictation or from the Chinese meaning). Part of this is very good practice: 默写 is retrieval, and repeated review lists are a kind of spacing. Two parts work less well. Alphabetical lists put words with similar forms next to each other (*adapt*, *adopt*, *adept*), which makes them easier to confuse ([[core-vocabulary/everyday-topics]], on interference). And a word with one Chinese meaning on a list has form and meaning but no use. Keep the strengths — recall from memory, many reviews — and add example sentences, collocations, and meetings with the word in reading and listening.
:::

::: application A daily routine
A sample routine of about 20–30 minutes — adapt it to your time and level:

1. **5 minutes — review**: today's pile of cards due for review, from memory, in mixed order.
2. **5 minutes — new words**: 5–10 new high-frequency words ([[core-vocabulary/frequency-and-coverage]]) or words you met this week and want to use. Make cards with an example each ([[core-vocabulary/using-a-dictionary]]).
3. **10–15 minutes — meaning-focused reading or listening** at a comfortable level (a graded reader, a podcast for learners), where yesterday's words may appear again ([[reading-skills/extensive-reading]]).
4. **2 minutes — use**: say or write two sentences with today's words.

The numbers are examples, not targets. Research supports the principles — retrieval, spacing, many meetings — not any particular number of words a day.
:::

::: history
Hermann Ebbinghaus published the first experimental study of memory, *Über das Gedächtnis*, in 1885; it described both the forgetting curve and the benefit of spreading practice over days. In 1967 the American language teacher Paul Pimsleur proposed a "memory schedule" of graduated intervals for recalling new words, each interval several times longer than the last. In 1972 the German science writer Sebastian Leitner described his card-box system for spaced review. In 1975 Richard Atkinson and Michael Raugh tested the keyword method with learners of Russian vocabulary. In the 2000s, large studies and reviews — Cepeda et al. (2006, 2008) on spacing and Roediger and Karpicke (2006) on retrieval — made these findings among the best established in the study of learning.
:::

## Where this leads

The words worth putting on cards are explained in [[core-vocabulary/frequency-and-coverage]]; how to find their use in [[core-vocabulary/using-a-dictionary]]; and why chunks are worth learning as wholes in [[core-vocabulary/phrases-and-chunks]]. Meeting words again in reading is the subject of [[reading-skills/extensive-reading]], and in listening of [[listening-and-conversation/learning-from-media]]. The course *Word Formation* ends with ways to use word parts in learning: [[word-formation/learning-with-word-formation]].

::: summary
- Forgetting is fastest soon after learning and then slows down (Ebbinghaus 1885; replicated by Murre & Dros 2015).
- **Retrieval practice** — recalling a word from memory and then checking — keeps words longer than rereading (Roediger & Karpicke 2006; Karpicke & Roediger 2008). Familiarity is not the same as knowing.
- **Spaced practice** beats massed practice for the same total time; the longer you need to remember, the longer the gaps should become (Cepeda et al. 2006, 2008).
- Use **word cards** with retrieval in both directions, small packs, mixed order and growing review intervals; add an example or collocation to each card.
- A memory link such as the **keyword method** can help with hard concrete words; use the word in a sentence afterwards.
- Cards are one strand of four: words also need many meetings in reading and listening, and use in speaking and writing.
:::

## Exercises

::: exercise True or false? {level=1}
Say whether each statement is true or false according to this chapter.

1. Most forgetting happens in the first day after learning.
2. Reading a list many times is the best way to remember it.
3. For the same total time, three short sessions on different days are better than one long session.
4. A failed attempt to recall a word is a waste of time.
5. Word cards should always be practised in the same order.
::: solution
1. True (Ebbinghaus's table).
2. False — retrieval practice works better.
3. True — the spacing effect.
4. False — trying to recall strengthens memory even when you fail, especially if you then check the answer.
5. False — change the order so that you do not learn the sequence.
:::
:::

::: exercise Retrieval or not? {level=1}
Which of these activities are retrieval practice?

1. Looking at a picture of a kitchen and naming the things in it in English.
2. Reading the new words in a textbook chapter.
3. Writing the English words while a friend reads the Chinese meanings.
4. Listening to a list of words with their meanings.
5. Telling a friend about your day using this week's new words.
::: solution
Retrieval: 1, 3 and 5 — in each one you bring the words out of your memory. Not retrieval: 2 and 4 — you receive the words while you see or hear them.
:::
:::

::: exercise Front and back {level=1}
Make a word card for *borrow* following [[#rule-word-cards]]: what goes on each side?
::: solution
- **Front:** *borrow* /ˈbɒrəʊ/ (GB), /ˈbɑːroʊ/ (GA) — verb.
- **Back:** 借（进来）— *borrow something from someone*: *Can I borrow your pen?* Compare *lend* (借出).

Practise both ways: from *borrow* to the meaning, and from 借（进来） to *borrow* with its pattern.
:::
:::

::: exercise The fourth review {level=2 check="15"}
Liu Yang learns a word on day 0 and reviews it first on day 1. After that, each gap between reviews is twice as long as the gap before. On which day is his fourth review?
::: solution
The gaps are 1, 2, 4 and 8 days. The reviews are on day 1, day 1 + 2 = 3, day 3 + 4 = 7, and day 7 + 8 = **15**.
:::
:::

::: exercise Reading the curve {level=2}
Use Ebbinghaus's table. (a) How much was saved after 1 hour? (b) Between which two times in the table is the loss of savings largest per hour? (c) Why does this suggest an early first review?
::: solution
(a) About 44%.

(b) Between 20 minutes and 1 hour: savings fell from about 58% to about 44% — 14 percentage points in 40 minutes. Between 1 day and 6 days, they fell only about 9 points in five days.

(c) Because forgetting is fastest at the start, a review on the same day or the next day catches the word before most of it is lost; after that, forgetting is slower, so later reviews can wait longer.
:::
:::

::: exercise Fix a study plan {level=2}
Zhou Min's plan: *Every Sunday I will learn 100 new words from an alphabetical list by reading it for two hours. I will not look at the list again until the next test.* Give three ways to make the plan better, each with a reason from this chapter.
::: solution
Possible improvements:

1. Spread the time over the week (for example 15–20 minutes a day) instead of two hours on one day — spacing ([[#rule-spacing]]).
2. Test herself instead of reading: cover the English and recall it — retrieval practice ([[#rule-retrieval]]).
3. Review on days 1, 3 and 7 after learning, not only at the test — the first review should come early ([[#ex-ebbinghaus]]).
4. Learn words chosen by frequency and need, in themes, not in alphabetical order — similar forms side by side are easily confused ([[core-vocabulary/everyday-topics]]).
5. Add an example sentence or collocation for each word, and meet the words in reading ([[core-vocabulary/knowing-a-word]]).

Any three with correct reasons are a good answer.
:::
:::

::: exercise Your own plan for two weeks {level=3}
Design a two-week vocabulary plan for yourself. Say how much time you have each day, which words you will learn (and why those), how you will review them (with days), and how you will meet and use them outside cards.
::: hint
Use the sample routine and [[#ex-plan-reviews]] as models, but fit them to your own time and goals.
:::
::: solution
Answers will differ. A good plan:

- is realistic for the time available (for example 20 minutes on weekdays, 40 at the weekend);
- chooses words by frequency and need (for example the words met in a graded reader, or the vocabulary of one topic from [[core-vocabulary/everyday-topics]]);
- includes recall, not only reading, and reviews with growing gaps (for example days 1, 3, 7 and 14);
- includes meaning-focused reading or listening and a little speaking or writing with the new words.
:::
:::

::: exercise Explain it to a classmate {level=3}
A classmate says: *Testing myself is stressful. I prefer to read my notes again — it's easier and I feel I learn more.* Write a short reply (80–100 words) in English that explains, kindly, why testing yourself works better, and suggests one easy way to start.
::: solution
A model reply:

*I understand — rereading feels easier. But that easy feeling can be misleading: the words look familiar, so you think you know them. Studies show that trying to remember a word, even when you fail, makes it stay longer than reading it again (Roediger and Karpicke 2006). You don't need a real test. Try this: cover the English side of your notes, look at the Chinese, and say the English words. Then check. Do it for five minutes a day, on different days. It's a bit harder, but you'll remember much more.*

A good answer mentions the feeling of familiarity, the benefit of retrieval (with or without the reference), and gives a simple, practical first step.
:::
:::

::: exercise A memory link {level=3}
Choose two English words you find hard to remember. For each, make a memory link (a sound link, an image or a short story) and then write a natural English sentence with the word. Say whether you think the link will help, and why.
::: solution
Answers will differ. A model:

- *ankle* /ˈæŋkl/ ‘脚踝’ — sound link: *ankle* sounds like *uncle*. Image: my uncle twisted his ankle while playing football. Sentence: *I hurt my ankle when I fell down the stairs.* The link should help, because the image is easy to picture.
- *despite* ‘尽管’ — a sound link is hard to find for a word like this, so instead I will learn a chunk: *despite the rain* — *We went out despite the rain.* For grammar words, example sentences work better than images.

A good answer includes a clear link, a natural sentence, and a short judgement that shows the method suits some words better than others.
:::
:::
