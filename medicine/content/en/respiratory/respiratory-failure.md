Respiratory failure is the point at which the respiratory system can no longer keep arterial oxygen and carbon dioxide within safe limits. It is not a disease but a final common pathway, reached from pneumonia, COPD, asthma, pulmonary oedema, neuromuscular disease, drug overdose and many other conditions. Recognising it early, understanding which part of the system has failed, and choosing the right support are among the most important skills in acute medicine.

This chapter brings together the physiology of the earlier chapters. It defines the two types of respiratory failure, explains how each arises, and then covers the tools used to treat them: oxygen therapy, continuous positive airway pressure, non-invasive ventilation and invasive mechanical ventilation, including the lung-protective strategy for the acute respiratory distress syndrome. UK practice follows the British Thoracic Society (BTS) guideline on oxygen use (2017) and BTS/Intensive Care Society guidance on non-invasive ventilation; all management statements are principles, applied in practice through local protocols and senior decision-making.

## Two types of failure {#sec-types}

::: definition Type 1 and type 2 respiratory failure {#def-resp-failure}
- **Type 1 (hypoxaemic) respiratory failure**: $P_{aO_2}$ below 8 kPa (60 mmHg) with a normal or low $P_{aCO_2}$. It is a failure of **gas exchange** in the lung.
- **Type 2 (hypercapnic) respiratory failure**: $P_{aCO_2}$ above about 6.0 kPa (45 mmHg), usually with hypoxaemia as well. It is a failure of **ventilation**: the "pump" cannot move enough air.

Each type can be **acute** (developing over minutes to hours, with no time for compensation), **chronic** (developing over days to years, with renal compensation of the pH) or **acute-on-chronic**.
:::

The distinction tells you where the problem lies and what will help. In type 1 failure, the lung is the problem: fluid, pus, collapse or a blocked vessel prevents oxygen reaching the blood. The patient is usually breathing hard, so the $P_{aCO_2}$ is low. Treatment aims to raise the inspired oxygen and reopen collapsed alveoli. In type 2 failure, the problem is that not enough air is moved in and out of the alveoli. Oxygen may correct the hypoxaemia but does nothing for the carbon dioxide; treatment must increase ventilation.

### Why carbon dioxide rises

::: theorem The alveolar ventilation equation {#thm-va}
In a steady state, arterial $P_{CO_2}$ is proportional to the rate of carbon dioxide production and inversely proportional to alveolar ventilation:

$$
P_{aCO_2} \propto \frac{\dot V_{CO_2}}{\dot V_A}, \qquad \dot V_A = (V_T - V_D) \times f
$$ {#eq-va}

where $\dot V_{CO_2}$ is carbon dioxide production, $\dot V_A$ alveolar ventilation, $V_T$ tidal volume, $V_D$ dead space and $f$ respiratory rate. Halving alveolar ventilation doubles $P_{aCO_2}$.
:::

::: proof
Carbon dioxide produced by the tissues must be excreted by alveolar ventilation. In a steady state, the amount exhaled per minute equals the amount produced. The amount exhaled is the alveolar ventilation multiplied by the alveolar concentration of carbon dioxide, which is proportional to its partial pressure. So $\dot V_{CO_2} \propto \dot V_A \times P_{ACO_2}$, and alveolar and arterial $P_{CO_2}$ are almost equal. Rearranging gives the equation. Dead space ventilation does not help, because gas in the dead space never reaches perfused alveoli: only the part of each breath beyond the dead space contributes.
:::

::: widget plot
f: 5.3*4.2/x; c*5.3*4.2/x
x: 1.5, 10
y: 0, 16
sliders: c=1:0.5:2:0.1
hlines: 6
labels: \text{normal CO}_2 \text{ production}; \text{CO}_2 \text{ production} \times c
caption: Arterial $P_{CO_2}$ (kPa, vertical axis) against alveolar ventilation (L/min, horizontal axis) in a simplified model with a normal value of 5.3 kPa at 4.2 L/min. The curve is a hyperbola: at low ventilation, a small further fall in ventilation produces a large rise in $P_{CO_2}$. The slider multiplies carbon dioxide production, as in fever, sepsis or a high-carbohydrate feed, which shifts the curve upwards. The horizontal line marks 6 kPa.
:::

The equation shows the causes of type 2 failure, which can be grouped along the chain from brain to alveolus:

- **Reduced drive**: opioids, sedatives, brainstem stroke, head injury, central hypoventilation.
- **Nerve and neuromuscular junction**: high spinal cord injury, Guillain–Barré syndrome, motor neurone disease, myasthenia gravis.
- **Muscle**: myopathies, muscular dystrophies, severe hypokalaemia or hypophosphataemia, respiratory muscle fatigue.
- **Chest wall and pleura**: kyphoscoliosis, flail chest, obesity, massive pleural effusion.
- **Airways and lungs**: COPD and severe asthma, in which the load on the respiratory muscles exceeds their capacity, and rapid shallow breathing increases the dead space fraction.

Type 1 failure is caused by the mechanisms of hypoxaemia in [[respiratory/gas-exchange#def-hypox]]: mainly V/Q mismatch and shunt from pneumonia, pulmonary oedema, ARDS, pulmonary embolism, ILD, atelectasis and acute asthma.

::: example Rapid shallow breathing {#ex-rapid-shallow}
A 66-year-old woman with a severe COPD exacerbation is tiring. Her breathing has changed from a rate of 12/min with a tidal volume of 500 mL to a rate of 30/min with a tidal volume of 250 mL. Her dead space is 150 mL. Before the exacerbation her $P_{aCO_2}$ was 5.3 kPa. Assuming carbon dioxide production is unchanged, estimate her new $P_{aCO_2}$.
::: solution
Before: $\dot V_A = (0.50 - 0.15) \times 12 = 0.35 \times 12 = 4.2$ L/min.

Now: $\dot V_A = (0.25 - 0.15) \times 30 = 0.10 \times 30 = 3.0$ L/min.

Her total minute ventilation has actually risen (from 6.0 to 7.5 L/min), but her alveolar ventilation has fallen, because each small breath is mostly dead space. By [[#eq-va]], new $P_{aCO_2} = 5.3 \times 4.2/3.0 = 7.4$ kPa. This is why a high respiratory rate does not mean adequate ventilation, and why a fast, shallow breathing pattern in a tiring patient is a warning sign. Non-invasive ventilation helps by increasing her tidal volume.
:::
:::

### Recognising respiratory failure

Clinical signs of respiratory distress include a high respiratory rate (often the earliest abnormal vital sign), use of accessory muscles, inability to speak in sentences, tachycardia, sweating and agitation. Hypoxaemia may cause cyanosis (an unreliable sign, especially in anaemia and in darker skin), confusion and arrhythmias. Hypercapnia causes headache, a bounding pulse, warm peripheries, a flapping tremor, drowsiness and eventually coma. Signs of exhaustion, such as a falling respiratory rate, paradoxical abdominal movement and reduced consciousness, indicate imminent respiratory arrest.

Early warning scores such as the UK National Early Warning Score 2 (NEWS2) include respiratory rate and oxygen saturation, and NEWS2 has a separate saturation scale for patients with a prescribed target of 88–92%. An arterial blood gas is the key investigation, interpreted as in [[respiratory/control-breathing-tests#def-abg]].

## Oxygen therapy {#sec-oxygen}

Oxygen is a drug. It should be prescribed with a **target saturation range**, given with an appropriate device, monitored and adjusted, and stopped when it is no longer needed. Too little oxygen causes tissue hypoxia; too much offers no benefit and can cause harm, especially in people at risk of hypercapnia.

::: definition Target saturations (BTS 2017) {#def-targets}
- **94–98%** for most acutely ill adults.
- **88–92%** for people at risk of hypercapnic respiratory failure: COPD, and other conditions such as severe chest wall disease, neuromuscular disease, obesity hypoventilation and cystic fibrosis, until blood gases are known.
- In critical illness (for example cardiac arrest, shock, major trauma), high-concentration oxygen is given initially, then adjusted to target once the patient is stable.
:::

The target in a person at risk is individual: if blood gases show no carbon dioxide retention, the target may be raised to 94–98%. Oxygen is not a treatment for breathlessness in people who are not hypoxaemic.

::: definition Oxygen delivery devices {#def-devices}
- **Nasal cannulae**: 1–6 L/min. Comfortable, allow eating and talking; the delivered concentration varies with the patient's breathing.
- **Simple face mask**: 5–10 L/min. Variable concentration; flows below 5 L/min risk rebreathing carbon dioxide.
- **Venturi (fixed-performance) mask**: delivers a set concentration (24%, 28%, 31%, 35%, 40% or 60%) by entraining room air through a calibrated port. The device of choice when precise control is needed, as in people at risk of hypercapnia.
- **Reservoir ("non-rebreathe") mask**: 15 L/min, delivering a high concentration (roughly 60–90%). For critically ill patients in the first instance.
- **High-flow nasal oxygen** (HFNO): warmed, humidified gas at up to 60 L/min, with a set oxygen fraction up to 1.0. The high flow meets the patient's peak inspiratory demand, washes out carbon dioxide from the upper airway dead space and provides a small positive airway pressure.
:::

A "variable-performance" device such as a simple mask delivers an inspired concentration that falls as the patient's own flow rises, because more room air is drawn in. A breathless patient taking large, fast breaths may receive much less oxygen than expected. Fixed-performance devices (Venturi masks, HFNO) avoid this problem.

::: warning Do not stop oxygen abruptly in a patient with hypercapnia
When a patient who has been given too much oxygen develops a rising $P_{aCO_2}$, the instinct may be to remove the oxygen. But the high $P_{aCO_2}$ itself lowers the alveolar $P_{O_2}$ ([[respiratory/gas-exchange#eq-age]]), and carbon dioxide stores take time to clear, so stopping oxygen can cause sudden, severe hypoxaemia. The correct step is to reduce the oxygen to the lowest concentration that achieves 88–92%, usually with a Venturi mask, and to consider non-invasive ventilation if the acidosis persists.
:::

## Positive airway pressure without intubation {#sec-niv}

::: definition CPAP and NIV {#def-cpap-niv}
- **Continuous positive airway pressure** (CPAP) applies the same positive pressure throughout the breathing cycle, through a tight-fitting mask or hood. It does not assist the breath itself. It raises the mean airway pressure, holds open collapsed alveoli, increases FRC and improves V/Q matching. It is a treatment for **type 1 failure** (and for obstructive sleep apnoea).
- **Non-invasive ventilation** (NIV, bilevel positive airway pressure) applies a higher pressure during inspiration (IPAP) and a lower pressure during expiration (EPAP). The difference between them supports each breath, increasing tidal volume and alveolar ventilation. It is a treatment for **type 2 failure**.
:::

CPAP is effective in acute cardiogenic pulmonary oedema, where it also reduces left ventricular afterload and venous return, and it was used widely for hypoxaemic respiratory failure in COVID-19. HFNO is an alternative for type 1 failure, and a French trial (FLORALI, 2015) suggested benefits over standard oxygen in some patients with acute hypoxaemic respiratory failure.

NIV has strong evidence in **acute hypercapnic respiratory failure due to COPD**: it reduces mortality, the need for intubation and length of stay. In BTS/ICS guidance it is indicated when respiratory acidosis (pH below 7.35 with $P_{aCO_2}$ above 6.5 kPa) persists despite optimal medical therapy. It is also used for acute hypercapnic failure in chest wall disease, neuromuscular disease and obesity hypoventilation, where it is often continued at home. In motor neurone disease, home NIV improves survival and quality of life in patients without severe bulbar weakness.

Before starting NIV, the team agrees and documents a plan for what happens if it fails: whether the patient would be a candidate for intubation, or whether NIV is the ceiling of treatment. This is discussed with the patient where possible ([[medical-ethics-law/end-of-life-ethics]]). NIV is not appropriate in some situations, for example when the patient cannot protect their airway, is vomiting, has an undrained pneumothorax or has facial injuries or recent upper gastrointestinal surgery. Blood gases are repeated within one to two hours; failure to improve pH and $P_{aCO_2}$ prompts adjustment of settings and mask fit and, if appropriate, escalation to invasive ventilation.

::: example Pink frothy sputum {#ex-cpap}
A 78-year-old man with ischaemic heart disease wakes at night acutely breathless, sitting bolt upright, coughing pink frothy sputum. He has widespread crackles. $S_pO_2$ is 82% on air and 89% on a reservoir mask at 15 L/min. Blood gas on oxygen: pH 7.31, $P_{aCO_2}$ 5.8 kPa, $P_{aO_2}$ 7.9 kPa, lactate 2.8 mmol/L. Blood pressure 170/96 mmHg. What type of respiratory failure is this and what support is appropriate?
::: solution
This is **acute cardiogenic pulmonary oedema** causing **type 1 respiratory failure**: alveoli are flooded with fluid, causing shunt and V/Q mismatch, and his $P_{aO_2}$ remains below 8 kPa despite high-concentration oxygen. The mildly low pH is mostly a lactic acidosis from tissue hypoperfusion; his $P_{aCO_2}$ is normal for now, although it may rise as he tires. Alongside treatment of the cause (nitrates while his blood pressure is high, a loop diuretic if fluid overloaded, and investigation for an acute coronary syndrome or arrhythmia: [[cardiovascular/heart-failure]]), **CPAP** is appropriate if he remains hypoxaemic: it reopens flooded alveoli, improves oxygenation, reduces the work of breathing and lowers left ventricular afterload. Close monitoring is essential, with escalation if he deteriorates.
:::
:::

## Invasive mechanical ventilation {#sec-imv}

When non-invasive methods fail or are unsuitable, a patient may need **tracheal intubation** and mechanical ventilation in critical care. Common reasons are:

- inability to protect the airway (reduced consciousness, for example a Glasgow Coma Scale score of 8 or less, or loss of airway reflexes);
- hypoxaemia that cannot be corrected by less invasive means;
- hypercapnic failure that is worsening despite NIV, or in which NIV is contraindicated;
- exhaustion or impending respiratory arrest;
- the need for deep sedation or surgery.

The decision to intubate is clinical, taking into account the trajectory as well as the numbers, the reversibility of the underlying illness and the patient's wishes. Intubation itself carries risks, especially in a hypoxaemic patient, and it is performed by experienced clinicians with a plan for difficulty ([[emergency-critical-care/airway-ventilation]]).

Positive-pressure ventilation has physiological effects beyond the lungs. Raised intrathoracic pressure reduces venous return to the heart, so hypotension is common after starting ventilation, especially in patients who are hypovolaemic. Complications include ventilator-associated pneumonia, barotrauma (pneumothorax), ventilator-induced lung injury, the effects of sedation, delirium and muscle weakness acquired in intensive care.

### The acute respiratory distress syndrome

::: definition Acute respiratory distress syndrome {#def-ards}
The **acute respiratory distress syndrome** (ARDS) is acute, diffuse, inflammatory lung injury leading to increased permeability of the alveolar–capillary membrane, flooding of alveoli with protein-rich fluid and severe hypoxaemia. The **Berlin definition** (2012) requires: onset within one week of a known insult or new or worsening respiratory symptoms; bilateral opacities on chest imaging not fully explained by effusions, collapse or nodules; respiratory failure not fully explained by cardiac failure or fluid overload; and impaired oxygenation, graded with a PEEP of at least 5 cmH₂O as **mild** ($P_{aO_2}$/$F_{IO_2}$ 200–300 mmHg), **moderate** (100–200 mmHg) or **severe** (100 mmHg or less).
:::

A **global definition** proposed in 2023 extended the Berlin criteria so that ARDS can be recognised more widely: it includes patients on high-flow nasal oxygen at 30 L/min or more, allows an $S_pO_2$/$F_{IO_2}$ ratio of 315 or less (when $S_pO_2$ is 97% or less) in place of arterial blood gases, and accepts lung ultrasound as imaging where radiography or CT is unavailable.

ARDS can follow **direct** lung injury (pneumonia, including COVID-19; aspiration of gastric contents; smoke inhalation; near-drowning) or **indirect** injury (sepsis, major trauma, pancreatitis, massive transfusion). The pathology is **diffuse alveolar damage**: neutrophil-driven injury, hyaline membranes lining the alveoli, loss of surfactant and, in some patients, later fibrosis. The lungs become stiff, heavy and unevenly affected: dependent regions are collapsed and flooded while other regions remain aerated. The functional lung is small, sometimes called the "baby lung".

Treatment is mainly supportive, while the cause is treated. The key principle is to avoid further harm from the ventilator.

::: theorem Lung-protective ventilation {#thm-lpv}
In ARDS, ventilation with **low tidal volumes** (about 6 mL/kg of predicted body weight) and a **plateau pressure of 30 cmH₂O or less** reduces mortality compared with traditional larger tidal volumes. Predicted body weight is calculated from height and sex:

$$
\text{PBW (men)} = 50 + 0.91 \times (\text{height in cm} - 152.4), \qquad \text{PBW (women)} = 45.5 + 0.91 \times (\text{height in cm} - 152.4)
$$ {#eq-pbw}
:::

::: proof
Because so much of the ARDS lung is collapsed or flooded, a "normal" tidal volume is delivered into the small aerated part and overstretches it (**volutrauma**). Alveoli that open and close with each breath are damaged by shear forces (**atelectrauma**). Both release inflammatory mediators that harm the lung and other organs (**biotrauma**). Limiting tidal volume and plateau pressure reduces overdistension; adequate positive end-expiratory pressure (PEEP) keeps recruitable alveoli open and reduces cyclic collapse. Predicted body weight is used rather than actual weight because lung size depends on height and sex, not on body fat. In the ARDS Network trial (2000), 6 mL/kg reduced mortality from about 40% to 31% compared with 12 mL/kg. A related measure, the **driving pressure** (plateau pressure minus PEEP), reflects the tidal volume relative to the size of the functional lung and is associated with outcome.
:::

Other measures with evidence in moderate to severe ARDS include **prone positioning** for long periods each day (the PROSEVA trial, 2013, found lower mortality with prone positioning for at least 16 hours a day in patients with a $P_{aO_2}$/$F_{IO_2}$ below 150 mmHg), a conservative fluid strategy once shock has resolved, and, in severe disease in specialist centres, extracorporeal membrane oxygenation (ECMO). Prone positioning improves oxygenation by making ventilation and perfusion more even, as the dorsal lung, which receives most of the blood, is reopened. Corticosteroids have a role in some causes, such as COVID-19.

::: example Calculating the oxygenation ratio {#ex-pf}
A 45-year-old woman with pneumococcal pneumonia and sepsis is intubated. On $F_{IO_2}$ 0.6 with PEEP 10 cmH₂O, her $P_{aO_2}$ is 9.0 kPa. The chest radiograph shows bilateral opacities, and echocardiography shows normal left ventricular function. Calculate her $P_{aO_2}$/$F_{IO_2}$ ratio and grade her ARDS.
::: solution
Convert $P_{aO_2}$ to mmHg: $9.0 \times 7.5 = 67.5$ mmHg.

Ratio: $67.5/0.6 = 112.5$ mmHg (15 kPa).

She meets the Berlin criteria (acute onset, bilateral opacities, not explained by cardiac failure, PEEP ≥ 5) with a ratio between 100 and 200 mmHg: **moderate ARDS**. Management includes lung-protective ventilation with a tidal volume of about 6 mL/kg predicted body weight, plateau pressure of 30 cmH₂O or less, appropriate PEEP, and consideration of prone positioning if her ratio falls below 150 mmHg (it already does). The pneumonia and sepsis are treated, and fluids are managed carefully.
:::
:::

::: example Setting the tidal volume {#ex-pbw}
A 178 cm tall man weighing 120 kg is ventilated for ARDS. What tidal volume corresponds to 6 mL/kg of predicted body weight, and why should his actual weight not be used?
::: solution
PBW $= 50 + 0.91 \times (178 - 152.4) = 50 + 0.91 \times 25.6 = 50 + 23.3 = 73.3$ kg.

Tidal volume $= 6 \times 73.3 \approx 440$ mL.

Using his actual weight (120 kg) would give 720 mL, an injurious volume for the small aerated part of his lungs. His lungs are the size expected for his height and sex; his additional body weight does not make them larger. Obesity does make the chest wall stiffer, which affects the interpretation of plateau pressure, but it does not justify larger tidal volumes.
:::
:::

## Neuromuscular respiratory failure {#sec-neuromuscular}

Respiratory failure from neuromuscular disease is easily missed, because the patient may not look distressed and oxygen saturation stays normal until late. The respiratory muscles weaken, vital capacity falls, cough becomes weak, secretions accumulate and atelectasis develops. Bulbar weakness adds the risk of aspiration. When failure occurs, it can be abrupt.

In conditions such as **Guillain–Barré syndrome** and **myasthenic crisis**, the forced vital capacity is measured serially at the bedside (several times a day in acute disease). A falling vital capacity, particularly towards about 20 mL/kg, or a vital capacity below about 1 L in an adult, along with weak cough, bulbar dysfunction or rising $P_{aCO_2}$, should prompt critical care review and consideration of elective intubation before a crisis occurs. Peak flow is not a useful measure here, as it depends on effort and on airway calibre rather than on the strength of the inspiratory muscles ([[nervous-system/neuromuscular]]).

::: example Weak but not breathless {#ex-gbs}
A 36-year-old man is admitted with ascending weakness and areflexia following a diarrhoeal illness: Guillain–Barré syndrome is diagnosed. He weighs 80 kg. On admission his FVC is 3.2 L. Over 24 hours it falls to 2.1, then 1.5 L. His $S_pO_2$ is 97% on air and he says he is "fine". What do you do?
::: solution
His FVC has fallen from 40 mL/kg ($3.2/80$) to about 19 mL/kg ($1.5/80$) in a day, a rapid decline below 20 mL/kg. His normal saturation is falsely reassuring: hypoxaemia is a late sign of neuromuscular failure. He needs urgent **critical care review**, and elective intubation and ventilation should be considered before he decompensates. Look also for bulbar weakness (difficulty swallowing, weak cough, nasal speech), which increases the risk of aspiration, and for autonomic instability (arrhythmias, blood pressure swings), common in Guillain–Barré syndrome. Disease-specific treatment (intravenous immunoglobulin or plasma exchange) is given alongside.
:::
:::

## Chronic respiratory failure and long-term support {#sec-chronic}

Some patients have long-term hypoxaemia or hypercapnia. Long-term oxygen therapy for chronic hypoxaemia in COPD is described in [[respiratory/asthma-copd]]. Home NIV is used for chronic hypercapnic failure due to chest wall disease, neuromuscular disease and obesity hypoventilation, and for selected patients with COPD who remain hypercapnic after an exacerbation: in the UK HOT-HMV trial (2017), adding home NIV to home oxygen in such patients prolonged the time to readmission or death. Decisions about long-term ventilation, especially in progressive conditions such as motor neurone disease, involve careful discussion of the patient's goals, and planning for the end of life when ventilation no longer helps or is no longer wanted ([[geriatrics-palliative/end-of-life-care]]).

::: quiz
A 54-year-old man with a myasthenic crisis has an FVC of 1.1 L (body weight 85 kg), a weak cough and $S_pO_2$ of 96% on air. Which statement is correct?
- [ ] His saturation shows that his ventilation is adequate
- [ ] Peak flow is the best measure to monitor him
- [x] He needs urgent critical care review, because his vital capacity is about 13 mL/kg
- [ ] High-flow oxygen will prevent respiratory failure
::: solution
His FVC is $1.1/85 \approx 13$ mL/kg, well below about 20 mL/kg, and he has a weak cough: he is at high risk of sudden ventilatory failure and needs urgent critical care assessment ([[#sec-neuromuscular]]). A normal saturation is a late and unreliable sign in neuromuscular failure. Peak flow depends on effort and airway calibre and does not measure inspiratory muscle strength well. Oxygen does nothing for ventilation and may mask hypoventilation.
:::
:::

::: history
During the Copenhagen polio epidemic of 1952, the Blegdam Hospital was overwhelmed with patients with respiratory paralysis, and mortality in those with bulbar polio was very high. The anaesthetist Bjørn Ibsen proposed tracheostomy and manual positive-pressure ventilation, delivered by hand with a rubber bag by relays of medical students, around the clock; mortality fell sharply. The epidemic led to the first intensive care units. In 1967 David Ashbaugh, Thomas Petty and colleagues described a syndrome of acute respiratory distress in adults, later called ARDS. In 2000 the ARDS Network trial showed that ventilation with low tidal volumes saves lives. Non-invasive ventilation for COPD exacerbations was established by randomised trials in the 1990s, including a UK multicentre ward-based trial by Plant, Owen and Elliott (2000).
:::

## Where this leads

This chapter closes the course. The physiology it relies on is in [[respiratory/mechanics-breathing]], [[respiratory/gas-exchange]] and [[respiratory/control-breathing-tests]], and the common causes of respiratory failure are in [[respiratory/asthma-copd]], [[respiratory/respiratory-infections]] and [[respiratory/interstitial-vascular-disease]]. Airway management, resuscitation and organ support in critical care are taken further in [[emergency-critical-care/airway-ventilation]] and [[emergency-critical-care/critical-care]], and the assessment of the acutely ill patient in [[emergency-critical-care/acute-assessment]].

::: summary
- Type 1: $P_{aO_2}$ < 8 kPa with normal or low $P_{aCO_2}$ (gas exchange failure). Type 2: $P_{aCO_2}$ > about 6 kPa (ventilatory failure). Each can be acute, chronic or acute-on-chronic.
- $P_{aCO_2}$ is proportional to $\dot V_{CO_2}/\dot V_A$; rapid shallow breathing reduces alveolar ventilation even when minute ventilation rises.
- Oxygen is prescribed to a target: 94–98% for most, 88–92% for those at risk of hypercapnia. Use fixed-performance devices when precision matters. Do not stop oxygen abruptly in hypercapnia.
- CPAP treats type 1 failure (for example cardiogenic pulmonary oedema); NIV treats type 2 failure, notably COPD with persistent respiratory acidosis (pH < 7.35, $P_{aCO_2}$ > 6.5 kPa). Agree a ceiling of treatment first.
- Intubation is for airway protection, refractory hypoxaemia, failing NIV or exhaustion.
- ARDS: bilateral opacities and hypoxaemia not explained by heart failure; Berlin grades by $P_{aO_2}$/$F_{IO_2}$. Use 6 mL/kg predicted body weight, plateau ≤ 30 cmH₂O, PEEP and prone positioning in moderate–severe disease.
- In neuromuscular disease, monitor FVC; saturation is a late sign.
:::

## Exercises

::: exercise Which type? {level=1}
Classify each blood gas (on air): (a) $P_{aO_2}$ 7.1 kPa, $P_{aCO_2}$ 4.1 kPa, pH 7.47; (b) $P_{aO_2}$ 7.6 kPa, $P_{aCO_2}$ 8.9 kPa, pH 7.24, bicarbonate 28 mmol/L; (c) $P_{aO_2}$ 7.4 kPa, $P_{aCO_2}$ 7.9 kPa, pH 7.38, bicarbonate 35 mmol/L.
::: solution
(a) Type 1 respiratory failure with a respiratory alkalosis from hyperventilation. (b) Type 2, acute: pH low, bicarbonate barely raised. (c) Type 2, chronic and compensated: pH normal, bicarbonate raised by renal retention.
:::
:::

::: exercise Predicted body weight {level=1 check="round(6*(45.5+0.91*(165-152.4)))"}
Calculate the tidal volume (mL, to the nearest whole number) at 6 mL/kg predicted body weight for a woman 165 cm tall.
::: solution
PBW $= 45.5 + 0.91 \times (165 - 152.4) = 45.5 + 11.47 = 56.97$ kg. Tidal volume $= 6 \times 56.97 = 341.8$, which rounds to 342 mL.
:::
:::

::: exercise P/F ratio {level=1 check="150"}
A ventilated patient has $P_{aO_2}$ 8.0 kPa on $F_{IO_2}$ 0.4. Calculate the $P_{aO_2}$/$F_{IO_2}$ ratio in mmHg (1 kPa = 7.5 mmHg).
::: solution
$8.0 \times 7.5 = 60$ mmHg; $60/0.4 = 150$ mmHg. If the other Berlin criteria are met with PEEP of at least 5 cmH₂O, this is moderate ARDS.
:::
:::

::: exercise Halving ventilation {level=2 check="2*5.2"}
A patient's alveolar ventilation falls from 4.0 to 2.0 L/min after an opioid overdose, with no change in carbon dioxide production. His $P_{aCO_2}$ was 5.2 kPa. Estimate his new steady-state $P_{aCO_2}$ in kPa.
::: solution
$P_{aCO_2} \propto 1/\dot V_A$, so halving alveolar ventilation doubles $P_{aCO_2}$: $5.2 \times 4.0/2.0 = 10.4$ kPa. By the alveolar gas equation his alveolar $P_{O_2}$ would fall by about $5.2/0.8 = 6.5$ kPa, causing hypoxaemia with a normal A–a gradient.
:::
:::

::: exercise Choosing the device {level=2}
Suggest an appropriate initial oxygen device and target for: (a) a 25-year-old with pneumonia and $S_pO_2$ 91% on air; (b) a 70-year-old with known COPD and previous hypercapnic failure, $S_pO_2$ 84%; (c) a 50-year-old in cardiac arrest.
::: solution
(a) Nasal cannulae (or a simple face mask if more is needed), target 94–98%. (b) A Venturi mask at 24% or 28%, target 88–92%, with an arterial blood gas to check for hypercapnia. (c) The highest possible concentration, via bag–valve–mask with a reservoir during resuscitation, then titrated to target after return of spontaneous circulation.
:::
:::

::: exercise CPAP or NIV? {level=2}
For each patient, choose CPAP or NIV and explain why: (a) a 75-year-old with COPD, pH 7.29 and $P_{aCO_2}$ 8.4 kPa after an hour of optimal treatment; (b) a 60-year-old with COVID-19 pneumonia, $S_pO_2$ 90% on 60% oxygen and $P_{aCO_2}$ 4.3 kPa; (c) a 67-year-old with motor neurone disease, morning headaches and daytime $P_{aCO_2}$ 7.1 kPa.
::: solution
(a) **NIV**: persistent hypercapnic acidosis in a COPD exacerbation; the inspiratory pressure support increases alveolar ventilation. (b) **CPAP** (or HFNO): type 1 failure; positive pressure recruits collapsed alveoli and improves oxygenation; ventilatory support is not the problem. (c) **NIV** (home bilevel ventilation): chronic hypercapnic failure from respiratory muscle weakness; it improves symptoms and survival in MND, with planning that respects his wishes for the future.
:::
:::

::: exercise A deteriorating patient on NIV {level=3}
A 72-year-old woman with COPD has been on NIV for 2 hours for an exacerbation with an initial pH of 7.26 and $P_{aCO_2}$ 9.1 kPa. Her repeat gas shows pH 7.22 and $P_{aCO_2}$ 10.2 kPa. She is drowsy. What could be going wrong, and what decisions are needed?
::: hint
Think about the patient, the mask, the machine and the plan.
:::
::: solution
Her NIV is failing. Check: **the mask and circuit** (leaks, poor fit, wrong interface); **the settings** (inspiratory pressure may be too low to deliver adequate tidal volume; check that EPAP is sufficient and that the patient and ventilator are synchronised); **oxygen** (is the saturation within 88–92% or has too much oxygen been entrained?); **the patient** (secretions, a new pneumothorax, worsening pneumonia, sedation or exhaustion); and **the diagnosis** (another cause such as PE or heart failure). Increasing drowsiness with worsening acidosis means she may need invasive ventilation. This is where the pre-agreed **ceiling of treatment** matters: if intubation was judged appropriate, critical care should be involved now; if NIV was agreed as the ceiling, the focus may shift to comfort, with honest discussion with her and her family.
:::
:::

::: exercise Hypoxaemia after a fall {level=3}
A 30-year-old man is admitted after a fall from a height with multiple rib fractures and a femoral fracture. On day 2 he becomes increasingly breathless. On 15 L/min via a reservoir mask his $S_pO_2$ is 88%; $P_{aO_2}$ is 7.6 kPa. The chest radiograph shows new bilateral patchy opacities, and echocardiography is normal. Give a differential diagnosis and outline management principles.
::: solution
Hypoxaemic (type 1) failure with bilateral opacities after major trauma. The differential includes **ARDS** (from trauma, lung contusion, transfusion or sepsis), **pulmonary contusion**, **fat embolism syndrome** (after long-bone fracture; look for petechiae and confusion), **aspiration**, **pneumonia** related to poor cough because of rib pain, and transfusion-related lung injury. Pulmonary embolism is also possible after trauma. A pneumothorax must be excluded.

Management: senior and critical care review; high-flow oxygen, then CPAP or HFNO if appropriate, with readiness to intubate; once ventilated, lung-protective ventilation (about 6 mL/kg predicted body weight, plateau ≤ 30 cmH₂O, adequate PEEP) and prone positioning if the $P_{aO_2}$/$F_{IO_2}$ ratio is below 150 mmHg; good analgesia (including regional techniques for rib fractures) to allow coughing and deep breathing; conservative fluid management once he is haemodynamically stable; early fracture fixation; and thromboprophylaxis when bleeding risk allows.
:::
:::
