<?php
declare(strict_types=1);

/** HTML-escape. */
function h(?string $s): string
{
    return htmlspecialchars((string)$s, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

/** Read and decode a JSON file, or null if missing/invalid. */
function read_json(string $path): ?array
{
    if (!is_file($path)) {
        return null;
    }
    $d = json_decode((string)file_get_contents($path), true);
    return is_array($d) ? $d : null;
}

/** Write JSON atomically (temp file + rename) so readers never see half a file. */
function write_json(string $path, $data, bool $pretty = false): void
{
    $dir = dirname($path);
    if (!is_dir($dir)) {
        // shared by the web server and the command-line build tools, so world-writable
        $old = umask(0);
        @mkdir($dir, 0777, true);
        umask($old);
    }
    $tmp = $path . '.tmp' . getmypid();
    $flags = JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | ($pretty ? JSON_PRETTY_PRINT : 0);
    if (@file_put_contents($tmp, json_encode($data, $flags)) !== false) {
        @chmod($tmp, 0666);
        @rename($tmp, $path);
    }
}

/** Asset URL with a cache-busting version (static files are cached for 30 days upstream). */
function asset(string $rel): string
{
    $f = MA_ROOT . '/' . $rel;
    $v = is_file($f) ? base_convert((string)filemtime($f), 10, 36) : '0';
    return $rel . '?v=' . $v;
}

/** Link to a page in this app, keeping URLs relative (works under any prefix) and the language. */
function url(string $page, array $q = []): string
{
    if (is_zh() && !array_key_exists('lang', $q)) {
        $q['lang'] = 'zh';
    }
    $q = array_filter($q, fn($v) => $v !== null && $v !== '');
    $frag = '';
    if (isset($q['#'])) {
        $frag = '#' . $q['#'];
        unset($q['#']);
    }
    return $page . ($q ? '?' . http_build_query($q) : '') . $frag;
}

/** The current page in another language (other query parameters kept). */
function lang_url(string $to): string
{
    $q = $_GET;
    $q['lang'] = $to;
    return basename($_SERVER['SCRIPT_NAME'] ?? 'index.php') . '?' . http_build_query($q);
}

/** JSON for embedding in <script type="application/json"> or a data attribute. */
function json_embed($data): string
{
    return json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT);
}

function plural(int $n, string $one, ?string $many = null): string
{
    if (is_zh()) {
        return number_format($n) . ' ' . t($one);
    }
    return number_format($n) . ' ' . ($n === 1 ? $one : ($many ?? $one . 's'));
}

/** ASCII slug for ids: "Mean Value Theorem" -> "mean-value-theorem". */
function slugify(string $s): string
{
    $s = strtolower(trim(preg_replace('/[^A-Za-z0-9]+/', '-', iconv('UTF-8', 'ASCII//TRANSLIT//IGNORE', $s) ?: '') ?? '', '-'));
    return $s;
}

/** Year label: 1687, "c. 300 BC" for negative years. */
function year_label(int $y): string
{
    if ($y < 0) {
        return is_zh() ? '公元前' . (-$y) . '年' : (-$y) . ' BC';
    }
    return (string)$y;
}

/** Newest modification time among files matching the glob patterns. */
function newest_mtime(array $patterns): int
{
    $m = 0;
    foreach ($patterns as $p) {
        foreach (glob($p) ?: [] as $f) {
            $m = max($m, (int)filemtime($f));
        }
    }
    return $m;
}
