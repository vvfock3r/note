# Linux性能优化

## CPU

### CPU信息来源

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

### CPU使用率

#### （1）计算公式和显示不一致问题

$$
(从系统启动到现在的)平均cpu使用率 = 1 - \frac {空闲时间} {总cpu时间}
$$

$$
(n秒时间内的)平均cpu用率 = 1 - \frac {空闲时间{}_{new} - 空闲时间{}_{old}} {总cpu时间{}_{new} - 总cpu时间{}_{old}}
$$

:::tip

第一个公式基本没有啥参考价值，`ps`命令输出的CPU使用率就属于这一范围

第二个公式常用于查看实时的CPU使用率，所谓的"实时"实际上也是某一段时间，只不过这段时间比较短而已，`top`中显示的CPU使用率就属于这一范围

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

:::

输出结果（`tmux`上下分屏输出）

![image-20220809092807702](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220809092807702.png)

#### （2）短时进程引起的CPU使用率异常
