A microcontroller rarely works alone. It reads a temperature sensor and an accelerometer, writes to a display, stores data in an external flash chip, talks to a GPS module or a radio, and reports to a host computer or to the other controllers in a car. Each of these links has to carry bits between chips, or between boards, over as few wires as possible — pins and connectors cost money, board area and reliability. Nearly all of them are **serial**: the bits travel one after another on a single data line (or a differential pair), with the timing that tells the receiver where each bit begins either carried on a separate clock wire or recovered from the data itself.

A handful of standard serial interfaces cover almost every case, and every microcontroller has hardware for most of them. The **UART** sends bytes asynchronously over one wire per direction, and is the workhorse of debug consoles, GPS receivers and radio modules. **SPI** is a fast, simple synchronous link from one master to a few peripheral chips. **I²C** connects dozens of slow sensors and configuration chips with just two shared, open-drain wires. **CAN** is a robust multi-master bus for control networks in vehicles and machines, and **USB** connects a device to a host computer. This chapter treats each of them at the level needed to design the hardware and write the driver: frame formats, timing, electrical layer, and the calculations that decide whether a link works — baud-rate error, pull-up resistor values, frame times and bus load. It ends with the software structure common to all of them: interrupt-driven drivers with ring buffers, and DMA.

The theory of digital transmission over noisy channels — line codes, intersymbol interference, error probability — belongs to [[communication-systems/baseband-transmission]]; the interfaces here operate over short distances where the signal-to-noise ratio is high, and their problems are mostly ones of timing and protocol.

## Vocabulary of serial links

::: definition Serial link terminology {#def-serial-terms}
- A link is **synchronous** if a clock signal is sent alongside the data, so that the receiver samples on its edges, and **asynchronous** if each side has its own clock of nominally equal frequency and the receiver resynchronises on transitions in the data.
- It is **simplex** (one direction only), **half-duplex** (both directions, one at a time) or **full-duplex** (both directions at once).
- It is **point-to-point** (two devices) or a **bus** (several devices sharing the wires, which needs **addressing** and, if several can transmit, **arbitration**).
- Signals are **single-ended** (a voltage with respect to ground) or **differential** (the difference between two wires, which rejects common-mode noise and ground offsets).
- The **baud rate** is the number of signalling symbols per second; for all the interfaces in this chapter a symbol is one bit, so the baud rate equals the raw **bit rate**. The **throughput** is the rate of useful data bytes after removing framing and protocol overhead.
:::

| interface | wires | clock | topology | duplex | typical rate | typical use |
|---|---|---|---|---|---|---|
| UART | TX, RX (+ GND) | asynchronous | point-to-point | full | $9.6\,\mathrm{kbit/s}$–$1\,\mathrm{Mbit/s}$ | console, GPS, radio modules |
| SPI | SCK, COPI, CIPO, CS per device | synchronous | one master, few slaves | full | $1$–$50\,\mathrm{Mbit/s}$ | flash memory, displays, ADCs |
| I²C | SCL, SDA | synchronous | multi-drop bus, 7-bit addresses | half | $100\,\mathrm{kbit/s}$–$1\,\mathrm{Mbit/s}$ | sensors, EEPROM, configuration |
| CAN | CANH, CANL | asynchronous | multi-master bus | half | $125\,\mathrm{kbit/s}$–$1\,\mathrm{Mbit/s}$ (CAN FD data phase to several Mbit/s) | vehicles, industrial control |
| USB 2.0 | D+, D− | embedded in data | host and devices (tree) | half | $12\,\mathrm{Mbit/s}$ (full speed), $480\,\mathrm{Mbit/s}$ (high speed) | connection to a computer |

## The UART

A **universal asynchronous receiver/transmitter** (UART) converts bytes to and from a serial bit stream on a single wire per direction. The line idles high. Each character is sent as a **frame**: a **start bit** ($0$), $5$ to $9$ **data bits** sent least significant bit first, an optional **parity bit**, and one or two **stop bits** ($1$). The common format, written **8N1**, has eight data bits, no parity and one stop bit, so each byte costs $10$ bit times.

The receiver's clock is independent of the transmitter's. It waits for the falling edge of a start bit, then samples each following bit near the middle of where it expects that bit to be, by counting its own clock. For this it oversamples the line, typically at $16$ times the baud rate: after detecting the edge it waits $8$ sample clocks to reach the middle of the start bit, checks that the line is still low (rejecting a noise spike), and then takes one sample (or a majority vote of three) every $16$ sample clocks. Because every frame begins with a fresh start edge, timing errors do not accumulate beyond one frame; but within a frame they do, and that sets how accurately the two clocks must agree.

::: theorem UART clock tolerance {#thm-uart-tolerance}
Let a receiver oversample by a factor $k$, detect the start edge within one sample period, and sample each bit at its nominal centre. For a frame in which the last sampled bit (the stop bit) has index $m$ after the start bit's leading edge, sampled nominally $m + \tfrac12$ bit times after it, the frame is received correctly if the relative difference $e$ between the receiver's and transmitter's bit periods satisfies

$$
\abs{e} < \frac{\tfrac12 - \tfrac1k}{m + \tfrac12}.
$$ {#eq-uart-tolerance}

For 8N1 ($m = 9$) and $k = 16$ this is $\abs{e} < 4.6\,\%$, to be shared between the errors of both ends.
:::

::: proof
Measure time from the true start edge in transmitter bit periods $T$. The receiver detects the edge after a delay $\delta$ with $0 \le \delta < T/k$ (it samples the line only once per $T/k$), and samples the stop bit at $\delta + (m + \tfrac12)T(1 + e)$, where $T(1+e)$ is its own bit period. The stop bit occupies $[mT, (m+1)T)$, so we need

$$
mT \le \delta + \left(m + \tfrac12\right)T(1+e) < (m+1)T.
$$

The upper limit is hardest to meet with the largest delay $\delta \to T/k$: $(m + \tfrac12)e < \tfrac12 - \tfrac1k$. The lower limit is hardest with $\delta = 0$: $(m + \tfrac12)e \ge -\tfrac12$, a weaker condition. Requiring the stricter bound in both directions gives [[#eq-uart-tolerance]]. Every earlier bit is sampled with a smaller accumulated error, so if the stop bit is sampled correctly, so is every other bit.
:::

In practice the budget is smaller than $4.6\,\%$: the edges are not perfectly sharp, the receiver's majority-vote samples spread over part of the bit, and the line driver and cable distort the duty cycle. Data sheets typically quote a total tolerance of roughly $3$–$4\,\%$ for $16\times$ oversampling, and a rule of thumb is to keep each end within $\pm 2\,\%$ — comfortable for crystals, adequate for a factory-trimmed RC oscillator at room temperature, and marginal for an untrimmed one.

### Baud-rate generation

The UART divides its peripheral clock to make the sample clock. With $16\times$ oversampling and an integer divisor $d$, the baud rate is $f_\text{clk}/(16d)$; the nearest integer $d$ to $f_\text{clk}/(16\,B)$ is chosen, and the resulting error must be checked.

::: example Baud-rate error {#ex-baud-error}
(a) An 8-bit microcontroller with a $16\,\mathrm{MHz}$ crystal has a UART baud rate of $f_\text{clk}/(16(\text{UBRR}+1))$. Can it run at $115\,200$ baud? (b) The same UART has a double-speed mode with $8\times$ oversampling, baud rate $f_\text{clk}/(8(\text{UBRR}+1))$. (c) A $32$-bit microcontroller's UART divides its $84\,\mathrm{MHz}$ clock by $16\cdot\text{USARTDIV}$, where USARTDIV has $4$ fractional bits. Find the baud-rate error at $115\,200$ baud.
::: solution
(a) $16\times 10^6/(16\times 115\,200) = 8.68$, so $\text{UBRR}+1 = 9$ and the actual rate is $16\times 10^6/144 = 111\,111$ baud, an error of $-3.5\,\%$. That exceeds the $\pm 2\,\%$ rule and, combined with any error at the other end, will produce corrupted characters — a well-known trap on boards with $16\,\mathrm{MHz}$ crystals.

(b) $16\times 10^6/(8\times 115\,200) = 17.4$, so $\text{UBRR}+1 = 17$ gives $16\times 10^6/136 = 117\,647$ baud, $+2.1\,\%$. Better, but with only $8$ samples per bit the tolerance of [[#eq-uart-tolerance]] shrinks to $(\tfrac12 - \tfrac18)/9.5 = 3.9\,\%$. Boards meant for fast serial links use a "baud-rate crystal" such as $14.7456\,\mathrm{MHz} = 128\times 115\,200$, which divides exactly.

(c) $\text{USARTDIV} = 84\times 10^6/(16\times 115\,200) = 45.573$. With $4$ fractional bits the closest value is $45 + 9/16 = 45.5625$ (since $0.573\times 16 = 9.17$), and the actual rate is $84\times 10^6/(16\times 45.5625) = 115\,226$ baud, an error of $+0.023\,\%$. A fractional divider makes the error negligible at almost any clock.
:::
:::

::: widget plot
f: 100*(x*1e6/(16*max(1, round(x*1e6/(16*B))))/B - 1); 2; -2
x: 1, 64
y: -6, 6
sliders: B=115200:9600:921600:9600
labels: \text{error (\%)}; +2\,\%; -2\,\%
caption: Baud-rate error (%) of a UART with an integer divisor and $16\times$ oversampling, against the peripheral clock (MHz), for a baud rate $B$. At low clocks the divisor is small and the error large; it falls roughly as $1/f$ with spikes where the divisor rounds badly. Find $16\,\mathrm{MHz}$ at $115\,200$ baud ($-3.5\,\%$), then raise $B$ to $921\,600$ and see how fast a clock is needed to stay inside $\pm 2\,\%$.
:::

### Electrical layers: TTL, RS-232 and RS-485

Between two chips on one board, UART signals are simply logic levels ("TTL serial", in practice $3.3\,\mathrm{V}$ CMOS). Over cables, a line driver is added. **RS-232** uses inverted, bipolar levels — a logic $1$ is between $-3$ and $-15\,\mathrm{V}$, a $0$ between $+3$ and $+15\,\mathrm{V}$ — and reaches about $15\,\mathrm{m}$ at low rates; it survives on industrial equipment and as the "serial port" of older computers. **RS-485** is differential and multi-drop: up to $32$ unit loads share one twisted pair terminated at both ends with $120\,\Omega$, at up to about $1200\,\mathrm{m}$ at $100\,\mathrm{kbit/s}$ or $10\,\mathrm{Mbit/s}$ over tens of metres; it is half-duplex, so the software must switch the transceiver's driver on to transmit and off to listen, and it underlies industrial protocols such as Modbus RTU and DMX512. Most debugging today goes over a USB-to-UART converter chip, which appears on the host as a virtual serial port.

## SPI

The **serial peripheral interface** (SPI) is a synchronous, full-duplex link between one **master** (controller) and one or more **slaves** (peripherals). It uses four signals: the master's clock **SCK**, data from master to slave (**MOSI**, now often called **COPI** or **SDO** on the master), data from slave to master (**MISO**, **CIPO**, **SDI**), and an active-low **chip select** (CS) per slave. Conceptually the master and the selected slave each contain a shift register, connected in a ring: on each clock cycle one bit leaves each register and enters the other, so after eight cycles they have exchanged a byte. Every transfer is a simultaneous send and receive; to read from a slave, the master sends dummy bytes.

::: definition SPI clock modes {#def-spi-modes}
The **clock polarity** CPOL is the idle level of SCK, and the **clock phase** CPHA selects which edge samples the data: with $\text{CPHA} = 0$ data are sampled on the first (leading) edge after CS falls and changed on the trailing edge; with $\text{CPHA} = 1$ they are changed on the leading edge and sampled on the trailing edge. The four combinations are the SPI **modes**:

| mode | CPOL | CPHA | SCK idle | data sampled on |
|---|---|---|---|---|
| 0 | 0 | 0 | low | rising edge |
| 1 | 0 | 1 | low | falling edge |
| 2 | 1 | 0 | high | falling edge |
| 3 | 1 | 1 | high | rising edge |
:::

Master and slave must use the same mode, and the data sheet of each slave chip states which it supports (modes 0 and 3 are the most common). There is no standard beyond this: word length, bit order (almost always most significant bit first), the meaning of the bytes, and the maximum clock rate are all defined by each slave. There are no acknowledgements and no addresses — the chip-select line is the address — so SPI has almost no overhead, and its speed is limited only by the electrical paths.

::: example How fast can SPI go? {#ex-spi-timing}
A master in mode 0 changes COPI on the falling edge of SCK and samples CIPO on the rising edge. The slave changes CIPO in response to the falling edge with a clock-to-output delay of up to $15\,\mathrm{ns}$; the board traces add $1\,\mathrm{ns}$ in each direction, and the master needs a set-up time of $5\,\mathrm{ns}$ before its sampling edge. What is the maximum SCK frequency (assuming a $50\,\%$ duty cycle)?
::: solution
After the falling edge leaves the master, it takes $1\,\mathrm{ns}$ to reach the slave, the slave's output changes up to $15\,\mathrm{ns}$ later, and the new bit takes $1\,\mathrm{ns}$ to return — $17\,\mathrm{ns}$ — and must then be stable $5\,\mathrm{ns}$ before the rising edge, which comes half a period after the falling edge. So $T/2 \ge 23\,\mathrm{ns}$, $T \ge 46\,\mathrm{ns}$, $f_\text{SCK} \le 21.7\,\mathrm{MHz}$. The round trip through the slave limits SPI, not the outgoing direction; that is why fast flash memories move to "quad SPI" with four data lines and sampling delays that can be tuned, and why long SPI cables do not work at high speed.
:::
:::

::: example Reading an SPI ADC {#ex-spi-adc}
A $24$-bit sigma-delta ADC is read over SPI at $8\,\mathrm{MHz}$: the master lowers CS, clocks $32$ bits (an $8$-bit command and $24$ bits of result) and raises CS. The chip needs CS high for at least $1\,\mathrm{\mu s}$ between reads. (a) How long does one read take? (b) Can the bus sustain $50\,000$ samples per second? (c) What fraction of the processor would an interrupt-per-byte driver cost at $200$ cycles per interrupt on a $100\,\mathrm{MHz}$ core?
::: solution
(a) $32$ bits at $8\,\mathrm{MHz}$ take $4\,\mathrm{\mu s}$, plus $1\,\mathrm{\mu s}$ of CS high: $5\,\mathrm{\mu s}$ per sample.

(b) $50\,000$ samples per second leave $20\,\mathrm{\mu s}$ per sample, of which the bus needs $5$: yes, with the bus $25\,\%$ busy.

(c) Four interrupts per sample at $50\,000$ samples per second is $2\times 10^5$ interrupts per second, $2\times 10^5\times 200/10^8 = 0.4$: forty percent of the processor. Using the SPI peripheral's FIFO, or DMA triggered by the ADC's data-ready signal, would reduce this to one interrupt per block of samples ([[computer-architecture/input-output#prop-iocost]]).
:::
:::

## I²C

The **inter-integrated circuit** bus (I²C, also written IIC) connects many devices with two wires: a clock **SCL** and a bidirectional data line **SDA**. Both are **open-drain** ([[embedded-systems/microcontrollers#def-gpio]]): devices can only pull a line low, and a pull-up resistor per line pulls it high. Every device has an address — usually $7$ bits, fixed by the manufacturer with one or two bits set by pins — and any number of devices can share the bus, limited by the total capacitance.

::: definition I²C transaction {#def-i2c}
A **transaction** is started by the master with a **START** condition (SDA falling while SCL is high) and ended with a **STOP** condition (SDA rising while SCL is high). In between, data change only while SCL is low and are sampled while it is high. Each byte is sent most significant bit first and followed by an **acknowledge** bit, sent by the receiver: $0$ (**ACK**) means the byte was accepted, $1$ (**NACK**) that it was not or that the master wants no more data. The first byte after START contains the $7$-bit address and a direction bit ($0$ = write, $1$ = read). A **repeated START** turns the bus around without releasing it.
:::

A typical register read from a sensor is: START, address + write, ACK; register number, ACK; repeated START, address + read, ACK; data byte(s) from the slave, each acknowledged by the master except the last, which gets a NACK; STOP. Each byte is nine clock cycles, so reading two data bytes takes $5\times 9 = 45$ clock periods plus about three bit times for the START, repeated START and STOP conditions — about $48$ bit times, or $120\,\mathrm{\mu s}$ at $400\,\mathrm{kHz}$.

The open-drain wiring gives I²C two properties for free. A slow slave can hold SCL low after a byte to make the master wait (**clock stretching**). And two masters that start at once can **arbitrate**: each monitors SDA while transmitting, and one that sends a $1$ but sees a $0$ knows that another master is sending, and drops out — the same wired-AND arbitration that CAN uses below.

### Pull-up resistors

The pull-up resistor sets the speed of the bus. When a device releases a line, the line rises through the pull-up charging the total bus capacitance $C_b$ — the pins, the traces and the cable — exponentially with time constant $R_pC_b$. The I²C specification defines the **rise time** $t_r$ between $0.3V_{DD}$ and $0.7V_{DD}$ and limits it: $1000\,\mathrm{ns}$ in standard mode ($100\,\mathrm{kHz}$), $300\,\mathrm{ns}$ in fast mode ($400\,\mathrm{kHz}$) and $120\,\mathrm{ns}$ in fast mode plus ($1\,\mathrm{MHz}$), with a maximum bus capacitance of $400\,\mathrm{pF}$ in the first two modes.

::: proposition Pull-up resistor range {#prop-pullup}
For an open-drain bus with supply $V_{DD}$, bus capacitance $C_b$ and maximum rise time $t_r$ (from $0.3V_{DD}$ to $0.7V_{DD}$), and devices that can sink at most $I_{OL}$ at an output low voltage $V_{OL}$, the pull-up resistance must satisfy

$$
\frac{V_{DD} - V_{OL}}{I_{OL}} \;\le\; R_p \;\le\; \frac{t_r}{\ln(7/3)\,C_b} = \frac{t_r}{0.8473\,C_b}.
$$ {#eq-pullup}
:::

::: proof
*Lower limit.* With the line held low, the pull-up carries $(V_{DD} - V_{OL})/R_p$, which the device must be able to sink while keeping its output at or below $V_{OL}$; hence $(V_{DD} - V_{OL})/R_p \le I_{OL}$.

*Upper limit.* After release the line rises as $v(t) = V_{DD}(1 - e^{-t/R_pC_b})$. It reaches $0.3V_{DD}$ at $t_1 = R_pC_b\ln(1/0.7)$ and $0.7V_{DD}$ at $t_2 = R_pC_b\ln(1/0.3)$, so the rise time is $t_2 - t_1 = R_pC_b\ln(0.7/0.3) = 0.8473\,R_pC_b$. Requiring this to be at most $t_r$ gives the upper limit.
:::

::: example Choosing I²C pull-ups {#ex-i2c-pullup}
A $3.3\,\mathrm{V}$ I²C bus in fast mode ($400\,\mathrm{kHz}$, $t_r \le 300\,\mathrm{ns}$) has $200\,\mathrm{pF}$ of capacitance. Devices sink $3\,\mathrm{mA}$ at $V_{OL} = 0.4\,\mathrm{V}$. Choose the pull-up resistors.
::: solution
By [[#eq-pullup]], $R_p \ge (3.3 - 0.4)/0.003 = 967\,\Omega$ and $R_p \le 300\times 10^{-9}/(0.8473\times 200\times 10^{-12}) = 1770\,\Omega$. A standard $1.5\,\mathrm{k\Omega}$ resistor lies in the range, giving a rise time of $0.8473\times 1500\times 200\times 10^{-12} = 254\,\mathrm{ns}$ and a low-level current of $1.9\,\mathrm{mA}$. The microcontroller's internal pull-ups ($30$–$50\,\mathrm{k\Omega}$) would give rise times of several microseconds — too slow even for standard mode at this capacitance, a frequent cause of I²C buses that work only with short wires.
:::
:::

::: widget plot
f: V*(1 - exp(-x/(R*C/1000))); 0.3*V; 0.7*V
x: 0, 2000
y: 0, 3.6
sliders: R=1.5:0.5:10:0.1; C=200:50:400:10; V=3.3:1.8:5:0.1
labels: v_\text{SDA}(t); 0.3\,V_{DD}; 0.7\,V_{DD}
caption: Rising edge of an I²C line (V) against time (ns) after release, for a pull-up of $R$ kΩ and a bus capacitance of $C$ pF. The specification's rise time is the time between the two threshold lines, $0.847RC$. Find the largest $R$ that keeps it under $300\,\mathrm{ns}$ (fast mode) for your $C$, then add capacitance — longer wires, more devices — and see how quickly the margin disappears.
:::

::: warning Address clashes and stuck buses
Seven-bit addresses are assigned by chip manufacturers, so two identical sensors on one bus need different address-select pin settings — and some chips offer none. Use a second I²C port or a bus multiplexer. A more insidious failure: if the master resets in the middle of a read while a slave is driving SDA low, the slave keeps holding it low, waiting for clock pulses that never come, and the bus appears dead. Robust drivers check SDA at start-up and, if it is low, toggle SCL as a GPIO up to nine times until the slave releases it, then send a STOP.
:::

::: quiz
On an I²C bus, two masters start a transaction at the same moment, one addressing device `0x48` and the other `0x50`. What happens?
- [ ] both transactions are corrupted and both masters must retry after a random delay
- [x] the master addressing `0x48` wins arbitration and its transaction proceeds undisturbed; the other master detects the loss and retries later
- [ ] the master addressing `0x50` wins because its address is larger
- [ ] the bus short-circuits because both drive SDA
::: solution
`0x48` $=$ `1001000` and `0x50` $=$ `1010000` agree in the first two bits and differ in the third: `0x48` sends $0$, `0x50` sends $1$. On the wired-AND line the $0$ wins; the master sending $1$ sees $0$, knows it has lost, and stops driving. The winner never notices, so its transaction is not delayed. Open-drain outputs cannot short-circuit.
:::
:::

## CAN

The **Controller Area Network** was designed by Bosch for cars, where tens of electronic control units must exchange short messages reliably in an electrically hostile environment. A CAN bus is a twisted pair, **CANH** and **CANL**, terminated at both ends with $120\,\Omega$. Each node has a CAN controller (a peripheral in the microcontroller) and a transceiver chip that converts logic levels to the differential bus. The bus has two states: **recessive** (both wires near $2.5\,\mathrm{V}$, differential voltage about $0$), which represents logic $1$ and is what the bus shows when nobody drives it; and **dominant** (CANH about $3.5\,\mathrm{V}$, CANL about $1.5\,\mathrm{V}$), logic $0$, which overrides recessive. Electrically the bus is a wired-AND, like I²C, but differential, fast and robust.

CAN is a **multi-master broadcast** bus. Messages carry not a destination address but an **identifier** that says what the message is ("engine speed", "brake pedal position"); every node receives every message and keeps those it needs. Any node may start transmitting when the bus is idle.

::: theorem Non-destructive bitwise arbitration {#thm-can-arbitration}
If several CAN nodes start transmitting frames with distinct identifiers at the same time, then the node whose identifier is numerically **lowest** completes its frame without delay or corruption, and every other node stops transmitting at the first identifier bit where it sends recessive but reads dominant.
:::

::: proof
Identifiers are sent most significant bit first, directly after the common start-of-frame bit, and every transmitter compares each bit it reads from the bus with the bit it sent. As long as all contenders send the same bits, the bus carries exactly those bits and nobody notices anything. At the first bit position where the identifiers differ, the contenders that send $0$ (dominant) override those that send $1$ (recessive); the latter read a $0$ they did not send, recognise that they have lost arbitration, and switch to receiving. The bus has carried precisely the bits of the winners so far, so their frame is undamaged. Repeating the argument among the remaining contenders at each later bit, the survivor after the last identifier bit is the one whose identifier has a $0$ at the first position where it differs from every other — the numerically smallest. Identifiers must be unique, so exactly one survives.
:::

The identifier is therefore also a **priority**, and the worst-case delay of each message can be computed with the response-time analysis of [[embedded-systems/real-time-systems]], which is how automotive networks are verified.

### Frame format and timing

A **classical CAN** data frame with an $11$-bit identifier consists of: a start-of-frame bit; the identifier; the RTR bit; the IDE and reserved bits; a $4$-bit data length code; $0$ to $8$ data bytes; a $15$-bit CRC and a delimiter; an acknowledge slot (any receiver that got the frame correctly drives it dominant) and its delimiter; and $7$ recessive end-of-frame bits, followed by $3$ bits of interframe space. Without data that is $47$ bits.

To keep the receivers' clocks synchronised, the transmitter inserts a complementary **stuff bit** after any five consecutive identical bits, from the start of frame to the end of the CRC; receivers remove them. Stuffing lengthens frames by a data-dependent amount.

::: proposition Worst-case length of a CAN frame {#prop-can-frame}
A classical CAN data frame with an $11$-bit identifier and $n$ data bytes occupies at most

$$
L(n) = 8n + 47 + \left\lfloor \frac{34 + 8n - 1}{4} \right\rfloor \ \text{bit times}
$$ {#eq-can-frame}

on the bus, including the $3$-bit interframe space. For $n = 8$ this is $135$ bits.
:::

::: proof
Without stuffing the frame has $8n + 47$ bits, of which the $34 + 8n$ from start of frame to the end of the CRC are subject to stuffing (the CRC delimiter, acknowledge field, end of frame and interframe space are not). The first stuff bit is needed after $5$ identical bits; each stuff bit is the opposite of the preceding run and can itself begin a new run, so in the worst case every further $4$ bits need another. The number of stuff bits in $g$ stuffable bits is therefore at most $\lfloor (g - 1)/4\rfloor$, giving [[#eq-can-frame]] with $g = 34 + 8n$. For $n = 8$: $64 + 47 + \lfloor 97/4\rfloor = 111 + 24 = 135$.
:::

All nodes must see each bit within the same bit time, including the round trip through the bus for the acknowledge and arbitration mechanisms, so the bit rate limits the bus length: roughly $40\,\mathrm{m}$ at $1\,\mathrm{Mbit/s}$, $100\,\mathrm{m}$ at $500\,\mathrm{kbit/s}$ and $500\,\mathrm{m}$ at $125\,\mathrm{kbit/s}$. **CAN FD** (flexible data rate) relaxes the limit by switching to a faster bit rate (typically $2$–$8\,\mathrm{Mbit/s}$) after arbitration and carries up to $64$ data bytes per frame; as of 2026, CAN FD is standard in new vehicle designs, and **CAN XL**, with payloads up to $2048$ bytes, is in early adoption.

::: example CAN bus load {#ex-can-load}
A $500\,\mathrm{kbit/s}$ CAN bus carries $20$ different messages, each with $8$ data bytes, each sent every $10\,\mathrm{ms}$. Find the worst-case transmission time of one frame and the bus load. What is the longest time a message may have to wait for the bus to become free?
::: solution
By [[#eq-can-frame]] a frame takes at most $135$ bits, $135/500\,000 = 270\,\mathrm{\mu s}$. The load is $20\times 135\,\mathrm{bits}/10\,\mathrm{ms} = 270\,000\,\mathrm{bit/s}$, $54\,\%$ of the bus. A frame that has just started cannot be interrupted, so even the highest-priority message may wait up to one frame time, $270\,\mathrm{\mu s}$, before arbitration; lower-priority messages also wait for all higher-priority ones that are queued. Network designers commonly keep CAN bus loads below about $50$–$70\,\%$ to leave room for retransmissions after errors and for new messages.
:::
:::

CAN's error handling is part of what makes it robust: every node checks the CRC, the bit stuffing and the frame format, and signals any error with an **error frame** (six dominant bits, which violate the stuffing rule and so destroy the frame for everyone); the transmitter then retransmits automatically. Each node keeps error counters, and a node that causes too many errors first stops sending error frames ("error passive") and eventually disconnects itself ("bus off"), so a faulty node cannot block the bus for ever.

## USB

The **Universal Serial Bus** connects devices to a host computer, which controls all traffic: a device transmits only when the host asks it to. USB 2.0, the version built into most microcontrollers, signals differentially on D+ and D− with NRZI encoding and bit stuffing, at **full speed** ($12\,\mathrm{Mbit/s}$) or **high speed** ($480\,\mathrm{Mbit/s}$, usually with an external or integrated high-speed PHY). Data are exchanged through **endpoints** using four transfer types — control, bulk, interrupt and isochronous — and a device describes itself to the host with **descriptors** that declare its **class**: a virtual serial port (CDC), a keyboard or other human-interface device (HID), a mass-storage device, an audio device. A class the host already supports needs no driver installation.

For the hardware designer the key constraint is timing: a full-speed device's bit rate must be within $\pm 0.25\,\%$, which rules out an untrimmed RC oscillator; parts with "crystal-less USB" trim their internal oscillator continuously against the start-of-frame packets that the host sends every millisecond. For the software, USB is far more complex than the other interfaces here — enumeration, descriptors, class protocols — and is almost always handled by a USB stack library rather than written from scratch.

## Drivers: polling, interrupts and DMA

All of these peripherals present the same software problem: bytes arrive or must be sent at a rate set by the link, while the program is busy with other things. The three mechanisms of [[computer-architecture/input-output]] apply directly. **Polling** a UART status register works for a simple debug print but wastes the processor and, on reception, loses bytes whenever the program looks away for longer than the peripheral's buffer can hold — sometimes a single byte, $87\,\mathrm{\mu s}$ at $115\,200$ baud. The standard structure is an **interrupt-driven driver with ring buffers**: the receive interrupt moves each byte into a buffer, from which the application reads at its own pace; the application writes into a transmit buffer, and the transmit interrupt feeds the peripheral.

::: definition Ring buffer {#def-ring-buffer}
A **ring buffer** (circular FIFO) of capacity $N$ is an array with a **head** index, where the producer writes, and a **tail** index, where the consumer reads; both advance modulo $N$. With $N$ a power of two and **free-running** unsigned indices (incremented without wrapping and reduced with a mask only when indexing the array), the number of stored elements is `head - tail` in unsigned arithmetic, the buffer is empty when this is $0$ and full when it is $N$.
:::

The free-running form is correct by the same argument as [[embedded-systems/timers-interrupts#thm-wrap]]: the difference of two unsigned counters is their true difference modulo $2^w$, and it never exceeds $N \le 2^w$.

```c
#define RB_SIZE 64u                        /* power of two */
typedef struct {
    volatile uint32_t head, tail;          /* free-running indices */
    uint8_t buf[RB_SIZE];
} ringbuf_t;

static bool rb_put(ringbuf_t *rb, uint8_t c)    /* producer: e.g. the RX interrupt */
{
    if (rb->head - rb->tail == RB_SIZE) return false;   /* full: byte dropped */
    rb->buf[rb->head & (RB_SIZE - 1u)] = c;
    rb->head++;                                         /* publish after writing */
    return true;
}

static bool rb_get(ringbuf_t *rb, uint8_t *c)   /* consumer: the main program */
{
    if (rb->head == rb->tail) return false;             /* empty */
    *c = rb->buf[rb->tail & (RB_SIZE - 1u)];
    rb->tail++;
    return true;
}
```

With exactly one producer and one consumer, on a single core where aligned $32$-bit loads and stores are atomic, this buffer needs no critical section: only the producer writes `head`, only the consumer writes `tail`, and each updates its index only after the data are in place. (On a core with a data cache or out-of-order memory accesses, or between two cores, memory barriers or C11 atomics with release and acquire ordering are needed to keep the data write ahead of the index update.)

::: example Sizing a receive buffer {#ex-buffer-size}
A GPS module sends bursts of up to $500$ bytes once per second at $115\,200$ baud (8N1). The main loop empties the receive buffer every iteration, but an iteration can take up to $5\,\mathrm{ms}$, and once a second a flash write blocks the loop for $30\,\mathrm{ms}$. What buffer size is needed? Would DMA help?
::: solution
At $115\,200$ baud, 8N1, bytes arrive at $11\,520$ per second, one every $86.8\,\mathrm{\mu s}$. In $5\,\mathrm{ms}$, $57.6$ bytes arrive, so a normal iteration needs $58$ bytes of buffering. During the $30\,\mathrm{ms}$ flash write, $346$ bytes can arrive if it coincides with a burst. A $512$-byte buffer (the next power of two) covers the worst case with margin. Whether $512$ bytes of RAM is affordable is a design question — the alternative is to schedule the flash write between bursts.

DMA does not remove the need for the buffer, but it removes the per-byte interrupts ($11\,520$ per second during a burst). A common arrangement is a circular DMA transfer into the ring buffer, with the UART's **idle-line** interrupt (raised when the line has been idle for one frame time) telling the software that a burst has ended; the head index is then read from the DMA controller's remaining-count register.
:::
:::

::: application Choosing an interface
A designer connecting a microcontroller to a new peripheral usually has little choice: the peripheral chip offers SPI, I²C or both, and the decision follows from the system. SPI is chosen for speed (displays, flash, fast ADCs) and simplicity of timing; I²C for many slow devices on few pins (sensors, power-management and configuration chips), accepting its lower speed and its pull-up and bus-lock pitfalls; a UART for modules with their own processor (GPS, cellular and Bluetooth modules) and for consoles; CAN or RS-485 for anything that leaves the board through a cable into an electrically noisy environment; USB for a connection to a computer. Many sensors now offer an I3C interface, a faster and backward-compatible successor to I²C with in-band interrupts.
:::

::: history
The word *baud* honours Émile Baudot, whose printing telegraph code of the 1870s was the ancestor of serial character codes. The EIA's RS-232 standard (1960) defined the voltage levels for connecting terminals and modems, and integrated UARTs such as Western Digital's WD1402A in the early 1970s made asynchronous serial ports cheap. Motorola introduced SPI with its 68HC11 family of microcontrollers in the mid-1980s; Philips developed I²C in 1982 to connect the chips inside television sets; Bosch presented CAN at the SAE congress in 1986, and the Mercedes-Benz S-Class of 1991 was among the first production cars with a CAN network. USB 1.0 was released in January 1996 by a consortium of computer and chip companies, and USB 2.0, with its $480\,\mathrm{Mbit/s}$ high speed, in 2000.
:::

## Where this leads

The drivers of this chapter are the lowest layer of the communication stack in a product. [[embedded-systems/real-time-systems]] shows how they hand data to RTOS tasks through queues, and analyses message delays on a CAN bus with the same response-time methods as task scheduling. [[embedded-systems/embedded-system-design]] covers the reliability side — CRCs, timeouts, recovery from stuck buses — and testing drivers without hardware. The signal-integrity and noise problems that set the limits of these links at speed are the subject of [[instrumentation/electromagnetic-compatibility]] and, for transmission-line effects, [[electromagnetics]].

::: summary
- Serial links ([[#def-serial-terms]]) are synchronous or asynchronous, simplex or duplex, point-to-point or bus, single-ended or differential; for UART, SPI, I²C and CAN the baud rate equals the bit rate.
- A UART frame is a start bit, $5$–$9$ data bits LSB first, optional parity and stop bits; with $16\times$ oversampling an 8N1 frame tolerates a total clock mismatch below $4.6\,\%$ in theory and about $\pm 2\,\%$ per end in practice ([[#thm-uart-tolerance]]). Always compute the baud-rate error.
- SPI ([[#def-spi-modes]]) is a full-duplex shift-register exchange with chip selects and four clock modes; its speed is limited by the round trip through the slave.
- I²C ([[#def-i2c]]) uses two open-drain lines with START/STOP, addresses and ACK bits; pull-ups must satisfy $(V_{DD} - V_{OL})/I_{OL} \le R_p \le t_r/(0.8473C_b)$ ([[#prop-pullup]]).
- CAN is a differential multi-master bus whose wired-AND bitwise arbitration lets the lowest identifier win without collision ([[#thm-can-arbitration]]); a classical frame with $n$ bytes takes at most $8n + 47 + \lfloor(33 + 8n)/4\rfloor$ bits ([[#prop-can-frame]]).
- USB is host-controlled with strict timing ($\pm 0.25\,\%$ at full speed) and is normally driven by a library stack.
- Interrupt-driven drivers with power-of-two ring buffers ([[#def-ring-buffer]]) decouple the link from the program; size buffers for the longest time the consumer can be away, and use DMA to remove per-byte interrupts.
:::

## Exercises

::: exercise UART throughput {level=1 check="960"}
How many bytes per second can a UART send at $9600$ baud with the 8N1 format? How long does one byte take?
::: solution
Each byte costs $10$ bit times, so $9600/10 = 960$ bytes per second, $1.04\,\mathrm{ms}$ per byte.
:::
:::

::: exercise SPI transfer time {level=1 check="32e-6"}
How long, in seconds, does it take to transfer $32$ bytes over SPI with an $8\,\mathrm{MHz}$ clock, ignoring chip-select overhead?
::: solution
$32\times 8 = 256$ bits at $8\times 10^6$ bits per second: $32\,\mathrm{\mu s}$.
:::
:::

::: exercise Minimum pull-up {level=1 check="(5-0.4)/3e-3"}
A $5\,\mathrm{V}$ I²C bus has devices that sink $3\,\mathrm{mA}$ at $V_{OL} = 0.4\,\mathrm{V}$. What is the smallest permissible pull-up resistance, in ohms?
::: solution
By [[#eq-pullup]], $R_p \ge (5 - 0.4)/0.003 = 1533\,\Omega$; the next standard value up is $1.6\,\mathrm{k\Omega}$ (E24) or $1.8\,\mathrm{k\Omega}$ (E12).
:::
:::

::: exercise A baud divisor {level=2 check="100*(48e6/(16*313)/9600 - 1)"}
A UART with $16\times$ oversampling and an integer divisor is clocked at $48\,\mathrm{MHz}$. Which divisor is best for $9600$ baud, and what is the baud-rate error in percent?
::: solution
$48\times 10^6/(16\times 9600) = 312.5$, exactly halfway. Either divisor gives the same magnitude of error: $313$ gives $48\times 10^6/(16\times 313) = 9584.7$ baud, $-0.16\,\%$; $312$ gives $9615.4$ baud, $+0.16\,\%$. Both are far inside the tolerance.
:::
:::

::: exercise A short CAN frame {level=2 check="95/250e3"}
Using [[#eq-can-frame]], find the worst-case time, in seconds, for a classical CAN frame with $4$ data bytes on a $250\,\mathrm{kbit/s}$ bus.
::: solution
$L(4) = 32 + 47 + \lfloor (34 + 32 - 1)/4 \rfloor = 79 + 16 = 95$ bits, and $95/250\,000 = 380\,\mathrm{\mu s}$.
:::
:::

::: exercise Arbitration {level=2}
Three CAN nodes start sending simultaneously, with identifiers `0x123`, `0x125` and `0x0F0`. Which wins? At which bit does each loser drop out (counting the $11$ identifier bits from the most significant, bit $10$, down to bit $0$)?
::: solution
In $11$-bit binary: `0x0F0` $=$ `000 1111 0000`, `0x123` $=$ `001 0010 0011`, `0x125` $=$ `001 0010 0101`. At bit $8$ (the third bit sent), `0x0F0` sends $0$ and the other two send $1$: both lose and drop out there. `0x0F0`, the lowest identifier, wins. (Had `0x0F0` not been present, `0x123` and `0x125` would agree down to bit $3$ and differ at bit $2$, where `0x123` sends $0$ and wins.)
:::
:::

::: exercise I²C transaction time {level=2}
A microcontroller reads six bytes (three axes of $16$-bit data) from an accelerometer at $400\,\mathrm{kHz}$: START, address+W, register, repeated START, address+R, six data bytes, STOP. Estimate the transaction time and the maximum rate at which complete readings can be taken. How does this change at $100\,\mathrm{kHz}$?
::: solution
There are $3$ address/register bytes and $6$ data bytes, each $9$ clock periods: $81$ periods, plus about $3$ for the START, repeated START and STOP: about $84$ periods, $84/400\,\mathrm{kHz} = 210\,\mathrm{\mu s}$. The bus can deliver about $4700$ readings per second (in practice somewhat fewer because of gaps between bytes). At $100\,\mathrm{kHz}$, $840\,\mathrm{\mu s}$ and about $1200$ per second — still more than a typical accelerometer's output data rate, but a significant fraction of the bus if other devices share it.
:::
:::

::: exercise UART tolerance with parity {level=3}
Apply [[#thm-uart-tolerance]] to the 8E1 format (eight data bits, even parity, one stop bit) with $16\times$ oversampling, and to 8N1 with $8\times$ oversampling. In each case, if both ends may err equally in opposite directions, how accurate must each clock be?
::: solution
8E1 has $11$ bits: start (index $0$), eight data bits, parity (index $9$) and stop (index $10$), so $m = 10$ and $\abs{e} < (0.5 - 0.0625)/10.5 = 4.17\,\%$; each end must be within $\pm 2.08\,\%$. For 8N1 with $8\times$ oversampling, $\abs{e} < (0.5 - 0.125)/9.5 = 3.95\,\%$, each end $\pm 1.97\,\%$. Longer frames and coarser oversampling both tighten the requirement; with the practical margins discussed after the theorem, a $\pm 1\,\%$ per end design target is prudent for both.
:::
:::

::: exercise Pull-ups for a long I²C bus {level=3}
A $3.3\,\mathrm{V}$ I²C bus connects a microcontroller to sensors on a second board through a $1\,\mathrm{m}$ cable. The cable adds $100\,\mathrm{pF/m}$, and the eight devices and connectors add $15\,\mathrm{pF}$ each. Devices sink $3\,\mathrm{mA}$ at $0.4\,\mathrm{V}$. (a) Find the bus capacitance. (b) Can the bus run in fast mode? (c) If not, what is possible in standard mode, and what hardware could rescue fast mode?
::: solution
(a) $C_b = 100 + 8\times 15 = 220\,\mathrm{pF}$.

(b) Fast mode needs $R_p \le 300\,\mathrm{ns}/(0.8473\times 220\,\mathrm{pF}) = 1609\,\Omega$, and the sink current requires $R_p \ge 967\,\Omega$. A $1.2\,\mathrm{k\Omega}$ or $1.5\,\mathrm{k\Omega}$ pull-up works ($t_r = 224$ or $280\,\mathrm{ns}$), so fast mode is possible — but with little margin at $1.5\,\mathrm{k\Omega}$, and cable capacitance and crosstalk vary. $1.2\,\mathrm{k\Omega}$ ($I = 2.4\,\mathrm{mA}$) is the better choice.

(c) In standard mode the limit is $1000\,\mathrm{ns}/(0.8473\times 220\,\mathrm{pF}) = 5.4\,\mathrm{k\Omega}$, so any value from $1\,\mathrm{k\Omega}$ to about $5\,\mathrm{k\Omega}$ works. For longer cables or more margin, a bus buffer (repeater) chip splits the bus into separately driven segments, an active pull-up (rise-time accelerator) supplies extra current during rising edges, or a differential I²C extender carries the signals over twisted pairs.
:::
:::

::: exercise Designing a CAN schedule {level=3}
A $250\,\mathrm{kbit/s}$ CAN bus must carry: $5$ messages of $8$ bytes every $10\,\mathrm{ms}$, $10$ messages of $4$ bytes every $20\,\mathrm{ms}$ and $20$ messages of $2$ bytes every $100\,\mathrm{ms}$. (a) Compute the worst-case bus load. (b) Would it fit below $50\,\%$ at $125\,\mathrm{kbit/s}$? (c) How should identifiers be assigned, and why?
::: solution
(a) Frame lengths by [[#eq-can-frame]]: $L(8) = 135$, $L(4) = 95$, $L(2) = 16 + 47 + \lfloor 49/4\rfloor = 75$ bits. Bits per second: $5\times 135/0.01 = 67\,500$; $10\times 95/0.02 = 47\,500$; $20\times 75/0.1 = 15\,000$. Total $130\,000\,\mathrm{bit/s}$, $52\,\%$ of $250\,\mathrm{kbit/s}$.

(b) At $125\,\mathrm{kbit/s}$ the load would be $104\,\%$: impossible. Even at $250\,\mathrm{kbit/s}$ the load is above a conservative $50\,\%$ target; packing the $2$-byte messages into fewer, longer frames would help (four $2$-byte signals in one $8$-byte frame every $100\,\mathrm{ms}$ replace four $75$-bit frames by one $135$-bit frame).

(c) Assign the lowest identifiers (highest priorities) to the messages with the shortest periods and deadlines — the $10\,\mathrm{ms}$ group first. This is the deadline-monotonic assignment, optimal for fixed priorities in the sense of [[embedded-systems/real-time-systems]]; response-time analysis then confirms each message's worst-case delay, including the blocking by one lower-priority frame already on the bus.
:::
:::
