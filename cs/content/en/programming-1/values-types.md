Ask Python to add one tenth to two tenths and it answers, without any hint of embarrassment,

```console
>>> 0.1 + 0.2
0.30000000000000004
```

Ask it whether that sum equals three tenths and it says `False`. Ask it to add `"20"` and `1` and it refuses with a `TypeError`, yet it happily multiplies `"20"` by `3` to give `'202020'`. And `-7 // 2` is `-4`, not the `-3` that a C programmer expects. None of this is a bug in Python. Each answer follows from a precise rule about what kind of **value** is being manipulated and what each **operator** means for values of that kind. A programmer who knows those rules finds these results unsurprising; one who does not will eventually ship a program that miscounts money or crashes on unexpected input.

This chapter sets out the rules for the basic values of Python — integers, floating-point numbers, strings, Booleans and `None` — and for the expressions that combine them: operators, precedence and evaluation order. It ends with variables and assignment, made precise as names bound to values. Everything later in the course is built from these pieces.

## Values and types

Every piece of data a Python program manipulates is a **value**: the number `42`, the text `"hello"`, the truth value `True`. Each value belongs to exactly one **type**, which determines what the value can represent and which operations apply to it.

::: definition Type {#def-type}
A **type** is a set of values together with the operations defined on them. Python reports the type of a value with the built-in function `type`. The basic types are

| type | values | literals (how they are written) |
|---|---|---|
| `int` | the integers, of any size | `0`, `42`, `-7`, `10_000`, `0xff` |
| `float` | floating-point approximations to real numbers | `3.0`, `0.1`, `-2.5e-3`, `1e308` |
| `str` | strings: finite sequences of characters | `"hi"`, `"it's"`, `"line\n"`, `""` |
| `bool` | the two truth values | `True`, `False` |
| `NoneType` | the single value `None`, meaning "no value" | `None` |
:::

A **literal** is the way a value is written directly in source code. The same mathematical number can have several literals (`10000`, `10_000` and `0x2710` are all the integer ten thousand) and the same-looking number can be two different values: `3` is an `int` and `3.0` is a `float`. Python's integers are exact and unbounded — `2 ** 100` is computed exactly — whereas floats have a fixed size and are approximations, as we shall see.

```python
print(type(42), type(3.0), type("hi"), type(True), type(None))
```

```console
$ python3 types.py
<class 'int'> <class 'float'> <class 'str'> <class 'bool'> <class 'NoneType'>
```

Types matter because an operator means different things for different types. `+` adds two numbers but **concatenates** (joins) two strings; `*` multiplies numbers but repeats a string; and an operation that makes no sense for its operand types is refused:

```python
age = "20"          # a string, perhaps typed by a user
print(age + 1)
```

```console
$ python3 concat.py
Traceback (most recent call last):
  File ".../concat.py", line 2, in <module>
    print(age + 1)
          ~~~~^~~
TypeError: can only concatenate str (not "int") to str
```

Python checks types while the program runs (it is **dynamically typed**) and does not silently convert between unrelated types (it is **strongly typed**): it will not guess whether `"20" + 1` should be `21` or `"201"`. To convert, you say so, with the type's name used as a function:

| expression | value | note |
|---|---|---|
| `int("42")` | `42` | parse a string of digits |
| `float("3.5")` | `3.5` | |
| `str(3) + "4"` | `'34'` | number to text |
| `int(3.9)` | `3` | truncates towards zero |
| `int(-3.9)` | `-3` | still towards zero |
| `int("3.5")` | `ValueError` | the string is not an integer literal |

The one family of implicit conversions Python does make is within numbers: in `2 + 0.5` the integer is converted to a float, and the result `2.5` is a float. Booleans count as numbers too (`True + True` is `2`), a historical convenience that is best not relied on.

## Expressions and how they are evaluated

An **expression** is a piece of code that has a value: a literal, a name, a function call, or operators applied to smaller expressions. **Evaluating** an expression means computing its value. Evaluation is defined recursively: to evaluate `a + b`, evaluate `a`, then evaluate `b` (in that order — Python evaluates operands from left to right), then apply `+` to the two results.

When an expression contains several operators, **precedence** decides which applies first, exactly as in algebra, where $2 + 3 \times 4 = 14$ because multiplication binds more tightly than addition. Python's arithmetic and logical operators, from highest precedence to lowest:

| precedence | operators | meaning |
|---|---|---|
| highest | `**` | exponentiation (groups from the *right*) |
| | `+x`, `-x` | unary plus and minus |
| | `*`, `/`, `//`, `%` | multiplication, true division, floor division, remainder |
| | `+`, `-` | addition, subtraction |
| | `<`, `<=`, `>`, `>=`, `==`, `!=`, `in`, `is` | comparisons |
| | `not` | logical negation |
| | `and` | logical and |
| lowest | `or` | logical or |

Operators of equal precedence group from left to right (`10 - 3 - 2` is `(10 - 3) - 2 = 5`), except `**`, which groups from the right: `2 ** 3 ** 2` is `2 ** 9 = 512`, matching the mathematical convention $2^{3^2} = 2^9$. Because `**` binds more tightly than unary minus, `-2 ** 2` is `-(2 ** 2) = -4`. When in doubt, add parentheses: they cost nothing and they make intent visible to the next reader.

::: example Evaluating step by step {#ex-precedence}
Evaluate `17 // 5 * 2 + 3 ** 2 % 4`, showing each step.
::: solution
The highest-precedence operator is `**`, so first $3^2 = 9$:

`17 // 5 * 2 + 9 % 4`

Next come `//`, `*` and `%`, which share a level and group left to right. Reading from the left: `17 // 5` is `3`; then `3 * 2` is `6`; separately, on the other side of the lower-precedence `+`, `9 % 4` is `1`:

`6 + 1`

Finally `+` gives `7`. Fully parenthesised, the expression is `((17 // 5) * 2) + ((3 ** 2) % 4)`. Python agrees: `17 // 5 * 2 + 3 ** 2 % 4` evaluates to `7`.
:::
:::

### Integer division and remainder

Dividing integers gives two natural results, a quotient and a remainder. Python's `/` always performs **true division**, producing a float even when the division is exact (`10 / 5` is `2.0`). The operators `//` and `%` give an integer quotient and remainder, and their definition for negative numbers is worth knowing exactly.

::: definition Floor division and remainder {#def-floordiv}
For integers $a$ and $b \neq 0$, Python defines

$$
a \mathbin{/\!/} b = \left\lfloor \frac{a}{b} \right\rfloor, \qquad a \mathbin{\%} b = a - b\,(a \mathbin{/\!/} b),
$$

where $\lfloor x\rfloor$, the **floor** of $x$, is the greatest integer less than or equal to $x$. Division by zero raises `ZeroDivisionError`.
:::

::: theorem The division identity {#thm-division}
For integers $a$ and $b > 0$, Python's operators satisfy

$$
a = b\,(a \mathbin{/\!/} b) + a \mathbin{\%} b \quad\text{and}\quad 0 \le a \mathbin{\%} b < b.
$$
:::

::: proof
The first equation is the definition of `%` rearranged. For the inequality, let $q = \lfloor a/b \rfloor$. By the definition of the floor, $q \le a/b < q + 1$. Multiplying through by $b > 0$ preserves the inequalities: $qb \le a < qb + b$. Subtracting $qb$ gives $0 \le a - qb < b$, and $a - qb = a \mathbin{\%} b$.
:::

So for a positive divisor the remainder is always between $0$ and $b - 1$, *whatever the sign of $a$*. This is the convention of mathematics (and of the `mod` in [Maths Atlas: congruences](/learn/maths/lesson.php?c=number-theory&l=congruences)), and it is what makes `%` useful for "wrapping around": `(day + 3) % 7` gives a day of the week from $0$ to $6$ even when `day + 3` is negative. (For $b < 0$ the remainder lies in $b < r \le 0$, by the same argument with the inequalities reversed.)

::: example Negative operands {#ex-negative}
Compute `-7 // 2`, `-7 % 2`, `-17 // 5` and `-17 % 5`, and check the division identity.
::: solution
$-7/2 = -3.5$ and $\lfloor -3.5\rfloor = -4$ (the floor goes *down*, towards $-\infty$), so `-7 // 2` is `-4`, and `-7 % 2` is $-7 - 2\cdot(-4) = 1$. Check: $2 \cdot (-4) + 1 = -7$, and $0 \le 1 < 2$.

$-17/5 = -3.4$, whose floor is $-4$, so `-17 // 5` is `-4` and `-17 % 5` is $-17 - 5\cdot(-4) = 3$. Check: $5 \cdot (-4) + 3 = -17$.
:::
:::

::: warning Languages disagree about negative division
Not every language uses the floor. C, C++, Java and JavaScript **truncate** integer division towards zero, and their remainder takes the sign of the dividend. Compiled with `gcc -std=c17`, this C program

```c
#include <stdio.h>

int main(void) {
    printf("%d %d\n", -7 / 2, -7 % 2);   /* C truncates towards zero */
    printf("%d %d\n", 7 / 2, 7 % 2);
    return 0;
}
```

prints `-3 -1` and then `3 1`, whereas Python's `-7 // 2, -7 % 2` gives `-4 1`. Both conventions satisfy $a = bq + r$; they differ in which $q$ they choose. For non-negative operands they agree. When you translate code between languages, check every division that might see a negative number.
:::

The pair `//` and `%` is the standard tool for splitting a quantity into units, and Python's built-in `divmod(a, b)` returns both at once as the pair `(a // b, a % b)`.

::: example Seconds to hours, minutes and seconds {#ex-hms}
Write a program that converts `10_000` seconds into hours, minutes and seconds, and prints it as `h:mm:ss`.
::: solution
```python
seconds = 10_000
hours = seconds // 3600
minutes = seconds % 3600 // 60
secs = seconds % 60
print(hours, minutes, secs)
print(f"{hours}:{minutes:02d}:{secs:02d}")
```

```console
$ python3 hms.py
2 46 40
2:46:40
```

There are $3600$ seconds in an hour, so `seconds // 3600` is the number of whole hours, $2$. The leftover `seconds % 3600` is $2800$ seconds, and `2800 // 60` is $46$ whole minutes. The final seconds are `seconds % 60` $= 40$ (taking the remainder on division by $60$ directly works because $3600$ is a multiple of $60$). Check: $2\cdot3600 + 46\cdot 60 + 40 = 10000$.

The string `f"{hours}:{minutes:02d}:{secs:02d}"` is an **f-string** (formatted string literal): each `{…}` is replaced by the value of the expression inside, and `:02d` formats an integer in at least two digits, padding with zeros.
:::
:::

## Floating-point numbers

Integers are exact, but most real numbers cannot be stored exactly in a finite amount of memory. Python's `float` uses the format defined by the IEEE 754 standard for **double precision** (also called binary64), which essentially every processor in use today implements in hardware.

::: definition Binary floating-point number {#def-float}
A **binary floating-point number** with precision $p$ has the form

$$
\pm\, (1.b_1 b_2 \ldots b_{p-1})_2 \times 2^{e},
$$

a binary **significand** with $p$ significant bits, multiplied by a power of two whose **exponent** $e$ lies in a fixed range. IEEE 754 double precision has $p = 53$ and $-1022 \le e \le 1023$, stored in 64 bits (1 sign bit, 11 exponent bits, 52 fraction bits; the leading $1$ is implicit), plus special values: $\pm 0$, $\pm\infty$ (`inf`), "not a number" (`nan`) and very small **subnormal** numbers.
:::

Because the significand has 53 bits, doubles carry about 15 to 17 significant decimal digits. The largest double is about $1.8 \times 10^{308}$ (Python's `1e308 * 10` gives `inf`), and the gap between $1$ and the next double is $2^{-52} \approx 2.22 \times 10^{-16}$, called **machine epsilon**. The standard also fixes how arithmetic behaves: the result of each `+`, `-`, `*`, `/` and square root is the exact mathematical result **rounded to the nearest** representable double (ties to the one with even last bit). Each single operation is therefore as accurate as it can be; errors arise because the *inputs* may already be rounded and because rounding errors accumulate over many operations.

The famous `0.1 + 0.2` result comes from the inputs. Decimal fractions such as $0.1$ are usually not representable at all.

::: proposition One tenth is not a binary fraction {#prop-tenth}
There are no integers $m$ and $k \ge 0$ with $\dfrac{1}{10} = \dfrac{m}{2^k}$. Consequently $0.1$ has no finite binary expansion, and the literal `0.1` denotes a double that is close to, but not equal to, $1/10$.
:::

::: proof
A finite binary expansion $0.b_1b_2\ldots b_k$ equals $m/2^k$ for the integer $m = (b_1 b_2 \ldots b_k)_2$, so it suffices to rule out $1/10 = m/2^k$. If it held, then $2^k = 10m = 2 \cdot 5 \cdot m$, so $5$ would divide $2^k$. But the only prime factor of $2^k$ is $2$, and prime factorisation is unique; contradiction.
:::

The same argument shows that a fraction in lowest terms has a finite binary expansion exactly when its denominator is a power of two: $0.5$, $0.25$ and $0.375 = 3/8$ are exact; $0.1$, $0.2$ and $1/3$ are not. Python prints the *shortest* decimal string that rounds back to the stored double, which is why `0.1` is displayed as `0.1` even though the stored value is

$$
0.1000000000000000055511151231257827021181583404541015625,
$$

as `decimal.Decimal(0.1)` reveals. The doubles nearest to $0.1$ and $0.2$ are both slightly too large; their exact sum, rounded to a double, is the double just *above* the one nearest $0.3$, and the shortest string identifying that double is `0.30000000000000004`.

::: widget floatline
p: 4
emin: -1
emax: 2
value: 1.1
caption: A toy binary floating-point system with only $p = 4$ significant bits and exponents from $-1$ to $2$, drawn on a number line. Notice that the representable numbers are evenly spaced between consecutive powers of two and that the gap doubles at each power of two: floats are dense near zero and sparse far from it. Type another value for $x$ and watch it snap to the nearest representable number; in the normal range the relative rounding error never exceeds half of machine epsilon. Double precision is the same picture with $p = 53$.
:::

::: example Accumulating error {#ex-accumulate}
What does this program print, and why?

```python
total = 0.0
count = 0
while count < 10:
    total = total + 0.1
    count = count + 1
print(total)
print(total == 1.0)
```
::: solution
```console
$ python3 tenth.py
0.9999999999999999
False
```

Each of the ten additions rounds its result to the nearest double, and the stored `0.1` is itself slightly wrong. The errors do not cancel exactly, and after ten additions the total is the double just below $1$. A loop that waits for `total == 1.0` would therefore never stop. The fix is never to test floats for exact equality: compare with a tolerance, as in `abs(total - 1.0) < 1e-9` or the standard library's `math.isclose(total, 1.0)`, or avoid floats altogether by counting in integers (ten steps of one tenth is better written as `count / 10`).
:::
:::

::: warning Floats are not for money
Because decimal fractions are generally not representable, amounts of money should not be stored as floats: `round(2.675, 2)` gives `2.67`, not `2.68`, because the double nearest $2.675$ is slightly *below* it. Store money as an integer number of the smallest unit (pence, cents), or use the standard module `decimal`, which does exact decimal arithmetic. Note also that `round` rounds exact ties to the even neighbour — `round(2.5)` is `2` and `round(3.5)` is `4` — the "banker's rounding" required by IEEE 754 for its default mode.
:::

::: quiz
Which of these comparisons evaluate to `True` in Python?
- [x] `0.5 + 0.25 == 0.75`
- [ ] `0.1 + 0.2 == 0.3`
- [x] `abs((0.1 + 0.2) - 0.3) < 1e-9`
- [x] `2 ** 53 + 1 == 9007199254740993`
::: solution
$0.5$, $0.25$ and $0.75$ have denominators that are powers of two, so all three are exact doubles and the sum is computed exactly. `0.1 + 0.2` is `0.30000000000000004`, not the double nearest $0.3$, but their difference ($5.55\times10^{-17}$) is far below $10^{-9}$. The last line is integer arithmetic, which is exact at any size; only the *float* `9007199254740993.0` would be rounded (to `9007199254740992.0`).
:::
:::

## Strings, Booleans and None

A **string** (`str`) is a sequence of characters, written between matching single or double quotes. Inside a literal, the backslash introduces an **escape sequence**: `"\n"` is a newline, `"\t"` a tab, `"\""` a double quote and `"\\"` a backslash. Strings support concatenation (`"Ada" + " " + "Lovelace"`), repetition (`"ab" * 3` is `'ababab'`), the length function (`len("hello")` is `5`) and many **methods** — functions attached to the value and called with a dot, such as `"snake_case".upper()`, which gives `'SNAKE_CASE'`. Strings are studied properly in [[programming-1/sequences]].

The type `bool` has two values, `True` and `False`. Comparisons produce Booleans: `3 < 5` is `True`, `"apple" == "Apple"` is `False` (comparison is case-sensitive), and `!=` means "not equal". Python allows comparisons to be **chained** as in mathematics: `1 < x < 10` means `1 < x and x < 10`. The equality test is `==`; a single `=` is assignment, and writing one where you meant the other is a classic error that Python usually rejects as a syntax error.

The logical operators `not`, `and` and `or` combine Booleans. Their precedence (`not` before `and` before `or`) matters exactly as arithmetic precedence does.

::: widget truthtable
formula: p | (q & r)
compare: (p | q) & r
caption: How Python reads `p or q and r`. Because `and` binds more tightly than `or`, it means `p or (q and r)` — the first formula — not `(p or q) and r`. The table shows they differ on two rows (try $p$ true and $r$ false). Change the second formula to `p | q & r` and confirm it now matches the first.
:::

Python's `and` and `or` have two further properties that are used constantly.

::: definition Short-circuit evaluation and truthiness {#def-short-circuit}
Every value has a **truth value**: `False`, `None`, the number zero (`0`, `0.0`) and empty collections (`""`, `[]`, `{}`) are **falsy**; every other value is **truthy**. Then

- `x and y` evaluates `x`; if `x` is falsy the result is `x` and `y` is **not evaluated**; otherwise the result is `y`;
- `x or y` evaluates `x`; if `x` is truthy the result is `x` and `y` is not evaluated; otherwise the result is `y`;
- `not x` is `True` if `x` is falsy and `False` otherwise.
:::

For Boolean operands these rules reproduce ordinary logic. The short circuit — not evaluating the second operand when the first decides the answer — lets the first operand protect the second: `count != 0 and total / count > 10` never divides by zero, because when `count` is `0` the division is skipped. The truthiness rules make `name or "anonymous"` a common idiom for a default value when `name` might be the empty string.

::: example Short circuits {#ex-short-circuit}
Give the value of each expression: `0 or "default"`, `5 and 0`, `"" or "default"`, `not 3 or 0`, and `False and 1 / 0`.
::: solution
- `0 or "default"`: `0` is falsy, so the result is the second operand, `'default'`.
- `5 and 0`: `5` is truthy, so the result is the second operand, `0`.
- `"" or "default"`: the empty string is falsy, so `'default'`.
- `not 3 or 0`: `not` binds more tightly, so this is `(not 3) or 0`; `not 3` is `False`, which is falsy, so the result is `0`.
- `False and 1 / 0`: `False` is falsy, so the result is `False` and `1 / 0` is never evaluated — no `ZeroDivisionError`.

Note that `and` and `or` return one of their *operands*, not necessarily `True` or `False`.
:::
:::

Finally, `None` is the single value of type `NoneType`, used to mean "nothing here": a function that does not explicitly return a value returns `None`, and a variable can be set to `None` to mean "not yet known". Test for it with `x is None` rather than `x == None`; the operator `is` asks whether two names refer to the *same object*, and there is only one `None`.

## Variables and assignment

We have used variables informally since the first chapter. Now we can say precisely what they are.

::: definition Variable and assignment {#def-variable}
A **variable** is a name that refers to (is **bound** to) a value. The **assignment statement** `name = expression` evaluates the expression, then binds the name to the resulting value, replacing any previous binding. A name that has never been bound cannot be used; evaluating it raises `NameError`.
:::

A useful picture is a **name tag** tied to a value, rather than a box containing it. After

```python
a = 10
b = a
a = a + 1
print(a, b)
```

the program prints `11 10`. The second line ties the tag `b` to the same value that `a` is tied to, namely `10`. The third line computes a *new* value, `11`, and moves the tag `a` to it; `b` is unaffected. With numbers and strings the box picture and the tag picture predict the same behaviour, because such values cannot be changed in place. With lists they do not, and the difference — called **aliasing** — is one of the central topics of [[programming-1/sequences]].

Because names are bound to values, not declared with types, the same name can refer to an `int` at one moment and a `str` the next. This flexibility is convenient but means that a misspelt name or an unexpected type is discovered only when the line runs.

**Names** consist of letters, digits and underscores, do not start with a digit, and are case-sensitive (`total` and `Total` are different). The 35 **keywords** of Python 3.14, such as `if`, `while`, `def`, `True` and `None`, cannot be used as names. By convention, variable names are lower case with underscores (`interest_rate`), and a good name says what the value *means*, not what type it has: `seconds_remaining` is better than `n` or `int_value`.

**Augmented assignment** abbreviates the common pattern of updating a variable from its old value: `x += 3` means `x = x + 3`, and likewise `-=`, `*=`, `/=`, `//=`, `%=` and `**=`. After `x = 5`, `x += 3`, `x *= 2`, the value of `x` is $16$.

### Reading input

A program becomes useful when it works on data supplied at run time. The built-in `input(prompt)` prints the prompt, waits for the user to type a line, and returns that line **as a string** — always a string, even if the user typed digits. Converting it is the programmer's job:

```python
celsius = float(input("Temperature in Celsius: "))
print(f"{celsius} °C is {celsius * 9 / 5 + 32} °F")
```

```console
$ python3 convert.py
Temperature in Celsius: 21.5
21.5 °C is 70.7 °F
```

If the user types something that is not a number, `float` raises `ValueError` and the program stops; [[programming-1/files-exceptions]] shows how to handle that gracefully.

::: history
The idea of a data type has two roots. Mathematicians such as Bertrand Russell introduced types into logic in the early twentieth century to avoid paradoxes, and Alonzo Church's simply typed λ-calculus (1940) gave each term a type. In programming, FORTRAN (1957) distinguished integer from real (floating-point) variables, and ALGOL 60 (1960) made declared types and precise syntax central to language design. Floating-point arithmetic was implemented differently by almost every manufacturer until the IEEE 754 standard of 1985, developed by a committee in which William Kahan was the leading figure; Kahan received the 1989 Turing Award for this work on numerical computation. The standard was revised in 2008 and 2019.
:::

## Where this leads

With values, operators and variables in hand, the next step is to make programs that decide and repeat: [[programming-1/control-flow]] introduces `if`, `while` and `for`, all of which are driven by the Boolean expressions of this chapter. Strings are developed fully in [[programming-1/sequences]]. The representation of integers and floats as bit patterns in memory — two's complement, overflow in fixed-size integers, the exact layout of a double — belongs to [[computer-systems]], and the analysis of rounding error in long computations to numerical analysis ([Maths Atlas: floating-point arithmetic](/learn/maths/lesson.php?c=numerical-analysis&l=floating-point)).

::: summary
- Every value has a **type** that fixes what it represents and what operators mean for it; the basic types are `int`, `float`, `str`, `bool` and `NoneType`. Python is dynamically and strongly typed: convert explicitly with `int()`, `float()` and `str()`.
- Expressions are evaluated recursively, operands left to right, with **precedence** deciding grouping; `**` groups from the right and binds more tightly than unary minus. Use parentheses when in doubt.
- `/` is true division (always a float); `//` is floor division and `%` the matching remainder, with $0 \le a \mathbin{\%} b < b$ for $b > 0$ ([[#thm-division]]). C and Java truncate instead.
- Floats are IEEE 754 doubles: 53-bit significands, about 16 decimal digits, each operation correctly rounded. Most decimal fractions, including $0.1$, are not representable ([[#prop-tenth]]), so never test floats for exact equality and never store money in floats.
- `and` and `or` **short-circuit** and return one of their operands; every value is truthy or falsy.
- A **variable** is a name bound to a value; assignment evaluates the right-hand side and then rebinds the name. `input()` always returns a string.
:::

## Exercises

::: exercise Precedence {level=1 check="12"}
Evaluate `2 + 3 * 4 // 5 % 3 + 2 ** 3`, showing each step. (Enter the value.)
::: solution
First `**`, the highest precedence: `2 ** 3` is `8`, giving `2 + 3 * 4 // 5 % 3 + 8`. Next `*`, `//` and `%`, which share a level and group from left to right: `3 * 4` is `12`, then `12 // 5` is `2`, then `2 % 3` is `2`, giving `2 + 2 + 8`. Finally the additions, left to right: `12`. Fully parenthesised, the expression is `(2 + (((3 * 4) // 5) % 3)) + (2 ** 3)`.
:::
:::

::: exercise Negative remainders {level=1 check="3"}
Compute `-17 // 5` and `-17 % 5` in Python, and verify the division identity. (Enter the value of `-17 % 5`.)
::: solution
$-17/5 = -3.4$, and the floor of $-3.4$ is $-4$, so `-17 // 5` is `-4`. Then `-17 % 5` $= -17 - 5\cdot(-4) = 3$. Check: $5 \cdot (-4) + 3 = -17$ and $0 \le 3 < 5$, as [[#thm-division]] promises. (In C, `-17 / 5` is `-3` and `-17 % 5` is `-2`.)
:::
:::

::: exercise Types of results {level=1}
Give the value and type of each: `10 / 5`, `10 // 5`, `"1" + "2"`, `3 * "ab"`, `2 ** -1`, `7 > 3 > 1`, `int(-2.7)`.
::: solution
`10 / 5` is `2.0` (`float`: `/` always gives a float). `10 // 5` is `2` (`int`). `"1" + "2"` is `'12'` (`str`, concatenation). `3 * "ab"` is `'ababab'` (`str`). `2 ** -1` is `0.5` (`float`: a negative integer exponent gives a float). `7 > 3 > 1` is `True` (`bool`; it means `7 > 3 and 3 > 1`). `int(-2.7)` is `-2` (`int`; conversion truncates towards zero, unlike `//`, which rounds down).
:::
:::

::: exercise Splitting a duration {level=2 check="3"}
Using `//` and `%`, convert $100{,}000$ seconds into days, hours, minutes and seconds. (Enter the number of hours.)
::: solution
A day has $86400$ seconds: `100000 // 86400` is $1$ day, leaving `100000 % 86400` $= 13600$ seconds. Then `13600 // 3600` is $3$ hours, leaving $13600 - 10800 = 2800$ seconds, which is $46$ minutes ($2760$ s) and $40$ seconds. So $100{,}000$ s is 1 day, 3 hours, 46 minutes and 40 seconds. In Python: `100000 // 86400`, `100000 % 86400 // 3600`, `100000 % 3600 // 60`, `100000 % 60` give `1 3 46 40`.
:::
:::

::: exercise Short-circuit values {level=2}
Give the value of each expression and say which operands are not evaluated: `0 or [] or "x"`, `3 and 4`, `None or 0`, `len("") == 0 or 1 / 0`.
::: solution
- `0 or [] or "x"` groups as `(0 or []) or "x"`. `0` is falsy, so `0 or []` is `[]`; `[]` is falsy, so the result is `'x'`. All three operands are evaluated.
- `3 and 4`: `3` is truthy, so the result is `4`.
- `None or 0`: `None` is falsy, so the result is `0` — falsy too, but `or` returns its last operand without converting it.
- `len("") == 0 or 1 / 0`: the comparison is `True`, so the result is `True` and `1 / 0` is never evaluated.
:::
:::

::: exercise Remainders and sums {level=2}
Prove that for all integers $a$, $b$ and $m > 0$, Python satisfies `(a + b) % m == (a % m + b % m) % m`.
::: hint
By [[#thm-division]], $a = mq_1 + r_1$ and $b = mq_2 + r_2$. Show that two integers with the same remainder on division by $m$ differ by a multiple of $m$, and conversely.
:::
::: solution
First a lemma: for integers $x, y$ and $m > 0$, $x \mathbin{\%} m = y \mathbin{\%} m$ if and only if $m$ divides $x - y$. Indeed, write $x = mq + r$ and $y = mq' + r'$ with $0 \le r, r' < m$. If $r = r'$ then $x - y = m(q - q')$. Conversely, if $m \mid x - y$ then $m$ divides $(x - y) - m(q - q') = r - r'$; but $-m < r - r' < m$, and the only multiple of $m$ in that range is $0$, so $r = r'$.

Now let $r_1 = a \mathbin{\%} m$ and $r_2 = b \mathbin{\%} m$, so $a = mq_1 + r_1$ and $b = mq_2 + r_2$. Then $(a + b) - (r_1 + r_2) = m(q_1 + q_2)$ is a multiple of $m$, so by the lemma $(a+b) \mathbin{\%} m = (r_1 + r_2)\mathbin{\%} m$, which is the claim. The same argument works for products. This is why programs that work "modulo $m$" (clock arithmetic, hash functions, checksums) can reduce intermediate results at every step and keep numbers small.
:::
:::

::: exercise Exact binary fractions {level=2 check="4"}
Which of the decimals $0.5$, $0.25$, $0.1$, $0.75$, $0.2$ and $0.375$ are represented exactly by Python floats? (Enter how many are.)
::: solution
A fraction in lowest terms is a finite binary fraction exactly when its denominator is a power of two (the argument of [[#prop-tenth]] shows the "only if"; the "if" is because $m/2^k$ is written in $k$ binary places). $0.5 = 1/2$, $0.25 = 1/4$, $0.75 = 3/4$ and $0.375 = 3/8$ qualify, and all fit easily in 53 bits; $0.1 = 1/10$ and $0.2 = 1/5$ do not. So four are exact. You can confirm with `(0.375).as_integer_ratio()`, which gives `(3, 8)`, while `(0.1).as_integer_ratio()` gives `(3602879701896397, 36028797018963968)`, a fraction with denominator $2^{55}$ that is close to, but not, $1/10$.
:::
:::

::: exercise The largest safe integer {level=3 check="2^53"}
Show that every integer $n$ with $0 \le n \le 2^{53}$ is exactly representable as an IEEE 754 double, but $2^{53} + 1$ is not. (Enter $2^{53}$, the largest $N$ such that all of $0, 1, \dots, N$ are representable.)
::: solution
Zero is a special value. A positive integer $n < 2^{53}$ has at most 53 binary digits, $n = (1 b_1 \ldots b_{k})_2$ with $k \le 52$, so $n = (1.b_1\ldots b_k)_2 \times 2^{k}$ with a significand of at most 53 bits and exponent $k \le 52$, well inside the range: it is representable. $2^{53} = 1.0 \times 2^{53}$ is representable too. But $2^{53} + 1 = (1\underbrace{0\cdots0}_{52}1)_2$ has 54 significant bits, the first and last both $1$; a 53-bit significand cannot hold it. At exponent $53$ the spacing between consecutive doubles is $2^{53-52} = 2$, so $2^{53}+1$ lies exactly halfway between $2^{53}$ and $2^{53}+2$ and rounds (ties to even) to $2^{53}$. In Python, `float(2**53 + 1)` is `9007199254740992.0`. JavaScript, whose only number type is the double, calls $2^{53} - 1$ `Number.MAX_SAFE_INTEGER`.
:::
:::

::: exercise Formatting money correctly {level=3}
A program stores amounts as integers of pence. Write a function `show_pounds(pence)` that returns, for example, `'£12.34'` for `1234`, `'£0.05'` for `5` and `'-£1.50'` for `-150`. Explain why the obvious `f"£{pence // 100}.{pence % 100:02d}"` is wrong for negative amounts.
::: solution
```python
def show_pounds(pence):
    """Format a whole number of pence as pounds, e.g. -150 -> '-£1.50'."""
    sign = "-" if pence < 0 else ""
    pounds, rest = divmod(abs(pence), 100)   # work with the size, then restore the sign
    return f"{sign}£{pounds}.{rest:02d}"

print(show_pounds(1234))
print(show_pounds(5))
print(show_pounds(-150))
print(-150 // 100, -150 % 100)   # why the naive approach fails
```

```console
$ python3 pence.py
£12.34
£0.05
-£1.50
-2 50
```

With floor division, $-150$ pence splits as $-2$ pounds plus $50$ pence ($-200 + 50 = -150$), which is mathematically correct but would be printed as `£-2.50` — a different amount. Taking the absolute value first, splitting, and then restoring the sign avoids the problem. (The expression `"-" if pence < 0 else ""` is a **conditional expression**, introduced in [[programming-1/control-flow]].)
:::
:::
