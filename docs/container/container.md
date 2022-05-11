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
sudo systemctl enable docker.service	# 设置开启自启

# 测试Docker Engine
sudo docker run hello-world
```

:::

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

#### Dockerrfile(1)：简介和常用命令

Dockerrfile是一个文本文件，记录了构建镜像的所有步骤



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
| ENTRYPOINT | 设置容器启动时运行的命令<br />（1）可以有多个ENTRYPOINT命令但只有最后一个生效<br />（2）CMD或docker run之后的参数会被当做参数传递给ENTRYPOINT |
| CMD        | 容器启动时运行指定的命令<br />（1）可以有多个CMD命令但只有最后一个生效<br />（2）CMD命令可以被docker run之后的参数替换 |



#### Dockerrfile(2)：RUN、CMD、ENTRYPOINT差异





#### Dockerrfile(3)：Go项目实战

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

（5）镜像大小第一次优化：先编译Go项目，然后将编译好的二进制拷贝到容器中

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

（6）镜像大小第二次优化：使用容器镜像的多阶段构建

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
