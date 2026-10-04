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
    if (isset($GLOBALS['ATLAS_LANG']) && isset(LANGS[$GLOBALS['ATLAS_LANG']])) {
        return $GLOBALS['ATLAS_LANG']; // set by CLI tools
    }
    if ($l !== null) {
        return $l;
    }
    $q = $_GET['lang'] ?? null;
    if (is_string($q) && isset(LANGS[$q])) {
        $l = $q;
        if (PHP_SAPI !== 'cli' && !headers_sent()) {
            setcookie('atlas_lang', $l, ['expires' => time() + 31536000, 'path' => cookie_path(), 'samesite' => 'Lax']);
        }
        return $l;
    }
    $c = $_COOKIE['atlas_lang'] ?? null;
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
    $js = require __DIR__ . '/lang/js_keys.php';
    $out = [];
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

/** Company and institution names that have established Chinese forms (see tools/GLOSSARY_ZH.md). */
function zh_orgs(string $s): string
{
    static $map = [
        'Novo Nordisk' => '诺和诺德', 'Eli Lilly and Company' => '礼来', 'Eli Lilly' => '礼来', 'Lilly' => '礼来',
        'Boehringer Ingelheim' => '勃林格殷格翰', 'Innovent Biologics' => '信达生物', 'Innovent' => '信达生物',
        'AstraZeneca' => '阿斯利康', 'Sanofi' => '赛诺菲', 'Pfizer' => '辉瑞', 'Novartis' => '诺华', 'Sandoz' => '山德士',
        'Takeda' => '武田', 'AbbVie' => '艾伯维', 'Abbott' => '雅培', 'Ipsen' => '益普生', 'Ferring' => '辉凌',
        'Merck Sharp & Dohme' => '默沙东', 'Roche' => '罗氏', 'Genentech' => '基因泰克', 'Teva' => '梯瓦',
        'Sun Pharma' => '太阳制药', "Dr Reddy's" => '瑞迪博士', 'Serono' => '雪兰诺', 'SciClone Pharmaceuticals' => '赛生药业',
        'SciClone' => '赛生药业', 'Bristol-Myers Squibb' => '百时美施贵宝', 'Wyeth' => '惠氏', 'Bayer' => '拜耳',
        'GlaxoSmithKline' => '葛兰素史克', 'Amgen' => '安进', 'Hengrui' => '恒瑞医药', 'Huadong Medicine' => '华东医药',
        'University of Toronto' => '多伦多大学', 'Russian Academy of Sciences' => '俄罗斯科学院',
    ];
    return is_zh() ? strtr($s, $map) : $s;
}

/** Translation overlay for a data file, e.g. zh_data('families') -> data/i18n/zh/families.json */
function zh_data(string $name): ?array
{
    return is_zh() ? read_json(ATLAS_DATA . "/i18n/zh/$name.json") : null;
}
