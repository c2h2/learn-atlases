A server dashboard shows each machine as a coloured dot: green for healthy, red for failing. It looks clean in the design review. In the operations room, one engineer in twelve sees the two colours as nearly the same muddy olive, the light-grey labels beside them are unreadable on the wall screen across the room, and the chart of response times uses a rainbow colour scale that puts a sharp visual boundary where the data change smoothly. None of this is a matter of taste. The colours that look alike to a person with a red–green colour-vision deficiency can be computed, the readability of grey text on white can be computed, and the distortion introduced by a rainbow scale can be explained from how vision works.

**Visual design** in interfaces is the arrangement of elements on a screen — their grouping, alignment, size, type and colour — so that people can see what matters, read what they need, and understand what they can do. **Information design** and **visualisation** extend this to presenting data so that comparisons are accurate. This chapter builds on the vision and attention of [[hci/human-factors]]: we cover visual hierarchy and Gestalt grouping, typography and the sizes of things on screens, colour — the sRGB encoding, relative luminance and the exact WCAG 2.2 contrast ratio, colour-vision deficiency and its simulation — and the perceptual basis of good charts.

## Grouping and hierarchy

Before we read anything on a screen, the visual system has already grouped it into regions and objects. The **Gestalt** psychologists of the 1920s — Max Wertheimer, Wolfgang Köhler and Kurt Koffka — described the regularities of this grouping, and they remain the most useful vocabulary for layout.

::: definition Gestalt principles of grouping {#def-gestalt}
Elements tend to be perceived as belonging together when they are

- **close** to each other (*proximity*);
- **similar** in colour, shape, size or orientation (*similarity*);
- inside the same bounded area (*common region*, added by Stephen Palmer in 1992);
- on a smooth line or curve (*continuity*);
- moving together (*common fate*);
- and incomplete shapes tend to be seen as complete (*closure*), while every scene is divided into a **figure** in front of a **ground** (*figure–ground*).
:::

The principles interact, and proximity and common region are usually the strongest. Layout problems are often grouping problems: a label equidistant from two fields is read as belonging to either; a "Delete" button placed closer to the list it does not affect than to the item it deletes invites the wrong interpretation.

::: example Grouping a form by proximity {#ex-proximity}
A delivery form lays out its labels and fields with equal 16-pixel gaps everywhere:

```text
Name
[                    ]
Street
[                    ]
City
[                    ]
Card number
[                    ]
Expiry
[                    ]
```

Users sometimes type the city into the card-number field after the page scrolls. Redesign the spacing.
::: solution
With equal gaps, each label is as close to the field *above* it as to the field below, and the address and payment sections form one undifferentiated column. Apply proximity at two levels: put each label close to its own field (4 px) and further from the previous field (16 px), and separate the two sections by a much larger gap (40 px) with a heading — common region, a light border or background, strengthens the grouping:

```text
Delivery address
  Name         [                    ]
  Street       [                    ]
  City         [                    ]

Payment
  Card number  [                    ]
  Expiry       [     ]
```

The field widths now also signal the expected length (an expiry date is short), a signifier in the sense of [[hci/user-centred-design#def-norman]]. Whether labels go above or beside fields matters less than that each label is unambiguously grouped with one field; labels above fields work better on narrow phone screens.
:::
:::

**Visual hierarchy** is the ordering of elements by how strongly they attract attention: size, weight, contrast, colour, position and surrounding space. A good hierarchy makes the order of importance on a page match the order in which users need things: the page title, then the primary action, then the content, then secondary actions. The pre-attentive features of [[hci/human-factors#def-preattentive]] are the tools, and the rule is economy: one primary action per screen, emphasised by one feature that nothing else uses. **Alignment** to a small number of common edges (a **grid**) reduces the number of distinct positions the eye must track and makes groups and hierarchy legible; **white space** is not wasted space but the material that proximity is made of.

## Text on screens

### Legibility and readability

**Legibility** is how easily individual characters can be distinguished (I, l and 1; rn and m); **readability** is how easily continuous text can be read. Both depend on size, contrast, letter shapes, spacing and line length. Typographers' conventional guidance for continuous text in a single column is a line length of roughly 45 to 75 characters, around 66 being ideal (Robert Bringhurst, *The Elements of Typographic Style*), with line spacing of about 1.2 to 1.5 times the font size; very long lines make it hard for the eye to find the start of the next line, very short ones break phrases. These are craft conventions supported by a mixed experimental literature, not precise optima: Mary Dyson's reviews found that reading *speed* on screens is sometimes higher with long lines while readers *prefer* moderate ones. Accessibility guidelines encode the parts that matter most, such as letting users change spacing without loss of content (WCAG 2.2 success criterion 1.4.12).

### How big is a pixel?

Screens differ wildly in pixel density, so CSS defines its length units by visual angle rather than by physical pixels.

::: definition CSS reference pixel {#def-css-px}
The **CSS reference pixel** is the visual angle of one pixel on a device with a pixel density of 96 dpi viewed at a distance of an arm's length, taken as 28 inches. By [[hci/human-factors#eq-visual-angle]] it is

$$
\theta_{\text{px}} = 2 \arctan\frac{1/96}{2 \times 28} \approx 0.0213°.
$$

A CSS pixel (`px`) is approximately this angle on any device: phones, viewed closer, use physically smaller CSS pixels than desktop monitors. On print and most desktop browsers, $1\,\text{in} = 96\,\text{px}$ exactly.
:::

::: example Text size on a phone and a monitor {#ex-text-size}
Body text is set at 16 CSS px. On a desktop monitor at 96 CSS px per inch viewed at 70 cm, and on a phone that maps 16 CSS px to 2.6 mm viewed at 30 cm, what visual angle does the font size subtend?
::: solution
On the monitor, 16 px is $16/96 = 1/6$ inch $\approx 4.23$ mm, so $\theta \approx 4.23/700$ rad $\approx 0.346°$. On the phone, $\theta \approx 2.6/300$ rad $\approx 0.497°$. The phone's text is physically smaller but subtends a *larger* angle because it is held closer; the CSS pixel is an approximately angular unit, as [[#def-css-px]] intends, though real devices only approximate it. (The font size is the height of the type's body; capital letters are typically about 70% of it.)
:::
:::

## Colour

### Encoding colour on screens

Human colour vision is **trichromatic**: the retina's three kinds of cone cells, sensitive to long (L), medium (M) and short (S) wavelengths, reduce any spectrum to three numbers, which is why three primaries suffice for displays. Screens on the web use the **sRGB** colour space (IEC 61966-2-1, 1999): a colour is three 8-bit values $R, G, B \in \set{0, \dots, 255}$, but these are **gamma-encoded** — not proportional to emitted light — so that the 256 levels are spread roughly evenly in *perceived* lightness. To compute anything physical, such as luminance, we must first decode them. [[graphics/images-colour]] develops the colorimetry in full; here we need only luminance.

::: definition Relative luminance (WCAG 2.2) {#def-luminance}
For an sRGB colour with 8-bit channels, let $c_{\text{sRGB}} = c_8/255$ for each channel and linearise:

$$
c = \begin{cases} c_{\text{sRGB}} / 12.92 & \text{if } c_{\text{sRGB}} \le 0.04045,\\ \bigl((c_{\text{sRGB}} + 0.055)/1.055\bigr)^{2.4} & \text{otherwise.}\end{cases}
$$

The **relative luminance** is

$$
L = 0.2126\,R + 0.7152\,G + 0.0722\,B,
$$ {#eq-luminance}

where $R, G, B$ are the linearised channels; $L = 0$ for black and $1$ for white.
:::

The weights reflect the eye's much greater sensitivity to green light than to blue. Versions of WCAG before May 2021 printed the threshold as 0.03928 (from an early draft of the sRGB standard); the current WCAG 2.2 text uses 0.04045 and notes that the change has no practical effect. Indeed, for 8-bit values it changes nothing: $10/255 \approx 0.0392$ lies below both thresholds and $11/255 \approx 0.0431$ above both.

::: definition Contrast ratio {#def-contrast}
The **contrast ratio** of two colours with relative luminances $L_1 \ge L_2$ is

$$
CR = \frac{L_1 + 0.05}{L_2 + 0.05}.
$$ {#eq-contrast}

WCAG 2.2 requires $CR \ge 4.5$ for normal text and $CR \ge 3$ for **large-scale text** (at least 18 point, or 14 point bold) at level AA (success criterion 1.4.3), and $7$ and $4.5$ respectively at level AAA (1.4.6). User-interface components and meaningful graphics need $CR \ge 3$ against adjacent colours (1.4.11, level AA). Ratios are compared without rounding: $4.499{:}1$ fails.
:::

The $0.05$ terms model the light reflected from the screen and ambient flare, which prevents a true black and keeps the ratio finite. They also bound it:

::: proposition Range of the contrast ratio {#prop-contrast-range}
(a) $1 \le CR \le 21$, with $CR = 21$ only for black on white. (b) For any colour, the larger of its contrast ratios against black and against white is at least $\sqrt{21} \approx 4.58$, and equality holds exactly when $L = \sqrt{0.0525} - 0.05 \approx 0.1791$. Consequently no colour has a contrast ratio of more than $\sqrt{21}$ against *both* black and white.
:::

::: proof
(a) Since $0 \le L_2 \le L_1 \le 1$, $CR = (L_1 + 0.05)/(L_2 + 0.05) \ge 1$, and $CR \le (1 + 0.05)/(0 + 0.05) = 21$, with equality iff $L_1 = 1$ and $L_2 = 0$. (b) A colour of luminance $L$ has ratio $w(L) = 1.05/(L + 0.05)$ against white and $k(L) = (L + 0.05)/0.05$ against black. Their product is $w(L)\,k(L) = 1.05/0.05 = 21$ for every $L$. If both were below $\sqrt{21}$, the product would be below 21, a contradiction; so $\max(w, k) \ge \sqrt{21}$, and likewise $\min(w, k) \le \sqrt{21}$. Equality $w = k = \sqrt{21}$ holds iff $(L + 0.05)^2 = 1.05 \times 0.05 = 0.0525$, that is $L = \sqrt{0.0525} - 0.05 \approx 0.1791$.
:::

The proposition says that there is always *some* text colour — black or white — that reaches AA on any background ($\sqrt{21} > 4.5$), which is a useful fact for automatically choosing text colour: pick white if $L < 0.1791$ and black otherwise. It also says that a mid-grey around $L \approx 0.18$ is a poor background for text of either colour: only two 8-bit greys, `#757575` and `#767676`, reach 4.5 against both.

::: example Checking contrast exactly {#ex-contrast}
Compute the contrast ratio of several colour pairs and classify them against the WCAG AA thresholds.
::: solution
```python
def channel(c8):
    """8-bit sRGB channel -> linear value, as in the WCAG 2.2 definition."""
    c = c8 / 255
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4

def luminance(hex_colour):
    r, g, b = (int(hex_colour[i:i + 2], 16) for i in (1, 3, 5))
    return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b)

def contrast(c1, c2):
    l1, l2 = sorted((luminance(c1), luminance(c2)), reverse=True)
    return (l1 + 0.05) / (l2 + 0.05)

for fg, bg in [("#767676", "#FFFFFF"), ("#777777", "#FFFFFF"), ("#959595", "#FFFFFF"),
               ("#949494", "#FFFFFF"), ("#FFFFFF", "#0066CC"), ("#D62728", "#2CA02C"),
               ("#000000", "#FFFFFF")]:
    r = contrast(fg, bg)
    verdict = "AA" if r >= 4.5 else "AA large only" if r >= 3 else "fails"
    print(f"{fg} on {bg}: L = {luminance(fg):.4f} / {luminance(bg):.4f}, ratio {r:.3f}:1 ({verdict})")
```

```console
$ python3 contrast.py
#767676 on #FFFFFF: L = 0.1812 / 1.0000, ratio 4.542:1 (AA)
#777777 on #FFFFFF: L = 0.1845 / 1.0000, ratio 4.478:1 (AA large only)
#959595 on #FFFFFF: L = 0.3005 / 1.0000, ratio 2.995:1 (fails)
#949494 on #FFFFFF: L = 0.2961 / 1.0000, ratio 3.033:1 (AA large only)
#FFFFFF on #0066CC: L = 1.0000 / 0.1386, ratio 5.567:1 (AA)
#D62728 on #2CA02C: L = 0.1590 / 0.2586, ratio 1.476:1 (fails)
#000000 on #FFFFFF: L = 0.0000 / 1.0000, ratio 21.000:1 (AA)
```

Work the first by hand: $0x76 = 118$, $118/255 \approx 0.4627 > 0.04045$, so $c = ((0.4627 + 0.055)/1.055)^{2.4} \approx 0.1812$; a grey has $R = G = B$, so $L = c$ because the weights sum to 1. Then $CR = 1.05/(0.1812 + 0.05) \approx 4.54$. One step lighter, `#777777`, fails normal-text AA: `#767676` is the lightest grey that passes on white. The red–green pair has a ratio of only 1.48: its two colours differ almost entirely in hue, not luminance — the first warning sign for colour-vision deficiency.
:::
:::

::: widget plot
f: 1.05/(((x/255 + 0.055)/1.055)^2.4 + 0.05); (((x/255 + 0.055)/1.055)^2.4 + 0.05)/0.05; 4.5
x: 11, 255
y: 0, 21
labels: \text{against white}; \text{against black}; \text{AA threshold } 4.5
caption: Contrast ratio of a grey with 8-bit level $x$ (from `#0B0B0B` to `#FFFFFF`) against white (falling) and against black (rising), computed with [[#def-luminance]] and [[#def-contrast]]. The curves cross at about $x = 117$, where both ratios equal $\sqrt{21} \approx 4.58$ ([[#prop-contrast-range]]): only a sliver of greys around the crossing passes 4.5 against both. Notice how far from the middle of the 0–255 range the crossing is — a consequence of gamma encoding.
:::

::: warning "If the contrast ratio passes, the text is readable"
The WCAG contrast ratio is a simple, testable proxy with known weaknesses. It ignores font weight and size beyond the large-text threshold, so a hairline font can pass and still be hard to read; it is not perceptually uniform, tending to overstate the contrast of light text on dark backgrounds relative to dark text on light ones; and it says nothing about glare, screen quality or ambient light. Newer models such as APCA, proposed for a future WCAG 3, try to address this, but as of 2026 WCAG 2.2's ratio is what standards and laws reference. Treat a passing ratio as a minimum and test with users in realistic conditions.
:::

### Colour-vision deficiency

About 8% of men and 0.4% of women of Northern European ancestry have a red–green **colour-vision deficiency** (CVD), with lower prevalence in most other populations (Jennifer Birch, "Worldwide prevalence of red–green color deficiency", *Journal of the Optical Society of America A*, 2012). The deficiencies are inherited and mostly affect one cone type:

| type | cone affected | effect |
|---|---|---|
| protanopia / protanomaly | L (long) absent / shifted | reds and greens confused; reds look dark |
| deuteranopia / deuteranomaly | M (medium) absent / shifted | reds and greens confused (deuteranomaly is the most common form) |
| tritanopia / tritanomaly | S (short) absent / shifted | blues and yellows confused (rare) |
| achromatopsia | no functioning cones | no colour vision; usually poor acuity and light sensitivity (very rare) |

The "-opia" forms are **dichromacy** (two cone types work), the "-anomaly" forms **anomalous trichromacy** (all three work, one shifted). A dichromat's colour perception can be approximated by projecting colours onto the two-dimensional set of colours they can distinguish. Gustavo Machado, Manuel Oliveira and Leandro Fernandes (*IEEE Transactions on Visualization and Computer Graphics*, 2009) gave $3 \times 3$ matrices for this in linear RGB, parametrised by severity.

::: example What a deuteranope sees on the dashboard {#ex-cvd}
Simulate the dashboard's red (`#D62728`) and green (`#2CA02C`), together with a blue and an orange, for deuteranopia and protanopia.
::: solution
```python
# Simulating dichromacy with the matrices of Machado, Oliveira & Fernandes (2009),
# severity 1.0, applied to linear RGB.
DEUTAN = [[0.367322, 0.860646, -0.227968],
          [0.280085, 0.672501, 0.047413],
          [-0.011820, 0.042940, 0.968881]]
PROTAN = [[0.152286, 1.052583, -0.204868],
          [0.114503, 0.786281, 0.099216],
          [-0.003882, -0.048116, 1.051998]]

def to_linear(c8):
    c = c8 / 255
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4

def to_srgb8(c):
    c = min(max(c, 0.0), 1.0)
    c = 12.92 * c if c <= 0.0031308 else 1.055 * c ** (1 / 2.4) - 0.055
    return round(255 * c)

def simulate(hex_colour, m):
    rgb = [to_linear(int(hex_colour[i:i + 2], 16)) for i in (1, 3, 5)]
    out = [sum(m[r][k] * rgb[k] for k in range(3)) for r in range(3)]
    return "#" + "".join(f"{to_srgb8(c):02X}" for c in out)

for colour in ["#D62728", "#2CA02C", "#1F77B4", "#FF7F0E"]:
    print(colour, "deutan ->", simulate(colour, DEUTAN), " protan ->", simulate(colour, PROTAN))
```

```console
$ python3 cvd.py
#D62728 deutan -> #8B7C1F  protan -> #615725
#2CA02C deutan -> #968838  protan -> #A39119
#1F77B4 deutan -> #456CB3  protan -> #5A79B7
#FF7F0E deutan -> #C4AE05  protan -> #A59100
```

For a deuteranope, red becomes `#8B7C1F` and green `#968838`: two very similar olive tones, which is the opening failure. For a protanope red also darkens (`#615725`) while green stays relatively light, so luminance alone separates them slightly. Blue survives well in both, and orange becomes a yellow distinct from blue. Each matrix row sums to 1, so greys are unchanged. Three remedies: never use colour as the *only* means of conveying information (WCAG 2.2 success criterion 1.4.1) — add shape, position or a label (a cross for failure, a tick for success); if colour must carry the distinction, choose pairs that differ in luminance and along the blue–yellow axis (blue and orange is a common safe pair); and check designs with a simulator. Simulations are approximations of average dichromats; anomalous trichromats vary.
:::
:::

## Showing data

### Accuracy of visual encodings

A chart encodes numbers as visual properties — positions, lengths, angles, areas, colours — and readers decode them. William Cleveland and Robert McGill ("Graphical perception", *Journal of the American Statistical Association*, 1984) measured how accurately people judge the ratio of two values under different encodings and proposed a ranking of **elementary perceptual tasks**, from most to least accurate:

1. position along a common scale;
2. position along non-aligned scales;
3. length, direction, angle;
4. area;
5. volume, curvature;
6. shading, colour saturation.

Jeffrey Heer and Michael Bostock replicated the core results with crowdsourced participants (CHI 2010). The ranking explains common advice: bar charts and dot plots (position on a common scale) support more accurate comparisons than pie charts (angle and area), and stacked bars make every segment except the bottom one harder to compare (non-aligned position). Area is particularly misleading because perceived area grows more slowly than actual area — S. S. Stevens's psychophysical measurements gave an exponent of about 0.7 for apparent area — so bubbles and scaled icons understate large differences unless the reader reads the numbers.

Jock Mackinlay's automatic presentation system (1986) formalised two criteria for choosing an encoding: **expressiveness** — the encoding shows all the facts in the data and *only* those facts (a colour gradient implies an order, so it should not be used for unordered categories) — and **effectiveness** — among expressive encodings, the one people decode most accurately should be used for the most important variable.

### Honest scales

::: definition Lie factor {#def-lie-factor}
Edward Tufte (*The Visual Display of Quantitative Information*, 1983) defined the **lie factor** of a graphic as

$$
\text{lie factor} = \frac{\text{size of effect shown in the graphic}}{\text{size of effect in the data}},
$$

where the size of an effect between two values $v_1, v_2$ is the relative change $\lvert v_2 - v_1\rvert / v_1$ — measured on the graphic's visual dimension and in the data respectively. An honest graphic has a lie factor close to 1.
:::

::: example Icons scaled in two dimensions {#ex-lie}
An infographic shows a company's users doubling from 2 million to 4 million with two phone icons, the second drawn twice as tall *and* twice as wide. Compute the lie factor if readers judge the icons by area. And what if a bar chart of the same data starts its axis at 1.5 million?
::: solution
In the data the effect is $(4 - 2)/2 = 1$ (a 100% increase). The second icon has $2 \times 2 = 4$ times the area, an effect on the graphic of $(4 - 1)/1 = 3$. The lie factor is $3/1 = 3$. (Because perceived area grows more slowly than area, readers may perceive less than a fourfold change — but the graphic is still distorting.) For the truncated bar chart, bars of length proportional to $v - 1.5$ have lengths $0.5$ and $2.5$, an effect of $(2.5 - 0.5)/0.5 = 4$, so the lie factor is 4. Bar lengths must start from zero; a line chart, which encodes position rather than length, may use a non-zero baseline when the *changes* are what matter, provided the axis is clearly labelled.
:::
:::

### Colour scales

Colour scales map numbers to colours and should match the structure of the data: **sequential** scales (light to dark in one or a few hues) for ordered magnitudes; **diverging** scales (two hues meeting at a neutral midpoint) for data with a meaningful centre, such as change from a baseline; and **categorical** palettes (distinct hues of similar lightness) for unordered categories — with at most a handful of categories, since people cannot reliably tell many hues apart.

The **rainbow** scale, long the default in scientific software, is a poor sequential scale. Its lightness rises and falls along the scale (yellow is much lighter than blue or red), so it creates apparent boundaries where the data change smoothly — at the narrow yellow and cyan bands — and hides real differences in its broad green region; it has no natural order for many readers; and it fails for red–green CVD. David Borland and Russell Taylor summarised the evidence in "Rainbow color map (still) considered harmful" (*IEEE Computer Graphics and Applications*, 2007). **Perceptually uniform** scales, designed so that equal steps in the data give equal steps in perceived colour difference with monotonically increasing lightness, avoid this; *viridis*, designed by Stéfan van der Walt and Nathaniel Smith for matplotlib in 2015, is a widely used example that also remains ordered under CVD and in greyscale.

::: quiz
A chart must show the percentage change in monthly sales for 30 product lines, from −40% to +60%, so that managers can see which lines grew and which shrank. Which encoding is best?
- [ ] A pie chart of sales per product line, coloured by change.
- [ ] Bars coloured with a rainbow scale from −40% (blue) to +60% (red).
- [x] Horizontal bars on a common axis with zero marked, sorted by change, coloured with a diverging scale centred at 0%.
- [ ] A bubble chart with bubble area proportional to the change.
::: solution
The task is comparing signed magnitudes, so position or length along a common scale is the most accurate encoding (Cleveland and McGill). Marking zero and sorting by change makes growth and shrinkage obvious; a diverging scale centred at 0% is expressive of the data's meaningful midpoint, and redundant with position so it does no harm. A pie chart encodes the wrong quantity (shares of sales) with a weak channel (angle); a rainbow scale has no perceptual midpoint and fails for CVD; area cannot even represent negative values and is decoded inaccurately.
:::
:::

::: history
The Gestalt principles were set out by Max Wertheimer in 1923. Jacques Bertin's *Sémiologie graphique* (1967) gave the first systematic theory of visual variables — position, size, value, texture, colour, orientation and shape — and Edward Tufte's *The Visual Display of Quantitative Information* (1983) popularised data-ink, chartjunk and the lie factor. Cleveland and McGill's graphical-perception experiments followed in 1984 and Mackinlay's automatic presentation in 1986. In colour, the CIE 1931 standard observer made colour measurable, the sRGB standard (IEC 61966-2-1, 1999) fixed the colour space of the web, and WCAG 2.0 (2008) introduced the contrast ratio still used in WCAG 2.2 (2023). Viénot, Brettel and Mollon's 1999 algorithm and Machado, Oliveira and Fernandes's 2009 model made CVD simulation routine, and viridis (2015) brought perceptually uniform colour maps into the defaults of scientific software.
:::

## Where this leads

Contrast, colour and text resizing are legal requirements, discussed with the rest of WCAG 2.2 in [[hci/accessibility-ethics]]. Whether a layout or a chart actually works for its readers is settled by [[hci/usability-evaluation]] and [[hci/experiments]] — Cleveland and McGill's ranking itself came from a controlled experiment. The physics and colorimetry behind sRGB, gamma and colour spaces are developed in [[graphics/images-colour]].

::: summary
- Layout works through **Gestalt grouping** ([[#def-gestalt]]): proximity and common region make structure visible; hierarchy uses size, weight, contrast and space, with one primary emphasis per screen.
- For continuous text, moderate line lengths (about 45–75 characters) and generous spacing are craft conventions; let users resize and respace text.
- The **CSS pixel** is an approximately angular unit ([[#def-css-px]]), so sizes in `px` are comparable across devices viewed at their usual distances.
- **Relative luminance** ([[#def-luminance]]) decodes gamma-encoded sRGB and weights green most; the WCAG **contrast ratio** $(L_1 + 0.05)/(L_2 + 0.05)$ ([[#def-contrast]]) must be at least 4.5 for text at AA; it ranges from 1 to 21, and black or white always reaches $\sqrt{21}$ ([[#prop-contrast-range]]).
- About 8% of men of Northern European ancestry have red–green **CVD**; simulate it ([[#ex-cvd]]) and never use colour alone to carry meaning.
- Encode the most important quantities by **position on a common scale**; avoid area, angle and truncated bars ([[#def-lie-factor]]); use sequential, diverging or categorical scales to match the data, and perceptually uniform maps instead of rainbows.
:::

## Exercises

::: exercise Contrast of black on white {level=1 check="21"}
What is the contrast ratio of black text on a white background? (Enter the ratio as a number.)
::: solution
$L_1 = 1$, $L_2 = 0$: $CR = 1.05/0.05 = 21$ ([[#prop-contrast-range]]).
:::
:::

::: exercise A grey's luminance {level=1}
Why does a grey `#808080` (level 128, half of the 0–255 range) have relative luminance of only about 0.216 rather than 0.5? Compute it.
::: solution
The 8-bit value is gamma-encoded. Linearising, $128/255 \approx 0.50196$ and $((0.50196 + 0.055)/1.055)^{2.4} \approx 0.2159$, and for a grey $L$ equals this value since the weights in [[#eq-luminance]] sum to 1. The encoding allocates more of the 256 levels to dark tones, where vision is more sensitive to differences, so the middle code value is much darker than half the light of white.
:::
:::

::: exercise Lie factor {level=1 check="20"}
A chart shows revenue rising from £10 million to £12 million with bars whose axis starts at £9.5 million. What is its lie factor? (Enter the number.)
::: solution
Data effect: $(12 - 10)/10 = 0.2$. Bar lengths: $10 - 9.5 = 0.5$ and $12 - 9.5 = 2.5$, effect $(2.5 - 0.5)/0.5 = 4$. The lie factor is $4/0.2 = 20$ ([[#def-lie-factor]]): a 20% rise is drawn as a fivefold one.
:::
:::

::: exercise Lightest passing grey {level=2 check="118"}
Using [[#def-contrast]], find the largest 8-bit grey level $g$ (so the colour is `#gggggg`) whose contrast against white is at least 4.5. (Enter $g$ as a decimal number.)
::: solution
We need $1.05/(L + 0.05) \ge 4.5$, i.e. $L \le 1.05/4.5 - 0.05 \approx 0.18333$. Inverting the linearisation, $c_{\text{sRGB}} = 1.055\,L^{1/2.4} - 0.055 \approx 1.055 \times 0.4935 - 0.055 \approx 0.4657$, so $g \le 0.4657 \times 255 \approx 118.7$. The largest integer is $g = 118$ (`#767676`, ratio 4.542); $g = 119$ gives 4.478, as computed in [[#ex-contrast]].
:::
:::

::: exercise Automatic text colour {level=2}
A tagging app lets users choose any background colour for a label and must choose black or white text automatically. Write the rule, prove that it always gives a contrast ratio of at least $\sqrt{21} \approx 4.58$, and apply it to `#0066CC` and `#FFB000`.
::: solution
Rule: compute $L$ of the background; use white text if $L < 0.1791$ (more precisely, if $1.05/(L + 0.05) \ge (L + 0.05)/0.05$) and black otherwise. By [[#prop-contrast-range]], the two candidate ratios multiply to 21, so the larger is at least $\sqrt{21}$, and the rule picks the larger. For `#0066CC`, $L \approx 0.1386 < 0.1791$: white text, ratio $\approx 5.57$ ([[#ex-contrast]]). For `#FFB000`: channels $1$, $\approx 0.4342$ (for $176/255$), $0$, so $L \approx 0.2126 + 0.7152 \times 0.4342 \approx 0.523$; black text, ratio $(0.523 + 0.05)/0.05 \approx 11.5$. A rule based on "is the colour light?" by eye, or on the unweighted average of $R, G, B$, can get this wrong, for example with saturated blue or yellow.
:::
:::

::: exercise Choosing chart encodings {level=2}
For each task, choose an encoding and justify it with Cleveland and McGill's ranking or Mackinlay's criteria: (a) compare the market shares of three companies precisely; (b) show the population of 200 countries on a world map; (c) show the temperature anomaly (difference from the 1951–1980 average) for each year since 1880; (d) show which of six departments each of 50 projects belongs to.
::: solution
(a) A bar chart or dot plot on a common scale — position is most accurate; a pie chart is acceptable only for "roughly what share" and with very few slices. (b) A choropleth map colours *areas*, so large, sparsely populated countries dominate visually; a proportional symbol map (circles on the countries) or a cartogram encodes population more faithfully, and a sorted bar chart beside the map supports precise comparison. (c) A line chart or bar chart from zero anomaly with a **diverging** colour scale (blue below, red above) centred at zero — the data have a meaningful midpoint. (d) Six distinct categorical hues of similar lightness, with a legend and preferably direct labels; a colour gradient would falsely imply an order (Mackinlay's expressiveness), and redundant shape or position helps CVD readers.
:::
:::

::: exercise Monotone lightness {level=3}
A sequential colour scale should have monotonically increasing (or decreasing) luminance. Write a function that takes a list of hex colours and reports whether their relative luminance is monotone, and apply it to a seven-step rainbow `#FF0000, #FF7F00, #FFFF00, #00FF00, #0000FF, #4B0082, #8F00FF` and to a seven-step blue scale `#F7FBFF, #DEEBF7, #C6DBEF, #9ECAE1, #6BAED6, #3182BD, #08519C`.
::: solution
```python
def channel(c8):
    c = c8 / 255
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4

def luminance(h):
    r, g, b = (int(h[i:i + 2], 16) for i in (1, 3, 5))
    return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b)

def monotone(colours):
    ls = [luminance(c) for c in colours]
    up = all(a <= b for a, b in zip(ls, ls[1:]))
    down = all(a >= b for a, b in zip(ls, ls[1:]))
    return [round(l, 3) for l in ls], up or down

rainbow = ["#FF0000", "#FF7F00", "#FFFF00", "#00FF00", "#0000FF", "#4B0082", "#8F00FF"]
blues = ["#F7FBFF", "#DEEBF7", "#C6DBEF", "#9ECAE1", "#6BAED6", "#3182BD", "#08519C"]
print(monotone(rainbow))
print(monotone(blues))
```

```console
$ python3 monotone.py
([0.213, 0.364, 0.928, 0.715, 0.072, 0.031, 0.131], False)
([0.96, 0.817, 0.689, 0.549, 0.383, 0.203, 0.083], True)
```

The rainbow's luminance jumps from 0.36 (orange) to 0.93 (yellow), falls to 0.07 (blue) and rises again at the violet end: readers see bright bands at yellow and green as features of the data. The blue scale's luminance decreases steadily, so lighter always means smaller. Monotone luminance is necessary but not sufficient for perceptual uniformity — equal steps should also *look* equal, which requires a perceptual colour space such as CIELAB or CAM02-UCS, as used in designing viridis.
:::
:::

::: exercise Proving the CVD matrices preserve greys {level=3}
Show that a linear map $x \mapsto Mx$ on linear RGB leaves every grey $(t, t, t)$ unchanged if and only if every row of $M$ sums to 1, and check this for the deuteranopia matrix of [[#ex-cvd]]. Why is this a sensible property for a CVD simulation, and does it imply that the simulated colour has the same relative luminance as the original?
::: solution
$M(t, t, t)\T = t\,(r_1, r_2, r_3)\T$ where $r_i$ is the sum of row $i$. This equals $(t, t, t)\T$ for all $t$ iff $r_1 = r_2 = r_3 = 1$. For the deuteranopia matrix: $0.367322 + 0.860646 - 0.227968 = 1.000000$, $0.280085 + 0.672501 + 0.047413 = 0.999999$ and $-0.011820 + 0.042940 + 0.968881 = 1.000001$ — equal to 1 within the published rounding. It is sensible because dichromats see the achromatic axis normally: white, greys and black do not change, which is also what makes the simulated image comparable with the original. It does *not* imply that luminance is preserved for other colours: $L(Mx) = w\T M x$ with $w = (0.2126, 0.7152, 0.0722)$, which equals $w\T x$ for all $x$ only if $w\T M = w\T$ — a condition on the *columns*, not the rows. For example, the simulation in [[#ex-cvd]] darkens red for protanopia (`#D62728` → `#615725`), as protanopes in fact perceive reds as darker.
:::
:::
