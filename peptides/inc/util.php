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
function write_json(string $path, $data): void
{
    $dir = dirname($path);
    if (!is_dir($dir)) {
        mkdir($dir, 0775, true);
    }
    $tmp = $path . '.tmp' . getmypid();
    file_put_contents($tmp, json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
    rename($tmp, $path);
}

/** Compact number: 1,284 / 12.9K / 4.2M, or 1.3万 / 4.2亿 in Chinese. */
function compact_num($n, int $dec = 1): string
{
    if ($n === null) {
        return '–';
    }
    $n = (float)$n;
    $a = abs($n);
    $trim = fn(string $x) => rtrim(rtrim($x, '0'), '.');
    if (is_zh()) {
        if ($a >= 1e8) return $trim(number_format($n / 1e8, $dec)) . '亿';
        if ($a >= 1e4) return $trim(number_format($n / 1e4, $dec)) . '万';
        return number_format($n);
    }
    if ($a >= 1e9) return $trim(number_format($n / 1e9, $dec)) . 'B';
    if ($a >= 1e6) return $trim(number_format($n / 1e6, $dec)) . 'M';
    if ($a >= 1e4) return $trim(number_format($n / 1e3, $dec)) . 'K';
    return number_format($n);
}

/** "2017-12-05" -> "5 Dec 2017" (or "2017年12月5日"), "2017-12" -> "Dec 2017", "2017" -> "2017". */
function fmt_date(?string $d): string
{
    if (!$d) {
        return '';
    }
    $p = explode('-', $d);
    if (is_zh()) {
        return $p[0] . '年' . (isset($p[1]) ? (int)$p[1] . '月' : '') . (isset($p[2]) ? (int)$p[2] . '日' : '');
    }
    $months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    if (count($p) === 3) return (int)$p[2] . ' ' . $months[(int)$p[1] - 1] . ' ' . $p[0];
    if (count($p) === 2) return $months[(int)$p[1] - 1] . ' ' . $p[0];
    return $p[0];
}

/** Asset URL with a cache-busting version (static files are cached for 30 days upstream). */
function asset(string $rel): string
{
    $f = ATLAS_ROOT . '/' . $rel;
    $v = is_file($f) ? base_convert((string)filemtime($f), 10, 36) : '0';
    return $rel . '?v=' . $v;
}

/** Link to a page in this app, keeping URLs relative (works under any prefix) and the language. */
function url(string $page, array $q = []): string
{
    if (is_zh() && !array_key_exists('lang', $q)) {
        $q['lang'] = 'zh';
    }
    $q = array_filter($q, fn($v) => $v !== null);
    return $page . ($q ? '?' . http_build_query($q) : '');
}

/** The current page in another language (other query parameters kept). */
function lang_url(string $to): string
{
    $q = $_GET;
    $q['lang'] = $to;
    return basename($_SERVER['SCRIPT_NAME'] ?? 'index.php') . '?' . http_build_query($q);
}

/** JSON for embedding in <script type="application/json">. */
function json_embed($data): string
{
    return json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_HEX_TAG | JSON_HEX_AMP);
}

function plural(int $n, string $one, ?string $many = null): string
{
    return number_format($n) . ' ' . ($n === 1 ? $one : ($many ?? $one . 's'));
}
