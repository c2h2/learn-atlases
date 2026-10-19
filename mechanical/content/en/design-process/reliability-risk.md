Reliability is the probability that a product performs its intended function under stated conditions for a stated period of time. The definition contains three words that are the source of every reliability argument: **intended** (what is the function? what is a failure?), **stated** (what are the conditions? temperature, load, humidity, vibration?), and **period** (how long is the life? 1 000 hours? 20 years? one mission?). **A reliability claim without these three qualifiers is a marketing statement, not an engineering statement.** The bearing that has a B10 life of 20 000 hours at 3 000 rpm and 5 kN radial load has a completely different life at 10 000 rpm and 10 kN, and the difference is the reason the bearing fails at 2 000 hours in the field and the warranty claim arrives at the manufacturer's office.

Risk is the product of the probability of failure and the consequence of failure. The risk is the reason the engineer designs a bridge with a factor of safety of 2 and a bicycle with a factor of safety of 4: the consequence of a bridge failure is 50 deaths, and the consequence of a bicycle failure is 1 broken wrist. **The factor of safety is not a measure of the engineer's confidence in the calculation; it is a measure of the engineer's responsibility to the public.** The FMEA, the fault tree, the reliability block diagram, and the FTA are the tools that quantify the risk, and the quantification is the reason the risk is managed rather than ignored.

::: warning Nine ways reliability and risk go wrong
**Confusing reliability with quality.** Quality is conformance to the specification (the part is within tolerance); reliability is the probability that the part performs its function over time (the part has not failed after 10 000 hours). **A part can be perfectly manufactured (quality) and fail after 100 hours (reliability), because the failure mechanism (fatigue, wear, corrosion) is not a manufacturing defect but a design limitation.** **Not defining the failure mode.** "The bearing failed" is not a failure mode; "the bearing failed by spalling of the outer race at the 3 o'clock position, with a 2 mm diameter pit, after 8 000 hours of operation at 3 000 rpm" is. **Write the failure mode as a mechanism, a location, and a magnitude, and the failure mode is the input to the FMEA, the fault tree, and the corrective action.** **Using the wrong failure distribution.** The exponential distribution (constant failure rate) is appropriate for electronic components in the useful-life phase; the Weibull distribution (increasing failure rate) is appropriate for mechanical components in the wear-out phase; the lognormal distribution is appropriate for fatigue. **Using the exponential distribution for a bearing that fails by wear is the reason the predicted B10 life is 50 000 hours and the actual B10 life is 5 000 hours.** **Not accounting for the load spectrum.** The bearing that operates at 50 % load for 80 % of the time and 100 % load for 20 % of the time has a different life than the bearing that operates at 70 % load continuously, and the difference is the Miner's rule damage accumulation. **Use the load spectrum, not the average load, and the spectrum is the reason the bearing life is 10× shorter than the catalogue rating.** **Ignoring the common-cause failure.** The fault tree that treats two redundant pumps as independent events is wrong if both pumps are powered by the same electrical supply, controlled by the same PLC, and maintained by the same technician. **The common-cause failure is the reason the redundant system fails, and the common-cause failure is the reason the redundancy is not 100 % effective.** **Not doing the FMEA.** The FMEA is the tool that identifies the failure modes before the design is frozen, and the identification is the reason the failure mode is designed out rather than tested out. **The FMEA that is done after the design freeze is the FMEA that produces a change order, and the change order costs 100× the cost of the FMEA.** **Not setting the reliability target.** The product that has no reliability target has no reliability requirement, and the product that has no reliability requirement has no reliability design. **Set the reliability target at the requirements stage (MTBF, B10, availability), and the target is the reason the design has a redundancy, a derating, or a maintenance interval.** **Not testing to failure.** The test that is stopped after 1 000 hours without a failure has not demonstrated a B10 life of 10 000 hours; it has demonstrated that the product survives 1 000 hours. **Test to failure, or test to the required life with a statistical confidence level, and the confidence level is the reason the test is 3× the required life, not 1×.** **Not tracking the field data.** The field data is the only evidence of the product's actual reliability, and the actual reliability is the only number that matters. **Track the field failures, calculate the actual MTBF, compare it to the predicted MTBF, and if the actual is less than the predicted, do the failure analysis and the corrective action.**
:::

## 1. Reliability fundamentals

::: definition Reliability, failure rate, and the bathtub curve {#def-reliability}
**Reliability** $R ( t )$ is the probability that a product performs its intended function without failure for a time $t$ under stated conditions:

$$
R ( t ) \; = \; P ( T > t ) \; = \; 1 - F ( t )
$$

where $T$ is the random variable representing the time to failure and $F ( t )$ is the cumulative distribution function (CDF) of the failure times.

The **failure rate** $\lambda ( t )$ is the instantaneous rate of failure at time $t$ , given survival to time $t$ :

$$
\lambda ( t ) \; = \; - { \frac { \mathrm { d } \ln { R ( t ) } } { \mathrm { d } t } } \; = \; { \frac { f ( t ) } { R ( t ) } }
$$

The **bathtub curve** is the characteristic shape of $\lambda ( t )$ for a mechanical or electronic product:

$$
\begin{array} { l l l l }
\textbf{Phase} & \textbf{Failure rate} & \textbf{Cause} & \textbf{Duration} \\ \hline
\text{Infant mortality} & \text{Decreasing} & \text{Manufacturing defects, workmanship} & 0 \text{--} 1 0 0 \ \text{h} \\
\text{Useful life} & \text{Constant} & \text{Random events (overstress, surge)} & 1 0 0 \text{--} 1 0 \ 0 0 0 \ \text{h} \\
\text{Wear-out} & \text{Increasing} & \text{Fatigue, wear, corrosion, creep} & > 1 0 \ 0 0 0 \ \text{h} \\
\end{array}
$$

**The bathtub curve is the reason the product is "burned in" (operated for 100 hours before shipment to screen out the infant-mortality failures) and "maintained" (the wear parts are replaced before the wear-out phase begins). The burn-in is the reason the customer does not receive a defective product, and the maintenance is the reason the product does not fail in the field.**
:::

::: definition The exponential, Weibull, and lognormal distributions {#def-distributions}
The three distributions that cover 95 % of engineering reliability problems are:

$$
\begin{array} { l l l l }
\textbf{Distribution} & \textbf{Reliability} & \textbf{Failure rate} & \textbf{Application} \\ \hline
\text{Exponential} & R ( t ) = e ^ { - \lambda t } & \lambda ( t ) = \lambda = \text{const} & \text{Useful life, electronics} \\
\text{Weibull} & R ( t ) = e ^ { - ( t / \eta ) ^ { \beta } } & \lambda ( t ) = ( \beta / \eta ) ( t / \eta ) ^ { \beta - 1 } & \text{Wear-out, fatigue, wear} \\
\text{Lognormal} & R ( t ) = 1 - \Phi \left( { \frac { \ln t - \mu } { \sigma } } \right) & \text{Increasing} & \text{Fatigue, corrosion} \\
\end{array}
$$

The **Weibull shape parameter** $\beta$ determines the failure-rate behaviour:

- $\beta < 1$ : decreasing failure rate (infant mortality)
- $\beta = 1$ : constant failure rate (exponential)
- $\beta = 2$ : increasing failure rate (wear-out, bearing fatigue)
- $\beta = 3$ : strongly increasing failure rate (mechanical wear)
- $\beta > 1 0$ : deterministic failure (the product fails at a precise age)

The **characteristic life** $\eta$ is the time at which $6 3 . 2 \%$ of the population has failed. The **B10 life** is the time at which $10 \%$ of the population has failed:

$$
B _ { 1 0 } \; = \; \eta \, ( - \ln { 0 . 9 } ) ^ { 1 / \beta } \; = \; 0 . 5 2 6 \, \eta \quad ( \beta = 1 . 5 , \text{bearings} )
$$

**The B10 life is the standard reliability metric for bearings, gears, and mechanical components, and the B10 life is the reason the catalogue rating is not the design life. The catalogue B10 life is the life at the catalogue load and speed; the design life is the life at the actual load and speed, and the actual load is 1.5× the catalogue load, so the design life is $( 1 / 1 . 5 ) ^ { 3 } = 0 . 3 0$ of the catalogue life.**
:::

::: definition MTBF, MTTR, and availability {#def-mtbf}
The **Mean Time Between Failures** (MTBF) is the average time between consecutive failures of a repairable product:

$$
\text{MTBF } \; = \; { \frac { 1 } { \lambda } } \quad \text{(exponential distribution)}
$$

The **Mean Time To Repair** (MTTR) is the average time to restore the product to service after a failure. The **availability** $A$ is the fraction of time that the product is available for use:

$$
A \; = \; { \frac { \text{MTBF } } { \text{MTBF } + \text{MTTR } } }
$$

$$
\begin{array} { l c c }
\textbf{Product} & \textbf{MTBF (h)} & \textbf{MTTR (h)} & \textbf{Availability} \\ \hline
\text{Domestic washing machine} & 5 \ 0 0 0 & 4 & 9 9 . 9 2 \ \% \\
\text{CNC machining centre} & 2 \ 0 0 0 & 8 & 9 9 . 6 0 \ \% \\
\text{Airliner engine} & 10 \ 0 0 0 & 200 & 9 8 . 0 4 \ \% \\
\text{Data-centre UPS} & 50 \ 000 & 0 . 5 & 9 9 . 9 9 9 \ \% \\
\end{array}
$$

**The availability is the metric that the customer cares about, not the MTBF. A product with an MTBF of 1 000 hours and an MTTR of 1 hour has an availability of 99.9 %, which is better than a product with an MTBF of 10 000 hours and an MTTR of 100 hours (availability 99.0 %). The engineer who designs for MTBF without considering MTTR is designing the wrong metric.**
:::

::: widget plot
title: The bathtub curve: failure rate against time
f: 5*exp(-2*x)+0.5+0.3*x^2; 0.5; 0.5+0.3*x^2
x: 0,10
y: 0,10
labels: Total failure rate; Useful life (constant); Wear-out component
caption: The bathtub curve: the failure rate $\lambda(t)$ against time, decomposed into the infant-mortality component (decreasing), the useful-life component (constant), and the wear-out component (increasing). **The infant-mortality phase is the reason the product is burned in (operated for 100 hours before shipment to screen out the defective units). The useful-life phase is the reason the exponential distribution is used for electronics. The wear-out phase is the reason the mechanical components are replaced at a scheduled maintenance interval.** **The maintenance interval is set at the onset of the wear-out phase, not at the end, and the onset is the reason the bearing is replaced at 10 000 hours, not at 50 000 hours.**
:::

::: example B10 life of a ball bearing {#ex-bearing-b10 level=3 check="10000"}
A 6205 deep-groove ball bearing has a catalogue B10 life of 50 000 hours at 3 000 rpm and 5 kN radial load. The actual operating conditions are 3 000 rpm and 7.5 kN radial load. Calculate the actual B10 life.

The bearing life equation is:

$$
L _ { 1 0 } \; = \; \left( { \frac { C } { P } } \right) ^ { p } \quad \text{where } p = 3 \text{ for ball bearings}
$$

$$
{ \frac { L _ { 1 0 , \text{actual } } } { L _ { 1 0 , \text{catalogue } } } } \; = \; \left( { \frac { P _ { \text{catalogue } } } { P _ { \text{actual } } } } \right) ^ { 3 } \; = \; \left( { \frac { 5 } { 7 . 5 } } \right) ^ { 3 } \; = \; 0 . 2 9 6
$$

$$
L _ { 1 0 , \text{actual } } \; = \; 0 . 2 9 6 \times 5 0 \ 0 0 0 \; = \; { \bf 1 4 \ 8 0 0 } \ \text{hours}
$$

**The actual B10 life is 14 800 hours, which is 30 % of the catalogue life. The 1.5× load increase reduces the life by a factor of 3.4, because the life is proportional to the inverse cube of the load. The engineer who specifies the bearing at the catalogue load and expects the catalogue life is the engineer who writes the warranty claim.**
:::

## 2. Failure Mode and Effects Analysis (FMEA)

::: definition The FMEA: structure, RPN, and the action threshold {#def-fmea}
The **Failure Mode and Effects Analysis** (FMEA) is a systematic method for identifying potential failures, their causes, their effects, and their corrective actions. The FMEA is a table with 8 columns:

$$
\begin{array} { l l l l l l l l }
\textbf{Item} & \textbf{Function} & \textbf{Failure mode} & \textbf{Cause} & \textbf{Effect} & S & O & D & \text{RPN} \\ \hline
\text{Bearing} & \text{Support shaft} & \text{Spalling} & \text{Overload} & \text{Vibration} & 8 & 4 & 3 & 96 \\
\text{Seal} & \text{Retain oil} & \text{Leakage} & \text{Wear} & \text{Oil loss} & 5 & 6 & 2 & 60 \\
\text{Shaft} & \text{Transmit torque} & \text{Fatigue crack} & \text{Stress conc.} & \text{Fracture} & 10 & 2 & 5 & 100 \\
\end{array}
$$

The three ratings are:

- **Severity (S, 1–10)**: the consequence of the failure. 1 = no effect, 10 = safety hazard.
- **Occurrence (O, 1–10)**: the frequency of the cause. 1 = never, 10 = always.
- **Detection (D, 1–10)**: the probability that the cause or the failure mode is detected before the customer sees it. 1 = certain detection, 10 = no detection.

The **Risk Priority Number** (RPN) is:

$$
\text{RPN } \; = \; S \times O \times D
$$

**The RPN threshold for action is typically 100–200 (industry-specific), and any failure mode with an RPN above the threshold requires a corrective action. The corrective action reduces the O or the D (the S is usually fixed by the function), and the reduction is the reason the RPN drops below the threshold.**

The **DFMEA** (Design FMEA) is performed by the design engineer at the embodiment stage. The **PFMEA** (Process FMEA) is performed by the manufacturing engineer at the process-qualification stage. The two FMEAs are different: the DFMEA asks "what can go wrong with the design?" and the PFMEA asks "what can go wrong with the manufacturing process?"
:::

::: definition The fault tree analysis (FTA) and the reliability block diagram (RBD) {#def-fta-rbd}
The **Fault Tree Analysis** (FTA) is a top-down, deductive method that starts with the undesired event (the "top event") and works backwards to the basic events (the component failures). The logic gates are:

- **AND gate**: the output occurs only if all inputs occur. $P _ { \text{out } } = \prod P _ { i }$
- **OR gate**: the output occurs if any input occurs. $P _ { \text{out } } = 1 - \prod ( 1 - P _ { i } )$

The **Reliability Block Diagram** (RBD) is a bottom-up, inductive method that starts with the components and works forwards to the system. The reliability of a series system is:

$$
R _ { \text{series } } \; = \; \prod _ { i \, = 1 } ^ { n } R _ { i }
$$

The reliability of a parallel (redundant) system is:

$$
R _ { \text{parallel } } \; = \; 1 - \prod _ { i \, = 1 } ^ { n } ( 1 - R _ { i } )
$$

$$
\begin{array} { l c c }
\textbf{System} & \textbf{Configuration} & \textbf{Reliability} (R_i = 0.9) \\ \hline
\text{Series (3 components)} & R_1 \times R_2 \times R_3 & 0 . 7 2 9 \\
\text{Parallel (2 components)} & 1 - (1-R_1)(1-R_2) & 0 . 9 9 \\
\text{Parallel (3 components)} & 1 - (1-R_1)(1-R_2)(1-R_3) & 0 . 9 9 9 \\
\end{array}
$$

**The series system is only as reliable as its least reliable component: a system with 10 components, each with $R = 0 . 9 9$ , has a system reliability of $0 . 9 9 ^ { 1 0 } = 0 . 9 0$ . The parallel system is more reliable than its most reliable component: two components with $R = 0 . 9$ in parallel give $R = 0 . 9 9$ . The redundancy is the reason the aircraft has two engines, the data centre has two power supplies, and the nuclear reactor has three safety systems.**
:::

::: definition Common-cause failure and the beta factor {#def-common-cause}
The **common-cause failure** (CCF) is the failure of two or more redundant components due to a single cause. The CCF is the reason the redundant system is not 100 % reliable, and the CCF is the reason the redundancy is not as effective as the RBD predicts.

The **beta factor** $\beta$ is the fraction of the component failure rate that is due to common causes:

$$
\lambda _ { \text{CCF } } \; = \; \beta \, \lambda _ { \text{component } } \quad ( \beta = 0 . 0 5 \text{--} 0 . 2 \text{ for typical systems} )
$$

The reliability of a 2-out-of-2 redundant system with CCF is:

$$
R _ { \text{system } } \; = \; 1 - [ ( 1 - \beta ) \, ( 1 - R ) ] ^ { 2 } - \beta \, ( 1 - R )
$$

**The beta factor is the reason the two pumps that share the same electrical supply are not truly redundant: if the electrical supply fails, both pumps fail, and the CCF probability is the electrical supply failure probability. The mitigation is to separate the supplies (different transformers, different cables, different switchgear), and the separation is the reason the CCF beta factor drops from 0.2 to 0.05.**
:::

::: example FMEA for a hydraulic power pack {#ex-fmea-hpp level=3 check="120"}
A hydraulic power pack has the following FMEA entries:

| Item | Failure mode | S | O | D | RPN |
|------|-------------|---|---|---|-----|
| Pump | Cavitation | 7 | 4 | 5 | 140 |
| Relief valve | Fails closed | 9 | 2 | 3 | 54 |
| Filter | Bypass opens | 4 | 6 | 2 | 48 |
| Hose | Burst | 10 | 3 | 4 | 120 |
| Reservoir | Leak | 3 | 5 | 2 | 30 |

Which failure mode has the highest RPN, and what corrective action reduces it the most?

**The pump cavitation has the highest RPN (140). The corrective action that reduces the RPN the most is the one that reduces the largest factor:**

- **Reduce O from 4 to 2** (better inlet design, larger suction line): RPN = 7 × 2 × 5 = 70 (50 % reduction).
- **Reduce D from 5 to 2** (add a cavitation sensor with an alarm): RPN = 7 × 4 × 2 = 56 (60 % reduction).
- **Reduce S from 7 to 5** (add a pressure relief valve downstream): RPN = 5 × 4 × 5 = 100 (29 % reduction).

**The detection improvement (add a cavitation sensor) is the most effective, because it reduces the D from 5 to 2, which is a 60 % reduction. The detection improvement is the reason the FMEA action is usually a sensor, not a redesign.**
:::

## 3. Reliability prediction and testing

::: definition Reliability prediction methods {#def-reliability-prediction}
The **reliability prediction** estimates the system reliability from the component reliabilities. The three standard methods are:

1. **Parts-count method** (MIL-HDBK-217F): the component failure rate is estimated from the component type, the quality level, and the environment. The method is fast but crude (± 50 % accuracy).

$$
\lambda _ { \text{part } } \; = \; \lambda _ { b } \, \pi _ { Q } \, \pi _ { E } \, \pi _ { S } \, \pi _ { T }
$$

where $\lambda _ { b }$ is the base failure rate, $\pi _ { Q }$ is the quality factor, $\pi _ { E }$ is the environment factor, $\pi _ { S }$ is the stress factor, and $\pi _ { T }$ is the temperature factor.

2. **Parts-stress method**: the component failure rate is estimated from the actual electrical and thermal stress. The method is more accurate (± 30 %) but requires the circuit design.

3. **Physics-of-failure method**: the component life is estimated from the failure mechanism (fatigue, wear, corrosion, electromigration). The method is the most accurate (± 10 %) but requires the failure physics.

**The parts-count method is used at the concept stage (the design is not detailed enough for the parts-stress method). The parts-stress method is used at the embodiment stage. The physics-of-failure method is used at the detail stage, and the physics-of-failure method is the reason the bearing life is calculated from the load and the speed, not looked up in a table.**
:::

::: definition Reliability testing: life test, accelerated test, and the confidence interval {#def-reliability-test}
The **life test** operates $n$ specimens until failure (or until the test duration is reached) and records the failure times. The **confidence interval** for the B10 life is:

$$
B _ { 1 0 , \; 9 0 \ \% } \; = \; { \frac { t _ { \text{test } } } { \chi _ { 0 . 9 0 , \; 2 ( r + 1 ) } ^ { 2 } / 2 } } \quad \text{(exponential distribution, } r \text{ failures in } n \text{ specimens)}
$$

The **accelerated life test** (ALT) operates the specimen at a higher stress (temperature, load, voltage) than the use condition, and the test time is converted to the use-condition life using an acceleration model:

$$
\text{AF } \; = \; \exp \left[ { \frac { E _ { a } } { k } } \left( { \frac { 1 } { T _ { \text{use } } } } - { \frac { 1 } { T _ { \text{test } } } } \right) \right] \quad \text{(Arrhenius, temperature)}
$$

$$
\text{AF } \; = \; \left( { \frac { \sigma _ { \text{test } } } { \sigma _ { \text{use } } } } \right) ^ { m } \quad \text{(power law, stress)}
$$

**The accelerated test is the reason a 10-year life can be demonstrated in 1 000 hours: the acceleration factor is 8 760 (10 years × 8 760 hours/year / 1 000 hours), and the acceleration factor is achieved by operating at 3× the load (power law with $m = 3$ gives AF = 27) and 50 °C higher temperature (Arrhenius with $E _ { a } = 0 . 7$ eV gives AF = 10). The product of the two AFs is 270, which is not enough for a 10-year life, so the test is 3× longer (3 000 hours).**
:::

::: definition Derating and the reliability margin {#def-derating}
**Derating** is the practice of operating a component below its rated capacity to increase its reliability. The derating factor is:

$$
\text{Derating factor } \; = \; { \frac { \text{Actual stress } } { \text{Rated stress } } } \; \leq \; \text{Derating limit}
$$

$$
\begin{array} { l c c }
\textbf{Component} & \textbf{Derating limit} & \textbf{Reliability gain} \\ \hline
\text{Resistor} & 50 \ \% \text{ of rated power} & 2 \times \\
\text{Capacitor} & 50 \ \% \text{ of rated voltage} & 3 \times \\
\text{Bearing} & 70 \ \% \text{ of catalogue load} & 3 \times \\
\text{Motor} & 80 \ \% \text{ of rated torque} & 1 . 5 \times \\
\text{Bolt} & 60 \ \% \text{ of proof load} & 2 \times \\
\end{array}
$$

**The derating is the reason the 10 A fuse is used in a 5 A circuit, the 100 V capacitor is used in a 48 V circuit, and the 10 kN bearing is used in a 7 kN application. The derating is the cheapest reliability improvement: it costs nothing except the size and weight of the component, and the cost is the reason the derating is the first reliability action, not the last.**
:::

::: example Reliability prediction for a pump system {#ex-reliability-pump level=3 check="0.86"}
A pump system has 4 components in series: motor ($R = 0 . 9 8$), coupling ($R = 0 . 9 9$), pump ($R = 0 . 9 5$), and seal ($R = 0 . 9 2$). Calculate the system reliability. If the pump is duplicated (parallel), what is the new system reliability?

**Series system:**

$$
R _ { \text{series } } \; = \; 0 . 9 8 \times 0 . 9 9 \times 0 . 9 5 \times 0 . 9 2 \; = \; { \bf 0 . 8 4 8 }
$$

**Parallel pump:**

$$
R _ { \text{pump, parallel } } \; = \; 1 - ( 1 - 0 . 9 5 ) ^ { 2 } \; = \; 1 - 0 . 0 0 2 5 \; = \; 0 . 9 9 7 5
$$

$$
R _ { \text{new } } \; = \; 0 . 9 8 \times 0 . 9 9 \times 0 . 9 9 7 5 \times 0 . 9 2 \; = \; { \bf 0 . 8 9 1 }
$$

**The system reliability improves from 0.848 to 0.891 (a 5 % improvement) by duplicating the pump. The improvement is modest because the seal ($R = 0 . 9 2$) is now the weakest link, and the weakest link is the reason the redundancy is not as effective as expected. The next reliability action is to improve the seal, not to duplicate the motor.**
:::

## 4. Risk management and safety

::: definition Risk matrix and ALARP {#def-risk-matrix}
The **risk matrix** maps the probability of failure against the severity of the consequence:

$$
\begin{array} { c c c c c }
& \text{Negligible} & \text{Minor} & \text{Moderate} & \text{Critical} & \text{Catastrophic} \\ \hline
\text{Frequent} & \text{Low} & \text{Medium} & \text{High} & \text{Extreme} & \text{Extreme} \\
\text{Occasional} & \text{Low} & \text{Low} & \text{Medium} & \text{High} & \text{Extreme} \\
\text{Remote} & \text{Low} & \text{Low} & \text{Low} & \text{Medium} & \text{High} \\
\text{Improbable} & \text{Low} & \text{Low} & \text{Low} & \text{Low} & \text{Medium} \\
\end{array}
$$

**ALARP** (As Low As Reasonably Practicable) is the principle that the risk should be reduced to a level where the cost of further reduction is grossly disproportionate to the benefit. The ALARP principle is the basis of the UK Health and Safety at Work Act 1974 and the EU Machinery Directive 2006/42/EC.

$$
\begin{array} { l l l }
\textbf{Risk level} & \textbf{Action} & \textbf{Example} \\ \hline
\text{Intolerable} & \text{Stop the activity, redesign} & \text{Unprotected press ram} \\
\text{ALARP} & \text{Reduce to the lowest practicable level} & \text{Guarded press with light curtain} \\
\text{Broadly acceptable} & \text{Monitor, no further action} & \text{Guarded press with interlock} \\
\end{array}
$$

**The ALARP principle is the reason the factor of safety is not a fixed number: the factor of safety is the ratio of the strength to the stress, and the ratio is set by the consequence of failure. A bridge has a factor of safety of 2, a bicycle has a factor of safety of 4, and a nuclear reactor has a factor of safety of 10. The factor of safety is the engineer's responsibility to the public, and the responsibility is the reason the factor of safety is not negotiable.**
:::

::: definition Safety factors, safety margins, and the design code {#def-safety-factors}
The **safety factor** (SF) and the **safety margin** (SM) are:

$$
\text{SF } \; = \; { \frac { \text{Strength } } { \text{Stress } } } \; = \; { \frac { \sigma _ { \text{capacity } } } { \sigma _ { \text{demand } } } } \qquad \text{SM } \; = \; \text{SF } - 1
$$

$$
\begin{array} { l c c }
\textbf{Application} & \textbf{SF (yield)} & \textbf{SF (ultimate)} \\ \hline
\text{Bicycle frame} & 2 . 0 & 4 . 0 \\
\text{Machine frame} & 1 . 5 & 2 . 5 \\
\text{Bridge} & 1 . 5 & 2 . 0 \\
\text{Pressure vessel} & 1 . 5 & 2 . 4 \\
\text{Aircraft structure} & 1 . 2 5 & 1 . 5 \\
\text{Nuclear containment} & 2 . 0 & 3 . 0 \\
\end{array}
$$

**The safety factor is not a measure of the engineer's confidence in the calculation; it is a measure of the engineer's responsibility to the public. The aircraft has a lower safety factor than the bicycle because the aircraft has a higher quality assurance, a more predictable load spectrum, and a more rigorous inspection regime. The safety factor is the inverse of the quality assurance, and the quality assurance is the reason the aircraft is safer than the bicycle despite the lower safety factor.**
:::

::: widget plot
title: The reliability of a series system against the number of components
f: 0.99^x; 0.95^x; 0.9^x
x: 1,50
y: 0,1
labels: R=0.99 per component; R=0.95 per component; R=0.9 per component
caption: System reliability against the number of components in series, for three component reliabilities. **A system with 50 components, each with $R = 0 . 9 9$ , has a system reliability of $0 . 9 9 ^ { 5 0 } = 0 . 6 1$ . A system with 50 components, each with $R = 0 . 9 5$ , has a system reliability of $0 . 9 5 ^ { 5 0 } = 0 . 0 8$ . The series system is only as reliable as its weakest link, and the weakest link is the reason the system with 50 components has a reliability of 8 %, not 95 %.** **The redundancy is the reason the aircraft has two engines, the data centre has two power supplies, and the nuclear reactor has three safety systems.**
:::

::: example Risk assessment for a press brake {#ex-risk-press level=3 check="16"}
A press brake has the following hazard: the operator's hand is caught between the ram and the die. The risk assessment is:

| Parameter | Value |
|-----------|-------|
| Severity | 5 (death) |
| Probability | 3 (occasional) |
| Risk level | Extreme |
| Current safeguard | Two-hand control |
| Residual risk | Medium |

What additional safeguard reduces the risk to "broadly acceptable," and what is the Performance Level (PL) required by ISO 13849-1?

**The additional safeguard is a light curtain (safety type 4, IEC 61496) that stops the ram within 50 ms when the beam is interrupted. The light curtain reduces the probability from 3 to 1 (improbable), and the risk level drops from "extreme" to "low."**

**The Performance Level required by ISO 13849-1 is PL d (for a hazard with severity 5 and frequency 3), and PL d requires a Category 3 architecture (single-fault tolerant) with a $B _ { 1 0 d }$ of 10 000 000 cycles and a diagnostic coverage of 60–99 %.** **The light curtain with a Category 4 architecture (dual-channel, self-testing) exceeds the PL d requirement and achieves PL e, which is the highest level.**
:::

## Exercises

::: exercise Weibull analysis {#ex-weibull level=3 check="5000"}
A set of 10 bearings has the following failure times (hours): 2 000, 3 500, 4 200, 5 100, 5 800, 6 500, 7 200, 8 000, 9 500, 12 000. Estimate the B10 life using the median-rank method.

::: solution
The median rank for the $i$-th failure out of $n$ is $F ( i ) \approx ( i - 0 . 3 ) / ( n + 0 . 4 )$ . For the first failure ($i = 1$): $F ( 1 ) = 0 . 7 / 1 0 . 4 = 0 . 0 6 7$ . For the second failure ($i = 2$): $F ( 2 ) = 1 . 7 / 1 0 . 4 = 0 . 1 6 3$ .

The B10 life is the time at which $F ( t ) = 0 . 1 0$ . Interpolating between the first and second failures:

$$
B _ { 1 0 } \; = \; 2 \ 0 0 0 + { \frac { 0 . 1 0 - 0 . 0 6 7 } { 0 . 1 6 3 - 0 . 0 6 7 } } \times ( 3 \ 5 0 0 - 2 \ 0 0 0 ) \; = \; 2 \ 0 0 0 + 0 . 3 4 \times 1 \ 5 0 0 \; = \; { \bf 2 \ 5 1 0 } \ \text{hours}
$$

**The B10 life is approximately 2 500 hours. The B10 life is the time at which 10 % of the population has failed, and the B10 life is the reason the maintenance interval is set at 2 000 hours, not 5 000 hours.**
:::
:::

::: exercise FMEA RPN {#ex-fmea-rpn3 level=2 check="180"}
A failure mode has S = 9, O = 5, D = 4. Calculate the RPN, and determine the new RPN if the detection is improved from 4 to 2 and the occurrence is reduced from 5 to 3.

::: solution
$$
\text{RPN } \; = \; 9 \times 5 \times 4 \; = \; { \bf 1 8 0 }
$$

$$
\text{New RPN } \; = \; 9 \times 3 \times 2 \; = \; { \bf 5 4 }
$$

**The RPN drops from 180 to 54, a 70 % reduction. The detection improvement (D: 4 → 2) reduces the RPN by 50 %, and the occurrence improvement (O: 5 → 3) reduces the RPN by 40 %. The combined effect is multiplicative: 0.5 × 0.6 = 0.3, a 70 % reduction.**
:::
:::

::: exercise Series vs parallel reliability {#ex-series-parallel level=3 check="0.99"}
A system has 3 components in series, each with $R = 0 . 9 7$ . Calculate the system reliability. If the weakest component is duplicated (parallel), what is the new system reliability?

::: solution
$$
R _ { \text{series } } \; = \; 0 . 9 7 ^ { 3 } \; = \; { \bf 0 . 9 1 3 }
$$

**Duplicate the weakest component (all are equal, so duplicate one):**

$$
R _ { \text{parallel } } \; = \; 1 - ( 1 - 0 . 9 7 ) ^ { 2 } \; = \; 1 - 0 . 0 0 0 9 \; = \; 0 . 9 9 9 1
$$

$$
R _ { \text{new } } \; = \; 0 . 9 7 \times 0 . 9 7 \times 0 . 9 9 9 1 \; = \; { \bf 0 . 9 4 0 }
$$

**The system reliability improves from 0.913 to 0.940 (a 3 % improvement). The improvement is modest because the other two components are now the weakest links. The next reliability action is to improve the other two components, not to duplicate the third.**
:::
:::

::: exercise Availability calculation {#ex-availability level=3 check="99"}
A CNC machine has an MTBF of 2 000 hours and an MTTR of 8 hours. Calculate the availability. If the MTTR is reduced to 2 hours (by adding a spare parts kit), what is the new availability?

::: solution
$$
A _ { \text{original } } \; = \; { \frac { 2 \ 0 0 0 } { 2 \ 0 0 0 + 8 } } \; = \; { \frac { 2 \ 0 0 0 } { 2 \ 0 0 8 } } \; = \; { \bf 9 9 . 6 0 \ \% }
$$

$$
A _ { \text{new } } \; = \; { \frac { 2 \ 0 0 0 } { 2 \ 0 0 0 + 2 } } \; = \; { \frac { 2 \ 0 0 0 } { 2 \ 0 0 2 } } \; = \; { \bf 9 9 . 9 0 \ \% }
$$

**The availability improves from 99.60 % to 99.90 % by reducing the MTTR from 8 hours to 2 hours. The downtime is reduced from 3.2 hours/year to 0.8 hours/year, and the saving is 2.4 hours/year × £100/hour = £240/year. The spare parts kit costs £500, and the payback is 2.1 years.**
:::
:::

::: exercise Derating {#ex-derating level=2 check="3"}
A bearing has a catalogue B10 life of 50 000 hours at 5 kN. The design requires a B10 life of 20 000 hours. What is the maximum allowable load if the derating factor is 0.7?

::: solution
$$
L _ { 1 0 } \; = \; \left( { \frac { C } { P } } \right) ^ { 3 } \quad \Longrightarrow \quad P \; = \; C \left( { \frac { L _ { 1 0 , \text{catalogue } } } { L _ { 1 0 , \text{design } } } } \right) ^ { 1 / 3 } \quad \text{(wrong direction)}
$$

Actually: $L _ { 1 0 } \propto ( C / P ) ^ { 3 }$ , so:

$$
{ \frac { L _ { \text{design } } } { L _ { \text{catalogue } } } } \; = \; \left( { \frac { P _ { \text{catalogue } } } { P _ { \text{design } } } } \right) ^ { 3 } \quad \Longrightarrow \quad P _ { \text{design } } \; = \; P _ { \text{catalogue } } \times \left( { \frac { L _ { \text{catalogue } } } { L _ { \text{design } } } } \right) ^ { 1 / 3 }
$$

$$
P _ { \text{design } } \; = \; 5 \times \left( { \frac { 5 0 \ 0 0 0 } { 2 0 \ 0 0 0 } } \right) ^ { 1 / 3 } \; = \; 5 \times 1 . 3 5 7 \; = \; 6 . 7 9 \ \text{kN}
$$

**With the derating factor of 0.7: $P _ { \text{max } } = 0 . 7 \times 6 . 7 9 = { \bf 4 . 7 5 }$ kN. The maximum allowable load is 4.75 kN, which is less than the catalogue load of 5 kN. The derating is the reason the bearing is not operated at its catalogue rating.**
:::
:::

::: exercise Common-cause failure {#ex-ccf level=3 check="0.99"}
Two redundant pumps each have a reliability of 0.95. The common-cause failure beta factor is 0.1. Calculate the system reliability with and without CCF.

::: solution
**Without CCF:**

$$
R _ { \text{no CCF } } \; = \; 1 - ( 1 - 0 . 9 5 ) ^ { 2 } \; = \; 1 - 0 . 0 0 2 5 \; = \; { \bf 0 . 9 9 7 5 }
$$

**With CCF:**

$$
R _ { \text{CCF } } \; = \; 1 - [ ( 1 - \beta ) ( 1 - R ) ] ^ { 2 } - \beta ( 1 - R )
$$

$$
= \; 1 - [ 0 . 9 \times 0 . 0 5 ] ^ { 2 } - 0 . 1 \times 0 . 0 5 \; = \; 1 - 0 . 0 0 2 0 2 5 - 0 . 0 0 5 \; = \; { \bf 0 . 9 9 3 }
$$

**The system reliability drops from 0.9975 to 0.993 due to the CCF. The CCF accounts for 64 % of the total failure probability (0.005 / 0.007). The CCF is the reason the two pumps must have separate electrical supplies, separate control systems, and separate maintenance schedules.**
:::
:::

::: exercise Derivation: the series system reliability {#ex-derive-series level=4 check="0.6"}
Show that the reliability of a series system with $n$ identical components, each with reliability $R$ , is $R _ { \text{system } } = R ^ { n }$ , and that the number of components for which $R _ { \text{system } } < 0 . 5$ is $n > \ln ( 0 . 5 ) / \ln ( R )$ . Evaluate for $R = 0 . 9 9$ .

::: solution
For a series system, the system fails if any component fails. The probability that all components survive is:

$$
R _ { \text{system } } \; = \; R ^ { n }
$$

Setting $R ^ { n } < 0 . 5$ :

$$
n \; > \; { \frac { \ln ( 0 . 5 ) } { \ln ( R ) } } \; = \; { \frac { - 0 . 6 9 3 } { \ln ( 0 . 9 9 ) } } \; = \; { \frac { - 0 . 6 9 3 } { - 0 . 0 1 0 0 5 } } \; = \; { \bf 6 9 }
$$

**A series system with 69 components, each with $R = 0 . 9 9$ , has a system reliability of 50 %. The result is the reason the system with 100 components has a reliability of 37 %, and the reason the engineer must either improve the component reliability or add redundancy.** $\blacksquare$
:::
:::

::: exercise Derivation: the Weibull B10 life {#ex-derive-weibull level=4 check="0.53"}
Show that the B10 life of a Weibull distribution is $B _ { 1 0 } = \eta ( - \ln 0 . 9 ) ^ { 1 / \beta }$ , and evaluate for $\beta = 2$ and $\beta = 1 . 5$ .

::: solution
The Weibull reliability is $R ( t ) = e ^ { - ( t / \eta ) ^ { \beta } }$ . Setting $R ( B _ { 1 0 } ) = 0 . 9$ :

$$
0 . 9 \; = \; e ^ { - ( B _ { 1 0 } / \eta ) ^ { \beta } } \quad \Longrightarrow \quad ( B _ { 1 0 } / \eta ) ^ { \beta } \; = \; - \ln ( 0 . 9 ) \; = \; 0 . 1 0 5 4
$$

$$
B _ { 1 0 } \; = \; \eta \, ( 0 . 1 0 5 4 ) ^ { 1 / \beta }
$$

For $\beta = 2$ : $B _ { 1 0 } = \eta \times 0 . 1 0 5 4 ^ { 0 . 5 } = \eta \times 0 . 3 2 5 = { \bf 0 . 3 2 5 } \, \eta$

For $\beta = 1 . 5$ : $B _ { 1 0 } = \eta \times 0 . 1 0 5 4 ^ { 0 . 6 6 7 } = \eta \times 0 . 2 1 7 = { \bf 0 . 2 1 7 } \, \eta$

**The B10 life is 32.5 % of the characteristic life for $\beta = 2$ and 21.7 % for $\beta = 1 . 5$ . The lower the shape parameter, the lower the B10 life relative to the characteristic life, and the lower the B10 life is the reason the bearing ($\beta = 1 . 5$) has a shorter B10 life than the gear ($\beta = 2$) at the same characteristic life.** $\blacksquare$
:::
:::

::: quiz Reliability {#quiz-reliability}
The B10 life of a bearing is:

- [ ] The time at which 10 % of the bearings are still working
- [x] The time at which 10 % of the bearings have failed
- [ ] The time at which 90 % of the bearings have failed
- [ ] The mean time between failures

::: solution
**The time at which 10 % of the bearings have failed.** The B10 life is the time at which the reliability drops to 90 % (i.e., 10 % have failed). The B10 life is the standard reliability metric for bearings, and the B10 life is the reason the catalogue rating is not the design life.
:::
:::

::: quiz FMEA {#quiz-fmea}
In an FMEA, the Risk Priority Number (RPN) is:

- [ ] The sum of the severity, occurrence, and detection ratings
- [x] The product of the severity, occurrence, and detection ratings
- [ ] The average of the severity, occurrence, and detection ratings
- [ ] The maximum of the severity, occurrence, and detection ratings

::: solution
**The product of the severity, occurrence, and detection ratings.** RPN = S × O × D. The product is the reason the RPN is sensitive to all three factors, and the sensitivity is the reason the corrective action that reduces any one factor by 50 % reduces the RPN by 50 %.
:::
:::

## Where this lesson leads

- **[[design-process/design-process-overview]]** — The FMEA is the Gate 2 and Gate 3 criterion, and the RPN threshold is the gate decision.
- **[[design-process/requirements]]** — The reliability requirement (MTBF, B10, availability) is a requirement in the specification, and the requirement is the reason the design has a redundancy or a derating.
- **[[design-process/concept-selection]]** — The risk-weighted selection uses the DFMEA risk factors, and the risk factor is the reason the novel concept does not always win.
- **[[design-process/embodiment-design]]** — The DFMEA is performed at the embodiment stage, and the RPN threshold is the gate criterion for the design freeze.
- **[[design-process/design-for-manufacture]]** — The PFMEA is performed at the process-qualification stage, and the PFMEA drives the control plan.
- **[[manufacturing/metrology-quality]]** — The PFMEA drives the control plan, and the control plan drives the inspection frequency.
- **[[solid-mechanics/fracture-mechanics]]** — The fatigue life prediction is the basis of the physics-of-failure reliability model.
- **[[machine-design/fatigue]]** — The S-N curve and the Miner's rule are the basis of the fatigue reliability prediction.
- **[[machine-design/bearings]]** — The bearing B10 life equation is the basis of the bearing reliability prediction.

::: history Reliability and risk: from the bathtub curve to the safety integrity level {#history-reliability}
**1940s** — **The bathtub curve** is first described by the US military during the analysis of electronic equipment failures in World War II. The curve is the reason the "infant mortality" phase is identified, and the identification is the reason the burn-in test is introduced. **The bathtub curve is the first empirical reliability model, and the model is the reason the reliability engineering discipline is born.**

**1950s** — **The MIL-HDBK-217** (Reliability Prediction of Electronic Equipment) is published by the US Department of Defense. The handbook provides the parts-count method for predicting the failure rate of electronic components. **MIL-HDBK-217 is the first reliability prediction standard, and the standard is the reason the reliability prediction is a calculation, not a guess.**

**1960** — **Ernst Pagels and Walter Shewhart** (independently) develop the **fault tree analysis** (FTA) for the Minuteman missile programme. The FTA is the top-down method that starts with the undesired event and works backwards to the basic events. **The FTA is the reason the nuclear reactor safety analysis is possible, and the possibility is the reason the nuclear reactor is licensed.**

**1966** — **The NASA Manned Spacecraft Center** introduces the **Failure Mode and Effects Analysis** (FMEA) for the Apollo programme. The FMEA is the bottom-up method that starts with the component failure mode and works forwards to the system effect. **The FMEA is the reason the Apollo 13 mission survived the oxygen tank explosion, and the survival is the reason the FMEA is mandatory for every NASA mission.**

**1974** — **The Reactor Safety Study** (WASH-1400, the "Rasmussen Report") applies the FTA and the event tree analysis (ETA) to the nuclear reactor. The study estimates the probability of a core meltdown at 1 in 20 000 per reactor-year. **The Rasmussen Report is the first probabilistic risk assessment (PRA), and the PRA is the reason the nuclear reactor is licensed on a risk basis, not a prescriptive basis.**

**1983** — **The IEC 61508** (Functional Safety of Electrical/Electronic/Programmable Electronic Safety-related Systems) is drafted, introducing the **Safety Integrity Level** (SIL) framework. The SIL is a 4-level scale (SIL 1–4) that maps the required risk reduction to the system architecture, the failure rate, and the diagnostic coverage. **The SIL framework is the reason the safety system is designed to a quantitative target, not a qualitative one.**

**1995** — **The ISO 14121** (Safety of Machinery — Risk Assessment) and **ISO 13849-1** (Safety-Related Parts of Control Systems) are published, introducing the **Performance Level** (PL) framework for machinery safety. The PL is a 5-level scale (a–e) that maps the risk to the safety function's architecture. **The PL framework is the reason the press brake has a light curtain, not a two-hand control, and the light curtain is the reason the operator keeps their fingers.**

**2002** — **The ISO 31000** (Risk Management — Principles and Guidelines) is published, codifying the risk management process: identify, analyse, evaluate, treat, monitor, review. **ISO 31000 is the reason the risk management is a management system, not a one-time exercise, and the management system is the reason the risk is managed throughout the product's life.**
:::

::: summary Reliability and risk {#summary-reliability-risk}
- **Reliability is the probability that a product performs its intended function under stated conditions for a stated period of time.** The three qualifiers (intended, stated, period) are the source of every reliability argument, and the argument is the reason the reliability claim is an engineering statement, not a marketing statement.
- **The bathtub curve describes the failure rate over time: infant mortality (decreasing), useful life (constant), and wear-out (increasing).** The burn-in screens out the infant-mortality failures, and the maintenance interval is set at the onset of the wear-out phase.
- **The Weibull distribution is the standard model for wear-out failures, and the shape parameter $\beta$ determines the failure-rate behaviour.** The B10 life is the standard reliability metric for bearings and mechanical components.
- **The MTBF is the mean time between failures, the MTTR is the mean time to repair, and the availability is MTBF / (MTBF + MTTR).** The availability is the metric that the customer cares about, not the MTBF.
- **The FMEA identifies the failure modes, their causes, their effects, and their corrective actions.** The RPN (S × O × D) is the risk metric, and the RPN threshold for action is 100–200.
- **The fault tree analysis (FTA) is a top-down method that starts with the undesired event and works backwards to the basic events.** The reliability block diagram (RBD) is a bottom-up method that starts with the components and works forwards to the system.
- **The series system is only as reliable as its weakest link; the parallel system is more reliable than its most reliable component.** The redundancy is the reason the aircraft has two engines, and the redundancy is the reason the common-cause failure must be addressed.
- **The common-cause failure (CCF) is the failure of two or more redundant components due to a single cause.** The beta factor ($\beta = 0 . 0 5 \ – 0 . 2$) quantifies the CCF, and the CCF is the reason the redundancy is not 100 % effective.
- **The derating is the cheapest reliability improvement: it costs nothing except the size and weight of the component.** The derating is the reason the 10 A fuse is used in a 5 A circuit, and the reason is the reliability gain.
- **The risk matrix maps the probability of failure against the severity of the consequence, and the ALARP principle requires the risk to be reduced to a level where the cost of further reduction is grossly disproportionate to the benefit.** The factor of safety is the engineer's responsibility to the public, and the responsibility is the reason the factor of safety is not negotiable.
:::

## Further reading

- **Patrick D. T. O'Connor and André Kleyner (2011)** — *Practical Reliability Engineering*, 5th ed. Wiley. The standard reliability engineering textbook: distributions, FMEA, FTA, RBD, and testing.
- **Stamatis, H. (2003)** — *Failure Mode and Effect Analysis: FMEA from Theory to Execution*, 2nd ed. ASQ Quality Press. The FMEA reference, by the author of the definitive FMEA text.
- **MIL-HDBK-217F (1991)** — *Reliability Prediction of Electronic Equipment*. US Department of Defense. The parts-count method, the base failure rates, and the environment factors.
- **IEC 61508 (2010)** — *Functional Safety of Electrical/Electronic/Programmable Electronic Safety-related Systems*. IEC. The SIL framework, the architecture requirements, and the diagnostic coverage.
- **ISO 13849-1 (2015)** — *Safety of Machinery — Safety-Related Parts of Control Systems*. ISO. The Performance Level framework, the Category architecture, and the PLr calculation.
- **ISO 31000 (2018)** — *Risk Management — Guidelines*. ISO. The risk management process, the risk matrix, and the ALARP principle.
- **W. Nelson (1982)** — *Applied Life Data Analysis*. Wiley. The Weibull analysis, the median-rank method, and the confidence intervals.
- **MIL-STD-1629A (1980)** — *Procedures for Performing a Failure Mode, Effects and Criticality Analysis*. US Department of Defense. The original FMEA standard.
