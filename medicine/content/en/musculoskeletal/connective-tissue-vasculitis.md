The connective-tissue diseases and the vasculitides are the great imitators of medicine. A young woman with tiredness, joint pain and a rash; an older man with headache and aching shoulders; a smoker with a cough, blood in the urine and a nosebleed: each could have a systemic autoimmune disease that is about to damage the kidneys, the eyes or the brain. These conditions are individually uncommon, but together they are an important cause of serious illness in young adults and older people alike, and many are now very treatable if they are recognised early.

Two skills run through the chapter. The first is **pattern recognition**: knowing which combinations of features suggest which disease. The second is **intelligent use of autoantibody tests**, which are powerful when the clinical picture fits and misleading when it does not. The chapter covers the systemic autoimmune rheumatic diseases (lupus, antiphospholipid syndrome, Sjögren's disease, systemic sclerosis and inflammatory myopathy), then polymyalgia rheumatica and giant cell arteritis, and finally the classification and treatment of vasculitis. The immunology of autoimmunity is in [[immunology/autoimmunity]]; the inflammatory arthritides in [[musculoskeletal/inflammatory-arthritis]].

## Autoantibodies and how to use them {#sec-antibodies}

The **antinuclear antibody (ANA)** test is the usual screening test for connective-tissue disease. It is performed by indirect immunofluorescence on a layer of human epithelial (HEp-2) cells: the patient's serum is diluted step by step, and the result is reported as the highest dilution (the titre) at which nuclear staining is still visible, along with the staining pattern. ANA is positive in almost everyone with SLE, which makes a negative result very useful for ruling it out. But ANA at low titre is also common in healthy people, particularly women and older adults, and in people with infections, other autoimmune diseases such as autoimmune thyroid disease, and some cancers.

::: theorem Pretest probability governs the meaning of an antibody test {#thm-pretest}
The probability that a positive autoantibody test indicates disease, the **positive predictive value**, depends not only on the sensitivity and specificity of the test but on the **pretest probability** of the disease in the person tested. By Bayes' theorem,

$$\text{PPV} = \frac{\text{sensitivity} \times p}{\text{sensitivity} \times p + (1 - \text{specificity}) \times (1 - p)},$$ {#eq-ppv}

where $p$ is the pretest probability. When $p$ is low, even a test with good specificity produces mostly false positives.
:::

::: proof
Imagine 1,000 people. A fraction $p$ have the disease, and the test detects a proportion (the sensitivity) of them: these are the true positives. The remaining $1 - p$ do not have the disease, and the test wrongly calls a proportion $(1 - \text{specificity})$ of them positive: these are the false positives. The PPV is the true positives divided by all positives. Because the false positives are a fraction of the large healthy group, they swamp the true positives whenever the disease is rare in the group tested. Raising $p$, by testing only people whose clinical picture already suggests the disease, shrinks the healthy group and raises the PPV.
:::

::: widget bayes
mode: test
prevalence: 0.01
sensitivity: 0.98
specificity: 0.87
caption: ANA as a test for SLE in a low-probability setting: a pretest probability of 1%, sensitivity of about 98% and specificity of about 87% (roughly the proportion of healthy people negative at a titre of 1:80). Most positive results are false positives. Increase the prevalence to 0.3, as in a person with a typical rash, arthritis and low platelets, and see the predictive value rise. Illustrative values.
:::

::: example A positive ANA in a tired woman {#ex-ana}
A 34-year-old woman sees her GP with fatigue and widespread aches for six months. Examination is normal. Full blood count, renal function, urinalysis, CRP and thyroid function are normal. An ANA test is reported as positive at 1:80 with a speckled pattern. She is worried she has lupus. Assume a pretest probability of SLE of 1%, an ANA sensitivity of 98% and specificity of 87%. What is the probability she has SLE, and what should be done?
::: solution
Using [[#eq-ppv]], or natural frequencies with 1,000 similar women:

- with SLE: $1{,}000 \times 0.01 = 10$, of whom about $9.8$ test positive;
- without SLE: $990$, of whom $990 \times 0.13 \approx 128.7$ test positive.

PPV $= 9.8 / (9.8 + 128.7) \approx 0.071$, about **7%**.

So a low-titre positive ANA with no specific features leaves SLE unlikely. She does not need treatment on the basis of this result. A sensible approach is to explain what the result does and does not mean, look again for specific features (photosensitive rash, mouth ulcers, inflammatory arthritis, serositis, Raynaud's phenomenon, cytopenias, proteinuria), consider other causes of fatigue and widespread pain, and safety-net: if specific features develop, more specific tests (anti-dsDNA, extractable nuclear antigen antibodies, complement) and rheumatology referral become appropriate. The lesson is to request ANA when the clinical picture suggests a connective-tissue disease, not as a screen for fatigue.
:::
:::

::: definition Autoantibodies and their associations {#def-antibodies}
| Antibody | Main associations |
|---|---|
| ANA | Screening test for SLE and other connective-tissue diseases; low titres common in healthy people |
| Anti-double-stranded DNA (anti-dsDNA) | SLE; highly specific; levels often rise with active disease, especially nephritis |
| Anti-Sm | SLE; highly specific but present in a minority |
| Anti-Ro (SSA) and anti-La (SSB) | Sjögren's disease, SLE; in pregnancy, neonatal lupus and congenital heart block |
| Anti-histone | Drug-induced lupus (for example with hydralazine, procainamide, isoniazid) |
| Anti-centromere | Limited cutaneous systemic sclerosis |
| Anti-topoisomerase I (anti-Scl-70) | Diffuse cutaneous systemic sclerosis; interstitial lung disease |
| Anti-RNA polymerase III | Diffuse systemic sclerosis; scleroderma renal crisis |
| Anti-Jo-1 and other anti-synthetase antibodies | Antisynthetase syndrome: myositis, interstitial lung disease, mechanic's hands, arthritis |
| Anti-TIF1-γ | Dermatomyositis associated with cancer in adults |
| Anti-MDA5 | Dermatomyositis with rapidly progressive interstitial lung disease |
| Anti-U1 RNP | Mixed connective tissue disease |
| Antiphospholipid antibodies (lupus anticoagulant, anticardiolipin, anti-β2-glycoprotein I) | Antiphospholipid syndrome |
| ANCA: anti-PR3 (cytoplasmic pattern) | Granulomatosis with polyangiitis |
| ANCA: anti-MPO (perinuclear pattern) | Microscopic polyangiitis; eosinophilic granulomatosis with polyangiitis |
| Anti-glomerular basement membrane | Anti-GBM disease (Goodpasture's disease) |
:::

## Systemic lupus erythematosus {#sec-sle}

::: definition Systemic lupus erythematosus {#def-sle}
**Systemic lupus erythematosus (SLE)** is a chronic multisystem autoimmune disease characterised by antibodies against nuclear antigens, immune-complex deposition and complement activation. It is about nine times more common in women than men, usually begins between the late teens and the forties, and is more common and often more severe in people of African, Caribbean, Asian and Hispanic ancestry.

Its features include:

- **constitutional**: fatigue, fever, weight loss;
- **mucocutaneous**: photosensitive rash, the **malar ("butterfly") rash** over the cheeks and nose that spares the nasolabial folds, discoid lupus (scarring plaques), painless oral ulcers, non-scarring alopecia;
- **musculoskeletal**: inflammatory arthralgia or arthritis, usually non-erosive; deformities, when they occur, are reducible (Jaccoud's arthropathy);
- **serositis**: pleurisy, pericarditis;
- **renal**: **lupus nephritis**, which may be silent until advanced;
- **haematological**: haemolytic anaemia, leucopenia, lymphopenia, thrombocytopenia;
- **neuropsychiatric**: seizures, psychosis, cognitive impairment, stroke;
- **immunological**: ANA, anti-dsDNA, anti-Sm, antiphospholipid antibodies, and **low complement (C3 and C4)**, which reflects consumption by immune complexes during active disease.

The 2019 EULAR/ACR classification criteria require an ANA titre of at least 1:80 as an entry criterion, then add weighted points across clinical and immunological domains; a total of 10 or more, with at least one clinical criterion, classifies SLE.
:::

A useful laboratory clue is that active SLE often raises the **ESR** while the **CRP** stays normal or only slightly raised. A high CRP in a person with lupus suggests infection or serositis and should prompt a search for infection, which is a leading cause of death in SLE.

**Lupus nephritis** affects a large minority of people with SLE and is a major cause of morbidity. Immune complexes deposit in the glomeruli, producing anything from mild proteinuria to rapidly progressive glomerulonephritis. Because it is often silent, people with SLE have regular checks of **blood pressure**, **urine dipstick** for blood and protein, a **urine protein:creatinine ratio** and renal function. Significant proteinuria or an active sediment leads to **renal biopsy**, which classifies the disease (classes I to VI) and guides treatment.

::: definition Principles of SLE treatment {#def-sle-treatment}
- **Hydroxychloroquine** for almost everyone with SLE unless contraindicated: it reduces flares, organ damage and thrombosis and improves survival. Long-term users need retinal screening.
- **Sun protection**, because ultraviolet light triggers flares.
- **Glucocorticoids** for flares, at the lowest dose and for the shortest time possible, because they are the main cause of long-term damage (osteoporosis, diabetes, cataracts, avascular necrosis, infection, cardiovascular disease).
- **Immunosuppressants** according to the organs involved: methotrexate or azathioprine for skin and joint disease; **mycophenolate mofetil** or low-dose intravenous **cyclophosphamide** for lupus nephritis induction; biological drugs such as **belimumab** (against B-cell activating factor), **anifrolumab** (against the type I interferon receptor) and **rituximab** in selected cases.
- **Attention to long-term risks**: cardiovascular risk factors, bone health, vaccination, and **pregnancy planning** (disease should be quiet for at least six months before conception, drugs must be compatible with pregnancy, and anti-Ro and antiphospholipid antibodies must be known).
:::

::: example A lupus flare with swollen ankles {#ex-nephritis}
A 26-year-old woman of Nigerian heritage with SLE diagnosed two years ago (malar rash, arthritis, positive ANA and anti-dsDNA) stopped her hydroxychloroquine six months ago. She now has swollen ankles. Blood pressure is 152/96 mmHg. Urine dipstick shows 3+ protein and 2+ blood; the urine protein:creatinine ratio is 310 mg/mmol. Creatinine has risen from 68 to 104 µmol/L. Anti-dsDNA has risen and C3 and C4 are low. What is happening, and what are the principles of management?
::: solution
This is an **SLE flare with active lupus nephritis**: heavy proteinuria (a protein:creatinine ratio of 310 mg/mmol corresponds to about 3 g/day, in the nephrotic range), haematuria, new hypertension and a rising creatinine, with serological activity (rising anti-dsDNA, low complement). Stopping hydroxychloroquine may have contributed.

**Principles of management** (in a specialist renal and rheumatology setting, following local guidance):

1. **Urgent renal biopsy** to confirm and classify the nephritis; proliferative nephritis (classes III and IV) needs intensive immunosuppression.
2. **Induction therapy**: glucocorticoids (often intravenous methylprednisolone followed by oral prednisolone with a planned taper) plus **mycophenolate mofetil** or low-dose intravenous **cyclophosphamide**; additional agents such as belimumab may be added.
3. **Restart hydroxychloroquine**.
4. **Renal protection**: control blood pressure, with an ACE inhibitor or angiotensin receptor blocker to reduce proteinuria; manage oedema and lipids.
5. **Pregnancy**: mycophenolate and cyclophosphamide are teratogenic, so effective contraception and a pregnancy test are essential.
6. **Prevention of treatment harms**: bone protection, infection prophylaxis where indicated, vaccination.

Lupus nephritis is more common and has historically had worse outcomes in people of African and Caribbean ancestry, which makes regular urine monitoring especially important.
:::
:::

### Antiphospholipid syndrome

**Antiphospholipid syndrome (APS)** is an autoimmune disorder in which persistent antiphospholipid antibodies cause **thrombosis** (venous, arterial or small-vessel) and **pregnancy morbidity**. It can occur alone (primary APS) or with SLE. Diagnosis requires a typical clinical event plus antibodies on **two occasions at least 12 weeks apart**, because antibodies can appear transiently with infections. Pregnancy morbidity includes recurrent early miscarriage, unexplained fetal death and early delivery due to severe pre-eclampsia or placental insufficiency. The classification criteria were revised by the ACR and EULAR in 2023.

People with APS and thrombosis usually need **long-term warfarin**. Direct oral anticoagulants are **not** recommended in APS, particularly in people positive for all three antibody types ("triple-positive"), after a trial with rivaroxaban was stopped early because of excess thrombotic events. In pregnancy, women with APS are managed with **low-dose aspirin** and, depending on their history, **low-molecular-weight heparin** under specialist care ([[blood/thrombosis-anticoagulation]], [[obstetrics-gynaecology/pregnancy-complications]]).

### Sjögren's disease

**Sjögren's disease** (Sjögren's syndrome) is a chronic autoimmune disease in which lymphocytes infiltrate the exocrine glands, especially the lacrimal and salivary glands, causing **dry eyes** and **dry mouth** (sicca symptoms), parotid swelling, fatigue and joint pain. It can be primary or accompany RA or SLE. Systemic features include interstitial lung disease, renal tubular acidosis, peripheral neuropathy, vasculitis and cytopenias. Anti-Ro and anti-La antibodies and rheumatoid factor are common. The risk of **B-cell lymphoma**, particularly mucosa-associated lymphoid tissue (MALT) lymphoma of the salivary glands, is substantially increased; persistent gland swelling should be investigated. Treatment is mainly symptomatic (artificial tears and saliva, dental care), with hydroxychloroquine or immunosuppression for systemic disease.

### Systemic sclerosis and Raynaud's phenomenon

**Raynaud's phenomenon** is an exaggerated vasospastic response of the digital arteries to cold or emotion. The fingers turn white (ischaemia), then blue (deoxygenation) and then red (reactive hyperaemia). **Primary Raynaud's** is common, starts in the teens or twenties, is symmetrical and has no tissue damage, a negative ANA and normal **nailfold capillaries**. **Secondary Raynaud's** suggests an underlying disease: features include onset after about 30, asymmetry, digital ulcers or pitting scars, a positive ANA and abnormal (dilated or lost) nailfold capillaries. Systemic sclerosis is the most important cause.

**Systemic sclerosis (SSc)** combines small-vessel damage, autoimmunity and fibrosis of the skin and internal organs. It is divided by the extent of skin thickening:

- **Limited cutaneous SSc**: skin thickening of the hands, forearms, feet and face; a long history of Raynaud's; **anti-centromere** antibodies. Features have been summarised as CREST: calcinosis, Raynaud's, oesophageal dysmotility, sclerodactyly, telangiectasia. A late, serious complication is **pulmonary arterial hypertension**, which is screened for with annual echocardiography, lung function and NT-proBNP.
- **Diffuse cutaneous SSc**: rapidly progressive skin thickening extending to the upper arms, thighs or trunk, with early internal organ involvement: **interstitial lung disease** (associated with anti-Scl-70) and **scleroderma renal crisis** (associated with anti-RNA polymerase III).

**Scleroderma renal crisis** presents with abrupt, severe hypertension and acute kidney injury, sometimes with microangiopathic haemolysis. It is treated with an **ACE inhibitor**, which transformed it from a usually fatal complication to a treatable one. Moderate to high doses of glucocorticoids are a known trigger, so they are used with caution in diffuse SSc.

### Inflammatory myopathies

The **idiopathic inflammatory myopathies** cause muscle inflammation and weakness:

- **Dermatomyositis**: symmetrical **proximal muscle weakness** (difficulty rising from a chair, climbing stairs, lifting arms) with characteristic skin signs: a violaceous **heliotrope rash** of the upper eyelids, **Gottron's papules** over the knuckles, a photosensitive rash over the upper chest and back (V-sign and shawl sign), and dilated nailfold capillaries. In adults it is associated with **cancer**, especially in the first few years after diagnosis, so age- and sex-appropriate cancer screening is carried out.
- **Polymyositis** (a diagnosis made less often now that antibody-defined subgroups are recognised) and the **antisynthetase syndrome** (myositis, interstitial lung disease, arthritis, fever, Raynaud's and cracked "mechanic's hands", with anti-Jo-1 or related antibodies).
- **Immune-mediated necrotising myopathy**, including a form triggered by statins with antibodies against HMG-CoA reductase.
- **Inclusion body myositis**: in people over 50, more often men; slowly progressive weakness of the **finger flexors** and **quadriceps**, often asymmetrical; it does not respond to immunosuppression.

Investigations include **creatine kinase** (raised, often greatly), myositis-specific antibodies, MRI of muscle, electromyography and muscle biopsy, and assessment of lung function and swallowing. Treatment of dermatomyositis and polymyositis uses glucocorticoids with a steroid-sparing drug such as methotrexate, azathioprine or mycophenolate, and intravenous immunoglobulin or rituximab for refractory disease.

## Polymyalgia rheumatica and giant cell arteritis {#sec-pmr-gca}

These two conditions affect people over 50, often overlap, and share an inflammatory process. About one in five people with polymyalgia rheumatica develops giant cell arteritis, and many people with giant cell arteritis have polymyalgic symptoms.

**Polymyalgia rheumatica (PMR)** causes bilateral pain and stiffness of the **shoulder and hip girdles** and neck, worst in the morning, of subacute onset, usually with raised ESR and CRP. Muscle strength and creatine kinase are normal. The response to a moderate dose of prednisolone (for example 15 mg daily) is usually dramatic within days; failure to respond should prompt reconsideration of the diagnosis. Treatment is then tapered slowly over a year or more, with bone protection. Because other conditions mimic PMR, including late-onset RA, myeloma and other cancers, hypothyroidism, infection and statin myopathy, baseline tests (blood count, renal, liver and thyroid function, calcium, protein electrophoresis, CK, urinalysis, and often a chest X-ray) are recommended.

::: definition Giant cell arteritis {#def-gca}
**Giant cell arteritis (GCA)** is a granulomatous vasculitis of large and medium-sized arteries, especially the branches of the external carotid artery (including the temporal artery), the ophthalmic and posterior ciliary arteries, and the aorta and its major branches. It almost always affects people over 50.

Typical features include:

- **new headache**, often temporal;
- **scalp tenderness** (pain on combing the hair);
- **jaw claudication** (pain in the jaw muscles on chewing), the most specific symptom;
- **visual disturbance**: transient loss of vision (amaurosis fugax), double vision or sudden painless permanent loss of vision from anterior ischaemic optic neuropathy;
- systemic features (fever, weight loss, fatigue) and polymyalgic symptoms;
- on examination, a thickened, tender or pulseless temporal artery; arm claudication or unequal blood pressures suggest large-vessel involvement.

ESR and CRP are usually raised. Diagnosis is confirmed by **temporal artery ultrasound** (a "halo" of oedematous arterial wall) or **temporal artery biopsy** (granulomatous inflammation with giant cells, though skip lesions mean a negative biopsy does not exclude GCA).
:::

::: warning Do not wait for the biopsy
Suspected GCA is a medical emergency because vision lost from ischaemic optic neuropathy rarely returns, and the second eye can follow within days. **High-dose glucocorticoids are started immediately** when GCA is strongly suspected, before ultrasound or biopsy. British Society for Rheumatology guidance (2020) recommends prednisolone 40 to 60 mg daily for most people, with intravenous methylprednisolone considered for people with visual symptoms, and urgent assessment through a **fast-track pathway**; new visual loss or double vision should be assessed by an ophthalmologist on the same day. Biopsy findings remain detectable for at least one to two weeks after starting steroids. Treatment continues with a slow taper, with bone protection, and **tocilizumab** (an IL-6 receptor blocker) for relapsing or refractory disease.
:::

::: example Headache and a blurred eye {#ex-gca}
A 74-year-old woman has had a new right-sided headache for three weeks. Her scalp hurts when she brushes her hair, and her jaw aches after chewing meat. This morning, the vision in her right eye went grey for about five minutes and then recovered. She has lost 3 kg. The right temporal artery is thickened and tender. ESR is 86 mm/h and CRP 64 mg/L. What should happen now?
::: solution
This is **giant cell arteritis** until proven otherwise, with an episode of **transient visual loss (amaurosis fugax)**, which signals a high risk of permanent blindness.

1. **Start high-dose glucocorticoids immediately**, today, without waiting for confirmation. Because she has had visual symptoms, intravenous methylprednisolone may be given according to local guidance, followed by high-dose oral prednisolone.
2. **Same-day ophthalmology assessment** for the visual symptoms, and **urgent referral through the GCA fast-track pathway** for temporal artery ultrasound and/or biopsy, which should happen within days and remains informative after steroids have started.
3. **Supportive measures**: bone protection (with calcium, vitamin D and usually a bisphosphonate), gastroprotection where indicated, and monitoring of blood glucose and blood pressure. Check for large-vessel involvement (pulses and blood pressure in both arms).
4. **Longer term**: a slow, monitored taper; tocilizumab if she relapses or cannot reduce the dose.

The combination of new headache, scalp tenderness, jaw claudication, visual symptoms and high inflammatory markers in a person over 50 makes the diagnosis highly likely. The risk of a short course of steroids is far smaller than the risk of blindness.
:::
:::

## Vasculitis {#sec-vasculitis}

**Vasculitis** is inflammation of blood vessel walls, which can lead to bleeding, narrowing, occlusion or aneurysm, and therefore to ischaemia of the tissues supplied. The features depend on the size and distribution of the vessels involved.

::: definition Classification of vasculitis by vessel size {#def-vasculitis}
The 2012 revised **International Chapel Hill Consensus Conference** nomenclature classifies vasculitis mainly by the size of vessel affected.

| Vessel size | Disease | Key features |
|---|---|---|
| **Large** (aorta and major branches) | Giant cell arteritis | Over 50; cranial arteries and aorta |
| | Takayasu arteritis | Usually women under 40; aorta and its branches; absent pulses, arm claudication |
| **Medium** (main visceral arteries) | Polyarteritis nodosa | Necrotising arteritis with microaneurysms; renal, gut, nerve and skin involvement; linked to hepatitis B; ANCA negative; spares glomeruli |
| | Kawasaki disease | Young children; fever, conjunctivitis, red lips, rash, swollen hands and feet, lymphadenopathy; coronary artery aneurysms |
| **Small**, ANCA-associated | Granulomatosis with polyangiitis | Upper airway (sinusitis, nasal crusting, saddle-nose), lung nodules, glomerulonephritis; anti-PR3 |
| | Microscopic polyangiitis | Glomerulonephritis and pulmonary haemorrhage; anti-MPO |
| | Eosinophilic granulomatosis with polyangiitis | Asthma, eosinophilia, neuropathy; ANCA (usually MPO) in a minority |
| **Small**, immune complex | IgA vasculitis (Henoch–Schönlein purpura) | Mainly children; palpable purpura on legs and buttocks, arthralgia, abdominal pain, nephritis |
| | Cryoglobulinaemic vasculitis | Purpura, arthralgia, neuropathy, nephritis; associated with hepatitis C |
| | Anti-GBM disease | Glomerulonephritis and pulmonary haemorrhage |
| **Variable vessel** | Behçet's syndrome | Recurrent oral and genital ulcers, uveitis, skin lesions, venous and arterial thrombosis |
:::

**Small-vessel vasculitis** typically causes **palpable purpura** (raised purple spots that do not blanch, usually on the legs), **glomerulonephritis** (haematuria, proteinuria, red cell casts, rising creatinine), **pulmonary haemorrhage** (haemoptysis, infiltrates, falling haemoglobin), mononeuritis multiplex and episcleritis or scleritis. The combination of lung and kidney involvement, **pulmonary–renal syndrome**, is a medical emergency.

The **ANCA-associated vasculitides** (AAV) are treated in two phases. **Induction** aims for remission with glucocorticoids plus **rituximab** or **cyclophosphamide**; plasma exchange is considered in selected people with severe kidney disease or pulmonary haemorrhage; and **avacopan**, an oral inhibitor of the complement C5a receptor, can be used to reduce glucocorticoid exposure. **Maintenance** then continues with rituximab or azathioprine for several years. Untreated, generalised AAV was usually fatal within a year; with treatment most people survive, although relapses, kidney damage and infection remain major problems.

::: example Nosebleeds and blood in the urine {#ex-gpa}
A 58-year-old man has had blocked, crusty nostrils with blood-stained discharge for three months, treated as sinusitis. Over two weeks he has developed a cough with streaks of blood, aching joints and a rash on his shins. Creatinine is 210 µmol/L (it was 85 a year ago). Urine dipstick shows 3+ blood and 2+ protein. Chest X-ray shows two cavitating nodules. What is the most likely diagnosis, how would you confirm it, and how urgent is it?
::: solution
The most likely diagnosis is **granulomatosis with polyangiitis (GPA)**, an ANCA-associated small-vessel vasculitis affecting the **upper airway** (crusting, bloody discharge), the **lungs** (cavitating nodules, haemoptysis) and the **kidneys** (rapidly rising creatinine with haematuria and proteinuria, suggesting rapidly progressive glomerulonephritis). The shin rash may be vasculitic purpura.

**Confirmation**: **ANCA** testing (anti-PR3 is typical of GPA; anti-MPO is more typical of microscopic polyangiitis), anti-GBM antibodies (anti-GBM disease also causes pulmonary–renal syndrome), urine microscopy for red cell casts, and **tissue biopsy**, usually of the kidney, showing pauci-immune necrotising crescentic glomerulonephritis. CT of the chest and sinuses defines the extent. Infection (including tuberculosis, given the cavities) must be excluded.

**Urgency**: this is a **medical emergency**. Kidney function can be lost within days and pulmonary haemorrhage can be fatal. He needs same-day referral to the renal or vasculitis team; treatment with glucocorticoids and rituximab or cyclophosphamide often starts as soon as the diagnosis is strongly suspected, sometimes before the biopsy result. A urine dipstick in every patient with unexplained systemic illness would have flagged this weeks earlier.
:::
:::

::: quiz
Which antibody is most closely associated with scleroderma renal crisis?
- [ ] Anti-centromere
- [ ] Anti-Jo-1
- [x] Anti-RNA polymerase III
- [ ] Anti-histone
::: solution
Anti-RNA polymerase III is associated with diffuse cutaneous systemic sclerosis and a high risk of scleroderma renal crisis, which is treated with an ACE inhibitor. Anti-centromere is associated with limited cutaneous SSc and pulmonary hypertension; anti-Jo-1 with the antisynthetase syndrome; and anti-histone with drug-induced lupus.
:::
:::

::: history
In 1862 the French physician **Maurice Raynaud** described episodic digital ischaemia in his doctoral thesis. Four years later, in 1866, **Adolf Kussmaul** and **Rudolf Maier** described the nodular arteritis now called polyarteritis nodosa. **Jonathan Hutchinson** described an elderly man with painful, inflamed temporal arteries in 1890, and **Bayard Horton** and colleagues at the Mayo Clinic defined temporal arteritis as a distinct disease in 1932. **Friedrich Wegener** described the granulomatous vasculitis long known by his name in 1936; the name was later replaced by granulomatosis with polyangiitis, partly because of his membership of the Nazi party. At the Mayo Clinic in 1948, **Malcolm Hargraves** described the "LE cell" in the bone marrow of people with lupus, the first laboratory test for an autoimmune disease and the start of the autoantibody era. In 1983 **Graham Hughes** and colleagues in London described the syndrome of thrombosis, miscarriage and antiphospholipid antibodies that bears his name as Hughes syndrome.
:::

## Where this leads

The immunological mechanisms of these diseases are developed in [[immunology/autoimmunity]] and [[immunology/hypersensitivity]]. Glomerulonephritis and acute kidney injury are covered in [[renal/acute-kidney-injury]] and [[renal/chronic-kidney-disease]], interstitial lung disease and pulmonary hypertension in [[respiratory/interstitial-vascular-disease]], and thrombosis in [[blood/thrombosis-anticoagulation]]. Pregnancy in autoimmune disease is discussed in [[obstetrics-gynaecology/pregnancy-complications]], and Kawasaki disease in [[paediatrics/acute-childhood-illness]]. Skin features of lupus and dermatomyositis connect to [[musculoskeletal/skin]].

::: summary
- Connective-tissue diseases and vasculitides are multisystem; diagnosis rests on clinical pattern plus targeted autoantibody tests.
- The meaning of a positive antibody depends on pretest probability: a low-titre ANA in a person without specific features usually does not mean lupus. A negative ANA makes SLE very unlikely.
- SLE affects skin, joints, serosa, blood, kidneys and brain, with ANA, anti-dsDNA, anti-Sm and low complement. Monitor urine and blood pressure for nephritis. Hydroxychloroquine is for almost everyone; minimise steroids.
- Antiphospholipid syndrome causes thrombosis and pregnancy morbidity; antibodies must persist for 12 weeks. Warfarin, not a DOAC, after thrombosis.
- Systemic sclerosis: limited (anti-centromere, pulmonary hypertension) versus diffuse (anti-Scl-70 with lung fibrosis; anti-RNA polymerase III with renal crisis, treated with an ACE inhibitor). Secondary Raynaud's has abnormal nailfold capillaries.
- Dermatomyositis combines proximal weakness, typical rashes and an association with cancer; inclusion body myositis affects finger flexors and quadriceps and does not respond to immunosuppression.
- PMR causes girdle pain and stiffness with a dramatic steroid response. GCA is an emergency: start high-dose glucocorticoids immediately and arrange fast-track assessment.
- Vasculitis is classified by vessel size (Chapel Hill 2012). Pulmonary–renal syndrome is an emergency; ANCA-associated vasculitis is treated with glucocorticoids plus rituximab or cyclophosphamide, then maintenance.
:::

## Exercises

::: exercise Match the antibody {level=1}
Match each antibody to its most typical association: (a) anti-centromere, (b) anti-Ro, (c) anti-PR3, (d) anti-Jo-1, (e) anti-dsDNA. Associations: granulomatosis with polyangiitis; lupus nephritis activity; congenital heart block; limited cutaneous systemic sclerosis; antisynthetase syndrome.
::: solution
(a) Anti-centromere: **limited cutaneous systemic sclerosis**. (b) Anti-Ro: **congenital heart block** (and neonatal lupus) in babies of mothers with the antibody, as well as Sjögren's disease and SLE. (c) Anti-PR3: **granulomatosis with polyangiitis**. (d) Anti-Jo-1: **antisynthetase syndrome**. (e) Anti-dsDNA: **lupus nephritis activity** (and SLE generally).
:::
:::

::: exercise Primary or secondary Raynaud's? {level=1}
List four features that suggest Raynaud's phenomenon is secondary to an underlying disease rather than primary.
::: solution
Any four of: onset after about age 30; asymmetrical attacks; digital ulcers, pitting scars or gangrene; abnormal nailfold capillaries (dilated loops, dropout); a positive ANA or specific antibodies; other features of connective-tissue disease (skin thickening, arthritis, rash, dysphagia); raised inflammatory markers; attacks that are very severe or painful; and a relevant drug or occupational history (vibrating tools).
:::
:::

::: exercise Predictive value of a test {level=1 check="round(100*0.02*0.98/(0.02*0.98+0.98*0.05))"}
In a rheumatology clinic, a test has a sensitivity of 98% and a specificity of 95% for a disease whose pretest probability among the people tested is 2%. Calculate the positive predictive value, as a percentage rounded to the nearest whole number.
::: solution
Using [[#eq-ppv]] with $p = 0.02$: PPV $= (0.98 \times 0.02)/(0.98 \times 0.02 + 0.05 \times 0.98) = 0.0196/(0.0196 + 0.049) = 0.0196/0.0686 \approx 0.286$, so **29%**. Even with a specificity of 95%, most positive results are false positives when the pretest probability is 2%.
:::
:::

::: exercise Aching shoulders {level=2}
A 71-year-old man has had six weeks of pain and stiffness in both shoulders and hips, worse in the mornings for two hours. He struggles to get out of bed. Muscle strength is normal when tested. ESR is 58 mm/h and CRP 36 mg/L. (a) What is the most likely diagnosis? (b) Which three symptoms would you ask about specifically, and why? (c) What tests should be done before starting treatment?
::: solution
(a) **Polymyalgia rheumatica**.

(b) Ask about **headache**, **jaw claudication** and **visual disturbance** (and scalp tenderness), because giant cell arteritis coexists in a significant minority and changes management: it needs urgent, higher-dose glucocorticoids and fast-track assessment.

(c) Tests to exclude mimics: full blood count, renal and liver function, calcium, thyroid function, **creatine kinase** (to exclude myositis), protein electrophoresis (myeloma), urinalysis, and often rheumatoid factor or anti-CCP and a chest X-ray. Treatment is then a moderate dose of prednisolone with a slow taper and bone protection; failure to respond within about a week should prompt reconsideration of the diagnosis.
:::
:::

::: exercise Anticoagulation in APS {level=2}
A 39-year-old woman with a first unprovoked deep vein thrombosis is found to have lupus anticoagulant, anticardiolipin and anti-β2-glycoprotein I antibodies, all confirmed again 14 weeks later. She asks to take a direct oral anticoagulant because it needs no blood tests. What would you advise, and why?
::: solution
She has **antiphospholipid syndrome** with **triple positivity**, which carries the highest thrombotic risk. Current guidance advises **long-term warfarin** (with INR monitoring) rather than a direct oral anticoagulant, because a randomised trial in high-risk (triple-positive) APS comparing rivaroxaban with warfarin was stopped early owing to an excess of thrombotic events, mainly arterial, in the rivaroxaban group. She should also have pregnancy planning advice: warfarin is teratogenic, so she would switch to low-molecular-weight heparin (with low-dose aspirin) under specialist care before or as soon as pregnancy is confirmed.
:::
:::

::: exercise Weak hands in an older man {level=2}
A 69-year-old man has had slowly progressive difficulty gripping and climbing stairs for three years. Examination shows weakness of the finger flexors and quadriceps, worse on the left. CK is mildly raised. He was given prednisolone for presumed polymyositis with no improvement. What is the most likely diagnosis, and why does it matter?
::: solution
The most likely diagnosis is **inclusion body myositis**: onset over 50, more common in men, slowly progressive, often asymmetrical weakness of the **finger flexors** and **quadriceps**, a modestly raised CK, and **no response to glucocorticoids**. Muscle biopsy (rimmed vacuoles, inflammation, protein aggregates) and antibodies (anti-cN1A in some) support it. It matters because immunosuppression does not help and causes harm, so steroids should be withdrawn; management is physiotherapy, falls prevention, assessment of swallowing (dysphagia is common) and supportive care.
:::
:::

::: exercise Classify the vasculitis {level=3}
For each case, name the most likely vasculitis and the vessel size: (a) a 6-year-old with palpable purpura on the buttocks and legs, knee pain and colicky abdominal pain after a sore throat; (b) a 3-year-old with five days of fever, bilateral non-purulent conjunctivitis, cracked red lips, a rash and swollen hands; (c) a 28-year-old woman with arm claudication, unequal blood pressures and a bruit over the subclavian artery; (d) a 45-year-old with hepatitis B, testicular pain, foot drop and new hypertension, with ANCA negative.
::: hint
Use the table in [[#def-vasculitis]] together with age and associated features.
:::
::: solution
(a) **IgA vasculitis** (Henoch–Schönlein purpura): small-vessel, immune-complex. Check urine and blood pressure for nephritis.

(b) **Kawasaki disease**: medium-vessel. It needs urgent paediatric treatment with intravenous immunoglobulin and aspirin, and echocardiography for coronary artery aneurysms.

(c) **Takayasu arteritis**: large-vessel, typically in young women.

(d) **Polyarteritis nodosa**: medium-vessel, classically associated with hepatitis B; it causes mononeuritis multiplex, renal artery involvement with hypertension, and testicular pain, and is ANCA negative. Antiviral treatment is part of management.
:::
:::

::: exercise Interpret the results {level=3}
A 66-year-old woman with two weeks of malaise, arthralgia and breathlessness has: haemoglobin 92 g/L (was 128 three weeks ago), creatinine 340 µmol/L, urine dipstick 3+ blood and 2+ protein, chest X-ray with bilateral alveolar shadowing, MPO-ANCA strongly positive, anti-GBM negative, ANA negative, complement normal. (a) What syndrome is this? (b) What is the most likely diagnosis? (c) What explains the fall in haemoglobin? (d) What are the immediate priorities?
::: hint
Put the lung and kidney findings together, then use the antibody results to choose between the causes of that syndrome.
:::
::: solution
(a) **Pulmonary–renal syndrome**: glomerulonephritis (rapidly rising creatinine with haematuria and proteinuria) plus alveolar shadowing.

(b) **Microscopic polyangiitis**, an MPO-ANCA-associated vasculitis. Anti-GBM disease is less likely with a negative anti-GBM test, and normal complement and negative ANA argue against lupus.

(c) **Diffuse alveolar haemorrhage**: bleeding into the alveoli causes the shadowing and the fall in haemoglobin, even without obvious haemoptysis. Anaemia of kidney disease and inflammation may contribute.

(d) Priorities: assess and support **oxygenation** (she may need high-level respiratory support); urgent referral to the renal and vasculitis teams; exclude infection; **kidney biopsy** when safe; and prompt **induction treatment** with high-dose glucocorticoids plus rituximab or cyclophosphamide, with plasma exchange considered for severe kidney involvement or alveolar haemorrhage according to specialist guidance. Dialysis may be needed. Delay costs kidney function and life.
:::
:::
