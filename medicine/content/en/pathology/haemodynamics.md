The health of every cell depends on a steady supply of blood. Blood must stay liquid inside the vessels, must not leak out of them in excess, and must clot quickly when a vessel is breached. This chapter covers what happens when these conditions fail: fluid escaping into tissues (**oedema**), blood pooling in organs (**congestion**), blood escaping from vessels (**haemorrhage**), blood clotting where it should not (**thrombosis**), material travelling in the bloodstream and blocking a distant vessel (**embolism**), tissue dying from loss of blood supply (**infarction**), and the whole circulation failing (**shock**).

These disorders cause much of the death and disability in developed countries. Myocardial infarction, stroke and pulmonary embolism are all, at bottom, problems of thrombosis and embolism. The physiology behind this chapter is in [[physiology/homeostasis-body-fluids]] and [[cardiovascular/circulation-blood-pressure]]; the clinical management is in the organ system courses.

## Oedema

About 60% of the lean body weight of an adult is water. Roughly two-thirds is inside cells; of the third outside cells, most lies in the interstitial space between cells and a smaller part in plasma. Fluid moves constantly between plasma and interstitium across the walls of capillaries and venules.

::: theorem The Starling principle {#thm-starling}
The net filtration of fluid across a capillary wall is

$$
J_v = K_f\big[(P_c - P_i) - \sigma(\pi_c - \pi_i)\big]
$$ {#eq-starling}

where $P_c$ and $P_i$ are the hydrostatic pressures in the capillary and the interstitium, $\pi_c$ and $\pi_i$ are the oncotic (colloid osmotic) pressures exerted by proteins in the plasma and the interstitium, $\sigma$ is the reflection coefficient of the wall to protein (1 if the wall is impermeable to protein, 0 if it is freely permeable), and $K_f$ is the filtration coefficient, which reflects the area and permeability of the wall.
:::

::: proof
Hydrostatic pressure pushes water out of the vessel. Plasma proteins, chiefly albumin, cannot easily cross the wall, so they hold water in by osmosis. The balance of these forces sets the net flow. Classical teaching held that fluid is filtered at the arterial end of the capillary, where hydrostatic pressure is high, and reabsorbed at the venous end, where it is lower. Modern work shows that in most tissues there is little steady reabsorption, because the oncotic pressure that matters is that just beneath the endothelial glycocalyx rather than in the bulk interstitium. Either way, the small net filtration is returned to the circulation by the **lymphatics**. Oedema forms when filtration exceeds the capacity of lymphatic drainage.
:::

::: definition Oedema and its four mechanisms {#def-oedema}
**Oedema** is an abnormal accumulation of fluid in the interstitial tissue or in body cavities. Fluid in body cavities is called an **effusion** (pleural, pericardial) or **ascites** (peritoneal). Widespread severe oedema is called **anasarca**. It arises from one or more of:

1. **Raised hydrostatic pressure**: heart failure, venous obstruction (deep vein thrombosis), and sodium and water retention by the kidneys.
2. **Reduced plasma oncotic pressure** from a low albumin: nephrotic syndrome (loss in urine), cirrhosis (reduced synthesis), severe malnutrition and protein-losing gut disease.
3. **Lymphatic obstruction** (lymphoedema): removal of or radiotherapy to lymph nodes, invasion by tumour, and infection by filarial worms.
4. **Increased vascular permeability**: inflammation, burns and allergic reactions.

The first three produce a **transudate**, with little protein. The fourth produces an **exudate**, rich in protein ([[pathology/acute-inflammation]]).
:::

The effects of oedema depend on where it is. Oedema of the legs is uncomfortable but rarely dangerous. When pressed, it leaves a pit that slowly fills (**pitting oedema**); lymphoedema, which is protein-rich and later fibrotic, does not pit as easily. **Pulmonary oedema** fills the alveoli with fluid and impairs gas exchange, so it can kill. **Cerebral oedema** in the rigid skull raises intracranial pressure and can push the brain through the foramen magnum (herniation).

::: widget plot
f: (35-20*x) - (p-3)
x: 0, 1
y: -15, 30
sliders: p=25:10:30:1
hlines: 0
labels: \text{net outward pressure (mmHg)}
caption: The classical Starling picture along a capillary, from the arterial end ($x = 0$) to the venous end ($x = 1$). Hydrostatic pressure falls linearly from 35 to 15 mmHg; interstitial pressure is taken as 0 and interstitial oncotic pressure as 3 mmHg, with $\sigma = 1$. The slider sets plasma oncotic pressure $p$. Above the zero line fluid leaves the vessel; below it fluid returns. Lowering $p$, as in nephrotic syndrome or cirrhosis, shifts the whole line upwards so that more fluid is filtered. The numbers are illustrative.
:::

::: example Starling forces in a low albumin {#ex-starling}
Use the values in the figure: capillary hydrostatic pressure 35 mmHg at the arterial end and 15 mmHg at the venous end, interstitial hydrostatic pressure 0, interstitial oncotic pressure 3 mmHg, $\sigma = 1$. Calculate the net filtration pressure at each end when plasma oncotic pressure is 25 mmHg, and again when it falls to 15 mmHg.
::: solution
1. Normal, arterial end: $(35 - 0) - (25 - 3) = 35 - 22 = 13$ mmHg outward.
2. Normal, venous end: $(15 - 0) - (25 - 3) = 15 - 22 = -7$ mmHg, that is 7 mmHg inward.
3. Low albumin, arterial end: $(35 - 0) - (15 - 3) = 35 - 12 = 23$ mmHg outward.
4. Low albumin, venous end: $(15 - 0) - (15 - 3) = 3$ mmHg, now outward.
5. With a low plasma oncotic pressure, fluid is filtered along the whole length of the capillary. When this exceeds lymphatic drainage, oedema forms. In practice the interstitial oncotic pressure also falls as more fluid is filtered, which limits the effect, so oedema from hypoalbuminaemia usually appears only when albumin is very low.
:::
:::

::: example A child with swollen eyes {#ex-nephrotic}
A 4-year-old boy has swelling around his eyes each morning and now swollen legs and a distended abdomen. His urine froths. Urine protein is very high, serum albumin is 14 g/L (reference about 35 to 50 g/L) and cholesterol is raised. Explain the oedema.
::: solution
1. Heavy proteinuria, hypoalbuminaemia, oedema and hyperlipidaemia make up the **nephrotic syndrome**. In a young child the commonest cause is minimal change disease.
2. Loss of albumin in the urine lowers the plasma oncotic pressure, so fluid is filtered into the interstitium along the whole capillary.
3. Oedema gathers where tissue pressure is low: around the eyes after lying flat at night, and in the legs and scrotum and as ascites when upright.
4. The kidneys also retain sodium in nephrotic syndrome, which contributes. Both mechanisms produce a transudate. The renal pathology is covered in [[renal/filtration]].
:::
:::

## Hyperaemia and congestion

Both terms mean an increased volume of blood in a tissue, but the mechanisms differ.

- **Hyperaemia** is an *active* process: arterioles dilate and more blood flows in. The tissue is red and warm. It occurs in exercising muscle, in blushing and in acute inflammation.
- **Congestion** is a *passive* process: blood cannot drain away, so it accumulates in veins and capillaries. The tissue is dark red-blue (cyanotic) because the stagnant blood is deoxygenated. It occurs in heart failure and with venous obstruction.

Long-standing congestion damages tissue because poorly perfused tissue becomes hypoxic. In **chronic passive congestion of the liver**, caused by right heart failure, the central veins of the lobules are distended and the hepatocytes around them become atrophic or die, while the better-oxygenated hepatocytes near the portal tracts develop fatty change. The cut surface of the liver shows a pattern of dark centres and pale periphery, likened to a nutmeg ("nutmeg liver"). In **chronic passive congestion of the lung**, caused by left heart failure, red cells leak into the alveoli and are broken down by macrophages, which then contain haemosiderin; these are called "heart failure cells" ([[cardiovascular/heart-failure]]).

## Haemorrhage

**Haemorrhage** is the escape of blood from vessels. It is described by size:

- **Petechiae**: tiny (1 to 2 mm) haemorrhages into skin or mucosa, typical of a low platelet count or a platelet function defect.
- **Purpura**: slightly larger (about 3 mm to 1 cm) haemorrhages, seen with platelet disorders, vasculitis and fragile vessels.
- **Ecchymoses**: larger (over 1 to 2 cm) subcutaneous bruises, which change colour as haemoglobin is converted to bilirubin and haemosiderin.
- **Haematoma**: a collection of blood within a tissue, which may be trivial or, in the brain, fatal.

The effect of bleeding depends on the volume, the speed and the site. Rapid loss of about a fifth of the blood volume can cause shock, whereas the same amount lost slowly over weeks may only cause iron deficiency anaemia. A small haemorrhage in the brainstem can kill, while the same volume in the thigh is harmless.

## Normal haemostasis

Haemostasis is the process that stops bleeding at a site of vessel injury while keeping blood fluid elsewhere. It happens in four overlapping steps, covered in detail in [[blood/haemostasis-bleeding]].

1. **Vasoconstriction**: brief narrowing of the injured vessel.
2. **Primary haemostasis**: platelets adhere to exposed collagen through **von Willebrand factor**, become activated, release their granules (including ADP and thromboxane A₂) and aggregate via the glycoprotein IIb/IIIa receptor to form a platelet plug.
3. **Secondary haemostasis**: **tissue factor** exposed at the site of injury starts the coagulation cascade, which generates **thrombin**. Thrombin converts fibrinogen into **fibrin**, which reinforces the platelet plug.
4. **Clot stabilisation and resorption**: fibrin is cross-linked and the plug contracts. **Fibrinolysis** begins: plasminogen is converted to plasmin, which breaks down fibrin. The fragments include **D-dimer**.

Normal endothelium actively prevents clotting. It covers the collagen beneath it, makes prostacyclin and nitric oxide that inhibit platelets, carries heparin-like molecules that activate **antithrombin**, expresses thrombomodulin that switches thrombin to activating **protein C** (which, with protein S, destroys factors Va and VIIIa), and secretes tissue plasminogen activator. Injury or activation of endothelium switches it towards clotting.

## Thrombosis

::: definition Thrombosis {#def-thrombosis}
**Thrombosis** is the formation of a solid mass of blood constituents (a **thrombus**) inside an intact blood vessel or the heart during life. It differs from a blood **clot**, which forms outside vessels or after death.
:::

::: theorem Virchow's triad {#thm-virchow}
Three groups of factors predispose to thrombosis:

1. **Endothelial injury** or dysfunction;
2. **Abnormal blood flow**: stasis or turbulence;
3. **Hypercoagulability** of the blood.

Any one may be enough, but thrombosis usually results from a combination.
:::

::: proof
Endothelial injury exposes collagen and tissue factor, and loss of the endothelium's anticoagulant functions removes the brakes on platelets and thrombin. It dominates in the heart and arteries, where flow is fast: thrombi form on ulcerated atherosclerotic plaques, on the endocardium over a myocardial infarct and on damaged valves.

Normal blood flow is laminar: cells travel in the centre of the stream and are separated from the endothelium by a layer of plasma. Turbulence, at arterial branches, in aneurysms and over plaques, injures endothelium and creates eddies where platelets meet the wall. Stasis, in leg veins of an immobile person or in a fibrillating left atrium, lets platelets touch the endothelium, prevents dilution of activated clotting factors and slows the inflow of inhibitors. Stasis dominates in veins.

Hypercoagulability is any change in the blood that favours clotting. Inherited forms include factor V Leiden (factor V resistant to protein C), the prothrombin G20210A variant and deficiencies of antithrombin, protein C and protein S. Acquired forms are far more common: cancer, pregnancy and the weeks after delivery, oestrogen-containing contraceptives and hormone replacement, major surgery and trauma, the antiphospholipid syndrome, heparin-induced thrombocytopenia, and obesity.
:::

### Arterial and venous thrombi

Thrombi differ according to where they form.

- **Arterial thrombi** form in fast-flowing blood, usually on a damaged surface such as a ruptured atherosclerotic plaque. They are rich in platelets and pale, and they tend to grow backwards from the point of attachment. They block the coronary, cerebral and leg arteries.
- **Venous thrombi** form in slow-flowing blood, usually in the deep veins of the legs. They are rich in red cells trapped in fibrin, dark red, and they grow in the direction of flow towards the heart. Their danger is embolism to the lungs.
- **Mural thrombi** attach to the wall of the heart chambers or the aorta, for example over an infarct or in an aneurysm.
- **Vegetations** are thrombi on heart valves, either infected (infective endocarditis) or sterile.

Thrombi formed in flowing blood show the **lines of Zahn**: alternating pale layers of platelets and fibrin and dark layers of red cells. These lines show that the thrombus formed during life. A clot that forms after death is soft, gelatinous and dark red with a yellow "chicken fat" upper part where red cells have settled; it is not attached to the vessel wall and has no lines.

### The fate of a thrombus

A thrombus that does not kill the patient has one of four fates:

1. **Propagation**: it grows, adding more platelets and fibrin, and may block the vessel.
2. **Embolisation**: part or all of it breaks off and travels in the blood.
3. **Dissolution**: fibrinolysis removes it. This is most likely with fresh thrombi, which is why clot-dissolving drugs work only in the first hours.
4. **Organisation and recanalisation**: older thrombi are invaded by granulation tissue, become part of the vessel wall and may develop new channels that partly restore flow.

::: example Calf pain after a long operation {#ex-dvt}
A 66-year-old woman had a hip replacement six days ago and has been mostly in bed since. Her left calf is now swollen, warm and tender. Explain why she is at risk of venous thrombosis using Virchow's triad, and outline how deep vein thrombosis is assessed.
::: solution
1. **Stasis**: immobility removes the calf muscle pump, so blood pools in the deep veins of the leg.
2. **Endothelial injury**: surgery on the hip can damage the femoral vein through handling and positioning.
3. **Hypercoagulability**: major surgery releases tissue factor and raises fibrinogen and factor VIII as part of the acute-phase response.
4. All three components are present, so orthopaedic surgery carries a high risk of venous thromboembolism, which is why patients receive thromboprophylaxis after a risk assessment.
5. In the UK, NICE guidance (NG158) uses a structured clinical probability score (the two-level Wells score). If deep vein thrombosis is likely, proximal leg vein ultrasound is performed; if unlikely, a D-dimer test is done first, and a normal D-dimer makes thrombosis very unlikely. Management follows [[blood/thrombosis-anticoagulation]].
:::
:::

::: warning D-dimer rules out; it does not rule in
D-dimer is produced whenever fibrin is broken down. It is raised in thrombosis, but also after surgery, in infection, cancer, pregnancy and old age. A normal D-dimer in a person with a low clinical probability makes thrombosis very unlikely. A raised D-dimer in a person who has just had surgery tells almost nothing. The test should not be used to "screen" people with a high clinical probability, who need imaging whatever the D-dimer shows. To reduce false positives in older people, NICE suggests considering an age-adjusted threshold for those over 50.
:::

::: example An age-adjusted D-dimer {#ex-ddimer}
A 72-year-old man has a two-level Wells score that makes pulmonary embolism unlikely. His D-dimer is 640 µg/L FEU, and the laboratory's standard cut-off is 500 µg/L FEU. The age-adjusted threshold commonly used for people over 50 is age × 10 µg/L FEU. Interpret the result.
::: solution
1. Age-adjusted threshold: $72 \times 10 = 720$ µg/L FEU.
2. His result of 640 µg/L FEU is above the standard cut-off but below the age-adjusted one.
3. With a low clinical probability and a D-dimer below the age-adjusted threshold, pulmonary embolism is considered excluded under pathways that use this approach, and he avoids an unnecessary CT pulmonary angiogram.
4. The adjustment works because D-dimer rises with age in healthy people, so a fixed cut-off loses specificity in older people. Local protocols must specify the assay units, because some laboratories report D-dimer in different units.
:::
:::

## Embolism

::: definition Embolism {#def-embolism}
An **embolus** is a detached solid, liquid or gaseous mass carried by the blood from its point of origin to a distant site, where it lodges and may block a vessel. The commonest emboli are fragments of thrombus (**thromboembolism**). Others are fat, air, amniotic fluid, atheromatous debris, tumour cells and infected material.
:::

### Pulmonary embolism

Most pulmonary emboli come from deep vein thrombi in the legs, especially the veins above the knee. The embolus passes through the right side of the heart into the pulmonary arteries. Its effect depends on its size and on the state of the circulation.

- A large embolus lodging at the bifurcation of the pulmonary trunk (a **saddle embolus**) or blocking a large part of the pulmonary circulation causes acute right heart failure and can kill suddenly.
- Medium-sized emboli block medium arteries. Because the lung has a dual blood supply, from the pulmonary and the bronchial arteries, only a minority cause **infarction**, mainly in people whose circulation is already compromised, for example by heart failure. Infarction causes pleuritic pain and haemoptysis.
- Many small emboli over time can cause chronic thromboembolic pulmonary hypertension.

### Systemic thromboembolism

Emboli in the arterial circulation usually arise in the heart: in the left atrial appendage in atrial fibrillation, from a mural thrombus over a myocardial infarct, or from valve vegetations. A smaller number come from atherosclerotic plaques in the aorta and carotid arteries. They lodge in the brain (causing stroke), the legs, the gut, the kidneys and the spleen. A venous thrombus can enter the systemic circulation through a hole between the right and left sides of the heart, such as a patent foramen ovale: a **paradoxical embolus**. Atrial fibrillation as a cause of stroke is covered in [[cardiovascular/arrhythmias]].

### Other emboli

- **Fat embolism**: fat globules enter the circulation after fractures of long bones such as the femur, or after extensive soft-tissue injury. Most cases are silent. In a minority, a **fat embolism syndrome** develops 1 to 3 days after injury, with breathlessness and hypoxaemia, confusion and a petechial rash on the upper body. Fat globules obstruct small vessels, and the fatty acids released injure endothelium.
- **Air embolism**: air enters the circulation through an open vein, for example during insertion or removal of a central venous catheter. A large volume, of the order of 100 mL, can form a frothy obstruction in the right heart. **Decompression sickness** occurs when a diver surfaces too quickly: nitrogen dissolved in tissues at high pressure comes out of solution as bubbles.
- **Amniotic fluid embolism** is a rare and often fatal complication of labour. Amniotic fluid and fetal cells enter the maternal circulation, causing sudden cardiorespiratory collapse and disseminated intravascular coagulation.
- **Atheroembolism**: fragments of atheroma, often dislodged during arterial catheterisation, lodge in small arteries of the kidneys, skin and gut; cholesterol crystals leave needle-shaped clefts in the vessels.

::: example Confusion after a fractured femur {#ex-fat}
A 22-year-old man fractured his femur in a motorcycle accident. Forty-eight hours later, before surgical fixation, he becomes breathless and confused, his oxygen saturation is 88% on air, and a few petechiae appear on his chest and in his conjunctivae. Explain the likely diagnosis.
::: solution
1. The timing (one to three days after a long bone fracture) and the triad of respiratory distress, neurological change and petechiae suggest **fat embolism syndrome**.
2. Marrow fat enters torn veins at the fracture and travels to the lungs, where globules block capillaries. Some pass through the pulmonary circulation, or through a patent foramen ovale, to the brain and skin.
3. Free fatty acids released from the fat by lipases damage endothelium, causing leaky vessels in the lung and hypoxaemia. The petechiae reflect damaged capillaries and platelet consumption.
4. Management is supportive, and early fixation of long bone fractures reduces the risk. Pulmonary thromboembolism must also be considered, but it is less likely to cause a petechial rash.
:::
:::

## Infarction

::: definition Infarction {#def-infarction}
An **infarct** is an area of ischaemic necrosis caused by occlusion of the arterial supply or, less often, the venous drainage of a tissue. Almost all infarcts result from thrombosis or embolism.
:::

Infarcts are classified by colour.

- **White (pale) infarcts** occur when an artery is blocked in a solid organ with a single, **end-arterial** supply: the heart, kidney and spleen. Little blood enters the dead area, which becomes pale and firm. Infarcts in such organs are often wedge-shaped, with the apex at the blocked vessel and the base at the organ surface.
- **Red (haemorrhagic) infarcts** occur when blood continues to enter the dead tissue: after venous occlusion (torsion of the testis or ovary), in loose tissues that let blood collect, in organs with a **dual circulation** (lung, liver), in tissue that was previously congested, and when flow is restored to a dead area. Infarcts of the bowel in a strangulated hernia are red.

The microscopic appearance is **coagulative necrosis** in most organs, followed by inflammation and replacement by scar. In the brain, infarction produces liquefactive necrosis ([[pathology/cell-injury]]).

Whether a blocked vessel causes an infarct depends on four factors:

1. **The anatomy of the blood supply**: organs with an alternative supply (the lung, the liver, the hand with two arteries) resist infarction; organs with end arteries do not.
2. **The rate of occlusion**: a slowly narrowing artery allows collateral vessels to develop, whereas a sudden occlusion gives no time.
3. **The vulnerability of the tissue to hypoxia**: neurons die after minutes, heart muscle after twenty to thirty minutes, fibroblasts survive hours.
4. **The oxygen content of the blood**: anaemia or hypoxaemia makes infarction more likely at a given degree of obstruction.

::: quiz
At autopsy a mass is found in the pulmonary artery. It is firm, dry, attached to the vessel wall and shows alternating pale and dark layers. What does this indicate?
- [ ] A clot that formed after death
- [x] A thrombus or thromboembolus that formed in flowing blood during life
- [ ] A fat embolus
- [ ] A tumour embolus
::: solution
Alternating layers of platelets with fibrin and of red cells are the **lines of Zahn**, which form only in flowing blood. A post-mortem clot is soft, gelatinous, not attached, and often has a yellow upper layer where red cells settled. In the pulmonary artery, a laminated mass is most likely an embolus from a leg vein thrombus.
:::
:::

## Disseminated intravascular coagulation

::: definition Disseminated intravascular coagulation {#def-dic}
**Disseminated intravascular coagulation** (DIC) is an acquired syndrome in which widespread activation of coagulation forms small thrombi throughout the microcirculation. Platelets and clotting factors are consumed and fibrinolysis is activated, so the patient both clots and bleeds.
:::

DIC is not a disease in itself but a complication of a serious underlying condition. The commonest triggers are **sepsis**, major **trauma** and burns, **obstetric complications** (placental abruption, amniotic fluid embolism, retained dead fetus), and **cancers**, especially acute promyelocytic leukaemia and mucin-secreting adenocarcinomas. The common mechanism is release of tissue factor or other procoagulants into the blood, or widespread endothelial injury.

The results are microthrombi in the kidneys, lungs, brain and adrenal glands, causing organ damage, and bleeding from wounds, venepuncture sites and mucosa. Laboratory tests typically show a low platelet count, prolonged prothrombin time and activated partial thromboplastin time, low fibrinogen, raised D-dimer and fragmented red cells on the blood film. Treatment is directed at the cause, with support of blood components where needed ([[blood/haemostasis-bleeding]]).

## Shock

::: definition Shock {#def-shock}
**Shock** is circulatory failure that results in inadequate delivery or use of oxygen by the tissues, leading to cellular hypoxia. It is usually, but not always, accompanied by low blood pressure. It is classified by mechanism:

- **Hypovolaemic shock**: loss of blood or fluid (haemorrhage, vomiting, diarrhoea, burns).
- **Cardiogenic shock**: failure of the heart as a pump (large myocardial infarction, arrhythmia, myocarditis).
- **Obstructive shock**: obstruction to the filling or outflow of the heart (massive pulmonary embolism, tension pneumothorax, cardiac tamponade).
- **Distributive shock**: widespread vasodilation and leaky vessels, so that blood volume is "distributed" into a large vascular bed. Causes are **septic shock**, **anaphylaxis** and **neurogenic shock** after spinal cord injury.
:::

Shock passes through three stages. In the **compensated** stage, reflexes maintain perfusion of the vital organs: the sympathetic nervous system raises the heart rate and constricts vessels in the skin and gut, and the kidneys retain salt and water through the renin–angiotensin–aldosterone system. The skin is cold and pale (except in early septic shock, where it may be warm). In the **progressive** stage, tissue hypoxia leads to anaerobic metabolism and **lactic acidosis**. Acidosis dilates arterioles, blood pools in the microcirculation, and endothelial damage and DIC develop. In the **irreversible** stage, cellular damage is so extensive that restoring blood pressure no longer prevents death.

The pathologist sees the consequences in many organs: acute tubular injury in the kidneys, diffuse alveolar damage in the lungs (the "shock lung" of acute respiratory distress syndrome), ischaemic damage to the gut, the brain and the heart, and haemorrhage into the adrenal glands, which is classically seen in meningococcal sepsis.

Two simple bedside numbers help to recognise shock. The **mean arterial pressure** (MAP) is the average pressure driving blood into the organs; it is approximated as

$$
\text{MAP} \approx \text{DBP} + \tfrac{1}{3}(\text{SBP} - \text{DBP})
$$ {#eq-map}

where SBP and DBP are the systolic and diastolic pressures. The **shock index** is the heart rate divided by the systolic pressure; values above about 1 suggest significant shock. In septic shock, as defined by Sepsis-3, vasopressors are needed to keep the MAP at 65 mmHg or above, and the serum lactate is above 2 mmol/L despite adequate fluid resuscitation.

::: example A man hit by a car {#ex-shock}
A 40-year-old man is brought in after being struck by a car. His heart rate is 128 beats per minute and his blood pressure is 86/58 mmHg. He is pale, cold and confused, and his abdomen is distended. Calculate the MAP and the shock index, and explain the physiology.
::: solution
1. MAP $\approx 58 + \tfrac{1}{3}(86 - 58) = 58 + 9.3 \approx 67$ mmHg.
2. Shock index $= 128/86 \approx 1.49$, well above 1.
3. The likely mechanism is **hypovolaemic shock** from internal bleeding, probably intra-abdominal.
4. The fast heart rate and cold, pale skin show sympathetic compensation: the body is diverting blood from the skin and gut to the brain and heart. The low blood pressure means that compensation is failing, and the confusion shows that the brain is underperfused.
5. A MAP near 65 mmHg may look acceptable, but in a young person with a fast heart rate it hides a large blood loss. Management follows trauma protocols, with control of bleeding as the priority ([[surgery/trauma]], [[emergency-critical-care/shock-fluids]]).
:::
:::

::: history
William Harvey described the circulation of the blood in 1628. Rudolf Virchow, studying pulmonary artery obstruction in the 1850s, showed that clots in the lungs usually came from veins elsewhere, and introduced the terms *thrombosis* and *embolism*; the three factors he considered were later grouped as "Virchow's triad". In 1875 Friedrich Wilhelm Zahn described the layered structure of thrombi formed in flowing blood. In 1896 Ernest Starling showed that fluid exchange across capillaries is governed by the balance of hydrostatic pressure and the osmotic pressure of plasma proteins.
:::

## Where this leads

The disorders in this chapter recur throughout clinical medicine. Coronary thrombosis and myocardial infarction are in [[cardiovascular/coronary-artery-disease]], stroke in [[nervous-system/stroke]], venous thromboembolism and anticoagulation in [[blood/thrombosis-anticoagulation]], and the recognition and treatment of shock in [[emergency-critical-care/shock-fluids]].

::: summary
- Fluid exchange across capillaries follows the Starling principle. Oedema results from raised hydrostatic pressure, low plasma oncotic pressure, lymphatic obstruction or increased permeability; only the last produces an exudate.
- Hyperaemia is active (arteriolar dilation); congestion is passive (impaired venous outflow), as in the nutmeg liver of right heart failure.
- Haemostasis involves vasoconstriction, a platelet plug, fibrin formation and fibrinolysis; normal endothelium is anticoagulant.
- Virchow's triad: endothelial injury, abnormal flow and hypercoagulability. Arterial thrombi are platelet-rich and form on damaged endothelium; venous thrombi are red-cell-rich and form in stasis.
- Lines of Zahn show that a thrombus formed in flowing blood during life. Thrombi propagate, embolise, dissolve or organise.
- Most emboli are thromboemboli; others are fat, air, amniotic fluid and atheroma. Leg vein thrombi embolise to the lungs; cardiac thrombi embolise to the brain and limbs.
- Infarcts are white in solid organs with end arteries and red in organs with a dual supply, after venous occlusion and after reperfusion.
- DIC is consumption of platelets and clotting factors by widespread microthrombi, causing both thrombosis and bleeding.
- Shock is hypovolaemic, cardiogenic, obstructive or distributive, and passes from compensated to progressive to irreversible stages.
:::

## Exercises

::: exercise Mean arterial pressure {level=1 check="70"}
Estimate the mean arterial pressure, in mmHg, for a blood pressure of 90/60 mmHg using $\text{DBP} + \tfrac{1}{3}(\text{SBP} - \text{DBP})$. Give the exact value.
::: solution
$60 + \tfrac{1}{3}(90 - 60) = 60 + 10 = 70$ mmHg.
:::
:::

::: exercise Name the mechanism of oedema {level=1}
Give the main Starling mechanism of oedema in: (a) a swollen arm after axillary lymph node clearance; (b) ankle oedema in right heart failure; (c) ascites in cirrhosis; (d) a swollen sprained ankle.
::: solution
(a) Lymphatic obstruction. (b) Raised capillary hydrostatic pressure from raised venous pressure, with renal sodium retention. (c) Mainly low plasma oncotic pressure from reduced albumin synthesis, together with raised portal venous pressure and sodium retention. (d) Increased vascular permeability from inflammation.
:::
:::

::: exercise Classify the shock {level=1}
Classify the shock: (a) a man with a tension pneumothorax; (b) a woman with a severe reaction to a bee sting; (c) a man with a large anterior myocardial infarction; (d) a child with severe dehydration from gastroenteritis; (e) a woman with pneumonia and a falling blood pressure despite fluids.
::: solution
(a) Obstructive. (b) Distributive (anaphylactic). (c) Cardiogenic. (d) Hypovolaemic. (e) Distributive (septic).
:::
:::

::: exercise Shock index {level=2 check="round(115/92*100)/100"}
A woman two hours after childbirth has a heart rate of 115 beats per minute and a blood pressure of 92/60 mmHg. Calculate her shock index, rounded to two decimal places, and interpret it.
::: solution
$115/92 = 1.25$. A shock index above about 1 suggests significant blood loss. After childbirth this should prompt urgent assessment for postpartum haemorrhage, because young women compensate well and their blood pressure may fall only late.
:::
:::

::: exercise Starling at the venous end {level=2 check="-2"}
At the venous end of a capillary, $P_c = 18$ mmHg, $P_i = 0$, $\pi_c = 23$ mmHg, $\pi_i = 3$ mmHg and $\sigma = 1$. Calculate the net filtration pressure in mmHg (positive means outward). Give the exact value.
::: solution
$(18 - 0) - (23 - 3) = 18 - 20 = -2$ mmHg: a small inward pressure.
:::
:::

::: exercise Red or white? {level=2}
Predict whether each infarct will be red or white, and explain: (a) splenic infarct from an embolus in endocarditis; (b) lung infarct in a patient with heart failure; (c) small bowel in a strangulated hernia; (d) renal infarct from an embolus in atrial fibrillation.
::: solution
(a) White: solid organ with end arteries. (b) Red: the lung has a dual circulation and is congested, so bronchial blood flows into the dead area. (c) Red: venous outflow is obstructed first in strangulation, and the bowel is loose tissue with collateral supply. (d) White: the kidney has end arteries.
:::
:::

::: exercise Recurrent thrombosis in a young woman {level=3}
A 29-year-old woman has had a deep vein thrombosis, two miscarriages after 10 weeks of pregnancy and now a transient ischaemic attack. Her platelet count is mildly low and her APTT is prolonged. Suggest the most likely diagnosis, explain the paradox of a prolonged clotting time in a person who clots, and state which tests confirm it.
::: hint
Think of an acquired hypercoagulable state with antibodies.
:::
::: solution
The likely diagnosis is the **antiphospholipid syndrome**: venous and arterial thrombosis and pregnancy morbidity with persistent antiphospholipid antibodies. The antibodies (lupus anticoagulant, anticardiolipin and anti-β2-glycoprotein I) bind phospholipid–protein complexes. In the test tube they interfere with the phospholipid on which the clotting reactions are assembled, so the APTT is prolonged; this is why the antibody is called a lupus *anticoagulant*. In the body, by contrast, they activate endothelium, platelets and complement and promote thrombosis. Confirmation requires the tests to be positive on two occasions at least 12 weeks apart. It may occur alone or with systemic lupus erythematosus. Management is specialist and involves anticoagulation, with special care in pregnancy.
:::
:::

::: exercise Collapse after a long journey {level=3}
A 54-year-old man with treated colon cancer collapses at an airport after a 12-hour flight. He is breathless, his heart rate is 124 beats per minute, his blood pressure is 80/50 mmHg and his neck veins are distended. Explain the most likely sequence of events from Virchow's triad to shock, and name the type of shock.
::: solution
Prolonged sitting caused **stasis** in the leg veins; **cancer** makes the blood hypercoagulable through tumour procoagulants such as tissue factor; dehydration on a long flight may contribute. A deep vein thrombosis formed in the leg and part of it embolised. The embolus passed through the right heart and lodged in the main pulmonary arteries, blocking a large part of the pulmonary circulation. The right ventricle cannot pump against this obstruction, so it dilates and fails, the neck veins distend, filling of the left ventricle falls and cardiac output collapses. This is **obstructive shock** from massive pulmonary embolism. It is a medical emergency in which treatment to remove or dissolve the clot may be life-saving, following current guidance.
:::
:::
