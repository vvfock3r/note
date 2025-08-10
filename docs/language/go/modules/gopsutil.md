# gopsutil

Github：[https://github.com/shirou/gopsutil](https://github.com/shirou/gopsutil)

文档：[https://pkg.go.dev/github.com/shirou/gopsutil/v3](https://pkg.go.dev/github.com/shirou/gopsutil/v3)

<br />

## 安装

```bash
go get -u github.com/shirou/gopsutil/v3
```

<br />

## CPU信息

::: details （1）CPU信息

```go
package main

import (
	"encoding/json"
	"fmt"
	"time"

	"github.com/shirou/gopsutil/v3/cpu"
)

func main() {
	// 获取CPU核心个数, true代表获取逻辑CPU核心个数,false代表获取物理CPU核心个数
	cpuLogicalCoreCount, err := cpu.Counts(true)
	if err != nil {
		panic(err)
	}

	// 获取CPU使用率
	cpuPercentList, err := cpu.Percent(time.Second, false)
	if err != nil {
		panic(err)
	}

	// 获取CPU信息
	cpuInfoStatList, err := cpu.Info()
	if err != nil {
		panic(err)
	}

	// 获取CPU时间信息, true代表分别获取每一个逻辑CPU信息,false代表获取总的CPU信息
	cpuTimeStatList, err := cpu.Times(false)
	if err != nil {
		panic(err)
	}

	// JSON序列化
	cpuInfoStatListJson, err := json.MarshalIndent(cpuInfoStatList, "", "    ")
	if err != nil {
		panic(err)
	}
	cpuTimeStatListJson, err := json.MarshalIndent(cpuTimeStatList, "", "    ")
	if err != nil {
		panic(err)
	}

	// 输出CPU信息
	fmt.Printf("CPU Logical Core Count:%d\n", cpuLogicalCoreCount)
	fmt.Printf("CPU Percent:%.2f\n", cpuPercentList[0])
	fmt.Printf("CPU InfoStatListJson:\n %s\n", string(cpuInfoStatListJson))
	fmt.Printf("CPU TimeStatListJson:\n %s\n", string(cpuTimeStatListJson))
}
```

输出结果

```bash
[root@ap-hongkang example]# go run main.go
CPU Logical Core Count:2
CPU Percent:1.01
CPU InfoStatListJson:
 [
    {
        "cpu": 0,
        "vendorId": "AuthenticAMD",
        "family": "23",
        "model": "49",
        "stepping": 0,
        "physicalId": "0",
        "coreId": "0",
        "cores": 1,
        "modelName": "AMD EPYC 7K62 48-Core Processor",
        "mhz": 2595.122,
        "cacheSize": 512,
        "flags": [
            "fpu",
            "vme",
            "de",
            "pse",
            "tsc",
            "msr",
            "pae",
            "mce",
            "cx8",
            "apic",
            "sep",
            "mtrr",
            "pge",
            "mca",
            "cmov",
            "pat",
            "pse36",
            "clflush",
            "mmx",
            "fxsr",
            "sse",
            "sse2",
            "ht",
            "syscall",
            "nx",
            "mmxext",
            "fxsr_opt",
            "pdpe1gb",
            "rdtscp",
            "lm",
            "rep_good",
            "nopl",
            "cpuid",
            "extd_apicid",
            "tsc_known_freq",
            "pni",
            "pclmulqdq",
            "ssse3",
            "fma",
            "cx16",
            "sse4_1",
            "sse4_2",
            "x2apic",
            "movbe",
            "popcnt",
            "aes",
            "xsave",
            "avx",
            "f16c",
            "rdrand",
            "hypervisor",
            "lahf_lm",
            "cmp_legacy",
            "cr8_legacy",
            "abm",
            "sse4a",
            "misalignsse",
            "3dnowprefetch",
            "osvw",
            "topoext",
            "ibpb",
            "vmmcall",
            "fsgsbase",
            "bmi1",
            "avx2",
            "smep",
            "bmi2",
            "rdseed",
            "adx",
            "smap",
            "clflushopt",
            "sha_ni",
            "xsaveopt",
            "xsavec",
            "xgetbv1",
            "arat"
        ],
        "microcode": "0x1000065"
    },
    {
        "cpu": 1,
        "vendorId": "AuthenticAMD",
        "family": "23",
        "model": "49",
        "stepping": 0,
        "physicalId": "0",
        "coreId": "1",
        "cores": 1,
        "modelName": "AMD EPYC 7K62 48-Core Processor",
        "mhz": 2595.122,
        "cacheSize": 512,
        "flags": [
            "fpu",
            "vme",
            "de",
            "pse",
            "tsc",
            "msr",
            "pae",
            "mce",
            "cx8",
            "apic",
            "sep",
            "mtrr",
            "pge",
            "mca",
            "cmov",
            "pat",
            "pse36",
            "clflush",
            "mmx",
            "fxsr",
            "sse",
            "sse2",
            "ht",
            "syscall",
            "nx",
            "mmxext",
            "fxsr_opt",
            "pdpe1gb",
            "rdtscp",
            "lm",
            "rep_good",
            "nopl",
            "cpuid",
            "extd_apicid",
            "tsc_known_freq",
            "pni",
            "pclmulqdq",
            "ssse3",
            "fma",
            "cx16",
            "sse4_1",
            "sse4_2",
            "x2apic",
            "movbe",
            "popcnt",
            "aes",
            "xsave",
            "avx",
            "f16c",
            "rdrand",
            "hypervisor",
            "lahf_lm",
            "cmp_legacy",
            "cr8_legacy",
            "abm",
            "sse4a",
            "misalignsse",
            "3dnowprefetch",
            "osvw",
            "topoext",
            "ibpb",
            "vmmcall",
            "fsgsbase",
            "bmi1",
            "avx2",
            "smep",
            "bmi2",
            "rdseed",
            "adx",
            "smap",
            "clflushopt",
            "sha_ni",
            "xsaveopt",
            "xsavec",
            "xgetbv1",
            "arat"
        ],
        "microcode": "0x1000065"
    }
]
CPU TimeStatListJson:
 [
    {
        "cpu": "cpu-total",
        "user": 70451.12,
        "system": 60101.81,
        "idle": 16767023.39,
        "nice": 642.27,
        "iowait": 4628.76,
        "irq": 0,
        "softirq": 740.35,
        "steal": 0,
        "guest": 0,
        "guestNice": 0
    }
]
```

:::

<br />

## 内存信息

::: details （1）虚拟内存信息

```go
package main

import (
	"encoding/json"
	"fmt"

	"github.com/shirou/gopsutil/v3/mem"
)

func main() {
	// 获取虚拟内存信息
	memory, err := mem.VirtualMemory()
	if err != nil {
		panic(err)
	}

	// JSON序列化
	data, err := json.MarshalIndent(memory, "", "    ")
	if err != nil {
		panic(err)
	}
	fmt.Println(string(data))
}
```

输出结果

```bash
[root@ap-hongkang example]# go run main.go
{
    "total": 1905143808,
    "available": 814231552,
    "used": 936927232,
    "usedPercent": 49.17881936606016,
    "free": 273678336,
    "active": 393428992,
    "inactive": 1087365120,
    "wired": 0,
    "laundry": 0,
    "buffers": 88686592,
    "cached": 605851648,
    "writeBack": 0,
    "dirty": 1884160,
    "writeBackTmp": 0,
    "shared": 2465792,
    "slab": 91746304,
    "sreclaimable": 49201152,
    "sunreclaim": 42545152,
    "pageTables": 17158144,
    "swapCached": 0,
    "commitLimit": 952569856,
    "committedAS": 3058442240,
    "highTotal": 0,
    "highFree": 0,
    "lowTotal": 0,
    "lowFree": 0,
    "swapTotal": 0,
    "swapFree": 0,
    "mapped": 196055040,
    "vmallocTotal": 35184372087808,
    "vmallocUsed": 0,
    "vmallocChunk": 0,
    "hugePagesTotal": 0,
    "hugePagesFree": 0,
    "hugePagesRsvd": 0,
    "hugePagesSurp": 0,
    "hugePageSize": 2097152
}

# free命令输出结果
[root@ap-hongkang example]# free
              total        used        free      shared  buff/cache   available
Mem:        1860492      904260      272448        2408      683784      805688
Swap:             0           0           0

# Go代码中输出的单位是字节Byte, free不带任何参数输出的单位是KB,所以换算一下
1905143808 / 1024 = 1860492
```

:::

::: details （2）交换分区信息

```go
package main

import (
	"encoding/json"
	"fmt"

	"github.com/shirou/gopsutil/v3/mem"
)

func main() {
	// 获取交换分区信息
	swapMemory, err := mem.SwapMemory()
	if err != nil {
		panic(err)
	}
	swapDevices, err := mem.SwapDevices()
	if err != nil {
		panic(err)
	}

	// JSON序列化
	swapMemoryJson, err := json.MarshalIndent(swapMemory, "", "    ")
	if err != nil {
		panic(err)
	}
	swapDevicesJson, err := json.MarshalIndent(swapDevices, "", "    ")
	if err != nil {
		panic(err)
	}

	// 输出结果
	fmt.Printf("交换分区内存信息:\n %s\n", string(swapMemoryJson))
	fmt.Printf("交换分区设备信息:\n %s\n", string(swapDevicesJson))
}
```

输出结果

```bash
# 给机器加1G交换分区
[root@ap-hongkang example]# dd if=/dev/zero of=./swap bs=1M count=1024
1024+0 records in
1024+0 records out
1073741824 bytes (1.1 GB, 1.0 GiB) copied, 3.04842 s, 352 MB/s

[root@ap-hongkang example]# mkswap swap
mkswap: swap: insecure permissions 0644, 0600 suggested.
Setting up swapspace version 1, size = 1024 MiB (1073737728 bytes)
no label, UUID=198df0d5-37ed-44c6-a503-64ed88f9c12b

[root@ap-hongkang example]# swapon swap
swapon: /root/example/swap: insecure permissions 0644, 0600 suggested.

# free命令查看
[root@ap-hongkang example]# free
              total        used        free      shared  buff/cache   available
Mem:        1860492      898432       97848        2384      864212      808324
Swap:       1048572       11080     1037492

# 执行代码
[root@ap-hongkang example]# go run main.go
交换分区内存信息:
 {
    "total": 1073737728,
    "used": 260517888,
    "free": 813219840,
    "usedPercent": 24.262711573454183,
    "sin": 4562944,
    "sout": 266158080,
    "pgIn": 0,
    "pgOut": 0,
    "pgFault": 0,
    "pgMajFault": 0
}
交换分区设备信息:
 [
    {
        "name": "/root/example/swap",
        "usedBytes": 260517888,
        "freeBytes": 813219840
    }
]
```

:::

<br />
