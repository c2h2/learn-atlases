Pump up a bicycle tyre on a cold morning and ride it in the afternoon sun: the tyre is harder, although nothing has been added to it. Squeeze a sealed syringe of air and it pushes back harder the further you push. Take the same syringe into a freezer and the plunger creeps in. Every one of these observations involves the same four quantities — pressure, volume, temperature and amount of gas — and, astonishingly, the relation between them hardly depends on *which* gas is in the tyre. Air, hydrogen, helium and carbon dioxide behave, to within a few per cent at ordinary conditions, in exactly the same way. Solids and liquids have densities that are properties of the substance; gases have densities that are properties mainly of the conditions.

This chapter states that common behaviour as the ideal gas equation, $pV = nRT$, and then asks why it is true. The answer, the kinetic theory of gases, pictures a gas as a swarm of tiny particles in rapid random motion, and it turns pressure into molecular collisions and temperature into molecular kinetic energy. Finally we see where the picture fails — at high pressure and low temperature, where real molecules occupy space and attract each other — and how van der Waals repaired it. Along the way the gas equation joins the stoichiometry of [[general-chemistry-1/stoichiometry]]: an amount of gas becomes a volume you can read off a syringe.

The constant used throughout is $R = 8.314\ \mathrm{J\,K^{-1}\,mol^{-1}}$, which is also $8.314\ \mathrm{kPa\,dm^3\,K^{-1}\,mol^{-1}}$ and $0.08314\ \mathrm{bar\,dm^3\,K^{-1}\,mol^{-1}}$. Temperatures in every gas formula are thermodynamic temperatures in kelvin, $T/\mathrm{K} = \theta/^\circ\mathrm{C} + 273.15$, as in [[general-chemistry-1/matter-measurement]].

## Pressure

A gas fills its container and pushes on every wall. The push per unit area is the pressure.

::: definition Pressure and its units {#def-pressure}
The **pressure** $p$ exerted by a gas on a surface is the force normal to the surface divided by its area,

$$
p = \frac{F}{A}.
$$

The SI unit is the pascal, $1\ \mathrm{Pa} = 1\ \mathrm{N\,m^{-2}}$. Other units in common use are

| unit | value in pascals | status |
|---|---|---|
| bar | $10^{5}\ \mathrm{Pa}$ exactly | standard pressure $p^\circ = 1\ \mathrm{bar}$ |
| standard atmosphere, atm | $101\,325\ \mathrm{Pa}$ exactly | the older standard |
| torr, Torr | $101\,325/760\ \mathrm{Pa} \approx 133.322\ \mathrm{Pa}$ | $1\ \mathrm{atm} = 760\ \mathrm{Torr}$ |
| millimetre of mercury, mmHg | $133.322\ \mathrm{Pa}$ | equal to the torr within $10^{-6}$ |

For chemical purposes a kilopascal is a convenient size: atmospheric pressure at sea level is about $101\ \mathrm{kPa}$.
:::

The old units come from the instrument that first measured atmospheric pressure. A glass tube, closed at the top and filled with mercury, is inverted into a dish of mercury. The column falls until its weight per unit area equals the pressure of the atmosphere on the open dish, leaving a near-vacuum above it. A column of height $h$ and density $\rho$ exerts $p = \rho g h$ at its base, because the weight of the column, $\rho A h g$, is spread over area $A$. With $\rho = 13.5951\ \mathrm{g\,cm^{-3}} = 13\,595.1\ \mathrm{kg\,m^{-3}}$ (mercury at $0\ ^\circ\mathrm{C}$) and $g = 9.80665\ \mathrm{m\,s^{-2}}$, a column of $0.760\ \mathrm{m}$ gives

$$
p = 13\,595.1 \times 9.80665 \times 0.760\ \mathrm{Pa} = 101\,325\ \mathrm{Pa},
$$

which is how the atmosphere and the $760\ \mathrm{mmHg}$ were tied together. Mercury is used because it is dense; a water barometer would need a column more than ten metres tall. Mercury is also toxic, and its vapour is the hazard, so mercury instruments have largely been replaced by electronic sensors.

## The empirical gas laws

Three experimental relations were found separately, each holding two of the four variables fixed.

::: proposition Boyle's, Charles's and Avogadro's laws {#prop-gas-laws}
For a gas at low pressure:

- **Boyle's law.** At fixed temperature and amount, the volume is inversely proportional to the pressure: $pV = \text{constant}$, so $p_1V_1 = p_2V_2$.
- **Charles's law.** At fixed pressure and amount, the volume is proportional to the thermodynamic temperature: $V/T = \text{constant}$, so $V_1/T_1 = V_2/T_2$. The corresponding law at fixed volume, $p/T = \text{constant}$, is often credited to Gay-Lussac (or Amontons).
- **Avogadro's principle.** At fixed temperature and pressure, the volume is proportional to the amount of gas: $V/n = \text{constant}$, the same constant for every gas. Equal volumes of gases at the same temperature and pressure contain equal numbers of molecules.

These are *limiting laws*: they become more exact as the pressure falls, and every real gas deviates from them at high pressure or near its condensation temperature.
:::

Charles's law has a striking consequence. Plot the volume of a gas at constant pressure against Celsius temperature, and the straight line, extrapolated downward, reaches zero volume at about $-273\ ^\circ\mathrm{C}$, whichever gas you started with. No gas actually reaches zero volume — every one condenses first — but the common intercept defines a natural zero of temperature. The kelvin scale puts its zero there, which is why the gas laws are proportionalities only when $T$ is in kelvin. In Celsius, doubling "$20\ ^\circ\mathrm{C}$" to "$40\ ^\circ\mathrm{C}$" raises the volume by only $20/293.15$, about $7\%$.

## The ideal gas equation

The three laws combine into one equation of state.

::: proposition The ideal gas equation {#prop-ideal-gas}
For an amount $n$ of a gas at pressure $p$, volume $V$ and thermodynamic temperature $T$,

$$
pV = nRT,
$$ {#eq-ideal}

where $R = 8.314\ \mathrm{J\,K^{-1}\,mol^{-1}}$ is the molar gas constant. A gas that obeys this equation exactly at all conditions is a **perfect** or **ideal gas**. Real gases obey it in the limit $p \to 0$, and to within about one per cent for common gases near room temperature and $1\ \mathrm{bar}$. For a fixed amount it gives the **combined gas law** $p_1V_1/T_1 = p_2V_2/T_2$.
:::

::: proof Combining the three laws
Boyle's law says $V \propto 1/p$ at fixed $T$ and $n$; Charles's law says $V \propto T$ at fixed $p$ and $n$; Avogadro's principle says $V \propto n$ at fixed $p$ and $T$. A function of three variables that is separately proportional to $1/p$, to $T$ and to $n$ must be of the form

$$
V = (\text{constant}) \times \frac{nT}{p}.
$$

To see this, change the variables one at a time from a reference state $(p_0, T_0, n_0, V_0)$: changing $p$ multiplies $V$ by $p_0/p$, then changing $T$ multiplies it by $T/T_0$, then changing $n$ multiplies it by $n/n_0$, so $V = V_0\,(p_0/p)(T/T_0)(n/n_0) = (p_0V_0/n_0T_0)\,nT/p$. Avogadro's principle says that $V_0$ is the same for every gas at given $p_0$, $T_0$ and $n_0$, so the constant $p_0V_0/(n_0T_0)$ is universal. Calling it $R$ gives $pV = nRT$. Its value is fixed by measurement: one mole of gas at $273.15\ \mathrm{K}$ and $100\ \mathrm{kPa}$ occupies $22.71\ \mathrm{dm^3}$ in the low-pressure limit, and $R = (10^{5}\ \mathrm{Pa})(22.71\times 10^{-3}\ \mathrm{m^3})/(1\ \mathrm{mol} \times 273.15\ \mathrm{K}) = 8.314\ \mathrm{J\,K^{-1}\,mol^{-1}}$. For a fixed amount, $pV/T = nR$ is constant, which is the combined gas law.
:::

The **molar volume** $V_\mathrm{m} = V/n = RT/p$ is the same for every ideal gas at a given temperature and pressure. Two reference conditions are in common use, and they must not be mixed up. *Standard temperature and pressure* (STP), in the current IUPAC definition, is $273.15\ \mathrm{K}$ and $10^{5}\ \mathrm{Pa}$, where $V_\mathrm{m} = 22.71\ \mathrm{dm^3\,mol^{-1}}$. *Standard ambient temperature and pressure* (SATP) is $298.15\ \mathrm{K}$ and $1\ \mathrm{bar}$, where $V_\mathrm{m} = 24.79\ \mathrm{dm^3\,mol^{-1}}$. Many older books define STP with $1\ \mathrm{atm}$ instead, giving $22.41\ \mathrm{dm^3\,mol^{-1}}$. When a problem quotes a molar volume, check which conditions it belongs to.

::: example Compressing and heating a sample {#ex-combined}
A syringe holds $500.0\ \mathrm{cm^3}$ of air at $25.0\ ^\circ\mathrm{C}$ and $1.000\ \mathrm{bar}$. It is sealed, compressed to $200.0\ \mathrm{cm^3}$, and warmed to $100.0\ ^\circ\mathrm{C}$. Assuming ideal behaviour, find the final pressure.
::: solution
The amount of gas is fixed, so the combined gas law applies: $p_2 = p_1 (V_1/V_2)(T_2/T_1)$. Convert both temperatures to kelvin first: $T_1 = 298.15\ \mathrm{K}$ and $T_2 = 373.15\ \mathrm{K}$. Then

$$
p_2 = 1.000\ \mathrm{bar} \times \frac{500.0}{200.0} \times \frac{373.15}{298.15} = 1.000 \times 2.500 \times 1.2516\ \mathrm{bar} = 3.129\ \mathrm{bar}.
$$

The volumes enter only as a ratio, so cubic centimetres need not be converted. The temperatures do not enter as a ratio of Celsius values: using $100.0/25.0 = 4$ would have predicted $10.0\ \mathrm{bar}$, more than three times too much. The compression alone multiplies the pressure by $2.5$ and the heating by a further $1.25$. Syringes and glassware are not pressure vessels; this is a calculation, not an experiment to try.
:::
:::

::: widget plot
f: 8.314*t/x; 8.314*t/(x - 0.04267) - 364.0/x^2
x: 0.05, 1
y: 0, 20000
sliders: t=300:200:600:5
labels: \text{ideal gas}; \text{van der Waals, }\mathrm{CO_2}
caption: Isotherms of one mole of gas: pressure $p$ in kilopascals against volume $V$ in cubic decimetres at temperature $t$ (kelvin, slider). The first curve is the ideal gas, $p = RT/V$, a rectangular hyperbola (Boyle's law). The second is the van der Waals equation with the constants of carbon dioxide (see [[#prop-vdw]]). At large volume the two agree; at small volume the real gas falls below the ideal one, because of attractions. Lower the temperature below about $304\ \mathrm{K}$ and the van der Waals curve develops a wiggle: that is the region where real carbon dioxide condenses to a liquid, which the ideal gas never does.
:::

The ideal gas equation is also a way of finding a molar mass. Writing $n = m/M$ and the density $\rho = m/V$ into $pV = nRT$ gives

$$
M = \frac{\rho RT}{p},
$$

so a measurement of the density of a gas at known temperature and pressure gives its molar mass, without knowing the formula. This was, historically, one of the main routes to molecular formulas.

::: example Molar mass from a gas density {#ex-density}
A gas has density $1.250\ \mathrm{g\,dm^{-3}}$ at $0\ ^\circ\mathrm{C}$ and $101.325\ \mathrm{kPa}$. Find its molar mass, and suggest what it might be.
::: solution
With $T = 273.15\ \mathrm{K}$ and $R = 8.314\ \mathrm{kPa\,dm^3\,K^{-1}\,mol^{-1}}$,

$$
M = \frac{\rho RT}{p} = \frac{1.250\ \mathrm{g\,dm^{-3}} \times 8.314\ \mathrm{kPa\,dm^3\,K^{-1}\,mol^{-1}} \times 273.15\ \mathrm{K}}{101.325\ \mathrm{kPa}} = 28.02\ \mathrm{g\,mol^{-1}}.
$$

The units cancel to $\mathrm{g\,mol^{-1}}$, which is a check that the right $R$ was used. Nitrogen ($28.014$), carbon monoxide ($28.010$) and ethene ($28.054\ \mathrm{g\,mol^{-1}}$) all fit; the density alone, to four significant figures, cannot distinguish nitrogen from carbon monoxide. A chemical test, or a spectrum, has to finish the identification.
:::
:::

### Gases in stoichiometry

The ideal gas equation adds a third way of obtaining an amount of substance, beside $n = m/M$ and $n = cV$: for a gas, $n = pV/(RT)$. Stoichiometric calculations involving gases simply use it at the beginning or the end of the usual chain.

::: example The volume of hydrogen from zinc {#ex-hydrogen}
In an exercise of [[general-chemistry-1/stoichiometry]], hydrochloric acid was the limiting reagent in $\mathrm{Zn(s) + 2\,HCl(aq) \rightarrow ZnCl_2(aq) + H_2(g)}$ and produced $0.0250\ \mathrm{mol}$ of hydrogen. What volume does this hydrogen occupy at $25.0\ ^\circ\mathrm{C}$ and $1.000\ \mathrm{bar}$? If instead the gas is collected over water at $25.0\ ^\circ\mathrm{C}$ in a tube whose total pressure is $101.3\ \mathrm{kPa}$, and $250.0\ \mathrm{cm^3}$ is collected, what amount of hydrogen has been caught? The vapour pressure of water at $25.0\ ^\circ\mathrm{C}$ is $3.17\ \mathrm{kPa}$.
::: solution
For the dry gas, $V = nRT/p = 0.0250 \times 8.314 \times 298.15/100.0\ \mathrm{dm^3} = 0.620\ \mathrm{dm^3}$, using $p = 1.000\ \mathrm{bar} = 100.0\ \mathrm{kPa}$ and the kilopascal form of $R$. That is $620\ \mathrm{cm^3}$, and the same answer comes from the molar volume: $0.0250 \times 24.79\ \mathrm{dm^3}$.

Gas collected over water is not pure hydrogen. It is saturated with water vapour, and the measured total pressure is the sum of two partial pressures (Dalton's law, defined below). The hydrogen's share is $p(\mathrm{H_2}) = 101.3 - 3.17 = 98.13\ \mathrm{kPa}$. Then

$$
n(\mathrm{H_2}) = \frac{p(\mathrm{H_2})V}{RT} = \frac{98.13\ \mathrm{kPa} \times 0.2500\ \mathrm{dm^3}}{8.314\ \mathrm{kPa\,dm^3\,K^{-1}\,mol^{-1}} \times 298.15\ \mathrm{K}} = 9.90\times 10^{-3}\ \mathrm{mol}.
$$

Ignoring the water vapour would have given $1.02\times 10^{-2}\ \mathrm{mol}$, an error of about $3\%$ — more than the precision of the measurement. Hydrogen is extremely flammable and forms explosive mixtures with air; generating and collecting it is a supervised experiment with a risk assessment, and the numbers here are not a procedure.
:::
:::

## Mixtures of gases: partial pressures

In a mixture of ideal gases each component behaves as if it were alone in the container. Air is the everyday case: about $78.08\%$ nitrogen, $20.95\%$ oxygen and $0.93\%$ argon by amount, in the dry atmosphere, with traces of carbon dioxide and other gases.

::: definition Partial pressure and Dalton's law {#def-partial}
The **mole fraction** of component $\mathrm{J}$ in a mixture is $x_\mathrm{J} = n_\mathrm{J}/n$, where $n$ is the total amount; the mole fractions add up to $1$. The **partial pressure** of $\mathrm{J}$ is

$$
p_\mathrm{J} = x_\mathrm{J}\,p,
$$

where $p$ is the total pressure. **Dalton's law** states that for a mixture of ideal gases the partial pressure of each component equals the pressure it would exert if it alone occupied the whole volume, $p_\mathrm{J} = n_\mathrm{J}RT/V$, and that the total pressure is the sum of the partial pressures, $p = p_\mathrm{A} + p_\mathrm{B} + \cdots$. The definition $p_\mathrm{J} = x_\mathrm{J}p$ applies to any mixture; the statement that $p_\mathrm{J}$ equals the pressure of $\mathrm{J}$ alone is exact only for ideal gases.
:::

Both statements follow from the ideal gas equation, which does not care what the molecules are: the total pressure is $nRT/V = (n_\mathrm{A} + n_\mathrm{B} + \cdots)RT/V$, and each term is the pressure of one component on its own. For dry air at $101.325\ \mathrm{kPa}$, the partial pressure of oxygen is $0.2095 \times 101.325 = 21.2\ \mathrm{kPa}$. That number, not the percentage, is what governs how fast oxygen dissolves in blood or water. At the top of a high mountain the percentage of oxygen is the same, but the total pressure, and with it the partial pressure, is much lower.

## The kinetic theory of gases

Why should every gas obey the same law? The kinetic model answers with a deliberately crude picture of what a gas is.

::: definition The kinetic model of a gas {#def-kinetic}
The **kinetic model** assumes that:

1. a gas consists of molecules of mass $m$ in ceaseless random motion;
2. the size of the molecules is negligible compared with the average distance between them;
3. the molecules do not interact except in brief collisions with each other and with the walls, and those collisions are elastic (total translational kinetic energy is conserved).

The **root-mean-square speed** is $u_\mathrm{rms} = \sqrt{\langle u^2\rangle}$, the square root of the average of the squared speed.
:::

::: proposition Pressure from molecular motion {#prop-kinetic}
For $N$ molecules of mass $m$ in a volume $V$, the kinetic model gives

$$
pV = \tfrac{1}{3} N m \langle u^2\rangle.
$$ {#eq-kinetic}

Comparing with $pV = nRT$, and writing $N = nN_\mathrm{A}$ and $M = mN_\mathrm{A}$, the average translational kinetic energy per mole is $\tfrac{1}{2}M\langle u^2\rangle = \tfrac{3}{2}RT$, and

$$
u_\mathrm{rms} = \sqrt{\frac{3RT}{M}},
$$

with $M$ in $\mathrm{kg\,mol^{-1}}$. Temperature is a measure of the average translational kinetic energy of the molecules, and that energy depends on the temperature only, not on the identity of the gas.
:::

::: proof
Put the gas in a cubic box of side $L$, so $V = L^{3}$. Follow one molecule with velocity components $(u_x, u_y, u_z)$. When it strikes the wall perpendicular to $x$, an elastic collision reverses $u_x$, so its momentum changes by $2mu_x$ and the wall receives an impulse $2mu_x$. The molecule crosses the box and back, a distance $2L$, before it strikes the same wall again, which takes time $2L/u_x$. The average force it exerts on that wall is impulse divided by time between impacts:

$$
F_1 = \frac{2mu_x}{2L/u_x} = \frac{mu_x^{2}}{L}.
$$

Collisions with other molecules only exchange momentum among them and do not change the average. Summing over all $N$ molecules, the total force is $F = (m/L)\sum u_x^{2} = (Nm/L)\langle u_x^{2}\rangle$, and the pressure is $p = F/L^{2} = Nm\langle u_x^{2}\rangle/V$. The motion is random, so no direction is special: $\langle u_x^{2}\rangle = \langle u_y^{2}\rangle = \langle u_z^{2}\rangle$, and since $u^{2} = u_x^{2} + u_y^{2} + u_z^{2}$, each is $\tfrac13\langle u^{2}\rangle$. Hence $pV = \tfrac13 Nm\langle u^{2}\rangle$.

With $N = nN_\mathrm{A}$ and $mN_\mathrm{A} = M$ this reads $pV = \tfrac13 nM\langle u^{2}\rangle$. Equating to $nRT$ gives $M\langle u^{2}\rangle = 3RT$, so $\tfrac12 M\langle u^{2}\rangle = \tfrac32 RT$ and $u_\mathrm{rms} = (3RT/M)^{1/2}$. The cubic box was a convenience: the result depends only on the volume.
:::

The proof explains Boyle's law (at fixed $T$ the molecules move at fixed average speed, and squeezing them into a smaller box makes them hit the walls more often) and Charles's law (at fixed $p$, faster molecules need more room to keep the wall-collision rate down). It also explains a fact used in [[general-chemistry-1/thermochemistry]]: in a perfect gas of atoms the only energy is the kinetic energy of the molecules, $\tfrac32 RT$ per mole, so the internal energy of a perfect gas depends on temperature alone. Molecules can also rotate and vibrate, which adds to the energy but keeps the dependence on $T$ only; changing the volume at fixed temperature changes nothing, because in the model the molecules do not interact. At $298.15\ \mathrm{K}$ the translational kinetic energy is $\tfrac32 \times 8.314 \times 298.15 = 3718\ \mathrm{J\,mol^{-1}}$, about $3.7\ \mathrm{kJ\,mol^{-1}}$ — small beside a bond energy of several hundred kilojoules per mole, which is why molecules at room temperature collide without breaking.

::: example How fast are air molecules? {#ex-urms}
Find the root-mean-square speed of nitrogen molecules ($M = 28.014\ \mathrm{g\,mol^{-1}}$) and hydrogen molecules ($M = 2.016\ \mathrm{g\,mol^{-1}}$) at $25.0\ ^\circ\mathrm{C}$.
::: solution
Convert the molar mass to SI units, $M(\mathrm{N_2}) = 0.028014\ \mathrm{kg\,mol^{-1}}$, so that the joules ($\mathrm{kg\,m^2\,s^{-2}}$) in $R$ produce metres per second:

$$
u_\mathrm{rms}(\mathrm{N_2}) = \sqrt{\frac{3 \times 8.314\ \mathrm{J\,K^{-1}\,mol^{-1}} \times 298.15\ \mathrm{K}}{0.028014\ \mathrm{kg\,mol^{-1}}}} = \sqrt{2.6545\times 10^{5}\ \mathrm{m^2\,s^{-2}}} = 515\ \mathrm{m\,s^{-1}}.
$$

For hydrogen, with $M = 0.002016\ \mathrm{kg\,mol^{-1}}$, the same calculation gives $u_\mathrm{rms} = 1921\ \mathrm{m\,s^{-1}}$. The ratio is $\sqrt{28.014/2.016} = 3.73$: at the same temperature both have the same average kinetic energy, so the lighter molecule must move faster, in proportion to $1/\sqrt{M}$. Leaving $M$ in grams per mole would have produced speeds smaller by a factor of $\sqrt{1000} = 31.6$, which is the commonest error in this calculation.

Nitrogen molecules at room temperature move at roughly the speed of sound in air ($346\ \mathrm{m\,s^{-1}}$ at $25\ ^\circ\mathrm{C}$) — not a coincidence, since sound is carried by molecular motion — yet a smell takes seconds to cross a room. Each molecule collides with others billions of times a second and wanders, rather than travelling in a straight line.
:::
:::

Not every molecule has the rms speed. The speeds are spread over a distribution, derived by Maxwell, whose shape depends on $M$ and $T$:

$$
f(u) = 4\pi \left(\frac{M}{2\pi RT}\right)^{3/2} u^{2}\, \exp\!\left(-\frac{Mu^{2}}{2RT}\right),
$$

where $f(u)\,\mathrm{d}u$ is the fraction of molecules with speeds between $u$ and $u + \mathrm{d}u$. The derivation belongs to [[statistical-thermodynamics/boltzmann-distribution]]; here we read the curve.

::: widget plot
f: 1000*4*pi*(m/1000/(2*pi*8.314*t))^1.5*x^2*exp(-(m/1000)*x^2/(2*8.314*t))
x: 0, 2500
y: 0, 4
sliders: t=300:100:1000:10; m=28.014:2:100:0.1
labels: f(u)/(10^{-3}\,\mathrm{s\,m^{-1}})
caption: The Maxwell distribution of molecular speeds $u$ (in $\mathrm{m\,s^{-1}}$) for a gas of molar mass $m$ (in $\mathrm{g\,mol^{-1}}$; default nitrogen) at temperature $t$ (in kelvin). The area under each curve is $1$. Raising the temperature moves the peak to higher speed and spreads the distribution, so a larger fraction of molecules is very fast; a heavier gas has a narrower distribution at lower speeds. For nitrogen at $300\ \mathrm{K}$ the most probable speed is $422\ \mathrm{m\,s^{-1}}$; the rms speed, $\sqrt{3RT/M}$, is about $22\%$ higher.
:::

The high-speed tail is what matters for chemistry. A reaction that needs a violent collision depends on the fraction of molecules far out in that tail, and the fraction grows steeply with temperature — the subject of [[general-chemistry-2/rates-intro]] and [[kinetics/collision-theory]].

One more consequence of $u \propto 1/\sqrt{M}$ was measured long before the kinetic theory existed. **Effusion** is the escape of a gas through a pinhole into a vacuum. The rate at which molecules reach the hole is proportional to their average speed, so at the same temperature and pressure

$$
\frac{\text{rate of effusion of A}}{\text{rate of effusion of B}} = \sqrt{\frac{M_\mathrm{B}}{M_\mathrm{A}}},
$$

which is **Graham's law**. Hydrogen effuses $\sqrt{31.998/2.016} = 3.98$ times as fast as oxygen. When two gases differ in molar mass by less than one per cent, as isotopic forms of the same compound do, the ratio is so close to $1$ that a single effusion step barely separates them, which is why isotope separation by this route was a vast industrial undertaking.

::: warning Four habits that break gas calculations {#warn-gas}
*Celsius in a proportionality.* $V \propto T$ and $p \propto T$ hold for kelvin only. Doubling a Celsius temperature does not double a volume, and a temperature of $0\ ^\circ\mathrm{C}$ would make $pV = nRT$ predict zero pressure. *Mismatched units of $R$.* With $R = 8.314\ \mathrm{J\,K^{-1}\,mol^{-1}}$, pressure must be in pascals and volume in cubic metres; with $8.314\ \mathrm{kPa\,dm^3\,K^{-1}\,mol^{-1}}$, kilopascals and cubic decimetres. Mixing kilopascals with cubic metres is a factor of $1000$. *Grams in a speed formula.* In $u_\mathrm{rms} = \sqrt{3RT/M}$, $M$ is in $\mathrm{kg\,mol^{-1}}$. *Using $22.4\ \mathrm{dm^3\,mol^{-1}}$ everywhere.* That molar volume belongs to $0\ ^\circ\mathrm{C}$ and $1\ \mathrm{atm}$; at room temperature a mole of gas occupies about $24.8\ \mathrm{dm^3}$, and the ideal gas equation with the actual $T$ and $p$ is always safer than a remembered number.
:::

## Real gases

The kinetic model's assumptions fail at the edges. Molecules have size, so at high pressure the volume available to them is smaller than the container. Molecules attract each other, so at low temperature, when they move slowly, they spend more time close together and hit the walls less hard. The deviation is measured by a single number.

::: definition Compression factor {#def-z}
The **compression factor** of a gas is

$$
Z = \frac{pV_\mathrm{m}}{RT},
$$

where $V_\mathrm{m}$ is the molar volume. For an ideal gas $Z = 1$ exactly. $Z < 1$ means the gas is more compressible than an ideal gas (attractions dominate); $Z > 1$ means it is less compressible (repulsions, the finite size of molecules, dominate).
:::

For most gases near room temperature, $Z$ first dips below $1$ as the pressure rises from zero, because attractions draw the molecules together, and then rises well above $1$ at hundreds of bar, when the molecules are crowded and their size dominates. Hydrogen and helium, with very weak attractions, have $Z > 1$ at all pressures at room temperature.

::: proposition The van der Waals equation {#prop-vdw}
An approximate equation of state for real gases is

$$
\left(p + a\frac{n^{2}}{V^{2}}\right)(V - nb) = nRT, \qquad\text{or}\qquad p = \frac{nRT}{V - nb} - a\frac{n^{2}}{V^{2}},
$$

where $a$ and $b$ are constants characteristic of each gas, found by fitting experimental data. The constant $b$ is roughly the volume excluded by one mole of molecules; $a$ measures the strength of their mutual attraction. For carbon dioxide, $a = 3.640\ \mathrm{bar\,dm^6\,mol^{-2}}$ and $b = 0.04267\ \mathrm{dm^3\,mol^{-1}}$ (values from the *CRC Handbook of Chemistry and Physics*). The equation reduces to $pV = nRT$ when $V$ is large (so $nb \ll V$ and $an^{2}/V^{2} \ll p$). It is a model, not a law: it is qualitatively right everywhere, quantitatively right only at moderate densities.
:::

The two corrections act in opposite directions. Excluded volume means the molecules move in a space of $V - nb$ rather than $V$, which *raises* the pressure above $nRT/V$. Attraction means that a molecule about to hit the wall is pulled back by its neighbours. The number of molecules near the wall and the number pulling each one back are both proportional to the concentration $n/V$, so the reduction in pressure is proportional to $(n/V)^{2}$, which is the form of the $a$ term.

::: example Carbon dioxide at forty bar {#ex-vdw}
One mole of carbon dioxide is held in $0.500\ \mathrm{dm^3}$ at $300.0\ \mathrm{K}$. Calculate the pressure from the ideal gas equation and from the van der Waals equation, and the compression factor that the van der Waals pressure implies.
::: solution
With $R = 0.08314\ \mathrm{bar\,dm^3\,K^{-1}\,mol^{-1}}$, the ideal gas pressure is

$$
p_\mathrm{ideal} = \frac{nRT}{V} = \frac{1.000 \times 0.08314 \times 300.0}{0.500}\ \mathrm{bar} = 49.9\ \mathrm{bar}.
$$

The van der Waals pressure is

$$
p = \frac{1.000 \times 0.08314 \times 300.0}{0.500 - 0.04267} - \frac{3.640 \times 1.000^{2}}{0.500^{2}} = 54.54 - 14.56 = 40.0\ \mathrm{bar}.
$$

The excluded volume raises the pressure by about $4.7\ \mathrm{bar}$, and the attractions lower it by $14.6\ \mathrm{bar}$; at this density attraction wins, and the real pressure is about $20\%$ below the ideal prediction. The compression factor is $Z = pV/(nRT) = 40.0 \times 0.500/(0.08314 \times 300.0) = 0.80$. Carbon dioxide is a gas with strong intermolecular attractions for its size, and at $300\ \mathrm{K}$ it is close to its critical temperature ($304\ \mathrm{K}$), above which no pressure can liquefy it. Near such conditions the ideal gas equation is a poor guide. Gas cylinders hold pressures of this order, and cylinders are handled, secured and transported under specific rules because their stored energy is large.
:::
:::

::: quiz
Two flasks of equal volume are at the same temperature. One holds $1.0\ \mathrm{g}$ of hydrogen, the other $1.0\ \mathrm{g}$ of oxygen. Treating both gases as ideal, which statement is right?
- [x] The hydrogen flask is at about sixteen times the pressure of the oxygen flask, and its molecules have the same average kinetic energy as the oxygen molecules.
- [ ] Both flasks are at the same pressure, because they contain equal masses of gas.
- [ ] The oxygen molecules have sixteen times the average kinetic energy of the hydrogen molecules, because they are sixteen times heavier.
- [ ] The two gases have the same rms speed, because they are at the same temperature.
::: solution
Pressure depends on the amount, not the mass: $1.0\ \mathrm{g}$ of $\mathrm{H_2}$ is $0.50\ \mathrm{mol}$ and $1.0\ \mathrm{g}$ of $\mathrm{O_2}$ is $0.031\ \mathrm{mol}$, a ratio of $31.998/2.016 \approx 15.9$. At the same temperature the average translational kinetic energy per molecule is the same for both, $\tfrac32 k_\mathrm{B}T$, so the lighter molecules must be faster, by $\sqrt{15.9} \approx 4$, not equally fast.
:::
:::

::: history
Robert Boyle reported the inverse relation between the pressure and volume of a trapped sample of air in 1662, in the second edition of his *New Experiments Physico-Mechanical, Touching the Spring of the Air*; Edme Mariotte found it independently in France and published it in 1676, which is why French texts call it Mariotte's law. Jacques Charles observed, around 1787, that gases expand equally on heating, but did not publish; Joseph Louis Gay-Lussac published the law of thermal expansion in 1802 and credited Charles. John Dalton announced the law of partial pressures in 1801, from his studies of the water vapour in air. Amedeo Avogadro's hypothesis of 1811 supplied the equal-volumes, equal-numbers principle. Émile Clapeyron combined the separate laws into a single equation of state in 1834. The kinetic explanation had a forerunner in Daniel Bernoulli's *Hydrodynamica* (1738), which derived Boyle's law from moving particles, but became a theory only with Rudolf Clausius in 1857 and James Clerk Maxwell, who derived the distribution of molecular speeds in 1860. Johannes Diderik van der Waals introduced his equation in his doctoral thesis of 1873 and received the Nobel Prize in Physics for it in 1910.
:::

## Where this leads

The ideal gas equation is the first equation of state you meet, and it will be used everywhere gases appear. In [[general-chemistry-1/thermochemistry]] it converts a change in the amount of gas into $pV$ work and links $\Delta H$ to $\Delta U$. In [[general-chemistry-2/chemical-equilibrium]] equilibrium constants of gas reactions are written in partial pressures, $p_\mathrm{J} = x_\mathrm{J}p$, exactly as defined here. The Maxwell distribution and its high-energy tail are the basis of the temperature dependence of reaction rates in [[general-chemistry-2/rates-intro]] and of [[kinetics/collision-theory]], and they are derived from the Boltzmann distribution in [[statistical-thermodynamics/boltzmann-distribution]]. The attractions that make $Z$ dip below one are the intermolecular forces of [[bonding-structure/intermolecular-forces]], and the condensation hidden in the van der Waals wiggle is the liquid–vapour equilibrium of [[general-chemistry-2/liquids-solutions]] and, quantitatively, [[thermodynamics/phase-equilibria]]. A full treatment of real gases, with virial coefficients and the principle of corresponding states, is [[statistical-thermodynamics/real-gases-liquids]].

::: summary
- Pressure is force per area; $1\ \mathrm{bar} = 10^{5}\ \mathrm{Pa}$ and $1\ \mathrm{atm} = 101\,325\ \mathrm{Pa} = 760\ \mathrm{Torr}$.
- Boyle ($pV$ constant), Charles ($V/T$ constant) and Avogadro ($V/n$ constant) combine into $pV = nRT$ with $R = 8.314\ \mathrm{J\,K^{-1}\,mol^{-1}}$, a limiting law exact as $p \to 0$, with $T$ always in kelvin.
- The molar volume of an ideal gas is $22.71\ \mathrm{dm^3\,mol^{-1}}$ at $273.15\ \mathrm{K}$ and $1\ \mathrm{bar}$ and $24.79\ \mathrm{dm^3\,mol^{-1}}$ at $298.15\ \mathrm{K}$ and $1\ \mathrm{bar}$. Gas densities give molar masses through $M = \rho RT/p$.
- In a mixture, $p_\mathrm{J} = x_\mathrm{J}p$, and for ideal gases the partial pressures add to the total (Dalton's law). Gas collected over water must be corrected for the vapour pressure of water.
- The kinetic model gives $pV = \tfrac13 Nm\langle u^{2}\rangle$, so the mean translational kinetic energy is $\tfrac32 RT$ per mole, independent of the gas, and $u_\mathrm{rms} = \sqrt{3RT/M}$ with $M$ in $\mathrm{kg\,mol^{-1}}$.
- Speeds follow the Maxwell distribution, which broadens and shifts to higher speeds as $T$ rises; effusion rates go as $1/\sqrt{M}$ (Graham's law).
- Real gases deviate when molecules are close together: $Z = pV_\mathrm{m}/RT$ measures the deviation, and the van der Waals equation models it with an attraction constant $a$ and an excluded volume $b$.
:::

## Exercises

::: exercise A barometer reading {#exr-mmhg level=1 check="99.3"}
A barometer reads $745\ \mathrm{mmHg}$. Express this pressure in kilopascals. (Enter the pressure in kPa, to three significant figures.)
::: solution
$1\ \mathrm{mmHg} = 101\,325/760\ \mathrm{Pa} = 133.322\ \mathrm{Pa}$, so $745\ \mathrm{mmHg} = 745 \times 133.322\ \mathrm{Pa} = 99\,325\ \mathrm{Pa} = 99.3\ \mathrm{kPa}$. A pressure a little below one standard atmosphere, typical of unsettled weather or of a laboratory a few hundred metres above sea level.
:::
:::

::: exercise Boyle's law in a cylinder {#exr-boyle level=1 check="1.60"}
A sample of gas occupies $4.00\ \mathrm{dm^3}$ at $100\ \mathrm{kPa}$. At constant temperature, it is compressed until the pressure is $250\ \mathrm{kPa}$. What is its new volume? (Enter the volume in $\mathrm{dm^3}$.)
::: solution
At constant temperature and amount, $p_1V_1 = p_2V_2$, so $V_2 = 4.00 \times 100/250\ \mathrm{dm^3} = 1.60\ \mathrm{dm^3}$. The pressure rose by a factor of $2.5$ and the volume fell by the same factor.
:::
:::

::: exercise The molar volume at STP {#exr-vm level=1 check="22.71"}
Calculate the volume occupied by $1.000\ \mathrm{mol}$ of an ideal gas at $273.15\ \mathrm{K}$ and $1.000\ \mathrm{bar}$. (Enter the volume in $\mathrm{dm^3}$, to four significant figures.)
::: solution
$V = nRT/p = 1.000 \times 8.314 \times 273.15/100.0\ \mathrm{dm^3} = 22.71\ \mathrm{dm^3}$, using $R$ in $\mathrm{kPa\,dm^3\,K^{-1}\,mol^{-1}}$ and $p = 100.0\ \mathrm{kPa}$. At $1\ \mathrm{atm}$ ($101.325\ \mathrm{kPa}$) the same calculation gives $22.41\ \mathrm{dm^3}$, the value quoted in older books.
:::
:::

::: exercise A balloon in liquid nitrogen {#exr-charles level=2 check="0.526"}
A balloon contains $2.00\ \mathrm{dm^3}$ of air at $20.0\ ^\circ\mathrm{C}$. It is cooled to $-196.0\ ^\circ\mathrm{C}$, the boiling temperature of liquid nitrogen, at constant pressure. Assuming the air stays gaseous and ideal, what is its new volume? (Enter the volume in $\mathrm{dm^3}$, to three significant figures.)
::: solution
Convert to kelvin: $T_1 = 293.15\ \mathrm{K}$, $T_2 = 77.15\ \mathrm{K}$. Charles's law gives $V_2 = V_1T_2/T_1 = 2.00 \times 77.15/293.15 = 0.526\ \mathrm{dm^3}$. In practice $77\ \mathrm{K}$ is close to the temperatures at which the components of air condense — oxygen boils at $90\ \mathrm{K}$ under $1\ \mathrm{atm}$ — so some oxygen may liquefy and the ideal-gas answer is only an estimate of the shrinkage. Liquid nitrogen causes severe cold burns and can displace oxygen in a closed room; it is handled with face and hand protection, in ventilated spaces, under supervision.
:::
:::

::: exercise A mixture of helium and oxygen {#exr-heo2 level=2 check="100"}
A cylinder contains $2.00\ \mathrm{g}$ of helium ($M = 4.003\ \mathrm{g\,mol^{-1}}$) and $8.00\ \mathrm{g}$ of oxygen ($M = 31.998\ \mathrm{g\,mol^{-1}}$) at a total pressure of $150\ \mathrm{kPa}$. What is the partial pressure of helium? (Enter the partial pressure in kPa, to three significant figures.)
::: solution
$n(\mathrm{He}) = 2.00/4.003 = 0.4996\ \mathrm{mol}$ and $n(\mathrm{O_2}) = 8.00/31.998 = 0.2500\ \mathrm{mol}$. The mole fraction of helium is $0.4996/(0.4996 + 0.2500) = 0.6665$, so $p(\mathrm{He}) = 0.6665 \times 150\ \mathrm{kPa} = 100.0\ \mathrm{kPa}$, or $100\ \mathrm{kPa}$ to three significant figures. Helium makes up only $20\%$ of the mass but two thirds of the pressure, because partial pressure counts molecules.
:::
:::

::: exercise Speed of helium atoms {#exr-he-rms level=2 check="1367"}
Calculate the root-mean-square speed of helium atoms at $300\ \mathrm{K}$, using $M = 4.003\ \mathrm{g\,mol^{-1}}$. (Enter the speed in $\mathrm{m\,s^{-1}}$, to four significant figures.)
::: solution
With $M = 4.003\times 10^{-3}\ \mathrm{kg\,mol^{-1}}$,

$$
u_\mathrm{rms} = \sqrt{\frac{3 \times 8.314 \times 300}{4.003\times 10^{-3}}}\ \mathrm{m\,s^{-1}} = \sqrt{1.8693\times 10^{6}}\ \mathrm{m\,s^{-1}} = 1367\ \mathrm{m\,s^{-1}}.
$$

About $2.6$ times the rms speed of nitrogen at the same temperature, in the ratio $\sqrt{28.014/4.003}$. Helium's high speed is one reason it escapes slowly from the upper atmosphere into space.
:::
:::

::: exercise Oxygen for a methane flame {#exr-o2-vol level=2 check="24.7"}
What volume of oxygen, measured at $25.0\ ^\circ\mathrm{C}$ and $1.000\ \mathrm{bar}$, is needed to burn $8.00\ \mathrm{g}$ of methane completely by $\mathrm{CH_4 + 2\,O_2 \rightarrow CO_2 + 2\,H_2O}$? Use $M(\mathrm{CH_4}) = 16.043\ \mathrm{g\,mol^{-1}}$. (Enter the volume in $\mathrm{dm^3}$, to three significant figures.)
::: solution
$n(\mathrm{CH_4}) = 8.00/16.043 = 0.4987\ \mathrm{mol}$, so $n(\mathrm{O_2}) = 2 \times 0.4987 = 0.9973\ \mathrm{mol}$. Then $V = nRT/p = 0.9973 \times 8.314 \times 298.15/100.0\ \mathrm{dm^3} = 24.7\ \mathrm{dm^3}$. Since air is about $21\%$ oxygen, this is roughly $118\ \mathrm{dm^3}$ of air for $8\ \mathrm{g}$ of fuel — the reason a burner needs a generous air supply.
:::
:::

::: exercise Graham's law from the kinetic model {#exr-graham level=3 check="3.984"}
Starting from $u_\mathrm{rms} = \sqrt{3RT/M}$, and assuming that the rate of effusion is proportional to the average molecular speed, show that the ratio of effusion rates of two gases at the same temperature and pressure is $\sqrt{M_\mathrm{B}/M_\mathrm{A}}$. Then compute the ratio of the effusion rates of hydrogen ($2.016\ \mathrm{g\,mol^{-1}}$) and oxygen ($31.998\ \mathrm{g\,mol^{-1}}$). (Enter the ratio rate(H₂)/rate(O₂), to four significant figures.)
::: hint
The mean speed and the rms speed differ by a constant factor that is the same for every gas. At the same $T$ and $p$, the two gases have the same number of molecules per unit volume.
:::
::: solution
The rate at which molecules pass through a small hole is proportional to the number per unit volume, $N/V$, times their average speed. At the same temperature and pressure, $N/V = p/(k_\mathrm{B}T)$ is the same for both gases, so the ratio of rates is the ratio of average speeds. Every characteristic speed of the Maxwell distribution — the mean, the most probable, the rms — is a fixed number times $\sqrt{RT/M}$, so its ratio for two gases at the same temperature is

$$
\frac{\text{rate}_\mathrm{A}}{\text{rate}_\mathrm{B}} = \frac{\sqrt{RT/M_\mathrm{A}}}{\sqrt{RT/M_\mathrm{B}}} = \sqrt{\frac{M_\mathrm{B}}{M_\mathrm{A}}}.
$$

For hydrogen against oxygen, $\sqrt{31.998/2.016} = \sqrt{15.872} = 3.984$. The ratio does not depend on the temperature, provided both gases are at the same one. Measuring an effusion rate relative to a known gas therefore gives a molar mass — a route to $M$ that, like the density method of [[#ex-density]], needs no formula.
:::
:::

::: exercise When the ideal gas equation fails {#exr-vdw level=3 check="62.1"}
One mole of carbon dioxide is compressed into $0.2500\ \mathrm{dm^3}$ at $300.0\ \mathrm{K}$. Use the van der Waals equation, with $a = 3.640\ \mathrm{bar\,dm^6\,mol^{-2}}$ and $b = 0.04267\ \mathrm{dm^3\,mol^{-1}}$, to estimate its pressure, and compare with the ideal gas value. What is the compression factor? (Enter the van der Waals pressure in bar, to three significant figures.)
::: hint
Compute the two terms of $p = nRT/(V - nb) - an^{2}/V^{2}$ separately, with $R = 0.08314\ \mathrm{bar\,dm^3\,K^{-1}\,mol^{-1}}$.
:::
::: solution
First term: $nRT/(V - nb) = 0.08314 \times 300.0/(0.2500 - 0.04267) = 24.942/0.20733 = 120.30\ \mathrm{bar}$. Second term: $an^{2}/V^{2} = 3.640/0.0625 = 58.24\ \mathrm{bar}$. So $p = 120.30 - 58.24 = 62.06\ \mathrm{bar}$, which is $62.1\ \mathrm{bar}$.

The ideal gas equation gives $p = 24.942/0.2500 = 99.77\ \mathrm{bar}$, so the van der Waals estimate is $38\%$ lower. The compression factor implied by the van der Waals pressure is $Z = pV/(nRT) = 62.06 \times 0.2500/24.942 = 0.622$. Compared with [[#ex-vdw]], halving the volume has made both corrections larger: the excluded volume is now $17\%$ of the container, and the attraction term, proportional to $1/V^{2}$, has quadrupled. Real carbon dioxide at this density and temperature is near the point at which it would begin to condense, where the van der Waals equation is itself only a rough guide; the ideal gas equation is no guide at all.
:::
:::
