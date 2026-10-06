The IIR, and the one that the discrete LTI is for, is the one that the design is for. The analog prototype, and the one that the continuous is for, is the one that the butterworth and the chebyshev is for. The bilinear, and the one that the transform is for, is the one that the mapping is for, from the analog, and the one that the s is for, to the digital, and the one that the z is for. This lesson defines the IIR design, and the one that the method is for, and gives the prototype, and the one that the analog is for, and the bilinear, and the one that the transform is for, and the property, and the one that the warping is for, and the one that the transform is for. The method, and the check, are the one for the bilinear, and the one that is new is the IIR design, and the one that the prototype is for. The IIR, and the one that the discrete LTI is for, is the one that the design and the efficiency, and the one that the length is for.

## The prototype and the response

The IIR, and the one that the discrete LTI is for, is the one that the design is for. The design, and the one that the IIR is for, is the one that the prototype is for, and the one that the analog is for.

::: definition IIR design {#def-iir}
The **IIR design** is the one that the method is for, of the IIR, and the one that the discrete LTI is for. The method, and the one that the IIR is for, is the one that the analog is for, of the prototype, and the one that the low pass is for, and the one that the continuous is for. Then the transformation, and the one that the bilinear is for, from the analog, and the one that the s is for, to the digital, and the one that the z is for. The prototype, and the one that the analog is for, is the one that the butterworth is for, and the chebyshev, and the one that the approximation is for. The design, and the one that the IIR is for, is the one that the efficiency is for, of the length, and the one that the N point is for, in contrast with the FIR, and the one that the discrete LTI is for.
:::

::: proposition The butterworth {#prop-but}
The **butterworth**, and the one that the prototype is for, of the order, and the one that the order is for, is
$$
|H_a(j\Omega)|^2 = \frac{1}{1 + \left(\frac{\Omega}{\Omega_c}\right)^{2n}},
$$
and the one that the butterworth is for, and the one that the attenuation is for. The butterworth, and the one that the analog is for, is the one that the max flat is for, of the pass band, and the one that the frequency is for. The pole, and the one that the s domain is for, of the butterworth, and the one that the order is for, is the one that the left is for, in the s plane, and the one that the s domain is for, and it is the one that the angle is for, of the
$$
\frac{(2k+1)\pi}{2n}, \qquad k = 0,1,\ldots,n-1,
$$
and the one that the pole is for, on the circle, and the one that the radius is for. The butterworth, and the one that the prototype is for, is the one that the smooth is for, of the response, and the one that the frequency is for.
:::

The prototype, and the one that the analog is for, is the one that the low pass is for. The butterworth, and the one that the prototype is for, is the one that the max flat is for. The chebyshev, and the one that the prototype is for, is the one that the ripple is for, of the pass band, and the one that the frequency is for. The two, and the one that the prototype is for, are the butterworth and the chebyshev, and the one that the analog is for.

::: example The order, and the pole {#ex-pole}
The butterworth, and the one that the order is for, of the two, and the one that the order is for. What is the pole, and the one that the s domain is for?
::: solution
The butterworth of the two, and the one that the order is for, has the two pole, and the one that the s domain is for, at the
$$
s = -\frac{1}{\sqrt{3}} \pm j\, \sqrt{\frac{2}{3}},
$$
and the one that the pole is for, with the cutoff, and the one that the frequency is for, of the one, and the one that the cutoff is for. The pole, and the one that the s domain is for, is in the left half, and the one that the plane is for, of the s plane, and the one that the s domain is for. The butterworth, and the one that the order is for, is the one that the left is for, of the pole. The stability, and the one that the analog is for, is the one that the left is for, of the pole, and the one that the s domain is for.
:::
:::

## The bilinear and the warping

The bilinear, and the one that the transform is for, is the one that the mapping is for, from the analog, and the one that the s is for, to the digital, and the one that the z is for. The warping, and the one that the frequency is for, is the one that the distortion is for, of the frequency, and the one that the analog is for.

::: proposition The bilinear {#prop-bil}
The **bilinear transformation** is
$$
s = \frac{2}{T}\,\frac{1 - z^{-1}}{1 + z^{-1}},
$$
and the one that the bilinear is for, and the one that the transform is for. The bilinear, and the one that the transform is for, maps the left half, and the one that the s domain is for, of the plane of the s, and the one that the continuous is for, to the inside, and the one that the unit circle is for, of the plane of the z, and the one that the discrete is for. The bilinear, and the one that the transform is for, is the one that the stability is for, and the one that the mapping is for. The frequency, and the one that the analog is for, maps to the frequency, and the one that the digital is for, in a non-linear, and the one that the relation is for, that is the one that the warping is for,
$$
\Omega = \frac{2}{T}\tan\frac{\omega T}{2},
$$
and the one that the warping is for, of the relation, and the one that the frequency is for, of the analog, and the one that the digital is for.
:::

The warping, and the one that the frequency is for, is the one that the distortion is for. The design, and the one that the IIR is for, is the one that the pre warping is for, of the frequency, and the one that the digital is for, to the analog, and the one that the frequency is for, before the prototype, and the one that the analog is for. The pre warping, and the one that the frequency is for, is the one that the reverse is for, of the warping, and the one that the relation is for,
$$
\Omega = \frac{2}{T}\tan\frac{\omega T}{2},
$$
and the one that the pre warping is for. The specification, and the one that the digital is for, of the frequency, and the one that the band is for, is the one that the pre warping is for, to the analog, and the one that the frequency is for, of the frequency, and the one that the band is for.

::: example The pre warping, and the frequency {#ex-prewarp}
The cutoff of the digital, and the one that the frequency is for, is the zero point one, and the one that the radian is for. The sample is the one thousand hertz, and the one that the sample is for. What is the analog frequency, and the one that the radian is for?
::: solution
The pre warping, and the one that the frequency is for, is the one that the relation is for, of the bilinear, and the one that the transform is for. The sample, and the one that the time is for, is the one, and the one that the one is for, over the one thousand, and the one that the hertz is for, of the one thousand, and the one that the second is for. The analog frequency, and the one that the radian is for, is the two, and the one that the two is for, over the one, and the one that the one is for, over the one thousand, and the one that the second is for, of the tan, and the one that the zero point one is for, of the zero point one, and the one that the radian is for, times the one, and the one that the one is for, over the one thousand, and the one that the second is for, and the two, and the one that the two is for, and the one. The frequency, and the one that the analog is for, is the one that the pre warping is for, of the frequency, and the one that the digital is for.
:::
:::

## The transformation and the low pass

The IIR, and the one that the discrete LTI is for, has the low pass, and the one that the frequency is for. The transformation, and the one that the bilinear is for, is the one that the low pass is for, to the band pass, and the one that the band is for, and the band stop, and the one that the band is for, and the high pass, and the one that the frequency is for.

::: proposition The transformation {#prop-trans}
The low pass, and the one that the analog is for, of the prototype, and the one that the butterworth is for, is transformed, and the one that the band is for, to the band pass, and the band stop, and the high pass, and the one that the frequency is for. The band pass, and the one that the band is for, is the one that the complex is for, of the s, and the one that the s domain is for, is for. The transformation from the low pass, and the one that the analog is for, to the band pass, and the one that the band is for, is
$$
s \;\to\; \frac{s^2 + \Omega_0^2}{B\, s},
$$
and the one that the transformation is for, where the $\Omega_0$ is the center, and the one that the frequency is for, and the $B$ is the band, and the one that the band is for, and the one that the frequency is for. The low pass, and the one that the prototype is for, is the one that the general is for, and the one that the band is for.
:::

The transformation, and the one that the bilinear is for, is the one that the band is for. The low pass is the prototype, and the one that the analog is for. The band pass and the band stop and the high pass, and the one that the band is for, is the one that the transformation is for, of the low pass, and the one that the prototype is for. The design, and the one that the IIR is for, is the one that the transformation is for, and the one that the bilinear is for.

::: example The IIR, and the response {#ex-iirresp}
The IIR, and the one that the discrete LTI is for, is the one that the low pass is for. What is the response, and the one that the frequency is for, of the IIR, and the one that the digital is for?
::: solution
The IIR, and the one that the low pass is for, has the pole, and the one that the z domain is for, inside the unit circle, and the one that the z domain is for, and the zero, and the one that the z domain is for, at the origin, and the one that the z domain is for. The response, and the one that the frequency is for, is the one that the low pass is for, of the magnitude, and the one that the response is for. The magnitude, and the one that the low is for, of the frequency, and the one that the band is for, is the one, and the one that the pass is for. The magnitude, and the one that the high is for, of the frequency, and the one that the band is for, attenuates, and the one that the response is for. The IIR, and the one that the discrete LTI is for, is the one that the efficient is for, of the length, and the one that the N point is for. The pole, and the one that the z domain is for, is the one that the response is for, and the one that the frequency is for.
:::
:::

::: example The pole, and the mapping {#ex-map}
The pole, and the one that the s domain is for, is the negative one, with the T, and the one that the sample is for, of the one, and the one that the one is for. Where does the bilinear, and the one that the transform is for, map, the pole, and the one that the z domain is for?
::: solution
The bilinear, and the one that the transform is for, is the one that the z is for, equal to the one, and the one that the one is for, plus the s, and the one that the s domain is for, times the T, and the one that the sample is for, of the half, and the one that the one is for, over the one, and the one that the one is for, minus the s, and the one that the s domain is for, times the T, and the one that the sample is for, of the half, and the one that the one is for. In the case of the s, and the one that the negative is for, of the negative one, and the T, and the one that the sample is for, of the one, and the one that the one is for, is the z, and the one that the z domain is for, is the one, and the one that the one is for, minus the one half, and the one that the s is for, over the one, and the one that the one is for, plus the one half, and the one that the s is for, and the one, and the one that the third is for. The pole, and the one that the z domain is for, is the one, and the one that the one is for, third, and the one that the z domain is for, and it is inside, and the one that the unit circle is for, of the unit circle, and the one that the radius is for. A stable pole, and the one that the s domain is for, is mapped inside, and the one that the unit circle is for, of the unit circle, and the one that the z domain is for, by the bilinear, and the one that the transform is for.
:::
:::

The prototype, and the one that the analog is for, is the one that the low pass is for. The bilinear, and the one that the transform is for, is the one that the mapping is for. The two, and the one that the IIR is for, are the prototype and the bilinear, and the one that the design is for. The prototype, and the one that the analog is for, is one that the butterworth and the chebyshev is for. The bilinear, and the one that the transform is for, is one that the stability is for, and the one that the mapping is for.

::: warning The warping, and the design {#warn-warp}
The warping, and the one that the frequency is for, is the one that the distortion is for, of the frequency, and the one that the analog is for. The design, and the one that the IIR is for, is the one that the pre warping is for, of the frequency, and the one that the digital is for, before the prototype, and the one that the analog is for. If the warping, and the one that the frequency is for, is not, and the one that the IIR is for, accounted for, and the one that the design is for, the cutoff, and the one that the frequency is for, of the digital, and the one that the IIR is for, is not the one that the specification is for, of the frequency, and the one that the band is for. The pre warping, and the one that the frequency is for, is the one that the design is for, and the one that the IIR is for. The bilinear, and the one that the transform is for, is the one that the warping is for, and the one that the relation is for.
:::

::: widget plot
f: 1/(1+x*x)
x: 0 4
y: 0 1
sliders:
caption: The butterworth low pass magnitude versus the analog frequency. The butterworth is the one that the max flat is for, of the pass band. The order of the butterworth determines the sharpness of the transition. The bilinear maps the stable pole, and the one that the s domain is for, to the stable pole, and the one that the z domain is for.
:::

::: quiz
The bilinear, and the one that the transform is for. What does it map, and the one that the s domain is for?
- [x] The left half to the inside of the unit circle
- [ ] The inside to the left half
- [ ] The right half to the outside
- [ ] The unit circle to the axis
::: solution
The bilinear, and the one that the transform is for, maps the left half, and the one that the s domain is for, of the plane of the s, and the one that the continuous is for, to the inside, and the one that the unit circle is for, of the plane of the z, and the one that the discrete is for. The bilinear, and the one that the transform is for, is the one that the stability is for, and the one that the mapping is for. A stable analog, and the one that the s domain is for, maps to a stable digital, and the one that the z domain is for.
:::
:::

## Where this leads

With the IIR design, and the one that the prototype is for, and the bilinear and the transformation, in hand, you have the full IIR design, and the one that the specification is for. The method, and the check, are the one for the bilinear, and the one that is new is the IIR design, and the one that the prototype is for. In the next lesson, you meet the filter structure, and the one that the implement is for, and the one that the numerical is for, and the same algebra, and the design and the structure and the check, are the ones you already have.

::: history
The IIR design, and the one that the method is for, is the one that the prototype is for. The butterworth, and the one that the analog is for, is the one that the max flat is for. The bilinear, and the one that the transform is for, is the one that the mapping is for. The design, the one that the IIR is for, is the one that the efficiency is for, of the length, and the one that the N point is for.
:::

::: summary
- The IIR design uses the analog prototype and the bilinear transformation.
- The butterworth is the one that the max flat is for, of the pass band.
- The butterworth pole is in the left half of the s plane.
- The bilinear maps the left half, and the one that the s domain is for, to the inside, and the one that the z domain is for, of the unit circle.
- The bilinear is the one that the stability is for, and the one that the mapping is for.
- The frequency warping distorts the frequency. The pre warping compensates it.
- The low pass prototype is transformed to the band pass, band stop, and the high pass.
- The IIR is the one that the efficient is for, of the length, and the one that the N point is for.
:::

## Exercises

::: exercise The stability {level=1 check="inside"}
The IIR has the pole at which position, and the one that the z domain is for, that it is stable?
::: solution
The IIR, and the one that the discrete LTI is for, is the stable when the pole, and the one that the z domain is for, is inside the unit circle, and the one that the z domain is for. The ROC, and the one that the convergence is for, must include the unit circle, and the one that the z domain is for. The bilinear, and the one that the transform is for, maps the left half, and the one that the s domain is for, to the inside, and the one that the z domain is for.
:::
:::

::: exercise The butterworth {level=1 check="maxflat"}
The butterworth. What is its pass band, and the one that the frequency is for?
::: hint
Max flat.
:::
::: solution
The butterworth, and the one that the prototype is for, is the one that the max flat is for, of the pass band, and the one that the frequency is for. The magnitude, and the one that the pass band is for, does not ripple, and the one that the frequency is for. The transition, and the one that the band is for, is the one that the sharp is for, as the order, and the one that the order is for, is grows, and the one that the order is for. The butterworth, and the one that the prototype is for, is the one that the smooth is for.
:::
:::

::: exercise The warping {level=1}
The bilinear, and the one that the transform is for. What is the warping, and the one that the frequency is for?
::: solution
The warping, and the one that the frequency is for, is the one that the distortion is for, of the non-linear, and the one that the relation is for, of the frequency, and the one that the analog is for. The bilinear, and the one that the transform is for, maps the analog and the digital, and the one that the frequency is for, in the one that the tan is for. The design, and the one that the IIR is for, is the one that the pre warping is for, of the frequency, and the one that the digital is for.
:::
:::

::: exercise The pole, and the order {level=2}
The butterworth of the three. How many pole, and the one that the s domain is for, does it have, and the one that the left is for?
::: hint
The order.
:::
::: solution
The butterworth of the order, and the one that the order is for, has the n pole, and the one that the s domain is for, in the left half, and the one that the plane is for, of the s plane, and the one that the s domain is for. The butterworth of the three, and the one that the order is for, has the three pole, and the one that the s domain is for, in the left half, and the one that the s domain is for. The pole, and the one that the s domain is for, is at the angle, and the one that the pole is for, that is the odd, and the one that the multiple is for, of the pi over the two, and the one that the order is for, of the one that the angle is for.
:::
:::

::: exercise The transformation, and the band {level=2}
Explain, the transformation, from the low pass, and the one that the prototype is for, to the band pass, and the one that the band is for.
::: hint
The complex of the s.
:::
::: solution
The transformation, from the low pass, and the one that the prototype is for, to the band pass, and the one that the band is for, is the one that the s is for, is the one that the s squared is for, plus the Omega zero squared, and the one that the center is for, over the B, and the one that the band is for, of the s, and the one that the s domain is for. The Omega zero, and the one that the center is for, is the center frequency, and the one that the band is for. The B, and the one that the band is for, is the band, and the one that the frequency is for. The transformation, and the one that the IIR is for, is the one that the band pass is for, of the low pass, and the one that the prototype is for.
:::
:::

::: exercise The IIR, and the efficient {level=3}
Explain, why the IIR, and the one that the discrete LTI is for, is more efficient, and the one that the length is for, than the FIR, and the one that the discrete LTI is for.
::: hint
The pole.
:::
::: solution
The IIR, and the one that the discrete LTI is for, has the pole, and the one that the z domain is for, and it is the one that the feedback is for, and the one that the delay is for. The pole, and the one that the z domain is for, gives the resonance, and the one that the frequency is for, with a small, and the one that the delay is for, of the length, and the one that the N point is for. The FIR, and the one that the discrete LTI is for, has only the zero, and the one that the z domain is for, and it needs the long, and the one that the length is for, of the length, and the one that the N point is for, for the sharp, and the one that the transition is for, of the transition. The IIR is the one that the efficient is for, of the length, and the one that the N point is for, because of the pole, and the one that the z domain is for. But the IIR is the one that the non-linear is for, of the phase, and the one that the frequency is for.
:::
:::

::: exercise The design, and the pre warping {level=3}
Explain, the step of the design, and the one that the IIR is for, with the bilinear, and the one that the transform is for.
::: hint
Pre warp, design, transform.
:::
::: solution
The design, and the one that the IIR is for, has the three, and the one that the step is for. The first, and the one that the step is for, is the pre warping, and the one that the frequency is for, of the frequency, and the one that the digital is for, to the analog, and the one that the frequency is for. The second, and the one that the step is for, is the design, and the one that the low pass is for, of the analog prototype, and the one that the butterworth is for, to the pre warped, and the one that the frequency is for, of the specification, and the one that the analog is for. The third, and the one that the step is for, is the bilinear, and the one that the transform is for, of the analog prototype, and the one that the s domain is for, to the digital, and the one that the z domain is for. The design, and the one that the IIR is for, is the one that the pre warping and the prototype and the bilinear is for.
:::
:::

::: exercise The two, and the prototype {level=3}
Explain, the difference, between the butterworth, and the one that the prototype is for, and the chebyshev, and the one that the prototype is for.
::: hint
The ripple.
:::
::: solution
The butterworth, and the one that the prototype is for, is the one that the max flat is for, of the pass band, and the one that the frequency is for, and the one that the frequency is for. The chebyshev, and the one that the prototype is for, is the one that the ripple is for, of the pass band, and the one that the frequency is for. The chebyshev, and the one that the prototype is for, is the one that the sharp is for, of the transition, and the one that the band is for, for a given, and the one that the order is for, of the order, and the one that the prototype is for. The two, and the one that the prototype is for, are the flat and the ripple, and the one that the pass band is for. The design, and the one that the IIR is for, chooses according to the specification, and the one that the response is for.
:::
:::
