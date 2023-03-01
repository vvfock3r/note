# faker

## 说明

* 一般情况下`faker`指的是用于生成大量**虚假的真实数据**，用于测试和开发
* 一般情况下生成大量数据会有一小部分重复
* 所有的Go模块**几乎都不支持**生成中文数据，此时需要考虑一些其他的手段来实现
  * 调用在线接口生成数据
  * 调用外部命令生成数据
  * 内嵌脚本语言生成数据
  * 自己手写虚假数据函数
  * ...
* 个人认为最好的方式是 **使用第三方库** + **自己手写虚假数据函数** 相结合

<br />

## 使用Go第三方模块

Github：[https://github.com/brianvoe/gofakeit](https://github.com/brianvoe/gofakeit)

文档：[https://pkg.go.dev/github.com/brianvoe/gofakeit/v6](https://pkg.go.dev/github.com/brianvoe/gofakeit/v6)

<br />

::: details （1）安装gofakeit

```bash
D:\application\GoLand\example>go get github.com/brianvoe/gofakeit/v6
go: added github.com/brianvoe/gofakeit/v6 v6.20.1
```

:::

::: details （2）生成用户信息

```go
package main

import (
	"fmt"
	"time"

	"github.com/brianvoe/gofakeit/v6"
)

func main() {
	format := "%-18s %-15s %-30s %-15s %-15s\n"
	fmt.Printf(format, "Username", "Password", "Email", "Phone", "Created")
	for i := 0; i < 10; i++ {
		fmt.Printf(
			format,
			gofakeit.Username(),
			gofakeit.Password(true, true, true, true, false, 12),
			gofakeit.Email(),
			gofakeit.Phone(),
			gofakeit.DateRange(time.Now().AddDate(-5, 0, 0), time.Now()).Format(time.DateTime),
		)
	}
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
Username           Password        Email                          Phone           Created     
Breitenberg2121    dTp8AW$J6.&G    cortezferry@wolf.biz           9865090801      2019-05-11 19:30:19
Conn3643           Ag(w<nV$_P3J    autumnhirthe@batz.biz          2809772716      2023-01-16 05:25:37
Ernser6827         (49AcBjOd*%J    murielmorar@cruickshank.net    5649474666      2020-01-04 10:09:55
Hirthe5070         4FUsWj?Nq11z    isabelstokes@zieme.info        1230251729      2022-05-29 13:31:28
Rath8592           (s_cMgew0hTN    lenniefeil@schuster.biz        4078951563      2022-05-02 07:01:16
Nicolas8021        Y67uf0gb&x7f    florineshanahan@stamm.info     2522916686      2022-07-15 23:53:02
Marks2108          W7_q$bXA-VH:    elsehayes@thiel.io             4575615410      2020-05-04 13:47:06
Ondricka5913       nB@qk=1BXDpI    stephenmohr@hoeger.name        1247716221      2022-02-10 22:53:49
Sporer4601         j35uk:>oSd:Y    coralielittel@mckenzie.com     5668375535      2018-03-26 15:08:34
Borer6711          h8B=nMl?Wr4>    kittyturner@abbott.io          5239053471      2022-06-01 05:19:27
```

:::

::: details （3）解析结构体

```go
package main

import (
	"fmt"
	"time"

	"github.com/brianvoe/gofakeit/v6"
)

type User struct {
	Username string `fake:"{username}"`
	Password string `fake:"{password}"`
	Created  time.Time
}

func main() {
	var u User
	err := gofakeit.Struct(&u)
	if err != nil {
		panic(err)
	}
	fmt.Printf("%#v\n", u)
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
main.User{Username:"Kozey7491", Password:"NG|!y7if6pY2", Created:time.Date(1927, time.February, 1, 15, 8, 37, 496554266, time.UTC)}
```

:::

::: details （4）自定义数据

```go
package main

import (
	"fmt"

	"github.com/brianvoe/gofakeit/v6"
)

func main() {
	data := []string{
		"北京", "上海", "天津", "重庆", "哈尔滨", "长春", "沈阳", "呼和浩特", "石家庄",
		"乌鲁木齐", "兰州", "西宁", "西安", "银川", "郑州", "济南", "太原", "合肥", "武汉",
		"长沙", "南京", "成都", "贵阳", "昆明", "南宁", "拉萨", "杭州", "南昌", "广州", "福州",
		"台北", "海口", "香港", "澳门", "通辽", "兴安盟", "太原", "辛集", "邯郸", "沈阳",
		"辽阳", "兴城", "北镇", "阜新", "哈尔滨", "齐齐哈尔", "淮安", "张家港", "海门", "六安",
		"巢湖", "马鞍山", "永安", "宁德", "嘉禾", "荆门", "潜江", "大冶", "宜都", "佛山", "深圳",
		"潮州", "惠州", "汕尾", "东莞", "梧州", "柳州", "合山", "六盘水", "关岭",
	}
	for i := 0; i < 10; i++ {
		fmt.Println(gofakeit.RandomString(data))
	}
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
六盘水
巢湖
北镇
东莞
通辽
潮州
南昌
贵阳
石家庄
辛集

# 如果是这样来生成中文数据的话，那么直接自己写个函数即可，不需要依赖 gofakeit.RandomString
```

:::

<br />

## 调用外部命令生成中文数据

Faker官网：[https://fakerjs.dev/](https://fakerjs.dev/)

Python库

* Github：[https://github.com/joke2k/faker](https://github.com/joke2k/faker)

* 文档：[https://faker.readthedocs.io/](https://faker.readthedocs.io/)

::: details （1）安装Python faker库

```bash
# 安装Python库,用于生成假数据
D:\application\GoLand\example>python -m pip install faker

# 测试一下faker命令
D:\application\GoLand\example>faker -l zh_CN address
江苏省婷婷市南长史路g座 169392

# 测试一下库
D:\application\GoLand\example>python -c "from faker import Faker; fake = Faker(['zh_CN']); print(fake.name())"
陈雪梅
```

:::

::: details （2）Go调用Python代码

```go
package main

import (
	"fmt"
	"os/exec"
	"time"
	"unicode/utf8"

	"golang.org/x/text/encoding/simplifiedchinese"
)

// 生成随机中文姓名
func RandomChineseName() (string, error) {
	// Python代码
	var pyCode = `
#!/usr/bin/env python
# --*-- coding:utf-8 --*--
from faker import Faker
fake = Faker(['zh_CN'])
print(fake.name(), end="")
`
	// 实例化Command对象
	cmd := exec.Command("python", "-c", pyCode)

	// 执行Shell命令
	output, err := cmd.CombinedOutput()
	if err != nil {
		return "", err
	}

	// Windows CMD下需要转为UTF-8编码
	if !utf8.Valid(output) {
		output, err = simplifiedchinese.GB18030.NewDecoder().Bytes(output)
		if err != nil {
			return "", nil
		}
	}

	// 返回结果
	return string(output), nil
}

func main() {
	// 统计耗时
	start := time.Now()
	defer func() {
		used := time.Since(start).Milliseconds()
        fmt.Printf("Used: %d milliseconds\n", used)
	}()

	// 生成随机中文姓名
	name, err := RandomChineseName()
	if err != nil {
		panic(err)
	}

	// 输出结果
	fmt.Printf("Data: %s\n", name)	
}
```

输出结果

```bash
# Windows
D:\application\GoLand\example>go run main.go
Data: 周梅
Used: 358 milliseconds

# Linux
[root@ap-hongkang example]# go run main.go
Data: 吴婷婷
Used: 133 milliseconds

# 总结：
# 1、能完美完成任务
# 2、生成速度需要优化
```

:::

::: details （3）Python代码的存放位置

**第一种**

```go
	// Python代码
	var pyCode = `
#!/usr/bin/env python
# --*-- coding:utf-8 --*--
from faker import Faker
fake = Faker(['zh_CN'])
print(fake.name(), end="")
`

	// 实例化Command对象
	cmd := exec.Command("python", "-c", pyCode)
    
// 分析：巨丑
```

**第二种**

```go
	// Python代码
	var pyCode = []string{
		"#!/usr/bin/env python",
		"# --*-- coding:utf-8 --*--",
		"from faker import Faker",
		"fake = Faker(['zh_CN'])",
		"print(fake.name(), end='')",
	}

	// 实例化Command对象
	cmd := exec.Command("python", "-c", strings.Join(pyCode, "\n"))

// 分析：适合小代码量
```

**第三种**

`main.py`

```python
#!/usr/bin/env python
# --*-- coding:utf-8 --*--

from faker import Faker
fake = Faker(['zh_CN'])
print(fake.name(), end="")
```

`main.go`

```go
	// Python代码
	pyCode, err := os.ReadFile("main.py")
	if err != nil {
		return "", err
	}

	// 实例化Command对象
	cmd := exec.Command("python", "-c", string(pyCode))

// 分析：适合大代码量，Go编译后需要依赖外部Python文件，这个问题可以通过embda来解决
```

**其他**

可以使用Go语言模板与上面几种方式组合

:::

::: details （4）代码优化：支持调用任意多个方法

```go
package main

import (
	"errors"
	"fmt"
	"os/exec"
	"strings"
	"text/template"
	"time"
	"unicode/utf8"

	"golang.org/x/text/encoding/simplifiedchinese"
)

// 生成随机数据
func PythonFakerInterface(funcList []string) ([]string, error) {
	if len(funcList) <= 0 {
		return nil, errors.New("function list cannot be empty")
	}

	// Python代码
	var pyCodeTpl = []string{
		"#!/usr/bin/env python",
		"# --*-- coding:utf-8 --*--",
		"from faker import Faker",
		"fake = Faker(['zh_CN'])",
		"{{- range $index, $function := . }}",
		"print(fake.{{ $function }},end=',')",
		"{{- end -}}",
	}

	// 解析模板
	tpl, err := template.New("py").Parse(strings.Join(pyCodeTpl, "\n"))
	if err != nil {
		return nil, err
	}

	// 渲染模板
	var buf strings.Builder
	err = tpl.Execute(&buf, funcList)
	if err != nil {
		return nil, err
	}

	// 实例化Command对象
	cmd := exec.Command("python", "-c", buf.String())

	// 执行Shell命令
	output, err := cmd.CombinedOutput()
	if err != nil {
		return nil, err
	}

	// Windows CMD下需要转为UTF-8编码
	if !utf8.Valid(output) {
		output, err = simplifiedchinese.GB18030.NewDecoder().Bytes(output)
		if err != nil {
			return nil, nil
		}
	}

	// 返回结果
	result := strings.Split(string(output), ",")
	return result[:len(result)-1], nil
}

func main() {
	// 统计耗时
	start := time.Now()
	defer func() {
		used := time.Since(start).Milliseconds()
		fmt.Printf("Used: %d milliseconds\n", used)
	}()

	// 定义函数列表
	functionList := []string{
		"country()",        // 国
		"province()",       // 省
		"city()",           // 市或县
		"district()",       // 区
		"street_address()", // 路
	}

	// 生成数据
	name, err := PythonFakerInterface(functionList)
	if err != nil {
		panic(err)
	}

	// 输出结果
	fmt.Printf("Data: %#v\n", name)
}
```

:::

<br />

## 自己编写特定数据随机函数

### 1、初始化

::: details （1）定义一个空结构体，用于集中管理函数

```go
package main

import (
	"fmt"
	"math/rand"
)

type Faker struct{}

func NewFaker() *Faker {
	return &Faker{}
}

func main() {

}
```

:::

::: details （2）定义计算概率的方法，在某些时候可能很有用

```go
package main

import (
	"fmt"
	"math/rand"
)

type Faker struct{}

func NewFaker() *Faker {
	return &Faker{}
}

// True 每次调用本函数, 有percent%的概率返回true, 有(100-percent)%的概率返回false
// percent >= 100 时永远返回true, percent <= 0 时永远返回false
func (f *Faker) True(percent int) bool {
	if percent >= 100 {
		return true
	}
	if percent <= 0 {
		return false
	}
	return rand.Intn(100)+1 <= percent
}

func main() {
	faker := NewFaker()
	for i := 0; i < 10; i++ {
		fmt.Println(faker.True(20))
	}
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
false
false
false
false
true 
true 
false
false
false
false
```

:::

<br />

### 2、城市名称

::: details 核心代码如下

```go
func (f *Faker) City() string {
	data := []string{
		"北京", "上海", "天津", "重庆", "哈尔滨", "长春", "沈阳", "呼和浩特", "石家庄",
		"乌鲁木齐", "兰州", "西宁", "西安", "银川", "郑州", "济南", "太原", "合肥", "武汉",
		"长沙", "南京", "成都", "贵阳", "昆明", "南宁", "拉萨", "杭州", "南昌", "广州", "福州",
		"台北", "海口", "香港", "澳门", "通辽", "兴安盟", "太原", "辛集", "邯郸", "沈阳",
		"辽阳", "兴城", "北镇", "阜新", "哈尔滨", "齐齐哈尔", "淮安", "张家港", "海门", "六安",
		"巢湖", "马鞍山", "永安", "宁德", "嘉禾", "荆门", "潜江", "大冶", "宜都", "佛山", "深圳",
		"潮州", "惠州", "汕尾", "东莞", "梧州", "柳州", "合山", "六盘水", "关岭",
	}
	return data[rand.Intn(len(data))]
}

func main() {
	faker := NewFaker()
	for i := 0; i < 10; i++ {
		fmt.Println(faker.City())
	}
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
沈阳
北镇
海口
巢湖
海门
长春
长沙
长春
南京
台北
```

:::

<br />

### 3、等待补充