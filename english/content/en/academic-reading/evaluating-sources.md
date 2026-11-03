Wang Fang is writing an essay on whether background music helps students concentrate. In one afternoon she finds a popular science website that says *Research shows that listening to music while studying boosts concentration*; a 2019 research article reporting an experiment with 48 students, in which those who studied in silence remembered slightly more than those who studied with music; a survey of 3,000 students, most of whom said music helped them focus; and a review that concludes that the effect depends on the music, the task and the person. All four are about the same question, and they do not agree.

Choosing between them is not a matter of picking the one she likes, or the one most often repeated. It is a matter of asking of each: *What kind of evidence is this? How was it collected? Can it support the claim being made? And who is telling me, and why?* This chapter gives the questions and the reasons for them: kinds of evidence and what each can show, samples and their size and selection, correlation and causation, peer review and its limits, and a set of checks for judging a source. It assumes the analysis of claims in [[academic-reading/claims-and-evidence]]; the numbers themselves — percentages, averages, graphs — are read in [[academic-reading/reading-data]].

## Kinds of evidence

::: definition Kinds of evidence {#def-evidence-kinds}
The main kinds of evidence in academic texts are:

1. **anecdotes and cases**: single examples or detailed studies of one person, group, school or event (a **case study**);
2. **expert opinion**: the judgement of someone with knowledge of the field;
3. **observational studies**: researchers observe or measure without changing anything — **cross-sectional** studies (such as surveys) at one point in time, and **longitudinal** or **cohort** studies that follow the same people over time;
4. **experiments**: researchers change one thing (the **intervention**) and compare the outcome with a **control** or comparison group; in a **randomised controlled trial** (RCT) participants are assigned to groups by chance;
5. **systematic reviews** and **meta-analyses**: reviews that search for all the studies on a question by an explicit method and, in a meta-analysis, combine their results statistically;
6. **qualitative evidence**: interviews, observations and documents analysed for meanings, experiences and processes rather than numbers;
7. in the humanities, **textual and archival evidence**: the texts, records and objects that are being interpreted.
:::

No kind of evidence is best for every question. A case study can show that something is *possible* and how it works in detail; a survey can show how common something is; a longitudinal study can show what comes before what; an experiment can show what causes what; interviews can show why people act as they do and what it means to them. The question is always whether the kind of evidence fits the claim.

::: theorem Match the evidence to the claim {#rule-match}
1. A **claim of fact** about a population (*how many*, *how common*) needs a **large, representative sample** — usually a survey or official records.
2. A **causal claim** (*X causes Y*, *X improves Y*) is best supported by **experiments**, especially randomised ones, and by several consistent studies; observational evidence can support it only when other explanations have been ruled out.
3. A claim about **experience or meaning** (*how students feel about …*, *why teachers resist …*) is best supported by **qualitative** evidence.
4. A claim that something **can** happen needs only **one good case**; a claim that it **usually** happens needs many.
5. **Anecdotes** and **opinions** can illustrate or suggest a claim, but not establish a general one.
:::

::: proof
The rule follows from what each method can and cannot rule out. A survey of a representative sample can estimate how common something is, but when two things go together in a survey, it cannot show which causes which or whether a third thing causes both. Random assignment in an experiment makes the groups alike, on average, in everything except the intervention — including things the researchers did not think of — so a difference in outcome can be attributed to the intervention. That is why medicine ranks evidence for questions of treatment in a hierarchy with systematic reviews of randomised trials at the top. But the hierarchy is for causal questions about interventions; for other questions it does not apply, and a well-done interview study is better evidence about students' experiences than a trial. In the humanities, evidence is judged by other standards: whether the sources are authentic and relevant, and whether the interpretation accounts for them better than its rivals.
:::

::: example Which evidence fits which claim? {#ex-match}
Return to Wang Fang's four sources. For each, say what kind of evidence it is and what claim it can support.
::: solution
**The website** (*Research shows that …*): a secondary report with no study named. It is not evidence in itself; it may point to a study, which she should find and read. *Research shows* without a reference is a signal to check, not to cite.

**The experiment with 48 students**: an experiment. It can support a causal claim — in these conditions, music slightly reduced recall — but only for this task, this music and this kind of student, and the sample is small, so the estimate is imprecise.

**The survey of 3,000 students**: a cross-sectional survey of opinions. It supports a claim of fact: many students **believe** that music helps them. It does not show that music **does** help them; people are often poor judges of what improves their own performance.

**The review**: secondary evidence that combines many studies. If it is systematic, it is the strongest single source on the general question, and its conclusion — *it depends* — is itself a finding: there may be no single answer.

**For the essay:** the review frames the answer, the experiment is an example of the kind of study the review summarises, and the survey shows the gap between belief and evidence — an interesting point in itself.
:::
:::

::: quiz
A researcher wants to know whether a new reading programme **causes** better reading scores. Which design gives the strongest evidence?
- [ ] interviewing teachers about whether they like the programme
- [ ] comparing scores of schools that chose the programme with schools that did not
- [x] randomly assigning classes to the programme or to the usual teaching, and comparing scores
- [ ] asking pupils whether they think their reading has improved
::: solution
Random assignment makes the two groups alike on average, so a difference in scores can be attributed to the programme. Schools that *chose* the programme may differ from others (in resources or motivated staff, for example). Interviews and pupils' opinions are useful evidence about experience, but not about whether scores improved because of the programme.
:::
:::

## Samples

::: definition Sample, population and representativeness {#def-sample}
A **population** is the whole group a claim is about (*university students in China*, *all secondary schools in a region*). A **sample** is the part of the population that was actually studied. A sample is **representative** when it resembles the population in the ways that matter to the question. **Sampling error** is the chance difference between a sample and its population; **sampling bias** is a systematic difference caused by the way the sample was chosen.
:::

::: theorem Two questions about any sample {#rule-sample}
1. **How large is it?** Larger samples give more precise estimates: small samples vary a lot by chance, so a single small study can easily overstate or miss an effect.
2. **How was it chosen?** A sample chosen in a way that favours some kinds of people (volunteers, people who answer online surveys, one university, one country) can be biased in any direction, and **a larger sample does not remove bias** — it only makes a biased estimate more precise.

A claim is limited to the population the sample represents.
:::

::: proof
Chance variation shrinks as a sample grows, roughly in proportion to the square root of its size: four times as many people halves the typical error. The figure below shows this for the simplest case. Bias is different: it comes from the method, not from chance, and repeating the method with more people repeats the bias. The classic example is the American magazine *Literary Digest*, which in 1936 predicted that Alf Landon would defeat Franklin Roosevelt in the presidential election, on the basis of over two million returned ballots, drawn largely from lists of telephone and car owners and the magazine's readers. Roosevelt won by a landslide. The sample was enormous but unrepresentative, and the people who chose to reply differed from those who did not.
:::

::: widget distribution
title: How much can a sample vary by chance?
dist: binomial
params: n=20, p=0.5
a: 6
b: 14
normal: true
caption: Suppose exactly half of all students prefer studying in silence, and a researcher asks a random sample of *n* of them. The bars show how likely each count of "silence" answers is. With *n* = 20, about 96% of samples give between 6 and 14 — anywhere from 30% to 70%. Set *n* to 200 and move the shaded range to 86–114: about 95% of samples now fall between 43% and 57%. The illustration assumes a perfectly random sample; it says nothing about bias.
:::

::: example Judging a sample {#ex-sample}
A (fictional) article claims: *Chinese university students spend an average of 5.2 hours a day on their phones.* The methods section says that the data came from an online questionnaire posted on a social media account about study tips, which 1,850 students completed. What can and cannot be concluded?
::: solution
**Size.** 1,850 is large enough that chance error is small: if the sample were random, the average would be estimated fairly precisely.

**Selection.** The sample is not random. It consists of students who (a) follow a particular social media account, (b) saw the post, and (c) chose to answer. All three filters favour students who use their phones a lot — the method finds heavy users more easily than light users. The bias probably pushes the average **up**, and a larger sample would not fix it.

**Measurement.** Phone time was **self-reported**. People are often inaccurate about their own screen time, in either direction.

**Conclusion.** The article can say: *Among 1,850 students who answered an online survey posted on a study-tips account, the average self-reported phone use was 5.2 hours a day.* It cannot claim that this is the average for Chinese university students in general. A careful reader notes the population to which the figure applies before citing it.
:::
:::

::: warning "A big sample, so it must be right"
✗ *The survey had over 10,000 respondents, so its results represent the whole country.*

✓ *The survey was large, which reduces chance error; but it was an online survey that people chose to answer, so it may not represent people who are offline or less interested in the topic.*

Size answers one question (chance); selection answers another (bias). Readers often judge a study by the first because a big number is easy to see, while the selection is described in a paragraph of the methods they skip. Read that paragraph.
:::

## Correlation and causation

::: definition Correlation and causation {#def-correlation}
Two variables are **correlated** (相关) when they tend to change together: as one rises, the other tends to rise (positive correlation) or fall (negative correlation). One variable **causes** another when changing the first would change the second. Correlation is evidence that may be consistent with causation, but it does not establish it.
:::

::: theorem Three alternatives to "X causes Y" {#rule-causation}
When X and Y are correlated, consider before accepting that X causes Y:

1. **reverse causation**: Y causes X (*Do happy people read more, rather than reading making people happy?*);
2. **confounding**: a third variable Z causes both (*Family income may lead both to more books at home and to higher test scores*);
3. **chance**: the correlation appeared in this sample by accident, especially if the sample is small or many correlations were tested.

A causal claim is stronger when an experiment rules these out, or when several kinds of evidence point the same way.
:::

::: proof
Observational data show what goes together, not why. Reverse causation and confounding produce real correlations that do not reflect the causal claim; chance produces correlations that are not even real outside the sample. In a randomised experiment the researcher sets X, so Y cannot have caused it, and random assignment balances confounders on average. Where experiments are impossible or unethical — no one can assign people to smoke — causation is argued from a combination of evidence. Austin Bradford Hill (1965) listed points to consider, among them the strength of the association, its consistency across studies, whether the cause comes before the effect, whether more of the cause brings more of the effect, and whether there is a plausible mechanism. The case that smoking causes lung cancer was made in this way, from observational studies, and it was correct.
:::

::: widget graph
title: A confounder
nodes: Hot weather@6,4; Ice cream sales@0,0; Swimming accidents@12,0
edges: Hot weather>Ice cream sales; Hot weather>Swimming accidents; Ice cream sales-Swimming accidents
caption: Ice cream sales and swimming accidents rise and fall together through the year, so they are correlated (the line without an arrow). Neither causes the other: hot weather causes both (the arrows). A third variable that produces a correlation in this way is a confounder. You can drag the boxes.
:::

::: example Alternatives to a causal claim {#ex-confound}
A (fictional) news report says: *Students who use the library more get better degrees, a new study finds. Universities should encourage library use to raise standards.* Give one example each of reverse causation, confounding and chance that could explain the finding, and say what kind of study would test the claim.
::: solution
**Reverse causation:** students who are doing well, and expect a good degree, may become more engaged and use the library more — the good results come first.

**Confounding:** motivation, or having no paid job, could lead both to more library use and to better results. Subject could also confound: students of subjects that require library work may also receive higher average marks.

**Chance:** if the study tested dozens of student habits, one or two would be linked to degree results by chance alone.

**A better test:** an experiment is hard here, but a study could compare the same students before and after a change (for example, longer library opening hours) with a comparison group, or control statistically for motivation, subject and paid work. Even then, the policy claim (*should encourage library use*) needs evidence that encouragement would change use, and that the change would raise results.
:::
:::

::: quiz
A study finds that cities with more doctors per person have higher rates of diagnosed illness. What is the most likely explanation?
- [ ] doctors make people ill
- [x] more doctors means more illness is found and recorded
- [ ] ill people cause doctors to be born in those cities
- [ ] the correlation must be due to chance
::: solution
The measure is *diagnosed* illness: with more doctors, more cases are found and recorded, so the correlation may reflect how illness is measured rather than how much there is. Reverse causation is also possible in a sensible form: places with more illness may attract more doctors. Chance is possible but not the most likely explanation of a pattern across many cities.
:::
:::

## Peer review and its limits

::: definition Peer review {#def-peer-review}
**Peer review** (同行评审) is the process in which a journal or publisher sends a submitted text to experts in the field (the **reviewers** or **referees**), usually anonymously, who judge its quality and recommend acceptance, revision or rejection. A **preprint** is a version of a paper made public before peer review. A **retraction** is the formal withdrawal of a published paper, usually because of serious error or misconduct.
:::

Peer review is the main quality filter of academic publishing, and a peer-reviewed article in a reputable journal is generally more reliable than a report that has not been reviewed. But it is a filter, not a guarantee. Reviewers read the paper; they do not usually have the data or repeat the study. They can miss errors, they can disagree with each other, and they cannot detect well-hidden fraud. Some publishers — often called **predatory** journals — charge authors for publication while doing little or no real review. And in several fields, attempts to repeat published studies have succeeded less often than readers might expect: the Open Science Collaboration (2015) repeated 100 studies published in three psychology journals and found statistically significant results in about 36% of the replications, compared with 97% of the original studies.

The lesson is not that published research is untrustworthy, but that a **single** study is rarely the last word. A finding that has been repeated by different researchers, with different samples and methods, deserves much more confidence than one surprising result.

::: theorem Checking a source {#rule-check-source}
For any source, ask:

1. **Who?** Who wrote it, and what is their expertise in **this** question? Is the publisher or journal reputable and is the text peer-reviewed?
2. **When?** Is it recent enough, or has later work overtaken it? Has it been corrected or retracted?
3. **Why?** What is its purpose — to report research, to inform, to persuade, to sell? Who funded the research, and do the authors declare any **conflicts of interest**?
4. **How?** Are the methods described clearly enough to be judged? Is the evidence of a kind that fits the claim ([[#rule-match]])?
5. **How does it fit?** Do other studies and reviews agree? If it contradicts a body of evidence, is its evidence strong enough to do so?
6. **Is it primary?** If it reports someone else's research, go to the original.
:::

::: proof
The questions bring together what this chapter has discussed. *Who* and *why* are about trust: expertise in one field does not carry over to another, and a source with a reason to reach a particular conclusion needs closer checking (it is not therefore wrong). *When* matters because research moves, and a retracted paper may still circulate. *How* is the heart of the matter: a source that does not say how its evidence was obtained cannot be judged. *How does it fit* reflects the point about replication. The last question matters because claims tend to grow as they are retold: Sumner et al. (2014) found that exaggerations in health news stories — causal claims from correlational studies, advice to readers, claims about humans from animal studies — were strongly associated with exaggerations already present in the universities' own press releases. Checklists of this kind are widely taught; one well-known version, the CRAAP test (currency, relevance, authority, accuracy, purpose), was devised by the librarian Sarah Blakeslee. Studies of professional fact-checkers by Wineburg and McGrew found that they judge an unfamiliar website quickly by leaving it and reading what other sources say about it, which they called **lateral reading**.
:::

::: example Judging a source {#ex-source}
Apply [[#rule-check-source]] to this fictional source: *A 2023 report on a company website, "The science of focus", states that a study of 120 office workers found that the company's herbal drink improved concentration by 30%. The report names no journal, describes the study in one paragraph and links to no data.*
::: solution
**Who?** The company that sells the drink; no named authors, no peer review.

**When?** Recent, but there is no way to know whether the study has been published or examined by anyone else.

**Why?** To sell the product: a clear conflict of interest. This does not prove the claim false, but it means the claim needs independent support.

**How?** Unknown. Was there a control group? Were participants assigned at random? Did they know whether they were drinking the product (a **placebo** effect is likely when people expect to concentrate better)? How was concentration measured, and *30%* of what?

**How does it fit?** Look for independent, peer-reviewed studies of the ingredients; if none support the effect, the report stands alone.

**Is it primary?** No — it describes a study that cannot be read. **Verdict:** not citable as evidence. It could be cited only as an example of a marketing claim, with that description.
:::
:::

::: note English and Chinese
- **显著 and *significant*.** In statistics, *significant* means *statistically significant* (显著): unlikely to be due to chance alone, by a conventional test. It does **not** mean large or important (重要, 重大). A *significant but small difference* is not a contradiction. When an English article says *significant*, check whether it means the statistical sense; in a results section it almost always does ([[academic-reading/reading-data]]).
- **相关不等于因果.** The saying exists in Chinese as in English; the habit to build is noticing which verb a sentence uses. *is associated with*, *is linked to* and *correlates with* (与……相关) claim less than *causes*, *leads to* and *improves* (导致, 提高) — see [[academic-reading/dense-sentences#rule-relation]].
- **研究表明 and *research shows*.** Both phrases appear in news and advertising without any study named. In academic writing in either language a claim of this kind needs a citation, and a reader should treat it as unchecked until the study is found.
- **Judging Chinese-language sources.** The same questions apply to Chinese sources: is the journal peer-reviewed, who are the authors, how was the evidence collected? Indexes and lists such as the CSSCI or the Peking University core journals list (北大核心) are used in China as signs of a journal's standing, as citation indexes are elsewhere; they say something about the journal, not about the quality of each article in it.
:::

::: history
The modern habits of judging evidence took shape in the twentieth century. The failure of the *Literary Digest* poll in 1936, beside the success of smaller polls with better-chosen samples, taught survey researchers that how a sample is chosen matters more than its size. Randomised trials in medicine became established after the Second World War, and in 1965 the epidemiologist Austin Bradford Hill set out the considerations for judging whether an observed association is causal that are still taught today. From the 1990s systematic reviews, promoted by organisations such as the Cochrane Collaboration (founded in 1993), made the combination of evidence across studies a method in its own right. In 2005 John Ioannidis published the provocatively titled *Why Most Published Research Findings Are False*, arguing that small studies, small effects and flexible analyses make many published findings unreliable, and large replication projects in the 2010s, among them the Open Science Collaboration (2015) in psychology, tested published findings directly.
:::

## Where this leads

The numbers that evidence is reported in — averages, percentages, correlations, *p*-values — are read in [[academic-reading/reading-data]]. How strongly writers commit to claims, and how to read cautious claims, is the subject of [[academic-reading/stance-and-hedging]]. For writers, [[academic-writing/finding-sources]] covers searching for and choosing sources, and [[academic-writing/peer-review]] the review process from the inside.

::: summary
- Evidence comes in kinds — cases, opinion, observational studies, experiments, systematic reviews, qualitative and textual evidence — and each can support some claims and not others ([[#def-evidence-kinds]], [[#rule-match]]).
- Causal claims need evidence that rules out other explanations; randomised experiments do this best.
- Ask of every sample **how large** (chance) and **how chosen** (bias); a large biased sample is still biased ([[#rule-sample]]).
- **Correlation** may come from reverse causation, a confounder or chance ([[#rule-causation]]).
- **Peer review** filters but does not guarantee; single studies may not replicate, and consistent findings from several studies deserve more confidence.
- Check every source: who, when, why, how, how it fits, and whether it is primary ([[#rule-check-source]]).
:::

## Exercises

::: exercise Name the kind of evidence {level=1}
Name the kind of evidence. (a) *A study followed 5,000 children from birth to age 18.* (b) *Teachers were interviewed about their experience of online teaching.* (c) *Participants were randomly assigned to two groups; one received the training.* (d) *The authors combined the results of 32 trials.* (e) *A questionnaire was sent to 800 households in one month.*
::: solution
(a) longitudinal (cohort) study; (b) qualitative (interview) evidence; (c) randomised controlled experiment (RCT); (d) meta-analysis (part of a systematic review); (e) cross-sectional survey.
:::
:::

::: exercise Size or selection? {level=1}
Is the main problem the size of the sample (S), the way it was chosen (C), or both (B)? (a) *Twelve volunteers from a running club tested a sports drink.* (b) *A poll of 20,000 people who called a TV programme's phone line.* (c) *Six randomly chosen schools in a country of 30,000 schools.*
::: solution
(a) B — very small, and running-club volunteers are not typical of the population; (b) C — large, but self-selected callers; (c) S — random, but six schools is a small sample from which to generalise.
:::
:::

::: exercise Association or cause? {level=1}
Does the verb claim association (A) or cause (C)? (a) *Sleep duration was associated with exam performance.* (b) *Regular exercise reduces anxiety.* (c) *Screen time correlated negatively with reported well-being.* (d) *The policy led to a rise in enrolment.*
::: solution
(a) A; (b) C; (c) A; (d) C.
:::
:::

::: exercise Explain the correlation {level=2}
Suggest a confounder or a reverse cause for each finding (all fictional). (a) *Children who have more books at home score higher in reading tests.* (b) *People who take vitamin supplements live longer.* (c) *Companies that spend more on training have higher profits.*
::: solution
Possible answers: (a) confounder — parents' education or income leads to both more books and more support for reading. (b) confounder — people who take supplements may also eat better, exercise more and have higher incomes. (c) reverse cause — profitable companies can afford more training; or confounder — well-managed companies do both. Other reasonable alternatives are acceptable.
:::
:::

::: exercise What can this study claim? {level=2}
A (fictional) study recruited 60 students at one university through posters; 30 used a new note-taking app for a term and the 30 who did not want to use it acted as a comparison group. App users had higher marks. Rewrite the claim *The app improves students' marks* so that it fits the evidence, and say what would make the evidence stronger.
::: solution
A fitting claim: *At one university, 30 student volunteers who chose to use the app for a term had higher marks than 30 who chose not to.* The groups chose themselves, so the more motivated students may have chosen the app. Stronger evidence: random assignment to app or no app, a larger sample from several universities, and marks compared before and after the term.
:::
:::

::: exercise Check a news report {level=2}
A (fictional) news headline reads: *Chocolate makes you smarter, scientists say.* The study it reports found that, across 20 countries, those with higher chocolate sales per person had more university graduates per person. List three problems with the headline.
::: solution
(1) The data are about **countries**, not people: they cannot show that people who eat more chocolate are smarter. (2) It is a **correlation**: richer countries probably have both more chocolate sales and more graduates (a confounder: wealth). (3) *graduates per person* is not *smartness*, and *sales* is not *eating*. Also: 20 countries is a small sample, and the headline turns a finding into a causal claim (*makes you*). A sentence such as *countries with higher chocolate sales tend to have more graduates* is all the study supports.
:::
:::

::: exercise Evaluate two sources {level=3}
Two (fictional) sources make opposite claims about whether learning a second language delays memory decline in old age. Source A is a peer-reviewed longitudinal study of 2,400 adults followed for 15 years, which found a small association after controlling for education and income. Source B is a book by a well-known language teacher, based on her experience with 30 older students, who says that language learning "dramatically protects the brain". Compare them using [[#rule-check-source]] and write a sentence for an essay that reports the evidence accurately.
::: hint
Consider expertise, the kind of evidence, sample, peer review, purpose, and the strength of each claim.
:::
::: solution
**A:** peer-reviewed, large sample, long period, controls for two important confounders — strong for an observational study; but it is observational, so it shows association, not cause, and the effect is small. **B:** the author has teaching experience, not research expertise in memory; anecdotal evidence from 30 self-selected students; no peer review; a strong claim (*dramatically*); the book may have a commercial purpose. **Essay sentence:** *A large longitudinal study found a small association between learning a second language and slower memory decline, even after taking education and income into account (Source A), although observational evidence of this kind cannot show that language learning is the cause.* Source B could be mentioned, if at all, as a popular view.
:::
:::

::: exercise Design a better study {level=3}
Choose one of the weak studies in this chapter (the herbal drink, the library study, the online phone survey) and describe in about 100 words a study that would give stronger evidence for its claim. Say what kind of study it is, how participants would be chosen and assigned, what would be measured and how, and what the study still could not show.
::: solution
Answers will differ. A model for the herbal drink: *A randomised, double-blind, placebo-controlled trial: 300 office workers from several companies, chosen at random from those who agree to take part, are randomly assigned to drink either the product or a drink that looks and tastes the same but lacks the active ingredients; neither they nor the researchers know who has which. Concentration is measured with an established attention test before and after four weeks. The study would be registered in advance, with the main outcome stated, and published whatever the result. It still could not show long-term effects, or effects in groups not included (students, older people).* A good answer names the design, explains how it removes the weaknesses of the original, and states its own limits.
:::
:::
