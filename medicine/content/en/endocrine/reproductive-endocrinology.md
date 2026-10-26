Reproduction depends on a hormonal conversation between the hypothalamus, the pituitary and the gonads. In women, that conversation runs in a monthly cycle that ends in ovulation or menstruation; in men, it holds sperm production and testosterone steady. The same axis switches on at puberty and, in women, winds down at the menopause. Most reproductive endocrine problems can be worked out by asking where in the axis the fault lies, using the paired-results logic of [[endocrine/hypothalamus-pituitary]].

This lesson covers the hypothalamic–pituitary–gonadal axis and its feedback, the menstrual cycle, puberty and its disorders, amenorrhoea and polycystic ovary syndrome, premature ovarian insufficiency and the menopause, and male hypogonadism. Fertility treatment, contraception and gynaecological disease are covered in [[obstetrics-gynaecology/contraception-fertility]] and [[obstetrics-gynaecology/menopause]].

## The hypothalamic–pituitary–gonadal axis {#sec-axis}

Neurons in the hypothalamus release **gonadotrophin-releasing hormone (GnRH)** in pulses, roughly once every one to two hours in adults. These neurons are themselves driven by **kisspeptin**-secreting neurons, which integrate signals about energy stores, stress and sex steroids. GnRH acts on pituitary gonadotroph cells to release **luteinising hormone (LH)** and **follicle-stimulating hormone (FSH)**.

::: definition Gonadotrophin actions {#def-axis}
**In the testis**: LH stimulates **Leydig cells** to make testosterone. FSH, with high local testosterone, acts on **Sertoli cells** to support sperm production (spermatogenesis); Sertoli cells secrete **inhibin B**, which feeds back to suppress FSH.

**In the ovary**, the **two-cell model** applies: LH stimulates **theca cells** to make androgens (androstenedione and testosterone), and FSH stimulates **granulosa cells** to convert those androgens into oestradiol using the enzyme **aromatase**. FSH also recruits and grows follicles. After ovulation, the follicle becomes the **corpus luteum**, which secretes progesterone and oestradiol under LH stimulation. Granulosa cells secrete **inhibin** and **anti-Müllerian hormone (AMH)**; AMH reflects the number of small growing follicles and is used as a marker of ovarian reserve.
:::

::: theorem Pulsatile GnRH stimulates; continuous GnRH suppresses {#thm-pulsatility}
The pituitary responds to GnRH only when it arrives in pulses. Continuous exposure to GnRH, or to a long-acting GnRH agonist, first causes a brief surge of LH and FSH (the "flare") and then **desensitises** the gonadotrophs, so LH, FSH and sex steroids fall to castrate levels within a few weeks.
:::

::: proof
GnRH receptors on gonadotrophs are G-protein-coupled receptors. After activation they are internalised and must be recycled to the cell surface, and the intracellular signalling pathway needs time to reset. Pulses separated by an hour or more allow full recovery between signals. Constant stimulation keeps receptors internalised and uncoupled, so the cell stops responding. Clinically this is exploited in two opposite directions: **pulsatile** GnRH given by pump can restore ovulation in women with hypothalamic amenorrhoea, while **continuous** GnRH agonists (such as leuprorelin, goserelin and triptorelin) suppress the axis to treat prostate cancer, endometriosis and central precocious puberty. GnRH **antagonists** suppress immediately, without a flare.
:::

### Feedback in the two sexes

In men, testosterone (partly after conversion to oestradiol) and inhibin B exert **negative feedback**, keeping LH, FSH and testosterone fairly steady.

In women, oestradiol also exerts negative feedback for most of the cycle. But when oestradiol from a dominant follicle stays high (above roughly 700 pmol/L) for about 36–48 hours, feedback switches to **positive**: GnRH and pituitary responsiveness rise sharply, producing the **LH surge** that triggers ovulation about 36 hours later. Positive feedback is unusual in physiology because it is self-amplifying; here it produces a single, sharp, timed event, after which the corpus luteum's progesterone restores negative feedback.

## The menstrual cycle {#sec-cycle}

A typical cycle lasts 21 to 35 days, counted from the first day of bleeding.

1. **Follicular phase.** As the previous corpus luteum fails, oestradiol, progesterone and inhibin fall, so FSH rises and recruits a group of follicles. One becomes **dominant**: it has the most FSH receptors and aromatase, and its rising oestradiol suppresses FSH, starving the other follicles, which become atretic. Oestradiol makes the endometrium proliferate. The length of the follicular phase varies, and it accounts for most variation in cycle length.
2. **Ovulation.** Sustained high oestradiol triggers the LH surge (positive feedback); the oocyte is released about 36 hours after the surge begins.
3. **Luteal phase.** The corpus luteum secretes progesterone, which transforms the endometrium to a secretory state for implantation and raises basal body temperature by about 0.3–0.5 °C. The luteal phase is relatively constant at about **14 days**. Without pregnancy, the corpus luteum regresses, progesterone falls, and the endometrium is shed as menstruation. If an embryo implants, **human chorionic gonadotrophin (hCG)** from the trophoblast rescues the corpus luteum.

Because the luteal phase is constant, a progesterone level to confirm ovulation is timed **seven days before the expected period**, not automatically on day 21. In a 28-day cycle that is day 21; in a 35-day cycle it is day 28. A mid-luteal progesterone above about 30 nmol/L is generally taken as evidence of ovulation.

::: widget plot
f: 6 + 60*exp(-(x-14)^2/1.2); 4 + 22*exp(-(x-13)^2/8) + 12*exp(-(x-21)^2/12); 1 + 30*exp(-(x-21)^2/10)
x: 0, 28
y: 0, 70
vlines: 14
labels: \text{LH}; \text{Oestradiol}; \text{Progesterone}
caption: A schematic 28-day menstrual cycle (days on the horizontal axis; relative hormone levels, arbitrary units). Oestradiol rises from the dominant follicle and triggers the LH surge by positive feedback; ovulation follows (vertical line). Progesterone from the corpus luteum peaks about seven days after ovulation. Shapes are illustrative, not measured values.
:::

## Puberty {#sec-puberty}

Puberty begins when the GnRH pulse generator is reactivated after its childhood quiescence. In girls, the first sign is usually breast budding (**thelarche**), typically between 8 and 13 years, followed by pubic hair, the growth spurt and, about two to three years after thelarche, **menarche**. In boys, the first sign is testicular enlargement to a volume of 4 mL or more, typically between 9 and 14 years, with the growth spurt later in puberty than in girls. Pubertal stages are recorded with the **Tanner** scale. Adrenal androgens independently cause pubic and axillary hair and body odour (**adrenarche**).

::: definition Precocious and delayed puberty {#def-puberty}
**Precocious puberty** is the onset of secondary sexual characteristics before age 8 in girls or 9 in boys. It is **central** (gonadotrophin-dependent) when the axis has switched on early, with raised LH and FSH; or **peripheral** (gonadotrophin-independent) when sex steroids come from elsewhere (an ovarian or testicular tumour, congenital adrenal hyperplasia, exogenous steroids, McCune–Albright syndrome), with suppressed LH and FSH.

**Delayed puberty** is the absence of breast development by 13 in girls or of testicular enlargement by 14 in boys. Causes are **constitutional delay** of growth and puberty (common, often familial, especially in boys); **hypogonadotrophic hypogonadism** from chronic illness, undernutrition, excessive exercise, hypopituitarism or congenital GnRH deficiency (**Kallmann syndrome** when combined with a reduced or absent sense of smell); and **hypergonadotrophic hypogonadism** from gonadal failure, classically **Turner syndrome** (45,X) in girls and **Klinefelter syndrome** (47,XXY) in boys.
:::

Central precocious puberty is much more common in girls, in whom it is usually idiopathic; in boys an intracranial cause is more often found, so imaging is routine. Treatment with a long-acting GnRH agonist halts progression ([[#thm-pulsatility]]). Growth and pubertal assessment is described in [[paediatrics/growth-development]].

## Amenorrhoea and polycystic ovary syndrome {#sec-female}

::: definition Amenorrhoea {#def-female}
**Primary amenorrhoea** is the absence of menstruation by age 15 in someone with normal secondary sexual characteristics, or by 13 with no secondary sexual development. **Secondary amenorrhoea** is the absence of periods for three months or more in someone who previously had regular cycles, or six months in someone with irregular cycles. **Oligomenorrhoea** is infrequent periods, with cycles longer than 35 days.
:::

The first test for amenorrhoea in anyone who could be pregnant is a **pregnancy test**. After that, the causes are best organised by level of the axis:

| Level | Examples | Typical results |
|---|---|---|
| Hypothalamus | Functional hypothalamic amenorrhoea (low energy availability, weight loss, excessive exercise, stress); Kallmann syndrome | Low or low-normal LH, FSH and oestradiol |
| Pituitary | Hyperprolactinaemia; pituitary tumour; Sheehan syndrome | High prolactin, or low gonadotrophins |
| Ovary | Polycystic ovary syndrome; premature ovarian insufficiency; Turner syndrome | PCOS: normal FSH, often raised LH and androgens. POI: high FSH, low oestradiol |
| Outflow tract | Asherman syndrome (intrauterine adhesions); congenital anomalies such as imperforate hymen or Müllerian agenesis | Normal hormones |
| Other endocrine | Thyroid disease; congenital adrenal hyperplasia; Cushing's syndrome | As for each condition |

Basic investigations are therefore hCG, FSH, LH, oestradiol, prolactin, TSH and testosterone, with pelvic ultrasound as indicated.

**Functional hypothalamic amenorrhoea** results when energy intake is too low for energy expenditure, often with psychological stress. The hypothalamus reduces GnRH pulses to conserve energy. It is common in athletes, dancers and people with eating disorders, and is part of the wider syndrome now called **relative energy deficiency in sport (RED-S)**. The low oestrogen state causes bone loss and stress fractures. The treatment is to restore energy availability; the combined pill produces withdrawal bleeds but does not fix the underlying problem or protect bone as well.

### Polycystic ovary syndrome

**Polycystic ovary syndrome (PCOS)** is the commonest endocrine disorder in women of reproductive age, affecting about one in ten. The 2023 International Evidence-based Guideline for the Assessment and Management of PCOS uses refined Rotterdam criteria: in adults, diagnosis requires two of

1. **ovulatory dysfunction** (irregular cycles);
2. **hyperandrogenism**, clinical (hirsutism, acne, androgenic hair loss) or biochemical (raised testosterone or free androgen index);
3. **polycystic ovarian morphology** on ultrasound, or a raised **AMH**,

after excluding other causes such as thyroid disease, hyperprolactinaemia and non-classic congenital adrenal hyperplasia. If an adult has both irregular cycles and hyperandrogenism, ultrasound and AMH are not needed. In adolescents, both irregular cycles and hyperandrogenism are required, and ultrasound and AMH are not used, because multifollicular ovaries and irregular cycles are normal for several years after menarche.

**Insulin resistance** is central to PCOS in many people, regardless of weight; high insulin stimulates theca-cell androgen production and lowers **sex hormone-binding globulin (SHBG)**, raising free testosterone. PCOS is associated with type 2 diabetes, gestational diabetes, dyslipidaemia, sleep apnoea, depression and anxiety, and, with infrequent periods, endometrial hyperplasia, because oestrogen acts unopposed on the endometrium without progesterone.

The **free androgen index** estimates the fraction of testosterone not bound to SHBG:

$$
\text{FAI} = 100 \times \frac{\text{total testosterone (nmol/L)}}{\text{SHBG (nmol/L)}}
$$ {#eq-fai}

Management is tailored to the person's priorities:

- **Healthy lifestyle and weight management** where appropriate, which can restore ovulation in some.
- **Irregular cycles and endometrial protection**: the combined oral contraceptive pill, or cyclical progestogen to induce regular withdrawal bleeds.
- **Hirsutism**: the combined pill, cosmetic measures, eflornithine cream, and in some cases anti-androgens (with reliable contraception, because they can affect a male fetus).
- **Fertility**: **letrozole** (an aromatase inhibitor) is the first-line drug for ovulation induction, with metformin, gonadotrophins and IVF as further options.
- **Metabolic screening**: regular checks for diabetes, blood pressure and lipids, and screening for mood disorders.

## Ovarian insufficiency and the menopause {#sec-menopause}

The ovary has a fixed supply of oocytes, laid down before birth, that falls steadily until it is exhausted. The **menopause** is the final menstrual period, recognised after 12 months without bleeding; in the UK the average age is 51. The years of irregular cycles and symptoms before it are the **perimenopause**. As follicles run out, inhibin and oestradiol fall and FSH rises.

Symptoms include **vasomotor symptoms** (hot flushes and night sweats), sleep disturbance, mood changes, difficulty concentrating, joint aches, reduced libido, and **genitourinary syndrome of menopause** (vaginal dryness, discomfort with sex, urinary frequency and recurrent infections). Over the longer term, oestrogen loss accelerates bone loss and increases cardiovascular risk.

NICE guideline NG23 (Menopause: identification and management, updated in 2024) advises that perimenopause and menopause are diagnosed clinically in women over 45 with typical symptoms, without an FSH test. FSH can be useful in women aged 40–45 with symptoms and in those under 40 with suspected premature ovarian insufficiency.

**Hormone replacement therapy (HRT)** is the most effective treatment for vasomotor symptoms. Its principles are:

- People with a uterus need **oestrogen with a progestogen**, because oestrogen alone causes endometrial hyperplasia and cancer. People who have had a hysterectomy can take oestrogen alone.
- **Transdermal** oestrogen (patch, gel or spray) does not increase the risk of venous thromboembolism above baseline, unlike oral oestrogen, and is preferred when that risk is a concern.
- Combined HRT is associated with a small increase in breast cancer risk related to duration of use; oestrogen-only HRT has little or no increase. NICE's 2024 update presents these risks in absolute numbers to support decisions.
- **Vaginal oestrogen** treats genitourinary symptoms with minimal systemic absorption and can be used long term.
- Non-hormonal options include cognitive behavioural therapy (recommended by NICE for vasomotor and mood symptoms), and some medicines for people who cannot or do not want to take HRT.

Decisions about HRT are individual and shared, weighing symptom relief and bone protection against risks.

::: definition Premature ovarian insufficiency {#def-poi}
**Premature ovarian insufficiency (POI)** is loss of ovarian activity before age 40. The 2024 ESHRE guideline (developed with ASRM and the International Menopause Society) diagnoses it from oligo- or amenorrhoea for at least four months together with **one** FSH level above 25 IU/L; a repeat FSH or AMH is used when the diagnosis is uncertain. It affects about 1–4% of women. Causes include chemotherapy and radiotherapy, surgery, autoimmune disease, genetic causes (Turner syndrome and its mosaic forms, **FMR1 premutation**), and infections, but most cases are unexplained.
:::

People with POI need **hormone replacement until at least the average age of the menopause**, to protect bone and cardiovascular health and relieve symptoms. This is replacement of what a woman of that age would normally have, so the risks quoted for HRT after the menopause do not apply in the same way. Spontaneous ovulation and pregnancy occasionally occur, so contraception is still needed if pregnancy is not wanted. The diagnosis can be devastating, particularly for fertility, and psychological support is part of care.

## Male hypogonadism {#sec-male}

::: definition Male hypogonadism {#def-male}
**Male hypogonadism** is a clinical syndrome of testosterone deficiency, impaired sperm production, or both. **Primary hypogonadism** (testicular failure) has low testosterone with **high** LH and FSH. **Secondary hypogonadism** (pituitary or hypothalamic) has low testosterone with low or inappropriately normal LH and FSH.
:::

Symptoms include reduced libido, erectile dysfunction, loss of morning erections, fatigue, reduced muscle mass, increased body fat, low mood, gynaecomastia, reduced body hair and, over time, osteoporosis. Many of these symptoms are nonspecific and common with age, obesity and chronic illness.

Testosterone has a diurnal rhythm and is lowered by food intake and acute illness, so it is measured **early in the morning (before 11 a.m.), fasting, and repeated** on a separate occasion before diagnosis. UK guidance from the British Society for Sexual Medicine suggests that a total testosterone below about 8 nmol/L usually indicates deficiency, while 8–12 nmol/L is a grey zone where free testosterone (calculated from SHBG) helps. LH, FSH, prolactin and SHBG are measured to locate the cause.

- **Primary causes**: **Klinefelter syndrome** (47,XXY, the commonest genetic cause, affecting about 1 in 600 males, with small firm testes and often tall stature), previous orchitis, chemotherapy or radiotherapy, trauma, undescended testes.
- **Secondary causes**: obesity and type 2 diabetes (functional and often reversible with weight loss), opioids, glucocorticoids, **anabolic–androgenic steroid** use (which suppresses LH and FSH, causing testicular atrophy and infertility that can persist after stopping), hyperprolactinaemia, pituitary tumours, haemochromatosis, Kallmann syndrome.

**Testosterone replacement** (gel or injection) relieves symptoms in confirmed deficiency. It suppresses LH and FSH and therefore sperm production, so it is **not** used in men who want fertility; they are treated with gonadotrophins instead. Monitoring includes haematocrit (testosterone stimulates erythropoiesis), prostate assessment according to guidance, and symptom response.

**Gynaecomastia**, enlargement of male breast glandular tissue, reflects an increased ratio of oestrogen to androgen action. It is normal in newborns and common in puberty. Other causes include obesity (where it may be fatty rather than glandular), drugs (spironolactone, anti-androgens, anabolic steroids, cannabis), liver disease, hypogonadism, hyperthyroidism and, rarely, oestrogen- or hCG-secreting tumours, including testicular tumours. Any hard, eccentric or rapidly growing mass needs assessment for breast cancer.

::: warning Do not diagnose low testosterone from one random sample
Testosterone can fall by a quarter or more after a meal or glucose load, is lower in the afternoon, and falls during any acute illness. A single non-fasting afternoon sample, or one taken during illness, frequently gives a falsely low result and can lead to unnecessary lifelong treatment that suppresses fertility. Repeat a fasting early-morning sample when the person is well, and measure LH and FSH before starting treatment.
:::

::: example Timing the progesterone {#ex-progesterone}
A 31-year-old woman trying to conceive has regular cycles of 33 days. Her GP requested a "day 21 progesterone", which came back at 6 nmol/L. Does this show she is not ovulating?
::: solution
No. The luteal phase is about 14 days, so ovulation in a 33-day cycle is around day $33 - 14 = 19$, and the mid-luteal peak in progesterone is about seven days later, on day $33 - 7 = 26$. On day 21 she is only about two days after ovulation, before progesterone has risen fully, so a low value is expected even if she ovulates.

The test should be repeated on about **day 26** (seven days before her next expected period). A value above about 30 nmol/L would confirm ovulation. If the period arrives earlier than expected, the result should be interpreted against the actual day of the next period.
:::
:::

::: example A young woman whose periods stopped {#ex-hypothalamic}
A 22-year-old university athlete has had no periods for eight months. She runs 80 km a week, has lost 6 kg this year and has a BMI of 18. Pregnancy test negative. LH 1.2 IU/L, FSH 2.8 IU/L, oestradiol 60 pmol/L (low), prolactin and TSH normal. She had a metatarsal stress fracture last month. What is the diagnosis and what are the priorities?
::: solution
Low oestradiol with low LH and FSH means the problem is central (hypothalamic or pituitary). With normal prolactin and TSH, high training volume, weight loss and low BMI, the diagnosis is **functional hypothalamic amenorrhoea** as part of **relative energy deficiency in sport (RED-S)**. Low energy availability has suppressed GnRH pulses.

Her stress fracture suggests bone health is already affected; low oestrogen and low energy availability both reduce bone formation. A **DXA scan** is appropriate.

**Priorities**: increase energy availability (more intake and/or less training), with support from a sports medicine doctor, dietitian and, if there are features of disordered eating, a psychologist ([[psychiatry/eating-personality-disorders]]). The combined pill would produce bleeds but would not correct the energy deficit and is not the main treatment. Periods usually return when energy balance is restored. Screening questions for an eating disorder should be asked sensitively.
:::
:::

::: example A tired weightlifter {#ex-male-hypo}
A 29-year-old man and his partner have been trying to conceive for 14 months. He has low libido and small testes. Early-morning fasting testosterone 3.1 nmol/L, LH 0.4 IU/L, FSH 0.3 IU/L, haemoglobin 182 g/L. Semen analysis shows no sperm. He trains in a gym five days a week. What should be asked, and what is the likely explanation?
::: solution
Low testosterone with **suppressed** LH and FSH is secondary hypogonadism, and a high haemoglobin in a young man is an important clue. The most likely explanation is **anabolic–androgenic steroid use**: exogenous androgens suppress GnRH, LH and FSH, so the testes shrink and stop producing sperm; measured testosterone is low if he has recently stopped or uses compounds not detected by the assay.

He should be asked, without judgement, about anabolic steroids, other performance-enhancing drugs and supplements. If confirmed, stopping is the first step. Recovery of the axis may take months and sometimes requires specialist treatment with hCG or other agents to restart sperm production. Testosterone therapy would make his infertility worse. If he denies use, he needs prolactin, other pituitary hormones and pituitary imaging. He should also be checked for cardiovascular and liver effects of steroid use, and harm-reduction advice offered ([[psychiatry/substance-use]]).
:::
:::

::: example Hirsutism and irregular cycles {#ex-pcos}
A 26-year-old woman of South Asian heritage has cycles every 45–90 days since menarche and excess facial and abdominal hair. Testosterone 2.4 nmol/L, SHBG 20 nmol/L, prolactin and TSH normal, 17-hydroxyprogesterone normal. Calculate the free androgen index and discuss the diagnosis and screening.
::: solution
Using [[#eq-fai]]:

$$
\text{FAI} = 100 \times \frac{2.4}{20} = 12.
$$

This is above typical female reference values (often quoted as below about 5, though laboratories vary), confirming biochemical hyperandrogenism. The low SHBG, often a marker of insulin resistance, contributes.

She has irregular cycles and hyperandrogenism, and other causes (hyperprolactinaemia, thyroid disease, non-classic congenital adrenal hyperplasia) have been excluded. She meets criteria for **PCOS** without needing an ultrasound or AMH.

**Screening**: an assessment for type 2 diabetes (people of South Asian heritage with PCOS are at particularly high risk; an oral glucose tolerance test is often preferred), blood pressure, lipids, and screening for depression and anxiety. Management is guided by her priorities: hirsutism treatment, cycle regulation and endometrial protection, and fertility planning when relevant. A very high testosterone (for example above about 5 nmol/L) or rapid virilisation would instead prompt investigation for an androgen-secreting tumour.
:::
:::

::: quiz
A 38-year-old woman has had no periods for six months. FSH is 68 IU/L and oestradiol is low. Pregnancy test is negative. Which statement is correct?
- [ ] She has hypothalamic amenorrhoea and needs weight gain.
- [x] She has premature ovarian insufficiency and should be offered hormone replacement until at least the average age of the menopause.
- [ ] HRT is contraindicated because of breast cancer risk.
- [ ] Pregnancy is impossible, so contraception is unnecessary.
::: solution
Amenorrhoea for more than four months with an FSH above 25 IU/L before age 40 meets the ESHRE 2024 criteria for POI. Hormone replacement protects bone and cardiovascular health and is replacing normal physiology for her age. Spontaneous ovulation can still occasionally occur, so contraception is needed if pregnancy is not wanted.
:::
:::

::: history
In 1935 **Irving Stein** and **Michael Leventhal** described women with amenorrhoea, hirsutism and enlarged polycystic ovaries, the syndrome now called PCOS. **Gregory Pincus** and **John Rock** developed the combined oral contraceptive pill, first approved in the United States in 1960. In 1978 **Ernst Knobil** and colleagues showed in monkeys that the pituitary responds only to pulsatile GnRH and is switched off by continuous infusion, the basis of GnRH agonist therapy. In the same year **Louise Brown**, the first baby conceived by in vitro fertilisation, was born in Oldham after the work of **Robert Edwards** and **Patrick Steptoe**; Edwards received the Nobel Prize in 2010.
:::

## Where this leads

The obstetric and gynaecological aspects of fertility, contraception and the menopause are developed in [[obstetrics-gynaecology/contraception-fertility]], [[obstetrics-gynaecology/menstrual-pelvic-disorders]] and [[obstetrics-gynaecology/menopause]]. Chromosomal causes of hypogonadism are covered in [[genetics/chromosomal-disorders]], and bone loss in [[endocrine/bone-calcium]].

::: summary
- GnRH pulses drive LH and FSH; continuous GnRH (or an agonist) suppresses the axis after a flare.
- In the ovary, theca cells make androgens under LH and granulosa cells aromatise them to oestradiol under FSH.
- Sustained high oestradiol switches feedback from negative to positive, causing the LH surge and ovulation.
- The luteal phase is about 14 days: measure progesterone seven days before the next expected period.
- Precocious puberty is before 8 (girls) or 9 (boys); delayed puberty is no development by 13 (girls) or 14 (boys).
- Amenorrhoea: exclude pregnancy, then locate the level (hypothalamus, pituitary, ovary, outflow).
- PCOS (2023 guideline): two of ovulatory dysfunction, hyperandrogenism, and polycystic ovaries on ultrasound or raised AMH (adults), after excluding mimics.
- POI: before 40, amenorrhoea at least four months and one FSH above 25 IU/L; replace hormones until the average menopausal age.
- Diagnose the menopause clinically over 45 (NICE NG23); HRT with progestogen if the uterus is present; transdermal oestrogen does not raise VTE risk.
- Male hypogonadism: confirm with repeated fasting morning testosterone; LH and FSH separate primary from secondary; testosterone therapy suppresses fertility.
:::

## Exercises

::: exercise Locate the lesion {level=1}
Classify each as primary or secondary hypogonadism: (a) testosterone 4 nmol/L, LH 22 IU/L; (b) oestradiol low, FSH 2 IU/L, LH 1 IU/L; (c) testosterone 5 nmol/L, LH 3 IU/L (normal range).
::: solution
(a) Primary (testicular failure): high LH. (b) Secondary (hypothalamic or pituitary). (c) Secondary: an LH within the normal range is inappropriately low when testosterone is low.
:::
:::

::: exercise When to test {level=1 check="30-7"}
A woman has regular 30-day cycles. On which cycle day should a progesterone be taken to confirm ovulation?
::: solution
Seven days before the next expected period: day $30 - 7 = 23$.
:::
:::

::: exercise Definitions {level=1}
Define primary and secondary amenorrhoea.
::: solution
Primary: no menstruation by 15 with normal secondary sexual characteristics, or by 13 with no secondary sexual development. Secondary: no periods for three months or more after previously regular cycles, or six months after previously irregular cycles.
:::
:::

::: exercise The free androgen index {level=2 check="100*3.2/16"}
Calculate the free androgen index for total testosterone 3.2 nmol/L and SHBG 16 nmol/L.
::: solution
$100 \times 3.2 / 16 = 20$.
:::
:::

::: exercise The agonist {level=2}
A 7-year-old girl has breast development, a growth spurt and pubic hair. LH rises markedly after a GnRH stimulation test, and brain MRI is normal. Explain why she is treated with a long-acting GnRH agonist rather than an antagonist to the hormones being produced.
::: solution
She has **central precocious puberty**: the axis has switched on early, shown by the LH response. The aim is to switch the pituitary off at its source. A long-acting GnRH agonist provides continuous stimulation, which, after a brief flare, desensitises the gonadotrophs so LH, FSH and oestradiol fall ([[#thm-pulsatility]]). This halts puberty until an appropriate age, protecting adult height and allowing psychological development to keep pace. Blocking oestrogen at the tissue level would not stop the axis and would not address all of its effects.
:::
:::

::: exercise HRT counselling {level=2}
A 52-year-old woman with a uterus has severe hot flushes and a BMI of 34. She is worried about blood clots. Outline the key points of a discussion about HRT.
::: solution
HRT is the most effective treatment for vasomotor symptoms. Because she has a uterus, she needs oestrogen plus a progestogen (for example micronised progesterone or a levonorgestrel intrauterine system) to protect the endometrium. Her obesity raises her baseline VTE risk; **transdermal** oestrogen does not increase VTE risk above baseline, unlike oral oestrogen, so it is preferred. Combined HRT carries a small, duration-related increase in breast cancer risk, which should be expressed in absolute numbers. Benefits include symptom relief and bone protection. Non-hormonal options, including CBT, should also be offered. The decision is hers, revisited at regular reviews.
:::
:::

::: exercise A case with a differential {level=3}
A 17-year-old has primary amenorrhoea. She is 142 cm tall (below the 0.4th centile), has minimal breast development and a webbed neck. FSH is 88 IU/L. Give the most likely diagnosis, two alternatives, the confirmatory test, and the main elements of management.
::: hint
High FSH means the problem is in the ovary.
:::
::: solution
**Most likely diagnosis**: **Turner syndrome** (45,X or mosaic): short stature, absent or minimal pubertal development, webbed neck, and high FSH from ovarian failure (streak gonads).

**Alternatives**: other causes of premature ovarian insufficiency (for example after childhood cancer treatment, autoimmune, FMR1 premutation), which would not explain the short stature or webbed neck; 46,XY gonadal dysgenesis (Swyer syndrome), which presents with high FSH and absent puberty but normal or tall stature.

**Confirmatory test**: karyotype (with enough cells counted to detect mosaicism).

**Management**: oestrogen replacement started at low dose and increased gradually to induce puberty, then progestogen added for withdrawal bleeds; growth hormone was likely to have been offered in childhood had it been diagnosed earlier; screening for associated conditions (cardiac: bicuspid aortic valve and coarctation, with lifelong aortic surveillance; renal anomalies; hearing; thyroid and coeliac disease; diabetes); fertility counselling, including the possibility of egg donation, with specialist cardiac assessment before any pregnancy; and psychological support, ideally in a transition service ([[genetics/chromosomal-disorders]]).
:::
:::

::: exercise Interpret a borderline testosterone {level=3}
A 58-year-old man with obesity (BMI 38) and type 2 diabetes has fatigue and low libido. A non-fasting sample at 3 p.m. showed testosterone 7.5 nmol/L. Discuss the interpretation and plan.
::: solution
The sample is unreliable: non-fasting, afternoon and possibly during poor glycaemic control, all of which lower testosterone. Repeat a **fasting sample before 11 a.m.**, with LH, FSH, SHBG and prolactin.

Obesity lowers SHBG, which lowers total testosterone even when free testosterone is normal, so calculated free testosterone is useful. If testosterone is confirmed low with low or normal LH, the likeliest cause is **functional secondary hypogonadism** due to obesity and diabetes; other causes (opioids, glucocorticoids, hyperprolactinaemia, pituitary disease, haemochromatosis) should be excluded.

The first treatment is the underlying condition: weight loss (including GLP-1-based therapy or bariatric surgery where appropriate) can raise testosterone. Testosterone therapy may be considered after discussion if deficiency is confirmed and symptoms persist, with monitoring of haematocrit and prostate, and only if he does not want to father children. Erectile dysfunction in diabetes is often vascular or neuropathic and may respond to a PDE5 inhibitor regardless.
:::
:::
