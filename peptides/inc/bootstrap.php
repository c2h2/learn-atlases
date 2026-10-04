<?php
declare(strict_types=1);

define('ATLAS_ROOT', dirname(__DIR__));
define('ATLAS_DATA', ATLAS_ROOT . '/data');
define('ATLAS_CACHE', ATLAS_DATA . '/cache');
define('ATLAS_STRUCT', ATLAS_DATA . '/structures');

mb_internal_encoding('UTF-8');
date_default_timezone_set('UTC');

require_once __DIR__ . '/util.php';
require_once __DIR__ . '/i18n.php';
require_once __DIR__ . '/data.php';
require_once __DIR__ . '/seq.php';
require_once __DIR__ . '/render.php';
require_once __DIR__ . '/geo.php';
require_once __DIR__ . '/langs.php';
