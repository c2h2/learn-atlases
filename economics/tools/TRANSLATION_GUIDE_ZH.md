# Economics & Finance Atlas — Chinese translation guide (简体中文)

Target: mainland Simplified Chinese as used in Chinese university economics and finance textbooks
and in the standard Chinese editions of the main English textbooks — for example 高鸿业《西方经济学》,
平新乔《微观经济学十八讲》, 曼昆《经济学原理》(梁小民等译), 范里安《微观经济学：现代观点》,
伍德里奇《计量经济学导论：现代观点》, 赫尔《期权、期货及其他衍生产品》. Neutral, precise textbook
register. Faithful to the English: never add, drop or change mathematics, numbers, data sources,
dates, conditions, caveats or the balance between competing views. Translate meaning, not word order.

The atlas is **for education only — not investment or financial advice**. Translate that notice,
wherever it appears, as **仅供教育学习，不构成投资或理财建议**, and keep every hedge in the English
("illustrative numbers", "not a forecast", "as of 2026") — do not strengthen or soften claims.

## Files

```
content/zh/<course>/course.json   overlay: ONLY the translatable fields, same structure and list order
content/zh/<course>/<chapter>.md  full translation of content/en/<course>/<chapter>.md
content/zh/_data/milestones.json  overlay of data/milestones.json (title, detail; same order)
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
  (`\text{if } p>c` → `\text{当 } p>c`); keep `{#eq-…}` labels;
- every `:::widget` block: keep the type and every key/value exactly; translate only `caption:`
  and `title:` values, and words inside `\text{…}` in `labels:` (legend labels are TeX:
  `labels: \text{demand}; \text{supply}` → `labels: \text{需求}; \text{供给}`);
- references `[[…]]` unchanged (their link text is generated in Chinese automatically); a custom
  label `[[target|text]]` gets its `text` translated; ordinary links to the Maths Atlas keep their
  URL and get `&lang=zh` appended;
- tables keep their columns; code blocks are not translated (comments in code may be).

`tools/check.php` compares the numbered blocks and anchors of each Chinese lesson with the English
one and reports any difference as an ERROR.

## Typography

- Full-width Chinese punctuation in Chinese sentences: ，。；：？！（）“”、
- Write inline formulas and numbers directly next to Chinese characters, without spaces:
  `价格$p$上升时需求量$q$下降`. The site adds a thin space around inline formulas in Chinese text.
- Bold `**…**` for the defined term at its definition, as in the English.
- Numbers, units, percentages and Latin abbreviations keep half-width characters (`5%`, `GDP`,
  `OLS`). Large numbers: keep the English digits and convert the unit word (`\$3 trillion` →
  `3万亿美元`; `2.5 billion people` → `25亿人`) — check every conversion.
- Money: a literal dollar sign is `\$` in the source, exactly as in the English; in Chinese prose
  prefer `100美元`, `200元人民币`, `50欧元`. ISO codes (USD, CNY, EUR) may stay as they are.
- People's names: standard Chinese transliteration followed by the Latin name in brackets on first
  mention in a lesson: 亚当·斯密（Adam Smith）, 大卫·李嘉图（David Ricardo）, 马尔萨斯（Malthus）,
  古诺（Cournot）, 瓦尔拉斯（Walras）, 马歇尔（Marshall）, 帕累托（Pareto）, 庇古（Pigou）,
  凯恩斯（Keynes）, 希克斯（Hicks）, 萨缪尔森（Samuelson）, 纳什（Nash）, 阿罗（Arrow）,
  德布鲁（Debreu）, 索洛（Solow）, 弗里德曼（Friedman）, 卢卡斯（Lucas）, 科斯（Coase）,
  阿克洛夫（Akerlof）, 斯蒂格利茨（Stiglitz）, 卡尼曼（Kahneman）, 马科维茨（Markowitz）,
  莫迪利安尼（Modigliani）. **塞勒（Thaler）** and **泰勒（Taylor）** are different people.
  In history blocks give the Chinese name followed by the Latin name in brackets.
- Book and paper titles: Chinese title in 《》 followed by the original in brackets when a Chinese
  edition exists; otherwise keep the original title in italics.
- Institutions: 世界银行, 国际货币基金组织（IMF）, 经济合作与发展组织（OECD）, 国际清算银行（BIS）,
  世界贸易组织（WTO）, 美国联邦储备系统（美联储）, 欧洲中央银行, 中国人民银行. Place names follow
  mainland conventions (中国香港, 中国台湾).

## Terminology

Mathematics and statistics terms follow the Maths Atlas guide
(`/var/www/f.g77k.com/learn/maths/tools/TRANSLATION_GUIDE_ZH.md`): 导数, 偏导数, 拉格朗日乘数,
矩阵, 特征值, 差分方程, 微分方程, 随机变量, 数学期望, 方差, 正态分布, 置信区间, 假设检验, 原假设,
p 值, 最大似然 (in econometrics write 极大似然估计, as Chinese econometrics textbooks do), 回归,
最小二乘. Local maximum is 局部极大值, never 局部最大值.

### Economics and finance terms

| English | 中文 |
|---|---|
| scarcity / opportunity cost / marginal | 稀缺性 / 机会成本 / 边际 |
| absolute / comparative advantage / production possibility frontier | 绝对优势 / 比较优势 / 生产可能性边界 |
| supply / demand / quantity supplied / quantity demanded / market equilibrium | 供给 / 需求 / 供给量 / 需求量 / 市场均衡 |
| price / income / cross-price elasticity of demand | 需求价格弹性 / 需求收入弹性 / 需求交叉价格弹性 |
| consumer surplus / producer surplus / deadweight loss | 消费者剩余 / 生产者剩余 / 无谓损失 |
| price ceiling / price floor / tax incidence | 价格上限 / 价格下限 / 税收归宿 |
| externality / public good / free rider / Pigouvian tax | 外部性 / 公共物品 / 搭便车者 / 庇古税 |
| preferences / utility / indifference curve | 偏好 / 效用 / 无差异曲线 |
| marginal rate of substitution / budget constraint | 边际替代率 / 预算约束 |
| Marshallian / Hicksian (compensated) demand | 马歇尔需求 / 希克斯需求（补偿需求） |
| indirect utility function / expenditure function | 间接效用函数 / 支出函数 |
| income / substitution effect / Slutsky equation / compensating / equivalent variation | 收入效应 / 替代效应 / 斯勒茨基方程 / 补偿变化 / 等价变化 |
| normal / inferior / Giffen good | 正常品 / 低档品 / 吉芬商品 |
| expected utility / risk aversion / certainty equivalent | 期望效用 / 风险厌恶 / 确定性等价 |
| production function / marginal product / isoquant / returns to scale | 生产函数 / 边际产量 / 等产量线 / 规模报酬 |
| fixed / variable / marginal / average cost | 固定成本 / 可变成本 / 边际成本 / 平均成本 |
| perfect competition / monopoly / oligopoly / monopolistic competition | 完全竞争 / 垄断 / 寡头垄断 / 垄断竞争 |
| market power / price discrimination / mark-up | 市场势力 / 价格歧视 / 加成 |
| general equilibrium / Edgeworth box / Pareto efficiency | 一般均衡 / 埃奇沃思盒 / 帕累托效率 |
| first / second fundamental theorem of welfare economics | 福利经济学第一基本定理 / 第二基本定理 |
| game / player / strategy / payoff | 博弈 / 参与人 / 策略 / 支付 |
| dominant strategy / Nash equilibrium / mixed strategy | 占优策略 / 纳什均衡 / 混合策略 |
| subgame-perfect equilibrium / backward induction / repeated game / folk theorem | 子博弈精炼纳什均衡 / 逆向归纳法 / 重复博弈 / 无名氏定理 |
| Bayesian Nash / perfect Bayesian equilibrium | 贝叶斯纳什均衡 / 精炼贝叶斯均衡 |
| signalling / screening / pooling / separating equilibrium | 信号传递 / 信息甄别 / 混同均衡 / 分离均衡 |
| asymmetric information / adverse selection / moral hazard | 信息不对称 / 逆向选择 / 道德风险 |
| principal–agent / incentive compatibility / participation constraint | 委托-代理 / 激励相容 / 参与约束 |
| mechanism design / revelation principle | 机制设计 / 显示原理 |
| auction / reserve price / winner's curse / revenue equivalence | 拍卖 / 保留价格 / 赢者诅咒 / 收益等价 |
| stable matching / deferred acceptance | 稳定匹配 / 延迟接受算法 |
| GDP / nominal / real / GDP deflator / consumer price index | 国内生产总值（GDP） / 名义 / 实际 / GDP平减指数 / 消费者价格指数（CPI） |
| inflation / deflation / hyperinflation / disinflation | 通货膨胀 / 通货紧缩 / 恶性通货膨胀 / 反通货膨胀 |
| unemployment rate / natural rate of unemployment | 失业率 / 自然失业率 |
| marginal propensity to consume / multiplier / permanent-income / life-cycle hypothesis | 边际消费倾向 / 乘数 / 持久收入假说 / 生命周期假说 |
| aggregate demand / aggregate supply / IS–LM model | 总需求 / 总供给 / IS-LM模型 |
| Phillips curve / adaptive / rational expectations | 菲利普斯曲线 / 适应性预期 / 理性预期 |
| monetary / fiscal policy / automatic stabiliser | 货币政策 / 财政政策 / 自动稳定器 |
| central bank / policy rate / open-market operations / quantitative easing | 中央银行 / 政策利率 / 公开市场操作 / 量化宽松 |
| money supply / monetary base / money multiplier | 货币供给 / 基础货币 / 货币乘数 |
| Taylor rule / inflation targeting / zero lower bound | 泰勒规则 / 通货膨胀目标制 / 零利率下限 |
| budget deficit / public debt / Ricardian equivalence | 预算赤字 / 公共债务 / 李嘉图等价 |
| business cycle / recession / depression / output gap | 经济周期 / 衰退 / 萧条 / 产出缺口 |
| real business cycle / New Keynesian model / sticky prices | 实际经济周期 / 新凯恩斯模型 / 价格黏性 |
| growth accounting / total factor productivity / steady state | 增长核算 / 全要素生产率 / 稳态 |
| golden rule / convergence / endogenous growth / overlapping generations | 黄金律 / 趋同 / 内生增长 / 世代交叠 |
| balance of payments / current account / financial account | 国际收支 / 经常账户 / 金融账户 |
| nominal / real exchange rate / appreciation / depreciation | 名义汇率 / 实际汇率 / 升值 / 贬值 |
| purchasing power parity / covered / uncovered interest parity | 购买力平价 / 抛补利率平价 / 非抛补利率平价 |
| impossible trinity / optimum currency area | 不可能三角 / 最优货币区 |
| tariff / quota / terms of trade / gravity equation | 关税 / 配额 / 贸易条件 / 引力方程 |
| interest rate / yield to maturity / yield curve / term premium | 利率 / 到期收益率 / 收益率曲线 / 期限溢价 |
| present value / net present value / internal rate of return / discount rate / annuity / perpetuity | 现值 / 净现值 / 内部收益率 / 贴现率 / 年金 / 永续年金 |
| bond / coupon / face value / duration / convexity | 债券 / 票息 / 面值 / 久期 / 凸性 |
| share / dividend / share repurchase | 股票 / 股利 / 股票回购 |
| capital budgeting / cost of capital / weighted average cost of capital | 资本预算 / 资本成本 / 加权平均资本成本（WACC） |
| capital structure / leverage / financial distress | 资本结构 / 杠杆 / 财务困境 |
| portfolio / diversification / efficient frontier | 投资组合 / 分散化 / 有效前沿 |
| systematic / idiosyncratic risk / beta | 系统性风险 / 特质风险 / 贝塔系数 |
| capital asset pricing model / arbitrage pricing theory | 资本资产定价模型（CAPM） / 套利定价理论（APT） |
| efficient market hypothesis / anomaly / limits to arbitrage | 有效市场假说 / 异象 / 套利限制 |
| stochastic discount factor / risk-neutral probability / no arbitrage / equity premium puzzle | 随机贴现因子 / 风险中性概率 / 无套利 / 股权溢价之谜 |
| derivative / forward / futures / swap / option | 衍生品 / 远期 / 期货 / 互换 / 期权 |
| call / put / strike price / put–call parity | 看涨期权 / 看跌期权 / 行权价 / 看跌-看涨平价关系 |
| hedging / implied volatility / the Greeks | 套期保值 / 隐含波动率 / 希腊字母 |
| value at risk / expected shortfall / credit default swap | 风险价值（VaR） / 预期损失（ES） / 信用违约互换（CDS） |
| bank run / deposit insurance / lender of last resort | 银行挤兑 / 存款保险 / 最后贷款人 |
| capital requirement / macroprudential policy / shadow banking | 资本要求 / 宏观审慎政策 / 影子银行 |
| ordinary least squares / error term / residual / standard error / consistent estimator | 普通最小二乘法（OLS） / 误差项 / 残差 / 标准误 / 一致估计量 |
| omitted-variable bias / multicollinearity / heteroskedasticity | 遗漏变量偏误 / 多重共线性 / 异方差 |
| robust / clustered standard errors / dummy variable | 稳健标准误 / 聚类标准误 / 虚拟变量 |
| panel data / fixed effects / random effects | 面板数据 / 固定效应 / 随机效应 |
| endogeneity / instrumental variable / two-stage least squares | 内生性 / 工具变量 / 两阶段最小二乘法（2SLS） |
| potential outcomes / treatment effect / randomised controlled trial | 潜在结果 / 处理效应 / 随机对照试验 |
| difference-in-differences / regression discontinuity / synthetic control | 双重差分 / 断点回归 / 合成控制法 |
| stationarity / unit root / cointegration / vector autoregression | 平稳性 / 单位根 / 协整 / 向量自回归（VAR） |
| impulse response / Granger causality / volatility clustering | 脉冲响应 / 格兰杰因果关系 / 波动聚集 |
| Gini coefficient / Lorenz curve / poverty line | 基尼系数 / 洛伦兹曲线 / 贫困线 |
| human capital / returns to education / minimum wage / monopsony | 人力资本 / 教育回报率 / 最低工资 / 买方垄断 |
| prospect theory / loss aversion / present bias / nudge | 前景理论 / 损失厌恶 / 现时偏差 / 助推 |
| social cost of carbon / cost–benefit analysis / tradable permits | 碳的社会成本 / 成本-收益分析 / 可交易排放许可 |

### Words with more than one translation

- **均衡 and 平衡.** Economic equilibrium (market, Nash, general) is always 均衡. 平衡 is for
  balance: 平衡增长（balanced growth）, 预算平衡（budget balance）; the balance of payments is
  国际收支. The equilibrium point of a dynamical system is 平衡点 as in the Maths Atlas, but the
  steady state of a growth model is 稳态.
- **利率, 收益率 and 回报率.** Interest rate (on a loan, deposit or policy instrument) is 利率.
  Yield (the rate implied by a bond's price) and the return on an asset are 收益率: 到期收益率,
  预期收益率, 无风险收益率 — but the risk-free *rate* in a formula ($r_f$) is 无风险利率.
  Returns to scale is 规模报酬 and returns to education 教育回报率.
- **资本.** Physical capital $K$ in economics is 资本. A bank's capital (its equity cushion) is
  银行资本 (资本金 in regulatory contexts). Capital markets 资本市场, cost of capital 资本成本.
- **弹性.** Elasticity is 弹性; elastic / inelastic / unit-elastic demand is 富有弹性 /
  缺乏弹性 / 单位弹性 (not 有弹性 / 无弹性).
- **通货膨胀 and 通胀.** Write 通货膨胀 at first use in a lesson; 通胀 may follow. The inflation
  rate is 通货膨胀率.
- **支付 and 收益 in games.** Payoff is 支付 (支付矩阵); keep 收益 for revenue and returns
  (收益等价 for revenue equivalence).
- **Agent.** A decision-maker in a model is 经济主体 or 个体; 代理人 only in principal–agent
  problems (委托人 / 代理人).
- **Firm and company.** Firm in economic theory is 企业; corporation and company in finance are
  公司 (公司金融).
- **Recession, depression.** 衰退, 萧条; the Great Depression is 大萧条.

Emphasis: write `**…**`, as `/var/www/f.g77k.com/learn/maths/content/zh/multivariable/gradient.md`
does — Chinese typography has no italics. Run-in labels such as *Sketch.* become `**证明概要。**`.
Part labels stay half-width: `(a)…；(b)…`.

Block captions are generated by the site (定义、定理、例、习题、证明、解答……); do not write them.

## Check

`bash tools/check.sh --lang=zh <course>` — KaTeX, figures, structure parity with English, the
course overlay (same number of list entries as the English, no extra keys) and a warning for any
line that still looks like English prose. It must end with `0 errors, 0 warnings`.
Preview: `http://f.g77k.com/learn/economics/lesson.php?c=<course>&l=<chapter>&lang=zh`.

## Workflow

1. Translate one lesson at a time, by hand: read the whole English file, then write the whole
   Chinese file (`content/zh/<course>/<chapter>.md`). Translate everything — every paragraph, list
   item, derivation, solution, hint, quiz option, caption, data source and history note. Never
   summarise or shorten, and never generate translations with scripts: the Chinese lesson has the
   same content as the English, sentence for sentence.
2. Run `bash tools/check.sh --lang=zh <course>` and fix every ERROR and warning in your files.
3. Do not edit English files, code or tools. If the English has a genuine mistake, keep the
   translation faithful and report it.

Good models to imitate (Maths Atlas, same engine):
`/var/www/f.g77k.com/learn/maths/content/zh/multivariable/gradient.md` and
`/var/www/f.g77k.com/learn/maths/content/zh/ode/course.json`. Site name: 经济与金融图谱.
