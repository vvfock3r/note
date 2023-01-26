## Shell

### 类型

Shell是一个应用程序，它是作系统与外部交互最主要的接口式。

Shell的实现有很多方式，这里我们主要说Bash，操作系统使用的是CentOS7

::: details （1）查看系统中已有得Shell类型

```bash
# 方法1
[root@localhost ~]# cat /etc/shells 
/bin/sh
/bin/bash
/sbin/nologin
/usr/bin/sh
/usr/bin/bash
/usr/sbin/nologin
/bin/zsh

# 方法2
[root@localhost ~]# chsh -l
/bin/sh
/bin/bash
/sbin/nologin
/usr/bin/sh
/usr/bin/bash
/usr/sbin/nologin
/bin/zsh
```

:::

::: details （2）查看当当前用户所使用的默认Shell类型

```bash
[root@localhost ~]# echo $SHELL
/bin/bash

[root@localhost ~]# bash --version
bash --version
GNU bash, version 4.2.46(2)-release (x86_64-redhat-linux-gnu)
Copyright (C) 2011 Free Software Foundation, Inc.
License GPLv3+: GNU GPL version 3 or later <http://gnu.org/licenses/gpl.html>

This is free software; you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.
```

> 有时候会使用sh命令，这通常是Bash的软连接
>
> ```bash
> [root@localhost ~]# ls -l `which sh`
> lrwxrwxrwx. 1 root root 4 May 21  2021 /usr/bin/sh -> bash
> ```

:::

::: details （3）修改当前用户所使用的默认Shell为zsh

```bash
# 修改当前用户所使用的默认Shell
[root@localhost ~]# chsh -s /bin/zsh
Changing shell for root.
Shell changed.

# 退出当前终端，重新连接

# 再次查看当前所使用的Shell
[root@localhost]~# echo $SHELL
/bin/zsh
```

> 原理其实就是修改了/etc/passwd文件
>
> ```bash
> [root@localhost]~# cat /etc/passwd | grep -E "^root"
> root:x:0:0:root:/root:/bin/zsh
> ```

:::

<br />

### 文档

在线文档：[https://www.gnu.org/software/bash/manual/](https://www.gnu.org/software/bash/manual/)

终端文档：`man bash`

<br />

### 变量

::: details （1）环境变量

环境变量，或者称为全局变量，在登陆系统的时候就已经有了相应的系统定义的环境变量了，

环境变量具有继承性，即`子Shell`会继承`父Shell`的环境变量。

列举部分环境变量

| 变量名       | 说明                                             |
| ------------ | ------------------------------------------------ |
| Shell        | 当前使用的Shell                                  |
| BASH_VERSION | Bash版本号                                       |
| BASHPID      | 当前Bash进程的PID(等同于$$)                      |
| PPID         | 当前Bash进程的父进程PID                          |
| SHLVL        | Bash嵌套层数                                     |
| PATH         | 执行系统命令所搜寻的路径集合，路径之间用分号隔开 |
| USER         | 当前用户名                                       |
| HOME         | 当前用户的家目录                                 |
| LANG         | 当前用户所使用的语言                             |
| HOSTNAME     | 主机名                                           |
| RANDOM       | 产生一个范围在0-32767的随机数                    |

使用`env`命令可以查看终端所有的环境变量

使用`locale`命令可以输出语言相关的详细变量

使用`cat /proc/$PID/environ`可以查看某个进程的环境变量，示例如下：

```bash
[root@localhost ~]# ps aux|grep sshd
root        986  0.0  0.2 105996  4112 ?        Ss   05:30   0:00 /usr/sbin/sshd -D
root       1542  0.0  0.2 148316  5400 ?        Ss   05:49   0:00 sshd: root@pts/0
root       1692  0.0  0.0 112660   972 pts/0    R+   06:02   0:00 grep --color=auto sshd

[root@localhost ~]# cat /proc/986/environ | tr '\0' '\n'
LANG=en_US.UTF-8
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin
NOTIFY_SOCKET=/run/systemd/notify
SSH_USE_STRONG_RNG=0
```

使用`export k=v`可以设置环境变量，也可以单独使用`export`显示环境变量

:::

::: details （2）本地变量

本地变量，当前shell 中的变量，很显然本地变量中包含环境变量，本地变量的非环境变量不具备继承性，只在当前Shell生效。

使用`set`命令显示本地变量，使用`unset`可以删除本地变量

:::

::: details （3）变量继承性差异

```bash
[root@localhost ~]# echo -e "当前Shell PID为: $$ \n当前Shell层级为: $SHLVL"       # 查看当前Bash信息
当前Shell PID为: 1951
当前Shell层级为: 1
[root@localhost ~]# a=1        # 设置本地变量，不具有继承性
[root@localhost ~]# export b=2 # 设置环境变量，具有继承性
[root@localhost ~]# bash       # 开启一个子进程
[root@localhost ~]# echo -e "当前Shell PID为: $$ \n当前Shell层级为: $SHLVL"       # 再次查看当前Bash信息
当前Shell PID为: 2080
当前Shell层级为: 2
[root@localhost ~]# echo $a    # 查看本地变量

[root@localhost ~]# echo $b    # 查看环境变量
2

# 查看进程树
[root@localhost ~]# pstree -p | grep bash
           |-sshd(986)---sshd(1542)---bash(1951)---bash(2080)-+-grep(2124)
```

> pstree命令安装：yum -y install psmisc

:::

::: details （4）内部域分隔符IFS

BASH 脚本中有个变量叫IFS(Internal Field Seprator) ，内部域分隔符

- IFS是一种set变量，当BASH处理"命令替换"和"参数替换"时,BASH根据IFS的值来拆解读入的变量，然后对特殊字符进行处理，最后重新组合赋值给该变量
- IFS的默认值为：空白（包括：空格，tab, 和新行)，将其ASSII码用十六进制打印出来就是：20 09 0a
- IFS对空格的空白的处理和其他字符不一样，左右两半的纯空白会被忽略，多个连续的空白被当成一个IFS处理

```bash
# 直接查看IFS变量为空
[root@localhost ~]# echo $IFS

# 但实际上它应该是长这样的
[root@localhost ~]# IFS=$' \t\n'

# 下面举个简单的例子说明IFS变量的作用
# (1) 先保存一下旧的IFS变量
[root@localhost ~]# oldifs=$IFS
# (2)设置一个变量msg，注意值中两个单词使用:分隔开
[root@localhost ~]# msg=hello:world 
# (3)设置新的IFS变量
[root@localhost ~]# IFS=':' 
# (4)查看变量msg的值
[root@localhost ~]# echo $msg
hello world
# (5)恢复原先的IFS变量
[root@localhost ~]# IFS=$oldifs
# (6)再次查看msg的值
[root@localhost ~]# echo $msg
hello:world
```

:::

::: details （5）变量引用

```bash
# 方法一： $变量
# 方法二： ${变量名}，推荐总是使用这种，举个例子

#!/bin/bash
year=23
echo i am ${year}years old.  # 如果不加{}，它会把$yearyears当做一个整体
```

:::

::: details （6）变量默认值

```bash
# 方式一：${var:-100}   如果$var没有值，则把100赋值给var,如果有值，则不做操作
# 方式二：${var:=100}	如果$var没有值，则把100赋值给var，如果有值，则不做操作

# 这两种方式的区别是，:-是临时赋值，=对var真正的赋值，举个例子
[root@localhost ~]# echo ${var:-100}
100
[root@localhost ~]# echo $var

[root@localhost ~]# echo ${var:=100}
100
[root@localhost ~]# echo $var
100
```

:::

::: details （7）位置参数变量

| 变量  | 说明                                                         |
| ----- | ------------------------------------------------------------ |
| $0    | 脚本的名字                                                   |
| $n    | 对于脚本或者函数来说，<br />传入的第n个参数(n为大于等于1的数字，如果大于等于10，则写成${n}) |
| $#    | 参数数量                                                     |
| $$    | 脚本运行进程号                                               |
| $?    | 命令退出码                                                   |
| $!    | 最后一个放在后台的进程号                                     |
| $*/$@ | 传入的所有参数                                               |

$*和$@的区别，$@可以作为数组用：

```bash
# demo.sh
#!/bin/bash
var=1
for i in "$@"
do
    array[$var]=$i  # 数组赋值
    let var++       # 索引+1
done
echo ${array[2]}

# 测试
[root@localhost ~]# bash demo.sh 10 9 8
9
```

:::

::: details （8）变量操作

```bash
# 定义变量
[root@localhost ~]# var=123456 

# 取得变量值长度
[root@localhost ~]# echo ${#var}
6

# 从0开始，截取第3个字符及以后的字符
[root@localhost ~]# echo ${var:3}
456

# 从0开始，截取第3个字符及以后的字符，并控制长度
[root@localhost ~]# echo ${var:3:2}
45

# 截取后4位，:后面有空格
[root@localhost ~]# echo ${var: -4}
3456
 
# 定义变量
[root@localhost ~]# var=123123

# 从左到右，去掉最短匹配
[root@localhost ~]# echo ${var#*3}
123

# 从左到右，去掉最长匹配
[root@localhost ~]# echo ${var##*1}
23
 
# 从右到左，去掉最短匹配
[root@localhost ~]# echo ${var%2*}
1231

# 从右到左，去掉最长匹配
[root@localhost ~]# echo ${var%%2*}
1
 
# 从左到右，替换1次
[root@localhost ~]# echo ${var/12/aa}
aa3123

# 只替换第二次
[root@localhost ~]# echo $var | sed 's/12/aa/2'
123aa3

# 全部替换
[root@localhost ~]# echo ${var//12/aa}
aa3aa3
 
# 前缀替换，前缀必须是指定的字符串才能匹配然后替换
[root@localhost ~]# abc=administrator    
[root@localhost ~]# echo ${abc/#adm/ABCD}
ABCDinistrator
 
# 后缀替换
[root@localhost ~]# abc=administrator  
[root@localhost ~]# echo ${abc/%tor/Tor}
administraTor
 
# 匹配变量 ${!var*}和${!var@}
[root@localhost ~]# var1=100
[root@localhost ~]# var2=200
[root@localhost ~]# var3=300
[root@localhost ~]# echo ${!var*}
var1 var2 var3
[root@localhost ~]# echo ${!var@}
var1 var2 var3
 
# 读取一个文件内容赋给一个变量，如果内容是多行，则echo的时候会去掉换行符，如下所示：
[root@localhost ~]# cat test.txt
AA
BB
CC
DD
EE
[root@localhost ~]# var=$(cat test.txt)
[root@localhost ~]# echo $var
AA BB CC DD EE
 
# 这在很多时候是很不方便的，如果保留换行符的话仅仅将变量括起来就可以了：
[root@localhost ~]# echo "$var"
AA
BB
CC
DD
EE
 
# 然后可以对每一行进行操作：
[root@localhost ~]# echo "$var" | while read line
> do
> echo [$line]
> done
[AA]
[BB]
[CC]
[DD]
[EE]
```

:::

::: details （9）巧读配置文件

```bash
# 配置文件
[root@localhost ~]# cat config.ini 
#注意下面的配置=号两边不能有空格
HOST='0.0.0.0'
PORT=55555

# Bash脚本
[root@localhost ~]# cat demo.sh 
#!/bin/bash
source config.ini
echo "The Host is ${HOST}:${PORT}"

# 测试
[root@localhost ~]# bash demo.sh
The Host is 0.0.0.0:55555
```

:::

::: details （10）变量安全性

**`set -u`变量不存在则报错退出脚本**

Bash遇到不存在的变量，默认会忽略，然后继续向下执行，这有时候会给我们带来灾难性事故，

比如这样一行代码`rm -rf ${Dir}/*`，如果Dir变量不存在，这会将我们的系统/删掉！

```bash
[root@localhost ~]# cat demo.sh 
#!/bin/bash
set -u
echo ${Dir}
echo "End"

[root@localhost ~]# bash demo.sh 
demo.sh: line 4: Dir: unbound variable
[root@localhost ~]# echo $?
1
# 可以看到，脚本报错并退出了，后面的代码也不会执行
```



**`set -e`脚本一旦报错便退出**

Bash如果遇到报错，默认会忽略，还会继续往下执行，这也不符合我们的预期

```bash
# 演示错误情景
[root@localhost ~]# cat demo.sh 
#!/bin/bash
set -u
a
echo "End"

[root@localhost ~]# bash demo.sh
demo.sh: line 3: a: command not found  # 报错了，但是还会继续向下执行
End

# 演示正确情景
[root@localhost ~]# cat demo.sh
#!/bin/bash
set -u
set -e  # 添加set -e
a
echo "End"

[root@localhost ~]# bash demo.sh
demo.sh: line 4: a: command not found  # 报错了，不会继续向下执行
```



**`set -o pipefail`对`set -e`的补充**

`set -e`有一个例外情况，就是不适用于管道命令

```bash
[root@localhost ~]# cat demo.sh
#!/bin/bash
set -u
set -e
a | echo 1
echo "End"

[root@localhost ~]# bash demo.sh
1
demo.sh: line 4: a: command not found
End
```

`set -o pipefail`就是用来解决这种情况，只要一个子命令失败，整个管道命令就失败，脚本就会终止执行

```bash
[root@localhost ~]# cat demo.sh
#!/bin/bash
set -u
set -e
set -o pipefail
a | echo 1
echo "End"

[root@localhost ~]# bash demo.sh
demo.sh: line 5: a: command not found
1
```

**总结**

推荐使用下面这种写法

```bash
#!/bin/bash
set -euo pipefail
```

> 还有一种方法也能达到同样的效果，`bash -euxo pipefail demo.sh`，但是你不能保证调用时永远会记得添加`-euxo pipefail`选项，所以并不推荐

:::

<br />

### 语句

::: details （1）测试语句

测试语句可以使用 [ 比较语句 ] 和 [[ 比较语句 ]]，注意语句和前后中括号都有一个空格 也可以用test

使用[[ ... ]]条件判断结构，而不是[ ... ]，能够防止脚本中的许多逻辑错误。比如，&&、||、<和> 操作符能够正常存在于[[ ]]条件判断结构中，但是如果出现在[ ]结构中的话，可能会报错，但有些判断使用[[ ]]会出错而使用[ ]确没问题，具体如何使用，自己测试一下就好。



**整数比较**

| 代码 | 说明     |
| ---- | -------- |
| -eq  | 等于     |
| -ne  | 不等于   |
| -lt  | 小于     |
| -le  | 小于等于 |
| -gt  | 大于     |
| -ge  | 大于等于 |

`demo.sh`

```bash
#!/bin/bash
read -p "请输入一个整数:" num
if [ -z $num ];then
    echo "输入不存在!"
    exit 1
fi
nu=$(echo $num | tr -d '[0-9]' | sed 's/^-//')
if [ -z $nu ];then
    echo "您输入的是整数，检测通过"
else
    echo "请您输入合法的整数"
fi
```

**字符串比较**

| 代码 | 说明                                             |
| ---- | ------------------------------------------------ |
| -n   | 检测字符串是否不为空                             |
| -z   | 检测字符串是否为空                               |
| ==   | 测试两个字符串是否相等                           |
| !=   | 测试两个字符串是否不相等                         |
| =~   | 测试字符串（前者）是否包含另外一个字符串（后者） |

`demo.sh`

```bash
#!/bin/bash
if [[ "abc" =~ "ab" ]];then
    echo ok
else
    echo faile
fi
```

**文件操作符**

| 代码 | 说明                     |
| ---- | ------------------------ |
| -d   | 测试是否是目录           |
| -e   | 测试文件或者目录是否存在 |
| -f   | 测试是否是一般文件       |
| -r   | 测试文件是否是可读       |
| -w   | 测试文件是否可写         |
| -x   | 测试文件是否可执行       |
| -s   | 测试文件大小是否不为空   |
| -L   | 测试文件是否是链接文件   |

**逻辑运算符**

| 代码 | 说明                 |
| ---- | -------------------- |
| !    | 非，取反             |
| -a   | 与，同时为真则为真   |
| -o   | 或，有一个为真则为真 |

下面的两个脚本效果是一样的，注意第一个脚本不能用[[ ]]

```bash
#!/bin/bash
if [ 1 -lt 2 -a 2 -lt 3 ];then
        echo ok
else
        echo no
fi
 
 
#!/bin/bash
if [[ 1 -lt 2 ]] && [[ 2 -lt 3 ]];then
        echo ok
else
        echo no
fi
```

:::

::: details （2）if 语句

```bash
if 表达式;then
    表达式
elif 表达式;then
    表达式
else
    表达式
fi
#elif和else都不是必须的
```

:::

::: details （3）while 语句

```bash
while 表达式;do
    表达式
done
```

:::

::: details （4）for 语句

```bash
结构一：
for((表达式;表达式;表达式;)); do
    表达式
done
比如
for((i=1;i<=100;i++)); do
    echo $i
done
 
结构二：
for i in 表达式; do
    表达式
done
比如
for i in `seq 100`; do
    echo $i
done
 
for i in {1..100}; do
    echo $i
done
{1..100}表示起始为1，结束位100，步长默认为1，可以指定{1..100..2},比如
[root@localhost ~]# for i in {a..z..2}; do echo $i;done
```

一个简单的进度条

`demo.sh`

```bash
#!/bin/sh
b=''
for ((i=0;$i<=100;i+=2))
do
    printf "progress:[%-50s]%d%%\r" $b $i
    sleep 0.1
 
    b=#$b
done
echo
```

:::

::: details （5）for和while的一点区别

```bash
# (1) 看下面两条语句，执行效果，但是他们一样吗？
[root@ap-hongkang ~]# for line in $(seq 5); do echo $line; done
1
2
3
4
5
[root@ap-hongkang ~]# seq 5 | while read line; do echo $line; done
1
2
3
4
5

# (2) 看一下不一样的地方
[root@ap-hongkang ~]# sum=0; for i in $(seq 10); do sum=$(echo "${sum} + ${i}" | bc); done; echo ${sum}
55

[root@ap-hongkang ~]# sum=0; seq 10 | while read i; do sum=$(echo "${sum} + ${i}" | bc); done; echo $sum
0

# (3) 让我们在while循环中输出sum的值
[root@ap-hongkang ~]# sum=0; seq 10 | while read i; do sum=$(echo "${sum} + ${i}" | bc); echo ${sum}; done; echo $sum
1
3
6
10
15
21
28
36
45
55
0

# 总结：如果要在循环内修改外部的变量，不要在 while read line; do xxx; done 中修改
```

:::

::: details （6）case语句

```bash
#!/bin/bash
echo -n '请输入一个数字:'
read number
 
case $number in
 
(1|2|3)
        echo '1-3';;
(4|5|6)
        echo  '4-6';;
(7|8|9)
        echo '7-9';;
*)
        echo '输入的不是数字!';;
esac
```

:::

::: details （7）continue和break 

```bash
# continue 跳过本次循环，继续下一次循环

#!/bin/bash
for ((i=1;i<=100;i++)); do
    if [ $i -eq 50 ];then
        continue
    fi
    sum=$((sum+i))
done
echo $sum
 
[root@localhost ~]# bash test.sh
5000

# break 直接退出整个循环
#!/bin/bash
for ((i=1;i<=1150;i++))； do
    if [ $i -eq 101 ];then
        break
    fi
    sum=$((sum+i))
done
echo $sum
 
[root@localhost ~]# bash test.sh
5050
```

:::

::: details （8）eval将字符串作为语句执行

```bash
# 经典的获取最后一个参数命令
#!/bin/bash
echo "最后一个参数是:"$(eval echo "\$$#")

# 其他举例
[root@localhost ~]# seq 10 >1.txt
[root@localhost ~]# name="cat 1.txt"
[root@localhost ~]# eval $name
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
```

:::

::: details （9）exec执行命令后退出当前终端

```bash
# 检测网络
ping -i 0.1  -c 10 www.baidu.com &>/dev/null || exec  echo "Network is unreachable"

# 检测用户
if [ `id -u` -ne 0 ];then exec echo "Must be root can run it"; fi
```

:::

::: details （10）getopts命令行参数处理

> 注：只支持短选项

```bash
#!/bin/bash
#取得每个选项的值
if [ $# -lt 1 ]
then
    echo "there is no option";
else
    while getopts ":a:i:s:v:x:" opt;
    do
        case $opt  in
        a)echo "option is a ,the value is $OPTARG" ;;
 
        i)echo "option is i ,the value is $OPTARG" ;;
 
        s)echo "option is s,the value is $OPTARG" ;;
 
    v)echo "option is v ,the value is $OPTARG" ;;
 
    x)echo "option is x ,the value is $OPTARG" ;;
 
        esac
     done
fi
 
[root@localhost ~]# bash test.sh -a A -i I -s S -x X -v V
option is a ,the value is A
option is i ,the value is I
option is s,the value is S
option is x ,the value is X
option is v ,the value is V
```

:::

<br />

## 文本处理

### find

**基础语法**

::: details （1）选项

| 选项        | 说明                                                         |
| ----------- | ------------------------------------------------------------ |
| `-name`     | 指定文件名，区分大小写                                       |
| `-iname`    | 指定文件名，不区分大小写                                     |
| `-type`     | 指定文件类型，比如`f`代表普通文件，`d`代表目录               |
| `-size`     | 指定文件大小                                                 |
| `-mmin`     | 指定修改时间，单位分钟                                       |
| `-mtime`    | 指定修改时间，单位天                                         |
| `-perm`     | 指定文件权限                                                 |
| `-maxdepth` | 指定文件查找的目录深度                                       |
| `-prune`    | 使不在当前指定目录查找，如果同时使用`-depth`，那么`-prune`选项会被忽略 |
| `-print`    | 输出到stdout                                                 |
| `-printf`   | 格式化输出到stdout                                           |
| `-regex`    | 匹配正则表达式                                               |

:::

::: details （2）语法

**通配符**

| 通配符 | 说明                 |
| ------ | -------------------- |
| `*`    | 任意长度的任意字符串 |
| `?`    | 任意单个字符         |
| `[]`   | 里面的任意一个       |
| `[^]`  | 排除里面的所有       |

**运算符**

| 运算符 | 说明 |
| ------ | ---- |
| `!`    | 非   |
| `-a`   | 与   |
| `-o`   | 或   |

**格式化输出**

| 格式化符号 | 说明                                       |
| ---------- | ------------------------------------------ |
| `%p`       | 输出完整路径的文件名                       |
| `%P`       | 输出相对路径的文件名（相对于搜索路径而言） |
| `%f`       | 仅输出文件名                               |
| `%F`       | 输出文件所在的文件系统                     |
| `%s`       | 输出文件大小                               |
| `%i`       | 输出文件inode节点号                        |
| `%y`       | 输出文件类型，等同于`ls -l`中的结果        |

**可选表达式**

| 表达式                | 说明                                                         |
| --------------------- | ------------------------------------------------------------ |
| `-exec command {} \;` | 执行自定义命令，但更推荐使用 find 路径 选项 \| xargs command |
| `-delete`             | 删除                                                         |

:::

**使用示例**

::: details （1）基础示例

```bash
[root@node-1 ~]# cd /tmp

[root@node-1 tmp]# ls -lh
total 0
drwx------ 3 root root 17 Jan 26 05:03 systemd-private-c5dd9316255142399a45fd27b3722f9a-chronyd.service-hg9mss

# 直接输入find,等同于find .
# 1.会列出当前目录下的所有文件或目录
# 2.默认支持隐藏文件
# 3.默认支持递归
# 4.输出结果默认包含目标目录,在这里是.(即当前目录)
[root@node-1 tmp]# find
.
./.Test-unix
./.font-unix
./.XIM-unix
./.X11-unix
./.ICE-unix
./systemd-private-c5dd9316255142399a45fd27b3722f9a-chronyd.service-hg9mss
./systemd-private-c5dd9316255142399a45fd27b3722f9a-chronyd.service-hg9mss/tmp

[root@node-1 tmp]# find .
.
./.Test-unix
./.font-unix
./.XIM-unix
./.X11-unix
./.ICE-unix
./systemd-private-c5dd9316255142399a45fd27b3722f9a-chronyd.service-hg9mss
./systemd-private-c5dd9316255142399a45fd27b3722f9a-chronyd.service-hg9mss/tmp

# 对比一下和上面输出的有什么不同
[root@node-1 tmp]# find /tmp
/tmp
/tmp/.Test-unix
/tmp/.font-unix
/tmp/.XIM-unix
/tmp/.X11-unix
/tmp/.ICE-unix
/tmp/systemd-private-c5dd9316255142399a45fd27b3722f9a-chronyd.service-hg9mss
/tmp/systemd-private-c5dd9316255142399a45fd27b3722f9a-chronyd.service-hg9mss/tmp
```

:::

::: details （2）限定搜索深度

```bash
[root@node-1 ~]# find / -maxdepth 1
/
/boot
/dev
/home
/proc
/run
/sys
/etc
/root
/var
/tmp
/usr
/bin
/sbin
/lib
/lib64
/media
/mnt
/opt
/srv
/.autorelabel

# 请注意：如果使用-maxdepth选项则-maxdepth必须是第一个选项
[root@node-1 ~]# find / -type f -maxdepth 1
find: warning: you have specified the -maxdepth option after a non-option argument -type, but options are not positional (-maxdepth affects tests specified before it as well as those specified after it).  Please specify options before other arguments.

/.autorelabel
[root@node-1 ~]# find / -maxdepth 1 -type f
/.autorelabel
```

:::

::: details （3）限定文件类型

```bash
# 只搜索文件
[root@node-1 ~]# find / -maxdepth 1 -type f
/.autorelabel

# 只搜索目录
[root@node-1 ~]# find / -maxdepth 1 -type d
/
/boot
/dev
/home
/proc
/run
/sys
/etc
/root
/var
/tmp
/usr
/media
/mnt
/opt
/srv
```

:::

::: details （3）限定文件名称

```bash
# 搜索文件类型，且文件名必须以.log结尾
[root@node-1 ~]# find / -type f -name "*.log"
/var/log/audit/audit.log
/var/log/tuned/tuned.log
/var/log/anaconda/anaconda.log
/var/log/anaconda/X.log
/var/log/anaconda/program.log
/var/log/anaconda/packaging.log
/var/log/anaconda/storage.log
/var/log/anaconda/ifcfg.log
/var/log/anaconda/ks-script-1Tfa8Y.log
/var/log/anaconda/ks-script-qy7nS2.log
/var/log/anaconda/journal.log
...
```

:::

::: details （4）限定文件大小

```bash
# 搜索所有大于100M的文件
[root@node-1 ~]# find / -type f -size +100M
/proc/kcore
find: ‘/proc/13517/task/13517/fdinfo/6’: No such file or directory
find: ‘/proc/13517/fdinfo/5’: No such file or directory
/root/.data.txt
/root/sed-data.txt
/root/cpulimit-sed-data.txt
/root/go-data.txt
/var/cache/yum/x86_64/7/updates/gen/primary_db.sqlite
/usr/bin/kubelet
/usr/lib/locale/locale-archive
/usr/local/kubernetes/kubeadm/kubernetes-images-v1.25.4.tar.gz
/usr/local/kubernetes/kubeadm/kube-apiserver-v1.25.5.tar
/usr/local/kubernetes/kubeadm/kube-controller-manager-v1.25.5.tar
/usr/local/kubernetes/kubeadm/etcd-3.5.5-0.tar
/usr/local/kubernetes/kubeadm/kube-apiserver-v1.25.4.tar
/usr/local/kubernetes/kubeadm/kube-controller-manager-v1.25.4.tar
/usr/local/kubernetes/cni/calico.tar.gz
/usr/local/kubernetes/cni/calico-cni-v3.24.5.tar
/usr/local/kubernetes/cni/calico-node-v3.24.5.tar
```

:::

::: details （5）排除一个或多个目录

```bash
# 注意事项：如果同时使用-depth或-maxdepth，那么-prune选项会被忽略,结果将于预期不符

# 排除单个目录
# -path "/proc" -prune 用于排除目录
# -o                   逻辑或
# -size +100M          搜索大于100M的文件
# -print               不是必须要有的，但是如果后面要接管道|的话则必须要加上，所以建议一直加上
[root@node-1 ~]# find / -path "/proc" -prune -o -type f -size +100M -print
/root/.data.txt
/root/sed-data.txt
/root/cpulimit-sed-data.txt
/root/go-data.txt
/var/cache/yum/x86_64/7/updates/gen/primary_db.sqlite
/usr/bin/kubelet
/usr/lib/locale/locale-archive
/usr/local/kubernetes/kubeadm/kubernetes-images-v1.25.4.tar.gz
/usr/local/kubernetes/kubeadm/kube-apiserver-v1.25.5.tar
/usr/local/kubernetes/kubeadm/kube-controller-manager-v1.25.5.tar
/usr/local/kubernetes/kubeadm/etcd-3.5.5-0.tar
/usr/local/kubernetes/kubeadm/kube-apiserver-v1.25.4.tar
/usr/local/kubernetes/kubeadm/kube-controller-manager-v1.25.4.tar
/usr/local/kubernetes/cni/calico.tar.gz
/usr/local/kubernetes/cni/calico-cni-v3.24.5.tar
/usr/local/kubernetes/cni/calico-node-v3.24.5.tar

# 排除多个目录
[root@node-1 ~]# find / \( -path "/proc" -o -path "/root" \) -prune -o -type f -size +100M -print
/var/cache/yum/x86_64/7/updates/gen/primary_db.sqlite
/usr/bin/kubelet
/usr/lib/locale/locale-archive
/usr/local/kubernetes/kubeadm/kubernetes-images-v1.25.4.tar.gz
/usr/local/kubernetes/kubeadm/kube-apiserver-v1.25.5.tar
/usr/local/kubernetes/kubeadm/kube-controller-manager-v1.25.5.tar
/usr/local/kubernetes/kubeadm/etcd-3.5.5-0.tar
/usr/local/kubernetes/kubeadm/kube-apiserver-v1.25.4.tar
/usr/local/kubernetes/kubeadm/kube-controller-manager-v1.25.4.tar
/usr/local/kubernetes/cni/calico.tar.gz
/usr/local/kubernetes/cni/calico-cni-v3.24.5.tar
/usr/local/kubernetes/cni/calico-node-v3.24.5.tar
```

:::

::: details （6）配合xargs使用，搜索大文件并按照文件大小排序

```bash
# 搜索大于100M的文件，并按照文件大小从大到小排序
[root@node-1 lib]# find / -path "/proc" -prune -o -type f -size +100M -print | xargs ls -lh --sort=size
-rw-r--r--  1 root root 7.1G Jan 25 13:23 /root/cpulimit-sed-data.txt
-rw-r--r--  1 root root 7.1G Jan 25 17:22 /root/go-data.txt
-rw-r--r--  1 root root 7.1G Jan 25 12:40 /root/sed-data.txt
-rw-r--r--  1 root root 6.0G Jan 25 09:28 /root/.data.txt
-rw-------  1 root root 288M Jan 12 14:31 /usr/local/kubernetes/kubeadm/etcd-3.5.5-0.tar
-rw-------  1 root root 219M Jan 12 14:54 /usr/local/kubernetes/cni/calico-node-v3.24.5.tar
-rw-r-----  1 root root 207M Jan 12 14:34 /usr/local/kubernetes/kubeadm/kubernetes-images-v1.25.4.tar.gz
-rw-------  1 root root 189M Jan 12 14:54 /usr/local/kubernetes/cni/calico-cni-v3.24.5.tar
-rw-r-----  1 root root 188M Jan 12 14:58 /usr/local/kubernetes/cni/calico.tar.gz
-rw-------  1 root root 124M Jan 12 11:48 /usr/local/kubernetes/kubeadm/kube-apiserver-v1.25.5.tar
-rw-------  1 root root 124M Jan 12 14:31 /usr/local/kubernetes/kubeadm/kube-apiserver-v1.25.4.tar
```

:::

::: details （7）限定修改时间

```bash
# 搜索/下(排除/proc和/sys目录)5分钟内修改过的文件
#   说明：-mmin -5 代表5分钟之内，如果是+5则代表5分钟之外(之前)，如果是5则代表5分钟之前、10分钟之内
#   注意：搜索出来的结果中有/proc和/sys目录,所以需要grep排除一下
[root@node-1 ~]# find / \( -path "/proc" -o -path "/sys" \) -prune -o -type f -mmin -5 | grep -Ev '/proc|/sys' | xargs ls -lh
...
-rw-r--r--  1 root root  396 Jan 26 19:54 /var/lib/kubelet/pods/f47cf7c6bb70ee9fcffdf5765676c723/etc-hosts
-rw-------  1 root root  124 Jan 26 19:55 /var/lib/rsyslog/imjournal.state
-rw-------  1 root root 632K Jan 26 19:52 /var/log/audit/audit.log
-rw-r--r--  1 root root 1.6M Jan 26 19:54 /var/log/calico/cni/cni.log
-rw-r--r--. 1 root root 286K Jan 26 19:52 /var/log/lastlog
-rw-------  1 root root  49M Jan 26 19:55 /var/log/messages
-rw-rw-r--. 1 root utmp 230K Jan 26 19:52 /var/log/wtmp

# 搜索/下(排除/proc和/sys目录)1天内修改过的文件
[root@node-1 ~]# find / \( -path "/proc" -o -path "/sys" \) -prune -o -type f -mtime -1 | grep -Ev '/proc|/sys' | xargs ls -lh
...
-rw-------. 1 root    root       0 Jan 26 12:09 /var/log/boot.log
-rw-------  1 root    root     26K Jan 26 12:09 /var/log/boot.log-20230126
-rw-r--r--  1 root    root    1.6M Jan 26 19:58 /var/log/calico/cni/cni.log
-rw-------  1 root    root    5.4K Jan 26 19:50 /var/log/cron
-rw-------  1 root    root     19K Jan 26 12:09 /var/log/cron-20230126
-rw-r--r--  1 root    root     34K Jan 26 05:03 /var/log/dmesg
-rw-r--r--. 1 root    root    286K Jan 26 19:52 /var/log/lastlog
-rw-------  1 root    root       0 Jan 26 12:09 /var/log/maillog
-rw-------  1 root    root    1.5K Jan 26 05:03 /var/log/maillog-20230126
-rw-------  1 root    root     49M Jan 26 19:58 /var/log/messages
-rw-------  1 root    root     73M Jan 26 12:09 /var/log/messages-20230126
-rw-r--r--  1 root    root    170K Jan 26 19:50 /var/log/sa/sa26
-rw-------  1 root    root     657 Jan 26 14:49 /var/log/secure
-rw-------  1 root    root     12K Jan 26 06:09 /var/log/secure-20230126
-rw-------  1 root    root       0 Jan 26 12:09 /var/log/spooler
-rw-r--r--. 1 root    root     79K Jan 26 05:03 /var/log/tuned/tuned.log
-rw-rw-r--. 1 root    utmp    230K Jan 26 19:52 /var/log/wtmp
-rw-------. 1 root    root       9 Jan 26 12:09 /var/spool/anacron/cron.daily
-rw-------. 1 root    root       9 Jan 26 12:09 /var/spool/anacron/cron.weekly
-rw-------  1 root    root      33 Jan 26 05:03 /var/spool/postfix/pid/master.pid
```

:::

<br />

### grep

<br />

### sed

`sed`是一个行编辑神器

<br />

**流程分析**

sed 基本流程

1. 首先读取一行到一个称为 **模式空间（PATTERN SPACE） **的对象中去，如果模式空间有内容会被覆盖

2. 然后执行 **多个子命令** 进行处理，在处理的过程中会涉及到另外一个空间称为 **保持空间（HOLD SPACE）**，这样可以支持一些复杂的操作

   子命令举例：

   * `p` 输出模式空间的内容
   * `d` 删除模式空间的内容
   * `h` 将模式空间的内容以覆盖的方式写入保持空间
   * `G` 将保持空间的内容追加到模式空间

3. 子命令执行完以后 **输出模式空间的内容（要求没有添加sed -n选项）** 并 **清空模式空间**

4. 本行处理结束，接着处理下一行，如此循环，直到尾行

::: details sedsed 调试工具安装

```bash
# 安装sedsed
[root@ap-hongkang ~]# pip3 install sedsed

# 查看版本
[root@ap-hongkang ~]# sedsed --version
sedsed v2.0.0
```

:::

::: details sedsed 调试示例1

```bash
# 下面的示例效果是：什么也不做，原样输出原始行
[root@ap-hongkang ~]# seq 3 | sed -n 'p'
1
2
3

# 使用sedsed进行调试,使用方法: 将sed替换为sedsed -d
[root@ap-hongkang ~]# seq 3 | sedsed -d -n 'p'
# 第1行处理
PATT:1$    # 读取第一行所有内容到模式空间中，PATT代表模式空间，1代表模式空间的内容为1，$代表行尾或者说代表一个换行符
HOLD:$     # 保持空间内容为空
COMM:p     # 执行p命令，将模式空间内容输出到终端
1          # 此时屏幕显示1
PATT:1$    # sed所有的子命令执行完毕,模式空间内容为1，因为sed加了-n选项，所以不输出模式空间内容
HOLD:$     # sed所有的子命令执行完毕,保持空间内容为空

# 第2行处理
PATT:2$
HOLD:$
COMM:p
2
PATT:2$
HOLD:$

# 第3行处理
PATT:3$
HOLD:$
COMM:p
3
PATT:3$
HOLD:$
```

:::

::: details sedsed 调试示例2

```bash
# 下面的示例是在每行后追加一个换行符，然后输出
[root@ap-hongkang ~]# seq 3 | sed 'G'
1

2

3

[root@ap-hongkang ~]# seq 3 | sedsed -d 'G'
PATT:1$
HOLD:$
COMM:G      # 执行G命令，将保持空间的内容追加到模式空间，因为保持空间内容为空，实际上是一个空行，所以模式空间的内容会加一个换行符
PATT:1\n$   # sed所有的子命令执行完毕,模式空间内容为1\n，因为sed没有-n选项，所以输出模式空间内容
HOLD:$      # sed所有的子命令执行完毕,保持空间内容为空
1

PATT:2$
HOLD:$
COMM:G
PATT:2\n$
HOLD:$
2

PATT:3$
HOLD:$
COMM:G
PATT:3\n$
HOLD:$
3
```

:::

<br />

**1、常用命令**

::: details （1）常用选项、命令列表和文本定位方式

**常用选项**

| 选项 | 说明                                                         |
| ---- | ------------------------------------------------------------ |
| `-r` | 启用扩展的正则表达式，若使用该选项则应该是第一个选项         |
| `-n` | 禁止自动输出模式空间内容                                     |
| `-i` | 直接对文件进行修改                                           |
| `-z` | 用NUL字符分隔行，当需要对行尾\n做操作的时候可以使用该参数达到预期效果 |

**文本定位**

| 定位                    | 说明                                          |
| ----------------------- | --------------------------------------------- |
| `x`                     | 匹配第x行                                     |
| `x, +n`                 | 匹配第x到x+n行                                |
| `x,y`                   | 匹配第x行到第y行之间的所有行                  |
| `x,y!`                  | 取反，匹配不包含第x行与第y行之间的所有行      |
| `1~2`                   | 指定起始为第1行，步长为2，sedsed不支持 ~ 符号 |
| `/pattern/`             | 匹配指定模式所在行                            |
| `/pattern1/,/pattern2/` | 匹配模式1到模式2之间的所有行                  |
| `x, /pattern/`          | 匹配第x行到模式之间的所有行                   |
| `/pattern/, x`          | 匹配模式到第x行之间的所有行                   |

**常用命令**

| 命令  | 说明                                             |
| ----- | ------------------------------------------------ |
| `p`   | 输出模式空间内容                                 |
| `=`   | 输出文件行号                                     |
| `i \` | 行前插入新行                                     |
| `a \` | 行后追加新行                                     |
| `s`   | 字符串替换                                       |
| `y`   | 字符替换                                         |
| `c \` | 用新文本替换模式空间内容                         |
| `d`   | 删除模式空间的内容                               |
| `D`   | 删除模式空间的第一行内容                         |
| `h`   | 将模式空间的内容覆盖到保持空间                   |
| `H`   | 将模式空间的内容追加到保持空间                   |
| `g`   | 将保持空间的内容覆盖到模式空间                   |
| `G`   | 将保持空间的内容追加到模式空间                   |
| `x`   | 互换模式空间和保持空间的内容                     |
| `n`   | 读取下一行覆盖在模式空间，并在当前命令中继续处理 |
| `N`   | 读取下一行追加在模式空间，并在当前命令中继续处理 |

:::

::: details （2）输出特定规则的行

```bash
# 输出第一行, 1代表第一行
[root@ap-hongkang ~]# seq 3 | sed -n '1p'
1

# 输出最后一行, $代表最后一行
[root@ap-hongkang ~]# seq 3 | sed -n '$p'
3

# 输出倒数第2行
[root@ap-hongkang ~]# seq 3 | tail -n 2 | sed -n '1p'
2

# -------------------------------------------------------

# 输出奇数行, 1~2代表: 起始行为第一行,步长为2
[root@ap-hongkang ~]# seq 10 | sed -n '1~2p'
1
3
5
7
9

[root@ap-hongkang ~]# seq 10 | sed -n 'p;n'
1
3
5
7
9

# 输出偶数行
[root@ap-hongkang ~]# seq 10 | sed -n '2~2p'
2
4
6
8
10

# 输出偶数行
[root@ap-hongkang ~]# seq 10 | sed -n 'n;p'
2
4
6
8
10

# 每隔N行输出一行
[root@ap-hongkang ~]# seq 10 | sed -n '0~3p'
3
6
9

# -------------------------------------------------------

# 输出开头是2-5之间数字的行，就是一个简单的正则匹配
[root@ap-hongkang ~]# seq 100 | sed -rn '/^[2,5]/p'
2
5
20
21
22
23
24
25
26
27
28
29
50
51
52
53
54
55
56
57
58
59

# -------------------------------------------------------

# 第N行和N+1行互换
[root@ap-hongkang ~]# seq 5 | sed '3h;4G;3d'
1
2
4
3
5
```

:::

::: details （3）字符串替换及注意事项

```bash
# MAC地址处理示例
#   g 用于匹配所有的次数
#   q 用于匹配一次后退出
[root@ap-hongkang ~]# echo "00163e0043c6" | sed -r 's/(..)/\1:/g' | sed -r 's/(.*):/\1/'
00:16:3e:00:43:c6

[root@ap-hongkang ~]# echo 00:16:3e:00:43:c6 | sed -r 's/\://g'
00163e0043c6

# ------------------------------------------------------------------------------

# 可以用&代指匹配的内容，比如使用正则匹配一个不知道具体内容的字符串
[root@ap-hongkang ~]# echo -e "ABC\n123" | sed -r 's/^[0-9]+$/& 这行全是数字/'
ABC
123 这行全是数字

# 后向引用，与&相比更加灵活，引用前需要先对匹配的使用()内容分组
[root@ap-hongkang ~]# echo -e "ABC\n456" | sed -r 's/(^[0-9])([0-9]*$)/\1\2 这行全是数字,第一个数字是: \1/'
ABC
456 这行全是数字,第一个数字是: 4

[root@ap-hongkang ~]# echo "00163e0043c6" | sed -r 's/(..)(..)(..)(..)(..)(..)/\1:\2:\3:\4:\5:\6/'
00:16:3e:00:43:c6

# ------------------------------------------------------------------------------

# 一行拆分为两行
[root@ap-hongkang ~]# echo "123456789" | sed -r 's/.{5}/&\n/'
12345
6789

# 多行合并为一行
[root@ap-hongkang ~]# echo -e "12345\n6789" | sed -z 's/\n//g' ; echo
123456789
[root@ap-hongkang ~]# echo -e "12345\n6789" | tr -d '\n' ; echo  # 使用tr命令的做法
123456789

# ------------------------------------------------------------------------------

# 仅支持贪婪匹配模式，不支持非贪婪模式
[root@ap-hongkang ~]# echo "123abc456def789" | sed -r 's/(^[0-9].*[0-9])/\1/'
123abc456def789

# ------------------------------------------------------------------------------

# 当匹配的内容包含/时，可以使用任意字符替换sed的语法中的/
[root@ap-hongkang ~]# echo /etc/sysconfig/network-scripts/ifcfg-eth0 | sed -r 's#(.*)/(.*)#\2#'
ifcfg-eth0
```

:::

::: details （4）修改文件及注意事项

```bash
# 添加行
[root@ap-hongkang ~]# seq 3 > 1.txt
[root@ap-hongkang ~]# sed -ri '1i第一行之前' 1.txt
[root@ap-hongkang ~]# sed -ri '$a最后一行后' 1.txt
[root@ap-hongkang ~]# cat 1.txt 
第一行之前
1
2
3
最后一行后

# 在每一行后插入一个空行，但最后一行除外
[root@ap-hongkang ~]# seq 3 > 1.txt
[root@ap-hongkang ~]# sed -ri '$!G' 1.txt
[root@ap-hongkang ~]# cat 1.txt 
1

2

3
# 修改文件内容
[root@ap-hongkang ~]# sed -ri 's/^(SELINUX=)(.*)/\1disabled/' /etc/selinux/config
[root@ap-hongkang ~]# grep ^SELINUX= /etc/selinux/config
SELINUX=disabled

# 空白问题现象, a包含3个空格
[root@ap-hongkang ~]# a='   123' && seq -f "%05g" 3 >1.txt
[root@ap-hongkang ~]# sed -i "2i $a" 1.txt
[root@ap-hongkang ~]# cat 1.txt
00001
123    # 前面的空白没了?
00002
00003

# 解决空白问题
[root@ap-hongkang ~]# a='   123' && seq -f "%05g" 3 >1.txt && sed -i "2i \ $a" 1.txt
[root@ap-hongkang ~]# cat 1.txt 
00001
    123  # 空白还在,但是多了一个空格
00002
00003
[root@ap-hongkang ~]# a='   123' && seq -f "%05g" 3 >1.txt && sed -i "2i \\$a" 1.txt
[root@ap-hongkang ~]# cat 1.txt 
00001
   123  # 这次可以了
00002
00003
```

:::

<br />

**2、专家命令**

由于此命令太过于霸道（复杂），不推荐使用

::: details （1）每N行合并为一行

```bash
[root@ap-hongkang ~]# seq 9 | sed ':1;N;s/\n/ /;0~3b;t1' 
1 2 3
4 5 6
7 8 9

# 单个命令分析
# :1       定义了一个叫做 1 的标签
# N        读取下一行追加在模式空间，并在当前命令中继续处理
# s替换     将换行符替换为空格
# 0~3      起始行为0，步长为3,这会匹配3、6、9、12...行
# b和t     是流程控制命令，除了这两个，还有一个 T
# b label  跳转到标签，如果标签省略，则跳转到脚本结尾
# t label  如果s命令执行成功，则执行t命令，如果t后面没有标签，则跳转到脚本结尾
# T label  如果s命令执行失败，则执行T命令，如果T后面没有标签，则跳转到脚本结尾.T命令只有GNU sed才有

# 汇总起来分析
# 这其实就像是一个简单的循环
# 1.当读取的行是3的倍数时一次sed命令处理完成，输出模式空间的结果。核心是 0~3b, b来控制一次sed命令处理完成
# 2.当读取的行不是3的倍数时,读取下一行到模式空间,此时模式空间有两行或多行,然后替换换行符，然后跳转标签继续从头开始处理(t1)

# 使用sedsed debug
[root@ap-hongkang ~]# seq 9 | sedsed -d ':1;N;s/\n/ /;0~3b;t1' 
PATT:1$
HOLD:$
COMM::1
COMM:N
PATT:1\n2$
HOLD:$
COMM:s/\n/ /
PATT:1 2$
HOLD:$
COMM:0~3 b
PATT:1 2$
HOLD:$
COMM:t 1
COMM:N
PATT:1 2\n3$
HOLD:$
COMM:s/\n/ /
PATT:1 2 3$
HOLD:$
COMM:0~3 b
1 2 3
PATT:4$
HOLD:$
COMM::1
COMM:N
PATT:4\n5$
HOLD:$
COMM:s/\n/ /
PATT:4 5$
HOLD:$
COMM:0~3 b
PATT:4 5$
HOLD:$
COMM:t 1
COMM:N
PATT:4 5\n6$
HOLD:$
COMM:s/\n/ /
PATT:4 5 6$
HOLD:$
COMM:0~3 b
4 5 6
PATT:7$
HOLD:$
COMM::1
COMM:N
PATT:7\n8$
HOLD:$
COMM:s/\n/ /
PATT:7 8$
HOLD:$
COMM:0~3 b
PATT:7 8$
HOLD:$
COMM:t 1
COMM:N
PATT:7 8\n9$
HOLD:$
COMM:s/\n/ /
PATT:7 8 9$
HOLD:$
COMM:0~3 b
7 8 9
```

:::

::: details （2）奇偶行处理

```bash
# 使用b标签跳转
[root@ap-hongkang ~]# seq 9 | sed -n '1~2b1;s/$/  这是偶数行/p;b;:1;s/$/  这是奇数行/p'
1  这是奇数行
2  这是偶数行
3  这是奇数行
4  这是偶数行
5  这是奇数行
6  这是偶数行
7  这是奇数行
8  这是偶数行
9  这是奇数行

# 不使用标签
[root@ap-hongkang ~]# seq 9 | sed -n 's/$/ 这是奇数行/p;n;s/$/ 这是偶数行/p'
1 这是奇数行
2 这是偶数行
3 这是奇数行
4 这是偶数行
5 这是奇数行
6 这是偶数行
7 这是奇数行
8 这是偶数行
9 这是奇数行
```

:::

::: details （3）指定起始行合并

```bash
# 所有行合并成一行
[root@ap-hongkang ~]# seq 9 | sed ':a;N;s/\n//;ta'
123456789

# 指定起始行合并
[root@ap-hongkang ~]# seq 9 | sed '2{:a;N;s/\n/ /;8!ba}'
1
2 3 4 5 6 7 8
9
```

:::

::: details （4）王炸：跨多行处理

```bash
# 题目描述: 搜索含有cat and dog的行
[root@ap-hongkang ~]# cat > 1.txt <<EOF
cat
and
dog
n2thing cat and dog
n4thing cat and
dog n5thing
cat
cat
and
and
dog
dog
EOF

# 题解
[root@ap-hongkang ~]# sed -n '/cat and dog/p' 1.txt 
n2thing cat and dog

# 增加要求: 跨两行情况下: 第五行的最后两个单词与第六行的第一个单词也符合，那么该如何搜索出来呢？
[root@ap-hongkang ~]# sed '/cat and dog/b;$!N;h;s/.*\n//;/cat and dog/b;g;s/ *\n/ /;/cat and dog/{g;b};g;D' 1.txt
n2thing cat and dog
n4thing cat and
dog n5thing

# 增加要求: 跨三行情况下：第一二三行也是满足的，那么该如何搜索出来呢？
[root@ap-hongkang ~]# sed -n '/cat/{/cat and/{/cat and dog/{p;b};:a;$!N;/\ndog/{p;b};D};$!{N;/\nand/ba;D}}' 1.txt
cat
and
dog
n2thing cat and dog
n4thing cat and
dog n5thing
```

:::

<br />

**3、处理大文件时的问题**

::: details （1）查看系统配置和sed版本

```bash
# 系统信息
#   OS     CentOS 7 64位
#   CPU    4核
#   Memory 8G
[root@node-1 ~]# cat /etc/os-release | grep PRETTY_NAME=
PRETTY_NAME="CentOS Linux 7 (Core)"

[root@node-1 ~]# cat /proc/cpuinfo | grep "model name" | wc -l # 4核CPU
4

[root@node-1 ~]# free -m
              total        used        free      shared  buff/cache   available
Mem:           7821         469        6471           9         880        7116
Swap:             0           0           0

# sed版本
[root@node-1 ~]# sed --version
sed (GNU sed) 4.2.2
...
```

:::

::: details （2）生成一个大文件 .data.txt（6G）

```bash
# 生成一个6G的文件
[root@node-1 ~]# time seq 1 1000000 > 1.txt

[root@node-1 ~]# ls -lh 1.txt
-rw-r--r-- 1 root root 6.6M Jan 25 09:27 1.txt

[root@node-1 ~]# time for i in `seq 930`; do cat 1.txt >> .data.txt; done

[root@node-1 ~]# ls -lh .data.txt 
-rw-r--r-- 1 root root 6.0G Jan 25 09:28 .data.txt

[root@node-1 ~]# wc -l .data.txt
930000000 .data.txt

[root@node-1 ~]# rm -vf 1.txt 
removed ‘1.txt’
```

:::

::: details （3）使用sed处理大文件时的潜在问题

```bash
# 将文件拷贝一份
[root@node-1 ~]# cp -ra .data.txt sed-data.txt

# 随便切换一个目录,后面会用到
[root@node-1 ~]# cd /tmp

# 将每一行所有的1替换为壹
[root@node-1 tmp]# time sed -ri 's/1/壹/g' /root/sed-data.txt
```

输出结果

![202301251213](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//202301251213.gif)

分析

* sed在处理过程中会先将数据写入临时文件，处理完成后再使用临时文件覆盖原始文件，

  这就需要当前挂载点需要有足够的空间来存储临时文件，这可能是一个潜在的隐患

* sed是一个流式编辑器，所以内存占用一直是比较稳定的，这一点表现比较好

* sed不能很好的利用多核CPU，在大部分情况下会只会将单核CPU跑满，这通常是一个比较大的隐患

细节

```bash
# 查看临时文件的Inode编号
[root@node-1 ~]# ls -li
total 8353608
103873788 -rw-r--r-- 1 root root 6406673280 Jan 25 09:28 sed-data.txt
103873760 -rw------- 1 root root 1923329778 Jan 25 12:27 sedkXbv6d

# 处理所花费的时间
[root@node-1 tmp]# time sed -ri 's/1/壹/g' /root/sed-data.txt

real    18m12.906s
user    8m54.945s
sys     9m16.536s

# 处理完成后再检查Inode编号，可以看到和sedkXbv6d的编号相同
[root@node-1 ~]# ls -li
total 7346364
103873760 -rw-r--r-- 1 root root 7522675140 Jan 25 12:40 sed-data.txt
```

:::

::: details （4）最简单的方式解决sed处理大文件问题之一

说明：

* 对于临时文件问题，没有找到sed有参数可以调整，所以这个问题先不解决，或者说先将原始文件拷贝到一个足够大的空间中去再弄sed修改
* 对于CPU占用问题使用`cpulimit`命令来解决，CPU属于可压缩资源，所以我们可以放心的限制CPU使用率，付出的代价就是sed命令执行时间变长

```bash
# 将文件拷贝一份
[root@node-1 ~]# cp -ra .data.txt cpulimit-sed-data.txt

# 使用cpulimit限制CPU使用率为50%
[root@node-1 ~]# time cpulimit -l 50 -z -i sed -ri 's/1/壹/g' cpulimit-sed-data.txt

real    36m30.328s
user    9m9.010s
sys     10m13.746s
```

输出结果

![image-20230125125535470](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230125125535470.png)

:::

::: details （5）使用Go完美解决sed处理大文件时的所有问题

分析：

* 处理流程：流式读文件 ---> 处理 ---> 写入新文件 --> ... ---> 使用新文件覆盖原始文件 ---> 程序结束
* 临时文件问题：只需要写到其他目录即可
* CPU占用问题：Go本身可以有效利用多核CPU，一般不会有问题，即使有问题还可以利用cpulimit来限制
* 处理效率问题：我希望他能比sed更快的处理完成，为此我们添加了读buffer和写buffer，使用更多的内存来换取更少的系统调用，提高效率
* 内存占用问题：由于使用了buffer，内存占用会比sed高，可根据实际情况调整

编写Go代码：`main.go`

```go
package main

import (
	"bufio"
	"io"
	"log"
	"os"
	"strings"
)

func main() {
	// 定义变量
	srcFileName := "go-data.txt"
	dstFileName := "/tmp/.go-data.txt.tmp"
	readBufferSize := 1024 * 32
	writeBufferSize := 1024 * 32

	// 打开待处理的文件
	src, err := os.Open(srcFileName)
	if err != nil {
		log.Fatalf("open file error: %s\n", srcFileName)
	}
	defer src.Close()

	// 创建要写入到的新文件
	dst, err := os.OpenFile(dstFileName, os.O_RDWR|os.O_CREATE|os.O_TRUNC, 0644)
	if err != nil {
		log.Fatalf("open file error: %s\n", dstFileName)
	}
	defer dst.Close()

	// 处理逻辑
	reader := bufio.NewReaderSize(src, readBufferSize)  // 读缓冲
	writer := bufio.NewWriterSize(dst, writeBufferSize) // 写缓冲
	for {
		// 按行读取
		line, err := reader.ReadString('\n')
		if err != nil {
			if err == io.EOF {
				break
			}
			log.Fatalf("read file error: %s\n", srcFileName)
		}

		// 处理行
		line = strings.ReplaceAll(line, "1", "壹")

		// 写入
		_, err = writer.WriteString(line)
		if err != nil {
			log.Fatalf("write file error: %s\n", dstFileName)
		}
	}

	// 刷新写缓冲区
	if err := writer.Flush(); err != nil {
		log.Fatalf("flush write buffer error: %s\n", dstFileName)
	}

	// 文件重命名
	if err := os.Rename(dstFileName, srcFileName); err != nil {
		log.Fatalf("rename file error: %s to %s\n", dstFileName, srcFileName)
	}
}
```

测试

```bash
# 将文件拷贝一份
[root@node-1 ~]# cp -ra .data.txt go-data.txt

# 查看Go版本
[root@node-1 ~]# go version
go version go1.18.4 linux/amd64

# 编译Go程序
[root@node-1 ~]# go build main.go
[root@node-1 ~]# ls -lh main
-rwxr-xr-x 1 root root 1.9M Jan 25 12:57 main

# 执行测试
[root@node-1 ~]# time ./main

real    1m16.290s
user    1m10.867s
sys     0m6.124s

# 对比一下字节大小和MD5，毕竟能正确的处理才是最重要的
[root@node-1 ~]# ls -l *.txt
-rw-r--r-- 1 root root 7522675140 Jan 25 13:23 cpulimit-sed-data.txt
-rw-r--r-- 1 root root 7522675140 Jan 25 13:28 go-data.txt
-rw-r--r-- 1 root root 7522675140 Jan 25 12:40 sed-data.txt

[root@node-1 ~]# md5sum *.txt
efb4e376b09c3deb8ddfc322dfd6a775  cpulimit-sed-data.txt
efb4e376b09c3deb8ddfc322dfd6a775  go-data.txt
efb4e376b09c3deb8ddfc322dfd6a775  sed-data.txt
```

可以看到CPU占用也很高，但是比较均匀

![image-20230125132805424](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230125132805424.png)

如果需要降低CPU使用率的话，同样可以使用`cpulimit`

```bash
# 将文件拷贝一份
[root@node-1 ~]# cp -ra .data.txt go-data.txt

# 测试
[root@node-1 ~]# time cpulimit -l 50 -z -i ./main

real    2m36.192s
user    1m12.477s
sys     0m11.046s
```

![image-20230125133510511](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230125133510511.png)

:::

<br />

### awk

<br />

### sort

<br />

### yq

**jq**

* 文档：[https://stedolan.github.io/jq/](https://stedolan.github.io/jq/)
* Github：[https://github.com/stedolan/jq](https://github.com/stedolan/jq)

**yq**

* 文档：[https://mikefarah.gitbook.io/yq/](https://mikefarah.gitbook.io/yq/)
* Github：[https://github.com/mikefarah/yq](https://github.com/mikefarah/yq)

**说明：**

* `jq`是一个轻量级且灵活的命令行 JSON处理器
* `yq`是一个轻量级且灵活的命令行 YAML处理器，同时它还可以处理`json`，使用类似于`jq`

**推荐使用yq的理由：**

* `jq`有一些比较严重的问题，比如数字精度问题
* `jq`的更新比较缓慢，截至到当前时间（2023年1月13日），jq的最新版本是2018年发布的`jq-1.6`
* `yq`没有以上的问题而且支持`YAML`格式

<br />

**安装**

::: details 点击查看详情

```bash
# 安装jq
# 备注：jq也可以直接使用yum安装 yum -y install jq
[root@node-1 ~]# wget -c https://github.com/stedolan/jq/releases/download/jq-1.6/jq-linux64 -O /usr/local/bin/jq
[root@node-1 ~]# chmod 755 /usr/local/bin/jq

# 安装yq
[root@node-1 ~]# wget -c https://github.com/mikefarah/yq/releases/download/v4.30.6/yq_linux_amd64 -O /usr/local/bin/yq
[root@node-1 ~]# chmod 755 /usr/local/bin/yq
```

:::

**准备数据**

::: details 点击查看详情

```bash
[root@ap-hongkang ~]# cat > etcd-member.json << EOF
{"header":{"cluster_id":17381046135283785533,"member_id":11396445557462919399,"raft_term":30},"members":[{"ID":11396445557462919399,"name":"etcd-2","peerURLs":["https://10.0.8.4:22380"],"clientURLs":["https://10.0.8.4:22379"]},{"ID":15030193553199729832,"name":"etcd-1","peerURLs":["https://10.0.8.4:12380"],"clientURLs":["https://10.0.8.4:12379"]},{"ID":15402820199101751686,"name":"etcd-3","peerURLs":["https://10.0.8.4:32380"],"clientURLs":["https://10.0.8.4:32379"]}]}
EOF
```

:::

**正常处理**

::: details （1）格式化和压缩

![2023-01-06 20_34_10](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//2023-01-06%2020_34_10.png)

![image-20230106203554031](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230106203554031.png)

![image-20230106211907207](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230106211907207.png)

![image-20230106212118258](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230106212118258.png)

:::

::: details （2）返回指定格式：对象、数组

```bash
# 取单个值
[root@ap-hongkang ~]# cat etcd-member.json | jq '.header.cluster_id'
17381046135283786000
[root@ap-hongkang ~]# cat etcd-member.json | yq '.header.cluster_id'
17381046135283785533

# 作为对象返回
[root@ap-hongkang ~]# cat etcd-member.json | jq '{"custom_id": .header.cluster_id}'
{
  "custom_id": 17381046135283786000
}
[root@ap-hongkang ~]# cat etcd-member.json | yq '{"custom_id": .header.cluster_id}' -o json
{
  "custom_id": 17381046135283785533
}

# 作为数组返回
[root@ap-hongkang ~]# cat etcd-member.json | jq '[.header.cluster_id]'
[
  17381046135283786000
]
[root@ap-hongkang ~]# cat etcd-member.json | yq '[.header.cluster_id]' -o json
[
  17381046135283785533
]

# 数组+对象组合格式
[root@ap-hongkang ~]# cat etcd-member.json | jq '[{"custom_id": .header.cluster_id}]'
[
  {
    "custom_id": 17381046135283786000
  }
]
[root@ap-hongkang ~]# cat etcd-member.json | yq '[{"custom_id": .header.cluster_id}]' -o json
[
  {
    "custom_id": 17381046135283785533
  }
]
```

:::

::: details （3）遍历数组

```bash
# 提取出所有的name
[root@ap-hongkang ~]# cat etcd-member.json | jq '.members[] | .name'
"etcd-2"
"etcd-1"
"etcd-3"
[root@ap-hongkang ~]# cat etcd-member.json | yq '.members[] | .name'
etcd-2
etcd-1
etcd-3

# 作为一个键值对返回
[root@ap-hongkang ~]# cat etcd-member.json | jq '.members[] | {"name":.name}'
{
  "name": "etcd-2"
}
{
  "name": "etcd-1"
}
{
  "name": "etcd-3"
}
[root@ap-hongkang ~]# cat etcd-member.json | yq '.members[] | {"name":.name}' -o json
{
  "name": "etcd-2"
}
{
  "name": "etcd-1"
}
{
  "name": "etcd-3"
}

# 将返回结果作为一个数组返回
[root@ap-hongkang ~]# cat etcd-member.json | jq '[ .members[] | {"name":.name} ]'
[
  {
    "name": "etcd-2"
  },
  {
    "name": "etcd-1"
  },
  {
    "name": "etcd-3"
  }
]
[root@ap-hongkang ~]# cat etcd-member.json | yq '[ .members[] | {"name":.name} ]' -o json
[
  {
    "name": "etcd-2"
  },
  {
    "name": "etcd-1"
  },
  {
    "name": "etcd-3"
  }
]
```

:::

::: details （4）筛选

```bash
# 获取member名称为etcd-2的peerURLs
[root@ap-hongkang ~]# cat etcd-member.json | jq '.members[] | select(.name=="etcd-2") | .peerURLs'
[
  "https://10.0.8.4:22380"
]
[root@ap-hongkang ~]# cat etcd-member.json | yq '.members[] | select(.name=="etcd-2") | .peerURLs' -o json
[
  "https://10.0.8.4:22380"
]
```

:::

**报错处理**

::: details （1）特殊符号引起的错误：key包含特殊字符或者以数字开头，使用'.key'会报错

```bash
# 看一下报错的情况
[root@ap-hongkang ~]# echo '{"1":2, "3":4}' | jq '.1header'
jq: error: syntax error, unexpected IDENT, expecting $end (Unix shell quoting issues?) at <top-level>, line 1:
.1header  
jq: 1 compile error

[root@ap-hongkang ~]# echo '{"1":2, "3":4}' | yq '.1header'
null

# 看一下诡异的不报错的情况
[root@ap-hongkang ~]# echo '{"1":2, "3":4}' | jq '.1'
0.1
[root@ap-hongkang ~]# echo '{"1":2, "3":4}' | jq '.1111111111'
0.1111111111

[root@ap-hongkang ~]# echo '{"1":2, "3":4}' | yq '.1'
2

# 解决jq报错和异常的问题: 使用双引号将key包裹
[root@ap-hongkang ~]# echo '{"1":2, "3":4}' | jq '."1header"'
null
[root@ap-hongkang ~]# echo '{"1":2, "3":4}' | jq '."1"'
2
```

:::

::: details （2）使用不当引起的错误：比如对一个数组使用 .key 的方式访问，key是一个字符串并非是数组索引

```bash
# 报错演示
[root@ap-hongkang ~]# echo '[1,2,3]' | jq '.foo'
jq: error (at <stdin>:1): Cannot index array with string "foo"
[root@ap-hongkang ~]# echo $?
5

[root@ap-hongkang ~]# echo '[1,2,3]' | yq '.foo'
Error: cannot index array with 'foo' (strconv.ParseInt: parsing "foo": invalid syntax)
[root@ap-hongkang ~]# echo $?
1

# 忽略报错
[root@ap-hongkang ~]# echo '[1,2,3]' | jq '.foo?'
[root@ap-hongkang ~]# echo $?
0

[root@ap-hongkang ~]# echo '[1,2,3]' | yq '.foo?'
[root@ap-hongkang ~]# echo $?
0
```

:::

::: details （3）null的问题：当key不存在时会返回null，当key的值为null时也返回null，这就无法区分key是否存在

```bash
[root@ap-hongkang ~]# echo '{"foo": null}' | jq '.abc'
null
[root@ap-hongkang ~]# echo '{"foo": null}' | jq '.foo'
null

[root@ap-hongkang ~]# echo '{"foo": null}' | yq '.abc'
null
[root@ap-hongkang ~]# echo '{"foo": null}' | yq '.foo'
null
```

:::

::: details （4）jq数字精度问题

```bash
# jq精度有些问题
[root@ap-hongkang ~]# cat etcd-member.json | jq '.header.cluster_id'
17381046135283786000
[root@ap-hongkang ~]# cat etcd-member.json | yq '.header.cluster_id'
17381046135283785533

# 再进行测试一下
[root@ap-hongkang ~]# echo 17381046135283785533 | jq
17381046135283786000
[root@ap-hongkang ~]# echo 17381046135283785533 | yq
17381046135283785533
```

:::

::: details （5）yq处理JSON日志问题

```bash
# 看一下日志
[root@ap-hongkang ~]# cat 1.log
{"level":"info","ts":1674365114.7207434,"caller":"demo/main.go:30","msg":"Hello World!"}
{"level":"warn","ts":1674365114.7208,"caller":"demo/main.go:31","msg":"Hello World!"}
{"level":"error","ts":1674365114.720805,"caller":"demo/main.go:32","msg":"Hello World!","stacktrace":"main.main\n\t/root/demo/main.go:32\nruntime.main\n\t/usr/local/go1.19.2/src/runtime/proc.go:250"}
{"level":"fatal","ts":1674365114.7208123,"caller":"demo/main.go:33","msg":"Hello World!","stacktrace":"main.main\n\t/root/demo/main.go:33\nruntime.main\n\t/usr/local/go1.19.2/src/runtime/proc.go:250"}

# 使用jq处理没有问题
[root@ap-hongkang ~]# cat 1.log | jq
{
  "level": "info",
  "ts": 1674365114.7207434,
  "caller": "demo/main.go:30",
  "msg": "Hello World!"
}
{
  "level": "warn",
  "ts": 1674365114.7208,
  "caller": "demo/main.go:31",
  "msg": "Hello World!"
}
{
  "level": "error",
  "ts": 1674365114.720805,
  "caller": "demo/main.go:32",
  "msg": "Hello World!",
  "stacktrace": "main.main\n\t/root/demo/main.go:32\nruntime.main\n\t/usr/local/go1.19.2/src/runtime/proc.go:250"
}
{
  "level": "fatal",
  "ts": 1674365114.7208123,
  "caller": "demo/main.go:33",
  "msg": "Hello World!",
  "stacktrace": "main.main\n\t/root/demo/main.go:33\nruntime.main\n\t/usr/local/go1.19.2/src/runtime/proc.go:250"
}

# 使用yq处理，直接处理有问题
[root@ap-hongkang ~]# cat 1.log | yq -o json
{
  "level": "info",
  "ts": 1674365114.7207434,
  "caller": "demo/main.go:30",
  "msg": "Hello World!"
}
Error: bad file '-': yaml: line 1: did not find expected <document start>

# 换个思路，读取一行处理一行
# 看起来没有问题，但是仔细观察, \n全部变成了n, 问题出在了while read line身上，简单测试便能知道
[root@ap-hongkang ~]# cat 1.log | while read line; do echo "${line}" | yq -o json; done
{
  "level": "info",
  "ts": 1674365114.7207434,
  "caller": "demo/main.go:30",
  "msg": "Hello World!"
}
{
  "level": "warn",
  "ts": 1674365114.7208,
  "caller": "demo/main.go:31",
  "msg": "Hello World!"
}
{
  "level": "error",
  "ts": 1674365114.720805,
  "caller": "demo/main.go:32",
  "msg": "Hello World!",
  "stacktrace": "main.mainnt/root/demo/main.go:32nruntime.mainnt/usr/local/go1.19.2/src/runtime/proc.go:250"
}
{
  "level": "fatal",
  "ts": 1674365114.7208123,
  "caller": "demo/main.go:33",
  "msg": "Hello World!",
  "stacktrace": "main.mainnt/root/demo/main.go:33nruntime.mainnt/usr/local/go1.19.2/src/runtime/proc.go:250"
}

# 使用sed代替while read line
[root@ap-hongkang ~]# f=1.log; \n=$(wc -l ${f} | awk '{print $1}'); for i in `seq ${n}`; do sed -n "${i}p" ${f} | yq -o json; done
{
  "level": "info",
  "ts": 1674365114.7207434,
  "caller": "demo/main.go:30",
  "msg": "Hello World!"
}
{
  "level": "warn",
  "ts": 1674365114.7208,
  "caller": "demo/main.go:31",
  "msg": "Hello World!"
}
{
  "level": "error",
  "ts": 1674365114.720805,
  "caller": "demo/main.go:32",
  "msg": "Hello World!",
  "stacktrace": "main.main\n\t/root/demo/main.go:32\nruntime.main\n\t/usr/local/go1.19.2/src/runtime/proc.go:250"
}
{
  "level": "fatal",
  "ts": 1674365114.7208123,
  "caller": "demo/main.go:33",
  "msg": "Hello World!",
  "stacktrace": "main.main\n\t/root/demo/main.go:33\nruntime.main\n\t/usr/local/go1.19.2/src/runtime/proc.go:250"
}
```

:::

<br />

## 系统管理

### systemd

<br />

## 自动化工具

### expect

文档：[https://linux.die.net/man/1/expect](https://linux.die.net/man/1/expect)

Wiki：[https://en.wikipedia.org/wiki/Expect](https://en.wikipedia.org/wiki/Expect)

::: details （1）常用命令说明

```bash
[root@node-1 ~]# yum -y install expect
[root@node-1 ~]# expect -v
expect version 5.45
```

**1、变量设置**

* set：定义变量
* puts：输出变量
* set timeout：设置超时时间

**2、启动要交互的进程**

* spawn：启动新的交互进程，后面跟命令或者指定程序

**3、匹配终端返回的结果**

* expect：待匹配信息（部分匹配即可），如果匹配成功则执行expect后的动作，匹配失败则什么也不做
* exp_continue：相当于又重新执行所在的expect语句

**4、向终端发送命令**

* send：向进程发送字符串或命令
* send_user：打印后跟的字符串内容，相当于shell中的echo

**5、退出或保持交互状态**

* exit：退出expect脚本
* eof：expect执行结束, 退出
* interact：保持交互状态，此时Expect会把控制权交给控制台，变回手工操作

:::

::: details （2）与SSH服务端交互

```bash
# 写法1
[root@node-1 ~]# vim expect-ssh.sh
#!/bin/bash

# 定义变量
host=node-2
port=22
username=root
password=123456

# SSH交互
expect <<EOF
spawn ssh -p ${port} ${username}@${host}
expect {
    "(yes/no)?" { send "yes\n"; exp_continue }
    "password:" { send "${password}\n" }
}
expect {
    "# " { send "uptime\n" }
}
expect {
    "# " { send "exit\n" }
}
expect eof
EOF

# ---------------------------------------------------------------

# 写法2
[root@node-1 ~]# vim expect-ssh.sh
#!/bin/bash

# 定义变量
host=node-2
port=22
username=root
password=123456

# SSH交互
expect <<EOF
spawn ssh -p ${port} ${username}@${host}
expect {
    "(yes/no)?" { send "yes\n"; exp_continue }
    "password:" { send "${password}\n" }
}
expect "# "
send "uptime\n"

expect "# "
send "exit\n"

expect eof
EOF
```

输出结果

```bash
# 第一次执行
[root@node-1 ~]# bash expect-ssh.sh
spawn ssh -p 22 root@node-2
The authenticity of host 'node-2 (192.168.48.152)' can't be established.
ECDSA key fingerprint is SHA256:Py35pg5TtQSedZQPgDAc2V7/9pu7xr02hTc/N70QDPQ.
ECDSA key fingerprint is MD5:da:28:8d:c3:29:54:ad:18:c7:88:83:75:90:de:e3:5e.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added 'node-2,192.168.48.152' (ECDSA) to the list of known hosts.
root@node-2's password: 
Last login: Tue Jan 24 11:07:26 2023 from api.k8s.local
[root@node-2 ~]# uptime
 11:07:36 up  2:40,  1 user,  load average: 0.27, 0.34, 0.30
[root@node-2 ~]# exit
logout
Connection to node-2 closed.

# 再次执行
[root@node-1 ~]# bash expect-ssh.sh
spawn ssh -p 22 root@node-2
root@node-2's password: 
Last login: Tue Jan 24 11:07:36 2023 from api.k8s.local
[root@node-2 ~]# uptime
 11:07:45 up  2:40,  1 user,  load average: 0.23, 0.33, 0.30
[root@node-2 ~]# exit
logout
Connection to node-2 closed.
```

:::

::: details （3）与Python解释器交互

```bash
[root@node-1 ~]# vim expect-python3.sh
#!/bin/bash

# Python解释器交互
expect <<EOF
spawn python3
expect {
    ">>> " { send "import sys\n" }
}
expect {
    ">>> " { send "'.'.join(\[str(x) for x in sys.version_info\[:3\]\])\n" }  # []需要转义
}
expect {
    ">>> " { send "exit()\n" }
}
expect eof
EOF
```

输出结果

```bash
[root@node-1 ~]# bash expect-python3.sh
spawn python3
Python 3.6.8 (default, Nov 16 2020, 16:55:22) 
[GCC 4.8.5 20150623 (Red Hat 4.8.5-44)] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> import sys
>>> '.'.join([str(x) for x in sys.version_info[:3]])
'3.6.8'
>>> exit()
[root@node-1 ~]# 
```

:::

::: details （4）问题

* send中最后使用`\n`或`\r`都可以，并且没有发现明显的区别?
* Shell命令退出码获取起来比较困难

:::

<br />

### ansible

<br />

## 网络工具

### frp

文档：[https://gofrp.org/](https://gofrp.org/)

Github：[https://github.com/fatedier/frp](https://github.com/fatedier/frp)

<br />

**安装：For Linux**

::: details 点击查看详情

```bash
# 下载解压
wget -c https://github.com/fatedier/frp/releases/download/v0.46.0/frp_0.46.0_linux_amd64.tar.gz
tar zxf frp_0.46.0_linux_amd64.tar.gz -C /usr/local/

# 做一个软连接
ln -s /usr/local/frp_0.46.0_linux_amd64 /usr/local/frp
```

:::

<br />

**示例：将内网Linux主机的SSH服务暴露到公网上**

::: details （1）服务端设置

```bash
# 进入frp目录
[root@ap-hongkang ~]# cd /usr/local/frp/

# 修改服务端配置文件
# bind_addr               服务端监听地址
# bind_port               服务端监听端口
# authentication_method   认证方式,默认为token
# token                   任意字符串
[root@ap-hongkang frp]# vim frps.ini 
[common]
bind_addr=0.0.0.0
bind_port=7000
authentication_method=token
token=7qdOlynt!x%m6zV&

# 启动服务端
[root@ap-hongkang frp]# ./frps -c frps.ini
2023/01/07 17:34:56 [I] [root.go:206] frps uses config file: frps.ini
2023/01/07 17:34:56 [I] [service.go:200] frps tcp listen on 0.0.0.0:7000
2023/01/07 17:34:56 [I] [root.go:215] frps started successfully
```

:::

::: details （2）客户端设置

```bash
# 进入frp目录
[root@localhost ~]# cd /usr/local/frp/

# 修改客户端文件
# 说明：frp 会将请求 43.154.36.151:6000 的流量转发到内网机器的 22 端口
#
# server_addr            服务端监听地址
# server_port            服务端监听端口
# authentication_method  认证方式,默认为token
# token                  任意字符串
#
# type                   代理类型
# local_ip               需要被代理的本地服务的IP地址，可以为所在frpc能访问到的任意IP地址
# local_port             配合 local_ip
# remote_port            服务端绑定的端口
# use_encryption         是否启用加密功能
# use_compression        是否启用压缩功能
[root@localhost frp]# vim frpc.ini
[common]
server_addr=43.154.36.151
server_port=7000
authentication_method=token
token=7qdOlynt!x%m6zV&

[ssh]
type=tcp
local_ip=127.0.0.1
local_port=22
remote_port=6000
use_encryption=true
use_compression=true

# 启动客户端
[root@localhost frp]# ./frpc -c frpc.ini
2023/01/07 17:50:18 [I] [service.go:298] [ee5a7300d2e684dc] login to server success, get run id [ee5a7300d2e684dc], server udp port [0]
2023/01/07 17:50:18 [I] [proxy_manager.go:142] [ee5a7300d2e684dc] proxy added: [ssh]
2023/01/07 17:50:18 [I] [control.go:172] [ee5a7300d2e684dc] [ssh] start proxy success
```

:::

::: details （3）SSH内网穿透测试

```bash
[root@ap-hongkang ~]# ssh -oPort=6000 root@43.154.36.151
root@43.154.36.151's password: 
Last login: Sat Jan  7 17:37:24 2023 from localhost
[root@localhost ~]# w
 17:38:05 up 2 min,  3 users,  load average: 0.08, 0.13, 0.05
USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT
root     pts/0    192.168.48.1     17:35    2:21   0.01s  0.01s -bash
root     pts/1    192.168.48.1     17:35    1:41   0.22s  0.21s ./frpc -c frpc.ini
root     pts/2    localhost        17:38    2.00s  0.01s  0.00s w
```

:::

<br />

**优化：使用systemd管理服务端和客户端**

::: details （1）服务端

```bash
# 编写systemd文件
[root@ap-hongkang ~]# vim /etc/systemd/system/frps.service
[Unit]
Description=frp server
Documentation=https://gofrp.org/docs/
After=network.target syslog.target
Wants=network.target

[Service]
Type=simple
Restart=always
StartLimitInterval=0
ExecStart=/usr/local/frp/frps -c /usr/local/frp/frps.ini

[Install]
WantedBy=multi-user.target

# 启动服务
[root@ap-hongkang ~]# systemctl daemon-reload
[root@ap-hongkang ~]# systemctl start frps.service

# 查看端口
[root@ap-hongkang ~]# netstat -altnpu | grep 7000
tcp6       0      0 :::7000                 :::*                    LISTEN      4178957/frps

# 设置开启自启
[root@ap-hongkang ~]# systemctl enable frps.service
Created symlink /etc/systemd/system/multi-user.target.wants/frps.service → /etc/systemd/system/frps.service.
```

:::

::: details （2）客户端

```bash
# 编写systemd文件
[root@localhost ~]# vim /etc/systemd/system/frpc.service
[Unit]
Description=frp client
Documentation=https://gofrp.org/docs/
After=network.target syslog.target
Wants=network.target

[Service]
Type=simple
Restart=always
StartLimitInterval=0
ExecStart=/usr/local/frp/frpc -c /usr/local/frp/frpc.ini

[Install]
WantedBy=multi-user.target

# 启动服务
[root@localhost ~]# systemctl daemon-reload
[root@localhost ~]# systemctl start frpc.service

# 查看是否与服务端建立连接
[root@localhost ~]# netstat -altnpu | grep frpc
tcp        0      0 192.168.48.160:39248    43.154.36.151:7000      ESTABLISHED 19260/frpc

# 设置开启自启
[root@localhost ~]# systemctl enable frpc.service
Created symlink from /etc/systemd/system/multi-user.target.wants/frpc.service to /etc/systemd/system/frpc.service.
```

:::

<br />

### proxychains

有两个相关的仓库，我们选择`Star`多的`proxychains-ng`

* [https://github.com/haad/proxychains](https://github.com/haad/proxychains)

* [https://github.com/rofl0r/proxychains-ng](https://github.com/rofl0r/proxychains-ng)

::: details （1）安装proxychains-ng

```bash
# 下载源码包
[root@localhost ~]# wget -c https://github.com/rofl0r/proxychains-ng/releases/download/v4.16/proxychains-ng-4.16.tar.xz
[root@localhost ~]# tar xf proxychains-ng-4.16.tar.xz

# 编译安装
[root@localhost ~]# yum -y install gcc gcc-c++
[root@localhost ~]# cd proxychains-ng-4.16
[root@localhost ~]# ./configure --prefix=/usr/local --sysconfdir=/etc
[root@localhost ~]# make && make install

# 安装配置文件
[root@localhost proxychains-ng-4.16]# make install-config
./tools/install.sh -D -m 644 src/proxychains.conf /etc/proxychains.conf

# 测试一下命令
[root@localhost ~]# proxychains4

Usage:  proxychains4 -q -f config_file program_name [arguments]
        -q makes proxychains quiet - this overrides the config setting
        -f allows one to manually specify a configfile to use
        for example : proxychains telnet somehost.com
More help in README file
```

:::

::: details （2）配置proxychains-ng

```bash
[root@localhost ~]# vim /etc/proxychains.conf
...
quiet_mode                # 将注释打开,意思是开启静默模式,减少日志输出信息,但是并不能完全取消日志
...
[ProxyList]
# add proxy here ...
# meanwile
# defaults set to "tor"
# socks4 127.0.0.1 9050   # 注释掉
http 192.168.0.102 7890   # 新增一行
```

:::

::: details （3）测试代理

```bash
# 使用方式：proxychains4 + 原本需要执行的命令

# 测试curl命令
[root@localhost ~]# proxychains4 curl ip.jinhui.dev
[proxychains] config file found: /etc/proxychains.conf
[proxychains] preloading /usr/local/lib/libproxychains4.so
20.255.68.205

# 测试docker下载镜像,是不行的，原因是：
# 下载镜像是Docker服务端进程所执行的操作，而我们docker image pull只是给服务端发送了一个下载镜像的请求而已
[root@localhost ~]# proxychains4 docker image pull registry.k8s.io/pause:3.8
[proxychains] config file found: /etc/proxychains.conf
[proxychains] preloading /usr/local/lib/libproxychains4.so
Error response from daemon: Head "https://asia-east1-docker.pkg.dev/v2/k8s-artifacts-prod/images/pause/manifests/3.8": dial tcp 64.233.189.82:443: connect: connection refused
```

:::

<br />

## 安全工具

### cfssl

Github：[https://github.com/cloudflare/cfssl](https://github.com/cloudflare/cfssl)

演示说明：大部分示例均在`Windows` + `Goland`项目根目录下的`pki`目录下 操作

**（1）安装**

::: details 点击查看详情

```bash
# Windows
# 建议直接在Github Release页面下载二进制, 速度最快

# Linux
Version=1.6.3
DownloadURL=https://github.com/cloudflare/cfssl/releases/download

wget ${DownloadURL}/v${Version}/cfssl_${Version}_linux_amd64          -O /usr/local/bin/cfssl
wget ${DownloadURL}/v${Version}/cfssljson_${Version}_linux_amd64      -O /usr/local/bin/cfssljson
wget ${DownloadURL}/v${Version}/cfssl-certinfo_${Version}_linux_amd64 -O /usr/local/bin/cfssl-certinfo
wget ${DownloadURL}/v${Version}/cfssl-bundle_${Version}_linux_amd64   -O /usr/local/bin/cfssl-bundle
wget ${DownloadURL}/v${Version}/cfssl-newkey_${Version}_linux_amd64   -O /usr/local/bin/cfssl-newkey
wget ${DownloadURL}/v${Version}/mkbundle_${Version}_linux_amd64       -O /usr/local/bin/mkbundle
wget ${DownloadURL}/v${Version}/multirootca_${Version}_linux_amd64    -O /usr/local/bin/multirootca

chmod 755 /usr/local/bin/cfssl
chmod 755 /usr/local/bin/cfssljson
chmod 755 /usr/local/bin/cfssl-certinfo
chmod 755 /usr/local/bin/cfssl-bundle
chmod 755 /usr/local/bin/cfssl-newkey
chmod 755 /usr/local/bin/mkbundle
chmod 755 /usr/local/bin/multirootca


echo                                                      && \
echo "cfssl: "     && cfssl version       | sed 's/^/  /' && \
echo "cfssljson: " && cfssljson --version | sed 's/^/  /' && \
echo

# 输出结果
cfssl: 
  Version: 1.6.3
  Runtime: go1.18
cfssljson: 
  Version: 1.6.3
  Runtime: go1.18
```

:::

<br />

**（2）创建一级根证书（CA证书）**

* 后续所有的证书都会基于根证书或二级根证书来颁发
* 默认有效期只有5年，注意修改

::: details 点击查看详情

```bash
# 创建一个目录专门存放证书
D:\application\GoLand\demo\> mkdir pki && cd pki

# ---------------------------------------------------------------------
# 创建默认的CA配置文件
D:\application\GoLand\demo\pki> cfssl print-defaults config > ca-config.json

# 修改ca-config.json,完整内容如下
{
    "signing": {
        "default": {
            "expiry": "876000h"
        },
        "profiles": {
            "server": {
                "expiry": "876000h",
                "usages": [
                    "signing",
                    "key encipherment",
                    "server auth",
                    "client auth"
                ]
            },
            "client": {
                "expiry": "876000h",
                "usages": [
                    "signing",
                    "key encipherment",
                    "client auth"
                ]
            }
        }
    }
}

# 配置说明
# (1) profiles：   为服务器颁发证书时我们使用server，为客户端颁发证书时我们使用client,这个操作是在后面的命令中手工指定使用哪个profile
# (2) expiry:      指定过期时间：这里是100年 (876000h/24/365 = 100年)
# (3) server auth: 服务器验证，用于客户端验证服务器,需要注意的是在profile.server中也需要添加client auth，因为它也会作为客户端来使用
# (4) client auth: 客户端验证，用于服务器验证客户端

# ---------------------------------------------------------------------
# 创建默认的证书签名申请文件(Certificate Signing Request)
D:\application\GoLand\demo\pki> cfssl print-defaults csr > ca-csr.json

# 修改ca-csr.json,完整内容如下
{
    "CA": {
        "expiry": "876000h"
    },
    "CN": "Reliable internal CA",
    "key": {
        "algo": "rsa",
        "size": 2048
    },
    "names": [
        {
            "C": "CN",
            "ST": "BeiJing",
            "L": "BeiJing",
            "O": "Trust Services"
        }
    ]
}

# 配置说明
# CA     默认CA的有效期只有5年，即使以后签发了100年的服务器证书，CA都过期了，服务器证书100年其实际有效期也只有5年
# CN     公用名或通用名(Common Name)
# hosts  要签名的域名或IP，此处是根证书，不需要填写字段，删除就好
# key    指定签名算法，推荐使用 <rsa 2048>
# names:
#   C    国家(country)
#   ST   州或省(the state or province)
#   L    地方或自治市(locality or municipality)
#   O    组织(organisation)，可以理解为公司，一般写法 <公司名, Inc|Ltd>，Inc为股份有限公司，Ltd为有限责任公司
#   OU   组织单位(organisational unit)，可以理解为公司内的部门,CA一般不需要填写

# ---------------------------------------------------------------------
# 生成根证书和私钥
D:\application\GoLand\demo\pki> cfssl gencert -initca ca-csr.json | cfssljson -bare ca

2022/11/25 20:18:38 [INFO] generating a new CA key and certificate from CSR
2022/11/25 20:18:38 [INFO] generate received request
2022/11/25 20:18:38 [INFO] received CSR
2022/11/25 20:18:38 [INFO] generating key: rsa-2048
2022/11/25 20:18:39 [INFO] encoded CSR
2022/11/25 20:18:39 [INFO] signed certificate with serial number 338200400845890616859871071580431105511487856853

# 查看
D:\application\GoLand\demo\pki> dir 
 驱动器 D 中的卷是 本地磁盘                       
 卷的序列号是 5867-A979                           
                                                  
 D:\application\GoLand\demo\pki 的目录
                                                  
2022/11/26  16:08    <DIR>          .             
2022/11/26  16:08    <DIR>          ..            
2022/11/26  10:16               467 ca-config.json
2022/11/26  13:11               262 ca-csr.json   
2022/11/26  13:11             1,675 ca-key.pem    # CA证书私钥
2022/11/26  13:11             1,054 ca.csr        
2022/11/26  13:11             1,322 ca.pem        # CA证书
               5 个文件          4,780 字节       
               2 个目录 131,353,825,280 可用字节
```

:::

<br />

**（3）单向认证，一般指的是客户端验证服务器证书**

::: details （1）签发服务器证书

```bash
# 假设我们的域名是example.com，生成默认的证书签名申请文件
D:\application\GoLand\demo\pki> cfssl print-defaults csr > example.com-csr.json

# 修改example.com-csr.json,完整内容如下
{
  "CN": "example.com",
  "hosts": [
    "127.0.0.1",
    "localhost",
    "example.com"
  ],
  "key": {
    "algo": "rsa",
    "size": 2048
  },
  "names": [
    {
      "C": "CN",
      "ST": "BeiJing",
      "L": "BeiJing",
      "O": "Hello World信息技术有限公司"
    }
  ]
}

# 签发证书
D:\application\GoLand\demo\pki> cfssl gencert -ca=ca.pem -ca-key=ca-key.pem -config=ca-config.json -profile=server example.com-csr.json | cfssljson -bare example.com
2022/11/25 20:28:55 [INFO] generate received request
2022/11/25 20:28:55 [INFO] received CSR
2022/11/25 20:28:55 [INFO] generating key: rsa-2048
2022/11/25 20:28:55 [INFO] encoded CSR
2022/11/25 20:28:55 [INFO] signed certificate with serial number 167771831832943042458597458877414465265415032753

# 查看
D:\application\GoLand\demo\pki>dir
 驱动器 D 中的卷是 本地磁盘            
 卷的序列号是 5867-A979                
                                       
 D:\application\GoLand\demo\pki 的目录

2022/11/26  16:19    <DIR>          .
2022/11/26  16:19    <DIR>          ..
2022/11/26  10:16               467 ca-config.json
2022/11/26  13:11               262 ca-csr.json
2022/11/26  13:11             1,675 ca-key.pem
2022/11/26  13:11             1,054 ca.csr
2022/11/26  13:11             1,322 ca.pem
2022/11/26  14:05               269 example.com-csr.json
2022/11/26  16:18             1,675 example.com-key.pem    # 私钥文件
2022/11/26  16:18             1,070 example.com.csr
2022/11/26  16:18             1,448 example.com.pem        # 证书文件
               9 个文件          9,242 字节
               2 个目录 131,353,100,288 可用字节

# 重要说明
# (1) hosts字段：
#       该字段必须要有，否则签发时会报错
#       支持填写IP和localhost以及任意名称
#       支持泛域名，例如*.example.com，但是该泛域名不包含example.com
#       如果想支持所有的域名和IP，直接写"*"或者""是不可以的
```

:::

::: details （2）使用Go启动一个HTTPS Server

`pki/server/main.go`

```bash
package main

import (
	"log"
	"net/http"
	"time"
)

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		now := time.Now().Format("2006-01-02 15:04:05")
		_, _ = w.Write([]byte(now))
	})
	log.Fatalln(http.ListenAndServeTLS(":443", "example.com.pem", "example.com-key.pem", nil))
}
```

启动Server

```bash
# 注意我们是在pki目录下启动的Server
D:\application\GoLand\demo\pki>go run server/main.go
```

:::

::: details （3）使用浏览器访问验证

（1）客户端导入CA证书，否则不会显示小绿锁，这里以`Chrome`浏览器为例

`chrome://settings/` --> 隐私设置和安全性（或者直接搜索"安全"） --> 管理设备证书 --> 受信任的根证书颁发机构 --> 导入 --> 选择`ca.pem`

![image-20221126112151991](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20221126112151991.png)

（2）Chrome浏览器访问

这里为了省事没有修改hosts文件，使用IP访问

![image-20221126111212758](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20221126111212758.png)

:::

<br />

**（4）双向认证，客户端验证服务器证书，同时服务器也验证客户端证书**

::: details （1）签发客户端证书

```bash
# 生成默认的证书签名申请文件
D:\application\GoLand\demo\pki> cfssl print-defaults csr > client-csr.json

# 修改client-csr.json,完整内容如下
{
  "CN": "client",
  "hosts": [
    ""
  ],
  "key": {
    "algo": "rsa",
    "size": 2048
  },
  "names": [
    {
      "C": "CN",
      "ST": "BeiJing",
      "L": "BeiJing",
      "O": "Hello World信息技术有限公司"
    }
  ]
}

# 配置说明
#   hosts  因为客户端可能有各种各样的IP，为了通用将hosts字段设置为 ""，意思是可以认证任何来源的客户端

# 签发客户端证书
D:\application\GoLand\demo\pki> cfssl gencert -ca=ca.pem -ca-key=ca-key.pem -config=ca-config.json -profile=client client-csr.json | cfssljson -bare client
2022/11/26 16:25:28 [INFO] generate received request
2022/11/26 16:25:28 [INFO] received CSR             
2022/11/26 16:25:28 [INFO] generating key: rsa-2048 
2022/11/26 16:25:29 [INFO] encoded CSR
2022/11/26 16:25:29 [INFO] signed certificate with serial number 127515002614121196936565316274577746096537175070
```

:::

::: details （2）使用Go编写一个HTTPS Server，与单向认证相比代码会复杂一些

`pki/server/main.go`

```go
package main

import (
	"crypto/tls"
	"crypto/x509"
	"log"
	"net/http"
	"os"
	"time"
)

func main() {
	// 实例化CA对象
	caCertPool := x509.NewCertPool()
	caCert, err := os.ReadFile("ca.pem")
	if err != nil {
		panic(err)
	}
	if !caCertPool.AppendCertsFromPEM(caCert) {
		log.Fatalln("failed to append certificates to cert poll")
	}

	// 实例化Server
	server := &http.Server{
		Addr: ":443", // 监听地址
		TLSConfig: &tls.Config{
			ClientAuth: tls.RequireAndVerifyClientCert, // 服务端必须验证客户端证书
			ClientCAs:  caCertPool,                     // 该参数用于 服务端 验证 客户端 所使用的CA机构
		},
	}

	// 注册路由
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		now := time.Now().Format("2006-01-02 15:04:05")
		_, _ = w.Write([]byte(now))
	})

	// 启动服务
	log.Fatalln(server.ListenAndServeTLS("example.com.pem", "example.com-key.pem"))
}
```

:::

::: details （3）使用Go编写一个HTTPS Client，与普通的Client相比也复杂一些

`pki/client/main.go`

```go
package main

import (
	"crypto/tls"
	"crypto/x509"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
)

func main() {
	// 实例化CA对象
	caCertPool := x509.NewCertPool()
	caCert, err := os.ReadFile("ca.pem")
	if err != nil {
		panic(err)
	}
	if !caCertPool.AppendCertsFromPEM(caCert) {
		log.Fatalln("failed to append certificates to cert poll")
	}

	// 读取客户端证书
	clientCert, err := tls.LoadX509KeyPair("client.pem", "client-key.pem")
	if err != nil {
		log.Fatalf("LoadX509KeyPair error: %v\n", err)
	}

	// 实例化 Transport 对象
	transport := &http.Transport{
		TLSClientConfig: &tls.Config{
			RootCAs:      caCertPool,                    // 该参数用于 客户端 验证 服务端 所使用的CA机构
			Certificates: []tls.Certificate{clientCert}, // 添加客户端自己的证书
		},
	}

	// 实例化 Client 对象
	client := &http.Client{Transport: transport}

	// 向服务端发送请求
	res, err := client.Get("https://127.0.0.1:443")
	if err != nil {
		log.Fatalf("Send request error: %v\n", err)
	}
	defer res.Body.Close()

	// 读取响应
	body, err := io.ReadAll(res.Body)
	if err != nil {
		log.Fatalf("Read response body error: %v\n", err)
	}
	fmt.Println(string(body))
}
```

:::

::: details （4）启动服务端和客户端，进行双向认证测试

```bash
# 启动服务端,注意我们是在pki目录下启动的Server
D:\application\GoLand\demo\pki> go run server/main.go

# 启动客户端,注意我们是在pki目录下启动的Client
D:\application\GoLand\demo\pki> go run client/main.go
2022-11-26 16:31:31
```

:::

<br />

**（5）查看证书信息**

* 可以使用`cfssl-certinfo`命令，也可以使用`cfssl certinfo`，经过测试发现不需要下载`cfssl-certinfo`也可以使用`cfssl certinfo`

::: details 点击查看详情

（1）通过域名查看**证书信息**

![image-20221126171148440](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20221126171148440.png)

（2）通过证书文件查看**证书信息**

![image-20221126171648691](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20221126171648691.png)

（3）查看`xx.csr`文件信息，其实就是对`xx-csr.json`文件做了一次编码

![image-20221126173026296](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20221126173026296.png)

![image-20221126172850473](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20221126172850473.png)

:::

<br />

### veracrypt

文档：[https://veracrypt.fr/](https://veracrypt.fr/)



<br />

## 对象存储

### 腾讯云 - coscli

工具概览：[https://cloud.tencent.com/document/product/436/6242](https://cloud.tencent.com/document/product/436/6242)

COSCLI：[https://cloud.tencent.com/document/product/436/63143](https://cloud.tencent.com/document/product/436/63143)

::: details （1）安装

```bash
# 下载
[root@ap-hongkang ~]# wget -c https://github.com/tencentyun/coscli/releases/download/v0.12.0-beta/coscli-linux
[root@ap-hongkang ~]# mv coscli-linux /usr/local/bin/coscli
[root@ap-hongkang ~]# chmod 755 /usr/local/bin/coscli

# 查看版本
[root@ap-hongkang ~]# coscli --version
coscli version v0.12.0-beta
```

:::

::: details （2）配置

```bash
# 初始化配置
[root@ap-hongkang ~]# coscli config init
2023/01/12 14:19:15 Welcome to coscli!
When you use coscli for the first time, you need to input some necessary information to generate the default configuration file of coscli.
The path of the configuration file: /root/.cos.yaml
Input Your Secret ID:
# 填写Secret ID
Input Your Secret Key:
# 填写Secret Key
Input Your Session Token:
# 不用填写
Input Your Bucket's Name:
Format: <bucketname>-<appid>，Example: example-1234567890
# 填写存储桶名称 public-1257805459
Input Bucket's Endpoint:
Format: cos.<region>.myqcloud.com，Example: cos.ap-beijing.myqcloud.com
# 不要填写,测试中填写了以后执行命令会报错
Input Bucket's Alias: (Input nothing will use the original name)
# 给存储桶起个别名 public
You have configured the bucket:
- Name: public-1257805459       Endpoint:       Alias: public

If you want to configure more buckets, you can use the "config add" command later.

The configuration file is initialized successfully! 
You can use "./coscli config show [-c <Config File Path>]" show the contents of the specified configuration file

# 配置文件存储在这里
[root@ap-hongkang ~]# vim ~/.cos.yaml
cos:
  base:
    secretid: xxx
    secretkey: xxx
    sessiontoken: xxx    # 这个配置可以删掉
    protocol: https
  buckets:
  - name: public-1257805459
    alias: public
    region: ap-beijing   # 改一下region
    endpoint: ""         # 这个配置可以删掉
    
# 测试，没有报错就说明成功了
[root@ap-hongkang ~]# coscli ls cos://public
  KEY | TYPE |  LAST MODIFIED  | SIZE  
------+------+-----------------+-------
------+------+-----------------+-------
               TOTAL OBJECTS:  |  0    
             ------------------+-------
             
# 错误记录：如果endpoint填写上存储桶页面给出的域名,就会报下面这个错
[root@ap-hongkang ~]# coscli ls cos://public
INFO[2023-01-12 14:29:10] invalid bucket format, please check your cos.BaseURL 
FATA[2023-01-12 14:29:10] invalid bucket format, please check your cos.BaseURL
```

:::

::: details （3）上传、下载和删除单个文件

```bash
# 上传
[root@ap-hongkang ~]# coscli cp kubernetes-images-v1.25.4.tar.gz cos://public/
INFO[2023-01-12 14:32:39] Upload /root/kubernetes-images-v1.25.4.tar.gz => cos://public/kubernetes-images-v1.25.4.tar.gz 
100% [##############################] 216228420/216228420 Bytes

# 下载
[root@node-1 ~]# coscli cp cos://public/kubernetes-images-v1.25.4.tar.gz .
INFO[2023-01-12 14:34:08] Download cos://public/kubernetes-images-v1.25.4.tar.gz => /root/./kubernetes-images-v1.25.4.tar.gz

# 每次执行完命令会在当前目录下生成一个 coscli.log 的日志文件
# 没有找到哪里可以配置日志参数?

# 下载完删除
[root@node-1 ~]# coscli rm -f cos://public/kubernetes-images-v1.25.4.tar.gz
INFO[2023-01-12 15:12:31] Delete cos://public/kubernetes-images-v1.25.4.tar.gz successfully!
```

:::

