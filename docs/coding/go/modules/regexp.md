# regexp

文档：

* [https://pkg.go.dev/regexp](https://pkg.go.dev/regexp)
* [https://pkg.go.dev/regexp/syntax](https://pkg.go.dev/regexp/syntax)

<br />

## 匹配测试 - Match*

Match系列函数用于 **匹配是否包含指定模式的子字符串**，返回 **布尔值** 用于告知是否匹配

::: details 点击查看详情

```go
package main

import (
	"fmt"
	"regexp"
	"strings"
)

func main() {
	// 原始数据
	data := "To be, or not to be, that is the question."

	// 正则表达式 (?i)代表不区分大小写，同时不参与分组
	re := `(?i)(to)(\s)(be)`

	// 字符串匹配
	{
		matched, err := regexp.MatchString(re, data)
		fmt.Println(matched, err)
	}
	// 字节匹配
	{
		matched, err := regexp.Match(re, []byte(data))
		fmt.Println(matched, err)
	}

	// io.RuneReader接口匹配
	{
		matched, err := regexp.MatchReader(re, strings.NewReader(data))
		fmt.Println(matched, err)
	}
}
```

输出 结果

```bash
D:\application\GoLand\demo>go run main.go
true <nil>
true <nil>
true <nil>
```

:::

<br />

## 提前编译 - \*Compile*

**`*Compile*`系列函数让我们提前编译正则表达式，避免使用时临时编译，可以获得更好的性能：**

* `regexp.Compile`：编译正则表达式，返回`*Regexp`和`error`
* `regexp.MustCompile`：编译正则表达式，返回`*Regexp`，当编译遇到错误时它会直接`panic`

**上面两个函数都有对应的`POSIX`函数**

* `regexp.CompilePOSIX`：与`Compile`类似，但是是最左最长匹配
* `regexp.MustCompilePOSIX`：与`MustCompile`l类似，但是是最左最长匹配

**其他说明**

* 推荐使用：可以获得更好的性能
* 注意事项：在代码编译阶段（go build），它不能发现正则表达式中的错误

<br />

::: details （1）regexp.Compile：编译正则时会校验是否有error，正则匹配时不返回error

```go
package main

import (
	"fmt"
	"regexp"
	"strings"
)

func main() {
	// 原始数据
	data := "To be, or not to be, that is the question."

	// 提前编译正则，可以获得更好的性能
	re, err := regexp.Compile(`(?i)(to)(\s)(be)`)
	if err != nil {
		panic(err)
	}

	// 字符串匹配
	{
		matched := re.MatchString(data)
		fmt.Println(matched)
	}
	// 字节匹配
	{
		matched := re.Match([]byte(data))
		fmt.Println(matched)
	}

	// io.RuneReader接口匹配
	{
		matched := re.MatchReader(strings.NewReader(data))
		fmt.Println(matched)
	}
}
```

输出结果

```bash
D:\application\GoLand\demo>go run main.go
true
true
true
```

:::

::: details （2）regexp.MustCompile：不返回错误，而是当编译正则表达式有错误时直接panic；正则匹配时不返回error

```go
package main

import (
	"fmt"
	"regexp"
	"strings"
)

func main() {
	// 原始数据
	data := "To be, or not to be, that is the question."

	// 提前编译正则，可以获得更好的性能
	// MustCompile：不返回错误，而是当有错误时直接panic
	re := regexp.MustCompile(`(?i)(to)(\s)(be)`)

	// 字符串匹配
	{
		matched := re.MatchString(data)
		fmt.Println(matched)
	}
	// 字节匹配
	{
		matched := re.Match([]byte(data))
		fmt.Println(matched)
	}

	// io.RuneReader接口匹配
	{
		matched := re.MatchReader(strings.NewReader(data))
		fmt.Println(matched)
	}
}
```

输出结果

```bash
D:\application\GoLand\demo>go run main.go
true
true
true
```

:::

::: details （3）Compile 和 CompilePOSIX 的区别

```go
package main

import (
	"fmt"
	"regexp"
)

func main() {
	// 定义数据
	str := "foobarbat"

	// (1) 第一个例子
	{
		// 编译正则表达式
		pattern := "foo|foobar"
		rPCRE, _ := regexp.Compile(pattern)
		rPOSIX, _ := regexp.CompilePOSIX(pattern)

		// 查看输出结果有什么不同
		fmt.Println(rPCRE.FindString(str))  // "foo"
		fmt.Println(rPOSIX.FindString(str)) // "foobar"
	}

	// (2) 这里修改正则为 (foobar|foo)
	{
		// 编译正则表达式
		pattern := "foobar|foo"
		rPCRE, _ := regexp.Compile(pattern)
		rPOSIX, _ := regexp.CompilePOSIX(pattern)

		// 查看输出结果有什么不同
		fmt.Println(rPCRE.FindString(str))  // "foobar"
		fmt.Println(rPOSIX.FindString(str)) // "foobar"
	}
}
```

输出结果

```bash
foo
foobar
foobar
foobar
```

:::

<br />

## 提取子串 - Find*

Find*系列用于提取子串，有4、5种类函数，又互相组合成大概有十几个函数

::: details 点击查看详情

```go
package main

import (
	"fmt"
	"regexp"
)

func main() {
	// 原始数据
	data := "To be, or not to be, that is the question."

	// 编译正则表达式 (?i)代表不区分大小写，同时不参与分组
	re := regexp.MustCompile(`(?i)(to)(\s)(be)`)

	// Find        提取子字符串，输入和输出都是字节切片
	// FindString  提取子字符串，输入和输出都是字符串
	// 根据实际情况使用字节版本的还是字符串版本的
	fmt.Println(string(re.Find([]byte(data)))) // To be
	fmt.Println(re.FindString(data))           // To be

	// FindIndex       返回匹配的索引范围，输入字节切片,输出int切片
	// FindStringIndex 返回匹配的索引范围，输入字符串,输出int切片
	fmt.Println(re.FindIndex([]byte(data))) // [0 5]
	fmt.Println(re.FindStringIndex(data))   // [0 5]

	// FindSubmatch 返回一个二维字节切片，第一个元素为匹配的子字符串，后面的元素为分组数据(默认情况下一个括号是一个分组),分组是从1开始计数的
	//              也就是说 FindSubmatch比Find要高级一点，返回的数据种类多一些，可以根据需要来选择哪些数据
	fmt.Println(string(re.FindSubmatch([]byte(data))[0])) // To be
	fmt.Println(string(re.FindSubmatch([]byte(data))[3])) // be，怎么来的呢？因为第3个分组匹配的是be

	// FindAllString 提取所有符合的子字符串，第二个参数代表提取几个，<0的值代表提取所有
	fmt.Printf("%#v\n", re.FindAllString(data, -1)) // []string{"To be", "to be"}

	// FindAllStringSubmatchIndex 提取所有的 匹配的字符串和分组数据 的索引
	// 这个就比较牛逼了, 输出结果是：[[0 5 0 2 2 3 3 5] [14 19 14 16 16 17 17 19]]，下面来解释一下
	// (1) 因为是FindAllxx且个数为-1，所以会提取出所有符合条件的，对应上面 切片的2个元素(同样也是切片)
	// (2) 第一个切片中，0,5代表匹配元素的索引范围， 0,2代表第一个分组的索引范围，2,3代表第二个分组的索引范文，3,5代表第三个分组的索引范围
	// (3) 第二个切片同理
	fmt.Println(re.FindAllStringSubmatchIndex(data, -1))
}
```

输出结果

```bash
D:\application\GoLand\demo>go run main.go
To be
To be                                        
[0 5]                                        
[0 5]                                        
To be                                        
be                                           
[]string{"To be", "to be"}                   
[[0 5 0 2 2 3 3 5] [14 19 14 16 16 17 17 19]]
```

:::

<br />

## 正则替换 - ReplaceAll*

::: details 点击查看详情

```go
package main

import (
	"fmt"
	"regexp"
	"strings"
)

func main() {
	// 原始数据
	data := "To be, or not to be, that is the question."

	// 提前编译正则，可以获得更好的性能
	re := regexp.MustCompile(`(?i)(to)(\s)(be)`)

	// 注意事项
	//   (1) ReplaceAll*替换不会修改原数据
	//   (2) 只有ReplaceAll这一系列函数，意味着只能全部替换; 若要指定替换N次，请看最后面的解决方案

	// (1) ReplaceAll: 全部替换，输入和输出都是字节切片
	fmt.Println("(1) ", string(re.ReplaceAll([]byte(data), []byte("TO BE"))))

	// (2) ReplaceAllString: 全部替换，输入和输出都是字符串
	fmt.Println("(2) ", re.ReplaceAllString(data, "TO BE"))

	// (3) ReplaceAllLiteralString：带Literal字眼的不支持使用分组，请看下面示例
	fmt.Println("(3) ", re.ReplaceAllString(data, "${1}"))        // 这里的${1}指代匹配到的值，可能是to、TO、To、tO, $1代表原值
	fmt.Println("(3) ", re.ReplaceAllLiteralString(data, "${1}")) // 带Literal字眼的不支持使用分组

	// (4) ReplaceAllStringFunc: 带Func字眼的可以让我们传入一个函数，指定要替换的值
	//     不支持${1}
	fmt.Println("(4) ", re.ReplaceAllStringFunc(data, func(s string) string {
		return strings.ToUpper(s) // s代表匹配到的值
	}))

	// 替换N次
	counter := 0       // 这是一个计数器,无须修改
	replaceNumber := 1 // 指定替换几次，根据实际情况修改
	fmt.Println("(5) ", re.ReplaceAllStringFunc(data, func(s string) string {
		if counter >= replaceNumber {
			return s
		}
		counter++
		return re.ReplaceAllString(s, "TO BE")
	}))

	// 仅替换最后N次（为了避免与上面的变量有冲突，这里将代码放到一个单独的块中）
	{
		counter := 0                          // 计数器,无须修改
		matches := re.FindAllString(data, -1) // 匹配项切片
		matchedNumber := len(matches) - 1     // 倒着数，我们要修改前N项，这里就-N，这里修改最后一项匹配，所以-1
		fmt.Println("(6) ", re.ReplaceAllStringFunc(data, func(s string) string {
			if counter >= matchedNumber {
				return re.ReplaceAllString(s, "TO BE")
			}
			counter++
			return s
		}))
	}

	// 查看原始数据
	fmt.Println("(7) ", data)
}
```

输出结果

```bash
D:\application\GoLand\demo>go run main.go
(1)  TO BE, or not TO BE, that is the question.
(2)  TO BE, or not TO BE, that is the question.
(3)  To, or not to, that is the question.      
(3)  ${1}, or not ${1}, that is the question.  
(4)  TO BE, or not TO BE, that is the question.
(5)  TO BE, or not to be, that is the question.
(6)  To be, or not TO BE, that is the question.
(7)  To be, or not to be, that is the question.
```

:::