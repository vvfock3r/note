# template

<br />

## 文档

text template：[https://pkg.go.dev/text/template](https://pkg.go.dev/text/template) 

html template：[https://pkg.go.dev/html/template](https://pkg.go.dev/html/template) 

<br />

## 说明

**基础知识**

* text template用于处理任意格式的文本
* html template用于生成可防止代码注入的 HTML 输出
* 模板文件的后缀通常是`.tmpl`和`.tpl`(也可以使用其他的后缀)，必须使用`UTF-8`编码
* 模板文件中使用`{{}}`来包裹和表示需要传入的数据
* 传给模板的数据可以通过点号`.`来访问。如果是符合类型的数据，则可以通过`{{.FieldName}}`来访问它的字段
* 除`{{}}`包裹外，其他的内容均不做任何处理，原样输出

**使用步骤**

* 定义模板，可以是字符串形式，也可以是文件形式
* 解析模板
* 渲染模板

<br />

## 基础示例

::: details （1）字符串模板

```go
package main

import (
	"os"
	"text/template"
)

func main() {
	// 定义字符串模板
	msg := "Hello {{ . }}"

	// 解析字符串模板
	tpl, err := template.New("hello").Parse(msg)
	if err != nil {
		panic(err)
	}

	// 提供数据，渲染模板，并输出到标准输出
	data := "world!"
	err = tpl.Execute(os.Stdout, data)
	if err != nil {
		panic(err)
	}
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
Hello world!
```

:::

::: details （2）文件模板：解析单文件

`template/hello.tpl`

```
Hello  {{ . }}
```

`main.go`

```go
package main

import (
	"os"
	"text/template"
)

func main() {
	// 错误写法: 解析文件模板
	// 报错描述: template: hello: "hello" is an incomplete or empty template
	// 报错分析：代码分开写也不行; 未知原因
	//tpl, err := template.New("hello").ParseFiles("template/hello.tpl")
	//if err != nil {
	//	panic(err)
	//}

	// 正确的写法：解析文件模板
	tpl, err := template.ParseFiles("template/hello.tpl")
	if err != nil {
		panic(err)
	}

	// 提供数据，渲染模板
	data := "world!"
	err = tpl.Execute(os.Stdout, data)
	if err != nil {
		panic(err)
	}
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
Hello world!
```

:::

::: details （3）文件模板：解析多文件

`template/hello.tpl`

```
Hello  {{ . }}
```

`template/hello2.tpl`

```
Hello2  {{ . }}
```

`main.go`

```go
package main

import (
	"fmt"
	"os"
	"text/template"
)

func main() {
	// 解析文件模板
	tpl, err := template.ParseFiles("template/hello.tpl", "template/hello2.tpl")
	if err != nil {
		panic(err)
	}

	// 提供数据，渲染模板
	data := "world!"

	// 渲染方法1：使用ExecuteTemplate方法指定模板名
	for _, name := range []string{"hello.tpl", "hello2.tpl"} {
		err = tpl.ExecuteTemplate(os.Stdout, name, data)
		if err != nil {
			panic(err)
		}
		fmt.Println()
	}

	// 渲染方法2：使用Lookup查找对应模板，然后执行Execute渲染
	for _, name := range []string{"hello.tpl", "hello2.tpl"} {
		tpl = tpl.Lookup(name)
		err = tpl.Execute(os.Stdout, data)
		if err != nil {
			panic(err)
		}
		fmt.Println()
	}
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
Hello  world!
Hello2  world!
Hello  world!
Hello2  world!
```

:::

::: details （4）文件模板：解析多文件，模糊查找

`template/hello.tpl`

```
Hello  {{ . }}
```

`template/hello2.tpl`

```
Hello2  {{ . }}
```

`main.go`

```go
package main

import (
	"fmt"
	"os"
	"text/template"
)

func main() {
	// 解析文件模板
	tpl, err := template.ParseGlob("template/*.tpl")
	if err != nil {
		panic(err)
	}

	// 提供数据
	data := "world!"

	// 渲染模板
	for _, name := range []string{"hello.tpl", "hello2.tpl"} {
		err = tpl.ExecuteTemplate(os.Stdout, name, data)
		if err != nil {
			panic(err)
		}
		fmt.Println()
	}
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
Hello  world!
Hello2  world!
```

:::

<br />

## 模板语法

### 添加注释

::: details 点击查看详情

```go
package main

import (
	"os"
	"text/template"
)

func main() {
	// 定义字符串模板
	msg := `
{{/* 单行注释 */}}
{{/*
    多行
    注释 
*/}}
Hello {{ . }}`

	// 解析字符串模板
	tpl, err := template.New("hello").Parse(msg)
	if err != nil {
		panic(err)
	}

	// 提供数据，渲染模板，并输出到标准输出
	data := "world!"
	err = tpl.Execute(os.Stdout, data)
	if err != nil {
		panic(err)
	}
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go



Hello world!
```

:::

<br />

### 设置变量

::: details 点击查看详情

```go
package main

import (
	"os"
	"text/template"
)

func main() {
	// 定义字符串模板：变量定义和引用
	msg := `{{ $name := "我是变量" }}Hello {{ . }} {{ $name }}`

	// 解析字符串模板
	tpl, err := template.New("hello").Parse(msg)
	if err != nil {
		panic(err)
	}

	// 提供数据，渲染模板，并输出到标准输出
	data := "world!"
	err = tpl.Execute(os.Stdout, data)
	if err != nil {
		panic(err)
	}
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
Hello world! 我是变量
```

:::

<br />

### 取值操作

::: details （1）结构体取值：使用 .FieldName

```go
package main

import (
	"os"
	"text/template"
)

type Person struct {
	Name  string
	Age   int
	Phone [11]int
}

func main() {
	// 定义字符串模板：若想要解析\n，不能使用``来定义字符串
	msg := "Name: {{ .Name }}\nAge: {{ .Age }}\nPhone: {{ .Phone }}"

	// 解析字符串模板
	tpl, err := template.New("hello").Parse(msg)
	if err != nil {
		panic(err)
	}

	// 提供数据，渲染模板，并输出到标准输出
	data := Person{
		Name:  "jack",
		Age:   18,
		Phone: [11]int{1, 3, 7, 8, 8, 8, 8, 8, 8, 8, 8},
	}
	err = tpl.Execute(os.Stdout, data)
	if err != nil {
		panic(err)
	}
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
Name: jack
Age: 18
Phone: [1 3 7 8 8 8 8 8 8 8 8]
```

:::

::: details （2）切片、Map取值：使用index根据索引取值

```go
package main

import (
	"os"
	"text/template"
)

type Person struct {
	Name  string
	Age   int
	Phone [11]int
	Map   map[string]string
}

func main() {
	// 定义字符串模板
	// 取单个值：
	//     {{ index .Phone 1 }}   等于 .Phone[1]
	//     {{ index .Map "key" }} 等于 .Map["key"]
	// 取多个值：需要使用循环语句
	msg := "Name: {{ .Name }}\nAge: {{ .Age }}\nPhone: {{ index .Phone 1 }}\nMap: {{ index .Map \"key\" }}"

	// 解析字符串模板
	tpl, err := template.New("hello").Parse(msg)
	if err != nil {
		panic(err)
	}

	// 提供数据，渲染模板，并输出到标准输出
	data := Person{
		Name:  "jack",
		Age:   18,
		Phone: [11]int{1, 3, 7, 8, 8, 8, 8, 8, 8, 8, 8},
		Map:   map[string]string{"key": "value"},
	}
	err = tpl.Execute(os.Stdout, data)
	if err != nil {
		panic(err)
	}
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
Name: jack
Age: 18
Phone: 3
Map: value
```

:::

<br />

### 判断语句

::: details 点击查看详情

```go
package main

import (
	"os"
	"text/template"
)

func main() {
	// 定义字符串模板
	msg := "{{ if .name }} {{ .name }} {{ else }} Unknown {{ end }}"

	// 解析字符串模板
	tpl, err := template.New("hello").Parse(msg)
	if err != nil {
		panic(err)
	}

	// 提供数据，渲染模板，并输出到标准输出
	data := map[string]any{
		"name": "jack",
		"age":  18,
	}
	err = tpl.Execute(os.Stdout, data)
	if err != nil {
		panic(err)
	}
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
 jack
```

:::

<br />

### 循环语句

::: details 点击查看详情

```go
package main

import (
	"os"
	"text/template"
)

func main() {
	// 定义字符串模板
	// 循环体内会改变作用域，.代表当前循环的对象
	msg := `{{ range $key, $value := .number }}
{{ $key }} --> {{ $value }}
{{ end }}`

	// 解析字符串模板
	tpl, err := template.New("hello").Parse(msg)
	if err != nil {
		panic(err)
	}

	// 提供数据，渲染模板，并输出到标准输出
	data := map[string]any{
		"number": []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 0},
	}
	err = tpl.Execute(os.Stdout, data)
	if err != nil {
		panic(err)
	}
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go

0 --> 1

1 --> 2

2 --> 3

3 --> 4

4 --> 5

5 --> 6

6 --> 7

7 --> 8

8 --> 9

9 --> 0

```

:::

<br />

### 移除空白

::: details 点击查看详情

```go
package main

import (
	"os"
	"text/template"
)

func main() {
	// 定义字符串模板
	// {{- $key }}   移除左侧的空白
	// {{ $key -}}   移除右侧的空白
	// {{- $key -}}  移除两侧的空白
	msg := `{{ range $key, $value := .number }}
{{- $key }} --> {{ $value }}
{{ end }}`

	// 解析字符串模板
	tpl, err := template.New("hello").Parse(msg)
	if err != nil {
		panic(err)
	}

	// 提供数据，渲染模板，并输出到标准输出
	data := map[string]any{
		"number": []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 0},
	}
	err = tpl.Execute(os.Stdout, data)
	if err != nil {
		panic(err)
	}
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
0 --> 1
1 --> 2
2 --> 3
3 --> 4
4 --> 5
5 --> 6
6 --> 7
7 --> 8
8 --> 9
9 --> 0
```

:::

<br />

### 作用域

::: details 点击查看详情

```go
package main

import (
	"os"
	"text/template"
)

func main() {
    // 定义字符串模板: with语句可以临时改变作用域
	msg := `
{{- with .user -}}
{{ .name }}
{{ .age }}
{{- end -}}`

	// 解析字符串模板
	tpl, err := template.New("hello").Parse(msg)
	if err != nil {
		panic(err)
	}

	// 提供数据，渲染模板，并输出到标准输出
	data := map[string]any{
		"user": map[string]any{
			"name": "bob",
			"age":  18,
		},
	}
	err = tpl.Execute(os.Stdout, data)
	if err != nil {
		panic(err)
	}
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
bob
18
```

:::

<br />

### 基础函数

::: details （1）管道函数（重要）

使用`|`作为管道，很类似于Shell中的管道

注意：前一个命令的输出结果是作为下一个命令的最后一个参数，比如`{{ .b | ge .a }}`等同于 `{{ ge .a .b }}`

:::

::: details （2）比较函数：基础示例

比较函数

比较函数：

* eq：等于
* ne：不等于
* lt：小于
* le：小于等于
* gt：大于
* ge：大于等于

两种写法（a>=b）：

* 直接调用函数传参：`{{ ge .a .b }}`
* 通过管道传递参数：`{{ .b | ge .a }}`，这里这里的顺序，管道前的值会放到ge函数最后一个值

```go
package main

import (
	"os"
	"text/template"
)

func main() {
	// 定义字符串模板
	msg := `
{{- if eq .a .b -}}
    a == b
{{- else if lt .a .b -}}
    a < b
{{- else -}}
    a > b
{{- end -}}`

	// 解析字符串模板
	tpl, err := template.New("hello").Parse(msg)
	if err != nil {
		panic(err)
	}

	// 提供数据，渲染模板，并输出到标准输出
	data := map[string]any{"a": 10, "b": 11}
	err = tpl.Execute(os.Stdout, data)
	if err != nil {
		panic(err)
	}
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
a < b
```

:::

::: details （3）比较函数：eq比较特殊，可以接收多个参数

* `{{ eq .a .b .c .d }}` 等于 `.a == .b || .a == .c || .a == .d`

```go
package main

import (
	"os"
	"text/template"
)

func main() {
	// 定义字符串模板
	msg := `
{{- if eq .a .b .c .d .e -}}
   yes
{{- else -}}
    no
{{- end -}}`

	// 解析字符串模板
	tpl, err := template.New("hello").Parse(msg)
	if err != nil {
		panic(err)
	}

	// 提供数据，渲染模板，并输出到标准输出
	data := map[string]any{"a": 10, "b": 11, "c": 12, "d": 10, "e": 15}
	err = tpl.Execute(os.Stdout, data)
	if err != nil {
		panic(err)
	}
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
yes
```

:::

::: details （4）逻辑函数

逻辑函数：

* and：与
* or：或
* not：非

:::

<br />

### 自定义函数

::: details （1）注册全局函数

**写法1：适用于全局函数参数等一直不会变的情况**

```go
package main

import (
	"os"
	"text/template"
)

func main() {
	// 定义字符串模板
	msg := `最大值: {{ max .a .b }}`

	// 注册全局函数，并解析字符串模板
	// 注意事项：
	// 1.若模板中使用了全局函数：
	//       1.则必须在【解析模板前】注册好函数，否则解析会报错
	//       2.可以注册一个虚假的函数骗过解析，然后在渲染之前再重新注册真正的函数，以达到更灵活的目的
	// 2.若模板中没有使用全局函数：
	//       那么什么时候注册都可以
	// 3.注册全局函数是并发安全的
	// 4.函数可以有一个返回值，也可以有两个返回值，但是第二个返回值必须是error类型
	tpl, err := template.New("hello").Funcs(template.FuncMap{
		"max": func(a, b int) int {
			if a > b {
				return a
			}
			return b
		},
	}).Parse(msg)
	if err != nil {
		panic(err)
	}

	// 提供数据，渲染模板，并输出到标准输出
	data := map[string]any{"a": 10, "b": 11}
	err = tpl.Execute(os.Stdout, data)
	if err != nil {
		panic(err)
	}
}
```

**写法2：先注册一个假的函数骗过解析，然后再注册真正的函数**

```go
package main

import (
	"os"
	"text/template"
)

func main() {
	// 定义字符串模板
	msg := `最大值: {{ max .a .b }}`

	// 注册全局函数，并解析字符串模板
	// 注意事项：
	// 1.若模板中使用了全局函数：
	//       1.则必须在【解析模板前】注册好函数，否则解析会报错
	//       2.可以注册一个虚假的函数骗过解析，然后在渲染之前再重新注册真正的函数，以达到更灵活的目的
	// 2.若模板中没有使用全局函数：
	//       那么什么时候注册都可以
	// 3.注册全局函数是并发安全的
	// 4.函数可以有一个返回值，也可以有两个返回值，但是第二个返回值必须是error类型
	tpl, err := template.New("hello").Funcs(template.FuncMap{"max": func() {}}).Parse(msg)
	if err != nil {
		panic(err)
	}

	tpl.Funcs(template.FuncMap{
		"max": func(a, b int) int {
			if a > b {
				return a
			}
			return b
		},
	})

	// 提供数据，渲染模板，并输出到标准输出
	data := map[string]any{"a": 10, "b": 11}
	err = tpl.Execute(os.Stdout, data)
	if err != nil {
		panic(err)
	}
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
最大值: 11
```

:::

::: details （2）调用结构体方法

```go
package main

import (
	"os"
	"text/template"
)

type Empty struct{}

func (u *Empty) Say(msg string) string {
	return "Say: " + msg
}

func main() {
	// 定义字符串模板
	msg := `{{ .Say "hello world!" }}`

	// 解析字符串模板
	tpl, err := template.New("hello").Parse(msg)
	if err != nil {
		panic(err)
	}

	// 提供数据，渲染模板，并输出到标准输出
	data := &Empty{}
	err = tpl.Execute(os.Stdout, data)
	if err != nil {
		panic(err)
	}
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
Say: hello world!
```

:::

::: details （3）调用结构体字段（字段是一个方法，使用call调用）

```go
package main

import (
	"os"
	"text/template"
)

type Empty struct {
	Say func(msg string) string
}

func main() {
	// 定义字符串模板,如果要与if语句连用，可以将call语句加一个括号
	msg := `{{ call .Say "hello world!" }}`

	// 解析字符串模板
	tpl, err := template.New("hello").Parse(msg)
	if err != nil {
		panic(err)
	}

	// 提供数据，渲染模板，并输出到标准输出
	data := &Empty{Say: func(msg string) string {
		return "Say: " + msg
	}}
	err = tpl.Execute(os.Stdout, data)
	if err != nil {
		panic(err)
	}
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
Say: hello world!
```

:::

<br />

### 第三方函数库

Github：[https://github.com/Masterminds/sprig](https://github.com/Masterminds/sprig)

文档：[https://masterminds.github.io/sprig/](https://masterminds.github.io/sprig/)

::: details 示例

**安装**

```bash
D:\application\GoLand\example>go get github.com/Masterminds/sprig/v3
go: downloading github.com/Masterminds/sprig v2.22.0+incompatible
go: downloading github.com/Masterminds/sprig/v3 v3.2.3
go: downloading github.com/Masterminds/goutils v1.1.1
go: downloading github.com/Masterminds/semver/v3 v3.2.0
go: downloading github.com/huandu/xstrings v1.3.3
go: downloading github.com/imdario/mergo v0.3.11
go: downloading github.com/mitchellh/copystructure v1.0.0
go: downloading golang.org/x/crypto v0.3.0
go: downloading github.com/mitchellh/reflectwalk v1.0.0
go: added github.com/Masterminds/goutils v1.1.1
go: added github.com/Masterminds/semver/v3 v3.2.0
go: added github.com/Masterminds/sprig/v3 v3.2.3
go: added github.com/google/uuid v1.1.1
go: added github.com/huandu/xstrings v1.3.3
go: added github.com/imdario/mergo v0.3.11
go: added github.com/mitchellh/copystructure v1.0.0
go: added github.com/mitchellh/reflectwalk v1.0.0
go: added github.com/shopspring/decimal v1.2.0
go: added github.com/spf13/cast v1.3.1
go: upgraded golang.org/x/crypto v0.0.0-20220214200702-86341886e292 => v0.3.0
```

`main.go`

```go
package main

import (
	"os"
	"text/template"

	"github.com/Masterminds/sprig/v3"
)

func main() {
	// 定义字符串模板
	msg := `{{ now | date "2006-01-02 15:04:05"  }}`

	// 解析字符串模板
	tpl, err := template.New("hello").Funcs(sprig.FuncMap()).Parse(msg)
	if err != nil {
		panic(err)
	}

	// 提供数据，渲染模板，并输出到标准输出
	data := "hello world!"
	err = tpl.Execute(os.Stdout, data)
	if err != nil {
		panic(err)
	}
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
2023-02-14 13:50:01
```

:::

<br />

## 模板嵌套

::: details （1）定义模板和引用模板

`template/header.tpl`

```bash
{{- define "header" -}}
header
{{- end -}}
```

`template/index.tpl`

```
{{ template "header" }}
body
```

`main.go`

```go
package main

import (
	"os"
	"text/template"
)

func main() {
	// 解析文件模板
	tpl, err := template.ParseGlob("template/*.tpl")
	if err != nil {
		panic(err)
	}

	// 提供数据，渲染模板
	data := "Hello world!"
	err = tpl.ExecuteTemplate(os.Stdout, "index.tpl", data)
	if err != nil {
		panic(err)
	}
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
header
body
```

:::

::: details （2）模板之间传递变量

`template/header.tpl`

```
{{- define "header" -}}
header data: {{ . }}
{{- end -}}
```

`template/index.tpl`

```
{{ template "header" . }}
body
```

`main.go`

```go
package main

import (
	"os"
	"text/template"
)

func main() {
	// 解析文件模板
	tpl, err := template.ParseGlob("template/*.tpl")
	if err != nil {
		panic(err)
	}

	// 提供数据，渲染模板
	data := "Hello world!"
	err = tpl.ExecuteTemplate(os.Stdout, "index.tpl", data)
	if err != nil {
		panic(err)
	}
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
header data: Hello world!
body
```

:::
