# GoLand

## 官网

下载地址：[https://www.jetbrains.com/go/](https://www.jetbrains.com/go/)

官方文档：[https://www.jetbrains.com/help/go/2022.3/getting-started.html](https://www.jetbrains.com/help/go/2022.3/getting-started.html)（注意选择合适的版本）

<br />

## 快捷操作

### 快捷键

**系统设置**

* `Ctrl + Alt + S`：设置，注意这与Windows下的QQ屏幕录制快捷键有冲突

**窗口定位**

* `ALT + F1`：选择面板
* `ALT + 1`：打开或隐藏工程面板（第一次会光标定位）
* `ESC`：光标返回代码编辑区域
* `ALT + F12` ：打开或隐藏终端（第一次会光标定位）

**代码操作**

* `CTRL + D`：复制当前行
* `CTRL + X`：剪切当前行
* `Shift`（快速按两次）：全局搜索
* `F2`：快速定位错误
* `Ctrl + Alt + L`：代码格式化
* `Shift + F6`：文件/变量重命名
* `CTRL + F4`：关闭当前文件

<br />

### 代码提示

::: details （1）快速输入for循环

**C风格for循环**

```go
package main

func main() {
	// 输入 fori ---> 回车 ---> 回车 --> 代码
	for i := 0; i < 10; i++ {

	}
}
```

**for range循环**

```go
package main

func main() {
	// 输入 forr ---> 回车 ---> 遍历对象 ---> key ---> value ---> 代码区域
	for i, i2 := range collection {

	}
}
```

:::

::: details （2）快速生成struct、interface等代码

```go
// 方式1
//   在函数外边: 输入 str/stru/struct等快速创建结构体
//   在函数外边: 输入 int/inter等快速创建interface  
// 
// 方式2
//   输入 type, 然后选择创建结构体或interface,在函数内外都适用  

package main

type name struct {
}

type name interface {
}

func main() {
	type name struct {
		
	}
}
```

:::

::: details （3）快速生成函数返回值

```go
package main

func main() {
	// 输入 .var ---> 回车
	// net.Listen("tcp", ":8080").var

	// 效果
	// listen, err := net.Listen("tcp", ":8080")

	// --------------------------------------------------------
	// 输入 .varc ---> 回车
	// net.Listen("tcp", ":8080").varc

	// 效果
	// listen, err := net.Listen("tcp", ":8080")
	// if err != nil {
	//	 return
	// }
}
```

:::

<br />

## 基本配置

### 配色方案

**方式1**

![image-20220806130018188](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220806130018188.png)

**方式2**

![image-20220806123433863](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220806123433863.png)

<br />

### 终端类型

![image-20220806132738315](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220806132738315.png)

<br />

### 字体设置

1、设置菜单字体和字号

![image-20230225133713144](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230225133713144.png)

2、设置代码字体和字号

![image-20230225133619062](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230225133619062.png)

<br />

### 文件监控

![image-20230322101904139](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230322101904139.png)

<br />

### 行分隔符

![image-20230228163013728](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230228163013728.png)

<br />

### 设置DLV

最新版的GoLand有时候不能调试最新版Go SDK，原因是GoLand中的调试工具DLV太旧了，如下图

![image-20230307103943104](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230307103943104.png)

安装最新版DLV并修改GoLand中的路径：`Help ---> Edit Custom Properties...`

```bash
# 设置DLV路径, 任选一种正确的写法即可, 然后重启GoLand
dlv.path=D:/application/GoPath/bin/dlv.exe         # 写法1: 正确写法
dlv.path=D:\\application\\GoPath\\bin\\dlv.exe     # 写法2: 正确写法
dlv.path=D:\application\GoPath\bin\dlv.exe         # 写法3: 错误写法
```

<br />

### 配置内存

`Help ---> Change Memory Settings`

![image-20230307104122350](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230307104122350.png)

<br />

### 配置系统

有一些API在Windows上没有但在Linux上有，此时就可以修改下面这个配置。这并不会修改GOOS变量，所以执行时还是以当前平台作为OS

![image-20230312111921281](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230312111921281.png)

![image-20230312112159585](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230312112159585.png)

<br />

## 远程配置

### 远程主机

![image-20230312135505462](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230312135505462.png)

<br />

### 远程同步

**1、添加配置**

![image-20230312135948936](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230312135948936.png)

**2、设置映射路径**

![image-20230312141910402](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230312141910402.png)

**3、设置默认服务器**

![image-20230312141200705](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230312141200705.png)

**4、配置选项**

![image-20230312141559521](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230312141559521.png)

**5、手动同步**

![image-20230312142301249](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230312142301249.png)

<br />

### 运行目标

![image-20230312112408854](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230312112408854.png)

![image-20230312114140631](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230312114140631.png)

<br />

### 文件管理

`ALT + F1` ---> `Remote host`

![image-20230312155925220](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230312155925220.png)
