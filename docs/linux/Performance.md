# Linux性能优化

## CPU

### 基本信息

::: details （1）CPU核数

```bash
# 物理CPU总个数
[root@localhost ~]# cat /proc/cpuinfo | grep "physical id" | sort -u | wc -l
2

# 单个物理CPU的核数
[root@localhost ~]# cat /proc/cpuinfo | grep "cpu cores" | sort -u
cpu cores       : 4

# 逻辑CPU个数（物理CPU个数 * 每个物理CPU核数）
[root@localhost ~]# cat /proc/cpuinfo | grep "model name" | wc -l
8
```

:::

::: details （2）CPU厂商、型号和ID

```bash
# 查看CPU厂商
#   GenuineIntel  英特尔
#   AuthenticAMD  AMD
[root@localhost ~]# cat /proc/cpuinfo | grep "vendor_id" | awk '{print $3}' | sort -u
GenuineIntel

# 获取CPU型号
[root@localhost ~]# cat /proc/cpuinfo | grep "model name" | awk -F: '{print $2}' | sort -u
 Intel(R) Core(TM) i7-4790K CPU @ 4.00GHz

# 获取CPU ID（有两个物理CPU，所以下面会有两条ID信息）
[root@localhost ~]# dmidecode -t processor | grep ID | sort -u
        ID: C3 06 00 00 FF FB 8B 1F
        ID: C3 06 03 00 FF FB 8B 1F
```

:::

::: details （3）CPU缓存大小

```bash
[root@localhost ~]# lscpu | grep cache
L1d cache:             32K
L1i cache:             32K
L2 cache:              256K
L3 cache:              8192K
```

:::

::: details （4）主机字节序

主机字节序一般是小端，而其他场景（比如网络传输、文件存储）一般是大端，参考地址：[https://www.ruanyifeng.com/blog/2016/11/byte-order.html](https://www.ruanyifeng.com/blog/2016/11/byte-order.html)

```bash
[root@localhost ~]# lscpu | grep 'Byte Order' | awk -F: '{print $2}'
            Little Endian
```

:::

::: details （5）虚拟化管理程序

参考：[https://www.redhat.com/en/topics/virtualization/what-is-a-hypervisor](https://www.redhat.com/en/topics/virtualization/what-is-a-hypervisor)

```bash
# 这是本地使用VMware Workstation Pro安装的系统的输出结果
[root@localhost ~]# lscpu | grep -E 'Hypervisor vendor|Virtualization type'
Hypervisor vendor:     VMware
Virtualization type:   full

# 这是腾讯云轻量服务器输出的结果
[root@ap-hongkang ~]# lscpu | grep -E 'Hypervisor vendor|Virtualization type'
Hypervisor vendor:   KVM
Virtualization type: full
```

:::

### 使用率

#### （1）计算公式和显示不一致问题

$$
(从系统启动到现在的)平均cpu使用率 = 1 - \frac {空闲时间} {总cpu时间}
$$

$$
(n秒时间内的)平均cpu用率 = 1 - \frac {空闲时间{}_{new} - 空闲时间{}_{old}} {总cpu时间{}_{new} - 总cpu时间{}_{old}}
$$

:::tip

第一个公式基本没有啥参考价值，`ps`命令输出的平均CPU使用率就属于这一范围

第二个公式常用于查看实时的CPU使用率，所谓的"实时"实际上也是某一段时间，只不过这段时间比较短而已，`top`中显示的CPU使用率就属于这一范围

`top`默认每隔3秒刷新一次（在左上角可以查看时间变化），可以通过`top -d 1`来指定间隔时间

:::

::: details 下面以一个具体的案例来说明两种平均CPU使用率显示不一致问题

（1）先创建一个Python脚本用于消耗CPU

启动命令：`python3 main.py`

```python
#!/usr/bin/env python
# -*- coding:utf-8-*-

import math
import time
import threading
from loguru import logger


def calculation(id: int) -> None:
    logger.warning(f"线程[ID:{id}]进入休眠状态...")
    time.sleep(60)
    logger.info(f"线程[ID:{id}]开始执行计算任务...")
    for i in range(10000000000):
        math.sqrt(i)
    logger.success(f"线程[ID:{id}]已经执行完毕")


for i in range(10):
    threading.Thread(target=calculation, args=(i,)).start()
```

（2）再创建一个Shell脚本用于每秒输出ps和top命令中的平均CPU使用率

启动命令：`watch -n 1 bash main.sh`

```bash
#!/bin/bash
echo -e "\n[ps] output:" ; \
    ps aux | sed -n '1p' ; \
    ps aux | grep python3 | grep main.py ; \
    
echo -e "\n[top] output:" ; \
    top -b -n 1 -c | grep '%CPU' | grep -v grep ; \
    top -b -n 1 -c | grep python3 | grep main.py ; echo -e "\n"
```

（3）输出结果（`tmux`上下分屏输出）

![image-20220809092807702](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220809092807702.png)

:::

<br />

#### （2）模拟用户态(us)和内核态(sy)

- `us => user time `：表示CPU使用率中用户态所占百分比。通常这个值越高越好。
- `sy => system time` ：表示CPU使用率中内核态所占百分比。通常这个值越低越好。

::: details 使用Go模拟us和sy占比高的情况

```go
package main

import (
	"flag"
	"time"
)

// 模拟 用户态CPU平均使用率 高的情况
func us() {
	for {
		go func() {
			//time.Sleep(time.Second)
		}()
	}
}

// 模拟 内核态CPU平均使用率 高的情况
func sy() {
	for {
		go func() {
			time.Sleep(time.Second)
		}()
	}
}

func main() {
	var t string
	flag.StringVar(&t, "t", "", "指定CPU使用率增高所使用的类型，可选值us、sy")
	flag.Parse()

	if t == "us" {
		us()
	} else if t == "sy" {
		sy()
	} else {
		flag.Usage()
	}
}
```

查看输出命令

```bash
vmstat_format='"%-5s%-5s%-10s%-10s%-10s%-10s%-10s%-10s%-10s%-10s%-10s%-10s%-10s%-10s%-10s%-10s%-10s\n"'
vmstat_values='$1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18'
echo -e "\nvmstat format output: "; vmstat 1 | while read line; do echo "${line}" | \
	# 删除第一行输出procs -----------memory---------- ---swap-- -----io---- -system-- ------cpu-----
	sed -r "/(.*)(procs)(.*)/d" | \
	# 格式化输出列
	awk '{printf '"${vmstat_format}"', '"${vmstat_values}"'}' | \
	# 说明行前面加一个空行
	sed -r 's/(.*)(free)(.*)/\n\1\2\3/' | \
	# 删除第一列前面的空白
	sed -r 's/^[[:blank:]]//';
done
```

![image-20220810010359550](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220810010359550.png)

![image-20220810010146168](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220810010146168.png)

:::

<br />

#### （3）模拟IO等待(wa or iowait)

::: tip

分析：

（1）通过`top`查看CPU信息，`sy`（内核态）占比较高，这可不是我们想看到的

（2）再往后看，`wa`（IO等待占比）较高，说明`IO`可能会有问题

（3）通过`iostat`查看，`vda`设备`tps`（每秒发送到设备的 I/O 请求数）较高

（4）至此我们得出结论：CPU使用率增高是由于`vda`磁盘上的`IO`等待引起的

:::

![image-20220810070848855](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220810070848855.png)

<br />

#### （4）模拟软中断(si)和硬中断(hi)

:::tip

* 硬中断不太好模拟，这里只模拟软中断

* `ksoftirqd/0`：其中`ksoftirqd`代表软中断程序，`0`代表编号为0的CPU

:::

::: details 使用hping3模拟软中断(si)，总共需要2台服务器

（1）在第1台服务器上，启动一个Nginx服务

```bash
[root@localhost ~]# docker container run --name=demo -itd -p 8081:80 nginx:1.23
75dab40fcc398e07a2147fdbde462713c728fc602c40f9c9a7777fdf408eaa19
```

（2）在第2台服务器上，先测试一下是否能正常访问

```bash
[root@localhost ~]# curl -I http://192.168.48.133:8081
HTTP/1.1 200 OK
Server: nginx/1.23.1
Date: Tue, 09 Aug 2022 23:48:40 GMT
Content-Type: text/html
Content-Length: 615
Last-Modified: Tue, 19 Jul 2022 14:05:27 GMT
Connection: keep-alive
ETag: "62d6ba27-267"
Accept-Ranges: bytes
```

（3）在第2台服务器上，使用hping3发包

```bash
# 安装hping3工具
[root@localhost ~]#  yum -y install hping3

# 编写发包脚本
[root@localhost ~]# vim main.sh		        
#!/bin/bash

function start(){
  for i in `seq 50`
  do
    nohup hping3 -S -p 8081 -i u100 192.168.48.133 &>/dev/null &
  done
}

function stop(){
  ps aux | grep hping3 | grep -v grep | awk '{print $2}' | xargs kill -9
}

function main(){
  if [[ "$1" == "start" ]];then
    start
  elif [[ "$1" == "stop" ]];then
    stop
  else
    echo "Usage: ./$0 [ start | stop ]"
fi
}

main "$@"

# 执行脚本
[root@localhost ~]# bash main.sh start
```

（4）在第1台服务器上启动top查看软中断使用率

![image-20220810090725980](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220810090725980.png)

:::

