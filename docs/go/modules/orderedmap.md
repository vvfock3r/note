# orderedmap

## iancoleman/orderedmap

Github：[https://github.com/iancoleman/orderedmap](https://github.com/iancoleman/orderedmap)

### 安装依赖

```bash
go get github.com/iancoleman/orderedmap
```

<br />

### 操作示例

::: details （1）增删改查

```go
package main

import (
	"fmt"
	"strconv"

	"github.com/iancoleman/orderedmap"
)

func main() {
	// 实例化
	o := orderedmap.New()

	// 设置是否转义HTML字符, 默认为true
	o.SetEscapeHTML(false)

	// 添加或修改值, 等效于普通Map操作: o["1"] = 1
	for i := 0; i < 5; i++ {
		o.Set(strconv.Itoa(i), i)
	}

	// 获取值, 等效于普通Map操作: val, ok := o["1"]
	val, ok := o.Get("1")
	if ok {
		fmt.Println(val)
	}

	// 遍历值
	keys := o.Keys()
	for _, k := range keys {
		v, _ := o.Get(k)
		fmt.Println(v)
	}

	// 删除值, 等效于普通Map操作: delete(o, "1")
	o.Delete("1")
}
```

:::

::: details （2）排序

```go

```

:::

<br />

### 原理分析

<br />

## elliotchance/orderedmap

Github：[https://github.com/elliotchance/orderedmap](https://github.com/elliotchance/orderedmap)

