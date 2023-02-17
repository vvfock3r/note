# net/url

文档：[https://pkg.go.dev/net/url](https://pkg.go.dev/net/url)

<br />

## 解析URL

::: details （1）解析URL

```go
package main

import (
	"fmt"
	"net/url"
)

func main() {
	// 定义URL
	urlString := "https://root:123456@example.com/search?q=go&size=10&page=1#title"

	// 解析URL
	u, err := url.Parse(urlString)
	if err != nil {
		panic(err)
	}
	fmt.Printf("%#v\n", u)
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
&url.URL{Scheme:"https", Opaque:"", User:(*url.Userinfo)(0xc0000221b0), Host:"example.com", Path:"/search", RawPath:"", OmitHost:false, ForceQuery:false, RawQuery:"q=go&size=10&page=1", Fragment:"title", RawFragment:""}
```

URL结构体解析

```go
type URL struct {
	Scheme      string    // 协议,http/https/ftp/file等等
	Opaque      string    // encoded opaque data
	User        *Userinfo // 用户名和密码信息
	Host        string    // host 或 host:port
	Path        string    // 路径
	RawPath     string    // encoded path hint (see EscapedPath method)
	OmitHost    bool      // do not emit empty host (authority)
	ForceQuery  bool      // append a query ('?') even if RawQuery is empty
	RawQuery    string    // 查询字符串，?后面的部分,不带?
	Fragment    string    // 锚点，#后面的部分,不带#
	RawFragment string    // encoded fragment hint (see EscapedFragment method)
}
```

:::

::: details （2）解析查询字符串

```go
package main

import (
	"fmt"
	"net/url"
)

func main() {
	// 定义URL
	urlString := "file://root:123456@example.com/search/?q=go&size=10&page=1#title"

	// 解析URL
	u, err := url.Parse(urlString)
	if err != nil {
		panic(err)
	}
	fmt.Printf("%#v\n", u.RawQuery)

	// 解析查询字符串
	values, err := url.ParseQuery(u.RawQuery)
	if err != nil {
		panic(err)
	}
	fmt.Printf("%#v\n", values)
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
"q=go&size=10&page=1"
url.Values{"page":[]string{"1"}, "q":[]string{"go"}, "size":[]string{"10"}}
```

:::

<br />

## URL编码

::: details （1）查询字符串编码和解码

```go
package main

import (
	"fmt"
	"net/url"
)

func main() {
	// 定义URL
	urlString := "http://example.com/search?q=自由"

	// 解析URL
	u, err := url.Parse(urlString)
	if err != nil {
		panic(err)
	}
	fmt.Printf("%#v\n", u)

	// 编码查询字符串
	escape := url.QueryEscape(u.RawQuery)
	fmt.Println(escape)

	// 解码查询字符串
	fmt.Println(url.QueryUnescape(escape))
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
&url.URL{Scheme:"http", Opaque:"", User:(*url.Userinfo)(nil), Host:"example.com", Path:"/search", RawPath:"", OmitHost:false, ForceQuery:false, RawQuery:"q=自由", Fragment:"", RawFragment:""}
q%3D%E8%87%AA%E7%94%B1
q=自由 <nil>
```

:::
