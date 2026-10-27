Every program so far has forgotten everything the moment it stopped, and has taken its data from literals typed into the source code. Useful programs do neither. They read data that someone else produced — a log, a spreadsheet exported as text, a list of readings from an instrument — and they write results that outlast them. And because that data comes from outside, it is sometimes wrong: a file is missing, a line says `thirteen` where a number was expected, a mark has been left blank, the text is in an encoding the program did not expect. A program that crashes on the first imperfect line is not much use; a program that silently skips imperfect lines and reports a confident average may be worse.

This chapter covers the two halves of that problem. **Files** are how programs read and write persistent data: opening and closing them safely, reading line by line, writing text, and the encoding that turns characters into bytes. **Exceptions** are Python's mechanism for signalling and handling errors: what happens when an operation fails, how a failure travels up the call stack, and how to catch exactly the failures you can deal with — and no others.

## Reading and writing text files

A **file** is a named sequence of bytes kept by the operating system on a disk or other storage. A **text file** is one whose bytes encode characters, organised into lines separated by newline characters (`"\n"`). Python works with a file through a **file object**, which remembers the current position in the file and buffers data between the program and the operating system.

::: definition Opening a file {#def-open}
`open(path, mode, encoding=...)` asks the operating system for access to the file at `path` and returns a file object. The **mode** says what the program intends: `"r"` read (the default), `"w"` write (creating the file, or **truncating** it to empty if it exists), `"a"` append (write at the end), `"x"` create a new file and fail if it exists; adding `"b"` (as in `"rb"`) gives a binary file of bytes instead of text. For text files the **encoding** names the rule for converting between characters and bytes. The statement

```text
with open(path, mode, encoding="utf-8") as f:
    block
```

binds `f` to the file object, runs the block, and then **closes** the file — flushing any buffered output to the operating system and releasing the file — however the block ends, including by an exception.
:::

```python
with open("notes.txt", "w", encoding="utf-8") as f:     # "w": create or overwrite
    f.write("first line\n")
    f.write("second line\n")
    print("third line", file=f)                          # print can write to a file too

with open("notes.txt", encoding="utf-8") as f:           # default mode "r": read text
    for number, line in enumerate(f, start=1):
        print(number, repr(line))

with open("notes.txt", encoding="utf-8") as f:
    text = f.read()                                      # the whole file as one string
print(len(text), text.splitlines())
```

```console
$ python3 writeread.py
1 'first line\n'
2 'second line\n'
3 'third line\n'
34 ['first line', 'second line', 'third line']
```

Several details are worth noticing. `f.write` writes exactly the string it is given — it does not add a newline — whereas `print(..., file=f)` adds one, as it does on the screen. Iterating over a file object yields its lines one at a time, *each still ending in* `"\n"` (the `repr` makes the newline visible); `line.strip()` or `line.rstrip("\n")` removes it. Iteration reads the file a piece at a time, so it works for files far larger than the computer's memory, whereas `f.read()` reads everything into one string — fine for small files. `text.splitlines()` splits a string into lines without their newlines.

::: warning Always close files, and always name the encoding
A file opened without `with` stays open until it is explicitly closed with `f.close()` or until Python happens to clean it up. Data written to it may sit in a buffer and never reach the disk if the program crashes, and a long-running program that forgets to close files eventually runs out of them. Use `with` for every file.

Name the encoding too. Without `encoding=`, Python 3.14 uses the operating system's preferred encoding, which is UTF-8 on most Linux and macOS systems but may be a legacy code page on Windows, so a program that reads `café` correctly on one computer may fail or produce `cafÃ©` on another. (Python 3.15 is scheduled to make UTF-8 the default everywhere, under PEP 686.) Writing `encoding="utf-8"` costs nothing and makes the program behave the same everywhere.
:::

### Characters and bytes

Files and networks carry bytes, not characters. An **encoding** is the rule that converts between them. Python's strings are sequences of Unicode characters, each identified by a **code point**, a number from $0$ to $\text{0x10FFFF}$; `ord("é")` is `0xe9` $= 233$, and `ord("€")` is `0x20ac`. The dominant encoding today is UTF-8.

::: definition UTF-8 {#def-utf8}
**UTF-8** encodes each code point $c$ in one to four bytes:

| code points | bytes | bit pattern |
|---|---|---|
| $\text{0x0}$–$\text{0x7F}$ | 1 | `0xxxxxxx` |
| $\text{0x80}$–$\text{0x7FF}$ | 2 | `110xxxxx 10xxxxxx` |
| $\text{0x800}$–$\text{0xFFFF}$ | 3 | `1110xxxx 10xxxxxx 10xxxxxx` |
| $\text{0x10000}$–$\text{0x10FFFF}$ | 4 | `11110xxx 10xxxxxx 10xxxxxx 10xxxxxx` |

where the `x` bits, read in order, are the binary digits of $c$. (The code points $\text{0xD800}$–$\text{0xDFFF}$ are reserved and are not encoded.)
:::

The first row means that ASCII text — English letters, digits and common punctuation — is byte-for-byte identical in UTF-8, which is one reason for its success. In Python, `s.encode("utf-8")` turns a string into a `bytes` object and `b.decode("utf-8")` turns bytes back into a string.

::: example Counting bytes {#ex-bytes}
How many characters and how many UTF-8 bytes are there in `"A"`, `"é"`, `"€"`, `"日"`, `"😀"` and `"café"`?
::: solution
```python
for s in ["A", "é", "€", "日", "😀", "café"]:
    b = s.encode("utf-8")
    print(repr(s), len(s), len(b), b)
```

```console
$ python3 utf8.py
'A' 1 1 b'A'
'é' 1 2 b'\xc3\xa9'
'€' 1 3 b'\xe2\x82\xac'
'日' 1 3 b'\xe6\x97\xa5'
'😀' 1 4 b'\xf0\x9f\x98\x80'
'café' 4 5 b'caf\xc3\xa9'
```

Each is one character, but $\text{A} = \text{0x41}$ needs one byte, $\text{é} = \text{0xE9}$ two, $\text{€} = \text{0x20AC}$ and $日 = \text{0x65E5}$ three, and the emoji $\text{0x1F600}$ four, exactly as the table in [[#def-utf8]] predicts. In `bytes` displays, bytes that are printable ASCII are shown as characters and others as `\x` followed by two hexadecimal digits. Check for `é`: $\text{0xE9} = 000\,1110\,1001_2$ in 11 bits; splitting as `00011` and `101001` gives `11000011 10101001` $=$ `0xC3 0xA9`. So `len` of a string counts characters, not bytes — which matters whenever a size limit is stated in bytes.
:::
:::

Decoding bytes with the wrong encoding either fails or produces garbage. The bytes `b"caf\xe9"` are `café` in the older Latin-1 encoding, but they are not valid UTF-8: `b"caf\xe9".decode("utf-8")` raises `UnicodeDecodeError: 'utf-8' codec can't decode byte 0xe9 in position 3: unexpected end of data`, because `0xE9` $= 1110\,1001_2$ announces the start of a three-byte sequence that never arrives. That error is an exception — the subject of the rest of this chapter.

## Exceptions

When an operation cannot be carried out, Python does not return a special "error value" that the program might forget to check. It **raises an exception**.

::: definition Exception {#def-exception}
An **exception** is an object describing an error, with a **type** (such as `ValueError` or `FileNotFoundError`) and usually a message. When an exception is **raised** — by a failing operation, or explicitly by a `raise` statement — normal execution stops: Python abandons the current statement and looks for a **handler** for that type of exception, first in the current function and then in each caller in turn, back up the call stack. If a handler is found, execution continues there; if none is found, the program stops and prints a traceback.
:::

You have already seen many exception types: `ZeroDivisionError`, `TypeError`, `NameError`, `IndexError`, `KeyError`, `ValueError` (the right type but an unsuitable value, as in `int("x")`), `RecursionError`. Files add `FileNotFoundError` and `PermissionError`, and attribute access on the wrong type gives `AttributeError` (as in `None.upper()`):

```console
$ python3 missing.py
Traceback (most recent call last):
  File ".../missing.py", line 1, in <module>
    with open("no_such_file.txt", encoding="utf-8") as f:
         ~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
FileNotFoundError: [Errno 2] No such file or directory: 'no_such_file.txt'
```

Exception types form a hierarchy: each type is a special case of a more general one, and a handler for a general type also catches every more specific one.

::: widget graph
nodes: BaseException@6,3; KeyboardInterrupt@1.5,2; Exception@8,2; ArithmeticError@1,1; LookupError@4.5,1; ValueError@8,1; OSError@11,1; ZeroDivisionError@1,0; IndexError@3.5,-1; KeyError@5.5,0; UnicodeError@8,-1; FileNotFoundError@10.5,0; PermissionError@12.5,-1
edges: BaseException>KeyboardInterrupt; BaseException>Exception; Exception>ArithmeticError; Exception>LookupError; Exception>ValueError; Exception>OSError; ArithmeticError>ZeroDivisionError; LookupError>IndexError; LookupError>KeyError; ValueError>UnicodeError; OSError>FileNotFoundError; OSError>PermissionError
caption: Part of Python's built-in exception hierarchy (an arrow points from a general type to a more specific one). `except LookupError` catches both `IndexError` and `KeyError`; `except OSError` catches every operating-system failure, including a missing file; `except Exception` catches almost everything — but not `KeyboardInterrupt` (Ctrl-C), which sits outside `Exception` on purpose so that a user can always stop a program. `UnicodeDecodeError` is in turn a kind of `UnicodeError`. Click a type to see its neighbours.
:::

### Handling exceptions: `try`

::: definition The try statement {#def-try}
The statement

```text
try:
    body
except Type_1 as name:
    handler_1
...
else:
    no_error_block
finally:
    cleanup_block
```

runs `body`. If `body` raises an exception, the `except` clauses are checked in order, and the first whose type matches (is the exception's type or a more general one) runs its handler, with the exception object bound to `name` if `as name` is given; the exception is then considered handled. If no clause matches, the exception continues to propagate. If `body` raised no exception, the optional `else` block runs. In every case — normal completion, a handled exception, an unhandled one, even a `return` or `break` — the optional `finally` block runs last.
:::

::: example The order of the clauses {#ex-try-order}
Run `attempt` on `"42"` and on `"4x2"` and explain the output.

```python
def attempt(text):
    try:
        value = int(text)
        print("  converted", value)
    except ValueError:
        print("  could not convert", repr(text))
    else:
        print("  no exception, so else runs")
    finally:
        print("  finally always runs")

for t in ["42", "4x2"]:
    print("attempt", repr(t))
    attempt(t)
```
::: solution
```console
$ python3 tryorder.py
attempt '42'
  converted 42
  no exception, so else runs
  finally always runs
attempt '4x2'
  could not convert '4x2'
  finally always runs
```

For `"42"` the body completes, so the `except` clause is skipped, the `else` block runs, and then `finally`. For `"4x2"`, `int` raises `ValueError` on the first line of the body; the second line of the body never runs, the matching handler runs, `else` is skipped (an exception occurred), and `finally` runs. The `else` block is the place for code that should run only if the body succeeded but whose own exceptions should *not* be caught by the handlers above it.
:::
:::

::: widget graph
nodes: Try@0,1; Except@1.5,2; Else@1.5,0; Finally@3,1; After@4.5,2; Propagate@4.5,0
edges: Try>Except; Try>Else; Try>Finally; Except>Finally; Else>Finally; Finally>After; Finally>Propagate
caption: Paths through a `try` statement ([[#def-try]]). A matching exception goes from the body to its handler, no exception goes to `else`, and an exception that no clause matches goes straight to `finally`. Every path passes through `finally`; afterwards execution continues after the statement, or the unhandled exception carries on propagating to the caller.
:::

### How an exception travels

An exception raised deep inside a chain of calls does not have to be handled where it occurs. It travels up the call stack, abandoning each frame in turn, until a function that knows what to do catches it. This lets low-level code detect errors and high-level code decide how to respond.

::: example Propagation through calls {#ex-propagate}
Explain what each of the three calls of `report` prints.

```python
def parse_mark(text):
    return int(text)                     # may raise ValueError

def average_mark(texts):
    marks = [parse_mark(t) for t in texts]
    return sum(marks) / len(marks)       # may raise ZeroDivisionError

def report(texts):
    try:
        print("average:", average_mark(texts))
    except ValueError as err:
        print("bad mark:", err)
    except ZeroDivisionError:
        print("no marks given")

report(["62", "71", "58"])
report(["62", "seventy", "58"])
report([])
```
::: solution
```console
$ python3 propagate.py
average: 63.666666666666664
bad mark: invalid literal for int() with base 10: 'seventy'
no marks given
```

In the second call, `int("seventy")` inside `parse_mark` raises `ValueError`. `parse_mark` has no handler, so its frame is abandoned; nor does `average_mark`, which is abandoned in the middle of building its list; the exception reaches the `try` in `report`, whose first clause matches, and `err` is bound to the exception object, whose string form is the message. In the third call the list is empty and the division raises `ZeroDivisionError`, which the second clause catches. Neither `parse_mark` nor `average_mark` needed any error-handling code: they simply state what they compute, and `report`, which knows what the output is for, decides what to say when it fails.
:::
:::

### Raising exceptions

A function signals that it cannot do its job by raising an exception itself, with `raise Type(message)`. This is the right response to a violated precondition ([[programming-1/functions#def-spec]]): rather than returning a wrong or meaningless result, stop and say why.

```python
def safe_mean(xs):
    if len(xs) == 0:
        raise ValueError("mean of an empty list")
    return sum(xs) / len(xs)
```

Calling `safe_mean([])` raises `ValueError: mean of an empty list`. Choose the built-in type that fits — `ValueError` for an unacceptable value, `TypeError` for a value of the wrong type, `KeyError` or `IndexError` for something missing — and write a message that would help the person reading the traceback. (Programs can also define their own exception types as **classes**; that is part of [[program-design]].) Inside a handler, a bare `raise` re-raises the exception being handled, which is useful when a handler wants to log a failure but not hide it.

::: quiz
Which exception does each expression raise: `{}["k"]`, `[][0]`, `int("3.5")`, `"a" + 1`?
- [x] `KeyError`, `IndexError`, `ValueError`, `TypeError`
- [ ] `IndexError`, `IndexError`, `TypeError`, `TypeError`
- [ ] `KeyError`, `KeyError`, `ValueError`, `ValueError`
- [ ] `LookupError`, `LookupError`, `TypeError`, `ValueError`
::: solution
A missing dictionary key raises `KeyError` and a bad list index `IndexError` (both are kinds of `LookupError`, so `except LookupError` would catch either, but the exception's own type is the specific one). `int("3.5")` receives a string — the right type — whose value is not an integer literal: `ValueError`. Adding a string and an integer is an operation on incompatible types: `TypeError`.
:::
:::

## Processing data robustly

Reading real data combines the two halves of the chapter: read a file line by line, convert each line, and decide, for each kind of failure, whether to stop, skip or report.

::: algorithm Robust line-by-line reading {#alg-robust-read}
**Input:** a text file. **Output:** the values parsed from its data lines, and a list of the lines that could not be parsed.

1. Open the file with an explicit encoding, inside `with`.
2. For each line, with its line number:
   1. Strip surrounding whitespace. If the line is empty or a comment, skip it.
   2. Try to convert the line to a value. If the conversion succeeds, keep the value; if it raises the expected exception, record the line number and text as a problem.
3. Return the values and the problems; let the caller decide whether problems are acceptable.
:::

::: example Temperature readings {#ex-temps}
A file `readings.txt` contains the lines below (one is blank). Read the temperatures, report the lines that are not numbers, and compute the mean.

```text
# station temperatures, degrees Celsius
12.5
13.1

thirteen
14.0
-2.5
15.x
```
::: solution
```python
def read_temperatures(path):
    """Return (values, problems) from a file of one temperature per line.

    Blank lines and lines starting with '#' are ignored; any other line that
    is not a number is reported in problems as (line_number, text).
    """
    values, problems = [], []
    with open(path, encoding="utf-8") as f:
        for number, line in enumerate(f, start=1):
            text = line.strip()
            if not text or text.startswith("#"):
                continue
            try:
                values.append(float(text))
            except ValueError:
                problems.append((number, text))
    return values, problems

values, problems = read_temperatures("readings.txt")
print(values)
print(problems)
print(f"mean of {len(values)} readings: {sum(values) / len(values):.2f}")
```

```console
$ python3 temps.py
[12.5, 13.1, 14.0, -2.5]
[(5, 'thirteen'), (8, '15.x')]
mean of 4 readings: 9.28
```

The `try` encloses only the conversion, so the handler catches exactly the failure we expect — a line that is not a number — and nothing else. Problems are reported with their line numbers so that someone can fix the data; they are not silently dropped. Whether a mean of four readings out of six data lines is acceptable is a question for the caller, which is why the function returns the problems instead of printing them. (A `FileNotFoundError` is deliberately *not* caught here: if the file is missing, no sensible result exists, and the caller should hear about it.)
:::
:::

Data in rows and columns is usually stored as **CSV** (comma-separated values). Splitting lines on commas works for simple files, but CSV allows quoted fields that contain commas, so use the standard module `csv`. Its `DictReader` turns each row into a dictionary keyed by the column names in the header line; open the file with `newline=""`, as the `csv` documentation requires.

```python
import csv

def course_averages(path):
    """Average mark per course from a CSV file with columns name, course, mark."""
    totals, counts, skipped = {}, {}, 0
    with open(path, encoding="utf-8", newline="") as f:
        for row in csv.DictReader(f):            # each row is a dict keyed by the header
            try:
                mark = int(row["mark"])
            except ValueError:
                skipped += 1                     # blank or non-numeric mark
                continue
            course = row["course"]
            totals[course] = totals.get(course, 0) + mark
            counts[course] = counts.get(course, 0) + 1
    return {c: totals[c] / counts[c] for c in totals}, skipped

averages, skipped = course_averages("marks.csv")
with open("summary.txt", "w", encoding="utf-8") as out:
    for course in sorted(averages):
        print(f"{course:8} {averages[course]:6.2f}", file=out)
    print(f"skipped {skipped} rows", file=out)

with open("summary.txt", encoding="utf-8") as f:
    print(f.read(), end="")
```

With this `marks.csv`

```text
name,course,mark
Ada,maths,91
Alan,maths,78
Ada,physics,85
Grace,physics,not taken
Alan,physics,
Grace,maths,88
```

the program writes and then displays

```console
$ python3 summary.py
maths     85.67
physics   85.00
skipped 2 rows
```

($85.67$ is $(91 + 78 + 88)/3$.) The pattern — counting with dictionaries ([[programming-1/dictionaries-sets#alg-count]]), a narrow `try` around each conversion, a count of what was skipped, and output written to a file — covers a great deal of everyday data processing.

### Asking forgiveness or permission

There are two styles of dealing with operations that may fail. **Look before you leap** checks first: `if key in d: value = d[key]`. **Easier to ask forgiveness than permission** (EAFP) just tries, and handles the exception: `try: value = d[key]` / `except KeyError: ...`. Python code often prefers EAFP, for two reasons. Some checks are as much work as the operation itself (to check that a string is a valid float, you essentially have to parse it). And some checks cannot be made reliably at all: testing `os.path.exists(path)` and then opening the file leaves a gap during which another program may delete it, so the `open` can fail anyway. The robust way to open a file that may be missing is to open it and catch `FileNotFoundError`.

Input typed by a user is the extreme case of untrusted data. A small loop that asks again until it gets an acceptable answer makes a program pleasant to use:

```python
def ask_positive_int(prompt):
    """Ask until the user types a positive whole number; return it."""
    while True:
        text = input(prompt)
        try:
            n = int(text)
        except ValueError:
            print(f"{text!r} is not a whole number, try again")
            continue
        if n > 0:
            return n
        print("the number must be positive, try again")

copies = ask_positive_int("How many copies? ")
print("printing", copies, "copies")
```

```console
$ python3 ask.py
How many copies? lots
'lots' is not a whole number, try again
How many copies? -5
the number must be positive, try again
How many copies? 3
printing 3 copies
```

(`while True` loops until a `return`; `{text!r}` formats the value with `repr`, so the user sees exactly what was typed, quotes included.)

::: warning Catching too much
A bare `except:` or `except Exception:` around a large block catches every error, including the bugs you did not anticipate — a misspelt name raises `NameError`, which such a handler would treat like bad input and hide. Programs that do this fail silently and are very hard to debug. Catch the specific exception types you expect, put as little code as possible inside the `try`, and never write a handler that does nothing (`except ValueError: pass`) unless ignoring the error is genuinely correct and a comment says why. An unhandled exception with a clear traceback is far better than a wrong result.
:::

::: history
Early languages handled errors by return codes, which callers routinely forgot to check. PL/I (1964) had "ON-conditions" for run-time errors, and John Goodenough's paper "Exception handling: issues and a proposed notation" (*Communications of the ACM*, 1975) set out the design questions. CLU, designed by Barbara Liskov's group at MIT in the mid-1970s, and Ada (standardised in 1983) introduced the structured termination model used today, in which a raised exception abandons frames until a handler is found; C++, Java and Python followed. The `with` statement was added in Python 2.5 (2006, PEP 343). On the file side, ASCII was published in 1963; UTF-8 was designed by Ken Thompson and Rob Pike in September 1992 for the Plan 9 operating system, and by the 2020s it was used by over 95% of web pages.
:::

## Where this leads

Files and exceptions connect programs to the rest of the world. In [[programming-1/testing-debugging]] exceptions become a tool for checking programs (an assertion is a raised exception), and tests check that functions raise the right exceptions for bad input. How files are actually stored — blocks, directories, buffering and the guarantees of `flush` and `fsync` — belongs to [[operating-systems]]; character encodings and data formats reappear in [[networks]]; and validating untrusted input is the first line of defence studied in [[security]].

::: summary
- Open files with `with open(path, mode, encoding="utf-8") as f:` so that they are always closed; mode `"w"` truncates, `"a"` appends, `"x"` refuses to overwrite ([[#def-open]]).
- Iterating over a file yields lines that end in `"\n"`; strip them. `write` adds no newline; `print(..., file=f)` does.
- Strings hold Unicode characters; files hold bytes. UTF-8 encodes each code point in one to four bytes, with ASCII unchanged ([[#def-utf8]]), so `len` of a string is not its size in bytes.
- An **exception** abandons the current computation and propagates up the call stack to the nearest matching handler, or stops the program with a traceback ([[#def-exception]]). Exception types form a hierarchy.
- `try`/`except`/`else`/`finally` ([[#def-try]]): handlers run for matching exceptions, `else` only if none occurred, `finally` always.
- `raise ValueError("...")` signals a violated precondition. Catch specific exceptions around as little code as possible, and report or count what you skip rather than hiding it.
- Read data robustly ([[#alg-robust-read]]); use `csv` for CSV files; prefer EAFP when a check cannot be made reliably.
:::

## Exercises

::: exercise Which clauses run? {level=1}
For `f(2)` and `f(0)`, list the lines printed and the value returned.

```python
def f(x):
    try:
        print("try", 1 / x)
        return "A"
    except ZeroDivisionError:
        print("except")
        return "B"
    else:
        print("else")
        return "C"
    finally:
        print("finally")
```
::: solution
`f(2)` prints `try 0.5`, then reaches `return "A"`. A `return` inside the body leaves the `try` statement, so the `else` block — which runs only when the body *completes* without an exception — is skipped; `finally` still runs and prints `finally`, and the function returns `'A'`. `f(0)` raises `ZeroDivisionError` while evaluating `1 / x`, so nothing is printed by the first `print`; the handler prints `except` and executes `return "B"`, then `finally` prints `finally`, and the function returns `'B'`. Running it confirms: `try 0.5`, `finally`, `A`, `except`, `finally`, `B`.
:::
:::

::: exercise Name the exception {level=1}
Which exception, if any, does each of the following raise? `int("x")`, `[1, 2][2]`, `{"a": 1}["b"]`, `open("missing.txt")` (no such file), `None.upper()`, `float("nan") + 1`.
::: solution
`ValueError`; `IndexError` (the valid indices are $0$ and $1$); `KeyError`; `FileNotFoundError`; `AttributeError` (`None` has no method `upper`); and none — `float("nan") + 1` is `nan`: arithmetic on the IEEE 754 "not a number" value quietly produces `nan` rather than raising an exception, which is one reason why `nan` values can spread unnoticed through a calculation.
:::
:::

::: exercise Bytes in a word {level=1 check="13"}
How many characters and how many UTF-8 bytes does the string `"naïve 日本"` have? (Enter the number of bytes.)
::: solution
It has $8$ characters: `n`, `a`, `ï`, `v`, `e`, a space, `日` and `本`. By [[#def-utf8]], the five ASCII characters (`n`, `a`, `v`, `e` and the space) take one byte each, `ï` ($\text{0xEF}$) takes two, and each of the two Chinese characters ($\text{0x65E5}$ and $\text{0x672C}$) takes three, giving $5 + 2 + 3 + 3 = 13$ bytes. Python agrees: `len("naïve 日本".encode("utf-8"))` is `13`.
:::
:::

::: exercise Counting lines, words and characters {level=2 check="20"}
Write a program `wc.py` that prints the number of lines, words and characters of each file named on its command line (available as the list `sys.argv[1:]` after `import sys`), and prints a message on standard error, `sys.stderr`, for a file that does not exist or is not valid UTF-8. For the four-line file below, how many words does it report? (Enter the number of words.)

```text
Tyger Tyger, burning bright,
In the forests of the night;
What immortal hand or eye,
Could frame thy fearful symmetry?
```
::: solution
```python
import sys

def count(path):
    """Return (lines, words, characters) for a UTF-8 text file."""
    lines = words = chars = 0
    with open(path, encoding="utf-8") as f:
        for line in f:
            lines += 1
            words += len(line.split())
            chars += len(line)            # includes the newline character
    return lines, words, chars

for path in sys.argv[1:]:
    try:
        print(*count(path), path)
    except FileNotFoundError:
        print(f"wc.py: {path}: no such file", file=sys.stderr)
    except UnicodeDecodeError:
        print(f"wc.py: {path}: not valid UTF-8 text", file=sys.stderr)
```

```console
$ python3 wc.py poem.txt nothere.txt
4 20 119 poem.txt
wc.py: nothere.txt: no such file
```

The lines have $4$, $6$, $5$ and $5$ words, $20$ in all, and the file has $119$ characters including the four newlines; the Unix `wc` command reports the same three numbers. `print(*count(path), path)` unpacks the tuple into separate arguments. Error messages go to standard error so that they do not mix with the program's real output when that output is redirected to a file.
:::
:::

::: exercise A safer average {level=2}
Write `mean_of_file(path)` that returns the mean of the numbers in a file (one per line, blank lines ignored) and raises `ValueError` with a message naming the line number if any line is not a number, or if there are no numbers at all. Which exceptions should it *not* catch?
::: solution
```python
def mean_of_file(path):
    """Mean of the numbers in a text file, one per line; blank lines are ignored.

    Raises ValueError if a line is not a number or the file has no numbers.
    """
    values = []
    with open(path, encoding="utf-8") as f:
        for number, line in enumerate(f, start=1):
            text = line.strip()
            if not text:
                continue
            try:
                values.append(float(text))
            except ValueError:
                raise ValueError(f"{path}, line {number}: not a number: {text!r}") from None
    if not values:
        raise ValueError(f"{path}: no numbers")
    return sum(values) / len(values)
```

The handler converts the uninformative `could not convert string to float` into a message with the file name and line number (`from None` suppresses the display of the original exception). It should *not* catch `FileNotFoundError`, `PermissionError` or `UnicodeDecodeError`: the function cannot do anything useful about them, and they already describe the problem precisely, so they should propagate to a caller that can decide what to do.
:::
:::

::: exercise Truncation {level=2}
A program opens a file with `open(path, "w")` to "check whether it can be written" and then closes it again without writing. What has happened to the file's contents? Which mode should be used to add lines to the end of an existing log file, and which to create a file only if no file of that name exists?
::: solution
Opening with `"w"` **truncates** the file to length zero at once, so its previous contents are lost even though nothing was written. To add to the end of an existing file use `"a"` (append), which creates the file if necessary and never truncates. To create a new file but refuse to overwrite an existing one, use `"x"`, which raises `FileExistsError` if the file exists — and this check is made by the operating system as part of opening the file, so there is no gap in which another program could create it first.
:::
:::

::: exercise Atomic replacement {level=3}
A program saves its settings by opening `settings.txt` with mode `"w"` and writing the new contents. Explain what a user might find in the file if the program crashed, or the computer lost power, halfway through. Then explain why the following function avoids the problem.

```python
import os

def write_atomically(path, text):
    """Replace the file at path with text, so that readers see the old or the new file, never half of one."""
    temp = path + ".tmp"
    with open(temp, "w", encoding="utf-8") as f:
        f.write(text)
        f.flush()
        os.fsync(f.fileno())          # ask the operating system to put the data on disk
    os.replace(temp, path)            # an atomic rename on POSIX systems
```
::: solution
Opening with `"w"` truncates the file immediately, so between the `open` and the end of the writing the file holds only part of the new contents — possibly nothing — and a crash in that window leaves it that way: the old settings are destroyed and the new ones incomplete.

`write_atomically` never touches `settings.txt` until the new contents are complete. It writes them to a temporary file, flushes Python's buffer (`flush`) and asks the operating system to write its own buffers to the storage device (`fsync`). Only then does `os.replace` rename the temporary file over the old one. On POSIX systems a rename within one file system is atomic — any other process opening `settings.txt` sees either the old file or the new one, never a mixture — and Python's documentation states that a successful `os.replace` is atomic on POSIX systems (on Windows it also replaces the file in one call, though the guarantees are weaker). A crash before the rename leaves the old file intact (and a stray `.tmp` file); a crash after it leaves the new file. (Fully guaranteeing that the rename itself survives a power failure also requires syncing the directory, a detail studied in [[operating-systems]].)
:::
:::

::: exercise UTF-8 lengths {level=3 check="3"}
Prove that UTF-8 ([[#def-utf8]]) is **self-synchronising**: given a position in the middle of a valid UTF-8 byte sequence, one can find the start of the character containing it by moving back at most $3$ bytes, without looking at anything before them. Also show that no character's encoding is a prefix of another's. (Enter the maximum number of bytes one may need to move back.)
::: solution
Classify bytes by their leading bits: `0xxxxxxx` is a one-byte character, `10xxxxxx` is a **continuation byte**, and `110xxxxx`, `1110xxxx`, `11110xxx` are **lead bytes** of two-, three- and four-byte characters. These classes are disjoint, so the class of any byte can be determined from the byte alone.

*Synchronisation.* In a valid sequence each character is a lead byte (or a one-byte character) followed by $0$ to $3$ continuation bytes. So from any position, step back while the current byte is a continuation byte; after at most $3$ steps you reach a byte that is not a continuation byte, and that byte begins the character. No earlier bytes need to be examined.

*Prefix-freeness.* The first byte of an encoding determines its length ($1$ for `0xxxxxxx`, $2$ for `110xxxxx`, and so on). If one encoding were a proper prefix of another, they would share a first byte and hence a length — a contradiction. Thus a decoder can always tell where one character ends and the next begins, and a search for the bytes of one character can never match in the middle of another. The maximum backward step is $3$.
:::
:::
