The systems of the earlier courses, the circuit, the mechanical, and the thermal, are the ones that the control is for. The control, and the one that the behaviour is for, is the one that the system is for, and the one that the feedback is for. The modelling, and the one that the system is for, is the one that the differential equation, and the one that the transfer function, is for, and the one that the behaviour is for. This lesson defines the dynamic system, and the one that the behaviour is for, and gives the differential equation, and the one that the physical is for, and the transfer function, and the one that the Laplace is for, and the one that the pole and zero is for. The method, and the check, are the same as for the earlier courses, and the one that is new is the behaviour, and the one that the response, and the feedback, is for. The modelling, and the one that the system is for, is the one that the control, and the one that the design, is for.

## The dynamic system and the differential equation

The physical, and the one that the system is for, is described, and the one that the behaviour is for, by the differential equation, and the one that the time is for.

::: definition Dynamic system and transfer function {#def-dyn}
A **dynamic system** is one, and the one that the behaviour is for, that has the state, and the one that the memory is for, and the response, and the one that the time is for, is one that the initial, and the one that the input is for, is for. The **differential equation**, and the one that the physical is for, is the one that the state and the input is for. The **transfer function**, and the one that the Laplace is for, is the one that the output, and the one that the input is for, in the s domain, and the one that the pole and zero is for.
:::

The differential equation, and the one that the physical is for, is the one that the behaviour is for. The transfer function, and the one that the Laplace is for, is the one that the behaviour is for, and the one that the design is for. The two, and the one that the system is for, are the two, and the one that the time is for, and the one that the s domain is for.

## The mechanical, electrical, and the duality

The mechanical, and the electrical, and the thermal, are the ones that the system is for, and the one that the duality is for.

::: proposition Mechanical, electrical, and the duality {#prop-dual}
The mechanical, with the mass, and the damping, and the spring, is the one that the electrical is for, with the inductor, and the resistor, and the capacitor, and the one that the duality is for. The mass is the inductor, and the one that the force is for, the damping is the resistor, and the one that the velocity is for, the spring is the reciprocal of the capacitor, and the one that the displacement is for. The duality, and the one that the system is for, is the one that the mechanical and the electrical, and the one that the behaviour is for, is for.
:::

::: example The mechanical, and the transfer function {#ex-mech}
The mechanical, with the mass, and the damping, and the spring, and the force. What is the transfer function, and the one that the pole is for?
::: solution
The differential equation, and the one that the mechanical is for, is the mass, times the acceleration, plus the damping, times the velocity, plus the spring, times the displacement, equals the force, and the one that the physical is for. In the s domain, and the one that the Laplace is for, is the mass, times the s squared, plus the damping, times the s, plus the spring, and the one that the transfer function is for. The transfer function, and the one that the displacement, and the one that the force is for, is the one, and the one that the force is for, over the mass, times the s squared, plus the damping, times the s, plus the spring, and the one that the transfer function is for. The pole, and the one that the s domain is for, is the one that the damping, and the spring, and the mass, is for.
:::
:::

The resonant, and the one that the mechanical is for, is the one that the natural, and the one that the frequency is for, is for. The damping, and the one that the mechanical is for, is the one that the damping ratio, and the one that the decay is for, is for.

::: example The electrical, and the duality {#ex-elec}
The electrical, with the inductor, and the resistor, and the capacitor, and the voltage, is the one that the mechanical is for. What is the relation, and the one that the duality is for?
::: solution
The electrical, and the one that the duality is for, is the one that the mechanical, and the one that the system is for, is for. The inductor is the mass, and the one that the duality is for, the resistor is the damping, and the one that the duality is for, the capacitor is the reciprocal of the spring, and the one that the duality is for. The voltage is the force, and the one that the duality is for, the current is the velocity, and the one that the duality is for. This is the duality, and the one that the system is for, and the one that the behaviour is for.
:::
:::

The first order, and the one that the system is for, is the one that the RC is for, and the one that the time constant is for. The first order, and the one that the mechanical, and the electrical, is for, is the one that the damping, and the one that the spring is for, is for.

::: example The first order, and the time constant {#ex-1st}
The first order, with the resistor, and the capacitor, and the voltage. What is the time constant, and the one that the decay is for?
::: solution
The first order, and the one that the RC is for, is the one that the time constant is for. The time constant, and the one that the decay is for, is the R times the C, and the one that the circuit is for. The response, and the one that the time is for, is the one, and the one that the decay is for, minus the negative, and the one that the time constant is for, times the t, and the one that the time is for. The first order, and the one that the system is for, is the one that the decay is for, and the one that the response is for.
:::
:::

## The pole and the zero, and the behaviour

The pole, and the one that the s domain is for, is the one that the behaviour, and the one that the response is for, is for. The zero, and the one that the s domain is for, is the one that the behaviour, and the one that the frequency is for, is for.

::: definition Pole and zero {#def-pz}
The **pole** of the transfer function, and the one that the s domain is for, is the value of the s, and the one that the complex is for, that the denominator, and the one that the pole is for, is for. The **zero** is the value of the s, and the one that the complex is for, that the numerator, and the one that the zero is for, is for. The pole, and the one that the response is for, is the one that the natural, and the one that the behaviour is for, is for. The zero, and the one that the frequency is for, is the one that the phase, and the one that the behaviour is for, is for.
:::

The pole, and the one that the s domain is for, is the one that the behaviour is for. The pole, and the one that the left is for, in the plane, and the one that the real is for, is the one that the stable, and the one that the decay is for, is for. The pole, and the one that the right is for, in the plane, and the one that the real is for, is the one that the unstable, and the one that the grow is for, is for. The position, and the one that the pole is for, is the one that the behaviour, and the one that the response is for, is for.

::: widget plot
f: 1/sqrt(1+(x-1)*2)
x: 0 3
y: 0 2
sliders:
caption: The behaviour, and the one that the pole is for, as a function of the gain, and the one that the feedback is for. The behaviour, and the one that the response is for, changes, and the one that the gain is for, and the one that the pole is for. This is the one that the root, and the one that the locus is for, is for, and the one that the control is for.
:::

::: quiz
The pole, and the two, and the one that the s domain is for. What is the stability, and the one that the behaviour is for?
- [x] The stable, and the one that the decay is for
- [ ] The unstable, and the one that the grow is for
- [ ] The margin, and the one that the response is for
- [ ] The resonant, and the one that the frequency is for
::: solution
The pole, and the one that the left is for, is the one that the stable, and the one that the decay is for, is for. The pole, and the one that the right is for, is the one that the unstable, and the one that the grow is for, is for. The two, and the one that the plane is for, are the two, and the one that the behaviour is for, and the one that the stability is for.
:::
:::

::: example The second order, and the behaviour {#ex-2nd}
The second order, with the mass, and the damping, and the spring, and the force. What is the behaviour, and the one that the response is for, and the one that the decay is for?
::: solution
The second order, and the one that the mechanical is for, is the one that the resonant, and the one that the decay is for, is for. The damping ratio, and the one that the response is for, is the one that the damping, and the one that the resonant is for, is for. The behaviour, and the one that the response is for, is the one that the underdamped, and the one that the resonant is for, is for, when the damping, and the one that the ratio is for, is less than the one, and the one that the response is for. The decay, and the one that the time is for, is the one that the damping, and the one that the real is for, is for. This is the one that the second order is for, and the one that the behaviour is for, and the one that the feedback is for.
:::
:::

## Where this leads

With the differential, and the one that the physical is for, and the transfer function, and the one that the Laplace is for, and the pole and zero, and the duality, in hand, you have the full modelling, and the one that the system is for. The method, and the check, are the same as for the earlier courses, and the one that is new is the behaviour, and the one that the response and feedback is for. In the next lesson, you meet the transient response, and the one that the behaviour is for, and the one that the feedback is for, and the same algebra, and the pole and zero, and the check, are the ones you already have.

::: history
The modelling, and the one that the system is for, is the one that the feedback is for. The mechanical, and the electrical, and the one that the duality is for, is the one that the system is for. The transfer function, and the one that the Laplace is for, is the one that the behaviour is for. The method, the one that the modelling is for, is the one that the behaviour is for, and the one that the pole and zero is for.
:::

::: summary
- The dynamic system, and the one that the behaviour is for, is the one that the state and the response is for.
- The differential equation, and the one that the physical is for, is the one that the state and input is for.
- The transfer function, and the one that the Laplace is for, is the one that the output and input is for, in the s domain.
- The mechanical, and the electrical, and the thermal, are the ones that the duality is for.
- The mass is the inductor, the damping is the resistor, the spring is the reciprocal of the capacitor, and the one that the duality is for.
- The pole, and the one that the s domain is for, is the one that the behaviour is for.
- The zero, and the one that the frequency is for, is the one that the phase is for.
- The first order, and the one that the RC is for, is the one that the time constant is for.
- The pole, and the one that the left is for, is the stable, and the one that the decay is for.
:::

## Exercises

::: exercise The mass, and the transfer function {level=1 check="1/(s2)"}
The mass, and the one that the mechanical is for. What is the transfer function, and the one that the force is for?
::: solution
The transfer function, and the one that the mass is for, is the one over the mass, times the s squared, and the one that the force is for. The mass, and the one that the mechanical is for, is the one that the acceleration is for, and the one that the force is for.
:::
:::

::: exercise The damping, and the pole {level=1}
The damping, and the one that the mechanical is for. What is the effect, on the pole, and the one that the s domain is for?
::: solution
The damping, and the one that the mechanical is for, increases the real part, and the one that the pole is for, of the pole, and the one that the decay is for. The damping, and the one that the response is for, is the one that the decay is for, and the one that the transient is for.
:::
:::

::: exercise The spring, and the resonant {level=1 check="wn"}
The spring, and the one that the mechanical is for. What is the natural, and the one that the frequency is for?
::: solution
The natural, and the one that the frequency is for, is the square root of the spring, over the mass, and the one that the mechanical is for. The spring, and the one that the displacement is for, is the one that the resonant is for, and the one that the frequency is for.
:::
:::

::: exercise The duality {level=2}
The inductor, and the one that the electrical is for. What is the mechanical, and the one that the duality is for?
::: hint
The inductor is the mass.
:::
::: solution
The inductor, and the one that the electrical is for, is the mass, and the one that the mechanical is for. The duality, and the one that the system is for, is the one that the inductor and the mass, and the one that the duality is for, is for.
:::
:::

::: exercise The first order {level=2 check="RC"}
The first order, and the one that the RC is for. What is the time constant, and the one that the decay is for?
::: solution
The time constant, and the one that the decay is for, is the R times the C, and the one that the circuit is for. The first order, and the one that the RC is for, is the one that the decay is for, and the one that the response is for.
:::
:::

::: exercise The pole and the stability {level=2}
The pole, and the one that the right is for. Is the system, and the one that the behaviour is for, stable?
::: hint
The pole, and the one that the left is for, is the stable.
:::
::: solution
The pole, and the one that the right is for, is the one that the unstable, and the one that the grow is for, is for. The system, and the one that the behaviour is for, is the one that the unstable is for, and the one that the response is for.
:::
:::

::: exercise The zero and the phase {level=3}
Explain, the effect, of the zero, and the one that the s domain is for, on the phase, and the one that the frequency is for.
::: hint
The zero, and the one that the frequency is for, adds the phase.
:::
::: solution
The zero, and the one that the s domain is for, adds the phase, and the one that the frequency is for, and the one that the response is for. The pole, and the one that the s domain is for, subtracts the phase, and the one that the frequency is for. The two, and the one that the transfer function is for, are the two, and the one that the phase is for, and the one that the behaviour is for.
:::
:::

::: exercise The thermal, and the duality {level=3}
Explain, the thermal, and the one that the system is for, and the one that the duality is for.
::: hint
The thermal, with the capacitance and the resistance, is the one that the electrical is for.
:::
::: solution
The thermal, and the one that the system is for, is the one that the electrical, and the one that the duality is for, is for. The thermal capacitance is the capacitor, and the one that the duality is for, the thermal resistance is the resistor, and the one that the duality is for. The two, and the one that the duality is for, are the two, and the one that the thermal and the electrical is for.
:::
:::
