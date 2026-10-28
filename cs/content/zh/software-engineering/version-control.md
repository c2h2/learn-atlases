两位开发者协作同一个程序。人手一份拷贝；各改一周；然后一位把自己改的版本用邮件发给另一位，后者把对方没动过的文件覆盖过去，再手工合并两人都改过的部分。有东西丢了——周二改好的一个修复悄悄消失——一个月后顾客再次报上来同一个缺陷，才有人发觉。问到生产环境跑的是哪个版本的代码，没有人说得准。每个这样工作过的团队都有类似的故事。

**版本控制系统**记录一组文件的每次改动、由谁在何时为何而做；让人们在互不干扰的开发线上工作并把它们合并；并且能精确重现任何过去的状态。本章解释 Git——截至 2026 年占主导地位的系统——如何表示历史——作为一张内容寻址快照构成的图——以及这种表示保证了什么；三方合并如何工作、何时必须停下来求助于人；团队如何组织分支、互相评审改动并持续集成；以及历史本身如何成为调试工具。下面每个会话都在 Git 2.53 下运行。

## 快照与历史

::: definition 提交与历史 {#def-commit}
一次**提交**记录被跟踪文件全集的一个**快照**、一个**父**提交列表（第一次提交没有父，普通改动一个，合并两个或更多），以及**元数据**：作者、提交者、时间戳和说明信息。仓库的**历史**是以提交为顶点、以每个提交指向其父的边为边的有向图；它是无环的，因为一个提交只能指定已经存在的提交为父。若从 $c$ 到 $a$ 存在一条路径（我们把 $c$ 视为自己的祖先），则称提交 $a$ 是提交 $c$ 的**祖先**。
:::

Git 存快照，不存差异：一次提交不说「第 2 行改了」，而说「这里是完整的文件树」。（差异在你需要时计算，并在包文件中紧凑存储，但那只是优化。）一切都保存在一个**对象数据库**中，对象有四种：**blob**（数据对象）保存一个文件的内容；**tree**（树对象）列出目录中各条目的名字、模式与对象；**commit**（提交对象）指向一个树和它的父；**tag**（标签对象）给提交起名字。每个对象都以其内容的**哈希**为存储名。

```console
$ export GIT_AUTHOR_NAME=Ada GIT_AUTHOR_EMAIL=ada@example.org GIT_COMMITTER_NAME=Ada GIT_COMMITTER_EMAIL=ada@example.org
$ export GIT_AUTHOR_DATE=2026-03-02T10:00Z GIT_COMMITTER_DATE=2026-03-02T10:00Z
$ git init -q -b main shop && cd shop
$ printf 'def total(prices):\n    return sum(prices)\n' > pricing.py
$ git add pricing.py
$ git commit -m "Add pricing.total"
[main (root-commit) fab3744] Add pricing.total
 1 file changed, 2 insertions(+)
 create mode 100644 pricing.py
$ git cat-file -p HEAD
tree 5eca0a3b4ad4cf62bb2c7a1254afac5896cab6e6
author Ada <ada@example.org> 1772445600 +0000
committer Ada <ada@example.org> 1772445600 +0000

Add pricing.total
$ git cat-file -p 'HEAD^{tree}'
100644 blob aa11c8780835909b20ba5d886e45b00f65b2026c	pricing.py
```

（`export` 行固定了名字和日期，这样你敲同样的命令就能得到同样的哈希；若用你自己的姓名和当前时间，下面每个哈希都会不同。）`git cat-file -p` 打印一个对象。提交指名它的树；树指名 `pricing.py` 的 blob。blob 的名字是一段短头部加文件字节的 SHA-1 哈希。

::: example 计算 blob 的名字 {#ex-blob-hash}
不用 Git，验证 `aa11c87…` 正是保存 `pricing.py` 的 blob 的名字。
::: solution
Git 对以下字节做哈希：`blob`、一个空格、十进制长度、一个零字节，然后是内容：

```python
import hashlib
data = open("pricing.py", "rb").read()
print(hashlib.sha1(b"blob %d\x00" % len(data) + data).hexdigest())
```

```console
$ python3 blobhash.py
aa11c8780835909b20ba5d886e45b00f65b2026c
$ git hash-object pricing.py
aa11c8780835909b20ba5d886e45b00f65b2026c
```

该文件有 42 字节（`def total(prices):` 与 `    return sum(prices)`，连同各自的换行符各 19 和 23 字节），所以被哈希的输入以 `blob 42\0` 开头。改动任何一个字节都会得到一个毫无关系的 40 位名字。树和提交用同样的方式哈希，头部是 `tree` 和 `commit`。
:::
:::

以内容的哈希为对象命名——**内容寻址**——带来一个非凡的推论。

::: proposition 提交哈希决定整个历史 {#prop-hash-history}
假设哈希函数是抗碰撞的：没有人能找到两个哈希相同的不同对象。那么哈希相同的两个提交有相同的快照、相同的元数据、以及完全相同的全部历史——每个祖先提交和其中的每个文件都一模一样。
:::

::: proof
对提交到根（无父的提交）的最长路径长度归纳。提交存储的内容包括其树的哈希和其父的哈希。若两个提交哈希相同，则由抗碰撞性它们的内容相同，所以它们指名同一个树和同一组父。相同的树哈希意味着同一个树对象，它指明的 blob 和子树相同，于是——把同样的论证沿目录结构往下用——文件相同。对父提交：它们哈希相等且到根的最长路径严格更短，故由归纳假设它们有相同的历史。于是这两个提交也有相同的历史。根提交没有父，这是归纳基础。
:::

所以，一个 40 个字符的提交哈希是一切导致它的东西的校验和。两个人只要对一个哈希达成一致，就对全部历史达成一致；任何人篡改旧提交——无心的也好，磁盘损坏，还是故意——它的哈希就会变，从而其全部后代的哈希也都跟着变，而这很容易察觉。这与区块链、默克尔树（Merkle tree）是同一个想法，也是 Git 能做成分布式的缘由：每个克隆都是完整副本，克隆之间可以交换对象，因为名字相等就意味着内容相等。这个假设很重要。阿姆斯特丹 CWI 与 Google 的团队在 2017 年 2 月发表了第一个实际的碰撞（"SHAttered"），表明 SHA-1 可以被攻破；Git 的应对是使用能检测此类碰撞攻击的加固 SHA-1 实现，并加入了 SHA-256 对象格式，不过截至 2026 年多数仓库仍用 SHA-1（[[cryptography]] 讲解哈希函数与抗碰撞性）。

## 分支与合并

Git 里的**分支**不过是一个指向提交的、可移动的具名指针；在分支上提交就把指针移到新提交上。`HEAD` 指你所处的分支。正因为分支如此廉价，人们给每项工作开一个，事后再合并。

要合并两条开发线，Git 把它们各自与**合并基**（merge base）比较。

::: definition 合并基 {#def-merge-base}
提交 $x$ 与 $y$ 的**共同祖先**是同为二者祖先的提交。**最佳共同祖先**（**合并基**）是并非任何其他共同祖先的真祖先的共同祖先。在没有交叉合并的历史里恰有一个；一般情况下可能有多个。
:::

::: widget graph
nodes: A@0,1; B@1,0; C@1,2; D@2,0; E@2,2; F@3,0; G@3,2
edges: B>A; C>A; D>B; D>C; E>C; E>B; F>D; G>E
algorithm: bfs
start: F
caption: 一张箭头从每个提交指向其父的历史。分支在 `A` 分岔；接着 `D` 把 `C` 合并进上面的分支，而 `E` 把 `B` 合并进下面的分支——一次**交叉**（criss-cross）合并。从 `F` 出发做广度优先搜索：它访问 `F` 的全部祖先。从 `G` 再做一次：共同祖先是 `A`、`B` 和 `C`，而 `A` 同时是 `B` 和 `C` 的祖先，所以 `F` 与 `G` 的最佳共同祖先是 `B` *和* `C`。Git 的默认合并策略先把两个基合并成一个虚拟基来处理这种情形。
:::

### 三方合并

为什么非得要合并基？设想某文件的第 5 行在一个分支上是 `timeout = 60`，在另一个分支上是 `timeout = 30`。只凭两个版本，任何工具都不知道哪个是新的。有了基就知道：若基里是 `30`，那么一边改了而另一边没改，改的应当胜出。

::: definition 三方合并 {#def-merge3}
给定基版本 $b$ 与由它派生的两个版本 $o$（"ours"，我方）和 $t$（"theirs"，对方），**三方合并**按下面的规则对内容的每个区域（每一行，或由差异算法对齐的行块）作出决定：

| $o$ 与 $t$ | $o$ 与 $b$ | $t$ 与 $b$ | 结果 |
|---|---|---|---|
| 相同 | — | — | $o$（两边一致，或两边都没改） |
| 不同 | 相同 | 不同 | $t$（只有对方改了） |
| 不同 | 不同 | 相同 | $o$（只有我方改了） |
| 不同 | 不同 | 不同 | **冲突** |

冲突会报告给用户，由用户定夺。
:::

::: example 合并配置 {#ex-merge3}
两人从同一个基出发编辑一个以字典存放的配置。为字典实现 [[#def-merge3]]（每个键是一个区域），合并两人的编辑。
::: solution
对有天然对齐方式的数据（如设置字典），规则可以直接实现：

```python
def merge3(base, ours, theirs):
    """对同一个字典的两份编辑做三方合并（例如配置）。
    返回 (merged, conflicts)；缺失的键表示已删除。"""
    MISSING = object()
    merged, conflicts = {}, []
    for key in sorted(base.keys() | ours.keys() | theirs.keys()):
        b, o, t = (d.get(key, MISSING) for d in (base, ours, theirs))
        if o == t:              # 两边一致（可能都没改）
            result = o
        elif o == b:            # 只有对方改了
            result = t
        elif t == b:            # 只有我方改了
            result = o
        else:                   # 两边都改了，且改法不同
            conflicts.append(key)
            result = b
        if result is not MISSING:
            merged[key] = result
    return merged, conflicts

base   = {"currency": "GBP", "vat": 0.20, "timeout": 30, "theme": "light"}
ours   = {"currency": "GBP", "vat": 0.20, "timeout": 60, "theme": "light", "retries": 3}
theirs = {"currency": "EUR", "vat": 0.20, "timeout": 45}          # theme 被删除
print(merge3(base, ours, theirs))
```

```console
$ python3 merge3.py
({'currency': 'EUR', 'retries': 3, 'timeout': 30, 'vat': 0.2}, ['timeout'])
```

对方改了货币、删了主题，我方加了重试次数：三处都取。两边都改了超时且改法不同，所以这是冲突（保留基值，等待用户定夺）。
:::
:::

::: proposition 三方合并的性质 {#prop-merge3}
对一切基 $b$ 与版本 $o$、$t$，[[#def-merge3]] 的合并满足：(a) 若 $t = b$，结果是 $o$ 且无冲突（$o = b$ 时对称）；(b) $o$ 与自身合并得 $o$ 且无冲突；(c) 合并是对称的——交换 $o$ 与 $t$ 得到相同的结果和相同的冲突；(d) 一个区域冲突当且仅当两边都改过它、且改法不同。
:::

::: proof
每条性质都逐区域成立，故考虑一个取值为 $b, o, t$ 的区域。(a) 若 $t = b$：当 $o = t$ 时结果为 $o$；否则 $o \ne t = b$，第三行适用，结果仍是 $o$。不可能有冲突，因为冲突行要求 $t \ne b$。(b) $t = o$ 时第一行适用。(c) 第一行和第四行关于 $o$ 与 $t$ 对称，交换 $o$ 与 $t$ 把第二、三行互换，而这两行各选取改动了的那一侧的值——与之前相同的值。(d) 冲突行恰好是 $o \ne t$、$o \ne b$、$t \ne b$。
:::

性质 (d) 说清了合并*不能*做什么。三方合并纯粹是文本层面的：它知道两边各改了哪些区域，不知道改动的含义。不同区域的两处改动哪怕逻辑上不相容——一个分支给函数改了名，另一个分支用旧名新增了一个调用——也会「干净地」合并，而合并后的程序会失败。这就是干净的合并仍必须构建和测试的原因。

::: example 一次真实的合并冲突 {#ex-conflict}
继续上面的仓库。在分支 `discount` 上把 `total` 改成接受一个折扣参数；与此同时在 `main` 上让它按便士取整。合并，并解决冲突。
::: solution
```console
$ git switch -c discount
Switched to a new branch 'discount'
$ printf 'def total(prices, discount=0.0):\n    return sum(prices) * (1 - discount)\n' > pricing.py
$ git commit -am "Support a percentage discount"
[discount aff3dbf] Support a percentage discount
 1 file changed, 2 insertions(+), 2 deletions(-)
$ git switch main
Switched to branch 'main'
$ printf 'def total(prices):\n    return round(sum(prices), 2)\n' > pricing.py
$ git commit -am "Round totals to pence"
[main 9809dee] Round totals to pence
 1 file changed, 1 insertion(+), 1 deletion(-)
$ git merge-base main discount
fab3744a2c46e090c61773a419ef7b1e716c1b1c
$ git -c merge.conflictStyle=diff3 merge discount
Auto-merging pricing.py
CONFLICT (content): Merge conflict in pricing.py
Automatic merge failed; fix conflicts and then commit the result.
$ cat pricing.py
<<<<<<< HEAD
def total(prices):
    return round(sum(prices), 2)
||||||| fab3744
def total(prices):
    return sum(prices)
=======
def total(prices, discount=0.0):
    return sum(prices) * (1 - discount)
>>>>>>> discount
```

合并基是第一次提交。两个分支都把 `return` 行改成了不同的样子——[[#def-merge3]] 的第四行——于是 Git 停了下来。`diff3` 冲突样式显示三个区段：我方（`HEAD`）、基、对方。读了基，意图就清楚了：`main` 加的是取整，`discount` 加的是参数。正确的解决把两者结合，这是任何文本规则都产生不了的：

```console
$ printf 'def total(prices, discount=0.0):\n    return round(sum(prices) * (1 - discount), 2)\n' > pricing.py
$ git commit -qam "Merge branch 'discount'"
$ git log --graph --oneline
*   0543f77 Merge branch 'discount'
|\  
| * aff3dbf Support a percentage discount
* | 9809dee Round totals to pence
|/  
* fab3744 Add pricing.total
$ git cat-file -p HEAD
tree 86831015c282266b76c730747d989ddbcdb727b5
parent 9809dee893bb50727e9b89f178c990f1539d1dc6
parent aff3dbf374e85568fe221ea29b4f3b1216741c8a
author Ada <ada@example.org> 1772445600 +0000
committer Ada <ada@example.org> 1772445600 +0000

Merge branch 'discount'
```

合并提交有两个父。用 `git config --global` 把 `merge.conflictStyle` 永久设为 `diff3`（或 `zdiff3`）是值得的：没有基区段，你只能猜两边各自的意图。
:::
:::

如果正在被合并的分支已经包含当前提交——分岔以后 `main` 上什么都没发生——Git 只是把指针向前挪，称为**快进**（fast-forward），不产生合并提交。合并的另一种选择是**变基**（rebase）：在功能分支上运行 `git rebase main`，把分支的提交逐个重放到 `main` 之上，产生带新哈希的新提交和线性历史。由 [[#prop-hash-history]]，变基后的提交是不同的提交，所以拿到旧提交的人现在有了一对分岔的历史。

::: warning 不要改写别人已有的历史
变基、修补（`git commit --amend`）与压扁会改变提交哈希。在你自己的未发布分支上，这无害，而且常常让历史更整洁。在别人已拉取的分支上，它迫使每个协作者去协调同一工作的两个版本，而一次大意的 `git push --force` 可能把他们的提交从共享仓库中删掉。经验法则：只改写你没有分享过的东西；确实必须强推自己的分支时，用 `git push --force-with-lease`，若其间有别人推送过，它会拒绝。相关的误解：「Git 会保住我的作品，所以我不需要备份。」只存在于你本地仓库的提交会随你的磁盘一起丢失；把它们推出去。
:::

## 协作

### 分支工作流

团队就分支的用法约定规范。在**功能分支**工作流中，每个改动在自己的分支上开发，评审后合并进主干，常常通过托管服务上的**拉取请求**（pull request，或称合并请求）。**Git flow**（Vincent Driessen，2010）为按版本发布的软件增设了长期存在的 `develop` 与发布分支；作者后来指出，持续交付的软件很少需要它。在**主干开发**（trunk-based development）中，人人每天至少把小改动集成进主干（trunk），分支即便有也只活几个小时；未完成的功能藏在运行期开关后面，而不是留在分支上。在 *Accelerate* 调查中（[[software-engineering/software-process]]），主干式实践——活动分支少、一天内合并——与更高的交付绩效相关联；与那些结果一样，这是调查相关性，不是受控实验。

为什么长期存在的分支会带来痛苦？一个玩具模型能显示这个效应的形状。设代码库有 $N$ 个文件，两条分支各随机修改 $k$ 个文件。两条分支碰到同一个文件——潜在冲突——的概率为
$$
P(\text{重叠}) = 1 - \binom{N - k}{k} \Big/ \binom{N}{k} \;\approx\; 1 - \Bigl(1 - \frac{k}{N}\Bigr)^{k}.
$$ {#eq-overlap}
当 $k$ 较小时概率大致按 $k^2/N$ 增长：这是生日问题效应。$N = 100$ 时，各碰 2 个文件的分支重叠概率约 $4\%$，各碰 10 个文件的约 $67\%$。由于分支触碰的文件数随其寿命增长，冲突风险大致随集成间隔时间的*平方*增长。真实改动并非均匀随机——有些文件是人人都碰的热点——这使重叠更加频繁。

::: widget plot
f: 1 - (1 - x/n)^x
x: 0, 40
y: 0, 1
sliders: n=20:10:1000:100
labels: P(\text{两个分支碰到同一个文件})
caption: [[#eq-overlap]] 中的近似式：两条分支各在 $N$ 个文件（滑块）中随机改动 $k$ 个（横轴）。曲线先缓慢后陡峭地上升，如同生日问题。$N = 100$ 时，各含 10 个文件的两条分支很可能相撞。增大 $N$：更大的代码库帮助很慢，因为 50% 之点按 $\sqrt{N}$ 增长。这个模型的教训——小改动要频繁集成——经受得住「均匀选取」这一不现实假设的考验。
:::

### 代码评审

改动合并进来之前，通常由另一位开发者**评审**它。迈克尔·法根（Michael Fagan）在 IBM 的正式**检阅**（inspection）（"Design and code inspections to reduce errors in program development"，*IBM Systems Journal*，1976）是有明确角色、检查表和会前准备的会议，据报告能在测试之前发现很大一部分缺陷。现代代码评审更轻：评审者在工具里读 diff，写意见，批准。它的好处远不止发现缺陷。巴凯利（Bacchelli）与伯德（Bird）（"Expectations, outcomes, and challenges of modern code review"，ICSE 2013）发现，微软的开发者把找缺陷列为首要动机，但大多数评审意见涉及代码改进、理解与替代方案，而知识传递是一项重要产出。麦金托什（McIntosh）等人（MSR 2014）在三个开源项目中发现，评审覆盖率低、评审参与度低的组件倾向于有更多发布后缺陷。这些都是观察性研究；它们一致的信息是：评审者真正投入改动时评审才有帮助，而这在很大程度上取决于改动的大小。

由此而来的实践建议：改动保持小而专，让评审者一次能看懂一个；写说明，讲清改动做了什么、为什么；按正确性、设计、测试与清晰度评审，而不仅是风格（风格交给自动格式化工具和 linter）；意见就代码本身写成疑问或建议，而不是对作者的评判。

::: quiz
某开发者把分支 `feature` 合并进 `main`。合并顺利完成，没有冲突。这保证了什么？
- [ ] 合并后的程序能通过编译并通过它的测试。
- [ ] 没有两个提交改过同一个文件。
- [x] 自合并基以来，任何文件的任何区域都没有被两条分支以不同方式改过。
- [ ] 两条分支的改动在逻辑上相容。
::: solution
由 [[#prop-merge3]](d)，冲突恰在两边以不同方式改动同一区域时发生，所以干净合并只保证这样的区域不存在。两条分支可能在同一个*文件*的不同区域各做了改动，而不同区域的改动仍可能逻辑不相容——一边改了名的函数，另一边新增了对旧名的调用——程序可能构建失败或测试不通过。那正是持续集成要检查的。
:::
:::

## 持续集成

::: definition 持续集成与持续交付 {#def-ci}
**持续集成**（CI）是这样一种实践：每位开发者的工作都频繁地——至少每天——合并进一条共享主线，每次合并都自动**构建**并**测试**，并把构建失败当作必须立即修复的紧急事故。**持续交付**进一步要求：每个通过自动**部署流水线**（构建、测试、更多检查、预发布环境）的改动都能一键发布；**持续部署**则自动发布每一个这样的改动。
:::

「持续集成」一语出现在布奇（Grady Booch）关于面向对象设计的著作（1991）中，并成为极限编程的核心实践；福勒（Martin Fowler）的文章 "Continuous Integration"（2000，2006 年及以后修订）描述了如今已成标准的实践；汉布尔（Jez Humble）与德利（David Farley）的《持续交付》（*Continuous Delivery*，2010）则给出了流水线。其原则是：集成问题随未集成工作量的增长而增长（如 [[#eq-overlap]] 所示），因此持续集成让每个问题都保持小、其起因都显而易见：构建若在过去一小时里被破坏，原因就在过去一小时的提交之中。

CI 服务器——若干托管或自建服务中的任何一种——在每次推送时运行一个脚本。无论用哪种服务，脚本才是本质部分，并且应当能在任何开发者的机器上运行：

```console
$ cat ci.sh
#!/bin/sh
set -e                        # stop at the first failing step
python3 -m compileall -q .    # does everything at least parse?
python3 layers.py             # architectural rules (see the architecture chapter)
python3 -m pytest -q          # the test suite
$ sh ci.sh; echo "exit status $?"
.                                                                        [100%]
1 passed in 0.15s
exit status 0
$ echo 'from shop import web' >> shop/db.py      # someone takes a shortcut
$ sh ci.sh; echo "exit status $?"
violation: db (layer 1) imports web (layer 3)
exit status 1
```

（这里用的是 [[software-engineering/software-architecture#ex-layer-check]] 中的 shop 包——去掉了那条被禁止的导入——外加一个 pytest 测试；pytest 是第三方包，装在虚拟环境里。）失败的步骤返回非零退出码，令脚本停止、并把该提交标记为破坏；服务在拉取请求上报告它，而团队的约定是：主干被破坏优先于新工作。要让 CI 起作用，测试套件必须**快**（极限编程的目标是十分钟构建）并且**可靠**：一个随机失败的「不稳定」测试会教会所有人无视失败，从而摧毁信号。[[software-engineering/testing]] 讨论如何让测试套件保持快而确定。

### 作为调试工具的历史

小的、经过测试的提交构成的历史也是一个搜索空间。若出现了缺陷而你知道某个提交还没有它，就对二者之间的提交做**二分**，找出引入它的那个改动，只需对数次测试（[[programming-1/testing-debugging#thm-bisect-versions]]）。Git 把这件事自动化了，用 `git bisect run` 它会替你运行测试。

::: example 自动二分定位 {#ex-bisect}
某仓库有 32 个提交；下面的测试在第一个提交处通过，在最后一个提交处失败。自动找出第一个坏提交。
::: solution
测试是一个用退出码表示好（0）或坏（非零）的脚本：

```python
import sys
from pricing import total
sys.exit(0 if total([1, 2, 3]) == 6 else 1)     # 退出码 0 = 好，1 = 坏
```

```console
$ git bisect start HEAD $(git rev-list --max-parents=0 HEAD)
Bisecting: 15 revisions left to test after this (roughly 4 steps)
[36aa22b17a90aea8a1af49cf220a03076d8d10cb] Change 16
$ git bisect run python3 -B check.py
running 'python3' '-B' 'check.py'
Bisecting: 7 revisions left to test after this (roughly 3 steps)
[b81dad2bc4bb77e4e551fe6e054250a2e83bff82] Change 24
running 'python3' '-B' 'check.py'
Bisecting: 3 revisions left to test after this (roughly 2 steps)
[2252ff358f809e5e1ce49265898a48b72215445e] Change 20
running 'python3' '-B' 'check.py'
Bisecting: 1 revision left to test after this (roughly 1 step)
[3fee66d470bfeb19f3db9c87534bc941be9e651b] Change 22
running 'python3' '-B' 'check.py'
Bisecting: 0 revisions left to test after this (roughly 0 steps)
[4e6e7dd1586790878222c9cf7397cbded6538a5a] Change 23
running 'python3' '-B' 'check.py'
4e6e7dd1586790878222c9cf7397cbded6538a5a is the first bad commit
commit 4e6e7dd1586790878222c9cf7397cbded6538a5a
Author: Ada <ada@example.org>
Date:   Mon Mar 2 10:00:00 2026 +0000

    Change 23

 pricing.py | 4 ++--
 1 file changed, 2 insertions(+), 2 deletions(-)
bisect found first bad commit
$ git bisect reset
```

`git bisect start BAD GOOD` 先给坏提交（这里是 `HEAD`），再给一个好的（根提交，用 `git rev-list --max-parents=0` 找到）。五次测试——提交 16、24、20、22 和 23——就够从 31 个候选中定位，正如 $\lceil \log_2 32\rceil = 5$ 所预测。测试脚本没有被跟踪，所以 Git 逐个检出提交时它原地不动；`-B` 标志阻止 Python 写缓存字节码，否则缓存可能在检出之间被复用。退出码 125 告诉 `git bisect run` *跳过*一个无法测试的提交（比如构建不过的）。二分只有每个提交都能构建、且都足够小时才好用——这又是「小而经过测试的提交」的一条理由。（这 32 个提交的历史由一个使用同样固定名字和日期的脚本生成，所以哈希可复现。）
:::
:::

让历史有用的是提交信息。一条好的提交信息有一行简短摘要（约 50 个字符，用祈使语气："Round totals to pence"）、一个空行、以及一个正文，解释*为什么*做这个改动、否决过哪些替代方案、影响到什么。diff 展示了*改了什么*；只有信息能说明为什么，两年后读它的人——常常就是作者自己——会需要知道。

::: history
马克·罗奇金（Marc Rochkind）1972 年在贝尔实验室编写了源代码控制系统 SCCS（发表于 *IEEE Transactions on Software Engineering*，1975）；瓦尔特·蒂希（Walter Tichy）的 RCS 于 1982 年跟进；迪克·格鲁内（Dick Grune）的 CVS 让许多开发者并发工作在同一个共享仓库上，出现于 1986 年。Subversion（2000）以原子提交改进了 CVS。接下来是分布式系统——每个克隆都持有整个历史：Linux 内核从 2002 年起使用专有的 BitKeeper，2005 年 4 月其免费许可被撤回，林纳斯·托瓦兹（Linus Torvalds）在几周内写出了 Git，马特·麦科尔（Matt Mackall）同月启动了 Mercurial。在其之上建立的托管服务以 GitHub（2008）为首，普及了拉取请求，使代码评审在开源项目中成为常规。法根的检阅始于 1976 年，持续集成始于 1990 年代。
:::

## 后续内容

CI 运行的测试套件是 [[software-engineering/testing]] 的主题，而一段好历史所记录的小而安全的步骤，正是 [[software-engineering/refactoring-maintenance]] 的方法。内容寻址背后的哈希函数见 [[cryptography]]；当副本可以被独立修改时如何保持一致——合并通过求助于人解决这个问题——在复制数据库与 [[distributed-systems/replication-consistency]] 中重新出现，而且没有可求助的人。许可证规定你对别人仓库里的代码能做什么，见 [[software-engineering/professional-ethics]]。

::: summary
- Git 把**快照**记录为无环历史图中的提交（[[#def-commit]]）；blob、tree、提交都以其内容的**哈希**存储。
- 哈希抗碰撞时，提交的哈希决定它的全部历史（[[#prop-hash-history]]）；改写一个提交会改变其后代的哈希。SHA-1 的弱点已有缓解措施，并支持 SHA-256。
- 分支是可移动的指针。合并把两边各自与**合并基**比较（[[#def-merge-base]]）；**三方合并**取改动了该区域的那一侧，只有两边都改且改法不同时才报告冲突（[[#def-merge3]]、[[#prop-merge3]]）。
- 干净的合并不等于正确的程序：结果总是要构建和测试。绝不要改写别人已有的历史。
- 长期存在的分支冲突概率大致按平方增长（[[#eq-overlap]]）；小改动要频繁集成。评审小改动；评审在发现缺陷之外还传播知识。
- **持续集成**构建并测试每次合并，破坏立即修复（[[#def-ci]]）；让测试套件快而可靠。
- `git bisect run` 用 $\lceil \log_2 n\rceil$ 次测试找出第一个坏提交；写说明*原因*的提交信息。
:::

## 习题

::: exercise 第一次提交里的对象 {level=1 check="3"}
在一个新建的仓库里，你在顶层目录创建一个文件，add 它并 commit。这次提交给对象数据库增加了几个新对象？（输入数值。）
::: solution
三个：文件内容的 blob、顶层目录的 tree（列出该文件）、以及提交（指向该树），正如 `git cat-file -p` 展示的。若文件在子目录里，就会多一个 tree。内容相同的两个文件共享同一个 blob。
:::
:::

::: exercise 套用合并规则 {level=1}
用 [[#def-merge3]] 给出每个键的合并结果，或说「冲突」。每个三元组是 (base, ours, theirs)，`—` 表示不存在：(a) `(10, 10, 12)`；(b) `(10, 11, 11)`；(c) `(10, 11, 12)`；(d) `(—, 5, —)`；(e) `(10, —, 10)`；(f) `(10, —, 12)`。
::: solution
(a) 只有对方改了：`12`。(b) 两边同法改动：`11`。(c) 两边都改、改法不同：冲突。(d) 只有我方新增：`5`。(e) 只有我方删除：不存在。(f) 我方删除、对方修改：冲突（Git 所谓 "modify/delete"）——要由用户定夺修改是否使删除变成错误。
:::
:::

::: exercise 被改写的历史 {level=1}
你在一个已推送的分支上，修补了往前数第三个提交的提交说明。哪些提交的哈希会变？为什么早先拉取过该分支的同事现在看到了分岔？
::: solution
被修补的提交得到新哈希，因为它的说明是其内容的一部分。它的子提交存储着父的哈希，于是它的内容与哈希也跟着变，如此传递：全部三个后代都有新哈希（[[#prop-hash-history]]）。被修补提交之前的提交不变。同事的仓库里是旧的四个提交；共享分支现在指向四个哈希不同、但共同祖先相同的提交。对 Git 来说这是两条分岔的开发线，一次 pull 会试图合并它们，把工作重复一遍。
:::
:::

::: exercise 重叠概率 {level=2 check="0.67"}
用 [[#eq-overlap]] 的精确公式，两条分支各随机修改 100 个文件中的 10 个，碰到同一个文件的概率是多少（保留两位小数）？（输入概率。）
::: solution
$1 - \binom{90}{10}/\binom{100}{10} \approx 1 - 0.3305 = 0.6695 \approx 0.67$。近似式 $1 - 0.9^{10} \approx 0.651$ 与之接近。各 2 个文件的分支重叠概率约为 $0.040$，各 20 个文件的约为 $0.993$。
:::
:::

::: exercise 手工求合并基 {level=2}
在一张箭头从子指向父的历史里：`B → A`、`C → B`、`D → B`、`E → C`、`F → D`、`G → E`、`G → F`（一次合并）、`H → D`。求 `C` 与 `D`、`E` 与 `H`、`G` 与 `H` 的合并基。
::: solution
`C` 的祖先：{C, B, A}；`D` 的祖先：{D, B, A}；共同祖先 {B, A}，而 `A` 是 `B` 的祖先，所以合并基是 `B`。`E` 的祖先：{E, C, B, A}；`H` 的祖先：{H, D, B, A}；共同祖先 {B, A}；合并基 `B`。`G` 的祖先：{G, E, F, C, D, B, A}；`H` 的祖先：{H, D, B, A}；共同祖先 {D, B, A}；`B` 和 `A` 是 `D` 的祖先，所以合并基是 `D`——合并 `G` 已经包含 `D`，把 `H` 合并进 `G` 只需带进 `H` 中所做的那个改动。
:::
:::

::: exercise 一份拉取请求说明 {level=2}
你修复了一个缺陷：某些总额有时被打印成 `19.999999999999996`。写一条提交信息（摘要与正文），并列出你会请评审者检查的三件事。
::: solution
摘要："Round order totals to pence before display"。正文："总额是浮点数之和、未经取整直接打印，因此一些总额显示出二进制舍入误差（如 19.999999999999996）。现在总额在计算总额的唯一位置 `pricing.total` 中取整到两位小数，而不再在每个模板里各自取整。更长期的方案是把价格存成整数便士，已记录在 issue 214。"评审者可能检查：(1) 用 `round()` 取整（对二进制值是银行家舍入，见 [[programming-1/values-types]]）对业务是否可接受，还是必须用 `decimal.Decimal`；(2) 有一个回归测试能重现原始显示缺陷；(3) 没有其他代码路径自行计算总额、仍然带着这个问题。
:::
:::

::: exercise 合并多个分支 {level=3}
设 $\mathrm{M}(b, o, t)$ 是 [[#def-merge3]] 对单个区域的三方合并结果，并把它扩展到某个输入本身已是冲突（记作 $\top$）的情形，此时结果也取 $\top$。固定基 $b$，把 $o \sqcup t$ 记为 $\mathrm{M}(b, o, t)$。证明 $\sqcup$ 满足交换律且**满足结合律**：$(o \sqcup t) \sqcup u = o \sqcup (t \sqcup u)$。由此推出：由同一基产生的若干分支可以按任意顺序逐区域合并且结果相同。（提示：对每个值 $x$ 按 $b \sqsubseteq x \sqsubseteq \top$ 给可能的值排序，除 $b$ 与 $\top$ 外的不同值互不可比，然后证明 $o \sqcup t$ 就是它们的最小上界。）
::: solution
*序。* 关系 $\sqsubseteq$ 自反、反对称、传递：它仅有的严格关系是 $b \sqsubset x$、$x \sqsubset \top$ 和 $b \sqsubset \top$。这就是值上的**平坦格**：$b$ 在最底，$\top$ 在最顶，其余全部在中间一层互不可比。

*合并即最小上界。* 逐情形检查。若任一输入是 $\top$，唯一上界是 $\top$，合并给出 $\top$。若 $o = t$，最小上界是 $o$，第一行给出 $o$。若 $o = b \ne t$，则 $b \sqsubseteq t$，最小上界是 $t$，第二行恰好给出它；$t = b \ne o$ 时对称。其余情形下 $o$ 与 $t$ 是除 $b$、$\top$ 外的不同值，因而互不可比，唯一的共同上界是 $\top$——冲突行。

*推论。* 在任何偏序中，最小上界只要存在就唯一，并满足 $x \sqcup y = y \sqcup x$（定义是对称的）与 $(x \sqcup y) \sqcup z = x \sqcup (y \sqcup z)$，因为两边都是集合 $\{x, y, z\}$ 的最小上界：一个元素在 $x \sqcup y$ 与 $z$ 之上，当且仅当它在 $x$、$y$、$z$ 之上。于是把同一基的 $k$ 条分支合并起来，每个区域的结果就是全部 $k$ 个版本的最小上界——所有改动的分支一致时取那个共同改动值，没人改时取基值，两边改动不同时冲突——与顺序无关。Git 对多个分支的「八爪鱼」（octopus）合并正依赖于此。实践中顺序对*工作量*仍然重要：真实合并用差异算法对齐区域，而且每次合并之后，下一次合并的合并基也在移动，所以一个人看到的区域和冲突可能不同。
:::
:::

::: exercise 计算合并基 {level=3}
写一个函数 `merge_bases(parents, x, y)`，在给出「提交 → 其父列表」的字典时，返回两个提交的全部最佳共同祖先（[[#def-merge-base]]）。在一个简单分岔和图中的交叉历史上测试它。
::: solution
```python
def ancestors(parents, c):
    """沿父链接从 c 可达的全部提交，包含 c 自身。"""
    seen, stack = {c}, [c]
    while stack:
        for p in parents[stack.pop()]:
            if p not in seen:
                seen.add(p)
                stack.append(p)
    return seen

def merge_bases(parents, x, y):
    """最佳共同祖先：不是任何其他共同祖先的真祖先的共同祖先。"""
    common = ancestors(parents, x) & ancestors(parents, y)
    return sorted(c for c in common
                  if not any(c != d and c in ancestors(parents, d) for d in common))

# 一个简单分岔；一个交叉：两条分支互相合并过。
parents = {"A": [], "B": ["A"], "C": ["A"], "D": ["B", "C"], "E": ["C", "B"],
           "F": ["D"], "G": ["E"]}
print(merge_bases(parents, "B", "C"))
print(merge_bases(parents, "F", "G"))
```

```console
$ python3 mergebase.py
['A']
['B', 'C']
```

`ancestors` 是深度优先搜索（[[algorithms/graph-search]]），在 $n$ 个提交、$m$ 条父链接的历史上耗时 $O(n + m)$。过滤器对每个共同祖先调用它一次，于是 `merge_bases` 对 $k$ 个共同祖先耗时 $O(k(n + m))$——做练习没问题，对百万提交的历史太慢；Git 的替代做法是按提交日期同时走两条历史，候选一确定就停。交叉情形返回两个基，正如图中所示。
:::
:::
