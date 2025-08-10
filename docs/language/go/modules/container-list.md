# container/list

文档：[https://pkg.go.dev/container/list](https://pkg.go.dev/container/list)



## 基础增删改查

::: details 点击查看详情

```go
package main

import (
	"container/list"
	"fmt"
)

func main() {
	// 创建一个新的双向链表
	doublyLinkedList := list.New()

	// 在链表尾部插入元素
	doublyLinkedList.PushBack(1)
	doublyLinkedList.PushBack(2)
	doublyLinkedList.PushBack(3)

	// 在链表头部插入元素
	doublyLinkedList.PushFront(0)
	doublyLinkedList.PushFront(-1)

	// 从头部遍历链表
	for e := doublyLinkedList.Front(); e != nil; e = e.Next() {
		fmt.Println(e.Value)
	}
	fmt.Println()

	// 删除元素2
	for e := doublyLinkedList.Front(); e != nil; e = e.Next() {
		if e.Value == 2 {
			doublyLinkedList.Remove(e)
			break
		}
	}

	// 从尾部遍历链表
	for e := doublyLinkedList.Back(); e != nil; e = e.Prev() {
		fmt.Println(e.Value)
	}
}
```

输出结果

```bash
-1
0 
1 
2 
3 
  
3 
1 
0 
-1
```

:::

<br />

## 打印链表顺序

::: details 点击查看详情

```go
package main

import (
	"container/list"
	"fmt"
)

func PrintList(l *list.List) {
	fmt.Print("List: ")
	for e := l.Front(); e != nil; e = e.Next() {
		fmt.Print(e.Value, " -> ")
	}
	fmt.Println("nil")
}

func main() {
	// 创建一个新的双向链表
	doublyLinkedList := list.New()

	// 在链表尾部插入元素
	for i := 0; i < 3; i++ {
		doublyLinkedList.PushBack(i)
	}

	// 打印链表
	PrintList(doublyLinkedList)
}
```

输出结果

```bash
List: 0 -> 1 -> 2 -> nil
```

:::

<br />

## 两个链表合并

::: details 点击查看详情

```go
package main

import (
	"container/list"
	"fmt"
)

func main() {
	// 创建一个新的双向链表
	dl1 := list.New()
	dl2 := list.New()

	dl1.PushBack(1)
	dl1.PushBack(2)
	dl1.PushBack(3)

	dl2.PushBack(-1)
	dl2.PushBack(-2)
	dl2.PushBack(-3)

	// 在dl1的尾部插入dl2的头部
	dl1.PushBackList(dl2)

	// 在dl1的头部插入dl2的尾部
	//dl1.PushFrontList(dl2)

	// 从头部开始遍历dl1
	for e := dl1.Front(); e != nil; e = e.Next() {
		fmt.Println(e.Value)
	}
}
```

输出结果

```bash
1
2 
3 
-1
-2
-3
```

:::

<br />

## 指定位置插入

::: details 点击查看详情

```go
package main

import (
	"container/list"
	"fmt"
)

func main() {
	// 创建一个新的双向链表
	doublyLinkedList := list.New()

	// 在链表尾部插入元素
	for i := 0; i < 3; i++ {
		doublyLinkedList.PushBack(i)
	}

	// 在某个元素之后插入新元素
	element := doublyLinkedList.PushFront(-1) // 得先有个定位位置的元素
	element = doublyLinkedList.InsertAfter(-2, element)

	// 在某个元素之后插入新元素
	doublyLinkedList.InsertBefore(-3, element)

	// 从头部遍历链表
	for e := doublyLinkedList.Front(); e != nil; e = e.Next() {
		fmt.Println(e.Value)
	}
	fmt.Println()
}
```

:::

<br />

## 移动链表元素

::: details 点击查看详情

```go
package main

import (
	"container/list"
	"fmt"
)

func PrintList(l *list.List) {
	fmt.Print("List: ")
	for e := l.Front(); e != nil; e = e.Next() {
		fmt.Print(e.Value, " -> ")
	}
	fmt.Println("nil")
}

func main() {
	// 创建一个新的双向链表
	doublyLinkedList := list.New()

	// 向链表中添加一些元素
	e1 := doublyLinkedList.PushBack("Element 1")
	e2 := doublyLinkedList.PushBack("Element 2")
	e3 := doublyLinkedList.PushBack("Element 3")
	PrintList(doublyLinkedList)
	fmt.Println()

	// 将e1移动到e2之后
	doublyLinkedList.MoveAfter(e1, e2)
	PrintList(doublyLinkedList)
	fmt.Println()

	// 将e3移动到e1之前
	doublyLinkedList.MoveBefore(e3, e1)
	PrintList(doublyLinkedList)

	// 将元素移动到开头或结尾
	//doublyLinkedList.MoveToBack()
	//doublyLinkedList.MoveToFront()
}
```

输出结果

```bash
List: Element 1 -> Element 2 -> Element 3 -> nil
                                                
List: Element 2 -> Element 1 -> Element 3 -> nil
                                                
List: Element 2 -> Element 3 -> Element 1 -> nil
```

:::

<br />

## 其他函数总结

::: details 点击查看详情

```go
// 用于初始化或清空链表
doublyLinkedList.Init()

// 查看链表长度
fmt.Println(doublyLinkedList.Len())
```

:::

<br />



