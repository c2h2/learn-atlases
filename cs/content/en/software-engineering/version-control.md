Two developers work on the same program. Each has a copy; each edits it for a week; then one e-mails her version to the other, who copies over the files he has not touched and tries to merge by hand the ones they both changed. Something is lost — a fix made on Tuesday silently disappears — and nobody notices for a month, when a customer reports the bug again. Asked which version of the code is running in production, nobody can say for certain. Every team that has worked this way has a story like it.

A **version control system** records every change to a set of files, who made it, when and why; lets people work on separate lines of development and combine them; and can reproduce any past state exactly. This chapter explains how Git, the dominant system as of 2026, represents history — as a graph of content-addressed snapshots — and what that representation guarantees; how three-way merging works and when it must stop and ask; how teams organise branches, review each other's changes and integrate continuously; and how the history itself becomes a debugging tool. Every session below was run with Git 2.53.

## Snapshots and history

::: definition Commit and history {#def-commit}
A **commit** records a **snapshot** of the complete set of tracked files, a list of **parent** commits (none for the first commit, one for an ordinary change, two or more for a merge), and **metadata**: author, committer, timestamps and a message. The **history** of a repository is the directed graph whose vertices are commits and whose edges go from each commit to its parents; it is acyclic, because a commit can only name parents that already exist. Commit $a$ is an **ancestor** of commit $c$ if there is a path from $c$ to $a$ (we count $c$ as an ancestor of itself).
:::

Git stores snapshots, not differences: a commit does not say "line 2 changed", it says "here is the whole tree of files". (Differences are computed when you ask for them, and stored compactly in pack files, but that is an optimisation.) Everything is kept in an **object database** with four kinds of object: a **blob** holds the contents of one file, a **tree** lists the names, modes and objects of a directory's entries, a **commit** points to one tree and its parents, and a **tag** names a commit. Each object is stored under the **hash** of its contents.

```console
$ export GIT_AUTHOR_NAME=Ada GIT_AUTHOR_EMAIL=ada@example.org GIT_COMMITTER_NAME=Ada GIT_COMMITTER_EMAIL=ada@example.org
$ export GIT_AUTHOR_DATE=2026-03-02T10:00Z GIT_COMMITTER_DATE=2026-03-02T10:00Z
$ git init -q -b main shop && cd shop
$ printf 'def total(prices):\n    return sum(prices)\n' > pricing.py
$ git add pricing.py
$ git commit -m "Add pricing.total"
[main (root-commit) fab3744] Add pricing.total
 1 file changed, 2 insertions(+)
 create mode 100644 pricing.py
$ git cat-file -p HEAD
tree 5eca0a3b4ad4cf62bb2c7a1254afac5896cab6e6
author Ada <ada@example.org> 1772445600 +0000
committer Ada <ada@example.org> 1772445600 +0000

Add pricing.total
$ git cat-file -p 'HEAD^{tree}'
100644 blob aa11c8780835909b20ba5d886e45b00f65b2026c	pricing.py
```

(The `export` lines fix the names and dates, so that if you type the same commands you get the same hashes; with your own name and the current time, every hash below will differ.) `git cat-file -p` prints an object. The commit names its tree; the tree names the blob for `pricing.py`. The blob's name is the SHA-1 hash of a short header and the file's bytes.

::: example Computing a blob's name {#ex-blob-hash}
Check, without Git, that `aa11c87…` is the name of the blob holding `pricing.py`.
::: solution
Git hashes the bytes `blob`, a space, the length in decimal, a zero byte, and then the contents:

```python
import hashlib
data = open("pricing.py", "rb").read()
print(hashlib.sha1(b"blob %d\x00" % len(data) + data).hexdigest())
```

```console
$ python3 blobhash.py
aa11c8780835909b20ba5d886e45b00f65b2026c
$ git hash-object pricing.py
aa11c8780835909b20ba5d886e45b00f65b2026c
```

The file is 42 bytes (`def total(prices):` and `    return sum(prices)`, 19 and 23 bytes with their newlines), so the hashed input begins `blob 42\0`. Any change to a single byte would give an unrelated 40-digit name. Trees and commits are hashed the same way, with headers `tree` and `commit`.
:::
:::

Naming objects by the hash of their contents — **content addressing** — has a remarkable consequence.

::: proposition A commit hash determines the whole history {#prop-hash-history}
Assume that the hash function is collision-resistant: no one can find two different objects with the same hash. Then two commits with the same hash have the same snapshot, the same metadata, and the same entire history — every ancestor commit and every file in it is identical.
:::

::: proof
By induction on the length of the longest path from a commit to a root (a commit without parents). A commit's stored content includes its tree's hash and its parents' hashes. If two commits have the same hash, then by collision resistance their contents are identical, so they name the same tree and the same parents. The same tree hash means the same tree object, which names the same blobs and subtrees, so — by the same argument applied down the directory structure — the same files. For the parents: they have equal hashes and strictly shorter longest paths to a root, so by the induction hypothesis they have identical histories. Hence so do the two commits. A root commit has no parents, which is the base case.
:::

So a 40-character commit hash is a checksum of everything that led to it. If two people agree on a hash, they agree on the entire history; if anyone alters an old commit — accidentally, through disk corruption, or deliberately — its hash changes, and therefore so do the hashes of all its descendants, which is easy to detect. This is the same idea as a blockchain or a Merkle tree, and it is why Git can be distributed: each clone is a full copy, and clones can exchange objects knowing that equal names mean equal contents. The assumption matters. SHA-1 was shown to be breakable when a team from CWI Amsterdam and Google published the first practical collision ("SHAttered") in February 2017; Git responded by using a hardened SHA-1 implementation that detects such collision attacks, and has added a SHA-256 object format, though as of 2026 most repositories still use SHA-1 ([[cryptography]] explains hash functions and collision resistance).

## Branches and merges

A **branch** in Git is nothing more than a named, movable pointer to a commit; making a commit on a branch moves its pointer to the new commit. `HEAD` names the branch you are on. Because branches are this cheap, people create one for every piece of work and combine them later.

To combine two lines of development, Git compares each with their **merge base**.

::: definition Merge base {#def-merge-base}
A **common ancestor** of commits $x$ and $y$ is a commit that is an ancestor of both. A **best common ancestor** (or **merge base**) is a common ancestor that is not a proper ancestor of any other common ancestor. In a history without criss-cross merges there is exactly one; in general there may be several.
:::

::: widget graph
nodes: A@0,1; B@1,0; C@1,2; D@2,0; E@2,2; F@3,0; G@3,2
edges: B>A; C>A; D>B; D>C; E>C; E>B; F>D; G>E
algorithm: bfs
start: F
caption: A history with arrows from each commit to its parents. Branches forked at `A`; then `D` merged `C` into the upper branch while `E` merged `B` into the lower one — a **criss-cross** merge. Run breadth-first search from `F`: it visits all of `F`'s ancestors. Do the same from `G`: the common ancestors are `A`, `B` and `C`, and `A` is an ancestor of both `B` and `C`, so the best common ancestors of `F` and `G` are `B` *and* `C`. Git's default merge strategy handles this by first merging the two bases into a virtual one.
:::

### Three-way merging

Why is the merge base needed at all? Suppose line 5 of a file reads `timeout = 60` on one branch and `timeout = 30` on the other. With only the two versions, no tool can know which is new. With the base, it can: if the base had `30`, then one side changed it and the other did not, and the change should win.

::: definition Three-way merge {#def-merge3}
Given a base version $b$ and two versions $o$ ("ours") and $t$ ("theirs") derived from it, a **three-way merge** decides each region of the content (each line, or block of lines aligned by a difference algorithm) by the rule:

| $o$ vs $t$ | $o$ vs $b$ | $t$ vs $b$ | result |
|---|---|---|---|
| equal | — | — | $o$ (both sides agree, or both unchanged) |
| different | equal | different | $t$ (only theirs changed) |
| different | different | equal | $o$ (only ours changed) |
| different | different | different | **conflict** |

A conflict is reported to the user, who must decide.
:::

::: example Merging configurations {#ex-merge3}
Two people edit a configuration, stored as a dictionary, starting from the same base. Implement [[#def-merge3]] for dictionaries, where each key is a region, and merge their edits.
::: solution
For data with an obvious alignment, such as a dictionary of settings, the rule can be implemented directly:

```python
def merge3(base, ours, theirs):
    """Three-way merge of two edits of a dictionary (e.g. a configuration).
    Returns (merged, conflicts); a missing key means "deleted"."""
    MISSING = object()
    merged, conflicts = {}, []
    for key in sorted(base.keys() | ours.keys() | theirs.keys()):
        b, o, t = (d.get(key, MISSING) for d in (base, ours, theirs))
        if o == t:              # both sides agree (perhaps both unchanged)
            result = o
        elif o == b:            # only theirs changed
            result = t
        elif t == b:            # only ours changed
            result = o
        else:                   # both changed, differently
            conflicts.append(key)
            result = b
        if result is not MISSING:
            merged[key] = result
    return merged, conflicts

base   = {"currency": "GBP", "vat": 0.20, "timeout": 30, "theme": "light"}
ours   = {"currency": "GBP", "vat": 0.20, "timeout": 60, "theme": "light", "retries": 3}
theirs = {"currency": "EUR", "vat": 0.20, "timeout": 45}          # theme deleted
print(merge3(base, ours, theirs))
```

```console
$ python3 merge3.py
({'currency': 'EUR', 'retries': 3, 'timeout': 30, 'vat': 0.2}, ['timeout'])
```

Theirs changed the currency and deleted the theme, ours added retries: all three are taken. Both changed the timeout, differently, so it is a conflict (and is left at the base value for the user to decide).
:::
:::

::: proposition Properties of three-way merge {#prop-merge3}
For every base $b$ and versions $o$, $t$, the merge of [[#def-merge3]] satisfies: (a) if $t = b$, the result is $o$ with no conflicts (and symmetrically if $o = b$); (b) merging $o$ with itself gives $o$ with no conflicts; (c) the merge is symmetric — swapping $o$ and $t$ gives the same result and the same conflicts; (d) a region conflicts if and only if both sides changed it, differently.
:::

::: proof
Each property holds region by region, so consider one region with values $b, o, t$. (a) If $t = b$: when $o = t$ the result is $o$; otherwise $o \ne t = b$, so the third row applies and the result is $o$. No conflict is possible, because the conflict row requires $t \ne b$. (b) With $t = o$ the first row applies. (c) The first and fourth rows are symmetric in $o$ and $t$, and swapping $o$ and $t$ exchanges the second and third rows, each of which then selects the value of the side that changed — the same value as before. (d) The conflict row is exactly $o \ne t$, $o \ne b$, $t \ne b$.
:::

Property (d) says what merging *cannot* do. Three-way merging is purely textual: it knows which regions each side changed, not what the changes mean. Two changes in different regions merge "cleanly" even when they are logically incompatible — one branch renames a function, the other adds a new call to it under the old name — and the merged program fails. That is why a clean merge must still be built and tested.

::: example A real merge conflict {#ex-conflict}
Continue the repository above. On a branch `discount`, change `total` to accept a discount; meanwhile on `main`, make it round to pence. Merge, and resolve the conflict.
::: solution
```console
$ git switch -c discount
Switched to a new branch 'discount'
$ printf 'def total(prices, discount=0.0):\n    return sum(prices) * (1 - discount)\n' > pricing.py
$ git commit -am "Support a percentage discount"
[discount aff3dbf] Support a percentage discount
 1 file changed, 2 insertions(+), 2 deletions(-)
$ git switch main
Switched to branch 'main'
$ printf 'def total(prices):\n    return round(sum(prices), 2)\n' > pricing.py
$ git commit -am "Round totals to pence"
[main 9809dee] Round totals to pence
 1 file changed, 1 insertion(+), 1 deletion(-)
$ git merge-base main discount
fab3744a2c46e090c61773a419ef7b1e716c1b1c
$ git -c merge.conflictStyle=diff3 merge discount
Auto-merging pricing.py
CONFLICT (content): Merge conflict in pricing.py
Automatic merge failed; fix conflicts and then commit the result.
$ cat pricing.py
<<<<<<< HEAD
def total(prices):
    return round(sum(prices), 2)
||||||| fab3744
def total(prices):
    return sum(prices)
=======
def total(prices, discount=0.0):
    return sum(prices) * (1 - discount)
>>>>>>> discount
```

The merge base is the first commit. Both branches changed the `return` line, differently — the fourth row of [[#def-merge3]] — so Git stops. The `diff3` conflict style shows three sections: ours (`HEAD`), the base, and theirs. Reading the base makes the intentions clear: `main` added rounding, `discount` added the parameter. The right resolution combines both, which no textual rule could have produced:

```console
$ printf 'def total(prices, discount=0.0):\n    return round(sum(prices) * (1 - discount), 2)\n' > pricing.py
$ git commit -qam "Merge branch 'discount'"
$ git log --graph --oneline
*   0543f77 Merge branch 'discount'
|\  
| * aff3dbf Support a percentage discount
* | 9809dee Round totals to pence
|/  
* fab3744 Add pricing.total
$ git cat-file -p HEAD
tree 86831015c282266b76c730747d989ddbcdb727b5
parent 9809dee893bb50727e9b89f178c990f1539d1dc6
parent aff3dbf374e85568fe221ea29b4f3b1216741c8a
author Ada <ada@example.org> 1772445600 +0000
committer Ada <ada@example.org> 1772445600 +0000

Merge branch 'discount'
```

The merge commit has two parents. Setting `merge.conflictStyle` to `diff3` (or `zdiff3`) permanently with `git config --global` is worth doing: without the base section, you must guess what each side intended.
:::
:::

If the branch being merged already contains the current commit — nothing happened on `main` since the fork — Git simply moves the pointer forward, a **fast-forward**, and creates no merge commit. An alternative to merging is **rebasing**: `git rebase main`, run on the feature branch, replays the branch's commits one by one on top of `main`, producing new commits with new hashes and a linear history. By [[#prop-hash-history]], rebased commits are different commits, so anyone who had the old ones now has a diverged history.

::: warning Do not rewrite history that others have
Rebasing, amending (`git commit --amend`) and squashing change commit hashes. On your own unpublished branch that is harmless and often tidies the history. On a branch others have fetched, it forces every collaborator to reconcile two versions of the same work, and a careless `git push --force` can delete their commits from the shared repository. The rule of thumb: rewrite only what you have not shared; and when you must force-push your own branch, use `git push --force-with-lease`, which refuses if someone else has pushed in the meantime. Related misconception: "Git keeps my work safe, so I don't need backups." Commits that exist only in your local repository are lost with your disk; push them.
:::

## Working together

### Branching workflows

Teams agree on conventions for how branches are used. In **feature-branch** workflows each change is developed on its own branch and merged into the main branch after review, often through a **pull request** (or merge request) on a hosting service. **Git flow** (Vincent Driessen, 2010) adds long-lived `develop` and release branches for software shipped in versions; its author later noted that continuously delivered software rarely needs it. In **trunk-based development** everyone integrates small changes into the main branch ("trunk") at least daily, with branches, if any, living for hours; unfinished features are hidden behind run-time flags rather than kept on branches. In the *Accelerate* surveys ([[software-engineering/software-process]]), trunk-based practices — few active branches, merged within a day — were associated with higher delivery performance; as with all those results, this is a survey association, not a controlled experiment.

Why do long-lived branches cause pain? A toy model shows the shape of the effect. Suppose the code base has $N$ files and each of two branches modifies $k$ files chosen at random. The branches touch a common file — a potential conflict — with probability
$$
P(\text{overlap}) = 1 - \binom{N - k}{k} \Big/ \binom{N}{k} \;\approx\; 1 - \Bigl(1 - \frac{k}{N}\Bigr)^{k}.
$$ {#eq-overlap}
The probability grows roughly like $k^2/N$ for small $k$: it is a birthday-problem effect. With $N = 100$, branches touching 2 files overlap with probability about $4\%$, branches touching 10 files about $67\%$. Since the number of files a branch touches grows with its lifetime, the risk of conflict grows roughly with the *square* of the time between integrations. Real changes are not uniformly random — some files are hot spots touched by everyone — which makes overlaps more likely still.

::: widget plot
f: 1 - (1 - x/n)^x
x: 0, 40
y: 0, 1
sliders: n=20:10:1000:100
labels: P(\text{two branches touch a common file})
caption: The approximation in [[#eq-overlap]]: two branches each change $k$ files (horizontal axis) out of $N$ (slider), chosen at random. The curve rises slowly and then steeply, like the birthday problem. With $N = 100$, two branches of 10 files each probably collide. Increase $N$: a larger code base helps only slowly, since the 50% point grows like $\sqrt{N}$. The lesson of the model — integrate small changes often — survives its unrealistic assumption of uniform choice.
:::

### Code review

Before a change is merged, another developer usually **reviews** it. Michael Fagan's formal **inspections** at IBM ("Design and code inspections to reduce errors in program development", *IBM Systems Journal*, 1976) were meetings with defined roles, checklists and preparation, and reported finding a large share of defects before testing. Modern code review is lighter: a reviewer reads the diff in a tool, comments, and approves. Its benefits are broader than defect finding. Bacchelli and Bird ("Expectations, outcomes, and challenges of modern code review", ICSE 2013) found that developers at Microsoft named finding defects as their main motivation, but that most review comments concerned code improvements, understanding and alternative solutions, and that knowledge transfer was a major outcome. McIntosh and colleagues (MSR 2014) found, in three open-source projects, that components with low review coverage and low review participation tended to have more post-release defects. These are observational studies; their consistent message is that review helps when reviewers actually engage with the change, which depends heavily on its size.

Practical advice that follows: keep changes small and focused, so that a reviewer can understand one in a sitting; write a description saying what the change does and why; review for correctness, design, tests and clarity, not only for style (leave style to automatic formatters and linters); and phrase comments as questions or suggestions about the code, not judgements about its author.

::: quiz
A developer merges branch `feature` into `main`. The merge completes with no conflicts. What does this guarantee?
- [ ] The merged program compiles and passes its tests.
- [ ] No two commits changed the same file.
- [x] No region of any file was changed differently on both branches since the merge base.
- [ ] The two branches' changes are logically compatible.
::: solution
By [[#prop-merge3]](d), a conflict arises exactly when both sides changed the same region differently, so a clean merge guarantees only the absence of such regions. Both branches may have changed the same *file* in different regions, and changes in different regions can still be logically incompatible — a renamed function on one side, a new call to the old name on the other — so the program may fail to build or pass its tests. That is what continuous integration checks.
:::
:::

## Continuous integration

::: definition Continuous integration and delivery {#def-ci}
**Continuous integration** (CI) is the practice of merging every developer's work into a shared main line frequently — at least daily — with every merge automatically **built** and **tested**, and of treating a failed build as an emergency to be fixed at once. **Continuous delivery** extends it so that every change that passes the automated **deployment pipeline** (build, tests, further checks, staging) is releasable at the push of a button; **continuous deployment** releases every such change automatically.
:::

The term "continuous integration" appeared in Grady Booch's work on object-oriented design (1991) and became a core practice of Extreme Programming; Martin Fowler's article "Continuous Integration" (2000, revised 2006 and later) described the practices that are now standard, and Jez Humble and David Farley's *Continuous Delivery* (2010) the pipeline. The principle is that integration problems grow with the amount of unintegrated work (as [[#eq-overlap]] suggests), so integrating continuously keeps each problem small and its cause obvious: if the build broke in the last hour, the cause is among the last hour's commits.

A CI server — any of several hosted or self-hosted services — runs a script on every push. Whatever the service, the script is the essential part and should be runnable on any developer's machine:

```console
$ cat ci.sh
#!/bin/sh
set -e                        # stop at the first failing step
python3 -m compileall -q .    # does everything at least parse?
python3 layers.py             # architectural rules (see the architecture chapter)
python3 -m pytest -q          # the test suite
$ sh ci.sh; echo "exit status $?"
.                                                                        [100%]
1 passed in 0.15s
exit status 0
$ echo 'from shop import web' >> shop/db.py      # someone takes a shortcut
$ sh ci.sh; echo "exit status $?"
violation: db (layer 1) imports web (layer 3)
exit status 1
```

(Here the shop package of [[software-engineering/software-architecture#ex-layer-check]], without its forbidden import, has one pytest test; pytest is a third-party package, installed in a virtual environment.) A failing step returns a non-zero exit status, which stops the script and marks the commit as broken; the service reports it on the pull request, and the team's agreement is that a broken main line takes priority over new work. For CI to work, the suite must be **fast** (Extreme Programming's target was a ten-minute build) and **reliable**: a "flaky" test that fails at random teaches everyone to ignore failures, which destroys the signal. [[software-engineering/testing]] discusses how to keep test suites fast and deterministic.

### The history as a debugging tool

A history of small, tested commits is also a search space. If a bug appears and you know a commit where it was absent, **bisection** over the commits between finds the change that introduced it, in a logarithmic number of tests ([[programming-1/testing-debugging#thm-bisect-versions]]). Git automates this, and with `git bisect run` it runs the test for you.

::: example Bisecting automatically {#ex-bisect}
A repository has 32 commits; the test below passed at the first and fails at the last. Find the first bad commit automatically.
::: solution
The test is a script whose exit status says good (0) or bad (non-zero):

```python
import sys
from pricing import total
sys.exit(0 if total([1, 2, 3]) == 6 else 1)     # exit status 0 = good, 1 = bad
```

```console
$ git bisect start HEAD $(git rev-list --max-parents=0 HEAD)
Bisecting: 15 revisions left to test after this (roughly 4 steps)
[36aa22b17a90aea8a1af49cf220a03076d8d10cb] Change 16
$ git bisect run python3 -B check.py
running 'python3' '-B' 'check.py'
Bisecting: 7 revisions left to test after this (roughly 3 steps)
[b81dad2bc4bb77e4e551fe6e054250a2e83bff82] Change 24
running 'python3' '-B' 'check.py'
Bisecting: 3 revisions left to test after this (roughly 2 steps)
[2252ff358f809e5e1ce49265898a48b72215445e] Change 20
running 'python3' '-B' 'check.py'
Bisecting: 1 revision left to test after this (roughly 1 step)
[3fee66d470bfeb19f3db9c87534bc941be9e651b] Change 22
running 'python3' '-B' 'check.py'
Bisecting: 0 revisions left to test after this (roughly 0 steps)
[4e6e7dd1586790878222c9cf7397cbded6538a5a] Change 23
running 'python3' '-B' 'check.py'
4e6e7dd1586790878222c9cf7397cbded6538a5a is the first bad commit
commit 4e6e7dd1586790878222c9cf7397cbded6538a5a
Author: Ada <ada@example.org>
Date:   Mon Mar 2 10:00:00 2026 +0000

    Change 23

 pricing.py | 4 ++--
 1 file changed, 2 insertions(+), 2 deletions(-)
bisect found first bad commit
$ git bisect reset
```

`git bisect start BAD GOOD` takes the bad commit first (here `HEAD`) and a good one (the root commit, found by `git rev-list --max-parents=0`). Five test runs — commits 16, 24, 20, 22 and 23 — sufficed for 31 candidates, as $\lceil \log_2 32\rceil = 5$ predicts. The test script is untracked, so it stays in place as Git checks out each commit; the `-B` flag stops Python writing cached bytecode, which could otherwise be reused across checkouts. Exit status 125 tells `git bisect run` to *skip* a commit that cannot be tested (it does not build, say). Bisection only works well if every commit builds and is small — one more reason for small, tested commits. (The 32-commit history was generated by a script with the same fixed names and dates, so the hashes are reproducible.)
:::
:::

What makes history useful is the messages. A good commit message has a short summary line (about 50 characters, in the imperative: "Round totals to pence"), a blank line, and a body explaining *why* the change was made, what alternatives were rejected and what it affects. The diff shows *what* changed; only the message can say why, and the person reading it in two years — often the author — will need to know.

::: history
Marc Rochkind wrote SCCS, the Source Code Control System, at Bell Labs in 1972 (published in *IEEE Transactions on Software Engineering*, 1975); Walter Tichy's RCS followed in 1982 and Dick Grune's CVS, which let many developers work concurrently on a shared repository, in 1986. Subversion (2000) improved on CVS with atomic commits. Distributed systems, in which every clone holds the whole history, came next: the Linux kernel used the proprietary BitKeeper from 2002, and when its free licence was withdrawn in April 2005, Linus Torvalds wrote Git in a few weeks, while Matt Mackall started Mercurial the same month. Hosting services built on them, beginning with GitHub (2008), popularised pull requests and made code review routine in open-source projects. Fagan's inspections date from 1976, and continuous integration from the 1990s.
:::

## Where this leads

The test suites that CI runs are the subject of [[software-engineering/testing]], and the small, safe steps that a good history records are the method of [[software-engineering/refactoring-maintenance]]. The hash functions behind content addressing are studied in [[cryptography]], and the problem of keeping copies consistent when they can be changed independently — which merging solves by asking a person — reappears, without a person to ask, in replicated databases and [[distributed-systems/replication-consistency]]. Licences, which govern what you may do with code in someone else's repository, are in [[software-engineering/professional-ethics]].

::: summary
- Git records **snapshots** as commits in an acyclic history graph ([[#def-commit]]); blobs, trees and commits are stored under the **hash** of their contents.
- With a collision-resistant hash, a commit's hash determines its entire history ([[#prop-hash-history]]); rewriting a commit changes its descendants' hashes. SHA-1's weakness is mitigated, and SHA-256 is supported.
- A branch is a movable pointer. Merging compares both sides with their **merge base** ([[#def-merge-base]]); **three-way merge** takes whichever side changed a region and reports a conflict only when both did, differently ([[#def-merge3]], [[#prop-merge3]]).
- A clean merge is not a correct program: always build and test the result. Never rewrite history others have.
- Long-lived branches collide roughly quadratically more often ([[#eq-overlap]]); integrate small changes often. Review small changes; reviews spread knowledge as well as find defects.
- **Continuous integration** builds and tests every merge and fixes breakages immediately ([[#def-ci]]); keep the suite fast and reliable.
- `git bisect run` finds the first bad commit in $\lceil \log_2 n\rceil$ tests; write commit messages that explain *why*.
:::

## Exercises

::: exercise Objects in a first commit {level=1 check="3"}
In a new repository, you create one file in the top directory, add it and commit. How many new objects does the commit add to the object database? (Enter the number.)
::: solution
Three: a blob for the file's contents, a tree for the top directory (listing the file), and the commit (pointing to the tree), as `git cat-file -p` showed. If the file were in a subdirectory, there would be one more tree. Two files with identical contents would share a single blob.
:::
:::

::: exercise Apply the merge rule {level=1}
Using [[#def-merge3]], give the merged value or say "conflict" for each key, where each triple is (base, ours, theirs) and `—` means absent: (a) `(10, 10, 12)`; (b) `(10, 11, 11)`; (c) `(10, 11, 12)`; (d) `(—, 5, —)`; (e) `(10, —, 10)`; (f) `(10, —, 12)`.
::: solution
(a) Only theirs changed: `12`. (b) Both changed in the same way: `11`. (c) Both changed, differently: conflict. (d) Only ours added it: `5`. (e) Only ours deleted it: absent. (f) Ours deleted it and theirs modified it: conflict ("modify/delete" in Git's terms) — the user must decide whether the modification makes the deletion wrong.
:::
:::

::: exercise Rewritten history {level=1}
You amend the message of a commit that is three commits back on a branch you have already pushed. Which commit hashes change, and why does a colleague who pulled the branch earlier now see a divergence?
::: solution
The amended commit gets a new hash, because its message is part of its content. Its child stores the parent's hash, so its content and hash change too, and so on: all three descendants get new hashes ([[#prop-hash-history]]). Commits before the amended one are unchanged. The colleague's repository has the old four commits; the shared branch now points to four different commits with the same common ancestor. To Git these are two diverged lines of development, and a pull would try to merge them, duplicating the work.
:::
:::

::: exercise Probability of overlap {level=2 check="0.67"}
Using the exact formula in [[#eq-overlap]], what is the probability, to two decimal places, that two branches that each modify 10 of 100 files, chosen at random, touch a common file? (Enter the probability.)
::: solution
$1 - \binom{90}{10}/\binom{100}{10} \approx 1 - 0.3305 = 0.6695 \approx 0.67$. The approximation $1 - 0.9^{10} \approx 0.651$ is close. Branches of 2 files each overlap with probability $\approx 0.040$ and branches of 20 files with probability $\approx 0.993$.
:::
:::

::: exercise Merge bases by hand {level=2}
In a history with arrows from child to parent: `B → A`, `C → B`, `D → B`, `E → C`, `F → D`, `G → E`, `G → F` (a merge), `H → D`. Find the merge base of `C` and `D`, of `E` and `H`, and of `G` and `H`.
::: solution
Ancestors of `C`: {C, B, A}; of `D`: {D, B, A}; common {B, A}, and `A` is an ancestor of `B`, so the merge base is `B`. Ancestors of `E`: {E, C, B, A}; of `H`: {H, D, B, A}; common {B, A}; merge base `B`. Ancestors of `G`: {G, E, F, C, D, B, A}; of `H`: {H, D, B, A}; common {D, B, A}; `B` and `A` are ancestors of `D`, so the merge base is `D` — the merge `G` already contains `D`, so merging `H` into `G` only needs to bring in the change made in `H`.
:::
:::

::: exercise A pull request description {level=2}
You fixed a bug where totals were sometimes printed as `19.999999999999996`. Write a commit message (summary and body) and list three things you would ask a reviewer to check.
::: solution
Summary: "Round order totals to pence before display". Body: "Totals were computed as sums of floats and printed unrounded, so some showed binary rounding error (e.g. 19.999999999999996). Totals are now rounded to two decimal places in `pricing.total`, the single place where they are computed, rather than in each template. A longer-term fix is to store prices as integer pence; this is tracked in issue 214." Reviewers might check: (1) whether rounding with `round()` (round-half-to-even on binary values, [[programming-1/values-types]]) is acceptable for the business, or `decimal.Decimal` is required; (2) that a regression test reproduces the original display bug; (3) that no other code path computes totals independently and still shows the problem.
:::
:::

::: exercise Merging many branches {level=3}
Let $\mathrm{M}(b, o, t)$ be the result of the three-way merge of [[#def-merge3]] on a single region, and extend it to the case where an input is already a conflict, written $\top$, by letting the result then be $\top$. Fix the base $b$ and write $o \sqcup t$ for $\mathrm{M}(b, o, t)$. Prove that $\sqcup$ is commutative and **associative**: $(o \sqcup t) \sqcup u = o \sqcup (t \sqcup u)$. Conclude that several branches made from the same base can be merged region by region in any order with the same result. (Hint: order the possible values by $b \sqsubseteq x \sqsubseteq \top$ for every value $x$, with distinct values other than $b$ and $\top$ incomparable, and show that $o \sqcup t$ is their least upper bound.)
::: solution
*The order.* The relation $\sqsubseteq$ is reflexive, antisymmetric and transitive: its only strict relations are $b \sqsubset x$, $x \sqsubset \top$ and $b \sqsubset \top$. This is the **flat lattice** on the values: $b$ at the bottom, $\top$ at the top, everything else in one incomparable layer between.

*Merge is the least upper bound.* Check the cases. If either input is $\top$, the only upper bound is $\top$, and the merge gives $\top$. If $o = t$, the least upper bound is $o$, and the first row gives $o$. If $o = b \ne t$, then $b \sqsubseteq t$ and the least upper bound is $t$, which the second row gives; symmetrically if $t = b \ne o$. Otherwise $o$ and $t$ are distinct values other than $b$ and $\top$, hence incomparable, and their only common upper bound is $\top$ — the conflict row.

*Consequences.* In any partial order, a least upper bound, when it exists, is unique and satisfies $x \sqcup y = y \sqcup x$ (the definition is symmetric) and $(x \sqcup y) \sqcup z = x \sqcup (y \sqcup z)$, because both sides are the least upper bound of the set $\{x, y, z\}$: an element is above $x \sqcup y$ and $z$ iff it is above $x$, $y$ and $z$. So merging $k$ branches from the same base gives, in each region, the least upper bound of all $k$ versions — the single changed value if all changed branches agree, the base if none changed it, and a conflict if two changed it differently — whatever the order. Git's "octopus" merge of several branches relies on this. In practice the order still matters for the *work*: real merges align regions with a difference algorithm, and after each merge the merge base for the next one moves, so the regions and the conflicts a person sees can differ.
:::
:::

::: exercise Computing merge bases {level=3}
Write a function `merge_bases(parents, x, y)` that returns all best common ancestors ([[#def-merge-base]]) of two commits, given a dictionary mapping each commit to its list of parents. Test it on a simple fork and on the criss-cross history of the figure.
::: solution
```python
def ancestors(parents, c):
    """All commits reachable from c by parent links, including c itself."""
    seen, stack = {c}, [c]
    while stack:
        for p in parents[stack.pop()]:
            if p not in seen:
                seen.add(p)
                stack.append(p)
    return seen

def merge_bases(parents, x, y):
    """Best common ancestors: common ancestors that are not proper ancestors
    of another common ancestor."""
    common = ancestors(parents, x) & ancestors(parents, y)
    return sorted(c for c in common
                  if not any(c != d and c in ancestors(parents, d) for d in common))

# A simple fork, and a criss-cross: two branches that merged each other.
parents = {"A": [], "B": ["A"], "C": ["A"], "D": ["B", "C"], "E": ["C", "B"],
           "F": ["D"], "G": ["E"]}
print(merge_bases(parents, "B", "C"))
print(merge_bases(parents, "F", "G"))
```

```console
$ python3 mergebase.py
['A']
['B', 'C']
```

`ancestors` is a depth-first search ([[algorithms/graph-search]]) taking $O(n + m)$ time on a history with $n$ commits and $m$ parent links. The filter calls it once for each common ancestor, so `merge_bases` takes $O(k(n + m))$ for $k$ common ancestors — fine for an exercise, too slow for a history of a million commits, where Git instead walks both histories at once in order of commit date and stops as soon as the candidates are settled. The criss-cross case returns two bases, as the figure showed.
:::
:::
