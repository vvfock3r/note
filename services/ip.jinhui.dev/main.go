package main

import (
	"fmt"
	"log"
	"net/http"
	"strings"
)

// 处理器
func ipHandler(w http.ResponseWriter, req *http.Request) {
	// 输出请求头
	log.Println("A request was received")
	for k, v := range req.Header {
		log.Printf("%-18s: %#v\n", k, v)
	}
	fmt.Println()

	// 获取真实IP
	var realIp string
	if ip := req.Header.Get("X-Real-IP"); ip != "" {
		realIp = ip
	} else if ips := req.Header.Get("X-Forwarded-For"); ips != "" {
		ipList := strings.Split(ips, ",")
		realIp = ipList[0]
	} else {
		if ip := strings.Split(req.RemoteAddr, ":")[0]; ip != "" {
			realIp = ip
		}
	}

	fmt.Fprintln(w, realIp)
}

func main() {
	// 监听地址
	addr := "0.0.0.0:7777"

	// 注册路由
	http.HandleFunc("/", ipHandler)

	// 启动服务
	fmt.Printf("* Running on http://%s\n", addr)
	log.Fatalln(http.ListenAndServe(addr, nil))
}
