# time

文档：[https://pkg.go.dev/time](https://pkg.go.dev/time)

### 概念

**协调世界时 UTC**

协调世界时（Coordinated Universal Time，UTC） 是最主要的世界时间标准，由原子钟报时，与时区无关

<br />

**Unix时间戳**

Unix时间戳指的是UTC时间 `1970-01-01 00:00:00` 到现在所经过的时间，是一个整数，与时区无关，可以分为*秒级时间戳*、*毫秒级时间戳*、*纳秒级时间戳*等

<br />

**时区**

中国处于东八区，东记为正，西记为负，中国时间也就是`+0800`,也就是说 中国时间比UTC时间快8小时，举例如下：    

```bash
中国的时间  = UTC      + (+0800)
12:00:00  = 04:00:00 + 8
```

<br />

### 时间点

#### 1）结构体

`time.Time` 结构体表示一个具有**纳秒精度**的时间点

```go
type Time struct {
	wall uint64
	ext  int64
	loc *Location
}
```

<br />

#### 2）获取当前时间

::: details 点击查看完整代码

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	// 获取当前时间（默认为本地系统时区）
	fmt.Println(time.Now())

	// 获取当前时间（不管之前的时区是什么，将Time对象显示转为本地系统时区）
	fmt.Println(time.Now().Local())

	// 获取当前时间（不管之前的时区是什么，将Time对象显示转为UTC时间，也可以理解成是0时区）
	fmt.Println(time.Now().UTC())
}
```

输出结果

```bash
D:\application\GoLand\demo>go run main.go
2022-10-08 12:02:51.8149117 +0800 CST m=+0.002145601
2022-10-08 12:02:51.8260779 +0800 CST
2022-10-08 04:02:51.8260779 +0000 UTC
```

这里有一行`m=+0.002145601`是什么意思？

其实他是记录了**单调时钟**的信息，我们将在后面的章节详细介绍

:::

<br />

#### 3）挂钟和单调时钟

**我们的计算机有两种不同类型的时钟**

* 挂钟（*a wall clock*）：挂钟是我们平常所看到的系统时间，通常与NTP（网络时间协议）服务器同步。
* 单调时钟（*a monotonic clock*）：单调时钟提供了一个始终向前的时间。

**两者的不同**

* 挂钟可能会由用户或其他程序调整而改变，单调时钟不会受到用户或其他程序调整而改变
* 一般规则是挂钟是用来报时的，而单调钟是用来测量时间的

**应用场景举例**

* 当测量一项任务需要多长时间，应使用单调时钟（若使用挂钟，在测量过程中时间发生改变，则测量可能不准确）

**Go语言中挂钟和单调时钟**

```go
// fmt.Println(time.Now()) 
// m=+0.002145601代表此Time结构体包含有单调时钟的信息
2022-10-08 12:02:51.8149117 +0800 CST m=+0.002145601  

// fmt.Println(time.Now().Local())
// 这里没有m=±<value>的信息，所以这个结构体并不包含单调时钟的信息
2022-10-08 12:02:51.8260779 +0800 CST

// 在 time.Now().String() 方法注释中，我们也可以找到一部分关于这方面的信息
// String returns the time formatted using the format string
//
//	"2006-01-02 15:04:05.999999999 -0700 MST"
//
// If the time has a monotonic clock reading, the returned string
// includes a final field "m=±<value>", where value is the monotonic
// clock reading formatted as a decimal number of seconds.
//
// The returned string is meant for debugging; for a stable serialized
// representation, use t.MarshalText, t.MarshalBinary, or t.Format
// with an explicit format string.
```

官网上的参考信息：[https://pkg.go.dev/time#hdr-Monotonic_Clocks](https://pkg.go.dev/time#hdr-Monotonic_Clocks)



::: details 辅助脚本：用于调整或重置系统时间，仅适用于Linux

```bash
[root@localhost ~]# cat modify_system_time.sh 
#!/bin/bash
set -euo pipefail

# 显示帮助
function ShowUsage(){
  echo "Usage: $0 reset"
  echo "Usage: $0 add [+-]Number"
}

# 修改系统时间
function ModifySystemTime(){
    add_seconds="${1:-0}"
    timestamp_now=$(date +"%s")
    timestamp_new=$((timestamp_now + ${add_seconds}))
    time_new="$(date -d @${timestamp_new} +"%Y-%m-%d %H:%M:%S")"
    date -s "${time_new}" +"%Y-%m-%d %H:%M:%S"
}

# 重置系统时间
function ResetSystemTime(){
    ntpdate time.windows.com   
}

# 执行入口
function main(){
    action="${1:-help}"
    if [[ "${action}" == "reset" ]];then
      ResetSystemTime && exit 0 || exit 1
    fi

    if [[ "${action}" == "add" ]];then
        if [[ -n $(echo "$2" | tr -d '[\-,+,0-9]') ]];then
            ShowUsage; exit 0
        fi
      ModifySystemTime "$2" && exit 0 || exit 1
    fi

    ShowUsage
}

main "$@"
```

:::

::: details （1）使用挂钟测量程序运行时间演示：若测量过程中时间改变，【测量结果将不准确】

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	// 计时开始时间（此时间为挂钟时间，没有携带单调时钟信息）
	start := time.Now().Local()
	fmt.Println("开始运行:", start)

	// 模拟程序运行N秒
	time.Sleep(time.Second * 5)

	// 运行结束（这里携带或不携带单调时钟都可以）
	end := time.Now().Local()
	fmt.Println("运行结束:", end)

	// 统计计时
	fmt.Printf("运行耗时: %.2f秒\n", end.Sub(start).Seconds())
}
```

输出结果

![go_wall_clock_error](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//go_wall_clock_error.gif)

:::

::: details （2）使用单调时钟测量程序运行时间演示：若测量过程中时间改变，【测量结果依旧准确】

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	// 计时开始时间（此时间携带单调时钟信息）
	start := time.Now()
	fmt.Println("开始运行:", start)

	// 模拟程序运行N秒
	time.Sleep(time.Second * 5)

	// 运行结束
	end := time.Now()
	fmt.Println("运行结束:", end)

	// 统计计时
	fmt.Printf("运行耗时: %.2f秒\n", end.Sub(start).Seconds())
}
```

输出结果

![go_time_monotonic_clock_right](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//go_time_monotonic_clock_right.gif)

:::

<br />

#### 4）自定义和解析时间

::: details 点击查看完整代码

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	// time.Date 自定义时间，年-月-日-时-分-秒-纳秒-时区, 返回Time对象
	{
		t := time.Date(2030, 1, 1, 12, 01, 02, 0, time.Local)
		fmt.Println("1)", t)
	}

	// time.Parse 解析字符串时间，新时间的时区为UTC
	{
		t, err := time.Parse("2006-01-02 15:04:05", "2030-01-01 12:01:02")
		if err != nil {
			panic(err)
		}
		fmt.Println("2)", t)
	}
	// time.ParseInLocation 解析字符串时间，可以指定新时间的时区
	{
		t, err := time.ParseInLocation("2006-01-02 15:04:05", "2030-01-01 12:01:02", time.Local)
		if err != nil {
			panic(err)
		}
		fmt.Println("3)", t)
	}
}
```

输出结果

```bash
D:\application\GoLand\demo>go run main.go
1) 2030-01-01 12:01:02 +0800 CST
2) 2030-01-01 12:01:02 +0000 UTC
3) 2030-01-01 12:01:02 +0800 CST
```

:::

<br />

#### 5）格式化和序列化

::: details （1）输出格式化的字符串

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	// 输出基本格式化的字符串
	fmt.Println("基本用法: ", time.Now().Format("2006-01-02 15:04:05"))

	// 输出携带时区信息的字符串
	fmt.Println("携带时区: ", time.Now().Format("2006-01-02 15:04:05 -0700 MST"))

	// 指定毫秒、微妙或纳秒级别的精度，请注意下面这两个模板是合法的，但是有一些区别
	// 000000000：输出纳秒级别的时间，秒后面一定是9位数
	// 999999999：输出纳秒级别的时间，秒后面不一定是9位数，最末尾的0就给省略掉了
	fmt.Println("纳秒精度: ", time.Now().Format("2006-01-02 15:04:05.000000000 -0700 MST"))
	fmt.Println("纳秒精度: ", time.Now().Format("2006-01-02 15:04:05.999999999 -0700 MST"))

	// 输出携带单调时钟信息的字符串
	fmt.Println("单调时钟: ", time.Now().String())

	// Go预定义格式化,等等还有很多
	// time.RFC3339 是一种国际标准, T用于分隔日期和时间，Z表示0时区(即UTC时间)
	fmt.Println("RFC3339 : ", time.Now().Format(time.RFC3339))
	fmt.Println("RFC3339 : ", time.Now().UTC().Format(time.RFC3339))
}
```

输出结果

```bash
D:\application\GoLand\demo>go run main.go
基本用法:  2022-10-11 18:56:40
携带时区:  2022-10-11 18:56:40 +0800 CST                      
纳秒精度:  2022-10-11 18:56:40.883881000 +0800 CST            
纳秒精度:  2022-10-11 18:56:40.883881 +0800 CST               
单调时钟:  2022-10-11 18:56:40.883881 +0800 CST m=+0.015173001
RFC3339 :  2022-10-11T18:56:40+08:00                          
RFC3339 :  2022-10-11T10:56:40Z
```

:::

::: details （2）序列化和反序列化

```go
package main

import (
	"encoding/json"
	"fmt"
	"time"
)

func main() {
	// 序列化：使用的是纳秒级别的RFC3339格式，即RFC3339Nano
	timeJson, err := time.Now().MarshalJSON()
	if err != nil {
		panic(err)
	}
	fmt.Println(string(timeJson))

	// 反序列化
	var t time.Time
	err = json.Unmarshal([]byte(timeJson), &t)
	if err != nil {
		panic(err)
	}
	fmt.Println(t)
}
```

输出结果

```bash
D:\application\GoLand\demo>go run main.go
"2022-10-09T15:38:34.8018945+08:00"
2022-10-09 15:38:34.8018945 +0800 CST
```

说明

默认的JSON序列化方式可读性比较差，若要定制JSON序列化字符串，可以参考 JSON模块

:::

<br />

#### 6）时间戳转换

::: details 点击查看完整代码

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	// 时间 -> 时间戳
	// 1秒   == 1000毫秒
	// 1毫秒 == 1000微妙
	// 1微妙 == 1000纳秒
	fmt.Printf("秒级时间戳   ：%d\n", time.Now().Unix())
	fmt.Printf("毫秒级时间戳 ：%d\n", time.Now().UnixMilli())
	fmt.Printf("微秒级时间戳 ：%d\n", time.Now().UnixMicro())
	fmt.Printf("纳秒级时间戳 ：%d\n", time.Now().UnixNano())

	//  时间戳  -> 转为本地时区的时间
	fmt.Println(time.Unix(1665371603, 1572000000)) // 第一个参数为秒级时间戳，第二个参数为纳秒（一般设置为0即可）,两个值相加得出最终的时间戳
	fmt.Println(time.UnixMilli(1665371603572))     // 毫秒级时间戳转为时间对象
	fmt.Println(time.UnixMicro(1665371603572000))  // 微秒级时间戳转为时间对象
	//fmt.Println(time.Unix(16653716030000000000000000000, 0)) // 当传递的值过大时候会报错
}
```

输出结果

```bash
秒级时间戳   ：1665372429
毫秒级时间戳 ：1665372429883      
微秒级时间戳 ：1665372429883642   
纳秒级时间戳 ：1665372429883642700
2022-10-10 11:13:24.572 +0800 CST 
2022-10-10 11:13:23.572 +0800 CST 
2022-10-10 11:13:23.572 +0800 CST
```

:::

<br />

#### 7）时间分段获取

::: details 点击查看完整代码

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	// 基本信息
	fmt.Println("时间: ", time.Now())
	fmt.Println("年份: ", time.Now().Year())
	fmt.Println("月份: ", int(time.Now().Month()))
	fmt.Println("日期: ", time.Now().Day())
	fmt.Println("小时: ", time.Now().Hour())
	fmt.Println("分钟: ", time.Now().Minute())
	fmt.Println("秒数: ", time.Now().Second())
	fmt.Println("周几: ", time.Now().Weekday()) // 周日是0，周一是1，以此类推

	// 今天是今年的第几天
	fmt.Println("今天是今年的第几天: ", time.Now().YearDay())

	// 本周是今年的第几周
	year, week := time.Now().ISOWeek()
	year = year
	fmt.Println("本周是今年的第几周: ", week)

	// 本周第一天和最后一天
	var weekday int
	if time.Now().Weekday() == 0 {
		weekday = 7
	} else {
		weekday = int(time.Now().Weekday())
	}
	weekFirst := time.Now().AddDate(0, 0, -weekday+1)
	weekLast := time.Now().AddDate(0, 0, 7-weekday)
	fmt.Println("本周正数第一天：", weekFirst)
	fmt.Println("本周倒数第一天：", weekLast)

	// 本月第一天和最后一天
	monthFirst := time.Now().AddDate(0, 0, -time.Now().Day()+1)
	monthLast := time.Now().AddDate(0, 1, -time.Now().Day())
	fmt.Println("本月正数第一天：", monthFirst)
	fmt.Println("本月倒数第一天：", monthLast)

	// 本年第一天和最后一天
	yearFirst := time.Now().AddDate(0, 0, time.Now().YearDay()*-1+1)
	yearLast := yearFirst.AddDate(1, 0, -1)
	fmt.Println("本年正数第一天：", yearFirst)
	fmt.Println("本年倒数第一天：", yearLast)
}
```

输出结果

```bash
D:\application\GoLand\demo>go run main.go
时间:  2022-10-10 18:32:37.3697933 +0800 CST m=+0.003243701
年份:  2022
月份:  10
日期:  10
小时:  18
分钟:  32
秒数:  37
周几:  Monday
今天是今年的第几天:  283
本周是今年的第几周:  41
本周正数第一天： 2022-10-10 18:32:37.3839166 +0800 CST
本周倒数第一天： 2022-10-16 18:32:37.3839166 +0800 CST
本月正数第一天： 2022-10-01 18:32:37.3839166 +0800 CST
本月倒数第一天： 2022-10-31 18:32:37.3839166 +0800 CST
本年正数第一天： 2022-01-01 18:32:37.3839166 +0800 CST
本年倒数第一天： 2022-12-31 18:32:37.3839166 +0800 CST
```

:::

<br />

#### 8）比较操作

::: details 点击查看完整代码

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	// 小于（早）比较，判断 当前时间 < 当前时间+1秒，输出 true
	fmt.Println(time.Now().Before(time.Now().Add(time.Second)))

	// 晚于(迟)比较，输出false
	fmt.Println(time.Now().After(time.Now().Add(time.Second)))

	// 等于比较，输出true
	t1 := time.Date(2030, 10, 1, 8, 0, 0, 0, time.Local)
	t2 := time.Date(2030, 10, 1, 0, 0, 0, 0, time.UTC)
	fmt.Println(t1.Equal(t2))

	// 判断Time对象是否为空
	var t time.Time
	fmt.Println(t.IsZero())          // true
	fmt.Println(time.Now().IsZero()) // false
}
```

输出结果

```bash
D:\application\GoLand\demo>go run main.go
true
false
true 
true 
false
```

:::

<br />

#### 9）加减操作

::: details 点击查看完整代码

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	// 当前时间
	now := time.Now()

	// 加减一段时间，传入time.Duration对象，返回time.Time对象
	fmt.Println("当前时间: ", now)
	fmt.Println("加一小时: ", now.Add(time.Hour))
	fmt.Println("减一小时: ", now.Add(time.Hour*-1)) // 减法就是加一个负数
	fmt.Println("加一整年: ", now.AddDate(1, 0, 0))  // 这个丢失了单调时钟的信息

	// 两个时间相减，传入time.Time对象，返回time.Duration对象
	fmt.Println(time.Now().Sub(now))

	// --------------------------------------------------------------------------------------------------
	// Sub方法的一些快捷操作
	fmt.Println(time.Since(now)) // 等同于 time.Now().Sub(now)
	fmt.Println(time.Until(now)) // 等同于 now.Sub(time.Now())
}
```

输出结果

```bash
D:\application\GoLand\demo>go run main.go
当前时间:  2022-10-11 18:27:14.6471029 +0800 CST m=+0.003447101
加一小时:  2022-10-11 19:27:14.6471029 +0800 CST m=+3600.003447101
减一小时:  2022-10-11 17:27:14.6471029 +0800 CST m=-3599.996552899
加一整年:  2023-10-11 18:27:14.6471029 +0800 CST
10.1765ms
10.1765ms
-10.7192ms
```

:::

<br />

#### 10）其他操作

::: details （1）时间截断

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	// 当前时间
	fmt.Println("当前时间: ", time.Now())

	// 当前时间截断
	fmt.Println("保留到时: ", time.Now().Truncate(time.Hour))        // 保留到小时，小时后面的(分钟、秒、毫秒、微妙、纳秒等)置为0
	fmt.Println("保留到分: ", time.Now().Truncate(time.Minute))      // 保留到分钟，分钟后面的(秒、毫秒、微妙、纳秒等)置为0
	fmt.Println("保留到秒: ", time.Now().Truncate(time.Second))      // 保留到秒，秒后面的(毫秒、微妙、纳秒)等置为0
	fmt.Println("保留毫秒: ", time.Now().Truncate(time.Millisecond)) // 保留到毫秒，毫秒后面的(微妙、纳秒)等置为0
	fmt.Println("保留微妙: ", time.Now().Truncate(time.Microsecond)) // 保留到微妙，微妙后面的(纳秒)等置为0
	fmt.Println("保留纳秒: ", time.Now().Truncate(time.Nanosecond))  // 保留到纳秒

	// 相当于在原来截断的基础上，时间再往后推 3 -1 = 2小时
	fmt.Println("截三小时: ", time.Now().Truncate(time.Hour*3)) // 保留到秒，秒后面的(毫秒、微妙、纳秒)等置为0
}
```

输出结果

```bash
D:\application\GoLand\demo>go run main.go
当前时间:  2022-10-10 13:38:19.9412653 +0800 CST m=+0.002712201
保留到时:  2022-10-10 13:00:00 +0800 CST
保留到分:  2022-10-10 13:38:00 +0800 CST
保留到秒:  2022-10-10 13:38:19 +0800 CST
保留毫秒:  2022-10-10 13:38:19.951 +0800 CST
保留微妙:  2022-10-10 13:38:19.951616 +0800 CST
保留纳秒:  2022-10-10 13:38:19.9516164 +0800 CST
截三小时:  2022-10-10 11:00:00 +0800 CST
```

:::

::: details （2）四舍五入

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	// 当前时间
	fmt.Println("当前时间         : ", time.Now())

	// 当前时间四舍五入
	fmt.Println("四舍五入-保留到秒：", time.Now().Round(time.Second)) // 保留秒，根据后面的四舍五入
	fmt.Println("四舍五入-保留到分：", time.Now().Round(time.Minute)) // 保留分钟，根据后面的四舍五入
	fmt.Println("四舍五入-保留到时：", time.Now().Round(time.Hour))   // 保留小时，根据后面的四舍五入

	fmt.Println("四舍五入-保留到时：", time.Now().Round(time.Minute*1)) // 保留小时，根据后面的四舍五入
}
```

输出结果

```bash
D:\application\GoLand\demo>go run main.go
当前时间       :  2022-10-10 13:40:51.5158079 +0800 CST m=+0.002765001
四舍五入-保留到秒： 2022-10-10 13:40:52 +0800 CST
四舍五入-保留到分： 2022-10-10 13:41:00 +0800 CST
四舍五入-保留到时： 2022-10-10 14:00:00 +0800 CST
```

:::

::: details （3）拷贝副本

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	// 当前时间
	now := time.Now()

	// 休眠5秒钟
	time.Sleep(time.Second * 5)

	// 创建now的副本，第一个参数为时区，可以使用被拷贝对象的时区，也可以使用其他时区
    // 这可以达到 同一时间在不同时区的转换 效果
	nowReplica := now.In(now.Location())
	nowReplicaUTC := now.In(time.UTC)
	nowReplicaLocal := now.In(time.Local)

	// 比较一下时间是否相等
	fmt.Println(now)
	fmt.Println(nowReplica)
	fmt.Println(nowReplicaUTC)
	fmt.Println(nowReplicaLocal)

	// 比较
	fmt.Println(now.Equal(nowReplicaUTC))
}
```

输出结果

```bash
D:\application\GoLand\demo>go run main.go
2022-10-10 18:17:28.5551063 +0800 CST m=+0.002784801
2022-10-10 18:17:28.5551063 +0800 CST
2022-10-10 10:17:28.5551063 +0000 UTC   # UTC比CST慢8小时
2022-10-10 18:17:28.5551063 +0800 CST
true
```

:::

<br />

### 时间段

#### 1）结构体

```go
type Duration int64
```

<br />

#### 2）解析时间段

::: details 点击查看详情

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	// 先构造一个指定的时间
	layout := "2006-01-02 15:04:05.000000000 -0700 MST"
	date := time.Date(2030, 1, 1, 0, 0, 0, 0, time.UTC)
	fmt.Println("原始时间: ", date.Format(layout))

	// 解析字符串时间段，有效的单位：
	// ns       纳秒
	// us or µs 微妙
	// ms       毫秒
	// s        秒
	// m        分钟
	// h        小时

	// 加1纳秒
	{
		dura, err := time.ParseDuration("1ns")
		if err != nil {
			panic(err)
		}
		fmt.Println("加一纳秒: ", date.Add(dura).Format(layout))
	}
	// 加1微秒
	{
		dura, err := time.ParseDuration("1us")
		if err != nil {
			panic(err)
		}
		fmt.Println("加一微秒: ", date.Add(dura).Format(layout))
	}
	// 加1毫秒
	{
		dura, err := time.ParseDuration("1ms")
		if err != nil {
			panic(err)
		}
		fmt.Println("加一毫秒: ", date.Add(dura).Format(layout))
	}
	// 加1秒
	{
		dura, err := time.ParseDuration("1s")
		if err != nil {
			panic(err)
		}
		fmt.Println("加一秒钟: ", date.Add(dura).Format(layout))
	}
	// 加1分钟
	{
		dura, err := time.ParseDuration("1m")
		if err != nil {
			panic(err)
		}
		fmt.Println("加一分钟: ", date.Add(dura).Format(layout))
	}
	// 加1小时
	{
		dura, err := time.ParseDuration("1h")
		if err != nil {
			panic(err)
		}
		fmt.Println("加一小时: ", date.Add(dura).Format(layout))
	}

	// 加 1小时2分钟30秒400毫秒500微妙600纳秒
	{
		dura, err := time.ParseDuration("1h2m30s400ms500us600ns")
		if err != nil {
			panic(err)
		}
		fmt.Println("组合形式: ", date.Add(dura).Format(layout))
	}
}
```

输出结果

```bash
D:\application\GoLand\demo>go run main.go
原始时间:  2030-01-01 00:00:00.000000000 +0000 UTC
加一纳秒:  2030-01-01 00:00:00.000000001 +0000 UTC
加一微秒:  2030-01-01 00:00:00.000001000 +0000 UTC
加一毫秒:  2030-01-01 00:00:00.001000000 +0000 UTC
加一秒钟:  2030-01-01 00:00:01.000000000 +0000 UTC
加一分钟:  2030-01-01 00:01:00.000000000 +0000 UTC
加一小时:  2030-01-01 01:00:00.000000000 +0000 UTC
组合形式:  2030-01-01 01:02:30.400500600 +0000 UTC
```

:::

<br />

#### 3）随机休眠N秒

::: details 点击查看详情

```go
package main

import (
	"math/rand"
	"time"
)

func main() {
	// 随机休眠0-9秒：错误的写法
	// 原因是：
	//   (1) Sleep(d Duration)：time.Sleep要求参数是Duration类型
	//   (2) time.Second是Duration，但是rand.Intn(10)是int类型，需要先转为Duration类型
	//time.Sleep(time.Second * rand.Intn(10))

	// 随机休眠0-9秒：正确的写法
	time.Sleep(time.Second * time.Duration(rand.Intn(10)))
}
```

:::

<br />

### 时区

#### 1）结构体

```go
type Location struct {
	name string
	zone []zone
	tx   []zoneTrans

	extend string

	cacheStart int64
	cacheEnd   int64
	cacheZone  *zone
}

// UTC时区
var UTC *Location = &utcLoc
var utcLoc = Location{name: "UTC"}

// 本地时区
var Local *Location = &localLoc
var localLoc Location
```

<br />

#### 2）自定义时区

::: details 点击查看详情

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	// 自定义时区，第一个参数为时区名称（这里的CSE是我随手取的名字，并代表真实的时区），第二个参数为UTC时间秒级偏移量
	loc := time.FixedZone("CSE", 7*3600)

	// 使用自定义时区构造一个时间
	date := time.Date(2030, 1, 1, 12, 0, 0, 0, loc)

	// 查看 时区名称 和 秒级偏移量
	fmt.Println(time.Now().Zone())
	fmt.Println(date.Zone())

	// 将一个时区的时间转为另一个时区的时间
	fmt.Println(time.Now())
	fmt.Println(time.Now().In(loc))
}
```

输出结果

```bash
D:\application\GoLand\demo>go run main.go
CST 28800
CSE 25200                                           
2022-10-11 19:34:23.1582417 +0800 CST m=+0.013138201
2022-10-11 18:34:23.1588336 +0700 CSE                # 这里慢一个小时
```

:::

<br />

#### 3）读取已有时区

::: details 点击查看详情

```go
package main

import (
	"fmt"
	"time"
	//_ "time/tzdata"
)

func main() {
	// 读取时区,会从以下4个地方读取
	// 1) ZONEINFO环境变量指向的目录或未压缩的zip文件
	// 2) Unix系统上的时区文件信息，一般是 /usr/share/zoneinfo 目录下
	// 3) $GOROOT/lib/time/zoneinfo.zip
	// 4) time/tzdata模块（若该模块已在代码中导入）
	zoneShangHai, err := time.LoadLocation("Asia/Shanghai")
	if err != nil {
		panic(err)
	}
	fmt.Println(zoneShangHai)

	// 综上所述，time.LoadLocation依赖于tzdata数据库
	// 需要注意的是，在windows系统上（没有安装go语言），以上代码将会报错，解决办法是：将以上代码import部分的注释打开，导入 time/tzdata数据库
}
```

输出结果

```bash
Asia/Shanghai
```

:::

<br />

### 定时器

#### 1）结构体

```go
type Ticker struct {
	C <-chan Time   // 只读的Channel（Time类型）,缓冲区长度为1（后面会讲到）
	r runtimeTimer  // 
}

// Interface to timers implemented in package runtime.
// Must be in sync with ../runtime/time.go:/^type timer
type runtimeTimer struct {
	pp       uintptr
	when     int64
	period   int64
	f        func(any, uintptr) // NOTE: must not be closure
	arg      any
	seq      uintptr
	nextwhen int64
	status   uint32
}

// 可以看到runtimeTimer相关的实现其实都在runtime/time.go中
```

<br />

#### 2）基础用法

::: details 点击查看详情

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	// 先来用一下各种方法
	{
		// 实例化一个Ticker对象，指定时间间隔为1秒
		ticker := time.NewTicker(time.Second)

		// 读取Channel中的数据
		// 大多数情况下我们在意的并不是读出来的数据，而是每次读取数据之间间隔的1秒钟，
		// 比如我们将其放到for循环中，每秒执行一些操作，就很好使
		fmt.Println("读取数据: ", <-ticker.C)
		fmt.Println("读取数据: ", <-ticker.C)

		// 关闭定时器
		// 若关闭后再读取会报错: fatal error: all goroutines are asleep - deadlock!
		fmt.Println("停止定时器...")
		ticker.Stop()
		//fmt.Println("读取数据: ", <-ticker.C)

		// 重置时间间隔
		fmt.Println("重置时间为3秒钟...")
		ticker.Reset(time.Second * 3)
		fmt.Println("读取数据: ", <-ticker.C)
		fmt.Println("读取数据: ", <-ticker.C)

		// 运行结束
		fmt.Println("Execution completed")
	}
	// 通常情况下我们会这样用
	{
		ticker := time.NewTicker(time.Second)
		defer ticker.Stop()
		for t := range ticker.C {
			fmt.Println(t)
		}
	}

	// 或者这样用
	{
		ticker := time.NewTicker(time.Second)
		defer ticker.Stop()
		for {
			select {
			case t := <-ticker.C:
				fmt.Println(t)
			}
		}
	}
}

```

输出结果

```bash
D:\application\GoLand\demo>go run main.go
读取数据:  2022-10-12 19:18:29.0027248 +0800 CST m=+1.011503901
读取数据:  2022-10-12 19:18:30.0037176 +0800 CST m=+2.012496701
停止定时器...     
重置时间为3秒钟...
读取数据:  2022-10-12 19:18:33.0189901 +0800 CST m=+5.027769201
读取数据:  2022-10-12 19:18:36.019283 +0800 CST m=+8.028062101
Execution completed
2022-10-12 19:18:37.0341358 +0800 CST m=+9.042914901
2022-10-12 19:18:38.0341197 +0800 CST m=+10.042898801
2022-10-12 19:18:39.024688 +0800 CST m=+11.033467101
2022-10-12 19:18:40.0196224 +0800 CST m=+12.028401501
...
```

:::

<br />

#### 3）NewTicker

源码

```go
func NewTicker(d Duration) *Ticker {
	if d <= 0 {
		panic(errors.New("non-positive interval for NewTicker"))
	}
	// Give the channel a 1-element time buffer.
	// If the client falls behind while reading, we drop ticks
	// on the floor until the client catches up.
	c := make(chan Time, 1)
	t := &Ticker{
		C: c,
		r: runtimeTimer{
			when:   when(d),
			period: int64(d),
			f:      sendTime,
			arg:    c,
		},
	}
	startTimer(&t.r)
	return t
}

func sendTime(c any, seq uintptr) {
	select {
	case c.(chan Time) <- Now():
	default:
	}
}
```

说明

* `NewTicker`中定义了Channel缓冲区长度为1
* `NewTicker`中使用了`sendTime`函数，用于向Channel中写入数据，可以看到会将当前时间写入Channel中，若写满了就什么也不做
* `NewTicker`函数返回前就开始计时了，对应源码中`startTimer`函数调用

::: details 点击查看详情

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	// 实例化一个Ticker对象，指定时间间隔为1秒
	ticker := time.NewTicker(time.Second)

	// 休眠N秒钟
	fmt.Println("当前时间: ", time.Now())
	time.Sleep(time.Second * 10)

	// 读取Channel中的数据
	fmt.Println("读取数据: ", <-ticker.C)
	fmt.Println("读取数据: ", <-ticker.C)
	fmt.Println("读取数据: ", <-ticker.C)
	fmt.Println("读取数据: ", <-ticker.C)
	fmt.Println("读取数据: ", <-ticker.C)
}
```

输出结果

```bash
D:\application\GoLand\demo>go run main.go
当前时间:  2022-10-12 19:19:15.5927709 +0800 CST m=+0.002690501      # 当前时间秒数为15
读取数据:  2022-10-12 19:19:16.5975755 +0800 CST m=+1.007495101      # 休眠10秒钟后，第一次读取数据为16秒，因为计数器在休眠前就已经开始了
读取数据:  2022-10-12 19:19:26.5967247 +0800 CST m=+11.006644301     # 第二次读取数据为26秒，这是当前的时间
读取数据:  2022-10-12 19:19:27.5976074 +0800 CST m=+12.007527001
读取数据:  2022-10-12 19:19:28.5970446 +0800 CST m=+13.006964201
读取数据:  2022-10-12 19:19:29.5969086 +0800 CST m=+14.006828201
```

:::

<br />

#### 4）并发读取

::: details 点击查看详情

```go
package main

import (
	"fmt"
	"sync"
	"time"
)

var wg sync.WaitGroup

func main() {
	// 实例化一个Ticker对象，指定时间间隔为1秒
	ticker := time.NewTicker(time.Second)
    defer ticker.Stop()
    
	// 并发读取
	for i := 0; i < 10; i++ {
		wg.Add(1)
		go func(i int) {
			fmt.Printf("[%d] Running...\n", i)
			fmt.Printf("[%d] %s\n", i, <-ticker.C)
			wg.Done()
		}(i)
	}
	wg.Wait()
}
```

输出结果

```bash
D:\application\GoLand\demo>go run main.go
[9] Running...
[0] Running...
[5] Running...
[2] Running...
[3] Running...
[4] Running...
[7] Running...
[6] Running...
[1] Running...
[8] Running...
[9] 2022-10-12 19:55:09.0201071 +0800 CST m=+1.010990501
[0] 2022-10-12 19:55:10.0252197 +0800 CST m=+2.016103101
[5] 2022-10-12 19:55:11.0185944 +0800 CST m=+3.009477801
[2] 2022-10-12 19:55:12.0152827 +0800 CST m=+4.006166101
[3] 2022-10-12 19:55:13.0191294 +0800 CST m=+5.010012801
[4] 2022-10-12 19:55:14.0186506 +0800 CST m=+6.009534001
[7] 2022-10-12 19:55:15.0193323 +0800 CST m=+7.010215701
[6] 2022-10-12 19:55:16.0189496 +0800 CST m=+8.009833001
[1] 2022-10-12 19:55:17.0230555 +0800 CST m=+9.013938901
[8] 2022-10-12 19:55:18.0146137 +0800 CST m=+10.00549701
```

:::

<br />

#### 5）ticker.Stop()

* `Stop()`并不会关闭`Ticker`中的Channel，而是将其标记为*已删除*
* `Stop()`函数实现在`runtime/time.go`中，对应函数为`stopTimer`，内容太多就不看了

<br />

#### 6）time.Tick

源码

```go
func Tick(d Duration) <-chan Time {
	if d <= 0 {
		return nil
	}
	return NewTicker(d).C
}
```

说明

* `time.Tick`是`time.NewTicker`的一层包装
* 如果传递的参数<=0返回`nil`，而`time.NewTicker`会抛出`panic`
* <span style="color: red; font-weight: bold;">`time.Tick`因为没有提供关闭(`Stop`)的操作，有可能会引起资源泄露，应当避免使用这个方法</span>

::: details （1）time.Tick引起资源泄露示例

```go
package main

import (
	"fmt"
	"sync"
	"time"
)

func tickerLoop(wg *sync.WaitGroup, quit chan struct{}) {
	defer wg.Done()
	select {
	case <-time.Tick(time.Millisecond * 100):
	case <-quit:
		return
	}
}

func main() {
	// 初始化
	n := 100000
	wg := new(sync.WaitGroup)
	quit := make(chan struct{})

	// 开启N个Goroutine
	for i := 0; i < n; i++ {
		wg.Add(1)
		go tickerLoop(wg, quit)
	}
	fmt.Printf("Making %d tickers\n", n)

	// 休眠1秒钟
	time.Sleep(1 * time.Second)

	// 发送关闭Goroutine信号
	close(quit)
	fmt.Printf("Signalling close\n")

	// 等待所有的Goroutine运行完成
	wg.Wait()

	// 用于hang住程序
	fmt.Printf("Sleeping - examine CPU activity for this process (eg top)\n")
	time.Sleep(time.Hour)
}
```

输出结果

```bash
# 编译、执行
root@ap-hongkang ~]# go build main.go
[root@ap-hongkang ~]# ./main 
Making 100000 tickers
Signalling close
Sleeping - examine CPU activity for this process (eg top)
```

![image-20221013140753891](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20221013140753891.png)

:::

::: details （2）使用time.NewTicker进行修复

只需要修改`tickerLoop`函数即可，完整代码如下

```go
package main

import (
	"fmt"
	"sync"
	"time"
)

func tickerLoop(wg *sync.WaitGroup, quit chan struct{}) {
	defer wg.Done()
	ticker := time.NewTicker(time.Millisecond * 100)
	defer ticker.Stop()
	select {
	case <-ticker.C:
	case <-quit:
		return
	}
}

func main() {
	// 初始化
	n := 100000
	wg := new(sync.WaitGroup)
	quit := make(chan struct{})

	// 开启N个Goroutine
	for i := 0; i < n; i++ {
		wg.Add(1)
		go tickerLoop(wg, quit)
	}
	fmt.Printf("Making %d tickers\n", n)

	// 休眠1秒钟
	time.Sleep(1 * time.Second)

	// 发送关闭Goroutine信号
	close(quit)
	fmt.Printf("Signalling close\n")

	// 等待所有的Goroutine运行完成
	wg.Wait()

	// 用于hang住程序
	fmt.Printf("Sleeping - examine CPU activity for this process (eg top)\n")
	time.Sleep(time.Hour)
}
```

![image-20221013191512953](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20221013191512953.png)

:::

<br />

### 延时器

#### 1）结构体

```go
type Timer struct {
	C <-chan Time
	r runtimeTimer
}
```

<br />

#### 2）用法总结

延时器和定时器很类似

::: details 点击查看详情

```go
package main

import (
	"fmt"
	"sync"
	"time"
)

func main() {
	// time.NewTimer 同步执行
	{
		fmt.Println("当前时间: ", time.Now())

		// 延时器基本使用
		timer := time.NewTimer(time.Second * 1)
		defer timer.Stop()
		fmt.Println("当前时间: ", <-timer.C)

		// 重置时间，当延时器处于活跃状态时返回false，当处理已停止或已过期时返回false
		fmt.Println(timer.Reset(time.Second * 2))
		fmt.Println("当前时间: ", <-timer.C)
	}

	// time.NewTimer 同步执行
	{
		// 延时器基本使用
		timer := time.NewTimer(time.Second * 3)
		select {
		case <-timer.C:
			fmt.Println("当前时间: ", time.Now())
		}
	}
	// time.AfterFunc 异步执行
	{
		var wg sync.WaitGroup
		wg.Add(1)
		timer := time.AfterFunc(time.Second*4, func() {
			defer wg.Done()
			fmt.Println("当前时间: ", time.Now())
		})
		defer timer.Stop()
		wg.Wait()
	}

	// 其他
	//time.After是对NewTimer的一层封装，与time.Tick类似，不推荐使用
}
```

输出结果

```bash
当前时间:  2022-10-14 13:08:53.4813516 +0800 CST m=+0.002699601
当前时间:  2022-10-14 13:08:54.5037902 +0800 CST m=+1.025138201
false
当前时间:  2022-10-14 13:08:56.5141258 +0800 CST m=+3.035473801
当前时间:  2022-10-14 13:08:59.5199525 +0800 CST m=+6.041300501
当前时间:  2022-10-14 13:09:03.5254777 +0800 CST m=+10.04682570
```

:::

<br />