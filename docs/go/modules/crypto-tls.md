# crypto/tls



## 查看证书信息

::: details 点击查看详情

```go
package main

import (
	"crypto/tls"
	"fmt"
	"time"
)

func main() {
	// 建立连接
	conn, err := tls.Dial("tcp", "jinhui.dev:443", nil)
	if err != nil {
		panic(err)
	}

	// 从连接状态中获取证书信息
	// PeerCertificates 是一个切片，存储了对等端发送的所有证书链，这里我们选择了第一个证书（通常为服务器的主要证书）
	cert := conn.ConnectionState().PeerCertificates[0]

	// 查看证书信息
	cst := time.FixedZone("CST", 8*3600)
	format := "2006-01-02 15:04:05 MST"
	fmt.Printf("证书生效时间: %s\n", cert.NotBefore.In(cst).Format(format))
	fmt.Printf("证书失效时间: %s\n", cert.NotAfter.In(cst).Format(format))
}
```

输出结果

```bash
证书生效时间: 2023-05-01 08:00:00 CST
证书失效时间: 2024-05-31 07:59:59 CST
```

:::