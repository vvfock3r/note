## Bash

### Shell类型

Shell是一个应用程序，它是作系统与外部交互最主要的接口式。

Shell的实现有很多方式，这里我们主要说Bash，操作系统使用的是CentOS7

* 查看系统中已有得Shell类型

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

* 查看当当前用户所使用的默认Shell类型

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

* 修改当前用户所使用的默认Shell为zsh

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



### 获取Bash帮助文档

可以通过`man bash`来查询详细文档，本文档中大部分信息都可以通过这种方式获取到



### 变量



#### 环境变量

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



#### 本地变量

本地变量，当前shell 中的变量，很显然本地变量中包含环境变量，本地变量的非环境变量不具备继承性，只在当前Shell生效。

使用`set`命令显示本地变量，使用`unset`可以删除本地变量



#### 变量继承性差异

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



#### 内部域分隔符IFS

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



#### 变量引用

```bash
# 方法一： $变量
# 方法二： ${变量名}，推荐总是使用这种，举个例子

#!/bin/bash
year=23
echo i am ${year}years old.  # 如果不加{}，它会把$yearyears当做一个整体
```



#### 变量默认值

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



#### 位置参数变量

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

#### 变量操作

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

#### 巧读配置文件

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

#### 变量安全性

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





### 语句

#### 测试语句

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



#### if语句

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

#### while语句

```bash
while 表达式;do
    表达式
done
```

#### for语句

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

#### case语句

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

#### continue和break 

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

#### eval将字符串作为语句执行

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

#### exec执行命令后退出当前终端

```bash
# 检测网络
ping -i 0.1  -c 10 www.baidu.com &>/dev/null || exec  echo "Network is unreachable"

# 检测用户
if [ `id -u` -ne 0 ];then exec echo "Must be root can run it"; fi
```

#### getopts命令行参数处理

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


