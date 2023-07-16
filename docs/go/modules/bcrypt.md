# bcrypt

文档：[https://pkg.go.dev/golang.org/x/crypto/bcrypt](https://pkg.go.dev/golang.org/x/crypto/bcrypt)

## 简介

bcrypt是一种密码哈希函数，广泛用于加密和验证密码

bcrypt的主要目的是增加密码破解的成本，提供更高的密码安全性。它通过使用盐（salt）和可调节的迭代次数来实现这一目标

<br />

特点如下：

* 既不是对称加密也不是非对称加密算法，而是一种密码哈希函数
* 其计算成本可调节，这意味着可以通过增加计算时间来增强密码的安全性，以抵御暴力破解和彩虹表等攻击

<br />

加密步骤：

* 1、生成随机盐（salt）

  bcrypt会自动生成一个随机的盐值，用于每次密码加密过程

  盐是一个随机字符串，与密码一起存储在哈希值中，确保每个密码都有唯一的哈希结果

* 2、选择迭代次数

  迭代次数确定了计算密码哈希值的工作因子。它决定了计算哈希所需的时间和计算复杂度，因此也决定了破解密码的难度

  迭代次数越高，计算成本越大，破解密码的难度就越大

* 3、将密码和盐组合

  将用户输入的密码与生成的盐值进行组合，形成输入密码的明文

* 4、执行哈希函数

  使用bcrypt的哈希函数，对组合后的密码进行多次迭代的哈希计算

  每次迭代都会对密码进行加密，并生成一个新的哈希值，这个过程会重复进行多次，具体次数由选择的迭代次数决定

<br />

## 示例

::: details 点击查看详情

```go
package main

import (
	"fmt"
	"strings"

	"golang.org/x/crypto/bcrypt"
)

// Encrypt 加密
func Encrypt(password string, cost int) (string, error) {
	hashed, err := bcrypt.GenerateFromPassword([]byte(password), cost)
	if err != nil {
		return "", err
	}
	return string(hashed), nil
}

// ValidatePasswordHashed 验证
func ValidatePasswordHashed(hashed, password string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hashed), []byte(password))
	if err != nil {
		return false
	}
	return true
}
func main() {
	// 设置密码
	password := "qaz.123"
	fmt.Println("密码: ", password)

	// 执行加密
	hashed, err := Encrypt(password, bcrypt.DefaultCost)
	if err != nil {
		panic(err)
	}
	fmt.Println("密文: ", hashed)

	// 验证密文
	fmt.Println("验证: ", ValidatePasswordHashed(hashed, password))

	// 关于Cost
	fmt.Println()
	fmt.Printf("Cost取值范围: %d - %d (default: %d)\n", bcrypt.MinCost, bcrypt.MaxCost, bcrypt.DefaultCost)
	cost, _ := bcrypt.Cost([]byte(hashed))
	fmt.Printf("提取密文Cost: %d\n", cost)

	// 提取密文
	fmt.Println()
	hashedSlice := strings.Split(hashed, "$")
	fmt.Printf("提权密文算法标识符: %s\n", hashedSlice[1])
	fmt.Printf("提取密文随机盐的值: %s\n", hashedSlice[3][:22]) // 随机盐22位
}
```

输出结果

```bash
密码:  qaz.123
密文:  $2a$10$mLhxQszxfMW8felV.cdllep2etXEAc7W/OjMamti6nwH/DD4/GkXu
验证:  true

Cost取值范围: 4 - 31 (default: 10)        
提取密文Cost: 10                          
                                          
提权密文算法标识符: 2a                    
提取密文随机盐的值: mLhxQszxfMW8felV.cdlle
```

注意事项

* `cost`值（`GenerateFromPassword`函数的第二个参数）越大,加密速度越慢，同样解密速度也会变慢，一般建议使用默认值（`bcrypt.DefaultCost`）即可

  当加密用户登录密码时，避免因为`cost`过大导致加解密缓慢从而影响用户体验

* 对同一个密码多次进行加密会得到不同的密文，因为 随机盐 存储在了密文中

:::