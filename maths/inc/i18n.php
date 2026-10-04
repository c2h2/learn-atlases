<?php
declare(strict_types=1);

const LANGS = [
    'en' => ['label' => 'English', 'html' => 'en', 'switch' => 'EN'],
    'zh' => ['label' => '中文', 'html' => 'zh-CN', 'switch' => '中文'],
];

/**
 * Page language: ?lang= wins (and is remembered in a cookie), then the cookie,
 * then the browser's Accept-Language. English is the default.
 */
function lang(): string
{
    static $l = null;
    if (isset($GLOBALS['MA_LANG']) && isset(LANGS[$GLOBALS['MA_LANG']])) {
        return $GLOBALS['MA_LANG']; // set by CLI tools
    }
    if ($l !== null) {
        return $l;
    }
    $q = $_GET['lang'] ?? null;
    if (is_string($q) && isset(LANGS[$q])) {
        $l = $q;
        if (PHP_SAPI !== 'cli' && !headers_sent()) {
            setcookie('maths_lang', $l, ['expires' => time() + 31536000, 'path' => cookie_path(), 'samesite' => 'Lax']);
        }
        return $l;
    }
    $c = $_COOKIE['maths_lang'] ?? null;
    if (is_string($c) && isset(LANGS[$c])) {
        return $l = $c;
    }
    $al = strtolower((string)($_SERVER['HTTP_ACCEPT_LANGUAGE'] ?? ''));
    return $l = str_starts_with($al, 'zh') ? 'zh' : 'en';
}

function is_zh(): bool
{
    return lang() === 'zh';
}

function cookie_path(): string
{
    $d = rtrim(str_replace('\\', '/', dirname($_SERVER['SCRIPT_NAME'] ?? '/')), '/');
    return $d . '/';
}

/** Translate an English UI string; extra args are sprintf values. */
function t(string $s, ...$args): string
{
    static $dict = null;
    $out = $s;
    if (lang() !== 'en') {
        $dict ??= require __DIR__ . '/lang/zh.php';
        $out = $dict[$s] ?? $s;
    }
    return $args ? vsprintf($out, $args) : $out;
}

/** The JS-side dictionary (English => current language) for strings used in assets/js. */
function js_dict(): array
{
    if (lang() === 'en') {
        return [];
    }
    $all = require __DIR__ . '/lang/zh.php';
    $keysFile = __DIR__ . '/lang/js_keys.php';
    $js = is_file($keysFile) ? require $keysFile : array_keys($all);
    // all figure strings go to the browser, including labels the scripts pass to MA.t through variables
    $figures = __DIR__ . '/lang/zh-figures.php';
    $out = is_file($figures) ? require $figures : [];
    foreach ($js as $k) {
        if (isset($all[$k])) {
            $out[$k] = $all[$k];
        }
    }
    return $out;
}

/** Recursively overlay translated strings onto a record; lists are merged index by index. */
function overlay(array $base, array $ov): array
{
    foreach ($ov as $k => $v) {
        if (!array_key_exists($k, $base)) {
            continue;
        }
        if (is_array($v) && is_array($base[$k])) {
            if (array_is_list($v) && array_is_list($base[$k])) {
                foreach ($v as $i => $item) {
                    if (!array_key_exists($i, $base[$k])) {
                        continue;
                    }
                    if (is_array($item) && is_array($base[$k][$i])) {
                        $base[$k][$i] = overlay($base[$k][$i], $item);
                    } elseif (is_string($item) && $item !== '' && is_string($base[$k][$i])) {
                        $base[$k][$i] = $item;
                    }
                }
            } else {
                $base[$k] = overlay($base[$k], $v);
            }
        } elseif (is_string($v) && $v !== '' && (is_string($base[$k]) || $base[$k] === null)) {
            $base[$k] = $v;
        }
    }
    return $base;
}

/** " (x)" in English, "（x）" in Chinese. */
function paren(string $s): string
{
    return is_zh() ? '（' . $s . '）' : ' (' . $s . ')';
}

function list_sep(): string
{
    return is_zh() ? '、' : ', ';
}
