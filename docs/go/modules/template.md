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

