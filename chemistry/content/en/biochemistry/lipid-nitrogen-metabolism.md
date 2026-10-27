A well-nourished adult carries perhaps $0.4\ \mathrm{kg}$ of glycogen and something like $10$–$15\ \mathrm{kg}$ of triacylglycerol. The glycogen would fuel a day of ordinary life; the fat would fuel a month or more. A migrating bird crosses an ocean on fat, a hibernating bear sleeps through the winter on it, and a marathon runner who has exhausted muscle glycogen keeps going, more slowly, by oxidising it. Fat is a better store than carbohydrate because its carbon is more reduced — more electrons per carbon to hand to oxygen — and because it is stored without water. Amino acids are the opposite case: the body has no store of them at all, and those not needed for protein synthesis are broken down, their carbon skeletons burned or made into glucose and their nitrogen turned into urea.

This chapter completes the map of metabolism. It follows fatty acids from the adipocyte to the mitochondrion and through β-oxidation, prices the result with the P/O ratios of [[biochemistry/oxidative-phosphorylation#prop-atp-stoich]], explains ketone bodies, and then runs fatty-acid synthesis, which is not β-oxidation in reverse but a separate pathway with different enzymes, carriers and compartment. It then turns to amino acids: transamination with pyridoxal phosphate, the release of ammonia, and the urea cycle, the first metabolic cycle ever discovered. It ends with how the pathways of this course are integrated across tissues by hormones and by a few key regulatory molecules. The thermodynamic tools are those of [[biochemistry/bioenergetics]], and the control logic that of [[biochemistry/glycolysis-citric-acid#def-control]]. The chapter is for education only and is not medical or nutritional advice; where diseases appear, they illustrate mechanisms.

## Mobilising and activating fatty acids

Triacylglycerols in adipose tissue are hydrolysed by lipases — adipose triglyceride lipase, hormone-sensitive lipase and monoacylglycerol lipase — to glycerol and three fatty acids. Lipolysis is switched on by glucagon and adrenaline, which raise cyclic AMP and activate protein kinase A, and switched off by insulin. The fatty acids, poorly soluble in water, travel in the blood bound to serum albumin; glycerol goes to the liver, where glycerol kinase and glycerol 3-phosphate dehydrogenase convert it to dihydroxyacetone phosphate, a glycolytic and gluconeogenic intermediate. Dietary triacylglycerols reach the tissues in a different way, packaged in lipoprotein particles (chylomicrons), but the end result is the same: free fatty acids entering cells.

Inside the cell, a fatty acid is first **activated** as its coenzyme A thioester by acyl-CoA synthetase on the outer mitochondrial membrane:
$$
\mathrm{RCOO^-} + \mathrm{CoA} + \mathrm{ATP} \rightarrow \mathrm{RCO{-}SCoA} + \mathrm{AMP} + \mathrm{PP_i}, \qquad \mathrm{PP_i} + \mathrm{H_2O} \rightarrow 2\,\mathrm{P_i} .
$$
The carboxylate attacks the α-phosphorus of ATP to give an **acyl adenylate** (a mixed anhydride) and pyrophosphate; the thiol of CoA then displaces AMP. The reaction alone is close to equilibrium, but the rapid hydrolysis of pyrophosphate by pyrophosphatase makes the overall activation irreversible at the cost of two phosphoanhydride bonds — the adenylyl-transfer coupling of [[biochemistry/bioenergetics]].

Acyl-CoA cannot cross the inner mitochondrial membrane. The **carnitine shuttle** moves the acyl group instead: carnitine palmitoyltransferase I (CPT I) on the outer membrane transfers it to the hydroxyl of carnitine, a translocase carries acylcarnitine into the matrix in exchange for free carnitine, and CPT II transfers the acyl group back to CoA. CPT I is the gate of fatty-acid oxidation, and it is inhibited by **malonyl-CoA**, the first intermediate of fatty-acid synthesis — a single molecule that stops a cell from oxidising the fatty acids it is making.

## β-Oxidation

In the matrix the acyl-CoA is shortened two carbons at a time by a repeated sequence of four reactions, called β-oxidation because the β-carbon (C3) is oxidised to a ketone before the chain is cut:

1. **Acyl-CoA dehydrogenase** removes two hydrogens from the α- and β-carbons, forming a *trans*-$\Delta^2$-enoyl-CoA. The electrons go to enzyme-bound FAD and then, via the electron-transferring flavoprotein (ETF), to ubiquinone in the respiratory chain — so each such step is worth $1.5$ ATP, like succinate.
2. **Enoyl-CoA hydratase** adds water across the double bond, giving L-3-hydroxyacyl-CoA. The conjugation of the double bond with the thioester carbonyl makes this a Michael-type addition: hydroxide (activated water) attacks the β-carbon and the enolate is protonated at the α-carbon.
3. **3-Hydroxyacyl-CoA dehydrogenase** oxidises the secondary alcohol to a ketone with $\mathrm{NAD^+}$, giving 3-ketoacyl-CoA and NADH.
4. **β-Ketothiolase** cleaves the β-keto thioester with a second CoA: an active-site cysteine attacks the ketone carbonyl, and the C2–C3 bond breaks with the α-carbon leaving as the enolate of acetyl-CoA — a **retro-Claisen** condensation. The products are acetyl-CoA and an acyl-CoA two carbons shorter, attached first to the enzyme and then transferred to CoA.

The sequence — dehydrogenation to an alkene, hydration, dehydrogenation of the alcohol to a ketone — is the same as the succinate → fumarate → malate → oxaloacetate segment of the citric acid cycle ([[biochemistry/glycolysis-citric-acid]]), applied to a long chain. It is a general strategy for oxidising a $\mathrm{CH_2}$ next to a carbonyl.

::: proposition ATP yield from a saturated fatty acid {#prop-beta-yield}
Complete oxidation of a saturated, unbranched fatty acid with an even number $n$ of carbon atoms (activated in the cytosol, oxidised in mitochondria) proceeds through $n/2 - 1$ rounds of β-oxidation, producing $n/2$ acetyl-CoA, $n/2 - 1$ $\mathrm{FADH_2}$ (as ETF-reduced ubiquinol) and $n/2 - 1$ NADH. With P/O ratios of $2.5$ for NADH and $1.5$ for $\mathrm{FADH_2}$, and 10 ATP equivalents per acetyl-CoA oxidised in the citric acid cycle, the net yield is
$$
Y(n) = 4\left(\frac n2 - 1\right) + 10\cdot\frac n2 - 2 = 7n - 6\ \ \text{ATP} ,
$$ {#eq-beta-yield}
so palmitate ($n = 16$) yields $106$ ATP and stearate ($n = 18$) yields $120$. The $-2$ is the two phosphoanhydride bonds spent on activation. The result assumes tightly coupled mitochondria at the conventional P/O ratios; real yields are lower by whatever fraction of $\Delta p$ is lost to proton leak.
:::

::: proof Counting rounds and carriers
One round converts $\mathrm{C}_n$-acyl-CoA into $\mathrm{C}_{n-2}$-acyl-CoA plus acetyl-CoA, with one $\mathrm{FADH_2}$ (step 1) and one NADH (step 3):
$$
\mathrm{C}_n\text{-acyl-CoA} + \mathrm{FAD} + \mathrm{NAD^+} + \mathrm{H_2O} + \mathrm{CoA} \rightarrow \mathrm{C}_{n-2}\text{-acyl-CoA} + \mathrm{FADH_2} + \mathrm{NADH} + \mathrm{H^+} + \mathrm{acetyl\text{-}CoA} .
$$
Starting from $n$ carbons, the last round acts on a four-carbon butyryl-CoA and produces *two* acetyl-CoA, so $n/2 - 1$ rounds produce $n/2$ acetyl-CoA. Each round yields $1.5 + 2.5 = 4$ ATP through the carriers; each acetyl-CoA yields $3 \times 2.5 + 1.5 + 1 = 10$ ATP equivalents in the cycle ([[biochemistry/glycolysis-citric-acid#prop-tca]]); activation costs $2$. Adding, $Y = 4(n/2 - 1) + 5n - 2 = 2n - 4 + 5n - 2 = 7n - 6$. For $n = 16$: $112 - 6 = 106$; for $n = 18$: $126 - 6 = 120$.
:::

::: example Fat versus glucose as a fuel {#ex-palmitate}
(a) Compare the ATP yield per carbon atom and per gram of palmitic acid ($M = 256.42\ \mathrm{g\,mol^{-1}}$) and glucose ($M = 180.16\ \mathrm{g\,mol^{-1}}$, 32 ATP). (b) Explain the difference in terms of oxidation states. (c) Why is the advantage of fat as a *store* even larger than (a) suggests?
::: solution
(a) Palmitate: $106/16 = 6.6$ ATP per carbon and $106/256.42 = 0.413$ mol ATP per gram. Glucose: $32/6 = 5.3$ ATP per carbon and $32/180.16 = 0.178$ mol ATP per gram. Per gram, the fatty acid is worth $0.413/0.178 = 2.3$ times as much ATP.

(b) The average oxidation state of carbon in glucose is 0; in palmitic acid, $\mathrm{C_{16}H_{32}O_2}$, it is $(2\times2 - 32)/16 = -1.75$. Each carbon of a fatty acid therefore has about $1.75$ more electrons to give to oxygen than a carbon of glucose, and ATP yield is essentially electrons delivered to the respiratory chain. Glucose is already "partly burnt"; its oxygen atoms add mass but no reducing power.

(c) Glycogen is stored hydrated, with roughly twice its own mass of water ([[biochemistry/carbohydrates-lipids]]), while triacylglycerol is stored as nearly anhydrous droplets. Per gram of stored tissue the advantage of fat is therefore about $2.3 \times 3 \approx 7$ in ATP terms, close to the factor of about six obtained from heats of combustion ($37$ against $17\ \mathrm{kJ\,g^{-1}}$, divided by the hydration). A human's fat store would weigh several times more if kept as glycogen.
:::
:::

::: widget plot
f: (x/2 - 1)*(1.5 + p) + (x/2)*(3*p + 2.5) - 2; ((x/2 - 1)*(1.5 + p) + (x/2)*(3*p + 2.5) - 2)/x
x: 4, 24
sliders: p=2.5:2:3:0.05
labels: Y(n)\ \text{(ATP per fatty acid)}; Y(n)/n\ \text{(ATP per carbon)}
caption: ATP yield $Y(n) = 7n - 6$ from complete oxidation of a saturated fatty acid with $n$ carbons (first curve; meaningful at even $n$), and the yield per carbon (second curve), which rises towards $7$ as the fixed activation cost is spread over more carbons. Compare glucose at $5.3$ ATP per carbon. The second curve is nearly flat for $n \ge 12$: every additional $\mathrm{CH_2CH_2}$ unit adds exactly $14$ ATP — four from one round of β-oxidation and ten from one acetyl-CoA. The slider `p` is the P/O ratio assumed for NADH (keeping $1.5$ for $\mathrm{FADH_2}$ and $1$ GTP per turn); with the older integer value $p = 3$ (and the same $1.5$ for $\mathrm{FADH_2}$) palmitate would appear to yield $121.5$ ATP, and with the old integers 3 and 2 throughout the classic textbook figure was 129 — a reminder of how much such yields depend on the assumed stoichiometry.
:::

### Unsaturated and odd-chain fatty acids

Natural unsaturated fatty acids have *cis* double bonds, often at odd positions (oleate is *cis*-$\Delta^9$). After three rounds of β-oxidation oleoyl-CoA becomes a *cis*-$\Delta^3$-enoyl-CoA, which the hydratase cannot use. **Enoyl-CoA isomerase** moves the double bond to the *trans*-$\Delta^2$ position, and β-oxidation continues — but the acyl-CoA dehydrogenase step of that round is skipped, so one $\mathrm{FADH_2}$ fewer is made: oleate yields $120 - 1.5 = 118.5$ ATP. Polyunsaturated fatty acids with double bonds at even positions also need a 2,4-dienoyl-CoA reductase, which consumes NADPH.

Fatty acids with an odd number of carbons end with **propionyl-CoA**. It is carboxylated by the biotin enzyme propionyl-CoA carboxylase to D-methylmalonyl-CoA, epimerised to the L form, and rearranged by methylmalonyl-CoA mutase — one of the two human enzymes that need coenzyme $\mathrm{B_{12}}$, which uses a carbon radical generated by homolysis of its Co–C bond — into succinyl-CoA. Succinyl-CoA is a citric acid cycle intermediate and can become oxaloacetate, so the last three carbons of an odd-chain fatty acid, unlike acetyl-CoA, can contribute to glucose synthesis.

### Ketone bodies

In the liver during fasting, oxaloacetate is withdrawn for gluconeogenesis just when β-oxidation is running fastest. Acetyl-CoA then accumulates beyond what the citric acid cycle can accept, and the liver converts it to **ketone bodies**: two acetyl-CoA condense to acetoacetyl-CoA (thiolase run backwards), a third adds to give 3-hydroxy-3-methylglutaryl-CoA (HMG-CoA synthase), and HMG-CoA lyase releases **acetoacetate**, which is partly reduced to **D-3-hydroxybutyrate** by NADH; a little acetoacetate decarboxylates spontaneously to **acetone**. The liver cannot use ketone bodies itself, because it lacks the enzyme that activates acetoacetate; it exports them as water-soluble fuels. Heart and skeletal muscle use them readily, and after several days of starvation the brain obtains a large share of its energy from them, reducing its need for glucose and so sparing muscle protein that would otherwise be broken down for gluconeogenesis.

::: definition Ketone bodies and ketogenesis {#def-ketone}
**Ketone bodies** are acetoacetate, D-3-hydroxybutyrate and acetone, produced from acetyl-CoA in liver mitochondria (**ketogenesis**) when the rate of fatty-acid oxidation exceeds the capacity of the citric acid cycle, typically because oxaloacetate is diverted to gluconeogenesis. In extrahepatic tissues acetoacetate is activated to acetoacetyl-CoA by succinyl-CoA:3-oxoacid CoA-transferase, at the cost of the GTP that succinyl-CoA would otherwise have made, and split by thiolase into two acetyl-CoA. Acetoacetic acid ($\mathrm{p}K_\mathrm{a} \approx 3.6$) and 3-hydroxybutyric acid ($\mathrm{p}K_\mathrm{a} \approx 4.7$) are carboxylic acids that are almost completely ionised at physiological pH, so each molecule made from neutral fatty acid releases one proton into the blood.
:::

::: example Ketone bodies: fuel value and acid load {#ex-ketone}
(a) How many ATP does a heart cell obtain from one D-3-hydroxybutyrate, and from one acetoacetate? (b) In uncontrolled type 1 diabetes, without insulin, ketogenesis runs unchecked. Suppose ketone acids accumulate in plasma at $10\ \mathrm{mmol\,dm^{-3}}$, each proton consuming one bicarbonate. Starting from $[\mathrm{HCO_3^-}] = 24\ \mathrm{mmol\,dm^{-3}}$ and $p_{\mathrm{CO_2}} = 40\ \mathrm{mmHg}$ (dissolved $\mathrm{CO_2}$ $1.2\ \mathrm{mmol\,dm^{-3}}$, $\mathrm{p}K_\mathrm{a}' = 6.1$), estimate the plasma pH if $p_{\mathrm{CO_2}}$ did not change.
::: solution
(a) 3-Hydroxybutyrate is first oxidised to acetoacetate by NAD⁺ (one NADH, $2.5$ ATP). Activation of acetoacetate by succinyl-CoA forgoes one GTP ($-1$). Thiolase gives two acetyl-CoA, worth $20$ ATP. Hence acetoacetate gives $20 - 1 = 19$ ATP and 3-hydroxybutyrate $19 + 2.5 = 21.5$ ATP.

(b) At pH 7.4 the fraction of acetoacetic acid ionised is $1/(1 + 10^{3.6 - 7.4}) = 0.9998$, so each mole made releases essentially one mole of $\mathrm{H^+}$, which is buffered by bicarbonate: $\mathrm{H^+} + \mathrm{HCO_3^-} \rightarrow \mathrm{CO_2} + \mathrm{H_2O}$. Bicarbonate falls to $24 - 10 = 14\ \mathrm{mmol\,dm^{-3}}$. With the Henderson–Hasselbalch equation ([[biochemistry/water-noncovalent#prop-hh]]),
$$
\mathrm{pH} = 6.1 + \log_{10}\frac{14}{1.2} = 6.1 + 1.07 = 7.17 ,
$$
down from $6.1 + \log_{10}(24/1.2) = 7.40$. This is a **metabolic acidosis**. In reality breathing deepens and $p_{\mathrm{CO_2}}$ falls, which raises the pH partly back; the calculation shows why the bicarbonate system, open to the lungs, is the body's main defence ([[biochemistry/water-noncovalent#ex-bicarbonate]]). The example illustrates the chemistry of an acid load; it is not clinical guidance.
:::
:::

::: widget plot
f: 1/(1 + 10^(3.6 - x)); 1/(1 + 10^(4.7 - x)); 1/(1 + 10^(6.1 - x))
x: 2, 8.5
y: 0, 1.05
vlines: 7.4
labels: \text{acetoacetate (ionised fraction)}; \text{3-hydroxybutyrate}; \mathrm{HCO_3^-}\ \text{fraction of } \mathrm{CO_2} + \mathrm{HCO_3^-}
caption: Fraction in the ionised (conjugate-base) form against pH for acetoacetic acid ($\mathrm{p}K_\mathrm{a} \approx 3.6$), 3-hydroxybutyric acid ($\approx 4.7$) and the $\mathrm{CO_2}/\mathrm{HCO_3^-}$ system ($\mathrm{p}K_\mathrm{a}' = 6.1$). At plasma pH 7.4 (vertical line) both ketone acids are essentially fully ionised, so each releases one proton, while the bicarbonate buffer is mostly in its base form and can absorb them. The curves are the Henderson–Hasselbalch fraction $1/(1 + 10^{\mathrm{p}K_\mathrm{a} - \mathrm{pH}})$.
:::

## Fatty-acid synthesis

Fatty acids are made in the cytosol, mostly in liver, adipose tissue and lactating mammary gland, when carbohydrate is plentiful. The pathway builds the chain two carbons at a time, and each cycle looks like β-oxidation run backwards — condensation, reduction of a ketone, dehydration, reduction of an alkene — but nearly every detail differs:

| feature | β-oxidation | fatty-acid synthesis |
|---|---|---|
| compartment | mitochondrial matrix | cytosol |
| acyl carrier | coenzyme A | acyl carrier protein (ACP; phosphopantetheine arm) |
| two-carbon donor / product | acetyl-CoA released | malonyl-ACP donates two carbons, losing $\mathrm{CO_2}$ |
| redox coenzymes | FAD, $\mathrm{NAD^+}$ (oxidations) | NADPH (reductions) |
| stereochemistry of 3-hydroxy intermediate | L | D |
| enzyme organisation | separate enzymes | one multifunctional fatty-acid synthase dimer (animals) |
| key control | CPT I (inhibited by malonyl-CoA) | acetyl-CoA carboxylase |

Acetyl-CoA is made in mitochondria (from pyruvate) and cannot cross the inner membrane as such. It is exported as **citrate**, which ATP-citrate lyase cleaves in the cytosol back to acetyl-CoA and oxaloacetate, at the cost of one ATP per acetyl group; the oxaloacetate is reduced to malate and decarboxylated by malic enzyme to pyruvate, generating NADPH, and the pyruvate returns to the mitochondrion.

The committed step is the carboxylation of acetyl-CoA to **malonyl-CoA** by **acetyl-CoA carboxylase** (ACC), a biotin enzyme. ATP activates bicarbonate as carboxyphosphate, which carboxylates the N1′ of biotin; the long biotin–lysine arm carries the carboxyl group to a second site, where the enolate of acetyl-CoA attacks it. ACC is activated by citrate (which promotes its polymerisation into active filaments), inhibited by palmitoyl-CoA (end-product inhibition), and inactivated by phosphorylation by AMP-activated protein kinase (AMPK), the cell's energy sensor.

Why carboxylate at all, if the $\mathrm{CO_2}$ is lost again at once? The condensation of two acetyl thioesters to acetoacetyl thioester is a Claisen condensation whose equilibrium lies on the side of the reactants — that is why thiolase in β-oxidation runs in the cleavage direction. In fatty-acid synthesis the β-ketoacyl-ACP synthase instead lets the growing acyl chain (on a cysteine of the enzyme) react with malonyl-ACP; **decarboxylation** of malonyl-ACP generates the enolate nucleophile, and the loss of $\mathrm{CO_2}$ makes the condensation strongly favourable. The ATP spent putting the carboxyl on is the price of a reaction that cannot run backwards. The β-ketoacyl-ACP is then reduced by NADPH to D-3-hydroxyacyl-ACP, dehydrated to *trans*-$\Delta^2$-enoyl-ACP, and reduced by NADPH to the saturated acyl-ACP, two carbons longer. After seven cycles the 16-carbon palmitoyl-ACP is released by a thioesterase.

::: proposition The stoichiometry of palmitate synthesis {#prop-fas}
The synthesis of palmitate from acetyl-CoA in the cytosol is
$$
8\,\mathrm{acetyl\text{-}CoA} + 7\,\mathrm{ATP} + 14\,\mathrm{NADPH} + 6\,\mathrm{H^+} \rightarrow \mathrm{palmitate} + 8\,\mathrm{CoA} + 14\,\mathrm{NADP^+} + 7\,\mathrm{ADP} + 7\,\mathrm{P_i} + 6\,\mathrm{H_2O} .
$$ {#eq-fas}
In general, a saturated fatty acid of $n$ carbons ($n$ even) requires $n/2$ acetyl-CoA, $n/2 - 1$ ATP (for malonyl-CoA) and $n - 2$ NADPH, plus one ATP per acetyl group for export from the mitochondrion as citrate.
:::

::: proof
Acetyl-CoA carboxylase makes seven malonyl-CoA from seven acetyl-CoA, using seven ATP: $7\,\mathrm{acetyl\text{-}CoA} + 7\,\mathrm{CO_2} + 7\,\mathrm{ATP} \rightarrow 7\,\mathrm{malonyl\text{-}CoA} + 7\,\mathrm{ADP} + 7\,\mathrm{P_i}$ (protons of the carboxylation omitted). The remaining acetyl-CoA primes the synthase. Each of the seven elongation cycles adds two carbons from one malonyl unit, releases one $\mathrm{CO_2}$, uses two NADPH (one for the ketone, one for the alkene) and releases one water (dehydration): $7 \times 2 = 14$ NADPH and $7$ waters. The $\mathrm{CO_2}$ released equals the $\mathrm{CO_2}$ fixed, and cancels. Release of palmitate by the thioesterase consumes one water, leaving $6$ net. Summing gives [[#eq-fas]]. For $n$ carbons the same count gives $n/2 - 1$ cycles, $n/2 - 1$ ATP and $2(n/2 - 1) = n - 2$ NADPH. The citrate route costs one further ATP per acetyl-CoA delivered to the cytosol, at ATP-citrate lyase.
:::

::: example Where does the NADPH come from? {#ex-nadph}
(a) How many NADPH are needed to make one palmitate, and what is the total cost in ATP equivalents if each NADPH is valued at $2.5$ ATP and the citrate route is included? (b) If malic enzyme supplies one NADPH per acetyl group exported, how many glucose 6-phosphate molecules must be oxidised in the oxidative branch of the pentose phosphate pathway (2 NADPH each) to provide the rest?
::: solution
(a) By [[#prop-fas]], 14 NADPH. Cost: 7 ATP (ACC) + 8 ATP (ATP-citrate lyase for 8 acetyl groups) + $14 \times 2.5 = 35$ ATP equivalents in NADPH, a total of $50$ ATP equivalents — on top of the eight acetyl-CoA themselves, which could have yielded 80 ATP in the citric acid cycle. Oxidising the palmitate later gives back 106 ATP ([[#prop-beta-yield]]): storing and recovering acetyl carbon as fat retains $106/(80 + 50) = 82\,\%$ of its value.

(b) Malic enzyme provides 8 NADPH (one for each oxaloacetate formed from exported citrate), leaving $14 - 8 = 6$ for the pentose phosphate pathway: $6/2 = 3$ glucose 6-phosphate oxidised to ribulose 5-phosphate and $\mathrm{CO_2}$. (The pentoses are recycled to glycolytic intermediates by transketolase and transaldolase.) The two NADPH sources are used in different proportions in different tissues; adipose tissue relies heavily on the pentose phosphate pathway.
:::
:::

::: warning Fatty-acid synthesis is not β-oxidation in reverse, and acetyl-CoA cannot make net glucose
Two errors are worth guarding against. The first is to treat synthesis and degradation as one pathway run in opposite directions. They share the logic of the chemistry, but they differ in compartment, carrier, coenzymes, stereochemistry and enzymes (see the table), and they are controlled reciprocally — ACC makes malonyl-CoA, and malonyl-CoA blocks CPT I — so that a cell does not oxidise the fatty acids it is making. The second is to suppose that animals can turn fat into glucose. The two carbons of acetyl-CoA enter the citric acid cycle, but two carbons leave as $\mathrm{CO_2}$ in every turn ([[biochemistry/glycolysis-citric-acid#prop-tca]]), so there is no *net* gain of oxaloacetate, and pyruvate dehydrogenase is irreversible. Only the glycerol of triacylglycerols, and the last three carbons of odd-chain fatty acids, can become glucose in animals. (Plants and many bacteria can, using the glyoxylate cycle, which bypasses the two decarboxylations.)
:::

## Amino-acid catabolism and the urea cycle

Proteins are turned over continuously — a human degrades and resynthesises a few hundred grams of protein a day — and amino acids taken in beyond the needs of synthesis are oxidised. Their catabolism has two parts: removal of the α-amino group, whose nitrogen ends up mostly in urea, and degradation of the carbon skeleton to one of seven common intermediates.

### Transamination

Most amino acids lose their amino group by **transamination** to α-ketoglutarate, which becomes glutamate:
$$
\text{amino acid} + \alpha\text{-ketoglutarate} \rightleftharpoons \alpha\text{-keto acid} + \text{glutamate} .
$$
The aminotransferases catalysing these reactions use the coenzyme **pyridoxal 5′-phosphate** (PLP), derived from vitamin $\mathrm{B_6}$. Transaminations have apparent equilibrium constants near 1, so they are near-equilibrium reactions that can run in either direction, and they serve both catabolism and the synthesis of non-essential amino acids. Two are especially important: alanine aminotransferase (alanine + α-ketoglutarate ⇌ pyruvate + glutamate) and aspartate aminotransferase (aspartate + α-ketoglutarate ⇌ oxaloacetate + glutamate).

::: example The mechanism of a PLP-dependent transamination {#ex-plp}
Describe, with every electron movement, how alanine aminotransferase converts alanine into pyruvate, and how the enzyme is returned to its starting form.
::: solution
In the resting enzyme the aldehyde of PLP is bound as an imine (Schiff base) to the ε-amino group of an active-site lysine — the **internal aldimine**. (i) The amino group of alanine attacks the imine carbon, and after proton transfers the lysine is released: **transimination** gives the **external aldimine**, in which alanine's nitrogen is now joined by a C=N double bond to the coenzyme. (ii) The lysine, now a free base, removes the α-hydrogen of alanine. The electrons of the C–H bond flow into the extended π system: the C=N bond becomes C–N⁻ conjugated with the pyridine ring, and the protonated ring nitrogen acts as an **electron sink**, stabilising the carbanion as the **quinonoid** intermediate. (iii) The same lysine, now protonated, gives a proton to the carbon of the former aldehyde (C4′ of the coenzyme). The C=N bond has thereby moved: it now lies between the nitrogen and the former α-carbon of alanine — a **ketimine**. (iv) Water attacks the ketimine carbon, and the C–N bond breaks to release **pyruvate**, leaving the nitrogen on the coenzyme as **pyridoxamine phosphate** (PMP). The second half-reaction is the exact reverse with α-ketoglutarate: PMP condenses with the keto acid to a ketimine, the proton is moved back, hydrolysis by the lysine (transimination) releases **glutamate** and regenerates the internal aldimine. The coenzyme has carried the amino group from one keto acid to another (a **ping-pong** mechanism, [[biochemistry/enzymes]]). The same electron-sink chemistry, with different bonds to the α-carbon broken, lets other PLP enzymes catalyse decarboxylations, racemisations and eliminations of amino acids.
:::
:::

### Release of ammonia

Glutamate collects amino groups from most amino acids. In liver mitochondria, **glutamate dehydrogenase** removes the nitrogen as ammonium by oxidative deamination, using $\mathrm{NAD^+}$ or $\mathrm{NADP^+}$:
$$
\mathrm{glutamate} + \mathrm{NAD(P)^+} + \mathrm{H_2O} \rightleftharpoons \alpha\text{-ketoglutarate} + \mathrm{NH_4^+} + \mathrm{NAD(P)H} + \mathrm{H^+} .
$$
Ammonia is toxic, particularly to the brain, in part because it drains α-ketoglutarate from the citric acid cycle (as glutamate and glutamine) and disturbs neurotransmitter and pH balance. Other tissues therefore send nitrogen to the liver in non-toxic forms: as **glutamine** (made by glutamine synthetase from glutamate and $\mathrm{NH_4^+}$ with ATP) from most tissues, and as **alanine** from muscle, which transaminates pyruvate to alanine. In the liver, alanine gives back pyruvate for gluconeogenesis, and the glucose returns to muscle — the **glucose–alanine cycle**, the nitrogen-carrying counterpart of the Cori cycle.

### The urea cycle

Mammals excrete most of their surplus nitrogen as **urea**, $\mathrm{(NH_2)_2CO}$, made in the liver by a cycle that spans the mitochondrion and the cytosol:

1. **Carbamoyl phosphate synthetase I** (mitochondrial) makes carbamoyl phosphate from $\mathrm{NH_4^+}$, bicarbonate and two ATP: one ATP activates bicarbonate as carboxyphosphate, ammonia attacks to give carbamate, and the second ATP phosphorylates carbamate. The enzyme is allosterically activated by **N-acetylglutamate**, whose concentration rises when amino-acid levels are high.
2. **Ornithine transcarbamoylase** transfers the carbamoyl group to ornithine, giving **citrulline**, which is exported to the cytosol.
3. **Argininosuccinate synthetase** condenses citrulline with **aspartate** — the source of the second nitrogen — using ATP, which is cleaved to AMP and pyrophosphate (the ureido oxygen is activated as a citrullyl–AMP intermediate).
4. **Argininosuccinate lyase** eliminates **fumarate**, giving **arginine**.
5. **Arginase** hydrolyses arginine to **urea** and ornithine, which returns to the mitochondrion.

::: proposition The stoichiometry and cost of the urea cycle {#prop-urea}
The net reaction of the urea cycle is
$$
\mathrm{CO_2} + \mathrm{NH_4^+} + \mathrm{aspartate} + 3\,\mathrm{ATP} + 2\,\mathrm{H_2O} \rightarrow \mathrm{urea} + \mathrm{fumarate} + 2\,\mathrm{ADP} + 2\,\mathrm{P_i} + \mathrm{AMP} + \mathrm{PP_i},
$$ {#eq-urea}
(protons omitted, as is usual for biochemical equations), consuming four phosphoanhydride bonds per urea after hydrolysis of $\mathrm{PP_i}$. If the fumarate is converted back to aspartate through malate and oxaloacetate — fumarase, malate dehydrogenase (producing NADH) and transamination — the NADH is worth $2.5$ ATP, and the net cost falls to about $1.5$ ATP per urea.
:::

::: proof
Adding the five steps: carbamoyl phosphate synthesis uses $\mathrm{NH_4^+}$, $\mathrm{CO_2}$ (as bicarbonate) and 2 ATP, giving 2 ADP and one $\mathrm{P_i}$; ornithine transcarbamoylase releases the second $\mathrm{P_i}$; argininosuccinate synthetase uses aspartate and one ATP, giving AMP and $\mathrm{PP_i}$; the lyase releases fumarate; arginase uses one water to release urea and regenerate ornithine, which cancels with the ornithine consumed in step 2, as do citrulline, argininosuccinate and arginine. Counting atoms shows that two waters are needed to balance the sum when protons are omitted, one of them the substrate of arginase; the result is [[#eq-urea]]. The energy cost: two ATP → ADP plus one ATP → AMP + $\mathrm{PP_i}$ followed by $\mathrm{PP_i} \rightarrow 2\,\mathrm{P_i}$, i.e. $2 + 2 = 4$ phosphoanhydride bonds. Recycling fumarate: fumarate → malate (fumarase) → oxaloacetate + NADH (malate dehydrogenase) → aspartate (aspartate aminotransferase, taking the nitrogen from glutamate). The NADH yields $2.5$ ATP in the respiratory chain, so the net cost is $4 - 2.5 = 1.5$ ATP per urea. This link between the urea cycle and the citric acid cycle through fumarate and aspartate is sometimes called the Krebs bicycle.
:::

::: widget graph
nodes: NH4@0,3; CarbP@1.5,3; Ornithine@1.5,1; Citrulline@3,2.5; Aspartate@4.5,3.8; ArgSucc@4.5,2; Fumarate@6,2; Arginine@3.8,0.5; Urea@2.2,0
edges: NH4>CarbP:2; CarbP>Citrulline; Ornithine>Citrulline; Citrulline>ArgSucc:2; Aspartate>ArgSucc; ArgSucc>Fumarate; ArgSucc>Arginine; Arginine>Urea; Arginine>Ornithine
algorithm: none
caption: The urea cycle as a reaction network. Ammonium (NH4, with bicarbonate) becomes carbamoyl phosphate (CarbP) in the mitochondrion; ornithine accepts the carbamoyl group to give citrulline; citrulline and aspartate form argininosuccinate (ArgSucc) in the cytosol; argininosuccinate is split into fumarate and arginine; arginine is hydrolysed to urea, regenerating ornithine. Edge labels give the phosphoanhydride bonds spent: two at carbamoyl phosphate synthetase I and two at argininosuccinate synthetase (ATP → AMP + 2 $\mathrm{P_i}$). One nitrogen of urea comes from free ammonium, the other from aspartate, and the fumarate links the cycle to the citric acid cycle.
:::

Inherited deficiencies of any urea-cycle enzyme raise blood ammonia, which shows how essential the cycle is; they are described here only as illustrations of the pathway's importance, not as medical information.

### The fate of the carbon skeletons

After the nitrogen has gone, the twenty carbon skeletons are degraded to only seven products: pyruvate, acetyl-CoA, acetoacetyl-CoA, α-ketoglutarate, succinyl-CoA, fumarate and oxaloacetate. Amino acids whose skeletons give pyruvate or a citric acid cycle intermediate are **glucogenic**: they can supply net oxaloacetate and so glucose. Those giving acetyl-CoA or acetoacetyl-CoA are **ketogenic**. Only leucine and lysine are exclusively ketogenic; isoleucine, phenylalanine, tyrosine, tryptophan and threonine are both; the rest are glucogenic. In prolonged fasting, muscle protein is the main source of glucogenic carbon, which is why the shift of the brain to ketone bodies, reducing its glucose demand, protects the body's protein.

## Integration of metabolism

The pathways of this course are not independent: they share intermediates, compete for the same coenzymes and are controlled together. Integration works on three levels.

**Tissues have specialised roles.** The **liver** maintains blood glucose (glycogenolysis and gluconeogenesis), makes ketone bodies and urea, and processes most dietary nutrients first. **Skeletal muscle** stores glycogen for its own use and, at rest, oxidises fatty acids; in a sprint it relies on phosphocreatine and anaerobic glycolysis. **Adipose tissue** stores and releases triacylglycerol. The **brain** normally uses glucose almost exclusively — over $100\ \mathrm{g}$ a day in an adult — and in prolonged starvation ketone bodies as well; it cannot oxidise fatty acids to any significant extent. **Erythrocytes**, without mitochondria, rely on glycolysis alone.

**Hormones signal the nutritional state.** After a meal, **insulin** from pancreatic β-cells promotes glucose uptake into muscle and adipose tissue, glycogen synthesis, glycolysis and fatty-acid synthesis, and inhibits lipolysis, gluconeogenesis and ketogenesis; many of its effects are mediated by dephosphorylation of key enzymes. In fasting, **glucagon** acts on the liver (and **adrenaline** on liver and muscle) through cyclic AMP and protein kinase A, phosphorylating the same enzymes in the opposite sense: glycogen phosphorylase is activated and glycogen synthase inactivated, the bifunctional enzyme lowers fructose 2,6-bisphosphate so that gluconeogenesis wins over glycolysis ([[biochemistry/glycolysis-citric-acid]]), and acetyl-CoA carboxylase is inhibited, so malonyl-CoA falls and CPT I opens the mitochondria to fatty acids.

**A few molecules act as switches within cells.** Malonyl-CoA decides between fatty-acid synthesis and oxidation. Citrate signals abundant fuel (activating ACC, inhibiting PFK). AMP, sensed by AMPK, signals a falling energy charge and switches on catabolism (glucose uptake, fatty-acid oxidation) while switching off energy-consuming synthesis. And the products of fatty-acid oxidation — acetyl-CoA, NADH and citrate — inhibit pyruvate dehydrogenase and PFK, so that tissues burning fat spare glucose (the glucose–fatty acid cycle described by Philip Randle and colleagues in 1963).

::: quiz Fed or fasting?
In the liver of a person who has fasted overnight, which of the following is *increased* compared with the fed state? (Select all that apply.)
- [x] Activity of carnitine palmitoyltransferase I
- [ ] Concentration of malonyl-CoA
- [x] Rate of ketone-body production
- [ ] Concentration of fructose 2,6-bisphosphate
- [x] Rate of gluconeogenesis
::: solution
Fasting raises glucagon and lowers insulin. Protein kinase A phosphorylates acetyl-CoA carboxylase (and AMPK may too), so malonyl-CoA falls and CPT I is relieved of inhibition: fatty-acid oxidation and, with oxaloacetate diverted to gluconeogenesis, ketogenesis increase. The bifunctional enzyme is phosphorylated, fructose 2,6-bisphosphate falls, PFK slows and fructose 1,6-bisphosphatase is released from inhibition, so gluconeogenesis rises.
:::
:::

## Where this leads

This chapter closes the course's account of metabolism. The control of pathways by allosteric enzymes and covalent modification developed in [[biochemistry/enzymes]] and the binding theory of [[biochemistry/protein-function]] are the basis on which [[medicinal-chemistry]] designs enzyme inhibitors that act on these pathways (statins on HMG-CoA reductase, the enzyme after HMG-CoA synthase on the route to cholesterol, are a classic example). The membrane lipids made from fatty acids are the subject of [[biochemistry/carbohydrates-lipids]]; the nitrogen economy links to the synthesis of nucleotides in [[biochemistry/nucleic-acids]]; and the coenzymes met here — biotin, PLP, coenzyme $\mathrm{B_{12}}$, lipoamide — are met again as reaction mechanisms in [[organic-2]] and, for the metal-containing ones, in [[coordination-chemistry/bioinorganic]].

::: history
In 1904 Franz Knoop fed dogs fatty acids with a phenyl group at the end of the chain and found that those with an even number of carbons were excreted as a phenylacetic acid derivative and those with an odd number as a benzoic acid derivative: the chain must be shortened two carbons at a time, by oxidation at the β-carbon. Eugene Kennedy and Albert Lehninger showed in 1949 that fatty-acid oxidation takes place in mitochondria, and Feodor Lynen and others identified the CoA thioester intermediates in the early 1950s. Salih Wakil discovered in 1958 that fatty-acid synthesis requires bicarbonate and goes through malonyl-CoA, showing that synthesis is a separate pathway; Konrad Bloch and Feodor Lynen shared the 1964 Nobel Prize in Physiology or Medicine for work on cholesterol and fatty-acid metabolism. On the nitrogen side, Rudolf Schoenheimer's experiments with isotopically labelled amino acids in the 1930s showed that body proteins are continuously degraded and resynthesised (*The Dynamic State of Body Constituents*, published posthumously in 1942). Alexander Braunstein and Maria Kritzmann described transamination in 1937. The urea cycle, proposed by Hans Krebs and Kurt Henseleit in 1932 from experiments on liver slices showing that ornithine and citrulline act catalytically, was the first metabolic cycle to be discovered, five years before Krebs's citric acid cycle. Oliver Owen, George Cahill and colleagues showed in 1967 that the brains of fasting people obtain much of their energy from ketone bodies.
:::

::: summary
- Fatty acids are activated as acyl-CoA (two phosphoanhydride bonds), enter mitochondria via the carnitine shuttle (gated by CPT I, inhibited by malonyl-CoA), and are oxidised by repeated rounds of dehydrogenation (FAD), hydration, dehydrogenation (NAD⁺) and thiolysis.
- A saturated fatty acid of $n$ carbons yields $7n - 6$ ATP: 106 for palmitate. Fat yields about 2.3 times more ATP per gram than glucose, because its carbon is more reduced, and is stored without water.
- Unsaturated fatty acids need an isomerase (and sometimes a reductase); odd-chain fatty acids give propionyl-CoA, converted via methylmalonyl-CoA (coenzyme $\mathrm{B_{12}}$) to succinyl-CoA.
- In fasting the liver turns excess acetyl-CoA into ketone bodies, fuels for heart, muscle and the starving brain; their acids are fully ionised at pH 7.4 and consume bicarbonate.
- Fatty-acid synthesis uses malonyl-CoA (acetyl-CoA carboxylase, the committed step), ACP, NADPH and a multifunctional synthase in the cytosol; palmitate needs 8 acetyl-CoA, 7 ATP and 14 NADPH. Decarboxylation of malonyl drives the condensation.
- Amino groups are collected by PLP-dependent transamination onto glutamate and released as ammonium by glutamate dehydrogenase; the urea cycle converts ammonium and aspartate nitrogen into urea at a cost of four phosphoanhydride bonds (about 1.5 ATP net after fumarate recycling).
- Carbon skeletons are glucogenic or ketogenic; insulin, glucagon, adrenaline, AMPK and intracellular signals (malonyl-CoA, citrate, AMP) coordinate the pathways across liver, muscle, adipose tissue and brain.
:::

## Exercises

::: exercise The yield of stearate {level=1 check="120"}
How many ATP are produced by the complete oxidation of one stearate (18:0), using P/O ratios of 2.5 and 1.5? (Enter the number of ATP.)
::: solution
Eight rounds of β-oxidation give 8 $\mathrm{FADH_2}$ ($12$ ATP) and 8 NADH ($20$ ATP); 9 acetyl-CoA give $90$; activation costs $2$. Total $12 + 20 + 90 - 2 = 120$, which is $7n - 6$ with $n = 18$ ([[#prop-beta-yield]]).
:::
:::

::: exercise NADPH for stearate {level=1 check="16"}
How many NADPH does the cytosol need to synthesise one stearate (18:0) from acetyl-CoA? (Enter the number of NADPH.)
::: solution
By [[#prop-fas]], $n - 2 = 16$ NADPH: eight elongation cycles from the priming acetyl group, each with two reductions. (In animals, elongation from palmitate to stearate actually takes place on the endoplasmic reticulum with malonyl-CoA and NADPH, but the count is the same.)
:::
:::

::: exercise Urea from dietary protein {level=1 check="34.3"}
An adult in nitrogen balance eats $100\ \mathrm{g}$ of protein a day. Protein is about $16\,\%$ nitrogen by mass. If all of this nitrogen is excreted as urea ($M = 60.06\ \mathrm{g\,mol^{-1}}$, two N per molecule), what mass of urea is produced per day? (Enter the mass in grams to three significant figures.)
::: solution
Nitrogen: $0.16 \times 100 = 16\ \mathrm{g}$, i.e. $16/14.007 = 1.142\ \mathrm{mol}$ N. Urea: $1.142/2 = 0.571\ \mathrm{mol}$, or $0.571 \times 60.06 = 34.3\ \mathrm g$. (In reality a little nitrogen leaves as ammonium, creatinine and uric acid, so urea is somewhat less.) The cost is $4 \times 0.571 = 2.3\ \mathrm{mol}$ of phosphoanhydride bonds a day, a few per cent of the daily ATP turnover ([[biochemistry/bioenergetics]]).
:::
:::

::: exercise Oleate {level=2 check="118.5"}
Oleate is *cis*-$\Delta^9$-octadecenoate (18:1). Explain why its complete oxidation yields fewer ATP than stearate, and calculate the yield. (Enter the number of ATP.)
::: solution
After three rounds of β-oxidation the double bond is at the *cis*-$\Delta^3$ position, which enoyl-CoA isomerase moves to *trans*-$\Delta^2$ — the double bond that acyl-CoA dehydrogenase would otherwise have made. That round therefore skips the FAD-linked dehydrogenation and produces one $\mathrm{FADH_2}$ fewer. Yield: $120 - 1.5 = 118.5$ ATP. Each double bond in a fatty acid is a step already taken towards oxidation: the less saturated a fat, the less reducing power it carries.
:::
:::

::: exercise A whole triacylglycerol {level=2 check="336.5"}
Calculate the ATP yield from the complete oxidation of one tripalmitoylglycerol. The glycerol is phosphorylated by glycerol kinase (1 ATP), oxidised to dihydroxyacetone phosphate by NAD⁺ (cytosolic NADH entering via the malate–aspartate shuttle, $2.5$ ATP), and then follows glycolysis and pyruvate oxidation. (Enter the number of ATP, to one decimal place.)
::: solution
Three palmitates: $3 \times 106 = 318$. Glycerol: $-1$ (kinase) $+2.5$ (glycerol 3-phosphate dehydrogenase) $+2$ (substrate-level ATP in the lower half of glycolysis) $+2.5$ (GAPDH NADH) $+2.5$ (pyruvate dehydrogenase) $+10$ (acetyl-CoA in the cycle) $= 18.5$. Total $318 + 18.5 = 336.5$ ATP per molecule ($M = 807.3\ \mathrm{g\,mol^{-1}}$), or $0.417$ mol ATP per gram — essentially the same as free palmitic acid, since glycerol is a small fraction of the mass.
:::
:::

::: exercise Acid load from ketone bodies {level=2 check="7.17"}
Repeat the calculation of [[#ex-ketone]](b) to find the plasma pH at constant $p_{\mathrm{CO_2}}$ when $10\ \mathrm{mmol\,dm^{-3}}$ of ketone acids have accumulated, starting from $24\ \mathrm{mmol\,dm^{-3}}$ bicarbonate and $1.2\ \mathrm{mmol\,dm^{-3}}$ dissolved $\mathrm{CO_2}$ ($\mathrm{p}K_\mathrm{a}' = 6.1$). Then find the $p_{\mathrm{CO_2}}$ (in mmHg; $1.2\ \mathrm{mmol\,dm^{-3}}$ corresponds to $40\ \mathrm{mmHg}$) needed to return the pH to 7.40. (Enter the pH at constant $p_{\mathrm{CO_2}}$ to two decimal places.)
::: solution
$\mathrm{pH} = 6.1 + \log_{10}(14/1.2) = 6.1 + 1.067 = 7.17$. To restore pH 7.40 with $[\mathrm{HCO_3^-}] = 14$, the ratio must again be 20, so dissolved $\mathrm{CO_2}$ must fall to $14/20 = 0.70\ \mathrm{mmol\,dm^{-3}}$, i.e. $p_{\mathrm{CO_2}} = 40 \times 0.70/1.2 = 23\ \mathrm{mmHg}$. Faster, deeper breathing achieves part of this — respiratory compensation of a metabolic acidosis.
:::
:::

::: exercise An odd-chain fatty acid {level=3 check="100"}
Heptadecanoate (17:0) is activated and undergoes β-oxidation until propionyl-CoA remains. Propionyl-CoA is converted to succinyl-CoA (propionyl-CoA carboxylase uses 1 ATP), and succinyl-CoA is oxidised to oxaloacetate in the citric acid cycle. Counting only these steps (and not the further oxidation of the oxaloacetate), calculate the ATP yield. (Enter the number of ATP.)
::: hint
Count the rounds: each removes two carbons until three remain. Then count what succinyl-CoA → succinate → fumarate → malate → oxaloacetate produces.
:::
::: solution
Seven rounds of β-oxidation take $\mathrm{C_{17}}$ to $\mathrm{C_3}$, producing 7 $\mathrm{FADH_2}$, 7 NADH and 7 acetyl-CoA: $7 \times 4 + 7 \times 10 = 98$ ATP. Activation: $-2$. Propionyl-CoA → succinyl-CoA: $-1$. Succinyl-CoA → oxaloacetate: GTP ($1$), $\mathrm{FADH_2}$ ($1.5$), NADH ($2.5$): $+5$. Total $98 - 2 - 1 + 5 = 100$ ATP. The oxaloacetate formed is a net gain of a cycle intermediate, so it can be used for gluconeogenesis — or, to be oxidised completely, it must leave the cycle (as PEP or via malic enzyme to pyruvate) and re-enter as acetyl-CoA, which would add more ATP.
:::
:::

::: exercise The cost of storing fat {level=3 check="50"}
(a) Using [[#prop-fas]], with one ATP per acetyl group for export from the mitochondrion as citrate and $2.5$ ATP per NADPH, calculate the cost of synthesising one palmitate from mitochondrial acetyl-CoA, in ATP equivalents. (b) Compare it with the yield from oxidising the palmitate later, and with the yield the eight acetyl-CoA would have given if oxidised immediately. What fraction of the energy is retained by storing it as fat? (Enter the synthesis cost in ATP equivalents.)
::: solution
(a) $7$ (acetyl-CoA carboxylase) $+ 8$ (ATP-citrate lyase) $+ 14 \times 2.5$ (NADPH) $= 7 + 8 + 35 = 50$ ATP equivalents. (b) Oxidation of palmitate yields $106$. Immediate oxidation of the eight acetyl-CoA would have yielded $80$. Storing them as fat therefore costs $50$ now and returns $106$ later, a net of $56$ instead of $80$ — or, put differently, the round trip retains $106/(80 + 50) = 82\,\%$ of the combined value. Storage is expensive but much cheaper than going without a store; and some of the "cost" is notional, since NADPH generated by the pentose phosphate pathway does not otherwise make ATP.
:::
:::

::: exercise The net cost of disposing of nitrogen {level=3 check="1.5"}
(a) Derive the net reaction of the urea cycle and count the phosphoanhydride bonds consumed. (b) Show how recycling the fumarate to aspartate recovers part of the cost, and calculate the net cost in ATP per urea. (c) Explain why the cycle needs the second nitrogen to arrive as aspartate rather than as a second ammonium. (Enter the net cost in ATP per urea.)
::: solution
(a) As in the proof of [[#prop-urea]]: carbamoyl phosphate synthetase I uses 2 ATP (2 bonds), argininosuccinate synthetase uses 1 ATP → AMP + $\mathrm{PP_i}$, and $\mathrm{PP_i}$ hydrolysis makes that 2 bonds; total 4. (b) Fumarate → malate → oxaloacetate produces one NADH ($2.5$ ATP), and transamination of oxaloacetate with glutamate regenerates aspartate (no energy cost; the glutamate carries nitrogen collected from other amino acids). Net cost $4 - 2.5 = 1.5$ ATP per urea. (c) Free ammonium is kept low because it is toxic, and carbamoyl phosphate synthetase I fixes it only in the mitochondrion with a high-affinity, highly regulated enzyme. Delivering the second nitrogen as aspartate — made by transamination from the glutamate pool — lets the liver dispose of nitrogen collected from all amino acids without raising free ammonium, and couples urea synthesis to the citric acid cycle through fumarate and oxaloacetate.
:::
:::
