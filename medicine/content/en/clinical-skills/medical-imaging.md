Medical imaging lets clinicians see inside the body without opening it. Each technique works by sending energy into the body (X-rays, sound, radio waves in a magnetic field, or the gamma rays from an injected tracer) and recording how the tissues change it. Understanding the physics in outline explains what each technique shows well, what it misses, and what harms it carries.

This chapter covers the principles of choosing an imaging test, plain radiography and a systematic approach to the chest X-ray, computed tomography, ultrasound, magnetic resonance imaging and nuclear medicine, and the risks of radiation and contrast. It uses the anatomical planes and imaging conventions of [[anatomy/anatomical-language]].

## Choosing an imaging test

An imaging test is a diagnostic test like any other. It should answer a clinical question, and the choice depends on what the question is, how accurate the available tests are for it, their risks, and how quickly the answer is needed.

::: definition Justification and optimisation {#def-justification}
In the UK, medical exposures to ionising radiation are governed by the **Ionising Radiation (Medical Exposure) Regulations 2017**, known as **IR(ME)R**. Two principles apply to every exposure:

- **Justification**: the expected benefit of the exposure for the individual must outweigh its risk, taking into account alternatives that involve less or no ionising radiation. The justification is made by a trained practitioner, usually a radiologist or radiographer, on the basis of the clinical information in the request.
- **Optimisation**: once justified, the dose must be kept **as low as reasonably practicable** while obtaining the diagnostic information needed.

The Royal College of Radiologists publishes referral guidance, **iRefer**, recommending the appropriate first investigation for common clinical problems.
:::

A good imaging request gives the clinical question, the relevant history and examination findings, and any factors affecting the choice or safety of the test (pregnancy, kidney function, allergies, implanted devices). "?pathology" is not a question; "Sudden pleuritic chest pain and hypoxia 10 days after knee replacement; Wells score 6; ?pulmonary embolism" is.

## Plain radiography

X-rays are high-energy photons. As they pass through the body, some are absorbed or scattered, and the rest reach a detector. Dense tissues and those containing atoms of high atomic number (such as calcium in bone, or iodine and barium in contrast agents) absorb more and appear **white** (radio-opaque); tissues that absorb little, such as air in the lungs, appear **black** (radiolucent).

::: theorem Attenuation of X-rays {#thm-attenuation}
For a narrow beam of X-rays of a single energy passing through a uniform material of thickness $x$, the transmitted intensity is

$$
I = I_0 \, e^{-\mu x},
$$

where $I_0$ is the incident intensity and $\mu$ is the **linear attenuation coefficient** of the material, which increases with its density and atomic number and depends on the X-ray energy.
:::

The image contrast between two tissues therefore depends on the difference in their attenuation coefficients. On a plain film there are five basic densities: **air** (black), **fat** (dark grey), **soft tissue and fluid** (mid grey, the two indistinguishable), **bone** (white) and **metal** (brilliant white). A boundary is visible only where two different densities meet.

::: widget plot
f: exp(-m*x); exp(-n*x)
x: 0, 20
y: 0, 1
sliders: m=0.2:0.02:1:0.02; n=0.5:0.02:1.5:0.02
labels: \text{tissue with coefficient } m; \text{tissue with coefficient } n
caption: Fraction of X-ray intensity transmitted against thickness (cm) for two materials with different attenuation coefficients (per cm). The difference between the curves is the contrast available to the detector. Simplified single-energy model with illustrative coefficients.
:::

::: definition The silhouette sign {#def-silhouette}
Two structures of the same density that lie in contact cannot be distinguished on a radiograph: the border between them disappears. This is the **silhouette sign**. On a chest X-ray, consolidation in a lobe that touches the heart or diaphragm makes that border invisible. Loss of the right heart border suggests disease in the right middle lobe; loss of the left heart border suggests the lingula; loss of a hemidiaphragm suggests the lower lobe on that side. If a border remains sharp despite an opacity, the opacity is not in contact with it.
:::

### A systematic approach to the chest X-ray

The chest X-ray is the most frequently requested imaging test. A systematic approach avoids the commonest error, which is to stop looking after the first abnormality is found (search satisficing, [[clinical-skills/clinical-reasoning#def-bias]]).

1. **Details**: the right patient, date and time; compare with previous films.
2. **Projection**: **PA** (posteroanterior, standing; the standard view) or **AP** (anteroposterior, often sitting or supine in sick patients). AP films magnify the heart, so heart size cannot be judged reliably on them.
3. **Quality**: **rotation** (the medial ends of the clavicles should be equidistant from the spinous processes), **inspiration** (about 5–6 anterior ribs or 9–10 posterior ribs visible above the diaphragm in mid-clavicular line), and **exposure** (the vertebrae just visible behind the heart).
4. **Airway**: the trachea central, the carina and main bronchi.
5. **Breathing**: compare the lungs zone by zone; look for opacities, lucencies, masses, and the pleural edges (pneumothorax) and costophrenic angles (effusion).
6. **Cardiac**: heart size (on a PA film, a **cardiothoracic ratio** above 0.5 suggests cardiomegaly), heart borders, mediastinal width and the hila.
7. **Diaphragm**: shape, height and the costophrenic angles; **free air under the diaphragm** on an erect film suggests a perforated viscus.
8. **Everything else**: bones (ribs, clavicles, spine), soft tissues, and lines and tubes: endotracheal tube, central lines, nasogastric tube, drains, pacemakers.
9. **Review areas**: places where abnormalities hide, such as behind the heart, the apices, below the diaphragm and the hila.

::: example Where is the pneumonia? {#ex-cxr}
Mr Baptiste, 49, has a fever and productive cough. His PA chest X-ray shows an ill-defined opacity in the right lower zone. The right heart border cannot be seen, but the right hemidiaphragm is sharp. Air bronchograms are visible within the opacity. Where is the abnormality and what is it likely to be?

::: solution
The loss of the right heart border (silhouette sign) places the opacity in contact with the right atrium, which means the **right middle lobe**. The preserved right hemidiaphragm makes the right lower lobe less likely. **Air bronchograms** (dark branching airways visible against opaque lung) show that the alveoli are filled while the airways remain open, which is the appearance of **consolidation**. With fever and productive cough, the most likely diagnosis is right middle lobe pneumonia. Follow-up imaging after treatment is recommended in some groups (for example smokers and older people) to make sure the opacity resolves and is not hiding an underlying tumour.
:::
:::

::: example Checking a nasogastric tube {#ex-ngtube}
A nasogastric tube has been inserted for feeding in Mrs Ibrahim, 80, after a stroke. The pH of the aspirate could not be measured, so a chest X-ray has been taken to confirm the position. What criteria must be met before the tube is used?

::: solution
Placing feed, fluid or medicines down a misplaced nasogastric tube (into the lung) is a **Never Event** in England. When aspirate pH testing is not possible or not conclusive, the X-ray must be interpreted by a competent person using recognised criteria. The tube should:

- follow the line of the oesophagus, staying **in the midline** and **bisecting the carina** (passing down between the main bronchi rather than following one of them);
- **cross the diaphragm in the midline**;
- have its **tip clearly visible below the left hemidiaphragm**, in the stomach.

A tube that follows a bronchus, curls in the oesophagus or ends above the diaphragm is not safe to use. The X-ray must be the one taken after the current insertion, the interpretation must be documented, and if there is any doubt the tube must not be used.
:::
:::

### The abdominal X-ray

The abdominal X-ray has limited uses: mainly suspected **bowel obstruction** and some foreign bodies. A useful guide to dilatation is the **"3–6–9" rule**: small bowel more than 3 cm, colon more than 6 cm and caecum more than 9 cm in diameter are dilated. Small bowel has **valvulae conniventes** crossing the full width of the lumen; the colon has **haustra** that do not cross fully. For acute abdominal pain in adults, CT is usually more informative, and an erect chest X-ray is better than an abdominal film for free air.

## Computed tomography

**Computed tomography (CT)** passes a rotating fan of X-rays through the body and uses many projections to reconstruct cross-sectional images. Each pixel is given a value in **Hounsfield units (HU)**, a scale on which **water is 0** and **air is −1000**.

::: definition Hounsfield units and windows {#def-hounsfield}
Approximate CT values are: air −1000 HU; fat about −100 HU; water 0 HU; soft tissue around +20 to +80 HU; acute blood clot somewhat denser than soft tissue (often about +50 to +80 HU); bone several hundred to over +1000 HU. A **window** selects which range of values is displayed as shades of grey. Lung windows show the air-filled lung; soft-tissue windows show organs; bone windows show cortical detail. The same scan must be viewed in several windows, because a finding visible in one may be invisible in another.
:::

CT is fast, widely available and accurate for many emergencies: intracranial haemorrhage, pulmonary embolism (CT pulmonary angiography), aortic dissection, trauma, the acute abdomen and kidney stones. **Iodinated contrast** given intravenously opacifies blood vessels and enhancing tissues; given orally it outlines the bowel.

### Contrast risks

- **Allergy-like (hypersensitivity) reactions** to iodinated contrast are uncommon and mostly mild (urticaria, nausea); severe reactions are rare. A history of a previous reaction to iodinated contrast is the important risk factor. A shellfish or iodine skin allergy is not a contraindication.
- **Contrast-associated acute kidney injury**: the risk from modern intravenous contrast is lower than once believed, but patients with significantly reduced kidney function (for example eGFR below 30 mL/min/1.73 m²) or acute kidney injury need a risk assessment following local and Royal College of Radiologists guidance, which may include hydration and review of nephrotoxic drugs.
- **Metformin**: local guidance may advise withholding metformin after contrast in patients with significant kidney impairment, because of the small risk of lactic acidosis if kidney function falls.

::: example Contrast and reduced kidney function {#ex-contrast}
Mrs Patel, 81, has severe abdominal pain out of proportion to the examination findings, atrial fibrillation and a lactate of 4.5 mmol/L. Acute mesenteric ischaemia is suspected and a contrast-enhanced CT angiogram is requested. Her eGFR is 25 mL/min/1.73 m². Should the contrast be withheld?

::: solution
No. Acute mesenteric ischaemia has a high mortality, and the diagnosis depends on showing the arteries with intravenous contrast; a non-contrast scan would not answer the question. The risk of contrast-associated kidney injury, which is modest with modern agents, is much smaller than the risk of a missed or delayed diagnosis. Her reduced kidney function is a reason to **assess and mitigate** risk, not to refuse the test: confirm the clinical need with the radiologist, ensure she is adequately hydrated as part of her resuscitation, review nephrotoxic drugs (and metformin if she takes it), and monitor kidney function afterwards. The decision and the discussion are documented. The same principle applies widely: a contraindication is relative when the alternative is a dangerous missed diagnosis.
:::
:::

## Radiation dose and risk

The **effective dose**, measured in **millisieverts (mSv)**, estimates the overall risk from a radiation exposure, taking into account the type of radiation and the sensitivity of the tissues exposed. It is a tool for comparing exposures and populations, not a precise measure of an individual's risk.

::: definition Typical effective doses {#def-dose}
Typical adult effective doses vary between centres and protocols, but their order of magnitude is:

| Examination | Approximate effective dose | Equivalent background radiation |
|---|---|---|
| Chest X-ray (PA) | about 0.02 mSv | a few days |
| CT head | about 1.5–2 mSv | several months |
| CT chest | about 5–7 mSv | about 2 years |
| CT abdomen and pelvis | about 8–10 mSv | about 3 years |

The average annual dose from natural background radiation in the UK is about **2.7 mSv**, about half of it from radon gas. Ultrasound and MRI use no ionising radiation.
:::

The main risk of diagnostic radiation is a small increase in the lifetime risk of cancer. For planning purposes, the International Commission on Radiological Protection uses a nominal risk coefficient of about **5% per sievert** (0.005% per mSv) for the whole population. On that basis a 10 mSv CT would add a lifetime cancer risk of about 1 in 2,000, against a background lifetime cancer risk of roughly 1 in 2. The risk is higher for **children** and young people, whose tissues are more sensitive and who have more years in which a cancer could develop, and lower for older people. These are estimates for populations; the risk of missing a serious diagnosis by not scanning is often far larger.

::: warning Ask about pregnancy before ionising radiation
Before an examination that irradiates the abdomen or pelvis, people of childbearing potential (typically aged 12 to 55) must be asked whether they are or might be pregnant, following local IR(ME)R procedures. If pregnancy cannot be excluded, the examination may be postponed, changed to a technique without ionising radiation, or performed with the risk explicitly justified. Pregnancy does not forbid necessary imaging: a CT pulmonary angiogram or chest X-ray in a pregnant woman with suspected pulmonary embolism delivers a small dose to the fetus, and an undiagnosed embolism is far more dangerous to both.
:::

## Ultrasound

Ultrasound uses high-frequency sound waves (typically 2–15 MHz) sent into the body by a transducer. Sound is reflected at interfaces between tissues of different **acoustic impedance**, and the time taken for each echo to return gives its depth. Fluid transmits sound without echoes and appears black (anechoic); tissue interfaces appear grey and white.

Ultrasound is safe, portable, cheap and gives real-time images, so it is ideal for:

- **fluid**: pleural effusions, ascites, the pericardium, the bladder;
- **solid organs and ducts**: gallstones and dilated bile ducts, the kidneys and hydronephrosis, the liver;
- **pregnancy** and the female pelvis;
- **vessels**: Doppler ultrasound measures blood flow and is the first test for deep vein thrombosis and carotid stenosis;
- **guiding procedures**: cannulation, pleural aspiration, joint injection and biopsy;
- **the heart**: echocardiography.

Its limits come from physics: sound does not pass well through **gas** or **bone**, so bowel gas, obesity and the skull limit what can be seen, and the result depends heavily on the skill of the operator. **Point-of-care ultrasound** (POCUS) by clinicians at the bedside, for example to look for free fluid in trauma, is now widely used, but it answers narrow questions and needs training and governance.

::: example Imaging for loin pain in two patients {#ex-renal}
(a) Mr Jones, 38, has severe colicky right loin pain radiating to the groin, with blood on urine dipstick. (b) Ms Jaber, 29, who is 20 weeks pregnant, has the same symptoms. Which imaging is appropriate for each?

::: solution
(a) For an adult with suspected renal colic, NICE guideline NG118 recommends **low-dose non-contrast CT** of the kidneys, ureters and bladder (CT KUB), ideally within 24 hours of presentation. It is the most accurate test for stones and shows their size and position, which determines management, and it may show an alternative diagnosis such as an aortic aneurysm.

(b) In **pregnancy**, ultrasound is the first-line test, because it uses no ionising radiation. It can show hydronephrosis and some stones, although mild dilatation of the right renal collecting system is common in normal pregnancy, which makes interpretation harder. If the diagnosis remains uncertain and the clinical need is strong, MRI without gadolinium or, rarely, low-dose CT may be considered after specialist discussion. In both patients the possibility of other diagnoses (in her, obstetric causes; in him, a leaking aneurysm if older) should be considered.
:::
:::

## Magnetic resonance imaging

**Magnetic resonance imaging (MRI)** places the patient in a strong magnetic field (typically 1.5 or 3 tesla). Hydrogen nuclei (protons), mostly in water and fat, align with the field. Radiofrequency pulses tip them out of alignment, and as they **relax** back they emit signals that are used to form the image. Tissues differ in how fast their protons relax, and the scanner settings can be chosen to emphasise one or another difference.

::: definition T1 and T2 weighting {#def-mri}
**T1** is the time constant for protons to recover their alignment with the main field; **T2** is the time constant for the loss of their synchronised spin in the transverse plane. On a **T1-weighted** image, **fat is bright** and **water (fluid) is dark**; T1 images show anatomy well, and **gadolinium** contrast, which shortens T1, makes enhancing tissue bright. On a **T2-weighted** image, **fluid is bright**, so T2 images show oedema, inflammation and many tumours. A useful memory aid: on T2, CSF is white. Other sequences, such as fat suppression, FLAIR (which darkens CSF so that lesions next to it stand out) and diffusion-weighted imaging (which shows acute infarction within minutes to hours), are built on these principles.
:::

The relaxation curves below show why tissues with different T1 values appear different: at a given time after the pulse, the tissue that has recovered more gives a stronger signal.

::: widget plot
f: 1 - exp(-x/a); 1 - exp(-x/b)
x: 0, 4000
y: 0, 1
sliders: a=260:100:1000:10; b=3000:1000:5000:100
labels: \text{short T1 (e.g. fat)}; \text{long T1 (e.g. CSF)}
caption: Recovery of longitudinal magnetisation against time (ms) after a radiofrequency pulse for two tissues with T1 values $a$ and $b$ (ms). Illustrative values; real T1 values depend on field strength.
:::

MRI gives excellent contrast between soft tissues and is the preferred test for the brain and spinal cord (including suspected **cauda equina syndrome** and cord compression), for joints and soft tissues, and for staging many pelvic and liver cancers. Its disadvantages are long scan times, noise, a confined space that some patients cannot tolerate, limited availability and cost.

::: definition MRI safety {#def-mrisafety}
The magnetic field is always on. **Ferromagnetic objects** can become projectiles, and implanted devices can move, heat or malfunction. Every patient (and member of staff) must be screened before entering the scanner room. Important issues include **cardiac pacemakers and defibrillators** (many modern devices are "MR conditional" and can be scanned under specific conditions with cardiology support; older ones may be unsafe), **cochlear implants**, some **aneurysm clips**, neurostimulators, and **metallic foreign bodies** in the eye (a history of metalwork or grinding may need an orbital X-ray first). **Gadolinium contrast** carries a small risk of **nephrogenic systemic fibrosis** in people with severe kidney impairment, now very rare with the more stable macrocyclic agents, and small amounts of gadolinium are retained in tissues; it is used only when it adds diagnostic value.
:::

## Nuclear medicine

Nuclear medicine images the **function** of tissues rather than their structure. A **radiopharmaceutical** (a radioactive isotope attached to a molecule that goes to a particular tissue) is given, and a gamma camera or PET scanner detects the emitted radiation. Examples include:

- **Ventilation–perfusion (V/Q) scanning** for pulmonary embolism, useful when CT is undesirable (for example in some pregnant women or patients with contrast allergy) and the chest X-ray is normal.
- **Bone scintigraphy** for bone metastases and some fractures.
- **PET-CT with fluorodeoxyglucose (FDG)**, a glucose analogue taken up by metabolically active tissue, for staging many cancers and assessing response to treatment. Inflammation also takes up FDG, which causes false positives.
- **Thyroid scintigraphy** to distinguish causes of hyperthyroidism.

## Reading and acting on reports

Most clinicians read the radiologist's report rather than interpret every image themselves, but they must still look at the images for the findings that affect their immediate decisions (a pneumothorax, the position of a tube). Read the **whole report**, not just the conclusion, and **act on it**: unacknowledged and unactioned results are a well-recognised cause of harm ([[clinical-skills/patient-safety]]). **Incidental findings**, such as a small adrenal or lung nodule found on a scan done for another reason, are common; most are benign, and national or local guidelines say which need follow-up, so the patient can be told and the follow-up arranged rather than ignored or over-investigated.

::: quiz
On a PA chest X-ray, an opacity in the left lower zone is associated with loss of the outline of the left hemidiaphragm, while the left heart border remains sharp. Where is the abnormality most likely to be?
- [ ] Lingula
- [x] Left lower lobe
- [ ] Left upper lobe (anterior segment)
- [ ] Anterior mediastinum
::: solution
Loss of the hemidiaphragm outline means the opacity is in contact with the diaphragm, which is the lower lobe. The lingula lies against the left heart border; since that border is preserved, the lingula is unlikely to be involved. This is the silhouette sign.
:::
:::

::: history
In November 1895 **Wilhelm Conrad Röntgen**, working with a cathode-ray tube in Würzburg, noticed a fluorescent screen glowing across the room; within weeks he had produced the radiograph of his wife's hand that made X-rays world news, and he received the first Nobel Prize in Physics in 1901. The harms of radiation were learned painfully by early radiologists. In 1958 **Ian Donald** and colleagues in Glasgow published the use of ultrasound to examine abdominal masses, opening the way to obstetric ultrasound. **Godfrey Hounsfield** at EMI built the first clinical CT scanner, and the first patient was scanned in London in 1971; he shared the 1979 Nobel Prize with **Allan Cormack**, who had worked out the mathematics independently. **Paul Lauterbur** and **Peter Mansfield** received the 2003 Nobel Prize for the development of MRI.
:::

## Where this leads

Imaging in specific emergencies is developed in [[emergency-critical-care/acute-assessment]] and [[surgery/acute-abdomen]], and in the system courses, such as [[respiratory/lung-cancer-pleura]] and [[nervous-system/stroke]]. The statistics of test accuracy apply to imaging just as to blood tests ([[clinical-skills/laboratory-tests]]).

::: summary
- Every imaging test should answer a stated clinical question; ionising radiation must be justified and optimised under IR(ME)R.
- X-ray contrast arises from differences in attenuation; plain films show five densities, and the silhouette sign localises disease.
- Read chest X-rays systematically: details, projection, quality, then airway, lungs, heart, diaphragm, everything else and review areas; check every line and tube.
- CT values are in Hounsfield units (water 0, air −1000); use appropriate windows; iodinated contrast carries small risks of reactions and kidney injury.
- Effective doses range from about 0.02 mSv (chest X-ray) to about 10 mSv (CT abdomen and pelvis), against UK background of about 2.7 mSv a year; children are more sensitive.
- Ultrasound is safe, portable and best for fluid, gallbladder, kidneys, pregnancy and vessels, but is limited by gas, bone and operator skill.
- MRI gives the best soft-tissue contrast (T1: fat bright; T2: fluid bright) but needs strict safety screening.
- Nuclear medicine and PET-CT image function; reports must be read in full and acted on.
:::

## Exercises

::: exercise Background equivalent {level=1 check="round(10/2.7*10)/10"}
A CT of the abdomen and pelvis delivers an effective dose of about 10 mSv. How many years of UK average background radiation (2.7 mSv a year) is that? Round to one decimal place.
::: solution
$10/2.7 = 3.70$, which is **3.7 years**.
:::
:::

::: exercise Attenuation {level=1 check="round(exp(-0.2*10)*1000)/1000"}
A beam passes through 10 cm of a material with linear attenuation coefficient 0.2 per cm. What fraction of the beam is transmitted? Round to three decimal places.
::: solution
$I/I_0 = e^{-0.2 \times 10} = e^{-2} = 0.135$. About 13.5% of the beam is transmitted.
:::
:::

::: exercise Bright or dark {level=1}
For each, say whether it is bright or dark: (a) CSF on a T2-weighted MRI; (b) subcutaneous fat on a T1-weighted MRI; (c) gas in the bowel on ultrasound (and why); (d) air in the lung on CT soft-tissue window.
::: solution
(a) Bright (fluid is bright on T2). (b) Bright (fat is bright on T1). (c) Gas reflects almost all the sound at its surface, producing a bright line with shadowing and reverberation artefact behind it, so structures behind gas cannot be seen. (d) Black (−1000 HU, far below the soft-tissue window).
:::
:::

::: exercise A lifetime risk estimate {level=2 check="1/(0.05*0.008)"}
Using a nominal risk coefficient of 5% per sievert, estimate the additional lifetime cancer risk from a CT chest delivering 8 mSv, and express it as "1 in N". Give N exactly.
::: solution
$8 \text{ mSv} = 0.008$ Sv. Risk $= 0.05 \times 0.008 = 0.0004$, which is 1 in $1/0.0004 = 2{,}500$. This is a population estimate; it would be higher for a child and lower for an older adult, and it must be weighed against the benefit of the diagnosis.
:::
:::

::: exercise Choose the test {level=2}
Suggest the most appropriate first imaging test and give a reason: (a) suspected gallstones in a woman with right upper quadrant pain after fatty meals; (b) suspected deep vein thrombosis; (c) suspected acute intracranial haemorrhage in a man with a sudden severe headache; (d) suspected cauda equina syndrome.
::: solution
(a) Ultrasound: highly sensitive for gallstones and duct dilatation, no radiation. (b) Compression Doppler ultrasound of the leg veins, after a clinical probability assessment (Wells score for DVT) and D-dimer where appropriate. (c) Non-contrast CT head: fast and very sensitive for acute blood, especially early. (d) Emergency MRI of the lumbosacral spine: it shows the nerve roots and the disc or other cause of compression.
:::
:::

::: exercise Assess the film {level=2}
An AP supine chest X-ray in the emergency department shows a cardiothoracic ratio of 0.58. A colleague writes "cardiomegaly". Is this justified? What would you do?
::: solution
Not on this film. AP projection magnifies the heart, because the heart is further from the detector, and the supine position and poor inspiration make it look larger still, so the cardiothoracic ratio is valid only on a good-quality PA film. Describe it as "heart size cannot be assessed on this AP film". If the question matters, a PA film when the patient is well enough, or an echocardiogram, will answer it.
:::
:::

::: exercise An MRI request {level=3}
A 72-year-old man with suspected spinal cord compression from prostate cancer is booked for urgent whole-spine MRI. He has a permanent pacemaker fitted in 2009, and he worked as a welder. What safety checks are needed, and what would you do if MRI is unsafe?
::: solution
Identify the pacemaker system (generator and leads) from his records or device card and check with the cardiology or device team and radiology whether it is **MR conditional**. A device fitted in 2009 may not be; even MR-conditional systems require specific conditions (programming, monitoring, field strength). His work as a welder raises the possibility of **metallic fragments in the eyes**: ask about eye injuries and consider an orbital X-ray before MRI. If MRI is unsafe or delayed, **CT of the spine** (often with contrast) is the alternative to identify compression, and treatment (such as corticosteroids and referral to the oncology and spinal teams, following local metastatic spinal cord compression pathways) should not wait for perfect imaging.
:::
:::

::: exercise The incidental nodule {level=3}
A CT pulmonary angiogram in a 58-year-old smoker shows no pulmonary embolism but reports "a 7 mm solid nodule in the right upper lobe; recommend follow-up according to guidelines". He is discharged the same day. Describe the safety risks and how the system should handle the finding.
::: solution
Risks: the finding is not the reason for the scan, so the busy team may read only the conclusion ("no PE") and miss it; the patient may not be told; responsibility for follow-up may be unclear between the emergency department, the GP and respiratory services; and a lung cancer could be missed. The system should: ensure the result is acknowledged electronically by the requesting clinician; tell the patient before discharge or in writing, with an explanation; state in the discharge letter who is arranging follow-up; and use a defined pathway (such as a radiology-led incidental nodule service following British Thoracic Society guidance) that tracks the patient so that follow-up does not depend on one person's memory. Smoking-cessation support is also indicated.
:::
:::
