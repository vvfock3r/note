# encoding/base64

文档：[https://pkg.go.dev/encoding/base64](https://pkg.go.dev/encoding/base64)

<br />

## 标准编码和URL编码

::: details （1）标准base64编码和解码：StdEncoding

```go
package main

import (
	"encoding/base64"
	"fmt"
)

func main() {
	msg := "abc123!?$*&()'-=@~"

	// 编码：返回string
	encoded := base64.StdEncoding.EncodeToString([]byte(msg))

	// 解码: 返回[]byte
	decoded, err := base64.StdEncoding.DecodeString(encoded)
	if err != nil {
		panic(err)
	}

	// print
	fmt.Printf("原文信息: %s\n", msg)
	fmt.Printf("标准编码: %s\n", encoded)
	fmt.Printf("标准解码: %s\n", string(decoded))
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
原文信息: abc123!?$*&()'-=@~
标准编码: YWJjMTIzIT8kKiYoKSctPUB+
标准解码: abc123!?$*&()'-=@~
```

:::

::: details （2）URL base64编码和解码：URLEncoding，通常用于URL和文件名

```go
package main

import (
	"encoding/base64"
	"fmt"
)

func main() {
	msg := "abc123!?$*&()'-=@~"

	// 编码：返回string
	encoded := base64.URLEncoding.EncodeToString([]byte(msg))

	// 解码: 返回[]byte
	decoded, err := base64.URLEncoding.DecodeString(encoded)
	if err != nil {
		panic(err)
	}

	// print
	fmt.Printf("原文信息: %s\n", msg)
	fmt.Printf("URL编码: %s\n", encoded)
	fmt.Printf("URL解码: %s\n", string(decoded))
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
原文信息: abc123!?$*&()'-=@~
URL编码: YWJjMTIzIT8kKiYoKSctPUB-
URL解码: abc123!?$*&()'-=@~
```

:::

::: details （3）两种编码有何不同?

```go
var StdEncoding = NewEncoding(encodeStd)
var URLEncoding = NewEncoding(encodeURL)

// 区别在于编码后支持的字符不同
const encodeStd = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"  // 标准编码
const encodeURL = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"  // URL编码
```

:::

<br />

## 编码后忽略填充字符

::: details 忽略填充字符：RawStdEncoding和RawURLEncoding

```go
package main

import (
	"encoding/base64"
	"fmt"
)

func main() {
	msg := "hello, world!"
	fmt.Printf("原文信息: %s\n", msg)

	{
		// 编码：返回string
		encoded := base64.StdEncoding.EncodeToString([]byte(msg))

		// 解码: 返回[]byte
		decoded, err := base64.StdEncoding.DecodeString(encoded)
		if err != nil {
			panic(err)
		}

		// print
		fmt.Printf("标准编码，未忽略填充字符: %s\n", encoded)
		fmt.Printf("标准解码，未忽略填充字符: %s\n", string(decoded))
	}
	{
		// 编码：返回string
		encoded := base64.RawStdEncoding.EncodeToString([]byte(msg))

		// 解码: 返回[]byte
		decoded, err := base64.RawStdEncoding.DecodeString(encoded)
		if err != nil {
			panic(err)
		}

		// print
		fmt.Printf("标准编码，已忽略填充字符: %s\n", encoded)
		fmt.Printf("标准解码，已忽略填充字符: %s\n", string(decoded))
	}
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
原文信息: hello, world!
标准编码，未忽略填充字符: aGVsbG8sIHdvcmxkIQ==
标准解码，未忽略填充字符: hello, world!
标准编码，已忽略填充字符: aGVsbG8sIHdvcmxkIQ
标准解码，已忽略填充字符: hello, world!
```

查看源码，两种编码的填充字符都是=

```go
var RawStdEncoding = StdEncoding.WithPadding(NoPadding)
var RawURLEncoding = URLEncoding.WithPadding(NoPadding)

	StdPadding          rune = '=' // Standard padding character
	NoPadding           rune = -1  // No padding
```

:::