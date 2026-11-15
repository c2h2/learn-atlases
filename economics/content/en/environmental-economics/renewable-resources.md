A fish stock grows if it is left alone and shrinks if it is fished hard. That single fact separates **renewable** resources from the Hotelling mines of the previous chapter. The planner's problem is no longer *when* to exhaust a finite $S_0$; it is *what stock to hold*, so that the sustainable harvest — the biological growth at that stock — maximises rent. Open access does not hold that stock. Hardin's tragedy, Gordon's 1954 fishery, and the collapse of the northern cod are the same model in three languages.

Forests add a rotation decision: when to cut a stand and replant. Faustmann's (1849) formula is the land-value maximising rotation, and it is shorter than the single-rotation (Fisher) age because the land is wanted for the next crop. This chapter develops the Schaefer growth curve, open-access versus maximum-economic-yield fisheries, and the Faustmann rotation. The phase plane of stock and effort is the dynamic picture of the tragedy.

## Biological growth and the Schaefer model

::: definition Logistic growth {#def-logistic}
A stock $X$ follows **logistic growth** if, in the absence of harvest,

$$
\dot X = F(X) = r X \bigl(1 - X/K\bigr),
$$ {#eq-logistic}

where $r > 0$ is the intrinsic growth rate and $K > 0$ is the **carrying capacity**. $F$ is hump-shaped: $F(0) = F(K) = 0$, and $F$ is maximised at $X = K/2$ with $F(K/2) = rK/4$, the **maximum sustainable yield** (MSY).
:::

::: definition Schaefer harvest {#def-schaefer}
The **Schaefer** (Gordon–Schaefer) fishery combines [[#eq-logistic]] with harvest $H = q E X$, where $E$ is fishing **effort** and $q > 0$ is catchability. The stock then obeys

$$
\dot X = r X \bigl(1 - X/K\bigr) - q E X.
$$ {#eq-schaefer}

A **steady state** with $E$ fixed has $X = 0$ or $X = K\bigl(1 - qE/r\bigr)$ provided $qE < r$.
:::

Sustainable harvest as a function of the stock is just $H = F(X)$. Choosing a stock is choosing a sustainable yield. MSY is a biological concept; it is not, in general, the economic optimum.

::: example Logistic numbers {#ex-logistic}
$r = 0.4$ per year, $K = 100$. What is MSY, and at what stock is it taken? If a constant harvest $H = 8$ is levied, what are the two equilibria of $\dot X = F(X) - 8$, and which is stable?
::: solution
MSY $= rK/4 = 10$, at $X = 50$. For $H = 8$, $0.4 X(1-X/100) = 8$ gives $X - X^2/100 = 20$, or $X^2 - 100X + 2000 = 0$. Roots $X = 50 \pm \sqrt{500} \approx 27.6$ and $72.4$. The phase line of $F(X) - 8$ is positive between the roots and negative outside, so the *upper* equilibrium is stable and the lower is unstable. A harvest above MSY has no positive steady state: the stock collapses to $0$.
:::
:::

::: widget odesolver
f: 0.4*y*(1-y/100) - 8
y0: 80
t: 0, 40
h: 0.5
methods: euler; rk4
caption: Logistic stock with a constant harvest of $8$, starting at $X(0) = 80$. The trajectory should settle near the upper equilibrium $\approx 72$. Restart mentally from $X(0) = 20$ (below the unstable root): the same harvest now drives the stock toward $0$. That is why a TAC set above the current growth rate is not merely "inefficient" — it can be a collapse.
:::

## Open access, MSY and maximum economic yield

Let the landed price $p$ be constant (the fishery is small in the world market) and let the cost of effort be $c E$, $c > 0$. Sustainable rent is $\Pi = p F(X) - c F(X)/(q X)$, because $E = F(X)/(q X)$ at a steady state with $H = F(X)$.

::: proposition Open access, MSY and MEY {#prop-fishery}
In the Gordon–Schaefer model with $p$, $c$, $q$, $r$, $K$ constant:

1. **Open access** dissipates rent: $p q X^{OA} = c$, so $X^{OA} = c/(p q)$, provided this lies in $(0,K)$. Effort enters until the average return equals $c$.
2. **MSY** is at $X^{MSY} = K/2$, $H^{MSY} = rK/4$, independent of $p$ and $c$.
3. **Maximum economic yield** (MEY) maximises sustainable rent and sits at

$$
X^{MEY} = \frac{K}{2}\left(1 + \frac{c}{p q K}\right) > X^{MSY}.
$$ {#eq-mey}

Assumptions: static open access (effort adjusts until rent is zero), constant $p$ and $c$, interior Schaefer technology, no discards or by-catch externalities.
:::

::: proof
Open access: rent $p q X E - c E = 0$ for $E > 0$ implies $p q X = c$. MSY is the maximum of $F$. For MEY, $\Pi(X) = p r X(1-X/K) - (c r / q)(1-X/K)$. Differentiating, $\Pi'(X) = pr - 2pr X/K + cr/(qK) = 0$ yields [[#eq-mey]]. Because $c/(pqK) > 0$, $X^{MEY} > K/2$. Second derivative $\Pi'' = -2pr/K < 0$.
:::

MEY conserves more stock than MSY because leaving fish in the water saves effort. Open access can lie on either side of MSY; if $c$ is small or $p$ is high, $X^{OA} < X^{MSY}$ and the fishery is biologically overfished as well as economically overfished.

::: example Gordon–Schaefer arithmetic {#ex-gs}
$r = 0.4$, $K = 100$, $q = 0.02$, $p = 2$, $c = 1$. Compute $X^{OA}$, $X^{MSY}$, $X^{MEY}$ and the associated sustainable harvests and efforts.
::: solution
$X^{OA} = 1/(2\cdot 0.02) = 25$, $H^{OA} = 0.4\cdot 25\cdot(1-0.25) = 7.5$, $E^{OA} = 7.5/(0.02\cdot 25) = 15$. $X^{MSY} = 50$, $H^{MSY} = 10$, $E^{MSY} = 10/(0.02\cdot 50) = 10$. $X^{MEY} = 50\bigl(1 + 1/(2\cdot 0.02\cdot 100)\bigr) = 50(1+0.25) = 62.5$, $H^{MEY} = 0.4\cdot 62.5\cdot(1-0.625) = 9.375$, $E^{MEY} = 9.375/(0.02\cdot 62.5) = 7.5$. Open access uses twice MEY effort to take a *smaller* harvest from a depleted stock. Rent at MEY is $p H - c E = 2\cdot 9.375 - 1\cdot 7.5 = 11.25$; rent at open access is zero.
:::
:::

::: widget phaseplane
f: 0.4*x*(1-x/100) - 0.02*y*x
g: 0.1*(2*0.02*x - 1)*y
x: 0, 120
y: 0, 40
points: 80, 5; 90, 20; 20, 10; 70, 8
nullclines: true
caption: Stock $X$ (horizontal) and effort $E$ (vertical). $\dot X = F(X) - qEX$, $\dot E = \phi (pqX - c)E$ with $\phi = 0.1$ — effort grows when rent is positive. Click near $(80,5)$: the path should head toward the open-access point $(X,E) = (25, 15)$. The $X$-nullcline is the Schaefer curve $E = (r/q)(1-X/K)$; the $E$-nullcline is the vertical line $X = c/(pq) = 25$ together with $E = 0$. Open access is their interior intersection. MEY is not an equilibrium of this open-access adjustment; it has to be imposed by a tax, a quota or a sole owner.
:::

::: warning MSY is not MEY, and a TAC is not a sole owner
Setting a total allowable catch at MSY maximises tonnes, not rent, and it does not by itself solve the race to fish: open-access *effort* still dissipates rent inside the season (the "derby"). A sole owner, an ITQ that caps *catch* and is tradable, or a landing tax $t = p - c/(q X^{MEY})$ can support MEY. Biology does not deliver economics.
:::

::: quiz
In [[#ex-gs]], a minister proposes "fishing at MSY to feed the country". Which statement is accurate?
- [ ] MSY maximises rent, so the proposal is the economic optimum
- [x] MSY maximises sustainable tonnes, not rent; MEY holds a larger stock and uses less effort
- [ ] Open access already achieves MSY
- [ ] MEY requires exhausting the stock so that growth $rX$ is large
::: solution
$X^{MEY} = 62.5 > 50 = X^{MSY}$, and $E^{MEY} = 7.5 < 10$. Open access is at $25$, below MSY. MEY does not exhaust the stock; it holds more of it.
:::
:::

## Forests and the Faustmann rotation

A stand of volume $Q(T)$ can be cut at age $T$, sold at price $p$, and replanted at cost $c$. Land is homogeneous and the rotation will be repeated forever. The **land value** (soil expectation value) is the present value of the infinite sequence of rotations.

::: definition Faustmann land value {#def-faustmann}
With a constant real rate $r > 0$, the **Faustmann** land value of a bare site is

$$
V(T) = \frac{p Q(T) e^{-r T} - c}{1 - e^{-r T}},
$$ {#eq-land-value}

for a rotation age $T$ at which $p Q(T) > c$. The **Faustmann rotation** $T_F$ maximises $V(T)$. The **Fisher** (single-rotation) age $T_1$ maximises $p Q(T)e^{-rT} - c$ as if the land had no subsequent use.
:::

::: proposition Faustmann first-order condition {#prop-faustmann}
An interior Faustmann rotation satisfies

$$
p Q'(T_F) = r p Q(T_F) + r V(T_F),
$$ {#eq-faustmann}

i.e. the value of waiting one more instant (the extra timber) equals interest on the timber *plus* interest on the land. The Fisher condition is $p Q'(T_1) = r p Q(T_1)$, so $T_F < T_1$ whenever $V > 0$. Assumptions: constant $p$, $r$, $c$, no thinning, no amenity or carbon value, deterministic $Q$, land homogeneous and always replanted.
:::

::: proof
Write $V(T) = N(T)/D(T)$ with $N = pQ e^{-rT} - c$ and $D = 1 - e^{-rT}$. Setting $V'(T) = 0$ is $N'D = ND'$. Computing $N' = e^{-rT}\bigl(p Q' - r p Q\bigr)$ and $D' = r e^{-rT}$, and substituting $V = N/D$, yields $p Q' - r p Q = r V$.
:::

Carbon sequestration, biodiversity and recreation raise the value of *standing* timber and lengthen $T_F$; a higher $p$ or a lower $r$ also lengthens it. A higher $r$ shortens it. Amenity values that are lost at harvest are a reason $T_F$ from timber alone is too short as a social rotation — the missing-price logic of [[environmental-economics/environment-and-economy]].

::: example Faustmann versus Fisher {#ex-faustmann}
$Q(T) = 200\bigl(1 - e^{-0.05 T}\bigr)$, $p = 1$, $r = 0.05$, $c = 20$. Compare $T_1$ and $T_F$.
::: solution
$Q'(T) = 10 e^{-0.05 T}$. Fisher: $10 e^{-0.05 T} = 0.05\bigl(200(1-e^{-0.05 T}) - 20\bigr)$. Numerically $T_1 \approx 16.0$ years, $Q(T_1) \approx 110$. Faustmann: $Q'(T) = 0.05\bigl(Q(T)-20\bigr)/(1-e^{-0.05 T})$. Numerically $T_F \approx 7.6$ years, $Q(T_F) \approx 63$, $V(T_F) \approx 93.5$. The land is valuable, so the rotation is cut almost in half relative to Fisher. A forestry rule of "cut at MSY age" (maximise $Q(T)/T$) would be different again, and would ignore both $r$ and $V$.
:::
:::

::: example A carbon price on standing timber {#ex-carbon-forest}
Suppose a carbon payment adds a flow $s Q(T)$ per year of delay (a sketch of a sequestration subsidy). In the Faustmann condition, the left-hand side gains $s Q(T)$. Does $T_F$ rise or fall?
::: solution
The extra term raises the return to waiting, so $T_F$ rises. A large enough $s$ can delay harvest indefinitely — the stand is worth more as a carbon store than as timber. That is a comparative static of [[#eq-faustmann]], not a recommendation of any particular subsidy. It does show why a timber-only Faustmann age is not the social rotation once carbon is priced.
:::
:::

## Evidence

Gordon (1954) wrote about open-access fisheries before Hardin; the northern cod moratorium (Canada, 1992) and the collapse of several large marine stocks in the late twentieth century (FAO, *State of World Fisheries and Aquaculture*, successive issues) are the empirical exhibit of $X^{OA}$ near zero. Individual transferable quotas in Iceland, New Zealand and parts of the US and Chile have, in several fisheries, raised stocks and landed values relative to the derby they replaced (Costello, Gaines and Lynham, *Science*, 2008, on catch-share fisheries). They are not a panacea: monitoring, high-grading and the allocation of the initial rent remain live disputes.

Global forest area continues to decline in the tropics and to recover in parts of Europe and East Asia (FAO, *Global Forest Resources Assessment 2020*). Faustmann rotations in commercial plantations (Chilean radiata, Scandinavian spruce) are in the spirit of [[#eq-faustmann]]; primary tropical forest is not a Faustmann stand — its TEV is dominated by non-timber values that a timber rotation ignores. Brazil's Forest Code, Costa Rica's payments for ecosystem services, and Indonesia's moratoria are attempts to install some of those missing prices.

The same algebra is a story about *instruments*. A **total allowable catch** (TAC) that is set at MEY and not divided among vessels recreates a race: the stock may be right on average and the season collapses into a few days, as in the Pacific halibut fishery before individual quotas (Homans and Wilen 1997, *Journal of Environmental Economics and Management*). An **individual transferable quota** (ITQ) assigns shares of the TAC, so the race's prize is already owned and the season can lengthen. ITQs are widely used in Iceland, New Zealand and parts of the North Pacific. They raise a distributional question — who is grandfathered — that the Gordon–Schaefer model does not answer, and they require enforcement against discarding and against quota busting. They are an instrument that prices the missing rent [[#prop-fishery]], not a theorem that every fishery should be ITQ'd.

The northern cod moratorium of 1992 is the usual collapse case. Catch of Atlantic cod off Newfoundland was of the order of $200{,}000$–$800{,}000$ tonnes a year in the post-war decades and fell to a residual after 1992 (DFO Canada stock assessments; FAO capture series). The Gordon–Schaefer diagram says that a combination of high $p q / c$ (valuable fish, efficient gear) and delayed cuts in $E$ can drive $X$ through the MSY hump toward a low-stock steady state or, with depensation not in the logistic, toward zero. Whether the 1992 collapse was overfishing, a cold-ocean regime shift, or both, is a live empirical dispute (Rose 2004; Hutchings and Myers). The model names the overfishing channel; it does not settle the climate channel.

Forests add carbon. A standing stand stores carbon; a cut stand releases some and, if used as timber, stores some in products. A carbon price on standing biomass lengthens $T_F$ because the opportunity cost of cutting includes the lost carbon payment ([[#ex-carbon-forest]]). Biodiversity and amenity values, if they accrue as a flow from older stands, lengthen it further. Faustmann with extra flow values is still Faustmann; the missing prices are the reason rotations look too short to a conservationist and too long to a mill.

::: history
**1849, Martin Faustmann.** "Berechnung des Wertes welchen Waldboden sowie noch nicht haubare Holzbestände für die Waldwirtschaft besitzen" derived [[#eq-land-value]]. English-language forestry rediscovered it in the 1950s.

**1954, H. Scott Gordon and M. B. Schaefer.** Gordon's "The Economic Theory of a Common-Property Resource: The Fishery" (*Journal of Political Economy*) and Schaefer's surplus-production model gave [[#prop-fishery]].

**1968, Garrett Hardin.** "The Tragedy of the Commons" (*Science*) popularised open-access overuse; Ostrom (1990) documented commons that do not fit the open-access hypothesis.
:::

::: summary
- Logistic growth $F(X)$ is hump-shaped; MSY is at $K/2$ and is a biological, not an economic, target ([[#def-logistic]]).
- Open access sets rent to zero and holds $X^{OA} = c/(pq)$. MEY holds a larger stock than MSY and maximises rent ([[#prop-fishery]]).
- Faustmann maximises land value over infinite rotations; $T_F$ is shorter than the single-rotation Fisher age because land has value ([[#prop-faustmann]]).
- A race to fish inside a TAC, or a timber rotation that ignores carbon and biodiversity, re-creates a missing price. ITQs and carbon payments are instruments, not theorems about nature.
:::

## Exercises

::: exercise MSY stock {level=1 check="50"}
A logistic stock has $K = 100$. At what stock is MSY taken? (Enter the stock.)
::: solution
$X^{MSY} = K/2 = 50$.
:::
:::

::: exercise Open-access stock {level=1 check="25"}
In the Schaefer model $p = 2$, $q = 0.02$, $c = 1$. Compute $X^{OA}$. (Enter the stock.)
::: solution
$X^{OA} = c/(p q) = 1/0.04 = 25$.
:::
:::

::: exercise MSY harvest {level=1 check="10"}
$r = 0.4$, $K = 100$. Compute MSY. (Enter the harvest.)
::: solution
$rK/4 = 0.4 \times 100 / 4 = 10$.
:::
:::

::: exercise MEY stock {level=2 check="62.5"}
Using the parameters of [[#ex-gs]], compute $X^{MEY}$. (Enter the stock.)
::: solution
$X^{MEY} = (K/2)\bigl(1 + c/(p q K)\bigr) = 50\bigl(1 + 1/4\bigr) = 62.5$.
:::
:::

::: exercise Open-access harvest {level=2 check="7.5"}
Using the same parameters, compute sustainable harvest at open access. (Enter the harvest.)
::: solution
$H^{OA} = r X^{OA}(1 - X^{OA}/K) = 0.4 \times 25 \times 0.75 = 7.5$.
:::
:::

::: exercise A landing tax {level=2 check="1.2"}
What landing tax $t$ per unit of harvest, levied on an otherwise open-access Schaefer fishery, supports $X^{MEY}$ in [[#ex-gs]]? Use $(p-t) q X^{MEY} = c$. (Enter $t$.)
::: solution
$(2-t)\cdot 0.02 \cdot 62.5 = 1$ so $(2-t)\cdot 1.25 = 1$, hence $2-t = 0.8$ and $t = 1.2$. The tax makes the net price $0.8$, which is $c/(q X^{MEY})$, so open-access effort stops at MEY.
:::
:::

::: exercise Fisher versus Faustmann {level=3}
Using [[#eq-faustmann]], explain in one argument why $T_F < T_1$ whenever land value is positive. What happens to $T_F$ if $r$ rises?
::: solution
The Fisher condition is $p Q' = r p Q$. Faustmann adds $rV > 0$ on the right-hand side, so $p Q'$ must be larger at $T_F$ than at $T_1$. For a concave $Q$ that has $Q'$ decreasing through the relevant range, a larger $Q'$ is a younger stand: $T_F < T_1$. A higher $r$ raises both $r p Q$ and $rV$, so the right-hand side grows and $T_F$ shortens further — impatient landowners cut sooner.
:::
:::

::: exercise Collapse under a constant harvest {level=3}
In [[#ex-logistic]], a constant harvest $H = 12$ is attempted, above MSY. Show that no positive steady state exists, and describe the fate of $X(0) \in (0,K)$.
::: solution
$F(X) \le rK/4 = 10 < 12$ for all $X$, so $\dot X = F(X) - 12 < 0$ everywhere in $(0,K)$. The stock falls to $0$ from any interior initial condition. A TAC set above MSY is not a steady policy; it is a path to collapse. (With effort, rather than harvest, as the control, $\dot X = X\bigl(r(1-X/K) - qE\bigr)$ still has a positive steady state for $qE < r$, which is why effort regulation and harvest regulation are not the same instrument.)
:::
:::

