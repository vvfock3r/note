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

