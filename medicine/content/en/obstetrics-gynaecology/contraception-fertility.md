This chapter covers two sides of the same physiology. Contraception prevents pregnancy by interrupting a step in the chain from ovulation to implantation; subfertility care looks for the broken link in that chain when pregnancy does not happen and repairs or bypasses it. Both depend on the menstrual cycle and the hypothalamic–pituitary–ovarian axis, described in [[endocrine/reproductive-endocrinology]].

Both are also areas where numbers drive good counselling. A method that is "99% effective" may fail for one woman in ten in a year of real use, and a couple told they are "infertile" after a year usually have a substantial chance of conceiving naturally in the next year. Clinicians need to know these numbers and to explain them clearly. UK practice in this chapter follows the Faculty of Sexual and Reproductive Healthcare (FSRH), the UK Medical Eligibility Criteria for Contraceptive Use (UKMEC, 2016, amended 2019) and NICE CG156 (*Fertility problems*, 2013, updated 2017).

## How contraceptives work

Each method blocks one or more steps of reproduction:

- **Preventing ovulation.** Combined hormonal contraception (the pill, patch and vaginal ring), the injectable, the implant and the desogestrel progestogen-only pill suppress the mid-cycle LH surge through negative feedback on the hypothalamus and pituitary.
- **Blocking sperm.** Progestogens thicken cervical mucus, which becomes hostile to sperm. Barrier methods (condoms, diaphragms) physically separate sperm from the cervix. Vasectomy removes sperm from the ejaculate.
- **Preventing fertilisation or implantation.** Copper ions from an intrauterine device are toxic to sperm and eggs and cause an inflammatory reaction in the endometrium. The levonorgestrel intrauterine system mainly acts on the endometrium and cervical mucus.
- **Preventing fertilisation by timing or blocking the tubes.** Fertility awareness methods avoid intercourse around ovulation; female sterilisation occludes the fallopian tubes.

## Measuring effectiveness

::: definition Perfect use, typical use and the Pearl index {#def-efficacy}
**Perfect-use failure rate**: the percentage of women who become pregnant in the first year when the method is used correctly and consistently.

**Typical-use failure rate**: the percentage who become pregnant in the first year of real-world use, including missed pills, late injections and inconsistent condom use.

**Pearl index**: the number of pregnancies per 100 woman-years of use,
$$
\text{Pearl index} = \frac{\text{number of pregnancies} \times 1200}{\text{total months of exposure}}.
$$ {#eq-pearl}
:::

The gap between perfect and typical use is the key counselling point. For methods that depend on the user, typical use is much less effective. For long-acting methods that do not depend on the user, the two are almost the same.

| Method | Typical use (% pregnant in first year) | Perfect use (%) |
|---|---|---|
| Contraceptive implant | 0.05 | 0.05 |
| Levonorgestrel intrauterine system (LNG-IUS) | 0.2 | 0.2 |
| Copper intrauterine device (Cu-IUD) | 0.8 | 0.6 |
| Female sterilisation | 0.5 | 0.5 |
| Vasectomy | 0.15 | 0.1 |
| Progestogen-only injectable | 6 | 0.2 |
| Combined pill, patch or ring | 9 | 0.3 |
| Progestogen-only pill | 9 | 0.3 |
| Male condom | 18 | 2 |
| Fertility awareness methods | 24 | 0.4–5 |
| No method | 85 | 85 |

These are the figures quoted by the FSRH and the NHS, from Trussell's estimates for the United States (2011); they are approximate and vary between populations.

::: theorem Small annual risks accumulate {#thm-cumulative}
If a method has an annual failure rate $p$ and the risk is roughly the same each year, the probability of at least one pregnancy over $n$ years is
$$
P(\text{pregnancy within } n \text{ years}) = 1 - (1-p)^n.
$$ {#eq-cumulative}
For small $p$ and $n$, this is close to $np$.
:::

::: proof
The probability of no pregnancy in a single year is $1-p$. If years are independent, the probability of no pregnancy in $n$ consecutive years is the product $(1-p)^n$, and the probability of at least one pregnancy is the complement. For small $p$, the binomial expansion gives $(1-p)^n \approx 1 - np$, so the cumulative risk is approximately $np$. In practice the failure rate falls with time as couples become more experienced with a method, so the formula slightly overestimates the long-term risk; it remains a useful way to show why a method with a 9% annual failure rate is not a reliable method for someone who must avoid pregnancy for years.
:::

::: widget plot
f: 100*(1-(1-p/100)^x); 100*(1-(1-0.0005)^x)
x: 0, 10
y: 0, 100
sliders: p=9:0.05:30:0.05
labels: \text{method with annual failure } p\%; \text{implant (0.05\% per year)}
caption: Cumulative percentage of women who become pregnant (vertical axis) over years of use (horizontal axis), using the formula in the Principle. The slider sets the annual typical-use failure rate p. At 9%, the typical-use rate for the pill, more than a third of women would be expected to have at least one pregnancy over five years; with an implant, fewer than 1 in 300. This is a simplified model that assumes the same risk every year.
:::

::: example A Pearl index {#ex-pearl}
In a study of a new contraceptive vaginal ring, 400 women used the method for 24 months each, and 12 pregnancies occurred. Calculate the Pearl index.
::: solution
Total exposure is $400 \times 24 = 9600$ months. Using [[#eq-pearl]],
$$
\text{Pearl index} = \frac{12 \times 1200}{9600} = 1.5.
$$
There were 1.5 pregnancies per 100 woman-years of use. Note that this was measured in a trial, where use is usually more careful than in everyday life; the typical-use rate is likely to be higher.
:::
:::

## The methods

### Long-acting reversible contraception (LARC)

LARC methods are the implant, the intrauterine methods and the injectable. Because they do not depend on daily action, the implant and intrauterine methods are the most effective reversible methods, and NICE and the FSRH recommend that they be offered to all women seeking contraception.

- The **implant** is a flexible rod containing etonogestrel, inserted under the skin of the upper arm and effective for three years. It inhibits ovulation. Its main drawback is unpredictable bleeding, which is the commonest reason for removal. Fertility returns promptly after removal.
- The **LNG-IUS** releases levonorgestrel into the uterus. It is licensed for contraception for 5 to 8 years depending on the device. Most users have lighter periods, and many have none, so it is also a first-line treatment for heavy menstrual bleeding ([[obstetrics-gynaecology/menstrual-pelvic-disorders]]) and can provide the progestogen part of hormone replacement therapy.
- The **Cu-IUD** contains no hormone and is effective for 5 to 10 years depending on the device. Periods may become heavier and more painful. It is also the most effective method of emergency contraception.
- The **progestogen-only injectable** (medroxyprogesterone acetate) is given every 13 weeks. It inhibits ovulation. It causes a small, largely reversible loss of bone mineral density, may cause weight gain, and fertility can take up to a year to return after stopping.

Risks of intrauterine methods include pain at insertion, infection in the first three weeks (mainly if a sexually transmitted infection is present), expulsion (about 1 in 20), and perforation of the uterus (up to about 2 in 1,000 insertions, more often in breastfeeding women). If a pregnancy occurs with a device in place, the chance that it is ectopic is higher than usual, although the absolute risk of ectopic pregnancy is lower than with no contraception, because so few pregnancies occur.

### Combined hormonal contraception

**Combined hormonal contraception (CHC)** contains an oestrogen (usually ethinylestradiol) and a progestogen. It inhibits ovulation; the progestogen also thickens cervical mucus. It is available as a pill, a patch and a vaginal ring. Traditional regimens include a seven-day break each month that causes a withdrawal bleed; the FSRH supports tailored regimens with shorter or fewer breaks, which reduce the chance of ovulation after a missed pill and the frequency of bleeding.

**Benefits** besides contraception include lighter, more regular and less painful periods, improvement of acne, and a reduced risk of ovarian, endometrial and colorectal cancer that lasts for years after stopping.

**Risks.** The oestrogen component increases the production of clotting factors in the liver, which raises the risk of **venous thromboembolism**. The absolute risk is small but depends on the progestogen. The European Medicines Agency (2014) estimated the annual risk per 10,000 women as about 2 in non-users, 5–7 with pills containing levonorgestrel, norethisterone or norgestimate, and 9–12 with pills containing desogestrel, gestodene or drospirenone. For comparison, the risk in pregnancy and the postnatal period is much higher. CHC also slightly increases the risk of arterial disease (stroke and myocardial infarction), particularly in women who smoke, have hypertension or have migraine with aura, and slightly increases the risk of breast and cervical cancer while it is used.

::: definition The UK Medical Eligibility Criteria {#def-ukmec}
**UKMEC** classifies each method for each medical condition:
- **UKMEC 1**: no restriction on use.
- **UKMEC 2**: the advantages generally outweigh the theoretical or proven risks.
- **UKMEC 3**: the risks generally outweigh the advantages; use requires expert clinical judgement.
- **UKMEC 4**: an unacceptable health risk; the method should not be used.

Examples of UKMEC 4 conditions for combined hormonal contraception: migraine with aura; age 35 or over and smoking 15 or more cigarettes a day; blood pressure of 160/100 mmHg or more; a current or past VTE; a known thrombogenic mutation such as factor V Leiden; current breast cancer; ischaemic heart disease or stroke; and less than six weeks after birth in a breastfeeding woman.
:::

**Drug interactions.** Enzyme-inducing drugs, such as carbamazepine, phenytoin, rifampicin and St John's wort, increase the metabolism of the hormones in CHC, progestogen-only pills and the implant, and make them unreliable. They do not affect the injectable or intrauterine methods, which are therefore preferred for women taking these drugs.

### Progestogen-only pills

**Progestogen-only pills (POPs)** contain no oestrogen, so they can be used by most women who cannot take oestrogen, including women with migraine with aura, women over 35 who smoke, and breastfeeding women. The desogestrel POP inhibits ovulation and has a 12-hour window for a late pill; older POPs act mainly on cervical mucus and have a 3-hour window. Irregular bleeding is the main side effect. Some POPs can be bought from pharmacies in the UK without a prescription.

### Barrier methods, fertility awareness and sterilisation

**Condoms** are the only method that also protects against sexually transmitted infections, so they are recommended in addition to another method for people at risk. **Fertility awareness methods** identify fertile days using cycle length, basal body temperature and cervical secretions; they require training and motivation and are much less effective with typical use. **Female sterilisation**, by laparoscopic occlusion or removal of the tubes, is permanent and should be considered irreversible; its effectiveness is similar to LARC. **Vasectomy** is simpler, with fewer complications, but is not effective until semen analysis shows no sperm, usually after about 12 weeks.

::: example Choosing a method {#ex-ukmec}
A 37-year-old woman who smokes 20 cigarettes a day asks to start the combined pill because her periods are heavy and painful. Her blood pressure is 128/78 mmHg and her BMI 27. What would you advise?
::: solution
At 35 or over and smoking 15 or more cigarettes a day, combined hormonal contraception is **UKMEC 4**: the risk of myocardial infarction and stroke is unacceptable. She should not be offered CHC.

Suitable alternatives that also help heavy painful periods include the **LNG-IUS**, which is both highly effective contraception and first-line treatment for heavy menstrual bleeding, and the injectable or desogestrel POP, which often reduce bleeding. The implant is an effective option but bleeding is unpredictable. She should be offered support to stop smoking. If she stops smoking for at least a year, the UKMEC category for CHC changes, but other risk factors would still need to be assessed. Her heavy bleeding should also be assessed in its own right, including a full blood count.
:::
:::

### Emergency contraception

Emergency contraception is used after unprotected sexual intercourse or a contraceptive failure. FSRH guidance describes three options:

- A **Cu-IUD** can be inserted up to 120 hours (5 days) after the first unprotected intercourse in a cycle, or up to 5 days after the earliest likely date of ovulation. It is the most effective option, preventing almost all pregnancies, and is not affected by body weight or other drugs. It then provides ongoing contraception.
- **Ulipristal acetate**, a selective progesterone receptor modulator, can be taken up to 120 hours after intercourse. It delays ovulation even when taken shortly before the LH surge. Progestogens taken in the following five days can reduce its effect, so hormonal contraception is started five days after taking it.
- **Levonorgestrel** can be taken up to 72 hours after intercourse. It delays ovulation but is ineffective once the LH surge has started. A double dose is suggested for women with a BMI over 26 kg/m² or weight over 70 kg, or taking enzyme-inducing drugs, although evidence for this is limited.

The oral methods work only by delaying ovulation, so they do not work if ovulation has already happened and do not protect against intercourse later in the same cycle.

::: example Missed pills {#ex-missed-pills}
A 22-year-old takes a combined pill in the traditional regimen of 21 active pills followed by a 7-day break. She forgot to start her new pack after the break and realises on day 3 of the pack that she has missed the first two active pills. She had unprotected intercourse two days ago. What should she do?
::: solution
Missing pills at the start of a pack extends the hormone-free interval, which is when ovulation is most likely to escape suppression. Under FSRH guidance, two or more missed pills (more than 48 hours late) require her to take the most recent missed pill now, continue the pack, and use condoms or abstain until she has taken seven consecutive active pills. Because the pills were missed in the first week and she had unprotected intercourse during the extended break, she also needs **emergency contraception**. The Cu-IUD is most effective. If she chooses an oral method, levonorgestrel allows her to continue the pill immediately; if ulipristal is used, she should wait five days before restarting the pill and use condoms for seven days after restarting. A pregnancy test three weeks later is advised. This is also a good moment to discuss a tailored regimen without a monthly break, or a LARC method.
:::
:::

## Subfertility

::: definition Subfertility {#def-subfertility}
NICE defines **infertility** as failure to conceive after one year of regular unprotected vaginal intercourse in a woman of reproductive age, in the absence of a known cause. The term **subfertility** is often preferred, because most such couples are not sterile and many will conceive without treatment. About 84% of couples in the general population conceive within a year of regular unprotected intercourse, and about 92% within two years.
:::

NICE recommends earlier referral when the woman is 36 or over, or when there is a known cause, such as amenorrhoea, previous pelvic infection or surgery, or a history of undescended testes or chemotherapy in the man. Female fertility declines with age, especially from the mid-thirties, because both the number and the quality of eggs fall; this is the most important single factor in the success of any treatment.

**Causes.** The commonly quoted approximate distribution is: male factor about 30%, unexplained about 25%, ovulatory disorders about 25%, tubal damage about 20%, and uterine or peritoneal disorders about 10%. The figures add to more than 100% because many couples have more than one factor.

**Investigations** are done for both partners together:

- **Ovulation.** A regular cycle of 21 to 35 days usually indicates ovulation. It is confirmed by a **mid-luteal serum progesterone**, taken about 7 days before the next expected period (day 21 of a 28-day cycle); a level above about 30 nmol/L indicates ovulation. Women with irregular cycles have gonadotrophins (FSH and LH) measured, and prolactin and thyroid function checked if there are symptoms. Anti-Müllerian hormone or antral follicle count estimates **ovarian reserve** and predicts the response to ovarian stimulation, but not the chance of natural conception.
- **Semen analysis.** Results are compared with the WHO (2021) lower reference limits, including a volume of 1.4 mL, a concentration of 16 million per mL, a total sperm number of 39 million, progressive motility of 30% and normal forms of 4%. An abnormal result is repeated, ideally three months later, because sperm production takes about that long and results vary.
- **Tubal patency.** Women without known risk factors have hysterosalpingography (X-ray with contrast through the cervix) or hysterosalpingo-contrast sonography. Women with risk factors, such as previous pelvic infection or endometriosis, have laparoscopy and dye, which allows assessment and treatment of other pelvic disease at the same time.

**Treatment** depends on the cause:

- **Anovulation**: weight optimisation if the BMI is high or low; for polycystic ovary syndrome, **letrozole** is now recommended as the first-line drug for ovulation induction by the 2023 international PCOS guideline, with clomifene, metformin, gonadotrophins or laparoscopic ovarian drilling as alternatives. Women with hypothalamic amenorrhoea (for example from low body weight) need weight gain and sometimes pulsatile GnRH or gonadotrophins. Hyperprolactinaemia is treated with a dopamine agonist.
- **Tubal disease**: surgery for selected cases; in vitro fertilisation (IVF) for most. A hydrosalpinx is removed or clipped before IVF because its fluid lowers implantation rates.
- **Male factor**: correction of reversible causes; **intracytoplasmic sperm injection (ICSI)**, in which a single sperm is injected into each egg, for severe abnormalities; surgical sperm retrieval for obstructive azoospermia; donor sperm.
- **Unexplained subfertility**: NICE advises trying to conceive naturally for a total of two years before IVF, because many couples conceive in that time.

**IVF** involves ovarian stimulation with gonadotrophins, egg retrieval under ultrasound guidance, fertilisation in the laboratory and transfer of an embryo to the uterus. NICE recommends three full cycles for women under 40 who have not conceived after two years, and one cycle for women aged 40 to 42 who meet additional criteria, although local funding varies. Success rates fall steeply with the woman's age. The main risks are **ovarian hyperstimulation syndrome** (ovarian enlargement and fluid shift into the abdomen and chest, with risks of thrombosis and kidney injury) and **multiple pregnancy**. In the UK, elective single embryo transfer has reduced the multiple birth rate after IVF from about one in four in the 2000s to well under one in ten.

::: example A couple who have not conceived {#ex-subfertility}
A couple have been trying to conceive for 18 months. She is 33, with regular 35-day cycles; he is 35 and well. Her mid-luteal progesterone, taken on day 21, was 8 nmol/L. His semen analysis shows a volume of 2.5 mL, a concentration of 12 million per mL, progressive motility of 25% and 3% normal forms. Interpret the results.
::: solution
**Progesterone.** For a 35-day cycle, the next period is expected on day 36, so the mid-luteal sample should be taken about 7 days earlier, on **day 28**. A sample on day 21 was taken in the follicular phase, so a low result does not show anovulation. The test should be repeated at the correct time; with regular cycles, she is probably ovulating.

**Semen analysis.** The concentration (12 million per mL, below 16), progressive motility (25%, below 30%) and morphology (3%, below 4%) are all below the WHO 2021 lower reference limits. This is a pattern called oligoasthenoteratozoospermia. The test should be repeated after about three months, and he should be assessed for causes (history, examination including the testes, and endocrine tests if the count is very low).

**Next steps.** Tubal patency should also be assessed. If the repeat semen analysis is similar, the couple should be referred to a fertility specialist; depending on the severity, IVF or ICSI may be recommended. Lifestyle advice for both (smoking, alcohol, BMI, and avoiding heat and anabolic steroids for him) is given.
:::
:::

::: warning Do not test progesterone on day 21 of every cycle
The "day 21 progesterone" is only day 21 for a 28-day cycle. The test is meant to be taken in the mid-luteal phase, about 7 days before the next expected period. In a woman with a 35-day cycle, a day 21 sample is taken before ovulation and gives a falsely low result, which can lead to an incorrect diagnosis of anovulation and unnecessary treatment.
:::

::: quiz
A woman had unprotected intercourse 96 hours ago, on day 13 of a regular 28-day cycle. She takes no other medicines and her BMI is 24. Which emergency contraceptive is the most effective option?
- [ ] Levonorgestrel 1.5 mg.
- [ ] Ulipristal acetate.
- [x] A copper intrauterine device.
- [ ] None, because it is too late for emergency contraception.
::: solution
At 96 hours, levonorgestrel is outside its 72-hour window. Ulipristal can be taken up to 120 hours, but because ovulation has probably already occurred around day 14, oral methods that act by delaying ovulation may not work. A **Cu-IUD** can be inserted up to 5 days after intercourse or up to 5 days after the earliest likely date of ovulation and is the most effective option. If she declines an IUD, ulipristal should be offered.
:::
:::

::: history
In 1916 Margaret Sanger opened a birth control clinic in Brooklyn and was arrested for it; in 1921 Marie Stopes opened Britain's first birth control clinic in London. The first combined oral contraceptive was developed in the 1950s by Gregory Pincus, Min Chueh Chang and John Rock, building on Carl Djerassi's and Frank Colton's syntheses of orally active progestogens, and was approved for contraception in the United States in 1960 and in the UK in 1961. The early pills contained much more oestrogen than modern ones, and the link with venous thrombosis, reported in the 1960s, led to progressively lower doses. Intrauterine devices were developed by Ernst Gräfenberg in the 1920s and by Jack Lippes in the 1960s, and the copper IUD followed in the late 1960s. In fertility, the decisive step was the birth of Louise Brown in Oldham in 1978, after the work of Robert Edwards, Patrick Steptoe and Jean Purdy; Edwards received the Nobel Prize in 2010. The UK's Human Fertilisation and Embryology Act 1990 created the HFEA, one of the first statutory regulators of assisted reproduction. Intracytoplasmic sperm injection, first reported by Gianpiero Palermo and colleagues in Brussels in 1992, made it possible for many men with severe sperm abnormalities to become genetic fathers.
:::

## Where this leads

Postnatal contraception is in [[obstetrics-gynaecology/postnatal-period]]. Polycystic ovary syndrome and endometriosis, important causes of subfertility, are in [[obstetrics-gynaecology/menstrual-pelvic-disorders]]. Sexually transmitted infections, which cause tubal damage, are in [[infectious-diseases/sexually-transmitted-infections]]. The ethics and law of assisted conception are in [[medical-ethics-law/beginning-of-life]]. Contraception in perimenopausal women is in [[obstetrics-gynaecology/menopause]].

::: summary
- Contraceptives prevent ovulation, block sperm, or prevent fertilisation or implantation; many methods act at more than one step.
- Typical-use failure rates are much higher than perfect-use rates for user-dependent methods (pill 9% versus 0.3% a year); LARC methods are almost equally effective in both.
- Over $n$ years the chance of at least one pregnancy is $1-(1-p)^n$, so small annual risks accumulate.
- UKMEC grades each method from 1 (no restriction) to 4 (unacceptable risk). CHC is UKMEC 4 with migraine with aura, age 35 or over and smoking 15 or more cigarettes a day, previous VTE or a thrombogenic mutation.
- The VTE risk with CHC is small in absolute terms (about 5–12 per 10,000 women a year, depending on the progestogen, versus 2 in non-users).
- Enzyme-inducing drugs make pills and the implant unreliable but not the injectable or intrauterine methods.
- The Cu-IUD is the most effective emergency contraception (up to 120 hours, or up to 5 days after likely ovulation); ulipristal works up to 120 hours, levonorgestrel up to 72 hours.
- Subfertility is failure to conceive after a year; most couples conceive within two years. Investigate both partners: ovulation (mid-luteal progesterone 7 days before the expected period), semen analysis against WHO 2021 limits, and tubal patency.
- Letrozole is first-line ovulation induction in PCOS; IVF and ICSI bypass tubal and male factors; OHSS and multiple pregnancy are the main risks of treatment.
:::

## Exercises

::: exercise Cumulative risk {level=1 check="round(100*(1-0.91^5))"}
Using [[#eq-cumulative]], what percentage of women using the combined pill with typical use (9% failure per year) would be expected to have at least one pregnancy over five years? Give the nearest whole per cent.
::: solution
$1 - (1 - 0.09)^5 = 1 - 0.91^5 = 1 - 0.624 = 0.376$, so about **38%**. The approximation $np$ would give 45%; the exact formula is lower because a woman can only have a "first" pregnancy once.
:::
:::

::: exercise Timing the progesterone test {level=1 check="28"}
A woman has regular 35-day cycles. On which cycle day should a mid-luteal progesterone be taken?
::: solution
The next period is expected on day 36. The mid-luteal sample is taken about 7 days before that, on day **28**.
:::
:::

::: exercise UKMEC categories {level=1}
Give the UKMEC category for combined hormonal contraception in each case: (a) a 25-year-old with migraine without aura; (b) a 30-year-old with migraine with aura; (c) a 28-year-old whose mother had a DVT at 45 but who has not been tested for a thrombophilia; (d) a 40-year-old non-smoker with no other risk factors.
::: solution
(a) For starting CHC in a woman with migraine without aura, UKMEC 2. (b) **UKMEC 4**: migraine with aura is associated with an increased risk of ischaemic stroke, which oestrogen increases further. (c) A family history of VTE in a first-degree relative under 45 is UKMEC 3; at 45 or over it is UKMEC 2. Thrombophilia testing is not recommended routinely. (d) Age 40 or over is UKMEC 2 for CHC.
:::
:::

::: exercise Interaction {level=2}
A 24-year-old woman with epilepsy taking carbamazepine uses the combined pill. Explain the problem and suggest suitable alternatives.
::: solution
Carbamazepine induces liver enzymes (cytochrome P450 3A4), increasing the metabolism of both ethinylestradiol and the progestogen, so the pill becomes unreliable; the same applies to the progestogen-only pill and the implant. Suitable alternatives are the **Cu-IUD**, the **LNG-IUS** or the **progestogen-only injectable**, whose effectiveness is not affected. Pre-pregnancy counselling about antiepileptic drugs and folic acid should also be offered ([[obstetrics-gynaecology/pregnancy-antenatal]]).
:::
:::

::: exercise A Pearl index from a trial {level=2 check="4"}
In a trial of a new contraceptive patch, 250 women were enrolled. Two hundred used it for 12 months; the other 50 stopped after 6 months and were not followed further. There were 9 pregnancies, all while the patch was being used. Calculate the Pearl index.
::: hint
Total exposure is the sum of the months that each woman actually used the method, not the number of women multiplied by 12.
:::
::: solution
Exposure: $200 \times 12 + 50 \times 6 = 2400 + 300 = 2700$ months. Using [[#eq-pearl]], the Pearl index is $9 \times 1200 / 2700 = 10800/2700 = 4$ pregnancies per 100 woman-years. Using $250 \times 12 = 3000$ months by mistake would give 3.6 and make the method look better than it is.
:::
:::

::: exercise Male factor {level=2}
A semen analysis shows no sperm (azoospermia) on two occasions. The man has a normal testicular volume and normal FSH. What is the likely mechanism and what treatment options exist?
::: solution
Normal testicular size and FSH suggest that sperm production is normal and the problem is **obstruction**, for example congenital bilateral absence of the vas deferens (associated with CFTR variants, so genetic testing and counselling are needed) or post-infective or post-surgical blockage, including vasectomy. Options are surgical sperm retrieval from the epididymis or testis with ICSI, surgical reconstruction in some cases (such as vasectomy reversal), or donor sperm. By contrast, small testes with raised FSH suggest testicular failure (non-obstructive azoospermia), for which sperm retrieval is less often successful.
:::
:::

::: exercise Counselling about LARC {level=3}
A 19-year-old has had two unplanned pregnancies while using condoms and the pill. She asks for "something I don't have to think about" but is worried about weight gain and irregular bleeding. Compare the options she could choose, with their advantages and drawbacks.
::: solution
**Implant**: the most effective reversible method (0.05% failure), lasts three years, quickly reversible; drawback: unpredictable bleeding, which is the commonest reason for removal (some bleeding patterns improve with treatment). Weight gain has not been shown to be caused by the implant.

**LNG-IUS**: highly effective (0.2%), lasts 5 to 8 years depending on the device, usually makes periods lighter; drawbacks: insertion is a pelvic procedure, irregular spotting in the first months, small risks of expulsion and perforation.

**Cu-IUD**: highly effective, no hormones, can last up to 10 years; drawbacks: periods may become heavier and more painful.

**Injectable**: very effective with timely injections (6% typical use because injections are missed); drawbacks: needs an injection every 13 weeks, can cause weight gain (more often in young women with a BMI over 30), delay in return of fertility, and reversible bone density loss.

She should also be advised to continue using condoms to protect against sexually transmitted infections, and screening for chlamydia and gonorrhoea should be offered. The choice is hers, made with clear, unbiased information and without pressure.
:::
:::

::: exercise A complex subfertility history {level=3}
A 38-year-old woman has been trying to conceive for 8 months. She had a ruptured appendix with peritonitis at 15 and has painful periods and pain during intercourse. Her partner has a child from a previous relationship. What features of her history matter, and how should she be investigated?
::: solution
**Timing.** At 38, she should be referred now rather than waiting for a year: NICE advises earlier referral for women aged 36 or over, and she has a likely cause.

**History.** Peritonitis from a ruptured appendix can cause pelvic adhesions and tubal damage. Painful periods and deep dyspareunia suggest **endometriosis**, which can distort pelvic anatomy and impair fertility. A previous pregnancy with another partner does not exclude a male factor now.

**Investigations.** Ovarian reserve (AMH or antral follicle count), because her age and possible endometriosis may reduce it; confirmation of ovulation; semen analysis for her partner; transvaginal ultrasound for endometriomas and other pelvic pathology; and, because of her risk factors, **laparoscopy and dye** rather than hysterosalpingography, which allows tubal assessment and diagnosis and treatment of endometriosis and adhesions at the same procedure. If her tubes are badly damaged or her reserve is low, IVF should be discussed early, because her age limits the time available.
:::
:::
