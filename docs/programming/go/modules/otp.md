# otp

Github：[https://github.com/pquerna/otp](https://github.com/pquerna/otp)

文档：[https://pkg.go.dev/github.com/pquerna/otp](https://pkg.go.dev/github.com/pquerna/otp)

说明：支持基于时间的一次性密码（TOTP）和基于HMAC的一次性密码（HOTP）

<br />

## 安装

```bash
D:\application\GoLand\example>go get github.com/pquerna/otp
go: added github.com/boombuler/barcode v1.0.1-0.20190219062509-6c824513bacc
go: added github.com/pquerna/otp v1.4.0
```

<br />

## 示例

::: details （1）totp：生成图片

```go
package main

import (
	"bufio"
	"bytes"
	"fmt"
	"image/png"
	"os"

	"github.com/pquerna/otp/totp"
)

func main() {
	// 生成key
	key, err := totp.Generate(totp.GenerateOpts{
		Issuer:      "Example.com",
		AccountName: "alice@example.com",
	})
	if err != nil {
		panic(err)
	}

	// 生成image.Image对象
	img, err := key.Image(200, 200)
	if err != nil {
		panic(err)
	}

	// 编码为png格式
	var buf bytes.Buffer
	err = png.Encode(&buf, img)
	if err != nil {
		panic(err)
	}

	// 生成png图片,扫码添加
	err = os.WriteFile("qr-code.png", buf.Bytes(), 0644)
	if err != nil {
		panic(err)
	}

	// 用户输入
	fmt.Print("Enter Passcode: ")
	reader := bufio.NewReader(os.Stdin)
	passcode, err := reader.ReadString('\n')
	if err != nil {
		panic(err)
	}

	// 验证
	valid := totp.Validate(passcode, key.Secret())
	if valid {
		println("Valid passcode!")
		os.Exit(0)
	} else {
		println("Invalid passcode!")
		os.Exit(1)
	}
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
Enter Passcode: 663551
Valid passcode!
```

:::

::: details （2）totp：使用base64编码PNG图片，并嵌入到HTML中

```go
package main

import (
	"bytes"
	"encoding/base64"
	"image/png"
	"os"
	"strings"

	"github.com/pquerna/otp/totp"
)

func main() {
	// html template
	var template = `
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        html, body {
            width: 100%;
            height: 100%;
        }

        body {
            display: flex;
            justify-content: center;
            align-items: center;
        }
    </style>
</head>
<body>
<div id="passcode">
    <img alt="passcode" src="data:image/png;base64,passcode-base64"/>
</div>
</body>
</html>
`

	// 生成key
	key, err := totp.Generate(totp.GenerateOpts{
		Issuer:      "Example.com",
		AccountName: "alice@example.com",
	})
	if err != nil {
		panic(err)
	}

	// 生成image.Image对象
	img, err := key.Image(200, 200)
	if err != nil {
		panic(err)
	}

	// 编码为png格式
	var buf bytes.Buffer
	err = png.Encode(&buf, img)
	if err != nil {
		panic(err)
	}

	// 编码为base64
	encoded := base64.StdEncoding.EncodeToString(buf.Bytes())

	// 将base64字符串嵌入到HTML模板中
	html := strings.ReplaceAll(template, "passcode-base64", encoded)
	err = os.WriteFile("index.html", []byte(html), 0644)
	if err != nil {
		panic(err)
	}
}
```

打开生成的`index.html`

![image-20230211143817626](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230211143817626.png)

:::

<br />

## 未完待续
