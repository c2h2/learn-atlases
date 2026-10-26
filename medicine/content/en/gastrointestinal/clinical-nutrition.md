Malnutrition is common in hospital and in the community, and it is easy to miss. Around one in three adults admitted to hospital in the UK is at risk of malnutrition on screening, and the proportion is higher in care homes. Malnourished people heal more slowly, get more infections, lose muscle strength, stay longer in hospital and are more likely to die. Yet malnutrition is often unrecorded, because people with a normal or high body weight can still be malnourished and because illness itself reduces appetite.

At the other end of the spectrum, obesity affects about a quarter of adults in England and drives type 2 diabetes, cardiovascular disease, fatty liver disease and many cancers. Both problems are matters of nutrition, and both are increasingly treated with medical and surgical tools.

This chapter covers nutritional assessment and screening, the physiology of starvation, how to estimate requirements, refeeding syndrome, enteral and parenteral nutrition, intestinal failure, and the medical management of obesity. It builds on digestion and absorption in [[gastrointestinal/digestion-absorption]] and the biochemistry of nutrients in [[cell-biochemistry/nutrition]].

## Starvation physiology

The body has three fuel stores. **Glycogen** in the liver provides glucose for about a day. **Fat** is the largest store, enough for weeks in a person of normal weight. **Protein** is not a store at all; every gram used for fuel comes from muscle, enzymes or other working tissue.

::: theorem Starvation shifts the body from glucose to ketones to spare protein {#thm-starvation}
In prolonged fasting, the body progressively reduces its use of glucose and increases its use of fat-derived fuels. By the end of the first week the brain obtains much of its energy from **ketone bodies**, which reduces the need to make glucose from amino acids and so slows the loss of muscle protein.
:::

::: proof
After an overnight fast, insulin falls and glucagon rises. The liver breaks down glycogen and begins **gluconeogenesis**, using lactate, glycerol and amino acids from muscle. The brain and red cells initially depend on glucose, so early fasting costs a substantial amount of protein each day.

As fasting continues, low insulin allows lipolysis to release fatty acids, which most tissues use directly. The liver oxidises fatty acids and converts the acetyl-CoA into **ketone bodies** (acetoacetate and β-hydroxybutyrate). Over several days, blood ketones rise enough for the brain to take them up and use them. As the brain's demand for glucose falls, so does the need for gluconeogenesis from amino acids, and urinary nitrogen loss decreases. Resting energy expenditure also falls, partly through reduced thyroid hormone activation.

Illness changes this adaptation. In sepsis, trauma and major surgery, stress hormones and cytokines drive protein breakdown regardless of energy intake, and ketosis is blunted. A critically ill person can lose muscle rapidly even when fed, which is why nutrition in acute illness reduces losses rather than preventing them completely.
:::

The adaptation also explains why refeeding is risky. During starvation, intracellular stores of phosphate, potassium, magnesium and thiamine are depleted, even when blood levels look normal. Feeding reverses the hormonal state abruptly.

## Assessment and screening

::: definition Malnutrition and nutritional screening {#def-assessment}
**Malnutrition** is a state in which a deficiency of energy, protein and other nutrients causes measurable adverse effects on body composition, function or clinical outcome. NICE guideline CG32 defines it in adults as any of:

- a body mass index (BMI) below 18.5 kg/m²;
- unintentional weight loss of more than 10% within the last 3 to 6 months;
- a BMI below 20 kg/m² with unintentional weight loss of more than 5% within the last 3 to 6 months.

**Screening** identifies people at risk so that they can be assessed and treated. In the UK the commonest tool is the **Malnutrition Universal Screening Tool** (MUST), which scores BMI, recent unintentional weight loss and the effect of acute illness on intake. NICE recommends screening on admission to hospital, at first outpatient appointments, and on registration with a GP practice where there is clinical concern.
:::

| MUST step | Score 0 | Score 1 | Score 2 |
|---|---|---|---|
| BMI (kg/m²) | above 20 | 18.5–20 | below 18.5 |
| Unplanned weight loss in 3–6 months | under 5% | 5–10% | over 10% |
| Acutely ill and no or likely no intake for more than 5 days | | | 2 |

A total of 0 indicates low risk, 1 medium risk and 2 or more high risk. Screening is the start, not the end: a high score triggers a full assessment, usually by a dietitian, and a care plan.

International criteria from the Global Leadership Initiative on Malnutrition (**GLIM**, 2019) diagnose malnutrition when at least one **phenotypic** criterion (weight loss, low BMI or reduced muscle mass) is combined with at least one **aetiological** criterion (reduced intake or absorption, or inflammation from disease). This recognises that people with obesity can also be malnourished, particularly when they lose muscle during illness.

A nutritional assessment covers diet history, weight history, examination for muscle wasting, oedema and signs of specific deficiencies, functional measures such as grip strength, and relevant blood tests. **Serum albumin is not a marker of nutritional status**: it falls in inflammation and with fluid shifts, and may be normal in severe starvation, as in anorexia nervosa.

::: widget plot
f: 100*(a - x)/a
x: 40, 90
y: 0, 30
sliders: a=70:50:100:1
hlines: 5; 10
labels: \text{unintentional weight loss (\%)}
caption: Percentage weight loss plotted against current weight (kg) for a usual weight a (slider). The horizontal lines mark 5% and 10%, the thresholds used by MUST and NICE CG32 over 3 to 6 months. A loss that looks small in kilograms can cross these thresholds in a lighter person.
:::

### Estimating requirements

For most adults, NICE CG32 suggests that nutrition support should provide, in total from all sources:

- **energy**: 25–35 kcal/kg/day;
- **protein**: 0.8–1.5 g/kg/day, which is about 0.13–0.24 g of nitrogen/kg/day;
- **fluid**: 30–35 mL/kg/day, with allowance for extra losses;
- adequate electrolytes, minerals, micronutrients and fibre.

Protein is about 16% nitrogen by weight, so grams of protein divided by 6.25 gives grams of nitrogen. Energy needs are lower in people who are immobile or critically ill in the first days, and higher in recovery, sepsis, burns and with increased activity. Predictive equations such as the Henry or Harris–Benedict equations estimate resting energy expenditure from weight, height, age and sex; indirect calorimetry measures it in specialist settings. In obesity, calculating needs from actual body weight overestimates them, so an adjusted weight is used.

**Nitrogen balance** compares nitrogen intake with nitrogen loss. Most nitrogen is lost as urea in urine, so losses can be estimated from a 24-hour urine collection. A negative balance means the body is breaking down protein; a positive balance means it is building tissue.

### Micronutrients

Specific deficiencies are common in malnutrition and in particular diseases.

| Nutrient | Main features of deficiency | Typical settings |
|---|---|---|
| Thiamine (B1) | Wernicke encephalopathy, neuropathy, heart failure | alcohol dependence, vomiting, refeeding, bariatric surgery |
| Vitamin B12 | megaloblastic anaemia, neuropathy | pernicious anaemia, ileal disease, gastrectomy |
| Folate | megaloblastic anaemia | poor diet, coeliac disease, alcohol |
| Vitamin D | osteomalacia, rickets | little sun exposure, darker skin at high latitude, malabsorption |
| Vitamin K | bleeding, raised INR | malabsorption, antibiotics, no intake |
| Zinc | rash, poor wound healing, diarrhoea | high-output stomas, fistulas, parenteral nutrition |
| Iron | microcytic anaemia | blood loss, coeliac disease, bariatric surgery |

**Wernicke encephalopathy** causes confusion, ataxia and abnormal eye movements, though most people have only one or two of these. It must be treated urgently with parenteral thiamine, and thiamine should be given **before** glucose in at-risk people, because glucose metabolism consumes thiamine and can precipitate it.

## Refeeding syndrome

::: definition Refeeding syndrome {#def-refeeding}
**Refeeding syndrome** is the potentially fatal shift of fluid and electrolytes that can occur when nutrition is restarted after a period of starvation. Its hallmark is **hypophosphataemia**, often with hypokalaemia, hypomagnesaemia, thiamine deficiency and sodium and fluid retention. Under NICE CG32, a person is at **high risk** if they have **one** of:

- BMI below 16 kg/m²;
- unintentional weight loss of more than 15% in the last 3 to 6 months;
- little or no nutritional intake for more than 10 days;
- low potassium, phosphate or magnesium before feeding;

or **two** of:

- BMI below 18.5 kg/m²;
- unintentional weight loss of more than 10% in the last 3 to 6 months;
- little or no nutritional intake for more than 5 days;
- a history of alcohol misuse, or drugs including insulin, chemotherapy, antacids or diuretics.
:::

The mechanism follows from starvation physiology. Feeding, especially with carbohydrate, causes insulin to rise. Insulin drives glucose, phosphate, potassium and magnesium into cells, and phosphate is consumed in making ATP and 2,3-BPG. Plasma levels fall sharply, sometimes within hours to days. Low phosphate causes muscle weakness, including respiratory muscle failure, heart failure, arrhythmias, haemolysis, confusion and seizures. Insulin also causes sodium and water retention, and a heart weakened by starvation can fail under the new volume load. Increased carbohydrate metabolism uses up thiamine and can precipitate Wernicke encephalopathy.

Prevention follows NICE CG32. In people at high risk, nutrition is started at no more than **10 kcal/kg/day**, or 5 kcal/kg/day in extreme cases (for example BMI below 14 or negligible intake for more than 15 days), and increased to full needs over 4 to 7 days. Thiamine and other B vitamins are given before feeding starts and for the first 10 days. Potassium, phosphate and magnesium are supplemented and monitored daily at first, together with fluid balance and cardiac status. Specific doses come from local protocols. Over-cautious underfeeding has its own harm, particularly in anorexia nervosa, where specialist guidance supports faster increases with close monitoring.

::: example A dangerous second meal {#ex-refeeding}
A 72-year-old man who lives alone is admitted after being found on the floor. He has eaten very little for about 2 weeks and drinks heavily. Weight 48 kg, height 1.75 m. Potassium 3.2 mmol/L, phosphate 0.6 mmol/L (low), magnesium 0.6 mmol/L (low). The admitting team starts a full diet and intravenous glucose. On day 3 he is weak, breathless and confused, with ankle oedema and a phosphate of 0.25 mmol/L. Explain what happened and what should have been done.
::: solution
**Step 1: assess his risk on admission.** BMI $= 48/1.75^2 = 15.7$ kg/m², which is below 16. He had little intake for more than 10 days and low potassium, phosphate and magnesium before feeding. Each of these alone makes him **high risk** for refeeding syndrome, and he also has a history of alcohol misuse.

**Step 2: explain the deterioration.** Full feeding and glucose caused a rise in insulin, which drove phosphate, potassium and magnesium into cells. Severe **hypophosphataemia** caused muscle weakness, including the respiratory muscles, and confusion. Sodium and water retention with a starved myocardium caused oedema and possibly heart failure. Glucose without thiamine also risked **Wernicke encephalopathy**, which may contribute to his confusion.

**Step 3: what should have happened.** Thiamine and vitamin B complex before any glucose or feed; correction of electrolytes alongside feeding; feeding started at no more than 10 kcal/kg/day, about 480 kcal/day for him, increasing over 4 to 7 days; daily monitoring of electrolytes, fluid balance and clinical state; and dietitian input. He now needs urgent replacement of phosphate, potassium and magnesium, parenteral thiamine, a temporary reduction in feeding, and cardiac monitoring.
:::
:::

## Enteral nutrition

The order of choice is simple: if the gut works, use it. Oral nutrition is first, with food fortification and oral nutritional supplements. When a person cannot eat enough safely, **enteral tube feeding** is used.

::: definition Enteral nutrition and its routes {#def-enteral}
**Enteral nutrition** is the delivery of nutrition into the gastrointestinal tract, usually through a tube. The main routes are:

- **nasogastric** (NG) tube, for short-term feeding, usually up to about 4 weeks;
- **nasojejunal** (NJ) tube, when the stomach does not empty or there is a high risk of aspiration or pancreatitis;
- **gastrostomy**, placed endoscopically (PEG) or radiologically (RIG), for longer-term feeding, usually when it is likely to be needed for more than about 4 weeks;
- **jejunostomy**, often placed during upper gastrointestinal surgery.
:::

Enteral feeding preserves the gut barrier, is cheaper, and has fewer infectious complications than parenteral nutrition. Its main risks are tube misplacement, aspiration, diarrhoea and metabolic disturbance.

**Placing an NG tube in the lung and then feeding through it is a "Never Event"** in the NHS. Before first use, and before each feed, the tube's position is checked by testing aspirate with pH indicator paper: a pH of **5.5 or below** supports gastric placement. If no aspirate is obtained or the pH is above 5.5, a chest radiograph interpreted by a trained person is required. Older methods such as listening for air ("whoosh test") are unsafe and must not be used.

::: example A stroke with an unsafe swallow {#ex-stroke-feed}
A 78-year-old woman has had a large left middle cerebral artery stroke. A speech and language therapist finds that she aspirates thin fluids and food, and she is unlikely to swallow safely for some time. She is drowsy but stable. How should her nutrition be provided in the first days and in the longer term?
::: solution
**Step 1: early feeding.** People with stroke who cannot swallow safely should start nasogastric feeding early, usually within 24 hours of admission, unless this is not in their interests. Early enteral feeding avoids dehydration and malnutrition. Trials in stroke (the FOOD trials, 2005) found that early tube feeding was reasonable and that early **PEG**, compared with NG feeding, did not improve outcome.

**Step 2: tube safety.** Confirm the NG tube's position before each use by aspirate pH of 5.5 or below, or by chest radiograph. Nurse her sitting up during feeds. If she repeatedly pulls out the tube, a nasal bridle may be considered.

**Step 3: longer term.** If she is still unable to swallow safely after about 4 weeks and continued feeding is in her best interests, a gastrostomy is considered.

**Step 4: decision-making.** She may not have capacity to decide about tube feeding. Decisions should be made in her best interests, taking into account any advance decisions, her known wishes and values, and the views of those close to her, in line with the Mental Capacity Act ([[medical-ethics-law/consent-capacity]]). Nutrition by tube is a medical treatment that can be withheld or withdrawn when it is not in a person's best interests.
:::
:::

Enteral nutrition can also be a **treatment** for disease. In children with active Crohn's disease, **exclusive enteral nutrition**, in which a liquid formula is the only source of nutrition for 6 to 8 weeks, is recommended as first-line therapy to induce remission. It works about as well as corticosteroids for luminal disease, promotes mucosal healing and supports growth.

::: example Formula as first-line treatment {#ex-een}
A 12-year-old boy of Somali heritage has a 6-month history of abdominal pain, diarrhoea and weight loss, and has fallen from the 50th to the 9th centile for height. Ileocolonoscopy confirms ileal and colonic Crohn's disease. His parents are worried about steroids. Explain the place of exclusive enteral nutrition and the practical issues.
::: solution
**Step 1: rationale.** In children with active luminal Crohn's disease, European paediatric guidance recommends **exclusive enteral nutrition** (EEN) as first-line induction therapy. It induces remission in most children, promotes mucosal healing and supports catch-up growth, without the adverse effects of corticosteroids on growth, bones and appearance. His falling height centile makes avoiding steroids especially valuable.

**Step 2: practical issues.** He would drink a complete liquid formula as his only nutrition, usually for 6 to 8 weeks, with water allowed. Some children need a nasogastric tube if they cannot drink enough. Support from a paediatric dietitian and the family is essential, and social situations such as school meals need planning. Cultural and religious factors, such as fasting periods, should be discussed.

**Step 3: afterwards.** Food is reintroduced gradually, and maintenance treatment, often an immunomodulator or biologic, is started to keep him in remission. Growth and puberty are monitored.
:::
:::

## Parenteral nutrition and intestinal failure

::: definition Parenteral nutrition and intestinal failure {#def-parenteral}
**Parenteral nutrition** (PN) is the intravenous delivery of nutrients: amino acids, glucose, lipid, electrolytes, vitamins and trace elements. It is used when the gut cannot be used, or cannot absorb enough, for a sustained period. It is usually given through a central venous catheter, because the solution is hyperosmolar.

**Intestinal failure** is a reduction of gut function below the minimum needed to absorb macronutrients and/or water and electrolytes, so that intravenous supplementation is required. It is classified as **type 1** (acute and short-term, such as after abdominal surgery), **type 2** (prolonged acute, often in metabolically unstable people with complications such as fistulas, needing weeks to months of PN) and **type 3** (chronic, needing long-term home PN).
:::

Indications for PN include intestinal failure, prolonged ileus, high-output fistulas, severe malabsorption and bowel obstruction where enteral feeding is impossible. PN is not used simply because enteral feeding is inconvenient.

Complications fall into three groups:

- **Catheter-related**: **bloodstream infection**, which is the most important and is minimised by strict aseptic technique and a dedicated lumen; thrombosis; and occlusion.
- **Metabolic**: hyperglycaemia, refeeding syndrome, electrolyte disturbance and fluid overload.
- **Long-term**: **intestinal failure–associated liver disease**, metabolic bone disease and micronutrient imbalance.

People with type 3 intestinal failure can live for many years on home PN, managed by specialist centres. Some are suitable for intestinal rehabilitation, GLP-2 analogue therapy such as teduglutide, or intestinal transplantation.

### High-output stomas and short bowel

After extensive small-bowel resection, the remaining length and anatomy determine outcome. People with a **jejunostomy** and a short remaining small bowel lose large volumes of fluid and sodium. Stoma effluent contains about 90–100 mmol/L of sodium. Drinking plain water or other low-sodium fluids makes losses **worse**, because sodium moves from the blood into the lumen to make the contents isotonic, and the water follows it out of the stoma ([[gastrointestinal/digestion-absorption]]).

::: example The bag that keeps filling {#ex-highoutput}
A 58-year-old woman had extensive small-bowel resection for mesenteric ischaemia and now has a jejunostomy. Her stoma produces 3 litres a day. She is thirsty and drinks large volumes of tea and water. Sodium 131 mmol/L, creatinine rising, urine sodium below 10 mmol/L. Explain her problem and outline management principles.
::: solution
**Step 1: mechanism.** The jejunum is leaky to sodium and cannot absorb it against a concentration gradient. When she drinks a hypotonic fluid, sodium moves from her blood into the lumen until the contents are isotonic, and then leaves through the stoma. The more she drinks, the more sodium and water she loses. Her low urine sodium shows the kidneys are conserving sodium as hard as they can: she is **sodium and water depleted** with a pre-renal kidney injury.

**Step 2: management principles.**
- **Restrict hypotonic oral fluids** (water, tea, juice) to about 1 litre a day.
- Drink a **glucose–electrolyte solution** with a sodium of about 90 mmol/L or more, such as St Mark's solution, which allows sodium and water to be absorbed by sodium–glucose co-transport.
- Reduce output with **loperamide** taken before meals, and a **PPI** to reduce gastric secretion; codeine may be added.
- Give intravenous saline initially to correct dehydration and kidney injury.
- Monitor weight, output, urine sodium and magnesium.

**Step 3: longer term.** If output cannot be controlled, she may need parenteral fluids or nutrition at home under a specialist intestinal failure team, and assessment for GLP-2 analogue therapy.
:::
:::

## Obesity

**Obesity** is defined by BMI: 25–29.9 kg/m² is overweight, 30–34.9 is obesity class I, 35–39.9 class II and 40 or more class III. Because people of South Asian, Chinese, other Asian, Middle Eastern, Black African and African-Caribbean family background have a higher risk of type 2 diabetes and cardiovascular disease at lower BMI, NICE uses lower thresholds for them: overweight from 23 kg/m² and obesity from 27.5 kg/m². BMI does not measure fat distribution, so NICE also recommends the **waist-to-height ratio**, with a value of 0.5 or more indicating increased central adiposity.

Obesity results from a long-term imbalance between energy intake and expenditure, shaped by genetics, the food environment, sleep, medications, social and economic factors, and hormonal regulation of appetite ([[public-health/non-communicable-disease]]). It is a chronic, relapsing condition, and stigma towards people with obesity is common in health care and is itself harmful.

Management in the UK follows NICE guideline NG246 (2025):

- **Behavioural interventions** combining diet, physical activity and behaviour change.
- **Medicines**, used alongside these: **GLP-1 receptor agonists** such as semaglutide, and the dual GIP and GLP-1 receptor agonist **tirzepatide**, act on appetite centres and slow gastric emptying. They produce substantial weight loss in trials, but weight tends to return when they are stopped. Their use is governed by NICE technology appraisals with criteria on BMI and comorbidity. Nausea, vomiting and constipation are common; pancreatitis and gallbladder disease are recognised risks.
- **Bariatric surgery**, such as sleeve gastrectomy and Roux-en-Y gastric bypass, for people with severe obesity who meet criteria. Surgery produces the largest and most durable weight loss and often remission of type 2 diabetes.

Bariatric surgery creates lifelong nutritional needs. After gastric bypass, food bypasses the duodenum and much of the stomach, so iron, calcium, vitamin D, B12 and folate absorption all fall. People need lifelong supplements and annual blood tests. Vomiting after surgery can cause **thiamine deficiency** and Wernicke encephalopathy, and "dumping syndrome" can follow rapid delivery of sugary food into the small bowel.

::: warning A normal weight does not exclude malnutrition
A person can have a normal or high BMI and still be malnourished, particularly after rapid weight loss, during critical illness, or with muscle loss hidden by fat or oedema. Use weight change over time, intake, and muscle mass, not BMI alone. Equally, a low albumin does not diagnose malnutrition; it reflects inflammation and fluid status more than nutrition.
:::

::: quiz
A nasogastric tube has been placed in a drowsy man. The aspirate has a pH of 6.5. What should happen next?
- [ ] Start feeding at a low rate and monitor for coughing
- [ ] Inject 20 mL of air and listen over the stomach
- [x] Do not feed; obtain a chest radiograph interpreted by a trained person, or re-test according to local policy
- [ ] Accept placement because pH below 7 is acidic
::: solution
A pH above **5.5** does not confirm gastric placement. Acid suppression can raise gastric pH, but a misplaced tube in the lung or oesophagus can also give a pH above 5.5. Feeding must not start. The next step follows local policy, usually a chest radiograph interpreted by a competent person. The "whoosh" test is unreliable and must never be used. Feeding through a misplaced tube is a Never Event.
:::
:::

::: history
In 1944–45 Ancel Keys led the Minnesota Starvation Experiment, in which 36 conscientious objectors underwent 6 months of semi-starvation followed by controlled refeeding; its detailed record of the physical and psychological effects of starvation is still cited today. Severe complications of refeeding were described in starved prisoners of war after the Second World War. In 1968 Stanley Dudrick and colleagues in Philadelphia showed that beagle puppies, and then an infant with short bowel, could grow normally on intravenous nutrition alone through a central venous catheter, establishing total parenteral nutrition. In the UK, BAPEN launched the Malnutrition Universal Screening Tool in 2003.
:::

::: summary
- Malnutrition is common and under-recognised; screen with MUST and assess fully when the score is 2 or more.
- Starvation shifts metabolism from glucose to ketones to spare protein; illness overrides this and drives muscle loss.
- NICE CG32 suggests 25–35 kcal/kg/day, 0.8–1.5 g protein/kg/day and 30–35 mL fluid/kg/day; nitrogen equals protein divided by 6.25.
- Refeeding syndrome is hypophosphataemia with other electrolyte and fluid shifts; in high-risk people start at 10 kcal/kg/day or less and give thiamine first.
- If the gut works, use it. Check NG tube position by aspirate pH of 5.5 or below or by chest radiograph before every use.
- Parenteral nutrition is for intestinal failure; catheter infection is its main hazard.
- In high-output stomas, restrict hypotonic fluids and give high-sodium oral rehydration solution.
- Obesity is managed with behavioural support, GLP-1-based medicines and bariatric surgery, each with nutritional consequences.
:::

## Where this leads

The physiology of digestion and absorption that nutrition depends on is in [[gastrointestinal/digestion-absorption]]. Nutrition in pancreatitis is discussed in [[gastrointestinal/pancreas-biliary]], and in Crohn's disease in [[gastrointestinal/bowel-disease]]. Eating disorders, including refeeding in anorexia nervosa, are in [[psychiatry/eating-personality-disorders]]. Perioperative nutrition is in [[surgery/perioperative-care]], and the metabolic effects of diabetes and obesity in [[endocrine/diabetes]].

## Exercises

::: exercise Score MUST {level=1}
A 66-year-old woman has a BMI of 19.2 kg/m² and has lost 7% of her weight in the last 4 months. She is not acutely unwell. Calculate her MUST score and state her risk category.
::: solution
BMI 18.5–20: 1 point. Weight loss 5–10%: 1 point. No acute disease effect: 0. Total **2**: **high risk**. She needs a full nutritional assessment, dietitian referral and a care plan.
:::
:::

::: exercise Name the deficiency {level=1}
Name the most likely deficiency: (a) confusion, ataxia and nystagmus in a person with alcohol dependence; (b) bleeding gums and corkscrew hairs in an older man living on tea and toast; (c) a raised INR in a person with prolonged steatorrhoea; (d) bone pain and proximal muscle weakness in a woman who rarely goes outdoors.
::: solution
(a) Thiamine (Wernicke encephalopathy). (b) Vitamin C (scurvy). (c) Vitamin K. (d) Vitamin D (osteomalacia).
:::
:::

::: exercise Check the tube {level=1}
List the steps to confirm the position of a nasogastric tube before the first feed, and explain why listening for injected air is no longer used.
::: solution
Aspirate fluid from the tube and test it with CE-marked pH indicator paper. A pH of 5.5 or below supports gastric placement and feeding can begin. If no aspirate can be obtained or the pH is above 5.5, obtain a chest radiograph interpreted by a competent person, and do not feed until position is confirmed. Listening for air is unreliable because sound can be transmitted from a tube in the lung or oesophagus, and its use has been linked to deaths.
:::
:::

::: exercise Estimate requirements {level=2 check="1500"}
A 60 kg woman recovering from surgery is to receive enteral nutrition. Using 25 kcal/kg/day, what is her daily energy target in kcal? Using 1.0 g/kg/day of protein, how many grams of nitrogen is that?
::: hint
Nitrogen is protein divided by 6.25.
:::
::: solution
Energy $= 25 \times 60 = 1500$ kcal/day. Protein $= 1.0 \times 60 = 60$ g/day, which is $60/6.25 = 9.6$ g of nitrogen per day. These are starting estimates; the dietitian adjusts them to her clinical progress, weight and activity.
:::
:::

::: exercise Start low {level=2 check="450"}
A 45 kg woman with anorexia of illness is at high risk of refeeding syndrome under NICE CG32. What is the maximum starting energy intake in kcal/day, using 10 kcal/kg/day? What must be given before feeding begins?
::: hint
Multiply her weight by 10.
:::
::: solution
$10 \times 45 = 450$ kcal/day. Thiamine and other B vitamins should be given before feeding begins and continued for the first 10 days, with electrolytes checked and replaced as needed. Intake is increased to full requirements over 4 to 7 days with daily monitoring. For eating disorders, specialist guidance may allow faster increases under close supervision.
:::
:::

::: exercise Percentage weight loss {level=2 check="12.9"}
A man's usual weight was 70 kg. Four months later he weighs 61 kg without trying to lose weight. Calculate his percentage weight loss to one decimal place. Does he meet a NICE criterion for malnutrition?
::: hint
Percentage loss is the loss divided by the usual weight, times 100.
:::
::: solution
Loss $= 70 - 61 = 9$ kg. Percentage $= 9/70 \times 100 = 12.86\%$, which is **12.9%** to one decimal place. This is more than 10% unintentional loss within 3 to 6 months, so he meets the NICE CG32 definition of **malnutrition**, whatever his BMI.
:::
:::

::: exercise Calculate nitrogen balance {level=3 check="-4"}
A patient in intensive care receives 75 g of protein a day. A 24-hour urine collection contains 12 g of urea nitrogen. Assume an additional 4 g of nitrogen is lost through stool, skin and non-urea urinary compounds. Calculate the nitrogen balance in g/day and interpret it. What would you consider if the balance stayed negative despite adequate feeding?
::: hint
Nitrogen intake is protein divided by 6.25.
:::
::: solution
Nitrogen intake $= 75/6.25 = 12$ g/day. Nitrogen loss $= 12 + 4 = 16$ g/day. Balance $= 12 - 16 = -4$ g/day. The patient is losing nitrogen, which corresponds to about $4 \times 6.25 = 25$ g of protein, or roughly 125 g of lean tissue, a day.

In critical illness, stress hormones and cytokines drive protein breakdown that feeding cannot fully prevent. A persistently negative balance prompts review of protein provision (increasing towards the upper end of the recommended range if appropriate), control of the underlying illness and infection, early mobilisation and rehabilitation. Overfeeding with energy does not correct catabolism and can cause hyperglycaemia and fatty liver.
:::
:::

::: exercise Plan nutrition after bariatric surgery {level=3}
A 42-year-old woman of Pakistani heritage has had a Roux-en-Y gastric bypass. Explain which nutrients are at risk and why, how they should be monitored, and which symptom in the first months should prompt urgent thiamine.
::: hint
Think about which parts of the gut are bypassed and what is absorbed there.
:::
::: solution
**At risk and why:** **iron** and **calcium**, because the duodenum, where both are mainly absorbed, is bypassed, and acid is reduced; **vitamin D**, with reduced fat absorption and, in people with darker skin, reduced skin synthesis at UK latitudes; **vitamin B12**, because little intrinsic factor and acid reach food; **folate**; **protein**, from reduced intake; and **thiamine**, especially if she vomits.

**Monitoring:** lifelong daily multivitamin and mineral supplements, calcium and vitamin D, and B12 injections or high-dose oral B12 according to local protocol; blood tests for full blood count, ferritin, folate, B12, calcium, vitamin D and parathyroid hormone at intervals after surgery and then at least annually; and dietitian follow-up. Pregnancy planning needs extra attention to supplements.

**Urgent symptom:** **persistent vomiting**, which can rapidly deplete thiamine and lead to Wernicke encephalopathy. Confusion, ataxia or eye movement abnormalities need immediate parenteral thiamine.
:::
:::
