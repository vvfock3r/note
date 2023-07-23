---
sidebar: off
---

# Go模块

**参考资料**

* [https://pkg.go.dev/](https://pkg.go.dev/)
* [https://github.com/avelino/awesome-go](https://github.com/avelino/awesome-go)

**测试环境**

* 系统：Windows 10
* 版本：Go 1.20.1

**核心模块**

* [reflect](https://jinhui.dev/go/modules/reflect.html)：运行时反射
* [unsafe](https://jinhui.dev/go/modules/unsafe.html)：不安全编程
* [runtime](https://jinhui.dev/go/modules/runtime.html)：运行时
* [syscall](https://jinhui.dev/go/modules/syscall.html)：系统调用

**模块列表**

* [time](https://jinhui.dev/go/modules/time.html)：时间
* [sort](https://jinhui.dev/go/modules/sort.html)：排序
* [regexp](https://jinhui.dev/go/modules/regexp.html)：正则表达式
* [signal](https://jinhui.dev/go/modules/signal.html)：系统信号
* [math/rand](https://jinhui.dev/go/modules/math-rand.html)：随机数
* [zap](https://jinhui.dev/go/modules/zap.html)：日志记录
* [viper](https://jinhui.dev/go/modules/viper.html)：配置读写
* [cron](https://jinhui.dev/go/modules/cron.html)：计划任务
* [template](https://jinhui.dev/go/modules/template.html)：模板
* [email](https://jinhui.dev/go/modules/email.html)：发送邮件
* [automaxprocs](https://jinhui.dev/go/modules/automaxprocs.html)：识别容器允许使用的核心数并自动调整
* [x/text](https://jinhui.dev/go/modules/x-text.html)：解决Windows下中文乱码问题
* [gopsutil](https://jinhui.dev/go/modules/gopsutil.html)：Go版本的psutil
* [singleflight](https://jinhui.dev/go/modules/singleflight.html)：并发请求合并
* [excelize](https://jinhui.dev/go/modules/excelize.html)：Excel操作
* 编码和序列化
  * [json](https://jinhui.dev/go/modules/json.html)：JSON序列化
  * [encoding/base64](https://jinhui.dev/go/modules/encoding-base64.html)：base64编码
* 文件

  * [air](https://jinhui.dev/go/modules/air.html)：实时重载
  * [path/filepath](https://jinhui.dev/go/modules/path-filepath.html)：文件路径
  * [embed](https://jinhui.dev/go/modules/embed.html)：打包静态文件
* 命令行
  * [cobra](https://jinhui.dev/go/modules/cobra.html)：参数解析
  * [color](https://jinhui.dev/go/modules/color.html)：终端颜色
  * [simpletable](https://jinhui.dev/go/modules/simpletable.html)：终端表格
  * [os/exec](https://jinhui.dev/go/modules/os-exec.html)：执行Shell命令
  * pty：Unix伪终端 [Github](https://github.com/creack/pty)
  * x/term：处理终端交互
  * tcell：终端仿真器 [Github](https://github.com/gdamore/tcell)
  * 
* 网络
  * [net](https://jinhui.dev/go/modules/net.html)：基础网络库
  * [net/url](https://jinhui.dev/go/modules/net-url.html)：URL解析和编码
  * net/netip：IP
* 数据库
  * [database/sql](https://jinhui.dev/go/modules/database-sql.html)：Go内置接口和常用驱动
  * [gorm](https://jinhui.dev/go/modules/gorm.html)：数据库（已弃坑）
* Web
  * [net/http](https://jinhui.dev/go/modules/net-http.html)：Build-In
  * [resty](https://jinhui.dev/go/modules/resty.html)：HTTP Client
  * [gin](https://jinhui.dev/go/modules/gin.html)：Web Server
  * [grpc](https://jinhui.dev/go/modules/grpc.html)：RPC Server
  * [go-socks5](https://jinhui.dev/go/modules/go-socks5.html)：Socks5 Proxy
  * [goproxy](https://jinhui.dev/go/modules/goproxy.html)：HTTP Proxy
* 加密相关
  * [x/crypto/bcrypt](https://jinhui.dev/go/modules/bcrypt.html)：bcrypt算法
  * crypto/tls：TLS 1.2和TLS 1.3实现
  * crypto/x509：X.509证书解析
* 安全保护

  * [jwt](https://jinhui.dev/go/modules/jwt.html)：JSON Web Token
  * [casbin](https://jinhui.dev/go/modules/casbin.html)：访问控制模型，比如RBAC
  * [validator](https://jinhui.dev/go/modules/validator.html)：验证器
  * [x/time/rate](https://jinhui.dev/go/modules/x-time-rate.html)：限速器
  * [otp](https://jinhui.dev/go/modules/otp.html)：双因素认证
* GUI
  * wails：使用Go + Vue构建桌面应用 [Github](https://github.com/wailsapp/wails)
