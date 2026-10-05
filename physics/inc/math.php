<?php
declare(strict_types=1);

/**
 * Formulas are rendered to HTML ahead of time by KaTeX (tools/build.js) and stored per document in
 * data/cache/katex/<lang>/<course>/<chapter>.json as { md5("I:"|"D:" + tex): html }.
 * A formula missing from the cache is sent as TeX and typeset in the browser instead.
 */
final class MathCtx
{
    /** @var array<string,string> hash => KaTeX HTML for the documents loaded so far */
    public static array $map = [];
    /** @var array<string,bool> cache keys already loaded */
    public static array $loaded = [];
    /** When an array, formulas are recorded here (tools/extract.php) as hash => [tex, display, line]. */
    public static ?array $collect = null;
    /** Number of formulas that had to fall back to browser rendering on this page. */
    public static int $misses = 0;
}

function math_hash(string $tex, bool $display): string
{
    return md5(($display ? 'D:' : 'I:') . $tex);
}

/** Load the pre-rendered formulas of one document ("en/calculus-1/limits", "en/calculus-1/_course", "en/_site"). */
function math_load(string $key): void
{
    if (isset(MathCtx::$loaded[$key])) {
        return;
    }
    MathCtx::$loaded[$key] = true;
    $m = read_json(MA_CACHE . '/katex/' . $key . '.json');
    if ($m) {
        MathCtx::$map += $m;
    }
}

/** HTML for one formula. Display formulas come back without a wrapper; callers place them in a block. */
function math_html(string $tex, bool $display, int $line = 0): string
{
    $tex = trim($tex);
    $hash = math_hash($tex, $display);
    if (MathCtx::$collect !== null) {
        MathCtx::$collect[$hash] = ['tex' => $tex, 'display' => $display, 'line' => $line];
    }
    if (isset(MathCtx::$map[$hash])) {
        return MathCtx::$map[$hash];
    }
    MathCtx::$misses++;
    return '<span class="math-tex" data-display="' . ($display ? '1' : '0') . '">' . h($tex) . '</span>';
}
