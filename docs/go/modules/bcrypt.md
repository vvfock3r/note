## bcrypt

文档：[https://pkg.go.dev/golang.org/x/crypto/bcrypt](https://pkg.go.dev/golang.org/x/crypto/bcrypt)

::: details 点击查看详情

```go
package main

import (
	"fmt"
	"strings"

	"golang.org/x/crypto/bcrypt"
)

// 加密
func Encrypt(password string) (string, error) {
	//hashed, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	hashed, err := bcrypt.GenerateFromPassword([]byte(password), 11)
	if err != nil {
		return "", err
	}
	return string(hashed), nil
}

// 验证
func ValidatePasswordHashed(hashed, password string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hashed), []byte(password))
	if err != nil {
		return false
	}
	return true
}
func main() {
	// 加密和验证
	// 密码
	password := "qaz.123"
	fmt.Println("密码: ", password)

	// 加密
	hashed, err := Encrypt(password)
	if err != nil {
		panic(err)
	}
	fmt.Println("密文: ", hashed)

	// 验证密文
	fmt.Println("验证: ", ValidatePasswordHashed(hashed, password))

	// ----------------------------------------------------------------------------------------------------------------

	// 关于Cost
	fmt.Println()
	fmt.Printf("Cost取值范围: %d - %d (default: %d)\n", bcrypt.MinCost, bcrypt.MaxCost, bcrypt.DefaultCost)
	cost, err := bcrypt.Cost([]byte(hashed))
	fmt.Printf("提取密文Cost: %d\n", cost)

	// ----------------------------------------------------------------------------------------------------------------
	fmt.Println()
	hashedSlice := strings.Split(hashed, "$")
	fmt.Printf("提权密文算法标识符: %s\n", hashedSlice[1])
	fmt.Printf("提取密文随机盐的值: %s\n", hashedSlice[3][:22]) // 随机盐22位

}
```

输出结果

```bash
D:\application\GoLand\demo>go run main.go
密码:  qaz.123
密文:  $2a$11$4u1Pil6uElumGXdICycN/.jhUmK4iatfUi8VwSO9fbgA0WxwgMTd2
验证:  true

Cost取值范围: 4 - 31 (default: 10)
提取密文Cost: 11

提权密文算法标识符: 2a
提取密文随机盐的值: 4u1Pil6uElumGXdICycN/.
```

注意事项

* `cost`值（`GenerateFromPassword`函数的第二个参数）越大,加密速度越慢，同样解密速度也会变慢，一般建议使用默认值（`bcrypt.DefaultCost`）即可

  当加密用户登录密码时，避免因为`cost`过大导致加解密缓慢从而影响用户体验

* 对同一个密码多次进行加密会得到不同的密文，因为 随机盐 存储在了密文中

:::