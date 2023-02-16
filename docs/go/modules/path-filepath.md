# path/filepath

文档：[https://pkg.go.dev/path/filepath](https://pkg.go.dev/path/filepath)

<br />

## 两种目录

**目录说明**

Go可以输出目录的路径，但是会受到一些外在因素的影响，因此我将目录分为两类，并解释会受到何种因素的影响

**（1）运行时所在目录：执行程序时用户所在的目录**

* 以下两种执行代码输出的目录路径是不一样的，因为用户所在的目录发生了变化
  * `go run example/main.go`
  * `cd example && go run main.go`
* 我们写的代码大部分情况都是使用这种目录，比如`os.Open`、`os.WriteFile`、`filepath.Abs`等函数
* `go run`和`go build`输出的结果一致，因为用户所在的目录没有发生变化

**（2）二进制所在目录：二进制命令所在的目录**

* 只要程序（二进制命令）路径没有发生变化，那么不管在哪个目录下执行程序输出结果都不会有影响
* 在特殊情况下可能会用到这种目录，比如在项目内部记录一些数据、日志等
* `go run`和`go build`输出的结果不一致，因为`go run`会把代码编译到一个临时目录中，也就是说二进制命令目录发生了变化

**演示环境**

* Linux演示环境项目目录： `/root/example`
* Windows演示环境目录：`D:\application\GoLand\example`

::: details （1）运行时所在目录

```go
package main

import (
	"fmt"
	"os"
)

// 字符串格式化模板
const FORMAT = "%-20s %s\n"

func main() {
	// 运行时所在目录
	pwd, err := os.Getwd()
    if err != nil {
        panic(err)
    }
	fmt.Printf(FORMAT, "运行时所在目录:", pwd)
}
```

输出结果

```bash
# -------------------------------------------------------------------
# Linux

# 先编译一下
[root@ap-hongkang example]# go build main.go

# 在项目根目录下运行
[root@ap-hongkang example]# go run main.go && ./main
运行时所在目录:             /root/example
运行时所在目录:             /root/example

# 切换到其他目录运行
[root@ap-hongkang example]# cd ..
[root@ap-hongkang ~]# go run example/main.go && ./example/main
运行时所在目录:             /root
运行时所在目录:             /root

# -----------------------------------------------------------------
# Windows

# 先编译一下
D:\application\GoLand\example>go build main.go

# 在项目根目录下运行
D:\application\GoLand\example>go run main.go && main.exe
运行时所在目录:             D:\application\GoLand\example
运行时所在目录:             D:\application\GoLand\example

# 切换到其他目录运行
D:\application\GoLand\example>cd ..
D:\application\GoLand>go run example/main.go && example\main.exe
运行时所在目录:             D:\application\GoLand
运行时所在目录:             D:\application\GoLand
```

:::

::: details （2）二进制所在目录

备注：使用`os.Executable`重新改写一下会简单一些，以后再做

```go
package main

import (
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
)

// 字符串格式化模板
const FORMAT = "%-20s %s\n"

// GetBinaryFilePath 获取二进制命令路径
func GetBinaryFilePath(followSymLinks bool) (filePath string, fileName string, err error) {
	// 获取二进制命令的文件名，根据执行方式不同结果不同:
	// 1.以绝对路径执行，获取到绝对路径
	// 2.以相对路径执行，获取到相对路径
	file, err := exec.LookPath(os.Args[0])
	if err != nil {
		return filePath, fileName, err
	}

	// 获取文件的绝对路径
	// 1.文件在不在它并不会校验
	// 2.如果传入一个绝对路径,它直接返回
	// 3.如果传入一个相对路径，它会使用 运行时目录 + 相对路径 组合出一个绝对路径再返回
	fileAbsPath, err := filepath.Abs(file)
	if err != nil {
		return filePath, fileName, err
	}

	// 是否跟随符号链接
	// 1.Linux只跟随软连接，不跟随硬链接
	// 2.Linux支持跟随多级软连接
	// 3.Windows 10下总是跟随快捷方式
	//   CMD下无法执行快捷方式的二进制命令，此时直接点击快捷方式执行(代码加一下Sleep暂停操作)
	if followSymLinks {
		fileAbsPath, err = filepath.EvalSymlinks(fileAbsPath)
	}

	// 将路径分割，提取出目录和文件名
	filePath = filepath.Dir(fileAbsPath)
	fileName = filepath.Base(fileAbsPath)

	return filePath, fileName, nil
}

func main() {
	// 二进制所在目录
	filePath, fileName, err := GetBinaryFilePath(true)
	if err != nil {
		panic(err)
	}
	fmt.Printf(FORMAT, "二进制所在目录:", filePath)
	fmt.Printf(FORMAT, "二进制文件名称:", fileName)
}
```

**（1）基础测试**

```bash
# -------------------------------------------------------------------
# Linux

# 先编译一下
[root@ap-hongkang example]# go build main.go

# (1) 在项目根目录下运行 - go run
[root@ap-hongkang example]# go run main.go
二进制所在目录:             /tmp/go-build1293444666/b001/exe
二进制文件名称:             main

[root@ap-hongkang example]# ll /tmp/go-build1293444666/b001/exe  # 查看一下目录，报错不存在，因为运行完该目录就被删除了
ls: cannot access '/tmp/go-build1293444666/b001/exe': No such file or directory

[root@ap-hongkang example]# go run -work main.go # 添加-work参数，会将临时目录输出出来并且不会删除临时目录
WORK=/tmp/go-build4122350003
二进制所在目录:             /tmp/go-build4122350003/b001/exe
二进制文件名称:             main

[root@ap-hongkang example]# ll /tmp/go-build4122350003/b001/exe/  # 进到目录查看一下
total 1308
-rwxr-xr-x 1 root root 1339392 Dec 27 15:55 main

[root@ap-hongkang example]# /tmp/go-build4122350003/b001/exe/main 
二进制所在目录:             /tmp/go-build4122350003/b001/exe
二进制文件名称:             main

# (2) 在项目根目录下运行 - go build
[root@ap-hongkang example]# ./main 
二进制所在目录:             /root/example
二进制文件名称:             main

# (3) 切换到其他目录运行
[root@ap-hongkang example]# cd ..
[root@ap-hongkang ~]# go run example/main.go 
二进制所在目录:             /tmp/go-build601928247/b001/exe
二进制文件名称:             main

[root@ap-hongkang ~]# ./example/main
二进制所在目录:             /root/example
二进制文件名称:             main

# -------------------------------------------------------------------
# Windows

# 先编译一下
D:\application\GoLand\example>go build main.go

# (1) 在项目根目录下运行 - go run
D:\application\GoLand\example>go run main.go
二进制所在目录:             C:\Users\Administrator\AppData\Local\Temp\go-build4082603138\b001\exe
二进制文件名称:             main.exe

# (2) 在项目根目录下运行 - go build
D:\application\GoLand\example>.\main.exe 
二进制所在目录:             D:\application\GoLand\example
二进制文件名称:             main.exe

# (3) 切换到其他目录运行
D:\application\GoLand\example>cd ..

D:\application\GoLand>go run example/main.go
二进制所在目录:             C:\Users\Administrator\AppData\Local\Temp\go-build1999072041\b001\exe
二进制文件名称:             main.exe

D:\application\GoLand>example\main.exe
二进制所在目录:             D:\application\GoLand\example
二进制文件名称:             main.exe
```

**（2）Linux软硬链接下的表现情况**

```bash
# 制作软链接和硬链接
[root@ap-hongkang ~]# ln -s /root/example/main /usr/bin/main-soft
[root@ap-hongkang ~]# ln /root/example/main /usr/bin/main-hard

# 不追随软链接情况下
[root@ap-hongkang ~]# main-soft
二进制所在目录:             /usr/bin
二进制文件名称:             main-soft

# 追随软链接情况下
[root@ap-hongkang ~]# main-soft
二进制所在目录:             /root/example
二进制文件名称:             main

# 硬链接
[root@ap-hongkang ~]# main-hard
二进制所在目录:             /usr/bin
二进制文件名称:             main-hard
```

**（3）Windows快捷方式下的表现**

* Windows下的快捷方式相当于软连接，硬链接不测试了
* 设置`followSymLinks = false`
* `main`函数加一下暂停，方便观看输出 `time.Sleep(time.Minute)`

创建软链接

```bash
# 可以直接右键创建快捷方式，也可以使用如下命令创建
C:\Users\Administrator>mklink C:\Users\Administrator\Desktop\main.exe D:\application\GoLand\example\main.exe
为 C:\Users\Administrator\Desktop\main.exe <<===>> D:\application\GoLand\example\main.exe 创建的符号链接
```

输出结果

![image-20221227162928620](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20221227162928620.png)

结论：Windows下总是追随快捷方式（软连接）

:::

<br />

## 函数示例

::: details （1）filepath.Abs：获取文件或目录的绝对路径，filepath.IsAbs：返回路径是否是绝对路径

```go
package main

import (
	"fmt"
	"path/filepath"
)

func main() {
	// filepath.Abs：获取文件或目录的绝对路径
	// 1.文件或目录在不在它并不会校验
	// 2.如果传入一个绝对路径,它直接返回
	// 3.如果传入一个相对路径，它会使用 运行时目录 + 相对路径 组合出一个绝对路径再返回
    // 4.特殊值: 空字符串会转为 .
	fmt.Println(filepath.Abs("/abc"))
	fmt.Println(filepath.Abs("abc"))
	fmt.Println(filepath.Abs("C:/abc"))
	fmt.Println(filepath.Abs("."))
	fmt.Println(filepath.Abs(""))
}
```

输出结果

```bash
# Windows下输出结果
D:\application\GoLand\example>go run main.go
D:\abc <nil> # 测试绝对路径，Windows下没有/,或者说Windows下有多个/，每个驱动器(C盘/D盘等)都是一个根, /abc => D:\abc
D:\application\GoLand\example\abc <nil>  # 测试相对路径，程序运行时用户所在目录 + 相对目录
C:\abc <nil>                             # Windows下的绝对目录，原样输出
D:\application\GoLand\example <nil>      # 特殊目录测试
D:\application\GoLand\example <nil>      # 特殊目录测试

# Windows下切换一个驱动器，可以看到前两个输出都变成C盘路径了
C:\Users\Administrator>go run D:\application\GoLand\example\main.go
C:\abc <nil>
C:\Users\Administrator\abc <nil>
C:\abc <nil>
C:\Users\Administrator <nil>
C:\Users\Administrator <nil>

# Linux下输出结果
[root@ap-hongkang example]# go run main.go
/abc <nil>
/root/example/abc <nil>
/root/example/C:/abc <nil>    # Linux下不认Windows的驱动,所以路径变成这样了
/root/example <nil>
/root/example <nil>

# 注意事项
# filepath.Abs：如果传入的相对路径，会使用 程序运行时用户所在目录 + 相对目录
```

:::

::: details （2）filepath.Base：路径最后一个元素，filepath.Dir：除路径最后最后一个元素外的所有元素

```go
package main

import (
	"fmt"
	"path/filepath"
)

func main() {
	// filepath.Base：获取路径的最后一个元素
	fmt.Println(filepath.Base("/var/lib"))
	fmt.Println(filepath.Base("/var/lib/"))
	fmt.Println(filepath.Base("/var/lib//"))
	fmt.Println(filepath.Base(""))
	fmt.Println(filepath.Base("."))
	fmt.Println(filepath.Base(".."))

	fmt.Printf("\n------------------------------\n\n")

	// filepath.Dir：提取路径除最后一个元素外的路径
	fmt.Println(filepath.Dir("/var/lib"))
	fmt.Println(filepath.Dir("/var/lib/"))
	fmt.Println(filepath.Dir(""))
	fmt.Println(filepath.Dir("."))
	fmt.Println(filepath.Dir(".."))
}
```

输出结果

```bash
# Windows下执行输出结果
D:\application\GoLand\example>go run main.go
lib
lib                           
lib                           
.                             
.                             
..                            
                              
------------------------------

\var                          
\var\lib  # 这里需要注意
.                             
.                             
.                             


# Linux下执行输出结果
[root@ap-hongkang example]# go run main.go
lib
lib
lib
.
.
..

------------------------------

/var
/var/lib  # 这里需要注意
.
.
.
```

:::

::: details （3）filepath.Split：路径分割

```go
package main

import (
	"fmt"
	"path/filepath"
)

func main() {
	// filepath.Split：路径分割

	var dir, file string

	dir, file = filepath.Split("/var/lib")
	fmt.Printf("Dir: %s\t File: %s\n", dir, file)

	dir, file = filepath.Split("/var/lib/")
	fmt.Printf("Dir: %s\t File: %s\n", dir, file)

	dir, file = filepath.Split(filepath.Clean("/var/lib/"))
	fmt.Printf("Dir: %s\t File: %s\n", dir, file)
}
```

输出结果

```bash
# Windows下执行输出结果
D:\application\GoLand\example>go run main.go
Dir: /var/       File: lib
Dir: /var/lib/   File:
Dir: \var\       File: lib

# Linux下执行输出结果
[root@ap-hongkang example]# go run main.go
Dir: /var/       File: lib
Dir: /var/lib/   File: 
Dir: /var/       File: lib
```

:::

::: details （4）filepath.SplitList：用于分割环境变量或GOPATH变量,根据os.PathListSeparator分割

```go
package main

import (
	"fmt"
	"path/filepath"
)

func main() {
	// filepath.SplitList：用于分割环境变量或GOPATH变量,根据os.PathListSeparator分割
	//   Windows: ;
	//   Linux:   :
	fmt.Printf("%#v\n", filepath.SplitList("C:/abc;D:/def;F:/xyz"))
	fmt.Printf("%#v\n", filepath.SplitList("/bin:/usr/sbin:/usr/local/bin"))
}
```

输出结果

```bash
# Windows下执行输出结果
D:\application\GoLand\example>go run main.go
[]string{"C:/abc", "D:/def", "F:/xyz"}
[]string{"/bin:/usr/sbin:/usr/local/bin"}

# Linux下执行输出结果
[root@ap-hongkang example]# go run main.go 
[]string{"C", "/abc;D", "/def;F", "/xyz"}
[]string{"/bin", "/usr/sbin", "/usr/local/bin"}
```

:::

::: details （5）filepath.Join：路径组合

```go
package main

import (
	"fmt"
	"path/filepath"
)

func main() {
	// filepath.Join: 路径组合
	fmt.Println(filepath.Join("a", "b", "c"))
	fmt.Println(filepath.Join("a", "b/c"))
	fmt.Println(filepath.Join("a/b", "c"))
	fmt.Println(filepath.Join("a/b", "/c"))
	fmt.Println(filepath.Join("a/b", "../../../xyz"))
}
```

输出结果

```bash
# Windows下执行输出结果
D:\application\GoLand\example>go run main.go
a\b\c
a\b\c
a\b\c
a\b\c
..\xyz

# Linux下执行输出结果
[root@ap-hongkang example]# go run main.go 
a/b/c
a/b/c
a/b/c
a/b/c
../xyz
```

:::

::: details （6）filepath.Clean：返回与路径等效的最短路径名；路径分隔符自动替换为系统路径分隔符

```go
package main

import (
	"fmt"
	"path/filepath"
)

func main() {
	// filepath.Clean：返回与路径等效的最短路径名
	fmt.Println(filepath.Clean("."))
	fmt.Println(filepath.Clean("~"))
	fmt.Println(filepath.Clean("/var/lib/.."))
	fmt.Println(filepath.Clean("/var/lib/.."))
	fmt.Println(filepath.Clean("/var/lib"))
	fmt.Println(filepath.Clean("/var/lib/."))
	fmt.Println(filepath.Clean("/var/lib/./"))
	fmt.Println(filepath.Clean("/var/lib/././"))
}
```

输出结果

```bash
# Windows下执行输出结果
D:\application\GoLand\example>go run main.go
.
~       
\var    
\var    
\var\lib
\var\lib
\var\lib
\var\lib

# Linux下执行输出结果
[root@ap-hongkang example]# go run main.go
.
~
/var
/var
/var/lib
/var/lib
/var/lib
/var/lib
```

:::

::: details （7）filepath.ToSlash：替换分隔符为/，这对于处理Windows路径非常友好

```go
package main

import (
	"fmt"
	"go.uber.org/zap"
	"path/filepath"
)

func main() {
	path := "C:\\Users\\Administrator\\Desktop"
	slash := filepath.ToSlash(path)

	fmt.Println(path)
	fmt.Println(slash)

	logger, _ := zap.NewProduction()
	logger.Info("info", zap.String("filename", path))
	logger.Info("info", zap.String("filename", slash))
}

```

输出结果

```bash
D:\application\GoLand\example>go run main.go                   
C:\Users\Administrator\Desktop
C:/Users/Administrator/Desktop
{"level":"info","ts":1675667896.014864,"caller":"cli-tpl/main.go:18","msg":"info","filename":"C:\\Users\\Administrator\\Desktop"}
{"level":"info","ts":1675667896.014864,"caller":"cli-tpl/main.go:19","msg":"info","filename":"C:/Users/Administrator/Desktop"}
```

:::

::: details （8）filepath.Ext：获取文件扩展名

```go
package main

import (
	"fmt"
	"path/filepath"
)

func main() {
	fmt.Printf("%#v\n", filepath.Ext("C:/Users/Administrator/Desktop/1.txt"))
	fmt.Printf("%#v\n", filepath.Ext("C:/Users/Administrator/Desktop/2"))
	fmt.Printf("%#v\n", filepath.Ext("C:/Users/Administrator/Desktop/3."))
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
".txt"
""
"."
```

:::

<br />

## 模式匹配

匹配语法

```bash
pattern:
	{ term }
term:
	'*'         matches any sequence of non-Separator characters
	'?'         matches any single non-Separator character
	'[' [ '^' ] { character-range } ']'
	            character class (must be non-empty)
	c           matches character c (c != '*', '?', '\\', '[')
	'\\' c      matches character c

character-range:
	c           matches character c (c != '\\', '-', ']')
	'\\' c      matches character c
	lo '-' hi   matches character c for lo <= c <= hi
```

::: details （1）filepath.Glob：返回匹配的结果

```go
package main

import (
	"fmt"
	"path/filepath"
)

func main() {
	// filepath.Glob: 模式匹配
	fmt.Println(filepath.Glob("C:/*"))
	fmt.Println(filepath.Glob("/*/*/bin"))
}
```

输出结果

```bash
# Windows下执行输出结果
D:\application\GoLand\example>go run main.go
D:\application\GoLand\example>go run main.go
[C:\$360Section C:\$Recycle.Bin C:\$WinREAgent C:\360SANDBOX C:\CIMTEMP C:\Documents and Settings C:\DumpStack.log C:\DumpStack.log.tmp C:\PerfLogs C:\Plugin C:\Program Files C:\Program Files (x86) C:\ProgramData C:\Recovery C:\Syst
em Volume Information C:\Users C:\WCH.CN C:\Windows C:\bootTel.dat C:\hiberfil.sys C:\pagefile.sys C:\swapfile.sys C:\sys] <nil>
[\application\GoPath\bin \software\Cygwin\bin \software\EDU\bin \software\Git\bin \software\GoLand 2022.2.3\bin \software\IntelliJ IDEA 2022.2\bin \software\Microsoft VS Code\bin \software\PyCharm Community Edition 2021.3.1\bin \sof
tware\VMwareWorkstationPro\bin \software\WebStorm 2022.2.2\bin \software\jdk-8u341\bin \software\protoc-21.9-win64\bin] <nil>

# Linux下执行输出结果
[root@ap-hongkang example]# go run main.go 
[] <nil>
[/lib/debug/bin /opt/cni/bin /opt/containerd/bin /usr/local/bin] <nil>
```

:::

::: details （2）filepath.Match：判断字符串是否满足模式

```go
package main

import (
	"fmt"
	"path/filepath"
)

func main() {
	// filepath.Match: 判断字符串是否满足模式
	fmt.Println(filepath.Match("C:/*", "C:/Program Files"))
	fmt.Println(filepath.Match("*/bin", "/usr/local/bin"))
	fmt.Println(filepath.Match("C:\\*", "C:\\Program Files\\abc"))
}
```

输出结果

```bash
# Windows下执行输出结果
D:\application\GoLand\example>go run main.go
true <nil>
true <nil>
false <nil>

# Linux下执行输出结果
[root@ap-hongkang example]# go run main.go 
true <nil>
false <nil>
false <nil>

# 分析
# 1.Windows路径分隔符是\\，Linux路径分隔符是/
# 2./在Windos看来就是普通的字符串，\\在Linux看来也是普通字符串
```

:::

<br />

## 目录遍历

::: details （1）filepath.Walk遍历：不跟随符号链接

```go
package main

import (
	"fmt"
	"io/fs"
	"path/filepath"
	"sync"
	"time"
)

// Walk 用于存储filepath.Walk遍历的结果
type Walk struct {
	directories []string
	files       []string
	problems    []string // 有问题的目录，可能是没有权限等，可以使用os.IsPermission()判断有无权限
}

func main() {
	// 存储遍历结果
	walk := &Walk{}
	stopCh := make(chan struct{})
	wg := new(sync.WaitGroup)

	// 统计信息
	wg.Add(1)
	go func(chan struct{}) {
		// 统计函数
		DisplayResult := func() {
			fmt.Printf("\r目录个数: %-10d 文件个数: %-10d 问题个数: %d",
				len(walk.directories),
				len(walk.files),
				len(walk.problems),
			)
		}

		defer wg.Done()

		// 运行时间
		fmt.Printf("%s Start\n", time.Now().Format("2006-01-02 15:04:05"))
		defer func() {
			fmt.Printf("\n%s Complete\n", time.Now().Format("2006-01-02 15:04:05"))
		}()

		// 最后再输出一次执行结果
		defer DisplayResult()

		// 定时器,每隔1秒输出信息
		ticker := time.NewTicker(time.Second)
		defer ticker.Stop()

		for {
			select {
			case <-stopCh:
				return
			case <-ticker.C:
				DisplayResult()
			default:
			}
		}
	}(stopCh)

	// 遍历目录
	err := filepath.Walk("D://", func(path string, info fs.FileInfo, err error) error {
		if err != nil {
			walk.problems = append(walk.problems, path)
			return nil
		}
		if info.IsDir() {
			walk.directories = append(walk.directories, path)
		} else {
			walk.files = append(walk.files, path)
		}
		return nil
	})
	if err != nil {
		panic(err)
	}

	close(stopCh)
	wg.Wait()
}
```

输出结果

```bash
# 用时27秒
D:\application\GoLand\example>go run main.go
2022-12-30 14:25:53 Start
目录个数: 72054      文件个数: 367434     问题个数: 1
2022-12-30 14:26:20 Complete
```

资源消耗：CPU使用比较稳定，内存使用一直在增长

![image-20221230140638321](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20221230140638321.png)

:::

::: details （2）filepath.WalkDir遍历：不跟随符号链接，比Walk效率高

```go
package main

import (
	"fmt"
	"io/fs"
	"path/filepath"
	"sync"
	"time"
)

// Walk 用于存储filepath.Walk遍历的结果
type Walk struct {
	directories []string
	files       []string
	problems    []string // 有问题的目录，可能是没有权限等，可以使用os.IsPermission()判断有无权限
}

func main() {
	// 存储遍历结果
	walk := &Walk{}
	stopCh := make(chan struct{})
	wg := new(sync.WaitGroup)

	// 统计信息
	wg.Add(1)
	go func(chan struct{}) {
		// 统计函数
		DisplayResult := func() {
			fmt.Printf("\r目录个数: %-10d 文件个数: %-10d 问题个数: %d",
				len(walk.directories),
				len(walk.files),
				len(walk.problems),
			)
		}

		defer wg.Done()

		// 运行时间
		fmt.Printf("%s Start\n", time.Now().Format("2006-01-02 15:04:05"))
		defer func() {
			fmt.Printf("\n%s Complete\n", time.Now().Format("2006-01-02 15:04:05"))
		}()

		// 最后再输出一次执行结果
		defer DisplayResult()

		// 定时器,每隔1秒输出信息
		ticker := time.NewTicker(time.Second)
		defer ticker.Stop()

		for {
			select {
			case <-stopCh:
				return
			case <-ticker.C:
				DisplayResult()
			default:
			}
		}
	}(stopCh)

	// 遍历目录
	err := filepath.WalkDir("D://", func(path string, d fs.DirEntry, err error) error {
		if err != nil {
			walk.problems = append(walk.problems, path)
			return nil
		}
		if d.IsDir() {
			walk.directories = append(walk.directories, path)
		} else {
			walk.files = append(walk.files, path)
		}
		return nil
	})
	if err != nil {
		panic(err)
	}

	close(stopCh)
	wg.Wait()
}
```

输出结果

```bash
# 用时10秒
# 这里为什么比Walk函数多一个目录呢？暂时还搞不清楚
D:\application\GoLand\example>go run main.go
2022-12-30 14:27:13 Start
目录个数: 72055      文件个数: 367434     问题个数: 1
2022-12-30 14:27:23 Complete
```

资源消耗：CPU使用比较稳定，内存使用一直在增长，和Walk函数表现一致

![image-20221230141049000](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20221230141049000.png)

:::