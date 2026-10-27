An iron nail left in damp air rusts; the same nail, painted, lasts for decades; a stainless-steel spoon in the same air stays bright; and a steel ship's hull fitted with a few blocks of zinc can sit in seawater for years while the zinc dissolves instead. Iron is thermodynamically unstable in air and water at every pH — its standard potential lies well below that of the oxygen electrode — so all these differences are differences of *rate*. Corrosion is electrochemistry without wires: the metal surface is at once the anode, where metal dissolves, and the cathode, where oxygen or water is reduced, and the electrons pass through the metal from one to the other. Everything in the previous chapters — Nernst potentials, Butler–Volmer kinetics, mass-transport limits, passivating films — reappears here, and the result is a quantitative theory of a problem that costs a few per cent of the world's economic output. The NACE IMPACT study (2016) estimated the global cost of corrosion at about US\$2.5 trillion for 2013, roughly $3.4\,\%$ of world GDP, and suggested that $15$–$35\,\%$ of it could be avoided with existing methods.

This chapter covers the thermodynamics of corrosion through Pourbaix diagrams; the kinetics through mixed-potential theory and Evans diagrams; how corrosion rates are measured and converted into penetration rates; galvanic coupling, passivity and localised attack; and the methods of protection — coatings, inhibitors and cathodic protection.

## Corrosion as a short-circuited cell

::: definition Corrosion, corrosion potential and corrosion current {#def-corrosion}
**Aqueous corrosion** is the electrochemical oxidation of a metal by its environment through two coupled reactions on the same surface: an **anodic** reaction, metal dissolution or oxidation, e.g. $\mathrm{Fe \rightarrow Fe^{2+} + 2e^-}$; and a **cathodic** reaction that consumes the electrons, usually oxygen reduction ($\mathrm{O_2 + 2H_2O + 4e^- \rightarrow 4OH^-}$ in neutral or alkaline water; $\mathrm{O_2 + 4H^+ + 4e^- \rightarrow 2H_2O}$ in acid) or hydrogen evolution ($\mathrm{2H^+ + 2e^- \rightarrow H_2}$, or from water in neutral solution). With no external current, the metal settles at the **corrosion potential** $E_\mathrm{corr}$ (a **mixed potential**) at which the total anodic and cathodic currents are equal and opposite; their common magnitude is the **corrosion current** $I_\mathrm{corr}$ (density $i_\mathrm{corr}$).
:::

The corrosion potential is not an equilibrium potential: two different reactions run simultaneously in opposite directions, neither at equilibrium, and the metal sits at whatever potential balances their rates. Carl Wagner and Wilhelm Traud put this idea on a quantitative footing in 1938. A familiar demonstration is the **Evans drop**: a drop of salt water containing an indicator for $\mathrm{Fe^{2+}}$ and one for $\mathrm{OH^-}$ on a clean iron surface soon shows iron dissolving at the centre of the drop, where oxygen is depleted, and hydroxide forming at the edge, where oxygen diffuses in readily — the anode and cathode are separated by millimetres, and rust ($\mathrm{FeOOH}$ and related hydrous oxides) precipitates between them where $\mathrm{Fe^{2+}}$ meets $\mathrm{OH^-}$ and oxygen.

## Thermodynamics: Pourbaix diagrams

Whether corrosion is possible at all depends on potential and pH, and Marcel Pourbaix's diagrams (his *Atlas of Electrochemical Equilibria in Aqueous Solutions*, 1963) map the answer. Each line is a Nernst equation ([[electrochemistry/cell-thermodynamics#prop-nernst]]) for an equilibrium between two species, at a chosen activity of dissolved species, conventionally $10^{-6}$ — the level below which a metal is regarded as practically not dissolving.

::: definition Pourbaix diagram {#def-pourbaix}
A **Pourbaix diagram** (potential–pH diagram) of a metal in water at a fixed temperature shows the regions of potential $E$ (vs SHE) and pH in which each species — metal, dissolved ions, oxides or hydroxides — is thermodynamically stable, for a specified activity of dissolved species. Three kinds of line separate the regions: horizontal lines for electron transfers without protons, vertical lines for acid–base or precipitation equilibria without electron transfer, and sloping lines (slope $-59.16\,m/n\ \mathrm{mV}$ per pH unit at $25\,^\circ\mathrm{C}$) for reactions with $m$ protons and $n$ electrons. The regions are classified as **immunity** (metal stable), **corrosion** (soluble species stable) and **passivation** (a solid oxide or hydroxide stable, which may or may not protect the metal).
:::

For iron, three lines suffice for a first sketch. The $\mathrm{Fe^{2+}/Fe}$ boundary at $a(\mathrm{Fe^{2+}}) = 10^{-6}$ is horizontal at $E = -0.447 + (0.05916/2)\log10^{-6} = -0.62\ \mathrm{V}$. The $\mathrm{Fe^{3+}/Fe^{2+}}$ boundary is horizontal at $0.77\ \mathrm{V}$ for equal activities. The boundary between dissolved $\mathrm{Fe^{2+}}$ and haematite, $\mathrm{Fe_2O_3 + 6H^+ + 2e^- \rightarrow 2Fe^{2+} + 3H_2O}$, has $m/n = 3$ and slope $-0.177\ \mathrm{V}$ per pH unit; with Pourbaix's data ($E^\circ = 0.728\ \mathrm{V}$) and $a(\mathrm{Fe^{2+}}) = 10^{-6}$ it is $E = 1.083 - 0.177\,\mathrm{pH}$.

::: widget plot
f: 1.229 - 0.0591563*x; -0.0591563*x; -0.624 + 0*x; 1.083 - 0.1773*x; 0.771 + 0*x
x: 0, 14
y: -1.2, 1.6
labels: \mathrm{O_2/H_2O}; \mathrm{H^+/H_2}; \mathrm{Fe^{2+}/Fe}; \mathrm{Fe_2O_3/Fe^{2+}}; \mathrm{Fe^{3+}/Fe^{2+}}
caption: A simplified Pourbaix diagram for iron at $25\,^\circ\mathrm{C}$ (dissolved iron at activity $10^{-6}$; potential vs SHE against pH). Below the $\mathrm{Fe^{2+}/Fe}$ line (and, at high pH, below the iron/oxide lines not drawn here) iron is immune. Above it, to the left of the sloping $\mathrm{Fe_2O_3/Fe^{2+}}$ line and below $\mathrm{Fe^{3+}/Fe^{2+}}$, dissolved $\mathrm{Fe^{2+}}$ is stable: active corrosion. To the right of the sloping line, haematite is stable: the passive region. Water itself is stable between the two water lines. Iron's immunity line lies below the hydrogen line at every pH up to about 10, so in deaerated acid iron corrodes with hydrogen evolution, and in aerated water at pH 7 the oxygen line (at $0.82\ \mathrm{V}$) lies far above everything — corrosion is always thermodynamically possible. Note where steel in concrete sits: pore water at pH 12.5–13 puts it in the passive region, which chloride or carbonation (lowering the pH) can destroy.
:::

::: example Copper in acid, with and without air {#ex-copper}
Using $E^\circ(\mathrm{Cu^{2+}/Cu}) = +0.340\ \mathrm{V}$, decide whether copper corrodes at $25\,^\circ\mathrm{C}$ in (a) deaerated $1\ \mathrm{mol\,dm^{-3}}$ hydrochloric acid (pH 0, $p(\mathrm{H_2}) \le 1\ \mathrm{bar}$) and (b) the same acid saturated with air, taking $a(\mathrm{Cu^{2+}}) = 10^{-6}$ as the corrosion criterion. Ignore complexation of copper by chloride.
::: solution
The copper immunity line is at $E = 0.340 + (0.025693/2)\ln10^{-6} = 0.340 - 0.178 = 0.163\ \mathrm{V}$. (a) The only oxidant is $\mathrm{H^+}$, whose equilibrium potential at pH 0 is $0\ \mathrm{V}$ (or slightly positive if the hydrogen pressure is well below $1\ \mathrm{bar}$: at $10^{-6}\ \mathrm{bar}$ it is $+0.18\ \mathrm{V}$, so in rigorously hydrogen-free acid a trace of dissolution is possible). For $\mathrm{Cu + 2H^+ \rightarrow Cu^{2+} + H_2}$ to proceed, the copper couple must lie below the hydrogen couple; at $0.163\ \mathrm{V}$ against $0\ \mathrm{V}$ it does not, so copper is practically immune — which is why copper vessels survive non-oxidising acids. (b) With dissolved oxygen the cathodic couple is $\mathrm{O_2/H_2O}$ at $1.229 + (0.05916/4)\log0.21 = 1.219\ \mathrm{V}$, far above $0.163\ \mathrm{V}$: copper corrodes, at a rate limited by oxygen transport. In practice chloride complexes copper(I) strongly ($\mathrm{CuCl_2^-}$), lowering the immunity line further, so aerated hydrochloric acid attacks copper quite readily.
:::
:::

The diagram explains the three classical protection strategies at a glance. Lower the potential into immunity — **cathodic protection**. Raise the pH, or the potential, into passivity — alkaline environments, anodic protection, passivating inhibitors. Or keep water and oxygen away from the surface — coatings. What the diagram cannot say is how fast anything happens, and it ignores the role of other species: chloride, which forms soluble complexes and breaks down oxide films, and sulfide, which forms its own solid phases.

::: warning A Pourbaix diagram is not a corrosion-rate chart {#warn-pourbaix}
Three misreadings are common. (1) "Passive region means no corrosion." The diagram only says an oxide is thermodynamically stable; whether that oxide forms a compact, adherent film (as $\mathrm{Cr_2O_3}$ on stainless steel does) or a porous, flaking rust (as hydrated iron oxides at near-neutral pH often do) is a matter of kinetics and microstructure. (2) "The corrosion region means rapid corrosion." Aluminium sits in a corrosion region in strongly acidic and alkaline solutions, but a thin film may slow dissolution greatly at intermediate pH even where the diagram promises little. (3) "The diagram applies to my solution." It applies to pure water with the chosen activity of metal ions, at $25\,^\circ\mathrm{C}$; chloride, complexing agents, temperature and alloying change the lines. Use Pourbaix diagrams to rule corrosion *out* (immunity) or to suggest strategies, never to predict a rate.
:::

## Kinetics: mixed potentials and Evans diagrams

The rate of corrosion is decided by the kinetics of the two half-reactions, each following Butler–Volmer kinetics about its own equilibrium potential ([[electrochemistry/electrode-kinetics#prop-bv]]). On a plot of $\log_{10}|i|$ against $E$ — an **Evans diagram**, after Ulick Richardson Evans — each half-reaction far from its own equilibrium is a straight Tafel line, and the corrosion potential and current are read from their intersection.

::: proposition Corrosion potential and current from Tafel kinetics {#prop-mixed}
Let the anodic dissolution of the metal follow $i_\mathrm{a} = i_{0,\mathrm{M}}\,10^{(E - E_\mathrm{M})/b_\mathrm{a}}$ and the cathodic reaction follow $|i_\mathrm{c}| = i_{0,\mathrm{X}}\,10^{-(E - E_\mathrm{X})/b_\mathrm{c}}$, with $E_\mathrm{M}$ and $E_\mathrm{X}$ their equilibrium potentials, $i_0$ their exchange current densities on the metal, and $b_\mathrm{a}, b_\mathrm{c} > 0$ their Tafel slopes (V per decade). If both are in their Tafel regions at the corrosion potential (i.e. $E_\mathrm{M} \ll E_\mathrm{corr} \ll E_\mathrm{X}$ on the scale of $b$), then
$$
E_\mathrm{corr} = \frac{b_\mathrm{a}b_\mathrm{c}}{b_\mathrm{a} + b_\mathrm{c}}\left[\log_{10}\frac{i_{0,\mathrm{X}}}{i_{0,\mathrm{M}}} + \frac{E_\mathrm{M}}{b_\mathrm{a}} + \frac{E_\mathrm{X}}{b_\mathrm{c}}\right], \qquad
\log_{10}i_\mathrm{corr} = \log_{10}i_{0,\mathrm{M}} + \frac{E_\mathrm{corr} - E_\mathrm{M}}{b_\mathrm{a}} .
$$ {#eq-mixed}
:::

::: proof
At open circuit the net current is zero, so $i_\mathrm{a}(E_\mathrm{corr}) = |i_\mathrm{c}(E_\mathrm{corr})|$. Taking logarithms,
$$
\log_{10}i_{0,\mathrm{M}} + \frac{E_\mathrm{corr} - E_\mathrm{M}}{b_\mathrm{a}} = \log_{10}i_{0,\mathrm{X}} - \frac{E_\mathrm{corr} - E_\mathrm{X}}{b_\mathrm{c}} .
$$
Collect the $E_\mathrm{corr}$ terms: $E_\mathrm{corr}(1/b_\mathrm{a} + 1/b_\mathrm{c}) = \log_{10}(i_{0,\mathrm{X}}/i_{0,\mathrm{M}}) + E_\mathrm{M}/b_\mathrm{a} + E_\mathrm{X}/b_\mathrm{c}$, and $1/(1/b_\mathrm{a} + 1/b_\mathrm{c}) = b_\mathrm{a}b_\mathrm{c}/(b_\mathrm{a} + b_\mathrm{c})$. The corrosion current is either partial current at $E_\mathrm{corr}$. The Tafel forms are valid because at $E_\mathrm{corr}$ each reaction is far from its own equilibrium, so its back reaction (metal deposition; hydrogen oxidation) is negligible.
:::

::: example Iron in deaerated acid {#ex-evans}
Iron corrodes in deaerated $1\ \mathrm{mol\,dm^{-3}}$ acid (pH 0, so $E_\mathrm{H} = 0$). Take for iron dissolution $E_\mathrm{Fe} = -0.44\ \mathrm{V}$, $i_{0,\mathrm{Fe}} = 1.0\times10^{-8}\ \mathrm{A\,cm^{-2}}$, $b_\mathrm{a} = 0.060\ \mathrm{V}$, and for hydrogen evolution on iron $i_{0,\mathrm{H}} = 1.0\times10^{-6}\ \mathrm{A\,cm^{-2}}$, $b_\mathrm{c} = 0.120\ \mathrm{V}$. Find $E_\mathrm{corr}$, $i_\mathrm{corr}$ and the penetration rate.
::: solution
From [[#eq-mixed]], $b_\mathrm{a}b_\mathrm{c}/(b_\mathrm{a} + b_\mathrm{c}) = 0.0072/0.180 = 0.0400\ \mathrm{V}$, and
$$
E_\mathrm{corr} = 0.0400\left[\log_{10}100 + \frac{-0.44}{0.060} + \frac{0}{0.120}\right]\ \mathrm{V} = 0.0400\,(2 - 7.333)\ \mathrm{V} = -0.213\ \mathrm{V} .
$$
Then $\log_{10}i_\mathrm{corr} = -8 + (-0.213 + 0.44)/0.060 = -8 + 3.78 = -4.22$, so $i_\mathrm{corr} = 6.0\times10^{-5}\ \mathrm{A\,cm^{-2}}$. By Faraday's law (next proposition) this is $0.70\ \mathrm{mm}$ per year. The corrosion potential lies between the two equilibrium potentials, at a position fixed by the exchange currents and Tafel slopes — here almost midway. Halving $i_{0,\mathrm{H}}$, for instance by adding a trace of an inhibitor that blocks hydrogen-evolution sites, would lower $i_\mathrm{corr}$ by a factor of $2^{b_\mathrm{a}/(b_\mathrm{a}+b_\mathrm{c})} = 2^{1/3} = 1.26$.
:::
:::

::: widget plot
f: lM + (x - EM)/ba; lH - (x + 0.0591563*pH)/bc
x: -1, 0.3
y: -10, 0
sliders: EM=-0.44:-0.9:0:0.01; lM=-8:-10:-4:0.1; ba=0.06:0.03:0.12:0.005; lH=-6:-12:-3:0.1; bc=0.12:0.06:0.2:0.005; pH=0:0:7:0.1
labels: \text{metal dissolution } \log_{10}i_\mathrm{a}; \text{hydrogen evolution } \log_{10}|i_\mathrm{c}|
caption: Evans diagram for a metal corroding with hydrogen evolution: $\log_{10}$ of the partial current densities (in $\mathrm{A\,cm^{-2}}$) against potential $E$ in volts vs SHE ($x$). The anodic line starts from the metal's equilibrium potential $E_\mathrm{M}$ and exchange current $10^{\mathrm{lM}}$; the cathodic line from the hydrogen potential $-0.0592\,\mathrm{pH}$ and $10^{\mathrm{lH}}$. Their intersection is $(E_\mathrm{corr}, \log i_\mathrm{corr})$, as in [[#ex-evans]] by default. Raise the pH and the cathodic line moves left, lowering the corrosion rate; lower $\mathrm{lH}$ (a poor catalyst for hydrogen evolution, as on zinc or lead) and corrosion slows dramatically even though the thermodynamic driving force is unchanged. Changing $E_\mathrm{M}$ shows that a more active metal (more negative $E_\mathrm{M}$) need not corrode faster: kinetics, not the electrochemical series, decides.
:::

::: proposition Faraday's law for corrosion rates {#prop-faraday}
A metal of molar mass $M$ and density $\rho$ dissolving as $\mathrm{M^{n+}}$ at uniform corrosion current density $i_\mathrm{corr}$ loses mass at the rate $i_\mathrm{corr}M/nF$ per unit area, and its surface recedes at the **penetration rate**
$$
\frac{\mathrm{d}x}{\mathrm{d}t} = \frac{i_\mathrm{corr}M}{nF\rho} .
$$ {#eq-penetration}
For iron ($n = 2$), $1\ \mu\mathrm{A\,cm^{-2}}$ corresponds to $11.6\ \mu\mathrm{m}$ per year.
:::

::: proof
Charge $i_\mathrm{corr}\,\mathrm{d}t$ per unit area dissolves $i_\mathrm{corr}\,\mathrm{d}t/nF$ moles of metal (Faraday's law), mass $Mi_\mathrm{corr}\,\mathrm{d}t/nF$, volume $Mi_\mathrm{corr}\,\mathrm{d}t/(nF\rho)$ per unit area, which is the thickness lost. For iron: $1.0\times10^{-6}\ \mathrm{A\,cm^{-2}}\times55.85\ \mathrm{g\,mol^{-1}}/(2\times96\,485\ \mathrm{C\,mol^{-1}}\times7.87\ \mathrm{g\,cm^{-3}}) = 3.68\times10^{-11}\ \mathrm{cm\,s^{-1}}$; times $3.156\times10^{7}\ \mathrm{s}$ per year, $1.16\times10^{-3}\ \mathrm{cm} = 11.6\ \mu\mathrm{m}$ per year. The formula assumes uniform attack; localised corrosion concentrates the same current on a small area and penetrates far faster.
:::

### Oxygen-limited corrosion

In neutral, aerated water the cathodic reaction is oxygen reduction, and its rate is usually limited not by kinetics but by the diffusion of dissolved oxygen, whose solubility is only about $0.26\ \mathrm{mmol\,dm^{-3}}$ in air-saturated water at $25\,^\circ\mathrm{C}$. On the Evans diagram the cathodic line becomes a vertical plateau at the limiting current density $i_\mathrm{l} = 4FD_{\mathrm{O_2}}c_{\mathrm{O_2}}/\delta$ ([[electrochemistry/voltammetry]]), and as long as the anodic line crosses it on the plateau, $i_\mathrm{corr} = i_\mathrm{l}$, independent of the metal's own kinetics. With $D = 2.0\times10^{-5}\ \mathrm{cm^2\,s^{-1}}$, $c = 2.6\times10^{-7}\ \mathrm{mol\,cm^{-3}}$ and a stagnant boundary layer of $\delta = 1\ \mathrm{mm}$, $i_\mathrm{l} = 2.0\times10^{-5}\ \mathrm{A\,cm^{-2}}$, or $0.23\ \mathrm{mm}$ of steel per year. This is why the corrosion rate of steel in natural waters depends so strongly on flow (which thins $\delta$), on temperature (which changes both $D$ and the solubility) and on oxygen content — and why deaeration of boiler feedwater is the first line of defence in power stations.

## Measuring corrosion rates

Weight-loss coupons exposed for months remain the reference method, but electrochemistry measures corrosion rates in minutes, without removing the metal from service.

::: proposition The Stern–Geary relation {#prop-stern-geary}
Near the corrosion potential, the net current density $i$ at a small polarisation $\Delta E = E - E_\mathrm{corr}$ is linear in $\Delta E$, and the **polarisation resistance** $R_\mathrm{p} = (\mathrm{d}\Delta E/\mathrm{d}i)_{\Delta E\rightarrow0}$ (in $\Omega\,\mathrm{cm^2}$) gives the corrosion current density:
$$
i_\mathrm{corr} = \frac{B}{R_\mathrm{p}}, \qquad B = \frac{b_\mathrm{a}b_\mathrm{c}}{2.303\,(b_\mathrm{a} + b_\mathrm{c})} ,
$$ {#eq-stern-geary}
with $b_\mathrm{a}$ and $b_\mathrm{c}$ the Tafel slopes of the anodic and cathodic reactions. The relation holds when both reactions are under activation (Tafel) control at $E_\mathrm{corr}$.
:::

::: proof
Write the partial currents relative to the corrosion potential: $i_\mathrm{a} = i_\mathrm{corr}\,10^{\Delta E/b_\mathrm{a}}$ and $|i_\mathrm{c}| = i_\mathrm{corr}\,10^{-\Delta E/b_\mathrm{c}}$, which equal $i_\mathrm{corr}$ at $\Delta E = 0$ by definition. The net current is
$$
i = i_\mathrm{corr}\left[10^{\Delta E/b_\mathrm{a}} - 10^{-\Delta E/b_\mathrm{c}}\right] = i_\mathrm{corr}\left[\mathrm{e}^{2.303\Delta E/b_\mathrm{a}} - \mathrm{e}^{-2.303\Delta E/b_\mathrm{c}}\right] .
$$
For small $\Delta E$, expand both exponentials to first order: $i \approx i_\mathrm{corr}\,2.303\,\Delta E\,(1/b_\mathrm{a} + 1/b_\mathrm{c})$. Hence $R_\mathrm{p} = \Delta E/i = (b_\mathrm{a}b_\mathrm{c})/[2.303\,i_\mathrm{corr}(b_\mathrm{a} + b_\mathrm{c})]$, which rearranges to [[#eq-stern-geary]]. This is the corrosion analogue of the charge-transfer resistance $RT/Fj_0$ of [[electrochemistry/electrode-kinetics#prop-limits]], with the corrosion current playing the role of the exchange current. If the cathodic reaction is diffusion-limited, $b_\mathrm{c} \rightarrow \infty$ and $B = b_\mathrm{a}/2.303$.
:::

::: example A linear-polarisation measurement {#ex-rp}
A steel probe in cooling water shows a polarisation resistance of $500\ \Omega\,\mathrm{cm^2}$, measured with a $\pm10\ \mathrm{mV}$ sweep about $E_\mathrm{corr}$. Taking $b_\mathrm{a} = 0.060$ and $b_\mathrm{c} = 0.120\ \mathrm{V}$ per decade, find $i_\mathrm{corr}$ and the penetration rate.
::: solution
$B = 0.060\times0.120/(2.303\times0.180)\ \mathrm{V} = 0.0174\ \mathrm{V}$, so $i_\mathrm{corr} = 0.0174/500\ \mathrm{A\,cm^{-2}} = 3.5\times10^{-5}\ \mathrm{A\,cm^{-2}}$, i.e. $35\ \mu\mathrm{A\,cm^{-2}}$. With [[#prop-faraday]], $35\times11.6\ \mu\mathrm{m}$ per year $= 0.40\ \mathrm{mm}$ per year — a rate that would call for an inhibitor. $B$ varies only between about $0.013$ and $0.052\ \mathrm{V}$ for realistic Tafel slopes, so even an estimated $B$ gives $i_\mathrm{corr}$ within a factor of two, which is enough to rank treatments and detect upsets; the solution resistance must be subtracted from the measured resistance for low-conductivity waters ([[electrochemistry/conductivity]]).
:::
:::

## Galvanic corrosion, passivity and localised attack

When two different metals are in electrical contact in the same electrolyte, they share one mixed potential. The more active metal (lower corrosion potential in that environment) is polarised anodically and corrodes faster; the more noble one is polarised cathodically and corrodes more slowly or not at all. The ranking that matters is the **galvanic series** — corrosion potentials measured in a specific environment such as seawater — not the table of standard potentials: in seawater the sequence runs roughly magnesium, zinc, aluminium alloys, carbon steel, lead, brasses, copper, nickel alloys, passive stainless steels, titanium, graphite, platinum. The galvanic series is empirical and depends on the environment; aluminium, for instance, is more active than zinc in the standard series but often more noble in practice because of its oxide film.

The **area ratio** decides the severity. In oxygen-limited conditions the total cathodic current is the limiting current density times the *cathode* area, and all of it must be supplied by dissolving the *anode*. A small anode coupled to a large cathode — steel rivets in a copper sheet, a scratch in a noble coating — corrodes very fast; a large anode with a small cathode is relatively harmless. This is why steel is coated with zinc (a sacrificial, more active coating: a scratch exposes a small cathode in a large anode) rather than with copper or tin, which protect only while intact.

**Passivity** is the remarkable ability of some metals to become almost inert when their potential is raised. On the polarisation curve of iron in sulfuric acid, the anodic current rises with potential as for any active metal, then, at the **passivation (Flade) potential**, falls by three to six orders of magnitude as a nanometre-thick oxide film forms; it stays low over a wide **passive range**, and rises again only at the **transpassive** potential where the film itself oxidises or oxygen is evolved. Faraday and Schönbein studied the passivity of iron in concentrated nitric acid in the 1830s. Stainless steels contain at least $10.5\,\%$ chromium (by European standard definition), enough for a continuous $\mathrm{Cr_2O_3}$-rich film that passivates spontaneously in air and water; passive current densities are of order $0.1$–$1\ \mu\mathrm{A\,cm^{-2}}$, below a micrometre a year.

Passivity has an Achilles heel: **localised corrosion**. Chloride ions adsorb on the passive film and, above a **pitting potential**, break it down at weak points (inclusions such as manganese sulfide, grain boundaries). Inside a pit, dissolving metal ions hydrolyse, $\mathrm{M^{2+} + H_2O \rightarrow MOH^+ + H^+}$, the pH falls, chloride migrates in to balance the charge, and the pit becomes an acidic, chloride-rich microenvironment in which the film cannot re-form — an autocatalytic cell with a tiny anode and the whole passive surface as cathode. **Crevice corrosion** works the same way under gaskets and deposits where oxygen is depleted, and **stress-corrosion cracking** combines localised attack with tensile stress. These forms cause most sudden failures because they penetrate deeply while the overall mass loss is small. Molybdenum and nitrogen additions (as in grade 316 compared with 304) raise the pitting resistance.

::: quiz
A steel tank is coated with an organic paint that is scratched in one small spot, exposing bare steel. In seawater, the scratch will corrode
- [ ] more slowly than an uncoated tank, because only a small area is exposed
- [x] at a high local rate if the paint is a poor insulator and the rest of the surface can act as cathode, or at a rate set by the exposed area alone if the paint is insulating
- [ ] not at all, because the paint is more noble than steel
- [ ] at the same rate per unit area as an uncoated tank in every case
::: solution
Most organic coatings are good insulators and do not act as cathodes, so a scratch corrodes like a small bare area of steel (oxygen reduction occurring on the exposed steel itself) and, with no sacrificial action, the attack also undercuts the paint. If instead the coating or surface around the defect can support the cathodic reaction (a noble metal coating, or mill scale, which conducts electrons), the large cathode drives intense attack at the small anode. In neither case does the paint "protect electrochemically"; that needs a sacrificial coating such as zinc, or cathodic protection.
:::
:::

## Protection

**Coatings** separate the metal from its environment: paints and polymers (barrier coatings, often with inhibitive pigments), metallic coatings that are more noble (chromium, nickel, tin — protective only while intact) or less noble (zinc, by hot-dip galvanising, and zinc–aluminium alloys — sacrificial), and conversion coatings such as phosphate and anodised aluminium oxide. **Inhibitors** are substances added in small amounts to the environment. Anodic inhibitors (formerly chromate, now molybdate, nitrite, phosphate) promote passivation; cathodic inhibitors (zinc salts, polyphosphates) precipitate on cathodic sites or slow oxygen reduction; and adsorption inhibitors (amines, imidazolines, thiourea derivatives) adsorb on the surface ([[electrochemistry/double-layer]]) and block both reactions. Chromate, once the standard, is now restricted because chromium(VI) compounds are carcinogenic (GHS category 1). **Design** matters as much as chemistry: avoiding crevices, dissimilar-metal contacts and water traps, and allowing for corrosion in wall thickness.

::: algorithm Choosing and sizing cathodic protection {#alg-cp}
1. **Criterion.** Decide the protection potential. For carbon steel in soil or water the classical criterion is $-0.85\ \mathrm{V}$ against a saturated copper–copper sulfate reference (about $-0.80\ \mathrm{V}$ against silver–silver chloride in seawater), i.e. below the steel's corrosion potential by enough to bring the residual anodic current to a negligible level; more negative potentials waste current and can cause hydrogen embrittlement of high-strength steels and coating disbondment.
2. **Current demand.** Estimate the bare (or coating-defect) area $A$ and the current density $i_\mathrm{p}$ needed to reach the criterion — roughly the limiting oxygen-reduction current, from tens of $\mathrm{mA\,m^{-2}}$ in buried soil to $100$–$200\ \mathrm{mA\,m^{-2}}$ in flowing seawater. The current is $I = Ai_\mathrm{p}$.
3. **Method.** For small currents and conductive environments (seawater), use **sacrificial anodes** of zinc, aluminium alloys or magnesium, which supply the current by their own corrosion. For large structures or resistive soils, use **impressed current** from a rectifier through inert anodes (mixed-metal oxide on titanium, high-silicon iron, graphite).
4. **Anode mass and life.** For sacrificial anodes, the mass needed for a design life $t$ is $m = It/(\varepsilon q)$, with $q$ the theoretical capacity in $\mathrm{Ah\,kg^{-1}}$ (numerically equal to $nF/3.6M$ in $\mathrm{mAh\,g^{-1}}$, [[electrochemistry/batteries#eq-capacity]]) and $\varepsilon$ the anode's current efficiency.
5. **Verify.** Measure structure-to-electrolyte potentials along the structure, correcting for the ohmic drop in the soil or water, and repeat periodically.
:::

::: example Sacrificial anodes for a ship's hull {#ex-cp}
A steel hull has $20\ \mathrm{m^2}$ of exposed steel where its coating is damaged, and requires $0.10\ \mathrm{A\,m^{-2}}$ for cathodic protection in seawater. What mass of zinc anode is consumed per year if zinc's current efficiency is $95\,\%$?
::: solution
$I = 20\times0.10 = 2.0\ \mathrm{A}$. One year is $3.156\times10^{7}\ \mathrm{s}$, a charge of $6.31\times10^{7}\ \mathrm{C}$. Zinc dissolves as $\mathrm{Zn^{2+}}$:
$$
m = \frac{Q}{\varepsilon\,nF}M = \frac{6.31\times10^{7}}{0.95\times2\times96\,485}\times65.38\ \mathrm{g} = 2.25\times10^{4}\ \mathrm{g} = 22.5\ \mathrm{kg}\ \text{per year}.
$$
Zinc's theoretical capacity is $820\ \mathrm{Ah\,kg^{-1}}$; aluminium–zinc–indium alloys, with about $2700\ \mathrm{Ah\,kg^{-1}}$ in practice, are lighter for the same duty and are used on offshore structures. Note what the zinc is doing: it is the anode of a galvanic cell whose cathode is the ship, so the ship's own anodic sites are suppressed. The idea goes back to Humphry Davy.
:::
:::

::: history From Davy's protectors to Pourbaix's atlas {#hist-corrosion}
In 1824 Humphry Davy, asked by the Admiralty why the copper sheathing of warships corroded, showed that small blocks of zinc or iron attached to the copper would protect it — the first cathodic protection, abandoned at the time because the protected copper fouled with weed and barnacles that copper ions normally deter. Michael Faraday and Christian Schönbein investigated the passivity of iron in the 1830s, and Friedrich Flade (1911) characterised the potential at which passivity breaks down. Ulick Richardson Evans at Cambridge established from the 1920s that corrosion is electrochemical, with separated anodic and cathodic areas, through experiments such as his salt-drop test, and introduced the current–potential diagrams that bear his name. Carl Wagner and Wilhelm Traud formulated mixed-potential theory in 1938. Milton Stern and Albert Geary derived the polarisation-resistance relation in 1957, the basis of electrochemical corrosion monitoring, and Marcel Pourbaix published his *Atlas d'équilibres électrochimiques* in 1963 (English translation 1966).
:::

## Where this leads

Corrosion closes the course by combining all its parts: thermodynamics (Pourbaix diagrams from [[electrochemistry/cell-thermodynamics]]), interfaces (adsorption of inhibitors and the breakdown of films, [[electrochemistry/double-layer]]), kinetics (Tafel lines and mixed potentials, [[electrochemistry/electrode-kinetics]]), transport (oxygen-limited corrosion, [[electrochemistry/voltammetry]]), and the materials questions met in [[electrochemistry/batteries]] and [[electrochemistry/fuel-cells-electrolysis]], where current collectors, catalyst supports and bipolar plates must survive aggressive potentials. The design of corrosion-resistant alloys, coatings and oxide films is taken further in [[materials-chemistry]], and the environmental side — atmospheric corrosion driven by sulfur dioxide and chloride, and the effect of acid deposition on buildings and monuments — in the environmental chemistry courses.

::: summary
- Corrosion couples metal oxidation with oxygen reduction or hydrogen evolution on one surface; the metal sits at a mixed corrosion potential where the two currents balance.
- Pourbaix diagrams map immunity, corrosion and passivation against potential and pH from Nernst equations at a chosen dissolved activity ($10^{-6}$); they show what is possible, never how fast.
- Evans diagrams give $E_\mathrm{corr}$ and $i_\mathrm{corr}$ from the intersection of Tafel lines; kinetics (exchange currents, Tafel slopes) and oxygen transport, not the electrochemical series, set the rate; in aerated neutral water oxygen diffusion often limits it.
- Faraday's law converts $i_\mathrm{corr}$ to a penetration rate, $iM/nF\rho$ ($11.6\ \mu\mathrm{m}$ per year per $\mu\mathrm{A\,cm^{-2}}$ for iron); the Stern–Geary relation $i_\mathrm{corr} = B/R_\mathrm{p}$ obtains it from a small linear polarisation.
- Galvanic coupling corrodes the more active metal, worst with a small anode and a large cathode; the galvanic series in the actual environment, not the standard potentials, ranks metals.
- Passive films reduce dissolution by orders of magnitude, but chloride causes pitting and crevice corrosion through acidified, self-sustaining local cells.
- Protection uses coatings (barrier or sacrificial), inhibitors (anodic, cathodic, adsorption), design, and cathodic protection with sacrificial anodes or impressed current to a potential criterion such as $-0.85\ \mathrm{V}$ vs $\mathrm{Cu/CuSO_4}$ for steel.
:::

## Exercises

::: exercise Penetration rate of iron {level=1 check="0.116"}
Steel corrodes uniformly at $i_\mathrm{corr} = 10\ \mu\mathrm{A\,cm^{-2}}$. Find the penetration rate ($M = 55.85\ \mathrm{g\,mol^{-1}}$, $\rho = 7.87\ \mathrm{g\,cm^{-3}}$, $n = 2$). (Enter it in mm per year.)
::: solution
$\mathrm{d}x/\mathrm{d}t = iM/nF\rho = 1.0\times10^{-5}\times55.85/(2\times96\,485\times7.87)\ \mathrm{cm\,s^{-1}} = 3.68\times10^{-10}\ \mathrm{cm\,s^{-1}}$; times $3.156\times10^{7}\ \mathrm{s}$, $1.16\times10^{-2}\ \mathrm{cm} = 0.116\ \mathrm{mm}$ per year — typical of steel in still fresh water.
:::
:::

::: exercise A year of a zinc anode {level=1 check="10.7"}
What mass of zinc is consumed by a sacrificial anode delivering $1.00\ \mathrm{A}$ for one year ($3.156\times10^{7}\ \mathrm{s}$) at $100\,\%$ efficiency? (Enter the mass in kg.)
::: solution
$m = ItM/nF = 1.00\times3.156\times10^{7}\times65.38/(2\times96\,485)\ \mathrm{g} = 1.07\times10^{4}\ \mathrm{g} = 10.7\ \mathrm{kg}$.
:::
:::

::: exercise The immunity line of iron {level=1 check="-0.624"}
Find the potential of the $\mathrm{Fe^{2+}/Fe}$ boundary on the Pourbaix diagram at $25\,^\circ\mathrm{C}$ for $a(\mathrm{Fe^{2+}}) = 10^{-6}$, using $E^\circ = -0.447\ \mathrm{V}$. (Enter $E$ in V vs SHE.)
::: solution
$E = -0.447 + (0.025693/2)\ln10^{-6} = -0.447 - 0.1775 = -0.624\ \mathrm{V}$. Below this potential iron is immune: dissolved iron would be redeposited.
:::
:::

::: exercise Polarisation resistance {level=2 check="21.7"}
A carbon-steel probe has $R_\mathrm{p} = 800\ \Omega\,\mathrm{cm^2}$ after correction for solution resistance, with Tafel slopes $b_\mathrm{a} = 0.060$ and $b_\mathrm{c} = 0.120\ \mathrm{V}$ per decade. Find $i_\mathrm{corr}$. (Enter it in $\mu\mathrm{A\,cm^{-2}}$.)
::: solution
$B = 0.060\times0.120/(2.303\times0.180) = 0.01737\ \mathrm{V}$; $i_\mathrm{corr} = B/R_\mathrm{p} = 0.01737/800\ \mathrm{A\,cm^{-2}} = 2.17\times10^{-5}\ \mathrm{A\,cm^{-2}} = 21.7\ \mu\mathrm{A\,cm^{-2}}$, i.e. about $0.25\ \mathrm{mm}$ per year.
:::
:::

::: exercise Small anode, large cathode {level=2 check="23.2"}
Steel fasteners with a total wetted area of $100\ \mathrm{cm^2}$ hold a copper plate of area $1.00\ \mathrm{m^2}$ in aerated seawater. The cathodic reaction on copper is oxygen reduction at a diffusion-limited $20\ \mu\mathrm{A\,cm^{-2}}$, and all the cathodic current is supplied by the steel. Find the penetration rate of the fasteners, ignoring cathodic reaction on the steel itself. (Enter it in mm per year.)
::: solution
Cathodic current $= 20\times10^{-6}\ \mathrm{A\,cm^{-2}}\times10^{4}\ \mathrm{cm^2} = 0.20\ \mathrm{A}$, concentrated on $100\ \mathrm{cm^2}$ of steel: $i = 2.0\times10^{-3}\ \mathrm{A\,cm^{-2}}$. With $11.6\ \mu\mathrm{m}$ per year per $\mu\mathrm{A\,cm^{-2}}$, the penetration rate is $2000\times11.6\ \mu\mathrm{m}$ per year $= 23.2\ \mathrm{mm}$ per year — fasteners a few millimetres thick would fail within months. Reversing the materials (copper fasteners in a steel plate) would spread the same current over the large steel area, at about $0.2\ \mathrm{mm}$ per year.
:::
:::

::: exercise Zinc in acid {level=2 check="-0.795"}
Zinc corrodes in deaerated acid at pH 0 with hydrogen evolution. Take $E_\mathrm{Zn} = -0.940\ \mathrm{V}$ (for $a(\mathrm{Zn^{2+}}) = 10^{-6}$), $i_{0,\mathrm{Zn}} = 1.0\times10^{-7}\ \mathrm{A\,cm^{-2}}$, $b_\mathrm{a} = 0.040\ \mathrm{V}$; and for hydrogen evolution on zinc $E_\mathrm{H} = 0$, $i_{0,\mathrm{H}} = 1.0\times10^{-10}\ \mathrm{A\,cm^{-2}}$, $b_\mathrm{c} = 0.120\ \mathrm{V}$. Find $E_\mathrm{corr}$ and $i_\mathrm{corr}$. (Enter $E_\mathrm{corr}$ in V.)
::: solution
$b_\mathrm{a}b_\mathrm{c}/(b_\mathrm{a} + b_\mathrm{c}) = 0.0048/0.160 = 0.0300\ \mathrm{V}$. $E_\mathrm{corr} = 0.0300[\log_{10}(10^{-10}/10^{-7}) + (-0.940)/0.040 + 0] = 0.0300(-3 - 23.5) = -0.795\ \mathrm{V}$. Then $\log_{10}i_\mathrm{corr} = -7 + (-0.795 + 0.940)/0.040 = -7 + 3.62 = -3.38$, so $i_\mathrm{corr} = 4.2\times10^{-4}\ \mathrm{A\,cm^{-2}}$. Despite its far more negative equilibrium potential, zinc corrodes only about seven times faster than iron in [[#ex-evans]], because hydrogen evolution on zinc is so slow; a trace of a more catalytic metal (copper or platinum) deposited on the zinc speeds its dissolution dramatically, a classic demonstration of cathodic control.
:::
:::

::: exercise Derivation of the Stern–Geary relation {level=3 check="0.0261"}
Starting from Tafel kinetics for both partial reactions written relative to $E_\mathrm{corr}$, derive $i_\mathrm{corr} = B/R_\mathrm{p}$. Then find $B$ when the anodic slope is $0.060\ \mathrm{V}$ per decade and the cathodic reaction is diffusion-limited, and explain the result physically. (Enter $B$ in V.)
::: hint
A diffusion-limited cathodic current does not change with potential: what is its Tafel slope?
:::
::: solution
The derivation is that of [[#prop-stern-geary]]: $i = i_\mathrm{corr}[\mathrm{e}^{2.303\Delta E/b_\mathrm{a}} - \mathrm{e}^{-2.303\Delta E/b_\mathrm{c}}] \approx 2.303\,i_\mathrm{corr}\Delta E(1/b_\mathrm{a} + 1/b_\mathrm{c})$, so $R_\mathrm{p} = B/i_\mathrm{corr}$ with $B = b_\mathrm{a}b_\mathrm{c}/2.303(b_\mathrm{a} + b_\mathrm{c})$. A diffusion-limited cathodic current is independent of potential, which corresponds to $b_\mathrm{c} \rightarrow \infty$; and since $b_\mathrm{a}b_\mathrm{c}/(b_\mathrm{a} + b_\mathrm{c}) \rightarrow b_\mathrm{a}$ in that limit, $B = b_\mathrm{a}/2.303 = 0.060/2.303 = 0.0261\ \mathrm{V}$. Physically, a small polarisation changes only the anodic current (the cathodic current is pinned at its limiting value), so the whole response of the net current comes from the anodic Tafel line, and the electrode is "stiffer" (larger $R_\mathrm{p}$ for the same $i_\mathrm{corr}$) than when both reactions respond. Using the activation-controlled $B = 0.0174\ \mathrm{V}$ for such a system would underestimate $i_\mathrm{corr}$ by a third.
:::
:::

::: exercise Oxygen-limited corrosion in flowing water {level=3 check="0.233"}
Steel in air-saturated water at $25\,^\circ\mathrm{C}$ corrodes at the limiting rate of oxygen reduction. With $D(\mathrm{O_2}) = 2.0\times10^{-5}\ \mathrm{cm^2\,s^{-1}}$, $c(\mathrm{O_2}) = 0.26\ \mathrm{mmol\,dm^{-3}}$ and a diffusion layer of $1.0\ \mathrm{mm}$, find the penetration rate. By what factor does it change if flow thins the diffusion layer to $0.10\ \mathrm{mm}$, and what might stop it rising indefinitely? (Enter the penetration rate for $\delta = 1.0\ \mathrm{mm}$ in mm per year.)
::: solution
$i_\mathrm{l} = 4FDc/\delta = 4\times96\,485\times2.0\times10^{-5}\times2.6\times10^{-7}/0.10\ \mathrm{A\,cm^{-2}} = 2.0\times10^{-5}\ \mathrm{A\,cm^{-2}}$; with $11.6\ \mu\mathrm{m}$ per year per $\mu\mathrm{A\,cm^{-2}}$, $20.1\times11.6\ \mu\mathrm{m} = 0.233\ \mathrm{mm}$ per year. Thinning $\delta$ tenfold raises the rate tenfold, to $2.3\ \mathrm{mm}$ per year, as long as the cathodic reaction stays transport-limited. Eventually the anodic line meets the cathodic curve on its kinetic part (the oxygen-reduction Tafel region) and the rate stops following $1/\delta$; at higher flow still, a protective oxide film may form because more oxygen reaches the surface (passivation of steel in highly oxygenated water) — or be eroded away (erosion–corrosion). Flow is therefore never a simple factor in corrosion.
:::
:::

::: exercise Magnesium anodes for a pipeline {level=3 check="15.9"}
A buried, coated steel pipeline needs $0.10\ \mathrm{A}$ of cathodic-protection current. Magnesium anodes have a theoretical capacity of $2205\ \mathrm{Ah\,kg^{-1}}$ and a current efficiency of $50\,\%$. What mass of magnesium is needed for a $20$-year design life ($8766\ \mathrm{h}$ per year)? Verify the theoretical capacity. (Enter the mass in kg.)
::: solution
Theoretical capacity: $2F/(3.6\times24.305)\ \mathrm{mAh\,g^{-1}} = 2205\ \mathrm{mAh\,g^{-1}} = 2205\ \mathrm{Ah\,kg^{-1}}$ ([[electrochemistry/batteries#eq-capacity]]). Charge needed: $0.10\ \mathrm{A}\times20\times8766\ \mathrm{h} = 17\,532\ \mathrm{Ah}$. Mass: $17\,532/(2205\times0.50) = 15.9\ \mathrm{kg}$. The low efficiency reflects magnesium's self-corrosion with hydrogen evolution; its very negative potential (about $-1.5$ to $-1.7\ \mathrm{V}$ vs $\mathrm{Cu/CuSO_4}$) is what makes it suitable for high-resistivity soils, where zinc's smaller driving voltage could not push enough current through the ground.
:::
:::
