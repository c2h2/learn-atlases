Skin cancer is the commonest cancer in fair-skinned populations, and its incidence has risen steadily for decades. Most skin cancers are **keratinocyte cancers**, basal cell carcinoma and cutaneous squamous cell carcinoma, which are extremely common, usually curable and rarely fatal. **Melanoma**, which arises from melanocytes, is much less common but causes most skin cancer deaths; in the UK it is among the five commonest cancers. All three are strongly linked to ultraviolet radiation, which makes skin cancer one of the most preventable of cancers, and all three are visible on the skin surface, which makes early detection possible with nothing more than a careful look.

This chapter covers how ultraviolet light causes cancer, the precancerous lesions and keratinocyte cancers, the recognition, staging and treatment of melanoma (including the modern targeted and immune therapies), and prevention. It builds on skin structure in [[musculoskeletal/skin]] and on the general principles of cancer diagnosis and staging in [[pathology/cancer-diagnosis]].

## Ultraviolet light and skin cancer {#sec-uv}

Sunlight reaching the ground contains two biologically important bands of ultraviolet radiation. **UVB** (wavelengths about 280–315 nm) is mostly absorbed in the epidermis; it causes sunburn and directly damages DNA. **UVA** (about 315–400 nm) is more abundant, penetrates into the dermis, causes tanning and photoageing and damages DNA indirectly through reactive oxygen species. Both contribute to skin cancer, and both are emitted by sunbeds.

::: theorem The ultraviolet signature {#thm-uv}
UVB is absorbed by adjacent pyrimidine bases in DNA and links them, forming **cyclobutane pyrimidine dimers** and related lesions. If these are not repaired before the cell divides, they produce a characteristic pattern of mutations, mainly **C→T substitutions at sites of two adjacent pyrimidines** (including CC→TT changes). This "UV signature" is found in large numbers in the genomes of most basal cell carcinomas, squamous cell carcinomas and melanomas from sun-exposed skin, directly linking these cancers to sunlight.
:::

::: proof
Cells normally remove pyrimidine dimers by **nucleotide excision repair**. Two observations show that unrepaired UV damage causes skin cancer. First, people with **xeroderma pigmentosum**, an inherited defect of nucleotide excision repair, develop skin cancers at a very young age and at many times the usual rate on sun-exposed skin. Second, sequencing of skin cancers shows thousands of mutations with the UV signature, affecting key genes: ***TP53*** in squamous cell carcinoma (UV-signature *TP53* mutations are already present in sun-damaged normal skin and in actinic keratoses), ***PTCH1*** in the hedgehog pathway in basal cell carcinoma, and growth-signalling genes such as ***BRAF*** and ***NRAS*** in melanoma. Melanin protects by absorbing UV and scavenging free radicals, which is why fair skin that burns easily carries the highest risk. Melanomas of the palms, soles and nail beds, which are the commonest type in people with darker skin, carry few UV-signature mutations, consistent with a different cause.
:::

The pattern of exposure matters. **Squamous cell carcinoma** tracks **cumulative** lifetime exposure: it occurs on chronically sun-exposed sites (face, ears, scalp, backs of hands) in older people and outdoor workers. **Melanoma** and **basal cell carcinoma** are more strongly linked to **intermittent intense** exposure and **sunburn**, particularly in childhood: the office worker who burns on holiday.

::: definition Risk factors for skin cancer {#def-risk}
- **Skin type**: fair skin that burns easily and tans poorly (Fitzpatrick types I and II), red or fair hair (often linked to variants in the melanocortin 1 receptor gene, *MC1R*), light eyes and freckles.
- **UV exposure**: sunburn (especially in childhood), outdoor work, living near the equator, and **sunbed use**.
- **Naevi**: a large number of common moles (more than about 100) or several atypical (dysplastic) naevi raise melanoma risk.
- **Personal or family history** of skin cancer; familial melanoma is linked in some families to *CDKN2A* variants.
- **Immunosuppression**: organ transplant recipients have a many-fold increase in squamous cell carcinoma, which can be aggressive; HIV and some drugs also increase risk.
- **Other**: older age; xeroderma pigmentosum and other genetic syndromes; ionising radiation; arsenic; human papillomavirus (for some squamous cell carcinomas); chronic wounds and scars (squamous cell carcinoma in a chronic ulcer is called a Marjolin ulcer).
:::

The dose of UV is measured by the **UV index (UVI)**, a scale in which each unit corresponds to an erythemally weighted irradiance of 0.025 W/m². A UVI of 3 or more is the usual threshold for advising sun protection; in the UK, summer midday values commonly reach 6 to 8. The dose that just produces reddening of the skin is the **minimal erythema dose (MED)**, which varies with skin type. Combining the two gives the time to sunburn: at a UVI of $u$, the effective dose per minute is $0.025 u \times 60 = 1.5u$ J/m², so

$$t_{\text{burn}} \approx \frac{\text{MED}}{1.5\,u} \text{ minutes},$$ {#eq-burn}

with MED in erythemally weighted J/m².

::: widget plot
f: m/(1.5*x)
x: 1, 12
y: 0, 120
sliders: m=250:150:600:50
hlines: 30
labels: \text{minutes to one MED}
title: Time to sunburn and the UV index
caption: Approximate time for unprotected skin to receive one minimal erythema dose (MED) at a given UV index (horizontal axis). The slider sets the MED in J/m²: roughly 200–300 for skin that burns easily, and higher for skin that tans readily. At a UVI of 8, a person with an MED of 250 J/m² burns in about 20 minutes. A simplified model: real exposure depends on time of day, reflection, shade and posture.
:::

## Precancers and keratinocyte cancers {#sec-keratinocyte}

::: definition Keratinocyte precancers and cancers {#def-keratinocyte}
**Actinic (solar) keratoses**: rough, scaly, pink or skin-coloured patches on chronically sun-damaged skin, often easier to feel than to see. They mark high cumulative UV exposure. Each has a small risk of progressing to squamous cell carcinoma, and many regress. They are treated when symptomatic or numerous, with topical **fluorouracil**, **imiquimod** or diclofenac gel, **cryotherapy** or **photodynamic therapy**.

**Bowen's disease (squamous cell carcinoma in situ)**: a slowly enlarging, well-defined red scaly plaque, often on the lower legs of older women. It can progress to invasive cancer and is treated with topical therapy, cryotherapy, photodynamic therapy, curettage or excision.

**Basal cell carcinoma (BCC)**: the commonest cancer in white populations, arising from basal keratinocytes. It grows slowly, invades and destroys local tissue, and **very rarely metastasises**. Types:

- **nodular**: a pearly, translucent papule or nodule with a rolled edge and fine **telangiectasia**, often with central ulceration (the "rodent ulcer"), typically on the face;
- **superficial**: a pink, scaly, slowly growing patch with a thread-like edge, often on the trunk;
- **morphoeic (infiltrative)**: a pale, scar-like, poorly defined plaque that spreads further than it looks and is more likely to recur.

**Cutaneous squamous cell carcinoma (cSCC)**: a malignant tumour of keratinocytes, presenting as a keratotic (crusted, scaly) or ulcerated nodule on sun-damaged skin, growing over weeks to months, often tender. Unlike BCC, it can **metastasise**, usually first to regional lymph nodes. High-risk features include diameter over 2 cm, invasion beyond the subcutaneous fat, poor differentiation, perineural invasion, location on the ear or lip, recurrence, and immunosuppression. A **keratoacanthoma** is a rapidly growing, dome-shaped nodule with a central keratin plug; because it can be impossible to distinguish clinically from cSCC, it is treated as one.
:::

In the UK, NICE NG12 advises referral on the **suspected cancer pathway** for a skin lesion that raises suspicion of **cSCC**. For a suspected **BCC**, referral is usually **routine**; the suspected cancer pathway is used only when there is concern that a delay could have a significant impact because of the lesion's site or size. Some low-risk BCCs are managed in primary care by appropriately trained practitioners.

Treatment of keratinocyte cancers is mainly surgical. A **low-risk BCC** is usually excised with a clinical margin of about 4 mm, and high-risk BCCs with wider margins (about 5 mm or more). Low-risk cSCCs are excised with about 4 mm margins, and high-risk cSCCs with 6 mm or more (British Association of Dermatologists guidance). **Mohs micrographic surgery**, in which the surgeon removes the tumour in thin layers and examines all the margins microscopically before closing, gives the highest cure rates while preserving tissue, and is used for high-risk tumours on the face, recurrent tumours and morphoeic BCC. Superficial BCCs can be treated with topical imiquimod or fluorouracil, photodynamic therapy, or curettage. **Radiotherapy** is an option for people unsuitable for surgery. For the rare locally advanced or metastatic tumours, systemic treatment includes **hedgehog pathway inhibitors** (vismodegib, sonidegib) for BCC and the **PD-1 inhibitor cemiplimab** for cSCC.

::: example A pearly nodule on the nose {#ex-bcc}
A 71-year-old retired farmer has had a slowly growing lesion on the side of his nose for 18 months. It is a 7 mm pearly, translucent nodule with a rolled edge, fine branching vessels on its surface and a small central crust that bleeds when he washes. He has many rough scaly patches on his scalp and the backs of his hands. What is the most likely diagnosis, what do the other lesions suggest, and how would it be managed?
::: solution
The most likely diagnosis is a **nodular basal cell carcinoma**: a pearly, translucent nodule with a rolled edge, arborising telangiectasia and central ulceration, slowly growing over months on the face of an older man with heavy outdoor exposure.

The rough scaly patches are probably **actinic keratoses**, markers of high cumulative UV exposure. They carry a small risk of squamous cell carcinoma and indicate that he needs regular skin checks for further skin cancers.

**Management**: referral to dermatology. The nose is a high-risk site for BCC (the "H-zone" of the central face, where tumours recur more often and tissue is precious), so **Mohs micrographic surgery** is often preferred to standard excision, removing the tumour with the least tissue loss and the lowest recurrence rate. Radiotherapy is an alternative if surgery is unsuitable. The prognosis is excellent, because BCC very rarely metastasises. The actinic keratoses can be treated with field therapy (for example topical fluorouracil). He should be advised about sun protection and asked to report any new or changing lesion.
:::
:::

## Melanoma {#sec-melanoma}

::: definition Melanoma {#def-melanoma}
**Melanoma** is a malignant tumour of melanocytes. Most arise in normal skin, and a minority in a pre-existing naevus. It usually grows first along the epidermis (**radial growth phase**) and then invades the dermis (**vertical growth phase**), when it gains the ability to spread to lymph nodes and distant organs. The main clinical types are:

- **Superficial spreading melanoma**: the commonest type in white populations, an irregular, multicoloured flat or slightly raised lesion that enlarges over months, often on the back in men and the legs in women.
- **Nodular melanoma**: a rapidly growing nodule, often uniformly dark, sometimes red or skin-coloured (**amelanotic**), that may bleed. It enters the vertical growth phase early, so it is often thick at diagnosis. It may not fit the ABCD rules; the warning signs are that it is **elevated, firm and growing** (EFG).
- **Lentigo maligna melanoma**: arising in **lentigo maligna** (melanoma in situ in chronically sun-damaged skin, usually the face of older people), which may grow slowly for years before invading.
- **Acral lentiginous melanoma**: on the **palms, soles and under the nails**. It is the commonest type in people with darker skin, is not strongly related to UV exposure, and is often diagnosed late. **Subungual melanoma** appears as a widening longitudinal pigmented band in the nail; pigment spreading onto the nail fold (**Hutchinson's sign**) is a warning sign.
- **Mucosal** melanoma (mouth, nose, genitals, anus) and **uveal** melanoma (in the eye) are rarer and behave differently.
:::

### Recognising a melanoma

Two aids are widely taught. The **ABCDE** rule lists features of a suspicious pigmented lesion: **A**symmetry, **B**order irregularity, **C**olour variation, **D**iameter more than 6 mm, and **E**volution (change in size, shape, colour or symptoms). Evolution is the most important. The **"ugly duckling" sign** draws attention to a mole that looks different from the person's other moles.

In the UK, NICE NG12 recommends the **weighted 7-point checklist** for assessing pigmented skin lesions in primary care:

| Feature | Points |
|---|---|
| **Major**: change in size | 2 |
| **Major**: irregular shape | 2 |
| **Major**: irregular colour | 2 |
| **Minor**: largest diameter 7 mm or more | 1 |
| **Minor**: inflammation | 1 |
| **Minor**: oozing | 1 |
| **Minor**: change in sensation | 1 |

A score of **3 or more**, or strong clinical concern for any other reason (for example a lesion suggesting nodular melanoma), leads to referral on the **suspected cancer pathway**, as does a pigmented lesion with dermoscopic features of melanoma.

**Dermoscopy** (using a handheld magnifier with light that eliminates surface reflection) shows pigment patterns and vessels below the surface and improves diagnostic accuracy in trained hands. Digital photography of lesions helps detect change over time in people with many atypical moles.

::: example A changing mole {#ex-mole}
A 38-year-old woman notices that a mole on her calf has grown over four months. It measures 8 mm, has an irregular outline and contains two shades of brown with an area of black. It is not inflamed, does not ooze and is not itchy. Score it on the weighted 7-point checklist and decide what to do.
::: solution
- Change in size: **2** (major).
- Irregular shape: **2** (major).
- Irregular colour: **2** (major).
- Largest diameter 7 mm or more: **1** (minor).
- Inflammation, oozing, change in sensation: **0**.

Total $= 2 + 2 + 2 + 1 = 7$, well above the threshold of 3. She should be referred on the **suspected cancer pathway** to a dermatology or skin cancer service. The lesion should **not** be removed by shave or partial biopsy in primary care, because the pathologist needs the whole lesion to measure its thickness. In specialist care it would usually be removed by **excision biopsy** with a narrow clinical margin (typically about 2 mm) and a cuff of fat, so that the full depth can be measured.
:::
:::

### Staging and prognosis

The single most important prognostic factor for a primary melanoma without spread is its **Breslow thickness**: the depth in millimetres from the top of the granular layer of the epidermis (or the base of an ulcer) to the deepest invasive tumour cell. **Ulceration** of the primary is the next most important feature. Both determine the **T category** of the American Joint Committee on Cancer (AJCC) staging system, 8th edition, which is used internationally:

| T category | Breslow thickness | a | b |
|---|---|---|---|
| Tis | in situ (no invasion) | | |
| T1 | 1.0 mm or less | less than 0.8 mm without ulceration | less than 0.8 mm with ulceration, or 0.8–1.0 mm |
| T2 | more than 1.0 to 2.0 mm | without ulceration | with ulceration |
| T3 | more than 2.0 to 4.0 mm | without ulceration | with ulceration |
| T4 | more than 4.0 mm | without ulceration | with ulceration |

Overall stage then combines T with **N** (regional lymph nodes, and in-transit or satellite metastases in the skin between the primary and the nodes) and **M** (distant metastases). In broad terms, stage 0 is melanoma in situ; **stages I and II** are localised disease (stage II being thicker or ulcerated tumours); **stage III** is regional spread to lymph nodes or in-transit sites; and **stage IV** is distant metastasis, most often to lung, liver, brain, bone or distant skin. Lactate dehydrogenase (LDH) in the blood adds prognostic information in stage IV.

Survival falls with stage, but within stage III it varies widely. In the AJCC 8th edition data, melanoma-specific survival at 5 years was about 93% for stage IIIA but only about 32% for stage IIID. These figures predate the widespread use of adjuvant therapy.

**Sentinel lymph node biopsy (SLNB)** identifies the first lymph node draining the tumour, using a radioactive tracer and dye injected at the primary site, and removes it for detailed examination. It provides accurate staging and prognostic information. NICE NG14 (updated 2022) advises **not** offering SLNB (or staging imaging) for stage IA melanoma, considering it for melanoma with a Breslow thickness of 0.8 to 1.0 mm with ulceration, lymphovascular invasion or a mitotic rate of 2 or more per mm², and considering it for all melanomas thicker than 1.0 mm. A positive sentinel node is usually no longer followed by removal of all the remaining nodes (completion lymphadenectomy), because trials showed no survival benefit; instead, people are monitored with ultrasound and considered for adjuvant treatment.

### Treatment

**Surgery** is the main treatment for primary melanoma. After the diagnostic excision biopsy, a **wide local excision** removes a margin of normal skin around the scar to reduce local recurrence. NICE NG14 recommends a clinical margin of at least **0.5 cm** for stage 0 (in situ) melanoma, **1 cm** for stage I, and **2 cm** for stage II (or 1 cm where 2 cm would cause unacceptable disfigurement or morbidity).

Two discoveries transformed the treatment of advanced melanoma, which until 2011 had no therapy that prolonged survival.

::: definition Systemic therapy for melanoma {#def-systemic}
**Targeted therapy**: about half of cutaneous melanomas carry an activating **BRAF V600** mutation, which switches on the MAPK growth-signalling pathway. Combinations of a **BRAF inhibitor** with a **MEK inhibitor** (dabrafenib with trametinib, or encorafenib with binimetinib) produce rapid responses in most people with BRAF-mutant disease, although resistance often develops. BRAF testing is therefore carried out in advanced and high-risk melanoma: NICE NG14 recommends it for stage IIB to IV and considers it for stage IIA.

**Immune checkpoint inhibitors**: antibodies that release brakes on T cells. **Ipilimumab** blocks **CTLA-4**; **nivolumab** and **pembrolizumab** block **PD-1**. Used alone (anti-PD-1) or in combination (ipilimumab plus nivolumab), they produce durable responses, and some people with metastatic melanoma remain alive and free of progression many years after treatment. Their adverse effects are **immune-related adverse events**, autoimmune inflammation of almost any organ, most often colitis, hepatitis, pneumonitis, rash, and endocrine disorders (thyroiditis, hypophysitis, adrenal insufficiency and, rarely, type 1 diabetes). These can be severe and need prompt recognition and corticosteroid treatment.

**Adjuvant therapy**: after complete removal of **stage III** melanoma, a year of anti-PD-1 therapy (or BRAF/MEK inhibitors for BRAF-mutant disease) reduces the risk of recurrence, and anti-PD-1 therapy is also used for some resected high-risk **stage II** disease, according to national appraisals. **Neoadjuvant** immunotherapy before surgery is increasingly used for palpable nodal disease.
:::

Follow-up after treatment aims to detect recurrence and new primary melanomas, and to support the person. NICE NG14 recommends follow-up for 1 year after stage IA melanoma and for 5 years after stages IB to IV, with imaging for higher-stage disease. People who have had one melanoma are taught to examine their own skin, because they are at increased risk of another.

::: warning Never shave a suspicious pigmented lesion
A suspicious pigmented lesion should be **excised completely** with a narrow margin, not shaved, curetted, frozen or partly removed, and never treated with laser or cryotherapy without a diagnosis. Partial removal can make it impossible to measure Breslow thickness, the key to staging and to every later decision about sentinel node biopsy, margins and adjuvant therapy. Equally, every excised pigmented lesion must be sent for histology. In primary care, the safest course for a suspicious lesion is referral on the suspected cancer pathway.
:::

::: example A dark streak in the big toenail {#ex-acral}
A 58-year-old Black British man has noticed a dark brown stripe in his right big toenail for about a year. It is now 5 mm wide, wider at the base than at the tip, with uneven colour, and the pigment extends onto the skin of the nail fold. He recalls no injury. His GP had thought it was a bruise. What is the concern, and why are such lesions often diagnosed late?
::: solution
The concern is **subungual acral lentiginous melanoma**. Warning features are a **widening** longitudinal band (wider proximally, at the nail matrix), **irregular colour**, a band wider than about 3 mm, a single nail (especially the thumb or big toe) in an adult, and pigment extending onto the nail fold (**Hutchinson's sign**). A bruise (subungual haematoma) usually follows trauma and grows out with the nail, leaving clear nail behind it.

Acral melanoma is the **commonest melanoma subtype in people with darker skin**. It is often diagnosed late because it occurs at sites people rarely inspect, it is not associated with sun exposure and so escapes sun-focused awareness messages, and it is mistaken for bruises, fungal infection or warts; awareness that people with darker skin can develop melanoma has been limited. Late diagnosis contributes to poorer outcomes in these groups.

He needs referral on the **suspected cancer pathway** to dermatology for assessment and a **nail matrix biopsy**.
:::
:::

::: example From biopsy to treatment {#ex-staging}
A 47-year-old man has an excision biopsy of a changing mole on his back. Histology shows a superficial spreading melanoma, Breslow thickness 1.6 mm, ulcerated, with clear margins. There is no palpable lymphadenopathy. (a) What is the T category? (b) Should he be offered sentinel lymph node biopsy? (c) The sentinel node contains a 0.4 mm deposit of melanoma; what does this mean for his stage and treatment?
::: solution
(a) A thickness of more than 1.0 to 2.0 mm with ulceration is **T2b** in the AJCC 8th edition.

(b) **Yes**: NICE NG14 recommends considering SLNB for melanomas thicker than 1.0 mm. He should also have the wide local excision, and the margin for a stage II-thickness tumour would usually be 2 cm (or 1 cm where 2 cm would cause unacceptable morbidity).

(c) A positive sentinel node means **stage III** disease (regional nodal spread), even though the deposit is microscopic. He would not usually have completion lymph node dissection, because trials found no survival benefit; instead the nodal basin is monitored with ultrasound. His tumour is tested for **BRAF V600** mutation. He would be offered **adjuvant systemic therapy** for about a year, with anti-PD-1 immunotherapy or, if BRAF-mutant, dabrafenib with trametinib, after discussion of benefits and side effects. Staging imaging is part of the work-up, and follow-up continues for 5 years.
:::
:::

::: quiz
Which feature of a primary melanoma is the most important prognostic factor in the absence of spread?
- [ ] The diameter of the lesion
- [ ] The number of colours in the lesion
- [x] The Breslow thickness
- [ ] The patient's skin type
::: solution
**Breslow thickness**, the depth of invasion in millimetres, is the strongest predictor of outcome for localised melanoma, followed by ulceration; together they define the T category. Diameter and colour help with recognition but not prognosis, and skin type affects risk of developing melanoma rather than the prognosis of a given tumour.
:::
:::

## Prevention and early detection {#sec-prevention}

**Primary prevention** aims to reduce UV exposure, especially in childhood:

- **shade**, particularly when the UV index is 3 or more and around the middle of the day;
- **clothing**, hats with a wide brim and UV-protective sunglasses;
- **sunscreen** as an addition to, not a substitute for, shade and clothing: a broad-spectrum product with a sun protection factor (SPF) of at least 30 and good UVA protection (in the UK, a UVA rating of 4 or 5 stars), applied generously and reapplied after swimming, sweating or towelling;
- **avoiding sunburn and sunbeds**. Sunbed use for under-18s is banned in the UK.

Sunscreen trials support its use: in the Australian Nambour trial, regular daily sunscreen use reduced squamous cell carcinoma and, in long-term follow-up, invasive melanoma. In practice, most people apply far less than the 2 mg/cm² used in laboratory SPF testing, so the protection they get is much lower than the label suggests.

Because sunlight is the main source of vitamin D, strict sun avoidance can cause vitamin D deficiency; people who avoid the sun, cover their skin, have darker skin or have had melanoma may need supplements in line with national advice.

**Secondary prevention** means early detection. There is no national skin cancer screening programme in the UK, because population screening has not been shown to reduce melanoma deaths and leads to large numbers of excisions. Instead, the emphasis is on public and professional awareness, self-examination, rapid access to assessment for suspicious lesions, and surveillance of high-risk groups such as organ transplant recipients, people with many atypical moles and those with a previous melanoma.

::: history
In 1775 the London surgeon **Percivall Pott** linked scrotal cancer in chimney sweeps to soot, the first recognition that an environmental exposure could cause cancer, and a skin cancer at that. In 1969 the American pathologist **Wallace Clark** classified melanoma by the anatomical level of invasion, and in 1970 **Alexander Breslow** showed that measured tumour thickness predicted outcome better, giving melanoma staging its central number. In the early 1990s **Donald Morton** and colleagues introduced sentinel lymph node biopsy for melanoma. In 1981 the Cancer Council in Victoria, Australia, launched the "Slip! Slop! Slap!" campaign (slip on a shirt, slop on sunscreen, slap on a hat), a model for sun-safety campaigns worldwide. In 2002 **Michael Stratton** and colleagues at the Wellcome Trust Sanger Institute reported activating **BRAF** mutations in most melanomas, leading to BRAF inhibitors within a decade. In 2011 **ipilimumab**, based on **James Allison**'s work on CTLA-4, became the first drug shown to prolong survival in metastatic melanoma; Allison and **Tasuku Honjo**, who discovered PD-1, shared the 2018 Nobel Prize in Physiology or Medicine.
:::

## Where this leads

The molecular biology of cancer, including oncogenes, tumour suppressors and DNA repair, is developed in [[pathology/cancer-biology]] and inherited cancer predisposition in [[genetics/cancer-genetics]]. Tumour immunology and checkpoint inhibitors are covered in [[immunology/transplant-tumour-immunology]] and [[immunology/vaccines-immunotherapy]], and screening principles in [[public-health/screening]]. Skin cancer in organ transplant recipients links to [[immunology/transplant-tumour-immunology]], and the endocrine adverse effects of immunotherapy to [[endocrine/endocrine-emergencies]].

::: summary
- Ultraviolet radiation (UVB directly, UVA indirectly) causes DNA damage; unrepaired pyrimidine dimers leave a C→T "UV signature" in skin cancers. Xeroderma pigmentosum shows the role of DNA repair.
- Squamous cell carcinoma follows cumulative exposure; melanoma and BCC follow intermittent intense exposure and sunburn. Fair skin, many naevi, family history, sunbeds and immunosuppression raise risk.
- Actinic keratoses and Bowen's disease are precursors of cSCC. BCC is a pearly nodule with telangiectasia that rarely metastasises; cSCC is a keratotic, often tender nodule that can spread to nodes.
- Keratinocyte cancers are treated mainly by excision (about 4 mm margins for low-risk tumours, wider for high-risk), Mohs surgery for high-risk facial and recurrent tumours, and topical or other therapies for superficial lesions.
- Melanoma types: superficial spreading, nodular (elevated, firm, growing), lentigo maligna, acral lentiginous (commonest in darker skin; Hutchinson's sign in the nail) and mucosal.
- Use ABCDE, the ugly duckling sign and the NICE weighted 7-point checklist (refer at 3 or more). Excise suspicious lesions completely; never shave them.
- Breslow thickness and ulceration define T; sentinel node biopsy is considered from 0.8 mm with adverse features and for all melanomas over 1.0 mm. Wide excision margins: 0.5 cm (in situ), 1 cm (stage I), 2 cm (stage II).
- BRAF/MEK inhibitors and immune checkpoint inhibitors transformed advanced melanoma and are used as adjuvant therapy for resected stage III and some stage II disease; immune-related adverse events can affect any organ.
- Prevention relies on shade, clothing, broad-spectrum SPF 30+ sunscreen applied generously, and avoiding sunburn and sunbeds.
:::

## Exercises

::: exercise BCC or SCC? {level=1}
List three features that help distinguish a nodular basal cell carcinoma from a cutaneous squamous cell carcinoma, and state the key difference in behaviour.
::: solution
**BCC**: pearly, translucent appearance; rolled edge; fine arborising telangiectasia; slow growth over months to years; often painless. **cSCC**: keratotic, crusted or scaly surface; faster growth over weeks to months; often tender; usually on chronically sun-damaged skin, sometimes arising from an actinic keratosis or Bowen's disease. **Behaviour**: BCC very rarely metastasises but is locally destructive, whereas cSCC can metastasise, usually to regional lymph nodes.
:::
:::

::: exercise Score the lesion {level=1 check="3"}
A 63-year-old man has a pigmented lesion on his shoulder. It is 5 mm across with an irregular outline and a uniform brown colour. It has been itchy for a month, but it is not inflamed or oozing and has not grown. Calculate the weighted 7-point checklist score and say whether it meets the threshold for referral on the suspected cancer pathway.
::: solution
Change in size: 0. Irregular shape: **2**. Irregular colour: 0. Diameter 7 mm or more: 0. Inflammation: 0. Oozing: 0. Change in sensation (itch): **1**. Total $= 2 + 1 = 3$, which **meets** the threshold of 3, so he should be referred on the suspected cancer pathway. The checklist is a structured aid: a lesion scoring less than 3 should still be referred if there is strong clinical concern.
:::
:::

::: exercise Time to burn {level=1 check="round(10*250/(1.5*8))/10"}
Using [[#eq-burn]], calculate the time in minutes for a person with an MED of 250 J/m² to receive one MED at a UV index of 8, rounded to one decimal place.
::: solution
$t = 250/(1.5 \times 8) = 250/12 \approx 20.8$ minutes. In a UK summer at midday, fair skin can burn in about 20 minutes, which is why shade and clothing matter more than sunscreen alone.
:::
:::

::: exercise Sunscreen in real life {level=2 check="round(300/(1.5*6)*sqrt(30))"}
A person with an MED of 300 J/m² is outdoors at a UV index of 6. (a) How long does unprotected skin take to receive one MED? (b) They apply an SPF 30 sunscreen, but at only half the thickness used in laboratory testing. One commonly used model assumes that the protection actually achieved is $\text{SPF}^{f}$, where $f$ is the fraction of the test thickness applied. Estimate the time to one MED with the sunscreen, in minutes, rounded to the nearest whole number.
::: hint
For (b), the effective protection factor is $30^{0.5}$; multiply the unprotected time by it.
:::
::: solution
(a) $t = 300/(1.5 \times 6) = 300/9 \approx 33.3$ minutes.

(b) Effective SPF $= 30^{0.5} \approx 5.48$. Time $\approx 33.3 \times 5.48 \approx 182.6$, so about **183 minutes**, about three hours rather than the $33.3 \times 30 \approx 1{,}000$ minutes that the label might suggest. Applying sunscreen generously and reapplying it matters, and sunscreen should not be used to prolong deliberate sun exposure.
:::
:::

::: exercise What is the T category? {level=2}
Give the AJCC 8th edition T category for each primary melanoma: (a) Breslow 0.6 mm, not ulcerated; (b) Breslow 0.9 mm, not ulcerated; (c) Breslow 3.2 mm, ulcerated; (d) Breslow 4.5 mm, not ulcerated. For which would NICE recommend considering sentinel lymph node biopsy?
::: solution
(a) **T1a** (less than 0.8 mm, no ulceration). (b) **T1b** (0.8 to 1.0 mm). (c) **T3b** (more than 2.0 to 4.0 mm, ulcerated). (d) **T4a** (more than 4.0 mm, no ulceration).

SLNB: not for (a), which is stage IA. For (b), NICE advises considering SLNB for 0.8–1.0 mm melanoma only if there is ulceration, lymphovascular invasion or a mitotic index of 2 or more; without those features it is not routinely offered. For (c) and (d), thicker than 1.0 mm, SLNB is considered.
:::
:::

::: exercise A transplant recipient {level=2}
A 61-year-old man who had a kidney transplant 12 years ago takes tacrolimus, mycophenolate and prednisolone. He has had three squamous cell carcinomas removed in two years, and a new tender, crusted nodule has appeared on his scalp. Why is he at such high risk, and what measures help?
::: solution
**Why**: long-term immunosuppression impairs immune surveillance of UV-damaged keratinocytes, and some immunosuppressants (notably azathioprine) increase UV-induced DNA damage. Organ transplant recipients therefore have a many-fold increased risk of cSCC, which can be multiple, aggressive and more likely to metastasise. Human papillomavirus may contribute.

**Measures**: urgent assessment and excision of the new lesion (a suspected cSCC); regular specialist skin surveillance in a transplant dermatology clinic; strict sun protection and self-examination; field treatment of actinic keratoses; review of immunosuppression with the transplant team, since switching to an **mTOR inhibitor** (such as sirolimus) or reducing the overall burden can reduce new skin cancers; and in some cases **chemoprevention** with an oral retinoid (acitretin) or nicotinamide.
:::
:::

::: exercise Diarrhoea on immunotherapy {level=3}
A 55-year-old woman receiving ipilimumab and nivolumab for metastatic melanoma develops watery diarrhoea seven times a day with abdominal cramps, two weeks after her second cycle. Ten days later she also complains of a new headache and fatigue, with a low sodium. (a) What is the likely cause of the diarrhoea? (b) What could explain the headache, fatigue and hyponatraemia? (c) What are the principles of management?
::: hint
Checkpoint inhibitors cause autoimmune inflammation; think of the gut and the endocrine glands.
:::
::: solution
(a) **Immune-related colitis**, one of the commonest serious immune-related adverse events, particularly with the CTLA-4 and PD-1 combination. Infection (including *Clostridioides difficile*) must be excluded.

(b) **Hypophysitis** (autoimmune inflammation of the pituitary), typical of ipilimumab: headache, fatigue, and secondary **adrenal insufficiency** (low ACTH and cortisol), which can cause hyponatraemia, hypotension and collapse. Thyroid function, cortisol and other pituitary hormones should be checked, and pituitary MRI considered.

(c) Management follows oncology protocols graded by severity: for colitis at this frequency, **hold immunotherapy**, give **systemic corticosteroids**, and escalate to an anti-TNF agent (infliximab) or vedolizumab if there is no response; involve gastroenterology. For hypophysitis, **replace cortisol** (hydrocortisone, with sick-day rules and steroid emergency card) before any thyroid hormone replacement, since giving thyroxine first can precipitate adrenal crisis. Endocrine deficiencies are often permanent and need lifelong replacement. Patients on checkpoint inhibitors should carry alert cards and have rapid access to the oncology team ([[endocrine/endocrine-emergencies]]).
:::
:::

::: exercise Plan a sun-safety message {level=3}
A secondary school asks for advice on skin cancer prevention for pupils, many of whom work outdoors on farms in summer, and some of whom have darker skin. Outline the key messages and the evidence behind them, and explain why the message about melanoma should not be addressed only to fair-skinned pupils.
::: solution
**Key messages**: avoid sunburn, particularly in childhood and adolescence, because sunburn is strongly linked to melanoma and BCC; use **shade**, especially around the middle of the day when the UV index is 3 or more; wear **clothing, wide-brimmed hats and sunglasses**; use broad-spectrum **SPF 30 or higher** sunscreen with good UVA protection, applied generously and reapplied regularly, as an addition to shade and clothing; **never use sunbeds** (illegal under 18 in the UK). For outdoor work, plan tasks for early and late in the day, and wear long sleeves and hats. **Evidence**: UV causes the DNA damage found in skin cancers; sunscreen use reduced squamous cell carcinoma and melanoma in the Nambour trial; and sunbed use is associated with increased melanoma risk.

**Darker skin**: people with darker skin have a much lower risk of UV-related skin cancer, but they can still develop melanoma, most often **acral melanoma** on the palms, soles and nails, which is not caused by sun exposure. It is often diagnosed late. So all pupils should learn to check their skin, including palms, soles and nails, and to report a new or changing mole or a dark streak in a nail. Vitamin D advice should also be included, since sun avoidance and darker skin increase the risk of deficiency.
:::
:::
