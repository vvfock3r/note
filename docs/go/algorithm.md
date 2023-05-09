# 算法简介

<br />

## 随机性算法

以下代码需要保证使用Go 1.20+，否则我们需要自己手动初始化随机数种子

### 生成随机密码

要求：

* 编写一个函数可以生成随机密码
* 函数第一个参数指定生成的密码位数
* 返回的密码至少包含一位【数字、小写字母、大写字母、特殊符号】

::: details 点击查看详情

```go
package main

import (
	"fmt"
	"math/rand"
	"strings"
)

// GenerateRandomPassword 生成随机密码, length必须 >=4
func GenerateRandomPassword(length int) (string, error) {
	if length < 4 {
		return "", fmt.Errorf("length must be greater than or equal to 4")
	}

	// 定义原始的数据源,a-z/A-Z等并没有动态生成是为了避免性能损耗
	const (
		number    = "0123456789"
		lowercase = "abcdefghijklmnopqrstuvwxyz"
		uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
		special   = "!@#$%^&*()_+{}[]|:<>?"
	)

	// 所有数据源组成一个切片,以备后用,这里其实可以玩出很多花样
	sourceSlice := []string{number, lowercase, uppercase, special}

	// 合并所有数据源,字符串拼接使用strings.Join也是为了提高性能
	chars := strings.Join(sourceSlice, "")

	// 定义密码,后面要填充字符,所以不能直接定义为不可变的字符串
	password := make([]byte, length)

	// 至少包含一位 数字、小写字母、大写字母、特殊符号
	/*
		若将代码展开类似与下面这样
		password[0] = number[rand.Intn(len(number))]
		password[1] = lowercase[rand.Intn(len(lowercase))]
		password[2] = uppercase[rand.Intn(len(uppercase))]
		password[3] = special[rand.Intn(len(special))]
	*/
	for i, source := range sourceSlice {
		password[i] = source[rand.Intn(len(source))]
	}

	// 填充剩余字符
	for i := len(sourceSlice); i < length; i++ {
		password[i] = chars[rand.Intn(len(chars))]
	}

	// 打乱排序
	rand.Shuffle(length, func(i, j int) {
		password[i], password[j] = password[j], password[i]
	})

	return string(password), nil
}

func main() {
	for i := 0; i < 10; i++ {
		password, err := GenerateRandomPassword(4)
		if err != nil {
			panic(err)
		}
		fmt.Println(password)
	}
}
```

输出结果

```bash
Qc*5
In6&
9z)M
xC$0
6|pD
!oV6
t4S%
Ft5&
_E6a
aJ5@
```

:::

<br />

### 生成随机概率

要求：

* 编写一个函数，返回布尔值
* 第一个参数代表 返回为真的概率有多少

::: details 点击查看详情

```go
package main

import (
	"fmt"
	"math/rand"
)

// ProbabilityTrue 指定为True的概率是多少并返回实际的布尔值
func ProbabilityTrue(percent float64) bool {
	if percent >= 100 {
		return true
	}
	if percent <= 0 {
		return false
	}
	// 生成一个1-100的随机数
	// 若小于等于指定的概率则返回true,否则返回false
	// 乘 1000 是为了避免浮点数精度问题可能带来的误差
	return (rand.Intn(100)+1)*1000 <= int(percent*1000)
}

func main() {
	// 简单测试
	//for i := 0; i < 10; i++ {
	//	fmt.Println(ProbabilityTrue(30))
	//}

	// 做一个大循环,然后统计ture和false出现的次数
	var trueCount, falseCount int
	for i := 0; i < 1000*10000; i++ {
		ret := ProbabilityTrue(50.9)
		if ret {
			trueCount++
		} else {
			falseCount++
		}
	}
	fmt.Printf("True : %d\n", trueCount)
	fmt.Printf("False: %d\n", falseCount)
}
```

输出结果

```bash
True : 5000389
False: 4999611
```

:::