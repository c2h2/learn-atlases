Mehmet has just arrived by train in a small English town. He stops a woman outside the station.

**Mehmet:** *Excuse me, could you tell me how to get to the museum?*

**Woman:** *Sure. Go straight on to the traffic lights, turn left, go past the post office, and the museum's at the end of the road. You can't miss it.*

**Mehmet:** *Thank you!*

In the last lesson, *Give me a coffee* sounded rude. Here the woman gives Mehmet four commands in a row — *go*, *turn*, *go*, and an implied *look* — and nobody would call her rude. The difference is who benefits. Directions are instructions for the listener's own good, so English gives them as plain imperatives, and the polite part is in the question that asked for them.

This lesson teaches how to ask for directions and understand the answer, how to give directions yourself, how to use public transport and hotels, and how to explain a problem when something goes wrong while travelling. British and American English differ in many travel words (*single* and *one-way*, *platform* and *track*, *ground floor* and *first floor*), and these are marked throughout.

## Asking the way

Start by getting attention politely, then ask:

- *Excuse me, how do I get to the station?*
- *Excuse me, is there a pharmacy near here?* / *Is there a cash machine* (BrE) / *an ATM* (AmE) *near here?*
- *Could you tell me the way to the city hall?*
- *Could you tell me where the bus station is?*
- *Is it far?* / *Can I walk there?* / *How long does it take to walk?*
- *Am I going the right way for the beach?*

Notice *Could you tell me where the bus station **is**?* — not *where **is** the bus station?* When a question is put inside another question, it keeps the word order of a statement.

::: theorem Questions inside questions {#rule-indirect-question}
After an opening such as *Could you tell me…*, *Do you know…* or *Can you tell me…*, a question word (*where*, *how*, *what time*) is followed by statement order — subject, then verb — and no *do*, *does* or *did*:

| direct question | inside another question |
|---|---|
| *Where is the station?* | *Could you tell me where the station is?* |
| *What time does the bus leave?* | *Do you know what time the bus leaves?* |
| *How do I get to the museum?* | *Could you tell me how I get to the museum?* / *…how to get to the museum?* |

A yes/no question inside another question begins with *if* or *whether*: *Do you know if this bus goes to the airport?*
:::

::: proof
The opening (*Could you tell me…?*) is already the question: it has the inversion (*could you*) and the question mark. What follows is the thing you want to be told, and it is treated like a statement — the same order as in *I know where the station is*. These **indirect questions** are more polite than direct ones because they ask about the listener's ability or knowledge first, which gives them an easy way out (*Sorry, I'm not from here*). Questions are formed as explained in [[core-grammar/questions-and-negatives]].
:::

::: warning Word order in polite questions
✗ *Could you tell me where is the station?*

✗ *Do you know what time does the train leave?*

✓ *Could you tell me where the station is?*

✓ *Do you know what time the train leaves?*

The mistake comes from keeping the order of the direct question. It is extremely common, and listeners understand it; but in careful speech and in writing, use statement order after *Could you tell me…* and *Do you know…*.
:::

If the person cannot help, they will say *Sorry, I'm not from round here* (BrE) / *around here* (AmE), or *Sorry, I don't know*. Say *Thanks anyway* and ask someone else.

## Giving directions

::: definition Imperative {#def-imperative}
The **imperative** is the form of the verb used to give instructions, orders and advice. It is the base form of the verb, usually with no subject: *Turn left.* *Go past the bank.* The negative is *don't* + the base form: *Don't cross here.*
:::

::: theorem Directions use imperatives {#rule-directions-imperative}
When you give directions, use plain imperatives: *Go straight on. Take the second right. Cross the road.* They are not rude, because they are instructions that help the listener, who asked for them. Join them with *and*, *then*, *after that* and *when you get to…*.
:::

::: proof
Whether an imperative sounds rude depends on who benefits from the action. An imperative that asks someone to do something for **you** (*Give me a coffee*) sounds like an order; an imperative that tells someone how to do something for **themselves** (*Turn left at the lights*) is helpful information. The same is true of instructions in recipes (*Add the eggs*), signs (*Keep left*) and offers (*Have a seat*); see [[everyday-english/requests-offers]]. *You* can be added to make directions sound more conversational: *You go straight on, and then you turn left.*
:::

The words used most in directions are:

| movement | position |
|---|---|
| *go straight on* (BrE) / *go straight ahead* (AmE, also BrE) | *on the left* / *on the right* / *on your left* |
| *turn left* / *turn right* | *on the corner (of…)* |
| *take the first / second left* (= the first / second road on the left) | *opposite* (BrE) / *across from* (AmE, also BrE) |
| *go past* the bank | *next to* / *between* … *and* … |
| *go along* / *go down* / *go up* the street | *in front of* / *behind* |
| *cross* the road / the bridge | *at the end of* the road |
| *keep going until* you get to… | *at the traffic lights* |
| *follow the signs for…* | *at the roundabout* (BrE) / *the traffic circle* (AmE) |
| *go two blocks* (AmE: a block is the distance between two cross streets) | *at the crossroads* / *junction* (BrE) / *intersection* (AmE) |

*Go down the street* and *go up the street* usually mean the same thing ('along'); they do not need to mean downhill or uphill.

To say how far: *It's about five minutes' walk.* / *It's a five-minute walk.* / *It's about 200 metres.* (BrE spelling; AmE *meters*, and in the US distances are usually given in *blocks*, *feet* or *miles*). *You can't miss it* means 'It is very easy to see'.

The figure is a map of a small town centre. The numbers on the streets are walking times in minutes. North is at the top.

::: widget graph
nodes: Station@0,0; Traffic lights@2,0; Roundabout@4,0; Park gate@0,2; Post office@2,2; Hotel@4,2; Library@0,4; Museum@2,4; Market@4,4
edges: Station-Traffic lights:3; Traffic lights-Roundabout:4; Park gate-Post office:3; Post office-Hotel:3; Library-Museum:4; Museum-Market:2; Station-Park gate:5; Park gate-Library:4; Traffic lights-Post office:2; Post office-Museum:2; Roundabout-Hotel:3; Hotel-Market:2
algorithm: dijkstra
start: Station
title: A town centre: walking times in minutes
caption: Press play to let the figure find the quickest walking route from the station to every place (Dijkstra's method). Then click a place to see its route, and describe it in words, as in the worked example below. You come out of the station facing east, towards the traffic lights.
:::

::: example Directions from the map {#ex-map}
Using the map, give directions from the station to the museum. You come out of the station facing east (towards the traffic lights).
::: solution
Step 1: find the route. The quickest way is Station → Traffic lights (3 minutes) → Post office (2) → Museum (2): 7 minutes. The route through the park gate takes 10 minutes (5 + 3 + 2).

Step 2: turn the route into movements. You face east, so the traffic lights are straight ahead: *Go straight on to the traffic lights.* At the lights you must go north; facing east, north is on your left: *Turn left at the traffic lights.* From the lights the road goes north past the post office to the museum without another turn: *Go past the post office, and keep going.*

Step 3: say where the place is and how long it takes. *The museum is at the end of the road, about seven minutes' walk.*

All together: *Go straight on to the traffic lights and turn left. Go past the post office, and the museum's at the end of the road. It's about seven minutes' walk.* This is exactly what the woman said to Mehmet at the start of the lesson.
:::
:::

::: quiz
You are walking north. Someone tells you *Take the second right.* Which way will you be walking after you turn?
- [ ] North
- [x] East
- [ ] West
- [ ] South
::: solution
*Take the second right* means 'turn into the second road on your right'. When you face north, your right is east. (Directions with *left* and *right* always depend on which way the listener is facing — which is why people giving directions often begin *With your back to the station…* or *Coming out of the hotel…*.)
:::
:::

::: example Understanding fast directions {#ex-listen}
Yuki asks a man the way to the library and hears: *Oh, right, the library — OK, so you wanna go back the way you came, past the church, and then it's, er, second on the left, no, sorry, first on the left, by the bakery, and just carry on up there for a bit and you'll see it on your right, big glass building, you can't miss it.* Turn this into a list of steps, and say what Yuki can do if she is not sure.
::: solution
Step 1: ignore the words that only fill time or correct the speaker (*oh, right*, *OK, so*, *er*, *no, sorry*) and keep the final version of each instruction.

Step 2: list the actions in order:
1. Go back the way you came. (*you wanna* = *you want to*, a very common informal way to give an instruction)
2. Go past the church.
3. Take the **first** left, by the bakery. (The speaker first said *second*, then corrected it.)
4. Carry on (= go straight on) up that street for a short way.
5. The library is on the right: a big glass building.

Step 3: check the uncertain point by repeating it: *So back past the church, first left by the bakery, and it's on the right?* The man will confirm or correct.

Real directions are rarely as tidy as a textbook. Listening for the verbs of movement (*go back*, *take*, *carry on*) and the landmarks (*church*, *bakery*, *glass building*), and checking at the end, is enough.
:::
:::

::: quiz
Which question is correct and polite?
- [ ] *Could you tell me where is the bus stop?*
- [x] *Could you tell me where the bus stop is?*
- [ ] *Could you tell me where does the bus stop?*
- [ ] *Where the bus stop is, please?*
::: solution
After *Could you tell me…*, the question inside keeps statement order: *where the bus stop is* ([[#rule-indirect-question]]). A direct question on its own would be *Where is the bus stop?*
:::
:::

## Public transport

### Tickets

| British English | American English | meaning |
|---|---|---|
| *a single (ticket)* | *a one-way (ticket)* | for one journey |
| *a return (ticket)* | *a round-trip (ticket)* | there and back |
| *a day ticket* / *a day pass* | *a day pass* | unlimited journeys for one day |
| *timetable* | *schedule* | the list of times |
| *platform* | *track* (also *platform*) | where you get on a train |
| *the underground*, *the Tube* (London) | *the subway* | an underground railway; many cities say *the metro* |
| *railway station* | *train station* (also BrE) | |

**Li Wei:** *Hello. Could I have a return to Cambridge, please?*

**Ticket office:** *Are you coming back today?*

**Li Wei:** *Yes, this evening.*

**Ticket office:** *That's an off-peak day return, then: twenty-two pounds forty.*

**Li Wei:** *Do you have a student discount?*

**Ticket office:** *Have you got a student discount card?*

**Li Wei:** *No, I haven't. That's fine — here you are. Which platform does it leave from?*

**Ticket office:** *Platform four. The next one's at ten fifteen.*

On the platform or the bus:

- *Does this train stop at Ely?* / *Does this bus go to the city centre?*
- *Is this seat free?* / *Is anyone sitting here?* — answer *No, go ahead.* or *Sorry, it's taken.*
- *Where do I change for the airport?* — 'change trains or buses'
- *Could you tell me when we get to Market Street?* (to a bus driver or another passenger)
- *How often do the buses run?* — *Every ten minutes.*
- *The 10.15 is delayed.* / *…has been cancelled.* — in announcements; *the 10.15* means 'the train that leaves at 10.15'

::: theorem *Get on* or *get in*? {#rule-get-on-in}
For buses, trains, trams, planes, ships and bicycles — vehicles you can walk around in or sit on top of — use **get on** and **get off**: *Get on the number 12 bus. Get off at the third stop.* For cars and taxis — small vehicles you climb into — use **get in(to)** and **get out of**: *Get in the taxi. Get out of the car.*
:::

::: proof
The choice follows the image: you step **on** to a bus, a train or a bike, but you climb **in** to a car. *Take* is used for a means of transport in general: *take a bus*, *take the train*, *take a taxi*; *by* with no article for the means of travel: *by bus*, *by train*, *by car* — but *on foot* ('walking'). Chinese uses 上 and 下 for all of these (上车, 下车), so the English pairs need to be learned with their nouns.
:::

::: example Buying a ticket from a machine and asking for help {#ex-ticket}
Fatima is at a station ticket machine in the United States. She wants to go to the airport and come back tomorrow, but the screen offers *One-way*, *Round-trip* and *Day pass*. She also does not know which track the train leaves from. What should she choose, and what can she ask a member of staff?
::: solution
Step 1: choose the ticket. She is coming back the next day, so a *day pass* (one day only) is not enough; *round-trip* means there and back, which is what she needs. (In Britain the same ticket would be a *return*; a return for the same day is often cheaper than one for a later day.)

Step 2: ask about the track. In American stations trains leave from a *track*: *Excuse me, which track does the airport train leave from?*

Step 3: check the details she is unsure of: *Is this the right ticket for coming back tomorrow?* and *How often do the trains run?*

The staff member might answer: *Yes, a round-trip's good for thirty days. Track 2, every fifteen minutes.* (*good for* = 'valid for')
:::
:::

## At a hotel

**Booking** (by phone or email):

- *I'd like to book a room for two nights, from the 14th to the 16th of June.*
- *A single room* (for one person), *a double room* (one large bed for two people), *a twin room* (BrE: two single beds; AmE usually *a room with two beds*).
- *How much is it per night?* / *Is breakfast included?*

**Checking in:**

**Receptionist:** *Good evening. Checking in?*

**Wang Fang:** *Yes. I have a reservation under the name Wang — W–A–N–G.*

**Receptionist:** *Ah yes, a double room for two nights. Could I see your passport, please?*

**Wang Fang:** *Here you are. What time is breakfast?*

**Receptionist:** *From seven till ten, in the restaurant on the ground floor. Your room is 214, on the second floor. The lift is just behind you.*

**Wang Fang:** *Thank you. And what time is check-out?*

**Receptionist:** *Eleven o'clock.*

::: theorem Floors in British and American English {#rule-floors}
In British English, the floor at street level is the **ground floor**, and the one above it is the **first floor**. In American English, the floor at street level is the **first floor**, and the one above it is the **second floor**. So the British *first floor* is the American *second floor*. The machine that carries people between floors is a **lift** (BrE) or an **elevator** (AmE).
:::

::: proof
The British system counts the floors **above** the ground: the first floor is the first one up. The American system counts the floors from the street, starting with 1. Chinese buildings use the American system (一楼 is at street level), so a Chinese speaker in Britain or Ireland, and in many other European countries, should expect *first floor* to be one level higher than 一楼. Hotel room numbers usually begin with the floor number: room 214 is on the second floor in either system — but in a British hotel that is two floors above the ground floor.
:::

## Problems when travelling

When something goes wrong, start politely (*Excuse me*, *Sorry to bother you*, *I'm afraid…*), say what the problem is, and ask for what you need.

- *Excuse me, I'm afraid there's no hot water in my room.*
- *Sorry to bother you, but the air conditioning isn't working.*
- *The room's very noisy. Is it possible to change rooms?*
- *I've lost my passport. What should I do?* / *Where's the nearest police station?*
- *I've missed my train. Can I use this ticket on the next one?*
- *I think I'm lost. Could you show me where we are on the map?*
- *Could you call a taxi for me, please?*

::: example A problem at the hotel {#ex-problem}
Arjun's hotel room has a broken window that will not close, and it is cold. Write what he says at reception, and explain how it is organised.
::: solution
**Arjun:** *Excuse me, sorry to bother you.* — attention and a polite opening.

*I'm in room 307, and I'm afraid the window won't close.* — his room number first, so the receptionist can act, then the problem, softened with *I'm afraid*. (*Won't close* means 'refuses to close', a common way to describe a broken thing.)

*It's quite cold in there. Could someone have a look at it, or could I move to another room?* — the effect, then a request with two possible solutions.

**Receptionist:** *I'm very sorry about that. I'll send someone up straight away, and if it can't be fixed, we'll move you.*

**Arjun:** *Thanks very much.*

The pattern — attention, facts, polite request — is the same as for returning something in a shop ([[everyday-english/shopping-eating-out]]). Giving the facts calmly, without blaming anyone, usually gets help fastest.
:::
:::

::: quiz
A British receptionist says *Your room is on the first floor.* Where is it?
- [ ] At street level
- [x] One floor above street level
- [ ] Two floors above street level
- [ ] Below street level
::: solution
In British English, street level is the *ground floor*, and the *first floor* is the one above it. An American would call the same floor the *second floor*.
:::
:::

::: note English and Chinese
- **Directions.** Many speakers in northern Chinese cities give directions with compass points (往北走, 路东). English speakers usually use *left*, *right*, landmarks and *straight on*; compass directions are mainly used in some American cities with grid streets (*Go north on Main Street*).
- **上车 and 下车.** English distinguishes *get on/off* (bus, train, plane) and *get in/out of* (car, taxi) ([[#rule-get-on-in]]); 打车 is *take a taxi*, 坐地铁 is *take the underground / the subway / the metro*.
- **Floors.** 一楼 is the American *first floor* but the British *ground floor* ([[#rule-floors]]).
- **Asking strangers.** 请问…… is translated *Excuse me, …*. A polite indirect question (*Could you tell me where…?*) keeps statement order, which has no equivalent in Chinese, where the question word simply stays in place (车站在哪儿?).
:::

::: history
In 1933 a new map of the London Underground was published, designed by Harry Beck, an engineering draughtsman. Earlier maps had shown the lines on top of a street map, at their real distances, so that the centre was crowded and the outer stations were spread far apart. Beck drew the lines only as straight horizontal, vertical and diagonal lines, with the stations evenly spaced, like an electrical circuit diagram. The map was not accurate about distance, but it was much easier to use, because passengers only need to know the order of stations and where to change. Most underground and metro maps in the world, including those of Chinese cities, now follow Beck's idea.
:::

## Where this leads

Directions use the prepositions of place taught in [[core-grammar/prepositions-time-place]] and the imperative, which returns in [[everyday-english/requests-offers]]. Times and platform numbers use [[everyday-english/numbers-in-conversation]]. Asking someone to repeat or explain directions is practised in [[listening-and-conversation/clarification]], and indirect questions are developed in [[complex-sentences/noun-clauses]] and [[pragmatics/requests-refusals]].

::: summary
- Ask the way with *Excuse me, how do I get to…?*, *Is there a… near here?* or *Could you tell me where… is?*
- After *Could you tell me…* and *Do you know…*, use statement order: *where the station is*, *what time the bus leaves* ([[#rule-indirect-question]]).
- Directions are given with imperatives, which are polite here because they help the listener ([[#rule-directions-imperative]]): *Go straight on, take the second left, it's on your right.*
- Learn the BrE/AmE pairs: *single*/*one-way*, *return*/*round-trip*, *platform*/*track*, *underground*/*subway*, *roundabout*/*traffic circle*, *opposite*/*across from*.
- *Get on/off* a bus, train or plane; *get in/out of* a car or taxi ([[#rule-get-on-in]]).
- The British *first floor* is the American *second floor*; 一楼 is the British *ground floor* ([[#rule-floors]]).
- For problems: a polite opening, the facts, then a request — *Sorry to bother you, but… Could I…?*
:::

## Exercises

::: exercise Where is it? {level=1}
Look at the map in the figure (north at the top). Complete each sentence with *between*, *next to* or *at the end of*.
(a) *The post office is ___ the park gate and the hotel.* (b) *The market is ___ the museum, two minutes away.* (c) *Walking north from the traffic lights, the museum is ___ the road.*
::: solution
(a) *between* (b) *next to* (it is the closest place to the east of the museum) (c) *at the end of*
:::
:::

::: exercise British or American? {level=1}
Give the American English word: (a) *a return ticket* (b) *a single ticket* (c) *the underground* (d) *a lift* (e) *a roundabout*
::: solution
(a) *a round-trip ticket* (b) *a one-way ticket* (c) *the subway* (d) *an elevator* (e) *a traffic circle* (also *a rotary* in parts of the US)
:::
:::

::: exercise *On*, *off*, *in* or *out of*? {level=1}
(a) *We got ___ the train at York.* (b) *She got ___ the taxi and paid the driver.* (c) *Get ___ the bus at the third stop.* (d) *He got ___ the car and drove away.*
::: solution
(a) *off* (b) *out of* (c) *off* (d) *in* / *into*
:::
:::

::: exercise Polite questions {level=2}
Make each question indirect, starting with the words given.
(a) *Where is the nearest pharmacy?* → *Could you tell me…*
(b) *What time does the last bus leave?* → *Do you know…*
(c) *Does this train go to Leeds?* → *Do you know…*
(d) *How much is a day pass?* → *Could you tell me…*
::: solution
(a) *Could you tell me where the nearest pharmacy is?*
(b) *Do you know what time the last bus leaves?*
(c) *Do you know if* (or *whether*) *this train goes to Leeds?*
(d) *Could you tell me how much a day pass is?*
:::
:::

::: exercise Which floor? {level=2}
A hotel in London has a restaurant on the ground floor, rooms 100–199 on the first floor and rooms 200–299 on the second floor. An American guest is told *Your room is 158*. (a) How many floors above the street is the room? (b) What would the guest call that floor at home?
::: solution
(a) One floor above the street (the British *first floor*). (b) The *second floor*.
:::
:::

::: exercise Put the directions in order {level=2}
Put these sentences in the right order to give directions from the station to the hotel on the map.

(a) *Turn right at the post office.*

(b) *The hotel is at the end of that road, straight ahead.*

(c) *Go straight on to the traffic lights.*

(d) *Turn left at the lights.*
::: solution
(c) – (d) – (a) – (b). From the station you go east to the lights, turn left (north) to the post office, then turn right (east) towards the hotel, which is at the end of that road, straight ahead. (The total walk is 3 + 2 + 3 = 8 minutes, quicker than the 10-minute route via the roundabout.)
:::
:::

::: exercise Give directions {level=3}
Using the map, write directions from the **library** to the **hotel**, as you would say them to a visitor standing at the library door facing south (towards the park gate). Find the quickest route first.
::: hint
Run the figure with *start* changed in your head: the routes from the library are via the park gate or via the museum. Add up the minutes.
:::
::: solution
Routes: Library → Park gate (4) → Post office (3) → Hotel (3) = 10 minutes; Library → Museum (4) → Post office (2) → Hotel (3) = 9 minutes; Library → Museum (4) → Market (2) → Hotel (2) = 8 minutes. The quickest is via the museum and the market.

Facing south, east is on your left. *Turn left out of the library and walk along the road past the museum. Keep going to the market. At the market, turn right, and the hotel is just down the road, straight ahead. It's about eight minutes' walk.*

Check: from the library, the museum is to the east (left when facing south); at the market you are walking east, and the hotel is to the south, which is on your right.
:::
:::

::: exercise A travel problem {level=3}
Write a dialogue (8–10 turns) at a station: you have missed your train because your bus was late. Ask whether you can use your ticket on the next train, when it leaves, and which platform it leaves from. The staff member answers.
::: solution
A model answer (British English):

**You:** *Excuse me, sorry to bother you. I've just missed the 14.20 to Manchester — my bus was late. Can I use this ticket on the next train?*

**Staff:** *Let me see… It's an advance ticket, so it's only valid on the 14.20, I'm afraid.*

**You:** *Oh no. Is there anything I can do?*

**Staff:** *Because your bus was delayed, I can change it for you this time. The next one is at 14.50.*

**You:** *That's very kind of you, thank you. Which platform does it leave from?*

**Staff:** *Platform 6. Here's your new ticket.*

**You:** *Thanks. And does it stop at Stockport?*

**Staff:** *Yes, it does.*

**You:** *Great. Thanks so much for your help.*

The dialogue uses a polite opening, explains the facts, asks questions with *Can I…?*, *Which platform…?* and *Does it…?*, and thanks the staff member twice. Real ticket rules differ between companies and ticket types; asking is always the best way to find out.
:::
:::
