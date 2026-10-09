# Earth & Climate Atlas — Chinese translation guide (简体中文)

Target: mainland Simplified Chinese as used in Chinese university textbooks of the Earth and
atmospheric sciences (e.g. 《普通地质学》, 盛裴轩等《大气物理学》, 周淑贞《气象学与气候学》,
朱乾根等《天气学原理和方法》, 冯士筰等《海洋科学导论》), with the terms approved by 全国科学技术名词审定委员会
(《地质学名词》《大气科学名词》《海洋科学名词》《地理学名词》, searchable at 术语在线, termonline.cn) and, for
climate, the wording of the official Chinese translations of the IPCC AR6 reports. Neutral, precise
textbook register. Faithful to the English: never add, drop or change science, numbers, units,
conditions, uncertainty ranges or caveats. Translate meaning, not word order.

## Files

```
content/zh/<course>/course.json   overlay: ONLY the translatable fields, same structure and list order
content/zh/<course>/<chapter>.md  full translation of content/en/<course>/<chapter>.md
content/zh/_data/milestones.json  overlay of data/milestones.json (title and detail of each milestone)
```

`course.json` overlay keys: `title`, `full_title`, `tagline`, `summary`, `overview` (list),
`outcomes` (list), `chapters` (list of `{"title", "summary"}` in the same order), `history`
(list of `{"title", "detail"}` in the same order — keep `people` names in Latin script; do not
include `year`), `references` (list of `{"note"}` — book titles and authors stay as published).
Do not copy slugs, ids or other untranslated fields.

## Markup must stay identical

The Chinese lesson must have **exactly the same block structure** as the English one:

- the same headings in the same order, with the same `{#id}` if the English has one;
- every `:::kind` block in the same order with the same `{#id …}` attributes, `level=` and
  `check="…"` values unchanged; the same nesting (solutions, hints, quiz options with `[x]`/`[ ]`);
- every `$…$` and `$$…$$` formula unchanged, except words inside `\text{…}`, which are translated
  (`\text{if } x>0` → `\text{当 } x>0`); keep `{#eq-…}` labels;
- every `:::widget` block: keep the type and every key/value exactly; translate only `caption:`
  and `title:` values, and words inside `\text{…}` in `labels:` (legend labels are TeX:
  `labels: T(t); \text{equilibrium}` → `labels: T(t); \text{平衡态}`);
- references `[[…]]` unchanged (their link text is generated in Chinese automatically); a custom
  label `[[target|text]]` gets its `text` translated;
- tables keep their columns; code blocks are not translated (comments in code may be).

`tools/check.php` compares the numbered blocks and anchors of each Chinese lesson with the English
one and reports any difference as an ERROR.

## Typography

- Full-width Chinese punctuation in Chinese sentences: ，。；：？！（）“”、
- Write inline formulas and numbers directly next to Chinese characters, without spaces:
  `位温$\theta$随高度增加`. The site adds a thin space around inline formulas in Chinese text.
- Bold `**…**` for the defined term at its definition, as in the English.
- Numbers, units and Latin abbreviations keep half-width characters. Unit symbols are not
  translated: `W m⁻²`, `hPa`, `ppm`, `‰`, `Sv`, `Gt C`, `mm yr⁻¹`, `Ma` stay as written. Large
  numbers use 万 and 亿 in prose: 4.5 billion years → 45亿年; 66 million years ago → 距今6600万年
  (where the English writes "66 Ma", keep `66 Ma`).
- People's names stay in Latin script on first mention with the standard Chinese transliteration
  in brackets where one exists: 赫顿（Hutton）, 莱伊尔（Lyell）, 阿加西（Agassiz）, 魏格纳（Wegener）,
  霍姆斯（Holmes）, 米兰科维奇（Milankovitch）, 丁达尔（Tyndall）, 阿伦尼乌斯（Arrhenius）, 基林（Keeling）,
  科里奥利（Coriolis）, 罗斯贝（Rossby）, 埃克曼（Ekman）, 哈得来（Hadley）, 皮叶克尼斯（Bjerknes）,
  斯托梅尔（Stommel）, 达西（Darcy）, 古登堡（Gutenberg）, 里克特（Richter）, 莫霍洛维奇（Mohorovičić）,
  莱曼（Lehmann）. In history blocks give the Chinese name followed by the Latin name in brackets.
- Book, report and paper titles: Chinese title in 《》 followed by the original in brackets when well
  known; treaties too: 《蒙特利尔议定书》（Montreal Protocol）, 《巴黎协定》（Paris Agreement）.
- Place names follow mainland usage (中国台湾、中国香港; 南海, 东海); oceans and well-known features use
  their standard Chinese names (南大洋, 青藏高原, 东非大裂谷, 圣安德烈斯断层, 大西洋中脊).

## Terminology — mathematics and statistics

The same terms as Maths Atlas (`/var/www/f.g77k.com/learn/maths/tools/TRANSLATION_GUIDE_ZH.md` has
the full table); those that Earth and climate lessons use most:

| English | 中文 |
|---|---|
| derivative / differentiable / differential | 导数 / 可导（可微） / 微分 |
| integral / definite / improper integral | 积分 / 定积分 / 反常积分 |
| partial derivative / gradient / directional derivative | 偏导数 / 梯度 / 方向导数 |
| line integral / surface integral / flux / divergence / curl | 曲线积分 / 曲面积分 / 通量 / 散度 / 旋度 |
| ordinary / partial differential equation | 常微分方程 / 偏微分方程 |
| initial value problem / boundary value problem | 初值问题 / 边值问题 |
| phase plane / equilibrium / stability | 相平面 / 平衡点 / 稳定性 |
| slope field / equilibrium solution | 斜率场 / 平衡解 |
| heat / wave / Laplace equation / separation of variables | 热方程 / 波动方程 / 拉普拉斯方程 / 分离变量法 |
| Fourier series / Fourier transform | 傅里叶级数 / 傅里叶变换 |
| Euler's method / step size / Runge–Kutta | 欧拉法 / 步长 / 龙格-库塔法 |
| random variable / distribution / density / expectation / variance | 随机变量 / 分布 / 密度 / 数学期望 / 方差 |
| normal / exponential / Poisson distribution | 正态分布 / 指数分布 / 泊松分布 |
| estimator / maximum likelihood / confidence interval | 估计量 / 最大似然 / 置信区间 |
| hypothesis test / null hypothesis / p-value / significance level | 假设检验 / 原假设 / p 值 / 显著性水平 |
| regression / least squares / residual / trend | 回归 / 最小二乘 / 残差 / 趋势 |
| interpolation / quadrature / Newton's method | 插值 / 数值积分（求积） / 牛顿法 |
| mean / median | 均值（数学期望） / 中位数 |

### Earth and climate terms

| English | 中文 |
|---|---|
| Earth system / sphere (atmosphere, hydrosphere, cryosphere, biosphere, lithosphere) / reservoir / flux / residence time | 地球系统 / 圈层（大气圈、水圈、冰冻圈、生物圈、岩石圈） / 储库 / 通量 / 滞留时间 |
| mineral / rock / crystal / unit cell / crystal system | 矿物 / 岩石 / 晶体 / 晶胞 / 晶系 |
| silicate / quartz / feldspar / mica / olivine / pyroxene / amphibole | 硅酸盐 / 石英 / 长石 / 云母 / 橄榄石 / 辉石 / 角闪石 |
| polarising microscope / thin section / birefringence / phase diagram / eutectic / solid solution | 偏光显微镜 / 薄片 / 双折射 / 相图 / 共结点（低共熔点） / 固溶体 |
| igneous / sedimentary / metamorphic rock / metamorphic grade / metamorphic facies | 火成岩（岩浆岩） / 沉积岩 / 变质岩 / 变质程度 / 变质相 |
| magma / lava / partial melting / fractional crystallisation | 岩浆 / 熔岩 / 部分熔融 / 分离结晶 |
| plate tectonics / continental drift / seafloor spreading / divergent / convergent / transform boundary | 板块构造 / 大陆漂移 / 海底扩张 / 离散型 / 汇聚型 / 转换型板块边界 |
| subduction zone / mid-ocean ridge / trench / hotspot / mantle plume | 俯冲带 / 洋中脊 / 海沟 / 热点 / 地幔柱 |
| crust / mantle / outer core / inner core / Moho / lithosphere / asthenosphere | 地壳 / 地幔 / 外核 / 内核 / 莫霍面 / 岩石圈 / 软流圈 |
| stress / strain / rheology / brittle / ductile | 应力 / 应变 / 流变学 / 脆性 / 韧性 |
| fault / normal / reverse / thrust / strike-slip fault | 断层 / 正断层 / 逆断层 / 逆冲断层 / 走滑断层 |
| fold / anticline / syncline / joint / foliation / cleavage / lineation | 褶皱 / 背斜 / 向斜 / 节理 / 面理 / 劈理 / 线理 |
| shear zone / mylonite / orogen / orogeny / rift | 剪切带 / 糜棱岩 / 造山带 / 造山作用 / 裂谷 |
| hypocentre (focus) / epicentre / magnitude / moment magnitude / intensity | 震源 / 震中 / 震级 / 矩震级 / 烈度 |
| P wave / S wave / surface wave / seismic moment / focal mechanism | P波（纵波） / S波（横波） / 面波 / 地震矩 / 震源机制 |
| gravity anomaly / geoid / isostasy / flexure / post-glacial rebound / heat flow / mantle convection | 重力异常 / 大地水准面 / 均衡（地壳均衡） / 挠曲 / 冰后回弹 / 热流 / 地幔对流 |
| geomagnetic field / geodynamo / magnetic reversal / palaeomagnetism / apparent polar wander | 地磁场 / 地球发电机 / 地磁倒转（极性倒转） / 古地磁学 / 视极移 |
| relative / absolute age / radiometric dating / half-life / decay constant / isochron | 相对年代 / 绝对年代 / 放射性同位素测年 / 半衰期 / 衰变常数 / 等时线 |
| superposition / cross-cutting relationships / unconformity | 地层叠覆律（地层层序律） / 切割律 / 不整合 |
| eon / era / period / epoch / age (geochronologic units) | 宙 / 代 / 纪 / 世 / 期 |
| eonothem / erathem / system / series / stage (chronostratigraphic units) | 宇 / 界 / 系 / 统 / 阶 |
| Hadean / Archaean / Proterozoic / Phanerozoic / Palaeozoic / Mesozoic / Cenozoic / Quaternary / Holocene | 冥古宙 / 太古宙 / 元古宙 / 显生宙 / 古生代 / 中生代 / 新生代 / 第四纪 / 全新世 |
| fossil / trace fossil / index fossil / mass extinction / Cambrian explosion | 化石 / 遗迹化石 / 标准化石 / 集群灭绝（大灭绝） / 寒武纪大爆发 |
| Great Oxidation Event / banded iron formation / Snowball Earth | 大氧化事件 / 条带状铁建造 / 雪球地球 |
| weathering / erosion / denudation / mass wasting | 风化 / 侵蚀 / 剥蚀 / 块体运动 |
| sediment / grain size / sorting / sediment transport / bedload / suspended load | 沉积物 / 粒度 / 分选 / 沉积物搬运（泥沙输移） / 推移质 / 悬移质 |
| cross-bedding / ripple marks / turbidite / facies / depositional environment / Walther’s law | 交错层理 / 波痕 / 浊积岩 / 相（沉积相） / 沉积环境 / 瓦尔特相律 |
| stratigraphy / sequence stratigraphy / systems tract / accommodation | 地层学 / 层序地层学 / 体系域 / 可容纳空间 |
| diagenesis / lithification / evaporite / carbonate platform | 成岩作用 / 石化作用 / 蒸发岩 / 碳酸盐台地 |
| landform / hillslope / landslide / debris flow / cosmogenic nuclide | 地貌（地形） / 坡面 / 滑坡 / 泥石流 / 宇生核素 |
| drainage basin (catchment) / drainage network / knickpoint / base level | 流域 / 水系（河网） / 裂点 / 侵蚀基准面 |
| floodplain / meandering / braided river / delta / estuary | 河漫滩 / 曲流河 / 辫状河 / 三角洲 / 河口湾 |
| aeolian / dune / loess / moraine / cirque / periglacial / permafrost / active layer / ground ice | 风成 / 沙丘 / 黄土 / 冰碛 / 冰斗 / 冰缘 / 多年冻土 / 活动层 / 地下冰 |
| troposphere / tropopause / stratosphere / mesosphere / thermosphere | 对流层 / 对流层顶 / 平流层 / 中间层 / 热层 |
| lapse rate / dry / moist adiabatic lapse rate / potential temperature / equivalent potential temperature | 温度直减率 / 干绝热直减率 / 湿绝热直减率 / 位温 / 相当位温 |
| relative humidity / dew point / mixing ratio / saturation vapour pressure | 相对湿度 / 露点 / 混合比 / 饱和水汽压 |
| static stability / convection / CAPE / lifting condensation level | 静力稳定度 / 对流 / 对流有效位能 / 抬升凝结高度 |
| Coriolis force / geostrophic / gradient / thermal wind | 科里奥利力（地转偏向力） / 地转风 / 梯度风 / 热成风 |
| vorticity / potential vorticity / Rossby wave / Rossby number | 涡度 / 位涡 / 罗斯贝波 / 罗斯贝数 |
| boundary layer / turbulence / baroclinic instability / jet stream / Hadley cell | 边界层 / 湍流 / 斜压不稳定 / 急流 / 哈得来环流 |
| air mass / front / extratropical cyclone / anticyclone | 气团 / 锋（锋面） / 温带气旋 / 反气旋 |
| tropical cyclone / typhoon / hurricane / storm surge | 热带气旋 / 台风 / 飓风 / 风暴潮 |
| numerical weather prediction / ensemble forecast | 数值天气预报 / 集合预报 |
| ozone layer / ozone hole / aerosol / photochemical smog / acid deposition | 臭氧层 / 臭氧洞 / 气溶胶 / 光化学烟雾 / 酸沉降 |
| hydroxyl radical / mixing ratio (of a trace gas) / lifetime | 羟基自由基 / 混合比 / 寿命 |
| salinity / thermocline / halocline / mixed layer / water mass | 盐度 / 温跃层 / 盐跃层 / 混合层 / 水团 |
| Ekman transport / upwelling / gyre / western boundary current | 埃克曼输送 / 上升流 / 流涡 / 西边界流 |
| thermohaline circulation / meridional overturning circulation | 温盐环流 / 经向翻转环流 |
| tide / spring tide / neap tide / tsunami / sea level / thermal expansion / satellite altimetry / tide gauge | 潮汐 / 大潮 / 小潮 / 海啸 / 海平面 / 热膨胀 / 卫星测高 / 验潮站 |
| carbonate system / alkalinity / ocean acidification / biological pump / primary production | 碳酸盐体系 / 碱度 / 海洋酸化 / 生物泵 / 初级生产 |
| glacier / ice sheet / ice shelf / ice cap / sea ice | 冰川 / 冰盖 / 冰架 / 冰帽 / 海冰 |
| firn / accumulation / ablation / mass balance / equilibrium line / grounding line / calving / ice stream | 粒雪 / 积累 / 消融 / 物质平衡 / 平衡线 / 接地线 / 崩解 / 冰流 |
| climate system / climate change / global warming / greenhouse effect / greenhouse gas | 气候系统 / 气候变化 / 全球变暖 / 温室效应 / 温室气体 |
| albedo / top of the atmosphere / outgoing longwave radiation / radiative forcing / effective radiative forcing | 反照率 / 大气层顶 / 射出长波辐射 / 辐射强迫 / 有效辐射强迫 |
| climate feedback / climate sensitivity / equilibrium climate sensitivity / transient climate response | 气候反馈 / 气候敏感度 / 平衡气候敏感度 / 瞬态气候响应 |
| El Niño–Southern Oscillation / North Atlantic Oscillation | 厄尔尼诺-南方涛动 / 北大西洋涛动 |
| detection and attribution / fingerprint | 检测与归因 / 指纹 |
| carbon budget / cumulative emissions / net zero / carbon dioxide removal | 碳预算 / 累积排放 / 净零 / 二氧化碳移除 |
| scenario / Shared Socioeconomic Pathway / global warming level | 情景 / 共享社会经济路径（SSP） / 全球升温水平 |
| projection / prediction / forecast | 预估 / 预测 / 预报 |
| mitigation / adaptation / tipping point | 减缓 / 适应 / 临界点 |
| climate model / general circulation model / Earth system model / parameterisation / downscaling / ensemble | 气候模式 / 环流模式 / 地球系统模式 / 参数化 / 降尺度 / 集合 |
| proxy / archive / ice core / speleothem / tree ring | 代用指标 / 档案（记录载体） / 冰芯 / 洞穴沉积物（石笋等） / 树轮 |
| Milankovitch cycles / eccentricity / obliquity / precession / insolation | 米兰科维奇旋回 / 偏心率 / 黄赤交角 / 岁差 / 日射 |
| glacial / interglacial / Last Glacial Maximum / deglaciation / Younger Dryas / Heinrich event / Dansgaard–Oeschger event | 冰期 / 间冰期 / 末次盛冰期 / 冰消期 / 新仙女木事件 / 海因里希事件 / D-O事件 |
| isotope fractionation / δ value / per mil / stable / radiogenic isotope | 同位素分馏 / δ值 / 千分率（‰） / 稳定同位素 / 放射成因同位素 |
| trace element / rare earth element / partition coefficient | 微量元素 / 稀土元素 / 分配系数 |
| biogeochemical cycle / nitrogen fixation / nitrification / denitrification | 生物地球化学循环 / 固氮 / 硝化 / 反硝化 |
| water balance / infiltration / evapotranspiration / runoff / hydrograph / unit hydrograph | 水量平衡 / 下渗（入渗） / 蒸散发 / 径流 / 流量过程线 / 单位线 |
| return period / flood frequency | 重现期 / 洪水频率 |
| aquifer / aquitard / confined / unconfined aquifer / recharge / hydraulic head / hydraulic conductivity / Darcy’s law | 含水层 / 弱透水层 / 承压含水层 / 潜水含水层 / 补给 / 水头 / 渗透系数 / 达西定律 |
| remote sensing / spatial resolution / band / NDVI / synthetic-aperture radar / radar interferometry / lidar | 遥感 / 空间分辨率 / 波段 / 归一化植被指数 / 合成孔径雷达 / 雷达干涉测量（InSAR） / 激光雷达 |
| geographic information system / map projection / geodetic datum / digital elevation model | 地理信息系统 / 地图投影 / 大地基准 / 数字高程模型 |
| hazard / exposure / vulnerability / risk / early warning | 危害（致灾因子） / 暴露度 / 脆弱性 / 风险 / 预警 |
| pyroclastic flow / lahar / liquefaction | 火山碎屑流 / 火山泥流 / 液化 |
| ore deposit / resource / reserve / ore grade / placer / porphyry copper deposit / hydrothermal / critical minerals | 矿床 / 资源量 / 储量 / 品位 / 砂矿 / 斑岩铜矿床 / 热液 / 关键矿产 |
| source rock / reservoir / trap / seal / carbon capture and storage / geothermal energy | 烃源岩 / 储层 / 圈闭 / 盖层 / 碳捕集与封存 / 地热能 |
| planetesimal / chondrite / impact crater / exoplanet / habitable zone | 星子 / 球粒陨石 / 撞击坑 / 系外行星 / 宜居带 |

Notes on terms that are easily confused:

- **模式 or 模型.** Numerical models of the atmosphere, ocean and climate are 模式 in Chinese
  atmospheric science (气候模式、环流模式、地球系统模式、区域气候模式); use 模型 for conceptual,
  statistical and box models (箱式模型、统计模型、概念模型). An energy-balance model is
  能量平衡模式 when it is solved numerically on a grid and 能量平衡模型 as a conceptual model — follow
  the English context and stay consistent within a lesson.
- **冰川 / 冰盖 / 冰帽 / 冰架 / 海冰.** A glacier is 冰川; an ice sheet (Greenland, Antarctica,
  > 50 000 km²) is 冰盖; an ice cap (smaller, dome-shaped) is 冰帽; an ice shelf (floating glacier
  ice attached to land) is 冰架; sea ice (frozen seawater) is 海冰. Never use 冰盖 for sea ice.
- **预报 / 预测 / 预估.** Weather forecast 天气预报; a prediction from initial conditions (seasonal or
  decadal) 预测; a projection conditional on a scenario 预估 — as in the IPCC Chinese reports.
- **震级 / 烈度.** Magnitude (one number per earthquake) is 震级; intensity (shaking at a place) is
  烈度. Never interchange them; "Richter magnitude" is 里氏震级.
- **降水 / 降雨, 蒸发 / 蒸散发.** Precipitation (rain, snow, hail …) is 降水; rainfall alone is 降雨.
  Evaporation is 蒸发; evapotranspiration (evaporation plus transpiration) is 蒸散发.
- **风化 / 侵蚀 / 剥蚀.** Weathering breaks rock in place (风化); erosion removes material (侵蚀);
  denudation is the overall lowering of the land surface (剥蚀).
- **Geochronologic and chronostratigraphic units.** Time (宙、代、纪、世、期) versus the rocks formed
  in that time (宇、界、系、统、阶): "the Cretaceous Period" 白垩纪, "the Cretaceous System" 白垩系.
- **多年冻土**, not 永久冻土, for permafrost.
- **人类世** (Anthropocene) is a proposed epoch that was not formally adopted (2024); keep the
  English qualifier ("proposed", "informal") in the translation.
- **Carbon units.** Gt C is 吉吨碳 (10亿吨碳) and Gt CO₂ is 吉吨二氧化碳; keep the symbols and never
  convert between them while translating.
- **Calibrated uncertainty language.** Translate IPCC likelihood and confidence terms with the
  calibrated Chinese terms of the official AR6 translations (for example *very likely* 很可能,
  *likely* 可能, *virtually certain* 几乎确定, *high confidence* 高信度) and keep them consistent within the
  atlas; check the full list in the Chinese edition of the AR6 Working Group I Summary for
  Policymakers before translating a climate lesson, and never use these words in their everyday
  sense where the English uses them in the calibrated sense.

Emphasis: write `**…**` — Chinese typography has no italics (IPCC calibrated terms, italic in the
English, are left upright in Chinese). Run-in labels such as *Sketch.* become `**证明概要。**`.
Part labels stay half-width: `(a)…；(b)…`.

Block captions are generated by the site (定义、定理、例、习题、证明、解答……); do not write them.

## Check

`bash tools/check.sh --lang=zh <course>` — KaTeX, figures, structure parity with English, the
course overlay (same number of list entries as the English, no extra keys) and a warning for any
line that still looks like English prose. It must end with `0 errors, 0 warnings`.
Preview: `http://f.g77k.com/learn/earth/lesson.php?c=<course>&l=<chapter>&lang=zh`.

## Workflow

1. Translate one lesson at a time: read the whole English file, then write the whole Chinese
   file (`content/zh/<course>/<chapter>.md`). Translate everything — every paragraph, list item,
   derivation, solution, hint, quiz option, caption and history note. Never summarise or shorten:
   the Chinese lesson has the same content as the English, sentence for sentence. Translate by
   hand; never generate Chinese from templates or word lists.
2. Run `bash tools/check.sh --lang=zh <course>` and fix every ERROR and warning in your files.
3. Do not edit English files, code or tools. If the English has a genuine mistake, keep the
   translation faithful and report it.

Good models to imitate (Maths Atlas, same engine): `/var/www/f.g77k.com/learn/maths/content/zh/multivariable/gradient.md`
and `/var/www/f.g77k.com/learn/maths/content/zh/ode/course.json`. Site name: 地球与气候图谱.
