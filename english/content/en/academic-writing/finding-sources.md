Two students are preparing literature reviews on the same question: whether speaking two languages delays the symptoms of dementia. Chen Hao types *does being bilingual stop dementia* into a general web search engine. The first page gives him a newspaper article, two health websites, a video, a language school's advertisement and a blog. Fatima Yusuf opens her library's databases, searches a medical index for *(bilingual\* OR multilingual\*) AND (dementia OR "cognitive decline")*, limits the results to the last fifteen years, and gets 180 records with abstracts. She sorts out a recent review article, reads its reference list, and checks which later studies have cited it.

Both students found something. But Chen Hao found what search engines rank highly — popular, recent, widely linked pages — and almost nothing a reader of his review would accept as evidence. Fatima found the research itself, and a map of how it fits together. The difference is not intelligence or effort; it is knowing where academic sources are and how to ask for them.

This chapter is about that knowledge from the writer's side: where to search, how to build a search, how to follow the citations that link studies, how to decide which sources deserve a place in your work, and how to keep a record that will make citing them easy. How to read a source strategically, and how to judge the evidence in it, are taught in [[academic-reading/strategic-reading]] and [[academic-reading/evaluating-sources]]; this chapter assumes them.

## Where academic sources are

::: definition Kinds of source {#def-source-kinds}
- **Primary sources** (一手资料) report original research or are the original material studied: a research article reporting an experiment, a dataset, a historical document, a novel analysed in literary studies.
- **Secondary sources** (二手资料) discuss, summarise or interpret primary sources: review articles, textbooks, most books about a subject.
- **Tertiary sources** collect and point to others: encyclopedias, handbooks, bibliographies, indexes.
- **Grey literature** (灰色文献) is material produced outside commercial and academic publishing: government and organisational reports, theses, conference papers, working papers, preprints.
:::

The same text can be a primary source for one question and a secondary one for another: a 1990 textbook is a secondary source about grammar but a primary source for a study of how grammar was taught in 1990. What matters for a writer is to cite primary sources for specific findings wherever possible, and to use secondary and tertiary sources to find them and to understand the field.

::: theorem Match the search tool to the task {#rule-tools}
1. **Library catalogues and discovery systems** find what your library holds or can obtain: books, journals, theses, some articles.
2. **Subject databases** index the journals of one field with abstracts and subject terms, and are the main tool for a literature search: for example PubMed (medicine and the life sciences, free to use), ERIC (education, free), PsycINFO (psychology), the *MLA International Bibliography* (literature and languages), and *Linguistics and Language Behavior Abstracts*.
3. **Multidisciplinary citation indexes** such as Web of Science and Scopus cover many fields and record which articles cite which, so they are the tools for citation searching.
4. **Google Scholar** covers a very large and mixed body of material, free, and is useful for quick checks and for finding full texts, but its coverage and ranking criteria are not published in detail and it includes material that has not been peer reviewed.
5. **Chinese databases** such as CNKI (中国知网) and Wanfang (万方) index Chinese-language journals, theses and conference papers.
6. **Repositories and preprint servers** (a university's institutional repository, arXiv in physics and mathematics, discipline-specific servers) hold open versions of papers, some of them not yet peer reviewed.
7. **General web search** is for grey literature from known organisations (a ministry, an international agency) and for checking facts about a source, not for finding research.
:::

::: proof
Each tool selects differently. A subject database lists articles from journals chosen by its editors, describes each one with an abstract and subject terms, and lets you combine terms precisely; this is why systematic reviews in medicine and education are based on them. Citation indexes add the links between papers, which no other tool records as completely. Google Scholar's strength is breadth and easy access, its weakness the same breadth: it ranks partly by citation counts and includes preprints, theses, course materials and pages from journals of very different quality, so the searcher must do the selecting. Access also differs: many databases are subscription services that your library pays for, so search through the library's website, which also links you to full texts it subscribes to. The list names examples, not recommendations; your library's subject guides show what is available to you.
:::

## Building a search

A good search starts not at the keyboard but with the research question ([[academic-writing/research-questions]]). Break the question into its main concepts, list the words authors use for each, and combine them.

::: definition Search terms and operators {#def-boolean}
- **Keywords** are the words you search for in titles, abstracts and other fields.
- **Subject headings** (controlled vocabulary) are the fixed terms a database assigns to each record, such as the Medical Subject Headings (MeSH) of PubMed or the descriptors of the ERIC thesaurus. They collect articles that use different words for the same concept.
- **Boolean operators** combine terms: **AND** requires both (fewer results), **OR** accepts either (more results), **NOT** excludes a term.
- **Phrase searching** with quotation marks finds words together: *"working memory"*.
- **Truncation** with an asterisk finds all endings: *bilingual\** finds *bilingual*, *bilinguals*, *bilingualism*.
- **Limits** restrict results by date, language, type of publication or field (title only, abstract only).
:::

The operators are those of Boolean logic, named after George Boole, and the figure shows what each one selects.

::: widget venn
title: A Boolean search
sets: 3
labels: bilingual; multilingual; dementia
expr: (bilingual | multilingual) & dementia
caption: Each circle is the set of records containing one term. The shaded region is the search *(bilingual OR multilingual) AND dementia*: records about dementia that mention either kind of speaker. OR, inside the brackets, widens the search to synonyms; AND narrows it to records that join the two concepts. Type *bilingual & dementia* to see how much a search without the synonym loses, or *(bilingual | multilingual) - dementia* to see what NOT would leave out.
:::

::: theorem A search strategy {#rule-search}
1. **Divide the question into two to four concepts**: for *Does bilingualism delay the onset of dementia?*, the concepts are *bilingualism* and *dementia* (and perhaps *onset* or *age*).
2. **List the terms for each concept**: synonyms, related terms, British and American spellings, abbreviations, and the database's subject headings.
3. **Combine terms for one concept with OR**, in brackets, and **concepts with AND**: *(bilingual\* OR multilingual\* OR "second language") AND (dementia OR Alzheimer\* OR "cognitive decline")*.
4. **Use NOT rarely**: it removes every record that mentions the term, including relevant ones.
5. **Run the search, read twenty titles and abstracts, and refine**: add terms found in relevant records, remove terms that bring in noise, apply limits.
6. **Record each search**: database, date, search string, limits and number of results.
:::

::: proof
Points 1–3 turn a question into a precise request: the brackets ensure that the database first gathers every way of expressing each concept and then keeps only records that join them. Without OR, a search for *bilingualism* misses articles that only say *multilingual speakers*; without brackets, many databases read *bilingual OR multilingual AND dementia* in an order you did not intend. Point 4 follows from the logic of NOT, as the figure shows: excluding *children* to avoid studies of children also excludes a study of older adults that mentions *children* once in its abstract. Point 5 reflects how searching works in practice — the first search is a draft, and the vocabulary of relevant records is the best guide to better terms. Point 6 is required for systematic reviews, whose reporting guidelines (PRISMA, for example) ask authors to state their searches so that others can repeat them, and it is useful in any project: without it you cannot say what you searched or redo a search months later.
:::

::: example Building a search string {#ex-search-string}
Build a database search for this question: *How do university teachers give written feedback on students' essays in English as a foreign language?*
::: solution
**Step 1 — concepts.** (A) written feedback; (B) essays or academic writing; (C) English as a foreign or second language; perhaps (D) university.

**Step 2 — terms for each.**
- A: *feedback*, *"written feedback"*, *"corrective feedback"*, *"teacher comments"*, *"error correction"*
- B: *essay\**, *writing*, *composition\**
- C: *EFL*, *ESL*, *"second language"*, *"foreign language"*, *L2*
- D: *universit\**, *"higher education"*, *college\**, *tertiary*

**Step 3 — combine.** *("written feedback" OR "corrective feedback" OR "teacher comments" OR "error correction") AND (essay\* OR writing OR composition\*) AND (EFL OR ESL OR "second language" OR "foreign language" OR L2)*. Concept D might be left out at first: limiting to universities may lose relevant studies whose abstracts do not mention the setting.

**Step 4 — refine.** If there are too many results, search A in the title field only, or add D. If there are too few, use the database's subject term (in ERIC, for example, the thesaurus has descriptors for feedback and second language learning) or drop *written*.

**Step 6 — record.** *ERIC, 12 March, search string as above, 2010–present, peer-reviewed only: 412 results.*
:::
:::

::: quiz
A search for *motivation AND (online OR distance) AND learning* gives 9,000 results. Which change is most likely to make the results more relevant without losing important studies?
- [ ] *motivation OR online OR distance OR learning*
- [ ] *motivation AND online AND distance AND learning*
- [x] adding a third concept with AND, such as *(university OR "higher education")*, if the question is about universities
- [ ] *motivation NOT school*
::: solution
Adding a concept that the question really contains narrows the search in a controlled way. The first option uses OR between concepts and would give far more results. The second requires both *online* and *distance*, losing studies that use only one. The fourth removes any record that mentions school, including university studies that do so in passing.
:::
:::

::: example Refining a search that finds too little {#ex-refine}
A student searches a psychology database for *"smartphone addiction" AND "sleep quality" AND undergraduates* and gets 6 results, of which 2 are relevant. How should she refine the search?
::: solution
**Diagnose.** Each concept is expressed by a single term, two of them as exact phrases, so the search finds only records that use exactly those words.

**Find the vocabulary of the field.** The two relevant records use *problematic smartphone use*, *mobile phone use*, *bedtime*, *sleep duration*, *insomnia* and *college students*. Their subject headings in the database include a heading for sleep and one for mobile devices.

**Rebuild.** *("smartphone addiction" OR "problematic smartphone use" OR "mobile phone use" OR smartphone\*) AND (sleep OR insomnia OR bedtime) AND (undergraduate\* OR "college students" OR "university students")*, and add the subject heading for sleep with OR.

**Check.** The new search gives 340 results. Screening the first 30 shows that most are relevant; a few are about adolescents, which a limit by age group can remove. Note too the word *addiction*: it is a contested term in this research, so a search that used only it would also have biased the sources towards one view of the question.
:::
:::

## Following the citations

Keyword searches find records that use your words. **Citation chaining** finds work that is connected to a source you already know, whatever words it uses.

::: definition Citation chaining {#def-chaining}
**Backward chaining** follows a source's reference list to the earlier work it cites. **Forward chaining** finds the later work that cites a source, using a citation index (Web of Science, Scopus) or the "cited by" link of Google Scholar. Together they are sometimes called **snowballing**.
:::

::: widget graph
title: Backward and forward from a key source
nodes: Study 2006@0,8; Study 2011@4,8; Study 2014@8,8; Review 2018@4,4; Study 2020@0,0; Study 2022@4,0; Study 2024@8,0
edges: Review 2018>Study 2006; Review 2018>Study 2011; Review 2018>Study 2014; Study 2020>Review 2018; Study 2022>Review 2018; Study 2024>Review 2018; Study 2024>Study 2011
caption: An arrow means *cites*. From a key source — here a fictional review of 2018 — backward chaining follows its references upwards to earlier studies, and forward chaining finds the later studies below that cite it. Study 2024 cites both the review and one of the earlier studies: a source that keeps appearing in both directions is probably central to the topic. You can drag the boxes.
:::

::: theorem Using chaining well {#rule-chaining}
1. **Start from a recent review** or a highly relevant recent study: its references give the history of the question, and forward searching from it gives the newest work.
2. **Chain from more than one starting point**, because each source cites selectively, often within one school of thought.
3. **Notice repetition**: sources cited by many of the papers you find are the ones your readers will expect you to know.
4. **Do not rely on chaining alone**: combine it with keyword searches, which find work that is relevant but not connected to your starting points.
5. **Read before citing**: a reference found in another reference list must be found and read before you cite it as your own reading, or cited as a secondary source ([[academic-reading/paraphrase-and-quotation]]).
:::

::: proof
Citations link a field together, so following them quickly reveals its core. They also have biases. Authors cite the work they know, the work of their own networks, work in their own language, and work that supports their argument; and highly cited papers attract more citations because they are highly cited. A literature built only from one starting point inherits that point's blind spots — which is why points 2 and 4 matter. Point 5 is also a matter of accuracy: references are sometimes copied wrongly from paper to paper, and a finding can drift in the retelling.
:::

::: quiz
You have found a key article published in 2015. Which method finds the studies published since then that responded to it?
- [ ] reading its reference list
- [x] looking up the articles that cite it in a citation index
- [ ] searching for its title in a library catalogue
- [ ] adding NOT 2015 to a keyword search
::: solution
Forward chaining — the list of later works that cite the article — finds the responses to it. Its reference list (backward chaining) gives only earlier work; a catalogue finds the article itself; and excluding *2015* from a keyword search excludes records that mention the year, not the article.
:::
:::

## Choosing what to read

A search that works will give you more records than you can read. Triage them in stages, deciding at each stage whether to go further:

1. **Title and source**: is it on your question, and in a scholarly venue?
2. **Abstract**: does it address your question, with a relevant population, method and kind of evidence?
3. **Skim the full text**: introduction, figures and tables, discussion ([[academic-reading/strategic-reading#rule-survey]]).
4. **Read closely and take notes** only for sources that will be cited for their content.

::: example Triage by title and abstract {#ex-triage}
The question is *How do university teachers give written feedback on students' essays in English as a foreign language?* Decide from these fictional titles and abstract summaries whether to read on, and why. (a) *Teacher written feedback on EFL essays at a Vietnamese university: forms, focus and student uptake* — a study of 600 comments by 12 teachers. (b) *Oral corrective feedback in the primary English classroom* — an observation study in four primary schools. (c) *Automated writing evaluation in Chinese university English courses* — a survey of students' views of a scoring program. (d) *Feedback in higher education: a review* — a review of feedback across all subjects in English-speaking universities.
::: solution
(a) **Read closely**: written feedback, EFL essays, university teachers — every concept of the question, with data on the feedback itself. (b) **Reject**: oral feedback in primary schools; it differs in two concepts. (c) **Skim, probably reject**: feedback on EFL writing at university, but from software, not teachers; useful at most for a sentence on alternatives to teacher feedback. (d) **Skim for background**: not about EFL, but a review can supply Move 1 of the introduction and point by backward chaining to studies of written comments. Record the reason for each decision.
:::
:::

Keep a list of the sources you rejected, with a word on why. It saves you finding them again, and it is part of the record if your search must be reported.

## Evaluating sources

Judging the evidence inside a study is the subject of [[academic-reading/evaluating-sources]]. Before that, a writer has to decide whether a source belongs in an academic text at all, and how to use it.

::: theorem Questions to ask of a source {#rule-evaluate}
1. **What kind of text is it?** A peer-reviewed article, a scholarly book, a report by a known organisation, a thesis, a preprint, a news report, a web page? Each can be cited, but for different purposes and with different weight.
2. **Who is responsible for it?** Authors with relevant expertise; a publisher, journal or organisation with editorial standards; a funder or owner whose interests might shape it.
3. **Has it been checked?** Peer review, editorial review, or none (a preprint, a blog). For journals, check that they are what they appear to be.
4. **Is it current enough?** Recent work for fast-moving questions; classic work where it founded the field or is still the best evidence.
5. **Is it still standing?** Check whether it has been corrected or retracted, and how later work has responded to it (forward chaining shows this).
6. **Is it relevant to your question** — the same population, setting and concept — or only to your topic?
:::

::: proof
Point 1 matters because sources do different jobs. A news report can show that an event happened or that a view is widely held; it is weak evidence for a scientific finding, which it may have simplified. Points 2 and 3 address a problem that has grown with online publishing: some journals accept almost any submission for a fee and claim a peer review they do not carry out. Such outlets are often called *predatory* or *deceptive*. Lists of them have been compiled and disputed; a practical approach is to check a journal against the indexes your field trusts, the journal's own stated policies and editorial board, and checklists such as the "Think. Check. Submit." initiative. Point 5 is easily overlooked. Retracted papers continue to be cited; publishers mark retractions on the article page, and the Retraction Watch database, now maintained by Crossref, records them. Point 6 prevents a common weakness in student reviews: sources on the right topic used as if they answered a different question.
:::

Checklists such as these help, but researchers who study how experts judge online information have found that fact-checkers rarely evaluate a website by studying the site itself. Wineburg and McGrew (2019), comparing professional fact-checkers with historians and students, found that the fact-checkers judged sources faster and more accurately by **lateral reading**: leaving the page and searching for what other sources say about its author or publisher. For an unfamiliar source, a short lateral search — *Who publishes this journal? Who funds this organisation?* — is often worth more than a careful look at the source's own pages.

::: example Choosing sources for a question {#ex-choose}
A student's question is: *Is there an association between evening smartphone use and sleep quality among university students?* Evaluate each of these fictional sources and say how, if at all, she should use it.

(a) A 2022 article in a peer-reviewed sleep research journal reporting a survey of 1,800 students at four universities. (b) A 2023 newspaper article headlined *Phones are destroying students' sleep*, which mentions "a recent study". (c) A 2016 systematic review of 20 studies of screen use and sleep in adolescents aged 11–18. (d) A website selling blue-light glasses, with a page summarising "the science of screens and sleep". (e) A 2024 preprint reporting an experiment in which students' phones were removed at 10 p.m. for two weeks.
::: solution
(a) **Use as a main source.** Peer-reviewed, recent, large sample, directly on the population and question.

(b) **Do not cite for the finding.** Find the study it mentions and cite that, if it is relevant. The headline overclaims (*destroying*) and the article is a secondary report. It could be cited only as evidence of public concern.

(c) **Use, with care about relevance.** A systematic review is strong evidence, but on adolescents, not university students, and now some years old. Cite it for the background (Move 1 of the introduction) and check for a more recent review by forward chaining.

(d) **Do not use.** The publisher has a commercial interest; the page is not checked. Lateral reading would show that it is a retailer. If it cites studies, they can be found and judged on their own merits.

(e) **Use, labelled as a preprint.** The experimental design could speak to cause, which surveys cannot, so it is valuable; but it has not been peer reviewed, so state that (*a preprint by …*), check whether it has since been published, and do not rest a main claim on it alone.
:::
:::

::: warning References you have not checked
✗ Copying a reference from a website, a lecture slide, another student's essay or an AI chatbot into your reference list without finding the source.

✓ Finding every source in a database or on the publisher's site, reading at least the parts you cite, and taking the reference details from the source itself.

References copied at second hand are often wrong in small ways (a year, a page range, an author's initials), and sometimes in large ones. Chatbots in particular have been widely reported to produce references that look plausible but do not exist, combining real authors, real journals and invented titles. A reference list is a claim that you have consulted those works; an invented or unchecked one is treated as a breach of academic integrity ([[academic-writing/academic-integrity]]), not as a slip of formatting.
:::

## Keeping records

Every source you may cite needs a full record, taken when you first read it: authors, year, title, journal or publisher, volume, issue, pages, DOI or stable URL, and — for your notes — page numbers for every quotation and specific point ([[academic-reading/paraphrase-and-quotation]], "Recording sources as you read"). Reference-management software stores these records, imports them from databases, keeps PDFs and notes, and formats citations; widely used examples include Zotero (free and open source), EndNote and Mendeley. Imported records are often incomplete or wrongly capitalised, so check each against the source. How references are formatted is the subject of [[academic-writing/citation-referencing]].

::: note English and Chinese
- **Searching in two languages.** A Chinese-speaking researcher can search both the English-language and the Chinese-language literature, which is an advantage: much research on Chinese learners, Chinese education or Chinese society is published in Chinese journals that English-only researchers cannot read. In English-language papers, Chinese sources are cited like any others; most styles give the author's name in Pinyin, the original title (in Pinyin or characters, as the style requires) and an English translation of the title in square brackets.
- **Terms do not translate one to one.** Search terms must be found in the English literature, not translated from Chinese: 二语习得 is *second language acquisition* (also *SLA*, *L2 acquisition*); 大学英语 may be *college English*, *university English* or *EFL at tertiary level*; 学习动机 is *motivation*, *L2 motivation* or *learner motivation*. Read the abstracts of a few relevant English articles and borrow their words.
- **Spelling variants.** English has British and American spellings (*behaviour*/*behavior*, *ageing*/*aging*, *paediatric*/*pediatric*). Use OR to catch both (*behaviour OR behavior*); some databases also accept a wildcard inside the word, with a symbol that differs between databases.
- **Lists of journals.** Chinese universities often judge journals by lists such as the 北大核心 (the *Overview of Chinese Core Journals*) or the CSSCI index for the social sciences. English-language fields rely more on the indexes (Web of Science, Scopus) and on each field's own sense of its leading journals; neither kind of list guarantees the quality of any one article.
:::

::: history
Finding research has always depended on indexes. In 1879 John Shaw Billings began the *Index Medicus*, a monthly list of the medical literature, whose computerised successor, MEDLINE, began in 1971 and became freely searchable through PubMed in the late 1990s. ERIC, the index of education research funded by the United States government, began in 1966. In 1955 Eugene Garfield proposed in *Science* an index that would record which articles cite which, and his *Science Citation Index* appeared in 1964, making forward searching possible for the first time; it is the ancestor of Web of Science. The operators of database searching come from George Boole's algebra of logic, published in *The Laws of Thought* (1854). Google Scholar was launched in 2004.
:::

## Where this leads

The sources you find are cited as in [[academic-writing/citation-referencing]], used honestly as in [[academic-writing/academic-integrity]], and brought together in [[academic-writing/literature-review]]. Reading them efficiently and critically is the subject of [[academic-reading/strategic-reading]] and [[academic-reading/evaluating-sources]].

::: summary
- Sources are **primary**, **secondary**, **tertiary** or **grey literature**; cite primary sources for specific findings where you can ([[#def-source-kinds]]).
- Use **subject databases** and **citation indexes** for a literature search, through your library; Google Scholar and the web are supplements, not substitutes ([[#rule-tools]]).
- Build a search from the **concepts** of your question: synonyms joined by **OR** in brackets, concepts joined by **AND**, **NOT** rarely, with phrases, truncation, subject headings and limits ([[#def-boolean]], [[#rule-search]]).
- **Citation chaining** — backward through references, forward through citing papers — finds connected work; start from recent reviews and from more than one source ([[#rule-chaining]]).
- **Evaluate** each source for kind, responsibility, checking, currency, retraction and relevance; for unfamiliar sources, **read laterally** ([[#rule-evaluate]]).
- **Never cite** a reference you have not found and checked; record full details and page numbers as you read.
:::

## Exercises

::: exercise Primary, secondary, tertiary or grey? {level=1}
Classify each source for a study of reading habits. (a) an encyclopedia entry on literacy; (b) a journal article reporting a survey of 500 readers; (c) a government report on library use; (d) a textbook chapter summarising research on reading; (e) a PhD thesis.
::: solution
(a) tertiary; (b) primary; (c) grey literature (and primary if it reports its own data); (d) secondary; (e) grey literature (and primary for the research it reports).
:::
:::

::: exercise Boolean operators {level=1}
Which search gives the most results, and which the fewest? (a) *anxiety AND speaking* (b) *anxiety OR speaking* (c) *anxiety AND speaking AND classroom* (d) *(anxiety OR apprehension) AND speaking*
::: solution
Most: (b), which accepts any record with either word. Fewest: (c), which requires all three. (d) gives more than (a), because it accepts *apprehension* as well as *anxiety*.
:::
:::

::: exercise Truncation and phrases {level=1}
Write search terms that would find: (a) *educate*, *education*, *educational*, *educators*; (b) the exact phrase *language anxiety*; (c) both *organisation* and *organization*.
::: solution
(a) *educat\**; (b) *"language anxiety"*; (c) *organisation OR organization* (or *organi?ation* in databases that support a single-character wildcard).
:::
:::

::: exercise Build a search {level=2}
Write a search string for the question *Does peer tutoring improve the academic performance of first-year university students?* List the concepts and terms first.
::: solution
Concepts and terms: (A) *"peer tutoring"*, *"peer mentoring"*, *"peer-assisted learning"*, *"peer assisted learning"*, *"supplemental instruction"*; (B) *"academic performance"*, *achievement*, *grades*, *"academic success"*, *retention*; (C) *"first-year"*, *"first year"*, *freshm\**, *undergraduate\**. String: *("peer tutoring" OR "peer mentoring" OR "peer-assisted learning" OR "supplemental instruction") AND ("academic performance" OR achievement OR grades OR "academic success") AND ("first-year" OR "first year" OR freshm\* OR undergraduate\*)*. *Improve* is not a search concept: searching for it would exclude studies that found no improvement.
:::
:::

::: exercise Chaining {level=2}
You have found one highly relevant article published in 2019. Describe step by step how you would use it to find (a) earlier and (b) later work, and say one limitation of each.
::: solution
(a) Backward: read its reference list, select the references relevant to your question, find them in the library, and repeat with the best of them. Limitation: you only find work the authors chose to cite, which may reflect their own school, language or argument. (b) Forward: look up the article in a citation index or Google Scholar, open the list of later works that cite it, and screen their titles and abstracts. Limitation: recent work has had little time to be cited, and an article may be cited for a minor point, so many citing works will be irrelevant.
:::
:::

::: exercise Evaluate a source {level=2}
You find a 2021 article in a journal you have never heard of, which claims a very large effect of a vocabulary app on exam scores. The journal's website promises peer review within seven days for a publication fee. What would you check before using the article?
::: solution
Check the journal: whether it is indexed in the databases your field uses, who is on its editorial board and whether they confirm it, its stated review policy, and what other sources say about the publisher (lateral reading); a promise of review within seven days for a fee is a warning sign. Check the article: the authors and their affiliations, any conflict of interest (for example, a link to the app's developer), the sample and design, and whether the effect is plausible compared with other studies. Check later work by forward chaining. If doubts remain, do not rely on it, or cite it only with a clear statement of its limitations.
:::
:::

::: exercise A search log {level=3}
Choose a research question of your own. Search two databases (one subject database and one citation index or Google Scholar). For each, record the date, the search string, the limits and the number of results, then screen the first 30 records by title and abstract. Write a paragraph of about 150 words saying how the two searches differed and how you refined your terms.
::: hint
Look at the words used in the titles and abstracts of the most relevant records, and add them to your search.
:::
::: solution
Answers depend on the question. A good answer gives a complete log for each search; reports concrete refinements (terms added or removed, a limit applied, a subject heading used) and their effect on the results; notices differences between the databases (for example, more grey literature and duplicates in Google Scholar, more precise subject terms in the subject database); and ends with a judgement about which search found the more relevant records and why.
:::
:::

::: exercise Annotated source list {level=3}
For the same question, choose five sources you would cite. For each, write a full reference and two or three sentences saying what kind of source it is, why it is credible (or what its limits are), and what you would use it for in your paper.
::: solution
Answers will vary. A good list includes at least one recent review or key study, mostly primary sources, and no source that has not been read. Each annotation should answer the questions of [[#rule-evaluate]] briefly — kind, responsibility, checking, currency, relevance — and name a specific use (*background for Move 1*, *main comparison for my results*, *evidence of a method*), rather than just summarising the source.
:::
:::
