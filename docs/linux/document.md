# Linux

<br />

## Man文档

::: details （1）安装man文档

```bash
# 查看文档为空
[root@node-1 ~]# man ascii                                                                                                       
No manual entry for ascii

# 安装man-pages
[root@node-1 ~]# yum -y install man-pages

# 再次查看
[root@node-1 ~]# man ascii
...
       Oct   Dec   Hex   Char                        Oct   Dec   Hex   Char
       ────────────────────────────────────────────────────────────────────────
       000   0     00    NUL '\0'                    100   64    40    @
       001   1     01    SOH (start of heading)      101   65    41    A
       002   2     02    STX (start of text)         102   66    42    B
       003   3     03    ETX (end of text)           103   67    43    C
       004   4     04    EOT (end of transmission)   104   68    44    D
       005   5     05    ENQ (enquiry)               105   69    45    E
       006   6     06    ACK (acknowledge)           106   70    46    F
       007   7     07    BEL '\a' (bell)             107   71    47    G
       010   8     08    BS  '\b' (backspace)        110   72    48    H
       011   9     09    HT  '\t' (horizontal tab)   111   73    49    I
       012   10    0A    LF  '\n' (new line)         112   74    4A    J
       013   11    0B    VT  '\v' (vertical tab)     113   75    4B    K
       014   12    0C    FF  '\f' (form feed)        114   76    4C    L
       015   13    0D    CR  '\r' (carriage ret)     115   77    4D    M
       016   14    0E    SO  (shift out)             116   78    4E    N
       017   15    0F    SI  (shift in)              117   79    4F    O
       020   16    10    DLE (data link escape)      120   80    50    P
       021   17    11    DC1 (device control 1)      121   81    51    Q
       022   18    12    DC2 (device control 2)      122   82    52    R
       023   19    13    DC3 (device control 3)      123   83    53    S
       024   20    14    DC4 (device control 4)      124   84    54    T
       025   21    15    NAK (negative ack.)         125   85    55    U
       026   22    16    SYN (synchronous idle)      126   86    56    V
       027   23    17    ETB (end of trans. blk)     127   87    57    W
       030   24    18    CAN (cancel)                130   88    58    X
       031   25    19    EM  (end of medium)         131   89    59    Y
       032   26    1A    SUB (substitute)            132   90    5A    Z
       033   27    1B    ESC (escape)                133   91    5B    [
       034   28    1C    FS  (file separator)        134   92    5C    \  '\\'
       035   29    1D    GS  (group separator)       135   93    5D    ]
       036   30    1E    RS  (record separator)      136   94    5E    ^
...
```

:::

::: details （2）文档按章节分类：man N xxx

在 Linux 系统中，man 手册页按照章节进行分类，其中每个章节都有自己的主题和内容

这些章节通常被编号为 1 到 9，不同的章节对应不同的主题，如下所示：

1.用户命令（常用命令）

2.系统调用（与操作系统内核交互的函数）

3.库函数（C 标准库、数学库等）

4.设备和特殊文件（设备驱动程序和设备文件）

5.文件格式和约定（配置文件、数据库文件格式等）

6.游戏（Linux 上的一些游戏）

7.杂项（惯例、宏包、协议等）

8.系统管理命令和守护进程（系统管理员使用的命令）

9.内核例程（内核的一些例程）

```bash
# 查看系统调用: setns
[root@archlinux ~]# man 2 setns

# 查看C标准库
[root@archlinux ~]# man 3 printf
```

:::

<br />

## 包管理器

<br />

## 网络管理

<br />

## 进程管理

<br />

## 磁盘系统

### 分区

<br />

### 逻辑卷

<br />

### xfs

<br />

## Mount

### 查看文档

::: details man帮助文档

```bash
# 查看系统调用相关文档
[root@archlinux ~]# man 2 mount    # mount
[root@archlinux ~]# man umount2    # umount
```

:::

<br />

### 普通挂载

::: details （1）挂载硬盘（块设备）的常规流程

```bash
# 1、先添加一块硬盘，然后在主机内找到这块硬盘,在这里是 /dev/sdb
[root@archlinux ~]# fdisk -l
Disk /dev/sda: 1 TiB, 1099511627776 bytes, 2147483648 sectors
Disk model: VMware Virtual S
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0x9f472256

Device     Boot  Start        End    Sectors    Size Id Type
/dev/sda1  *      6144     415743     409600    200M  c W95 FAT32 (LBA)
/dev/sda2       421888 2147483647 2147061760 1023.8G 83 Linux


Disk /dev/sdb: 200 GiB, 214748364800 bytes, 419430400 sectors
Disk model: VMware Virtual S
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes


Disk /dev/zram0: 1.9 GiB, 2035810304 bytes, 497024 sectors
Units: sectors of 1 * 4096 = 4096 bytes
Sector size (logical/physical): 4096 bytes / 4096 bytes
I/O size (minimum/optimal): 4096 bytes / 4096 bytes

# 2、对硬盘分区(省略)

# 3、格式化硬盘为xfs文件系统
[root@archlinux ~]# mkfs -t xfs /dev/sdb 
meta-data=/dev/sdb               isize=512    agcount=4, agsize=13107200 blks
         =                       sectsz=512   attr=2, projid32bit=1
         =                       crc=1        finobt=1, sparse=1, rmapbt=0
         =                       reflink=1    bigtime=1 inobtcount=1 nrext64=0
data     =                       bsize=4096   blocks=52428800, imaxpct=25
         =                       sunit=0      swidth=0 blks
naming   =version 2              bsize=4096   ascii-ci=0, ftype=1
log      =internal log           bsize=4096   blocks=25600, version=2
         =                       sectsz=512   sunit=0 blks, lazy-count=1
realtime =none                   extsz=4096   blocks=0, rtextents=0

# 4、挂载
[root@archlinux ~]# mkdir /data
[root@archlinux ~]# mount -t xfs /dev/sdb /data

# 5、查看挂载
[root@archlinux ~]# mount | grep /dev/sdb
/dev/sdb on /data type xfs (rw,relatime,attr2,inode64,logbufs=8,logbsize=32k,noquota)

[root@archlinux ~]# df -hT | grep /dev/sdb
/dev/sdb       xfs       200G  1.5G  199G   1% /data

# 6、读写数据
[root@archlinux ~]# seq 10 > /data/1.txt
[root@archlinux ~]# cat /data/1.txt
1
2
3
4
5
6
7
8
9
10

# 7、设置开启自动挂载
[root@archlinux ~]# vim /etc/fstab
/dev/sdb /data xfs 0 0
[root@archlinux ~]# systemctl daemon-reload

# 8、测试完成后清理
[root@archlinux ~]# umount /data
[root@archlinux ~]# rmdir /data
[root@archlinux ~]# vim /etc/fstab
```

:::

::: details （2）文件和块设备之：挂载文件

```bash
# 1、生成一个大文件
[root@archlinux ~]# dd if=/dev/zero of=/source1 bs=1M count=1024
1024+0 records in
1024+0 records out
1073741824 bytes (1.1 GB, 1.0 GiB) copied, 5.58546 s, 192 MB/s

# 2、格式化为xfs文件系统
[root@archlinux ~]# mkfs -t xfs /source1
meta-data=/source1               isize=512    agcount=4, agsize=65536 blks
         =                       sectsz=512   attr=2, projid32bit=1
         =                       crc=1        finobt=1, sparse=1, rmapbt=0
         =                       reflink=1    bigtime=1 inobtcount=1 nrext64=0
data     =                       bsize=4096   blocks=262144, imaxpct=25
         =                       sunit=0      swidth=0 blks
naming   =version 2              bsize=4096   ascii-ci=0, ftype=1
log      =internal log           bsize=4096   blocks=16384, version=2
         =                       sectsz=512   sunit=0 blks, lazy-count=1
realtime =none                   extsz=4096   blocks=0, rtextents=0

# 3、执行挂载
[root@archlinux ~]# mkdir /target1
[root@archlinux ~]# mount -t xfs /source1 /target1

# 4、查看挂载
[root@archlinux ~]# mount | grep target
/source1 on /target1 type xfs (rw,relatime,attr2,inode64,logbufs=8,logbsize=32k,noquota)

# 5、查看文件系统
# 注意: 并不是/sourc1e而是/dev/loop0,它实际上是将文件映射为了块设备
[root@archlinux ~]# df -hT | grep target
/dev/loop0     xfs       960M   39M  922M   5% /target1
```

:::

::: details （3）文件和块设备之：映射关系：losetup命令

```bash
# losetup命令就是负责 loop块设备和文件之间的映射关系的

# 1、检查系统中是否有可用的loop设备，返回值就是当前可用的块设备
[root@archlinux ~]# losetup -f
/dev/loop1        # 因为loop0在上面已经被我们占用了，所以这里会返回loop1
    
# 2、将文件与 loop设备关联起来
[root@archlinux ~]# dd if=/dev/zero of=/source2 bs=1M count=512   # 随便创建一个文件,不要太小
512+0 records in
512+0 records out
536870912 bytes (537 MB, 512 MiB) copied, 2.80436 s, 191 MB/s
[root@archlinux ~]# losetup /dev/loop1 /source2                   # 将文件和loop设备关联
    
# 3、查看loop设备和文件的关联
[root@archlinux ~]# losetup -a
/dev/loop1: [2050]:1269283 (/source2)
/dev/loop0: [2050]:1269280 (/source1)
    
# 4、将文件格式化一下，然后创建挂载目录
[root@archlinux ~]# mkfs -t xfs /source2
[root@archlinux ~]# mkdir /target2

# 5、挂载，挂载文件或块设备都可以
[root@archlinux ~]# mount -t xfs /source2 /target2
	
# 6、查看挂载，显示上有一些区别
[root@archlinux ~]# mount | grep target
/source1 on /target1 type xfs (rw,relatime,attr2,inode64,logbufs=8,logbsize=32k,noquota)
/dev/loop1 on /target2 type xfs (rw,relatime,attr2,inode64,logbufs=8,logbsize=32k,noquota)
    
[root@archlinux ~]# df -hT
Filesystem     Type      Size  Used Avail Use% Mounted on
...
/dev/loop0     xfs       960M   39M  922M   5% /target1
/dev/loop1     xfs       448M   29M  420M   7% /target2

# 6、释放块设备
# 语法：losetup -d /dev/loopN
```

:::

::: details （4）文件和块设备之：清理环境

```bash
[root@archlinux ~]# umount /target1 /target2
[root@archlinux ~]# rm -rf /source1  /source2 /target1 /target2
```

:::

<br />

### 绑定挂载

::: details （1）挂载一个目录

```bash
# 1、创建两个目录,并写入一点数据
[root@archlinux ~]# mkdir /source /target
[root@archlinux ~]# touch /source/source.txt /target/target.txt

# 2、直接挂载报错,提示不是一个块设备
[root@archlinux ~]# mount /source /target
mount: /target: /source is not a block device.
       dmesg(1) may have more information after failed mount system call.

# 3、使用绑定挂载 --bind
[root@archlinux ~]# mount --bind /source /target

# 4、查看挂载
[root@archlinux ~]# mount | grep target
/dev/sda2 on /target type xfs (rw,relatime,attr2,inode64,logbufs=8,logbsize=32k,noquota)

# 5、查看文件系统，输出为空
[root@archlinux ~]# df -hT | grep target

# 6、查看数据
[root@archlinux ~]# md5sum /{source,target}/*
d41d8cd98f00b204e9800998ecf8427e  /source/source.txt
d41d8cd98f00b204e9800998ecf8427e  /target/source.txt

# 7、清理环境
[root@archlinux ~]# umount /target
[root@archlinux ~]# rm -rf /source /target
```

:::

::: details （2）挂载一个挂载点

```bash
# 1、创建3个目录,并写入一点数据
[root@archlinux ~]# mkdir /source /target /target2
[root@archlinux ~]# touch /source/source.txt /target/target.txt /target2/target2.txt

# 2、将挂载点作为源
[root@archlinux ~]# mount --bind /source /target
[root@archlinux ~]# mount --bind /target /target2

# 3、查看数据
[root@archlinux ~]# md5sum /{source,target,target2}/*
d41d8cd98f00b204e9800998ecf8427e  /source/source.txt
d41d8cd98f00b204e9800998ecf8427e  /target/source.txt
d41d8cd98f00b204e9800998ecf8427e  /target2/source.txt

# 4、清理资源
[root@archlinux ~]# umount /target2 /target
[root@archlinux ~]# rm -rf /source /target /target2
```

:::

::: details （3）递归绑定挂载

```bash
# 创建一个挂载点
[root@archlinux ~]# mkdir -p /source/2       /target/2
[root@archlinux ~]# touch /source/2/s2.txt   /target/2/t2.txt
[root@archlinux ~]# mount --bind /source/2   /target/2

# -----------------------------------------------------------
# 测试1：非递归挂载

# 1、源/target 包含子挂载点，非递归挂载
[root@archlinux ~]# mkdir /super
[root@archlinux ~]# mount --bind /target /super

# 2、查看子挂载点的数据，是t2.txt，而不是s2.txt
[root@archlinux ~]# ls /super/2
t2.txt

# 3、卸载
[root@archlinux ~]# umount /super

# -------------------------------------------------------

# 测试2：递归挂载

# 1、源/target 包含子挂载点，递归挂载
[root@archlinux ~]# mkdir /super                 # 之前已经创建过,不需要执行
[root@archlinux ~]# mount --rbind /target /super # 修改为 --rbind, r代表recursion(递归)

# 2、查看子挂载点的数据
[root@archlinux ~]# ls /super/2
s2.txt

# 3、卸载: 失败
[root@archlinux ~]# umount /super
umount: /super: target is busy.

# 4、先把子挂载点卸载，再卸载父挂载点
#   也可以使用其他办法，比如 延迟卸载 umount -l /super
[root@archlinux ~]# umount /super/2
[root@archlinux ~]# umount /super

# -------------------------------------------------------

# 清理测试环境
[root@archlinux ~]# umount -l /super
[root@archlinux ~]# rm -rf /source /target /super
```

:::

<br />

### 传播模式

在同一命名空间中，所有进程都能够看到挂载点，所以讲传播模式是没有意义的

在多个命名空间中，mount 传播模式将起到控制文件系统挂载点可见性的作用

::: details （1）测试新创建的Mount命名空间的传播模式

```bash
# 创建一个新的Mount命名空间，并在里面启动bash
[root@archlinux ~]#  unshare --mount /bin/bash

# 在宿主机默认的Mount命名空间和新的Mount命名空间分别查看挂载点
# 发现他们是一样的，为什么会这样呢？
[root@archlinux ~]# mount | wc -l
25

# 每个挂载点都有一个propagation type属性，指的是挂载点的传播类型

# 查看宿主机挂载点的传播类型
# 这里的shared代表共享传播类型
[root@archlinux ~]# cat /proc/self/mountinfo | grep shared
20 58 0:19 / /proc rw,nosuid,nodev,noexec,relatime shared:11 - proc proc rw
21 58 0:20 / /sys rw,nosuid,nodev,noexec,relatime shared:2 - sysfs sysfs rw
...

# 查看新创建的Mount命名空间传播类型，它并没有shared字样
# 默认新创建的Mount命名空间传播类型为private，即只在当前命名空间可见
# 只是他在创建时会把 【父进程的挂载表】复制一份而已
[root@archlinux ~]# cat /proc/self/mountinfo 
56 55 8:2 / / rw,relatime - xfs /dev/sda2 rw,attr2,inode64,logbufs=8,logbsize=32k,noquota
...

# 这时候如果在宿主机 或新创建的Mount命名空间做任何挂载和卸载操作，都不会相互影响
[root@archlinux ~]# mkdir /source /target          # 宿主机创建
[root@archlinux ~]# mount --bind /source /target   # 宿主机挂载
[root@archlinux ~]# mount | wc -l                  # 新Mount命名空间查看是否能看到
25

# 清理测试环境
[root@archlinux ~]# umount /target
[root@archlinux ~]# rm -rf /source /target
```

:::

::: details （2）验证新创建的Mount命名空间会从父进程中拷贝一份Mount挂载表

```bash
# 1、宿主机上随便找一个挂载点,比如/tmp
[root@archlinux ~]# mount | grep /tmp
tmpfs on /tmp type tmpfs (rw,nosuid,nodev,size=1988532k,nr_inodes=1048576,inode64)

# 2、新建一个Mount命名空间，并卸载/tmp
# 此时新命名空间中不包含/tmp，而宿主机中是包含/tmp挂载点的
[root@archlinux ~]# unshare --mount bash
[root@archlinux ~]# umount /tmp

# 3、在新Mount命名空间中再创建一个Mount命名空间
#   检查是否包含/tmp挂载点
[root@archlinux ~]# unshare --mount bash
[root@archlinux ~]# mount | grep /tmp       # 输出为空

# 4、那么父进程中的私有传播模式会不会拷贝到新的Mount命名空间呢？
#    答案是: 会的
#    可以使用  mount --make-private -t tmpfs tmpfs /tmp 做一次私有挂载，
#    然后再测试新建的Mount命名空间检查是否有/tmp挂载点即可
```

:::

::: details （3）常见传播模式和区别

```bash
# 共享传播
# 1、共享传播是双向的，即两个命名空间的共享传播挂载点会相互传递
# 2、使用--rbind时也会同时设置传播模式
unshare --mount --propagation=shared bash	# 新建一个Mount命名空间，并设置为共享传播模式						
mount --make-shared  xxx					# 挂载时设置挂载点为共享传播模式
mount --make-rshared xxx	                # 递归共享传播模式

# ---------------------------------------------------------------------------------

# 主从传播
# 1、主从传播是单向的，即shared会传递到slave，反过来则不行
# 2、使用--rbind时也会同时设置传播模式
unshare --mount --propagation=slave bash	# 新建一个Mount命名空间，并设置为主从传播模式						
mount --make-slave  xxx					    # 挂载时设置挂载点为主从传播模式
mount --make-rslave xxx	                    # 递归主从传播模式

# ---------------------------------------------------------------------------------

# 私有传播
# 1、不会传递到其他命名空间
# 2、使用--rbind时也会同时设置传播模式
unshare --mount --propagation=private bash	# 新建一个Mount命名空间，并设置为私有传播模式						
mount --make-private  xxx					# 挂载时设置挂载点为私有传播模式
mount --make-rprivate xxx	                # 递归私有传播模式
```

:::

<br />

### 卸载参数

::: details （1）延迟卸载

```bash
# 1、挂载
[root@archlinux ~]# dd if=/dev/zero of=/source bs=1M count=1024
[root@archlinux ~]# mkfs -t xfs /source
[root@archlinux ~]# mkdir /target
[root@archlinux ~]# mount -t xfs /source /target

# 2、新开一个终端占用挂载点
[root@archlinux ~]# cd /target

# 3、直接卸载失败
[root@archlinux ~]# umount /target
umount: /target: target is busy.

# 4、解决办法1：通过fuser查看占用挂载点的进程, -k可以杀掉挂载点的进程，这种方法太过粗暴
[root@archlinux ~]# fuser -m /target
/target:               679c

# 5、解决办法2：使用延迟卸载
[root@archlinux ~]# umount -l /target
[root@archlinux ~]# mount | grep target

# 6、另一个终端还能正常写入，但是一旦不在占用挂载点，系统将马上卸载
[root@archlinux target]# seq 10 > 1.txt
[root@archlinux target]# cd
[root@archlinux ~]# ls -l /target/
total 0
```

:::

<br />

## 救援模式

::: details 点击查看详情

```bash
按e
linux16 rd.break, 然后按 ctrl +x
mount -o remount,rw /sysroot
chroot /sysroot
```

:::

<br />

## C链接库

### glibc

::: details （1）查看glibc版本

```bash
# 方式1：查看文件链接到哪个版本
[root@node-1 ~]# ls -l /lib/libc.so.6
lrwxrwxrwx 1 root root 12 Mar 14 16:48 /lib/libc.so.6 -> libc-2.17.so

# --------------------------------------------------------------------------

# 方式2：/lib/libc.so.6作为命令执行一下
[root@node-1 ~]# /lib/libc.so.6
GNU C Library (GNU libc) stable release version 2.17, by Roland McGrath et al.
Copyright (C) 2012 Free Software Foundation, Inc.
This is free software; see the source for copying conditions.
There is NO warranty; not even for MERCHANTABILITY or FITNESS FOR A
PARTICULAR PURPOSE.
Compiled by GNU CC version 4.8.5 20150623 (Red Hat 4.8.5-44).
Compiled on a Linux 3.10.0 system on 2022-05-18.
Available extensions:
        The C stubs add-on version 2.1.2.
        crypt add-on version 2.1 by Michael Glad and others
        GNU Libidn by Simon Josefsson
        Native POSIX Threads Library by Ulrich Drepper et al
        BIND-8.2.3-T5B
        RT using linux kernel aio
libc ABIs: UNIQUE IFUNC
For bug reporting instructions, please see:
<http://www.gnu.org/software/libc/bugs.html>.

# --------------------------------------------------------------------------

# 方式3：使用glibc提供的二进制命令查看版本

[root@node-1 ~]# ldd --version
ldd (GNU libc) 2.17
Copyright (C) 2012 Free Software Foundation, Inc.
This is free software; see the source for copying conditions.  There is NO
warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
Written by Roland McGrath and Ulrich Drepper.

[root@node-1 ~]# ldconfig --version
ldconfig (GNU libc) 2.17
Copyright (C) 2012 Free Software Foundation, Inc.
This is free software; see the source for copying conditions.  There is NO
warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
Written by Andreas Jaeger.

[root@node-1 ~]# sln --version
sln (GNU libc) 2.17

...

[root@node-1 ~]# rpm -ql glibc | grep bin
/sbin/ldconfig
/sbin/sln
/usr/sbin/glibc_post_upgrade.x86_64
/usr/sbin/iconvconfig
/usr/sbin/iconvconfig.x86_64
/sbin/ldconfig
/sbin/sln
/usr/sbin/glibc_post_upgrade.i686
/usr/sbin/iconvconfig
/usr/sbin/iconvconfig.i686
```

:::
