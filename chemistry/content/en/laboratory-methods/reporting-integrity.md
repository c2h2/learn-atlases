The last titre is recorded, the glassware is washed and back on its draining board, the bench is wiped clean — and the experiment is not over. It ends when someone else could repeat it from what you wrote: your own future self in six months, a demonstrator reading your report this afternoon, a stranger in another laboratory a decade from now. Until then your result is a private experience — real, hard-won, and already fading. Everything this chapter builds follows from taking one sentence seriously: **an experiment is finished when it is written so that others could repeat it.** The notebook, the report, the citation, the honest uncertainty and the integrity rule are all consequences of that single sentence, and none of them is difficult. All of them are exact.

That sentence is older than the teaching laboratory. In 1661 Robert Boyle published *The Sceptical Chymist*, and in the years around it he argued for something harder to practise than any of his chemistry: that an experiment counts as public knowledge only if it is published whole — apparatus described, conditions stated, failures admitted, dated so that priority can be settled. It was a bargain. You give the world your whole method, and the world gives your result the standing of fact. For three and a half centuries the bargain held quietly, as professional etiquette. Then the reproducibility difficulties of recent decades — study after study that other laboratories could not repeat, some of them famous — turned "write it so others can repeat it" from a footnote of professional manners into a headline issue, and turned research integrity from a closing lecture into part of the working equipment of every chemist.

This chapter closes the circle the course has been drawing since [[laboratory-methods/lab-safety]]: the notebook at the bench, the data and graphs of [[laboratory-methods/data-graphs]], the results with their uncertainties, and the report that makes the whole thing public and honest. The report is where measurement, technique and conscience meet; it is also the only form in which your chemistry will ever reach anyone else.

## The notebook

The notebook is written at the bench, in ink, as things happen — not on a scrap of paper, not later from memory, not in a neat separate book at the end of the week. The reasons are practical before they are moral. A scrap of paper can be lost, and a memory rewrites itself overnight: the volume you read as $24.86\ \mathrm{cm^3}$ at the burette becomes $24.90$ by Tuesday, because $24.90$ looked tidier. A transcription step — from scrap to book — is one more chance to copy a digit wrongly, and, since the scrap is thrown away, leaves no way to check which version was read. Writing in ink, as things happen, is not pedantry; it is what makes the notebook evidence rather than a story.

Pages are bound or numbered in sequence, and corrections follow one rule: a single line through the wrong entry, so it stays legible, with your initials and the date beside it. Never erase, never overwrite, never tear out. The logic is that of a legal document. A record that could be silently altered proves nothing — and records are called upon to prove things: who did what, on what day, in disputes over priority and in disputes over patents. A struck-through, initialled and dated correction is not an admission of carelessness; it is proof that the book is honest, because it shows the corrections were made openly. The whole rule compresses into one sentence you should already half-believe from [[laboratory-methods/data-graphs]]: **if it is not in the notebook, it did not happen.**

What goes in, at the moment it happens? The grade and supplier of every reagent bottle you touch — "the shared acid" is not a standard solution, and the difference between a certified primary standard and a heaped spoon from an old jar is a systematic error waiting to be discovered by someone else. Masses and volumes exactly as read: $0.5106\ \mathrm{g}$, not "about $0.51\ \mathrm{g}$"; the meniscus reading, not the reading you would have liked. The instrument by name — which balance, which colorimeter, set to which wavelength — because the next person may have access to a better one and deserves to know what you did not. And the observations that mean nothing now: the precipitate that redissolved before you noticed, the room that was cold, the flask that leaked a little. In six months, when the yield was half what it should have been, one of those lines will be the whole story, and you will not remember it. The notebook is for you in six months' time; it is also, in the strict sense that matters, the only copy of your experiment that exists.

## The shape of a report

The notebook is the raw legal record; the report is the crafted public account, and it has a shape because its readers read in a fixed order with fixed questions.

::: algorithm The sections of a report and what each owes the reader {#alg-report}
1. **Title** — what was determined or prepared, in one line; not a riddle.
2. **Abstract** — what was done and what was found, in one paragraph, with the headline number and its uncertainty. Written last, read first: it is often the only part most readers finish.
3. **Introduction** — why the work was done, ending in the question or target. Every claim about previous work carries a citation here.
4. **Procedure** — past tense, in enough detail to repeat what *you* did; cite the manual or published method and describe only what you changed, rather than copying pages of instructions.
5. **Results** — tables and figures, numbered, each with a caption that stands alone without the text; values with their uncertainties; no interpretation in this section.
6. **Discussion** — what the numbers mean: uncertainties, sources of error, comparison with literature values (cited), what you would change next time.
7. **Conclusion** — the largest claim the data actually support, and not one degree larger.
8. **References** — every cited source, once each, in one consistent style.
:::

The classic faults are not random; they cluster at three fault lines. The first is results mixed with discussion: "the mean titre was $24.86\ \mathrm{cm^3}$, in good agreement with the expected value" — the first half is a result, the second is an interpretation that belongs in the Discussion, and it cannot even be honest there without an interval attached. Keeping the sections apart is not formalism: it lets a reader check your observations before trusting your reading of them. The second fault line is the procedure copied verbatim from the manual — padding that tells the reader nothing about what you actually did, and plagiarism besides (see below). The third is the conclusion that overreaches the data: "the product is pure aspirin" from a melting point alone, when [[laboratory-methods/identifying-compounds]] has shown exactly how much a melting point can prove and how much it cannot. A conclusion earns its keep by being the claim the numbers themselves would make.

## Numbers that tell the truth

A report transfers numbers from your bench to the reader's, and numbers inflate in transit: every digit the calculator printed, every mean quoted without its scatter, every "about" quietly dropped. The rules of this section are the anti-inflation rules, and they continue the arithmetic of [[laboratory-methods/measurement-uncertainty]].

::: definition Reporting a value with its uncertainty {#def-reporting-uncertainty}
Report a measured quantity as **value $\pm$ uncertainty**, with the two rounded to agree in decimal place and the uncertainty carrying one significant figure — two only when the leading digit is 1 or 2, where rounding to one would throw away most of the information. State what the uncertainty means: a **standard uncertainty** $u$, one standard deviation of the estimate (roughly $68\ \%$ coverage), or an **expanded interval** at a stated confidence level, usually $95\ \%$, with the coverage factor or distribution named. "The concentration is $0.10078 \pm 0.00023\ \mathrm{mol\,dm^{-3}}$ (standard uncertainty, $n = 5$)" is a complete statement; the same number without the second half is a rumour.
:::

The $\pm$ sign is a promise with two halves, and readers need to know which promise you made. A standard uncertainty says "the scatter of my estimate is this big"; a $95\ \%$ interval says "a method run this way captures the truth nineteen times in twenty." The two differ by a factor of about two, so quoting one while the reader assumes the other misstates your result by a factor of two — which is more than most of your technique is worth.

::: proposition Standard uncertainty of the mean {#prop-sem}
For $n$ independent repeated measurements with sample standard deviation $s$, the standard uncertainty of their mean is
$$
u_{\bar{x}} = \frac{s}{\sqrt{n}} .
$$
:::

::: proof The uncertainty of the mean shrinks as $1/\sqrt{n}$ {#proof-sem}
Write the mean as $\bar{x} = \frac{1}{n}\sum_{i=1}^{n} x_i$. Two rules do the work: variances of independent quantities add (the covariance terms vanish when the readings share no pattern), and a constant factor leaves a variance squared, $\operatorname{var}(aX) = a^{2}\operatorname{var}(X)$. Then
$$
\operatorname{var}(\bar{x}) = \operatorname{var}\!\left(\frac{1}{n}\sum_{i=1}^{n} x_i\right) = \frac{1}{n^{2}}\sum_{i=1}^{n}\operatorname{var}(x_i) = \frac{n\,s^{2}}{n^{2}} = \frac{s^{2}}{n},
$$
and taking the square root gives $u_{\bar{x}} = s/\sqrt{n}$.

Read the consequence before you read the next sentence. Improvement comes as the square root of effort: the second replicate cuts $u_{\bar{x}}$ by $29\ \%$, the fourth by $13\ \%$, the tenth by $5\ \%$. The fourth replicate buys much less than the second, and the tenth buys almost nothing — which is why teaching laboratories run five replicates and analytical laboratories plan replication against the budget it consumes, exactly as the uncertainty budgets of [[laboratory-methods/measurement-uncertainty]] plan glassware against theirs. Independence, as there, is the condition that makes the cancellation real: five readings that share a mis-calibrated instrument cancel nothing that the formula promises.
:::

For small $n$ there is one more refinement before a number is reportable. The scatter $s$ is itself uncertain when it comes from four or five readings, so the $95\ \%$ interval is not $\bar{x} \pm 2u_{\bar{x}}$ but $\bar{x} \pm t\,s/\sqrt{n}$, where $t$ comes from Student's $t$ distribution with $n - 1$ degrees of freedom: $t = 2.78$ for $n = 5$, $3.18$ for $n = 4$, falling towards $2$ as $n$ grows. The full statistics — $t$-tests, comparison of methods, outlier tests — is [[analytical-chemistry/statistics-calibration]]; here you need only the honesty of using $t$ rather than a convenient 2.

::: example Rewriting badly reported values {#ex-rewrite-values}
A report contains two statements. (a) "The concentration of the standard was $c = 0.100782 \pm 0.000234\ \mathrm{mol\,dm^{-3}}$." (b) "The $25.00\ \mathrm{cm^3}$ pipette delivered $24.99718\ \mathrm{cm^3}$." Rewrite each properly and say what is wrong.
::: solution
(a) Nothing is wrong with the measurement; everything is wrong with the reporting. The uncertainty carries six significant figures, which claims knowledge of the uncertainty to the ninth decimal place. Round the uncertainty first: its leading digit is 2, so two figures are allowed, giving $0.00023$; then round the value to the same decimal place: $c = 0.10078 \pm 0.00023\ \mathrm{mol\,dm^{-3}}$. (One figure would also be defensible — $0.1008 \pm 0.0002$ — and the two versions differ by less than the uncertainty itself, which is the sign that the rounding choice is not where the honesty lies.)
(b) $24.99718\ \mathrm{cm^3}$ claims a precision of $0.00001\ \mathrm{cm^3}$: a twentieth of the tolerance of a good balance, and three thousand times better than the Class A tolerance of the pipette itself ($\pm 0.03\ \mathrm{cm^3}$, as [[laboratory-methods/volumetric-technique]] explains). The number was made by dividing a mass by a density and keeping every digit the calculator printed. Report it honestly: $25.00 \pm 0.03\ \mathrm{cm^3}$ from the tolerance, or, if the pipette was actually calibrated by repeated weighing, $24.99 \pm 0.02\ \mathrm{cm^3}$ — the value from the experiment, the uncertainty from the experiment, and not one digit more.
:::
:::

::: example A $95\ \%$ interval from five titres {#ex-titration-95}
A student obtains five titres of $24.86$, $24.92$, $24.80$, $24.88$ and $24.84\ \mathrm{cm^3}$. Report the mean with its standard uncertainty and with a $95\ \%$ confidence interval.
::: solution
The mean is
$$
\bar{x} = \frac{24.86 + 24.92 + 24.80 + 24.88 + 24.84}{5} = \frac{124.30}{5} = 24.86\ \mathrm{cm^3}.
$$
The deviations from the mean are $0.00$, $+0.06$, $-0.06$, $+0.02$, $-0.02\ \mathrm{cm^3}$; their squares are $0$, $0.0036$, $0.0036$, $0.0004$, $0.0004$, summing to $0.0080\ \mathrm{cm^6}$. Then
$$
s = \sqrt{\frac{0.0080}{5-1}} = \sqrt{0.0020} = 0.045\ \mathrm{cm^3},
\qquad
u_{\bar{x}} = \frac{s}{\sqrt{n}} = \frac{0.0447}{\sqrt{5}} = 0.020\ \mathrm{cm^3}.
$$
For the $95\ \%$ interval, $n - 1 = 4$ degrees of freedom give $t = 2.78$, so the half-width is
$$
t\,\frac{s}{\sqrt{n}} = 2.78 \times 0.020 = 0.056 \approx 0.06\ \mathrm{cm^3},
$$
and the report reads: mean titre $24.86 \pm 0.02\ \mathrm{cm^3}$ (standard uncertainty, $n = 5$), or $24.86 \pm 0.06\ \mathrm{cm^3}$ ($95\ \%$ confidence, $n = 5$). Note the two promises differ by a factor of three here, not two — at $n = 5$ the $t$-factor is $2.78$, not $2$, because five readings do not yet know the scatter well. And note what the interval claims: if the whole five-fold experiment were repeated many times, about $95\ \%$ of intervals built this way would contain the true mean titre. It is a statement about the method's reliability, which is exactly what you are selling when you write "$\pm$".
:::
:::

::: widget confidence
dist: normal
n: 15
level: 0.95
intervals: 40
caption: Each horizontal line is one $95\ \%$ confidence interval for the mean, computed from a fresh simulated sample of $15$ readings. About $5\ \%$ of the lines miss the true value — the vertical line — and a miss is not an error: it is the $5\ \%$ you contracted for when you chose the level. Reporting "mean $\pm$ $95\ \%$ interval" is making an honest, checkable claim about where the truth lies.
:::

The picture is worth staring at until it feels obvious, because it is the picture behind every "$\pm$" you will ever write. Each interval is either honest-and-right or honest-and-missing, and the missing ones are not mistakes — no rule was broken, no digit fudged; the sample happened to be one of the unlucky $5\ \%$. A report that hides this — by quoting a mean bare, or by padding it with digits the experiment cannot support — is not more confident than the honest version. It is a counterfeit claim, and the counterfeiting is the point: the reader cannot tell, which is precisely why the honest form is the one worth the extra character.

## Sources and citations

The rule is one sentence long: **every number you did not measure needs a source, and every sentence that is not your own observation or common knowledge needs a citation.** The test is a question a reader could ask — "how do you know?" If the answer is "I measured it, and here it is in the notebook", no citation is needed. If the answer is "I read it", "I was told", or "everyone knows that" (and you are not certain your readers are among the everyone), cite.

What actually gets cited in an ordinary report: the literature value you compare against — name the data book or paper, because "the literature" is not a source; the method you adapted, with what you changed; the reagent supplier for anything unusual, since grade and origin are systematic errors you owe the reader; and any hazard or property statement that is not common knowledge — for the common ones, [[laboratory-methods/lab-safety]] has taught you where the real source (the safety data sheet) lives.

Styles differ — author–date (Harvard), numbered (Vancouver), the ACS and RSC house styles — and the choice matters far less than the consistency. Pick the style your course or journal requires and apply it to every entry, including the ones that are "obvious". Use a reference manager; they exist precisely because hand-typing forty references is how forty small errors are made, and a wrong reference is a small broken promise.

And then the hard part, which is not about numbers at all. Copying sentences — from the manual, from Wikipedia, from another student's report, from a paper — is plagiarism even when the chemistry is perfect, because words are the record of thought and taking them is taking the thought. It is also, at the level of craft, laziness badly disguised: a copied procedure tells the reader you did not know what you were doing well enough to describe it. The alternative is the actual skill of the section: read the source, close it, write from memory what *your* work needed from it, and cite it. If you cannot paraphrase a passage, you have not understood it; if the exact words are genuinely unimprovable — a definition, a name reaction — quote them, quotation marks and all, and cite.

::: example Which sentences need a citation? {#ex-which-citations}
Decide which sentences of a report extract need a citation, and what the citation should be: (a) "A Class A $25\ \mathrm{cm^3}$ transfer pipette has a tolerance of $\pm 0.03\ \mathrm{cm^3}$." (b) "The solution turned pale pink and the colour held for thirty seconds." (c) "The procedure was adapted from a microscale synthesis in the course manual." (d) "Yields of this ester are typically $60$–$70\ \%$." (e) "Phenolphthalein gives a sharper end point than methyl orange for this titration."
::: solution
(a) Yes — a specification you did not measure; cite the standard or the data book that tabulates it (Harris's *Quantitative Chemical Analysis*, say, or the relevant ISO specification). (b) No — your own observation, and its home is the notebook; the report may repeat it, cited to nothing because it is yours. (c) Yes — the manual is someone's work; cite it and state what you changed, which is also the honest way to write the Procedure. (d) Yes — numbers you did not measure; cite the source of the typical yields, or delete the sentence, because an uncited "typically" is how expectations smuggle themselves into a report. (e) Yes — a comparative claim about indicators is not your observation here and not common knowledge to every reader; cite the manual or paper that recommends it, or soften it to what you saw.
:::
:::

## Integrity

::: definition Research integrity {#def-integrity}
**Research integrity** is the set of rules that make results trustworthy to people who cannot watch you work. Its three named offences: **fabrication** — inventing data or results that were never obtained; **falsification** — moving, deleting or cherry-picking data or images so that they match expectation; **plagiarism** — taking words, work or images that are not yours. Everything else that counts as misconduct — the authorship claim on work you did not do, the duplicate publication, the undisclosed conflict — is one of these three wearing a different coat.
:::

The grey zones of the bench, meanwhile, are not grey. "Rounding" the awkward point onto the line is falsification. Dropping the inconvenient replicate without a recorded reason is falsification. The too-perfect duplicate — handing in your partner's numbers as your own replicate, so the pair looks beautifully concordant — is fabrication and plagiarism at once. The cropped image that hides the extra band is falsification. Each of these is the named offence in work clothes, and each is recognisable to anyone who looks, which in a published paper eventually means everyone.

Outliers are where the rule earns its living, so be exact about it. **Record, investigate, explain the decision.** A documented reason removes data: the notebook says the flask leaked, the titre was taken past the end point, the balance was bumped mid-weighing — exclude the value, state the exclusion and the reason, and report the rest. A feeling does not remove data: "it looked wrong", "it spoiled the precision", "I had a bad feeling about that beaker" are not reasons, and without one the point stays in, however ugly it makes the scatter. If no physical cause is found, the point stays or a named statistical test — the $Q$-test and its cousins, done properly in [[analytical-chemistry/statistics-calibration]] — removes it with a citation, which is a documented reason of the acceptable kind. Either way the reader sees what you decided and why, and can audit you; that auditability is the whole point.

And then the part students find hardest to believe: negative and disappointing results are results. The honest report of a failed experiment — what was tried, what happened, what it rules out — teaches more than a smoothed success, and is worth more to the next person who tries the same thing. A yield of $12\ \%$ reported honestly is knowledge; a $60\ \%$ yield reconstructed from expectation is not a worse number, it is not a number at all, because it is no longer connected to anything that happened at the bench.

::: example An offered answer {#ex-integrity-scenario}
Before doing her titration, a student is sent the class's running average concentration by a friend who finished early. That evening, short of time, she "adjusts" her last titre so that her mean lands within a whisker of the class average. What exactly is wrong, and what should she have done instead?
::: solution
What is wrong is not the closeness — it is the connection. Her reported mean is no longer a measurement of anything: the class average entered the calculation backwards, from expectation into the number, instead of the number arising from the burette. It corrupts two things at once: her own result, which she can no longer trust when something is wrong (and something usually is — that is what the scatter is for), and the class data, which now contain one value engineered to look like the others, flattering the class precision and hiding a real method's real spread. What she should have done is ordinary and enough: record the titre she actually got; if she suspects it, check the notebook for a cause and, if time allows, re-titrate with the reason written down; report her own mean with its uncertainty; and use the class average where it belongs — in the Discussion, as a cited comparison: "our mean was $2.5\ \%$ below the class mean, which we attribute to the shared burette's calibration." That sentence is honest, checkable, and worth more than the adjusted number ever was.
:::
:::

::: warning Adjusting data to match expectation is falsification {#warn-falsify}
There is a line, and it does not move with your intentions. The fix you make because you *noticed* a mistake — you saw the bubble in the burette tip, you misread the meniscus, you wrote $0.5312$ where the balance showed $0.5012$ — is honest, and belongs in the notebook with the reason beside it. The adjustment you make to *please* — nudging the last titre towards the class average, dropping the awkward replicate, rounding the outlier towards the line — is falsification, the same act whether it saves a mark or a grant. In a course it is a disciplinary matter; in research it ends careers, and the correction or retraction that follows will be read by more people than ever read the paper. The test is simple and it works: would you write the change, and its reason, in the notebook for anyone to see? The fix made after you notice is honest; the adjustment made to please is not.
:::

::: quiz
Your fifth replicate is far from the other four. What should you do?
- [ ] Delete it quietly; one bad point ruins the precision of the whole set.
- [x] Keep it, investigate why, and report what you decide and why you decided it.
- [ ] Average only the four that agree, and say nothing about the fifth.
- [ ] Repeat the measurement until it agrees with the other four.
::: solution
Only the second option keeps the record honest. Deleting without a recorded reason — or averaging the four that agree and mentioning nothing — is falsification by cherry-picking, and it does something worse than cheating: it destroys your own ability to know what your method does, because the scatter you report is no longer the scatter you got. Repeating until the fifth agrees is the same offence in slow motion: you have not measured the method, you have selected the method's best behaviour, and the precision you report is a work of fiction. The honest path is also the useful one: check the notebook for a cause (a spill, an overshoot, a transcription slip); if a documented physical reason exists, exclude the value with the reason stated; if none exists, the point stays, and the wide scatter is the truth about your method — and the truth, written down, is what [[#def-integrity]] is for.
:::
:::

Integrity is not only virtue; it is load-bearing. Science works because strangers trust each other's published numbers — trust that is why you can cite a melting point you never measured — and every unrepeated result spends a little of that trust. This is the bargain of 1661, and its machinery is older than anyone expected.

::: history
In January 1665 the Royal Society of London began printing the *Philosophical Transactions* — the first scientific journal. Its secretary, Henry Oldenburg, ran it on a network of correspondence spanning Europe, and it survived on a device so plain we no longer notice it: a date on every letter, so that priority could be settled and ideas attributed to the person who had them first. The journal was the institutional half of the bargain Robert Boyle had struck in 1661 with *The Sceptical Chymist*: publish the whole method, dated and dated-in, so that someone else can repeat it — and let repetition, not authority, decide what becomes knowledge. Three and a half centuries later the bargain is the same one, and so is its shadow. When a published result cannot be repeated and the authors or the journal admit it, a retraction notice is printed: the same bargain seen from the other side, and the standing proof that the date, the notebook and the complete method have been the real currency of science since Oldenburg's day.
:::

## Where this leads

The professional form of everything in this chapter is quality assurance: [[analytical-chemistry/analytical-process]] is where accredited laboratories turn honest notebooks into control charts, certified reference materials, audits and documented uncertainty budgets — the same duties, with a standard attached. The full statistics behind the $\pm$ sign — $t$-tests, $F$-tests, outlier tests, calibration lines with their confidence and prediction bands — is [[analytical-chemistry/statistics-calibration]], and the figure-counting and unit discipline you have been using since the first chapter goes back to [[general-chemistry-1/matter-measurement]]. Beyond this course, the arithmetic of trust runs through everything: the equilibrium constant you measure in physical chemistry, the yield you report in organic, the spectrum you hand in in spectroscopy will all be judged exactly as this chapter says — by the notebook behind them, the uncertainty inside them, and the honesty of the report around them.

::: summary
- An experiment is finished when someone else could repeat it from what you wrote; that sentence, Boyle's bargain of 1661, is the source of every rule in this chapter.
- The notebook: at the bench, in ink, as it happens; corrections struck once, initialled and dated; if it is not in the notebook, it did not happen.
- The report has a shape with duties: abstract written last, results without interpretation, discussion with citations, a conclusion no larger than the data.
- Report value $\pm$ uncertainty, the two agreeing in decimal place, the uncertainty to one (rarely two) significant figures, and say whether the $\pm$ is a standard uncertainty or a stated interval.
- The mean of $n$ independent readings has $u_{\bar{x}} = s/\sqrt{n}$: the second replicate is worth having, the tenth rarely is; for small $n$ use the $t$-factor, not 2.
- Every number you did not measure needs a source; copying sentences is plagiarism even with perfect chemistry — paraphrase, and cite.
- Fabrication, falsification, plagiarism: the grey zones are black. A documented reason removes data, a feeling does not, and negative results are results.
:::

## Exercises

::: exercise Pairing value and uncertainty {level=1}
Each pair below comes from a student's report. Round and pair each correctly, or explain why it cannot be paired as written: (a) $c = 0.102547 \pm 0.0003\ \mathrm{mol\,dm^{-3}}$; (b) $m = 0.52 \pm 0.0003\ \mathrm{g}$; (c) $V = 24.9912 \pm 0.02\ \mathrm{cm^3}$; (d) $T = 25.0 \pm 5\,^{\circ}\mathrm{C}$.
::: solution
(a) The uncertainty already has one significant figure; round the value to the same decimal place: $c = 0.1025 \pm 0.0003\ \mathrm{mol\,dm^{-3}}$. (b) Inconsistent: the uncertainty claims knowledge of the fourth decimal place while the value stops at the second. Either the balance was read to $0.01\ \mathrm{g}$ — in which case $u = 0.0003\ \mathrm{g}$ is impossible — or the value was rounded before pairing; write $0.5200 \pm 0.0003\ \mathrm{g}$ only if the notebook really reads $0.5200$. (c) Round the value to the hundredths place where the uncertainty lives: $V = 24.99 \pm 0.02\ \mathrm{cm^3}$. (d) The uncertainty is in the units place, so the value belongs there too: $T = 25 \pm 5\,^{\circ}\mathrm{C}$.
:::
:::

::: exercise Which section? {level=1}
Say which section of a report each sentence belongs in, and why: (i) "The mean titre was $24.86\ \mathrm{cm^3}$ ($n = 5$, $s = 0.04\ \mathrm{cm^3}$)." (ii) "The lower yield suggests incomplete esterification." (iii) "The pipette was rinsed three times with the stock solution." (iv) "We determined the ethanoic acid content of vinegar by titration; the result was $0.847 \pm 0.004\ \mathrm{mol\,dm^{-3}}$."
::: solution
(i) Results — a measurement with its uncertainty, no interpretation attached. (ii) Discussion — an interpretation of the results, and it should cite the literature yield it implies a shortfall from. (iii) Procedure — what was done, in past tense. (iv) Abstract — what was done and the headline number with its uncertainty, in one sentence of the paragraph written last and read first.
:::
:::

::: exercise Citation or not {level=1}
Decide whether each sentence needs a citation: (a) "Concentrated sulfuric acid is corrosive." (b) "The fraction collected boiled at $117$–$119\ ^{\circ}\mathrm{C}$." (c) "The literature boiling point of the product is $118\ ^{\circ}\mathrm{C}$."
::: solution
(a) No — common knowledge for the intended readers (and the safety data sheet behind it belongs to the risk assessment, not the report; see [[laboratory-methods/lab-safety]]). A less familiar hazard statement — a specific exposure limit, say — would need the sheet cited. (b) No — your own observation, from your own thermometer. (c) Yes — a literature value you are comparing against needs its source named; the comparison in the Discussion is only checkable if the reader can find the $118\ ^{\circ}\mathrm{C}$.
:::
:::

::: exercise Mean, scatter and a 95 % interval {level=2 check="0.00052"}
Four weighings of the same dried precipitate give $0.5012$, $0.5008$, $0.5016$ and $0.5012\ \mathrm{g}$. Compute the mean, the sample standard deviation, and the half-width of the $95\ \%$ confidence interval for the mean, using $t = 3.18$ for $n - 1 = 3$ degrees of freedom. Report the mass properly. (Enter the half-width of the $95\ \%$ interval in $\mathrm{g}$, to five decimal places.)
::: solution
The mean is $(0.5012 + 0.5008 + 0.5016 + 0.5012)/4 = 2.0048/4 = 0.5012\ \mathrm{g}$. The deviations are $0$, $-0.0004$, $+0.0004$, $0\ \mathrm{g}$; their squares sum to $3.2\times10^{-7}\ \mathrm{g^2}$, so
$$
s = \sqrt{\frac{3.2\times10^{-7}}{3}} = 0.00033\ \mathrm{g},
\qquad
u_{\bar{x}} = \frac{s}{\sqrt{4}} = 0.00016\ \mathrm{g}.
$$
The half-width is $t\,u_{\bar{x}} = 3.18 \times 0.000163 = 0.00052\ \mathrm{g}$, and the report reads $0.5012 \pm 0.0005\ \mathrm{g}$ ($95\ \%$ confidence, $n = 4$) — uncertainty to one significant figure, value rounded to match.
:::
:::

::: exercise Three faults {level=2}
Find the three faults in this paragraph, written as the Results section of a titration report: "The titration was repeated five times and the average was $24.86\ \mathrm{cm^3}$, which agrees well with the expected value of $25.00\ \mathrm{cm^3}$. The results are shown in Figure 1. The method is accurate because the standard deviation was small."
::: solution
(1) A mean without an uncertainty or scatter: the number that tells the truth — the $\pm$ — is missing, so the reader cannot use the value at all. (2) "Agrees well with the expected value" is interpretation inside Results, and it is unsupported even in a Discussion: the difference of $0.14\ \mathrm{cm^3}$ is larger than any honest uncertainty for a titration of this kind ([[#ex-titration-95]] gave $\pm 0.06\ \mathrm{cm^3}$ at $n = 5$), so with intervals attached the sentence would read "differs from the expected value, probably by a systematic error" — a different and more interesting Discussion. (3) "Accurate because the standard deviation was small" confuses precision with accuracy: a small standard deviation shows the readings agree with each other, not with the truth ([[laboratory-methods/measurement-uncertainty]]). (A fourth fault is there if you looked: Figure 1 is invoked with no caption that stands alone.)
:::
:::

::: exercise The fifth mass {level=2}
Five masses are recorded: $0.5012$, $0.5008$, $0.5016$, $0.5010$ and $0.5312\ \mathrm{g}$. The notebook entry for the fifth reads: "beaker looked damp; wiped it out with a tissue and re-weighed." Decide what to do with the fifth value and justify the decision: what may be removed, what must remain in the record, and what the report should say.
::: solution
The fifth value sits $0.0300\ \mathrm{g}$ above the mean of the other four ($0.50115\ \mathrm{g}$), about ninety times their standard deviation ($0.00034\ \mathrm{g}$) — it is not the same experiment. The notebook supplies a documented physical cause: a damp beaker (water has mass), "wiped out with a tissue" (fibres and fingerprints have mass), and a re-weighing whose history is now muddied. A documented reason removes data, so the fifth value may be excluded from the mean — but it stays in the notebook, struck once, initialled and dated, never erased, because the notebook is the legal record and the exclusion is the thing that must be visible, not the value. The report states the exclusion and its reason in one sentence, then reports the mean of the remaining four with its uncertainty. Had the notebook said nothing — had the point "just looked wrong" — the point would have stayed in, scatter and all.
:::
:::

::: exercise Derive the square-root law {level=3}
Starting from $\bar{x} = \frac{1}{n}\sum_{i=1}^{n} x_i$ and the rule that variances of independent quantities add, derive $u_{\bar{x}} = s/\sqrt{n}$. Name every rule used and say where independence is needed. Then explain why the standard deviation of individual readings, $s$, does not shrink with $n$ while $u_{\bar{x}}$ does.
::: hint
Two rules do all the work: variances of independent variables add, and a constant factor leaves a variance squared, $\operatorname{var}(aX) = a^{2}\operatorname{var}(X)$. Apply the second to the factor $1/n$ before applying the first to the sum.
:::
::: solution
$$
\operatorname{var}(\bar{x}) = \operatorname{var}\!\left(\frac{1}{n}\sum_{i=1}^{n} x_i\right) = \frac{1}{n^{2}}\sum_{i=1}^{n}\operatorname{var}(x_i) = \frac{n\,s^{2}}{n^{2}} = \frac{s^{2}}{n},
$$
where the first equality is the definition of $\bar{x}$, the second pulls out $1/n$ squared (rule: $\operatorname{var}(aX) = a^{2}\operatorname{var}(X)$), the third adds the variances (rule: variances of independent quantities add — this is where independence is needed, because correlated readings would leave covariance terms behind), and the fourth uses $\operatorname{var}(x_i) = s^{2}$ for every reading. Taking the square root, $u_{\bar{x}} = s/\sqrt{n}$. As for the difference between $s$ and $u_{\bar{x}}$: $s$ estimates the scatter of the measurement process itself — a property of the balance, the glassware and you — and more readings do not change the process, so $s$ converges to a fixed value. $u_{\bar{x}}$ is the uncertainty of one particular estimate, the mean of the $n$ readings you actually took; averaging cancels positive against negative deviations, and the cancellation improves as $\sqrt{n}$. More readings do not make each reading better; they make the average better, which is a different and cheaper thing.
:::
:::

::: exercise A Results sentence and a Discussion sentence {level=3}
You determine the ethanoic acid concentration of a vinegar sample in five independent aliquots: $0.842$, $0.851$, $0.846$, $0.849$ and $0.845\ \mathrm{mol\,dm^{-3}}$. The literature value for this product is $0.850\ \mathrm{mol\,dm^{-3}}$. (a) Write the sentence this belongs in the Results section. (b) Write the sentence this belongs in the Discussion section. (c) Say whether the data support the literature value at the $95\ \%$ level, using $t = 2.78$ for $n - 1 = 4$ degrees of freedom.
::: solution
The mean is $\bar{x} = 4.233/5 = 0.8466\ \mathrm{mol\,dm^{-3}}$; the deviations are $-0.0046$, $+0.0044$, $-0.0006$, $+0.0024$, $-0.0016$, whose squares sum to $4.92\times10^{-5}\ \mathrm{mol^2\,dm^{-6}}$, so $s = \sqrt{4.92\times10^{-5}/4} = 0.0035\ \mathrm{mol\,dm^{-3}}$ and $u_{\bar{x}} = 0.0035/\sqrt{5} = 0.0016\ \mathrm{mol\,dm^{-3}}$. The $95\ \%$ half-width is $2.78 \times 0.0016 = 0.0044\ \mathrm{mol\,dm^{-3}}$. (a) Results: "The ethanoic acid concentration of the vinegar was $(0.847 \pm 0.004)\ \mathrm{mol\,dm^{-3}}$ ($95\ \%$ confidence, $n = 5$)." (b) Discussion: "This mean is $0.4\ \%$ below the literature value of $0.850\ \mathrm{mol\,dm^{-3}}$ [source]; the $95\ \%$ interval, $0.842$–$0.851\ \mathrm{mol\,dm^{-3}}$, contains the literature value, so the difference is not significant at the $95\ \%$ level." (c) Yes — the interval contains $0.850$, so the data are consistent with the literature value at $95\ \%$. Two honest footnotes belong with that sentence: the interval contains $0.850$ only just (the upper limit is $0.851$), so a larger $n$ might resolve a real difference; and "not significant" is not "proves equal" — it says the data do not show a difference, which is all a Discussion may claim.
:::
:::
