A behaviour-cloning policy can never be better than its data. [[vision-language-action/imitation-learning]] showed what the data must contain — consistent actions, enough coverage of the states the robot will reach, recovery from small errors — and this chapter is about how to get it. The work is less glamorous than designing networks, and it is where most of the effort in a real robot-learning programme goes: building a teleoperation rig an operator can use for hours, writing a protocol so that demonstrations are consistent, recording cameras and joint data with correct timestamps, storing hundreds of hours of video, and putting it all in a format that training code and other teams can read.

We start with the ways a human can drive a robot arm — kinesthetic teaching, 6-DOF input devices, virtual reality and leader–follower arms — and compare them by speed, precision and the quality of data they produce. We then define what a demonstration episode must record, discuss data quality and how many demonstrations a task needs, and work through the storage and bandwidth budget of a multi-camera rig. The chapter ends with the common dataset formats (RLDS, the LeRobot format, HDF5) and the large shared datasets — Open X-Embodiment and DROID — on which most generalist policies were pretrained.

## Ways to demonstrate {#sec-teleop}

A demonstration must produce *robot* actions: the joint or end-effector commands the policy will later output. The interface between the human and the robot determines how natural the demonstration is, how fast it is, and whether the recorded actions are the ones the robot can actually execute.

::: definition Teleoperation and kinesthetic teaching {#def-teleop}
In **kinesthetic teaching** the operator physically moves the robot arm by hand while it runs in a compliant, gravity-compensated mode, and the joint trajectory is recorded. In **teleoperation** the operator moves an input device and the robot follows; the device may command the end-effector pose or velocity (spacemouse, VR controller, hand tracking) or the joint angles directly (a **leader–follower** pair, in which the operator moves a *leader* arm and the *follower* robot copies its joint angles). Teleoperation is **unilateral** if information flows only from operator to robot, and **bilateral** if forces measured at the robot are fed back to the operator.
:::

**Kinesthetic teaching** needs no extra hardware on an arm with joint torque sensing or good current-based gravity compensation, and is intuitive for slow, precise motions. Its drawbacks for vision-based learning are serious: the operator's hands and body appear in the camera images (which the policy will never see at test time), only one arm can be guided comfortably, and the friction and inertia of the arm make fast or delicate motions tiring. It remains useful for teaching waypoints and for low-dimensional skills.

**Spacemouse and gamepad** teleoperation maps the deflection of a 6-DOF puck to an end-effector velocity twist, which a Cartesian controller (or a differential inverse-kinematics loop, [[robotics/jacobians]]) converts into joint velocities. The hardware is cheap and the data clean, but simultaneous translation and rotation are hard to control and operators tend to move one axis at a time, producing slow, "staircase" demonstrations. Spacemouse data was standard in early robot-learning benchmarks such as robomimic (2021).

**Virtual reality** teleoperation tracks the pose of a hand-held controller (or of the hand itself) and maps it to the end-effector pose, again through inverse kinematics. It is fast and natural for reaching and gross motion; the large DROID dataset was collected with consumer VR controllers. Its weaknesses are the absence of force feedback, the mismatch between the human arm's kinematics and the robot's (the controller can be moved to poses the robot cannot reach, or through a singularity), and depth perception through a headset or a monitor.

**Leader–follower** rigs use a second, kinematically similar arm as the input device. Because the leader's joints map one-to-one onto the follower's, there is no inverse kinematics, no singularity surprise, and the operator feels the arm's configuration directly — including redundancy, elbow position and joint limits. ALOHA (Zhao, Kumar, Levine and Finn, 2023) used two pairs of small, low-cost arms for bimanual tasks such as threading a zip tie and inserting a battery; GELLO (Wu et al., 2023) built 3D-printed, scaled replicas of commercial arms with hobby servos used only as joint encoders, so that one can be made for a few hundred US dollars of parts (as of 2023). Most data collection for fine bimanual tasks, as of 2026, uses leader–follower rigs. A related idea, the Universal Manipulation Interface (UMI, Chi et al., 2024), removes the robot altogether: the operator holds a hand-held gripper with a wide-angle camera, its pose is tracked by visual SLAM, and the recorded trajectory is later retargeted to a robot with the same gripper and camera.

| interface | hardware cost | speed | precision | bimanual | main data issue |
|---|---|---|---|---|---|
| kinesthetic | none extra | slow | good | hard | human in images |
| spacemouse | very low | slow | good | hard | one axis at a time |
| VR controller / hand tracking | low | fast | moderate | yes | IK mismatch, no force |
| leader–follower | moderate | fast | good | yes | needs a leader per arm design |
| hand-held gripper (UMI-style) | low | fast | good | yes | retargeting, no robot in loop |

::: example Velocity scaling of a spacemouse {#ex-spacemouse}
A spacemouse reports translational deflection as integers from $-350$ to $350$ per axis. The teleoperation software maps full deflection to $0.20\,\mathrm{m/s}$, applies a dead zone of $\pm 20$ counts, and the policy will be trained at $10\,\mathrm{Hz}$ on end-effector deltas. Find (a) the velocity resolution, (b) the largest delta per policy step, (c) the smallest non-zero velocity, and (d) how long a $0.30\,\mathrm m$ reach takes at full speed.
::: solution
(a) $0.20\,\mathrm{m/s}/350 = 5.7\times10^{-4}\,\mathrm{m/s}$ per count.
(b) At $10\,\mathrm{Hz}$, $\Delta x_{\max} = 0.20 \times 0.1 = 0.020\,\mathrm m = 20\,\mathrm{mm}$ per step — this sets the range for any action normalisation or binning ([[vision-language-action/action-representations]]).
(c) Just outside the dead zone, $21 \times 5.7\times10^{-4} = 0.012\,\mathrm{m/s}$, i.e. 1.2 mm per step. Commands smaller than this are recorded as exactly zero, which creates many identical zero actions in slow, precise phases.
(d) $0.30/0.20 = 1.5\,\mathrm s$, but operators rarely hold full deflection; 3–5 s is typical.
Sanity check: 20 mm per step at 10 Hz is a modest $0.2\,\mathrm{m/s}$, well within the speed limits of a collaborative arm working near people.
:::
:::

### Mapping leader joints to follower joints

A leader–follower rig needs a calibration from leader encoder readings to follower joint angles: for each joint $i$, $q^{\mathrm F}_i = s_i\,(q^{\mathrm L}_i - q^{\mathrm L}_{i,0}) + q^{\mathrm F}_{i,0}$, with a sign $s_i = \pm1$ (encoders may be mounted reversed) and offsets measured with both arms in the same reference pose. The follower's joint position controller tracks $q^{\mathrm F}$ at its own servo rate. The gripper usually needs a separate, non-linear map from a leader trigger or handle to the follower's finger width. If the leader is a scaled replica, joint *angles* still map one-to-one (scaling lengths does not change angles), but the operator's hand speed is scaled down with the leader's size.

::: warning Recording the command or the measurement
A teleoperation log contains two candidates for "the action": the *command* sent to the follower (from the leader or device) and the follower's *measured* position a moment later. They differ by the tracking error and delay of the follower's controller — several degrees during fast motions. The policy will output commands, so the action label should normally be the command, and the measured position belongs in the observation. Mixing the two, or using the measured position at $t+1$ as the action at $t$, trains a policy whose outputs lag or under-shoot.
:::

## What a demonstration must record {#sec-episode}

::: definition Episode record {#def-episode}
A demonstration **episode** is stored as a sequence of time-stamped **steps** plus episode-level **metadata**. Each step contains the observations (camera images, joint positions and velocities, gripper state, optionally force–torque and tactile readings), the action commanded at that step, a timestamp from a common clock, and flags marking the first and last step and whether the last step is a true terminal state. Metadata include the language instruction, the success label, the robot and gripper model, the control and recording frequencies, the camera intrinsic and extrinsic calibration, the action space and its units and frame, the operator and the date, and the software version.
:::

Metadata are the part most often skipped and most often regretted. A dataset without the action frame (base or end-effector? metres or millimetres? delta or absolute?) cannot be merged with other data, and a dataset without camera extrinsics cannot be used by methods that reason about 3D. A year later nobody remembers which episodes were recorded before the wrist camera was moved.

### Time and synchronisation

Cameras, the joint controller and the teleoperation device run on different clocks and at different rates — say 30 frames per second for cameras, 500 Hz–1 kHz for joint state, and 10–50 Hz for the policy. A recorder must stamp every sample with a common clock and then **align** them: for each policy step, take the latest image, the joint state at the image's capture time, and the action commanded at that step. Camera frames are delayed by exposure, transfer and decoding — typically tens of milliseconds — so the capture time is not the arrival time.

$$
e_{\mathrm{sync}} \approx v\,\Delta t_{\mathrm{sync}}
$$ {#eq-sync}

The geometric mismatch between what an image shows and what the proprioception says is the end-effector speed times the timing error, [[#eq-sync]].

::: example A camera latency that matters {#ex-sync}
A wrist camera's frames arrive $60\,\mathrm{ms}$ after capture, and the recorder stamps them on arrival. During demonstrations the gripper moves at up to $0.30\,\mathrm{m/s}$. How large is the mismatch between image and joint state, and is it acceptable for a grasp with $\pm 3\,\mathrm{mm}$ tolerance?
::: solution
$e = 0.30\,\mathrm{m/s}\times0.060\,\mathrm s = 0.018\,\mathrm m = 18\,\mathrm{mm}$ — six times the grasp tolerance. During the slow final approach, at perhaps $0.03\,\mathrm{m/s}$, it falls to $1.8\,\mathrm{mm}$, so the damage is mostly to fast phases; but the policy also sees the mismatch at test time, and an inconsistent delay (USB jitter of $\pm 20\,\mathrm{ms}$) cannot be learned away. Fix: measure the latency (film a fast-blinking LED or a moving encoder disc together with the joint data) and stamp each frame with its capture time, or use hardware-triggered cameras. Sanity check: at 30 fps one frame is $33\,\mathrm{ms}$, so a 60 ms error is two frames — easily visible when images and joint plots are replayed side by side.
:::
:::

## Data quality {#sec-quality}

Policies copy everything about the demonstrations, including what the demonstrator did not mean to show. Experience from groups that train manipulation policies at scale converges on a few rules.

1. **Consistency of strategy.** For a given situation, demonstrators should use the same strategy unless variety is wanted. Multimodality that comes from operator idiosyncrasy (one operator always grasps from the left) costs model capacity and can confuse a weak policy head. A written protocol and short training for each operator help; so does keeping a log of which operator recorded each episode, so their data can be compared.
2. **Pauses and idle time.** An operator who hesitates mid-task teaches the policy to hesitate — and because a paused robot produces an unchanging image, the policy can get stuck in that state forever (the observation shows "nothing has happened yet", the label says "do nothing"). Trim idle frames at the start and end of each episode; within an episode, either filter long stretches of near-zero action or keep them only if they are part of the task (waiting for a machine).
3. **Speed.** The policy reproduces demonstration speed. Slow, careful demonstrations give slow policies; very fast ones are inconsistent. A steady, moderate pace, with slow precise phases where they matter, is best. Some deployments replay chunks faster than recorded, at a cost in accuracy.
4. **Diversity of initial conditions.** Object positions, orientations, distractor objects, lighting, table texture and camera placement should be varied over the range the policy must cope with — and recorded so that the coverage can be checked. Generalisation in imitation learning has been found to depend more on the number of different environments and objects than on the number of demonstrations per environment (for example Lin et al., 2024, "Data scaling laws in imitation learning").
5. **Successes, failures and labels.** Keep failed episodes but label them; they are useless as BC targets but valuable for evaluation, for training success detectors, and for some reinforcement-learning methods. Mark any episode the operator thinks was poor.
6. **Hardware stability.** Fix cameras rigidly and re-check calibration regularly; a bumped scene camera silently changes the observation distribution.

::: example Idle frames in a dataset {#ex-idle}
A dataset of 300 episodes averages $25\,\mathrm s$ each at 10 Hz. On average each episode starts with $2.5\,\mathrm s$ of the operator getting ready and ends with $1.5\,\mathrm s$ of stillness after release. What fraction of training pairs are idle, and how much data remains after trimming?
::: solution
Steps per episode $250$; idle steps $(2.5 + 1.5)\times10 = 40$, i.e. $40/250 = 16\%$ of all pairs. After trimming, $210$ steps per episode, $300\times210 = 63\,000$ pairs instead of $75\,000$.
Sixteen per cent sounds harmless, but these are all the *same* label (zero action) on near-identical images of the starting scene — exactly the state the policy sees at the start of every test. A network trained on them can learn "in the initial scene, do nothing" and never begin. Sanity check: the trimmed episodes average $21\,\mathrm s$, about what an observer would say the task takes.
:::
:::

::: quiz
Your policy freezes at the start of about a third of test episodes; once nudged by hand, it completes the task. What is the most likely data cause?
- [x] Untrimmed idle frames at the start of demonstrations, labelled with zero action.
- [ ] Too few demonstrations in total.
- [ ] The camera resolution is too low.
::: solution
Freezing in the *initial* state, and recovering after a nudge that changes the image, is the signature of idle start frames: the most frequent label for the initial image is "do nothing". Trim them (or drop near-zero-action steps at episode boundaries) and retrain.
:::
:::

### How many demonstrations?

There is no formula, but there are reference points, all dated because they move with better methods and pretrained models:

- **Single task, single scene, learned from scratch** (ACT or Diffusion Policy, 2023): tens to a few hundred demonstrations; the ACT paper used 50 per task for its fine bimanual tasks.
- **Fine-tuning a pretrained VLA to a new task on a known arm** (2024–26): reports range from a few dozen demonstrations for simple tasks to many hours of data for long, dexterous ones such as laundry folding.
- **Generalising across scenes and objects:** the number of distinct scenes and objects matters more than repetitions in one scene; collecting, say, 10 demonstrations in each of 30 setups usually beats 300 in one.

The practical approach is incremental: collect a first batch, train, evaluate, look at the failures, and collect more data where the failures are ([[vision-language-action/imitation-learning#alg-dagger]] is the formal version of this).

::: algorithm A data-collection campaign {#alg-campaign}
1. Write the task protocol: start conditions and their ranges, allowed strategies, success criterion, reset procedure.
2. Calibrate and fix cameras; measure the camera-to-joint timing offset; record calibration in the metadata.
3. Train operators on the protocol; record 10–20 pilot episodes and replay them (video plus joint plots) to check synchronisation, frames, units and idle time.
4. Collect a first batch (for example 50–100 episodes), randomising initial conditions according to a schedule rather than by whim.
5. Train a policy, evaluate it, and classify failures (perception, grasp, recovery, timeout).
6. Collect targeted data: more variety where generalisation fails, interventions and recoveries where execution fails.
7. Freeze dataset versions with checksums so that every trained model can be traced to its data.
:::

::: example Operator time for a campaign {#ex-time}
A campaign needs 300 demonstrations of a 30 s task; each reset of the scene takes 20 s, and operators need a 10-minute break every hour (so they work 50 minutes per hour). How many operator-hours does it take, and how many working days for one operator with 6 productive hours a day?
::: solution
Per demonstration $30 + 20 = 50\,\mathrm s$; $300\times50 = 15\,000\,\mathrm s = 4.17\,\mathrm h$ of active work. With 50 working minutes per hour, $4.17\times60/50 = 5.0$ operator-hours. Allowing roughly 15% of episodes to be discarded (failures, mistakes), $5.0/0.85 = 5.9\,\mathrm h$ — about one working day for one operator.
Sanity check: the *recorded* data are only $300\times30\,\mathrm s = 2.5\,\mathrm h$, so the reset and overhead nearly double the cost. Automating the reset (a tray that tips parts back, a second arm that scatters objects) is often the cheapest way to more data.
:::
:::

## Storage and bandwidth {#sec-storage}

Camera streams dominate everything. The raw data rate of $n$ cameras of width $W$ and height $H$ pixels with 3 colour bytes per pixel at frame rate $f$ is

$$
R_{\mathrm{raw}} = n\,W\,H \times 3\,\mathrm{B} \times f .
$$ {#eq-raw}

Video compression (H.264, H.265, AV1) reduces this by a factor of tens to hundreds with little visible loss, but it is lossy, and it introduces artefacts the policy may learn to rely on; datasets usually store compressed video and decode it during training. Proprioception and actions are tiny by comparison.

::: example A three-camera rig {#ex-storage}
A rig has three cameras (two scene, one wrist) at $640\times480$, 30 fps, RGB, and records joint position, velocity and torque for 7 joints plus the gripper at 500 Hz as 4-byte floats. (a) Find the raw camera data rate and the storage per hour. (b) With H.264 at $4\,\mathrm{Mbit/s}$ per camera, find the compressed rate and the storage for 1,000 hours. (c) Is a single USB 3 controller (practical throughput about $3\,\mathrm{Gbit/s}$) enough for uncompressed streams?
::: solution
(a) [[#eq-raw]]: $3\times640\times480\times3\times30 = 82.9\times10^6\,\mathrm{B/s} = 82.9\,\mathrm{MB/s}$; per hour $82.9\times3600 = 2.99\times10^{11}\,\mathrm B = 299\,\mathrm{GB}$.
Proprioception: $(7\times3 + 1)\times4\,\mathrm B\times500\,\mathrm{Hz} = 44\,\mathrm{kB/s} = 0.16\,\mathrm{GB/h}$ — 0.05% of the raw video.
(b) Compressed: $3\times4\,\mathrm{Mbit/s} = 12\,\mathrm{Mbit/s} = 1.5\,\mathrm{MB/s} = 5.4\,\mathrm{GB/h}$, a factor of 55 below raw. For 1,000 hours, $5.4\,\mathrm{TB}$ of video plus $0.16\,\mathrm{TB}$ of proprioception, about $5.6\,\mathrm{TB}$ — one or two hard disks, whereas raw would need $299\,\mathrm{TB}$.
(c) Raw: $82.9\,\mathrm{MB/s}\times8 = 663\,\mathrm{Mbit/s}$, about 22% of $3\,\mathrm{Gbit/s}$ — feasible, but at $1280\times720$ the same three cameras need $1.99\,\mathrm{Gbit/s}$, and four of them would saturate the controller. Many USB cameras compress on board (MJPEG) for this reason.
Sanity check: policies typically see $224\times224$ images at 5–15 Hz; three such streams at 10 Hz are only $4.5\,\mathrm{MB/s}$ raw. Recording at higher resolution and rate than the policy uses is still wise, because it keeps options open for future models.
:::
:::

::: widget plot
f: n*r*x*0.75*x*3/1e6
x: 0, 1920
y: 0, 600
sliders: n=1:1:6; r=5:5:60
labels: \text{raw data rate (MB/s)}
caption: Raw camera data rate in MB/s against image width in pixels (4:3 aspect ratio, RGB, 3 bytes per pixel) for $n$ cameras at $r$ frames per second. Set three cameras at 30 fps and read about 83 MB/s at 640 pixels; then double the width and notice that the rate quadruples — data rate grows with the square of the linear resolution.
:::

## Dataset formats {#sec-formats}

Three families of format cover most robot-learning data as of 2026.

- **HDF5 per episode.** A single file per episode with arrays for each observation and action stream. Simple and fast; used by robomimic and the original ALOHA code. Images may be stored raw or JPEG-compressed per frame. Metadata conventions are up to each project.
- **RLDS** (Reinforcement Learning Datasets, Ramos et al., 2021), built on TensorFlow Datasets. A dataset is a collection of *episodes*, each a sequence of *steps* with fields `observation`, `action`, `reward`, `discount`, and the flags `is_first`, `is_last` and `is_terminal`. Episode-level metadata sit beside the steps. RLDS is the format of Open X-Embodiment and therefore of the many models pretrained on it.
- **LeRobot datasets** (Hugging Face, 2024 onwards). Tabular per-step data (state, action, timestamps, episode and frame indices) in Parquet files, camera streams as MP4 video files, and a metadata file describing features, frame rate and episode boundaries; datasets are shared on the Hugging Face Hub and loaded with the `lerobot` library, which also provides training code for several policies. The format has gone through versions, so check which one a tool expects.

Whatever the container, the content is the same as [[#def-episode]]. Converting between formats is routine; recovering missing metadata is not.

::: definition Embodiment {#def-embodiment}
The **embodiment** of a dataset is the combination of robot arm (kinematics, joint limits), end effector, camera placement and action space with which it was recorded. Data from different embodiments can be pooled for training only if their actions are expressed in comparable units and frames, or if the model has embodiment-specific inputs or output heads ([[vision-language-action/vla-fine-tuning]]).
:::

## Large shared datasets {#sec-shared}

Through 2022, most labs trained on their own data, a few hundred demonstrations at a time. Two developments changed that.

**Open X-Embodiment** (2023) was a collaboration of many academic and industrial labs that converted about 60 existing datasets to RLDS and released them together: more than a million trajectories from 22 robot embodiments, ranging from single arms to bimanual and mobile manipulators. The datasets differ in every way — action spaces, control rates, camera placements, quality — and the accompanying RT-1-X and RT-2-X models showed that training on the mixture could improve performance on individual robots compared with training on each robot's data alone. Most open VLA models of 2024 (Octo, OpenVLA) were pretrained on subsets of it.

**DROID** (Distributed Robot Interaction Dataset, Khazatsky et al., 2024) took the opposite approach: one standardised hardware platform — a Franka Panda arm with two external stereo cameras and a wrist camera, teleoperated with a VR controller — replicated at sites across North America, Europe and Asia, collecting about 76,000 trajectories (roughly 350 hours) in several hundred different scenes. Its value is diversity of scenes and objects with a single, consistent embodiment.

Since then several companies have released or described large datasets of their own, and the size of the largest private datasets is reported in tens of thousands of hours (as of 2026). For a company building its own arms, the lesson is that shared datasets are a starting point for pretraining, while the data that decide performance on a product task are the in-house demonstrations on the product arm.

::: remark Licences and privacy
Shared datasets carry licences (often permissive, sometimes non-commercial) that apply to models trained on them; check them before commercial use. Video recorded in homes or factories may show people, documents and screens; plan anonymisation and consent before collection, not after.
:::

::: history
Programming by demonstration is as old as industrial robots: the teach pendant and the "lead-through" teaching of paint-spraying robots in the 1970s and 1980s recorded a human-guided trajectory and replayed it. Learning a *policy* from demonstrations — one that reacts to what it sees — needed sensors and data at scale. Google's arm farm of 2016 (Levine et al.) collected about 800,000 grasp attempts with 14 robots autonomously; RT-1 (2022) collected about 130,000 teleoperated demonstrations over 17 months. Low-cost teleoperation rigs (ALOHA and GELLO in 2023, UMI in 2024) and standard formats (RLDS in 2021, LeRobot in 2024) then made it possible for small teams to collect and share high-quality data, and Open X-Embodiment (2023) and DROID (2024) pooled it across labs.
:::

::: summary
- Demonstrations are collected by kinesthetic teaching, 6-DOF devices, VR, leader–follower arms or hand-held grippers; leader–follower rigs dominate fine bimanual work as of 2026.
- Record the *commanded* action as the label and the *measured* state as observation; stamp every sample with a common clock and correct for camera latency (mismatch $\approx v\,\Delta t$).
- An episode record needs per-step observations, actions, timestamps and flags, and episode metadata: instruction, success, embodiment, frames, units, calibration.
- Quality rules: consistent strategies, trimmed idle time, steady speed, diverse and recorded initial conditions, labelled failures, stable cameras.
- Video dominates storage: raw rate $nWH\cdot3f$ bytes per second; compression reduces it by a factor of tens to hundreds.
- RLDS, LeRobot and HDF5 are the common formats; Open X-Embodiment and DROID are the main open pretraining datasets.
:::

## Exercises

::: exercise Raw rate of one wrist camera {#exr-raw level=1 check="27.648"}
Find the raw data rate of one RGB camera at $640\times480$ and 30 fps. (Enter the rate in MB/s, with 1 MB = $10^6$ bytes.)
::: solution
$640\times480\times3\times30 = 27\,648\,000\,\mathrm{B/s} = 27.648\,\mathrm{MB/s}$.
:::
:::

::: exercise A synchronisation error {#exr-sync level=1 check="4"}
An arm moves at $0.08\,\mathrm{m/s}$ and the images are stamped $50\,\mathrm{ms}$ late. Find the mismatch between image and joint data. (Enter it in mm.)
::: solution
$0.08\times0.050 = 0.004\,\mathrm m = 4\,\mathrm{mm}$.
:::
:::

::: exercise Compressed storage {#exr-comp level=1 check="1.8"}
Two cameras are recorded with H.265 at $2\,\mathrm{Mbit/s}$ each. How much storage does one hour of recording need? (Enter it in GB.)
::: solution
$4\,\mathrm{Mbit/s} = 0.5\,\mathrm{MB/s}$; $0.5\times3600 = 1800\,\mathrm{MB} = 1.8\,\mathrm{GB}$.
:::
:::

::: exercise Idle fraction {#exr-idle level=2 check="0.125"}
Episodes last 32 s on average, of which 4 s are idle at the start and end combined. The recorder runs at 15 Hz. What fraction of steps are idle? (Enter a fraction.)
::: solution
$4/32 = 0.125$; the recording rate cancels.
:::
:::

::: exercise Demonstrations per day {#exr-perday level=2 check="360"}
An operator works 6 hours a day, of which 50 minutes in every hour are productive. Each demonstration takes 45 s including the reset, and 10% are discarded. How many usable demonstrations does the operator produce per day? (Enter the number.)
::: solution
Productive time $6\times50 = 300\,\mathrm{min} = 18\,000\,\mathrm s$; $18\,000/45 = 400$ episodes, of which 90% are usable: $360$ per day.
:::
:::

::: exercise Which interface? {#exr-interface level=2}
Your company wants demonstrations for (a) a two-arm cable-routing task through clips, (b) teaching 20 waypoints for a palletising cell, and (c) wiping arbitrary spills on a table in many different kitchens. Recommend a demonstration interface for each and justify it.
::: solution
(a) Leader–follower arms: bimanual, fast, joint-space mapping gives precise control of both arms and of redundant elbows; cable routing needs coordinated, fine motions. (b) Kinesthetic teaching (or a pendant): the task needs poses, not a reactive policy, and hand-guiding is the quickest way to set waypoints; camera contamination does not matter because no vision policy is trained. (c) A hand-held gripper with a wrist camera (UMI-style) or a portable VR rig: diversity of kitchens matters more than precision, and a hand-held device can be taken to many homes without moving a robot; plan the retargeting and check that the robot can reach the recorded poses.
:::
:::

::: exercise A storage budget {#exr-budget level=3}
A team plans 2,000 hours of data from 10 identical rigs, each with four cameras at $1280\times720$, 30 fps, and joint data at 1 kHz. Estimate (a) raw and (b) compressed storage at $6\,\mathrm{Mbit/s}$ per camera, (c) the network bandwidth needed if all rigs upload compressed data live, and (d) the bandwidth to a training cluster that reads the whole dataset once per training epoch in 24 h. Comment on the design.
::: solution
(a) Raw per rig: $4\times1280\times720\times3\times30 = 332\,\mathrm{MB/s}$; 2,000 h $= 7.2\times10^6\,\mathrm s$, so $332\times10^6\times7.2\times10^6 = 2.4\times10^{15}\,\mathrm B = 2.4\,\mathrm{PB}$. (b) Compressed: $24\,\mathrm{Mbit/s} = 3\,\mathrm{MB/s}$ per rig-hour of recording; $3\times10^6\times7.2\times10^6 = 21.6\,\mathrm{TB}$, plus joint data ($\sim 1000\times30\times4\,\mathrm B = 0.12\,\mathrm{MB/s}$, about $0.9\,\mathrm{TB}$): about $22.5\,\mathrm{TB}$. (c) Ten rigs live: $10\times24 = 240\,\mathrm{Mbit/s}$ — fine on a gigabit link. (d) $22.5\,\mathrm{TB}$ in $86\,400\,\mathrm s$ is $260\,\mathrm{MB/s} \approx 2.1\,\mathrm{Gbit/s}$ sustained, plus video decoding at that rate — the decoder, not the disk, is often the bottleneck, which is why many pipelines pre-decode and down-sample to the training resolution (e.g. $224\times224$) once and store that. Storing raw is out of the question; keep compressed originals and a training-resolution cache.
:::
:::

::: exercise A dataset specification {#exr-spec level=3}
Write the specification (fields, units, frames, rates, metadata) for a demonstration dataset your company will record on its own 6-DOF arm with a parallel gripper, a wrist camera and a scene camera, to fine-tune a VLA. Explain each choice briefly.
::: solution
A good answer contains: per-step fields `timestamp` (s, common clock, capture time for images), `observation.images.wrist` and `.scene` (RGB, stored as video at native resolution and 30 fps, with intrinsics and extrinsics in metadata), `observation.state` (6 joint angles in rad, joint velocities in rad/s, gripper opening in m), optional end-effector pose in the base frame (position in m, orientation as quaternion), `action` (commanded joint targets in rad and gripper command in m — absolute, so it can be converted to deltas later; also log the commanded end-effector pose if teleoperation is Cartesian), flags `is_first`, `is_last`, `is_terminal`, and a `controller` field (human or policy) for intervention data. Episode metadata: instruction text, success label and who judged it, operator id, robot serial number and firmware, gripper model, camera serials and calibration, control rate and recording rates, action-space description (frame, units, absolute/delta), software and dataset version, scene description (lighting, table, objects). Store in a standard format (LeRobot or RLDS) so open training code can read it.
:::
:::
