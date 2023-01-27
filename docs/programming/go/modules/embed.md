# embed

文档：[https://pkg.go.dev/embed](https://pkg.go.dev/embed)

<br />

## 打包单个文件

::: details （1）嵌入文件内容为Go字符串

`main.go`

```go
package main

import (
	_ "embed"
	"fmt"
)

//go:embed version.txt
var version string

func main() {
	fmt.Println(version)
}
```

注意事项

* `_ "embed"`必不可少
* `//`和`go:embed`之间不能有空格
* `embed`相关的定义不能写在函数里面

新建`version.txt`

```
Version:           20.10.21
```

输出结果

```bash
# go run 执行
D:\application\GoLand\example>go run main.go
Version:           20.10.21                

# go build 执行
D:\application\GoLand\example>go build main.go
D:\application\GoLand\example>main.exe
Version:           20.10.21

# 当我要打包一个不存在的文件时,编译时会报错
D:\application\GoLand\example>go build main.go
main.go:8:12: pattern version1.txt: no matching files found
```

:::

::: details （2）嵌入文件内容为Go字节切片

* 只需要对上面的示例代码做一个特别简单的修改即可
* 输出结果保持一致不再演示

```go
package main

import (
	_ "embed"
	"fmt"
)

//go:embed version.txt
var version []byte

func main() {
	fmt.Println(string(version))
}
```

:::

<br />

## 打包多个文件

::: details （1）打包多个文件

```go
package main

import (
	"embed"
	_ "embed"
	"fmt"
)

//go:embed version.txt
//go:embed version_info.txt
var fs embed.FS

func main() {
	version, err := fs.ReadFile("version.txt")
	if err != nil {
		panic(err)
	}
	versionInfo, err := fs.ReadFile("version_info.txt")
	if err != nil {
		panic(err)
	}
	fmt.Println(string(version))
	fmt.Println(string(versionInfo))
}
```

注意

```go
//go:embed version.txt
//go:embed version_info.txt

// 也可以写作

//go:embed version.txt version_info.txt
```

新建一个`version_info.txt`文件

```
API version:       1.41
Go version:        go1.18.7
Git commit:        baeda1f
Built:             Tue Oct 25 18:02:19 2022
OS/Arch:           linux/amd64
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
Version:           20.10.21
API version:       1.41    
Go version:        go1.18.7
Git commit:        baeda1f
Built:             Tue Oct 25 18:02:19 2022
OS/Arch:           linux/amd64
```

:::

::: details （2）打包一个目录

```go
package main

import (
	"embed"
	_ "embed"
	"fmt"
)

//go:embed static
var fs embed.FS

func main() {
	version, err := fs.ReadFile("static/version.txt")
	if err != nil {
		panic(err)
	}
	versionInfo, err := fs.ReadFile("static/version_info.txt")
	if err != nil {
		panic(err)
	}
	fmt.Println(string(version))
	fmt.Println(string(versionInfo))
}
```

注意事项：

* `.`和`_`开头的文件或目录不会被打包

新建一个目录`static`，将`version.txt`和`version_info.txt`移动到`static`中

输出结果

```bash
D:\application\GoLand\example>go run main.go
Version:           20.10.21
API version:       1.41                    
Go version:        go1.18.7                
Git commit:        baeda1f                 
Built:             Tue Oct 25 18:02:19 2022
OS/Arch:           linux/amd64
```

:::

::: details （3）通配符 *

```go
package main

import (
	"embed"
	_ "embed"
	"fmt"
)

//go:embed static/*.html
var fs embed.FS

func main() {

	a, err := fs.ReadFile("static/a.html")
	if err != nil {
		panic(err)
	}
	b, err := fs.ReadFile("static/b.html")
	if err != nil {
		panic(err)
	}
	//c, err := fs.ReadFile("static/c.txt")
	//if err != nil {
	//	panic(err)
	//}
	
	fmt.Println(string(a))
	fmt.Println(string(b))
	//fmt.Println(string(c))
}
```

在`static`目录下新建`a.html`、`b.html`、`c.txt`，文件内容随意

输出结果

```bash
D:\application\GoLand\example>go run main.go
a
b
```

:::