# 算法简介

<br />

## 生成随机密码

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