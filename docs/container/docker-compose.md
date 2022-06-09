## Docker Compose

文档：[https://docs.docker.com/compose/](https://docs.docker.com/compose/)

Github：[https://github.com/docker/compose](https://github.com/docker/compose)

<br />

Compose是一个用于定义和运行多容器Docker应用程序的工具



**版本问题**

* v1版本使用Python编写，v2版本使用Go编写
* 在v1中`docker-compose`是一个独立的命令，而在v2中`docker-compose`作为`docker cli`的一个插件，使用`docker compose`来执行命令



**使用Compose分为三个步骤**

1. 定义`Dockerfile`文件
2. 定义`docker-compose.yml`文件
3. 运行`docker compose up`

### Compose 安装

文档：[https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/)

```bash
# 安装方式1：yum安装（依赖docker-ce仓库）
[root@localhost ~]# yum install docker-compose-plugin
[root@localhost ~]# rpm -ql docker-compose-plugin
/usr/libexec/docker/cli-plugins/docker-compose		# 这个是二进制命令插件，其他的都是一些不重要的文件
/usr/share/doc/docker-compose-plugin
/usr/share/doc/docker-compose-plugin/LICENSE
/usr/share/doc/docker-compose-plugin/MAINTAINERS
/usr/share/doc/docker-compose-plugin/NOTICE
/usr/share/doc/docker-compose-plugin/README.md
/usr/share/licenses/docker-compose-plugin
/usr/share/licenses/docker-compose-plugin/LICENSE
/usr/share/licenses/docker-compose-plugin/NOTICE
[root@localhost ~]# docker compose version
Docker Compose version v2.5.0

# 安装方式2：直接下载二进制
[root@localhost ~]# curl -SL https://github.com/docker/compose/releases/download/v2.6.0/docker-compose-linux-x86_64 -o /usr/libexec/docker/cli-plugins/docker-compose
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0
100 24.7M  100 24.7M    0     0  5401k      0  0:00:04  0:00:04 --:--:-- 6701k
[root@localhost ~]# chmod 755 /usr/libexec/docker/cli-plugins/docker-compose
[root@localhost ~]# docker compose version
Docker Compose version v2.6.0

# -------------------------------------------------------------------------------------------------------------------
# 若以后要卸载的话可以利用此命令输出安装目录，然后直接删掉二进制文件即可
[root@localhost ~]# docker info --format '{{range .ClientInfo.Plugins}}{{if eq .Name "compose"}}{{.Path}}{{end}}{{end}}'
/usr/libexec/docker/cli-plugins/docker-compose
```

> 若`/usr/libexec/docker/cli-plugins/`不存在，可尝试其他目录：
>
> /usr/lib/docker/cli-plugins
>
> /usr/local/lib/docker/cli-plugins
>
> /usr/local/libexec/docker/cli-plugins



### Compose 示例

文档：[https://docs.docker.com/compose/gettingstarted/](https://docs.docker.com/compose/gettingstarted/)

根据官方文档写一个Demo

::: details （1）编写Python Web应用并生成Dockerfile

```bash
# (1) 创建compose目录
[root@localhost ~]# mkdir composetest
[root@localhost ~]# cd composetest

# (2) 编写一个Python Web App
[root@localhost composetest]# cat > app.py <<- EOF
import time

import redis
from flask import Flask

app = Flask(__name__)
cache = redis.Redis(host='redis', port=6379)

def get_hit_count():
    retries = 5
    while True:
        try:
            return cache.incr('hits')
        except redis.exceptions.ConnectionError as exc:
            if retries == 0:
                raise exc
            retries -= 1
            time.sleep(0.5)

@app.route('/')
def hello():
    count = get_hit_count()
    return 'Hello World! I have been seen {} times.\n'.format(count)
EOF

# (3) 生成Python依赖文件requirements.txt
cat > requirements.txt <<- EOF
flask
redis
EOF

# (4)编写Dockerfile
[root@localhost composetest]# cat > Dockerfile <<- EOF
# syntax=docker/dockerfile:1
FROM python:3.7-alpine
WORKDIR /code
ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0
RUN apk add --no-cache gcc musl-dev linux-headers
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
EXPOSE 5000
COPY . .
CMD ["flask", "run"]
EOF
```

:::

::: details （2）编写docker-compose.yml

```bash
[root@localhost composetest]# cat > docker-compose.yml <<- EOF
version: "3.9"
services:
  web:
    build: .
    ports:
      - "8000:5000"
  redis:
    image: "redis:alpine"
EOF
```

:::

::: details （3）创建并启动容器、测试

```bash
# 创建并启动容器（如果需要后台运行的话添加-d）
[root@localhost composetest]# docker compose up
```

![image-20220606074717146](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20220606074717146.png)

```bash
# 访问测试
[root@localhost composetest]# curl http://127.0.0.1:8000
Hello World! I have been seen 1 times.
[root@localhost composetest]# curl http://127.0.0.1:8000
Hello World! I have been seen 2 times.
[root@localhost composetest]# curl http://127.0.0.1:8000
Hello World! I have been seen 3 times.
```

:::

::: details （4）看看docker compose都做了什么

① 创建自定义bridge网络

```bash
# 创建了一个自定义bridge网络
[root@localhost ~]# docker network ls
NETWORK ID     NAME                  DRIVER    SCOPE
19913bc6a47d   bridge                bridge    local
84555a6bf36d   composetest_default   bridge    local	# 新创建的
23966f1794db   host                  host      local
7c080397ed19   none                  null      local

[root@localhost ~]# docker network inspect composetest_default
[
    {
        "Name": "composetest_default",
        "Id": "84555a6bf36d86e18388a5483ea6fbdad7934e931bac911b8897db46f3e0f316",
        "Created": "2022-06-06T07:45:57.113466348+08:00",
        "Scope": "local",
        "Driver": "bridge",		# 驱动为bridge
        "EnableIPv6": false,
        "IPAM": {
            "Driver": "default",
            "Options": null,
            "Config": [
                {
                    "Subnet": "172.22.0.0/16",
                    "Gateway": "172.22.0.1"
                }
            ]
        },
        "Internal": false,
        "Attachable": false,
        "Ingress": false,
        "ConfigFrom": {
            "Network": ""
        },
        "ConfigOnly": false,
        "Containers": {
            "42752a49fe75bd0468ecfa18a69acda981633a4e619f15381950751cb46f73d6": {
                "Name": "composetest-web-1",
                "EndpointID": "6dac42eb32ccb547254b6e371f776ad9172866b08d17f7ab19257d8f37d9fc98",
                "MacAddress": "02:42:ac:16:00:03",
                "IPv4Address": "172.22.0.3/16",
                "IPv6Address": ""
            },
            "b96e72d8d02e657f754fad40b5cdf4f5b11c06b4ad9851e119cdd99d9ca58204": {
                "Name": "composetest-redis-1",
                "EndpointID": "885d0dc3bc55881e854410c631c4e0a5cb76ad7add2ecea9b36f81009b3e09b2",
                "MacAddress": "02:42:ac:16:00:02",
                "IPv4Address": "172.22.0.2/16",
                "IPv6Address": ""
            }
        },
        "Options": {},
        "Labels": {
            "com.docker.compose.network": "default",
            "com.docker.compose.project": "composetest",
            "com.docker.compose.version": "2.5.0"
        }
    }
]
```

② 创建对应的容器

![image-20220606075707139](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20220606075707139.png)



③ 容器通信方式

看一下我们的Python代码，`cache = redis.Redis(host='redis', port=6379)`，我们发现：

* 很显然这是通过内置的`DNS`来通信的

* 使用的自定义的`bridge`网络，满足使用`DNS`通信要求

* `redis`与容器名称并不一致，怀疑是通过网络别名来通信，来验证一下

  ![image-20220606080914974](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20220606080914974.png)

  ![image-20220606081942898](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20220606081942898.png)

  ![image-20220606082226087](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20220606082226087.png)

:::

### Compose 常用命令

| 命令                            | 说明                                                         |
| ------------------------------- | ------------------------------------------------------------ |
| `docker compose up [-d]`        | 创建并启动容器                                               |
| `docker compose down [-v]`      | 停止并删除容器和删除网桥，默认不会删除匿名或命名数据卷（除非使用`-v`参数） |
| `-------------------------`     | `----------------------------------------------------------------` |
| `docker compose create`         | 创建容器                                                     |
| `docker compose start`          | 启动容器                                                     |
| `docker compose stop`           | 停止容器                                                     |
| `docker compose restart`        | 重启容器                                                     |
| `docker compose rm`             | 删除已经停止的容器                                           |
| `-------------------------`     | `----------------------------------------------------------------` |
| `docker compose ls [-a]`        | 查看当前`Compose`项目信息                                    |
| `docker compose ps`             | 查看当前`Compose`项目所运行的容器                            |
| `docker compose logs`           | 查看所有容器的日志                                           |
| `-------------------------`     | `----------------------------------------------------------------` |
| `docker compose -f compose文件` | 指定`compose`文件（默认会使用当前目录内的`docker-compose.yml`）<br />若找不到`compose`文件会报错`no configuration file provided: not found`<br />并不是所有的命令都需要用这个文件，比如up/down需要用，ls/version等就不需要用这个文件 |
| `docker compose -p 项目名`      | 指定项目名（默认为目录名），项目名会作为诸如**网桥名称、容器名称等的一部分** |

### Compose file

文档：[https://docs.docker.com/compose/compose-file/compose-file-v3/](https://docs.docker.com/compose/compose-file/compose-file-v3/)

#### （01）编写一个简单的Demo

`Version`字段文档：[https://docs.docker.com/compose/compose-file/compose-versioning/](https://docs.docker.com/compose/compose-file/compose-versioning/)

`service`：每一个`service`可以简单理解成对一个容器的封装，在上面我们有`web`、`mysql`、`redis`3个service，即3个容器

`image`：指定镜像及版本

```bash
# 创建一个项目demo
[root@localhost ~]# mkdir demo
[root@localhost ~]# cd demo/

# 创建docker-compose.yml
[root@localhost demo]# cat > docker-compose.yml <<- EOF
version: "3"
services:        
  web:
    image: nginx:1.21.3
  mysql:
    image: mysql:8.0.29
  redis:
    image: redis:7.0.0
EOF

# 创建并启动容器
[root@localhost demo]# docker compose up -d
[+] Running 4/4
 ⠿ Network demo_default    Created					0.1s
 ⠿ Container demo-web-1    Started					0.6s                                                                         
 ⠿ Container demo-mysql-1  Started					0.7s                                                                         
 ⠿ Container demo-redis-1  Started					0.8s
 
 # 通过ls查看所有项目的基本信息，在这里我们只有一个项目叫做demo（ls命令不需要使用到docker-compose.yml配置文件，在任意路径运行都可以）
[root@localhost demo]# docker compose ls 
NAME                STATUS              CONFIG FILES
demo                running(2)          /root/demo/docker-compose.yml

# 通过-a选项列出更详细的信息，可以看到有一个容器退出了
[root@localhost demo]# docker compose ls -a
NAME                STATUS                  CONFIG FILES
demo                exited(1), running(2)   /root/demo/docker-compose.yml

# 通过ps子命令查看当前项目都有哪些容器
[root@localhost demo]# docker compose ps 
NAME                COMMAND                  SERVICE             STATUS              PORTS
demo-mysql-1        "docker-entrypoint.s…"   mysql               exited (1)          
demo-redis-1        "docker-entrypoint.s…"   redis               running             6379/tcp
demo-web-1          "/docker-entrypoint.…"   web                 running             80/tcp

# logs子命令查看日志，可以看到MySQL退出的原因是：容器需要指定3个变量中的任意一个
[root@localhost demo]# docker compose logs
demo-mysql-1  | 2022-06-06 08:46:07+00:00 [Note] [Entrypoint]: Entrypoint script for MySQL Server 8.0.29-1debian10 started.
demo-mysql-1  | 2022-06-06 08:46:07+00:00 [Note] [Entrypoint]: Switching to dedicated user 'mysql'
demo-mysql-1  | 2022-06-06 08:46:07+00:00 [Note] [Entrypoint]: Entrypoint script for MySQL Server 8.0.29-1debian10 started.
demo-mysql-1  | 2022-06-06 08:46:07+00:00 [ERROR] [Entrypoint]: Database is uninitialized and password option is not specified
demo-mysql-1  |     You need to specify one of the following:
demo-mysql-1  |     - MYSQL_ROOT_PASSWORD
demo-mysql-1  |     - MYSQL_ALLOW_EMPTY_PASSWORD
demo-mysql-1  |     - MYSQL_RANDOM_ROOT_PASSWORD
demo-redis-1  | 1:C 06 Jun 2022 08:46:07.605 # oO0OoO0OoO0Oo Redis is starting oO0OoO0OoO0Oo
demo-redis-1  | 1:C 06 Jun 2022 08:46:07.605 # Redis version=7.0.0, bits=64, commit=00000000, modified=0, pid=1, just started
demo-redis-1  | 1:C 06 Jun 2022 08:46:07.605 # Warning: no config file specified, using the default config. In order to specify a config file use redis-server /path/to/redis.conf
demo-redis-1  | 1:M 06 Jun 2022 08:46:07.606 * monotonic clock: POSIX clock_gettime
demo-redis-1  | 1:M 06 Jun 2022 08:46:07.606 * Running mode=standalone, port=6379.
demo-redis-1  | 1:M 06 Jun 2022 08:46:07.606 # WARNING: The TCP backlog setting of 511 cannot be enforced because /proc/sys/net/core/somaxconn is set to the lower value of 128.
demo-redis-1  | 1:M 06 Jun 2022 08:46:07.606 # Server initialized
demo-redis-1  | 1:M 06 Jun 2022 08:46:07.606 # WARNING overcommit_memory is set to 0! Background save may fail under low memory condition. To fix this issue add 'vm.overcommit_memory = 1' to /etc/sysctl.conf and then reboot or run the command 'sysctl vm.overcommit_memory=1' for this to take effect.
demo-redis-1  | 1:M 06 Jun 2022 08:46:07.607 * The AOF directory appendonlydir doesn't exist
demo-redis-1  | 1:M 06 Jun 2022 08:46:07.607 * Ready to accept connections
demo-web-1    | /docker-entrypoint.sh: /docker-entrypoint.d/ is not empty, will attempt to perform configuration
demo-web-1    | /docker-entrypoint.sh: Looking for shell scripts in /docker-entrypoint.d/
demo-web-1    | /docker-entrypoint.sh: Launching /docker-entrypoint.d/10-listen-on-ipv6-by-default.sh
demo-web-1    | 10-listen-on-ipv6-by-default.sh: info: Getting the checksum of /etc/nginx/conf.d/default.conf
demo-web-1    | 2022/06/06 08:46:07 [notice] 1#1: using the "epoll" event method
demo-web-1    | 2022/06/06 08:46:07 [notice] 1#1: nginx/1.21.3
demo-web-1    | 2022/06/06 08:46:07 [notice] 1#1: built by gcc 8.3.0 (Debian 8.3.0-6) 
demo-web-1    | 2022/06/06 08:46:07 [notice] 1#1: OS: Linux 4.18.0-348.7.1.el8_5.x86_64
demo-web-1    | 2022/06/06 08:46:07 [notice] 1#1: getrlimit(RLIMIT_NOFILE): 1048576:1048576
demo-web-1    | 2022/06/06 08:46:07 [notice] 1#1: start worker processes
demo-web-1    | 2022/06/06 08:46:07 [notice] 1#1: start worker process 30
demo-web-1    | 2022/06/06 08:46:07 [notice] 1#1: start worker process 31
demo-web-1    | 10-listen-on-ipv6-by-default.sh: info: Enabled listen on IPv6 in /etc/nginx/conf.d/default.conf
demo-web-1    | /docker-entrypoint.sh: Launching /docker-entrypoint.d/20-envsubst-on-templates.sh
demo-web-1    | /docker-entrypoint.sh: Launching /docker-entrypoint.d/30-tune-worker-processes.sh
demo-web-1    | /docker-entrypoint.sh: Configuration complete; ready for start up
```



#### （02）convert/config 查看当前配置

```bash
# 下面两个输出是一样的
[root@localhost demo]# docker compose config --help

Usage:  docker compose convert SERVICES

Converts the compose file to platform's canonical format

Aliases:
  convert, config		# convert和config是一样的命令

Options:
      --format string           Format the output. Values: [yaml | json] (default "yaml")
      --hash string             Print the service config hash, one per line.
      --images                  Print the image names, one per line.
      --no-interpolate          Don't interpolate environment variables.
      --no-normalize            Don't normalize compose model.
  -o, --output string           Save to file (default to stdout)
      --profiles                Print the profile names, one per line.
  -q, --quiet                   Only validate the configuration, don't print anything.
      --resolve-image-digests   Pin image tags to digests.
      --services                Print the service names, one per line.
      --volumes                 Print the volume names, one per line.
      
[root@localhost demo]# docker compose config
name: demo
services:
  mysql:
    image: mysql:8.0.29
    networks:
      default: null
  redis:
    image: redis:7.0.0
    networks:
      default: null
  web:
    image: nginx:1.21.3
    networks:
      default: null
networks:
  default:
    name: demo_default
```

#### （03）指定环境变量

文档：[https://docs.docker.com/compose/environment-variables/](https://docs.docker.com/compose/environment-variables/)

环境变量可以分为两类：

* 一类是给`docker compose`工具使用的
* 另一类是给容器使用的，只在容器内生效

::: details （1）Compose环境变量：使用.env文件

默认情况下会使用`.env`文件，如果是其他的文件名可以通过`docker compose --env-file .env.dev`来指定文件

```bash
# 查看docker-compose.yml文件
[root@localhost demo]# cat docker-compose.yml 
version: "3"
services:        
  web:
    image: nginx:${NginxVersion}
  mysql:
    image: mysql:8.0.29
  redis:
    image: redis:7.0.0

# 启动会报错，NginxVersion变量未设置
[root@localhost demo]# docker compose up
WARN[0000] The "NginxVersion" variable is not set. Defaulting to a blank string. 
Error response from daemon: no such image: nginx:: invalid reference format

# 设置.env文件
[root@localhost demo]# cat > .env <<- EOF
NginxVersion=1.21.6
EOF

# 再次启动
[root@localhost demo]# docker compose up -d
[+] Running 3/3
 ⠿ Container demo-redis-1  Started					0.6s                                                                        
 ⠿ Container demo-web-1    Started					0.6s                                                                        
 ⠿ Container demo-mysql-1  Started					0.6s
 
# 查看镜像版本
[root@localhost demo]# docker container inspect demo-web-1 | grep -i image
        "Image": "sha256:fa5269854a5e615e51a72b17ad3fd1e01268f278a6684c8ed3c5f0cdce3f230b",
            "Image": "nginx:1.21.6",
                "com.docker.compose.image": "sha256:fa5269854a5e615e51a72b17ad3fd1e01268f278a6684c8ed3c5f0cdce3f230b",  
```

:::

::: details （2）Compose环境变量：使用Shell环境变量（优先级比env文件高）

```bash
# 先看一下当前的情况，因为有.env文件存在，所以启动没问题
[root@localhost demo]# ls -la
total 16
drwxr-xr-x   2 root root 4096 Jun  7 16:12 .
dr-xr-x---. 12 root root 4096 Jun  7 16:07 ..
-rw-r--r--   1 root root  136 Jun  7 15:51 docker-compose.yml
-rw-r--r--   1 root root   20 Jun  7 16:09 .env

[root@localhost demo]# cat docker-compose.yml 
version: "3"
services:        
  web:
    image: nginx:${NginxVersion}
  mysql:
    image: mysql:8.0.29
  redis:
    image: redis:7.0.0

[root@localhost demo]# cat .env 
NginxVersion=1.21.6

# 这时可以设置Shell环境变量，优先级比.env文件要高
[root@localhost demo]# export NginxVersion=1.21.5

# 启动
[root@localhost demo]# docker compose up -d
[+] Running 7/7
 ⠿ web Pulled
   ⠿ a2abf6c4d29d Pull complete 					3.7s
   ⠿ a9edb18cadd1 Pull complete 					1.8s
   ⠿ 589b7251471a Pull complete						2.5s
   ⠿ 186b1aaa4aa6 Pull complete						2.6s
   ⠿ b4df32aa5a72 Pull complete 					2.7s
   ⠿ a0bcbecc962e Pull complete						2.8s
[+] Running 4/4
 ⠿ Network demo_default    Created					0.1s
 ⠿ Container demo-mysql-1  Started    				0.9s                                                                         
 ⠿ Container demo-redis-1  Started      			0.9s                                                                        
 ⠿ Container demo-web-1    Started        			0.8s                                                                         
 
# 查看镜像版本 
[root@localhost demo]# docker container inspect demo-web-1 | grep -i image
        "Image": "sha256:605c77e624ddb75e6110f997c58876baa13f8754486b461117934b24a9dc3a85",
            "Image": "nginx:1.21.5",

# 后续测试
# 即使显示指定变量文件，docker compose --env-file .env up -d，也没有Shell环境变量优先级高
```

:::

::: details （3）容器环境变量：使用environment（解决MySQL启动失败的问题）

若要传递变量给容器使用，需要使用`environment`

```bash
# 看一下docker-compose.yml文件，给mysql容器定义了一个变量 MYSQL_ROOT_PASSWORD
[root@localhost demo]# cat docker-compose.yml
version: "3"
services:        
  web:
    image: nginx:1.21.6
  mysql:
    image: mysql:8.0.29
    environment:
        MYSQL_ROOT_PASSWORD: "qaz.123="
  redis:
    image: redis:7.0.0

# 启动
[root@localhost demo]# docker compose up -d
[+] Running 4/4
 ⠿ Network demo_default    Created				0.1s                                                                             
 ⠿ Container demo-mysql-1  Started           	0.7s                                                                             
 ⠿ Container demo-redis-1  Started             	0.7s                                                                             
 ⠿ Container demo-web-1    Started            	0.8s                                                                             
 
# mysql容器不再退出了
[root@localhost demo]# docker compose ps
NAME                COMMAND                  SERVICE             STATUS              PORTS
demo-mysql-1        "docker-entrypoint.s…"   mysql               running             33060/tcp
demo-redis-1        "docker-entrypoint.s…"   redis               running             6379/tcp
demo-web-1          "/docker-entrypoint.…"   web                 running             80/tcp

# 看一下mysql容器的ip
[root@localhost demo]# docker container inspect demo-mysql-1 | grep -i IPAddress
            "SecondaryIPAddresses": null,
            "IPAddress": "",
                    "IPAddress": "172.18.0.3",

# 连一下
[root@localhost demo]# mysql -h172.18.0.3 -P3306 -uroot -p"qaz.123=" -e "status;"
mysql: [Warning] Using a password on the command line interface can be insecure.
--------------
mysql  Ver 14.14 Distrib 5.7.38, for Linux (x86_64) using  EditLine wrapper

Connection id:          15
Current database:
Current user:           root@172.18.0.1
SSL:                    Cipher in use is ECDHE-RSA-AES128-GCM-SHA256
Current pager:          stdout
Using outfile:          ''
Using delimiter:        ;
Server version:         8.0.29 MySQL Community Server - GPL
Protocol version:       10
Connection:             172.18.0.3 via TCP/IP
Server characterset:    utf8mb4
Db     characterset:    utf8mb4
Client characterset:    utf8mb3
Conn.  characterset:    utf8mb3
TCP port:               3306
Uptime:                 36 min 20 sec

Threads: 2  Questions: 22  Slow queries: 0  Opens: 135  Flush tables: 3  Open tables: 54  Queries per second avg: 0.010
--------------

# 进到容器里看一下变量
[root@localhost demo]# docker container exec -it demo-mysql-1 sh 
# echo ${MYSQL_ROOT_PASSWORD}
qaz.123=
```

:::

#### （04）build 构建镜像

文档1：[https://docs.docker.com/compose/compose-file/compose-file-v3/#build](https://docs.docker.com/compose/compose-file/compose-file-v3/#build)

文档2：[https://docs.docker.com/compose/compose-file/build/](https://docs.docker.com/compose/compose-file/build/)

我们可以通过`image`来指定一个镜像启动容器，也可以通过`build`来构建一个镜像并启动容器

::: details （1）自动构建镜像示例

```bash
[root@localhost demo]# cat Dockerfile
FROM centos:7
MAINTAINER VVFock3r
WORKDIR /
CMD while [ true ]; do echo $(date +"%Y-%m-%d %H:%M:%S"); sleep 1; done

[root@localhost demo]# cat docker-compose.yml
version: "3"
services:        
  server:
    build: .

[root@localhost demo]# docker compose up
[+] Running 2/2
 ⠿ Network demo_default     Created					0.1s
 ⠿ Container demo-server-1  Created					0.1s
Attaching to demo-server-1
demo-server-1  | 2022-06-07 09:56:27
demo-server-1  | 2022-06-07 09:56:28
demo-server-1  | 2022-06-07 09:56:29

# ---------------------------------------------------------------
# 看一下生成的镜像，项目名_service名:latest（省略无关的输出）
[root@localhost demo]# docker image ls
REPOSITORY    TAG             IMAGE ID       CREATED          SIZE
demo_server   latest          c5913ee10173   8 months ago     204MB

# 看一下镜像详情
[root@localhost demo]# docker image inspect demo_server | grep -i -A 3 CMD
            "Cmd": null,
            "Image": "",
            "Volumes": null,
            "WorkingDir": "",
--
            "Cmd": [
                "/bin/sh",
                "-c",
                "while [ true ]; do echo $(date +\"%Y-%m-%d %H:%M:%S\"); sleep 1; done"
```

:::

::: details （2）修改Dockerfile，因为默认情况下，镜像名和Tag没有变动，所以依旧是老的镜像，新修改的Dockerfile并没有生效

```bash
# 将Dockerfile中sleep 1改为2
[root@localhost demo]# cat Dockerfile 
FROM centos:7
MAINTAINER VVFock3r
WORKDIR /
CMD while [ true ]; do echo $(date +"%Y-%m-%d %H:%M:%S"); sleep 2; done

# 删除容器（看输出镜像并没有删除）
root@localhost demo]# docker compose down
[+] Running 2/0
 ⠿ Container demo-server-1  Removed      0.0s                                                                                  
 ⠿ Network demo_default     Removed		0.0s
 
# 此时再重新启动，可以看到还是老的镜像
[root@localhost demo]# docker compose up
[+] Running 2/2
 ⠿ Network demo_default     Created					0.1s                                                                         
 ⠿ Container demo-server-1  Created					0.1s                                                                         
Attaching to demo-server-1
demo-server-1  | 2022-06-07 10:09:41
demo-server-1  | 2022-06-07 10:09:42
demo-server-1  | 2022-06-07 10:09:43

# ---------------------------------------------------------------
# 解决办法1：删除容器的同时删除镜像
# docker compose down --rmi <local | all>
#   local：移除service所依赖的镜像（没有自定义tag的那种，不包括image指定的镜像，因为并没有自定义tag）
#   all: 移除service所依赖的镜像（所有镜像，包括使用image指定的镜像）
[root@localhost demo]# docker compose down --rmi local

# 解决办法2：给新构建的镜像指定一个名字和tag，每次都要修改一下docker-compose.yml，使用不同的名字或tag
[root@localhost demo]# cat docker-compose.yml 
version: "3"
services:        
  server:
    build: .
    image: demo_server:v2
    
# 解决办法3: 每次启动前先手动构建镜像（若镜像存在也会重新构建）
[root@localhost demo]# docker compose build && docker compose up
```

:::

#### （05）指定容器名称

```bash
[root@localhost demo]# cat docker-compose.yml 
version: "3"
services:        
  web:
    image: nginx:1.21.6
    container_name: my_web  # 自定义容器名称
  mysql:
    image: mysql:8.0.29
    environment:
        MYSQL_ROOT_PASSWORD: "qaz.123="    
    container_name: my_mysql  # 自定义容器名称
  redis:
    image: redis:7.0.0

[root@localhost demo]# docker compose up -d
[+] Running 4/4
 ⠿ Network demo_default    Created					0.1s                                                                         
 ⠿ Container my_web        Started					0.7s  # 自定义容器名称
 ⠿ Container my_mysql      Started					0.8s  # 自定义容器名称
 ⠿ Container demo-redis-1  Started					0.8s  # 默认容器名称
```

#### （06）指定重启策略

文档：[https://docs.docker.com/compose/compose-file/compose-file-v3/#restart](https://docs.docker.com/compose/compose-file/compose-file-v3/#restart)

```bash
[root@localhost demo]# cat docker-compose.yml 
version: "3"
services:        
  web:
    image: nginx:1.21.6
    restart: always
  mysql:
    image: mysql:8.0.29
    environment:
        MYSQL_ROOT_PASSWORD: "qaz.123="
    restart: always
  redis:
    image: redis:7.0.0

[root@localhost demo]# docker compose up -d
[+] Running 4/4
 ⠿ Network demo_default    Created					0.1s                                                                         
 ⠿ Container demo-redis-1  Started					0.7s                                                                         
 ⠿ Container demo-web-1    Started					0.5s                                                                         
 ⠿ Container demo-mysql-1  Started					0.6s 
 
[root@localhost demo]# docker container inspect demo-mysql-1 | grep -i -A 3 RestartPolicy
            "RestartPolicy": {
                "Name": "always",
                "MaximumRetryCount": 0
            },
[root@localhost demo]# docker container inspect demo-redis-1 | grep -i -A 3 RestartPolicy
            "RestartPolicy": {
                "Name": "",
                "MaximumRetryCount": 0
            },
```

#### （07）指定端口映射

```bash
# MySQL容器3306端口映射到宿主机3307端口
[root@localhost demo]# cat docker-compose.yml 
version: "3"
services:        
  web:
    image: nginx:1.21.6
  mysql:
    image: mysql:8.0.29
    environment:
        MYSQL_ROOT_PASSWORD: "qaz.123="
    ports:
      - '3307:3306'
  redis:
    image: redis:7.0.0

# 连接测试
[root@localhost demo]# mysql -h127.0.0.1 -uroot -P3307 -pqaz.123= -e "status"
mysql: [Warning] Using a password on the command line interface can be insecure.
--------------
mysql  Ver 14.14 Distrib 5.7.38, for Linux (x86_64) using  EditLine wrapper

Connection id:          9
Current database:
Current user:           root@192.168.128.1
SSL:                    Cipher in use is ECDHE-RSA-AES128-GCM-SHA256
Current pager:          stdout
Using outfile:          ''
Using delimiter:        ;
Server version:         8.0.29 MySQL Community Server - GPL
Protocol version:       10
Connection:             127.0.0.1 via TCP/IP
Server characterset:    utf8mb4
Db     characterset:    utf8mb4
Client characterset:    utf8mb3
Conn.  characterset:    utf8mb3
TCP port:               3307
Uptime:                 19 sec

Threads: 2  Questions: 10  Slow queries: 0  Opens: 117  Flush tables: 3  Open tables: 36  Queries per second avg: 0.526
--------------
```

#### （08）覆盖Dockerfile CMD指令

文档：[https://docs.docker.com/compose/compose-file/#command](https://docs.docker.com/compose/compose-file/#command)

```bash
[root@localhost demo]# cat docker-compose.yml 
version: "3"
services:        
  server:
    image: centos:7
    command: sh -c "while [ true ]; do echo $$(date +'%Y-%m-%d %H:%M:%S'); sleep 1; done"
[root@localhost demo]# docker compose up
[+] Running 1/0
 ⠿ Container demo-server-1  Created					0.0s                                                                         
Attaching to demo-server-1
demo-server-1  | 2022-06-07 23:28:39
demo-server-1  | 2022-06-07 23:28:40
demo-server-1  | 2022-06-07 23:28:41
```

#### （09）✨网络配置

文档：[https://docs.docker.com/compose/compose-file/#networks-top-level-element](https://docs.docker.com/compose/compose-file/#networks-top-level-element)

::: details (1) 基础配置

```bash
[root@localhost demo]# cat docker-compose.yml 
version: "3"
services:        
  server:
    image: centos:7
    command: sh -c "while [ true ]; do echo $$(date +'%Y-%m-%d %H:%M:%S'); sleep 1; done"
    # networks指定网络, 可以指定多个
    networks:
      - mynet1
      - mynet2

# networks字段用于配置网络, 这里的意思是: 定义两个网桥mynet1和mynet2
networks:
  mynet1:
  mynet2:

[root@localhost demo]# docker compose up
[+] Running 3/3
 ⠿ Network demo_mynet1      Created					0.1s                                                                         
 ⠿ Network demo_mynet2      Created					0.1s                                                                         
 ⠿ Container demo-server-1  Created					0.1s                                                                         
Attaching to demo-server-1
demo-server-1  | 2022-06-07 23:45:29
demo-server-1  | 2022-06-07 23:45:30
demo-server-1  | 2022-06-07 23:45:31
demo-server-1  | 2022-06-07 23:45:32
demo-server-1  | 2022-06-07 23:45:33
demo-server-1  | 2022-06-07 23:45:34
demo-server-1  | 2022-06-07 23:45:35
# ----------------------------------------------------------------------------------------
# 查看网桥，发现多了2个
[root@localhost ~]# docker network ls
NETWORK ID     NAME          DRIVER    SCOPE
19913bc6a47d   bridge        bridge    local
306e0d885afa   demo_mynet1   bridge    local
161f1c81b416   demo_mynet2   bridge    local
23966f1794db   host          host      local
7c080397ed19   none          null      local

# 查看容器所属网络
[root@localhost ~]# docker container inspect demo-server-1 | sed -n "/Networks/, $"p
            "Networks": {
                "demo_mynet1": {
                    "IPAMConfig": null,
                    "Links": null,
                    "Aliases": [
                        "demo-server-1",
                        "server",
                        "28e838d4c57d"
                    ],
                    "NetworkID": "b53d7bc6fb8cde3a829a288772a47d6e43a0e03406563d0f2b027f95b60ed4e7",
                    "EndpointID": "d9ad37dafa79c583a00ad5aa26a1191e60a245809fba9ca37af890b7699cd92c",
                    "Gateway": "172.19.0.1",
                    "IPAddress": "172.19.0.2",
                    "IPPrefixLen": 16,
                    "IPv6Gateway": "",
                    "GlobalIPv6Address": "",
                    "GlobalIPv6PrefixLen": 0,
                    "MacAddress": "02:42:ac:13:00:02",
                    "DriverOpts": null
                },
                "demo_mynet2": {
                    "IPAMConfig": null,
                    "Links": null,
                    "Aliases": [
                        "demo-server-1",
                        "server",
                        "28e838d4c57d"
                    ],
                    "NetworkID": "3a58974c7b413b0891cac1d2f84802e68ac609de78da1197bc3af3895a824991",
                    "EndpointID": "30f5ba375cf5a0b6a482049c4723c04524f86aa759a5ec9856a853e06658c44c",
                    "Gateway": "172.20.0.1",
                    "IPAddress": "172.20.0.2",
                    "IPPrefixLen": 16,
                    "IPv6Gateway": "",
                    "GlobalIPv6Address": "",
                    "GlobalIPv6PrefixLen": 0,
                    "MacAddress": "02:42:ac:14:00:02",
                    "DriverOpts": null
                }
            }
        }
    }
]

# 查看容器的IP
[root@localhost ~]# docker container exec -it demo-server-1 bash -c "yum -y install net-tools iproute && ip a"
Loaded plugins: fastestmirror, ovl
Loading mirror speeds from cached hostfile
 * base: mirrors.aliyun.com
 * extras: centos.nethub.com.hk
 * updates: centos.nethub.com.hk
Package net-tools-2.0-0.25.20131004git.el7.x86_64 already installed and latest version
Package iproute-4.11.0-30.el7.x86_64 already installed and latest version
Nothing to do
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
630: eth0@if631: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default 
    link/ether 02:42:ac:13:00:02 brd ff:ff:ff:ff:ff:ff link-netnsid 0
    inet 172.19.0.2/16 brd 172.19.255.255 scope global eth0
       valid_lft forever preferred_lft forever
632: eth1@if633: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default 
    link/ether 02:42:ac:14:00:02 brd ff:ff:ff:ff:ff:ff link-netnsid 0
    inet 172.20.0.2/16 brd 172.20.255.255 scope global eth1
       valid_lft forever preferred_lft forever
```

:::

::: details (2) 指定为外部网络，则Compose不会主动创建该网络

```bash
[root@localhost demo]# cat docker-compose.yml 
version: "3"
services:        
  server:
    image: centos:7
    command: sh -c "while [ true ]; do echo $$(date +'%Y-%m-%d %H:%M:%S'); sleep 1; done"
    networks:
      - mynet1
      - mynet2

networks:
  mynet1:
  mynet2: 
    # 定义为外部网络，compose不会主动创建，若找不到mynet2网桥则会报错
    external: true

# 因为该网桥尚未创建，所以启动时报错未找到
[root@localhost demo]# docker compose up
[+] Running 1/0
 ⠿ Network demo_mynet1  Created					0.1s                                                                             
network mynet2 declared as external, but could not be found

# 手动创建一个bridge类型网桥
[root@localhost ~]# docker network create \
--driver bridge \
--subnet 172.20.0.0/16 \
--gateway 172.20.0.1 \
-o com.docker.network.bridge.name=mynet2 \
mynet2 

# 再次启动
[root@localhost demo]# docker compose up
[+] Running 1/0
 ⠿ Container demo-server-1  Created					0.1s                                                                         
Attaching to demo-server-1
demo-server-1  | 2022-06-07 23:58:52
demo-server-1  | 2022-06-07 23:58:53
demo-server-1  | 2022-06-07 23:58:54
demo-server-1  | 2022-06-07 23:58:55
demo-server-1  | 2022-06-07 23:58:56

# 查看docker网桥
[root@localhost ~]# docker network ls
NETWORK ID     NAME          DRIVER    SCOPE
19913bc6a47d   bridge        bridge    local
d8af7b39a350   demo_mynet1   bridge    local
23966f1794db   host          host      local
428d68213519   mynet2        bridge    local
7c080397ed19   none          null      local

# 查看Linux网桥
[root@localhost ~]# brctl show
bridge name     		bridge id               STP enabled     interfaces
br-d8af7b39a350         8000.024241276bec       no              veth6b34cd4
docker0         		8000.0242ba5aab45       no              vethb6dc559
mynet2          		8000.024246ff67a9       no              vethba4ec17
```

:::

::: details (3) 指定网桥名字

```bash
[root@localhost demo]# cat docker-compose.yml 
version: "3"
services:        
  server:
    image: centos:7
    command: sh -c "while [ true ]; do echo $$(date +'%Y-%m-%d %H:%M:%S'); sleep 1; done"
    networks:
      - mynet1
      - mynet2

networks:
  mynet1:
  mynet2: 
    name: mynet2

[root@localhost demo]# docker compose up
[+] Running 3/3
 ⠿ Network demo_mynet1      Created					0.1s                                                                         
 ⠿ Network mynet2           Created					0.1s # 这里不再是默认的名字，而是mynet2
 ⠿ Container demo-server-1  Created					0.1s                                                                         
Attaching to demo-server-1
demo-server-1  | 2022-06-08 00:02:35
demo-server-1  | 2022-06-08 00:02:36
demo-server-1  | 2022-06-08 00:02:37

[root@localhost demo]# docker network ls
NETWORK ID     NAME          DRIVER    SCOPE
19913bc6a47d   bridge        bridge    local
91d9722ab1df   demo_mynet1   bridge    local
23966f1794db   host          host      local
7523cf9d05bf   mynet2        bridge    local
7c080397ed19   none          null      local
```

:::

::: details (4) 指定子网和默认网关

```bash
[root@localhost demo]# cat docker-compose.yml
version: "3"
services:        
  server:
    image: centos:7
    command: sh -c "while [ true ]; do echo $$(date +'%Y-%m-%d %H:%M:%S'); sleep 1; done"
    networks:      
      - mynet2

networks:
  mynet1:
    name: mynet1          
  mynet2: 
    name: mynet2
    # 自定义ipam配置
    ipam:
      driver: default
      config:
        - subnet: 172.28.0.0/16    # 子网
          ip_range: 172.28.5.0/24  # 限制容器IP范围
          gateway: 172.28.5.254    # 默认网关

# ----------------------------------------------------------------------------------------
# 上面的可能会有点啰嗦，一个最简单的定义如下
    # 自定义ipam配置
    ipam:
      driver: default
      config:
        - subnet: 172.28.10.0/24    # 子网，默认网关会使用172.28.10.1

[root@localhost ~]# docker container exec -it demo-server-1 bash -c "route -n"
Kernel IP routing table
Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
0.0.0.0         172.28.10.1     0.0.0.0         UG    0      0        0 eth0
172.28.10.0     0.0.0.0         255.255.255.0   U     0      0        0 eth0

[root@localhost ~]# docker container exec -it demo-server-1 bash -c "ping baidu.com -c 4"
PING baidu.com (220.181.38.148) 56(84) bytes of data.
64 bytes from 220.181.38.148 (220.181.38.148): icmp_seq=1 ttl=48 time=42.2 ms
64 bytes from 220.181.38.148 (220.181.38.148): icmp_seq=2 ttl=48 time=42.1 ms
64 bytes from 220.181.38.148 (220.181.38.148): icmp_seq=3 ttl=48 time=42.2 ms
64 bytes from 220.181.38.148 (220.181.38.148): icmp_seq=4 ttl=48 time=42.2 ms
--- baidu.com ping statistics ---
4 packets transmitted, 4 received, 0% packet loss, time 3004ms
rtt min/avg/max/mdev = 42.123/42.190/42.219/0.209 ms
```

:::

#### （10）✨持久化配置

文档：[https://docs.docker.com/compose/compose-file/#volumes-top-level-element](https://docs.docker.com/compose/compose-file/#volumes-top-level-element)

```bash
[root@localhost demo]# cat docker-compose.yml 
version: "3"
services:        
  server:
    image: centos:7
    command: sh -c "while [ true ]; do echo $$(date +'%Y-%m-%d %H:%M:%S'); sleep 1; done"
    # 将容器/data1映射到data1卷，/data2映射到data2卷
    volumes:
      - data1:/data1
      - data2:/data2

# volumes字段用于定义卷，data1是有名字的，data2是匿名的
volumes:
  data1:
    name: data1
  data2:
  
# 启动
[root@localhost demo]# docker compose up 
[+] Running 4/4
 ⠿ Network demo_default     Created					0.1s                                                                         
 ⠿ Volume "data1"           Created					0.0s                                                                         
 ⠿ Volume "demo_data2"      Created					0.0s                                                                         
 ⠿ Container demo-server-1  Created					0.1s                                                                         
Attaching to demo-server-1
demo-server-1  | 2022-06-08 00:37:00
demo-server-1  | 2022-06-08 00:37:01

# 查看卷
[root@localhost demo]# docker volume ls
DRIVER    VOLUME NAME
local     data1
local     demo_data2

# 查看卷详情
[root@localhost demo]# docker volume inspect data1
[
    {
        "CreatedAt": "2022-06-08T08:37:00+08:00",
        "Driver": "local",
        "Labels": {
            "com.docker.compose.project": "demo",
            "com.docker.compose.version": "2.5.0",
            "com.docker.compose.volume": "data1"
        },
        "Mountpoint": "/var/lib/docker/volumes/data1/_data",
        "Name": "data1",
        "Options": null,
        "Scope": "local"
    }
]
```

#### （11）资源限制（未解决）

文档：[https://docs.docker.com/compose/compose-file/compose-file-v3/#resources](https://docs.docker.com/compose/compose-file/compose-file-v3/#resources)

问题描述：对内存的限制生效，对CPU的限制不生效

```bash
[root@localhost demo]# cat docker-compose.yml 
version: "3.9"
services:
  server:
    image: centos:7
    command: sh -c "while [ true ]; do echo $$(date +'%Y-%m-%d %H:%M:%S'); sleep 1; done"
    deploy:
      resources:
        limits:
          cpus: '0.50'
          memory: 500M
        reservations:
          cpus: '0.25'
          memory: 200M

# 启动（--compatibility 以向后兼容性方式启动）
[root@localhost demo]# docker compose --compatibility up
[+] Running 2/2
 ⠿ Network demo_default     Created					0.1s                                                                         
 ⠿ Container demo_server_1  Created					0.1s                                                                         
Attaching to server_1
server_1  | 2022-06-08 06:18:21
server_1  | 2022-06-08 06:18:22
server_1  | 2022-06-08 06:18:23

# 新开一个终端，用于模拟消耗CPU
[root@localhost ~]# docker container exec -it demo_server_1 bash
[root@77a8be2674fe /]# cat /dev/urandom | gzip -9 >/dev/null

# 新开一个终端，用于监视容器资源消耗，并没有限制住CPU
[root@localhost ~]# docker stats
CONTAINER ID   NAME            CPU %     MEM USAGE / LIMIT   MEM %     NET I/O          BLOCK I/O         PIDS
77a8be2674fe   demo_server_1   156.10%   2.031MiB / 500MiB   0.41%     0B / 0B          0B / 0B           5

# 查看容器Cgroup参数，并没有设置到值
[root@localhost ~]# docker container inspect demo_server_1 | grep -i cpu
            "CpuShares": 0,
            "NanoCpus": 0,
            "CpuPeriod": 0,
            "CpuQuota": 0,
            "CpuRealtimePeriod": 0,
            "CpuRealtimeRuntime": 0,
            "CpusetCpus": "",
            "CpusetMems": "",
            "CpuCount": 0,
            "CpuPercent": 0,
```

#### （12）服务依赖关系

文档：[https://docs.docker.com/compose/compose-file/compose-file-v3/#depends_on](https://docs.docker.com/compose/compose-file/compose-file-v3/#depends_on)

`depends_on`用于表示服务之间的依赖关系，依赖关系会有如下行为：

* `docker compose up`会按依赖顺序启动服务
* `docker compose up <service>`会自动包含服务的依赖项
* `docker compose stop`会按依赖关系顺序停止服务

注意：比如ApiServer启动依赖于MySQL，这会先启动MySQL再启动ApiServer，但并不是等MySQL启动完成后再启动ApiServer，而仅仅是启动顺序不同而已

如果要解决这个问题，最好的方式是在程序内实现自动重试，其次是编写脚本判断服务就绪然后再启动依赖的服务

::: details depends_on基础示例

```bash
[root@localhost demo]# cat docker-compose.yml 
version: "3.9"
services:
  server1:
    image: centos:7
    container_name: server1
    command: sh -c "for i in `seq 5`; do echo $$(date +'%Y-%m-%d %H:%M:%S'); sleep 1; done"
    depends_on:
      - server2

  server2:
    image: centos:7
    container_name: server2
    command: sh -c "for i in `seq 5`; do echo $$(date +'%Y-%m-%d %H:%M:%S'); sleep 1; done"

# 启动，可以看到server2先输出了内容，但仅凭这个并不准确说明启动顺序
[root@localhost demo]# docker compose up
[+] Running 3/3
 ⠿ Network demo_default  Created					0.1s                                                                         
 ⠿ Container server2     Created					0.1s                                                                         
 ⠿ Container server1     Created					0.0s                                                                         
Attaching to server1, server2
server2  | 2022-06-08 23:19:16
server1  | 2022-06-08 23:19:16
server2  | 2022-06-08 23:19:17
server1  | 2022-06-08 23:19:17
server2  | 2022-06-08 23:19:18
server1  | 2022-06-08 23:19:18
server2  | 2022-06-08 23:19:19
server1  | 2022-06-08 23:19:19
server2  | 2022-06-08 23:19:20
server1  | 2022-06-08 23:19:20
server2 exited with code 0
server1 exited with code 0

# 查看容器创建时间，可以看到server2创建的比server1要早
[root@localhost demo]# docker inspect server1 | grep -i create
        "Created": "2022-06-08T23:19:16.05362163Z",
                "org.opencontainers.image.created": "2020-11-13 00:00:00+00:00",
[root@localhost demo]# 
[root@localhost demo]# docker inspect server2 | grep -i create
        "Created": "2022-06-08T23:19:15.96630301Z",
                "org.opencontainers.image.created": "2020-11-13 00:00:00+00:00",
```

:::