# syscall

文档：[https://pkg.go.dev/syscall](https://pkg.go.dev/syscall)

<br />

## 类Unix专属

```go
syscall.Gettid() (tid int)                     // 获取当前线程ID
syscall.Kill(pid int, sig Signal) (err error)  // 给PID发送指定信号
```