# Docker Engine

官网：[https://www.docker.com/](https://www.docker.com/)

<br />

## 1、基础操作

### 安装

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
sudo systemctl enable docker.service    # 设置开启自启

# 测试Docker Engine
sudo docker run hello-world
```

:::

<br />

### 运行容器

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

<br />

### 设置名称

::: details 点击查看详情

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

:::

<br />

### 进入容器

::: details 点击查看详情

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

:::

<br />

### 重启策略

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

<br />

### 自动删除

我们可以控制容器退出后自动删除，注意与`--restart`选项互斥

::: details 点击查看详情

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

:::

<br />

## 2、镜像

### 国内仓库镜像

使用Docker时需要首先下载一个官方镜像，例如`ubuntu`、`mysql`，默认会从[Docker Hub](https://hub.docker.com/)中去下载

然而由于网络原因，下载一个Docker官方镜像可能会需要很长的时间，甚至下载失败。为此，我们可以使用国内的镜像源

腾讯云镜像源：[https://mirrors.cloud.tencent.com/](https://mirrors.cloud.tencent.com/)（点右上角【文档】，在右侧找到Docker源）

阿里云镜像源：[https://help.aliyun.com/document_detail/60750.html](https://help.aliyun.com/document_detail/60750.html)（根据文档去控制台申请加速地址）

<br />

### 设置代理服务

::: details 点击查看详情

```bash
# 先找到 docker.service 所在的路径，一般是 /usr/lib/systemd/system/docker.service
[root@localhost ~]# systemctl status docker.service

# 创建docker.service.d
mkdir -p /usr/lib/systemd/system/docker.service.d/

# 添加代理
vim /usr/lib/systemd/system/docker.service.d/http-proxy.conf

[Service]
Environment="HTTP_PROXY=http://192.168.0.102:7890"
Environment="HTTPS_PROXY=http://192.168.0.102:7890"
Environment="NO_PROXY=127.0.0.1,localhost"

# 重启Docker
systemctl daemon-reload
systemctl restart docker.service

# 验证
docker info | grep -i proxy
 HTTP Proxy: http://192.168.0.102:7890
 HTTPS Proxy: http://192.168.0.102:7890
 No Proxy: 127.0.0.1,localhost
 
# 优化
# 为了后续IP地址可能会变化, 建议使用域名代替, 比如 编辑/etc/hosts
192.168.1.8 proxy.local
```

:::

<br />

### 镜像的分层结构

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

::: details 点击查看详情

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
[root@ap-hongkang ~]# docker image inspect nginx:1.21.6 | jq '{RootFS:.[0].RootFS}'
{
  "RootFS": {
    "Type": "layers",
    "Layers": [
      "sha256:ad6562704f3759fb50f0d3de5f80a38f65a85e709b77fd24491253990f30b6be",
      "sha256:58354abe5f0e9e8cf3849a697cd86bfefb8448b9deb74e3d13aa3e4c98dd3665",
      "sha256:53ae81198b641f2911dfc469313edde2fe690bf230efaa823a4aa836d08336e0",
      "sha256:57d3fc88cb3f95fe3daac8591dabe1c161af0fcfd4cf099aa3f994c888ac7877",
      "sha256:747b7a567071ddb822a072c4dadc2ef50ef6d1bf35ce477e9a559f1df1b7c571",
      "sha256:33e3df466e11254954ba3b06301c93c066a1f699e2ddd80f0214340236d57935"
    ]
  }
}

# --------------------------------------------------------------------------------------------------

# 查看联合文件系统
[root@ap-hongkang ~]# docker image inspect nginx:1.21.6 | jq '{GraphDriver:.[0].GraphDriver}'
{
  "GraphDriver": {
    "Data": {
      "LowerDir": "/var/lib/docker/overlay2/64dca49f0a50bdbdb50fa392038eaff6d325e9b828e949dc09951063aa6a4186/diff:/var/lib/docker/overlay2/734b0828e53e2b5fc1735d383ee4fc6e456841b5a06cff42d6e0ed24ea5084c4/diff:/var/lib/docker/overlay2/9c6c4eabcebd0b6a8341087fec14a2dbddc42acb46eb974acba0798e8284fddc/diff:/var/lib/docker/overlay2/de9c8d969dfcfbe52b7fe5d18427477508185f1f566bcd7d8c7013691ec7d370/diff:/var/lib/docker/overlay2/1be8bf5f5670e155b31753cb91d7464460be62048e2a4ea48701fc75e75bab6c/diff",
      "MergedDir": "/var/lib/docker/overlay2/2f166a11e8b5ab64456b6dd144c6e4162e385e3a1809beb78ff3dbed0fd60413/merged",
      "UpperDir": "/var/lib/docker/overlay2/2f166a11e8b5ab64456b6dd144c6e4162e385e3a1809beb78ff3dbed0fd60413/diff",
      "WorkDir": "/var/lib/docker/overlay2/2f166a11e8b5ab64456b6dd144c6e4162e385e3a1809beb78ff3dbed0fd60413/work"
    },
    "Name": "overlay2"
  }
}

# LowerDir:  镜像层，只读
# WorkDir:   先写入WorkDir，再移动到UpperDir
# UpperDir:  容器层，读写
# MergedDir: 用于将以上所有层合并，提供一个统一的视图
```

还可以通过第三方工具`dive`来查看更具体一些的信息，Github：[https://github.com/wagoodman/dive](https://github.com/wagoodman/dive)

![image-20220510152343911](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20220510152343911.png)

:::

<br />

### 镜像导出和导入

主要有两组命令：

* 镜像导出和导入`save`和`load`
  * `docker save`：导出一个或多个镜像，参数可以跟镜像名，也可以跟容器名（会自动分析所使用的镜像并导出）
  * `docker load`：导入镜像
* 容器文件系统导出和导入`export`和`import`
  * `docker export`：导出一个容器的文件系统
  * `docker import`：导入文件系统镜像

**镜像导出和导**

::: details 点击查看详情

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

:::

**容器文件系统导出和导入**

::: details 点击查看详情

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

:::

<br />

### Dockerfile：常用指令

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
| LABEL      | 打标签，示例：`LABEL key="123" value="456"`；<br />后续可以使用`docker image ls --filter label=key="123" `来进行过滤镜像 |
| USER       | 切换运行镜像的用户和用户组，适合有安全性要求，以非root用户运行的应用 |
| ENTRYPOINT | 设置容器启动时运行的命令<br />（2）CMD或之后的参数会被当做参数传递给ENTRYPOINT |
| CMD        | 设置容器启动时运行的命令<br />（2）CMD命令可以被docker run之后的参数替换 |

:::tip 哪些命令会创建新镜像层从而增加镜像大小？

RUN、COPY、ADD会创建新镜像，其他指令会创建临时层，不会增加镜像大小

:::

<br />

### Dockerfile：容器入口

::: details CMD和ENTRYPOINT相同点和不同点

CMD和ENTRYPOINT用于指定启动容器后执行的命令

<br />

**相同点**

* 生效时刻：都是在容器运行时生效，而不是在构建镜像层时生效
* 支持多个：可以有多个CMD或ENTRYPOINT命令但只有最后一个生效
* 支持格式：都支持Exec和Shell语法格式
  * Exec格式：CMD [可执行程序, 参数1, 参数2, 参数N...]
  * Shell格式：CMD 可执行程序 参数1 参数2 参数N...

* 支持覆盖：`docker container run`时可以覆盖镜像中的`CMD`和`ENTRYPOINT`命令

<br />

**不同点**

* 覆盖语法：`docker container run`时覆盖镜像中的`CMD`或`ENTRYPOINT`命令时的语法不一样

* 支持格式：CMD额外支持一种格式，`CMD [参数1, 参数2]`，此时可以为ENTRYPOINT指定提供参数（注意：ENTRYPOINT必须使用Exec格式）

  一般我们用作容器启动的默认参数，当用户想替换默认参数时就等同于替换CMD中的参数

<br />

**注意事项**

使用 shell 格式之后，程序会以 /bin/sh -c 的子命令启动，并且 shell 格式下不会传递任何信号给程序

这也就导致，在 docker stop 容器的时候，以这种格式运行的程序捕捉不到发送的信号

:::

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

::: details 不同点测试1：docker container run时覆盖镜像中的CMD或ENTRYPOINT命令时的语法不一样

先看一下`docker container run`的语法格式

![image-20220511175138893](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20220511175138893.png)

![image-20220511175249716](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20220511175249716.png)

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

<br />

### Dockerfile：多阶段构

::: details （1）创建Go项目

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

::: details （2）编写Dockerfile

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

::: details （3）构建镜像

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

::: details （4）启动容器试一下

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

::: details （5）镜像大小第一次优化：先编译Go项目，然后将编译好的二进制拷贝到镜像中

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

::: details （6）镜像大小第二次优化：使用镜像多阶段构建

```bash
# 修改Dockerfile
[root@localhost webserver]# cat Dockerfile

# 用于程序编译
FROM golang:1.18.2-alpine3.15 as builder
WORKDIR /build
COPY . .
RUN go build -o server .

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

::: details （7）镜像大小第二次优化：最终完善版【模板】

```dockerfile
# reference
#   https://hub.docker.com/_/golang
#   https://hub.docker.com/_/alpine
#
# build
#   docker image build -f deploy/Dockerfile -t demo:v1.0.0 .
# test
#   docker container run --name demo -d demo:v1.0.0

# build
FROM golang:1.20.5-alpine3.18 as builder
WORKDIR /build
COPY . .
RUN go env -w GO111MODULE=on && \
    go env -w CGO_ENABLED=0 && \
    go env -w GOPROXY=https://goproxy.cn,direct && \
    go mod tidy && \
    go build -o main .

# run
FROM alpine:3.18
WORKDIR /app
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.tuna.tsinghua.edu.cn/g' /etc/apk/repositories && \
    apk update && \
    apk add tzdata && \
    ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && \
    echo "Asia/Shanghai" > /etc/timezone && \
    apk add curl busybox-extras bind-tools
RUN mkdir -p /etc/demo                                               # 创建配置文件目录
COPY --from=builder /build/main .                                    # 拷贝二进制文件
COPY --from=builder /build/etc/demo.yaml /etc/demo                   # 拷贝配置文件
CMD ["./demo", "-c", "/etc/demo/demo.yaml"]                          # 启动服务
```

:::

<br />

## 3、存储

### 持久化方式一：bind mounts

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

<br />

### 持久化方式二：volumes

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

<br />

### 内存文件系统：tmpfs mounts

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

<br />

## 4、资源限制

文档：[https://docs.docker.com/config/containers/resource_constraints/](https://docs.docker.com/config/containers/resource_constraints/)

默认Docker是不限制容器所使用的内存、CPU等资源

<br />

### 内存限制

| 选项                  | 说明                                                         |
| --------------------- | ------------------------------------------------------------ |
| `-m` or `--memory`    | 容器可以使用的最大内存<br />如果设置此选项，则允许的最小值为6m（6 MB），也就是说，必须将该值设置为至少6 MB |
| `--memory-swap`       | 容器可以使用的最大交换分区                                   |
| `--memory-swappiness` | 当物理内存剩余N时就开始使用交换分区，可设置范围在0到100之间， 单位百分比<br />不设置此值则默认使用系统设置的值,一般为30（当剩余物理内存小于30%时开始使用交换分区） |
| `--oom-kill-disable`  | 禁用OOM Killer                                               |

<br />

### CPU限制

| 选项            | 说明                                   |
| --------------- | -------------------------------------- |
| `--cpus`        | 可使用的CPU核心数                      |
| `--cpuset-cpus` | 限制容器使用特定的CPU核心，比如0-3,1等 |
| `--cpu-shares`  | CPU共享（相对权重）                    |

<br />

### 查看使用率

::: details 点击查看详情

```bash
# 下面的命令会持续监控监控正在运行的容器资源使用率
# 如果只想获取一下结果后退出，添加 --no-stream
[root@ap-hongkang ~]# docker container stats
CONTAINER ID   NAME           CPU %     MEM USAGE / LIMIT   MEM %     NET I/O          BLOCK I/O    PIDS
92385f451ae0   stoic_leakey   0.00%     456KiB / 1.774GiB   0.02%     74B / 0B         0B / 0B      1
a1c45e35b8df   jinhui.dev     0.00%     3.164MiB / 1GiB     0.31%     29.1kB / 903kB   627kB / 0B   3
```

:::

<br />

## 5、网络

### 自带的3种网络

```bash
# 通过如下命令可以查看Docker自带的3种基本网络，但实际上我们可用的并不仅仅是这3种，后面会一一介绍
[root@localhost ~]# docker network ls
NETWORK ID     NAME      DRIVER    SCOPE
aece42e0e44c   bridge    bridge    local
db9a2c63802b   host      host      local
e05e046464f3   none      null      local
```

### 1、none网络

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

<br />

### 2、host网络

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

<br />

### 3、container网络

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

<br />

### 4-1、默认bridge网络

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

3. 从`docker0`子网中分配一个IP给容器使用，并设置容器的默认网关为docker0的IP地址

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

<br />

### 4-2、自定义bridge网络

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

<br />

### 4-3、自定义bridge与默认的区别

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

<br />

### 4-4、不同bridge下的容器互通

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

<br />

### 4-5、修改默认的bridge

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

<br />

## 6、安全

### 1、特权模式

* 创建容器时添加`--privileged=true`可以开启特权模式
* 特权模式下允许容器内的root拥有近似于宿主机root的权利，在后面我们会看到一些具体的示例
* 非必要情况下建议不要使用特权模式

::: details 环境准备：准备两个容器，一个不开启特权模式，另一个开启特权模式

```bash
# 为了避免频繁切换，所以这里开启了两个终端，分别执行下面的命令
[root@ap-hongkang ~]# docker run --rm -it --privileged=false --hostname privilege-false centos:7
[root@ap-hongkang ~]# docker run --rm -it --privileged=true  --hostname privilege-true  centos:7
```

:::

::: details 特权模式与非特权模式有哪些不同

```bash
# (1) 可以看到的设备不同
[root@privilege-false /]# ls -l /dev
total 0
crw--w---- 1 root tty  136, 0 Oct 30 09:36 console
lrwxrwxrwx 1 root root     11 Oct 30 09:31 core -> /proc/kcore
lrwxrwxrwx 1 root root     13 Oct 30 09:31 fd -> /proc/self/fd
crw-rw-rw- 1 root root   1, 7 Oct 30 09:31 full
drwxrwxrwt 2 root root     40 Oct 30 09:31 mqueue
crw-rw-rw- 1 root root   1, 3 Oct 30 09:31 null
lrwxrwxrwx 1 root root      8 Oct 30 09:31 ptmx -> pts/ptmx
drwxr-xr-x 2 root root      0 Oct 30 09:31 pts
crw-rw-rw- 1 root root   1, 8 Oct 30 09:31 random
drwxrwxrwt 2 root root     40 Oct 30 09:31 shm
lrwxrwxrwx 1 root root     15 Oct 30 09:31 stderr -> /proc/self/fd/2
lrwxrwxrwx 1 root root     15 Oct 30 09:31 stdin -> /proc/self/fd/0
lrwxrwxrwx 1 root root     15 Oct 30 09:31 stdout -> /proc/self/fd/1
crw-rw-rw- 1 root root   5, 0 Oct 30 09:31 tty
crw-rw-rw- 1 root root   1, 9 Oct 30 09:31 urandom
crw-rw-rw- 1 root root   1, 5 Oct 30 09:31 zero

[root@privilege-true /]# ls -l /dev
total 0
crw-r--r-- 1 root root     10, 235 Oct 30 09:31 autofs
drwxr-xr-x 2 root root          60 Oct 30 09:31 bsg
drwxr-xr-x 3 root root          60 Oct 30 09:31 bus
crw--w---- 1 root tty     136,   0 Oct 30 09:37 console
lrwxrwxrwx 1 root root          11 Oct 30 09:31 core -> /proc/kcore
...这里有超级多的输出
brw-rw---- 1 root disk    253,   0 Oct 30 09:31 vda
brw-rw---- 1 root disk    253,   1 Oct 30 09:31 vda1
drwxr-xr-x 2 root root          60 Oct 30 09:31 vfio
crw------- 1 root root     10,  63 Oct 30 09:31 vga_arbiter
crw------- 1 root root     10, 137 Oct 30 09:31 vhci
crw------- 1 root root     10, 238 Oct 30 09:31 vhost-net
crw------- 1 root root     10, 241 Oct 30 09:31 vhost-vsock
crw-rw-rw- 1 root root      1,   5 Oct 30 09:31 zero

# (2) 等您补充
```

:::

::: details 特权模式下的容器逃逸示例：访问宿主机文件系统

```bash
# 为了演示方便，我们在宿主机上查看一下挂载点/对应的设备
[root@ap-hongkang ~]# df -hT | awk '$NF=="/"{print $0}'
/dev/vda1      ext4       30G   13G   16G  44% /

# 特权模式下挂载宿主机设备，这使得我们可以访问宿主机文件系统
[root@privilege-true ~]# mkdir host
[root@privilege-true ~]# mount -t ext4 /dev/vda1 ./host
[root@privilege-true ~]# cd host/
[root@privilege-true host]# ll
total 100
lrwxrwxrwx    1 root root     7 Jun 22  2021 bin -> usr/bin
dr-xr-xr-x.   5 root root  4096 Jan 22  2022 boot
drwxr-xr-x    3 root root  4096 Oct 21 09:54 data
drwxr-xr-x    3 root root  4096 Aug 16 08:52 data1
drwxr-xr-x.   2 root root  4096 Nov 26  2019 dev
drwxr-xr-x. 106 root root 12288 Oct 29 08:57 etc
drwxr-xr-x.   3 root root  4096 Jun 22  2021 home
lrwxrwxrwx    1 root root     7 Jun 22  2021 lib -> usr/lib
lrwxrwxrwx    1 root root     9 Jun 22  2021 lib64 -> usr/lib64
drwxr-x---    2 root root  4096 Oct 29 05:31 log
drwx------.   2 root root 16384 Nov 26  2019 lost+found
drwxr-xr-x.   2 root root  4096 Jun 22  2021 media
drwxr-xr-x.   2 root root  4096 Jun 22  2021 mnt
drwxr-xr-x.   3 root root  4096 May  9 06:42 opt
drwxr-xr-x.   2 root root  4096 Nov 26  2019 proc
dr-xr-x---.  12 root root  4096 Oct 30 09:34 root
drwxr-xr-x.   2 root root  4096 Nov 26  2019 run
lrwxrwxrwx    1 root root     8 Jun 22  2021 sbin -> usr/sbin
drwxr-xr-x.   2 root root  4096 Jun 22  2021 srv
drwx--x--x    3 root root  4096 Oct 21 08:09 store
drwxr-xr-x.   2 root root  4096 Nov 26  2019 sys
drwxrwxrwt.   8 root root  4096 Oct 30 09:35 tmp
drwxr-xr-x.  14 root root  4096 Jan 22  2022 usr
drwxr-xr-x.  20 root root  4096 Apr 22  2022 var
[root@privilege-true host]# touch i-am-created-by-containerd.txt

# 回到宿主机，检查文件
[root@ap-hongkang ~]# ls -l /i-am-created-by-containerd.txt 
-rw-r--r-- 1 root root 0 Oct 30 17:46 /i-am-created-by-containerd.txt
```

:::

<br />

### 2、进程用户

* Docker Daemon进程一般使用root来启动，也可以使用non-root来启动，参考文档：[https://docs.docker.com/engine/security/rootless/](https://docs.docker.com/engine/security/rootless/)
* Docker启动的容器一般也是root权限
* 默认情况下容器内的进程用户也是root权限，若想使用non-root，可以在启动容器时添加`--user`参数，需要注意的是这里是容器内的用户而非宿主机用户

<br />

## 7、部署常用服务

部署常用服务用于**开发环境**

### Nginx

::: details 点击查看详情

```bash
# (1) 创建本地持久化目录
[root@ap-hongkang ~]# mkdir -p /etc/nginx/conf.d 
[root@ap-hongkang ~]# mkdir -p /etc/nginx/pki
[root@ap-hongkang ~]# mkdir -p /usr/share/nginx

# (2) 随便启动一个容器用于拷贝默认的配置文件
[root@ap-hongkang ~]# docker container run --name get_nginx_config -d nginx:latest
[root@ap-hongkang ~]# docker container cp /etc/nginx/conf.d/default /etc/nginx/conf.d/
[root@ap-hongkang ~]# docker container rm -f get_nginx_config

# (3) 启动容器
[root@ap-hongkang ~]# docker container run \
    --name project \
    -p 443:443 \
    -p 80:80 \
    -v /etc/nginx/conf.d:/etc/nginx/conf.d \
    -v /etc/nginx/pki:/etc/nginx/pki \
    -v /usr/share/nginx:/usr/share/nginx \
    -d \
    --restart=always \
  nginx:latest
```

:::

<br />

### MongoDB

官方文档：[https://www.mongodb.com/docs/manual/installation/](https://www.mongodb.com/docs/manual/installation/)

配置选项：[https://www.mongodb.com/docs/manual/reference/configuration-options/](https://www.mongodb.com/docs/manual/reference/configuration-options/)

Docker Hub：[https://hub.docker.com/_/mongo](https://hub.docker.com/_/mongo)

二进制客户端下载地址：[https://www.mongodb.com/try/download/shell](https://www.mongodb.com/try/download/shell)

MongoDB 有两个服务器版本：社区版和 企业版。Docker Hub上的为社区版，由Docker官方维护，也是我们本次所采用的版本

::: details （1）部署MongoDB

```bash
# (1) 创建本地持久化目录
[root@ap-hongkang ~]# mkdir -p /etc/mongodb 
[root@ap-hongkang ~]# mkdir -p /var/lib/mongodb && chmod 777 /var/lib/mongodb

# (2) Docker容器默认不提供配置，所以我们需要新建一个配置文件，先填写必要的配置项
[root@ap-hongkang ~]# vim /etc/mongodb/mongod.conf
processManagement:
   # 是否开启守护进程模式
   fork: false
net:
   bindIp: localhost
   port: 27017
storage:
   dbPath: /var/lib/mongodb
security:
   # 是否开启认证: enabled/disabled
   authorization: disabled

# (3) 启动容器
[root@ap-hongkang ~]# docker container run --name mongodb \
    -p 27017:27017 \
    -v /etc/mongodb:/etc/mongodb \
    -v /var/lib/mongodb:/var/lib/mongodb \
    --restart=always \
    -d \
  mongo:6.0.3 --config /etc/mongodb/mongod.conf
  
# (4) 客户端连接测试
[root@ap-hongkang ~]# docker exec -it mongodb mongosh

# (5) 查看客户端版本
[root@ap-hongkang ~]# docker exec -it mongodb mongosh --version
1.6.0
```

:::

::: details （2）开启认证

```bash
# (1) 无密码先连上去
[root@ap-hongkang ~]# docker exec -it mongodb mongosh

# (2) 创建管理员账号
use admin
db.createUser({
	user: "root",  // 用户名
	pwd: "cpayQTvHKT1QC18x",  // 密码
	roles: [{ 
		role: "root", // 角色
		db: "admin" // 数据库名
	}]
})

# (3) 创建普通用户账号(非必须)
use admin
db.createUser({
  user: 'demo',  // 用户名
  pwd: 'jWOOB7bI7qmrGH8y',  // 密码
  roles:[{
    role: 'dbOwner',  // 角色
    db: 'demo'  // 数据库名
  }]
})

# (4) 修改配置文件
[root@ap-hongkang ~]# vim /etc/mongodb/mongod.conf
security:
   # 是否开启认证: enabled/disabled
   authorization: enabled

# (5) 重启容器
[root@ap-hongkang ~]# docker container restart mongodb

# (6) 连接测试，注意-u和root之间要有一个空格
[root@ap-hongkang ~]# docker exec -it mongodb mongosh -u root --authenticationDatabase admin -p
```

:::

<br />

### Redis

官方文档：[https://redis.io/docs/](https://redis.io/docs/)

Docker Hub：[https://hub.docker.com/_/redis](https://hub.docker.com/_/redis)

::: details （1）获取配置文件并修改

```bash
# 下载7.0.8版本的源码包
[root@ap-hongkang ~]# wget -c https://download.redis.io/releases/redis-7.0.8.tar.gz
[root@ap-hongkang ~]# tar zxf redis-7.0.8.tar.gz

# 创建本地持久目录,用于存放配置文件
[root@ap-hongkang ~]# mkdir -p /etc/redis
[root@ap-hongkang ~]# cp redis-7.0.8/redis.conf /etc/redis/redis.conf

# 修改配置文件
[root@ap-hongkang ~]# vim /etc/redis/redis.conf
aclfile /etc/redis/users.acl # 将注释打开,启用aclfile模式
[root@ap-hongkang ~]# touch /etc/redis/users.acl
[root@ap-hongkang ~]# chmod -R 777 /etc/redis

# 清理
[root@ap-hongkang ~]# rm -rf redis-7.0.8 redis-7.0.8.tar.gz
```

:::

::: details （2）启动容器

```bash
[root@ap-hongkang ~]# docker container run \
    --name redis \
    -p 6379:6379 \
    -v /etc/redis:/etc/redis \
    --memory 1g \
    -d \
    --restart=always \
  redis:7.0.8 redis-server /etc/redis/redis.conf
```

:::

::: details （3）配置用户名和密码

```bash
# 查看acl列表
[root@ap-hongkang ~]# docker exec -it redis redis-cli -h 127.0.0.1 -p 6379
127.0.0.1:6379> acl list
1) "user default on nopass ~* &* +@all"

# 添加用户, zhangsan是用户名, on代表启用用户, 123456是密码(>是固定字符), ~*表示允许操作所有的key, +@all表示可以执行所有的命令
127.0.0.1:6379> acl setuser zhangsan on >123456 ~* +@all
OK

# 禁用默认的用户
127.0.0.1:6379> acl setuser default off
OK

# 查看acl
127.0.0.1:6379> acl list
1) "user default off nopass ~* &* +@all"
2) "user zhangsan on #8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92 ~* resetchannels +@all"

# 持久化到aclfile
127.0.0.1:6379> acl save
OK

# 未输入用户名和密码则无任何权限
[root@ap-hongkang ~]# docker exec -it redis redis-cli -h 127.0.0.1 -p 6379
127.0.0.1:6379> set a b
(error) NOAUTH Authentication required.

# 认证
127.0.0.1:6379> auth zhangsan 123456
OK
127.0.0.1:6379> set a b
OK
127.0.0.1:6379> get a
"b"
```

:::

::: details （4）修改监听地址【重要】

```bash
[root@node-1 ~]# vim /etc/redis/redis.conf
#bind 127.0.0.1 -::1
bind 0.0.0.0 -::1

[root@node-1 ~]# docker container restart redis
redis
```

:::

::: details （5）关闭保护模式【重要】

```bash
# 说明
# 当Redis处于保护模式下时，远程客户端无法直接连接到Redis服务器

[root@node-1 ~]# vim /etc/redis/redis.conf
#protected-mode yes
protected-mode no

[root@node-1 ~]# docker container restart redis
redis
```

:::

<br />

## 8、杂项汇总

<br />

### 安装基础命令

::: details deb包系列

```bash
# 新建容器(以Redis镜像举例)
[root@ap-hongkang ~]# docker container run --name redis -d redis:7.0.8
dafcbdca81d95b393b455623648b5191154c26ac735a8fe46ca1b1dcc00fc329

# 查看系统(通用方法)
# cat /etc/os-release
PRETTY_NAME="Debian GNU/Linux 11 (bullseye)"
NAME="Debian GNU/Linux"
VERSION_ID="11"
VERSION="11 (bullseye)"
VERSION_CODENAME=bullseye
ID=debian
HOME_URL="https://www.debian.org/"
SUPPORT_URL="https://www.debian.org/support"
BUG_REPORT_URL="https://bugs.debian.org/"

# 1、部分容器内的方向键和Tab键不管用，一般切换到bash后即可解决
[root@ap-hongkang ~]# docker container exec -it redis sh
# bash
root@dafcbdca81d9:/data# 

# 2、安装基础命令
apt upgrade -y                # 更新源
apt update  -y                # 更新软件包
apt install -y curl           # curl
apt install -y telnet         # telnet
apt install -y vim            # vim
apt install -y procps         # ps
apt install -y inetutils-ping # ping
apt install -y dnsutils       # nslookup
apt install -y net-tools      # netstat/ifconfig
apt install -y iproute2       # ip

# 3、设置别名s
alias ls='ls --color'
alias ll='ls -l --color'
alias grep='grep --color'
```

:::

<br />

### 修改存储目录

::: details 点击查看详情

```bash
# 先看一下默认的存储目录，一般是/var/lib/docker
[root@ap-hongkang ~]# docker info | grep 'Docker Root Dir'
 Docker Root Dir: /var/lib/docker

# 修改存储目录
[root@ap-hongkang ~]# vim /etc/docker/daemon.json 
{
   "data-root": "/data/dockerd"
}
[root@ap-hongkang ~]# mkdir -p /data/dockerd

# 重启Docker
[root@ap-hongkang ~]# systemctl restart docker.service

# 再次查看存储目录
[root@ap-hongkang ~]# docker info | grep 'Docker Root Dir'
 Docker Root Dir: /data/dockerd
```

请注意：Docker并不会帮我们自动迁移已存在的数据

:::

<br />

### 清理资源空间

::: details （1）综合清理：清理镜像、网络、缓存等

```bash
# 主要有以下几条命令，根据实际情况选择使用

# 命令1：整体清理
[root@ap-hongkang ~]# docker system prune
WARNING! This will remove:
  - all stopped containers
  - all networks not used by at least one container
  - all dangling images
  - all dangling build cache

Are you sure you want to continue? [y/N] y
Deleted Containers:
c261af9e460f953c013b8175e73179bd4b9f29c8f6fc6520b39a6711f588baee
e8fa00f9c9ee44123a1481eff81b069d1289ec75d8829741c6c4095e2fedb759
137f3dea25914bebe448c20de7f4fdcbb5b283289d790bf938f0c346802cb9fa

Total reclaimed space: 5B

# 命令2: 只清理镜像
[root@ap-hongkang ~]# docker image prune
WARNING! This will remove all dangling images.
Are you sure you want to continue? [y/N] y
Total reclaimed space: 0B

# 特别说明
# 1) dangling images是指<none>的镜像，而非是未使用的镜像
# 2) 还可以这样操作: docker image rm -f $(docker image ls -f dangling=true -q)
# 3) 如果想删除的更彻底一些，可以添加-a参数，这将会把未使用的镜像也删掉，可以看一下下面的文字说明也变了

[root@ap-hongkang ~]# docker system prune -a
WARNING! This will remove:
  - all stopped containers
  - all networks not used by at least one container
  - all images without at least one container associated to them  # 未使用的镜像
  - all build cache

Are you sure you want to continue? [y/N]

# ---------------------------------------------------------------------------------------

# 命令3: 清理存储, 慎用
[root@ap-hongkang ~]# docker volume prune 
WARNING! This will remove all local volumes not used by at least one container.
Are you sure you want to continue? [y/N] y
Total reclaimed space: 0B
```

:::

::: details （2）单独删除已退出的容器

```bash
# 查看
docker container ps -f status=exited

# 清理
docker container rm $(docker container ps -q -f status=exited)
```

:::

<br />

### Live Restore

文档：[https://docs.docker.com/config/containers/live-restore/](https://docs.docker.com/config/containers/live-restore/)

Live Restore可以使得在Docker Engine不可用的时候，继续保持容器运行，这样就减少了在Docker Engine进行升级或者出现问题的时候容器的停机时间

<br />

但是也会有一些限制：

1、Docker版本升级限制

Live Restore仅支持Docker补丁版本升级时可用，也就是 YY.MM.x 最后一位发生变化的升级，而不支持大版本的升级。在进行大版本升级后，可能会导致Daemon无法重新连接到运行中容器的问题，这时候需要手动停止运行的容器。

2、Daemon选项变更

也就是说Live Restore仅仅在某些Daemon级别的配置选项不发生改变的情况工作，例如Bridge的IP地址，存储驱动类型等。如果在重启Daemon时候，这些选项发生了改变，则可能会到Daemon无法重新连接运行中的容器，这时也需要手动停止这些容器

3、影响容器的日志输出

如果Daemon长时间停止，会影响运行容器的日志输出。因为默认情况下，日志管道的缓冲区大小为64k，当缓冲写满之后，必须启动Daemon来刷新缓冲区

4、不支持Docker Swarm

Live Restore只是独立Docker引擎的特性，而Swarm的服务是由Swarm管理器管理的。当Swarm管理器不可用时，Swarm服务是可以在工作节点上继续运行的，只是不同通过Swarm管理器进行管理，直到Swarm管理恢复工作

<br />

启用步骤

```bash
# 修改配置文件
vim /etc/docker/daemon.json
{
  "live-restore": true
}

# Docker Engine重新加载配置
systemctl restart docker.service

# oh~
# 在我的测试中，docker engine进程起不来了，不知道是啥原因
```

<br />

### 遇上Crontab

::: details 在Crontab中执行docker container run命令

```bash
# 先来测试一条简单的Docker命令
[root@ap-hongkang ~]# docker container run --name demo_$(date +"%Y-%m-%d-%H%M%S") -it centos:7 seq 9
1
2
3
4
5
6
7
8
9
[root@ap-hongkang ~]# docker container run --name demo_$(date +"%Y-%m-%d-%H%M%S") -it centos:7 seq 9 > 1.txt
[root@ap-hongkang ~]# cat 1.txt 
1
2
3
4
5
6
7
8
9

# 然后我们将他放入到Crontab中执行，并捕获输出 (注意需要对%进行转义)
[root@ap-hongkang ~]# crontab -e
* * * * * docker container run --name demo_$(date +"\%Y-\%m-\%d-\%H\%M\%S") -it centos:7 seq 9 &> /tmp/demo.txt

# 静静等待几分钟，查看日志输出
[root@ap-hongkang ~]# cat /tmp/demo.txt
the input device is not a TTY           # 报错了，这是什么鬼?

# 分析
# tty不就是终端嘛，在上面的命令中和终端有关系的就是-t参数，用于分配一个伪终端，那我们把-t去掉，再等几分钟查看结果
[root@ap-hongkang ~]# cat /tmp/demo.txt
1
2
3
4
5
6
7
8
9

# 执行成功了

# 优化篇
# 到这里其实就可以结束了，但是我们知道-i和-t通常会连用，-i用于开启标准输入hang住进程，
# 在这里我们的seq并不支持标准输入，所以-i也可以去掉（建议），当前不去也可以
```

:::

<br />

### 修改容器时间

::: details （1）默认情况下不允许修改时间

```bash
# 启动容器
[root@node-1 ~]# docker container run --name test -it -d centos:7 bash
7fd5c4bb0a7dec19367a939443a7c4a487204ed7e19f3aaed4bf48c67fde9084

# 进入容器
[root@node-1 ~]# docker container exec -it test bash
[root@7fd5c4bb0a7d /]# date
Sat Jul 29 10:55:16 UTC 2023

# 修改时间, 不允许操作
[root@7fd5c4bb0a7d /]# date -s "2020-01-01 12:00:00"
date: cannot set date: Operation not permitted
Wed Jan  1 12:00:00 UTC 2020

# 宿主机上删除容器
[root@node-1 ~]# docker container rm -f test
test
```

:::

::: details （2）使用 --cap-add SYS_TIME ，但同时也会修改宿主机时间

```bash
# 启动容器, 添加 --cap-add SYS_TIME 参数
[root@node-1 ~]# docker container run --name test -it -d --cap-add SYS_TIME centos:7 bash
77bb0c31d66923ba05d046644b8efe40926f89f731bddcc05ae3ee26d6310297

# 进入容器, 修改时间
[root@node-1 ~]# docker container exec -it test bash
[root@77bb0c31d669 /]# date -s "2020-01-01 12:00:00"
Wed Jan  1 12:00:00 UTC 2020

# 查看当前时间, 已经被修改
[root@77bb0c31d669 /]# date
Wed Jan  1 12:00:02 UTC 2020

# 退出容器, 查看宿主机时间, 发现也被修改了
[root@node-1 ~]# date
Wed Jan  1 20:01:41 CST 2020

# 宿主机一般都有时间同步, 但经过测试此时好像并不会同步
```

:::

::: details （3）使用 libfaketime 拦截时间函数调用

Github：[https://github.com/wolfcw/libfaketime](https://github.com/wolfcw/libfaketime)

```bash
# 安装依赖
[root@node-1 ~]# yum -y install gcc gcc-c++

# 编译安装
[root@node-1 ~]# git clone https://github.com/wolfcw/libfaketime.git
[root@node-1 ~]# cd libfaketime
[root@node-1 libfaketime]# make
[root@node-1 libfaketime]# make install

# 查看编译后的库文件
[root@node-1 libfaketime]# ls -lh /usr/local/lib/faketime
total 152K
-rw-r--r-- 1 root root 75K Jul 29 19:38 libfaketimeMT.so.1
-rw-r--r-- 1 root root 75K Jul 29 19:38 libfaketime.so.1

# ---------------------------------------------------------------------------------------------------------------

# 启动容器
[root@node-1 ~]# docker container run --name test -it -d centos:7 bash
6348f2eb51724b72d12121c18f828513d62d85984d37ffaf07dcf7c2962465bf

# 拷贝动态链接库文件到容器中, 随便拷贝到什么目录下都可以
[root@node-1 libfaketime]# docker container cp /usr/local/lib/faketime/libfaketime.so.1 test:/usr/local/lib/
Successfully copied 77.8kB to test:/usr/local/lib/

# 进入容器修准备改时间
[root@node-1 libfaketime]# docker container exec -it test bash

# ---------------------------------------------------------------------------------------------------------------

# 修改时间-方式1: 修改后容器时间会一直固定在某个时间点; 容器重启后失效
[root@6348f2eb5172 /]# export LD_PRELOAD=/usr/local/lib/libfaketime.so.1 FAKETIME="2020-01-01 12:00:00"
[root@6348f2eb5172 /]# date
Wed Jan  1 12:00:00 UTC 2020

# 修改时间-方式2: 此时间可变化; 容器重启后失效
[root@6348f2eb5172 /]# export LD_PRELOAD=/usr/local/lib/libfaketime.so.1 FAKETIME="-5d" # 修改为5天前的时间

[root@6348f2eb5172 /]# date
Mon Jul 24 11:50:53 UTC 2023

[root@6348f2eb5172 /]# date
Mon Jul 24 11:50:55 UTC 2023

# ---------------------------------------------------------------------------------------------------------------
# 取消时间修改
[root@6348f2eb5172 /]# export LD_PRELOAD=

[root@6348f2eb5172 /]# date
Sat Jul 29 11:51:54 UTC 2023
```

:::

## 

## 进阶：1、Namespace

**1、简介**

Docker的隔离性主要运用Linux Namespace 技术，可以对6种资源进行隔离

::: tip  Mnt Namespace的特殊之处

只有对容器进行挂载之后进程才会看到新的文件系统，否则还是宿主机的文件系统。

解决的办法是进程启动以后，挂载一个完整操作系统的文件系统，这就是所谓的 **容器镜像**

:::

| Namespace | 系统调用参数  | 隔离内容                   |
| --------- | ------------- | -------------------------- |
| UTS       | CLONE_NEWUTS  | 主机名和域名               |
| IPC       | CLONE_NEWIPC  | 信号量、消息队列和共享内存 |
| PID       | CLONE_NEWPID  | 进程ID                     |
| NET       | CLONE_NEWNET  | 网络设置、网络栈、端口等   |
| MNT       | CLONE_NEWNS   | 挂载点（文件系统）         |
| USER      | CLONE_NEWUSER | 用户和用户组               |

<br />

**2、相关命令**

::: details （1）查看当前系统上所有的命名空间

```bash
[root@ap-hongkang ~]# lsns
        NS TYPE   NPROCS     PID USER   COMMAND
4026531835 cgroup    116       1 root   /usr/lib/systemd/systemd --switched-root --system --deserialize 18
4026531836 pid       112       1 root   /usr/lib/systemd/systemd --switched-root --system --deserialize 18
4026531837 user      116       1 root   /usr/lib/systemd/systemd --switched-root --system --deserialize 18
4026531838 uts       112       1 root   /usr/lib/systemd/systemd --switched-root --system --deserialize 18
4026531839 ipc       112       1 root   /usr/lib/systemd/systemd --switched-root --system --deserialize 18
4026531840 mnt       106       1 root   /usr/lib/systemd/systemd --switched-root --system --deserialize 18
4026531860 mnt         1      23 root   kdevtmpfs
4026531992 net       112       1 root   /usr/lib/systemd/systemd --switched-root --system --deserialize 18
4026532122 mnt         1     675 root   /usr/lib/systemd/systemd-udevd
4026532207 mnt         2     763 root   /sbin/auditd
4026532208 mnt         1     862 chrony /usr/sbin/chronyd
4026532209 mnt         1    1017 root   /usr/sbin/NetworkManager --no-daemon
4026532212 mnt         3 1750396 root   nginx: master process nginx -g daemon off;
4026532213 uts         3 1750396 root   nginx: master process nginx -g daemon off;
4026532214 ipc         3 1750396 root   nginx: master process nginx -g daemon off;
4026532215 pid         3 1750396 root   nginx: master process nginx -g daemon off;
4026532217 net         3 1750396 root   nginx: master process nginx -g daemon off;
4026532276 mnt         1 1749094 root   ./server
4026532277 uts         1 1749094 root   ./server
4026532278 ipc         1 1749094 root   ./server
4026532279 pid         1 1749094 root   ./server
4026532281 net         1 1749094 root   ./server

# 指定类型(只查看某一类型命名空间)
[root@ap-hongkang ~]# lsns -t mnt
        NS TYPE NPROCS     PID USER   COMMAND
4026531840 mnt     106       1 root   /usr/lib/systemd/systemd --switched-root --system --deserialize 18
4026531860 mnt       1      23 root   kdevtmpfs
4026532122 mnt       1     675 root   /usr/lib/systemd/systemd-udevd
4026532207 mnt       2     763 root   /sbin/auditd
4026532208 mnt       1     862 chrony /usr/sbin/chronyd
4026532209 mnt       1    1017 root   /usr/sbin/NetworkManager --no-daemon
4026532212 mnt       3 1750396 root   nginx: master process nginx -g daemon off;
4026532276 mnt       1 1749094 root   ./server
```

:::

::: details （2）查看某个进程的命名空间

```bash
# 语法: /proc/<pid>/ns
[root@ap-hongkang ~]# ls -l /proc/1749094/ns
total 0
lrwxrwxrwx 1 root root 0 Oct 29 11:07 cgroup -> 'cgroup:[4026531835]'
lrwxrwxrwx 1 root root 0 Oct 29 11:07 ipc -> 'ipc:[4026532278]'
lrwxrwxrwx 1 root root 0 Oct 29 11:07 mnt -> 'mnt:[4026532276]'
lrwxrwxrwx 1 root root 0 Oct 29 11:07 net -> 'net:[4026532281]'
lrwxrwxrwx 1 root root 0 Oct 29 11:07 pid -> 'pid:[4026532279]'
lrwxrwxrwx 1 root root 0 Oct 29 11:21 pid_for_children -> 'pid:[4026532279]'
lrwxrwxrwx 1 root root 0 Oct 29 11:21 time -> 'time:[4026531834]'
lrwxrwxrwx 1 root root 0 Oct 29 11:21 time_for_children -> 'time:[4026531834]'
lrwxrwxrwx 1 root root 0 Oct 29 11:07 user -> 'user:[4026531837]'
lrwxrwxrwx 1 root root 0 Oct 29 11:07 uts -> 'uts:[4026532277]'
```

:::

::: details （3）在某个Namespace下执行宿主机命令

```bash
# 语法: nsenter -t <pid> <某个Namespace> [command]

# (1) 启动一个Nginx容器
[root@ap-hongkang ~]# docker container run --name demo --rm -d nginx:latest

# (2) 测试一下常用的命令，很多都没有
[root@ap-hongkang ~]# docker container exec -it demo ping
OCI runtime exec failed: exec failed: unable to start container process: exec: "ping": not found in $PATH: unknown
[root@ap-hongkang ~]# docker container exec -it demo telnet
OCI runtime exec failed: exec failed: unable to start container process: exec: "telnet": not found in $PATH: unknown
[root@ap-hongkang ~]# docker container exec -it demo curl
curl: try 'curl --help' or 'curl --manual' for more information

# (3) 为了能在容器中使用某些命令，一般情况下我们可以在容器中安装对应的包，比如说：在nginx镜像中安装ping命令
[root@ap-hongkang ~]# docker container exec -it demo sh
# apt update
# apt install inetutils-ping
# ping
ping: missing host operand
Try 'ping --help' or 'ping --usage' for more information.

# ---------------------------------------------------------------------------------------------------------------

# (4) 现在可以换一个思路，使用宿主机已有的命令，去指定的Namespace中执行，这里使用ip命令举例  

# 1.测试一下, 确定容器中没有此命令
[root@ap-hongkang ~]# docker container exec -it demo ip addr                      
OCI runtime exec failed: exec failed: unable to start container process: exec: "ip": not found in $PATH: unknown

 # 2.通过容器名称找到其在宿主机中的Pid
[root@ap-hongkang ~]# docker container inspect demo -f {{.State.Pid}}
1770224

# 3.在宿主机上Pid是1770224的进程的NET命名空间中执行ip addr命令 (-n代表的是net命名空间)
[root@ap-hongkang ~]# nsenter -t 1770224 -n ip addr
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
961: eth0@if962: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default 
    link/ether 02:42:ac:11:00:04 brd ff:ff:ff:ff:ff:ff link-netnsid 0
    inet 172.17.0.4/16 brd 172.17.255.255 scope global eth0
       valid_lft forever preferred_lft forever

# 4.但是使用这种方法也有缺陷,看下面的示例，ps命令需要依赖NET、PID和MNT命名空间，但是一旦使用了MNT命名空间就不再使用宿主机的ps命令了
[root@ap-hongkang ~]# sudo nsenter -t 1770224 --mount --net --pid ps aux
nsenter: failed to execute ps: No such file or directory

# 5.在容器中安装ps命令，再试一次
[root@ap-hongkang ~]# docker container exec -it demo sh
# apt update
# apt-get install procps
# ps aux
USER         PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root           1  0.0  0.2   8932  5492 ?        Ss   05:01   0:00 nginx: master process nginx -g daemon off;
nginx         29  0.0  0.1   9320  2560 ?        S    05:01   0:00 nginx: worker process
nginx         30  0.0  0.1   9320  2560 ?        S    05:01   0:00 nginx: worker process
root          35  0.0  0.0   2484   516 pts/0    Ss   05:04   0:00 sh
root         376  0.0  0.1   6760  2944 pts/0    R+   05:04   0:00 ps aux

[root@ap-hongkang ~]# sudo nsenter -t 1770224 --mount --net --pid ps aux
USER         PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root           1  0.0  0.2   8932  5492 ?        Ss   05:01   0:00 nginx: master process nginx -g daemon off;
nginx         29  0.0  0.1   9320  2560 ?        S    05:01   0:00 nginx: worker process
nginx         30  0.0  0.1   9320  2560 ?        S    05:01   0:00 nginx: worker process
root         377  0.0  0.1   6760  2868 ?        R+   05:04   0:00 ps aux
```

:::

::: details （4）在新的命名空间中执行命令

```bash
# 这里我们需要使用到unshare命令，意思是：与父进程不共享命名空间

# --fork:        fork子进程，在子进程中执行命令
# --pid:         创建新的PID命名空间
# --mount-proc:  自动挂载/proc 文件系统，无需我们手动执行 mount -t proc proc /proc
[root@ap-hongkang ~]# unshare --fork --pid --mount-proc bash
[root@ap-hongkang ~]# ps aux
USER         PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root           1  0.0  0.2  27776  5476 pts/0    S    13:28   0:00 bash
root          20  0.0  0.2  58736  4008 pts/0    R+   13:28   0:00 ps aux
```

:::

<br />

## 进阶：2、Cgroups

文档：

* Cgroup v1：[https://www.kernel.org/doc/html/latest/admin-guide/cgroup-v1/index.html](https://www.kernel.org/doc/html/latest/admin-guide/cgroup-v1/index.html)
* Cgroup v2：[https://www.kernel.org/doc/html/latest/admin-guide/cgroup-v2.html](https://www.kernel.org/doc/html/latest/admin-guide/cgroup-v2.html)

> 若想查看指定内核的版本文档，修改latest为指定版本，比如v5.19

<br />

**1、简介**

* Cgroups（Control Groups）是Linux下用于对一个或一组进程进行资源限制和监控的机制
* Cgroups可以对CPU、内存、磁盘I/O等进行所需要的资源进行限制，不同资源的的具体工作由对应的Cgroups子系统（Subsystem）来实现
* Cgroups在不同的资源管理子系统中以层级树（Hierarchy）的方式来组织管理：每个Cgroup都可以包含其他的子Cgroup，因此子Cgroup能使用的资源除了受本Cgroup配置的资源限制外，还受到父Cgroup配置的资源限制

* Cgroups分为 v1 和 v2 两个版本且差异较大：
  * `CentOS 7/8` 默认使用的是v1，`CentOS 9` 则默认使用v2版本
  * Cgroup v1和v2目录结构和文件名发生较大的变化
  * Cgroup v1可以使用libcgroup-tools工具包来操控，Cgroup v2不能再使用该包来操作

* 对于资源有一些点需要明确认识：
  * CPU属于可压缩资源，若CPU不够用只会导致程序运行缓慢而不会宕机
  * 内存属于不压缩资源，若内存不够用会触发`OOM`


<br />

**2、检查版本**

参考文档：[https://kubernetes.io/zh-cn/docs/concepts/architecture/cgroups/#check-cgroup-version](https://kubernetes.io/zh-cn/docs/concepts/architecture/cgroups/#check-cgroup-version)

检查系统当前启用的Cgroup版本

```bash
# 输出tmpfs则为Cgroup v1
[root@ap-hongkang ~]# stat -fc %T /sys/fs/cgroup/
tmpfs

# 输出cgroup2fs则为Cgroup v2
[root@localhost ~]# stat -fc %T /sys/fs/cgroup/
cgroup2fs
```

<br />

**3、CPU限制**

::: details 准备一个能消耗CPU的程序：main.go

`main.go`：这是一个能将系统所有逻辑CPU核心跑满的Go程序

```go
package main

import (
	"fmt"
	"os"
	"runtime"
	"time"
)

func main() {
	for i := 0; i < runtime.NumCPU(); i++ {
		go func() {
			for {
				time.Sleep(time.Nanosecond)
			}
		}()
	}
	fmt.Printf("Pid: %d\n", os.Getpid())
	select {}
}
```

先将程序跑起来

```bash
[root@ap-hongkang ~]# go run main.go
Pid: 698452

# 2核的CPU已经跑满了
[root@ap-hongkang ~]# top
top - 17:33:01 up 3 days, 36 min,  3 users,  load average: 4.19, 3.28, 2.04
Tasks: 116 total,   3 running, 113 sleeping,   0 stopped,   0 zombie
%Cpu0  :100.0 us,  0.0 sy,  0.0 ni,  0.0 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
%Cpu1  : 99.7 us,  0.3 sy,  0.0 ni,  0.0 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
MiB Mem :   1816.9 total,     82.6 free,    405.4 used,   1329.0 buff/cache
MiB Swap:      0.0 total,      0.0 free,      0.0 used.   1256.7 avail Mem 

    PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND
 698452 root      20   0  711260   2924    788 R 200.0   0.2   1:31.35 main
```

:::

<br />

::: details （1）Cgroup v1：文件介绍

```bash
[root@ap-hongkang ~]# cd /sys/fs/cgroup/
[root@ap-hongkang cgroup]# ll
total 0
dr-xr-xr-x 6 root root  0 Oct 29 16:57 blkio
lrwxrwxrwx 1 root root 11 Oct 29 16:57 cpu -> cpu,cpuacct
lrwxrwxrwx 1 root root 11 Oct 29 16:57 cpuacct -> cpu,cpuacct
dr-xr-xr-x 8 root root  0 Oct 29 16:57 cpu,cpuacct
dr-xr-xr-x 3 root root  0 Oct 29 16:57 cpuset
dr-xr-xr-x 6 root root  0 Oct 29 16:57 devices
dr-xr-xr-x 3 root root  0 Oct 29 16:57 freezer
dr-xr-xr-x 3 root root  0 Oct 29 16:57 hugetlb
dr-xr-xr-x 7 root root  0 Oct 29 16:57 memory
lrwxrwxrwx 1 root root 16 Oct 29 16:57 net_cls -> net_cls,net_prio
dr-xr-xr-x 3 root root  0 Oct 29 16:57 net_cls,net_prio
lrwxrwxrwx 1 root root 16 Oct 29 16:57 net_prio -> net_cls,net_prio
dr-xr-xr-x 3 root root  0 Oct 29 16:57 perf_event
dr-xr-xr-x 6 root root  0 Oct 29 16:57 pids
dr-xr-xr-x 3 root root  0 Oct 29 16:57 rdma
dr-xr-xr-x 6 root root  0 Oct 29 16:57 systemd

[root@ap-hongkang cgroup]# cd cpu
[root@ap-hongkang cpu]# ll
total 0
-rw-r--r--  1 root root 0 Nov  1 19:29 cgroup.clone_children
-rw-r--r--  1 root root 0 Nov  1 19:29 cgroup.procs
-r--r--r--  1 root root 0 Nov  1 19:29 cgroup.sane_behavior
-r--r--r--  1 root root 0 Nov  1 19:29 cpuacct.stat
-rw-r--r--  1 root root 0 Nov  1 19:29 cpuacct.usage
-r--r--r--  1 root root 0 Nov  1 19:29 cpuacct.usage_all
-r--r--r--  1 root root 0 Nov  1 19:29 cpuacct.usage_percpu
-r--r--r--  1 root root 0 Nov  1 19:29 cpuacct.usage_percpu_sys
-r--r--r--  1 root root 0 Nov  1 19:29 cpuacct.usage_percpu_user
-r--r--r--  1 root root 0 Nov  1 19:29 cpuacct.usage_sys
-r--r--r--  1 root root 0 Nov  1 19:29 cpuacct.usage_user

# 用来配置时间周期长度，单位为us（微秒），默认值为10万
-rw-r--r--  1 root root 0 Nov  1 19:29 cpu.cfs_period_us    

# 用来配置当前Cgroup在cpu.cfs_period_us时间内最多能使用的CPU时间长度,单位为us（微秒），默认为-1（即不限制）
-rw-r--r--  1 root root 0 Nov  1 19:22 cpu.cfs_quota_us

-rw-r--r--  1 root root 0 Nov  1 19:22 cpu.rt_period_us
-rw-r--r--  1 root root 0 Nov  1 19:29 cpu.rt_runtime_us

# 可出让的能获得CPU使用时间的相对值, 参考下图
-rw-r--r--  1 root root 0 Nov  1 19:22 cpu.shares

# 进程所用CPU时间统计
# nr_periods     经过cpu.cfs_period_us的时间周期数量
# nr_throttled   在经过的周期内，有多少次因为进程在指定的周期内用光了配额时间而受到限制
# throttled_time 进程被限制使用CPU的总用时，单位为ns（纳秒）
-r--r--r--  1 root root 0 Nov  1 19:29 cpu.stat

# docker容器限制目录
drwxr-xr-x  4 root root 0 Oct 29 16:57 docker

drwxr-xr-x  2 root root 0 Nov  1 19:29 init.scope
-rw-r--r--  1 root root 0 Nov  1 19:29 notify_on_release
-rw-r--r--  1 root root 0 Nov  1 19:29 release_agent
drwxr-xr-x 80 root root 0 Nov  1 19:22 system.slice
-rw-r--r--  1 root root 0 Nov  1 19:16 tasks
drwxr-xr-x  2 root root 0 Nov  1 19:22 user.slice
drwxr-xr-x  3 root root 0 Nov  1 19:29 YunJing
```

![image-20221101181739945](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20221101181739945.png)

:::

::: details （2）Cgroup v1：手工限制进程CPU使用率

限制CPU使用率

```bash
# 先创建一个目录，用于专门管理我们的程序
[root@ap-hongkang ~]# mkdir /sys/fs/cgroup/cpu/demo
[root@ap-hongkang ~]# cd /sys/fs/cgroup/cpu/demo

# 看一下默认值
[root@ap-hongkang demo]# cat cpu.cfs_period_us 
100000
[root@ap-hongkang demo]# cat cpu.cfs_quota_us 
-1
[root@ap-hongkang demo]# cat tasks

# 重点1
# (1) 我们需要将所有的线程ID写入tasks文件中,这样Cgroup才能知道去限制哪些系统线程。可以通过top -H -p <pid>来查看指定进程的线程ID
# (2) 我们也可以将进程ID写入cgroup.procs文件中，系统会自动将进程的所有线程ID写入tasks文件中(推荐使用这种方式)
[root@ap-hongkang ~]# top -H -p 698452
Threads:   4 total,   3 running,   1 sleeping,   0 stopped,   0 zombie
%Cpu(s):100.0 us,  0.0 sy,  0.0 ni,  0.0 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
MiB Mem :   1816.9 total,     83.3 free,    416.2 used,   1317.3 buff/cache
MiB Swap:      0.0 total,      0.0 free,      0.0 used.   1245.9 avail Mem

    PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND                                                   
 698452 root      20   0  711260   9032    788 R  99.9   0.5  13:28.26 main                                                     
 698455 root      20   0  711260   9032    788 R  83.3   0.5  13:28.63 main                                                     
 698453 root      20   0  711260   9032    788 R   0.0   0.5   0:00.25 main                                                     
 698456 root      20   0  711260   9032    788 S   0.0   0.5   0:00.00 main
 
[root@ap-hongkang demo]# echo 698452 >> tasks
[root@ap-hongkang demo]# echo 698455 >> tasks
[root@ap-hongkang demo]# echo 698453 >> tasks
[root@ap-hongkang demo]# echo 698456 >> tasks
[root@ap-hongkang demo]# cat tasks
698452
698453
698455
698456

# 重点2: 设置CPU使用率
# (1) 计算公式：限制使用x核CPU = cpu.cfs_quota_us / cpu.cfs_period_us(默认为10万)
# (2) 假设我们想让它使用50% CPU，即0.5核CPU，代入公式得到：0.5 = 5万 / 10万, 即 cpu.cfs_quota_us 设置为5万
[root@ap-hongkang demo]# echo 50000 > cpu.cfs_quota_us

# 检查使用率
top - 17:53:49 up 3 days, 56 min,  3 users,  load average: 3.78, 3.68, 3.52
Tasks: 116 total,   2 running, 114 sleeping,   0 stopped,   0 zombie
%Cpu(s): 25.5 us,  0.3 sy,  0.0 ni, 74.2 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
MiB Mem :   1816.9 total,     82.4 free,    416.4 used,   1318.1 buff/cache
MiB Swap:      0.0 total,      0.0 free,      0.0 used.   1245.7 avail Mem 

    PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND
 698452 root      20   0  711260   9032    788 R  50.5   0.5  42:43.29 main
 
# 同理，若限制使用1.5核CPU，那么只需要将cpu.cfs_quota_us 设置为15万即可
[root@ap-hongkang demo]# echo 150000 > cpu.cfs_quota_us
```

取消Cgroup限制

```bash
# 若不想限制了，将cpu.cfs_quota_us设置为-1即可，但这样/sys/fs/cgroup/cpu还会有我们创建的目录，时间长了免不了会有大量垃圾目录
[root@ap-hongkang demo]# echo -1 > cpu.cfs_quota_us

# 若想清理的更加彻底一点，我想将限制某个程序的Cgroup目录删掉，直接删是删不掉的
[root@ap-hongkang ~]# rm -rf /sys/fs/cgroup/cpu/demo/
rm: cannot remove '/sys/fs/cgroup/cpu/demo/cgroup.procs': Operation not permitted
rm: cannot remove '/sys/fs/cgroup/cpu/demo/cpu.cfs_period_us': Operation not permitted
rm: cannot remove '/sys/fs/cgroup/cpu/demo/cpu.stat': Operation not permitted
rm: cannot remove '/sys/fs/cgroup/cpu/demo/cpuacct.usage_percpu_sys': Operation not permitted
rm: cannot remove '/sys/fs/cgroup/cpu/demo/cpu.shares': Operation not permitted
rm: cannot remove '/sys/fs/cgroup/cpu/demo/cpuacct.usage_percpu': Operation not permitted
rm: cannot remove '/sys/fs/cgroup/cpu/demo/cpuacct.stat': Operation not permitted
rm: cannot remove '/sys/fs/cgroup/cpu/demo/cpuacct.usage': Operation not permitted
rm: cannot remove '/sys/fs/cgroup/cpu/demo/cpu.cfs_quota_us': Operation not permitted
rm: cannot remove '/sys/fs/cgroup/cpu/demo/tasks': Operation not permitted
rm: cannot remove '/sys/fs/cgroup/cpu/demo/cpuacct.usage_sys': Operation not permitted
rm: cannot remove '/sys/fs/cgroup/cpu/demo/cpuacct.usage_all': Operation not permitted
rm: cannot remove '/sys/fs/cgroup/cpu/demo/cpuacct.usage_percpu_user': Operation not permitted
rm: cannot remove '/sys/fs/cgroup/cpu/demo/cpu.rt_runtime_us': Operation not permitted
rm: cannot remove '/sys/fs/cgroup/cpu/demo/notify_on_release': Operation not permitted
rm: cannot remove '/sys/fs/cgroup/cpu/demo/cpu.rt_period_us': Operation not permitted
rm: cannot remove '/sys/fs/cgroup/cpu/demo/cgroup.clone_children': Operation not permitted
rm: cannot remove '/sys/fs/cgroup/cpu/demo/cpuacct.usage_user': Operation not permitted

# 若将进程停止(tasks文件中会自动删除我们填写的线程ID)，然后可以使用rmdir来删除
[root@ap-hongkang ~]# rmdir sys/fs/cgroup/cpu/demo/

# 若将进程尚未停止，可以使用cgdelete命令来删除
[root@ap-hongkang ~]# yum -y install libcgroup-tools
[root@ap-hongkang ~]# cgdelete cpu:/demo    # 第一个参数指定Cgroup子系统名称，第二个参数指定相对路径
```

:::

::: details （3）Cgroup v1：使用libcgroup-tools工具限制进程CPU使用率

安装依赖包

```bash
# 首先需要安装libcgroup-tools
[root@ap-hongkang ~]# yum -y install libcgroup-tools

# 查看它都提供了哪些命令
[root@ap-hongkang ~]# rpm -ql libcgroup-tools | grep bin
/usr/bin/cgclassify
/usr/bin/cgcreate
/usr/bin/cgdelete
/usr/bin/cgexec
/usr/bin/cgget
/usr/bin/cgset
/usr/bin/cgsnapshot
/usr/bin/lscgroup
/usr/bin/lssubsys
/usr/sbin/cgclear
/usr/sbin/cgconfigparser
```

基础用法

```bash
# 创建cgroup目录
[root@ap-hongkang ~]# cgcreate -g cpu:/demo  # 等同于 mkdir /sys/fs/cgroup/cpu/demo

# 限制CPU使用率为50%
[root@ap-hongkang ~]# cgset -r cpu.cfs_period_us=100000 /demo
[root@ap-hongkang ~]# cgset -r cpu.cfs_quota_us=50000   /demo

# 添加进程
[root@ap-hongkang ~]# cgclassify -g cpu:/demo 729187

# 也可以在进程启动时自动添加
[root@ap-hongkang ~]# cgexec -g cpu:/demo ./main
Pid: 729679

# 删除Cgroup目录，同时也会取消限制
[root@ap-hongkang ~]# cgdelete cpu:/demo
```

:::

<br />

::: details （1）Cgroup v2：文件介绍

```bash
# 通过以下操作可以看到，Cgroup v2和v1版本目录结构差别还是挺大的

[root@localhost ~]# cd /sys/fs/cgroup/
[root@localhost cgroup]# ll
total 0
-r--r--r--  1 root root 0 Nov  1 18:55 cgroup.controllers
-rw-r--r--  1 root root 0 Nov  1 19:30 cgroup.max.depth
-rw-r--r--  1 root root 0 Nov  1 19:30 cgroup.max.descendants
-rw-r--r--  1 root root 0 Nov  1 18:55 cgroup.procs
-r--r--r--  1 root root 0 Nov  1 19:30 cgroup.stat
-rw-r--r--  1 root root 0 Nov  1 18:55 cgroup.subtree_control
-rw-r--r--  1 root root 0 Nov  1 19:30 cgroup.threads
-rw-r--r--  1 root root 0 Nov  1 19:30 cpu.pressure
-r--r--r--  1 root root 0 Nov  1 18:55 cpuset.cpus.effective
-r--r--r--  1 root root 0 Nov  1 18:55 cpuset.mems.effective
-r--r--r--  1 root root 0 Nov  1 19:30 cpu.stat
drwxr-xr-x  2 root root 0 Nov  1 19:31 demo
drwxr-xr-x  2 root root 0 Nov  1 18:55 dev-hugepages.mount
drwxr-xr-x  2 root root 0 Nov  1 18:55 dev-mqueue.mount
drwxr-xr-x  2 root root 0 Nov  1 18:55 init.scope
-rw-r--r--  1 root root 0 Nov  1 19:30 io.pressure
-r--r--r--  1 root root 0 Nov  1 19:30 io.stat
-r--r--r--  1 root root 0 Nov  1 19:30 memory.numa_stat
-rw-r--r--  1 root root 0 Nov  1 19:30 memory.pressure
-r--r--r--  1 root root 0 Nov  1 19:30 memory.stat
-r--r--r--  1 root root 0 Nov  1 19:30 misc.capacity
drwxr-xr-x  2 root root 0 Nov  1 18:55 sys-fs-fuse-connections.mount
drwxr-xr-x  2 root root 0 Nov  1 18:55 sys-kernel-config.mount
drwxr-xr-x  2 root root 0 Nov  1 18:55 sys-kernel-debug.mount
drwxr-xr-x  2 root root 0 Nov  1 18:55 sys-kernel-tracing.mount
drwxr-xr-x 27 root root 0 Nov  1 19:19 system.slice
drwxr-xr-x  3 root root 0 Nov  1 19:19 user.slice

[root@localhost cgroup]# mkdir demo
[root@localhost cgroup]# cd demo
[root@localhost cgroup]# ll
total 0
-r--r--r-- 1 root root 0 Nov  1 19:45 cgroup.controllers
-r--r--r-- 1 root root 0 Nov  1 19:45 cgroup.events
-rw-r--r-- 1 root root 0 Nov  1 19:45 cgroup.freeze
--w------- 1 root root 0 Nov  1 19:45 cgroup.kill
-rw-r--r-- 1 root root 0 Nov  1 19:45 cgroup.max.depth
-rw-r--r-- 1 root root 0 Nov  1 19:45 cgroup.max.descendants
-rw-r--r-- 1 root root 0 Nov  1 19:45 cgroup.procs
-r--r--r-- 1 root root 0 Nov  1 19:45 cgroup.stat
-rw-r--r-- 1 root root 0 Nov  1 19:45 cgroup.subtree_control
-rw-r--r-- 1 root root 0 Nov  1 19:45 cgroup.threads
-rw-r--r-- 1 root root 0 Nov  1 19:45 cgroup.type
-rw-r--r-- 1 root root 0 Nov  1 19:45 cpu.idle
-rw-r--r-- 1 root root 0 Nov  1 19:45 cpu.max
-rw-r--r-- 1 root root 0 Nov  1 19:45 cpu.max.burst
-rw-r--r-- 1 root root 0 Nov  1 19:45 cpu.pressure
-rw-r--r-- 1 root root 0 Nov  1 19:45 cpuset.cpus
-r--r--r-- 1 root root 0 Nov  1 19:45 cpuset.cpus.effective
-rw-r--r-- 1 root root 0 Nov  1 19:45 cpuset.cpus.partition
-rw-r--r-- 1 root root 0 Nov  1 19:45 cpuset.mems
-r--r--r-- 1 root root 0 Nov  1 19:45 cpuset.mems.effective
-r--r--r-- 1 root root 0 Nov  1 19:45 cpu.stat
-rw-r--r-- 1 root root 0 Nov  1 19:45 cpu.weight
-rw-r--r-- 1 root root 0 Nov  1 19:45 cpu.weight.nice
-rw-r--r-- 1 root root 0 Nov  1 19:45 io.bfq.weight
-rw-r--r-- 1 root root 0 Nov  1 19:45 io.latency
-rw-r--r-- 1 root root 0 Nov  1 19:45 io.max
-rw-r--r-- 1 root root 0 Nov  1 19:45 io.pressure
-r--r--r-- 1 root root 0 Nov  1 19:45 io.stat
-r--r--r-- 1 root root 0 Nov  1 19:45 memory.current
-r--r--r-- 1 root root 0 Nov  1 19:45 memory.events
-r--r--r-- 1 root root 0 Nov  1 19:45 memory.events.local
-rw-r--r-- 1 root root 0 Nov  1 19:45 memory.high
-rw-r--r-- 1 root root 0 Nov  1 19:45 memory.low
-rw-r--r-- 1 root root 0 Nov  1 19:45 memory.max
-rw-r--r-- 1 root root 0 Nov  1 19:45 memory.min
-r--r--r-- 1 root root 0 Nov  1 19:45 memory.numa_stat
-rw-r--r-- 1 root root 0 Nov  1 19:45 memory.oom.group
-rw-r--r-- 1 root root 0 Nov  1 19:45 memory.pressure
-r--r--r-- 1 root root 0 Nov  1 19:45 memory.stat
-r--r--r-- 1 root root 0 Nov  1 19:45 memory.swap.current
-r--r--r-- 1 root root 0 Nov  1 19:45 memory.swap.events
-rw-r--r-- 1 root root 0 Nov  1 19:45 memory.swap.high
-rw-r--r-- 1 root root 0 Nov  1 19:45 memory.swap.max
-r--r--r-- 1 root root 0 Nov  1 19:45 pids.current
-r--r--r-- 1 root root 0 Nov  1 19:45 pids.events
-rw-r--r-- 1 root root 0 Nov  1 19:45 pids.max

# 重点
# (0) Cgroup v2版本中的cpu.max文件类似于在Cgroup v1版本中cpu.cfs_period_us和cpu.cfs_quota_us的值的汇总
# (1) cpu.max第一个参数：用来配置在一个时间周期内(第二个参数的值)最多能使用的CPU时间长度,单位为us（微秒），默认为max（即不限制）
# (2) cpu.max第二个参数：用来配置时间周期长度，单位为us（微秒），默认值为10万
[root@localhost demo]# cat cpu.max
max 100000
```

:::

::: details （2）Cgroup v2：限制进程CPU使用率

```bash
[root@localhost ~]# mkdir /sys/fs/cgroup/demo
[root@localhost ~]# cd /sys/fs/cgroup/demo
[root@localhost demo]# cat cpu.max
max 100000
[root@localhost demo]# cat cgroup.procs

# 重点1：将我们的进程ID写入cgroup.procs
[root@localhost demo]# echo 1119 > cgroup.procs
[root@localhost demo]# cat cgroup.threads         # 类似于Cgroup v1中的tasks
1119
1120
1121
1122
1123

# 重点2：修改cpu.max文件
# 假设我们想限制CPU使用率为50%，即0.5核 = 5W / 10w,即修改cpu.max的值为: 50000 100000
[root@localhost demo]# echo 50000 100000 > cpu.max
[root@localhost demo]# cat cpu.max
50000 100000
# 若想使CPU使用率为120%，即1.2核，那么修改cpu.max的值为: 120000 100000
[root@localhost demo]# echo 120000 100000 > cpu.max
[root@localhost demo]# cat cpu.max
120000 100000

# 若取消限制，则修改第一个参数为max即可
[root@localhost demo]# echo max 100000 > cpu.max

# 若要删除cgroup目录，没有太好的办法，因为libcgroup-tools只适合Cgroup v1, Cgroup v2版本的系统已经不提供该包了
# 只有等进程停止后(cgroup.procs和cgroup.threads中的ID会自动被系统删除)才能删除目录
[root@localhost ~]# rmdir /sys/fs/cgroup/demo
```

:::

<br />

## 进阶：3、Union FS

::: details  模拟联合挂载

```bash
# 先创建必要的目录(下面这几个目录都是空目录)
[root@ap-hongkang ~]# mkdir lower upper worker merged

# 对镜像层lower、读写层upper写入数据，both.txt用于测试当文件名有冲突时最终以哪个层的数据生效
[root@ap-hongkang ~]# echo "lower" > lower/lower.txt && \
                      echo "upper" > upper/upper.txt && \
                      echo "lower" > lower/both.txt  && \
                      echo "upper" > upper/both.txt

# 执行挂载操作，挂载点为当前的merged目录
[root@ap-hongkang ~]# mount -t overlay overlay -o lowerdir=./lower,upperdir=./upper,workdir=./worker ./merged

# 检查联合挂载后的数据
[root@ap-hongkang ~]# ll merged/
total 12
-rw-r--r-- 1 root root 6 Oct 29 16:49 both.txt
-rw-r--r-- 1 root root 6 Oct 29 16:49 lower.txt
-rw-r--r-- 1 root root 6 Oct 29 16:49 upper.txt
[root@ap-hongkang ~]# cat merged/lower.txt 
lower
[root@ap-hongkang ~]# cat merged/upper.txt 
upper
[root@ap-hongkang ~]# cat merged/both.txt 
upper

# 修改和删除操作
[root@ap-hongkang ~]# echo "lower modify" > merged/lower.txt 
[root@ap-hongkang ~]# echo "upper modify" > merged/upper.txt 
[root@ap-hongkang ~]# rm -vf merged/both.txt

# 检查原始目录: lower数据并未修改
[root@ap-hongkang ~]# ll lower/
total 8
-rw-r--r-- 1 root root 6 Oct 29 16:49 both.txt
-rw-r--r-- 1 root root 6 Oct 29 16:49 lower.txt
[root@ap-hongkang ~]# cat lower/lower.txt 
lower

# 检查原始目录: upper数据发生变化
[root@ap-hongkang ~]# ll upper/
total 8
c--------- 2 root root 0, 0 Oct 29 17:07 both.txt
-rw-r--r-- 1 root root   13 Oct 29 17:08 lower.txt
-rw-r--r-- 1 root root   13 Oct 29 17:08 upper.txt
[root@ap-hongkang ~]# cat upper/upper.txt                    # 数据发生变化
upper modify
[root@ap-hongkang ~]# cat upper/lower.txt                    # 数据发生变化
lower modify
[root@ap-hongkang ~]# ls -l upper/both.txt                   # 标记删除
c--------- 2 root root 0, 0 Oct 29 17:07 upper/both.txt

# 卸载并检查数据
[root@ap-hongkang ~]# umount ./merged
[root@ap-hongkang ~]# ll merged/
total 0
```

:::

<br />

## 进阶：4、SDK使用

文档：[https://docs.docker.com/engine/api/](https://docs.docker.com/engine/api/)

**（1）安装说明**

文档：[https://docs.docker.com/engine/api/sdk/](https://docs.docker.com/engine/api/sdk/)

* Docker提供了Go和Python两种SDK和 RESTful API
* SDK和API都有自己的版本号，SDK本质就是对API的一层封装，所以我们最终应该以API版本号为准
* 我们应当使用和Docker Engine相同的API版本

::: details （1）先使用最新版SDK写一段简单的代码（该代码不连接Docker Engine）

1、先安装最新版SDK

```bash
D:\application\GoLand\demo>go get github.com/docker/docker/client
```

2、编写`main.go`

```go
package main

import (
	"fmt"

	"github.com/docker/docker/client"
)

func main() {
	cli, err := client.NewClientWithOpts()
	if err != nil {
		panic(err)
	}
	fmt.Println("API version: ", cli.ClientVersion())
}
```

3、Go依赖整理

```bash
D:\application\GoLand\demo>go mod tidy
```

这一步不是必须要做的，但是可以让我们的`go.mod`文件看起来更清爽，对比下面两张图观察差异

![image-20221021202343228](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20221021202343228.png)

![image-20221021202200246](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20221021202200246.png)



4、执行代码

```bash
D:\application\GoLand\demo>go run main.go
API version:  1.41
```

5、总结

1）`go.mod`文件中可以看到SDK的版本为：`v20.10.20+incompatible`

（+incompatible代表该库不符合Go对大于等于v2版本时的使用规范时给它打的一个标记，对我们使用者来说无影响）

2）通过代码输出SDK中API的版本为：`1.41`

:::

::: details （2）更新SDK为和Docker Engine一样的版本 

![image-20221021203610770](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20221021203610770.png)

查看Docker Engine版本后（上图），发现API版本一致，但是SDK版本不一致，其实这就可以了，但是如果我们想保持强一致的话，可以更新一下SDK版本

修改`go.mod`中的版本号：

```go
require github.com/docker/docker v20.10.15+incompatible // 这里修改为v20.10.15
```

然后进行依赖整理：

```bash
D:\application\GoLand\demo>go mod tidy
go: downloading github.com/docker/docker v20.10.15+incompatible
```

再次执行代码，确保降低了SDK版本后依旧与API版本一致

```bash
D:\application\GoLand\demo>go run main.go
API version:  1.41
```

:::

<br />

**（2）远程连接**

Docker Engine默认是不允许远程连接的，那么我们在本地Goland中编写的代码是无法连接到Docker Engine的（除非它是在本地部署的），那么该如何解决呢？

方法1：使用Goland的SFTP功能，自动同步代码到服务器中，在本地连接Docker Engine

方法2：将Docker Engine暴露出来，所有人可连接（当然这会存在很大的安全问题）

方法1是比较好的，但是我们在学习阶段，方法2显然开发体验更好，所以我们这里基于方法2来操作

::: details Docker Engine允许远程连接

```bash
# 修改配置
[root@ap-hongkang ~]# vim /usr/lib/systemd/system/docker.service
...
#ExecStart=/usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock  # 这是默认的配置，将其注释掉
ExecStart=/usr/bin/dockerd -H fd:// -H tcp://0.0.0.0:2375 --containerd=/run/containerd/containerd.sock  # 新增一行
...

# 重启Docker
[root@ap-hongkang ~]# systemctl daemon-reload
[root@ap-hongkang ~]# systemctl restart docker.service

# 查看,最后面有一个WARNING，我们不用管他
[root@ap-hongkang ~]# docker info
...
WARNING: API is accessible on http://0.0.0.0:2375 without encryption.
         Access to the remote API is equivalent to root access on the host. Refer
         to the 'Docker daemon attack surface' section in the documentation for
         more information: https://docs.docker.com/go/attack-surface/
         
# 连接测试
[root@ap-hongkang ~]# docker -H tcp://43.154.36.151 container ps
CONTAINER ID   IMAGE         COMMAND                  CREATED        STATUS         PORTS                                         NAMES
83680b8e9e1b   note:latest   "/docker-entrypoint.…"   21 hours ago   Up 2 minutes   0.0.0.0:6665->80/tcp, 0.0.0.0:6666->443/tcp   jinhui.dev
```

:::

::: details Go远程连接Docker Engine

```go
package main

import (
	"context"
	"encoding/json"
	"fmt"
	"os"
	"strings"
	"time"

	"github.com/docker/docker/client"
)

func main() {
	// Docker Engine连接参数
	host := "tcp://jinhui.dev:2375" // 若Docker Engine部署在本地，将host设置为空字符串即可
	timeout := "1s"                 // 超时包括从开始连接到读取响应总共的时间

	// 连接参数初始化
	err := os.Setenv("DOCKER_HOST", strings.TrimSpace(host))
	if err != nil {
		panic(err)
	}
	t, err := time.ParseDuration(strings.TrimSpace(timeout))
	if err != nil {
		panic(err)
	}

	// 初始化Context
	ctx := context.Background()

	// 初始化 Client
	// WithAPIVersionNegotiation启用自动API版本协商，
	// 意味着我们可以使用高版本的SDK连接低版本的Docker Engine，不过不推荐重度依赖此功能
	cli, err := client.NewClientWithOpts(client.FromEnv, client.WithTimeout(t), client.WithAPIVersionNegotiation())
	if err != nil {
		panic(err)
	}
	defer cli.Close()

	// 查看服务端信息（这一步会发起真正连接）
	start := time.Now()
	serverVersion, err := cli.ServerVersion(ctx)
	fmt.Printf("请求耗时: %.2fs\n", time.Now().Sub(start).Seconds())
	if err != nil {
		panic(err)
	}

	// Json序列化
	serverVersionJson, err := json.MarshalIndent(serverVersion, "", "    ")
	if err != nil {
		panic(err)
	}
	fmt.Println(string(serverVersionJson))
}
```

输出结果

```bash
D:\application\GoLand\demo>go run main.go
请求耗时: 0.59s
{                                                                  
    "Platform": {                                                  
        "Name": "Docker Engine - Community"                        
    },                                                             
    "Components": [                                                
        {                                                          
            "Name": "Engine",                                      
            "Version": "20.10.15",                                 
            "Details": {                                           
                "ApiVersion": "1.41",                              
                "Arch": "amd64",                                   
                "BuildTime": "2022-05-05T13:14:10.000000000+00:00",
                "Experimental": "false",                           
                "GitCommit": "4433bf6",                            
                "GoVersion": "go1.17.9",                           
                "KernelVersion": "4.18.0-348.7.1.el8_5.x86_64",    
                "MinAPIVersion": "1.12",                           
                "Os": "linux"
            }
        },
        {
            "Name": "containerd",
            "Version": "1.6.6",
            "Details": {
                "GitCommit": "10c12954828e7c7c9b6e0ea9b0c02b01407d3ae1"
            }
        },
        {
            "Name": "runc",
            "Version": "1.1.2",
            "Details": {
                "GitCommit": "v1.1.2-0-ga916309"
            }
        },
        {
            "Name": "docker-init",
            "Version": "0.19.0",
            "Details": {
                "GitCommit": "de40ad0"
            }
        }
    ],
    "Version": "20.10.15",
    "ApiVersion": "1.41",
    "MinAPIVersion": "1.12",
    "GitCommit": "4433bf6",
    "GoVersion": "go1.17.9",
    "Os": "linux",
    "Arch": "amd64",
    "KernelVersion": "4.18.0-348.7.1.el8_5.x86_64",
    "BuildTime": "2022-05-05T13:14:10.000000000+00:00"
}

# 当我把Docker Engine关闭后，再次执行代码时：怎么超时变成2秒钟了呢？
D:\application\GoLand\demo>go run main.go
请求耗时: 2.02s
panic: Cannot connect to the Docker daemon at tcp://jinhui.dev:2375. Is the docker daemon running?

goroutine 1 [running]:
main.main()
        D:/application/GoLand/demo/main.go:48 +0x44c
exit status 2

# 于是我又把代码放到服务器上执行
[root@ap-hongkang demo]# go run main.go 
请求耗时: 0.00s
panic: Cannot connect to the Docker daemon at tcp://jinhui.dev:2375. Is the docker daemon running?

goroutine 1 [running]:
main.main()
        /root/demo/main.go:48 +0x44c
exit status 2

# 超时是设置的双倍时间，这个之前遇到过，原因是同一个域名解析到了两个IP上，
# 但我这里只解析到了一个IP上，并且我使用IP测试也是2秒钟超时，暂时还不清楚原因
```

:::

<br />

**（3）超时问题**

在前面的代码中，实际的超时时间是设置的两倍，这是因为我们启用**自动API版本协商**

::: details 查看相关源码

```go
// 只显示关键注释
API version negotiation is performed on the first request; subsequent requests will not re-negotiate.
在发送第一个请求时会进行API版本协商；后续请求将不会重新协商
func WithAPIVersionNegotiation() Opt {
	return func(c *Client) error {
		c.negotiateVersion = true
		return nil
	}
}

// 在API协商时会向/ping发送请求，并且还忽略了错误，所以导致第二次请求也执行了，并且两次请求全部超时，就变成了双倍超时时间
// 当手动协商时不再进行自动协商，也就说不会重复协商，这样协商时超时时间就不会变为2倍
func (cli *Client) NegotiateAPIVersion(ctx context.Context) {
	if !cli.manualOverride {
		ping, _ := cli.Ping(ctx)
		cli.negotiateAPIVersionPing(ping)
	}
}

// 解决办法1：关闭自动API版本协商
// 解决办法2：手动进行API版本协商（手动协商时不会导致双倍超时）
```

:::

::: details 解决办法2：手动进行API版本协商（手动协商时不会导致双倍超时）

```go
package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"os"
	"strings"
	"time"

	"github.com/docker/docker/client"
)

func main() {
	// Docker Engine连接参数
	host := "tcp://jinhui.dev:2375" // 若Docker Engine部署在本地，将host设置为空字符串即可
	timeout := "1s"                 // 超时包括从开始连接到读取响应总共的时间

	// 连接参数初始化
	err := os.Setenv("DOCKER_HOST", strings.TrimSpace(host))
	if err != nil {
		panic(err)
	}
	t, err := time.ParseDuration(strings.TrimSpace(timeout))
	if err != nil {
		panic(err)
	}

	// 初始化Context
	ctx := context.Background()

	// 初始化 Client
	// WithAPIVersionNegotiation启用自动API版本协商，
	// 意味着我们可以使用高版本的SDK连接低版本的Docker Engine，不过不推荐重度依赖此功能
	cli, err := client.NewClientWithOpts(client.FromEnv, client.WithTimeout(t), client.WithAPIVersionNegotiation())
	if err != nil {
		panic(err)
	}
	defer cli.Close()

	// 添加下面这一段代码，其他都不变
	// 手动进行API版本协商（手动协商时不会导致双倍超时）
	// 避免在后续的第一次请求中进行协商，因为在协商过程中会忽略错误，会导致超时时间变为原来的2倍
	pingStart := time.Now()
	_, err = cli.Ping(ctx)
	fmt.Printf("请求耗时: %.2fs\n", time.Now().Sub(pingStart).Seconds())
	if err != nil {
		log.Println(err)
	}

	// 查看服务端信息（这一步会发起真正连接）
	start := time.Now()
	serverVersion, err := cli.ServerVersion(ctx)
	fmt.Printf("请求耗时: %.2fs\n", time.Now().Sub(start).Seconds())
	if err != nil {
		panic(err)
	}

	// Json序列化
	serverVersionJson, err := json.MarshalIndent(serverVersion, "", "    ")
	if err != nil {
		panic(err)
	}
	fmt.Println(string(serverVersionJson))
}
```

输出结果

```bash
D:\application\GoLand\demo>go run main.go
请求耗时: 1.01s
2022/10/22 20:49:24 Cannot connect to the Docker daemon at tcp://jinhui.dev:2375. Is the docker daemon running?
请求耗时: 2.03s
panic: Cannot connect to the Docker daemon at tcp://jinhui.dev:2375. Is the docker daemon running?
                                                                                                  
goroutine 1 [running]:                                                                            
main.main()                                                                                       
        D:/application/GoLand/demo/main.go:57 +0x56c                                              
exit status 2

# 可以看到协商时的超时时间是对的，因为我们协商没有成功，而我们也没有退出程序，所以第二次发送求时依旧会协商，所以还是2秒
# 在实际应用中，手动协商报错后直接return或panic了，这里我们只是演示，所以并没有退出程序
```

:::

<br />

**（4）简单封装**

我们简单封装一个函数，用于简化`main`函数

::: details 点击查看详情

```go
package main

import (
	"context"
	"encoding/json"
	"fmt"
	"os"
	"strings"
	"time"

	"github.com/docker/docker/client"
)

func NewDockerClient(host, timeout string) (*client.Client, error) {
	// 连接参数初始化
	err := os.Setenv("DOCKER_HOST", strings.TrimSpace(host))
	if err != nil {
		return nil, err
	}
	t, err := time.ParseDuration(strings.TrimSpace(timeout))
	if err != nil {
		return nil, err
	}

	// 初始化 Client
	// WithAPIVersionNegotiation启用自动API版本协商，
	// 意味着我们可以使用高版本的SDK连接低版本的Docker Engine，不过不推荐重度依赖此功能
	cli, err := client.NewClientWithOpts(client.FromEnv, client.WithTimeout(t), client.WithAPIVersionNegotiation())
	if err != nil {
		return nil, err
	}

	// 手动进行API版本协商，避免在后续的第一次请求中进行协商，因为在协商过程中会忽略错误，会导致超时时间变为原来的2倍
	_, err = cli.Ping(context.Background())
	if err != nil {
		return nil, err
	}

	return cli, nil
}

func main() {
	// Docker Engine连接参数
	host := "tcp://jinhui.dev:2375" // 若Docker Engine部署在本地，将host设置为空字符串即可
	timeout := "1s"                 // 超时包括从开始连接到读取响应总共的时间

	// 初始化Context
	ctx := context.Background()

	// 初始化客户端（这一步会发起真正连接进行API版本协商）
	cli, err := NewDockerClient(host, timeout)
	if err != nil {
		panic(err)
	}

	// 查看服务端信息
	serverVersion, err := cli.ServerVersion(ctx)
	if err != nil {
		panic(err)
	}

	// Json序列化
	serverVersionJson, err := json.MarshalIndent(serverVersion, "", "    ")
	if err != nil {
		panic(err)
	}
	fmt.Println(string(serverVersionJson))
}
```

:::

<br />

**（5）几个示例**

文档：[https://docs.docker.com/engine/api/sdk/examples/](https://docs.docker.com/engine/api/sdk/examples/)

::: details 拉取镜像

说明：多进度条功能需要优化，可以参考mbp的实现原理：[https://github.com/vbauerster/mpb/blob/master/_examples/complex/main.go](https://github.com/vbauerster/mpb/blob/master/_examples/complex/main.go)

```go
package main

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"os"
	"strings"
	"time"

	"github.com/docker/docker/api/types"

	"github.com/docker/docker/client"
)

func NewDockerClient(host, timeout string) (*client.Client, error) {
	// 连接参数初始化
	err := os.Setenv("DOCKER_HOST", strings.TrimSpace(host))
	if err != nil {
		return nil, err
	}
	t, err := time.ParseDuration(strings.TrimSpace(timeout))
	if err != nil {
		return nil, err
	}

	// 初始化 Client
	// WithAPIVersionNegotiation启用自动API版本协商，
	// 意味着我们可以使用高版本的SDK连接低版本的Docker Engine，不过不推荐重度依赖此功能
	cli, err := client.NewClientWithOpts(client.FromEnv, client.WithTimeout(t), client.WithAPIVersionNegotiation())
	if err != nil {
		return nil, err
	}

	// 手动进行API版本协商，避免在后续的第一次请求中进行协商，因为在协商过程中会忽略错误，会导致超时时间变为原来的2倍
	_, err = cli.Ping(context.Background())
	if err != nil {
		return nil, err
	}

	return cli, nil
}

type ImagePullResponse struct {
	Status         string `json:"status"`
	Id             string `json:"id"`
	Progress       string `json:"progress"`
	ProgressDetail struct {
		Current int `json:"current"`
		Total   int `json:"total"`
	} `json:"progressDetail"`
}

func main() {
	// Docker Engine连接参数
	host := "tcp://jinhui.dev:2375" // 若Docker Engine部署在本地，将host设置为空字符串即可
	timeout := "15s"                // 超时包括从开始连接到读取响应总共的时间

	// 初始化Context
	ctx := context.Background()

	// 初始化客户端（这一步会发起真正连接进行API版本协商）
	cli, err := NewDockerClient(host, timeout)
	if err != nil {
		panic(err)
	}

	// 拉取镜像
	reader, err := cli.ImagePull(ctx, "docker.io/library/nginx:1.22", types.ImagePullOptions{})
	if err != nil {
		panic(err)
	}
	defer reader.Close()

	// 解码数据流
	var imagePullResponse ImagePullResponse
	decoder := json.NewDecoder(reader)
	for {
		err := decoder.Decode(&imagePullResponse)
		if err == io.EOF {
			break
		}
		if err != nil {
			panic(err)
		}
		fmt.Println(imagePullResponse)
	}
}
```

:::

<br />

## 进阶：5、Compose

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

### 安装

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

<br />

### 软链接到全局

有些服务（比如Harbor）可能会调用`docker-compose`命令，而我们并没有将其放到PATH变量中，这可能会有些问题，解决方法有很多，这里仅展示一种

```bash
# 查看docker-compose路径
[root@localhost harbor]# docker info --format '{{range .ClientInfo.Plugins}}{{if eq .Name "compose"}}{{.Path}}{{end}}{{end}}'
/usr/libexec/docker/cli-plugins/docker-compose

# 查看docker命令位置
[root@localhost harbor]# which docker
/usr/bin/docker

# 将docker-compose命令放到和docker同一个目录内
[root@localhost harbor]# ln -s /usr/libexec/docker/cli-plugins/docker-compose /usr/bin/

# 查看版本
[root@localhost harbor]# docker compose version
Docker Compose version v2.5.0
[root@localhost harbor]# docker-compose version
Docker Compose version v2.5.0
[root@localhost harbor]# ls -lh `which docker-compose `
lrwxrwxrwx 1 root root 46 Jun 10 10:12 /usr/bin/docker-compose -> /usr/libexec/docker/cli-plugins/docker-compose
```

<br />

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

![image-20220606074717146](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20220606074717146.png)

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

![image-20220606075707139](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20220606075707139.png)



③ 容器通信方式

看一下我们的Python代码，`cache = redis.Redis(host='redis', port=6379)`，我们发现：

* 很显然这是通过内置的`DNS`来通信的

* 使用的自定义的`bridge`网络，满足使用`DNS`通信要求

* `redis`与容器名称并不一致，怀疑是通过网络别名来通信，来验证一下

  ![image-20220606080914974](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20220606080914974.png)

  ![image-20220606081942898](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20220606081942898.png)

  ![image-20220606082226087](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20220606082226087.png)

:::

<br />

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

<br />

### 01、编写一个简单的Compose file

文档：[https://docs.docker.com/compose/compose-file/compose-file-v3/](https://docs.docker.com/compose/compose-file/compose-file-v3/)

`Version`字段文档：[https://docs.docker.com/compose/compose-file/compose-versioning/](https://docs.docker.com/compose/compose-file/compose-versioning/)

`service`：每一个`service`可以简单理解成对一个容器的封装，在上面我们有`web`、`mysql`、`redis`3个service，即3个容器

`image`：指定镜像及版本

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

<br />

### 02、convert/config 查看当前配置

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

<br />

### 03、指定环境变量

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

<br />

### 04、build 构建镜像

文档1：[https://docs.docker.com/compose/compose-file/compose-file-v3/#build](https://docs.docker.com/compose/compose-file/compose-file-v3/#build)

文档2：[https://docs.docker.com/compose/compose-file/build/](https://docs.docker.com/compose/compose-file/build/)

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
# docker compose down --rmi <local | all>
#   local：移除service所依赖的镜像（没有自定义tag的那种，不包括image指定的镜像，因为并没有自定义tag）
#   all: 移除service所依赖的镜像（所有镜像，包括使用image指定的镜像）
[root@localhost demo]# docker compose down --rmi local

# 解决办法2：给新构建的镜像指定一个名字和tag，每次都要修改一下docker-compose.yml，使用不同的名字或tag
[root@localhost demo]# cat docker-compose.yml 
version: "3"
services:        
  server:
    build: .
    image: demo_server:v2
    
# 解决办法3: 每次启动前先手动构建镜像（若镜像存在也会重新构建）
[root@localhost demo]# docker compose build && docker compose up
```

:::

<br />

### 05、指定容器名称

```bash
[root@localhost demo]# cat docker-compose.yml 
version: "3"
services:        
  web:
    image: nginx:1.21.6
    container_name: my_web  # 自定义容器名称
  mysql:
    image: mysql:8.0.29
    environment:
        MYSQL_ROOT_PASSWORD: "qaz.123="    
    container_name: my_mysql  # 自定义容器名称
  redis:
    image: redis:7.0.0

[root@localhost demo]# docker compose up -d
[+] Running 4/4
 ⠿ Network demo_default    Created					0.1s                                                                         
 ⠿ Container my_web        Started					0.7s  # 自定义容器名称
 ⠿ Container my_mysql      Started					0.8s  # 自定义容器名称
 ⠿ Container demo-redis-1  Started					0.8s  # 默认容器名称
```

<br />

### 06、指定重启策略

文档：[https://docs.docker.com/compose/compose-file/compose-file-v3/#restart](https://docs.docker.com/compose/compose-file/compose-file-v3/#restart)

```bash
[root@localhost demo]# cat docker-compose.yml 
version: "3"
services:        
  web:
    image: nginx:1.21.6
    restart: always
  mysql:
    image: mysql:8.0.29
    environment:
        MYSQL_ROOT_PASSWORD: "qaz.123="
    restart: always
  redis:
    image: redis:7.0.0

[root@localhost demo]# docker compose up -d
[+] Running 4/4
 ⠿ Network demo_default    Created					0.1s                                                                         
 ⠿ Container demo-redis-1  Started					0.7s                                                                         
 ⠿ Container demo-web-1    Started					0.5s                                                                         
 ⠿ Container demo-mysql-1  Started					0.6s 
 
[root@localhost demo]# docker container inspect demo-mysql-1 | grep -i -A 3 RestartPolicy
            "RestartPolicy": {
                "Name": "always",
                "MaximumRetryCount": 0
            },
[root@localhost demo]# docker container inspect demo-redis-1 | grep -i -A 3 RestartPolicy
            "RestartPolicy": {
                "Name": "",
                "MaximumRetryCount": 0
            },
```

<br />

### 07、指定端口映射

```bash
# MySQL容器3306端口映射到宿主机3307端口
[root@localhost demo]# cat docker-compose.yml 
version: "3"
services:        
  web:
    image: nginx:1.21.6
  mysql:
    image: mysql:8.0.29
    environment:
        MYSQL_ROOT_PASSWORD: "qaz.123="
    ports:
      - '3307:3306'
  redis:
    image: redis:7.0.0

# 连接测试
[root@localhost demo]# mysql -h127.0.0.1 -uroot -P3307 -pqaz.123= -e "status"
mysql: [Warning] Using a password on the command line interface can be insecure.
--------------
mysql  Ver 14.14 Distrib 5.7.38, for Linux (x86_64) using  EditLine wrapper

Connection id:          9
Current database:
Current user:           root@192.168.128.1
SSL:                    Cipher in use is ECDHE-RSA-AES128-GCM-SHA256
Current pager:          stdout
Using outfile:          ''
Using delimiter:        ;
Server version:         8.0.29 MySQL Community Server - GPL
Protocol version:       10
Connection:             127.0.0.1 via TCP/IP
Server characterset:    utf8mb4
Db     characterset:    utf8mb4
Client characterset:    utf8mb3
Conn.  characterset:    utf8mb3
TCP port:               3307
Uptime:                 19 sec

Threads: 2  Questions: 10  Slow queries: 0  Opens: 117  Flush tables: 3  Open tables: 36  Queries per second avg: 0.526
--------------
```

<br />

### 08、覆盖Dockerfile CMD指令

文档：[https://docs.docker.com/compose/compose-file/#command](https://docs.docker.com/compose/compose-file/#command)

```bash
[root@localhost demo]# cat docker-compose.yml 
version: "3"
services:        
  server:
    image: centos:7
    command: sh -c "while [ true ]; do echo $$(date +'%Y-%m-%d %H:%M:%S'); sleep 1; done"
[root@localhost demo]# docker compose up
[+] Running 1/0
 ⠿ Container demo-server-1  Created					0.0s                                                                         
Attaching to demo-server-1
demo-server-1  | 2022-06-07 23:28:39
demo-server-1  | 2022-06-07 23:28:40
demo-server-1  | 2022-06-07 23:28:41
```

<br />

### 09、✨网络配置

文档：[https://docs.docker.com/compose/compose-file/#networks-top-level-element](https://docs.docker.com/compose/compose-file/#networks-top-level-element)

::: details (1) 基础配置

```bash
[root@localhost demo]# cat docker-compose.yml 
version: "3"
services:        
  server:
    image: centos:7
    command: sh -c "while [ true ]; do echo $$(date +'%Y-%m-%d %H:%M:%S'); sleep 1; done"
    # networks指定网络, 可以指定多个
    networks:
      - mynet1
      - mynet2

# networks字段用于配置网络, 这里的意思是: 定义两个网桥mynet1和mynet2
networks:
  mynet1:
  mynet2:

[root@localhost demo]# docker compose up
[+] Running 3/3
 ⠿ Network demo_mynet1      Created					0.1s                                                                         
 ⠿ Network demo_mynet2      Created					0.1s                                                                         
 ⠿ Container demo-server-1  Created					0.1s                                                                         
Attaching to demo-server-1
demo-server-1  | 2022-06-07 23:45:29
demo-server-1  | 2022-06-07 23:45:30
demo-server-1  | 2022-06-07 23:45:31
demo-server-1  | 2022-06-07 23:45:32
demo-server-1  | 2022-06-07 23:45:33
demo-server-1  | 2022-06-07 23:45:34
demo-server-1  | 2022-06-07 23:45:35
# ----------------------------------------------------------------------------------------
# 查看网桥，发现多了2个
[root@localhost ~]# docker network ls
NETWORK ID     NAME          DRIVER    SCOPE
19913bc6a47d   bridge        bridge    local
306e0d885afa   demo_mynet1   bridge    local
161f1c81b416   demo_mynet2   bridge    local
23966f1794db   host          host      local
7c080397ed19   none          null      local

# 查看容器所属网络
[root@localhost ~]# docker container inspect demo-server-1 | sed -n "/Networks/, $"p
            "Networks": {
                "demo_mynet1": {
                    "IPAMConfig": null,
                    "Links": null,
                    "Aliases": [
                        "demo-server-1",
                        "server",
                        "28e838d4c57d"
                    ],
                    "NetworkID": "b53d7bc6fb8cde3a829a288772a47d6e43a0e03406563d0f2b027f95b60ed4e7",
                    "EndpointID": "d9ad37dafa79c583a00ad5aa26a1191e60a245809fba9ca37af890b7699cd92c",
                    "Gateway": "172.19.0.1",
                    "IPAddress": "172.19.0.2",
                    "IPPrefixLen": 16,
                    "IPv6Gateway": "",
                    "GlobalIPv6Address": "",
                    "GlobalIPv6PrefixLen": 0,
                    "MacAddress": "02:42:ac:13:00:02",
                    "DriverOpts": null
                },
                "demo_mynet2": {
                    "IPAMConfig": null,
                    "Links": null,
                    "Aliases": [
                        "demo-server-1",
                        "server",
                        "28e838d4c57d"
                    ],
                    "NetworkID": "3a58974c7b413b0891cac1d2f84802e68ac609de78da1197bc3af3895a824991",
                    "EndpointID": "30f5ba375cf5a0b6a482049c4723c04524f86aa759a5ec9856a853e06658c44c",
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
        }
    }
]

# 查看容器的IP
[root@localhost ~]# docker container exec -it demo-server-1 bash -c "yum -y install net-tools iproute && ip a"
Loaded plugins: fastestmirror, ovl
Loading mirror speeds from cached hostfile
 * base: mirrors.aliyun.com
 * extras: centos.nethub.com.hk
 * updates: centos.nethub.com.hk
Package net-tools-2.0-0.25.20131004git.el7.x86_64 already installed and latest version
Package iproute-4.11.0-30.el7.x86_64 already installed and latest version
Nothing to do
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
630: eth0@if631: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default 
    link/ether 02:42:ac:13:00:02 brd ff:ff:ff:ff:ff:ff link-netnsid 0
    inet 172.19.0.2/16 brd 172.19.255.255 scope global eth0
       valid_lft forever preferred_lft forever
632: eth1@if633: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default 
    link/ether 02:42:ac:14:00:02 brd ff:ff:ff:ff:ff:ff link-netnsid 0
    inet 172.20.0.2/16 brd 172.20.255.255 scope global eth1
       valid_lft forever preferred_lft forever
```

:::

::: details (2) 指定为外部网络，则Compose不会主动创建该网络

```bash
[root@localhost demo]# cat docker-compose.yml 
version: "3"
services:        
  server:
    image: centos:7
    command: sh -c "while [ true ]; do echo $$(date +'%Y-%m-%d %H:%M:%S'); sleep 1; done"
    networks:
      - mynet1
      - mynet2

networks:
  mynet1:
  mynet2: 
    # 定义为外部网络，compose不会主动创建，若找不到mynet2网桥则会报错
    external: true

# 因为该网桥尚未创建，所以启动时报错未找到
[root@localhost demo]# docker compose up
[+] Running 1/0
 ⠿ Network demo_mynet1  Created					0.1s                                                                             
network mynet2 declared as external, but could not be found

# 手动创建一个bridge类型网桥
[root@localhost ~]# docker network create \
--driver bridge \
--subnet 172.20.0.0/16 \
--gateway 172.20.0.1 \
-o com.docker.network.bridge.name=mynet2 \
mynet2 

# 再次启动
[root@localhost demo]# docker compose up
[+] Running 1/0
 ⠿ Container demo-server-1  Created					0.1s                                                                         
Attaching to demo-server-1
demo-server-1  | 2022-06-07 23:58:52
demo-server-1  | 2022-06-07 23:58:53
demo-server-1  | 2022-06-07 23:58:54
demo-server-1  | 2022-06-07 23:58:55
demo-server-1  | 2022-06-07 23:58:56

# 查看docker网桥
[root@localhost ~]# docker network ls
NETWORK ID     NAME          DRIVER    SCOPE
19913bc6a47d   bridge        bridge    local
d8af7b39a350   demo_mynet1   bridge    local
23966f1794db   host          host      local
428d68213519   mynet2        bridge    local
7c080397ed19   none          null      local

# 查看Linux网桥
[root@localhost ~]# brctl show
bridge name     		bridge id               STP enabled     interfaces
br-d8af7b39a350         8000.024241276bec       no              veth6b34cd4
docker0         		8000.0242ba5aab45       no              vethb6dc559
mynet2          		8000.024246ff67a9       no              vethba4ec17
```

:::

::: details (3) 指定网桥名字

```bash
[root@localhost demo]# cat docker-compose.yml 
version: "3"
services:        
  server:
    image: centos:7
    command: sh -c "while [ true ]; do echo $$(date +'%Y-%m-%d %H:%M:%S'); sleep 1; done"
    networks:
      - mynet1
      - mynet2

networks:
  mynet1:
  mynet2: 
    name: mynet2

[root@localhost demo]# docker compose up
[+] Running 3/3
 ⠿ Network demo_mynet1      Created					0.1s                                                                         
 ⠿ Network mynet2           Created					0.1s # 这里不再是默认的名字，而是mynet2
 ⠿ Container demo-server-1  Created					0.1s                                                                         
Attaching to demo-server-1
demo-server-1  | 2022-06-08 00:02:35
demo-server-1  | 2022-06-08 00:02:36
demo-server-1  | 2022-06-08 00:02:37

[root@localhost demo]# docker network ls
NETWORK ID     NAME          DRIVER    SCOPE
19913bc6a47d   bridge        bridge    local
91d9722ab1df   demo_mynet1   bridge    local
23966f1794db   host          host      local
7523cf9d05bf   mynet2        bridge    local
7c080397ed19   none          null      local
```

:::

::: details (4) 指定子网和默认网关

```bash
[root@localhost demo]# cat docker-compose.yml
version: "3"
services:        
  server:
    image: centos:7
    command: sh -c "while [ true ]; do echo $$(date +'%Y-%m-%d %H:%M:%S'); sleep 1; done"
    networks:      
      - mynet2

networks:
  mynet1:
    name: mynet1          
  mynet2: 
    name: mynet2
    # 自定义ipam配置
    ipam:
      driver: default
      config:
        - subnet: 172.28.0.0/16    # 子网
          ip_range: 172.28.5.0/24  # 限制容器IP范围
          gateway: 172.28.5.254    # 默认网关

# ----------------------------------------------------------------------------------------
# 上面的可能会有点啰嗦，一个最简单的定义如下
    # 自定义ipam配置
    ipam:
      driver: default
      config:
        - subnet: 172.28.10.0/24    # 子网，默认网关会使用172.28.10.1

[root@localhost ~]# docker container exec -it demo-server-1 bash -c "route -n"
Kernel IP routing table
Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
0.0.0.0         172.28.10.1     0.0.0.0         UG    0      0        0 eth0
172.28.10.0     0.0.0.0         255.255.255.0   U     0      0        0 eth0

[root@localhost ~]# docker container exec -it demo-server-1 bash -c "ping baidu.com -c 4"
PING baidu.com (220.181.38.148) 56(84) bytes of data.
64 bytes from 220.181.38.148 (220.181.38.148): icmp_seq=1 ttl=48 time=42.2 ms
64 bytes from 220.181.38.148 (220.181.38.148): icmp_seq=2 ttl=48 time=42.1 ms
64 bytes from 220.181.38.148 (220.181.38.148): icmp_seq=3 ttl=48 time=42.2 ms
64 bytes from 220.181.38.148 (220.181.38.148): icmp_seq=4 ttl=48 time=42.2 ms
--- baidu.com ping statistics ---
4 packets transmitted, 4 received, 0% packet loss, time 3004ms
rtt min/avg/max/mdev = 42.123/42.190/42.219/0.209 ms
```

:::

<br />

### 10、✨持久化配置

文档：[https://docs.docker.com/compose/compose-file/#volumes-top-level-element](https://docs.docker.com/compose/compose-file/#volumes-top-level-element)

```bash
[root@localhost demo]# cat docker-compose.yml 
version: "3"
services:        
  server:
    image: centos:7
    command: sh -c "while [ true ]; do echo $$(date +'%Y-%m-%d %H:%M:%S'); sleep 1; done"
    # 将容器/data1映射到data1卷，/data2映射到data2卷
    volumes:
      - data1:/data1
      - data2:/data2

# volumes字段用于定义卷，data1是有名字的，data2是匿名的
volumes:
  data1:
    name: data1
  data2:
  
# 启动
[root@localhost demo]# docker compose up 
[+] Running 4/4
 ⠿ Network demo_default     Created					0.1s                                                                         
 ⠿ Volume "data1"           Created					0.0s                                                                         
 ⠿ Volume "demo_data2"      Created					0.0s                                                                         
 ⠿ Container demo-server-1  Created					0.1s                                                                         
Attaching to demo-server-1
demo-server-1  | 2022-06-08 00:37:00
demo-server-1  | 2022-06-08 00:37:01

# 查看卷
[root@localhost demo]# docker volume ls
DRIVER    VOLUME NAME
local     data1
local     demo_data2

# 查看卷详情
[root@localhost demo]# docker volume inspect data1
[
    {
        "CreatedAt": "2022-06-08T08:37:00+08:00",
        "Driver": "local",
        "Labels": {
            "com.docker.compose.project": "demo",
            "com.docker.compose.version": "2.5.0",
            "com.docker.compose.volume": "data1"
        },
        "Mountpoint": "/var/lib/docker/volumes/data1/_data",
        "Name": "data1",
        "Options": null,
        "Scope": "local"
    }
]
```

<br />

### 11、资源限制（未解决）

文档：[https://docs.docker.com/compose/compose-file/compose-file-v3/#resources](https://docs.docker.com/compose/compose-file/compose-file-v3/#resources)

问题描述：对内存的限制生效，对CPU的限制不生效

```bash
[root@localhost demo]# cat docker-compose.yml 
version: "3.9"
services:
  server:
    image: centos:7
    command: sh -c "while [ true ]; do echo $$(date +'%Y-%m-%d %H:%M:%S'); sleep 1; done"
    deploy:
      resources:
        limits:
          cpus: '0.50'
          memory: 500M
        reservations:
          cpus: '0.25'
          memory: 200M

# 启动（--compatibility 以向后兼容性方式启动）
[root@localhost demo]# docker compose --compatibility up
[+] Running 2/2
 ⠿ Network demo_default     Created					0.1s                                                                         
 ⠿ Container demo_server_1  Created					0.1s                                                                         
Attaching to server_1
server_1  | 2022-06-08 06:18:21
server_1  | 2022-06-08 06:18:22
server_1  | 2022-06-08 06:18:23

# 新开一个终端，用于模拟消耗CPU
[root@localhost ~]# docker container exec -it demo_server_1 bash
[root@77a8be2674fe /]# cat /dev/urandom | gzip -9 >/dev/null

# 新开一个终端，用于监视容器资源消耗，并没有限制住CPU
[root@localhost ~]# docker stats
CONTAINER ID   NAME            CPU %     MEM USAGE / LIMIT   MEM %     NET I/O          BLOCK I/O         PIDS
77a8be2674fe   demo_server_1   156.10%   2.031MiB / 500MiB   0.41%     0B / 0B          0B / 0B           5

# 查看容器Cgroup参数，并没有设置到值
[root@localhost ~]# docker container inspect demo_server_1 | grep -i cpu
            "CpuShares": 0,
            "NanoCpus": 0,
            "CpuPeriod": 0,
            "CpuQuota": 0,
            "CpuRealtimePeriod": 0,
            "CpuRealtimeRuntime": 0,
            "CpusetCpus": "",
            "CpusetMems": "",
            "CpuCount": 0,
            "CpuPercent": 0,
```

<br />

### 12、服务依赖关系

文档：[https://docs.docker.com/compose/compose-file/compose-file-v3/#depends_on](https://docs.docker.com/compose/compose-file/compose-file-v3/#depends_on)

`depends_on`用于表示服务之间的依赖关系，依赖关系会有如下行为：

* `docker compose up`会按依赖顺序启动服务
* `docker compose up <service>`会自动包含服务的依赖项
* `docker compose stop`会按依赖关系顺序停止服务

注意：比如ApiServer启动依赖于MySQL，这会先启动MySQL再启动ApiServer，但并不是等MySQL启动完成后再启动ApiServer，而仅仅是启动顺序不同而已

如果要解决这个问题，最好的方式是在程序内实现自动重试，其次是编写脚本判断服务就绪然后再启动依赖的服务

::: details depends_on基础示例

```bash
[root@localhost demo]# cat docker-compose.yml 
version: "3.9"
services:
  server1:
    image: centos:7
    container_name: server1
    command: sh -c "for i in `seq 5`; do echo $$(date +'%Y-%m-%d %H:%M:%S'); sleep 1; done"
    depends_on:
      - server2

  server2:
    image: centos:7
    container_name: server2
    command: sh -c "for i in `seq 5`; do echo $$(date +'%Y-%m-%d %H:%M:%S'); sleep 1; done"

# 启动，可以看到server2先输出了内容，但仅凭这个并不准确说明启动顺序
[root@localhost demo]# docker compose up
[+] Running 3/3
 ⠿ Network demo_default  Created					0.1s                                                                         
 ⠿ Container server2     Created					0.1s                                                                         
 ⠿ Container server1     Created					0.0s                                                                         
Attaching to server1, server2
server2  | 2022-06-08 23:19:16
server1  | 2022-06-08 23:19:16
server2  | 2022-06-08 23:19:17
server1  | 2022-06-08 23:19:17
server2  | 2022-06-08 23:19:18
server1  | 2022-06-08 23:19:18
server2  | 2022-06-08 23:19:19
server1  | 2022-06-08 23:19:19
server2  | 2022-06-08 23:19:20
server1  | 2022-06-08 23:19:20
server2 exited with code 0
server1 exited with code 0

# 查看容器创建时间，可以看到server2创建的比server1要早
[root@localhost demo]# docker inspect server1 | grep -i create
        "Created": "2022-06-08T23:19:16.05362163Z",
                "org.opencontainers.image.created": "2020-11-13 00:00:00+00:00",
[root@localhost demo]# 
[root@localhost demo]# docker inspect server2 | grep -i create
        "Created": "2022-06-08T23:19:15.96630301Z",
                "org.opencontainers.image.created": "2020-11-13 00:00:00+00:00",
```

:::
