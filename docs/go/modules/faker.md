# faker

## 说明

* faker用于生成大量**虚假的真实数据**，用于测试和开发
* 所有的Go模块都完美的支持生成英文数据
* 所有的Go模块**几乎都不支持**生成中文数据，此时需要考虑一些其他的手段来实现
  * 调用在线接口生成数据
  * 调用外部命令生成数据（本文档采用此种方法）
  * 内嵌脚本语言生成数据
  * ...


<br />

## 中文数据

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

	// 生成随机中文姓名
	name, err := RandomChineseName()
	if err != nil {
		panic(err)
	}

	// 输出结果
	fmt.Printf("Data: %s\n", name)
	fmt.Printf("Used: %d milliseconds\n", time.Since(start).Milliseconds())
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

::: details （3）存放Python代码的三个位置

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

:::

::: details （4）代码优化：支持调用任意多个方法

```go

```

:::

<br />

## 英文数据

Github：[https://github.com/brianvoe/gofakeit](https://github.com/brianvoe/gofakeit)

文档：[https://pkg.go.dev/github.com/brianvoe/gofakeit/v6](https://pkg.go.dev/github.com/brianvoe/gofakeit/v6)