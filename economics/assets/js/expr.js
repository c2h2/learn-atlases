/* Economics & Finance Atlas (engine shared with Maths Atlas) — expression language for interactive figures (browser + node).
   parse("sin(x)^2 + 2x", {vars:['x']}) -> AST; compile(ast) -> (scope) => number;
   compileC(ast) -> complex evaluation ([re, im]); taylor(ast, 'x') -> exact Taylor coefficients;
   toTeX(ast) -> LaTeX. Implicit multiplication (2x, 3(x+1), (x+1)(x-1), x y) is supported;
   functions need parentheses: sin(x), not sin x. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else (root.MA = root.MA || {}).expr = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const FUNCS = {
    sin: 1, cos: 1, tan: 1, sec: 1, csc: 1, cot: 1, asin: 1, acos: 1, atan: [1, 2], atan2: 2,
    sinh: 1, cosh: 1, tanh: 1, sech: 1, csch: 1, coth: 1, asinh: 1, acosh: 1, atanh: 1,
    exp: 1, ln: 1, log: [1, 2], log10: 1, log2: 1, sqrt: 1, cbrt: 1, root: 2, pow: 2, hypot: 2,
    abs: 1, sign: 1, floor: 1, ceil: 1, round: 1, frac: 1, min: [1, 99], max: [1, 99], mod: 2,
    gamma: 1, fact: 1, binom: 2, erf: 1, heaviside: 1, sinc: 1, clamp: 3,
    if: 3, sum: 4, prod: 4,
    re: 1, im: 1, conj: 1, arg: 1,
  };
  const ALIAS = { arcsin: 'asin', arccos: 'acos', arctan: 'atan', arsinh: 'asinh', arcosh: 'acosh', artanh: 'atanh',
    choose: 'binom', factorial: 'fact', sgn: 'sign', H: 'heaviside', lg: 'log10', Re: 're', Im: 'im', Arg: 'arg' };
  const CONSTS = { pi: Math.PI, e: Math.E, tau: 2 * Math.PI, inf: Infinity, infinity: Infinity, phi: (1 + Math.sqrt(5)) / 2 };
  const GREEK = ['alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta', 'theta', 'iota', 'kappa', 'lambda', 'mu', 'nu', 'xi',
    'rho', 'sigma', 'omega', 'Omega', 'Delta', 'Gamma', 'Lambda', 'Sigma'];

  class ExprError extends Error {}

  // ------------------------------------------------------------------ tokens
  function tokenize(src) {
    src = String(src)
      .replace(/π/g, ' pi ').replace(/θ/g, ' theta ').replace(/λ/g, ' lambda ').replace(/μ/g, ' mu ').replace(/σ/g, ' sigma ')
      .replace(/ω/g, ' omega ').replace(/α/g, ' alpha ').replace(/β/g, ' beta ').replace(/[·×]/g, '*').replace(/−/g, '-')
      .replace(/÷/g, '/').replace(/\*\*/g, '^').replace(/≤/g, '<=').replace(/≥/g, '>=').replace(/≠/g, '!=');
    const out = [];
    let i = 0;
    while (i < src.length) {
      const c = src[i];
      if (/\s/.test(c)) { i++; continue; }
      let m = /^(\d+\.?\d*(?:[eE][+-]?\d+)?|\.\d+(?:[eE][+-]?\d+)?)/.exec(src.slice(i));
      if (m) { out.push({ k: 'num', v: parseFloat(m[1]), s: m[1], at: i }); i += m[1].length; continue; }
      m = /^[A-Za-z_][A-Za-z0-9_]*/.exec(src.slice(i));
      if (m) { out.push({ k: 'id', v: m[0], at: i }); i += m[0].length; continue; }
      m = /^(<=|>=|==|!=|&&|\|\||[-+*/^(),!<>=])/.exec(src.slice(i));
      if (m) { out.push({ k: 'op', v: m[1] === '=' ? '==' : m[1], at: i }); i += m[1].length; continue; }
      throw new ExprError('unexpected character "' + c + '"');
    }
    return out;
  }

  // ------------------------------------------------------------------ parser
  /**
   * opts.vars: allowed variable names (default ['x']); opts.complex: allow the imaginary unit i.
   * Unknown multi-letter names split into allowed one-letter variables when possible (xy -> x*y).
   */
  function parse(src, opts) {
    opts = opts || {};
    const vars = new Set(opts.vars || ['x']);
    const complex = !!opts.complex;
    const toks = tokenize(src);
    if (!toks.length) throw new ExprError('empty expression');
    let p = 0;
    const peek = () => toks[p];
    const next = () => toks[p++];
    const isOp = (t, v) => t && t.k === 'op' && t.v === v;
    const fname = (name) => (FUNCS[name] !== undefined ? name : (ALIAS[name] && FUNCS[ALIAS[name]] !== undefined ? ALIAS[name] : null));
    const known = (name) => vars.has(name) || name in CONSTS || (complex && name === 'i');

    function atomFromName(name) {
      if (vars.has(name)) return { t: 'var', name };
      if (complex && name === 'i') return { t: 'imag' };
      if (name in CONSTS) return { t: 'const', name };
      return null;
    }

    function startsPrimary(t) {
      if (!t) return false;
      if (t.k === 'num' || t.k === 'id') return true;
      return isOp(t, '(');
    }

    function parseCall(name, tok) {
      const f = fname(name);
      if (!isOp(peek(), '(')) throw new ExprError(name + ' needs parentheses, e.g. ' + name + '(x)');
      next();
      const args = [];
      let bound = null;
      if (f === 'sum' || f === 'prod') {
        // find the bound variable: the identifier after the first top-level comma
        let depth = 0;
        for (let q = p; q < toks.length; q++) {
          if (isOp(toks[q], '(')) depth++;
          else if (isOp(toks[q], ')')) { if (depth === 0) break; depth--; }
          else if (depth === 0 && isOp(toks[q], ',')) { if (toks[q + 1] && toks[q + 1].k === 'id') bound = toks[q + 1].v; break; }
        }
        if (!bound) throw new ExprError(f + '(expr, k, from, to) needs a summation variable');
      }
      const had = bound ? vars.has(bound) : true;
      if (bound) vars.add(bound);
      if (!isOp(peek(), ')')) {
        for (;;) {
          if (bound && args.length === 1) {
            const v = next();
            if (!v || v.k !== 'id') throw new ExprError('expected the summation variable');
            args.push({ t: 'var', name: v.v });
            if (!had) vars.delete(bound);
          } else {
            args.push(expr(0));
          }
          if (isOp(peek(), ',')) { next(); continue; }
          break;
        }
      }
      if (bound && !had) vars.delete(bound);
      if (!isOp(next(), ')')) throw new ExprError('missing ) after arguments of ' + name);
      const ar = FUNCS[f];
      const [lo, hi] = Array.isArray(ar) ? ar : [ar, ar];
      if (args.length < lo || args.length > hi) throw new ExprError(name + ' takes ' + (lo === hi ? lo : lo + '–' + hi) + ' argument' + (hi > 1 ? 's' : ''));
      return { t: 'call', f, args };
    }

    function nud(tok) {
      if (!tok) throw new ExprError('unexpected end of expression');
      if (tok.k === 'num') return { t: 'num', v: tok.v };
      if (tok.k === 'id') {
        const name = tok.v;
        if (fname(name) && isOp(peek(), '(')) return parseCall(name, tok);
        const a = atomFromName(name);
        if (a) return a;
        if (fname(name)) throw new ExprError(name + ' needs parentheses, e.g. ' + name + '(x)');
        // split "xy" into x*y when every letter is a known one-letter name
        if (/^[A-Za-z]+$/.test(name) && name.split('').every((ch) => known(ch))) {
          return name.split('').map(atomFromName).reduce((acc, b) => ({ t: 'bin', op: '*', a: acc, b }));
        }
        if (GREEK.includes(name)) throw new ExprError('unknown variable "' + name + '"');
        throw new ExprError('unknown name "' + name + '"' + (vars.size ? ' (variables: ' + [...vars].join(', ') + ')' : ''));
      }
      if (isOp(tok, '(')) {
        const e = expr(0);
        if (!isOp(next(), ')')) throw new ExprError('missing )');
        return e;
      }
      if (isOp(tok, '-')) return { t: 'neg', a: expr(25) };
      if (isOp(tok, '+')) return expr(25);
      throw new ExprError('unexpected "' + tok.v + '"');
    }

    const BP = { '||': 2, '&&': 3, '<': 5, '>': 5, '<=': 5, '>=': 5, '==': 5, '!=': 5, '+': 10, '-': 10, '*': 20, '/': 20, '^': 30, '!': 40 };
    function expr(rbp) {
      let left = nud(next());
      for (;;) {
        const t = peek();
        if (!t) break;
        if (t.k === 'op' && BP[t.v] !== undefined) {
          const bp = BP[t.v];
          if (bp <= rbp) break;
          next();
          if (t.v === '!') { left = { t: 'fact', a: left }; continue; }
          if (t.v === '^') { left = { t: 'bin', op: '^', a: left, b: expr(bp - 1) }; continue; }
          if (bp <= 5) { left = { t: 'cmp', op: t.v, a: left, b: expr(bp) }; continue; }
          left = { t: 'bin', op: t.v, a: left, b: expr(bp) };
          continue;
        }
        if (startsPrimary(t) && !isOp(t, ')')) {
          // implicit multiplication
          if (20 <= rbp) break;
          left = { t: 'bin', op: '*', a: left, b: expr(20), implicit: true };
          continue;
        }
        break;
      }
      return left;
    }

    const ast = expr(0);
    if (p < toks.length) throw new ExprError('unexpected "' + toks[p].v + '"');
    return ast;
  }

  // ------------------------------------------------------------------ real evaluation
  function gamma(x) {
    if (x < 0.5) return Math.PI / (Math.sin(Math.PI * x) * gamma(1 - x));
    if (Number.isInteger(x) && x <= 171) { let r = 1; for (let k = 2; k < x; k++) r *= k; return r; }
    const g = 7, c = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059,
      12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
    x -= 1;
    let a = c[0];
    const t = x + g + 0.5;
    for (let i = 1; i < 9; i++) a += c[i] / (x + i);
    return Math.sqrt(2 * Math.PI) * Math.pow(t, x + 0.5) * Math.exp(-t) * a;
  }
  function erf(x) {
    // Abramowitz & Stegun 7.1.26 refined with one Newton-free series switch for small |x|
    const s = Math.sign(x); x = Math.abs(x);
    if (x < 0.5) {
      let sum = 0, term = x, n = 0;
      while (Math.abs(term) > 1e-17 && n < 60) { sum += term / (2 * n + 1); n++; term *= -x * x / n; }
      return s * 2 / Math.sqrt(Math.PI) * sum;
    }
    const t = 1 / (1 + 0.5 * x);
    const y = 1 - t * Math.exp(-x * x - 1.26551223 + t * (1.00002368 + t * (0.37409196 + t * (0.09678418 + t * (-0.18628806 +
      t * (0.27886807 + t * (-1.13520398 + t * (1.48851587 + t * (-0.82215223 + t * 0.17087277)))))))));
    return s * y;
  }
  function binom(n, k) {
    if (Number.isInteger(n) && Number.isInteger(k)) {
      if (k < 0 || k > n) return 0;
      k = Math.min(k, n - k);
      let r = 1;
      for (let i = 1; i <= k; i++) r = r * (n - k + i) / i;
      return Math.round(r) === r || r > 1e15 ? r : Math.round(r);
    }
    return gamma(n + 1) / (gamma(k + 1) * gamma(n - k + 1));
  }
  /** Real power that keeps odd roots of negative numbers real: (-8)^(1/3) = -2. */
  function rpow(b, e) {
    if (b >= 0 || Number.isInteger(e)) return Math.pow(b, e);
    for (const d of [3, 5, 7, 9]) {
      const n = e * d;
      if (Math.abs(n - Math.round(n)) < 1e-12) return (Math.round(n) % 2 === 0 ? 1 : -1) * Math.pow(-b, e);
    }
    return NaN;
  }
  const RF = {
    sin: Math.sin, cos: Math.cos, tan: Math.tan, sec: (x) => 1 / Math.cos(x), csc: (x) => 1 / Math.sin(x), cot: (x) => 1 / Math.tan(x),
    asin: Math.asin, acos: Math.acos, atan: (y, x) => (x === undefined ? Math.atan(y) : Math.atan2(y, x)), atan2: Math.atan2,
    sinh: Math.sinh, cosh: Math.cosh, tanh: Math.tanh, sech: (x) => 1 / Math.cosh(x), csch: (x) => 1 / Math.sinh(x), coth: (x) => 1 / Math.tanh(x),
    asinh: Math.asinh, acosh: Math.acosh, atanh: Math.atanh,
    exp: Math.exp, ln: Math.log, log: (x, b) => (b === undefined ? Math.log(x) : Math.log(x) / Math.log(b)), log10: Math.log10, log2: Math.log2,
    sqrt: Math.sqrt, cbrt: Math.cbrt, root: (x, n) => rpow(x, 1 / n), pow: rpow, hypot: Math.hypot,
    abs: Math.abs, sign: Math.sign, floor: Math.floor, ceil: Math.ceil, round: Math.round, frac: (x) => x - Math.floor(x),
    min: Math.min, max: Math.max, mod: (a, b) => a - b * Math.floor(a / b),
    gamma, fact: (n) => gamma(n + 1), binom, erf, heaviside: (x) => (x < 0 ? 0 : x > 0 ? 1 : 0.5),
    sinc: (x) => (x === 0 ? 1 : Math.sin(x) / x), clamp: (x, a, b) => Math.min(Math.max(x, a), b),
    re: (x) => x, im: () => 0, conj: (x) => x, arg: (x) => (x >= 0 ? 0 : Math.PI),
  };

  function compile(ast) {
    switch (ast.t) {
      case 'num': { const v = ast.v; return () => v; }
      case 'const': { const v = CONSTS[ast.name]; return () => v; }
      case 'imag': return () => NaN;
      case 'var': { const n = ast.name; return (s) => { const v = s[n]; return v === undefined ? NaN : +v; }; }
      case 'neg': { const a = compile(ast.a); return (s) => -a(s); }
      case 'fact': { const a = compile(ast.a); return (s) => gamma(a(s) + 1); }
      case 'cmp': {
        const a = compile(ast.a), b = compile(ast.b);
        const f = { '<': (x, y) => x < y, '>': (x, y) => x > y, '<=': (x, y) => x <= y, '>=': (x, y) => x >= y,
          '==': (x, y) => Math.abs(x - y) < 1e-12, '!=': (x, y) => Math.abs(x - y) >= 1e-12, '&&': (x, y) => !!x && !!y, '||': (x, y) => !!x || !!y }[ast.op];
        return (s) => (f(a(s), b(s)) ? 1 : 0);
      }
      case 'bin': {
        const a = compile(ast.a), b = compile(ast.b);
        switch (ast.op) {
          case '+': return (s) => a(s) + b(s);
          case '-': return (s) => a(s) - b(s);
          case '*': return (s) => a(s) * b(s);
          case '/': return (s) => a(s) / b(s);
          case '^': return (s) => rpow(a(s), b(s));
        }
        break;
      }
      case 'call': {
        if (ast.f === 'if') {
          const c = compile(ast.args[0]), x = compile(ast.args[1]), y = compile(ast.args[2]);
          return (s) => (c(s) ? x(s) : y(s));
        }
        if (ast.f === 'sum' || ast.f === 'prod') {
          const body = compile(ast.args[0]), k = ast.args[1].name, lo = compile(ast.args[2]), hi = compile(ast.args[3]);
          const isSum = ast.f === 'sum';
          return (s) => {
            const a = Math.ceil(lo(s) - 1e-9), b = Math.floor(hi(s) + 1e-9);
            if (!(b - a < 2e5)) return NaN;
            const sc = Object.create(s);
            let acc = isSum ? 0 : 1;
            for (let j = a; j <= b; j++) { sc[k] = j; const v = body(sc); acc = isSum ? acc + v : acc * v; }
            return acc;
          };
        }
        const fn = RF[ast.f];
        const args = ast.args.map(compile);
        if (args.length === 1) { const a0 = args[0]; return (s) => fn(a0(s)); }
        if (args.length === 2) { const a0 = args[0], a1 = args[1]; return (s) => fn(a0(s), a1(s)); }
        return (s) => fn(...args.map((g) => g(s)));
      }
    }
    throw new ExprError('cannot evaluate node ' + ast.t);
  }

  // ------------------------------------------------------------------ complex evaluation ([re, im])
  const C = {
    add: (a, b) => [a[0] + b[0], a[1] + b[1]],
    sub: (a, b) => [a[0] - b[0], a[1] - b[1]],
    mul: (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]],
    div: (a, b) => { const d = b[0] * b[0] + b[1] * b[1]; return [(a[0] * b[0] + a[1] * b[1]) / d, (a[1] * b[0] - a[0] * b[1]) / d]; },
    exp: (a) => { const r = Math.exp(a[0]); return [r * Math.cos(a[1]), r * Math.sin(a[1])]; },
    log: (a) => [Math.log(Math.hypot(a[0], a[1])), Math.atan2(a[1], a[0])],
    abs: (a) => [Math.hypot(a[0], a[1]), 0],
    neg: (a) => [-a[0], -a[1]],
  };
  C.pow = (a, b) => {
    if (b[1] === 0 && Number.isInteger(b[0]) && Math.abs(b[0]) <= 64) {
      let n = Math.abs(b[0]), base = a, r = [1, 0];
      while (n) { if (n & 1) r = C.mul(r, base); base = C.mul(base, base); n >>= 1; }
      return b[0] < 0 ? C.div([1, 0], r) : r;
    }
    if (a[0] === 0 && a[1] === 0) return b[0] > 0 ? [0, 0] : [NaN, NaN];
    return C.exp(C.mul(b, C.log(a)));
  };
  C.sqrt = (a) => { const r = Math.hypot(a[0], a[1]); const re = Math.sqrt((r + a[0]) / 2); const im = Math.sqrt(Math.max(0, (r - a[0]) / 2)); return [re, a[1] < 0 ? -im : im]; };
  C.sin = (a) => [Math.sin(a[0]) * Math.cosh(a[1]), Math.cos(a[0]) * Math.sinh(a[1])];
  C.cos = (a) => [Math.cos(a[0]) * Math.cosh(a[1]), -Math.sin(a[0]) * Math.sinh(a[1])];
  C.sinh = (a) => [Math.sinh(a[0]) * Math.cos(a[1]), Math.cosh(a[0]) * Math.sin(a[1])];
  C.cosh = (a) => [Math.cosh(a[0]) * Math.cos(a[1]), Math.sinh(a[0]) * Math.sin(a[1])];
  const CF = {
    exp: C.exp, ln: C.log, log: (a, b) => (b ? C.div(C.log(a), C.log(b)) : C.log(a)), sqrt: C.sqrt, abs: C.abs,
    sin: C.sin, cos: C.cos, tan: (a) => C.div(C.sin(a), C.cos(a)), cot: (a) => C.div(C.cos(a), C.sin(a)),
    sec: (a) => C.div([1, 0], C.cos(a)), csc: (a) => C.div([1, 0], C.sin(a)),
    sinh: C.sinh, cosh: C.cosh, tanh: (a) => C.div(C.sinh(a), C.cosh(a)),
    re: (a) => [a[0], 0], im: (a) => [a[1], 0], conj: (a) => [a[0], -a[1]], arg: (a) => [Math.atan2(a[1], a[0]), 0],
    pow: C.pow, root: (a, n) => C.pow(a, C.div([1, 0], n)), cbrt: (a) => C.pow(a, [1 / 3, 0]),
    asin: (a) => C.mul([0, -1], C.log(C.add(C.mul([0, 1], a), C.sqrt(C.sub([1, 0], C.mul(a, a)))))),
    acos: (a) => C.sub([Math.PI / 2, 0], CF.asin(a)),
    atan: (a) => C.mul([0, 0.5], C.log(C.div(C.add([0, 1], a), C.sub([0, 1], a)))),
    gamma: (a) => [gamma(a[0]), 0], fact: (a) => [gamma(a[0] + 1), 0],
  };

  function compileC(ast) {
    switch (ast.t) {
      case 'num': { const v = [ast.v, 0]; return () => v; }
      case 'const': { const v = [CONSTS[ast.name], 0]; return () => v; }
      case 'imag': return () => [0, 1];
      case 'var': { const n = ast.name; return (s) => { const v = s[n]; return Array.isArray(v) ? v : [+v, 0]; }; }
      case 'neg': { const a = compileC(ast.a); return (s) => C.neg(a(s)); }
      case 'bin': {
        const a = compileC(ast.a), b = compileC(ast.b);
        const op = { '+': C.add, '-': C.sub, '*': C.mul, '/': C.div, '^': C.pow }[ast.op];
        return (s) => op(a(s), b(s));
      }
      case 'fact': { const a = compileC(ast.a); return (s) => [gamma(a(s)[0] + 1), 0]; }
      case 'call': {
        if (ast.f === 'sum' || ast.f === 'prod') {
          const body = compileC(ast.args[0]), k = ast.args[1].name, lo = compile(ast.args[2]), hi = compile(ast.args[3]);
          const isSum = ast.f === 'sum';
          return (s) => {
            const a = Math.ceil(lo(s)), b = Math.floor(hi(s));
            const sc = Object.create(s);
            let acc = isSum ? [0, 0] : [1, 0];
            for (let j = a; j <= b && j - a < 2e5; j++) { sc[k] = [j, 0]; const v = body(sc); acc = isSum ? C.add(acc, v) : C.mul(acc, v); }
            return acc;
          };
        }
        const fn = CF[ast.f];
        if (!fn) throw new ExprError(ast.f + ' is not available for complex numbers');
        const args = ast.args.map(compileC);
        return (s) => fn(...args.map((g) => g(s)));
      }
    }
    throw new ExprError('this expression cannot be evaluated with complex numbers');
  }

  // ------------------------------------------------------------------ Taylor arithmetic
  /** Truncated power series: coefficients c[0..N] of f(x0 + t). */
  function taylor(ast, v) {
    const T = {
      c: (N, a) => { const r = new Float64Array(N + 1); r[0] = a; return r; },
      mul: (a, b) => { const N = a.length - 1, r = new Float64Array(N + 1); for (let k = 0; k <= N; k++) { let s = 0; for (let j = 0; j <= k; j++) s += a[j] * b[k - j]; r[k] = s; } return r; },
      div: (a, b) => { const N = a.length - 1, r = new Float64Array(N + 1); for (let k = 0; k <= N; k++) { let s = a[k]; for (let j = 1; j <= k; j++) s -= b[j] * r[k - j]; r[k] = s / b[0]; } return r; },
      exp: (f) => { const N = f.length - 1, g = new Float64Array(N + 1); g[0] = Math.exp(f[0]); for (let k = 1; k <= N; k++) { let s = 0; for (let j = 1; j <= k; j++) s += j * f[j] * g[k - j]; g[k] = s / k; } return g; },
      log: (f) => { const N = f.length - 1, g = new Float64Array(N + 1); g[0] = Math.log(f[0]); for (let k = 1; k <= N; k++) { let s = 0; for (let j = 1; j < k; j++) s += j * g[j] * f[k - j]; g[k] = (f[k] - s / k) / f[0]; } return g; },
      sincos: (f, hyp) => {
        const N = f.length - 1, s = new Float64Array(N + 1), c = new Float64Array(N + 1);
        s[0] = hyp ? Math.sinh(f[0]) : Math.sin(f[0]); c[0] = hyp ? Math.cosh(f[0]) : Math.cos(f[0]);
        for (let k = 1; k <= N; k++) {
          let a = 0, b = 0;
          for (let j = 1; j <= k; j++) { a += j * f[j] * c[k - j]; b += j * f[j] * s[k - j]; }
          s[k] = a / k; c[k] = (hyp ? b : -b) / k;
        }
        return [s, c];
      },
      powc: (f, p) => {
        const N = f.length - 1, g = new Float64Array(N + 1);
        if (Number.isInteger(p) && p >= 0 && p <= 40) { let r = T.c(N, 1); for (let i = 0; i < p; i++) r = T.mul(r, f); return r; }
        if (f[0] === 0) throw new ExprError('power series undefined at this point');
        g[0] = Math.pow(f[0], p);
        for (let k = 1; k <= N; k++) { let s = 0; for (let j = 1; j <= k; j++) s += ((p + 1) * j - k) * f[j] * g[k - j]; g[k] = s / (k * f[0]); }
        return g;
      },
      deriv: (f) => { const N = f.length - 1, r = new Float64Array(N + 1); for (let k = 0; k < N; k++) r[k] = (k + 1) * f[k + 1]; return r; },
      integ: (f, c0) => { const N = f.length - 1, r = new Float64Array(N + 1); r[0] = c0; for (let k = 1; k <= N; k++) r[k] = f[k - 1] / k; return r; },
    };
    const isConst = (n) => n.t === 'num' || n.t === 'const' || (n.t === 'neg' && isConst(n.a));
    function ev(n, s, x0, N) {
      switch (n.t) {
        case 'num': return T.c(N, n.v);
        case 'const': return T.c(N, CONSTS[n.name]);
        case 'var': { if (n.name === v) { const r = T.c(N, x0); if (N >= 1) r[1] = 1; return r; } return T.c(N, +s[n.name]); }
        case 'neg': return ev(n.a, s, x0, N).map((q) => -q);
        case 'bin': {
          const a = ev(n.a, s, x0, N);
          if (n.op === '^') {
            if (isConst(n.b)) return T.powc(a, compile(n.b)({}));
            const b = ev(n.b, s, x0, N);
            if (b.slice(1).every((q) => q === 0)) return T.powc(a, b[0]);
            return T.exp(T.mul(b, T.log(a)));
          }
          const b = ev(n.b, s, x0, N);
          if (n.op === '+') return a.map((q, k) => q + b[k]);
          if (n.op === '-') return a.map((q, k) => q - b[k]);
          if (n.op === '*') return T.mul(a, b);
          if (n.op === '/') return T.div(a, b);
          break;
        }
        case 'call': {
          const f = n.f;
          const a = n.args.length ? ev(n.args[0], s, x0, N) : null;
          switch (f) {
            case 'exp': return T.exp(a);
            case 'ln': case 'log': {
              const g = T.log(a);
              if (n.args.length === 2) return g.map((q) => q / Math.log(compile(n.args[1])(s)));
              return g;
            }
            case 'log10': return T.log(a).map((q) => q / Math.LN10);
            case 'log2': return T.log(a).map((q) => q / Math.LN2);
            case 'sin': return T.sincos(a, false)[0];
            case 'cos': return T.sincos(a, false)[1];
            case 'tan': { const [sn, cs] = T.sincos(a, false); return T.div(sn, cs); }
            case 'sec': return T.div(T.c(N, 1), T.sincos(a, false)[1]);
            case 'csc': return T.div(T.c(N, 1), T.sincos(a, false)[0]);
            case 'cot': { const [sn, cs] = T.sincos(a, false); return T.div(cs, sn); }
            case 'sinh': return T.sincos(a, true)[0];
            case 'cosh': return T.sincos(a, true)[1];
            case 'tanh': { const [sn, cs] = T.sincos(a, true); return T.div(sn, cs); }
            case 'sqrt': return T.powc(a, 0.5);
            case 'cbrt': return T.powc(a, 1 / 3);
            case 'atan': {
              if (n.args.length === 2) break;
              const one = T.c(N, 1);
              return T.integ(T.div(T.deriv(a), one.map((q, k) => q + T.mul(a, a)[k])), Math.atan(a[0]));
            }
            case 'asin': return T.integ(T.div(T.deriv(a), T.powc(T.c(N, 1).map((q, k) => q - T.mul(a, a)[k]), 0.5)), Math.asin(a[0]));
            case 'acos': return T.integ(T.div(T.deriv(a), T.powc(T.c(N, 1).map((q, k) => q - T.mul(a, a)[k]), 0.5)), Math.asin(a[0])).map((q, k) => (k === 0 ? Math.PI / 2 - q : -q));
            case 'asinh': return T.integ(T.div(T.deriv(a), T.powc(T.c(N, 1).map((q, k) => q + T.mul(a, a)[k]), 0.5)), Math.asinh(a[0]));
            case 'atanh': return T.integ(T.div(T.deriv(a), T.c(N, 1).map((q, k) => q - T.mul(a, a)[k])), Math.atanh(a[0]));
            case 'abs': return a[0] >= 0 ? a : a.map((q) => -q);
            case 'pow': { const b = compile(n.args[1])(s); return T.powc(a, b); }
          }
          // non-analytic or unsupported: constant series of the value
          return T.c(N, compile(n)(Object.assign({}, s, { [v]: x0 })));
        }
      }
      return T.c(N, compile(n)(Object.assign({}, s, { [v]: x0 })));
    }
    return (scope, x0, N) => ev(ast, scope || {}, x0, N);
  }

  // ------------------------------------------------------------------ TeX
  const TEXF = { sin: '\\sin', cos: '\\cos', tan: '\\tan', sec: '\\sec', csc: '\\csc', cot: '\\cot', asin: '\\arcsin', acos: '\\arccos', atan: '\\arctan',
    sinh: '\\sinh', cosh: '\\cosh', tanh: '\\tanh', ln: '\\ln', log: '\\log', exp: '\\exp', gamma: '\\Gamma', min: '\\min', max: '\\max',
    re: '\\operatorname{Re}', im: '\\operatorname{Im}', arg: '\\arg', sign: '\\operatorname{sgn}', erf: '\\operatorname{erf}' };
  function fmtNum(v) {
    if (Number.isInteger(v)) return String(v);
    const s = String(+v.toPrecision(6));
    if (/e/.test(s)) { const [m, e] = s.split('e'); return m + '\\times 10^{' + (+e) + '}'; }
    return s;
  }
  function toTeX(n, parent) {
    const prec = (q) => (q.t === 'bin' ? ({ '+': 1, '-': 1, '*': 2, '/': 3, '^': 4 })[q.op] : q.t === 'neg' ? 1.5 : 5);
    const wrap = (q, min) => (prec(q) < min ? '\\left(' + toTeX(q) + '\\right)' : toTeX(q));
    switch (n.t) {
      case 'num': return fmtNum(n.v);
      case 'const': return { pi: '\\pi', e: 'e', tau: '\\tau', inf: '\\infty', infinity: '\\infty', phi: '\\varphi' }[n.name];
      case 'imag': return 'i';
      case 'var': return GREEK.includes(n.name) ? '\\' + n.name : (n.name.length > 1 ? n.name[0] + '_{' + n.name.slice(1) + '}' : n.name);
      case 'neg': return '-' + wrap(n.a, 2);
      case 'fact': return wrap(n.a, 5) + '!';
      case 'cmp': return toTeX(n.a) + ({ '<': '<', '>': '>', '<=': '\\le ', '>=': '\\ge ', '==': '=', '!=': '\\ne ', '&&': '\\land ', '||': '\\lor ' })[n.op] + toTeX(n.b);
      case 'bin':
        switch (n.op) {
          case '+': return toTeX(n.a) + '+' + toTeX(n.b);
          case '-': return toTeX(n.a) + '-' + wrap(n.b, 2);
          case '*': {
            const left = wrap(n.a, 2), right = wrap(n.b, 2);
            const implicitOk = (n.a.t === 'num' || n.a.t === 'const') && (n.b.t === 'var' || n.b.t === 'const' || n.b.t === 'call' || (n.b.t === 'bin' && n.b.op === '^'));
            return left + (implicitOk || (n.a.t === 'var' && n.b.t === 'var') ? '' : ' \\cdot ') + right;
          }
          case '/': return '\\frac{' + toTeX(n.a) + '}{' + toTeX(n.b) + '}';
          case '^': {
            if (n.a.t === 'const' && n.a.name === 'e') return 'e^{' + toTeX(n.b) + '}';
            const base = n.a.t === 'call' && TEXF[n.a.f] && !['exp'].includes(n.a.f) ? TEXF[n.a.f] + '^{' + toTeX(n.b) + '}\\left(' + toTeX(n.a.args[0]) + '\\right)' : null;
            if (base && n.a.args.length === 1 && n.b.t === 'num') return base;
            return (prec(n.a) < 5 || n.a.t === 'call' ? '\\left(' + toTeX(n.a) + '\\right)' : toTeX(n.a)) + '^{' + toTeX(n.b) + '}';
          }
        }
        break;
      case 'call': {
        const A = n.args.map((q) => toTeX(q));
        switch (n.f) {
          case 'sqrt': return '\\sqrt{' + A[0] + '}';
          case 'cbrt': return '\\sqrt[3]{' + A[0] + '}';
          case 'root': return '\\sqrt[' + A[1] + ']{' + A[0] + '}';
          case 'abs': return '\\left|' + A[0] + '\\right|';
          case 'floor': return '\\lfloor ' + A[0] + '\\rfloor';
          case 'ceil': return '\\lceil ' + A[0] + '\\rceil';
          case 'exp': return 'e^{' + A[0] + '}';
          case 'fact': return wrap(n.args[0], 5) + '!';
          case 'binom': return '\\binom{' + A[0] + '}{' + A[1] + '}';
          case 'conj': return '\\overline{' + A[0] + '}';
          case 'log10': return '\\log_{10}\\left(' + A[0] + '\\right)';
          case 'log2': return '\\log_{2}\\left(' + A[0] + '\\right)';
          case 'mod': return A[0] + '\\bmod ' + A[1];
          case 'if': return '\\begin{cases}' + A[1] + ' & ' + A[0] + '\\\\ ' + A[2] + ' & \\text{otherwise}\\end{cases}';
          case 'sum': return '\\sum_{' + A[1] + '=' + A[2] + '}^{' + A[3] + '}' + wrap(n.args[0], 2);
          case 'prod': return '\\prod_{' + A[1] + '=' + A[2] + '}^{' + A[3] + '}' + wrap(n.args[0], 2);
          case 'log': if (n.args.length === 2) return '\\log_{' + A[1] + '}\\left(' + A[0] + '\\right)'; break;
        }
        const name = TEXF[n.f] || '\\operatorname{' + n.f + '}';
        const simple = n.args.length === 1 && (n.args[0].t === 'var' || n.args[0].t === 'num' || n.args[0].t === 'const');
        return name + (simple ? ' ' + A[0] : '\\left(' + A.join(', ') + '\\right)');
      }
    }
    return '?';
  }

  // ------------------------------------------------------------------ helpers
  /** Compile a source string; returns {f, ast, error}. f(scope) -> number. */
  function fn(src, vars) {
    try {
      const ast = parse(src, { vars });
      return { f: compile(ast), ast, error: null };
    } catch (e) {
      return { f: null, ast: null, error: e.message };
    }
  }
  /** Numeric value of a constant expression such as "pi/4" or "3/2". */
  function value(src, scope) {
    const ast = parse(String(src), { vars: Object.keys(scope || {}) });
    return compile(ast)(scope || {});
  }
  /** Variables used in an AST. */
  function varsOf(ast, out) {
    out = out || new Set();
    if (!ast) return out;
    if (ast.t === 'var') out.add(ast.name);
    for (const k of ['a', 'b']) if (ast[k]) varsOf(ast[k], out);
    if (ast.args) ast.args.forEach((q) => varsOf(q, out));
    return out;
  }

  return { parse, compile, compileC, taylor, toTeX, fn, value, varsOf, gamma, erf, binom, rpow, ExprError, FUNCS, CONSTS };
});
