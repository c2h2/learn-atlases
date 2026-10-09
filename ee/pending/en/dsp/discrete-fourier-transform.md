The sequence, and the one that the finite is for, has the spectrum, and the one that the discrete is for. The discrete Fourier transform, and the one that the N point is for, is the one that the N sample is for, of the spectrum, and the one that the sequence is for. The DFT, and the one that the finite is for, is the one that the computation is for, and the one that the efficient is for, and the one that the FFT is for. This lesson defines the DFT, and the one that the N point is for, and gives the pair, and the one that the N point is for, and the property, and the one that the circular is for, and the relation, and the one that the DTFT is for. The method, and the check, are the one for the DFT, and the one that is new is the DFT, and the one that the N point is for. The DFT, and the one that the N point is for, is the one that the analysis, and the filter and the design, is for.

## The DFT and the pair

The sequence, and the one that the finite is for, is the one that the N sample is for, of the DFT, and the one that the frequency is for. The DFT, and the one that the N point is for, is the N sample, and the one that the frequency is for, of the DTFT, and the one that the sequence is for.

::: definition DFT {#def-dft}
The **N point DFT** of the N point sequence, and the one that the sample is for, is
$$
X[k] = \sum_{n=0}^{N-1} x[n]\, e^{-j 2\pi k n / N}, \qquad k = 0,1,\ldots,N-1,
$$
and the one that the DFT is for. The inverse, and the one that the sample is for, is
$$
x[n] = \frac{1}{N}\sum_{k=0}^{N-1} X[k]\, e^{j 2\pi k n / N},
$$
and the one that the inverse is for, of the N point DFT, and the one that the reconstruction is for. The DFT, and the one that the N point is for, is the one that the N sample is for, of the DTFT, and the one that the frequency is for, at
$$
\omega_k = \frac{2\pi k}{N},
$$
and the one that the frequency is for. The $k$ is the **bin**, and the one that the frequency is for, and the one that the DFT is for.
:::

The DFT, and the one that the N point is for, is the one that the finite is for, of the sequence, and the one that the sample is for. The N sample, and the one that the frequency is for, is the one that the bin is for. The inverse, and the one that the N point is for, is the one that the reconstruction is for, of the N point sequence, and the one that the sample is for. The DFT, and the one that the N point is for, is the tool, and the one that the transform is for, for the sequence, and the one that the finite is for.

::: proposition The DFT pair {#prop-dft}
The pair, and the one that the DFT is for, is the one that the sample and the bin is for. The impulse, and the one that the sequence is for,
$$
\delta[n] \;\;\longleftrightarrow\;\; 1,
$$
and the one that the DFT is for, in all the bin, and the one that the N point is for. The constant, and the one that the sequence is for, is
$$
1 \;\;\longleftrightarrow\;\; N\,\delta[k],
$$
and the one that the DFT is for, at the bin the zero, and the one that the DC is for. The cosine, and the one that the sequence is for, of the bin the one, and the one that the frequency is for,
$$
\cos(2\pi n/N) \;\;\longleftrightarrow\;\; \frac{N}{2}(\delta[k-1] + \delta[k+N-1]),
$$
and the one that the DFT is for, at the bin the one, and the one that the peak is for, and the bin the N-1, and the one that the peak is for. The pair, and the one that the DFT is for, is the one that the bin and the amplitude is for.
:::

The bin, and the one that the DFT is for, is the one that the frequency is for. The DFT, and the one that the N point is for, is the one that the bin is for, and the one that the sample is for. The two, and the one that the DFT is for, are the bin and the amplitude, and the one that the spectrum is for.

::: example The cosine, and the bin {#ex-bin}
The sequence is the cosine, at the bin the one, and the one that the frequency is for. What is the DFT, and the one that the N point is for?
::: solution
The DFT of the cosine, at the bin the one, and the one that the frequency is for, is the one that the two delta is for, at the bin the one, and the one that the peak is for, and the bin the N-1, and the one that the peak is for, and the value is the half of the N, and the one that the amplitude is for. The cosine, and the one that the sequence is for, is the N point, and the one that the sample is for. The DFT, and the one that the N point is for, is the one that the bin is for, and the one that the frequency is for. A cosine, and the one that the sequence is for, of the bin the one, and the one that the frequency is for, gives the peak, and the one that the amplitude is for, at the bin the one, and the bin the N-1, and the one that the peak is for.
:::
:::

## The property and the circular

The DFT, and the one that the N point is for, is the one that the property is for. The property, and the one that the DFT is for, is the one that the circular is for, of the sequence, and the one that the N point is for.

::: proposition The DFT property {#prop-dftp}
The property, and the one that the DFT is for, is the one that the sample and the bin is for. The circular shift, and the one that the sequence is for, is
$$
x[(n-k_0)]_N \;\;\longleftrightarrow\;\; e^{-j 2\pi k_0 k/N}X[k],
$$
and the one that the circular shift is for. The linearity, and the one that the DFT is for, is the sum, and the one that the sequence is for. The circular convolution, and the one that the sequence is for, is
$$
x[(\ast_N h)][n] = \sum_{m} x[m]\,h[(n-m)]_N, \;\;\longleftrightarrow\;\; X[k]H[k],
$$
and the one that the circular convolution is for. The **circular convolution**, and the one that the N point is for, is the one that the sum is for, of the N product, and the one that the sample is for, of the one that the cyclic is for, of the sequence, and the one that the N point is for. The DFT, and the one that the N point is for, of the circular convolution, and the one that the sequence is for, is the product, and the one that the bin is for.
:::

The circular convolution, and the one that the N point is for, is the one that the convolution is for, of the N point sequence, and the one that the sample is for. The circular convolution, and the one that the N point is for, is different, and the one that the convolution is for, from the linear, and the one that the convolution is for. The linear, and the one that the convolution is for, needs the one that the N point is for, of the N plus the M minus two, and the one that the length is for, of the DFT. The circular, and the one that the N point is for, is the one that the N plus is for, of the M, and the one that the sequence is for. The two, and the one that the convolution is for, are the circular and the linear, and the one that the DFT is for.

::: example The zero pad, and the linear {#ex-zero}
The two sequence, and the one that the finite is for. How is the linear convolution, and the one that the sequence is for, computed with the DFT, and the one that the N point is for?
::: solution
The linear convolution, and the one that the sequence is for, of the two, and the one that the finite is for, is the one that the DFT is for. The step, and the one that the method is for, is the zero pad, and the one that the sequence is for, of the two, and the one that the finite is for, to the length, and the one that the N point is for, of the sum, and the one that the length is for, of the length, and the one that the sequence is for. Then compute the DFT, and the one that the N point is for, of the zero pad, and the one that the sequence is for. The product, and the one that the bin is for, of the two DFT. Then the inverse, and the one that the N point is for, of the DFT. The result is the one that the circular is for, of the convolution, and the one that the N point is for, that is the one that the zero pad is for, equal to the linear, and the one that the convolution is for. The zero pad, and the one that the sequence is for, removes the wrap around, and the one that the circular is for, of the circular convolution, and the one that the N point is for.
:::
:::

::: example The compute, and the DFT, the four {#ex-4pt}
The sequence is the one, the two, the three, the four, and the one that the sample is for. What is the DFT, and the one that the N point is for?
::: solution
The DFT of the one, the two, the three, the four, and the one that the sequence is for, is the ten, at the bin, and the one that the DC is for, of the zero, and the one that the bin is for. The minus two, plus the two j, at the bin, and the one that the peak is for, of the one, and the one that the bin is for. The minus two, at the bin, and the one that the Nyquist is for, of the two, and the one that the bin is for. The minus two, minus the two j, at the bin, and the one that the peak is for, of the three, and the one that the bin is for. The sum, and the one that the DC is for, of the DC value, and the one that the bin is for, of the bin the zero, and the one that the DFT is for, is the ten, and the one that the amplitude is for. The DFT, and the one that the N point is for, of the sequence, and the one that the sample is for, is the one that the bin is for, and the one that the frequency is for, of the value, and the one that the amplitude is for.
:::
:::

## The DFT and the computation

The DFT, and the one that the N point is for, is the one that the computation is for. The naive, and the one that the DFT is for, is the N square, and the one that the operation is for. The FFT, and the one that the efficient is for, is the one that the N log N is for.

::: proposition The DFT and the FFT {#prop-fft}
The naive computation of the DFT, and the one that the N point is for, is
$$
N^2
$$
and the one that the operation is for, of the complex operations, and the one that the computation is for. The **FFT**, and the one that the efficient is for, is the one that the computation is for, with
$$
N \log_2 N
$$
and the one that the operation is for, of the complex operations, and the one that the FFT is for. The FFT, and the one that the efficient is for, is the one that the factor is for, that is
$$
\frac{N^2}{N \log_2 N} = \frac{N}{\log_2 N},
$$
and the one that the factor is for, of the faster, and the one that the computation is for. A N, and the one that the N point is for, of the four thousand, and the one that the size is for, is the one that the two, and the one that the order is for, and the one that the difference is for, of the million, and the one that the operation is for.
:::

The FFT, and the one that the efficient is for, is the one that the computation is for. The naive, and the one that the DFT is for, is the N square, and the one that the operation is for. The two, and the one that the computation is for, are the naive and the FFT, and the one that the N point is for.

::: example The computation, and the speed {#ex-speed}
The N is the one thousand, and the one that the N point is for. How many, and the one that the operation is for, of the complex operations, and the one that the computation is for, does the DFT take, and one that the FFT takes, and the one that the N point is for?
::: solution
The DFT, and the one that the naive is for, takes the N square, and the one that the operation is for, that is the one thousand, and the one that the N point is for, square, and the one million, and the one that the operation is for. The FFT, and the one that the efficient is for, takes the N log N, and the one that the operation is for, that is the one thousand, and the one that the N point is for, of times, and the ten, and the one that the log is for, and the ten thousand, and the one that the operation is for. The FFT, and the one that the efficient is for, is the one that the one hundred, and the one that the factor is for, and the one that the faster is for. The computation, and the one that the N point is for, of the DFT is the N square. The computation of the FFT, and the one that the N point is for, is the N log N.
:::
:::

The bin, and the one that the DFT is for, is the one that the frequency is for. The DFT, and the one that the N point is for, is the one that the bin is for, and the one that the sample is for. The bin, and the one that the DFT is for, is zero, and the one that the DC is for, and the one that the frequency is for, to the N-1, and the one that the bin is for. The two, and the one that the bin is for, are the DC and the Nyquist, and the one that the frequency is for.

::: warning The bin, and the frequency {#warn-bin}
The bin, and the one that the DFT is for, is the one that the frequency is for. The frequency, and the one that the bin is for, of the bin the k, and the one that the DFT is for, is the
$$
f_k = \frac{k}{N T},
$$
and the one that the frequency is for, where the $T$ is the sample period, and the one that the sample is for, and the $N$ is the number of the sample, and the one that the N point is for. 
The bin, and the one that the DFT is for, is not the one that the arbitrary is for, of the frequency, and the one that the signal is for. If the frequency, and the one that the signal is for, is not on the bin, and the one that the DFT is for, is when the energy, and the one that the amplitude is for, spreads to the adjacent, and the one that the bin is for. This is the **leakage**, and the one that the phenomenon is for. The window, and the one that the sequence is for, is the one that the leakage is for.
:::

::: widget plot
f: abs(sin(pi*x)/ (pi*x/2))
x: -0.6 0.6
y: 0 1
sliders:
caption: The leakage and the one that the bin is for, of the DFT. If the frequency of the signal is not on the bin, and the one that the DFT is for, the energy spreads to the adjacent bin. The window is the one that the leakage is for. The DFT is the N sample of the DTFT.
:::

::: quiz
The DFT of the N point sequence. What is its complexity, and the one that the operation is for?
- [x] The N log N, of the FFT
- [ ] The N square
- [ ] The N
- [ ] The one
::: solution
The naive computation, and the one that the DFT is for, is the N square, and the one that the operation is for. The FFT, and the one that the efficient is for, is the N log N, and the one that the operation is for. The practical computation, and the one that the N point is for, of the DFT, is the N log N, and the one that the FFT is for. The FFT, and the one that the efficient is for, is the one that the factor is for, of the N over log N, and the one that the faster is for.
:::
:::

## Where this leads

With the DFT, and the one that the N point is for, and the pair and the property and the circular convolution and the FFT, in hand, you have the full DFT, and the one that the N point is for. The method, and the check, are the one for the DFT, and the one that is new is the DFT, and the one that the N point is for. In the next lesson, you meet the FFT, and the one that the efficient is for, and the one that the computation is for, in detail, and the same algebra, and the spectrum and the design and the check, are the ones you already have.

::: history
The DFT, and the one that the N point is for, is the one that the analysis is for. The FFT, and the one that the efficient is for, is the one that the practical is for. The circular convolution, and the one that the N point is for, is the one that the filter is for. The method, the one that the DFT is for, is the one that the N point is for, and the one that the bin is for.
:::

::: summary
- The DFT is the N sample of the DTFT at the bin, and the one that the frequency is for.
- The DFT of the impulse is the one, in all the bin, and the one that the N point is for.
- The DFT of the cosine of the bin is the two delta at the bin, and the one that the peak is for.
- The linear convolution needs the zero pad to the N plus M minus two.
- The naive DFT is the N square. The FFT is the N log N.
- The FFT is the N over log N times the faster, and the one that the computation is for.
- The leakage is when the frequency is not on the bin, and the one that the DFT is for.
:::

## Exercises

::: exercise The bin {level=1 check="k/(NT)"}
The bin k of the DFT. What is the frequency, and the one that the bin is for?
::: solution
The frequency, and the one that the bin is for, of the bin k, and the one that the DFT is for, is the k, and the one that the bin is for, over the N, and the one that the sample is for, of the T, and the one that the sample period is for. The bin, and the one that the DFT is for, is the one that the frequency is for, and the one that the sample is for.
:::
:::

::: exercise The complexity {level=1}
The naive DFT. What is its complexity, and the one that the operation is for?
::: solution
The naive DFT, and the one that the N point is for, is the N square, and the one that the operation is for, of the complex operations, and the one that the computation is for. The FFT is the N log N, and the one that the efficient is for.
:::
:::

::: exercise The FFT {level=1 check="NlogN"}
The FFT. What is its complexity, and the one that the operation is for?
::: solution
The FFT, and the one that the efficient is for, is the N log N, and the one that the operation is for, of the complex operations, and the one that the computation is for. The FFT is the one that the N over log N is for, and the one that the faster is for.
:::
:::

::: exercise The circular, and the linear {level=2}
Explain, the difference, between the circular convolution, and the one that the N point is for, and the linear convolution, and the one that the sequence is for.
::: hint
The wrap around.
:::
::: solution
The circular convolution, and the one that the N point is for, is the one that the wrap around is for, of the sequence, and the one that the N point is for. The linear convolution, and the one that the sequence is for, is the one that the N point is for, and it has the one that the N plus the M is for, of the length. The circular convolution, and the one that the N point is for, of the length larger than the N plus the M minus two, and the one that the length is for, is the one that the linear convolution is for. The two, and the one that the convolution is for, are the circular and the linear, and the one that the DFT is for.
:::
:::

::: exercise The DFT, and the DTFT {level=2}
Explain, the relation, between the DFT, and the one that the N point is for, and the DTFT, and the one that the sequence is for.
::: hint
The DFT is the N sample.
:::
::: solution
The DFT, and the one that the N point is for, is the one that the N sample is for, of the DTFT, and the one that the sequence is for, at the bin, and the one that the frequency is for, of the k times the two pi over N, and the one that the one is for. The bin, and the one that the DFT is for, is the uniform grid, and the one that the frequency is for, of the omega, and the one that the range is for, from the zero to the two pi, and the one that the omega is for. The DTFT, and the one that the sequence is for, is the continuous, and the one that the frequency is for. The DFT, and the one that the N point is for, is the discrete, and the one that the frequency is for, of the DTFT, and the one that the sequence is for.
:::
:::

::: exercise The zero pad {level=3}
The two sequence has the length five, and the one that the finite is for. What is the minimum length, and the one that the N point is for, of the DFT to compute the linear convolution, and the one that the sequence is for?
::: hint
The N plus the M.
:::
::: solution
The linear convolution, and the one that the sequence is for, of the two of the length five, and the one that the sequence is for, has the length of the five plus the five minus one, and the one that the length is for, of the nine, and the one that the sample is for. The DFT, and the one that the N point is for, to compute the linear convolution, and the one that the sequence is for, needs the one that the N point is for, of the nine, and the one that the length is for, or more, and the one that the N point is for. The zero pad, and the one that the sequence is for, to the nine, and the one that the N point is for, avoids the wrap around, and the one that the circular is for. The minimum length, and the one that the DFT is for, is the nine, and the one that the N point is for.
:::
:::

::: exercise The leakage {level=3}
Explain, the leakage, and the one that the DFT is for. How is it reduced, and the one that the sequence is for?
::: hint
The window.
:::
::: solution
The leakage, and the one that the DFT is for, is the one that the energy is for, of the frequency, and the one that the signal is for, that spreads to the adjacent, and the one that the bin is for, when the frequency is not on the bin, and the one that the DFT is for. The window, and the one that the sequence is for, is the one that the leakage is for, and the one that the shape is for. A window, and the one that the sequence is for, is not rectangular, and the one that the sequence is for, that tapers, and the one that the edge is for, of the sequence, and the one that the finite is for, is the one that the leakage is for, and the one that the main lobe is for. The window, and the one that the spectrum is for, trades the width, and the one that the main lobe is for, to the height, and the one that the side lobe is for.
:::
:::

::: exercise The DFT, and the analysis {level=3}
Explain, how the DFT, and the one that the N point is for, is used in the spectral analysis, and the one that the signal is for.
::: hint
The bin and the amplitude.
:::
::: solution
The DFT, and the one that the N point is for, is the one that the bin is for, of the amplitude and the phase, and the one that the frequency is for, of the signal, and the one that the sequence is for. The bin, and the one that the peak is for, is the one that the frequency is for, that is present, and the one that the signal is for. The amplitude, and the one that the bin is for, is the one that the power is for, of the frequency, and the one that the bin is for. The DFT, and the one that the N point is for, is the tool, and the one that the analysis is for, for the spectral analysis, and the one that the signal is for. The FFT, and the one that the efficient is for, makes it practical, and the one that the computation is for.
:::
:::
