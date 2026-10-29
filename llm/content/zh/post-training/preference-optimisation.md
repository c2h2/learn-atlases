带 PPO 的 RLHF 要用三个阶段、四个模型来优化 KL 正则奖励（[[post-training/rlhf]]）。Rafailov 等（2023）注意到这个目标有一个精确解，而且解可以反过来说：不必先学奖励、再寻找最大化它的策略，而可以把奖励**用策略来表示**，再直接把策略拟合到偏好数据上。所得的**直接偏好优化**（DPO）是一个作用于回复对的分类式损失，不需要奖励模型，训练时也不需要采样，并在一年之内成了使用最广的后训练方法之一。

本章证明 KL 正则最优策略的闭式解，由它推出 DPO 损失，并分析其梯度与隐式奖励。一个小实验展示 DPO 从偏好概率中恢复最优策略——以及每对只标一次时会过拟合，这正是催生 **IPO** 的失败模式。随后综述其主要同族方法，按变体列出并附各自作者陈述的动机：IPO、KTO、ORPO 与 SimPO。最后回到强化学习：**GRPO** 通过组内样本相互比较而甩掉 PPO 的价值模型；**可验证奖励**强化学习则按已发表报告所述。

## KL 正则目标的最优策略 {#sec-optimal}

回忆[[post-training/rl-for-language-models#def-kl-objective]]的目标：对每个提示 $\mathbf{x}$，最大化

$$
\E_{\mathbf{y}\sim\pi(\cdot\mid\mathbf{x})}\big[r(\mathbf{x}, \mathbf{y})\big] - \beta\,D_{\mathrm{KL}}\big(\pi(\cdot\mid\mathbf{x})\,\Vert\,\pi_{\text{ref}}(\cdot\mid\mathbf{x})\big)
$$ {#eq-objective}

其中$\pi(\cdot\mid\mathbf{x})$取遍回复上的所有分布，$\beta > 0$。

::: theorem KL 正则的最优策略 {#thm-optimal-policy}
设奖励在 $\pi_{\text{ref}}(\cdot\mid\mathbf{x})$ 的支撑上有界。[[#eq-objective]]的唯一最大元是

$$
\pi^\star(\mathbf{y}\mid\mathbf{x}) = \frac{1}{Z(\mathbf{x})}\,\pi_{\text{ref}}(\mathbf{y}\mid\mathbf{x})\exp\Big(\frac{r(\mathbf{x}, \mathbf{y})}{\beta}\Big),\qquad Z(\mathbf{x}) = \sum_{\mathbf{y}}\pi_{\text{ref}}(\mathbf{y}\mid\mathbf{x})\exp\Big(\frac{r(\mathbf{x}, \mathbf{y})}{\beta}\Big),
$$ {#eq-optimal}

且最大值为 $\beta\log Z(\mathbf{x})$。
:::

::: proof
固定 $\mathbf{x}$ 并从记号中省略。$r$ 有界故 $Z$ 有限且为正，于是 $\pi^\star$ 是概率分布；由其定义，$r(\mathbf{y}) = \beta\log\frac{\pi^\star(\mathbf{y})}{\pi_{\text{ref}}(\mathbf{y})} + \beta\log Z$。把它代回目标，对任意 $\pi$（设 $\pi\ll\pi_{\text{ref}}$；否则散度无穷），

$$
\begin{aligned}
\E_\pi[r] - \beta D_{\mathrm{KL}}(\pi\Vert\pi_{\text{ref}}) &= \E_\pi\Big[\beta\log\frac{\pi^\star(\mathbf{y})}{\pi_{\text{ref}}(\mathbf{y})} + \beta\log Z - \beta\log\frac{\pi(\mathbf{y})}{\pi_{\text{ref}}(\mathbf{y})}\Big]\\
&= \beta\log Z - \beta\,\E_\pi\Big[\log\frac{\pi(\mathbf{y})}{\pi^\star(\mathbf{y})}\Big] = \beta\log Z - \beta\,D_{\mathrm{KL}}(\pi\Vert\pi^\star).
\end{aligned}
$$

由吉布斯（Gibbs）不等式（[[math-for-ml/information-theory#thm-gibbs]]），散度非负，且仅在 $\pi = \pi^\star$ 时为零，故 $\pi^\star$ 是唯一最大元，值为 $\beta\log Z$。这就是 softmax 的变分刻画（[[math-for-ml/optimisation#prop-softmax-variational]]）把均匀分布换成 $\pi_{\text{ref}}$ 的版本。
:::

最优策略用指数化的奖励**倾斜**（tilt）参考策略，$\beta$ 是一个温度：$\beta\to\infty$ 时 $\pi^\star\to\pi_{\text{ref}}$；$\beta\to0$ 时 $\pi^\star$ 集中到 $\pi_{\text{ref}}$ 支撑内奖励最高的回复上。参考策略从不产生的回复在任何 $\beta$ 下都依然不可能——反向 KL 禁止把质量放到参考策略没有质量的地方。在[[post-training/rlhf#sec-toy]]的玩具实验里，PPO 式训练收敛到的正是这个策略。

::: widget plot
f: exp(-x^2/2)/sqrt(2*pi); exp(-(x - 1/b)^2/2)/sqrt(2*pi)
x: -4, 8
y: 0, 0.45
sliders: b=1:0.2:4:0.05
labels: reference $\pi_{\mathrm{ref}} = \mathcal{N}(0, 1)$; optimum $\pi^\star$ for $r(y) = y$
caption: [[#thm-optimal-policy]]在一个连续玩具问题上的倾斜：参考为标准正态，奖励为线性的 $r(y) = y$。此时 $\pi^\star(y)\propto e^{-y^2/2}e^{y/\beta}\propto e^{-(y - 1/\beta)^2/2}$，是一个平移了 $1/\beta$ 的正态分布（滑块 $b = \beta$）：期望奖励为 $1/\beta$，散度为 $1/(2\beta^2)$。$\beta$ 减半，奖励增益翻倍而散度变四倍。
:::

::: example 优解移动多远？ {#ex-tilt-sizes}
对上图的高斯问题（$\pi_{\text{ref}} = \Normal(0, 1)$，$r(y) = y$），计算 $\beta = 2$、$1$、$0.5$ 时 $\pi^\star$ 的期望奖励增益与散度，并验证[[post-training/rlhf#prop-frontier]]的边际汇率 $d\,\E[r]/d\,D_{\mathrm{KL}} = \beta$。
::: solution
$\pi^\star = \Normal(1/\beta, 1)$，故 $\E[r] = 1/\beta$，$D_{\mathrm{KL}} = 1/(2\beta^2)$：三个值分别为 $(0.5, 0.125)$、$(1, 0.5)$、$(2, 2)$。把 $\E[r]$ 写成 $\sqrt{2D_{\mathrm{KL}}}$，导数为 $1/\sqrt{2D_{\mathrm{KL}}} = \beta$，与命题要求一致。奖励随散度的平方根增长——正是度量过度优化所用的那条 $\sqrt{\mathrm{KL}}$ 轴（[[post-training/reward-models#prop-gao]]）。
:::
:::

## 从最优策略到 DPO {#sec-dpo}

把[[#eq-optimal]]解出奖励：

$$
r(\mathbf{x}, \mathbf{y}) = \beta\log\frac{\pi^\star(\mathbf{y}\mid\mathbf{x})}{\pi_{\text{ref}}(\mathbf{y}\mid\mathbf{x})} + \beta\log Z(\mathbf{x}).
$$ {#eq-reparam}

它通过“对该奖励最优的策略”来表达奖励。配分函数 $Z(\mathbf{x})$ 是对所有回复求和，无法计算——但它只依赖提示，而 Bradley–Terry 模型只依赖同一提示下回复之间奖励的**差**（[[post-training/reward-models#prop-shift]]）。

::: proposition 用最优策略表示偏好 {#prop-dpo-pref}
若偏好服从以 $r$ 为奖励的 Bradley–Terry 模型，且 $\pi^\star$ 是 $r$ 的最优策略[[#eq-optimal]]，则

$$
P(\mathbf{y}_w\succ\mathbf{y}_l\mid\mathbf{x}) = \sigma\Big(\beta\log\frac{\pi^\star(\mathbf{y}_w\mid\mathbf{x})}{\pi_{\text{ref}}(\mathbf{y}_w\mid\mathbf{x})} - \beta\log\frac{\pi^\star(\mathbf{y}_l\mid\mathbf{x})}{\pi_{\text{ref}}(\mathbf{y}_l\mid\mathbf{x})}\Big).
$$
:::

::: proof
把[[#eq-reparam]]分别代入两个回复的 $\sigma(r(\mathbf{x}, \mathbf{y}_w) - r(\mathbf{x}, \mathbf{y}_l))$（[[post-training/reward-models#eq-bt]]）；两项 $\beta\log Z(\mathbf{x})$ 相消。
:::

偏好概率现在成了仅关于策略的函数。用参数化策略 $\pi_\theta$ 顶替 $\pi^\star$，以最大似然把它拟合到数据，就是 DPO。

::: definition 直接偏好优化（Rafailov 等，2023）{#def-dpo}
给定偏好数据集 $\mathcal{D}$（三元组 $(\mathbf{x}, \mathbf{y}_w, \mathbf{y}_l)$）、冻结的参考策略 $\pi_{\text{ref}}$ 与 $\beta > 0$，定义**隐式奖励** $\hat r_\theta(\mathbf{x}, \mathbf{y}) = \beta\log\frac{\pi_\theta(\mathbf{y}\mid\mathbf{x})}{\pi_{\text{ref}}(\mathbf{y}\mid\mathbf{x})}$。**DPO 损失**为

$$
\mathcal{L}_{\text{DPO}}(\theta) = -\E_{(\mathbf{x}, \mathbf{y}_w, \mathbf{y}_l)\sim\mathcal{D}}\Big[\log\sigma\Big(\beta\log\frac{\pi_\theta(\mathbf{y}_w\mid\mathbf{x})}{\pi_{\text{ref}}(\mathbf{y}_w\mid\mathbf{x})} - \beta\log\frac{\pi_\theta(\mathbf{y}_l\mid\mathbf{x})}{\pi_{\text{ref}}(\mathbf{y}_l\mid\mathbf{x})}\Big)\Big],
$$ {#eq-dpo}

即以 $\hat r_\theta$ 为奖励的 Bradley–Terry 损失（[[post-training/reward-models#eq-rm-loss]]）。每一项都需要两个回复在 $\pi_\theta$ 与 $\pi_{\text{ref}}$ 下的序列对数概率：四次教师强制前向，其中 $\pi_{\text{ref}}$ 的两遍可以事先算好。
:::

推导保证：若数据由某个奖励 $r$ 按 Bradley–Terry 生成，且策略类包含 $\pi^\star$，则[[#eq-dpo]]下最大似然的 $\pi_\theta$ 就是最大似然奖励的 KL 正则最优策略——与 RLHF 在奖励模型拟合完美、优化器完美时得到的答案相同，却只需一个监督阶段。论文标题《Your language model is secretly a reward model》说的就是 $\hat r_\theta$：每个策略都定义了一个以它为最优的奖励。这轮参数化没有任何损失。

::: proposition 每个奖励等价类都有策略代表 {#prop-representation}
若两个奖励只差一个只依赖提示的函数，则称它们等价；等价的奖励导出相同的偏好与相同的最优策略。每个奖励 $r$ 都等价于恰好一个形如 $\beta\log\frac{\pi(\mathbf{y}\mid\mathbf{x})}{\pi_{\text{ref}}(\mathbf{y}\mid\mathbf{x})}$ 的奖励，其中 $\pi$ 是支撑等于 $\pi_{\text{ref}}$ 的策略，即 $\pi = \pi^\star_r$。
:::

::: proof
存在性：由[[#eq-reparam]]，$r - \beta\log Z(\mathbf{x}) = \beta\log(\pi^\star_r/\pi_{\text{ref}})$，它与 $r$ 只差一个 $\mathbf{x}$ 的函数。唯一性：若 $\beta\log(\pi_1/\pi_{\text{ref}})$ 与 $\beta\log(\pi_2/\pi_{\text{ref}})$ 等价，则对一切 $\mathbf{y}$ 有 $\pi_1(\mathbf{y}\mid\mathbf{x}) = c(\mathbf{x})\pi_2(\mathbf{y}\mid\mathbf{x})$，对 $\mathbf{y}$ 求和得 $c(\mathbf{x}) = 1$。等价奖励最优策略相同，因为 $e^{c(\mathbf{x})/\beta}$ 在[[#eq-optimal]]的归一中相消。
:::

### DPO 的梯度 {#sec-gradient}

::: proposition DPO 损失的梯度 {#prop-dpo-grad}
对单个三元组，记 $\hat\Delta = \hat r_\theta(\mathbf{x}, \mathbf{y}_w) - \hat r_\theta(\mathbf{x}, \mathbf{y}_l)$，

$$
\nabla_\theta\mathcal{L}_{\text{DPO}} = -\beta\,\sigma(-\hat\Delta)\,\Big(\nabla_\theta\log\pi_\theta(\mathbf{y}_w\mid\mathbf{x}) - \nabla_\theta\log\pi_\theta(\mathbf{y}_l\mid\mathbf{x})\Big).
$$ {#eq-dpo-grad}
:::

::: proof
由[[post-training/reward-models#eq-rm-grad]]，把 $r_\phi$ 换成 $\hat r_\theta$，且 $\nabla_\theta\hat r_\theta = \beta\nabla_\theta\log\pi_\theta$，因为 $\pi_{\text{ref}}$ 不含 $\theta$。
:::

梯度上升会抬高被选回复的对数概率、压低被拒回复的，权重为 $\sigma(-\hat\Delta)$——即隐式奖励模型此刻把这一对排错的概率。若没有这个权重，更新就成了“对胜者做 SFT、对负者做反似然”，Rafailov 等报告那样会退化；这个权重对已经以舒适差距排对的样例不再施力，而 $\hat\Delta$ 中的参考比值衡量的是**相对于模型起点**的差距。

::: example 手算 DPO 损失 {#ex-dpo}
某一对的序列对数概率为 $\log\pi_\theta(\mathbf{y}_w) = -42.0$、$\log\pi_\theta(\mathbf{y}_l) = -45.0$、$\log\pi_{\text{ref}}(\mathbf{y}_w) = -43.0$、$\log\pi_{\text{ref}}(\mathbf{y}_l) = -44.0$。取 $\beta = 0.1$，计算隐式奖励、损失与梯度权重。训练开始时（$\pi_\theta = \pi_{\text{ref}}$）它们各是多少？
::: solution
$\hat r(\mathbf{y}_w) = 0.1\cdot(-42 + 43) = 0.1$，$\hat r(\mathbf{y}_l) = 0.1\cdot(-45 + 44) = -0.1$，$\hat\Delta = 0.2$。损失 $-\ln\sigma(0.2) = -\ln0.5498 = 0.598$；权重 $\sigma(-0.2) = 0.450$。开始时 $\hat\Delta = 0$，损失为 $\ln2 = 0.693$，权重 $0.5$——每次 DPO 运行都从损失 $\ln 2$ 起步，这是个好用的健康检查。注意被选回复的对数概率是 $-42$：长回复的绝对对数概率又大体为负，起作用的只有与参考之差。
:::
:::

## 玩具问题中的 DPO {#sec-code}

下面的程序把 DPO 用在四个回复上的一个“策略”：参考 $\pi_{\text{ref}} = (0.4, 0.3, 0.2, 0.1)$，真实奖励 $(0, 1, 0.5, 2)$，$\beta = 1$，于是由[[#thm-optimal-policy]]，目标是 $\pi^\star\propto\pi_{\text{ref}}e^{r}$。策略是四个 logits 上的 softmax，在全部六对的 DPO 损失上做梯度下降。第一次运行的数据是总体偏好概率 $\sigma(r_i - r_j)$（等价于每对无穷多个标签）；第二次每对只标**一次**，标签为其真实胜者；第三次对同一批单次标签改用 IPO（[[#def-ipo]]）。

```python
import math, random

def softmax(z):
    m = max(z); e = [math.exp(v - m) for v in z]; s = sum(e)
    return [v / s for v in e]

def sig(z):
    return 1 / (1 + math.exp(-z))

ref = [0.4, 0.3, 0.2, 0.1]                  # 4 个回复上的参考策略
r = [0.0, 1.0, 0.5, 2.0]                    # 真实（隐藏）奖励
beta = 1.0
K = len(ref)
target = softmax([math.log(p) + ri / beta for p, ri in zip(ref, r)])   # pi* ~ ref * exp(r / beta)
pairs = [(i, j) for i in range(K) for j in range(K) if i < j]

def dpo_grad(theta, prefs):
    """DPO 损失对 logits theta 的梯度。
    prefs: (i, j, p) 列表，表示"以概率 p 偏好 i 胜过 j"。"""
    pi = softmax(theta)
    h = [math.log(pi[k] / ref[k]) for k in range(K)]          # 隐式奖励 / beta
    g = [0.0] * K                                            # 损失对 h 的导数
    for i, j, p in prefs:
        m = beta * (h[i] - h[j])
        c = -beta * (p * sig(-m) - (1 - p) * sig(m)) / len(prefs)
        g[i] += c; g[j] -= c
    s = sum(g)                                               # 穿过 log-softmax 的链式法则
    return [g[k] - pi[k] * s for k in range(K)]

def run(prefs, steps, lr, report, loss="dpo", tau=1.0):
    theta = [math.log(p) for p in ref]                       # 从参考策略出发
    for t in range(steps + 1):
        pi = softmax(theta)
        if t in report:
            tv = 0.5 * sum(abs(a - b) for a, b in zip(pi, target))
            kl = max(0.0, sum(a * math.log(a / b) for a, b in zip(pi, ref)))   # 截断舍入噪声
            print(f"  step {t:5d}  pi = {[round(x, 3) for x in pi]}  TV to pi* {tv:.4f}  KL(pi||ref) {kl:.3f}")
        if loss == "dpo":
            g = dpo_grad(theta, prefs)
        else:                                                # IPO: (h_w - h_l - 1/(2 tau))^2
            h = [math.log(pi[k] / ref[k]) for k in range(K)]
            gh = [0.0] * K
            for i, j, _ in prefs:
                d = 2 * (h[i] - h[j] - 1 / (2 * tau)) / len(prefs)
                gh[i] += d; gh[j] -= d
            s = sum(gh); g = [gh[k] - pi[k] * s for k in range(K)]
        theta = [a - lr * b for a, b in zip(theta, g)]

print("pi* =", [round(x, 3) for x in target])
print("1. DPO on the population preference probabilities sigma(r_i - r_j):")
pop = [(i, j, sig(r[i] - r[j])) for i, j in pairs]
run(pop, 500, 0.5, {0, 10, 50, 500})

print("2. DPO on one deterministic label per pair (the winner under r):")
det = [(i, j, 1.0) if r[i] > r[j] else (j, i, 1.0) for i, j in pairs]
run(det, 20000, 2.0, {0, 1000, 20000})
print("3. IPO (tau = 1) on the same labels:")
run(det, 20000, 0.5, {0, 1000, 20000}, loss="ipo")
```

```text
pi* = [0.175, 0.357, 0.144, 0.323]
1. DPO on the population preference probabilities sigma(r_i - r_j):
  step     0  pi = [0.4, 0.3, 0.2, 0.1]  TV to pi* 0.2805  KL(pi||ref) 0.000
  step    10  pi = [0.282, 0.35, 0.18, 0.187]  TV to pi* 0.1432  KL(pi||ref) 0.055
  step    50  pi = [0.186, 0.36, 0.149, 0.305]  TV to pi* 0.0183  KL(pi||ref) 0.220
  step   500  pi = [0.175, 0.357, 0.144, 0.323]  TV to pi* 0.0000  KL(pi||ref) 0.250
2. DPO on one deterministic label per pair (the winner under r):
  step     0  pi = [0.4, 0.3, 0.2, 0.1]  TV to pi* 0.2805  KL(pi||ref) 0.000
  step  1000  pi = [0.0, 0.013, 0.0, 0.987]  TV to pi* 0.6634  KL(pi||ref) 2.218
  step 20000  pi = [0.0, 0.001, 0.0, 0.999]  TV to pi* 0.6758  KL(pi||ref) 2.296
3. IPO (tau = 1) on the same labels:
  step     0  pi = [0.4, 0.3, 0.2, 0.1]  TV to pi* 0.2805  KL(pi||ref) 0.000
  step  1000  pi = [0.293, 0.363, 0.188, 0.155]  TV to pi* 0.1682  KL(pi||ref) 0.035
  step 20000  pi = [0.293, 0.363, 0.188, 0.155]  TV to pi* 0.1682  KL(pi||ref) 0.035
```

有了偏好概率，DPO 精确收敛到 $\pi^\star = (0.175, 0.357, 0.144, 0.323)$，全程既没有构造奖励模型也没有采样——定理在起作用。每对只有一个标签时则不然：标签是确定性的，Bradley–Terry 似然随差距增大而持续上升（[[post-training/reward-models#prop-rm-props]]），策略坍缩到那个战无不胜的回复上，逼近此处可能的最大散度 $\log(1/0.1) = 2.303$ 纳特。原本指望 $\beta$ 提供的 KL 正则化消失无踪。IPO 用同样的数据，止步于有界的差距。

## DPO 实践 {#sec-practice}

DPO 的训练方式与 SFT 相同：离线，固定数据集，冻结的参考模型（通常是 SFT 模型，其对数据的对数概率可以缓存），每个回复一次前向与一次反向。已发表配方中 $\beta$ 的典型取值在约 $0.01$ 到 $0.5$ 之间。它很快被开放模型采纳：Zephyr（Tunstall 等，2023）把它用于由模型标注的偏好（[[post-training/ai-feedback]]）；Llama 3（Llama Team，2024）使用了多轮拒绝采样、SFT 与 DPO；Tülu 3（Lambert 等，2024）先 SFT，再 DPO，最后在可验证奖励上做强化学习。已记录的困难有若干。

- **对确定性偏好过拟合。** 上面的程序展示了机理；Azar 等（2024）对此做了分析并提出 IPO。
- **两个似然一起下降。** 实践中，被选与被拒回复的对数概率在 DPO 训练中常常双双下降，被拒的降得更快；概率质量移到数据集之外的回复上，其中有时更差。Pal 等（2024）与 Razin 等（2025，“likelihood displacement”）研究了这一现象并提出修正，例如加一项使被选回复的似然不跌到参考以下。
- **离策略数据。** 推导对 $\mathbf{y}_w, \mathbf{y}_l$ 的来源没有任何假设，但损失只在这批回复上约束策略。若它们采自另一个模型，策略对自身典型输出的行为就约束很弱。**在线**或**迭代** DPO——用当前策略重新生成回复、标注（常用奖励模型或评审）、再重复——能解决这个问题，并有报告称有效（如 Xiong 等，2024；Guo 等，2024）。
- **长度。** 偏好长答案的偏好数据，DPO 与 RLHF 一样会钻这个空子；Park 等（2024）提出了长度正则的变体。

DPO 能否匹敌基于 PPO 的 RLHF 仍有争议。Xu 等（2024）与 Ivison 等（2024）在他们的实验中发现调好的 PPO 领先，领先幅度视任务而定，同时也发现偏好数据的质量比算法的选择更重要。DPO 最大的实际优势是简单与便宜。

::: warning DPO 并非处处都是“去掉 RL 的 RLHF”
DPO 与 RLHF 只在理想化假设下共享最优解：偏好严格服从 Bradley–Terry、策略类包含 $\pi^\star$、相关回复上的数据足够。实践中二者见到的数据不同：RLHF 在当前策略的样本上训练，由能泛化到新回复的奖励模型打分；DPO 在一批固定回复上训练，只能靠网络的归纳偏置泛化。DPO 损失低只意味着策略把数据集里的对排对了，并不意味着它自己的生成质量高；而隐式奖励 $\hat r_\theta$ 的奖励模型准确率高，也不是策略好的证据。
:::

## 变体 {#sec-variants}

同一模子还提出过许多目标。这里概述引用最多的四个，并附各自作者给出的动机。它们是并列的替代方案而非演进序列，相互之间已发表的比较强烈依赖超参数与数据。

### IPO {#sec-ipo}

Azar 等（2024）写出了一个一般的偏好目标族 $\Psi$PO，RLHF 与 DPO 对应其中 $\Psi(p) = \log\frac{p}{1-p}$ 的情形，并主张正是这个选择让 DPO 过拟合：当一对永远偏向一边时，$\Psi(1) = \infty$，KL 项再也拉不住策略。把 $\Psi$ 取为恒等映射，就得到**恒等偏好优化**（identity preference optimisation）。

::: definition IPO 损失（Azar 等，2024）{#def-ipo}
记 $h_\theta(\mathbf{x}, \mathbf{y}_w, \mathbf{y}_l) = \log\frac{\pi_\theta(\mathbf{y}_w\mid\mathbf{x})\,\pi_{\text{ref}}(\mathbf{y}_l\mid\mathbf{x})}{\pi_\theta(\mathbf{y}_l\mid\mathbf{x})\,\pi_{\text{ref}}(\mathbf{y}_w\mid\mathbf{x})}$，正则参数 $\tau > 0$，

$$
\mathcal{L}_{\text{IPO}}(\theta) = \E_{(\mathbf{x}, \mathbf{y}_w, \mathbf{y}_l)\sim\mathcal{D}}\Big[\Big(h_\theta(\mathbf{x}, \mathbf{y}_w, \mathbf{y}_l) - \frac{1}{2\tau}\Big)^2\Big].
$$
:::

::: proposition 为什么 DPO 发散而 IPO 不发散 {#prop-ipo}
对以概率一标注 $\mathbf{y}_w\succ\mathbf{y}_l$ 的单对，DPO 损失 $-\log\sigma(\beta h)$ 关于 $h$ 严格递减，下确界 $0$ 只有当 $h\to\infty$ 时才逼近，因此梯度上升会把 $h$ 无限推大。IPO 损失 $(h - 1/(2\tau))^2$ 在有限差距 $h = 1/(2\tau)$ 处最小。若某对以概率 $p$ 被偏好（标签两个方向都有），期望 IPO 损失在 $h = (2p - 1)/(2\tau)$ 处最小，对一切 $p$ 都有界；而 DPO 的最小点 $\beta h = \log\frac{p}{1-p}$ 在 $p\in\{0, 1\}$ 处为无穷。
:::

::: proof
对一切 $h$，$\frac{d}{dh}[-\log\sigma(\beta h)] = -\beta\sigma(-\beta h) < 0$，且 $-\log\sigma(\beta h)\to0$ 仅当 $h\to\infty$。对双向都有标签的 IPO，期望损失为 $p(h - c)^2 + (1-p)(-h - c)^2$，其中 $c = 1/(2\tau)$（反向标签会把 $h$ 翻号）；其导数 $2p(h - c) + 2(1-p)(h + c)$ 在 $h = (2p - 1)c$ 处为零。DPO 的情形就是[[post-training/reward-models#prop-rm-props]]取奖励差 $\beta h$。
:::

IPO 是把对数比差距回归到一个目标值，而不是最大化似然。它的正则化即使面对确定性标签也有效，代价是：除非数据里两个方向都有，目标差距不依赖一对被偏好的强烈程度。

### KTO {#sec-kto}

成对偏好并非总是可得；常常只有对单个回复的点赞与否。Kahneman–Tversky 优化（KTO，Ethayarajh 等，2024）处理的就是这种非成对标签。其动机来自前景理论的价值函数：把每个回复的隐式奖励 $\hat r_\theta = \beta\log\frac{\pi_\theta(\mathbf{y}\mid\mathbf{x})}{\pi_{\text{ref}}(\mathbf{y}\mid\mathbf{x})}$ 与一个参考点 $z_0$ 比较，$z_0$ 是用批次中其他样本算出的 $\beta D_{\mathrm{KL}}(\pi_\theta\Vert\pi_{\text{ref}})$ 估计，不回传梯度：

$$
\mathcal{L}_{\text{KTO}} = \E_{(\mathbf{x}, \mathbf{y})}\Big[\lambda_y - v(\mathbf{x}, \mathbf{y})\Big],\qquad v = \begin{cases}\lambda_D\,\sigma(\hat r_\theta - z_0) & \mathbf{y}\text{ 可取},\\ \lambda_U\,\sigma(z_0 - \hat r_\theta) & \mathbf{y}\text{ 不可取},\end{cases}
$$

权重 $\lambda_D, \lambda_U$ 可用于校正可取与不可取样例数量的失衡（$\lambda_y$ 是该样例所属类的权重）。作者报告在他们的实验中，用更弱的数据达到了与 DPO 相当的表现。

### ORPO 与 SimPO {#sec-reference-free}

两者都去掉了参考模型，省下它的显存与前向计算。

- **ORPO**（Hong 等，2024，胜率比偏好优化）把 SFT 与偏好学习合并为一个阶段。令长度归一化似然 $P_\theta(\mathbf{y}\mid\mathbf{x}) = \exp\big(\frac1{|\mathbf{y}|}\log\pi_\theta(\mathbf{y}\mid\mathbf{x})\big)$ 及其胜率 $\operatorname{odds}_\theta = P_\theta/(1 - P_\theta)$，最小化 $\mathcal{L}_{\text{SFT}}(\mathbf{y}_w) - \lambda\log\sigma\big(\log\frac{\operatorname{odds}_\theta(\mathbf{y}_w\mid\mathbf{x})}{\operatorname{odds}_\theta(\mathbf{y}_l\mid\mathbf{x})}\big)$：既模仿被选回复，又令其胜率压过被拒回复。
- **SimPO**（Meng 等，2024）把长度归一化对数概率当隐式奖励，并要求一个间隔 $\gamma$：$\mathcal{L}_{\text{SimPO}} = -\log\sigma\big(\frac{\beta}{|\mathbf{y}_w|}\log\pi_\theta(\mathbf{y}_w\mid\mathbf{x}) - \frac{\beta}{|\mathbf{y}_l|}\log\pi_\theta(\mathbf{y}_l\mid\mathbf{x}) - \gamma\big)$。长度归一化让奖励与生成时实际给序列打分的方式对齐，消除了 DPO 偏爱长回复的倾向；去掉参考就失去了显式的 KL 锚，正则只能靠学习率与步数把关。

| 方法 | 数据 | 参考模型 | 隐式奖励 | 正则化 |
|---|---|---|---|---|
| DPO | 成对 | 需要 | $\beta\log(\pi_\theta/\pi_{\text{ref}})$ | KL（隐式），对确定性标签偏弱 |
| IPO | 成对 | 需要 | 对数比差距 $h$ | 到差距 $1/(2\tau)$ 的平方损失 |
| KTO | 单个回复，好或坏 | 需要 | $\beta\log(\pi_\theta/\pi_{\text{ref}})$ 对参考点 | KL 参考点 |
| ORPO | 成对 | 不需要 | 归一化似然的胜率对数 | SFT 项 |
| SimPO | 成对 | 不需要 | $\frac\beta{|\mathbf{y}|}\log\pi_\theta$ | 间隔 $\gamma$，早停 |

::: example SimPO 的间隔 {#ex-simpo}
一条 $100$ 词元的被选回复有 $\log\pi_\theta = -50$，一条 $40$ 词元的被拒回复有 $\log\pi_\theta = -30$。比较 DPO 式未归一化差 $\log\pi_\theta(\mathbf{y}_w) - \log\pi_\theta(\mathbf{y}_l)$ 与 SimPO 的归一化差，取 $\beta = 2$、$\gamma = 0.5$，并计算 SimPO 损失。
::: solution
未归一化：$-50 - (-30) = -20$：冗长的被选回复看起来**更**不可能，纯粹因为它更长。归一化后：$-50/100 = -0.5$ 每词元，对比 $-30/40 = -0.75$，被选回复按每词元反而更可能。SimPO 的自变量为 $2\cdot(-0.5) - 2\cdot(-0.75) - 0.5 = -1 + 1.5 - 0.5 = 0$，损失 $-\ln\sigma(0) = \ln2 = 0.693$：这一对恰好落在所要求间隔的边界上。（DPO 以另一种方式避开长度的原始影响：减去参考模型对同一批回复的对数概率。）
:::
:::

## 组相对策略优化 {#sec-grpo}

DPO 去掉了 RL；GRPO 保留 RL，但去掉其中最昂贵的部件。它随 DeepSeekMath（Shao 等，2024）提出，用**组**内同提示样本算出的基线取代 PPO 学出来的价值模型。

::: definition GRPO（Shao 等，2024）{#def-grpo}
对每个提示 $\mathbf{x}$，从 $\pi_{\text{old}}$ 抽一组 $G$ 个回复 $\mathbf{y}_1, \dots, \mathbf{y}_G$ 并打分 $R_1, \dots, R_G$。当奖励只看结果时，回复 $i$ 的每个词元都取**组归一化优势**

$$
\hat A_i = \frac{R_i - \operatorname{mean}(R_1, \dots, R_G)}{\operatorname{std}(R_1, \dots, R_G)}.
$$

策略最大化 PPO 截断目标（[[post-training/rl-for-language-models#def-ppo]]），对每条回复的词元与整组取平均，再减去直接加在损失上（而非奖励上）的 KL 惩罚：

$$
\mathcal{J}_{\text{GRPO}}(\theta) = \E\Big[\frac1G\sum_{i=1}^{G}\frac{1}{|\mathbf{y}_i|}\sum_{t=1}^{|\mathbf{y}_i|}\Big(\min\big(\rho_{i,t}\hat A_i,\ \operatorname{clip}(\rho_{i,t}, 1-\varepsilon, 1+\varepsilon)\hat A_i\big) - \beta\,\hat D_{i,t}\Big)\Big],
$$

其中 $\rho_{i,t} = \pi_\theta(y_{i,t}\mid\cdot)/\pi_{\text{old}}(y_{i,t}\mid\cdot)$，$\hat D_{i,t} = u - \log u - 1$（$u = \pi_{\text{ref}}(y_{i,t}\mid\cdot)/\pi_\theta(y_{i,t}\mid\cdot)$）是逐词元 KL 的非负 “k3” 估计（[[post-training/rl-for-language-models#sec-kl]]）。
:::

组均值是一个采样基线，能保持梯度方向无偏（[[post-training/rl-for-language-models#prop-rloo]]）；除以组标准差则把每个提示的优势缩放到统一尺度。GRPO 不需要价值模型，既省显存，又避免了给带单一终止奖励的长推理轨迹学分价值这一难题。Shao 等报告它把他们 $70$ 亿参数的指令微调数学模型在 GSM8K 与 MATH 上有所提升。后续分析指出两处归一化会给目标带来偏差：除以 $|\mathbf{y}_i|$ 使长错误回答的每个词元分量变小，反而有利于更长的错误回答；除以标准差则抬高了几乎总能解出或几乎总解不出的提示的权重（Liu 等，2025，主张两处都去掉）；其他修改，如非对称截断、丢弃奖励无方差的组，见于 DAPO（Yu 等，2025）。

::: example 组优势 {#ex-grpo}
某提示 $G = 4$ 个回复得到可验证奖励 $1, 0, 0, 1$（对或错）。用总体标准差计算 GRPO 优势。若四个回复全错会怎样？
::: solution
均值 $0.5$，标准差 $\sqrt{\frac14\sum(R_i - 0.5)^2} = 0.5$。正确回复的优势 $(1 - 0.5)/0.5 = 1$，错误的 $-1$：正确的推理逐词元被强化，错误的被抑制。若四个全错，则每个 $R_i - \text{均值} = 0$ 且标准差为 $0$；实现中会给分母加一个小常数，于是所有优势为 $0$，该提示只通过 KL 项起作用。总能解出或总解不出的提示不携带学习信号，这正是此类训练中课程安排与按难度筛选提示重要的原因。
:::
:::

### 可验证奖励强化学习 {#sec-rlvr}

当正确性可以由程序检查——数学答案对照标准答案、代码通过测试、指令格式可校验——奖励模型就可以换成检查器。Lambert 等（2024，Tülu 3）将其命名为**可验证奖励强化学习**（RLVR），并用它作为数学与精确指令遵循的最后后训练阶段。检查器不会像学出来的奖励模型那样被奉承或利用，但若检查不完整，仍可能被钻空子（测试没覆盖到规范、答案检查器接受格式畸形的输出）。

DeepSeek-R1 报告（DeepSeek-AI，2025）描述了**DeepSeek-R1-Zero**的训练：把 GRPO 直接用于预训练基座模型，只用基于规则的奖励——最终答案正确或通过测试的准确奖励，以及把推理放进指定标签之间的格式奖励。作者引用奖励破解为由，刻意不用神经奖励模型。他们报告：模型学会生成越来越长的推理链（包括复查自己的步骤），平均回复长度在训练中稳定增长，AIME 2024 数学竞赛的 pass@1 准确率从 $15.6\%$ 升至 $71.0\%$。由于 R1-Zero 的输出有可读性与语言混杂问题，正式发布的 DeepSeek-R1 增加了监督“冷启动”数据、进一步强化学习、拒绝采样 SFT，以及覆盖一般任务的最后一个强化学习阶段。以上是特定模型的已报告结果；这类训练如何改变模型的推理、能在多大程度上外推到可检查领域之外，见[[reasoning/verifiable-rewards]]与[[reasoning/test-time-scaling]]。

::: quiz
关于 DPO，哪些说法正确？
- [x] 训练开始时（$\pi_\theta = \pi_{\text{ref}}$），每一对的损失都是 $\ln2$。
- [x] 配分函数 $Z(\mathbf{x})$ 之所以相消，是因为同一对中的两个回复共享同一个提示。
- [ ] DPO 每一步都从当前策略采样回复。
- [ ] 每对只有一个确定性标签时，KL 正则化会使 DPO 策略保持在 $\pi^\star$ 附近。
::: solution
初始化时两个隐式奖励都是 $0$，损失为 $-\log\sigma(0) = \ln2$。$Z(\mathbf{x})$ 只依赖提示，在奖励差中相消（[[#prop-dpo-pref]]）。DPO 是离线的：除迭代变体外从不采样。确定性标签下似然随差距持续增长，策略会漂离 $\pi^\star$（[[#prop-ipo]]及上方程序）。
:::
:::

::: history
KL 正则优化的闭式解[[#eq-optimal]]是经典结论：它就是统计力学中的吉布斯变分原理，在强化学习中以熵正则与 KL 正则控制的解出现（Todorov，2007；Kappen 等，2012；相对熵策略搜索，Peters 等，2010），也见于奖励加权回归（Peters 与 Schaal，2007）。Korbak、Perez 与 Buckley（2022）注意到 KL 正则的 RLHF 等价于以参考模型为先验的贝叶斯推断。Rafailov 等（NeurIPS 2023）把闭式解变成了训练目标，即 DPO。2024 年，IPO（Azar 等，AISTATS）、KTO（Ethayarajh 等，ICML）、ORPO（Hong 等）与 SimPO（Meng 等，NeurIPS）相继问世，同期还有关于 DPO 失败模式及其与 PPO 比较的研究。强化学习一侧，Shao 等（2024）随 DeepSeekMath 提出 GRPO，Lambert 等（2024）在 Tülu 3 中命名了 RLVR，DeepSeek-AI（2025）描述了用基于规则的奖励配合 GRPO 训练的 DeepSeek-R1；该报告后来发表于《自然》（Nature，2025）。
:::

::: summary
- KL 正则目标 $\E_\pi[r] - \beta D_{\mathrm{KL}}(\pi\Vert\pi_{\text{ref}})$ 由**倾斜的参考策略** $\pi^\star\propto\pi_{\text{ref}}e^{r/\beta}$ 最大化，最大值为 $\beta\log Z$（[[#thm-optimal-policy]]）。
- 反解得 $r = \beta\log(\pi^\star/\pi_{\text{ref}}) + \beta\log Z(\mathbf{x})$；在 Bradley–Terry 模型中 $Z$ 相消，对策略取最大似然便是 **DPO 损失** $-\log\sigma(\beta\log\frac{\pi_\theta(\mathbf{y}_w)}{\pi_{\text{ref}}(\mathbf{y}_w)} - \beta\log\frac{\pi_\theta(\mathbf{y}_l)}{\pi_{\text{ref}}(\mathbf{y}_l)})$——一个不需要奖励模型与采样的监督阶段。
- DPO 梯度抬高被选、压低被拒的对数概率，权重为隐式奖励模型的排错概率；每个策略都是其自身隐式奖励的最优解。
- 有偏好概率时 DPO 恢复 $\pi^\star$；确定性标签下差距无限增长、KL 锚消失。实践中两个似然常常双双下降，离策略数据约束不住策略，在线变体有所助益。
- **变体**：IPO（对目标差距的平方损失）、KTO（非成对的好坏标签）、ORPO 与 SimPO（无参考、长度归一化）。没有哪个一致最优。
- **GRPO** 用组归一化奖励与直接 KL 项取代 PPO 的价值模型；配合**可验证奖励**训练出了报告的 DeepSeek-R1-Zero，其推理轨迹在强化学习中变长、AIME 准确率上升。
:::

## 习题

::: exercise 一个倾斜分布 {level=1 check="0.7311"}
某提示有两个回复，$\pi_{\text{ref}} = (0.5, 0.5)$，奖励 $r = (0, 1)$。取 $\beta = 1$，最优策略[[#eq-optimal]]给第二个回复多大概率？保留四位小数。
::: solution
$\pi^\star_2 = 0.5e^1/(0.5 + 0.5e) = e/(1 + e) = \sigma(1) = 0.7311$。
:::
:::

::: exercise 起步损失 {level=1 check="0.6931"}
初始化 $\pi_\theta = \pi_{\text{ref}}$ 时，任意一对的 DPO 损失是多少（保留四位小数）？若你训练日志里的第一个损失是 $0.31$，意味着什么？
::: solution
$-\ln\sigma(0) = \ln2 = 0.6931$。首个损失明显偏离 $\ln2$ 说明开始时 $\pi_\theta\ne\pi_{\text{ref}}$——例如策略与参考模型加载自不同的检查点，或参考对数概率是用不同模板、或在 dropout 开启的状态下算的。
:::
:::

::: exercise 隐式奖励 {level=1 check="0.2"}
$\beta = 0.05$，某回复的对数概率在 DPO 训练中从参考下的 $-120$ 升到策略下的 $-116$。它的隐式奖励是多少？
::: solution
$\hat r = 0.05\cdot(-116 + 120) = 0.2$。
:::
:::

::: exercise 优解的值 {level=2 check="0.3228"}
对[[post-training/rlhf#ex-tilt]]的三回复问题（$\pi_{\text{ref}} = (0.5, 0.3, 0.2)$，$r = (0, 1, 2)$，$\beta = 1$），计算 $\beta\log Z$，并通过计算 $\E_{\pi^\star}[r] - \beta D_{\mathrm{KL}}(\pi^\star\Vert\pi_{\text{ref}})$ 验证[[#thm-optimal-policy]]。再以四位小数给出散度 $D_{\mathrm{KL}}(\pi^\star\Vert\pi_{\text{ref}})$。
::: solution
$Z = 0.5 + 0.3e + 0.2e^2 = 2.7933$，$\beta\log Z = 1.0272$。由 RLHF 一章的算例，$\E_{\pi^\star}[r] = 1.3501$，$D_{\mathrm{KL}} = 0.3228$，于是 $1.3501 - 0.3228 = 1.0273\approx1.0272$（舍入）。散度为 $0.3228$ 纳特。
:::
:::

::: exercise DPO 的梯度权重 {level=2 check="0.2689"}
训练中某对的隐式奖励为 $\hat r(\mathbf{y}_w) = 0.6$、$\hat r(\mathbf{y}_l) = -0.4$。[[#eq-dpo-grad]]的梯度权重 $\sigma(-\hat\Delta)$ 是多少（保留四位小数）？更新比初始时刻小多少倍？
::: solution
$\hat\Delta = 1.0$，$\sigma(-1) = 0.2689$；初始时权重为 $0.5$，所以更新只有当初的 $0.538$ 倍。已以差距排对的样例权重更小，排错的更大。
:::
:::

::: exercise 混合标签下的 IPO {level=2 check="0.3"}
某对两个方向都有标签，$\mathbf{y}_1$ 在 $80\%$ 的标签中胜出。取 $\tau = 1$，由[[#prop-ipo]]，IPO 收敛到哪个对数比差距 $h$？总体标签下 DPO 会收敛到哪个奖励差 $\beta h$？
::: solution
$h = (2p - 1)/(2\tau) = 0.6/2 = 0.3$。DPO：$\beta h = \log(0.8/0.2) = \ln4 = 1.386$。IPO 的目标关于 $p$ 线性且有界；DPO 的目标是对数胜率，$p\to1$ 时无界。
:::
:::

::: exercise GRPO 优势 {level=2 check="1.7321"}
一组 $G = 4$ 个回复得到奖励 $1, 0, 0, 0$。用总体标准差计算 GRPO 优势，给出正确回复的优势（保留四位小数）。与留一优势 $R_i - \frac{1}{G-1}\sum_{j\ne i}R_j$ 比较。
::: solution
均值 $0.25$；方差 $\frac14(0.75^2 + 3\cdot0.25^2) = \frac14(0.5625 + 0.1875) = 0.1875$，标准差 $0.4330$。优势：正确的 $0.75/0.433 = 1.7321$，其余 $-0.25/0.433 = -0.5774$。留一：$1 - 0 = 1$ 与 $0 - \frac13 = -0.333$——如[[post-training/rl-for-language-models#prop-rloo]]，它与去均值成 $\frac{G}{G-1} = \frac43$ 的比例（$0.75\cdot\frac43 = 1$），但没有除以标准差那一步，而正是那一步让 GRPO 在困难提示上把罕见成功计得更高。
:::
:::

::: exercise 为排序推导 DPO {level=3}
Plackett–Luce 模型给出 $K$ 个回复的排序 $\mathbf{y}_{(1)}\succ\mathbf{y}_{(2)}\succ\dots\succ\mathbf{y}_{(K)}$ 的概率为 $\prod_{k=1}^{K}\frac{\exp r(\mathbf{x}, \mathbf{y}_{(k)})}{\sum_{j\ge k}\exp r(\mathbf{x}, \mathbf{y}_{(j)})}$。代入重参数化[[#eq-reparam]]，证明 $Z(\mathbf{x})$ 相消，得到排序版 DPO 损失。$K = 2$ 时它退化成什么？
::: solution
由 $r = \hat r + \beta\log Z(\mathbf{x})$、$\hat r = \beta\log(\pi/\pi_{\text{ref}})$，每个指数项都多出同一个因子 $Z(\mathbf{x})$，在每个因子的分子分母之间相消：

$$
P(\text{排序}) = \prod_{k=1}^{K}\frac{\exp\hat r(\mathbf{x}, \mathbf{y}_{(k)})}{\sum_{j\ge k}\exp\hat r(\mathbf{x}, \mathbf{y}_{(j)})}.
$$

损失是其负对数，$-\sum_k\big[\hat r_\theta(\mathbf{y}_{(k)}) - \log\sum_{j\ge k}e^{\hat r_\theta(\mathbf{y}_{(j)})}\big]$，即一列 softmax 交叉熵：每一阶段，下一个胜出的回复必须战胜其余所有。$K = 2$ 时最后一个因子为 $1$，第一个是 $e^{\hat r_1}/(e^{\hat r_1} + e^{\hat r_2}) = \sigma(\hat r_1 - \hat r_2)$，回到[[#eq-dpo]]。Rafailov 等在附录中给出了这一推广。
:::
:::

::: exercise 高斯倾斜 {level=3}
设 $\pi_{\text{ref}} = \Normal(0, 1)$ 定义在 $\R$ 上，$r(y) = ay - \frac c2y^2$，$c\ge0$。用[[#thm-optimal-policy]]（以密度代替概率）求 $\pi^\star$、它在 $r$ 下的期望奖励，以及 $D_{\mathrm{KL}}(\pi^\star\Vert\pi_{\text{ref}})$。证明 $c = 0$ 时散度为 $a^2/(2\beta^2)$，并解释：正的 $c$——惩罚极端输出的奖励——对权衡有什么影响。
::: solution
$\pi^\star(y)\propto\exp(-\frac{y^2}{2} + \frac{ay}{\beta} - \frac{cy^2}{2\beta}) = \exp\big(-\frac{1 + c/\beta}{2}y^2 + \frac a\beta y\big)$，是精度为 $s = 1 + c/\beta$、均值 $\mu = \frac{a/\beta}{s} = \frac{a}{\beta + c}$、方差 $1/s$ 的正态分布。期望奖励：$a\mu - \frac c2(\mu^2 + 1/s)$。两个正态之间的散度：$D_{\mathrm{KL}}(\Normal(\mu, 1/s)\Vert\Normal(0, 1)) = \frac12\big(\frac1s + \mu^2 - 1 + \log s\big)$。$c = 0$ 时 $s = 1$、$\mu = a/\beta$，散度为 $\frac12\mu^2 = a^2/(2\beta^2)$，与图一致。正的 $c$ 让平移缩到 $a/(\beta + c)$，方差也缩小：$\beta\to0$ 时优解不再任意远移，而是收敛到奖励的最大点 $y = a/c$、方差趋于零——散度此后只靠方差收窄而增长，约为 $\frac12\log(c/\beta)$。有界的奖励给出有界的移动激励；无界的奖励（如线性奖励）会为愈发极端的输出不断付酬，这正是奖励破解的连续版本。
:::
:::
