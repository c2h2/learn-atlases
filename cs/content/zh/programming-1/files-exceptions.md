到目前为止，每个程序一停下来就忘记了一切，而且它的数据取自写在源代码里的字面量。有用的程序两者都不做：它们读取别人产生的数据——一份日志、一个导出为文本的电子表格、一份仪器读数列表——并写出比它们自身寿命更长的结果。而这些数据来自外部，所以有时是错误的：文件不存在、该是数字的一行写着 `thirteen`、成绩留了空白、文本用了程序没有预料到的编码。一个遇到第一条不完美的行就崩溃的程序没什么用处；而一个悄悄跳过坏行、然后自信地报出平均值的程序可能更糟。

本章讨论这个问题的两个方面。**文件**是程序读写持久数据的方式：安全地打开与关闭、逐行读取、写文本，以及把字符变成字节的那个编码。**异常**是 Python 报告并处理错误的机制：一个操作失败时会发生什么、故障如何沿调用栈向上传播、以及如何精确捕获你能够应对的那些失败——而不是其他失败。

## 读写文本文件

**文件**是由操作系统保存在磁盘或其他存储器上的、有名字的字节序列。**文本文件**的字节编码的是字符，按换行符（`"\n"`）分成行组织。Python 通过**文件对象**与文件打交道；文件对象记得文件中的当前位置，并在程序与操作系统之间缓冲数据。

::: definition 打开文件 {#def-open}
`open(path, mode, encoding=...)` 向操作系统申请访问 `path` 处的文件，并返回一个文件对象。**模式**表明程序的意图：`"r"` 读（默认）、`"w"` 写（创建文件，若文件已存在则把它**截断**为空）、`"a"` 追加（在末尾写）、`"x"` 创建新文件、若已存在则失败；再加上 `"b"`（如 `"rb"`）得到的是字节的二进制文件而不是文本文件。对文本文件，**编码**给出字符与字节相互转换的规则。语句

```text
with open(path, mode, encoding="utf-8") as f:
    block
```

把 `f` 绑定到文件对象，运行该块，然后在块结束时——无论它以何种方式结束，包括因异常结束——**关闭**文件：把缓冲的输出冲刷给操作系统并释放文件。
:::

```python
with open("notes.txt", "w", encoding="utf-8") as f:     # "w"：创建或覆盖
    f.write("first line\n")
    f.write("second line\n")
    print("third line", file=f)                          # print 也能写文件

with open("notes.txt", encoding="utf-8") as f:           # 默认模式 "r"：读文本
    for number, line in enumerate(f, start=1):
        print(number, repr(line))

with open("notes.txt", encoding="utf-8") as f:
    text = f.read()                                      # 整个文件作为一个字符串
print(len(text), text.splitlines())
```

```console
$ python3 writeread.py
1 'first line\n'
2 'second line\n'
3 'third line\n'
34 ['first line', 'second line', 'third line']
```

有几个细节值得注意。`f.write` 一字不差地写出给它的字符串——它不会添加换行符——而 `print(..., file=f)` 会加一个，正如它在屏幕上所做的那样。遍历文件对象会逐行产出内容，*每行末尾仍带* `"\n"`（`repr` 让换行符可见）；可用 `line.strip()` 或 `line.rstrip("\n")` 去掉它。迭代一次读一块内容，所以对远大于计算机内存的文件也能工作，而 `f.read()` 把整个文件读进一个字符串——只适合小文件。`text.splitlines()` 把字符串按行切开且不带换行符。

::: warning 一定要关闭文件，一定要写明编码
不用 `with` 打开的文件会一直保持打开，直到用 `f.close()` 显式关闭，或直到 Python 恰好回收它。写入的数据可能留在缓冲区里，若程序崩溃就永远到不了磁盘；而一个忘记关闭文件的长运行程序最终会把可用的文件用完。对每个文件都要用 `with`。

编码也要写明。不写 `encoding=` 时，Python 3.14 使用操作系统的首选编码：在大多数 Linux 和 macOS 系统上是 UTF-8，但在 Windows 上可能是某个遗留代码页，因此在一个计算机上正确读出 `café` 的程序，在另一台上可能失败或读出 `cafÃ©`。（依据 PEP 686，Python 3.15 计划在各地都默认使用 UTF-8。）写出 `encoding="utf-8"` 不花什么代价，却使程序在任何地方行为一致。
:::

### 字符与字节

文件和网络上承载的是字节，不是字符。**编码**是二者之间转换的规则。Python 的字符串是 Unicode 字符的序列，每个字符由一个**码点**标识，是 $0$ 到 $\text{0x10FFFF}$ 之间的一个数；`ord("é")` 是 `0xe9` $= 233$，`ord("€")` 是 `0x20ac`。当今占主导地位的编码是 UTF-8。

::: definition UTF-8 {#def-utf8}
**UTF-8** 把每个码点 $c$ 编码为一到四个字节：

| 码点 | 字节数 | 位模式 |
|---|---|---|
| $\text{0x0}$–$\text{0x7F}$ | 1 | `0xxxxxxx` |
| $\text{0x80}$–$\text{0x7FF}$ | 2 | `110xxxxx 10xxxxxx` |
| $\text{0x800}$–$\text{0xFFFF}$ | 3 | `1110xxxx 10xxxxxx 10xxxxxx` |
| $\text{0x10000}$–$\text{0x10FFFF}$ | 4 | `11110xxx 10xxxxxx 10xxxxxx 10xxxxxx` |

其中按次序读出的 `x` 位就是 $c$ 的二进制数字。（码点 $\text{0xD800}$–$\text{0xDFFF}$ 是保留的，不予编码。）
:::

第一行意味着 ASCII 文本——英文字母、数字和常见标点——在 UTF-8 下逐字节保持不变，这是它成功的原因之一。在 Python 中，`s.encode("utf-8")` 把字符串变成 `bytes` 对象，`b.decode("utf-8")` 把字节变回字符串。

::: example 数字节 {#ex-bytes}
`"A"`、`"é"`、`"€"`、`"日"`、`"😀"` 和 `"café"` 各有多少个字符、多少个 UTF-8 字节？
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

每个都是一个字符，但 $\text{A} = \text{0x41}$ 需要一个字节，$\text{é} = \text{0xE9}$ 两个，$\text{€} = \text{0x20AC}$ 和 $日 = \text{0x65E5}$ 三个，表情符号 $\text{0x1F600}$ 四个，正与 [[#def-utf8]] 的表格预测一致。在 `bytes` 的显示中，可打印的 ASCII 字节显示为字符，其余显示为 `\x` 加两位十六进制数字。以 `é` 验证：$\text{0xE9} = 000\,1110\,1001_2$，取 11 位；分成 `00011` 和 `101001` 两组，得 `11000011 10101001` $=$ `0xC3 0xA9`。所以字符串的 `len` 统计的是字符数而不是字节数——每当尺寸限制以字节计，这一点就很重要。
:::
:::

用错误的编码解码字节，要么失败，要么产生乱码。字节 `b"caf\xe9"` 是旧编码 Latin-1 下的 `café`，但它们不是合法的 UTF-8：`b"caf\xe9".decode("utf-8")` 引发 `UnicodeDecodeError: 'utf-8' codec can't decode byte 0xe9 in position 3: unexpected end of data`，因为 $0xE9$ $= 1110\,1001_2$ 宣告了一个三字节序列的开始，而后续字节永远不会到来。那个错误就是一个异常——本章其余部分的主题。

## 异常

当一个操作无法完成时，Python 不会返回一个程序可能忘记检查的特殊“错误值”。它**引发一个异常**。

::: definition 异常 {#def-exception}
**异常**是一个描述错误的对象，具有**类型**（如 `ValueError` 或 `FileNotFoundError`）和通常一条消息。当异常被**引发**——由一个失败的操作，或由一条 `raise` 语句显式地——正常执行随即停止：Python 放弃当前语句，开始寻找能处理该类型异常的**处理器**，先在当前函数中找，然后依次在每个调用者中找，沿调用栈一路向上。若找到处理器，执行就从那里继续；若找不到，程序停止并打印一个回溯。
:::

你已经见过许多异常类型：`ZeroDivisionError`、`TypeError`、`NameError`、`IndexError`、`KeyError`、`ValueError`（类型正确但值不合适，如 `int("x")`）、`RecursionError`。文件方面增加 `FileNotFoundError` 和 `PermissionError`，对错误的类型做属性访问则给出 `AttributeError`（如 `None.upper()`）：

```console
$ python3 missing.py
Traceback (most recent call last):
  File ".../missing.py", line 1, in <module>
    with open("no_such_file.txt", encoding="utf-8") as f:
         ~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
FileNotFoundError: [Errno 2] No such file or directory: 'no_such_file.txt'
```

异常类型构成一个层次结构：每个类型都是某个更一般类型的特例，而针对一般类型的处理器也会捕获每一个更具体的类型。

::: widget graph
nodes: BaseException@6,3; KeyboardInterrupt@1.5,2; Exception@8,2; ArithmeticError@1,1; LookupError@4.5,1; ValueError@8,1; OSError@11,1; ZeroDivisionError@1,0; IndexError@3.5,-1; KeyError@5.5,0; UnicodeError@8,-1; FileNotFoundError@10.5,0; PermissionError@12.5,-1
edges: BaseException>KeyboardInterrupt; BaseException>Exception; Exception>ArithmeticError; Exception>LookupError; Exception>ValueError; Exception>OSError; ArithmeticError>ZeroDivisionError; LookupError>IndexError; LookupError>KeyError; ValueError>UnicodeError; OSError>FileNotFoundError; OSError>PermissionError
caption: Python 内建异常层次结构的一部分（箭头从一般类型指向更具体的类型）。`except LookupError` 同时捕获 `IndexError` 和 `KeyError`；`except OSError` 捕获一切操作系统故障，包括文件缺失；`except Exception` 几乎捕获所有异常——但不包括 `KeyboardInterrupt`（Ctrl-C），它有意位于 `Exception` 之外，以便用户始终能够停止程序。`UnicodeDecodeError` 又是 `UnicodeError` 的一种。点击某个类型查看它的邻居。
:::

### 处理异常：`try`

::: definition try 语句 {#def-try}
语句

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

运行 `body`。若 `body` 引发异常，则按顺序检查各个 `except` 子句，第一个类型匹配（是异常的类型或更一般的类型）的子句运行它的处理器；若写有 `as name`，则把异常对象绑定到 `name`；该异常随后即被视为已处理。若没有任何子句匹配，异常继续传播。若 `body` 没有引发异常，则运行可选的 `else` 块。无论哪种情形——正常结束、异常被处理、异常未被处理，甚至 `return` 或 `break`——可选的 `finally` 块最后都要运行。
:::

::: example 各子句的顺序 {#ex-try-order}
对 `"42"` 和 `"4x2"` 运行 `attempt`，并解释输出。

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

对 `"42"`，body 正常完成，因此跳过 `except` 子句，`else` 块运行，然后是 `finally`。对 `"4x2"`，`int` 在 body 的第一行引发 `ValueError`；body 的第二行不再运行，匹配的处理器运行，`else` 被跳过（发生了异常），`finally` 运行。`else` 块适合放置这样的代码：只有当 body 成功时才应运行，而其自身引发的异常*不应*被上面的处理器捕获。
:::
:::

::: widget graph
nodes: Try@0,1; Except@1.5,2; Else@1.5,0; Finally@3,1; After@4.5,2; Propagate@4.5,0
edges: Try>Except; Try>Else; Try>Finally; Except>Finally; Else>Finally; Finally>After; Finally>Propagate
caption: `try` 语句（[[#def-try]]）中的各个路径。有匹配的异常时从 body 走到它的处理器；没有异常时走 `else`；没有子句匹配的异常直接进入 `finally`。每条路径都经过 `finally`；此后执行从该语句之后继续，未处理的异常则继续向调用者传播。
:::

### 异常如何传播

在一串调用的深处引发的异常不必在发生它的地方处理。它沿调用栈向上传播，依次放弃各个帧，直到某个知道该怎么办了的函数把它捕获。这使得底层代码负责发现错误、高层代码决定如何回应。

::: example 异常穿过调用传播 {#ex-propagate}
说明对 `report` 的三次调用各打印什么。

```python
def parse_mark(text):
    return int(text)                     # 可能引发 ValueError

def average_mark(texts):
    marks = [parse_mark(t) for t in texts]
    return sum(marks) / len(marks)       # 可能引发 ZeroDivisionError

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

第二次调用中，`parse_mark` 内部的 `int("seventy")` 引发 `ValueError`。`parse_mark` 没有处理器，它的帧被放弃；`average_mark` 也没有，它在构造列表的中途被放弃；异常到达 `report` 中的 `try`，其第一个子句匹配，`err` 绑定到异常对象，而它的字符串形式就是那条消息。第三次调用中列表为空，除法引发 `ZeroDivisionError`，被第二个子句捕获。`parse_mark` 和 `average_mark` 都不需要任何错误处理代码：它们只说明自己计算什么；而知道输出用处的 `report` 决定失败时该说什么。
:::
:::

### 引发异常

函数通过自己引发一个异常 `raise Type(message)` 来表示它无法完成自己的工作。这是对违反前置条件的正确回应（[[programming-1/functions#def-spec]]）：与其返回一个错误或无意义的结果，不如停下来并说明原因。

```python
def safe_mean(xs):
    if len(xs) == 0:
        raise ValueError("mean of an empty list")
    return sum(xs) / len(xs)
```

调用 `safe_mean([])` 引发 `ValueError: mean of an empty list`。选择贴合情况的内建类型——不可接受的值用 `ValueError`，类型错误的值用 `TypeError`，缺失的东西用 `KeyError` 或 `IndexError`——并写一条能帮助阅读回溯者的消息。（程序也可以把自定义异常类型定义为**类**；这属于 [[program-design]] 的内容。）在处理器内部，不带参数的 `raise` 重新引发正在处理的异常；当处理器想把一次失败记录到日志却不愿掩盖它时，这很有用。

::: quiz
下列各表达式各引发什么异常：`{}["k"]`、`[][0]`、`int("3.5")`、`"a" + 1`？
- [x] `KeyError`, `IndexError`, `ValueError`, `TypeError`
- [ ] `IndexError`, `IndexError`, `TypeError`, `TypeError`
- [ ] `KeyError`, `KeyError`, `ValueError`, `ValueError`
- [ ] `LookupError`, `LookupError`, `TypeError`, `ValueError`
::: solution
字典中缺失的键引发 `KeyError`，非法的列表下标引发 `IndexError`（两者都是 `LookupError` 的种类，所以 `except LookupError` 能捕获其中任何一个，但异常自身的类型是具体的那个）。`int("3.5")` 收到一个字符串——类型正确——但其值不是整数字面量：`ValueError`。把字符串和整数相加是在对不兼容的类型做运算：`TypeError`。
:::
:::

## 健壮地处理数据

读取真实数据把本章的两方面结合起来：逐行读文件、转换每一行，并针对每种失败决定是停止、跳过还是报告。

::: algorithm 逐行健壮读取 {#alg-robust-read}
**输入：** 一个文本文件。**输出：** 从其数据行解析出的值，以及无法解析的行的列表。

1. 在 `with` 内以显式编码打开文件。
2. 对每一行连同其行号：
   1. 去掉首尾空白。若该行为空或是注释，跳过。
   2. 尝试把该行转换为一个值。转换成功则保留该值；若引发了预期的异常，则把行号和文本记为一个问题。
3. 返回这些值和这些问题；让调用者决定问题是否可以接受。
:::

::: example 温度读数 {#ex-temps}
文件 `readings.txt` 含有下面这些行（其中一行为空）。读入温度，报告不是数字的那些行，并计算平均值。

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

`try` 只把转换包在里面，因此处理器恰好捕获我们预期的那个失败——不是数字的行——而不捕获任何其他东西。问题连同行号一起报告，以便有人能修正数据；它们不会被悄悄丢弃。六个数据行中四个读数的平均值是否可接受，是留给调用者的问题——这就是函数返回问题列表而不是打印它们的原因。（`FileNotFoundError` 在这里是*有意*不捕获的：文件不存在就不存在任何有意义的结果，调用者应当得知此事。）
:::
:::

行列形式的数据通常存为 **CSV**（comma-separated values，逗号分隔值）。对简单文件按逗号切分可行，但 CSV 允许含逗号的带引号字段，所以应使用标准模块 `csv`。它的 `DictReader` 把每一行变成以表头行的列名为键的字典；按 `csv` 文档的要求，打开文件时写 `newline=""`。

```python
import csv

def course_averages(path):
    """Average mark per course from a CSV file with columns name, course, mark."""
    totals, counts, skipped = {}, {}, 0
    with open(path, encoding="utf-8", newline="") as f:
        for row in csv.DictReader(f):            # 每行是一个以表头列为键的字典
            try:
                mark = int(row["mark"])
            except ValueError:
                skipped += 1                     # 空白或非数字成绩
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

使用这个 `marks.csv`

```text
name,course,mark
Ada,maths,91
Alan,maths,78
Ada,physics,85
Grace,physics,not taken
Alan,physics,
Grace,maths,88
```

程序写出然后显示

```console
$ python3 summary.py
maths     85.67
physics   85.00
skipped 2 rows
```

（$85.67$ 即 $(91 + 78 + 88)/3$。）这一模式——用字典计数（[[programming-1/dictionaries-sets#alg-count]]）、在每个转换外面套一个窄的 `try`、统计跳过的行数、把输出写入文件——覆盖了日常数据处理的很大一部分。

### 请求原谅还是请求许可

应对可能失败的操作有两种风格。**三思而后行**（look before you leap）先做检查：`if key in d: value = d[key]`。**请求原谅比请求许可更容易**（Easier to ask forgiveness than permission，EAFP）则直接尝试，再处理异常：`try: value = d[key]` / `except KeyError: ...`。Python 代码常常偏好 EAFP，理由有二。有些检查和操作本身一样费劲（要检查一个字符串是合法的浮点数，你实际上得把它解析一遍）。还有些检查根本无法可靠地做：先测试 `os.path.exists(path)` 再打开文件，会留下一段空档，其间另一个程序可能把它删掉，于是 `open` 照样可能失败。打开一个可能缺失的文件的健壮做法，就是直接打开并捕获 `FileNotFoundError`。

用户键入的数据是不可信数据的极端情形。一个小循环不断询问直到得到可接受的回答，能让程序用起来令人愉快：

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

（`while True` 循环直到某个 `return`；`{text!r}` 用 `repr` 格式化该值，所以用户能确切看到自己键入的内容，引号也在内。）

::: warning 捕获得太多
在一大块代码外面套一个裸的 `except:` 或 `except Exception:`，会捕获一切错误，包括你没有预料到的缺陷——拼错的名字会引发 `NameError`，而这样的处理器会把它当成坏输入掩盖掉。这样做的程序会无声地失败，极难调试。捕获你预期的那些具体异常类型，把尽可能少的代码放进 `try`，绝不要写一个什么都不做的处理器（`except ValueError: pass`）——除非忽略错误确实正确，而且注释说明了原因。一个带着清晰回溯的未处理异常，远远好过一个错误的结果。
:::

::: history
早期语言用返回码处理错误，而调用者常常忘记检查。PL/I（1964 年）为运行时错误提供了“ON-条件”，John Goodenough 的论文《异常处理：问题与一种建议的记法》（Exception handling: issues and a proposed notation，*Communications of the ACM*，1975 年）阐明了设计上的关键问题。由 MIT 的芭芭拉·利斯科夫（Barbara Liskov）团队在 20 世纪 70 年代中期设计的 CLU，以及 Ada（1983 年标准化），引入了今天使用的、结构化的终止模型：引发异常会放弃一层层帧，直到找到处理器；C++、Java 和 Python 沿袭了这一模型。`with` 语句在 Python 2.5（2006 年，PEP 343）中加入。文件方面，ASCII 于 1963 年发布；UTF-8 由肯·汤普森（Ken Thompson）和罗布·派克（Rob Pike）于 1992 年 9 月为 Plan 9 操作系统设计，到 2020 年代已被超过 95% 的网页使用。
:::

## 后续内容

文件和异常把程序与外部世界连接起来。在 [[programming-1/testing-debugging]] 中，异常将成为检查程序的工具（断言就是被引发的异常），测试会检查函数对坏输入是否引发正确的异常。文件实际如何存储——块、目录、缓冲，以及 `flush` 与 `fsync` 提供的保证——属于 [[operating-systems]] 的内容；字符编码与数据格式会在 [[networks]] 中再次出现；而校验不可信输入是 [[security]] 研究的第一道防线。

::: summary
- 用 `with open(path, mode, encoding="utf-8") as f:` 打开文件，保证它们一定被关闭；模式 `"w"` 会截断，`"a"` 追加，`"x"` 拒绝覆盖（[[#def-open]]）。
- 遍历文件产出的行以 `"\n"` 结尾；要把它们去掉。`write` 不添加换行符；`print(..., file=f)` 会添加。
- 字符串存放 Unicode 字符；文件存放字节。UTF-8 把每个码点编码为一到四个字节，ASCII 保持不变（[[#def-utf8]]），所以字符串的 `len` 不等于它的字节大小。
- **异常**放弃当前的计算，沿调用栈向上传播到最近的匹配处理器，否则带着回溯停止程序（[[#def-exception]]）。异常类型构成一个层次结构。
- `try`/`except`/`else`/`finally`（[[#def-try]]）：匹配的异常运行处理器，没有发生异常才运行 `else`，`finally` 总是运行。
- `raise ValueError("...")` 宣告违反了一个前置条件。围绕尽可能少的代码捕获具体的异常，对你跳过的东西要报告或计数，而不是掩盖。
- 健壮地读取数据（[[#alg-robust-read]]）；CSV 文件用 `csv`；当检查无法可靠进行时，优先采用 EAFP。
:::

## 习题

::: exercise 哪些子句运行？ {level=1}
对 `f(2)` 和 `f(0)`，列出打印的行和返回的值。

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
`f(2)` 打印 `try 0.5`，然后到达 `return "A"`。body 中的 `return` 会离开 `try` 语句，因此 `else` 块——它只在 body *正常完成*且没有异常时运行——被跳过；`finally` 仍然运行并打印 `finally`，函数返回 `'A'`。`f(0)` 在求值 `1 / x` 时引发 `ZeroDivisionError`，因此第一个 `print` 什么都没打印；处理器打印 `except` 并执行 `return "B"`，然后 `finally` 打印 `finally`，函数返回 `'B'`。运行可加证实：`try 0.5`、`finally`、`A`、`except`、`finally`、`B`。
:::
:::

::: exercise 说出异常名 {level=1}
下面各项各引发什么异常（若没有则说明没有）：`int("x")`、`[1, 2][2]`、`{"a": 1}["b"]`、`open("missing.txt")`（文件不存在）、`None.upper()`、`float("nan") + 1`。
::: solution
`ValueError`；`IndexError`（合法下标是 $0$ 和 $1$）；`KeyError`；`FileNotFoundError`；`AttributeError`（`None` 没有方法 `upper`）；以及一个都没有——`float("nan") + 1` 是 `nan`：对 IEEE 754 的“非数”值做算术会悄悄地产生 `nan` 而不是引发异常，这正是 `nan` 值能在计算中不知不觉扩散的原因之一。
:::
:::

::: exercise 一个短语的字节数 {level=1 check="13"}
字符串 `"naïve 日本"` 有多少个字符、多少个 UTF-8 字节？（输入字节数。）
::: solution
它有 $8$ 个字符：`n`、`a`、`ï`、`v`、`e`、一个空格、`日` 和 `本`。由 [[#def-utf8]]，五个 ASCII 字符（`n`、`a`、`v`、`e` 和空格）各占一个字节，`ï`（$\text{0xEF}$）占两个，两个汉字（$\text{0x65E5}$ 和 $\text{0x672C}$）各占三个，共 $5 + 2 + 3 + 3 = 13$ 字节。Python 的结论相同：`len("naïve 日本".encode("utf-8"))` 是 `13`。
:::
:::

::: exercise 统计行、单词和字符 {level=2 check="20"}
编写程序 `wc.py`：对命令行上给出的每个文件（`import sys` 后可从列表 `sys.argv[1:]` 得到），打印它的行数、单词数和字符数；当文件不存在或不是合法的 UTF-8 时，向标准错误 `sys.stderr` 打印一条消息。对下面这个四行的文件，它报告多少个单词？（输入单词数。）

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
            chars += len(line)            # 包含换行符
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

四行分别有 $4$、$6$、$5$、$5$ 个单词，共 $20$ 个；文件含 $119$ 个字符，其中包含四个换行符；Unix 的 `wc` 命令给出同样的三个数。`print(*count(path), path)` 把元组拆散成多个参数。错误消息写到标准错误，这样当程序真正的输出被重定向到文件时，错误不会与之混在一起。
:::
:::

::: exercise 更安全的平均值 {level=2}
编写 `mean_of_file(path)`，返回文件中数字的平均值（每行一个，空行忽略）；若某一行不是数字，或文件根本没有任何数字，则引发带有行号信息的 `ValueError`。它*不*应该捕获哪些异常？
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

处理器把那条没有信息量的 `could not convert string to float` 转换成一条包含文件名和行号的消息（`from None` 会抑制原始异常的显示）。它*不*应该捕获 `FileNotFoundError`、`PermissionError` 或 `UnicodeDecodeError`：这个函数对它们无能为力，而且它们已经精确地描述了问题，所以应当向上传播给能够决定如何处置的调用者。
:::
:::

::: exercise 截断 {level=2}
一个程序为了“检查文件是否可写”而用 `open(path, "w")` 打开文件，然后什么都不写就关闭。文件原来的内容怎么样了？要向一个已存在的日志文件末尾追加行应该用哪个模式？要仅在不存在同名文件时才创建文件又该用哪个？
::: solution
以 `"w"` 打开会立刻把文件**截断**为零长度，所以尽管什么也没写，它原来的内容已经丢失了。要向已有文件末尾追加，用 `"a"`（追加）：需要时创建文件，且绝不截断。要创建新文件但拒绝覆盖已有文件，用 `"x"`：文件已存在时引发 `FileExistsError`——而且这个检查由操作系统在打开文件的过程中完成，所以不存在另一个程序抢先把文件创建的窗口。
:::
:::

::: exercise 原子替换 {level=3}
一个程序保存设置时，以模式 `"w"` 打开 `settings.txt` 并写入新内容。如果程序在中途崩溃或计算机断电，用户可能在该文件里看到什么？然后解释下面的函数为什么避免了这个问题。

```python
import os

def write_atomically(path, text):
    """Replace the file at path with text, so that readers see the old or the new file, never half of one."""
    temp = path + ".tmp"
    with open(temp, "w", encoding="utf-8") as f:
        f.write(text)
        f.flush()
        os.fsync(f.fileno())          # 请求操作系统把数据写入磁盘
    os.replace(temp, path)            # 在 POSIX 系统上是原子重命名
```
::: solution
以 `"w"` 打开会立即截断文件，因此从 `open` 到写完之间的这段时间里，文件只装着新内容的一部分——甚至可能什么都没有——而在那段时间窗口内发生崩溃就把它留在那个状态：旧设置已被毁掉，新设置又不完整。

`write_atomically` 在新内容写完之前根本不碰 `settings.txt`。它把新内容写进一个临时文件，冲刷 Python 的缓冲区（`flush`），并请求操作系统把它自己的缓冲区写入存储设备（`fsync`）。之后 `os.replace` 才把临时文件重命名覆盖旧文件。在 POSIX 系统上，同一文件系统内的重命名是原子的——其他进程打开 `settings.txt` 时看到的要么旧文件要么新文件，绝不会是两者的混合——Python 文档也指出 `os.replace` 成功时在 POSIX 系统上是原子的（在 Windows 上它也能在一次调用内替换文件，尽管保证较弱）。重命名之前崩溃，旧文件完好无损（只留下一个多余的 `.tmp` 文件）；重命名之后崩溃，留下的是新文件。（要完全保证重命名本身也能挺过断电，还需要同步目录，这是 [[operating-systems]] 研究的细节。）
:::
:::

::: exercise UTF-8 的长度 {level=3 check="3"}
证明 UTF-8（[[#def-utf8]]）是**自同步的**：给定合法 UTF-8 字节序列中间的某个位置，只需回退至多 $3$ 个字节、且不查看它们之前的任何内容，就能找到包含该位置的字符的起点。再证明没有哪个字符的编码是另一个字符编码的前缀。（输入可能需要回退的最大字节数。）
::: solution
按起始位对字节分类：`0xxxxxxx` 是单字节字符，`10xxxxxx` 是**续字节**，`110xxxxx`、`1110xxxx`、`11110xxx` 分别是双字节、三字节和四字节字符的**前导字节**。这些类别互不相交，所以任何字节属于哪一类，单看这个字节就能判断。

*同步。* 在合法序列中，每个字符都是一个前导字节（或单字节字符）后面跟 $0$ 到 $3$ 个续字节。因此从任意位置出发，只要当前字节是续字节就一直回退；至多 $3$ 步后到达一个不是续字节的字节，那个字节就是该字符的起点。无需查看更早的字节。

*无前缀性。* 编码的首字节决定其长度（`0xxxxxxx` 为一，`110xxxxx` 为二，如此等等）。若某个编码是另一个编码的真前缀，两者就共享首字节，从而共享长度——矛盾。于是解码器总能判断一个字符在哪里结束、下一个从哪里开始，而搜索某个字符的字节绝不可能匹配到另一个字符的中间。最大的回退步数是 $3$。
:::
:::
