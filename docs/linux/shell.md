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



<br />

### grep

<br />

### sed

<br />

### awk

<br />

### jq

**jq**

* 文档：[https://stedolan.github.io/jq/](https://stedolan.github.io/jq/)
* Github：[https://github.com/stedolan/jq](https://github.com/stedolan/jq)

**yq**

* 文档：[https://mikefarah.gitbook.io/yq/](https://mikefarah.gitbook.io/yq/)
* Github：[https://github.com/mikefarah/yq](https://github.com/mikefarah/yq)

**说明：**

* `jq`是一个轻量级且灵活的命令行 JSON处理器
* `yq`是一个轻量级且灵活的命令行 YAML处理器，同时它还可以处理`json`，使用类似于`jq`

<br />

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

::: details （3）上传下载单个文件

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
```

:::
