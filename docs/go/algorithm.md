# 算法简介

注意：

* 以下代码需要保证使用Go 1.20+，否则我们需要自己手动初始化随机数种子

<br />

## 生成随机密码

要求：

* 编写一个函数可以生成随机密码
* 函数第一个参数指定生成的密码位数
* 返回的密码至少包含一位【数字、小写字母、大写字母、特殊符号】

::: details 点击查看详情

```go
package main

import (
	"fmt"
	"math/rand"
	"strings"
)

// GenerateRandomPassword 生成随机密码, length必须 >=4
func GenerateRandomPassword(length int) (string, error) {
	if length < 4 {
		return "", fmt.Errorf("length must be greater than or equal to 4")
	}

	// 定义原始的数据源,a-z/A-Z等并没有动态生成是为了避免性能损耗
	const (
		number    = "0123456789"
		lowercase = "abcdefghijklmnopqrstuvwxyz"
		uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
		special   = "!@#$%^&*()_+{}[]|:<>?"
	)

	// 所有数据源组成一个切片,以备后用
	sourceSlice := []string{number, lowercase, uppercase, special}

	// 合并所有数据源,字符串拼接使用strings.Join也是为了提高性能
	chars := strings.Join(sourceSlice, "")

	// 定义密码
    // 这里虽然可以直接定义为 []string, 但并不推荐
    // 因为后面取随机字符的时候取出来的是byte类型,还要转换到string
    // 不如直接定义为byte, 在函数返回的时候做一次转换即可
	password := make([]byte, length)

	// 至少包含一位 数字、小写字母、大写字母、特殊符号
	/*
		若将代码展开类似与下面这样
		password[0] = number[rand.Intn(len(number))]
		password[1] = lowercase[rand.Intn(len(lowercase))]
		password[2] = uppercase[rand.Intn(len(uppercase))]
		password[3] = special[rand.Intn(len(special))]
	*/
	for i, source := range sourceSlice {
		password[i] = source[rand.Intn(len(source))]
	}

	// 填充剩余字符
	for i := len(sourceSlice); i < length; i++ {
		password[i] = chars[rand.Intn(len(chars))]
	}

	// 打乱排序
	rand.Shuffle(length, func(i, j int) {
		password[i], password[j] = password[j], password[i]
	})

	return string(password), nil
}

func main() {
	for i := 0; i < 10; i++ {
		password, err := GenerateRandomPassword(4)
		if err != nil {
			panic(err)
		}
		fmt.Println(password)
	}
}
```

输出结果

```bash
Qc*5
In6&
9z)M
xC$0
6|pD
!oV6
t4S%
Ft5&
_E6a
aJ5@
```

:::

<br />

## 生成随机概率

要求：

* 编写一个函数，返回布尔值
* 第一个参数代表 返回为真的概率有多少

::: details 点击查看详情

```go
package main

import (
	"fmt"
	"math/rand"
)

// ProbabilityTrue 指定为True的概率是多少并返回实际的布尔值
func ProbabilityTrue(percent float64) bool {
	if percent >= 100 {
		return true
	}
	if percent <= 0 {
		return false
	}
	// 生成一个1-100的随机数
	// 若小于等于指定的概率则返回true,否则返回false
	// 乘 1000 是为了避免浮点数精度问题可能带来的误差
	return (rand.Intn(100)+1)*1000 <= int(percent*1000)
}

func main() {
	// 简单测试
	for i := 0; i < 10; i++ {
		fmt.Println(ProbabilityTrue(30))
	}

	// 做一个大循环,然后统计ture和false出现的次数
	var trueCount, falseCount int
	for i := 0; i < 1000*10000; i++ {
		ret := ProbabilityTrue(50.9)
		if ret {
			trueCount++
		} else {
			falseCount++
		}
	}
	fmt.Printf("True : %d\n", trueCount)
	fmt.Printf("False: %d\n", falseCount)
}
```

输出结果

```bash
false
false
true
false
false
true
false
false
true
True : 5000389
False: 4999611
```

:::

<br />

## 二分查找算法

要求：

* 编写一个函数实现二分查找
* 第一个参数是数列，第二个参数是要寻找的元素
* 若找到则返回元素的索引，未找到则返回-1
* 要求同时支持升序和降序数列

::: details 点击查看详情

```go
package main

import (
	"fmt"
	"strconv"
)

// binarySearch 二分查找,返回找到的第一个元素的索引,未找到则返回-1
// 要求source必须是已排好序的切片,可以是升序也可以是降序
func binarySearch(source []int, target int) int {
	// 若是空切片直接返回-1
	if len(source) == 0 {
		return -1
	}

	// 取第一个元素的索引和最后一个元素的索引
	left, right := 0, len(source)-1

	// 检查序列是否是升序, true为升序, false为降序
	asc := source[left] < source[right]

	// 核心算法
	for left <= right {
		// 取中间值, /会省略小数, eg: 99 / 10 = 9
		mid := (left + right) / 2
		if source[mid] == target {
			return mid
		}

		// 升序情况下
		if asc {
			if source[mid] < target {
				left = mid + 1
			} else {
				right = mid - 1
			}
			continue
		}

		// 降序情况下
		if source[mid] < target {
			right = mid - 1
		} else {
			left = mid + 1
		}
	}
	return -1
}

func main() {
	// 定义数据
	sourceSlice := [][]int{
		{},
		{7},
		{1, 3, 5, 7, 9},
		{9, 7, 5, 3, 1},
	}
	target := 7

	// 输出表头
	format := "%-30s %-10s %-10s\n"
	fmt.Printf(format, "Source", "Target", "Find Index")

	// 二分查找
	for _, source := range sourceSlice {
		index := binarySearch(source, target)
		fmt.Printf(format, fmt.Sprintf("%#v", source), strconv.Itoa(target), strconv.Itoa(index))
	}
}
```

输出结果

```bash
Source                         Target     Find Index
[]int{}                        7          -1        
[]int{7}                       7          0         
[]int{1, 3, 5, 7, 9}           7          3         
[]int{9, 7, 5, 3, 1}           7          1
```

:::

<br />

## 任意数据去重

要求：

* 对一个切片中的数据去重
* 最简单的方式是使用双层for循环，不予考虑

::: details （1）使用Set去重：胜在简单

```go
package main

import (
	"fmt"
	"math/rand"
)

type Set map[any]struct{}

// Add 添加元素到 Set
func (s Set) Add(item any) {
	s[item] = struct{}{}
}

// Remove 从 Set 中移除元素
func (s Set) Remove(item any) {
	delete(s, item)
}

// Contains 检查元素是否存在于 Set 中
func (s Set) Contains(item any) bool {
	_, exists := s[item]
	return exists
}

// GetAll 获取 Set 中的所有元素
func (s Set) GetAll() []any {
	result := make([]any, 0, len(s))
	for item := range s {
		result = append(result, item)
	}
	return result
}

// Size 获取 Set 的大小(元素数量)
func (s Set) Size() int {
	return len(s)
}

type Point struct {
	X int
	y int
}

func main() {
	// 创建一个Set
	set := make(Set)

	// 随机生成10个对象
	for i := 0; i < 10; i++ {
		set.Add(Point{
			X: rand.Intn(3),
			y: rand.Intn(2),
		})
	}

	// 查看去重效果
	fmt.Println(set.Size())
	fmt.Println(set.GetAll())

	// 分析
	// 优点
	//   可以对任何类型数据去重
	//
	// 缺点
	//   对于一些复杂的需求可能完成不了, 比如
	//   1、对指针类型数据无法去重,比如 &Point{X:1, Y:2}
	//   2、不支持对于某个字段来计算去重
}
```

输出结果

```bash
6
[{1 1} {2 0} {0 1} {0 0} {1 0} {2 1}]
```

:::

::: details （2）使用双指针法去重：更加灵活

```go
package main

import (
	"fmt"
	"math/rand"
	"sort"
)

type Point struct {
	X int
	y int
}

func main() {
	// 随机生成10个对象
	var pointSlice []*Point
	for i := 0; i < 10; i++ {
		pointSlice = append(pointSlice, &Point{
			X: rand.Intn(3),
			y: rand.Intn(2),
		})
	}

	// 根据X值先排序
	sort.SliceStable(pointSlice, func(i, j int) bool {
		return pointSlice[i].X > pointSlice[j].X
	})

	// 使用双指针法去重
	// j 代表最后一次正确插入数据的索引,下次插入时需要使用j+1
	// 第一次插入时实际是从索引为1开始的
	var j int
	for _, p := range pointSlice {
		if p.X != pointSlice[j].X {
			j += 1
			pointSlice[j] = p
		}
	}
	pointSlice = pointSlice[:j+1]

	// 查看去重效果
	for _, point := range pointSlice {
		fmt.Println(point)
	}

	// 分析
	// 优点
	//   可以对任何类型数据去重
	//   对于一些复杂的需求也可以完成
	//
	// 缺点
	//   针对个别字段来去重的话,需要提前排序
	//   会遍历所有元素,看时间复杂度是否能接受
	//   没有特别固定的写法,需要根据实际情况编写代码
	//   代码写起来略微复杂,注意特别小心
}
```

输出结果

```bash
&{2 1}
&{1 0}
&{0 0}
```

:::

<br />

## 检查切片深度

