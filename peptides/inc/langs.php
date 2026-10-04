<?php
declare(strict_types=1);

/** English names of Wikipedia language editions (code => name). */
function lang_name(string $code): string
{
    static $n = [
        'en' => 'English', 'de' => 'German', 'fr' => 'French', 'es' => 'Spanish', 'it' => 'Italian', 'pt' => 'Portuguese',
        'ru' => 'Russian', 'ja' => 'Japanese', 'zh' => 'Chinese', 'ko' => 'Korean', 'ar' => 'Arabic', 'fa' => 'Persian',
        'pl' => 'Polish', 'nl' => 'Dutch', 'sv' => 'Swedish', 'tr' => 'Turkish', 'uk' => 'Ukrainian', 'vi' => 'Vietnamese',
        'id' => 'Indonesian', 'he' => 'Hebrew', 'hi' => 'Hindi', 'th' => 'Thai', 'cs' => 'Czech', 'fi' => 'Finnish',
        'no' => 'Norwegian', 'nb' => 'Norwegian', 'nn' => 'Norwegian (Nynorsk)', 'da' => 'Danish', 'hu' => 'Hungarian',
        'ro' => 'Romanian', 'el' => 'Greek', 'bg' => 'Bulgarian', 'sr' => 'Serbian', 'hr' => 'Croatian', 'sh' => 'Serbo-Croatian',
        'bs' => 'Bosnian', 'sl' => 'Slovenian', 'sk' => 'Slovak', 'lt' => 'Lithuanian', 'lv' => 'Latvian', 'et' => 'Estonian',
        'ca' => 'Catalan', 'eu' => 'Basque', 'gl' => 'Galician', 'ms' => 'Malay', 'tl' => 'Tagalog', 'bn' => 'Bengali',
        'ur' => 'Urdu', 'ta' => 'Tamil', 'te' => 'Telugu', 'ml' => 'Malayalam', 'kn' => 'Kannada', 'mr' => 'Marathi',
        'gu' => 'Gujarati', 'pa' => 'Punjabi', 'ne' => 'Nepali', 'si' => 'Sinhala', 'my' => 'Burmese', 'km' => 'Khmer',
        'ka' => 'Georgian', 'hy' => 'Armenian', 'az' => 'Azerbaijani', 'kk' => 'Kazakh', 'uz' => 'Uzbek', 'ky' => 'Kyrgyz',
        'tg' => 'Tajik', 'mn' => 'Mongolian', 'be' => 'Belarusian', 'be-tarask' => 'Belarusian (Taraškievica)', 'mk' => 'Macedonian',
        'sq' => 'Albanian', 'is' => 'Icelandic', 'ga' => 'Irish', 'cy' => 'Welsh', 'af' => 'Afrikaans', 'sw' => 'Swahili',
        'am' => 'Amharic', 'ha' => 'Hausa', 'yo' => 'Yoruba', 'ig' => 'Igbo', 'zu' => 'Zulu', 'so' => 'Somali', 'la' => 'Latin',
        'eo' => 'Esperanto', 'simple' => 'Simple English', 'arz' => 'Egyptian Arabic', 'azb' => 'South Azerbaijani',
        'ckb' => 'Central Kurdish', 'ku' => 'Kurdish', 'ps' => 'Pashto', 'sd' => 'Sindhi', 'or' => 'Odia', 'as' => 'Assamese',
        'jv' => 'Javanese', 'su' => 'Sundanese', 'ceb' => 'Cebuano', 'war' => 'Waray', 'zh-yue' => 'Cantonese',
        'zh-min-nan' => 'Min Nan', 'wuu' => 'Wu Chinese', 'lb' => 'Luxembourgish', 'oc' => 'Occitan', 'br' => 'Breton',
        'fy' => 'West Frisian', 'an' => 'Aragonese', 'ast' => 'Asturian', 'tt' => 'Tatar', 'ba' => 'Bashkir', 'cv' => 'Chuvash',
        'ce' => 'Chechen', 'sah' => 'Yakut', 'yi' => 'Yiddish', 'lo' => 'Lao', 'bo' => 'Tibetan', 'ug' => 'Uyghur',
        'io' => 'Ido', 'ia' => 'Interlingua', 'vec' => 'Venetian', 'scn' => 'Sicilian', 'nap' => 'Neapolitan', 'lmo' => 'Lombard',
        'pms' => 'Piedmontese', 'als' => 'Alemannic', 'bar' => 'Bavarian', 'nds' => 'Low German', 'li' => 'Limburgish',
        'mg' => 'Malagasy', 'ht' => 'Haitian Creole', 'qu' => 'Quechua', 'gn' => 'Guarani', 'ay' => 'Aymara',
    ];
    static $zh = [
        'en' => '英语', 'de' => '德语', 'fr' => '法语', 'es' => '西班牙语', 'it' => '意大利语', 'pt' => '葡萄牙语', 'ru' => '俄语',
        'ja' => '日语', 'zh' => '中文', 'ko' => '韩语', 'ar' => '阿拉伯语', 'fa' => '波斯语', 'pl' => '波兰语', 'nl' => '荷兰语',
        'sv' => '瑞典语', 'tr' => '土耳其语', 'uk' => '乌克兰语', 'vi' => '越南语', 'id' => '印尼语', 'he' => '希伯来语',
        'hi' => '印地语', 'th' => '泰语', 'cs' => '捷克语', 'fi' => '芬兰语', 'no' => '挪威语', 'nb' => '挪威语', 'nn' => '新挪威语',
        'da' => '丹麦语', 'hu' => '匈牙利语', 'ro' => '罗马尼亚语', 'el' => '希腊语', 'bg' => '保加利亚语', 'sr' => '塞尔维亚语',
        'hr' => '克罗地亚语', 'sh' => '塞尔维亚-克罗地亚语', 'bs' => '波斯尼亚语', 'sl' => '斯洛文尼亚语', 'sk' => '斯洛伐克语',
        'lt' => '立陶宛语', 'lv' => '拉脱维亚语', 'et' => '爱沙尼亚语', 'ca' => '加泰罗尼亚语', 'eu' => '巴斯克语', 'gl' => '加利西亚语',
        'ms' => '马来语', 'tl' => '他加禄语', 'bn' => '孟加拉语', 'ur' => '乌尔都语', 'ta' => '泰米尔语', 'te' => '泰卢固语',
        'ml' => '马拉雅拉姆语', 'kn' => '卡纳达语', 'mr' => '马拉地语', 'gu' => '古吉拉特语', 'pa' => '旁遮普语', 'ne' => '尼泊尔语',
        'si' => '僧伽罗语', 'my' => '缅甸语', 'km' => '高棉语', 'ka' => '格鲁吉亚语', 'hy' => '亚美尼亚语', 'az' => '阿塞拜疆语',
        'kk' => '哈萨克语', 'uz' => '乌兹别克语', 'ky' => '吉尔吉斯语', 'tg' => '塔吉克语', 'mn' => '蒙古语', 'be' => '白俄罗斯语',
        'be-tarask' => '白俄罗斯语（传统正写法）', 'mk' => '马其顿语', 'sq' => '阿尔巴尼亚语', 'is' => '冰岛语', 'ga' => '爱尔兰语',
        'cy' => '威尔士语', 'af' => '南非荷兰语', 'sw' => '斯瓦希里语', 'am' => '阿姆哈拉语', 'ha' => '豪萨语', 'yo' => '约鲁巴语',
        'ig' => '伊博语', 'zu' => '祖鲁语', 'so' => '索马里语', 'la' => '拉丁语', 'eo' => '世界语', 'simple' => '简单英语',
        'arz' => '埃及阿拉伯语', 'azb' => '南阿塞拜疆语', 'ckb' => '中库尔德语', 'ku' => '库尔德语', 'ps' => '普什图语', 'sd' => '信德语',
        'or' => '奥里亚语', 'as' => '阿萨姆语', 'jv' => '爪哇语', 'su' => '巽他语', 'ceb' => '宿务语', 'war' => '瓦瑞语',
        'zh-yue' => '粤语', 'zh-min-nan' => '闽南语', 'wuu' => '吴语', 'lb' => '卢森堡语', 'oc' => '奥克语', 'br' => '布列塔尼语',
        'fy' => '西弗里斯兰语', 'an' => '阿拉贡语', 'ast' => '阿斯图里亚斯语', 'tt' => '鞑靼语', 'ba' => '巴什基尔语', 'cv' => '楚瓦什语',
        'ce' => '车臣语', 'sah' => '雅库特语', 'yi' => '意第绪语', 'lo' => '老挝语', 'bo' => '藏语', 'ug' => '维吾尔语', 'io' => '伊多语',
        'ia' => '国际语', 'vec' => '威尼斯语', 'scn' => '西西里语', 'nap' => '那不勒斯语', 'lmo' => '伦巴第语', 'pms' => '皮埃蒙特语',
        'als' => '阿勒曼尼语', 'bar' => '巴伐利亚语', 'nds' => '低地德语', 'li' => '林堡语', 'mg' => '马达加斯加语', 'ht' => '海地克里奥尔语',
        'qu' => '克丘亚语', 'gn' => '瓜拉尼语', 'ay' => '艾马拉语',
    ];
    if (is_zh()) {
        return $zh[$code] ?? ($n[$code] ?? $code);
    }
    return $n[$code] ?? $code;
}
