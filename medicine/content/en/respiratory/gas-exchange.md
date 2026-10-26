The lung exists to bring blood and air close together. About 5 litres of blood a minute pass through the pulmonary capillaries, spread in a layer one red cell thick over an alveolar surface of around 70 square metres, separated from the air by a barrier less than a micrometre thick. Across that barrier the body takes up roughly 250 mL of oxygen and gives off roughly 200 mL of carbon dioxide every minute at rest.

When gas exchange fails, the result is hypoxaemia, hypercapnia or both. There are only five ways it can fail, and a small number of equations tell them apart at the bedside. This chapter sets out those equations: partial pressures and the alveolar gas equation, diffusion, the matching of ventilation to blood flow, and the carriage of oxygen and carbon dioxide in the blood.

## Partial pressures {#sec-partial}

Gases move by diffusion from regions of high partial pressure to regions of low partial pressure. The partial pressure of a gas in a mixture is its fractional concentration multiplied by the total pressure (Dalton's law). For a gas dissolved in a liquid, the partial pressure is the partial pressure of the gas phase with which the liquid would be in equilibrium.

::: definition Inspired and alveolar partial pressures {#def-partial}
- **Inspired oxygen partial pressure** ($P_{IO_2}$) is the partial pressure of oxygen in air once it has been warmed to body temperature and saturated with water vapour in the upper airways:
  $P_{IO_2} = F_{IO_2} \times (P_B - P_{H_2O})$, where $F_{IO_2}$ is the fraction of oxygen (0.21 for air), $P_B$ is barometric pressure and $P_{H_2O}$ is the water vapour pressure at 37 °C (6.3 kPa, 47 mmHg).
- **Alveolar oxygen partial pressure** ($P_{AO_2}$) is the partial pressure of oxygen in the alveolar gas. It is lower than $P_{IO_2}$ because oxygen is constantly removed by the blood and replaced by carbon dioxide.
- **Arterial partial pressures** ($P_{aO_2}$, $P_{aCO_2}$) are measured on an arterial blood gas sample. Typical values breathing air at sea level: $P_{aO_2}$ 11–13 kPa (80–100 mmHg), $P_{aCO_2}$ 4.7–6.0 kPa (35–45 mmHg).
:::

At sea level, with $P_B$ = 101.3 kPa, $P_{IO_2} = 0.21 \times (101.3 - 6.3) \approx 20.0$ kPa (150 mmHg).

### The alveolar gas equation

To know whether the lung is transferring oxygen efficiently, we need to know what the alveolar $P_{O_2}$ is. It cannot be sampled directly, but it can be calculated.

::: theorem The alveolar gas equation {#thm-age}
In a steady state, the alveolar oxygen partial pressure is approximately

$$
P_{AO_2} = P_{IO_2} - \frac{P_{aCO_2}}{R}
$$ {#eq-age}

where $R$ is the respiratory exchange ratio (carbon dioxide produced divided by oxygen consumed), taken as 0.8 on a typical mixed diet. Arterial $P_{CO_2}$ is used in place of alveolar $P_{CO_2}$ because the two are almost identical.
:::

::: proof
Each litre of alveolar ventilation brings in oxygen at the inspired partial pressure. Oxygen leaves the alveolus into the blood and carbon dioxide arrives from it. If the body consumed one molecule of oxygen for every molecule of carbon dioxide produced ($R = 1$), the fall in alveolar $P_{O_2}$ below inspired would equal the rise in alveolar $P_{CO_2}$ above inspired (which is close to zero). Because $R$ is normally less than 1, more oxygen is removed than carbon dioxide is added, and the fall in $P_{O_2}$ is larger: $P_{CO_2}/R$. The equation shows the key point for clinical use: alveolar $P_{O_2}$ falls when $P_{aCO_2}$ rises (hypoventilation) or when inspired oxygen falls (altitude).
:::

On air at sea level with a normal $P_{aCO_2}$ of 5.3 kPa: $P_{AO_2} = 20.0 - 5.3/0.8 \approx 13.3$ kPa.

::: definition Alveolar–arterial oxygen gradient {#def-aa}
The **A–a gradient** is the difference $P_{AO_2} - P_{aO_2}$. It measures how efficiently oxygen moves from alveolar gas into arterial blood. In young healthy adults breathing air it is below about 2 kPa (15 mmHg); it widens with age (a rough upper limit in mmHg is age/4 + 4). A raised gradient means a problem in the lung itself: ventilation–perfusion mismatch, shunt or, more rarely, diffusion limitation.
:::

The gradient is most useful breathing air. On supplemental oxygen the normal gradient becomes much larger and less predictable, so gradients calculated on oxygen should be interpreted with care; the ratio of $P_{aO_2}$ to $F_{IO_2}$ (the P/F ratio) is used instead in critical care ([[respiratory/respiratory-failure]]).

::: example Two hypoxaemic patients {#ex-a-a}
Both patients are breathing air at sea level. Calculate the A–a gradient for each and say what it implies.

(a) A 74-year-old woman, 3 days after a hip replacement, is suddenly breathless: $P_{aO_2}$ 8.5 kPa, $P_{aCO_2}$ 3.8 kPa.

(b) A 26-year-old man found drowsy after taking an unknown amount of heroin: $P_{aO_2}$ 7.8 kPa, $P_{aCO_2}$ 9.0 kPa.
::: solution
(a) $P_{AO_2} = 20.0 - 3.8/0.8 = 20.0 - 4.75 = 15.2$ kPa. Gradient $= 15.2 - 8.5 = 6.7$ kPa, clearly raised. She is hyperventilating (low $P_{aCO_2}$), which should raise her $P_{aO_2}$, yet it is low. The lung is not transferring oxygen properly. In this setting pulmonary embolism is the leading concern ([[respiratory/interstitial-vascular-disease]]); pneumonia and atelectasis are alternatives.

(b) $P_{AO_2} = 20.0 - 9.0/0.8 = 20.0 - 11.25 = 8.75$ kPa. Gradient $= 8.75 - 7.8 \approx 0.9$ kPa, normal. The lungs are working; the problem is that he is not breathing enough. Opioid-induced hypoventilation raises alveolar $P_{CO_2}$, which displaces oxygen. The treatment is to reverse the cause and support ventilation, not just to give oxygen. A normal gradient with hypoxaemia always points to hypoventilation or a low inspired oxygen. (If he had also aspirated, the gradient would rise.)
:::
:::

## Diffusion across the membrane {#sec-diffusion}

Oxygen and carbon dioxide cross the alveolar–capillary barrier by passive diffusion. The barrier consists of the alveolar epithelium, a fused basement membrane, the capillary endothelium, a thin layer of plasma and the red cell membrane.

::: theorem Fick's law of diffusion {#thm-fick}
The rate of transfer of a gas across a sheet of tissue is

$$
\dot V_{gas} = \frac{A \cdot D \cdot (P_1 - P_2)}{T}
$$ {#eq-fick}

where $A$ is the area, $T$ the thickness, $P_1 - P_2$ the partial pressure difference and $D$ a diffusion constant proportional to the solubility of the gas and inversely proportional to the square root of its molecular weight.
:::

Carbon dioxide is about 20 times more soluble than oxygen, so it diffuses about 20 times faster for the same pressure difference. In practice, diffusion limitation almost never causes carbon dioxide retention: a high $P_{aCO_2}$ is a problem of ventilation.

At rest, blood spends about 0.75 seconds in a pulmonary capillary, and the partial pressure of oxygen in the blood reaches that of the alveolus in about a third of that time. There is a large safety margin. Oxygen uptake under these conditions is **perfusion-limited**: more uptake requires more blood flow, not faster diffusion. Diffusion becomes limiting when the barrier is thickened (fibrosis), when the area is reduced (emphysema, loss of capillaries), when transit time is short (heavy exercise) or when the driving pressure is low (altitude). These factors combine. A person with fibrosis may have a normal $P_{aO_2}$ at rest but desaturate markedly on walking, because the faster blood flow shortens transit time.

::: definition Transfer factor {#def-tlco}
The **transfer factor for carbon monoxide** (TLCO, called DLCO in North America) is measured by inhaling a small, safe concentration of carbon monoxide with an inert tracer gas, holding the breath for about 10 seconds, and measuring how much carbon monoxide has been taken up. Carbon monoxide is used because it binds haemoglobin so avidly that its partial pressure in the blood stays near zero, so its uptake reflects the membrane and the capillary blood volume. The **transfer coefficient** (KCO) is TLCO divided by the alveolar volume measured during the test.
:::

TLCO falls in emphysema, interstitial lung disease, pulmonary vascular disease and anaemia, and rises with polycythaemia and alveolar haemorrhage (extra haemoglobin in the alveoli takes up carbon monoxide). How the pattern of TLCO and KCO is used is covered in [[respiratory/control-breathing-tests]].

## Ventilation and perfusion {#sec-vq}

For gas exchange to work, each alveolus needs both air and blood, in the right proportion. Overall, alveolar ventilation is about 4 L/min and pulmonary blood flow about 5 L/min, a ratio of roughly 0.8. But the ratio is not uniform.

::: definition Ventilation–perfusion ratio, dead space and shunt {#def-vq}
- The **ventilation–perfusion ratio** ($\dot V/\dot Q$) of a lung unit is its alveolar ventilation divided by its blood flow.
- **Dead space** is ventilation that does not take part in gas exchange ($\dot V/\dot Q = \infty$). **Anatomical dead space** is the conducting airways, about 150 mL in an adult (roughly 2 mL/kg). **Alveolar dead space** is alveoli that are ventilated but not perfused. Together they make the **physiological dead space**.
- **Shunt** is blood that reaches the arterial circulation without passing ventilated alveoli ($\dot V/\dot Q = 0$). A small normal shunt comes from the bronchial and Thebesian veins. Pathological shunt arises from completely collapsed or fluid-filled alveoli, or from an anatomical right-to-left connection in the heart or lung.
- **Ventilation–perfusion mismatch** is the presence of units with a range of ratios between these extremes.
:::

In the upright lung, both ventilation and perfusion increase from apex to base, because of gravity, but perfusion increases more steeply. The apex therefore has a high $\dot V/\dot Q$ ratio and the base a low one. John West described the lung in terms of zones defined by the relationship between alveolar, arterial and venous pressures; in zone 1, which exists only in disease or with positive-pressure ventilation, alveolar pressure exceeds arterial pressure and the capillaries are squeezed shut.

### Why low V/Q units cause hypoxaemia but not usually hypercapnia

Blood leaving a low $\dot V/\dot Q$ unit has a low $P_{O_2}$ and a high $P_{CO_2}$. Blood leaving a high $\dot V/\dot Q$ unit has a high $P_{O_2}$ and low $P_{CO_2}$. Mixing them in the pulmonary veins does not average out for oxygen, because of the shape of the oxygen–haemoglobin dissociation curve (below): blood from well-ventilated units is already almost fully saturated, so overventilating them adds very little oxygen. The low-saturation blood from poorly ventilated units dominates the mixture.

Carbon dioxide is different. Its dissociation curve is almost linear over the physiological range, so overventilating healthy units removes extra carbon dioxide and compensates for the units that are underventilated. The brainstem senses the rising $P_{aCO_2}$ and increases ventilation to do this. That is why most patients with pneumonia, pulmonary embolism or asthma have a low or normal $P_{aCO_2}$ with hypoxaemia. A rising $P_{aCO_2}$ means the total ventilation can no longer keep up, a sign of tiring or of severe disease.

::: definition The five causes of hypoxaemia {#def-hypox}
1. **Low inspired oxygen** (altitude): A–a gradient normal.
2. **Hypoventilation**: $P_{aCO_2}$ raised, A–a gradient normal.
3. **Diffusion limitation**: gradient raised, mainly on exercise.
4. **Ventilation–perfusion mismatch**: gradient raised; corrects well with supplemental oxygen.
5. **Shunt**: gradient raised; corrects poorly with oxygen.
:::

The last distinction is useful at the bedside. In V/Q mismatch, even poorly ventilated units receive some fresh gas; raising the inspired oxygen raises their alveolar $P_{O_2}$, and saturation improves. In true shunt, the shunted blood never meets the added oxygen, and the blood that does pass ventilated alveoli is already nearly saturated and cannot carry much more. A large shunt therefore causes hypoxaemia that barely responds to high-flow oxygen.

::: theorem Hypoxic pulmonary vasoconstriction {#thm-hpv}
Pulmonary arterioles constrict when the alveolar $P_{O_2}$ around them falls. This diverts blood away from poorly ventilated regions towards better-ventilated ones and improves $\dot V/\dot Q$ matching.
:::

Hypoxic pulmonary vasoconstriction was described by Ulf von Euler and Göran Liljestrand in 1946. It is the opposite of the response in systemic vessels, which dilate when hypoxic. It works well when one region is affected, such as a lobar pneumonia. When the whole lung is hypoxic, as at altitude or in severe COPD, widespread vasoconstriction raises pulmonary artery pressure, and if sustained it contributes to pulmonary hypertension and right heart failure (cor pulmonale). In the fetus, it keeps pulmonary blood flow low until the first breaths.

::: example Hypoxaemia that oxygen will not fix {#ex-shunt}
A 52-year-old man with severe pneumonia affecting both lower lobes has an oxygen saturation of 86% on air. On 60% oxygen through a Venturi mask his saturation only rises to 89%, and on a non-rebreathing mask to 90%. What does this response suggest?
::: solution
A poor response to a large increase in inspired oxygen indicates a significant **shunt**: blood flowing through alveoli that are completely filled with inflammatory exudate. That blood never meets the extra oxygen. The blood passing the remaining ventilated alveoli is already close to fully saturated, so increasing their alveolar $P_{O_2}$ adds very little. Hypoxic vasoconstriction has failed to divert enough flow away from the consolidated lung. The physiological fix is not more oxygen but reopening the flooded alveoli, which is the rationale for positive end-expiratory pressure (CPAP or mechanical ventilation) and, in severe cases, prone positioning ([[respiratory/respiratory-failure]]).
:::
:::

### Measuring dead space

The Bohr equation estimates the fraction of each breath that is wasted. Carbon dioxide in exhaled gas comes only from alveoli that are perfused; dead space contributes gas with no carbon dioxide and dilutes it.

$$
\frac{V_D}{V_T} = \frac{P_{aCO_2} - P_{\bar E CO_2}}{P_{aCO_2}}
$$ {#eq-bohr}

where $P_{\bar E CO_2}$ is the partial pressure of carbon dioxide in mixed expired gas. The normal value is about 0.3. It rises in pulmonary embolism, emphysema and with rapid shallow breathing, since the anatomical dead space is a fixed volume taken from each breath. A person who breathes 500 mL breaths with 150 mL dead space wastes 30% of each breath; the same person taking 250 mL breaths wastes 60%.

## Oxygen transport {#sec-o2}

Oxygen dissolves poorly in plasma: only about 0.023 mL per decilitre of blood per kPa (0.003 mL/dL per mmHg). At a normal $P_{aO_2}$ that is only 0.3 mL/dL, far too little to supply the tissues. Nearly all oxygen is carried bound to haemoglobin.

::: definition Oxygen content and delivery {#def-content}
The **oxygen content** of arterial blood (in mL/dL) is

$$
C_{aO_2} = 1.34 \times [\text{Hb}] \times S_{aO_2} + 0.023 \times P_{aO_2}
$$ {#eq-content}

with haemoglobin [Hb] in g/dL, saturation $S_{aO_2}$ as a fraction and $P_{aO_2}$ in kPa. The figure 1.34 is the volume of oxygen (mL) carried by 1 g of fully saturated haemoglobin. **Oxygen delivery** is $D_{O_2} = \text{cardiac output} \times C_{aO_2}$; at rest about 1,000 mL/min. (UK laboratories report haemoglobin in g/L; divide by 10 for g/dL.)
:::

The equation shows the three ways to lose oxygen delivery: low saturation (lung failure), low haemoglobin (anaemia) and low cardiac output (heart failure, shock). A person with severe anaemia may have a perfect saturation and a normal $P_{aO_2}$ but half the normal oxygen content.

### The oxygen–haemoglobin dissociation curve

Haemoglobin has four haem groups, and binding of oxygen at one makes binding at the others easier (cooperative binding). The resulting curve of saturation against $P_{O_2}$ is sigmoid.

::: widget plot
f: 100*x^2.7/(3.5^2.7+x^2.7); 100*x^2.7/(p^2.7+x^2.7)
x: 0, 14
y: 0, 102
sliders: p=3.5:2:6:0.1
labels: \text{normal (P50 3.5 kPa)}; \text{shifted curve}
vlines: 8
caption: A simplified oxygen–haemoglobin dissociation curve (Hill equation, $P_{O_2}$ in kPa on the horizontal axis, saturation in % on the vertical). The slider sets the $P_{50}$ of the second curve. Moving it right mimics acidosis, raised $P_{CO_2}$, fever or raised 2,3-BPG; moving it left mimics alkalosis, hypothermia, fetal haemoglobin or carbon monoxide. The vertical line at 8 kPa marks the start of the steep part: above it, saturation changes little; below it, it falls quickly.
:::

Two features of the shape matter clinically.

- **The flat upper part.** Above about 8 kPa (60 mmHg), saturation is over 90% and changes little. Loading in the lung is protected against moderate falls in alveolar $P_{O_2}$. But it also means that a pulse oximeter reading of 98% cannot distinguish a $P_{aO_2}$ of 13 kPa from one of 40 kPa: oximetry hides hyperoxia, and it hides deterioration in a patient on high-flow oxygen until the $P_{aO_2}$ has fallen a long way.
- **The steep lower part.** Between about 2 and 6 kPa, a small fall in $P_{O_2}$ releases a lot of oxygen. In the tissues, where $P_{O_2}$ is low, oxygen unloads readily. It also means that once a patient's $P_{aO_2}$ falls below 8 kPa, saturation drops fast.

::: definition P50 and shifts of the curve {#def-p50}
The **P50** is the $P_{O_2}$ at which haemoglobin is 50% saturated, normally about 3.5 kPa (26–27 mmHg). A **right shift** (higher P50) means lower affinity and easier unloading. It is caused by a rise in hydrogen ion concentration and $P_{CO_2}$ (the **Bohr effect**), temperature and 2,3-bisphosphoglycerate (2,3-BPG). A **left shift** (lower P50) means higher affinity and harder unloading. It is caused by the opposite changes and by fetal haemoglobin, carbon monoxide and methaemoglobin.
:::

The Bohr effect suits physiology neatly: in exercising muscle, which is warm, acidic and rich in carbon dioxide, haemoglobin gives up oxygen more easily. Fetal haemoglobin binds 2,3-BPG poorly, so its curve lies to the left of the mother's, helping oxygen pass across the placenta.

::: example A headache in the bedsit {#ex-co}
A 34-year-old woman and her flatmate both have headache, nausea and drowsiness on a winter morning. Their pulse oximeter readings are 99%. A venous blood gas on a co-oximeter shows carboxyhaemoglobin 28%. Explain why the pulse oximeter is reassuring but wrong, and why she is hypoxic at the tissues.
::: solution
Carbon monoxide binds haemoglobin about 200–250 times more avidly than oxygen. At 28% carboxyhaemoglobin, more than a quarter of her haemoglobin cannot carry oxygen, so her oxygen content is reduced by roughly that fraction even though her $P_{aO_2}$ is normal. Worse, carbon monoxide bound to some haem groups increases the affinity of the remaining groups for oxygen, shifting the curve to the left, so the oxygen that is carried is released less readily in the tissues. Standard pulse oximeters use two wavelengths of light and cannot distinguish carboxyhaemoglobin from oxyhaemoglobin, so they read falsely normal. Diagnosis needs co-oximetry, which measures several haemoglobin species. Treatment is high-concentration oxygen, which shortens the half-life of carboxyhaemoglobin, together with finding and removing the source (here, a faulty boiler is likely). A cluster of people in one dwelling with similar symptoms is a classic clue ([[emergency-critical-care/poisoning]]).
:::
:::

### Pulse oximetry

A pulse oximeter shines red and infrared light through a finger or earlobe. Oxygenated and deoxygenated haemoglobin absorb these wavelengths differently, and by looking only at the pulsatile part of the signal the device estimates arterial saturation ($S_pO_2$). It is quick, painless and continuous, but it has limits:

- It cannot detect carbon monoxide poisoning or methaemoglobinaemia.
- It is unreliable with poor perfusion (cold peripheries, shock), movement and some nail varnishes.
- It says nothing about ventilation: a patient on oxygen may have a normal saturation and a dangerously high $P_{aCO_2}$.
- It is less accurate at low saturations.
- **It overestimates saturation in people with darker skin pigmentation.** Studies comparing pulse oximetry with arterial samples, including a large US analysis published in 2020, found that hidden hypoxaemia (a true arterial saturation below 88% with an oximeter reading of 92–96%) was about three times as common in Black patients as in White patients. The UK independent review of equity in medical devices (2024) recommended action on this. In practice, clinicians should be aware of the bias, look at trends and the whole clinical picture, and use arterial blood gases when the decision matters.

## Carbon dioxide transport {#sec-co2}

Carbon dioxide is carried in three forms. Of the carbon dioxide added to blood in the tissues, about 60% is carried as bicarbonate, about 30% as carbamino compounds (bound to amino groups, mainly on haemoglobin) and about 10% dissolved.

Bicarbonate is formed inside red cells, where carbonic anhydrase speeds the reaction $\text{CO}_2 + \text{H}_2\text{O} \rightleftharpoons \text{H}_2\text{CO}_3 \rightleftharpoons \text{H}^+ + \text{HCO}_3^-$. The bicarbonate leaves the cell in exchange for chloride (the **chloride shift**), and the hydrogen ions are buffered by haemoglobin. Deoxygenated haemoglobin is a better buffer and forms carbamino compounds more readily than oxygenated haemoglobin, so venous blood can carry more carbon dioxide at the same $P_{CO_2}$. This is the **Haldane effect**. In the lungs, oxygenation of haemoglobin releases carbon dioxide, which helps its excretion.

The Haldane effect has a clinical side. When a person with chronic hypercapnia is given a high concentration of oxygen, the increased oxygenation of haemoglobin releases carbon dioxide into the blood, which is one reason their $P_{aCO_2}$ may rise ([[respiratory/control-breathing-tests]]).

The link between carbon dioxide and pH (the Henderson–Hasselbalch relation) makes ventilation the body's fastest acid–base regulator. That subject is covered in [[physiology/acid-base]].

::: example The climber at altitude {#ex-altitude}
A healthy 29-year-old climber reaches a hut at 4,000 m, where barometric pressure is about 61.6 kPa. She is breathing fast, and her $P_{aCO_2}$ is 4.0 kPa. Estimate her alveolar $P_{O_2}$ and explain how hyperventilation helps her.
::: solution
$P_{IO_2} = 0.21 \times (61.6 - 6.3) = 0.21 \times 55.3 = 11.6$ kPa.

$P_{AO_2} = 11.6 - 4.0/0.8 = 11.6 - 5.0 = 6.6$ kPa.

Her alveolar $P_{O_2}$ is about half the sea-level value. The fraction of oxygen in the air is unchanged; the total pressure is lower. Her carotid bodies sense the low $P_{aO_2}$ and drive ventilation up (the hypoxic ventilatory response). Lowering $P_{aCO_2}$ from 5.3 to 4.0 kPa raises alveolar $P_{O_2}$ by about 1.6 kPa, by [[#eq-age]], and this can make a large difference on the steep part of the dissociation curve. Her A–a gradient is normal; her hypoxaemia comes entirely from the low inspired $P_{O_2}$. Over days, the kidneys excrete bicarbonate to correct the respiratory alkalosis, allowing ventilation to rise further (acclimatisation).
:::
:::

::: example Anaemia and oxygen content {#ex-content}
A 61-year-old man with bleeding from a colonic tumour has haemoglobin 75 g/L, $S_aO_2$ 98% and $P_{aO_2}$ 13.3 kPa. Compare his arterial oxygen content with a person who has haemoglobin 150 g/L and the same saturation and $P_{aO_2}$.
::: solution
Convert haemoglobin to g/dL: 7.5 and 15.

Normal: $C_{aO_2} = 1.34 \times 15 \times 0.98 + 0.023 \times 13.3 = 19.70 + 0.31 \approx 20.0$ mL/dL.

Anaemic: $C_{aO_2} = 1.34 \times 7.5 \times 0.98 + 0.31 = 9.85 + 0.31 \approx 10.2$ mL/dL.

His oxygen content is about half normal although his saturation and $P_{aO_2}$ are perfect. He compensates by increasing cardiac output (tachycardia) and by greater extraction in the tissues, helped by a rise in red cell 2,3-BPG. Giving him supplemental oxygen adds almost nothing, because his haemoglobin is already saturated; the treatment is to stop the bleeding and restore haemoglobin, by transfusion if clinically indicated ([[blood/transfusion]]).
:::
:::

::: quiz
A hypoxaemic patient breathing air has a normal A–a gradient. Which of the following is the most likely cause?
- [ ] Lobar pneumonia
- [ ] Pulmonary embolism
- [x] Hypoventilation from an opioid overdose
- [ ] Idiopathic pulmonary fibrosis
::: solution
A normal gradient with hypoxaemia means the lung is transferring oxygen normally and the problem lies with the oxygen reaching the alveoli: hypoventilation (as here, with a raised $P_{aCO_2}$) or a low inspired oxygen, as at altitude. Pneumonia (shunt and V/Q mismatch), pulmonary embolism (V/Q mismatch) and fibrosis (V/Q mismatch and diffusion limitation) all widen the gradient ([[#def-hypox]]).
:::
:::

::: history
In the late nineteenth century Christian Bohr and John Scott Haldane both believed that the lung actively secreted oxygen into the blood. August Krogh, working with his wife Marie Krogh, settled the question in 1910 with careful measurements showing that diffusion alone could account for oxygen uptake. Joseph Barcroft characterised the dissociation curve and its shifts in the early twentieth century; Bohr, Hasselbalch and Krogh had described the effect of carbon dioxide on it in 1904. In 1949 Richard Riley and André Cournand developed a three-compartment model of the lung (ideal alveoli, dead space and shunt) that is still how clinicians reason about blood gases. Ulf von Euler and Göran Liljestrand described hypoxic pulmonary vasoconstriction in 1946. In the 1960s John West used radioactive gases to show regional differences in ventilation and perfusion in the upright lung. In 1972 Takuo Aoyagi, an engineer in Japan, devised the two-wavelength principle behind the modern pulse oximeter.
:::

## Where this leads

The control system that adjusts ventilation to keep these gases at their set points, and the tests that measure them, follow in [[respiratory/control-breathing-tests]]. The A–a gradient and the shunt reappear in [[respiratory/interstitial-vascular-disease]] (pulmonary embolism and fibrosis) and in [[respiratory/respiratory-failure]], where oxygen therapy and ventilation are chosen to fix specific failures of gas exchange. The acid–base side of carbon dioxide is in [[physiology/acid-base]], and haemoglobin itself in [[blood/haemoglobin-disorders]].

::: summary
- $P_{IO_2} = F_{IO_2}(P_B - 6.3)$ kPa; on air at sea level about 20 kPa.
- The alveolar gas equation $P_{AO_2} = P_{IO_2} - P_{aCO_2}/0.8$ allows the A–a gradient to be calculated. A normal gradient with hypoxaemia means hypoventilation or low inspired oxygen; a raised gradient means lung disease.
- Diffusion follows Fick's law. Carbon dioxide diffuses about 20 times faster than oxygen. TLCO measures the gas-exchanging surface.
- Hypoxaemia has five causes: low $P_{IO_2}$, hypoventilation, diffusion limitation, V/Q mismatch and shunt. Shunt responds poorly to oxygen.
- Hypoxic pulmonary vasoconstriction diverts blood from poorly ventilated lung; when global, it causes pulmonary hypertension.
- Oxygen content depends on haemoglobin, saturation and (slightly) $P_{aO_2}$. The sigmoid dissociation curve protects loading and aids unloading; its P50 shifts right with acid, $P_{CO_2}$, heat and 2,3-BPG.
- Pulse oximetry misses carbon monoxide, says nothing about $P_{aCO_2}$ and overestimates saturation in people with darker skin.
- Carbon dioxide is carried mainly as bicarbonate; the Haldane effect links its carriage to oxygenation.
:::

## Exercises

::: exercise Inspired oxygen {level=1 check="0.21*(101.3-6.3)"}
Calculate the inspired $P_{O_2}$ in kPa for a person breathing air ($F_{IO_2}$ 0.21) at a barometric pressure of 101.3 kPa, taking water vapour pressure as 6.3 kPa.
::: solution
$P_{IO_2} = 0.21 \times (101.3 - 6.3) = 0.21 \times 95.0 = 19.95$ kPa, usually rounded to 20 kPa.
:::
:::

::: exercise Computing a gradient {level=1 check="(19.95-4.8/0.8)-9.2"}
A 45-year-old woman breathing air at sea level has $P_{aO_2}$ 9.2 kPa and $P_{aCO_2}$ 4.8 kPa. Taking $P_{IO_2}$ = 19.95 kPa and $R$ = 0.8, calculate the A–a gradient in kPa (give the exact value, to two decimal places). Is it normal?
::: solution
$P_{AO_2} = 19.95 - 4.8/0.8 = 19.95 - 6.0 = 13.95$ kPa. Gradient $= 13.95 - 9.2 = 4.75$ kPa. This is raised (normal is below about 2 kPa at her age), so she has a problem with gas exchange in the lung, such as V/Q mismatch.
:::
:::

::: exercise Why carbon dioxide is spared {level=1}
Explain in two or three sentences why a patient with widespread V/Q mismatch usually has a low or normal $P_{aCO_2}$ but a low $P_{aO_2}$.
::: solution
The carbon dioxide dissociation curve is nearly linear, so increased ventilation of the healthier units removes extra carbon dioxide and compensates for the poorly ventilated ones; chemoreceptors drive that extra ventilation. The oxygen curve is flat at the top, so overventilating healthy units adds almost no oxygen to blood that is already nearly saturated, and the desaturated blood from low V/Q units still lowers the mixed arterial saturation.
:::
:::

::: exercise Shunt fraction {level=2 check="1/3"}
In a ventilated patient, the oxygen contents are: end-capillary (ideal) 21 mL/dL, arterial 19 mL/dL, mixed venous 15 mL/dL. Using $Q_s/Q_t = (C_{cO_2} - C_{aO_2})/(C_{cO_2} - C_{vO_2})$, calculate the shunt fraction as a fraction (not a percentage).
::: solution
$Q_s/Q_t = (21 - 19)/(21 - 15) = 2/6 = 1/3$, so about 33% of the cardiac output is shunted. A normal value is under 5%. A shunt this large will respond poorly to supplemental oxygen and needs recruitment of collapsed alveoli.
:::
:::

::: exercise Dead space {level=2 check="0.6"}
A patient has $P_{aCO_2}$ 6.0 kPa and the $P_{CO_2}$ of mixed expired gas is 2.4 kPa. Use the Bohr equation to calculate $V_D/V_T$, and suggest two causes of the value you obtain.
::: solution
$V_D/V_T = (6.0 - 2.4)/6.0 = 0.6$. Normal is about 0.3. Causes include rapid shallow breathing (the fixed anatomical dead space becomes a larger fraction of each small breath), pulmonary embolism (alveolar dead space), emphysema with destruction of capillaries, and low cardiac output, which reduces perfusion of upper zones.
:::
:::

::: exercise Oxygen content {level=2 check="round(10*(1.34*12*0.9+0.023*8))/10"}
Calculate the arterial oxygen content (mL/dL, to one decimal place) for haemoglobin 120 g/L, $S_aO_2$ 90% and $P_{aO_2}$ 8 kPa.
::: solution
$C_{aO_2} = 1.34 \times 12 \times 0.90 + 0.023 \times 8 = 14.47 + 0.18 = 14.66$, which rounds to 14.7 mL/dL. Nearly all of it is bound to haemoglobin.
:::
:::

::: exercise Exercise desaturation {level=2}
A 66-year-old woman with interstitial lung disease has an oxygen saturation of 95% at rest that falls to 85% after walking for three minutes. Her $P_{aCO_2}$ at rest is 4.6 kPa. Explain the fall in saturation.
::: solution
Her alveolar–capillary membrane is thickened and her capillary bed reduced, so oxygen diffuses more slowly. At rest, the red cell's transit time of about 0.75 s still allows near-equilibration. On exercise, cardiac output rises, transit time shortens, and mixed venous blood returns more desaturated, so blood leaves the capillary before equilibrium is reached. V/Q mismatch, which is also present, worsens. Her $P_{aCO_2}$ is low because her ventilation is increased and carbon dioxide diffuses easily. Exertional desaturation is an important marker of severity and prognosis in fibrosis and is tested formally with a walk test ([[respiratory/control-breathing-tests]]).
:::
:::

::: exercise Working out the mechanism {level=3}
Three patients breathing air at sea level have these blood gases. For each, calculate the A–a gradient (use $P_{IO_2}$ = 20.0 kPa, $R$ = 0.8) and decide the main mechanism of hypoxaemia. Suggest a plausible clinical cause.

(a) $P_{aO_2}$ 7.5 kPa, $P_{aCO_2}$ 9.5 kPa.
(b) $P_{aO_2}$ 7.0 kPa, $P_{aCO_2}$ 4.0 kPa; saturation rises from 86% to 97% on 28% oxygen.
(c) $P_{aO_2}$ 6.5 kPa, $P_{aCO_2}$ 4.2 kPa; saturation rises only from 82% to 85% on 15 L/min through a non-rebreathing mask.
::: hint
First compute $P_{AO_2}$. Then use the gradient to separate hypoventilation from lung disease, and the response to oxygen to separate V/Q mismatch from shunt.
:::
::: solution
(a) $P_{AO_2} = 20.0 - 9.5/0.8 = 8.1$ kPa; gradient $\approx 0.6$ kPa, normal. **Hypoventilation**: for example, opioid or sedative overdose, neuromuscular weakness such as Guillain–Barré syndrome, or obesity hypoventilation.

(b) $P_{AO_2} = 20.0 - 4.0/0.8 = 15.0$ kPa; gradient 8.0 kPa, raised. Good response to modest oxygen. **V/Q mismatch**: for example, an exacerbation of asthma, pneumonia without extensive consolidation, or pulmonary embolism.

(c) $P_{AO_2} = 20.0 - 4.2/0.8 = 14.75$ kPa; gradient about 8.3 kPa, raised. Very poor response to high-concentration oxygen. **Shunt**: for example, extensive consolidation, acute respiratory distress syndrome, pulmonary oedema, or an intracardiac or pulmonary arteriovenous right-to-left shunt.

In practice, mechanisms overlap; the gradient and the response to oxygen tell you which dominates.
:::
:::
