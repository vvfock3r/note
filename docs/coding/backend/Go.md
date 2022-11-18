# Go核心语法

官网：[https://golang.google.cn/](https://golang.google.cn/)

安装文档：[https://golang.google.cn/doc/install](https://golang.google.cn/doc/install)

Go命令文档：[https://golang.google.cn/cmd/go/](https://golang.google.cn/cmd/go/)

<br />

## 第一个应用

### 环境变量

**设置环境变量**

```bash
# 语法
go env 						# 查看所有环境变量
go env -json				# 查看所有环境变量，json格式
go env [environment]		# 查看某个具体的环境变量
go env -w GO111MODULE=on	# 设置环境变量,永久生效
go help env					# 查看env命令帮助

# 推荐设置的环境变量
go env -w GO111MODULE=on
go env -w GOPROXY=https://goproxy.cn,direct
```

**环境变量说明**

| 环境变量      | 说明                                                         | 设置命令                                      |
| ------------- | ------------------------------------------------------------ | --------------------------------------------- |
| `GOROOT`      | Go的安装目录                                                 | 一般不用自己设置                              |
| `GOPATH`      | 代表Go的工作区，可以是一个目录，也可以是多个目录，使用逗号分隔?<br />官方说明文档：https://github.com/golang/go/wiki/GOPATH | `go env -w GOPATH=/usr/local/gopath`          |
| `GO111MODULE` | Go 1.11版本增加的模块管理机制，建议开启                      | `go env -w GO111MODULE=on`                    |
| `GOPROXY`     | 代理地址，由于墙的因素建议修改<br />默认值：https://proxy.golang.org,direct<br />七牛云：https://goproxy.cn,direct<br />`direct`：字面翻译是直连，代表官方下载地址，<br />意思是如果通过代理下载不到，那么通过官方地址下载 | `go env -w GOPROXY=https://goproxy.cn,direct` |
| `GOSUMDB`     | 用来校验下载的包的安全性，一般情况下不需要修改<br />默认值：`sum.golang.org`<br />关闭：`off` | `go env -w GOSUMDB=off`                       |

更多环境变量：[https://golang.google.cn/cmd/go/#hdr-Environment_variables](https://golang.google.cn/cmd/go/#hdr-Environment_variables) 或`go help environment` 

<br />

### 单文件应用

`main.go`

```go
package main
 
import "fmt"
 
func main() {
   fmt.Println("Hello World!")
}
```

说明：

- `package`声明我自己的包名
- `import` 导入其他包，这里`fmt`是内置的一个包
- `func `声明函数
- 程序执行的入口必须是`main`包和`main`方法，文件名任意

两种运行方式

```go
# (1) 编译和运行
go build main.go        # 编译
./main.exe              # 运行

# (2) 编译并运行
go run main.go
```

如果我们导入的是一个第三方包，那么编译的时候会报错，如下所示

```bash
[root@localhost ~]# cat main.go 
package main

import (
        "github.com/gin-gonic/gin"
        "log"
        "net/http"
)

func main() {
        // 监听地址
        addr := "127.0.0.1:80"

        // 实例化Gin路由引擎
        r := gin.Default()

        // 注册路由
        r.GET("/", func(c *gin.Context) {
                c.String(http.StatusOK, "Hello Gin!\n")
        })

        // 启动Gin Server
        log.Fatalln(r.Run(addr))
}

[root@localhost ~]# go run main.go   # 在当前目录及父目录没有找到go.mod文件
main.go:4:2: no required module provides package github.com/gin-gonic/gin: go.mod file not found in current directory or any parent directory;
see 'go help modules'
```

<br />

### Go Module

文档：[https://go.dev/ref/mod](https://go.dev/ref/mod)

从`Go1.11`开始，官方推出Go module作为包管理工具



::: details （1）开启Go Module

`GO111MODULE`变量控制是否启用go modules，他有3个值：

* `on`：开启go module
* `off`：关闭go module
* `auto`：根据项目配置自动选择使用`go module`还是`go path`

```bash
# 不管开启没开启，都重新开启一遍
C:\Users\Administrator\Desktop\Notes>go env -w GO111MODULE=on
C:\Users\Administrator\Desktop\Notes>go env GO111MODULE
on
```

:::

::: details （2）初始化项目：`go mod init`

文档：[https://go.dev/ref/mod#go-mod-init](https://go.dev/ref/mod#go-mod-init)

**基础使用**

```bash
# 先创建我们的项目目录demo
[root@localhost ~]# mkdir demo
[root@localhost ~]# cd demo/

# 然后初始化项目
[root@localhost demo]# go mod init demo
go: creating new go.mod: module demo

# 看一下都做了什么事：生成了一个文件go.mod
[root@localhost demo]# ll
total 4
-rw-r--r-- 1 root root 21 May 30 19:27 go.mod

# 看看这个文件内容
[root@localhost demo]# cat go.mod 
module demo		# 模块名

go 1.18			# go版本
```

**我们来看几个Go明星项目的Module Name是如何写的**

| Github地址                               | Module Name                               |
| ---------------------------------------- | ----------------------------------------- |
| https://github.com/containerd/containerd | `module github.com/containerd/containerd` |
| https://github.com/gin-gonic/gin         | `module github.com/gin-gonic/gin`         |
| https://github.com/pingcap/tidb          | `module github.com/pingcap/tidb`          |

仔细研究发现他们的格式都是`github.com/用户名/项目名`，这是为啥？先不管他，后面再说

**举例使用第三方Web框架Gin**

```bash
[root@localhost demo]# ls -l
total 8
-rw-r--r-- 1 root root  21 May 30 19:49 go.mod
-rw-r--r-- 1 root root 327 May 30 19:17 main.go
[root@localhost demo]# cat main.go
package main

import (
        "github.com/gin-gonic/gin"
        "log"
        "net/http"
)

func main() {
        // 监听地址
        addr := "127.0.0.1:80"

        // 实例化Gin路由引擎
        r := gin.Default()

        // 注册路由
        r.GET("/", func(c *gin.Context) {
                c.String(http.StatusOK, "Hello Gin!\n")
        })

        // 启动Gin Server
        log.Fatalln(r.Run(addr))
}
[root@localhost demo]# go run main.go		# 这次报错不一样了，让我们使用go get下载gin
main.go:4:2: no required module provides package github.com/gin-gonic/gin; to add it:
        go get github.com/gin-gonic/gin
```

:::

::: details （3）go get基础：下载第三方包

文档：[https://go.dev/ref/mod#go-get](https://go.dev/ref/mod#go-get)

特点：

* 必须在项目目录(含有go.mod的目录)使用`go get`，无法在全局目录使用
* `go get`用来管理第三方包版本问题，会自动维护go.mod和go.sum文件
* `go get`下载的包放在GOPATH/pkg目录内
* 若不指定版本号只能更新到`v1.x.x`最新版，若第三方包没有版本号（Tag）则会更新到最后一次提交的代码

```bash
# 下载
[root@localhost demo]# go get github.com/gin-gonic/gin
go: added github.com/gin-contrib/sse v0.1.0
go: added github.com/gin-gonic/gin v1.8.0
go: added github.com/go-playground/locales v0.14.0
go: added github.com/go-playground/universal-translator v0.18.0
go: added github.com/go-playground/validator/v10 v10.10.0
go: added github.com/goccy/go-json v0.9.7
go: added github.com/json-iterator/go v1.1.12
go: added github.com/leodido/go-urn v1.2.1
go: added github.com/mattn/go-isatty v0.0.14
go: added github.com/modern-go/concurrent v0.0.0-20180228061459-e0a39a4cb421
go: added github.com/modern-go/reflect2 v1.0.2
go: added github.com/pelletier/go-toml/v2 v2.0.1
go: added github.com/ugorji/go/codec v1.2.7
go: added golang.org/x/crypto v0.0.0-20210711020723-a769d52b0f97
go: added golang.org/x/net v0.0.0-20210226172049-e18ecbb05110
go: added golang.org/x/sys v0.0.0-20210806184541-e5e7981a1069
go: added golang.org/x/text v0.3.6
go: added google.golang.org/protobuf v1.28.0
go: added gopkg.in/yaml.v2 v2.4.0

# 查看go.mod, 将gin及其依赖的包都写入到go.mod文件中了
[root@localhost demo]# cat go.mod
module demo

go 1.18

# require里面代表依赖的包
require (
        github.com/gin-contrib/sse v0.1.0 // indirect
        github.com/gin-gonic/gin v1.8.0 // indirect
        github.com/go-playground/locales v0.14.0 // indirect
        github.com/go-playground/universal-translator v0.18.0 // indirect
        github.com/go-playground/validator/v10 v10.10.0 // indirect
        github.com/goccy/go-json v0.9.7 // indirect
        github.com/json-iterator/go v1.1.12 // indirect
        github.com/leodido/go-urn v1.2.1 // indirect
        github.com/mattn/go-isatty v0.0.14 // indirect
        github.com/modern-go/concurrent v0.0.0-20180228061459-e0a39a4cb421 // indirect
        github.com/modern-go/reflect2 v1.0.2 // indirect
        github.com/pelletier/go-toml/v2 v2.0.1 // indirect
        github.com/ugorji/go/codec v1.2.7 // indirect
        golang.org/x/crypto v0.0.0-20210711020723-a769d52b0f97 // indirect
        golang.org/x/net v0.0.0-20210226172049-e18ecbb05110 // indirect
        golang.org/x/sys v0.0.0-20210806184541-e5e7981a1069 // indirect
        golang.org/x/text v0.3.6 // indirect
        google.golang.org/protobuf v1.28.0 // indirect
        gopkg.in/yaml.v2 v2.4.0 // indirect
)

# 我们下载的包在GOPATH目录下
[root@localhost demo]# go env GOPATH
/usr/local/gopath
[root@localhost demo]# ls -l /usr/local/gopath/pkg/mod/
total 20
drwxr-xr-x 3 root root 4096 May 30 20:26 cache
drwxr-xr-x 9 root root 4096 May 30 20:26 github.com
drwxr-xr-x 3 root root 4096 May 30 20:26 golang.org
drwxr-xr-x 3 root root 4096 May 30 20:26 google.golang.org
drwxr-xr-x 3 root root 4096 May 30 20:26 gopkg.in

# 还会生成一个go.sum文件，此文件不需要我们管理，先不做深入研究
[root@localhost demo]# ls -lh go.sum 
-rw-r--r-- 1 root root 9.1K May 30 20:32 go.sum
```

:::

::: details （4）go get进阶：安装最新版、安装指定版、移除版本、升级依赖

```bash
# 安装最新版本，以下两种方法都可以，这会下载最新的tag版本
[root@localhost demo]# go get github.com/gin-gonic/gin
[root@localhost demo]# go get github.com/gin-gonic/gin@latest

# 安装指定版本
[root@localhost demo]# go get github.com/gin-gonic/gin@v1.7.0
go: downgraded github.com/gin-gonic/gin v1.8.0 => v1.7.0

# 将包从go.mod中移除（本地并不会删除）
[root@localhost demo]# go get github.com/gin-gonic/gin@none
go: removed github.com/gin-gonic/gin v1.7.0

# 查看本地包
[root@localhost demo]# ll /usr/local/gopath/pkg/mod/github.com/gin-gonic/
total 8
dr-xr-xr-x 9 root root 4096 May 30 20:32 gin@v1.7.0
dr-xr-xr-x 9 root root 4096 May 30 20:26 gin@v1.8.0

# 升级依赖（这会升级所有依赖）
[root@localhost demo]# go get -u
go: downloading golang.org/x/net v0.0.0-20220526153639-5463443f8c37
go: downloading github.com/go-playground/validator/v10 v10.11.0
go: downloading github.com/go-playground/validator v9.31.0+incompatible
go: downloading github.com/pelletier/go-toml v1.9.5
go: downloading github.com/ugorji/go v1.2.7
go: downloading golang.org/x/sys v0.0.0-20220520151302-bc2c85ada10a
go: downloading golang.org/x/crypto v0.0.0-20220525230936-793ad666bf5e
go: downloading golang.org/x/text v0.3.7
go: downloading github.com/modern-go/concurrent v0.0.0-20180306012644-bacd9c7ef1dd
go: upgraded github.com/go-playground/validator/v10 v10.10.0 => v10.11.0
go: upgraded github.com/modern-go/concurrent v0.0.0-20180228061459-e0a39a4cb421 => v0.0.0-20180306012644-bacd9c7ef1dd
go: upgraded golang.org/x/crypto v0.0.0-20210711020723-a769d52b0f97 => v0.0.0-20220525230936-793ad666bf5e
go: upgraded golang.org/x/net v0.0.0-20210226172049-e18ecbb05110 => v0.0.0-20220526153639-5463443f8c37
go: upgraded golang.org/x/sys v0.0.0-20210806184541-e5e7981a1069 => v0.0.0-20220520151302-bc2c85ada10a
go: upgraded golang.org/x/text v0.3.6 => v0.3.7

# 升级依赖go.mod变化
[root@localhost demo]# cat go.mod 
module demo

go 1.18

require github.com/gin-gonic/gin v1.8.0		// 这个原来在下面，并且有// indirect，现在没有了

require (
        github.com/gin-contrib/sse v0.1.0 // indirect
        github.com/go-playground/locales v0.14.0 // indirect
        github.com/go-playground/universal-translator v0.18.0 // indirect
        github.com/go-playground/validator/v10 v10.11.0 // indirect
        github.com/goccy/go-json v0.9.7 // indirect
        github.com/golang/protobuf v1.5.2 // indirect
        github.com/json-iterator/go v1.1.12 // indirect
        github.com/leodido/go-urn v1.2.1 // indirect
        github.com/mattn/go-isatty v0.0.14 // indirect
        github.com/modern-go/concurrent v0.0.0-20180306012644-bacd9c7ef1dd // indirect
        github.com/modern-go/reflect2 v1.0.2 // indirect
        github.com/pelletier/go-toml/v2 v2.0.1 // indirect
        github.com/ugorji/go/codec v1.2.7 // indirect
        golang.org/x/crypto v0.0.0-20220525230936-793ad666bf5e // indirect
        golang.org/x/net v0.0.0-20220526153639-5463443f8c37 // indirect
        golang.org/x/sys v0.0.0-20220520151302-bc2c85ada10a // indirect
        golang.org/x/text v0.3.7 // indirect
        google.golang.org/protobuf v1.28.0 // indirect
        gopkg.in/yaml.v2 v2.4.0 // indirect
)
```

:::

::: details （5）安装可执行文件：go install

文档：[https://go.dev/ref/mod#go-install](https://go.dev/ref/mod#go-install)

特点：

* 可以在全局使用`go install`，不会维护go.mod和go.sum文件
* 使用`go install github.com/xxx/@版本`,必须加上版本，如果是最新版则是`latest`
* 其原理是：
  * 下载第三方包到`GOPATH/pkg`
  * 然后编译（入口是`main`包的`main`方法）
  * 将可执行文件放在`GOPATH/bin`目录下
* 可以使用`go install`的第三方包，一般都有一个`main`包和`main`方法

举几个例子

| Github                                 | main               |
| -------------------------------------- | ------------------ |
| https://github.com/davecheney/httpstat | `main.go`          |
| https://github.com/Code-Hex/pget       | `cmd/pget/main.go` |

:::

::: details （6）依赖整理：go mod tidy

很常用的一个命令，可多次执行

```bash
[root@localhost demo]# go help mod
Go mod provides access to operations on modules.

Note that support for modules is built into all the go commands,
not just 'go mod'. For example, day-to-day adding, removing, upgrading,
and downgrading of dependencies should be done using 'go get'.
See 'go help modules' for an overview of module functionality.

Usage:

        go mod <command> [arguments]

The commands are:

        download    download modules to local cache
        edit        edit go.mod from tools or scripts
        graph       print module requirement graph
        init        initialize new module in current directory
        tidy        add missing and remove unused modules			# 添加缺少的包，并移除未使用的包
        vendor      make vendored copy of dependencies
        verify      verify dependencies have expected content
        why         explain why packages or modules are needed

Use "go help mod <command>" for more information about a command.
```

:::

::: details （7）发布公共模块到 GitHub-1：先跑通一个最简单的发布流程

① 首先在Github上新建一个仓库test

② 其次克隆代码，使用go mod初始化，要求module name必须是绝对路径（`github.com/用户名/项目名`）

```bash
# 克隆
git clone https://github.com/vvfock3r/test.git

# 初始化Go模块
go mod init github.com/vvfock3r/test
```

③ 提交代码到test仓库

```bash
# 新建一个文件utils.go
package test

func Add(x, y int) int {
	return x + y
}

# 提交
git add *
git commit -m "test"
git push -u origin main
```

④ 使用GoLand新建一个Go项目demo，进行测试

```bash
# 添加依赖包
C:\Users\Administrator\GolandProjects\demo>go get github.com/vvfock3r/test 
go: downloading github.com/vvfock3r/test v0.0.0-20220601023617-b9d901edce34

# 编写main.go
package main

import (
	"fmt"
	"github.com/vvfock3r/test"
)

func main() {
	fmt.Println(test.Add(1, 2))
}

# 测试执行
C:\Users\Administrator\GolandProjects\demo>go run .      
3

# 查看go.mod
module demo

go 1.18

require github.com/vvfock3r/test v0.0.0-20220601023617-b9d901edce34 // indirect
```

总结几个关键点：

（1）第三方模块的模块名：应使用`github.com/用户名/项目名`

（2）第三方模块的版本：若无版本，Go自动添加一个版本`v0.0.0-时间-提交ID`

* `v0.0.0`是固定的
* 时间格式`年月日时分秒`
* 提交ID长度`12`位

从上面可以看出，一次提交可以认为是一个版本

:::

::: details （7）发布公共模块到 GitHub-2：更新第三方包延迟问题

描述：我们对第三方模块`test`随便做一点修改并提交到GitHub，在`demo`项目中测试更新`test`模块是否正常

结果：第三方包刚刚更新的代码，我们无法立马拉取到新代码，测试过的方法有：

* 使用`go get -u github.com/vvfock3r/test`更新，无效
* 删除`go.mod`和本地`GOPATH`下的`test`模块相关的任何东西，然后使用`go get`重新下载，无效

原因是：我们`go get`下载包并不是直接从`github.com`下载的，而是通过`GOPROXY`指定的镜像站下载的（通过`go get -x`可以看到），而镜像站存在一定延迟从而导致不能马上下载最新包

解决办法：使用`go get github.com/vvfock3r/test@提交ID`来进行更新（提交ID并不一定是完整的ID），可以在下图中这个位置找到最新提交ID

![image-20220601140958608](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/image-20220601140958608.png)

:::

::: details （7）发布公共模块到 GitHub-3：指定第三方包的版本

如果我想让用户使用`go get github.com/vvfock3r/test@v1.0.0`这样的方式来安装指定版本，该如何做呢？

这里的`v1.0.0`，就是仓库的`Tag`名称，但是有几点注意事项：

* Tag名称必须是类似`v1.0.0`这种规则，如果是`v1.0`这样是拉取不到对应版本的

  ```bash
  C:\Users\Administrator\GolandProjects\demo>go get github.com/vvfock3r/test@v1.0
  go: github.com/vvfock3r/test@v1.0: no matching versions for query "v1.0"
  ```

* 对于`v2.0.0`及以上版本，我们如果直接使用`go get github.com/vvfock3r/test@v2.0.0`会报错

  ```bash
  C:\Users\Administrator\GolandProjects\demo>go get github.com/vvfock3r/test@v2.0.0
  go: github.com/vvfock3r/test@v2.0.0: invalid version: module contains a go.mod file, so module path must match major version ("github.com/vvfock3r/test/v2")
  
  # 原因也给出来了：模块路径必须包含主版本号
  ```

  这个时候我们有两种解决方案：

  * 永远不升级到`v2.x.x`，一直使用v1的版本比如`v1.0.0`、`v1.0.1`、`@v1.999.999`
  * 升级到`v2.x.x`，需要在项目根目录下创建一个`v2`的目录，代表这是一个全新的版本

* 其他：Github上新打的Tag可以直接在命令行使用`go get `下载，没有GOPROXY缓存的问题（指定版本为`latest`除外）

:::

::: details （7）发布公共模块到 GitHub-4：replace简介

replace可以让我们对包进行替换，可以达到这样的效果：导入的是`a`包，但实际使用的是`b`包

使用replace可以直接修改go.mod文件，也可以使用`go mod edit -replace`命令（推荐）

语法

```bash
# 语法
# go mod edit -replace 旧地址=新地址

# 示例：将v1.1.2替换为v1.1.1版本，也就是降低了一个版本
go mod edit -replace github.com/vvfock3r/test@v1.1.2=github.com/vvfock3r/test@v1.1.1

# 查看一下go.mod文件
module demo
go 1.18
require github.com/vvfock3r/test v1.1.2
replace github.com/vvfock3r/test v1.1.2 => github.com/vvfock3r/test v1.1.1		# replace

# 说明
虽然go.mod中require是v1.1.2版本，但实际上在使用v1.1.1版本
```

:::

## 

## 基础入门

### 声明

| 关键字  | 说明     |
| ------- | -------- |
| `var`   | 声明变量 |
| `const` | 声明常量 |
| `func`  | 声明函数 |
| `type`  | 声明类型 |

<br />

### 变量和常量

::: details （1）声明变量并赋值

```go
package main

import "fmt"

func main() {
	// 声明单个变量
	//	语法1：var 变量名 变量类型 = 变量值	-- 推荐使用
	//	语法2：变量名 := 变量值			-- 推荐使用,但仅支持在函数内部使用
	var Monday int = 1
	Tuesday := 2

	// 声明多个变量
	// 语法1:
	//		var (                                   -- 推荐使用
	//			变量名1 变量类型 = 变量值
	//			变量名2 变量类型 = 变量值
	//		)
	// 语法2: var 变量名1,变量名2 变量类型 = 变量值1, 变量值2
	var (
		Wednesday int = 3
		Thursday  int = 4
	)

	var Friday, Saturday, Sunday int = 5, 6, 7

	// 函数内声明的变量必须要使用，否则编译会报错；函数外的变量可以声明但不使用
	fmt.Println("周一: ", Monday)
	fmt.Println("周二: ", Tuesday)
	fmt.Println("周三: ", Wednesday)
	fmt.Println("周四: ", Thursday)
	fmt.Println("周五: ", Friday)
	fmt.Println("周六: ", Saturday)
	fmt.Println("周日: ", Sunday)
}
```

输出结果

```bash
周一:  1
周二:  2
周三:  3
周四:  4
周五:  5
周六:  6
周日:  7
```

:::

::: details （2）声明变量不赋值

```go
package main

import "fmt"

func main() {
	// 声明不赋值,默认会使用该类型的零值
	var Monday int

	fmt.Println(Monday) // 0
}
```

:::

::: details （3）声明常量

常量使用`const`关键字声明，与`var`用法很类似，这里主要演示一下特殊的地方

```go
package main

import "fmt"

func main() {        
	// 方式1
	const (
		Monday  int = 4
		Tuesday     // 在同一个括号内，若变量值不写，则保持跟距离最近的一个变量 类型和值一样
	)

	// 方式2
	const (
		Wednesday = iota + 3 // iota初始为0,  0 + 3 = 3
		Thursday             // 每新增一行iota自增长１, 1 + 3 = 4
		Friday               //  同理, 2 + 3 =5
		Saturday
		Sunday
	)

	fmt.Println("周一: ", Monday)
	fmt.Println("周二: ", Tuesday)
	fmt.Println("周三: ", Wednesday)
	fmt.Println("周四: ", Thursday)
	fmt.Println("周五: ", Friday)
	fmt.Println("周六: ", Saturday)
	fmt.Println("周日: ", Sunday)
}
```

输出结果

```bash
周一:  4
周二:  4
周三:  3
周四:  4
周五:  5
周六:  6
周日:  7
```

:::

<br />

### 指针操作

指针的值是变量的内存地址

使用指针可以在无需知道变量名字的情况下，间接读取或更新变量的值

指针类型的零值是nil

指针是可以比较的，当两个指针指向同一个变量或两个指针都为nil的时他们才相等

::: details 点击查看完整代码

```go
package main

import "fmt"

func main() {
	// (1) 通过变量获取指针
	name := "Bob"     // 声明变量
	namePtr := &name  // 获取这个变量的指针赋值给 namePtr
	*namePtr = "Jack" // 通过指针获取变量，并给这个变量赋值

	fmt.Println(name)     // Jack
	fmt.Println(*namePtr) // Jack

	// (2) 直接声明指针并赋值
	var a *string = namePtr
	fmt.Println(*a) // Jack

	// (3) 直接声明空指针,后续赋值会引发panic, 原因是并没有进行内存分配,导致无法赋值
	var b *int
	fmt.Println(b) // <nil>, 指针类型的零值为nil, 这是一个空指针
	//fmt.Println(*b) // 这会报错, 因为我们自己手动这样创建的指针类型,还没有进行内存分配,解决办法可以使用new和make

	// (4) 对于值类型数据结构,使用new声明和分配内存并返回指针变量
	c := new(int)
	*c = 200
	fmt.Println(*c)

	// (5) 对与引用数据结构,使用make声明和分配内存并返回变量(注意返回的不是指针,因为引用类型就没有必要用指针了)
	s1 := make([]int, 1, 2)
	s1[0] = 300
	fmt.Println(s1)        // [300]
	fmt.Printf("%T\n", s1) // []int
}
```

:::

<br />

### Print系列

文档：[https://pkg.go.dev/fmt](https://pkg.go.dev/fmt)

| 分类           | 函数                                  | 说明                            |
| -------------- | ------------------------------------- | ------------------------------- |
| 输出到控制台   | `fmt.Print(string)`                   | 不换行                          |
|                | `fmt.Println(string)`                 | 自动换行，`ln`意为`line`        |
|                | `fmt.Printf(格式化字符, 字符串)`      | 格式化输出                      |
| 作为返回值返回 | `fmt.Sprint()`                        |                                 |
|                | `fmt.Sprintln()`                      |                                 |
|                | `fmt.Sprintf(格式化字符, 字符串对象)` |                                 |
| 接收用户输入   | `fmt.Scan(指针对象)`                  | 将控制台接收的值 赋值给指针对象 |

`printf`格式化字符串

| 分类       | 修饰符       | 说明                                                         |
| ---------- | ------------ | ------------------------------------------------------------ |
| 常用       | `%T`         | 数据类型                                                     |
|            | `%v`         | 获取数据的值，如果实现了 `error `接口，仅表示错误消息        |
|            | `%+v`        | 获取数据的值，如果是结构体会携带字段名                       |
|            | `%#v`        | 获取数据的值，如果是结构体会携带结构体名和字段名             |
| 指针       | `%p`         | 指针地址（带 `0x`）                                          |
|            | `%#p`        | 指针地址（不带 `0x`）                                        |
| 字符串     | `%s`         | 字符串或字节切片                                             |
|            | `%c`         | Unicode码点对应的字符                                        |
|            | `%q`         | 对于字符串或字节切片，结果会加上双引号；<br />对于`byte`或`rune，`结果会加上单引号 |
| 字符串宽度 | `%5s`        | 最小宽度为5（默认右对齐）                                    |
|            | `%-5s`       | 最小宽度为5（左对齐）                                        |
|            | `%.5s`       | 最大宽度为5，多出部分会截断                                  |
|            | `%5.7s`      | 最小宽度为5，最大宽度为7                                     |
|            | `%-5.7s`     | 最小宽度为5，最大宽度为7（左对齐）                           |
|            | `%5.3s`      | 如果宽度大于3，则截断                                        |
|            | `%05s`       | 如果宽度小于5，就会在字符串前面补零                          |
| 整型       | `%b`         | 二进制数                                                     |
|            | `%o`         | 八进制数                                                     |
|            | `%#o`        | 八进制数                                                     |
|            | `%d`         | 十进制数                                                     |
|            | `%x`         | 打印16进制数，a-f                                            |
|            | `%X`         | 打印16进制数，A-F                                            |
|            | `%#x`、`%#X` | 打印16进制数，带`0x`、`0X`                                   |
|            | `% x`、`% X` | 打印16进制数，前面带一个空格                                 |
| 浮点数     | `%f`         | 浮点数, 默认保留6位小数，即`%.6`                             |
|            | `%e`         | 科学计数法，默认保留6位小数，即`%.6e`                        |
| 指针       | `%p`         | 指针，十六进制表示，带前缀`0x`                               |
|            | `%#p`        | 指针，十六进制表示，不带前缀`0x`                             |
| 布尔值     | `%t`         | 打印`true`或`false`                                          |

::: details 点击查看完整代码

```go
package main

import "fmt"

type Person struct {
	Name string
	Age  int
}

func main() {
	person := Person{Name: "Bob", Age: 20}
	numbers := []int{0, 1, 2, 3, 4, 5, 6, 7, 8, 9}

	// 常用类型
	fmt.Printf("%T\n", person)
	fmt.Printf("%v\n", person)
	fmt.Printf("%+v\n", person)
	fmt.Printf("%#v\n", person)
	//main.Person
	//{Bob 20}
	//{Name:Bob Age:20}
	//main.Person{Name:"Bob", Age:20}

	// 指针类型，值类型需要使用&获取指针地址，引用类型加不加&都可以
	fmt.Printf("%p, %p\n", &person, numbers)
	fmt.Printf("%#p, %#p\n", &person, &numbers)
	//0xc000004078, 0xc0000161e0
	//c000004078, c0000161e0

	// 字符串
	fmt.Printf("%s, %s\n", "北京", []byte("北京"))
	fmt.Printf("%#x\n", []rune("北京")[0]) // 0x5317, 字符串 -> unicode -> 16进制
	fmt.Printf("%c\n", 0x5317)
	fmt.Printf("%q, %q, %q\n", "北京", []byte("北京"), 0x5317)
	//北京, 北京
	//0x5317
	//北
	//"北京", "北京", '北'

	// 字符串宽度
	fmt.Printf("%5s\n", "ABC")
	fmt.Printf("%-5s\n", "ABC")
	fmt.Printf("%.5s\n", "ABCDEF")
	fmt.Printf("%5.3s\n", "ABCDEF")
	//ABC
	//ABC
	//ABCDE
	//ABC

	// 整型
	fmt.Printf("%b\n", 3)
	fmt.Printf("%o\n", 9)
	fmt.Printf("%#o\n", 9)
	fmt.Printf("%x\n", 15)
	fmt.Printf("%X\n", 15)
	fmt.Printf("%X\n", 15)
	fmt.Printf("%#x\n", 15)
	fmt.Printf("%#X\n", 15)
	fmt.Printf("% X\n", 15)
	//11
	//11
	//011
	//f
	//F
	//F
	//0xf
	//0XF
	// F

	// 	浮点数
	fmt.Printf("%.2f\n", 2.985)                     // 并非四舍五入
	fmt.Printf("%.2f\n", 2.986)                     // 也不是完全舍去小数
	fmt.Printf("%f\n", 3.3333333333333333333333333) // 默认保留六位小数
	fmt.Printf("%f\n", 3.0)                         // 默认保留六位小数，即%.06
	fmt.Printf("%e\n", 123456.789)                  // 科学计数法， 默认为%.6e；计算方法为：123456.789 = 1.23456789 * 10^5 = 1.23456789e5，又因为是保留6位小数，所以1.234568

	// 指针
	a := 1
	fmt.Printf("%p\n", &a)
	fmt.Printf("%#p\n", &a)
	//0xc0000181c0
	//c0000181c0

	// 布尔值
	fmt.Printf("%t\n", 1 > 2)
	// false
}
```

:::

<br />

### 算术运算符

| 运算符 | 说明                                                         |
| ------ | ------------------------------------------------------------ |
| +      | 加                                                           |
| -      | 减                                                           |
| *      | 乘                                                           |
| /      | 除，<br />整数相除会舍弃小数部分，比如`10 /3 = 3`,  <br />有任意一个是浮点数结果就是浮点数，比如`10 / 3.0 = 3.3333333333333335` |
| %      | 取余，值的符号和除数符号保持一致<br />`10 % 3 = 1`<br />`10 % -3 = 1`<br />`-10 % 3 = -1` |
| ++     | 支持i++，但不支持++i                                         |
| \--    | 同++                                                         |

::: details 点击查看完整代码

```go
package main

import "fmt"

func main() {
	fmt.Println(1 + 1)           // 2
	fmt.Println(1 - 1)           // 0
	fmt.Println(2 * 2)           // 4
	fmt.Println(3 / 2)           // 1, 整数相除会舍弃小数部分
	fmt.Println(10 / 3.0)        // 3.3333333333333335
	fmt.Println(10 / float32(3)) // 3.3333333
	fmt.Println(10 / float64(3)) // 3.3333333333333335, 默认的浮点数是float64
	fmt.Println(10 % 3)          // 1
	fmt.Println(-10 % 3)         // -1
	fmt.Println(10 % -3)         // 1

	i := 1
	// 下面使用都会报语法错误， i++是一条语句，不是表达式，没有返回值
	//j := i++
	//fmt.Println(i++)
	i++
	fmt.Println(i) // 2
}
```

:::

### 位运算符

**原码反码补码**

* 原码：最高位表示符号位，0表示正，1表示负，所以 -> 0000 0001
* 反码
  * 正数的反码等于原码
  * 负数的反码等于原码按位取反（符号位除外）
* 补码
  * 正数的补码等于原码
  * 负数的补码等于反码+1

**示例代码**

::: details （1）基础使用

```go
package main

import (
	"fmt"
	"strconv"
)

func BitReverse() {
	fmt.Printf("^按位取反:\n")

	// 有符号数字按位取反
	// 计算公式：^n = (n + 1) * -1 (n是有符号数字，可能是正数也可能是负数)
	for _, v := range []int32{-200, -100, 0, 100, 200} {
		fmt.Printf("^int32(%-5s = %d\n", strconv.Itoa(int(v))+")", ^v)
	}

	// 无符号数字按位取反
	// 计算公式：^n = 该类型最大值 - (n+1) （n是无符号数字，>=0）
	for _, v := range []uint8{0, 1, 2} {
		fmt.Printf("^uint8(%-5s = %d\n", strconv.Itoa(int(v))+")", ^v)
	}
    // 备注: 这里我们将^作为一元运算符使用，它还可以作为二元运算符使用。
}

func LeftShift() {
	fmt.Printf("\n<<左移位:\n")

	// 计算公式：n<<m = n*(2的m次方) （n为10进制数）
	for i := 0; i <= 3; i++ {
		fmt.Printf("%d<<1=%d     %d<<2=%d     %d<<3=%d\n", i, i<<1, i, i<<2, i, i<<3)
	}
}

func RightShift() {
	fmt.Printf("\n>>右移位:\n")

	// 计算公式：n>>m = int(n/(2的m次方)) （n为10进制数）
	for i := 10; i <= 30; i += 10 {
		fmt.Printf("%d>>1=%d     %d>>2=%d     %d>>3=%d\n", i, i>>1, i, i>>2, i, i>>3)
	}
}

func main() {
	// 按位取反
	BitReverse()

	// 左移位
	LeftShift()

	// 右移位
	RightShift()
}
```

输出结果

```bash
^按位取反:
^int32(-200) = 199              
^int32(-100) = 99               
^int32(0)    = -1               
^int32(100)  = -101             
^int32(200)  = -201             
^uint8(0)    = 255              
^uint8(1)    = 254              
^uint8(2)    = 253              
                                
<<左移位:                       
0<<1=0     0<<2=0     0<<3=0    
1<<1=2     1<<2=4     1<<3=8    
2<<1=4     2<<2=8     2<<3=16   
3<<1=6     3<<2=12     3<<3=24  
                                
>>右移位:                       
10>>1=5     10>>2=2     10>>3=1 
20>>1=10     20>>2=5     20>>3=2
30>>1=15     30>>2=7     30>>3=3
```

:::

::: details （2）kb/mb/gb转换

```go
package main

import "fmt"

const (
	b = 1 << (10 * iota)
	kb
	mb
	gb
	tb
	pb
)

func main() {
	fmt.Println(b, kb, mb, gb, tb, pb)
}
```

:::

<br />

### 循环语句

::: details 点击查看完整代码

```go
package main

import (
	"fmt"
)

func main() {
	// ------------------------- 基础语法 --------------------------------
	// C语言风格循环
	for i := 0; i < 3; i++ {
		fmt.Println(i)
	}

	// range循环
	list := []int{3, 4, 5}
	for k, v := range list {
		fmt.Printf("%#v[%d]=%d\n", list, k, v)
	}

	// 类似while
	n := 6
	for n <= 8 {
		fmt.Println(n)
		n++
	}

	// 死循环
	//for {
	//	fmt.Println(time.Now())
	//}

	// ------------------------- 陷阱 --------------------------------
	fmt.Println("\n陷阱代码：")
	data1 := []int{100, 200, 300}
	data2 := []*int{}
	for _, v := range data1 {
		data2 = append(data2, &v)
	}

	for _, v := range data2 {
		fmt.Println(*v) // 输出3个300
	}
	// 原因
	// v是一个临时变量，每次循环并不重新分配内存地址，而是仅改值而已，
	// 这就导致当最后一次循环完成后，v的值被重置为300

	// ------------------------- 解决 --------------------------------
	fmt.Println("\n修正代码-方式1：")
	data3 := []*int{}
	for k, _ := range data1 {
		data3 = append(data3, &data1[k]) // 通过key来获取原始数据data1中的地址
	}

	for _, v := range data3 {
		fmt.Println(*v) // 输出100 200 300
	}

	fmt.Println("\n修正代码-方式2：")
	data4 := []*int{}
	for _, v := range data1 {
		temp := v //使用新变量，每次循环都会重新开辟内存空间
		data4 = append(data4, &temp)
	}

	for _, v := range data4 {
		fmt.Println(*v) // 输出100 200 300
	}
}
```

输出结果

```bash
0
1                  
2                  
[]int{3, 4, 5}[0]=3
[]int{3, 4, 5}[1]=4
[]int{3, 4, 5}[2]=5
6                  
7                  
8                  
                   
陷阱代码：         
300                
300                
300                
                   
修正代码-方式1：   
100                
200                
300                
                   
修正代码-方式2：   
100                
200                
300      
```

:::

<br />

### 判断语句

::: details 点击查看完整代码

```go
package main

import "fmt"

func main() {
	// if判断
	fmt.Println("if判断")
	a := 100
	b := 200
	if x, y := a, b; x < y {
		fmt.Printf("%d < %d\n", x, y)
	}

	// switch
	fmt.Println("\nswitch判断")
	for i := 0; i < 5; i++ {
		switch i {
		case 0, 2:
			fmt.Println(i, "0-2")
		case 1, 3:
			fmt.Println(i, "1-3")
		default:
			fmt.Println(i, "Default")
		}
	}

	fmt.Println("\nswitch-fallthrough判断")
	c := 100
	switch c {
	case 50:
		fmt.Println("50")
	case 100:
		fmt.Println("100")
		fallthrough // 遇到fallthrough，会继续执行代码后面的case， default不执行
	case 200:
		fmt.Println("200")
	case 300:
		fmt.Println("300")
	default:
		fmt.Println("Default")
	}
}
```

输出结果

```bash
if判断
100 < 200             
                      
switch判断            
0 0-2                 
1 1-3                 
2 0-2                 
3 1-3                 
4 Default             
                      
switch-fallthrough判断
100                   
200
```

:::

<br />

### 代码测试

| 功能\属性 | 文件名要求               | 函数签名要求                | 执行命令                                    |
| --------- | ------------------------ | --------------------------- | ------------------------------------------- |
| 单元测试  | 文件名要以`_test.go`结尾 | `TestXX(t *testing.T)`      | 测试当前目录下所有文件：`go test .`         |
| 性能测试  | 文件名要以`_test.go`结尾 | `BenchmarkXX(b *testing.B)` | 测试当前目录下所有文件：`go test -bench . ` |

::: details （1）单元测试举例

```go
package main

import "testing"

func Add(n1, n2 int) int {
	return n1 + n2
}

func TestAdd(t *testing.T) {
	tests := []struct{ a, b, c int }{
		{1, 2, 3},
		{4, 5, 9},
		{5, 6, 11},
		{6, 7, 14}, // 这里故意写错
	}

	for _, v := range tests {
		if ret := Add(v.a, v.b); ret != v.c {
			t.Errorf("Add(%d, %d) got %d, expectd %d\n", v.a, v.b, ret, v.c)
		}
	}
}
```

输出结果

```bash
=== RUN   TestAdd
    a_test.go:19: Add(6, 7) got 13, expectd 14
--- FAIL: TestAdd (0.00s)

FAIL
```

:::

::: details （2）性能测试举例

```go
package main

import "testing"

func Add(n1, n2 int) int {
	return n1 + n2
}

func BenchmarkAdd(b *testing.B) {
	x := 10000
	y := -25000
	z := -15000

	// 这里是重置时间，如果上面有耗时初始化的话可以添加这一句
	b.ResetTimer()

	// b.N是性能测试为我们提供的计数器
	for i := 0; i < b.N; i++ {
		if v := Add(x, y); v != z {
			b.Errorf("Add(%d, %d) got %d, expectd %d\n", x, y, v, z)
		}
	}
}
```

输出结果

```bash
BenchmarkAdd-8          1000000000               0.2460 ns/op
PASS
ok      learn   0.956s
```

:::

## 

## 基本数据类型

### 数字

::: details （1）数字类型

有符号整数：`int8`、`int16`、`int32`、`int64`

无符号整数：`uint8`、`uint16`、`uint32`、`uint64`

浮点数：`float32`、`float64`

:::

::: details （2）各类型取值范围

取值范围计算：

（1）有符号整数： -2的(n-1)次方 ~ (2的(n-1)次方 -1)

​          因为第一位表示符号位，实际位数为n-1，同时正数中0代表一个数字，所以正数取值范围要-1

（2）无符号整数：0 ~ (2的n次方-1)

```go
package main

import (
	"fmt"
	"math"
	"strconv"
)

func main() {
	// 计算系统位数(32 or 64)
	fmt.Printf("当前操作系统位数: %d\n", strconv.IntSize)

	// 有符号整数
	fmt.Println("\n有符号整数")
	fmt.Printf("int8 取值范围: %20d ~ %-d\n", math.MinInt8, math.MaxInt8)
	fmt.Printf("int16取值范围: %20d ~ %-d\n", math.MinInt16, math.MaxInt16)
	fmt.Printf("int32取值范围: %20d ~ %-d\n", math.MinInt32, math.MaxInt32)
	fmt.Printf("int64取值范围: %20d ~ %-d\n", math.MinInt64, math.MaxInt64)
	fmt.Printf("int  取值范围: %20d ~ %-d\n", math.MinInt, math.MaxInt)

	// 无符号整数
	fmt.Println("\n无符号整数")
	fmt.Printf("uint8  取值范围: %d ~ %-d\n", 0, math.MaxUint8)
	fmt.Printf("uint16 取值范围: %d ~ %-d\n", 0, math.MaxUint16)
	fmt.Printf("uint32 取值范围: %d ~ %-d\n", 0, math.MaxUint32)
	fmt.Printf("uint64 取值范围: %d ~ %-d\n", 0, uint64(math.MaxUint64)) // 这里需要转为uint64
	fmt.Printf("uint   取值范围: %d ~ %-d\n", 0, uint64(math.MaxUint))   // 这里需要转为uint64

	// 浮点数
	fmt.Println("\n浮点数")
	fmt.Printf("float32 取值范围: %10.1e ~ %-10.1e\n", math.SmallestNonzeroFloat32, math.MaxFloat32)
	fmt.Printf("float64 取值范围: %10.1e ~ %-10.1e\n", math.SmallestNonzeroFloat64, math.MaxFloat64)
}
```

输出结果

```bash
当前操作系统位数: 64

有符号整数                                               
int8 取值范围:                 -128 ~ 127                
int16取值范围:               -32768 ~ 32767              
int32取值范围:          -2147483648 ~ 2147483647         
int64取值范围: -9223372036854775808 ~ 9223372036854775807
int  取值范围: -9223372036854775808 ~ 9223372036854775807
                                                         
无符号整数                                               
uint8  取值范围: 0 ~ 255                                 
uint16 取值范围: 0 ~ 65535                               
uint32 取值范围: 0 ~ 4294967295                          
uint64 取值范围: 0 ~ 18446744073709551615                
uint   取值范围: 0 ~ 18446744073709551615                
                                                         
浮点数                                                   
float32 取值范围:    1.4e-45 ~ 3.4e+38                   
float64 取值范围:   4.9e-324 ~ 1.8e+308
```

:::

::: details （3）各类型转换注意事项

```go
package main

import "fmt"

func main() {
	// 执行正常,这个容易理解,小范围转大范围
	fmt.Println(int16(int8(123))) // 123

	// 执行报错,这个也容易理解,大范围转小范围,直接报错
	//fmt.Println(int8(int16(0x1234))) // cannot convert int16(0x1234) (constant 4660 of type int16) to type int8

	// 执行正常, 但是结果不对
	i := 0x1234
	x := int16(i)
	y := int8(x)
	fmt.Printf("%#x", y) // 0x34,结果明显有错误,丢失了一个字节的数据
}
```

:::

<br />

### 字符串

::: details （1）三种类型声明

```go
package main

import "fmt"

func main() {
	// 字符串声明
	var s1 string = "\"hello\" world!" // (1) 方法1：使用双引号，如果字符串也包含双引号则需要转义
	var s2 string = `"hello" world!`   // (2) 方法2：使用反引号，不需要转义，支持多行字符串
	fmt.Printf("%s\n", s1)
	fmt.Printf("%s\n", s2)

	// 字节声明
	var b1 byte = 'a'      // 使用单引号声明
	var b2 uint8 = 'b'     // byte的本质就是uint8, 代表一个ASCII字符，无法表示中文
	fmt.Printf("%c\n", b1) // 可以使用%c或%q，不能使用%s
	fmt.Printf("%q\n", b2)

	// 字符声明
	var r1 rune = '中'  // 使用单引号声明
	var r2 int32 = '国' // rune的本质就是int32, 代表一个Unicode字符，除了能表示ASCII还能表示中文
	fmt.Printf("%c\n", r1)
	fmt.Printf("%q\n", r2) // 可以使用%c或%q，不能使用%s
}
```

输出结果

```bash
"hello" world!
"hello" world!
a             
'b'           
中            
'国'
```

:::

::: details （2）字符串的本质就是字节数组

```go
package main

import (
	"fmt"
	"unicode/utf8"
)

func main() {
	// 字符串定义
	s1 := "北京欢迎你"
	fmt.Printf("        字符串: %-s\n", s1)

	// ------------------------------------------------------------------

	// 计算字符串长度
	fmt.Printf("计算字符串长度: %d\n", len(s1))            // 15
	fmt.Printf("  计算字节长度: %d\n", len([]byte(s1)))   // 15
	fmt.Printf("  计算rune长度: %d\n", len([]rune(s1))) // 5
	fmt.Printf("  计算rune长度: %d\n", utf8.RuneCountInString(s1)) // 5
    
	// ------------------------------------------------------------------

	// 按照字节遍历 - 遍历出来是乱码
	for i := 0; i < len(s1); i++ {
		fmt.Printf("string[%d]=%c\n", i, s1[i])
	}

	// 按照字节数组遍历 - 遍历出来是乱码，和上面的结果是一样的
	s2 := []byte(s1)
	for i := 0; i < len(s2); i++ {
		fmt.Printf("string[%d]=%c\n", i, s2[i])
	}
	// 使用range遍历 - 下标具有不确定性
	for index, value := range s1 {
		fmt.Printf("string[%d]=%c\n", index, value)
	}

	// 使用rune遍历 - 完美
	s3 := []rune(s1)
	for i := 0; i < len(s3); i++ {
		fmt.Printf("string[%d]=%c\n", i, s3[i])
	}
}
```

输出结果

```bash
        字符串: 北京欢迎你
计算字符串长度: 15
  计算字节长度: 15
  计算rune长度: 5 
  计算rune长度: 5 

中间乱码省略...

string[0]=北
string[3]=京
string[6]=欢
string[9]=迎
string[12]=你
string[0]=北
string[1]=京
string[2]=欢
string[3]=迎
string[4]=你
```

:::

::: details （3）strings包介绍

官方文档：[https://pkg.go.dev/strings](https://pkg.go.dev/strings)

中文文档：[https://studygolang.com/static/pkgdoc/pkg/strings.htm](https://studygolang.com/static/pkgdoc/pkg/strings.htm)



常用函数

| 分类       | 函数                                                | 说明                                                         |
| ---------- | --------------------------------------------------- | ------------------------------------------------------------ |
| 字符串相等 | `func EqualFold(s, t string) bool`                  | 判断两个`UTF-8`字符串是否相等，不区分大小写                  |
| 前后缀判断 | `func HasPrefix(s, prefix string) bool`             | 判断`s`是否有前缀字符串`prefix`                              |
|            | `func HasSuffix(s, suffix string) bool`             | 判断`s`是否有后缀字符串`suffix `                             |
| 字符串包含 | `func Contains(s, substr string) bool`              | 判断字符串`s`是否包含子串`substr`                            |
|            | `func ContainsRune(s string, r rune) bool`          | 判断字符串s是否包含`utf-8`码值`r`                            |
|            | `func ContainsAny(s, chars string) bool`            | 判断字符串s是否包含字符串`chars`中的任一字符                 |
| 大小写     | `func ToLower(s string) string`                     | 返回将所有字母都转为对应的小写版本的拷贝                     |
|            | `func ToUpper(s string) string`                     | 返回将所有字母都转为对应的大写版本的拷贝                     |
| 清除       | `func Trim(s string, cutset string) string`         | 返回将s前后端所有`cutset`包含的`utf-8`码值都去掉的字符串     |
|            | `func TrimSpace(s string) string`                   | 返回将s前后端所有空白都去掉的字符串                          |
|            | `func TrimFunc(s string, f func(rune) bool) string` | 返回将s前后端所有满足`f`的`unicode`码值都去掉的字符串        |
| 分割       | `func Split(s, sep string) []string`                | 以`sep`作为分割符分割字符串直接末尾，<br />如果`sep`为空则返回每个`Unicode`码点 |
|            | `func SplitN(s, sep string, n int) []string`        | 同`Split`，参数`n`决定返回的切片的数目<br />`n` == 0，返回`nil`（空切片零值）<br />`n` > 0 返回的切片最多n个子字符串；最后一个子字符串包含未进行切割的部分<br />`n` < 0 : 返回所有的子字符串组成的切片 |
|            | `func SplitAfter(s, sep string) []string`           | 同`Split`，只是会保留分隔符                                  |
|            |                                                     |                                                              |
| 连接       | `func Join(a []string, sep string) string`          | 将一系列字符串连接为一个字符串，之间用sep来分隔              |

```go
package main

import (
	"fmt"
	"strings"
	"unicode"
)

func main() {
	// 字符串相等判断
	fmt.Println("字符串相等判断")
	fmt.Println(strings.EqualFold("go", "GO")) // true, 不区分大小写
	fmt.Println("go" == "GO")                  // false, 区分大小写

	// 字符串前后缀匹配
	fmt.Println("\n字符串前后缀匹配")
	fmt.Println(strings.HasPrefix("hello", "he"))
	fmt.Println(strings.HasPrefix("hello", " he"))

	// 字符串包含匹配
	fmt.Println("\n字符串包含匹配")
	fmt.Println(strings.Contains("hello", "ell"))
	fmt.Println(strings.ContainsRune("中华人民共和国", '人'))
	fmt.Println(strings.ContainsAny("中华人民共和国", "你是哪里的人啊？"))

	// 大小写转换
	fmt.Println("\n大小写转换")
	fmt.Println(strings.ToLower("Hello")) // hello

	// 清除
	fmt.Println("\n清除")
	fmt.Println(strings.Trim("hello world!", "l!"))                       // hello world, !被清除了，说明并没有将l!作为一个整体
	fmt.Println(strings.Trim("@!hello world!", "!@"))                     // hello world, 再次测试一下，验证成功
	fmt.Println(strings.TrimSpace(" 	hello world "))                      // 清除两侧的空白
	fmt.Println(strings.TrimFunc(" hello world HAHA", func(r rune) bool { // 清除两侧的空白和大写字母
		return unicode.IsSpace(r) || unicode.IsUpper(r)
	}))

	// 分割
	fmt.Println("\n分割")
	fmt.Printf("%q\n", strings.Split("a,b,c", ","))     // ["a" "b" "c"]
	fmt.Printf("%q\n", strings.Split("aab", "a"))       // ["" "" "b"]
	fmt.Printf("%q\n", strings.Split("a b c", ""))      // ["a" " " "b" " " "c"]
	fmt.Printf("%q\n", strings.SplitN("a b c", "1", 2)) // 参数n决定返回的切片的数目

	// 连接
	fmt.Println("\n连接")
	fmt.Println(strings.Join([]string{"hello", "world", "!"}, " "))
}
```

输出结果

```bash
字符串相等判断
true            
false           
                
字符串前后缀匹配
true            
false           
                
字符串包含匹配  
true            
true            
true            
                
大小写转换      
hello           
                
清除            
hello world     
hello world     
hello world     
hello world     
                
分割            
["a" "b" "c"]   
["" "" "b"]     
["a" " " "b" " " "c"]
["a b c"]

连接
hello world !
```

:::

::: details （4）bytes包介绍

官方文档：[https://pkg.go.dev/bytes](https://pkg.go.dev/bytes)

中文文档：[https://studygolang.com/static/pkgdoc/pkg/bytes.htm](https://studygolang.com/static/pkgdoc/pkg/bytes.htm)

bytes包实现了操作`[]byte`的常用函数，与`string`包函数类似，简单介绍几个方法

| 分类     | 函数                               | 说明                                                         |
| -------- | ---------------------------------- | ------------------------------------------------------------ |
| 相等判断 | `func Equal(a, b []byte) bool`     | 判断两个切片的内容是否完全相同                               |
|          | `func EqualFold(s, t []byte) bool` | 判断两个`utf-8`编码切片（将unicode大写、小写、标题三种格式字符视为相同）是否相同 |
| 转换     | `func Runes(s []byte) []rune`      | 返回和s等价的[]rune切片                                      |

```go
package main

import (
	"bytes"
	"fmt"
)

func main() {
	// 字节切片相等判断
	fmt.Println("字节切片相等判断")
	fmt.Println(bytes.Equal([]byte("ABC"), []byte("ABC")))     // 完全相等
	fmt.Println(bytes.EqualFold([]byte("ABC"), []byte("abc"))) // 不区分大小写

	// 转换
	fmt.Println("\n转换")
	fmt.Printf("%q\n", bytes.Runes([]byte("你好")))
}

// 输出结果
// true
// true       
// ['你' '好']
```

:::

::: details （5）unicode系列包介绍

**介绍**

`unicode`包包含基本的字符判断函数。

`utf8`包主要负责`rune`和`byte`之间的转换。

`utf16`包负责`rune`和`uint16`数组之间的转换

<br />

**官方文档**

`unicode`：[https://pkg.go.dev/unicode](https://pkg.go.dev/unicode)

`unicode/utf8`：[https://pkg.go.dev/unicode/utf8](https://pkg.go.dev/unicode/utf8)

`unicode/utf16`：[https://pkg.go.dev/unicode/utf16](https://pkg.go.dev/unicode/utf16)

<br />

**函数**

| 包名            | 分类        | 函数                                                       | 说明                                                         |
| --------------- | ----------- | ---------------------------------------------------------- | ------------------------------------------------------------ |
| `unicode`       | 字符判断    | `func Is(rangeTab *RangeTable, r rune) bool`               | 判断`r`是否在`RangeTable`内                                  |
|                 |             | `func IsSpace(r rune) bool`                                | 是否是空白字符（空字符串会报错）                             |
|                 |             | `func IsDigit(r rune) bool`                                | 是否是十进制数字                                             |
|                 |             | `func IsNumber(r rune) bool`                               | 是否是数字                                                   |
|                 |             | `func IsLetter(r rune) bool`                               | 是否是字母                                                   |
|                 |             | `func IsLower(r rune) bool`                                | 是否是小写字母                                               |
|                 |             | `func IsUpper(r rune) bool`                                | 是否是大写字母                                               |
|                 | 转换        | `func ToLower(r rune) rune`                                | 返回对应的小写字符                                           |
|                 |             | `func ToUpper(r rune) rune`                                | 返回对应的小写字符                                           |
| `unicode/utf8`  | bytes转rune | `func DecodeRune(p []byte) (r rune, size int)`             | 解码 []byte中**第一个**`UTF-8` 编码序列，返回该码值和长度    |
|                 |             | `func DecodeLastRune(p []byte) (r rune, size int)`         | 同`DecodeRune`，是最后一个`UTF-8` 编码序列                   |
|                 |             | `func DecodeRuneInString(s string) (r rune, size int)`     | 同`DecodeRune`，传入的是字符串                               |
|                 |             | `func DecodeLastRuneInString(s string) (r rune, size int)` | 同`DecodeRune`，传入的是字符串，是最后一个`UTF-8` 编码序列   |
|                 | rune转bytes | `func EncodeRune(p []byte, r rune) int`                    | 将 rune的`UTF-8 `编码序列写入`[]byte`，并返回写入的字节数。p需要满足足够的长度 |
|                 | 检测        | `func FullRune(p []byte) bool`                             | 检测`[]byte`是否包含一个完整 `UTF-8`编码（只要包含一个就返回true） |
|                 |             | `func FullRuneInString(s string) bool`                     | 同上，输入是一个字符串                                       |
|                 |             | `func RuneStart(b byte) bool`                              | 检测字节 byte b 是否可以作为某个 rune 编码的第一个字节       |
|                 |             | `func Valid(p []byte) bool`                                | 检测切片`[]byte`是否包含完整且合法的`UTF-8`编码序列（不能有乱码） |
|                 |             | `func ValidRune(r rune) bool`                              | 检测字符`rune`是否包含完整且合法的`UTF-8`编码序列            |
|                 |             | `func ValidString(s string) bool`                          | 检测字符串`string`是否包含完整且合法的`UTF-8`编码序列        |
|                 | 统计        | `func RuneCount(p []byte) int`                             | 统计`[]byte`中`rune`的个数                                   |
|                 |             | `func RuneCountInString(s string) (n int)`                 | 同上，输入是字符串                                           |
|                 |             | `func RuneLen(r rune) int`                                 | 统计`rune`编码后的字节数                                     |
| `unicode/utf16` | 转换        | `func Encode(s []rune) []uint16`                           | 编码`rune`数组为`uint16`数组                                 |
|                 |             | `func Decode(s []uint16) []rune`                           | 解码`uint16`数组为`rune`数组                                 |

> 编码：字符串 -> bytes， rune -> bytes
>
> 解码：bytes -> rune， bytes -> 字符串

<br />

**示例**

```go
package main

import (
	"fmt"
	"unicode"
	"unicode/utf16"
	"unicode/utf8"
)

func main() {
	// unicode包 - 判断
	fmt.Println("unicode包 - 判断")
	fmt.Println(unicode.Is(unicode.Scripts["Han"], 'a')) // 判断是否是汉字
	fmt.Println(unicode.Is(unicode.Scripts["Han"], '中'))
	fmt.Println(unicode.IsSpace(' ')) // true

	// unicode包 - 转换
	fmt.Println("\nunicode包 - 转换")
	fmt.Printf("%c\n", unicode.ToLower('A'))
	fmt.Printf("%c\n", unicode.ToLower('中'))

	// unicode/utf8 - bytes转rune
	fmt.Println("\nunicode/utf8 -bytes转rune")
	fmt.Println(utf8.DecodeRune([]byte("你好")))     // 解码第一个，20320 3
	fmt.Printf("%c\n", 20320)                      // 你
	fmt.Println(utf8.DecodeLastRune([]byte("你好"))) // 解码最后一个，22909 3
	fmt.Printf("%c\n", 22909)                      // 好
	fmt.Println(utf8.DecodeRuneInString("你好"))
	fmt.Println(utf8.DecodeLastRuneInString("你好"))

	// unicode/utf8 - rune转bytes
	fmt.Println("\nunicode/utf8 - rune转bytes")
	buf := make([]byte, 3)
	fmt.Println(utf8.EncodeRune(buf, '世'))
	fmt.Printf("%#v\n", buf) // []byte{0xe4, 0xb8, 0x96}

	// unicode/utf8 - 检测
	fmt.Println("\nunicode/utf8 - 检测")
	buf2 := []byte{228, 184, 150}           // 世
	buf3 := []byte{228, 184, 150, 228, 184} // 在buf2的基础上再加上两个字节, 世\xe4\xb8

	fmt.Println(utf8.FullRune(buf2))     // true
	fmt.Println(utf8.FullRune(buf3))     // true
	fmt.Println(utf8.FullRune(buf2[:2])) // false

	fmt.Println(utf8.Valid(buf2)) // true
	fmt.Println(utf8.Valid(buf3)) // false
	fmt.Printf("%q\n", buf3)

	// unicode/utf16 - rune与uint16转换
	fmt.Printf("%#v\n", utf16.Encode([]rune("你好")))            // []uint16{0x4f60, 0x597d}
	fmt.Printf("%q\n", utf16.Decode([]uint16{0x4f60, 0x597d})) // ['你' '好']
}
```

> utf8编码下，英文占1个字节，汉字占3个字节；
>
> utf16编码下，英文占1个字节，汉字占1个字节

:::

<br />

### 布尔值

布尔值的零值是`false`，布尔值无法隐式转换为数值(1或0)

<br />

### 数组

数组的特点

* 数组一旦定义，元素个数不可改变，即不能增加或删除元素；可以改元素的值
* 元素数据类型必须一致
* 相同数据类型、长度固定的序列才是一样的，即`[2]int`和`[3]int`是不同
* 数组的零值是元素数据类型的零值
* 没有"空数组"的说法
* 数组是值类型

::: details （1）声明

```go
package main

import "fmt"

func main() {
	var a1 [3]int                   // 声明数组；3代表数组元素个数（必须指定）；未赋值则默认使用零值，这里是0
	var a2 [3]int = [3]int{4, 5, 6} // 声明并赋值
	a3 := [3]int{7, 8, 9}           // 短变量声明
	a4 := [...]int{10, 11, 12}      // 使用...后数组长度会自动判断；...只能用在值的位置上不可以用在类型的位置上
	a5 := [...]int{1: -1}           // 索引1的位置数据是-1，其他位置是零值

	fmt.Printf("%#v\n", a1)
	fmt.Printf("%#v\n", a2)
	fmt.Printf("%#v\n", a3)
	fmt.Printf("%#v\n", a4)
	fmt.Printf("%#v\n", a5)
}
```

输出结果

```bash
[3]int{0, 0, 0}
[3]int{4, 5, 6}   
[3]int{7, 8, 9}   
[3]int{10, 11, 12}
[2]int{0, -1}   
```

:::

::: details （2）基本操作

```go
package main

import "fmt"

func main() {
	a := [...]int{10, 11, 12, 13, 14, 15}

	// 遍历
	for i := 0; i < len(a); i++ {
		fmt.Println(a[i])
	}
	for _, v := range a {
		fmt.Println(v)
	}

	// 截取
	fmt.Println(a[:3]) // 索引0-2，注意不支持[:-2]这种负数表示方法
}
```

输出结果

```bash
10
11        
12        
13        
14        
15        
10        
11        
12        
13        
14        
15        
[10 11 12]
```

:::

::: details （3）多维数组

```go
package main

import "fmt"

func main() {
	// 二维数组
	a2 := [2][3]int{}
	fmt.Println(a2) // [[0 0 0] [0 0 0]]

	// 三维数组
	a3 := [1][2][3]int{}
	fmt.Println(a3)
	/*
	   [                            第一个数组为长度为1的数组
	      [                         第一个数组的第1个元素为另一个长度为2的数组
	         [0 0 0] [0 0 0]        每个数组有两个元素，每个元素是一个长度为3的数组
	      ]
	   ]

	*/
}
```

:::

<br />

### 切片

切片是长度可变的数组，切片的特点

* 可以动态添加删除元素

* 所有元素数据类型也必须是一样

* 切片的零值是`nil`

* 切片是引用类型

  

切片由三部分组成

* 指针：存放底层数组的内存地址
* 长度：指的是切片的元素个数，使用`len(切片)`输出长度
* 容量：底层数组的长度，使用`cap(切片)`输出容量大小

::: details （1）声明

```go
package main

import "fmt"

func main() {
	// 声明方式1：与数组类似，不同的是不需要指定元素个数
	var s1 []int  // 只声明，默认为零值，即nil
	s2 := []int{} // 空切片

	fmt.Printf("%#v\n", s1)
	fmt.Printf("%#v\n", s2)

	// 声明方式2：使用make
	s3 := make([]int, 1, 2) //声明一个int类型的切片,长度为1，容量为2；如果容量不指定，那么容量等同于长度
	fmt.Printf("%#v\n", s3)

	// 查看长度和容量
	fmt.Println(len(s1), len(s2), len(s3))
	fmt.Println(cap(s1), cap(s2), cap(s3))
}
```

输出结果

```bash
[]int(nil)
[]int{} 
[]int{0}
0 0 1   
0 0 2   
```

:::

::: details （2）基本操作

```go
package main

import (
	"bytes"
	"fmt"
)

func EqualStringSlice(a, b []string) bool {
	length := len(a)
	if length != len(b) {
		return false
	}

	for i := 0; i < length; i++ {
		if a[i] != b[i] {
			return false
		}
	}
	return true
}

func main() {
	s1 := []int{1, 2, 3, 4, 5}
	fmt.Printf("原始数据：%#v\n", s1)

	// 添加元素
	s1 = append(s1, 6, 7, '8', '中') // 可以一次添加多个， '8'和'中'虽然为rune，本质上还是int类型
	fmt.Printf("添加元素：%#v\n", s1)    // []int{1, 2, 3, 4, 5, 6, 7, 56, 20013}

	// 删除元素
	s1 = s1[1:len(s1)]                 // 删除第一个元素
	fmt.Printf("删除元素(第一个)：%#v\n", s1)  //
	s1 = s1[:len(s1)-1]                // 删除最后一个元素
	fmt.Printf("删除元素(最后一个)：%#v\n", s1) //

	// 切片浅拷贝
	s2 := s1[:]   // 浅拷贝
	s3 := s1[1:3] // 浅拷贝
	fmt.Printf("使用[:]浅拷贝：%p <---> %p\n", s1, s2)
	fmt.Printf("使用[:]浅拷贝：%p <---> %p\n", s1[1:3], s3)

	// 切片深拷贝
	s4 := make([]int, len(s1), cap(s1))
	copy(s4, s1)
	fmt.Printf("使用copy深拷贝：%p <---> %p\n", s1, s4) // 深拷贝方式1
	s5 := make([]int, len(s1), cap(s1))
	for _, v := range s1 {
		s5 = append(s5, v)
	}
	fmt.Printf("遍历方式：%p <---> %p\n", s1, s5) // 深拷贝方式2

	// 解包：切片...
	s6 := append(s1, s1...)
	fmt.Printf("解包用法示例：%#v\n", s6) //

	// 切片比较 - byte切片使用提供的函数比较
	a1 := []uint8{11, 40, 78, 115, 253}
	a2 := []uint8{11, 40, 78, 115, 253}
	fmt.Printf("[]byte切片比较: %t\n", bytes.Equal(a1, a2))

	// 切片比较 - 非byte类型
	a3 := []string{"hello", "world"}
	a4 := []string{"hello", "world"}
	fmt.Printf("[]string切片比较: %t\n", EqualStringSlice(a3, a4))
}
```

输出结果

```bash
原始数据：[]int{1, 2, 3, 4, 5}
添加元素：[]int{1, 2, 3, 4, 5, 6, 7, 56, 20013}        
删除元素(第一个)：[]int{2, 3, 4, 5, 6, 7, 56, 20013}   
删除元素(最后一个)：[]int{2, 3, 4, 5, 6, 7, 56}        
使用[:]浅拷贝：0xc00012e0f8 <---> 0xc00012e0f8         
使用[:]浅拷贝：0xc00012e100 <---> 0xc00012e100         
使用copy深拷贝：0xc00012e0f8 <---> 0xc00012e190        
遍历方式：0xc00012e0f8 <---> 0xc000156000              
解包用法示例：[]int{2, 3, 4, 5, 6, 7, 56, 2, 3, 4, 5, 6, 7, 56}
[]byte切片比较: true                                   
[]string切片比较: true
```

:::

::: details （3）容量扩容机制

当**长度==容量**时，再`append()`插入元素，go会重新申请一个底层数组，将原数据数据拷贝过去，修改切片指针，再用来存放我们插入的数据

两个并不准确的结论：

* 当原切片长度小于1024时，新切片的容量会直接翻倍
* 当原切片的容量大于等于1024时，会反复地增加25%，直到新容量超过所需要的容量

**测试1：可以看到是翻倍的**

```go
package main

import "fmt"

func main() {
	// 定义切片
	s := make([]int, 0)
	fmt.Printf("当前长度: %2d | 当前容量: %2d\n", len(s), cap(s))

	// 循环添加元素
	for i := 0; i <= 18; i++ {
		s = append(s, 100)
		fmt.Printf("当前长度: %2d | 当前容量: %2d\n", len(s), cap(s))
	}

	// 输出结果
	//当前长度:  0 | 当前容量:  0
	//当前长度:  1 | 当前容量:  1
	//当前长度:  2 | 当前容量:  2
	//当前长度:  3 | 当前容量:  4
	//当前长度:  4 | 当前容量:  4
	//当前长度:  5 | 当前容量:  8
	//当前长度:  6 | 当前容量:  8
	//当前长度:  7 | 当前容量:  8
	//当前长度:  8 | 当前容量:  8
	//当前长度:  9 | 当前容量: 16
	//当前长度: 10 | 当前容量: 16
	//当前长度: 11 | 当前容量: 16
	//当前长度: 12 | 当前容量: 16
	//当前长度: 13 | 当前容量: 16
	//当前长度: 14 | 当前容量: 16
	//当前长度: 15 | 当前容量: 16
	//当前长度: 16 | 当前容量: 16
	//当前长度: 17 | 当前容量: 32
	//当前长度: 18 | 当前容量: 32
	//当前长度: 19 | 当前容量: 32
}
```

**测试2：可以看到并不是25%**

```go
package main

import "fmt"

func main() {
	// 定义切片
	s := make([]int, 2000)
	fmt.Printf("当前长度: %2d | 当前容量: %2d\n", len(s), cap(s))

	// 循环添加元素
	for i := 0; i <= 10; i++ {
		s = append(s, 100)
		fmt.Printf("当前长度: %2d | 当前容量: %2d\n", len(s), cap(s))
	}

	// 输出结果
	//当前长度: 2000 | 当前容量: 2000
	//当前长度: 2001 | 当前容量: 2720
	//当前长度: 2002 | 当前容量: 2720
	//当前长度: 2003 | 当前容量: 2720
	//当前长度: 2004 | 当前容量: 2720
	//当前长度: 2005 | 当前容量: 2720
	//当前长度: 2006 | 当前容量: 2720
	//当前长度: 2007 | 当前容量: 2720
	//当前长度: 2008 | 当前容量: 2720
	//当前长度: 2009 | 当前容量: 2720
	//当前长度: 2010 | 当前容量: 2720
	//当前长度: 2011 | 当前容量: 2720
}
```

不同版本的`go`扩容机制也并不一样，具体还需要去看源代码`src/runtime/slice.go`中的`growslice`函数

:::

::: details （4）容量扩容面试题

```go
package main

import "fmt"

func main() {
	s1 := []int{10, 20, 30, 40}
	s2 := s1

	s1 = append(s1, 1, 2, 3)
	s1[0] = 11

	fmt.Println(s1[0])
	fmt.Println(s2[0])
}
```

::: details 点击查看输出结果和解释

```bash
11
10

第一个为11
第二个为10，是因为s1添加元素后会有容量扩容操作，将s1的数据赋值给新的内存空间，s1指向新的地址，s1的修改自然影响不到s2，s2的数据还是旧的，就是10
```

:::

<br />

### 映射

映射是存储一系列无序的key/value键值对

key只能为可使用==运算的值类型（字符串、数字、布尔、数组），value可以为任意类型

零值为nil

::: details （1）声明

```go
package main

import "fmt"

func main() {
	// 直接声明
	var names1 map[string]string     //使用var声明但是不初始化(没有分配内存空间)后面赋值会报错；不带大括号的是类型
	var names2 = map[string]string{} // 声明并初始化；带大括号的是值

	// 使用make声明
	var names3 = make(map[string]string)      // 使用make声明并初始化
	var names4 = make(map[string]string, 100) // 使用make声明并初始化，并指定容量（注意：map的容量不可以使用cap函数获取，会报错）

	// 尝试赋值
	//names1["a"] = "b" // 这个会报错，panic: assignment to entry in nil map
	names2["a"] = "b"
	names3["a"] = "b"
	names4["a"] = "b"

	fmt.Printf("类型: %T | 值: %#v | 元素个数: %d\n", names1, names1, len(names1))
	fmt.Printf("类型: %T | 值: %#v | 元素个数: %d\n", names2, names2, len(names2))
	fmt.Printf("类型: %T | 值: %#v | 元素个数: %d\n", names3, names3, len(names3))
	fmt.Printf("类型: %T | 值: %#v | 元素个数: %d\n", names4, names4, len(names4))

	//类型: map[string]string | 值: map[string]string(nil) | 元素个数: 0
	//类型: map[string]string | 值: map[string]string{"a":"b"} | 元素个数: 1
	//类型: map[string]string | 值: map[string]string{"a":"b"} | 元素个数: 1
	//类型: map[string]string | 值: map[string]string{"a":"b"} | 元素个数: 1
}
```

:::

::: details （2）基本操作

```go
package main

import "fmt"

func main() {
	// 声明数组
	names := make(map[string]string)

	// 添加元素，若已存在会覆盖
	names["Top1"] = "Go"
	names["Top2"] = "Python"
	names["Top3"] = "JavaScript"
	names["Top4"] = ""

	// 删除元素, delete函数只用于map，函数无返回值
	delete(names, "Top3")

	// 遍历map，遍历出来是无序的
	for k, v := range names {
		fmt.Printf("names[%s]=%s\n", k, v)
	}
	//names[Top2]=Python
	//names[Top4]=
	//names[Top1]=Go

	// 判断元素是否存在,若不存在默认会返回对应基本数据类型的零值,所以我们一定要通过返回的布尔值来判断元素是否存在
	key := "Top4"
	if v, ok := names[key]; ok {
		fmt.Printf("Key %s exists and value is %q\n", key, v)
	} else {
		fmt.Printf("Key %s does not exist\n", key)
	}
	// Key Top4 exists and value is ""
}
```

:::

::: details （3）value可以是一个方法

```go
package main

import "fmt"

func main() {
	m1 := map[int]func(op int) int{}

	m1[1] = func(op int) int { return op }
	m1[2] = func(op int) int { return op * op }
	m1[3] = func(op int) int { return op * op * op }

	fmt.Println(m1) // map[1:0x47b920 2:0x47b940 3:0x47b960]

	fmt.Println(m1[1](2), m1[2](2), m1[3](2)) // 2 4 8
}
```

:::

::: details （4）实现set类型

go语言中没有``set``类型，可以使用map来自定义`set`

```go
package main

import "fmt"

func main() {
	// 初始化set
	intSet := make(map[int]bool)

	// 添加元素
	intSet[1] = true
	intSet[2] = false

	// 删除元素
	delete(intSet, 2)

	// 检查元素是否存在
	n := 1
	if intSet[n] {
		fmt.Printf("%d is in set", n)
	} else {
		fmt.Printf("%d is not in set", n)
	}
	// 1 is in set
}
```

> 更好的实现set的方法是使用结构体，参考《空结构体》章节

:::

<br />

### 类型转换

::: details 点击查看完整代码

```go
package main

import (
	"fmt"
	"math"
	"strconv"
)

func Int2Float() {
	fmt.Printf("Int转Float:\n")
	x := 99
	fmt.Printf("%T\n", float32(x))
}
func Float2Int() {
	fmt.Printf("\nFloat转Int:\n")

	// 小数部分会被截断
	x := 100.7
	y := -3.9
	fmt.Printf("%T %d\n", int64(x), int64(x)) // 100
	fmt.Printf("%T %d\n", int64(y), int64(y)) // -3

	// 注意：
	//fmt.Printf("%T\n", int64(3.0)) // 不会报错
	//fmt.Printf("%T\n", int64(3.1)) // 会报错,小数部分不为0直接转就会报错
}
func CeilAndFloorAndRound() {
	fmt.Printf("\n向上取整/向下取整/四舍五入:\n")
	// 向上取整，函数签名：Ceil(x float64) float64
	x := 1.11
	fmt.Printf("%T %f\n", math.Ceil(x), math.Ceil(x)) // float64 2.000000

	// 向下取整，函数签名：Floor(x float64) float64
	y := 1.99
	fmt.Printf("%T %f\n", math.Floor(y), math.Floor(y)) // float64 1.000000

	// 四舍五入，函数签名：
	fmt.Printf("%T %f\n", math.Round(1.49), math.Round(1.49)) // float64 1.000000
}
func AddQuote() {
	fmt.Printf("\n输出添加双引号/单引号:\n")
	fmt.Println(strconv.Quote("字符串"))
	fmt.Println(strconv.QuoteRune('字'))
}

func String2Int() {
	fmt.Printf("\n字符串转数字:\n")

	// 函数签名：Atoi(s string) (int, error)，等同于 ParseInt(s, 10, 0)
	if i, err := strconv.Atoi("10"); err == nil {
		fmt.Println(i)
	}

	// 函数签名：ParseInt(s string, base int, bitSize int) (i int64, err error)
	// 指定字符串为10进制数字，转换到int8类型 (0:int、8:int8、16:int16、32:int32、64:int64)
	// 用法一样的还有：ParseUint(s string, base int, bitSize int) (uint64, error)
	if i, err := strconv.ParseInt("b", 16, 8); err == nil {
		fmt.Println(i)
	}

	// 函数签名：ParseFloat(s string, bitSize int) (float64, error)
	if i, err := strconv.ParseFloat("1.20", 16); err == nil {
		fmt.Println(i)
	}
}
func String2Bool() {
	fmt.Printf("\n字符串转布尔:\n")
	// 转换规则代码：
	//switch str {
	//case "1", "t", "T", "true", "TRUE", "True":
	//	return true, nil
	//case "0", "f", "F", "false", "FALSE", "False":
	//	return false, nil
	//}
	// 如果是TRue，这种字符串就无法转换了，可以先使用strings.ToLower或strings.ToUpper转换后再转为布尔值
	if b, err := strconv.ParseBool("true"); err == nil {
		fmt.Printf("%T %v\n", b, b)
	}
}
func Int2String() {
	fmt.Printf("\n数字转字符串:\n")

	// int -> 字符串
	x := strconv.Itoa(100)
	fmt.Printf("%T %s\n", x, x)

	// 函数签名：FormatInt(i int64, base int) string，base代表是多少进制的数字
	// 先转成10进制数字，然后转为数字
	// 用法一样的函数还有strconv.FormatUint
	y := strconv.FormatInt(11, 8)
	fmt.Printf("%T %s\n", y, y)
}
func Bool2String() {
	fmt.Printf("\n布尔转字符串:\n")

	// 函数签名：FormatBool(b bool) string
	// 返回 "true" or "false"
	fmt.Printf("%s\n", strconv.FormatBool(false))
}
func Any2String() {
	fmt.Printf("\n任意数据类型转字符串:\n")

	// 这里以float举例

	// float -> 字符串
	y := fmt.Sprintf("%.2f", 3.1415926)
	fmt.Printf("%T %s\n", y, y)
}

func main() {
	// ----------------------- 数字之间转换 ------------------
	// 数字之间转换
	Int2Float()
	Float2Int()

	// 数字向上取整/向下取整/四舍五入
	CeilAndFloorAndRound()

	// ----------------------- 字符串之间转换 ------------------
	// 字节/Rune/字符串之间的转换参考strings/bytes/unicode包
	AddQuote() // 输出添加双引号/单引号

	// ----------------------- 字符串转到其他类型 Parse系列函数------------------
	String2Int()
	String2Bool()

	// ----------------------- 其他类型转到字符串 Format系列函数------------------
	Int2String()
	Bool2String()
	Any2String()
}
```

输出结果

```bash
Int转Float:
float32                    
                           
Float转Int:                
int64 100                  
int64 -3                   
                           
向上取整/向下取整/四舍五入:
float64 2.000000           
float64 1.000000           
float64 1.000000           
                           
输出添加双引号/单引号:     
"字符串"                   
'字'                       
                           
字符串转数字:              
10                         
11                         
1.2                        
                           
字符串转布尔:              
bool true                  
                           
数字转字符串:              
string 100
string 13

布尔转字符串:
false

任意数据类型转字符串:
string 3.14
```

:::

<br />

### 类型总结

| 数据类型 | 元素是否有序 | 值类型/引用类型 | 指针类型初始化关键字 | 零值               |
| -------- | ------------ | --------------- | -------------------- | ------------------ |
| 数字     | ✔            | 值类型          | `new`                | `0`                |
| 字符串   | ✔            | 值类型          | `new`                | 空字符串           |
| 布尔值   | ✔            | 值类型          | `new`                | `false`            |
| 数组     | ✔            | 值类型          | `new`                | 元素数据类型的零值 |
| 切片     | ✔            | 引用类型        | `make`               | `nil`              |
| 映射     | ❌            | 引用类型        | `make`               | `nil`              |

## 

## 函数

### 基础示例

::: details （1）第一个函数

```go
package main

import "fmt"

// 参数x和y都是int类型，函数返回值也是int类型
// 关于返回值：函数可以没有返回值，也可以有多个返回值
func add(x, y int) int {
	return x + y
}

func main() {
	fmt.Println(add(1, 2))
	fmt.Println(add(3, 4))
}
```

:::

::: details （2）可省略参数

```go
package main

import "fmt"

// options ...数据类型，这样定义的参数可以不传值
func Login(host, port, username, password string, options ...map[string]string) {
	fmt.Println(host, port, username, password, options)
}

func main() {
	Login("0.0.0.0", "3306", "root", "123456")
	Login("0.0.0.0", "3306", "root", "123456", map[string]string{"ssl": "true"})
}

//0.0.0.0 3306 root 123456 []
//0.0.0.0 3306 root 123456 [map[ssl:true]]
```

:::

::: details （3）实参为nil

```go
package main

import "fmt"

// 定义函数
func MyFunc(s []string) []string {
	s = append(s, "hello world!")
	return s
}

func main() {
	// 函数要求传入一个字符串切片，而他的零值为nil，所以我们可以传入nil，在函数内部相当于是: s := make([]string, 0)
	fmt.Println(MyFunc(nil)) // [hello world!]
}
```

:::

::: details （4）接受任意类型参数

```go
package main

import "fmt"

// 使用可省略参数 + interface，可接受任何类型的参数（包括不传），函数内部使用断言再去判断参数类型
// 并不推荐这样写函数，仅作学习使用
// 其中interface{}可以使用any代替，推荐使用any
func test(i ...interface{}) {
	if len(i) >= 1 {
		if m, ok := i[0].(map[string]string); ok {
			fmt.Println(m["name"])
		}
	} else {
		fmt.Println("anomoy")
	}
}

func main() {
	test()
	test(map[string]string{
		"name": "bob",
	})
}
```

:::

::: details （5）案例：使用闭包实现斐波那契数列

```go
package main

import (
	"fmt"
)

func Fibonacci() func() int64 {
	var a, b int64 = 0, 1
	return func() int64 {
		a, b = b, a+b
		return a
	}
}

func main() {

	fib := Fibonacci()
	for i := 0; i < 100; i++ {
		fmt.Println(fib())
	}
}
```

:::

### 内置函数

::: details （1）copy

```go
package main

import "fmt"

func main() {
	// 位数相同的情况下，全部覆盖
	var s = []int{1, 2, 3}
	copy(s, []int{3, 2, 1})
	fmt.Println(s) // [3, 2, 1]

	// dst位数少的情况下，只覆盖部分
	var s1 = []int{1, 2}
	copy(s1, []int{3, 2, 1})
	fmt.Println(s1) // [3, 2]

	// dst为空的情况下，copy之后还是空
	var s2 = []int{}
	copy(s2, []int{1, 2, 3})
	fmt.Println(s2) // []

	// src位数少的情况下，只覆盖部分
	var s3 = []int{4, 4, 4}
	copy(s3, []int{3, 2})
	fmt.Println(s3) // [3 2 4]
}
```

:::

### defer延迟调用

**说明**

defer是延迟调用，后面跟一个函数调用

比如有`A`、`B`两个函数，在`A`函数中`defer B()`，那么就意味着在`A`函数`return`或`panic`之后调用`B`函数

<br />

**应用场景**

* 释放资源，比如文件句柄、锁等

* 异常处理

* 修改函数返回值

<br />

**详细解读**

::: details （1）defer后面的表达式不能加圆括号

```go
package main

import "fmt"

func main() {
	defer (fmt.Println(1))	// defer后面的函数调用，不能加括号，会报语法错误
}
```

:::

::: details （2）若执行多次`defer语句`，则满足`LIFO`（后进先出），即后defer的先执行

```go
package main

import "fmt"

func test1() {
	fmt.Println("测试1")
	for i := 0; i <= 5; i++ {
		defer fmt.Printf("%d %p \n", i, &i)
	}
}

func test2() {
	fmt.Println("\n测试2")
	for i := 0; i <= 5; i++ {
		defer func() {
			fmt.Printf("%d %p \n", i, &i)
		}()
	}
}

func test3() {
	fmt.Println("\n测试3")
	for i := 0; i <= 5; i++ {
		defer func(i int) {
			fmt.Printf("%d %p \n", i, &i)
		}(i)
	}
}

func main() {
	test1()
	test2()
	test3()
}
```

输出结果

```bash
测试1
5 0xc0000180b8 
4 0xc0000180b8 
3 0xc0000180b8 
2 0xc0000180b8 
1 0xc0000180b8 
0 0xc0000180b8 
               
测试2          
6 0xc0000180f0 
6 0xc0000180f0 
6 0xc0000180f0 
6 0xc0000180f0 
6 0xc0000180f0 
6 0xc0000180f0 
               
测试3          
5 0xc0000180f8 
4 0xc000018110 
3 0xc000018118 
2 0xc000018120 
1 0xc000018128 
0 0xc000018130 
```

:::

::: details （3）defer和return执行顺序的问题

```go
package main

import "fmt"

// 在defer中修改返回值成功，前提是必须提前声明返回值
func add1(x, y int) (result int) {
	defer func() {
		result += 10
	}()
	return x + y
}

// 在defer中修改返回值失败，并未提前声明返回值
// 原因是：
// 		return并非原子操作，共分为两步，赋值和函数返回
//		赋值：将结果写入到返回值中，如果未提前声明，就写入到一个临时变量中
//		函数返回：函数带着当前返回值退出
// 执行顺序：return赋值 --> defer --> return函数返回

func add2(x, y int) int {
	result := x + y // result必须定义在前面
	fmt.Printf("%p\n", &result)
	defer func() {
		result += 10
		fmt.Printf("%p\n", &result)
	}()
	return result
}

func main() {
	fmt.Println(add1(1, 2)) // 13
	fmt.Println(add2(4, 5)) // 9
}
```

:::

::: details （4）defer可以捕捉panic

```go
package main

import "fmt"

func Close() {
	// recover函数只能用在defer中
	if err := recover(); err != nil {
		fmt.Println("panic: ", err)
	} else {
		fmt.Println("Close success!")
	}
}

func WithPanic() {
	defer Close()
	panic(1)
}

func NonPanic() {
	defer Close()
}

func main() {
	WithPanic()
	NonPanic()
}

// 输出结果
// panic:  1
// Close success!
```

:::

::: details （5）derfer并不能保证一定会执行

```go
package main

import (
	"fmt"
	"os"
)

func main() {
	defer fmt.Println("defer called")
	os.Exit(0)
}

// 运行之后，发现什么都没有输出，说明defer没有正常执行
```

:::

## 

## 自定义

### 自定义别名

::: details （1）自定义别名

```go
package main

import "fmt"

func add(x, y int) int {
	return x + y
}

func main() {
	// 定义别名， 使用=， 不能给Counter添加方法，Counter本质上就是int
	type Counter = int

	// 使用别名，可以继续像使用int一样使用，本质上它就是int
	var a Counter = 20
	fmt.Println(add(1, a)) // 21
}
```

:::

::: details （2）内置的别名

```go
// byte is an alias for uint8 and is equivalent to uint8 in all ways. It is
// used, by convention, to distinguish byte values from 8-bit unsigned
// integer values.
type byte = uint8

// rune is an alias for int32 and is equivalent to int32 in all ways. It is
// used, by convention, to distinguish character values from integer values.
type rune = int32

// any is an alias for interface{} and is equivalent to interface{} in all ways.
type any = interface{}
```

:::

<br />

### 自定义类型

::: details （1）自定义类型：基础使用

```go
package main

import "fmt"

func add(x, y int) int {
	return x + y
}

func main() {
	// 自定义类型, 这是一个全新的类型
	// Number除了和int和相同的数据结构外，其他方面没有任何关系
	type Number int

	// 赋值
	var a Number = 100
	var b int = 200

	// 错误使用自定义类型
	//fmt.Println(add(1, a)) // 这里会报错，因为Number已经是全新的类型了

	// 和原类型可以做类型转换
	fmt.Printf("%T %#v\n", int(a), int(a))       // int 100
	fmt.Printf("%T %#v\n", Number(b), Number(b)) // main.Number 200
}
```

:::

::: details （2）自定义类型：定义复杂的类型

```go
package main

import (
	"fmt"
	"golang.org/x/crypto/bcrypt"
	"log"
)

// 自定义类型
//type intSlice []int

// 定义一个结构体，假设这是一个第三方的结构体
type Form struct {
	UserName string
	Password string
}

func NewForm(username, password string) *Form {
	return &Form{
		UserName: username,
		Password: password,
	}
}

// 自定义类型
type LoginForm Form

// 给它增加一些方法
func (l *LoginForm) Encrypt() (string, error) {
	hashed, err := bcrypt.GenerateFromPassword([]byte(l.Password), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}
	return string(hashed), nil
}
func (l *LoginForm) ValidatePasswordHashed(hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(l.Password))
	if err != nil {
		return false
	}
	return true
}

func main() {
	// 实例化一个Form对象
	form := NewForm("jinhui", "qaz.123")

	// 类型转换
	loginForm := LoginForm(*form)
	fmt.Printf("%#v\n", loginForm)

	// 加解密操作
	for i := 1; i <= 3; i++ {
		// 获取加密字符串
		hashed, err := loginForm.Encrypt()
		if err != nil {
			log.Fatalln(err)
		}
		fmt.Println("加密字符串: ", hashed)

		// 验证加密字符串是否合法
		fmt.Println("验证加密串: ", loginForm.ValidatePasswordHashed(hashed))
	}

	// 将类型转换回去 LoginForm -> Form
	form2 := Form(loginForm)
	fmt.Printf("%#v\n", form2)
}
```

输出结果

```bash
main.LoginForm{UserName:"jinhui", Password:"qaz.123"}
加密字符串:  $2a$10$DnrKdw.Gp.yQs9z.mKQOKOJc/jbHc0/sLUusR3YOYpylkT8Lt/uTy
验证加密串:  true
加密字符串:  $2a$10$P6iEQKFy99kdCBefE.MCKO171rd4zIfLmMNbvTediK.mRATx2EVgC
验证加密串:  true
加密字符串:  $2a$10$kmV5jDMJfC4Bzy51IaVq9uCX9w//pig9hABRPr.u9Ob5KsF6u7ouK
验证加密串:  true
main.Form{UserName:"jinhui", Password:"qaz.123"}
```

:::

::: details （3）自定义类型：仿http handler对象转换

```go
package main
 
import "fmt"
 
// 自定义类型
// 可以使用HandFunc(函数名) 将函数转为HandFunc对象，函数需要和HandFunc保持签名一致
type HandFunc func(x int, y int) int
 
// 自定义类型-扩展方法
func (f HandFunc) ServeHTTP(x int, y int) int {
   // 这里的f是HandFunc对象，也是上面所说的函数对象
   // 所以这里调用f(x, y)就相当于调用 函数(x, y)
   return f(x, y)
}
 
// 自定义函数
func add(x int, y int) int {
   return x + y
}
 
func main() {
   // 将自定义函数转为自定义类型
   add2 := HandFunc(add)
   fmt.Printf("%T\n", add)
   fmt.Printf("%T\n", add2)
 
   // 正常调用
   fmt.Println(add(1, 2))
   fmt.Println(add2(1, 2))
 
   // 自定义类型可以调用更多的方法
   fmt.Println(add2.ServeHTTP(1, 2))
}
```

输出结果

```bash
func(int, int) int
main.HandFunc
3            
3            
3        
```

:::

## 

## 结构体

Go语言的结构体其实就相当于其他编程语言的类

### 基础

::: details 点击查看完整代码

```go
package main

import (
	"fmt"
)

// 结构体定义语法
//     语法1： type 结构体名称 struct {}
//     语法2： 还可以定义匿名结构体，参考下方代码
type User struct {
	id      int
	name    string
	address string
	phone   string
}

func main() {
	// 初始化空结构体
	fmt.Println(User{}) // {0   }

	//使用字面量初始化
	user1 := User{
		id: 1, name: "Serry", address: "广东省", phone: "19111111111",
	}
	fmt.Println(user1) // {1 Serry 广东省 19111111111}

	// 使用属性初始化
	var user2 User
	user2.id = 1
	user2.name = "Bob"
	user2.address = "河北省保定市"
	user2.phone = "13788888888"
	fmt.Println(user2) // {1 Bob 河北省保定市 13788888888}

	// 使用new函数初始化【指针类型结构体】
	var user3 *User = new(User)
	fmt.Println(user3) // &{0   }

	// 定义匿名结构体并初始化
	user4 := struct {
		id    int
		phone string
	}{
		id:    1,
		phone: "12345678910",
	}

	fmt.Println(user4) // {1 12345678910}
}
```

:::

<br />

### 自定义Tag

`Tag`使用语法

```go
`key1:"value1" key2:"value2" key3:"value3"...` // 键值对用空格分隔
```

已知使用了结构体`Tag`的库：[https://github.com/golang/go/wiki/Well-known-struct-tags](https://github.com/golang/go/wiki/Well-known-struct-tags)

::: details 点击查看完整代码

```go
package main

import (
	"fmt"
	"reflect"
)

type User struct {
	Name     string `my:"username"`
	Age      uint8
	Password string `my:"min=6,max=10"`
}

func GetTag(u User) {
	// 通过反射获取类型
	t := reflect.TypeOf(u)

	// 代码						类型							说明
	// t.NumField()											结构体字段数量
	// t.Field(0)											第1个字段
	//	t.Field(1).Name 		字符串						字段名，这里是 Name
	// 	t.Field(1).Tag  		StructTag(自定义字符串类型)	Tag，这里是 my:"username"
	//  t.Field(1).Tag.Get()	方法							根据key获取value, key不存在返回空字符串

	fmt.Printf("%-10s   %-s\n", "Struct Key", "Tag Value")
	for i := 0; i < t.NumField(); i++ {
		field := t.Field(i)
		key := field.Name
		value := field.Tag.Get("my")
		fmt.Printf("%-10s   %-s\n", key, value)
	}
}

func main() {
	user := User{
		Name:     "Jack",
		Age:      5,
		Password: "123456",
	}
	GetTag(user)
}
```

输出结果

```bash
Struct Key   Tag Value
Name         username    
Age                      
Password     min=6,max=10
```

:::

<br />

### 空结构体

::: details （1）空结构体占用内存为0

```go
package main

import (
	"fmt"
	"unsafe"
)

type Empty struct{}

func main() {
	// 使用unsafe.Sizeof可以查看占用内存大小,单位字节
	fmt.Printf("%d\n", unsafe.Sizeof(int8(100)))  // 1
	fmt.Printf("%d\n", unsafe.Sizeof(int16(100))) // 2
	fmt.Printf("%d\n", unsafe.Sizeof(Empty{}))    // 0
}
```

:::

::: details （2）空结构体的应用场景：对方法分组，将相同类型的方法组合在一起，便于后续扩展和维护

```go
package main

import (
	"fmt"
	"runtime"
	"strconv"
)

type Platform struct{}

func (e *Platform) GetOS() string {
	return runtime.GOOS
}

func (e *Platform) GetOSBit() int {
	return strconv.IntSize
}

func main() {
	var platform Platform
	fmt.Printf("%s %dbits\n", platform.GetOS(), platform.GetOSBit())	// windows 64bits
}
```

:::

::: details （3）空结构体的应用场景：实现`set`类型

```go
package main

import "fmt"

type Set map[string]struct{}

func (s Set) Add(item string) {
	s[item] = struct{}{}
}

func (s Set) Remove(item string) {
	delete(s, item)
}

func (s Set) Exist(item string) bool {
	_, ok := s[item]
	return ok
}

func main() {
	set := make(Set)
	set.Add("123")
	set.Add("456")
	fmt.Println(set.Exist("123")) // true
	set.Remove("123")
	fmt.Println(set.Exist("123")) // false
}
```

:::

::: details （4）空结构体的应用场景：空通道，实现通知型`channel`，其不需要发送任何数据，只是用于协调`Goroutine`运行

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	ch := make(chan struct{})

	go func() {
		time.Sleep(3 * time.Second)
		close(ch)
	}()

	fmt.Println("a")
	<-ch
	fmt.Println("b")
}
```

:::

<br />

### 结构体组合

类似于类的继承

::: details （1）基础用法

```go
package main

import "fmt"

type Addr struct {
	province string
	street   string
	number   string
}

type User struct {
	id    int
	name  string
	addr  Addr
	phone string
}

func main() {
	var addr = Addr{
		province: "Hebei",
		street:   "天威路",
		number:   "10",
	}

	var user = User{
		id:    1,
		name:  "bob",
		addr:  addr,
		phone: "137111111111",
	}

	fmt.Println(user)
}
```

:::

::: details （2）K-V同名简写

```go
package main

import "fmt"

type User struct {
	Basic // Basic Basic的简写形式,但与直接写Basic Basic有区别
}

type Basic struct {
	Name string
	Age  int
}

func (b *Basic) GetName() string {
	return b.Name
}

func main() {
	u := User{
		Basic{
			Name: "July",
			Age:  18,
		},
	}

	fmt.Printf("%#v\n", u)   // main.User{Basic:main.Basic{Name:"July", Age:18}}
	fmt.Println(u.GetName()) // July, User结构体实例可以直接使用Basic结构体的方法,如果是非简写形式则不可以直接调用
}
```

:::

<br />

### 结构体方法

::: details （1）基础示例

```go
// 定义结构体
type Person struct {
	name string
}

// 一般我们会为结构体定义一个构造方法（这不是必须的）
func NewPerson(name string) *Person {
	return &Person{name: name}
}

// 定义结构体方法
// 语法：func (接收者变量 接收者类型) 方法名(参数列表) (返回参数)
//      接收者变量: 建议使用接收者类型名称首字母的小写，而不是self、this之类的命名
//      接收者类型：值类型和指针类型
func (p *Person) GetName() string {
	return p.name
}
```

:::

::: details 测试1：值接收者会将结构体拷贝一份到方法内

```go
package main

import "fmt"

type Person struct {
	name string
}

func NewPerson(name string) Person {
	return Person{name: name}
}

func (p Person) GetName() string {
	return p.name
}
func (p Person) SetName(name string) {
	fmt.Printf("SetName: %p\n", &p)
	p.name = name
}

func main() {
	bob := NewPerson("bob")
	fmt.Printf("main: %p\n", &bob)

	bob.SetName("jack")
	fmt.Println(bob.GetName())

	// 输出结果
	// main: 0xc00004a250
	// SetName: 0xc00004a260
	// bob
    // 总结：值接收者会将结构体拷贝一份到方法内，所以导致并没有对结构体修改成功
}
```

:::

::: details 测试2：指针接收者不会拷贝结构体

```go
package main

import "fmt"

type Person struct {
	name string
}

func NewPerson(name string) *Person {
	return &Person{name: name}
}

func (p *Person) GetName() string {
    // 这里是一个语法糖，本质上为 return (*p).name
	return p.name
}
func (p *Person) SetName(name string) {
	fmt.Printf("SetName: %p\n", p)
	p.name = name
}

func main() {
	bob := NewPerson("bob")
	fmt.Printf("main: %p\n", bob)

	bob.SetName("jack")
	fmt.Println(bob.GetName())

	// 输出结果
	// main: 0xc00010e110
	// SetName: 0xc00010e110
	// jack
    // 总结：指针接收者不会拷贝结构体，所以对结构体修改成功
}
```

:::

::: details （3）结构体是map-v的怪异行为

```go
package main

type Person struct {
	Name string
	Sex  string
	Age  int
}

func main() {
	m := map[uint]Person{
		0: Person{"张无忌", "男", 20},
		1: Person{"赵敏", "女", 21},
	}

	// 测试1：这会报错 cannot assign to struct field m[0].Age in map
	m[0].Age += 1

	// 测试2：迂回解决
	//tmp := m[0]
	//tmp.Age += 1
	//m[0] = tmp
	//fmt.Println(m[0].Age)

	// 测试3：定义map为指针类型后解决
	//m2 := map[uint]*Person{
	//	0: &Person{"张无忌", "男", 20},
	//	1: &Person{"赵敏", "女", 21},
	//}
	//
	//m2[0].Age += 1
	//fmt.Println(m2[0].Age)
}
```

:::

<br />

### 函数式选项模式

该模式解决的问题是如何更动态灵活地为对象配置参数

```go
package main

import "fmt"

// 定义结构体
type User struct {
	Name string // 必须字段
	Age  uint8  // 非必须
	Sex  string // 非必须
}

// 定义各种选项
type Option func(*User)

func WithAge(age uint8) Option {
	return func(user *User) {
		user.Age = age
	}
}

func WithSex(sex string) Option {
	return func(user *User) {
		user.Sex = sex
	}
}

func DefaultOptions() []Option {
	return []Option{WithAge(10), WithSex("superman")}
}

// 构造方法
func NewUser(name string, options ...Option) *User {
	// (1) 必须有的字段直接写到函数签名中，这里只有一个name
	// (2) 可有可无的通过options动态传递
	// (3) 以后若增加新的选项，也不需要改构造函数

	// 实例化结构体
	user := &User{Name: name}

	// 设置默认参数
	for _, option := range DefaultOptions() {
		option(user)
	}

	// 自定义参数
	for _, option := range options {
		option(user)
	}
	return user
}

func main() {
	bob := NewUser("bob")
	jack := NewUser("jack", WithAge(20), WithSex("man"))
	julie := NewUser("julie", WithSex("woman"))

	fmt.Printf("%#v\n", bob)
	fmt.Printf("%#v\n", jack)
	fmt.Printf("%#v\n", julie)

	//&main.User{Name:"bob", Age:0xa, Sex:"superman"}
	//&main.User{Name:"jack", Age:0x14, Sex:"man"}  
	//&main.User{Name:"julie", Age:0xa, Sex:"woman"}
}
```

<br />

### 结构体内存大小计算

**结论**

结构体内存占用大小是<span style="color: red; font-weight: bold;">每个字段内存对齐之后占用之和</span>，并不是每个字段占用之和



**结构体内存对齐规则**

* 第一个字段在与结构体偏移量为0的地址处
* 其他字段要对齐到对齐数的整数倍的地址处

::: details （1）查看每种数据类型占用大小和对齐数

```go
package main

import (
	"fmt"
	"unsafe"
)

func main() {
	fmt.Printf("bool  : Size %2d, Alignment %d\n", unsafe.Sizeof(bool(true)), unsafe.Alignof(bool(true)))
	fmt.Printf("int8  : Size %2d, Alignment %d\n", unsafe.Sizeof(int8(0)), unsafe.Alignof(int8(0)))
	fmt.Printf("int16 : Size %2d, Alignment %d\n", unsafe.Sizeof(int16(0)), unsafe.Alignof(int16(0)))
	fmt.Printf("int32 : Size %2d, Alignment %d\n", unsafe.Sizeof(int32(0)), unsafe.Alignof(int32(0)))
	fmt.Printf("int64 : Size %2d, Alignment %d\n", unsafe.Sizeof(int64(0)), unsafe.Alignof(int64(0)))
	fmt.Printf("byte  : Size %2d, Alignment %d\n", unsafe.Sizeof(byte(1)), unsafe.Alignof(byte(1)))
	fmt.Printf("rune  : Size %2d, Alignment %d\n", unsafe.Sizeof(rune(10000)), unsafe.Alignof(rune(10000)))
	fmt.Printf("string: Size %2d, Alignment %d\n", unsafe.Sizeof(string("1")), unsafe.Alignof(string("1")))
	fmt.Printf("struct: Size %2d, Alignment %d\n", unsafe.Sizeof(struct{}{}), unsafe.Alignof(struct{}{}))
}
```

输出结果

```go
bool  : Size  1, Alignment 1
int8  : Size  1, Alignment 1
int16 : Size  2, Alignment 2
int32 : Size  4, Alignment 4
int64 : Size  8, Alignment 8
byte  : Size  1, Alignment 1
rune  : Size  4, Alignment 4
string: Size 16, Alignment 8
struct: Size  0, Alignment 1

// Size代表占用内存大小（单位字节）
// Alignment代表内存对齐数字（单位字节）
```

:::

::: details （2）对齐规则验证

```go
package main

import (
	"fmt"
	"unsafe"
)

type P1 struct {
	a bool   // 偏移量为0, 自身占用1个字节
	b int32  // 与a做内存对齐,int32类型的对齐倍数为4,导致偏移量为4,自身又占用4个字节,所以本字段结束位置在偏移量为8的位置
	c byte   // 与b做内存对齐,偏移量为9的位置
	d string // 与c做内存对齐,偏移量开始位置在16,自身占用16,最终位置在32
}

type P2 struct {
	a bool   // 偏移量为0,最终位置1
	c byte   // 偏移量为1,最终位置2
	b int32  // 偏移量开始为4,结束为8
	d string // 偏移量开始为8,结束为 8 + 16 = 24
}

func main() {
	fmt.Println(unsafe.Sizeof(P1{})) // 32
	fmt.Println(unsafe.Sizeof(P2{})) // 24
}
```

:::

## 

## 接口

### 接口是什么

接口是一个类型，就和`int`、`string`、`map`等一样，是类型，不是值

接口是一系列方法的集合，比如`io.Writer`就是一个接口

某个值实现了某个接口的所有方法，我们称它实现了某个接口，比如`os.Stdout`实现了`io.Writer`接口

下面用代码演示一下

```go
package main

import (
	"io"
	"os"
)

func main() {
	// 声明变量w,类型为 io.Writer, 这是一个接口类型的变量
	var w io.Writer

	// 给接口类型变量赋值
	w = os.Stdout

	// 调用
	_, _ = w.Write([]byte("hello"))	// hello
}
```

<br />

### 接口类型都可以用在哪

接口是一种类型，那么都可以用在哪呢？

（1）声明变量为接口类型

（2）函数形参指定为接口类型

（3）结构体字段指定为接口类型

::: details 点击查看完整代码

```go
package main

import (
	"io"
	"log"
	"os"
)

func WriteString(w io.Writer, msg string) (n int, err error) {
	return w.Write([]byte(msg))
}

type User struct {
	io.Writer
}

func main() {
	// 应用1: 声明为接口变量
	var w io.Writer
	w = os.Stdout
	if _, err := w.Write([]byte("hello ")); err != nil {
		log.Fatal(err)
	}

	// 应用2: 函数形参为接口类型
	if _, err := WriteString(os.Stdout, "world"); err != nil {
		log.Fatal(err)
	}

	// 应用3: 结构体字段为接口类型
	user := User{os.Stdout}
	if _, err := user.Write([]byte("!\n")); err != nil {
		log.Fatal(err)
	}
}

// 输出结果：
// hello world!
```

:::

<br />

### 接口类型值都可以是什么

凡是实现了接口中定义的方法的对象都可以是接口值，都有哪些呢？

（1）结构体（这个是最常用的）

（2）自定义类型（一个自定义类型作为接口类型的值，感觉有点奇怪哈~）

::: details 点击查看完整代码

```go
package main

import (
	"log"
	"os"
)

// 定义接口
type Writer interface {
	Write([]byte) (n int, err error)
}

// 自定义类型
type Stdout string

func (m Stdout) Write(w []byte) (n int, err error) {
	return os.Stdout.Write(w)
}

func main() {
	var a Stdout // 声明变量a为自定义类型
	var b Writer // 声明变量b为接口类型
	b = a        // 自定义类型实现了Reader接口,所以可以将a赋值给b

	// 调用方法
	if _, err := b.Write([]byte("hello")); err != nil {
		log.Fatal(err)
	}
}

// 输出结果
// hello
```

:::

<br />

### 值接收者和指针接收者

::: details 点击查看完整代码

```go
package main

import "fmt"

// 定义Sender接口
type Sender interface {
	Send(string) error
}

// 定义微信媒介
type Weixin struct {
	User     string
	Password string
	Phone    string
	To       string
}

func (s *Weixin) Send(msg string) error { // 指针方法
	fmt.Printf("Weixin Send: %s\n", msg)
	return nil
}

// 定义邮箱媒介
type Email struct {
	Addr     string
	Port     string
	User     string
	Password string
	to       string
}

func (e Email) Send(msg string) error { // 值方法
	fmt.Printf("Email Send: %s\n", msg)
	return nil
}

func main() {
	// 测试1
	var x Sender    // 声明x为Sender接口类型
	x = &Weixin{}   // 给x赋值, 接收者是指针类型的,所以这里必须使用指针类型
	x.Send("hello") // 调用方法

	// 测试2
	var y, z Sender // 声明Sender接口类型
	y = Email{}     // 赋值
	z = &Email{}    // 赋值
	y.Send("hello") // 调用方法
	z.Send("hello") // 调用方法,指针对象调用的本质还是值对象调用,只是语法糖

	// 输出结果
	// Weixin Send: hello
	// Email Send: hello
	// Email Send: hello
	// 总结:
	// (1) 指针类型接收者的方法必须使用指针对象来调用
	// (2) 值类型接收者的方法既可以用值对象调用,也可以用指针对象调用
}
```

:::

<br />

### 空接口

空接口意为着可以接受任意类型的值，也意味着我们不能确定值是什么类型

::: details 点击查看完整代码

```go
package main

import "fmt"

// 定义空接口
type Empty interface{}

func main() {
	var a Empty
	a = 1
	fmt.Println(a)	// 1
	a = "Hello"
	fmt.Println(a)	// Hello
}
```

:::

<br />

### 断言和查询

::: details 点击查看完整代码

```go
package main

import (
	"fmt"
)

//定义一个结构体
type EmailSender struct {
	Addr     string
	Port     string
	User     string
	Password string
	to       string
}

func (s *EmailSender) Send(msg string) error {
	fmt.Println("Hello " + msg)
	return nil
}

//定义一个结构体
type WeiChartSender struct {
	User     string
	Password string
	to       string
	Phone    string
}

func (s *WeiChartSender) Send(msg string) error {
	fmt.Println("Hello " + msg)
	return nil
}

//定义一个接口
type Sender interface {
	Send(string) error
}

func main() {
	// 初始化
	var a Sender = &WeiChartSender{User: "我是小a"} // 定义sender为Sender接口类型; 如果用new初始化,直接赋值就会报错了
	b := new(WeiChartSender)                     // 定义b为WeiChartSender结构体指针类型
	b.User = "我是小b"

	// 正常调用方法
	fmt.Println("正常方法调用:")
	_ = a.Send("world!") // Hello world!
	_ = b.Send("world!") // Hello world!

	// 查看各个类型,看起来两个类型都一样
	fmt.Println("\n查看类型:")
	fmt.Printf("%T\n", a) // *main.WeiChartSender
	fmt.Printf("%T\n", b) // *main.WeiChartSender

	// 调用属性, 接口类型的不能调用,因为接口只能要求函数, 定义不了属性,当然也没有实现
	fmt.Println("\n查看属性:")
	//fmt.Println(a.User) // 这个会报错 a.User undefined (type Sender has no field or method User)
	fmt.Printf("b.User=%s\n", b.User)

	// 接口类型转换为结构体 -- 断言方式
	fmt.Println("\n断言方式:")
	if obj, ok := a.(*WeiChartSender); ok {
		fmt.Printf("断言成功: %#v\n", obj)
		fmt.Printf("a.User=%s\n", obj.User)
	} else {
		fmt.Printf("断言失败")
	}

	// 接口类型转换为结构体 -- 查询方式
	fmt.Println("\n查询方式:")
	switch obj := a.(type) {
	case *WeiChartSender:
		fmt.Printf("查询成功: %#v\n", obj)
        fmt.Printf("a.User=%s\n", obj.User)
	default:
		fmt.Printf("查询失败\n")
	}
}
```

输出结果

```bash
正常方法调用:
Hello world!                                                                
Hello world!                                                                
                                                                            
查看类型:                                                                   
*main.WeiChartSender                                                        
*main.WeiChartSender                                                        
                                                                            
查看属性:                                                                   
b.User=我是小b                                                              
                                                                            
断言方式:                                                                   
断言成功: &main.WeiChartSender{User:"我是小a", Password:"", to:"", Phone:""}
a.User=我是小a                                                              
                                                                            
查询方式:                                                                   
查询成功: &main.WeiChartSender{User:"我是小a", Password:"", to:"", Phone:""}
a.User=我是小a
```

:::

<br />

### 常用接口

::: details （1）Stringer

字符串功能接口

定义如下

```go
// fmt.print.go
type Stringer interface {
	String() string
}
```

测试代码

```go
package main

import "fmt"

type A struct {
	Name string
	Age  uint
	Sex  string
}

func (a A) String() string {
	return fmt.Sprintf("String: 大家好, 我是%s, 性别%s, 年龄%d", a.Name, a.Sex, a.Age)
}

func (a A) GoString() string {
	return fmt.Sprintf("GoString: 大家好, 我是%s, 性别%s, 年龄%d", a.Name, a.Sex, a.Age)
}

func main() {
	a := &A{
		Name: "张三",
		Age:  18,
		Sex:  "男",
	}
	fmt.Println(a)
	fmt.Printf("%v\n", a)
	fmt.Printf("%+v\n", a)
	fmt.Printf("%#v\n", a) // GoString

	fmt.Printf("%s\n", a)
	fmt.Printf("%q\n", a)
}
```

输出结果

```bash
String: 大家好, 我是张三, 性别男, 年龄18
String: 大家好, 我是张三, 性别男, 年龄18  
String: 大家好, 我是张三, 性别男, 年龄18  
GoString: 大家好, 我是张三, 性别男, 年龄18
String: 大家好, 我是张三, 性别男, 年龄18  
"String: 大家好, 我是张三, 性别男, 年龄18"
```

:::

## 

## IO

### `os`包：基础文件读写

官方文档：[https://pkg.go.dev/os](https://pkg.go.dev/os)

#### 打开文件

方式一：`OpenFile`

```go
OpenFile(name string, flag int, perm FileMode) (*File, error)
```

::: details 点击查看详细介绍

```go
// flag选项
//	(1)打开模式（必须指定其一）
//		os.O_RDONLY         以只读方式打开文件       如果文件不存在则报错
//		os.O_WRONLY         以只写方式打开          如果文件不存在则报错
//		os.O_RDWR           以读写方式打开文件       如果文件不存在则报错
//	(2)辅助控制行为
//		os.O_APPEND         追加方式写入
//		os.O_CREATE         文件不存在则创建文件；Windows系统该属性会自带写属性                                          
//		os.O_EXCL           文件必须不存在；使用场景比如：只允许进程打开自己的文件 或 多进程运行时退出，只允许单进程运行
//		os.O_TRUNC          文件存在则截断（清空内容）

// 常用flag组合选项
//	读文件
//		os.O_RDONLY                             读文件，文件不存在则报错
//	写文件
//		os.O_RDWR | os.O_CREATE                 写文件，当文件不存在时自动创建文件
//		os.O_RDWR | os.O_CREATE | os.O_APPEND   写文件，当文件不存在时自动创建文件，当文件存在时追加内容
//		os.O_RDWR | os.O_CREATE | os.O_TRUNC    写文件，当文件不存在时自动创建文件，当文件存在时清空文件内容

// perm选项
// 	文件权限
//	(1)只有在创建文件时才有用，当不需要创建文件时可以设置为0
//	(2)内置常量os.ModePerm = 0777
```

:::

方式二：`Open`

```go
func Open(name string) (*File, error) {
	return OpenFile(name, O_RDONLY, 0)
}

// 核心为OpenFile，以只读模式打开文件，当文件不存在时会报错
```

方式三：`Create`

```go
func Create(name string) (*File, error) {
	return OpenFile(name, O_RDWR|O_CREATE|O_TRUNC, 0666)
}

// 核心为OpenFile，当文件不存在时会创建，当文件存在时会清空文件内容
// 使用时多加注意，不要误清空了文件内容!!!
```

<br />

#### 常规操作函数

| 分类               | 函数                                             | 说明                                                         |
| ------------------ | ------------------------------------------------ | ------------------------------------------------------------ |
| 创建临时文件或目录 | `CreateTemp(dir, pattern string) (*File, error)` | 创建临时文件，返回临时文件的路径<br />（1）`dir`指定在哪个目录下创建临时目录，为空会使用用户默认临时目录<br />（2）`pattern `指定文件名前缀，如果包含`*`，那么代指整个文件名，<br />`*`被替换为随机字符串 |
|                    | `MkdirTemp(dir, pattern string) (string, error)` | 同上，只不过创建的是临时目录                                 |
| 创建目录           | `Mkdir(name string, perm FileMode) error`        | 创建目录；<br />（1）不支持创建多级目录<br />（2）目录存在时会报错 |
|                    | `MkdirAll(path string, perm FileMode) error`     | 创建目录<br />（1）支持创建多级目录<br />（2）目录存在时会报错 |
| 删除文件或目录     | `Remove(name string) error`                      | 删除文件或空目录，不存在时会报错                             |
|                    | `RemoveAll(path string) error`                   | 删除文件或目录，支持非空目录，不存在时会报错                 |
| 重命名             | `Rename(oldpath, newpath string) error`          | 文件或目录重命名                                             |
| 文件详情           | `Stat(name string) (FileInfo, error)`            | 获取文件详情                                                 |
|                    | `Lstat(name string) (FileInfo, error)`           | 同上，区别是对于链接文件，`Stat`具有穿透能力而`Lstat`没有    |
| 判断是哪种错误     | `IsExist(err error) bool`                        | 是否是文件存在错误                                           |
|                    | `IsNotExist(err error) bool`                     | 是否是文件不存在错误                                         |
|                    | `IsPermission(err error) bool`                   | 是否是权限错误                                               |
|                    | `IsTimeout(err error) bool`                      | 是否是超时错误                                               |

判断文件或目录是否存在

::: details 点击查看完整代码

```go
package main

import (
	"fmt"
	"os"
)

// 判断文件或目录是否存在
func PathExists(path string) (bool, error) {
	_, err := os.Stat(path)
	if err == nil {
		return true, nil
	}
	if os.IsNotExist(err) {
		return false, nil
	}
	return false, err
}

func main() {
	for _, path := range []string{"main.go", "go.mod", "test.log", "C:\\Windows"} {
		if exists, err := PathExists(path); err == nil {
			fmt.Printf("%s exist: %t\n", path, exists)
		} else {
			fmt.Printf("%s exist: %t\n", path, "unknown")
		}
	}
}
```

:::

输出结果

```bash
main.go exist: true
go.mod exist: true    
test.log exist: false 
C:\Windows exist: true
```

<br />

#### 写入数据

::: details 点击查看完整代码

```go
package main

import (
	"io"
	"log"
	"os"
)

func main() {
	// 打开文件，文件存在则清空内容，不存在则创建
	f, err := os.OpenFile("test.log", os.O_RDWR|os.O_CREATE|os.O_TRUNC, 0777)
	if err != nil {
		log.Fatalf("Open file error: %s\n", err)
	}
	defer f.Close()

	// 写入内容 - 字节
	byteLine := []byte("人之初，性本善。性相近，习相远。")
	byteLine = append(byteLine, '\n')
	if _, err := f.Write(byteLine); err != nil {
		log.Fatalf("Write error: %s", byteLine)
	}

	// 写入内容 - 字符串
	stringLine := "苟不教，性乃迁。教之道，贵以专。"
	stringLine = stringLine + "\n"
	if _, err := f.WriteString(stringLine); err != nil {
		log.Fatalf("Write error: %s", stringLine)
	}

	// 获取文件指针位置 (从当前位置开始，偏移为0的位置)
	currentSeek, err := f.Seek(0, io.SeekCurrent)
	if err != nil {
		log.Fatalf("Get file current seek error: %s\n", err)
	}

	// 使用指针写入（写入的长度会将指针后面的内容覆盖）
	// 这里我们使用”新“替换掉”贵以专。“中的”贵“,思路就是文件指针移动到”贵“字上，然后替换即可
	// 偏移量计算：1('\n') + 12("贵新专。"，一个汉字3个字节，注意这里的句号是中文的，也计算在汉字里面) = 13
	seekRune := []byte("新")
	if _, err := f.WriteAt(seekRune, currentSeek-13); err != nil {
		log.Fatalf("Write error: %s", byteLine)
	}
}
```

:::

<br />

#### 读取数据

**按字节从文件开始读取数据**
`Read(b []byte) (n int, err error)`

::: details 点击查看完整代码

```go
package main

import (
	"fmt"
	"io"
	"log"
	"os"
)

func Read() {
	// 打开文件
	fileName := "test.log"
	f, err := os.Open(fileName)
	if err != nil {
		log.Fatalf("文件不存在: %s\n", fileName)
	}
	defer f.Close()

	// 循环读取文件
	buffer := make([]byte, 1024)
	for {
		n, err := f.Read(buffer)

		// 处理数据
		if n > 0 {
            fmt.Printf("%s", buffer[:n])	// 注意这里[:n]
		}

		// 判断是否可以读取下一行
		if err == nil {
			continue
		}

		// 文件读取完成
		if err == io.EOF {
			break
		}

		// 文件读取失败
		log.Fatalf("文件读取失败: %s:%s\n", fileName, err)
	}
}

func main() {
	Read()
}
```

:::

**按字节从文件任意位置读取数据**

`ReadAt(b []byte, off int64) (n int, err error)`

::: details 点击查看完整代码

```go
package main

import (
	"fmt"
	"io"
	"log"
	"os"
)

func ReadAt() {
	// 打开文件
	fileName := "test.log"
	f, err := os.Open(fileName)
	if err != nil {
		log.Fatalf("文件不存在: %s\n", fileName)
	}
	defer f.Close()

	// 获取文件指针(末尾)
	seekEnd, err := f.Seek(0, io.SeekEnd)
	if err != nil {
		log.Fatalf("File seek error: %s\n", err)
	}

	// ReadAt读取
	buf := make([]byte, 4)
	n, err := f.ReadAt(buf, seekEnd-4) // 读取文件末尾的4个字节，换行符1个字节，中文1个字节
	if err != nil {
		log.Fatalf("File readat error: %s\n", err)
	}
	fmt.Println(string(buf[:n]))
}

func main() {
	ReadAt()
}
```

:::

<br />

#### 读取中文乱码问题

一个中文占3个字节，如果只是简单的使用`Read`按字节读取文件的话，有可能会遇到中文乱码问题

::: details 点击查看完整代码

```go
package main

import (
	"bufio"
	"fmt"
	"io"
	"log"
	"os"
	"unicode/utf8"
)

func WriteFile(fileName string) {
	// 生成数据
	data := make([]byte, 0)
	for i := 0; i < 170; i++ {
		data = append(data, []byte("中")...)
	}
	data = append(data, []byte("国")...)

	// 写入文件
	err := os.WriteFile(fileName, data, os.ModePerm)
	if err != nil {
		log.Fatalf("写入文件失败: %s\n", fileName)
	} else {
		log.Printf("写入文件成功: %s: %d bytes\n", fileName, len(data))
	}
}

func ReadByte(fileName string) {
	// 打开文件
	f, err := os.Open(fileName)
	if err != nil {
		log.Fatalf("打开文件失败: %s\n", fileName)
	}
	defer f.Close()

	// 读取数据
	buf := make([]byte, 512)
	for {
		n, err := f.Read(buf)
		if err != nil {
			if err == io.EOF {
				break
			}
			log.Fatalf("读取文件失败: %s: %s \n", fileName, err)
		}
		log.Printf("读取文件成功: %s: %d bytes\n", fileName, n)

		// 显示数据,最后一个中文显示乱码
		log.Printf("显示文件内容: %s\n", string(buf[:n]))

		// 检测切片[]byte是否包含完整且合法的UTF-8编码序列（不能有乱码）
		log.Printf("检测字节切片是否是完整且合法的UTF-8编码序列: %t\n", utf8.Valid(buf[:n]))
	}
}

func ReadAllByte(fileName string) {
	data, err := os.ReadFile(fileName)
	if err != nil {
		log.Fatalf("读取文件失败: %s: %s \n", fileName, err)
	}
	log.Printf("读取文件成功: %s: %d bytes\n", fileName, len(data))
	log.Printf("显示文件内容: %s\n", string(data))
}

func ReadByRune(fileName string) {
	// 打开文件
	f, err := os.Open(fileName)
	if err != nil {
		log.Fatalf("打开文件失败: %s\n", fileName)
	}
	defer f.Close()

	// 读取数据
	reader := bufio.NewReader(f)
	data := make([]rune, 0)
	for {
		r, _, err := reader.ReadRune()
		if err != nil {
			if err == io.EOF {
				break
			}
			log.Fatalf("读取文件失败: %s: %s \n", fileName, err)
		}
		//log.Printf("读取文件成功: %s: %d bytes\n", fileName, size)
		data = append(data, r)
	}
	// 显示数据
	log.Printf("显示文件内容: %s\n", string(data))
}

func ReadByteBySeek(fileName string) {
	// 打开文件
	f, err := os.Open(fileName)
	if err != nil {
		log.Fatalf("打开文件失败: %s\n", fileName)
	}
	defer f.Close()

	// 读取数据
	var bufsize int64 = 512
	oldSize := bufsize
	for {
		// 读取数据
		buf := make([]byte, bufsize)
		n, err := f.Read(buf)
		if err != nil {
			if err == io.EOF {
				break
			}
			log.Fatalf("读取文件失败: %s: %s \n", fileName, err)
		}

		// 非完整的UTF8序列处理
		if !utf8.Valid(buf[:n]) {
			// 指针回退
			if ret, err := f.Seek(int64(n)*-1, io.SeekCurrent); err != nil {
				log.Fatalf("读取文件失败: %s: %s %s \n", fileName, err, ret)
			}
			// buf字节数+1
			bufsize++

			continue
		}

		// 完整的UTF8序列处理
		log.Printf("读取文件成功: %s: %d bytes\n", fileName, n)
		log.Printf("显示文件内容: %s\n", buf[:n])
		bufsize = oldSize
	}
}

func ReadByteNoSeek(fileName string) {
	// 打开文件
	f, err := os.Open(fileName)
	if err != nil {
		log.Fatalf("打开文件失败: %s\n", fileName)
	}
	defer f.Close()

	// 读取数据
	lastLeft := make([]byte, 0) // 上次读取留下来的不完整的字节切片
	for {
		// 读取数据
		buf := make([]byte, 300)
		n, err := f.Read(buf)
		if err != nil {
			if err == io.EOF {
				break
			}
			log.Fatalf("读取文件失败: %s: %s \n", fileName, err)
		}

		// 与上次读取遗留字节合并
		buf = append(lastLeft, buf...)
		n += len(lastLeft)
		lastLeft = make([]byte, 0) // 重新初始化

		// 检查序列完整性
		for {
			if utf8.Valid(buf[:n]) {
				break
			}
			lastByte := buf[n-1:][0]
			lastLeft = append([]byte{lastByte}, lastLeft...)
			n--
		}

		// 完整的UTF8序列处理
		log.Printf("读取文件成功: %s: %d bytes\n", fileName, n)
		log.Printf("显示文件内容: %s\n", buf[:n])
	}
}

func main() {
	fileName := "test.log"

	// 写数据
	fmt.Println("------------------ 写入数据 ---------------------")
	WriteFile(fileName)

	// 按字节读数据(会读到乱码)
	fmt.Println("\n------------------ 按字节读数据(会读到乱码) ---------------------")
	ReadByte(fileName)

	// 解决方案1：一次性全部读取到内存中
	// 缺点：内存占用过大，不适用大文件
	fmt.Println("\n------------------ 解决方案1：一次性全部读取到内存中 ---------------------")
	ReadAllByte(fileName)

	// 解决方案2：按Rune读取文件
	// 缺点：一个字符一个字符的读，效率太低
	fmt.Println("\n------------------ 解决方案2：按Rune方式读取 ---------------------")
	ReadByRune(fileName)

	// 解决方案3：按字节读取，如果不是完整UTF8序列则回退文件指针，动态微调buf大小
	// 缺点：需要通过Seek指针操作
	fmt.Println("\n- 解决方案3：按字节读数据，如果不是完整UTF8序列则回退文件指针，动态微调buf大小 -")
	ReadByteBySeek(fileName)

	// 解决方案4：按字节读取，如果不是完整UTF8序列，那么将字节切片分割，只是用完整的UTF8序列，乱码部分与下一次读取连接起来
	// 缺点：代码比较复杂
	fmt.Println("\n------- 解决方案4：字节分割与重组读法（与Read表现一致） ----------")
	ReadByteNoSeek(fileName)
}
```

:::

输出结果

```bash
------------------ 写入数据 ---------------------
2022/04/25 15:56:39 写入文件成功: test.log: 513 bytes

------------------ 按字节读数据(会读到乱码) ---------------------
2022/04/25 15:56:39 读取文件成功: test.log: 512 bytes
2022/04/25 15:56:39 显示文件内容: 中中中中中中中中中中中中中中中中中中中中中中中
中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中
中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中
中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中
中中中中中中中中中中中中中中中中中中中中中中中中中中中��
2022/04/25 15:56:39 检测字节切片是否是完整且合法的UTF-8编码序列: false
2022/04/25 15:56:39 读取文件成功: test.log: 1 bytes
2022/04/25 15:56:39 显示文件内容: �
2022/04/25 15:56:39 检测字节切片是否是完整且合法的UTF-8编码序列: false

------------------ 解决方案1：一次性全部读取到内存中 ---------------------      
2022/04/25 15:56:39 读取文件成功: test.log: 513 bytes
2022/04/25 15:56:39 显示文件内容: 中中中中中中中中中中中中中中中中中中中中中中中
中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中
中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中
中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中
中中中中中中中中中中中中中中中中中中中中中中中中中中中国

------------------ 解决方案2：按Rune方式读取 ---------------------
2022/04/25 15:56:39 显示文件内容: 中中中中中中中中中中中中中中中中中中中中中中中
中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中
中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中
中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中
中中中中中中中中中中中中中中中中中中中中中中中中中中中国

- 解决方案3：按字节读数据，如果不是完整UTF8序列则回退文件指针，动态微调buf大小 -
2022/04/25 15:56:39 读取文件成功: test.log: 513 bytes
2022/04/25 15:56:39 显示文件内容: 中中中中中中中中中中中中中中中中中中中中中中中
中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中
中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中
中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中
中中中中中中中中中中中中中中中中中中中中中中中中中中中国

------- 解决方案4：字节分割与重组读法（与Read表现一致） ----------
2022/04/25 15:56:39 读取文件成功: test.log: 510 bytes
2022/04/25 15:56:39 显示文件内容: 中中中中中中中中中中中中中中中中中中中中中中中
中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中
中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中
中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中中
中中中中中中中中中中中中中中中中中中中中中中中中中中中
2022/04/25 15:56:39 读取文件成功: test.log: 3 bytes
2022/04/25 15:56:39 显示文件内容: 国
```

<br />

#### 读写快捷函数

`os.WriteFile`和`os.ReadFile`底层调用的是`OpenFile`，一次性加载数据到内存中，适合读取小文件，大文件有撑爆内存的风险

::: details 点击查看完整代码

```go
package main

import (
	"log"
	"os"
)

func main() {
	// 写入文件
	writeFileName := "test.log"
	err := os.WriteFile(writeFileName, []byte("Hello, 这里是测试日志"), os.ModePerm)
	if err != nil {
		log.Fatalf("写入文件失败: %s\n", writeFileName)
	}
	log.Printf("写入文件成功: %s\n", writeFileName)

	// 函数源码如下：
	//func WriteFile(name string, data []byte, perm FileMode) error {
	//	f, err := OpenFile(name, O_WRONLY|O_CREATE|O_TRUNC, perm)
	//	if err != nil {
	//	return err
	//}
	//	_, err = f.Write(data)
	//	if err1 := f.Close(); err1 != nil && err == nil {
	//	err = err1
	//}
	//	return err
	//}
	// 可以看到，(1)读写模式打开文件 (2)文件若不存在会自动创建 (3)文件若存在则会截断(清空内容)，所以使用这个函数前需要小心一些

	// 读取文件
	readFileName := "D:\\iso\\CentOS-7-x86_64-DVD-1708.iso"
	log.Printf("开始读取文件: %s\n", readFileName)
	buf, err := os.ReadFile(readFileName)
	if err != nil {
		log.Fatalf("读取文件失败: %s: %s\n", readFileName, err)
	}
	log.Printf("读取文件成功: %s: %d bytes\n", readFileName, len(buf))
	// 查看源码可以看到，
	//		(1)使用Open打开文件
	//		(2)当文件大小(int64类型)能正常转为int类型时，buf就取这个值；否则buf设置为512
	//		   int最大值转为GB是多少呢？ math.MaxInt / 1024 / 1024 / 1024 = 8589934591
	//		   当文件小于8589934591GB时，都是一次性读入内存中
	// 		   所以使用这个函数，就等同于将文件一次性读入内存，请确保内存充足..
}
```

:::

输出结果

```bash
2022/04/24 14:30:58 写入文件成功: test.log
2022/04/24 14:30:58 开始读取文件: D:\iso\CentOS-7-x86_64-DVD-1708.iso
2022/04/24 14:31:00 读取文件成功: D:\iso\CentOS-7-x86_64-DVD-1708.iso: 4521459712 bytes

# 可以看到，4个多G的文件2秒钟读完了
```

<br />

### `io`包：IO基本接口定义

官方文档：[https://pkg.go.dev/io](https://pkg.go.dev/io)

#### Reader基本接口

**Reader定义**

```go
// io.Reader
type Reader interface {
	Read(p []byte) (n int, err error)
}
```

> 根据接口定义得到的信息：读取数据并填充到`p`中，最多填充`len(p)`个字节；返回实际读取到的字节数`n`和`error`

**Reader读取规则**

（1）读取成功，数据全部填充至`p`，此时有` n == len(p)`、`err == nil`

（2）读取失败，此时有`err != nil`，`err`代表具体的错误

（3）读到`EOF`，此时支持以下两种处理情况：

​		① 返回实际读取的字节数n，将`err`设置为`EOF`（推荐）

​		② 返回实际读取的字节数n，将`err`设置为`nil`，对于这种情况，在下一次读取时需要返回`n == 0, err == nil`（不推荐）

（4）<span style="color: blue; font-weight: bold;">允许数据没全部准备好时，返回部分数据，此时有`p`尚未填充满，同时`err == nil`</span>（这种情况要小心，可能写代码会出现一些坑）

**Reader接口的几种实现**

| 结构体/接口                                                  | 具体实现                           | 备注                                                         |
| ------------------------------------------------------------ | ---------------------------------- | ------------------------------------------------------------ |
| 从文件中读：<br />`os.File`结构体                            | `os.OpenFile()`                    | 文件读取                                                     |
|                                                              | `os.Stdin`/`os.Stdout`/`os.Stderr` | 主要为标准输入读取`Stdin`                                    |
| 从字符串中读：<br />`strings.Reader`结构体                   | `strings.NewReader()`              | `Reader`接口：本质是调用内置函数`copy`，无法读取中文<br />`RuneReader`接口：本质是按字节遍历，如果字节在ASCII码范围内<br />则使用`rune`包装一下返回，否则调用`utf8.DecodeRuneInString`解码出第一个`Rune`并返回 |
| 从字节中读：<br />`bytes.Reader`结构体                       | `bytes.NewReader()`                | 类似于`strings.Reader`结构体                                 |
| 从缓冲中读：<br />`bytes.Buffer`结构体<br />`bufio.Reader`结构体 | 详细介绍见后面章节                 | 详细介绍见后面章节                                           |
| 从网络连接中读：<br />`net.Conn`接口                         | 以后补充                           | 以后补充                                                     |

示例代码

::: details 点击查看完整代码

```go
package main

import (
	"fmt"
	"io"
	"log"
	"os"
	"strings"
	"time"
)

func ReadFromStdin() {
	buf := make([]byte, 1024)
	for {
		// 读取输入
		fmt.Printf("%s 请输入名字：", time.Now().Format("2006/01/02 15:04:05"))
		n, err := os.Stdin.Read(buf)
		if err != nil {
			log.Fatalln(err)
		}

		// 解析输入
		name := strings.TrimSpace(string(buf[:n]))

		// 判断输入是否合法
		if len(name) > 0 {
			log.Printf("您的名字为: %s", name)
			break
		}
	}
}

func ReadFromStringReader() {
	reader := strings.NewReader("hello world!")
	buf := make([]byte, 1024)
	for {
		n, err := reader.Read(buf)
		if n > 0 {
			log.Printf("%s\n", buf[:n])
		}
		if err == nil {
			continue
		}
		if err == io.EOF {
			break
		}
		log.Println("read error")
	}
}

func ReadRuneFromStringReader() {
	reader := strings.NewReader("a你好")
	for {
		r, _, err := reader.ReadRune()
		if err != nil {
			if err == io.EOF {
				break
			}
		}
		log.Printf("%s", string(r))
	}
}

func main() {
	ReadFromStdin()
	ReadFromStringReader()
	ReadRuneFromStringReader()
}
```

:::

输出结果

```bash
2022/04/24 16:52:13 请输入名字：愤怒的西瓜
2022/04/24 16:52:32 您的名字为: 愤怒的西瓜
2022/04/24 16:52:32 hello world!
2022/04/24 16:52:32 a
2022/04/24 16:52:32 你
2022/04/24 16:52:32 好
```

<br />

#### Reader其他接口

```go
// 读取一次返回一个字节
type ByteReader interface {
	ReadByte() (byte, error)
}

// 读取一次返回一个Rune
type RuneReader interface {
	ReadRune() (r rune, size int, err error)
}

// 可以从指定位置(字节)处读取
type ReaderAt interface {
	ReadAt(p []byte, off int64) (n int, err error)
}
```

<br />

#### Reader封装函数

| 函数                                                         | 说明                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| `func ReadAll(r Reader) ([]byte, error)`                     | 从`Reader`中读完所有数据再返回，当文件过大时有撑爆内存的风险 |
| `func ReadFull(r Reader, buf []byte) (n int, err error)`     | 读满缓冲区再返回，未读满缓冲区（即使读到`EOF`）也会返回错误  |
| `func ReadAtLeast(r Reader, buf []byte, min int) (n int, err error)` | 最少要读`min`个字节，即使读到`EOF`也会返回错误               |
| `func LimitReader(r Reader, n int64) Reader`                 | 返回一个新`Reader`，该`Reader`最多只能读取`n`个字节（偏移为0） |
| `func NewSectionReader(r ReaderAt, off int64, n int64) *SectionReader` | 返回一个新`Reader`，该`Reader`最多只能读取`n`个字节（偏移为`off`） |

<br />

#### Writer和Closer接口

**接口定义**

```go
type Writer interface {
	Write(p []byte) (n int, err error)
}

type Closer interface {
	Close() error
}
```

<br />

#### Reader和Writer复合函数

**io.Copy系列**

（1）`func Copy(dst Writer, src Reader) (written int64, err error)`

主要功能为：从`Reader`中读取，并写入到`Writer`中，返回写入的字节数和错误

> 实现的细节：
>
> 1. 如果`src`实现了`WriteTo`接口，那么就调用`src.WriteTo(dst)`方法
> 2. 如果`dst`实现了`ReaderFrom`接口，那么就调用`dst.ReadFrom(src)`方法
> 3. 如果以上两个接口都没实现，那么就从`src`读取数据到缓冲区再写入`Writer`
> 4. 如果`src`是`*LimitedReader`结构体，那么`buffer`大小设定为规定的大小，否则设置为`32KB`

（2）`func CopyBuffer(dst Writer, src Reader, buf []byte) (written int64, err error)`

与`io.Copy`不同的地方在于可以自定义`buffer`大小的`Copy`，但是请注意只有在`src.WriteTo`和`dst.ReadFrom`都没有实现的情况下生效

（3）`func CopyN(dst Writer, src Reader, n int64) (written int64, err error)`

只拷贝N个字节，本质上是通过`LimitReader`来限制`Reader`所能读取的字节数

**io.Pipe**

```go
func Pipe() (*PipeReader, *PipeWriter)
```

* 从w中写入，从r中读出
* 线程安全

* 本质上是无缓冲的`channel`，所以不能在同一个协程中读和写

<br />

### bufio包：带缓冲的IO包

官方文档：[https://pkg.go.dev/bufio](https://pkg.go.dev/bufio)

#### 缓冲原理

![bufio](https://tuchuang-1257805459.cos.accelerate.myqcloud.com/bufio.png)

本质上来讲，就是通过减少系统调用来提高效率，付出的代价就是内存占用变多

<br />

#### 构造函数

```go
func NewReader(rd io.Reader) *Reader {
	return NewReaderSize(rd, defaultBufSize)	
}

func NewWriter(w io.Writer) *Writer {
	return NewWriterSize(w, defaultBufSize)
}

// 默认的缓冲区大小defaultBufSize = 4096
```

<br />

#### 使用示例

::: details Reader使用示例

```go
package main

import (
	"bufio"
	"log"
	"strings"
)

func main() {
	// 生成原始Reader
	var str string
	for i := 0; i < 170; i++ {
		str += "中"
	}
	r := strings.NewReader(str)
	log.Printf("原始Reader可读取数据大小: %d\n", len(str))

	// 带缓冲的Reader
	//reader := bufio.NewReader(f)	// 使用默认缓冲大小
	reader := bufio.NewReaderSize(r, 1024) // 自定义缓冲大小

	// 读取数据
	buf := make([]byte, 100)
	n, err := reader.Read(buf)
	if err != nil {
		log.Fatalf("Read error: %s\n", err)
	}
	log.Printf("Read %d bytes\n", n)

	// 查看缓冲区信息
	log.Printf("缓冲区大小: %d bytes\n", reader.Size())
	log.Printf("当前缓冲区剩余的可读字节数: %d bytes\n", reader.Buffered())
}
```

:::

::: details Writer使用示例

```go
package main

import (
	"bufio"
	"log"
	"os"
)

func main() {
	// 带缓冲的Writer
	//writer := bufio.NewWriter(os.Stdout)
	writer := bufio.NewWriterSize(os.Stdout, 15)

	// 写入数据，本次总共写入13个字节数据
	// 若缓冲区大于等于13则写入到缓冲区，屏幕上也不会输出任何信息，因为缓冲区还并没有向真正的io.Writer中写入
	// 若缓冲区小于13则不写缓冲区直接写到原始的io.Writer中去
	n, err := writer.Write([]byte("hello world!\n"))
	if err != nil {
		log.Fatalf("Write error: %s\n", err)
	}
	log.Printf("Write ok: %d bytes\n", n)

	// 缓冲区信息
	log.Printf("缓冲区大小: %d\n", writer.Size())
	//_ = writer.Flush()   // 将缓冲区数据写入到io.Writer中
	//writer.Reset(writer) // 清空缓冲区, 未写入的则丢弃
	log.Printf("当前缓冲区已写入的字节数: %d\n", writer.Buffered())
	log.Printf("当前缓冲区未使用的字节数: %d\n", writer.Available())
	//b := writer.AvailableBuffer() // 返回未使用字节组成的切片, 等同于b := make([]byte, writer.Available())
}
```

:::

<br />

#### 读写测试

**写测试**

::: details 写缓冲性能测试

```go
package main

import (
	"bufio"
	"io"
	"log"
	"os"
	"sync"
	"time"
)

func WriteBufTest(srcFileName, dstFileName string, buffer bool) {
	// 定义变量
	var (
		total int64
		err   error
	)
	start := time.Now().Unix()

	// 打开src文件
	reader, err := os.Open(srcFileName)
	if err != nil {
		log.Fatalf("打开文件失败: %s: %s\n", srcFileName, err)
	}
	defer reader.Close()

	// 打开dst文件
	writer, err := os.OpenFile(dstFileName, os.O_RDWR|os.O_CREATE|os.O_TRUNC, os.ModePerm)
	if err != nil {
		log.Fatalf("打开文件失败: %s: %s\n", dstFileName, err)
	}
	defer writer.Close()

	// 是否使用buffer
	if buffer {
		// 生成buffer并写入
		w := bufio.NewWriterSize(writer, 1024*32)

		// 使用io.Copy写入
		//total, err = io.Copy(w, reader)

		// 手动读取写入
		buf := make([]byte, 1024)
		for {
			n, err := reader.Read(buf)
			if err != nil {
				if err == io.EOF {
					break
				}
				log.Fatalf("read error: %s\n", err)
			}

			_, err = w.Write(buf[:n])
			if err != nil {
				log.Fatalf("write error: %s\n", err)
			}
			total += int64(n)
		}

	} else {
		// 使用io.Copy写入
		//total, err = io.Copy(writer, reader)

		// 手动读取写入
		buf := make([]byte, 1024)
		for {
			n, err := reader.Read(buf)
			if err != nil {
				if err == io.EOF {
					break
				}
				log.Fatalf("read error: %s\n", err)
			}
			_, err = writer.Write(buf[:n])
			if err != nil {
				log.Fatalf("write error: %s\n", err)
			}
			total += int64(n)
		}
	}

	if err != nil {
		log.Fatalf("拷贝文件失败: %s\n", err)
	}
	delta := time.Now().Unix() - start
	log.Printf("It takes %d seconds to copy %d bytes for %s\n", delta, total, dstFileName)
}

func main() {
	var wg sync.WaitGroup
	wg.Add(2)
	go func() {
		WriteBufTest("D:\\iso\\CentOS-7-x86_64-DVD-1708.iso", "D:\\iso\\write_without_buffer.iso", false)
		wg.Done()
	}()
	go func() {
		WriteBufTest("D:\\iso\\CentOS-7-x86_64-DVD-1708.iso", "D:\\iso\\write_with_buffer.iso", true)
		wg.Done()
	}()
	wg.Wait()
}
```

:::

输出结果

```bash
2022/04/27 12:56:39 It takes 23 seconds to copy 4521459712 bytes for D:\iso\write_with_buffer.iso
2022/04/27 12:56:50 It takes 34 seconds to copy 4521459712 bytes for D:\iso\write_without_buffer.iso
```

> 💡 说明：
>
> 代码中给出了2种读写方式，`Read`/`Write`读写方式 和 `io.Copy`读写方式
>
> 从输出结果来看
>
> （1）使用`Read`/`Write`读写方式性能有明显提升（1.5倍左右），写缓存起到了很大的作用
>
> （2）但如果使用`io.Copy`方式读写文件，会使用`dst.ReadFrom(src)`方式读写，对我们这次测试来说并不准，用不用`bufio`，两者花费的时间几乎一致

**读测试**

::: details 读缓冲性能测试

```go
package main

import (
	"bufio"
	"io"
	"log"
	"os"
	"sync"
	"time"
)

func ReadBufTest(srcFileName string, buffer bool) {
	// 定义变量
	var (
		total int64
		err   error
	)
	start := time.Now().UnixMilli()

	// 打开src文件
	reader, err := os.Open(srcFileName)
	if err != nil {
		log.Fatalf("打开文件失败: %s: %s\n", srcFileName, err)
	}
	defer reader.Close()

	// 是否使用buffer
	if buffer {
		// 生成buffer并写入
		reader := bufio.NewReaderSize(reader, 1024*32)

		// 手动读取
		buf := make([]byte, 1024)
		for {
			n, err := reader.Read(buf)
			if err != nil {
				if err == io.EOF {
					break
				}
				log.Fatalf("read error: %s\n", err)
			}
			total += int64(n)
		}

	} else {
		// 手动读取
		buf := make([]byte, 1024)
		for {
			n, err := reader.Read(buf)
			if err != nil {
				if err == io.EOF {
					break
				}
				log.Fatalf("read error: %s\n", err)
			}
			total += int64(n)
		}
	}

	delta := float64((time.Now().UnixMilli() - start)) / 1000
	log.Printf("Read %d bytes in %.2f second: %s\n", total, delta, srcFileName)
}

func main() {
	var wg sync.WaitGroup
	wg.Add(2)
	go func() {
		ReadBufTest("D:\\iso\\CentOS-7-x86_64-DVD-1708.iso", false)
		wg.Done()
	}()
	go func() {
		ReadBufTest("D:\\iso\\CentOS-7-x86_64-DVD-1708.iso", true)
		wg.Done()
	}()
	wg.Wait()
}
```

:::

输出结果

```bash
2022/04/27 13:20:28 Read 4521459712 bytes in 1.15 second: D:\iso\CentOS-7-x86_64-DVD-1708.iso
2022/04/27 13:20:34 Read 4521459712 bytes in 7.15 second: D:\iso\CentOS-7-x86_64-DVD-1708.iso
```

> 可以看到，读的性能提升是巨大的，6倍左右，如果舍得用内存，性能还可以继续提升

<br />

### ioutils包：已被os/io包代替

官方文档：[https://pkg.go.dev/io/ioutil](https://pkg.go.dev/io/ioutil)

从Go 1.16开始，同样的功能现在由包`io`包或`os`包提供，在新代码中应该优先使用这些实现。有关详细信息，请参阅特定功能文档。

## 

## 并发编程

### `Goroutine`

#### 基础示例

Go语言中每个并发执行的单元叫`Goroutine`（协程），使用`go`关键字后接函数调用来创建一个`Goroutine`

`Goroutine`是并发安全的

::: details 测试协程代码

```go
package main

import (
	"fmt"
	"runtime"
)

func taskA() {
	for i := 0; i <= 10; i++ {
		fmt.Println(i)
	}
}

func taskB() {
	for i := 'A'; i <= 'Z'; i++ {
		fmt.Printf("%c\n", i)
	}
}

func main() {
	fmt.Println("start")
	go taskA() // 启动一个协程
	go taskB() // 启动另一个协程
	fmt.Println("end")
}

// 输出结果
// start
// end

// 问：协程函数没有执行吗？
// 答：原因是main()函数并不会等待所有协程执行完后再退出,这里main函数已经执行完了，协程还没执行到for循环，所以造成协程没有执行的假象
```

:::

<br />

####  等待Goroutine执行完成

::: details 等待所有协程执行完再退出-使用WaitGroup-方式1

```go
package main

import (
	"fmt"
	"sync"
)

// 声明WaitGroup
var wg sync.WaitGroup

func taskA() {
	for i := 0; i <= 10; i++ {
		fmt.Println(i)
	}
	wg.Done()
}

func taskB() {
	for i := 'A'; i <= 'Z'; i++ {
		fmt.Printf("%c\n", i)
	}
	wg.Done()
}

func main() {
	fmt.Println("start")
	wg.Add(2)
	go taskA() // 启动一个协程
	go taskB() // 启动另一个协程

	wg.Wait()
	fmt.Println("end")
}

// 输出结果
// start
// A
// 内容太多省略...	
// 10
// end
```

:::

::: details 等待所有协程执行完再退出-使用WaitGroup-方式2（推荐）

```go
package main

import (
	"fmt"
	"sync"
)

func taskA(wg *sync.WaitGroup) {
	for i := 0; i <= 10; i++ {
		fmt.Println(i)
	}
	wg.Done()
}

func taskB(wg *sync.WaitGroup) {
	for i := 'A'; i <= 'Z'; i++ {
		fmt.Printf("%c\n", i)
	}
	wg.Done()
}

func main() {
	fmt.Println("start")

	// 如果需要作为函数参数传递wg，则wg必须是引用类型
	wg := new(sync.WaitGroup)

	wg.Add(2)
	go taskA(wg) // 启动一个协程
	go taskB(wg) // 启动另一个协程

	wg.Wait()
	fmt.Println("end")
}

// 输出结果
// start
// A
// 内容太多省略...	
// 10
// end
```

:::

::: details 等待所有协程执行完再退出-使用 Channel

```go
package main

import (
	"fmt"
)

func taskA(ch chan struct{}) {
	for i := 0; i <= 10; i++ {
		fmt.Println(i)
	}
	ch <- struct{}{}
}

func taskB(ch chan struct{}) {
	for i := 'A'; i <= 'Z'; i++ {
		fmt.Printf("%c\n", i)
	}
	ch <- struct{}{}
}

func main() {
	fmt.Println("start")

	// 初始化channel
	n := 2 // 代表启动几个groutine
	ch := make(chan struct{}, n)

	go taskA(ch) // 启动一个协程
	go taskB(ch) // 启动另一个协程

	// 阻塞
	for i := 0; i < n; i++ {
		<-ch
	}

	fmt.Println("end")
}

// 输出结果
// start
// A
// 内容太多省略...	
// 10
// end
```

:::

<br />

#### Goroutine相关函数

| 函数                     | 说明                                                         |
| ------------------------ | ------------------------------------------------------------ |
| `runtime.NumGoroutine()` | 返回当前存在的`Goroutine`数量                                |
| `runtime.Gosched()`      | 暂停当前`Goroutine`，由Go自动调度其他`Goroutine`执行         |
| `runtime.Goexit()`       | 退出当前`Goroutine`                                          |
| `runtime.GOMAXPROCS(n)`  | 设置可以使用的最大CPU数量，默认值为`runtime.NumCPU()`；返回上一次设置的值 |

<br />

### Channel

#### 基础示例

`Channel`用于`Goroutine`之间的通信，中文可以称为”管道"或"通道"



**根据状态可以分为**

* `nil`，只声明未初始化的`Channel`
* 正常，声明并初始化的`Channel`
* 关闭，使用`close(Channel)`



**根据缓冲方式可以分为**

* 无缓冲区`Channel`
* 带缓冲区`Channel`



**根据读写方式可以分为**

* 读写`Channel`
* 只读`Channel`
* 只写`Channel`



::: details （1）定义

```go
package main

import "fmt"

func main() {
	// 声明一个int类型的channel
	var channel chan int
	fmt.Printf("%T %#v\n", channel, channel)

	// 初始化channel
	channel = make(chan int)
	fmt.Printf("%T %#v\n", channel, channel)

	// 以上两句可以简写成如下形式（推荐这种写法）
	ch := make(chan int)
	fmt.Printf("%T %#v\n", ch, ch)
}

// 输出结果
//chan int (chan int)(nil)
//chan int (chan int)(0xc00005e060)
//chan int (chan int)(0xc00005e0c0)
```

:::

::: details （2）读和写

```go
// 写数据：将100写入到channel中
ch <- 100

// 读数据-方式1， v代表读到的值
v := <-ch

// 读数据-方式2， v代表读到的值, ok代表channel的状态，true为channel正常，false为channel已经关闭
v, ok := <-ch

// 读取管道-方式3, 使用range遍历，这里只有一个返回值，若Channel关闭则for循环也随之结束
for v:= range ch {
    fmt.Println(v)
}

// 关闭channel
close(ch)

// 记忆技巧：箭头代表数据流向
```

:::

<br />

#### 无缓冲区`Channel`

**定义**

```go
ch := make(chan int)	// 无缓冲区channel, 等同于make(chan int, 0)，第二个参数代表可缓冲数据个数
```

**特性**

* 读和写不能在同一个协程中
* 读写次数不一致会发生死锁：`fatal error: all goroutines are asleep - deadlock!`
* 管道关闭后：
  * 假如继续读，不会阻塞，而是会读取到零值
  * 假如继续写，会报错：`panic: send on closed channel`
* 如果管道一切都正常，未读取之前写入会阻塞，未写入之前读取也会阻塞

::: details 测试1: 基础使用

```go
package main

import (
	"log"
	"time"
)

func main() {
	// 声明并初始化channel
	ch := make(chan int, 0)

	// 写数据
	go func() {
		for curTime := range time.Tick(time.Second) {
			second := curTime.Second()
			ch <- second
			log.Printf("Write to Channel  %d\n", second)
		}
	}()

	// 读数据
	for v := range ch {
		log.Printf("Read from Channel %d\n\n", v)
	}
}
```

输出结果

```bash
2022/04/17 11:51:32 Write to Channel  32
2022/04/17 11:51:32 Read from Channel 32

2022/04/17 11:51:33 Write to Channel  33
2022/04/17 11:51:33 Read from Channel 33

2022/04/17 11:51:34 Write to Channel  34
2022/04/17 11:51:34 Read from Channel 34
```

:::

<br />

#### 带缓冲区`Channel`

```go
ch := make(chan int, 3)	// 代表缓冲区长度为3，可以放3个数据
```

**特性**

* 读和写可以在同一个协程中

* 读写次数可以不一致，最大差不能超过缓冲区长度，否则同样会引发死锁：`fatal error: all goroutines are asleep - deadlock!`

  举个例子，缓冲区大小为1，则写入1次读取0次没有问题，写入2次读取0次就会引发死锁

* 管道关闭后：

  * 假如继续读，不会阻塞，而是会先读取缓冲区，若缓冲区读完会读到零值
  * 假如继续写，会报错：`panic: send on closed channel`

* 如果管道一切都正常，

  * 只有1个协程情况下（`main函数`），写满缓冲区再写入会报错，读完缓冲区再读取也会报错
  * 至少2个协程情况下（`go`关键字至少启动1个），写满缓冲区再写入会阻塞，读完缓冲区再读取也会阻塞

::: details 测试1: 读和写可以在同一个协程中

```go
package main

import (
	"fmt"
	"math/rand"
	"time"
)

func main() {
	// 初始化随机数种子
	rand.Seed(time.Now().Unix())

	// 声明并初始化channel
	ch := make(chan int, 1)

	// 写入数据（0-99之间的随机数）
	ch <- rand.Intn(99)

	// 读取数据
	fmt.Println("读取数据: ", <-ch)
}
```

:::

::: details 测试2: 读写次数可以不一致

```go
package main

import (
	"math/rand"
	"time"
)

func main() {
	// 初始化随机数种子
	rand.Seed(time.Now().Unix())

	// 声明并初始化channel，缓冲区大小为10
	ch := make(chan int, 10)

	// 写入数据次数, 写入10次读取0次没问题，写入11次读取0次就会发生死锁，因为缓冲区写满了
	n := 10

	// 写入数据（0-99之间的随机数）
	for i := 0; i < n; i++ {
		ch <- rand.Intn(99)
	}
}
```

:::

::: details 测试3: Channel关闭后再读取，会读完缓冲区后读取到零值

```go
package main

import "fmt"

func main() {
	// 声明并初始化channel，缓冲区大小为3
	ch := make(chan int, 3)

	// 写缓冲区
	ch <- 100
	ch <- 200
	ch <- 300

	// 关闭channel
	close(ch)

	// 读取数据
	for i := 0; i < 5; i++ {
		fmt.Println(<-ch)
	}
}

// 输出结果
// 100
// 200
// 300
// 0
// 0
```

:::

::: details 测试4: Channel关闭后再写入会直接报错，而不是写入到缓冲区

```go
package main

func main() {
	// 声明并初始化channel，缓冲区大小为3
	ch := make(chan int, 3)

	// 关闭channel
	close(ch)

	// 写数据，channel已经关闭了，不能写入到缓冲区，会直接报错，这和无缓冲channel表现一致
	ch <- 100
}
```

:::

::: details 测试5: 1个协程情况下（`main函数`），写满缓冲区再写入会报错

```go
package main

import "fmt"

func main() {
	// 声明并初始化channel，缓冲区大小为3
	ch := make(chan int, 3)

	// 写数据
	ch <- 100
	ch <- 100
	ch <- 100
	ch <- 100 // 这里直接报错

	fmt.Println(<-ch)
}
```

:::

::: details 测试6: 1个协程情况下（`main函数`），读完缓冲区再读取也会报错

```go
package main

import (
	"fmt"
)

func main() {
	// 声明并初始化channel，缓冲区大小为3
	ch := make(chan int, 3)

	// 写入
	ch <- 100

	// 读取
	fmt.Println(<-ch) // 正常读取
	fmt.Println(<-ch) // 报错
}
```

:::

::: details 测试7: 至少2个协程情况下（go关键字至少启动1个），写满缓冲区再写入会阻塞

```go
package main

import (
	"log"
	"runtime"
	"time"
)

func main() {
	// 声明并初始化channel，缓冲区大小为3
	ch := make(chan int, 3)

	// 开启一个协程
	go func() {
		time.Sleep(time.Second * 60)
		log.Println("协程运行结束")
	}()

	// 写入
	// 		循环次数：缓冲区+1次
	//		协程未运行完之前，第4次写入会卡住，等协程运行完，第4次写入就会报错
	for i := 0; i <= cap(ch); i++ {
		log.Printf("【开始】第%d次写入数据 | 当前协程数量: %d\n", i+1, runtime.NumGoroutine())
		ch <- 100
		log.Printf("【结束】第%d次写入数据 | 当前协程数量: %d\n\n", i+1, runtime.NumGoroutine())
	}
}
```

输出结果

```bash
2022/04/17 13:28:40 【开始】第1次写入数据 | 当前协程数量: 2
2022/04/17 13:28:40 【结束】第1次写入数据 | 当前协程数量: 2

2022/04/17 13:28:40 【开始】第2次写入数据 | 当前协程数量: 2
2022/04/17 13:28:40 【结束】第2次写入数据 | 当前协程数量: 2

2022/04/17 13:28:40 【开始】第3次写入数据 | 当前协程数量: 2
2022/04/17 13:28:40 【结束】第3次写入数据 | 当前协程数量: 2

2022/04/17 13:28:40 【开始】第4次写入数据 | 当前协程数量: 2
2022/04/17 13:29:40 协程运行结束
fatal error: all goroutines are asleep - deadlock!

goroutine 1 [chan send]:
main.main()
        C:/Users/Administrator/GolandProjects/learn/main.go:24 +0x18d

Process finished with the exit code 2
```

:::

::: details 测试8: 至少2个协程情况下（go关键字至少启动1个），读完缓冲区再读取也会阻塞

```go
package main

import (
	"log"
	"time"
)

func main() {
	// 声明并初始化channel，缓冲区大小为3
	ch := make(chan int, 3)

	// 开启一个协程
	go func() {
		time.Sleep(time.Second * 60)
		log.Println("协程运行结束")
	}()

	// 读取
	log.Println("开始读取")
	v, ok := <-ch
	log.Println("读取结束", v, ok)
}
```

输出结果

```bash
2022/04/17 13:36:51 开始读取
2022/04/17 13:37:51 协程运行结束
fatal error: all goroutines are asleep - deadlock!

goroutine 1 [chan receive]:
main.main()
        C:/Users/Administrator/GolandProjects/learn/main.go:20 +0x79
```

:::

<br />

#### 只读和只写限制

只是在原有的`Channel`上加了一层限制，只能读或只能写，默认的`Channel`是读写都支持的

**示例代码**

::: details 点击查看完整代码

```go
package main

import "fmt"

func chanReadOnly() {
	// 声明带缓冲区的channel，默认是支持读写的
	ch := make(chan int, 3)
	ch <- 100
	ch <- 200
	ch <- 300

	// 声明为只读channel
	var chReadOnly <-chan int
	chReadOnly = ch

	// 读数据
	fmt.Println(<-chReadOnly)

	// 写数据会报错
	//chReadOnly <- 400
}

func chanWriteOnly() {
	// 声明只写channel
	ch := make(chan<- int, 3)

	// 写数据
	ch <- 100
	ch <- 200
	ch <- 300

	// 读数据会报错
	//fmt.Println(<-ch)
}

func main() {
	chanReadOnly()
	chanWriteOnly()
}
```

:::

<br />

#### 多路复用select

**说明**

`select`是专门为`Goroutine`设计的，类似于`switch..case`语法

* 每个`case `表达式中都只能包含操作`Channel`的表达式，比如读或写
* 如果有多个`case `都可以运行，`select`会随机公平地选出一个执行，其他不会执行
* 如果多个`case `都不能运行，若有`default `子句，则执行该语句，反之，`select `将阻塞，直到某个`case `可以运行
* 空`select`会一直阻塞



**示例代码**

::: details 点击查看完整代码

```go
package main

import (
	"fmt"
)

func main() {
	c1 := make(chan int, 10)
	c2 := make(chan int, 10)

	// 测试1：直接执行会执行default语句

	// 测试2: 给C1管道写入数据；结果：在C1管道中读取到值： 1
	//c1 <- 1

	// 测试3，直接关闭管道；结果：C1管道中的数据为零值:  0
	//close(c1)

	// 测试4，两个管道都关闭，那么select会随机取一个，然后执行select后面的逻辑
	//close(c1)
	//close(c2)

	// 在多个管道中，只要有一个操作成功就执行相应逻辑
	select {
	case v, ok := <-c1:
		if ok {
			fmt.Println("在C1管道中读取到值：", v)
		} else {
			fmt.Println("C1管道中的数据为零值: ", v)
		}

	case v, ok := <-c2:
		if ok {
			fmt.Println("在C2管道中读取到值：", v)
		} else {
			fmt.Println("C2管道中的数据为零值: ", v)
		}
	default:
		fmt.Println("select default运行")
	}
}
```

:::

**for{ select }问题**

当需要循环操作时需要与`for`连用，这时候如果`select`中含有`break`，那么只能跳出`select`层而不能跳出`for`循环，下面演示一下

::: details 问题代码：for{ select }中只能跳出select不能跳出for循环

```go
package main

import (
	"fmt"
	"math/rand"
	"time"
)

func main() {
	// 初始化channel
	ch := make(chan int, 10)

	// 抽奖，获奖的ID放入channel中
	go func() {
		rand.Seed(time.Now().UnixNano())
		for range time.Tick(time.Second) {
			ch <- rand.Intn(500)
		}
	}()

	// 开奖，从channel中读数据
	for {
		select {
		case v := <-ch:
			if v >= 100 && v <= 400 { // 为了提高中奖几率..
				fmt.Println("恭喜你中奖了，请去领奖")
				break
			}
		}
	}

	// 领奖
	fmt.Println("感谢CCTV, 感谢MTV, 感谢党和人民的栽培...")
}
```

:::

::: details 修正-方式1：使用break 标签

```go
package main

import (
	"fmt"
	"math/rand"
	"time"
)

func main() {
	// 初始化channel
	ch := make(chan int, 10)

	// 抽奖，获奖的ID放入channel中
	go func() {
		rand.Seed(time.Now().UnixNano())
		for range time.Tick(time.Second) {
			ch <- rand.Intn(500)
		}
	}()

	// 开奖，从channel中读数据
ForEnd:		// 添加一个标签
	for {
		select {
		case v := <-ch:
			if v >= 100 && v <= 400 { // 为了提高中奖几率..
				fmt.Println("恭喜你中奖了，请去领奖")
				break ForEnd	// 跳出此标签
			}
		}
	}

	// 领奖
	fmt.Println("感谢CCTV, 感谢MTV, 感谢党和人民的栽培...")
}
```

:::

::: details 修正-方式2：使用goto 标签

```go
package main

import (
	"fmt"
	"math/rand"
	"time"
)

func main() {
	// 初始化channel
	ch := make(chan int, 10)

	// 抽奖，获奖的ID放入channel中
	go func() {
		rand.Seed(time.Now().UnixNano())
		for range time.Tick(time.Second) {
			ch <- rand.Intn(500)
		}
	}()

	// 开奖，从channel中读数据
	for {
		select {
		case v := <-ch:
			if v >= 100 && v <= 400 { // 为了提高中奖几率..
				fmt.Println("恭喜你中奖了，请去领奖")
				goto ForEnd	// 跳到指定标签
			}
		}
	}
ForEnd: // 定义标签

	// 领奖
	fmt.Println("感谢CCTV, 感谢MTV, 感谢党和人民的栽培...")
}
```

:::

<br />

#### 练习:select:设置函数执行超时时间

::: details 设置函数执行超时时间（有问题版本，主要是学习超时核心逻辑）

```go
package main

import (
	"fmt"
	"time"
)

func Add(x, y int) int {
	time.Sleep(time.Second * 2) // 模拟函数耗时操作
	return x + y
}

func main() {
	// 声明并初始化channel
	ch := make(chan int)

	// 执行协程
	go func() {
		ret := Add(111, 222) // 这个是我们原有的函数,并不做任何修改，非侵入式做超时控制
		ch <- ret
	}()

	// 超时控制
	select {
	case <-time.After(time.Second * 1):
		fmt.Println("执行超时")
	case v, ok := <-ch:
		if ok {
			fmt.Println("执行成功: ", v)
		} else {
			fmt.Println("执行报错: ", v)
		}
	}
}

// 都有哪些问题？
// (1) main内代码太多了，将超时控制的代码单独封装到一个函数中
// (2) Goroutine泄漏：假设超时以后，协程中还会写数据到channel中，而外边已经没有读的了，会一直阻塞，造成Goroutine泄漏
// (3) 该函数Add返回值没有包含错误，在实际场景中有些函数会有错误，错误如何传递？
```

:::

::: details 设置函数执行超时时间（优化后版本，还算完美）

* 单独封装了一个函数

* `Goroutine`泄漏问题将无缓冲的`channel`改为带缓冲区的`channel`，但仍需要原本的`Add`函数执行完成后才会退出`AddWithTimeout`内部启动的协程。

  Go不支持外部杀死一个正在运行的协程，参考：[https://github.com/golang/go/issues/32610](https://github.com/golang/go/issues/32610)

* 添加传递错误，`channel`修改为通知型

```go
package main

import (
	"errors"
	"fmt"
	"log"
	"runtime"
	"time"
)

func Add(x, y int) (int, error) {
	time.Sleep(time.Second * 5) // 模拟函数耗时操作
	return x + y, nil
}

func AddWithTimeout(x, y, timeout int) (ret int, err error) {
	// 声明并初始化channel
	ch := make(chan struct{}, 1)

	// 执行协程
	go func() {
		ret, err = Add(x, y) // 这个是我们原有的函数,并不做任何修改
		ch <- struct{}{}
	}()

	// 超时控制
	select {
	case <-time.After(time.Millisecond * time.Duration(timeout)):
		err = errors.New(fmt.Sprintf("Function executed for more than %d seconds: AddWithTimeout(%d, %d)", timeout, x, y))
	case <-ch:
	}
	return
}

func main() {
    // 开启多个协程
	for i := 0; i < 100000; i++ {
		go func() {
			ret, err := AddWithTimeout(1, 2, 5000)
			ret = ret
			err = err
			//fmt.Printf("执行结果: %d, %v\n", ret, err)
		}()
	}

    // 每隔1秒输出当前Goroutine数量
	for range time.Tick(time.Second) {
		g := runtime.NumGoroutine()
		log.Printf("当前Goroutine数量: %d\n", g)
		if g <= 1 {
			break
		}
	}
}
```

:::

<br />

#### 练习:channel:多个协程顺序打印数字

有4个`goroutine`，每个`goroutine`打印一个数字，要求按照1``/2/3/4``这样的顺序打印输出

::: details 点击查看完整代码

```go
package main

import (
	"log"
	"time"
)

type Token struct{}

func newWorker(id int, ch chan Token, nextCh chan Token) {
	for {
		token := <-ch
		log.Println(id + 1)
		time.Sleep(time.Second)
		nextCh <- token
	}
}

func main() {
	chs := []chan Token{
		make(chan Token),
		make(chan Token),
		make(chan Token),
		make(chan Token),
	}

	// 启动4个协程
	for i := 0; i < 4; i++ {
		go newWorker(i, chs[i], chs[(i+1)%4])
	}

	// 给第一个chan发送数据
	chs[0] <- Token{}

	// 会一直阻塞
	select {}
}
```

:::

<br />

### Context

官方文档：[https://pkg.go.dev/context](https://pkg.go.dev/context)

`context`是Go的标准库，用来管理`Goroutine`的上下文，`context`是并发安全的

使用上下文的程序应遵循以下规则

* 不要在结构类型中存储上下文；相反，将上下文显式地传递给每个需要它的函数
* 上下文应该是第一个参数，通常命名为`ctx`
* 即使函数允许，也不要传递nil上下文。如果您不确定要使用哪个上下文，请使用`context.TODO()`

<br />

#### `WithCancel`

用来取消子协程，以及孙子协程，以及孙子的孙子协程等

函数签名

```go
func WithCancel(parent Context) (ctx Context, cancel CancelFunc)
```

示例代码

::: details 先看一段正常的代码

```go
package main

import (
	"log"
	"sync"
	"time"
)

func worker(wg *sync.WaitGroup) {
    defer wg.Done()
	for i := 0; i < 10; i++ {
		log.Println(i + 1)
		time.Sleep(time.Second)
	}	
}

func main() {
	wg := new(sync.WaitGroup)
	wg.Add(1)

	go worker(wg)

	wg.Wait()
}
```

:::

::: details 对协程发送退出信号

```go
package main

import (
	"context"
	"log"
	"sync"
	"time"
)

func worker(ctx context.Context, wg *sync.WaitGroup) {
	defer wg.Done()
LOOP:
	for i := 0; i < 10; i++ {

		// 退出信号
		select {
		case <-ctx.Done():
			break LOOP
		default:
		}

		// 业务代码
		log.Println(i + 1)
		time.Sleep(time.Second)
	}
}

func main() {
	// 初始化
    // Background返回一个空Context。它永远不会被取消，没有截止日期，也没有值。
	// Background是所有Context树的根。
	ctx, cancel := context.WithCancel(context.Background())
	wg := new(sync.WaitGroup)

	// 开始工作了
	wg.Add(1)
	go worker(ctx, wg)

	// 5秒后退出
	time.Sleep(time.Second * 5)
	cancel()
	wg.Wait()
}
```

:::

<br />

#### `WithDeadline`和`WithTimeout`

`WithDeadline`和`WithTimeout`是在`WithCancel`的基础上，增加了一个过期时间

函数签名

```go
func WithDeadline(parent Context, d time.Time) (Context, CancelFunc)			// 增加一个具体的过期时间点
func WithTimeout(parent Context, timeout time.Duration) (Context, CancelFunc)	// 增加一个相对的过期时间段
```

示例代码

::: details 函数超时控制

```go
package main

import (
	"context"
	"log"
	"sync"
	"time"
)

func worker(ctx context.Context, wg *sync.WaitGroup) {
	defer wg.Done()
LOOP:
	for i := 0; i < 10; i++ {

		// 退出信号
		select {
		case <-ctx.Done():
			break LOOP
		default:
		}

		// 业务代码
		log.Println(i + 1)
		time.Sleep(time.Second)
	}
}

func main() {
	// 初始化
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*5)
    defer cancel()	// 这是一个好习惯
	wg := new(sync.WaitGroup)

	// 开始工作了
	wg.Add(1)
	go worker(ctx, wg)

	// 等待任务完成或超时
	wg.Wait()
}
```

:::

<br />

#### WithValue

可以携带一个值

函数签名

```go
func WithValue(parent Context, key, val any) Context
```

示例代码

::: details 点击查看完整代码

```go
package main

import (
	"context"
	"fmt"
	"log"
	"sync"
	"time"
)

func Work(ctx context.Context, wg *sync.WaitGroup) {
	defer wg.Done()
	for i := 0; i < 5; i++ {
		log.Println(i)
		time.Sleep(time.Second)
	}
	fmt.Println(ctx.Value("key"))
}

func main() {
	// 初始化
	ctx := context.WithValue(context.Background(), "key", "value")
	wg := new(sync.WaitGroup)

	// 工作
	wg.Add(1)
	go Work(ctx, wg)

	// 等待工作完成
	wg.Wait()
}
```

:::

<br />

### Sync

官方文档：[https://pkg.go.dev/sync](https://pkg.go.dev/sync)

`sync`是Go的标准库，提供了最基本的同步原语，使用时需要注意：对象一旦被使用就不应该被复制。



#### 互斥锁和读写锁

锁接口

```go
// A Locker represents an object that can be locked and unlocked.
type Locker interface {
	Lock()
	Unlock()
}
```

互斥锁

`sync.Mutex` 互斥锁，在某一时刻只能有一个协程可以拿到锁，拿不到的会一直阻塞，适合读少写多的场景

```go
Lock()/Unlock()		// 加锁/解锁
TryLock()			// 尝试获取锁，返回布尔值，此函数不会阻塞
```

读写锁

`sync.RWMutex` 读写锁，在某一时刻只能由任意的`reader`持有，或者是只能被单个的`writer`持有，适合读多写少的场景

```go
Lock()/Unlock()     	// 写操作调用的方法
RLock()/RUnlock()   	// 读操作调用的方法
TryLock()/TryRLock()	// 尝试获取锁,不会阻塞
RLocker()           	// 为读操作返回一个Locker接口的对象，他的Lock方法会调用RLock，他的Unlock会调用RUnlock
```



**💡 注意：未持有锁的协程也可以释放锁**

::: details 测试代码-1

```go
package main

import (
	"log"
	"sync"
	"time"
)

func main() {
	var mu sync.Mutex
	var wg sync.WaitGroup

	wg.Add(2)

	go func() {
		mu.Lock()
		log.Println("获取锁")
		wg.Done()
	}()

	go func() {
		time.Sleep(time.Second)
		mu.Unlock()
		log.Println("释放锁")
		wg.Done()
	}()

	wg.Wait()
}
// 未持有锁的协程也可以释放锁，但是非常不推荐这么使用
```

:::

::: details 测试代码-2

```go
package main

import (
	"log"
	"sync"
	"time"
)

func main() {
	var wg sync.WaitGroup
	var mu sync.Mutex

	wg.Add(2)
	go func() {
		time.Sleep(time.Second * 1)
		mu.Lock()
		log.Println("f1 lock")

		time.Sleep(time.Second * 10)
		mu.Unlock()
		log.Println("f1 unlock")

		wg.Done()
	}()

	go func() {
		time.Sleep(time.Second * 2)
		mu.Unlock()
		log.Println("f2 unlock")

		time.Sleep(time.Second * 5)
		mu.Lock()
		log.Println("f2 lock")
		wg.Done()
	}()

	wg.Wait()
	log.Println("End")
}
```

:::

<br />

#### 并发安全的Map的3种实现

::: details （1）原生Map+读写锁

```go
package main

import (
	"log"
	"sync"
)

type RWMap struct {
	sync.RWMutex
	m map[int]int
}

// 构造函数
func NewRWMap(n int) *RWMap {
	return &RWMap{
		m: make(map[int]int, n),
	}
}

// 读操作
func (m *RWMap) Load(k int) (int, bool) {
	m.RLock()
	defer m.RUnlock()
	v, ok := m.m[k]
	return v, ok
}

// 写操作
func (m *RWMap) Store(k int, v int) {
	m.Lock()
	defer m.Unlock()
	m.m[k] = v
}

// 删操作
func (m *RWMap) Delete(k int) {
	m.Lock()
	defer m.Unlock()
	delete(m.m, k)
}

// 遍历操作
func (m *RWMap) Range(f func(k, v int) bool) {
	m.RLock()
	defer m.RUnlock()
	for k, v := range m.m {
		if !f(k, v) {
			return
		}
	}
}

// 复合操作
func (m *RWMap) LoadAndDelete(k int) (int, bool) {
	m.RLock()
	defer m.RUnlock()
	v, ok := m.m[k]
	delete(m.m, k)
	return v, ok
}

func (m *RWMap) LoadAndStore(k int, v int) (int, bool) {
	m.RLock()
	defer m.RUnlock()
	v, ok := m.m[k]
	if ok {
		return v, true
	}
	m.m[k] = v
	return v, false
}

// 获取大小
func (m *RWMap) Len() int {
	m.RLock()
	defer m.RUnlock()
	return len(m.m)
}

func main() {
	// 初始化
	var wg sync.WaitGroup
	m := NewRWMap(1)

	// 写数据
	log.Println("开始写入数据")
	for i := 0; i < 10000000; i++ {
		wg.Add(1)
		go func(i int) {
			m.Store(i, i)
			wg.Done()
		}(i) // 注意这里要将i传入
	}
	wg.Wait()
	log.Println("写入数据完成")

	// 遍历
	log.Println("开始遍历数据")
	m.Range(func(k, v int) bool {
		if k != v {
			log.Printf("key is error: %d", k)
		}
		return true
	})
	log.Println("遍历数据完成")
}
```

:::

::: details （2）标准库 sync.Map

`sync.Map`是Go为我们提供的并发安全的`Map`，适用于读多写少的场景

（适用场景与原生`map` + `sync.RWMutex`类似，相比而言`sync.Map`读的性能更好写的性能更差）

```go
package main

import (
	"fmt"
	"sync"
)

func main() {
	var m sync.Map
	var wg sync.WaitGroup

	// 写数据，并发写
	for i := 0; i <= 20; i++ {
		wg.Add(1)
		go func(i int) {
			defer wg.Done()
			m.Store(i, i)
		}(i)
	}
	wg.Wait()
	// 写数据，支持不同的数据类型
	m.Store("a", 1)
	m.Store('a', "中国")

	// 读数据
	fmt.Println(m.Load(10))            // 读取
	fmt.Println(m.LoadAndDelete(10))   // 读取并删除
	fmt.Println(m.LoadOrStore(10, 20)) // 读取,第二个返回值代表是否读取到，若读不到则设置value为该值并返回

	// 删除数据
	m.Delete("a") // 无返回值
	m.Delete("a")

	// 遍历
	m.Range(func(key, value any) bool {
		fmt.Println(key, value)
		return true
	})
}
```

:::

::: details 第三方库：通过`map`分片实现

`Github`地址：[https://github.com/orcaman/concurrent-map](https://github.com/orcaman/concurrent-map)

`concurrent-map`提供了一种高性能的解决方案:通过对内部`map`进行分片，降低锁粒度，从而达到最少的锁等待时间(锁冲突)

**实现逻辑**

* 默认对`map`分了32片（每一片是一个结构体，每个结构体包含原生Map和读写锁），所有分片存储在一个切片中`[]*ConcurrentMapShared`
* 每次操作时(增删改查)，先通过`GetShard(key)`获取`key`所在的分片，然后对分片加锁后再操作

```go
package main

import (
	"github.com/orcaman/concurrent-map"
	"log"
	"strconv"
	"sync"
)

func main() {
	// 初始化
	var wg sync.WaitGroup
	m := cmap.New() // 初始化Map
	loop := 1000000 // 循环次数

	// 写数据，值必须为string，这是代码里写死的
	for i := 0; i < loop; i++ {
		wg.Add(1)
		go func(i int) {
			defer wg.Done()
			m.Set(strconv.Itoa(i), i*i)
		}(i)
	}
	wg.Wait()

	// 获取数据并校验
	for i := 0; i < loop; i++ {
		wg.Add(1)
		go func(i int) {
			defer wg.Done()
			if v, ok := m.Get(strconv.Itoa(i)); ok {
				if v != i*i {
					log.Printf("key err: %d\n", i)
				}
			}
		}(i)
	}
	wg.Wait()
}
```

:::

<br />

#### 只执行一次

`sync.Once`只暴露了一个方法`Do`,多次调用`Do`方法，但是只有第一次调用`Do`方法时参数`f`函数才会执行，`f`函数是无参数无返回值的函数

**单例模式与重置**

::: details 点击查看完整代码

```go
package main

import (
	"fmt"
	"sync"
)

type Person struct {
	name string
}

var (
	once   sync.Once
	person *Person
)

func NewPerson(name string) *Person {
	once.Do(func() {
		person = &Person{name: name}
	})
	return person
}

func RestPerson() {
	once = sync.Once{}
}

func main() {
	// 单例模式
	fmt.Printf("%p\n", NewPerson("a"))
	fmt.Printf("%p\n", NewPerson("b"))

	// 重置
	RestPerson()
    
    // 继续单例模式
	fmt.Printf("%p\n", NewPerson("c"))
	fmt.Printf("%p\n", NewPerson("d"))
}

// 输出结果
// 0xc00004a250
// 0xc00004a250
// 0xc00004a260
// 0xc00004a260
```

:::

>  👀  其他单例模式扩展
>
> 方法1：定义包级别的变量  
> 方法2：包级别`init`函数初始化  
> 方法3：在`main`函数中，执行一个初始化函数

<br />

#### 临时缓存池

`sync.Pool`是一个临时缓存池，并发安全

**注意事项**

* 池对象可以随时被垃圾回收掉，所以HTTP长连接、数据库长连接等不适合使用它
* 池中要放入引用类型的对象，不然是对象的拷贝则起不到缓存池的作用
* 在对象用完以后，放入池中之前，最好做一下清理工作，不然下次从池中会拿到一个有使用痕迹的对象
* `Get()`和`Put(x)`是并发安全的，但是`New()`不是并发安全的，但是并不影响我们使用



**定义和方法**

```go
// sync.Pool结构体定义
type Pool struct {
	... 			// 忽略
	New func() any	// 当池为空时会调用此方法来创建对象并放入池中
}

// sync.Pool结构体方法
func (p *Pool) Get() any {}		// 从池中取走一个元素，同时会在池中删除这个元素
								// 如果Pool中没有元素了，会使用结构体的New方法创建一个元素
        						// 如果结构体没有定义New方法，那么Get方法会返回nil，所以在使用Get时要判断nil的情况
func (p *Pool) Put(x any) {}	// 将元素放到Pool，如果元素为nil，那么Pool会忽略这个值
```

**基本使用**

::: details 点击查看完整代码

```go
package main

import (
	"fmt"
	"sync"
)

type User struct {
	Name string
}

func (u *User) Clean() {
	u.Name = ""
}

func main() {
	// 初始化池
	pool := &sync.Pool{
		New: func() interface{} {
			return new(User)
		}}

	// 从池中获取对象
	user := pool.Get().(*User)
	fmt.Printf("%#v %p\n", user, user)

	// 使用对象
	user.Name = "bob"
	fmt.Printf("%#v %p\n", user, user)

	// 用完了，放回池中
	user.Clean() // 放回池之前执行清理工作，不然下次从池中会拿到一个有使用痕迹的对象
	pool.Put(user)

	// 再次申请一个
	user2 := pool.Get().(*User)
	fmt.Printf("%#v %p\n", user2, user2)
}

// 输出结果
// &main.User{Name:""} 0xc00004a250
// &main.User{Name:"bob"} 0xc00004a250
// &main.User{Name:""} 0xc00004a250
```

:::

<br />

#### 并发安全的字节池的2种实现

::: details （1）sync.Pool实现

代码来自`Hugo`：[https://github.com/gohugoio/hugo](https://github.com/gohugoio/hugo)

```go
package main

import (
	"bytes"
	"fmt"
	"sync"
)

var bufferPool = &sync.Pool{
	New: func() any {
		return &bytes.Buffer{}
	},
}

// GetBuffer returns a buffer from the pool.
func GetBuffer() (buf *bytes.Buffer) {
	return bufferPool.Get().(*bytes.Buffer)
}

// PutBuffer returns a buffer to the pool.
// The buffer is reset before it is put back into circulation.
func PutBuffer(buf *bytes.Buffer) {
	buf.Reset()
	bufferPool.Put(buf)
}

func main() {
	// 从池子取出对象
	buf := GetBuffer()
	fmt.Printf("长度: %d | 容量: %d\n", buf.Len(), buf.Cap())

	// 使用
	for i := 0; i < 10000; i++ {
		buf.Write([]byte("Hello"))
	}
	fmt.Printf("长度: %d | 容量: %d\n", buf.Len(), buf.Cap())

	// 放入池子
	PutBuffer(buf)

	// 再次从池子取出
	buf2 := GetBuffer()
	fmt.Printf("长度: %d | 容量: %d\n", buf2.Len(), buf2.Cap())
}
```

:::

::: details （2）使用channel实现

代码来自minio：[https://github.com/minio/minio](https://github.com/minio/minio)

```go
package main

import "fmt"

// BytePoolCap implements a leaky pool of []byte in the form of a bounded channel.
type BytePoolCap struct {
	c    chan []byte
	w    int
	wcap int
}

// NewBytePoolCap creates a new BytePool bounded to the given maxSize, with new
// byte arrays sized based on width.
func NewBytePoolCap(maxSize int, width int, capwidth int) (bp *BytePoolCap) {
	return &BytePoolCap{
		c:    make(chan []byte, maxSize),
		w:    width,
		wcap: capwidth,
	}
}

// Get gets a []byte from the BytePool, or creates a new one if none are
// available in the pool.
func (bp *BytePoolCap) Get() (b []byte) {
	select {
	case b = <-bp.c:
	// reuse existing buffer
	default:
		// create new buffer
		if bp.wcap > 0 {
			b = make([]byte, bp.w, bp.wcap)
		} else {
			b = make([]byte, bp.w)
		}
	}
	return
}

// Put returns the given Buffer to the BytePool.
func (bp *BytePoolCap) Put(b []byte) {
	select {
	case bp.c <- b:
		// buffer went back into pool
	default:
		// buffer didn't go back into pool, just discard
	}
}

// Width returns the width of the byte arrays in this pool.
func (bp *BytePoolCap) Width() (n int) {
	return bp.w
}

// WidthCap returns the cap width of the byte arrays in this pool.
func (bp *BytePoolCap) WidthCap() (n int) {
	return bp.wcap
}

func main() {
	// 初始化池子
	pool := NewBytePoolCap(10000, 512, 512)

	// 从池子取出对象
	buf := pool.Get()
	fmt.Printf("长度: %d | 容量: %d\n", len(buf), cap(buf))

	// 使用
	for i := 0; i < 10000; i++ {
		buf = append(buf, 'h')
	}
	fmt.Printf("长度: %d | 容量: %d\n", len(buf), cap(buf))

	// 放入池子
	pool.Put(buf)

	// 再次从池子取出
	buf2 := pool.Get()
	fmt.Printf("长度: %d | 容量: %d\n", len(buf2), cap(buf2))
}
```

:::

::: details（3）注意事项：内存泄漏问题

描述：当`byte`很大的时候，再放入池子，就会引起内存泄漏

解决：放回池子时判断`Byte`大小，如果很大就直接丢弃

参考：

```go
// fmt包print.go文件

// 定义池子
var ppFree = sync.Pool{
	New: func() any { return new(pp) },
}

// 放回池子操作
func (p *pp) free() {
	// Proper usage of a sync.Pool requires each entry to have approximately
	// the same memory cost. To obtain this property when the stored type
	// contains a variably-sized buffer, we add a hard limit on the maximum buffer
	// to place back in the pool.
	//
	// See https://golang.org/issue/23199
	if cap(p.buf) > 64<<10 {	// 容量过大则丢弃
		return
	}

	p.buf = p.buf[:0]
	p.arg = nil
	p.value = reflect.Value{}
	p.wrappedErr = nil
	ppFree.Put(p)
}
```

:::

::: details（4）注意事项：内存浪费问题

描述：如果池子内的`buffer`比较大，但是实际用的话比较小，就存在浪费问题了

解决：定义多种规格的池子，按需使用

参考：

```go
// net/http包server.go

var (
	bufioReaderPool   sync.Pool
	bufioWriter2kPool sync.Pool
	bufioWriter4kPool sync.Pool
)
```

:::

<br />

#### 条件变量

`sync.Cond`并不被推荐使用，这里权当了解一下

::: details 点击查看完整代码

```go
package main

import (
	"log"
	"sync"
	"time"
)

var done = false

func read(name string, c *sync.Cond) {
	c.L.Lock()
	for !done {
		c.Wait() // 会释放锁，被唤醒时又会重新获得锁
	}
	log.Println(name, "starts reading")
	c.L.Unlock()
}

func write(name string, c *sync.Cond) {
	log.Println(name, "starts writing")
	time.Sleep(time.Second)
	c.L.Lock()
	done = true
	c.L.Unlock()
	log.Println(name, "wakes all")
	c.Broadcast()
}

func main() {
	cond := sync.NewCond(&sync.Mutex{})

	go read("reader1", cond)
	go read("reader2", cond)
	go read("reader3", cond)
	write("writer", cond)

	time.Sleep(time.Second * 3)
}
```

:::

<br />

### sync/atomic

官方文档：[https://pkg.go.dev/sync/atomic](https://pkg.go.dev/sync/atomic)

`sync/atomic`包提供了一系列原子相关操作

**特点**

* 原子操作是不允许中断的（`interrupt`），所以可以实现无锁并发（`lock-free`）
* 原子操作是不允许中断的（`interrupt`），所以它必须很快，所以提供的原子方法数量很少
* 原子操作由底层硬件实现，`Mutex`是由操作系统实现的，所以原子操作性能更好

#### **基本数据类型-原子操作**

| 分类       | 方法                                                         | 说明                                                         |
| ---------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 加减法     | (1)`AddInt32(addr *int32, delta int32) (new int32)`<br />(2)`AddInt64(addr *int64, delta int64) (new int64)`<br />(3)`AddUint32(addr *uint32, delta uint32) (new uint32)`<br />(4)`AddUint64(addr *uint64, delta uint64) (new uint64)`<br />(5)`AddUintptr(addr *uintptr, delta uintptr) (new uintptr)` | （1）减法需要注意：<br />对于`Int`类型，加一个负数即可<br />对于`Uint`类型，使用位运算来得到负数<br />（2）这个只支持5种数据类型 |
| 交换       | (1)`SwapInt32(addr *int32, new int32) (old int32)`<br />(2)`SwapInt64(addr *int64, new int64) (old int64)`<br />(3)`SwapUint32(addr *uint32, new uint32) (old uint32)`<br />(4)`SwapUint64(addr *uint64, new uint64) (old uint64)`<br />(5)`SwapUintptr(addr *uintptr, new uintptr) (old uintptr)`<br />(6)`SwapPointer(addr *unsafe.Pointer, new unsafe.Pointer) (old unsafe.Pointer)` | "赋值"并返回旧值                                             |
| 比较并交换 | (1)`CompareAndSwapInt32(addr *int32, old, new int32) (swapped bool)`<br />(2)`CompareAndSwapInt64(addr *int64, old, new int64) (swapped bool)`<br />(3)`CompareAndSwapUint32(addr *uint32, old, new uint32) (swapped bool)`<br />(4)`CompareAndSwapUint64(addr *uint64, old, new uint64) (swapped bool)`<br />(5)`CompareAndSwapUintptr(addr *uintptr, old, new uintptr) (swapped bool)`<br />(6)`CompareAndSwapPointer(addr *unsafe.Pointer, old, new unsafe.Pointer) (swapped bool)` | "比较并赋值"并返回旧值                                       |
| 加载       | (1)`LoadInt32(addr *int32) (val int32)`<br />(2)`LoadInt64(addr *int64) (val int64)`<br />(3)`LoadUint32(addr *uint32) (val uint32)`<br />(4)`LoadUint64(addr *uint64) (val uint64)`<br />(5)`LoadUintptr(addr *uintptr) (val uintptr)`<br />(6)`LoadPointer(addr *unsafe.Pointer) (val unsafe.Pointer)` | "读取"变量的值                                               |
| 存储       | (1)`StoreInt32(addr *int32, val int32)`<br />(2)`StoreInt64(addr *int64, val int64)`<br />(3)`StoreUint32(addr *uint32, val uint32)`<br />(4)`StoreUint64(addr *uint64, val uint64)`<br />(5)`StoreUintptr(addr *uintptr, val uintptr)`<br />(6)`StorePointer(addr *unsafe.Pointer, val unsafe.Pointer)` | "赋值"不会返回旧值<br />这个和`Swap`系列函数很像             |

示例代码

::: details 点击查看完整代码

```go
package main

import (
	"fmt"
	"sync/atomic"
)

func Add() {
	// 加法
	var x int32 = 100
	var y uint32 = 1000

	// 因为x是有符号整数，可以减法可以写成加法，-1 -> + -1
	atomic.AddInt32(&x, int32(-1))

	// 因为y是无符号整数，所以不能使用uint32(-1)
	// 这时候可以使用^作为一元运算符使用，按位取反，得到类似-1的效果
	atomic.AddUint32(&y, ^uint32(0))

	fmt.Printf("加减法:\n")
	fmt.Printf("x = %d\n", x)
	fmt.Printf("y = %d\n", y)
}

func Swap() {
	fmt.Printf("\n交换:\n")
	var x int32 = -100
	var y int32 = 200
	old := atomic.SwapInt32(&x, y) // y值保持不变，x值更新为y值，old为x的旧值
	fmt.Printf("x = %d\n", x)
	fmt.Printf("y = %d\n", y)
	fmt.Printf("old = %d\n", old)	
}

func CompareAndSwap() {
	// 先比较，再决定是否覆盖
	// 如果x == y，那么用z覆盖x，并返回true
	// 如果x != y，那么什么都不做，并返回false
	fmt.Printf("\n比较并交换:\n")
	var x int32 = -300
	var y int32 = -300
	var z int32 = 400
	if atomic.CompareAndSwapInt32(&x, y, z) {
		fmt.Printf("比较并交换成功: %d %d %d\n", x, y, z)
	} else {
		fmt.Printf("比较并交换失败: %d %d %d\n", x, y, z)
	}
}

func Load() {
	fmt.Printf("\n加载:\n")
	var x int32 = -999
	fmt.Printf("x = %d\n", atomic.LoadInt32(&x)) // -999
}

func Store() {
	fmt.Printf("\n存储:\n")
	var x int32 = 888
	atomic.StoreInt32(&x, int32(222))
	fmt.Printf("x = %d\n", x) // 222
}

func main() {
	Add()
	Swap()
	CompareAndSwap()
	Load()
	Store()
}
```

输出结果

```bash
加减法:
x = 99                      
y = 999                     
                            
交换:                       
x = 200                     
y = 200                     
old = -100                  
                            
比较并交换:                 
比较并交换成功: 400 -300 400
                            
载入:                       
x = -999                    
                            
存储:                       
x = 222
```

:::

<br />

#### 任意数据类型-原子操作

如果是其他类型的数据，`atomic`为我们提供了`Value`结构体来原子操作

注意事项

* 默认为`nil`值
* 原子值存储的第一个值，决定了它今后能且只能存储哪一个类型的值
* 切片、映射等不支持"比较并交换"

示例代码

::: details 点击查看完整代码

```go
package main

import (
	"fmt"
	"sync/atomic"
)

func main() {
	// 初始化
	var v atomic.Value

	// 存储任意数据类型
	v.Store("hello")

	// 加载任意数据类型
	x := v.Load().(string)
	fmt.Printf("x的数据类型: %T | x的值: %#v\n", x, x)

	// 交换
	v.Swap("world!")

	// 比较并交换
	if v.CompareAndSwap("world!", "hello world!") {
		fmt.Printf("比较并交换成功: %s\n", v.Load())
	} else {
		fmt.Printf("比较并交换失败: %s\n", v.Load())
	}
}
```

:::

<br />

#### 使用原子操作优化举例

::: details 点击查看完整代码

```go
package main

import (
	"fmt"
	"sync"
	"sync/atomic"
)

func main() {
	var data int64 = 0
	var wg sync.WaitGroup

	for i := 0; i < 10000; i++ {
		wg.Add(1)
		go func() {
			//data++                  // 非原子操作，这会引起数据竞争
			atomic.AddInt64(&data, 1) // 原子操作
			wg.Done()
		}()
	}

	wg.Wait()
	fmt.Println(data)
}
```

:::

<br />

### 数据竞争检测手段

并发读写共享资源的时候会出现数据竞争`(data race)`，所以需要像锁等机制来进行保护

在编译`(cmpile)`、测试`（test）`、运行`（run）`前使用`--race`选项能检测数据竞争问题，

他的原理是：在程序运行以后，会监控程序对内存地址访问，并打印出提示

注意事项：

* 如果程序在以后会访问某个资源，此时使用`--race`是检测不到的
* 开启了`--race`不要部署到线上，因为会有性能问题，测试期间可以开启`--race`

::: details 并发不安全代码

```go
package main

import (
	"fmt"
	"sync"
)

func main() {
	var data int = 0
	var wg sync.WaitGroup

	for i := 0; i < 10000; i++ {
		wg.Add(1)
		go func() {
			data++
			wg.Done()
		}()
	}

	wg.Wait()
	fmt.Println(data)
}

// 每次运行结果都不一样，大概在为9600左右，原理是产生了数据竞争，data++不是一个原子操作，操作是可以被打断的
// 比如说 有2个协程同时拿到了data为100，那么协程1给data+1=101，协程2也给data+1=101，经过这俩协程一番操作，data只增长了1，
// 所以我们虽然循环了一万次，其实结果要<=10000，如果将上面的循环次数修改为100次，那么结果是正确的，但其实是还是有问题的
```

下面开启`--race`检测数据竞争

```bash
Goroutine 8 (running) created at:
  main.main()
      C:/Users/Administrator/GolandProjects/learn/main.go:14 +0x84

Goroutine 7 (finished) created at:
  main.main()
      C:/Users/Administrator/GolandProjects/learn/main.go:14 +0x84
==================
10000
Found 1 data race(s)	# 发现1个数据竞争
exit status 66
```

:::

::: details （1）解决方式1：加锁

```go
package main

import (
	"fmt"
	"sync"
)

func main() {
	var data int = 0
	var wg sync.WaitGroup
	var mu sync.Mutex

	for i := 0; i < 10000; i++ {
		wg.Add(1)
		go func() {
			mu.Lock()
			data++
			mu.Unlock()
			wg.Done()
		}()
	}

	wg.Wait()
	fmt.Println(data)
}

// 运行并开启--race检测
// go run -race main.go  
// 10000
```

:::

::: details （2）解决方式2：原子操作

```go
package main

import (
	"fmt"
	"sync"
	"sync/atomic"
)

func main() {
	var data int64 = 0
	var wg sync.WaitGroup

	for i := 0; i < 10000; i++ {
		wg.Add(1)
		go func() {
			//data++ // 非原子操作，这会引起数据竞争
			atomic.AddInt64(&data, 1) // 原子操作,这里手动将data的类型改为了int64,如果不改类型如何做?
			wg.Done()
		}()
	}

	wg.Wait()
	fmt.Println(data)
}
```

:::

## 

## 其他

### 交叉编译

交叉编译简单来说指的是在当前平台上可以编译出其他平台的可执行程序，比如在Windows下编译Linux二进制程序

对于`go`来说主要控制3个变量：

* `CGO_ENABLED=0`：Go在编译时可以选择使用C链接库(C链接库不打包进程序)或纯Go编译(打包所有内容)，`CGO_ENABLED`参数控制是否启用`CGO`
* `GOOS=<目标平台的操作系统>`，比如`windows`、`linux`、`darwin`、`freebsd`
* `GOARCH=<目标平台的体系架构>`，比如`amd64`,`386`、`arm`

```bash
# Windows下编译Linux和Mac64位可执行程序
SET CGO_ENABLED=0
SET GOOS=linux
SET GOARCH=amd64
go build .

SET CGO_ENABLED=0
SET GOOS=darwin
SET GOARCH=amd64
go build .

# Mac下编译Linux和Windows64位可执行程序
CGO_ENABLED=0 GOOS=linux   GOARCH=amd64 go build .
CGO_ENABLED=0 GOOS=windows GOARCH=amd64 go build .

# Linux下编译Mac和Windows 64位可执行程序
CGO_ENABLED=0 GOOS=darwin  GOARCH=amd64 go build .
CGO_ENABLED=0 GOOS=windows GOARCH=amd64 go build .
```

### 编译时自动添加版本

::: details 点击查看完整代码

`main.go`：这只是一段普通的、简单的Go代码

```go
package main

import (
	"fmt"
	"os"
	"strings"
)

var (
	Version   string
	GoVersion string
	GitCommit string
	BuildTime string
	OS        string
	Arch      string
)

func main() {
	args := os.Args
	if len(args) >= 2 {
		if strings.ToLower(args[1]) == "--version" || strings.ToLower(args[1]) == "-v" {
			fmt.Printf("Version:             %s\n", Version)
			fmt.Printf("Go version:          %s\n", GoVersion)
			fmt.Printf("Git commit:          %s\n", GitCommit)
			fmt.Printf("Build time:          %s\n", BuildTime)
			fmt.Printf("OS/Arch:             %s/%s\n", OS, Arch)
			return
		}
	}
}
```

`build.sh`

> 提醒：在Windows上执行脚本会找不到`awk`和`date`命令，此时可以安装 [cygwin](https://www.cygwin.com/) 来解决

```bash
#!/bin/bash
set -euo pipefail

# =====================================
# 描述: 编译Go项目为linux/amd64二进制命令
# =====================================

# 定义变量，用于编译时注入到Go程序中
Version=$(go version | awk '{print $3}')
GitCommit=$(git rev-parse --short HEAD 2>/dev/null || echo unknown)
BuildTime=$(date +"%Y-%m-%d %H:%M:%S %Z %z")
OS=linux
Arch=amd64

# 交叉编译，若不需要直接注释下面3行即可
# (1) 这里必须使用环境变量，否则设置不生效
# (2) 或者将以下的变量写到go build那一行前面去，即 CGO_ENABLED=0 ... go build ...
export CGO_ENABLED=0
export GOOS=${OS}
export GOARCH=${Arch}

# 生成flags
flags="-X main.Version=1.0.0 \
       -X main.GoVersion=${Version} \
       -X main.GitCommit=${GitCommit} \
       -X 'main.BuildTime=${BuildTime}' \
       -X main.OS=${OS} \
       -X main.Arch=${Arch}"

# go build的其他参数
Options="$*"

# 编译,通过ldflags注入变量信息
go build -ldflags "${flags}" ${Options} main.go
```

:::

输出结果

```bash
# 在Linux上执行
[root@localhost ~]# bash build.sh
[root@localhost ~]# ./main -v
Version:             1.0.0
Go version:          go1.18.1
Git commit:          unknown
Build time:          2022-09-04 21:34:06 CST +0800
OS/Arch:             linux/amd64

# 在Windows上执行
Administrator@DESKTOP-22K80U8 /cygdrive/c/Users/Administrator/GolandProjects/demo
$ sh build.sh -o demo
# 传到Linux上去
[root@localhost ~]# chmod 755 demo 
[root@localhost ~]# ./demo -v
Version:             1.0.0
Go version:          go1.19
Git commit:          unknown
Build time:          2022-09-04 22:51:19 CST +0800
OS/Arch:             linux/amd64
```

<br />

### 多进度条实现原理

```go
package main

import (
	"fmt"
	"time"
)

const (
	PreviousLineClear = "\033[F" // 光标回到上一行行首并清空行
	CurrentLineClear  = "\033[K" // 光标回到当前行行首并清空行
)

func main() {
	for i := 11; i >= 1; i-- {
		if i != 11 {
			fmt.Printf(PreviousLineClear)
			fmt.Printf(PreviousLineClear)
		}
		fmt.Printf("%s%d\n", CurrentLineClear, i)
		fmt.Printf("%s%d\n", CurrentLineClear, i)
		time.Sleep(time.Millisecond * 500)
	}
}
```

