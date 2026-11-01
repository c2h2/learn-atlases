# European History Atlas

A survey of European history in 12 courses and 60 chapters: evidence and argument, the Greek and Roman Mediterranean, the heirs of Rome, Latin Christendom, the fourteenth and fifteenth centuries, the reformations, states and empires, the revolutions of 1789–1848, industry and nations, the world wars, and Europe since 1945.

The English lessons are the text of the atlas. The Chinese translation is not written yet, so the title still says “(skeleton)”.

For study. The atlas is not a national myth, and it does not tell the reader what to think about a live political dispute. Dates and quantities that a lesson treats as settled are collected in [tools/CHRONOLOGY.md](tools/CHRONOLOGY.md). Where historians disagree, the lesson says so.

Two figures belong to this atlas, in [assets/js/widgets/europe.js](assets/js/widgets/europe.js):

- `timeline` — the events the lesson lists. Negative years are BCE. There is no year 0.
- `series` — the year-and-value points the lesson lists. Nothing is invented between the points.

Shared figures from the engine (`plot`, `distribution`, `graph`, `venn`) are used where a diagram teaches the point better than a line of dates.

```sh
cd europe
php -S localhost:8000
php tools/check.php --lang=en
```

The guide for lessons is [tools/CONTENT_GUIDE.md](tools/CONTENT_GUIDE.md). The chapter contracts are [tools/BRIEFS.md](tools/BRIEFS.md).
