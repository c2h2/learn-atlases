The identity proved in [[thermodynamics/entropy]],

$$
\dd U = T\,\dd S - P\,\dd V,
$$ {#eq-du}

writes the internal energy as a function of entropy and volume. Those are its natural variables: $T$ and $P$ come out as derivatives,

$$
T = \left(\pdv{U}{S}\right)_{V}, \qquad P = -\left(\pdv{U}{V}\right)_{S}.
$$

A laboratory rarely holds $S$ fixed. It holds the temperature fixed, by contact with a reservoir, or the pressure fixed, by a piston open to the atmosphere. The potentials in this chapter are the functions whose natural variables are the ones an apparatus actually controls. They are obtained from $U$ by subtracting $TS$, or adding $PV$, or both. Nothing new is measured. The same equilibrium states are labelled by a more convenient function.

The sign convention stays that of [[thermodynamics/first-law]]. The first law is $\Delta U = Q + W$ with $W$ the work done on the system, and a quasistatic expansion contributes $W = -\int P\,\dd V$. All four differentials below are for a closed hydrostatic system whose only work is that expansion work. Extra work, electrical or otherwise, adds a term. The warning at the end of the chapter says so again, because it is the assumption most often forgotten when the formulae are copied into a new problem.

## Enthalpy

Warm a beaker at atmospheric pressure and the heat you supply is not $\Delta U$. The system expands as it warms, does work on the atmosphere, and part of the heat pays for that work. The combination that matches the heat directly is $U + PV$.

::: definition Enthalpy {#def-enthalpy}
The **enthalpy** of a hydrostatic system is

$$
H = U + PV.
$$ {#eq-h}

$H$ is a state function because $U$, $P$ and $V$ are. Its SI unit is the joule.
:::

Consider a process in which the only work is expansion work, the external pressure $P$ is constant, and the system begins and ends in equilibrium at that same pressure. Then $W = -P\,\Delta V$, so

$$
\Delta U = Q - P\,\Delta V.
$$

Rearrangement gives $Q = \Delta U + P\,\Delta V$. At constant $P$ the right-hand side is $\Delta(U + PV)$:

$$
Q_P = \Delta H.
$$ {#eq-qp}

The subscript records the condition. [[#eq-qp]] holds whether or not the process is reversible, provided the work really is $-P\,\Delta V$ against that constant external pressure and there is no other work. A reaction in an open vessel, a phase change at the equilibrium vapour pressure, and a slow isobaric warming of an ideal gas all fall under it. A constant-volume warming does not: there $W = 0$ and $Q_V = \Delta U$.

For an ideal gas, $PV = nRT$ and $U$ depends only on $T$, so

$$
H = U + nRT
$$

depends only on $T$ as well. With a constant molar heat capacity, $\Delta H = n C_{P,m}\,\Delta T$ and $\Delta U = n C_{V,m}\,\Delta T$. The gap between them is $nR\,\Delta T$, which is $-W$ on the isobaric path: the heat at constant pressure exceeds the rise in internal energy by the work done on the atmosphere, with a minus sign because that work is negative in our convention. A monatomic gas has $C_{V,m} = \tfrac{3}{2} R$ and $C_{P,m} = \tfrac{5}{2} R$. A diatomic gas at room temperature, rotation excited and vibration not, has $C_{V,m} = \tfrac{5}{2} R$ and $C_{P,m} = \tfrac{7}{2} R$.

::: example Heating a monatomic gas at constant pressure {#ex-enthalpy}
Two moles of ideal monatomic gas are warmed from $300\,\mathrm{K}$ to $360\,\mathrm{K}$ at constant pressure. Find $\Delta H$, $\Delta U$ and the work done on the gas.
::: solution
Enthalpy depends only on temperature for an ideal gas, and at constant pressure $Q = \Delta H$ by [[#eq-qp]]. With $C_{P,m} = \tfrac{5}{2} R$ and $R = 8.314462618\,\mathrm{J/(mol\cdot K)}$,

$$
\Delta H = n C_{P,m}\,\Delta T = 2.00\times\tfrac{5}{2}\times R\times 60.0.
$$

First $\tfrac{5}{2} R = 20.786156545\,\mathrm{J/(mol\cdot K)}$, then $n C_{P,m} = 41.57231309\,\mathrm{J/K}$, and

$$
\Delta H = 41.57231309\times 60.0 = 2494.34\,\mathrm{J}.
$$

The internal energy uses $C_{V,m} = \tfrac{3}{2} R$:

$$
\Delta U = 2.00\times\tfrac{3}{2}\times R\times 60.0 = 3 R\times 60.0 = 180\, R = 1496.60\,\mathrm{J}.
$$

The first law then gives the work done on the gas, $W = \Delta U - Q = \Delta U - \Delta H$:

$$
W = 1496.60 - 2494.34 = -997.74\,\mathrm{J}.
$$

The direct isobaric formula agrees. $W = -P\,\Delta V = -nR\,\Delta T = -2.00\times R\times 60.0 = -997.74\,\mathrm{J}$. The gas expands and the surroundings do negative work on it. Reporting $Q$ as $\Delta U$ would drop this $998\,\mathrm{J}$ and mis-state the heat the burner must supply.
:::
:::

## Helmholtz free energy

Enthalpy replaces the variable $V$ by $P$. Temperature is still not an independent argument of $H$: the natural variables of $H$ will turn out to be $S$ and $P$. To install $T$ as an argument, subtract the product $TS$. The product rule then cancels the $T\,\dd S$ term in [[#eq-du]] against part of $\dd(TS)$, and $T$ survives as the variable you differentiate with respect to.

::: definition Helmholtz free energy {#def-helmholtz}
The **Helmholtz free energy** is

$$
F = U - TS.
$$ {#eq-f}

$F$ is a state function. Its SI unit is the joule. The name free energy is interpreted after the equilibrium criteria below: at fixed temperature, $-\Delta F$ is the most work the system can do.
:::

$F$ is extensive, because $U$ and $S$ are and $T$ is intensive. Doubling the sample at fixed $T$ and $V$ per mole doubles $F$. Only differences of $F$ appear in this chapter, or values computed from a stated reference, because $S$ itself is fixed only up to a constant. A constant in $S$ shifts $F$ by $-T$ times that constant and does not affect $\Delta F$ at a single temperature. It does affect comparisons of $F$ at two different temperatures, which we will not need.

At fixed temperature the differential of [[#eq-f]] collapses to $\Delta F = \Delta U - T\,\Delta S$, once the endpoints are equilibrium states at that same $T$. Combined with $\Delta U = Q + W$ and the Clausius bound $Q \le T\,\Delta S$ from [[thermodynamics/entropy]], this says

$$
W \ge \Delta F,
$$ {#eq-w-f}

with equality on a reversible path. The work done *on* the system is at least $\Delta F$. Equivalently, the work done *by* the system is at most $-\Delta F$. If $\Delta F$ is negative, the system can deliver work; the reversible path delivers the most. If $\Delta F$ is positive, work must be done on the system even in the best case. [[#eq-w-f]] is the reason $F$ is called a free energy: $-\Delta F$ is the portion of the energy change that is free to leave as work, after the entropy cost $T\,\Delta S$ has been paid to the reservoir that holds the temperature fixed.

The bound assumes the system's initial and final temperatures equal the reservoir temperature, so that $Q \le T\,\Delta S$ uses one $T$. It does not assume constant volume. At constant volume, with only expansion work, $W = 0$, and [[#eq-w-f]] becomes $0 \ge \Delta F$. A spontaneous process at fixed $T$ and $V$ cannot raise $F$. That criterion is proved with the others below. Here the point is the accounting: $F$ packages $U$ and $TS$ so that the second-law bound on heat becomes a bound on work.

## Gibbs free energy

Most chemical and phase changes are run at constant pressure as well as constant temperature. The function that is bounded there adds $PV$ to $F$, or subtracts $TS$ from $H$.

::: definition Gibbs free energy {#def-gibbs}
The **Gibbs free energy** is

$$
G = U - TS + PV = H - TS = F + PV.
$$ {#eq-g}

$G$ is a state function. Its SI unit is the joule.
:::

The three expressions are identical as functions on equilibrium states. Which one you differentiate depends on which differential you already trust. For a pure substance of one component, $G$ is extensive in the amount of substance, so

$$
G = n\mu,
$$

where $\mu$ is the Gibbs function per mole. The quantity $\mu$ is the chemical potential of the substance. A proper treatment of $\mu$, including mixtures, reactions and the term $\mu\,\dd n$ in the open-system identity, belongs to a later course. We use $G = n\mu$ only as a name for the molar Gibbs function of a pure ideal gas, and only to read off how $\mu$ depends on pressure. No reaction is computed here.

::: quiz
One mole of ideal gas is compressed isothermally from pressure $P$ to $2P$. Which statement is right?
- [ ] $\Delta G = 0$, because every isothermal process of an ideal gas has $\Delta U = 0$ and $G$ tracks $U$
- [ ] $\Delta U = RT\ln 2$ and $\Delta G = 0$
- [x] $\Delta U = 0$ and $\Delta G = RT\ln 2$
- [ ] $\Delta G = -RT\ln 2$, because the volume decreases and $G$ must follow $V$
::: solution
For an ideal gas an isotherm has $\Delta U = 0$ and $\Delta H = 0$, since both $U$ and $H$ depend only on $T$. The Gibbs function does not. At fixed $T$, $\dd G = V\,\dd P$, so $\Delta G = \int V\,\dd P = RT\ln(P_2/P_1) = RT\ln 2$, which is positive for a compression. The volume term in $G = F + PV$ changes, but $F$ changes by the same amount and the two changes do not cancel: $\Delta(PV) = \Delta(nRT) = 0$ on an ideal-gas isotherm, so $\Delta G = \Delta F = RT\ln 2$.
:::
:::

## Differentials and natural variables

Each potential is a composite of state functions, so each has a differential fixed by [[#eq-du]] and the product rule. The variables that remain as differentials on the right-hand side are the natural variables of that potential.

::: theorem Differentials of the four potentials {#thm-differentials}
For a closed hydrostatic system with expansion work only,

$$
\begin{aligned}
\dd U &= T\,\dd S - P\,\dd V, \\
\dd H &= T\,\dd S + V\,\dd P, \\
\dd F &= -S\,\dd T - P\,\dd V, \\
\dd G &= -S\,\dd T + V\,\dd P.
\end{aligned}
$$ {#eq-four}

Consequently

$$
\begin{aligned}
T &= \left(\pdv{U}{S}\right)_{V} = \left(\pdv{H}{S}\right)_{P}, \\
P &= -\left(\pdv{U}{V}\right)_{S} = -\left(\pdv{F}{V}\right)_{T}, \\
S &= -\left(\pdv{F}{T}\right)_{V} = -\left(\pdv{G}{T}\right)_{P}, \\
V &= \left(\pdv{H}{P}\right)_{S} = \left(\pdv{G}{P}\right)_{T}.
\end{aligned}
$$ {#eq-derivatives}
:::

::: proof
The first line is [[#eq-du]], carried forward from [[thermodynamics/entropy#thm-identity]]. It is an equality between neighbouring equilibrium states, not an inequality and not a claim about the actual heat of an irreversible process.

For the enthalpy, differentiate [[#eq-h]]: $\dd H = \dd U + P\,\dd V + V\,\dd P$. Substitute $\dd U = T\,\dd S - P\,\dd V$. The two $P\,\dd V$ terms cancel:

$$
\dd H = T\,\dd S - P\,\dd V + P\,\dd V + V\,\dd P = T\,\dd S + V\,\dd P.
$$

The natural variables are $S$ and $P$. Holding $S$ fixed, $\dd H = V\,\dd P$. Holding $P$ fixed, $\dd H = T\,\dd S$, which is the reversible-isobaric statement $Q_P = \Delta H$ written with $\text{đ}Q_{\mathrm{rev}} = T\,\dd S$.

For the Helmholtz function, differentiate [[#eq-f]]: $\dd F = \dd U - T\,\dd S - S\,\dd T$. Substitute [[#eq-du]]:

$$
\dd F = T\,\dd S - P\,\dd V - T\,\dd S - S\,\dd T = -S\,\dd T - P\,\dd V.
$$

The natural variables are $T$ and $V$. In particular, at fixed $T$,

$$
\dd F = -P\,\dd V,
$$ {#eq-df-isotherm}

so a reversible isothermal volume change has $W = \Delta F$, in agreement with equality in [[#eq-w-f]].

For the Gibbs function start from $G = H - TS$, which is the shortest route once $\dd H$ is known:

$$
\dd G = \dd H - T\,\dd S - S\,\dd T = T\,\dd S + V\,\dd P - T\,\dd S - S\,\dd T = -S\,\dd T + V\,\dd P.
$$

The natural variables are $T$ and $P$. At fixed $T$,

$$
\dd G = V\,\dd P.
$$ {#eq-dg-isotherm}

The four lines of [[#eq-derivatives]] are these differentials read as partial derivatives. Each subscript names the natural variable that is held fixed, and it is part of the statement. $\left(\pdv{G}{P}\right)_{T} = V$ is not the same operation as $\left(\pdv{G}{P}\right)_{S}$.
:::

The pattern is a change of variables, often called a Legendre transform. You trade an extensive argument ($S$ or $V$) for the intensive derivative conjugate to it ($T$ or $P$), by subtracting or adding the product of the pair. The trade is worthwhile when the new variable is the one the experiment holds fixed. It is not worthwhile when you only wanted a new letter for the same derivative: $H$, $F$ and $G$ earn their keep by moving $T$ and $P$ into the list of arguments and by the inequalities of the next section but one.

::: intuition What each subtraction removes
$U$ charges you for every change of entropy and every change of volume. Subtracting $TS$ cancels the entropy charge and leaves temperature as the dial you turn. Adding $PV$ cancels the volume charge in $\dd U$ and leaves pressure as the dial. Doing both leaves $T$ and $P$, which is why $G$ is the potential of a bench experiment in an open vessel sitting in a thermostat. The cost of the trade is that you must know $S$, or be willing to compute differences in which the unknown constant in $S$ cancels.
:::

## Maxwell relations

The mixed second partial derivatives of a smooth function are equal. Applied to $U(S, V)$, $H(S, P)$, $F(T, V)$ and $G(T, P)$, that equality is a set of relations among $T$, $S$, $P$ and $V$. They are useful because some of the derivatives are hard to measure and others are not. A derivative of entropy with respect to volume, at fixed temperature, is not a routine laboratory operation. The derivative of pressure with respect to temperature, at fixed volume, is an entry in the equation of state.

::: theorem Maxwell relations {#thm-maxwell}
Assume the second derivatives of the potentials exist and are continuous, so that mixed partials commute. Then

$$
\begin{aligned}
\left(\pdv{T}{V}\right)_{S} &= -\left(\pdv{P}{S}\right)_{V}, \\
\left(\pdv{T}{P}\right)_{S} &= \left(\pdv{V}{S}\right)_{P}, \\
\left(\pdv{S}{V}\right)_{T} &= \left(\pdv{P}{T}\right)_{V}, \\
\left(\pdv{S}{P}\right)_{T} &= -\left(\pdv{V}{T}\right)_{P}.
\end{aligned}
$$ {#eq-maxwell}
:::

::: proof
Start from $\dd U = T\,\dd S - P\,\dd V$. The coefficient of $\dd S$ is $T = \left(\pdv{U}{S}\right)_{V}$ and the coefficient of $\dd V$ is $-P = \left(\pdv{U}{V}\right)_{S}$. Differentiate the first with respect to $V$ at fixed $S$, and the second with respect to $S$ at fixed $V$:

$$
\left(\pdv{T}{V}\right)_{S} = \frac{\partial^2 U}{\partial V\,\partial S}, \qquad -\left(\pdv{P}{S}\right)_{V} = \frac{\partial^2 U}{\partial S\,\partial V}.
$$

Continuity of the second derivatives makes the two mixed partials equal, which is the first line of [[#eq-maxwell]].

The same reading of $\dd G = -S\,\dd T + V\,\dd P$ gives $ -S = \left(\pdv{G}{T}\right)_{P} $ and $ V = \left(\pdv{G}{P}\right)_{T} $. Differentiate the expression for $-S$ with respect to $P$ at fixed $T$, and the expression for $V$ with respect to $T$ at fixed $P$:

$$
-\left(\pdv{S}{P}\right)_{T} = \frac{\partial^2 G}{\partial P\,\partial T}, \qquad \left(\pdv{V}{T}\right)_{P} = \frac{\partial^2 G}{\partial T\,\partial P}.
$$

Equality of mixed partials rearranges into the fourth line, $\left(\pdv{S}{P}\right)_{T} = -\left(\pdv{V}{T}\right)_{P}$.

For the Helmholtz function the coefficients in $\dd F = -S\,\dd T - P\,\dd V$ are $-S = \left(\pdv{F}{T}\right)_{V}$ and $-P = \left(\pdv{F}{V}\right)_{T}$. Differentiate the first with respect to $V$ at fixed $T$, and the second with respect to $T$ at fixed $V$:

$$
\frac{\partial^2 F}{\partial V\,\partial T} = -\left(\pdv{S}{V}\right)_{T}, \qquad \frac{\partial^2 F}{\partial T\,\partial V} = -\left(\pdv{P}{T}\right)_{V}.
$$

The mixed partials agree, and the minus signs cancel, leaving $\left(\pdv{S}{V}\right)_{T} = \left(\pdv{P}{T}\right)_{V}$.

For the enthalpy, $\dd H = T\,\dd S + V\,\dd P$ has coefficients $T = \left(\pdv{H}{S}\right)_{P}$ and $V = \left(\pdv{H}{P}\right)_{S}$. Differentiating the first with respect to $P$ at fixed $S$, and the second with respect to $S$ at fixed $P$, gives

$$
\left(\pdv{T}{P}\right)_{S} = \left(\pdv{V}{S}\right)_{P},
$$

which is the second line of [[#eq-maxwell]].
:::

The four relations are not independent pieces of physics. They are one fact, equality of mixed partials, read on four functions. You only need the one whose fixed variables match the experiment. A derivative at fixed $S$ is the awkward one, because holding entropy fixed means a reversible adiabat. The two relations at fixed $T$ are the ones used below.

## When a change can run by itself

[[#eq-four]] relates neighbouring equilibrium states. It does not say which way a constraint, once released, will move. That question uses the second law, and the convenient packaging is an inequality with the same shape as [[#eq-du]].

Take a closed system that can exchange heat with surroundings at a constant temperature $T$, and that can exchange expansion work with surroundings at a constant pressure $P$. No other work is done. The first law reads $\Delta U = Q + W = Q - P\,\Delta V$, with $W$ the work done on the system. The surroundings are large enough that handing them heat $-Q$ does not change their temperature, so their entropy change is $\Delta S_{\mathrm{surr}} = -Q/T$. System plus surroundings form an isolated composite. By the corollary in [[thermodynamics/entropy]], the composite entropy does not decrease:

$$
\Delta S - \frac{Q}{T} \ge 0,
$$

where $\Delta S$ is the entropy change of the system between its initial and final equilibrium states. Hence $Q \le T\,\Delta S$. Substitute into the first law:

$$
\Delta U \le T\,\Delta S - P\,\Delta V.
$$ {#eq-inequality}

Here $T$ and $P$ are properties of the surroundings. They equal the system's own temperature and pressure at the two endpoints when we apply the criteria below, but during an irreversible process the system need not have a single temperature or pressure at all. Equality holds when the process is reversible: no entropy is produced, the system's temperature matches $T$, and its pressure matches $P$. The identity $\dd U = T\,\dd S - P\,\dd V$ is a different statement. It uses the system's own $T$ and $P$, and it is an equality because both sides are computed from equilibrium states. [[#eq-inequality]] is a restriction on processes. Confusing the two is how a reversible differential gets misread as a direction of change.

::: theorem Criteria at fixed temperature {#thm-criteria}
Consider a closed system whose only work is expansion work. Let the surroundings sit at constant temperature $T$ and, where pressure is fixed, at constant pressure $P$, and let the system start and end in equilibrium at that same $T$ and, where relevant, that same $P$.

- At fixed temperature and fixed volume, a spontaneous process has $\Delta F \le 0$.
- At fixed temperature and fixed pressure, a spontaneous process has $\Delta G \le 0$.

Equality holds for a reversible process. A process with $\Delta F > 0$ at fixed $T$ and $V$, or $\Delta G > 0$ at fixed $T$ and $P$, does not occur on its own.
:::

::: proof
Start from [[#eq-inequality]]. At fixed volume, $\Delta V = 0$, so $\Delta U \le T\,\Delta S$, or $\Delta U - T\,\Delta S \le 0$. The endpoints have the same temperature $T$, so the change in the Helmholtz function is

$$
\Delta F = \Delta(U - TS) = \Delta U - T\,\Delta S,
$$

the $S\,\Delta T$ piece being absent because $\Delta T = 0$ between the endpoints. Therefore $\Delta F \le 0$.

At fixed temperature and fixed pressure the endpoints share one $T$ and one $P$, so

$$
\Delta G = \Delta(U - TS + PV) = \Delta U - T\,\Delta S + P\,\Delta V.
$$

[[#eq-inequality]] says the right-hand side is at most zero. Therefore $\Delta G \le 0$.

If the process is reversible, [[#eq-inequality]] is an equality and so are the two conclusions. If $\Delta F > 0$ at fixed $T$ and $V$, the inequality would require the composite entropy to fall, which [[thermodynamics/entropy]] forbids. The same sentence with $\Delta G$ covers fixed $T$ and $P$.
:::

Read the fixed variables as the variables the surroundings enforce, not as a claim that $F$ or $G$ is constant. Along a reversible path at fixed $T$ and $V$, [[#eq-df-isotherm]] gives $\dd F = -P\,\dd V = 0$, so $F$ does not change: with only expansion work and nowhere to expand, a reversible process has nothing to do. A spontaneous drop in $F$ is an irreversible release of some other constraint, a partition, a catalyst, a metastable phase, after which the new equilibrium lies at a lower $F$. For a pure ideal gas with no such constraint, fixed $T$ and $V$ already fix the state, and there is no process whose $\Delta F$ we could judge. The ideal-gas calculations in the next section are differences between two states at different volumes or pressures. They equal the reversible work of going from one to the other. They are not, by themselves, a spontaneous process at fixed $V$, or at fixed $P$.

The partner criteria are worth one sentence each, because they explain the names. At fixed $S$ and $V$, [[#eq-inequality]] with a reversible adiabat in mind is the wrong tool; the direct statement is the entropy maximum of an isolated system, $\Delta S \ge 0$ at fixed $U$ and $V$. At fixed $S$ and $P$, the same style of argument that gave $\Delta G \le 0$ gives $\Delta H \le 0$. We will not need that case. The laboratory cases are $F$ and $G$.

[[#eq-w-f]] is the work form of the same bound. At fixed temperature of the endpoints, $W \ge \Delta F$, so the work done on the system cannot be smaller than $\Delta F$, and the work done by the system cannot exceed $-\Delta F$. If in addition the pressure is held fixed and we ask only for work other than $P\,\dd V$ work, that extra work done on the system is at least $\Delta G$. Electrical work is the usual example, and it is exactly the term our differentials have left out. Until that term is restored, do not quote $-\Delta G$ as the work a battery can do.

## An ideal gas on an isotherm

For an ideal gas, $U$ and $H$ depend only on $T$. An isotherm therefore has $\Delta U = 0$ and $\Delta H = 0$. The Gibbs and Helmholtz functions do not share that indifference. Their isotherms are logarithms of the pressure ratio, or of the volume ratio, and the two logarithms agree because $PV = nRT$ makes $\Delta(PV) = 0$ whenever $T$ is fixed and $n$ is fixed.

::: proposition Isothermal Gibbs and Helmholtz changes for an ideal gas {#prop-isotherm}
For $n$ moles of ideal gas taken isothermally from pressure $P_1$ to pressure $P_2$,

$$
\Delta G = \Delta F = nRT\ln\frac{P_2}{P_1} = nRT\ln\frac{V_1}{V_2}.
$$ {#eq-delta-g}

If $P^\circ$ is a fixed reference pressure and $\mu^\circ(T)$ means $\mu(T, P^\circ)$, the molar Gibbs function is

$$
\mu(T, P) = \mu^\circ(T) + RT\ln\frac{P}{P^\circ}.
$$ {#eq-mu}
:::

::: proof
At fixed $T$, [[#eq-dg-isotherm]] gives $\dd G = V\,\dd P$. Insert the ideal-gas law $V = nRT/P$, with $T$ constant:

$$
\Delta G = \int_{P_1}^{P_2} \frac{nRT}{P}\,\dd P = nRT\ln\frac{P_2}{P_1}.
$$

The same integral with $P = nRT/V$ and $\dd F = -P\,\dd V$ at fixed $T$ gives

$$
\Delta F = -\int_{V_1}^{V_2} \frac{nRT}{V}\,\dd V = -nRT\ln\frac{V_2}{V_1} = nRT\ln\frac{V_1}{V_2}.
$$

On an isotherm $P_2/P_1 = V_1/V_2$, so the two logarithms are the same number and $\Delta G = \Delta F$. That also follows from $G = F + PV$ and $\Delta(PV) = \Delta(nRT) = 0$.

Since $G = n\mu$ for a pure substance, $\Delta\mu = RT\ln(P_2/P_1)$. Choosing state 1 as the reference pressure $P^\circ$ produces [[#eq-mu]]. The function $\mu^\circ$ depends on temperature only because the pressure has been fixed at $P^\circ$; we do not need its explicit form to compute a pressure change.
:::

The entropy change on the same isotherm is the derivative $-(\partial G/\partial T)_P$, or the direct result from [[thermodynamics/entropy]]:

$$
\Delta S = -nR\ln\frac{P_2}{P_1}.
$$

Then $\Delta G = \Delta H - T\,\Delta S = -T\,\Delta S$, since $\Delta H = 0$, which recovers [[#eq-delta-g]]. A compression ($P_2 > P_1$) lowers the entropy of the gas and raises $G$. The heat rejected to the reservoir on the reversible path is $Q = T\,\Delta S = -nRT\ln(P_2/P_1)$, and the work done on the gas is the negative of that heat, because $\Delta U = 0$. So $W = \Delta G$ for the reversible isotherm. This is equality in $W \ge \Delta F$, and it is the calculation behind the number $RT\ln 2$.

::: example Doubling the pressure of one mole {#ex-gibbs-double}
One mole of ideal gas is taken reversibly and isothermally at $300\,\mathrm{K}$ from pressure $P$ to $2P$. Find $\Delta U$, $\Delta H$, $\Delta S$, $\Delta F$, $\Delta G$ and the work done on the gas. Use $R = 8.314462618\,\mathrm{J/(mol\cdot K)}$.
::: solution
The temperature does not change and the gas is ideal, so $\Delta U = 0$ and $\Delta H = 0$. [[#eq-delta-g]] with $n = 1$ and $P_2/P_1 = 2$ gives

$$
\Delta G = \Delta F = RT\ln 2.
$$

With $\ln 2 = 0.693147180560$ and $RT = 8.314462618\times 300 = 2494.3387854\,\mathrm{J/mol}$,

$$
\Delta G = 2494.3387854\times 0.693147180560 = 1728.94\,\mathrm{J},
$$

which rounds to $1729\,\mathrm{J}$. The entropy change of the gas is

$$
\Delta S = -R\ln 2 = -5.76315\,\mathrm{J/K},
$$

or $-5.763\,\mathrm{J/K}$ to three decimals. As a check, $-T\,\Delta S = 300\times 5.763146 = 1728.94\,\mathrm{J}$, matching $\Delta G$.

The path is reversible and $\Delta U = 0$, so $Q = -W$. The work done on the gas equals $\Delta F$:

$$
W = 1729\,\mathrm{J}, \qquad Q = -1729\,\mathrm{J}.
$$

Positive work on the gas is what a compression should show in this sign convention. The reservoir absorbs $1729\,\mathrm{J}$ and its entropy rises by $5.763\,\mathrm{J/K}$, cancelling $\Delta S$ of the gas. The universe breaks even because the isotherm was reversible. The same endpoints reached by an irreversible compression would have the same $\Delta U$, $\Delta H$, $\Delta S$, $\Delta F$ and $\Delta G$, all of them state functions, but a larger $W$ and a smaller $|Q|$, and the universe would gain entropy.
:::
:::

::: example The work an expansion can deliver {#ex-helmholtz-expand}
One mole of ideal gas at $300\,\mathrm{K}$ expands until its volume doubles. Find $\Delta F$. Compare the work done on the gas for a reversible isothermal expansion with the work done on the gas in a free expansion between the same endpoints.
::: solution
Volume doubling at fixed temperature is a pressure halving, so [[#eq-delta-g]] gives

$$
\Delta F = nRT\ln\frac{V_1}{V_2} = RT\ln\frac{1}{2} = -RT\ln 2 = -1728.94\,\mathrm{J},
$$

or $-1729\,\mathrm{J}$. The reversible isothermal path has $W = \Delta F = -1729\,\mathrm{J}$: the gas does $1729\,\mathrm{J}$ of work on the surroundings. That is the most it can do. [[#eq-w-f]] says every other path between these endpoints, at this temperature, has $W \ge \Delta F$, so $W$ is less negative and the work done *by* the gas is smaller.

Free expansion, as in [[thermodynamics/entropy]], has $W = 0$ and $Q = 0$. Zero is greater than $-1729\,\mathrm{J}$, so the inequality holds, and the work extracted is nothing. The Helmholtz function still falls by $1729\,\mathrm{J}$, because the endpoints are the same. The fall in $F$ measures the work you could have had, not the work the particular apparatus collected. Spending the opportunity as a free expansion produces entropy $R\ln 2 = 5.763\,\mathrm{J/K}$ instead of work.
:::
:::

## A Maxwell relation recovers the entropy

The third line of [[#eq-maxwell]] turns the equation of state into an entropy derivative. For an ideal gas $P = nRT/V$, so at fixed volume

$$
\left(\pdv{P}{T}\right)_{V} = \frac{nR}{V}.
$$

Therefore

$$
\left(\pdv{S}{V}\right)_{T} = \frac{nR}{V}.
$$ {#eq-dsdv}

Integrate at constant temperature. The right-hand side is $nR\,\dd V/V$, and

$$
\Delta S = nR\ln\frac{V_2}{V_1},
$$

which is the isothermal piece of the ideal-gas entropy in [[thermodynamics/entropy]]. The Maxwell relation did not require a fresh appeal to $\text{đ}Q_{\mathrm{rev}}$. It required $F$ to be a state function with continuous second derivatives, and the ideal-gas law.

The same derivative fixes the volume dependence of $U$. From [[#eq-du]], dividing by $\dd V$ at fixed $T$,

$$
\left(\pdv{U}{V}\right)_{T} = T\left(\pdv{S}{V}\right)_{T} - P.
$$ {#eq-internal-pressure}

This coefficient is sometimes called the internal pressure. It vanishes for an ideal gas, which is Joule's result, previously an experimental statement, now a Maxwell identity plus $PV = nRT$.

::: proposition Internal energy of an ideal gas {#prop-ideal-u}
For an ideal gas, $\left(\pdv{U}{V}\right)_{T} = 0$. The internal energy is a function of temperature alone.
:::

::: proof
Substitute [[#eq-dsdv]] into [[#eq-internal-pressure]]:

$$
\left(\pdv{U}{V}\right)_{T} = T\cdot\frac{nR}{V} - P.
$$

The ideal-gas law says $P = nRT/V$, so the right-hand side is $P - P = 0$. A derivative of $U$ with respect to $V$ that vanishes at every $T$ means $U$ does not depend on $V$. The equation of state has already set $P$ proportional to $T$ at fixed $V$, which is what cancels the two terms. A real gas, with a different equation of state, has a nonzero internal pressure and an energy that depends on volume.
:::

::: example Entropy from the Maxwell relation {#ex-maxwell-s}
Use [[#eq-dsdv]], not the heat along a path, to find $\Delta S$ when one mole of ideal gas doubles its volume at constant temperature. Evaluate the derivative at the initial volume $V = 0.0200\,\mathrm{m^3}$ as a check on units, and then integrate.
::: solution
At $n = 1$ and $V = 0.0200\,\mathrm{m^3}$,

$$
\left(\pdv{S}{V}\right)_{T} = \frac{R}{V} = \frac{8.314462618}{0.0200} = 415.723\,\mathrm{J/(K\cdot m^3)}.
$$

The unit is energy per temperature per volume, which is the unit of $\Delta S/\Delta V$, so the derivative is dimensionally an entropy density in $V$. It is not constant. Doubling the volume moves the state to $V = 0.0400\,\mathrm{m^3}$, where the derivative has fallen to half, $207.862\,\mathrm{J/(K\cdot m^3)}$. You cannot multiply $415.723$ by $\Delta V = 0.0200\,\mathrm{m^3}$ and call the product $\Delta S$: that would be $8.314\,\mathrm{J/K}$, which is $R$, not $R\ln 2$. The integral of $R/V$ is a logarithm:

$$
\Delta S = \int_{V}^{2V}\frac{R}{V'}\,\dd V' = R\ln 2 = 5.763\,\mathrm{J/K}.
$$

The temperature never entered [[#eq-dsdv]]. It enters the heat on the reversible isotherm, $Q = T\Delta S$, and it enters $\Delta F = -T\Delta S$ through [[#ex-helmholtz-expand]]. Entropy and free energy on an isotherm are the same logarithm in different clothes.
:::
:::

::: widget plot
f: ln(x)
x: 0.5, 3
caption: The horizontal axis is a pressure ratio P2/P1 and the curve is its natural logarithm. Along an isotherm, ΔG for one mole, divided by RT, is the height of the curve. At a ratio of 2 the height is ln 2, so one mole at 300 K has ΔG = 1729 J. At a ratio of 1 the change is zero. Below 1 the gas has expanded and ΔG is negative. The slope flattens towards the right, so a further doubling raises G by the same additive step, not by a steeper one.
:::

The figure is the same logarithm as the isothermal entropy, with the opposite sign and an extra factor of $T$ when you rebuild $\Delta G = -T\,\Delta S$. Reading $x$ as a volume ratio instead of a pressure ratio flips the sign and gives $\Delta F/(nRT)$. One curve is doing both jobs.

::: warning State functions, and only expansion work
$H$, $F$ and $G$ are state functions. Their differences between two equilibrium states do not depend on the path, reversible or not. The differentials in [[#eq-four]] assume a hydrostatic system whose only work is expansion work. Adding electrical work, or magnetic work, or the work of stretching a surface, changes $\dd U$ by that extra term, and the differentials of $F$ and $G$ change with it. In that wider setting $\left(\pdv{G}{P}\right)_{T} = V$ is no longer the whole of $\dd G$ at fixed $T$. Do not import [[#eq-four]] into a problem with a shaft, a battery or a surface and expect $-\Delta G$ to be the expansion work.
:::

::: history Gibbs, and Massieu a few years earlier
Josiah Willard Gibbs built the equilibrium theory of these potentials in *On the Equilibrium of Heterogeneous Substances*, published in two parts (1876 and 1878) in the *Transactions of the Connecticut Academy*. The functions called $F$ and $G$ here are his, up to the later choice of letters and names. Hermann von Helmholtz, in 1882, stressed the free-energy reading of $U - TS$: the part of the energy available for work at constant temperature. François Massieu's characteristic functions of 1869 are earlier. They are Legendre transforms of the entropy rather than of the energy, and they generate the same relations among derivatives. One sentence is enough to record that the idea of trading a variable for its conjugate derivative was already in play before Gibbs made it the language of chemical equilibrium.
:::

The step from here to a reaction, or to a change of phase, is to compare $G$ of two candidates at the same $T$ and $P$. The candidate with the lower $G$ is the one [[#thm-criteria]] allows. Computing that comparison for a mixture needs the chemical potential of each component, which is the later course promised when $\mu$ was introduced. The microscopic expressions for $F$ and $G$, as logarithms of partition functions, are taken up in [[statistical-mechanics]]. Nothing in that development changes the differentials proved here. It supplies the explicit functions whose derivatives we have been writing as $S$, $P$ and $V$.

::: summary
- $H = U + PV$, $F = U - TS$ and $G = U - TS + PV = H - TS$. All three are state functions. For expansion work only, $Q_P = \Delta H$ when the pressure at the endpoints is the constant external pressure.
- The natural differentials are $\dd H = T\,\dd S + V\,\dd P$, $\dd F = -S\,\dd T - P\,\dd V$ and $\dd G = -S\,\dd T + V\,\dd P$, starting from $\dd U = T\,\dd S - P\,\dd V$.
- Maxwell's relations follow by equality of mixed partials. Two of them are $\left(\pdv{T}{V}\right)_{S} = -\left(\pdv{P}{S}\right)_{V}$ and $\left(\pdv{S}{V}\right)_{T} = \left(\pdv{P}{T}\right)_{V}$.
- With $T$ and $P$ the surroundings' values, $\Delta U \le T\,\Delta S - P\,\Delta V$. At fixed $T$ and $V$, a spontaneous process has $\Delta F \le 0$. At fixed $T$ and $P$, it has $\Delta G \le 0$.
- At fixed temperature the work done on the system satisfies $W \ge \Delta F$, with equality on a reversible path. $-\Delta F$ is the most work the system can do.
- For an ideal gas on an isotherm, $\Delta U = \Delta H = 0$ and $\Delta G = \Delta F = nRT\ln(P_2/P_1)$. One mole at $300\,\mathrm{K}$, with the pressure doubled, has $\Delta G = 1729\,\mathrm{J}$.
- A Maxwell relation plus $PV = nRT$ gives $\left(\pdv{U}{V}\right)_{T} = 0$ and $\left(\pdv{S}{V}\right)_{T} = nR/V$. The differentials assume expansion work only.
:::

## Exercises

::: exercise Enthalpy minus internal energy {#exr-hu level=1 check="3*8.314462618*250"}
Three moles of ideal gas are at $250\,\mathrm{K}$. Find $H - U$.
::: solution
By [[#eq-h]] and the ideal-gas law,

$$
H - U = PV = nRT = 3.00\times 8.314462618\times 250 = 6235.85\,\mathrm{J}.
$$

The value is $6236\,\mathrm{J}$ to the nearest joule. No process is required: $H - U$ is a property of the state. The same product is $nRT$ at any pressure, provided the temperature and the amount of gas are these.
:::
:::

::: exercise Tripling the pressure {#exr-triple-p level=1 check="2*8.314462618*350*ln(3)"}
Two moles of ideal gas are held at $350\,\mathrm{K}$ while the pressure is tripled. Find $\Delta G$.
::: solution
The path may be taken as reversible and isothermal, or as any other path with the same endpoints: $G$ is a state function. [[#eq-delta-g]] gives

$$
\Delta G = nRT\ln\frac{P_2}{P_1} = 2.00\times R\times 350\times\ln 3.
$$

With $\ln 3 = 1.098612288668$,

$$
\Delta G = 700\, R\times 1.098612288668 = 5820.12383\times 1.098612288668 = 6394.06\,\mathrm{J}.
$$

To the nearest joule, $\Delta G = 6394\,\mathrm{J}$. The positive sign is the compression. $\Delta U$ and $\Delta H$ are zero and are not needed.
:::
:::

::: exercise Ratio of heat capacities {#exr-gamma level=1 check="5/3"}
For a monatomic ideal gas, $C_{V,m} = \tfrac{3}{2} R$ and $C_{P,m} = \tfrac{5}{2} R$. Find the ratio $\Delta H/\Delta U$ for a change of temperature at fixed amount of gas.
::: solution
Both $H$ and $U$ depend only on temperature, and

$$
\Delta H = n C_{P,m}\,\Delta T, \qquad \Delta U = n C_{V,m}\,\Delta T.
$$

The ratio, for $\Delta T \ne 0$, is

$$
\frac{\Delta H}{\Delta U} = \frac{C_{P,m}}{C_{V,m}} = \frac{5/2}{3/2} = \frac{5}{3}.
$$

The amount of gas and the size of $\Delta T$ cancel. The result is $\gamma$ for a monatomic gas. It is not the work, and it is not $\Delta G$.
:::
:::

::: exercise Helmholtz function when the volume doubles {#exr-delta-f level=2 check="-8.314462618*300*ln(2)"}
One mole of ideal gas expands isothermally at $300\,\mathrm{K}$ until the volume doubles. Find $\Delta F$.
::: hint
At fixed temperature $\dd F = -P\,\dd V$, and $P\,\dd V = nRT\,\dd V/V$.
:::
::: solution
[[#eq-delta-g]] with $V_2/V_1 = 2$ gives

$$
\Delta F = -nRT\ln 2 = -RT\ln 2 = -1728.94\,\mathrm{J},
$$

or $-1729\,\mathrm{J}$. This is also $\Delta G$, because an ideal-gas isotherm has $\Delta(PV) = 0$. The reversible work done on the gas equals $\Delta F$. A free expansion between the same volumes has the same $\Delta F$ and a different $W$.
:::
:::

::: exercise Enthalpy of a diatomic gas {#exr-diatomic-h level=2 check="1.5*(7/2)*8.314462618*20"}
A sample of $1.50\,\mathrm{mol}$ of ideal diatomic gas, with $C_{P,m} = \tfrac{7}{2} R$, is warmed by $20.0\,\mathrm{K}$ at constant pressure. Find $\Delta H$.
::: solution
At constant pressure, or indeed for any temperature change of an ideal gas, $\Delta H = n C_{P,m}\,\Delta T$:

$$
\Delta H = 1.50\times\tfrac{7}{2}\times R\times 20.0 = 105\, R.
$$

Since $R = 8.314462618\,\mathrm{J/(mol\cdot K)}$,

$$
\Delta H = 105\times 8.314462618 = 873.019\,\mathrm{J},
$$

or $873.0\,\mathrm{J}$ to one decimal place. By [[#eq-qp]] this is also the heat absorbed. The change in internal energy is smaller by $nR\,\Delta T = 1.50\times R\times 20.0 = 249.434\,\mathrm{J}$, and that difference is $-W$.
:::
:::

::: exercise A fourfold compression {#exr-fourfold level=2 check="0.5*8.314462618*400*ln(4)"}
Half a mole of ideal gas is compressed isothermally at $400\,\mathrm{K}$ from pressure $P$ to $4P$. Find $\Delta G$. Does $\Delta F$ differ from $\Delta G$?
::: hint
Use [[#eq-delta-g]]. For the second question, compare $G$ and $F$ on an ideal-gas isotherm, where $PV = nRT$ is unchanged.
:::
::: solution
$$
\Delta G = nRT\ln 4 = 0.500\times R\times 400\times\ln 4 = 200\, R\ln 4.
$$

With $\ln 4 = 2\ln 2 = 1.38629436112$,

$$
\Delta G = 1662.892524\times 1.38629436112 = 2305.26\,\mathrm{J}.
$$

To the nearest joule, $\Delta G = 2305\,\mathrm{J}$. On this isotherm $\Delta(PV) = \Delta(nRT) = 0$, so $\Delta F = \Delta G$. Both equal the reversible work done on the gas. The entropy of the gas falls by $\Delta G/T = 2305.26/400 = 5.763\,\mathrm{J/K}$, which is $nR\ln 4 = \tfrac{1}{2} R\times 2\ln 2 = R\ln 2$.
:::
:::

::: exercise Heat capacities from a Maxwell relation {#exr-cp-cv level=3 check="2*8.314462618"}
Starting from $\left(\pdv{U}{V}\right)_{T} = T\left(\pdv{P}{T}\right)_{V} - P$, show that this derivative vanishes for an ideal gas. Deduce that the extensive heat capacities satisfy $C_P - C_V = nR$, and give the value of $C_P - C_V$ for $2.00\,\mathrm{mol}$ of ideal gas.
::: hint
Write $H = U + PV$ and differentiate with respect to $T$ at fixed $P$. Express $\left(\pdv{U}{T}\right)_{P}$ by the chain rule through $T$ and $V$. For an ideal gas the internal-pressure term cancels $P$, and $\left(\pdv{V}{T}\right)_{P} = nR/P$.
:::
::: solution
The Maxwell relation $\left(\pdv{S}{V}\right)_{T} = \left(\pdv{P}{T}\right)_{V}$ converts [[#eq-du]] into

$$
\left(\pdv{U}{V}\right)_{T} = T\left(\pdv{P}{T}\right)_{V} - P,
$$

which is [[#eq-internal-pressure]]. For an ideal gas $\left(\pdv{P}{T}\right)_{V} = nR/V$ and $P = nRT/V$, so the derivative is zero, as in [[#prop-ideal-u]]. Thus $U = U(T)$ only, and the extensive capacity $C_V = \dd U/\dd T$ is a function of temperature at most.

Now $H = U + PV$, so at fixed pressure

$$
C_P = \left(\pdv{H}{T}\right)_{P} = \left(\pdv{U}{T}\right)_{P} + P\left(\pdv{V}{T}\right)_{P}.
$$

The chain rule at fixed $P$, using $U = U(T, V)$ and then specialising to $U = U(T)$, gives

$$
\left(\pdv{U}{T}\right)_{P} = \left(\pdv{U}{T}\right)_{V} + \left(\pdv{U}{V}\right)_{T}\left(\pdv{V}{T}\right)_{P} = C_V,
$$

the second term dying because the internal pressure is zero. Therefore

$$
C_P - C_V = P\left(\pdv{V}{T}\right)_{P}.
$$

For the ideal gas $V = nRT/P$ and $\left(\pdv{V}{T}\right)_{P} = nR/P$, so $P\cdot nR/P = nR$. Hence $C_P - C_V = nR$. For $2.00\,\mathrm{mol}$,

$$
C_P - C_V = 2R = 16.6289\,\mathrm{J/K}.
$$

The difference is $16.63\,\mathrm{J/K}$ to four figures. It does not depend on temperature while the gas remains ideal. Per mole the same argument is $C_{P,m} - C_{V,m} = R$.
:::
:::

::: exercise A process that may or may not run {#exr-spontaneous level=3 check="-200"}
A closed system is held at fixed volume in contact with a reservoir at $400\,\mathrm{K}$. It passes between two equilibrium states, both at $400\,\mathrm{K}$, with $\Delta U = 1200\,\mathrm{J}$ and $\Delta S = 3.50\,\mathrm{J/K}$. Expansion is the only work mode available. Find $\Delta F$, and decide whether the process can occur on its own.
::: hint
At fixed temperature $\Delta F = \Delta U - T\,\Delta S$. Compare the sign with [[#thm-criteria]]. Fixed volume and expansion-only work set $W = 0$, which is an optional check against $W \ge \Delta F$.
:::
::: solution
The endpoints share one temperature, so

$$
\Delta F = \Delta U - T\,\Delta S = 1200 - 400\times 3.50 = 1200 - 1400 = -200\,\mathrm{J}.
$$

[[#thm-criteria]] says a process at fixed $T$ and $V$ can occur spontaneously when $\Delta F \le 0$. Here $\Delta F = -200\,\mathrm{J}$, so the process is allowed, and it is irreversible: equality would be $\Delta F = 0$. The composite of system and reservoir gains entropy $-\Delta F/T = 0.500\,\mathrm{J/K}$.

As a check on the work bound, $W = 0$ because the volume is fixed and there is no other work. The inequality $W \ge \Delta F$ reads $0 \ge -200\,\mathrm{J}$, which is true. Had $\Delta F$ come out positive, the same fixed-volume constraint would have made the process impossible: you cannot do the positive work on the system that a rise in $F$ would require, because the volume cannot move.
:::
:::
