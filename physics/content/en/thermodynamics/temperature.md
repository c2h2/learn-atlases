A kettle of boiling water and a lump of ice, shut together in an insulated box, do not stay as they were. The ice melts, the hot water cools, and after long enough both are one body of water at one temperature. Nothing in the mechanical ledger of [[mechanics/work-energy]], where the work of the net force equals the change in kinetic energy, names that shared temperature or says which way the energy will move. Joules are still joules. What is missing is a quantity that is the same for two bodies precisely when they have stopped exchanging energy by being hotter or colder than each other. That quantity is temperature.

This chapter makes the definition sharp, then gives the equation of state that turns temperature into a number you can use: the ideal-gas law. Heat capacity comes last, as the response of a body to heat along a named path. The balance between heat and work is the next chapter, [[thermodynamics/first-law]]. Thermal expansion of rods and liquids is a useful way to build a household thermometer, and we will not develop it; a gas at low pressure is a better route to an absolute scale.

Throughout, $T$ in any formula $PV = nRT$ is an absolute temperature in kelvin. A Celsius label is a different number for the same state.

## Thermal equilibrium

Before temperature can label anything, the systems themselves have to be in a settled condition. A system is in **internal equilibrium** when its macroscopic properties — pressure, volume, the reading of a thermometer pushed into it — are not changing with time, and when no internal flow of matter or energy is still running down. Stirring has died out. A slow chemical reaction would disqualify the sample: we set those aside until a later course.

A **diathermal** wall lets two systems exchange energy without exchanging matter. A thin metal plate is a fair laboratory version. An **adiabatic** wall blocks that exchange. The word returns in [[thermodynamics/first-law]] for a process with no heat; here it is a property of a wall. Real insulation leaks. The ideal wall is still the right language, in the way a frictionless surface is the right language for a mechanics problem that later puts friction back.

::: definition Thermal equilibrium {#def-equilibrium}
Two systems are in **thermal equilibrium** when they are separated by a diathermal wall and their macroscopic properties do not change with time. Equivalently, if the wall between them is switched from adiabatic to diathermal and nothing about either system changes, they were already in thermal equilibrium.

The relation is written $A \sim B$. It is a relation between systems that are themselves in internal equilibrium, not between arbitrary lumps of matter in the middle of a change.
:::

Mechanical equilibrium is a different demand: the pressures match, so the piston does not accelerate. Diffusive equilibrium, in which matter has stopped migrating, is a third demand and needs the chemical potential, which belongs later. Two gases can be at the same temperature and at different pressures. Temperature was introduced to name thermal equilibrium alone.

Put a hot copper block into cool water, with only a diathermal boundary between the metal and the water, and both change. The block cools, the water warms, and the changes stop. The final pair is in thermal equilibrium. The same block, wrapped so that the boundary is adiabatic, keeps its temperature while the water keeps a different one. The wall, not a private property of the copper, decides whether equilibrium is required.

## The zeroth law

Suppose system $A$ has been in contact with a reference system $C$ long enough that $A \sim C$, and system $B$ has separately been in contact with the same $C$ long enough that $B \sim C$. If you now put $A$ against $B$, do you need a further experiment, or is the outcome already fixed?

Every thermometer you have ever used bets on the second answer. The column of liquid, or the gas bulb, is $C$. You touch it to $A$, then to $B$, and if it gives the same reading you expect $A$ and $B$ to be in equilibrium with each other. That expectation is not a theorem of mechanics. It is a law of thermal physics, found by experiment, and it is what makes a single temperature scale possible.

::: theorem Zeroth law {#thm-zeroth}
Thermal equilibrium is an equivalence relation on systems in internal equilibrium. It is reflexive and symmetric, and it is transitive:

if $A \sim C$ and $B \sim C$, then $A \sim B$.

Transitivity is the **zeroth law of thermodynamics**. The name is retrospective. The law is logically prior to the assignment of temperature, but it was stated after the first and second laws already had numbers.

::: proof
Symmetry is part of the definition. The sentence "$A$ and $B$ do not change when placed in diathermal contact" does not order the pair, so $A \sim B$ implies $B \sim A$.

Reflexivity uses a partition. Take a system $A$ in internal equilibrium and imagine a diathermal wall drawn through it, dividing it into $A_1$ and $A_2$. Internal equilibrium means those two parts are not changing, so $A_1 \sim A_2$. We read that as $A \sim A$: a system in internal equilibrium is in thermal equilibrium with itself. If a proposed division produced a change, the original system was not in internal equilibrium and was not in the set on which the relation is defined.

Transitivity is the experimental law stated above. It is not deduced from the definition of a diathermal wall. Walls tell you which pairs are allowed to exchange energy. The zeroth law tells you that the resulting equilibrium organises systems into classes rather than into some less tidy relation.

An equivalence relation partitions its set into classes. Write $[A]$ for the class of all systems in thermal equilibrium with $A$. Then $[A] = [B]$ if and only if $A \sim B$, and two distinct classes have no system in common. A **temperature** is a label of such a class.
:::
:::

::: definition Temperature {#def-temperature}
A **temperature** is a label $\theta$ of an equivalence class of thermal equilibrium. The assignment satisfies

$$
\theta(A) = \theta(B) \quad \text{if and only if} \quad A \sim B.
$$ {#eq-temperature}

Any strictly monotonic function of a legitimate $\theta$ is another legitimate labelling. Nothing in [[#thm-zeroth]] by itself picks degrees Celsius, kelvin, or the height of a mercury column. Those choices are extra conventions, fixed by a thermometer and by a scale.
:::

Same label means the two systems are in equilibrium if they are put in diathermal contact. Different labels mean both will change. Temperature is not the energy of the body: a large flask of warm water can hold more internal energy than a small hotter bead, and heat still flows according to the temperatures.

::: intuition One label for a whole class
A thermometer works because of transitivity. The bulb reaches equilibrium with the room, and anything else that would reach equilibrium with that bulb is in the room's class. The number on the scale names the class. Repainting it with a monotonic curve would name the same classes and would spoil every formula, such as the ideal-gas law, that has already committed itself to one labelling.
:::

::: quiz
System $A$ is in thermal equilibrium with a thermometer $C$, and system $B$ is in thermal equilibrium with the same thermometer, with the same reading. Before $A$ is put in contact with $B$, what does the zeroth law give?
- [ ] $A$ must be hotter than $B$, because it was tested first
- [x] $A$ and $B$ are in thermal equilibrium with each other
- [ ] $A$ and $B$ have the same internal energy
- [ ] Nothing, until $A$ and $B$ are actually put in contact and watched
::: solution
[[#thm-zeroth]] is the statement that equilibrium is transitive, so $A \sim C$ and $B \sim C$ already imply $A \sim B$. The test against $C$ is the experiment. A further contact between $A$ and $B$ would be a check of the law, not a missing premise. Equal temperature does not imply equal internal energy: the systems may have different sizes and different constitutions.
:::
:::

## Thermometers and empirical scales

A **thermometric property** is any measurable quantity $X$ that, for a chosen instrument, is constant in a given equivalence class and different in neighbouring classes. The length of a liquid column, the pressure of a gas held at fixed volume, the resistance of a metal wire, and the voltage of a thermocouple are all used. An **empirical temperature** is a scale function $\theta = f(X)$ chosen to be strictly increasing, with a finite number of fixed points used to anchor $f$.

The Celsius scale assigns $0$ to the ice point and $100$ to the steam point and interpolates. Two liquids forced through those two points do not agree in between, because their expansion curves are not the same function of the equivalence class. That disagreement is fatal in a formula where $T$ is meant to be a property of the class alone.

So an empirical scale is allowed by [[#def-temperature]], and it is not yet the $T$ of the ideal-gas law. The repair is to pick a thermometric substance whose behaviour simplifies in a limit you can actually approach, and to define the scale from that limit. The substance is a gas, and the limit is zero pressure.

## The ideal gas

Boyle's measurements, in the second edition of his *New Experiments* (1662), showed that a trapped sample of air satisfied $PV = \text{constant}$ when he held the conditions steady. Reading that product as "at fixed temperature" is later. Charles, and Gay-Lussac in the memoir of 1802, found that gases at fixed pressure expand uniformly on heating. Amontons had already seen the pressure of a confined sample rise with heating. On an absolute scale these are one equation.

::: definition Ideal gas {#def-ideal}
A fixed amount of **ideal gas** is a model fluid whose equilibrium states obey

$$
PV = nRT = N k_B T,
$$ {#eq-ideal}

where $P$ is the absolute pressure, $V$ is the volume, $n$ is the amount of substance in moles, $N$ is the number of molecules, and $T$ is the absolute temperature in kelvin. The gas constant and the Boltzmann constant are

$$
R = 8.314462618\,\mathrm{J\,mol^{-1}\,K^{-1}}, \qquad k_B = 1.380649\times 10^{-23}\,\mathrm{J\,K^{-1}},
$$

and $N = n N_A$ with Avogadro's number $N_A = 6.02214076\times 10^{23}\,\mathrm{mol^{-1}}$. The two constants $k_B$ and $N_A$ are exact in the SI since 2019. Their product rounds to the value of $R$ written above.
:::

[[#eq-ideal]] is an equation of **state**: a constraint on an equilibrium state, not a story of the path between states. For a fixed amount of a simple gas, any two of $P$, $V$ and $T$ may be chosen freely and the third follows. A liquid–vapour mixture has a further constraint. The ideal gas does not.

Amount of substance and mass are related by the molar mass $M$, in kilograms per mole: $n = m/M$, and $N = m N_A/M$. The equation does not mind whether you count moles or molecules. Counting molecules makes the constant $k_B$ rather than $R$, and $k_B T$ is an energy. At $T = 300\,\mathrm{K}$,

$$
k_B T = (1.380649\times 10^{-23})\times 300 = 4.142\times 10^{-21}\,\mathrm{J}.
$$

That is a molecular energy scale. The product $N k_B T = nRT$ is the energy scale times the number of molecules, and [[#eq-ideal]] says it equals $PV$. Why a gas presses on a wall in proportion to that energy is a question for [[thermodynamics/kinetic-theory]]. Here $PV = nRT$ is the law we use.

$P$ and $T$ are **intensive**: they do not change if you consider a larger sample of the same gas in the same condition. $V$, $n$, $N$ and the internal energy are **extensive**: they double when the sample doubles. The ideal-gas law respects that split. Replace $n$ by $\lambda n$ and $V$ by $\lambda V$, and the pressure at the same $T$ is unchanged, because $\lambda$ cancels. A law that failed this test could not have $P$ intensive and $V$ extensive at once.

::: proposition Boyle's law {#prop-boyle}
For a fixed amount of ideal gas at fixed absolute temperature, the product of pressure and volume is constant. Between two equilibrium states

$$
P_1 V_1 = P_2 V_2.
$$ {#eq-boyle}

::: proof
[[#eq-ideal]] gives $PV = nRT$. The right-hand side is the same number in both states when $n$ and $T$ are the same, so the left-hand sides agree. The result is the original Boyle relation, now with the hypothesis "fixed $T$" stated in kelvin rather than left as a laboratory instruction. It is a special case of the equation of state, not a second law.
:::
:::

::: proposition Volume and pressure laws {#prop-charles}
For a fixed amount of ideal gas,

$$
\frac{V_1}{T_1} = \frac{V_2}{T_2} \quad \text{at fixed pressure},
$$ {#eq-charles}

and

$$
\frac{P_1}{T_1} = \frac{P_2}{T_2} \quad \text{at fixed volume}.
$$ {#eq-isochore}

Both equalities use absolute temperature. They are false if $T$ is replaced by a Celsius reading.

::: proof
At fixed $n$ and $P$, [[#eq-ideal]] says $V/T = nR/P$, and the right-hand side does not change between the two states. At fixed $n$ and $V$, $P/T = nR/V$, and that ratio is likewise common to both states. Dividing the two copies of the equation is the whole argument. If someone inserts $t$ in degrees Celsius, the step $V/t = nR/P$ has no basis in [[#def-ideal]], and the arithmetic will not describe the gas.
:::
:::

::: example Two moles in a fixed vessel {#ex-two-mole}
Two moles of ideal gas are held at $T = 300\,\mathrm{K}$ in a volume $V = 0.0500\,\mathrm{m^3}$. Find the pressure. The gas is then warmed to $360\,\mathrm{K}$ at the same volume. Find the new pressure.
::: solution
Use [[#eq-ideal]] with $R = 8.314462618\,\mathrm{J\,mol^{-1}\,K^{-1}}$:

$$
P = \frac{nRT}{V} = \frac{2.00\times 8.314462618\times 300}{0.0500} = 9.977\times 10^{4}\,\mathrm{Pa}.
$$

To three significant figures, in line with the data as written, $P = 9.98\times 10^{4}\,\mathrm{Pa}$. As a check, $PV = nRT$:

$$
nRT = 2.00\times 8.314462618\times 300 = 4.989\times 10^{3}\,\mathrm{J},
$$

and $(9.977\times 10^{4})\times 0.0500$ returns the same $4.989\times 10^{3}\,\mathrm{J}$. The number of molecules is $N = n N_A = 1.204\times 10^{24}$.

Warming at fixed $V$ and $n$ is [[#eq-isochore]]. The pressure scales with the absolute temperature:

$$
\frac{P_2}{P_1} = \frac{360}{300} = 1.200, \qquad P_2 = 1.200\times 9.977\times 10^{4} = 1.197\times 10^{5}\,\mathrm{Pa}.
$$

To three significant figures, $P_2 = 1.20\times 10^{5}\,\mathrm{Pa}$. The factor $1.200$ is exact for these two temperatures; it does not depend on $R$, on $n$, or on $V$. The same factor is $V_2/V_1$ if the warming is done at fixed pressure instead of fixed volume.
:::
:::

::: example A Celsius reading used as if it were kelvin {#ex-celsius}
One mole of ideal gas occupies $0.0240\,\mathrm{m^3}$ at $T = 300\,\mathrm{K}$, which is $26.85^\circ\mathrm{C}$. Someone computes the pressure from [[#eq-ideal]] but inserts $27$ in place of $300$. Find the true pressure and the bogus one, and the factor by which the bogus pressure is low.
::: solution
The true pressure is

$$
P = \frac{(1.00)\times 8.314462618\times 300}{0.0240} = 1.039\times 10^{5}\,\mathrm{Pa}.
$$

The mistaken substitution $T = 27$ produces

$$
P_{\text{wrong}} = \frac{8.314462618\times 27}{0.0240} = 9.354\times 10^{3}\,\mathrm{Pa}.
$$

The ratio of the two calculations is $27/300 = 0.090$. The wrong pressure is eleven times too small, not a rounding error. Adding $273$ at the end of a finished calculation does not repair it, because $T$ sat in the numerator from the start. Convert to kelvin before using [[#eq-ideal]]. The conversion that matches the Celsius scale, as the scale is defined, is $T = t + 273.15$, so $26.85^\circ\mathrm{C}$ is exactly $300.00\,\mathrm{K}$ and $27.00^\circ\mathrm{C}$ is $300.15\,\mathrm{K}$. Using $27$ was not a failed conversion. It was a refusal to convert.
:::
:::

::: widget isotherm
T: 300
caption: Three isotherms of an ideal gas. Change the temperature: the marked point follows the temperature you set, and along one curve the product of pressure and volume stays constant.
:::

Slide the temperature and the marked point moves onto the isotherm you set. Along one curve $PV$ is constant. The widget shows states, not a process. Real air near room temperature is close enough to [[#eq-ideal]] for the arithmetic in this chapter; near liquefaction it is not, and a raw gas-thermometer pressure is not yet $T$.

## The absolute scale

Hold a dilute gas at fixed volume and fixed amount, and [[#eq-isochore]] says $P$ is proportional to $T$. That is the constant-volume gas thermometer. In practice you measure a pressure ratio against a fixed point. On the older definition of the kelvin, the triple point of water was assigned exactly $273.16\,\mathrm{K}$, and an unknown temperature was

$$
T = 273.16\,\mathrm{K}\times \lim_{P_{\mathrm{tp}}\to 0}\frac{P}{P_{\mathrm{tp}}},
$$

the limit being taken at constant volume by using less and less gas in the same bulb. The limit is the whole point. Two real gases, at the same modest pressure, do not give exactly the same ratio $P/P_{\mathrm{tp}}$. As the pressure is lowered, the ratios converge. The ideal-gas temperature is that common limit, not the raw reading of a bulb full of air at atmospheric pressure.

Since 2019 the kelvin has been defined by fixing $k_B$ at the value in [[#def-ideal]], rather than by assigning a numerical temperature to the triple point of water. The Celsius scale is defined from the kelvin by

$$
T = t + 273.15,
$$ {#eq-celsius}

with $t$ in degrees Celsius and $T$ in kelvin. The offset is exact, by the definition of the degree Celsius, and the size of one degree Celsius is the size of one kelvin. Absolute zero is $0\,\mathrm{K}$, which is $-273.15^\circ\mathrm{C}$. The ice point of water is very near $0^\circ\mathrm{C}$ and is no longer part of the definition.

The offset $273.15$ comes from extrapolating $V \propto (t + 273.15)$ at fixed pressure down to $V = 0$. No gas in that plot actually reaches zero volume: it liquefies or solidifies first, and the ideal-gas model has already stopped applying. Absolute zero is not a claim that a cylinder of air can be squeezed to nothing.

William Thomson's scale of 1848 was not this gas extrapolation. It was built from Carnot's theorem so that the degree would not depend on the fluid in the engine. [[thermodynamics/heat-engines]] makes that construction quantitative. The ideal-gas limit agrees with that thermodynamic temperature, which is why [[#eq-ideal]] may use the same $T$ that later appears in a Carnot efficiency. An arbitrary empirical $\theta$ may not.

::: warning Kelvin, not Celsius, and not a raw gas pressure
In $PV = nRT$ the symbol $T$ is absolute temperature in kelvin. Substituting a Celsius reading is not a change of units of the sort that converts centimetres to metres. It is a different function of the equivalence class, and [[#prop-charles]] fails outright. A gas-thermometer pressure is not yet $T$ either, not until the instrument has been calibrated to the ideal-gas limit. At a working pressure the bulb is a real gas, with a small departure from [[#eq-ideal]], and two fillings need not agree.
:::

::: example The slope of an isochore {#ex-slope}
Return to the sample of [[#ex-two-mole]]: $n = 2.00\,\mathrm{mol}$ in $V = 0.0500\,\mathrm{m^3}$. Find $(\partial P/\partial T)_V$, and check it against the pressure rise from $300\,\mathrm{K}$ to $360\,\mathrm{K}$.
::: solution
From [[#eq-ideal]], at fixed $n$ and $V$,

$$
\left(\frac{\partial P}{\partial T}\right)_V = \frac{nR}{V} = \frac{2.00\times 8.314462618}{0.0500} = 332.6\,\mathrm{Pa\,K^{-1}}.
$$

Over a finite warming at fixed volume the slope is constant, so

$$
\Delta P = 332.6\times 60.0 = 1.995\times 10^{4}\,\mathrm{Pa}.
$$

In [[#ex-two-mole]] the two pressures were $9.977\times 10^{4}\,\mathrm{Pa}$ and $1.197\times 10^{5}\,\mathrm{Pa}$. Their difference is $1.995\times 10^{4}\,\mathrm{Pa}$. The match is not a new fact. For this equation of state, $P$ is exactly linear in $T$ on an isochore, so the derivative at one point and the chord between two points are the same number. For a real gas they would not be, and a finite rise $\Delta P/\Delta T$ would only estimate the derivative.
:::
:::

## Partial derivatives on the state surface

The equation of state is a surface. Slopes on that surface are the partial derivatives, and they are related by nothing more than the chain rule. The relation is general; the ideal gas is the example we can compute by hand.

::: proposition Cyclic relation {#prop-cyclic}
Let the equilibrium pressure of a fixed amount of fluid be a continuously differentiable function $P = P(V, T)$ in a region where

$$
\left(\frac{\partial P}{\partial V}\right)_T \neq 0, \qquad \left(\frac{\partial P}{\partial T}\right)_V \neq 0.
$$

Then $V$ may be taken as a function of $T$ at fixed $P$, and $T$ as a function of $P$ at fixed $V$, and

$$
\left(\frac{\partial P}{\partial V}\right)_T \left(\frac{\partial V}{\partial T}\right)_P \left(\frac{\partial T}{\partial P}\right)_V = -1.
$$ {#eq-cyclic}

::: proof
The total differential of $P(V, T)$ is

$$
\dd P = \left(\frac{\partial P}{\partial V}\right)_T \dd V + \left(\frac{\partial P}{\partial T}\right)_V \dd T.
$$

Hold $P$ fixed, so $\dd P = 0$, and solve for the slope of the isobar. The hypothesis $(\partial P/\partial V)_T \neq 0$ lets us divide:

$$
\left(\frac{\partial V}{\partial T}\right)_P = -\frac{(\partial P/\partial T)_V}{(\partial P/\partial V)_T}.
$$

Multiply through by $(\partial P/\partial V)_T$ and then by $(\partial T/\partial P)_V$:

$$
\left(\frac{\partial P}{\partial V}\right)_T \left(\frac{\partial V}{\partial T}\right)_P \left(\frac{\partial T}{\partial P}\right)_V = -\left(\frac{\partial P}{\partial T}\right)_V \left(\frac{\partial T}{\partial P}\right)_V.
$$

At fixed $V$, the map $T \mapsto P(V, T)$ is invertible because its derivative $(\partial P/\partial T)_V$ is not zero. The derivative of an inverse function is the reciprocal, so $(\partial T/\partial P)_V = 1/(\partial P/\partial T)_V$, and the product on the right is $1$. The left-hand side equals $-1$.
:::
:::

For the ideal gas the three factors are elementary, and you can watch the minus sign appear. With $n$ fixed,

$$
\left(\frac{\partial P}{\partial V}\right)_T = -\frac{nRT}{V^2} = -\frac{P}{V}, \qquad \left(\frac{\partial V}{\partial T}\right)_P = \frac{nR}{P} = \frac{V}{T}, \qquad \left(\frac{\partial T}{\partial P}\right)_V = \frac{V}{nR} = \frac{T}{P}.
$$

The product is $(-P/V)(V/T)(T/P) = -1$. The minus sign sits on the isotherm: at fixed temperature, pressure falls as volume rises. The subscript on a partial derivative is part of the symbol. $(\partial P/\partial T)_V$ is not $(\partial P/\partial T)$ with $P$ held fixed, which would be zero.

## Heat capacity

Heat is energy that crosses the boundary because of a temperature difference. It is not a property of a state. A state of the ideal gas in this chapter is a triple $(P, V, T)$ on the surface [[#eq-ideal]], or any two of them. There is no coordinate $Q$ on that surface. Ask "how much heat is in the gas?" and there is no answer inside the theory. Ask "how much heat entered along this path?" and there is.

We write $\delta Q$ for an infinitesimal quantity of heat absorbed **by** the system, and we refuse to write $\dd Q$. The barless $\dd$ is reserved for changes of state functions, such as $\dd T$ and $\dd V$, which depend only on the endpoints of a small step. Heat depends on the path. The sign convention matches the first law that is coming: positive $Q$ is heat absorbed by the system.

::: definition Heat capacity {#def-heat-capacity}
Along a stated path, the **heat capacity** of the system is

$$
C = \frac{\delta Q}{\dd T},
$$ {#eq-heat-cap}

wherever $\dd T \neq 0$. The SI unit is the joule per kelvin. The **molar heat capacity** along the same path is $c = C/n$, and the **specific heat capacity** is $C/m$.

Two paths are named often enough to have subscripts. At constant volume,

$$
C_V = \left(\frac{\delta Q}{\dd T}\right)_V, \qquad c_V = \frac{C_V}{n},
$$

and at constant pressure,

$$
C_P = \left(\frac{\delta Q}{\dd T}\right)_P, \qquad c_P = \frac{C_P}{n}.
$$

If the heat capacity is constant along the path, a finite step of that same path absorbs $Q = C\,\Delta T$. The equality does not survive a change of path.
:::

For an ideal gas there is a relation between the two molar heat capacities,

$$
c_P - c_V = R, \qquad \text{equivalently} \qquad C_P - C_V = nR.
$$ {#eq-mayer-preview}

We state it now so that the symbol $c_P - c_V$ has a value, and we prove it in [[thermodynamics/first-law]], where the proof has a place to stand. The proof uses $\Delta U = Q + W$ with work done on the system taken as positive, and the quasi-static work $W = -\int P\,\dd V$. Nothing in this chapter should be read as $c_P - c_V = -R$, or as a difference of specific heats per kilogram without a molar mass. The $R$ in [[#eq-mayer-preview]] is per mole, the same $R$ as in [[#eq-ideal]].

Why should $C_P$ exceed $C_V$? At constant volume the boundary does not move, so heat that enters stays as internal energy. At constant pressure the gas expands and the work done on it is negative, so more heat is needed for the same rise in $T$. [[thermodynamics/first-law]] turns that story into $C_P - C_V = nR$. Until then, [[#eq-mayer-preview]] is a stated property of the ideal gas, not a definition of either heat capacity.

::: example Heat along a named path {#ex-capacity}
A sample absorbs $1.80\times 10^{3}\,\mathrm{J}$ of heat while its temperature rises by $12.0\,\mathrm{K}$, and the pressure is held constant. Find $C_P$. The sample contains $n = 3.00\,\mathrm{mol}$. Find the molar heat capacity along that path.
::: solution
The path is stated, so [[#eq-heat-cap]] applies in its finite form. Constant heat capacity along the isobar gives

$$
C_P = \frac{Q}{\Delta T} = \frac{1.80\times 10^{3}}{12.0} = 150\,\mathrm{J\,K^{-1}}.
$$

The molar value is

$$
c_P = \frac{C_P}{n} = \frac{150}{3.00} = 50.0\,\mathrm{J\,mol^{-1}\,K^{-1}}.
$$

This number is not $c_V$, and it is not $R$. If the same sample were warmed by $12.0\,\mathrm{K}$ at constant volume, $Q$ would be different and so would $C$. The data given here do not determine that other heat. They determine the isobaric one.
:::
:::

::: quiz
A student says: "The heat capacity of this gas is $20\,\mathrm{J\,K^{-1}}$, so any process that raises its temperature by $5\,\mathrm{K}$ absorbs $100\,\mathrm{J}$." What is wrong?
- [ ] Heat capacity is not allowed to be as small as $20\,\mathrm{J\,K^{-1}}$
- [ ] The temperature rise must be written in Celsius before multiplying
- [x] A heat capacity belongs to a path; $Q = C\,\Delta T$ is for that path only
- [ ] Heat absorbed is $C/\Delta T$, not $C\,\Delta T$
::: solution
[[#def-heat-capacity]] puts the path into the definition. The value $20\,\mathrm{J\,K^{-1}}$ might be $C_V$, or $C_P$, or the heat capacity along some other curve. Multiplying by $5\,\mathrm{K}$ recovers the heat only for a process that follows the same path. The Celsius and kelvin scales have intervals of equal size, so a *rise* of $5\,\mathrm{K}$ is a rise of $5$ degrees Celsius; that part of the arithmetic is harmless. The formula $Q = C\,\Delta T$ has $C$ in the numerator's role, not the denominator's. The size $20\,\mathrm{J\,K^{-1}}$ is a possible heat capacity for a small sample and is not the error.
:::
:::

## Where this leads

The ideal-gas law fixes equilibrium states. It does not say how the energy changes between them. That balance is [[thermodynamics/first-law]]: $\Delta U = Q + W$, with $W$ the work done on the system, and the proof that $c_P - c_V = R$. [[thermodynamics/kinetic-theory]] reads the same law as a statement about molecular kinetic energy, with $k_B$ the conversion between the two languages. [[thermodynamics/heat-engines]] needs the absolute scale for a different reason: the Carnot efficiency $1 - T_c/T_h$ is false if the temperatures are Celsius. Entropy later divides a heat by this same $T$.

::: history Boyle’s air and Thomson’s scale
The second edition of Robert Boyle’s *New Experiments* (1662) reported, following a suggestion from Richard Towneley and Henry Power, that the pressure of a confined sample of air falls in inverse proportion to the volume when the sample is kept under steady conditions. Reading the product $PV$ as "constant at fixed temperature" uses a distinction Boyle did not yet have a scale for. The uniform expansion of gases on heating is associated with Jacques Charles and was published by Joseph Louis Gay-Lussac in 1802, with credit to Charles. In 1848 William Thomson proposed an absolute thermometric scale founded on Carnot’s theory of the motive power of heat, so that the degree would not depend on the fluid inside the instrument. That paper is the origin of the absolute scale. The kelvin is named for him. Since the 2019 revision of the SI, the kelvin has been defined by fixing the Boltzmann constant at $1.380649\times 10^{-23}\,\mathrm{J\,K^{-1}}$, rather than by declaring the triple point of water to be exactly $273.16\,\mathrm{K}$.
:::

::: summary
- Thermal equilibrium is the relation "$A$ does not change $B$, nor $B$ change $A$, across a diathermal wall". [[#thm-zeroth]] states that the relation is an equivalence, and temperature is a label of an equivalence class.
- An empirical scale built from one liquid's expansion is a legal labelling and is not the $T$ in the ideal-gas law. Different empirical thermometers disagree away from their fixed points.
- A fixed amount of ideal gas obeys $PV = nRT = N k_B T$, with $T$ in kelvin. Boyle's law is the isotherm $P_1 V_1 = P_2 V_2$. At fixed pressure $V/T$ is constant; at fixed volume $P/T$ is constant.
- $P$ and $T$ are intensive, $V$ and $n$ are extensive, and $PV = nRT$ is consistent with that split.
- The constant-volume gas thermometer measures a pressure ratio. The reading is the ideal-gas temperature only in the low-pressure limit. Since 2019 the kelvin has been defined by fixing $k_B$. By definition $T = t + 273.15$.
- On a state surface, $(\partial P/\partial V)_T\,(\partial V/\partial T)_P\,(\partial T/\partial P)_V = -1$, provided the two partial derivatives of $P$ that appear in the hypotheses are not zero.
- Heat capacity is $C = \delta Q/\dd T$ along a stated path. $Q = C\,\Delta T$ does not transfer from one path to another. For an ideal gas, $c_P - c_V = R$ per mole; the proof is in the next chapter and uses $\Delta U = Q + W$.
- Absolute zero is $0\,\mathrm{K}$. It is not a state in which a real gas has been observed to occupy zero volume.
:::

## Exercises

::: exercise A pressure ratio on an isochore {#exr-ratio level=1 check="6/5"}
A fixed amount of ideal gas is sealed in a rigid vessel. The absolute temperature changes from $250\,\mathrm{K}$ to $300\,\mathrm{K}$. Find $P_2/P_1$.
::: solution
The volume and the amount are fixed, so [[#eq-isochore]] gives

$$
\frac{P_2}{P_1} = \frac{T_2}{T_1} = \frac{300}{250} = \frac{6}{5} = 1.20.
$$

The value of $V$, the value of $n$, and the value of $R$ cancel. They would be needed only if the question asked for $P_2$ in pascals. The temperatures are already in kelvin. A ratio of Celsius readings, $27/(-23)$ or any similar substitution, is not this calculation.
:::
:::

::: exercise Celsius into kelvin {#exr-convert level=1 check="373.15"}
Express $100^\circ\mathrm{C}$ as an absolute temperature in kelvin.
::: solution
[[#eq-celsius]] is the definition of the relationship between the two scales:

$$
T = t + 273.15 = 100 + 273.15 = 373.15\,\mathrm{K}.
$$

The steam point is no longer needed to define the scale, but the arithmetic conversion remains exact. A temperature *difference* of $100$ degrees Celsius is $100\,\mathrm{K}$, because the offset cancels in a difference. This exercise asks for the temperature itself, so the offset stays.
:::
:::

::: exercise A volume ratio on an isobar {#exr-charles level=1 check="0.005"}
An ideal gas is held at constant pressure. At $T_1 = 280\,\mathrm{K}$ its volume is $V_1 = 0.00400\,\mathrm{m^3}$. Find the volume at $T_2 = 350\,\mathrm{K}$.
::: solution
[[#prop-charles]] gives $V_2 = V_1\, T_2/T_1$:

$$
V_2 = 0.00400\times \frac{350}{280} = 0.00400\times 1.25 = 0.00500\,\mathrm{m^3}.
$$

The fraction $350/280$ reduces to $5/4$, so the fourth decimal is exact, not a rounding. The pressure never enters. If the pressure had also changed, one application of [[#eq-ideal]] at each endpoint would be required, and this one-line scaling would be wrong.
:::
:::

::: exercise Boyle, with both volumes given {#exr-boyle level=2 check="400000"}
An ideal gas is compressed isothermally from $V_1 = 0.0400\,\mathrm{m^3}$ to $V_2 = 0.0150\,\mathrm{m^3}$. The initial pressure is $P_1 = 1.50\times 10^{5}\,\mathrm{Pa}$. Find $P_2$.
::: solution
Temperature and amount are fixed, so [[#eq-boyle]] applies:

$$
P_2 = P_1\frac{V_1}{V_2} = (1.50\times 10^{5})\times \frac{0.0400}{0.0150} = (1.50\times 10^{5})\times \frac{8}{3} = 4.00\times 10^{5}\,\mathrm{Pa}.
$$

The compression is by a factor $8/3$ in volume, so the pressure rises by the same factor. No value of $T$ is required. If you want it, $T = P_1 V_1/(nR)$ still needs $n$, which is not given and not needed for $P_2$.
:::
:::

::: exercise Heat capacity from a measured heat {#exr-cpath level=2 check="400"}
Along a stated path, a sample absorbs $Q = 2.40\times 10^{3}\,\mathrm{J}$ and its temperature rises by $\Delta T = 6.00\,\mathrm{K}$. The heat capacity along that path is constant. Find it.
::: solution
[[#def-heat-capacity]] in finite form, with $C$ constant on the path, is $Q = C\,\Delta T$, so

$$
C = \frac{2.40\times 10^{3}}{6.00} = 400\,\mathrm{J\,K^{-1}}.
$$

The number is the heat capacity of this sample along this path. It is not automatically $C_V$ or $C_P$ unless the path was an isochore or an isobar. The problem says the path was stated to the experimenter; it does not say which path it was, and the arithmetic does not need the name.
:::
:::

::: exercise Two vessels and a stopcock {#exr-stopcock level=2 check="120000"}
A vessel of volume $V_A = 0.0200\,\mathrm{m^3}$ holds ideal gas at pressure $P_A = 3.00\times 10^{5}\,\mathrm{Pa}$. It is connected by a closed stopcock to an evacuated vessel of volume $V_B = 0.0300\,\mathrm{m^3}$. The stopcock is opened, and the temperature of the whole arrangement is the same at the end as at the start. Find the final pressure.
::: solution
No gas is added or removed, and $T$ returns to its original value, so $nT$ is the same in [[#eq-ideal]] at the two ends. Therefore $P V$ is the same:

$$
P_A V_A = P_f (V_A + V_B).
$$

The second vessel contributes volume and no initial $PV$, because it was evacuated. Hence

$$
P_f = P_A \frac{V_A}{V_A + V_B} = (3.00\times 10^{5})\times \frac{0.0200}{0.0500} = (3.00\times 10^{5})\times 0.400 = 1.20\times 10^{5}\,\mathrm{Pa}.
$$

The argument uses [[#eq-ideal]] at the endpoints only. While the gas streams through the stopcock it is not one equilibrium state. The energy account of that rush is a free expansion, in [[thermodynamics/first-law]].
:::
:::

::: exercise The cyclic product, computed rather than quoted {#exr-cyclic level=3}
For a fixed amount of ideal gas, compute $(\partial P/\partial V)_T$, $(\partial V/\partial T)_P$ and $(\partial T/\partial P)_V$ from [[#eq-ideal]], multiply them, and confirm that the product is $-1$. State where you use $T \neq 0$ and $V \neq 0$.
::: hint
Write $P = nRT/V$, $V = nRT/P$ and $T = PV/(nR)$, and differentiate each with the subscript variable held fixed. Cancel before you multiply, and the three factors collapse.
:::
::: solution
With $n$ and $R$ constant,

$$
\left(\frac{\partial P}{\partial V}\right)_T = -\frac{nRT}{V^2} = -\frac{P}{V},
$$

which uses $V \neq 0$ to form $P/V$, and uses the ideal-gas expression $nRT/V^2 = P/V$. Next

$$
\left(\frac{\partial V}{\partial T}\right)_P = \frac{nR}{P} = \frac{V}{T},
$$

which uses $T \neq 0$ when it is written as $V/T$, and uses $P \neq 0$ to differentiate $V = nRT/P$. From $T = PV/(nR)$,

$$
\left(\frac{\partial T}{\partial P}\right)_V = \frac{V}{nR} = \frac{T}{P}.
$$

The product is

$$
\left(-\frac{P}{V}\right)\left(\frac{V}{T}\right)\left(\frac{T}{P}\right) = -1,
$$

provided every cancellation is legal, that is $P \neq 0$, $V \neq 0$ and $T \neq 0$. Those states are outside the region where the ideal-gas model is used as a thermometer in any case. The minus sign comes only from the isotherm: at fixed temperature, pressure falls as volume rises. This is the ideal-gas case of [[#prop-cyclic]], with the three factors written out instead of being left inside the general argument.
:::
:::

::: exercise A constant-volume thermometer {#exr-thermo level=3 check="273.15*6/5"}
In the ideal-gas limit, a constant-volume gas thermometer reads $P_1 = 2.50\times 10^{4}\,\mathrm{Pa}$ at the temperature $273.15\,\mathrm{K}$. At the unknown temperature the pressure is $P_2 = 3.00\times 10^{4}\,\mathrm{Pa}$, in the same limit, at the same volume and the same amount of gas. Find the unknown temperature.
::: hint
On an isochore of an ideal gas, pressure is proportional to absolute temperature. The constant of proportionality cancels in the ratio $P_2/P_1$.
:::
::: solution
[[#eq-isochore]] says $T_2 = T_1 (P_2/P_1)$. The pressures are already the ideal-gas-limit values, so no further extrapolation is required of you:

$$
\frac{P_2}{P_1} = \frac{3.00\times 10^{4}}{2.50\times 10^{4}} = \frac{3}{2.5} = 1.20 = \frac{6}{5},
$$

$$
T_2 = 273.15\times \frac{6}{5} = 327.78\,\mathrm{K}.
$$

In Celsius that is $327.78 - 273.15 = 54.63^\circ\mathrm{C}$, which the problem did not ask for. If these pressures had been raw readings at atmospheric density rather than limit values, [[#def-ideal]] would not entitle you to call $327.78\,\mathrm{K}$ the thermodynamic temperature. The hypothesis that the limit has already been taken is what makes the proportion exact.
:::
:::
