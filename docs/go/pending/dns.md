# dns

Github：[https://github.com/miekg/dns](https://github.com/miekg/dns)

文档：[https://pkg.go.dev/github.com/miekg/dns](https://pkg.go.dev/github.com/miekg/dns)

<br />

## 安装

```bash
go get github.com/miekg/dns
```

<br />

## 用法

::: details 点击查看详情

```go
package main

import (
	"context"
	"fmt"
	"net"
	"time"

	"github.com/miekg/dns"
)

const (
	DefaultServer  = ""
	DefaultTimeout = time.Second * 3
)

// QueryDNSTypeA
func QueryDNSTypeA(domain, dnsServer string, timeout time.Duration) ([]string, time.Duration, error) {
	// 1、如果要使用默认的DNS Server, dns模块好像没有提供类似的方法,
	//    所以当使用默认DNS Server时使用net模块来做
	// 2、但是使用net模块指定一个不存在DNS Server仍然可以正常解析,
	//   所以当指定DNS Server时使用dns模块来做
	// 3、不支持设置永不超时, 请指定一个较大的超时时间

	// 使用默认的DNS Server解析
	if dnsServer == "" {
		// 设置超时时间
		ctx, cancel := context.WithTimeout(context.Background(), timeout)
		defer cancel()

		// 发起A记录查询
		now := time.Now()
		ipStringList, err := net.DefaultResolver.LookupHost(ctx, domain)
		rtt := time.Since(now)

		return ipStringList, rtt, err
	}

	// 使用自定义DNS Server解析
	c := dns.Client{Timeout: timeout}
	m := dns.Msg{}
	m.SetQuestion(dns.Fqdn(domain), dns.TypeA)

	// 发起查询
	res, rtt, err := c.Exchange(&m, dnsServer)
	if err != nil {
		return nil, rtt, err
	}
	if len(res.Answer) == 0 {
		return nil, rtt, fmt.Errorf("lookup %s: no such host", domain)
	}

	// 提取IP列表
	var ipStringList []string
	for _, answer := range res.Answer {
		if a, ok := answer.(*dns.A); ok {
			ipStringList = append(ipStringList, a.A.String())
		}
	}

	return ipStringList, rtt, err
}

func main() {
	// 解析A记录
	ipStringList, duration, err := QueryDNSTypeA("ip.jinhui.dev", DefaultServer, DefaultTimeout)

	fmt.Println(duration)

	if err != nil {
		fmt.Println(err)
		return
	}

	// 输出解析得到的IP地址列表
	for _, ip := range ipStringList {
		fmt.Println(ip)
	}

}
```

:::
