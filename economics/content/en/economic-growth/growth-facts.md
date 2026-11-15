In 1960, real GDP per person in the Philippines was about 2,350 international dollars (2011 prices); in South Korea it was about 1,550 — two-thirds as high. By 2019 the ranking had reversed and then some: South Korea at 38,900, the Philippines at 8,600 (Maddison Project Database 2023). Over the same six decades Botswana rose from 560 to 15,700 while Ghana, richer than Botswana in 1960, went from 2,200 only to 4,100. Small differences in annual growth, sustained, rewrite the ranking of nations. That is the subject of this course.

The questions are old. Why did sustained growth in living standards begin at all, after millennia in which the typical person was not much richer than in the Roman Empire? Why did it begin when and where it did? Why do some countries now grow at six per cent a year and others at one? The next chapters build models. This chapter states the facts those models are asked to match, with the sources and the measurement choices attached.

Throughout, **real GDP per person** is the headline measure of average living standards. It is not welfare, it is not median income, and it omits home production, environmental damage and most of leisure. It is the object that can be compared across centuries and countries with existing national accounts, and the models of this course are models of it.

## Measuring living standards

National accounts record the value of final goods and services produced in a year. Dividing by population gives GDP per person. Comparing that number across dates requires a price index; comparing it across countries requires a conversion that is not the market exchange rate.

::: definition Real GDP per person {#def-gdp-pc}
**Real GDP per person** in year $t$ is nominal GDP divided by a price index and by population. A **purchasing-power-parity** (PPP) conversion expresses different countries' GDP in a common set of international prices, so that a unit of the international dollar buys a comparable basket everywhere. Market exchange rates, by contrast, convert at the price of currencies in the foreign-exchange market and typically understate real income in poor countries, where non-traded goods are cheap.
:::

Three datasets appear throughout the course.

- The **Maddison Project Database 2023** (Bolt and van Zanden 2024) gives GDP per person in 2011 international dollars, for many countries back to 1820 and for some much earlier. It is the source for long-run comparisons. Pre-1900 (and pre-1950 in much of Africa) estimates rest on partial records and indirect methods; they are the best available, not census-grade.
- The **Penn World Table 10.01** (Feenstra, Inklaar and Timmer; 183 countries, 1950–2019, 2017 USD at chained PPPs) is the workhorse for post-war levels, capital stocks, labour input and productivity. Output-side real GDP (`rgdpo`) is the right object for production; expenditure-side real GDP (`rgdpe`) is closer to living standards.
- **World Bank World Development Indicators** and national statistical offices (BEA, ONS, NBS and so on) give the frequently updated series used for the last few decades. They are not spliced onto Maddison's 2011 international dollars without further work.

A figure of "USD 10,000 per person" is not a well-posed claim until the base year, the PPP vintage and the output-versus-expenditure distinction are named. This course names them.

::: example Three ways to quote the United States in 2019 {#ex-three-measures}
The Maddison Project Database 2023 reports US GDP per person of 56,469 in 2011 international dollars in 2019. The Penn World Table 10.01 reports a different 2017-USD chained-PPP number for the same year. World Bank WDI reports GDP per person in constant 2021 international dollars, again different. Why do the three not coincide, and which should a growth chapter use?
::: solution
They answer slightly different questions. Maddison's 2011 international dollars are designed for *long-run* comparability: 1990 PPPs up to 1990, 2011 PPPs from 2011, with an adjustment in between, and historical benchmarks (including a 1909 US–UK comparison) spliced onto national-accounts growth. PWT 10.01 uses chained PPPs in 2017 USD and a multiple-benchmark method suited to 1950–2019, with a distinction between output-side and expenditure-side real GDP. World Bank WDI uses ICP PPP vintages (here 2021) and is revised as new price surveys arrive.

A comparison of the United States in 1870 with the United States in 2019 belongs to Maddison. A comparison of capital–output ratios across 80 countries in 2019 belongs to PWT. A 2023 update of extreme poverty belongs to the World Bank. Mixing the three in one sentence, without naming the units, is a common way to manufacture a puzzle that is only a change of numeraire.
:::
:::

GDP per person is an average. A country can grow in the national accounts while the median household does not, if inequality rises. Distribution is the subject of [[development-economics/poverty-and-inequality]]; it is not a reason to discard the average, which remains the right object for the production side of growth theory.

## Two centuries of modern growth

For most of recorded history, average living standards barely moved. Maddison's world GDP per person in 1820 is about 1,130 international dollars (2011 prices). England in 1700, at 2,412, was already rich by the standards of the age; over the next 120 years it grew at 0.26 per cent a year, to 3,306 in 1820. That is not stagnation, but it is a different regime from what followed.

::: definition Modern economic growth {#def-modern-growth}
**Modern economic growth**, in the sense of this course, is a persistent rise in real GDP per person of the order of one to two per cent a year, lasting many decades, accompanied by a rising capital stock per worker, a growing industrial and then service share, and falling mortality. It is distinct from a one-off harvest recovery, a resource boom, or the slow pre-industrial drift associated with limited technical change under a Malthusian constraint.
:::

The takeoff is the subject of [[economic-history/industrial-revolution]] and [[economic-history/great-divergence]]. The numbers that growth theory uses are these.

In the United States, real GDP per person in 2009 dollars rose from about 3,000 in 1870 to more than 50,000 in 2014, a 17-fold increase at an average of about 2.0 per cent a year (Jones, *Handbook of Macroeconomics*, 2016, using BEA national accounts). Peak-to-peak rates: 1.76 per cent in 1870–1929, 2.23 per cent in 1929–2007, 2.03 per cent over 1870–2007. In Maddison's 2011 international dollars the same country's path is 4,803 in 1870 to 56,469 in 2019, a 12-fold increase at 1.67 per cent a year — a different deflator and a different PPP, not a disagreement about whether the US grew.

The **frontier** — the richest large economies of the day — has grown at something close to two per cent a year for a century and a half. Britain led in the nineteenth century; the United States led for most of the twentieth. That stability of the frontier growth rate is itself a fact to be explained. It is not a law: 1950–1973 in Western Europe and Japan was faster (Japan 1950–1990: 3,062 to 29,949, or 5.9 per cent a year, Maddison 2023), and labour-productivity growth in the US and Western Europe slowed after 2005. The two-per-cent figure is a summary of the long US series, not a forecast.

Before modern growth, the Malthusian mechanism in [[economic-history/malthusian-world]] kept living standards in a narrow band: technical improvements raised population rather than income per person. The escape from that band is the first great fact. The second is that escape was not universal.

::: widget sequence
a: 3000*(1+g)^n
N: 150
mode: terms
sliders: g=0.02:0:0.08:0.005
start: 0
y: 0, 80000
caption: An illustrative 3,000 units of real GDP per person, compounding for 150 years at rate $g$. At $g=0.02$ the path matches the order of magnitude of the US national-accounts series (about 17-fold over 144 years). Raise $g$ to 0.07 — a growth-miracle rate — and the same starting point explodes; set $g=0$ and nothing happens. The arithmetic of compounding is the first mechanism in the course.
:::

## The world distribution of income

In 2019, in Maddison's 2011 international dollars, GDP per person was 85,100 in Norway, 56,500 in the United States, 38,900 in South Korea, 16,900 in China, 14,300 in Brazil, 7,300 in India, 5,200 in Nigeria, 2,000 in Ethiopia, and 624 in the Central African Republic. The US–CAR ratio is about 90; the Norway–Ethiopia ratio is about 42. Oil states (Qatar at 151,000) sit at the top of the same table for a different reason.

These are *averages*. They already use PPPs, so they are not an artefact of cheap haircuts in poor countries being converted at market exchange rates. They are still enormous. Hall and Jones (1999, *Quarterly Journal of Economics*) and the subsequent development-accounting literature ask how much of such gaps is capital, how much is human capital, and how much is residual productivity; that decomposition is [[economic-growth/technology-and-growth-accounting]].

The distribution has not been frozen. Pritchett (1997, "Divergence, Big Time", *Journal of Economic Perspectives*) documented that from 1870 to the late twentieth century the ratio of richest to poorest widened, because the frontier grew and many poor countries did not. Since about 1990 the *between-country* component of world income inequality has narrowed, largely because of growth in China and India, even as some African and fragile states have not closed the gap (Sala-i-Martin 2006; subsequent updates in the Maddison and World Bank data). Both statements can be true: the right tail pulled away from the left for a century, and then two very large countries moved toward the middle.

::: example A reversal in one generation {#ex-korea-philippines}
Using Maddison 2023, compute the average annual growth rates of real GDP per person in South Korea and the Philippines between 1960 and 2019. By what factor did the Korea/Philippines ratio change?
::: solution
South Korea: $1{,}548$ to $38{,}936$ in 59 years, so

$$
g_{\mathrm{KR}} = \Bigl(\frac{38936}{1548}\Bigr)^{1/59} - 1 = 0.0562
$$

(5.62 per cent a year; a 25-fold increase). The Philippines: $2{,}353$ to $8{,}602$, so

$$
g_{\mathrm{PH}} = \Bigl(\frac{8602}{2353}\Bigr)^{1/59} - 1 = 0.0222
$$

(2.22 per cent; a 3.7-fold increase). The ratio Korea/Philippines went from $1548/2353 = 0.66$ to $38936/8602 = 4.53$, a factor of about 6.9. Four percentage points of extra growth, held for six decades, is a different country.
:::
:::

Growth **miracles** in the post-war data are clustered: Japan 1950–1990; South Korea, Taiwan, Singapore, Hong Kong from the 1960s; China from 1978 (1,744 to 16,880 in 2019, 5.7 per cent a year); Botswana 1960–2019 (5.8 per cent). Growth **disasters** are also clustered: the lost decades in much of Latin America after 1980; the collapse of the Soviet system; relative stagnation in Argentina (8,861 in 1960 to 17,913 in 2019, 1.2 per cent — a rich country in 1900 that did not stay at the frontier); and episodes of conflict and state failure. Ghana's 1.1 per cent a year over 1960–2019 is not a collapse, but it is how a country that started well above Botswana ended well below.

::: intuition Growth is a rate, richness is a level
A country can grow fast and still be poor (China in the 1980s) or grow slowly and still be rich (the United States in any recent decade). The Solow model in the next chapter will separate **levels effects** (the saving rate shifts the balanced-growth path) from **growth effects** (only technology shifts the long-run growth rate of output per person). The data already suggest the distinction: South Korea's growth rate has slowed as it has approached the frontier, which is what a transition looks like, not what a permanent 5.6 per cent growth rate looks like.
:::

## Compounding and the rule of 70

If a variable $x_t$ grows at a constant rate $g$, then $x_T = x_0 (1+g)^T$ in discrete time, or $x(T) = x(0)\, e^{gT}$ in continuous time. The two are close when $g$ is a few per cent: $(1.02)^{35} = 2.000$ and $e^{0.02\times 35} = 2.014$.

::: proposition The rule of 70 {#prop-rule70}
A quantity growing at $g$ per cent a year doubles in approximately $70/g$ years. More precisely, the doubling time is $\ln 2 / \ln(1+g/100)$ years in discrete time and $(\ln 2)/(g/100)$ in continuous time. For $g$ between 1 and 10 the three formulae differ by months, not years.
:::

::: proof
Set $(1+g/100)^T = 2$, so $T = \ln 2 / \ln(1+g/100)$. For small $z$, $\ln(1+z)\approx z$, and $\ln 2 \approx 0.693$, hence $T \approx 69.3/(g)$ years. The conventional 70 is a rounding that also partly offsets the approximation $\ln(1+z)\approx z$. In continuous time, $e^{gT/100}=2$ gives $T = 69.3/g$ exactly.
:::

At 2 per cent, doubling takes 35 years; at 7 per cent, about 10 years. Over a century, 2 per cent produces a 7.2-fold increase; 7 per cent produces a 868-fold increase. That is why "a percentage point of growth" is not a small object in this course.

::: example Two islands {#ex-two-islands}
Island A has GDP per person of 5 (in some units) and grows at 2 per cent a year. Island B starts at 1 and grows at 7 per cent. Who is richer after 50 years, and by what factor? (These rates are illustrative; they match the order of magnitude of a frontier economy and a growth miracle.)
::: solution
After 50 years,

$$
x_A = 5\times(1.02)^{50} = 5\times 2.692 = 13.46, \qquad x_B = 1\times(1.07)^{50} = 29.46.
$$

Island B, which started five times poorer, is 2.2 times richer. The crossing occurs when $5\times(1.02)^t = (1.07)^t$, i.e. $t = \ln 5 / \ln(1.07/1.02) = 33.6$ years. Compounding is not a metaphor. It is the mechanism that turns a 5-point gap in growth rates into a reversal of the world distribution.
:::
:::

::: warning Confusing growth rates with levels, and percentages with percentage points
A fall in the growth rate from 8 per cent to 6 per cent is a drop of *two percentage points*, or a *one-quarter* decline in the growth rate. It is not a 2 per cent decline in GDP. GDP itself continues to rise. Journalistic accounts of "growth collapsing 25 per cent" sometimes mean the latter, sometimes the former. In this course a growth rate is $g_X = \dot X/X$ (continuous) or $X_{t+1}/X_t - 1$ (discrete); a level is $X$.
:::

A related arithmetic fact is used constantly. If $z = xy$, then $g_z = g_x + g_y$ (continuous time, or a log approximation). If $z = x/y$, then $g_z = g_x - g_y$. Output per person is output divided by population, so its growth rate is the growth of output minus the growth of population. Capital per worker is analogous. Logarithmic derivatives are developed in [[mathematical-economics/derivatives-and-elasticities]].

::: quiz
Real GDP grows at 3 per cent a year and population at 1 per cent. What happens to real GDP per person?
- [ ] It grows at 3 per cent.
- [x] It grows at approximately 2 per cent.
- [ ] It is constant, because extra output is absorbed by extra people.
- [ ] It grows at 4 per cent.
::: solution
$g_{Y/L} = g_Y - g_L \approx 0.03 - 0.01 = 0.02$. (The discrete-time identity is $(1+g_Y)/(1+g_L) - 1 = 0.0198$, which rounds to 2 per cent.) Extra people do absorb extra output, but not one-for-one when output itself is growing faster than population.
:::
:::

## Kaldor’s stylised facts

In 1961 Nicholas Kaldor listed a handful of regularities of industrial growth that a theory ought to respect. They are not theorems. They are summaries of the then-available time series for the United Kingdom, the United States and a few other industrial economies, and they have been re-checked many times.

::: definition Kaldor’s stylised facts {#def-kaldor}
Kaldor’s facts, slightly restated in modern language, are: (1) labour productivity (output per worker) grows at a roughly constant rate over long periods; (2) capital per worker grows at a roughly constant rate; (3) the real return on capital is trendless; (4) the capital–output ratio is trendless; (5) the shares of capital and labour in national income are roughly constant; (6) the growth rate of output per worker differs substantially across countries.
:::

Facts (1)–(5) together are what later chapters will call **balanced growth**: $Y$, $K$ and $C$ grow at the same rate, $K/Y$ is constant, and factor shares $F_K K / Y$ and $F_L L / Y$ are constant. Cobb–Douglas production $Y = K^\alpha (AL)^{1-\alpha}$ delivers constant shares automatically, which is why it is the default in this course — as a convenient case that matches (5), not as a claim that every industry is Cobb–Douglas.

Two qualifications belong next to (3) and (5). Piketty and Zucman (2014, *Quarterly Journal of Economics*) documented a rise in the private wealth–income ratio in several rich countries since the 1970s, and Karabarbounis and Neiman (2014, *Quarterly Journal of Economics*) documented a decline in the labour share in many countries over a similar window. Neither finding abolishes Kaldor’s facts as a first approximation to a century of data; both mean that "roughly constant" is not "exactly constant", and that a model whose only steady state has a fixed labour share will miss a feature of the last forty years. The course returns to this when it discusses capital-augmenting technical change and the elasticity of substitution.

Jones (2016) added a second list, sometimes called the **new Kaldor facts**: a stable frontier growth rate; a world distribution of income with enormous spread; a weak (and historically negative) correlation between population growth and income per person in the modern era; the concentration of growth miracles in a few decades and regions; the large role of urbanisation and structural change; and the rise of the college wage premium. Several of these are taken up in [[economic-growth/convergence]] and [[economic-growth/endogenous-growth]].

::: example Factor shares in a Cobb–Douglas economy {#ex-shares}
Suppose $Y = K^{0.3} L^{0.7}$, with $K = 1{,}000$ and $L = 200$ (illustrative units). Compute output, the marginal products, and the factor shares. What happens to the shares if both $K$ and $L$ double?
::: solution
$Y = 1000^{0.3}\times 200^{0.7} = 324.13$. The marginal products are $F_K = 0.3\, Y/K = 0.0972$ and $F_L = 0.7\, Y/L = 1.134$. Payments exhaust output: $F_K K + F_L L = Y$. The capital share is $0.3$ and the labour share is $0.7$, independent of $K$ and $L$. Doubling both inputs doubles $Y$ (constant returns) and leaves the shares at $0.3$ and $0.7$. That is Euler’s theorem plus a unit elasticity of substitution, and it is why Cobb–Douglas matches Kaldor’s fifth fact by construction.
:::
:::

::: quiz
Which of Kaldor’s facts is a statement about *cross-country differences* rather than about the path of a single industrial economy?
- [ ] The capital–output ratio is roughly constant.
- [ ] Factor shares are roughly constant.
- [x] The growth rate of output per worker differs substantially across countries.
- [ ] Capital per worker grows at a roughly constant rate.
::: solution
Facts (1)–(5) are time-series properties of industrial economies on a balanced path. Fact (6) is the cross-section: growth rates are not the same everywhere, which is what miracles, disasters and transitional dynamics are about.
:::
:::

## Evidence: hours, human capital and the residual

GDP per person can rise because people work more hours, because they have more capital, because they have more skills, or because the same hours, capital and skills produce more. The post-war rich-country facts cut against the first of these. Average annual hours per worker have *fallen* in Western Europe, the United States and Japan since the 1950s (PWT 10.01, variable `avh`): part of the rise in GDP per person is a rise in GDP per hour, not a rise in hours. Boppart and Krusell (2020) and the earlier literature on leisure document a long-run decline in market hours as income rises, which is a puzzle for models in which labour supply is inelastic and a motivation for the ones in which it is not.

Human capital — years of schooling, and returns to those years — has risen almost everywhere (Barro and Lee data; PWT's `hc` index). Mankiw, Romer and Weil (1992) treated it as an additional accumulated factor; the next chapters do too. It does not close the gaps on its own. Hall and Jones (1999) and Caselli (2005, *Handbook of Economic Growth*) find that a large share of the cross-country variance of output per worker remains after capital and schooling are accounted for. That residual is **total factor productivity**, measured as a wedge in the production function, not as a photograph of technology. Misallocation, measurement error, and true technical differences all sit inside it. Growth accounting in [[economic-growth/technology-and-growth-accounting]] makes the decomposition precise.

Population growth has slowed in the rich world and, more recently, in East Asia and much of Latin America (UN World Population Prospects, 2024 revision). In the Solow model a lower $n$ raises steady-state capital and output per person — a levels effect. In idea-based models a larger *scale* of the research sector can raise the growth rate, a tension taken up in [[economic-growth/endogenous-growth]]. The facts do not adjudicate on their own: the countries that grew fastest after 1960 were not always the largest, and Ireland, Singapore and Estonia are small.

Extreme poverty, measured by the World Bank at \$2.15 a day in 2017 PPP, fell from about 38 per cent of the world population in 1990 to under 9 per cent in 2019 (World Bank WDI, accessed 2026), with China accounting for a large part of the decline and sub-Saharan Africa accounting for a rising *share* of the people who remain poor. Growth in average GDP per person is neither necessary nor sufficient for poverty reduction in any given year — distribution and population growth sit in between — but the episodes of mass poverty reduction have been episodes of fast growth of GDP per person.

## Where this leads

The facts of this chapter are constraints on theory. A model in which the saving rate sets the long-run *growth* rate of output per person must explain why the US saving rate has wandered while US growth has not. A model in which poor countries automatically catch up must explain Argentina, and a model in which they never catch up must explain South Korea. A model without a residual must explain why capital and labour accumulation, priced at their competitive shares, leave most of US 1909–1949 growth unaccounted for (Solow 1957).

The next chapter, [[economic-growth/solow-model]], takes the simplest mechanism that respects diminishing returns and Kaldor’s balanced-growth facts: accumulation of physical capital with a fixed saving rate. It delivers a steady-state *level* of output per person, transitional growth, and no long-run growth of output per person without technical change. That last conclusion is why [[economic-growth/technology-and-growth-accounting]] exists. Convergence, optimal saving, overlapping generations, ideas, and institutions follow.

For education only — not investment or financial advice. Historical growth rates are not a forecast of any country’s future growth, and nothing in this chapter is a recommendation to hold any asset.

::: history
**1956–1961, Solow, Swan, Kaldor.** Robert Solow (1956, *QJE*) and Trevor Swan (1956, *Economic Record*) gave the profession a model in which capital accumulation with diminishing returns produces a steady state; Solow (1957, *REStat*) then showed that most of the rise in US output per hour over 1909–1949 was not capital accumulation. Nicholas Kaldor (1961) listed the stylised facts that model was asked to match. The facts have been refined — labour-share decline, a post-2005 slowdown, the rise of China — but the 1956–1961 agenda is still the agenda of the next three chapters.
:::

::: summary
- Real GDP per person, at PPP, is the headline measure; name the dataset (Maddison 2023 for the long run, PWT 10.01 for 1950–2019, WDI for recent updates) and the units.
- Frontier living standards have risen about 17-fold since 1870 at roughly 2 per cent a year in US national accounts (Jones 2016); Maddison’s 2011-dollar US series grows a little more slowly (1.67 per cent, 1870–2019) because of a different deflator.
- Cross-country gaps are vast: a factor of about 90 between the United States and the Central African Republic in 2019 (Maddison 2023). Miracles (Korea, Botswana, China after 1978) and relative stagnation (Ghana, Argentina) show that the ranking is not fixed.
- Compounding is the mechanism: the rule of 70, and the identity $g_{Y/L} = g_Y - g_L$.
- Kaldor’s facts describe balanced growth in industrial economies; they are empirical regularities, not theorems, and the labour share has declined in recent decades.
- Hours have fallen in rich countries; human capital has risen; a large residual remains in both time series and the cross-section.
:::

## Exercises

::: exercise Doubling times {level=1 check="35"}
A country’s real GDP per person grows at 2 per cent a year. Using the rule of 70, how many years does it take to double? (Enter the number of years.)
::: solution
$70/2 = 35$ years. The exact discrete-time figure is $\ln 2 / \ln(1.02) = 35.00$ years, so the rule is not an approximation here.
:::
:::

::: exercise From rates to levels {level=1}
Real GDP is 800 this year and grows at 3 per cent a year; population is 40 and grows at 1 per cent a year. What is GDP per person this year, and what is it after 10 years (discrete annual compounding)?
::: solution
This year: $800/40 = 20$. After 10 years, GDP is $800\times(1.03)^{10} = 1{,}075.13$ and population is $40\times(1.01)^{10} = 44.18$, so GDP per person is $24.33$. Equivalently, per-person growth is $(1.03)/(1.01)-1 = 0.0198$ and $20\times(1.0198)^{10} = 24.33$.
:::
:::

::: exercise Reading Maddison {level=1}
Maddison 2023 gives China 1,744 (2011 international dollars) in 1978 and 16,880 in 2019, and the United States 29,286 and 56,469 in the same two years. Compute each country’s average annual growth rate over 1978–2019. Did the US–China ratio rise or fall?
::: solution
China: $(16880/1744)^{1/41}-1 = 0.0569$ (5.69 per cent). United States: $(56469/29286)^{1/41}-1 = 0.0160$ (1.60 per cent). The ratio US/China fell from $29286/1744 = 16.8$ to $56469/16880 = 3.3$. Fast growth from a low base closes a ratio even when the rich country keeps growing.
:::
:::

::: exercise Rule of 70 against the exact formula {level=2}
At $g = 7$ per cent a year, compare the rule-of-70 doubling time with the exact discrete-time doubling time. Which is longer, and by how many months?
::: hint
Exact time $T = \ln 2 / \ln(1.07)$. Convert the difference into months by multiplying by 12.
:::
::: solution
Rule of 70: $70/7 = 10$ years. Exact: $\ln 2 / \ln(1.07) = 10.245$ years. The exact doubling time is longer by $0.245\times 12 \approx 2.9$ months. The rule of 70 is slightly optimistic at 7 per cent because $\ln(1.07) < 0.07$.
:::
:::

::: exercise Hours and productivity {level=2}
In an illustrative rich country, real GDP per person grows at 1.8 per cent a year, average hours per worker fall at 0.3 per cent a year, and the employment–population ratio is constant. At what rate does GDP per hour grow?
::: solution
GDP per person $= \bigl(\text{GDP per hour}\bigr)\times\bigl(\text{hours per worker}\bigr)\times\bigl(\text{employment/population}\bigr)$. With the last term constant,

$$
g_{Y/L} = g_{Y/H} + g_{H} \implies g_{Y/H} = 0.018 - (-0.003) = 0.021
$$

(2.1 per cent). Falling hours *raise* the growth of output per hour relative to output per person. Using GDP per person as a productivity measure in a period of declining hours understates productivity growth.
:::
:::

::: exercise Factor shares {level=2 check="0.25"}
Output is $Y = K^{1/4} L^{3/4}$. If capital is paid its marginal product, what is the capital share of income? (Enter a decimal, for example 0.3.)
::: solution
$F_K = (1/4) Y/K$, so $F_K K / Y = 1/4 = 0.25$. Cobb–Douglas exponent on $K$ *is* the capital share, under competitive factor payments.
:::
:::

::: exercise Miracles and arithmetic {level=3}
Botswana’s GDP per person (Maddison 2023) went from 564 in 1960 to 15,747 in 2019; Ghana’s from 2,197 to 4,143. (a) Compute each average annual growth rate. (b) At those constant rates, in what year (counting from 1960) would Botswana have overtaken Ghana? (c) Why is (b) a calculation rather than a historical claim?
::: hint
Set $564\times(1+g_B)^t = 2197\times(1+g_G)^t$ and solve for $t$.
:::
::: solution
(a) Botswana: $(15747/564)^{1/59}-1 = 0.0581$ (5.81 per cent). Ghana: $(4143/2197)^{1/59}-1 = 0.0108$ (1.08 per cent). (b) $564(1.0581)^t = 2197(1.0108)^t$ gives $(1.0581/1.0108)^t = 2197/564 = 3.896$, so $t = \ln 3.896 / \ln(1.0468) = 29.7$ years, around 1990. (c) Actual paths are not constant-rate paths: Botswana’s growth was diamond- and institution-dependent and not a smooth 5.81 per cent; Ghana had cycles. The crossing date of two exponential curves fitted to endpoints is an accounting device, not a narrative of 1990.
:::
:::

::: exercise Why two per cent is not small {level=3}
Consider two hypothetical countries, both starting at 5,000 units of real GDP per person. One grows at 2.0 per cent a year for 100 years, the other at 0.5 per cent. (a) Compute the two terminal levels and their ratio. (b) Jones (2016) summarises US frontier growth at about 2 per cent. Using the rule of 70, how many doublings is a century of 2 per cent growth? (c) In one paragraph, why does this arithmetic make "the residual" in growth accounting first-order rather than a curiosity?
::: solution
(a) Fast: $5000\times(1.02)^{100} = 5000\times 7.245 = 36{,}223$. Slow: $5000\times(1.005)^{100} = 5000\times 1.647 = 8{,}234$. Ratio: $4.40$. (b) Doubling time 35 years, so a century is $100/35 \approx 2.9$ doublings, a factor of about $2^{2.9} \approx 7.5$, in line with $7.24$. (c) Over a century, a 1.5-point difference in growth rates — the sort of difference Solow’s residual makes, relative to capital accumulation alone — produces a four-fold difference in living standards. If the residual is mostly technology, or mostly misallocation, or mostly human capital we failed to measure, that four-fold gap is the thing a growth theory has to assign. Treating TFP as a leftover after the "real" factors have been counted gets the magnitudes backwards.
:::
:::
