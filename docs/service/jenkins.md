# Jenkins

文档：[https://www.jenkins.io/doc](https://www.jenkins.io/doc)

Github：[https://github.com/jenkinsci/jenkins](https://github.com/jenkinsci/jenkins)

Java版本要求：[https://www.jenkins.io/doc/administration/requirements/java](https://www.jenkins.io/doc/administration/requirements/java)

JDK下载地址：[https://www.oracle.com/java/technologies/downloads/](https://www.oracle.com/java/technologies/downloads/)

<br />

## 基本配置

### 部署服务

::: details Docker部署

文档：[https://www.jenkins.io/doc/book/installing/docker](https://www.jenkins.io/doc/book/installing/docker)

Docker Hub：[https://hub.docker.com/r/jenkins/jenkins](https://hub.docker.com/r/jenkins/jenkins)

```bash
# 创建Jenkins家目录
[root@localhost ~]# mkdir -p /var/lib/jenkins_home
[root@localhost ~]# chown -R 1000:1000 /var/lib/jenkins_home

# 启动容器
[root@localhost ~]# docker container run --name jenkins \
    -p 8080:8080 \
    -p 50000:50000 \
    -v /var/lib/jenkins_home:/var/jenkins_home \
    -d \
    --restart=always \
  jenkins/jenkins:2.387.3-lts

# 浏览器访问: http://192.168.8.130:8080

# 查看初始密码: 方法1
[root@localhost ~]# docker container logs jenkins

# 查看初始密码: 方法2
[root@localhost ~]# cat /var/lib/jenkins_home/secrets/initialAdminPassword
b1766bfdbc5848ae8e9b00a8258207a9

# 插件可根据实际情况安装, 这里不创建用户, 使用默认的admin用户
```

:::

<br />

### 推荐插件

说明：安装插件时会自动安装依赖插件，所以安装一个插件时实际上有可能会安装几个甚至十几个插件

<br />

**系统插件**

* **[locale](https://plugins.jenkins.io/locale)**：语言设置，可在 **系统配置** 中手动配置默认语言，推荐 `en`，可以解决即使不安装中文插件，还是有极小部分是中文字体的问题

**节点插件**

* **[SSH Build Agents](https://plugins.jenkins.io/ssh-slaves)**：提供通过 SSH 启动代理的方法

**构建插件**

* **[Pipeline](https://plugins.jenkins.io/workflow-aggregator)**
* **[Pipeline: Stage View](https://plugins.jenkins.io/pipeline-stage-view)**：Pipeline 可视化界面
* **[Timestamper](https://plugins.jenkins.io/timestamper)**：Pipeline 日志输出中添加时间戳，可在 **系统配置** 中手动配置时间格式，对于Shell脚本需要手动勾选添加时间戳选项

**源码管理**

* **[Git](https://plugins.jenkins.io/git)**

**认证插件**

* **[LDAP](https://plugins.jenkins.io/ldap)**

<br />

## 节点管理

### 内置节点

对于内置节点，可以将 Number of executors 设置为0，以防止任务在Jenkins本地运行

<br />

### 添加节点

::: details 在Jenkins上添加一个节点

```bash
# 基本配置
Name																	# 名称
Description																# 描述信息

Number of executors														# 最大并发构建数
																		# 建议设置和CPU核心数相同的数
																		# 内置节点建议设置为0以防止在本地执行构建
													
Remote root directory   												# 远程根目录, 实际上是Node的数据存储目录, 可以是一个任意目录

Labels																	# 标签， 用于将多个代理分组到一个逻辑组中, 多个标签必须用空格分隔

Usage																	# 用法
																		# 1.尽量使用这个节点
																		# 2.仅构建标签表达式与该节点匹配的作业

Launch method															# 启动方式
	Launch agent by connecting it to the controller 					# 1.使用代理连接Jenkins方式
	Launch agent via SSH												# 2.Jenkins通过SSH连接代理的方式, 需要安装SSH Build Agents插件
	
Availability															# 可用性, 控制 Jenkins 何时启动和停止此代理
	Keep this agent online as much as possible							# 1.尽可能让这个代理在线
	Bring this agent online according to a schedule						# 2.根据时间表使此代理在线
	Bring this agent online when in demand, and take offline when idle	# 3.需要时让此代理上线，空闲时下线
	
Node Properties															# Node属性
	Disable deferred wipeout on this node								# 1.在此节点上禁用延迟擦除
	Environment variables												# 2.可添加环境变量
	Tool Locations														# 3.工具位置
```

![image-20230530224505687](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230530224505687.png)

:::

::: details （1）Launch agent by connecting it to the controller（默认连接方式）：使用自定义镜像部署Jenkins Node节点：CentOS 7版

```bash
# 创建一个目录, 用于存放所有文件
mkdir jenkins_node_centos7 && cd jenkins_node_centos7

# 下载JDK 17
wget -c https://download.oracle.com/java/17/latest/jdk-17_linux-x64_bin.rpm

# 【根据实际情况调整】下载Jenkins Agent Jar
curl -sO http://192.168.48.132:8080/jnlpJars/agent.jar

# 【根据实际情况调整】编写启动脚本 entrypoint.sh
#!/usr/bin/env bash
set -o nounset
set -o errexit
set -o pipefail

java -jar agent.jar \
     -jnlpUrl ${JNLP_URL}/manage/computer/docker-build-centos7/jenkins-agent.jnlp \
     -secret ${JNLP_SECRET} \
     -workDir /data/jenkins
```

```bash
# 【根据实际情况调整】编写 Dockerfile
FROM centos:7

# 系统更新
RUN yum -y install epel-release && yum -y update

# 设置环境
WORKDIR /data
ENV JNLP_URL=http://jenkins-host:port
ENV JNLP_SECRET=secret

# 复制文件
COPY agent.jar secret.txt jdk-17_linux-x64_bin.rpm entrypoint.sh ./

# 安装JDK
RUN yum install -y jdk-17_linux-x64_bin.rpm

# 安装软件包
RUN yum install -y curl wget telnet vim && \
    yum install -y nodejs python3 go && \    
    yum clean all && \
    chmod 755 entrypoint.sh

# 设置JAVA_HOME
ENV JAVA_HOME=/usr/lib/jvm/jdk-17-oracle-x64
ENV PATH=$PATH:$JAVA_HOME/bin

ENTRYPOINT ["/data/entrypoint.sh"]
```

```bash
# 构建镜像
docker image build -t jenkins-node-centos7:v1.0.0 .

# 运行容器
docker container run --name jenkins_node_centos7 \
    -e JNLP_URL="http://192.168.48.132:8080" \
    -e JNLP_SECRET="b6ac03c5bb7c2738c08a5cd71143b9d5ce776a58a45fb4454edfe822e43f0303" \
    --cpus=1 \
    --memory=2g \
    --restart=always \
    -d \
  jenkins-node-centos7:v1.0.0
```

:::

::: details （2）Launch agent by connecting it to the controller（默认连接方式）：使用自定义镜像部署Jenkins Node节点：Ubuntu 22.04版

```bash
# 创建一个目录, 用于存放所有文件
mkdir jenkins_node_ubuntu22 && cd jenkins_node_ubuntu22

# 下载JDK 17
wget -c https://download.oracle.com/java/17/latest/jdk-17_linux-x64_bin.deb

# 【根据实际情况调整】下载Jenkins Agent Jar 和 生成密钥文件
curl -sO http://192.168.48.132:8080/jnlpJars/agent.jar

# 【根据实际情况调整】编写启动脚本 entrypoint.sh
#!/usr/bin/env bash
set -o nounset
set -o errexit
set -o pipefail

java -jar agent.jar \
     -jnlpUrl ${JNLP_URL}/manage/computer/docker-build-ubuntu22/jenkins-agent.jnlp \
     -secret ${JNLP_SECRET} \
     -workDir /data/jenkins
```

```bash
# 【根据实际情况调整】编写 Dockerfile
FROM ubuntu:22.04

# 系统更新
RUN apt update && apt -y upgrade

# 工作目录
WORKDIR /data

# 设置语言和小时制, 部分可选值:
#   en_GB.UTF-8 语言为英文, 时间是24小时制
#   en_US.UTF-8 语言为英文, 时间是12小时制
#   zh_CN.UTF-8 语言为中文, 时间是24小时制
# 两方面进行测试
#   date 命令查看结果是小时制是否正确
#   toush 中文.txt 是否可以正常创建
ENV LC_ALL=en_GB.UTF-8

# 设置Jenkins地址
ENV JNLP_URL=http://jenkins-host:port 
ENV JNLP_SECRET=secret

# 复制文件
COPY agent.jar secret.txt jdk-17_linux-x64_bin.deb entrypoint.sh ./

# 安装JDK
RUN apt --fix-broken install -y ./jdk-17_linux-x64_bin.deb

# 设置语言和时区及24小时制时间
RUN apt install -y locales && locale-gen $LC_ALL && \
    ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && echo Asia/Shanghai > /etc/timezone && \
    apt install -y tzdata

# 安装软件包
RUN apt install -y curl wget telnet vim && \
    apt install -y nodejs python3 golang && \
    apt clean && \
    ln -sf /usr/bin/bash /usr/bin/sh && \
    chmod 755 entrypoint.sh

# 设置JAVA_HOME
ENV JAVA_HOME=/usr/lib/jvm/jdk-17
ENV PATH=$PATH:$JAVA_HOME/bin

ENTRYPOINT ["/data/entrypoint.sh"]
```

```bash
# 构建镜像
docker image build -t jenkins-node-ubuntu22:v1.0.0 .

# 运行容器
docker container run --name jenkins_node_ubuntu22 \
    -e JNLP_URL="http://192.168.48.132:8080" \
    -e JNLP_SECRET="b6ac03c5bb7c2738c08a5cd71143b9d5ce776a58a45fb4454edfe822e43f0303" \
    --cpus=1 \
    --memory=2g \
    --restart=always \
    -d \
  jenkins-node-ubuntu22:v1.0.0
```

:::

::: details （3）Launch agent via SSH（SSH连接方式）：需要安装 SSH Build Agents 插件

```bash
# 在添加节点时指定主机、登录凭证等信息
# 在Node节点同样需要安装Java环境即可
```

:::

<br />

## 任务管理

### 任务类型

::: details （1）默认支持：Freestyle project（自由风格项目）

![image-20230602221554047](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230602221554047.png)

参数说明

```bash
General 									# 通用部分
Discard old builds							# 丢弃旧的构建, 可以按日期保留, 也可以按次数保留，两者可以同时使用, 任意一个达到要求后便会删除
This project is parameterized				# 参数化构建
Execute concurrent builds if necessary		# 允许并发构建, 默认情况下，一次只执行一个项目的单个构建
Restrict where this project can be run		# 指定在特定Node或一组Node上运行构建

Source Code Management 						# 源码管理, 需要安装对应的插件才能使用

Build Triggers 								# 构建触发器		
Trigger builds remotely (e.g., from scripts)# 远程触发构建
Build after other projects are built		# 在构建其他项目后构建
Build periodically							# 定期构建, 类似于Linux Crontab
Poll SCM									# 轮询SCM依次来确定是否要触发构建

Build Steps									# 构建步骤
Execute Windows batch command				# 执行Windows批处理脚本 .bat
Execute shell								# 执行Linux Shell脚本
Invoke top-level Maven targets				# 执行顶层Maven目标

Post-build Actions							# 构建后操作
Archive the artifacts						# 归档文件
Build other projects						# 执行其他构建
Record fingerprints of files to track usage	# 记录文件指纹以跟踪使用情况
```

:::

::: details （2）Pipeline 插件：Pipeline 流水线

参数说明

```bash
Do not allow concurrent builds										# 不允许并发构建
	Abort previous builds											# 勾选则代表触发新构建前终止当前正在执行的构建, 默认会进行等待
																	# 分析: 
																	# 1.默认情况下允许并发构建, 最大的并发由节点的参数进行控制
																	#   当达到最大并发数后, 构建将会等待
																	# 2.此选项则不允许进行并发构建
																	
Do not allow the pipeline to resume if the controller restarts		# Jenkins重启后不允许继续执行构建
                                                                    # 分析: 
                                                                    # 1.如果在构建过程中Jenkins重启了或关闭了, 等Jenkins启动好之后
                                                                    #   Pipeline会继续向后执行, 这可能会存在一些问题, 这里不研究
                                                                    # 2.此选项则不允许继续执行,而是直接终止Pipeline
                                                                    #   不会重新触发构建, 就是简单的终止

Pipeline speed/durability override									# 运行Pipeline时的默认持久性模式, 这里不研究
Preserve stashes from completed builds								# 新Pipeline可以使用旧Pipeline的数据? 这里不研究
This project is parameterized										# 参数化构建, UI比较丑
Throttle builds														# 这里不研究

Advanced Project Options											# 高级项目选项
	Display Name													# 显示名称, 这里只会修改显示名称, 比较好用, 
																	# 而如果直接修改项目名作为显示名称的话,那么可以看到浏览器中的URL也会修改
```

编写Pipeline script

```groovy
pipeline {
    agent {
        label 'docker-build-centos7'
    }
    
    stages {
        stage("准备") {
            steps {                
                echo "正在准备构建环境"
                sh "sleep 10"
            }
        }
        
        stage("构建") {
            steps {
                echo "正在执行编译操作"
                sh "sleep 10"
            }
        }
        
        stage("部署") {
            steps {
                echo "正在部署构建产物"
                sh "sleep 10"
            }
        }
    }
}
```

输出结果

![image-20230603221747673](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230603221747673.png)

![image-20230603221834012](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230603221834012.png)

:::

::: details （3）Pipeline 插件：Folder（文件夹）

创建一个或多个文件夹，对Pipeline进行分类管理

:::

<br />

## Pipeline

### 两种格式

::: details （1）Scripted Pipeline：脚本式流水线

```groovy
node('docker-build-centos7') {
    stage("准备") {
        echo "正在准备构建环境"
        sh "sleep 10"
    }
    
    stage("构建") {
        echo "正在执行编译操作"
        sh "sleep 10"
    }
    
    stage("部署") {
        echo "正在部署构建产物"
        sh "sleep 10"
    }
}
```

:::

::: details （2）Declarative Pipeline：声明式流水线，后面都以此方式为主

```groovy
pipeline {
    // agent 部分指定运行在哪个Node上
    // agent any：表示流水线可以在任意可用的节点上执行
    // agent none：表示流水线不在任何节点上执行
    // agent { label 'label_name' }：表示流水线将在具有指定标签的节点上执行
    agent {
        label 'docker-build-centos7'
    }
    
    // stages 是一组 stage 的集合
    // 每个stage定义了流水线中的一个阶段，可以包含一个或多个步骤（steps）
    // 每个步骤表示流水线中的一个单独任务，如构建代码、运行测试、部署应用等
    stages {
        stage("准备") {
            steps {                
                echo "正在准备构建环境"
                sh "sleep 10"
            }
        }
        
        stage("构建") {
            steps {
                echo "正在执行编译操作"
                sh "sleep 10"
            }
        }
        
        stage("部署") {
            steps {
                echo "正在部署构建产物"
                sh "sleep 10"
            }
        }
    }
}
```

:::

<br />

### 运行目标

::: details （1）同一条流水线中指定不同的stage运行在不同的Node上

```groovy
pipeline {
    agent none
    
    stages {
        stage("准备") {
            agent {
                label 'docker-build-centos7'
            }
            steps {
                echo "在 docker-build-centos7 节点上执行准备步骤"
                sh "sleep 10"
            }
        }
        
        stage("构建") {
            agent {
                label 'docker-build-ubuntu22'
            }
            steps {
                echo "在 docker-build-ubuntu22 节点上执行构建步骤"
                sh "sleep 10"
            }
        }
        
        stage("部署") {
            agent any
            steps {
                echo "在任意节点上执行部署步骤"
                sh "sleep 10"
            }
        }
    }
}
```

:::

::: details （2）在执行时动态启动一个容器作为Node执行，执行完成后销毁容器释放资源

:::

<br />

### 环境变量

<br />

### 使用参数

静态参数

动态参数

<br />

### 暂停确认

<br />

### 触发方式

<br />

## 认证和鉴权

