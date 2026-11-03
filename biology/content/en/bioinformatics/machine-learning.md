In December 2020, at the fourteenth Critical Assessment of protein Structure Prediction (CASP14), a deep network from DeepMind called AlphaFold2 predicted the three-dimensional structures of proteins it had never seen with an accuracy comparable, for many of them, to experimental determination. The problem had been open for fifty years. Within two years, predicted structures for more than 200 million proteins — nearly every sequence in UniProt — were freely available, and in 2024 Demis Hassabis and John Jumper shared the Nobel Prize in Chemistry with David Baker, whose group designs new proteins computationally. Machine learning had been used in bioinformatics since the 1980s, but this was the moment it became impossible to ignore.

Machine learning is now applied to almost every kind of biological data: sequences, structures, expression profiles, microscope images, mass spectra and medical records. It is also easy to misuse. A model can achieve high accuracy on a test set by learning an artefact of how the data were collected, and a two-dimensional plot of single cells can suggest structure that is not there. This chapter introduces the main ideas with biology in view: how biological data are represented, linear models and their regularisation, how to evaluate a classifier honestly (including the pitfalls of class imbalance and data leakage), dimensionality reduction, and deep learning for sequences, images and proteins. The general theory of machine learning and neural networks is developed in LLM Atlas ([machine-learning fundamentals](/learn/llm/course.php?c=ml-fundamentals) and [neural networks](/learn/llm/course.php?c=neural-networks)); linear algebra for PCA is in Maths Atlas ([eigenvalues](/learn/maths/lesson.php?c=linear-algebra&l=eigenvalues)). The count data and clustering of [[bioinformatics/expression-analysis]] are assumed.

## Learning from data

In **supervised learning** we have examples $(\mathbf x_i, y_i)$, $i = 1, \ldots, n$, where $\mathbf x_i$ is a vector of **features** describing an object and $y_i$ a **label** — whether a DNA sequence is bound by a transcription factor, whether a variant is pathogenic, which cell type a cell is — and we want a function $f$ that predicts $y$ from $\mathbf x$ for new objects. When $y$ is a category the task is **classification**; when it is a number, **regression**. In **unsupervised learning** there are no labels, and the aim is to find structure — clusters, low-dimensional patterns — in the $\mathbf x_i$ alone.

The goal is always **generalisation**: good predictions on data the model has not seen. A model flexible enough can memorise its training data perfectly and still predict new data no better than chance. Biological data make this danger acute in two ways. They are often **high-dimensional with few samples** — 20,000 genes measured in 50 patients, $p \gg n$ — so that almost any labelling of the samples can be fitted exactly. And the samples are rarely independent: proteins come in families, genomic positions are correlated along chromosomes, cells come from the same individual, and images come from the same microscope.

### Representing biological objects

A learning algorithm needs fixed-length numerical features, and the choice of representation is often more important than the choice of algorithm.

- **Sequences** are most simply encoded **one-hot**: a sequence of length $L$ becomes an $L\times4$ matrix (for DNA) with a 1 in the column of the base present at each position and 0 elsewhere, or $L\times20$ for proteins. One-hot encoding keeps positional information and is the standard input to convolutional networks. Alternatively, **$k$-mer counts** give a vector of length $4^k$ that ignores positions but has the same length for sequences of any length.
- **Expression profiles** are vectors of (normalised, usually log-transformed) counts per gene ([[bioinformatics/expression-analysis]]).
- **Images** are arrays of pixel intensities in one or more channels.
- **Hand-crafted features** encode biological knowledge directly: conservation scores, GC content, predicted secondary structure, distance to the nearest gene. Deep learning reduces but does not remove the value of such features.

## Linear models for classification

The workhorse of classification is **logistic regression** ([[biostatistics/linear-models]]).

::: definition Logistic regression {#def-logistic}
For features $\mathbf x$ and a binary label $y \in \{0, 1\}$, **logistic regression** models

$$
\Prob(y = 1\mid\mathbf x) = \sigma(\beta_0 + \boldsymbol\beta^\top\mathbf x),\qquad \sigma(z) = \frac{1}{1 + e^{-z}},
$$ {#eq-logistic}

so that the **log-odds** $\ln\frac{\Prob(y=1\mid\mathbf x)}{\Prob(y=0\mid\mathbf x)} = \beta_0 + \boldsymbol\beta^\top\mathbf x$ is linear in the features. The coefficients are fitted by minimising the **log loss** (negative log-likelihood) $-\sum_i\bigl[y_i\ln\hat p_i + (1 - y_i)\ln(1 - \hat p_i)\bigr]$, usually with a **regularisation** penalty $\lambda\sum_j\beta_j^2$ (ridge, L2) or $\lambda\sum_j\lvert\beta_j\rvert$ (lasso, L1).
:::

Regularisation is what makes linear models usable when $p \gg n$. Without it, if there are more features than samples, a separating hyperplane almost always exists, the likelihood can be increased without limit by scaling up $\boldsymbol\beta$, and the fitted model is meaningless. The ridge penalty shrinks all coefficients towards zero; the lasso sets most of them exactly to zero, selecting a small set of features, which is attractive for finding a handful of marker genes. The strength $\lambda$ is chosen by cross-validation (below).

::: example A predicted probability {#ex-logistic}
A logistic model predicting whether a 200-bp region is an active enhancer has intercept $\beta_0 = -3.0$ and coefficients $0.8$ per copy of a transcription-factor motif and $1.5$ for overlapping open chromatin (1 if yes, 0 if no). Predict the probability for a region with 4 motif copies but closed chromatin, and for one with 1 motif copy and open chromatin. Interpret the coefficient 0.8.
::: solution
First region: $z = -3.0 + 0.8\times4 + 1.5\times0 = 0.2$, $\hat p = 1/(1 + e^{-0.2}) = 0.55$. Second: $z = -3.0 + 0.8 + 1.5 = -0.7$, $\hat p = 1/(1 + e^{0.7}) = 0.33$.

Each extra motif copy adds 0.8 to the log-odds, multiplying the odds by $e^{0.8} = 2.2$, whatever the other features. This additivity on the log-odds scale is the model's main assumption; interactions (for example, motifs mattering only in open chromatin) must be added explicitly as product features, or captured by a more flexible model.
:::
:::

::: widget plot
f: 1/(1 + exp(-(b0 + b1*x)))
x: 0, 10
y: 0, 1
sliders: b0=-3:-8:2:0.1; b1=0.8:0:3:0.05
labels: \Prob(y = 1\mid x)
hlines: 0.5
caption: The logistic curve [[#eq-logistic]] for one feature $x$ (for example, the number of motif copies), with intercept $b_0$ and coefficient $b_1$. The curve crosses 0.5 at $x = -b_0/b_1$ (3.75 with the defaults of [[#ex-logistic]] without chromatin). Increase $b_1$ and the transition sharpens; with very large coefficients the model makes nearly certain predictions, which is what happens without regularisation when the training data can be separated perfectly.
:::

The following listing simulates a classic sequence task. Positive sequences of 30 bases contain a noisy copy of the motif `TGACT`; negatives are random. Each sequence is represented by its 64 3-mer counts, and an L2-regularised logistic regression is fitted by gradient descent on 400 sequences and evaluated on 200 others by the area under the ROC curve (defined below).

```python
import math, random
from itertools import product

rng = random.Random(42)
KMERS = ["".join(p) for p in product("ACGT", repeat=3)]
INDEX = {k: i for i, k in enumerate(KMERS)}

def make_seq(positive, L=30):
    s = [rng.choice("ACGT") for _ in range(L)]
    if positive:                                   # plant a noisy copy of the motif TGACT
        site = list("TGACT")
        site[rng.randrange(5)] = rng.choice("ACGT")
        j = rng.randrange(L - 5)
        s[j:j + 5] = site
    return "".join(s)

def features(s):
    """Counts of the 64 overlapping 3-mers (a fixed-length vector for any sequence)."""
    x = [0.0] * 64
    for i in range(len(s) - 2):
        x[INDEX[s[i:i + 3]]] += 1
    return x

data = [(features(make_seq(y)), y) for y in [1, 0] * 300]
train, test = data[:400], data[400:]

w, b, lr, l2 = [0.0] * 64, 0.0, 0.05, 0.01
sigmoid = lambda z: 1 / (1 + math.exp(-z))
for epoch in range(200):                           # batch gradient descent on the log loss
    gw, gb = [0.0] * 64, 0.0
    for x, y in train:
        err = sigmoid(b + sum(wi * xi for wi, xi in zip(w, x))) - y
        gb += err
        for i, xi in enumerate(x):
            gw[i] += err * xi
    b -= lr * gb / len(train)
    w = [wi - lr * (g / len(train) + l2 * wi) for wi, g in zip(w, gw)]

def auc(scores_labels):
    """Probability that a random positive outscores a random negative."""
    pos = [s for s, y in scores_labels if y == 1]
    neg = [s for s, y in scores_labels if y == 0]
    wins = sum((p > n) + 0.5 * (p == n) for p in pos for n in neg)
    return wins / (len(pos) * len(neg))

score = lambda x: b + sum(wi * xi for wi, xi in zip(w, x))
print("training AUC", round(auc([(score(x), y) for x, y in train]), 3))
print("test AUC    ", round(auc([(score(x), y) for x, y in test]), 3))
top = sorted(range(64), key=lambda i: -w[i])[:4]
print("largest weights:", [(KMERS[i], round(w[i], 2)) for i in top])
```

```
training AUC 0.846
test AUC     0.765
largest weights: [('ACT', 0.55), ('GAC', 0.46), ('TGA', 0.44), ('CTG', 0.17)]
```

Two lessons are already visible. Performance on the training data overstates performance on new data (0.85 against 0.77). And the largest weights belong to `TGA`, `GAC` and `ACT`, the three 3-mers of the motif: the model has rediscovered it, which is the kind of check — does the model use biologically sensible features? — that should accompany every evaluation.

## Evaluating a classifier

A classifier that outputs a score is turned into decisions by a threshold, and each threshold gives a **confusion matrix** of true positives (TP), false positives (FP), true negatives (TN) and false negatives (FN).

::: definition Performance measures {#def-metrics}
At a given threshold:

- **sensitivity** (recall, true positive rate) $= \mathrm{TP}/(\mathrm{TP} + \mathrm{FN})$, the fraction of positives detected;
- **specificity** $= \mathrm{TN}/(\mathrm{TN} + \mathrm{FP})$, and the **false positive rate** $= 1 -$ specificity;
- **precision** (positive predictive value) $= \mathrm{TP}/(\mathrm{TP} + \mathrm{FP})$, the fraction of predicted positives that are real;
- **accuracy** $= (\mathrm{TP} + \mathrm{TN})/n$.

The **ROC curve** plots sensitivity against the false positive rate as the threshold varies, and the **area under it** (AUC) equals the probability that a randomly chosen positive scores higher than a randomly chosen negative (0.5 for random guessing, 1 for perfect ranking). The **precision–recall curve** plots precision against recall.
:::

Sensitivity and specificity are properties of the classifier; precision also depends on how common positives are. That makes precision the quantity users care about and the one most often misjudged.

::: example A good classifier for a rare class {#ex-precision}
A classifier for pathogenic variants has sensitivity 0.90 and specificity 0.95. It is applied to variants of which 1 % are pathogenic. What fraction of variants it flags are pathogenic? What would a classifier that always says "benign" achieve in accuracy?
::: solution
Per 10,000 variants: 100 are pathogenic, of which 90 are flagged; 9,900 are benign, of which 5 %, or 495, are flagged. Precision is $90/(90 + 495) = 0.15$: only about one flagged variant in seven is pathogenic, although sensitivity and specificity sound excellent. This is Bayes' theorem at work ([[biostatistics/probability-distributions]]).

The trivial classifier that calls everything benign has accuracy $9{,}900/10{,}000 = 0.99$ — higher than the real classifier's accuracy of $(90 + 9{,}405)/10{,}000 = 0.95$ — and is useless. With imbalanced classes, accuracy is the wrong measure; precision–recall curves (or the precision at a useful level of recall) are more informative than ROC curves, which can look excellent while precision is poor.
:::
:::

::: widget bayes
mode: test
prevalence: 0.01
sensitivity: 0.9
specificity: 0.95
caption: The classifier of [[#ex-precision]] as natural frequencies: of the variants flagged positive, most are false positives because benign variants outnumber pathogenic ones 99 to 1. Raise the prevalence (as when the classifier is applied only to variants already prioritised by other evidence) and watch the precision rise; raise the specificity to 0.999 and see how much more it matters than sensitivity for a rare class.
:::

### Cross-validation and leakage

A model's performance must be measured on data that played no part in building it — not in fitting, not in choosing features, not in tuning hyperparameters such as $\lambda$. **$k$-fold cross-validation** divides the data into $k$ parts, trains on $k - 1$ and tests on the remaining one, rotating through all $k$, and averages the results; hyperparameters are chosen by an inner cross-validation within each training set ("nested" cross-validation), and a final **held-out test set** is used once, at the end.

The commonest error is **data leakage**: information about the test set reaching the training process. Biology offers many routes.

- **Homology.** If a protein in the test set has a close homologue in the training set, predicting its function is easy for a model that merely recognises similarity. Random splits of protein data therefore overestimate performance on genuinely new proteins; splits should cluster sequences by identity (say, below 30 %) and assign whole clusters to one side. Yungki Park and Edward Marcotte (2012) showed how much predictions of protein–protein interactions depended on whether test pairs shared proteins with training pairs.
- **Genomic proximity.** Neighbouring windows of a genome share sequence and chromatin context; regulatory-genomics models are tested on held-out chromosomes.
- **Shared individuals or batches.** Cells or images from the same patient, or samples from the same laboratory, must not be split across training and test sets if the goal is to predict for new patients or laboratories.
- **Preprocessing on the whole data set.** Selecting the "most informative" genes using all samples, then cross-validating a classifier on those genes, leaks the labels into the features; feature selection must be repeated inside each training fold.

::: warning A high test accuracy is not a working method
A model may exploit any feature that predicts the label in the data at hand, including features unrelated to biology: the scanner that produced an image, the hospital a sample came from, the year of sequencing, or the over-representation of well-studied genes among the positives. A well-known illustration comes from medical imaging: John Zech and colleagues (2018) found that networks trained to detect pneumonia on chest radiographs could also recognise which hospital system an image came from, and that differences in disease prevalence between hospitals let such cues inflate apparent performance. Before trusting a model, ask how its test set was made, whether it is independent of the training set in the way that matters for the intended use, and what features the model relies on. Performance on an external data set, collected separately, is far more convincing than any internal cross-validation.
:::

### Beyond linear models

**Decision trees** split the data by thresholds on single features; **random forests** (Leo Breiman, 2001) average many trees grown on bootstrap samples with random subsets of features, and **gradient-boosted trees** add trees sequentially to correct the errors of the ensemble so far. They capture interactions and non-linear effects automatically, handle mixed feature types, and are often the strongest methods for tabular data of moderate size, such as variant annotations or clinical measurements. Their feature-importance scores give a rough guide to what they use, though correlated features share importance unpredictably.

## Dimensionality reduction

An expression data set with 20,000 genes places each sample in a 20,000-dimensional space. To see it, and often to analyse it, we project it onto a few dimensions that capture most of its variation.

::: proposition Principal components {#prop-pca}
Let the $n$ samples be the rows of a centred data matrix $X$ ($n\times p$), with sample covariance matrix $S = X^\top X/(n - 1)$. The unit vector $\mathbf v$ that maximises the variance of the projections $X\mathbf v$ is the eigenvector of $S$ with the largest eigenvalue $\lambda_1$, and the variance achieved is $\lambda_1$. The $k$-th principal component is the eigenvector with the $k$-th largest eigenvalue; the components are orthogonal, and the fraction of the total variance captured by the first $k$ is $(\lambda_1 + \cdots + \lambda_k)/\tr S$.
:::

::: proof
The variance of the projections is $\mathbf v^\top S\mathbf v$. Write $\mathbf v$ in the orthonormal basis of eigenvectors $\mathbf e_j$ of the symmetric matrix $S$ ([spectral theorem](/learn/maths/lesson.php?c=linear-algebra&l=spectral-theorem)), $\mathbf v = \sum_jc_j\mathbf e_j$ with $\sum_jc_j^2 = 1$. Then $\mathbf v^\top S\mathbf v = \sum_j\lambda_jc_j^2 \le \lambda_1\sum_jc_j^2 = \lambda_1$, with equality when $\mathbf v = \mathbf e_1$. Restricting to vectors orthogonal to $\mathbf e_1$ and repeating gives the second component, and so on. The total variance is $\sum_j\lambda_j = \tr S$.
:::

::: example PCA of two correlated genes {#ex-pca}
Two genes have log-expression variances 3 and 3 across samples, with covariance 1. Find the principal components and the variance each explains.
::: solution
$S = \begin{pmatrix}3 & 1\\ 1 & 3\end{pmatrix}$ has eigenvalues $4$ and $2$, with eigenvectors $(1, 1)/\sqrt2$ and $(1, -1)/\sqrt2$. The first component, the sum of the two genes' (centred) expression, explains $4/6 = 67\%$ of the variance; the second, their difference, the remaining 33 %. With thousands of genes the same calculation (performed by singular value decomposition of $X$) often finds that a few components capture most of the variation — the main biological contrast, then batches, sex, cell-cycle stage and so on.
:::
:::

PCA is linear and its axes have meaning: each component is a weighted combination of genes, and the weights (loadings) can be inspected. Applied to genotypes, it reveals population structure; in a famous example, John Novembre and colleagues (2008) found that the first two principal components of European genotypes reproduced a map of Europe, because genetic similarity declines smoothly with geographic distance. For single-cell data, non-linear methods are used for display: **t-SNE** (Laurens van der Maaten and Geoffrey Hinton, 2008) and **UMAP** (Leland McInnes, John Healy and James Melville, 2018) place cells in two dimensions so that each cell's nearest neighbours in the high-dimensional space stay nearby.

::: quiz
In a UMAP plot of single-cell data, cluster A lies far from clusters B and C, which are close together, and cluster B looks twice as large as cluster C. What can you conclude?
- [ ] A is more different from B and C than B and C are from each other, in proportion to the distances shown.
- [ ] B contains cells with twice as much variation as C.
- [x] Cells within each cluster are similar to their neighbours in the original space, but distances between clusters and the apparent sizes of clusters are not reliable measures of similarity or spread.
- [ ] The three clusters are three cell types.
::: solution
t-SNE and UMAP preserve local neighbourhoods; they distort global distances and densities, and their output depends on parameters and random initialisation. Tara Chari and Lior Pachter (2023) showed that such embeddings can distort the relationships between cells severely. Clusters may correspond to cell types, but also to cell states, batches or doublets, and need validation by marker genes and independent data.
:::
:::

## Deep learning

A **neural network** composes many simple functions — linear maps followed by non-linear activations — whose parameters are fitted jointly by gradient descent on a loss, with the gradients computed by backpropagation. Deep networks can learn their own features from raw data, which is their great advantage when the relevant features are not known. Three architectures dominate biological applications.

### Convolutional networks for sequences

A **convolutional** layer slides a set of small filters along the input and records the response of each filter at each position. For one-hot DNA, a filter of width $w$ is a $w\times4$ matrix of weights — and this has a precise biological meaning.

::: proposition A convolutional filter is a position weight matrix {#prop-conv-pwm}
Let a DNA sequence be one-hot encoded as an $L\times4$ matrix $X$ with $X_{i,b} = 1$ if base $b$ is at position $i$. A convolutional filter with weights $W_{j,b}$ ($j = 1, \ldots, w$) and bias $c$ produces, at position $i$, the output

$$
z_i = c + \sum_{j=1}^{w}\sum_{b}W_{j,b}X_{i+j-1,b} = c + \sum_{j=1}^{w}W_{j,\,x_{i+j-1}},
$$

which is the score of the word $x_i\cdots x_{i+w-1}$ under the position weight matrix $W$ ([[bioinformatics/multiple-alignment#def-pssm]]), plus a constant. Taking the maximum of $z_i$ over positions ("max pooling") gives the best motif match in the sequence.
:::

::: proof
For each position $j$ of the window, exactly one $X_{i+j-1,b}$ equals 1, namely the one for the base present; the sum over $b$ therefore picks out the single weight $W_{j,\,x_{i+j-1}}$. Summing over $j$ gives the sum of the matrix entries for the bases in the window, which is the definition of a PWM score.
:::

::: example A filter scanning a sequence {#ex-conv}
Use the position weight matrix of [[bioinformatics/multiple-alignment#ex-pssm]] (entries rounded to two decimals) as the weights of a single convolutional filter of width 5 with zero bias. Compute its outputs along `AATGACTGA` and the result of max pooling.
::: solution
The sequence has $9 - 5 + 1 = 5$ windows. Adding the matrix entries for the bases in each window:

| position | window | output $z_i$ |
|---|---|---|
| 1 | `AATGA` | $-1.32 - 1.32 - 1.32 - 0.32 - 0.32 = -4.60$ |
| 2 | `ATGAC` | $-5.60$ |
| 3 | `TGACT` | $1.26 + 1.26 + 1.49 + 1.26 + 1.26 = 6.53$ |
| 4 | `GACTG` | $-6.60$ |
| 5 | `ACTGA` | $-4.60$ |

Max pooling returns 6.53, the score of the consensus at position 3. In a trained network the weights are learned rather than set, a non-linearity (typically $\max(0, z)$) follows the convolution, and the pooled outputs of many filters feed later layers; but each first-layer filter still computes exactly this kind of scan. Converting learned filters back into PWMs and comparing them with databases of known motifs is a standard way of interpreting sequence models.
:::
:::

So the first layer of a sequence network learns a bank of PWM-like motif detectors, and deeper layers learn combinations of motifs, their spacing and orientation. **DeepBind** (Babak Alipanahi, Andrew Delong, Matthew Weirauch and Brendan Frey, 2015) learned binding preferences of proteins from high-throughput binding data; **DeepSEA** (Jian Zhou and Olga Troyanskaya, 2015) and **Basset** (David Kelley and colleagues, 2016) predicted chromatin features of genomic windows from sequence alone, and so the effects of non-coding variants on them; **SpliceAI** (Kishore Jaganathan and colleagues, 2019) predicts splice sites from 10 kb of sequence context with enough accuracy to identify splice-disrupting variants; **Enformer** (Žiga Avsec and colleagues, 2021) combined convolutions with attention to predict gene expression from about 200 kb of sequence. These models are evaluated on held-out chromosomes, and their predictions are interpreted by **in silico mutagenesis** — predicting the effect of every possible single-base change — or by attribution methods that highlight the bases driving a prediction, which often recover known motifs.

### Images

Microscopy produces images of cells and tissues in enormous numbers. Convolutional networks segment them — outlining every nucleus or cell — and classify them. The **U-Net** architecture (Olaf Ronneberger, Philipp Fischer and Thomas Brox, 2015), designed for biomedical image segmentation with few training images, and generalist cell-segmentation models such as **Cellpose** (Carsen Stringer, Marius Pachitariu and colleagues, 2021) have made automated measurement of morphology routine. The pitfalls are those of all machine learning: a network trained on one microscope or staining protocol may fail on another.

### Proteins

Proteins have been the most spectacular success. **AlphaFold2** (Jumper and colleagues, 2021) takes a sequence and a multiple alignment of its homologues ([[bioinformatics/multiple-alignment]]) — whose patterns of correlated mutation carry information about which residues are in contact — and passes them through a network that reasons jointly about the alignment and about pairs of residues, outputting atomic coordinates with a per-residue confidence score (pLDDT). RoseTTAFold (Minkyung Baek, Baker and colleagues, 2021) followed a similar route. The AlphaFold Protein Structure Database (Mihaly Varadi and colleagues, 2022) extended predictions to more than 200 million UniProt sequences. AlphaFold3 (Josh Abramson and colleagues, 2024) extended prediction to complexes of proteins with nucleic acids, small molecules and ions.

**Protein language models** take a different route. Trained, like text models, to predict masked residues in hundreds of millions of sequences, models such as ESM (Alexander Rives and colleagues, 2021; ESM-2 and ESMFold, Zeming Lin and colleagues, 2023) learn representations from which structure, function and the effects of mutations can be predicted without an explicit alignment; ESMFold was used to predict structures for over 600 million metagenomic proteins. The architecture behind them, the transformer, is the subject of LLM Atlas ([transformers](/learn/llm/course.php?c=transformers)).

What these models do not do is as important. Predicted structures are static, single conformations; they say little directly about dynamics, about the effect of most single mutations on stability, or about disordered regions, which receive low confidence scores. And a confident prediction is still a prediction: experimental structures remain the ground truth on which the models were trained and against which they are tested ([[structural-biology]]).

::: application Variant interpretation
Deciding whether a missense variant found in a patient is pathogenic is one of the most important prediction problems in human genetics. Machine-learning predictors trained on known pathogenic and benign variants, using conservation across species ([[bioinformatics/multiple-alignment]]), protein structure and, increasingly, protein language models, now provide one line of evidence in clinical variant classification. Their training data illustrate the pitfalls of this chapter: known variants are biased towards well-studied genes and towards populations of European ancestry, which are over-represented in genetic databases and studies, so performance — and the transferability of related tools such as polygenic scores (Alicia Martin and colleagues, 2019) — can be lower for people of other ancestries. How such evidence is used clinically is described in Medicine Atlas ([genetics](/learn/medicine/course.php?c=genetics)).
:::

::: history
Neural networks were applied to biological sequences in the 1980s: Ning Qian and Terrence Sejnowski predicted protein secondary structure with a network in 1988, and Burkhard Rost and Chris Sander's PHD method (1993) improved it by using multiple alignments as input. Support vector machines and random forests dominated the 2000s. The deep-learning era in genomics began around 2015 with DeepBind and DeepSEA, following the success of convolutional networks in image recognition from 2012. In protein structure, residue contacts predicted from correlated mutations in alignments (Debora Marks, Chris Sander and colleagues, 2011) and then deep networks steadily improved CASP results, culminating in AlphaFold2 at CASP14 in 2020 and publication in 2021; the 2024 Nobel Prize in Chemistry recognised protein-structure prediction and computational protein design.
:::

::: summary
- Supervised learning predicts labels from features; the goal is generalisation, which is threatened in biology by $p \gg n$ and by non-independent samples. Representation (one-hot, $k$-mers, expression vectors, images) is a key choice.
- Logistic regression models log-odds as linear in the features ([[#def-logistic]]); L2 and L1 regularisation make it usable with many features; coefficients multiply the odds.
- Evaluate with sensitivity, specificity, precision, ROC and precision–recall curves ([[#def-metrics]]); with rare positives, precision is low even for good classifiers, and accuracy is misleading.
- Cross-validate honestly: hold out by homology cluster, chromosome, individual or batch, and do all feature selection inside training folds. External validation is the strongest evidence.
- PCA projects data onto the eigenvectors of the covariance matrix, capturing maximal variance ([[#prop-pca]]); t-SNE and UMAP preserve local neighbourhoods but distort global distances.
- A convolutional filter on one-hot DNA is a PWM ([[#prop-conv-pwm]]); deep networks predict binding, chromatin, splicing and expression from sequence, segment images and, with AlphaFold and protein language models, predict protein structure — as predictions with stated confidence, not measurements.
:::

## Exercises

::: exercise The logistic function {level=1 check="0.8808"}
A logistic regression has linear predictor $z = 2$ for a sequence. What is the predicted probability that it is a positive (four decimal places)?
::: solution
$\sigma(2) = 1/(1 + e^{-2}) = 1/1.1353 = 0.8808$.
:::
:::

::: exercise Precision, recall and F1 {level=1 check="0.7273"}
On a test set, a classifier gives TP = 40, FP = 10, FN = 20, TN = 930. Compute precision, recall and the $F_1$ score $2PR/(P + R)$ (four decimal places for $F_1$).
::: solution
Precision $= 40/50 = 0.8$; recall $= 40/60 = 0.667$; $F_1 = 2\times0.8\times0.667/(0.8 + 0.667) = 1.0667/1.4667 = 0.7273$. Accuracy is $970/1{,}000 = 0.97$, which says much less.
:::
:::

::: exercise An AUC by hand {level=1 check="10/12"}
Three positives score 0.9, 0.7 and 0.4; four negatives score 0.8, 0.3, 0.2 and 0.1. Compute the AUC as the fraction of positive–negative pairs ranked correctly.
::: solution
There are $3\times4 = 12$ pairs. The positive at 0.9 beats all four negatives; 0.7 beats three (not 0.8); 0.4 beats three (not 0.8). AUC $= 10/12 = 0.833$.
:::
:::

::: exercise Variance explained {level=2 check="0.8"}
The covariance matrix of three standardised features has eigenvalues 2.4, 0.4 and 0.2. What fraction of the total variance does the first principal component explain? And the first two together?
::: solution
The total variance is the trace, $2.4 + 0.4 + 0.2 = 3$ (as it must be for three standardised features). The first component explains $2.4/3 = 0.8$ of it, and the first two together $(2.4 + 0.4)/3 = 0.933$. The three features are strongly correlated: one combination of them carries most of their variation.
:::
:::

::: exercise Counting parameters {level=2 check="9856"}
The first layer of a sequence model has 128 convolutional filters of width 19 applied to one-hot DNA, each with one bias. How many parameters does the layer have?
::: solution
Each filter has $19\times4 = 76$ weights plus a bias, 77 parameters; $128\times77 = 9{,}856$. By [[#prop-conv-pwm]], the layer is a bank of 128 learnable 19-position weight matrices.
:::
:::

::: exercise Perfect training accuracy {level=2}
A study measures 20,000 genes in 40 tumours, 20 that responded to a drug and 20 that did not, and reports that a classifier built on the expression data separates responders from non-responders perfectly. (a) Why is this unsurprising even if expression has nothing to do with response? (b) The authors selected the 50 genes most different between the groups using all 40 samples, then ran 5-fold cross-validation of a classifier on those genes and obtained 90 % accuracy. What is wrong? (c) How should it be done?
::: solution
(a) With $p = 20{,}000$ features and $n = 40$ samples, the samples are almost certainly linearly separable in many ways: a hyperplane can be found that separates any labelling of 40 points in a space of more than 39 dimensions (in general position). Training accuracy says nothing.

(b) The labels of the test folds were used to choose the features, so the cross-validation is not independent of them: the 50 genes were chosen precisely because they differ between the groups in these samples, including the test samples, and by chance alone some of 20,000 genes will. This selection bias (described for microarrays by Christophe Ambroise and Geoffrey McLachlan, 2002) can produce high cross-validated accuracy from pure noise.

(c) Repeat the feature selection inside each training fold, using only training samples; tune any hyperparameters by nested cross-validation; and ideally test the final model on an independent cohort collected separately.
:::
:::

::: exercise Splitting protein data {level=3}
A model predicts enzyme function (EC number) from sequence. With a random 80/20 split of 100,000 proteins it achieves 95 % accuracy; when the test set contains only proteins with less than 30 % identity to any training protein, accuracy falls to 55 %. (a) Explain the difference. (b) Which number should be reported for a user who wants to annotate proteins from a newly sequenced environmental sample? (c) How would you compare the model with a simple baseline?
::: solution
(a) In a random split, most test proteins have close homologues in the training set, so the task reduces to recognising similarity — something a BLAST search does well ([[bioinformatics/database-search]]). The identity-filtered split tests whether the model generalises to proteins unlike those it has seen.

(b) It depends on how similar the new proteins are to known ones. Many proteins from unexplored environments have no close characterised homologue, so the 55 % figure (or performance stratified by identity to the training set) is the relevant one. Reporting only the random-split accuracy would mislead.

(c) Compare with transferring the annotation of the best BLAST or profile-HMM hit at each identity level. A model is useful if it beats this baseline where homology search is weak, below the twilight zone; matching BLAST at high identity adds little.
:::
:::

::: exercise What did the network learn? {level=3}
A convolutional network trained to distinguish enhancers active in heart from those active in brain achieves an AUC of 0.92 on held-out chromosomes. In silico mutagenesis shows that its predictions depend mostly on GC content, with no recognisable motifs. (a) Why might a model learn GC content? (b) Is the AUC wrong? (c) What control experiments would you perform?
::: solution
(a) If heart and brain enhancers in the training data differ in average GC content — because of the way they were identified, the genomic regions they lie in, or genuine compositional differences — GC content alone predicts the label, and gradient descent finds the simplest predictive feature.

(b) The AUC is a correct measurement of performance on that test set, but it may not reflect what was intended — learning the regulatory code. On data where GC content does not differ between classes, the model would fail.

(c) Build a negative set matched for GC content (and other confounders such as distance to genes and repeat content) and retrain; test whether performance survives. Check whether known heart and brain transcription-factor motifs (for example from JASPAR) contribute when inserted into neutral sequence. Ultimately, test predictions experimentally, for instance with reporter assays of designed sequences.
:::
:::
