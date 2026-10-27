The heart generates pressure; the blood vessels decide where the flow goes. A healthy adult at rest pumps about 5 litres a minute, yet during exercise the muscles alone can receive more than 20 litres a minute, while the kidneys, gut and skin take less. This redistribution is achieved by small changes in the diameter of small arteries, and it happens while arterial pressure stays remarkably steady. Understanding how pressure, flow and resistance relate, and how the body defends its blood pressure, is the basis for understanding hypertension, shock, fainting and oedema.

This chapter covers the physics of flow in vessels, the arterial pressure and how it is measured, local control of blood flow, the exchange of fluid in capillaries, and the reflex and hormonal systems that regulate blood pressure over seconds, hours and days.

## Pressure, flow and resistance

Blood flows from high pressure to low pressure. For a vessel or a whole circulation, the relationship is the haemodynamic version of Ohm's law.

::: theorem Flow, pressure and resistance {#thm-flow}
Flow ($Q$) through a vascular bed equals the pressure difference across it divided by its resistance:
$$
Q = \frac{\Delta P}{R}.
$$ {#eq-ohm}
Applied to the whole systemic circulation, with cardiac output as the flow:
$$
MAP - RAP = CO \times TPR,
$$ {#eq-map}
where $MAP$ is mean arterial pressure, $RAP$ right atrial pressure and $TPR$ total peripheral (systemic vascular) resistance. Because RAP is small, this is often simplified to $MAP \approx CO \times TPR$.

For steady laminar flow of a fluid through a rigid tube, **Poiseuille's law** gives the resistance:
$$
R = \frac{8 \eta L}{\pi r^4},
$$ {#eq-poiseuille}
where $\eta$ is viscosity, $L$ length and $r$ radius.
:::

The fourth power of the radius is the most important term in the equation. Halving the radius of a vessel increases its resistance sixteen-fold. Small changes in the tone of vascular smooth muscle therefore have very large effects on flow. Length barely changes in the body, and viscosity changes only with haematocrit (it rises in polycythaemia and falls in anaemia). Blood is not a simple fluid and vessels are not rigid tubes, so Poiseuille's law is an approximation, but the dependence on radius holds well enough to explain the clinical observations.

::: widget plot
f: 100*x^4
x: 0.4, 1.2
y: 0, 210
vlines: 1
labels: \text{flow (\% of baseline)}
caption: Relative flow through a vessel at constant pressure against its radius as a fraction of baseline, from Poiseuille's law (flow ∝ $r^4$). A 20% reduction in radius (0.8) leaves only about 41% of the flow; a 20% increase (1.2) roughly doubles it. A simplified model: real vessels are elastic and blood is non-Newtonian.
:::

Resistances add in series and combine as reciprocals in parallel. The organs of the systemic circulation are arranged mainly in parallel, so each organ receives arterial blood at roughly the same pressure and controls its own share of the cardiac output by adjusting its own resistance. The **arterioles** are the main site of resistance: the pressure falls most steeply across them, from a mean of about 85 mmHg to about 30 mmHg at the start of the capillaries. They are the throttles of the circulation.

The **veins** behave differently. They are thin-walled and very compliant, so a small rise in pressure holds a large extra volume. About two-thirds of the blood volume lies in the systemic veins and venules at any moment; they are **capacitance vessels**. Sympathetic venoconstriction shifts some of this blood towards the heart, which raises filling and cardiac output.

Flow in normal vessels is **laminar**: layers of blood slide past each other, fastest in the centre, and the flow is silent. When velocity rises, the vessel narrows abruptly or viscosity falls, flow becomes **turbulent**. Turbulence is audible. A **bruit** over a narrowed carotid or renal artery and a heart **murmur** across an abnormal valve are both sounds of turbulence. The tendency to turbulence is summarised by the Reynolds number, which rises with velocity, diameter and density and falls with viscosity; this is why anaemia, with low viscosity and high cardiac output, can produce a soft "flow murmur".

::: example Calculating peripheral resistance {#ex-tpr}
A 56-year-old man in intensive care has a blood pressure of 120/80 mmHg, a right atrial pressure of 5 mmHg and a cardiac output of 4.4 L/min measured by thermodilution. Estimate his mean arterial pressure and total peripheral resistance, and convert the resistance to the units used on many monitors (dyn·s·cm⁻⁵), using a conversion factor of 80.

::: solution
At normal heart rates, mean arterial pressure can be estimated as diastolic pressure plus one-third of the pulse pressure:
$$
MAP \approx 80 + \tfrac{1}{3}(120 - 80) = 80 + 13.3 = 93.3 \text{ mmHg}.
$$

Total peripheral resistance:
$$
TPR = \frac{MAP - RAP}{CO} = \frac{93.3 - 5}{4.4} = 20.1 \text{ mmHg·min/L}.
$$

Multiplying by 80 gives about **1600 dyn·s·cm⁻⁵**, above the usual resting adult range of roughly 800–1200. A high resistance with a modest cardiac output suggests vasoconstriction compensating for reduced flow. The calculation is only as good as the measurements: the one-third rule is an approximation, and the arterial line gives a directly measured mean if one is available.
:::
:::

## Arterial blood pressure

::: definition Systolic, diastolic, pulse and mean pressure {#def-bp}
- **Systolic pressure**: the peak arterial pressure during ejection.
- **Diastolic pressure**: the lowest pressure, reached just before the next ejection, as blood drains from the arteries into the arterioles.
- **Pulse pressure**: systolic minus diastolic. It rises with stroke volume and with stiffness of the large arteries.
- **Mean arterial pressure (MAP)**: the average pressure over the cycle, the pressure that drives flow into the organs. At resting heart rates it is approximately diastolic pressure plus one-third of the pulse pressure. A MAP of about 65 mmHg is a common minimum target in septic shock.
:::

The aorta and large arteries are elastic. During systole they stretch and store part of the stroke volume; during diastole they recoil and keep blood flowing to the tissues. This **Windkessel** function converts the heart's intermittent output into continuous flow. With age, elastin fragments and collagen increases, the arteries stiffen and the pressure wave travels faster. The wave reflected from the periphery returns to the aorta during systole rather than diastole. Systolic and pulse pressure rise while diastolic pressure falls. **Isolated systolic hypertension** of older people is the result ([[cardiovascular/hypertension]]).

Blood pressure in clinical practice is measured non-invasively with a cuff. With the auscultatory method, the cuff is inflated above systolic pressure and slowly deflated; the first tapping **Korotkoff sounds** mark systolic pressure and their disappearance marks diastolic pressure. Most clinics now use validated automated oscillometric devices, which detect pressure oscillations in the cuff and calculate the values. The cuff bladder must fit the arm: a cuff too small for the arm overestimates the pressure. The patient should be seated with the back supported, the arm supported at heart level, after a few minutes' rest. Details of diagnostic measurement are in [[cardiovascular/hypertension]].

## Local control of blood flow

Each organ adjusts its own resistance to match flow to its needs, largely independently of central control.

- **Autoregulation** keeps blood flow roughly constant over a range of perfusion pressures (in the brain and kidney, roughly a mean of 60 to 150 mmHg in healthy people). The **myogenic response** is part of it: stretch of arteriolar smooth muscle by a rise in pressure makes it contract. In chronic hypertension the autoregulatory range shifts upwards, so lowering pressure too fast can cause cerebral or renal ischaemia.
- **Metabolic control.** Active tissue produces adenosine, carbon dioxide, hydrogen ions, potassium and lactate and consumes oxygen; all of these dilate arterioles. This **active hyperaemia** is how exercising muscle and working myocardium receive more flow. After a period of occlusion, flow overshoots (**reactive hyperaemia**).
- **The endothelium** releases **nitric oxide** (in response to shear stress and agents such as acetylcholine and bradykinin) and **prostacyclin**, both vasodilators, and **endothelin**, a vasoconstrictor. Endothelial dysfunction, with reduced nitric oxide, is an early feature of atherosclerosis, diabetes and hypertension. Organic nitrates relieve angina by supplying nitric oxide.

Some circulations have special behaviour. **Coronary** flow occurs mainly in diastole and is controlled almost entirely by metabolism. **Cerebral** flow is highly sensitive to carbon dioxide: hyperventilation lowers $P_aCO_2$ and constricts cerebral vessels. The **pulmonary** circulation is a low-pressure, low-resistance system in which hypoxia causes vasoconstriction (the reverse of systemic vessels), diverting blood away from poorly ventilated alveoli ([[respiratory/gas-exchange]]). **Skin** flow is controlled mainly by sympathetic nerves for temperature regulation. **Skeletal muscle** at rest has high resistance and a large potential to dilate.

## Capillary exchange and oedema

Capillaries are where the circulation does its work: oxygen, nutrients and waste cross the wall by diffusion, and water moves according to the balance of pressures across it.

::: theorem Starling's principle of fluid exchange {#thm-starling-filtration}
The net filtration of fluid across a capillary wall is
$$
J_v = K_f\big[(P_c - P_i) - \sigma(\pi_c - \pi_i)\big],
$$ {#eq-starling}
where $P_c$ and $P_i$ are the hydrostatic pressures in the capillary and the interstitium, $\pi_c$ and $\pi_i$ the corresponding oncotic (colloid osmotic) pressures, $\sigma$ the reflection coefficient for plasma proteins (close to 1 in most capillaries), and $K_f$ the filtration coefficient, which reflects the permeability and surface area of the wall.
:::

::: proof
Hydrostatic pressure in the capillary pushes fluid out; the oncotic pressure of plasma proteins, which cannot easily cross the wall, draws water back. In most tissues the balance favours a small net outward filtration along the whole capillary. The modern view, based on the glycocalyx lining the endothelium, is that the relevant oncotic pressure is the one just beneath this layer, so little or no fluid is reabsorbed at the venous end of most capillaries. The filtered fluid is returned to the circulation by the **lymphatics**, which carry several litres a day back to the venous system. Oedema forms when filtration exceeds lymphatic drainage.
:::

The equation lists the causes of oedema directly:

- **Raised capillary hydrostatic pressure**: heart failure, venous obstruction (deep vein thrombosis), venous insufficiency, fluid overload, and drugs that dilate arterioles more than venules, such as dihydropyridine calcium channel blockers (amlodipine), which raise capillary pressure in the legs.
- **Reduced plasma oncotic pressure**: low albumin from nephrotic syndrome, liver disease or malnutrition.
- **Increased permeability** (a rise in $K_f$ and fall in $\sigma$): inflammation, sepsis, burns, allergic reactions.
- **Lymphatic obstruction**: after lymph node surgery or radiotherapy, malignancy or filariasis. Lymphoedema is non-pitting once fibrosis develops.

Pulmonary oedema is the same process in the lung. When left atrial pressure rises above about 20–25 mmHg, filtration overwhelms lymphatic drainage and fluid enters the interstitium and then the alveoli. The general pathology of oedema is in [[pathology/haemodynamics]].

::: example Swollen ankles {#ex-oedema}
A 72-year-old woman has had bilateral ankle swelling for six weeks. Her JVP is not raised, her chest is clear, urine dipstick shows no protein, and her serum albumin is 41 g/L. Two months ago her blood pressure treatment was changed to amlodipine. Use Starling's principle to work through the likely cause.

::: solution
Take each term of the equation in turn.

- **Oncotic pressure**: albumin is normal and there is no proteinuria, so a low plasma oncotic pressure (nephrotic syndrome, liver disease) is unlikely.
- **Systemic venous pressure**: the JVP is not raised and the chest is clear, so right heart failure or fluid overload is less likely, although an echocardiogram may still be reasonable at her age.
- **Capillary hydrostatic pressure from drugs**: dihydropyridine calcium channel blockers dilate the arterioles more than the venules. More pressure is transmitted into the capillaries of dependent tissues, raising $P_c$ and filtration. The timing fits.
- **Permeability or lymphatic causes**: nothing suggests inflammation or lymphatic disease, and the swelling is bilateral.

**Amlodipine-induced ankle oedema** is the most likely cause. It is dose-related and does not respond well to diuretics, because the problem is capillary pressure, not salt and water retention; options include dose reduction or a change of drug, decided by the prescriber with the patient. If unilateral swelling or calf tenderness were present, deep vein thrombosis would need exclusion first ([[cardiovascular/vascular-disease]]).
:::
:::

## Regulating blood pressure: seconds, hours and days

Arterial pressure is the product of cardiac output and peripheral resistance, and both are controlled. Three systems act on different timescales.

::: definition The baroreceptor reflex {#def-baroreflex}
**Arterial baroreceptors** are stretch receptors in the walls of the **carotid sinus** (afferents in the glossopharyngeal nerve) and the **aortic arch** (afferents in the vagus). They fire more when pressure rises. Their signals reach the **nucleus tractus solitarius** in the medulla, which:

- increases **vagal** (parasympathetic) outflow to the heart, slowing it;
- reduces **sympathetic** outflow to the heart (reducing rate and contractility), to arterioles (reducing resistance) and to veins (increasing venous capacitance).

A fall in pressure has the opposite effects. The reflex acts within seconds and buffers moment-to-moment changes, such as those on standing. It **resets** within days to a sustained new pressure, so it does not set the long-term level of blood pressure.
:::

On standing, about 500–800 mL of blood pools in the legs and abdomen. Venous return, stroke volume and arterial pressure fall; baroreceptor firing falls; the heart rate rises and arterioles and veins constrict, all within a few heartbeats. When this fails, the result is **orthostatic (postural) hypotension**: a fall in systolic pressure of at least 20 mmHg, or in diastolic pressure of at least 10 mmHg, within 3 minutes of standing. Common causes are hypovolaemia, drugs (antihypertensives, diuretics, alpha-blockers, nitrates, antipsychotics, levodopa) and autonomic failure, for example in diabetes or Parkinson's disease. **Vasovagal syncope** is the opposite failure: a paradoxical reflex, often triggered by prolonged standing, pain or emotion, that withdraws sympathetic tone and increases vagal tone, so pressure and heart rate fall together.

Other reflexes join in. **Cardiopulmonary receptors** in the atria and great veins sense filling. **Peripheral chemoreceptors** in the carotid and aortic bodies, stimulated by hypoxia, increase sympathetic activity. The **Cushing reflex** is a response to raised intracranial pressure: cerebral ischaemia triggers intense sympathetic vasoconstriction, and the resulting hypertension triggers a baroreflex bradycardia. Hypertension with bradycardia and irregular breathing in a person with a head injury is a late and dangerous sign.

::: definition The renin–angiotensin–aldosterone system {#def-raas}
**Renin** is released by the juxtaglomerular cells of the kidney's afferent arterioles in response to three signals: reduced renal perfusion pressure, reduced sodium chloride delivery to the **macula densa**, and sympathetic stimulation through β1-adrenoceptors. Renin cleaves angiotensinogen (from the liver) to angiotensin I, which **angiotensin-converting enzyme (ACE)**, mainly in the lung endothelium, converts to **angiotensin II**. Angiotensin II acts on AT1 receptors to:

- constrict arterioles;
- stimulate **aldosterone** release from the adrenal cortex, which increases sodium reabsorption (and potassium excretion) in the collecting duct;
- increase sodium reabsorption in the proximal tubule;
- constrict the efferent arteriole, maintaining glomerular filtration when renal perfusion falls;
- stimulate thirst and release of antidiuretic hormone (vasopressin);
- promote cardiac and vascular remodelling and fibrosis over the long term.

ACE also breaks down bradykinin, which is why ACE inhibitors cause a dry cough and, rarely, angioedema.
:::

Other hormones complete the picture. **Antidiuretic hormone**, released in response to high plasma osmolality and to large falls in blood volume, retains water and, at high concentrations, constricts vessels. The **natriuretic peptides** (atrial and B-type natriuretic peptide), released when the atria and ventricles are stretched, promote sodium excretion and vasodilatation; the B-type peptide is used as a blood test for heart failure ([[cardiovascular/heart-failure]]).

::: theorem Pressure natriuresis and the long-term level of blood pressure {#thm-natriuresis}
Over days and weeks, arterial pressure is set by the kidney's handling of sodium and water. A rise in renal perfusion pressure increases sodium and water excretion (**pressure natriuresis**), reducing extracellular volume and cardiac output until pressure returns to the level at which intake equals output. Sustained hypertension therefore requires a shift of this relationship, so that the kidney needs a higher pressure to excrete the daily sodium load.
:::

::: proof
Suppose pressure rises while salt intake is unchanged. The kidney excretes more sodium than is eaten, the extracellular fluid and plasma volume shrink, venous return and cardiac output fall, and pressure falls back. The process continues until excretion again equals intake, which occurs only at the original pressure. Because the system keeps acting until the error is zero, it has, in engineering terms, "infinite gain". The baroreflex, in contrast, resets and leaves a residual error.

This is why many causes of hypertension act on the kidney: excess aldosterone, renal artery stenosis, chronic kidney disease, and the inherited syndromes of increased tubular sodium reabsorption. It is also why diuretics, which help the kidney excrete sodium at a lower pressure, are effective antihypertensives ([[cardiovascular/hypertension]]).
:::

::: example Fainting on standing {#ex-ortho}
A 68-year-old man with type 2 diabetes for 20 years and peripheral neuropathy feels light-headed every morning on getting up. Lying, his blood pressure is 148/84 mmHg and pulse 76 beats/min; after 3 minutes standing it is 112/70 mmHg and pulse 78 beats/min. Interpret these readings and explain the mechanism.

::: solution
His systolic pressure falls by 36 mmHg and diastolic by 14 mmHg within 3 minutes of standing, which meets the definition of **orthostatic hypotension**.

The key feature is that his heart rate barely changes (76 to 78). In hypovolaemia or drug-induced vasodilatation the baroreflex is intact, so the heart rate rises substantially as the pressure falls. A fall in pressure **without a compensatory tachycardia** points to failure of the reflex arc itself: here, **diabetic autonomic neuropathy**, which damages the efferent sympathetic fibres to the vessels and heart (and often the vagal fibres too).

His supine hypertension illustrates the difficulty of managing autonomic failure: treatment that lowers lying pressure worsens his symptoms on standing. Management, decided with him and his clinicians, starts with reviewing drugs that lower pressure or cause volume depletion, rising slowly, adequate fluid intake, and physical measures such as compression; drugs to raise standing pressure are a specialist option.
:::
:::

::: quiz
A healthy person stands up suddenly. Which change in baroreceptor activity and autonomic outflow follows within seconds?
- [ ] Baroreceptor firing increases; vagal outflow increases
- [x] Baroreceptor firing decreases; sympathetic outflow increases and vagal outflow decreases
- [ ] Baroreceptor firing decreases; renin release is the main response within seconds
- [ ] Baroreceptor firing is unchanged because cerebral autoregulation compensates
::: solution
Standing pools blood in the legs, venous return and stroke volume fall, and arterial pressure dips. Carotid and aortic baroreceptors fire **less**, so the medulla **increases sympathetic** outflow (heart rate, contractility, arteriolar and venous constriction) and **reduces vagal** outflow. Renin release does increase, but it acts over minutes to hours, not seconds. Cerebral autoregulation protects brain flow, but it does not stop the systemic pressure from falling.
:::
:::

## Circulatory shock

**Shock** is a failure of the circulation to deliver enough oxygen to meet the needs of the tissues. Low blood pressure is common but not essential: compensation may hold the pressure while perfusion is already inadequate. Signs of poor perfusion include cool peripheries with slow capillary refill, confusion, reduced urine output and a rising lactate. Shock is classified by mechanism, and each mechanism has a characteristic pattern in the variables of [[#eq-map]].

| Type | Example causes | Cardiac output | Peripheral resistance | Venous pressure |
|---|---|---|---|---|
| Hypovolaemic | haemorrhage, vomiting and diarrhoea, burns | low | high | low |
| Cardiogenic | myocardial infarction, arrhythmia, valve failure | low | high | high |
| Obstructive | tamponade, massive pulmonary embolism, tension pneumothorax | low | high | high |
| Distributive | sepsis, anaphylaxis, spinal cord injury | normal or high (after fluid) | low | low or normal |

Hypovolaemic, cardiogenic and obstructive shock share a low output with compensatory vasoconstriction, so the skin is cold and pale. Distributive shock is a failure of resistance: the vessels dilate, so the skin may be warm, at least early on. In spinal cord injury above the mid-thoracic level, sympathetic outflow is lost, so hypotension is accompanied by bradycardia. Management principles for each type are in [[emergency-critical-care/shock-fluids]].

::: example Two patients with low blood pressure {#ex-shock}
Two patients have a blood pressure of 80/45 mmHg. Patient A, aged 34, is warm and flushed with a bounding pulse of 124 beats/min, a temperature of 39.4 °C and a low JVP; she has a urinary tract infection. Patient B, aged 70, is cold and clammy with a thready pulse of 118 beats/min, a raised JVP and crackles at both lung bases; he has had chest pain for four hours. Classify each type of shock and explain the findings using $MAP = CO \times TPR$.

::: solution
**Patient A: distributive (septic) shock.** Inflammatory mediators and nitric oxide dilate the arterioles, so **TPR is low**. Cardiac output is normal or high (bounding pulse, tachycardia, warm skin), but not high enough to keep the MAP up. Venodilatation and leaky capillaries also reduce venous return, so the JVP is low and she will usually need fluid as well as a vasopressor to restore resistance.

**Patient B: cardiogenic shock**, probably from a large myocardial infarction. **Cardiac output is low** because the left ventricle has failed. The sympathetic response raises **TPR** (cold, clammy skin, thready pulse), but this cannot fully restore pressure and adds to the work of the failing heart. Back-pressure raises the JVP and causes pulmonary oedema (crackles). Giving large volumes of fluid would worsen the oedema; treatment targets the cause (urgent coronary reperfusion) and supports the pump.

The same blood pressure, opposite haemodynamic patterns: this is why the examination of the skin, pulse and venous pressure matters as much as the cuff reading.
:::
:::

::: warning A normal blood pressure does not exclude shock
Compensation can keep arterial pressure normal while flow to organs is inadequate. A young person can lose up to about 30% of blood volume before systolic pressure falls, because the heart rate and vasoconstriction compensate. Older people and those on beta-blockers may not mount a tachycardia at all. Look for the signs of poor perfusion (capillary refill, mental state, urine output, lactate) and do not be reassured by a single normal reading.
:::

::: history
In 1733 Stephen Hales described inserting a brass tube into the artery of a horse and connecting it to a tall glass tube: the blood rose about eight feet and rose and fell with each beat, the first measurement of arterial pressure. Jean Poiseuille, a physician working in Paris in the 1830s and 1840s, studied flow in fine glass tubes to understand blood flow and derived the relationship between flow and the fourth power of the radius. In 1896 Ernest Starling described the balance of hydrostatic and protein osmotic pressures across the capillary wall. Robert Tigerstedt and Per Bergman reported in 1898 that extracts of rabbit kidney raised blood pressure and named the active substance renin. Scipione Riva-Rocci's arm cuff (1896) and Nikolai Korotkoff's description of the sounds heard below it (1905) made routine measurement of blood pressure possible. In the second half of the twentieth century Arthur Guyton and colleagues built quantitative models of circulatory control that placed the kidney at the centre of long-term regulation.
:::

## Where this leads

These principles return throughout the course. Hypertension ([[cardiovascular/hypertension]]) is a disorder of the long-term regulation described here. The low-output and congestive states of heart failure ([[cardiovascular/heart-failure]]) are explained by the same equations, as is the circulatory management of shock in [[emergency-critical-care/shock-fluids]]. The autonomic nervous system is covered in [[physiology/autonomic-nervous-system]], body fluid compartments in [[physiology/homeostasis-body-fluids]] and the renal handling of sodium in [[renal/water-sodium]].

::: summary
- Flow equals pressure difference divided by resistance; for the systemic circulation $MAP - RAP = CO \times TPR$.
- Resistance varies with the inverse fourth power of radius (Poiseuille), so arteriolar tone controls flow and pressure; veins are capacitance vessels holding about two-thirds of the blood.
- Mean arterial pressure is approximately diastolic plus one-third of pulse pressure; arterial stiffening with age raises systolic and pulse pressure.
- Autoregulation, metabolic vasodilatation and endothelial nitric oxide match local flow to need.
- Starling's principle explains oedema: raised capillary pressure, low oncotic pressure, increased permeability or lymphatic obstruction.
- The baroreflex buffers pressure within seconds but resets; the renin–angiotensin–aldosterone system and ADH act over minutes to hours; pressure natriuresis by the kidney sets the long-term level.
- Orthostatic hypotension is a fall of at least 20 mmHg systolic or 10 mmHg diastolic within 3 minutes of standing; absence of a heart-rate rise suggests autonomic failure.
- Shock is inadequate tissue oxygen delivery: hypovolaemic, cardiogenic, obstructive or distributive, each with a typical haemodynamic pattern.
:::

## Exercises

::: exercise Mean arterial pressure {level=1 check="110"}
Estimate the mean arterial pressure (mmHg) for a blood pressure of 150/90 mmHg using diastolic pressure plus one-third of pulse pressure (exact value).
::: solution
Pulse pressure is $150 - 90 = 60$ mmHg. $MAP \approx 90 + 60/3 =$ **110 mmHg**.
:::
:::

::: exercise Halving the radius {level=1 check="6.25"}
By Poiseuille's law, if the radius of an arteriole is halved while the pressure across it stays the same, what percentage of the original flow remains (exact value)?
::: solution
Resistance is proportional to $1/r^4$, so halving the radius multiplies resistance by $2^4 = 16$. Flow becomes $1/16$ of the original, which is **6.25%**.
:::
:::

::: exercise Which limb of the reflex? {level=1}
For each of the following, state whether the baroreflex arc is intact and which part is affected: (a) a person with a haemorrhage, pulse 130 beats/min; (b) a person with autonomic neuropathy whose pressure falls on standing with no change in pulse; (c) a person taking a beta-blocker whose pressure falls on standing with a small rise in pulse.
::: solution
(a) **Intact**: the fall in pressure is sensed and the sympathetic response produces tachycardia and vasoconstriction.

(b) **Efferent limb damaged**: the autonomic nerves to the heart and vessels cannot respond, so there is neither tachycardia nor adequate vasoconstriction.

(c) **Reflex intact but the effector is blocked**: the sympathetic signal is sent but the β1-adrenoceptors of the heart are partly blocked, so the heart-rate response is blunted.
:::
:::

::: exercise Peripheral resistance {level=2 check="16"}
A patient has a mean arterial pressure of 100 mmHg, right atrial pressure of 4 mmHg and cardiac output of 6 L/min. Calculate the total peripheral resistance in mmHg·min/L (exact value).
::: solution
$TPR = (100 - 4)/6 =$ **16 mmHg·min/L**, which corresponds to 1280 dyn·s·cm⁻⁵.
:::
:::

::: exercise A small change in radius {level=2 check="round(100*(1.1^4-1))"}
A vasodilator increases the radius of a vascular bed's arterioles by 10%. By Poiseuille's law, at constant perfusion pressure, by what percentage does flow increase? Round to the nearest whole percent.
::: solution
Flow is proportional to $r^4$, so it is multiplied by $1.1^4 = 1.4641$. Flow increases by **46%**. A modest change in diameter produces a large change in flow, which is why arteriolar tone is such a powerful control.
:::
:::

::: exercise Three ways to swell {level=2}
Explain, using Starling's principle, why each of these causes oedema, and what you would expect to find on examination or testing: (a) nephrotic syndrome; (b) right heart failure; (c) a bee sting.
::: solution
(a) **Nephrotic syndrome**: heavy proteinuria lowers plasma albumin and so plasma oncotic pressure ($\pi_c$), reducing the force that retains fluid in the capillaries; renal sodium retention also contributes. Expect generalised oedema, often periorbital in the morning, heavy proteinuria on dipstick and a low serum albumin; the JVP is not raised unless there is fluid overload.

(b) **Right heart failure**: raised systemic venous pressure is transmitted back to the capillaries, raising $P_c$. Expect a raised JVP, dependent pitting oedema, hepatomegaly and possibly ascites.

(c) **Bee sting**: histamine and other mediators increase capillary permeability (a rise in $K_f$ and a fall in $\sigma$), so protein and fluid leak out; arteriolar dilatation also raises $P_c$. Expect localised redness, warmth and swelling; a generalised reaction with hypotension or airway swelling would be anaphylaxis ([[emergency-critical-care/anaphylaxis]]).
:::
:::

::: exercise ACE inhibitors and the kidney {level=2}
Explain why ACE inhibitors (a) lower blood pressure, (b) can cause a dry cough, and (c) can cause an acute fall in glomerular filtration in a person with bilateral renal artery stenosis.
::: solution
(a) They reduce angiotensin II, so arterioles dilate (lower TPR), aldosterone falls (less sodium retention, lower volume), and the long-term remodelling effects of angiotensin II are reduced.

(b) ACE also breaks down **bradykinin**. Inhibiting it allows bradykinin to accumulate in the airways, causing a dry cough in some people; an angiotensin receptor blocker does not affect bradykinin and is the usual alternative.

(c) When perfusion pressure to the kidney is low because of stenosis, glomerular filtration depends on angiotensin II constricting the **efferent arteriole**, which keeps glomerular capillary pressure up. Removing angiotensin II dilates the efferent arteriole, glomerular pressure falls and filtration drops. This is why creatinine and potassium are checked before and after starting these drugs.
:::
:::

::: exercise The patient whose pressure will not stay down {level=3}
A 49-year-old woman has a blood pressure of 168/104 mmHg despite three drugs. A trainee suggests that her baroreceptors "must be set too high" and that this is the cause. Using the principles of this chapter, explain why the kidney is a more likely site for the long-term problem, and list causes of hypertension that act through renal sodium handling.
::: hint
Think about what happens to the baroreflex when pressure is raised for days, and which control system keeps acting until its error is zero.
:::
::: solution
The baroreflex resets to a sustained pressure within days, so it buffers short-term fluctuations but does not determine the level around which pressure is regulated over weeks. If the baroreflex were the only abnormality, the kidney would correct the pressure through **pressure natriuresis**: any pressure above the level at which sodium excretion equals intake causes net sodium loss and a fall in volume and cardiac output, until the pressure returns. A sustained rise in pressure therefore implies that the kidney's pressure–natriuresis relationship has shifted, so that it needs a higher pressure to excrete the daily sodium load. (The baroreflex can contribute, and baroreflex activation devices have been studied, but they work by altering sympathetic outflow, including to the kidney.)

Causes that act through renal sodium handling include:
- **primary aldosteronism** (excess aldosterone increases collecting duct sodium reabsorption; often with low potassium);
- **renal artery stenosis** (activates renin–angiotensin);
- **chronic kidney disease** (fewer nephrons, impaired excretion);
- **high salt intake** in salt-sensitive people, and drugs that cause sodium retention (NSAIDs, corticosteroids, liquorice);
- rare inherited syndromes such as Liddle syndrome (overactive epithelial sodium channel).

Resistant hypertension in a woman of 49 also needs checks on adherence, measurement technique, white-coat effect, alcohol, sleep apnoea and secondary causes ([[cardiovascular/hypertension]]). Diuretics, including low-dose spironolactone where appropriate, target exactly this mechanism.
:::
:::
