Breathing is the only vital function that runs automatically for a lifetime yet can be taken over at will in an instant. You can hold your breath, sing or speak, and the automatic controller resumes the moment you stop. That controller keeps arterial carbon dioxide within a few tenths of a kilopascal of its set point through sleep, exercise and illness. When it fails, or is suppressed by drugs, the consequences are quick and serious.

The first half of this chapter explains how breathing is controlled: the brainstem generators, the chemoreceptors and the reflexes, and what goes wrong in opioid toxicity, oxygen-induced hypercapnia and sleep-disordered breathing. The second half describes the tests used to measure respiratory function, from spirometry and gas transfer to blood gases and sleep studies, and how to interpret them.

## The respiratory controller {#sec-controller}

::: definition The parts of the respiratory control system {#def-control}
- **Central pattern generator**: groups of neurons in the medulla that produce the rhythm of breathing. The key rhythm-generating site is the **preBötzinger complex** in the ventral respiratory group. The **dorsal respiratory group**, in the nucleus of the tractus solitarius, receives sensory input. Pontine centres smooth the transition between inspiration and expiration.
- **Sensors**: central chemoreceptors, peripheral chemoreceptors, and receptors in the lungs and chest wall.
- **Effectors**: the respiratory muscles, chiefly the diaphragm (phrenic nerves, C3–C5), the intercostals and, during effort, the accessory and abdominal muscles.
- **Cortical control**: voluntary breathing (speech, breath holding) runs from the motor cortex directly to the respiratory motor neurons, bypassing the brainstem.
:::

The separation between automatic and voluntary pathways is clinically real. A small brainstem stroke can abolish automatic breathing while leaving voluntary breathing intact, so the person breathes while awake but stops when asleep. A cortical lesion can do the reverse.

### Chemoreceptors

::: definition Central and peripheral chemoreceptors {#def-chemo}
- **Central chemoreceptors** lie near the ventral surface of the medulla. They respond to the hydrogen ion concentration of the surrounding brain extracellular fluid. Carbon dioxide crosses the blood–brain barrier freely and forms hydrogen ions there; bicarbonate and hydrogen ions cross slowly. The central chemoreceptors therefore respond to arterial $P_{CO_2}$, and they provide most of the normal drive to breathe.
- **Peripheral chemoreceptors** are the **carotid bodies**, at the bifurcation of the common carotid arteries (afferents in the glossopharyngeal nerve), and the less important aortic bodies (vagus nerve). They respond quickly to a fall in arterial $P_{O_2}$, especially below about 8 kPa (60 mmHg), and also to a rise in $P_{CO_2}$ and hydrogen ion concentration. They are the only receptors that sense hypoxaemia.
:::

The two responses interact. Ventilation rises roughly linearly as $P_{aCO_2}$ rises above a threshold, and the slope of this line (the **hypercapnic ventilatory response**) is steeper when the person is also hypoxic. The hypoxic response is small until $P_{aO_2}$ falls below about 8 kPa and then rises steeply, mirroring the shape of the oxygen–haemoglobin curve. In healthy people at sea level, therefore, carbon dioxide controls breathing from moment to moment; oxygen becomes the main stimulus only at altitude or in disease.

::: widget plot
f: max(0, 15*(x-4.8)); max(0, s*(x-a))
x: 4, 9
y: 0, 70
sliders: s=15:3:25:1; a=4.8:4.5:7:0.1
labels: \text{normal response}; \text{altered response}
vlines: 5.3
caption: A simplified hypercapnic ventilatory response: minute ventilation (L/min) against arterial $P_{CO_2}$ (kPa). The slope $s$ is the sensitivity of the controller, and $a$ is the $P_{CO_2}$ below which ventilation would cease. Opioids, sedatives and sleep lower the slope and shift the line to the right; hypoxia and anxiety steepen it. The vertical line marks a normal $P_{aCO_2}$ of 5.3 kPa. Illustrative values only.
:::

When $P_{aCO_2}$ stays high for days, as in severe COPD or obesity hypoventilation, the kidneys retain bicarbonate and the cerebrospinal fluid bicarbonate rises too. The central chemoreceptors now see a near-normal hydrogen ion concentration at the higher $P_{CO_2}$, and their response is blunted. The controller has been reset.

### Lung and chest wall receptors

- **Pulmonary stretch receptors** in airway smooth muscle signal lung inflation through the vagus. In animals they terminate inspiration (the Hering–Breuer reflex); in adult humans the reflex is weak at normal tidal volumes.
- **Irritant receptors** in the airway epithelium respond to smoke, dust and cold air, and cause cough, bronchoconstriction and rapid breathing.
- **Juxtacapillary (J) receptors** in the alveolar walls respond to interstitial oedema and congestion and contribute to the rapid shallow breathing and breathlessness of pulmonary oedema and fibrosis.
- **Muscle and joint receptors** contribute to the rise in ventilation at the start of exercise, before blood gases change.

## When control fails {#sec-control-fail}

### Opioids and sedatives

Opioids act on μ-opioid receptors in the preBötzinger complex and other brainstem sites. They slow the respiratory rate, reduce the response to carbon dioxide and hypoxia, and can cause apnoea. Benzodiazepines, alcohol and gabapentinoids add to the effect. The typical patient breathes slowly, looks sleepy rather than distressed, has pinpoint pupils, and has a rising $P_{aCO_2}$.

::: example The quiet patient on the surgical ward {#ex-opioid}
A 71-year-old woman is on day 1 after a laparotomy. She has a morphine patient-controlled analgesia pump and was also given oral oxycodone overnight. At 6 a.m. she is difficult to rouse, her respiratory rate is 7/min and her pupils are small. Her saturation is 95% on 4 L/min of oxygen. An arterial blood gas shows pH 7.21, $P_{aCO_2}$ 9.8 kPa, $P_{aO_2}$ 10.5 kPa, bicarbonate 27 mmol/L. Interpret this.
::: solution
She has an **acute respiratory acidosis** from opioid-induced hypoventilation. The pH is low and the $P_{aCO_2}$ is high; the bicarbonate has risen only slightly, as expected for an acute rise. Her saturation is reassuring only because she is receiving oxygen, which raises alveolar $P_{O_2}$ and masks the hypoventilation: this is exactly why a normal saturation on oxygen does not exclude respiratory failure. A low respiratory rate and sedation are the signs to act on. Management follows local guidance: stop the opioids, support the airway and ventilation, and give naloxone, an opioid antagonist, titrated to restore adequate breathing without abolishing all analgesia. Because naloxone has a shorter duration of action than many opioids, she needs continued monitoring. Contributing factors to consider are her age, renal function (morphine metabolites accumulate in renal impairment) and the combination of two opioids ([[surgery/anaesthesia-pain]]).
:::
:::

### Oxygen-induced hypercapnia

In a minority of people with chronic hypercapnic respiratory failure, mostly due to severe COPD, giving high concentrations of oxygen causes the $P_{aCO_2}$ to rise further, sometimes to the point of acidosis and coma. The traditional explanation was loss of "hypoxic drive". That plays a part, but it is not the main mechanism.

::: theorem Mechanisms of oxygen-induced hypercapnia {#thm-o2-co2}
When a person with chronic hypercapnia is given uncontrolled high-concentration oxygen, the $P_{aCO_2}$ rises mainly because of:

1. **Worsened V/Q matching**: oxygen relieves hypoxic pulmonary vasoconstriction in poorly ventilated areas, increasing their perfusion and the alveolar dead space of the rest of the lung.
2. **The Haldane effect**: more oxygenated haemoglobin carries less carbon dioxide, releasing it into the plasma.
3. **A modest fall in ventilation** from removal of the hypoxic stimulus to the carotid bodies.
:::

The practical conclusion is the same whichever mechanism dominates: in people at risk of hypercapnic respiratory failure, oxygen is given in a controlled way to a target saturation of 88–92%, as recommended by the British Thoracic Society (BTS) oxygen guideline. A randomised trial in Tasmania (Austin and colleagues, 2010) found lower mortality when ambulance crews titrated oxygen to 88–92% in suspected COPD exacerbations than when they gave high-flow oxygen. Hypoxaemia must still be treated: the aim is to avoid both hypoxaemia and unnecessary hyperoxia, not to withhold oxygen.

::: example Too much oxygen {#ex-o2-copd}
A 69-year-old man with severe COPD is brought in by ambulance with an exacerbation. He was given 15 L/min oxygen through a reservoir mask on the way. On arrival he is drowsy. His saturation is 99%. Blood gas: pH 7.22, $P_{aCO_2}$ 10.4 kPa, $P_{aO_2}$ 28 kPa, bicarbonate 33 mmol/L. What has happened, and what is the immediate step?
::: solution
He has an **acute-on-chronic respiratory acidosis**. The raised bicarbonate shows that his $P_{aCO_2}$ was chronically high (metabolic compensation takes days); the low pH shows an acute rise on top. A $P_{aO_2}$ of 28 kPa is far higher than he needs. Uncontrolled oxygen has worsened his V/Q matching and released carbon dioxide (Haldane effect), and his drowsiness reflects carbon dioxide narcosis. The immediate step is not to remove the oxygen abruptly, which can cause sudden severe hypoxaemia because the high $P_{aCO_2}$ lowers alveolar $P_{O_2}$, but to step it down to a controlled device (for example a 28% Venturi mask) aiming for 88–92%, repeat the blood gas, and treat the exacerbation. If the acidosis persists despite optimal medical treatment, non-invasive ventilation is indicated ([[respiratory/respiratory-failure]]).
:::
:::

### Periodic breathing

Any feedback system with a delay and a high gain can oscillate. **Cheyne–Stokes respiration** is a crescendo–decrescendo pattern of breathing alternating with apnoeas. It is common in severe heart failure, where the circulation time from lungs to carotid bodies is prolonged and the controller is often over-sensitive, and after strokes. Periodic breathing also occurs in healthy people sleeping at high altitude.

### Sleep-disordered breathing

During sleep, the muscles of the upper airway relax, and the drive to breathe falls.

::: definition Obstructive sleep apnoea {#def-osa}
**Obstructive sleep apnoea** (OSA) is repeated collapse of the pharyngeal airway during sleep, causing **apnoeas** (cessation of airflow for at least 10 seconds) and **hypopnoeas** (reduction in airflow with oxygen desaturation or arousal), despite continued respiratory effort. The **apnoea–hypopnoea index** (AHI) is the number of these events per hour of sleep. In adults, an AHI of 5–14 is conventionally mild, 15–29 moderate and 30 or more severe. **Obstructive sleep apnoea syndrome** is OSA with symptoms, most often excessive daytime sleepiness.
:::

Risk factors include obesity, a large neck, retrognathia, enlarged tonsils, male sex, older age, alcohol and sedatives. Typical symptoms are loud snoring, witnessed apnoeas, unrefreshing sleep and daytime sleepiness, often assessed with the Epworth Sleepiness Scale (scores range 0–24; above 10 suggests excessive sleepiness). OSA is associated with hypertension, atrial fibrillation and road traffic accidents.

Diagnosis is by a sleep study: home respiratory polygraphy (airflow, effort, oximetry) is usual in the UK, with full polysomnography (which adds EEG sleep staging) for complex cases. NICE guideline NG202 (2021) recommends continuous positive airway pressure (CPAP), which splints the pharynx open, for moderate or severe OSA, and for mild OSA when symptoms affect quality of life. Weight loss, alcohol reduction and mandibular advancement devices also help. In the UK, people with excessive sleepiness from OSA must stop driving and tell the Driver and Vehicle Licensing Agency (DVLA) until symptoms are controlled.

**Central sleep apnoea** (no respiratory effort) occurs with heart failure, opioids and brainstem disease. **Obesity hypoventilation syndrome** is daytime hypercapnia ($P_{aCO_2}$ above 6 kPa) in a person with obesity, without another cause; it often coexists with OSA and is treated with positive airway pressure ([[respiratory/respiratory-failure]]).

::: example Counting events {#ex-osa}
A 52-year-old lorry driver with a collar size of 46 cm has a home sleep study. His partner reports loud snoring and pauses in breathing. Over 6.2 hours of recording there are 124 apnoeas and 62 hypopnoeas. His Epworth score is 15. Calculate his AHI and classify his OSA.
::: solution
Total events $= 124 + 62 = 186$. AHI $= 186/6.2 = 30$ events per hour. This is **severe OSA** (AHI ≥ 30), and an Epworth score of 15 indicates excessive daytime sleepiness, so he has OSA syndrome. He should be offered CPAP, with support for weight loss. Because he is a professional driver with excessive sleepiness, he must not drive until his symptoms are controlled and must notify the DVLA; in the UK, vocational drivers need evidence of adequate control and adherence before returning to driving. (Strictly, a home study counts events per hour of recording rather than of sleep, which may underestimate the true AHI.)
:::
:::

## Lung function tests {#sec-tests}

Lung function tests answer specific questions: is there airflow obstruction, and is it reversible? Are the lungs small? Is gas transfer impaired? Is the problem in the lungs, the chest wall or the muscles? Each test answers only some of these.

### Spirometry and its interpretation

Spirometry was introduced in [[respiratory/mechanics-breathing#def-spiro]]. A test is valid only if it is done well. International standards (ATS/ERS, 2019) require at least three acceptable forced expirations with the two largest FEV₁ and FVC values each within 150 mL of each other. Poor effort, a slow start, a cough or early termination all produce misleading results.

::: definition Reference values, z-scores and the lower limit of normal {#def-lln}
A measured value is compared with the value predicted for a healthy person of the same age, sex and height from **reference equations**, most widely the Global Lung Function Initiative (GLI) equations. The **z-score** is the number of standard deviations the measurement lies from the predicted value:

$$
z = \frac{\text{measured} - \text{predicted}}{\text{SD}}
$$ {#eq-z}

The **lower limit of normal** (LLN) is the 5th percentile, a z-score of −1.645. ATS/ERS guidance on interpretation (2022) defines abnormality as a value below the LLN rather than below a fixed percentage of predicted.
:::

The FEV₁/FVC ratio normally falls with age. A fixed cut-off of 0.70, used by GOLD and NICE to define obstruction in COPD, therefore labels many healthy older people as obstructed and misses some younger people with real obstruction. The LLN approach avoids this, at the cost of more complex calculation. Both are in use, and a report should say which was used.

Reference equations have historically included ethnicity-specific adjustments, which assumed that lower lung function in some groups was normal. In 2023 the American Thoracic Society recommended moving to race-neutral equations (GLI Global). Practice is changing, and clinicians should know which equations their laboratory uses.

::: example Is this obstruction? {#ex-lln}
An 81-year-old woman, a lifelong non-smoker, has mild breathlessness walking uphill. Post-bronchodilator spirometry: FEV₁/FVC 0.67. For her age, sex and height, the predicted ratio is 0.75 and the LLN is 0.63. FEV₁ is 92% of predicted. Does she have airflow obstruction?
::: solution
By the fixed-ratio definition (below 0.70), she would be labelled as obstructed. By the LLN definition, her ratio (0.67) is above the LLN (0.63), so it is within the normal range for her age. With a normal FEV₁, no smoking history and mild symptoms, she probably does not have COPD; the fixed ratio overdiagnoses obstruction in older people. Her breathlessness should be investigated more broadly (for example heart failure, anaemia, deconditioning). The opposite error occurs in young adults, where a ratio of 0.72 may be well below their LLN.
:::
:::

### Reversibility and variability

- **Bronchodilator response**: spirometry is repeated 15–20 minutes after an inhaled short-acting β₂ agonist. The 2024 NICE/BTS/SIGN asthma guideline (NG245) treats an increase in FEV₁ of 12% or more and 200 mL or more as a positive test supporting asthma in adults. The ATS/ERS 2022 interpretation standard instead defines a significant response as an increase of more than 10% of the predicted value of FEV₁ or FVC. Many people with COPD show some response, so reversibility alone does not separate asthma from COPD.
- **Peak expiratory flow (PEF)** is the maximal flow at the start of a forced expiration, measured with a cheap handheld meter. Twice-daily readings over two weeks show **variability**; in NG245, a mean daily amplitude of 20% or more supports asthma. Serial readings at and away from work help diagnose occupational asthma.
- **Bronchial challenge testing** measures airway hyperresponsiveness: the dose of inhaled methacholine that causes a 20% fall in FEV₁ (for mannitol, a 15% fall is used). A negative methacholine test in a person with current symptoms makes asthma unlikely.
- **Fractional exhaled nitric oxide (FeNO)** measures nitric oxide in exhaled breath, a marker of type 2 (eosinophilic) airway inflammation. In NG245, a FeNO of 50 parts per billion or more in adults (35 ppb or more in children aged 5–16) supports a diagnosis of asthma. FeNO is lowered by smoking and by inhaled corticosteroids.

How these are combined for diagnosing asthma is set out in [[respiratory/asthma-copd]].

### Lung volumes and gas transfer

Static lung volumes (TLC, RV, FRC) are measured by body plethysmography or gas dilution ([[respiratory/mechanics-breathing#sec-volumes]]). They confirm restriction (low TLC) and show hyperinflation and gas trapping (high RV and RV/TLC ratio).

Gas transfer (TLCO and KCO, [[respiratory/gas-exchange#def-tlco]]) is most useful in combination with volumes.

| Pattern | TLC | TLCO | KCO | Typical causes |
|---|---|---|---|---|
| Emphysema | normal or high | low | low | loss of alveolar walls and capillaries |
| Interstitial lung disease | low | low | low or normal | thickened membrane, lost capillaries |
| Pulmonary vascular disease | normal | low | low | pulmonary embolism, pulmonary hypertension |
| Extrapulmonary restriction | low | low or normal | high | obesity, chest wall disease, muscle weakness, pneumonectomy |
| Increased blood in alveoli | normal | high | high | alveolar haemorrhage, polycythaemia |

A low TLCO with normal spirometry and volumes should prompt a search for pulmonary vascular disease or early interstitial disease. Anaemia lowers TLCO, so results are corrected for haemoglobin.

::: example Breathless with normal spirometry {#ex-tlco}
A 44-year-old woman with systemic sclerosis has increasing breathlessness. Spirometry and lung volumes are normal. TLCO is 48% of predicted and KCO 52% of predicted. Her haemoglobin is normal. What should be suspected?
::: solution
Normal volumes exclude significant interstitial fibrosis, and normal spirometry excludes obstruction. An isolated, marked fall in gas transfer with a low KCO means the gas-exchanging capillary bed is reduced. In systemic sclerosis the leading cause is **pulmonary arterial hypertension**, which narrows and obliterates small pulmonary arteries. She needs an echocardiogram and referral for assessment, which may include right heart catheterisation ([[respiratory/interstitial-vascular-disease]]). Annual lung function testing, including TLCO, is used to screen people with systemic sclerosis for both complications.
:::
:::

### Respiratory muscle tests

In suspected neuromuscular weakness, useful tests are vital capacity sitting and lying (a fall of more than about 20% on lying suggests diaphragm weakness), maximal inspiratory and expiratory mouth pressures, and sniff nasal inspiratory pressure. In Guillain–Barré syndrome and myasthenic crisis, serial bedside FVC measurements are used to detect impending respiratory failure.

### Exercise tests

Walking tests measure functional capacity simply. The **six-minute walk test** records the distance walked on a flat corridor, with oximetry; the **incremental shuttle walk test** paces the walker with audio signals. They are used for prognosis in interstitial lung disease and pulmonary hypertension, for assessment before pulmonary rehabilitation, and to look for exertional desaturation. **Cardiopulmonary exercise testing** (CPET) measures oxygen uptake, carbon dioxide output and ventilation during incremental exercise. It identifies whether exercise is limited by the heart, the lungs, the muscles or deconditioning, and it estimates surgical risk before major operations.

## Arterial blood gases {#sec-abg}

An arterial blood gas sample measures pH, $P_{aO_2}$ and $P_{aCO_2}$ directly and calculates bicarbonate and base excess. Many analysers also measure lactate, electrolytes and haemoglobin species.

::: definition A systematic approach to a blood gas {#def-abg}
1. **Oxygenation**: is the $P_{aO_2}$ low for the inspired oxygen? On air, calculate the A–a gradient ([[respiratory/gas-exchange#def-aa]]); on oxygen, use the P/F ratio.
2. **pH**: acidaemia (below 7.35) or alkalaemia (above 7.45)?
3. **Respiratory component**: is the $P_{aCO_2}$ high (respiratory acidosis) or low (respiratory alkalosis)?
4. **Metabolic component**: is the bicarbonate or base excess high (metabolic alkalosis) or low (metabolic acidosis)?
5. **Primary disorder and compensation**: which change explains the pH, and is the other change an appropriate compensation, or a second disorder?
:::

For respiratory acid–base disorders, compensation follows predictable rules (in conventional units). In **acute** respiratory acidosis, bicarbonate rises by about 1 mmol/L for each 10 mmHg (1.33 kPa) rise in $P_{aCO_2}$, through buffering. In **chronic** respiratory acidosis, renal retention of bicarbonate raises it by about 3.5–4 mmol/L per 10 mmHg after several days. The full treatment of acid–base disorders, including metabolic disorders and the anion gap, is in [[physiology/acid-base]] and [[renal/acid-base-disorders]].

::: example Acute, chronic or both? {#ex-abg}
A 66-year-old man with known COPD and a cough productive of green sputum for three days has pH 7.27, $P_{aCO_2}$ 9.3 kPa (70 mmHg) and bicarbonate 31 mmol/L. Taking a normal $P_{aCO_2}$ as 40 mmHg and normal bicarbonate as 24 mmol/L, decide whether this is an acute, chronic or acute-on-chronic respiratory acidosis.
::: solution
The $P_{aCO_2}$ is 30 mmHg above normal.

If purely acute, bicarbonate would be about $24 + 3 \times 1 = 27$ mmol/L.

If purely chronic, bicarbonate would be about $24 + 3 \times 3.5 = 34.5$ mmol/L.

His bicarbonate of 31 lies between, and his pH of 7.27 is lower than full chronic compensation would allow. This is **acute-on-chronic respiratory acidosis**: he had some chronic carbon dioxide retention, and an exacerbation has pushed his $P_{aCO_2}$ higher than his kidneys have had time to compensate for. Checking the arithmetic with the Henderson equation, $[\text{H}^+] = 24 \times 70/31 \approx 54$ nmol/L, which corresponds to a pH of about 7.27.
:::
:::

::: warning A normal saturation on oxygen does not mean adequate ventilation
Pulse oximetry measures oxygenation, not ventilation. A patient breathing supplemental oxygen can maintain a normal saturation while their $P_{aCO_2}$ climbs to dangerous levels, because the extra inspired oxygen keeps the alveolar $P_{O_2}$ up. In a drowsy patient, a patient on opioids, or a patient with COPD or neuromuscular disease, check the respiratory rate and mental state and measure a blood gas. Venous blood gases are a reasonable screen for $P_{CO_2}$ and pH (a normal venous $P_{CO_2}$ makes arterial hypercapnia unlikely), but they cannot assess oxygenation.
:::

::: quiz
Which receptors are responsible for the increase in ventilation when arterial $P_{O_2}$ falls?
- [ ] Central chemoreceptors in the medulla
- [x] Peripheral chemoreceptors, chiefly the carotid bodies
- [ ] Pulmonary stretch receptors
- [ ] Juxtacapillary (J) receptors
::: solution
Only the peripheral chemoreceptors, mainly the carotid bodies, sense arterial hypoxaemia ([[#def-chemo]]). Central chemoreceptors respond to the hydrogen ion concentration of brain extracellular fluid and so mainly to $P_{CO_2}$; they are actually depressed by severe hypoxia. People who have had both carotid bodies removed or damaged (for example during bilateral carotid surgery) lose much of their hypoxic ventilatory response.
:::
:::

::: history
In 1868 Ewald Hering and Josef Breuer described the inflation reflex that bears their names. John Scott Haldane and John Gillies Priestley showed in 1905 that ventilation is regulated with great precision by alveolar carbon dioxide. Corneille Heymans, working in Ghent, demonstrated the role of the carotid sinus and aortic bodies in the reflex control of breathing and circulation and received the Nobel Prize in 1938. John Cheyne in 1818 and William Stokes in 1854 described the periodic breathing that carries their names. In 1991 Jack Feldman, Jeffrey Smith and colleagues identified the preBötzinger complex as the kernel of the respiratory rhythm. Obstructive sleep apnoea was characterised in the 1960s and 1970s, and in 1981 Colin Sullivan in Sydney introduced nasal CPAP as its treatment.
:::

## Where this leads

The tests in this chapter are the tools of every clinical chapter that follows. Spirometry, reversibility, PEF variability and FeNO diagnose and monitor [[respiratory/asthma-copd]]. Gas transfer and walk tests stage [[respiratory/interstitial-vascular-disease]]. Lung function decides fitness for surgery in [[respiratory/lung-cancer-pleura]]. The blood gas and the control of breathing are central to [[respiratory/respiratory-failure]].

::: summary
- Rhythm arises in the medullary preBötzinger complex; voluntary breathing uses a separate cortical pathway.
- Central chemoreceptors respond to $P_{CO_2}$ (via brain hydrogen ions) and supply most of the resting drive. Carotid bodies alone sense hypoxaemia, mainly below about 8 kPa.
- Chronic hypercapnia resets the central chemoreceptors. Oxygen-induced hypercapnia is mainly due to worse V/Q matching and the Haldane effect; target 88–92% in those at risk.
- Opioids depress rate and the carbon dioxide response. Oxygen can mask hypoventilation on oximetry.
- OSA: AHI 5–14 mild, 15–29 moderate, ≥30 severe; CPAP for moderate–severe or symptomatic disease.
- Interpret lung function against reference equations, ideally using the LLN; a fixed FEV₁/FVC of 0.70 overdiagnoses obstruction in older people.
- Combine spirometry, volumes and gas transfer to locate disease; use PEF, reversibility, FeNO and challenge tests for asthma.
- Read a blood gas systematically and use compensation rules to separate acute from chronic respiratory acidosis.
:::

## Exercises

::: exercise The two chemoreceptors {level=1}
List two stimuli that act mainly through central chemoreceptors and two that act through peripheral chemoreceptors. Which nerve carries carotid body afferents?
::: solution
Central: a rise in $P_{aCO_2}$ (through brain hydrogen ions), and changes in brain extracellular pH. Peripheral: a fall in $P_{aO_2}$ (especially below about 8 kPa), and a rise in arterial hydrogen ion concentration such as in metabolic acidosis; they also respond quickly to $P_{CO_2}$. Carotid body afferents travel in the glossopharyngeal nerve (via the carotid sinus nerve).
:::
:::

::: exercise A z-score {level=1 check="-2.25"}
A 50-year-old man has an FEV₁ of 2.1 L. His predicted FEV₁ is 3.0 L with a standard deviation of 0.4 L. Calculate his z-score.
::: solution
$z = (2.1 - 3.0)/0.4 = -0.9/0.4 = -2.25$. This is below −1.645, so his FEV₁ is below the lower limit of normal.
:::
:::

::: exercise Apnoea–hypopnoea index {level=1 check="17.5"}
A sleep study records 6 hours of sleep with 63 apnoeas and 42 hypopnoeas. Calculate the AHI (events per hour) and classify the severity.
::: solution
AHI $= (63 + 42)/6 = 105/6 = 17.5$ events per hour: moderate OSA (15–29).
:::
:::

::: exercise Reversibility by NG245 {level=2}
A 28-year-old woman with episodic wheeze has a pre-bronchodilator FEV₁ of 2.50 L and a post-bronchodilator FEV₁ of 2.78 L. Does this meet the NG245 threshold for a positive bronchodilator reversibility test?
::: solution
The increase is $2.78 - 2.50 = 0.28$ L (280 mL), and as a percentage of baseline $0.28/2.50 = 11.2\%$. The volume criterion (200 mL or more) is met, but the percentage (12% or more) is not, so this does not meet the NG245 definition of a positive test. It does not exclude asthma: reversibility testing is insensitive, especially if spirometry is normal between attacks. The next steps in the guideline pathway would include PEF variability or a bronchial challenge test, if FeNO and eosinophils were not already diagnostic.
:::
:::

::: exercise Reading a pattern {level=2}
A 64-year-old ex-smoker has FEV₁/FVC 0.52, TLC 125% of predicted, RV 180% of predicted, TLCO 41% and KCO 45% of predicted. Describe the pattern and the most likely diagnosis.
::: solution
Obstruction (low ratio), hyperinflation (high TLC) and gas trapping (very high RV), with a markedly reduced gas transfer and transfer coefficient. This is the classic pattern of **emphysema**: destruction of alveolar walls removes both elastic recoil (causing airflow limitation and air trapping) and the capillary bed (low TLCO and KCO). In chronic asthma, by contrast, gas transfer is usually normal or even high.
:::
:::

::: exercise The compensated patient {level=2}
A 58-year-old woman with severe kyphoscoliosis has pH 7.38, $P_{aCO_2}$ 7.6 kPa, bicarbonate 33 mmol/L and $P_{aO_2}$ 8.1 kPa on air. Interpret the gas and explain why her respiratory drive matters if she is given high-flow oxygen.
::: solution
She has a **chronic, compensated respiratory acidosis** with hypoxaemia: the pH is normal, the $P_{aCO_2}$ is raised, and the bicarbonate is raised by renal compensation over a long period. Her A–a gradient on air is $20.0 - 7.6/0.8 - 8.1 = 2.4$ kPa, near normal, so the main problem is hypoventilation from her chest wall deformity. Her central chemoreceptors have reset to the high $P_{CO_2}$. High-concentration oxygen can raise her $P_{aCO_2}$ further and cause acidosis, so oxygen should be titrated to 88–92%. She is a candidate for assessment for domiciliary non-invasive ventilation, which is very effective in chest wall disease ([[respiratory/respiratory-failure]]).
:::
:::

::: exercise A drowsy man after a party {level=3}
A 23-year-old man is brought to the emergency department after a party. He is drowsy with a respiratory rate of 8/min. His saturation is 91% on air. An arterial gas on air shows pH 7.24, $P_{aCO_2}$ 8.6 kPa, $P_{aO_2}$ 7.4 kPa, bicarbonate 25 mmol/L. Interpret this, calculate the A–a gradient (use $P_{IO_2}$ 20.0 kPa) and outline the differential diagnosis and immediate priorities.
::: solution
Acute respiratory acidosis (low pH, high $P_{aCO_2}$, bicarbonate barely changed). $P_{AO_2} = 20.0 - 8.6/0.8 = 9.25$ kPa; gradient $= 9.25 - 7.4 = 1.85$ kPa, normal. The hypoxaemia is explained by hypoventilation; there is no evidence yet of significant aspiration or lung injury.

Differential: opioid toxicity (check pupils, look for needle marks, consider naloxone), other sedatives (benzodiazepines, gamma-hydroxybutyrate, alcohol), a head injury or intracranial event, and, less likely in this setting, neuromuscular causes. Immediate priorities follow an ABCDE approach: airway (position, adjuncts), support of ventilation (bag–valve–mask if needed), oxygen, glucose measurement, naloxone if opioid toxicity is possible, and repeat gases. A widening A–a gradient later would suggest aspiration pneumonitis ([[emergency-critical-care/poisoning]]).
:::
:::

::: exercise Planning a sleep assessment {level=3}
A 47-year-old woman with a BMI of 41 has hypertension that is hard to control, morning headaches and an Epworth score of 9. Her bicarbonate on a routine venous sample is 32 mmol/L. Explain why she needs more than a simple oximetry study, and what conditions you are trying to distinguish.
::: solution
Her symptoms suggest sleep-disordered breathing, but a normal-range Epworth score does not exclude it; women and people with resistant hypertension often report less sleepiness. Morning headaches and a raised bicarbonate suggest **chronic hypercapnia**, raising the possibility of **obesity hypoventilation syndrome** as well as OSA. Oximetry alone cannot measure carbon dioxide or distinguish obstructive from central events. She needs an arterial (or capillary) blood gas to confirm daytime hypercapnia, and a respiratory polygraphy study, ideally with transcutaneous carbon dioxide monitoring overnight. If she has obesity hypoventilation, CPAP may be enough when OSA is severe, but some patients need non-invasive ventilation. Weight management is part of treatment in both conditions.
:::
:::
