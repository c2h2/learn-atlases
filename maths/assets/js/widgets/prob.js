/* Maths Atlas — interactive figures: probability and statistics.
   distribution, clt, lln, montecarlo, galton, markov, hypothesis, confidence, bayes, regression.
   The numerical part (special functions, distributions) also loads in node for testing:
   const PR = require('./assets/js/widgets/prob.js'). */
(function () {
  'use strict';

  // ================================================================== numerical library
  const PR = (function () {
    const LOG_SQRT_2PI = 0.91893853320467274178;
    const SQRT_2PI = 2.5066282746310005024;
    const EPS = 1e-15, FPMIN = 1e-300, MAXIT = 20000;

    // ---- gamma family -------------------------------------------------------------
    const LC = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059,
      12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
    /** log |Γ(x)| (Lanczos, g = 7; relative accuracy ~1e-15). */
    function lgamma(x) {
      if (Number.isNaN(x)) return NaN;
      if (x <= 0 && Number.isInteger(x)) return Infinity;
      if (x < 0.5) return Math.log(Math.PI / Math.abs(Math.sin(Math.PI * x))) - lgamma(1 - x);
      if (x === 1 || x === 2) return 0;
      x -= 1;
      let a = LC[0];
      const t = x + 7.5;
      for (let i = 1; i < 9; i++) a += LC[i] / (x + i);
      return LOG_SQRT_2PI + (x + 0.5) * Math.log(t) - t + Math.log(a);
    }
    const lbeta = (a, b) => lgamma(a) + lgamma(b) - lgamma(a + b);
    /** log of the binomial coefficient C(n, k) (real n, k). */
    const lchoose = (n, k) => lgamma(n + 1) - lgamma(k + 1) - lgamma(n - k + 1);

    /** Regularised incomplete gamma: P(a, x) (lower) or Q(a, x) (upper); series / continued fraction. */
    function gammaInc(a, x, upper) {
      if (!(a > 0) || Number.isNaN(x)) return NaN;
      if (x <= 0) return upper ? 1 : 0;
      if (x === Infinity) return upper ? 0 : 1;
      const lpre = -x + a * Math.log(x) - lgamma(a);
      if (x < a + 1) {
        // series: P = e^{-x} x^a / Γ(a+1) · Σ x^n / ((a+1)…(a+n))
        let ap = a, sum = 1 / a, del = sum;
        for (let n = 0; n < MAXIT; n++) {
          ap += 1; del *= x / ap; sum += del;
          if (Math.abs(del) < Math.abs(sum) * EPS) break;
        }
        const p = Math.min(1, sum * Math.exp(lpre));
        return upper ? 1 - p : p;
      }
      // continued fraction for Q (modified Lentz)
      let b = x + 1 - a, c = 1 / FPMIN, d = 1 / b, h = d;
      for (let i = 1; i < MAXIT; i++) {
        const an = -i * (i - a);
        b += 2;
        d = an * d + b; if (Math.abs(d) < FPMIN) d = FPMIN;
        c = b + an / c; if (Math.abs(c) < FPMIN) c = FPMIN;
        d = 1 / d;
        const del = d * c;
        h *= del;
        if (Math.abs(del - 1) < EPS) break;
      }
      const q = Math.min(1, Math.exp(lpre) * h);
      return upper ? q : 1 - q;
    }

    /** Continued fraction for the incomplete beta function (Numerical Recipes betacf, modified Lentz). */
    function betacf(a, b, x) {
      const qab = a + b, qap = a + 1, qam = a - 1;
      let c = 1, d = 1 - qab * x / qap;
      if (Math.abs(d) < FPMIN) d = FPMIN;
      d = 1 / d;
      let h = d;
      for (let m = 1; m <= MAXIT; m++) {
        const m2 = 2 * m;
        let aa = m * (b - m) * x / ((qam + m2) * (a + m2));
        d = 1 + aa * d; if (Math.abs(d) < FPMIN) d = FPMIN;
        c = 1 + aa / c; if (Math.abs(c) < FPMIN) c = FPMIN;
        d = 1 / d; h *= d * c;
        aa = -(a + m) * (qab + m) * x / ((a + m2) * (qap + m2));
        d = 1 + aa * d; if (Math.abs(d) < FPMIN) d = FPMIN;
        c = 1 + aa / c; if (Math.abs(c) < FPMIN) c = FPMIN;
        d = 1 / d;
        const del = d * c;
        h *= del;
        if (Math.abs(del - 1) < EPS) break;
      }
      return h;
    }
    /**
     * Regularised incomplete beta I_x(a, b) (or its complement when `upper`). `y` = 1 − x may be
     * passed when it is known more accurately than 1 − x. Each tail is computed directly where it is
     * small, so both tails keep their relative accuracy.
     */
    function betaInc(x, a, b, upper, y) {
      if (!(a > 0) || !(b > 0) || Number.isNaN(x)) return NaN;
      if (y === undefined) y = 1 - x;
      if (x <= 0) return upper ? 1 : 0;
      if (y <= 0) return upper ? 0 : 1;
      const lbt = a * Math.log(x) + b * Math.log(y) - lbeta(a, b);
      if (x < (a + 1) / (a + b + 2)) {
        const v = Math.min(1, Math.exp(lbt) * betacf(a, b, x) / a);
        return upper ? 1 - v : v;
      }
      const v = Math.min(1, Math.exp(lbt) * betacf(b, a, y) / b);
      return upper ? v : 1 - v;
    }

    // ---- normal -------------------------------------------------------------------
    /** Upper tail Q(x) = P(Z > x) for x ≥ 0 (Hart 1968 / West 2005, double precision). */
    function normTail(x) {
      if (x > 38.5) return 0;
      // relative accuracy of the rational form drops to ~1e-9 near x = 6; use Q(1/2, x²/2) there
      if (x >= 4) return 0.5 * gammaInc(0.5, x * x / 2, true);
      const e = Math.exp(-x * x / 2);
      {
        let n = 3.52624965998911e-2 * x + 0.700383064443688;
        n = n * x + 6.37396220353165; n = n * x + 33.912866078383; n = n * x + 112.079291497871;
        n = n * x + 221.213596169931; n = n * x + 220.206867912376;
        let d = 8.83883476483184e-2 * x + 1.75566716318264;
        d = d * x + 16.064177579207; d = d * x + 86.7807322029461; d = d * x + 296.564248779674;
        d = d * x + 637.333633378831; d = d * x + 793.826512519948; d = d * x + 440.413735824752;
        return e * n / d;
      }
    }
    /** Standard normal CDF Φ(z). */
    const pnorm = (z) => (Number.isNaN(z) ? NaN : z >= 0 ? 1 - normTail(z) : normTail(-z));
    /** Standard normal upper tail 1 − Φ(z), accurate for large z. */
    const pnormUpper = (z) => pnorm(-z);
    const dnorm = (z) => Math.exp(-z * z / 2 - LOG_SQRT_2PI);
    /** Standard normal quantile (Acklam's rational approximation + one Halley step: full precision). */
    function qnorm(p) {
      if (Number.isNaN(p) || p < 0 || p > 1) return NaN;
      if (p === 0) return -Infinity;
      if (p === 1) return Infinity;
      if (p > 0.5) return -qnorm(1 - p);
      const a = [-3.969683028665376e+01, 2.209460984245205e+02, -2.759285104469687e+02, 1.383577518672690e+02, -3.066479806614716e+01, 2.506628277459239e+00];
      const b = [-5.447609879822406e+01, 1.615858368580409e+02, -1.556989798598866e+02, 6.680131188771972e+01, -1.328068155288572e+01];
      const c = [-7.784894002430293e-03, -3.223964580411365e-01, -2.400758277161838e+00, -2.549732539343734e+00, 4.374664141464968e+00, 2.938163982698783e+00];
      const d = [7.784695709041462e-03, 3.224671290700398e-01, 2.445134137142996e+00, 3.754408661907416e+00];
      let x;
      if (p < 0.02425) {
        const q = Math.sqrt(-2 * Math.log(p));
        x = (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
      } else {
        const q = p - 0.5, r = q * q;
        x = (((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q / (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1);
      }
      for (let k = 0; k < 2; k++) {
        const e = pnorm(x) - p;
        const u = e * SQRT_2PI * Math.exp(x * x / 2);
        if (!Number.isFinite(u)) break;
        x -= u / (1 + x * u / 2);
      }
      return x;
    }

    // ---- Student t, noncentral t ----------------------------------------------------
    /** CDF of Student's t with ν degrees of freedom; `upper` gives P(T > t) directly. */
    function pt(t, nu, upper) {
      if (Number.isNaN(t) || !(nu > 0)) return NaN;
      if (t === Infinity) return upper ? 0 : 1;
      if (t === -Infinity) return upper ? 1 : 0;
      if (nu > 1e7) return upper ? pnormUpper(t) : pnorm(t);
      const t2 = t * t, x = nu / (nu + t2), y = t2 / (nu + t2);
      const tail = 0.5 * betaInc(x, nu / 2, 0.5, false, y); // P(T > |t|)
      const lowerTail = t > 0 ? !upper : upper;
      return lowerTail ? 1 - tail : tail;
    }
    function dt(t, nu) {
      if (nu > 1e7) return dnorm(t);
      return Math.exp(lgamma((nu + 1) / 2) - lgamma(nu / 2) - 0.5 * Math.log(nu * Math.PI) - (nu + 1) / 2 * Math.log1p(t * t / nu));
    }
    /** Noncentral t CDF (Lenth 1989, AS 243, as in R's pnt). */
    function pnt(t, df, ncp) {
      if (!(df > 0) || Number.isNaN(t)) return NaN;
      if (ncp === 0) return pt(t, df);
      if (t === Infinity) return 1;
      if (t === -Infinity) return 0;
      let negdel, tt, del;
      if (t >= 0) { negdel = false; tt = t; del = ncp; } else { if (ncp > 40) return 0; negdel = true; tt = -t; del = -ncp; }
      if (df > 4e5 || del * del > 2 * Math.LN2 * 1021) {
        const s = 1 / (4 * df);
        const z = (tt * (1 - s) - del) / Math.sqrt(1 + tt * tt * 2 * s);
        return negdel ? pnormUpper(z) : pnorm(z);
      }
      let tnc;
      const x = tt * tt / (tt * tt + df);
      if (x > 0) {
        const lambda = del * del;
        let p = 0.5 * Math.exp(-0.5 * lambda);
        if (p === 0) return negdel ? 1 : 0;
        let q = Math.sqrt(2 / Math.PI) * p * del;
        let s = 0.5 - p;
        if (s < 1e-7) s = -0.5 * Math.expm1(-0.5 * lambda);
        let a = 0.5;
        const b = 0.5 * df;
        const rxb = Math.pow(df / (tt * tt + df), b);
        const albeta = 0.5 * Math.log(Math.PI) + lgamma(b) - lgamma(0.5 + b);
        let xodd = betaInc(x, a, b, false, df / (tt * tt + df));
        let godd = 2 * rxb * Math.exp(a * Math.log(x) - albeta);
        tnc = b * x;
        let xeven = tnc < 2.2e-16 ? tnc : 1 - rxb;
        let geven = tnc * rxb;
        tnc = p * xodd + q * xeven;
        for (let it = 1; it <= 2000; it++) {
          a += 1;
          xodd -= godd; xeven -= geven;
          godd *= x * (a + b - 1) / a;
          geven *= x * (a + b - 0.5) / (a + 0.5);
          p *= lambda / (2 * it);
          q *= lambda / (2 * it + 1);
          tnc += p * xodd + q * xeven;
          s -= p;
          if (s < -1e-10) break;
          if (s <= 0 && it > 1) break;
          const errbd = 2 * s * (xodd - godd);
          if (Math.abs(errbd) < 1e-13) break;
        }
      } else {
        tnc = 0;
      }
      tnc += pnormUpper(del);
      tnc = Math.min(1, Math.max(0, tnc));
      return negdel ? 1 - tnc : tnc;
    }
    /** Noncentral t density (R's dnt identity). */
    function dnt(t, df, ncp) {
      if (ncp === 0) return dt(t, df);
      if (!Number.isFinite(t)) return 0;
      if (df > 1e8) return dnorm(t - ncp);
      if (Math.abs(t) > Math.sqrt(df * 2.2e-16)) {
        const v = df / Math.abs(t) * Math.abs(pnt(t * Math.sqrt((df + 2) / df), df + 2, ncp) - pnt(t, df, ncp));
        return v;
      }
      return Math.exp(lgamma((df + 1) / 2) - lgamma(df / 2) - (0.5 * Math.log(Math.PI) + 0.5 * (Math.log(df) + ncp * ncp)));
    }

    /** Student t quantile: closed forms for ν = 1, 2; else Cornish–Fisher start + Newton, verified (bisection fallback). */
    function qt(p, nu) {
      if (Number.isNaN(p) || !(nu > 0) || p < 0 || p > 1) return NaN;
      if (p === 0) return -Infinity;
      if (p === 1) return Infinity;
      if (nu > 1e7) return qnorm(p);
      if (p > 0.5) return -qt(1 - p, nu);
      if (nu === 1) return -1 / Math.tan(Math.PI * p); // = tan(π(p − 1/2)) without cancellation
      if (nu === 2) return (2 * p - 1) / Math.sqrt(2 * p * (1 - p));
      const z = qnorm(p), z2 = z * z;
      const g1 = (z2 + 1) * z / 4, g2 = ((5 * z2 + 16) * z2 + 3) * z / 96;
      const g3 = (((3 * z2 + 19) * z2 + 17) * z2 - 15) * z / 384;
      const g4 = ((((79 * z2 + 776) * z2 + 1482) * z2 - 1920) * z2 - 945) * z / 92160;
      let x = z + g1 / nu + g2 / (nu * nu) + g3 / (nu * nu * nu) + g4 / (nu * nu * nu * nu);
      if (!(x < 0)) x = z;
      for (let i = 0; i < 40; i++) {
        const dx = (pt(x, nu) - p) / dt(x, nu);
        if (!Number.isFinite(dx)) break;
        const nx = x - dx;
        x = nx < 0 ? nx : x / 2; // stay in the lower half (p < 1/2)
        if (Math.abs(dx) <= 1e-15 * Math.abs(x)) break;
      }
      if (Number.isFinite(x) && Math.abs(pt(x, nu) - p) <= 1e-12 * p) return x;
      return bisectQuantile((y) => pt(y, nu), (y) => pt(y, nu, true), p, -Infinity, Infinity, 0, 1);
    }

    // ---- quantiles by bisection ----------------------------------------------------
    /**
     * Continuous quantile: x with F(x) = p, by bracketing and bisection. Uses the survival function
     * for p > 1/2 so upper quantiles stay accurate. lo/hi: support bounds (may be infinite); guess: start.
     */
    function bisectQuantile(cdf, sf, p, lo, hi, guess, scale) {
      if (!(p >= 0 && p <= 1)) return NaN;
      if (p === 0) return lo;
      if (p === 1) return hi;
      const useSf = p > 0.5 && sf;
      const target = useSf ? 1 - p : p;
      // g(x) increasing in x, root where g = 0
      const g = useSf ? (x) => target - sf(x) : (x) => cdf(x) - target;
      scale = scale > 0 ? scale : 1;
      let a = Number.isFinite(lo) ? lo : Math.min(guess - scale, -scale);
      let b = Number.isFinite(hi) ? hi : Math.max(guess + scale, scale);
      for (let i = 0; i < 400 && !Number.isFinite(lo) && g(a) > 0; i++) a -= scale * Math.pow(2, i / 4 + 1);
      for (let i = 0; i < 400 && !Number.isFinite(hi) && g(b) < 0; i++) b += scale * Math.pow(2, i / 4 + 1);
      for (let i = 0; i < 1200; i++) {
        const m = 0.5 * (a + b);
        if (m === a || m === b) break;
        if (g(m) < 0) a = m; else b = m;
        if (b - a <= 4e-16 * Math.max(Math.abs(a), Math.abs(b))) break;
      }
      return 0.5 * (a + b);
    }
    /** Discrete quantile: smallest integer k in [lo, hi] with F(k) ≥ p. */
    function discreteQuantile(cdf, p, lo, hi, guess) {
      if (!(p >= 0 && p <= 1)) return NaN;
      if (p === 0) return lo;
      p *= 1 - 1e-12; // F(k) = p computed with rounding error still counts as reaching p
      let a = Number.isFinite(lo) ? lo - 1 : Math.floor(guess) - 1;
      let b = Number.isFinite(hi) ? hi : Math.ceil(guess) + 1;
      for (let i = 0; i < 200 && !Number.isFinite(lo) && cdf(a) >= p; i++) a -= Math.max(1, Math.abs(a));
      for (let i = 0; i < 200 && !Number.isFinite(hi) && cdf(b) < p; i++) b += Math.max(1, Math.abs(b));
      // invariant: cdf(a) < p ≤ cdf(b)
      while (b - a > 1) {
        const m = Math.floor((a + b) / 2);
        if (cdf(m) >= p) b = m; else a = m;
      }
      return b;
    }

    // ---- distributions ------------------------------------------------------------
    /*
     * Each distribution: params (spec for parsing and sliders), discrete flag, and functions of the
     * parameter object P: support → [lo, hi], pdf(x) (pmf for discrete), cdf(x), sf(x) = P(X > x),
     * mean, variance (NaN = undefined, Infinity = infinite), quantile(p), tex (name), formula (TeX).
     * Discrete cdf/sf accept real x (floored).
     */
    const fx = (v) => {
      // compact number for TeX labels: up to 4 significant digits
      if (!Number.isFinite(v)) return v > 0 ? '\\infty' : '-\\infty';
      const s = String(+v.toPrecision(4));
      return s.includes('e') ? s.replace(/e\+?(-?\d+)/, '\\times 10^{$1}') : s;
    };
    const POS = (name) => (v) => (v > 0 ? null : name + ' must be positive');
    const PROB = (name, open0) => (v) => (v >= 0 && v <= 1 && (!open0 || v > 0) ? null : name + (open0 ? ' must be in (0, 1]' : ' must be between 0 and 1'));
    const INTMIN = (name, m) => (v) => (Number.isInteger(v) && v >= m ? null : name + ' must be a whole number ≥ ' + m);

    const D = {};
    D.binomial = {
      discrete: true, name: 'Binomial',
      params: [
        { key: 'n', names: ['n', 'trials', 'N'], def: 10, min: 1, max: 50, step: 1, int: true, check: INTMIN('n', 1), cap: 5000 },
        { key: 'p', names: ['p', 'prob', 'theta'], def: 0.5, min: 0, max: 1, step: 0.01, check: PROB('p') },
      ],
      support: (P) => [0, P.n],
      pdf: (k, P) => {
        if (k < 0 || k > P.n || !Number.isInteger(k)) return 0;
        if (P.p === 0) return k === 0 ? 1 : 0;
        if (P.p === 1) return k === P.n ? 1 : 0;
        return Math.exp(lchoose(P.n, k) + k * Math.log(P.p) + (P.n - k) * Math.log1p(-P.p));
      },
      cdf: (x, P) => {
        const k = Math.floor(x);
        if (k < 0) return 0;
        if (k >= P.n) return 1;
        if (P.p === 0) return 1;
        if (P.p === 1) return 0;
        return betaInc(1 - P.p, P.n - k, k + 1, false, P.p);
      },
      sf: (x, P) => {
        const k = Math.floor(x);
        if (k < 0) return 1;
        if (k >= P.n) return 0;
        if (P.p === 0) return 0;
        if (P.p === 1) return 1;
        return betaInc(P.p, k + 1, P.n - k, false, 1 - P.p);
      },
      mean: (P) => P.n * P.p,
      variance: (P) => P.n * P.p * (1 - P.p),
      tex: (P) => '\\operatorname{Bin}(' + fx(P.n) + ',\\ ' + fx(P.p) + ')',
      formula: '\\Prob(X=k)=\\binom{n}{k}p^k(1-p)^{n-k}',
    };
    D.poisson = {
      discrete: true, name: 'Poisson',
      params: [{ key: 'lambda', tex: '\\lambda', names: ['lambda', 'lam', 'l', 'mu', 'm', 'rate', 'λ'], def: 4, min: 0.1, max: 30, step: 0.1, check: POS('λ'), cap: 1e5 }],
      support: () => [0, Infinity],
      pdf: (k, P) => (k < 0 || !Number.isInteger(k) ? 0 : Math.exp(k * Math.log(P.lambda) - P.lambda - lgamma(k + 1))),
      cdf: (x, P) => { const k = Math.floor(x); return k < 0 ? 0 : gammaInc(k + 1, P.lambda, true); },
      sf: (x, P) => { const k = Math.floor(x); return k < 0 ? 1 : gammaInc(k + 1, P.lambda, false); },
      mean: (P) => P.lambda,
      variance: (P) => P.lambda,
      tex: (P) => '\\operatorname{Poisson}(' + fx(P.lambda) + ')',
      formula: '\\Prob(X=k)=\\dfrac{\\lambda^k e^{-\\lambda}}{k!}',
    };
    D.geometric = {
      discrete: true, name: 'Geometric',
      params: [
        { key: 'p', names: ['p', 'prob', 'theta'], def: 0.3, min: 0.02, max: 1, step: 0.01, check: PROB('p', true) },
        { key: 'failures', names: ['failures', 'f', 'start'], def: 0, hidden: true },
      ],
      // trials until the first success (k ≥ 1), or failures before it (k ≥ 0) with failures=1
      s0: (P) => (P.failures ? 0 : 1),
      support: (P) => [D.geometric.s0(P), Infinity],
      pdf: (k, P) => {
        const j = k - D.geometric.s0(P);
        if (j < 0 || !Number.isInteger(j)) return 0;
        return P.p === 1 ? (j === 0 ? 1 : 0) : Math.exp(j * Math.log1p(-P.p)) * P.p;
      },
      cdf: (x, P) => { const j = Math.floor(x) - D.geometric.s0(P); return j < 0 ? 0 : P.p === 1 ? 1 : -Math.expm1((j + 1) * Math.log1p(-P.p)); },
      sf: (x, P) => { const j = Math.floor(x) - D.geometric.s0(P); return j < 0 ? 1 : P.p === 1 ? 0 : Math.exp((j + 1) * Math.log1p(-P.p)); },
      mean: (P) => (P.failures ? (1 - P.p) / P.p : 1 / P.p),
      variance: (P) => (1 - P.p) / (P.p * P.p),
      tex: (P) => '\\operatorname{Geom}(' + fx(P.p) + ')',
      formula: '\\Prob(X=k)=(1-p)^{k-1}p,\\ k\\ge 1',
      formula0: '\\Prob(X=k)=(1-p)^{k}p,\\ k\\ge 0',
    };
    D.negbinomial = {
      discrete: true, name: 'Negative binomial',
      params: [
        { key: 'r', names: ['r', 'k', 'successes', 'n'], def: 3, min: 1, max: 20, step: 1, int: true, check: INTMIN('r', 1), cap: 1000 },
        { key: 'p', names: ['p', 'prob', 'theta'], def: 0.4, min: 0.02, max: 1, step: 0.01, check: PROB('p', true) },
        { key: 'failures', names: ['failures', 'f', 'start'], def: 0, hidden: true },
      ],
      // trials until the r-th success (k ≥ r), or failures before it (k ≥ 0) with failures=1
      s0: (P) => (P.failures ? 0 : P.r),
      support: (P) => [D.negbinomial.s0(P), Infinity],
      pdf: (k, P) => {
        const j = k - D.negbinomial.s0(P); // failures
        if (j < 0 || !Number.isInteger(j)) return 0;
        if (P.p === 1) return j === 0 ? 1 : 0;
        return Math.exp(lchoose(j + P.r - 1, j) + P.r * Math.log(P.p) + j * Math.log1p(-P.p));
      },
      cdf: (x, P) => { const j = Math.floor(x) - D.negbinomial.s0(P); return j < 0 ? 0 : P.p === 1 ? 1 : betaInc(P.p, P.r, j + 1, false, 1 - P.p); },
      sf: (x, P) => { const j = Math.floor(x) - D.negbinomial.s0(P); return j < 0 ? 1 : P.p === 1 ? 0 : betaInc(P.p, P.r, j + 1, true, 1 - P.p); },
      mean: (P) => (P.failures ? P.r * (1 - P.p) / P.p : P.r / P.p),
      variance: (P) => P.r * (1 - P.p) / (P.p * P.p),
      tex: (P) => '\\operatorname{NB}(r{=}' + fx(P.r) + ',\\ p{=}' + fx(P.p) + ')',
      formula: '\\Prob(X=k)=\\binom{k-1}{r-1}p^r(1-p)^{k-r},\\ k\\ge r',
      formula0: '\\Prob(X=k)=\\binom{k+r-1}{k}p^r(1-p)^{k},\\ k\\ge 0',
    };
    // pmf table with prefix sums (both tails), cached for the current parameters
    let hgCache = null;
    function hgTable(P) {
      if (hgCache && hgCache.N === P.N && hgCache.K === P.K && hgCache.n === P.n) return hgCache;
      const lo = Math.max(0, P.n - (P.N - P.K)), hi = Math.min(P.n, P.K), m = hi - lo + 1;
      const pmf = new Float64Array(m), left = new Float64Array(m), right = new Float64Array(m);
      const lc = lchoose(P.N, P.n);
      for (let i = 0; i < m; i++) pmf[i] = Math.exp(lchoose(P.K, lo + i) + lchoose(P.N - P.K, P.n - lo - i) - lc);
      let s = 0;
      for (let i = 0; i < m; i++) { s += pmf[i]; left[i] = s; }       // P(X ≤ lo + i)
      s = 0;
      for (let i = m - 1; i >= 0; i--) { right[i] = s; s += pmf[i]; } // P(X > lo + i)
      const tot = left[m - 1] || 1;
      for (let i = 0; i < m; i++) { pmf[i] /= tot; left[i] = Math.min(1, left[i] / tot); right[i] = Math.min(1, right[i] / tot); }
      hgCache = { N: P.N, K: P.K, n: P.n, lo, hi, pmf, left, right };
      return hgCache;
    }
    D.hypergeometric = {
      discrete: true, name: 'Hypergeometric', caseSensitive: true,
      params: [
        { key: 'N', names: ['N', 'M', 'population'], def: 50, min: 1, max: 100, step: 1, int: true, check: INTMIN('N', 1), cap: 20000 },
        { key: 'K', names: ['K', 'successes', 'D'], def: 15, min: 0, max: 50, step: 1, int: true, check: INTMIN('K', 0), cap: 20000 },
        { key: 'n', names: ['n', 'draws', 'sample'], def: 10, min: 0, max: 50, step: 1, int: true, check: INTMIN('n', 0), cap: 20000 },
      ],
      validate: (P) => (P.K > P.N ? 'K must not exceed N' : P.n > P.N ? 'n must not exceed N' : null),
      support: (P) => [Math.max(0, P.n - (P.N - P.K)), Math.min(P.n, P.K)],
      pdf: (k, P) => { const t = hgTable(P); return k < t.lo || k > t.hi || !Number.isInteger(k) ? 0 : t.pmf[k - t.lo]; },
      cdf: (x, P) => { const t = hgTable(P), k = Math.floor(x); return k < t.lo ? 0 : k >= t.hi ? 1 : t.left[k - t.lo]; },
      sf: (x, P) => { const t = hgTable(P), k = Math.floor(x); return k < t.lo ? 1 : k >= t.hi ? 0 : t.right[k - t.lo]; },
      mean: (P) => P.n * P.K / P.N,
      variance: (P) => (P.N > 1 ? P.n * (P.K / P.N) * (1 - P.K / P.N) * (P.N - P.n) / (P.N - 1) : 0),
      tex: (P) => '\\operatorname{Hypergeom}(N{=}' + fx(P.N) + ',\\ K{=}' + fx(P.K) + ',\\ n{=}' + fx(P.n) + ')',
      formula: '\\Prob(X=k)=\\dfrac{\\binom{K}{k}\\binom{N-K}{n-k}}{\\binom{N}{n}}',
    };
    D.discreteuniform = {
      discrete: true, name: 'Discrete uniform',
      params: [
        { key: 'a', names: ['a', 'min', 'lo'], def: 1, min: -10, max: 10, step: 1, int: true, check: (v) => (Number.isInteger(v) ? null : 'a must be a whole number'), cap: 1e6 },
        { key: 'b', names: ['b', 'max', 'hi'], def: 6, min: -10, max: 20, step: 1, int: true, check: (v) => (Number.isInteger(v) ? null : 'b must be a whole number'), cap: 1e6 },
      ],
      validate: (P) => (P.b < P.a ? 'need a ≤ b' : null),
      support: (P) => [P.a, P.b],
      pdf: (k, P) => (k >= P.a && k <= P.b && Number.isInteger(k) ? 1 / (P.b - P.a + 1) : 0),
      cdf: (x, P) => { const k = Math.floor(x); return k < P.a ? 0 : k >= P.b ? 1 : (k - P.a + 1) / (P.b - P.a + 1); },
      sf: (x, P) => { const k = Math.floor(x); return k < P.a ? 1 : k >= P.b ? 0 : (P.b - k) / (P.b - P.a + 1); },
      mean: (P) => (P.a + P.b) / 2,
      variance: (P) => ((P.b - P.a + 1) * (P.b - P.a + 1) - 1) / 12,
      tex: (P) => '\\operatorname{U}\\{' + fx(P.a) + ',\\dots,' + fx(P.b) + '\\}',
      formula: '\\Prob(X=k)=\\dfrac{1}{b-a+1}',
    };
    D.normal = {
      name: 'Normal',
      params: [
        { key: 'mu', tex: '\\mu', names: ['mu', 'm', 'mean', 'μ'], def: 0, min: -5, max: 5, step: 0.1 },
        { key: 'sigma', tex: '\\sigma', names: ['sigma', 's', 'sd', 'σ'], def: 1, min: 0.1, max: 5, step: 0.05, check: POS('σ'),
          alt: [{ names: ['var', 'variance', 'sigma2', 'sigma^2', 's2'], to: (v) => Math.sqrt(v) }] },
      ],
      support: () => [-Infinity, Infinity],
      pdf: (x, P) => dnorm((x - P.mu) / P.sigma) / P.sigma,
      cdf: (x, P) => pnorm((x - P.mu) / P.sigma),
      sf: (x, P) => pnormUpper((x - P.mu) / P.sigma),
      quantile: (p, P) => P.mu + P.sigma * qnorm(p),
      mean: (P) => P.mu,
      variance: (P) => P.sigma * P.sigma,
      mode: (P) => P.mu,
      tex: (P) => '\\Normal(' + fx(P.mu) + ',\\ ' + fx(P.sigma) + '^2)',
      formula: 'f(x)=\\dfrac{1}{\\sigma\\sqrt{2\\pi}}e^{-(x-\\mu)^2/2\\sigma^2}',
    };
    D.exponential = {
      name: 'Exponential',
      params: [{ key: 'lambda', tex: '\\lambda', names: ['lambda', 'lam', 'l', 'rate', 'λ'], def: 1, min: 0.05, max: 5, step: 0.05, check: POS('λ'),
        alt: [{ names: ['scale', 'theta', 'mean', 'mu', 'θ'], to: (v) => 1 / v }] }],
      support: () => [0, Infinity],
      pdf: (x, P) => (x < 0 ? 0 : P.lambda * Math.exp(-P.lambda * x)),
      cdf: (x, P) => (x <= 0 ? 0 : -Math.expm1(-P.lambda * x)),
      sf: (x, P) => (x <= 0 ? 1 : Math.exp(-P.lambda * x)),
      quantile: (p, P) => -Math.log1p(-p) / P.lambda,
      mean: (P) => 1 / P.lambda,
      variance: (P) => 1 / (P.lambda * P.lambda),
      mode: () => 0,
      tex: (P) => '\\operatorname{Exp}(' + fx(P.lambda) + ')',
      formula: 'f(x)=\\lambda e^{-\\lambda x},\\ x\\ge 0',
    };
    D.uniform = {
      name: 'Uniform',
      params: [
        { key: 'a', names: ['a', 'min', 'lo'], def: 0, min: -5, max: 5, step: 0.1 },
        { key: 'b', names: ['b', 'max', 'hi'], def: 1, min: -5, max: 10, step: 0.1 },
      ],
      validate: (P) => (P.b <= P.a ? 'need a < b' : null),
      support: (P) => [P.a, P.b],
      pdf: (x, P) => (x >= P.a && x <= P.b ? 1 / (P.b - P.a) : 0),
      cdf: (x, P) => (x <= P.a ? 0 : x >= P.b ? 1 : (x - P.a) / (P.b - P.a)),
      sf: (x, P) => (x <= P.a ? 1 : x >= P.b ? 0 : (P.b - x) / (P.b - P.a)),
      quantile: (p, P) => P.a + p * (P.b - P.a),
      mean: (P) => (P.a + P.b) / 2,
      variance: (P) => (P.b - P.a) * (P.b - P.a) / 12,
      tex: (P) => '\\operatorname{U}(' + fx(P.a) + ',\\ ' + fx(P.b) + ')',
      formula: 'f(x)=\\dfrac{1}{b-a},\\ a\\le x\\le b',
    };
    D.gamma = {
      name: 'Gamma',
      params: [
        { key: 'k', tex: '\\alpha', names: ['alpha', 'k', 'a', 'shape', 'α'], def: 2, min: 0.2, max: 20, step: 0.1, check: POS('shape') },
        { key: 'lambda', tex: '\\beta', names: ['beta', 'lambda', 'rate', 'b', 'β', 'λ'], def: 1, min: 0.1, max: 5, step: 0.05, check: POS('rate'),
          alt: [{ names: ['theta', 'scale', 'θ'], to: (v) => 1 / v, scale: true }] },
      ],
      support: () => [0, Infinity],
      pdf: (x, P) => {
        if (x < 0) return 0;
        if (x === 0) return P.k < 1 ? Infinity : P.k === 1 ? P.lambda : 0;
        return Math.exp(P.k * Math.log(P.lambda) + (P.k - 1) * Math.log(x) - P.lambda * x - lgamma(P.k));
      },
      cdf: (x, P) => gammaInc(P.k, P.lambda * Math.max(0, x), false),
      sf: (x, P) => gammaInc(P.k, P.lambda * Math.max(0, x), true),
      mean: (P) => P.k / P.lambda,
      variance: (P) => P.k / (P.lambda * P.lambda),
      mode: (P) => (P.k >= 1 ? (P.k - 1) / P.lambda : NaN),
      unbounded: (P) => P.k < 1,
      tex: (P) => (P._scale ? '\\operatorname{Gamma}(k{=}' + fx(P.k) + ',\\ \\theta{=}' + fx(1 / P.lambda) + ')' : '\\operatorname{Gamma}(\\alpha{=}' + fx(P.k) + ',\\ \\beta{=}' + fx(P.lambda) + ')'),
      formula: 'f(x)=\\dfrac{\\beta^{\\alpha}}{\\Gamma(\\alpha)}x^{\\alpha-1}e^{-\\beta x}\\ \\ (\\text{rate } \\beta)',
      formulaScale: 'f(x)=\\dfrac{x^{k-1}e^{-x/\\theta}}{\\Gamma(k)\\,\\theta^{k}}\\ \\ (\\text{scale } \\theta)',
    };
    D.beta = {
      name: 'Beta',
      params: [
        { key: 'a', tex: '\\alpha', names: ['alpha', 'a', 'α'], def: 2, min: 0.2, max: 20, step: 0.1, check: POS('α') },
        { key: 'b', tex: '\\beta', names: ['beta', 'b', 'β'], def: 5, min: 0.2, max: 20, step: 0.1, check: POS('β') },
      ],
      support: () => [0, 1],
      pdf: (x, P) => {
        if (x < 0 || x > 1) return 0;
        if (x === 0) return P.a < 1 ? Infinity : P.a === 1 ? P.b : 0;
        if (x === 1) return P.b < 1 ? Infinity : P.b === 1 ? P.a : 0;
        return Math.exp((P.a - 1) * Math.log(x) + (P.b - 1) * Math.log1p(-x) - lbeta(P.a, P.b));
      },
      cdf: (x, P) => betaInc(Math.min(1, Math.max(0, x)), P.a, P.b, false),
      sf: (x, P) => betaInc(Math.min(1, Math.max(0, x)), P.a, P.b, true),
      mean: (P) => P.a / (P.a + P.b),
      variance: (P) => P.a * P.b / ((P.a + P.b) * (P.a + P.b) * (P.a + P.b + 1)),
      mode: (P) => (P.a > 1 && P.b > 1 ? (P.a - 1) / (P.a + P.b - 2) : NaN),
      unbounded: (P) => P.a < 1 || P.b < 1,
      tex: (P) => '\\operatorname{Beta}(' + fx(P.a) + ',\\ ' + fx(P.b) + ')',
      formula: 'f(x)=\\dfrac{x^{\\alpha-1}(1-x)^{\\beta-1}}{B(\\alpha,\\beta)}',
    };
    D.t = {
      name: "Student's t",
      params: [{ key: 'nu', tex: 'k', names: ['nu', 'df', 'n', 'k', 'v', 'ν'], def: 5, min: 1, max: 60, step: 1, check: POS('k') }], // shown as k, as in the statistics course
      support: () => [-Infinity, Infinity],
      pdf: (x, P) => dt(x, P.nu),
      cdf: (x, P) => pt(x, P.nu),
      sf: (x, P) => pt(x, P.nu, true),
      quantile: (p, P) => qt(p, P.nu),
      mean: (P) => (P.nu > 1 ? 0 : NaN),
      variance: (P) => (P.nu > 2 ? P.nu / (P.nu - 2) : P.nu > 1 ? Infinity : NaN),
      mode: () => 0,
      tex: (P) => 't_{' + fx(P.nu) + '}',
      formula: 'f(x)=\\dfrac{\\Gamma(\\frac{k+1}{2})}{\\sqrt{k\\pi}\\,\\Gamma(\\frac{k}{2})}\\Big(1+\\dfrac{x^2}{k}\\Big)^{-\\frac{k+1}{2}}',
      normalRef: true,
    };
    D.chisq = {
      name: 'Chi-squared',
      params: [{ key: 'k', names: ['k', 'df', 'nu', 'n', 'ν'], def: 3, min: 1, max: 60, step: 1, check: POS('k') }],
      support: () => [0, Infinity],
      pdf: (x, P) => {
        if (x < 0) return 0;
        if (x === 0) return P.k < 2 ? Infinity : P.k === 2 ? 0.5 : 0;
        return Math.exp((P.k / 2 - 1) * Math.log(x) - x / 2 - (P.k / 2) * Math.LN2 - lgamma(P.k / 2));
      },
      cdf: (x, P) => gammaInc(P.k / 2, Math.max(0, x) / 2, false),
      sf: (x, P) => gammaInc(P.k / 2, Math.max(0, x) / 2, true),
      mean: (P) => P.k,
      variance: (P) => 2 * P.k,
      mode: (P) => Math.max(0, P.k - 2),
      unbounded: (P) => P.k < 2,
      tex: (P) => '\\chi^2_{' + fx(P.k) + '}',
      formula: 'f(x)=\\dfrac{x^{k/2-1}e^{-x/2}}{2^{k/2}\\,\\Gamma(k/2)}',
    };
    D.lognormal = {
      name: 'Log-normal',
      params: [
        { key: 'mu', tex: '\\mu', names: ['mu', 'm', 'μ'], def: 0, min: -2, max: 2, step: 0.05 },
        { key: 'sigma', tex: '\\sigma', names: ['sigma', 's', 'σ'], def: 0.5, min: 0.05, max: 2, step: 0.05, check: POS('σ') },
      ],
      support: () => [0, Infinity],
      pdf: (x, P) => (x <= 0 ? 0 : dnorm((Math.log(x) - P.mu) / P.sigma) / (x * P.sigma)),
      cdf: (x, P) => (x <= 0 ? 0 : pnorm((Math.log(x) - P.mu) / P.sigma)),
      sf: (x, P) => (x <= 0 ? 1 : pnormUpper((Math.log(x) - P.mu) / P.sigma)),
      quantile: (p, P) => Math.exp(P.mu + P.sigma * qnorm(p)),
      mean: (P) => Math.exp(P.mu + P.sigma * P.sigma / 2),
      variance: (P) => Math.expm1(P.sigma * P.sigma) * Math.exp(2 * P.mu + P.sigma * P.sigma),
      mode: (P) => Math.exp(P.mu - P.sigma * P.sigma),
      tex: (P) => '\\operatorname{LogNormal}(' + fx(P.mu) + ',\\ ' + fx(P.sigma) + '^2)',
      formula: 'f(x)=\\dfrac{1}{x\\sigma\\sqrt{2\\pi}}e^{-(\\ln x-\\mu)^2/2\\sigma^2}',
    };
    D.cauchy = {
      name: 'Cauchy',
      params: [
        { key: 'x0', tex: 'x_0', names: ['x0', 'x_0', 'loc', 'location', 'mu', 'm', 'median'], def: 0, min: -5, max: 5, step: 0.1 },
        { key: 'gamma', tex: '\\gamma', names: ['gamma', 'scale', 's', 'g', 'γ'], def: 1, min: 0.1, max: 5, step: 0.05, check: POS('γ') },
      ],
      support: () => [-Infinity, Infinity],
      pdf: (x, P) => { const z = (x - P.x0) / P.gamma; return 1 / (Math.PI * P.gamma * (1 + z * z)); },
      cdf: (x, P) => Math.atan2(1, -(x - P.x0) / P.gamma) / Math.PI,
      sf: (x, P) => Math.atan2(1, (x - P.x0) / P.gamma) / Math.PI,
      quantile: (p, P) => (p === 0 ? -Infinity : p === 1 ? Infinity : p === 0.5 ? P.x0 : P.x0 + P.gamma * (p < 0.5 ? -1 / Math.tan(Math.PI * p) : 1 / Math.tan(Math.PI * (1 - p)))),
      mean: () => NaN,
      variance: () => NaN,
      mode: (P) => P.x0,
      median: (P) => P.x0,
      tex: (P) => '\\operatorname{Cauchy}(' + fx(P.x0) + ',\\ ' + fx(P.gamma) + ')',
      formula: 'f(x)=\\dfrac{1}{\\pi\\gamma\\,[1+((x-x_0)/\\gamma)^2]}',
    };
    D.f = {
      name: 'F',
      params: [
        { key: 'd1', tex: 'd_1', names: ['d1', 'df1', 'm', 'n1', 'nu1', 'd_1'], def: 5, min: 1, max: 60, step: 1, check: POS('d₁') },
        { key: 'd2', tex: 'd_2', names: ['d2', 'df2', 'n', 'n2', 'nu2', 'd_2'], def: 10, min: 1, max: 60, step: 1, check: POS('d₂') },
      ],
      support: () => [0, Infinity],
      pdf: (x, P) => {
        if (x < 0) return 0;
        if (x === 0) return P.d1 < 2 ? Infinity : P.d1 === 2 ? 1 : 0;
        const { d1, d2 } = P;
        return Math.exp(0.5 * (d1 * Math.log(d1 * x) + d2 * Math.log(d2) - (d1 + d2) * Math.log(d1 * x + d2)) - Math.log(x) - lbeta(d1 / 2, d2 / 2));
      },
      cdf: (x, P) => (x <= 0 ? 0 : betaInc(P.d1 * x / (P.d1 * x + P.d2), P.d1 / 2, P.d2 / 2, false, P.d2 / (P.d1 * x + P.d2))),
      sf: (x, P) => (x <= 0 ? 1 : betaInc(P.d1 * x / (P.d1 * x + P.d2), P.d1 / 2, P.d2 / 2, true, P.d2 / (P.d1 * x + P.d2))),
      mean: (P) => (P.d2 > 2 ? P.d2 / (P.d2 - 2) : NaN),
      variance: (P) => (P.d2 > 4 ? 2 * P.d2 * P.d2 * (P.d1 + P.d2 - 2) / (P.d1 * (P.d2 - 2) * (P.d2 - 2) * (P.d2 - 4)) : P.d2 > 2 ? Infinity : NaN),
      mode: (P) => (P.d1 > 2 ? (P.d1 - 2) / P.d1 * P.d2 / (P.d2 + 2) : 0),
      unbounded: (P) => P.d1 < 2,
      tex: (P) => 'F_{' + fx(P.d1) + ',\\,' + fx(P.d2) + '}',
      formula: 'f(x)=\\dfrac{\\sqrt{\\frac{(d_1x)^{d_1}d_2^{d_2}}{(d_1x+d_2)^{d_1+d_2}}}}{x\\,B(\\frac{d_1}{2},\\frac{d_2}{2})}',
    };

    /** Quantile of a distribution object (closed form where available, else bisection). */
    function quantile(dist, p, P) {
      if (dist.quantile) return dist.quantile(p, P);
      const [lo, hi] = dist.support(P);
      const m = dist.mean(P), v = dist.variance(P);
      const guess = Number.isFinite(m) ? m : 0;
      const sc = Number.isFinite(v) && v > 0 ? Math.sqrt(v) : 1;
      if (dist.discrete) return discreteQuantile((k) => dist.cdf(k, P), p, lo, hi, guess);
      return bisectQuantile((x) => dist.cdf(x, P), (x) => dist.sf(x, P), p, lo, hi, guess, sc);
    }
    /** P(a ≤ X ≤ b) using whichever tail keeps precision (a may be −∞, b may be ∞). */
    function interval(dist, a, b, P) {
      if (!(b >= a)) return 0;
      let lo, hi;
      if (dist.discrete) { lo = Math.ceil(a - 1e-9) - 1; hi = Math.floor(b + 1e-9); if (hi <= lo) return 0; } else { lo = a; hi = b; }
      const Fh = hi === Infinity ? 1 : dist.cdf(hi, P), Fl = lo === -Infinity ? 0 : dist.cdf(lo, P);
      if (Fl > 0.5) {
        const Sl = lo === -Infinity ? 1 : dist.sf(lo, P), Sh = hi === Infinity ? 0 : dist.sf(hi, P);
        return Math.max(0, Sl - Sh);
      }
      return Math.max(0, Fh - Fl);
    }

    return { lgamma, lbeta, lchoose, gammaInc, betaInc, pnorm, pnormUpper, dnorm, qnorm, pt, dt, pnt, dnt,
      bisectQuantile, discreteQuantile, quantile, interval, D,
      qt,
      qchisq: (p, k) => quantile(D.chisq, p, { k }),
      qbeta: (p, a, b) => quantile(D.beta, p, { a, b }) };
  })();

  if (typeof window === 'undefined') {
    if (typeof module === 'object' && module.exports) module.exports = PR;
    return;
  }

  // ================================================================== shared figure helpers
  const MA = window.MA;
  MA.prob = PR;
  const el = MA.el;
  const C = MA.cfg;
  const T = MA.t;
  const D = PR.D;
  const SVGNS = 'http://www.w3.org/2000/svg';
  const PALETTE = ['var(--series-1)', 'var(--series-2)', 'var(--series-3)', 'var(--series-4)', 'var(--a-discrete)', 'var(--a-applied)', 'var(--ink-3)', 'var(--accent)'];

  (function injectStyle() {
    if (document.getElementById('w-pr-style')) return;
    const css = [
      '.w-pr-row{display:flex;flex-wrap:wrap;align-items:flex-start}',
      '.w-pr-row>.w-pr-panel{flex:1 1 300px;min-width:0}',
      '.w-pr-cap{padding:10px 16px 0;font-size:.8rem;font-weight:600;letter-spacing:.02em;color:var(--ink-3)}',
      '.w-pr-off{display:none!important}',
      '.w-legend .w-pr-dash{background:repeating-linear-gradient(90deg,var(--c) 0 5px,transparent 5px 8px);height:2.5px}',
      '.w-legend .w-pr-dot{width:9px;height:9px;border-radius:50%;background:var(--c)}',
      '.w-legend .w-pr-ring{width:9px;height:9px;border-radius:50%;border:2px solid var(--c);box-sizing:border-box}',
      '.w-legend .w-pr-hatch{width:11px;height:11px;border-radius:2px;border:1px solid var(--c);background:repeating-linear-gradient(135deg,var(--c) 0 1.5px,transparent 1.5px 4px)}',
      '.w-pr-chip{display:inline-block;width:9px;height:9px;border-radius:50%;background:var(--c);margin-right:5px;vertical-align:baseline}',
      '.w-pr-note{color:var(--ink-3);font-size:.8125rem}',
      '.w-pr-good{color:var(--good);font-weight:600}',
      '.w-pr-bad{color:var(--bad);font-weight:600}',
      '.w-pr-walk{font-family:var(--mono);font-size:.78rem;color:var(--ink-2);word-break:break-word}',
      '.w-pr-walk b{color:var(--accent)}',
      '.w-pr-canvas{position:absolute;left:0;top:0;width:100%;height:100%;display:block}',
      '.w-pr-layered{background:var(--plot-bg)}',
      '.w-pr-layered svg{position:relative}',
      '.w-info.w-pr-formula{padding-top:6px;padding-bottom:8px;border-top:0}',
      '.w-pr-mc .w-readout{max-width:60%}',
      // plot.js styles every svg inside .w-plot (height:auto), which also hits KaTeX's own SVGs (radicals)
      '.w-plot .katex svg{height:inherit}',
    ].join('\n');
    document.head.append(el('style', { id: 'w-pr-style', text: css }));
  })();

  // ---- numbers ---------------------------------------------------------------------
  const SUP = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
  const sup = (k) => String(k).split('').map((c) => SUP[c] || c).join('');
  /** mantissa/exponent split with the mantissa rounded to `sig` digits (handles 9.99 → 10). */
  function sci(v, sig) {
    let e = Math.floor(Math.log10(Math.abs(v)));
    let m = +(v / Math.pow(10, e)).toPrecision(sig);
    if (Math.abs(m) >= 10) { m /= 10; e += 1; }
    return { m: String(+m.toPrecision(sig)), e };
  }
  /** Display a number; very small/large values as 1.23 × 10⁻⁵ (real minus signs). */
  function fmt(v, sig = 4) {
    if (!Number.isFinite(v)) return MA.fmt(v);
    const a = Math.abs(v);
    if (a !== 0 && (a < 1e-4 || a >= 1e7)) { const s = sci(v, sig); return (s.m + ' × 10' + sup(s.e)).replace(/^-/, '−'); }
    return MA.fmt(v, sig);
  }
  /** The same number for TeX. */
  function tn(v, sig = 4) {
    if (Number.isNaN(v)) return '\\text{–}';
    if (!Number.isFinite(v)) return v > 0 ? '\\infty' : '-\\infty';
    const a = Math.abs(v);
    if (a !== 0 && (a < 1e-4 || a >= 1e7)) { const s = sci(v, sig); return s.m + '\\times 10^{' + s.e + '}'; }
    return String(+v.toPrecision(sig));
  }
  /** Exact-looking fraction for a probability (small denominators), else null. */
  function frac(v, maxDen = 40) {
    if (!Number.isFinite(v) || v < 0) return null;
    for (let d = 1; d <= maxDen; d++) {
      const n = Math.round(v * d);
      if (Math.abs(v - n / d) < 1e-9) return d === 1 ? String(n) : '\\tfrac{' + n + '}{' + d + '}';
    }
    return null;
  }
  const clamp = (x, a, b) => Math.min(b, Math.max(a, x));
  const fixed = (v, d) => (Number.isFinite(v) ? v.toFixed(d).replace(/^-/, '−') : MA.fmt(v));

  /** Wrap an event handler so that an exception is reported instead of escaping. */
  function guard(fn, report) {
    return function (...args) {
      try { return fn.apply(this, args); } catch (e) {
        if (window.console) console.error('[prob]', e);
        if (report) { try { report(e); } catch (e2) { /* ignore */ } }
        return undefined;
      }
    };
  }

  // ---- layout ----------------------------------------------------------------------
  /** viewBox size for a plot in `host`: the nominal size, or a narrower/taller one on small screens. */
  function dims(host, W, H) {
    const cw = host && host.clientWidth ? host.clientWidth : W;
    if (cw >= W * 0.9) return { width: W, height: H };
    const w = Math.max(340, Math.round(cw * 1.08));
    if (w >= W) return { width: W, height: H };
    return { width: w, height: Math.round(H * Math.max(0.74, Math.pow(w / W, 0.55))) };
  }
  function mkPlot(host, W, H, o) {
    const d = dims(host, W, H);
    return new MA.Plot(host, Object.assign({ width: d.width, height: d.height }, o));
  }
  /** A row of panels that wrap on narrow screens. */
  function row(stage) { const r = el('div', { class: 'w-pr-row' }); stage.append(r); return r; }
  function panel(rowEl, caption) {
    const p = el('div', { class: 'w-pr-panel' });
    if (caption) p.append(el('div', { class: 'w-pr-cap', text: caption }));
    rowEl.append(p);
    return p;
  }
  /** Legend into an existing box; items {label, color, kind: line|dash|swatch|dot|ring|hatch}. */
  function legend(box, items) {
    box.replaceChildren();
    items.filter(Boolean).forEach((it) => {
      const cls = { line: 'ln', dash: 'ln w-pr-dash', swatch: 'sw', dot: 'w-pr-dot', ring: 'w-pr-ring', hatch: 'w-pr-hatch' }[it.kind || 'line'];
      const k = el('span', { class: 'k' }, el('span', { class: cls, style: '--c:' + it.color + (it.opacity ? ';opacity:' + it.opacity : '') }));
      k.append(/[\\^_{}]/.test(it.label) ? MA.texEl(it.label) : el('span', { text: it.label }));
      box.append(k);
    });
    return box;
  }
  function legendBox(stage) { const b = el('div', { class: 'w-legend' }); stage.append(b); return b; }
  /** Hide or show a control created by MA.ui. */
  const show = (ctl, on) => { const n = ctl && (ctl.el || ctl); if (n && n.classList) n.classList.toggle('w-pr-off', !on); };

  /** Slider on a logarithmic scale; values are rounded to `sig` significant digits (or integers). */
  function logSlider(bar, o) {
    const L = Math.log10;
    const round = (v) => (o.int ? Math.round(+v.toPrecision(o.sig || 2)) : +v.toPrecision(o.sig || 2));
    const s = MA.ui.slider(bar, { label: o.label, tex: o.tex, min: L(o.min), max: L(o.max), step: o.step || 0.005, value: L(o.value),
      fmt: (t) => (o.fmt || fmt)(round(Math.pow(10, t))), onInput: (t) => o.onInput(round(Math.pow(10, t))) });
    return { el: s.el, input: s.input, get: () => round(Math.pow(10, s.get())), set: (v, fire) => s.set(L(v), fire) };
  }
  /** Play / pause button; returns {el, set(playing)}. */
  function playButton(bar, onClick) {
    const b = MA.ui.button(bar, { label: T('Play'), onClick });
    b.setAttribute('aria-pressed', 'false');
    return { el: b, set(on) { b.textContent = on ? T('Pause') : T('Play'); b.setAttribute('aria-pressed', String(!!on)); } };
  }
  /** Stop an animation while its figure is off screen; resume if it should still be running. */
  function pauseOffscreen(node, anim, wanted) {
    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver((ents) => ents.forEach((en) => {
      if (!en.isIntersecting) anim.stop(); else if (wanted()) anim.play();
    }));
    io.observe(node);
  }
  /** Seeds for "New sample" buttons. */
  let seedCounter = 0;
  const firstSeed = (k) => 20261001 + 7919 * k;
  const nextSeed = () => (Math.floor(Math.random() * 2147483647) ^ (++seedCounter * 2654435761)) >>> 0;

  // ---- custom frames (log axes, category axes) ----------------------------------------
  /** Tick label like plot.js. */
  const tickLabel = (v, step) => (Math.abs(v) < 1e-12 ? '0' : MA.fmt(+v.toFixed(Math.max(0, -Math.floor(Math.log10(step)) + 1)), 6));
  const pow10Label = (k) => { k = Math.round(k); return k >= -2 && k <= 4 ? MA.fmt(Math.pow(10, k), 6) : '10' + sup(k); };
  /**
   * Grid, axes and tick labels drawn by hand (plot made with grid/axes/ticks off). o.x / o.y:
   * 'lin' | 'log' (data are log10 values) | 'none'; o.xfmt / o.yfmt optional label formatters.
   */
  function frame(P, o = {}) {
    const g = P.layers.grid, ax = P.layers.axes;
    g.replaceChildren(); ax.replaceChildren();
    const L = P.pl, R = P.W - P.pr, Tp = P.pt, B = P.H - P.pb;
    const grid = el('g', { class: 'grid' }), minor = el('g', { class: 'grid', style: 'opacity:.45' });
    const tk = el('g', { class: 'tick' });
    const ticks = (lo, hi, kind, n) => {
      if (kind === 'none') return [];
      if (kind === 'lin') { const t = MA.ticks(lo, hi, n); return t.values.map((v) => ({ v, major: true, label: tickLabel(v, t.step) })); }
      const out = [];
      const span = hi - lo;
      const every = span > 8 ? 2 : 1;
      for (let k = Math.floor(lo); k <= Math.ceil(hi); k++) {
        if (k >= lo - 1e-9 && k <= hi + 1e-9) out.push({ v: k, major: true, label: k % every === 0 ? pow10Label(k) : '' });
        if (span <= 7) for (let m = 2; m <= 9; m++) { const v = k + Math.log10(m); if (v > lo && v < hi) out.push({ v, major: false, label: '' }); }
      }
      return out;
    };
    const xt = ticks(P.x0, P.x1, o.x || 'lin', Math.max(4, Math.round(P.W / 90)));
    const yt = ticks(P.y0, P.y1, o.y || 'lin', Math.max(3, Math.round(P.H / 60)));
    xt.forEach((t) => {
      const X = P.X(t.v);
      if (X < L - 0.5 || X > R + 0.5) return;
      (t.major ? grid : minor).append(el('line', { x1: X, x2: X, y1: Tp, y2: B }));
      const lab = o.xfmt ? o.xfmt(t.v) : t.label;
      if (lab && X > L + 2 && X < R - 2) tk.append(el('text', { x: X, y: B + 15, 'text-anchor': 'middle', text: lab }));
    });
    yt.forEach((t) => {
      const Y = P.Y(t.v);
      if (Y < Tp - 0.5 || Y > B + 0.5 || (o.yMax !== undefined && t.v > o.yMax + 1e-9)) return;
      (t.major ? grid : minor).append(el('line', { x1: L, x2: R, y1: Y, y2: Y }));
      const lab = o.yfmt ? o.yfmt(t.v) : t.label;
      if (lab && Y > Tp + 3 && !(Math.abs(t.v) < 1e-12 && Math.abs(Y - B) < 1)) tk.append(el('text', { x: L - 6, y: Y + 4, 'text-anchor': 'end', text: lab }));
    });
    g.append(minor, grid);
    const axg = el('g', { class: 'axis' });
    axg.append(el('line', { x1: L, x2: R, y1: B, y2: B }), el('line', { x1: L, x2: L, y1: Tp, y2: B }));
    ax.append(axg, tk);
    if (o.xLabel) ax.append(el('text', { class: 'lbl', x: R - 4, y: B - 8, 'text-anchor': 'end', style: 'fill:var(--ink-2)', text: o.xLabel }));
    if (o.yLabel) ax.append(el('text', { class: 'lbl', x: L + 8, y: Tp + 14, style: 'fill:var(--ink-2)', text: o.yLabel }));
  }
  /** Raw SVG element into a plot layer (pixel coordinates). */
  function svg(P, layer, tag, attrs) { const e = el(tag, attrs); P.layers[layer].append(e); return e; }
  /** One <path> made of many rectangles [x0, y0, x1, y1] in data units (fast for hundreds of bars). */
  function bars(P, rects, o = {}) {
    let d = '';
    for (const r of rects) {
      const X0 = P.X(r[0]), X1 = P.X(r[2]), Y0 = P.Y(r[1]), Y1 = P.Y(r[3]);
      if (!Number.isFinite(X0 + X1 + Y0 + Y1)) continue;
      const ya = Math.max(-1e4, Math.min(Y0, Y1)), yb = Math.min(1e4, Math.max(Y0, Y1));
      d += 'M' + X0.toFixed(2) + ',' + yb.toFixed(2) + 'V' + ya.toFixed(2) + 'H' + X1.toFixed(2) + 'V' + yb.toFixed(2) + 'Z';
    }
    if (!d) return null;
    return svg(P, o.layer || 'fill', 'path', { d, style: 'fill:' + (o.color || 'var(--series-1)') + ';fill-opacity:' + (o.fillOpacity ?? 0.6) +
      ';stroke:' + (o.stroke || 'none') + ';stroke-width:' + (o.strokeWidth || 1) + (o.strokeOpacity !== undefined ? ';stroke-opacity:' + o.strokeOpacity : '') });
  }
  /** Diagonal hatch pattern (id) for a plot, in a given colour. */
  function hatch(P, color, id) {
    const pid = P.uid + '-' + id;
    if (!P.defs.querySelector('#' + pid)) {
      const pat = el('pattern', { id: pid, patternUnits: 'userSpaceOnUse', width: 6, height: 6, patternTransform: 'rotate(45)' });
      pat.append(el('line', { x1: 0, y1: 0, x2: 0, y2: 6, style: 'stroke:' + color + ';stroke-width:2;stroke-opacity:.55' }));
      P.defs.append(pat);
    }
    return 'url(#' + pid + ')';
  }
  /** Keep the current range unless the target does not fit or is much smaller (avoids jumpy rescaling). */
  function sticky(cur, target, shrink = 0.45) {
    if (!cur || !Number.isFinite(target[0]) || !Number.isFinite(target[1])) return target.slice();
    const w = cur[1] - cur[0], tw = target[1] - target[0];
    if (target[0] < cur[0] - 1e-9 * w || target[1] > cur[1] + 1e-9 * w || tw < shrink * w) return target.slice();
    return cur;
  }
  /** Data → canvas helper: a <canvas> under a transparent MA.Plot SVG, redrawn on resize and theme change. */
  function canvasUnder(P, draw) {
    const cv = el('canvas', { class: 'w-pr-canvas', 'aria-hidden': 'true' });
    P.wrap.classList.add('w-pr-layered');
    P.svg.style.background = 'transparent';
    P.wrap.insertBefore(cv, P.svg);
    const ctx = cv.getContext('2d');
    const api = {
      cv, ctx, scale: 1,
      resize() {
        const r = P.svg.getBoundingClientRect();
        const dpr = Math.min(3, window.devicePixelRatio || 1);
        const w = Math.max(1, Math.round(r.width * dpr)), h = Math.max(1, Math.round(r.height * dpr));
        if (cv.width !== w || cv.height !== h) { cv.width = w; cv.height = h; }
        api.scale = w / P.W;
        return api.scale;
      },
      redraw() { api.resize(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, cv.width, cv.height); draw(ctx, api.scale, true); },
    };
    if ('ResizeObserver' in window) new ResizeObserver(() => api.redraw()).observe(P.svg);
    window.addEventListener('ma:theme', () => api.redraw());
    return api;
  }
  const cssColor = (v) => (MA.cssVar(v.replace(/^var\((--[\w-]+)\)$/, '$1')) || '#888');
  /** f tabulated on [a, b] (n intervals) and linearly interpolated: cheap re-evaluation of costly densities. */
  function tabulate(f, a, b, n) {
    const ys = new Float64Array(n + 1), h = (b - a) / n;
    for (let i = 0; i <= n; i++) { const v = f(a + i * h); ys[i] = Number.isFinite(v) ? v : 0; }
    return (x) => {
      if (!(x >= a && x <= b)) return f(x);
      const u = (x - a) / h, i = Math.min(n - 1, Math.floor(u)), t = u - i;
      return ys[i] * (1 - t) + ys[i + 1] * t;
    };
  }
  /** TeX labels that keep clear of each other: a label overlapping an earlier one is moved down (o.up: up). */
  function labeler(P) {
    const boxes = [];
    const est = (tex, size) => {
      const vis = String(tex).replace(/\\(text|mathrm|operatorname)\{([^}]*)\}/g, '$2').replace(/\\[a-zA-Z]+/g, 'x').replace(/[{}_^\\ ]/g, '');
      return Math.max(12, vis.length * size * 0.55);
    };
    return (x, y, tex, o = {}) => {
      const size = o.size || 14, w = est(tex, size) + 6, h = size + 8;
      const X = P.X(x) + (o.dx || 0), Y0 = P.Y(y) + (o.dy || 0);
      const left = o.anchor === 'middle' ? X - w / 2 : o.anchor === 'end' ? X - w : X;
      const top = P.pt + h / 2, bot = P.H - P.pb - h / 2;
      const hit = (Y) => boxes.some((b) => left < b.x + b.w && left + w > b.x && Y - h / 2 < b.y + b.h / 2 && Y + h / 2 > b.y - b.h / 2);
      let Y = Y0;
      if (hit(Y)) {
        // try offsets in the preferred direction first, then the other way, staying inside the plot
        const dir = o.up ? -1 : 1;
        for (let k = 1; k <= 8; k++) {
          const a = Y0 + dir * k * h * 0.75, b = Y0 - dir * k * h * 0.75;
          if (a >= top && a <= bot && !hit(a)) { Y = a; break; }
          if (b >= top && b <= bot && !hit(b)) { Y = b; break; }
        }
      }
      boxes.push({ x: left, w, y: Y, h });
      return P.tex(x, y, tex, Object.assign({}, o, { dy: (o.dy || 0) + (Y - Y0) }));
    };
  }

  // ================================================================== distribution
  /** "n=10, p=0.3" → parameter object with defaults, aliases and validation. */
  function parseParams(dist, src) {
    const P = {};
    dist.params.forEach((s) => { P[s.key] = s.def; });
    const parts = String(src || '').split(/[,;]/).map((q) => q.trim()).filter(Boolean);
    const allNames = dist.params.filter((s) => !s.hidden).map((s) => s.names[0]).join(', ');
    for (const part of parts) {
      const m = /^([^=:]+?)\s*[=:]\s*(.+)$/.exec(part);
      if (!m) throw new Error('parameters must look like “n=10, p=0.3” — got “' + part + '”');
      const name = m[1].trim();
      const value = C.num(m[2]);
      const find = (cmp) => {
        for (const s of dist.params) {
          if (s.names.some((n) => cmp(n, name))) return { s, conv: null };
          for (const a of s.alt || []) if (a.names.some((n) => cmp(n, name))) return { s, conv: a };
        }
        return null;
      };
      const hit = find((a, b) => a === b) || (dist.caseSensitive ? null : find((a, b) => a.toLowerCase() === b.toLowerCase()));
      if (!hit) throw new Error('unknown parameter “' + name + '” (this distribution uses ' + allNames + ')');
      P[hit.s.key] = hit.conv ? hit.conv.to(value) : value;
      if (hit.conv && hit.conv.scale) P._scale = true;
    }
    for (const s of dist.params) {
      const v = P[s.key];
      if (!Number.isFinite(v)) throw new Error(s.names[0] + ' must be a finite number');
      const msg = s.check && s.check(v);
      if (msg) throw new Error(msg);
      if (s.cap && Math.abs(v) > s.cap) throw new Error(s.names[0] + ' is too large for this figure (at most ' + s.cap + ')');
    }
    const v = dist.validate && dist.validate(P);
    if (v) throw new Error(v);
    return P;
  }

  MA.widget('distribution', (stage, cfg) => {
    const key = C.str(cfg.dist, '').toLowerCase().replace(/[\s_-]/g, '');
    const alias = { bin: 'binomial', pois: 'poisson', geom: 'geometric', nbinom: 'negbinomial', negativebinomial: 'negbinomial', hypergeom: 'hypergeometric',
      gaussian: 'normal', norm: 'normal', exp: 'exponential', unif: 'uniform', student: 't', studentt: 't', chi2: 'chisq', chisquared: 'chisq',
      lognorm: 'lognormal', fisher: 'f', randint: 'discreteuniform' };
    const dist = D[key] || D[alias[key]];
    if (!dist) throw new Error('unknown distribution “' + (cfg.dist || '') + '” (use binomial, poisson, normal, …)');
    const P = parseParams(dist, cfg.params);
    const disc = !!dist.discrete;
    let mode = C.bool(cfg.cdf, false) ? 'cdf' : 'pdf';
    let showNormal = C.bool(cfg.normal, false);
    const hasA = C.has(cfg.a), hasB = C.has(cfg.b);
    let a = hasA ? C.num(cfg.a) : -Infinity, b = hasB ? C.num(cfg.b) : Infinity;
    if (a > b) [a, b] = [b, a];
    const mean = () => dist.mean(P), sd = () => Math.sqrt(dist.variance(P));
    if (!hasA && !hasB) {
      // default interval: μ ± σ, or the quartiles when the variance is infinite
      const m = mean(), s = sd();
      if (Number.isFinite(m) && Number.isFinite(s) && s > 0) { a = m - s; b = m + s; } else { a = PR.quantile(dist, 0.25, P); b = PR.quantile(dist, 0.75, P); }
      if (disc) { a = Math.ceil(a - 1e-9); b = Math.floor(b + 1e-9); if (b < a) b = a; } else { const st = MA.niceStep((b - a) / 20); a = Math.round(a / st) * st; b = Math.round(b / st) * st; }
    }
    if (disc) { if (Number.isFinite(a)) a = Math.ceil(a - 1e-9); if (Number.isFinite(b)) b = Math.floor(b + 1e-9); }

    MA.ui.title(stage, cfg.title);
    const leg = legendBox(stage);
    const Pl = mkPlot(stage, 640, 360, { x: [0, 1], y: [0, 1], grid: false, axes: false, label: T('Probability distribution') });
    const sliderBar = MA.ui.bar(stage);
    const bar = MA.ui.bar(stage);
    const info = MA.ui.info(stage);
    const finfo = MA.ui.info(stage);
    finfo.el.classList.add('w-pr-formula');
    const read = Pl.readout();
    let view = null, yview = null;

    const lowerOpen = () => !Number.isFinite(a) || a <= dist.support(P)[0];
    const upperOpen = () => !Number.isFinite(b) || b >= dist.support(P)[1];

    function targetView() {
      const [lo, hi] = dist.support(P);
      const q = (p) => PR.quantile(dist, p, P);
      let q0 = q(disc ? 0.0005 : 0.001), q1 = q(disc ? 0.9995 : 0.999);
      const q25 = q(0.25), q75 = q(0.75), iqr = Math.max(q75 - q25, disc ? 1 : 1e-9);
      q0 = Math.max(q0, q25 - 4.5 * iqr); q1 = Math.min(q1, q75 + 4.5 * iqr);
      if (dist === D.t) { q0 = Math.max(q0, -5.5); q1 = Math.min(q1, 5.5); q0 = Math.min(q0, -4); q1 = Math.max(q1, 4); }
      if (disc && Number.isFinite(lo) && Number.isFinite(hi) && hi - lo <= 40) { q0 = lo; q1 = hi; }
      const span = Math.max(q1 - q0, disc ? 4 : 1e-9);
      if (Number.isFinite(lo) && q0 - lo <= 0.25 * span) q0 = lo;
      if (Number.isFinite(hi) && hi - q1 <= 0.25 * span) q1 = hi;
      let t0, t1;
      if (disc) {
        const pad = Math.max(0.7, (q1 - q0) * 0.05);
        t0 = q0 - 0.5 - pad; t1 = q1 + 0.5 + pad;
        if (t1 - t0 < 7) { const c = (q0 + q1) / 2; t0 = c - 3.5; t1 = c + 3.5; }
      } else {
        const pad = 0.05 * (q1 - q0);
        t0 = q0 - (q0 === lo ? 0.6 : 1) * pad; t1 = q1 + (q1 === hi ? 0.6 : 1) * pad;
      }
      return [t0, t1];
    }
    // y-range: largest probability / density that should be visible (spikes of unbounded densities are clipped)
    function peak() {
      let m = 0;
      if (disc) {
        const k0 = Math.ceil(view[0]), k1 = Math.floor(view[1]);
        const st = Math.max(1, Math.floor((k1 - k0) / 3000));
        for (let k = k0; k <= k1; k += st) m = Math.max(m, dist.pdf(k, P));
      } else {
        let x0 = view[0], x1 = view[1];
        if (dist.unbounded && dist.unbounded(P)) {
          const q = (p) => PR.quantile(dist, p, P);
          if (D.beta === dist && P.a < 1) x0 = Math.max(x0, q(0.1));
          else if (D.beta !== dist) x0 = Math.max(x0, q(0.12));
          if (D.beta === dist && P.b < 1) x1 = Math.min(x1, q(0.9));
        }
        for (let i = 0; i <= 400; i++) { const v = dist.pdf(x0 + (x1 - x0) * i / 400, P); if (Number.isFinite(v)) m = Math.max(m, v); }
        const mo = dist.mode ? dist.mode(P) : NaN;
        if (Number.isFinite(mo) && mo >= x0 && mo <= x1) { const v = dist.pdf(mo, P); if (Number.isFinite(v)) m = Math.max(m, v); }
      }
      if (showNormal && mode === 'pdf') {
        const s = dist.normalRef ? 1 : sd();
        if (Number.isFinite(s) && s > 0) m = Math.max(m, 1 / (s * Math.sqrt(2 * Math.PI)));
      }
      return m > 0 ? m : 1;
    }
    function normalParams() {
      if (dist.normalRef) return { m: 0, s: 1 };
      const m = mean(), s = sd();
      return Number.isFinite(m) && Number.isFinite(s) && s > 0 ? { m, s } : null;
    }
    function probTeX() {
      const X = 'X';
      const lo = lowerOpen(), hi = upperOpen();
      const A = tn(a, 6), B = tn(b, 6);
      if (lo && hi) return '\\Prob(-\\infty < X < \\infty)';
      if (disc && Number.isFinite(a) && a === b) return '\\Prob(X = ' + A + ')';
      if (lo) return '\\Prob(' + X + ' \\le ' + B + ')';
      if (hi) return '\\Prob(' + X + ' \\ge ' + A + ')';
      return '\\Prob(' + A + ' \\le ' + X + ' \\le ' + B + ')';
    }

    function draw() {
      const target = targetView();
      view = sticky(view, target);
      const pk = mode === 'cdf' ? 1 : peak();
      const ytarget = mode === 'cdf' ? [0, 1.24] : [0, pk * 1.24];
      if (mode === 'cdf') yview = ytarget;
      else if (!yview || yview[1] > 2 || pk > yview[1] / 1.12 || pk < yview[1] * 0.42) yview = ytarget;
      Pl.setView(view, yview);
      frame(Pl, { xLabel: disc ? 'k' : 'x', yMax: mode === 'cdf' ? 1 : undefined });
      Pl.clear();
      const [lo, hi] = dist.support(P);
      const inA = (x) => x >= a - 1e-9 && x <= b + 1e-9;
      const npar = normalParams();
      const prob = PR.interval(dist, a, b, P);
      const top = mode === 'cdf' ? 1 : pk;
      if (mode === 'pdf') {
        if (disc) {
          const k0 = Math.max(lo, Math.ceil(view[0])), k1 = Math.min(hi, Math.floor(view[1]));
          const nb = k1 - k0 + 1;
          const w = nb > 80 ? 0.5 : 0.39;
          const ins = [], outs = [];
          for (let k = k0; k <= k1; k++) { const v = dist.pdf(k, P); if (v > 0) (inA(k) ? ins : outs).push([k - w, 0, k + w, v]); }
          bars(Pl, outs, { color: 'var(--series-1)', fillOpacity: 0.22, stroke: nb > 80 ? 'none' : 'var(--series-1)', strokeOpacity: 0.45 });
          bars(Pl, ins, { color: 'var(--series-1)', fillOpacity: 0.78, stroke: nb > 80 ? 'none' : 'var(--series-1)' });
        } else {
          const f = (x) => dist.pdf(x, P);
          const A0 = Math.max(a, view[0], lo), B0 = Math.min(b, view[1], hi);
          if (B0 > A0) Pl.area(f, A0, B0, { color: 'var(--series-1)', opacity: 0.3, samples: 400 });
          Pl.fn(f, { color: 'var(--series-1)', width: 2.4, domain: [Math.max(lo, view[0]), Math.min(hi, view[1])] });
          if (Number.isFinite(lo) && lo > view[0]) Pl.line(view[0], 0, lo, 0, { color: 'var(--series-1)', width: 2.4 });
          if (Number.isFinite(hi) && hi < view[1]) Pl.line(hi, 0, view[1], 0, { color: 'var(--series-1)', width: 2.4 });
          if (dist === D.uniform) { Pl.line(lo, 0, lo, f((lo + hi) / 2), { color: 'var(--series-1)', width: 1.2, dash: '3 3' }); Pl.line(hi, 0, hi, f((lo + hi) / 2), { color: 'var(--series-1)', width: 1.2, dash: '3 3' }); }
        }
        if (showNormal && npar) {
          Pl.fn((x) => PR.dnorm((x - npar.m) / npar.s) / npar.s, { color: 'var(--series-2)', width: 2, dash: '7 5' });
        }
      } else {
        // CDF: steps for discrete, curve for continuous; F(b) and F(a−) marked
        if (disc) {
          const k0 = Math.max(lo, Math.ceil(view[0])), k1 = Math.min(hi, Math.floor(view[1]));
          const pts = [[view[0], k0 > lo ? dist.cdf(k0 - 1, P) : 0]];
          const dotsOk = k1 - k0 <= 45;
          for (let k = k0; k <= k1; k++) {
            const F = dist.cdf(k, P), Fm = dist.cdf(k - 1, P);
            pts.push([k, Fm], null, [k, F]);
            if (dotsOk) { Pl.dot(k, F, { r: 3.2, color: 'var(--series-1)' }); if (F - Fm > 1e-3) Pl.dot(k, Fm, { r: 3.2, color: 'var(--series-1)', hollow: true }); }
          }
          pts.push([view[1], k1 < hi ? dist.cdf(k1, P) : 1]);
          Pl.path(pts, { color: 'var(--series-1)', width: 2.2 });
        } else {
          Pl.fn((x) => dist.cdf(x, P), { color: 'var(--series-1)', width: 2.4 });
        }
        if (showNormal && npar) Pl.fn((x) => PR.pnorm((x - npar.m) / npar.s), { color: 'var(--series-2)', width: 2, dash: '7 5' });
        const Fb = upperOpen() ? 1 : dist.cdf(b, P);
        const Fa = lowerOpen() ? 0 : disc ? dist.cdf(a - 1, P) : dist.cdf(a, P);
        const xb = view[0] + (view[1] - view[0]) * 0.02;
        if (!upperOpen()) { Pl.line(xb, Fb, b, Fb, { color: 'var(--accent)', width: 1.2, dash: '4 3' }); Pl.dot(b, Fb, { r: 3.6, color: 'var(--accent)' }); }
        if (!lowerOpen()) {
          const xa = disc ? a - 1 : a;
          Pl.line(xb, Fa, Math.max(xa, view[0]), Fa, { color: 'var(--accent)', width: 1.2, dash: '4 3' });
          if (xa >= view[0]) Pl.dot(xa, Fa, { r: 3.6, color: 'var(--accent)' });
        }
        Pl.line(xb, Fa, xb, Fb, { color: 'var(--accent)', width: 4 });
      }
      // μ and μ ± σ
      const m = mean(), s = sd();
      const yb = top * 1.1;
      if (Number.isFinite(m)) {
        Pl.line(m, 0, m, top * 1.13, { color: 'var(--ink-2)', width: 1.2, dash: '2 3', layer: 'marks' });
        Pl.tex(m, top * 1.17, '\\mu', { anchor: 'middle', size: 13, color: 'var(--ink-2)', w: 40, h: 22 });
        if (Number.isFinite(s) && s > 0) {
          Pl.line(m - s, yb, m + s, yb, { color: 'var(--ink-2)', width: 1.5, layer: 'marks' });
          const tk = (view[1] - view[0]) > 0 ? (yview[1] - yview[0]) * 0.022 : 0;
          Pl.line(m - s, yb - tk, m - s, yb + tk, { color: 'var(--ink-2)', width: 1.5, layer: 'marks' });
          Pl.line(m + s, yb - tk, m + s, yb + tk, { color: 'var(--ink-2)', width: 1.5, layer: 'marks' });
          const right = Pl.X(m + s) + 70 < Pl.W - Pl.pr;
          Pl.tex(right ? m + s : m - s, yb, '\\mu \\pm \\sigma', { anchor: right ? 'start' : 'end', dx: right ? 6 : -6, size: 12, color: 'var(--ink-2)', w: 70, h: 22 });
        }
      } else if (dist.median) {
        const md = dist.median(P);
        Pl.line(md, 0, md, top * 1.13, { color: 'var(--ink-2)', width: 1.2, dash: '2 3', layer: 'marks' });
        Pl.text(md, top * 1.15, T('median'), { anchor: 'middle', size: 11, color: 'var(--ink-2)', dy: -4 });
      }
      placeHandles();
      // legend and read-outs
      const isPdf = mode === 'pdf';
      legend(leg, [
        { label: isPdf ? (disc ? T('probability mass function') : T('density')) : T('distribution function'), color: 'var(--series-1)', kind: isPdf && disc ? 'swatch' : 'line', opacity: isPdf && disc ? 0.5 : 1 },
        { label: probTeX(), color: mode === 'cdf' ? 'var(--accent)' : 'var(--series-1)', kind: 'swatch' },
        showNormal && npar ? { label: dist.normalRef ? '\\Normal(0, 1)' : T('normal approximation'), color: 'var(--series-2)', kind: 'dash' } : null,
      ]);
      const parts = [{ tex: 'X \\sim ' + dist.tex(P) }, MA.ui.kv(probTeX() + ' =', fmt(prob, 5), true)];
      if (showNormal && npar && !(lowerOpen() && upperOpen())) {
        const cc = disc ? 0.5 : 0;
        const za = lowerOpen() ? -Infinity : (a - cc - npar.m) / npar.s, zb = upperOpen() ? Infinity : (b + cc - npar.m) / npar.s;
        const pa = za > 0 ? PR.pnormUpper(za) - PR.pnormUpper(zb) : PR.pnorm(zb) - PR.pnorm(za);
        parts.push(MA.ui.kv(disc ? T('normal approx. (continuity corr.)') : T('normal approx.'), '≈ ' + fmt(pa, 4)));
      }
      if (Number.isFinite(m)) parts.push(MA.ui.kv('\\mu =', fmt(m, 4), true));
      else parts.push(MA.ui.kv('\\mu', T('undefined'), true));
      const v = dist.variance(P);
      parts.push(MA.ui.kv('\\sigma =', Number.isNaN(v) ? T('undefined') : fmt(Math.sqrt(v), 4), true));
      info.set(...parts);
      const formula = (P.failures && dist.formula0) || (P._scale && dist.formulaScale) || dist.formula;
      const notes = [{ tex: formula }];
      if (dist === D.geometric) notes.push(el('span', { class: 'w-pr-note', text: P.failures ? T('X = number of failures before the first success') : T('X = number of trials up to and including the first success') }));
      if (dist === D.negbinomial) notes.push(el('span', { class: 'w-pr-note', text: P.failures ? T('X = number of failures before the r-th success') : T('X = number of trials up to and including the r-th success') }));
      if (dist === D.cauchy && showNormal) notes.push(el('span', { class: 'w-pr-note', text: T('The Cauchy distribution has no mean or variance, so there is no normal approximation.') }));
      finfo.set(...notes);
    }

    // interval handles on the x-axis (snap to integers / a fine grid; at the plot edge = unbounded)
    const snap = (x) => {
      if (disc) return Math.round(x);
      const st = MA.niceStep((view[1] - view[0]) / 300);
      return Math.round(x / st) * st;
    };
    const edge = (x, left) => (left ? x <= view[0] + (view[1] - view[0]) * 0.004 : x >= view[1] - (view[1] - view[0]) * 0.004);
    const hA = Pl.handle(0, 0, { label: T('Interval start a'), constrain: (x) => [clamp(x, view[0], view[1]), 0],
      onDrag: guard((x) => { a = edge(x, true) ? -Infinity : Math.min(snap(x), Number.isFinite(b) ? b : Infinity); draw(); }, report) });
    const hB = Pl.handle(0, 0, { label: T('Interval end b'), constrain: (x) => [clamp(x, view[0], view[1]), 0],
      onDrag: guard((x) => { b = edge(x, false) ? Infinity : Math.max(snap(x), Number.isFinite(a) ? a : -Infinity); draw(); }, report) });
    function placeHandles() {
      const pos = (v) => clamp(Number.isFinite(v) ? v : v < 0 ? view[0] : view[1], view[0], view[1]);
      hA.x = pos(a); hA.y = 0; hA.redraw();
      hB.x = pos(b); hB.y = 0; hB.redraw();
    }
    function report(e) { info.set(el('span', { class: 'w-err', text: T('Could not update the figure: %s', e.message) })); }

    // controls: one slider per parameter
    const sl = {};
    dist.params.forEach((s) => {
      if (s.hidden) return;
      const scale = s.alt && P._scale && s.alt.find((q) => q.scale);
      const val = scale ? 1 / P[s.key] : P[s.key];
      const lab = scale ? '\\theta' : (s.tex || s.key);
      let min = scale ? 0.2 : s.min, max = scale ? 10 : s.max;
      if (val < min) min = s.int ? Math.floor(val) : val;
      if (val > max) max = s.int ? Math.ceil(val * 1.5) : val * 1.5;
      if (s.cap) max = Math.min(max, s.cap);
      let step = s.int ? 1 : (scale ? 0.05 : s.step);
      if (!s.int && Math.abs(val / step - Math.round(val / step)) > 1e-9) step = 'any';
      sl[s.key] = MA.ui.slider(sliderBar, { label: lab, tex: true, min, max, step, value: val, fmt: (v) => (s.int ? String(v) : MA.fmt(v, 3)),
        onInput: guard((v) => {
          P[s.key] = scale ? 1 / v : v;
          if (dist === D.hypergeometric) {
            if (s.key === 'N') { ['K', 'n'].forEach((k) => { sl[k].input.max = v; if (P[k] > v) { P[k] = v; sl[k].set(v); } }); }
          }
          if (dist === D.uniform || dist === D.discreteuniform) {
            if (P.b <= P.a && dist === D.uniform) { if (s.key === 'a') { P.a = Math.min(v, P.b - 0.1); sl.a.set(P.a); } else { P.b = Math.max(v, P.a + 0.1); sl.b.set(P.b); } }
            if (P.b < P.a && dist === D.discreteuniform) { if (s.key === 'a') { P.a = P.b; sl.a.set(P.a); } else { P.b = P.a; sl.b.set(P.b); } }
          }
          if (dist === D.binomial && P.p === 0) { /* fine: point mass */ }
          draw();
        }, report) });
    });
    if (dist === D.hypergeometric) { sl.K.input.max = Math.max(P.N, 1); sl.n.input.max = Math.max(P.N, 1); }
    MA.ui.seg(bar, { options: [['pdf', disc ? 'PMF' : 'PDF'], ['cdf', 'CDF']], value: mode, onChange: guard((v) => { mode = v; yview = null; draw(); }, report) });
    const tg = MA.ui.toggle(bar, { label: T('Normal approximation'), value: showNormal, onChange: guard((v) => { showNormal = v; draw(); }, report) });
    if (dist === D.normal) show(tg, false);
    MA.ui.button(bar, { label: T('Reset interval'), onClick: guard(() => {
      const m = mean(), s = sd();
      if (Number.isFinite(m) && Number.isFinite(s)) { a = m - s; b = m + s; } else { a = PR.quantile(dist, 0.25, P); b = PR.quantile(dist, 0.75, P); }
      if (disc) { a = Math.ceil(a - 1e-9); b = Math.max(a, Math.floor(b + 1e-9)); } else { a = snap(a); b = snap(b); }
      draw();
    }, report) });
    Pl.onHover(guard((x) => {
      if (x === null || !view) { read(null); return; }
      if (disc) {
        const k = Math.round(x);
        read('k = ' + k + '   P(X = ' + k + ') = ' + fmt(dist.pdf(k, P), 4) + '   F(' + k + ') = ' + fmt(dist.cdf(k, P), 4));
      } else {
        read('x = ' + MA.fmt(x, 4) + '   f(x) = ' + fmt(dist.pdf(x, P), 4) + '   F(x) = ' + fmt(dist.cdf(x, P), 4));
      }
    }));
    draw();
  });

  // ================================================================== clt
  const LN_S = 0.75; // log-normal "skewed" population
  const POPS = {
    uniform: { label: () => T('Uniform on [0, 1]'), mean: 0.5, sd: Math.sqrt(1 / 12), skew: 0, draw: (r) => r(),
      pdf: (x) => (x >= 0 && x <= 1 ? 1 : 0), view: [-0.12, 1.12], peak: 1 },
    exponential: { label: () => T('Exponential (λ = 1)'), mean: 1, sd: 1, skew: 2, draw: (r) => -Math.log(1 - r()),
      pdf: (x) => (x < 0 ? 0 : Math.exp(-x)), view: [-0.15, 6], peak: 1 },
    bernoulli: { label: () => T('Bernoulli (p = 0.2)'), mean: 0.2, sd: 0.4, skew: 1.5, draw: (r) => (r() < 0.2 ? 1 : 0),
      pmf: [[0, 0.8], [1, 0.2]], view: [-0.6, 1.6], lattice: true, peak: 0.8 },
    die: { label: () => T('Fair die'), mean: 3.5, sd: Math.sqrt(35 / 12), skew: 0, draw: (r) => 1 + Math.floor(6 * r()),
      pmf: [1, 2, 3, 4, 5, 6].map((k) => [k, 1 / 6]), view: [0.3, 6.7], lattice: true, peak: 1 / 6 },
    skewed: { label: () => T('Skewed (log-normal)'), mean: Math.exp(LN_S * LN_S / 2), sd: Math.sqrt(Math.expm1(LN_S * LN_S) * Math.exp(LN_S * LN_S)),
      skew: (Math.exp(LN_S * LN_S) + 2) * Math.sqrt(Math.expm1(LN_S * LN_S)), draw: (r) => Math.exp(LN_S * MA.num.normal(r)),
      pdf: (x) => (x <= 0 ? 0 : PR.dnorm(Math.log(x) / LN_S) / (x * LN_S)), view: [-0.15, 6], peak: 0.75 },
    bimodal: { label: () => T('Bimodal (two humps)'), mean: 4, sd: Math.sqrt(4.25), skew: 0, draw: (r) => (r() < 0.5 ? 2 : 6) + 0.5 * MA.num.normal(r),
      pdf: (x) => PR.dnorm((x - 2) / 0.5) + PR.dnorm((x - 6) / 0.5), view: [0, 8], peak: 0.8 },
  };
  const sampleSeed = (seed, i) => (seed + Math.imul(i + 1, 0x9E3779B1)) >>> 0;

  MA.widget('clt', (stage, cfg) => {
    let popKey = C.str(cfg.dist, 'exponential');
    if (!POPS[popKey]) throw new Error('dist must be one of ' + Object.keys(POPS).join(', '));
    let n = clamp(C.int(cfg.n, 5), 1, 1000);
    const S = clamp(C.int(cfg.samples, 2000), 50, 10000);
    let seed = firstSeed(1);
    let fixedAxis = false;
    let count = S;              // sample means shown (the animation reveals them one by one)
    let means = new Float64Array(S);
    let yTop = 0;
    let animating = false, t = 0;

    MA.ui.title(stage, cfg.title);
    const capPop = el('div', { class: 'w-pr-cap', text: T('Population') });
    stage.append(capPop);
    const P1 = mkPlot(stage, 640, 150, { x: [0, 1], y: [0, 1], grid: false, axes: false, pad: [8, 12, 22, 36], label: T('Population distribution with one sample') });
    const capMeans = el('div', { class: 'w-pr-cap' });
    stage.append(capMeans);
    const leg = legendBox(stage);
    const P2 = mkPlot(stage, 640, 300, { x: [0, 1], y: [0, 1], grid: false, axes: false, label: T('Histogram of sample means and the normal curve') });
    const bar = MA.ui.bar(stage);
    const bar2 = MA.ui.bar(stage);
    const info = MA.ui.info(stage);
    const read = P2.readout();
    const report = (e) => info.set(el('span', { class: 'w-err', text: T('Could not update the figure: %s', e.message) }));

    function compute() {
      const pop = POPS[popKey];
      means = new Float64Array(S);
      for (let i = 0; i < S; i++) {
        const r = MA.num.rng(sampleSeed(seed, i));
        let sum = 0;
        for (let j = 0; j < n; j++) sum += pop.draw(r);
        means[i] = sum / n;
      }
      yTop = 0;
    }
    function sampleValues(i) {
      const pop = POPS[popKey], r = MA.num.rng(sampleSeed(seed, i)), out = [];
      for (let j = 0; j < n; j++) out.push(pop.draw(r));
      return out;
    }
    function meanView() {
      const pop = POPS[popKey];
      const lo = pop.lattice ? pop.view[0] + 0.1 : pop.view[0], hi = pop.lattice ? pop.view[1] - 0.1 : pop.view[1];
      if (fixedAxis) return pop.view.slice();
      const h = 4.2 * pop.sd / Math.sqrt(n);
      let v0 = Math.max(lo - (pop.lattice ? 0.5 / n : 0), pop.mean - h), v1 = Math.min(hi + (pop.lattice ? 0.5 / n : 0), pop.mean + h);
      if (pop.lattice && n === 1) { v0 = pop.view[0]; v1 = pop.view[1]; }
      return [v0, v1];
    }
    /** Histogram (density scale) of the first `count` means over the view; lattice-aligned for die / Bernoulli. */
    function histogram(view) {
      const pop = POPS[popKey];
      const rects = [];
      let maxD = 0;
      if (!count) return { rects, maxD };
      if (pop.lattice) {
        const sMin = Math.ceil(view[0] * n - 1e-9), sMax = Math.floor(view[1] * n + 1e-9);
        const per = Math.max(1, Math.ceil((sMax - sMin + 1) / 40));
        const nb = Math.ceil((sMax - sMin + 1) / per);
        const cnt = new Float64Array(nb);
        for (let i = 0; i < count; i++) { const j = Math.floor((Math.round(means[i] * n) - sMin) / per); if (j >= 0 && j < nb) cnt[j]++; }
        const w = per / n;
        const gap = per === 1 && nb <= 14 ? 0.12 * w : 0;
        for (let j = 0; j < nb; j++) {
          const x0 = (sMin + j * per - 0.5) / n, d = cnt[j] / (count * w);
          rects.push([x0 + gap, 0, x0 + w - gap, d]); maxD = Math.max(maxD, d);
        }
      } else {
        const nb = 44, w = (view[1] - view[0]) / nb;
        const cnt = new Float64Array(nb);
        for (let i = 0; i < count; i++) { const j = Math.floor((means[i] - view[0]) / w); if (j >= 0 && j < nb) cnt[j]++; }
        for (let j = 0; j < nb; j++) { const d = cnt[j] / (count * w); rects.push([view[0] + j * w, 0, view[0] + (j + 1) * w, d]); maxD = Math.max(maxD, d); }
      }
      return { rects, maxD };
    }
    function drawPopulation(sample, xbar) {
      const pop = POPS[popKey];
      P1.setView(pop.view, [0, pop.peak * 1.3]);
      frame(P1, { y: 'none' });
      P1.clear();
      if (pop.pmf) {
        bars(P1, pop.pmf.map(([k, p]) => [k - 0.18, 0, k + 0.18, p]), { color: 'var(--ink-3)', fillOpacity: 0.35, stroke: 'var(--ink-3)' });
      } else {
        P1.area(pop.pdf, pop.view[0], pop.view[1], { color: 'var(--ink-3)', opacity: 0.16, samples: 300 });
        P1.fn(pop.pdf, { color: 'var(--ink-2)', width: 1.8 });
      }
      P1.line(pop.mean, 0, pop.mean, pop.peak * 1.3, { color: 'var(--ink-2)', width: 1.2, dash: '2 3' });
      P1.tex(pop.mean, pop.peak * 1.18, '\\mu', { anchor: 'start', dx: 4, size: 12, color: 'var(--ink-2)', w: 30, h: 20 });
      if (sample) {
        // the current sample: one dot per observation (jittered so ties stay visible), and its mean
        const r = MA.num.rng(12345);
        const jx = pop.lattice ? 0.28 : 0;
        const H = pop.peak * 1.3;
        let d = '';
        sample.forEach((v) => {
          const X = P1.X(v + (r() - 0.5) * jx), Y = P1.Y(H * (0.06 + 0.3 * r()));
          d += 'M' + X.toFixed(1) + ',' + Y.toFixed(1) + 'h0';
        });
        svg(P1, 'marks', 'path', { d, style: 'stroke:var(--series-2);stroke-width:' + (n > 200 ? 3 : 5) + ';stroke-linecap:round;opacity:.75;fill:none' });
        P1.line(xbar, 0, xbar, H, { color: 'var(--series-2)', width: 2.2 });
        P1.tex(xbar, H * 0.84, '\\bar x', { anchor: 'start', dx: 5, size: 13, color: 'var(--series-2)', w: 30, h: 20 });
      }
    }
    function draw() {
      const pop = POPS[popKey];
      const view = meanView();
      const se = pop.sd / Math.sqrt(n);
      const npk = 1 / (se * Math.sqrt(2 * Math.PI));
      const { rects, maxD } = histogram(view);
      yTop = Math.max(animating ? yTop : 0, npk * 1.22, maxD * 1.08);
      P2.setView(view, [0, yTop]);
      frame(P2, { xLabel: 'x̄' });
      P2.clear();
      bars(P2, rects, { color: 'var(--series-1)', fillOpacity: 0.45, stroke: 'var(--series-1)', strokeOpacity: 0.7 });
      P2.fn((x) => PR.dnorm((x - pop.mean) / se) / se, { color: 'var(--series-2)', width: 2.4 });
      P2.line(pop.mean, 0, pop.mean, yTop, { color: 'var(--ink-2)', width: 1.2, dash: '2 3' });
      // the most recent sample mean
      let sample = null, xbar = NaN;
      if (count > 0) {
        sample = sampleValues(count - 1);
        xbar = means[count - 1];
        const X = P2.X(xbar), Y = P2.Y(0);
        if (xbar >= view[0] && xbar <= view[1]) svg(P2, 'top', 'path', { d: 'M' + X.toFixed(1) + ',' + (Y - 1).toFixed(1) + 'l-6,-11h12z', style: 'fill:var(--series-2);stroke:var(--plot-bg);stroke-width:1' });
      }
      drawPopulation(sample, xbar);
      capMeans.textContent = T('Means of %d samples of size n = %d', count, n);
      legend(leg, [
        { label: T('sample means (histogram)'), color: 'var(--series-1)', kind: 'swatch', opacity: 0.6 },
        { label: '\\Normal(\\mu,\\ \\sigma^2/n)', color: 'var(--series-2)' },
        { label: T('latest sample and its mean'), color: 'var(--series-2)', kind: 'dot' },
      ]);
      // observed moments of the means
      let m1 = 0, m2 = 0, m3 = 0;
      for (let i = 0; i < count; i++) m1 += means[i];
      m1 /= Math.max(1, count);
      for (let i = 0; i < count; i++) { const d = means[i] - m1; m2 += d * d; m3 += d * d * d; }
      const sdObs = count > 1 ? Math.sqrt(m2 / (count - 1)) : NaN;
      const skObs = count > 2 && m2 > 0 ? (m3 / count) / Math.pow(m2 / count, 1.5) : NaN;
      info.set(
        MA.ui.kv(T('Population'), ''), { tex: '\\mu = ' + tn(pop.mean, 4) + ',\\ \\sigma = ' + tn(pop.sd, 4) },
        MA.ui.kv('\\sigma/\\sqrt{n} =', fmt(se, 4), true),
        MA.ui.kv(T('mean of the means'), fmt(m1, 4)),
        MA.ui.kv(T('their sd'), fmt(sdObs, 4)),
        MA.ui.kv(T('skewness'), fmt(skObs, 2) + '  (' + T('theory') + ' ' + fmt(pop.skew / Math.sqrt(n), 2) + ')'),
      );
    }

    // animation: reveal the samples one at a time, then faster and faster
    const anim = MA.anim((dt) => {
      t += dt;
      count = Math.min(S, Math.max(1, Math.floor(1 + 4 * t + S * Math.pow(t / 7, 3))));
      safeDraw();
      if (count >= S) { animating = false; play.set(false); return false; }
      return true;
    });
    const safeDraw = guard(draw, report);
    const play = playButton(bar, guard(() => {
      if (animating) { animating = false; anim.stop(); play.set(false); return; }
      if (count >= S) { count = 0; t = 0; yTop = 0; }
      animating = true; play.set(true); anim.play();
    }, report));
    pauseOffscreen(stage, anim, () => animating);
    MA.ui.button(bar, { label: T('New samples'), onClick: guard(() => { seed = nextSeed(); compute(); if (!animating) count = S; draw(); }, report) });
    MA.ui.select(bar, { label: T('Population'), value: popKey, options: Object.keys(POPS).map((k) => [k, POPS[k].label()]),
      onChange: guard((v) => { popKey = v; compute(); draw(); }, report) });
    MA.ui.slider(bar2, { label: 'n', min: 1, max: Math.max(100, n), step: 1, value: n, fmt: (v) => String(v),
      onInput: guard((v) => { n = v; compute(); draw(); }, report) });
    MA.ui.toggle(bar2, { label: T('Same scale as population'), value: fixedAxis, onChange: guard((v) => { fixedAxis = v; yTop = 0; draw(); }, report) });
    P2.onHover(guard((x) => {
      if (x === null) { read(null); return; }
      const pop = POPS[popKey], se = pop.sd / Math.sqrt(n);
      read('x̄ = ' + MA.fmt(x, 4) + '   ' + T('normal density') + ' ' + fmt(PR.dnorm((x - pop.mean) / se) / se, 3));
    }));
    compute();
    draw();
  });

  // ================================================================== lln
  MA.widget('lln', (stage, cfg) => {
    let kind = C.str(cfg.experiment, 'coin');
    if (!['coin', 'die', 'bernoulli'].includes(kind)) throw new Error('experiment must be coin, die or bernoulli');
    let p = C.num(cfg.p, 0.3);
    if (!(p >= 0 && p <= 1)) throw new Error('p must be between 0 and 1');
    const N = clamp(C.int(cfg.trials, 1000), 10, 100000);
    let R = clamp(C.int(cfg.runs, 5), 1, 20);
    let seed = firstSeed(2);
    let logX = true;
    let shown = N, animating = false, t = 0;
    const spec = () => (kind === 'die'
      ? { mean: 3.5, sd: Math.sqrt(35 / 12), draw: (r) => 1 + Math.floor(6 * r()), y: [0.75, 6.25], label: T('average score'), sym: '\\bar X_n' }
      : { mean: kind === 'coin' ? 0.5 : p, sd: Math.sqrt((kind === 'coin' ? 0.25 : p * (1 - p))),
        draw: kind === 'coin' ? (r) => (r() < 0.5 ? 1 : 0) : (r) => (r() < p ? 1 : 0), y: [-0.04, 1.04],
        label: kind === 'coin' ? T('proportion of heads') : T('proportion of successes'), sym: '\\bar X_n' });

    // trials at which the running averages are recorded: every n ≤ 60, then log- and linearly spaced
    const idxSet = new Set();
    for (let k = 1; k <= Math.min(N, 60); k++) idxSet.add(k);
    for (let i = 0; i <= 700; i++) idxSet.add(Math.round(Math.pow(N, i / 700)));
    for (let i = 0; i <= 900; i++) idxSet.add(Math.max(1, Math.round(N * i / 900)));
    const idx = Array.from(idxSet).filter((k) => k >= 1 && k <= N).sort((x, y) => x - y);
    let avg = [];

    MA.ui.title(stage, cfg.title);
    const leg = legendBox(stage);
    const Pl = mkPlot(stage, 640, 360, { x: [0, 1], y: [0, 1], grid: false, axes: false, label: T('Running averages of repeated trials') });
    const bar = MA.ui.bar(stage);
    const bar2 = MA.ui.bar(stage);
    const info = MA.ui.info(stage);
    const read = Pl.readout();
    const report = (e) => info.set(el('span', { class: 'w-err', text: T('Could not update the figure: %s', e.message) }));

    function compute() {
      const sp = spec();
      avg = [];
      for (let r = 0; r < R; r++) {
        const rnd = MA.num.rng(sampleSeed(seed, r));
        const a = new Float64Array(idx.length);
        let sum = 0, j = 0;
        for (let k = 1; k <= N; k++) {
          sum += sp.draw(rnd);
          if (k === idx[j]) { a[j] = sum / k; j++; }
        }
        avg.push(a);
      }
    }
    const X = (k) => (logX ? Math.log10(k) : k);
    function draw() {
      const sp = spec();
      const xv = logX ? [-0.04 * Math.log10(N), Math.log10(N) * 1.01] : [0, N * 1.01];
      Pl.setView(xv, sp.y);
      frame(Pl, { x: logX ? 'log' : 'lin', xLabel: T('number of trials n') });
      Pl.clear();
      // envelope μ ± σ/√n and μ ± 2σ/√n
      for (const [m, op] of [[2, 0.09], [1, 0.13]]) {
        const up = [], dn = [];
        idx.forEach((k) => { up.push([X(k), sp.mean + m * sp.sd / Math.sqrt(k)]); dn.push([X(k), sp.mean - m * sp.sd / Math.sqrt(k)]); });
        Pl.poly(up.concat(dn.reverse()), { fill: 'var(--ink-3)', fillOpacity: op });
        Pl.fn(() => NaN);
      }
      Pl.path(idx.map((k) => [X(k), sp.mean + 2 * sp.sd / Math.sqrt(k)]), { color: 'var(--ink-3)', width: 1, dash: '3 3' });
      Pl.path(idx.map((k) => [X(k), sp.mean - 2 * sp.sd / Math.sqrt(k)]), { color: 'var(--ink-3)', width: 1, dash: '3 3' });
      Pl.line(xv[0], sp.mean, xv[1], sp.mean, { color: 'var(--ink)', width: 1.3, dash: '6 4', layer: 'curves' });
      // runs
      let last = 0;
      while (last < idx.length - 1 && idx[last + 1] <= shown) last++;
      const finals = [];
      avg.forEach((a, r) => {
        const col = PALETTE[r % PALETTE.length];
        const pts = [];
        for (let j = 0; j <= last; j++) pts.push([X(idx[j]), a[j]]);
        Pl.path(pts, { color: col, width: R > 8 ? 1.2 : 1.7, opacity: 0.9 });
        Pl.dot(X(idx[last]), a[last], { r: 3.6, color: col });
        finals.push(a[last]);
      });
      const nNow = idx[last];
      const tex = (y, s, o) => Pl.tex(xv[1], y, s, Object.assign({ anchor: 'end', dx: -6, size: 12, color: 'var(--ink-2)', w: 120, h: 22 }, o));
      tex(sp.mean, '\\mu = ' + tn(sp.mean, 4), { dy: -12 });
      legend(leg, [
        { label: T('running average of one run'), color: 'var(--series-1)' },
        { label: '\\mu \\pm \\sigma/\\sqrt{n}', color: 'var(--ink-3)', kind: 'swatch', opacity: 0.45 },
        { label: '\\mu \\pm 2\\sigma/\\sqrt{n}', color: 'var(--ink-3)', kind: 'swatch', opacity: 0.25 },
      ]);
      const band = 2 * sp.sd / Math.sqrt(nNow);
      const inside = finals.filter((v) => Math.abs(v - sp.mean) <= band + 1e-12).length;
      const chips = el('span');
      finals.forEach((v, r) => {
        const c = el('span', { style: 'margin-right:10px;white-space:nowrap' }, el('span', { class: 'w-pr-chip', style: '--c:' + PALETTE[r % PALETTE.length] }), el('b', { text: fmt(v, 4) }));
        chips.append(c);
      });
      info.set(
        MA.ui.kv(T('after n = %d trials', nNow), ''), chips,
        MA.ui.kv('\\mu =', fmt(sp.mean, 4), true),
        MA.ui.kv('2\\sigma/\\sqrt{n} =', fmt(band, 3), true),
        MA.ui.kv(T('runs inside the band'), inside + ' / ' + R),
      );
      void sp.label;
    }
    const safeDraw = guard(draw, report);
    const anim = MA.anim((dt) => {
      t += dt;
      const T0 = 7;
      shown = logX ? Math.round(Math.pow(N, Math.min(1, t / T0))) : Math.round(N * Math.min(1, t / T0));
      shown = Math.max(1, shown);
      safeDraw();
      if (shown >= N) { animating = false; play.set(false); return false; }
      return true;
    });
    const play = playButton(bar, guard(() => {
      if (animating) { animating = false; anim.stop(); play.set(false); return; }
      if (shown >= N) { shown = 1; t = 0; }
      animating = true; play.set(true); anim.play();
    }, report));
    pauseOffscreen(stage, anim, () => animating);
    MA.ui.button(bar, { label: T('New runs'), onClick: guard(() => { seed = nextSeed(); compute(); draw(); }, report) });
    MA.ui.seg(bar, { options: [['coin', T('Coin')], ['die', T('Die')], ['bernoulli', T('Bernoulli(p)')]], value: kind,
      onChange: guard((v) => { kind = v; show(pS, kind === 'bernoulli'); compute(); draw(); }, report) });
    MA.ui.toggle(bar, { label: T('Log scale'), value: logX, onChange: guard((v) => { logX = v; draw(); }, report) });
    const pS = MA.ui.slider(bar2, { label: 'p', min: 0, max: 1, step: 0.01, value: p, onInput: guard((v) => { p = v; compute(); draw(); }, report) });
    show(pS, kind === 'bernoulli');
    MA.ui.slider(bar2, { label: T('runs'), min: 1, max: 20, step: 1, value: R, fmt: (v) => String(v), onInput: guard((v) => { R = v; compute(); draw(); }, report) });
    Pl.onHover(guard((x) => {
      if (x === null) { read(null); return; }
      const k = Math.round(logX ? Math.pow(10, x) : x);
      if (!(k >= 1 && k <= N)) { read(null); return; }
      const sp = spec();
      read('n = ' + k + '   μ ± 2σ/√n = ' + fmt(sp.mean, 4) + ' ± ' + fmt(2 * sp.sd / Math.sqrt(k), 3));
    }));
    compute();
    draw();
  });

  // ================================================================== montecarlo
  MA.widget('montecarlo', (stage, cfg) => {
    const mode = C.str(cfg.mode, 'pi');
    if (mode !== 'pi' && mode !== 'integral') throw new Error('mode must be pi or integral');
    const NMAX = 100000;
    let n = clamp(C.int(cfg.n, 1000), 10, NMAX);
    let seed = firstSeed(3);
    let f = null, a = 0, b = 1, ylo = 0, yhi = 1, exact = Math.PI, seHM = 0, seSM = 0, fTeX = '', aTeX = '0', bTeX = '1';
    if (mode === 'integral') {
      if (!C.has(cfg.f)) throw new Error('integral mode needs f (e.g. f: exp(-x^2))');
      const fe = C.expr(cfg.f, ['x']);
      f = (x) => fe.f({ x });
      try { fTeX = MA.expr.toTeX(fe.ast); } catch (e) { fTeX = 'f(x)'; }
      const limTeX = (src, v) => { try { return /^[-+\d.\s]+$/.test(String(src)) ? tn(v, 6) : MA.expr.toTeX(MA.expr.parse(String(src), { vars: [] })); } catch (e) { return tn(v, 6); } };
      a = C.num(cfg.a, 0); b = C.num(cfg.b, 1);
      if (!(b > a)) throw new Error('need a < b');
      aTeX = C.has(cfg.a) ? limTeX(cfg.a, a) : '0'; bTeX = C.has(cfg.b) ? limTeX(cfg.b, b) : '1';
      let mn = Infinity, mx = -Infinity;
      for (let i = 0; i <= 2000; i++) {
        const v = f(a + (b - a) * i / 2000);
        if (!Number.isFinite(v)) throw new Error('f must be finite on [a, b] (it is not at x = ' + MA.fmt(a + (b - a) * i / 2000) + ')');
        mn = Math.min(mn, v); mx = Math.max(mx, v);
      }
      ylo = Math.min(0, mn); yhi = Math.max(0, mx);
      if (yhi - ylo < 1e-12) yhi = ylo + 1;
      const padY = 0.04 * (yhi - ylo);
      if (yhi > 0) yhi += padY;
      if (ylo < 0) ylo -= padY;
      exact = MA.num.integrate(f, a, b, 1e-12);
      const A = (b - a) * (yhi - ylo);
      if (Math.abs(exact) < 1e-11 * A) exact = 0;
      const absI = MA.num.integrate((x) => Math.abs(f(x)), a, b, 1e-12);
      const sq = MA.num.integrate((x) => f(x) * f(x), a, b, 1e-12);
      seHM = A * Math.sqrt(Math.max(0, absI / A - (exact / A) * (exact / A)));
      seSM = (b - a) * Math.sqrt(Math.max(0, sq / (b - a) - (exact / (b - a)) * (exact / (b - a))));
    } else {
      const q = Math.PI / 4;
      seHM = 4 * Math.sqrt(q * (1 - q));
    }
    const xs = new Float64Array(NMAX), ys = new Float64Array(NMAX);
    const hit = new Int8Array(NMAX), cum = new Float64Array(NMAX + 1), cumF = new Float64Array(NMAX + 1);
    function compute() {
      const r = MA.num.rng(seed);
      for (let i = 0; i < NMAX; i++) {
        const x = a + (b - a) * r(), y = ylo + (yhi - ylo) * r();
        xs[i] = x; ys[i] = y;
        let h;
        if (mode === 'pi') h = x * x + y * y <= 1 ? 1 : 0;
        else { const v = f(x); h = v > 0 && y > 0 && y <= v ? 1 : v < 0 && y < 0 && y >= v ? -1 : 0; cumF[i + 1] = cumF[i] + v; }
        hit[i] = h;
        cum[i + 1] = cum[i] + h;
      }
    }
    const A = (b - a) * (yhi - ylo);
    const estHM = (k) => (mode === 'pi' ? 4 * cum[k] / k : A * cum[k] / k);
    const estSM = (k) => (b - a) * cumF[k] / k;

    MA.ui.title(stage, cfg.title);
    stage.classList.add('w-pr-mc');
    const leg = legendBox(stage);
    const rw = row(stage);
    const pa = panel(rw, mode === 'pi' ? T('Random points in the unit square') : T('Random points in the box'));
    const pb = panel(rw, T('Error against n (log scales)'));
    const P1 = mkPlot(pa, 400, 386, { x: [a, b], y: [ylo, yhi], grid: false, axes: false, label: T('Random points') });
    const P2 = mkPlot(pb, 400, 386, { x: [0, 1], y: [0, 1], grid: false, axes: false, label: T('Error of the estimate against the number of points') });
    const bar = MA.ui.bar(stage);
    const info = MA.ui.info(stage);
    const report = (e) => info.set(el('span', { class: 'w-err', text: T('Could not update the figure: %s', e.message) }));
    let shown = n, drawn = 0, animating = false, t = 0;
    const colHit = 'var(--series-1)', colNeg = 'var(--series-2)', colMiss = mode === 'pi' ? 'var(--series-2)' : 'var(--ink-3)';
    const cols = {};
    const cv = canvasUnder(P1, (ctx, sc) => { drawn = 0; paint(ctx, sc); });
    function paint(ctx, sc) {
      cols.h = cssColor(colHit); cols.n = cssColor(colNeg); cols.m = cssColor(colMiss);
      const r = (shown <= 2000 ? 2.3 : shown <= 10000 ? 1.5 : 1.0) * sc;
      const alpha = shown <= 10000 ? 0.85 : 0.6;
      const square = shown > 5000; // many points: squares are much faster to paint than arcs
      ctx.globalAlpha = alpha;
      for (const [key, hv] of [['m', 0], ['n', -1], ['h', 1]]) {
        ctx.fillStyle = cols[key];
        ctx.globalAlpha = key === 'm' && mode !== 'pi' ? 0.45 : alpha;
        ctx.beginPath();
        for (let i = drawn; i < shown; i++) {
          if (hit[i] !== hv) continue;
          const X = P1.X(xs[i]) * sc, Y = P1.Y(ys[i]) * sc;
          if (square) ctx.rect(X - r, Y - r, 2 * r, 2 * r);
          else { ctx.moveTo(X + r, Y); ctx.arc(X, Y, r, 0, 2 * Math.PI); }
        }
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      drawn = shown;
    }
    function drawScatter() {
      P1.setView([a, b], [ylo, yhi]);
      frame(P1, {});
      P1.clear();
      if (mode === 'pi') {
        P1.param((t) => Math.cos(t), (t) => Math.sin(t), 0, Math.PI / 2, { color: 'var(--ink)', width: 2.2, samples: 200 });
      } else {
        P1.fn(f, { color: 'var(--ink)', width: 2.2, domain: [a, b] });
        if (ylo < 0 && yhi > 0) P1.line(a, 0, b, 0, { color: 'var(--ink-2)', width: 1.2 });
      }
    }
    function drawErrors() {
      const xMax = Math.log10(Math.max(n, 10));
      const seMax = Math.max(seHM, seSM);
      const seMin = Math.min(seHM, mode === 'pi' ? seHM : seSM || seHM) / Math.sqrt(n);
      const yv = [Math.floor(Math.log10(seMin) - 1.2), Math.log10(seMax * 2.2)];
      P2.setView([0, xMax * 1.02], yv);
      frame(P2, { x: 'log', y: 'log' });
      P2.clear();
      const m = [];
      for (let j = 0; j <= 500; j++) { const k = Math.round(Math.pow(shown, j / 500)); if (!m.length || k !== m[m.length - 1]) m.push(k); }
      const errPath = (est) => m.map((k) => { const e = Math.abs(est(k) - exact); return e > 0 ? [Math.log10(k), Math.log10(e)] : null; });
      const sePath = (se) => [[0, Math.log10(se)], [xMax * 1.02, Math.log10(se / Math.sqrt(Math.pow(10, xMax * 1.02)))]];
      P2.path(sePath(seHM), { color: 'var(--series-1)', width: 1.4, dash: '6 4' });
      if (mode === 'integral') P2.path(sePath(seSM), { color: 'var(--series-3)', width: 1.4, dash: '6 4' });
      P2.path(errPath(estHM), { color: 'var(--series-1)', width: 1.5 });
      if (mode === 'integral') P2.path(errPath(estSM), { color: 'var(--series-3)', width: 1.5 });
      const x1 = Math.log10(shown);
      P2.dot(x1, Math.log10(Math.max(1e-300, Math.abs(estHM(shown) - exact))), { r: 3.5, color: 'var(--series-1)' });
      if (mode === 'integral') P2.dot(x1, Math.log10(Math.max(1e-300, Math.abs(estSM(shown) - exact))), { r: 3.5, color: 'var(--series-3)' });
      P2.tex(xMax * 0.55, Math.log10(seHM / Math.sqrt(Math.pow(10, xMax * 0.55))), '\\propto 1/\\sqrt{n}', { anchor: 'start', dx: 4, dy: -16, size: 12, color: 'var(--ink-2)', w: 90, h: 20 });
    }
    function draw() {
      drawScatter();
      drawErrors();
      cv.redraw();
      const k = shown;
      const items = mode === 'pi'
        ? [{ label: T('inside the quarter circle'), color: colHit, kind: 'dot' }, { label: T('outside'), color: colMiss, kind: 'dot' },
          { label: T('|error| of the estimate'), color: 'var(--series-1)' }, { label: T('standard error'), color: 'var(--series-1)', kind: 'dash' }]
        : [{ label: T('under the curve (counts +1)'), color: colHit, kind: 'dot' }, ylo < 0 ? { label: T('above the curve where f < 0 (counts −1)'), color: colNeg, kind: 'dot' } : null,
          { label: T('|error|: hit or miss'), color: 'var(--series-1)' }, { label: T('|error|: sample mean'), color: 'var(--series-3)' }, { label: T('standard errors'), color: 'var(--ink-3)', kind: 'dash' }];
      legend(leg, items);
      if (mode === 'pi') {
        const est = estHM(k);
        info.set({ tex: '\\hat\\pi = 4\\cdot\\frac{' + cum[k] + '}{' + k + '} = ' + tn(est, 6) },
          MA.ui.kv(T('error'), fmt(est - Math.PI, 3)), MA.ui.kv(T('standard error'), fmt(seHM / Math.sqrt(k), 3)), MA.ui.kv('n =', String(k), true));
      } else {
        const h = estHM(k), sm = estSM(k);
        info.set({ tex: '\\int_{' + aTeX + '}^{' + bTeX + '} ' + fTeX + '\\,dx = ' + tn(exact, 6) },
          MA.ui.kv(T('hit or miss'), fmt(h, 5) + ' (' + T('error') + ' ' + fmt(h - exact, 2) + ')'),
          MA.ui.kv(T('sample mean'), fmt(sm, 5) + ' (' + T('error') + ' ' + fmt(sm - exact, 2) + ')'), MA.ui.kv('n =', String(k), true));
      }
    }
    const safeDraw = guard(draw, report);
    const anim = MA.anim((dt) => {
      t += dt;
      const target = Math.max(1, Math.min(n, Math.round(Math.pow(n, Math.min(1, t / 6)))));
      if (target !== shown) {
        const grow = target > shown;
        shown = target;
        try {
          drawErrors();
          if (grow && drawn > 0) { cv.resize(); paint(cv.ctx, cv.scale); } else cv.redraw();
          const k = shown;
          if (mode === 'pi') info.set({ tex: '\\hat\\pi = 4\\cdot\\frac{' + cum[k] + '}{' + k + '} = ' + tn(estHM(k), 6) }, MA.ui.kv(T('error'), fmt(estHM(k) - Math.PI, 3)), MA.ui.kv('n =', String(k), true));
          else info.set(MA.ui.kv(T('hit or miss'), fmt(estHM(k), 5)), MA.ui.kv(T('sample mean'), fmt(estSM(k), 5)), MA.ui.kv('n =', String(k), true));
        } catch (e) { report(e); animating = false; play.set(false); return false; }
      }
      if (shown >= n) { animating = false; play.set(false); safeDraw(); return false; }
      return true;
    });
    const play = playButton(bar, guard(() => {
      if (animating) { animating = false; anim.stop(); play.set(false); return; }
      shown = 1; t = 0; drawn = 0;
      animating = true; play.set(true); draw(); anim.play();
    }, report));
    pauseOffscreen(stage, anim, () => animating);
    MA.ui.button(bar, { label: T('New sample'), onClick: guard(() => { seed = nextSeed(); compute(); if (!animating) shown = n; draw(); }, report) });
    logSlider(bar, { label: 'n', min: 10, max: NMAX, value: n, int: true, fmt: (v) => String(v),
      onInput: guard((v) => { n = clamp(v, 10, NMAX); animating = false; anim.stop(); play.set(false); shown = n; draw(); }, report) });
    compute();
    draw();
  });

  // ================================================================== galton
  MA.widget('galton', (stage, cfg) => {
    let R = clamp(C.int(cfg.rows, 10), 1, 24);
    let total = clamp(C.int(cfg.balls, 300), 1, 5000);
    let p = C.num(cfg.p, 0.5);
    if (!(p >= 0 && p <= 1)) throw new Error('p must be between 0 and 1');
    let seed = firstSeed(4);

    MA.ui.title(stage, cfg.title);
    const leg = legendBox(stage);
    const Pl = mkPlot(stage, 640, 470, { x: [0, 1], y: [0, 1], grid: false, axes: false, pad: [0, 0, 0, 0], label: T('Galton board') });
    const bar = MA.ui.bar(stage);
    const bar2 = MA.ui.bar(stage);
    const info = MA.ui.info(stage);
    const read = Pl.readout();
    const report = (e) => info.set(el('span', { class: 'w-err', text: T('Could not update the figure: %s', e.message) }));
    legend(leg, [
      { label: T('balls in each bin'), color: 'var(--series-1)', kind: 'swatch', opacity: 0.6 },
      { label: T('expected counts (binomial)'), color: 'var(--series-2)', kind: 'dot' },
      { label: T('normal curve'), color: 'var(--ink-2)', kind: 'dash' },
    ]);

    let G = null;            // geometry (viewBox pixels, y downwards)
    let dec = null, bins = null, counts = null;
    let next = 0, landed = 0, clock = 0, spawnAcc = 0;
    let active = [];         // balls in flight {i, t}
    let unit = 1;
    const gStatic = el('g'), gBars = el('g'), gExp = el('g'), gBalls = el('g');
    Pl.layers.fill.append(gBars);
    Pl.layers.marks.append(gStatic);
    Pl.layers.labels.append(gExp);
    Pl.layers.top.append(gBalls);
    let barEls = [], ballEls = [];

    function layout() {
      const W = Pl.W, H = Pl.H;
      const dx = Math.min(44, (W - 24) / (R + 1));
      const pinTop = 52;
      const dy = Math.min(dx * 0.86, (H * 0.47) / Math.max(R, 1));
      const binTop = pinTop + (R - 1) * dy + Math.max(14, dy * 0.8);
      const binBot = H - 24;
      G = { W, H, dx, dy, pinTop, binTop, binBot, cx: W / 2, pinR: Math.max(1.6, Math.min(3.4, dx * 0.085)), ballR: Math.max(2.2, Math.min(5.5, dx * 0.15)) };
    }
    const pinX = (r, j) => G.cx + (j - r / 2) * G.dx;
    const pinY = (r) => G.pinTop + r * G.dy;
    const binX = (k) => G.cx + (k - R / 2) * G.dx;
    const expected = () => { const out = []; for (let k = 0; k <= R; k++) out.push(total * D.binomial.pdf(k, { n: R, p })); return out; };

    function reset() {
      layout();
      const r = MA.num.rng(seed);
      dec = new Uint8Array(total * R);
      bins = new Int16Array(total);
      for (let i = 0; i < total; i++) {
        let k = 0;
        for (let j = 0; j < R; j++) { const d = r() < p ? 1 : 0; dec[i * R + j] = d; k += d; }
        bins[i] = k;
      }
      counts = new Float64Array(R + 1);
      next = 0; landed = 0; clock = 0; spawnAcc = 0; active = [];
      const ex = expected();
      unit = (G.binBot - G.binTop - 8) / Math.max(1, Math.max(...ex) * 1.18);
      drawStatic();
      updateBars();
      drawBalls();
      updateInfo();
    }
    function drawStatic() {
      gStatic.replaceChildren(); gExp.replaceChildren();
      const ink3 = 'var(--ink-3)';
      // funnel
      const fx = G.cx, fy = G.pinTop - 26;
      gStatic.append(el('path', { d: `M${fx - 26},${fy - 18}L${fx - 6},${fy}M${fx + 26},${fy - 18}L${fx + 6},${fy}`, style: 'stroke:' + ink3 + ';stroke-width:2;fill:none;stroke-linecap:round' }));
      // pins
      let d = '';
      for (let r = 0; r < R; r++) for (let j = 0; j <= r; j++) { const x = pinX(r, j), y = pinY(r); d += `M${(x - G.pinR).toFixed(1)},${y.toFixed(1)}a${G.pinR},${G.pinR} 0 1,0 ${2 * G.pinR},0a${G.pinR},${G.pinR} 0 1,0 ${-2 * G.pinR},0`; }
      gStatic.append(el('path', { d, style: 'fill:var(--ink-2)' }));
      // bin walls and floor
      let w = '';
      for (let k = 0; k <= R + 1; k++) { const x = binX(k) - G.dx / 2; w += `M${x.toFixed(1)},${G.binTop.toFixed(1)}V${G.binBot.toFixed(1)}`; }
      w += `M${(binX(0) - G.dx / 2).toFixed(1)},${G.binBot.toFixed(1)}H${(binX(R) + G.dx / 2).toFixed(1)}`;
      gStatic.append(el('path', { d: w, style: 'stroke:' + ink3 + ';stroke-width:1.2;fill:none' }));
      // bin labels
      const every = R > 16 ? 2 : 1;
      for (let k = 0; k <= R; k += every) gStatic.append(el('text', { class: 'lbl', x: binX(k), y: G.binBot + 15, 'text-anchor': 'middle', style: 'fill:var(--ink-3);font-weight:500;font-size:11px', text: String(k) }));
      // expected counts (binomial) and the normal curve with the same mean and variance
      const ex = expected();
      const pts = ex.map((e, k) => [binX(k), G.binBot - e * unit]);
      gExp.append(el('path', { d: 'M' + pts.map((q) => q[0].toFixed(1) + ',' + q[1].toFixed(1)).join('L'), style: 'stroke:var(--series-2);stroke-width:1.4;fill:none;opacity:.7' }));
      pts.forEach((q) => gExp.append(el('circle', { cx: q[0], cy: q[1], r: 3.2, style: 'fill:var(--series-2);stroke:var(--plot-bg);stroke-width:1.2' })));
      const sd = Math.sqrt(R * p * (1 - p));
      if (sd > 0) {
        let c = '';
        for (let i = 0; i <= 240; i++) {
          const k = -0.5 + (R + 1) * i / 240;
          const y = G.binBot - unit * total * PR.dnorm((k - R * p) / sd) / sd;
          c += (i ? 'L' : 'M') + binX(k).toFixed(1) + ',' + Math.max(G.binTop - 6, y).toFixed(1);
        }
        gExp.append(el('path', { d: c, style: 'stroke:var(--ink-2);stroke-width:1.5;fill:none;stroke-dasharray:6 4' }));
      }
      // bars
      gBars.replaceChildren();
      barEls = [];
      for (let k = 0; k <= R; k++) {
        const r = el('rect', { x: binX(k) - G.dx * 0.4, width: G.dx * 0.8, y: G.binBot, height: 0, style: 'fill:var(--series-1);fill-opacity:.55;stroke:var(--series-1);stroke-width:1' });
        gBars.append(r); barEls.push(r);
      }
    }
    function updateBars() {
      const mx = Math.max(...counts);
      if (mx * unit > G.binBot - G.binTop - 4) { unit = (G.binBot - G.binTop - 8) / (mx * 1.1); drawStatic(); }
      counts.forEach((c, k) => { const h = c * unit; barEls[k].setAttribute('y', (G.binBot - h).toFixed(1)); barEls[k].setAttribute('height', h.toFixed(1)); });
    }
    // position of ball i at time u (s) after it was released
    const TROW = 0.11, TIN = 0.22, TOUT = 0.3;
    function ballPos(i, u) {
      const top = (r) => pinY(r) - G.pinR - G.ballR;
      if (u < TIN) { const q = u / TIN; return [G.cx, G.pinTop - 30 + (top(0) - G.pinTop + 30) * q * q]; }
      u -= TIN;
      let j = 0;
      const r = Math.floor(u / TROW);
      for (let q = 0; q < Math.min(r, R); q++) j += dec[i * R + q];
      if (r < R) {
        const q = u / TROW - r, d = dec[i * R + r];
        const x0 = pinX(r, j), y0 = top(r);
        const x1 = x0 + (d ? 0.5 : -0.5) * G.dx;
        const y1 = r + 1 < R ? top(r + 1) : G.binTop;
        return [x0 + (x1 - x0) * q, y0 + (y1 - y0) * q - G.dy * 0.45 * 4 * q * (1 - q)];
      }
      const q = Math.min(1, (u - R * TROW) / TOUT);
      const yEnd = G.binBot - counts[bins[i]] * unit - G.ballR;
      return [binX(bins[i]), G.binTop + (Math.max(G.binTop, yEnd) - G.binTop) * q * q];
    }
    const flight = () => TIN + R * TROW + TOUT;
    function drawBalls() {
      while (ballEls.length < active.length) { const c = el('circle', { r: G.ballR, style: 'fill:var(--series-1);stroke:var(--plot-bg);stroke-width:1' }); gBalls.append(c); ballEls.push(c); }
      ballEls.forEach((c, k) => {
        if (k >= active.length) { c.setAttribute('visibility', 'hidden'); return; }
        const b = active[k];
        const [x, y] = ballPos(b.i, b.t);
        c.setAttribute('visibility', 'visible');
        c.setAttribute('r', G.ballR);
        c.setAttribute('cx', x.toFixed(1)); c.setAttribute('cy', y.toFixed(1));
      });
    }
    function land(i) { counts[bins[i]]++; landed++; }
    function updateInfo() {
      let m = 0, v = 0;
      for (let k = 0; k <= R; k++) m += k * counts[k];
      m /= Math.max(1, landed);
      for (let k = 0; k <= R; k++) v += counts[k] * (k - m) * (k - m);
      v /= Math.max(1, landed - 1);
      info.set(MA.ui.kv(T('balls'), landed + ' / ' + total),
        MA.ui.kv(T('mean bin'), landed ? fmt(m, 3) : '–'), MA.ui.kv('np =', fmt(R * p, 4), true),
        MA.ui.kv(T('variance'), landed > 1 ? fmt(v, 3) : '–'), MA.ui.kv('np(1-p) =', fmt(R * p * (1 - p), 4), true));
    }
    let playing = false;
    const anim = MA.anim((dt) => {
      try {
        const spawnEvery = clamp(14 / total, 0.004, 0.09);
        spawnAcc += dt;
        while (spawnAcc >= spawnEvery && next < total) { active.push({ i: next++, t: 0 }); spawnAcc -= spawnEvery; }
        if (next >= total) spawnAcc = 0;
        let changed = false;
        const fl = flight();
        active.forEach((b) => { b.t += dt; });
        const still = [];
        active.forEach((b) => { if (b.t >= fl) { land(b.i); changed = true; } else still.push(b); });
        active = still;
        if (changed) { updateBars(); updateInfo(); }
        drawBalls();
        if (next >= total && !active.length) { playing = false; play.set(false); return false; }
        return true;
      } catch (e) { report(e); playing = false; play.set(false); return false; }
    });
    const play = playButton(bar, guard(() => {
      if (playing) { playing = false; anim.stop(); play.set(false); return; }
      if (landed >= total) { seed = nextSeed(); reset(); }
      playing = true; play.set(true); anim.play();
    }, report));
    MA.ui.button(bar, { label: T('Drop all'), onClick: guard(() => {
      anim.stop(); playing = false; play.set(false);
      active.forEach((b) => land(b.i)); active = [];
      while (next < total) land(next++);
      updateBars(); drawBalls(); updateInfo();
    }, report) });
    MA.ui.button(bar, { label: T('Reset'), onClick: guard(() => { seed = nextSeed(); reset(); }, report) });
    const restart = () => { reset(); };
    MA.ui.slider(bar2, { label: T('rows'), min: 1, max: 24, step: 1, value: R, fmt: (v) => String(v), onInput: guard((v) => { R = v; restart(); }, report) });
    MA.ui.slider(bar2, { label: 'p', min: 0, max: 1, step: 0.01, value: p, onInput: guard((v) => { p = v; restart(); }, report) });
    logSlider(bar2, { label: T('balls'), min: 10, max: 5000, value: total, int: true, fmt: (v) => String(v), onInput: guard((v) => { total = clamp(v, 1, 5000); restart(); }, report) });
    Pl.onHover(guard((x, y) => {
      if (x === null || !G) { read(null); return; }
      const k = Math.round((x - G.cx) / G.dx + R / 2);
      if (k < 0 || k > R || (Pl.H - y) < G.binTop - 10) { read(null); return; }
      read(T('bin %d: %d balls', k, counts[k]) + '   ' + T('expected') + ' ' + fmt(expected()[k], 3));
    }));
    reset();
    pauseOffscreen(stage, anim, () => playing);
    if (!anim.reduce) { playing = true; play.set(true); anim.play(); }
  });

  // ================================================================== markov
  /** Solve A x = b by Gaussian elimination with partial pivoting; null if (nearly) singular. */
  function solve(A, b) {
    const n = A.length, M = A.map((r, i) => r.concat([b[i]]));
    for (let c = 0; c < n; c++) {
      let piv = c;
      for (let r = c + 1; r < n; r++) if (Math.abs(M[r][c]) > Math.abs(M[piv][c])) piv = r;
      if (Math.abs(M[piv][c]) < 1e-12) return null;
      [M[c], M[piv]] = [M[piv], M[c]];
      for (let r = 0; r < n; r++) {
        if (r === c) continue;
        const f = M[r][c] / M[c][c];
        if (f) for (let k = c; k <= n; k++) M[r][k] -= f * M[c][k];
      }
    }
    return M.map((r, i) => r[n] / r[i]);
  }
  const gcd = (x, y) => { x = Math.abs(x); y = Math.abs(y); while (y) [x, y] = [y, x % y]; return x; };
  /** Structure of a chain: communicating classes, closed classes, period of each state's class. */
  function chainInfo(P) {
    const n = P.length;
    const R = P.map((r) => r.map((v) => v > 0));
    for (let i = 0; i < n; i++) R[i][i] = true;
    for (let k = 0; k < n; k++) for (let i = 0; i < n; i++) if (R[i][k]) for (let j = 0; j < n; j++) if (R[k][j]) R[i][j] = true;
    const cls = new Array(n).fill(-1), classes = [];
    for (let i = 0; i < n; i++) {
      if (cls[i] >= 0) continue;
      const c = [];
      for (let j = 0; j < n; j++) if (R[i][j] && R[j][i]) { cls[j] = classes.length; c.push(j); }
      classes.push(c);
    }
    const closed = classes.map((c) => c.every((i) => P[i].every((v, j) => v <= 0 || c.includes(j))));
    const period = classes.map((c) => {
      const lvl = {}; lvl[c[0]] = 0;
      const q = [c[0]];
      let g = 0;
      while (q.length) {
        const u = q.shift();
        for (const v of c) {
          if (!(P[u][v] > 0)) continue;
          if (lvl[v] === undefined) { lvl[v] = lvl[u] + 1; q.push(v); } else g = gcd(g, lvl[u] + 1 - lvl[v]);
        }
      }
      return g || 1;
    });
    return { cls, classes, closed, period, irreducible: classes.length === 1 };
  }
  /** Stationary distribution of a closed class (as a full-length vector). */
  function classStationary(P, c) {
    const m = c.length;
    const A = [], b = [];
    for (let i = 0; i < m; i++) { A.push(c.map((_, j) => P[c[j]][c[i]] - (i === j ? 1 : 0))); b.push(0); }
    A[m - 1] = new Array(m).fill(1); b[m - 1] = 1;
    const x = solve(A, b) || new Array(m).fill(1 / m);
    const out = new Array(P.length).fill(0);
    c.forEach((s, i) => { out[s] = Math.max(0, x[i]); });
    return out;
  }
  /** Long-run (Cesàro) distribution from state s: Σ over closed classes of P(absorbed there) × its stationary law. */
  function longRun(P, info, s) {
    const n = P.length;
    const trans = [];
    for (let i = 0; i < n; i++) if (!info.closed[info.cls[i]]) trans.push(i);
    const out = new Array(n).fill(0);
    info.classes.forEach((c, k) => {
      if (!info.closed[k]) return;
      let h;
      if (info.cls[s] === k) h = 1;
      else if (info.closed[info.cls[s]]) h = 0;
      else {
        // absorption probabilities into class k: (I − Q) h = r
        const A = trans.map((i) => trans.map((j) => (i === j ? 1 : 0) - P[i][j]));
        const bb = trans.map((i) => c.reduce((acc, j) => acc + P[i][j], 0));
        const x = solve(A, bb);
        h = x ? x[trans.indexOf(s)] : 0;
      }
      if (h > 0) { const pi = classStationary(P, c); for (let j = 0; j < n; j++) out[j] += h * pi[j]; }
    });
    return out;
  }

  MA.widget('markov', (stage, cfg) => {
    if (!C.has(cfg.matrix)) throw new Error('markov needs a transition matrix, e.g. matrix: 0.9,0.1; 0.5,0.5');
    const raw = C.list(cfg.matrix).map((r) => r.split(',').map((q) => q.trim()));
    const P = raw.map((r) => r.map((q) => C.num(q)));
    const n = P.length;
    // entries as the author wrote them ("0.9", "1/3"), for labels
    const rawTeX = (q, v) => { const m = /^(\d+)\s*\/\s*(\d+)$/.exec(q); return m ? '\\tfrac{' + m[1] + '}{' + m[2] + '}' : /^[\d.]+$/.test(q) ? q : tn(v, 3); };
    const rawTxt = (q, v) => (/^[\d./]+$/.test(q) && q.length <= 6 ? q : MA.fmt(v, 3));
    if (n < 1 || n > 10) throw new Error('the matrix must have between 1 and 10 rows');
    P.forEach((r, i) => {
      if (r.length !== n) throw new Error('the matrix must be square: row ' + (i + 1) + ' has ' + r.length + ' entries, expected ' + n);
      if (r.some((v) => !(v >= 0))) throw new Error('transition probabilities must be ≥ 0 (row ' + (i + 1) + ')');
      const sum = r.reduce((x, y) => x + y, 0);
      if (Math.abs(sum - 1) > 2e-3) throw new Error('row ' + (i + 1) + ' sums to ' + MA.fmt(sum, 6) + ', not 1');
      for (let j = 0; j < n; j++) r[j] /= sum;
    });
    const names = C.list(cfg.states);
    if (names.length && names.length !== n) throw new Error('states gives ' + names.length + ' names for ' + n + ' states');
    const name = (i) => names[i] || String.fromCharCode(65 + i);
    let start = clamp(C.int(cfg.start, 0), 0, n - 1);
    let steps = clamp(C.int(cfg.steps, 20), 0, 1000);
    const info0 = chainInfo(P);
    let walkSeed = firstSeed(5), rnd = MA.num.rng(walkSeed);
    let cur = start, prev = -1, path = [start], visits = new Array(n).fill(0), tWalk = 0;
    visits[start] = 1;

    MA.ui.title(stage, cfg.title);
    const rw = row(stage);
    const pa = panel(rw, T('State diagram'));
    const pb = panel(rw, T('Distribution of the chain'));
    const P1 = mkPlot(pa, 400, n <= 2 ? 250 : 330, { x: [0, 1], y: [0, 1], grid: false, axes: false, pad: [0, 0, 0, 0], label: T('State diagram of the Markov chain') });
    const leg = legendBox(pb);
    const P2 = mkPlot(pb, 400, 300, { x: [0, 1], y: [0, 1], grid: false, axes: false, pad: [12, 10, 26, 38], label: T('Distribution after n steps and stationary distribution') });
    const bar = MA.ui.bar(stage);
    const bar2 = MA.ui.bar(stage);
    const info = MA.ui.info(stage);
    const winfo = MA.ui.info(stage);
    const report = (e) => info.set(el('span', { class: 'w-err', text: T('Could not update the figure: %s', e.message) }));

    // ---- diagram geometry (viewBox pixels)
    const W = P1.W, H = P1.H, cx = W / 2, cy = H / 2 + 4;
    const maxLen = Math.max(...Array.from({ length: n }, (_, i) => name(i).length));
    const rho = n === 1 ? 0 : n === 2 ? W * 0.27 : Math.min(W, H) * 0.32;
    const chord = n <= 1 ? 200 : 2 * rho * Math.sin(Math.PI / n);
    const rad = clamp(Math.max(19, 9 + 3.6 * maxLen), 16, Math.min(34, chord * 0.3));
    const font = clamp((2 * rad - 6) / (0.62 * Math.max(1, maxLen)), 8, 13);
    const a0 = n % 2 ? -Math.PI / 2 : -Math.PI / 2 - Math.PI / n;
    const pos = Array.from({ length: n }, (_, i) => (n === 1 ? [cx, cy + 18] : [cx + rho * Math.cos(a0 + 2 * Math.PI * i / n), cy + rho * Math.sin(a0 + 2 * Math.PI * i / n)]));
    const gEdges = el('g'), gNodes = el('g');
    P1.layers.curves.append(gEdges);
    P1.layers.top.append(gNodes);
    const edgeEls = {};
    const nodeEls = [];
    function arrowHead(tip, dir, w) {
      const L = 7 + w * 1.6, Wd = 4 + w * 1.1;
      const bx = tip[0] - dir[0] * L, by = tip[1] - dir[1] * L;
      return 'M' + tip[0].toFixed(1) + ',' + tip[1].toFixed(1) + 'L' + (bx - dir[1] * Wd).toFixed(1) + ',' + (by + dir[0] * Wd).toFixed(1) + 'L' + (bx + dir[1] * Wd).toFixed(1) + ',' + (by - dir[0] * Wd).toFixed(1) + 'Z';
    }
    const unit = (x, y) => { const l = Math.hypot(x, y) || 1; return [x / l, y / l]; };
    function buildDiagram() {
      for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
        const pij = P[i][j];
        if (!(pij > 0)) continue;
        const w = 1 + 3.2 * pij;
        let d, head, lab;
        if (i === j) {
          const out = n === 1 ? [0, -1] : unit(pos[i][0] - cx, pos[i][1] - cy);
          const th = Math.atan2(out[1], out[0]);
          const c = pos[i];
          const pt = (ang, r) => [c[0] + r * Math.cos(ang), c[1] + r * Math.sin(ang)];
          const s0 = pt(th - 0.55, rad), e0 = pt(th + 0.55, rad + 1);
          const k1 = pt(th - 0.75, rad * 2.6), k2 = pt(th + 0.75, rad * 2.6);
          const dir = unit(e0[0] - k2[0], e0[1] - k2[1]);
          const e1 = [e0[0] - dir[0] * (5 + w), e0[1] - dir[1] * (5 + w)];
          d = `M${s0[0].toFixed(1)},${s0[1].toFixed(1)}C${k1[0].toFixed(1)},${k1[1].toFixed(1)} ${k2[0].toFixed(1)},${k2[1].toFixed(1)} ${e1[0].toFixed(1)},${e1[1].toFixed(1)}`;
          head = arrowHead(e0, dir, w);
          lab = pt(th, rad * 2.35 + 9);
        } else {
          const A = pos[i], B = pos[j];
          const both = P[j][i] > 0;
          const L = Math.hypot(B[0] - A[0], B[1] - A[1]);
          const u = unit(B[0] - A[0], B[1] - A[1]), nrm = [u[1], -u[0]];
          const bend = both ? 0.17 * L : 0;
          const Cc = [(A[0] + B[0]) / 2 + nrm[0] * bend, (A[1] + B[1]) / 2 + nrm[1] * bend];
          const s0d = unit(Cc[0] - A[0], Cc[1] - A[1]), e0d = unit(Cc[0] - B[0], Cc[1] - B[1]);
          const s0 = [A[0] + s0d[0] * (rad + 1), A[1] + s0d[1] * (rad + 1)];
          const tip = [B[0] + e0d[0] * (rad + 1.5), B[1] + e0d[1] * (rad + 1.5)];
          const dir = unit(tip[0] - Cc[0], tip[1] - Cc[1]);
          const e1 = [tip[0] - dir[0] * (5 + w), tip[1] - dir[1] * (5 + w)];
          d = `M${s0[0].toFixed(1)},${s0[1].toFixed(1)}Q${Cc[0].toFixed(1)},${Cc[1].toFixed(1)} ${e1[0].toFixed(1)},${e1[1].toFixed(1)}`;
          head = arrowHead(tip, dir, w);
          const mid = [0.25 * s0[0] + 0.5 * Cc[0] + 0.25 * tip[0], 0.25 * s0[1] + 0.5 * Cc[1] + 0.25 * tip[1]];
          const off = both ? 11 : 10;
          lab = [mid[0] + nrm[0] * off, mid[1] + nrm[1] * off];
        }
        const g = el('g');
        const line = el('path', { d, style: 'fill:none;stroke-width:' + w.toFixed(2) + ';stroke-linecap:butt' });
        const hd = el('path', { d: head });
        const tx = el('text', { class: 'lbl', x: lab[0].toFixed(1), y: (lab[1] + 4).toFixed(1), 'text-anchor': 'middle', style: 'font-size:11px', text: rawTxt(raw[i][j], pij) });
        g.append(line, hd, tx);
        gEdges.append(g);
        edgeEls[i + ',' + j] = { line, hd, tx };
      }
      for (let i = 0; i < n; i++) {
        const c = el('circle', { cx: pos[i][0], cy: pos[i][1], r: rad, style: 'stroke-width:1.8' });
        const t = el('text', { x: pos[i][0], y: pos[i][1] + font * 0.36, 'text-anchor': 'middle', style: 'font-family:var(--font);font-weight:600;font-size:' + font.toFixed(1) + 'px', text: name(i) });
        const g = el('g', { style: 'cursor:pointer' }, c, t);
        g.addEventListener('click', guard(() => { start = i; startSel.set(String(i)); resetWalk(); draw(); }, report));
        gNodes.append(g);
        nodeEls.push({ c, t });
      }
    }
    function styleDiagram() {
      Object.entries(edgeEls).forEach(([k, e]) => {
        const hot = k === prev + ',' + cur && prev >= 0;
        const col = hot ? 'var(--accent)' : 'var(--ink-3)';
        e.line.style.stroke = col;
        e.hd.style.fill = col;
        e.tx.style.fill = hot ? 'var(--accent)' : 'var(--ink-2)';
      });
      nodeEls.forEach((nd, i) => {
        const on = i === cur;
        nd.c.style.fill = on ? 'var(--accent)' : 'var(--plot-bg)';
        nd.c.style.stroke = on ? 'var(--accent)' : 'var(--ink-2)';
        nd.t.style.fill = on ? 'var(--plot-bg)' : 'var(--ink)';
      });
    }

    // ---- distributions
    const step = (mu) => { const out = new Array(n).fill(0); for (let i = 0; i < n; i++) if (mu[i]) for (let j = 0; j < n; j++) out[j] += mu[i] * P[i][j]; return out; };
    const muAfter = (k) => { let mu = new Array(n).fill(0); mu[start] = 1; for (let t = 0; t < k; t++) mu = step(mu); return mu; };
    let pi = null, piUnique = true;
    function stationary() {
      const A = [], b = [];
      for (let i = 0; i < n; i++) { A.push(P.map((r, j) => r[i] - (i === j ? 1 : 0))); b.push(0); }
      A[n - 1] = new Array(n).fill(1); b[n - 1] = 1;
      const x = solve(A, b);
      if (x && x.every((v) => v > -1e-9)) { piUnique = true; return x.map((v) => Math.max(0, v)); }
      piUnique = false;
      return longRun(P, info0, start);
    }
    const vecTeX = (v, exact) => '\\left(' + v.map((x) => (exact && frac(x)) || tn(Math.abs(x) < 5e-13 ? 0 : x, 3)).join(',\\ ') + '\\right)';
    let yTop = null;
    function drawBars(mu) {
      const vals = mu.concat(pi, path.length > 1 ? visits.map((v) => v / path.length) : []);
      const target = [0, clamp(Math.max(...vals) * 1.18, 0.2, 1.08)];
      yTop = sticky(yTop, target, 0.5);
      P2.setView([-0.55, n - 0.45], yTop);
      frame(P2, { x: 'none' });
      P2.clear();
      const walkOn = path.length > 1;
      const w = walkOn ? 0.25 : 0.36;
      const r1 = [], r2 = [], r3 = [];
      for (let j = 0; j < n; j++) {
        if (walkOn) { r1.push([j - 0.39, 0, j - 0.14, mu[j]]); r2.push([j - 0.12, 0, j + 0.12, pi[j]]); r3.push([j + 0.14, 0, j + 0.39, visits[j] / path.length]); }
        else { r1.push([j - 0.38, 0, j - 0.02, mu[j]]); r2.push([j + 0.02, 0, j + 0.38, pi[j]]); }
        P2.text(j, yTop[0], name(j).length > 9 ? name(j).slice(0, 8) + '…' : name(j), { anchor: 'middle', dy: 16, size: 11, color: j === cur ? 'var(--accent)' : 'var(--ink-2)' });
      }
      void w;
      bars(P2, r1, { color: 'var(--series-1)', fillOpacity: 0.75 });
      bars(P2, r2, { color: 'var(--series-2)', fillOpacity: 0.75 });
      if (walkOn) bars(P2, r3, { color: 'var(--series-3)', fillOpacity: 0.75 });
      legend(leg, [
        { label: T('after n = %d steps', steps), color: 'var(--series-1)', kind: 'swatch' },
        { label: piUnique ? T('stationary π') : T('long-run limit'), color: 'var(--series-2)', kind: 'swatch' },
        walkOn ? { label: T('time spent by the walk'), color: 'var(--series-3)', kind: 'swatch' } : null,
      ]);
    }
    function draw() {
      pi = stationary();
      const mu = muAfter(steps);
      styleDiagram();
      drawBars(mu);
      const tv = 0.5 * mu.reduce((acc, v, j) => acc + Math.abs(v - pi[j]), 0);
      const parts = [];
      if (n <= 6) parts.push({ tex: 'P = \\begin{pmatrix}' + P.map((r, i) => r.map((v, j) => rawTeX(raw[i][j], v)).join(' & ')).join(' \\\\ ') + '\\end{pmatrix}' });
      parts.push({ tex: '\\mu_{' + steps + '} = ' + vecTeX(mu, false) });
      parts.push({ tex: (piUnique ? '\\pi' : '\\lim') + ' = ' + vecTeX(pi, true) });
      parts.push(MA.ui.kv('\\|\\mu_n - \\pi\\|_{TV} =', fmt(tv < 1e-15 ? 0 : tv, 3), true));
      info.set(...parts);
      const k = info0.cls[start];
      let note;
      if (info0.irreducible && info0.period[0] === 1) note = T('Irreducible and aperiodic: the distribution after n steps tends to π from every start.');
      else if (info0.irreducible) note = T('Irreducible with period %d: the distribution keeps cycling, but the fraction of time in each state still tends to π.', info0.period[0]);
      else if (piUnique) note = T('Not irreducible: the chain eventually leaves its transient states for good, so π is zero on them.');
      else note = T('Several closed classes: the long-run behaviour depends on the start state (absorption probabilities).');
      if (!info0.irreducible && info0.closed[k] && info0.period[k] > 1) note += MA.sep + T('The class of the start state has period %d.', info0.period[k]);
      const tail = path.slice(-14).map(name);
      const walkLine = el('span', { class: 'w-pr-walk' });
      walkLine.append(T('walk, step %d:', path.length - 1) + ' ' + (path.length > 14 ? '… → ' : ''));
      tail.forEach((s, i) => { if (i) walkLine.append(' → '); walkLine.append(i === tail.length - 1 ? el('b', { text: s }) : s); });
      winfo.set(el('span', { class: 'w-pr-note', text: note }), walkLine);
    }
    function walkStep() {
      const r = rnd();
      let acc = 0, nxt = n - 1;
      for (let j = 0; j < n; j++) { acc += P[cur][j]; if (r < acc) { nxt = j; break; } }
      prev = cur; cur = nxt; path.push(cur); visits[cur]++;
    }
    function resetWalk() { rnd = MA.num.rng(walkSeed = nextSeed()); cur = start; prev = -1; path = [start]; visits = new Array(n).fill(0); visits[start] = 1; }

    let playing = false, acc = 0;
    const anim = MA.anim((dt) => {
      acc += dt;
      if (acc >= 0.5) { acc = 0; try { walkStep(); draw(); } catch (e) { report(e); playing = false; play.set(false); return false; } }
      return true;
    });
    MA.ui.button(bar, { label: T('Step'), onClick: guard(() => { walkStep(); draw(); }, report) });
    const play = playButton(bar, guard(() => {
      playing = !playing; play.set(playing);
      if (playing) { acc = 0.5; anim.play(); } else anim.stop();
    }, report));
    MA.ui.button(bar, { label: T('×100'), onClick: guard(() => { for (let k = 0; k < 100; k++) walkStep(); draw(); }, report) });
    MA.ui.button(bar, { label: T('Reset walk'), onClick: guard(() => { resetWalk(); draw(); }, report) });
    const startSel = MA.ui.select(bar, { label: T('Start'), value: String(start), options: Array.from({ length: n }, (_, i) => [String(i), name(i)]),
      onChange: guard((v) => { start = +v; resetWalk(); draw(); }, report) });
    MA.ui.slider(bar2, { label: T('steps n'), min: 0, max: Math.max(50, steps), step: 1, value: steps, fmt: (v) => String(v), onInput: guard((v) => { steps = v; draw(); }, report) });
    pauseOffscreen(stage, anim, () => playing);
    buildDiagram();
    draw();
  });

  // ================================================================== hypothesis
  MA.widget('hypothesis', (stage, cfg) => {
    let test = C.str(cfg.test, 'z');
    if (test !== 'z' && test !== 't') throw new Error('test must be z or t');
    let tail = C.str(cfg.tail, 'two');
    if (!['two', 'right', 'left'].includes(tail)) throw new Error('tail must be two, right or left');
    let alpha = C.num(cfg.alpha, 0.05);
    if (!(alpha > 0 && alpha < 1)) throw new Error('alpha must be between 0 and 1');
    let d = C.num(cfg.effect, 0.5);
    if (!(Math.abs(d) <= 10)) throw new Error('effect must be between −10 and 10');
    let n = clamp(C.int(cfg.n, 20), 2, 5000);
    let showObs = C.has(cfg.observed);
    let obs = showObs ? C.num(cfg.observed) : NaN;
    let curveBy = 'n';

    const df = () => n - 1;
    const delta = () => d * Math.sqrt(n);
    const pdf0 = (x) => (test === 'z' ? PR.dnorm(x) : PR.dt(x, df()));
    const cdf0 = (x) => (test === 'z' ? PR.pnorm(x) : PR.pt(x, df()));
    const sf0 = (x) => (test === 'z' ? PR.pnormUpper(x) : PR.pt(x, df(), true));
    const q0 = (p) => (test === 'z' ? PR.qnorm(p) : PR.qt(p, df()));
    const pdf1exact = (x) => (test === 'z' ? PR.dnorm(x - delta()) : PR.dnt(x, df(), delta()));
    let pdf1 = pdf1exact;
    const cdf1 = (x) => (test === 'z' ? PR.pnorm(x - delta()) : PR.pnt(x, df(), delta()));
    const sf1 = (x) => (test === 'z' ? PR.pnormUpper(x - delta()) : 1 - PR.pnt(x, df(), delta()));
    /** Critical values [lower, upper] of the rejection region (±∞ when one-sided). */
    function crit() {
      if (tail === 'right') return [-Infinity, -q0(alpha)];
      if (tail === 'left') return [q0(alpha), Infinity];
      const c = -q0(alpha / 2);
      return [-c, c];
    }
    /** Power for given n and d (closed form for z, noncentral t for t). */
    function powerAt(nn, dd) {
      const dl = dd * Math.sqrt(nn), f = nn - 1;
      const qq = (p) => (test === 'z' ? PR.qnorm(p) : PR.qt(p, f));
      const F1 = (x) => (test === 'z' ? PR.pnorm(x - dl) : PR.pnt(x, f, dl));
      const S1 = (x) => (test === 'z' ? PR.pnormUpper(x - dl) : 1 - PR.pnt(x, f, dl));
      if (tail === 'right') return S1(-qq(alpha));
      if (tail === 'left') return F1(qq(alpha));
      const c = -qq(alpha / 2);
      return S1(c) + F1(-c);
    }
    function pValue(x) {
      if (tail === 'right') return sf0(x);
      if (tail === 'left') return cdf0(x);
      return Math.min(1, 2 * sf0(Math.abs(x)));
    }

    MA.ui.title(stage, cfg.title);
    const leg = legendBox(stage);
    const Pl = mkPlot(stage, 640, 330, { x: [-4, 4], y: [0, 0.5], grid: false, axes: false, label: T('Sampling distributions of the test statistic under H0 and H1') });
    const capPow = el('div', { class: 'w-pr-cap' });
    stage.append(capPow);
    const Pp = mkPlot(stage, 640, 150, { x: [0, 1], y: [0, 1], grid: false, axes: false, pad: [8, 12, 24, 36], label: T('Power curve') });
    const bar = MA.ui.bar(stage);
    const bar2 = MA.ui.bar(stage);
    const info = MA.ui.info(stage);
    const oinfo = MA.ui.info(stage);
    const read = Pl.readout();
    const report = (e) => info.set(el('span', { class: 'w-err', text: T('Could not update the figure: %s', e.message) }));
    let view = null, yv = null;
    const sym = () => (test === 'z' ? 'z' : 't');
    const critTeX = (a) => (test === 'z' ? 'z_{' + tn(a, 3) + '}' : 't_{' + tn(a, 3) + ',\\,' + df() + '}');

    function draw() {
      const dl = delta();
      const [cl, cu] = crit();
      const s1 = test === 'z' ? 1 : Math.sqrt(1 + dl * dl / (2 * Math.max(1, df())));
      const lo0 = Math.max(-8, test === 'z' ? -4 : q0(0.002)), hi0 = -lo0;
      const target = [Math.min(lo0, dl - 4 * s1), Math.max(hi0, dl + 4 * s1)];
      if (showObs && Number.isFinite(obs)) { target[0] = Math.min(target[0], obs - 0.5); target[1] = Math.max(target[1], obs + 0.5); }
      view = sticky(view, target, 0.6);
      // the noncentral t density costs two series evaluations: tabulate it once per redraw
      pdf1 = test === 'z' ? pdf1exact : tabulate(pdf1exact, view[0] - 0.01, view[1] + 0.01, 500);
      let pk0 = pdf0(0), pk1 = 0, m1 = dl;
      for (let i = 0; i <= 300; i++) { const x = view[0] + (view[1] - view[0]) * i / 300, v = pdf1(x); if (v > pk1) { pk1 = v; m1 = x; } }
      const pk = Math.max(pk0, pk1);
      if (!yv || pk > yv[1] / 1.12 || pk < yv[1] * 0.55) yv = [0, pk * 1.3];
      Pl.setView(view, yv);
      frame(Pl, { xLabel: sym() });
      Pl.clear();
      const X0 = view[0], X1 = view[1];
      const accLo = Math.max(X0, cl), accHi = Math.min(X1, cu);
      // β: acceptance region under H1 (hatched); power: rejection region under H1; α: rejection region under H0
      if (accHi > accLo) Pl.area(pdf1, accLo, accHi, { fill: hatch(Pl, 'var(--series-2)', 'beta'), opacity: 1, samples: 300 });
      const rej = [];
      if (cl > X0) rej.push([X0, Math.min(cl, X1)]);
      if (cu < X1) rej.push([Math.max(cu, X0), X1]);
      rej.forEach(([u, v]) => { if (v > u) { Pl.area(pdf1, u, v, { color: 'var(--series-2)', opacity: 0.28, samples: 200 }); Pl.area(pdf0, u, v, { color: 'var(--bad)', opacity: 0.45, samples: 200 }); } });
      // p-value of the observed statistic
      const pv = showObs && Number.isFinite(obs) ? pValue(obs) : NaN;
      if (showObs && Number.isFinite(obs)) {
        const regs = tail === 'right' ? [[obs, X1]] : tail === 'left' ? [[X0, obs]] : [[X0, -Math.abs(obs)], [Math.abs(obs), X1]];
        regs.forEach(([u, v]) => { u = Math.max(u, X0); v = Math.min(v, X1); if (v > u) Pl.area(pdf0, u, v, { color: 'var(--accent)', opacity: 0.5, samples: 200 }); });
      }
      Pl.fn(pdf0, { color: 'var(--series-1)', width: 2.4 });
      Pl.fn(pdf1, { color: 'var(--series-2)', width: 2.4 });
      const lab = labeler(Pl);
      // critical values
      [cl, cu].forEach((c, k) => {
        if (!Number.isFinite(c) || c < X0 || c > X1) return;
        Pl.line(c, 0, c, yv[1] * 0.86, { color: 'var(--ink-2)', width: 1.3, dash: '5 4', layer: 'marks' });
        const a = tail === 'two' ? alpha / 2 : alpha;
        const txt = (k === 0 ? '-' : '') + critTeX(a) + ' = ' + tn(c, 4);
        lab(c, yv[1] * 0.92, tail === 'two' && k === 0 ? tn(c, 4) : txt, { anchor: 'middle', size: 12, color: 'var(--ink-2)', w: 160, h: 22 });
      });
      // labels for the two curves, kept off the vertical lines
      const vlines = [cl, cu].concat(showObs && Number.isFinite(obs) ? [obs] : []).filter(Number.isFinite);
      const offLines = (x) => { for (const v of vlines) if (Math.abs(Pl.X(x) - Pl.X(v)) < 16) return x + (x >= v ? 1 : -1) * (18 / Pl.sx); return x; };
      const lab0x = offLines(0), lab1x = offLines(Math.abs(m1) < 0.9 ? (m1 >= 0 ? m1 + 1.1 : m1 - 1.1) : m1);
      lab(lab0x, pk0, 'H_0', { anchor: 'middle', dy: -12, size: 14, color: 'var(--series-1)', w: 40, h: 22, up: true });
      lab(lab1x, Math.max(pdf1(lab1x), pk1 * 0.6), 'H_1', { anchor: 'middle', dy: -12, size: 14, color: 'var(--series-2)', w: 40, h: 22, up: true });
      if (showObs && Number.isFinite(obs)) {
        Pl.line(obs, 0, obs, yv[1] * 0.72, { color: 'var(--accent)', width: 2, layer: 'marks' });
        lab(obs, yv[1] * 0.76, sym() + '_{\\text{obs}} = ' + tn(obs, 3), { anchor: obs > (view[0] + view[1]) / 2 ? 'start' : 'end', dx: obs > (view[0] + view[1]) / 2 ? 5 : -5, size: 12, color: 'var(--accent)', w: 120, h: 22 });
        hObs.x = clamp(obs, X0, X1); hObs.y = 0; hObs.redraw();
      }
      hObs.el.style.display = showObs ? '' : 'none';
      // numbers
      const pw = powerAt(n, d), beta = 1 - pw;
      legend(leg, [
        { label: T('under H₀'), color: 'var(--series-1)' }, { label: T('under H₁'), color: 'var(--series-2)' },
        { label: 'α', color: 'var(--bad)', kind: 'swatch', opacity: 0.6 }, { label: 'β', color: 'var(--series-2)', kind: 'hatch' },
        { label: T('power'), color: 'var(--series-2)', kind: 'swatch', opacity: 0.45 },
        showObs ? { label: T('p-value'), color: 'var(--accent)', kind: 'swatch', opacity: 0.7 } : null,
      ]);
      const h1 = tail === 'two' ? '\\ne' : tail === 'right' ? '>' : '<';
      const critStr = tail === 'two' ? '\\pm ' + tn(cu, 4) : tail === 'right' ? tn(cu, 4) : tn(cl, 4);
      info.set({ tex: 'H_0\\colon \\mu = \\mu_0,\\quad H_1\\colon \\mu ' + h1 + ' \\mu_0' },
        MA.ui.kv(test === 'z' ? '\\delta = d\\sqrt{n} =' : '\\delta = d\\sqrt{n} =', fmt(dl, 4), true),
        MA.ui.kv(T('reject when'), ''), { tex: (tail === 'two' ? '|' + sym() + '| > ' + tn(cu, 4) : sym() + (tail === 'right' ? ' > ' : ' < ') + critStr) },
        MA.ui.kv('\\alpha =', fmt(alpha, 3), true), MA.ui.kv('\\beta =', fmt(beta, 4), true), MA.ui.kv(T('power') + ' 1 − β =', fmt(pw, 4)));
      if (showObs && Number.isFinite(obs)) {
        const rejected = (tail === 'right' && obs > cu) || (tail === 'left' && obs < cl) || (tail === 'two' && Math.abs(obs) > cu);
        oinfo.set(MA.ui.kv(sym() + '_{\\text{obs}} =', fmt(obs, 4), true), MA.ui.kv(T('p-value'), fmt(pv, 4)),
          el('span', { class: rejected ? 'w-pr-bad' : 'w-pr-good', text: rejected ? T('p < α: reject H₀') : T('p ≥ α: do not reject H₀') }));
        show(oinfo.el, true);
      } else show(oinfo.el, false);
      drawPower(pw);
    }
    function drawPower(pw) {
      const byN = curveBy === 'n';
      const xMax = byN ? Math.max(60, Math.min(5000, Math.ceil(n * 2.2))) : 2;
      const xs = [];
      if (byN) { const st = Math.max(1, Math.ceil((xMax - 2) / 160)); for (let k = 2; k <= xMax; k += st) xs.push(k); if (xs[xs.length - 1] !== xMax) xs.push(xMax); }
      else for (let i = 0; i <= 160; i++) xs.push(-2 + 4 * i / 160);
      Pp.setView(byN ? [0, xMax] : [-2, 2], [0, 1.05]);
      frame(Pp, { xLabel: byN ? 'n' : 'd', yMax: 1 });
      Pp.clear();
      Pp.line(byN ? 0 : -2, 0.8, xMax, 0.8, { color: 'var(--ink-3)', width: 1, dash: '4 4' });
      Pp.line(byN ? 0 : -2, alpha, xMax, alpha, { color: 'var(--bad)', width: 1, dash: '2 3', opacity: 0.8 });
      Pp.path(xs.map((x) => [x, byN ? powerAt(x, d) : powerAt(n, x)]), { color: 'var(--series-2)', width: 2 });
      Pp.dot(byN ? n : d, pw, { r: 4.5, color: 'var(--series-2)' });
      Pp.text(byN ? xMax : 2, 0.8, '0.8', { anchor: 'end', dy: -4, size: 10, color: 'var(--ink-3)' });
      capPow.textContent = byN ? T('Power against the sample size n (effect d fixed)') : T('Power against the true effect d (n fixed)');
    }
    const hObs = Pl.handle(0, 0, { label: T('Observed test statistic'), constrain: (x) => [clamp(x, view[0], view[1]), 0],
      onDrag: guard((x) => { obs = Math.round(x * 100) / 100; draw(); }, report) });
    MA.ui.seg(bar, { options: [['z', T('z-test')], ['t', T('t-test')]], value: test, onChange: guard((v) => { test = v; yv = null; draw(); }, report) });
    MA.ui.seg(bar, { options: [['two', T('two-sided')], ['left', T('left')], ['right', T('right')]], value: tail, onChange: guard((v) => { tail = v; draw(); }, report) });
    MA.ui.toggle(bar, { label: T('Observed value'), value: showObs, onChange: guard((v) => {
      showObs = v;
      if (v && !Number.isFinite(obs)) { const [cl, cu] = crit(); obs = Math.round((tail === 'left' ? cl - 0.3 : Number.isFinite(cu) ? cu + 0.3 : 2) * 100) / 100; }
      draw();
    }, report) });
    MA.ui.seg(bar, { label: T('Power curve'), options: [['n', T('against n')], ['d', T('against d')]], value: curveBy, onChange: guard((v) => { curveBy = v; draw(); }, report) });
    MA.ui.slider(bar2, { label: '\\alpha', min: 0.001, max: 0.2, step: 0.001, value: clamp(alpha, 0.001, 0.2), fmt: (v) => MA.fmt(v, 3), onInput: guard((v) => { alpha = v; draw(); }, report) });
    MA.ui.slider(bar2, { label: T('effect d'), min: Math.min(-2, d), max: Math.max(2, d), step: 0.01, value: d, fmt: (v) => MA.fmt(v, 3), onInput: guard((v) => { d = v; draw(); }, report) });
    MA.ui.slider(bar2, { label: 'n', min: 2, max: Math.max(200, n), step: 1, value: n, fmt: (v) => String(v), onInput: guard((v) => { n = v; draw(); }, report) });
    Pl.onHover(guard((x) => {
      if (x === null) { read(null); return; }
      read(sym() + ' = ' + MA.fmt(x, 3) + '   f₀ = ' + fmt(pdf0(x), 3) + '   f₁ = ' + fmt(pdf1(x), 3) + '   ' + T('p-value') + ' ' + fmt(pValue(x), 3));
    }));
    draw();
  });

  // ================================================================== confidence
  MA.widget('confidence', (stage, cfg) => {
    let dist = C.str(cfg.dist, 'normal');
    if (!['normal', 'exponential', 'bernoulli'].includes(dist)) throw new Error('dist must be normal, exponential or bernoulli');
    let n = clamp(C.int(cfg.n, 20), 2, 2000);
    let level = C.num(cfg.level, 0.95);
    if (level > 1 && level < 100) level /= 100;
    if (!(level > 0 && level < 1)) throw new Error('level must be between 0 and 1 (e.g. 0.95)');
    const K = clamp(C.int(cfg.intervals, 50), 5, 300);
    let method = C.str(cfg.method, 't');
    if (method !== 'z' && method !== 't') throw new Error('method must be z or t');
    let seed = firstSeed(6);
    let total = 0, hits = 0, batches = 0;
    const POP = {
      normal: { mu: 0, sigma: 1, draw: (r) => MA.num.normal(r), label: '\\Normal(0, 1)' },
      exponential: { mu: 1, sigma: 1, draw: (r) => -Math.log(1 - r()), label: '\\operatorname{Exp}(1)' },
      bernoulli: { mu: 0.3, sigma: Math.sqrt(0.21), draw: (r) => (r() < 0.3 ? 1 : 0), label: '\\operatorname{Bernoulli}(0.3)' },
    };

    MA.ui.title(stage, cfg.title);
    const leg = legendBox(stage);
    const Pl = mkPlot(stage, 640, 420, { x: [-1, 1], y: [0, 1], grid: false, axes: false, pad: [10, 14, 24, 14], label: T('Simulated confidence intervals') });
    const bar = MA.ui.bar(stage);
    const bar2 = MA.ui.bar(stage);
    const info = MA.ui.info(stage);
    const report = (e) => info.set(el('span', { class: 'w-err', text: T('Could not update the figure: %s', e.message) }));
    let view = null;
    let cur = [];

    const crit = () => (method === 'z' ? PR.qnorm(1 - (1 - level) / 2) : PR.qt(1 - (1 - level) / 2, n - 1));
    function intervals() {
      const pop = POP[dist], c = crit();
      const out = [];
      for (let i = 0; i < K; i++) {
        const r = MA.num.rng(sampleSeed(seed, i));
        let sum = 0, sq = 0;
        for (let j = 0; j < n; j++) { const v = pop.draw(r); sum += v; sq += v * v; }
        const m = sum / n;
        const s = Math.sqrt(Math.max(0, (sq - n * m * m) / (n - 1)));
        let h;
        if (method === 't') h = c * s / Math.sqrt(n);
        else if (dist === 'bernoulli') h = c * Math.sqrt(m * (1 - m) / n);
        else h = c * pop.sigma / Math.sqrt(n);
        out.push({ m, lo: m - h, hi: m + h, ok: m - h <= pop.mu && pop.mu <= m + h });
      }
      return out;
    }
    function draw(count) {
      const pop = POP[dist];
      cur = intervals();
      const k = cur.filter((q) => q.ok).length;
      if (count) { total += K; hits += k; batches++; }
      const h0 = crit() * pop.sigma / Math.sqrt(n);
      const R = 1.5 * h0 + 2.4 * pop.sigma / Math.sqrt(n);
      view = sticky(view, [pop.mu - R, pop.mu + R], 0.4);
      const top = K + 0.8 + K * 0.06;
      Pl.setView(view, [0.2, top]);
      frame(Pl, { y: 'none' });
      Pl.clear();
      Pl.line(pop.mu, 0.2, pop.mu, top, { color: 'var(--ink)', width: 1.6, layer: 'curves' });
      const thin = K > 120 ? 1.2 : K > 60 ? 1.8 : 2.4;
      cur.forEach((q, i) => {
        const y = K - i;
        const col = q.ok ? 'var(--series-1)' : 'var(--bad)';
        Pl.line(q.lo, y, q.hi, y, { color: col, width: q.ok ? thin : thin + 0.8, opacity: q.ok ? 0.75 : 1 });
        if (K <= 120) Pl.dot(q.m, y, { r: K > 60 ? 1.8 : 2.6, color: col });
      });
      Pl.tex(pop.mu, top, '\\mu = ' + tn(pop.mu, 3), { anchor: 'start', dx: 6, dy: 12, size: 13, color: 'var(--ink)', w: 90, h: 22 });
      legend(leg, [{ label: T('interval contains μ'), color: 'var(--series-1)' }, { label: T('interval misses μ'), color: 'var(--bad)' }, { label: T('true mean μ'), color: 'var(--ink)' }]);
      const c = crit();
      const formula = method === 't' ? '\\bar x \\pm t^*_{' + (n - 1) + '}\\,\\frac{s}{\\sqrt{n}},\\ t^* = ' + tn(c, 4)
        : dist === 'bernoulli' ? '\\hat p \\pm z^*\\sqrt{\\hat p(1-\\hat p)/n},\\ z^* = ' + tn(c, 4) : '\\bar x \\pm z^*\\,\\frac{\\sigma}{\\sqrt{n}},\\ z^* = ' + tn(c, 4);
      info.set({ tex: 'X \\sim ' + pop.label }, { tex: formula },
        MA.ui.kv(T('this sample'), k + ' / ' + K + ' (' + MA.fmt(100 * k / K, 3) + '%)'),
        total ? MA.ui.kv(T('all %d intervals so far', total), MA.fmt(100 * hits / total, 3) + '%') : null,
        MA.ui.kv(T('nominal level'), MA.fmt(100 * level, 3) + '%'));
    }
    const resetCount = () => { total = 0; hits = 0; batches = 0; };
    let playing = false, acc = 0;
    const anim = MA.anim((dt) => {
      acc += dt;
      if (acc >= 0.35) { acc = 0; seed = nextSeed(); try { draw(true); } catch (e) { report(e); playing = false; play.set(false); return false; } }
      return true;
    });
    const play = playButton(bar, guard(() => { playing = !playing; play.set(playing); if (playing) { acc = 0.35; anim.play(); } else anim.stop(); }, report));
    pauseOffscreen(stage, anim, () => playing);
    MA.ui.button(bar, { label: T('New sample'), onClick: guard(() => { seed = nextSeed(); draw(true); }, report) });
    MA.ui.seg(bar, { options: [['t', T('t interval')], ['z', T('z interval')]], value: method, onChange: guard((v) => { method = v; resetCount(); draw(true); }, report) });
    MA.ui.select(bar, { label: T('Population'), value: dist, options: [['normal', T('Normal')], ['exponential', T('Exponential')], ['bernoulli', T('Bernoulli (p = 0.3)')]],
      onChange: guard((v) => { dist = v; view = null; resetCount(); draw(true); }, report) });
    MA.ui.slider(bar2, { label: 'n', min: 2, max: Math.max(200, n), step: 1, value: n, fmt: (v) => String(v), onInput: guard((v) => { n = v; resetCount(); draw(true); }, report) });
    MA.ui.slider(bar2, { label: T('level'), min: 0.5, max: 0.999, step: 0.001, value: level, fmt: (v) => MA.fmt(100 * v, 3) + '%', onInput: guard((v) => { level = v; resetCount(); draw(true); }, report) });
    draw(true);
  });

  // ================================================================== bayes
  MA.widget('bayes', (stage, cfg) => {
    const mode = C.str(cfg.mode, 'beta');
    if (mode !== 'beta' && mode !== 'test') throw new Error('mode must be beta or test');
    MA.ui.title(stage, cfg.title);
    if (mode === 'beta') bayesBeta(stage, cfg); else bayesTest(stage, cfg);
  });

  function bayesBeta(stage, cfg) {
    let a0 = C.num(cfg.a, 1), b0 = C.num(cfg.b, 1);
    if (!(a0 > 0 && b0 > 0)) throw new Error('the prior parameters a and b must be positive');
    let N = Math.max(0, C.int(cfg.trials, 10)), k = Math.max(0, C.int(cfg.successes, 6));
    if (k > N) throw new Error('successes (' + k + ') cannot exceed trials (' + N + ')');
    const init = { N, k };
    const LEVEL = 0.95;
    const leg = legendBox(stage);
    const Pl = mkPlot(stage, 640, 340, { x: [0, 1], y: [0, 1], grid: false, axes: false, label: T('Prior, likelihood and posterior for a proportion') });
    const bar = MA.ui.bar(stage);
    const bar2 = MA.ui.bar(stage);
    const info = MA.ui.info(stage);
    const read = Pl.readout();
    const report = (e) => info.set(el('span', { class: 'w-err', text: T('Could not update the figure: %s', e.message) }));
    let yv = null;
    const beta = (a, b) => (x) => D.beta.pdf(x, { a, b });
    function draw() {
      const pa = a0 + k, pb = b0 + N - k;
      const prior = beta(a0, b0), post = beta(pa, pb), like = N > 0 ? beta(k + 1, N - k + 1) : null;
      let mx = 0;
      for (let i = 1; i < 200; i++) {
        const x = 0.02 + 0.96 * i / 200;
        for (const f of [prior, post, like]) if (f) { const v = f(x); if (Number.isFinite(v)) mx = Math.max(mx, v); }
      }
      const mo = pa > 1 && pb > 1 ? (pa - 1) / (pa + pb - 2) : NaN;
      if (Number.isFinite(mo)) mx = Math.max(mx, post(mo));
      if (!yv || mx > yv[1] / 1.08 || mx < yv[1] * 0.5) yv = [0, mx * 1.2 || 1];
      Pl.setView([-0.02, 1.02], yv);
      frame(Pl, { xLabel: 'θ' });
      Pl.clear();
      const lo = PR.qbeta((1 - LEVEL) / 2, pa, pb), hi = PR.qbeta(1 - (1 - LEVEL) / 2, pa, pb);
      Pl.area(post, lo, hi, { color: 'var(--series-1)', opacity: 0.22, samples: 300 });
      Pl.fn(prior, { color: 'var(--ink-3)', width: 2, dash: '7 5', domain: [0, 1] });
      if (like) Pl.fn(like, { color: 'var(--series-3)', width: 2, dash: '2 4', domain: [0, 1] });
      Pl.fn(post, { color: 'var(--series-1)', width: 2.6, domain: [0, 1] });
      const pm = pa / (pa + pb);
      Pl.line(pm, 0, pm, Math.min(yv[1], post(pm)), { color: 'var(--series-1)', width: 1.4, dash: '3 3' });
      [lo, hi].forEach((v) => Pl.line(v, 0, v, Math.min(yv[1] * 0.98, post(v)), { color: 'var(--series-1)', width: 1.2 }));
      const lab = labeler(Pl);
      lab(lo, 0, tn(lo, 3), { anchor: 'end', dx: -3, dy: -12, size: 11, color: 'var(--series-1)', w: 60, h: 18 });
      lab(hi, 0, tn(hi, 3), { anchor: 'start', dx: 3, dy: -12, size: 11, color: 'var(--series-1)', w: 60, h: 18 });
      legend(leg, [
        { label: T('prior') + ' Beta(' + MA.fmt(a0, 3) + ', ' + MA.fmt(b0, 3) + ')', color: 'var(--ink-3)', kind: 'dash' },
        like ? { label: T('likelihood (scaled)'), color: 'var(--series-3)', kind: 'dash' } : null,
        { label: T('posterior') + ' Beta(' + MA.fmt(pa, 4) + ', ' + MA.fmt(pb, 4) + ')', color: 'var(--series-1)' },
        { label: T('95% credible interval'), color: 'var(--series-1)', kind: 'swatch', opacity: 0.35 },
      ]);
      const gt = D.beta.sf(0.5, { a: pa, b: pb });
      info.set({ tex: '\\operatorname{Beta}(' + tn(a0, 3) + ',\\,' + tn(b0, 3) + ')\\ \\xrightarrow{\\ ' + k + '\\text{ of }' + N + '\\ }\\ \\operatorname{Beta}(' + tn(pa, 4) + ',\\,' + tn(pb, 4) + ')' },
        MA.ui.kv(T('posterior mean'), fmt(pm, 4)),
        MA.ui.kv(T('95% credible interval'), '[' + fmt(lo, 3) + ', ' + fmt(hi, 3) + ']'),
        N > 0 ? MA.ui.kv(T('sample proportion'), fmt(k / N, 4)) : null,
        MA.ui.kv('\\Prob(\\theta > 0.5 \\mid \\text{data}) =', fmt(gt, 4), true));
    }
    const sk = MA.ui.slider(bar2, { label: T('successes'), min: 0, max: Math.max(N, 1), step: 1, value: k, fmt: (v) => String(v), onInput: guard((v) => { k = Math.min(v, N); if (k !== v) sk.set(k); draw(); }, report) });
    const sN = MA.ui.slider(bar2, { label: T('trials'), min: 0, max: Math.max(200, N), step: 1, value: N, fmt: (v) => String(v),
      onInput: guard((v) => { N = v; sk.input.max = Math.max(N, 1); if (k > N) k = N; sk.set(k); draw(); }, report) });
    const add = (succ) => {
      N++; if (succ) k++;
      if (N > +sN.input.max) sN.input.max = N;
      sN.set(N); sk.input.max = Math.max(N, 1); sk.set(k); draw();
    };
    MA.ui.button(bar, { label: T('+ success'), onClick: guard(() => add(true), report) });
    MA.ui.button(bar, { label: T('+ failure'), onClick: guard(() => add(false), report) });
    MA.ui.button(bar, { label: T('Reset'), onClick: guard(() => { N = init.N; k = init.k; sN.set(N); sk.input.max = Math.max(N, 1); sk.set(k); draw(); }, report) });
    MA.ui.slider(bar, { label: T('prior') + ' a', min: 0.1, max: Math.max(20, a0), step: 0.1, value: a0, fmt: (v) => MA.fmt(v, 3), onInput: guard((v) => { a0 = v; draw(); }, report) });
    MA.ui.slider(bar, { label: T('prior') + ' b', min: 0.1, max: Math.max(20, b0), step: 0.1, value: b0, fmt: (v) => MA.fmt(v, 3), onInput: guard((v) => { b0 = v; draw(); }, report) });
    Pl.onHover(guard((x) => {
      if (x === null || x < 0 || x > 1) { read(null); return; }
      read('θ = ' + MA.fmt(x, 3) + '   ' + T('prior') + ' ' + fmt(D.beta.pdf(x, { a: a0, b: b0 }), 3) + '   ' + T('posterior') + ' ' + fmt(D.beta.pdf(x, { a: a0 + k, b: b0 + N - k }), 3));
    }));
    draw();
  }

  function bayesTest(stage, cfg) {
    let prev = C.num(cfg.prevalence, 0.01), sens = C.num(cfg.sensitivity, 0.95), spec = C.num(cfg.specificity, 0.95);
    const chk = (v, nm) => { if (!(v >= 0 && v <= 1)) throw new Error(nm + ' must be between 0 and 1'); };
    chk(prev, 'prevalence'); chk(sens, 'sensitivity'); chk(spec, 'specificity');
    if (prev === 0 || prev === 1) throw new Error('prevalence must be strictly between 0 and 1');
    const leg = legendBox(stage);
    const Pt = new MA.Plot(stage, { width: dims(stage, 640, 236).width, height: 236, x: [0, 1], y: [0, 1], grid: false, axes: false, pad: [0, 0, 0, 0], label: T('Natural frequency tree') });
    const capIcons = el('div', { class: 'w-pr-cap' });
    stage.append(capIcons);
    const Pi = mkPlot(stage, 640, 262, { x: [0, 1], y: [0, 1], grid: false, axes: false, pad: [0, 0, 0, 0], label: T('Icon array of the population') });
    const bar = MA.ui.bar(stage);
    const info = MA.ui.info(stage);
    const report = (e) => info.set(el('span', { class: 'w-err', text: T('Could not update the figure: %s', e.message) }));
    const COL = { tp: 'var(--bad)', fn: 'var(--bad)', fp: 'var(--series-1)', tn: 'var(--deemph)' };
    const pctT = (v) => MA.fmt(100 * v, 3) + '%';
    function counts(N) {
      const D = Math.round(N * prev), H = N - D;
      const tp = Math.round(D * sens), fp = Math.round(H * (1 - spec));
      return { N, D, H, tp, fn: D - tp, fp, tn: H - fp };
    }
    function box(P, x, y, w, h, top, sub, o = {}) {
      const g = el('g');
      g.append(el('rect', { x: x - w / 2, y: y - h / 2, width: w, height: h, rx: 7, style: 'fill:' + (o.fill || 'var(--plot-bg)') + ';fill-opacity:' + (o.fillOpacity ?? 1) + ';stroke:' + (o.stroke || 'var(--rule-2)') + ';stroke-width:' + (o.sw || 1.2) }));
      g.append(el('text', { x, y: y - 2, 'text-anchor': 'middle', style: 'font-family:var(--font);font-weight:700;font-size:14px;fill:var(--ink);font-variant-numeric:tabular-nums', text: top }));
      g.append(el('text', { x, y: y + 13, 'text-anchor': 'middle', style: 'font-family:var(--font);font-size:11px;fill:var(--ink-2)', text: sub }));
      P.layers.top.append(g);
    }
    function edge(P, x1, y1, x2, y2, label, right) {
      svg(P, 'curves', 'line', { x1, y1, x2, y2, style: 'stroke:var(--ink-3);stroke-width:1.4' });
      const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
      P.layers.labels.append(el('text', { class: 'lbl', x: mx + (right ? 8 : -8), y: my + 4, 'text-anchor': right ? 'start' : 'end', style: 'font-size:11px;fill:var(--ink-2)', text: label }));
    }
    const nfmt = (v) => v.toLocaleString(MA.zh ? 'zh-CN' : 'en-US');
    /** Population for the tree: the smallest power of ten with at least 5 ill people in which every count is
     *  a whole number (1% prevalence, 95% sensitivity: 10,000 people, so 95 and 495 rather than 9.5 and 49.5). */
    function population() {
      const whole = (v) => Math.abs(v - Math.round(v)) < 1e-6;
      let first = 0;
      for (const N of [1000, 10000, 100000, 1000000]) {
        if (N * prev < 5) continue;
        first = first || N;
        const D = Math.round(N * prev);
        if (whole(N * prev) && whole(D * sens) && whole((N - D) * (1 - spec))) return N;
      }
      return first || 1000000;
    }
    function draw() {
      const N = population();
      const c = counts(N);
      // tree
      Pt.clear();
      const W = Pt.W, bw = Math.min(150, W * 0.225), bh = 38;
      const y0 = 24, y2 = Pt.H - 24, y1 = (y0 + y2) / 2;
      const X = { r: W / 2, d: W * 0.27, h: W * 0.73, tp: W * 0.13, fn: W * 0.385, fp: W * 0.615, tn: W * 0.87 };
      edge(Pt, X.r, y0 + bh / 2, X.d, y1 - bh / 2, pctT(prev), false);
      edge(Pt, X.r, y0 + bh / 2, X.h, y1 - bh / 2, pctT(1 - prev), true);
      edge(Pt, X.d, y1 + bh / 2, X.tp, y2 - bh / 2, pctT(sens), false);
      edge(Pt, X.d, y1 + bh / 2, X.fn, y2 - bh / 2, pctT(1 - sens), true);
      edge(Pt, X.h, y1 + bh / 2, X.fp, y2 - bh / 2, pctT(1 - spec), false);
      edge(Pt, X.h, y1 + bh / 2, X.tn, y2 - bh / 2, pctT(spec), true);
      box(Pt, X.r, y0, bw, bh, nfmt(c.N), T('people'));
      box(Pt, X.d, y1, bw, bh, nfmt(c.D), T('with the disease'), { stroke: 'var(--bad)' });
      box(Pt, X.h, y1, bw, bh, nfmt(c.H), T('without it'));
      box(Pt, X.tp, y2, bw, bh, nfmt(c.tp), T('test positive'), { fill: COL.tp, fillOpacity: 0.16, stroke: 'var(--bad)', sw: 2 });
      box(Pt, X.fn, y2, bw, bh, nfmt(c.fn), T('test negative'), { stroke: 'var(--bad)' });
      box(Pt, X.fp, y2, bw, bh, nfmt(c.fp), T('test positive'), { fill: COL.fp, fillOpacity: 0.16, stroke: 'var(--series-1)', sw: 2 });
      box(Pt, X.tn, y2, bw, bh, nfmt(c.tn), T('test negative'));
      // icon array: 1000 icons (each one person, or 10 / 100 people)
      const per = N / 1000;
      const ic = counts(1000);
      if (per > 1) { ic.tp = Math.round(c.tp / per); ic.fn = Math.round(c.fn / per); ic.fp = Math.round(c.fp / per); ic.tn = 1000 - ic.tp - ic.fn - ic.fp; }
      Pi.clear();
      const cols = 50, rows = 20, pitch = Math.min((Pi.W - 24) / cols, (Pi.H - 12) / rows), r = pitch * 0.36;
      const ox = (Pi.W - cols * pitch) / 2 + pitch / 2, oy = (Pi.H - rows * pitch) / 2 + pitch / 2;
      const paths = { tp: '', fn: '', fp: '', tn: '' };
      const seq = [].concat(Array(Math.max(0, ic.tp)).fill('tp'), Array(Math.max(0, ic.fn)).fill('fn'), Array(Math.max(0, ic.fp)).fill('fp'), Array(Math.max(0, ic.tn)).fill('tn'));
      seq.slice(0, cols * rows).forEach((kind, i) => {
        const col = Math.floor(i / rows), rw = i % rows;
        const x = ox + col * pitch, y = oy + rw * pitch;
        paths[kind] += 'M' + (x - r).toFixed(1) + ',' + y.toFixed(1) + 'a' + r.toFixed(2) + ',' + r.toFixed(2) + ' 0 1,0 ' + (2 * r).toFixed(2) + ',0a' + r.toFixed(2) + ',' + r.toFixed(2) + ' 0 1,0 ' + (-2 * r).toFixed(2) + ',0';
      });
      svg(Pi, 'marks', 'path', { d: paths.tn, style: 'fill:var(--deemph)' });
      svg(Pi, 'marks', 'path', { d: paths.fp, style: 'fill:var(--series-1)' });
      svg(Pi, 'marks', 'path', { d: paths.fn, style: 'fill:var(--plot-bg);stroke:var(--bad);stroke-width:1.6' });
      svg(Pi, 'marks', 'path', { d: paths.tp, style: 'fill:var(--bad)' });
      capIcons.textContent = per > 1 ? T('Icon array: each dot stands for %d people', per) : T('Icon array: each dot is one person');
      legend(leg, [
        { label: T('ill, test positive'), color: 'var(--bad)', kind: 'dot' }, { label: T('ill, test negative'), color: 'var(--bad)', kind: 'ring' },
        { label: T('healthy, test positive'), color: 'var(--series-1)', kind: 'dot' }, { label: T('healthy, test negative'), color: 'var(--deemph)', kind: 'dot' },
      ]);
      const pos = prev * sens + (1 - prev) * (1 - spec);
      const ppv = pos > 0 ? prev * sens / pos : NaN;
      const neg = 1 - pos;
      const npvD = neg > 0 ? prev * (1 - sens) / neg : NaN;
      info.set({ tex: '\\Prob(D \\mid +) = \\frac{' + c.tp + '}{' + c.tp + ' + ' + c.fp + '}' + (c.tp + c.fp > 0 ? ' \\approx ' + tn(c.tp / (c.tp + c.fp), 3) : '') },
        { tex: '= \\frac{p\\,s_e}{p\\,s_e + (1-p)(1-s_p)} = ' + tn(ppv, 4) },
        MA.ui.kv('\\Prob(D \\mid -) =', fmt(npvD, 3), true),
        MA.ui.kv('\\Prob(+) =', fmt(pos, 3), true));
    }
    logSlider(bar, { label: T('prevalence'), tex: false, min: 0.0001, max: 0.5, value: prev, sig: 2, fmt: (v) => pctT(v), onInput: guard((v) => { prev = v; draw(); }, report) });
    MA.ui.slider(bar, { label: T('sensitivity'), min: 0.5, max: 1, step: 0.005, value: clamp(sens, 0.5, 1), fmt: (v) => pctT(v), onInput: guard((v) => { sens = v; draw(); }, report) });
    MA.ui.slider(bar, { label: T('specificity'), min: 0.5, max: 1, step: 0.005, value: clamp(spec, 0.5, 1), fmt: (v) => pctT(v), onInput: guard((v) => { spec = v; draw(); }, report) });
    draw();
  }

  // ================================================================== regression
  /** Least-squares polynomial of degree `deg` through points [[x, y]] by the normal equations (x centred and scaled). */
  function polyFit(pts, deg) {
    const n = pts.length;
    const mx = pts.reduce((acc, p) => acc + p[0], 0) / n;
    const sx = Math.max(...pts.map((p) => Math.abs(p[0] - mx))) || 1;
    const m = deg + 1;
    const A = Array.from({ length: m }, () => new Array(m).fill(0)), b = new Array(m).fill(0);
    for (const [x, y] of pts) {
      const u = (x - mx) / sx, pw = [1];
      for (let k = 1; k <= 2 * deg; k++) pw.push(pw[k - 1] * u);
      for (let i = 0; i < m; i++) { b[i] += y * pw[i]; for (let j = 0; j < m; j++) A[i][j] += pw[i + j]; }
    }
    const c = solve(A, b);
    if (!c) return null;
    const f = (x) => { const u = (x - mx) / sx; let v = 0; for (let k = deg; k >= 0; k--) v = v * u + c[k]; return v; };
    // coefficients in powers of x: Σ_k c_k ((x − mx)/sx)^k
    const a = new Array(m).fill(0);
    for (let k = 0; k <= deg; k++) {
      let binom = 1;
      for (let j = 0; j <= k; j++) {
        a[j] += c[k] * binom * Math.pow(-mx, k - j) / Math.pow(sx, k);
        binom = binom * (k - j) / (j + 1);
      }
    }
    return { f, a, deg };
  }
  /** TeX for a polynomial with coefficients a[0..d] (constant first). */
  function polyTeX(a, scale) {
    const parts = [];
    for (let k = a.length - 1; k >= 0; k--) {
      const c = a[k];
      if (!Number.isFinite(c) || Math.abs(c) < 1e-12 * scale) continue;
      const mag = tn(Math.abs(c), 4);
      const pw = k === 0 ? '' : k === 1 ? 'x' : 'x^{' + k + '}';
      parts.push({ neg: c < 0, t: (k > 0 && mag === '1' ? '' : mag) + pw });
    }
    if (!parts.length) return '0';
    return parts.map((q, i) => (i === 0 ? (q.neg ? '-' : '') + q.t : (q.neg ? ' - ' : ' + ') + q.t)).join('');
  }

  MA.widget('regression', (stage, cfg) => {
    const init = C.points(C.has(cfg.points) ? cfg.points : '1,2; 2,2.8; 3,3.1; 4,4.5; 5,4.9; 6,6.3');
    init.forEach((q, i) => { if (q.length < 2) throw new Error('point ' + (i + 1) + ' needs two coordinates (x,y)'); });
    if (init.length < 2) throw new Error('regression needs at least two points');
    if (init.length > 300) throw new Error('at most 300 points');
    let degree = clamp(C.int(cfg.degree, 1), 0, 8);
    let showRes = C.bool(cfg.residuals, true);
    let showSq = false;
    const xsI = init.map((q) => q[0]), ysI = init.map((q) => q[1]);
    const padR = (lo, hi) => { const sp = Math.max(hi - lo, 1e-9 + Math.abs(hi) * 0.1, 1); return [lo - 0.14 * sp, hi + 0.14 * sp]; };
    const xr = C.range(cfg.x, null) || padR(Math.min(...xsI), Math.max(...xsI));
    const yr = C.range(cfg.y, null) || padR(Math.min(...ysI), Math.max(...ysI));

    MA.ui.title(stage, cfg.title);
    const leg = legendBox(stage);
    const Pl = mkPlot(stage, 640, 400, { x: xr, y: yr, label: T('Data points and the least-squares fit') });
    const bar = MA.ui.bar(stage);
    const info = MA.ui.info(stage);
    const hint = MA.ui.info(stage);
    hint.el.classList.add('w-pr-formula');
    const read = Pl.readout();
    const report = (e) => info.set(el('span', { class: 'w-err', text: T('Could not update the figure: %s', e.message) }));
    let handles = [];
    const inView = (x, y) => [clamp(x, Pl.x0, Pl.x1), clamp(y, Pl.y0, Pl.y1)];
    function addPoint(x, y) {
      const h = Pl.handle(x, y, { label: T('Data point'), constrain: inView, onDrag: guard(() => draw(), report), step: (Pl.x1 - Pl.x0) / 100 });
      h.el.addEventListener('dblclick', guard((e) => { e.preventDefault(); removePoint(h); }, report));
      h.el.addEventListener('keydown', guard((e) => { if (e.key === 'Delete' || e.key === 'Backspace') { e.preventDefault(); removePoint(h); } }, report));
      handles.push(h);
    }
    function removePoint(h) {
      if (handles.length <= 2) return;
      h.el.remove();
      handles = handles.filter((q) => q !== h);
      draw();
    }
    function draw() {
      const pts = handles.map((h) => [h.x, h.y]);
      const n = pts.length;
      const distinct = new Set(pts.map((q) => q[0].toFixed(9))).size;
      const maxDeg = Math.max(0, Math.min(8, n - 1, distinct - 1));
      degSl.input.max = Math.max(1, Math.min(8, n - 1));
      const d = Math.min(degree, maxDeg);
      Pl.clear();
      const fit = polyFit(pts, d);
      const ybar = pts.reduce((acc, q) => acc + q[1], 0) / n;
      const xbar = pts.reduce((acc, q) => acc + q[0], 0) / n;
      if (!fit) { info.set(el('span', { class: 'w-err', text: T('The normal equations are singular for these points.') })); return; }
      let sse = 0, sst = 0;
      pts.forEach(([x, y]) => { const r = y - fit.f(x); sse += r * r; sst += (y - ybar) * (y - ybar); });
      if (showSq) {
        pts.forEach(([x, y]) => {
          const yh = fit.f(x), r = y - yh;
          const side = Math.abs(r) * Pl.sy / Pl.sx;
          const right = Pl.X(x) + Math.abs(r) * Pl.sy < Pl.W - Pl.pr;
          Pl.rect(right ? x : x - side, Math.min(y, yh), side, Math.abs(r), { color: 'var(--series-2)', fillOpacity: 0.13, width: 1, strokeOpacity: 0.6 });
        });
      }
      if (showRes) pts.forEach(([x, y]) => Pl.line(x, y, x, fit.f(x), { color: 'var(--series-2)', width: 1.8, layer: 'marks' }));
      Pl.fn(fit.f, { color: 'var(--series-1)', width: 2.6 });
      if (d === 1) Pl.dot(xbar, ybar, { r: 5, hollow: true, color: 'var(--ink-2)', layer: 'top' });
      legend(leg, [
        { label: T('data (drag; click to add, double-click to remove)'), color: 'var(--accent)', kind: 'dot' },
        { label: d === 1 ? T('least-squares line') : T('least-squares polynomial'), color: 'var(--series-1)' },
        showRes ? { label: T('residuals'), color: 'var(--series-2)' } : null,
        d === 1 ? { label: '(\\bar x, \\bar y)', color: 'var(--ink-2)', kind: 'ring' } : null,
      ]);
      const scale = Math.max(1, ...pts.map((q) => Math.abs(q[1])));
      const r2 = sst > 0 ? 1 - sse / sst : NaN;
      const parts = [{ tex: '\\hat y = ' + polyTeX(fit.a, scale) }, MA.ui.kv('R^2 =', Number.isFinite(r2) ? fmt(r2, 4) : '–', true)];
      if (d === 1 && Number.isFinite(r2)) parts.push(MA.ui.kv('r =', fmt((fit.a[1] >= 0 ? 1 : -1) * Math.sqrt(Math.max(0, r2)), 4), true));
      parts.push(MA.ui.kv(T('sum of squared residuals'), fmt(sse, 4)), MA.ui.kv('n =', String(n), true));
      info.set(...parts);
      const notes = [{ tex: d === 1 ? '\\min_{a,b}\\ \\sum_i (y_i - a - b x_i)^2' : '\\min\\ \\sum_i (y_i - \\hat y(x_i))^2,\\quad X\\T X\\,\\beta = X\\T y' }];
      if (d < degree) notes.push(el('span', { class: 'w-pr-note', text: T('Degree reduced to %d: a polynomial of degree k needs at least k + 1 different x values.', d) }));
      if (d >= n - 1 && n > 1 && d > 0) notes.push(el('span', { class: 'w-pr-note', text: T('With n − 1 = degree the curve interpolates the points: every residual is zero.') }));
      hint.set(...notes);
    }
    const degSl = MA.ui.slider(bar, { label: T('degree'), min: 0, max: Math.max(1, Math.min(8, init.length - 1)), step: 1, value: degree, fmt: (v) => String(v), onInput: guard((v) => { degree = v; draw(); }, report) });
    MA.ui.toggle(bar, { label: T('Residuals'), value: showRes, onChange: guard((v) => { showRes = v; draw(); }, report) });
    MA.ui.toggle(bar, { label: T('Squares'), value: showSq, onChange: guard((v) => { showSq = v; draw(); }, report) });
    MA.ui.button(bar, { label: T('Reset'), onClick: guard(() => { handles.forEach((h) => h.el.remove()); handles = []; init.forEach((q) => addPoint(q[0], q[1])); draw(); }, report) });
    Pl.onClick(guard((x, y) => {
      if (!Number.isFinite(x) || handles.length >= 300) return;
      if (x < Pl.x0 || x > Pl.x1 || y < Pl.y0 || y > Pl.y1) return;
      addPoint(x, y); draw();
    }, report));
    Pl.onHover(guard((x) => {
      if (x === null) { read(null); return; }
      const fit = polyFit(handles.map((h) => [h.x, h.y]), Math.min(degree, Math.max(0, handles.length - 1)));
      read('x = ' + MA.fmt(x, 3) + (fit ? '   ŷ = ' + MA.fmt(fit.f(x), 4) : ''));
    }));
    init.forEach((q) => addPoint(q[0], q[1]));
    draw();
  });
})();
