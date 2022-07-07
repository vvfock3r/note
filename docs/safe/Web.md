# 靶场搭建

## DVWA

Github：[https://github.com/digininja/DVWA](https://github.com/digininja/DVWA)

Damn Vulnerable Web Application (DVWA)(译注：可以直译为："该死的"不安全Web应用网站)，是一个编码糟糕的、易受攻击的 PHP/MySQL Web应用程序。 它的主要目的是帮助安全专业人员在合法的环境中，测试他们的技能和工具，帮助 Web 开发人员更好地了解如何增强 Web 应用程序的安全性，并帮助学生和教师在受控的课堂环境中，了解 Web 应用程序的安全。

DVWA的具体目标是通过简单明了的界面，来**演练一些最常见的 Web 漏洞**，这些漏洞具有**不同的难度级别**。 请注意，此软件**存在说明和未说明的漏洞**。 这是故意的。 我们鼓励您尝试并发现尽可能多的安全问题

<br />

**（1）使用Docker部署**

```bash
# 启动容器
[root@localhost ~]# docker container run --name dvwa -itd -p 8080:80 vulnerables/web-dvwa

# 查看容器
[root@localhost ~]# docker container ps
CONTAINER ID   IMAGE                  COMMAND      CREATED          STATUS          PORTS                                   NAMES
909d3a465861   vulnerables/web-dvwa   "/main.sh"   22 seconds ago   Up 21 seconds   0.0.0.0:8080->80/tcp, :::8080->80/tcp   dvwa

# 查看资源占用
[root@localhost ~]# docker stats --no-stream
CONTAINER ID   NAME      CPU %     MEM USAGE / LIMIT     MEM %     NET I/O      BLOCK I/O       PIDS
909d3a465861   dvwa      0.22%     108.8MiB / 1.934GiB   5.49%     1.1kB / 0B   156MB / 234MB   37
```

**（2）Web页面登录**

![image-20220707144151261](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220707144151261.png)

**（3）初始化数据库**

![image-20220707144256505](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220707144256505.png)

**（4）查看一下基本信息**

```bash
# 系统版本
[root@localhost ~]# docker exec -it dvwa cat /etc/os-release
PRETTY_NAME="Debian GNU/Linux 9 (stretch)"
NAME="Debian GNU/Linux"
VERSION_ID="9"
VERSION="9 (stretch)"
ID=debian
HOME_URL="https://www.debian.org/"
SUPPORT_URL="https://www.debian.org/support"
BUG_REPORT_URL="https://bugs.debian.org/"

# PHP版本
[root@localhost ~]# docker exec -it dvwa php --version
PHP 7.0.30-0+deb9u1 (cli) (built: Jun 14 2018 13:50:25) ( NTS )
Copyright (c) 1997-2017 The PHP Group
Zend Engine v3.0.0, Copyright (c) 1998-2017 Zend Technologies
    with Zend OPcache v7.0.30-0+deb9u1, Copyright (c) 1999-2017, by Zend Technologies

# MySQL版本
[root@localhost ~]# docker exec -it dvwa mysqld --version
mysqld  Ver 10.1.26-MariaDB-0+deb9u1 for debian-linux-gnu on x86_64 (Debian 9.1)
```

