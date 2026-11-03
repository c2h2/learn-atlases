关节已经调好 ([[robot-arm-design/joint-control]]) 的机械臂，在软件告诉它去哪里之前仍然什么有用的事都做不了。在“把零件从料盘里捡起来”与“往关节4的相绕组里灌3.2 A”之间隔着好几层软件，各有各的周期，各有各的时间观念，也各有各把机械臂弄坏的方式。花400 ms找到一条路径的规划器完全可以接受；千分之一的周期里晚了400 µs的关节控制器，可能让某个关节啸叫、触发跟随误差故障，或者——更糟——一直不被察觉，直到臂上装了重负载。本章按2026年建造的多数机械臂的样子描述这套栈：URDF里的**机器人描述**、带节点、话题、服务、动作与变换的**ROS 2**中间件、把控制器与硬件接起来的**ros2_control**框架、**MoveIt 2**运动规划框架，以及让底层各层确定化的现场总线与操作系统特性。通篇的重点是预算——时间、带宽与信任的预算——以及分清哪一层对什么负责。轨迹生成本身在[[robotics/trajectory-planning]]里教，无碰撞规划在[[robotics/motion-planning-perception]]里，采样数据控制的理论在[[control-systems/digital-control]]里；这里我们围着它们搭软件。

## 分层架构 {#sec-layers}

每个机器人控制器，无论是厂商封好的控制柜还是驱动开源驱动器的ROS 2工作站，都分离开同样几桩事。自下而上列出：

| 层 | 跑在什么上面 | 典型速率 | 截止期限 | 做什么 |
|---|---|---|---|---|
| 驱动器固件 | 伺服驱动器里的微控制器或FPGA | 8–32 kHz电流环；2–8 kHz速度与位置 | 硬实时，微秒级 | 磁场定向电流控制、PWM、编码器读取、安全转矩关断、故障检测 |
| 实时关节控制器 | 机器人PC上的实时线程，或驱动器自身 | 250 Hz–4 kHz（1 kHz最常见） | 硬或准实时，亚毫秒 | 插补轨迹、闭合或馈入位置环、重力与摩擦前馈、限值 |
| 控制器管理器/轨迹执行 | 同一个实时进程 | 同上 | 准实时 | 切换控制器、检查容差、报告进度与错误 |
| 规划 | 普通（非实时）进程 | 按需，每次查询10 ms–数秒 | 软实时 | 逆运动学、碰撞检查、路径规划、时间参数化 |
| 应用 | 普通进程，常在另一台机器上 | 事件 | 软实时 | 任务逻辑、用户界面、视觉、单元协调 |

::: definition 硬实时、准实时与软实时 {#def-realtime}
若某次计算的结果只有在触发后给定的时间之前交付才有用，它就有一个**截止期限**。错过一次就可能导致失效（漏掉一次刷新的电流环可能产生失控电流）的是**硬**截止期限；偶尔错过只是降低结果质量、迟到的结果被直接丢弃（1 kHz的位置刷新到下一个周期开始了才到）的是**准**截止期限；迟到的结果仍然有用、只是没那么有用（如运动计划）的是**软**截止期限。**延迟**是从触发到响应开始（或结束）的时间；**抖动**是该延迟逐周期的变化，通常按相对名义周期的最大偏差来报。
:::

分层的意义，是每个截止期限都由最有可能满足它的那一层来满足。驱动器以上没有东西被信任能把电机电流控制在之下；关节控制器以上没有东西被信任每毫秒产生一个新设定点。规划器可以又慢又不可预测，因为它交出的是一条完整、带时间戳的轨迹，下面的层不等任何人就把它执行掉。而安全功能——急停、安全转矩关断、速度与位置监视——整个待在这套栈之外，在安全额定硬件里（[[robot-arm-design/arm-safety]]），因为这些层没有任何一层是按安全功能所需的完整性开发与验证的。

调试机械臂时有个有用的习惯：对每个症状都问一句*这一症状归哪层管*。以1.2 kHz啸叫的关节是驱动器里电流环或速度环的问题。在每个路点都过冲的针尖是轨迹控制器或其整定的问题。把肘部甩过夹具的路径是规划的问题。靠改规划器的加速度限值来治驱动器级的振荡，是把故障藏起来而不是除掉它。

## 描述机器人：URDF与xacro {#sec-urdf}

驱动器之上的每一层都需要机械臂的模型：它的运动学树、关节限位、质量与惯量，以及用于绘制和碰撞检查的形状。在ROS生态里这就是**统一机器人描述格式（URDF）**，一个由`<link>`与`<joint>`元素组成的XML文件。连杆带有三个可选块：

- `<inertial>`：质量、质心在连杆坐标系中的位置与姿态，以及**关于质心**的惯量张量，在该惯性坐标系中给出。动力学、重力补偿与仿真用它。
- `<visual>`：用于显示的详细网格（或基元形状）。
- `<collision>`：用于碰撞检查的简化形状——凸包、几个圆柱与方块，或简化网格。一次规划要跑数千次碰撞检查，所以碰撞几何相对视觉网格是刻意粗糙（且略微放大）的。

关节把`parent`连杆连到`child`连杆，用`<origin xyz="…" rpy="…"/>`把子坐标系相对父坐标系放置（先以米为单位的平移，再是固定轴滚动、俯仰、偏航，以弧度计），用`<axis>`在子坐标系中给出运动轴，对`revolute`与`prismatic`关节还给出`<limit lower upper effort velocity>`，单位分别为rad（或m）、N m（或N）、rad/s（或m/s）。URDF只描述树——平行夹爪连杆机构这类闭环链必须剪开、闭环约束另作处理——而且没有加速度或加加速度限值的字段，MoveIt从单独的`joint_limits.yaml`读取它们。

手写六关节机械臂是重复劳动，所以URDF由**xacro**（XML宏）生成：带属性、`${…}`算术、条件与宏的文件，在启动时展开成普通URDF。下面是六轴机械臂描述的一段，含一个圆柱连杆惯量的宏：

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

这段里有三个约定容易弄错。关节的`origin`是零关节角时*子*坐标系在*父*坐标系中的位姿，所以URDF更接近[[robotics/forward-kinematics]]的指数积公式描述（坐标系在home位形自由放置）而不是DH表，也不受DH每关节四个参数的限制。`axis`在子坐标系中表示。而机械臂以一个固定关节终结于约定俗成叫`tool0`的坐标系（即ISO 9409-1定义的法兰），末端执行器自己的描述再挂到它上面。

::: proposition 惯量张量的物理一致性 {#prop-inertia}
刚体关于质心的惯量张量$I_C$对称且半正定，其主转动惯量$I_1, I_2, I_3$满足**三角不等式**$I_1 + I_2 \ge I_3$，$I_2 + I_3 \ge I_1$，$I_3 + I_1 \ge I_2$。违反它们的URDF `<inertia>`不描述任何真实物体，仿真器与辨识代码可能拒收它或行为失常。
:::

::: proof
按定义$I_C = \int \bigl(\lVert\mathbf r\rVert^2 \mathbf 1 - \mathbf r\mathbf r^{\mathsf T}\bigr)\,dm$，其中$\mathbf r$自质心度量，故其对称。对任意单位向量$\mathbf n$，$\mathbf n^{\mathsf T}I_C\mathbf n = \int \bigl(\lVert\mathbf r\rVert^2 - (\mathbf n\cdot\mathbf r)^2\bigr)dm = \int d_n^2\,dm \ge 0$，其中$d_n$是质量元到沿$\mathbf n$、过质心的轴的距离；所以$I_C$半正定。在主轴坐标$(x, y, z)$下，$I_1 = \int (y^2 + z^2)\,dm$，$I_2 = \int (z^2 + x^2)\,dm$，$I_3 = \int (x^2 + y^2)\,dm$，于是$I_1 + I_2 - I_3 = 2\int z^2\,dm \ge 0$，另外两个不等式由轮换坐标轴即得。等号只对某个方向上没有外延的物体（薄片）成立。
:::

::: example 上臂连杆的惯量块 {#ex-inertial}
上面的上臂`link_2`被建模为质量$m = 4.2\,\mathrm{kg}$、半径$r = 0.05\,\mathrm m$、长$L = 0.425\,\mathrm m$的实心圆柱，沿连杆的$x$轴，质心在中点。(a) 宏写出的惯量值是什么？(b) 对照[[#prop-inertia]]检查它们。(c) 一位同事却填进了关于关节轴的转动惯量，“因为那才是电机看到的东西”。他会填什么值，会出什么错？
::: solution
(a) 在圆柱自己的坐标系（轴沿$z$）里，$I_{zz} = \tfrac12 mr^2 = \tfrac12(4.2)(0.05)^2 = 5.25\times10^{-3}\,\mathrm{kg\,m^2}$，$I_{xx} = I_{yy} = \tfrac1{12}m(3r^2 + L^2) = \tfrac1{12}(4.2)(0.0075 + 0.1806) = 0.0658\,\mathrm{kg\,m^2}$。惯量原点的`rpy="0 ${pi/2} 0"`把这个坐标系旋转得使圆柱轴落在连杆的$x$轴上；张量数值不变，因为它们是在旋转后的惯性坐标系中给出的。

(b) 主转动惯量$0.00525$、$0.0658$、$0.0658$：$0.00525 + 0.0658 \ge 0.0658$且$0.0658 + 0.0658 \ge 0.00525$，所以张量物理一致（细长的物体在第一式里接近等号，与预期相符）。

(c) 关于关节轴（垂直于连杆、过一个端点），平行移轴公式给出$I = 0.0658 + 4.2(0.2125)^2 = 0.256\,\mathrm{kg\,m^2}$。但URDF的消费者会自己用`<origin>`里的质量与质心位置施加平行移轴。填$0.256$把$m d^2$项算了两次：模型的关节2惯量变成$0.256 + 0.190 = 0.446\,\mathrm{kg\,m^2}$，高了74 %，任何基于它的前馈或仿真都错到同样的程度。

**合理性检验。**在CAD软件里求“关于质心、与输出坐标系对齐”的惯量，得到的就是同一批数——导出时该用这个设置。
:::
:::

::: warning 惯量关于错误的点、用错误的单位
URDF的惯量是关于质心的、以kg m²为单位、在惯量`<origin>`给出的坐标系中。三个错误反复出现：导出关于连杆原点的张量（把平行移轴项算了两次，见[[#ex-inertial]]）；用g mm²或kg mm²导出（相差$10^9$与$10^6$这几个因子——仿真里的机械臂爆炸或飘走是常见征兆）；以及拿视觉网格当碰撞网格，那会让每次碰撞检查都很慢、规划器看起来像“卡住了”。检验描述的办法：把它载入能显示质心与惯量盒的观察器，并把它预测的重力力矩与静止时实测的电机电流做比较（[[robot-arm-design/joint-control]]）。
:::

## 一节讲完ROS 2 {#sec-ros2}

**ROS 2**（机器人操作系统第2版）不是操作系统，而是把机器人软件构建为许多相互通信的进程的一套库与工具。截至2026年，在用的长期支持发行版是Humble Hawksbill（2022年）与Jazzy Jalisco（2024年），各支持五年，每逢偶数年的5月发布新的长期支持版。它的核心概念：

- **节点**是有名字的计算单元——相机驱动、机器人状态发布器、控制器管理器、MoveIt的`move_group`。几个节点可以共享一个进程。
- **话题**是有名字、有类型、多对多的消息流，用于持续流动的数据：`/joint_states`（`sensor_msgs/msg/JointState`）、相机图像、力矩读数。
- **服务**是请求—应答式调用，用于短操作：“切换控制器”、“设参数”、“给这个位姿算IK”。
- **动作**是长期运行、可抢占的目标，带反馈与结果：“跟随这条关节轨迹”（`control_msgs/action/FollowJointTrajectory`）、“运动到这个位姿”。客户端可以取消；服务器报告进度。
- **参数**配置节点（增益、关节名、更新速率），通常在启动时取自YAML文件。
- **tf2**维护随时间变化的坐标系树。节点在`/tf`（变化）与`/tf_static`（固定）上发布带时间戳的变换，任何节点都可以请求*在给定时刻*两个坐标系之间的变换。`robot_state_publisher`节点读URDF与`/joint_states`话题，发布每个连杆的变换，于是相机坐标系、工具坐标系与基座坐标系自动关联起来。

底层，ROS 2使用一个中间件：默认是对象管理组织**数据分发服务（DDS）**标准的一个实现——Fast DDS是默认项，Cyclone DDS与RTI Connext是备选——并且自2025年起有了基于Zenoh的非DDS选项。DDS提供发现（节点不经中心主机互相找到，用本地网络上的组播，按`ROS_DOMAIN_ID`分区）、序列化与传输，以及**服务质量**。

::: definition 服务质量（QoS） {#def-qos}
**QoS配置文件**是附在发布者或订阅者身上的一组交付策略。主要者有**可靠性**（可靠：丢失的样本重传；尽力而为：不重传）、**持久性**（易失：后加入的订阅者只拿到新样本；瞬态本地：发布者保留最近的样本并交付给后来者）、带**深度**的**历史**（保留最近N条或保留全部），以及时序策略**截止期限**、**生存期**与**活性**。只有配置文件**相容**时，订阅者才能从发布者收到数据：例如*可靠*订阅者不能与*尽力而为*发布者配对，*瞬态本地*订阅者不能与*易失*发布者配对。
:::

QoS按数据的意义来选。传感器流用尽力而为加短历史：过时的图像一文不值，重传它只会拖慢下一张。不可丢失的指令与状态用可靠交付。发布一次、必须让后启动的节点也能拿到的数据——机器人描述、地图——用瞬态本地持久性；`robot_state_publisher`就以那种方式发布`/robot_description`。在Python里：

```python
from rclpy.qos import QoSProfile, ReliabilityPolicy, HistoryPolicy, DurabilityPolicy

sensor_qos = QoSProfile(depth=5,
                        reliability=ReliabilityPolicy.BEST_EFFORT,
                        history=HistoryPolicy.KEEP_LAST)
latched_qos = QoSProfile(depth=1,
                         reliability=ReliabilityPolicy.RELIABLE,
                         durability=DurabilityPolicy.TRANSIENT_LOCAL)
```

ROS 2话题*不是*进程间1 kHz控制回路的正确通道。每条消息都要过序列化、中间件与网络栈（或共享内存），延迟数十到数百微秒，还拖着一条依赖负载的长尾。因此控制回路跑在*一个进程内部*——控制器管理器——ROS 2话题与动作只承载进出它的较慢流量。几条命令行工具就能覆盖对运行中系统的第一轮检查：

```bash
ros2 node list
ros2 topic hz /joint_states                 # is state published at the expected rate?
ros2 topic info -v /joint_states            # publishers, subscribers and their QoS
ros2 run tf2_ros tf2_echo base_link tool0   # current flange pose
ros2 control list_controllers               # loaded controllers and their states
ros2 control list_hardware_interfaces       # claimed and available interfaces
```

::: quiz
某相机驱动以传感器数据配置（尽力而为、保留最近5条）发布图像。一个新的视觉节点以默认配置（可靠、保留最近10条）订阅，什么也收不到，除了一条QoS警告没有任何错误消息。为什么？
- [ ] 历史深度不同，所以配置不相容。
- [x] 可靠订阅与尽力而为发布者不相容，两者永远配不上对。
- [ ] 图像太大，无法可靠交付。
- [ ] 订阅者必须用瞬态本地持久性，才能收到它启动之前发布的数据。
::: solution
可靠性是“请求对阵提供”：*请求*可靠交付的订阅者，无法由只*提供*尽力而为的发布者服务，于是DDS不会把两者连起来。反过来的组合（尽力而为订阅者、可靠发布者）是相容的。历史深度是各端本地的，从不造成不相容。改法是以传感器数据配置订阅；`ros2 topic info -v`会显示每个端点的配置。
:::
:::

## ros2_control：控制器对接硬件 {#sec-ros2-control}

**ros2_control**是运行实时关节层的框架。它的核心对象是**控制器管理器**，按固定的`update_rate`跑一个循环：每个周期先对每个硬件组件调`read()`，再对每个激活的控制器调`update()`，最后对每个硬件组件调`write()`。数据经**接口**流动：硬件组件导出**状态接口**（如`joint_1/position`、`joint_1/velocity`、`joint_1/effort`）与**命令接口**（`joint_1/position`或`joint_1/velocity`或`joint_1/effort`），每个控制器*占用*它要写的命令接口，所以两个控制器绝不可能同时驱动同一个关节。

硬件组件有三种：**系统**（一条总线或一台驱动器背后的几个关节——机械臂挂在EtherCAT上的通常情形）、**执行器**（单个关节）与**传感器**（只读，如力–扭矩传感器）。每个都是带生命周期的C++插件——`on_init`、`on_configure`、`on_activate`、`on_deactivate`、`on_error`——外加两个周期方法

```cpp
hardware_interface::return_type read(const rclcpp::Time & time, const rclcpp::Duration & period) override;
hardware_interface::return_type write(const rclcpp::Time & time, const rclcpp::Duration & period) override;
```

它们必须是实时安全的：不许内存分配，不许阻塞调用，不许文件或控制台I/O。硬件在机器人描述中声明：

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

把插件换成`mock_components/GenericSystem`，就得到一条把命令原样回填成状态返回的“完美”机械臂，其上整栈软件都能在没有硬件的情况下测试；`gz_ros2_control`把同样的控制器接到Gazebo仿真上。

控制器本身是按YAML配置的插件。几乎每条臂都跑两个：

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

**关节状态广播器**读状态接口并发布`/joint_states`。**关节轨迹控制器**（JTC）经其`follow_joint_trajectory`动作（或一个话题）接受`trajectory_msgs/JointTrajectory`——一串带时间戳的路点——在控制器速率下于路点之间**插补**，并把插值出的设定点写进命令接口。插补随所给数据而定：路点只含位置则线性，含位置与速度则三次，含位置、速度与加速度则五次——正是[[robotics/trajectory-planning]]里的多项式时间缩放。命令接口是速度或力矩时，JTC自己对位置误差闭合PID环。它还检查位置与时间的**路径与目标容差**，关节越界即中止目标并保持位置。

用哪个命令接口，是位置环住在哪一层的设计决定。用**position**命令时，位置环在驱动器里以4–8 kHz闭合、带着驱动器自己的前馈，PC只流式发送插补设定点（即工业驱动器标准的“循环同步位置”模式，见下文）。用**effort**（转矩）命令时，PC闭合位置环，还能加入基于模型的项——重力补偿、计算力矩、阻抗控制（[[robotics/robot-control]]）——但PC的时序就此成了关节伺服的一部分，其抖动的每一微秒都要紧。

## MoveIt 2：规划与伺服 {#sec-moveit}

**MoveIt 2**是坐在ros2_control之上的运动规划框架。它的主节点`move_group`集合了：

- **机器人模型**：URDF外加一份**SRDF**（语义机器人描述），它定义规划组（“arm”、“gripper”）、命名位姿（“home”、“ready”）、末端执行器，以及永远不会相撞、不必检查的连杆对；
- **规划场景**：当前机器人状态、附着在机器人上的物体（工具、抓取的零件）与世界几何——方块、网格，以及由深度相机构建的占用地图——由一个听着`/joint_states`、tf与场景更新的规划场景监视器维护；
- **运动学插件**，为每个组解逆运动学：默认是数值KDL求解器，备选有TRAC-IK、pick_ik与解析的IKFast求解器（[[robotics/inverse-kinematics]]）；
- **规划流水线**：OMPL（Open Motion Planning Library，其基于采样的规划器如RRT-Connect已在[[robotics/motion-planning-perception]]中描述）、Pilz工业运动规划器（确定性的点到点、直线与圆弧运动，类似工业控制器的PTP、LIN、CIRC指令），以及优化型规划器（CHOMP、STOMP）；
- **时间参数化**：规划器返回一条几何路径；一个适配器随后在`joint_limits.yaml`的速度与加速度限值内为其路点指定时间——默认用时间最优算法（TOTG），可选地用Ruckig平滑到有界加加速度；
- **轨迹执行**，把带时间的轨迹送到JTC的动作服务器并监视之。

规划回答的是“给定运动期间假定为静态的场景，我如何从这里到那里而不碰到任何东西”。对于连续、可反应的运动——用空间鼠标遥操作、朝运动目标视觉伺服——MoveIt提供**MoveIt Servo**：一个接受笛卡尔速度（旋量）或关节点动指令的节点，经雅可比（[[robotics/jacobians]]）把它们转换为关节速度，在奇点与碰撞附近减速，并向控制器流式发送短轨迹或直接指令，典型为100–500 Hz。

::: algorithm 在ROS 2中点亮一条新臂 {#alg-bringup}
1. 编写xacro描述：运动学取自零关节角下的CAD，惯量关于质心，粗糙的碰撞几何，关节限位取自数据手册。在观察器里逐个关节活动着检查，并对照[[#prop-inertia]]检查。
2. 加上带模拟硬件的`<ros2_control>`块，在其上跑关节状态广播器与JTC。发一条慢轨迹，验证`/joint_states`与tf跟随。
3. 用MoveIt Setup Assistant生成MoveIt配置（SRDF、运动学、带加速度的关节限位）；对着模拟硬件规划并执行，包括关节限位附近与绕新增碰撞物体的情形。
4. 把模拟换成真实硬件插件。机械臂处于安全位姿、功率降下、安全系统激活时，验证每个关节的方向与标度（指挥$+0.1\,\mathrm{rad}$，用量角器或编码器查看运动）、编码器零位对描述的零位、以及限位。
5. 在提高速度之前，实测负载下实时循环的时序（下文）；然后整定，然后逐级提高速度与负载。
:::

## 实时性约束 {#sec-realtime}

### 操作系统与线程

若不采取措施，控制器管理器的循环就是一条普通Linux线程。原始内核在磁盘、显卡驱动或一阵网络中断占住处理器时，能把一个就绪线程延误数毫秒。三个措施让它可预测：

- **PREEMPT_RT**：实时补丁集，已在6.12版（2024年）并入Linux主线内核，它使几乎所有内核代码可抢占，并把中断处理程序变成可调度的线程，于是在配置良好的机器上，高优先级用户线程变为就绪后几十微秒内就能运行。它不会让慢程序变快，但界定了程序等待的上限。
- **调度与内存**：控制线程以`SCHED_FIFO`策略在高优先级下运行，其内存被锁定（`mlockall`）并预先分配，使循环内不发生缺页或分配；它可以绑到一个与其他工作隔离的CPU核上，并把网络中断转向别处避开该核。
- **实时安全的代码**：在`read`/`update`/`write`内部，无`new`/`malloc`，无非实时线程可能长期持有的互斥锁，无日志；ROS 2发布只经无锁助手（`realtime_tools::RealtimePublisher`、`RealtimeBuffer`）把数据交给非实时线程。

配置好的机器的延迟是要测的，不是假设的：`cyclictest`工具在压力负载下把一条周期线程跑上几小时，报告观察到的最坏唤醒延迟。调校过的PREEMPT_RT工业PC的典型结果是最坏几十微秒；同一台机器在原始内核上可能出现数毫秒的偶发延误。进预算的是最坏值，不是平均值。

### 现场总线

PC与驱动器之间跑着一条现场总线。机械臂上两个常见选择：

- **EtherCAT**（IEC 61158，倍福（Beckhoff）于2003年推出）：标准100 Mbit/s以太网帧在线上穿过每台驱动器；每台驱动器在帧经过时*当场*读出其指令并插入其反馈，所以一帧在几十微秒内服务所有轴。**分布式时钟**把各驱动器的本地时钟同步到远小于微秒，于是每个轴在同一瞬间采样其编码器并施加新设定点（SYNC0事件），与主站的抖动无关。驱动器通常实现**CiA 402**驱动器剖面（EtherCAT上的CANopen）：一个状态机（禁使能→准备开启→已开启→运行使能，外加快停与故障态），由控制字（对象0x6040）驱动、在状态字（0x6041）中报告，以及循环同步模式**CSP**、**CSV**、**CST**（位置、速度、转矩），目标位置在0x607A、实际位置在0x6064。
- **CAN**（ISO 11898）：两线、多主、最高1 Mbit/s、每帧8字节数据，便宜皮实，常见于小型与研究机械臂以及集成关节模块。**CAN FD**把仲裁阶段保持在最高1 Mbit/s，数据阶段则换更快的速率（常见2–5 Mbit/s，有时8），并允许最多64字节数据。CANopen（CiA 301）与同一个CiA 402剖面两者皆可跑。

::: example 六轴机械臂1 kHz的总线预算 {#ex-bus}
每个关节每个周期需要一条命令（目标位置4字节，外加几个字节的控制）与一个反馈（位置、速度、状态：最多8字节）。比较(a) 1 Mbit/s的经典CAN，每关节一条命令帧与一条反馈帧、各8字节数据；(b) 数据阶段5 Mbit/s的CAN FD，六个关节共用一条24字节命令帧加六条8字节反馈帧；(c) 每台驱动器12字节输出、16字节输入的EtherCAT。
::: solution
(a) 带11位标识符与8字节数据的经典CAN帧是108位，外加3位帧间空间，共111位，位填充最多再加24位：111–135位，即1 Mbit/s下$111$–$135\,\mathrm{\mu s}$。每周期12帧最多需$12\times135 = 1620\,\mathrm{\mu s}$，超过$1000\,\mathrm{\mu s}$的周期。经典CAN跑不了这条臂的1 kHz；在合理的总线负载（$\le$ 50–60 %）下只管理约300–400 Hz，或每条总线两三个关节跑1 kHz。

(b) CAN FD帧在名义速率下约29位（仲裁、应答、帧尾、帧间空间）：$29\,\mathrm{\mu s}$。数据阶段里8字节帧携带约95位（数据、长度码、17位CRC与stuff count），24字节帧约228位（21位CRC）；给填充留20 %，它们在5 Mbit/s下耗时$23\,\mathrm{\mu s}$与$55\,\mathrm{\mu s}$。于是两种帧长分别约$52\,\mathrm{\mu s}$与$84\,\mathrm{\mu s}$，一个周期需$84 + 6\times52 \approx 395\,\mathrm{\mu s}$：1 kHz下总线负载约40 %。可行，余量中等。

(c) EtherCAT：一帧携带$6\times(12+16) = 168$字节过程数据。加上前导码（8字节）、以太网头（14）、EtherCAT头（2）、数据报头（10）、工作计数器（2）、校验和（4）与帧间隙（12），得220字节，即线路上$220\times8\times10\,\mathrm{ns} = 17.6\,\mathrm{\mu s}$，外加每台驱动器零点几微秒的转发延误：往返约$25\,\mathrm{\mu s}$，占周期的2.5 %。同一条总线可以跑4–8 kHz或服务多得多的轴。

**合理性检验。**原始比特率之比（100 : 1）与周期之比（25 µs对经典CAN的远超1 ms）大致相符；EtherCAT还因一帧一个头服务所有驱动器而多赚一个因子。对CAN FD的估计依赖具体的位定时与填充；真实设计要用总线控制器的定时计算器核算，并用总线分析仪实测。
:::
:::

::: widget plot
f: 100*N*2*F*x/1000000
x: 100, 2000
y: 0, 150
sliders: N=6:1:12:1; F=135:50:140:1
hlines: 50; 100
labels: \text{总线负载 (\%)}
caption: 总线负载（百分比）对控制速率$R$（Hz）的曲线，共$N$个关节，每个每周期需要一条命令与一个反馈帧、各长$F$（µs）。经典CAN（1 Mbit/s，$F \approx 111$–$135\,\mu\mathrm s$）下，六个关节在约310–375 Hz越过50 %设计线，在约620–750 Hz使总线饱和。把$F = 52$（5 Mbit/s下的8字节CAN FD帧），同一条臂即使命令与反馈帧分开，1 kHz时仍低于65 %。
:::

### 延迟与抖动预算

一份时序预算列出从某关节位置被测得的瞬间，到相应校正对电机起作用的瞬间之间的每一桩延误，并检查周期里的每一段都装得进它的窗口。

::: proposition 纯迟延的相位滞后 {#prop-delay}
纯迟延$T_d$的传递函数为$e^{-sT_d}$，在所有频率增益为1、相角为$-\omega T_d$。把它插入开环穿越频率为$\omega_c$的反馈回路，会使相角裕度减小
$$
\Delta\phi = \omega_cT_d\ \text{rad} = 360^\circ f_cT_d ,
$$ {#eq-delay-phase}
其中$f_c = \omega_c/2\pi$以Hz计。把每个采样保持一个周期$T$的零阶保持，在远低于$1/T$的频率下等效于$T/2$的迟延。
:::

::: proof
在虚轴上，$e^{-j\omega T_d} = \cos\omega T_d - j\sin\omega T_d$，模为1、辐角为$-\omega T_d$。把开环传递函数乘上它，幅值不变，因而幅值为1的穿越频率$\omega_c$也不变，并在该处从相角中减去$\omega_cT_d$；相角裕度是$180^\circ$加上$\omega_c$处的相角，于是同额下降。对保持器，单位脉冲的响应是高1、宽$T$的脉冲，其变换为$(1 - e^{-sT})/s = T e^{-sT/2}\,\dfrac{\sinh(sT/2)}{sT/2}$。在$s = j\omega$上，最后一个因子是$\sin(\omega T/2)/(\omega T/2)$，当$\omega T \ll 1$时为实且近1，所以保持器贡献增益$T$（被采样器的$1/T$吸收）与$e^{-j\omega T/2}$的相角：一个$T/2$的迟延。
:::

::: example 1 kHz力矩控制关节循环的时序预算 {#ex-budget}
某机械臂在PREEMPT_RT PC上以1 kHz跑ros2_control，EtherCAT驱动器处于循环同步力矩模式，于是PC闭合位置环并加入重力补偿。实测最坏值：唤醒延迟$80\,\mathrm{\mu s}$（cyclictest加载下），`read()` $30\,\mathrm{\mu s}$，六个关节带动力学模型的控制器`update()` $150\,\mathrm{\mu s}$，`write()` $30\,\mathrm{\mu s}$，EtherCAT帧$25\,\mathrm{\mu s}$。驱动器在分布式时钟的SYNC0事件采样编码器并施加指挥的力矩；电流环另加约$100\,\mathrm{\mu s}$的延迟。(a) 周期装得下吗？(b) 从测量到力矩的有效延迟是多少，对一条穿越频率20 Hz的位置环要赔掉多少相角裕度？(c) 若把PC的循环挪到偶发3 ms停顿的原始内核上会怎样？
::: solution
(a) 必须在一个周期内完成的工作——从定时器触发到帧发出——最坏为$80 + 30 + 150 + 30 + 25 = 315\,\mathrm{\mu s}$，远在$1000\,\mathrm{\mu s}$之内，留出68 %的余量供增长（更重的模型、第二条臂）。

(b) 有分布式时钟时，在周期$k$的SYNC0采到的位置随周期$k$的帧传到PC，新力矩算出并送出，驱动器在周期$k + 1$的SYNC0施加它：整整一个周期，$1.0\,\mathrm{ms}$。力矩随后被保持一个周期（零阶保持，按[[#prop-delay]]折$0.5\,\mathrm{ms}$），电流环再加$0.1\,\mathrm{ms}$。总有效延迟$T_d \approx 1.6\,\mathrm{ms}$。在$f_c = 20\,\mathrm{Hz}$，[[#eq-delay-phase]]给出$\Delta\phi = 360^\circ\times20\times0.0016 = 11.5^\circ$的相角裕度损失——若环路原本按45–60°的裕度设计尚可接受，但带宽就此封顶：$f_c = 60\,\mathrm{Hz}$时同一延迟要赔$35^\circ$。

(c) 3 ms的停顿意味着丢三个周期。驱动器继续施加最后的力矩——其中含重力补偿，臂不会掉——但位置环开环3 ms，期间一个以$20\,\mathrm{rad/s^2}$加速的关节漂移$\tfrac12(20)(0.003)^2 = 9\times10^{-5}\,\mathrm{rad}$——而且环路恢复时看到的是突增的误差与在错误区间上算出的速度估计。多数CiA 402驱动器用看门狗检测丢帧，达到设定次数即报故障、停臂。因此停顿最好不过是一次顿挫与跟随误差尖峰，最坏是一天几次的恼人停车。解法是实时内核，不是更松的容差。

**合理性检验。**预算的主导不是计算而是回路的*结构*——整整一个采样周期的传输加半个周期的保持。要把延迟减半，要么用2 kHz循环，要么把位置环搬进驱动器（位置模式），PC只发送前馈力矩。
:::
:::

::: widget plot
f: 360*x*T/1000
x: 0, 100
y: 0, 90
sliders: T=1.6:0.2:5:0.1
hlines: 15; 30
labels: \Delta\phi\ (^\circ)
caption: 纯迟延$T$毫秒（滑块）损失的相角裕度（度）对环路穿越频率（Hz）的曲线，出自[[#eq-delay-phase]]。按[[#ex-budget]]的$1.6\,\mathrm{ms}$，20 Hz的环路损失约$12^\circ$；把穿越推到50 Hz，损失约$29^\circ$。把延迟减半，可用带宽翻倍——这就是快关节环住在驱动器里而不是PC上的原因。
:::

### 时间戳与变换

延迟在实时层之上同样要紧，只是换了形式。一张相机图像、一次力读数、一个关节状态，各自描述的是其*测得*那一刻的世界，而那可能比处理时刻早几十毫秒。ROS 2消息为此携带头部时间戳，tf2把变换插值到所请求的时刻。常见的错误是去查“最新的”变换，而不是图像时间戳处的变换。

::: example 眼在手上视觉中的过时变换 {#ex-stale}
装在腕上的相机在机械臂以$0.5\,\mathrm{m/s}$运动时给一个零件成像。图像从捕获、传输到处理总共历时$40\,\mathrm{ms}$；随后视觉节点用tf里最新的相机位姿把测得的零件位置转换到基座坐标系。误差多大？如何消除？
::: solution
$40\,\mathrm{ms}$里相机移动$0.5\times0.040 = 0.020\,\mathrm m = 20\,\mathrm{mm}$。用处理时刻而非捕获时刻的相机位姿，会把零件放到离实际位置20 mm的地方，方向与运动相反——远超机械臂的重复定位精度与相机的分辨率。解法是用捕获时刻给图像打时间戳（取自相机的硬件触发或曝光时钟，与机器人时钟同步），并向tf2请求*该时刻*的变换；tf2在两侧的关节状态采样之间插值。时钟偏置仍留下残余误差：时钟同步到$1\,\mathrm{ms}$时，误差降到$0.5\,\mathrm{mm}$。**合理性检验。**静止的机械臂误差消失，这就是此类缺陷常能在机械臂静止的测试下蒙混过关的原因。
:::
:::

::: remark 厂商控制器位于何处
各大制造商的工业机器人随附封闭的控制器，其内部实现同样的各层，用它自己的语言与规划器。集成时通常保留厂商的实时层，经厂商接口向其流式发送位置（例如外部引导或位置流选项，视厂商而定为4–250 Hz），由ROS 2驱动把该接口包装成ros2_control硬件组件。于是厂商的插补与滤波也进入延迟预算，而该接口的文档——接受的速率、缓冲、丢包时的行为——必须像总线规格书一样认真研读。
:::

::: history
机器人操作系统诞生于斯坦福STAIR项目所写的软件，2007年起在Willow Garage发展，该公司的PR2机器人是其第一个重要平台；ROS 1.0于2010年跟进，URDF与tf库即诞生于那个时期。ROS中的运动规划由Ioan Șucan、Sachin Chitta等人于2011–2012年整合为MoveIt，建立在Șucan、Mark Moll与Lydia Kavraki的Open Motion Planning Library之上。ROS 1依赖中心式的master与自研的TCP传输，不适合实时与多机器人使用；按DDS标准重写的ROS 2于2017年12月发布首个发行版Ardent Apalone，MoveIt 2与ros2_control在其后的发行版中日趋成熟。实时方面，博世（Bosch）于1986年展示了CAN总线，CAN FD于2012年展示，倍福（Beckhoff）于2003年推出EtherCAT，而在主内核之外维护了约二十年的PREEMPT_RT补丁于2024年并入Linux 6.12。
:::

## 习题

::: exercise 经典CAN帧时长 {level=1 check="222"}
一个8字节数据、无填充位的经典CAN帧（含帧间空间）占111个位时间。它在500 kbit/s下耗时多少？（输入时间，以µs为单位。）
::: solution
500 kbit/s下一位长$2\,\mathrm{\mu s}$，故帧耗时$111\times2 = 222\,\mathrm{\mu s}$（最坏填充下可达$270\,\mathrm{\mu s}$）。六个关节、每关节两条这样的帧，至少要$2.66\,\mathrm{ms}$——总线约375 Hz就饱和了。
:::
:::

::: exercise 延迟的相位代价 {level=1 check="10.8"}
一条位置环的穿越频率为15 Hz。一次软件改动增加了$2\,\mathrm{ms}$的延迟。相角裕度下降多少？（输入角度，以度为单位。）
::: solution
由[[#eq-delay-phase]]，$\Delta\phi = 360^\circ\times15\times0.002 = 10.8^\circ$。
:::
:::

::: exercise 方块连杆的惯量 {level=1 check="0.002133"}
某连杆被建模为质量$2.0\,\mathrm{kg}$、截面$80\times80\,\mathrm{mm}$、沿其$z$轴长$400\,\mathrm{mm}$的实心方块。关于质心的$I_{zz}$是多少？检查三角不等式。（输入$I_{zz}$，以kg m²为单位，保留四位有效数字。）
::: solution
边长为$a, b, c$（沿$x, y, z$）的方块，$I_{zz} = \tfrac1{12}m(a^2 + b^2) = \tfrac1{12}(2.0)(0.0064 + 0.0064) = 0.002133\,\mathrm{kg\,m^2}$，且$I_{xx} = I_{yy} = \tfrac1{12}(2.0)(0.0064 + 0.16) = 0.02773\,\mathrm{kg\,m^2}$。于是$I_{xx} + I_{zz} = 0.0299 \ge I_{yy} = 0.0277$ ✓且$I_{xx} + I_{yy} \ge I_{zz}$ ✓。
:::
:::

::: exercise 过时的变换 {level=2 check="12"}
腕部相机以$0.8\,\mathrm{m/s}$运动；其图像在曝光$15\,\mathrm{ms}$后才到达视觉节点，而节点使用最新的tf变换。这造成多大的位置误差？（输入误差，以mm为单位。）
::: solution
$0.8\,\mathrm{m/s}\times0.015\,\mathrm s = 0.012\,\mathrm m = 12\,\mathrm{mm}$，沿运动方向。改查图像时间戳处的变换即可消除（[[#ex-stale]]）。
:::
:::

::: exercise 一条CAN FD总线上能挂几个关节？ {level=2 check="4"}
CAN FD总线（仲裁1 Mbit/s、数据5 Mbit/s）上每个关节每周期用一条8字节命令帧与一条8字节反馈帧，各长约$52\,\mathrm{\mu s}$。1 kHz下总线负载须不超过50 %，能有几个关节共享总线？（输入关节数。）
::: solution
每关节每$1000\,\mathrm{\mu s}$周期$2\times52 = 104\,\mathrm{\mu s}$，即10.4 %的负载。$0.50/0.104 = 4.8$，故4个。把所有命令打包进一条更长的帧（[[#ex-bus]]）可提高到六个；六轴各用分开的帧则需要两条总线。
:::
:::

::: exercise 抖动循环导出的速度 {level=2 check="5"}
某关节的速度按$(q_k - q_{k-1})/T$估计，名义周期$T = 1\,\mathrm{ms}$，但某个周期的实际采样间隔是$1.05\,\mathrm{ms}$。该周期内估计值比真实速度高出百分之几？EtherCAT的分布式时钟如何避免这一点？（输入误差，以百分比为单位。）
::: solution
真实速度是$\Delta q/(1.05\,\mathrm{ms})$；估计是$\Delta q/(1.00\,\mathrm{ms})$，按因子$1.05$偏大：高估$5\,\%$，而微分项或速度反馈项会把它作为一阵莫名其妙的踢力直接送进转矩指令。有了分布式时钟，驱动器在同步的SYNC0瞬间采样，采样间隔精确到亚微秒，即便主站软件周期抖动；抖动此后只影响数据何时被*处理*，不影响其何时被*测得*。若无同步采样，估计至少应改用实测时间戳而非名义周期。
:::
:::

::: exercise 选择插补 {level=2}
某规划器每$100\,\mathrm{ms}$向关节轨迹控制器发送仅含位置的路点。机械臂运动时速度在每个路点处出现可见的“拐角”。解释原因，并给出两种补救办法。
::: solution
仅有位置时，JTC在路点间线性插补，于是速度逐段恒定、在每个路点跳变：加速度在此是脉冲，关节伺服以顿挫响应，机械臂表现为一次轻微磕动。补救：(1) 每个路点带上速度（最好还有加速度），让JTC用速度（与加速度）连续的三次（或五次）样条，见[[robotics/trajectory-planning]]；(2) 用加加速度受限的算法对路径做时间参数化并密集发送；(3) 流式应用则用为其设计的伺服或流式接口，而不是一串短轨迹。但要留意：速度彼此不一致的路点会得到过冲的三次曲线——速度必须来自恰当的时间参数化。
:::
:::

::: exercise 保持器的半周期迟延 {level=3}
证明零阶保持器配上其采样器增益$1/T$后，对所有$\omega < 2\pi/T$相角恰为$-\omega T/2$，并求增益下降3 dB的频率。对1 kHz的环路，把20 Hz处的相位滞后与[[#prop-delay]]给出的值比较。
::: solution
由[[#prop-delay]]的证明，$(1/T)(1 - e^{-j\omega T})/(j\omega) = e^{-j\omega T/2}\,\dfrac{\sin(\omega T/2)}{\omega T/2}$。第二个因子在$0 < \omega T/2 < \pi$、即$\omega < 2\pi/T$内为实且为正，故那里相角恰为$-\omega T/2$。增益$\sin x/x$在$x = \omega T/2$处，于$x \approx 1.392$即$\omega \approx 2.78/T$或$f \approx 0.443/T$时等于$1/\sqrt2$——1 kHz环路约443 Hz。20 Hz处相位滞后$\omega T/2 = 2\pi(20)(0.001)/2 = 0.0628\,\mathrm{rad} = 3.6^\circ$，与$0.5\,\mathrm{ms}$延迟相同：$360^\circ\times20\times0.0005 = 3.6^\circ$ ✓。20 Hz处的增益损失可以忽略（$\sin x/x = 0.9993$）。
:::
:::

::: exercise 力控制的实时预算 {level=3}
一台七轴研究臂须以1 kHz运行阻抗控制器（[[robotics/robot-control]]），腕部力–扭矩传感器经EtherCAT读取，基于模型的控制器最坏耗时$250\,\mathrm{\mu s}$。所选PC加载下的唤醒延迟最坏$120\,\mathrm{\mu s}$；read与write合计$60\,\mathrm{\mu s}$；EtherCAT帧往返$30\,\mathrm{\mu s}$。(a) 周期被占用了多大比例？(b) 团队提议在`update()`内部调用MoveIt的碰撞检查。请评论。(c) 若把速率提到2 kHz，有效延迟与阻抗环可实现的刚度会怎样？
::: solution
(a) $120 + 60 + 250 + 30 = 460\,\mathrm{\mu s}$：占$1000\,\mathrm{\mu s}$的46 %。可接受，且为尖峰留有余量，但应在启用全部特性后重测。
(b) 对另一节点的调用是经中间件的阻塞请求，延迟无上界；碰撞检查本身的运行时间依赖数据、还要分配内存：它绝不能跑在实时线程里。避障属于规划层，或属于一条单独的、较慢的监督环路，经实时安全的缓冲区来调整控制器的设定点。
(c) 2 kHz下周期为$500\,\mathrm{\mu s}$；最坏工作$460\,\mathrm{\mu s}$只剩8 %余量，太少，须先给控制器提速。若装得下，有效延迟（一个周期的传输加半个周期的保持）从约$1.5\,\mathrm{ms}$降到$0.75\,\mathrm{ms}$，于是在同样的相角裕度下，环路带宽——以及能对硬环境稳定呈现的刚度——大致翻倍。实践中阻抗控制的稳定刚度上限正是被这一延迟，连同传感器噪声与关节柔性所限制。
:::
:::

::: exercise 视觉引导拣料单元的软件架构 {level=3}
为一条带平行夹爪的六轴机械臂、一台料箱上方的固定3D相机、以及提供单元启停信号的PLC勾画软件架构。把每个功能指派到某一层，给出其速率与截止期限类别（[[#def-realtime]]），说出每个接口使用的ROS 2机制（话题、服务、动作、tf），并说明哪些功能绝不该实现在这套软件里。
::: solution
一个合理答案。*驱动器固件*（16 kHz电流、4 kHz位置，硬实时）：FOC、CSP模式、STO输入。*实时层*（1 kHz，准实时）：ros2_control配EtherCAT系统插件、关节状态广播器、位置模式的JTC；夹爪控制器（或用`control_msgs/action/GripperCommand`之类动作的独立夹爪驱动节点）。*规划*（软实时）：MoveIt的`move_group`，料箱与单元建模进规划场景，最后逼近用Pilz LIN、转移用OMPL；计划经`follow_joint_trajectory`动作发给JTC。*感知*（相机5–10 Hz，软实时）：点云走在尽力而为的话题上；一个位姿估计节点发布抓取候选；相机坐标系由手眼标定（[[robot-arm-design/calibration]]）得到的静态变换在`/tf_static`上连到基座。*应用*（事件驱动）：任务节点（行为树或状态机）调用感知服务、请求计划、执行并处理失败；经PLC桥（例如OPC UA或现场总线网关）处理单元启停与状态。*不在本软件中*：急停、门联锁、安全速度与区域监视、STO——它们属于安全额定控制器与接线（[[robot-arm-design/arm-safety]]）；ROS软件至多*读取*其状态。
:::
:::

::: summary
- 按截止期限为软件分层：驱动器固件（数十kHz，硬实时）、实时关节控制器（约1 kHz，准实时）、轨迹执行、规划（软实时）、应用。安全功能待在栈外的安全额定硬件里。
- URDF描述连杆（关于质心的惯量、视觉、粗糙的碰撞几何）与关节（零位时子相对于父的origin、子坐标系中的轴、限位）；xacro负责生成。惯量张量必须满足三角不等式（[[#prop-inertia]]）。
- ROS 2：节点、话题（流）、服务（调用）、动作（长目标）、参数、tf2（带时间戳的坐标系），跑在DDS或Zenoh上。QoS配置必须相容；传感器数据用尽力而为，锁存数据用瞬态本地。
- ros2_control：控制器管理器按固定速率调用`read`、`update`、`write`；硬件导出状态与命令接口；关节轨迹控制器插补路点（线性、三次、五次）并检查容差。
- MoveIt 2：URDF + SRDF、规划场景、IK插件、OMPL/Pilz/优化规划器、时间参数化、轨迹执行；反应式笛卡尔运动用MoveIt Servo。
- 实时：PREEMPT_RT（Linux 6.12起入主线）、FIFO调度、锁定的内存、循环内不分配不阻塞；实测最坏延迟。带分布式时钟的EtherCAT在数十µs内服务多轴；经典CAN跑不动六轴1 kHz；CAN FD能。
- 纯迟延$T_d$要赔$360^\circ f_cT_d$的相角裕度；跑在PC上的环路约有1.5个周期的延迟。使用时间戳，并在测量时刻查tf。
:::

## 延伸阅读

ROS 2、ros2_control与MoveIt 2的文档（docs.ros.org、control.ros.org、moveit.picknik.ai）为[[#alg-bringup]]的每一步都备有教程，且要按你所用的发行版来读，因为接口随版本而变。Quigley、Gerkey与Smart的著作至今仍是这些概念的良好入门。EtherCAT技术组发布EtherCAT与分布式时钟的介绍材料；CiA 402剖面由CAN in Automation发布。至于实时Linux，Linux基金会实时项目的文档讲解了配置与用`cyclictest`的测量。
