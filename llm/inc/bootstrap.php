<?php
declare(strict_types=1);

define('MA_ROOT', dirname(__DIR__));
define('MA_CONTENT', MA_ROOT . '/content');
define('MA_DATA', MA_ROOT . '/data');
define('MA_CACHE', MA_DATA . '/cache');
/** Bump when the markup renderer changes so cached lesson HTML is rebuilt. */
define('MA_RENDER_VERSION', 9);

mb_internal_encoding('UTF-8');
date_default_timezone_set('UTC');

require_once __DIR__ . '/util.php';
require_once __DIR__ . '/i18n.php';
require_once __DIR__ . '/math.php';
require_once __DIR__ . '/markdown.php';
require_once __DIR__ . '/content.php';
require_once __DIR__ . '/render.php';
