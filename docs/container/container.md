## 容器

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

<br />

### FAQ

## 

## Docker Engine

官网：[https://www.docker.com/](https://www.docker.com/)

### 基础操作

#### 安装

CentOS安装文档：[https://docs.docker.com/engine/install/centos/](https://docs.docker.com/engine/install/centos/)

::: details 点击查看详情

```bash
# 卸载老版本(如果有)
sudo yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-engine

# 安装Docker仓库
sudo yum install -y yum-utils
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
    
# 查看docker-ce所有可安装版本（Docker CE是Docker免费版产品的新名称）
yum list docker-ce --showduplicates
 * updates: mirrors.tuna.tsinghua.edu.cn
Loading mirror speeds from cached hostfile
Loaded plugins: fastestmirror
 * extras: mirrors.tuna.tsinghua.edu.cn
...
docker-ce.x86_64          3:20.10.2-3.el7           docker-ce-stable
docker-ce.x86_64          3:20.10.3-3.el7           docker-ce-stable
docker-ce.x86_64          3:20.10.4-3.el7           docker-ce-stable
docker-ce.x86_64          3:20.10.5-3.el7           docker-ce-stable
docker-ce.x86_64          3:20.10.6-3.el7           docker-ce-stable
docker-ce.x86_64          3:20.10.7-3.el7           docker-ce-stable
docker-ce.x86_64          3:20.10.8-3.el7           docker-ce-stable
docker-ce.x86_64          3:20.10.9-3.el7           docker-ce-stable
docker-ce.x86_64          3:20.10.10-3.el7          docker-ce-stable
docker-ce.x86_64          3:20.10.11-3.el7          docker-ce-stable
docker-ce.x86_64          3:20.10.12-3.el7          docker-ce-stable
docker-ce.x86_64          3:20.10.13-3.el7          docker-ce-stable
docker-ce.x86_64          3:20.10.14-3.el7          docker-ce-stable
docker-ce.x86_64          3:20.10.15-3.el7          docker-ce-stable	# 这里是最新的

# 安装最新版
sudo yum install docker-ce docker-ce-cli containerd.io docker-compose-plugin

# 安装指定版本
# 语法：sudo yum install docker-ce-<VERSION_STRING> docker-ce-cli-<VERSION_STRING> containerd.io docker-compose-plugin
sudo yum install docker-ce-20.10.14 docker-ce-cli-20.10.14 containerd.io docker-compose-plugin

# 启动Docker Engine
sudo systemctl start docker.service
sudo systemctl enable docker.service	# 设置开启自启

# 测试Docker Engine
sudo docker run hello-world
```

:::

#### 运行容器

::: details 运行容器示例

```bash
# 语法
[root@localhost ~]# docker container run --help | head -5
Usage:  docker container run [OPTIONS] IMAGE [COMMAND] [ARG...]
Run a command in a new container

# 运行一个容器
[root@localhost ~]# docker container run centos:7

# 状态为Exited(0)，意思是容器正常运行完后就退出了，容器运行的命令是/bin/bash
[root@localhost ~]# docker container ps -a
CONTAINER ID   IMAGE      COMMAND       CREATED          STATUS                      PORTS     NAMES
e94332164c56   centos:7   "/bin/bash"   41 seconds ago   Exited (0) 41 seconds ago             vigilant_sanderson

# 怎么能让它不退出呢？
```

:::

::: details 容器不退出方式一：前台进程

```bash
# 方式一：
# 容器本质就是一个进程，进程执行完毕自然就退出了，所以容器也自然就退出了，不让容器退出的办法之一就是启动一个不会退出的进程，
# 比如像nginx等服务就是想办法让他在前台运行不退出
# 在这里我们使用一个自定义的命令替换掉/bin/bash
[root@localhost ~]# docker container run centos:7 sleep 100

# 另外开一个终端查看容器信息
[root@localhost ~]# docker container ps 
CONTAINER ID   IMAGE      COMMAND       CREATED          STATUS         PORTS     NAMES
2c2af2267d37   centos:7   "sleep 100"   10 seconds ago   Up 8 seconds             recursing_ride
# ---------------------------------------------------------------------------------------------------
# 如果说容器里我们运行一个nginx，那么就像这样
[root@localhost ~]# docker container run nginx:1.21.6
/docker-entrypoint.sh: /docker-entrypoint.d/ is not empty, will attempt to perform configuration
/docker-entrypoint.sh: Looking for shell scripts in /docker-entrypoint.d/
/docker-entrypoint.sh: Launching /docker-entrypoint.d/10-listen-on-ipv6-by-default.sh
10-listen-on-ipv6-by-default.sh: info: Getting the checksum of /etc/nginx/conf.d/default.conf
10-listen-on-ipv6-by-default.sh: info: Enabled listen on IPv6 in /etc/nginx/conf.d/default.conf
/docker-entrypoint.sh: Launching /docker-entrypoint.d/20-envsubst-on-templates.sh
/docker-entrypoint.sh: Launching /docker-entrypoint.d/30-tune-worker-processes.sh
/docker-entrypoint.sh: Configuration complete; ready for start up
2022/05/12 05:48:15 [notice] 1#1: using the "epoll" event method
2022/05/12 05:48:15 [notice] 1#1: nginx/1.21.6
2022/05/12 05:48:15 [notice] 1#1: built by gcc 10.2.1 20210110 (Debian 10.2.1-6) 
2022/05/12 05:48:15 [notice] 1#1: OS: Linux 3.10.0-693.el7.x86_64
2022/05/12 05:48:15 [notice] 1#1: getrlimit(RLIMIT_NOFILE): 65536:65536
2022/05/12 05:48:15 [notice] 1#1: start worker processes
2022/05/12 05:48:15 [notice] 1#1: start worker process 31
2022/05/12 05:48:15 [notice] 1#1: start worker process 32
2022/05/12 05:48:15 [notice] 1#1: start worker process 33
2022/05/12 05:48:15 [notice] 1#1: start worker process 34

# 另外开一个终端查看容器信息
# nginx -g 'daemon off;'就是nginx在前台运行的命令
[root@localhost ~]# docker container ps --no-trunc
CONTAINER ID                                                       IMAGE          COMMAND                                          CREATED              STATUS              PORTS     NAMES
864381465f51c5b88eb4c11ec78d0cf10593ea8a5f56795698fe5686129cab22   nginx:1.21.6   "/docker-entrypoint.sh nginx -g 'daemon off;'"   34 seconds ago       Up 34 seconds       80/tcp    brave_wilbur
```

:::

::: details 容器不退出方式二：开启标准输入hang住容器

```bash
# 方式二：
# 使用docker container run -i选项，开启标准输入功能，这会hang住容器，让容器不退出
#（注意不是任何程序都支持输入功能，比如/bin/bash和cat是支持的，ls就不支持）

# /bin/bash开启输入功能，支持
[root@localhost ~]# docker container run -i centos:7 
ls -l			# 这里可以输入命令
total 12
-rw-r--r--.   1 root root 12114 Nov 13  2020 anaconda-post.log
lrwxrwxrwx.   1 root root     7 Nov 13  2020 bin -> usr/bin
drwxr-xr-x.   5 root root   340 May 12 05:16 dev
drwxr-xr-x.   1 root root    66 May 12 05:16 etc
drwxr-xr-x.   2 root root     6 Apr 11  2018 home
lrwxrwxrwx.   1 root root     7 Nov 13  2020 lib -> usr/lib
lrwxrwxrwx.   1 root root     9 Nov 13  2020 lib64 -> usr/lib64
drwxr-xr-x.   2 root root     6 Apr 11  2018 media
drwxr-xr-x.   2 root root     6 Apr 11  2018 mnt
drwxr-xr-x.   2 root root     6 Apr 11  2018 opt
dr-xr-xr-x. 204 root root     0 May 12 05:16 proc
dr-xr-x---.   2 root root   114 Nov 13  2020 root
drwxr-xr-x.  11 root root   148 Nov 13  2020 run
lrwxrwxrwx.   1 root root     8 Nov 13  2020 sbin -> usr/sbin
drwxr-xr-x.   2 root root     6 Apr 11  2018 srv
dr-xr-xr-x.  13 root root     0 May 12 00:33 sys
drwxrwxrwt.   7 root root   132 Nov 13  2020 tmp
drwxr-xr-x.  13 root root   155 Nov 13  2020 usr
drwxr-xr-x.  18 root root   238 Nov 13  2020 var
pwd			# 这里可以输入命令
/

[root@localhost ~]# docker container ps
CONTAINER ID   IMAGE      COMMAND       CREATED         STATUS         PORTS     NAMES
529a4f7bd34a   centos:7   "/bin/bash"   4 seconds ago   Up 4 seconds             dreamy_euler

# cat开启输入功能，支持
[root@localhost ~]# docker container run -i centos:7 cat
hello		# 我输入的
hello
world!		# 我输入的
world!

[root@localhost ~]# docker container ps
CONTAINER ID   IMAGE      COMMAND   CREATED          STATUS          PORTS     NAMES
58704e3b1ad7   centos:7   "cat"     27 seconds ago   Up 26 seconds             thirsty_sammet

# ls开启输入功能，不支持
[root@localhost ~]# docker container run -i centos:7 ls
anaconda-post.log
bin
dev
etc
home
lib
lib64
media
mnt
opt
proc
root
run
sbin
srv
sys
tmp
usr
var
```

:::

::: details 容器不退出辅助命令

```bash
# 优化1：添加-t参数，意思是为我们分配一个伪终端tty,通常-it这两个参数一起用
[root@localhost ~]# docker container run -it centos:7
[root@ed41df8e2e3b /]# hostname
ed41df8e2e3b

# 优化2：使用-d参数，意思是以后台方式运行容器并返回容器的ID
[root@localhost ~]# docker container run -itd centos:7		# -it用来hang住容器
d06b76d850c934bfe02785bbd52045694b238f6d40677d1f8eebf7738c07e718

[root@localhost ~]# docker container run -d nginx:1.21.6	# nginx镜像不需要hang住容器，所以可以不用加-it
00b757bf7358ea24b7b17a0f775f3aadb29d268f531d7a87c373747a07cbb3e3
```

:::

#### 设置名称

```bash
# 默认Docker会随机分配名称给新创建的，这时候我们可以手动指定一个名称
# 好处是以后操作容器时可以使用我们指定的名称，更加方便，而不是使用Container ID或随机名称
[root@localhost ~]# docker container run -itd --name mycentos centos:7
c873d90fc350e4218779addc24be5309948010058e397bfd2b4f3845f114d237

[root@localhost ~]# docker container ps
CONTAINER ID   IMAGE      COMMAND       CREATED              STATUS              PORTS     NAMES
c873d90fc350   centos:7   "/bin/bash"   About a minute ago   Up About a minute             mycentos # 我们指定的名称

# 给容器内的centos系统设置一个主机名，并运行hostname命令（替换默认的/bin/bash）
[root@localhost ~]# docker container run -it --name webserver --hostname node1 centos:7 hostname
node1
```

#### 进入容器

```bash
# exec子命令：在容器中运行指定的命令，在这里我们执行的命令是sh，并添加-it，hang住容器
# 就等同于变相的进入了容器
[root@localhost ~]# docker container run -itd centos:7 
7f8576596e250e160f991e38852f9350a12fc244a52563a2a39ef968f375e799
[root@localhost ~]# docker exec -it 7f8576 sh
sh-4.2# ps aux
USER        PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root          1  0.2  0.0  11828  1652 pts/0    Ss+  06:12   0:00 /bin/bash		# 这是hang住容器的那个进程
root         14  0.3  0.0  11824  1656 pts/1    Ss   06:12   0:00 sh			# 这是我们新开的进程sh
root         20  0.0  0.0  51732  1700 pts/1    R+   06:12   0:00 ps aux		# 刚才执行的命令
sh-4.2# 

# attach子命令：直接进入启动容器的终端，不会启动新的进程
[root@localhost ~]# docker attach 7f8576
[root@7f8576596e25 /]# ps aux
USER        PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root          1  0.1  0.0  11828  1880 pts/0    Ss   06:17   0:00 /bin/bash		# 直接进入到这个终端中
root         15  0.0  0.0  51732  1704 pts/0    R+   06:17   0:00 ps aux
# 这时候如果我们使用Ctrl+D或exit命令退出，会导致容器退出
[root@6dc924686c87 /]#
```

#### 重启策略

文档：[https://docs.docker.com/engine/reference/run/#restart-policies---restart](https://docs.docker.com/engine/reference/run/#restart-policies---restart)

`docker container run`创建容器时可以指定容器的重启策略，意思是当容器关闭时是否自动重启

**重启策略**

| 策略                     | 说明                                                         |
| ------------------------ | ------------------------------------------------------------ |
| no                       | 不自动重启（默认策略）                                       |
| always                   | 退出码不为0时自动重启；<br />当重启docker daemon后若容器为停止状态则会自动重启容器 |
| unless-stopped           | 退出码不为0时自动重启；<br />当重启docker daemon后若容器为停止状态不会自动重启容器 |
| on-failure[:max-retries] | 退出码不为0时自动重启；max-retries是可选参数，最多重启次数   |

**退出状态码**

| 状态码     | 说明                           |
| ---------- | ------------------------------ |
| 0          | 容器正常退出                   |
| 125        | Docker daemon进程错误          |
| 126        | 容器启动后要执行的命令无法调用 |
| 127        | 容器启动后要执行的命令无法找到 |
| 其他状态码 | 容器启动后执行的命令退出码     |

<span style="color: red; font-weight: bold;">重要提示：</span>

* <span style="color: red; font-weight: bold;">当退出码为0时，任何重启策略都不会重启容器</span>
* <span style="color: red; font-weight: bold;">docker container stop关闭的容器退出码为0</span>



::: details  查看容器的重启策略信息

```bash
# 随便启动一个容器
[root@localhost ~]# docker container run --name demo centos:7 echo $(date +"%F")
2022-05-12

# 查看状态
[root@localhost ~]# docker container inspect demo | grep -A 13 State
        "State": {
            "Status": "exited",		# 容器状态
            "Running": false,		# 是否正在运行
            "Paused": false,		
            "Restarting": false,
            "OOMKilled": false,
            "Dead": false,
            "Pid": 0,
            "ExitCode": 0,			# 退出码
            "Error": "",
            "StartedAt": "2022-05-12T07:44:42.871097747Z",	# 容器开始运行时间
            "FinishedAt": "2022-05-12T07:44:42.882166096Z"	# 容器结束运行时间
        },
        "Image": "sha256:eeb6ee3f44bd0b5103bb561b4c16bcb82328cfe5809ab675bb17ab3a16c517c9",
[root@localhost ~]# docker container inspect demo -f "{{ .State.Status }}"	# 想看某一个值的话可以使用Go模板语法
exited

# 查看重启次数
[root@localhost ~]# docker container inspect demo -f "{{ .RestartCount }}"
0
```

:::

::: details always重启策略

```bash
# 启动一个容器
[root@localhost ~]# docker container run --name webserver -P -d --restart=always nginx:1.21.6

# 查看容器
[root@localhost ~]# docker container ps
CONTAINER ID   IMAGE          COMMAND                  CREATED         STATUS         PORTS                                     NAMES
6d463a44eedc   nginx:1.21.6   "/docker-entrypoint.…"   4 seconds ago   Up 3 seconds   0.0.0.0:49153->80/tcp, :::49153->80/tcp   webserver

# -----------------------------------------------------------------------------------------------

# 停止容器
[root@localhost ~]# docker container stop webserver
webserver

# 查看是否自动重启了：没有自动重启
[root@localhost ~]# docker container ps
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
# 查看退出码
# 使用docker container stop停止的容器，退出码为0，即使设置always也不会自动重启
[root@localhost ~]# docker container inspect webserver -f "{{ .State.ExitCode }}"
0

# 重启一下Docker Engine
[root@localhost ~]# systemctl restart docker.service

# 查看容器，自动重启了
[root@localhost ~]# docker container ps
CONTAINER ID   IMAGE          COMMAND                  CREATED         STATUS          PORTS                                     NAMES
6d463a44eedc   nginx:1.21.6   "/docker-entrypoint.…"   3 minutes ago   Up 13 seconds   0.0.0.0:49153->80/tcp, :::49153->80/tcp   webserver

# 查看重启次数
[root@localhost ~]# docker container inspect webserver -f "{{ .RestartCount }}"
0

# -----------------------------------------------------------------------------------------------

# 手动kill掉
[root@localhost ~]# docker container inspect webserver -f "{{ .State.Pid }}"
35940
[root@localhost ~]# kill -15 35940

# 查看容器，自动重启了
[root@localhost ~]# docker container ps
CONTAINER ID   IMAGE          COMMAND                  CREATED         STATUS         PORTS                                     NAMES
6d463a44eedc   nginx:1.21.6   "/docker-entrypoint.…"   5 minutes ago   Up 3 seconds   0.0.0.0:49154->80/tcp, :::49154->80/tcp   webserver

# 查看重启次数
[root@localhost ~]# docker container inspect webserver -f "{{ .RestartCount }}"
1
# 检查Pid
[root@localhost ~]# docker container inspect webserver -f "{{ .State.Pid }}"
36630
```

:::

::: details unless-stopped重启策略

```bash
# 启动一个容器
[root@localhost ~]# docker container run --name webserver -P -d --restart=unless-stopped nginx:1.21.6

# 查看容器
[root@localhost ~]# docker container ps
CONTAINER ID   IMAGE          COMMAND                  CREATED         STATUS         PORTS                                     NAMES
cd6c29a9928c   nginx:1.21.6   "/docker-entrypoint.…"   5 seconds ago   Up 4 seconds   0.0.0.0:49155->80/tcp, :::49155->80/tcp   webserver

# -----------------------------------------------------------------------------------------------

# 停止容器
[root@localhost ~]# docker container stop webserver
webserver

# 查看是否自动重启了：没有自动重启
[root@localhost ~]# docker container ps
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
# 查看退出码
# 使用docker container stop停止的容器，退出码为0，即使设置always也不会自动重启
[root@localhost ~]# docker container inspect webserver -f "{{ .State.ExitCode }}"
0

# 重启一下Docker Engine
[root@localhost ~]# systemctl restart docker.service

# 查看容器，没有自动重启
[root@localhost ~]# docker container ps
CONTAINER ID   IMAGE          COMMAND                  CREATED         STATUS          PORTS                                     NAMES

# 查看重启次数
[root@localhost ~]# docker container inspect webserver -f "{{ .RestartCount }}"
0
# -----------------------------------------------------------------------------------------------
# 把容器起起来
[root@localhost ~]# docker container start webserver
webserver

# 手动kill掉
[root@localhost ~]# docker container inspect webserver -f "{{ .State.Pid }}"
37428
[root@localhost ~]# kill -15 37428

# 查看容器，自动重启了
[root@localhost ~]# docker container ps
CONTAINER ID   IMAGE          COMMAND                  CREATED         STATUS         PORTS                                     NAMES
458b89dd302e   nginx:1.21.6   "/docker-entrypoint.…"   2 minutes ago   Up 3 seconds   0.0.0.0:49154->80/tcp, :::49154->80/tcp   webserver

# 查看重启次数
[root@localhost ~]# docker container inspect webserver -f "{{ .RestartCount }}"
1
# 检查Pid
[root@localhost ~]# docker container inspect webserver -f "{{ .State.Pid }}"
37591
```

:::

::: details  其他：构建一个自由控制退出码的镜像

```bash
# Dockerfile
# 可以通过docker container run的时候传参覆盖CMD指令来控制容器退出码
[root@localhost ~]# cat Dockerfile 
FROM centos:7
MAINTAINER VVFock3r
WORKDIR /

RUN echo "#!/bin/bash" > exit.sh && \
    echo "exit \$1"   >> exit.sh && \
    chmod 755 exit.sh

ENTRYPOINT ["./exit.sh"]
CMD ["0"]

# 构建镜像 centos:demo
[root@localhost ~]# docker build -t centos:demo .
Sending build context to Docker daemon     16MB
Step 1/6 : FROM centos:7
 ---> eeb6ee3f44bd
Step 2/6 : MAINTAINER VVFock3r
 ---> Using cache
 ---> f7cea628e420
Step 3/6 : WORKDIR /
 ---> Using cache
 ---> 07f0b2f933b5
Step 4/6 : RUN echo "#!/bin/bash" > exit.sh &&     echo "exit \$1"   >> exit.sh &&     chmod 755 exit.sh
 ---> Using cache
 ---> 7ba25d2264cc
Step 5/6 : ENTRYPOINT ["./exit.sh"]
 ---> Using cache
 ---> b2385bbe65e4
Step 6/6 : CMD ["0"]
 ---> Using cache
 ---> 268bb0cf0753
Successfully built 268bb0cf0753
Successfully tagged centos:demo

# 创建容器
[root@localhost ~]# docker container run --name demo -d --restart=always centos:demo 99 # 设置退出码为99
```

:::

#### 自动删除

我们可以控制容器退出后自动删除，注意与`--restart`选项互斥

```bash
# 启动3个容器
[root@localhost ~]# docker run -itd --rm --name demo1 centos:7
[root@localhost ~]# docker run -itd --rm --name demo2 centos:7
[root@localhost ~]# docker run -itd --rm --name demo3 centos:7 ls

# 停止第一个容器（退出码为0）
[root@localhost ~]# docker container stop demo1

# 停止第二个容器（退出码不为0）
[root@localhost ~]# kill -9 `docker container inspect demo2 -f "{{ .State.Pid }}"`

# 第三个容器运行完成，自动会被删除

# 查看容器（已全部被删除）
[root@localhost ~]# docker container ps -a
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
```

### Docker镜像

#### 修改镜像源

使用Docker时需要首先下载一个官方镜像，例如`ubuntu`、`mysql`，默认会从[Docker Hub](https://hub.docker.com/)中去下载

然而由于网络原因，下载一个Docker官方镜像可能会需要很长的时间，甚至下载失败。为此，我们可以使用国内的镜像源

腾讯云镜像源：https://mirrors.cloud.tencent.com/（点右上角【文档】，在右侧找到Docker源）

阿里云镜像源：https://help.aliyun.com/document_detail/60750.html（根据文档去控制台申请加速地址）

#### 镜像的分层结构

镜像其实就是一个`tar`文件，内部采用的是分层结构，每一层（Layer）存储的只是与上一层的差异，由`Storage Driver`（存储驱动程序）进行管理

`Storage Driver`会把镜像中的每一层挂载为只读模式，通常称为 镜像层，当我们创建容器时，会在镜像层上加一个新的可写的分层，通常称为容器层



**容器层操作细节**

* 添加文件：在容器中创建文件时，新的文件被添加到容器层
* 读取文件：在容器中读取文件时，Docker会从上往下依次在各层中查找此文件，一旦找到，打开并读入内存
* 修改文件：在容器中修改文件时，Docker会从上往下依次在各层中查找此文件，一旦找到，立即将其复制到容器层，然后修改之
* 删除文件：在容器中删除文件时，Docker会从上往下依次在各层中查找此文件，一旦找到，会在容器层中标记为已删除

只有当修改时才复制一份数据，这种特性被称为`Copy-on-Write`



**查看当前Docker Engine所使用的Storage Driver类型**

```bash
[root@localhost ~]# docker info | grep -i storage
 Storage Driver: overlay2
```

**查看镜像分层结构**

```bash
# 方式一：下载镜像时可以看到该镜像有几个分层
[root@localhost ~]# docker image pull nginx:1.21.6
Using default tag: latest
latest: Pulling from library/nginx
1fe172e4850f: Pull complete
35c195f487df: Pull complete
213b9b16f495: Pull complete
a8172d9e19b9: Pull complete
f5eee2cb2150: Pull complete
93e404ba8667: Pull complete
Digest: sha256:859ab6768a6f26a79bc42b231664111317d095a4f04e4b6fe79ce37b3d199097
Status: Downloaded newer image for nginx:latest
docker.io/library/nginx:latest

# 方式二：查看已存在的镜像分层
[root@localhost ~]# docker image inspect nginx:1.21.6 | grep -i layers -A 20
            "Type": "layers",
            "Layers": [
                "sha256:9c1b6dd6c1e6be9fdd2b1987783824670d3b0dd7ae8ad6f57dc3cea5739ac71e",
                "sha256:4b7fffa0f0a4a72b2f901c584c1d4ffb67cce7f033cc7969ee7713995c4d2610",
                "sha256:f5ab86d69014270bcf4d5ce819b9f5c882b35527924ffdd11fecf0fc0dde81a4",
                "sha256:c876aa251c80272eb01eec011d50650e1b8af494149696b80a606bbeccf03d68",
                "sha256:7046505147d7f3edbf7c50c02e697d5450a2eebe5119b62b7362b10662899d85",
                "sha256:b6812e8d56d65d296e21a639b786e7e793e8b969bd2b109fd172646ce5ebe951"
            ]
        },
        "Metadata": {
            "LastTagTime": "0001-01-01T00:00:00Z"
        }
    }
] 
```

还可以通过第三方工具`dive`来查看更具体一些的信息，Github：[https://github.com/wagoodman/dive](https://github.com/wagoodman/dive)

![image-20220510152343911](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20220510152343911.png)

#### 镜像导出和导入

主要有两组命令：

* 镜像导出和导入`save`和`load`
  * `docker save`：导出一个或多个镜像，参数可以跟镜像名，也可以跟容器名（会自动分析所使用的镜像并导出）
  * `docker load`：导入镜像
* 容器文件系统导出和导入`export`和`import`
  * `docker export`：导出一个容器的文件系统
  * `docker import`：导入文件系统镜像

**镜像导出和导**

```bash
# 查看本地镜像
[root@localhost ~]# docker image ls
REPOSITORY    TAG       IMAGE ID       CREATED        SIZE
nginx         1.21.6    fa5269854a5e   2 weeks ago    142MB

# 导出镜像
[root@localhost ~]# docker image save nginx:1.21.6 -o nginx-1.21.6.tar

# 删除镜像
[root@localhost ~]# docker image rm nginx:1.21.6
Untagged: nginx:1.21.6

# 导入镜像
[root@localhost ~]# docker image load -i nginx-1.21.6.tar
Loaded image: nginx:1.21.6
```

**容器文件系统导出和导入**

```bash
# 启动一个容器
[root@localhost ~]# docker container run -itd --name webserver nginx:1.21.6 
3bcb02c10189d426e7892afd9fb086148956d720062cf0f42bb45b887aeb8624

# 写入点数据
[root@localhost ~]# docker container exec -it webserver sh
# seq 10 > 1.txt
# cat 1.txt
1
...
10

# 查看容器，输出结果保存下来后面要用到
[root@localhost ~]# docker container inspect webserver > webserver.inspect.txt

# 导出容器文件系统
[root@localhost ~]# docker container export webserver -o webserver.tar

# 导入文件系统为镜像，nginx:webserver为导入后新镜像的REPOSITORY和TAG，可以不指定但最好指定一下，否则会显示none
[root@localhost ~]# docker image import webserver.tar nginx:webserver
sha256:2ee413eebb660f37d31a6ebc696832c09b044499892f68101478182d73e9a24b

# 查看镜像
[root@localhost ~]# docker image ls
REPOSITORY   TAG         IMAGE ID       CREATED          SIZE
nginx        webserver   2ee413eebb66   12 seconds ago   140MB
nginx        1.21.6      fa5269854a5e   2 weeks ago      142MB

# 直接使用新镜像启动容器会报错，因为导入的容器需要重新指定工作目录和开放的端口以及启动命令
[root@localhost ~]# docker container run -itd --name webserver1 nginx:webserver
docker: Error response from daemon: No command specified.
See 'docker run --help'.

# 重新启动镜像
[root@localhost ~]# docker container run -itd --name webserver2 -w "" --expose 80 --entrypoint "/docker-entrypoint.sh" nginx:webserver nginx -g 'daemon off;'
073eb2ac6f29f55c956329bdb12f5d4078c026217e5285a8c6a94ac76e9c4eb0

# 查看数据是否还存在
[root@localhost ~]# docker container exec -it webserver2 sh
# cat 1.txt
1
...
10
```

#### Dockerfile(1):简介和常用指令

Dockerrfile是一个文本文件，记录了构建镜像的所有步骤

文档：[https://docs.docker.com/engine/reference/builder/](https://docs.docker.com/engine/reference/builder/)



**缓存特性**

Dockerrfile中每一个指令都会创建一个镜像层，上层依赖于下层，docker会缓存已有的镜像层，当某一层发生变化，其上面的所有层都会失效，也就是说当我们改变Dockerfile中指令的执行顺序，或者修改指令，都会使上面的镜像层缓存失效



**Dockerfile常用指令**

| 指令       | 说明                                                         |
| ---------- | ------------------------------------------------------------ |
| FROM       | 指定基础镜像                                                 |
| MATAINER   | 设置镜像作者，可以是任意字符串                               |
| ENV        | 设置环境变量                                                 |
| WORKDIR    | 为后面的COPY、ADD、RUN、CMD、ENTRYPOINT等设置工作目录        |
| COPY       | 将文件复制到镜像                                             |
| ADD        | 将文件复制到镜像，如果文件是归档文件（tar/zip/tgz等）会自动解压 |
| EXPOSE     | 显式地指定容器中的进程会监听某个端口<br />（1）并不会直接将端口自动和宿主机某个端口建立映射关系<br />（2）如果docker run指定-P参数（自动映射）会将所有暴露的端口随机映射到宿主机的高阶端口<br />（3）如果docker run 指定了--net=host（宿主机模式），容器中 EXPOSE 指令暴露的端口会直接使用宿主机对应的端口 |
| VOLUME     | 将文件或目录声明为volume                                     |
| RUN        | 在容器中运行指定的命令，通常用于安装应用和软件包             |
| ENTRYPOINT | 设置容器启动时运行的命令<br />（2）CMD或之后的参数会被当做参数传递给ENTRYPOINT |
| CMD        | 设置容器启动时运行的命令<br />（2）CMD命令可以被docker run之后的参数替换 |



#### Dockerfile(2):CMD和ENTRYPOINT

**相同点**

* 可以有多个CMD或ENTRYPOINT命令但只有最后一个生效

* 都支持Exec和Shell语法格式

  ::: details 以CMD指令举例Exec和Shell格式

  ```bash
  # Exec格式
  CMD [可执行程序, 参数1, 参数2, 参数N...]
  
  # Shell格式
  CMD 可执行程序 参数1 参数2 参数N...
  ```

  :::

* `docker container run`时可以覆盖镜像中的`CMD`或`ENTRYPOINT`命令

**不同点**

* `docker container run`时覆盖镜像中的`CMD`或`ENTRYPOINT`命令时的语法不一样

* CMD额外支持一种格式，`CMD [参数1, 参数2]`，此时可以为ENTRYPOINT指定提供参数（注意：ENTRYPOINT必须使用Exec格式）

  一般我们用作容器启动的默认参数，当用户想替换默认参数时就等同于替换CMD中的参数

**测试**

::: details 相同点测试1：可以有多个CMD或ENTRYPOINT命令但只有最后一个生效

```bash
# 先看一下Dockerfile
[root@localhost ~]# cat Dockerfile 
FROM centos:7
MAINTAINER VVFock3r
WORKDIR /
RUN yum -y update
CMD echo "Hello World!"
CMD for i in `seq 5`; do echo $i; sleep 1; done

# 构建镜像（命令输出省略）
[root@localhost ~]# docker build -t centos:demo .

# 启动容器
# 可以看到Hello World!并没有输出出来
[root@localhost ~]# docker container run --rm centos:demo
1
2
3
4
5

# 将Dockerfile中的CMD替换为ENTRYPOINT测试一下，发现效果是一样的
```

:::

::: details 相同点测试2：都支持Exec和Shell格式语法

```bash
[root@localhost ~]# cat Dockerfile 
FROM centos:7
MAINTAINER VVFock3r
WORKDIR /
RUN yum -y update
# Exec语法
CMD ["ls", "-l"]
# Shell语法
# CMD ls -l

# 构建镜像（命令输出省略）
[root@localhost ~]# docker build -t centos:demo .

# 启动容器（命令输出省略）
[root@localhost ~]# docker container run --rm centos:demo

# 使用CMD不同格式、ENTRYPOINT不同格式重复测试，发现效果是一样的
```

:::

::: details 不同点测试1：`docker container run`时覆盖镜像中的`CMD`或`ENTRYPOINT`命令时的语法不一样

先看一下`docker container run`的语法格式

![image-20220511175138893](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20220511175138893.png)

![image-20220511175249716](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20220511175249716.png)

开始我们的测试

```bash
# 覆盖镜像中CMD指令的语法
# ---------------------------------------------------------------------------------------------
# 先看一下Dockerfile
[root@localhost ~]# cat Dockerfile 
FROM centos:7
MAINTAINER VVFock3r
WORKDIR /
RUN yum -y update
CMD for i in `seq 5`; do echo $i; sleep 1; done

# 构建镜像（命令输出省略）
[root@localhost ~]# docker build -t centos:demo .

# 启动容器（命令输出省略）
[root@localhost ~]# docker container run --rm centos:demo	    # 使用默认参数启动容器
[root@localhost ~]# docker container run --rm centos:demo ls -l # 使用自定义的命令和参数启动容器
# ---------------------------------------------------------------------------------------------

# 覆盖镜像中ENTRYPOINT指令的语法
# 将上面Dockerfile中CMD替换为ENTRYPOINT，重新构建镜像，然后继续下一步
[root@localhost ~]# docker container run --rm centos:demo						# 使用默认参数启动容器
[root@localhost ~]# docker container run --rm --entrypoint ls centos:demo		# 替换默认的ENTRYPOINT

# 如果我们想给ENTRYPOINT加一个参数，可能会这样写，但是报错了
[root@localhost ~]# docker container run --rm --entrypoint ls -l centos:demo	
"docker container run" requires at least 1 argument.
See 'docker container run --help'.

Usage:  docker container run [OPTIONS] IMAGE [COMMAND] [ARG...]

Run a command in a new container
# 解决办法是参数通过CMD形式传递
[root@localhost ~]# docker container run --rm --entrypoint ls  centos:demo -l -h -a --color=auto
total 12K
drwxr-xr-x.   1 root root   6 May 11 10:02 .
drwxr-xr-x.   1 root root   6 May 11 10:02 ..
-rwxr-xr-x.   1 root root   0 May 11 10:02 .dockerenv
-rw-r--r--.   1 root root 12K Nov 13  2020 anaconda-post.log
lrwxrwxrwx.   1 root root   7 Nov 13  2020 bin -> usr/bin
drwxr-xr-x.   5 root root 340 May 11 10:02 dev
drwxr-xr-x.   1 root root  66 May 11 10:02 etc
drwxr-xr-x.   2 root root   6 Apr 11  2018 home
lrwxrwxrwx.   1 root root   7 Nov 13  2020 lib -> usr/lib
lrwxrwxrwx.   1 root root   9 Nov 13  2020 lib64 -> usr/lib64
drwxr-xr-x.   2 root root   6 Apr 11  2018 media
drwxr-xr-x.   2 root root   6 Apr 11  2018 mnt
drwxr-xr-x.   2 root root   6 Apr 11  2018 opt
dr-xr-xr-x. 221 root root   0 May 11 10:02 proc
dr-xr-x---.   2 root root 114 Nov 13  2020 root
drwxr-xr-x.   1 root root  19 May 11 09:22 run
lrwxrwxrwx.   1 root root   8 Nov 13  2020 sbin -> usr/sbin
drwxr-xr-x.   2 root root   6 Apr 11  2018 srv
dr-xr-xr-x.  13 root root   0 May 11 05:51 sys
drwxrwxrwt.   1 root root   6 May 11 09:22 tmp
drwxr-xr-x.   1 root root  96 Nov 13  2020 usr
drwxr-xr-x.   1 root root  78 Nov 13  2020 var
```

:::

::: details 不同点测试2：CMD可以为ENTRYPOINT指定提供默认参数（ENTRYPOINT必须使用Exec格式）

```bash
# 查看Dockerfile
[root@localhost ~]# cat Dockerfile 
FROM centos:7
MAINTAINER VVFock3r
WORKDIR /
RUN yum -y update
ENTRYPOINT ["ls"]
CMD ["-l", "-h"]

# 构建镜像（命令输出省略）
[root@localhost ~]# docker build -t centos:demo .

# 启动容器
[root@localhost ~]# docker container run -it --rm centos:demo
total 12K
-rw-r--r--.   1 root root 12K Nov 13  2020 anaconda-post.log
lrwxrwxrwx.   1 root root   7 Nov 13  2020 bin -> usr/bin
drwxr-xr-x.   5 root root 360 May 11 10:09 dev
drwxr-xr-x.   1 root root  66 May 11 10:09 etc
drwxr-xr-x.   2 root root   6 Apr 11  2018 home
lrwxrwxrwx.   1 root root   7 Nov 13  2020 lib -> usr/lib
lrwxrwxrwx.   1 root root   9 Nov 13  2020 lib64 -> usr/lib64
drwxr-xr-x.   2 root root   6 Apr 11  2018 media
drwxr-xr-x.   2 root root   6 Apr 11  2018 mnt
drwxr-xr-x.   2 root root   6 Apr 11  2018 opt
dr-xr-xr-x. 219 root root   0 May 11 10:09 proc
dr-xr-x---.   2 root root 114 Nov 13  2020 root
drwxr-xr-x.   1 root root  19 May 11 09:22 run
lrwxrwxrwx.   1 root root   8 Nov 13  2020 sbin -> usr/sbin
drwxr-xr-x.   2 root root   6 Apr 11  2018 srv
dr-xr-xr-x.  13 root root   0 May 11 05:51 sys
drwxrwxrwt.   1 root root   6 May 11 09:22 tmp
drwxr-xr-x.   1 root root  96 Nov 13  2020 usr
drwxr-xr-x.   1 root root  78 Nov 13  2020 var

# ---------------------------------------------------------------------------------------------
# 现在我们将 ENTRYPOINT ["ls"]替换为 ENTRYPOINT ls，来验证Shell格式是否可以

# 修改Dockerfile（省略）
# 构建镜像（命令输出省略）

# 启动容器，可以看到CMD中的参数并没有生效
[root@localhost ~]# docker container run -it --rm centos:demo
anaconda-post.log  dev  home  lib64  mnt  proc  run   srv  tmp  var
bin                etc  lib   media  opt  root  sbin  sys  usr

# 我们使用命令行覆盖CMD指令呢，也没有生效
[root@localhost ~]# docker container run -it --rm centos:demo -l -h 
anaconda-post.log  dev  home  lib64  mnt  proc  run   srv  tmp  var
bin                etc  lib   media  opt  root  sbin  sys  usr

# 我们再覆盖一下ENTRYPOINT呢，可以看到生效了（意料之中）
[root@localhost ~]# docker container run --entrypoint ls -it --rm centos:demo -l -h 
total 12K
-rw-r--r--.   1 root root 12K Nov 13  2020 anaconda-post.log
lrwxrwxrwx.   1 root root   7 Nov 13  2020 bin -> usr/bin
drwxr-xr-x.   5 root root 360 May 11 10:12 dev
drwxr-xr-x.   1 root root  66 May 11 10:12 etc
drwxr-xr-x.   2 root root   6 Apr 11  2018 home
lrwxrwxrwx.   1 root root   7 Nov 13  2020 lib -> usr/lib
lrwxrwxrwx.   1 root root   9 Nov 13  2020 lib64 -> usr/lib64
drwxr-xr-x.   2 root root   6 Apr 11  2018 media
drwxr-xr-x.   2 root root   6 Apr 11  2018 mnt
drwxr-xr-x.   2 root root   6 Apr 11  2018 opt
dr-xr-xr-x. 219 root root   0 May 11 10:12 proc
dr-xr-x---.   2 root root 114 Nov 13  2020 root
drwxr-xr-x.   1 root root  19 May 11 09:22 run
lrwxrwxrwx.   1 root root   8 Nov 13  2020 sbin -> usr/sbin
drwxr-xr-x.   2 root root   6 Apr 11  2018 srv
dr-xr-xr-x.  13 root root   0 May 11 05:51 sys
drwxrwxrwt.   1 root root   6 May 11 09:22 tmp
drwxr-xr-x.   1 root root  96 Nov 13  2020 usr
drwxr-xr-x.   1 root root  78 Nov 13  2020 var
[root@localhost ~]# 
```

:::

#### Dockerfile(3):多阶段构建优化Go项目

（1）创建Go项目

::: details 点击查看详情

```bash
[root@localhost ~]# mkdir webserver
[root@localhost ~]# cd webserver
[root@localhost webserver]# go mod init webserver
go: creating new go.mod: module webserver

[root@localhost webserver]# cat server.go
package main

import (
        "fmt"
        "io"
        "log"
        "net/http"
)

// 处理器
func indexHandler(w http.ResponseWriter, req *http.Request) {
        io.WriteString(w, "Hello, world!\n")
}

func main() {
        // 监听地址
        addr := "0.0.0.0:80"

        // 注册路由
        http.HandleFunc("/", indexHandler)

        // 启动服务
        fmt.Println("* Running on http://" + addr)
        log.Fatal(http.ListenAndServe(addr, nil))
}
```

:::

（2）编写Dockerfile

::: details 点击查看详情

```bash
[root@localhost webserver]# cat Dockerfile
FROM golang:1.18
MAINTAINER VVFock3r
WORKDIR /
COPY server.go .
RUN go build -o server server.go
EXPOSE 80
CMD ["./server"]
```

:::

（3）构建镜像

::: details 点击查看详情

```bash
[root@localhost webserver]# docker build -t server:v1 .
Sending build context to Docker daemon  4.096kB
Step 1/6 : FROM golang:1.18
1.18: Pulling from library/golang
6aefca2dc61d: Pull complete 
967757d56527: Pull complete 
c357e2c68cb3: Pull complete 
c766e27afb21: Pull complete 
d6a8ea6bd5f8: Pull complete 
886d528c0894: Pull complete 
ad84389257db: Pull complete 
Digest: sha256:aa0c16158472cfa9122ea7c54f3933ad79d1e860f216540750ed440bcce841c7
Status: Downloaded newer image for golang:1.18
 ---> 65b2f1fa535f
Step 2/6 : MAINTAINER VVFock3r
 ---> Running in fb57751c56ef
Removing intermediate container fb57751c56ef
 ---> 4c0e15145939
Step 3/6 : WORKDIR /
 ---> Running in 3ecd4a2870f5
Removing intermediate container 3ecd4a2870f5
 ---> 9dcc78ced4ad
Step 4/6 : COPY server.go .
 ---> 34f5e234c295
Step 5/6 : RUN go build -o server server.go
 ---> Running in 8db00c31bc37
Removing intermediate container 8db00c31bc37
 ---> 58736ed6175c
Step 6/6 : CMD ["./server"]
 ---> Running in e58aa4c9f890
Removing intermediate container e58aa4c9f890
 ---> 5117b956c216
Successfully built 5117b956c216
Successfully tagged server:v1

[root@localhost webserver]# docker image ls 
REPOSITORY   TAG          IMAGE ID       CREATED              SIZE
server       v1           f4c28a054488   About a minute ago   970MB		# 比原始镜像多了几M
golang       1.18         65b2f1fa535f   9 hours ago          964MB
```

:::

（4）启动容器试一下

::: details 点击查看详情

```bash
# 启动容器
[root@localhost webserver]# docker container run -itd -P --name server1 server:v1
b4b2c3f81fa96738b7300ee17a83c7c4803702c0038fd9020380e3bb5b05b759

# 查看宿主机映射的端口
[root@localhost webserver]# docker container ps
CONTAINER ID   IMAGE       COMMAND      CREATED          STATUS          PORTS                                     NAMES
b4b2c3f81fa9   server:v1   "./server"   12 seconds ago   Up 10 seconds   0.0.0.0:49160->80/tcp, :::49160->80/tcp   server1

# 访问宿主机端口
[root@localhost webserver]# curl http://127.0.0.1:49160
Hello, world!
```

:::

（5）镜像大小第一次优化：先编译Go项目，然后将编译好的二进制拷贝到镜像中

::: details 点击查看详情

```bash
# 关闭CGO_ENABLED
# 原理：
#   (1) Go在编译时可以选择使用C链接库(C链接库不打包进程序)或纯Go编译(打包所有内容)，CGO_ENABLED参数控制是否启用CGO
#   (2) alpine镜像不包含C链接库，所以当我们启用CGO时同时又使用alpine镜像时，程序会报错not found
[root@localhost webserver]# go env CGO_ENABLED				# 先查看一下CGO_ENABLED这个变量
1															# 1代表开启
[root@localhost webserver]# go env -w CGO_ENABLED=0			# 关闭
[root@localhost webserver]# go build -o server server.go 	# 打包
[root@localhost webserver]# ls -lh server					# 看一下大小
-rwxr-xr-x. 1 root root 6.0M May 11 15:08 server			# 6M

# 修改Dockerfile
[root@localhost webserver]# cat Dockerfile
FROM alpine:3.15.4
MAINTAINER VVFock3r
WORKDIR /
COPY server .
EXPOSE 80
CMD ["./server"]

# 重新构建镜像
[root@localhost webserver]# docker build -t server:v2 .
Sending build context to Docker daemon  6.241MB
Step 1/6 : FROM alpine:3.15.4
3.15.4: Pulling from library/alpine
df9b9388f04a: Pull complete 
Digest: sha256:4edbd2beb5f78b1014028f4fbb99f3237d9561100b6881aabbf5acce2c4f9454
Status: Downloaded newer image for alpine:3.15.4
 ---> 0ac33e5f5afa
Step 2/6 : MAINTAINER VVFock3r
 ---> Running in d7a9ef482595
Removing intermediate container d7a9ef482595
 ---> aa47686fe08c
Step 3/6 : WORKDIR /
 ---> Running in b3399ac114c8
Removing intermediate container b3399ac114c8
 ---> 0b16c287b5e2
Step 4/6 : COPY server .
 ---> 453e503273fd
Step 5/6 : EXPOSE 80
 ---> Running in af5e153a1d41
Removing intermediate container af5e153a1d41
 ---> 6b7a8f1c22aa
Step 6/6 : CMD ["./server"]
 ---> Running in a37a4e6c84de
Removing intermediate container a37a4e6c84de
 ---> 523d460fc716
Successfully built 523d460fc716
Successfully tagged server:v2

# 查看镜像大小
[root@localhost webserver]# docker image ls
REPOSITORY   TAG       IMAGE ID       CREATED          SIZE
server       v2        523d460fc716   21 seconds ago   11.8MB	# 不到12M,小了太多了(偷笑zzz)
server       v1        86114e9e8c94   3 minutes ago    970MB
golang       1.18      65b2f1fa535f   9 hours ago      964MB
alpine       3.15.4    0ac33e5f5afa   5 weeks ago      5.57MB

# 启动容器测一下
[root@localhost webserver]# docker run -itd -P --name server2 server:v2

[root@localhost webserver]# docker ps
CONTAINER ID   IMAGE       COMMAND      CREATED         STATUS         PORTS                                     NAMES
89c5596ec80c   server:v2   "./server"   3 seconds ago   Up 3 seconds   0.0.0.0:49161->80/tcp, :::49161->80/tcp   server2
b4b2c3f81fa9   server:v1   "./server"   3 minutes ago   Up 3 minutes   0.0.0.0:49160->80/tcp, :::49160->80/tcp   server1

[root@localhost webserver]# curl http://127.0.0.1:49161
Hello, world!

# 删除宿主机编译出来的二进制文件
[root@localhost webserver]# rm -vf server
removed 'server'
```

:::

（6）镜像大小第二次优化：使用镜像多阶段构建（推荐）

::: details 点击查看详情

```bash
# 修改Dockerfile
[root@localhost webserver]# cat Dockerfile
# 用于程序编译
FROM golang:1.18.2-alpine3.15 as builder
WORKDIR /build
COPY . .
RUN go build -o server server.go

# 用于程序运行
FROM alpine:3.15.4
MAINTAINER VVFock3r
WORKDIR /
COPY --from=builder /build/server .
EXPOSE 80
CMD ["./server"]

# 构建镜像
[root@localhost webserver]# docker build -t server:v3 .
Sending build context to Docker daemon  4.096kB
Step 1/10 : FROM golang:1.18.2-alpine3.15 as builder
 ---> 04a96eefde03
Step 2/10 : WORKDIR /build
 ---> Using cache
 ---> f8278f940644
Step 3/10 : COPY . .
 ---> 64b46b7ef7c6
Step 4/10 : RUN go build -o server server.go
 ---> Running in 6566bc10f3ad
Removing intermediate container 6566bc10f3ad
 ---> 4b196dce6953
Step 5/10 : FROM alpine:3.15.4
 ---> 0ac33e5f5afa
Step 6/10 : MAINTAINER VVFock3r
 ---> Using cache
 ---> aa47686fe08c
Step 7/10 : WORKDIR /
 ---> Using cache
 ---> 0b16c287b5e2
Step 8/10 : COPY --from=builder /build/server .
 ---> Using cache
 ---> aef7aafb227f
Step 9/10 : EXPOSE 80
 ---> Running in 4f4e2181aae4
Removing intermediate container 4f4e2181aae4
 ---> 47d2bc51d9b0
Step 10/10 : CMD ["./server"]
 ---> Running in 7dbea4b80753
Removing intermediate container 7dbea4b80753
 ---> 24f2f7c399db
Successfully built 24f2f7c399db
Successfully tagged server:v3

# 查看镜像大小
[root@localhost webserver]# docker image ls
REPOSITORY   TAG                 IMAGE ID       CREATED              SIZE
server       v3                  24f2f7c399db   18 seconds ago       11.9MB		# 和v2大小几乎一致
server       v2                  523d460fc716   12 minutes ago       11.8MB
server       v1                  86114e9e8c94   15 minutes ago       970MB
golang       1.18.2-alpine3.15   04a96eefde03   10 hours ago         328MB
golang       1.18                65b2f1fa535f   10 hours ago         964MB
alpine       3.15.4              0ac33e5f5afa   5 weeks ago          5.57MB

# 启动容器测一下
[root@localhost webserver]# docker run -itd -P --name server3 server:v3

[root@localhost webserver]# docker container ps
CONTAINER ID   IMAGE       COMMAND      CREATED          STATUS          PORTS                                     NAMES
10f33df3efc1   server:v3   "./server"   5 seconds ago    Up 4 seconds    0.0.0.0:49162->80/tcp, :::49162->80/tcp   server3
89c5596ec80c   server:v2   "./server"   13 minutes ago   Up 13 minutes   0.0.0.0:49161->80/tcp, :::49161->80/tcp   server2
b4b2c3f81fa9   server:v1   "./server"   16 minutes ago   Up 16 minutes   0.0.0.0:49160->80/tcp, :::49160->80/tcp   server1

[root@localhost webserver]# curl http://127.0.0.1:49162
Hello, world!
```

:::

### Docker存储

#### 持久化方式1：`bind mounts`

文档：[https://docs.docker.com/storage/bind-mounts/](https://docs.docker.com/storage/bind-mounts/)

`bind mounts`方式就是将宿主机上的目录映射到容器中，其特点是以宿主机目录为准，

若宿主机目录为空而容器目录不为空，那么容器目录将被清空（与宿主机保持一致）

`bind mounts`有两种使用方式：

<br />

（1）`-v`选项

语法：`docker container run`时使用 `-v "宿主机目录:容器目录[:读写模式]"`

选项：

* rw：读写模式（默认）
* ro：容器只读模式

<br />

（2）`--mount`选项

语法：`docker container run`时使用 `--mount type=bind,src=宿主机目录,dst=容器目录[,读写模式][,bind-propagation=rprivate] `

选项：

* `type=bind`是固定的，还支持其他的值，但就不属于`bind mounts`的内容了
* `src`也可以写做`source`
* `dst`也可以写作`target`、`destination`
* 读写模式：默认为读写，如果值为readonly则容器内只读
* `bind-propagation`一般用不到，先不讲

<br />

（3）`-v`和`--mount`的不同点

在映射时如果本地目录不存在，`-v`选项会自动创建本地目录，`--mount`选项则会报错

<br />

示例

::: details (1) 基础示例 -v选项

```bash
# 启动一个容器，将本地目录html映射到容器/usr/share/nginx/html中
# (1) 如果本地目录不存在则自动创建
# (2) 如果容器中的目录原本是有内容的也会被删除，要与本地目录保持一致的数据
[root@localhost ~]# docker container run --name webserver -p 8000:80 -d -v /root/html:/usr/share/nginx/html  nginx:1.21.6

# 创建首页文件
[root@localhost ~]# echo 'hello world!' > /root/html/index.html

# 查看容器
[root@localhost ~]# docker container ps
CONTAINER ID   IMAGE          COMMAND                  CREATED         STATUS         PORTS                                   NAMES
cb1416a20f8e   nginx:1.21.6   "/docker-entrypoint.…"   7 seconds ago   Up 6 seconds   0.0.0.0:8000->80/tcp, :::8000->80/tcp   webserver

# 访问测试
[root@localhost ~]# curl http://127.0.0.1:8000/
hello world!

# 查看容器详情
[root@localhost ~]# docker container inspect webserver  | grep -i -A 10 Mounts 
        "Mounts": [
            {
                "Type": "bind",								# 类型
                "Source": "/root/html",						# 宿主机目录
                "Destination": "/usr/share/nginx/html",		# 容器目录
                "Mode": "",									# 模式
                "RW": true,									# 是否支持读写
                "Propagation": "rprivate"					# 传播方式
            }
        ],
        "Config": {
```

:::

::: details (2) 基础示例 --mount选项

```bash
# 创建容器
[root@localhost ~]# docker container run --name webserver -p 8000:80 -d --mount type=bind,src=/root/html,dst=/usr/share/nginx/html  nginx:1.21.6

# 查看容器
[root@localhost ~]# docker container ps
CONTAINER ID   IMAGE          COMMAND                  CREATED              STATUS              PORTS                                   NAMES
0aa307c705af   nginx:1.21.6   "/docker-entrypoint.…"   About a minute ago   Up About a minute   0.0.0.0:8000->80/tcp, :::8000->80/tcp   webserver

# 创建首页文件
[root@localhost ~]# echo 'hello world!' > /root/html/index.html

# 访问测试
[root@localhost ~]# curl http://127.0.0.1:8000/
hello world!

# 查看容器详情
[root@localhost ~]# docker container inspect webserver  | grep -i -A 10 Mounts
            "Mounts": [
                {
                    "Type": "bind",
                    "Source": "/root/html",
                    "Target": "/usr/share/nginx/html"
                }
            ],
            "MaskedPaths": [
                "/proc/asound",
                "/proc/acpi",
                "/proc/kcore",
--
        "Mounts": [
            {
                "Type": "bind",
                "Source": "/root/html",
                "Destination": "/usr/share/nginx/html",
                "Mode": "",
                "RW": true,
                "Propagation": "rprivate"
            }
        ],
        "Config": {
```

:::

::: details (3)映射多个目录 -v选项

```bash
# 目标：我们将nginx的配置文件目录和数据目录全部映射出来

# ---------------------------------------------------------------------------------------------------------
# 准备工作
# 先启动一个nginx，将容器中的目录拷贝至本地，然后再进行映射（不然直接映射的话，本地又没有文件，会导致容器映射的目录会被清空，进而导致容器启动失败）
[root@localhost ~]# docker container run --name webserver -d nginx:1.21.6

# 拷贝文件到本地目录
[root@localhost ~]# mkdir -p nginx/etc/
[root@localhost ~]# mkdir -p nginx/usr/share/
[root@localhost ~]# docker container cp webserver:/etc/nginx/ ./nginx/etc/
[root@localhost ~]# docker container cp webserver:/usr/share/nginx/ ./nginx/usr/share/

# 删除容器
docker container rm -f webserver

# ---------------------------------------------------------------------------------------------------------
# 创建新的容器
[root@localhost ~]# docker container run --name webserver -p 8000:80 -d -v /root/nginx/etc/nginx/:/etc/nginx/ -v /root/nginx/usr/share/nginx/:/usr/share/nginx/ nginx:1.21.6

# 访问测试
[root@localhost conf.d]# curl http://127.0.0.1:8000/
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
<style>
html { color-scheme: light dark; }
body { width: 35em; margin: 0 auto;
font-family: Tahoma, Verdana, Arial, sans-serif; }
</style>
</head>
<body>
<h1>Welcome to nginx!</h1>
<p>If you see this page, the nginx web server is successfully installed and
working. Further configuration is required.</p>

<p>For online documentation and support please refer to
<a href="http://nginx.org/">nginx.org</a>.<br/>
Commercial support is available at
<a href="http://nginx.com/">nginx.com</a>.</p>

<p><em>Thank you for using nginx.</em></p>
</body>
</html>
```

:::

::: details (4) 映射目录为只读模式 -v选项

```bash
# 创建容器
[root@localhost ~]# docker container run --name webserver -P -d -v /root/readonly:/tmp/readonly:ro nginx:1.21.6

# 在容器内创建文件
[root@localhost ~]# docker container exec -it webserver touch /tmp/readonly/a.txt
touch: cannot touch '/tmp/readonly/a.txt': Read-only file system
```

:::

::: details (5) -v和--mount的不同

```bash
# -v选项
[root@localhost ~]# docker container run -P -d -v /tmp/a11:/tmp/a11 nginx:1.21.6
[root@localhost ~]# ls -ld /tmp/a11/
drwxr-xr-x. 2 root root 6 May 14 16:04 /tmp/a11/

# --mount选项
[root@localhost ~]# docker container run -P -d --mount type=bind,src=/tmp/b11,dst=/tmp/c11 nginx:1.21.6
docker: Error response from daemon: invalid mount config for type "bind": bind source path does not exist: /tmp/b11.
See 'docker run --help'.
```

:::

#### 持久化方式2：`volumes`

文档：[https://docs.docker.com/storage/volumes/](https://docs.docker.com/storage/volumes/)

`volumes`是更为推荐的持久化方式，与`bind mounts`相比具有更好的移植性

volume的使用方式与`bind mounts`很类似，详情可以看上方文档

<br />

`volume`特点：

* 如果卷不存在会自动创建
* 如果是空卷则容器目录会填充卷的内容（这一方面与`bind mounts`完全不一样）

<br />

::: details （1）docker volume命令

```bash
# 查看卷
[root@localhost ~]# docker volume ls
DRIVER    VOLUME NAME

# 创建卷
[root@localhost ~]# docker volume create webserver
webserver
[root@localhost ~]# docker volume ls
DRIVER    VOLUME NAME
local     webserver

# 查看卷详情
[root@localhost ~]# docker volume inspect webserver
[
    {
        "CreatedAt": "2022-05-19T15:48:06+08:00",
        "Driver": "local",
        "Labels": {},
        "Mountpoint": "/var/lib/docker/volumes/webserver/_data",
        "Name": "webserver",
        "Options": {},
        "Scope": "local"
    }
]
```

:::

::: details （2）容器使用volume（使用-v选项举例）

```bash
# 使用一个已经存在的卷
[root@localhost ~]# docker container run --name webserver -v webserver:/usr/share/nginx/ -d nginx:1.21.6

# 查看容器信息
[root@localhost ~]# docker container inspect webserver | grep -i Mounts -A 13
        "Mounts": [
            {
                "Type": "volume",		# 类型为Volumn
                "Name": "webserver",	# Volumn名称
                "Source": "/var/lib/docker/volumes/webserver/_data",	# 对应的本地文件系统路径
                "Destination": "/usr/share/nginx/",		# 对应的容器目录
                "Driver": "local",
                "Mode": "z",
                "RW": true,
                "Propagation": ""
            }
        ],
        "Config": {
            "Hostname": "90f3864f6b67",

# ---------------------------------------------------------------------------------------------------------
# 当卷不存在时docker会为我们自动创建            
[root@localhost ~]# docker run --name webserver1 -v webserver1:/usr/share/nginx/ -d nginx:1.21.6 # 卷webserver1并不存在
[root@localhost ~]# docker container inspect webserver1 | grep -i Mounts -A 13
        "Mounts": [
            {
                "Type": "volume",		# 这里依旧是volume
                "Name": "webserver1",
                "Source": "/var/lib/docker/volumes/webserver1/_data",
                "Destination": "/usr/share/nginx/",
                "Driver": "local",
                "Mode": "z",
                "RW": true,
                "Propagation": ""
            }
        ],
        "Config": {
            "Hostname": "862e24c37fc7",
[root@localhost ~]# docker volume ls
DRIVER    VOLUME NAME
local     webserver
local     webserver1		# 这里是自动创建的volume

# ---------------------------------------------------------------------------------------------------------
# volume数据为空，容器内有数据，则会将容器的数据拷贝至volume，这一点与bind mounts完全不一样。
[root@localhost html]# cd /var/lib/docker/volumes/webserver/_data
[root@localhost _data]# ll
total 0
drwxr-xr-x. 2 root root 40 May 19 16:01 html
```

:::

::: details （3）Dockerfile中的VOLUME指令

```bash
# Dockerfile中的VOLUME指令与EXPOSE类似，在构建镜像时并不会自动创建VOLUME，而是作为一个显示声明
# 当我们创建容器时
# (1) 没有使用-v或--mount时会自动创建匿名卷
# (2) 使用—v或--mount时，目录不一致也会自动创建匿名卷，此时就相当于指定了多个卷

# ---------------------------------------------------------------------------------------------------------
# 匿名卷的使用

# 先查看一下的当前的情况
[root@localhost ~]# docker image ls
REPOSITORY                     TAG                 IMAGE ID       CREATED         SIZE
centos                         7                   eeb6ee3f44bd   8 months ago    204MB
nginx                          1.21.6              7425d3a7c478   8 days ago      142MB
[root@localhost ~]# docker volume ls
DRIVER    VOLUME NAME

# 查看Dockerfile
[root@localhost ~]# cat Dockerfile 
FROM centos:7
MAINTAINER VVFock3r
WORKDIR /
VOLUME ["/data"]
CMD ["/bin/bash"]

# 构建镜像
[root@localhost ~]# docker build -t centos:main .
Sending build context to Docker daemon  16.02MB
Step 1/5 : FROM centos:7
 ---> eeb6ee3f44bd
Step 2/5 : MAINTAINER VVFock3r
 ---> Using cache
 ---> f7cea628e420
Step 3/5 : WORKDIR /
 ---> Using cache
 ---> 07f0b2f933b5
Step 4/5 : VOLUME ["/data"]
 ---> Using cache
 ---> 73570684b51d
Step 5/5 : CMD ["/bin/bash"]
 ---> Using cache
 ---> 48ab01d4fcec
Successfully built 48ab01d4fcec
Successfully tagged centos:main
# 再查看一下VOLUME
[root@localhost ~]# docker volume ls
DRIVER    VOLUME NAME

# 启动容器，不进行持久化
[root@localhost ~]# docker container run -d --name main centos:main

# 再查看一下VOLUME，发现已经自动创建了一个匿名卷，即自动进行了持久化
[root@localhost ~]# docker volume ls
DRIVER    VOLUME NAME
local     807798b92c720098345fb3d9629571bbb67c43d1712248ae45038722cca70a7c

[root@localhost ~]# docker volume inspect 807798b92c720098345fb3d9629571bbb67c43d1712248ae45038722cca70a7c
[
    {
        "CreatedAt": "2022-05-19T19:50:03+08:00",
        "Driver": "local",
        "Labels": null,
        "Mountpoint": "/var/lib/docker/volumes/807798b92c720098345fb3d9629571bbb67c43d1712248ae45038722cca70a7c/_data",
        "Name": "807798b92c720098345fb3d9629571bbb67c43d1712248ae45038722cca70a7c",
        "Options": null,
        "Scope": "local"
    }
]

# 查看一下容器信息
[root@localhost ~]# docker container inspect main | grep -i mounts -A 13
        "Mounts": [
            {
                "Type": "volume",
                "Name": "807798b92c720098345fb3d9629571bbb67c43d1712248ae45038722cca70a7c",
                "Source": "/var/lib/docker/volumes/807798b92c720098345fb3d9629571bbb67c43d1712248ae45038722cca70a7c/_data",
                "Destination": "/data",
                "Driver": "local",
                "Mode": "",
                "RW": true,
                "Propagation": ""
            }
        ],
        "Config": {
            "Hostname": "783eaeaeb92a",
# ---------------------------------------------------------------------------------------------------------
# 再启动一个容器，发现匿名卷又增加了一个
[root@localhost ~]# docker container run -d --name main2 centos:main

[root@localhost ~]# docker volume ls
DRIVER    VOLUME NAME
local     0f6d8c19f62874b7e5f39653c36a67de5bbdc22f4ef516fbe00bef0d554ba05b
local     807798b92c720098345fb3d9629571bbb67c43d1712248ae45038722cca70a7c

# ---------------------------------------------------------------------------------------------------------
# 使用-v可以覆盖Dockerfile中的VOLUME指令

# 启动一个容器，指定使用卷mydata（不存在时会自动创建）
[root@localhost ~]# docker container run -d --name main3 -v mydata:/data/ centos:main

# 查看卷
[root@localhost ~]# docker volume ls
DRIVER    VOLUME NAME
local     0f6d8c19f62874b7e5f39653c36a67de5bbdc22f4ef516fbe00bef0d554ba05b
local     807798b92c720098345fb3d9629571bbb67c43d1712248ae45038722cca70a7c
local     mydata # 这个是自动创建的，匿名卷也没有增加，说明dockerfile中的VOLUME指令并没有生效

# ---------------------------------------------------------------------------------------------------------
# 使用-v时，当持久化容器的目录不一致时，不会进行覆盖
[root@localhost ~]# docker container run -d --name main4 -v mypkg:/pkg/ centos:main # /pkg/与镜像中的/data/不一致，两个卷都会创建

[root@localhost ~]# docker volume ls
DRIVER    VOLUME NAME
local     0f6d8c19f62874b7e5f39653c36a67de5bbdc22f4ef516fbe00bef0d554ba05b	
local     650d74ab0215307f165e07ff39bae4dfb10b6d32561cddec65c28dff207ffda4	# 自动创建的，用于持久化/data/
local     807798b92c720098345fb3d9629571bbb67c43d1712248ae45038722cca70a7c
local     mydata
local     mypkg	# 自动创建的，用于持久化/pkg/


# 看一下容器持久化详情
[root@localhost ~]# docker container inspect main4 | grep -i mounts -A 20
        "Mounts": [
            {
                "Type": "volume",
                "Name": "mypkg",
                "Source": "/var/lib/docker/volumes/mypkg/_data",
                "Destination": "/pkg",
                "Driver": "local",
                "Mode": "z",
                "RW": true,
                "Propagation": ""
            },
            {
                "Type": "volume",
                "Name": "650d74ab0215307f165e07ff39bae4dfb10b6d32561cddec65c28dff207ffda4",
                "Source": "/var/lib/docker/volumes/650d74ab0215307f165e07ff39bae4dfb10b6d32561cddec65c28dff207ffda4/_data",
                "Destination": "/data",
                "Driver": "local",
                "Mode": "",
                "RW": true,
                "Propagation": ""
            }
```

:::

#### 内存文件系统：tmpfs mounts

文档：[https://docs.docker.com/storage/tmpfs/](https://docs.docker.com/storage/tmpfs/)

容器的数据会放到宿主机内存中，当容器重启后数据清空

::: details tmpfs mounts基础操作

```bash
# 启动一个容器，容器的/data目录数据存在于宿主机内存中
[root@localhost ~]# docker container run --name mycentos -itd --mount type=tmpfs,dst=/data centos:7

# 查看卷，并没有创建
[root@localhost ~]# docker volume ls
DRIVER    VOLUME NAME

# 查看容器存储
[root@localhost ~]# docker container inspect mycentos | grep -i mounts -A 13
            "Mounts": [
                {
                    "Type": "tmpfs",
                    "Target": "/data"
                }
            ],
            "MaskedPaths": [
                "/proc/asound",
                "/proc/acpi",
                "/proc/kcore",
                "/proc/keys",
                "/proc/latency_stats",
                "/proc/timer_list",
                "/proc/timer_stats",
--
        "Mounts": [
            {
                "Type": "tmpfs",
                "Source": "",
                "Destination": "/data",
                "Mode": "",
                "RW": true,
                "Propagation": ""
            }
        ],
        "Config": {
            "Hostname": "99d0d321bd5f",
            "Domainname": "",
            "User": "",
            
# 在容器/data中写点数据
[root@localhost ~]# docker container exec -it mycentos /bin/bash
[root@99d0d321bd5f /]# cd /data
[root@99d0d321bd5f data]# seq 100 > 1.txt
[root@99d0d321bd5f data]# exit

# 重启容器，检查数据已经不存在了
[root@localhost ~]# docker container restart mycentos
[root@localhost ~]# docker container exec -it mycentos /bin/bash
[root@99d0d321bd5f /]# ls /data/
[root@99d0d321bd5f /]# 
```

:::

### Docker资源限制

文档：[https://docs.docker.com/config/containers/resource_constraints/](https://docs.docker.com/config/containers/resource_constraints/)

默认Docker是不限制容器所使用的内存、CPU等资源

#### 内存限制

| 选项                  | 说明                                                         |
| --------------------- | ------------------------------------------------------------ |
| `-m` or `--memory`    | 容器可以使用的最大内存<br />如果设置此选项，则允许的最小值为6m（6 MB），也就是说，必须将该值设置为至少6 MB |
| `--memory-swap`       | 容器可以使用的最大交换分区                                   |
| `--memory-swappiness` | 当物理内存剩余N时就开始使用交换分区，可设置范围在0到100之间， 单位百分比<br />不设置此值则默认使用系统设置的值,一般为30（当剩余物理内存小于30%时开始使用交换分区） |
| `--oom-kill-disable`  | 禁用OOM Killer                                               |

#### CPU限制

| 选项            | 说明                                   |
| --------------- | -------------------------------------- |
| `--cpus`        | 可使用的CPU核心数                      |
| `--cpuset-cpus` | 限制容器使用特定的CPU核心，比如0-3,1等 |
| `--cpu-shares`  | CPU共享（相对权重）                    |



### Docker网络

#### Docker自带的3种网络

```bash
# 通过如下命令可以查看Docker自带的3种基本网络，但实际上我们可用的并不仅仅是这3种，后面会一一介绍
[root@localhost ~]# docker network ls
NETWORK ID     NAME      DRIVER    SCOPE
aece42e0e44c   bridge    bridge    local
db9a2c63802b   host      host      local
e05e046464f3   none      null      local
```

#### （1）none网络

文档：[https://docs.docker.com/network/none/](https://docs.docker.com/network/none/)

none类型的网络只有一个回环接口lo，没有办法联网，封闭的网络能很好的保证容器的安全性

::: details 点击查看详情

```bash
# 启动容器,设置网络类型为none
[root@localhost ~]# docker container run --name demo -itd --network=none busybox:1.34

# 查看容器网络模式
[root@localhost ~]# docker container inspect demo | grep -i network
            "NetworkMode": "none", # 网络模式为none类型
        "NetworkSettings": {
            "Networks": {
                    "NetworkID": "e05e046464f3b65349d7895ca9d365f03e5bf261a5e1e30ede561b80f8d2010e",                    
                    
# 在容器中查看网络接口
[root@localhost ~]# docker container exec -it demo ip a
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue qlen 1
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
```

:::

#### （2）host网络

文档：[https://docs.docker.com/network/host/](https://docs.docker.com/network/host/)

host类型的网络和和宿主机共用一个`Network Namespace`，即<span style="color: red; font-weight: bold;">容器和宿主机的IP和端口等是共用的</span>

::: details 点击查看详情

```bash
# 启动容器,设置网络类型为host
[root@localhost ~]# docker run --name demo -itd --network host busybox:1.34

# 查看容器网络模式
[root@localhost ~]# docker container inspect demo | grep -i network
            "NetworkMode": "host",
        "NetworkSettings": {
            "Networks": {
                    "NetworkID": "db9a2c63802b71ff7c22f7c789415c0dc06f111de9db4e07c4ce13a45d47eea6",
                    
# 在容器中查看网络接口，和宿主机输出一致
[root@localhost ~]# docker container exec -it demo ip a
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue qlen 1
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host 
       valid_lft forever preferred_lft forever
2: ens33: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast qlen 1000
    link/ether 00:0c:29:9b:05:4a brd ff:ff:ff:ff:ff:ff
    inet 192.168.48.133/24 brd 192.168.48.255 scope global dynamic ens33
       valid_lft 1010sec preferred_lft 1010sec
    inet6 fe80::10b3:d204:8d1d:93f7/64 scope link 
       valid_lft forever preferred_lft forever
3: docker0: <NO-CARRIER,BROADCAST,MULTICAST,UP> mtu 1500 qdisc noqueue 
    link/ether 02:42:c2:e3:1b:d5 brd ff:ff:ff:ff:ff:ff
    inet 172.17.0.1/16 brd 172.17.255.255 scope global docker0
       valid_lft forever preferred_lft forever
    inet6 fe80::42:c2ff:fee3:1bd5/64 scope link 
       valid_lft forever preferred_lft forever

# ------------------------------------------------------------------------------------------------------------------
# 在宿主机监听一个端口，然后进入容器继续监听此端口，发现端口已经被占用了

# 宿主机监听10000端口
[root@localhost ~]# nc -l -v -p 10000
Ncat: Version 7.50 ( https://nmap.org/ncat )
Ncat: Listening on :::10000
Ncat: Listening on 0.0.0.0:10000

# 进入容器，也监听10000端口，发现端口被占用
[root@localhost ~]# docker container exec -it demo nc -l -v -p 10000
nc: bind: Address already in use
```

:::

#### （3）container网络

我们在启动容器时候，可以指定共享已存在的容器的网络

::: details container网络

```bash
# 启动一个容器
[root@localhost ~]# docker container run --name demo1 -itd busybox:1.34

# 再启动一个容器，通过--network container:demo1参数，指定共享demo1容器的网络
[root@localhost ~]# docker container run --name demo2 -itd --network container:demo1 busybox:1.34

# 分别查看两个容器的IP，发现是一样的
[root@localhost ~]# docker container exec -it demo1 ip a
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue qlen 1
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
30: eth0@if31: <BROADCAST,MULTICAST,UP,LOWER_UP,M-DOWN> mtu 1500 qdisc noqueue 
    link/ether 02:42:ac:11:00:02 brd ff:ff:ff:ff:ff:ff
    inet 172.17.0.2/16 brd 172.17.255.255 scope global eth0  # IP：172.17.0.2/16
       valid_lft forever preferred_lft forever

[root@localhost ~]# docker container exec -it demo2 ip a
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue qlen 1
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
30: eth0@if31: <BROADCAST,MULTICAST,UP,LOWER_UP,M-DOWN> mtu 1500 qdisc noqueue 
    link/ether 02:42:ac:11:00:02 brd ff:ff:ff:ff:ff:ff
    inet 172.17.0.2/16 brd 172.17.255.255 scope global eth0	 # IP：172.17.0.2/16
       valid_lft forever preferred_lft forever
```

:::



#### （4-1）默认bridge网络

文档：[https://docs.docker.com/network/bridge/](https://docs.docker.com/network/bridge/)

Docker进程启动时，会在主机上创建一个名为`docker0`的虚拟网桥，此主机上启动的Docker容器会连接到这个虚拟网桥上。
虚拟网桥的工作方式和物理交换机类似，这样主机上的所有容器就通过交换机连在了一个二层网络中

<br />

`bridge`是创建容器时docker默认网络，相同bridge下的容器可以互相通信，不同bridge下的容器不能通信

<br />

创建容器bridge网络的流程

1. 在宿主机上创建一对虚拟网卡veth pair设备

2. Docker将veth pair设备的一端放在新创建的容器中，并命名为eth0；

   Docker将另一端放在主机中，以veth*这样类似的名字命名，并将这个网络设备加入到docker0网桥中

3. 从`docker0`子网中分配一个IP给容器使用，并设置docker0的IP地址为容器的默认网关

<br />

::: details 相关命令简介

```bash
# yum install -y bridge-utils

# 查看docker自带的3种网络
[root@localhost ~]# docker network ls
NETWORK ID     NAME      DRIVER    SCOPE
e47d2b8de53b   bridge    bridge    local
db9a2c63802b   host      host      local
e05e046464f3   none      null      local

# 查看网桥详情（包含子网和链接的容器等）
[root@localhost ~]# docker network inspect bridge
		# 子网信息
        "IPAM": {
            "Driver": "default",
            "Options": null,
            "Config": [
                {
                    "Subnet": "172.17.0.0/16",	# 子网地址
                    "Gateway": "172.17.0.1"		# 默认网关
                }
            ]
        },
        
        # 链接的容器
        "Containers": {            
        },
        

# 查看系统上的网桥列表
[root@localhost ~]# brctl show
bridge name     bridge id               STP enabled     interfaces
docker0         8000.024259017b71       no

# 在宿主机上和容器种查看veth设备
使用ifconfig、ip a或ip link list等命令
```

:::

::: details （0）准备工作：创建两个容器，分别使用默认网络和指定bridge网络

```bash
# 创建两个容器，一个使用默认的网络，一个指定使用bridge
[root@localhost ~]# docker run -itd --name demo1 busybox:1.34
[root@localhost ~]# docker run -itd --name demo2 --network bridge busybox:1.34
```

:::

::: details （1）docker中的网桥和Linux上的网桥对应关系

```bash
# Linux上的bridge列表
[root@localhost ~]# brctl show
bridge name     		bridge id               STP enabled     interfaces
docker0         		8000.0242dad030cf       no

# Docker中的bridge，对应Linux bridge的docker0
[root@localhost ~]# docker network inspect bridge | grep bridge.name
            "com.docker.network.bridge.name": "docker0",
```

:::

::: details （2）查看默认网桥

默认网桥就是`bridge`，也就是`docker0`，详情请看**【修改默认的bridge】**章节

:::

::: details （3）网桥和容器的对应关系

```bash
# Linux角度来看，docker0网桥下包含2对veth设置
[root@localhost ~]# brctl show
bridge name     bridge id               STP enabled     interfaces
docker0         8000.024259017b71       no              veth2df3118
                                                        vethd035852
# Docker角度来看，默认网桥bridge下包含2个容器
[root@localhost ~]# docker network inspect bridge | grep -i containers -A 15
        "Containers": {
            "6f54d26719d9e45e3a157998607994c29f09ec20a316d1d93ecc700d2fc45065": {
                "Name": "demo1",	# 容器名
                "EndpointID": "9d431e06472f77fed976acb927be1d38540fe25d114ee4e7daca7f15d527bd65",
                "MacAddress": "02:42:ac:11:00:02",
                "IPv4Address": "172.17.0.2/16",
                "IPv6Address": ""
            },
            "be042630a0f8755c713aa29faaa74f7321246b5fd9e9cd96ce7d3a10c011238d": {
                "Name": "demo2",	# 容器名
                "EndpointID": "828bb4005aea51445d236b23a7c13df2cf900d551debb2ae1f4f32a15b9ba0d6",
                "MacAddress": "02:42:ac:11:00:03",
                "IPv4Address": "172.17.0.3/16",
                "IPv6Address": ""
            }
        },
        
# 从容器角度来看所使用的网桥
[root@localhost ~]# docker container inspect demo1 | grep -i network
			# 默认网桥，就是bridge
            "NetworkMode": "default",
        "NetworkSettings": {
            "Networks": {
                    "NetworkID": "e47d2b8de53b2f7f989125a7f7362d15c4185189a6ef91900f8b08311a9676c0",
[root@localhost ~]# docker container inspect demo2 | grep -i network
            "NetworkMode": "bridge",	# 名为bridge的网桥
        "NetworkSettings": {
            "Networks": {
                    "NetworkID": "e47d2b8de53b2f7f989125a7f7362d15c4185189a6ef91900f8b08311a9676c0",
```

:::

::: details （4）宿主机上的veth pair设备和容器中的veth pair设备对应关系

```bash
# 在宿主机上查看veth设备
[root@localhost ~]# ip a
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN qlen 1
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host 
       valid_lft forever preferred_lft forever
2: ens33: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP qlen 1000
    link/ether 00:0c:29:9b:05:4a brd ff:ff:ff:ff:ff:ff
    inet 192.168.48.133/24 brd 192.168.48.255 scope global dynamic ens33
       valid_lft 1167sec preferred_lft 1167sec
    inet6 fe80::10b3:d204:8d1d:93f7/64 scope link 
       valid_lft forever preferred_lft forever
3: docker0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP 
    link/ether 02:42:59:01:7b:71 brd ff:ff:ff:ff:ff:ff
    inet 172.17.0.1/16 brd 172.17.255.255 scope global docker0
       valid_lft forever preferred_lft forever
    inet6 fe80::42:59ff:fe01:7b71/64 scope link 
       valid_lft forever preferred_lft forever

9: veth8041554@if8: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue master docker0 state UP # 这里9和8是一对veth pair设备
    link/ether 12:ca:18:5f:16:66 brd ff:ff:ff:ff:ff:ff link-netnsid 0
    inet6 fe80::10ca:18ff:fe5f:1666/64 scope link 
       valid_lft forever preferred_lft forever

11: veth2df3118@if10: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue master docker0 state UP# 这里11和10是一对veth pair设备
    link/ether aa:3a:c5:72:77:81 brd ff:ff:ff:ff:ff:ff link-netnsid 1
    inet6 fe80::a83a:c5ff:fe72:7781/64 scope link 
       valid_lft forever preferred_lft forever
        
# 在容器中查看veth设备
[root@localhost ~]# docker container exec -it demo1 ip a
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue qlen 1
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
8: eth0@if9: <BROADCAST,MULTICAST,UP,LOWER_UP,M-DOWN> mtu 1500 qdisc noqueue 	# 8和9是一对veth pair设备，正好可以对应上
    link/ether 02:42:ac:11:00:02 brd ff:ff:ff:ff:ff:ff
    inet 172.17.0.2/16 brd 172.17.255.255 scope global eth0
       valid_lft forever preferred_lft forever

[root@localhost ~]# docker container exec -it demo2 ip a
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue qlen 1
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
10: eth0@if11: <BROADCAST,MULTICAST,UP,LOWER_UP,M-DOWN> mtu 1500 qdisc noqueue 	# 10和11是一对veth pair设备，正好可以对应上
    link/ether 02:42:ac:11:00:03 brd ff:ff:ff:ff:ff:ff
    inet 172.17.0.3/16 brd 172.17.255.255 scope global eth0
       valid_lft forever preferred_lft forever
```

:::

#### （4-2）自定义bridge网络

文档：[https://docs.docker.com/network/bridge/](https://docs.docker.com/network/bridge/)

默认的网桥（bridge）并不推荐在生产环境中使用，因为存在一些技术缺陷，更好的方式是使用用户自定义bridge网络

::: details （1）创建自定义bridge网络

```bash
# 从Docker角度，看一下当前的网络
[root@localhost ~]# docker network ls
NETWORK ID     NAME      DRIVER    SCOPE
e47d2b8de53b   bridge    bridge    local
db9a2c63802b   host      host      local
e05e046464f3   none      null      local

# 从Linux角度，看一下当前的网络
[root@localhost ~]# brctl show
bridge name     bridge id               STP enabled     interfaces
docker0         8000.024259017b71       no

[root@localhost ~]# ip a
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN qlen 1
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host 
       valid_lft forever preferred_lft forever
2: ens33: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP qlen 1000
    link/ether 00:0c:29:9b:05:4a brd ff:ff:ff:ff:ff:ff
    inet 192.168.48.133/24 brd 192.168.48.255 scope global dynamic ens33
       valid_lft 1446sec preferred_lft 1446sec
    inet6 fe80::10b3:d204:8d1d:93f7/64 scope link 
       valid_lft forever preferred_lft forever
3: docker0: <NO-CARRIER,BROADCAST,MULTICAST,UP> mtu 1500 qdisc noqueue state DOWN 
    link/ether 02:42:59:01:7b:71 brd ff:ff:ff:ff:ff:ff
    inet 172.17.0.1/16 brd 172.17.255.255 scope global docker0
       valid_lft forever preferred_lft forever
    inet6 fe80::42:59ff:fe01:7b71/64 scope link 
       valid_lft forever preferred_lft forever

# 创建一个自定义的网络，网络驱动为bridge，子网172.20.0.0/16，默认网关172.20.0.1
# Linux网桥名字默认是br-xx，如果想要指定的话添加参数 -o com.docker.network.bridge.name=自定义Linux网桥名
[root@localhost ~]# docker network create --driver bridge --subnet 172.20.0.0/16 --gateway 172.20.0.1 bridge2

# 从Docker角度，看一下当前的网络,发现多了一个
[root@localhost ~]# docker network ls
NETWORK ID     NAME      DRIVER    SCOPE
e47d2b8de53b   bridge    bridge    local
8f855e175a4a   bridge2   bridge    local	# 我们自定义的bridge网络，名字叫做bridge2
db9a2c63802b   host      host      local
e05e046464f3   none      null      local

# 从Linux角度，看一下当前的网络
[root@localhost ~]# brctl show
bridge name     	bridge id               STP enabled     interfaces
br-4ead021696e6     8000.02422504f2ac       no		# 我们自定义的bridge网络，在Linux层面名字叫做br-4ead021696e6
docker0         	8000.024259017b71       no

[root@localhost ~]# ip a
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN qlen 1
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host 
       valid_lft forever preferred_lft forever
2: ens33: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP qlen 1000
    link/ether 00:0c:29:9b:05:4a brd ff:ff:ff:ff:ff:ff
    inet 192.168.48.133/24 brd 192.168.48.255 scope global dynamic ens33
       valid_lft 1192sec preferred_lft 1192sec
    inet6 fe80::10b3:d204:8d1d:93f7/64 scope link 
       valid_lft forever preferred_lft forever
3: docker0: <NO-CARRIER,BROADCAST,MULTICAST,UP> mtu 1500 qdisc noqueue state DOWN 
    link/ether 02:42:59:01:7b:71 brd ff:ff:ff:ff:ff:ff
    inet 172.17.0.1/16 brd 172.17.255.255 scope global docker0
       valid_lft forever preferred_lft forever
    inet6 fe80::42:59ff:fe01:7b71/64 scope link 
       valid_lft forever preferred_lft forever
23: br-4ead021696e6: <NO-CARRIER,BROADCAST,MULTICAST,UP> mtu 1500 qdisc noqueue state DOWN 	# 我们自定义的bridge网络
    link/ether 02:42:25:04:f2:ac brd ff:ff:ff:ff:ff:ff
    inet 172.20.0.1/16 brd 172.20.255.255 scope global br-4ead021696e6
       valid_lft forever preferred_lft forever


# 查看bridge2详情
[root@localhost ~]# docker network inspect bridge2
[
    {
        "Name": "bridge2",
        "Id": "4ead021696e67558a4d89ee6dd1cdc0fdf96a4558a604eaaf276591fcb8951a0",
        "Created": "2022-05-21T14:18:15.033409735+08:00",
        "Scope": "local",
        "Driver": "bridge",
        "EnableIPv6": false,
        "IPAM": {
            "Driver": "default",
            "Options": {},
            "Config": [
                {
                    "Subnet": "172.20.0.0/16",
                    "Gateway": "172.20.0.1"
                }
            ]
        },
        "Internal": false,
        "Attachable": false,
        "Ingress": false,
        "ConfigFrom": {
            "Network": ""
        },
        "ConfigOnly": false,
        "Containers": {},
        "Options": {},
        "Labels": {}
    }
]
```

:::

::: details （2）使用自定义bridge网络

```bash
# 创建容器，使用自定义的bridge网络：bridge2
[root@localhost ~]# docker container run --name demo -itd --network bridge2 busybox:1.34

# 查看IP和默认网关
[root@localhost ~]# docker container exec -it demo ip a
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue qlen 1
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
26: eth0@if27: <BROADCAST,MULTICAST,UP,LOWER_UP,M-DOWN> mtu 1500 qdisc noqueue 
    link/ether 02:42:ac:14:00:02 brd ff:ff:ff:ff:ff:ff
    inet 172.20.0.2/16 brd 172.20.255.255 scope global eth0		# IP：172.20.0.2
       valid_lft forever preferred_lft forever
[root@localhost ~]# docker container exec -it demo route -n
Kernel IP routing table
Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
0.0.0.0         172.20.0.1      0.0.0.0         UG    0      0        0 eth0	# 默认网关：172.20.0.1
172.20.0.0      0.0.0.0         255.255.0.0     U     0      0        0 eth0
```

:::

#### （4-3）自定义bridge与默认的区别

文档：[https://docs.docker.com/network/bridge/](https://docs.docker.com/network/bridge/)

::: details （1）自定义bridge网络支持DNS通信（容器名称或网络别名），而默认bridge不支持

```bash
# ----------------------------------------------------------------------------------
# 默认bridge不可以使用容器名称来进行通信

# 启动2个容器，使用默认bridge
[root@localhost ~]# docker container run --name demo1 -itd busybox:1.34
[root@localhost ~]# docker container run --name demo2 -itd busybox:1.34

# 查看他们的IP
# 也可以使用其他方式查看IP，道理是一样的，比如：docker container exec -it demo2 ip a
[root@localhost ~]# docker container inspect demo1 -f "{{ .NetworkSettings.IPAddress }}"  
172.17.0.2
[root@localhost ~]# docker container inspect demo2 -f "{{ .NetworkSettings.IPAddress }}"
172.17.0.3

# 使用IP通信，没问题
[root@localhost ~]# docker container exec -it demo1 ping -c 3 172.17.0.3
PING 172.17.0.3 (172.17.0.3): 56 data bytes
64 bytes from 172.17.0.3: seq=0 ttl=64 time=0.210 ms
64 bytes from 172.17.0.3: seq=1 ttl=64 time=0.072 ms
64 bytes from 172.17.0.3: seq=2 ttl=64 time=0.090 ms
--- 172.17.0.3 ping statistics ---
3 packets transmitted, 3 packets received, 0% packet loss
round-trip min/avg/max = 0.072/0.124/0.210 ms

[root@localhost ~]# docker container exec -it demo2 ping -c 3 172.17.0.2
PING 172.17.0.2 (172.17.0.2): 56 data bytes
64 bytes from 172.17.0.2: seq=0 ttl=64 time=0.156 ms
64 bytes from 172.17.0.2: seq=1 ttl=64 time=0.075 ms
64 bytes from 172.17.0.2: seq=2 ttl=64 time=0.123 ms
--- 172.17.0.2 ping statistics ---
3 packets transmitted, 3 packets received, 0% packet loss
round-trip min/avg/max = 0.075/0.118/0.156 ms

# 使用容器名通信，网络不同
[root@localhost ~]# docker container exec -it demo1 ping -c 3 demo2
ping: bad address 'demo2'
[root@localhost ~]# docker container exec -it demo2 ping -c 3 demo1
ping: bad address 'demo1'

# ----------------------------------------------------------------------------------
# 自定义bridge可以使用容器名称或网络别名来进行通信

# 启动2个容器，指定使用自定义bridge网络，bridge2我们之前已经创建过了
[root@localhost ~]# docker container run --name demo3 -itd --network bridge2 --network-alias demo33 busybox:1.34
[root@localhost ~]# docker container run --name demo4 -itd --network bridge2 --network-alias demo44 busybox:1.34

# 查看他们的IP，注意这里查看的地方变化了
[root@localhost ~]# docker container inspect demo3 -f "{{ .NetworkSettings.Networks.bridge2.IPAddress }}"  
172.20.0.2
[root@localhost ~]# docker container inspect demo4 -f "{{ .NetworkSettings.Networks.bridge2.IPAddress }}"  
172.20.0.3

# 通过容器名来测试连通性
[root@localhost ~]# docker container exec -it demo3 ping -c 3 demo4
PING demo4 (172.20.0.3): 56 data bytes
64 bytes from 172.20.0.3: seq=0 ttl=64 time=0.058 ms
64 bytes from 172.20.0.3: seq=1 ttl=64 time=0.068 ms
64 bytes from 172.20.0.3: seq=2 ttl=64 time=0.083 ms
--- demo4 ping statistics ---
3 packets transmitted, 3 packets received, 0% packet loss
round-trip min/avg/max = 0.058/0.069/0.083 ms

[root@localhost ~]# docker container exec -it demo4 ping -c 3 demo3
PING demo3 (172.20.0.2): 56 data bytes
64 bytes from 172.20.0.2: seq=0 ttl=64 time=0.073 ms
64 bytes from 172.20.0.2: seq=1 ttl=64 time=0.085 ms
64 bytes from 172.20.0.2: seq=2 ttl=64 time=0.069 ms
--- demo3 ping statistics ---
3 packets transmitted, 3 packets received, 0% packet loss
round-trip min/avg/max = 0.069/0.075/0.085 ms

# 通过网络别名来测试连通性
[root@localhost ~]# docker container exec -it demo3 ping -c 3 demo44
PING demo44 (172.20.0.3): 56 data bytes
64 bytes from 172.20.0.3: seq=0 ttl=64 time=0.072 ms
64 bytes from 172.20.0.3: seq=1 ttl=64 time=0.071 ms
64 bytes from 172.20.0.3: seq=2 ttl=64 time=0.067 ms
--- demo44 ping statistics ---
3 packets transmitted, 3 packets received, 0% packet loss
round-trip min/avg/max = 0.067/0.070/0.072 ms

[root@localhost ~]# docker container exec -it demo4 ping -c 3 demo33
PING demo33 (172.20.0.2): 56 data bytes
64 bytes from 172.20.0.2: seq=0 ttl=64 time=0.075 ms
64 bytes from 172.20.0.2: seq=1 ttl=64 time=0.071 ms
64 bytes from 172.20.0.2: seq=2 ttl=64 time=0.069 ms
--- demo33 ping statistics ---
3 packets transmitted, 3 packets received, 0% packet loss
round-trip min/avg/max = 0.069/0.071/0.075 ms
```

:::

::: details （2）自定义bridge网络支持设置容器静态IP，而默认bridge不支持

```bash
# 查看默认网桥bridge和自定义网桥bridge2的网段
[root@localhost ~]# docker network inspect bridge | grep -i Subnet
                    "Subnet": "172.17.0.0/16",
[root@localhost ~]# docker network inspect bridge2 | grep -i Subnet
                    "Subnet": "172.20.0.0/16",

# -----------------------------------------------------------------------------------------------------------
# 默认网桥指定静态IP
# （1）指定network为bridge时直接报错
[root@localhost ~]# docker container run --name demo1 --network bridge --ip 172.17.0.100 -itd busybox:1.34
9acc8de3a1586afbe6ccaf794f1c0361250c0c0e298f24a586e6d3e1a19717e9
docker: Error response from daemon: user specified IP address is supported on user defined networks only.

# （2）不指定时不会报错，但是并没有分配我们指定的静态IP
[root@localhost ~]# docker container run --name demo1 --ip 172.17.0.100 -itd busybox:1.34
a0805b036165408cbdeabbfaa21b110df42cf994df2e19b9d3b03fe922352596

[root@localhost ~]# docker container inspect demo1 -f "{{ .NetworkSettings.Networks.bridge.IPAddress }}"
172.17.0.2

# -----------------------------------------------------------------------------------------------------------
# 自定义网桥指定静态IP
[root@localhost ~]# docker container run --name demo2 --network bridge2 --ip 172.20.0.100 -itd busybox:1.34
1f76c49de62a70d664d73608541689d4ad75d746f9a59e8415386e258435a7b9

[root@localhost ~]# docker container inspect demo2 -f "{{ .NetworkSettings.Networks.bridge2.IPAddress }}"
172.20.0.100
```

:::

#### （4-4）不同bridge下的容器互通

::: details 不同bridge下的容器互通

```bash
# 创建两个容器，分别属于不同的网桥
[root@localhost ~]# docker container run --name demo1 --network bridge  -itd busybox:1.34
[root@localhost ~]# docker container run --name demo2 --network bridge2 -itd busybox:1.34

# 查看两个容器的IP
[root@localhost ~]# docker container inspect demo1 -f "{{ .NetworkSettings.Networks.bridge.IPAddress }}"
172.17.0.2
[root@localhost ~]# docker container inspect demo2 -f "{{ .NetworkSettings.Networks.bridge2.IPAddress }}"
172.20.0.2

# 不同的bridge下的容器是不能通信的
[root@localhost ~]# docker container exec demo1 ping -c 3 172.20.0.2
PING 172.20.0.2 (172.20.0.2): 56 data bytes
--- 172.20.0.2 ping statistics ---
3 packets transmitted, 0 packets received, 100% packet loss

# 将demo2加入到demo1所在的网桥中，新的网桥会给demo2分配一个新的IP
[root@localhost ~]# docker network connect bridge demo2

# 查看demo2的网络信息
[root@localhost ~]# docker container inspect demo2 -f "{{ json .NetworkSettings.Networks }}" | jq
{
  "bridge": {
    "IPAMConfig": {},
    "Links": null,
    "Aliases": [],
    "NetworkID": "cc4b3794a3f6c4a5a13e4230f10569e3d9c4056774f6e0eb77384b95a8a95fdf",
    "EndpointID": "879bd066516d7436eec9a978c350d71146795594c34916cf5d66bd9df51f78c9",
    "Gateway": "172.17.0.1",
    "IPAddress": "172.17.0.3",		# bridge网桥分配的IP
    "IPPrefixLen": 16,
    "IPv6Gateway": "",
    "GlobalIPv6Address": "",
    "GlobalIPv6PrefixLen": 0,
    "MacAddress": "02:42:ac:11:00:03",
    "DriverOpts": {}
  },
  "bridge2": {
    "IPAMConfig": null,
    "Links": null,
    "Aliases": [
      "2e7375c5c76a"
    ],
    "NetworkID": "4ead021696e67558a4d89ee6dd1cdc0fdf96a4558a604eaaf276591fcb8951a0",
    "EndpointID": "ee6cd43fb03ac3118cfe787a7ae8eb74166b1c4133829cb54d3d5c47310dfde3",
    "Gateway": "172.20.0.1",
    "IPAddress": "172.20.0.2",
    "IPPrefixLen": 16,
    "IPv6Gateway": "",
    "GlobalIPv6Address": "",
    "GlobalIPv6PrefixLen": 0,
    "MacAddress": "02:42:ac:14:00:02",
    "DriverOpts": null
  }
}

# 通信测试
[root@localhost ~]# docker container exec demo1 ping -c 3 172.17.0.3
PING 172.17.0.3 (172.17.0.3): 56 data bytes
64 bytes from 172.17.0.3: seq=0 ttl=64 time=0.087 ms
64 bytes from 172.17.0.3: seq=1 ttl=64 time=0.081 ms
64 bytes from 172.17.0.3: seq=2 ttl=64 time=0.114 ms
--- 172.17.0.3 ping statistics ---
3 packets transmitted, 3 packets received, 0% packet loss
round-trip min/avg/max = 0.081/0.094/0.114 ms

# 查看demo2容器，本质就是分配了两块网卡
[root@localhost ~]# docker container exec demo2 ip a 
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
26: eth0@if27: <BROADCAST,MULTICAST,UP,LOWER_UP,M-DOWN> mtu 1500 qdisc noqueue 
    link/ether 02:42:ac:14:00:02 brd ff:ff:ff:ff:ff:ff
    inet 172.20.0.2/16 brd 172.20.255.255 scope global eth0
       valid_lft forever preferred_lft forever
28: eth1@if29: <BROADCAST,MULTICAST,UP,LOWER_UP,M-DOWN> mtu 1500 qdisc noqueue 
    link/ether 02:42:ac:11:00:03 brd ff:ff:ff:ff:ff:ff
    inet 172.17.0.3/16 brd 172.17.255.255 scope global eth1
       valid_lft forever preferred_lft forever
```

:::

#### （4-5）修改默认的bridge

文档：[https://docs.docker.com/network/bridge/#configure-the-default-bridge-network](https://docs.docker.com/network/bridge/#configure-the-default-bridge-network)

需要说明的是：

（1）从docker角度看默认的网桥是`bridge`，从Linux角度看默认的网桥是`docker0`，他俩是一个东西

（2）假设我们有两个网桥`docker0`和`docker1`，我们想让docker1作为默认网桥，这是不可以的，默认的网桥必须是`docker0`，原因是：

* `bridge`是不允许删除的

  ```bash
  [root@localhost ~]# docker network rm bridge
  Error response from daemon: bridge is a pre-defined network and cannot be removed
  ```

* `bridge`对应的Linux网桥是`docker0`

  ```bash
  [root@localhost ~]# docker network inspect bridge | grep bridge.name
              "com.docker.network.bridge.name": "docker0",
  ```

* `docker0`是可以被删除的，但是在启动docker的时候会重新创建`docker0`

  ::: details 点击查看详情

  ```bash
  # 删除docker0网桥
  [root@localhost ~]# ip link set dev docker0 down
  [root@localhost ~]# brctl delbr docker0
  
  # 查看网桥列表
  [root@localhost ~]# brctl show
  bridge name     bridge id               STP enabled     interfaces
  
  # 查看docker bridge网桥（没有变化）
  [root@localhost ~]# docker network ls
  NETWORK ID     NAME      DRIVER    SCOPE
  70cd27ddf376   bridge    bridge    local
  db9a2c63802b   host      host      local
  e05e046464f3   none      null      local
  
  # 创建容器会失败（底层网桥都没了）
  [root@localhost ~]# docker run --rm -itd centos:7
  5d5bb734fa70390564b43764b22c0348a66ec9c7252ab3fff24338ee550b989f
  docker: Error response from daemon: failed to create endpoint pedantic_poitras on network bridge: adding interface veth954f245 to bridge docker0 failed: could not find bridge docker0: route ip+net: no such network interface.
  
  # 重启Docker
  [root@localhost ~]# systemctl restart docker.service
  
  # 查看Linux网桥
  [root@localhost ~]# brctl show
  bridge name     bridge id               STP enabled     interfaces
  docker0         8000.02426f6d6288       no
  
  # 创建容器没问题
  [root@localhost ~]# docker run --rm -itd centos:7
  284d036ab36a1ec02da91f11dda590ae72c5fabfd35cb2ecb1d792109ab02e3e
  ```

  :::

（3）我们修改默认网桥，其实是对`docker0`做一些配置，比如定义子网等



::: details 修改子网和默认网关

```bash
# 修改daemon.json文件
[root@localhost _data]# vim /etc/docker/daemon.json 
{
   "registry-mirrors": [
        "https://6xumug9e.mirror.aliyuncs.com"
  ],						# 这里使用逗号分隔多个字段
 "bip": "192.168.1.1/24"    # 注意json文件末尾不能有逗号
}

# 重启docker
[root@localhost ~]# systemctl restart docker.service

# 查看默认网桥bridge的子网
[root@localhost ~]# docker network inspect bridge
[
    {
        "Name": "bridge",
        "Id": "27388f5b5aafb240f1c0a84f4017eae04a96de8af5416e8fd912e8be54866cdb",
        "Created": "2022-05-26T15:03:20.113023733+08:00",
        "Scope": "local",
        "Driver": "bridge",
        "EnableIPv6": false,
        "IPAM": {
            "Driver": "default",
            "Options": null,
            "Config": [
                {
                    "Subnet": "192.168.1.0/24",		# 子网已经修改
                    "Gateway": "192.168.1.1"		# 默认网关也修改了
                }
            ]
        },
        "Internal": false,
        "Attachable": false,
        "Ingress": false,
        "ConfigFrom": {
            "Network": ""
        },
        "ConfigOnly": false,
        "Containers": {},
        "Options": {
            "com.docker.network.bridge.default_bridge": "true",
            "com.docker.network.bridge.enable_icc": "true",
            "com.docker.network.bridge.enable_ip_masquerade": "true",
            "com.docker.network.bridge.host_binding_ipv4": "0.0.0.0",
            "com.docker.network.bridge.name": "docker0",
            "com.docker.network.driver.mtu": "1500"
        },
        "Labels": {}
    }
]
```

:::

## 

## Docker Compose

文档：[https://docs.docker.com/compose/](https://docs.docker.com/compose/)

Github：[https://github.com/docker/compose](https://github.com/docker/compose)

<br />

Compose是一个用于定义和运行多容器Docker应用程序的工具



**版本问题**

* v1版本使用Python编写，v2版本使用Go编写
* 在v1中`docker-compose`是一个独立的命令，而在v2中`docker-compose`作为`docker cli`的一个插件，使用`docker compose`来执行命令



**使用Compose分为三个步骤**

1. 定义`Dockerfile`文件
2. 定义`docker-compose.yml`文件
3. 运行`docker compose up`

### Compose 安装

文档：[https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/)

```bash
# 安装方式1：yum安装（依赖docker-ce仓库）
[root@localhost ~]# yum install docker-compose-plugin
[root@localhost ~]# rpm -ql docker-compose-plugin
/usr/libexec/docker/cli-plugins/docker-compose		# 这个是二进制命令插件，其他的都是一些不重要的文件
/usr/share/doc/docker-compose-plugin
/usr/share/doc/docker-compose-plugin/LICENSE
/usr/share/doc/docker-compose-plugin/MAINTAINERS
/usr/share/doc/docker-compose-plugin/NOTICE
/usr/share/doc/docker-compose-plugin/README.md
/usr/share/licenses/docker-compose-plugin
/usr/share/licenses/docker-compose-plugin/LICENSE
/usr/share/licenses/docker-compose-plugin/NOTICE
[root@localhost ~]# docker compose version
Docker Compose version v2.5.0

# 安装方式2：直接下载二进制
[root@localhost ~]# curl -SL https://github.com/docker/compose/releases/download/v2.6.0/docker-compose-linux-x86_64 -o /usr/libexec/docker/cli-plugins/docker-compose
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0
100 24.7M  100 24.7M    0     0  5401k      0  0:00:04  0:00:04 --:--:-- 6701k
[root@localhost ~]# chmod 755 /usr/libexec/docker/cli-plugins/docker-compose
[root@localhost ~]# docker compose version
Docker Compose version v2.6.0

# -------------------------------------------------------------------------------------------------------------------
# 若以后要卸载的话可以利用此命令输出安装目录，然后直接删掉二进制文件即可
[root@localhost ~]# docker info --format '{{range .ClientInfo.Plugins}}{{if eq .Name "compose"}}{{.Path}}{{end}}{{end}}'
/usr/libexec/docker/cli-plugins/docker-compose
```

> 若`/usr/libexec/docker/cli-plugins/`不存在，可尝试其他目录：
>
> /usr/lib/docker/cli-plugins
>
> /usr/local/lib/docker/cli-plugins
>
> /usr/local/libexec/docker/cli-plugins



### Compose 示例

文档：[https://docs.docker.com/compose/gettingstarted/](https://docs.docker.com/compose/gettingstarted/)

根据官方文档写一个Demo

::: details （1）编写Python Web应用并生成Dockerfile

```bash
# (1) 创建compose目录
[root@localhost ~]# mkdir composetest
[root@localhost ~]# cd composetest

# (2) 编写一个Python Web App
[root@localhost composetest]# cat > app.py <<- EOF
import time

import redis
from flask import Flask

app = Flask(__name__)
cache = redis.Redis(host='redis', port=6379)

def get_hit_count():
    retries = 5
    while True:
        try:
            return cache.incr('hits')
        except redis.exceptions.ConnectionError as exc:
            if retries == 0:
                raise exc
            retries -= 1
            time.sleep(0.5)

@app.route('/')
def hello():
    count = get_hit_count()
    return 'Hello World! I have been seen {} times.\n'.format(count)
EOF

# (3) 生成Python依赖文件requirements.txt
cat > requirements.txt <<- EOF
flask
redis
EOF

# (4)编写Dockerfile
[root@localhost composetest]# cat > Dockerfile <<- EOF
# syntax=docker/dockerfile:1
FROM python:3.7-alpine
WORKDIR /code
ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0
RUN apk add --no-cache gcc musl-dev linux-headers
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
EXPOSE 5000
COPY . .
CMD ["flask", "run"]
EOF
```

:::

::: details （2）编写docker-compose.yml

```bash
[root@localhost composetest]# cat > docker-compose.yml <<- EOF
version: "3.9"
services:
  web:
    build: .
    ports:
      - "8000:5000"
  redis:
    image: "redis:alpine"
EOF
```

:::

::: details （3）创建并启动容器、测试

```bash
# 创建并启动容器（如果需要后台运行的话添加-d）
[root@localhost composetest]# docker compose up
```

![image-20220606074717146](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20220606074717146.png)

```bash
# 访问测试
[root@localhost composetest]# curl http://127.0.0.1:8000
Hello World! I have been seen 1 times.
[root@localhost composetest]# curl http://127.0.0.1:8000
Hello World! I have been seen 2 times.
[root@localhost composetest]# curl http://127.0.0.1:8000
Hello World! I have been seen 3 times.
```

:::

::: details （4）看看docker compose都做了什么

① 创建自定义bridge网络

```bash
# 创建了一个自定义bridge网络
[root@localhost ~]# docker network ls
NETWORK ID     NAME                  DRIVER    SCOPE
19913bc6a47d   bridge                bridge    local
84555a6bf36d   composetest_default   bridge    local	# 新创建的
23966f1794db   host                  host      local
7c080397ed19   none                  null      local

[root@localhost ~]# docker network inspect composetest_default
[
    {
        "Name": "composetest_default",
        "Id": "84555a6bf36d86e18388a5483ea6fbdad7934e931bac911b8897db46f3e0f316",
        "Created": "2022-06-06T07:45:57.113466348+08:00",
        "Scope": "local",
        "Driver": "bridge",		# 驱动为bridge
        "EnableIPv6": false,
        "IPAM": {
            "Driver": "default",
            "Options": null,
            "Config": [
                {
                    "Subnet": "172.22.0.0/16",
                    "Gateway": "172.22.0.1"
                }
            ]
        },
        "Internal": false,
        "Attachable": false,
        "Ingress": false,
        "ConfigFrom": {
            "Network": ""
        },
        "ConfigOnly": false,
        "Containers": {
            "42752a49fe75bd0468ecfa18a69acda981633a4e619f15381950751cb46f73d6": {
                "Name": "composetest-web-1",
                "EndpointID": "6dac42eb32ccb547254b6e371f776ad9172866b08d17f7ab19257d8f37d9fc98",
                "MacAddress": "02:42:ac:16:00:03",
                "IPv4Address": "172.22.0.3/16",
                "IPv6Address": ""
            },
            "b96e72d8d02e657f754fad40b5cdf4f5b11c06b4ad9851e119cdd99d9ca58204": {
                "Name": "composetest-redis-1",
                "EndpointID": "885d0dc3bc55881e854410c631c4e0a5cb76ad7add2ecea9b36f81009b3e09b2",
                "MacAddress": "02:42:ac:16:00:02",
                "IPv4Address": "172.22.0.2/16",
                "IPv6Address": ""
            }
        },
        "Options": {},
        "Labels": {
            "com.docker.compose.network": "default",
            "com.docker.compose.project": "composetest",
            "com.docker.compose.version": "2.5.0"
        }
    }
]
```

② 创建对应的容器

![image-20220606075707139](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20220606075707139.png)



③ 容器通信方式

看一下我们的Python代码，`cache = redis.Redis(host='redis', port=6379)`，我们发现：

* 很显然这是通过内置的`DNS`来通信的

* 使用的自定义的`bridge`网络，满足使用`DNS`通信要求

* `redis`与容器名称并不一致，怀疑是通过网络别名来通信，来验证一下

  ![image-20220606080914974](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20220606080914974.png)

  ![image-20220606081942898](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20220606081942898.png)

  ![image-20220606082226087](https://tuchuang-1257805459.cos.ap-shanghai.myqcloud.com/image-20220606082226087.png)

:::

### Compose 常用命令

| 命令                            | 说明                                                         |
| ------------------------------- | ------------------------------------------------------------ |
| `docker compose up [-d]`        | 创建并启动容器                                               |
| `docker compose down [-v]`      | 停止并删除容器和删除网桥，默认不会删除匿名或命名数据卷（除非使用`-v`参数） |
| `-------------------------`     | `----------------------------------------------------------------` |
| `docker compose create`         | 创建容器                                                     |
| `docker compose start`          | 启动容器                                                     |
| `docker compose stop`           | 停止容器                                                     |
| `docker compose restart`        | 重启容器                                                     |
| `docker compose rm`             | 删除已经停止的容器                                           |
| `-------------------------`     | `----------------------------------------------------------------` |
| `docker compose ls [-a]`        | 查看当前`Compose`项目信息                                    |
| `docker compose ps`             | 查看当前`Compose`项目所运行的容器                            |
| `docker compose logs`           | 查看所有容器的日志                                           |
| `-------------------------`     | `----------------------------------------------------------------` |
| `docker compose -f compose文件` | 指定`compose`文件（默认会使用当前目录内的`docker-compose.yml`）<br />若找不到`compose`文件会报错`no configuration file provided: not found`<br />并不是所有的命令都需要用这个文件，比如up/down需要用，ls/version等就不需要用这个文件 |
| `docker compose -p 项目名`      | 指定项目名（默认为目录名），项目名会作为诸如**网桥名称、容器名称等的一部分** |

### Compose file

文档：[https://docs.docker.com/compose/compose-file/compose-file-v3/](https://docs.docker.com/compose/compose-file/compose-file-v3/)

#### （1）编写一个简单的Demo

`Version`字段文档：[https://docs.docker.com/compose/compose-file/compose-versioning/](https://docs.docker.com/compose/compose-file/compose-versioning/)

`service`：每一个`service`可以简单理解成对一个容器的封装，在上面我们有`web`、`mysql`、`redis`3个service，即3个容器

`image`：指定镜像及版本

::: details 先写一个最简单的Demo

```bash
# 创建一个项目demo
[root@localhost ~]# mkdir demo
[root@localhost ~]# cd demo/

# 创建docker-compose.yml
[root@localhost demo]# cat > docker-compose.yml <<- EOF
version: "3"
services:        
  web:
    image: nginx:1.21.3
  mysql:
    image: mysql:8.0.29
  redis:
    image: redis:7.0.0
EOF

# 创建并启动容器
[root@localhost demo]# docker compose up -d
[+] Running 4/4
 ⠿ Network demo_default    Created					0.1s
 ⠿ Container demo-web-1    Started					0.6s                                                                         
 ⠿ Container demo-mysql-1  Started					0.7s                                                                         
 ⠿ Container demo-redis-1  Started					0.8s
 
 # 通过ls查看所有项目的基本信息，在这里我们只有一个项目叫做demo（ls命令不需要使用到docker-compose.yml配置文件，在任意路径运行都可以）
[root@localhost demo]# docker compose ls 
NAME                STATUS              CONFIG FILES
demo                running(2)          /root/demo/docker-compose.yml

# 通过-a选项列出更详细的信息，可以看到有一个容器退出了
[root@localhost demo]# docker compose ls -a
NAME                STATUS                  CONFIG FILES
demo                exited(1), running(2)   /root/demo/docker-compose.yml

# 通过ps子命令查看当前项目都有哪些容器
[root@localhost demo]# docker compose ps 
NAME                COMMAND                  SERVICE             STATUS              PORTS
demo-mysql-1        "docker-entrypoint.s…"   mysql               exited (1)          
demo-redis-1        "docker-entrypoint.s…"   redis               running             6379/tcp
demo-web-1          "/docker-entrypoint.…"   web                 running             80/tcp

# logs子命令查看日志，可以看到MySQL退出的原因是：容器需要指定3个变量中的任意一个
[root@localhost demo]# docker compose logs
demo-mysql-1  | 2022-06-06 08:46:07+00:00 [Note] [Entrypoint]: Entrypoint script for MySQL Server 8.0.29-1debian10 started.
demo-mysql-1  | 2022-06-06 08:46:07+00:00 [Note] [Entrypoint]: Switching to dedicated user 'mysql'
demo-mysql-1  | 2022-06-06 08:46:07+00:00 [Note] [Entrypoint]: Entrypoint script for MySQL Server 8.0.29-1debian10 started.
demo-mysql-1  | 2022-06-06 08:46:07+00:00 [ERROR] [Entrypoint]: Database is uninitialized and password option is not specified
demo-mysql-1  |     You need to specify one of the following:
demo-mysql-1  |     - MYSQL_ROOT_PASSWORD
demo-mysql-1  |     - MYSQL_ALLOW_EMPTY_PASSWORD
demo-mysql-1  |     - MYSQL_RANDOM_ROOT_PASSWORD
demo-redis-1  | 1:C 06 Jun 2022 08:46:07.605 # oO0OoO0OoO0Oo Redis is starting oO0OoO0OoO0Oo
demo-redis-1  | 1:C 06 Jun 2022 08:46:07.605 # Redis version=7.0.0, bits=64, commit=00000000, modified=0, pid=1, just started
demo-redis-1  | 1:C 06 Jun 2022 08:46:07.605 # Warning: no config file specified, using the default config. In order to specify a config file use redis-server /path/to/redis.conf
demo-redis-1  | 1:M 06 Jun 2022 08:46:07.606 * monotonic clock: POSIX clock_gettime
demo-redis-1  | 1:M 06 Jun 2022 08:46:07.606 * Running mode=standalone, port=6379.
demo-redis-1  | 1:M 06 Jun 2022 08:46:07.606 # WARNING: The TCP backlog setting of 511 cannot be enforced because /proc/sys/net/core/somaxconn is set to the lower value of 128.
demo-redis-1  | 1:M 06 Jun 2022 08:46:07.606 # Server initialized
demo-redis-1  | 1:M 06 Jun 2022 08:46:07.606 # WARNING overcommit_memory is set to 0! Background save may fail under low memory condition. To fix this issue add 'vm.overcommit_memory = 1' to /etc/sysctl.conf and then reboot or run the command 'sysctl vm.overcommit_memory=1' for this to take effect.
demo-redis-1  | 1:M 06 Jun 2022 08:46:07.607 * The AOF directory appendonlydir doesn't exist
demo-redis-1  | 1:M 06 Jun 2022 08:46:07.607 * Ready to accept connections
demo-web-1    | /docker-entrypoint.sh: /docker-entrypoint.d/ is not empty, will attempt to perform configuration
demo-web-1    | /docker-entrypoint.sh: Looking for shell scripts in /docker-entrypoint.d/
demo-web-1    | /docker-entrypoint.sh: Launching /docker-entrypoint.d/10-listen-on-ipv6-by-default.sh
demo-web-1    | 10-listen-on-ipv6-by-default.sh: info: Getting the checksum of /etc/nginx/conf.d/default.conf
demo-web-1    | 2022/06/06 08:46:07 [notice] 1#1: using the "epoll" event method
demo-web-1    | 2022/06/06 08:46:07 [notice] 1#1: nginx/1.21.3
demo-web-1    | 2022/06/06 08:46:07 [notice] 1#1: built by gcc 8.3.0 (Debian 8.3.0-6) 
demo-web-1    | 2022/06/06 08:46:07 [notice] 1#1: OS: Linux 4.18.0-348.7.1.el8_5.x86_64
demo-web-1    | 2022/06/06 08:46:07 [notice] 1#1: getrlimit(RLIMIT_NOFILE): 1048576:1048576
demo-web-1    | 2022/06/06 08:46:07 [notice] 1#1: start worker processes
demo-web-1    | 2022/06/06 08:46:07 [notice] 1#1: start worker process 30
demo-web-1    | 2022/06/06 08:46:07 [notice] 1#1: start worker process 31
demo-web-1    | 10-listen-on-ipv6-by-default.sh: info: Enabled listen on IPv6 in /etc/nginx/conf.d/default.conf
demo-web-1    | /docker-entrypoint.sh: Launching /docker-entrypoint.d/20-envsubst-on-templates.sh
demo-web-1    | /docker-entrypoint.sh: Launching /docker-entrypoint.d/30-tune-worker-processes.sh
demo-web-1    | /docker-entrypoint.sh: Configuration complete; ready for start up
```

:::

#### （2）convert/config 查看当前配置

::: details convert/config 查看当前配置

```bash
# 下面两个输出是一样的
[root@localhost demo]# docker compose config --help

Usage:  docker compose convert SERVICES

Converts the compose file to platform's canonical format

Aliases:
  convert, config		# convert和config是一样的命令

Options:
      --format string           Format the output. Values: [yaml | json] (default "yaml")
      --hash string             Print the service config hash, one per line.
      --images                  Print the image names, one per line.
      --no-interpolate          Don't interpolate environment variables.
      --no-normalize            Don't normalize compose model.
  -o, --output string           Save to file (default to stdout)
      --profiles                Print the profile names, one per line.
  -q, --quiet                   Only validate the configuration, don't print anything.
      --resolve-image-digests   Pin image tags to digests.
      --services                Print the service names, one per line.
      --volumes                 Print the volume names, one per line.
      
[root@localhost demo]# docker compose config
name: demo
services:
  mysql:
    image: mysql:8.0.29
    networks:
      default: null
  redis:
    image: redis:7.0.0
    networks:
      default: null
  web:
    image: nginx:1.21.3
    networks:
      default: null
networks:
  default:
    name: demo_default
```

:::

#### （3）指定环境变量

文档：[https://docs.docker.com/compose/environment-variables/](https://docs.docker.com/compose/environment-variables/)

环境变量可以分为两类：

* 一类是给`docker compose`工具使用的
* 另一类是给容器使用的，只在容器内生效

::: details （1）Compose环境变量：使用.env文件

默认情况下会使用`.env`文件，如果是其他的文件名可以通过`docker compose --env-file .env.dev`来指定文件

```bash
# 查看docker-compose.yml文件
[root@localhost demo]# cat docker-compose.yml 
version: "3"
services:        
  web:
    image: nginx:${NginxVersion}
  mysql:
    image: mysql:8.0.29
  redis:
    image: redis:7.0.0

# 启动会报错，NginxVersion变量未设置
[root@localhost demo]# docker compose up
WARN[0000] The "NginxVersion" variable is not set. Defaulting to a blank string. 
Error response from daemon: no such image: nginx:: invalid reference format

# 设置.env文件
[root@localhost demo]# cat > .env <<- EOF
NginxVersion=1.21.6
EOF

# 再次启动
[root@localhost demo]# docker compose up -d
[+] Running 3/3
 ⠿ Container demo-redis-1  Started					0.6s                                                                        
 ⠿ Container demo-web-1    Started					0.6s                                                                        
 ⠿ Container demo-mysql-1  Started					0.6s
 
# 查看镜像版本
[root@localhost demo]# docker container inspect demo-web-1 | grep -i image
        "Image": "sha256:fa5269854a5e615e51a72b17ad3fd1e01268f278a6684c8ed3c5f0cdce3f230b",
            "Image": "nginx:1.21.6",
                "com.docker.compose.image": "sha256:fa5269854a5e615e51a72b17ad3fd1e01268f278a6684c8ed3c5f0cdce3f230b",  
```

:::

::: details （2）Compose环境变量：使用Shell环境变量（优先级比env文件高）

```bash
# 先看一下当前的情况，因为有.env文件存在，所以启动没问题
[root@localhost demo]# ls -la
total 16
drwxr-xr-x   2 root root 4096 Jun  7 16:12 .
dr-xr-x---. 12 root root 4096 Jun  7 16:07 ..
-rw-r--r--   1 root root  136 Jun  7 15:51 docker-compose.yml
-rw-r--r--   1 root root   20 Jun  7 16:09 .env

[root@localhost demo]# cat docker-compose.yml 
version: "3"
services:        
  web:
    image: nginx:${NginxVersion}
  mysql:
    image: mysql:8.0.29
  redis:
    image: redis:7.0.0

[root@localhost demo]# cat .env 
NginxVersion=1.21.6

# 这时可以设置Shell环境变量，优先级比.env文件要高
[root@localhost demo]# export NginxVersion=1.21.5

# 启动
[root@localhost demo]# docker compose up -d
[+] Running 7/7
 ⠿ web Pulled
   ⠿ a2abf6c4d29d Pull complete 					3.7s
   ⠿ a9edb18cadd1 Pull complete 					1.8s
   ⠿ 589b7251471a Pull complete						2.5s
   ⠿ 186b1aaa4aa6 Pull complete						2.6s
   ⠿ b4df32aa5a72 Pull complete 					2.7s
   ⠿ a0bcbecc962e Pull complete						2.8s
[+] Running 4/4
 ⠿ Network demo_default    Created					0.1s
 ⠿ Container demo-mysql-1  Started    				0.9s                                                                         
 ⠿ Container demo-redis-1  Started      			0.9s                                                                        
 ⠿ Container demo-web-1    Started        			0.8s                                                                         
 
# 查看镜像版本 
[root@localhost demo]# docker container inspect demo-web-1 | grep -i image
        "Image": "sha256:605c77e624ddb75e6110f997c58876baa13f8754486b461117934b24a9dc3a85",
            "Image": "nginx:1.21.5",

# 后续测试
# 即使显示指定变量文件，docker compose --env-file .env up -d，也没有Shell环境变量优先级高
```

:::

::: details （3）容器环境变量：使用environment（解决MySQL启动失败的问题）

若要传递变量给容器使用，需要使用`environment`

```bash
# 看一下docker-compose.yml文件，给mysql容器定义了一个变量 MYSQL_ROOT_PASSWORD
[root@localhost demo]# cat docker-compose.yml
version: "3"
services:        
  web:
    image: nginx:1.21.6
  mysql:
    image: mysql:8.0.29
    environment:
        MYSQL_ROOT_PASSWORD: "qaz.123="
  redis:
    image: redis:7.0.0

# 启动
[root@localhost demo]# docker compose up -d
[+] Running 4/4
 ⠿ Network demo_default    Created				0.1s                                                                             
 ⠿ Container demo-mysql-1  Started           	0.7s                                                                             
 ⠿ Container demo-redis-1  Started             	0.7s                                                                             
 ⠿ Container demo-web-1    Started            	0.8s                                                                             
 
# mysql容器不再退出了
[root@localhost demo]# docker compose ps
NAME                COMMAND                  SERVICE             STATUS              PORTS
demo-mysql-1        "docker-entrypoint.s…"   mysql               running             33060/tcp
demo-redis-1        "docker-entrypoint.s…"   redis               running             6379/tcp
demo-web-1          "/docker-entrypoint.…"   web                 running             80/tcp

# 看一下mysql容器的ip
[root@localhost demo]# docker container inspect demo-mysql-1 | grep -i IPAddress
            "SecondaryIPAddresses": null,
            "IPAddress": "",
                    "IPAddress": "172.18.0.3",

# 连一下
[root@localhost demo]# mysql -h172.18.0.3 -P3306 -uroot -p"qaz.123=" -e "status;"
mysql: [Warning] Using a password on the command line interface can be insecure.
--------------
mysql  Ver 14.14 Distrib 5.7.38, for Linux (x86_64) using  EditLine wrapper

Connection id:          15
Current database:
Current user:           root@172.18.0.1
SSL:                    Cipher in use is ECDHE-RSA-AES128-GCM-SHA256
Current pager:          stdout
Using outfile:          ''
Using delimiter:        ;
Server version:         8.0.29 MySQL Community Server - GPL
Protocol version:       10
Connection:             172.18.0.3 via TCP/IP
Server characterset:    utf8mb4
Db     characterset:    utf8mb4
Client characterset:    utf8mb3
Conn.  characterset:    utf8mb3
TCP port:               3306
Uptime:                 36 min 20 sec

Threads: 2  Questions: 22  Slow queries: 0  Opens: 135  Flush tables: 3  Open tables: 54  Queries per second avg: 0.010
--------------

# 进到容器里看一下变量
[root@localhost demo]# docker container exec -it demo-mysql-1 sh 
# echo ${MYSQL_ROOT_PASSWORD}
qaz.123=
```

:::

#### （4）build 构建镜像

文档：[https://docs.docker.com/compose/compose-file/compose-file-v3/#build](https://docs.docker.com/compose/compose-file/compose-file-v3/#build)

我们可以通过`image`来指定一个镜像启动容器，也可以通过`build`来构建一个镜像并启动容器

::: details （1）自动构建镜像示例

```bash
[root@localhost demo]# cat Dockerfile
FROM centos:7
MAINTAINER VVFock3r
WORKDIR /
CMD while [ true ]; do echo $(date +"%Y-%m-%d %H:%M:%S"); sleep 1; done

[root@localhost demo]# cat docker-compose.yml
version: "3"
services:        
  server:
    build: .

[root@localhost demo]# docker compose up
[+] Running 2/2
 ⠿ Network demo_default     Created					0.1s
 ⠿ Container demo-server-1  Created					0.1s
Attaching to demo-server-1
demo-server-1  | 2022-06-07 09:56:27
demo-server-1  | 2022-06-07 09:56:28
demo-server-1  | 2022-06-07 09:56:29

# ---------------------------------------------------------------
# 看一下生成的镜像，项目名_service名:latest（省略无关的输出）
[root@localhost demo]# docker image ls
REPOSITORY    TAG             IMAGE ID       CREATED          SIZE
demo_server   latest          c5913ee10173   8 months ago     204MB

# 看一下镜像详情
[root@localhost demo]# docker image inspect demo_server | grep -i -A 3 CMD
            "Cmd": null,
            "Image": "",
            "Volumes": null,
            "WorkingDir": "",
--
            "Cmd": [
                "/bin/sh",
                "-c",
                "while [ true ]; do echo $(date +\"%Y-%m-%d %H:%M:%S\"); sleep 1; done"
```

:::

::: details （2）修改Dockerfile，因为默认情况下，镜像名和Tag没有变动，所以依旧是老的镜像，新修改的Dockerfile并没有生效

```bash
# 将Dockerfile中sleep 1改为2
[root@localhost demo]# cat Dockerfile 
FROM centos:7
MAINTAINER VVFock3r
WORKDIR /
CMD while [ true ]; do echo $(date +"%Y-%m-%d %H:%M:%S"); sleep 2; done

# 删除容器（看输出镜像并没有删除）
root@localhost demo]# docker compose down
[+] Running 2/0
 ⠿ Container demo-server-1  Removed      0.0s                                                                                  
 ⠿ Network demo_default     Removed		0.0s
 
# 此时再重新启动，可以看到还是老的镜像
[root@localhost demo]# docker compose up
[+] Running 2/2
 ⠿ Network demo_default     Created					0.1s                                                                         
 ⠿ Container demo-server-1  Created					0.1s                                                                         
Attaching to demo-server-1
demo-server-1  | 2022-06-07 10:09:41
demo-server-1  | 2022-06-07 10:09:42
demo-server-1  | 2022-06-07 10:09:43

# ---------------------------------------------------------------
# 解决办法1：删除容器的同时删除镜像
```

:::
