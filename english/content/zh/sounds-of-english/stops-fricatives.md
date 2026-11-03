刘洋给朋友念购物清单：*a bag of rice*（一袋米）。朋友写下了 *a back of rice*，笑了起来。刘洋确信自己在 *bag* 的末尾发了 /ɡ/。但在英语单词的末尾，/ɡ/ 和 /k/ 主要不是靠清浊来区分的。说英语的人真正在听的，是**它们前面的元音**：在 /ɡ/ 前长，在 /k/ 前短。刘洋发了一个短元音，所以他的 *bag* 听起来像 *back*（背）。

本章讲的是阻塞气流或让气流从窄缝中挤出而发出的辅音：六个爆破音 /p b t d k ɡ/，九个摩擦音 /f v θ ð s z ʃ ʒ h/，以及两个破擦音 /tʃ dʒ/。它们占了英语24个辅音中的17个。大多数成清浊对出现（[[sounds-of-english/how-speech-is-made#rule-pairs]]），本章的主要内容是英语究竟怎样把这些音对区分开：在词首靠一股气流，在词尾靠元音的长短，在两者之间靠清浊。

## 爆破音

::: definition 爆破音 {#def-plosive}
**爆破音**（plosive，又称**塞音**，stop）分三个阶段发出：发音器官完全**闭合**，气流无法从口腔出去（软腭抬起，所以也无法从鼻腔出去）；气压在闭合处后面积聚片刻（**持阻**）；然后闭合突然打开（**除阻**）。英语有六个爆破音：双唇的 /p b/，齿龈的 /t d/，软腭的 /k ɡ/。
:::

| | 清音 | 浊音 | 闭合部位 |
|---|---|---|---|
| 双唇音 | /p/ *pen*（钢笔） | /b/ *bed*（床） | 双唇 |
| 齿龈音 | /t/ *ten*（十） | /d/ *day*（天） | 舌尖抵住齿龈 |
| 软腭音 | /k/ *key*（钥匙） | /ɡ/ *go*（去） | 舌后部抵住软腭 |

英语的齿龈爆破音是在**齿龈**上发的，比普通话的 *d*、*t* 稍稍靠后——许多人发普通话的 *d*、*t* 时舌尖抵着上齿背。试一试：感受发拼音 *dà*（大）时舌头接触的位置，然后把它往后移几毫米，移到那道隆起上，发英语的 *day*。

### 在词首：送气

在嘴前放一张纸（或你的手），先说 *pin*（别针），再说 *bin*（垃圾箱）。说 *pin* 时纸会动：/p/ 之后、元音之前冒出一小股气流。说 *bin* 时纸几乎不动。

::: theorem 送气 {#rule-aspiration}
清爆破音 /p/、/t/、/k/ 位于重读音节开头时是**送气**的——在元音开始之前带一小股气流：*pin* [pʰɪn]，*ten* [tʰen]，*key* [kʰiː]，*repeat*（重复）[rɪˈpʰiːt]。在同一音节里位于 /s/ 之后时**不**送气：*spin*（旋转）[spɪn]，*stop*（停止），*sky*（天空）。在其他位置（非重读音节、词尾），气流很弱或没有。

浊爆破音 /b/、/d/、/ɡ/ 从不送气。在词首、停顿之后，许多人发这几个音时声带振动很少或根本不振动，所以 *pin* 和 *bin* 的主要区别就是那股气流。
:::

::: proof
这股气流是一种延迟：/p/ 除阻之后，声带要稍等一下才开始为元音振动，等待期间出来的只有气流。这段延迟叫作**嗓音起始时间**（voice onset time，VOT）。利斯克和艾布拉姆森（Lisker & Abramson 1964）在一项著名的跨语言研究中测得，英语单词中 /p/ 的平均 VOT 约为60毫秒，/t/ 约70毫秒，/k/ 约80毫秒；而 /b/、/d/、/ɡ/ 只有约0–20毫秒——他们的大多数英语发音人在除阻前并不让这几个音带声。在 /s/ 之后，这段延迟消失了，因为发 /s/ 时声带已经分开，到元音时正好合拢。这就是为什么在说普通话的人听来，*spin* 可能像 *sbin*：*spin* 里的 /p/ 不送气，就像拼音的 *b*。
:::

下图显示这段延迟。每条线代表一个词。从爆破音除阻到嗓音开始，线处于低位；声带为元音振动时，线处于高位。

::: widget plot
f: if(x < 10, 2, 2.6); if(x < 60, 1, 1.6); if(x < v, 0, 0.6)
x: -10, 100
y: -0.2, 3
sliders: v=30:0:100:1
labels: bin or spin (voicing about 10 ms after release); pin (about 60 ms); your word (v ms)
caption: 嗓音起始时间（VOT）示意图：从爆破音除阻（横轴上的0，单位为毫秒）到嗓音开始（每条线向上跳的地方）的时间。上面两条线采用利斯克和艾布拉姆森（1964）的典型数值；实际数值因人、因音、因语速而异。移动滑块 v 来改变最下面那个词：延迟短，说英语的人听到的是 *b*；延迟长，听到的是 *p*。普通话的 *b* 和 *p* 也是这样区分的——所以拼音的 *b* 更接近英语 *spin* 里的 *p*，而不是完全带声的 /b/。
:::

::: example 有没有气流？ {#ex-aspiration}
下面这些词里，哪个 /p/、/t/ 或 /k/ 是送气的？*pen*（钢笔），*spend*（花费），*top*（顶部），*stop*（停止），*cake*（蛋糕），*escape*（逃脱），*happy*（快乐的）。
::: solution
按[[#rule-aspiration]]逐个位置判断：

1. *pen*：/p/ 位于重读音节开头——送气 [pʰ]。
2. *spend*：/p/ 在 /s/ 之后——不送气。
3. *top*：第一个 /t/ 位于重读音节开头——送气；词尾的 /p/——气流很弱或没有。
4. *stop*：/t/ 在 /s/ 之后——不送气；词尾的 /p/——弱。
5. *cake*：第一个 /k/——送气；词尾的 /k/——弱。
6. *escape* /ɪˈskeɪp/：/k/ 在 /s/ 之后——不送气，尽管音节 *-scape* 是重读的。
7. *happy* /ˈhæpi/：/p/ 位于**非重读**音节开头——只有轻微的送气。

用纸片测试可以验证：说 *pen*、*top* 和 *cake* 时纸动得最厉害。
:::
:::

::: quiz
哪个词里的 /t/ **不**送气？
- [ ] *tea*
- [ ] *attack*
- [x] *steam*
- [ ] *time*
::: solution
在 *steam*（蒸汽）里，/t/ 在同一音节里位于 /s/ 之后，所以不送气。在 *tea*（茶）、*time*（时间）和 *attack*（攻击）（/əˈtæk/，重音在 *-tack*）里，/t/ 位于重读音节开头，是送气的。
:::
:::

### 在词尾：元音说了算

::: theorem 词尾的清辅音和浊辅音 {#rule-final}
在词尾，清辅音（/p t k f θ s ʃ tʃ/）和它的浊音搭档（/b d ɡ v ð z ʒ dʒ/）之间的区别，主要由**它前面的元音**来承担：在浊辅音前，元音（以及中间的 /l/、/m/、/n/ 或 /ŋ/）明显更长。比较 *back*（背）– *bag*（包），*cap*（帽子）– *cab*（出租车），*right*（对的）– *ride*（骑），*rice*（米）– *rise*（升起），*safe*（安全的）– *save*（拯救），*bus*（公共汽车）– *buzz*（嗡嗡声），*H*（字母 H）/eɪtʃ/ – *age*（年龄）/eɪdʒ/。浊辅音本身常常只是部分带声，而清辅音常常闭合得短而有力。
:::

::: proof
这就是使长元音缩短的那种清辅音前缩短（[[sounds-of-english/long-vowels-diphthongs#rule-clipping]]）；它也影响短元音（*bag* 的元音比 *back* 的长，尽管两者都是 TRAP）。词尾的浊辅音失去大部分带声，是因为话语将要结束时声带停止了振动。此外，在 GB 和 GA 的日常对话中，词尾的 /p/、/t/、/k/ 常常没有可以听见的除阻，或者同时伴有声带闭合（“喉部”闭合）。因此听话人依赖元音，而一个让所有元音都一样长的学习者，会让所有词尾音对听起来都一样。
:::

::: warning 不要丢掉或“装饰”词尾辅音
✗ /bæ/ 表示 *back* 或 *bag*——辅音丢掉了。
✗ /ˈbæɡə/ 表示 *bag*——辅音后面加了一个元音。
✓ *bag* /bæɡ/：一个**长**元音，然后轻轻闭合；*back* /bæk/：一个**短**元音，然后有力地闭合。

这两种错误都来自音节不以爆破音结尾的语言，包括普通话。加一个元音可能改变这个词，或者多出一个音节（*bag* → *bagger*）；丢掉辅音则会使 *back*、*bag*、*bat*（球拍）和 *bad*（坏的）听起来全都一样。
:::

::: example 听出词尾的区别 {#ex-final}
刘洋想说 *a bag of rice*（一袋米）、*a cab to the airport*（一辆去机场的出租车）和 *I need to rise early*（我需要早起）。他该怎样处理每个元音？
::: solution
1. *bag*：/ɡ/ 是浊音，所以把 TRAP 元音发长：[bæːɡ]。短元音会变成 *back*。
2. *cab*：/b/ 是浊音，所以把 TRAP 元音发长；短元音会变成 *cap*（帽子）。
3. *rise*：/z/ 是浊音，所以把 PRICE 双元音发长，让 /z/ 振动；短的双元音加上嘶嘶的 /s/ 会变成 *rice*（米）。

在这三个词里，长元音承担了大部分工作；让词尾辅音轻轻带声会有帮助，但单靠它是不够的。
:::
:::

### /t/ 的两种常见变体

- **闪音（GA）。** 在元音之间、重读音节之后，GA 通常把 /t/ 变成舌尖在齿龈上非常快速的一弹，听起来像一个短促的 /d/：*water*（水）、*city*（城市）、*getting*（得到）、*a lot of*（许多）。LPD 写作 t̬；语音学家写作 [ɾ]。结果，在 GA 里 *writer*（作家）和 *rider*（骑手）听起来可能一样（它们常常靠元音长短来区分，正如[[#rule-final]]所预料的）。GB 在仔细的说话中不用闪音。
- **喉塞音。** 在另一个辅音前，GB 和 GA 都常常用声带的闭合 [ʔ] 来代替或加强 /t/：*football*（足球）[ˈfʊʔbɔːl]，*not now*（现在不行），*Gatwick*（盖特威克，地名）。许多英国人在元音之间也用 [ʔ]（*water* [ˈwɔːʔə]）；这在日常说话中很常见，但不属于 GB 模式。

你不必发出这些变体，但需要**听得出**它们。[[connected-speech/elision-assimilation]]会进一步讨论。

## 摩擦音

::: definition 摩擦音 {#def-fricative}
**摩擦音**（fricative）是让两个发音器官靠得很近，使气流被迫从一道窄缝中挤出、形成湍流并发出嘶嘶噪音的辅音。摩擦音可以一直延续，直到气用完为止：*ffff*、*ssss*、*shhhh*。英语有九个摩擦音：/f v/（唇齿音）、/θ ð/（齿间音）、/s z/（齿龈音）、/ʃ ʒ/（齿龈后音）和 /h/（声门音）。
:::

### /f/ 和 /v/

上齿放在下唇内侧；气流从缝隙中通过。/f/ 是清音，/v/ 是浊音。**音对：** *fan*（风扇）– *van*（厢式货车），*fine*（好的）– *vine*（葡萄藤），*ferry*（渡船）– *very*（非常），*safe*（安全的）– *save*（拯救），*leaf*（叶子）– *leave*（离开），*half*（一半）– *have*（有）。

/v/ 不是 /w/：发 /w/ 时双唇收圆，不碰牙齿（见[[sounds-of-english/nasals-approximants]]）。**音对：** *vest*（背心）– *west*（西方），*vine*（葡萄藤）– *wine*（葡萄酒），*verse*（诗句）– *worse*（更糟的），*veil*（面纱）– *whale*（鲸）。

- *I've got a very old van.*（我有一辆很旧的厢式货车。）
- *We went west, wearing warm vests.*（我们穿着暖和的背心往西走。）

### /θ/ 和 /ð/：*th* 音

**怎样发音：**把舌尖轻轻抵住上门齿的背面，或者放在上下齿之间。不要咬。轻轻吹气，让气流从舌头和牙齿之间通过。/θ/ 是清音（*think*（想）），/ð/ 是浊音（*this*（这个））。

/θ/：*think*（想），*thank*（感谢），*three*（三），*Thursday*（星期四），*both*（两者都），*month*（月），*health*（健康），*mouth*（嘴，名词），*bath*（洗澡）。
/ð/：*the*，*this*（这个），*that*（那个），*they*（他们），*there*（那里），*mother*（母亲），*weather*（天气），*with*（和；也常读 /θ/），*breathe*（呼吸，动词），*smooth*（光滑的）。

两者只在少数几对词里靠它们来区分：*thigh*（大腿）– *thy*（〔古〕你的），*mouth*（嘴，名词）– *mouth*（用口形示意，动词，/maʊð/），*bath*（洗澡，名词）– *bathe*（沐浴，动词，/beɪð/），*breath*（呼吸，名词）– *breathe*（呼吸，动词）。

**替代与混淆：**没有这两个音的学习者通常用 /s/、/f/ 或 /t/ 代替 /θ/，用 /z/、/d/ 或 /l/ 代替 /ð/。每一种替代都会使真实存在的最小对立体合并：*think*（想）– *sink*（下沉）– *fink*（告密者），*thank*（感谢）– *sank*（沉没，过去式）– *tank*（坦克；水箱），*three*（三）– *free*（自由的）– *tree*（树），*then*（然后）– *den*（兽穴）– *Zen*（禅），*they*（他们）– *day*（天）。

::: warning *Th* 不是 *s*
✗ *I sink so.*（意思是：我想是的。）
✗ *Sank you very much.*（意思是：非常感谢。）
✓ *I think so.*（我想是的。）*Thank you very much.*（非常感谢。）

发 /s/ 时，舌尖在齿龈后面，上下齿靠拢；发 /θ/ 时，舌尖接触牙齿。对着镜子，发 *th* 时你应该能看到舌尖。并不是每个说英语的人都用 /θ/ 和 /ð/——伦敦、爱尔兰、加勒比等地的一些口音用 /f/、/t/、/v/ 或 /d/——但在两种模式（GB 和 GA）里，它们都是独立的音位，听话人依赖它们。
:::

### /s/、/z/、/ʃ/ 和 /ʒ/

/s/ 和 /z/：舌尖（或舌叶）靠近齿龈，舌的两侧贴着侧面的牙齿，中间留一道很窄的槽；上下齿靠拢；双唇展开。/ʃ/ 和 /ʒ/：基本相同，但位置更靠后，缝隙更宽，而且双唇**收圆并向前突出**。

**/s/–/ʃ/ 音对：** *see*（看见）– *she*（她），*sip*（小口喝）– *ship*（船），*sort*（种类）– *short*（短的），*seat*（座位）– *sheet*（床单），*save*（拯救）– *shave*（刮胡子），*mess*（混乱）– *mesh*（网眼）。
**/s/–/z/ 音对：** *sip*（小口喝）– *zip*（拉链），*Sue*（休，人名）– *zoo*（动物园），*rice*（米）– *rise*（升起），*bus*（公共汽车）– *buzz*（嗡嗡声），*place*（地方）– *plays*（玩，第三人称单数）。

/ʒ/ 是英语中最少见的辅音。它出现在 *measure*（测量）、*pleasure*（快乐）、*usual*（通常的）、*vision*（视力）、*television*（电视）、*decision*（决定）、*Asia*（亚洲）（GB /ˈeɪʃə/ 或 /ˈeɪʒə/）这类词的中间，以及一些法语借词的末尾：*beige*（米色）、*garage*（车库）（GB /ˈɡærɑːʒ/ 或 /ˈɡærɪdʒ/，GA /ɡəˈrɑːʒ/）。

::: example /s/ 还是 /ʃ/？ {#ex-s-sh}
找出句子 *Sam's sister sells fresh fish in the shop.*（萨姆的姐姐在店里卖鲜鱼。）中所有的 /s/ 和 /ʃ/，并说出发每个音时舌头和嘴唇的动作。
::: solution
先写出音标（GB）：/sæmz ˈsɪstə selz freʃ fɪʃ ɪn ðə ʃɒp/。

- /s/：*Sam's*（第一个音）、*sister*（两个 /s/）、*sells*（第一个音）。舌尖靠近齿龈，上下齿靠拢，双唇展开。
- /ʃ/：*fresh*、*fish*、*shop*。舌头更靠后，缝隙更宽，双唇收圆并向前突出。
- 不是 /s/ 的：*Sam's* 和 *sells* 末尾的 *s* 读 /z/，因为它跟在一个浊音后面（见[[sounds-of-english/spelling-and-sound]]）。

对着镜子慢慢说这个句子：说 *fresh*、*fish* 和 *shop* 时嘴唇应该向前突，说 *Sam's*、*sister* 和 *sells* 时又展开。如果每个 *s* 音都圆唇，就会说成 *shister* 和 *shells*。
:::
:::

### /h/

/h/ 是一股穿过张开的声带的气流，口腔已经摆好了后面那个元音的位置：*hat*（帽子）只是在 /æt/ 前面加一个带气的开头。口腔里几乎没有摩擦。/h/ 只出现在元音前（*hat*，*behind*（在……后面）），从不出现在音节末尾。在有些词里，字母 *h* 不发音：*hour*（小时）、*honest*（诚实的）、*honour*（荣誉）、*heir*（继承人）；在不重读的 *he*、*him*、*her*、*his* 里，连贯说话时 *h* 也常常被省略（*tell him*（告诉他）/ˈtel ɪm/）。

### 词尾的摩擦音

[[#rule-final]]在这里同样适用。*Rice* 和 *rise*、*bus* 和 *buzz*、*safe* 和 *save*、*half* 和 *have* 的区别，更多在于摩擦音前面元音的长短，而不在于摩擦音本身的清浊。

::: example *th* 音 {#ex-th}
说 *Thursday the thirteenth of March*（三月十三日星期四）。哪些音是 /θ/，哪些是 /ð/？一个用 /s/ 代替 *th* 的学习者会在哪里被误解？
::: solution
- *Thursday* /ˈθɜːzdeɪ/（GB），/ˈθɜːrzdeɪ/（GA）：开头是 /θ/。
- *the*：/ð/（弱读式 /ðə/）。
- *thirteenth* /ˌθɜːˈtiːnθ/（GB），/ˌθɜːrˈtiːnθ/（GA）：开头**和**结尾都是 /θ/。
- *of March*：没有 *th*。

用 /s/ 的学习者会说出类似 /ˈsɜːzdeɪ zə ˌsɜːˈtiːns/ 的话。听话人也许仍能从语境中听懂（没有哪一天叫 *Sursday*），但 *thirteenth* 的结尾听起来像 *teens*，而对数字来说语境帮不上忙：*thirteenth*（第十三）和 *thirtieth*（第三十），或者 *three*（三）和 *free*（免费的），都很容易混淆。日期、数字和名字正是清楚的 /θ/ 最重要的地方。
:::
:::

## 破擦音

::: definition 破擦音 {#def-affricate}
**破擦音**（affricate，又称塞擦音）是除阻缓慢的爆破音：闭合打开时，在同一部位变成一个摩擦音——一个塞音和一个擦音合成一个音。英语有两个：清音 /tʃ/（*cheap*（便宜的）、*church*（教堂）、*watch*（看；手表））和浊音 /dʒ/（*jeep*（吉普车）、*judge*（法官）、*age*（年龄））。两者都是齿龈后音，像 /ʃ/ 和 /ʒ/ 一样要圆唇。
:::

**/tʃ/–/dʒ/ 音对：** *cheap*（便宜的）– *jeep*（吉普车），*chin*（下巴）– *gin*（杜松子酒），*choke*（噎住）– *joke*（笑话），*rich*（富有的）– *ridge*（山脊），*H*（字母 H）– *age*（年龄）。**/tʃ/–/ʃ/ 音对：** *chip*（薯条）– *ship*（船），*cheap*（便宜的）– *sheep*（羊），*watch*（看）– *wash*（洗），*chair*（椅子）– *share*（分享）。

**拼写：**/tʃ/——*ch*（*chair*），*tch*（*watch*），*-ure* 和 *-ion* 前的 *t*（*picture*（图画），*question*（问题））。/dʒ/——*j*（*job*（工作）），*e*、*i*、*y* 前的 *g*（*age*，*giant*（巨人），*gym*（体育馆）——也有例外：*get*（得到）、*give*（给）、*girl*（女孩）），*dge*（*bridge*（桥）），许多词里 *-ule*、*-ual* 前的 *d*（GA 的 *schedule*（日程），*individual*（个人的））。

连缀 /tr/ 和 /dr/（*tree*（树），*dream*（梦））听起来很像破擦音，因为 /t/ 和 /d/ 在 /r/ 前发音部位更靠后，并且直接释放到 /r/ 里。许多中国教材把它们列为独立的音；它们是由两个音位组成的连缀，但你可以把它们当作一个动作来练习。

::: quiz
哪个词以破擦音**开头**？
- [ ] *ship*
- [x] *juice*
- [ ] *year*
- [ ] *zoo*
::: solution
*Juice*（果汁）以 /dʒ/ 开头，这是一个释放成摩擦音的塞音。*Ship*（船）以摩擦音 /ʃ/ 开头，*year*（年）以近音 /j/ 开头，*zoo*（动物园）以摩擦音 /z/ 开头。
:::
:::

## 一次电话

大声读这段对话。其中有许多 *th* 音、词尾辅音和 /s/–/ʃ/ 音对。

**Receptionist:** *Good morning, Thornton Dental. How can I help?*（早上好，桑顿牙科诊所。有什么可以帮您？）

**Liu Yang:** *Hello. I'd like to change my appointment, please. It's on Thursday the third.*（你好。我想改一下预约。原来是三号星期四。）

**Receptionist:** *Could I have your name?*（请问您的名字？）

**Liu Yang:** *Liu Yang. That's L-I-U, and then Yang, Y-A-N-G.*（刘洋。L-I-U，然后是 Yang，Y-A-N-G。）

**Receptionist:** *Thank you. I can see it — Thursday at three. When would you like to come instead?*（谢谢。我看到了——星期四三点。您想改到什么时候？）

**Liu Yang:** *Is there anything the following week? Maybe the tenth?*（下一周有空的时间吗？也许十号？）

**Receptionist:** *I have Tuesday the eighth at half past ten, or the ninth in the morning.*（八号星期二十点半有，或者九号上午。）

**Liu Yang:** *The eighth is fine. Thanks so much.*（八号可以。太感谢了。）

::: note 英汉对比
- **送气，而不是清浊。** 普通话靠送气区分 *b/p*、*d/t*、*g/k*，英语在词首也是如此。所以在重读音节开头，你可以用拼音的 *p、t、k* 来发英语的 /p t k/，用拼音的 *b、d、g* 来发英语的 /b d ɡ/。问题出在其他位置：在 /s/ 之后（*speak*（说）、*study*（学习）、*school*（学校），英语在这里用的是像拼音 *b、d、g* 那样的**不送气**音），以及在词尾，而普通话的词尾根本没有爆破音。
- **词尾辅音。** 标准普通话的音节只以元音、*-n*、*-ng*（或 *-r*）结尾。说普通话的人往往丢掉词尾的爆破音和摩擦音，或者在它们后面加一个元音。许多说粤语、客家话和闽南话的人母语里有词尾的 /p t k/，但这些音是不除阻的，所以他们可能需要练习清楚地除阻，并做出[[#rule-final]]所说的元音长短区别。
- **缺少的摩擦音。** 标准普通话没有独立的 /θ/、/ð/、/v/、/z/、/ʒ/。它的 *s* 接近英语的 /s/，它的 *sh* 是卷舌音（舌尖向后卷），它的 *x* 是舌叶向硬腭抬起发出的；英语的 /ʃ/ 介于两者之间，并且要圆唇。普通话的 *h* 是软腭音，在口腔后部有摩擦；英语的 /h/ 只是轻轻的一口气。
- **在 /iː/ 和 /ɪ/ 前面。** 普通话有 *xi* 而没有 *si*（“西”这样的音节写作 *xi*），所以有些学习者把 *see*（看见）、*seat*（座位）和 *sip*（小口喝）说得像 *she*（她）、*sheet*（床单）和 *ship*（船）。发 /s/ 时要让舌尖靠前，双唇展开。
- **拼音的 ch、j、q、zh。** 拼音的 *ch* 和 *zh* 是卷舌破擦音；*q* 和 *j* 是贴着硬腭发的。英语的 /tʃ/ 和 /dʒ/ 介于两者之间，并且要圆唇。拼音的 *j* 是清音，所以英语的 *jeep* 需要多一点带声，特别是在元音之间（*major*（主要的），*enjoy*（享受））。
:::

::: history
古英语用两个自己特有的字母来书写 *th* 音：**þ**（thorn）和 **ð**（eth），两者都可以表示 /θ/ 和 /ð/，没有明确的规则。诺曼征服之后，在法国抄写员的影响下，拼写 *th* 逐渐取代了它们，thorn 也从印刷中消失了；早期的印刷工使用的铅字来自欧洲大陆，没有 thorn，有时就用 *y* 来代替它。这就是 *Ye Olde Shoppe*（老店）这类仿古招牌里 *ye* 的来历：它一直读作 *the*。*the*、*this*、*they* 和 *there* 开头的浊音 /ð/ 来自后来的一个变化：一些非常常用的虚词的第一个辅音变成了浊音。
:::

## 后续内容

其余的辅音——鼻音、/l/、/r/、/w/ 和 /j/——在[[sounds-of-english/nasals-approximants]]中讲解。爆破音和摩擦音在[[sounds-of-english/syllables-clusters]]中组合成连缀（*str-*、*-sts*、*-ksθs*）。在快速说话中，/t/ 和 /d/ 常常被省略或改变（[[connected-speech/elision-assimilation]]）。中国学习者在这些音上的困难集中在[[sounds-of-english/sounds-for-chinese-speakers]]中讨论。

::: summary
- **爆破音**闭合、持阻、除阻：/p b t d k ɡ/（[[#def-plosive]]）。英语的 /t d/ 在齿龈上发音。
- /p t k/ 在重读音节开头**送气**，在 /s/ 之后不送气：*pin* [pʰɪn]，*spin* [spɪn]（[[#rule-aspiration]]）。在词首，*pin* 和 *bin* 的区别主要在于那股气流——拼音的 *p* 和 *b* 也是这样。
- 在词尾，清浊音对的区别主要在于**它们前面元音的长短**：*back – bag*，*rice – rise*（[[#rule-final]]）。不要丢掉词尾辅音，也不要在后面加元音。
- **摩擦音**让气流从窄缝中挤出：/f v θ ð s z ʃ ʒ h/（[[#def-fricative]]）。发 /θ ð/ 时舌头接触牙齿；发 /ʃ ʒ/ 时圆唇；/h/ 只是一口气。
- **破擦音**是释放成摩擦音的塞音：/tʃ dʒ/（[[#def-affricate]]）。
- GA 把元音之间的 /t/ 发成闪音（*water*）；GB 和 GA 在辅音前常用喉塞音代替 /t/（*football*）。
- 普通话没有 /θ ð v z ʒ/，也没有词尾爆破音；它的 *sh*、*x*、*h*、*ch*、*zh*、*j*、*q* 与最接近的英语音都不相同。
:::

## 习题

::: exercise 爆破音、摩擦音还是破擦音？ {level=1}
每个词的第一个音是爆破音、摩擦音还是破擦音？

*cat*（猫），*thin*（薄的），*chair*（椅子），*shoe*（鞋），*dog*（狗），*job*（工作），*vote*（投票），*girl*（女孩）
::: solution
爆破音：*cat* /k/，*dog* /d/，*girl* /ɡ/。摩擦音：*thin* /θ/，*shoe* /ʃ/，*vote* /v/。破擦音：*chair* /tʃ/，*job* /dʒ/。
:::
:::

::: exercise /θ/ 还是 /ð/？ {level=1}
每个词里的 *th* 是 /θ/ 还是 /ð/？

*think*（想），*they*（他们），*both*（两者都），*mother*（母亲），*three*（三），*those*（那些），*health*（健康），*weather*（天气）
::: solution
/θ/：*think*，*both*，*three*，*health*。/ð/：*they*，*mother*，*those*，*weather*。
:::
:::

::: exercise 找出对立词 {level=1}
按所示改变辅音，写出每个词的最小对立体搭档。

1. *sink*（/s/ → /θ/）  2. *wine*（/w/ → /v/）  3. *sip*（/s/ → /ʃ/）  4. *chin*（/tʃ/ → /dʒ/）  5. *cap*（/p/ → /b/）
::: solution
1. *think*（想）  2. *vine*（葡萄藤）  3. *ship*（船）  4. *gin*（杜松子酒）  5. *cab*（出租车）
:::
:::

::: exercise 送气还是不送气？ {level=2}
括号里给出的辅音是送气的（A）还是不送气的（U）？

1. *paper*（纸）（第一个 /p/）  2. *sport*（运动）（/p/）  3. *student*（学生）（第一个 /t/）  4. *return*（返回）（/t/）  5. *school*（学校）（/k/）  6. *become*（变成）（/k/）
::: solution
1. A——位于重读音节 *pa-* 开头。
2. U——在 /s/ 之后。
3. U——在 /s/ 之后。
4. A——位于重读音节 *-turn* 开头。
5. U——在 /s/ 之后。
6. A——位于重读音节 *-come* 开头。
:::
:::

::: exercise 长元音还是短元音？ {level=2}
每对词中，哪个词的元音更长？然后用每个词造一个句子。

1. *bet – bed*  2. *pick – pig*  3. *loose – lose*  4. *safe – save*
::: solution
更长的元音出现在浊辅音前：1. *bed*（床）；2. *pig*（猪）；3. *lose*（失去）；4. *save*（拯救；保存）。

例句：*I bet you're right.*（我敢说你是对的。）/ *I went to bed early.*（我很早就睡了。）*Pick a card.*（抽一张牌。）/ *The pig is asleep.*（猪睡着了。）*These shoes are loose.*（这双鞋太松了。）/ *Don't lose your ticket.*（别把票丢了。）*Is it safe to swim here?*（在这里游泳安全吗？）/ *Save your work often.*（要经常保存你的工作。）
:::
:::

::: exercise 数摩擦音 {level=2 check="7"}
句子 *She has three sisters.*（她有三个姐妹。）里有几个摩擦音？数音，不数字母，输入一个数。
::: hint
用音位符号写出每个词：/ʃiː hæz θriː ˈsɪstəz/（GB）。摩擦音是 /f v θ ð s z ʃ ʒ h/。
:::
::: solution
*She*：/ʃ/（1个）。*has*：/h/ 和 /z/——*s* 读 /z/（2个）。*three*：/θ/（1个）。*sisters* /ˈsɪstəz/：/s/、/s/ 和词尾的 /z/（3个）。总数是 1 + 2 + 1 + 3 = 7。*sisters* 里的 /t/ 是爆破音，不算。
:::
:::

::: exercise 改正标音 {level=3}
一位学习者把自己的发音记了下来，老师标出了被误解的词。用本章的规则解释每个问题，并说明他应该怎样改。

1. *bag* 说成 [bæk]  2. *three* 说成 [sriː]  3. *very* 说成 [ˈweri]  4. *speak* 说成 [spʰiːk]  5. *rise* 说成 [raɪs]
::: solution
1. 元音太短，闭合太有力，所以听话人听成了 *back*（背）。在 /ɡ/ 前把元音拉长，轻轻闭合（[[#rule-final]]）。
2. /θ/ 被 /s/ 代替了，变成一个接近 *free*（免费的）/*tree*（树）的非词。把舌尖抵住牙齿再吹气（[[#def-fricative]]）。
3. /v/ 被 /w/ 代替了，听起来像 *wary*（谨慎的）。把上齿放在下唇上并加上嗓音；不要圆唇。
4. /s/ 之后的 /p/ 送了气。这通常不会引起误解，但听起来不自然；在 /s/ 之后要用像拼音 *b* 那样的不送气音（[[#rule-aspiration]]）。
5. PRICE 元音太短，而且 /z/ 发得像嘶嘶的 /s/，所以听话人听成了 *rice*（米）。把双元音拉长，让 /z/ 振动。
:::
:::

::: exercise 自编绕口令 {level=3}
写一个短句（六到十个词），其中至少有三个含 /θ/ 或 /ð/ 的词，以及两个以浊爆破音（/b/、/d/ 或 /ɡ/）结尾的词。写出关键词的音标，把句子说五遍，一遍比一遍快，但不要丢掉 *th* 音和长元音。
::: solution
答案因人而异。一个范例：*Their three dogs dragged the thick bag.*（他们的三条狗拖走了那个厚厚的包。）——*Their* /ð/，*three* /θ/，*the* /ð/，*thick* /θ/；*dogs* 以 /ɡz/ 结尾，*dragged* 以 /ɡd/ 结尾（都是浊音），*bag* 以 /ɡ/ 结尾。关键词音标（GB）：/ðeə θriː dɒɡz dræɡd ðə θɪk bæɡ/。自我检查：舌头应该接触牙齿四次，*dogs*、*dragged* 和 *bag* 的元音应该明显偏长。
:::
:::
