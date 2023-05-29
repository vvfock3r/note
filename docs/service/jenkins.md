# Jenkins

文档：[https://www.jenkins.io/doc](https://www.jenkins.io/doc)

Github：[https://github.com/jenkinsci/jenkins](https://github.com/jenkinsci/jenkins)

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

::: details 添加节点

![image-20230530071842289](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230530071842289.png)

```bash
# 基本配置
Name												# 名称
Description											# 描述信息
Number of executors									# 最大并发构建数, 建议设置和CPU核心数相同的数，内置节点建议设置为0以防止在本地执行构建
Remote root directory   							# 远程根目录, 实际上是Node的数据存储目录, 可以是一个任意目录
Labels												# 标签， 用于将多个代理分组到一个逻辑组中, 多个标签必须用空格分隔
Usage												# 用法, 1.尽量使用这个节点, 2.仅构建标签表达式与该节点匹配的作业
Launch method										# 启动方式
	Launch agent by connecting it to the controller #   使用代理连接Jenkins方式
	Launch agent via SSH							#   使用Jenkins通过SSH连接代理的方式
Availability										# 可用性, 控制 Jenkins 何时启动和停止此代理
	Keep this agent online as much as possible
	Bring this agent online according to a schedule
	Bring this agent online when in demand, and take offline when idle
Node Properties										# Node属性
Disable deferred wipeout on this node				# 
Environment variables								# 可添加环境变量
Tool Locations										# 
```



:::
