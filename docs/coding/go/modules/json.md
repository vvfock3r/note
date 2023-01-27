# json

文档：[https://pkg.go.dev/encoding/json](https://pkg.go.dev/encoding/json)

<br />

## json vs jsoniter

`jsoniter`是一个第三方库,其特点是：快，更快

* 文档：[https://jsoniter.com/](https://jsoniter.com/)

* Github：[https://github.com/json-iterator/go](https://github.com/json-iterator/go)

**安装**

```bash
go get github.com/json-iterator/go
```

**简单性能测试**

看一下有没有传说中的神奇？这里只做一个极简单的测试

* OS：`Window 10`
* Go：`1.19`
* jsoniter：`v1.1.12`

::: details 点击查看详情

`main_test.go`

```go
package main

import (
	"encoding/json"
	"testing"

	jsoniter "github.com/json-iterator/go"
)

type ColorGroup struct {
	ID     int
	Name   string
	Colors []string
}

// 结构体
var groupStruct = ColorGroup{
	ID:     1,
	Name:   "Reds",
	Colors: []string{"Crimson", "Red", "Ruby", "Maroon"},
}

// Json字符串
var groupJson = []byte(`{"ID":1,"Name":"Reds","Colors":["Crimson","Red","Ruby","Maroon"]}`)

func BenchmarkJsoniterMarshal(b *testing.B) {
	for i := 0; i < b.N; i++ {
		_, err := jsoniter.Marshal(groupStruct)
		if err != nil {
			b.Error("Marshal error")
		}
	}
}

func BenchmarkJsoniterUnmarshal(b *testing.B) {
	for i := 0; i < b.N; i++ {
		g := new(ColorGroup)
		if err := jsoniter.Unmarshal(groupJson, g); err != nil {
			b.Error("Unmarshal error")
		}
	}
}

func BenchmarkJsonMarshal(b *testing.B) {
	for i := 0; i < b.N; i++ {
		_, err := json.Marshal(groupStruct)
		if err != nil {
			b.Error("Marshal error")
		}
	}
}

func BenchmarkJsonUnmarshal(b *testing.B) {
	for i := 0; i < b.N; i++ {
		g := new(ColorGroup)
		if err := json.Unmarshal(groupJson, g); err != nil {
			b.Error("Unmarshal error")
		}
	}
}
```

输出结果

```bash
D:\application\GoLand\demo>go test --bench .
goos: windows
goarch: amd64
pkg: demo
cpu: Intel(R) Core(TM) i7-4790K CPU @ 4.00GHz
BenchmarkJsoniterMarshal-8       3549688               340.4 ns/op
BenchmarkJsoniterUnmarshal-8     1790677               662.8 ns/op
BenchmarkJsonMarshal-8           2914536               384.1 ns/op
BenchmarkJsonUnmarshal-8          664804               1643  ns/op
PASS
ok      demo    6.336s
```

:::

<br />

## 示例

序列化：将Go对象转为JSO格式的数据

反序列化：将JSON格式的数据转为Go对象

Go对象最常用的就是`Struct`，也支持像`map[string]any`这种结构

::: details 点击查看详情

```go
package main

import (
	"encoding/json"
	"fmt"
)

type User struct {
	ID          int
	UserName    string
	NickName    string
	Sex         string
	Age         int
	Description string
	Hobbies     []string
	salary      string
}

func main() {
	// 准备数据
	user := User{
		ID:       1,
		UserName: "Bob",
		NickName: "鲍勃",
		Sex:      "man",
		Age:      18,
		Hobbies:  []string{"play", "play", "play"},
		salary:   "30k",
	}
	userJson := []byte(`{"ID":1,"UserName":"Bob","NickName":"鲍勃","Sex":"man","Age":18,"Description":"","Hobbies":["play","play","play"]}`)

	// 序列化：struct --> []byte
	{
		byteData, err := json.Marshal(user)
		if err != nil {
			panic(err)
		}
		fmt.Println(string(byteData))
	}
	{
		byteData, err := json.MarshalIndent(user, "", "    ") // 这里会格式化输出
		if err != nil {
			panic(err)
		}
		fmt.Println(string(byteData))
	}
	// 反序列化：[]byte --> struct
	{
		var user User
		if err := json.Unmarshal(userJson, &user); err != nil {
			panic(err)
		}
		fmt.Printf("%#v\n", user)
	}
}
```

输出结果

```bash
D:\application\GoLand\demo>go run main.go
{"ID":1,"UserName":"Bob","NickName":"鲍勃","Sex":"man","Age":18,"Description":"","Hobbies":["play","play","play"]}
{
    "ID": 1,
    "UserName": "Bob",
    "NickName": "鲍勃",
    "Sex": "man",
    "Age": 18,
    "Description": "",
    "Hobbies": [
        "play",
        "play",
        "play"
    ]
}
main.User{ID:1, UserName:"Bob", NickName:"鲍勃", Sex:"man", Age:18, Description:"", Hobbies:[]string{"play", "play", "play"}, salary:""}
```

注意事项

* 序列化时需要结构体为可导出字段，在这个例子中`salary`并没有被序列化

:::

<br />

## 使用Tag

::: details 点击查看详情

```go
package main

import (
	"encoding/json"
	"fmt"
)

type User struct {
	ID          int    `json:"id"`       // 序列化后json中会显示id，反序列化也一样
	UserName    string `json:"username"` // 序列化后json中会显示username，反序列化也一样
	NickName    string
	Sex         string
	Age         int
	Description string   `json:"description,omitempty"` // 序列化后json中会显示description，反序列化也一样；如果该字段没有显示传值，不显示零值，而是忽略这个字段
	Hobbies     []string // 键改名的位置也可以不传，就变成了这样： `json:",omitempty"`
	Salary string `json:"-"` // 序列化时忽略此字段， 如果改成 "-," 那么就是序列化后键为-，注意有没有逗号的区别
}

func main() {
	// 准备数据
	user := User{
		ID:       1,
		UserName: "Bob",
		NickName: "鲍勃",
		Sex:      "man",
		Age:      18,
		Hobbies:  []string{"play", "play", "play"},
		Salary:   "30k",
	}
	userJson := []byte(`{"id":1,"username":"Bob","NickName":"鲍勃","Sex":"man","Age":18,"Hobbies":["play","play","play"]}`)

	// 序列化：struct --> []byte
	{
		byteData, err := json.Marshal(user)
		if err != nil {
			panic(err)
		}
		fmt.Println(string(byteData))
	}
	{
		byteData, err := json.MarshalIndent(user, "", "    ") // 这里会格式化输出
		if err != nil {
			panic(err)
		}
		fmt.Println(string(byteData))
	}
	// 反序列化：[]byte --> struct
	{
		var user User
		if err := json.Unmarshal(userJson, &user); err != nil {
			panic(err)
		}
		fmt.Printf("%#v\n", user)
	}
}
```

输出结果

```bash
D:\application\GoLand\demo>go run main.go
{"id":1,"username":"Bob","NickName":"鲍勃","Sex":"man","Age":18,"Hobbies":["play","play","play"]}
{                                                                                                                              
    "id": 1,                                                                                                                     
    "username": "Bob",                                                                                                           
    "NickName": "鲍勃",                                                                                                           
    "Sex": "man",                                                                                                               
    "Age": 18,                                                                                                                   
    "Hobbies": [                                                                                                                 
        "play",                                                                                                                 
        "play",                                                                                                                 
        "play"                                                                                                                   
    ]                                                                                                                           
}                                                                                                                               
main.User{ID:1, UserName:"Bob", NickName:"鲍勃", Sex:"man", Age:18, Description:"", Hobbies:[]string{"play", "play", "play"}, Salary:""}
```

:::

<br />

## 默认编码类型

JSON 和 Go 类型不是一对一匹配的。下表描述了编码和解码时的类型关系

| Go类型                   | JSON类型  |
| ------------------------ | --------- |
| `bool`                   | `boolean` |
| `float64`                | `number`  |
| `string`                 | `string`  |
| `[]interface{}`          | `arrays`  |
| `map[string]interface{}` | `objects` |
| `nil`                    | `null`    |

序列化时很少会遇到错误，但反序列化往往会导致错误，下面我们来一一演示

::: details （1）错误示例：类型不匹配类报错：JSON为字符串类型的数字，Go为int

```go
package main

import (
	"encoding/json"
	"fmt"
)

type User struct {
	ID int `json:"id"`
}

func main() {
	// 准备数据，注意下面的1是字符串，而不是数字类型
	userJson := []byte(`{"id": "1"}`)

	// 反序列化
	var user User
	if err := json.Unmarshal(userJson, &user); err != nil {
		panic(err)
	}
	fmt.Printf("%#v\n", user)
}
```

输出结果

```bash
D:\application\GoLand\demo>go run main.go
panic: json: cannot unmarshal string into Go struct field User.id of type int
                                                                             
goroutine 1 [running]:                                                       
main.main()                                                                  
        D:/application/GoLand/demo/main.go:19 +0xdd                          
exit status 2
```

:::

::: details （2）错误示例：溢出类报错：JSON为数字256，Go为uint8类型

```go
package main

import (
	"encoding/json"
	"fmt"
)

type User struct {
	ID uint8 `json:"id"` // uint8范围为0-255
}

func main() {
	// 准备数据，注意下面
	userJson := []byte(`{"id": 256}`)

	// 反序列化
	var user User
	if err := json.Unmarshal(userJson, &user); err != nil {
		panic(err)
	}
	fmt.Println(user.ID)
}
```

输出结果

```bash
D:\application\GoLand\demo>go run main.go                                    
panic: json: cannot unmarshal number 256 into Go struct field User.id of type uint8
                                                                                   
goroutine 1 [running]:                                                             
main.main()                                                                        
        D:/application/GoLand/demo/main.go:19 +0xda                                
exit status 2
```

:::

::: details （3）注意null和nil

```go
package main

import (
	"encoding/json"
	"fmt"
)

type User struct {
	ID1 int  `json:"id1"`
	ID2 *int `json:"id2"`
}

func main() {
	// 准备数据
	userJson := []byte(`{"id1": null, "id2": null}`)

	// 反序列化
	var user User
	if err := json.Unmarshal(userJson, &user); err != nil {
		panic(err)
	}
	fmt.Println(user.ID1)
	fmt.Println(user.ID2)
}
```

输出结果

```bash
D:\application\GoLand\demo>go run main.go
0
<nil>
```

:::

<br />

## 自定义序列化和反序列化

::: details （1）我们先来研究一下time.Time是如何序列化和反序列化的

```go
package main

import (
	"encoding/json"
	"fmt"
	"time"
)

type User struct {
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt *time.Time
}

func GetTimePtr(t time.Time) *time.Time {
	return &t
}

func main() {
	// 准备数据
	userStruct := User{
		CreatedAt: time.Now().Add(time.Second * -2),
		UpdatedAt: time.Now().Add(time.Second * -1),
		DeletedAt: GetTimePtr(time.Now()),
	}

	// 序列化
	userJson, err := json.MarshalIndent(userStruct, "", "    ")
	if err != nil {
		panic(err)
	}
	fmt.Printf("序列化：\n%s\n", string(userJson))

	// 反序列化
	var user User
	if err := json.Unmarshal(userJson, &user); err != nil {
		panic(err)
	}
	fmt.Printf("\n反序列化：\n%#v\n", user)

	// time.Time
	fmt.Printf("\ntime.Time格式研究：\n")
	fmt.Println(time.Now().Format(time.RFC3339Nano)) // 序列化后的时间格式
	fmt.Println(user.CreatedAt)                      // 这个是结构体中存储的时间，也是反序列化后的时间
	fmt.Println(time.Now().Local())                  // 这个和上面一样
}
```

输出结果

```bash
D:\application\GoLand\demo>go run main.go
序列化：
{
    "CreatedAt": "2022-10-05T12:07:15.1143662+08:00",
    "UpdatedAt": "2022-10-05T12:07:16.1143662+08:00",
    "DeletedAt": "2022-10-05T12:07:17.1143662+08:00"
}

反序列化：
main.User{CreatedAt:time.Date(2022, time.October, 5, 12, 7, 15, 114366200, time.Local), UpdatedAt:time.Date(2022, time.October, 5, 12, 7, 16, 114366200, time.Local), DeletedAt:time.Date(2022, time.October, 5, 12, 7, 17, 114366200, t
ime.Local)}

time.Time格式研究：
2022-10-05T12:07:17.1244844+08:00
2022-10-05 12:07:15.1143662 +0800 CST
2022-10-05 12:07:17.1249966 +0800 CST
```

:::

::: details （2）重写序列化方法 1：直接给结构体写序列化方法

```go
package main

import (
	"encoding/json"
	"fmt"
	"time"
)

type User struct {
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt *time.Time
}

// 实现 json.Marshaler 接口
func (u User) MarshalJSON() ([]byte, error) {
	return []byte(`{"a":1,"b":"2"}`), nil
}

func GetTimePtr(t time.Time) *time.Time {
	return &t
}

func main() {
	// 准备数据
	userStruct := User{
		CreatedAt: time.Now().Add(time.Second * -2),
		UpdatedAt: time.Now().Add(time.Second * -1),
		DeletedAt: GetTimePtr(time.Now()),
	}

	// 序列化
	userJson, err := json.MarshalIndent(userStruct, "", "    ")
	if err != nil {
		panic(err)
	}
	fmt.Printf("序列化：\n%s\n", string(userJson))

	// 反序列化
	var user User
	if err := json.Unmarshal(userJson, &user); err != nil {
		panic(err)
	}
	fmt.Printf("\n反序列化：\n%#v\n", user)
	fmt.Println(user.CreatedAt)
}
```

输出结果

```bash
D:\application\GoLand\demo>go run main.go
序列化：    
{           
    "a": 1, 
    "b": "2"
}           

反序列化：
main.User{CreatedAt:time.Date(1, time.January, 1, 0, 0, 0, 0, time.UTC), UpdatedAt:time.Date(1, time.January, 1, 0, 0, 0, 0, time.UTC), DeletedAt:<nil>}
0001-01-01 00:00:00 +0000 UTC
```

说明

直接在结构体上重写序列化方法并不好，因为我们要兼顾所有的字段，更好的方法是仅修改time.Time序列化方式

:::

::: details （3）重写序列化方法2：为自定义类型编写序列化和反序列化方法

```go
package main

import (
	"encoding/json"
	"fmt"
	"strings"
	"time"
)

var (
	timeLayout = "2006-01-02 15:04:05 -0700 MST"
)

type User struct {
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt Time      `json:"updated_at"`
	DeletedAt *Time     `json:"deleted_at"`
}

type Time time.Time

// 序列化：实现 json.Marshaler 接口
// 注意事项：如果返回前的字符串不加双引号会报错：json: error calling MarshalJSON for type main.Time: invalid character '-' after top-level value
func (t Time) MarshalJSON() ([]byte, error) {
	s := time.Time(t).Format(timeLayout)
	//return []byte(s), nil
	return []byte(`"` + s + `"`), nil
}

// 反序列化：实现 json.Unmarshaler 接口
// 注意事项：(1)删除双引号 (2) 这里是指针方法
func (t *Time) UnmarshalJSON(data []byte) error {
	// 同样这里要删除字符串中的双引号，不然也会报错
	timeString := strings.ReplaceAll(string(data), `"`, "")

	// 解析为time.Time对象
	timeObj, err := time.ParseInLocation(timeLayout, timeString, time.Local)
	if err != nil {
		return err
	}

	// 转为Time对象并赋值
	*t = Time(timeObj)
	return nil
}

// 用于直接fmt.Println时的格式化输出
func (t Time) String() string {
	return time.Time(t).String()
}

// 用于Time内嵌到结构体，fmt.Println(结构体)时格式化输出
func (t Time) GoString() string {
	return time.Time(t).GoString()
}

// 获取指针
func GetTimePtr(t time.Time) *Time {
	newT := Time(t)
	return &newT
}

func main() {
	// 准备数据
	userStruct := User{
		CreatedAt: time.Now().Add(time.Second * -2),
		UpdatedAt: Time(time.Now().Add(time.Second * -1)),
		DeletedAt: GetTimePtr(time.Now()),
	}

	// 序列化
	fmt.Println("序列化：")
	userJson, err := json.MarshalIndent(userStruct, "", "    ")
	if err != nil {
		panic(err)
	}
	fmt.Printf("%s\n", string(userJson))

	// 反序列化
	fmt.Println("反序列化：")
	var user User
	if err := json.Unmarshal(userJson, &user); err != nil {
		panic(err)
	}
	fmt.Printf("%#v\n", user)
	fmt.Println(time.Time(user.CreatedAt))
	fmt.Println(time.Time(user.UpdatedAt))
	fmt.Println(time.Time(*user.DeletedAt))
}
```

输出结果

```bash
D:\application\GoLand\demo>go run main.go
序列化：
{
    "created_at": "2022-10-09T15:51:57.0971573+08:00",
    "updated_at": "2022-10-09 15:51:58 +0800 CST",
    "deleted_at": "2022-10-09 15:51:59 +0800 CST"
}
反序列化：
main.User{CreatedAt:time.Date(2022, time.October, 9, 15, 51, 57, 97157300, time.Local), UpdatedAt:time.Date(2022, time.October, 9, 15, 51, 58, 0, time.Local), DeletedAt:time.Date(2022, time.October, 9, 15, 51, 59, 0, time.Local)}
2022-10-09 15:51:57.0971573 +0800 CST
2022-10-09 15:51:58 +0800 CST
2022-10-09 15:51:59 +0800 CST
```

:::

<br />

## 流式序列化和反序列化

::: details （1）基础示例：将用户输入的JSON转为Go对象，并添加一个id字段，然后输出到标准输出

```go
package main

import (
	"encoding/json"
	"fmt"
	"io"
	"os"
)

func main() {
	var id int

	// 自定义解码器和编码器
	for {
		// 解码器（NewDecoder）：从输入中(这里是os.Stdint)读取数据，反序列化并存储到&v中
		v := map[string]any{}
		err := json.NewDecoder(os.Stdin).Decode(&v)

		// 输入完成：使用 echo {"id": 1} | go run main.go 这种格式时err会有io.EOF错误，代表输入已经结束
		// 这会在下一次for循环才会读取到这个错误，所以这里直接退出循环即可
		if err == io.EOF {
			fmt.Println("Complete!")
			break
		}

		// 反序列化错误
		if err != nil {
			fmt.Println("Decode Error: ", err)
			continue
		}

		// 添加一个id
        id++
		v["id"] = id
        
		// NewEncoder（编码器）：将&v的数据序列化为JSON并写入到输出中(这里是os.Stdout)
		if err := json.NewEncoder(os.Stdout).Encode(&v); err != nil {
			fmt.Println("Encode Error: ", err)
			continue
		}
	}
}
```

输出结果

```bash
# 交互式输入
D:\application\GoLand\demo>go run main.go
{}									# => 用户输入
{"id":1}
{"name": "bob"} 					# => 用户输入
{"id":2,"name":"bob"}
{"name": "bob", "sex": "man"} 		# => 用户输入
{"id":3,"name":"bob","sex":"man"}
Complete!
exit status 0xc000013a

# 使用管道输入
D:\application\GoLand\demo>echo {"name": "bob"} | go run main.go 
{"id":1,"name":"bob"}
Complete!

# 错误用法示例
D:\application\GoLand\demo>go run main.go                        
a			   # => 用户输入
Decode Error:  invalid character 'a' looking for beginning of value
{a: 1} 		   # => 用户输入
Decode Error:  invalid character 'a' looking for beginning of object key string
"{"a": 1}"	   # => 用户输入
Decode Error:  json: cannot unmarshal string into Go value of type map[string]interface {}
Complete!
```

可以看到，我们的程序可以正确执行，但是仍然有很大的改善空间

* 所输入的JSON不能包含双引号，兼容性不够好
* 输出时不能格式化输出

:::

::: details （2）改善程序

```go
package main

import (
	"bufio"
	"encoding/json"
	"fmt"
	"io"
	"os"
	"strings"
)

func main() {
	id := 0

	// 自定义解码器和编码器
	for {
		// 从标准输入读取输入，按行读取
		reader := bufio.NewReader(os.Stdin)
		data, err := reader.ReadString('\n')
		if err == io.EOF {
			fmt.Println("Read Complete!")
			break
		}
		if err != nil {
			fmt.Println("Read Error: ", err)
		}

		// 删除输入中行首和行尾的双引号和单引号
		// 注意：因为不知道行首是单引号还是双引号，所以需要将他们写两次
		for _, v := range []string{`"`, `'`, `"`, `'`} {
			data = strings.Trim(data, v)
		}

		// 反序列化
		v := map[string]any{}
		err = json.NewDecoder(strings.NewReader(data)).Decode(&v)

		if err == io.EOF {
			fmt.Println("Decoder Complete!")
			break
		}

		// 反序列化错误
		if err != nil {
			fmt.Println("Decode Error: ", err)
			continue
		}

		// 添加一个id
		id++
		v["id"] = id

		// 序列化，并格式化输出
		encoder := json.NewEncoder(os.Stdout)
		encoder.SetIndent("", "    ")
		if err := encoder.Encode(&v); err != nil {
			fmt.Println("Encode Error: ", err)
			continue
		}

	}
}
```

输出结果

```bash
# 测试1
D:\application\GoLand\demo>echo '{"name": "bob"}' | go run main.go   
{                
    "id": 1,     
    "name": "bob"
}                
Read Complete!

D:\application\GoLand\demo>echo "{"name": "bob"}" | go run main.go 
{                
    "id": 1,     
    "name": "bob"
}                
Read Complete!

D:\application\GoLand\demo>echo {"name": "bob"} | go run main.go   
{                
    "id": 1,     
    "name": "bob"
}                
Read Complete!

# 测试2
D:\application\GoLand\demo>go run main.go
{}
{          
    "id": 1
}          
"{}" 
{          
    "id": 2
}          
"{"name": "bob"}" 
{                
    "id": 3,     
    "name": "bob"
}                
Read Complete!
```

说明

我们是按照行来读取的，这对于像已经格式化好的JSON，我们是无法读取的，此时可以迂回解决

```bash
# 先把所有的换行符去掉，然后最后加一个换行符，这就等同于将JSON压缩为1行，当然了还包括一下空白，不用去管它
[root@ap-hongkang ~]# cat test.json | tr -d '\n' | sed -r 's/(.*)/\1\n/' | go run main.go
```

`test.json`

```json
{
  "__inputs": [],
  "__elements": {},
  "__requires": [
    {
      "type": "panel",
      "id": "gauge",
      "name": "Gauge",
      "version": ""
    },
    {
      "type": "grafana",
      "id": "grafana",
      "name": "Grafana",
      "version": "9.1.6"
    },
    {
      "type": "panel",
      "id": "graph",
      "name": "Graph (old)",
      "version": ""
    },
    {
      "type": "datasource",
      "id": "prometheus",
      "name": "Prometheus",
      "version": "1.0.0"
    }
  ],
  "annotations": {
    "list": [
      {
        "builtIn": 1,
        "datasource": {
          "type": "grafana",
          "uid": "-- Grafana --"
        },
        "enable": true,
        "hide": true,
        "iconColor": "rgba(0, 211, 255, 1)",
        "name": "Annotations & Alerts",
        "target": {
          "limit": 100,
          "matchAny": false,
          "tags": [],
          "type": "dashboard"
        },
        "type": "dashboard"
      }
    ]
  }
}
```

:::