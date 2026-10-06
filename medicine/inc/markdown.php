<?php
declare(strict_types=1);

/**
 * Lesson markup → HTML. Authors: see tools/CONTENT_GUIDE.md.
 *
 * Blocks: "## heading {#id}", paragraphs, "-" / "1." lists (nested by indentation), pipe tables, "> quote",
 * "---", ``` code, "$$ display $$ {#eq-id}", and ":::kind Title {#id key=value}" … ":::" containers
 * (nestable). ":::widget type" holds "key: value" lines instead of markup.
 * Inline: $math$, **bold**, *italic*, `code`, [text](https://…), [[course/chapter#id|text]] references.
 *
 * Rendering is three passes: parse to a node tree, number theorem-like blocks, equations and examples,
 * then emit HTML (references resolve against this document and the site index).
 */

/** kind => [English label, numbering group] ('thm' shares one counter; null = unnumbered). */
const MD_KINDS = [
    'definition'  => ['Definition', 'thm'],
    'theorem'     => ['Principle', 'thm'],
    'lemma'       => ['Lemma', 'thm'],
    'proposition' => ['Proposition', 'thm'],
    'corollary'   => ['Corollary', 'thm'],
    'axiom'       => ['Axiom', 'thm'],
    'algorithm'   => ['Algorithm', 'thm'],
    'example'     => ['Example', 'ex'],
    'exercise'    => ['Exercise', 'exr'],
    'proof'       => ['Explanation', null],
    'solution'    => ['Solution', null],
    'hint'        => ['Hint', null],
    'answer'      => ['Answer', null],
    'remark'      => ['Remark', null],
    'note'        => ['Note', null],
    'warning'     => ['Common mistake', null],
    'intuition'   => ['Intuition', null],
    'history'     => ['Historical note', null],
    'application' => ['Application', null],
    'summary'     => ['Key takeaways', null],
    'quiz'        => ['Quick check', null],
];
/** Kinds listed in the theorem index. */
const MD_INDEXED = ['definition', 'theorem', 'lemma', 'proposition', 'corollary', 'axiom', 'algorithm'];
const MD_LEVELS = [1 => 'Routine', 2 => 'Standard', 3 => 'Challenging'];

final class MdDoc
{
    /** @var array<string,array> local anchor id => [label, kind, num, title, text] */
    public array $anchors = [];
    public array $toc = [];
    /** Theorem-like blocks: kind, id, num, title, line, html (statement) */
    public array $items = [];
    public array $exercises = [];
    public array $examples = [];
    public array $widgets = [];
    public array $refs = [];
    public array $errors = [];
    public array $checks = [];
    public int $words = 0;
    public int $quizzes = 0;
    public int $proofs = 0;
    private array $counters = ['thm' => 0, 'ex' => 0, 'exr' => 0, 'eq' => 0, 'sec' => 0, 'w' => 0];

    /**
     * @param string $key   "course/chapter" (for global references)
     * @param string $prefix numbering prefix, e.g. "3" gives Theorem 3.2
     * @param bool $resolve resolve cross-document references (false while building the site index)
     */
    public function __construct(public string $key = '', public string $prefix = '', public bool $resolve = true)
    {
    }

    public function err(int $line, string $msg): void
    {
        $this->errors[] = ['line' => $line, 'msg' => $msg];
    }

    public function next(string $group): string
    {
        $n = ++$this->counters[$group];
        return $this->prefix !== '' ? $this->prefix . '.' . $n : (string)$n;
    }
}

// --------------------------------------------------------------------------------------------
// entry point

/** Render lesson markup. Returns [html, doc]. */
function md_render(string $src, MdDoc $doc): array
{
    $src = str_replace(["\r\n", "\r", "\t"], ["\n", "\n", '    '], $src);
    $lines = explode("\n", $src);
    $nodes = md_parse_blocks($lines, 1, $doc);
    md_number($nodes, $doc);
    $html = md_emit($nodes, $doc, []);
    return [$html, $doc];
}

// --------------------------------------------------------------------------------------------
// pass 1: blocks

function md_indent(string $l): int
{
    return strlen($l) - strlen(ltrim($l, ' '));
}

function md_is_block_start(string $t): bool
{
    return $t === '' || preg_match('/^(#{2,4}\s|```|\$\$|:::|\||>|(-{3,}|\*{3,})$)/', $t) === 1;
}

const MD_LIST_RE = '/^(\s*)([-*+]|\d{1,3}[.)])(\s+)(.*)$/';

/** Join paragraph lines: a space between Latin words, nothing between CJK characters. */
function md_join_lines(array $lines): string
{
    $out = '';
    foreach ($lines as $l) {
        $l = trim($l);
        if ($out === '') {
            $out = $l;
            continue;
        }
        $a = mb_substr($out, -1);
        $b = mb_substr($l, 0, 1);
        $cjk = '/[\x{3000}-\x{303f}\x{3400}-\x{9fff}\x{ff00}-\x{ffef}]/u';
        $out .= (preg_match($cjk, $a) && preg_match($cjk, $b)) ? $l : ' ' . $l;
    }
    return $out;
}

/** Split a trailing {#id key=value flag} attribute group off a line. Returns [rest, attrs]. */
function md_parse_attrs(string $s): array
{
    $attrs = [];
    $re = '/\{\s*((?:#[\w:-]+|[A-Za-z][\w-]*=(?:"[^"]*"|[^\s"}]+)|collapsed|open|\s)+)\}\s*$/';
    if (preg_match($re, $s, $m, PREG_OFFSET_CAPTURE)) {
        $rest = rtrim(substr($s, 0, $m[0][1]));
        preg_match_all('/#([\w:-]+)|([A-Za-z][\w-]*)=(?:"([^"]*)"|([^\s"}]+))|(collapsed|open)/', $m[1][0], $mm, PREG_SET_ORDER);
        foreach ($mm as $x) {
            if (($x[1] ?? '') !== '') {
                $attrs['id'] = $x[1];
            } elseif (($x[2] ?? '') !== '') {
                $attrs[$x[2]] = ($x[3] ?? '') !== '' ? $x[3] : ($x[4] ?? '');
            } elseif (($x[5] ?? '') !== '') {
                $attrs[$x[5]] = true;
            }
        }
        return [$rest, $attrs];
    }
    return [$s, $attrs];
}

/** Split a table row on "|" outside $math$ and `code`; "\|" is a literal bar. */
function md_split_cells(string $row): array
{
    $row = trim($row);
    if (str_starts_with($row, '|')) {
        $row = substr($row, 1);
    }
    if (str_ends_with($row, '|') && !str_ends_with($row, '\\|')) {
        $row = substr($row, 0, -1);
    }
    $cells = [];
    $cur = '';
    $inMath = false;
    $inCode = false;
    $len = strlen($row);
    for ($i = 0; $i < $len; $i++) {
        $c = $row[$i];
        if ($c === '\\' && $i + 1 < $len) {
            if ($row[$i + 1] === '|' && !$inMath) {
                $cur .= '|';
                $i++;
                continue;
            }
            $cur .= $c . $row[$i + 1];
            $i++;
            continue;
        }
        if ($c === '`' && !$inMath) {
            $inCode = !$inCode;
        } elseif ($c === '$' && !$inCode) {
            $inMath = !$inMath;
        } elseif ($c === '|' && !$inMath && !$inCode) {
            $cells[] = trim($cur);
            $cur = '';
            continue;
        }
        $cur .= $c;
    }
    $cells[] = trim($cur);
    return $cells;
}

function md_parse_blocks(array $lines, int $base, MdDoc $doc): array
{
    $out = [];
    $n = count($lines);
    $para = [];
    $paraLine = 0;
    $flush = function () use (&$para, &$out, &$paraLine) {
        if ($para) {
            $out[] = ['t' => 'p', 'text' => md_join_lines($para), 'line' => $paraLine];
            $para = [];
        }
    };
    for ($i = 0; $i < $n; $i++) {
        $line = $lines[$i];
        $trim = trim($line);
        $ln = $base + $i;
        if ($trim === '') {
            $flush();
            continue;
        }
        // fenced code
        if (preg_match('/^(`{3,})\s*([\w+-]*)\s*$/', $trim, $m)) {
            $flush();
            $buf = [];
            for ($j = $i + 1; $j < $n && !preg_match('/^`{3,}\s*$/', trim($lines[$j])); $j++) {
                $buf[] = $lines[$j];
            }
            if ($j >= $n) {
                $doc->err($ln, 'unclosed ``` code block');
            }
            $out[] = ['t' => 'code', 'lang' => $m[2], 'text' => implode("\n", $buf), 'line' => $ln];
            $i = $j;
            continue;
        }
        // display math
        if (str_starts_with($trim, '$$')) {
            $flush();
            $body = substr($trim, 2);
            $buf = [];
            $id = '';
            $closeRe = '/^(.*?)\$\$\s*(?:\{#([\w:-]+)\})?\s*$/s';
            if ($body !== '' && preg_match($closeRe, $body, $mm)) {
                $buf[] = $mm[1];
                $id = $mm[2] ?? '';
                $j = $i;
            } else {
                if (trim($body) !== '') {
                    $buf[] = $body;
                }
                for ($j = $i + 1; $j < $n; $j++) {
                    $t = trim($lines[$j]);
                    if (preg_match($closeRe, $t, $mm)) {
                        if (trim($mm[1]) !== '') {
                            $buf[] = $mm[1];
                        }
                        $id = $mm[2] ?? '';
                        break;
                    }
                    if ($t === '' ) {
                        $doc->err($base + $j, 'blank line inside $$ … $$ (KaTeX display math cannot contain blank lines)');
                    }
                    $buf[] = $lines[$j];
                }
                if ($j >= $n) {
                    $doc->err($ln, 'unclosed $$ display math');
                }
            }
            $out[] = ['t' => 'math', 'tex' => trim(implode("\n", $buf)), 'id' => $id, 'line' => $ln];
            $i = $j;
            continue;
        }
        // ::: containers
        if (preg_match('/^:::\s*([a-z][a-z-]*)(.*)$/', $trim, $m)) {
            $flush();
            $kind = $m[1];
            [$title, $attrs] = md_parse_attrs(trim($m[2]));
            $depth = 1;
            $inCode = false;
            for ($j = $i + 1; $j < $n; $j++) {
                $t = trim($lines[$j]);
                if (preg_match('/^`{3,}/', $t)) {
                    $inCode = !$inCode;
                    continue;
                }
                if ($inCode) {
                    continue;
                }
                if ($kind === 'widget') {
                    if ($t === ':::') {
                        break;
                    }
                    continue;
                }
                if (preg_match('/^:::\s*[a-z]/', $t)) {
                    $depth++;
                } elseif ($t === ':::') {
                    if (--$depth === 0) {
                        break;
                    }
                }
            }
            if ($j >= $n) {
                $doc->err($ln, "unclosed ::: $kind block");
            }
            $inner = array_slice($lines, $i + 1, max(0, $j - $i - 1));
            if ($kind === 'widget') {
                $out[] = md_widget_node($title, $attrs, $inner, $ln, $doc);
            } else {
                if (!isset(MD_KINDS[$kind])) {
                    $doc->err($ln, "unknown block kind ':::$kind'");
                }
                $out[] = ['t' => 'blk', 'kind' => $kind, 'title' => $title, 'attrs' => $attrs,
                    'children' => md_parse_blocks($inner, $ln + 1, $doc), 'line' => $ln];
            }
            $i = $j;
            continue;
        }
        if ($trim === ':::') {
            $flush();
            $doc->err($ln, 'closing ::: without a matching opening block');
            continue;
        }
        // headings
        if (preg_match('/^(#{1,4})\s+(.+)$/', $trim, $m)) {
            $flush();
            $level = strlen($m[1]);
            if ($level === 1) {
                $doc->err($ln, 'use ## for sections (the chapter title comes from course.json)');
                $level = 2;
            }
            [$title, $attrs] = md_parse_attrs(trim($m[2]));
            $out[] = ['t' => 'h', 'level' => $level, 'text' => $title, 'attrs' => $attrs, 'line' => $ln];
            continue;
        }
        // rule
        if (preg_match('/^(-{3,}|\*{3,})$/', $trim)) {
            $flush();
            $out[] = ['t' => 'hr', 'line' => $ln];
            continue;
        }
        // table
        if ($trim[0] === '|' && $i + 1 < $n && preg_match('/^\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?\s*$/', trim($lines[$i + 1]))) {
            $flush();
            $head = md_split_cells($trim);
            $align = array_map(function ($c) {
                $c = trim($c);
                return str_starts_with($c, ':') && str_ends_with($c, ':') ? 'center' : (str_ends_with($c, ':') ? 'right' : '');
            }, md_split_cells(trim($lines[$i + 1])));
            $rows = [];
            for ($j = $i + 2; $j < $n && str_starts_with(trim($lines[$j]), '|'); $j++) {
                $rows[] = md_split_cells(trim($lines[$j]));
            }
            $out[] = ['t' => 'table', 'head' => $head, 'align' => $align, 'rows' => $rows, 'line' => $ln];
            $i = $j - 1;
            continue;
        }
        // lists
        if (preg_match(MD_LIST_RE, $line, $m) && !($para && !preg_match('/^[-*+]$/', $m[2]) && (int)$m[2] !== 1)) {
            $flush();
            [$node, $used] = md_parse_list($lines, $i, $base, $doc);
            $out[] = $node;
            $i += $used - 1;
            continue;
        }
        // block quote
        if ($trim[0] === '>') {
            $flush();
            $buf = [];
            for ($j = $i; $j < $n && str_starts_with(trim($lines[$j]), '>'); $j++) {
                $buf[] = preg_replace('/^\s*>\s?/', '', $lines[$j]);
            }
            $out[] = ['t' => 'quote', 'children' => md_parse_blocks($buf, $ln, $doc), 'line' => $ln];
            $i = $j - 1;
            continue;
        }
        if (!$para) {
            $paraLine = $ln;
        }
        $para[] = $trim;
    }
    $flush();
    return $out;
}

function md_parse_list(array $lines, int $start, int $base, MdDoc $doc): array
{
    preg_match(MD_LIST_RE, $lines[$start], $m);
    $indent = strlen($m[1]);
    $ordered = !in_array($m[2], ['-', '*', '+'], true);
    $first = $ordered ? (int)$m[2] : 1;
    $items = [];
    $n = count($lines);
    $i = $start;
    while ($i < $n) {
        if (!preg_match(MD_LIST_RE, $lines[$i], $m) || strlen($m[1]) !== $indent) {
            break;
        }
        if (in_array($m[2], ['-', '*', '+'], true) === $ordered) {
            break;
        }
        $col = strlen($m[1]) + strlen($m[2]) + strlen($m[3]);
        $itemLines = [$m[4]];
        $itemLine = $base + $i;
        $j = $i + 1;
        while ($j < $n) {
            $l = $lines[$j];
            if (trim($l) === '') {
                $k = $j + 1;
                while ($k < $n && trim($lines[$k]) === '') {
                    $k++;
                }
                if ($k < $n && md_indent($lines[$k]) > $indent && !preg_match(MD_LIST_RE, $lines[$k], $x2) || ($k < $n && preg_match(MD_LIST_RE, $lines[$k], $x3) && strlen($x3[1]) > $indent)) {
                    $itemLines[] = '';
                    $j++;
                    continue;
                }
                break;
            }
            $ind = md_indent($l);
            if ($ind > $indent) {
                $itemLines[] = substr($l, min($ind, $col));
                $j++;
                continue;
            }
            // lazy continuation of the item's paragraph
            if (!preg_match(MD_LIST_RE, $l) && !md_is_block_start(trim($l)) && trim($lines[$j - 1]) !== '') {
                $itemLines[] = trim($l);
                $j++;
                continue;
            }
            break;
        }
        $items[] = md_parse_blocks($itemLines, $itemLine, $doc);
        $i = $j;
        $k = $i;
        while ($k < $n && trim($lines[$k]) === '') {
            $k++;
        }
        if ($k < $n && preg_match(MD_LIST_RE, $lines[$k], $mm) && strlen($mm[1]) === $indent
            && in_array($mm[2], ['-', '*', '+'], true) !== $ordered) {
            $i = $k;
            continue;
        }
        break;
    }
    return [['t' => 'list', 'ordered' => $ordered, 'start' => $first, 'items' => $items, 'line' => $base + $start], max(1, $i - $start)];
}

function md_widget_node(string $head, array $attrs, array $inner, int $ln, MdDoc $doc): array
{
    $type = trim($head);
    $cfg = [];
    foreach ($inner as $k => $raw) {
        $t = trim($raw);
        if ($t === '' || str_starts_with($t, '//')) {
            continue;
        }
        if (!preg_match('/^([A-Za-z_][\w-]*)\s*:\s?(.*)$/', $t, $m)) {
            $doc->err($ln + 1 + $k, "widget line is not 'key: value': $t");
            continue;
        }
        $cfg[$m[1]] = trim($m[2]);
    }
    if ($type === '') {
        $doc->err($ln, 'widget without a type (":::widget plot")');
    }
    return ['t' => 'widget', 'type' => $type, 'config' => $cfg, 'attrs' => $attrs, 'line' => $ln];
}

// --------------------------------------------------------------------------------------------
// pass 2: numbering and anchors

function md_plain(string $s): string
{
    $s = preg_replace('/\$([^$]*)\$/', '$1', $s);
    $s = preg_replace('/\\\\([A-Za-z]+)/', '$1', $s);
    return trim(str_replace(['**', '*', '`', '{', '}'], '', $s));
}

function md_number(array &$nodes, MdDoc $doc): void
{
    foreach ($nodes as &$node) {
        switch ($node['t']) {
            case 'h':
                $id = $node['attrs']['id'] ?? (slugify(md_plain($node['text'])) ?: 'sec-' . (count($doc->toc) + 1));
                $base = $id;
                $k = 2;
                while (isset($doc->anchors[$id])) {
                    $id = $base . '-' . $k++;
                }
                $node['id'] = $id;
                $doc->anchors[$id] = ['label' => md_plain($node['text']), 'kind' => 'section', 'num' => '', 'title' => md_plain($node['text'])];
                $doc->toc[] = ['id' => $id, 'title' => $node['text'], 'level' => $node['level']];
                break;
            case 'math':
                if ($node['id'] !== '') {
                    $num = $doc->next('eq');
                    $node['num'] = $num;
                    md_anchor($doc, $node['id'], ['label' => '(' . $num . ')', 'kind' => 'equation', 'num' => $num, 'title' => ''], $node['line']);
                }
                break;
            case 'blk':
                $kind = $node['kind'];
                $group = MD_KINDS[$kind][1] ?? null;
                $title = $node['title'];
                if ($group !== null) {
                    $num = $doc->next($group);
                    $node['num'] = $num;
                    $id = $node['attrs']['id'] ?? (($group === 'thm' ? substr($kind, 0, 3) : $group) . '-' . str_replace('.', '-', $num));
                    $node['id'] = $id;
                    $label = t(MD_KINDS[$kind][0]) . ' ' . $num;
                    md_anchor($doc, $id, ['label' => $label, 'kind' => $kind, 'num' => $num, 'title' => md_plain($title)], $node['line']);
                } elseif (isset($node['attrs']['id'])) {
                    $node['id'] = $node['attrs']['id'];
                    md_anchor($doc, $node['id'], ['label' => t(MD_KINDS[$kind][0] ?? ucfirst($kind)), 'kind' => $kind, 'num' => '', 'title' => md_plain($title)], $node['line']);
                }
                md_number($node['children'], $doc);
                break;
            case 'list':
                foreach ($node['items'] as &$it) {
                    md_number($it, $doc);
                }
                unset($it);
                break;
            case 'quote':
                md_number($node['children'], $doc);
                break;
            case 'widget':
                $node['num'] = $doc->next('w');
                break;
        }
    }
    unset($node);
}

function md_anchor(MdDoc $doc, string $id, array $info, int $line): void
{
    if (isset($doc->anchors[$id])) {
        $doc->err($line, "duplicate anchor #$id");
        return;
    }
    $doc->anchors[$id] = $info;
}

// --------------------------------------------------------------------------------------------
// pass 3: HTML

function md_emit(array $nodes, MdDoc $doc, array $ctx): string
{
    $o = '';
    foreach ($nodes as $node) {
        $o .= md_emit_node($node, $doc, $ctx);
    }
    return $o;
}

function md_count_words(string $text): int
{
    $text = preg_replace('/\$[^$]*\$/', ' x ', $text);
    $latin = preg_match_all('/[A-Za-z0-9]+(?:[\'’-][A-Za-z0-9]+)*/', $text);
    $cjk = preg_match_all('/[\x{3400}-\x{9fff}]/u', $text);
    return (int)$latin + (int)ceil($cjk / 2);
}

function md_emit_node(array $node, MdDoc $doc, array $ctx): string
{
    $line = $node['line'] ?? 0;
    switch ($node['t']) {
        case 'p':
            $doc->words += md_count_words($node['text']);
            return '<p>' . md_inline($node['text'], $doc, $line) . '</p>';
        case 'h':
            $tag = 'h' . $node['level'];
            return '<' . $tag . ' id="' . h($node['id']) . '" class="md-h">' . md_inline($node['text'], $doc, $line)
                . '<a class="anchor" href="#' . h($node['id']) . '" aria-label="' . h(t('Link to this section')) . '">#</a></' . $tag . '>';
        case 'hr':
            return '<hr>';
        case 'code':
            return '<pre class="code"><code' . ($node['lang'] ? ' class="lang-' . h($node['lang']) . '"' : '') . '>' . h($node['text']) . '</code></pre>';
        case 'math':
            $id = $node['id'] !== '' ? ' id="' . h($node['id']) . '"' : '';
            $num = isset($node['num']) ? '<span class="eqno">(' . h($node['num']) . ')</span>' : '';
            return '<div class="math-block' . ($num ? ' numbered' : '') . '"' . $id . '><div class="math-body">' . math_html($node['tex'], true, $line) . '</div>' . $num . '</div>';
        case 'list':
            $tag = $node['ordered'] ? 'ol' : 'ul';
            $start = $node['ordered'] && $node['start'] !== 1 ? ' start="' . $node['start'] . '"' : '';
            $o = '<' . $tag . $start . '>';
            foreach ($node['items'] as $item) {
                $o .= '<li>' . md_emit_tight($item, $doc, $ctx) . '</li>';
            }
            return $o . '</' . $tag . '>';
        case 'quote':
            return '<blockquote>' . md_emit($node['children'], $doc, $ctx) . '</blockquote>';
        case 'table':
            $o = '<div class="table-scroll"><table class="md-table"><thead><tr>';
            foreach ($node['head'] as $k => $c) {
                $al = $node['align'][$k] ?? '';
                $o .= '<th' . ($al ? ' style="text-align:' . $al . '"' : '') . '>' . md_inline($c, $doc, $line) . '</th>';
            }
            $o .= '</tr></thead><tbody>';
            foreach ($node['rows'] as $r) {
                $o .= '<tr>';
                foreach ($node['head'] as $k => $_) {
                    $al = $node['align'][$k] ?? '';
                    $o .= '<td' . ($al ? ' style="text-align:' . $al . '"' : '') . '>' . md_inline($r[$k] ?? '', $doc, $line) . '</td>';
                }
                $o .= '</tr>';
            }
            return $o . '</tbody></table></div>';
        case 'widget':
            return md_emit_widget($node, $doc);
        case 'blk':
            return md_emit_block($node, $doc, $ctx);
    }
    return '';
}

/** List items and similar: a lone paragraph is emitted without <p>. */
function md_emit_tight(array $nodes, MdDoc $doc, array $ctx): string
{
    if (count($nodes) === 1 && $nodes[0]['t'] === 'p') {
        $doc->words += md_count_words($nodes[0]['text']);
        return md_inline($nodes[0]['text'], $doc, $nodes[0]['line']);
    }
    return md_emit($nodes, $doc, $ctx);
}

function md_emit_block(array $node, MdDoc $doc, array $ctx): string
{
    $kind = $node['kind'];
    $line = $node['line'];
    $label = t(MD_KINDS[$kind][0] ?? ucfirst($kind));
    $title = $node['title'] !== '' ? md_inline($node['title'], $doc, $line) : '';
    $id = isset($node['id']) ? ' id="' . h($node['id']) . '"' : '';
    $attrs = $node['attrs'];
    switch ($kind) {
        case 'proof':
            $doc->proofs++;
            $open = empty($attrs['collapsed']) ? ' open' : '';
            $body = md_emit($node['children'], $doc, $ctx + ['in' => 'proof']);
            // the end-of-proof mark sits at the end of the last paragraph when there is one
            $qed = '<span class="qed" title="' . h(t('End of proof')) . '">∎</span>';
            $body = str_ends_with($body, '</p>') ? substr($body, 0, -4) . $qed . '</p>' : $body . '<p class="qed-line">' . $qed . '</p>';
            return '<details class="blk blk-proof"' . $open . $id . '><summary><span class="blk-kind">' . h($title !== '' ? $label . ' ' : $label) . '</span>'
                . ($title !== '' ? '<span class="blk-title">' . $title . '</span>' : '') . '</summary><div class="blk-body">' . $body . '</div></details>';
        case 'solution':
        case 'hint':
        case 'answer':
            $inExample = ($ctx['in'] ?? '') === 'example';
            $open = ($inExample && empty($attrs['collapsed'])) || !empty($attrs['open']) ? ' open' : '';
            return '<details class="blk blk-' . $kind . '"' . $open . $id . '><summary><span class="blk-kind">' . h($label) . '</span>'
                . ($title !== '' ? ' <span class="blk-title">' . $title . '</span>' : '') . '</summary><div class="blk-body">'
                . md_emit($node['children'], $doc, $ctx + ['in' => $kind]) . '</div></details>';
        case 'quiz':
            return md_emit_quiz($node, $doc, $ctx);
        case 'exercise':
            return md_emit_exercise($node, $doc, $ctx);
    }
    $num = $node['num'] ?? '';
    $head = '<span class="blk-kind">' . h($label . ($num !== '' ? ' ' . $num : '')) . '</span>';
    if ($title !== '') {
        $head .= ' <span class="blk-title">' . (in_array($kind, ['example', 'application', 'remark', 'note', 'warning', 'intuition', 'history', 'summary'], true) ? $title : '(' . $title . ')') . '</span>';
    }
    $inner = $kind === 'example' ? ['in' => 'example'] : [];
    $body = md_emit($node['children'], $doc, $inner + $ctx);
    $cls = 'blk blk-' . $kind . (in_array($kind, MD_INDEXED, true) ? ' blk-thm' : '');
    $html = '<div class="' . $cls . '"' . $id . '><div class="blk-head">' . $head . '</div><div class="blk-body">' . $body . '</div></div>';
    if (in_array($kind, MD_INDEXED, true)) {
        $doc->items[] = ['kind' => $kind, 'id' => $node['id'], 'num' => $num, 'title' => $node['title'], 'line' => $line,
            'html' => md_first_body($node, $doc, $body)];
    } elseif ($kind === 'example') {
        $doc->examples[] = ['id' => $node['id'], 'num' => $num, 'title' => $node['title'], 'line' => $line];
    }
    return $html;
}

/** Statement HTML for the theorem index (proofs live outside the block, so the body is the statement). */
function md_first_body(array $node, MdDoc $doc, string $body): string
{
    return strlen($body) > 20000 ? '' : $body;
}

function md_emit_exercise(array $node, MdDoc $doc, array $ctx): string
{
    $line = $node['line'];
    $num = $node['num'] ?? '';
    $level = max(1, min(3, (int)($node['attrs']['level'] ?? 2)));
    $check = (string)($node['attrs']['check'] ?? '');
    $title = $node['title'] !== '' ? md_inline($node['title'], $doc, $line) : '';
    $statement = [];
    $extras = [];
    foreach ($node['children'] as $c) {
        if ($c['t'] === 'blk' && in_array($c['kind'], ['hint', 'solution', 'answer'], true)) {
            $extras[] = $c;
        } else {
            $statement[] = $c;
        }
    }
    $stmtHtml = md_emit($statement, $doc, $ctx + ['in' => 'exercise']);
    $extraHtml = '';
    $hasSolution = false;
    foreach ($extras as $c) {
        $hasSolution = $hasSolution || $c['kind'] === 'solution';
        $extraHtml .= md_emit_block($c, $doc, $ctx + ['in' => 'exercise']);
    }
    if (!$hasSolution) {
        $doc->err($line, 'exercise without a ::: solution');
    }
    if ($check !== '') {
        $doc->checks[] = ['expr' => $check, 'line' => $line];
    }
    $dots = str_repeat('●', $level) . str_repeat('○', 3 - $level);
    $lvl = '<span class="lvl lvl-' . $level . '" title="' . h(t(MD_LEVELS[$level])) . '"><span aria-hidden="true">' . $dots . '</span><span class="visually-hidden">' . h(t(MD_LEVELS[$level])) . '</span></span>';
    $checkHtml = $check !== '' ? '<div class="check" data-check="' . h($check) . '"></div>' : '';
    $doc->exercises[] = ['id' => $node['id'], 'num' => $num, 'level' => $level, 'title' => $node['title'], 'line' => $line,
        'check' => $check, 'html' => $stmtHtml, 'extra' => $extraHtml];
    return '<div class="blk blk-exercise" id="' . h($node['id']) . '" data-level="' . $level . '"><div class="blk-head"><span class="blk-kind">'
        . h(t('Exercise') . ' ' . $num) . '</span> ' . $lvl . ($title !== '' ? ' <span class="blk-title">' . $title . '</span>' : '')
        . '</div><div class="blk-body">' . $stmtHtml . $checkHtml . $extraHtml . '</div></div>';
}

function md_emit_quiz(array $node, MdDoc $doc, array $ctx): string
{
    $line = $node['line'];
    $doc->quizzes++;
    $q = '';
    $opts = '';
    $expl = '';
    $nCorrect = 0;
    foreach ($node['children'] as $c) {
        if ($c['t'] === 'list' && $opts === '') {
            $i = 0;
            foreach ($c['items'] as $item) {
                $first = $item[0] ?? null;
                $correct = false;
                if ($first && $first['t'] === 'p' && preg_match('/^\[( |x|X)\]\s*(.*)$/s', $first['text'], $m)) {
                    $correct = strtolower($m[1]) === 'x';
                    $item[0]['text'] = $m[2];
                } else {
                    $doc->err($c['line'], 'quiz options must start with [ ] or [x]');
                }
                $nCorrect += $correct ? 1 : 0;
                $opts .= '<li><button type="button" class="quiz-opt" data-ok="' . ($correct ? '1' : '0') . '"><span class="quiz-mark" aria-hidden="true">'
                    . chr(65 + $i) . '</span><span class="quiz-text">' . md_emit_tight($item, $doc, $ctx) . '</span></button></li>';
                $i++;
            }
        } elseif ($c['t'] === 'blk' && in_array($c['kind'], ['solution', 'answer'], true)) {
            $expl .= md_emit($c['children'], $doc, $ctx);
        } else {
            $q .= md_emit_node($c, $doc, $ctx);
        }
    }
    if ($nCorrect === 0) {
        $doc->err($line, 'quiz without a correct option ([x])');
    }
    return '<div class="blk blk-quiz" data-multi="' . ($nCorrect > 1 ? '1' : '0') . '"><div class="blk-head"><span class="blk-kind">' . h(t('Quick check'))
        . '</span></div><div class="blk-body">' . $q . '<ol class="quiz-opts">' . $opts . '</ol>'
        . ($expl !== '' ? '<div class="quiz-expl" hidden>' . $expl . '</div>' : '') . '</div></div>';
}

function md_emit_widget(array $node, MdDoc $doc): string
{
    $cfg = $node['config'];
    $caption = $cfg['caption'] ?? '';
    unset($cfg['caption']);
    $id = $node['attrs']['id'] ?? ('widget-' . ($node['num'] ?? '0'));
    $doc->widgets[] = ['type' => $node['type'], 'config' => $node['config'], 'line' => $node['line'], 'id' => $id];
    $cap = $caption !== '' ? '<figcaption>' . md_inline($caption, $doc, $node['line']) . '</figcaption>' : '';
    return '<figure class="widget" id="' . h($id) . '" data-widget="' . h($node['type']) . '" data-config="' . h(json_encode($cfg, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES)) . '">'
        . '<div class="widget-stage"><div class="widget-msg">' . h(t('Loading interactive figure…')) . '</div>'
        . '<noscript><div class="widget-msg">' . h(t('This interactive figure needs JavaScript.')) . '</div></noscript></div>' . $cap . '</figure>';
}

// --------------------------------------------------------------------------------------------
// inline

/** Inline markup → HTML. Math and code are protected first, then references, links and emphasis. */
function md_inline(string $s, ?MdDoc $doc = null, int $line = 0): string
{
    if ($s === '') {
        return '';
    }
    $slots = [];
    $put = function (string $html) use (&$slots): string {
        $slots[] = $html;
        return "\u{E000}" . (count($slots) - 1) . "\u{E001}";
    };
    $s = preg_replace_callback('/`([^`]+)`/', fn($m) => $put('<code>' . h($m[1]) . '</code>'), $s);
    $s = str_replace('\\$', "\u{E002}", $s);
    $restoreDollar = fn(string $x) => str_replace("\u{E002}", '\\$', $x);
    $s = preg_replace_callback('/\$\$(.+?)\$\$/s', fn($m) => $put('<span class="math-display">' . math_html($restoreDollar($m[1]), true, $line) . '</span>'), $s);
    $s = preg_replace_callback('/\$((?:[^$\\\\]|\\\\.)+?)\$/s', fn($m) => $put(math_html($restoreDollar($m[1]), false, $line)), $s);
    $s = preg_replace_callback('/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/', fn($m) => $put(md_ref(trim($m[1]), isset($m[2]) ? trim($m[2]) : null, $doc, $line)), $s);
    $s = preg_replace_callback('/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/', fn($m) => $put('<a href="' . h($m[2]) . '" target="_blank" rel="noopener">' . md_emph(h($m[1])) . '</a>'), $s);
    $s = md_emph(h($s));
    $s = str_replace("\u{E002}", '$', $s);
    for ($k = 0; $k < 4 && str_contains($s, "\u{E000}"); $k++) {
        $s = preg_replace_callback('/\x{E000}(\d+)\x{E001}/u', fn($m) => $slots[(int)$m[1]] ?? '', $s);
    }
    return $s;
}

function md_emph(string $s): string
{
    $s = preg_replace('/\*\*(?=\S)(.+?)(?<=\S)\*\*/su', '<strong>$1</strong>', $s);
    // intraword asterisks stay literal in alphabetic scripts; Chinese has no spaces between words, so a Han
    // character next to the asterisk does not block emphasis (\w would match it under /u)
    return preg_replace('/(?<![*\p{Latin}\p{Greek}\p{Cyrillic}\p{N}_])\*(?=[^\s*])(.+?)(?<=[^\s*])\*(?![*\p{Latin}\p{Greek}\p{Cyrillic}\p{N}_])/su', '<em>$1</em>', $s);
}

/**
 * [[#id]], [[course/chapter]], [[course/chapter#id]], [[course]]; "|text" overrides the label.
 * Global targets resolve through the site index (see ma_ref_target()).
 */
function md_ref(string $target, ?string $text, ?MdDoc $doc, int $line): string
{
    if ($doc) {
        $doc->refs[] = ['target' => $target, 'line' => $line];
    }
    $label = null;
    $href = null;
    $title = '';
    if (str_starts_with($target, '#')) {
        $id = substr($target, 1);
        $a = $doc?->anchors[$id] ?? null;
        if ($a) {
            $label = $a['label'];
            $title = $a['title'] ?? '';
            $href = '#' . $id;
        }
    } elseif ($doc === null || $doc->resolve) {
        $r = function_exists('ma_ref_target') ? ma_ref_target($target) : null;
        if ($r) {
            [$label, $href, $title] = $r;
        }
    } else {
        return '<a class="ref">' . h($text ?? $target) . '</a>';
    }
    if ($href === null) {
        $doc?->err($line, "unresolved reference [[$target]]");
        return '<span class="ref-broken" title="' . h(t('Unresolved reference')) . '">' . ($text !== null ? md_emph(h($text)) : h($target)) . '</span>';
    }
    $tip = $title !== '' && $title !== $label ? ' title="' . h($title) . '"' : '';
    return '<a class="ref" href="' . h($href) . '"' . $tip . '>' . ($text !== null ? md_emph(h($text)) : h($label)) . '</a>';
}
