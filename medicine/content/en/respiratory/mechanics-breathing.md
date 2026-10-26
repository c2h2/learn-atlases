Every breath is a small piece of physics. The respiratory muscles change the volume of the chest, the change in volume changes the pressure in the alveoli, and air flows down the pressure difference between the mouth and the alveoli. Two things oppose that flow: the elastic recoil of the lungs and chest wall, which resists stretching, and the resistance of the airways, which resists the movement of gas. Almost every clinical respiratory finding can be explained by a change in one of these two oppositions. Fibrosis makes the lung stiff; emphysema makes it floppy; asthma narrows the airways; a pneumothorax uncouples the lung from the chest wall altogether.

This chapter builds that framework from the ground up. It starts with the pressures that drive ventilation, then the lung volumes and how they are measured, then compliance and surface tension, then airway resistance and the limit on expiratory flow, and finally the work of breathing. It ends with what spirometry measures and how the two big patterns, obstruction and restriction, arise from the mechanics.

## Pressures that move air {#sec-pressures}

Air flows from high pressure to low pressure. At the end of a quiet breath out, with the glottis open and no flow, the pressure in the alveoli equals atmospheric pressure. To breathe in, the alveolar pressure must fall below atmospheric; to breathe out, it must rise above it. By convention, respiratory pressures are quoted relative to atmospheric pressure, in centimetres of water (1 cmH₂O ≈ 0.098 kPa), so atmospheric pressure is "zero".

::: definition Respiratory pressures {#def-pressures}
- **Alveolar pressure** ($P_A$) is the gas pressure inside the alveoli.
- **Pleural pressure** ($P_{pl}$) is the pressure in the thin film of fluid between the visceral and parietal pleura. At rest it is about −5 cmH₂O.
- **Transpulmonary pressure** ($P_{tp} = P_A - P_{pl}$) is the pressure difference across the lung. It is the pressure that holds the lung inflated.
- **Transrespiratory pressure** ($P_{rs} = P_A - P_{atm}$) is the difference between the alveoli and the mouth. It drives airflow.
:::

The pleural pressure is negative because the lung and the chest wall pull in opposite directions. The lung, left to itself, would collapse to a small volume: it is full of elastic fibres and lined by a liquid film whose surface tension pulls inwards. The chest wall, left to itself, would spring outwards to a larger volume. The pleural fluid couples them, the way a film of water holds two glass slides together. The opposing pulls create a slight vacuum in the pleural space.

During a quiet breath in, the diaphragm contracts and descends, and the external intercostals lift the ribs. The chest expands, pleural pressure falls from about −5 to about −8 cmH₂O, the transpulmonary pressure rises, and the lung expands with the chest. Boyle's law (at constant temperature, pressure × volume is constant) means that as alveolar volume increases, alveolar pressure falls by a cmH₂O or so, and air flows in. When the muscles relax, the elastic recoil of the lung raises alveolar pressure slightly above atmospheric and air flows out. Quiet expiration is therefore passive. Forced expiration recruits the abdominal muscles and internal intercostals, which raise pleural pressure, sometimes well above atmospheric.

::: example A puncture wound {#ex-pneumo}
A 23-year-old man is stabbed in the right side of the chest. He is breathless, the right side of his chest moves less than the left, and the breath sounds on the right are absent. Explain the mechanics.
::: solution
The wound connects the pleural space to the atmosphere (or a torn lung leaks air into it). Air enters the pleural space because the pressure there is lower than atmospheric. Once the pleural pressure rises to atmospheric, the transpulmonary pressure that held the right lung open falls to zero. Nothing now opposes the lung's elastic recoil, so the lung collapses towards its own resting volume, while the right chest wall springs slightly outwards. This is a **pneumothorax**. Breath sounds are absent because there is no aerated lung against the chest wall to transmit them, and the hemithorax moves less because expanding the chest no longer inflates the lung. Management of pneumothorax is covered in [[respiratory/lung-cancer-pleura]].
:::
:::

## Lung volumes and capacities {#sec-volumes}

A spirometer records the volume of air breathed in and out. The standard subdivisions are defined by four reference points: the end of a quiet breath out, the end of a quiet breath in, a maximal breath in and a maximal breath out.

::: definition Lung volumes and capacities {#def-volumes}
The four **volumes** do not overlap:

- **Tidal volume** (VT): the volume of a normal breath, about 0.5 L in an adult at rest.
- **Inspiratory reserve volume** (IRV): the extra volume that can be breathed in after a normal breath in.
- **Expiratory reserve volume** (ERV): the extra volume that can be breathed out after a normal breath out.
- **Residual volume** (RV): the volume left in the lungs after a maximal breath out.

The **capacities** are sums of volumes:

- **Total lung capacity** TLC = IRV + VT + ERV + RV, about 6 L in a young adult man.
- **Vital capacity** VC = IRV + VT + ERV, the largest volume that can be exhaled after a maximal breath in.
- **Functional residual capacity** FRC = ERV + RV, the volume at the end of a quiet breath out, about 2.5–3 L.
- **Inspiratory capacity** IC = VT + IRV.
:::

The values depend on height, age and sex, and to a lesser extent on other factors, so measurements are compared with reference equations rather than with fixed numbers (see [[respiratory/control-breathing-tests]]).

FRC is not arbitrary. It is the volume at which the inward recoil of the lung exactly balances the outward recoil of the chest wall, so that no muscle effort is needed to hold it. Anything that changes either recoil moves FRC. Stiff, fibrotic lungs pull harder, and FRC falls. In emphysema the lung has lost recoil, and FRC rises. Lying down lets the abdominal contents push the diaphragm up, and FRC falls by several hundred millilitres; obesity and pregnancy have similar effects. A low FRC matters clinically because some small airways close at low lung volumes, which leads to areas of lung that are perfused but poorly ventilated.

RV, and therefore FRC and TLC, cannot be measured with a spirometer, because the patient cannot exhale the residual volume. Three methods are used:

- **Helium dilution**: the patient breathes from a closed circuit containing a known concentration of helium, an inert gas that hardly crosses into the blood, until the concentration equalises between the circuit and the lungs.
- **Nitrogen washout**: the patient breathes 100% oxygen and all the nitrogen washed out of the lungs is collected and measured.
- **Body plethysmography** (the "body box"): the patient pants against a closed shutter inside a sealed box, and Boyle's law is used to calculate the volume of gas in the chest.

The dilution methods measure only gas that communicates with the airways. Plethysmography measures all gas in the thorax, including gas trapped behind closed airways or in bullae. A box volume much larger than the helium volume is therefore a sign of gas trapping.

::: example Measuring FRC by helium dilution {#ex-helium}
At the end of a quiet breath out, a patient is connected to a spirometer containing 9.0 L of gas with 10% helium. After several minutes of rebreathing, the helium concentration has fallen to 7.5%. What is the FRC?
::: solution
Helium is not absorbed, so the amount of helium is conserved: $C_1 V_1 = C_2 (V_1 + \text{FRC})$.

$$
\text{FRC} = V_1 \cdot \frac{C_1 - C_2}{C_2} = 9.0 \times \frac{10 - 7.5}{7.5} = 3.0 \text{ L}
$$

An FRC of 3.0 L is within the normal range for an adult man of average height. In COPD with severe gas trapping the helium estimate may be lower than the true thoracic gas volume, because helium does not reach poorly communicating regions during the test.
:::
:::

## Compliance and elastic recoil {#sec-compliance}

The lung behaves like a balloon: the more it is inflated, the harder it pulls back. Its stretchiness is described by compliance.

::: definition Compliance {#def-compliance}
**Compliance** is the change in volume per unit change in distending pressure:

$$
C = \frac{\Delta V}{\Delta P}
$$ {#eq-compliance}

For the lung, the distending pressure is the transpulmonary pressure. Normal lung compliance is about 200 mL/cmH₂O; the lung and chest wall together have about half that, roughly 100 mL/cmH₂O. **Elastance** is the reciprocal of compliance. A stiff lung has low compliance and high elastance.
:::

Compliance is not constant. The pressure–volume curve of the lung is S-shaped: compliance is highest in the middle of the range and falls at very high volumes, as the elastic and collagen fibres reach their limit, and at very low volumes, where alveoli collapse and must be reopened. Normal breathing takes place on the steep, efficient part of the curve.

Compliance falls in pulmonary fibrosis, pulmonary oedema, pneumonia and the acute respiratory distress syndrome, all of which thicken or flood the lung. It rises in emphysema, where destruction of alveolar walls removes elastic tissue. A high compliance sounds helpful, but it is not: the lung loses the recoil that holds the small airways open and drives air out during expiration.

::: example Compliance in fibrosis {#ex-compliance}
In a healthy adult, a breath of 500 mL needs a rise in transpulmonary pressure of 2.5 cmH₂O. In a woman with idiopathic pulmonary fibrosis, the same 500 mL needs a rise of 10 cmH₂O. Calculate the two compliances and explain how she is likely to breathe.
::: solution
Healthy lung: $C = 500/2.5 = 200$ mL/cmH₂O. Fibrotic lung: $C = 500/10 = 50$ mL/cmH₂O, a quarter of normal.

Each normal-sized breath now needs four times the inspiratory pressure, so the elastic work of a deep breath is high. People with stiff lungs reduce this cost by taking smaller, faster breaths: the rapid shallow pattern typical of fibrosis. Because the lung recoils strongly, FRC, TLC and vital capacity are all reduced, which is the restrictive pattern described at the end of this chapter.
:::
:::

### Surface tension and surfactant

About two-thirds of the lung's elastic recoil comes not from tissue but from surface tension at the air–liquid interface lining the alveoli. This was shown by Kurt von Neergaard in 1929: a lung filled with saline, which abolishes the air–liquid interface, inflates at a much lower pressure than one filled with air.

::: theorem Law of Laplace for a sphere {#thm-laplace}
For a spherical bubble with a single air–liquid surface, the pressure needed to keep it open is

$$
P = \frac{2T}{r}
$$ {#eq-laplace}

where $T$ is the surface tension and $r$ the radius. Smaller bubbles with the same surface tension need higher pressures.
:::

If every alveolus had the surface tension of plain water, two problems would follow. The pressures needed to inflate the lung would be large, and small alveoli, needing a higher pressure than large ones, would empty into their larger neighbours and collapse. The lung avoids both through **surfactant**.

::: proof
Surfactant is a mixture of phospholipids (mainly dipalmitoylphosphatidylcholine) and specific proteins, secreted by type II alveolar epithelial cells. Its molecules sit at the air–liquid interface and reduce the surface tension far below that of water. As an alveolus becomes smaller, the surfactant molecules are crowded closer together and the surface tension falls further. The fall in $T$ offsets the fall in $r$ in [[#eq-laplace]], so small alveoli do not need a higher pressure than large ones and do not empty into them. Surfactant therefore does three things: it increases compliance and so reduces the work of breathing, it stabilises alveoli of different sizes, and, by lowering the inward pull on the alveolar wall, it helps keep the alveoli dry.
:::

Surfactant production begins in the second half of pregnancy and matures late. Babies born very preterm may not have enough, and develop **neonatal respiratory distress syndrome**: stiff lungs, collapsed alveoli, grunting and rising oxygen needs shortly after birth. Antenatal corticosteroids given to the mother accelerate surfactant production, and surfactant can be given directly into the trachea of the newborn ([[paediatrics/newborn]]). In adults, surfactant is damaged by the inflammation of the acute respiratory distress syndrome, which contributes to the stiff lungs seen there ([[respiratory/respiratory-failure]]).

## Airway resistance and flow {#sec-resistance}

The second force opposing breathing is airway resistance. For flow through a tube, resistance is the driving pressure divided by the flow, $R = \Delta P / \dot V$.

::: theorem Poiseuille's law {#thm-poiseuille}
For smooth (laminar) flow of a fluid through a straight tube of radius $r$ and length $l$, the resistance is

$$
R = \frac{8 \eta l}{\pi r^4}
$$ {#eq-poiseuille}

where $\eta$ is the viscosity of the fluid. Resistance is inversely proportional to the fourth power of the radius: halving the radius increases the resistance sixteen-fold.
:::

The fourth-power dependence explains why small changes in airway calibre matter so much. Bronchoconstriction, mucosal oedema and mucus in asthma each narrow the airway a little, and together they can increase resistance many times over.

Flow is not always laminar. In the trachea and large bronchi, where velocity is high, and at any narrowing, flow becomes turbulent. In turbulent flow the pressure needed rises roughly with the square of the flow, and the resistance depends on the density of the gas rather than its viscosity. This is the basis of using heliox (a helium–oxygen mixture, less dense than air) in some cases of upper-airway obstruction.

It may seem surprising that the smallest airways contribute least to total resistance. Each bronchiole is narrow, but there are so many of them in parallel that their combined cross-sectional area is enormous. Most of the resistance sits in the medium-sized bronchi, roughly the fourth to eighth generations. The consequence is that disease of the small airways can be widespread before it changes the total resistance enough to show on routine tests. The small airways have been called the lung's "quiet zone".

Airway resistance also depends on lung volume. As the lung inflates, the surrounding tissue pulls on the airway walls (radial traction) and widens them. People with asthma or COPD often breathe at a higher lung volume during an attack partly for this reason.

### The limit on expiratory flow {#sec-epp}

If you breathe out as hard as you can from full inspiration, the flow rises quickly to a peak and then falls steadily as the lung empties. Strikingly, once a small volume has been exhaled, pushing harder does not increase the flow at all. Expiratory flow over most of the vital capacity is **effort-independent**.

::: definition Dynamic airway compression and the equal pressure point {#def-epp}
During a forced expiration the pleural pressure becomes positive and squeezes both the alveoli and the intrathoracic airways. The pressure inside the airway falls progressively from the alveolus towards the mouth because of resistance. At some point along the airway, the pressure inside equals the pleural pressure outside: this is the **equal pressure point**. Downstream of it (towards the mouth) the pressure outside the airway exceeds the pressure inside, and the airway is compressed. This is **dynamic airway compression**.
:::

::: proof
Alveolar pressure is the sum of pleural pressure and the lung's elastic recoil pressure: $P_A = P_{pl} + P_{el}$. At the equal pressure point the pressure inside the airway equals $P_{pl}$, so the pressure drop from the alveolus to that point is exactly $P_{el}$. The flow through the upstream segment is therefore driven by the elastic recoil pressure alone, not by the pleural pressure. Extra effort raises $P_{pl}$, but this raises both the alveolar pressure and the compressing pressure on the downstream airway by the same amount, so flow does not increase. Maximum expiratory flow is set by the lung's elastic recoil and by the resistance of the airways upstream of the equal pressure point.
:::

This explains a great deal of clinical physiology. In emphysema, elastic recoil is low, so the driving pressure for maximal flow is low and the floppy airways collapse easily: maximal flow falls and air is trapped. In asthma, upstream resistance is high, and the equal pressure point moves towards the alveoli, where airways are more compressible. In both, expiratory flow is limited, expiration takes longer, and if the next breath starts before expiration is complete, the lung volume ratchets upwards. This is **dynamic hyperinflation**. It puts the diaphragm at a mechanical disadvantage, flattening it and shortening its fibres, and it is a major cause of breathlessness on exertion in COPD.

Pursed-lip breathing, which many people with COPD discover for themselves, adds resistance at the mouth. This raises the pressure inside the airways during expiration, moves the equal pressure point towards the mouth and reduces airway collapse.

### Time constants

How quickly does a lung region fill and empty? A region with resistance $R$ and compliance $C$ fills and empties exponentially, with a **time constant** $\tau = RC$. After one time constant, about 63% of the volume change has occurred; after three, about 95%.

$$
V(t) = V_0 \left(1 - e^{-t/\tau}\right)
$$ {#eq-tau}

In a healthy lung $\tau$ is short, a fraction of a second, so the lung empties fully between breaths even at high breathing rates. Raise the resistance, as in COPD, and $\tau$ lengthens; raise the compliance as well, as in emphysema, and it lengthens further. Units with long time constants cannot empty in the time available, especially when the breathing rate rises with exercise or anxiety. Different regions with different time constants also fill unevenly, which worsens the matching of ventilation to blood flow ([[respiratory/gas-exchange]]).

::: widget plot
f: 100*(1-exp(-x/t))
x: 0, 4
y: 0, 105
sliders: t=0.4:0.1:2:0.1
labels: \text{exhaled (\% of volume)}
vlines: 1
caption: A simplified model of passive emptying of a lung region with time constant $t$ (in seconds, $\tau = RC$). The vertical line marks 1 second. Increase $t$ to mimic higher airway resistance or higher compliance: a smaller fraction of the volume leaves in the first second. This is the idea behind the reduced FEV₁/FVC ratio in obstructive disease, although a forced expiration is active rather than passive and is limited by dynamic compression.
:::

::: example Halving the radius {#ex-resistance}
A 30-year-old woman with asthma has an attack in which the medium bronchi narrow so that their radius falls to half of normal. Assuming laminar flow, by what factor does the resistance of those airways rise, and what happens to flow for the same driving pressure?
::: solution
By [[#eq-poiseuille]], $R \propto 1/r^4$. Halving the radius gives $R_{new}/R_{old} = 1/(0.5)^4 = 16$. For the same driving pressure, flow falls to one-sixteenth. To maintain her ventilation she must generate much larger pressure swings, which she does by recruiting accessory muscles. The fourth-power law is why a modest degree of bronchospasm, oedema and mucus plugging can produce a severe attack, and why a bronchodilator that widens the airway only a little can relieve it substantially.
:::
:::

## The work of breathing {#sec-work}

The respiratory muscles do work against two loads: an **elastic** load, which depends on compliance and tidal volume, and a **resistive** load, which depends on airway resistance and flow rate. At rest the respiratory muscles use only a few per cent of the body's oxygen consumption. In severe lung disease this fraction can rise many times, and the muscles can tire.

The two loads favour different breathing patterns. Elastic work is reduced by small breaths, so people with stiff lungs breathe rapidly and shallowly. Resistive work is reduced by slow flow, so people with obstructed airways tend to breathe more slowly and deeply. Each person chooses, without thinking, roughly the pattern that minimises the total work. That is why the breathing pattern itself is a clinical sign.

::: definition Breathlessness {#def-dyspnoea}
**Breathlessness** (dyspnoea) is the subjective experience of uncomfortable breathing. It is a symptom, not a measurement. It arises when the drive to breathe, generated by the brainstem and sensed by the cortex, is out of proportion to the ventilation the respiratory muscles can achieve. Increased load (stiff lungs, narrowed airways), weak muscles, hyperinflation and an increased drive (hypoxaemia, hypercapnia, acidosis, anxiety) can each produce it.
:::

Breathlessness is graded clinically with scales such as the **Medical Research Council (MRC) dyspnoea scale**, which runs from grade 1 (breathless only with strenuous exercise) to grade 5 (too breathless to leave the house, or breathless when dressing). The scale is used in COPD to decide who should be referred for pulmonary rehabilitation ([[respiratory/asthma-copd]]).

::: warning Feeling breathless is not the same as being hypoxic
Breathlessness and low oxygen often occur together, but they are different things. A person with a pneumothorax or an asthma attack may feel very breathless with a normal oxygen saturation, and a person with chronic hypoxaemia, or with a depressed respiratory drive from opioids, may have a low saturation with little distress. Judge the severity of a respiratory problem from the whole picture: respiratory rate, work of breathing, ability to speak, mental state, saturation and, when needed, blood gases. Do not reassure on the basis of a saturation alone.
:::

::: example Dynamic hyperinflation on the stairs {#ex-copd-mechanics}
A 68-year-old man with severe COPD can walk on the flat but must stop halfway up a flight of stairs. At rest his FRC is 140% of predicted. His chest radiograph shows flattened diaphragms. Explain why stairs are so hard for him.
::: solution
Loss of elastic recoil and narrowing of the small airways limit his expiratory flow. At rest he has just enough time to breathe out to an elevated FRC. On the stairs his breathing rate rises, the time for expiration shortens, and he cannot empty his lungs before the next breath begins. End-expiratory volume rises breath by breath: dynamic hyperinflation. He now breathes near the top of the pressure–volume curve, where compliance is low, so each breath costs more effort. His flattened diaphragm is shortened and works at a mechanical disadvantage. His inspiratory capacity, the room left for a tidal breath, shrinks, so he cannot increase his tidal volume to meet demand. He has to stop. Long-acting bronchodilators reduce hyperinflation and improve exercise tolerance, and pulmonary rehabilitation trains him to pace his breathing ([[respiratory/asthma-copd]]).
:::
:::

## Spirometry: obstruction and restriction {#sec-spirometry}

Spirometry measures how much air a person can breathe out and how fast. The key manoeuvre is a **forced expiration**: a maximal breath in, followed by a blow out as hard and as long as possible.

::: definition Spirometric indices and patterns {#def-spiro}
- **FVC** (forced vital capacity): the total volume exhaled in the forced expiration.
- **FEV₁** (forced expiratory volume in one second): the volume exhaled in the first second.
- **FEV₁/FVC ratio**: normally about 0.75–0.85 in young adults, falling with age.
- **Obstructive pattern**: FEV₁/FVC below the lower limit of normal. FEV₁ is reduced more than FVC because flow is limited.
- **Restrictive pattern**: FVC reduced with a normal or high FEV₁/FVC ratio. Both volumes fall together because the lung or chest wall cannot expand, while flow for a given volume is preserved or even increased. True restriction is confirmed by a reduced total lung capacity.
:::

The two patterns come straight from the mechanics. In obstruction, flow is limited by airway narrowing or loss of recoil, so a smaller fraction of the volume leaves in the first second. In restriction from fibrosis, the stiff lung recoils strongly and holds the airways wide open, so the lung empties quickly and the ratio is normal or even high, but the total volume is small. Restriction can also come from outside the lung: chest wall deformity (kyphoscoliosis), obesity, pleural thickening, or weakness of the respiratory muscles.

The **flow–volume loop** plots flow against volume for the forced expiration and a forced inspiration. In obstruction the expiratory limb is scooped out (concave) because flow falls away quickly after the peak. In restriction the loop is narrow but of normal shape. A fixed obstruction of the trachea or larynx flattens both limbs; a variable obstruction flattens one limb only, depending on whether the lesion is inside or outside the chest.

Interpretation uses reference equations that predict normal values from age, height and sex. Current international recommendations (ATS/ERS, 2022) define abnormality by the **lower limit of normal** (LLN, the 5th percentile, equivalent to a z-score of −1.645) rather than by fixed percentages. In practice, many guidelines, including GOLD and NICE for COPD, still use a fixed post-bronchodilator FEV₁/FVC below 0.70 to define obstruction. The details are in [[respiratory/control-breathing-tests]].

::: example Two sets of spirometry {#ex-spiro}
Two people of the same age, height and sex have spirometry. The predicted FVC for both is 4.0 L and the LLN of the FEV₁/FVC ratio is 0.70.

Person A: FEV₁ 1.6 L, FVC 3.6 L. Person B: FEV₁ 2.2 L, FVC 2.5 L.

Classify each pattern and suggest what further test would help.
::: solution
Person A: FEV₁/FVC = 1.6/3.6 = 0.44, well below 0.70. This is **obstruction**. FVC is 90% of predicted, nearly normal. The next steps are a bronchodilator reversibility test (a large response suggests asthma), and a measure of gas transfer and lung volumes if emphysema is suspected.

Person B: FEV₁/FVC = 2.2/2.5 = 0.88, normal or high. FVC is 2.5/4.0 = 62.5% of predicted, clearly reduced. This is a **restrictive pattern** on spirometry. Spirometry alone cannot confirm restriction, because a reduced FVC can also occur when air is trapped. The next step is to measure total lung capacity (body plethysmography or helium dilution) and gas transfer. A low TLC with a low transfer factor would suggest interstitial lung disease ([[respiratory/interstitial-vascular-disease]]); a low TLC with a normal transfer coefficient would point towards an extrapulmonary cause such as obesity, chest wall disease or muscle weakness.
:::
:::

::: quiz
Why does maximal expiratory flow stop increasing with greater effort once the first part of a forced expiration is over?
- [ ] The expiratory muscles fatigue within the first second
- [x] Greater effort raises pleural pressure, which compresses the airways downstream of the equal pressure point as much as it raises the driving pressure
- [ ] Surfactant runs out at low lung volumes
- [ ] The glottis closes reflexly during forced expiration
::: solution
Extra effort raises pleural pressure. That raises alveolar pressure, but it also raises the pressure squeezing the airways downstream of the equal pressure point by the same amount. The flow through the upstream segment is driven only by the elastic recoil pressure of the lung ([[#def-epp]]). This is why maximal expiratory flow reflects the properties of the lung and airways rather than the patient's strength, and why spirometry is reproducible.
:::
:::

::: history
John Hutchinson, a London physician, built a water spirometer and in 1846 published measurements from about 2,000 people. He named the **vital capacity**, showed that it rose with height, and noted that it fell in disease, including tuberculosis. In 1929 Kurt von Neergaard compared air-filled and saline-filled lungs and concluded that surface tension provides most of the lung's recoil; his work was largely overlooked for twenty-five years. In the 1950s Richard Pattle, studying foam from the lungs, and John Clements, measuring surface tension in lung extracts, showed that the alveolar lining contained a substance that lowered surface tension. In 1959 Mary Ellen Avery and Jere Mead reported that the lungs of babies who died of hyaline membrane disease lacked it. The forced expiratory volume in one second was introduced in 1947 by Robert Tiffeneau and André Pinelli in France, and independently soon after by Edward Gaensler in the United States. The idea of the equal pressure point was set out by Mead and colleagues in 1967.
:::

## Where this leads

Ventilation brings air to the alveoli. What happens next, the movement of oxygen and carbon dioxide across the alveolar wall and their carriage in the blood, is the subject of [[respiratory/gas-exchange]]. The control of breathing and the full range of lung function tests are in [[respiratory/control-breathing-tests]]. The mechanics of this chapter return in every clinical chapter: as airflow limitation in [[respiratory/asthma-copd]], as stiff lungs in [[respiratory/interstitial-vascular-disease]] and as the settings of a ventilator in [[respiratory/respiratory-failure]]. The anatomy of the thorax, pleura and diaphragm is in [[anatomy/thorax]].

::: summary
- Air flows down a pressure gradient created by the respiratory muscles. Quiet expiration is passive, driven by elastic recoil.
- Pleural pressure is normally negative because the lung pulls inwards and the chest wall outwards. FRC is the volume at which these recoils balance.
- Residual volume, FRC and TLC need helium dilution, nitrogen washout or body plethysmography; spirometry cannot measure them.
- Compliance $C = \Delta V/\Delta P$ is low in fibrosis and oedema and high in emphysema. Surfactant lowers surface tension, stabilises small alveoli and increases compliance.
- Airway resistance varies with $1/r^4$ and is concentrated in the medium bronchi. Small-airway disease can be extensive before routine tests change.
- Forced expiratory flow is effort-independent because of dynamic compression beyond the equal pressure point. Low recoil or high upstream resistance limits flow and causes air trapping and dynamic hyperinflation.
- Obstruction: low FEV₁/FVC. Restriction: low FVC with a normal or high ratio, confirmed by a low TLC.
:::

## Exercises

::: exercise Naming the volumes {level=1}
At the end of a quiet breath out, what two volumes remain in the lungs, and which capacity do they make up? Which of them can a simple spirometer measure?
::: solution
The expiratory reserve volume and the residual volume remain; together they make the functional residual capacity. A spirometer can measure the expiratory reserve volume (by asking the person to breathe out fully from FRC) but not the residual volume, which never leaves the lungs. So FRC, RV and TLC need helium dilution, nitrogen washout or body plethysmography.
:::
:::

::: exercise Calculating compliance {level=1 check="200"}
During a quiet breath, lung volume rises by 600 mL while the transpulmonary pressure rises from 5 to 8 cmH₂O. What is the lung compliance in mL/cmH₂O?
::: solution
$C = \Delta V / \Delta P = 600 / (8 - 5) = 200$ mL/cmH₂O, a normal value.
:::
:::

::: exercise Helium dilution {level=1 check="2.4"}
A spirometer contains 8.0 L of gas with 10% helium. After equilibration with a patient's lungs from FRC, the helium concentration is 7.69%. Using $C_1V_1 = C_2(V_1 + \text{FRC})$, calculate FRC in litres, rounded to one decimal place.
::: hint
Rearrange to $\text{FRC} = V_1 (C_1 - C_2)/C_2$.
:::
::: solution
$\text{FRC} = 8.0 \times (10 - 7.69)/7.69 = 8.0 \times 0.3004 = 2.40$ L, which rounds to 2.4 L.
:::
:::

::: exercise A narrower airway {level=2 check="round(1/0.6^4)"}
Mucosal oedema reduces the radius of a bronchus to 60% of normal. Assuming laminar flow, by what factor does its resistance increase? Give the answer to the nearest whole number.
::: solution
$R \propto 1/r^4$, so the factor is $1/0.6^4 = 1/0.1296 = 7.72$, which rounds to 8. A 40% reduction in radius produces almost an eight-fold rise in resistance.
:::
:::

::: exercise Emptying a slow unit {level=2 check="round(100*(1-exp(-2)))"}
A lung region has a time constant of 0.5 s. Using [[#eq-tau]], what percentage of its volume change is complete after 1 second? Give the answer to the nearest whole per cent.
::: solution
After $t = 1$ s, $t/\tau = 2$, so the fraction is $1 - e^{-2} = 1 - 0.135 = 0.865$, or 86%. If disease doubled the time constant to 1 s, only $1 - e^{-1} = 63\%$ would empty in the same time, and at a fast breathing rate the region would trap air.
:::
:::

::: exercise Surfactant and the small alveolus {level=2}
Use the law of Laplace to explain why, without surfactant, a small alveolus connected to a large one would tend to empty into it. How does surfactant prevent this?
::: solution
With equal surface tension, $P = 2T/r$ means the small alveolus (smaller $r$) has the higher internal pressure, so gas flows from it into the larger alveolus, which then grows while the small one collapses. Surfactant lowers surface tension, and does so more when the surface area shrinks, because its molecules are packed more densely. In a small alveolus $T$ falls in step with $r$, so the pressures equalise and both alveoli remain open. Surfactant also increases compliance and helps keep the alveoli dry.
:::
:::

::: exercise Reading a forced expiration {level=2}
A 45-year-old woman has FEV₁ 2.8 L (predicted 2.9 L), FVC 3.4 L (predicted 3.5 L) and FEV₁/FVC 0.82. She complains of noisy breathing on exertion, and her flow–volume loop shows flattening of both the inspiratory and expiratory limbs. What does this suggest?
::: solution
Her FEV₁, FVC and ratio are all normal, so there is no obstruction of the intrathoracic airways and no restriction. Flattening of both limbs of the flow–volume loop indicates a **fixed obstruction of a central airway**, such as tracheal stenosis after intubation, a goitre compressing the trachea or a tumour. Large-airway obstruction may barely change FEV₁ until it is severe, so the loop shape is the clue. She needs imaging of the trachea and referral; a fixed upper-airway lesion can progress to stridor and a dangerous airway.
:::
:::

::: exercise A stiff chest or stiff lungs? {level=3}
Three patients have a low FVC and a normal FEV₁/FVC ratio: (a) a 70-year-old man with bibasal crackles and finger clubbing; (b) a 35-year-old woman with a BMI of 48; (c) a 55-year-old man with motor neurone disease. For each, predict the total lung capacity, the residual volume and the transfer coefficient (KCO), and explain how these tests distinguish them.
::: hint
Think about where the restriction comes from: the lung itself, the chest wall and abdomen, or the muscles. KCO is gas transfer per litre of accessible lung volume.
:::
::: solution
(a) This suggests **pulmonary fibrosis**, a disease of the lung itself. TLC is low, RV is low, and gas transfer is reduced because the alveolar–capillary membrane is thickened and the capillary bed is lost; KCO is usually reduced or normal, not raised.

(b) **Obesity** loads the chest wall and pushes the diaphragm up. FRC and ERV fall most; TLC is normal or modestly reduced; RV is usually preserved. The lung itself is healthy, so KCO is normal or even high, because the same capillary bed is packed into a smaller volume.

(c) **Respiratory muscle weakness** reduces TLC because the person cannot inspire fully and raises RV because they cannot exhale fully, so VC falls from both ends. KCO is normal or raised. Clues include a fall in vital capacity on lying flat (diaphragm weakness) and reduced mouth pressures. Serial vital capacity is used to monitor neuromuscular disease and to time ventilatory support ([[respiratory/respiratory-failure]]).

The lesson is that a "restrictive" spirometry pattern is a description, not a diagnosis. Lung volumes and gas transfer locate the problem.
:::
:::
