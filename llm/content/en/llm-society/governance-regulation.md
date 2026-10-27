Every earlier chapter of this course ended with questions that technical work alone cannot settle: which fairness criterion a hiring tool must meet, whether training on copyrighted books needs a licence, whether a model's weights may be published, how much energy disclosure to require. Societies answer such questions through **governance** — laws, regulations, standards, contracts, institutional practices and international agreements. Since 2023 this has become one of the fastest-moving areas of AI: the European Union adopted a comprehensive AI law, the United States issued and then revoked a broad executive order, China built a regime of rules for algorithms and generative services, governments created institutes to evaluate advanced models, and a series of international summits produced declarations and a scientific report.

This chapter describes these developments and the ideas behind them. It begins with the design choices any AI governance regime faces — what to regulate (uses, models or developers), how to classify risk, and how to measure it — then describes the EU AI Act and its phased application dates, US federal and state actions (with their changes over time), China's measures, the UK and the network of AI safety and security institutes, the international summits from Bletchley Park (2023) to Paris (2025), and the main standards (the NIST AI Risk Management Framework and ISO/IEC 42001). Quantitative parts concern compute thresholds — how they are computed, which models cross them, and why a fixed threshold drifts as algorithms improve.

**This area moves fast.** Laws are amended, guidance is issued, deadlines are postponed and court cases decided between the writing and the reading of this chapter. Dates are given for every statement; anything described "as of 2026" should be checked against the official sources (the Official Journal of the EU, the US Federal Register, the Cyberspace Administration of China) before it is relied on. This is not legal advice.

## Design choices in AI governance {#sec-design}

### What to regulate

Three objects of regulation are distinguished.

- **Uses** (or applications): rules attach to what a system is used for — credit scoring, recruitment, medical devices, political advertising. Existing law already does much of this: anti-discrimination, consumer-protection, product-safety and data-protection law apply to AI systems as to other means.
- **Models**: rules attach to general-purpose models themselves — documentation, evaluation, security — because they are built once and used in many applications, and because some risks (misuse of dangerous capabilities, loss of control) are properties of the model rather than of a particular use.
- **Developers and deployers**: rules attach to organisations — licensing, governance processes, incident reporting, transparency about safety practices.

Proponents of use-based regulation argue that harms occur in uses, that model-level rules burden open research and small developers, and that general-purpose technology should be regulated like other general-purpose technologies (electricity, software). Proponents of model-level rules argue that the developers of the most capable models are best placed to evaluate and mitigate their risks, that downstream users cannot evaluate a model they did not build, and that some risks cannot be handled downstream once a model is released ([[llm-society/open-closed-models]]). Most regimes combine both.

### Risk-based classification

::: definition Risk-based regulation {#def-risk-based}
A **risk-based** regime sorts systems or uses into tiers by the severity and likelihood of harm they may cause, and attaches obligations proportionate to the tier: prohibition for unacceptable risks, conformity requirements (risk management, data governance, documentation, human oversight, accuracy and robustness) for high risks, transparency duties for limited risks, and no specific obligations for minimal risks.
:::

Risk-based regulation aims to concentrate regulatory effort where it matters. Its difficulties are that tiers defined by lists of uses may not anticipate new applications, and that general-purpose models have no single intended use.

### Measuring capability: compute thresholds

Rules aimed at the most capable models need a criterion that can be checked before deployment. The simplest is **training compute**, which correlates with capability through scaling laws ([[scaling/scaling-laws]]) and is known to the developer in advance.

::: definition Training-compute threshold {#def-threshold}
A **training-compute threshold** designates a model for additional obligations if the cumulative number of floating-point operations used to train it exceeds a stated value $C_{\text{thr}}$. For a dense Transformer, $C\approx6ND$ for $N$ parameters and $D$ training tokens ([[scaling/flops-memory]]). Thresholds used in policy have included $10^{25}$ FLOPs (the EU AI Act's presumption of systemic risk) and $10^{26}$ operations (the reporting threshold of the 2023 US Executive Order 14110, since revoked; also used in some US state legislation).
:::

::: example Which models cross the thresholds? {#ex-threshold}
Using $C = 6ND$, compute the training compute of (a) a $70$B model trained on $15$T tokens; (b) a $405$B model trained on $15.6$T tokens; (c) an $8$B model trained on $15$T tokens. Which exceed $10^{25}$ and which $10^{26}$?
::: solution
(a) $6\cdot7\times10^{10}\cdot1.5\times10^{13} = 6.3\times10^{24}$: below both. (b) $6\cdot4.05\times10^{11}\cdot1.56\times10^{13} = 3.79\times10^{25}$: above $10^{25}$, below $10^{26}$ (Meta reported about $3.8\times10^{25}$ FLOPs for Llama 3.1 405B, July 2024). (c) $7.2\times10^{23}$: below both. The rule counts total training compute; under the EU's guidelines, compute for substantial later modification (such as large-scale fine-tuning) can also be relevant. Mixture-of-experts models need care: with $N$ the *active* parameters per token, $6ND$ estimates the compute.
:::
:::

Compute is a proxy, and it drifts: algorithmic improvements mean that a given capability can be reached with less compute each year. Ho et al. (2024) estimated that, for language models in 2012–2023, the compute needed to reach a given performance halved roughly every $8$ months (with a wide confidence interval, about $5$ to $14$ months).

::: proposition Drift of a fixed compute threshold {#prop-drift}
Suppose the compute needed to reach a fixed capability halves every $\tau$ months. A model that reaches, at time $t$ months after a threshold is set, the capability that required $C_{\text{thr}}$ at time $0$ needs compute $C(t) = C_{\text{thr}}\,2^{-t/\tau}$. Its compute falls below the threshold by a factor $k$ after $t_k = \tau\log_2k$ months; in particular by a factor of $10$ after $\tau\log_2 10\approx3.32\,\tau$ months.
:::

::: proof
Halving every $\tau$ months means $C(t) = C(0)\,2^{-t/\tau}$ with $C(0) = C_{\text{thr}}$. Setting $C(t) = C_{\text{thr}}/k$ gives $2^{-t/\tau} = 1/k$, so $t = \tau\log_2k$.
:::

::: example How fast a threshold drifts {#ex-drift}
A threshold of $10^{25}$ FLOPs is set when it corresponds to the frontier. With $\tau = 8$ months, how long until the same capability needs only $10^{24}$ FLOPs? With $\tau = 14$ months?
::: solution
$t = \tau\log_2 10$: $8\cdot3.32 = 26.6$ months at $\tau = 8$, and $14\cdot3.32 = 46.5$ months at $\tau = 14$. Within about two to four years, models with a hundredth of the regulated compute can be expected to match the capability that once defined the frontier.
:::
:::

A threshold therefore captures a shrinking share of the models with a given capability, and a growing number of frontier models over time as budgets rise; this is why the EU AI Act lets the Commission amend the threshold and designate models on other criteria, and why many proposals combine compute with capability evaluations.

::: widget plot
f: 25 - x*log(2)/(t*log(10)); 24
x: 0, 60
y: 22, 25.5
sliders: t=8:4:16:0.5
labels: log10 of compute needed for the threshold capability; 10^24 FLOPs
caption: Compute (as $\log_{10}$ FLOPs) needed to match the capability of a $10^{25}$-FLOP model, against months after the threshold was set, if algorithmic progress halves required compute every $t$ months (slider). At $t = 8$ the line crosses $10^{24}$ after about $27$ months ([[#prop-drift]]). Ho et al. (2024) estimated $t$ at roughly $5$–$14$ months for 2012–2023.
:::

## The European Union: the AI Act {#sec-eu}

The **AI Act** (Regulation (EU) 2024/1689) is the first comprehensive horizontal AI law. Proposed by the European Commission in April 2021, it was amended during negotiation to cover general-purpose models after the release of ChatGPT, adopted by the European Parliament in March 2024 and by the Council in May 2024, published in the Official Journal on 12 July 2024, and entered into force on 1 August 2024. It applies to providers placing AI systems or general-purpose models on the EU market and to deployers in the EU, wherever the provider is established.

### Structure

1. **Prohibited practices** (Article 5), including: manipulative or deceptive techniques that materially distort behaviour and cause significant harm; exploitation of vulnerabilities due to age, disability or social situation; social scoring leading to unjustified detrimental treatment; predicting the risk that an individual commits a crime based solely on profiling; untargeted scraping of facial images to build recognition databases; emotion recognition in workplaces and education (with medical and safety exceptions); biometric categorisation to infer sensitive attributes such as race or sexual orientation; and real-time remote biometric identification in public spaces for law enforcement, except in narrowly defined cases.
2. **High-risk systems** (Articles 6–49): AI that is a safety component of products already under EU product law (machinery, medical devices, toys …), and uses listed in Annex III — biometrics, critical infrastructure, education and vocational training, employment and worker management, access to essential services (including credit scoring and insurance pricing), law enforcement, migration and border control, and administration of justice and democratic processes. Providers must implement risk management, data governance, technical documentation, logging, transparency to deployers, human oversight, and accuracy, robustness and cybersecurity, and undergo conformity assessment; deployers have duties including human oversight and, for some public bodies, fundamental-rights impact assessments.
3. **Transparency obligations** (Article 50): people must be told when they interact with an AI system (unless obvious); providers of generative systems must mark synthetic outputs in a machine-readable, detectable way ([[llm-society/copyright-provenance#sec-marking]]); deployers must disclose deepfakes and AI-generated text published to inform the public on matters of public interest (unless subject to human editorial control).
4. **General-purpose AI models** (Articles 51–56), described below.
5. **Governance and enforcement**: an AI Office within the Commission (supervising general-purpose models), national market-surveillance authorities, a European AI Board, a scientific panel of independent experts, and penalties of up to €35 million or $7\%$ of worldwide annual turnover (whichever is higher) for prohibited practices, and lower maxima for other infringements.

::: definition General-purpose AI model with systemic risk (EU AI Act) {#def-gpai}
A **general-purpose AI model** is one that displays significant generality, can competently perform a wide range of distinct tasks, and can be integrated into a variety of downstream systems. It has **systemic risk** if it has high-impact capabilities, which are presumed when its cumulative training compute exceeds $10^{25}$ floating-point operations, or if the Commission designates it on the basis of criteria including capabilities, reach and number of users. All providers of general-purpose models must maintain technical documentation, provide information to downstream providers, have a copyright-compliance policy, and publish a summary of training content. Providers of models with systemic risk must additionally perform model evaluations including adversarial testing, assess and mitigate systemic risks, report serious incidents, and ensure adequate cybersecurity.
:::

Free and open-source models are exempt from the documentation and downstream-information duties unless they have systemic risk; the copyright policy and training summary still apply. In July 2025 the Commission published guidelines on the scope of general-purpose AI obligations, a template for the training-content summary, and a voluntary **General-Purpose AI Code of Practice** drafted by independent experts with chapters on transparency, copyright, and safety and security; signing it is a way to demonstrate compliance. Most major developers signed (some only the safety and security chapter); Meta announced that it would not.

::: algorithm Determining obligations under the AI Act (simplified) {#alg-aiact}
For an AI system or model placed on the EU market:
1. If it is a general-purpose model: apply the general-purpose duties; if training compute exceeds $10^{25}$ FLOPs or it is designated, apply the systemic-risk duties as well (with the open-source exemption only for models without systemic risk).
2. For an AI system: if its use is a prohibited practice, it may not be placed on the market or used.
3. Otherwise, if it is a safety component of a product under listed EU product legislation, or its use is in Annex III (and it is not exempted as posing no significant risk, for example because it performs only a narrow procedural task), it is high-risk: apply the high-risk requirements.
4. Independently, if it interacts with people, generates synthetic content, or performs emotion recognition or biometric categorisation, apply the Article 50 transparency duties.
5. Otherwise no AI-Act-specific obligations apply, though other law (data protection, consumer protection, product liability) does.
:::

### Phased application

The Act applies in stages, counted from entry into force on 1 August 2024:

| from | what applies |
|---|---|
| 2 February 2025 | prohibitions (Art. 5) and AI-literacy duty for providers and deployers (Art. 4) |
| 2 August 2025 | general-purpose model obligations for models placed on the market from this date; governance structures; penalties regime |
| 2 August 2026 | most remaining provisions, including Annex III high-risk systems and Article 50 transparency; Commission's enforcement powers (including fines) for general-purpose model providers |
| 2 August 2027 | high-risk systems that are safety components of products under Annex I legislation; general-purpose models placed on the market before 2 August 2025 must comply |

In November 2025 the Commission proposed, in a "digital omnibus" package, to postpone parts of the high-risk regime until supporting harmonised standards and guidance are available, among other amendments. Whether and in what form such changes were adopted should be checked: the table gives the dates as originally enacted.

::: example The maximum fine {#ex-fine}
A company with worldwide annual turnover of €2 billion deploys a prohibited emotion-recognition system in workplaces. What is the maximum fine for this infringement? What would it be for a company with turnover of €300 million?
::: solution
The maximum is the higher of €35 million and $7\%$ of turnover. For €2 billion, $7\% = $ €140 million, which exceeds €35 million: €140 million. For €300 million, $7\% = $ €21 million, so the maximum is €35 million. (For SMEs and start-ups the Act applies the lower of the two amounts.) Actual fines are set by authorities considering gravity, duration, cooperation and other factors.
:::
:::

The Act's supporters argue that it provides legal certainty, protects fundamental rights and sets a global benchmark (the "Brussels effect"); critics, that it is complex, burdens smaller firms, relies on crude definitions such as the compute presumption, and may slow European AI development. Others have argued that it does too little on general-purpose models or on enforcement capacity. The debate continued during implementation, as the omnibus proposal shows.

## The United States {#sec-us}

The US has no comprehensive federal AI statute (as of 2026). Federal policy has been made mainly through executive orders, agency guidance and existing law, and it has changed direction with administrations.

- **Voluntary commitments** (July 2023): seven, later fifteen, leading AI companies made commitments to the White House on security testing, information sharing, watermarking research and public reporting.
- **Executive Order 14110** (30 October 2023), "Safe, Secure, and Trustworthy Development and Use of Artificial Intelligence", directed many agencies to act: among other things, it used the Defense Production Act to require developers of models trained with more than $10^{26}$ operations (or $10^{23}$ for models trained primarily on biological sequence data) to report on training, security measures and red-team results; directed NIST to develop guidelines and evaluation standards; and set rules for federal agencies' use of AI. The US AI Safety Institute was created within NIST in November 2023.
- **Revocation and a new direction** (2025): on 20 January 2025 EO 14110 was revoked. Executive Order 14179 (23 January 2025), "Removing Barriers to American Leadership in Artificial Intelligence", directed the development of an action plan to sustain US AI dominance; new guidance for federal agencies' AI use replaced the previous memoranda in April 2025; the AI Safety Institute was renamed the **Center for AI Standards and Innovation** (CAISI) in June 2025, with a focus on standards, security evaluations and national-security risks. **America's AI Action Plan** (July 2025) emphasised innovation, infrastructure (data centres and energy), and international diplomacy and security, accompanied by orders on federal procurement of AI models, data-centre permitting and the export of US AI technology. A proposed ten-year moratorium on the enforcement of state AI laws was removed from a federal budget bill by the Senate in July 2025; federal efforts to limit state AI regulation continued to be debated.
- **Export controls**: since October 2022 the US has restricted exports of advanced AI chips and chip-making equipment to China and other countries, with successive updates; a broader "AI diffusion" rule issued in January 2025 was rescinded in May 2025.
- **Existing law**: agencies such as the Federal Trade Commission (deceptive practices), the Equal Employment Opportunity Commission (employment discrimination) and the Consumer Financial Protection Bureau (credit) have applied existing statutes to AI.
- **States**: Colorado enacted a broad law on high-risk AI decisions in May 2024, whose effective date was later postponed to June 2026; California enacted SB 53, the Transparency in Frontier Artificial Intelligence Act, in September 2025, requiring large frontier developers to publish safety frameworks, report critical safety incidents and protect whistleblowers (after the governor vetoed the more prescriptive SB 1047 in September 2024); New York City has required bias audits of automated employment decision tools since 2023 ([[llm-society/bias-fairness]]); and many states have passed laws on deepfakes in elections and non-consensual intimate imagery.

## China {#sec-china}

China has regulated specific algorithmic technologies in a series of targeted measures issued chiefly by the Cyberspace Administration of China (CAC) with other agencies:

- **Algorithmic recommendation** provisions (in force March 2022): transparency, user options to turn off personalisation, and an **algorithm filing** system for services with "public opinion attributes or social mobilisation capabilities".
- **Deep synthesis** provisions (in force January 2023): labelling of synthetic media, real-name verification of users, and security assessments.
- **Interim Measures for the Management of Generative AI Services** (issued July 2023, in force 15 August 2023): apply to generative AI services offered to the public in China. Providers must use training data from lawful sources, respect intellectual property, obtain consent for personal information, take effective measures to improve the accuracy and reliability of generated content and the quality of training data, label generated content, handle complaints, and ensure content upholds "core socialist values" and does not endanger national security; services with public-opinion attributes must undergo security assessment and algorithm filing before launch. The final version narrowed the draft's scope to public-facing services. By 2025 the CAC had published lists of several hundred generative-AI services that completed filing.
- **Labelling Measures for AI-Generated Synthetic Content** (in force 1 September 2025), with an accompanying mandatory national standard, require visible labels on generated content where appropriate and implicit labels (metadata) on all of it, and require platforms to detect and label content.

China's approach combines targeted, quickly issued rules with technical standards (from the national standardisation committee TC260) and administrative filing. Analysts differ in emphasis: some stress its content-control objectives, others its early and specific attention to issues such as labelling, recommendation transparency and data quality. Proposals for a comprehensive AI law have appeared in state legislative plans without, as of 2026, being enacted.

## The UK, safety institutes and international coordination {#sec-international}

The **United Kingdom** chose a "pro-innovation", principles-based approach (white paper, March 2023), asking existing sectoral regulators to apply five principles — safety, transparency, fairness, accountability, contestability — rather than creating an AI-specific regulator. It created the **AI Safety Institute** in November 2023, from the Frontier AI Taskforce, to evaluate advanced models (with pre-deployment access agreed with several developers) and fund research; it was renamed the **AI Security Institute** in February 2025, with a sharper focus on security and serious crime risks.

**Summits.** A series of intergovernmental summits has shaped the international conversation.

- **Bletchley Park, UK (1–2 November 2023)**: $28$ countries and the EU, including the United States and China, signed the **Bletchley Declaration**, recognising risks from frontier AI including potential "serious, even catastrophic, harm" and agreeing to cooperate on understanding them. It commissioned a report on the state of the science.
- **Seoul, South Korea (21–22 May 2024)**: leaders endorsed the Seoul Declaration; $16$ AI companies from several countries signed **Frontier AI Safety Commitments**, pledging to publish safety frameworks describing how they would assess risks and what thresholds would lead them to withhold deployment; countries announced an international network of AI safety institutes.
- **Paris, France (10–11 February 2025)**: the **AI Action Summit** broadened the agenda to innovation, public-interest AI, work and sustainability. About $60$ countries, including China, signed a statement on inclusive and sustainable AI; the United States and the United Kingdom did not.
- A further summit was scheduled to be hosted by India in February 2026.

The **International AI Safety Report**, chaired by Yoshua Bengio with an expert advisory panel nominated by $30$ countries and the UN, OECD and EU, published an interim version in May 2024 and its first full report in January 2025, assessing the capabilities and risks of general-purpose AI and the state of mitigation research; it emphasised deep uncertainty about the pace of progress and about several risks.

**Other international instruments.** The OECD AI Principles (2019, updated 2024) were the first intergovernmental standard and underlie many national policies; the G7's Hiroshima AI Process produced an International Code of Conduct for organisations developing advanced AI (October 2023); the Council of Europe's Framework Convention on AI and human rights, democracy and the rule of law (adopted May 2024) was the first legally binding international treaty on AI and was signed by a number of states, including the United States and the United Kingdom, and by the EU, in September 2024; the UN General Assembly adopted a resolution on safe, secure and trustworthy AI by consensus in March 2024, and in 2025 established an independent international scientific panel on AI and a global dialogue on AI governance.

## Standards and company frameworks {#sec-standards}

Standards translate principles into processes that organisations can implement and auditors can check.

::: definition NIST AI Risk Management Framework {#def-rmf}
The **NIST AI Risk Management Framework** (AI RMF 1.0, January 2023) is a voluntary framework organised around four functions: **Govern** (a culture, policies and accountability for AI risk), **Map** (establish the context and identify risks of a system), **Measure** (analyse, assess and track the identified risks with quantitative and qualitative methods) and **Manage** (prioritise and act on risks, including decisions not to deploy). It describes characteristics of trustworthy AI: valid and reliable, safe, secure and resilient, accountable and transparent, explainable and interpretable, privacy-enhanced, and fair with harmful bias managed. A Generative AI Profile (NIST AI 600-1, July 2024) applies it to generative models.
:::

**ISO/IEC 42001:2023** (published December 2023) specifies requirements for an **AI management system** — the policies, roles, risk assessment, controls and continual improvement of an organisation that develops or uses AI — on the model of ISO management-system standards such as ISO/IEC 27001 for information security, and organisations can be certified against it. Related standards include ISO/IEC 23894:2023 on AI risk management and ISO/IEC 22989 on concepts and terminology. In the EU, harmonised standards being developed by the European standardisation bodies CEN and CENELEC will give a presumption of conformity with the AI Act's high-risk requirements; their delay was one reason for the 2025 omnibus proposal.

**Company frameworks.** Several frontier developers have published safety frameworks — Anthropic's Responsible Scaling Policy (September 2023), OpenAI's Preparedness Framework (December 2023), Google DeepMind's Frontier Safety Framework (May 2024), and frameworks from others after the Seoul commitments — which define capability thresholds in risk domains such as biological and cyber capabilities and autonomy, commit to evaluations, and specify safeguards required before training or deploying models above the thresholds ([[safety-alignment/safety-frameworks]]). These are self-governance; California's SB 53 and the EU Code of Practice turn publication of such frameworks into legal or quasi-legal expectations.

::: example Mapping a deployment to the NIST functions {#ex-rmf}
A bank plans to use a language model to draft explanations of credit decisions to customers. Give one activity for each of the four functions of the AI RMF.
::: solution
**Govern**: assign an accountable owner, set a policy that a human reviews every explanation before sending, and train staff. **Map**: identify the context (customers, regulatory requirements on adverse-action notices), and the risks — inaccurate reasons, hallucinated policy terms, disclosure of other customers' data, unequal quality by language. **Measure**: evaluate accuracy of explanations against the actual decision factors on a test set, disaggregated by customer group and language ([[llm-society/bias-fairness]]), and red-team for data leakage. **Manage**: set acceptance thresholds, monitor complaints and errors in production, retrain or withdraw if thresholds are breached, and document decisions. Under the EU AI Act, credit scoring is high-risk, but drafting explanations of decisions made by another system may or may not be — the classification depends on the system's role, which is itself a question to map.
:::
:::

## The debates {#sec-debates}

The main disagreements in AI governance are of three kinds.

**How much and how soon.** One position holds that regulation should be precautionary for a technology with potentially severe and irreversible risks, that waiting for evidence of harm may be too late, and that clear rules give firms certainty. Another holds that premature regulation, written before the technology and its risks are understood, entrenches incumbents who can afford compliance, slows beneficial innovation, and shifts development to less regulated jurisdictions; existing law and targeted interventions should be used first. Many positions combine elements: transparency and evaluation duties now, stronger rules conditional on evidence.

**Which risks.** Some researchers and advocates focus on present harms — discrimination, surveillance, labour exploitation, misinformation, concentration of power — and argue that attention to speculative future risks diverts resources and can serve the interests of developers. Others focus on risks from more capable future systems — misuse for weapons, loss of control — arguing that their severity justifies preparation now. Others argue that the two agendas share mechanisms (evaluation, transparency, accountability) and need not compete. The International AI Safety Report covered both kinds of risk and emphasised the uncertainty about each.

**Competition and cooperation.** Governance is shaped by strategic competition, especially between the United States and China, which some argue requires prioritising national capability and others argue makes international agreements on safety more necessary. The summit series, the safety-institute network and the UN processes are attempts at coordination; their influence on national policy has varied, as the different responses to the Paris statement show.

::: warning A law's text is not its effect
Obligations depend on secondary legislation, guidance, standards, codes of practice and enforcement capacity, which often arrive years after a law is passed and can change its practical meaning. Executive actions can be revoked by the next administration, deadlines are postponed, and courts interpret provisions. Describe a regime with dates, distinguish enacted from proposed measures, and check the current status before relying on any summary — including this one.
:::

::: quiz
A developer trains a general-purpose model with $3\times10^{25}$ FLOPs, releases it under an open-source licence, and offers it to users in the EU from September 2025. Under the AI Act as enacted, which statement is correct?
- [ ] It is exempt from all AI Act obligations because it is open source.
- [x] It is presumed to have systemic risk, so the open-source exemption does not apply and the systemic-risk obligations (evaluations, risk mitigation, incident reporting, cybersecurity) apply in addition to the general duties.
- [ ] Only the high-risk system requirements of Annex III apply.
- [ ] No obligations apply until August 2027.
::: solution
The compute exceeds $10^{25}$ FLOPs, triggering the presumption of systemic risk (the provider may contest it). The open-source exemption covers only models without systemic risk. Since the model was placed on the market after 2 August 2025, general-purpose obligations apply from then; the 2027 date is for models placed on the market before August 2025. Annex III concerns AI systems in specific uses, not models as such.
:::
:::

::: history
Ethical principles for AI multiplied from 2016 (Jobin, Ienca and Vayena, 2019, found convergence on transparency, justice, non-maleficence, responsibility and privacy). The OECD Principles (2019) gave them intergovernmental form. Binding rules followed for specific technologies: the EU's GDPR (2018) on automated decision-making, China's algorithm (2022), deep-synthesis (2023) and generative-AI (2023) rules, and the EU AI Act, proposed in 2021 and adopted in 2024. The release of ChatGPT in November 2022 accelerated attention: an open letter calling for a pause in training of the most capable models (March 2023) and a one-sentence statement on extinction risk signed by many researchers (May 2023) preceded the US voluntary commitments (July 2023), Executive Order 14110 and the Bletchley summit (both late 2023). 2024–25 brought the Seoul and Paris summits, the first International AI Safety Report, the AI Act's first obligations and a change of direction in US federal policy.
:::

::: summary
- Governance can target uses, models or organisations; risk-based regimes tier obligations by severity; compute thresholds ($10^{25}$, $10^{26}$ FLOPs, with $C\approx6ND$) select frontier models but drift as algorithms improve (halving every $\tau$ months moves a capability a factor of $10$ below the threshold in $3.3\tau$ months).
- The EU AI Act (in force 1 August 2024) prohibits some practices from February 2025, imposes general-purpose model duties from August 2025 (systemic-risk duties above $10^{25}$ FLOPs), and most high-risk and transparency rules from August 2026, with product-embedded high-risk systems from August 2027; changes to the timetable were proposed in November 2025.
- US federal policy moved from EO 14110 (October 2023) to its revocation and a pro-innovation agenda (2025); states such as California and Colorado legislate; export controls and existing law remain important.
- China regulates through targeted measures — recommendation algorithms (2022), deep synthesis (2023), generative AI services (August 2023), labelling (September 2025) — with filing and security assessments.
- The UK's institute (2023; renamed AI Security Institute, 2025) and others evaluate models; summits at Bletchley (2023), Seoul (2024) and Paris (2025) produced declarations, company commitments and the International AI Safety Report (2025).
- Standards — NIST AI RMF (2023; Govern, Map, Measure, Manage), ISO/IEC 42001 (2023) — and company safety frameworks operationalise governance.
- The debates concern timing and stringency, which risks to prioritise, and competition versus cooperation; the area moves fast, so check current sources.
:::

## Exercises

::: exercise Above the threshold? {level=1 check="1.68e25"}
Compute the training compute $6ND$ of a model with $N = 1.4\times10^{11}$ parameters trained on $D = 2\times10^{13}$ tokens. Does it cross the EU presumption threshold?
::: solution
$6\cdot1.4\times10^{11}\cdot2\times10^{13} = 1.68\times10^{25}$ FLOPs, above $10^{25}$: presumed to have systemic risk.
:::
:::

::: exercise Mixture of experts {level=1 check="6.3e24"}
A mixture-of-experts model has $600$B total parameters of which $35$B are active per token, and is trained on $30$T tokens. Estimate its training compute with the active parameters.
::: solution
$6\cdot3.5\times10^{10}\cdot3\times10^{13} = 6.3\times10^{24}$ FLOPs, below $10^{25}$ although the total parameter count is large. Using total parameters would give $1.08\times10^{26}$, a large overestimate; how compute is counted matters for designation.
:::
:::

::: exercise A fine {level=1 check="35"}
A company with worldwide annual turnover of €400 million commits a prohibited-practice infringement. What is the maximum fine under the AI Act, in millions of euros, if it is not an SME?
::: solution
$7\%$ of €400 million is €28 million, less than €35 million, so the maximum is the higher amount, €35 million.
:::
:::

::: exercise Threshold drift {level=2 check="40"}
If compute needed for a fixed capability halves every $12$ months, after how many months does a $10^{25}$-FLOP capability require only $10^{24}$ FLOPs? Round to the nearest month.
::: solution
$t = 12\log_2 10 = 12\cdot3.32 = 39.9$, so about $40$ months.
:::
:::

::: exercise Compounding growth and progress {level=2 check="8"}
Suppose frontier training budgets grow by a factor of $4$ per year in FLOPs, and algorithmic progress halves the compute needed for a given capability every $12$ months. By what factor does the *effective* compute of the frontier (capability-equivalent compute at year-0 algorithms) grow per year? How many years until the frontier's actual compute exceeds a fixed $10^{26}$ threshold, if it is $10^{25}$ today?
::: solution
Each year the frontier uses $4$ times the FLOPs, and each FLOP is worth $2$ times as much, so effective compute grows by $4\cdot2 = 8$ per year. Actual compute grows by $4$ per year, so it reaches $10^{26}$ after $\log_4 10 = 1.66$ years, about $1.7$ years. A threshold set at the frontier is soon crossed by many models, while capability-equivalent models below it multiply.
:::
:::

::: exercise Classifying under the AI Act {level=2}
Using [[#alg-aiact]], classify: (a) a chatbot on a retailer's website answering product questions; (b) a system that ranks job applicants; (c) a model generating marketing images; (d) a system inferring employees' emotions from webcam video to assess engagement.
::: solution
(a) Not high-risk; Article 50 requires informing users that they are interacting with an AI system unless obvious. (b) High-risk (employment, Annex III): risk management, data governance, documentation, human oversight, accuracy requirements, conformity assessment; deployer duties. (c) Article 50: outputs must be marked as AI-generated in a machine-readable way; deepfake disclosure if depicting real people or places as authentic. (d) Prohibited (emotion recognition in the workplace, absent medical or safety reasons).
:::
:::

::: exercise Comparing regimes {level=2}
For a generative AI chat service offered to the public, compare in a few sentences what the EU (AI Act), China (Interim Measures) and the US federal government (as of 2026) require before launch.
::: solution
EU: the underlying general-purpose model's provider must have documentation, a copyright policy and a training summary (and systemic-risk duties if above $10^{25}$ FLOPs); the service must tell users they are interacting with AI and mark synthetic outputs (from August 2026); no pre-launch approval. China: if the service has public-opinion attributes, it must complete a security assessment and algorithm filing before launch, and meet requirements on training-data legality, content and labelling. US federal: no general pre-launch requirement; existing law (consumer protection, discrimination, copyright) applies, and some states impose duties (for example California's SB 53 for large frontier developers, on publishing frameworks and reporting incidents rather than approval).
:::
:::

::: exercise Designing a threshold rule {level=3}
A legislator wants a rule that applies extra obligations to "the most capable models" and remains meaningful for five years. Using [[#prop-drift]], explain why a fixed compute threshold alone is inadequate, and propose a rule combining compute with other criteria. Discuss one advantage and one weakness of your rule.
::: solution
With $\tau\approx8$ months, a fixed threshold falls behind a given capability by about a factor of $10^{2.3}$ in five years: models below it may match the capability of models that once triggered it, while rising budgets make many models exceed it, so it becomes both under- and over-inclusive. A better rule might apply obligations if (a) training compute exceeds a threshold that the regulator updates periodically (say annually) by a published method, *or* (b) the model reaches specified scores on standardised capability evaluations in risk domains, *or* (c) it is among the top $k$ models by compute or by evaluation results, with a de minimis exemption for small developers. Advantage: capability evaluations target what matters and do not drift. Weakness: evaluations can be gamed or under-elicit capabilities, require trusted evaluators, and are not known before training, while compute is; the combination increases complexity and regulatory discretion. Other reasonable designs exist.
:::
:::

::: exercise Voluntary commitments {level=3}
The summit series produced voluntary commitments rather than binding rules. Present the strongest argument that voluntary commitments by companies and non-binding declarations by states are a valuable stage of governance, and the strongest argument that they are inadequate. Use at least one example from the chapter for each.
::: solution
For: voluntary commitments can be agreed quickly in a fast-moving field, establish norms and practices (published safety frameworks, pre-deployment testing by institutes) that later legislation can codify — as California's SB 53 and the EU Code of Practice did — and bring countries such as the US and China into a shared statement (Bletchley) that binding treaties could not have achieved. Against: commitments lack enforcement and can be revised or abandoned when incentives change, as changes in national positions between Bletchley and Paris illustrate; companies write their own thresholds and judge their own compliance; and declarations may give an appearance of action that delays binding rules. A balanced answer notes that the two views are compatible: voluntary measures can be valuable steps while being inadequate as an end state.
:::
:::
