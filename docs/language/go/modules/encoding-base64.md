# 二进制到文本的编码算法介绍

Base64、Base32、Base16都是常见的**二进制到文本的编码算法**，常用于在文本环境（如 JSON、URL、配置文件）中安全地传输或存储二进制数据（例如密钥、公钥、图片、证书、签名等）。

**编码**不是**加密**，他们只是改变了数据的显示形式，是可逆的，并没有任何加密



**Base64**

* 把每 3 字节（24 位）编码为 4 个字符（4×6=24 位），每个字符占据6个二进制位
* 最常见的二进制→文本（电子邮件 MIME，HTTP 表单、JSON 内嵌二进制、证书/密钥的文本编码等）。
* 优点：最节省空间；Go 和各语言支持最广
* 标准版取值范围：`A–Z` `a–z` `0–9` `+` `/` （共64种）
* URL安全版取值范围：`A–Z` `a–z` `0–9` `-` `_` （共64种）

**Base32**

* 把每 5 字节（40 位）编码为 8 个字符（5×8=40 位），每个字符占据5个二进制位
* 用于 TOTP、某些 DNS 编码或文件名中更安全（当不区分大小写时）
* 优点：适合**人工读写/抄写/媒体有限字符集**的场景（比如密钥口令、二维码、需要避免 `+` `/` 字符引起问题的场景）
* 标准版取值范围：`A–Z` `2–7`（共32种）
* Base32hex 变体取值范围：`0–9` `A–V` （共32种）

**Base16**

* 每个字节变为 2 个十六进位字符，每个字符占据4个二进制位
* 便于调试、日志、显示原始字节（例如哈希值 `sha256` 经常用 hex 表示）
* 优点：实现简单、可读，但空间开销最大。
* 取值范围：`0–9` `A–F` （共16种）

<br />

**关于算法中的编码**

* 几乎所有摘要算法默认使用16进制输出（HEX编码方式），例如 `5d41402abc4b2a76b9719d911017c592`
* RSA / ECDSA 公私钥、JWT (JSON Web Token)、PGP / GPG 公钥、Ed25519 / Curve25519 通常使用用base64编码
* TOTP / HOTP 秘钥、URL / QR 参数传递，推荐使用Base32

<br />

## encoding/base64

文档：[https://pkg.go.dev/encoding/base64](https://pkg.go.dev/encoding/base64)

<br />

### 标准编码和URL编码

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

### 编码后忽略填充字符

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

<br />

## encoding/base32

文档：[https://pkg.go.dev/encoding/base32](https://pkg.go.dev/encoding/base32)

### 标准版和HEX变体版

::: details 点击查看详情

```go
package main

import (
	"encoding/base32"
	"fmt"
)

func main() {
	data := []byte("Hello World")

	// 编码
	std := base32.StdEncoding.EncodeToString(data)
	hex := base32.HexEncoding.EncodeToString(data)

	fmt.Println("Base32 (Std):", std)
	fmt.Println("Base32 (Hex):", hex)

	// 解码
	stdDecoded, _ := base32.StdEncoding.DecodeString(std)
	hexDecoded, _ := base32.HexEncoding.DecodeString(hex)

	fmt.Println("Std Decoded:", string(stdDecoded))
	fmt.Println("Hex Decoded:", string(hexDecoded))
}
```

输出结果

```bash
Base32 (Std): JBSWY3DPEBLW64TMMQ======
Base32 (Hex): 91IMOR3F41BMUSJCCG======
Std Decoded: Hello World
Hex Decoded: Hello World
```

:::

<br />

## encoding/hex

文档：[https://pkg.go.dev/encoding/hex](https://pkg.go.dev/encoding/hex)

::: details 点击查看详情

```go
package main

import (
	"encoding/hex"
	"fmt"
)

func main() {
	data := []byte("Hello")

	// 编码为十六进制
	encoded := hex.EncodeToString(data)
	fmt.Println("Hex Encoded:", encoded) // 48656c6c6f

	// 解码回原始数据
	decoded, err := hex.DecodeString(encoded)
	if err != nil {
		panic(err)
	}
	fmt.Println("Decoded:", string(decoded)) // Hello
}
```

输出结果

```bash
Hex Encoded: 48656c6c6f
Decoded: Hello
```

:::