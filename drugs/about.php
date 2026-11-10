<?php
declare(strict_types=1);
require __DIR__ . '/inc/bootstrap.php';
page_head('About · Drug Atlas');
?>
<article class="drug"><h1>About the Drug Atlas</h1>
<p>Five hundred medicines chosen to cover every major therapeutic area, from century-old natural products to 2020s gene and cell therapies. Each record gives the drug's class, how it works, its history, the company that discovered it and the one that sells it now, and how it is given.</p>
<p>Records are hand-written JSON files in <code>data/drugs/</code> (schema in <code>tools/SCHEMA.md</code>). Facts come from regulator labels (FDA, EMA), the WHO Model List of Essential Medicines, PubMed and company filings. "Owner" is the main marketing-authorisation holder in 2026; for off-patent drugs it reads "generic (many)".</p>
<p>This is an encyclopedia, not prescribing information. Doses, interactions and suitability for a person are questions for a clinician and the official label.</p></article>
<?php page_foot();
