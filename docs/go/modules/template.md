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

## 示例

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

::: details （2）文件模板：写法与字符串模板有较大不同

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
	var (
		tpl *template.Template
		err error
	)
	tpl, err = template.ParseFiles("template/hello.tpl")
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

<br />



