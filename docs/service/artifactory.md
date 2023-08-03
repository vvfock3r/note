# JFrog Artifactory

官网：[https://jfrog.com/artifactory](https://jfrog.com/artifactory)

文档：[https://jfrog.com/help/r/jfrog-artifactory-documentation/jfrog-artifactory](https://jfrog.com/help/r/jfrog-artifactory-documentation/jfrog-artifactory)

API版本：

* v1版本（Artifactory < 6.6.0）：[https://jfrog.com/help/r/jfrog-rest-apis/artifactory-rest-apis](https://jfrog.com/help/r/jfrog-rest-apis/artifactory-rest-apis)
* v2版本（Artifactory >= 6.6.0）：[https://jfrog.com/help/r/jfrog-rest-apis/artifactory-rest-api-v2](https://jfrog.com/help/r/jfrog-rest-apis/artifactory-rest-api-v2)

<br />

## 服务说明

::: details （1）服务版本说明

注：没有找到官方的说明

* 社区版：Artifactory OSS，只支持Generic、Gradle、Helm、Ivy、Maven、SBT等6种仓库类型，但通常使用Generic类型仓库就够用
* 专业版：Artifactory Pro，很多API只有Pro版本才能调用
* 企业版？

:::

<br />

::: details （2）仓库类型说明

**仓库按照使用方式分类：**

* Local（本地仓库）

  本地仓库用于存储实际的制品文件（例如JAR、WAR、Docker镜像等）

* Remote（远程仓库）

  远程仓库用于代理其他远程仓库或中央仓库（例如Maven Central、PyPI、npm等）

  当你在构建或开发过程中需要某个依赖包，而Artifactory本地仓库中没有这个包时，

  Artifactory会通过远程仓库来获取这个包并将其缓存到本地仓库中

  这样，下次需要相同依赖包时，就可以直接从本地仓库获取，减少对外部仓库的依赖和提高构建速度

* Virtual（虚拟仓库）

  虚拟仓库是一种组合仓库，可以将多个本地仓库和远程仓库结合在一起，形成一个单一的访问点

  这使得你可以在构建或开发过程中使用一个虚拟仓库来访问多个仓库中的制品。虚拟仓库在构建工具或开发环境中配置

  当你需要某个制品时，请求会发送到虚拟仓库，它会根据配置从不同的本地和远程仓库中获取制品，并将其返回给请求方

<br />

**仓库按照使用功能分类：**

* Generic：通用仓库，用于存储任何类型的制品，可以通过HTTP或其他协议上传和下载文件。这是最灵活的仓库类型
* Maven：用于Java开发中的Maven项目。它支持Maven的特定目录结构和元数据，可以轻松地与Maven构建工具集成
* Gradle：用于Gradle构建工具的仓库类型，也用于Java项目
* Npm：用于Node.js开发的仓库类型，支持npm包管理器
* PyPI：用于Python开发的仓库类型，支持Python Package Index（PyPI）
* Docker：用于Docker容器镜像的仓库类型，支持Docker Hub和Docker客户端
* Helm：用于Kubernetes的Helm Chart仓库类型
* ...

:::

<br />

## 服务部署

下载地址：[https://jfrog.com/community/download-artifactory-oss](https://jfrog.com/community/download-artifactory-oss)

::: details 点击查看说明

```bash
# 下载镜像
docker image pull releases-docker.jfrog.io/jfrog/artifactory-oss:5.8.3

# 创建本地存储目录
[root@localhost ~]# mkdir -p /var/opt/jfrog/artifactory
[root@localhost ~]# chmod -R 777 /var/opt/jfrog/artifactory

# 启动容器
docker container run --name jfrog-oss \
    -p 8081:8081 \
    -p 8082:8082 \
    -v /var/opt/jfrog/artifactory:/var/opt/jfrog/artifactory \
    -d \
  releases-docker.jfrog.io/jfrog/artifactory-oss:5.8.3
  
# 浏览器访问
# http://192.168.8.150:8081
# 默认账号: admin/password
```

:::

<br />

## curl测试

::: details 点击查看说明

```bash
# 1、创建本地通用类型仓库, 这里创建一个名为demo的本地仓库, 不同版本的界面不太相同

# 2、上传文件
# 参数说明: -u 指定用户名密码, -T 指定本地文件, URL中可以指定在服务器中存储的文件名
curl -u admin:123456 -T monitor.zip "http://192.168.8.150:8081/artifactory/demo/monitor2.zip"
{
  "repo" : "demo",
  "path" : "/monitor2.zip",
  "created" : "2023-07-31T06:59:45.931Z",
  "createdBy" : "admin",
  "downloadUri" : "http://192.168.8.150:8081/artifactory/demo/monitor2.zip",
  "mimeType" : "application/zip",
  "size" : "2589129",
  "checksums" : {
    "sha1" : "19231532b0d7f69b8d0aabb8422c7c49c9a3103e",
    "md5" : "65307dcc3869cc26a77678646da99210",
    "sha256" : "de9213a8aa265ef5e0a34c1d2cd0b8bd20fed70ac6961fb89c43d20d8d7f7337"
  },
  "originalChecksums" : {
    "sha256" : "de9213a8aa265ef5e0a34c1d2cd0b8bd20fed70ac6961fb89c43d20d8d7f7337"
  },
  "uri" : "http://192.168.8.150:8081/artifactory/demo/monitor2.zip"
}

# 3、下载文件
curl -s -u admin:123456 -O "http://192.168.8.150:8081/artifactory/demo/monitor2.zip"

md5sum monitor*.zip
65307dcc3869cc26a77678646da99210  monitor2.zip
65307dcc3869cc26a77678646da99210  monitor.zip

# 4、如何创建目录?
# 无法直接创建空目录，但可以通过上传文件并指定目录结构来模拟创建目录
curl -u admin:123456 -T hr_tools.zip "http://192.168.8.150:8081/artifactory/demo/tools/hr_tools.zip"

# 5、如何删除文件?
curl -s -u admin:123456 -XDELETE "http://127.0.0.1:8081/artifactory/demo/monitor2.zip"
```

:::

<br />

## 基本配置

关闭匿名访问







