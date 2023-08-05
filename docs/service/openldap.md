# OpenLDAP

官网：[https://www.openldap.org](https://www.openldap.org)

<br />

## LDAP简介

**1、LDAP协议概念**

LDAP（轻量级目录访问协议）是一个用于访问和维护分布式目录信息的开放性网络协议。它旨在提供一种统一的方法来访问不同类型的信息，例如用户、组织、设备等，存储在分布式目录服务中。LDAP广泛应用于企业和组织的身份验证、访问控制、联系信息管理等方面

**2、LDAP协议实现**

一些常见的实现LDAP协议的软件有：

- OpenLDAP: 开源的LDAP实现，支持多平台，并且功能丰富，是最为常见的LDAP服务器之一
- Microsoft Active Directory: Microsoft的LDAP实现，广泛应用于Windows环境下的企业网络
- Apache Directory Server: 基于Apache软件基金会的开源LDAP服务器实现，支持高性能和扩展性

**2、LDAP概念**



![image-20230804205644486](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230804205644486.png)

DC (Domain Component)

域组件，表示目录中的一个域名部分。例如，域名"example.com"可以分解为两个DC组件："dc=example, dc=com"

O (Organization)

组织，它用于表示组织或机构在目录中的名称。通常情况下，O用于表示高级组织或公司的名称，比如"Example Corp"或"ABC Corporation"。O是目录树的顶层节点，它用于标识整个组织的名称空间。在一个LDAP条目（Entry）中，O属性用于唯一地标识该条目所属的组织

OU (Organizational Unit)

组织单元，用于在目录中划分组织结构。OU可以包含其他OU或对象（如用户或组），形成层次结构。它类似于文件系统中的文件夹

CN (Common Name)

通用名称，用于标识目录中的具体对象，如用户、组等。在一个OU内，CN必须是唯一的，它类似于对象的姓名

UID (User Identifier)

用户标识符，是用于唯一标识用户的属性。在某些LDAP实现中，UID被用作用户的登录名

<br />

## 服务部署

::: details （1）Docker部署

Docker Hub：[https://hub.docker.com/r/bitnami/openldap](https://hub.docker.com/r/bitnami/openldap)

```bash
# 部署服务
# 1、默认的非加密端口是389(LDAP端口), 默认的加密端口是636(LDAPS端口)
# 2、bitnami容器中监听的是1389端口
[root@node-1 ~]# docker container run --name openldap \
    -e LDAP_PORT_NUMBER=1389 \
    -e LDAP_ROOT=dc=jinhui,dc=dev \
    -e LDAP_ADMIN_USERNAME=admin \
    -e LDAP_ADMIN_PASSWORD=123456 \
    -p 1389:1389 \
    -d \
  bitnami/openldap:2.6.6

# 进入容器
[root@node-1 ~]# docker container exec -it openldap bash

# 删除容器
[root@node-1 ~]# docker container rm -f openldap
```

:::

<br />

## 客户端工具

::: details 图形化界面 LDAP Admin

下载地址：[http://www.ldapadmin.org/download/index.html](http://www.ldapadmin.org/download/index.html)

1、连接

![image-20230805230401099](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230805230401099.png)

2、主界面

![image-20230805230511852](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230805230511852.png)

:::

::: details （1）内置命令行 ldapsearch

```bash
ldapsearch -x -H ldap://127.0.0.1:1389 
```

:::
