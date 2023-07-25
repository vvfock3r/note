# simpletable

Github：[https://github.com/alexeyco/simpletable](https://github.com/alexeyco/simpletable)

文档：[https://pkg.go.dev/github.com/alexeyco/simpletable](https://pkg.go.dev/github.com/alexeyco/simpletable)

## 安装

```bash
go get -u github.com/alexeyco/simpletable
```

<br />

## 使用

::: details （1）示例

```go
package main

import (
	"fmt"

	"github.com/alexeyco/simpletable"
)

func main() {
	// 数据
	data := [][]any{
		{1, "张三", 1423.25},
		{2, "李四", 123.84},
		{3, "John R. Jackson", 7526.12},
		{4, "Newton G. Goetz", 532.7},
		{5, "Penny R. Lewis", 3221.11},
	}

	// 实例化table
	table := simpletable.New()

	// 设置Header
	table.Header = &simpletable.Header{
		Cells: []*simpletable.Cell{
			{Align: simpletable.AlignLeft, Text: "编号"},
			{Align: simpletable.AlignLeft, Text: "姓名"},
			{Align: simpletable.AlignLeft, Text: "收入"},
		},
	}

	// 添加数据
	subtotal := float64(0)
	for _, row := range data {
		r := []*simpletable.Cell{
			{Align: simpletable.AlignLeft, Text: fmt.Sprintf("%d", row[0].(int))},
			{Text: row[1].(string)},
			{Align: simpletable.AlignLeft, Text: fmt.Sprintf("$ %.2f", row[2].(float64))},
		}
		table.Body.Cells = append(table.Body.Cells, r)
		subtotal += row[2].(float64) // 计算总数,用于Footer中显示
	}

	// 设置Footer
	table.Footer = &simpletable.Footer{
		Cells: []*simpletable.Cell{
			{},
			{Align: simpletable.AlignLeft, Text: "Subtotal"},
			{Align: simpletable.AlignLeft, Text: fmt.Sprintf("$ %.2f", subtotal)},
		},
	}

	// 设置表格样式
	table.SetStyle(simpletable.StyleDefault)

	// 输出表格
	fmt.Println(table.String())
}
```

输出结果

![image-20230303155727304](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230303155727304.png)

:::

::: details （2）测试不同的表格样式

**1、simpletable.StyleDefault**

![image-20230303155727304](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230303155727304.png)

**2、simpletable.StyleCompact**

![image-20230303155848939](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230303155848939.png)

**3、simpletable.StyleCompactLite**

![image-20230303155949163](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230303155949163.png)

**4、simpletable.StyleCompactClassic**

![image-20230303160043994](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230303160043994.png)



**5、simpletable.StyleMarkdown**

![image-20230303160124554](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230303160124554.png)

**6、simpletable.StyleRounded**

![image-20230303160212283](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230303160212283.png)

**7、simpletable.StyleUnicode**

![image-20230303160256491](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230303160256491.png)

:::

::: details （3）/etc/passwd以表格形式输出

```go
package main

import (
	"bufio"
	"fmt"
	"io"
	"os"
	"strings"

	"github.com/fatih/color"

	"github.com/alexeyco/simpletable"
)

func main() {
	// 打开文件
	f, err := os.Open("/etc/passwd")
	if err != nil {
		panic(err)
	}
	defer f.Close()

	// 实例化table
	table := simpletable.New()

	// 设置Header
	table.Header = &simpletable.Header{
		Cells: []*simpletable.Cell{
			{Align: simpletable.AlignLeft, Text: color.CyanString("用户名")},
			{Align: simpletable.AlignLeft, Text: color.CyanString("密码占位符")},
			{Align: simpletable.AlignLeft, Text: color.CyanString("UID")},
			{Align: simpletable.AlignLeft, Text: color.CyanString("GID")},
			{Align: simpletable.AlignLeft, Text: color.CyanString("描述信息")},
			{Align: simpletable.AlignLeft, Text: color.CyanString("家目录")},
			{Align: simpletable.AlignLeft, Text: color.CyanString("登录Shell")},
		},
	}

	// 读取数据，添加到表格中
	reader := bufio.NewReader(f)
	for {
		// 按行读取
		line, err := reader.ReadString('\n')
		if err != nil {
			if err == io.EOF {
				break
			}
			panic(err)
		}
		line = strings.TrimRight(line, "\n")

		// 转为切片
		s := strings.Split(line, ":")

		// 处理逻辑
		uidIndex := 2
		shellIndex := 6
		if s[uidIndex] == "0" {
			s[uidIndex] = color.RedString(s[uidIndex])
		}
		if s[shellIndex] == "/bin/bash" {
			s[shellIndex] = color.RedString(s[shellIndex])
		}

		// 设置表格一行
		var row []*simpletable.Cell
		for _, v := range s {
			cell := simpletable.Cell{
				Align: simpletable.AlignLeft,
				Text:  v,
			}
			row = append(row, &cell)
		}

		// 添加到表格中
		table.Body.Cells = append(table.Body.Cells, row)
	}

	// 设置表格样式
	table.SetStyle(simpletable.StyleDefault)

	// 输出表格
	fmt.Println(table.String())
}
```

输出结果

![image-20230303165826422](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230303165826422.png)

:::

<br />

## 注意

好像不能调整表格宽度，比如设置最小宽度等