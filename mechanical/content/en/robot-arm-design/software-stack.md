An arm whose joints are tuned ([[robot-arm-design/joint-control]]) still does nothing useful until software tells it where to go. Between "pick the part from the tray" and "drive 3.2 A into the phase windings of joint 4" lie several layers of software, each running at its own rate, each with its own notion of time, and each able to break the arm in its own way. A planner that takes 400 ms to find a path is perfectly acceptable; a joint controller that is 400 µs late once in a thousand cycles may make a joint buzz, trip a following-error fault or, worse, go unnoticed until a heavy payload is on the arm. This chapter describes that stack as most arms built in 2026 use it: a **robot description** in URDF, the **ROS 2** middleware with its nodes, topics, services, actions and transforms, the **ros2_control** framework that connects controllers to hardware, the **MoveIt 2** motion-planning framework, and the field buses and operating-system features that make the bottom layers deterministic. The emphasis throughout is on budgets — of time, of bandwidth and of trust — and on knowing which layer is responsible for what. Trajectory generation itself is taught in [[robotics/trajectory-planning]], collision-free planning in [[robotics/motion-planning-perception]], and the theory of sampled-data control in [[control-systems/digital-control]]; here we build the software around them.

## A layered architecture {#sec-layers}

Every robot controller, whether it is a vendor's sealed cabinet or a ROS 2 workstation driving open-source drives, separates the same concerns. Listed from the bottom up:

| layer | runs on | typical rate | deadline | what it does |
|---|---|---|---|---|
| Drive firmware | microcontroller or FPGA in the servo drive | 8–32 kHz current loop; 2–8 kHz velocity and position | hard, microseconds | field-oriented current control, PWM, encoder reading, safe torque off, fault detection |
| Real-time joint controller | real-time thread on the robot PC, or the drive itself | 250 Hz–4 kHz (1 kHz is the most common) | hard or firm, sub-millisecond | interpolates the trajectory, closes or feeds the position loop, gravity and friction feedforward, limits |
| Controller manager / trajectory execution | same real-time process | same as above | firm | switches controllers, checks tolerances, reports progress and errors |
| Planning | ordinary (non-real-time) processes | on demand, 10 ms–seconds per query | soft | inverse kinematics, collision checking, path planning, time parameterisation |
| Application | ordinary processes, often on another machine | events | soft | task logic, user interface, vision, cell coordination |

::: definition Hard, firm and soft real-time {#def-realtime}
A computation has a **deadline** if its result is useful only when delivered by a given time after its trigger. The deadline is **hard** if a single miss can cause a failure (a current loop that misses an update can produce an uncontrolled current), **firm** if an occasional miss degrades the result but late results are simply discarded (a 1 kHz position update that arrives after the next cycle has started), and **soft** if late results are still useful but less so (a motion plan). **Latency** is the time from a trigger to the start (or end) of the response; **jitter** is the variation of that latency from cycle to cycle, usually quoted as the worst-case deviation from the nominal period.
:::

The point of the layering is that each deadline is met by the layer best placed to meet it. Nothing above the drive is trusted to keep the motor current under control; nothing above the joint controller is trusted to produce a new set point every millisecond. The planner may be slow and unpredictable because it hands over a complete, time-stamped trajectory and the lower layers execute it without waiting for anyone. And the safety functions — emergency stop, safe torque off, speed and position monitoring — sit outside this stack altogether, in safety-rated hardware ([[robot-arm-design/arm-safety]]), because none of these layers is developed or verified to the integrity a safety function needs.

A useful habit when debugging an arm is to ask, for every symptom, *which layer owns it*. A joint that hums at 1.2 kHz is a current or velocity loop problem in the drive. A tip that overshoots each waypoint is the trajectory controller or its tuning. A path that swings the elbow through a fixture is planning. Fixing a drive-level oscillation by changing the planner's acceleration limit hides the fault rather than removing it.

## Describing the robot: URDF and xacro {#sec-urdf}

Every layer above the drive needs a model of the arm: its kinematic tree, joint limits, masses and inertias, and its shape for drawing and for collision checking. In the ROS ecosystem this is the **Unified Robot Description Format (URDF)**, an XML file of `<link>` and `<joint>` elements. A link carries three optional blocks:

- `<inertial>`: the mass, the position and orientation of the centre of mass in the link frame, and the inertia tensor **about the centre of mass**, expressed in that inertial frame. Dynamics, gravity compensation and simulation use it.
- `<visual>`: a detailed mesh (or primitive shape) for display.
- `<collision>`: a simplified shape for collision checking — a convex hull, a few cylinders and boxes, or a decimated mesh. Collision checks run thousands of times per plan, so collision geometry is deliberately coarse (and slightly inflated) compared with the visual mesh.

A joint connects a `parent` link to a `child` link, places the child frame relative to the parent with `<origin xyz="…" rpy="…"/>` (translation in metres, then fixed-axis roll, pitch and yaw in radians), names the motion axis in the child frame with `<axis>`, and for `revolute` and `prismatic` joints gives `<limit lower upper effort velocity>` in rad (or m), N m (or N) and rad/s (or m/s). URDF describes trees only — a closed chain such as a parallel-gripper linkage must be cut and the loop closure handled elsewhere — and it has no field for acceleration or jerk limits, which MoveIt reads from a separate `joint_limits.yaml`.

Writing a six-joint arm by hand is repetitive, so URDFs are generated from **xacro** (XML macros): files with properties, arithmetic in `${…}`, conditionals and macros, expanded into plain URDF at launch. A fragment of the description of a six-axis arm, with one macro for a cylindrical link's inertia:

```xml
<?xml version="1.0"?>
<robot name="arm6" xmlns:xacro="http://www.ros.org/wiki/xacro">
  <xacro:property name="L2" value="0.425"/>

  <!-- inertia of a solid cylinder of mass m, radius r, length h along its local z -->
  <xacro:macro name="cyl_inertial" params="m r h xyz rpy">
    <inertial>
      <origin xyz="${xyz}" rpy="${rpy}"/>
      <mass value="${m}"/>
      <inertia ixx="${m*(3*r*r + h*h)/12}" ixy="0" ixz="0"
               iyy="${m*(3*r*r + h*h)/12}" iyz="0" izz="${m*r*r/2}"/>
    </inertial>
  </xacro:macro>

  <link name="base_link"/>

  <link name="link_1">
    <xacro:cyl_inertial m="3.7" r="0.06" h="0.15" xyz="0 0 0.08" rpy="0 0 0"/>
    <visual>
      <geometry><mesh filename="package://arm6_description/meshes/visual/link_1.dae"/></geometry>
    </visual>
    <collision>
      <geometry><cylinder radius="0.065" length="0.16"/></geometry>
      <origin xyz="0 0 0.08" rpy="0 0 0"/>
    </collision>
  </link>

  <joint name="joint_1" type="revolute">
    <parent link="base_link"/>
    <child link="link_1"/>
    <origin xyz="0 0 0.089" rpy="0 0 0"/>
    <axis xyz="0 0 1"/>
    <limit lower="${-2*pi}" upper="${2*pi}" effort="150" velocity="3.14"/>
  </joint>

  <link name="link_2">
    <!-- tube along the link's x axis: rotate the cylinder's z onto x -->
    <xacro:cyl_inertial m="4.2" r="0.05" h="${L2}" xyz="${L2/2} 0 0" rpy="0 ${pi/2} 0"/>
    <collision>
      <geometry><cylinder radius="0.055" length="${L2}"/></geometry>
      <origin xyz="${L2/2} 0 0" rpy="0 ${pi/2} 0"/>
    </collision>
  </link>

  <joint name="joint_2" type="revolute">
    <parent link="link_1"/>
    <child link="link_2"/>
    <origin xyz="0 0 0.16" rpy="${pi/2} 0 0"/>
    <axis xyz="0 0 1"/>
    <limit lower="${-pi}" upper="${pi}" effort="150" velocity="3.14"/>
  </joint>
  <!-- … joints 3–6, then a fixed joint to the tool flange frame "tool0" … -->
</robot>
```

Three conventions in this fragment are easy to get wrong. The joint `origin` is the pose of the *child* frame in the *parent* frame at zero joint angle, so the URDF is closer to the product-of-exponentials description of [[robotics/forward-kinematics]] (frames placed freely at the home configuration) than to a DH table, and it is not restricted to DH's four parameters per joint. The `axis` is expressed in the child frame. And the arm ends with a fixed joint to a frame conventionally called `tool0` (the flange, as defined by ISO 9409-1), to which the end effector's own description is attached.

::: proposition Physical consistency of an inertia tensor {#prop-inertia}
The inertia tensor $I_C$ of a rigid body about its centre of mass is symmetric and positive semi-definite, and its principal moments $I_1, I_2, I_3$ satisfy the **triangle inequalities** $I_1 + I_2 \ge I_3$, $I_2 + I_3 \ge I_1$, $I_3 + I_1 \ge I_2$. A URDF `<inertia>` that violates these does not describe any real body, and simulators and identification codes may reject it or behave erratically.
:::

::: proof
By definition $I_C = \int \bigl(\lVert\mathbf r\rVert^2 \mathbf 1 - \mathbf r\mathbf r^{\mathsf T}\bigr)\,dm$ with $\mathbf r$ measured from the centre of mass, which is symmetric. For any unit vector $\mathbf n$, $\mathbf n^{\mathsf T}I_C\mathbf n = \int \bigl(\lVert\mathbf r\rVert^2 - (\mathbf n\cdot\mathbf r)^2\bigr)dm = \int d_n^2\,dm \ge 0$, where $d_n$ is the distance of the mass element from the axis through the centre of mass along $\mathbf n$; so $I_C$ is positive semi-definite. In principal axes with coordinates $(x, y, z)$, $I_1 = \int (y^2 + z^2)\,dm$, $I_2 = \int (z^2 + x^2)\,dm$, $I_3 = \int (x^2 + y^2)\,dm$, hence $I_1 + I_2 - I_3 = 2\int z^2\,dm \ge 0$, and the other two inequalities follow by permuting the axes. Equality holds only for a body with no extent in one direction (a lamina).
:::

::: example Inertial block for an upper-arm link {#ex-inertial}
The upper arm `link_2` above is modelled as a solid cylinder of mass $m = 4.2\,\mathrm{kg}$, radius $r = 0.05\,\mathrm m$ and length $L = 0.425\,\mathrm m$ along the link's $x$ axis, with its centre of mass at the middle. (a) What inertia values does the macro write? (b) Check them against [[#prop-inertia]]. (c) A colleague instead enters the moment of inertia about the joint axis, "because that is what the motor sees". What value would they enter, and what goes wrong?
::: solution
(a) In the cylinder's own frame (axis along $z$), $I_{zz} = \tfrac12 mr^2 = \tfrac12(4.2)(0.05)^2 = 5.25\times10^{-3}\,\mathrm{kg\,m^2}$ and $I_{xx} = I_{yy} = \tfrac1{12}m(3r^2 + L^2) = \tfrac1{12}(4.2)(0.0075 + 0.1806) = 0.0658\,\mathrm{kg\,m^2}$. The `rpy="0 ${pi/2} 0"` of the inertial origin rotates this frame so that the cylinder axis lies along the link's $x$ axis; the tensor values are unchanged because they are given in the rotated inertial frame.

(b) Principal moments $0.00525$, $0.0658$, $0.0658$: $0.00525 + 0.0658 \ge 0.0658$ and $0.0658 + 0.0658 \ge 0.00525$, so the tensor is physically consistent (a long thin body sits close to equality in the first inequality, as expected).

(c) About the joint axis (perpendicular to the link, through one end) the parallel-axis theorem gives $I = 0.0658 + 4.2(0.2125)^2 = 0.256\,\mathrm{kg\,m^2}$. But URDF consumers apply the parallel-axis shift themselves, using the mass and the centre-of-mass position in `<origin>`. Entering $0.256$ counts the $m d^2$ term twice: the model's joint-2 inertia becomes $0.256 + 0.190 = 0.446\,\mathrm{kg\,m^2}$, 74 % too high, and any feedforward or simulation built on it is wrong by that much.

Sanity check: a CAD package reports the same numbers if asked for the inertia "at the centre of mass, aligned with the output coordinate system" — that is the setting to use when exporting.
:::
:::

::: warning Inertia about the wrong point, in the wrong units
The URDF inertia is about the centre of mass, in kg m², in the frame given by the inertial `<origin>`. Three errors recur: exporting the tensor about the link origin (double-counting the parallel-axis term, as in [[#ex-inertial]]); exporting in g mm² or kg mm² (factors of $10^9$ and $10^6$ — a simulated arm that explodes or floats away is the usual sign); and copying the visual mesh as the collision mesh, which makes every collision check slow and the planner apparently "stuck". Check the description by loading it in a viewer with the centres of mass and inertia boxes displayed, and by comparing the gravity torques it predicts with the motor currents measured at rest ([[robot-arm-design/joint-control]]).
:::

## ROS 2 in one section {#sec-ros2}

**ROS 2** (the Robot Operating System, version 2) is not an operating system but a set of libraries and tools for building robot software as many communicating processes. As of 2026 the long-term-support distributions in use are Humble Hawksbill (2022) and Jazzy Jalisco (2024), each supported for five years, with a new long-term release in May of each even year. Its core concepts:

- A **node** is a unit of computation with a name — a camera driver, the robot state publisher, the controller manager, MoveIt's `move_group`. Several nodes may share one process.
- A **topic** is a named, typed, many-to-many stream of messages, used for data that flows continuously: `/joint_states` (`sensor_msgs/msg/JointState`), camera images, wrench readings.
- A **service** is a request–reply call, used for short operations: "switch controllers", "set a parameter", "compute IK for this pose".
- An **action** is a long-running, pre-emptible goal with feedback and a result: "follow this joint trajectory" (`control_msgs/action/FollowJointTrajectory`), "move to this pose". A client can cancel it; the server reports progress.
- **Parameters** configure nodes (gains, joint names, update rates), usually from YAML files at launch.
- **tf2** maintains the tree of coordinate frames over time. Nodes publish time-stamped transforms on `/tf` (changing) and `/tf_static` (fixed), and any node can ask for the transform between two frames *at a given time*. The `robot_state_publisher` node reads the URDF and the `/joint_states` topic and publishes the transform of every link, so the camera frame, the tool frame and the base frame are related automatically.

Underneath, ROS 2 uses a middleware: by default an implementation of the **Data Distribution Service (DDS)** standard of the Object Management Group — Fast DDS is the default, with Cyclone DDS and RTI Connext as alternatives — and, since 2025, a non-DDS option based on Zenoh. DDS provides discovery (nodes find each other without a central master, using multicast on the local network, partitioned by `ROS_DOMAIN_ID`), serialisation and transport, and **quality of service**.

::: definition Quality of service (QoS) {#def-qos}
A **QoS profile** is the set of delivery policies attached to a publisher or subscriber. The main ones are **reliability** (*reliable*: lost samples are retransmitted; *best effort*: they are not), **durability** (*volatile*: late-joining subscribers get only new samples; *transient local*: the publisher keeps the last samples and delivers them to late joiners), **history** with a **depth** (*keep last N* or *keep all*), and the timing policies **deadline**, **lifespan** and **liveliness**. A subscription receives data from a publisher only if their profiles are **compatible**: for example a *reliable* subscriber cannot be matched to a *best-effort* publisher, and a *transient-local* subscriber cannot be matched to a *volatile* publisher.
:::

QoS is chosen by the data's meaning. Sensor streams use best effort with a short history: a stale image is worthless, and retransmitting it delays the next one. Commands and state that must not be lost use reliable delivery. Data that is published once and must reach nodes that start later — the robot description, a map — uses transient-local durability; `robot_state_publisher` publishes `/robot_description` that way. In Python:

```python
from rclpy.qos import QoSProfile, ReliabilityPolicy, HistoryPolicy, DurabilityPolicy

sensor_qos = QoSProfile(depth=5,
                        reliability=ReliabilityPolicy.BEST_EFFORT,
                        history=HistoryPolicy.KEEP_LAST)
latched_qos = QoSProfile(depth=1,
                         reliability=ReliabilityPolicy.RELIABLE,
                         durability=DurabilityPolicy.TRANSIENT_LOCAL)
```

ROS 2 topics are *not* the right channel for a 1 kHz control loop between processes. Each message passes through serialisation, the middleware and the network stack (or shared memory), with latencies of tens to hundreds of microseconds and a long, workload-dependent tail. The control loop therefore runs *inside one process*, the controller manager, and ROS 2 topics and actions carry only the slower traffic to and from it. A few command-line tools cover most first checks of a running system:

```bash
ros2 node list
ros2 topic hz /joint_states                 # is state published at the expected rate?
ros2 topic info -v /joint_states            # publishers, subscribers and their QoS
ros2 run tf2_ros tf2_echo base_link tool0   # current flange pose
ros2 control list_controllers               # loaded controllers and their states
ros2 control list_hardware_interfaces       # claimed and available interfaces
```

::: quiz
A camera driver publishes images with the sensor-data profile (best effort, keep last 5). A new vision node subscribes with a default profile (reliable, keep last 10) and receives nothing, with no error message other than a QoS warning. Why?
- [ ] The history depths differ, so the profiles are incompatible.
- [x] A reliable subscription is incompatible with a best-effort publisher, so the two are never matched.
- [ ] Images are too large for reliable delivery.
- [ ] The subscriber must use transient-local durability to receive data that was published before it started.
::: solution
Reliability is "requested versus offered": a subscriber that *requests* reliable delivery cannot be served by a publisher that only *offers* best effort, so DDS does not connect them. The opposite combination (best-effort subscriber, reliable publisher) is compatible. History depth is local to each side and never causes incompatibility. The fix is to subscribe with the sensor-data profile; `ros2 topic info -v` shows each endpoint's profile.
:::
:::

## ros2_control: controllers meet hardware {#sec-ros2-control}

**ros2_control** is the framework that runs the real-time joint layer. Its central object is the **controller manager**, which runs a loop at a fixed `update_rate`: in each cycle it calls `read()` on every hardware component, then `update()` on every active controller, then `write()` on every hardware component. Data passes through **interfaces**: a hardware component exports **state interfaces** (for example `joint_1/position`, `joint_1/velocity`, `joint_1/effort`) and **command interfaces** (`joint_1/position` or `joint_1/velocity` or `joint_1/effort`), and each controller *claims* the command interfaces it writes, so two controllers can never command the same joint at once.

Hardware components come in three kinds: a **system** (several joints behind one bus or one driver — the usual case for an arm on EtherCAT), an **actuator** (one joint) and a **sensor** (read-only, such as a force–torque sensor). Each is a C++ plugin with a lifecycle — `on_init`, `on_configure`, `on_activate`, `on_deactivate`, `on_error` — and the two cyclic methods

```cpp
hardware_interface::return_type read(const rclcpp::Time & time, const rclcpp::Duration & period) override;
hardware_interface::return_type write(const rclcpp::Time & time, const rclcpp::Duration & period) override;
```

which must be real-time safe: no memory allocation, no blocking calls, no file or console I/O. The hardware is declared in the robot description:

```xml
<ros2_control name="arm6_system" type="system">
  <hardware>
    <plugin>arm6_hardware/Arm6EthercatSystem</plugin>
    <param name="cycle_time_us">1000</param>
  </hardware>
  <joint name="joint_1">
    <command_interface name="position"/>
    <state_interface name="position"/>
    <state_interface name="velocity"/>
    <state_interface name="effort"/>
  </joint>
  <!-- … joint_2 to joint_6 … -->
</ros2_control>
```

Replacing the plugin with `mock_components/GenericSystem` gives a "perfect" arm that echoes commands back as states, which lets the whole stack above it be tested without hardware; `gz_ros2_control` connects the same controllers to a Gazebo simulation.

The controllers themselves are plugins configured in YAML. Almost every arm runs two:

```yaml
controller_manager:
  ros__parameters:
    update_rate: 1000        # Hz
    joint_state_broadcaster:
      type: joint_state_broadcaster/JointStateBroadcaster
    arm_controller:
      type: joint_trajectory_controller/JointTrajectoryController

arm_controller:
  ros__parameters:
    joints: [joint_1, joint_2, joint_3, joint_4, joint_5, joint_6]
    command_interfaces: [position]
    state_interfaces: [position, velocity]
```

The **joint state broadcaster** reads the state interfaces and publishes `/joint_states`. The **joint trajectory controller** (JTC) accepts a `trajectory_msgs/JointTrajectory` — a list of time-stamped waypoints — through its `follow_joint_trajectory` action (or a topic), **interpolates** between the waypoints at the controller rate, and writes the interpolated set point to its command interfaces. The interpolation follows the data given: linear if the waypoints contain positions only, cubic with positions and velocities, quintic with positions, velocities and accelerations — exactly the polynomial time scalings of [[robotics/trajectory-planning]]. When the command interface is velocity or effort, the JTC closes a PID loop on the position error itself. It also checks **path and goal tolerances** on position and timing and aborts the goal, holding position, if the joints fall outside them.

Which command interface to use is a design decision about where the position loop lives. With **position** commands, the position loop runs in the drive at 4–8 kHz with the drive's own feedforward, and the PC only streams interpolated set points (the standard "cyclic synchronous position" mode of industrial drives, below). With **effort** (torque) commands, the PC closes the position loop and can add model-based terms — gravity compensation, computed torque, impedance control ([[robotics/robot-control]]) — but then the PC's timing becomes part of the joint servo, and every microsecond of its jitter matters.

## MoveIt 2: planning and servoing {#sec-moveit}

**MoveIt 2** is the motion-planning framework that sits above ros2_control. Its main node, `move_group`, combines:

- the **robot model**: the URDF plus an **SRDF** (semantic robot description) that defines planning groups ("arm", "gripper"), named poses ("home", "ready"), the end effector and the pairs of links that can never collide and need not be checked;
- the **planning scene**: the current robot state, the objects attached to the robot (the tool, a grasped part) and the world geometry — boxes, meshes and an occupancy map built from depth cameras — maintained by a planning scene monitor that listens to `/joint_states`, tf and scene updates;
- **kinematics plugins** that solve inverse kinematics for each group: the numerical KDL solver is the default, with TRAC-IK, pick_ik and analytical IKFast solvers as alternatives ([[robotics/inverse-kinematics]]);
- **planning pipelines**: OMPL (the Open Motion Planning Library, whose sampling-based planners such as RRT-Connect are described in [[robotics/motion-planning-perception]]), the Pilz industrial motion planner (deterministic point-to-point, straight-line and circular motions, like an industrial controller's PTP, LIN and CIRC commands), and optimising planners (CHOMP, STOMP);
- **time parameterisation**: a planner returns a geometric path; an adapter then assigns times to its waypoints within the velocity and acceleration limits of `joint_limits.yaml` — by default with a time-optimal algorithm (TOTG), optionally smoothed to bounded jerk with Ruckig;
- **trajectory execution**, which sends the timed trajectory to the JTC's action server and monitors it.

Planning answers "how do I get from here to there without hitting anything", given a scene that is assumed static during the motion. For continuous, reactive motion — teleoperation with a space mouse, visual servoing towards a moving target — MoveIt provides **MoveIt Servo**, a node that accepts Cartesian velocity (twist) or joint-jog commands, converts them to joint velocities through the Jacobian ([[robotics/jacobians]]), slows down near singularities and collisions, and streams short trajectories or direct commands to a controller, typically at 100–500 Hz.

::: algorithm Bringing up a new arm in ROS 2 {#alg-bringup}
1. Write the xacro description: kinematics from the CAD at zero joint angles, inertials about the centres of mass, coarse collision geometry, joint limits from the data sheets. Check it in a viewer, moving each joint, and against [[#prop-inertia]].
2. Add the `<ros2_control>` block with the mock hardware and run the joint state broadcaster and the JTC on it. Send a slow trajectory and verify that `/joint_states` and tf follow.
3. Generate the MoveIt configuration (SRDF, kinematics, joint limits with accelerations) with the MoveIt Setup Assistant; plan and execute against the mock hardware, including near joint limits and around added collision objects.
4. Replace the mock with the real hardware plugin. With the arm in a safe pose, power reduced and the safety system active, verify direction and scaling of every joint (command $+0.1\,\mathrm{rad}$, check the motion with a protractor or the encoder), the encoder zero against the description's zero, and the limits.
5. Measure the timing of the real-time loop under load (below) before raising speeds; then tune, then raise speed and payload in steps.
:::

## Real-time constraints {#sec-realtime}

### Operating system and threads

The controller manager's loop is an ordinary Linux thread unless steps are taken. A stock kernel can delay a ready thread by milliseconds when the disc, the graphics driver or a burst of network interrupts holds the processor. Three measures make it predictable:

- **PREEMPT_RT**: the real-time patch set, merged into the mainline Linux kernel in version 6.12 (2024), makes almost all kernel code pre-emptible and turns interrupt handlers into schedulable threads, so a high-priority user thread can run within tens of microseconds of becoming ready on a well-configured machine. It does not make a slow program fast; it bounds how long the program waits.
- **Scheduling and memory**: the control thread runs under the `SCHED_FIFO` policy at a high priority, its memory is locked (`mlockall`) and pre-allocated so that no page fault or allocation occurs in the loop, and it may be pinned to a CPU core isolated from other work, with network interrupts steered to that core.
- **Real-time-safe code**: inside `read`/`update`/`write`, no `new`/`malloc`, no mutex that a non-real-time thread can hold for long, no logging, no ROS 2 publishing except through lock-free helpers (`realtime_tools::RealtimePublisher`, `RealtimeBuffer`) that hand data to a non-real-time thread.

The latency of a configured machine is measured, not assumed: the `cyclictest` tool runs a periodic thread for hours under a stress load and reports the worst wake-up latency observed. Typical results for a tuned PREEMPT_RT industrial PC are a worst case of some tens of microseconds; the same machine on a stock kernel may show occasional delays of several milliseconds. The worst case, not the average, is what goes into the budget.

### Field buses

Between the PC and the drives runs a field bus. The two common choices for arms are:

- **EtherCAT** (IEC 61158, introduced by Beckhoff in 2003): standard 100 Mbit/s Ethernet frames that pass through every drive in a line; each drive reads its commands and inserts its feedback *on the fly* as the frame passes, so one frame serves all axes in a few tens of microseconds. **Distributed clocks** synchronise the drives' local clocks to well under a microsecond, so every axis samples its encoder and applies its new set point at the same instant (the SYNC0 event), independent of the master's jitter. Drives usually implement the **CiA 402** drive profile (CANopen over EtherCAT): a state machine (switch on disabled → ready to switch on → switched on → operation enabled, plus quick stop and fault) driven by the controlword (object 0x6040) and reported in the statusword (0x6041), and the cyclic synchronous modes **CSP**, **CSV** and **CST** (position, velocity, torque) with target position at 0x607A and actual position at 0x6064.
- **CAN** (ISO 11898): a two-wire multi-master bus at up to 1 Mbit/s with 8 data bytes per frame, cheap and robust, common on small and research arms and on integrated joint modules. **CAN FD** keeps the arbitration phase at up to 1 Mbit/s but switches to a faster data phase (commonly 2–5 Mbit/s, sometimes 8) and allows up to 64 data bytes. CANopen (CiA 301) and the same CiA 402 profile run over both.

::: example Bus budget for a six-axis arm at 1 kHz {#ex-bus}
Each joint needs, every cycle, a command (target position, 4 bytes, plus a few bytes of control) and feedback (position, velocity, status: up to 8 bytes). Compare (a) classic CAN at 1 Mbit/s with one command frame and one feedback frame of 8 data bytes per joint, (b) CAN FD with a 5 Mbit/s data phase, one 24-byte command frame for all six joints and six 8-byte feedback frames, and (c) EtherCAT with 12 output and 16 input bytes per drive.
::: solution
(a) A classic CAN frame with an 11-bit identifier and 8 data bytes is 108 bits plus a 3-bit interframe space, 111 bits, and bit stuffing can add up to 24 more: 111–135 bits, i.e. $111$–$135\,\mathrm{\mu s}$ at 1 Mbit/s. Twelve frames per cycle need up to $12\times135 = 1620\,\mathrm{\mu s}$, more than the $1000\,\mathrm{\mu s}$ period. Classic CAN cannot run this arm at 1 kHz; it manages about 300–400 Hz at a sensible bus load ($\le$ 50–60 %), or 1 kHz for two or three joints per bus.

(b) A CAN FD frame has about 29 bits at the nominal rate (arbitration, acknowledgement, end of frame, interframe space): $29\,\mathrm{\mu s}$. In the data phase an 8-byte frame carries about 95 bits (data, length code, 17-bit CRC and stuff count) and a 24-byte frame about 228 bits (21-bit CRC); allowing 20 % for stuffing, these take $23\,\mathrm{\mu s}$ and $55\,\mathrm{\mu s}$ at 5 Mbit/s. So the frames take about $52\,\mathrm{\mu s}$ and $84\,\mathrm{\mu s}$, and a cycle needs $84 + 6\times52 \approx 395\,\mathrm{\mu s}$: a bus load of about 40 % at 1 kHz. Feasible, with modest headroom.

(c) EtherCAT: one frame with $6\times(12+16) = 168$ bytes of process data. Adding the preamble (8 bytes), Ethernet header (14), EtherCAT header (2), datagram header (10), working counter (2), checksum (4) and interframe gap (12) gives 220 bytes, i.e. $220\times8\times10\,\mathrm{ns} = 17.6\,\mathrm{\mu s}$ on the wire, plus a fraction of a microsecond of forwarding delay per drive: roughly $25\,\mathrm{\mu s}$ for the round trip, 2.5 % of the cycle. The same bus could run at 4–8 kHz or serve many more axes.

Sanity check: the ratio of raw bit rates (100 : 1) roughly matches the ratio of cycle times (25 µs against well over 1 ms for classic CAN); EtherCAT gains a further factor because one frame with one header serves all drives. The estimates for CAN FD depend on the exact bit timing and stuffing; a real design is checked with the bus controller's timing calculator and measured with a bus analyser.
:::
:::

::: widget plot
f: 100*N*2*F*x/1000000
x: 100, 2000
y: 0, 150
sliders: N=6:1:12:1; F=135:50:140:1
hlines: 50; 100
labels: \text{bus load (\%)}
caption: Bus load (per cent) against control rate $R$ in Hz for $N$ joints, each needing one command and one feedback frame of duration $F$ in µs per cycle. With classic CAN at 1 Mbit/s ($F \approx 111$–$135\,\mu\mathrm s$), six joints cross the 50 % design line at about 310–375 Hz and saturate the bus near 620–750 Hz. Set $F = 52$ (an 8-byte CAN FD frame at 5 Mbit/s) and the same arm stays below 65 % at 1 kHz even with separate command frames.
:::

### A latency and jitter budget

A timing budget lists every delay from the moment a joint's position is measured to the moment the corresponding correction acts on the motor, and checks that each part of the cycle fits its window.

::: proposition Phase lag of a dead time {#prop-delay}
A pure delay $T_d$ has the transfer function $e^{-sT_d}$, unit gain at all frequencies and phase $-\omega T_d$. Inserted in a feedback loop whose open-loop crossover frequency is $\omega_c$, it reduces the phase margin by
$$
\Delta\phi = \omega_cT_d\ \text{rad} = 360^\circ f_cT_d ,
$$ {#eq-delay-phase}
with $f_c = \omega_c/2\pi$ in Hz. A zero-order hold that keeps each sample for one period $T$ behaves, at frequencies well below $1/T$, like a delay of $T/2$.
:::

::: proof
On the imaginary axis $e^{-j\omega T_d} = \cos\omega T_d - j\sin\omega T_d$ has modulus 1 and argument $-\omega T_d$. Multiplying the open-loop transfer function by it leaves the magnitude, and therefore the crossover frequency $\omega_c$ where the magnitude is 1, unchanged, and subtracts $\omega_cT_d$ from the phase there; the phase margin is $180^\circ$ plus the phase at $\omega_c$, so it falls by the same amount. For the hold, the response to a unit impulse is a pulse of height 1 and width $T$, with transform $(1 - e^{-sT})/s = T e^{-sT/2}\,\dfrac{\sinh(sT/2)}{sT/2}$. On $s = j\omega$ the last factor is $\sin(\omega T/2)/(\omega T/2)$, which is real and close to 1 for $\omega T \ll 1$, so the hold contributes the gain $T$ (absorbed by the sampler's $1/T$) and the phase of $e^{-j\omega T/2}$: a delay of $T/2$.
:::

::: example Timing budget of a 1 kHz torque-controlled joint loop {#ex-budget}
An arm runs ros2_control at 1 kHz on a PREEMPT_RT PC, with EtherCAT drives in cyclic synchronous torque mode, so the PC closes the position loop and adds gravity compensation. Measured worst cases: wake-up latency $80\,\mathrm{\mu s}$ (cyclictest under load), `read()` $30\,\mathrm{\mu s}$, controller `update()` for six joints with the dynamics model $150\,\mathrm{\mu s}$, `write()` $30\,\mathrm{\mu s}$, EtherCAT frame $25\,\mathrm{\mu s}$. The drives sample the encoders and apply the commanded torque at the distributed-clock SYNC0 event; the current loop adds about $100\,\mathrm{\mu s}$ of delay. (a) Does the cycle fit? (b) What is the effective delay from measurement to torque, and what does it cost in phase margin for a position loop with a crossover of 20 Hz? (c) What if the PC's loop is moved onto a stock kernel with occasional 3 ms stalls?
::: solution
(a) The work that must finish within one cycle, from the timer firing to the frame leaving, is $80 + 30 + 150 + 30 + 25 = 315\,\mathrm{\mu s}$ in the worst case, well inside $1000\,\mathrm{\mu s}$, leaving 68 % margin for growth (a heavier model, a second arm).

(b) With distributed clocks, a position sampled at SYNC0 of cycle $k$ travels to the PC in the frame of cycle $k$, the new torque is computed and sent, and the drive applies it at SYNC0 of cycle $k + 1$: one full period, $1.0\,\mathrm{ms}$. The torque is then held for one period (zero-order hold, worth $0.5\,\mathrm{ms}$ by [[#prop-delay]]), and the current loop adds $0.1\,\mathrm{ms}$. Total effective delay $T_d \approx 1.6\,\mathrm{ms}$. At $f_c = 20\,\mathrm{Hz}$, [[#eq-delay-phase]] gives $\Delta\phi = 360^\circ\times20\times0.0016 = 11.5^\circ$ of phase margin lost — acceptable if the loop was designed with 45–60° of margin, but it already caps the bandwidth: at $f_c = 60\,\mathrm{Hz}$ the same delay would cost $35^\circ$.

(c) A 3 ms stall means three missed cycles. The drive keeps applying the last torque — with gravity compensation in it, the arm does not fall, but the position loop is open for 3 ms, during which a joint accelerating at $20\,\mathrm{rad/s^2}$ drifts $\tfrac12(20)(0.003)^2 = 9\times10^{-5}\,\mathrm{rad}$ — and when the loop resumes it sees a sudden error and a velocity estimate computed over the wrong interval. Most CiA 402 drives detect missing frames with a watchdog and fault after a set number, stopping the arm. The stall is therefore at best a jerk and a following-error spike, at worst a nuisance stop several times an hour. The cure is the real-time kernel, not a larger tolerance.

Sanity check: the budget is dominated not by computation but by the *structure* of the loop — one sample period of transport and half a period of hold. Halving the delay requires a 2 kHz loop, or moving the position loop into the drive (position mode) and sending only feedforward torque from the PC.
:::
:::

::: widget plot
f: 360*x*T/1000
x: 0, 100
y: 0, 90
sliders: T=1.6:0.2:5:0.1
hlines: 15; 30
labels: \Delta\phi\ (^\circ)
caption: Phase margin lost to a dead time of $T$ milliseconds (slider) against the loop crossover frequency in Hz, from [[#eq-delay-phase]]. With the $1.6\,\mathrm{ms}$ of [[#ex-budget]], a 20 Hz loop loses about $12^\circ$; push the crossover to 50 Hz and the loss is about $29^\circ$. Halve the delay and the usable bandwidth doubles — which is why fast joint loops live in the drive and not on the PC.
:::

### Time stamps and transforms

Delay matters above the real-time layer too, in a different form. A camera image, a force reading and a joint state each describe the world at the moment they were *measured*, which can be tens of milliseconds before they are processed. ROS 2 messages carry a header time stamp for this reason, and tf2 interpolates transforms to the requested time. The common error is to look up "the latest" transform instead of the transform at the image's time stamp.

::: example A stale transform in eye-in-hand vision {#ex-stale}
A camera on the wrist of an arm images a part while the arm moves at $0.5\,\mathrm{m/s}$. The image is captured, transmitted and processed with a total latency of $40\,\mathrm{ms}$; the vision node then converts the detected part position to the base frame using the latest camera pose from tf. How large is the error, and how is it removed?
::: solution
In $40\,\mathrm{ms}$ the camera moves $0.5\times0.040 = 0.020\,\mathrm m = 20\,\mathrm{mm}$. Using the camera pose at processing time instead of at capture time places the part 20 mm away from where it really is, in the direction opposite to the motion — far more than the arm's repeatability or the camera's resolution. The fix is to stamp the image with its capture time (from the camera's hardware trigger or exposure clock, synchronised to the robot's clock) and ask tf2 for the transform *at that time*; tf2 interpolates between the joint-state samples on either side. A residual error remains from clock offsets: with clocks synchronised to $1\,\mathrm{ms}$ the error falls to $0.5\,\mathrm{mm}$. Sanity check: for a stationary arm the error vanishes, which is why such bugs often survive testing with the arm stopped.
:::
:::

::: remark Where vendor controllers fit
Industrial arms from the major manufacturers ship with closed controllers that implement the same layers internally, with their own languages and planners. Integrations usually keep the vendor's real-time layer and stream positions to it through a vendor interface (for example, external-guidance or position-streaming options at 4–250 Hz, depending on the vendor), with ROS 2 drivers wrapping that interface as a ros2_control hardware component. Then the vendor's interpolation and filtering add to the latency budget, and the documentation of that interface — accepted rate, buffering, behaviour on a missed packet — must be read as carefully as a bus specification.
:::

::: history
The Robot Operating System grew from software written at Stanford's STAIR project and was developed from 2007 at Willow Garage, whose PR2 robot was its first major platform; ROS 1.0 followed in 2010, and the URDF and tf libraries date from that period. Motion planning in ROS was consolidated as MoveIt by Ioan Șucan, Sachin Chitta and colleagues in 2011–2012, building on the Open Motion Planning Library of Șucan, Mark Moll and Lydia Kavraki. ROS 1 relied on a central master and custom TCP transport, unsuited to real-time and multi-robot use; ROS 2, rebuilt on the DDS standard, had its first distribution, Ardent Apalone, in December 2017, and MoveIt 2 and ros2_control matured over the following releases. On the real-time side, Bosch presented the CAN bus in 1986, CAN FD was presented in 2012, Beckhoff introduced EtherCAT in 2003, and the PREEMPT_RT patches, maintained outside the main kernel for about twenty years, were merged into Linux 6.12 in 2024.
:::

## Exercises

::: exercise Classic CAN frame time {level=1 check="222"}
A classic CAN frame with 8 data bytes and no stuff bits occupies 111 bit times including the interframe space. How long does it take at 500 kbit/s? (Enter the time in µs.)
::: solution
At 500 kbit/s one bit lasts $2\,\mathrm{\mu s}$, so the frame takes $111\times2 = 222\,\mathrm{\mu s}$ (up to $270\,\mathrm{\mu s}$ with worst-case stuffing). Two such frames per joint for six joints take at least $2.66\,\mathrm{ms}$ — the bus would be saturated at about 375 Hz.
:::
:::

::: exercise Phase cost of a delay {level=1 check="10.8"}
A position loop has a crossover frequency of 15 Hz. A software change adds $2\,\mathrm{ms}$ of delay. By how much does the phase margin fall? (Enter the angle in degrees.)
::: solution
By [[#eq-delay-phase]], $\Delta\phi = 360^\circ\times15\times0.002 = 10.8^\circ$.
:::
:::

::: exercise Inertia of a box link {level=1 check="0.002133"}
A link is modelled as a solid box of mass $2.0\,\mathrm{kg}$, $80\times80\,\mathrm{mm}$ in section and $400\,\mathrm{mm}$ long along its $z$ axis. What is $I_{zz}$ about its centre of mass? Check the triangle inequalities. (Enter $I_{zz}$ in kg m², to four significant figures.)
::: solution
For a box with sides $a, b, c$ along $x, y, z$, $I_{zz} = \tfrac1{12}m(a^2 + b^2) = \tfrac1{12}(2.0)(0.0064 + 0.0064) = 0.002133\,\mathrm{kg\,m^2}$, and $I_{xx} = I_{yy} = \tfrac1{12}(2.0)(0.0064 + 0.16) = 0.02773\,\mathrm{kg\,m^2}$. Then $I_{xx} + I_{zz} = 0.0299 \ge I_{yy} = 0.0277$ ✓ and $I_{xx} + I_{yy} \ge I_{zz}$ ✓.
:::
:::

::: exercise Stale transform {level=2 check="12"}
A wrist camera moves at $0.8\,\mathrm{m/s}$; its images reach the vision node $15\,\mathrm{ms}$ after exposure, and the node uses the latest tf transform. What position error does this cause? (Enter the error in mm.)
::: solution
$0.8\,\mathrm{m/s}\times0.015\,\mathrm s = 0.012\,\mathrm m = 12\,\mathrm{mm}$, along the direction of motion. Looking up the transform at the image's time stamp removes it ([[#ex-stale]]).
:::
:::

::: exercise How many joints on one CAN FD bus? {level=2 check="4"}
Each joint on a CAN FD bus (1 Mbit/s arbitration, 5 Mbit/s data) uses one 8-byte command frame and one 8-byte feedback frame per cycle, each lasting about $52\,\mathrm{\mu s}$. How many joints can share the bus at 1 kHz if the bus load must stay at or below 50 %? (Enter the number of joints.)
::: solution
Per joint $2\times52 = 104\,\mathrm{\mu s}$ per $1000\,\mathrm{\mu s}$ cycle, i.e. 10.4 % load. $0.50/0.104 = 4.8$, so 4 joints. Packing all commands into one longer frame ([[#ex-bus]]) raises this to six; a six-axis arm on separate frames needs two buses.
:::
:::

::: exercise Velocity from a jittery loop {level=2 check="5"}
A joint's velocity is estimated as $(q_k - q_{k-1})/T$ with the nominal period $T = 1\,\mathrm{ms}$, but in one cycle the actual sampling interval was $1.05\,\mathrm{ms}$. By what percentage does the estimate exceed the true velocity in that cycle? How do EtherCAT distributed clocks avoid this? (Enter the error in per cent.)
::: solution
The true velocity is $\Delta q/(1.05\,\mathrm{ms})$; the estimate is $\Delta q/(1.00\,\mathrm{ms})$, larger by the factor $1.05$: a $5\,\%$ overestimate, which a derivative or velocity-feedback term passes straight into the torque command as a spurious kick. With distributed clocks the drives sample at the synchronised SYNC0 instant, so the sampling interval is exact to well under a microsecond even if the master's software cycle jitters; the jitter then affects only when the data is *processed*, not when it was *measured*. Without synchronised sampling, the estimate should at least use measured time stamps instead of the nominal period.
:::
:::

::: exercise Choosing the interpolation {level=2}
A planner sends the joint trajectory controller waypoints every $100\,\mathrm{ms}$ containing positions only. The arm moves with visible "corners" in velocity at every waypoint. Explain why, and give two remedies.
::: solution
With positions only, the JTC interpolates linearly between waypoints, so the velocity is piecewise constant and jumps at every waypoint: the acceleration is an impulse there, which the joint servos follow as a jerk and the arm shows as a small knock. Remedies: (1) send velocities (and ideally accelerations) with each waypoint, so that the JTC uses cubic (or quintic) splines with continuous velocity (and acceleration), as in [[robotics/trajectory-planning]]; (2) time-parameterise the path with a jerk-limited algorithm and send it densely; (3) for streaming applications, use a servo or streaming interface designed for it rather than many short trajectories. Waypoints with inconsistent velocities, however, give overshooting cubics: the velocities must come from a proper time parameterisation.
:::
:::

::: exercise The hold as a half-period delay {level=3}
Show that the phase of a zero-order hold followed by its sampler gain $1/T$ is exactly $-\omega T/2$ for all $\omega < 2\pi/T$, and find the frequency at which its gain has dropped by 3 dB. For a 1 kHz loop, compare the phase lag at 20 Hz with the value from [[#prop-delay]].
::: solution
From the proof of [[#prop-delay]], $(1/T)(1 - e^{-j\omega T})/(j\omega) = e^{-j\omega T/2}\,\dfrac{\sin(\omega T/2)}{\omega T/2}$. The second factor is real and positive for $0 < \omega T/2 < \pi$, i.e. $\omega < 2\pi/T$, so the phase is exactly $-\omega T/2$ there. The gain $\sin x/x$ with $x = \omega T/2$ equals $1/\sqrt2$ at $x \approx 1.392$, i.e. $\omega \approx 2.78/T$ or $f \approx 0.443/T$ — about 443 Hz for a 1 kHz loop. At 20 Hz the phase lag is $\omega T/2 = 2\pi(20)(0.001)/2 = 0.0628\,\mathrm{rad} = 3.6^\circ$, the same as a $0.5\,\mathrm{ms}$ delay: $360^\circ\times20\times0.0005 = 3.6^\circ$ ✓. The gain loss at 20 Hz is negligible ($\sin x/x = 0.9993$).
:::
:::

::: exercise A real-time budget for force control {level=3}
A seven-axis research arm must run an impedance controller ([[robotics/robot-control]]) at 1 kHz with a wrist force–torque sensor read over EtherCAT and a model-based controller taking $250\,\mathrm{\mu s}$ worst case. Wake-up latency on the chosen PC under load is $120\,\mathrm{\mu s}$ worst case; read and write together take $60\,\mathrm{\mu s}$; the EtherCAT frame round trip is $30\,\mathrm{\mu s}$. (a) What fraction of the period is used? (b) The team proposes to add a collision-checking call to MoveIt from inside `update()`. Comment. (c) What happens to the effective delay, and to the achievable stiffness of the impedance loop, if the rate is raised to 2 kHz?
::: solution
(a) $120 + 60 + 250 + 30 = 460\,\mathrm{\mu s}$: 46 % of $1000\,\mathrm{\mu s}$. Acceptable, with margin for spikes, but it should be re-measured with all features enabled.
(b) A call to another node is a blocking request through the middleware with unbounded latency, and collision checking itself has data-dependent run time and allocates memory: it must not run in the real-time thread. Collision avoidance belongs in planning or in a separate, slower supervisory loop that adjusts the controller's set point through a real-time-safe buffer.
(c) At 2 kHz the period is $500\,\mathrm{\mu s}$; the worst-case work of $460\,\mathrm{\mu s}$ leaves only 8 % margin, too little, so the controller must be made faster first. If it fits, the effective delay (one period of transport plus half a period of hold) falls from about $1.5\,\mathrm{ms}$ to $0.75\,\mathrm{ms}$, so for the same phase margin the loop bandwidth, and the stiffness that can be rendered stably against a stiff environment, roughly double. In practice the stable stiffness of impedance control is limited by exactly this delay together with sensor noise and joint flexibility.
:::
:::

::: exercise Architecture for a vision-guided bin-picking cell {level=3}
Sketch the software architecture for a six-axis arm with a parallel gripper, a fixed 3D camera above a bin, and a PLC that supplies the cell's start and stop signals. Assign each function to a layer, give its rate and deadline class ([[#def-realtime]]), name the ROS 2 mechanism (topic, service, action, tf) used at each interface, and say which functions must *not* be implemented in this software at all.
::: solution
One reasonable answer. *Drive firmware* (16 kHz current, 4 kHz position, hard): FOC, CSP mode, STO input. *Real-time layer* (1 kHz, firm): ros2_control with an EtherCAT system plugin, joint state broadcaster, JTC in position mode; a gripper controller (or a separate gripper driver node using an action such as `control_msgs/action/GripperCommand`). *Planning* (soft): MoveIt `move_group` with the bin and cell modelled in the planning scene, Pilz LIN for the final approach and OMPL for transfers; plans sent to the JTC by the `follow_joint_trajectory` action. *Perception* (camera at 5–10 Hz, soft): point cloud on a best-effort topic; a pose-estimation node publishes grasp candidates; the camera frame is related to the base by a static transform from hand–eye calibration ([[robot-arm-design/calibration]]) on `/tf_static`. *Application* (events): a task node (behaviour tree or state machine) calls the perception service, requests plans, executes them and handles failures; a bridge to the PLC (for example over OPC UA or a fieldbus gateway) for cell start, stop and status. *Not in this software*: the emergency stop, guard interlocks, safe speed or zone monitoring, and the STO — these belong to the safety-rated controller and wiring ([[robot-arm-design/arm-safety]]); the ROS software may only *read* their state.
:::
:::

::: summary
- Layer the software by deadline: drive firmware (tens of kHz, hard), real-time joint controller (≈1 kHz, firm), trajectory execution, planning (soft), application. Safety functions sit outside the stack in safety-rated hardware.
- URDF describes links (inertial about the centre of mass, visual, coarse collision geometry) and joints (origin of child in parent at zero, axis in child frame, limits); xacro generates it. Inertia tensors must satisfy the triangle inequalities ([[#prop-inertia]]).
- ROS 2: nodes, topics (streams), services (calls), actions (long goals), parameters, tf2 (time-stamped frames), over DDS or Zenoh. QoS profiles must be compatible; sensor data uses best effort, latched data transient local.
- ros2_control: the controller manager calls `read`, `update`, `write` at a fixed rate; hardware exports state and command interfaces; the joint trajectory controller interpolates waypoints (linear, cubic, quintic) and checks tolerances.
- MoveIt 2: URDF + SRDF, planning scene, IK plugins, OMPL/Pilz/optimising planners, time parameterisation, trajectory execution; MoveIt Servo for reactive Cartesian motion.
- Real time: PREEMPT_RT (mainline since Linux 6.12), FIFO scheduling, locked memory, no allocation or blocking in the loop; measure worst-case latency. EtherCAT with distributed clocks serves many axes in tens of µs; classic CAN cannot run six axes at 1 kHz; CAN FD can.
- A dead time $T_d$ costs $360^\circ f_cT_d$ of phase margin; a loop on a PC has about 1.5 periods of delay. Use time stamps and tf lookups at measurement time.
:::

## Further reading

The ROS 2, ros2_control and MoveIt 2 documentation (docs.ros.org, control.ros.org, moveit.picknik.ai) contains tutorials for every step of [[#alg-bringup]], and should be read for the distribution in use, because interfaces change between releases. Quigley, Gerkey and Smart remain a good introduction to the concepts. The EtherCAT Technology Group publishes introductions to EtherCAT and distributed clocks; the CiA 402 profile is published by CAN in Automation. For real-time Linux, the documentation of the Linux Foundation's real-time project explains configuration and measurement with `cyclictest`.
