# validator

Github：[https://github.com/go-playground/validator](https://github.com/go-playground/validator)

文档：[https://pkg.go.dev/github.com/go-playground/validator](https://pkg.go.dev/github.com/go-playground/validator)

## 安装

```bash
go get github.com/go-playground/validator/v10
```

<br />

## 数据类型

### 验证变量

::: details 点击查看详情

```go
package main

import (
	"fmt"

	"github.com/go-playground/validator/v10"
)

func main() {
	// 实例化validator对象
	validate := validator.New()

	// validate.Var：验证单个变量
	{
		// 定义变量
		password := "123456"

		// 验证password是否符合规范
		// (1) 多个tag使用逗号连接，并且不能有空格,会panic
		err := validate.Var(password, "required,min=8")
		if err != nil {
			fmt.Println(err)
		}
	}

	// validate.VarWithValue：验证两个变量之间的关系
	{
		s1 := "abcd"
		s2 := "abce"
		err := validate.VarWithValue(s1, s2, "eqcsfield") // eqcsfield这个tag的意思是：s1是否等于s2
		if err != nil {
			fmt.Println(err)
		}
	}

	// 其他
	// validate.Var内部调用的是 validate.VarCtx
	// validate.VarWithValue内部调用的是 validate.VarWithValueCtx
}
```

输出结果

```bash
D:\application\GoLand\demo>go run main.go
Key: '' Error:Field validation for '' failed on the 'min' tag
Key: '' Error:Field validation for '' failed on the 'eqcsfield' tag
```

:::

<br />

### 验证结构体

::: details 点击查看详情

```go
package main

import (
	"fmt"

	"github.com/go-playground/validator/v10"
)

type person struct {
	Name                string `validate:"required,min=4,max=15"`
	Email               string `validate:"required,email"`
	Age                 int    `validate:"required,numeric,min=18"`
	DriverLicenseNumber string `validate:"omitempty,len=12,numeric"`
}

func main() {
	// 实例化validator对象
	validate := validator.New()

	// 创建一个person对象
	p := person{
		Name:                "Bob",
		Email:               "test@example.com",
		Age:                 0,
		DriverLicenseNumber: "",
	}

	// validate.Struct：对结构体进行验证，需要满足以下几点才会进行验证
	// 1) 要求字段必须是可导出的
	// 2) 要求带有validate标签
	// 3) 要求没有忽略验证此字段，即 `validate: "-"` 会忽略验证
	{
		// 验证
		fmt.Printf("validate.Struct:\n")
		err := validate.Struct(p)
		if err != nil {
			fmt.Println(err)
		}
	}

	// validate.StructExcept: 忽略某些字段
	{
		fmt.Printf("\nvalidate.StructExcept:\n")
		err := validate.StructExcept(p, "Age")
		if err != nil {
			fmt.Println(err)
		}
	}

	// validate.StructPartial: 只验证某些字段
	{
		fmt.Printf("\nvalidate.StructPartial:\n")
		err := validate.StructPartial(p, "Name")
		if err != nil {
			fmt.Println(err)
		}
	}

	// validate.StructFiltered: 使用自定义函数过滤需要排除哪些字段，返回true时排除该字段，返回false会验证该字段
	{
		fmt.Printf("\nvalidate.StructFiltered:\n")
		err := validate.StructFiltered(p, func(ns []byte) bool {
			if string(ns) == "person.Age" { // 对Age字段不验证
				return true
			}
			return false // 其他字段默认会验证
		})
		if err != nil {
			fmt.Println(err)
		}
	}

	// 其他
	// 以上函数内部均使用的是 xxCtx，我们也可以自己调用
}
```

输出结果

```bash
D:\application\GoLand\demo>go run main.go
validate.Struct:
Key: 'person.Name' Error:Field validation for 'Name' failed on the 'min' tag   
Key: 'person.Age' Error:Field validation for 'Age' failed on the 'required' tag
                                                                               
validate.StructExcept:                                                         
Key: 'person.Name' Error:Field validation for 'Name' failed on the 'min' tag   
                                                                               
validate.StructPartial:                                                        
Key: 'person.Name' Error:Field validation for 'Name' failed on the 'min' tag   
                                                                               
validate.StructFiltered:                                                       
Key: 'person.Name' Error:Field validation for 'Name' failed on the 'min' tag
```

:::

<br />

## 关于错误

### 错误类型

* 如果是 **标签写法类** 等错误，那么`validator`会直接 `panic`
* 如果是 **函数用法类** 等错误，那么`validator`会返回 `InvalidValidationError`
* 如果是 **校验失败类** 等错误，那么`validator`会返回 `ValidationErrors`

::: details 标签写法有错时产生panic

```go
package main

import (
	"fmt"

	"github.com/go-playground/validator/v10"
)

func main() {
	// 实例化validator对象
	validate := validator.New()

	// 定义变量
	password := "123456"

	// 验证password是否符合规范, 我们可以故意写错标签，以使validator产生panic
	// 1) 标签之间的逗号后面加个空格
	// 2) 写一个不支持的标签，比如 required1
	err := validate.Var(password, "required1,min=8")
	if err != nil {
		fmt.Println(err)
	}
}
```

:::

::: details 函数使用错误返回InvalidValidationError

```go
package main

import (
	"fmt"

	"github.com/go-playground/validator/v10"
)

type person struct {
	Name                string `validate:"required,min=4,max=15"`
	Email               string `validate:"required,email"`
	Age                 int    `validate:"required,numeric,min=18"`
	DriverLicenseNumber string `validate:"omitempty,len=12,numeric"`
}

// 创建一个person对象
var p = person{
	Name:                "Bob",
	Email:               "test@example.com",
	Age:                 0,
	DriverLicenseNumber: "",
}

func main() {
	// 实例化validator对象
	validate := validator.New()

	// 对结构体进行验证，但是却传了一个nil
	{
		err := validate.Struct(nil)
		if err != nil {
			fmt.Printf("%T\n", err)
		}
	}

	// 对结构体进行验证，但是却传了一个字符串
	{
		err := validate.Struct("haha")
		if err != nil {
			fmt.Printf("%T\n", err)
		}
	}
}
```

输出结果

```bash
D:\application\GoLand\demo>go run main.go
*validator.InvalidValidationError
*validator.InvalidValidationError
```

:::

::: details 校验失败返回ValidationErrors

```go
package main

import (
	"fmt"

	"github.com/go-playground/validator/v10"
)

type person struct {
	Name                string `validate:"required,min=4,max=15"`
	Email               string `validate:"required,email"`
	Age                 int    `validate:"required,numeric,min=18"`
	DriverLicenseNumber string `validate:"omitempty,len=12,numeric"`
}

func main() {
	// 实例化validator对象
	validate := validator.New()

	// 创建一个person对象
	var p = person{
		Name:                "Bob",
		Email:               "test@example.com",
		Age:                 0,
		DriverLicenseNumber: "",
	}

	// 对结构体进行验证
	err := validate.Struct(p)

	// 检查错误
	if err != nil {
		// 输出错误类型
		fmt.Printf("%T\n", err)
		fmt.Printf("%+v\n\n", err)

		// InvalidValidationError，一般是函数用法不对等
		if _, ok := err.(*validator.InvalidValidationError); ok {
			fmt.Println(err)
		}

		// err包含以下3个值：
		//   nil
		//   InvalidValidationError
		//   ValidationErrors
		// 前两个我们都处理了，所以这里留下来的错误只能是ValidationErrors
		// ValidationErrors，一般是真的验证失败了，通过断言我们可以获取到一些详情
		errs := err.(validator.ValidationErrors)
		for _, err := range errs {
			fmt.Println("Namespace      : ", err.Namespace())
			fmt.Println("Field          : ", err.Field())
			fmt.Println("StructNamespace: ", err.StructNamespace())
			fmt.Println("StructField    : ", err.StructField())
			fmt.Println("Tag            : ", err.Tag())
			fmt.Println("ActualTag      : ", err.ActualTag())
			fmt.Println("Kind           : ", err.Kind())
			fmt.Println("Type           : ", err.Type())
			fmt.Println("Value          : ", err.Value())
			fmt.Println("Param          : ", err.Param())
			fmt.Println()
		}
	}
}
```

输出结果

```bash
D:\application\GoLand\demo>go run main.go
validator.ValidationErrors
Key: 'person.Name' Error:Field validation for 'Name' failed on the 'min' tag   
Key: 'person.Age' Error:Field validation for 'Age' failed on the 'required' tag
                                                                               
Namespace      :  person.Name                                                  
Field          :  Name                                                         
StructNamespace:  person.Name                                                  
StructField    :  Name                                                         
Tag            :  min                                                          
ActualTag      :  min                                                          
Kind           :  string                                                       
Type           :  string                                                       
Value          :  Bob                                                          
Param          :  4                                                            
                                                                               
Namespace      :  person.Age                                                   
Field          :  Age                                                          
StructNamespace:  person.Age                                                   
StructField    :  Age                                                          
Tag            :  required                                                     
ActualTag      :  required                                                     
Kind           :  int                                                          
Type           :  int                                                          
Value          :  0                                                            
Param          :    
```

:::

<br />

### 自定义错误信息

::: details 先创建一个文件，用于编写错误翻译函数

`validator.go`

```go
package main

import "github.com/go-playground/validator/v10"

// ValidatorEntry 错误条目
type ValidatorEntry map[string]string

// ValidatorTranslate 错误翻译器
func ValidatorTranslate(e error, f func() map[string]string) []ValidatorEntry {
	// 检查nil值
	if e == nil {
		return []ValidatorEntry{}
	}

	// 初始化
	field := "Field"       // 字段名
	message := "Message"   // 消息主体名
	m := f()               // 映射
	var s []ValidatorEntry // 返回值

	// InvalidValidationError 一般是函数用法不对,比如 validate.Struct(nil)
	if _, ok := e.(*validator.InvalidValidationError); ok {
		if v, ok := m["InvalidValidationError"]; ok {
			s = append(s, ValidatorEntry{field: "InvalidValidationError", message: v})
		} else {
			s = append(s, ValidatorEntry{field: "InvalidValidationError", message: e.Error()})
		}
		return s
	}

	// ValidationErrors，一般是真的验证失败了，通过断言我们可以获取到一些详情
	if errs, ok := e.(validator.ValidationErrors); ok {
		for _, err := range errs {
			key := err.Field() + "." + err.Tag()
			if v, ok := m[key]; ok {
				s = append(s, ValidatorEntry{field: err.Field(), message: v})
			} else {
				s = append(s, ValidatorEntry{field: err.Field(), message: err.Error()})
			}
		}
		return s
	}
	return []ValidatorEntry{{field: "UnknownValidationError", message: e.Error()}}
}
```

:::

::: details （1）普通结构体测试

```go
package main

import (
	"encoding/json"
	"fmt"

	"github.com/go-playground/validator/v10"
)

// 定义结构体
type person struct {
	Name                string `validate:"required,min=4,max=15"`
	Email               string `validate:"required,email"`
	Age                 int    `validate:"required,numeric,min=18"`
	DriverLicenseNumber string `validate:"omitempty,len=12,numeric"`
}

// Validator 定义翻译接口，可以定义为结构体方法，也可以单独定义一个方法
func (p person) Validator() map[string]string {
	return map[string]string{
		"InvalidValidationError": "验证参数无效",
		"Name.required":          "用户名为必填项",
		"Name.min":               "用户名最少4个字符",
		"Name.max":               "用户名最多15个字符",
		"Age.required":           "年龄为必填项",
	}
}

func main() {
	// 创建一个person对象
	var p = person{
		Name:                "Bob",
		Email:               "test#example.com",
		Age:                 0,
		DriverLicenseNumber: "",
	}

	// 实例化validator对象
	validate := validator.New()

	// 对结构体进行验证
	err := validate.Struct(p)

	// 翻译错误，返回一个map切片
	errMessage := ValidatorTranslate(err, p.Validator)

	// 格式化输出
	msg, err := json.MarshalIndent(errMessage, "", "    ")
	if err != nil {
		panic(err)
	}
	fmt.Println(string(msg))
}
```

输出结果

```bash
D:\application\GoLand\demo>go run .
[
    {
        "Field": "Name",
        "Message": "用户名最少4个字符"
    },
    {
        "Field": "Email",
        "Message": "Key: 'person.Email' Error:Field validation for 'Email' failed on the 'email' tag"
    },
    {
        "Field": "Age",
        "Message": "年龄为必填项"
    }
]
```

:::

::: details （2）Gin参数绑定测试

```go
package main

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

// 定义结构体,注意需要将 validate 修改为 binding
type person struct {
	Name                string `json:"name" binding:"required,min=4,max=15"`
	Email               string `json:"email" binding:"required,email"`
	Age                 int    `json:"age" binding:"required,numeric,min=18"`
	DriverLicenseNumber string `json:"driverLicenseNumber" binding:"omitempty,len=12,numeric"`
}

// Validator 定义翻译接口，可以定义为结构体方法，也可以单独定义一个方法
func (p person) Validator() map[string]string {
	return map[string]string{
		"InvalidValidationError": "验证参数无效",
		"Name.required":          "用户名为必填项",
		"Name.min":               "用户名最少4个字符",
		"Name.max":               "用户名最多15个字符",
		"Age.required":           "年龄为必填项",
	}
}

func main() {
	r := gin.Default()
	r.POST("/", func(c *gin.Context) {
		// Gin参数绑定
		var p person
		err := c.ShouldBind(&p)

		// 翻译错误，返回一个map切片
		errMessage := ValidatorTranslate(err, p.Validator)

		// 返回响应
		c.JSON(http.StatusOK, errMessage)
	})
	log.Fatalln(r.Run("0.0.0.0:6666"))
}
```

输出结果

![image-20221018165811618](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20221018165811618.png)

![image-20221018165918108](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20221018165918108.png)

:::

<br />

## 各类验证

### 字段验证

文档：[https://github.com/go-playground/validator#fields](https://github.com/go-playground/validator#fields)

**字段**

| 标签       | 描述                             |
| ---------- | -------------------------------- |
| eqcsfield  | 要求字段等于另一个字段           |
| eqfield    | 要求字段等于另一个字段           |
|            |                                  |
| gtcsfield  | 要求字段值大于另一个字段值       |
| gtfield    | 要求字段值大于另一个字段值       |
|            |                                  |
| gtecsfield | 要求字段值大于或等于另一个字段值 |
| gtefield   | 要求字段值大于或等于另一个字段值 |
|            |                                  |
| ltcsfield  | 要求字段值小于另一个字段值       |
| ltfield    | 要求字段值小于另一个字段值       |
|            |                                  |
| ltecsfield | 要求字段值小于或等于另一个字段值 |
| ltefield   | 要求字段值小于或等于另一个字段值 |
|            |                                  |
| necsfield  | 要求字段值不等于另一个字段值     |
| nefield    | 要求字段值不等于另一个字段值     |

**说明**

* 标签组成：比较符号 + 是否跨Struct(cross struct) + field
* 测试时发现，即使使用不带`cs`的也可以跨结构体验证，不知道是理解的不对还是用法不对？

**适用场景举例**

* 用户修改密码时确认两次密码输入一致

::: details 点击查看详情

```go
package main

import (
	"fmt"

	"github.com/go-playground/validator/v10"
)

type User struct {
	Name            string `validate:"eqcsfield=UserInfo.ChineseName"`
	Password        string `validate:"eqfield=ConfirmPassword"`
	ConfirmPassword string
	UserInfo
}

type UserInfo struct {
	ChineseName string
	EnglishName string
}

func main() {
	// 实例化validator对象
	validate := validator.New()

	// 创建对象
	userInfo := UserInfo{
		ChineseName: "李四",
		EnglishName: "Bob",
	}
	user := User{
		Name:            "张三",
		Password:        "123456",
		ConfirmPassword: "1234567",
		UserInfo:        userInfo,
	}

	// 验证
	err := validate.Struct(user)
	if err != nil {
		fmt.Println(err)
	}
}
```

输出结果

```bash
D:\application\GoLand\demo>go run main.go
Key: 'User.Name' Error:Field validation for 'Name' failed on the 'eqcsfield' tag      
Key: 'User.Password' Error:Field validation for 'Password' failed on the 'eqfield' tag
```

:::

<br />

### 更多验证

字段太多了，这里只举几个例子

::: details 点击查看详情

```go
package main

import (
	"fmt"

	"github.com/go-playground/validator/v10"
)

func main() {
	// 实例化validator对象
	validate := validator.New()

	// cidr
	fmt.Println("01) ", validate.Var("192.168.0.1", "cidr"))
	fmt.Println("02) ", validate.Var("192.168.0.1/24", "cidr"))

	// datauri
	imageBase64 := "data:image/png;base64,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"
	fmt.Println("03) ", validate.Var(imageBase64, "datauri"))

	// fqdn: 全限定域名，即同时带有主机名和域名的名称
	fmt.Println("04) ", validate.Var("jinhui.dev", "fqdn"))

	// hostname
	fmt.Println("05) ", validate.Var("jinhui.dev", "hostname"))
	fmt.Println("06) ", validate.Var("jinhui.dev", "hostname_rfc1123"))
	fmt.Println("07) ", validate.Var("jinhui.dev:80", "hostname_port"))
}
```

输出结果

```bash
D:\application\GoLand\demo>go run main.go
01)  Key: '' Error:Field validation for '' failed on the 'cidr' tag
02)  <nil>
03)  <nil>
04)  <nil>
05)  <nil>
06)  <nil>
07)  <nil>
```

:::

<br />

### 特殊符号说明

* `,`：用于隔开多个验证标记，多个验证标记需要都满足才算验证成功，请注意逗号后面不能有空格
* `-`：用于跳过该字段，不进行验证
* `|`：用于多个验证标记，但是只需满足其中一个即可

<br />

### 常用验证标记

待补充

<br />

## 注册自定义函数

### 自定义验证失败时结构体字段名称

::: details （1）普通结构体使用示例

```go
package main

import (
	"fmt"
	"reflect"
	"strings"

	"github.com/go-playground/validator/v10"
)

type User struct {
	FirstName string `validate:"max=1" json:"firstName" `
	LastName  string `validate:"max=1"`
	Age       uint8
}

func main() {
	// 实例化User对象
	user := User{
		FirstName: "龙城",
		LastName:  "慕容",
	}

	// 实例化validator对象
	validate := validator.New()

	// 在校验发生错误时，修改错误中的Tag名称
	// 下面的代码会使用json的值代替默认的结构体字段名称，若未定义json则继续使用原字段名称
	validate.RegisterTagNameFunc(func(field reflect.StructField) string {
		name := strings.SplitN(field.Tag.Get("json"), ",", 2)[0]
		if name == "" {
			return field.Name
		}
		return name
	})

	// 验证
	fmt.Println(validate.Struct(user))
}
```

输出结果

```bash
D:\application\GoLand\demo>go run main.go
Key: 'User.firstName' Error:Field validation for 'firstName' failed on the 'max' tag  # 注意这里是firstName而不是FirstName
Key: 'User.LastName' Error:Field validation for 'LastName' failed on the 'max' tag
```

:::

::: details （2）Gin注册使用示例

参考：[https://gin-gonic.com/docs/examples/custom-validators/](https://gin-gonic.com/docs/examples/custom-validators/)

```go
package main

import (
	"log"
	"net/http"
	"reflect"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"github.com/go-playground/validator/v10"
)

// 定义结构体,注意需要将 validate 修改为 binding
type person struct {
	Name                string `json:"name" binding:"required,min=4,max=15"`
	Email               string `json:"email" binding:"required,email"`
	Age                 int    `json:"age" binding:"required,numeric,min=18"`
	DriverLicenseNumber string `json:"driverLicenseNumber" binding:"omitempty,len=12,numeric"`
}

// Validator 定义翻译接口，可以定义为结构体方法，也可以单独定义一个方法
// 原先的字段名称Name修改未json定义的name和age
func (p person) Validator() map[string]string {
	return map[string]string{
		"InvalidValidationError": "验证参数无效",
		"name.required":          "用户名为必填项",
		"name.min":               "用户名最少4个字符",
		"name.max":               "用户名最多15个字符",
		"age.required":           "年龄为必填项",
	}
}

func main() {
	// Gin初始化
	r := gin.Default()

	// 自定义验证失败时结构体字段名称
	if v, ok := binding.Validator.Engine().(*validator.Validate); ok {
		v.RegisterTagNameFunc(func(field reflect.StructField) string {
			name := strings.SplitN(field.Tag.Get("json"), ",", 2)[0]
			if name == "" {
				return field.Name
			}
			return name
		})
	}

	r.POST("/", func(c *gin.Context) {
		// Gin参数绑定
		var p person
		err := c.ShouldBind(&p)

		// 翻译错误，返回一个map切片
		errMessage := ValidatorTranslate(err, p.Validator)

		// 返回响应
		c.JSON(http.StatusOK, errMessage)
	})
	log.Fatalln(r.Run("0.0.0.0:6666"))
}
```

输出结果

![image-20221019193400519](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20221019193400519.png)

:::

<br />

### 自定义验证标记

这里仿照`min`的效果来写一个`min2`

::: details 点击查看详情

```go
package main

import (
	"fmt"
	"strconv"

	"github.com/go-playground/validator/v10"
)

type User struct {
	Name string `validate:"min2=4"`
	Age  uint8  `validate:"min2=4"`
}

func main() {
	// 实例化User对象
	user := User{
		Name: "bob",
		Age:  3,
	}

	// 实例化validator对象
	validate := validator.New()

	// 自定义验证标记, 返回值true代表验证通过，false代表验证未通过
	min2 := func(fl validator.FieldLevel) bool {
		// 获取标记名：       fl.GetTag()
		// 获取标记值：       fl.Param()
		// 获取结构体字段名：  fl.FieldName()
		// 获取结构体字段类型：fl.Field().Type()
		// 获取结构体字段值：  fl.Field().Interface()

		// 获取标记值，并转为uint64类型
		tagValue, err := strconv.ParseUint(fl.Param(), 10, 64)
		if err != nil {
			return false
		}

		// 定义字段长度
		// 1) 验证标记 若只需要 支持一种数据类型，直接断言即可
		// 2) 我们这里使用查询来让它支持多种基础类型, 不能直接写成 case int, int8,后面使用uint64(v)会报错
		var fieldValueOrLength uint64
		switch v := fl.Field().Interface().(type) {
		case string:
			fieldValueOrLength = uint64(len(v))
		case int:
			fieldValueOrLength = uint64(v)
		case int8:
			fieldValueOrLength = uint64(v)
		case int16:
			fieldValueOrLength = uint64(v)
		case int32:
			fieldValueOrLength = uint64(v)
		case int64:
			fieldValueOrLength = uint64(v)
		case uint:
			fieldValueOrLength = uint64(v)
		case uint8:
			fieldValueOrLength = uint64(v)
		case uint16:
			fieldValueOrLength = uint64(v)
		case uint32:
			fieldValueOrLength = uint64(v)
		default:
			return false // 不支持的类型
		}

		// 字段长度满足标记最小长度返回true,否则返回false
		return fieldValueOrLength >= tagValue
	}
    
    // 注册自定义验证标记
	err := validate.RegisterValidation("min2", min2)
	if err != nil {
		panic(err)
	}

	// 验证
	fmt.Println(validate.Struct(user))
}
```

输出结果

```bash
D:\application\GoLand\demo>go run main.go
Key: 'User.Name' Error:Field validation for 'Name' failed on the 'min2' tag
Key: 'User.Age' Error:Field validation for 'Age' failed on the 'min2' tag
```

:::