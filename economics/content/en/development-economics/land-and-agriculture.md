Most of the world's poor still live in the countryside, and a large share of them still work on a plot. In 2023, agriculture employed 46 percent of Africa's workers and a quarter of the world's (FAOSTAT / ILO); in Ethiopia it still produced about 36 percent of GDP, against about 7 percent in China and under 2 percent in the United States (World Bank WDI). How that plot is *owned* and *operated* — owner-occupation, tenancy, sharecropping, a communal right — shapes who invests, who works, and who eats the surplus. This chapter studies sharecropping and the Marshallian inefficiency argument, land rights and titling, land reform, and the Green Revolution that raised cereal yields across South Asia and Mexico. It is the microeconomics of the "traditional sector" in [[development-economics/structural-change]].

## Sharecropping

A **sharecropping** contract gives the tenant a share $s \in (0, 1)$ of output and, typically, asks for no fixed rent (or a small one). It is widespread in South Asia, in parts of Africa, and in the history of the American South. Why share, when a fixed rent would seem to give the tenant the full residual?

::: definition Sharecropping {#def-share}
A **share contract** pays the tenant $s Q - r$ and the landlord $(1-s) Q + r$, where $Q = F(e)$ is output, $e$ is the tenant's effort (or non-contractible inputs), $s$ is the crop share and $r$ is a fixed rent (possibly zero, possibly negative — a wage). **Owner-occupation** is $s = 1$. A **fixed-rent** tenancy is $s = 1$ with $r > 0$. A **wage** farm is $s = 0$ with $r < 0$.
:::

::: proposition Marshallian inefficiency {#prop-marshall}
Suppose the tenant chooses $e$ to maximise $s F(e) - c(e)$, with $F' > 0$, $F'' < 0$, $c' > 0$, $c'' \ge 0$, and $e$ unobserved by the landlord. The tenant's first-order condition is $s F'(e) = c'(e)$. The first-best (joint-surplus-maximising) condition is $F'(e) = c'(e)$. For $s < 1$, the tenant supplies too little $e$. A fixed-rent contract ($s = 1$) restores first-best effort if the tenant can bear the risk and pay $r$.
:::
::: proof
Tenant: $\max_e s F(e) - c(e)$ gives $s F'(e) = c'(e)$. Joint surplus $F(e) - c(e)$ is maximised at $F'(e) = c'(e)$. Because $F'' < 0$ and $c'' \ge 0$, $s F'(e) = c'(e)$ requires a smaller $e$ when $s < 1$. If $s = 1$, the two conditions coincide. (Marshall, *Principles*, Book VI, ch. X; the modern statement is in Cheung, Stiglitz, and Hayami–Otsuka.)
:::

::: widget plot
f: s*0.5/sqrt(x); 0.4
sliders: s=0.5:0.2:1:0.05
x: 0.15, 2.5
y: 0, 1.6
labels: s F'(e); c'(e)
caption: Marshallian sharecropping. Marginal product for the tenant is $s F'(e)$ (here $F(e) = \sqrt{e}$, so $F'(e) = 1/(2\sqrt{e})$); marginal cost of effort is the horizontal line. Slide the share $s$. At $s = 1$ the tenant works up to $F' = c'$; at $s = 1/2$ he stops where $F' = 2 c'$, with too little effort. The gap is the Marshallian inefficiency.
:::

Cheung (1969) objected: if effort is *enforceable*, the landlord can stipulate $e$ as well as $s$, and sharecropping can be efficient — it becomes a way to share *risk*, not a distortion of effort. Stiglitz (1974) and Newbery, and later the principal–agent literature, put both pieces together: when effort is hidden *and* the tenant is risk-averse, the optimal contract is typically a mix, $0 < s < 1$, trading incentives against insurance. Sharecropping is then a second-best, not a puzzle.

::: example A square-root farm {#ex-marshall}
$F(e) = 2\sqrt{e}$, $c(e) = e$, $s = 1/2$, $r = 0$. Compute the tenant's effort and output, the first-best effort and output, and the deadweight loss $F(e)-c(e)$ relative to first best.
::: solution
Tenant: $\max_e \sqrt{e} - e$, FOC $1/(2\sqrt{e}) = 1$, so $\sqrt{e} = 1/2$, $e = 1/4$, $F = 1$. Surplus $1 - 1/4 = 3/4$. First best: $\max 2\sqrt{e} - e$, FOC $1/\sqrt{e} = 1$, $e = 1$, $F = 2$, surplus $1$. Deadweight loss $1/4$. Halving the share quartered effort and halved output, in this technology.
:::
:::

Empirical tests of Marshallian inefficiency have a long history. Shaban (1987), on Indian ICRISAT plots, compared owned and sharecropped plots of the *same* household and found lower input intensity on the sharecropped plots — a within-household comparison that holds tastes and skill fixed. Later work (Banerjee, Gertler and Ghatak 2002 on Operation Barga in West Bengal; Laffont and Matoussi; African studies) has found that strengthening the tenant's share or security raises productivity, which is the sign Marshall predicted. Effect sizes are not always large, and risk-sharing and credit (the landlord as banker) muddy the comparison. The Marshallian prediction is a useful null, not a complete description of any village.

::: warning $s = 1/2$ is not a law of nature
Fifty-fifty shares are common, and theorists have explained the round number by bargaining conventions, by limited liability (Shetty; Laffont–Matoussi), and by the algebra of linear contracts. They are not implied by [[#prop-marshall]] alone, which makes $s$ a free parameter. Do not read a fifty-fifty share as evidence that "the model says a half".
:::

## Land rights and land reform

Investment in a plot — a well, a terrace, a tree, fertiliser that has a residual — depends on whether the investor will be there at harvest, and on whether the plot can be used as collateral ([[development-economics/credit-and-microfinance]]).

::: definition Tenure security {#def-tenure}
**Tenure security** is the probability that a cultivator (owner, customary holder, or tenant) will retain the plot — and the fruits of investment on it — for a relevant horizon. It is a bundle of rights (to use, exclude, bequeath, sell, pledge), not a single title deed. A certificate that names the holder but forbids sale can still raise security of *use*; a title that courts will not enforce does not.
:::

**Property rights** in land are that bundle: the right to use, to exclude, to bequeath, to sell, to pledge. Customary systems in much of Africa assign use and inheritance without a state title; Latin American and South Asian systems mix titled private land, tenancy, and, in some countries, a history of *latifundia* and reform.

Hernando de Soto's *The Mystery of Capital* (2000) argued that untitled land is "dead capital": it cannot be pledged, so it cannot fund investment. The empirical literature is more qualified. Field (2005, 2007), on a Peruvian urban titling programme, found effects on labour supply (people no longer needed to sit on the plot to guard it) and on some investment, more than on a surge of bank loans. Galiani and Schargrodsky (2010), on a quasi-random titling episode in suburban Buenos Aires, found more housing investment and more education of children, again with limited credit effects. African titling and certification programmes (Ethiopia's land certification; Rwanda; some Ghanaian studies) have often found more investment in trees and terraces, and more rental-market activity, with effects that depend on whether women as well as men are named on the certificate (a result that has shown up in several evaluations).

**Land reform** — ceilings, expropriation, tenancy registration — is a different instrument. Operation Barga in West Bengal (late 1970s–80s) registered sharecroppers and raised their statutory share; Banerjee, Gertler and Ghatak (2002) estimated a substantial rice-productivity gain. Mexico's *ejido* reform (1992) legalised rental and, eventually, sale of previously inalienable plots, with mixed effects on investment and on concentration. Zimbabwe's fast-track resettlement after 2000 cut commercial output sharply; that episode is a warning about *how* reform is done (speed, compensation, skills, export links), not a general theorem that redistribution of land destroys output. East Asian reforms (Japan, South Korea, Taiwan, 1940s–50s) combined redistribution with a subsequent Green Revolution and are often credited with both equity and a later growth take-off; identification is not experimental.

::: example A limited-liability share {#ex-ll}
Output is 4 or 0 with equal probability. The tenant has no wealth. Compare a rent $r = 1$ (collected only when output is 4) with a share $s = 1/2$. What are the landlord's expected receipts?
::: solution
Rent: landlord gets 1 or 0, mean 0.5; tenant gets 3 or 0. Share: landlord gets 2 or 0, mean 1; tenant gets 2 or 0. The share collects more for the landlord because $s Q$ scales with the good harvest, whereas a small collectable rent leaves more of the good harvest with the tenant. Both leave the tenant with 0 in the bad state, so neither is insurance against the bad harvest. Limited liability explains why a large rent is infeasible; a share is one feasible way for the landlord to claim a piece of the good state.
:::
:::

::: example A tenure-security calculation {#ex-tenure}
A terrace costs 100 and raises output by 30 a year forever. The discount rate is 10 percent. If the farmer is evicted with probability $q$ each year, independently, after which the terrace is lost, the NPV is $-100 + 30/(r+q)$. At what $q$ does the investment cease to pay? What is the NPV at $q = 0$?
::: solution
Set $-100 + 30/(0.10+q) = 0$, so $0.10 + q = 0.30$ and $q = 0.20$. At a 20 percent annual eviction risk the terrace is not built; at a secure title ($q = 0$) NPV $= -100 + 30/0.10 = 200$. Tenure security here is worth several times the construction cost. (The $r+q$ formula is the standard capitalisation of a perpetuity with a constant hazard of loss.)
:::
:::

## The Green Revolution and productivity

From the 1960s, high-yielding varieties of wheat (Borlaug, CIMMYT, Mexico then South Asia) and rice (IR8 and descendants, IRRI, the Philippines then South and East Asia) raised cereal yields, together with fertiliser, irrigation and, later, pesticide. India's wheat yields roughly doubled between the mid-1960s and the 1980s in Punjab and Haryana; Mexico had already seen the first wave; China had its own, later, hybrid-rice revolution under Yuan Longping. FAOSTAT cereal-yield series remain the place to look: yields in tonnes per hectare diverged, with East and South Asia pulling away from much of sub-Saharan Africa, where adoption of improved varieties came later, irrigation is scarcer, and maize, cassava and sorghum, not wheat and paddy, are the staples.

The Green Revolution was not a free lunch. It favoured regions with irrigation; it raised the demand for complementary inputs, which can concentrate gains on better-off farmers if credit and water are unequal (the early Lipton and others' critique); it had environmental costs (drawdown of aquifers in Punjab, pesticide exposure). It also, in the Panjab and in Java, raised labour demand in peak seasons and cut the price of food, a gain for net buyers — who are many of the poor. Evenson and Gollin's surveys, and later work using the timing of variety releases, find large effects on yields, on calorie availability, and, in some designs, on health and on the movement of labour out of agriculture. Africa's "Green Revolution" is a live policy project (AGRA, national fertiliser programmes, drought-tolerant maize), with adoption rising and with a smaller irrigation base.

A separate, older puzzle is the **inverse farm-size–productivity relationship**: output per hectare is often higher on smaller farms, in Indian, African and Latin American censuses. Candidate explanations include unobserved soil quality (small farms are better land), family labour that is not priced at the market wage (Sen; the dual-economy link), and measurement error in area. Carletto, Savastano and others, using GPS-measured plots, have found that the inverse relationship sometimes shrinks once area is measured accurately, and sometimes does not. If it is real and if it reflects a family-labour distortion, land reform that creates small owner-operated farms can raise output; if it is soil quality, the same reform only redistributes. The data have not delivered a single verdict.

::: quiz
Marshallian inefficiency predicts that, on sharecropped plots, the tenant
- [ ] uses too *much* effort, because he must feed the landlord
- [x] uses too little effort, because he receives only $s$ of the marginal product
- [ ] uses first-best effort, because 50–50 shares are efficient
- [ ] will never adopt a Green Revolution variety
::: solution
[[#prop-marshall]]: $s F'(e) = c'(e)$ with $s < 1$ gives too little $e$. Sharecroppers *have* adopted modern varieties, in many settings, when the landlord shared the cost of fertiliser or when the yield gain was large enough even at $s = 1/2$. The Marshallian prediction is about the *margin* of effort, not about a ban on new seeds.
:::
:::

::: example Fertiliser on two contracts {#ex-fert}
A new seed raises $F(e)$ to $3\sqrt{e}$ from $2\sqrt{e}$. Under sharecropping $s = 1/2$ and $c(e) = e$, will the tenant's effort rise, and will output rise more or less than under owner-occupation?
::: solution
Share tenant maximises $(s)\times 3\sqrt{e} - e = 1.5\sqrt{e} - e$, FOC $0.75/\sqrt{e} = 1$, $e = 0.5625$, $F = 3\times 0.75 = 2.25$ (up from 1 in [[#ex-marshall]]). Owner-occupier: $\max 3\sqrt{e}-e$, FOC $1.5/\sqrt{e} = 1$, $e = 2.25$, $F = 4.5$ (up from 2). Both raise effort and output; the owner-occupier's output gain ($2.5$) is larger than the tenant's ($1.25$). Complementary inputs and the share contract interact: a Green Revolution that is profitable at $s = 1$ can be only moderately profitable at $s = 1/2$.
:::
:::

::: application Who owns the tree?
A cocoa or coffee tree is a decades-long investment. In several West African systems, planting a tree has itself been a way to *claim* land under customary law. Besley (1995), on Ghana, found that more secure rights (and rights that the planter can bequeath) go with more tree investment, and that the causation runs both ways: investment strengthens the claim. Ethiopian land certification, which named holders without creating a full sales market, has been associated with more terracing and tree-planting in several evaluations (Deininger, Ali, Holden and others). The object is not always a Torrens title; it is a credible claim to the future fruit of the tree.
:::

## Evidence

FAOSTAT and the World Bank's agriculture indicators are the descriptive backbone: yields, fertiliser per hectare, the share of irrigated land, and employment. Sub-Saharan Africa still has much lower cereal yields and much less irrigation than South Asia, which itself sits below East Asia. Latin America is land-abundant in the Southern Cone and land-unequal almost everywhere; Brazil's agricultural boom of the 2000s was mechanised, export-oriented, and not a smallholder Green Revolution.

RCTs on fertiliser and on information (Duflo, Kremer and Robinson on Kenya; later work on soil tests and on subsidies) find that fertiliser is often profitable at market prices *and* under-used, with explanations that include credit, present bias, risk, and a genuine heterogeneity of returns across plots. That last point matters: a blanket subsidy that is rational on a mean plot can be a bad investment on a dry one. The "why don't farmers use more fertiliser?" question is the cousin of "why don't households take microcredit?" — average returns hide a distribution.

::: history
Marshall's discussion of métayage in the *Principles* (1890) is the source of the inefficiency argument; Cheung's *The Theory of Share Tenancy* (1969) is the efficiency reply; Stiglitz (1974) is the modern compromise. The Green Revolution's political history runs through the Rockefeller and Ford Foundations, CIMMYT, IRRI, India's agricultural universities, and Borlaug's 1970 Nobel Peace Prize; Yuan Longping's hybrid rice is the Chinese chapter. De Soto (2000) popularised dead capital; the Peruvian, Argentine, Ethiopian and Rwandan evaluations are the empirical reply. Operation Barga remains a standard example of a tenancy reform that moved output, not only paper.
:::

## Where this leads

Lewis's traditional sector is this chapter's farm. Credit and insurance, which landlords often provide as a bundle with the plot, are [[development-economics/credit-and-microfinance]] and [[development-economics/risk-and-insurance]]. Whether industrial policy should *pull* labour off the farm faster is [[development-economics/aid-and-policy]]. Institutions of property more broadly are [[development-economics/institutions-and-governance]].

::: summary
- Sharecropping with unobservable effort leads the tenant to set $s F'(e) = c'(e)$, which is too little effort ([[#prop-marshall]]). If effort is enforceable, or if risk-sharing is the point, the same contract can be second-best efficient.
- Land rights are a bundle. Titling has raised investment and labour supply more reliably than it has opened a flood of bank credit (Field; Galiani–Schargrodsky; Ethiopian certification).
- Land reform's output effects depend on security, complementary inputs and how the reform is administered. Operation Barga is a positive case; some expropriations are not.
- The Green Revolution raised cereal yields in Mexico and in South and East Asia through varieties, fertiliser and water (FAOSTAT). Africa's adoption has been later and less irrigated.
- The inverse size–productivity relationship is a recurring reduced form with several interpretations; GPS measurement has weakened it in some samples and not in others.
:::

## Exercises

::: exercise Marshall's FOC {level=1 check="0.25"}
$F(e) = 2\sqrt{e}$, $c(e) = e$, $s = 1/2$. What effort does the tenant choose? (Enter $e$.)
::: solution
$s F'(e) = c'(e)$ gives $0.5 \times e^{-1/2} = 1$, so $\sqrt{e} = 1/2$ and $e = 1/4$.
:::
:::

::: exercise First-best effort {level=1 check="1"}
In the same technology, what is first-best effort? (Enter $e$.)
::: solution
$F'(e) = 1/\sqrt{e} = 1$, so $e = 1$.
:::
:::

::: exercise Output gap {level=1 check="1"}
Using [[#ex-marshall]], what is first-best output minus sharecropper output? (Enter the difference.)
::: solution
$2 - 1 = 1$.
:::
:::

::: exercise A linear share {level=2}
Show that if $F(e) = e$ (constant MPL) and $c(e) = e^2/2$, the Marshallian effort is $e = s$, while first best is $e = 1$. What is the surplus loss at $s = 1/2$?
::: solution
Tenant: $\max s e - e^2/2$, FOC $s = e$. First best: $\max e - e^2/2$, $e = 1$. Surplus $F - c = e - e^2/2$ equals $1/2$ at first best and $1/2 - 1/8 = 3/8$ at $e = 1/2$. Loss $= 1/8$.
:::
:::

::: exercise Tenure and NPV {level=2 check="200"}
In [[#ex-tenure]], with $q = 0$, $r = 0.10$, cost 100 and perpetual annual yield 30, what is the NPV of the terrace? (Enter the NPV.)
::: solution
$-100 + 30/0.10 = 200$.
:::
:::

::: exercise Why share at all? {level=2}
Give two reasons a landlord and tenant might prefer $s \in (0,1)$ even though [[#prop-marshall]] predicts too little effort.
::: solution
(i) Risk sharing: a risk-averse tenant and a less risk-averse landlord want to split output-risk; $s = 1$ dumps all of it on the tenant. (ii) Limited liability: the tenant cannot pay a high $r$ in a bad year, so a pure rent contract is not feasible; a share is the feasible linear contract. Enforcement of effort, credit from the landlord, and custom are further reasons.
:::
:::

::: exercise Inverse relationship {level=3}
A census finds that output per hectare falls with plot size. State two interpretations, and one measurement fix that has been used to distinguish them.
::: solution
Interpretation 1: family labour is applied more intensively on small plots because its shadow wage is below the market wage (dualism, Sen). Interpretation 2: small plots are better land, or are measured with more error (area overstated on large farms). A measurement fix: GPS or compass-and-rope area instead of farmer-reported area (Carletto and others); soil tests for quality. If the inverse relationship vanishes with GPS, measurement was a large part of the story; if it survives, a labour or land-quality story remains.
:::
:::

::: exercise A Green Revolution and $s$ {level=3}
Using the technologies in [[#ex-marshall]] and [[#ex-fert]], compute the tenant's surplus $s F(e) - e$ before and after the new seed, at $s = 1/2$. Does the tenant have a private incentive to adopt, if adoption is free? If the seed costs 0.4, paid by the tenant, does he still adopt?
::: hint
Before: $e = 1/4$, $F = 1$. After: $e = 0.5625$, $F = 2.25$.
:::
::: solution
Before: $s F - e = 0.5 \times 1 - 0.25 = 0.25$. After: $0.5 \times 2.25 - 0.5625 = 1.125 - 0.5625 = 0.5625$. Free adoption raises the tenant's surplus, so he adopts. A cost of 0.4 still leaves $0.5625 - 0.4 = 0.1625 < 0.25$ — he would *not* adopt, even though joint surplus rose from $0.75$ to $2.25 - 0.5625 = 1.6875$, a gain of about $0.94$, far above $0.4$. The share contract can block a socially profitable technology when the tenant pays the cost and receives only $s$ of the gain. A landlord who shares the seed cost, or a subsidy, is the natural repair.
:::
:::
