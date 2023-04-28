# MyDocker

<br />

## 环境配置

**开发环境参数**

* Windows 10
* GoLand
* Go 1.20.1

**GoLand配置**

* 配置系统参数为Linux，这样我们就可以在调用Go中的Linux API
* 配置运行目标为Linux，这样我们就可以在GoLand中启动程序时直接运行在Linux上

**运行环境参数**

* CentOS 7：用户人群众多，属于必测的发行版之一，但是其内核版本比较低（3.x）
* Arch Linux：滚动发行版Linux，几乎所有软件包都是最新版，自然也包含最新版的内核（6.x）

**安装man文档**

* CentOS：`yum -y install man-pages`
* Arch Linux：`pacman -Sy man-pages`

<br />

## NameSpace

### 查看指定进程的命名空间

::: details 点击查看详情

```bash
# 以下方法都可以查看指定进程的命名空间
# 	ls -lh /proc/<pid>/ns
# 	lsns -p <pid>

# 如果要查看当前进程的命名空间
# $$在Shell中会被解释成当前Shell的PID,在Shell外使用无效
# 	ls -lh /proc/$$/ns
# 	lsns -p $$

# 一个特殊的目录
# 	/proc/self 它是一个符号链接，指向的当前进程的进程号目录
# 	/proc/self 链接到一个数字目录, 每次查看他都会递增(重新解析符号链接)，但实际上并不影响我们操作
#   ls -lh /proc/self/ns 便可以查看当前进程的命名空间，这样做的优点是可以不用知道PID

# CentOS 7: 6种
[root@localhost ~]# ls -lh /proc/self/ns
total 0
lrwxrwxrwx. 1 root root 0 Apr 21 00:20 ipc -> ipc:[4026531839]
lrwxrwxrwx. 1 root root 0 Apr 21 00:20 mnt -> mnt:[4026531840]
lrwxrwxrwx. 1 root root 0 Apr 21 00:20 net -> net:[4026531956]
lrwxrwxrwx. 1 root root 0 Apr 21 00:20 pid -> pid:[4026531836]
lrwxrwxrwx. 1 root root 0 Apr 21 00:20 user -> user:[4026531837]
lrwxrwxrwx. 1 root root 0 Apr 21 00:20 uts -> uts:[4026531838]

# Arch Linux: 8种（没有将xx_for_children计算在内）
[root@archlinux ~]# ls -lh /proc/self/ns
total 0
lrwxrwxrwx 1 root root 0 Apr 21 00:10 cgroup -> 'cgroup:[4026531835]'
lrwxrwxrwx 1 root root 0 Apr 21 00:10 ipc -> 'ipc:[4026531839]'
lrwxrwxrwx 1 root root 0 Apr 21 00:10 mnt -> 'mnt:[4026531841]'
lrwxrwxrwx 1 root root 0 Apr 21 00:10 net -> 'net:[4026531840]'
lrwxrwxrwx 1 root root 0 Apr 21 00:10 pid -> 'pid:[4026531836]'
lrwxrwxrwx 1 root root 0 Apr 21 00:10 pid_for_children -> 'pid:[4026531836]'
lrwxrwxrwx 1 root root 0 Apr 21 00:10 time -> 'time:[4026531834]'
lrwxrwxrwx 1 root root 0 Apr 21 00:10 time_for_children -> 'time:[4026531834]'
lrwxrwxrwx 1 root root 0 Apr 21 00:10 user -> 'user:[4026531837]'
lrwxrwxrwx 1 root root 0 Apr 21 00:10 uts -> 'uts:[4026531838]'

# 分析
# 1、多出来的两种是cgroup_namespaces和time_namespaces,这两种命名空间是由高版本的Linux kernel提供的
# 2、4026531839 这种数字代表一个系统级别的唯一标识符，可以用于在不同进程之间共享相同的命名空间
```

:::

<br />

### 查看命名空间的数量限制

::: details 点击查看详情

```bash
# 看一下列表
[root@localhost ~]# ls -lh /proc/sys/user/max_*_namespaces
-rw-r--r--. 1 root root 0 Apr 18 20:54 /proc/sys/user/max_ipc_namespaces
-rw-r--r--. 1 root root 0 Apr 18 20:54 /proc/sys/user/max_mnt_namespaces
-rw-r--r--. 1 root root 0 Apr 18 20:54 /proc/sys/user/max_net_namespaces
-rw-r--r--. 1 root root 0 Apr 18 20:52 /proc/sys/user/max_pid_namespaces
-rw-r--r--. 1 root root 0 Apr 18 20:47 /proc/sys/user/max_user_namespaces
-rw-r--r--. 1 root root 0 Apr 18 20:53 /proc/sys/user/max_uts_namespaces

# 看一下各个命名空间最大可创建的数量,不同的系统值可能不一样
[root@localhost ~]# cat /proc/sys/user/max_*_namespaces
14998
14998
14998
14998
0
14998

# 说明
# 0  代表不允许创建新的命名空间，在上面 用户命名空间为0，需要我们调整一下，否则后面的代码会报错
# -1 代表不限制命名空间数量

# 临时修改
[root@localhost ~]# echo 14998 > /proc/sys/user/max_user_namespaces

# 永久修改
[root@localhost ~]# vim /etc/sysctl.conf
user.max_uts_namespaces=14998
[root@localhost ~]# sysctl -p
```

:::

<br />

### Docker和用户命名空间

参考资料：[https://docs.docker.com/engine/security/userns-remap/](https://docs.docker.com/engine/security/userns-remap/)

::: details （1）max_user_namespaces为0时，使用Docker可以正常启动容器吗？

```bash
# 上面我们已经看到，有的系统默认命名空间最大数量限制为0，即不可以创建用户命名空间
# 那么我还可以正常启动Docker容器吗？
# 先让我们做一些测试和检查

# 准备环境：随便启动一个容器，启动成功
[root@localhost ~]# docker run --name test -it --rm  busybox:latest sh

# --------------------------------------------------------------------------------------------
# 第一次验证：看看Docker都隔离了哪些命名空间

# 宿主机执行
[root@localhost ~]# ls -lh /proc/self/ns/
total 0
lrwxrwxrwx. 1 root root 0 Apr 21 09:28 ipc -> ipc:[4026531839]
lrwxrwxrwx. 1 root root 0 Apr 21 09:28 mnt -> mnt:[4026531840]
lrwxrwxrwx. 1 root root 0 Apr 21 09:28 net -> net:[4026531956]
lrwxrwxrwx. 1 root root 0 Apr 21 09:28 pid -> pid:[4026531836]
lrwxrwxrwx. 1 root root 0 Apr 21 09:28 user -> user:[4026531837]
lrwxrwxrwx. 1 root root 0 Apr 21 09:28 uts -> uts:[4026531838]

# 容器内执行
[root@localhost ~]# docker run --name test -it --rm  busybox:latest sh
/ # ls -lh /proc/self/ns/
total 0      
lrwxrwxrwx    1 root     root           0 Apr 21 01:23 ipc -> ipc:[4026532507]
lrwxrwxrwx    1 root     root           0 Apr 21 01:23 mnt -> mnt:[4026532505]
lrwxrwxrwx    1 root     root           0 Apr 21 01:23 net -> net:[4026532510]
lrwxrwxrwx    1 root     root           0 Apr 21 01:23 pid -> pid:[4026532508]
lrwxrwxrwx    1 root     root           0 Apr 21 01:23 user -> user:[4026531837] # 只有它和宿主机一致
lrwxrwxrwx    1 root     root           0 Apr 21 01:23 uts -> uts:[4026532506]

# --------------------------------------------------------------------------------------------
# 第二次验证：看看Docker都隔离了哪些命名空间

[root@localhost ~]# docker container inspect test | grep -i pid
            "Pid": 2910,
            "PidMode": "",
            "PidsLimit": null,

[root@localhost ~]# lsns -p 2910
        NS TYPE  NPROCS   PID USER    COMMAND
4026532505 mnt        1  2910 root    sh
4026532506 uts        1  2910 root    sh
4026532507 ipc        1  2910 root    sh
4026532508 pid        1  2910 root    sh
4026532510 net        1  2910 root    sh

# --------------------------------------------------------------------------------------------

# 总结：Docker没有隔离用户命名空间，自然就不受/proc/sys/user/max_user_namespaces的限制
```

:::

::: details （2）Docker如何启用User命名空间？

```bash
# 先检查一下
[root@localhost ~]# docker info | grep 'Docker Root Dir'
 Docker Root Dir: /var/lib/docker
 
# 修改配置文件
[root@localhost ~]# vim /usr/lib/systemd/system/docker.service
...
[Service]
Type=notify
# the default is not to use systemd for cgroups because the delegate issues still
# exists and systemd currently does not support the cgroup feature set required
# for containers run by docker

# 添加 --userns-remap=default
#ExecStart=/usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock
ExecStart=/usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock --userns-remap=default

# 重启Docker
[root@localhost ~]# systemctl daemon-reload
[root@localhost ~]# systemctl restart docker

# 再次检查
[root@localhost ~]# docker info | grep 'Docker Root Dir'
 Docker Root Dir: /var/lib/docker/100000.100000
```

:::

::: details （3）Docker启用User命名空间后有何不同？

分析：

* User命名空间隔离的是UID和GID
* 隔离User命名空间后容器内的UID和GID虽然和宿主机的ID保持一致（比如root），但是实际并没有一一对应

```bash
# 宿主机创建测试目录
[root@localhost ~]# mkdir /test

# -----------------------------------------------------------------------------
# 默认情况下，共享User命名空间
[root@localhost ~]# docker run -it --rm  -v /test:/test busybox:latest sh
/ # id
uid=0(root) gid=0(root) groups=0(root),10(wheel)
/ # touch /test/1.txt
/ # ls -lh /test/1.txt
-rw-r--r--    1 root     root           0 Apr 21 05:34 /test/1.txt

# -----------------------------------------------------------------------------
# 手动修改Docker配置，隔离User命名空间
[root@localhost ~]# docker run -it --rm  -v /test:/test busybox:latest sh
/ # id
uid=0(root) gid=0(root) groups=0(root),10(wheel)
/ # touch /test/1.txt
touch: /test/1.txt: Permission denied

# -----------------------------------------------------------------------------
# 在Docker全局隔离User命名空间下，针对某个容器设置与宿主机共享命名空间
[root@localhost ~]# docker run -it --rm  -v /test:/test --userns=host busybox:latest sh
/ # touch /test/1.txt

# -----------------------------------------------------------------------------
# 注意事项：若Docker启用User命名空间，需要确保 /proc/sys/user/max_user_namespaces 不能为0，否则会报错
[root@localhost ~]# docker run -it --rm  -v /test:/test busybox:latest sh
docker: Error response from daemon: failed to create shim task: OCI runtime create failed: runc create failed: unable to start container process: can't get final child's PID from pipe: EOF: unknown.
```

:::

<br />

### UTS

::: details （1）使用Shell隔离UTS命名空间

```bash
# 查看当前Shell的Namespace
[root@archlinux ~]# ls -l --color /proc/self/ns
total 0
lrwxrwxrwx 1 root root 0 Apr 24 19:12 cgroup -> 'cgroup:[4026531835]'
lrwxrwxrwx 1 root root 0 Apr 24 19:12 ipc -> 'ipc:[4026531839]'
lrwxrwxrwx 1 root root 0 Apr 24 19:12 mnt -> 'mnt:[4026531841]'
lrwxrwxrwx 1 root root 0 Apr 24 19:12 net -> 'net:[4026531840]'
lrwxrwxrwx 1 root root 0 Apr 24 19:12 pid -> 'pid:[4026531836]'
lrwxrwxrwx 1 root root 0 Apr 24 19:12 pid_for_children -> 'pid:[4026531836]'
lrwxrwxrwx 1 root root 0 Apr 24 19:12 time -> 'time:[4026531834]'
lrwxrwxrwx 1 root root 0 Apr 24 19:12 time_for_children -> 'time:[4026531834]'
lrwxrwxrwx 1 root root 0 Apr 24 19:12 user -> 'user:[4026531837]'
lrwxrwxrwx 1 root root 0 Apr 24 19:12 uts -> 'uts:[4026531838]'

# unshare可以在一个隔离的Namespace中启动进程
[root@archlinux ~]# unshare --uts bash

# 查看当前Shell的Namespace
[root@archlinux ~]# ls -l --color /proc/self/ns
total 0
lrwxrwxrwx 1 root root 0 Apr 24 19:13 cgroup -> 'cgroup:[4026531835]'
lrwxrwxrwx 1 root root 0 Apr 24 19:13 ipc -> 'ipc:[4026531839]'
lrwxrwxrwx 1 root root 0 Apr 24 19:13 mnt -> 'mnt:[4026531841]'
lrwxrwxrwx 1 root root 0 Apr 24 19:13 net -> 'net:[4026531840]'
lrwxrwxrwx 1 root root 0 Apr 24 19:13 pid -> 'pid:[4026531836]'
lrwxrwxrwx 1 root root 0 Apr 24 19:13 pid_for_children -> 'pid:[4026531836]'
lrwxrwxrwx 1 root root 0 Apr 24 19:13 time -> 'time:[4026531834]'
lrwxrwxrwx 1 root root 0 Apr 24 19:13 time_for_children -> 'time:[4026531834]'
lrwxrwxrwx 1 root root 0 Apr 24 19:13 user -> 'user:[4026531837]'
lrwxrwxrwx 1 root root 0 Apr 24 19:13 uts -> 'uts:[4026532627]'         # 这里发生变化

# 在隔离UTS的Shell中修改主机名
[root@archlinux ~]# hostname test
[root@archlinux ~]# hostname
test

# 退出隔离UTS的Shell，再次查看主机名
[root@archlinux ~]# exit
exit
[root@archlinux ~]# hostname
archlinux
```

:::

::: details （2）使用Go隔离UTS命名空间：基础示例

```go
package main

import (
	"log"
	"os"
	"os/exec"
	"syscall"
)

func main() {
	cmd := exec.Command("bash")
    
	cmd.SysProcAttr = &syscall.SysProcAttr{
		// 创建一个UTS命名空间
		Cloneflags: syscall.CLONE_NEWUTS,
	}
	//cmd.Dir = "/root"
	cmd.Stdin = os.Stdin
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	if err := cmd.Run(); err != nil {
		panic(err)
	}
}
```

输出结果

```bash
# 查看进程内的主机名，和宿主机一样
[root@archlinux sources-1QQzEBetzM]# hostname
archlinux

# 修改进程内的主机名
[root@archlinux sources-1QQzEBetzM]# hostname mydocker

# 查看宿主机的主机名,发现没有被修改，至此，第一个小测试完成
[root@archlinux ~]# hostname
archlinux

# ------------------------------------------------------

# 默认打开的Shell并不在家目录下，这是由于GoLand上传代码所导致的
[root@archlinux sources-1QQzEBetzM]# pwd
/root/example/sources-1QQzEBetzM

# 可以将代码中 //cmd.Dir = "/root" 注释打开，看起来就比较清爽了
[root@archlinux ~]# 
```

:::

::: details （3）使用Go隔离UTS命名空间：如何修改主机名：遇到问题

分析一下：

* 修改主机名使用 `syscall.Sethostname` 函数
* 修改主机名必须要在【UTS命名空间创建之后】，并且在【进程启动之前】，否则进程会获取到错误的主机名
* Go并没有单独提供创建命名空间的函数，启动进程和创建命名空间是绑定在一起的
* cmd.Run() 可以拆分为 cmd.Start() 和 cmd.Wait()，能不能在这俩函数之间搞点事情？

编写代码：

```go
package main

import (
	"log"
	"os"
	"os/exec"
	"syscall"
)

func main() {
	cmd := exec.Command("bash")
    
	cmd.SysProcAttr = &syscall.SysProcAttr{
		// 创建一个UTS命名空间
		Cloneflags: syscall.CLONE_NEWUTS,
	}
	cmd.Dir = "/root"
	cmd.Stdin = os.Stdin
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	if err := cmd.Start(); err != nil {
		panic(err)
	}

	// 修改主机名
	err := syscall.Sethostname([]byte("mydocker"))
	if err != nil {
		panic(err)
	}

	if err := cmd.Wait(); err != nil {
		panic(err)
	}
}
```

输出结果

```bash
# 查看进程内的主机名
[root@archlinux ~]# hostname
archlinux

# 查看宿主机的主机名
[root@archlinux ~]# hostname
mydocker

# 分析
# 1、现象：进程内的主机名没改，居然把宿主机的给改了???
# 2、前面我们说过，修改主机名要【进程启动之前】，不然进程都启动了，都读到宿主机主机名了，再去改进程内的主机名还有啥意思
# 3、先执行syscall.Sethostname，再执行cmd.Start(),肯定是不行的，因为此时UTS命名空间还没创建，改的同样是宿主机的主机名
# 4、陷入僵局...
```

:::

<br />

### 命名空间执行代码通用方法

::: details （1）探索如何在代码中修改主机名：使用第三方包，先解决问题

```go
package main

import (
	"os"
	"os/exec"
	"syscall"

	"github.com/docker/docker/pkg/reexec"
)

func init() {
	// reexec注册命令
	reexec.Register("flag", child)

	// 判断是否已调用初始化函数
	if reexec.Init() {
		os.Exit(0)
	}
}

func child() {
	err := syscall.Sethostname([]byte("mydocker"))
	if err != nil {
		panic(err)
	}
	cmd := exec.Command("bash")
	cmd.Stdin = os.Stdin
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	if err := cmd.Run(); err != nil {
		panic(err)
	}
}

func main() {
	cmd := reexec.Command("flag")

	cmd.SysProcAttr = &syscall.SysProcAttr{
		Cloneflags: syscall.CLONE_NEWUTS,
	}
	cmd.Dir = "/root"
	cmd.Stdin = os.Stdin
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	if err := cmd.Run(); err != nil {
		panic(err)
	}
}
```

输出结果

```bash
# 执行程序，发现进程内的主机名已经被修改
[root@mydocker ~]# hostname
mydocker

# 查看宿主机的主机名，没有变化，测试成功
[root@archlinux ~]# hostname
archlinux

# 分析
# 根据这个包的原理，后面我们会自己实现一份相关代码
```

:::

::: details （2）探索如何在代码中修改主机名：使用原生方法，先看一种简单的方案

```go
package main

import (
	"fmt"
	"log"
	"os"
	"os/exec"
	"syscall"
)

func run() {
	args := append([]string{"ns"}, os.Args[2:]...)
	cmd := exec.Command("/proc/self/exe", args...)

	cmd.SysProcAttr = &syscall.SysProcAttr{
		Cloneflags: syscall.CLONE_NEWUTS,
	}

	cmd.Stdin = os.Stdin
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	if err := cmd.Run(); err != nil {
		log.Fatalln(err)
	}
}
func ns() {
	// 设置主机名
	if err := syscall.Sethostname([]byte("mydocker")); err != nil {
		panic(err)
	}

	// 执行真正的命令
	cmd := exec.Command(os.Args[2], os.Args[3:]...)

	cmd.Stdin = os.Stdin
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	if err := cmd.Run(); err != nil {
		panic(err)
	}
}

func main() {
	if len(os.Args) < 2 {
		fmt.Printf("Usage: %s run <command>\n", os.Args[0])
		os.Exit(1)
	}

	switch os.Args[1] {
	case "run":
		run()
	case "ns":
		ns()
	default:
		panic("pass me an argument please")
	}
}
```

输出结果

```bash
# 执行程序，发现进程内的主机名已经被修改
[root@archlinux ~]# go run main.go run bash
[root@mydocker ~]# hostname
mydocker

# 查看宿主机的主机名，没有变化，测试成功
[root@mydocker ~]# exit
[root@archlinux ~]# hostname
archlinux

# 分析
# 核心的原理是：
# 1、/proc/self/exe 代表程序本身
# 2、程序调用自身，并传递不同的参数，也就执行不同的代码
# 3、父进程创建出命名空间，子进程修改主机名，并执行真正的命令
# 4、不过该程序有一个bug，如果执行时直接使用 go run main.go ns bash，那么就会修改宿主机主机名，就会出问题
```

:::

::: details （3）探索如何在代码中修改主机名：使用原生方法实现reexec

```go
package main

import (
	"os"
	"os/exec"
	"syscall"

	"golang.org/x/sys/unix"
)

// Run函数会在新的命名空间中运行
func Run() {
	// 设置主机名
	err := syscall.Sethostname([]byte("mydocker"))
	if err != nil {
		panic(err)
	}

	// 执行命令
	cmd := exec.Command("bash")

	cmd.Stdin = os.Stdin
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	if err := cmd.Run(); err != nil {
		panic(err)
	}
}

func main() {
	// 将真正要运行的函数保存到一个Map中
	// key是什么无所谓，只要能和下面代码对应起来即可
	store := make(map[string]func())
	store["flag"] = Run

	// 看一下 os.Args[0],这是核心原理之一
	//fmt.Printf("os.Args[0]: %s\n", os.Args[0])

	// 从Map中找到真正的函数并运行，然后退出
	function, exists := store[os.Args[0]]
	if exists {
		function()
		os.Exit(0)
	}

	// 构造Cmd对象
	// 1、/proc/self/exe代表程序自身,即程序会调用自己
	// 2、调用自己时指定了Args，其中Args[0] = flag
	// 3、Pdeathsig 表示子进程的父进程结束时发送的信号
	//    如果这个子进程在创建之后，父进程先退出了，那么这个新进程就会成为一个孤儿进程，并被 init 进程收养
	//    这样就会破坏容器的隔离性，因此需要设置 Pdeathsig 字段来避免这种情况的发生，以保证容器的隔离性
	cmd := &exec.Cmd{
		Path: "/proc/self/exe",
		Args: []string{"flag"},
		SysProcAttr: &syscall.SysProcAttr{
			Cloneflags: syscall.CLONE_NEWUTS,
			Pdeathsig:  unix.SIGTERM,
		},
		Dir:    "/root",
		Stdin:  os.Stdin,
		Stdout: os.Stdout,
		Stderr: os.Stderr,
	}

	if err := cmd.Run(); err != nil {
		panic(err)
	}
}
```

输出结果

```bash
# 执行程序，发现进程内的主机名已经被修改
[root@mydocker ~]# hostname
mydocker

# 查看宿主机的主机名，没有变化，测试成功
[root@archlinux ~]# hostname
archlinux
```

:::

::: details （4）探索如何在代码中修改主机名：优化一下代码

```go
package main

import (
	"golang.org/x/sys/unix"
	"os"
	"os/exec"
	"syscall"
)

func main() {
	// 第一次启动,设置Namespace,然后程序调用自身
	if os.Args[0] != "/proc/self/exe" {
		cmd := &exec.Cmd{
			Path: "/proc/self/exe",
			Args: append([]string{"/proc/self/exe"}, os.Args[1:]...),
			SysProcAttr: &syscall.SysProcAttr{
				Pdeathsig:  unix.SIGTERM,
				Cloneflags: syscall.CLONE_NEWUTS,
			},
            Dir:    "/root",
			Stdin:  os.Stdin,
			Stdout: os.Stdout,
			Stderr: os.Stderr,			
		}

		if err := cmd.Run(); err != nil {
			panic(err)
		}
		os.Exit(0)
	}

	// 下面的代码运行在新的Namespace中

	err := syscall.Sethostname([]byte("mydocker"))
	if err != nil {
		panic(err)
	}

	cmd := exec.Command("bash")

	cmd.Stdin = os.Stdin
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	if err := cmd.Run(); err != nil {
		panic(err)
	}
}
```

输出结果

```bash
# 执行程序，发现进程内的主机名已经被修改
[root@mydocker ~]# hostname
mydocker

# 查看宿主机的主机名，没有变化，测试成功
[root@archlinux ~]# hostname
archlinux
```

:::

<br />

### IPC

::: details 点击查看详情

```go
package main

import (
	"os"
	"os/exec"
	"syscall"
)

func main() {
	cmd := exec.Command("bash")

	cmd.SysProcAttr = &syscall.SysProcAttr{
		Cloneflags: syscall.CLONE_NEWIPC,
	}
	cmd.Dir = "/root"
	cmd.Stdin = os.Stdin
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	if err := cmd.Run(); err != nil {
		panic(err)
	}
}
```

输出结果

```bash
# 在宿主机上查看 IPC Message Queues
[root@archlinux ~]# ipcs -q

------ Message Queues --------
key        msqid      owner      perms      used-bytes   messages

# 在宿主机上创建一个 IPC Message Queue
[root@archlinux ~]# ipcmk -Q
Message queue id: 0

# 在宿主机上再次查看
[root@archlinux ~]# ipcs -q

------ Message Queues --------
key        msqid      owner      perms      used-bytes   messages    
0x361dec46 0          root       644        0            0

# --------------------------------------------------------------------

# 执行代码，在进程中上查看IPC，看不到说明隔离成功
[root@archlinux ~]# ipcs -q

------ Message Queues --------
key        msqid      owner      perms      used-bytes   messages
```

:::

<br />

### PID

::: details 点击查看详情

```go
package main

import (
	"os"
	"os/exec"
	"syscall"
)

func main() {
	cmd := exec.Command("bash")

	cmd.SysProcAttr = &syscall.SysProcAttr{
		Cloneflags: syscall.CLONE_NEWPID,
	}
	cmd.Dir = "/root"
	cmd.Stdin = os.Stdin
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	if err := cmd.Run(); err != nil {
		panic(err)
	}
}
```

输出结果

```bash
# 查看当前进程PID，PID隔离成功
[root@archlinux ~]# echo $$
1

# 但是我们用ps、top等命令依旧能看到宿主机上的进程ID
[root@archlinux ~]# ps aux|wc -l
157

[root@archlinux ~]# top
	...
    PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND  
      1 root      20   0   21108  13088   9328 S   0.0   0.3   0:03.71 systemd  
    291 systemd+  20   0   20108  12416  10240 S   0.0   0.3   0:00.16 systemd+ 
    218 root      20   0   32340  11152  10256 S   0.0   0.3   0:00.19 systemd+ 
    326 root      20   0   18736  10880   9088 S   0.0   0.3   0:00.18 systemd  
    235 root      20   0   33720  10364   7292 S   0.0   0.3   0:00.40 systemd+ 
    589 root      20   0   14140  10132   8192 S   0.0   0.3   0:00.43 sshd     
    323 root      20   0   13916  10116   8448 S   0.0   0.3   0:00.55 sshd     
    242 systemd+  20   0   17400   8832   7808 S   0.0   0.2   0:00.07 systemd+ 
    304 root      20   0   24560   7808   6912 S   0.0   0.2   0:00.09 systemd+ 
    292 systemd+  20   0   89888   7424   6656 S   0.0   0.2   0:00.11 systemd+ 
    714 root      20   0  710280   7180   1024 S   0.0   0.2   0:00.01 ___go_b+ 
    303 root      20   0   10208   7040   6016 S   0.0   0.2   0:00.03 sshd     
    327 root      20   0   23356   4824   1792 S   0.0   0.1   0:00.00 (sd-pam) 
    302 dbus      20   0    8664   4480   3968 S   0.0   0.1   0:00.07 dbus-da+ 
    339 root      20   0    7744   4224   3584 S   0.0   0.1   0:00.10 bash     
    333 root      20   0    7744   4096   3456 S   0.0   0.1   0:00.01 bash     
    719 root      20   0    4628   3584   3072 S   0.0   0.1   0:00.01 sh

# 这是因为 虽然PID已经被隔离了，但是ps、top等他们会从/proc读取数据，而/proc我们是没有隔离的,在后面我们会解决/proc隔离的问题
```

:::

<br />

### NET

::: details （1）NET隔离后无法访问互联网

```go
package main

import (
	"os"
	"os/exec"
	"syscall"
)

func main() {
	cmd := exec.Command("sh")

	cmd.SysProcAttr = &syscall.SysProcAttr{
		Cloneflags: syscall.CLONE_NEWNET,
	}
	cmd.Dir = "/root"
	cmd.Stdin = os.Stdin
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	if err := cmd.Run(); err != nil {
		panic(err)
	}
}
```

输出结果

```bash
sh-5.1# ip a
1: lo: <LOOPBACK> mtu 65536 qdisc noop state DOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00

sh-5.1# netstat -atlnpu
Active Internet connections (servers and established)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       PID/Program name

sh-5.1# ping www.baidu.com
ping: connect: Network is unreachable

# 分析
# 隔离NET后无法联网
```

:::

::: details （2）手动配置网络

```bash
# 1、创建一对虚拟网络设备接口：veth0 和 veth1
[root@archlinux ~]# ip link add name veth0 type veth peer name veth1

# 查看网络设备接口,其中 3 和 4 是我们刚创建的
[root@archlinux ~]# ip link show
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
2: ens33: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP mode DEFAULT group default qlen 1000
    link/ether 00:0c:29:03:d2:be brd ff:ff:ff:ff:ff:ff
    altname enp2s1
3: veth1@veth0: <BROADCAST,MULTICAST,M-DOWN> mtu 1500 qdisc noop state DOWN mode DEFAULT group default qlen 1000
    link/ether 8e:55:7b:43:e7:a5 brd ff:ff:ff:ff:ff:ff
4: veth0@veth1: <BROADCAST,MULTICAST,M-DOWN> mtu 1500 qdisc noop state DOWN mode DEFAULT group default qlen 1000
    link/ether 9a:ff:15:ed:5a:c6 brd ff:ff:ff:ff:ff:ff

# 2、将虚拟网络设备接口 veth1 移动到指定的进程的网络命名空间中, 381是进程PID，根据实际情况修改
[root@archlinux ~]# ip link set veth1 netns 381
[root@archlinux ~]# ip link show  # 看一下，少了一个接口：veth1
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
2: ens33: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP mode DEFAULT group default qlen 1000
    link/ether 00:0c:29:03:d2:be brd ff:ff:ff:ff:ff:ff
    altname enp2s1
4: veth0@if3: <BROADCAST,MULTICAST> mtu 1500 qdisc noop state DOWN mode DEFAULT group default qlen 1000
    link/ether 9a:ff:15:ed:5a:c6 brd ff:ff:ff:ff:ff:ff link-netnsid 0
sh-5.1# ip a  # 进程中看一下，多了一个接口设备:veth1
1: lo: <LOOPBACK> mtu 65536 qdisc noop state DOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
3: veth1@if4: <BROADCAST,MULTICAST> mtu 1500 qdisc noop state DOWN group default qlen 1000
    link/ether 8e:55:7b:43:e7:a5 brd ff:ff:ff:ff:ff:ff link-netnsid 0

# 3、给veth0配置地址并启用
[root@archlinux ~]# ip addr add 172.17.0.1/16 dev veth0
[root@archlinux ~]# ip link set veth0 up

# 4、给veth1配置IP地址、默认网关，并启用网卡
sh-5.1# ip addr add 172.17.0.2/16 dev veth1
sh-5.1# ip link set veth1 up
sh-5.1# route add default gw 172.17.0.1

# 5、配置IP转发功能 和 NAT网络地址转换
# 1.宿主机充当网关的角色，进程通过该网关访问 Internet
# 2.此时需要将进程发往Internet的数据包源地址替换为网关的IP地址，否则Internet无法回应这些数据包
# 3.-o ens33         表示匹配输出接口为 ens33 的数据包
# 4.-s 172.17.0.0/16 表示匹配源地址范围
# 5.-j MASQUERADE    表示将源IP地址替换为出口接口的IP地址
# 6.下面的iptables命令就是将 进程发送Internet的包的源地址替换为宿主机的IP
[root@archlinux ~]# echo 1 > /proc/sys/net/ipv4/ip_forward
[root@archlinux ~]# iptables -t nat -A POSTROUTING -o ens33 -j MASQUERADE          # 方式1
[root@archlinux ~]# iptables -t nat -A POSTROUTING -s 172.17.0.0/16 -j MASQUERADE  # 方式2

# 6、测试
sh-5.1# ping www.baidu.com
PING www.a.shifen.com (39.156.66.18) 56(84) bytes of data.
64 bytes from 39.156.66.18: icmp_seq=1 ttl=128 time=106 ms
64 bytes from 39.156.66.18: icmp_seq=2 ttl=128 time=283 ms
64 bytes from 39.156.66.18: icmp_seq=3 ttl=128 time=201 ms
64 bytes from 39.156.66.18: icmp_seq=4 ttl=128 time=108 ms
```

:::

<br />

### USER

::: details 点击查看详情

```go
package main

import (
	"os"
	"os/exec"
	"syscall"
)

func main() {
	cmd := exec.Command("sh")

	// 设置系统进程属性
	cmd.SysProcAttr = &syscall.SysProcAttr{
		// 创建一个新的用户命名空间
		Cloneflags: syscall.CLONE_NEWUSER,

		// 设置容器中的用户UID和GID
		// 设置的值必须在下面的UidMappings和GidMappings可以找到，
		// 否则会报错 invalid argument
		Credential: &syscall.Credential{
			Uid: uint32(100),
			Gid: uint32(100),
		},

		// 设置容器内和容器外用户映射规则
		// ContainerID 表示容器中的用户 ID
		// HostID 表示主机中的用户 ID
		// Size 表示映射数组的大小，这里我们只映射了一个，所以设置为1即可满足
		// 合起来就是：将容器中的用户 ID 映射为主机中的用户 ID
		UidMappings: []syscall.SysProcIDMap{
			{ContainerID: 100, HostID: 200, Size: 1},
		},
		GidMappings: []syscall.SysProcIDMap{
			{ContainerID: 100, HostID: 200, Size: 1},
		},

		// 启用或禁用 Linux setgroups() 系统调用的使用
		// setgroups() 系统调用用于设置进程的附加组 ID
		// 附加组 ID 是与进程相关联的一组权限集合
		// 为了提高容器的安全性，通常会禁用非 root 用户使用该系统调用
		GidMappingsEnableSetgroups: false,
	}

	cmd.Stdin = os.Stdin
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	if err := cmd.Run(); err != nil {
		panic(err)
	}
}
```

输出结果

```bash
# 确保 /proc/sys/user/max_user_namespaces 不为0
[root@localhost ~]# echo 14998 > /proc/sys/user/max_user_namespaces

# 100和200在我们的宿主机上都是不存在的ID，存在也没关系
[root@archlinux ~]# id 100
id: 100: no such user
[root@archlinux ~]# id 200
id: 200: no such user

# 输出结果
sh-5.1$ id
uid=100 gid=100 groups=100,65534(nobody)

# ----------------------------------------------------------------------------------------------------------
# 测试1：修改宿主机文件内容

# 宿主机上创建一个文件
[root@archlinux ~]# seq 10 > /tmp/1.txt

# 进程内进行修改，报错，因为没有权限
sh-5.1$ seq 3 > /tmp/1.txt
sh: /tmp/1.txt: Permission denied

# 修改文件权限，正好能和进程在宿主机的实际权限对应起来
[root@archlinux ~]# chown -R 200:200 /tmp/1.txt

# 进程内再次修改，成功
sh-5.1$ seq 3 > /tmp/1.txt

# ----------------------------------------------------------------------------------------------------------
# 测试2：删除宿主机文件

# 先检查一下
sh-5.1$ ls -l /tmp/1.txt
-rw-r--r-- 1 100 100 6 Apr 21 20:48 /tmp/1.txt

# 删除成功
sh-5.1$ rm -vf /tmp/1.txt
removed '/tmp/1.txt'
```

:::

<br />

### Mount（上）：挂载卸载

Mount必会的基础知识：[https://jinhui.dev/linux/document.html#mount](https://jinhui.dev/linux/document.html#mount)

注意事项：

* Mount操作非常非常容易报错，而且错误信息不直观
* 如果要停止进程，最好不要直接在GoLand中点击Stop按钮，因为这会导致defer不被执行，进而导致卸载操作不执行，解决办法是使用Ctrl+D退出Shell进程

::: details （1）Go Mount示例：执行挂载报错：block device required

```go
package main

import (
	"log"
	"os"
	"os/exec"
	"syscall"
)

func main() {
	cmd := exec.Command("bash")

	cmd.SysProcAttr = &syscall.SysProcAttr{
		// 创建一个Mount命名空间
		// 注意并没有 syscall.CLONE_NEWMOUNT，而是使用 syscall.CLONE_NEWNS
		Cloneflags: syscall.CLONE_NEWNS,
	}
	cmd.Dir = "/root"
	cmd.Stdin = os.Stdin
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	if err := cmd.Start(); err != nil {
		panic(err)
	}

	// 定义变量
	source := "/source"
	target := "/target"

	// 挂载
	// 参数说明
	// 	source string	挂载源，可以是设备名、目录名、网络地址等
	// 	target string	挂载目标，即将文件系统挂载到哪个目录下。该目录必须已经存在，且为空目录
	// 	fstype string	文件系统类型，比如ext4、xfs、ntfs 等
	// 	flags uintptr	挂载选项，可以使用 syscall.MS_* 常量指定选项，uintptr(0)代表不添加任何选项
	// 	data string		特定的挂载选项，通常是指定一些特殊选项的参数，例如 NFSv3 中的 proto=tcp,port=2049
	err := syscall.Mount(source, target, "xfs", 0, "")
	if err != nil {
		log.Fatalf("mount error: %s\n", err.Error())
	}

	// 卸载
	defer func() {
		err := syscall.Unmount(target, 0)
		if err != nil {
			log.Fatalf("unmount error: %s\n", err.Error())
		}
	}()

	if err := cmd.Wait(); err != nil {
		panic(err)
	}
}
```

输出结果

```bash
# 创建一个文件,用作挂载设备
[root@archlinux ~]# dd if=/dev/zero of=/source bs=1M count=1024

# 设备格式化为xfs文件系统
[root@archlinux ~]# mkfs -t xfs /source

# 创建一个空目录,用作挂载点
[root@archlinux ~]# mkdir /target

# 执行代码报错：需要一个块设备，其实就是 /source 的参数写的有问题
2023/04/22 10:42:48 mount error: block device required
```

:::

::: details （2）Go Mount示例：使用losetup命令修复挂载报错

```bash
# 检查一下可用的块设备
[root@archlinux ~]# losetup -f
/dev/loop0

# 将可用的块设备与文件关联起来
[root@archlinux ~]# losetup /dev/loop0 /target

# 查看关联
[root@archlinux ~]# losetup -a
/dev/loop0: [2050]:1776699 (/target)

# 修改Go代码，将 /source 修改为 /dev/loop0，然后再次执行代码
[root@archlinux ~]# df -hT
Filesystem     Type      Size  Used Avail Use% Mounted on
...
/dev/loop0     xfs       960M   39M  922M   5% /target

# 退出Shell，可使用Ctrl+D 或者 exit，不要直接在GoLand点Stop按钮，这会导致卸载操作不能执行
# 检查是否正常卸载，输出为空代表正常
[root@archlinux ~]# 按下Ctrl+D
exit
[root@archlinux ~]# mount | grep  /target
```

:::

<br />

### Mount（中）：参数设置

说明：

* 使用 `man 2 mount` 可以查看挂载参数说明
* 使用 `man umount2` 可以查看卸载参数说明

::: details （1）Mount选项：syscall.MS_BIND：绑定挂载（可以将目录/挂载点作为挂载源）

```go
package main

import (
	"log"
	"os"
	"os/exec"
	"path/filepath"
	"syscall"
)

func main() {
	cmd := exec.Command("bash")

	cmd.SysProcAttr = &syscall.SysProcAttr{
		// 创建一个Mount命名空间
		// 注意并没有 syscall.CLONE_NEWMOUNT，而是使用 syscall.CLONE_NEWNS
		Cloneflags: syscall.CLONE_NEWNS,
	}
	cmd.Dir = "/root"
	cmd.Stdin = os.Stdin
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	if err := cmd.Start(); err != nil {
		panic(err)
	}

	// 定义变量
	source := "/source"
	target := "/target"

	// 初始化目录
	err := os.MkdirAll(source, 0700)
	if err != nil {
		panic(err)
	}

	err = os.MkdirAll(target, 0700)
	if err != nil {
		panic(err)
	}

	// 目录中写点内容
	err = os.WriteFile(filepath.Join(source, "source.txt"), []byte{}, 0700)
	if err != nil {
		panic(err)
	}
	err = os.WriteFile(filepath.Join(target, "target.txt"), []byte{}, 0700)
	if err != nil {
		panic(err)
	}

	// 执行挂载操作: 绑定挂载,将一个目录挂载到另一个目录中
	err = syscall.Mount(source, target, "", syscall.MS_BIND, "")
	if err != nil {
		log.Fatalf("mount error: %s\n", err.Error())
	}

	// 卸载
	defer func() {
		err := syscall.Unmount(target, 0)
		if err != nil {
			log.Fatalln("umount error: ", err.Error())
		}
	}()

	if err := cmd.Wait(); err != nil {
		panic(err)
	}
}
```

输出结果

```bash
# 对应的Shell命令
# mount --bind /source /target

# ------------------------------------------------------------------------------------------

# 进程内查看挂载
[root@archlinux ~]# mount |grep -E '/target\b'                 
/dev/sda2 on /target type xfs (rw,relatime,attr2,inode64,logbufs=8,logbsize=32k,noquota)

# 宿主机上查看挂载,输出为空,因为隔离了Mount命名空间
[root@archlinux ~]# mount |grep -E '/source\b'

# 查看数据
[root@archlinux ~]# md5sum /{source,target}/*
d41d8cd98f00b204e9800998ecf8427e  /source/source.txt
d41d8cd98f00b204e9800998ecf8427e  /target/source.txt
```

:::

::: details （2）Mount选项：其他挂载选项

| 挂载选项              | 说明                                       |
| --------------------- | ------------------------------------------ |
| syscall.MS_SHARED     | 共享传播类型（双向传播）                   |
| syscall.MS_SLAVE      | 主从传播类型（单向传播）                   |
| syscall.MS_PRIVATE    | 私有传播类型（可以作为bind mount的源）     |
| syscall.MS_UNBINDABLE | 私有传播类型（不能作为bind mount的源）     |
| syscall.MS_REC        | 设置递归，常与 绑定挂载 或 传播类型 相结合 |

:::

::: details （1）Unmount选项：syscall.MNT_FORCE：强制卸载

```go
package main

import (
	"log"
	"os"
	"os/exec"
	"syscall"
	"time"
)

func main() {
	cmd := exec.Command("bash")

	cmd.SysProcAttr = &syscall.SysProcAttr{
		// 创建一个Mount命名空间
		// 注意并没有 syscall.CLONE_NEWMOUNT，而是使用 syscall.CLONE_NEWNS
		Cloneflags: syscall.CLONE_NEWNS,
	}
	cmd.Dir = "/root"
	cmd.Stdin = os.Stdin
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	if err := cmd.Start(); err != nil {
		panic(err)
	}

	// 定义变量
	source := "/dev/loop0"
	target := "/target"

	// 挂载
	err := syscall.Mount(source, target, "xfs", 0, "")
	if err != nil {
		log.Fatalf("mount error: %s\n", err.Error())
	}

	// 卸载
	defer func() {
		for {
			// syscall.MNT_FORCE
			// 	1、根据字面意思是强制卸载
			//	2、即使是强制卸载，也有可能卸载失败
			//	  比如有进程在占用时会报错 device or resource busy
			//  3、强制卸载有损害数据的风险，慎用
			err := syscall.Unmount(target, syscall.MNT_FORCE)
			if err != nil {
				log.Printf("unmount error: %s: %s\n", target, err.Error())
			} else {
				log.Printf("unmount success: %s\n", target)
				break
			}
			time.Sleep(time.Second)
		}
	}()

	if err := cmd.Wait(); err != nil {
		panic(err)
	}
}
```

输出结果

```bash
# 准备工作
[root@archlinux ~]# dd if=/dev/zero of=/source bs=1M count=1024   # 创建一个文件用作挂载设备
[root@archlinux ~]# mkfs -t xfs /source                           # 格式化为xfs文件系统
[root@archlinux ~]# mkdir /target                                 # 创建一个空目录,用作挂载点
[root@archlinux ~]# losetup -f                                    # 查看可用的块设备
/dev/loop0
[root@archlinux ~]# losetup /dev/loop0 /source                    # 文件和块设备关联

# 执行代码
[root@archlinux ~]#

# 新开一个终端，进入挂载目录中，以达到进程占用的目的
[root@archlinux ~]# cd /target

# Ctrl+D退出进程
2023/04/25 15:10:03 unmount error: /target: device or resource busy
2023/04/25 15:10:04 unmount error: /target: device or resource busy
2023/04/25 15:10:05 unmount error: /target: device or resource busy
2023/04/25 15:10:06 unmount error: /target: device or resource busy
2023/04/25 15:10:07 unmount error: /target: device or resource busy
2023/04/25 15:10:08 unmount error: /target: device or resource busy
2023/04/25 15:10:09 unmount error: /target: device or resource busy

# 此时另一个终端切换到其他目录中，观察是否可以卸载成功
2023/04/25 15:10:42 unmount error: /target: device or resource busy
2023/04/25 15:10:43 unmount success: /target
```

:::

::: details （2）Unmount选项：syscall.MNT_DETACH：延迟卸载

```go
package main

import (
	"log"
	"os"
	"os/exec"
	"syscall"
	"time"
)

func main() {
	cmd := exec.Command("bash")

	cmd.SysProcAttr = &syscall.SysProcAttr{
		// 创建一个Mount命名空间
		// 注意并没有 syscall.CLONE_NEWMOUNT，而是使用 syscall.CLONE_NEWNS
		Cloneflags: syscall.CLONE_NEWNS,
	}
	cmd.Dir = "/root"
	cmd.Stdin = os.Stdin
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	if err := cmd.Start(); err != nil {
		panic(err)
	}

	// 定义变量
	source := "/dev/loop0"
	target := "/target"

	// 挂载
	err := syscall.Mount(source, target, "xfs", 0, "")
	if err != nil {
		log.Fatalf("mount error: %s\n", err.Error())
	}

	// 卸载
	defer func() {
		for {
			// syscall.MNT_DETACH
            // 等同于umount -l
			err := syscall.Unmount(target, syscall.MNT_DETACH)
			if err != nil {
				log.Printf("unmount error: %s: %s\n", target, err.Error())
			} else {
				log.Printf("unmount success: %s\n", target)
				break
			}
			time.Sleep(time.Second)
		}
	}()

	if err := cmd.Wait(); err != nil {
		panic(err)
	}
}
```

输出结果

```bash
# 准备工作
[root@archlinux ~]# dd if=/dev/zero of=/source bs=1M count=1024   # 创建一个文件用作挂载设备
[root@archlinux ~]# mkfs -t xfs /source                           # 格式化为xfs文件系统
[root@archlinux ~]# mkdir /target                                 # 创建一个空目录,用作挂载点
[root@archlinux ~]# losetup -f                                    # 查看可用的块设备
/dev/loop0
[root@archlinux ~]# losetup /dev/loop0 /source                    # 文件和块设备关联

# 执行代码
[root@archlinux ~]#

# 新开一个终端，进入挂载目录中，以达到进程占用的目的
[root@archlinux ~]# cd /target

# Ctrl+D退出进程，直接就能卸载成功
[root@archlinux ~]# 
exit
2023/04/25 15:13:18 unmount success: /target

# mount查看也表示卸载成功
[root@archlinux target]# mount | grep target

# 但实际上之前占用的进程还能正常写入数据
[root@archlinux target]# seq 10 > 1.txt

# 切换到其他目录，此时系统才会真正卸载，查看一下目录为空
[root@archlinux target]# cd
[root@archlinux ~]# ls -l /target
total 0
```

:::

::: details （3）Unmount选项：syscall.MNT_EXPIRE：标记挂载点过期，系统空闲时删除

```go
package main

import (
	"log"
	"os"
	"os/exec"
	"syscall"
	"time"
)

func main() {
	cmd := exec.Command("bash")

	cmd.SysProcAttr = &syscall.SysProcAttr{
		// 创建一个Mount命名空间
		// 注意并没有 syscall.CLONE_NEWMOUNT，而是使用 syscall.CLONE_NEWNS
		Cloneflags: syscall.CLONE_NEWNS,
	}
	cmd.Dir = "/root"
	cmd.Stdin = os.Stdin
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	if err := cmd.Start(); err != nil {
		panic(err)
	}

	// 定义变量
	source := "/dev/loop0"
	target := "/target"

	// 挂载
	err := syscall.Mount(source, target, "xfs", 0, "")
	if err != nil {
		log.Fatalf("mount error: %s\n", err.Error())
	}

	// 卸载
	defer func() {
		for {
			// syscall.MNT_EXPIRE
			// 	1、将挂载点标记为"过期"，表示该挂载点已经不再使用
			// 	2、当操作系统检测到一个挂载点被标记为"过期"时，它将尝试卸载该挂载点
			// 	3、所以说syscall.MNT_EXPIRE并不会立即卸载挂载点
			//  4、注意：它不能和 syscall.MNT_FORCE 或 syscall.MNT_DETACH 共同使用
			//  5、注意：并非所有的文件系统都支持此选项,其他文件系统还需要测试
			// 测试结果
			// 	1、第一次调用时总会报错 resource temporarily unavailable
			//  2、然后休眠1秒再次调用就会成功
			err := syscall.Unmount(target, syscall.MNT_EXPIRE)
			if err != nil {
				log.Printf("unmount error: %s: %s\n", target, err.Error())
			} else {
				log.Printf("unmount success: %s\n", target)
				break
			}
			time.Sleep(time.Second)
		}
	}()

	if err := cmd.Wait(); err != nil {
		panic(err)
	}
}
```

输出结果

```bash
# 准备工作
[root@archlinux ~]# dd if=/dev/zero of=/source bs=1M count=1024   # 创建一个文件用作挂载设备
[root@archlinux ~]# mkfs -t xfs /source                           # 格式化为xfs文件系统
[root@archlinux ~]# mkdir /target                                 # 创建一个空目录,用作挂载点
[root@archlinux ~]# losetup -f                                    # 查看可用的块设备
/dev/loop0
[root@archlinux ~]# losetup /dev/loop0 /source                    # 文件和块设备关联

# 执行代码
[root@archlinux ~]# 
exit
2023/04/25 15:18:08 unmount error: /target: resource temporarily unavailable
2023/04/25 15:18:09 unmount success: /target
```

:::

::: details （4）实现一个非常简易的 umount 命令和 umount -l 选项

```go
package main

import (
	"flag"
	"fmt"
	"os"
	"syscall"
)

func main() {
	// 判断参数个数
	if len(os.Args) < 2 {
		fmt.Printf("Usage: %s [-l] <target>\n", os.Args[0])
		os.Exit(1)
	}

	// 定义并解析命令行参数
	var lazy bool
	flag.BoolVar(&lazy, "l", false, "detach the filesystem now, clean up things later")
	flag.Parse()

	// 挂载点
	target := flag.Arg(0)

	// 先正常卸载
	err := syscall.Unmount(target, 0)

	// 卸载成功则退出
	if err == nil {
		os.Exit(0)
	}

	// 卸载失败则报错（没有使用延迟卸载的情况）
	if !lazy {
		fmt.Printf("unmount error: %s: %s\n", target, err.Error())
		os.Exit(1)
	}

	// 延迟卸载-l/--lazy选项
	if lazy {
		_ = syscall.Unmount(target, syscall.MNT_DETACH)
	}
}
```

输出结果

```bash
# 查看 umount -l 选项说明
[root@archlinux ~]# umount -h | grep --color=auto '\--lazy'
 -l, --lazy              detach the filesystem now, clean up things later

# 编译代码
[root@archlinux ~]# go build -o main main.go

# --------------------------------------------------------------------------------------
# 测试1：正常卸载成功
[root@archlinux ~]# mount -t xfs /source /target	    # 挂载
[root@archlinux ~]# mount | grep target				    # 检查
/dev/loop0 on /target type xfs (rw,relatime,attr2,inode64,logbufs=8,logbsize=32k,noquota)

[root@archlinux ~]# ./main /target					    # 卸载
[root@archlinux ~]# mount | grep target  				# 检查，输出为空

# --------------------------------------------------------------------------------------
# 测试2：进程占用时延迟卸载成功
[root@archlinux ~]# mount -t xfs /source /target	    # 挂载
[root@archlinux ~]# mount | grep target				    # 检查
/dev/loop0 on /target type xfs (rw,relatime,attr2,inode64,logbufs=8,logbsize=32k,noquota)

[root@archlinux ~]# cd /target						    # 新开一个终端，占用挂载点

[root@archlinux ~]# ./main /target					    # 正常卸载失败
unmount error: /target: device or resource busy

[root@archlinux ~]# ./main -l /target			    	# 延迟卸载
[root@archlinux ~]# mount | grep target				    # 检查，输出为空

[root@archlinux target]# seq 10 > 1.txt	                # 另一个终端还能正常写入
[root@archlinux target]# ll							
total 4
-rw-r--r-- 1 root root 21 Apr 22 20:57 1.txt

[root@archlinux target]# cd							    # 另一个终端退出挂载点，然后再查看，目录为空
[root@archlinux ~]# ls -l /target                       # 原因是现在才真正的卸载了，所谓延迟卸载
total 0
```

:::

<br />

### Mount（下）：隔离系统

说明：

* 使用 `man 2 pivot_root` 查看系统调用说明

::: details （1）使用 Shell 隔离根文件系统

```bash
# 1、下载alpine官方提供的rootfs
[root@archlinux ~]# mkdir rootfs
[root@archlinux ~]# wget https://dl-cdn.alpinelinux.org/alpine/v3.17/releases/x86_64/alpine-minirootfs-3.17.3-x86_64.tar.gz
[root@archlinux ~]# tar zxf alpine-minirootfs-3.17.3-x86_64.tar.gz -C rootfs

# 2、在rootfs中创建一个目录，用于临时存放【旧根】
[root@archlinux ~]# mkdir -p rootfs/.putold

# 3、创建一个新的Mount命名空间，并移动当前进程到新的命名空间中去
[root@archlinux ~]# unshare --mount

# 4、pivot_root命令: 执行报错
[root@archlinux ~]# pivot_root rootfs rootfs/.putold
pivot_root: failed to change root from `rootfs' to `rootfs/.putold': Device or resource busy

# 5、pivot_root命令: 修复报错
[root@archlinux ~]# mount --bind rootfs rootfs
[root@archlinux ~]# mount | grep rootfs
/dev/sda2 on /root/rootfs type xfs (rw,relatime,attr2,inode64,logbufs=8,logbsize=32k,noquota)
[root@archlinux ~]# pivot_root rootfs rootfs/.putold

# 6、调整一下PATH变量
[root@archlinux ~]# ls                          # 执行ls报错
-bash: ls: command not found
[root@archlinux ~]# export PATH=/bin:${PATH}    # 调整PATH变量
[root@archlinux ~]# ls                          # 再次执行成功
alpine-minirootfs-3.17.3-x86_64.tar.gz  rootfs

# 7、切换到【新根】的家目录中去
[root@archlinux ~]# ls                          # 在【旧根】的家目录下能看到文件
alpine-minirootfs-3.17.3-x86_64.tar.gz  rootfs
[root@archlinux ~]# cd                          # 切换到【新根】的家目录下
[root@archlinux ~]# ls                          # 输出为空，已经无法看到文件了

# 8、挂载/proc
[root@archlinux ~]# mount | wc -l
mount: no /proc/mounts
0
[root@archlinux ~]# mount -t proc proc /proc
[root@archlinux ~]# mount | wc -l
28

# 9、挂载/devtmpfs
[root@archlinux ~]# mount -t devtmpfs devtmpfs /dev

# 10、挂载...(根据实际情况调整)

# 11、卸载旧根(延迟卸载)
[root@archlinux ~]# umount -l /.putold
[root@archlinux ~]# mount
/dev/sda2 on / type xfs (rw,relatime,attr2,inode64,logbufs=8,logbsize=32k,noquota)
devtmpfs on /dev type devtmpfs (rw,relatime,size=4096k,nr_inodes=494882,mode=755,inode64)
proc on /proc type proc (rw,relatime)

# 12、删除旧根的挂载目录
[root@archlinux ~]# rmdir /.putold
```

:::

::: details （2）使用 Go 隔离根文件系统：测试成功啦

```go
package main

import (
	"os"
	"os/exec"
	"syscall"

	"golang.org/x/sys/unix"
)

func main() {
	// 第一次启动,设置Namespace,然后程序调用自身
	if os.Args[0] != "/proc/self/exe" {
		cmd := &exec.Cmd{
			Path: "/proc/self/exe",
			Args: append([]string{"/proc/self/exe"}, os.Args[1:]...),
			SysProcAttr: &syscall.SysProcAttr{
				Pdeathsig:  unix.SIGTERM,
				Cloneflags: syscall.CLONE_NEWNS | syscall.CLONE_NEWPID,
			},
			Dir:    "/root",
			Stdin:  os.Stdin,
			Stdout: os.Stdout,
			Stderr: os.Stderr,
		}

		if err := cmd.Run(); err != nil {
			panic(err)
		}
		os.Exit(0)
	}

	// 下面的代码运行在新的Namespace中

	// 设置根为 私有传播模式+递归设置,否则会报错：invalid argument
	err := syscall.Mount("/", "/", "", syscall.MS_PRIVATE|syscall.MS_REC, "")
	if err != nil {
		panic(err)
	}

	// pivot_root调用: 准备工作: 定义变量
	newroot := "rootfs"
	putold := "rootfs/.putold"
	oldroot := "/.putold"

	// pivot_root调用: 准备工作: 创建putold目录
	err = os.MkdirAll(putold, 0700)
	if err != nil {
		panic(err)
	}

	// pivot_root调用: 准备工作: 先挂载一次 newroot
	err = syscall.Mount(newroot, newroot, "", syscall.MS_BIND|syscall.MS_REC, "")
	if err != nil {
		panic(err)
	}

	// pivot_root调用: 执行调用
	err = syscall.PivotRoot(newroot, putold)
	if err != nil {
		panic(err)
	}

	// pivot_root调用: 初始化: 切换根
	err = syscall.Chdir("/")
	if err != nil {
		panic(err)
	}

	// pivot_root调用: 初始化: 挂载 /proc
	err = syscall.Mount("proc", "/proc", "proc", 0, "")
	if err != nil {
		panic(err)
	}

	// pivot_root调用: 初始化: 挂载 /devtmpfs
	err = syscall.Mount("devtmpfs", "/dev", "devtmpfs", 0, "")
	if err != nil {
		panic(err)
	}

	// pivot_root调用: 清理工作：延迟卸载老根
	err = syscall.Unmount(oldroot, syscall.MNT_DETACH)
	if err != nil {
		panic(err)
	}

	// pivot_root调用清理工作：删除临时文件夹
	err = os.Remove(oldroot)
	if err != nil {
		panic(err)
	}

	// 执行真正的进程
	cmd := exec.Command("/bin/sh")

	cmd.Stdin = os.Stdin
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr
	cmd.Dir = "/root"
	cmd.Env = []string{"PATH=/bin:/usr/local/sbin:/usr/local/bin:/usr/bin"}

	if err := cmd.Run(); err != nil {
		panic(err)
	}
}
```

输出结果

```bash
# 1、下载alpine官方提供的rootfs
[root@archlinux ~]# mkdir rootfs
[root@archlinux ~]# wget https://dl-cdn.alpinelinux.org/alpine/v3.17/releases/x86_64/alpine-minirootfs-3.17.3-x86_64.tar.gz
[root@archlinux ~]# tar zxf alpine-minirootfs-3.17.3-x86_64.tar.gz -C rootfs

# 2、执行代码
~ # mount
/dev/sda2 on / type xfs (rw,relatime,attr2,inode64,logbufs=8,logbsize=32k,noquota)
proc on /proc type proc (rw,relatime)
devtmpfs on /dev type devtmpfs (rw,relatime,size=4096k,nr_inodes=494877,mode=755,inode64)

# 3、检查宿主机有没有受到影响
[root@archlinux ~]# mount | wc -l
25

# 4、除了隔离Mount，我们还隔离了PID，为的就是解决之前遗留的问题
~ # ps aux
PID   USER     TIME  COMMAND
    1 root      0:00 /proc/self/exe
    6 root      0:00 /bin/sh
    7 root      0:00 ps aux

# 但是又发现一个问题：/proc/self/exe不需要显示，/bin/sh应该为PID为1
```

:::

::: details （3）使用 Go 隔离根文件系统：优化PID显示问题

```go
	// 执行真正的进程: 有问题的代码
	//cmd := exec.Command("/bin/sh")
	//cmd.Stdin = os.Stdin
	//cmd.Stdout = os.Stdout
	//cmd.Stderr = os.Stderr
	//cmd.Dir = "/root"
	//cmd.Env = []string{"PATH=/bin:/usr/local/sbin:/usr/local/bin:/usr/bin"}
	//if err := cmd.Run(); err != nil {
	//	panic(err)
	//}

	// 切换到指定的工作目录
	if err := syscall.Chdir("/root"); err != nil {
		panic(err)
	}

	// 执行真正的进程: syscall.Exec可以直接让指定的进程代替/proc/self/exe
	// argv0：要执行的二进制文件的路径
	// argv：包含要传递给新进程的命令行参数
	// envv：包含要传递给新进程的环境变量,每个字符串都是形如 "key=value" 的形式
	argv0 := "/bin/sh"
	argv := append([]string{"/bin/sh"}, os.Args[1:]...)
	envv := append(os.Environ(), "PATH=/bin:/usr/local/sbin:/usr/local/bin:/usr/bin")
	if err := syscall.Exec(argv0, argv, envv); err != nil {
		panic(err)
	}
```

输出结果

```bash
~ # ps aux
PID   USER     TIME  COMMAND
    1 root      0:00 /bin/sh
    6 root      0:00 ps aux
```

:::

<br />

### TIME

<br />

### CGROUP

<br />

### clone和unshare系统调用

**Linux系统调用**

* `clone` 创建一个子进程，使子进程加入新的 namespace，父进程namespace保持不变
* `unshare` 不会创建子进程，直接使当前进程加入新的 namespace
* 查看文档 `man 2 clone` 和 `man 2 unshare` 

**Go代码参数**

* syscall.SysProcAttr 包含 `Cloneflags `和 `Unshareflags` 参数，都是uintptr类型的值
* `syscall.Unshare(flags int) ` 方法，对应Linux unshare系统调用

<br />

::: details （1）unshare系统调用：Go syscall.Unshare

```go
package main

import (
	"os"
	"os/exec"
	"syscall"
)

func main() {
	// 创建一个新的UTS命名空间，并使当前进程加入新的命名空间
	err := syscall.Unshare(syscall.CLONE_NEWUTS)
	if err != nil {
		panic(err)
	}

	// 下面的代码运行在新的Namespace中

	err = syscall.Sethostname([]byte("mydocker"))
	if err != nil {
		panic(err)
	}

	cmd := exec.Command("bash")

	cmd.Dir = "/root"
	cmd.Stdin = os.Stdin
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	if err := cmd.Run(); err != nil {
		panic(err)
	}
}
```

输出结果

```bash
# 执行程序，发现进程内的主机名已经被修改
[root@mydocker ~]# hostname
mydocker

# 查看宿主机的主机名，没有变化，测试成功
[root@archlinux ~]# hostname
archlinux

# 分析
# 1、疑问：是不是可以直接代替/proc/self/exe呢？
# 2、使用更底层的写法
	// 创建一个新的UTS命名空间，并使当前进程加入新的命名空间
	//err := syscall.Unshare(syscall.CLONE_NEWUTS)
	//if err != nil {
	//	panic(err)
	//}

	// 上面的代码也可以这样写
	_, _, errno := syscall.Syscall(syscall.SYS_UNSHARE, syscall.CLONE_NEWUTS, 0, 0)
	if errno != 0 {
		panic(errno.Error())
	}
```

:::

::: details （2）clone系统调用和unshare系统调用的区别

**clone系统调用**

```go
package main

import (
	"os"
	"syscall"
)

func main() {
	// Linux clone 系统调用
	pid, _, errno := syscall.Syscall(syscall.SYS_CLONE, syscall.CLONE_NEWUTS, 0, 0)
	if errno != 0 {
		panic(errno.Error())
	}

	// 区分父进程和子进程
	if pid == 0 {
		// 子进程中执行
		argv0 := "/bin/bash"
		argv := append([]string{"/bin/sh"}, os.Args[1:]...)
		envv := append(os.Environ(), "PATH=/bin:/usr/local/sbin:/usr/local/bin:/usr/bin")
		if err := syscall.Exec(argv0, argv, envv); err != nil {
			panic(err)
		}
	} else {
		// 父进程中执行
		_, err := syscall.Wait4(int(pid), nil, 0, nil)
		if err != nil {
			panic(err)
		}
	}
}
```

输出结果

```bash
sh-5.1#

# ------------------------------------------------------------------------------
# 以下在宿主机执行

[root@archlinux ~]# pstree -pl
systemd(1)─┬─agetty(304)
		   ...
           ├─sshd(298)─┬─sshd(478)─┬─bash(488)───pstree(1236)
           │           │           └─bash(545)
           │           └─sshd(501)───___1go_build_ex(1229)─┬─bash(1234)
           │                                               ├─{___1go_build_ex}(1230)
           │                                               ├─{___1go_build_ex}(1231)
           │                                               ├─{___1go_build_ex}(1232)
           │                                               └─{___1go_build_ex}(1233)

# 宿主机UTS
[root@archlinux ~]# ls -l /proc/self/ns/uts
lrwxrwxrwx 1 root root 0 Apr 28 17:29 /proc/self/ns/uts -> 'uts:[4026531838]'

# 父进程UTS
[root@archlinux ~]# ls -l /proc/1229/ns/uts
lrwxrwxrwx 1 root root 0 Apr 28 17:27 /proc/1229/ns/uts -> 'uts:[4026531838]'

# 子进程UTS
[root@archlinux ~]# ls -l /proc/1234/ns/uts
lrwxrwxrwx 1 root root 0 Apr 28 17:27 /proc/1234/ns/uts -> 'uts:[4026532576]'
```

<br />

**unshare系统调用**

```go
package main

import (
	"os"
	"os/exec"
	"syscall"
)

func main() {
	// Linux unshare 系统调用
	_, _, errno := syscall.Syscall(syscall.SYS_UNSHARE, syscall.CLONE_NEWUTS, 0, 0)
	if errno != 0 {
		panic(errno.Error())
	}

	//下面的代码运行在新的Namespace中

	err := syscall.Sethostname([]byte("mydocker"))
	if err != nil {
		panic(err)
	}

	cmd := exec.Command("bash")

	cmd.Dir = "/root"
	cmd.Stdin = os.Stdin
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	if err := cmd.Run(); err != nil {
		panic(err)
	}
}
```

输出结果

```bash
[root@mydocker ~]#

# ------------------------------------------------------------------------------
# 以下在宿主机执行

[root@archlinux ~]# pstree -pl
systemd(1)─┬─agetty(304)
		   ...
           ├─sshd(298)─┬─sshd(478)─┬─bash(488)───pstree(1253)
           │           │           └─bash(545)
           │           └─sshd(501)───___1go_build_ex(1247)─┬─bash(1252)
           │                                               ├─{___1go_build_ex}(1248)
           │                                               ├─{___1go_build_ex}(1249)
           │                                               ├─{___1go_build_ex}(1250)
           │                                               └─{___1go_build_ex}(1251)
           
# 宿主机UTS
[root@archlinux ~]# ls -l /proc/self/ns/uts
lrwxrwxrwx 1 root root 0 Apr 28 17:29 /proc/self/ns/uts -> 'uts:[4026531838]'

# 父进程UTS
[root@archlinux ~]# ls -l /proc/1247/ns/uts
lrwxrwxrwx 1 root root 0 Apr 28 17:30 /proc/1247/ns/uts -> 'uts:[4026532576]'

# 子进程UTS
[root@archlinux ~]# ls -l /proc/1252/ns/uts
lrwxrwxrwx 1 root root 0 Apr 28 17:30 /proc/1252/ns/uts -> 'uts:[4026532576]'
```



:::

::: details （3）syscall.SysProcAttr：Cloneflags 和 Unshareflags的不同

```go
// 经过测试，好像并没有什么不同，但感觉哪里又有些不对？
```

:::

<br />

### 进入指定进程的命名空间

Github：[https://github.com/opencontainers/runc/tree/main/libcontainer/nsenter](https://github.com/opencontainers/runc/tree/main/libcontainer/nsenter)

::: details （1）使用Shell命令 nsenter 进入指定命名空间

```bash
# 终端1：创建一个UTS命名空间，并打开bash
[root@archlinux ~]# unshare --uts bash
[root@archlinux ~]# hostname mydocker
[root@archlinux ~]# echo $$
654

# 终端2：使用nsenter进入 指定进程的某个命名空间
[root@archlinux ~]# nsenter -t 654 --uts
[root@mydocker ~]# hostname
mydocker
```

:::

::: details （2）使用Go进入指定命名空间

```go
package main

import (
	"fmt"
	"os"
	"os/exec"
)

/*
#cgo LDFLAGS: -lutil
#include <sched.h>
#include <unistd.h>

void enter_namespace(int fd) {
    setns(fd, 0);
}
*/
import "C"

// EnterNamespace enters the namespace of the specified PID and executes the specified program
func EnterNamespace(pid int, programPath string) error {
	// Open the process's namespace file
	nsPath := fmt.Sprintf("/proc/%d/ns", pid)
	nsFile, err := os.Open(nsPath)
	if err != nil {
		return fmt.Errorf("failed to open namespace file: %w", err)
	}
	defer nsFile.Close()

	// Get the file descriptor of the namespace file
	nsFd := nsFile.Fd()

	// Use C function to enter the namespace
	C.enter_namespace(C.int(nsFd))

	// Execute the specified program in the new namespace
	cmd := exec.Command(programPath)
	cmd.Stdin = os.Stdin
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr
	if err := cmd.Run(); err != nil {
		return fmt.Errorf("failed to execute program: %w", err)
	}

	return nil
}

func main() {
	// Example usage: enter the namespace of PID 12345 and execute the 'ls' command
	pid := 1517
	program := "/bin/bash"
	if err := EnterNamespace(pid, program); err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
}
```

:::

<br />
