# excelize

Github：[https://github.com/qax-os/excelize](https://github.com/qax-os/excelize)

文档：

* [https://pkg.go.dev/github.com/xuri/excelize/v2](https://pkg.go.dev/github.com/xuri/excelize/v2)
* [https://xuri.me/excelize/zh-hans/](https://xuri.me/excelize/zh-hans/)
* [https://www.bookstack.cn/read/excelize-2.7.0-zh/70082f38e765b09d.md](https://www.bookstack.cn/read/excelize-2.7.0-zh/70082f38e765b09d.md)

<br />

## 安装

```bash
go get github.com/xuri/excelize/v2
```

<br />

## 打开和关闭

### 创建新的文件

::: details （1）新建一个文件

```go
package main

import (
	"fmt"
	"github.com/xuri/excelize/v2"
)

func main() {
	// 通过默认模板创建File对象,注意这并不会真正创建文件
	f := excelize.NewFile()
	defer func() { _ = f.Close() }()

	// 写入数据
	err := f.SetCellValue("Sheet1", "A1", "用户名")
	if err != nil {
		panic(err)
	}
	err = f.SetCellValue("Sheet1", "B1", "密码")
	if err != nil {
		panic(err)
	}

	// 保存到文件中，这一步才会真正创建文件
    // 如果文件已经存在则会覆盖,如果文件已经被其他进程打开则会报错
	err = f.SaveAs("测试.xlsx")
	if err != nil {
		panic(err)
	}
}
```

输出结果

![image-20230408085801537](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230408085801537.png)

:::

### 读取已有文件

::: details 点击查看详情

```go
package main

import (
	"github.com/xuri/excelize/v2"
)

func main() {
	// 打开已经存在的excel
	f, err := excelize.OpenFile("测试.xlsx")
	if err != nil {
		panic(err)
	}
	defer func() { _ = f.Close() }()
}
```

:::

<br />

### 添加文件密码

::: details 点击查看详情

```go
package main

import (
	"fmt"
	"github.com/xuri/excelize/v2"
)

func main() {
	// 通过默认模板创建File对象,注意这并不会真正创建文件
	f := excelize.NewFile()
	defer func() { _ = f.Close() }()

	// 写入数据
	err := f.SetCellValue("Sheet1", "A1", "用户名")
	if err != nil {
		panic(err)
	}
	err = f.SetCellValue("Sheet1", "B1", "密码")
	if err != nil {
		panic(err)
	}

	// 保存到文件中，这一步才会真正创建文件
	// 如果文件已经存在则会覆盖,如果文件已经被其他进程打开则会报错
	err = f.SaveAs("测试.xlsx", excelize.Options{Password: "123456"})
	if err != nil {
		panic(err)
	}
}
```

输出结果

![image-20230408182708547](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230408182708547.png)

:::

<br />

## 读写数据

### 写入数据

::: details （1）单独定义数据

```go
package main

import (
	"fmt"
	"github.com/xuri/excelize/v2"
)

func main() {
	// 通过默认模板创建File对象,注意这并不会真正创建文件
	f := excelize.NewFile()
	defer func() { _ = f.Close() }()

	// 定义数据
	header := [][]string{
		{"Sheet1", "A1", "用户名"},
		{"Sheet1", "B1", "密码"},
	}
    
    // 写入数据
	for _, item := range header {
		err := f.SetCellValue(item[0], item[1], item[2])
		if err != nil {
			panic(err)
		}
	}

	// 保存到文件中，这一步才会真正创建文件
    // 如果文件已经存在则会覆盖,如果文件已经被其他进程打开则会报错
	err := f.SaveAs("测试.xlsx")
	if err != nil {
		panic(err)
	}
}
```

![image-20230408183643142](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230408183643142.png)

:::

::: details （2）数据中去掉工作表属性（Sheet）

```go
package main

import (
	"fmt"
	"github.com/xuri/excelize/v2"
)

func main() {
	// 通过默认模板创建File对象,注意这并不会真正创建文件
	f := excelize.NewFile()
	defer func() { _ = f.Close() }()

	// 定义第一行数据
	header := []any{"用户名", "密码"}

	// 写入第一行数据
	for index, item := range header {
		cell := string(rune('A'+index)) + "1"
		err := f.SetCellValue("Sheet1", cell, item)
		if err != nil {
			panic(err)
		}
	}

	// 保存到文件中，这一步才会真正创建文件
	// 如果文件已经存在则会覆盖,如果文件已经被其他进程打开则会报错
	err := f.SaveAs("测试.xlsx")
	if err != nil {
		panic(err)
	}
}
```

![image-20230408183605933](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230408183605933.png)

:::

::: details （3）支持多行循环写入

```go
package main

import (
	"fmt"
	"github.com/xuri/excelize/v2"
	"strconv"
)

func main() {
	// 通过默认模板创建File对象,注意这并不会真正创建文件
	f := excelize.NewFile()
	defer func() { _ = f.Close() }()

	// 定义多行数据
	data := [][]any{
		{"用户名", "密码"},
		{"zhangsan", "12345"},
		{"lisi", "12345"},
		{"wangwu", "12345"},
	}

	// 写入多行数据
	for index, row := range data {
		for offset, item := range row {
			cell := string(rune('A'+offset)) + strconv.Itoa(index+1)
			err := f.SetCellValue("Sheet1", cell, item)
			if err != nil {
				panic(err)
			}
		}
	}

	// 保存到文件中，这一步才会真正创建文件
	// 如果文件已经存在则会覆盖,如果文件已经被其他进程打开则会报错
	err := f.SaveAs("测试.xlsx")
	if err != nil {
		panic(err)
	}
}
```

![image-20230408183528821](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230408183528821.png)

:::

<br />

### 流式写入

参考文档：[https://xuri.me/excelize/zh-hans/stream.html](https://xuri.me/excelize/zh-hans/stream.html)

::: details 点击查看详情

```go
package main

import (
	"fmt"
	"math/rand"

	"github.com/xuri/excelize/v2"
)

func main() {
	// 通过默认模板创建File对象,注意这并不会真正创建文件
	f := excelize.NewFile()
	defer func() { _ = f.Close() }()

	// 获取一个流式写入器
	streamWriter, err := f.NewStreamWriter("Sheet1")
	if err != nil {
		fmt.Println(err)
	}
	defer func() {
		err = streamWriter.Flush()
		if err != nil {
			fmt.Println(err)
		}
	}()

	// 写入单行数据
	err = streamWriter.SetRow("A1", []interface{}{
		excelize.Cell{Value: "Data"},
	})
	if err != nil {
		fmt.Println(err)
	}

	// 写入多行数据
	for rowID := 2; rowID <= 102400; rowID++ {
		row := make([]interface{}, 50)
		for colID := 0; colID < 50; colID++ {
			row[colID] = rand.Intn(640000)
		}
		cell, _ := excelize.CoordinatesToCellName(1, rowID)
		if err = streamWriter.SetRow(cell, row); err != nil {
			fmt.Println(err)
		}
	}

	// 保存到文件中，这一步才会真正创建文件
	// 如果文件已经存在则会覆盖,如果文件已经被其他进程打开则会报错
	err = f.SaveAs("测试.xlsx")
	if err != nil {
		panic(err)
	}
}
```

:::

<br />

### 读取数据

::: details 点击查看详情

```go
package main

import (
	"fmt"
	"github.com/brianvoe/gofakeit/v6"
	"github.com/xuri/excelize/v2"
	"strconv"
	"time"
)

func main() {
	// 通过默认模板创建File对象,注意这并不会真正创建文件
	f := excelize.NewFile()
	defer func() { _ = f.Close() }()

	// 定义多行数据
	data := [][]any{
		{"字符串", "字符串(数字)", "数字", "时间"},
		{gofakeit.Username(), gofakeit.StreetNumber(), gofakeit.Number(1, 100), time.Now()},
		{gofakeit.Username(), gofakeit.StreetNumber(), gofakeit.Number(1, 100), time.Now()},
		{gofakeit.Username(), gofakeit.StreetNumber(), gofakeit.Number(1, 100), time.Now()},
	}

	// 写入多行数据
	for index, row := range data {
		for offset, item := range row {
			cell := string(rune('A'+offset)) + strconv.Itoa(index+1)
			err := f.SetCellValue("Sheet1", cell, item)
			if err != nil {
				panic(err)
			}
		}
	}

	// 读取时间数据,注意读取出来的数据格式与Excel中看到的并不一致
	t, err := f.GetCellValue("Sheet1", "D2")
	if err != nil {
		fmt.Println(err)
	}
	fmt.Printf("读取时间: %s\n", t)

	// 解析为Go对象
	t2, err := time.ParseInLocation("1/2/06 15:04", t, time.Local)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Printf("解析时间: %s\n", t2)

	// 保存到文件中，这一步才会真正创建文件
	// 如果文件已经存在则会覆盖,如果文件已经被其他进程打开则会报错
	err = f.SaveAs("测试.xlsx")
	if err != nil {
		panic(err)
	}
}
```

输出结果

```bash
读取时间: 4/8/23 19:02
解析时间: 2023-04-08 19:02:00 +0800 CST
```

![image-20230408190354996](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230408190354996.png)

:::

<br />

### 读取行列

::: details （1）一次性读取所有行或列

```go
package main

import (
	"fmt"
	"github.com/brianvoe/gofakeit/v6"
	"github.com/xuri/excelize/v2"
	"strconv"
	"time"
)

func main() {
	// 通过默认模板创建File对象,注意这并不会真正创建文件
	f := excelize.NewFile()
	defer func() { _ = f.Close() }()

	// 定义多行数据
	data := [][]any{
		{"字符串", "字符串(数字)", "数字", "时间"},
		{gofakeit.Username(), gofakeit.StreetNumber(), gofakeit.Number(1, 100), time.Now()},
		{gofakeit.Username(), gofakeit.StreetNumber(), gofakeit.Number(1, 100), time.Now()},
		{gofakeit.Username(), gofakeit.StreetNumber(), gofakeit.Number(1, 100), time.Now()},
	}

	// 写入多行数据
	for index, row := range data {
		for offset, item := range row {
			cell := string(rune('A'+offset)) + strconv.Itoa(index+1)
			err := f.SetCellValue("Sheet1", cell, item)
			if err != nil {
				panic(err)
			}
		}
	}

	// 读取所有行,返回一个 二维字符串切片
	rows, err := f.GetRows("Sheet1")
	if err != nil {
		panic(err)
	}
	fmt.Printf("%#v\n", rows)

	// 读取所有列,返回一个 二维字符串切片
	cols, err := f.GetCols("Sheet1")
	if err != nil {
		panic(err)
	}
	fmt.Printf("%#v\n", cols)

	// 保存到文件中，这一步才会真正创建文件
	// 如果文件已经存在则会覆盖,如果文件已经被其他进程打开则会报错
	err = f.SaveAs("测试.xlsx")
	if err != nil {
		panic(err)
	}
}
```

输出结果

```bash
[][]string{[]string{"字符串", "字符串(数字)", "数字", "时间"}, []string{"Bednar5314", "42126", "65", "4/8/23 19:07"}, []string{"King5261", "696", "93", "4/8/23 19:07"}, []string{"Dicki46
85", "5411", "19", "4/8/23 19:07"}}
[][]string{[]string{"字符串", "Bednar5314", "King5261", "Dicki4685"}, []string{"字符串(数字)", "42126", "696", "5411"}, []string{"数字", "65", "93", "19"}, []string{"时间", "4/8/23 19:07
", "4/8/23 19:07", "4/8/23 19:07"}}
```

:::

::: details （2）流式读取所有行或列

```go
package main

import (
	"fmt"
	"github.com/brianvoe/gofakeit/v6"
	"github.com/xuri/excelize/v2"
	"strconv"
	"time"
)

func main() {
	// 通过默认模板创建File对象,注意这并不会真正创建文件
	f := excelize.NewFile()
	defer func() { _ = f.Close() }()

	// 定义多行数据
	data := [][]any{
		{"字符串", "字符串(数字)", "数字", "时间"},
		{gofakeit.Username(), gofakeit.StreetNumber(), gofakeit.Number(1, 100), time.Now()},
		{gofakeit.Username(), gofakeit.StreetNumber(), gofakeit.Number(1, 100), time.Now()},
		{gofakeit.Username(), gofakeit.StreetNumber(), gofakeit.Number(1, 100), time.Now()},
	}

	// 写入多行数据
	for index, row := range data {
		for offset, item := range row {
			cell := string(rune('A'+offset)) + strconv.Itoa(index+1)
			err := f.SetCellValue("Sheet1", cell, item)
			if err != nil {
				panic(err)
			}
		}
	}

	// 流式读取行和列
	rows, err := f.Rows("Sheet1")
	if err != nil {
		panic(err)
	}
	for rows.Next() {
		row, err := rows.Columns()
		if err != nil {
			fmt.Println(err)
		}
		for _, colCell := range row {
			fmt.Print(colCell, "\t")
		}
		fmt.Println()
	}

	// 保存到文件中，这一步才会真正创建文件
	// 如果文件已经存在则会覆盖,如果文件已经被其他进程打开则会报错
	err = f.SaveAs("测试.xlsx")
	if err != nil {
		panic(err)
	}
}
```

输出结果

```bash
字符串  字符串(数字)    数字    时间
Goldner8552     76044   86      4/8/23 21:38
Mayert3932      87076   70      4/8/23 21:38
Heidenreich7502 1544    73      4/8/23 21:38
```

:::

<br />

### 插入行列

::: details 点击查看详情

```go
package main

import (
	"fmt"
	"github.com/xuri/excelize/v2"
	"strconv"
)

func main() {
	// 通过默认模板创建File对象,注意这并不会真正创建文件
	f := excelize.NewFile()
	defer func() { _ = f.Close() }()

	// 定义多行数据
	data := [][]any{
		{"用户名", "密码"},
		{"zhangsan", "12345"},
		{"lisi", "12345"},
		{"wangwu", "12345"},
	}

	// 写入多行数据
	for index, row := range data {
		for offset, item := range row {
			cell := string(rune('A'+offset)) + strconv.Itoa(index+1)
			err := f.SetCellValue("Sheet1", cell, item)
			if err != nil {
				panic(err)
			}
		}
	}

	// 插入空行或空列
	// 第一个参数：代表开始位置，比如第几行，第几列等，会影响开始行
	// 第一个参数：空行或空列的数量
	err := f.InsertRows("Sheet1", 3, 2) // 3、4行是空白行
	if err != nil {
		panic(err)
	}
	err = f.InsertCols("Sheet1", "B", 3) // B、C、D是空列
	if err != nil {
		panic(err)
	}

	// 保存到文件中，这一步才会真正创建文件
	// 如果文件已经存在则会覆盖,如果文件已经被其他进程打开则会报错
	err = f.SaveAs("测试.xlsx")
	if err != nil {
		panic(err)
	}
}
```

输出结果

![image-20230408215110729](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230408215110729.png)

:::

<br />

## 调整样式

### 行高和列宽

::: details （1）设置行高

```go
package main

import (
	"fmt"
	"github.com/xuri/excelize/v2"
	"strconv"
)

func main() {
	// 通过默认模板创建File对象,注意这并不会真正创建文件
	f := excelize.NewFile()
	defer func() { _ = f.Close() }()

	// 定义多行数据
	data := [][]any{
		{"用户名", "密码"},
		{"zhangsan", "12345"},
		{"lisi", "12345"},
		{"wangwu", "12345"},
	}

	// 写入多行数据
	for index, row := range data {
		for offset, item := range row {
			cell := string(rune('A'+offset)) + strconv.Itoa(index+1)
			err := f.SetCellValue("Sheet1", cell, item)
			if err != nil {
				panic(err)
			}
		}
	}

	// 读取第一行行高, 默认为15.0
	rowHeight, err := f.GetRowHeight("Sheet1", 1)
	if err != nil {
		panic(err)
	}
	fmt.Printf("第一行行高: %.2f\n", rowHeight)

	// 设置第一行行高为20
	err = f.SetRowHeight("Sheet1", 1, 20)
	if err != nil {
		panic(err)
	}

	// 保存到文件中，这一步才会真正创建文件
	// 如果文件已经存在则会覆盖,如果文件已经被其他进程打开则会报错
	err = f.SaveAs("测试.xlsx")
	if err != nil {
		panic(err)
	}
}
```

输出结果

![image-20230410121042534](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230410121042534.png)

:::

::: details （2）设置列宽

```go
package main

import (
	"fmt"
	"github.com/xuri/excelize/v2"
	"strconv"
)

func main() {
	// 通过默认模板创建File对象,注意这并不会真正创建文件
	f := excelize.NewFile()
	defer func() { _ = f.Close() }()

	// 定义多行数据
	data := [][]any{
		{"用户名", "密码"},
		{"zhangsan", "12345"},
		{"lisi", "12345"},
		{"wangwu", "12345"},
	}

	// 写入多行数据
	for index, row := range data {
		for offset, item := range row {
			cell := string(rune('A'+offset)) + strconv.Itoa(index+1)
			err := f.SetCellValue("Sheet1", cell, item)
			if err != nil {
				panic(err)
			}
		}
	}

	// 读取第一列列宽，默认为 9.14
	colWidth, err := f.GetColWidth("Sheet1", "A")
	if err != nil {
		panic(err)
	}
	fmt.Printf("第一列列宽: %.2f\n", colWidth)

	// 设置第一列列宽为20
	err = f.SetColWidth("Sheet1", "A", "A", 20)
	if err != nil {
		panic(err)
	}

	// 保存到文件中，这一步才会真正创建文件
	// 如果文件已经存在则会覆盖,如果文件已经被其他进程打开则会报错
	err = f.SaveAs("测试.xlsx")
	if err != nil {
		panic(err)
	}
}
```

输出结果

![image-20230410121250346](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230410121250346.png)

:::

<br />

### 单元格对齐

::: details （1）垂直对齐

```go
package main

import (
	"fmt"
	"github.com/xuri/excelize/v2"
	"strconv"
)

func main() {
	// 通过默认模板创建File对象,注意这并不会真正创建文件
	f := excelize.NewFile()
	defer func() { _ = f.Close() }()

	// 定义多行数据
	data := [][]any{
		{"用户名", "密码"},
		{"zhangsan", "12345"},
		{"lisi", "12345"},
		{"wangwu", "12345"},
	}

	// 写入多行数据
	for index, row := range data {
		for offset, item := range row {
			cell := string(rune('A'+offset)) + strconv.Itoa(index+1)
			err := f.SetCellValue("Sheet1", cell, item)
			if err != nil {
				panic(err)
			}
		}
	}
	// 设置第一行行高为20
	err := f.SetRowHeight("Sheet1", 1, 20)
	if err != nil {
		panic(err)
	}

	// 垂直对齐
	// center 垂直居中
	// top    顶端对齐
	// bottom 底端对齐
	style, err := f.NewStyle(&excelize.Style{
		Alignment: &excelize.Alignment{
			Vertical: "center",
		},
	})

	// 为第一行和第二行设置样式
	// 1：从第几行开始，包含此行
	// 2：在第几行结束，包含此行
	err = f.SetRowStyle("Sheet1", 1, 2, style)
	if err != nil {
		fmt.Println(err)
		return
	}

	// 保存到文件中，这一步才会真正创建文件
	// 如果文件已经存在则会覆盖,如果文件已经被其他进程打开则会报错
	err = f.SaveAs("测试.xlsx")
	if err != nil {
		panic(err)
	}
}
```

输出结果



:::

::: details （2）水平对齐

```go
package main

import (
	"fmt"
	"github.com/xuri/excelize/v2"
	"strconv"
)

func main() {
	// 通过默认模板创建File对象,注意这并不会真正创建文件
	f := excelize.NewFile()
	defer func() { _ = f.Close() }()

	// 定义多行数据
	data := [][]string{
		{"用户名", "密码", "邮箱"},
		{"zhangsan", "12345", "zhangsan@qq.com"},
		{"lisi", "12345", "lisi@qq.com"},
		{"wangwu", "12345", "wangwu@qq.com"},
	}

	// 写入多行数据
	for index, row := range data {
		for offset, item := range row {
			cell := string(rune('A'+offset)) + strconv.Itoa(index+1)
			err := f.SetCellValue("Sheet1", cell, item)
			if err != nil {
				panic(err)
			}
		}
	}

	// 水平对齐
	// left 	左对齐
	// right 	右对齐
	// center   居中对齐
	// fill     填充,当把单元格列宽调大以后，会使用内容重复填充
	style, err := f.NewStyle(&excelize.Style{
		Alignment: &excelize.Alignment{
			Horizontal: "center",
		},
	})

	// 为第一行和第二行设置样式
	// 1：从第几行开始，包含此行
	// 2：在第几行结束，包含此行
	err = f.SetRowStyle("Sheet1", 1, 2, style)
	if err != nil {
		fmt.Println(err)
		return
	}

	// 保存到文件中，这一步才会真正创建文件
	err = f.SaveAs("测试.xlsx")
	if err != nil {
		panic(err)
	}
}
```

:::

::: details （3）文本是否自动换行

```go
	// 文本是否自动换行，默认为false
	style, err := f.NewStyle(&excelize.Style{
		Alignment: &excelize.Alignment{
			WrapText: true,
		},
	})
```

:::

::: details （4）文本旋转角度

```go
	// 文本旋转角度,可选值为0、90、180、270，默认为0
	style, err := f.NewStyle(&excelize.Style{
		Alignment: &excelize.Alignment{
			TextRotation: 180,
		},
	})
```

:::

<br />

### 单元格填充

::: details （1）设置背景颜色

```go
	// 单元格填充
	//   Type    填充类型，可选值包括 pattern(图案填充)
	//   Pattern 图案填充类型，内置18种填充类型，比如1代表实心填充样式，仅在Type="pattern"下有效
	//   Color   填充颜色
	style, err := f.NewStyle(&excelize.Style{
		Fill: excelize.Fill{
			Type:    "pattern",
			Pattern: 1,
			Color:   []string{"#9BC2E6"},
		},
	})
```

:::

<br />

### 单元格字体

::: details （1）设置字体

```go
	// 单元格字体
	//   Bold      是否加粗
	//   Italic    是否倾斜
	//   Underline 是否添加下划线
	//   Strike    是否添加删除线
	//   Family    字体类型
	//   Size      字体大小
	//   Color     字体颜色
	//   VertAlign 字体对齐方式
	// 中文的字体颜色要暗一些，如何调整？
	style, err := f.NewStyle(&excelize.Style{
		Font: &excelize.Font{
			Bold:  true,
			Size:  15,
			Color: "#FF00FF",
		},
	})
```

:::

<br />

### 单元格边框

::: details 点击查看详情

```go
	// 单元格
	//   Type  边框类型,可选值 "left"、"right"、"top"、"bottom
	//   Color 边框颜色
	//   Style 边框样式
	//			0：无边框
	//			1：实线边框
	//			2：虚线边框
	//			3：点状边框
	//			4：双线边框
	//			5：粗实线边框
	//			6：细实线边框
	//			7：粗虚线边框
	//			8：细虚线边框
	//			9：粗点状边框
	//			10：细点状边框
	//			11：粗双线边框
	//			12：细双线边框
	style, err := f.NewStyle(&excelize.Style{
		Border: []excelize.Border{
			{Type: "left", Color: "#FF0000", Style: 1},
			{Type: "right", Color: "#00FF00", Style: 2},
			{Type: "top", Color: "#0000FF", Style: 3},
			{Type: "bottom", Color: "#FF0000", Style: 4},
		},
	})
```

:::

<br />

### 单元格格式

::: details 点击查看详情

```go
	// 单元格格式，支持100+种格式类型
	//0：常规格式
	//1：带有一位小数的数字格式
	//2：带有两位小数的数字格式
	//3：带有货币符号和两位小数的数字格式
	//4：带有日期格式的数字格式
	//5：带有时间格式的数字格式
	//6：带有百分比格式的数字格式
	//7：带有科学计数法格式的数字格式
	//8：文本格式
	//9：带有特殊格式的文本
	//14：带有日期格式的数字格式，格式为"mm-dd-yy"
	//22：带有日期和时间格式的数字格式，格式为"m/d/yy h:mm"
	//49：带有文本格式的数字格式，如果单元格包含数字，则将其视为文本

	// CustomNumFmt 字段允许用户自定义单元格的数字格式。格式字符串由一个或多个代码组成，每个代码代表一个数字或日期/时间部分。以下是一些示例：
	//"0.00"：显示小数点后两位的数字
	//"#,##0"：千分位分隔符格式，不显示小数位
	//"0.00%;[Red]0.00%"：显示百分比格式，如果值为负数则显示为红色
	//"yyyy-mm-dd"：日期格式，显示为年-月-日
	//"h:mm AM/PM"：时间格式，显示为小时:分钟 AM/PM

	style, err := f.NewStyle(&excelize.Style{
		NumFmt:       14,
		CustomNumFmt: func() *string { s := "yyyy-mm-dd hh:mm:ss"; return &s }(),
	})
```

:::

<br />

### 单元格保护

::: details 点击查看详情

代码测试没通过

```go
	// 单元格格式,设置Locker为true，有啥用？
	style, err := f.NewStyle(&excelize.Style{
		Protection: &excelize.Protection{
			Locked: true,
			Hidden: true,
		},
	})

	err = f.SetCellStyle("Sheet1", "B1", "B1", style)
	if err != nil {
		panic(err)
	}
```

:::

<br />

## 工作表

### 新建工作表

::: details 点击查看详情

```go
package main

import (
	"fmt"
	"github.com/xuri/excelize/v2"
)

func main() {
	// 通过默认模板创建File对象,注意这并不会真正创建文件
	f := excelize.NewFile()
	defer func() { _ = f.Close() }()

	// 创建一个新的工作表
	// 默认情况下会有一个工作表，名称是Sheet1
	// 返回索引，索引从0开始，所以这里应该返回1
	index, err := f.NewSheet("Sheet2")
	if err != nil {
		panic(err)
	}
	fmt.Println("Sheet index: ", index)

	// 设置当前工作表格为激活状态
	f.SetActiveSheet(index)

	// 保存到文件中，这一步才会真正创建文件
	// 如果文件已经存在则会覆盖,如果文件已经被其他进程打开则会报错
	err = f.SaveAs("测试.xlsx")
	if err != nil {
		panic(err)
	}
}
```

输出结果

![image-20230409201054141](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230409201054141.png)

:::