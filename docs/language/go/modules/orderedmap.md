# orderedmap

## iancoleman/orderedmap

Github：[https://github.com/iancoleman/orderedmap](https://github.com/iancoleman/orderedmap)

文档：[https://pkg.go.dev/github.com/iancoleman/orderedmap](https://pkg.go.dev/github.com/iancoleman/orderedmap)

<br />

### 安装依赖

```bash
go get github.com/iancoleman/orderedmap
```

<br />

### 使用方法

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
	for _, k := range o.Keys() {
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
package main

import (
	"fmt"
	"sort"
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

	// 通过key来排序, 源码如下
	// SortKeys Sort the map keys using your sort func
	//func (o *OrderedMap) SortKeys(sortFunc func(keys []string)) {
	//	sortFunc(o.keys)
	//}
	o.SortKeys(func(keys []string) {
		sort.Slice(keys, func(i, j int) bool {
			return keys[i] > keys[j] // 从大到小排序
		})
	})

	for _, k := range o.Keys() {
		v, _ := o.Get(k)
		fmt.Println(v)
	}
	fmt.Println()

	// 通过key或value排序
	o.Sort(func(a *orderedmap.Pair, b *orderedmap.Pair) bool {
		return a.Value().(int) < b.Value().(int)
	})

	for _, k := range o.Keys() {
		v, _ := o.Get(k)
		fmt.Println(v)
	}
}
```

输出结果

```bash
4
3
2
1
0
 
0
1
2
3
4
```

:::

::: details （3）JSON序列化

```go
package main

import (
	"encoding/json"
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
	for i := 0; i < 11; i++ {
		o.Set(strconv.Itoa(i), i)
	}

	// JSON序列化, 序列化后是真的丑
	data, err := o.MarshalJSON()
	if err != nil {
		return
	}
	fmt.Println(string(data))
	fmt.Println()

	// 使用原生的序列化方法, 这样就又是无序的了
	data2, err := json.MarshalIndent(o.Values(), "", "    ")
	if err != nil {
		return
	}
	fmt.Println(string(data2))
	fmt.Println()

	// JSON反序列化
	o2 := orderedmap.New()
	err = o2.UnmarshalJSON(data)
	if err != nil {
		return
	}
	for _, k := range o.Keys() {
		v, _ := o.Get(k)
		fmt.Println(v)
	}
}
```

输出结果

```bash
{"0"
:0
,"1"
:1
,"2"
:2
,"3"
:3
,"4"
:4
,"5"
:5
,"6"
:6
,"7"
:7
,"8"
:8
,"9"
:9
,"10"
:10
}

{
    "0": 0,
    "1": 1,
    "10": 10,
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9
}

0
1
2
3
4
5
6
7
8
9
10
```

:::

<br />

### 原理分析

::: details 点击查看详情

```go
type OrderedMap struct {
	keys       []string					// 保存map所有的key, 这是有序的关键
	values     map[string]interface{}	// 原本的map
	escapeHTML bool
}

func New() *OrderedMap {
	o := OrderedMap{}
	o.keys = []string{}
	o.values = map[string]interface{}{}
	o.escapeHTML = true
	return &o
}

func (o *OrderedMap) Get(key string) (interface{}, bool) {
	val, exists := o.values[key]
	return val, exists
}

func (o *OrderedMap) Set(key string, value interface{}) {
	_, exists := o.values[key]
	if !exists {
		o.keys = append(o.keys, key)
	}
	o.values[key] = value
}

func (o *OrderedMap) Delete(key string) {
	// check key is in use
	_, ok := o.values[key]
	if !ok {
		return
	}
	// remove from keys
	for i, k := range o.keys {
		if k == key {
			o.keys = append(o.keys[:i], o.keys[i+1:]...)
			break
		}
	}
	// remove from values
	delete(o.values, key)
}

func (o *OrderedMap) Keys() []string {
	return o.keys
}

func (o *OrderedMap) Values() map[string]interface{} {
	return o.values
}

// 有序性
// 1、如果只是为了有序, 实现是非常简单的, 利用切片的有序性来保持顺序
// 2、后面为了实现排序和序列化, 代码量大一些, 也比较复杂, 就不深入研究了
//
// 优点
// 1、支持排序和序列化
// 2、源码简单
// 
// 缺点
// 1、只支持字符串为key
// 2、序列化后几乎不可读
// 3、性能一般, 增加和删除会涉及到切片的扩缩容
```

:::

<br />

## elliotchance/orderedmap

Github：[https://github.com/elliotchance/orderedmap](https://github.com/elliotchance/orderedmap)

文档：[https://pkg.go.dev/github.com/elliotchance/orderedmap/v2](https://pkg.go.dev/github.com/elliotchance/orderedmap/v2)

<br />

### 安装依赖

```bash
go get github.com/elliotchance/orderedmap/v2
```

<br />

### 使用方法

::: details （1）增删改查

```go
package main

import (
	"fmt"

	"github.com/elliotchance/orderedmap/v2"
)

func main() {
	// 实例化
	m := orderedmap.NewOrderedMap[any, any]()

	// 添加数据
	m.Set("foo", "bar")
	m.Set("123", true)
	m.Set("qux", 1.23)
	m.Set("ping", "pong")
	m.Set(123, 456)

	// 查询数据
	value, ok := m.Get(123)
	if ok {
		fmt.Printf(`{%#v: %v}`+"\n", 123, value)
		fmt.Println()
	}

	// 删除数据, 返回值代表删除前是否存在此key
	didDelete := m.Delete("qux")
	fmt.Println(didDelete)
	fmt.Println()

	// 遍历数据 - 适用于少量数据
	for _, key := range m.Keys() {
		value, _ := m.Get(key)
		fmt.Printf(`{%#v: %v}`+"\n", key, value)
	}
	fmt.Println()

	// 遍历数据 - 适用于大量数据 - 正序遍历
	for el := m.Front(); el != nil; el = el.Next() {
		fmt.Printf(`{%#v: %v}`+"\n", el.Key, el.Value)
	}
	fmt.Println()

	// 遍历数据 - 适用于大量数据 - 倒序遍历
	for el := m.Back(); el != nil; el = el.Prev() {
		fmt.Printf(`{%#v: %v}`+"\n", el.Key, el.Value)
	}
    
    // PS: Front 和 Back 这不就是双向链表中的方法嘛
}
```

输出结果

```bash
{123: 456}

true          
              
{"foo": bar}  
{"123": true} 
{"ping": pong}
{123: 456}    

{"foo": bar}  
{"123": true} 
{"ping": pong}
{123: 456}    

{123: 456}    
{"ping": pong}
{"123": true} 
{"foo": bar}
```

:::

<br />

### 原理分析

::: details 点击查看详情

```go
type OrderedMap[K comparable, V any] struct {
	kv map[K]*Element[K, V]
	ll list[K, V]
}

func NewOrderedMap[K comparable, V any]() *OrderedMap[K, V] {
	return &OrderedMap[K, V]{
		kv: make(map[K]*Element[K, V]),
	}
}

// 简单分析
// 1、使用了泛型
// 2、并没有使用Go内置的双向链表, 而是自己实现的
//
// 有序性
// 通过双向链表的头部遍历或尾部遍历来实现有序性
//
// 优点
// 1、key支持任意类型
// 2、内置很多骚操作方法
// 3、性能高
// 
// 缺点
// 1、不能自定义排序
// 2、不支持序列化, 简单尝试了一下没有成功
// 3、代码比较复杂, 不易看懂
```

:::

<br />

## 简答总结一下

* 以上两个库虽然都是有序Map，但是实现原理、提供的方法、特性却大不相同
* 一般情况下，使用基于 **切片** 的有序Map即可，对于其他情况可以考虑基于 **双向链表** 的有序Map

