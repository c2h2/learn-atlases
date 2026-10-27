How do we know that a certified reference material really contains $25.0\ \mu\mathrm{g\,g^{-1}}$ of lead, or that a "primary standard" of potassium hydrogen phthalate is $99.99\ \%$ pure? Ultimately, by methods that need no calibration against another chemical standard: weigh a precipitate of known composition, or count the amount of a reagent of known purity needed to react exactly with the analyte. Gravimetry and titrimetry are the **absolute** (or primary) methods of chemical analysis. They rest on a balance, calibrated glassware and stoichiometry, and in skilled hands they reach a relative uncertainty of $0.01$–$0.1\ \%$ — better than almost any instrumental technique. National metrology institutes still use them to certify the reference materials that instrumental methods are calibrated with, and routine laboratories use them every day for acidity, hardness, chloride, iron, vitamin C and the nitrogen content of food.

This chapter treats both families. In gravimetry the analyte is converted to a pure, stable solid of known formula; the art is in making precipitates that are filterable and pure, and the arithmetic is a single conversion factor. In titrimetry the analyte reacts with a standard solution, and an end point signals that equivalent amounts have been mixed. We derive the titration curves of the four classical reaction types — acid–base, complexometric with EDTA, precipitation and redox — from the equilibrium tools of [[analytical-chemistry/equilibria-in-analysis]], and use them to choose indicators and to estimate the titration error. The practical skills (weighing, the burette, standard solutions) are those of [[laboratory-methods/volumetric-technique]].

## Gravimetric analysis

In a **precipitation gravimetric** method, the analyte is precipitated from solution as a sparingly soluble compound, which is filtered, washed, dried or ignited to a compound of exactly known composition (the **weighing form**, not necessarily the same as the precipitated form), and weighed. Sulfate is precipitated and weighed as $\mathrm{BaSO_4}$; nickel is precipitated with dimethylglyoxime and weighed as the red chelate $\mathrm{Ni(C_4H_7N_2O_2)_2}$; iron is precipitated as hydrous iron(III) oxide and ignited to $\mathrm{Fe_2O_3}$; calcium is precipitated as the oxalate and ignited to $\mathrm{CaO}$ or weighed as $\mathrm{CaC_2O_4\cdot H_2O}$ after drying.

::: definition Gravimetric factor {#def-gravimetric-factor}
If a weighing form P contains the analyte A in the stoichiometric ratio $a$ mol of A per $p$ mol of P, the mass of analyte corresponding to a mass $m_\mathrm{P}$ of weighing form is
$$
m_\mathrm{A} = m_\mathrm{P}\times\underbrace{\frac{a\,M_\mathrm{A}}{p\,M_\mathrm{P}}}_{\text{gravimetric factor}},
$$ {#eq-gravimetric}
where $M$ are molar masses. The mass fraction of analyte in a sample of mass $m_\mathrm{s}$ is $w_\mathrm{A} = m_\mathrm{A}/m_\mathrm{s}$. The method assumes that the precipitation is quantitative, the weighing form is pure and of exactly the stated composition, and nothing else is weighed with it.
:::

::: example Sulfate as barium sulfate {#ex-sulfate}
A $0.5000\ \mathrm{g}$ sample of a fertiliser is dissolved and the sulfate precipitated with barium chloride. After filtration, washing and ignition the $\mathrm{BaSO_4}$ weighs $0.4123\ \mathrm{g}$. Find the mass fraction of sulfate. (Molar masses from IUPAC 2021 standard atomic weights: $\mathrm{BaSO_4}$ $233.38$, $\mathrm{SO_4}$ $96.06\ \mathrm{g\,mol^{-1}}$.)
::: solution
One mole of $\mathrm{BaSO_4}$ contains one mole of sulfate, so the gravimetric factor is $96.06/233.38 = 0.41159$. Then
$$
m(\mathrm{SO_4^{2-}}) = 0.4123\ \mathrm{g}\times0.41159 = 0.16970\ \mathrm{g}, \qquad w = \frac{0.16970}{0.5000} = 33.94\ \%.
$$
Four significant figures are justified: the masses are known to $\pm0.0001\ \mathrm{g}$, i.e. about $0.02$–$0.03\ \%$ relative, and the factor is known much better. Whether the result is *true* to that level depends on chemistry, not arithmetic: barium sulfate is notorious for coprecipitating nitrate, chloride and alkali-metal ions, which is why the precipitation is done slowly from hot, dilute, acidified solution.
:::
:::

### Making a good precipitate

A precipitate for gravimetry must be (i) so insoluble that losses are negligible, (ii) filterable, which means large particles, and (iii) pure. The solubility is set by equilibrium (and, as we saw, raised by inert electrolyte and by acid for salts of weak acids). Particle size and purity are set by **kinetics**. When a precipitating reagent is added, the solution becomes supersaturated, and two processes compete: **nucleation**, the formation of new tiny particles, and **particle growth** on existing ones. Von Weimarn observed early in the twentieth century that particle size decreases as the **relative supersaturation**
$$
\text{relative supersaturation} = \frac{Q - S}{S}
$$
increases, where $Q$ is the concentration of solute at the moment of mixing and $S$ its equilibrium solubility. High relative supersaturation favours nucleation (many small particles, a colloid); low relative supersaturation favours growth (few large crystals). This is an empirical rule, but it explains the standard recipe: precipitate from **hot** solution (larger $S$), from **dilute** solution with slow addition of **dilute** reagent and stirring (smaller $Q$), and, when the precipitate is a salt of a weak acid, at a low pH that raises $S$, adjusting the pH slowly afterwards. In **homogeneous precipitation** the precipitant is generated slowly throughout the solution — for example hydroxide from the hydrolysis of urea on heating — so that $Q$ never rises far above $S$.

Some precipitates, notably the hydrous oxides of iron(III) and aluminium and the silver halides, have such low solubilities that they inevitably form colloids. These are **coagulated** (made to clump into filterable aggregates) by heating and adding electrolyte, which compresses the charged layer of adsorbed ions around each particle. Washing with pure water can reverse this (**peptisation**), so they are washed with a volatile electrolyte such as dilute nitric acid or ammonium nitrate that is driven off on drying.

Impurities are carried down by **coprecipitation**: surface adsorption (worst for colloids with their enormous surface area), occlusion of solution within growing crystals, and inclusion of foreign ions in the crystal lattice (mixed crystals). **Digestion** — leaving the precipitate in the hot mother liquor for an hour or more — lets small particles dissolve and large ones grow (Ostwald ripening), expelling occluded impurities. Reprecipitation (dissolving and precipitating again from a cleaner solution) is the remedy for persistent contamination.

::: example Nickel by dimethylglyoxime {#ex-nickel}
A $1.000\ \mathrm{g}$ sample of a steel is dissolved, and nickel is precipitated in ammoniacal tartrate solution with dimethylglyoxime ($\mathrm{H_2dmg}$). The dried precipitate, $\mathrm{Ni(Hdmg)_2}$ ($M = 288.92\ \mathrm{g\,mol^{-1}}$), weighs $0.1845\ \mathrm{g}$. Find the mass fraction of nickel ($M = 58.693\ \mathrm{g\,mol^{-1}}$). Why is this a favourable weighing form?
::: solution
$w(\mathrm{Ni}) = 0.1845\times58.693/288.92/1.000 = 0.03748$, i.e. $3.748\ \%$. The weighing form is favourable because its gravimetric factor is small ($0.2031$): each milligram of nickel gives nearly five milligrams of precipitate, so the relative weighing error is reduced fivefold compared with weighing the metal itself. The organic reagent is also highly selective for nickel in ammoniacal solution, and tartrate holds iron(III) in solution as a complex so that it does not precipitate as hydroxide — an example of **masking**.
:::
:::

Gravimetry also includes **volatilisation** methods (water or carbon dioxide driven off and absorbed and weighed, or the mass loss of a sample measured) and **thermogravimetric analysis**, which records mass continuously as temperature rises. They obey the same arithmetic.

## Titrations: the common framework

::: definition Titration, equivalence point and end point {#def-titration}
In a **titration**, a **titrant** of accurately known concentration is added from a burette to the analyte until the reaction between them is complete. The **equivalence point** is the volume $V_\mathrm{e}$ at which the amount of titrant added equals the stoichiometric amount required, $c_\mathrm{T}V_\mathrm{e} = (t/a)\,n_\mathrm{A}$ for the reaction $a\,\mathrm{A} + t\,\mathrm{T}\rightarrow\text{products}$. The **end point** is the volume at which a physical change (an indicator colour, a jump in potential, a change of conductivity) is observed. The difference between them is the **titration error**. A reaction is suitable for titration if it is fast, has known stoichiometry without side reactions, and is so complete that the equivalence point is marked by a sharp change in some measurable property.
:::

Titrations are performed **directly** (titrant reacts with analyte), as **back titrations** (an excess of reagent is added and the unused excess titrated — used when the direct reaction is slow or lacks an end point, as in the Kjeldahl determination of nitrogen), or by **displacement** (the analyte releases an equivalent amount of something that is titrated). The titrant is standardised against a **primary standard**: a substance of high, known purity, stable, non-hygroscopic and of high molar mass, such as potassium hydrogen phthalate for bases, sodium carbonate or tris(hydroxymethyl)aminomethane for acids, sodium oxalate or potassium dichromate for oxidants, and calcium carbonate or zinc metal for EDTA.

The shape of a titration curve near the equivalence point decides whether the titration works. We plot a logarithmic variable — pH, $\mathrm{pM} = -\log[\mathrm{M}]$, or a potential, which is logarithmic in concentration through the Nernst equation — against volume. Far from equivalence the variable changes slowly because one reagent is in excess and buffers it; at equivalence it changes abruptly. The steeper and taller that jump, the smaller the titration error for a given end-point uncertainty.

## Acid–base titrations

Titration curves for strong and weak acids were sketched in [[general-chemistry-2/buffers-titrations]] region by region: initial solution, buffer region, equivalence point, excess titrant. The systematic treatment gives the whole curve in one formula.

::: proposition The titration curve of a weak acid with a strong base {#prop-titration-curve}
A volume $V_\mathrm{a}$ of a monoprotic weak acid HA (formal concentration $C_\mathrm{a}$, dissociation constant $K_\mathrm{a}$) is titrated with a strong base of concentration $C_\mathrm{b}$. Let $\phi = C_\mathrm{b}V_\mathrm{b}/(C_\mathrm{a}V_\mathrm{a})$ be the fraction of the way to the equivalence point. Then at every point of the titration
$$
\phi = \frac{\alpha_{\mathrm{A^-}} - \dfrac{[\mathrm{H^+}] - [\mathrm{OH^-}]}{C_\mathrm{a}}}{1 + \dfrac{[\mathrm{H^+}] - [\mathrm{OH^-}]}{C_\mathrm{b}}}, \qquad \alpha_{\mathrm{A^-}} = \frac{K_\mathrm{a}}{[\mathrm{H^+}] + K_\mathrm{a}},
$$ {#eq-titration-curve}
with $[\mathrm{OH^-}] = K_\mathrm{w}/[\mathrm{H^+}]$. For a strong acid, set $\alpha_{\mathrm{A^-}} = 1$. Activity coefficients are taken as $1$.
:::

::: proof
After adding $V_\mathrm{b}$ of base, the solution (volume $V_\mathrm{a}+V_\mathrm{b}$) contains $[\mathrm{Na^+}] = C_\mathrm{b}V_\mathrm{b}/(V_\mathrm{a}+V_\mathrm{b})$ and total acid $F = C_\mathrm{a}V_\mathrm{a}/(V_\mathrm{a}+V_\mathrm{b})$, of which $[\mathrm{A^-}] = \alpha_{\mathrm{A^-}}F$. The charge balance is $[\mathrm{Na^+}] + [\mathrm{H^+}] = [\mathrm{A^-}] + [\mathrm{OH^-}]$. Write $\Delta = [\mathrm{H^+}] - [\mathrm{OH^-}]$ and substitute:
$$
\frac{C_\mathrm{b}V_\mathrm{b}}{V_\mathrm{a}+V_\mathrm{b}} + \Delta = \frac{\alpha_{\mathrm{A^-}}C_\mathrm{a}V_\mathrm{a}}{V_\mathrm{a}+V_\mathrm{b}} .
$$
Multiply by $V_\mathrm{a}+V_\mathrm{b}$ and collect the terms in $V_\mathrm{b}$: $V_\mathrm{b}(C_\mathrm{b} + \Delta) = V_\mathrm{a}(\alpha_{\mathrm{A^-}}C_\mathrm{a} - \Delta)$. Dividing by $C_\mathrm{a}V_\mathrm{a}$ and by $C_\mathrm{b}$,
$$
\phi = \frac{C_\mathrm{b}V_\mathrm{b}}{C_\mathrm{a}V_\mathrm{a}} = \frac{\alpha_{\mathrm{A^-}} - \Delta/C_\mathrm{a}}{1 + \Delta/C_\mathrm{b}} .
$$
No approximation has been made beyond ideal behaviour: the formula gives $\phi$ exactly for any chosen pH, so the curve is computed "backwards", choosing pH values and calculating the volumes.
:::

::: widget parametric
fx: (10^(-pKa)/(10^(-t)+10^(-pKa)) - (10^(-t)-1e-14*10^t)/C)/(1 + (10^(-t)-1e-14*10^t)/C)
fy: t
t: 0.5, 13.5
x: 0, 2
y: 0, 14
sliders: pKa=4.76:1:11:0.01; C=0.1:0.001:0.5:0.001
trace: false
caption: The titration curve of a weak acid with a strong base of the same concentration $C$ (in $\mathrm{mol\,dm^{-3}}$), computed from [[#eq-titration-curve]]: pH (vertical) against the fraction titrated $\phi = V_\mathrm{b}/V_\mathrm{e}$ (horizontal). The defaults describe $0.1\ \mathrm{mol\,dm^{-3}}$ acetic acid: the half-equivalence point lies at $\mathrm{pH} = \mathrm{p}K_\mathrm{a} = 4.76$ and the equivalence point at $8.73$. Raise $\mathrm{p}K_\mathrm{a}$ to $8$ or $9$ and the jump shrinks until no indicator can locate it; lower $C$ to $0.001$ and the same happens. A useful rule: a visual end point is feasible when $C_\mathrm{a}K_\mathrm{a} \gtrsim 10^{-8}$.
:::

::: example Acetic acid with sodium hydroxide {#ex-acetic-titration}
$25.00\ \mathrm{cm^3}$ of $0.1000\ \mathrm{mol\,dm^{-3}}$ acetic acid ($\mathrm{p}K_\mathrm{a} = 4.76$) is titrated with $0.1000\ \mathrm{mol\,dm^{-3}}$ $\mathrm{NaOH}$. Find the pH at the equivalence point, and the pH at $\phi = 0.99$ and $1.01$. Which indicator is suitable?
::: solution
At equivalence ($V_\mathrm{b} = 25.00\ \mathrm{cm^3}$) the solution is $0.05000\ \mathrm{mol\,dm^{-3}}$ sodium acetate. With $K_\mathrm{b} = K_\mathrm{w}/K_\mathrm{a} = 5.75\times10^{-10}$, $[\mathrm{OH^-}] = \sqrt{K_\mathrm{b}\times0.05000} = 5.36\times10^{-6}$, $\mathrm{pOH} = 5.27$ and $\mathrm{pH} = 8.73$.

At $\phi = 0.99$ the solution is a buffer with $[\mathrm{A^-}]/[\mathrm{HA}] = 99$, so $\mathrm{pH} = 4.76 + \log 99 = 6.76$. At $\phi = 1.01$ the excess base is $0.01\times2.500\ \mathrm{mmol} = 0.0250\ \mathrm{mmol}$ in $50.25\ \mathrm{cm^3}$, $[\mathrm{OH^-}] = 4.98\times10^{-4}$, $\mathrm{pH} = 10.70$. (Equation [[#eq-titration-curve]], solved for pH at these $\phi$, gives $6.76$, $8.73$ and $10.70$.)

The pH rises by four units within $\pm1\ \%$ of equivalence, and the equivalence point is basic, so the indicator must change colour between about pH 7 and 10: phenolphthalein (colourless to pink at about 8.2–10) is the standard choice. Methyl orange (3.1–4.4) would change colour when barely a fifth of the acid had been neutralised.
:::
:::

Polyprotic acids give one jump per proton only if successive $\mathrm{p}K$ values differ by more than about four units — sodium carbonate titrated with hydrochloric acid gives two end points (phenolphthalein near pH 8.3, methyl orange or bromocresol green near pH 4), while the three protons of citric acid ($\mathrm{p}K$ values within two units of each other) titrate as one. The **Kjeldahl method** for organic nitrogen, still the reference method for the protein content of foods, is an acid–base back titration: the sample is digested in hot concentrated sulfuric acid to convert nitrogen to ammonium, the solution is made alkaline, the ammonia is distilled into a known excess of standard acid, and the unreacted acid is titrated.

## Complexometric titrations with EDTA

Most metal ions do not react with simple ligands such as ammonia in a single step: they form $\mathrm{ML}, \mathrm{ML_2}, \dots$ with similar stepwise constants, and the titration curve has no sharp jump. A **chelating** ligand that occupies all the coordination sites at once reacts $1{:}1$ in a single step with a large formation constant. The most important is ethylenediaminetetraacetic acid, EDTA, a hexadentate ligand (two amine nitrogens and four carboxylate oxygens) which forms $1{:}1$ complexes with almost every metal ion of charge $2$ or more. EDTA is a hexaprotic acid $\mathrm{H_6Y^{2+}}$ with $\mathrm{p}K$ values $0.0$, $1.5$, $2.00$, $2.69$, $6.13$ and $10.37$ (at $25\ ^\circ\mathrm{C}$ and $I = 0.1\ \mathrm{mol\,dm^{-3}}$, as tabulated by Harris), and only the fully deprotonated $\mathrm{Y^{4-}}$ binds the metal in the formation constant
$$
\mathrm{M}^{n+} + \mathrm{Y^{4-}} \rightleftharpoons \mathrm{MY}^{n-4}, \qquad K_\mathrm{f} = \frac{[\mathrm{MY}^{n-4}]}{[\mathrm{M}^{n+}][\mathrm{Y^{4-}}]} .
$$

::: proposition The conditional formation constant {#prop-conditional-kf}
In a solution buffered at a fixed pH, let $[\mathrm{EDTA}]$ denote the total concentration of EDTA not bound to the metal, in all its protonation states. Then
$$
\frac{[\mathrm{MY}^{n-4}]}{[\mathrm{M}^{n+}][\mathrm{EDTA}]} = K_\mathrm{f}' = \alpha_{\mathrm{Y^{4-}}}K_\mathrm{f},
$$ {#eq-conditional-kf}
where $\alpha_{\mathrm{Y^{4-}}}$ is the fraction of free EDTA present as $\mathrm{Y^{4-}}$, given by [[analytical-chemistry/equilibria-in-analysis#eq-alpha]] with $n = 6$. If the metal is also held by an auxiliary complexing agent, $[\mathrm{M}^{n+}]$ is replaced by the total unbound metal and $K_\mathrm{f}'' = \alpha_{\mathrm{M}^{n+}}\alpha_{\mathrm{Y^{4-}}}K_\mathrm{f}$, with $\alpha_{\mathrm{M}^{n+}}$ the fraction of unbound metal present as the free ion.
:::

::: proof
By definition $[\mathrm{Y^{4-}}] = \alpha_{\mathrm{Y^{4-}}}[\mathrm{EDTA}]$, and at fixed pH $\alpha_{\mathrm{Y^{4-}}}$ is a constant. Substituting into $K_\mathrm{f}$ gives $K_\mathrm{f} = [\mathrm{MY}]/([\mathrm{M}]\,\alpha_{\mathrm{Y^{4-}}}[\mathrm{EDTA}])$, which rearranges to [[#eq-conditional-kf]]. The auxiliary-ligand case is identical, with $[\mathrm{M}^{n+}] = \alpha_{\mathrm{M}^{n+}}[\mathrm{M}]_\text{unbound}$. In the language of [[analytical-chemistry/equilibria-in-analysis#def-conditional]], $1/\alpha_{\mathrm{Y^{4-}}}$ is the side-reaction coefficient of EDTA due to protonation.
:::

::: widget plot
f: log10(1/(1+10^(10.37-x)+10^(16.50-2*x)+10^(19.19-3*x)+10^(21.19-4*x)+10^(22.69-5*x)+10^(22.69-6*x))); 10.65 + log10(1/(1+10^(10.37-x)+10^(16.50-2*x)+10^(19.19-3*x)+10^(21.19-4*x)+10^(22.69-5*x)+10^(22.69-6*x))); 8.79 + log10(1/(1+10^(10.37-x)+10^(16.50-2*x)+10^(19.19-3*x)+10^(21.19-4*x)+10^(22.69-5*x)+10^(22.69-6*x)))
x: 2, 14
y: -14, 12
hlines: 8
labels: \log\alpha_{\mathrm{Y^{4-}}}; \log K_\mathrm{f}'(\mathrm{CaY^{2-}}); \log K_\mathrm{f}'(\mathrm{MgY^{2-}})
caption: The logarithm of $\alpha_{\mathrm{Y^{4-}}}$ against pH ($x$), and the conditional formation constants [[#eq-conditional-kf]] of the calcium and magnesium complexes ($\log K_\mathrm{f} = 10.65$ and $8.79$). Below pH 10 the fraction of $\mathrm{Y^{4-}}$ falls by one power of ten per pH unit, and below pH 6 even faster. The horizontal line marks $\log K_\mathrm{f}' = 8$, roughly the smallest conditional constant that gives a sharp end point at $0.01\ \mathrm{mol\,dm^{-3}}$: calcium can be titrated above about pH 7.5, magnesium only above about pH 9.5. Ions with $\log K_\mathrm{f}$ near 25 (iron(III), bismuth) can be titrated at pH 1–2, where calcium and magnesium do not interfere at all.
:::

::: example An EDTA titration curve {#ex-edta-curve}
$50.00\ \mathrm{cm^3}$ of $0.0400\ \mathrm{mol\,dm^{-3}}$ $\mathrm{Ca^{2+}}$, buffered at pH 10.00, is titrated with $0.0800\ \mathrm{mol\,dm^{-3}}$ EDTA. Find $\mathrm{pCa}$ after $20.00$, $25.00$ (the equivalence point) and $30.00\ \mathrm{cm^3}$.
::: solution
At pH 10.00, $\alpha_{\mathrm{Y^{4-}}} = 0.30$ (from [[analytical-chemistry/equilibria-in-analysis#eq-alpha]] with the six $\mathrm{p}K$ values above), so $K_\mathrm{f}' = 0.30\times10^{10.65} = 1.34\times10^{10}$. The equivalence volume is $V_\mathrm{e} = 0.0400\times50.00/0.0800 = 25.00\ \mathrm{cm^3}$.

*Before equivalence, $20.00\ \mathrm{cm^3}$.* The reaction is essentially complete, so the unreacted calcium is $2.000 - 1.600 = 0.400\ \mathrm{mmol}$ in $70.00\ \mathrm{cm^3}$: $[\mathrm{Ca^{2+}}] = 5.71\times10^{-3}$, $\mathrm{pCa} = 2.24$.

*At equivalence.* All calcium is $\mathrm{CaY^{2-}}$: $2.000\ \mathrm{mmol}$ in $75.00\ \mathrm{cm^3}$, $0.02667\ \mathrm{mol\,dm^{-3}}$. A little dissociates, giving $[\mathrm{Ca^{2+}}] = [\mathrm{EDTA}] = x$:
$$
\frac{0.02667 - x}{x^2} = 1.34\times10^{10} \quad\Rightarrow\quad x = \sqrt{\frac{0.02667}{1.34\times10^{10}}} = 1.41\times10^{-6}, \qquad \mathrm{pCa} = 5.85 .
$$
*After equivalence, $30.00\ \mathrm{cm^3}$.* Excess EDTA: $2.400 - 2.000 = 0.400\ \mathrm{mmol}$ in $80.00\ \mathrm{cm^3}$, $[\mathrm{EDTA}] = 5.00\times10^{-3}$, and $[\mathrm{CaY^{2-}}] = 0.02500$. From [[#eq-conditional-kf]], $[\mathrm{Ca^{2+}}] = 0.02500/(1.34\times10^{10}\times5.00\times10^{-3}) = 3.74\times10^{-10}$, $\mathrm{pCa} = 9.43$.

The jump from 2.24 to 9.43 over $\pm5\ \mathrm{cm^3}$ is large; at pH 8, where $K_\mathrm{f}'$ would be $10^{8.27}$, the post-equivalence branch would sit two units lower and the jump would be much less sharp.
:::
:::

End points in EDTA titrations are usually found with **metallochromic indicators**: dyes that are themselves weak chelating agents with different colours when free and when bound to the metal. Eriochrome Black T, for example, is wine-red when bound to magnesium and blue when free at pH 10. The indicator binds the metal less strongly than EDTA does; at the end point EDTA strips the last metal from the indicator and the colour changes. The best-known application is **water hardness**, the total of calcium and magnesium, conventionally expressed as $\mathrm{mg\,dm^{-3}}$ of $\mathrm{CaCO_3}$. EDTA titrations are made selective by pH (as the figure shows) and by **masking agents** that bind interfering ions more strongly than EDTA can: cyanide masks zinc, copper and nickel; triethanolamine masks aluminium and iron.

::: warning Forgetting the pH {#warn-edta-ph}
A formation constant of $10^{10.65}$ suggests that the calcium–EDTA reaction is always complete. It is not: at pH 6, $\alpha_{\mathrm{Y^{4-}}} = 1.8\times10^{-5}$ and $K_\mathrm{f}'$ is only $10^{5.9}$, far too small for a sharp end point. Every EDTA titration must be buffered at a pH chosen so that $K_\mathrm{f}'$ is large — and the protons released when $\mathrm{H_2Y^{2-}}$ (the form in the usual disodium salt) binds the metal would otherwise lower the pH during the titration. At the other extreme, too high a pH precipitates metal hydroxides (magnesium hydroxide above about pH 11, which is exploited to determine calcium alone at pH 12–13). The buffer is part of the method, not a convenience.
:::

## Precipitation titrations

The classical precipitation titration is the determination of halides with silver nitrate, **argentometry**. The titration curve, $\mathrm{pAg}$ against volume, has a jump whose height is set by $K_\mathrm{sp}$: iodide ($K_\mathrm{sp}(\mathrm{AgI}) = 8.3\times10^{-17}$) gives a larger jump than chloride ($1.8\times10^{-10}$). Three end-point methods are named after their originators:

- **Mohr** (1856): chromate is added as indicator; once all chloride has precipitated, the first excess of silver precipitates red-brown $\mathrm{Ag_2CrO_4}$. The pH must be near neutral (7–10): in acid, chromate is protonated to hydrogenchromate and dichromate and the end point is late; in base, silver hydroxide/oxide precipitates.
- **Volhard** (1874): a back titration. Excess standard silver nitrate is added to the acidified sample, and the unreacted silver is titrated with standard thiocyanate, with iron(III) as indicator forming red $\mathrm{FeSCN^{2+}}$ at the end point. Because it works in acid, carbonate and other anions that would precipitate silver in neutral solution do not interfere.
- **Fajans** (1920s): an **adsorption indicator** such as dichlorofluorescein, an anionic dye, is adsorbed on the precipitate's surface once that surface becomes positively charged by excess $\mathrm{Ag^+}$ beyond the equivalence point, changing colour from yellow-green to pink.

Silver nitrate stains skin and is corrosive to the eyes, and chromate is toxic and carcinogenic; teaching laboratories increasingly use the Fajans method or potentiometric end points ([[analytical-chemistry/electroanalytical]]) in place of Mohr's chromate, and silver residues are collected for recovery. As always, practical work requires supervision and a risk assessment.

## Redox titrations

In a redox titration the measured variable is the electrode potential of the solution, which the Nernst equation ties to the ratio of oxidised and reduced forms of whichever couple is in excess. Common titrants are potassium permanganate (self-indicating: the pink $\mathrm{MnO_4^-}$ colour appears at the end point), cerium(IV), potassium dichromate, iodine (with starch as indicator), and, for oxidising analytes, iodide followed by titration of the liberated iodine with thiosulfate (**iodometry**). Potentials are taken as **formal potentials** $E^{\circ\prime}$, measured in a stated medium (for example $1\ \mathrm{mol\,dm^{-3}}$ $\mathrm{H_2SO_4}$), which absorb activity coefficients and complexation by the medium in the same way as a conditional constant.

::: proposition The potential at the equivalence point {#prop-redox-eq}
For a titration of a reductant $\mathrm{Red_1}$ (couple $\mathrm{Ox_1}/\mathrm{Red_1}$, $n_1$ electrons, formal potential $E_1^{\circ\prime}$) by an oxidant $\mathrm{Ox_2}$ (couple $\mathrm{Ox_2}/\mathrm{Red_2}$, $n_2$ electrons, $E_2^{\circ\prime}$), in which no other species (such as $\mathrm{H^+}$) appears in the half-reactions, the potential at the equivalence point at $25\ ^\circ\mathrm{C}$ is
$$
E_\mathrm{eq} = \frac{n_1E_1^{\circ\prime} + n_2E_2^{\circ\prime}}{n_1 + n_2} .
$$ {#eq-redox-eq}
Before equivalence, $E = E_1^{\circ\prime} - (0.05916/n_1)\log_{10}([\mathrm{Red_1}]/[\mathrm{Ox_1}])$; after equivalence, $E = E_2^{\circ\prime} - (0.05916/n_2)\log_{10}([\mathrm{Red_2}]/[\mathrm{Ox_2}])$.
:::

::: proof
At every point the two couples are at equilibrium with each other and with the electrode, so both Nernst equations give the same $E$:
$$
E = E_1^{\circ\prime} - \frac{0.05916}{n_1}\log\frac{[\mathrm{Red_1}]}{[\mathrm{Ox_1}]}, \qquad E = E_2^{\circ\prime} - \frac{0.05916}{n_2}\log\frac{[\mathrm{Red_2}]}{[\mathrm{Ox_2}]} .
$$
Multiply the first by $n_1$ and the second by $n_2$ and add:
$$
(n_1 + n_2)E = n_1E_1^{\circ\prime} + n_2E_2^{\circ\prime} - 0.05916\log\frac{[\mathrm{Red_1}][\mathrm{Red_2}]}{[\mathrm{Ox_1}][\mathrm{Ox_2}]} .
$$
The reaction is $n_2\,\mathrm{Red_1} + n_1\,\mathrm{Ox_2} \rightarrow n_2\,\mathrm{Ox_1} + n_1\,\mathrm{Red_2}$. At equivalence the added $\mathrm{Ox_2}$ and the original $\mathrm{Red_1}$ are in the stoichiometric ratio $n_1{:}n_2$, and so are what remains of them; the products are formed in the same ratio. Hence $[\mathrm{Red_1}]/[\mathrm{Ox_2}] = n_2/n_1$ and $[\mathrm{Red_2}]/[\mathrm{Ox_1}] = n_1/n_2$, so the product inside the logarithm is $1$ and the logarithm vanishes, giving [[#eq-redox-eq]]. If $\mathrm{H^+}$ takes part (as for permanganate or dichromate), its concentration survives in the logarithm and $E_\mathrm{eq}$ depends on pH ([[#exr-permanganate-eq]]).
:::

::: widget parametric
fx: (10^((t-E1)/0.05916)/(1+10^((t-E1)/0.05916)))*(1+10^((t-E2)/0.05916))
fy: t
t: 0.4, 1.65
x: 0, 2
y: 0.4, 1.65
sliders: E1=0.68:0.2:1.2:0.01; E2=1.44:0.8:1.7:0.01
trace: false
caption: The titration curve of iron(II) with cerium(IV), potential $E$ in volts against the fraction titrated $\phi$, computed exactly from the two Nernst equations and the electron balance ($n_1 = n_2 = 1$). The defaults are the formal potentials in $1\ \mathrm{mol\,dm^{-3}}$ $\mathrm{H_2SO_4}$: $E^{\circ\prime}(\mathrm{Fe^{3+}/Fe^{2+}}) = 0.68\ \mathrm{V}$ and $E^{\circ\prime}(\mathrm{Ce^{4+}/Ce^{3+}}) = 1.44\ \mathrm{V}$. At $\phi = 0.5$ the potential equals $E_1^{\circ\prime}$, at $\phi = 2$ it equals $E_2^{\circ\prime}$, and at $\phi = 1$ it is their average, $1.06\ \mathrm{V}$, by [[#eq-redox-eq]]. Move the two potentials closer together and the jump shrinks; with less than about $0.2\ \mathrm{V}$ between them no indicator can find it. The curve is independent of dilution, unlike an acid–base curve, because only ratios of concentrations enter.
:::

::: example Standardising permanganate {#ex-permanganate}
$0.2500\ \mathrm{g}$ of dried sodium oxalate ($\mathrm{Na_2C_2O_4}$, $M = 134.00\ \mathrm{g\,mol^{-1}}$) is dissolved in dilute sulfuric acid, warmed, and titrated with potassium permanganate solution; the faint permanent pink appears at $37.20\ \mathrm{cm^3}$. Find the permanganate concentration. Then use the standardised solution: an iron ore sample of $0.4500\ \mathrm{g}$, dissolved and reduced completely to $\mathrm{Fe^{2+}}$, requires $23.45\ \mathrm{cm^3}$. Find the mass fraction of iron.
::: solution
*Standardisation.* The balanced reaction is
$$
2\,\mathrm{MnO_4^-} + 5\,\mathrm{C_2O_4^{2-}} + 16\,\mathrm{H^+} \rightarrow 2\,\mathrm{Mn^{2+}} + 10\,\mathrm{CO_2} + 8\,\mathrm{H_2O}.
$$
$n(\mathrm{C_2O_4^{2-}}) = 0.2500/134.00 = 1.8657\ \mathrm{mmol}$, so $n(\mathrm{MnO_4^-}) = \tfrac25\times1.8657 = 0.74628\ \mathrm{mmol}$ and $c = 0.74628/37.20 = 0.02006\ \mathrm{mol\,dm^{-3}}$.

*Iron.* $\mathrm{MnO_4^-} + 5\,\mathrm{Fe^{2+}} + 8\,\mathrm{H^+} \rightarrow \mathrm{Mn^{2+}} + 5\,\mathrm{Fe^{3+}} + 4\,\mathrm{H_2O}$. $n(\mathrm{Fe}) = 5\times0.02006\times23.45\ \mathrm{mmol} = 2.352\ \mathrm{mmol}$, mass $2.352\times55.845 = 131.4\ \mathrm{mg}$, and $w(\mathrm{Fe}) = 131.4/450.0 = 29.19\ \%$.

The oxalate reaction is slow at first and is catalysed by its own product, $\mathrm{Mn^{2+}}$ — the classic example of autocatalysis — which is why the solution is warmed and the first drops decolourise slowly. Iron ores are traditionally dissolved in hydrochloric acid, but chloride is oxidised by permanganate; the Zimmermann–Reinhardt reagent (manganese(II) sulfate with phosphoric acid) is added to suppress this.
:::
:::

::: quiz
For which titration would a visual end point be *least* feasible?
- [ ] $0.1\ \mathrm{mol\,dm^{-3}}$ acetic acid ($\mathrm{p}K_\mathrm{a} = 4.76$) with $0.1\ \mathrm{mol\,dm^{-3}}$ NaOH.
- [x] $0.01\ \mathrm{mol\,dm^{-3}}$ boric acid ($\mathrm{p}K_\mathrm{a} = 9.24$) with $0.01\ \mathrm{mol\,dm^{-3}}$ NaOH.
- [ ] $0.02\ \mathrm{mol\,dm^{-3}}$ $\mathrm{Ca^{2+}}$ with EDTA at pH 10.
- [ ] $0.1\ \mathrm{mol\,dm^{-3}}$ $\mathrm{Fe^{2+}}$ with $\mathrm{Ce^{4+}}$ in $1\ \mathrm{mol\,dm^{-3}}$ $\mathrm{H_2SO_4}$.
::: solution
For boric acid $C_\mathrm{a}K_\mathrm{a} = 0.01\times5.8\times10^{-10} = 5.8\times10^{-12}$, far below the rule-of-thumb $10^{-8}$; the curve has almost no jump. (Boric acid is titrated after complexation with mannitol or glycerol, which forms a much stronger acid.) Acetic acid gives $C_\mathrm{a}K_\mathrm{a} = 1.7\times10^{-6}$; calcium at pH 10 has $\log K_\mathrm{f}' = 10.1$; iron(II)/cerium(IV) has $0.76\ \mathrm{V}$ between the formal potentials — all three are routine titrations.
:::
:::

## Titration error

An indicator changes colour over a range of about two pH units centred on its $\mathrm{p}K_\mathrm{In}$, and the end point is where we see the change, not where the equivalence point is. Equation [[#eq-titration-curve]] lets us quantify the cost: the fraction titrated when the pH reaches the end point is exactly $\phi_\mathrm{end}$, and the relative titration error is $\phi_\mathrm{end} - 1$. For $0.1\ \mathrm{mol\,dm^{-3}}$ acetic acid, an end point at pH 9.0 gives $\phi = 1.0001$ (error $+0.01\ \%$), at pH 7.0 gives $\phi = 0.9943$ (error $-0.57\ \%$), and at pH 4.0 gives $\phi = 0.147$ — a useless result. The steepness of the curve near equivalence is what makes small pH misjudgements cost little; where the curve is flat, they cost a lot. A related correction is the **indicator blank**: a few hundredths of a cubic centimetre of titrant are needed to change the colour of the indicator itself and of the solvent, and are found by titrating a blank.

## Where this leads

Potentiometric end points — a pH or ion-selective electrode in place of an indicator, located by the maximum slope of the curve — are developed in [[analytical-chemistry/electroanalytical]], along with coulometric titrations in which the titrant is generated electrically and counted in coulombs. The statistical treatment of replicate titrations and the comparison of a titrimetric result with a certified value are those of [[analytical-chemistry/statistics-calibration]]. EDTA and the chelate effect are explained structurally in [[coordination-chemistry/complex-stability]], and the hardness of natural waters in [[environmental-chemistry/natural-waters]].

::: history
Joseph Louis Gay-Lussac put titrimetry on a quantitative footing with his silver assay by titration with sodium chloride (1832), which replaced fire assay at the Paris Mint. Karl Friedrich Mohr's *Lehrbuch der chemisch-analytischen Titrirmethode* (1855) introduced the burette with a pinch-cock and the chromate end point that bears his name, and Jacob Volhard published his thiocyanate method in 1874. Johan Kjeldahl described his nitrogen method, developed at the Carlsberg Laboratory, in 1883. Lev Chugaev introduced dimethylglyoxime as a reagent for nickel in 1905. Gerold Schwarzenbach developed complexometric titration with EDTA and metallochromic indicators in the 1940s, and Anders Ringbom's *Complexation in Analytical Chemistry* (1963) systematised the side-reaction coefficients and conditional constants used in this chapter.
:::

::: summary
- Gravimetry weighs a pure compound of known composition; $m_\mathrm{A} = m_\mathrm{P}\times aM_\mathrm{A}/(pM_\mathrm{P})$.
- Large, pure crystals need low relative supersaturation $(Q-S)/S$: hot, dilute solutions, slow addition, homogeneous precipitation, digestion; colloids are coagulated with electrolyte and washed with a volatile one.
- A titration needs a fast, stoichiometric, complete reaction and an end point close to the equivalence point; titrants are standardised against primary standards.
- The whole acid–base curve follows from the charge balance: $\phi = (\alpha_{\mathrm{A^-}} - \Delta/C_\mathrm{a})/(1 + \Delta/C_\mathrm{b})$; a visual end point needs $C_\mathrm{a}K_\mathrm{a} \gtrsim 10^{-8}$.
- EDTA titrations depend on the conditional constant $K_\mathrm{f}' = \alpha_{\mathrm{Y^{4-}}}K_\mathrm{f}$, so the pH, set by a buffer, controls both feasibility and selectivity.
- Argentometric titrations use the Mohr, Volhard or Fajans end points; each has its pH and interference conditions.
- In redox titrations $E_\mathrm{eq} = (n_1E_1^{\circ\prime} + n_2E_2^{\circ\prime})/(n_1+n_2)$ when no protons take part; the curve is independent of dilution.
- The titration error is $\phi_\mathrm{end} - 1$, read from the exact curve at the end-point pH.
:::

## Exercises

::: exercise Aluminium as the oxide {level=1 check="15.05"}
A $1.2000\ \mathrm{g}$ sample of an alloy yields $0.3412\ \mathrm{g}$ of ignited $\mathrm{Al_2O_3}$ ($M = 101.96\ \mathrm{g\,mol^{-1}}$; $M(\mathrm{Al}) = 26.982\ \mathrm{g\,mol^{-1}}$). Find the mass fraction of aluminium. (Enter it in per cent.)
::: solution
Gravimetric factor $2\times26.982/101.96 = 0.52926$. $m(\mathrm{Al}) = 0.3412\times0.52926 = 0.18058\ \mathrm{g}$; $w = 0.18058/1.2000 = 15.05\ \%$.
:::
:::

::: exercise Water hardness {level=1 check="201"}
A $50.00\ \mathrm{cm^3}$ water sample, buffered at pH 10 with Eriochrome Black T, requires $9.86\ \mathrm{cm^3}$ of $0.01020\ \mathrm{mol\,dm^{-3}}$ EDTA. Express the total hardness as $\mathrm{mg\,dm^{-3}}$ $\mathrm{CaCO_3}$ ($M = 100.09\ \mathrm{g\,mol^{-1}}$). (Enter the hardness.)
::: solution
$n(\mathrm{Ca + Mg}) = 9.86\times0.01020 = 0.1006\ \mathrm{mmol}$ in $50.00\ \mathrm{cm^3}$, i.e. $2.011\ \mathrm{mmol\,dm^{-3}}$. As $\mathrm{CaCO_3}$: $2.011\times100.09 = 201\ \mathrm{mg\,dm^{-3}}$ — "hard" water on the usual classifications.
:::
:::

::: exercise Chloride by Mohr {level=1 check="1981"}
A $10.00\ \mathrm{cm^3}$ sample of a brine is diluted and titrated with $0.02500\ \mathrm{mol\,dm^{-3}}$ $\mathrm{AgNO_3}$ by the Mohr method; the end point is at $22.35\ \mathrm{cm^3}$ after correction for the indicator blank. Find the chloride concentration in the original sample. (Enter it in $\mathrm{mg\,dm^{-3}}$.)
::: solution
$n(\mathrm{Cl^-}) = 22.35\times0.02500 = 0.5588\ \mathrm{mmol}$ in $10.00\ \mathrm{cm^3}$: $55.88\ \mathrm{mmol\,dm^{-3}}$, or $55.88\times35.45 = 1981\ \mathrm{mg\,dm^{-3}}$. The dilution before titration does not enter, because the amount of chloride is what is titrated.
:::
:::

::: exercise Formic acid {level=2 check="8.07"}
$0.0500\ \mathrm{mol\,dm^{-3}}$ formic acid ($\mathrm{p}K_\mathrm{a} = 3.75$) is titrated with $0.0500\ \mathrm{mol\,dm^{-3}}$ NaOH. Find the pH at the equivalence point and suggest an indicator. (Enter the pH.)
::: solution
At equivalence the solution is $0.0250\ \mathrm{mol\,dm^{-3}}$ formate (dilution by $2$). $K_\mathrm{b} = 10^{-14}/10^{-3.75} = 5.62\times10^{-11}$; $[\mathrm{OH^-}] = \sqrt{5.62\times10^{-11}\times0.0250} = 1.19\times10^{-6}$; $\mathrm{pOH} = 5.93$; $\mathrm{pH} = 8.07$. Phenolphthalein (8.2–10) or thymol blue (8.0–9.6) is suitable; the end-point error from phenolphthalein's slightly high transition is negligible because the curve is steep there.
:::
:::

::: exercise EDTA at a lower pH {level=2 check="8.27"}
Using $\alpha_{\mathrm{Y^{4-}}} = 4.19\times10^{-3}$ at pH 8.00 and $\log K_\mathrm{f}(\mathrm{CaY^{2-}}) = 10.65$, find $\log K_\mathrm{f}'$ for calcium at pH 8.00. Could magnesium ($\log K_\mathrm{f} = 8.79$) be titrated at this pH? (Enter $\log K_\mathrm{f}'$ for calcium.)
::: solution
$\log K_\mathrm{f}' = 10.65 + \log(4.19\times10^{-3}) = 10.65 - 2.38 = 8.27$. Calcium is (just) titratable. For magnesium, $\log K_\mathrm{f}' = 8.79 - 2.38 = 6.41$: too small for a sharp end point. At pH 8 calcium could in principle be titrated in the presence of magnesium, though in practice the end-point sharpness is marginal and calcium is usually determined at pH 12–13 after precipitating magnesium hydroxide.
:::
:::

::: exercise Kjeldahl nitrogen {level=2 check="8.88"}
The ammonia from the Kjeldahl digestion of $0.5000\ \mathrm{g}$ of a food is distilled into $50.00\ \mathrm{cm^3}$ of $0.1000\ \mathrm{mol\,dm^{-3}}$ HCl. The excess acid requires $18.30\ \mathrm{cm^3}$ of $0.1000\ \mathrm{mol\,dm^{-3}}$ NaOH. Find the mass fraction of nitrogen, and the protein content using the conventional factor $6.25$. (Enter the nitrogen in per cent.)
::: solution
Acid taken: $5.000\ \mathrm{mmol}$; acid left: $1.830\ \mathrm{mmol}$; acid consumed by ammonia: $3.170\ \mathrm{mmol} = n(\mathrm{N})$. Mass of N: $3.170\times14.007 = 44.40\ \mathrm{mg}$; $w(\mathrm{N}) = 44.40/500.0 = 8.88\ \%$. Protein $\approx 6.25\times8.88 = 55.5\ \%$. The factor $6.25$ assumes protein is $16\ \%$ nitrogen; it is a convention, and nitrogen from non-protein sources (such as the melamine added fraudulently to milk products in 2008) is counted as protein by this method — a reminder that a method measures what it measures, not what we hope it measures.
:::
:::

::: exercise The permanganate equivalence point {#exr-permanganate-eq level=3 check="1.305"}
Derive the equivalence-point potential for the titration of $\mathrm{Fe^{2+}}$ with $\mathrm{MnO_4^-}$, where the permanganate half-reaction is $\mathrm{MnO_4^-} + 8\,\mathrm{H^+} + 5\,\mathrm{e^-} \rightleftharpoons \mathrm{Mn^{2+}} + 4\,\mathrm{H_2O}$. Evaluate it at pH 1.00, using $E^\circ(\mathrm{Fe^{3+}/Fe^{2+}}) = 0.771\ \mathrm{V}$ and $E^\circ(\mathrm{MnO_4^-/Mn^{2+}}) = 1.507\ \mathrm{V}$ (standard potentials, CRC Handbook). (Enter $E_\mathrm{eq}$ in V.)
::: hint
Add the iron Nernst equation to five times the permanganate one. At equivalence $[\mathrm{Fe^{3+}}] = 5[\mathrm{Mn^{2+}}]$ and $[\mathrm{Fe^{2+}}] = 5[\mathrm{MnO_4^-}]$.
:::
::: solution
$E = 0.771 - 0.05916\log([\mathrm{Fe^{2+}}]/[\mathrm{Fe^{3+}}])$ and $5E = 5\times1.507 - 0.05916\log([\mathrm{Mn^{2+}}]/([\mathrm{MnO_4^-}][\mathrm{H^+}]^8))$. Adding,
$$
6E = 0.771 + 7.535 - 0.05916\log\frac{[\mathrm{Fe^{2+}}][\mathrm{Mn^{2+}}]}{[\mathrm{Fe^{3+}}][\mathrm{MnO_4^-}][\mathrm{H^+}]^8} .
$$
With the equivalence relations the concentration ratio is $1/[\mathrm{H^+}]^8$, so $6E = 8.306 + 8\times0.05916\log[\mathrm{H^+}]$ and
$$
E_\mathrm{eq} = \frac{E_\mathrm{Fe}^\circ + 5E_\mathrm{Mn}^\circ}{6} - \frac{8}{6}\,(0.05916)\,\mathrm{pH} = 1.3843 - 0.0789 = 1.305\ \mathrm{V}
$$
at pH 1.00. The equivalence point lies close to the permanganate potential because five electrons weight it, and it falls by $79\ \mathrm{mV}$ per pH unit.
:::
:::

::: exercise The cost of the wrong indicator {level=3 check="-0.57"}
Use [[#eq-titration-curve]] to find the relative titration error (in per cent) when $0.1000\ \mathrm{mol\,dm^{-3}}$ acetic acid is titrated with $0.1000\ \mathrm{mol\,dm^{-3}}$ NaOH to an end point at pH 7.00 (bromothymol blue). Explain why the error is negative and why most of it comes from the $\alpha$ term. (Enter the error in per cent.)
::: hint
At pH 7.00, $[\mathrm{H^+}] = [\mathrm{OH^-}]$, so $\Delta = 0$ and $\phi = \alpha_{\mathrm{A^-}}$.
:::
::: solution
At pH 7.00, $\Delta = 0$ and $\phi = K_\mathrm{a}/([\mathrm{H^+}] + K_\mathrm{a}) = 1.738\times10^{-5}/(1.0\times10^{-7} + 1.738\times10^{-5}) = 0.99428$. The error is $(0.99428 - 1)\times100 = -0.57\ \%$. It is negative because the end point comes before equivalence: at pH 7 about $0.6\ \%$ of the acetic acid remains un-neutralised, which is exactly the $\alpha$ term — the equivalence point of a weak acid lies on the basic side, so stopping at neutral pH stops too early. With phenolphthalein (end point near pH 9) the error is $+0.01\ \%$.
:::
:::
