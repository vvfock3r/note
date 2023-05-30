# Jenkins

文档：[https://www.jenkins.io/doc](https://www.jenkins.io/doc)

Github：[https://github.com/jenkinsci/jenkins](https://github.com/jenkinsci/jenkins)

Java版本要求：[https://www.jenkins.io/doc/administration/requirements/java](https://www.jenkins.io/doc/administration/requirements/java)

<br />

## 安装

::: details Docker部署

文档：[https://www.jenkins.io/doc/book/installing/docker](https://www.jenkins.io/doc/book/installing/docker)

Docker Hub：[https://hub.docker.com/r/jenkins/jenkins](https://hub.docker.com/r/jenkins/jenkins)

```bash
# 创建Jenkins家目录
[root@localhost ~]#  mkdir -p /var/lib/jenkins_home
[root@localhost ~]#  chown -R 1000:1000 /var/lib/jenkins_home

# 启动容器
[root@localhost ~]#  docker container run --name jenkins \
    -p 8080:8080 \
    -p 50000:50000 \
    -v /var/lib/jenkins_home:/var/jenkins_home \
    -d \
    --restart=always \
  jenkins/jenkins:2.387.3-lts

# 查看初始密码: 方法1
[root@localhost ~]# docker container logs jenkins

# 查看初始密码: 方法2
[root@localhost ~]# cat /var/lib/jenkins_home/secrets/initialAdminPassword 
b1766bfdbc5848ae8e9b00a8258207a9

# 浏览器访问: http://192.168.8.130:8080
# 建议不要安装中文插件
```

:::

<br />

## 节点管理

::: details （1）添加节点

![image-20230530071842289](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230530071842289.png)

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
	Launch agent via SSH												# 2.使用Jenkins通过SSH连接代理的方式
	
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

::: details （2）使用自定义镜像部署Jenkins Node节点：CentOS 7版

```bash
# 创建一个目录, 用于存放所有文件
mkdir jenkins-node-centos7 && cd jenkins-node-centos7

# 下载JDK 17
wget -c https://download.oracle.com/java/17/latest/jdk-17_linux-x64_bin.rpm

# 根据Jenkins Node页面的信息下载Jenkins jar 和 生成密钥文件
curl -sO http://192.168.48.132:8080/jnlpJars/agent.jar
echo 32573065198c8cb2b05395514e99149021307d24c51099f757d51834613f2227 > secret.txt

# ------------------------------------------------------------------------
# 编写Dockerfile, 根据实际情况调整
FROM centos:7

# 设置环境
WORKDIR /data
ENV JNLP_URL="http://jenkins-host:port"

# 系统更新和安装软件包
RUN yum -y install epel-release && \
    yum -y update && \
    yum -y install curl wget telnet python3 go && \
    yum -y install jdk-17_linux-x64_bin.rpm && \
    yum clean all

# 设置JAVA_HOME
ENV JAVA_HOME="/path/to/jdk"

# 复制文件
COPY agent.jar secret.txt jdk-17_linux-x64_bin.rpm ./

ENTRYPOINT ["java"]
CMD ["-jar", "agent.jar", "-jnlpUrl", "$JNLP_URL/manage/computer/docker-build-centos7/jenkins-agent.jnlp", "-secret", "@secret.txt", "-workDir", "/data/jenkins"]

# ------------------------------------------------------------------------

# 构建镜像
docker image build -t jenkins-node-centos7:v1 .

# 运行容器
docker container run --name jenkins_node_centos7 \
    -e JNLP_URL="http://192.168.48.132:8080" \
    --cpus=2 \
    --memory=4g \
    --restart=always \
    -d \
  jenkins-node-centos7:v1
```

:::
