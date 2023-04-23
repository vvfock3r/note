# Arch Linux

官网：[https://archlinux.org](https://archlinux.org)

存档：[https://archive.archlinux.org](https://archive.archlinux.org)

Wiki：[https://wiki.archlinux.org](https://wiki.archlinux.org)

<br />

## 安装

文档：[https://wiki.archlinux.org/title/archinstall](https://wiki.archlinux.org/title/archinstall)

```bash
# 更新 archinstall,这一步可选
pacman -Sy archinstall

# 安装Arch Linux
archinstall
```

<br />

## 配置

### 更新系统

```bash
pacman -Sy	更新最新软件列表
pacman -Su	升级所有已安装的软件包
pacman -Syu 更新最新软件列表，并升级所有已安装的软件包(推荐)
```

<br />

### 常用软件

```bash
[root@archlinux ~]# pacman -Sy \
	vim wget net-tools inetutils lsof \
	systemd man-pages \
	python3 go nodejs \
	docker

# 说明
# inetutils  包含hostname等命令
```

<br />

### 基础配置

```bash
# 配置别名
# 在~/.bashrc下配置不生效不知道为啥
[root@archlinux ~]# vim /etc/profile
alias ll='ls -l --color'

# 配置vim
[root@archlinux ~]# vim ~/.vimrc
set mouse-=a     " 禁用鼠标visual
set paste        " 启用粘贴模式
syntax on        " 启用颜色高亮
set hlsearch     " 启用搜索高亮
set expandtab    " 使用空格键替换制表符
set tabstop=4    " 设置制表符占4个空格
set shiftwidth=4 " 默认缩进4个空格大小
```

<br />

### OpenSSH

```bash
[root@archlinux ~]# pacman -Sy openssh

[root@archlinux ~]# vim /etc/ssh/sshd_config
#PermitRootLogin prohibit-password
PermitRootLogin yes # 添加这行，否则输入密码也登陆不上去

[root@archlinux ~]# systemctl restart sshd
[root@archlinux ~]# systemctl enable sshd
```

<br />

## 技巧

### 安装老版本包

下载地址：[https://archive.archlinux.org/packages](https://archive.archlinux.org/packages)

```bash
# 比如我要安装Go 1.18 版本

# 1、查看当前Go版本
[root@archlinux ~]# go version
go version go1.20.3 linux/amd64

# 2、找到1.18版本的地址并安装
# -U 安装指定软件包文件到系统中，并覆盖已安装的同名软件包，或安装新的软件包
[root@archlinux ~]# pacman -U https://archive.archlinux.org/packages/g/go/go-2%3A1.18.5-1-x86_64.pkg.tar.zst

# 3、再次查看当前Go版本
[root@archlinux ~]# go version
go version go1.18.5 linux/amd64

# 其他
# 1、对于曾经安装/下载过的包会缓存在系统内，也可以直接安装
[root@archlinux ~]# du -sh /var/cache/pacman/pkg
921M    /var/cache/pacman/pkg

# 2、如果使用pacman -U下载特别慢的话，也可以在 手动下载，然后上传到Linux中进行安装

# ------------------------------------------------------------------------------------------------------------

# 为了防止下次系统更新时(pacman -Syu)自动更新Go版本，所以还需要设置一下
# 1、IgnorePkg 选项指定的软件包将不受 pacman 管理，包括更新和卸载操作
# 2、如果需要重新管理被忽略的软件包，可以将其从 IgnorePkg 中移除
# 3、如果有多个软件包的话可以有以下两种写法
#   方式1：
#     IgnorePkg = firefox vim thunderbird
#   方式2：
#     IgnorePkg = firefox
#     IgnorePkg = vim
#     IgnorePkg = thunderbird
[root@archlinux ~]# vim /etc/pacman.conf
IgnorePkg   = go

# 更新测试
[root@archlinux ~]# pacman -Syu
:: Synchronizing package databases...
 core is up to date
 extra is up to date
 community is up to date
:: Starting full system upgrade...
warning: go: ignoring package upgrade (2:1.18.5-1 => 2:1.20.3-1)
 there is nothing to do
[root@archlinux ~]# 
```

