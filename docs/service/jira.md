# Jira

<br />

## 版本说明

1、Jira Core：

- Jira Core是Jira的基础版本，主要用于项目管理和任务跟踪。
- 它提供了项目和问题跟踪的基本功能，适用于各种团队和部门，如市场营销、人力资源、财务等。

2、Jira Software：

- Jira Software是专为敏捷软件开发团队设计的版本，除了Jira Core的功能外，还提供了敏捷项目管理工具。
- 支持Scrum、Kanban和混合方法，有助于团队规划、迭代和发布高质量的软件。

3、Jira Service Management：

- Jira Service Management（之前称为Jira Service Desk）是专为IT服务管理和支持团队设计的版本。
- 它提供了Jira Core的基本功能，以及便捷的服务台功能，如自动化工作流、服务水平协议（SLA）跟踪和知识库管理，有助于提供高效的IT服务支持

<br />

## 服务部署

::: details （1）Docker部署 Jira Software

Docker hub：

* [https://hub.docker.com/r/atlassian/jira-core](https://hub.docker.com/r/atlassian/jira-core)
* [https://hub.docker.com/r/atlassian/jira-software](https://hub.docker.com/r/atlassian/jira-software)
* [https://hub.docker.com/r/atlassian/jira-servicemanagement](https://hub.docker.com/r/atlassian/jira-servicemanagement)

```bash
# 下载镜像
docker image pull atlassian/jira-software:9.5.1

# 创建数据目录
mkdir -p /var/atlassian/application-data/jira

# 启动容器
docker container run --name=jira \
        -v /var/atlassian/application-data/jira:/var/atlassian/application-data/jira \
        -p 12345:8080 \
        -e TZ=Asia/Shanghai \
        --memory=4g \
        --cpus=4.0 \
        -d \
        --restart=always \
    atlassian/jira-software:9.5.1
    
# 浏览器访问
# http://192.168.48.132:12345

# 删除 jira
docker container rm -f jira ; rm -rf /var/atlassian/application-data/jira/*
```

:::

::: details （2）浏览器中进行初始化设置

1、选择设置方式

![image-20230720211747483](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230720211747483.png)

2、选择数据库

![image-20230720212337019](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230720212337019.png)

3、设置应用属性

![image-20230720215203546](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230720215203546.png)

4、设置许可证（重点）

![image-20230720215801561](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230720215801561.png)

![image-20230720215948312](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230720215948312.png)

![image-20230720220029802](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230720220029802.png)

![image-20230720220243034](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230720220243034.png)

![image-20230720220334706](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230720220334706.png)

5、设置用户

![image-20230720220558217](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230720220558217.png)

6、后面按部就班的设置就好

![image-20230720221129049](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230720221129049.png)

:::



