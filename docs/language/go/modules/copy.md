# copy

Github：[https://github.com/otiai10/copy](https://github.com/otiai10/copy)

## 安装

```bash
go get -u github.com/otiai10/copy
```

<br />

## 拷贝文件或目录

::: details （1）文件 => 文件/目录

```go
package main

import (
	"fmt"

	"github.com/otiai10/copy"
)

func main() {
	// 如果源是单个文件：
	// 	  源文件不存在时会报错 GetFileAttributesEx main.exe: The system cannot find the file specified.
	//	  目标文件不存在时直接拷贝, 存在时会覆盖, 比如 copy.Copy("main.exe", "1.exe")
	//	  目标文件的目录不存在时会自动创建, 目录存在时会报错：open xxx/: is a directory, 这一点要特别注意
	err := copy.Copy("main.exe", "1/2.exe")
	if err != nil {
		fmt.Println(err)
	}
}

```

:::

::: details （2）目录 => 目录

```go
package main

import (
	"fmt"

	"github.com/otiai10/copy"
)

func main() {
	// 如果源是单个目录：
	// 	  源目录不存在时会报错 GetFileAttributesEx main.exe: The system cannot find the file specified.
	//    目标也是个目录, 不存在时拷贝正常，会拷贝源目录及其下所有的文件, 递归拷贝
	//    目标目录存在时, 会把源目录下所有的文件拷贝到目标目录，也就相当于对源目录做了一次改名
	//    目标目录的父目录不存在时会自动创建, 支持多级父目录
	err := copy.Copy("1", "2/3/4/5/6/")
	if err != nil {
		fmt.Println(err)
	}
}
```

:::

<br />

## 拷贝参数设置

::: details （1）选项：保留atime和ctime，保留uid和gid

```go
package main

import (
	"fmt"

	"github.com/otiai10/copy"
)

func main() {
    // 拷贝选项
	opt := copy.Options{
		// 保留 atime和mtime
		PreserveTimes: true,

		// 保留uid和gid
		PreserveOwner: true,
	}

    // 拷贝
	err := copy.Copy("main.exe", "2.exe", opt)
	if err != nil {
		fmt.Println(err)
	}
}
```

:::

::: details （2）选项：跳过某些文件或目录

```go
package main

import (
	"fmt"
	"os"
	"strings"

	"github.com/otiai10/copy"
)

func main() {
	// 拷贝选项
	opt := copy.Options{
		// 返回 true 表示跳过该文件/目录, error 有值的话会终止拷贝操作, copy.Copy 返回这个 err
		Skip: func(srcinfo os.FileInfo, src, dest string) (bool, error) {
			// 跳过所有 .git 目录
			if srcinfo.IsDir() && strings.HasSuffix(src, ".git") {
				return true, nil
			}
			return false, nil
		},
	}

	// 拷贝
	err := copy.Copy("1", "2", opt)
	if err != nil {
		fmt.Println(err)
	}
}
```

:::

::: details （3）选项：修改路径名

```go
package main

import (
	"fmt"
	"os"
	"path/filepath"
	"strconv"

	"github.com/otiai10/copy"
)

func main() {
	// 拷贝选项
	opt := copy.Options{
		RenameDestination: func(src, dest string) (string, error) {
			// 获取目标信息
			info, err := os.Stat(dest)

			// 如果不存则, 直接返回
			if os.IsNotExist(err) {
				return dest, nil
			}

			// 其他报错返回报错
			if err != nil {
				return dest, err
			}

			// 那么, 剩下的情况就是文件或者目录存在的情况下

			// 如果目标是文件, 则给备份加一个 _N, 避免覆盖
			if !info.IsDir() {
				n := 1
				for {
					dest = filepath.Join(filepath.Dir(dest), info.Name()+"_"+strconv.Itoa(n))
					_, err = os.Stat(dest)
					if os.IsNotExist(err) {
						break
					}
					if err != nil {
						return dest, err
					}
					n += 1
				}
			}

			return dest, nil
		},
	}

	// 拷贝
	err := copy.Copy("main.exe", "3.exe", opt)
	if err != nil {
		fmt.Println(err)
	}
}
```

:::