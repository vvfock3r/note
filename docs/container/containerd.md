## Containerd

官网：[https://containerd.io](https://containerd.io)

Github：[https://github.com/containerd/containerd](https://github.com/containerd/containerd)



### 包管理器安装

文档：[https://github.com/containerd/containerd/blob/main/docs/getting-started.md](https://github.com/containerd/containerd/blob/main/docs/getting-started.md)

如果使用包管理器（例如`apt-get`、`yum`、`dnf`），那么就要先安装好`Docker CE`源，然后就可以使用包管理器安装`Containerd`了

注意包的名字叫做`containerd.io`

![image-20220623162131225](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220623162131225.png)

```bash
# 看一下RPM包中都包含哪些东西
[root@ap-hongkang ~]# rpm -ql containerd.io
/etc/containerd
/etc/containerd/config.toml           # 配置文件
/usr/bin/containerd                   # 服务端
/usr/bin/containerd-shim
/usr/bin/containerd-shim-runc-v1
/usr/bin/containerd-shim-runc-v2
/usr/bin/ctr                          # 客户端
/usr/bin/runc
/usr/lib/.build-id
/usr/lib/.build-id/02
/usr/lib/.build-id/02/dece9ba728db6e9b960a00d435c9291cc7a2c5
/usr/lib/.build-id/47
/usr/lib/.build-id/47/53cee78e7dc1aee9a003c93768731ce8db4d5e
/usr/lib/.build-id/c3
/usr/lib/.build-id/c3/84e8638586f6c925e4800790aadb01ce380f3c
/usr/lib/systemd/system/containerd.service   # systemd 文件
/usr/share/doc/containerd.io
/usr/share/doc/containerd.io/README.md
/usr/share/licenses/containerd.io
/usr/share/licenses/containerd.io/LICENSE
/usr/share/man/man5/containerd-config.toml.5
/usr/share/man/man8/containerd-config.8
/usr/share/man/man8/containerd.8
/usr/share/man/man8/ctr.8

# 启动进程
[root@ap-hongkang ~]# systemctl start containerd

# 设置开机自启
[root@ap-hongkang ~]# systemctl enable containerd
Created symlink /etc/systemd/system/multi-user.target.wants/containerd.service → /usr/lib/systemd/system/containerd.service.
```

<br />

### 二进制安装

下载地址：[https://github.com/containerd/containerd/releases](https://github.com/containerd/containerd/releases)

二进制包分为两种：

* `containerd-xx`：这种包和我们使用包管理器安装的一样
* `cri-containerd-xx`：这种包包含更多的内容，比如`crictl`客户端命令等

![image-20220624105724502](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220624105724502.png)

```bash
# 下载包
[root@ap-hongkang ~]# wget -c https://github.com/containerd/containerd/releases/download/v1.6.6/cri-containerd-cni-1.6.6-linux-amd64.tar.gz

# 解压
[root@ap-hongkang ~]# mkdir cri-containerd-cni
[root@ap-hongkang ~]# tar zxf cri-containerd-cni-1.6.6-linux-amd64.tar.gz -C ./cri-containerd-cni/
[root@ap-hongkang ~]# cd ./cri-containerd-cni/

# 查看文件
[root@ap-hongkang cri-containerd-cni]# find . -type f
./etc/crictl.yaml                          # crictl的配置文件
./etc/systemd/system/containerd.service
./etc/cni/net.d/10-containerd-net.conflist
./usr/local/sbin/runc
./usr/local/bin/containerd
./usr/local/bin/crictl                      # 另一个客户端工具，用于K8S环境的CRI客户端
./usr/local/bin/containerd-shim-runc-v2
./usr/local/bin/containerd-shim-runc-v1
./usr/local/bin/critest
./usr/local/bin/containerd-shim
./usr/local/bin/ctd-decoder
./usr/local/bin/ctr
./usr/local/bin/containerd-stress
./opt/containerd/cluster/version
./opt/containerd/cluster/gce/env
./opt/containerd/cluster/gce/cloud-init/master.yaml
./opt/containerd/cluster/gce/cloud-init/node.yaml
./opt/containerd/cluster/gce/cni.template
./opt/containerd/cluster/gce/configure.sh
./opt/cni/bin/bridge
./opt/cni/bin/host-local
./opt/cni/bin/bandwidth
./opt/cni/bin/host-device
./opt/cni/bin/macvlan
./opt/cni/bin/portmap
./opt/cni/bin/sbr
./opt/cni/bin/dhcp
./opt/cni/bin/firewall
./opt/cni/bin/loopback
./opt/cni/bin/ipvlan
./opt/cni/bin/vlan
./opt/cni/bin/vrf
./opt/cni/bin/tuning
./opt/cni/bin/static
./opt/cni/bin/ptp
```

<br />

### 配置文件

**/etc/containerd/config.toml**

这是默认的配置文件

如果是二进制安装`Containerd`的话，这个文件默认是没有的

如果使用包管理器安装`Containerd`的话，这个文件内容长下面这样

::: details 点击查看详情

```bash
[root@ap-hongkang ~]# cat /etc/containerd/config.toml
#   Copyright 2018-2022 Docker Inc.

#   Licensed under the Apache License, Version 2.0 (the "License");
#   you may not use this file except in compliance with the License.
#   You may obtain a copy of the License at

#       http://www.apache.org/licenses/LICENSE-2.0

#   Unless required by applicable law or agreed to in writing, software
#   distributed under the License is distributed on an "AS IS" BASIS,
#   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#   See the License for the specific language governing permissions and
#   limitations under the License.

disabled_plugins = ["cri"]

#root = "/var/lib/containerd"
#state = "/run/containerd"
#subreaper = true
#oom_score = 0

#[grpc]
#  address = "/run/containerd/containerd.sock"
#  uid = 0
#  gid = 0

#[debug]
#  address = "/run/containerd/debug.sock"
#  uid = 0
#  gid = 0
#  level = "info"
```

:::

**containerd config default**

我们可以使用`containerd config default`来输出默认的配置，然后写入到默认的配置文件中`/etc/containerd/config.toml`

```bash
[root@ap-hongkang ~]# containerd config default > /etc/containerd/config.toml
[root@ap-hongkang ~]# systemctl restart containerd.service
```

<br />

### 客户端命令：ctr

::: details 点击查看详情

```bash
# 验证ctr来自于containerd.io包
[root@ap-hongkang ~]# which ctr
/usr/bin/ctr
[root@ap-hongkang ~]# rpm -qf `which ctr`
containerd.io-1.6.6-3.1.el8.x86_64

# 查看一下帮助信息
[root@ap-hongkang ~]# ctr --help
NAME:
   ctr - 
        __
  _____/ /______
 / ___/ __/ ___/
/ /__/ /_/ /
\___/\__/_/

containerd CLI


USAGE:
   ctr [global options] command [command options] [arguments...]

VERSION:
   1.6.6

DESCRIPTION:
   
ctr is an unsupported debug and administrative client for interacting
with the containerd daemon. Because it is unsupported, the commands,
options, and operations are not guaranteed to be backward compatible or
stable from release to release of the containerd project.

COMMANDS:
   plugins, plugin            provides information about containerd plugins
   version                    print the client and server versions
   containers, c, container   manage containers             # 管理容器
   content                    manage content
   events, event              display containerd events
   images, image, i           manage images                 # 管理镜像
   leases                     manage leases
   namespaces, namespace, ns  manage namespaces             # 管理命名空间
   pprof                      provide golang pprof outputs for containerd
   run                        run a container               # 运行容器
   snapshots, snapshot        manage snapshots
   tasks, t, task             manage tasks
   install                    install a new package
   oci                        OCI tools
   shim                       interact with a shim directly
   help, h                    Shows a list of commands or help for one command

GLOBAL OPTIONS:
   --debug                      enable debug output in logs
   --address value, -a value    address for containerd's GRPC server (default: "/run/containerd/containerd.sock") [$CONTAINERD_ADDRESS]
   --timeout value              total timeout for ctr commands (default: 0s)
   --connect-timeout value      timeout for connecting to containerd (default: 0s)
   --namespace value, -n value  namespace to use with commands (default: "default") [$CONTAINERD_NAMESPACE]
   --help, -h                   show help
   --version, -v                print the version
```

:::

> 注意事项：
>
> （1）`ctr image ls`、`ctr images ls`、`ctr i ls` 这三个命令是一样的，其他子命令也类似

<br />

### 镜像管理

::: details （1）基础操作：拉取/查看/删除

```bash
# 拉取镜像，失败了!?
[root@ap-hongkang ~]# ctr image pull nginx:1.21.6
ctr: failed to resolve reference "nginx:1.21.6": parse "dummy://nginx:1.21.6": invalid port ":1.21.6" after host

# 正确的方法
[root@ap-hongkang ~]# ctr image pull docker.io/library/nginx:1.21.6
docker.io/library/nginx:1.21.6:                                                   resolved       |++++++++++++++++++++++++++++++++++++++| 
index-sha256:2bcabc23b45489fb0885d69a06ba1d648aeda973fae7bb981bafbb884165e514:    done           |++++++++++++++++++++++++++++++++++++++| 
manifest-sha256:25dedae0aceb6b4fe5837a0acbacc6580453717f126a095aa05a3c6fcea14dd4: done           |++++++++++++++++++++++++++++++++++++++| 
layer-sha256:db24d06d5af41a56ab5e579ad26c71b7c0e35c6b11fd36015cb5e98df881d025:    done           |++++++++++++++++++++++++++++++++++++++| 
config-sha256:0e901e68141fd02f237cf63eb842529f8a9500636a9419e3cf4fb986b8fe3d5d:   done           |++++++++++++++++++++++++++++++++++++++| 
layer-sha256:42c077c10790d51b6f75c4eb895cbd4da37558f7215b39cbf64c46b288f89bda:    done           |++++++++++++++++++++++++++++++++++++++| 
layer-sha256:62c70f376f6a97b1b1f970100583b01740ee4d0f1305226880d7f1624e425b9b:    done        |++++++++++++++++++++++++++++++++++++++| 
layer-sha256:915cc9bd79c2262c322fb536ab56f19e551e71044aa2f80ab964cb15ea5e3ed4:    done           |++++++++++++++++++++++++++++++++++++++| 
layer-sha256:75a963e94de04fe56dda9d3e3235bddbb34ea47d8f426acebf260ac24ef91f81:    done           |++++++++++++++++++++++++++++++++++++++| 
layer-sha256:7b1fab684d70a138987d1539434eaa1d46f5e1b07cc8ee363cb31d251e048187:    done           |++++++++++++++++++++++++++++++++++++++| 
elapsed: 6.6 s                                                                    total:  54.1 M (8.2 MiB/s)                                       
unpacking linux/amd64 sha256:2bcabc23b45489fb0885d69a06ba1d648aeda973fae7bb981bafbb884165e514...
done: 1.54382982s

# 查看镜像（这个输出是真心丑~~）
[root@ap-hongkang ~]# ctr image ls
REF                            TYPE                                                      DIGEST                                                                  SIZE     PLATFORMS                                                                                               LABELS 
docker.io/library/nginx:1.21.6 application/vnd.docker.distribution.manifest.list.v2+json sha256:2bcabc23b45489fb0885d69a06ba1d648aeda973fae7bb981bafbb884165e514 54.1 MiB linux/386,linux/amd64,linux/arm/v5,linux/arm/v7,linux/arm64/v8,linux/mips64le,linux/ppc64le,linux/s390x -  

[root@ap-hongkang ~]# ctr image ls -q
docker.io/library/nginx:1.21.6

# 删除镜像
[root@ap-hongkang ~]# ctr image rm docker.io/library/nginx:1.21.6
docker.io/library/nginx:1.21.6
[root@ap-hongkang ~]# ctr image ls --quiet
[root@ap-hongkang ~]# 
```

:::

::: details （2）与Docker镜像存储位置的区别

```bash
# 看下面的输出，发现containerd的镜像和docker的镜像并不共享，因为存的目录也并不一样
[root@ap-hongkang ~]# docker image ls
REPOSITORY   TAG             IMAGE ID       CREATED        SIZE
note         latest          83697699b6f1   3 hours ago    37.4MB
busybox      1.34            62aedd01bd85   2 weeks ago    1.24MB
node         18-alpine3.14   2521d94c290e   2 weeks ago    172MB
nginx        1.21.6          0e901e68141f   3 weeks ago    142MB
centos       7               eeb6ee3f44bd   9 months ago   204MB

[root@ap-hongkang ~]# ctr image ls -q
docker.io/library/nginx:1.21.6
```

:::

<br />

### 命名空间（重要）

```bash
# 查看命名空间
[root@ap-hongkang ~]# ctr ns ls
NAME    LABELS 
default         # 默认的命名空间，若不指定命名空间，则所有操作都在这个命名空间下
moby            # 这个是Docker Engine的命名空间，如果将Docker服务卸载，此命名空间消失，服务安装上命名空间又会出来
```

<br />

### 容器管理

::: details （1）基础操作

```bash
# 创建容器
# ctr run 等同于 ctr container create + ctr task start
[root@ap-hongkang ~]# ctr run -d docker.io/library/nginx:1.21.6 mynginx
[root@ap-hongkang ~]# ctr run -d -t docker.io/library/centos:7 mycentos

# 查看容器
[root@ap-hongkang ~]# ctr container ls
CONTAINER    IMAGE                             RUNTIME                  
mycentos     docker.io/library/centos:7        io.containerd.runc.v2    
mynginx      docker.io/library/nginx:1.21.6    io.containerd.runc.v2

# 查看tasks
[root@ap-hongkang ~]# ctr tasks ls
TASK        PID       STATUS    
mynginx     484904    RUNNING
mycentos    484998    RUNNING

# 进入容器 - exec
[root@ap-hongkang ~]# ctr tasks exec -t --exec-id mycentos mycentos bash
[root@ap-hongkang /]# ps aux
USER         PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root           1  0.0  0.1  11844  2940 pts/0    Ss+  01:39   0:00 /bin/bash
root         111  0.0  0.1  11844  2992 pts/1    Ss   01:58   0:00 bash
root         125  0.0  0.1  51748  3452 pts/1    R+   01:58   0:00 ps aux

[root@ap-hongkang ~]# ctr tasks exec --exec-id mycentos mycentos ps aux
USER         PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root           1  0.0  0.1  11844  2940 pts/0    Ss+  01:39   0:00 /bin/bash
root         126  0.0  0.1  51748  3456 ?        Rs   02:22   0:00 ps aux

# 进入容器 - attach
[root@ap-hongkang ~]# ctr tasks attach mycentos

# 删除容器（先删除task再删除容器）
[root@ap-hongkang ~]# ctr tasks rm -f mycentos
[root@ap-hongkang ~]# ctr container rm mycentos
```

:::

::: details （2）查看Docker容器

```bash
# 使用docker命令，查看一下当前运行的容器有哪些
[root@ap-hongkang ~]# docker container ps
CONTAINER ID   IMAGE         COMMAND                  CREATED        STATUS        PORTS                                      NAMES
c96e6cc931a6   note:latest   "/docker-entrypoint.…"   17 hours ago   Up 17 hours   0.0.0.0:80->80/tcp, 0.0.0.0:443->443/tcp   jinhui.dev

# 使用ctr，查看moby命名空间的容器，和docker输出ID一致
[root@ap-hongkang ~]# ctr -n moby container ls
CONTAINER                                                           IMAGE    RUNTIME                  
c96e6cc931a6b92f3bd4dfc0adc955dc44d10293a5e8894d51d3aa18a9b7cf2f    -        io.containerd.runc.v2 
```

:::

