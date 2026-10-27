Arteries and veins fail in a small number of ways. Arteries narrow and block (atherosclerosis, thrombosis, embolism), dilate and rupture (aneurysm), tear (dissection) or become inflamed (vasculitis). Veins clot (venous thromboembolism) or their valves fail (chronic venous disease). Each of these produces a recognisable clinical picture, and several are emergencies in which minutes or hours decide whether a limb or a life is saved: a ruptured aortic aneurysm, an acute aortic dissection, an acutely ischaemic leg, a massive pulmonary embolism.

This chapter covers the mechanics of the arterial wall, peripheral arterial disease and acute limb ischaemia, abdominal aortic aneurysm and screening, aortic dissection, vasculitis and Raynaud's phenomenon, venous thromboembolism, and chronic venous disease. UK guidance from NICE and the NHS screening programmes is followed, with European guidance noted; management in practice follows current local guidance.

## The wall and its loads

The wall of an artery has three layers: the **intima** (endothelium on a thin layer of connective tissue), the **media** (smooth muscle and, in large arteries, elastic laminae) and the **adventitia** (connective tissue with the vessel's own blood supply and nerves). The elastic aorta stores energy in systole and releases it in diastole; muscular arteries and arterioles control flow ([[cardiovascular/circulation-blood-pressure]]).

::: theorem The law of Laplace for a vessel {#thm-laplace}
For a thin-walled cylinder, the circumferential wall tension $T$ (force per unit length of wall) is proportional to the pressure inside and the radius:
$$
T = P \times r,
$$ {#eq-laplace}
and the wall stress (tension divided by wall thickness $h$) is $\sigma = Pr/h$.
:::

::: proof
Cut a short length of cylinder along its axis. The pressure acting on the inside pushes the two halves apart with a force equal to pressure times the projected area, $P \times 2r \times L$. This is resisted by the tension in the two cut edges of the wall, $2 \times T \times L$. Equating the two gives $T = Pr$. Dividing by wall thickness gives the stress in the wall material.

Two consequences follow for aneurysms. First, at the same pressure, a wider artery has greater wall tension: an aneurysm of 6 cm diameter has three times the wall tension of a normal 2 cm aorta. Second, as an aneurysm enlarges, its wall usually thins, so stress rises even faster. Higher stress causes further dilatation, which raises stress again: a positive feedback that explains why large aneurysms grow faster and rupture more often than small ones, and why blood pressure control and avoiding sudden pressure surges matter.
:::

::: widget plot
f: (p/120)*(x/2)
x: 1.5, 9
y: 0, 7
sliders: p=120:80:220:5
hlines: 1
labels: \text{relative wall tension}
caption: Relative wall tension (law of Laplace) in an aorta of diameter $x$ (cm) at systolic pressure $p$ (mmHg, slider), compared with a normal 2 cm aorta at 120 mmHg (= 1, horizontal line). A 5.5 cm aneurysm at the same pressure carries 2.75 times the normal tension; a hypertensive surge raises it further. The model ignores wall thinning, which makes the real increase in stress larger.
:::

## Peripheral arterial disease

::: definition Peripheral arterial disease {#def-pad}
**Peripheral arterial disease (PAD)** is atherosclerotic narrowing or occlusion of the arteries supplying the legs (less often the arms). Its clinical stages are:
- **asymptomatic disease**, found by a low ankle–brachial pressure index;
- **intermittent claudication**: cramping pain in the calf, thigh or buttock, brought on by walking a reproducible distance and relieved within minutes by rest;
- **chronic limb-threatening ischaemia**: pain at rest (typically in the foot at night, relieved by hanging the leg down), ulcers or gangrene, from severely reduced perfusion. It carries a high risk of amputation.

The **ankle–brachial pressure index (ABPI)** is the highest systolic pressure at the ankle (dorsalis pedis or posterior tibial artery) divided by the highest brachial systolic pressure. A value **below 0.9** indicates PAD. A value above about 1.3 suggests incompressible, calcified arteries (common in diabetes and chronic kidney disease), in which the index is unreliable and toe pressures or other tests are used.
:::

PAD shares the risk factors of coronary disease, especially **smoking** and **diabetes**. It is a marker of widespread atherosclerosis: people with PAD are at high risk of myocardial infarction and stroke, and those events cause more deaths than the leg disease itself. Signs include absent or weak pulses, a femoral bruit, cool pale skin, hair loss, and in severe disease **Buerger's sign**, pallor on elevation and dusky redness on dependency.

Management of claudication (NICE CG147) has three parts:
- **Cardiovascular risk reduction**: stopping smoking, a statin, an antiplatelet drug (clopidogrel is preferred in NICE guidance), control of blood pressure and diabetes. In selected people, low-dose rivaroxaban added to aspirin reduces major cardiovascular and limb events, at the cost of more bleeding.
- **A supervised exercise programme**, typically 2 hours a week for 3 months, encouraging people to walk to the point of maximal pain. It increases walking distance as much as many interventions do.
- **Revascularisation** (angioplasty, stenting or bypass surgery) when symptoms remain disabling after exercise and risk-factor treatment, or for chronic limb-threatening ischaemia. Naftidrofuryl is an option when exercise has not helped enough and revascularisation is not wanted or suitable.

Diabetic foot disease combines PAD with neuropathy and infection, and needs a multidisciplinary foot service ([[endocrine/diabetes-complications]]).

::: example The calf that stops him shopping {#ex-claudication}
A 66-year-old man who smokes 20 cigarettes a day has 9 months of cramping pain in his right calf after walking about 200 metres, relieved by standing still for 2 minutes. His right foot pulses are absent. His brachial systolic pressures are 146 mmHg (right) and 152 mmHg (left). His right dorsalis pedis pressure is 88 mmHg and posterior tibial pressure 95 mmHg. Calculate the right ABPI and outline management.

::: solution
The ABPI uses the **highest** ankle pressure on that side and the **highest** brachial pressure:
$$
ABPI = \frac{95}{152} = 0.625.
$$
A value of 0.63 confirms **peripheral arterial disease** of moderate severity, consistent with **intermittent claudication** from disease in the superficial femoral or popliteal artery (calf pain suggests disease above the calf).

Management:
- **Stopping smoking**, with support and pharmacotherapy: the most important single step for both the leg and his life.
- **Statin**, **antiplatelet** (clopidogrel), blood pressure, glucose and lipid assessment, and a check for coronary and carotid disease symptoms.
- **Supervised exercise programme**.
- Review: if symptoms remain limiting despite these, duplex ultrasound or angiography to plan **revascularisation**. Rest pain, ulcers or gangrene would need urgent referral.
:::
:::

## Acute limb ischaemia

**Acute limb ischaemia** is a sudden reduction in limb perfusion that threatens its viability. It results from **embolism** (most often from the left atrium in atrial fibrillation, or from a left ventricular thrombus after infarction), **thrombosis** of an artery already narrowed by atherosclerosis or of a bypass graft, a thrombosed popliteal aneurysm, trauma or dissection.

The classic features are the **six Ps**: **pain**, **pallor**, **pulselessness**, **perishingly cold**, **paraesthesia** and **paralysis**. Sensory loss and muscle weakness indicate that the limb is threatened and that revascularisation is needed within hours; fixed mottling and a hard, tender calf suggest irreversible ischaemia. An embolus typically causes sudden, severe symptoms in a person with AF and normal pulses in the other leg; thrombosis in situ often occurs in a person with a history of claudication, with less abrupt onset because collaterals have developed.

Management is urgent: analgesia, **intravenous heparin** to prevent clot propagation, and immediate vascular surgical assessment for embolectomy, thrombolysis, angioplasty or bypass. After revascularisation, **reperfusion injury** can cause swelling within the fascial compartments of the leg (**compartment syndrome**, which needs fasciotomy), as well as hyperkalaemia, acidosis, myoglobinuria and acute kidney injury. The underlying cause, often AF, is treated with long-term anticoagulation.

## Abdominal aortic aneurysm

::: definition Aortic aneurysm {#def-aneurysm}
An **aneurysm** is a permanent localised dilatation of an artery to more than 1.5 times its normal diameter. An **abdominal aortic aneurysm (AAA)** is usually defined as an infrarenal aortic diameter of **3.0 cm or more**. A **true aneurysm** involves all three layers of the wall; a **false aneurysm** (pseudoaneurysm) is a contained leak held by surrounding tissue, for example after arterial puncture.
:::

AAAs result from degradation of elastin and collagen in the media by inflammation and proteolytic enzymes. The main risk factors are **age**, **male sex**, **smoking** (the strongest modifiable factor), family history, hypertension and other atherosclerotic disease. Most are asymptomatic until they rupture. They may be found incidentally on imaging, by a pulsatile abdominal mass on examination, or by screening.

The risk of rupture rises steeply with diameter. Because rupture is usually catastrophic, with most people dying before or soon after reaching hospital, the UK runs a screening programme. The **NHS Abdominal Aortic Aneurysm Screening Programme** offers men a single ultrasound scan in the year they turn 65 (older men can self-refer). The UK MASS trial (2002) showed that screening men of this age reduced deaths from AAA. Results lead to:
- **below 3.0 cm**: normal, discharged;
- **3.0–4.4 cm** (small): ultrasound surveillance every year;
- **4.5–5.4 cm** (medium): surveillance every 3 months;
- **5.5 cm or more** (large): referral to a vascular surgeon, to be seen within 2 weeks.

Women are not routinely screened in the UK because AAA is much less common in women, although women who have an aneurysm have a higher risk of rupture at a given diameter.

NICE (NG156) advises considering repair of an unruptured aneurysm when it is **symptomatic**, when it is **5.5 cm or more**, or when it is **4.0 cm or more and has grown by more than 1 cm in a year**. Repair is by **open surgery** (replacing the aneurysmal segment with a graft) or **endovascular aneurysm repair (EVAR)** (a stent-graft placed through the femoral arteries). EVAR has lower early mortality, but trials found similar long-term survival, with more late complications and reinterventions after EVAR, which needs lifelong imaging surveillance. NICE's 2020 recommendations favour open repair for people who are fit for it, a position that remains debated; European guidance is more permissive of EVAR. Meanwhile, cardiovascular risk is treated: stopping smoking, statin, antiplatelet and blood pressure control.

::: example An incidental aneurysm {#ex-aaa}
A 71-year-old man has a CT scan for kidney stones that shows an infrarenal aortic aneurysm of 5.8 cm. He is asymptomatic. He has hypertension, COPD with moderate breathlessness, and smokes. What happens next?

::: solution
An aneurysm of 5.8 cm exceeds the 5.5 cm threshold for considering repair, so he should be **referred urgently to a vascular surgical service**, to be seen within about 2 weeks.

The decision about repair weighs:
- the **risk of rupture** at this size, which increases with every centimetre (Laplace: wall tension at 5.8 cm is nearly three times that of a normal aorta at the same pressure);
- his **fitness for surgery**: COPD and smoking increase the risk of open repair, so lung function testing, cardiac assessment and CT angiography to assess anatomy for EVAR are needed;
- his **preferences**, after an explanation of the risks of repair (open or endovascular) and of not repairing.

Meanwhile: **stop smoking** (smoking accelerates growth and increases rupture risk), blood pressure control, statin and antiplatelet therapy. He should know the symptoms of rupture (sudden severe abdominal or back pain, collapse) and to call emergency services immediately. Because AAAs run in families, his brothers and sons should be told that they may benefit from being checked.
:::
:::

**Ruptured AAA** presents with sudden severe abdominal, back or flank pain, collapse and hypotension, sometimes with a pulsatile mass; it can be mistaken for renal colic. Management is immediate transfer to a vascular centre, with **permissive hypotension** (fluid limited to keep the patient conscious, because restoring normal pressure increases bleeding), and emergency repair, by EVAR where anatomy allows.

## Aortic dissection

**Aortic dissection** is a tear in the intima that lets blood enter the media and split the wall, creating a **false lumen** that can extend along the aorta and its branches. Risk factors are **hypertension** (the most common), connective tissue disorders (Marfan syndrome, vascular Ehlers–Danlos syndrome, Loeys–Dietz syndrome), bicuspid aortic valve, coarctation, previous cardiac or aortic surgery, cocaine use, pregnancy, and inflammatory aortitis.

The **Stanford classification** divides dissections by management:
- **Type A** involves the **ascending aorta** (whatever its origin). It can rupture into the pericardium (tamponade), disrupt the aortic valve (acute aortic regurgitation) or occlude the coronary arteries. It needs **emergency surgery**.
- **Type B** involves only the aorta beyond the left subclavian artery. It is usually managed **medically** with control of heart rate and blood pressure, with **endovascular repair (TEVAR)** for complications such as rupture, malperfusion of organs or limbs, or uncontrolled pain.

The typical presentation is **sudden, severe, tearing or ripping chest pain radiating to the back**, maximal at onset. Pulse or blood pressure differences between the arms, a new early diastolic murmur, neurological deficits (stroke, paraplegia from spinal cord ischaemia), limb ischaemia, abdominal pain from mesenteric ischaemia, or signs of tamponade may be present. Some people, especially older people, have atypical or painless presentations. The diagnosis is made by **CT angiography** or, in unstable patients, by transoesophageal echocardiography.

Initial treatment, alongside urgent surgical referral, is analgesia and reduction of the force of ejection: intravenous **beta-blockade** to lower heart rate (typically to about 60 beats/min) and then vasodilators if needed to lower systolic pressure (commonly to 100–120 mmHg), according to local protocol. Antithrombotic drugs, given in error for a suspected coronary syndrome, can be catastrophic ([[cardiovascular/coronary-artery-disease]]).

::: example A tearing pain {#ex-dissection}
A 34-year-old man who is 1.96 m tall, with long fingers and a history of lens dislocation, develops sudden tearing chest pain radiating between his shoulder blades. His pulse is 112 beats/min, BP 164/58 mmHg in the right arm and 128/52 mmHg in the left. There is an early diastolic murmur at the left sternal edge. What is the diagnosis and the immediate plan?

::: solution
The features suggest **Marfan syndrome** (tall stature, arachnodactyly, lens dislocation) with **acute type A aortic dissection**: sudden tearing pain radiating to the back, a **36 mmHg difference** in systolic pressure between the arms, and a new **early diastolic murmur** of **aortic regurgitation** from involvement of the aortic root. The wide pulse pressure fits acute aortic regurgitation.

Immediate plan:
- **Emergency CT angiography** of the aorta (or transoesophageal echocardiography if unstable), and an ECG (to look for coronary involvement) without delaying the diagnosis.
- **Urgent cardiothoracic surgical referral**: type A dissection needs **emergency surgery**; untreated, mortality rises by the hour in the first days.
- **Pain relief** and controlled lowering of heart rate and blood pressure with intravenous beta-blockade, while avoiding hypotension, which could signal tamponade or rupture.
- **No antiplatelet, anticoagulant or fibrinolytic drugs**.

After recovery he needs lifelong aortic surveillance, blood pressure control, and **genetic testing** for *FBN1* with **screening of relatives** ([[genetics/mendelian-inheritance]]).
:::
:::

## Vasculitis and Raynaud's phenomenon

**Vasculitis** is inflammation of blood vessel walls, classified by the size of vessel affected ([[musculoskeletal/connective-tissue-vasculitis]]). Two forms are important here:
- **Giant cell arteritis**: the commonest vasculitis in older people (almost always over 50). Features: new headache, scalp tenderness, **jaw claudication**, visual disturbance, raised ESR and CRP, often with polymyalgia rheumatica. It can cause sudden, permanent **loss of vision** from ischaemic optic neuropathy, so high-dose **glucocorticoids are started immediately** when the diagnosis is suspected, with urgent specialist assessment and confirmation by temporal artery ultrasound or biopsy.
- **Takayasu arteritis**: a large-vessel vasculitis of young women, affecting the aorta and its branches, with arm claudication, absent pulses and bruits.

**Kawasaki disease**, a medium-vessel vasculitis of young children, can cause coronary artery aneurysms ([[paediatrics/acute-childhood-illness]]). **Thromboangiitis obliterans** (Buerger's disease) is an inflammatory occlusive disease of small and medium arteries of the limbs in young people who smoke; stopping all tobacco is essential.

**Raynaud's phenomenon** is episodic vasospasm of the digital arteries, provoked by cold or emotion: the fingers turn white, then blue, then red as blood returns. **Primary Raynaud's** is common, starts in young women, is symmetrical and does not damage tissue. **Secondary Raynaud's** occurs with connective tissue diseases (especially systemic sclerosis), vibration injury, some drugs (such as beta-blockers) and other conditions; clues are onset after 30, asymmetry, digital ulcers, abnormal nailfold capillaries and positive autoantibodies.

## Venous thromboembolism

::: theorem Virchow's triad {#thm-virchow}
Thrombosis results from a combination of three factors:
1. **stasis** of blood flow;
2. **hypercoagulability** of the blood;
3. **endothelial injury** of the vessel wall.
:::

::: proof
Each factor removes one of the defences against thrombosis. Normal flow keeps platelets in the centre of the stream and washes away activated clotting factors; **stasis** (immobility, long journeys, heart failure, venous obstruction) lets them accumulate, particularly behind the valve cusps of the deep leg veins where venous thrombi usually start. **Hypercoagulability** raises the tendency to clot: cancer, pregnancy and the postpartum period, oestrogen-containing contraception and hormone replacement, inflammation, nephrotic syndrome, antiphospholipid syndrome, and inherited thrombophilias such as factor V Leiden. **Endothelial injury** exposes tissue factor and collagen: surgery, trauma, central venous catheters and previous thrombosis. Most episodes of venous thromboembolism involve more than one factor; a hip replacement, for example, combines all three. The general pathology of thrombosis is in [[pathology/haemodynamics]].
:::

**Deep vein thrombosis (DVT)** typically causes a swollen, painful, warm leg with calf tenderness; it may be asymptomatic. **Pulmonary embolism (PE)** causes breathlessness, pleuritic chest pain, haemoptysis, tachycardia and hypoxia; a large PE causes syncope, right heart failure and shock.

Diagnosis follows a structured pathway (NICE NG158):
- Estimate clinical probability with the **two-level Wells score** (for DVT or PE).
- If DVT is "likely", arrange **proximal leg vein ultrasound**; if PE is "likely", arrange **CT pulmonary angiography** (CTPA). If imaging cannot be done promptly, interim anticoagulation is given.
- If the score is "unlikely", measure **D-dimer**. A negative D-dimer makes VTE very unlikely; a positive one leads to imaging. D-dimer is sensitive but not specific: it is raised by infection, cancer, pregnancy, surgery and age.
- For suspected PE with low clinical probability, the **PERC rule** can be used to decide not to test further.

Treatment is **anticoagulation**, usually a DOAC (apixaban or rivaroxaban), for at least **3 months**. Whether to continue longer depends on whether the event was **provoked** by a transient major risk factor (such as surgery) or **unprovoked**, and on bleeding risk; people with unprovoked VTE are often offered longer-term treatment. Cancer-associated VTE is treated with a DOAC or low-molecular-weight heparin. **Massive PE** with shock is treated with **thrombolysis** unless contraindicated. Hospital inpatients are assessed for VTE risk and offered prophylaxis, mechanical or pharmacological, according to NICE NG89 ([[blood/thrombosis-anticoagulation]]).

::: example A swollen leg {#ex-dvt}
A 54-year-old woman has a swollen, tender left calf 10 days after a long-haul flight. She takes no hormones and has no cancer history. Her left calf is 4 cm larger than the right, with pitting oedema and tenderness along the deep veins. Her two-level Wells DVT score is 3. Outline the investigation and management.

::: solution
A Wells score of 2 or more makes DVT **"likely"**. The next step is **proximal leg vein ultrasound** within 4 hours; if that cannot be done, a D-dimer is taken and interim anticoagulation started, with the scan within 24 hours.

If ultrasound shows DVT, she is treated with an **anticoagulant**, usually a DOAC, for **at least 3 months**. Whether the DVT counts as provoked by the flight is a matter of clinical judgement; a long-haul flight is a relatively weak, transient risk factor, so she may be treated as having an unprovoked DVT, and the duration beyond 3 months is then reviewed, balancing recurrence risk against bleeding risk. A careful history and examination for symptoms of cancer is part of the assessment.

If the ultrasound is negative but the D-dimer is positive, a repeat scan is arranged in about a week, because a calf thrombus can extend.
:::
:::

::: warning A negative D-dimer means little when the probability is high
D-dimer testing is useful only when the clinical probability is low. In a person with a "likely" Wells score, a negative D-dimer does not exclude VTE safely, and imaging is still needed. Conversely, a positive D-dimer in a hospital inpatient, an older person or a pregnant woman is common and is not evidence of thrombosis. Interpret the test in light of the pre-test probability ([[epidemiology-ebm/diagnostic-tests]]).
:::

## Chronic venous disease

The calf muscle pump drives blood from the legs towards the heart: contraction squeezes the deep veins, and one-way valves prevent backflow. When valves fail, from primary weakness or after DVT (**post-thrombotic syndrome**), venous pressure in the leg stays high during walking (**venous hypertension**). The results are **varicose veins**, ankle oedema, skin changes (haemosiderin pigmentation, venous eczema, and **lipodermatosclerosis**, a hard, tight skin above the ankle) and, eventually, **venous leg ulcers**, typically above the medial malleolus. Venous ulcers are the commonest cause of leg ulcers.

The **ABPI** is measured before applying **compression**, because compression on a leg with significant arterial disease can cause tissue necrosis. Compression bandaging or hosiery is the main treatment for venous ulcers. Under NICE CG168, people with symptomatic varicose veins or venous skin changes are referred to a vascular service; **endothermal ablation** (radiofrequency or laser) is the first-line treatment, followed by foam sclerotherapy and then surgery if unsuitable. Treating superficial venous reflux speeds ulcer healing and reduces recurrence.

::: quiz
Which of the following is the threshold at which the NHS AAA screening programme refers a man to a vascular surgeon?
- [ ] 3.0 cm
- [ ] 4.5 cm
- [x] 5.5 cm
- [ ] 6.5 cm
::: solution
An aneurysm of **5.5 cm or more** leads to referral to a vascular surgeon, to be seen within 2 weeks. Aneurysms of 3.0–4.4 cm are scanned annually and 4.5–5.4 cm every 3 months. NICE also advises considering repair below 5.5 cm if the aneurysm is symptomatic, or is 4.0 cm or more and growing by more than 1 cm a year.
:::
:::

::: history
Rudolf Virchow, working in Würzburg and Berlin in the 1850s, showed that pulmonary emboli came from thrombi in the veins and described the factors that cause thrombosis, later summarised as his triad. In 1951 Charles Dubost in Paris resected an abdominal aortic aneurysm and replaced it with a homograft, the first successful operation of its kind. Charles Dotter introduced transluminal angioplasty in 1964, dilating a narrowed femoral artery with catheters, the beginning of endovascular treatment. Juan Parodi in Buenos Aires performed endovascular repair of an abdominal aortic aneurysm with a stent-graft in 1990. The UK Multicentre Aneurysm Screening Study, published in 2002, showed that ultrasound screening of older men reduced deaths from aneurysm, leading to the national screening programme in England from 2009.
:::

## Where this leads

Atherosclerosis and its risk factors are in [[cardiovascular/coronary-artery-disease]], and hypertension, the main risk factor for dissection, in [[cardiovascular/hypertension]]. Anticoagulation is covered in [[blood/thrombosis-anticoagulation]], stroke from carotid disease in [[nervous-system/stroke]], vasculitis in [[musculoskeletal/connective-tissue-vasculitis]], and vascular surgery in [[surgery/vascular-urological-surgery]].

::: summary
- Laplace: wall tension $T = Pr$; larger aneurysms carry higher wall stress, grow faster and rupture more readily.
- PAD: claudication or chronic limb-threatening ischaemia; ABPI below 0.9 confirms it; treat cardiovascular risk (stop smoking, statin, antiplatelet), supervised exercise, and revascularise for disabling or threatening disease.
- Acute limb ischaemia (six Ps), from embolism (often AF) or thrombosis, needs heparin and urgent revascularisation; watch for compartment syndrome.
- AAA: aorta 3.0 cm or more; NHS screening of men at 65; surveillance yearly at 3.0–4.4 cm, 3-monthly at 4.5–5.4 cm; refer at 5.5 cm or more; consider repair if symptomatic or growing by more than 1 cm a year at 4.0 cm or more.
- Dissection: tearing pain to the back, arm pressure difference; type A needs emergency surgery, type B usually medical treatment; never give antithrombotics before excluding it.
- Giant cell arteritis threatens sight: start steroids immediately. Secondary Raynaud's suggests connective tissue disease.
- VTE follows Virchow's triad; use Wells score, D-dimer (only if unlikely), ultrasound or CTPA; anticoagulate for at least 3 months, longer for many unprovoked events.
- Chronic venous disease: valve failure causes venous hypertension, skin change and ulcers; check ABPI before compression; endothermal ablation is first-line for varicose veins.
:::

## Exercises

::: exercise Calculate the ABPI {level=1 check="0.6"}
A woman's highest brachial systolic pressure is 140 mmHg and her highest ankle pressure on the left is 84 mmHg. Calculate her left ABPI (exact value) and interpret it.
::: solution
$ABPI = 84/140 =$ **0.6**. This is below 0.9 and indicates **peripheral arterial disease** of moderate severity.
:::
:::

::: exercise Laplace and the aneurysm {level=1 check="3"}
At the same blood pressure, by what factor is the wall tension of a 6.0 cm aneurysm greater than that of a normal 2.0 cm aorta, according to the law of Laplace?
::: solution
Tension is proportional to radius, so the ratio is $3.0/1.0 =$ **3**. If the aneurysm wall is also thinner, the increase in wall stress is greater still.
:::
:::

::: exercise Six Ps, then what? {level=1}
A 79-year-old woman with atrial fibrillation who stopped her anticoagulant two weeks ago develops sudden pain in her right leg. The leg is pale, cold and pulseless below the groin, with reduced sensation in the foot. List the immediate steps.
::: solution
This is **acute limb ischaemia**, probably from an **embolus** from the left atrium. Reduced sensation means the limb is threatened. Immediate steps: analgesia; **intravenous unfractionated heparin**; **urgent vascular surgical review** for embolectomy or other revascularisation within hours; baseline bloods including renal function, potassium, creatine kinase and clotting; ECG. After revascularisation, monitor for compartment syndrome and reperfusion effects (hyperkalaemia, acidosis, myoglobinuria). Long-term anticoagulation for AF is restarted and the reason it was stopped addressed.
:::
:::

::: exercise Screening results {level=2}
State the outcome of NHS AAA screening for men with the following aortic diameters: (a) 2.6 cm; (b) 3.8 cm; (c) 4.9 cm; (d) 5.6 cm. Why does the surveillance interval shorten as diameter increases?
::: solution
(a) Normal: **discharged**, no further scans.
(b) Small aneurysm: **annual** ultrasound surveillance.
(c) Medium aneurysm: **3-monthly** surveillance.
(d) Large aneurysm: **referral to a vascular surgeon** to be seen within 2 weeks.

The interval shortens because **growth rate and rupture risk increase with diameter**: wall tension rises with radius (Laplace), the wall thins, and larger aneurysms grow faster. All men with an aneurysm are also given advice to stop smoking and have cardiovascular risk assessed.
:::
:::

::: exercise Heart rate and the dissection {level=2}
Explain why a beta-blocker is given before a vasodilator in acute aortic dissection.
::: solution
The aim is to reduce the force with which blood is ejected into the damaged aorta, specifically the **rate of rise of pressure** ($dP/dt$) and the heart rate, as well as the pressure itself, to limit propagation of the dissection. A vasodilator given alone causes a **reflex tachycardia** and increased contractility through the baroreflex, which would increase $dP/dt$ and shear on the aortic wall. Beta-blockade first blunts this reflex; vasodilators are then added if the pressure remains above target.
:::
:::

::: exercise Headache and the jaw {level=2}
A 74-year-old woman has 3 weeks of new temporal headache, pain in the jaw when chewing, and aching shoulders. ESR is 78 mm/h. This morning she had a 10-minute episode of blurred vision in one eye. What is the likely diagnosis and why is it urgent?
::: solution
**Giant cell arteritis**: new headache over 50, jaw claudication, polymyalgic symptoms and a high ESR. Transient visual loss (**amaurosis fugax**) indicates ischaemia of the optic nerve or retina and warns of impending **permanent blindness**, which can affect both eyes. High-dose **glucocorticoids should be started immediately**, without waiting for confirmation, with same-day specialist (ophthalmology and rheumatology) assessment; the diagnosis is confirmed by temporal artery ultrasound or biopsy, which remains informative for some days after starting steroids. She will also need bone protection and monitoring for steroid adverse effects.
:::
:::

::: exercise The leg ulcer clinic {level=2}
A 72-year-old woman has a shallow ulcer above the medial malleolus with surrounding brown pigmentation and hard skin. Her ABPI is 0.95. What is the likely cause, what is the main treatment, and why was the ABPI measured?
::: solution
The site (above the medial malleolus), the pigmentation (haemosiderin) and hard skin (lipodermatosclerosis) indicate a **venous leg ulcer** from chronic venous hypertension.

The main treatment is **compression therapy** (multilayer bandaging or hosiery), together with leg elevation, exercise of the calf pump and wound care; referral to a vascular service to assess **superficial venous reflux**, whose treatment (for example by endothermal ablation) speeds healing and reduces recurrence.

The **ABPI** was measured because compression on a leg with significant arterial disease can reduce arterial flow and cause skin necrosis. An ABPI of 0.95 shows no significant arterial disease, so full compression is safe.
:::
:::

::: exercise Breathless after surgery {level=3}
A 61-year-old man becomes breathless with pleuritic chest pain 8 days after a right total knee replacement. Pulse 118 beats/min, BP 104/66 mmHg, SpO₂ 90% on air, respiratory rate 26. He has had no cancer. Construct a differential diagnosis, explain how you would decide between investigations, and outline what would change management if he became hypotensive.
::: hint
Use Virchow's triad to judge pre-test probability. When is D-dimer helpful, and when is it not?
:::
::: solution
**Differential diagnosis**: **pulmonary embolism** (most likely: recent major orthopaedic surgery combines stasis, hypercoagulability and endothelial injury); pneumonia, including aspiration; atelectasis; acute coronary syndrome; heart failure or fluid overload; pneumothorax; fat embolism (usually earlier, within 72 hours).

**Investigation**: his two-level Wells PE score is high (heart rate above 100, surgery within 4 weeks, and PE the most likely diagnosis), so PE is **"likely"**. **D-dimer is not useful**: it will be raised after surgery and a negative result would not exclude PE at this probability. He needs **CT pulmonary angiography**, with interim anticoagulation if imaging is delayed (considering his surgical bleeding risk with the orthopaedic team). ECG, chest X-ray, blood gases, troponin and BNP help with differentials and with risk stratification; echocardiography assesses right ventricular strain.

**If he became hypotensive** (sustained systolic below 90 mmHg or a large fall), this would be **high-risk (massive) PE**. Management would change to immediate resuscitation and consideration of **systemic thrombolysis**. Because he is 8 days after major surgery, bleeding risk is high, so alternatives such as **catheter-directed treatment or surgical embolectomy** would be discussed urgently with specialists, according to local protocols. Bedside echocardiography showing a dilated right ventricle supports the diagnosis when CT cannot be done safely.
:::
:::
