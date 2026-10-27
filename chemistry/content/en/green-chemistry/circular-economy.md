A plastic bottle of poly(ethylene terephthalate) is made from oil and gas through a chain of perhaps six chemical plants, filled, sold, emptied within days, and thrown away. If it is collected, washed and re-extruded it may become a fibre for a fleece jacket, which at the end of its own life is rarely recycled again. If not, it is landfilled, burnt, or escapes into the environment, where it persists for decades. The same linear pattern — *take, make, dispose* — applies to most materials. The OECD's *Global Plastics Outlook* (2022) estimated that of the $353\ \mathrm{Mt}$ of plastic waste generated worldwide in 2019, only $9\,\%$ was recycled (after losses in sorting and processing), $19\,\%$ was incinerated, about half went to sanitary landfill and $22\,\%$ was mismanaged — dumped, burnt in the open or leaked to the environment.

A **circular economy** aims to keep materials in use at their highest value for as long as possible and to regenerate natural systems, so that waste becomes the feedstock for new products. The idea, promoted since 2010 by the Ellen MacArthur Foundation and now embedded in EU policy, is economic and systemic, but its success depends heavily on chemistry: on whether a polymer survives reprocessing, whether a mixture can be separated, whether a molecule can be depolymerised to monomer and repolymerised, whether a product contains substances that should not be recycled at all, and whether chemicals entering the market have been assessed for their hazards. This chapter treats these questions. It defines the quantities that describe circularity, analyses **mechanical recycling** and the degradation it causes, develops the thermodynamics and chemistry of **chemical recycling**, discusses **design for end of life**, and ends with the regulation of chemicals and products — REACH and its counterparts, and the rules on packaging and plastics as of 2026. The polymer science behind it is in [[polymer-chemistry]], particularly [[polymer-chemistry/functional-polymers]], which covers degradable polymers and recycling chemistry from the polymer side; here we take the systems view.

## Measuring circularity

The European Union's Waste Framework Directive (2008/98/EC) sets out a **waste hierarchy**: prevention first; then preparing for re-use; recycling; other recovery, including energy recovery; and disposal last. The hierarchy is a default, not a law of nature — life-cycle assessment may justify departing from it for a particular stream — but it captures the intuition that the less a material is transformed, the less energy and material are lost.

::: definition Collection rate, process yield and recycled content {#def-circular}
For a material at the end of a use cycle:

- the **collection rate** $r$ is the fraction of discarded material that is collected for recycling;
- the **process yield** $\eta$ is the fraction of collected material that emerges from sorting and reprocessing as usable secondary material (the rest is lost as residues, contaminants and process losses);
- the **effective recycling rate** is $r\eta$, the fraction of discarded material that actually returns to use;
- the **recycled content** of a product is the mass fraction of its material that is secondary (recycled) rather than virgin.

Statistics often report collection or "sent to recycling" rates, which are larger than effective recycling rates; the distinction accounts for much of the disagreement between published figures.
:::

::: proposition Uses per unit of virgin material {#prop-cycles}
Suppose each use cycle returns a fraction $r\eta$ of the material to the next cycle, with no change in demand. Then one unit of virgin material provides on average
$$
N = \sum_{k=0}^{\infty}(r\eta)^k = \frac{1}{1 - r\eta}
$$ {#eq-cycles}
units of use, and in a steady state the fraction of each cycle's material that must be virgin is $1 - r\eta$. If demand grows by a factor $1 + g$ per cycle, the recycled content cannot exceed $r\eta/(1 + g)$.
:::

::: proof
A unit of virgin material is used once; a fraction $r\eta$ of it is used a second time, $(r\eta)^2$ a third time, and so on. The total use is a geometric series with ratio $r\eta < 1$, summing to $1/(1 - r\eta)$. In a steady state with demand $D$ per cycle, the recycled material available is $r\eta D$ (from the previous cycle's $D$), so the virgin input is $D(1 - r\eta)$. If demand in cycle $k$ is $D_k = D_0(1 + g)^k$, the recycled material entering cycle $k + 1$ is $r\eta D_k$, a fraction $r\eta D_k/D_{k+1} = r\eta/(1 + g)$ of its demand. This simple model assumes material quality does not limit reuse and that products last one cycle; for long-lived products (buildings, vehicles) the lag between production and discard means that even perfect recycling of today's waste covers only the smaller demand of decades ago.
:::

::: widget plot
f: 1/(1 - x*n); 1 - x*n
x: 0, 0.99
y: 0, 10
sliders: n=0.8:0.5:1:0.01
labels: N\ \text{(uses per unit of virgin material)}; \text{virgin fraction}
caption: Uses per unit of virgin material [[#eq-cycles]] and the steady-state virgin fraction, against the collection rate $r$ ($x$) for a process yield $\eta$ (slider $n$). At $r = 0.5$ and $\eta = 0.8$ each kilogram of virgin plastic gives $1.67$ uses; raising collection to $0.9$ and yield to $0.95$ gives $6.9$. The curve is steep only at high effective recycling rates: the last losses matter most. Real materials also lose quality with each cycle, which caps the number of cycles independently of collection.
:::

::: example How far does recycling stretch a kilogram? {#ex-cycles}
Packaging made of a polymer is collected at a rate of $50\,\%$, and sorting and reprocessing recover $80\,\%$ of the collected mass. (a) How many uses does one kilogram of virgin polymer provide? (b) In a steady state, what fraction of each year's packaging must be virgin? (c) If demand grows by $4\,\%$ per cycle, what is the maximum recycled content?
::: solution
(a) $r\eta = 0.40$, so $N = 1/(1 - 0.40) = 1.67$ uses.

(b) The virgin fraction is $1 - 0.40 = 0.60$: $60\,\%$ of each cycle's polymer is new.

(c) $r\eta/(1 + g) = 0.40/1.04 = 0.385$: at most $38.5\,\%$ recycled content.

Even a recycling system that most countries would regard as good therefore displaces well under half of virgin production. Raising $\eta$ is as important as raising $r$, and both require design: packaging that sorts reliably, contains no incompatible layers or additives, and is not contaminated by its contents.
:::
:::

## Mechanical recycling

**Mechanical recycling** keeps the polymer chains intact: waste is collected, sorted (by near-infrared spectroscopy, density, colour, eddy currents for metals), shredded, washed, melted and re-extruded into pellets. It needs the least energy of any recycling route — far less than making virgin polymer — and works well for clean, single-polymer streams such as PET bottles and polyethylene films from commercial packaging. Three chemical problems limit it.

**Degradation.** Melt processing at $200$–$300\,^\circ\mathrm{C}$ in the presence of traces of oxygen, water and catalyst residues breaks chains. Polyolefins undergo radical oxidation and chain scission (polypropylene) or cross-linking (polyethylene); polyesters such as PET are hydrolysed by residual water, so they are dried rigorously before extrusion and their molar mass is sometimes rebuilt afterwards by **solid-state polycondensation** at temperatures just below the melting point. Because the mechanical properties of a polymer — tensile strength, toughness, melt viscosity — depend on molar mass ([[polymer-chemistry/polymer-properties]]), repeated reprocessing gradually degrades performance.

::: proposition Molar mass after random chain scission {#prop-scission}
If a polymer of initial number-average molar mass $M_{\mathrm{n},0}$ suffers on average $z$ moles of random chain scissions per gram in each processing cycle, and nothing else happens (no cross-linking or recombination), then after $k$ cycles
$$
\frac{1}{M_{\mathrm{n},k}} = \frac{1}{M_{\mathrm{n},0}} + kz .
$$ {#eq-scission}
:::

::: proof
The number-average molar mass is the mass divided by the number of chains: for one gram, $M_\mathrm{n} = 1/N$ where $N$ is the number of moles of chains per gram. Each scission of a backbone bond turns one chain into two, raising $N$ by one; the mass is unchanged. Initially $N_0 = 1/M_{\mathrm{n},0}$; after $k$ cycles with $z$ scissions per gram each, $N_k = N_0 + kz$, which is [[#eq-scission]]. The weight-average molar mass, which governs melt viscosity more strongly, falls faster for an initially narrow distribution, and the distribution tends towards the most probable one ([[polymer-chemistry/polymer-structure]]). With cross-linking (as in polyethylene) $1/M_\mathrm{n}$ falls instead, and gels form.
:::

::: widget plot
f: 1/(1/M + x*z/1000)
x: 0, 10
y: 0, 100
sliders: M=80:20:150:1; z=5:0:20:0.5
labels: M_\mathrm{n}\ (\mathrm{kg\,mol^{-1}})
caption: Number-average molar mass in $\mathrm{kg\,mol^{-1}}$ against the number of reprocessing cycles $k$ ($x$), from [[#eq-scission]] with initial $M_{\mathrm{n},0}$ ($M$, in $\mathrm{kg\,mol^{-1}}$) and $z$ scissions per cycle in mmol per kilogram ($z$; the factor $1000$ converts units). With $M_{\mathrm{n},0} = 80\ \mathrm{kg\,mol^{-1}}$ and $5\ \mathrm{mmol\,kg^{-1}}$ per cycle the molar mass falls to $57$ after one cycle, $27$ after five and $16$ after ten. Because the initial chains are long, even a few scissions per chain are significant; stabilisers (antioxidants such as hindered phenols and phosphites) reduce $z$, and blending with virgin material keeps properties in specification.
:::

**Mixtures.** Most pairs of polymers are immiscible, because their entropy of mixing is tiny ($\chi_\mathrm{c} \approx 0.002$ for chains of $1000$ segments, [[polymer-chemistry/polymer-solutions]]), so a blend of polyethylene and polypropylene, or of polyethylene and PET, forms coarse, weak phase-separated structures. Multilayer packaging films, which combine several polymers (and often aluminium) to give barrier properties, are therefore particularly hard to recycle mechanically. Compatibilisers — block or graft copolymers that sit at the interface — can recover some properties.

**Additives and legacy substances.** Polymers contain plasticisers, stabilisers, flame retardants, pigments and fillers, some of them hazardous. When the polymer is recycled, its additives come with it. Plastics from older electronic equipment may contain brominated flame retardants such as polybromodiphenyl ethers, now listed under the Stockholm Convention, and the EU's rules on persistent organic pollutants set limits above which such waste must be destroyed rather than recycled. Recycling must not become a pathway that spreads substances the market has phased out — one of the reasons chemicals regulation and waste regulation have to be designed together.

::: example Recycling or incineration? {#ex-lca-pe}
One kilogram of polyethylene waste is either incinerated with energy recovery or mechanically recycled. Use illustrative values: incineration releases the carbon as $\mathrm{CO_2}$ and the electricity generated displaces grid power worth $1.0\ \mathrm{kg\,CO_2}$; recycling causes $0.5\ \mathrm{kg\,CO_2e}$ (collection, sorting, washing, extrusion) and its product replaces virgin polyethylene, with a cradle-to-gate footprint of $1.8\ \mathrm{kg\,CO_2e\,kg^{-1}}$, at a substitution ratio of $0.8$ (because of quality loss). Compare the net climate impacts by system expansion.
::: solution
Polyethylene is $(\mathrm{CH_2})_n$; burning one kilogram releases $44.01/14.03 = 3.14\ \mathrm{kg\,CO_2}$. **Incineration:** $3.14 - 1.0 = +2.14\ \mathrm{kg\,CO_2e}$. **Recycling:** $0.5 - 0.8\times1.8 = -0.94\ \mathrm{kg\,CO_2e}$ (a net saving). The difference is about $3.1\ \mathrm{kg\,CO_2e}$ per kilogram, most of it from not burning fossil carbon. The result follows the waste hierarchy, but its size depends on the assumptions, as [[green-chemistry/green-metrics#alg-lca]] warns: a cleaner grid reduces the incineration credit (making recycling look even better), while a low substitution ratio or a long transport distance for a dirty, mixed stream can make recycling the poorer choice for that stream. In LCA terms this is **system expansion**: each option is credited with the products it displaces.
:::
:::

## Chemical recycling

**Chemical recycling** (or feedstock recycling) breaks polymers down to monomers, oligomers or other chemicals, which are purified and rebuilt into new polymers or other products. Because purification happens at the molecular level, it can in principle remove contaminants and additives and restore virgin quality, at the cost of more energy and more complex plant. Which route is feasible depends on the polymer's chemistry.

### Depolymerisation and the ceiling temperature

Addition polymerisation of a vinyl monomer is exothermic and has a negative entropy (a free monomer becomes a constrained repeat unit), so like any such reaction it becomes reversible at high temperature.

::: proposition Ceiling temperature {#prop-ceiling}
For the propagation equilibrium $\mathrm{M}_n^{*} + \mathrm{M} \rightleftharpoons \mathrm{M}_{n+1}^{*}$ with $\Delta_\mathrm{p}H < 0$ and $\Delta_\mathrm{p}S < 0$ (per mole of monomer, referred to a standard monomer concentration $[\mathrm{M}]^\circ = 1\ \mathrm{mol\,dm^{-3}}$), the equilibrium monomer concentration at temperature $T$ is
$$
\frac{[\mathrm{M}]_\mathrm{eq}}{[\mathrm{M}]^\circ} = \exp\!\left(\frac{\Delta_\mathrm{p}H}{RT} - \frac{\Delta_\mathrm{p}S}{R}\right),
$$ {#eq-ceiling}
and polymerisation from monomer at $[\mathrm{M}]^\circ$ is thermodynamically impossible above the **ceiling temperature** $T_\mathrm{c} = \Delta_\mathrm{p}H/\Delta_\mathrm{p}S$. Above it, a polymer with active chain ends depolymerises ("unzips") to monomer.
:::

::: proof
For long chains, the equilibrium constant of adding one monomer is independent of chain length, $K = [\mathrm{M}_{n+1}^{*}]/([\mathrm{M}_n^{*}][\mathrm{M}]) \approx 1/[\mathrm{M}]_\mathrm{eq}$ (in units of $[\mathrm{M}]^\circ$), since the two chain concentrations are equal. With $K = \exp(-\Delta_\mathrm{p}G^\circ/RT) = \exp(-\Delta_\mathrm{p}H/RT + \Delta_\mathrm{p}S/R)$, inverting gives [[#eq-ceiling]]. Polymerisation from monomer at $[\mathrm{M}]^\circ$ requires $[\mathrm{M}]^\circ > [\mathrm{M}]_\mathrm{eq}$, i.e. $\Delta_\mathrm{p}H/RT - \Delta_\mathrm{p}S/R < 0$; since $\Delta_\mathrm{p}H < 0$ this is $T < \Delta_\mathrm{p}H/\Delta_\mathrm{p}S = T_\mathrm{c}$. The derivation is the free-energy argument of [[thermodynamics/reaction-equilibrium]] applied to one propagation step; it says nothing about rate, and unzipping requires active chain ends, which in most polymers must first be created by bond scission.
:::

With approximate values from Odian's *Principles of Polymerization* ($\Delta_\mathrm{p}H$ in $\mathrm{kJ\,mol^{-1}}$, $\Delta_\mathrm{p}S$ in $\mathrm{J\,K^{-1}\,mol^{-1}}$): methyl methacrylate $-56$, $-117$, $T_\mathrm{c} \approx 479\ \mathrm{K}$; α-methylstyrene $-35$, $-110$, $T_\mathrm{c} \approx 318\ \mathrm{K}$; styrene $-73$, $-104$, $T_\mathrm{c} \approx 700\ \mathrm{K}$; ethylene $-93$, $-155$, $T_\mathrm{c} \approx 600\ \mathrm{K}$. Poly(methyl methacrylate) is therefore the classic case of clean depolymerisation: heated to $400$–$500\,^\circ\mathrm{C}$ it unzips to monomer in high yield, and PMMA has been recycled this way for decades. Polystyrene gives a mixture of styrene with dimers and trimers. Polyethylene and polypropylene, whose radicals transfer hydrogen and undergo β-scission rather than unzipping cleanly, give a broad mixture of alkanes and alkenes — the basis of pyrolysis.

::: example Can polystyrene be unzipped? {#ex-ceiling}
Using $\Delta_\mathrm{p}H = -73\ \mathrm{kJ\,mol^{-1}}$ and $\Delta_\mathrm{p}S = -104\ \mathrm{J\,K^{-1}\,mol^{-1}}$ for styrene, find the ceiling temperature and the equilibrium monomer concentration at $400$, $500$ and $600\,^\circ\mathrm{C}$. Pure liquid styrene is about $8.7\ \mathrm{mol\,dm^{-3}}$. Compare with methyl methacrylate.
::: solution
$T_\mathrm{c} = 73\,000/104 = 702\ \mathrm{K}$ ($429\,^\circ\mathrm{C}$). By [[#eq-ceiling]], $[\mathrm{M}]_\mathrm{eq} = \exp(-73\,000/RT + 104/8.314) = \exp(-73\,000/RT + 12.509)$:

| $T$ | $-\Delta_\mathrm{p}H/RT$ | $[\mathrm{M}]_\mathrm{eq}/\mathrm{mol\,dm^{-3}}$ |
|---|---|---|
| $673\ \mathrm{K}$ | $13.04$ | $0.59$ |
| $773\ \mathrm{K}$ | $11.36$ | $3.2$ |
| $873\ \mathrm{K}$ | $10.06$ | $11.6$ |

Thermodynamically, polystyrene can depolymerise substantially only above about $600\,^\circ\mathrm{C}$, where $[\mathrm{M}]_\mathrm{eq}$ exceeds the concentration of pure monomer; in practice monomer is removed as vapour, which helps, but at these temperatures side reactions (hydrogen transfer, giving dimers, trimers, toluene and ethylbenzene) compete, and styrene yields from pyrolysis are typically $50$–$70\,\%$. For methyl methacrylate, $T_\mathrm{c} = 56\,000/117 = 479\ \mathrm{K}$, and at $400\,^\circ\mathrm{C}$ $[\mathrm{M}]_\mathrm{eq} = 58\ \mathrm{mol\,dm^{-3}}$: unzipping is thermodynamically overwhelming at a temperature where side reactions are still slow, and the α-methyl group, which blocks hydrogen abstraction along the chain, keeps the depropagation clean. The comparison shows why depolymerisation is a practical recycling route for PMMA but much harder for polystyrene and impractical for polyolefins.
:::
:::

### Condensation polymers: solvolysis and enzymes

Step-growth polymers ([[polymer-chemistry/step-growth]]) contain bonds — esters, amides, carbonates, urethanes — that can be cleaved by small molecules, reversing the polycondensation. For PET the main routes are **glycolysis** with ethylene glycol to bis(2-hydroxyethyl) terephthalate (BHET), **methanolysis** to dimethyl terephthalate (DMT) and ethylene glycol, and **hydrolysis** to terephthalic acid. Nylon-6 is depolymerised to caprolactam, and polyurethanes by glycolysis to polyols.

::: example Methanolysis of PET {#ex-methanolysis}
Write the equation for the methanolysis of PET (repeat unit $\mathrm{C_{10}H_8O_4}$, $192.17\ \mathrm{g\,mol^{-1}}$) to DMT ($\mathrm{C_{10}H_{10}O_4}$, $194.18$) and ethylene glycol ($\mathrm{C_2H_6O_2}$, $62.07$), and find the masses of methanol consumed and products formed per tonne of PET. What is the atom economy?
::: solution
Each repeat unit, $\mathrm{-[OC{-}C_6H_4{-}CO{-}O{-}CH_2CH_2{-}O]-}$, contains two ester links; two methanols cleave them:
$$
\mathrm{(C_{10}H_8O_4)_n} + 2n\,\mathrm{CH_3OH} \rightarrow n\,\mathrm{C_{10}H_{10}O_4} + n\,\mathrm{HOCH_2CH_2OH}.
$$
Mass balance per repeat unit: $192.17 + 2\times32.04 = 256.25$; $194.18 + 62.07 = 256.25$. Per tonne of PET: methanol $64.08/192.17 = 0.333\ \mathrm{t}$; DMT $194.18/192.17 = 1.010\ \mathrm{t}$; ethylene glycol $62.07/192.17 = 0.323\ \mathrm{t}$. Both products are monomers for new PET (DMT is transesterified with glycol, regenerating the methanol), so the atom economy to useful products is $100\,\%$, and the methanol is a recycled reagent. In practice, coloured and contaminated PET and polyester textiles are the target streams, because clean bottle PET is more cheaply recycled mechanically; dyes, other polymers and additives must be removed from the monomers by distillation and crystallisation, which is where the energy goes.
:::
:::

**Enzymatic depolymerisation** uses hydrolases — cutinases and PETases — to hydrolyse PET in water. A PET-degrading bacterium, *Ideonella sakaiensis*, was reported by Yoshida and co-workers in 2016; in 2020 Tournier and co-workers (with the company Carbios) described an engineered leaf-branch compost cutinase that depolymerised $90\,\%$ of pretreated, amorphised PET to terephthalic acid and ethylene glycol within $10$ hours at about $72\,^\circ\mathrm{C}$. The process needs the PET to be amorphous (crystalline regions are attacked slowly, and the reaction temperature is set just below PET's glass transition) and the terephthalic acid must be neutralised and recovered, but it works at mild temperatures and tolerates mixed feedstocks. The enzymology is that of [[green-chemistry/renewable-feedstocks]].

### Pyrolysis, gasification and dissolution

For polyolefins, which have no cleavable functional groups, **pyrolysis** at about $400$–$600\,^\circ\mathrm{C}$ in the absence of oxygen breaks the chains into a hydrocarbon oil, waxes and gases; catalysts (zeolites) narrow the product range. The oil, after removing chlorine (from PVC contamination), nitrogen and oxygen compounds, can be fed to a steam cracker ([[green-chemistry/petrochemicals]]) to make new olefins. Because the oil is mixed with fossil naphtha, the recycled content of the resulting polymers is assigned by **mass-balance accounting**: certification schemes such as ISCC PLUS track the recycled input and allocate it to specific outputs, a method that is standardised but debated, because it allows a product to be sold as containing recycled material that may not physically contain it. The overall carbon yield from waste plastic to new monomer is modest, since much of the oil becomes fuel-range by-products and gases. **Gasification** converts mixed waste to synthesis gas, from which methanol and other chemicals can be made; it accepts almost any feed but loses all polymer structure. **Dissolution** (sometimes called physical or solvent-based recycling) dissolves a polymer selectively, filters and extracts contaminants and additives, and precipitates the purified polymer; it keeps the chains intact, as mechanical recycling does, while purifying them more thoroughly.

::: warning Recycling is not automatically better than its alternatives {#warn-recycling}
Two opposite errors are common. One is to treat every recycling process as beneficial: a chemical recycling plant that converts most of its feed to fuel, or a mechanical stream that ships contaminated waste long distances to be landfilled elsewhere, may have a larger footprint than incineration with energy recovery. Under EU law, conversion to fuels does not count as recycling. The other error is to dismiss recycling because it is imperfect: [[#prop-cycles]] shows that every increase in effective recycling rate displaces virgin material, and most life-cycle assessments find that well-run recycling of clean streams saves both energy and emissions. Each route should be judged by a life-cycle comparison on a stated functional unit, including what it displaces and the quality of what it produces.
:::

## Design for end of life

Recycling is easiest when products are designed for it. Principles that follow from the chemistry above include:

- **Mono-material design:** packaging made of a single polymer family (for example all-polyethylene laminates instead of PET/PE/aluminium) sorts and reprocesses as one stream.
- **Avoid problematic substances:** no additives that are hazardous or that interfere with recycling (carbon black hinders near-infrared sorting; PVC labels contaminate PET); use pigments and stabilisers compatible with the recycling route.
- **Design for disassembly:** reversible fastenings and adhesives that release on demand, so that electronics and vehicles can be separated into recyclable fractions — essential for recovering critical metals such as cobalt, lithium and the rare earths.
- **Dynamic and depolymerisable materials:** polymers designed to depolymerise to monomer under mild conditions, such as polymers with low ceiling temperatures or with cleavable links, and vitrimers ([[polymer-chemistry/functional-polymers]]) that can be reprocessed although cross-linked.
- **Design for degradation (principle 10):** where collection is impossible — agricultural films, fishing gear, products released to wastewater such as detergents and pharmaceuticals — materials should biodegrade to harmless products under the conditions they will actually meet. Biodegradation in an industrial composter (EN 13432) is not the same as in soil, freshwater or the sea, and "oxo-degradable" plastics, which fragment into microplastics, were restricted in the EU by the Single-Use Plastics Directive (2019/904).

Metals show how valuable circularity can be. Recycled aluminium needs about $5\,\%$ of the energy of primary smelting ([[electrochemistry/fuel-cells-electrolysis]]), and steel, copper and lead are recycled at high rates because their value repays collection and they can be refined to virgin quality. The difficulty is alloys and mixtures: a car contains many aluminium alloys whose alloying elements accumulate if they are melted together, so sorting by alloy, for example by laser-induced breakdown spectroscopy ([[analytical-chemistry/atomic-spectrometry]]), is part of the recycling chain.

::: quiz
A food tray is made of a three-layer film: PET, an ethylene–vinyl alcohol oxygen barrier and polyethylene, bonded with adhesive. Which redesign most improves its mechanical recyclability?
- [ ] Making the PET layer from bio-based ethylene glycol
- [ ] Adding a pro-oxidant additive so that the tray fragments in the environment
- [x] Replacing it with a polyethylene-based structure in which the barrier is a thin layer compatible with polyethylene recycling
- [ ] Printing the tray black so that it hides contamination
::: solution
Recyclability depends on how many incompatible polymers the product contains. A mono-material polyethylene structure (with a barrier layer kept to a few per cent, which polyethylene recycling streams tolerate) can be sorted and reprocessed as one material. Bio-based origin changes nothing about recyclability; pro-oxidants create microplastics and are restricted in the EU; and black pigments based on carbon black absorb near-infrared light and defeat automatic sorting.
:::
:::

## Regulating chemicals and products

Circularity requires that the substances in products are known and safe, because what goes into a product comes out in its waste. Regulation of chemicals has moved since the 1970s from controlling a few notorious substances to requiring data on all substances on the market.

::: definition REACH {#def-reach}
**REACH** — Regulation (EC) No 1907/2006 on the Registration, Evaluation, Authorisation and Restriction of Chemicals, in force since 1 June 2007 — is the EU's general chemicals law, administered by the European Chemicals Agency (ECHA). Its main elements are:

- **Registration:** manufacturers and importers of a substance in quantities of $1\ \mathrm{t}$ or more per year must submit a registration dossier, with information requirements increasing with tonnage band ($1$–$10$, $10$–$100$, $100$–$1000$, $\geq 1000\ \mathrm{t\,a^{-1}}$); for $10\ \mathrm{t\,a^{-1}}$ and above a chemical safety report with exposure scenarios and risk characterisation ratios ([[green-chemistry/green-principles#prop-rcr]]) is required. "No data, no market": unregistered substances may not be manufactured or placed on the market. The phased registration deadlines for existing substances ended in 2018.
- **Evaluation:** ECHA and member states check dossiers for compliance and evaluate substances of concern.
- **Authorisation:** **substances of very high concern** (SVHCs) — carcinogenic, mutagenic or toxic to reproduction (CMR), persistent, bioaccumulative and toxic (PBT), very persistent and very bioaccumulative (vPvB), or of equivalent concern such as endocrine disruptors — are placed on a **Candidate List**; those moved to **Annex XIV** may be used only with an authorisation for a specific use, granted if risks are adequately controlled or benefits outweigh them and no suitable alternative exists.
- **Restriction:** **Annex XVII** restricts the manufacture, marketing or use of substances that pose unacceptable risks, whatever the tonnage.

Hazard classification and labelling are governed by the companion CLP Regulation (EC) No 1272/2008.
:::

REACH shifted the burden of proof to industry, required data on tens of thousands of substances, and is designed to drive **substitution**: an Annex XIV listing makes continued use of a substance costly and uncertain, encouraging the search for alternatives. The Candidate List had about $250$ entries in 2025 (ECHA). Articles containing more than $0.1\,\%$ by mass of a Candidate List substance must be notified, and since 2021 such information is entered into ECHA's SCIP database, so that recyclers can know what the products they receive contain.

Other jurisdictions have comparable laws: the US **Toxic Substances Control Act** (1976), substantially strengthened by the Frank R. Lautenberg Chemical Safety for the 21st Century Act (2016), which requires the EPA to evaluate existing chemicals against a risk-based safety standard (the 2024 methylene chloride rule of [[green-chemistry/safer-solvents]] is an example); and chemicals laws in Canada, Japan, Korea and China. Global treaties address specific classes: the **Stockholm Convention** on persistent organic pollutants (2001), the **Minamata Convention** on mercury (2013) and the **Montreal Protocol** on ozone-depleting substances (1987). A proposal for a broad EU restriction of per- and polyfluoroalkyl substances (PFAS), submitted to ECHA by five countries in January 2023, was still under scientific evaluation by ECHA's committees in 2025.

**Product and waste rules** set the conditions for circularity directly. In the EU, the Single-Use Plastics Directive (2019/904) requires PET beverage bottles to contain at least $25\,\%$ recycled plastic from 2025 and all plastic beverage bottles $30\,\%$ from 2030, with separate-collection targets of $77\,\%$ by 2025 and $90\,\%$ by 2029. The **Packaging and Packaging Waste Regulation** (Regulation (EU) 2025/40), published in January 2025 and applying from August 2026, requires all packaging to be recyclable by 2030 under design-for-recycling criteria and sets minimum recycled content for plastic packaging from 2030 (for example $30\,\%$ for contact-sensitive PET packaging). Internationally, the UN Environment Assembly resolved in 2022 to negotiate a legally binding instrument on plastic pollution; the fifth session of the negotiating committee (Busan, 2024) and its resumed session (Geneva, August 2025) ended without an agreed text. These policies are contested — between those who emphasise production limits, those who emphasise waste management, and those concerned with costs, trade and feasibility — and their effects will depend on implementation.

::: history From waste management to the circular economy {#hist-circular}
Recycling of metals and paper is ancient; organised collection of household recyclables spread in the 1970s and 1980s, encouraged by landfill shortages. Walter Stahel and Geneviève Reday's report to the European Commission, *The Potential for Substituting Manpower for Energy* (1976, published 1981), described a "closed-loop" economy; William McDonough and Michael Braungart's *Cradle to Cradle* (2002) popularised design for technical and biological cycles. The Ellen MacArthur Foundation, founded in 2010, published *Towards the Circular Economy* (2013) and *The New Plastics Economy* (2016), which estimated that only $14\,\%$ of plastic packaging was collected for recycling worldwide and $32\,\%$ leaked into the environment. The EU's Waste Framework Directive (2008) codified the waste hierarchy, REACH entered into force in 2007, and the EU adopted Circular Economy Action Plans in 2015 and 2020. In polymer science, the reversibility of PMMA polymerisation was known by the 1940s, Dainton and Ivin explained ceiling temperatures thermodynamically in 1948, and the PET-degrading bacterium *Ideonella sakaiensis* was reported in 2016.
:::

## Where this leads

This chapter closes the course by returning to principle 1 of [[green-chemistry/green-principles]]: prevention. The metrics of [[green-chemistry/green-metrics]] — mass, life cycle, allocation — are exactly those needed to judge recycling routes; the petrochemical chain of [[green-chemistry/petrochemicals]] is where recycled oils re-enter; the renewable and $\mathrm{CO_2}$-based feedstocks of [[green-chemistry/renewable-feedstocks]] and [[green-chemistry/carbon-hydrogen]] are the other two sources of non-fossil carbon. The fate of substances that escape all cycles is the subject of [[environmental-chemistry/pollutants-fate]], and the polymer chemistry of degradation and depolymerisation is developed in [[polymer-chemistry/functional-polymers]].

::: summary
- In 2019, $9\,\%$ of the world's $353\ \mathrm{Mt}$ of plastic waste was recycled, $19\,\%$ incinerated, about half landfilled and $22\,\%$ mismanaged (OECD, 2022). The waste hierarchy ranks prevention, re-use, recycling, recovery and disposal.
- With collection rate $r$ and process yield $\eta$, one unit of virgin material gives $1/(1 - r\eta)$ uses; the steady-state virgin fraction is $1 - r\eta$, and recycled content is capped at $r\eta/(1 + g)$ when demand grows.
- Mechanical recycling preserves chains but degrades them: random scission gives $1/M_{\mathrm{n},k} = 1/M_{\mathrm{n},0} + kz$; immiscible mixtures and additives (including legacy POPs) limit quality.
- Chemical recycling: depolymerisation above the ceiling temperature $T_\mathrm{c} = \Delta_\mathrm{p}H/\Delta_\mathrm{p}S$ (PMMA, about $480\ \mathrm{K}$); solvolysis of condensation polymers (PET methanolysis with $100\,\%$ atom economy to monomers) and enzymatic hydrolysis; pyrolysis and gasification of polyolefins, with mass-balance accounting.
- Recycling routes are judged by life-cycle comparison with what they displace; design for end of life (mono-materials, benign additives, disassembly, degradability where collection is impossible) makes them work.
- REACH (2007) requires registration of substances at $\geq 1\ \mathrm{t\,a^{-1}}$, authorisation of SVHCs and restrictions; TSCA (amended 2016), the Stockholm, Minamata and Montreal treaties, the EU Single-Use Plastics Directive and the Packaging and Packaging Waste Regulation (2025/40) shape what can be made and recycled as of 2026.
:::

## Exercises

::: exercise Virgin fraction {level=1 check="77.5"}
A material is collected for recycling at a rate of $30\,\%$, and $75\,\%$ of what is collected is recovered as usable secondary material. In a steady state, what percentage of each cycle's material must be virgin? (Enter it in per cent.)
::: solution
$1 - r\eta = 1 - 0.30\times0.75 = 0.775$, i.e. $77.5\,\%$.
:::
:::

::: exercise Burning PET {level=1 check="2.29"}
What mass of $\mathrm{CO_2}$ is released by the complete combustion of one kilogram of PET (repeat unit $\mathrm{C_{10}H_8O_4}$, $192.17\ \mathrm{g\,mol^{-1}}$)? (Enter the mass in kg.)
::: solution
Ten carbons per repeat unit: $10\times44.01/192.17 = 2.29\ \mathrm{kg}$. Polyethylene releases more, $3.14\ \mathrm{kg\,kg^{-1}}$, because it contains no oxygen.
:::
:::

::: exercise Ceiling temperature of α-methylstyrene {level=1 check="318"}
With $\Delta_\mathrm{p}H = -35\ \mathrm{kJ\,mol^{-1}}$ and $\Delta_\mathrm{p}S = -110\ \mathrm{J\,K^{-1}\,mol^{-1}}$, find the ceiling temperature of α-methylstyrene. (Enter $T_\mathrm{c}$ in K, to three significant figures.)
::: solution
$T_\mathrm{c} = \Delta_\mathrm{p}H/\Delta_\mathrm{p}S = 35\,000/110 = 318\ \mathrm{K}$ ($45\,^\circ\mathrm{C}$). Poly(α-methylstyrene) is therefore made at low temperature by ionic polymerisation, and depolymerises readily on heating.
:::
:::

::: exercise Five cycles of reprocessing {level=2 check="26.7"}
A polypropylene grade with $M_\mathrm{n} = 80\ \mathrm{kg\,mol^{-1}}$ suffers $5.0\times10^{-6}\ \mathrm{mol}$ of chain scissions per gram in each extrusion cycle. Find $M_\mathrm{n}$ after five cycles. (Enter it in $\mathrm{kg\,mol^{-1}}$, to three significant figures.)
::: solution
$1/M_{\mathrm{n},5} = 1/80\,000 + 5\times5.0\times10^{-6} = 1.25\times10^{-5} + 2.5\times10^{-5} = 3.75\times10^{-5}\ \mathrm{mol\,g^{-1}}$, so $M_{\mathrm{n},5} = 26\,700\ \mathrm{g\,mol^{-1}} = 26.7\ \mathrm{kg\,mol^{-1}}$. Each original chain has been cut twice on average ($5\times5.0\times10^{-6}\times80\,000 = 2.0$).
:::
:::

::: exercise Hydrolysis of PET {level=2 check="0.864"}
PET can be hydrolysed to terephthalic acid (benzene-1,4-dicarboxylic acid, $166.13\ \mathrm{g\,mol^{-1}}$) and ethylene glycol. Write the equation per repeat unit and find the mass of terephthalic acid obtained per tonne of PET. (Enter the mass in tonnes, to three significant figures.)
::: solution
$\mathrm{C_{10}H_8O_4} + 2\,\mathrm{H_2O} \rightarrow \mathrm{C_8H_6O_4} + \mathrm{C_2H_6O_2}$; check: $192.17 + 36.03 = 228.20 = 166.13 + 62.07$. Terephthalic acid: $166.13/192.17 = 0.864\ \mathrm{t}$ per tonne, with $0.323\ \mathrm{t}$ of ethylene glycol.
:::
:::

::: exercise A high-performing system {level=2 check="6.90"}
A deposit-return system collects $90\,\%$ of bottles, and reprocessing recovers $95\,\%$ of their mass. How many uses does each kilogram of virgin polymer provide, if quality is maintained? (Enter $N$, to three significant figures.)
::: solution
$r\eta = 0.855$, so $N = 1/(1 - 0.855) = 1/0.145 = 6.90$ uses. The virgin fraction in a steady state is $14.5\,\%$.
:::
:::

::: exercise Recycled content with growing demand {level=3 check="49.0"}
Derive the bound $r\eta/(1 + g)$ on recycled content for demand growing by a factor $1 + g$ per cycle, and evaluate it for $r = 0.60$, $\eta = 0.85$ and $g = 0.04$. What collection rate would be needed to meet a $65\,\%$ recycled-content target with the same yield and growth? (Enter the recycled content in per cent, to three significant figures.)
::: hint
Material returning in cycle $k + 1$ comes from the demand of cycle $k$.
:::
::: solution
The derivation is in [[#prop-cycles]]: the recycled supply for cycle $k + 1$ is $r\eta D_k$, the demand is $D_k(1 + g)$, so the recycled content is at most $r\eta/(1 + g)$. Numerically $0.60\times0.85/1.04 = 0.490$, i.e. $49.0\,\%$. For $65\,\%$: $r = 0.65\times1.04/0.85 = 0.795$ — almost $80\,\%$ collection, before allowing for material that cannot meet food-contact or performance requirements. Growth in demand is as important a variable as recycling performance.
:::
:::

::: exercise Unzipping PMMA {level=3 check="58.4"}
Using $\Delta_\mathrm{p}H = -56\ \mathrm{kJ\,mol^{-1}}$ and $\Delta_\mathrm{p}S = -117\ \mathrm{J\,K^{-1}\,mol^{-1}}$ for methyl methacrylate, calculate the equilibrium monomer concentration (relative to $1\ \mathrm{mol\,dm^{-3}}$) at $25\,^\circ\mathrm{C}$ and at $400\,^\circ\mathrm{C}$. Pure liquid MMA is about $9.4\ \mathrm{mol\,dm^{-3}}$; explain what the results mean for polymerisation and for recycling. (Enter $[\mathrm{M}]_\mathrm{eq}$ at $400\,^\circ\mathrm{C}$ in $\mathrm{mol\,dm^{-3}}$, to three significant figures.)
::: solution
By [[#eq-ceiling]], at $298.15\ \mathrm{K}$: $\exp(-56\,000/(8.314\times298.15) + 117/8.314) = \exp(-22.59 + 14.07) = \exp(-8.52) = 2.0\times10^{-4}\ \mathrm{mol\,dm^{-3}}$ — polymerisation at room temperature goes essentially to completion. At $673.15\ \mathrm{K}$: $\exp(-10.006 + 14.073) = \exp(4.066) = 58.4\ \mathrm{mol\,dm^{-3}}$, far above the concentration of pure monomer; no polymer can be in equilibrium with its monomer, so PMMA with active chain ends unzips completely, and the monomer distils off as it forms. That is why PMMA scrap can be depolymerised to MMA in yields of $90\,\%$ or more, and why the same treatment of polyethylene ($T_\mathrm{c}$ about $600\ \mathrm{K}$ but no clean unzipping mechanism) gives a mixture of hydrocarbons instead. The values of $\Delta_\mathrm{p}H$ and $\Delta_\mathrm{p}S$ refer to particular standard states and are approximate, so the computed concentrations are estimates.
:::
:::
