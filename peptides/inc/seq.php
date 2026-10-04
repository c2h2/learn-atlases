<?php
declare(strict_types=1);

/** Residue dictionary from data/residues.json. */
function residue_dict(): array
{
    static $d = null;
    if ($d === null) {
        $d = read_json(ATLAS_DATA . '/residues.json') ?? ['standard' => [], 'tokens' => []];
    }
    return $d;
}

/**
 * Describe one residue token.
 * Upper-case letter = L-amino acid, lower-case = D-amino acid, longer = non-canonical token.
 */
function residue_info(string $t): array
{
    $d = residue_dict();
    if (strlen($t) === 1) {
        $up = strtoupper($t);
        $s = $d['standard'][$up] ?? null;
        if ($s) {
            $isD = $t !== $up;
            return [
                'token' => $t, 'parent' => $up, 'd' => $isD, 'std' => !$isD,
                'class' => $s['class'], 'three' => ($isD ? 'D-' : '') . $s['three'],
                'name' => ($isD ? 'D-' : '') . (is_zh() ? ($s['zh'] ?? $s['name']) : $s['name']), 'label' => $up,
            ];
        }
    }
    $k = $d['tokens'][$t] ?? null;
    if ($k) {
        return [
            'token' => $t, 'parent' => $k['parent'], 'd' => !empty($k['d']), 'std' => false,
            'class' => 'noncanonical', 'three' => $t, 'name' => is_zh() ? ($k['zh'] ?? $k['name']) : $k['name'], 'label' => $k['abbr'] ?? $t,
            'note' => $k['note'] ?? '',
        ];
    }
    return ['token' => $t, 'parent' => 'X', 'd' => false, 'std' => false, 'class' => 'noncanonical',
            'three' => $t, 'name' => $t, 'label' => $t];
}

/** Canonical (parent) one-letter string for a chain, used for analysis and model building. */
function chain_letters(array $chain): string
{
    $s = '';
    foreach ($chain['residues'] ?? [] as $t) {
        $s .= residue_info($t)['parent'];
    }
    return $s;
}

const KD = ['A' => 1.8, 'R' => -4.5, 'N' => -3.5, 'D' => -3.5, 'C' => 2.5, 'Q' => -3.5, 'E' => -3.5, 'G' => -0.4,
    'H' => -3.2, 'I' => 4.5, 'L' => 3.8, 'K' => -3.9, 'M' => 1.9, 'F' => 2.8, 'P' => -1.6, 'S' => -0.8,
    'T' => -0.7, 'W' => -0.9, 'Y' => -1.3, 'V' => 4.2];

const EISENBERG = ['A' => 0.62, 'R' => -2.53, 'N' => -0.78, 'D' => -0.90, 'C' => 0.29, 'Q' => -0.85, 'E' => -0.74,
    'G' => 0.48, 'H' => -0.40, 'I' => 1.38, 'L' => 1.06, 'K' => -1.50, 'M' => 0.64, 'F' => 1.19, 'P' => 0.12,
    'S' => -0.18, 'T' => -0.05, 'W' => 0.81, 'Y' => 0.26, 'V' => 1.08];

// Side-chain pKa values (EMBOSS set); termini handled separately.
const PKA_POS = ['K' => 10.8, 'R' => 12.5, 'H' => 6.5];
const PKA_NEG = ['D' => 3.9, 'E' => 4.1, 'C' => 8.5, 'Y' => 10.1];
const PKA_NTERM = 8.6;
const PKA_CTERM = 3.6;
// Non-canonical tokens whose side chain does not ionise like their parent.
const NEUTRAL_TOKENS = ['Cit', 'pGlu', 'Mpa', 'Aib', 'Nle', 'Sar', 'Abu', 'Hyp', 'Tle', 'Cha', 'bAla',
    'aMeLeu', 'NMeLeu', 'NMeVal', 'NMeBmt', 'aMeF', 'Nal', 'dNal', 'dMeW'];

/** Ionisable groups for charge/pI: list of [pKa, sign]. */
function ionisable_groups(array $seq): array
{
    $g = [];
    $bridged = [];
    foreach ($seq['bridges'] ?? [] as $b) {
        $bridged[$b['from']] = $bridged[$b['to']] = true;
    }
    $cyclic = !empty($seq['cyclic']);
    foreach ($seq['chains'] ?? [] as $ci => $c) {
        $res = $c['residues'] ?? [];
        if (!$res) {
            continue;
        }
        $first = $res[0];
        $nFree = !$cyclic && ($c['n_term'] ?? 'H') === 'H' && !in_array($first, ['pGlu', 'Mpa'], true);
        if ($nFree) {
            $g[] = [PKA_NTERM, 1];
        }
        if (!$cyclic && ($c['c_term'] ?? 'OH') === 'OH') {
            $g[] = [PKA_CTERM, -1];
        }
        foreach ($res as $i => $t) {
            $pos = chr(65 + $ci) . ($i + 1);
            if (in_array($t, NEUTRAL_TOKENS, true)) {
                continue;
            }
            $p = residue_info($t)['parent'];
            if (isset(PKA_POS[$p])) {
                $g[] = [PKA_POS[$p], 1];
            } elseif (isset(PKA_NEG[$p]) && !($p === 'C' && isset($bridged[$pos]))) {
                $g[] = [PKA_NEG[$p], -1];
            } elseif ($t === 'Gla') {
                $g[] = [4.0, -1];
                $g[] = [4.0, -1];
            }
        }
    }
    return $g;
}

function charge_at(array $groups, float $pH): float
{
    $q = 0.0;
    foreach ($groups as [$pka, $sign]) {
        $q += $sign > 0 ? 1 / (1 + 10 ** ($pH - $pka)) : -1 / (1 + 10 ** ($pka - $pH));
    }
    return $q;
}

/** Physicochemical summary of the backbone sequence (side-chain conjugates are not included). */
function seq_properties(array $seq): array
{
    $counts = array_fill_keys(['positive', 'negative', 'hydrophobic', 'aromatic', 'polar', 'special', 'cysteine', 'noncanonical'], 0);
    $letters = '';
    $n = 0;
    $dCount = 0;
    $nonCanon = 0;
    foreach ($seq['chains'] ?? [] as $c) {
        foreach ($c['residues'] ?? [] as $t) {
            $r = residue_info($t);
            $counts[$r['class']]++;
            $letters .= $r['parent'];
            $n++;
            $dCount += $r['d'] ? 1 : 0;
            $nonCanon += $r['class'] === 'noncanonical' ? 1 : 0;
        }
    }
    $gravy = 0.0;
    $kdN = 0;
    foreach (str_split($letters) as $l) {
        if (isset(KD[$l])) {
            $gravy += KD[$l];
            $kdN++;
        }
    }
    $groups = ionisable_groups($seq);
    // Isoelectric point by bisection on the charge curve.
    $lo = 0.0;
    $hi = 14.0;
    for ($i = 0; $i < 60; $i++) {
        $mid = ($lo + $hi) / 2;
        if (charge_at($groups, $mid) > 0) {
            $lo = $mid;
        } else {
            $hi = $mid;
        }
    }
    $pI = $groups ? round(($lo + $hi) / 2, 2) : null;
    // Helical hydrophobic moment (Eisenberg, 100° per residue) of the longest chain.
    $longest = '';
    foreach ($seq['chains'] ?? [] as $c) {
        $l = chain_letters($c);
        if (strlen($l) > strlen($longest)) {
            $longest = $l;
        }
    }
    $mx = $my = 0.0;
    $hm = 0;
    foreach (str_split($longest) as $i => $l) {
        if (!isset(EISENBERG[$l])) {
            continue;
        }
        $a = deg2rad(100 * $i);
        $mx += EISENBERG[$l] * cos($a);
        $my += EISENBERG[$l] * sin($a);
        $hm++;
    }
    return [
        'length'      => $n,
        'counts'      => $counts,
        'd_residues'  => $dCount,
        'noncanonical' => $nonCanon,
        'gravy'       => $kdN ? round($gravy / $kdN, 3) : null,
        'charge74'    => $groups ? round(charge_at($groups, 7.4), 2) : 0.0,
        'pI'          => $pI,
        'muH'         => $hm ? round(sqrt($mx * $mx + $my * $my) / $hm, 3) : null,
        'letters'     => $letters,
    ];
}

/** Kyte–Doolittle sliding-window hydropathy for the longest chain. */
function hydropathy_profile(array $seq, int $window = 5): array
{
    $longest = '';
    foreach ($seq['chains'] ?? [] as $c) {
        $l = chain_letters($c);
        if (strlen($l) > strlen($longest)) {
            $longest = $l;
        }
    }
    $vals = array_map(fn($l) => KD[$l] ?? 0.0, str_split($longest));
    $n = count($vals);
    $half = intdiv($window, 2);
    $out = [];
    for ($i = 0; $i < $n; $i++) {
        $a = max(0, $i - $half);
        $b = min($n - 1, $i + $half);
        $slice = array_slice($vals, $a, $b - $a + 1);
        $out[] = round(array_sum($slice) / count($slice), 2);
    }
    return $out;
}

/** Map "A12" style position to [chainIndex, residueIndex0]. */
function parse_pos(string $p): ?array
{
    if (!preg_match('/^([A-Z])(\d+)$/', $p, $m)) {
        return null;
    }
    return [ord($m[1]) - 65, (int)$m[2] - 1];
}

/**
 * Render a peptide as a chain of residue beads (inline SVG).
 *
 * opts: unit (px between bead centres), letters (bool), annotate (bool, labels for modifications),
 *       width_units (force a common scale across rows), interactive (bool, data attributes),
 *       id (element id), class
 */
function bead_svg(array $p, array $opts = []): string
{
    $unit = (float)($opts['unit'] ?? 20);
    $r = $unit * 0.42;
    $letters = $opts['letters'] ?? true;
    $annotate = $opts['annotate'] ?? false;
    $capLabels = $opts['labels'] ?? true;
    $interactive = $opts['interactive'] ?? false;
    $seq = $p['sequence'] ?? [];
    $chains = $seq['chains'] ?? [];
    $mods = [];
    foreach ($seq['modifications'] ?? [] as $m) {
        $mods[$m['at']][] = $m;
    }
    $gap = $unit * 1.6;

    // x position of every residue
    $cursor = $unit * 1.2; // room for an N-terminal cap label
    $xy = [];
    foreach ($chains as $ci => $c) {
        if ($ci > 0) {
            $cursor += $gap;
        }
        $nt = $c['n_term'] ?? 'H';
        if ($nt !== 'H' && $ci > 0) {
            $cursor += $unit * 0.6;
        }
        foreach ($c['residues'] ?? [] as $i => $t) {
            $xy[$ci][$i] = $cursor;
            $cursor += $unit;
        }
        $cursor -= $unit;
        $cursor += $unit * 0.4;
    }
    $contentW = $cursor + $unit * 1.4;
    $width = max($contentW, (float)($opts['width_units'] ?? 0) * $unit);

    // vertical space: arcs above, tails below
    $maxSpan = 0;
    foreach ($seq['bridges'] ?? [] as $b) {
        $a = parse_pos($b['from']);
        $z = parse_pos($b['to']);
        if ($a && $z && isset($xy[$a[0]][$a[1]], $xy[$z[0]][$z[1]])) {
            $maxSpan = max($maxSpan, abs($xy[$z[0]][$z[1]] - $xy[$a[0]][$a[1]]));
        }
    }
    if (!empty($seq['cyclic'])) {
        $maxSpan = max($maxSpan, $cursor);
    }
    $arcH = $maxSpan > 0 ? min($unit * 1.9, max($unit * 0.9, $maxSpan * 0.12)) : 0;
    $hasTail = false;
    foreach ($mods as $list) {
        foreach ($list as $m) {
            if (in_array($m['type'], ['lipidation', 'albumin-binder', 'pegylation', 'metal', 'glycosylation'], true)) {
                $hasTail = true;
            }
        }
    }
    $top = $arcH + $r + 3;
    $cy = $top;
    $tailH = $hasTail ? $unit * 1.3 : 0;
    $labelH = $annotate && $mods ? $unit * 0.95 : 0;
    $height = $cy + $r + 4 + max($tailH, 0) + $labelH;

    $cls = 'beads' . (isset($opts['class']) ? ' ' . $opts['class'] : '');
    $id = isset($opts['id']) ? ' id="' . h($opts['id']) . '"' : '';
    $vw = round($width, 1);
    $vh = round($height, 1);
    $label = h(t('%s residue chain, %d residues', $p['name'], (int)($p['len'] ?? 0)));
    $o = "<svg class=\"$cls\"$id viewBox=\"0 0 $vw $vh\" width=\"$vw\" height=\"$vh\" role=\"img\" aria-label=\"$label\" preserveAspectRatio=\"xMinYMid meet\">";

    // bridges (drawn first, beads sit on top)
    foreach ($seq['bridges'] ?? [] as $b) {
        $a = parse_pos($b['from']);
        $z = parse_pos($b['to']);
        if (!$a || !$z || !isset($xy[$a[0]][$a[1]], $xy[$z[0]][$z[1]])) {
            continue;
        }
        $x1 = $xy[$a[0]][$a[1]];
        $x2 = $xy[$z[0]][$z[1]];
        $span = abs($x2 - $x1);
        $hgt = min($arcH, max($unit * 0.7, $span * 0.18));
        $y = $cy - $r * 0.6;
        $type = h($b['type']);
        $o .= "<path class=\"bridge bridge-$type\" d=\"M$x1 $y C$x1 " . round($y - $hgt * 1.3, 1) . " $x2 " . round($y - $hgt * 1.3, 1) . " $x2 $y\"><title>" . h(t(ucfirst($b['type']) . ' bridge') . ' ' . $b['from'] . '–' . $b['to']) . '</title></path>';
    }
    if (!empty($seq['cyclic']) && isset($xy[0][0])) {
        $x1 = $xy[0][0];
        $x2 = end($xy[0]);
        $y = $cy - $r * 0.6;
        $o .= "<path class=\"bridge bridge-cyclic\" d=\"M$x1 $y C$x1 " . round($y - $arcH * 1.25, 1) . " $x2 " . round($y - $arcH * 1.25, 1) . " $x2 $y\"><title>" . h(t('Head-to-tail cyclic backbone')) . "</title></path>";
    }

    // backbone line per chain
    foreach ($chains as $ci => $c) {
        if (empty($xy[$ci])) {
            continue;
        }
        $x1 = reset($xy[$ci]);
        $x2 = end($xy[$ci]);
        $o .= "<line class=\"backbone\" x1=\"$x1\" y1=\"$cy\" x2=\"$x2\" y2=\"$cy\"/>";
        $nt = $c['n_term'] ?? 'H';
        $ct = $c['c_term'] ?? 'OH';
        $fs = round($unit * 0.42, 1);
        if ($nt !== 'H' && $capLabels) {
            $capTxt = $nt === 'Ac' ? 'Ac' : (mb_strlen($nt) > 4 ? mb_substr($nt, 0, 3) . '…' : $nt);
            $o .= '<text class="cap" x="' . round($x1 - $r - 2, 1) . "\" y=\"$cy\" font-size=\"$fs\" text-anchor=\"end\" dominant-baseline=\"central\"><title>" . h(t('N-terminus: %s', $nt)) . '</title>' . h($capTxt) . '</text>';
        }
        if ($ct !== 'OH' && $capLabels) {
            $capTxt = ['NH2' => 'NH₂', 'NHEt' => 'NHEt', 'ol' => 'ol'][$ct] ?? $ct;
            $o .= '<text class="cap" x="' . round($x2 + $r + 2, 1) . "\" y=\"$cy\" font-size=\"$fs\" dominant-baseline=\"central\"><title>" . h(t('C-terminus: %s', $ct)) . '</title>' . h($capTxt) . '</text>';
        }
        if (count($chains) > 1 && $capLabels) {
            $o .= '<text class="chain-name" x="' . $x1 . '" y="' . round($cy + $r + $fs + 2, 1) . "\" font-size=\"$fs\">" . h(t($c['name'] ?? '')) . '</text>';
        }
    }

    // tails for conjugates, then beads
    $annotations = [];
    $offset = (int)($seq['numbering_offset'] ?? 0);
    foreach ($chains as $ci => $c) {
        foreach ($c['residues'] ?? [] as $i => $t) {
            $x = $xy[$ci][$i];
            $pos = chr(65 + $ci) . ($i + 1);
            $info = residue_info($t);
            foreach ($mods[$pos] ?? [] as $m) {
                if (in_array($m['type'], ['lipidation', 'albumin-binder', 'pegylation', 'glycosylation'], true)) {
                    $pts = [];
                    $segs = 6;
                    for ($k = 0; $k <= $segs; $k++) {
                        $pts[] = round($x + ($k % 2 ? $unit * 0.22 : -$unit * 0.22), 1) . ',' . round($cy + $r + $k * ($tailH - 2) / $segs, 1);
                    }
                    $o .= '<polyline class="tail tail-' . h($m['type']) . '" points="' . implode(' ', $pts) . '"><title>' . h($m['label']) . '</title></polyline>';
                } elseif ($m['type'] === 'metal') {
                    $o .= '<line class="tail" x1="' . $x . '" y1="' . round($cy + $r, 1) . '" x2="' . $x . '" y2="' . round($cy + $r + $tailH * 0.45, 1) . '"/>';
                    $o .= '<circle class="metal" cx="' . $x . '" cy="' . round($cy + $r + $tailH * 0.62, 1) . '" r="' . round($r * 0.72, 1) . '"><title>' . h($m['label']) . '</title></circle>';
                }
                if ($annotate) {
                    $annotations[] = [$x, $m];
                }
            }
            $shown = $i + 1 + $offset;
            $title = $info['name'] . ' ' . ($shown) . ($offset ? ' ' . t('(residue %d)', $i + 1) : '') . (count($chains) > 1 ? ', ' . t($c['name'] ?? '') : '');
            foreach ($mods[$pos] ?? [] as $m) {
                $title .= ' — ' . $m['label'];
            }
            $data = $interactive ? ' data-c="' . $ci . '" data-i="' . ($i + 1) . '" data-t="' . h($t) . '" tabindex="-1"' : '';
            $classes = 'bd c-' . $info['class'] . ($info['d'] ? ' is-d' : '') . (isset($mods[$pos]) ? ' is-mod' : '');
            $o .= "<g class=\"$classes\"$data><title>" . h($title) . '</title>';
            $o .= "<circle cx=\"$x\" cy=\"$cy\" r=\"" . round($r, 2) . '"/>';
            if ($info['d']) {
                $o .= "<circle class=\"dring\" cx=\"$x\" cy=\"$cy\" r=\"" . round($r * 0.72, 2) . '"/>';
            }
            if ($letters) {
                $lab = strlen($t) === 1 ? $info['parent'] : $info['label'];
                $len = mb_strlen($lab);
                $fs = $len === 1 ? $unit * 0.5 : ($len <= 3 ? $unit * 0.3 : $unit * 0.22);
                if ($len > 4) {
                    $lab = mb_substr($lab, 0, 4);
                }
                $o .= "<text x=\"$x\" y=\"$cy\" font-size=\"" . round($fs, 1) . '" text-anchor="middle" dominant-baseline="central">' . h($lab) . '</text>';
            }
            $o .= '</g>';
        }
    }

    // modification labels under the chain, spread to avoid overlap
    if ($annotate && $annotations) {
        usort($annotations, fn($a, $b) => $a[0] <=> $b[0]);
        $ly = round($cy + $r + max($tailH, $unit * 0.2) + $unit * 0.6, 1);
        $lastEnd = -INF;
        $fs = round($unit * 0.4, 1);
        foreach ($annotations as [$x, $m]) {
            $txt = $m['short'] ?? ucfirst($m['type']);
            $w = mb_strlen($txt) * $fs * 0.56;
            $lx = max($x, $lastEnd + 6);
            if ($lx + $w > $width) {
                $lx = $width - $w - 2;
            }
            $o .= '<text class="mod-label" x="' . round($lx, 1) . "\" y=\"$ly\" font-size=\"$fs\"><title>" . h($m['label']) . '</title>' . h($txt) . '</text>';
            $lastEnd = $lx + $w;
        }
    }
    return $o . '</svg>';
}

/** Helical wheel (Schiffer–Edmundson) of the longest chain, up to 36 residues, as inline SVG. */
function helical_wheel_svg(array $p, int $max = 36): string
{
    $seq = $p['sequence'] ?? [];
    $chain = null;
    foreach ($seq['chains'] ?? [] as $c) {
        if (!$chain || count($c['residues']) > count($chain['residues'])) {
            $chain = $c;
        }
    }
    if (!$chain) {
        return '';
    }
    $res = array_slice($chain['residues'], 0, $max);
    $n = count($res);
    $size = 320;
    $cx = $cy = $size / 2;
    $pts = [];
    foreach ($res as $i => $t) {
        $turn = intdiv($i, 18);
        $rad = 62 + $turn * 44;
        $a = deg2rad(100 * $i - 90);
        $pts[] = [$cx + $rad * cos($a), $cy + $rad * sin($a), $t, $i];
    }
    $o = '<svg class="wheel" viewBox="0 0 ' . $size . ' ' . $size . '" role="img" aria-label="' . h(t('Helical wheel of %s', $p['name'])) . '">';
    // hydrophobic moment arrow
    $mx = $my = 0.0;
    foreach ($res as $i => $t) {
        $l = residue_info($t)['parent'];
        $a = deg2rad(100 * $i - 90);
        $mx += (EISENBERG[$l] ?? 0) * cos($a);
        $my += (EISENBERG[$l] ?? 0) * sin($a);
    }
    $mag = sqrt($mx * $mx + $my * $my);
    for ($i = 1; $i < $n; $i++) {
        [$x1, $y1] = $pts[$i - 1];
        [$x2, $y2] = $pts[$i];
        $o .= '<line class="wheel-link" x1="' . round($x1, 1) . '" y1="' . round($y1, 1) . '" x2="' . round($x2, 1) . '" y2="' . round($y2, 1) . '"/>';
    }
    if ($mag > 0.01) {
        $len = min(52, 14 + $mag * 9);
        $ex = $cx + $mx / $mag * $len;
        $ey = $cy + $my / $mag * $len;
        $o .= '<line class="wheel-moment" x1="' . $cx . '" y1="' . $cy . '" x2="' . round($ex, 1) . '" y2="' . round($ey, 1) . '"><title>' . h(t('Hydrophobic moment: points to the hydrophobic face')) . '</title></line>';
        $o .= '<circle class="wheel-moment-head" cx="' . round($ex, 1) . '" cy="' . round($ey, 1) . '" r="3.5"/>';
    }
    foreach ($pts as [$x, $y, $t, $i]) {
        $info = residue_info($t);
        $lab = strlen($t) === 1 ? $info['parent'] : mb_substr($info['label'], 0, 3);
        $fs = mb_strlen($lab) > 1 ? 7.5 : 11;
        $o .= '<g class="bd c-' . $info['class'] . ($info['d'] ? ' is-d' : '') . '"><title>' . h($info['name'] . ' ' . ($i + 1)) . '</title>';
        $o .= '<circle cx="' . round($x, 1) . '" cy="' . round($y, 1) . '" r="12.5"/>';
        if ($info['d']) {
            $o .= '<circle class="dring" cx="' . round($x, 1) . '" cy="' . round($y, 1) . '" r="9"/>';
        }
        $o .= '<text x="' . round($x, 1) . '" y="' . round($y, 1) . '" font-size="' . $fs . '" text-anchor="middle" dominant-baseline="central">' . h($lab) . '</text></g>';
        // numbers sit outside the outermost ring and inside the inner rings, so they never touch a neighbouring ring
        $d = max(1, hypot($x - $cx, $y - $cy));
        $out = intdiv($i, 18) === intdiv($n - 1, 18) ? 19 : -19;
        $o .= '<text class="wheel-num" x="' . round($x + ($x - $cx) / $d * $out, 1) . '" y="' . round($y + ($y - $cy) / $d * $out, 1) . '" text-anchor="middle" dominant-baseline="central" font-size="8">' . ($i + 1) . '</text>';
    }
    return $o . '</svg>';
}

/** Three-letter notation fallback when a record has none. */
function seq_notation(array $seq): string
{
    if (!empty($seq['notation'])) {
        return $seq['notation'];
    }
    $parts = [];
    foreach ($seq['chains'] ?? [] as $c) {
        $t = array_map(fn($x) => residue_info($x)['three'], $c['residues'] ?? []);
        $parts[] = ($c['n_term'] ?? 'H') . '-' . implode('-', $t) . '-' . ($c['c_term'] ?? 'OH');
    }
    return implode(' / ', $parts);
}
