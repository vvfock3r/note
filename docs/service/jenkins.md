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

# 查看初始密码
[root@localhost ~]# docker container logs jenkins

# 浏览器访问: http://192.168.8.130:8080
```

:::

<br />

## 节点管理

