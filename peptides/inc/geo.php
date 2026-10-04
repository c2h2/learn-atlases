<?php
declare(strict_types=1);

/** ISO 3166 table keyed by numeric code: {a2, a3, name, region, sub}. */
function iso_table(): array
{
    static $t = null;
    if ($t === null) {
        $t = read_json(ATLAS_ROOT . '/assets/geo/iso.min.json') ?? [];
    }
    return $t;
}

function geo_norm(string $s): string
{
    $s = mb_strtolower($s);
    $s = str_replace(['&', '’', "'"], ['and', '', ''], $s);
    $s = preg_replace('/\(.*?\)|\bthe\b|,/u', ' ', $s);
    $s = preg_replace('/[^a-z0-9 ]+/u', ' ', iconv('UTF-8', 'ASCII//TRANSLIT', $s) ?: $s);
    return trim(preg_replace('/\s+/', ' ', $s));
}

/** Map a country name (as ClinicalTrials.gov spells it) to an ISO numeric code, or null. */
function country_numeric(string $name): ?string
{
    static $idx = null;
    if ($idx === null) {
        $idx = [];
        foreach (iso_table() as $num => $c) {
            $idx[geo_norm($c['name'])] = (string)$num;
            $idx[mb_strtolower($c['a2'])] = (string)$num;
        }
        $alias = [
            'united states' => '840', 'united kingdom' => '826', 'russia' => '643', 'russian federation' => '643',
            'korea republic of' => '410', 'south korea' => '410', 'korea democratic peoples republic of' => '408',
            'iran islamic republic of' => '364', 'iran' => '364', 'taiwan' => '158', 'vietnam' => '704', 'viet nam' => '704',
            'turkey' => '792', 'turkiye' => '792', 'czech republic' => '203', 'czechia' => '203', 'syria' => '760',
            'syrian arab republic' => '760', 'laos' => '418', 'bolivia' => '068', 'venezuela' => '862', 'tanzania' => '834',
            'moldova' => '498', 'moldova republic of' => '498', 'macedonia' => '807', 'north macedonia' => '807',
            'former yugoslav republic of macedonia' => '807', 'macedonia former yugoslav republic of' => '807',
            'congo' => '178', 'congo democratic republic of' => '180', 'democratic republic of congo' => '180',
            'cote divoire' => '384', 'ivory coast' => '384', 'palestinian territory occupied' => '275', 'palestine' => '275',
            'hong kong' => '344', 'macau' => '446', 'macao' => '446', 'brunei' => '096', 'cape verde' => '132',
            'swaziland' => '748', 'eswatini' => '748', 'micronesia' => '583', 'libya' => '434', 'libyan arab jamahiriya' => '434',
            'netherlands' => '528', 'bosnia and herzegovina' => '070', 'kosovo' => null,
        ];
        foreach ($alias as $k => $v) {
            if ($v !== null) {
                $idx[$k] = $v;
            }
        }
    }
    $k = geo_norm($name);
    return $idx[$k] ?? null;
}

function numeric_from_a2(string $a2): ?string
{
    static $m = null;
    if ($m === null) {
        $m = [];
        foreach (iso_table() as $num => $c) {
            $m[$c['a2']] = (string)$num;
        }
    }
    return $m[strtoupper($a2)] ?? null;
}

/** Short display names for the map tooltip, keyed by numeric code (in the page language). */
function country_names(): array
{
    if (is_zh()) {
        $zh = read_json(ATLAS_ROOT . '/assets/geo/country_zh.json') ?? [];
        $short = ['HK' => '中国香港', 'MO' => '中国澳门', 'TW' => '中国台湾', 'PS' => '巴勒斯坦'];
        $o = [];
        foreach (iso_table() as $num => $c) {
            $o[(string)$num] = $short[$c['a2']] ?? ($zh[$c['a2']] ?? $c['name']);
        }
        return $o;
    }
    $short = ['840' => 'United States', '826' => 'United Kingdom', '643' => 'Russia', '410' => 'South Korea', '408' => 'North Korea',
        '364' => 'Iran', '158' => 'Taiwan', '704' => 'Vietnam', '792' => 'Türkiye', '760' => 'Syria', '418' => 'Laos', '068' => 'Bolivia',
        '862' => 'Venezuela', '834' => 'Tanzania', '498' => 'Moldova', '180' => 'DR Congo', '178' => 'Congo', '275' => 'Palestine',
        '344' => 'Hong Kong', '446' => 'Macao', '096' => 'Brunei', '583' => 'Micronesia', '807' => 'North Macedonia'];
    $o = [];
    foreach (iso_table() as $num => $c) {
        $o[(string)$num] = $short[(string)$num] ?? preg_replace('/\s*\(.*\)$/', '', $c['name']);
    }
    return $o;
}
