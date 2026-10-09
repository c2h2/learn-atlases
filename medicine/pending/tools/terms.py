# -*- coding: utf-8 -*-
"""Glossary for the Medicine Atlas Chinese generation (tools/zh/gen_zh.py).

TERM: single-token english -> chinese.  PHRASE: multi-word english -> chinese.
HEAD: heading text (english, lowercased) -> chinese.
"""

_PAIRS = """
abdomen:腹部|abdominal:腹部的|absorption:吸收|accountability:问责|acetabulum:髋臼|acid:酸|
acute:急性|addiction:成瘾|adherence:依从性|adolescent:青少年|adrenal:肾上腺|adverse:不良|
affect:影响|affective:情感的|afferent:传入的|affinity:亲和力|agonism:激动作用|airway:气道|
alignment:对线|allele:等位基因|allocation:分配|already:已经|amino:氨基酸|anaemia:贫血|
analgesia:镇痛|analysis:分析|analyst:分析者|anaphylaxis:过敏反应|anastomosis:吻合|
anatomical:解剖的|anatomy:解剖|antenatal:产前的|anterior:前方的|anticipatory:预期性的|
antigen:抗原|antimicrobials:抗微生物药|anxious:焦虑的|apoptosis:凋亡|appraisal:评价|
arch:弓|arrhythmias:心律失常|artery:动脉|articulation:关节|assay:检测|assent:同意|
assessment:评估|attachment:附着|autoimmune:自身免疫的|autoimmunity:自身免疫|
autonomic:自主神经的|autonomy:自主性|away:远离|axis:轴|back:背部|bacteria:细菌|
bacterium:细菌|balance:平衡|barrier:屏障|basal:基础的|base:碱|biliary:胆的|
binding:结合|bleeding:出血|blood:血液|bond:键|bone:骨|bowel:肠|brain:脑|branch:分支|
breath:呼吸|bryology:苔藓学|buffer:缓冲|calcium:钙|cancer:癌|capacity:容量|care:照护|
cartilage:软骨|cascade:级联|cases:病例|catalytic:催化的|cell:细胞|center:中枢|
central:中枢的|channel:通道|chest:胸部|child:儿童|choice:选择|chromosomal:染色体的|
chromosome:染色体|chronic:慢性的|circuit:回路|circulation:循环|clinical:临床的|
clinician:临床医生|clonal:克隆的|clot:血凝块|cognitive:认知的|colony:集落|
communication:沟通|competence:能力|compliance:顺应性|complications:并发症|computed:计算的|
concentration:浓度|conception:受孕|conductance:电导|conduction:传导|
confidentiality:保密性|confounding:混杂|congenital:先天的|connective:结缔的|
consciousness:意识|consent:同意|continuity:连续性|contractile:收缩的|contraction:收缩|
contrast:对比|control:控制|coordination:协调|coronal:冠状的|coronary:冠状的|cortex:皮质|
coverage:覆盖|critical:危重的|cycle:周期|cyclical:周期性的|decision:决策|decline:下降|
defect:缺陷|defibrillation:除颤|deficiency:缺乏|deficit:缺失|defines:定义|
degeneration:退变|delivery:分娩|delusional:妄想的|demyelination:脱髓鞘|described:描述的|
describes:描述|description:描述|development:发育|diabetes:糖尿病|diagnosis:诊断|
diagnostic:诊断的|differentiation:分化|diffusion:扩散|digestion:消化|direction:方向|
disease:疾病|disorder:障碍|disorders:障碍|distal:远端的|distortion:畸形|
distribution:分布|documentation:记录|dominance:优势|dosing:给药|drive:驱动|drug:药物|
drugs:药物|duct:导管|during:期间|dysfunction:功能障碍|early:早期的|eating:进食|
economics:经济学|ectoderm:外胚层|effect:效应|effector:效应器|efferent:传出的|
efficiency:效率|effusion:积液|embryo:胚胎|embryology:胚胎学|emergencies:急症|empathy:共情|
end:末端|endocrine:内分泌的|endoderm:内胚层|energy:能量|environment:环境|
environmental:环境的|enzymatic:酶的|enzyme:酶|epigenetic:表观遗传的|epilepsy:癫痫|
episodic:发作性的|equity:公平|eradication:根除|erosion:侵蚀|essel:血管|ethical:伦理的|
event:事件|exaggerated:夸大的|examination:检查|exchanged:交换|exchange:交换|
exercises:练习|explain:解释|exposure:暴露|expression:表达|factor:因素|factors:因素|
failure:衰竭|falls:跌倒|fascia:筋膜|fatty:脂肪|fear:恐惧|feedback:反馈|fetal:胎儿的|
fetus:胎儿|fever:发热|fibrin:纤维蛋白|fibroblast:成纤维细胞|field:字段|filtration:滤过|
finding:发现|fixation:固定|flow:流量|fluid:液体|fold:折叠|for:对于|forms:形式|
fracture:骨折|fractures:骨折|frailty:衰弱|function:功能|fungi:真菌|gas:气体|gene:基因|
genetic:遗传的|genome:基因组|germ:病原|gives:给出|gland:腺体|glia:神经胶质|global:全球的|
governance:治理|gradient:梯度|grading:分级|growth:生长|gut:肠道|gynaecological:妇科的|
haemostasis:止血|hallucination:幻觉|healing:愈合|health:健康|heart:心脏|hepatic:肝的|
histology:组织学|history:病史|hiv:人类免疫缺陷病毒|hormonal:激素的|hormone:激素|
hormones:激素|host:宿主|hypersensitivity:超敏反应|hypertension:高血压|
hypothesis:假说|image:影像|imaging:影像|immune:免疫的|immunity:免疫|immunisation:免疫接种|
incidence:发生率|incidents:事件|inequality:不平等|infection:感染|infections:感染|
inference:推断|inferior:下级的|inflammation:炎症|informed:知情的|inheritance:遗传|
injury:损伤|insertion:插入|inspection:视诊|integration:整合|integrity:完整性|
intermediary:中间物|interpretation:解释|interstitial:间质的|invasion:侵袭|ion:离子|
joint:关节|justice:公正|kidney:肾|labour:分娩|lane:通路|language:语言|lateral:侧方的|
layer:层|layers:层次|legal:法律的|lesion:病变|lesson:课程|leukaemia:白血病|
ligament:韧带|ligand:配体|limb:肢体|limit:限度|lineage:谱系|lining:内衬|locates:定位|
lung:肺|lymphatic:淋巴的|major:主要的|malignancy:恶性|management:处理|maternal:母亲的|
measure:测量|mechanics:力学|mechanism:机制|medial:内侧的|mediator:介质|membrane:膜|
memory:记忆|menopause:绝经|menstrual:月经的|mental:精神的|metabolic:代谢的|
metabolism:代谢|microbiota:微生物群|milestone:里程碑|mineral:矿物质|modality:方式|
molecule:分子|mood:情绪|motility:运动|motor:运动的|movement:运动|muscle:肌肉|
mutation:突变|necrosis:坏死|neoplastic:肿瘤的|nephron:肾单位|nerve:神经|neural:神经的|
neurotransmitter:神经递质|neutrophil:中性粒细胞|newborn:新生儿|nociceptive:伤害性的|
note:注释|notes:注释|nutrition:营养|obstruction:梗阻|occupational:职业的|oint:关节|
oncogenic:致瘤的|organ:器官|osmolar:渗透压的|osmolarity:渗透压|osteoarthritis:骨关节炎|
outbreak:暴发|outcome:结局|ovary:卵巢|oversight:监督|ovulation:排卵|oxidation:氧化|
oxygen:氧|oxygenation:氧合|palliative:姑息的|parasites:寄生虫|parenchymal:实质的|
participant:参与者|patency:通畅|pathogen:病原体|pathology:病理学|pathway:通路|
patient:患者|pattern:模式|pelvis:骨盆|perception:感知|perineum:会阴|period:时期|
perioperative:围手术期的|person:人|personality:人格|pharmacological:药理学的|
placental:胎盘的|plane:平面|plate:血小板|pleura:胸膜|plexus:神经丛|poisoning:中毒|
polarity:极性|polygenic:多基因的|polypharmacy:多重用药|population:人群|position:位置|
posterior:后方的|postnatal:产后的|potassium:钾|potential:电位|pregnancy:妊娠|
prenatal:产前的|prescription:处方|presentation:表现|pressure:压力|prevalence:患病率|
prevention:预防|primary:原发的|principles:原则|process:过程|processing:处理|
programme:方案|progression:进展|proliferation:增殖|promotion:促进|protein:蛋白质|
provides:提供|proximal:近端的|psychiatry:精神病学|psychosocial:心理社会的|
psychotic:精神病的|radiation:辐射|randomisation:随机化|rate:速率|ray:射线|
reabsorption:重吸收|reaction:反应|receptor:受体|recessivity:隐性|recognition:识别|
record:记录|reference:参考|region:区域|regulation:调节|rejection:排斥|renal:肾的|
repair:修复|reproductive:生殖的|resection:切除|reserve:储备|resistance:阻力|
resource:资源|respiratory:呼吸的|response:反应|resuscitation:复苏|return:返回|
reviews:综述|rhythm:节律|risk:风险|rotation:旋转|safeguarding:保护|safety:安全|
sagittal:矢状的|sample:样本|screening:筛查|secondary:继发的|secretion:分泌|
section:断面|segment:节段|sensory:感觉的|sepsis:脓毒症|sequence:序列|set:集合|
sets:集合|sexually:性传播的|sign:体征|signal:信号|skin:皮肤|sodium:钠|somatic:体细胞的|
specificity:特异性|stage:分期|staging:分期|standard:标准|state:状态|statistic:统计量|
steroid:类固醇|stewardship:管理|stress:应激|stroke:卒中|structure:结构|study:研究|
superior:上级的|surgical:外科的|surveillance:监测|susceptibility:易感性|suture:缝合|
sympathetic:交感的|symphysis:联合|symptom:症状|synapse:突触|synovium:滑膜|
synthetic:合成的|system:系统|tendon:肌腱|test:试验|testing:检测|tests:试验|
therapy:治疗|this:该|thyroid:甲状腺|timeline:时间轴|tissue:组织|tolerance:耐受|
towards:朝向|toxicity:毒性|toxin:毒素|traces:痕迹|tract:束|transfer:转移|
transformation:转化|transfusion:输血|transmitted:传播|transplant:移植|transport:转运|
transverse:横的|trauma:创伤|treatment:治疗|trial:试验|tropical:热带的|tube:管道|
tuberculosis:结核病|tubule:小管|understanding:理解|urinary:泌尿的|urological:泌尿的|
uterus:子宫|vaccination:疫苗接种|valve:瓣膜|variant:变异|variation:变异|vascular:血管的|
vein:静脉|ventilation:通气|vessel:血管|viruses:病毒|visceral:内脏的|volume:容积|
week:周|which:哪个|withdrawal:撤药|wound:伤口|you:你
"""

TERM = {}
for _chunk in _PAIRS.replace('\n', ' ').split('|'):
    _chunk = _chunk.strip()
    if not _chunk:
        continue
    _en, _, _zh = _chunk.partition(':')
    TERM[_en.strip().lower()] = _zh.strip()

PHRASE = {}
HEAD = {}

_PAIRS2 = """
the:|a:|an:|one:者|ones:者|use:用途|method:方法|what:什么|only:仅|if:如果|plot:图|
neuron:神经元|transmission:传播|somite:体节|psychological:心理的|social:社会的|
laboratory:实验室|systematic:系统的|lifespan:寿命|immunocompromised:免疫低下的|
neuromuscular:神经肌肉的|synapses:突触|mind:心理|reversibility:可逆性|
revascularisation:血管重建|electron:电子|part:部分|teratogenicity:致畸性|referred:转诊|
presents:表现|resting:静息的|reconstruction:重建|malignant:恶性的|outbreaks:暴发|
shows:显示|pain:疼痛|resonance:共振|examined:已检查|mesoderm:中胚层|effect:效应|
leads:引导|meet:满足|root:根|where:哪里|with:与|in:在|ph:pH|which:哪个|so:因此|
and:与|or:或|not:不|no:无|that:那个|this:这个|these:这些|those:那些|it:它|its:它的|
is:是|are:是|be:是|as:作为|at:在|on:在|of:的|to:到|for:对于|by:由|from:由|than:比|
then:那么|all:所有|any:任何|what:什么|when:何时|how:如何|why:为何|do:做|does:做|
can:可以|will:会|should:应当|have:有|has:有|worked:实例|cases:病例|exercises:练习|
elvis:埃尔维斯|uscle:肌|egion:区域|erm:术语|eek:周|of:的|osition:位置|irection:方向|
"""
for _chunk in _PAIRS2.replace('\n', ' ').split('|'):
    _chunk = _chunk.strip()
    if not _chunk:
        continue
    _en, _, _zh = _chunk.partition(':')
    if _en.strip().lower() not in TERM:
        TERM[_en.strip().lower()] = _zh.strip()

HEAD = {
    'exercises': '练习',
    'worked cases': '实例',
    'worked examples': '实例',
    'learn more': '延伸阅读',
    'where this leads': '延伸',
    'key points': '要点',
    'summary': '小结',
    'overview': '概述',
    'references': '参考文献',
    'contents': '目录',
    'introduction': '引言',
    'review questions': '复习题',
    'answers': '答案',
    'glossary': '术语表',
    'further reading': '延伸阅读',
    'clinical boxes': '临床专栏',
    'case studies': '病例研究',
    'learning objectives': '学习目标',
}

PHRASE = {
    'the one that the': '所对应的',
    'is for': '成立',
    'worked cases': '实例',
    'learn more': '延伸阅读',
}

for _en, _zh in [('each', '每个'), ('relative', '相对的'), ('efect', '效应'), ('erve', '神经')]:
    TERM.setdefault(_en, _zh)

_PAIRS3 = """
activation:激活|adaptation:适应|adaptive:适应的|adhesion:黏附|advance:进展|ageing:衰老|
alzheimer:阿尔茨海默|anaesthesia:麻醉|aneuploidy:非整倍体|aneurysm:动脉瘤|anorexia:厌食|
antibodies:抗体|antidiuretic:抗利尿的|antimicrobial:抗微生物的|anxiety:焦虑|aortic:主动脉的|
appendicitis:阑尾炎|appraising:评价|approach:方法|assessing:评估|asthma:哮喘|
atherosclerosis:动脉粥样硬化|autism:自闭症|autosomal:常染色体的|bacterial:细菌的|
barriers:屏障|basic:基础的|benign:良性的|beyond:超出|biology:生物学|biopsies:活检|
bradycardias:心动过缓|breast:乳房|buffers:缓冲|cardiac:心脏的|cardiovascular:心血管的|
causes:病因|cervical:宫颈的|chemical:化学的|chemoreceptors:化学感受器|childhood:儿童期|
children:儿童|chlamydia:衣原体|cholinergic:胆碱能的|choosing:选择|classification:分类|
clostridioides:艰难梭菌|coeliac:乳糜泻|communicable:可传播的|communicating:沟通|
confidence:信心|connective:结缔|consultation:会诊|contraception:避孕|cortisol:皮质醇|
cross:交叉|sectional:节段的|cushing:库欣|delirium:谵妄|dementia:痴呆|demyelinating:脱髓鞘的|
depression:抑郁|dermatology:皮肤病学|developmental:发育的|diagnostic:诊断的|diarrhoea:腹泻|
disability:残疾|disorders:障碍|diversity:多样性|documentation:文档|dosage:剂量|
drugs:药物|embolism:栓塞|emergency:急诊|emotional:情感的|epidemiology:流行病学|
evaluation:评价|evolution:演化|excretion:排泄|exercise:运动|expenditure:消耗|
experience:经验|extension:扩展|extracellular:细胞外的|eye:眼|facial:面部的|familial:家族的|
fatigue:疲劳|feeding:喂养|fitness:健康度|foetal:胎儿的|forensic:法医的|gait:步态|
gastric:胃的|gastritis:胃炎|generator:发生器|geriatrics:老年医学|gestational:妊娠的|
global:全球的|glucose:葡萄糖|goitre:甲状腺肿|gout:痛风|gradual:渐进的|haematology:血液学|
haemorrhage:出血|hallucinations:幻觉|headache:头痛|healthcare:医疗保健|hearing:听力|
heartfailure:心力衰竭|haemoglobin:血红蛋白|helminth:蠕虫|hemoglobin:血红蛋白|
high:高的|histamine:组胺|homeostasis:稳态|hospital:医院|human:人|hygiene:卫生|
hyperthyroidism:甲状腺功能亢进|hypoglycaemia:低血糖|hypothalamus:下丘脑|ileus:肠梗阻|
immunology:免疫学|impairment:损伤|inflammations:炎症|inherited:遗传的|injuries:损伤|
institute:研究所|integration:整合|intensive:强化|intolerance:不耐受|intracellular:细胞内的|
inventory:清单|investigation:调查|jaundice:黄疸|kidneys:肾脏|lab:实验室|learning:学习|
ligaments:韧带|lifestyle:生活方式|lipids:脂质|liquid:液体|loss:丧失|lump:肿块|
lymph:淋巴|lymphoma:淋巴瘤|major:主要|malnutrition:营养不良|medication:药物|
medication:药物|memory:记忆|messaging:信息|metastatic:转移的|microbiome:微生物组|
midline:中线|mitosis:有丝分裂|mobility:活动度|moderate:中度的|mortality:死亡率|
muscles:肌肉|nausea:恶心|neonatal:新生儿的|nervous:神经的|network:网络|nociception:伤害感受|
nutrients:营养素|obesity:肥胖|observation:观察|occupations:职业|odds:比值|oil:油|
ophthalmology:眼科学|palpation:触诊|pancreas:胰腺|paracetamol:对乙酰氨基酚|parkinson:帕金森|
partum:产时|pathways:通路|pain:疼痛|peak:峰值|periods:时期|person:人|physical:身体的|
physiology:生理学|placenta:胎盘|platelets:血小板|pneumonia:肺炎|poison:毒物|policy:政策|
postoperative:术后的|posture:姿势|practice:实践|prevention:预防|prognosis:预后|
prostate:前列腺|protein:蛋白质|psychology:心理学|puberty:青春期|pulmonary:肺的|
quality:质量|radiology:放射学|recovery:恢复|rectal:直肠的|reflex:反射|rehabilitation:康复|
remission:缓解|reproduction:生殖|resistance:耐药|respiration:呼吸|retina:视网膜|
rheumatoid:类风湿的|risk:风险|schizophrenia:精神分裂症|sedation:镇静|seizure:发作|
shock:休克|sleep:睡眠|smoking:吸烟|social:社会|speech:言语|spiritual:精神的|
spleen:脾|squamous:鳞状的|steroids:类固醇|stool:粪便|strabismus:斜视|stretch:牵张|
stringency:严格性|stroke:卒中|substance:物质|surgery:外科|swallowing:吞咽|syncope:晕厥|
systemic:全身性的|tachycardia:心动过速|teaching:教学|temperature:体温|tenderness:压痛|
therapy:疗法|thrombosis:血栓|thyroid:甲状腺|tremor:震颤|ulcer:溃疡|ultrasound:超声|
vaccines:疫苗|vaccine:疫苗|vapour:蒸气|veins:静脉|ventricle:心室|viruses:病毒|
vitamin:维生素|vomiting:呕吐|warfarin:华法林|wasting:消耗|water:水|weakness:无力|
welfare:福利|wheelchair:轮椅|whistle:哨|withdrawal:戒断|women:女性|word:词|work:工作|
"""
for _chunk in _PAIRS3.replace('\n', ' ').split('|'):
    _chunk = _chunk.strip()
    if not _chunk:
        continue
    _en, _, _zh = _chunk.partition(':')
    if _en.strip().lower() not in TERM:
        TERM[_en.strip().lower()] = _zh.strip()

_PAIRS4 = """
follows:遵循|check:检查|make:使|build:构建|interpret:解释|outline:概述|recognise:识别|
covers:涵盖|body:身体|medical:医学的|medicine:医学|ethics:伦理|every:每个|skill:技能|
skills:技能|gastrointestinal:胃肠的|common:常见的|people:人群|organism:生物体|
organisms:生物体|procedure:操作|procedures:操作|liver:肝|principle:原理|principles:原理|
microbe:微生物|microbes:微生物|musculoskeletal:肌肉骨骼的|evidence:证据|infectious:感染性的|
microbiology:微生物学|conditions:情况|obstetrics:产科|paediatrics:儿科|pharmacology:药理学|
public:公共卫生|thorax:胸|death:死亡|biochemistry:生物化学|older:年长的|life:生活|
illness:疾病|professionalism:专业性|doctor:医生|doctors:医生|breathing:呼吸|safe:安全的|
leading:主要的|worldwide:全球|change:改变|taking:获取|reasoning:推理|approaches:方法|
pituitary:垂体|designs:设计|bias:偏倚|good:良好的|processes:过程|innate:先天性的|
research:研究|questions:问题|between:之间|arthritis:关节炎|neurological:神经的|
gynaecology:妇科|birth:出生|fertility:生育|general:一般的|handles:处理|depends:取决于|
excitable:可兴奋的|psychiatric:精神科的|determinants:决定因素|glomerular:肾小球的|
rest:静息|head:头|neck:颈|appears:表现|carries:携带|fights:对抗|stops:停止|
myeloma:骨髓瘤|molecular:分子的|basis:基础|begins:开始|carbohydrates:碳水化合物|
signalling:信号|always:总是|linking:联系|interpreting:解读|starts:开始|talking:讨论|
examining:检查|differential:鉴别|handover:交接|time:时间|managed:管理|structured:结构化的|
arrest:骤停|triage:分诊|coordinate:协调|endocrinology:内分泌学|measuring:测量|
harvey:哈维|lister:李斯特|koch:科赫|pasteur:巴斯德|roentgen:伦琴|fleming:弗莱明|
watson:沃森|crick:克里克|franklin:富兰克林|semmelweis:塞麦尔维斯|euler:欧拉|
followed:遵循|covered:涵盖|using:使用|used:使用|based:基于|making:使|taking:获取|
given:给出|gives:给出|shown:显示|shows:显示|found:发现|made:使|does:做|when:何时|
while:同时|where:哪里|which:哪个|that:那个|because:因为|although:尽管|however:然而|
therefore:因此|between:之间|during:期间|within:在内|without:没有|across:跨越|
around:围绕|through:通过|before:之前|after:之后|above:上方|below:下方|under:下方|
between:之间|among:之中|toward:朝向|against:对抗|according:按照|related:相关的|
involved:涉及的|required:需要的|provides:提供|provide:提供|include:包括|includes:包括|
including:包括|included:包括|such:这样的|same:相同的|different:不同的|each:每个|
both:两者|other:其他的|another:另一个|more:更多|most:最|less:更少|few:少数|
many:许多|much:大量|several:数个|all:所有|some:某些|any:任何|no:无|not:不|
"""
for _chunk in _PAIRS4.replace('\n', ' ').split('|'):
    _chunk = _chunk.strip()
    if not _chunk:
        continue
    _en, _, _zh = _chunk.partition(':')
    if _en.strip().lower() not in TERM:
        TERM[_en.strip().lower()] = _zh.strip()

_PAIRS5 = """
quantity:量|quantities:量|way:方式|property:属性|supply:供给|bud:芽|pharyngeal:咽的|
boundary:边界|innervation:神经支配|localises:定位|stabilising:稳定的|predisposition:易感|
insult:打击|contribution:贡献|density:密度|orientation:方向|front:前面|hand:手|
full:完全的|next:下一个|pubic:耻骨的|kidney:肾|field:领域|fields:领域|
"""
for _chunk in _PAIRS5.replace('\n', ' ').split('|'):
    _chunk = _chunk.strip()
    if not _chunk:
        continue
    _en, _, _zh = _chunk.partition(':')
    if _en.strip().lower() not in TERM:
        TERM[_en.strip().lower()] = _zh.strip()

for _en, _zh in [('hip', '髋'), ('hips', '髋')]:
    TERM.setdefault(_en, _zh)

_PAIRS6 = """
lipid:脂质|lipids:脂质|carbohydrate:碳水化合物|carbohydrates:碳水化合物|cause:病因|
causes:病因|their:其|they:它们|them:它们|law:定律|laws:定律|ecg:心电图|think:思考|
ill:生病的|done:完成|act:作用|acts:作用|tubular:肾小管的|copd:慢阻肺|regional:区域的|
together:一起|haematological:血液的|haematopoiesis:造血|abcde:ABCDE|leave:离开|
little:少量|acutely:急性地|critically:危重地|mellitus:糖尿|frequency:频率|measured:测量|
observational:观察性的|experimental:实验性的|causation:因果|randomised:随机化的|
need:需要|appraise:评价|guidelines:指南|digests:消化|absorbs:吸收|food:食物|
absorbed:被吸收|oesophagus:食管|stomach:胃|genomics:基因组学|shapes:形态|
abnormalities:异常|rare:罕见的|counselling:咨询|comprehensive:综合的|geriatric:老年医学的|
deprescribing:减停处方|defends:防御|errs:出错|immunodeficiency:免疫缺陷|
transplantation:移植|tumour:肿瘤|immunotherapy:免疫治疗|remain:保持|clinically:临床上|
febrile:发热的|malaria:疟疾|weakened:削弱的|emerging:新发的|raises:提出|hard:困难的|
about:关于|theories:理论|noting:指出|differ:不同|countries:国家|microorganisms:微生物|
world:世界|commonest:最常见的|reasons:原因|see:见|inflammatory:炎症的|vasculitis:血管炎|
neurology:神经病学|move:移动|feel:感觉|communicate:沟通|links:联系|organisation:组织|
multiple:多发的|sclerosis:硬化|spans:跨越|years:年|normal:正常的|problems:问题|
pelvic:盆腔的|small:小的|adults:成人|illnesses:疾病|needs:需要|grow:生长|
neurodevelopmental:神经发育的|haemodynamic:血液动力学的|neoplasia:肿瘤形成|
studies:研究|alters:改变|develops:发展|behind:在之后|oedema:水肿|nutritional:营养的|
pathologist:病理医生|prescribing:处方|pharmacodynamics:药效学|acting:起作用|
interactions:相互作用|differences:差异|developed:开发的|regulated:受调控的|
prescribed:已开处方的|safely:安全地|healthy:健康的|keeps:保持|itself:本身|
stable:稳定的|integrated:整合的|disabling:致残的|self-harm:自伤|suicide:自杀|
framework:框架|living:现存|inequalities:不平等|electrolytes:电解质|internal:内部的|
constant:恒定的|dialysis:透析|delivers:输送|removes:去除|carbon:碳|dioxide:二氧化物|
either:任一|quickly:迅速地|fatal:致命的|main:主要的|specialties:专科|treats:治疗|
operation:手术|looks:外观|orthopaedics:骨科|amino-acid:氨基酸|fatty-acid:脂肪酸|
"""
for _chunk in _PAIRS6.replace('\n', ' ').split('|'):
    _chunk = _chunk.strip()
    if not _chunk:
        continue
    _en, _, _zh = _chunk.partition(':')
    TERM[_en.strip().lower()] = _zh.strip()

_PAIRS7 = """
upper:上|lower:下|limb:肢|limbs:肢体|neuroanatomy:神经解剖|wall:壁|chest:胸|spinal:脊柱的|
cord:索|terms:术语|term:术语|katex:katex|javascript:javascript|textbook:教科书|
text:文本|types:类型|peripheral:外周的|phosphate:磷酸盐|harvey:哈维|lister:李斯特|
koch:科赫|koche:科赫|lister:李斯特|pasteur:巴斯德|roentgen:伦琴|fleming:弗莱明|
discoverer:发现者|guideline:指南|reference:参考|guide:指南|standard:标准|
surface:表面|deep:深的|superficial:浅表的|proximity:邻近|aspect:方面|
"""
for _chunk in _PAIRS7.replace('\n', ' ').split('|'):
    _chunk = _chunk.strip()
    if not _chunk:
        continue
    _en, _, _zh = _chunk.partition(':')
    if _en.strip().lower() not in TERM:
        TERM[_en.strip().lower()] = _zh.strip()

_PAIRS8 = """
organelles:细胞器|organelle:细胞器|cytoskeleton:细胞骨架|junctions:连接|junction:连接|
bilayers:双分子层|bilayer:双分子层|carriers:载体|carrier:载体|lipid:脂质|lipids:脂质|
carbohydrate:碳水化合物|carbohydrates:碳水化合物|law:定律|laws:定律|ecg:心电图|
think:思考|ill:患病|done:完成|act:作用|them:它们|they:它们|their:它们的|
tubular:肾小管的|copd:慢阻肺|regional:区域的|together:一起|haematological:血液学的|
haematopoiesis:造血|leave:离开|little:少量|acutely:急性地|critically:危重地|
mellitus:糖尿病的|frequency:频率|measured:测量的|observational:观察性的|
experimental:实验性的|causation:因果|randomised:随机化的|need:需要|appraise:评价|
guidelines:指南|digests:消化|absorbs:吸收|food:食物|absorbed:被吸收|
oesophagus:食管|stomach:胃|genomics:基因组学|shapes:形态|abnormalities:异常|rare:罕见的|
counselling:咨询|genomic:基因组的|comprehensive:全面的|geriatric:老年医学的|
deprescribing:减少处方|errs:出错|immunodeficiency:免疫缺陷|transplantation:移植|
tumour:肿瘤|immunotherapy:免疫治疗|remain:保持|clinically:临床上|febrile:发热的|
malaria:疟疾|weakened:削弱的|emerging:新出现的|raises:提出|hard:困难的|about:关于|
theories:理论|beginning:开始|noting:指出|differ:不同|countries:国家|
microorganisms:微生物|world:世界|commonest:最常见的|reasons:原因|inflammatory:炎症的|
vasculitis:血管炎|neurology:神经病学|move:移动|feel:感觉|communicate:交流|links:联系|
organisation:组织|multiple:多发的|sclerosis:硬化|spans:跨越|years:年|normal:正常的|
problems:问题|pelvic:盆腔的|small:小的|adults:成人|illnesses:疾病|needs:需要|grow:生长|
neurodevelopmental:神经发育的|haemodynamic:血液动力学的|neoplasia:肿瘤形成|
studies:研究|alters:改变|develops:发展|behind:在之后|oedema:水肿|nutritional:营养的|
pathologist:病理医生|prescribing:处方|pharmacodynamics:药效学|acting:起作用|
interactions:相互作用|differences:差异|developed:开发的|regulated:受调控的|
prescribed:已开具的|safely:安全地|healthy:健康的|keeps:保持|itself:自身|stable:稳定的|
integrated:整合的|disabling:致残的|self-harm:自伤|suicide:自杀|framework:框架|
living:生存的|inequalities:不平等|electrolytes:电解质|keep:保持|internal:内部的|
constant:恒定的|dialysis:透析|delivers:输送|removes:清除|carbon:碳|dioxide:氧化物|
either:任一|quickly:迅速地|fatal:致命的|main:主要的|specialties:专科|treats:治疗|
operation:手术|looks:外观|orthopaedics:骨科|causes:病因|cause:原因|abcde:ABCDE|
"""
for _chunk in _PAIRS8.replace('\n', ' ').split('|'):
    _chunk = _chunk.strip()
    if not _chunk:
        continue
    _en, _, _zh = _chunk.partition(':')
    if _en.strip().lower() not in TERM:
        TERM[_en.strip().lower()] = _zh.strip()

_PAIRS9 = """
course:课程|discovery:发现|action:作用|rigorous:严谨的|recognising:识别|assisted:辅助的|
fibrosis:纤维化|syndrome:综合征|syndromes:综合征|information:信息|support:支持|
alcohol:酒精|ischaemic:缺血的|aldosterone:醛固酮|curves:曲线|association:关联|
monitoring:监测|mri:磁共振成像|coagulation:凝血|type:类型|advanced:高级的|
therapeutic:治疗的|cerebellum:小脑|insulin:胰岛素|opportunistic:机会性的|
sensitivity:敏感性|likelihood:可能性|ratios:比值|mechanical:机械的|replication:复制|
perinatal:围产期的|neuroinflammation:神经炎症|errors:错误|protection:保护|dying:死亡|
duties:职责|parathyroid:甲状旁腺|venous:静脉的|thromboembolism:血栓栓塞|
tobacco:烟草|sequencing:测序|output:输出|sensation:感觉|vision:视力|present:表现|
reporting:报告|preoperative:术前的|formation:形成|count:计数|film:薄膜|dna:脱氧核糖核酸|
scores:评分|escalation:升级|crisis:危象|pleural:胸膜的|electrophysiology:电生理学|
autoregulation:自身调节|relief:缓解|pacemaker:起搏器|conducting:传导的|reading:阅读|
supporting:支持|phagocytes:吞噬细胞|complement:补体|start:启动|remodelling:重塑|
synovial:滑膜的|ganglia:神经节|economic:经济的|practical:实用的|prolactin:催乳素|
megaloblastic:巨幼细胞的|haemolytic:溶血的|reflux:反流|peptic:消化性的|helicobacter:幽门螺杆菌|
pylori:幽门|dyspepsia:消化不良|meiosis:减数分裂|organised:有组织的|reversible:可逆的|
compartments:腔室|osmolality:渗透摩尔浓度|composition:组成|bipolar:双相的|
fertilisation:受精|gastrulation:原肠形成|malformations:畸形|pumps:泵|osmosis:渗透|
models:模型|listening:倾听|shared:共享的|cerebrovascular:脑血管的|preterm:早产的|
agonists:激动剂|antagonists:拮抗剂|dose:剂量|potency:效价|efficacy:疗效|
perfusion:灌注|matching:匹配|mhc:主要组织相容性复合体|intracranial:颅内|
transient:短暂的|attack:发作|assess:评估|levels:水平|behaviour:行为|strategies:策略|
urine:尿|microcirculation:微循环|baroreflex:压力感受器反射|hypothyroidism:甲状腺功能减退|
nodules:结节|pharmacogenomics:药物基因组学|beneficence:行善|evasion:逃避|
abscesses:脓肿|asepsis:无菌|focused:专注的|large:大的|structural:结构的|
rearrangements:重排|down:唐氏|natural:自然的|antiretroviral:抗逆转录病毒的|
propagation:传播|generalised:全身性的|panic:惊恐|obsessive:强迫的|compulsive:强迫的|
great:大的|mediastinum:纵隔|sickle:镰状|thalassaemias:地中海贫血|kinetics:动力学|
inhibition:抑制|vasopressors:血管升压药|cohort:队列|irritable:易激的|
diverticular:憩室的|caesarean:剖宫产|routes:途径|administration:给药|
bioavailability:生物利用度|centres:中枢|spirometry:肺量计测定|pulse:脉搏|
oximetry:血氧测定|helper:辅助的|cytotoxic:细胞毒的|immunological:免疫学的|
valid:有效的|who:世界卫生组织|lack:缺乏|prematurity:早产|benefits:获益|harms:危害|
renin:肾素|angiotensin:血管紧张素|hyponatraemia:低钠血症|hypernatraemia:高钠血症|
adrenaline:肾上腺素|insufficiency:功能不全|phaeochromocytoma:嗜铬细胞瘤|
immobility:固定|synaptic:突触的|pedigrees:系谱|penetrance:外显率|expressivity:表现度|
virus:病毒|latency:潜伏期|psychoses:精神病|survey:调查|peritoneum:腹膜|
glycolysis:糖酵解|citric:柠檬酸|oxidative:氧化性的|phosphorylation:磷酸化|
gluconeogenesis:糖异生|glycogen:糖原|selection:选择|criteria:标准|pathogenesis:发病机制|
latent:潜伏的|granulomas:肉芽肿|regeneration:再生|cytochrome:细胞色素|clearance:清除率|
haemophilia:血友病|von:冯|willebrand:维勒布兰德|colon:结肠|regulatory:调节的|
disclosure:披露|data:数据|breastfeeding:母乳喂养|postpartum:产后|herd:群体|
design:设计|obstructive:阻塞性的|mendel:孟德尔|migraine:偏头痛|dangerous:危险的|
evaluating:评价|mitochondrial:线粒体的|imprinting:印记|mosaic:嵌合的|managing:管理|
caring:照护|medically:医学上|protozoa:原生动物|spondyloarthritis:脊柱关节炎|
crystal:晶体|excitation:兴奋|coupling:偶联|skeletal:骨骼的|smooth:平滑的|
opioids:阿片类|dependence:依赖|perforation:穿孔|floor:底|anticoagulation:抗凝|
angina:心绞痛|synthesis:合成|ketone:酮体|cholesterol:胆固醇|lipoproteins:脂蛋白|
urea:尿素|probabilistic:概率的|predictive:预测的|values:数值|dengue:登革热|
typhoid:伤寒|travellers:旅行者|tropics:热带|infarction:梗死|loading:负荷|
window:窗口|thrombophilia:易栓症|anticoagulant:抗凝药|antiplatelet:抗血小板药|
antidotes:解毒药|services:服务|allergy:过敏|miscarriage:流产|ectopic:异位|
dehydration:脱水|acidosis:酸中毒|alkalosis:碱中毒|bilirubin:胆红素|influenza:流感|
diabetic:糖尿病的|ketoacidosis:酮酸中毒|multifactorial:多因素的|heritability:遗传度|
flora:菌群|parasympathetic:副交感的|divisions:分支|transmitters:递质|
hernia:疝|vertebral:椎的|column:柱|shoulder:肩|forearm:前臂|brachial:臂的|
fasting:禁食|glucagon:胰高血糖素|starvation:饥饿|ranges:范围|blinding:盲法|
gonorrhoea:淋病|syphilis:梅毒|herpes:疱疹|papillomavirus:乳头瘤病毒|lupus:狼疮|
myositis:肌炎|vasculitides:血管炎|carcinogenesis:致癌|metastasis:转移|
adrenergic:肾上腺素能的|bulimia:贪食|nervosa:神经性|hernias:疝|colorectal:结直肠的|
hepatobiliary:肝胆的|myeloid:髓系的|autoantibodies:自身抗体|withholding:不给予|
withdrawing:撤除|debates:争论|cystic:囊性的|diet:饮食|activity:活动|
neoplasms:肿瘤|osteoporosis:骨质疏松|viral:病毒的|hepatitis:肝炎|cirrhosis:肝硬化|
oncogenes:癌基因|microscopy:显微镜检查|culture:培养|antibody:抗体|
neurodevelopment:神经发育|classes:类别|measurement:测量|sarcoidosis:结节病|
thigh:大腿|knee:膝|leg:腿|foot:足|macronutrients:宏量营养素|intervals:间隔|
absolute:绝对的|statistical:统计的|catheter:导管|difficile:难辨的|resistant:耐药的|
stenosis:狭窄|diagnosing:诊断|classifying:分类|atrial:心房的|fibrillation:颤动|
nuclear:核的|holistic:整体的|fairness:公平|rationing:配给|painful:疼痛的|
endometriosis:子宫内膜异位|fibroids:肌瘤|polycystic:多囊的|adhd:注意缺陷多动障碍|
markers:标志物|pharmacovigilance:药物警戒|pollution:污染|climate:气候|
hodgkin:霍奇金|hypothalamic:下丘脑的|gonadal:性腺的|glomerulonephritis:肾小球肾炎|
skull:颅骨|cranial:颅的|orbit:眼眶|pharynx:咽|larynx:喉|valvular:瓣膜的|
transcription:转录|translation:翻译|teamwork:团队|gallstones:胆结石|cholecystitis:胆囊炎|
pancreatitis:胰腺炎|pancreatic:胰腺的|karyotyping:核型分析|microarrays:微阵列|
neutropenia:中性粒细胞减少|recipients:受者|antibacterial:抗细菌的|antiviral:抗病毒的|
antifungal:抗真菌的|eczema:湿疹|psoriasis:银屑病|acne:痤疮|neurone:神经元|
pneumothorax:气胸|ischaemia:缺血|bladder:膀胱|stenotic:狭窄的|regurgitant:反流的|
infective:感染性的|endocarditis:心内膜炎|breathlessness:呼吸困难|graft:移植物|
immunosuppression:免疫抑制|committees:委员会|abuses:滥用|endometrial:子宫内膜的|
ovarian:卵巢的|adolescence:青春期|burden:负担|international:国际的|
hyperosmolar:高渗的|electrolyte:电解质的|disturbances:紊乱|brainstem:脑干|
compatibility:相容性|messengers:信使|applying:应用|enteral:肠内的|parenteral:肠外的|
carcinoma:癌|melanoma:黑色素瘤|neuropathies:神经病|myasthenia:重症肌无力|
gravis:重症|myopathies:肌病|thermoregulation:体温调节|altitude:高原|
stones:结石|dislocations:脱位|replacement:置换|sports:运动|dissection:夹层|
incident:事件|improvement:改进|disaster:灾难|editing:编辑|planning:计划|
breaking:打破|families:家庭|monoclonal:单克隆|checkpoint:检查点|candour:坦诚|
sterilisation:绝育|disinfection:消毒|precautions:预防措施|neglect:忽视|
cytology:细胞学|stains:染色|immunohistochemistry:免疫组织化学|autopsy:尸检|
financing:筹资|organising:组织|priority:优先|setting:设定|ventilatory:通气的|
hippocrates:希波克拉底|vesalius:维萨里|students:学生|gray:格雷|moore:摩尔|
rushington:拉辛顿|grays:格雷氏|standring:斯坦德林|moore:摩尔|
"""
for _chunk in _PAIRS9.replace('\n', ' ').split('|'):
    _chunk = _chunk.strip()
    if not _chunk:
        continue
    _en, _, _zh = _chunk.partition(':')
    if _en.strip().lower() not in TERM:
        TERM[_en.strip().lower()] = _zh.strip()

_PAIRS10 = """
error:误差|heavy:重的|mendelian:孟德尔的|steady:稳定的|abuse:滥用|active:活跃的|
allergic:过敏的|along:沿着|arises:出现|arterial:动脉的|bony:骨的|burns:烧伤|
case:病例|cellular:细胞的|cerebral:大脑的|colonisation:定植|combining:结合|
concerns:关注|controlled:受控的|device:装置|disc:椎间盘|examples:示例|face:面|
features:特征|four:四|groups:组|hallmarks:标志|important:重要的|inborn:先天的|
individual:个体|mosaicism:嵌合|myeloproliferative:骨髓增殖性的|
neurodegeneration:神经退变|news:消息|options:选择|palsy:瘫痪|pandemic:大流行|
papers:论文|power:力量|preparedness:准备|preventing:预防|products:产物|
raising:提升|rational:理性的|responding:应答|review:综述|second:第二|severe:严重的|
spreads:扩散|stimulation:刺激|stopping:停止|storm:风暴|subfertility:生育力低下|
team:团队|teams:团队|versus:对比|warning:警告|
"""
for _chunk in _PAIRS10.replace('\n', ' ').split('|'):
    _chunk = _chunk.strip()
    if not _chunk:
        continue
    _en, _, _zh = _chunk.partition(':')
    if _en.strip().lower() not in TERM:
        TERM[_en.strip().lower()] = _zh.strip()

_PAIRS11 = """
error:误差|heavy:重的|mendelian:孟德尔的|steady:稳定的|abuse:滥用|active:活跃的|
allergic:过敏的|along:沿着|arises:出现|arterial:动脉的|bony:骨的|burns:烧伤|
case:病例|cellular:细胞的|cerebral:大脑的|colonisation:定植|combining:结合|
concerns:关注|controlled:受控的|device:装置|disc:椎间盘|examples:示例|face:面部|
features:特征|four:四|groups:组|hallmarks:标志|important:重要的|inborn:先天的|
individual:个体|mosaicism:嵌合体|myeloproliferative:骨髓增殖性的|
neurodegeneration:神经退变|news:消息|options:选项|palsy:瘫痪|pandemic:大流行|
papers:论文|power:权力|preparedness:防备|preventing:预防|products:产物|
raising:提升|rational:理性的|responding:回应|review:综述|second:第二|severe:严重的|
spreads:扩散|stimulation:刺激|stopping:停止|storm:风暴|subfertility:生育力低下|
team:团队|teams:团队|versus:对照|warning:警告|question:问题
"""
for _chunk in _PAIRS11.replace('\n', ' ').split('|'):
    _chunk = _chunk.strip()
    if not _chunk:
        continue
    _en, _, _zh = _chunk.partition(':')
    if _en.strip().lower() not in TERM:
        TERM[_en.strip().lower()] = _zh.strip()

_PAIRS12 = """
non:非|associated:相关的|site:部位|baroreflex:压力感受器反射|healthcare:医疗保健|
communicable:可传播的|healthcare-associated:医疗保健相关的|surgical-site:手术部位的|
infection-control:感染控制|control:控制|text:文本|meta:元|abcde:ABCDE|
katex:KaTeX|javascript:JavaScript|plot:绘图|slopefield:斜率场|phaseplane:相平面|
odesolver:微分方程求解器|montecarlo:蒙特卡洛|markov:马尔可夫|distribution:分布|
clt:中心极限定理|monte:蒙特|carlo:卡洛|phase:相|plane:平面|slope:斜率|
"""
for _chunk in _PAIRS12.replace('\n', ' ').split('|'):
    _chunk = _chunk.strip()
    if not _chunk:
        continue
    _en, _, _zh = _chunk.partition(':')
    if _en.strip().lower() not in TERM:
        TERM[_en.strip().lower()] = _zh.strip()
