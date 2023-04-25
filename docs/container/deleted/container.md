## 容器概念



### 容器核心技术

**容器的本质**

容器本质上是一个特殊的进程，使用Linux Namespace对资源进行隔离、cgroup对资源进行限制。

<br />

**`OCI`组织**

2015年6月22由`Docker`、`CoreOS`和其他公司共同成立了一个叫`Open Container Initiative`的组织（简称`OCI`）,其目的是制定开放的容器规范。

官网：[https://opencontainers.org/](https://opencontainers.org/)，Github：[https://github.com/opencontainers](https://github.com/opencontainers)

`OCI`目前发布了三个规范：运行时规范（`Runtime spec`）、镜像规范（`Image spec`）和分发规范（`distribution-spec`）

<br />

**运行时说明**

（1）容器运行时规范

容器运行时规范描述了<span style="color:red; font-weight:bold;">容器的配置、运行环境和生命周期</span>

（2）容器运行时

容器运行时（`runtime`）是容器真正运行的地方，`lxc`、`runc`、`rkt`是目前主流的三种容器runtime

`lxc`是Linux上老牌的运行时。Docker最初也是使用`lxc`作为容器runtime

`runc`是Docker自己开发的运行时，符合OCI规范，也是现在Docker默认的runtime

`rkt`是CoreOS开发的容器runtime，符合OCI规范，因此能够运行Docker容器

（3）容器运行时管理工具

光有运行时还不够，用户得有工具管理容器

lxc的管理工具是`lxd`

runc的管理工具是`docker engine`，`docker engine`包含deamon和cli两部分。我们通常提到的Docker，一般就是指`docker engine`

rkt的管理工具是`rkt cli`

<br />

**镜像说明**

（1）容器镜像规范

容器镜像规范定义一个OCI镜像由`a manifest`、` an image index`（可选）、`a set of filesystem layers`和`a Configuration`组成。

（2）容器镜像

容器镜像是用来创建容器的，runtime依据容器镜像来创建容器

最常用的Docker镜像是符合OCI Image规范的

（3）容器镜像定义工具

容器定义工具允许用户自定义容器的内容和属性，这样容器就能够被保存、共享和创建

dockerfile是包含若干命令的文本文件，可以通过这些命令创建出docker镜像

（4）容器镜像存储仓库

镜像需要统一存储，这个存储的大的仓库叫做Registry。`Docker Hub`和`Quay.io`是为公众提供托管的Registry，我们一般使用`Harbor`来搭建私有的Registry

<br />

### 容器平台技术

容器核心技术可以让容器运行在单个主机上，而容器平台技术可以让容器运行在分布式环境中

<br />

**容器编排引擎**

所谓编排，通常包括容器管理、调度、集群定义和服务发现等。

`docker swarm`是Docker开发的容器编排引擎

`kubernetes`是Google开发的开源容器编排引擎，同时支持Docker和CoreOS容器

<br />

**容器管理平台**

容器管理平台是架构在容器编排引擎之上的一个更为通用的平台，通常容器管理平台可以支持多种编排引擎

`Rancher`是容器管理平台的典型代表