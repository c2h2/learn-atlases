# Chinese translation guide (简体中文)

Target: mainland Simplified Chinese, neutral encyclopedic register, faithful to the
English record. Translate meaning, not word order; never add, drop or soften facts,
numbers, dates or caveats.

## Mechanics

- Work on `data/i18n/zh/peptides/<slug>.json` (skeleton pre-filled with English).
  Replace every English value with Chinese. Keep keys, list lengths and order exactly.
- Edit with Python (`json.load` → replace → `json.dump(..., ensure_ascii=False, indent=2)`)
  so the JSON stays valid. Check with `python3 tools/i18n_skeleton.py --check`.
- `short` labels (e.g. `Aib`, `C18 diacid`, `K34R`) may stay as they are if they are
  codes; translate descriptive ones (`C18 diacid` → `C18二酸`).
- `market.figures[].value`: keep the figure, translate words (`DKK 120.3 bn` →
  `1203亿丹麦克朗`). `source`: translate generic words, keep document titles recognisable
  (`Novo Nordisk Annual Report 2024` → `诺和诺德2024年年报`).

## Typography

- Chinese full-width punctuation in Chinese sentences: ，。；：（）“”、
- Keep half-width characters inside Latin terms, numbers and units: `2.4 mg`, `HbA1c`,
  `SUSTAIN-6`, `GLP-1`, `20%`, `17,604`.
- No space between Chinese characters and adjacent Chinese punctuation; one space is not
  needed between Chinese and Latin/numbers either (write `2.4 mg每周一次`, `超过200篇论文`).
- Dates in prose: `2017年12月5日`, `2018年2月`, `20世纪90年代`.
- Units: 周、天、小时、年; keep `mg`, `μg`, `kDa`, `Å` as symbols.
- Clinical phases with Roman numerals: I期、II期、III期、IV期; "phase 1/2" → I/II期.
- People's names stay in Latin script (Svetlana Mojsov, Frederick Banting). Nobel Prize → 诺贝尔奖.

## Peptide names (`name` field and in running text)

| slug | `name` | notes |
|---|---|---|
| semaglutide | 司美格鲁肽 | |
| tirzepatide | 替尔泊肽 | |
| retatrutide | 瑞他鲁肽 | |
| liraglutide | 利拉鲁肽 | |
| exenatide | 艾塞那肽 | exendin-4 → 毒蜥外泌肽-4（exendin-4） |
| survodutide | Survodutide | no settled Chinese name; keep Latin |
| mazdutide | 玛仕度肽 | |
| insulin | 胰岛素 | lispro 赖脯胰岛素, aspart 门冬胰岛素, glulisine 赖谷胰岛素, glargine 甘精胰岛素, detemir 地特胰岛素, degludec 德谷胰岛素, icodec 依柯胰岛素（insulin icodec）; keep efsitora in Latin script (insulin efsitora alfa), NPH 中性鱼精蛋白锌胰岛素（NPH） |
| c-peptide | C肽 | 连接肽 = connecting peptide. First mention in prose: C肽（C-peptide）. Keep CBX129801, Ersatta and GPR146 in Latin script. HLA-DQ8 stays as HLA-DQ8 |
| glucagon | 胰高血糖素 | keep dasiglucagon in Latin script |
| pramlintide | 普兰林肽 | amylin 胰淀素 |
| cagrilintide | 卡格列肽 | CagriSema 卡格列肽/司美格鲁肽复方（CagriSema） |
| eloralintide | Eloralintide | no settled Chinese name (Chinese media keep the Latin name); keep Latin. EloraTZP and macupatide also stay in Latin script; thioacetal 硫缩醛 |
| teriparatide | 特立帕肽 | abaloparatide 阿巴洛肽; PTH 甲状旁腺激素 |
| octreotide | 奥曲肽 | somatostatin 生长抑素 |
| leuprolide | 亮丙瑞林 | GnRH 促性腺激素释放激素 |
| mots-c | MOTS-c | |
| ss-31 | Elamipretide（SS-31） | in text: elamipretide（SS-31） |
| humanin | Humanin | 线粒体衍生肽 = mitochondrial-derived peptide |
| epitalon | Epitalon | |
| ghk-cu | GHK-Cu（铜肽） | |
| bpc-157 | BPC-157 | |
| tb-500 | TB-500 / 胸腺肽β4 | thymosin β4 → 胸腺肽β4 |
| kpv | KPV | |
| ll-37 | LL-37 | cathelicidin → 抗菌肽cathelicidin |
| thymosin-alpha-1 | 胸腺肽α1 | thymalfasin → 胸腺法新 |
| semax | Semax | |
| selank | Selank | |
| dsip | δ睡眠诱导肽（DSIP） | |
| cyclosporine | 环孢素 | |
| ipamorelin | 伊帕瑞林 | |
| cjc-1295 | CJC-1295 | |
| sermorelin | 舍莫瑞林 | |
| tesamorelin | 替莫瑞林 | |
| ghrp-6 | GHRP-6 | |
| ghrp-2 | GHRP-2（普拉莫瑞林） | |
| aod-9604 | AOD-9604 | |
| melanotan-ii | 美拉诺坦 II | |
| bremelanotide | 布美诺肽（PT-141） | |
| afamelanotide | 阿法诺肽 | |
| setmelanotide | Setmelanotide | keep Latin |
| oxytocin | 催产素（缩宫素） | carbetocin 卡贝缩宫素 |
| vasopressin | 血管加压素（抗利尿激素） | desmopressin 去氨加压素, terlipressin 特利加压素 |
| kisspeptin | Kisspeptin | |

Brand names stay in Latin script. Where a product has an established Chinese brand name you
may add it once in brackets: Ozempic（诺和泰）, Wegovy（诺和盈）, Victoza（诺和力）,
Mounjaro（穆峰达）, Byetta（百泌达）, 信尔美 (mazdutide), Humulin（优泌林）, Lantus（来得时）,
Humalog（优泌乐）, NovoRapid（诺和锐）, Sandostatin（善宁）, Forteo（复泰奥）,
Sandimmun（山地明）, Neoral（新山地明）, Zadaxin（日达仙）.

## Organisations

诺和诺德 Novo Nordisk · 礼来 Eli Lilly · 勃林格殷格翰 Boehringer Ingelheim · 信达生物 Innovent ·
阿斯利康 AstraZeneca · 赛诺菲 Sanofi · 辉瑞 Pfizer · 诺华 Novartis · 山德士 Sandoz · 武田 Takeda ·
艾伯维 AbbVie · 雅培 Abbott · 益普生 Ipsen · 辉凌 Ferring · 默沙东 Merck/MSD · 罗氏 Roche ·
基因泰克 Genentech · 梯瓦 Teva · 太阳制药 Sun Pharma · 瑞迪博士 Dr Reddy's · 雪兰诺 Serono ·
赛生药业 SciClone. Smaller companies keep their Latin names (Palatin, Rhythm, Clinuvel,
Theratechnologies, Stealth BioTherapeutics, CohBar, Pliva, ConjuChem, Zealand Pharma, Amylin
Pharmaceuticals, Helsinn, RegeneRx…).

美国食品药品监督管理局（FDA）(later just FDA) · 欧洲药品管理局（EMA） · 欧盟委员会 ·
人用药品委员会（CHMP） · 英国药品和保健品监管局（MHRA） · 英国国家卫生与临床优化研究所（NICE） ·
中国国家药品监督管理局（NMPA） · 日本厚生劳动省 · 日本医药品医疗器械综合机构（PMDA） ·
加拿大卫生部 · 澳大利亚治疗用品管理局（TGA） · 巴西国家卫生监督局（Anvisa） ·
世界卫生组织（WHO） · 世界反兴奋剂机构（WADA） · 美国卫生与公众服务部（HHS） ·
美国国立卫生研究院（NIH） · ClinicalTrials.gov stays as is.
WADA Prohibited List → 禁用清单; S0 → S0类（未获批准物质）; S2 → S2类（肽类激素、生长因子及相关物质）.
FDA 503A bulks list → 503A原料药清单; "Category 2" → 第2类（存在重大安全风险）.

## Terms

| English | 中文 |
|---|---|
| peptide / residue / amino acid | 肽 / 残基 / 氨基酸 |
| D-amino acid / non-canonical residue | D型氨基酸 / 非天然氨基酸 |
| disulfide bridge / lactam bridge / cyclic | 二硫键 / 内酰胺桥 / 环状 |
| lipidation / fatty diacid / linker | 脂化 / 脂肪二酸 / 连接子 |
| albumin binding | 白蛋白结合 |
| receptor agonist / antagonist | 受体激动剂 / 拮抗剂 |
| incretin | 肠促胰素 |
| GLP-1 / GIP / DPP-4 | 胰高血糖素样肽-1（GLP-1） / 葡萄糖依赖性促胰岛素多肽（GIP） / 二肽基肽酶-4（DPP-4） |
| type 2 diabetes | 2型糖尿病 |
| obesity / overweight / weight management | 肥胖 / 超重 / 体重管理 |
| HbA1c / hypoglycaemia | 糖化血红蛋白（HbA1c） / 低血糖 |
| cardiovascular events (MACE) | 主要不良心血管事件（MACE） |
| MASH / NASH | 代谢功能障碍相关脂肪性肝炎（MASH） / 非酒精性脂肪性肝炎（NASH） |
| chronic kidney disease | 慢性肾脏病 |
| HFpEF | 射血分数保留的心力衰竭（HFpEF） |
| obstructive sleep apnoea | 阻塞性睡眠呼吸暂停 |
| growth hormone / GHRH / ghrelin | 生长激素 / 生长激素释放激素（GHRH） / 胃饥饿素（ghrelin） |
| secretagogue | 促分泌剂 |
| melanocortin / α-MSH / MC4R | 黑皮质素 / α-促黑素细胞激素（α-MSH） / 黑皮质素4受体（MC4R） |
| mitochondria / cardiolipin | 线粒体 / 心磷脂 |
| randomised controlled trial / double-blind / placebo | 随机对照试验 / 双盲 / 安慰剂 |
| primary endpoint / meta-analysis / case series | 主要终点 / 荟萃分析 / 病例系列 |
| approval / accelerated approval / conditional marketing authorisation | 批准（获批） / 加速批准 / 附条件上市许可 |
| orphan drug / breakthrough therapy | 孤儿药 / 突破性疗法 |
| generic / biosimilar | 仿制药 / 生物类似药 |
| compounding / compounded | 药房调配 / 调配制剂 |
| off-label | 超说明书使用 |
| grey market / "research chemical" / counterfeit | 灰色市场 / “仅供研究”化学品 / 假冒 |
| boxed warning / contraindication | 黑框警告 / 禁忌证 |
| subcutaneous / intravenous / intranasal / oral | 皮下注射 / 静脉注射 / 鼻腔给药 / 口服 |
| half-life / bioavailability | 半衰期 / 生物利用度 |
| in vitro / animal studies | 体外 / 动物研究 |
| anti-doping / prohibited in sport | 反兴奋剂 / 体育禁用 |
