# MyDocker

<br />

## 环境配置

**开发环境参数**

* Windows 10（开发环境）
* GoLand（开发环境）
* Go 1.20.1（开发环境）

**GoLand配置**

* 配置系统参数为Linux，这样我们就可以在调用Go中的Linux API
* 配置运行目标为Linux，这样我们就可以在GoLand中启动程序时直接运行在Linux上

**运行环境列表**

* CentOS 7
* Arch Linux

<br />

## NameSpace

### 命名空间的不同类别

::: details 点击查看详情

```bash
# CentOS 7: 6种
[root@localhost ~]# ls -lh /proc/sys/user/max_*_namespaces
-rw-r--r--. 1 root root 0 Apr 18 20:54 /proc/sys/user/max_ipc_namespaces
-rw-r--r--. 1 root root 0 Apr 18 20:54 /proc/sys/user/max_mnt_namespaces
-rw-r--r--. 1 root root 0 Apr 18 20:54 /proc/sys/user/max_net_namespaces
-rw-r--r--. 1 root root 0 Apr 18 20:52 /proc/sys/user/max_pid_namespaces
-rw-r--r--. 1 root root 0 Apr 18 20:47 /proc/sys/user/max_user_namespaces
-rw-r--r--. 1 root root 0 Apr 18 20:53 /proc/sys/user/max_uts_namespaces

# Arch Linux: 8种
[root@archlinux ~]# ls -lh /proc/sys/user/max_*_namespaces
-rw-r--r-- 1 root root 0 Apr 20 04:03 /proc/sys/user/max_cgroup_namespaces
-rw-r--r-- 1 root root 0 Apr 20 04:03 /proc/sys/user/max_ipc_namespaces
-rw-r--r-- 1 root root 0 Apr 20 04:03 /proc/sys/user/max_mnt_namespaces
-rw-r--r-- 1 root root 0 Apr 20 04:03 /proc/sys/user/max_net_namespaces
-rw-r--r-- 1 root root 0 Apr 20 04:03 /proc/sys/user/max_pid_namespaces
-rw-r--r-- 1 root root 0 Apr 20 04:03 /proc/sys/user/max_time_namespaces
-rw-r--r-- 1 root root 0 Apr 20 04:03 /proc/sys/user/max_user_namespaces
-rw-r--r-- 1 root root 0 Apr 20 04:03 /proc/sys/user/max_uts_namespaces

# 分析
# 1、多出来的两种是cgroup_namespaces和time_namespaces
# 2、这两种命名空间是由高版本的Linux kernel提供的
```

:::

<br />

### 命名空间的数量限制

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

# 临时修改,系统重启后丢失
echo 14998 > /proc/sys/user/max_user_namespaces
```

:::

<br />

### UTS

::: details （1）第一个测试

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
		// 创建一个UTS命名空间
		Cloneflags: syscall.CLONE_NEWUTS,
	}
	cmd.Stdin = os.Stdin
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	if err := cmd.Run(); err != nil {
		log.Fatalln(err)
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
```

:::

::: details （2）探索如何在代码中修改主机名：遇到问题

分析一下：

* 修改主机名使用 `syscall.Sethostname` 函数
* 修改主机名必须要在【UTS命名空间创建之后】，并且在【进程启动之前】
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
	cmd.Stdin = os.Stdin
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	if err := cmd.Start(); err != nil {
		log.Fatalln(err)
	}

	// 修改主机名
	err := syscall.Sethostname([]byte("mydocker"))
	if err != nil {
		log.Fatalln(err)
	}

	if err := cmd.Wait(); err != nil {
		log.Fatalln(err)
	}
}
```

输出结果

```bash
# 查看进程内的主机名
[root@archlinux sources-PGLbPa2NSZ]# hostname
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

### 命名空间中执行代码

::: details （1）探索如何在代码中修改主机名：使用第三方包，先解决问题

```go
package main

import (
	"log"
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
	err := syscall.Sethostname([]byte("inside-container"))
	if err != nil {
		log.Fatalln(err)
	}
	cmd := exec.Command("bash")
	cmd.Stdin = os.Stdin
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	if err := cmd.Run(); err != nil {
		log.Fatalln(err)
	}
}

func main() {
	cmd := reexec.Command("flag")

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
```

输出结果

```bash
# 执行程序，发现进程内的主机名已经被修改
[root@inside-container sources-juGNstLrqK]# hostname
inside-container

# 退出进程，查看宿主机的主机名，没有变化，测试成功
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
		log.Fatalln(err)
	}

	// 执行真正的命令
	cmd := exec.Command(os.Args[2], os.Args[3:]...)

	cmd.Stdin = os.Stdin
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	if err := cmd.Run(); err != nil {
		log.Fatalln(err)
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

# 退出进程，查看宿主机的主机名，没有变化，测试成功
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

::: details （3）探索如何在代码中修改主机名：使用原生方法，完美的方案

```go
package main

import (
	"log"
	"os"
	"os/exec"
	"syscall"
	"time"

	"golang.org/x/sys/unix"
)

// Run函数会在新的命名空间中运行
func Run() {
	// 设置主机名
	hostname := "mydocker-" + time.Now().Format(time.DateTime)
	err := syscall.Sethostname([]byte(hostname))
	if err != nil {
		log.Fatalln(err)
	}

	// 执行命令
	cmd := exec.Command("bash")

	cmd.Stdin = os.Stdin
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	if err := cmd.Run(); err != nil {
		log.Fatalln(err)
	}
}

func main() {
	// 将真正要运行的函数保存到一个Map中
	// key是什么无所谓，只要能和下面代码对应起来即可
	store := make(map[string]func())
	store["flag"] = Run

	// 看一下 os.Args[0],这是核心原理
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
			Pdeathsig: unix.SIGTERM,
		},
	}

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
```

输出结果

```bash
# 执行程序，发现进程内的主机名已经被修改
[root@mydocker-2023-04-20 23:26:59 sources-p3kxMe2fvR]# hostname
mydocker-2023-04-20 23:26:59

# 退出进程，查看宿主机的主机名，没有变化，测试成功
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
	cmd := exec.Command("sh")
	cmd.SysProcAttr = &syscall.SysProcAttr{
		Cloneflags: syscall.CLONE_NEWIPC,
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
	cmd := exec.Command("sh")
	cmd.SysProcAttr = &syscall.SysProcAttr{
		Cloneflags: syscall.CLONE_NEWPID,
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

:::

<br />

### NET

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
		Cloneflags: syscall.CLONE_NEWNET,
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
# 100和200在我们的宿主机上都是不存在的ID
[root@localhost ~]# id 100
id: 100: no such user
[root@localhost ~]# id 200
id: 200: no such user

# 输出结果
sh-4.2$ id
uid=100 gid=100(users) groups=100(users),65534 context=unconfined_u:unconfined_r:unconfined_t:s0-s0:c0.c1023

# 宿主机上创建一个文件，然后在容器中看看能不能删除
[root@localhost ~]# touch /user.txt
sh-4.2$ rm -vf /user.txt
rm: cannot remove ‘/user.txt’: Permission denied

# 修改文件的属主和属组，再次尝试删除
chown -R 200：200 /user.txt
sh-4.2$ rm -vf /user.txt
rm: cannot remove ‘/user.txt’: Permission denied
```

:::

<br />

### Mount

前方高能：Mount操作非常非常容易报错，而且错误信息不直观

::: details （1）Linux mount命令：关于块设备

```bash
# 创建一个空目录,用作挂载点
[root@localhost ~]# mkdir /testmount

# 创建一个文件,用作挂在设备
[root@localhost ~]# dd if=/dev/zero of=/testdata bs=1M count=1024
1024+0 records in
1024+0 records out
1073741824 bytes (1.1 GB) copied, 6.72104 s, 160 MB/s

# 设备格式化为xfs文件系统
[root@localhost ~]# mkfs -t xfs /testdata
meta-data=/testdata              isize=512    agcount=4, agsize=65536 blks
         =                       sectsz=512   attr=2, projid32bit=1
         =                       crc=1        finobt=0, sparse=0
data     =                       bsize=4096   blocks=262144, imaxpct=25
         =                       sunit=0      swidth=0 blks
naming   =version 2              bsize=4096   ascii-ci=0 ftype=1
log      =internal log           bsize=4096   blocks=2560, version=2
         =                       sectsz=512   sunit=0 blks, lazy-count=1
realtime =none                   extsz=4096   blocks=0, rtextents=0

# 执行挂载
[root@localhost ~]# mount -t xfs /testdata /testmount

# 查看挂载点
[root@localhost ~]# mount -l | grep test
/testdata on /testmount type xfs (rw,relatime,seclabel,attr2,inode64,noquota)

[root@localhost ~]# df -hT
Filesystem     Type      Size  Used Avail Use% Mounted on
...
/dev/loop0     xfs      1014M   33M  982M   4% /testmount # 注意看，这里并不是/testdata，而是/dev/loop0

#-------------------------------------------------------------------------------------------------

# 所以这里引出了第一个知识点
# /testdata是一个文件，/dev/loop0是一个块设备，那么文件和块设备的关系是怎么样的？
# 下面就来测试一下，测试完成后会清理下面的环境

# losetup命令就是负责 文件和块设备之间的转换关系的

# 1、检查系统中是否有可用的loop设备，返回值就是当前可用的块设备
    [root@localhost ~]# losetup -f
    /dev/loop1        # 因为loop0在上面已经被我们占用了，所以这里会返回loop1
    
# 2、将文件与 loop设备关联起来
	[root@localhost ~]# dd if=/dev/zero of=testdemo bs=1M count=512   # 随便创建一个文件,不要太小
    512+0 records in
    512+0 records out
    536870912 bytes (537 MB) copied, 2.60456 s, 206 MB/s
    [root@localhost ~]# losetup /dev/loop1 testdemo                   # 将文件和loop设备关联
    
# 3、查看loop设备和文件的关联
    [root@localhost ~]# losetup -a
    /dev/loop0: [2053]:3222128550 (/testdata)
    /dev/loop1: [2053]:3222353313 (/root/testdemo)
    
# 4、将文件格式化一下，然后随便找个目录挂载上去
    [root@localhost ~]# mkfs -t xfs testdemo
    meta-data=testdemo               isize=512    agcount=4, agsize=32768 blks
             =                       sectsz=512   attr=2, projid32bit=1
             =                       crc=1        finobt=0, sparse=0
    data     =                       bsize=4096   blocks=131072, imaxpct=25
             =                       sunit=0      swidth=0 blks
    naming   =version 2              bsize=4096   ascii-ci=0 ftype=1
    log      =internal log           bsize=4096   blocks=855, version=2
             =                       sectsz=512   sunit=0 blks, lazy-count=1
    realtime =none                   extsz=4096   blocks=0, rtextents=0
    
    [root@localhost ~]# mkdir testmount
	[root@localhost ~]# mount -t xfs /dev/loop1 testmount      # 挂载文件或块设备都可以
	
# 5、查看挂载
    [root@localhost ~]# mount -l | grep test
    /testdata on /testmount type xfs (rw,relatime,seclabel,attr2,inode64,noquota)
    /dev/loop1 on /root/testmount type xfs (rw,relatime,seclabel,attr2,inode64,noquota)
    
    [root@localhost ~]# df -hT
    Filesystem     Type      Size  Used Avail Use% Mounted on
    ...
    /dev/loop0     xfs      1014M   33M  982M   4% /testmount
    /dev/loop1     xfs       509M   26M  483M   6% /root/testmount

# 6、释放块设备
   # 语法：losetup -d /dev/loopN
	
#-------------------------------------------------------------------------------------------------

# 清理测试环境
[root@localhost ~]# umount /root/testmount
[root@localhost ~]# rm -rf testdemo testmount

[root@localhost ~]# losetup -a
/dev/loop0: [2053]:3222128550 (/testdata)
/dev/loop1: [2053]:3222353313 (/root/testdemo (deleted))    # 这里还在显示，但是标记了deleted

[root@localhost ~]# losetup -f              #  查看可用的块设备，并不是/dev/loop1
/dev/loop2

[root@localhost ~]# losetup -d /dev/loop1   # 释放块设备

[root@localhost ~]# losetup -f              #  再次查看可用的块设备
/dev/loop1
```

:::

::: details （2）Go Mount示例：先让代码跑起来不报错

**1、先把之前的卸载**

```bash
[root@localhost ~]# umount /testdata
[root@localhost ~]# losetup -a
[root@localhost ~]# 
```

**2、使用Go挂载：执行报错**

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
		// 创建一个Mount命名空间
		// 注意并没有 syscall.CLONE_NEWMOUNT，而是使用 syscall.CLONE_NEWNS
		Cloneflags: syscall.CLONE_NEWNS,
	}
	cmd.Stdin = os.Stdin
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	if err := cmd.Start(); err != nil {
		panic(err)
	}

	// 执行挂载操作
	err := syscall.Mount(
		"/testdata",
		"/testmount",
		"xfs",
		uintptr(0),
		"",
	)

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
panic: block device required  # 需要一个块设备，其实就是 /testdata 的参数写的有问题
```

**3、使用Go挂载：修复报错**

```bash
# 检查一下可用的块设备
[root@localhost ~]# losetup -f
/dev/loop0

# 将可用的块设备与文件关联起来
[root@localhost ~]# losetup /dev/loop0 /testdata

# 查看关联
[root@localhost ~]# losetup -a
/dev/loop0: [2053]:3222128550 (/testdata)

# 修改Go代码，将 /testdata 修改为 /dev/loop0，然后再次执行代码
# 输出结果
[root@localhost sources-cqkirdRljR]# df -hT
...
/dev/loop0     xfs      1014M   33M  982M   4% /testmount
```

**4、syscall.Mount各项参数的含义**

```bash
source string	挂载源，可以是设备名、目录名、网络地址等
target string	挂载目标，即将文件系统挂载到哪个目录下。该目录必须已经存在，且为空目录
fstype string	文件系统类型，比如ext4、xfs、ntfs 等
flags uintptr	挂载选项，可以使用 syscall.MS_* 常量指定选项，uintptr(0)代表不添加任何选项
data string		特定的挂载选项，通常是指定一些特殊选项的参数，例如 NFSv3 中的 proto=tcp,port=2049
```

**5、卸载**

使用 `syscall.Unmount` 函数

:::

::: details （3）Go Mount选项：挂载一个目录到另一个目录中

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
		// 创建一个Mount命名空间
		// 注意并没有 syscall.CLONE_NEWMOUNT，而是使用 syscall.CLONE_NEWNS
		Cloneflags: syscall.CLONE_NEWNS,
	}
	cmd.Stdin = os.Stdin
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	if err := cmd.Start(); err != nil {
		panic(err)
	}

	// 执行挂载操作，部分挂载选项如下：
	// syscall.MS_RDONLY      	只读挂载，即无法在挂载点中进行写入操作
	// syscall.MS_NOEXEC      	用于禁止在挂载点中执行可执行文件
	// syscall.MS_REMOUNT     	重新挂载,要求提前已经挂载，不改变挂载参数
	// syscall.MS_BIND			挂载一个目录到另一个目录中
	err := syscall.Mount(
		"/a",
		"/b",
		"",
		syscall.MS_BIND,
		"",
	)

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
# 执行代码前
[root@localhost ~]# mkdir /a /b
[root@localhost ~]# touch /a/a.txt /b/b.txt

# 执行代码后操作
[root@localhost sources-WQj4ullLRa]# mount |grep -E '/a\b'
[root@localhost sources-OW35KOsgTp]# mount |grep -E '/b\b'
/dev/sda5 on /b type xfs (rw,relatime,seclabel,attr2,inode64,noquota)

# 查看数据
[root@localhost sources-Ub7tg5eJDh]# ls /a
a.txt
[root@localhost sources-Ub7tg5eJDh]# ls /b
a.txt
```

:::

::: details （4）Mount命名空间有哪些影响

```go
```

输出结果

```bash

```

:::

<br />

### proc隔离问题

<br />

### 进入命名空间

<br />

### 命名空间总结
