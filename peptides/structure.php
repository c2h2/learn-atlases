<?php
declare(strict_types=1);
// Serves coordinate files from data/structures as text/plain so the upstream proxy compresses them.
require __DIR__ . '/inc/bootstrap.php';

$f = (string)($_GET['f'] ?? '');
if (!preg_match('/^[A-Za-z0-9_.-]+\.(pdb|cif|sdf)$/', $f) || !is_file(ATLAS_STRUCT . '/' . $f)) {
    http_response_code(404);
    header('Content-Type: text/plain; charset=utf-8');
    echo "Structure file not found.\n";
    exit;
}
$path = ATLAS_STRUCT . '/' . $f;
header('Content-Type: text/plain; charset=utf-8');
header('Cache-Control: public, max-age=86400');
header('X-Content-Type-Options: nosniff');
if (isset($_GET['download'])) {
    header('Content-Disposition: attachment; filename="' . $f . '"');
}
header('Content-Length: ' . filesize($path));
readfile($path);
