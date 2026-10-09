A healthy person's plasma glucose stays between about 4 and 8 mmol/L through breakfast, a busy morning, a skipped lunch and a night's sleep. Nothing about that is trivial: the brain needs a continuous supply, red cells have no alternative fuel, the liver must export glucose it does not need for itself, and adipose tissue must be persuaded to release fat at the right rate and no faster. The system that achieves it is a set of hormonal switches acting on the pathways of [[cell-biochemistry/energy-metabolism]], with adipose tissue, liver, muscle and brain in conversation.

This lesson is about the states the body moves between — fed, post-absorptive, fasting, starved, injured — and about the two ways the system fails in ordinary practice: the chronically over-fed state of obesity and metabolic syndrome, and the acutely under-fed state of malnutrition and refeeding. It ends with inborn errors of metabolism as a pattern of presentation, because that is how they appear on a ward.

::: theorem Glucose is the priority {#thm-glucose}
The body defends plasma glucose before it defends anything else that metabolism might trade: protein is broken down to make glucose, and ketone bodies are produced to reduce how much glucose is needed, at the cost of nitrogen that cannot be recovered.
:::

::: proof
The requirement is arithmetic. The brain, red cells, renal medulla and white matter use roughly 160 g of glucose a day in an adult, and only the liver (with the kidney contributing during prolonged fasting) can export glucose, because only they couple glycogen breakdown and gluconeogenesis to glucose-6-phosphatase. Glycogen supplies about 100 g, so within a day the deficit must be met from precursors, and the only abundant precursor is muscle protein. Ketogenesis is the adaptation that lowers the bill: ketone bodies cross the blood–brain barrier and supply a large fraction of cerebral ATP after a few days, which is why protein loss slows during simple starvation and why the lean patient survives weeks rather than days. Note the price and the exception: nitrogen lost cannot be replaced without eating, and the defence of glucose fails in the newborn, in the alcoholic with depleted glycogen and in the malnourished child — the three patients in whom a few hours of poor intake become an emergency.
:::

## The four metabolic states

::: definition The metabolic states {#def-states}
**Fed (absorptive)**: 0–4 hours after a meal, insulin high, glucagon low; glucose, amino acids and fatty acids are stored.
**Post-absorptive**: 4–16 hours; insulin falls, glucagon rises, hepatic glycogenolysis maintains glucose.
**Fasting (early starvation)**: 16 hours to about 2–3 days; glycogen is exhausted, gluconeogenesis dominates and ketogenesis begins.
**Prolonged starvation**: days to weeks; the brain runs substantially on ketone bodies, protein loss falls to a new low steady state, and resting metabolism drops.
The **post-traumatic or septic** state is deliberately different: cortisol, catecholamines, glucagon and cytokines drive gluconeogenesis, insulin resistance, lipolysis and muscle proteolysis even when glucose is being given, and the process cannot be switched off by feeding.
:::

::: widget plot
f: 100*exp(-x/16); 100 - 100*exp(-x/16)
x: 0, 96
y: 0, 105
labels: \text{from glycogen}; \text{from gluconeogenesis}
caption: Approximate sources of hepatic glucose output during a fast, as a percentage, against time in hours. Liver glycogen (enough for roughly a day of brain glucose requirement) runs out exponentially as it is consumed and only partly re-made from precursors; gluconeogenesis, first from amino acids and glycerol and then increasingly from lactate and glycerol as ketones spare protein, takes over. The steepness of the crossover is why a child with a glycogen-storage disease decompensates overnight and why a malnourished adult decompensates in hours.
:::

**Insulin** is the anabolic signal: it promotes glucose uptake in muscle and adipose through GLUT4 translocation, glycogen synthesis, fatty-acid and triglyceride synthesis, protein synthesis, and potassium and amino-acid entry into cells; it inhibits hormone-sensitive lipase, hepatic gluconeogenesis and ketogenesis. **Glucagon** is the counter-regulator of the short fast, acting on liver through cyclic AMP to release glucose from glycogen and to make new glucose; it has little effect on muscle, which has few glucagon receptors. **Cortisol** permits gluconeogenesis, mobilises amino acids and causes insulin resistance; **catecholamines** drive glycogenolysis, lipolysis and, importantly, the glucagon response; **growth hormone** is counter-regulatory and lipolytic. Failure of the counter-regulatory responses, especially the loss of the adrenaline response after repeated hypoglycaemia, is why some people with type 1 diabetes develop hypoglycaemia unawareness.

::: example A collapsed patient: is it hypoglycaemia, and whose fault? {#ex-hypo}
A ward sister finds a diabetic patient confused and sweaty; capillary glucose is 2.1 mmol/L, and the symptoms resolve when glucose is given. On another admission, a doctor on call finds a patient who is well, glucose 2.0 mmol/L, and a serum taken at that moment shows insulin 42 mIU/L (raised), C-peptide 3.4 nmol/L (raised), proinsulin fraction high, and a negative sulfonylurea screen. Interpret, and say what you would do next.
::: solution
The first patient satisfies **Whipple's triad** — symptoms and signs of hypoglycaemia, a low measured plasma glucose, and relief on correcting it — which establishes the diagnosis but not the cause, and the commonest cause by far is the patient's own insulin or sulfonylurea. In the second patient the sample was taken *during* hypoglycaemia, which is the only way such a sample is ever interpretable: insulin should be suppressed to undetectable when glucose is 2.0 mmol/L. Inappropriately detectable insulin with a raised C-peptide and proinsulin means endogenous insulin secretion, which leaves insulinoma, sulfonylurea or meglitinide ingestion, and the rarer causes — non-insulinoma pancreatogenous hypoglycaemia after gastric bypass, autoimmune insulin syndrome, or a non-islet tumour secreting insulin-like growth factor 2. A negative secretagogue screen points to an **insulinoma**; factitious insulin injection would give high insulin with *low* C-peptide, and factitious sulfonylurea would give a positive screen. Next: a supervised 72-hour fast with hourly-then-two-hourly glucose, insulin, C-peptide, proinsulin, β-hydroxybutyrate and a secretagogue screen at the end, and localisation imaging only after biochemical confirmation, because incidental pancreatic lesions are common and operating on one is a mistake. Note also the low β-hydroxybutyrate expected in insulin-mediated hypoglycaemia — insulin suppresses ketogenesis — which helps distinguish it from the hypoglycaemia of alcohol, starvation or endocrine deficiency, where ketones are high.
:::
:::

## Adipose tissue is an organ

Fat secretes. **Leptin**, made in proportion to triglyceride stores, acts on hypothalamic receptors to reduce intake and increase expenditure; congenital leptin deficiency and leptin-receptor deficiency cause severe early-onset obesity in humans, and recombinant leptin is licensed for the rare congenital forms and for the metabolic complications of lipodystrophy. Most obese people have high leptin and appear leptin-resistant, so leptin itself is not a general anti-obesity drug. **Adiponectin**, by contrast, falls with visceral fat and improves insulin sensitivity and fatty-acid oxidation in muscle. Adipose also releases free fatty acids (whose chronic elevation causes lipotoxicity in β-cells and muscle), resistin, plasminogen activator inhibitor-1, and cytokines including TNF-α and IL-6 from the macrophages that populate expanded visceral depots, and it expresses 11β-hydroxysteroid dehydrogenase type 1, generating active cortisol locally.

This is why **waist circumference** and the distribution of fat predict risk better than body mass index alone, and why **metabolic syndrome** is a coherent entity rather than a list: central obesity, raised triglycerides, low HDL, raised blood pressure and raised fasting glucose share two upstream mechanisms — insulin resistance and increased free fatty acid flux, with visceral fat as the visible marker.

::: definition Metabolic syndrome {#def-mets}
There is no single international definition, but all require clustering of **abdominal obesity, insulin resistance (or fasting hyperglycaemia), dyslipidaemia (high triglycerides, low HDL) and hypertension**, with raised inflammatory and prothrombotic markers. Clinically, the diagnosis matters less than the fact that it identifies a person whose cardiovascular risk is far greater than any single component suggests, and whose treatment is weight, activity, blood pressure and statin therapy, plus attention to the diabetes that is likely to follow.
:::

::: warning "Liver enzymes are normal" does not exclude fatty liver, and "it is only fatty liver" does not exclude cirrhosis
Metabolic dysfunction-associated steatotic liver disease (the current name for what was called non-alcoholic fatty liver disease) is diagnosed on imaging or histology in someone who drinks little alcohol and has another metabolic risk factor; alanine aminotransferase is often normal, and a normal value does not exclude fibrosis. A minority progress through steatohepatitis to cirrhosis and to hepatocellular carcinoma, and it is now one of the commonest reasons for transplant assessment in high-income countries. The useful tests are a fibrosis score such as FIB-4 using age, transaminases and platelet count, with elastography when the score is raised; the effective treatments are weight loss (7–10% of body weight improves steatohepatitis), exercise independently of weight, a GLP-1 receptor agonist or tirzepatide where indicated, and, more recently, a thyroid-receptor-β agonist for biopsy-proven steatohepatitis with fibrosis.
:::

## Starvation, cachexia, and the danger of feeding

Uncomplicated starvation is an orderly adaptation. What changes it is inflammation. **Cachexia** — loss of muscle with or without fat, driven by TNF-α, IL-6, IL-1 and interferon-γ together with anabolic resistance, reduced intake and tumour or organ factors — does not respond to feeding alone, which is why "high-calorie diet" orders fail in advanced cancer, cardiac or renal disease, and why the assessment must include the underlying disease, appetite, and physical and psychological function.

**Refeeding syndrome** is the opposite danger, and it is entirely biochemical. A starved or alcohol-dependent patient who has depleted phosphate, potassium and magnesium, with total body deficit but normal plasma levels, is given carbohydrate. Insulin returns, and with it the intracellular shift of phosphate (for ATP and 2,3-BPG synthesis), potassium and magnesium, plus thiamine consumption by carbohydrate metabolism. Within 2–4 days the patient becomes hypophosphataemic, weak, confused, arrhythmogenic, unable to wean from ventilation, haemolytic, and at risk of seizures and death; oedema follows sodium retention. Prevention is the treatment: identify risk (no intake for more than 10 days, BMI under 16, unintentional weight loss above 15% in 3–6 months, or low baseline phosphate, potassium or magnesium), check and replace electrolytes and give **thiamine before or with** the first feeds, start feeding at a fraction of requirement and increase over several days, monitor daily for the first week, and expect the patient to need more potassium and magnesium than seems reasonable.

::: example Both dangers in one admission {#ex-refeed}
A 34-year-old with a body mass index of 13 is admitted after months of restrictive eating. Baseline phosphate 1.1 mmol/L, potassium 3.3 mmol/L, magnesium 0.7 mmol/L. She is started on 2000 kcal/day because she is distressed and the ward wants to "catch up". On day 3 she is tachycardic, oedematous, too weak to lift her arms and has a phosphate of 0.3 mmol/L. What happened, and what should have happened?
::: solution
This is refeeding syndrome. The insulin surge drove phosphate into cells for phosphorylation reactions and 2,3-BPG synthesis, and the resulting hypophosphataemia impaired diaphragmatic and limb-girdle strength, cardiac contractility and oxygen delivery; sodium and water retention produced oedema, and the low potassium and magnesium (both depleted by refeeding into cells) contributed to the tachycardia. The plan should have been: high-risk classification stated in the notes, thiamine and a B complex before feeding, replacement of potassium, phosphate and magnesium, and an initial prescription of roughly 10 kcal/kg/day (about 300–400 kcal for this patient), increased gradually over 5–10 days while electrolytes are monitored daily and cardiac monitoring used if severe. The distress is real and the psychological treatment matters, but calories given too fast are not the same as calories given enough — and the refeeding plan is what makes it safe to continue.
:::
:::

::: example Confused, cold and drunk {#ex-alcohol}
A 45-year-old with alcohol dependence is brought in at 6 a.m. after a two-day binge with no food. Glucose 2.2 mmol/L, temperature 35.6 °C, pH 7.30, lactate 4.8 mmol/L, ketones absent on the urine strip, ammonia mildly raised, AST greater than ALT, phosphate 0.6 mmol/L. Explain the hypoglycaemia and the ketone result, and list what you would give in the first hour.
::: solution
Two of ethanol's metabolisms do the damage. Alcohol dehydrogenase and aldehyde dehydrogenase both reduce NAD⁺ to NADH, and a high mitochondrial NADH/NAD ratio reverses the reactions that need NAD⁺: oxaloacetate is converted to malate and cannot be used for gluconeogenesis, and pyruvate is reduced to lactate, which explains the lactate of 4.8 without shock. With glycogen depleted by days of poor intake, hepatic glucose output falls and hypoglycaemia follows; the same redox state and the lack of substrate for β-oxidation leave ketone production low, so the absence of ketones is part of the picture, not evidence against starvation. Then the pitfalls accumulate: hypothermia, hypophosphataemia and hypomagnesaemia, metabolic acidosis from lactate and from alcoholic ketoacidosis that may emerge as the alcohol is cleared, and thiamine deficiency whose treatment must not be delayed by a glucose infusion. In the first hour: thiamine (with magnesium, which is a cofactor for thiamine-dependent enzymes and whose absence makes thiamine ineffective) before or with glucose, dextrose intravenously to restore normoglycaemia, potassium, phosphate and magnesium replacement, active rewarming, blood glucose and electrolyte monitoring, and a search for the other reasons this patient is confused — intracranial bleed, sepsis, withdrawal, hepatic encephalopathy and hypoglycaemia itself, which can leave a deficit of consciousness after correction.
:::
:::

::: quiz
In a patient with prolonged vomiting and a plasma glucose of 3.1 mmol/L, ketones of 4 mmol/L and no diabetes, insulin and C-peptide should be:
- [ ] Elevated, because ketones stimulate insulin secretion.
- [x] Suppressed to near-undetectable, because hypoglycaemia and starvation should switch off β-cell secretion.
- [ ] Normal, since insulin is always secreted at a basal rate.
- [ ] Unmeasurable, because insulin is degraded by vomiting.
::: solution
Appropriate hypoglycaemia is defined by suppressed insulin, C-peptide and proinsulin with raised counter-regulatory hormones, low β-hydroxybutyrate rising with fasting and (if relevant) a normal cortisol and growth-hormone response. Detectable insulin during hypoglycaemia is pathological — insulin-mediated — and the accompanying failure to generate ketones is a strong clue. Basal "normal" insulin is not normal at a glucose of 3.1 mmol/L, and it is precisely the failure to suppress that makes these assays interpretable only when drawn during a documented low.
:::
:::

## Inborn errors of metabolism: a pattern, not a list

Inherited enzyme defects present in a recognisable set of ways, and knowing the pattern is more useful than memorising the diseases.

- **A previously well newborn who deteriorates after a protein or fasting load**: encephalopathy with vomiting, hyperventilation and coma from hyperammonaemia (urea cycle defect, organic acidaemia), or hypoketotic hypoglycaemia with liver dysfunction (fatty-acid oxidation defect), or lactic acidosis with a high anion or osmolar gap (organic acidaemia, mitochondrial disease). Illness or fasting, not the diet alone, is usually the trigger.
- **Progressive disease in an organ that depends on the pathway**: brain (developmental regression, seizures, basal-ganglia change), liver (hepatomegaly, fibrosis, failure), muscle (hypotonia, cardiomyopathy, rhabdomyolysis), kidney (tubular syndromes, stones), bone and connective tissue (the mucopolysaccharidoses).
- **Storage with coarse features, clouded corneas, dysostosis and a cherry-red spot**: the lysosomal storage diseases; check for vacuolated lymphocytes and a dark macula.
- **Intermittent attacks between well-intervals with a normal examination**: porphyria (see [[cell-biochemistry/lipid-amino-acid-metabolism]]), urea cycle defects with late-onset forms, fatty-acid oxidation defects, homocystinuria.
- **Screen-detected, asymptomatic**: most amino acid and organic acidaemias, and the reason newborn screening is a public-health programme with its own ethics.

The general principles of acute management are consistent: stop the toxic input (protein for a day or two, with glucose and lipid to prevent catabolism), provide enough energy to switch off catabolism — which is the single most effective intervention — enhance alternative excretion (nitrogen scavengers such as benzoate and phenylbutyrate, carnitine, and cofactor vitamins — riboflavin, biotin, hydroxocobalamin, thiamine — where a responsive defect is possible), remove the toxin (dialysis for ammonia and for small toxic molecules), and transplant the organ when the defect is confined to it and the damage is otherwise progressive (liver for many hepatic metabolic defects).

::: example A baby with sepsis who is not septic {#ex-organic}
A 10-day-old, born at term and well for four days, is brought in with poor feeding, tachypnoea and lethargy. C-reactive protein is mildly raised, blood culture is negative, glucose 2.8 mmol/L, pH 7.05, base excess −16, anion gap 26, lactate 4 mmol/L, ketones 6 mmol/L, ammonia 320 µmol/L, and the blood gas shows a compensatory respiratory alkalosis superimposed on the acidosis. What is the biochemical pattern and the first three things you would do?
::: solution
A high anion gap metabolic acidosis with **marked ketosis**, hyperammonaemia and hypoglycaemia in a well-then-ill neonate is an **organic acidaemia** — methylmalonic, propionic, isovaleric or a related defect — rather than a urea cycle defect, in which acidosis and ketosis are absent and a respiratory alkalosis predominates, nor a fatty-acid oxidation defect, in which ketones are inappropriately low. Sepsis must still be treated, because infection both mimics and precipitates these crises. The immediate management is to stop protein entirely for 24–48 hours while giving high-calorie intravenous glucose with insulin if needed and lipid, to reverse catabolism (the priority is a negative nitrogen balance at all costs), to correct acidosis carefully with bicarbonate only after volume and glucose, to give carnitine and cofactor vitamins (riboflavin, biotin, hydroxocobalamin, thiamine) while waiting for urine organic acids, acylcarnitine profile and plasma amino acids, and to arrange haemofiltration early if ammonia exceeds about 500 µmol/L or consciousness is depressed.
:::
:::

::: history
The physiology of the fasting state was established largely by two couples and one war. Carl and Gerty Cori worked out glycogen breakdown and the lactate–glucose cycle that carries muscle lactate to hepatic glucose, sharing the 1947 Nobel Prize with Bernardo Houssay; Philip Felig described the glucose–alanine cycle in 1969, which is why muscle nitrogen, not muscle carbon, is the real constraint on starvation. The hormone work followed the extracts: insulin was purified in Toronto in 1921–22, glucagon identified as the "hyperglycaemic factor" by Kimball and Murlin in 1923 and purified by Archibald Sutherland in 1953, and Adolf Butenandt and others began to describe the hormonal control of the liver in between. George Cahill's studies of prolonged starvation in New Guinea volunteers in 1966–70 defined the metabolic adaptation and the fall in nitrogen loss, and the metabolic consequences of severe injury and sepsis were characterised by Sir David Cuthbertson's "ebb and flow" of 1942, still the best single description of the catabolic response. Leptin was identified in 1994 by Jeffrey Friedman's group using the ob/ob and db mouse mutants bred at Jackson Laboratory, turning a curiosity about single-gene obesity into the modern understanding of adipose tissue as an endocrine organ.
:::

## Where this leads

The pathways themselves are in [[cell-biochemistry/energy-metabolism]] and [[cell-biochemistry/lipid-amino-acid-metabolism]]; the vitamins whose absence makes malnutrition dangerous are in [[cell-biochemistry/nutrition]]; the hormonal detail of insulin and glucagon is in [[endocrine/hypothalamus-pituitary]] and [[endocrine/diabetes]]; clinical assessment of the malnourished patient and feeding policy are in [[gastrointestinal/clinical-nutrition]].

::: summary
- The body moves between fed, post-absorptive, fasting and starved states under the insulin-to-glucagon ratio, with cortisol, catecholamines and growth hormone as counter-regulators; glycogen buys about a day, gluconeogenesis and ketogenesis buy the rest.
- Insulin suppresses ketogenesis; therefore insulin-mediated hypoglycaemia is ketone-poor, and starvation or alcohol-related hypoglycaemia is ketone-rich.
- Interpret insulin, C-peptide and proinsulin only on a sample drawn during documented hypoglycaemia, and always with β-hydroxybutyrate and a secretagogue screen.
- Adipose tissue is an endocrine organ; leptin signals store size, adiponectin sensitivity, and visceral fat drives the insulin-resistance and prothrombotic state of metabolic syndrome.
- Starvation is adaptive, cachexia is inflammatory and not reversible by calories alone, and refeeding is dangerous: give thiamine, replace electrolytes, start low, go slow.
- Inborn errors present as a pattern — a well newborn who deteriorates with a protein or fasting load, an organ that cannot meet an energy or disposal demand, or attacks between wellness — and the acute treatment is to stop catabolism.
:::

## Exercises

::: exercise Order the fuels {level=1}
For each of the following tissues, name the preferred fuel in the fed state and in prolonged starvation: brain, red cell, skeletal muscle at rest, heart muscle, renal cortex, adipocyte.
::: solution
Brain: glucose when fed; after adaptation, glucose plus ketone bodies (never fatty acids, which do not cross the blood–brain barrier in useful amount). Red cell: glucose always, as it has no mitochondria. Skeletal muscle at rest: fatty acids when fed and in starvation, with ketones added in starvation; it uses glucose only when insulin and exercise bring GLUT4 to the membrane. Heart: fatty acids, lactate, ketone bodies and some glucose — the heart preferentially takes up lactate, which is why ischaemic and exercising muscle's lactate is not wasted. Renal cortex: fatty acids, lactate and glutamine, and it contributes gluconeogenesis. Adipocyte: glucose when fed, for triglyceride backbone and NADPH; it exports fatty acids in starvation rather than burning them.
:::
:::

::: exercise Hormone and effect {level=1}
Which single hormone deficiency would produce, simultaneously, fasting hypoglycaemia with ketones, hyperkalaemia with hyponatraemia, and hypotension? Name the diagnostic test.
::: solution
Cortisol and aldosterone deficiency — primary adrenal insufficiency. Lack of cortisol removes a counter-regulatory hormone so hypoglycaemia is ketotic (because insulin is appropriately low), and lack of aldosterone causes renal sodium loss, hyperkalaemia and postural hypotension; the acidosis of type 4 renal tubular acidosis completes the picture. The test is a morning cortisol with ACTH, and a short ACTH (Synacthen) stimulation test, plus renin and aldosterone; autoimmune adrenalitis and tuberculosis are the classic causes, and steroid replacement must never be interrupted during illness.
:::
:::

::: exercise Why ketones are low {level=1}
Give three causes of hypoketotic hypoglycaemia and the mechanism they share.
::: solution
Fatty-acid oxidation defects (medium-chain acyl-CoA dehydrogenase deficiency, carnitine deficiency or CPT defects), hyperinsulinism, and severe liver failure. The shared mechanism is that ketone bodies are made from fatty acid-derived acetyl-CoA in a liver whose ATP and redox state permit export: if fat cannot be oxidised (first group), if insulin suppresses lipolysis and ketogenesis (second group), or if the hepatocyte cannot perform the pathway (third group), glucose falls and ketones stay inappropriately low — the reason "hypoketotic hypoglycaemia" is a diagnostic heading of its own.
:::
:::

::: exercise Read the counter-regulation {level=2}
A person with type 1 diabetes of 18 years' duration no longer notices his hypos until he becomes confused; his hypoglycaemia threshold measured in a clamp has fallen to a lower glucose than before. Explain in physiological terms and say what changes in management follow.
::: solution
Recurrent hypoglycaemia blunts the counter-regulatory response: the adrenaline release that normally produces palpitations, sweating and hunger falls in amplitude, and glucagon secretion in response to hypoglycaemia is already lost within a few years of type 1 diabetes. The brain adapts to operate at lower glucose ("hypoglycaemia-associated autonomic failure" with behavioural adaptation of the threshold), so symptoms appear only at a level at which cognition is already impaired. Management is not tighter control but the reverse: relax targets for a period of some weeks to months, with continuous glucose monitoring and alarms, education with a partner, and review of driving rules, so that symptom awareness can partially recover. Technology that interrupts insulin delivery helps; so does choosing a regimen with less nocturnal hypoglycaemia.
:::
:::

::: exercise Metabolic syndrome at the bedside {level=2}
A 52-year-old man has waist 108 cm, triglycerides 3.1 mmol/L, HDL 0.8 mmol/L, blood pressure 146/90, fasting glucose 6.6 mmol/L, BMI 32, and a fasting insulin of 22 mIU/L. What is the unifying mechanism, and what four interventions reduce events rather than numbers?
::: solution
Insulin resistance with increased adipose lipolysis and hepatic free fatty acid delivery: the liver exports triglyceride-rich VLDL, cholesterol ester transfer protein exchanges triglyceride into HDL and LDL, and hepatic lipase then removes the triglyceride-rich HDL, giving the characteristic high triglyceride, low HDL pattern; hyperinsulinaemia raises blood pressure through sodium retention and sympathetic activity. Interventions with outcome evidence: weight reduction through diet and physical activity with maintenance support, structured lifestyle change with follow-up; statin therapy for absolute cardiovascular risk; antihypertensive treatment to target; and a GLP-1 receptor agonist where obesity or diabetes warrants it, both for the demonstrated cardiovascular benefit and for weight. Metformin may delay diabetes; a fibrate mainly lowers triglycerides without consistent event reduction. The reason to write this out is that all five components move together with the upstream mechanism, so treating the mechanism is more efficient than treating four numbers.
:::
:::

::: exercise Starvation versus diabetes {level=2}
Both prolonged starvation and uncontrolled type 1 diabetes produce ketonaemia, but only one produces pH 7.05. Explain the difference in three mechanisms.
::: solution
Rate of production: starvation limits lipolysis because insulin is low but not absent, and the reduced insulin-to-glucagon ratio still restrains hormone-sensitive lipase; absolute insulin deficiency removes the brake, so flux through HMG-CoA synthase is far greater. Buffering and loss: ketosis of starvation is mild (usually under 5–7 mmol/L) and bicarbonate regeneration keeps pace, whereas in diabetic ketoacidosis production overwhelms buffering, ketone anions spill into urine, and volume depletion with reduced glomerular filtration then prevents renal excretion of both hydrogen and ketone bodies. Substrate: hyperglycaemia causes osmotic diuresis, so water, sodium, potassium and ketone anions are lost together, producing the mixed picture of acidosis with a deceptively normal or low potassium despite total body depletion; starvation does not. Hence starvation ketosis rarely lowers pH below 7.3, and ketoacidosis in alcohol or pregnancy can be severe with a normal glucose — which is why the glucose value alone does not define the diagnosis.
:::
:::

::: exercise Anorexia with a normal BMI {level=3}
A 22-year-old with atypical anorexia nervosa has BMI 23 after losing 14 kg, pulse 48, potassium 3.2 mmol/L, phosphate 1.0 mmol/L and normal liver and renal biochemistry. She is being refed at 1200 kcal/day with a daily electrolyte check. Two days later she is dizzy with a pulse of 54 and QTc 480 ms. Critique the plan.
::: solution
The risk classification is what went wrong first: rapid weight loss of more than 15% of body weight in six months, current low intake for more than ten days, potassium 3.2 and phosphate 1.0 place her in a high-risk category whatever the BMI, and atypical anorexia carries the same refeeding risk as underweight disease. The electrolytes and QTc show evolving hypophosphataemia with hypokalaemia and probably hypomagnesaemia; bradycardia with a prolonged QTc and dizziness is a reason for cardiac monitoring and to slow or at least to cover the increase with replacement. The calorie prescription was too high for a high-risk patient: guidelines begin nearer 10 kcal/kg/day and build, with thiamine and a B-containing multivitamin before feeding and daily phosphate, potassium and magnesium for at least the first week. She also needs the admission criteria for physical risk applied — bradycardia, hypokalaemia, prolonged QTc and rapid weight loss are among them — and psychological treatment is only sustainable once the metabolic emergency is managed safely.
:::
:::

::: exercise Which test, which disease {level=3}
A 6-month-old has hepatomegaly, growth failure, lactic acidosis and hyperuricaemia after weaning. Name three differential diagnoses and the single measurement that most efficiently separates them.
::: solution
The pattern suggests glycogen storage disease type I (glucose-6-phosphatase), hereditary fructose intolerance (aldolase B, temporally related to weaning onto fruit and sucrose), and a mitochondrial respiratory-chain disorder, with fructose-1,6-bisphosphatase deficiency and tyrosinaemia type I also worth excluding. The most efficient single measurement is the **lactate-to-pyruvate ratio** on a fresh deproteinised sample, together with the glucose response and metabolite pattern: a high ratio with ketosis after a fast points to a respiratory chain defect; a low or normal ratio with hypoglycaemia, hyperuricaemia and hyperlipidaemia that improves with glucose points to a defect of glucose output (type I or the fructose-1,6-bisphosphatase deficiency); and hypoglycaemia with fructose intolerance shows a fall in glucose and phosphate after an oral fructose load, though a molecular test is safer than a challenge. Liver biopsy with enzyme assay is now reserved for unresolved cases, because most of these are diagnosable from blood and urine metabolites and DNA.
:::
:::
