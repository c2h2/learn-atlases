A newspaper reports that “the economy grew by 2 per cent” and that “unemployment is 4 per cent”. Both numbers are inventions of statistical offices, in the best sense: they are defined, constructed from surveys and administrative records, and revised. **Gross domestic product** (GDP) is the headline measure of production; the **unemployment rate** is the headline measure of unused labour. Neither is well-being, and both can mislead if the definition is forgotten. This chapter states the definitions, distinguishes nominal from real, constructs a price index, and measures labour-force status. Policy, in the next chapter, needs these objects as its verbs.

The circular flow underneath GDP is the same accounting identity whether the economy is Nigeria or Japan: output, income and expenditure are three sides of one total.

## GDP as output, income and expenditure

::: definition Gross domestic product {#def-gdp}
**Gross domestic product** is the market value of final goods and services produced within a territory in a period. It can be added up as **production** (value added by resident producers), as **income** (wages, profits, rents, mixed income, plus taxes on production net of subsidies), or as **expenditure**

$$
Y = C + I + G + NX,
$$ {#eq-expenditure}

where $C$ is household consumption, $I$ is gross private investment (including inventories), $G$ is government consumption and investment, and $NX$ is exports minus imports. Intermediate goods are not counted separately: they are already inside the value of finals, or they cancel in value added.
:::

“Market value” means that a haircut sold for 20 counts as 20, and a haircut you give yourself counts as 0 in GDP (household production is largely outside the boundary). “Final” means a tyre sold to a household counts; a tyre sold to a car factory does not, until the car is sold. “Within a territory” is the difference between GDP and **GNI** (gross national income), which reallocates income by nationality of the owner. Ireland’s GDP is famously larger than its GNI because of multinational profit booked there; the CSO of Ireland publishes both.

::: example An expenditure total {#ex-exp}
In an invented closed-ish economy, consumption is 800, investment 200, government purchases 250, exports 90 and imports 40. Compute GDP. If a factory produces 30 of output, of which 10 is unsold and added to inventories, where does that 10 appear?
::: solution
$NX = 90 - 40 = 50$, so $Y = 800 + 200 + 250 + 50 = 1{,}300$. The unsold 10 is **inventory investment**, a component of $I$. Omitting it would make expenditure 10 short of production. Inventory investment can be negative when stocks are run down.
:::
:::

Value added avoids double counting. A mill sells flour for 40, having bought wheat for 25; a bakery sells bread for 70, having bought the flour. The mill’s value added is 15, the bakery’s is 30, GDP from this chain is 45, which equals the final bread (70) minus the imported-from-agriculture wheat (25) if wheat is intermediate from another domestic sector that will be counted there. The production account of the national accounts is this calculation for every industry.

::: proposition Three-way identity {#prop-identity}
In the national accounts, production (value added at market prices), income (the split of that value added), and expenditure on final demand are equal by construction, up to a statistical discrepancy. The equality is an identity, not an equilibrium condition.
:::

::: proof
Each firm’s value added is output minus intermediate consumption. Summing over firms, intermediates cancel (except imports of intermediates, which are subtracted in $NX$ or in the production boundary), leaving final output. Value added is also, by the firm’s accounts, wages plus gross profits plus net taxes on production. Summing gives the income side. The identity can fail in the published tables by a discrepancy because the three sides are estimated from different surveys; the discrepancy is a measure of statistical friction, not of unsold goods.
:::

GDP is not welfare. It omits home production, most environmental depletion, and leisure; it includes spending on prisons, disasters and commuting. The Stiglitz–Sen–Fitoussi commission (2009) and the subsequent “beyond GDP” literature recommend dashboards: median income, life expectancy, air quality, time use. GDP remains the production total that macro models close on.

In 2023, GDP at current US dollars was about 27.8 trillion in the United States, 18.3 trillion in China, 4.6 trillion in Germany, 3.5 trillion in India, 2.2 trillion in Brazil and 1.4 trillion in Indonesia (World Bank World Development Indicators, accessed 2026). Rankings change under purchasing-power parity, which raises the relative size of lower-price countries: China and India look larger, in particular, on PPP than at market exchange rates. Per-person figures change the ranking again.

## Nominal and real, and the deflator

::: definition Nominal GDP, real GDP and the deflator {#def-real}
**Nominal GDP** values current output at current prices. **Real GDP** values current output at the prices of a base year (or, in modern accounts, by a chain-weighted index). The **GDP deflator** is

$$
\text{deflator} = \frac{\text{nominal GDP}}{\text{real GDP}}\times 100.
$$

Inflation in the deflator is the percentage change of that index. Real GDP growth is the percentage change of real GDP.
:::

::: example A two-good economy {#ex-two-good}
In 2022 the economy produces 10 apples at 2 each and 5 oranges at 4 each. In 2023 it produces 12 apples at 3 each and 4 oranges at 5 each. Compute 2022 and 2023 nominal GDP, 2023 real GDP in 2022 prices, real growth, the 2023 deflator (2022 $= 100$), and deflator inflation.
::: solution
Nominal 2022: $10\times 2 + 5\times 4 = 40$. Nominal 2023: $12\times 3 + 4\times 5 = 56$. Real 2023 in 2022 prices: $12\times 2 + 4\times 4 = 40$. Real growth: $40/40 - 1 = 0$. Deflator in 2023: $56/40 \times 100 = 140$. Inflation: 40 per cent. Nominal GDP rose 40 per cent with no rise in real output: the entire nominal rise is prices, and a mix shift (more apples, fewer oranges) that happened, in this example, to leave the real total unchanged.
:::
:::

Chain-weighting, used by the US BEA and many other offices, updates the base every year and compounds the growth rates, to avoid the substitution bias of a fixed distant base. The arithmetic is in [[macroeconomics]]; the idea is that real GDP is a volume index, not a single-year-price total for ever.

The **consumer price index** (CPI) is a different price index: the cost of a basket of goods bought by households, relative to the same basket in a base period. It is a Laspeyres index (fixed quantities) in its elementary form, which overstates the cost of living when households substitute away from goods whose relative prices rise. The GDP deflator includes investment and government prices and only domestic output; the CPI includes imports and only consumption. They move together over long periods and can diverge when import prices or investment prices jump.

::: example A Laspeyres CPI {#ex-cpi}
Using the two-good numbers of [[#ex-two-good]], take the CPI basket to be the 2022 quantities (10 apples, 5 oranges). Compute the CPI in 2023 with 2022 $= 100$. Why is it not equal to the GDP deflator of 140?
::: solution
The 2022 basket costs 40 in 2022 and $10\times 3 + 5\times 5 = 55$ in 2023. CPI $= 55/40 \times 100 = 137.5$. The deflator used 2023 quantities (12 apples, 4 oranges) and equalled 140. The CPI over-weights oranges, whose price rose less in this example (from 4 to 5) than apples (from 2 to 3), relative to the deflator’s 2023 basket, which had shifted toward apples. Substitution, had households actually moved with relative prices, would make a true cost-of-living index lower than 137.5; the Laspeyres CPI does not capture that substitution.
:::
:::

::: widget plot
f: 100*(1.02)^x; 100*(1.10)^x
x: 0, 20
y: 80, 700
labels: \text{real GDP, 2 per cent a year}; \text{nominal GDP, 10 per cent a year}
caption: An illustrative split of nominal growth into real growth and inflation. The upper curve grows at 10 per cent (nominal); the lower at 2 per cent (real). The ratio is a deflator that grows at about 8 per cent a year, by the approximation $i \approx r + \pi$ for growth rates. Neither curve is a forecast of any country; both are compound-interest pictures of [[#def-real]].
:::

::: warning Nominal is not real
A rise in nominal GDP, in nominal wages, or in a nominal share price is not a rise in purchasing power until it is deflated. In a year of 20 per cent inflation, a 10 per cent rise in a nominal wage is a real cut. Macroeconomic comparisons across years, and across countries at market exchange rates, have to name the price units. The examples in this atlas that use “units of money” in a single period do not need a deflator; comparisons over time do.
:::

## Unemployment

::: definition Labour-force status {#def-unemployment}
A working-age person is **employed** if they did paid work (or were temporarily away) in the reference period, on the statistical office’s definitions; **unemployed** if they were without work, available, and looking (or waiting to start); and **inactive** (out of the labour force) otherwise. The **labour force** is employed plus unemployed. The **unemployment rate** is $U/(E+U)$; the **labour-force participation rate** is $(E+U)$ over the working-age population; the **employment-to-population ratio** is $E$ over that population.
:::

The definitions are those of the ILO, implemented with local twists. A discouraged worker who has stopped looking is inactive, not unemployed, so a fall in the unemployment rate can reflect exit from the labour force rather than hiring. The employment-to-population ratio does not have that particular ambiguity.

::: example A labour-force table {#ex-lf}
In a working-age population of 100, 54 people are employed, 6 are unemployed, and 40 are inactive. Compute the labour force, the unemployment rate, the participation rate and the employment-to-population ratio. If 2 of the unemployed stop looking, what happens to the unemployment rate?
::: solution
Labour force $= 60$. Unemployment rate $= 6/60 = 10$ per cent. Participation $= 60$ per cent. Employment-to-population $= 54$ per cent. If 2 stop looking, $U = 4$, labour force $= 58$, unemployment rate $= 4/58 \approx 6.9$ per cent, even though employment is unchanged. Participation falls to 58 per cent; the employment-to-population ratio is still 54 per cent.
:::
:::

Unemployment is often split into **frictional** (job search, matching), **structural** (mismatch of skills or locations, or wage floors that prevent clearing), and **cyclical** (deficient demand). The **natural rate** is a name for frictional plus structural: the rate at which inflation is stable in some Phillips-curve models, taken up in the next chapter. Measuring the natural rate is contentious; the US Congressional Budget Office publishes an estimate of the NAIRU (non-accelerating inflation rate of unemployment) and revises it.

ILO modelled estimates put the global unemployment rate at about 5.0 per cent in 2023 (ILO *World Employment and Social Outlook*, 2024). National rates in the same year, on national definitions, included about 3.6 per cent in the United States (BLS), about 5.1 per cent in Germany (Eurostat), about 7.8 per cent in Brazil (IBGE), about 32.1 per cent in South Africa (Stats SA, a high rate that also reflects a low employment-to-population ratio), and about 2.6 per cent in Japan (Statistics Bureau). Definitions of informal work, of discouraged workers, and of the working-age population differ; cross-country comparisons are rough.

::: quiz
Real GDP is unchanged and the GDP deflator rises 5 per cent. Nominal GDP
- [ ] is unchanged
- [x] rises about 5 per cent
- [ ] falls 5 per cent
- [ ] cannot be determined without the unemployment rate
::: solution
Nominal $=$ real $\times$ deflator $/100$. A 5 per cent rise in the deflator at constant real GDP is a 5 per cent rise in nominal GDP. Unemployment is a different account.
:::
:::

## Evidence and limits of the measures

Revisions are part of the product. US quarterly GDP is released as an “advance” estimate and then revised; the BEA’s vintage data show that first estimates of a quarter’s growth have a root-mean-square revision of around a percentage point at an annual rate, smaller for year-on-year figures. Using the first print as if it were the last is a mistake in any study of “what the data said at the time” versus “what the data say now”.

Underground activity, informal markets and subsistence agriculture are captured to varying degrees. In India, the Ministry of Statistics’ GDP estimates combine surveys, tax records and, for the informal sector, periodic establishment surveys that are then interpolated; the 2015 base-year revision was controversial in part because it changed the level and the cycle. In Nigeria, a 2014 rebasing of GDP almost doubled the measured level by covering more services and telecoms (National Bureau of Statistics, Nigeria, 2014). Rebasing is not a real boom; it is a better map.

Hedonic adjustment of prices for computers and phones tries to count quality as volume, not as inflation. Different offices go different distances. International comparisons at PPP, from the World Bank’s International Comparison Program and the Penn World Table, are the right tool for living-standards comparisons; market exchange rates are the right tool for a country’s capacity to buy goods from the rest of the world.

::: history
**1934, Simon Kuznets.** Kuznets’s report *National Income, 1929–1932*, prepared for the US Senate, is the founding document of modern national income accounting in the United States, with a careful discussion of what the total includes and excludes. Wartime planning and the Keynesian models of the 1940s made the expenditure identity operational. Richard Stone led the first UN *System of National Accounts* (1953), which, in successive revisions (the latest widely adopted is SNA 2008), is the template statistical offices follow. Unemployment measurement on a labour-force survey, as opposed to a count of claimants, became standard in the decades after the ILO’s conventions.
:::

## Where this leads

[[principles/macroeconomic-policy]] uses $Y$, the price level and the unemployment rate as the objects that monetary and fiscal policy try to stabilise in the short run. [[macroeconomics]] and [[economic-growth]] split $Y$ into trend and cycle, and split trend into capital, labour and productivity. [[labour-economics]] looks inside $U$ and $E$ at flows, duration and participation. International comparisons of $Y$ per person are the starting point of [[development-economics]].

::: summary
- GDP is the market value of final production in a territory, equal (up to a discrepancy) to income and to $C+I+G+NX$. It is not welfare.
- Nominal GDP mixes prices and volumes. Real GDP holds prices fixed (or chain-weights them). The deflator is their ratio; its growth is one measure of inflation.
- The CPI is a household-basket index and differs from the deflator in coverage and in formula.
- The unemployment rate is $U$ over the labour force, not over the population. Discouraged workers sit in inactivity; the employment-to-population ratio is a useful companion.
- Revisions, informal activity, quality change and PPP versus market exchange rates are limits of the measures, not reasons to discard them.
:::

## Exercises

::: exercise Expenditure arithmetic {level=1 check="1300"}
$C = 800$, $I = 200$, $G = 250$, $NX = 50$. Compute GDP. (Enter $Y$.)
::: solution
$Y = 800+200+250+50 = 1{,}300$.
:::
:::

::: exercise Value added {level=1}
A mill buys 20 of wheat (imported) and sells 50 of flour to a domestic bakery. The bakery sells 90 of bread to households. There is no other production. Compute GDP from value added and from final expenditure.
::: solution
Mill value added $= 50-20 = 30$. Bakery value added $= 90-50 = 40$. GDP $= 70$. Expenditure: $C = 90$, $NX = -20$ (imported wheat), $Y = 70$. The 50 of flour is intermediate and must not be added as extra $C$.
:::
:::

::: exercise A labour-force rate {level=1}
Working-age population 200, employed 120, unemployed 10. Compute the unemployment rate and the participation rate.
::: solution
Labour force $= 130$. Unemployment rate $= 10/130 \approx 7.69$ per cent. Participation $= 130/200 = 65$ per cent.
:::
:::

::: exercise Real GDP {level=2}
Using [[#ex-two-good]], compute 2022 real GDP in *2023* prices (a “forward” base). Is real growth from 2022 to 2023 still zero?
::: solution
2023 prices: apples 3, oranges 5. 2022 output at those prices: $10\times 3 + 5\times 5 = 55$. 2023 nominal $= 56$. Real growth with 2023 as base: $56/55 - 1 \approx 1.82$ per cent, not zero. The two base years disagree because relative prices changed (Paasche versus Laspeyres). Chain-weighting is a compromise between them.
:::
:::

::: exercise Deflator and CPI {level=2}
A consumption-only economy produces apples and oranges as in [[#ex-two-good]], and the CPI basket is the 2022 quantities. Compute the CPI in 2023 (2022 $= 100$) and compare it with the GDP deflator of 140.
::: solution
Cost of the 2022 basket in 2022: 40. Cost in 2023: $10\times 3 + 5\times 5 = 55$. CPI $= 55/40 \times 100 = 137.5$. The deflator was 140. They differ because the deflator uses 2023 quantities (12 and 4) and the CPI uses 2022 quantities (10 and 5). Neither is “wrong”; they answer different questions.
:::
:::

::: exercise Discouraged workers {level=2}
Start from [[#ex-lf]]. Employment rises by 2 as 2 inactive people take jobs, and 1 unemployed person stops looking. Find the new unemployment rate, participation rate and employment-to-population ratio.
::: solution
New $E = 56$, $U = 5$, inactive $= 39$. Labour force $= 61$. Unemployment rate $= 5/61 \approx 8.2$ per cent (down from 10). Participation $= 61$ per cent (up). Employment-to-population $= 56$ per cent (up from 54). All three improve, which is not guaranteed: a fall in $U$ from discouragement alone would cut participation.
:::
:::

::: exercise A chain of two years {level=3}
Year 1 output is $(q_a, q_o) = (10, 5)$ at prices $(2, 4)$. Year 2 is $(12, 4)$ at $(3, 5)$. Year 3 is $(13, 5)$ at $(3, 6)$. Compute year-2 growth in year-1 prices and year-3 growth in year-2 prices, then chain-weight an index of real GDP with year 1 $= 100$.
::: hint
Chain-weighting multiplies the one-year growth factors.
:::
::: solution
Year 2 in year-1 prices: 40, against year-1 nominal 40, growth factor 1. Year 3 in year-2 prices: $13\times 3 + 5\times 5 = 64$, against year-2 nominal 56, growth factor $64/56 = 8/7 \approx 1.143$. Chained index: year 1 $= 100$, year 2 $= 100$, year 3 $= 100\times 8/7 \approx 114.3$. Real growth is concentrated in the second interval.
:::
:::

::: exercise Why GNI can differ {level=3}
A territory produces 100 of value added. Foreign-owned firms remit 15 of profits abroad; residents receive 5 of profits from abroad. There is no other net factor income. Compute GDP and GNI. Which measure is closer to residents’ income?
::: solution
GDP $= 100$. Net factor income from abroad $= 5 - 15 = -10$. GNI $= 90$. GNI is closer to residents’ income. Ireland, Luxembourg and some resource exporters show large gaps of this kind; the World Bank WDI reports both series.
:::
:::
