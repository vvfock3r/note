# Zap

Github：[https://github.com/uber-go/zap](https://github.com/uber-go/zap)



## 安装

```bash
go get -u go.uber.org/zap
```

<br />

## 内置Logger

::: details 点击查看完整代码

```go
package main

import (
	"go.uber.org/zap"
	"time"
)

func main() {
	// 提供不同默认参数的3种Logger
	proLogger, _ := zap.NewProduction()
	devLogger, _ := zap.NewDevelopment()
	exampleLogger := zap.NewExample()

	// 打印一下日志看看效果
	proLogger.Info("Hello World!")
	devLogger.Info("Hello World!")
	exampleLogger.Info("Hello World!")

	// 默认这3种日志是不能打印非结构化数据的，以下3条语句编译会报错
	//proLogger.Info(time.Now())
	//devLogger.Info(time.Now())
	//exampleLogger.Info(time.Now())

	// Logger分为两种：
	//   Logger: 性能最好，但是只支持结构化数据，虽然使用不太方便，但还是推荐使用这种方式
	//   SugaredLogger: 比Logger性能差，比标准库或第三方日志库性能要好，支持非结构化数据，使用较方便
	sugarlogger := proLogger.Sugar()  // Logger转SugaredLogger
	sugarlogger.Info(time.Now())      // 输出非结构化日志
	proLogger = sugarlogger.Desugar() // SugaredLogger转Logger
}
```

输出结果

```bash
C:\Users\Administrator\GolandProjects\demo>go run main.go
{"level":"info","ts":1663367983.4938114,"caller":"demo/main.go:15","msg":"Hello World!"}
2022-09-17T06:39:43.493+0800    INFO    demo/main.go:16 Hello World!                                                           
{"level":"info","msg":"Hello World!"}
{"level":"info","ts":1663367983.508526,"caller":"demo/main.go:28","msg":"2022-09-17 06:39:43.5085261 +0800 CST m=+0.018391001"}
```

:::

<br />

## Logger 结构

::: details 点击查看完整代码

```go
// NewProduction 返回一个Logger，内部调用了 NewProductionConfig().Build
func NewProduction(options ...Option) (*Logger, error) {
	return NewProductionConfig().Build(options...)
}

// NewProductionConfig 返回一个 Config对象
func NewProductionConfig() Config {
	return Config{
		Level:       NewAtomicLevelAt(InfoLevel),
		Development: false,
		Sampling: &SamplingConfig{
			Initial:    100,
			Thereafter: 100,
		},
		Encoding:         "json",
		EncoderConfig:    NewProductionEncoderConfig(),
		OutputPaths:      []string{"stderr"},
		ErrorOutputPaths: []string{"stderr"},
	}
}

// Sampling 设置采样策略，配置的值为每秒
// 在1s的时间单位内，如果某个日志级别下同样内容的日志输出数量超过了Initial的数量，那么超过之后，每隔Thereafter的数量，才会再输出一次
// 这是一个对日志输出的保护功能
// 设置为nul时关闭采样
Sampling: &SamplingConfig{
    Initial:    100, // 在每秒内从第101条日志开始
    Thereafter: 100, // 每100条日志打印一条日志
}

// EncoderConfig
func NewProductionEncoderConfig() zapcore.EncoderConfig {
	return zapcore.EncoderConfig{
		TimeKey:        "ts",             // JSON格式的时间Key
		LevelKey:       "level",          // JSON格式的日志等级Key
		NameKey:        "logger",         // logger名称Key
		CallerKey:      "caller",         // JSON格式的日志由哪个文件第几行打印Key
		FunctionKey:    zapcore.OmitKey,  // JSON格式的日志由哪个函数调用的Key
		MessageKey:     "msg",            // JSON格式的日志主体Key
		StacktraceKey:  "stacktrace",     // 
		LineEnding:     zapcore.DefaultLineEnding,       // 
		EncodeLevel:    zapcore.LowercaseLevelEncoder,   // 
		EncodeTime:     zapcore.EpochTimeEncoder,        //
		EncodeDuration: zapcore.SecondsDurationEncoder,  //
		EncodeCaller:   zapcore.ShortCallerEncoder,      // 
	}
}

// Build方法
// 1.zapcore.NewCore(encoder, writeSyncer, level)返回一个core
// 2.zap.New(core)创建一个Logger
func (cfg Config) Build(opts ...Option) (*Logger, error) {
	enc, err := cfg.buildEncoder()
	if err != nil {
		return nil, err
	}

	sink, errSink, err := cfg.openSinks()
	if err != nil {
		return nil, err
	}

	if cfg.Level == (AtomicLevel{}) {
		return nil, errors.New("missing Level")
	}

	log := New(
		zapcore.NewCore(enc, sink, cfg.Level),
		cfg.buildOptions(errSink)...,
	)
	if len(opts) > 0 {
		log = log.WithOptions(opts...)
	}
	return log, nil
}
```

:::

<br />

## 初始化Logger

::: details （1）简单方式：生成Config对象，然后调用 Build() 创建Logger

```go
package main

import "go.uber.org/zap"

// NewZapLogger 创建zap logger
func NewZapLogger() (*zap.Logger, error) {
	// 实例化Config对象
	zapConfig := zap.NewProductionConfig()

	// 生成Logger对象并返回
	return zapConfig.Build()
}

func main() {
	// 实例化Logger
	logger, err := NewZapLogger()
	if err != nil {
		panic(err)
	}
    defer logger.Sync()
    
	// 输出日志
	logger.Info("Hello World!")
	logger.Warn("Hello World!")
	logger.Error("Hello World!")
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
{"level":"info","ts":1674380444.8767374,"caller":"example/main.go:22","msg":"Hello World!"}
{"level":"warn","ts":1674380444.877175,"caller":"example/main.go:23","msg":"Hello World!"}
{"level":"error","ts":1674380444.877175,"caller":"example/main.go:24","msg":"Hello World!","stacktrace":"main.main\n\tD:/application/GoLand/example/main.go:24\nruntime.main\n\tC:/Users/Administrator/sdk/go1.19.3/src/runtime/proc.go:
250"}
```

:::

::: details （2）复杂方式：生成Core对象，然后通过 zap.New(core) 创建Logger，这是最灵活的方法

```go
package main

import (
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
	"os"
)

// NewZapLogger 创建zap logger
func NewZapLogger() (*zap.Logger, error) {
	// 实例化 Encoder
	encoderConfig := zap.NewProductionEncoderConfig()
	encoder := zapcore.NewJSONEncoder(encoderConfig)

	// 实例化 WriteSyncer
	stdoutWriteSyncer := zapcore.AddSync(os.Stdout)

	// 实例化 LevelEnabler
	level := zap.NewAtomicLevelAt(zapcore.InfoLevel)

	// 创建 Core
	core := zapcore.NewCore(encoder, stdoutWriteSyncer, level)

	// 创建 *Logger
	logger := zap.New(core, zap.AddCaller(), zap.AddStacktrace(zapcore.ErrorLevel))

	return logger, nil
}

func main() {
	// 实例化Logger
	logger, err := NewZapLogger()
	if err != nil {
		panic(err)
	}
    defer logger.Sync()

	// 输出日志
	logger.Info("Hello World!")
	logger.Warn("Hello World!")
	logger.Error("Hello World!")
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
{"level":"info","ts":1674380132.862975,"caller":"example/main.go:38","msg":"Hello World!"}
{"level":"warn","ts":1674380132.863479,"caller":"example/main.go:39","msg":"Hello World!"}
{"level":"error","ts":1674380132.8634932,"caller":"example/main.go:40","msg":"Hello World!","stacktrace":"main.main\n\tD:/application/GoLand/example/main.go:40\nruntime.main\n\tC:/Users/Administrator/sdk/go1.19.3/src/runtime/proc.go
:250"}
```

:::

<br />

## 设置Options

::: details （1）添加一个新字段

```go
package main

import (
	"go.uber.org/zap"
)

// NewZapLogger 创建zap logger
func NewZapLogger() (*zap.Logger, error) {
	// 实例化Config对象
	zapConfig := zap.NewProductionConfig()

	// 设置日志输出格式, 默认是 json 格式，可选择使用 console
	zapConfig.Encoding = "json"

	// 生成Logger对象
	logger, err := zapConfig.Build()

	// 方式1：使用下面代码生成logger
	//logger, err := zapConfig.Build(zap.Fields(zap.String("appId", "demo")))

	return logger, err
}

func main() {
	// 实例化Logger
	logger, err := NewZapLogger()
	if err != nil {
		panic(err)
	}
    defer logger.Sync()

	// 方式2
	//logger = logger.WithOptions(zap.Fields(zap.String("appId", "demo")))

	// 方式3
	logger = logger.With(zap.String("appId", "demo"))

	// 输出日志
	logger.Info("Hello World!")
	logger.Warn("Hello World!")
	logger.Info("Hello World!")
	logger.Warn("Hello World!")
}
```

输出结果

```bash
# JSON格式下显示良好
D:\application\GoLand\example>go run main.go
{"level":"info","ts":1674359587.5455246,"caller":"example/main.go:35","msg":"Hello World!","appId":"demo"}
{"level":"warn","ts":1674359587.5455246,"caller":"example/main.go:36","msg":"Hello World!","appId":"demo"}
{"level":"info","ts":1674359587.5460467,"caller":"example/main.go:37","msg":"Hello World!","appId":"demo"}
{"level":"warn","ts":1674359587.5460467,"caller":"example/main.go:38","msg":"Hello World!","appId":"demo"}

# Console格式下显得有些格格不入
D:\application\GoLand\example>go run main.go
1.674359666225286e+09   info    example/main.go:35      Hello World!    {"appId": "demo"}
1.6743596662258024e+09  warn    example/main.go:36      Hello World!    {"appId": "demo"}
1.6743596662258024e+09  info    example/main.go:37      Hello World!    {"appId": "demo"}
1.6743596662258024e+09  warn    example/main.go:38      Hello World!    {"appId": "demo"}

# 解决办法是通过message中手动注入新字段，但是这样的话在JSON格式下其实并不太好
	// 方式3
	// logger = logger.With(zap.String("appId", "demo"))

	// 输出日志
	logger.Info(fmt.Sprintf("%s\t%s", "demo", "Hello World!"))
	logger.Warn(fmt.Sprintf("%s\t%s", "demo", "Hello World!"))

D:\application\GoLand\example>go run main.go
1.6743602714985135e+09  info    example/main.go:39      demo    Hello World!
1.6743602714990304e+09  warn    example/main.go:40      demo    Hello World!
```

:::

::: details （2）zap内部错误输出到其他位置

```go
package main

import (
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
	"os"
)

// NewZapLogger 创建zap logger
func NewZapLogger() (*zap.Logger, error) {
	// 实例化 Encoder
	encoderConfig := zap.NewProductionEncoderConfig()
	encoder := zapcore.NewJSONEncoder(encoderConfig)

	// 实例化 WriteSyncer
	stdoutWriteSyncer := zapcore.AddSync(os.Stdout)

	// 实例化 LevelEnabler
	level := zap.NewAtomicLevelAt(zapcore.InfoLevel)

	// 创建 Core
	core := zapcore.NewCore(encoder, stdoutWriteSyncer, level)

	// 创建 *Logger
	logger := zap.New(core, zap.AddCaller(), zap.AddStacktrace(zapcore.ErrorLevel))

	// zap内部错误输出到stdout
	logger.WithOptions(zap.ErrorOutput(stdoutWriteSyncer))

	return logger, nil
}

func main() {
	// 实例化Logger
	logger, err := NewZapLogger()
	if err != nil {
		panic(err)
	}
	defer logger.Sync()

	// 输出日志
	logger.Info("Hello World!")
	logger.Warn("Hello World!")
	logger.Error("Hello World!")
}
```

输出 结果

```bash
# 这个不太容易测试，在后面将日志输入到网络接口中可以测试这个功能
D:\application\GoLand\example>go run main.go
{"level":"info","ts":1674480290.0613134,"caller":"example/main.go:42","msg":"Hello World!"}
{"level":"warn","ts":1674480290.0613134,"caller":"example/main.go:43","msg":"Hello World!"}
{"level":"error","ts":1674480290.0618596,"caller":"example/main.go:44","msg":"Hello World!","stacktrace":"main.main\n\tD:/application/GoLand/example/main.go:44\nruntime.main\n\tC:/Users/Administrator/sdk/go1.19.3/src/runtime/proc.go
:250"}
```

:::

<br />

## 设置日志级别

::: details （1）设置固定日志级别

```go
package main

import "go.uber.org/zap"

// NewZapLogger 创建zap logger
func NewZapLogger() (*zap.Logger, error) {
	// 实例化Config对象
	zapConfig := zap.NewProductionConfig()

    // 默认日志级别为info,设置日志级别为Warn,推荐方式2，代码简短一些
	//zapConfig.Level = zap.NewAtomicLevelAt(zap.WarnLevel) // 方式1
	zapConfig.Level.SetLevel(zap.WarnLevel)                 // 方式2

	// 生成Logger对象并返回
	return zapConfig.Build()
}

func main() {
	// 实例化Logger
	logger, err := NewZapLogger()
	if err != nil {
		panic(err)
	}
    defer logger.Sync()
    
	// 输出日志
	logger.Info("info")
	logger.Warn("warn")
	logger.Error("error")
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
{"level":"warn","ts":1674304864.7571805,"caller":"example/main.go:29","msg":"warn"}
{"level":"error","ts":1674304864.7571805,"caller":"example/main.go:30","msg":"error","stacktrace":"main.main\n\tD:/application/GoLand/example/main.go:30\nruntime.main\n\tC:/Users/Administrator/sdk/go1.19.3/src/runtime/proc.go:250"}
```

:::

::: details （2）动态调整日志级别

```go
package main

import "go.uber.org/zap"

var atomicLevel = zap.NewAtomicLevelAt(zap.InfoLevel)

// NewZapLogger 创建zap logger
func NewZapLogger() (*zap.Logger, error) {
	// 实例化Config对象
	zapConfig := zap.NewProductionConfig()

	// 默认日志级别
	zapConfig.Level = atomicLevel

	// 生成Logger对象并返回
	return zapConfig.Build()
}

func main() {
	// 实例化Logger
	logger, err := NewZapLogger()
	if err != nil {
		panic(err)
	}
	defer logger.Sync()

	// 输出日志
	logger.Debug("debug")
	logger.Info("info")
	logger.Warn("warn")

	// 动态修改日志级别
	atomicLevel.SetLevel(zap.WarnLevel)
	logger.Debug("debug2")
	logger.Info("info2")
	logger.Warn("warn2")
}
```

输出结果

```bash
# 可以看到动态修改日志级别后，info2并没有输出
D:\application\GoLand\example>go run main.go
{"level":"info","ts":1674471950.5494144,"caller":"example/main.go:29","msg":"info"}
{"level":"warn","ts":1674471950.5494144,"caller":"example/main.go:30","msg":"warn"} 
{"level":"warn","ts":1674471950.5494144,"caller":"example/main.go:36","msg":"warn2"}
```

:::

::: details （3）通过HTTP请求修改日志级别

```go
package main

import (
	"fmt"
	"go.uber.org/zap"
	"log"
	"net/http"
	"time"
)

var atomicLevel = zap.NewAtomicLevelAt(zap.InfoLevel)

// NewZapLogger 创建zap logger
func NewZapLogger() (*zap.Logger, error) {
	// 实例化Config对象
	zapConfig := zap.NewProductionConfig()

	// 默认日志级别
	zapConfig.Level = atomicLevel

	// 生成Logger对象并返回
	return zapConfig.Build()
}

func main() {
	// 实例化Logger
	logger, err := NewZapLogger()
	if err != nil {
		panic(err)
	}
	defer logger.Sync()

	// 输出日志
	go func() {
		for {
			logger.Debug("")
			logger.Info("")
			logger.Warn("")
			fmt.Println()
			time.Sleep(time.Second)
		}
	}()

	// 注册路由
	http.HandleFunc("/log/level", atomicLevel.ServeHTTP)

	// 启动HTTP Server
	log.Fatalln(http.ListenAndServe("127.0.0.1:8080", nil))
}
```

输出结果

```bash
# 查看当前日志级别
D:\application\GoLand\example>curl http://127.0.0.1:8080/log/level
{"level":"info"}

# 查看日志
{"level":"info","ts":1674473281.3691077,"caller":"example/main.go:37","msg":""}
{"level":"warn","ts":1674473281.3691752,"caller":"example/main.go:38","msg":""}

# 修改日志级别为debug
D:\application\GoLand\example>curl -X PUT localhost:8080/log/level -d level=debug
{"level":"debug"}

# 查看当前日志级别
D:\application\GoLand\example>curl http://127.0.0.1:8080/log/level                                                           
{"level":"debug"}

# 查看日志
{"level":"debug","ts":1674473310.8678765,"caller":"example/main.go:36","msg":""}
{"level":"info","ts":1674473310.8679123,"caller":"example/main.go:37","msg":""}
{"level":"warn","ts":1674473310.8679123,"caller":"example/main.go:38","msg":""}
```

:::

<br />

## 设置日志格式

::: details （1）日志输出格式设置为 JSON 或 Console

```go
package main

import "go.uber.org/zap"

// NewZapLogger 创建zap logger
func NewZapLogger() (*zap.Logger, error) {
	// 实例化Config对象
	zapConfig := zap.NewProductionConfig()

	// 设置日志输出格式, 默认是json格式，可选择使用console
	zapConfig.Encoding = "console"

	// 生成Logger对象并返回
	return zapConfig.Build()
}

func main() {
	// 实例化Logger
	logger, err := NewZapLogger()
	if err != nil {
		panic(err)
	}
    defer logger.Sync()
    
	// 输出日志
	logger.Debug("debug")
	logger.Info("info")
	logger.Warn("warn")
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
1.6743054771284275e+09  info    example/main.go:30      info
1.6743054771284275e+09  warn    example/main.go:31      warn
```

:::

::: details （2）日志记录格式字段说明

```go
package main

import (
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

// NewZapLogger 创建zap logger
func NewZapLogger() (*zap.Logger, error) {
	// 实例化Config对象
	zapConfig := zap.NewProductionConfig()

	// 设置日志输出格式, 默认是 json 格式，可选择使用 console
	zapConfig.Encoding = "json"

	// 设置日志记录格式
	//   1.下面这一段完全复制的NewProductionEncoderConfig函数返回值，然后再针对性的进行修改
	//   2.只在JSON格式日志中有效：xxKey这种只有在JSON格式日志中才会用到，console格式直接使用的是Key的值，即Key字段下面的部分
	//   3.只在JSON格式日志中有效：将Key设置为 zapcore.OmitKey，那么这个key将不会显示
    //   4.只在console格式日志中有效：ConsoleSeparator字段分隔符，默认为tab
	zapConfig.EncoderConfig = zapcore.EncoderConfig{
		TimeKey:       "ts",            // 时间戳，对应 EncodeTime
		LevelKey:      "level",         // 日志等级, 对应 EncodeLevel
		NameKey:       "logger",        // logger名称, 对应 EncodeName，默认不会输出
		CallerKey:     "caller",        // 是哪个文件的第几行输出的日志，对应 EncodeCaller
		FunctionKey:   zapcore.OmitKey, // 是哪个函数输出的日志，这里设置了OmitKey，所以并不会输出，没有找到对应的处理对象
		MessageKey:    "msg",           // 消息主体，没有找到对应的处理对象
		StacktraceKey: "stacktrace",    // stacktrace，没有找到对应的处理对象

		LineEnding:     zapcore.DefaultLineEnding,      // 定义写入日志时的默认行结尾字符串
		EncodeLevel:    zapcore.LowercaseLevelEncoder,  // 定义日志级别值
		EncodeTime:     zapcore.EpochTimeEncoder,       // 定义日志时间值
		EncodeDuration: zapcore.SecondsDurationEncoder, // 不知道啥意思???
		EncodeCaller:   zapcore.ShortCallerEncoder,     // 日志调用者值

		// 手动添加上logger name key
		EncodeName: func(s string, encoder zapcore.PrimitiveArrayEncoder) { encoder.AppendString(s) },

		// 手动添加上 console 格式日志的字段分隔符，默认(空字符串)为tab
		ConsoleSeparator: "",
	}

	// 生成Logger对象并返回
	return zapConfig.Build()
}

func main() {
	// 实例化Logger
	logger, err := NewZapLogger()
	if err != nil {
		panic(err)
	}
    defer logger.Sync()
    
	// 输出日志
	logger.Debug("debug")
	logger.Info("info")
	logger.Warn("warn")
	logger.Error("error")

	// 输出带logger名称的日志
	// 需要 NameKey + EncodeName + logger.Named 配合使用
	authzLogger := logger.Named("authz")
	authzLogger.Info("info")

	authnLogger := logger.Named("authn")
	authnLogger.Info("info")
}
```

输出结果

```bash
D:\application\GoLand\example>go run main.go
{"level":"info","ts":1674308198.2470381,"caller":"example/main.go:59","msg":"info"}
{"level":"warn","ts":1674308198.2475853,"caller":"example/main.go:60","msg":"warn"}
{"level":"error","ts":1674308198.2475853,"caller":"example/main.go:61","msg":"error","stacktrace":"main.main\n\tD:/application/GoLand/example/main.go:61\nruntime.main\n\tC:/Users/Administrator/sdk/go1.19.3/src/runtime/proc.go:250"}
{"level":"info","ts":1674308198.2475853,"logger":"authz","caller":"example/main.go:66","msg":"info"}
{"level":"info","ts":1674308198.2475853,"logger":"authn","caller":"example/main.go:68","msg":"info"}
```

:::

::: details （3）日志记录格式字段自定义

```go
package main

import (
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

// NewZapLogger 创建zap logger
func NewZapLogger() (*zap.Logger, error) {
	// 实例化Config对象
	zapConfig := zap.NewProductionConfig()

	// 设置日志输出格式, 默认是 json 格式，可选择使用 console
	zapConfig.Encoding = "json"

	// 设置日志记录格式
	zapConfig.EncoderConfig = zapcore.EncoderConfig{
		TimeKey:          "time",
		LevelKey:         "level",
		NameKey:          "logger",
		CallerKey:        "caller",
		FunctionKey:      "function",
		MessageKey:       "message",
		StacktraceKey:    "stacktrace",
		LineEnding:       zapcore.DefaultLineEnding,
		EncodeLevel:      zapcore.CapitalLevelEncoder,
		EncodeTime:       zapcore.TimeEncoderOfLayout("2006-01-02 15:04:05"),
		EncodeDuration:   zapcore.SecondsDurationEncoder,
		EncodeCaller:     zapcore.ShortCallerEncoder,
		EncodeName:       func(s string, encoder zapcore.PrimitiveArrayEncoder) { encoder.AppendString(s) },
		ConsoleSeparator: "",
	}

	// 生成Logger对象并返回
	return zapConfig.Build()
}

func main() {
	// 实例化Logger
	logger, err := NewZapLogger()
	if err != nil {
		panic(err)
	}
    defer logger.Sync()

	// 输出带logger名称的日志
	authzLogger := logger.Named("authz")
	authnLogger := logger.Named("authn")

	// 输出日志
	authzLogger.Info("Hello World!")
	authzLogger.Warn("Hello World!")
	authnLogger.Info("Hello World!")
	authnLogger.Warn("Hello World!")
}
```

输出结果

```bash
# JSON格式
D:\application\GoLand\example>go run main.go
{"level":"INFO","time":"2023-01-22 11:34:57","logger":"authz","caller":"example/main.go:51","function":"main.main","message":"Hello World!"}
{"level":"WARN","time":"2023-01-22 11:34:57","logger":"authz","caller":"example/main.go:52","function":"main.main","message":"Hello World!"}
{"level":"INFO","time":"2023-01-22 11:34:57","logger":"authn","caller":"example/main.go:53","function":"main.main","message":"Hello World!"}
{"level":"WARN","time":"2023-01-22 11:34:57","logger":"authn","caller":"example/main.go:54","function":"main.main","message":"Hello World!"}

# Console格式
D:\application\GoLand\example>go run main.go
2023-01-22 11:36:25     INFO    authz   example/main.go:51      main.main       Hello World!
2023-01-22 11:36:25     WARN    authz   example/main.go:52      main.main       Hello World!
2023-01-22 11:36:25     INFO    authn   example/main.go:53      main.main       Hello World!
2023-01-22 11:36:25     WARN    authn   example/main.go:54      main.main       Hello World!
```

:::

<br />

## 输出日志位置

::: details （1）zap.NewProductionConfig默认会把所有的日志全部输出到stderr

```bash
# 查看源码配置
func NewProductionConfig() Config {
	return Config{
		Level:       NewAtomicLevelAt(InfoLevel),
		Development: false,
		Sampling: &SamplingConfig{
			Initial:    100,
			Thereafter: 100,
		},
		Encoding:         "json",
		EncoderConfig:    NewProductionEncoderConfig(),
		OutputPaths:      []string{"stderr"},  // 日志输出位置,包含错误日志
		ErrorOutputPaths: []string{"stderr"},  // zap内部的错误日志输出位置,比如将日志通过网络请求发送时发生的错误
	}
}

# 测试
[root@ap-hongkang demo]# go run main.go 1>1.txt 2>2.txt
[root@ap-hongkang demo]# cat 1.txt 
[root@ap-hongkang demo]# cat 2.txt
{"level":"error","ts":1674360992.4000423,"caller":"demo/main.go:27","msg":"Hello World!","stacktrace":"main.main\n\t/root/demo/main.go:27\nruntime.main\n\t/usr/local/go1.19.3/src/runtime/proc.go:250"}
{"level":"info","ts":1674360992.4000852,"caller":"demo/main.go:28","msg":"Hello World!"}
{"level":"warn","ts":1674360992.4000897,"caller":"demo/main.go:29","msg":"Hello World!"}
```

:::

::: details （2）日志输出到stdout

```go
package main

import (
	"go.uber.org/zap"
)

// NewZapLogger 创建zap logger
func NewZapLogger() (*zap.Logger, error) {
	// 实例化Config对象
	zapConfig := zap.NewProductionConfig()

	// 设置日志输出格式, 默认是 json 格式，可选择使用 console
	zapConfig.Encoding = "json"

	// 所有的日志输出到stdout
	zapConfig.OutputPaths = []string{"stdout"}

	// 生成Logger对象并返回
	return zapConfig.Build()
}

func main() {
	// 实例化Logger
	logger, err := NewZapLogger()
	if err != nil {
		panic(err)
	}
    defer logger.Sync()

	// 输出日志
	logger.Info("Hello World!")
	logger.Warn("Hello World!")
	logger.Error("Hello World!")
	logger.Fatal("Hello World!") // Fatal执行后会退出程序
}
```

输出结果

```bash
[root@ap-hongkang demo]# go run main.go  | jq
{
  "level": "info",
  "ts": 1674364364.119415,
  "caller": "demo/main.go:30",
  "msg": "Hello World!"
}
{
  "level": "warn",
  "ts": 1674364364.1194427,
  "caller": "demo/main.go:31",
  "msg": "Hello World!"
}
{
  "level": "error",
  "ts": 1674364364.119447,
  "caller": "demo/main.go:32",
  "msg": "Hello World!",
  "stacktrace": "main.main\n\t/root/demo/main.go:32\nruntime.main\n\t/usr/local/go1.19.3/src/runtime/proc.go:250"
}
{
  "level": "fatal",
  "ts": 1674364364.1194553,
  "caller": "demo/main.go:33",
  "msg": "Hello World!",
  "stacktrace": "main.main\n\t/root/demo/main.go:33\nruntime.main\n\t/usr/local/go1.19.3/src/runtime/proc.go:250"
}
exit status 1
```

:::

::: details （3）日志输出到文件：使用Config对象

```go
package main

import (
	"go.uber.org/zap"
)

// NewZapLogger 创建zap logger
func NewZapLogger() (*zap.Logger, error) {
	// 实例化Config对象
	zapConfig := zap.NewProductionConfig()

	// 设置日志输出格式, 默认是 json 格式，可选择使用 console
	zapConfig.Encoding = "json"

	// 设置日志输出位置为 stdout和 文件
    // 文件不存在时自动创建，文件存在时以追加模式写入日志
	zapConfig.OutputPaths = []string{"stdout", "test.log"}

	// 生成Logger对象并返回
	return zapConfig.Build()
}

func main() {
	// 实例化Logger
	logger, err := NewZapLogger()
	if err != nil {
		panic(err)
	}
    defer logger.Sync()

	// 输出日志
	logger.Info("Hello World!")
	logger.Warn("Hello World!")
	logger.Error("Hello World!")
	logger.Fatal("Hello World!") // Fatal执行后会退出程序
}
```

输出结果

![image-20230122200122974](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230122200122974.png)

:::

::: details （4）日志输出到文件：使用Core对象

```go
package main

import (
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
	"os"
)

// NewZapLogger 创建zap logger
func NewZapLogger() (*zap.Logger, error) {
	// 实例化 Encoder
	encoderConfig := zap.NewProductionEncoderConfig()
	encoder := zapcore.NewJSONEncoder(encoderConfig)

	// 实例化 WriteSyncer
	var (
		fileWriteSyncer   zapcore.WriteSyncer
		stdoutWriteSyncer zapcore.WriteSyncer
	)
	file, err := os.OpenFile("test.log",
		os.O_CREATE|os.O_APPEND|os.O_WRONLY, os.ModePerm,
	)
	if err != nil {
		return nil, err
	}
	fileWriteSyncer = zapcore.Lock(zapcore.AddSync(file)) // 根据Lock函数的注释,使用锁保护一下，但是一般情况下不加锁也不会有问题
	stdoutWriteSyncer = zapcore.AddSync(os.Stdout)
	writeSyncer := zapcore.NewMultiWriteSyncer(fileWriteSyncer, stdoutWriteSyncer) // 将所有的WriteSyncer组合成一个

	// 实例化 LevelEnabler
	level := zap.NewAtomicLevelAt(zapcore.InfoLevel)

	// 创建 Core
	core := zapcore.NewCore(encoder, writeSyncer, level)

	// 创建 *Logger
	logger := zap.New(core, zap.AddCaller(), zap.AddStacktrace(zapcore.ErrorLevel))

	return logger, nil
}

func main() {
	// 实例化Logger
	logger, err := NewZapLogger()
	if err != nil {
		panic(err)
	}
    defer logger.Sync()

	// 输出日志
	logger.Info("Hello World!")
	logger.Warn("Hello World!")
	logger.Error("Hello World!")
	logger.Fatal("Hello World!") // Fatal执行后会退出程序
}
```

输出结果

![image-20230122213749704](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230122213749704.png)

:::

::: details （5）日志输出到任意位置：使用Config对象

```go
package main

import (
	"bytes"
	"go.uber.org/zap"
	"net/http"
	"net/url"
	"strconv"
	"time"
)

// HTTPWriter 通过HTTP POST请求发送日志
type HTTPWriter struct {
	url         string
	contentType string
}

// NewHTTPWriter 构造函数
func NewHTTPWriter(url string, contentType string) *HTTPWriter {
	return &HTTPWriter{url: url, contentType: contentType}
}

// Write 实现WriteSyncer之一
func (w *HTTPWriter) Write(b []byte) (n int, err error) {
	// 发送Post请求
	_, err = http.Post(w.url, w.contentType, bytes.NewReader(b))
	if err != nil {
		return 0, err
	}

	return len(b), nil
}

// Sync 实现WriteSyncer之一
func (w *HTTPWriter) Sync() error {
	return nil
}

// Close 实现io.Closer
func (w *HTTPWriter) Close() error {
	return nil
}

// NewZapLogger 创建zap logger
func NewZapLogger() (*zap.Logger, error) {
	// 实例化Config对象
	zapConfig := zap.NewProductionConfig()

	// 注册自定义 Sink
	err := zap.RegisterSink("http", func(url *url.URL) (zap.Sink, error) {
		return NewHTTPWriter(url.Scheme+"://"+url.Host, "application/json"), nil
	})
	if err != nil {
		return nil, err
	}

	// 发送日志到stdout和HTTP接口
	zapConfig.OutputPaths = []string{"stdout", "http://localhost:8080/"}

	// 生成Logger对象并返回
	return zapConfig.Build()
}

func main() {
	// 实例化Logger
	logger, err := NewZapLogger()
	if err != nil {
		panic(err)
	}
	defer logger.Sync()

	// 输出日志
	for i := 0; i < 10; i++ {
		logger.Info(strconv.Itoa(i))
		time.Sleep(time.Second)
	}
}
```

`server/main.go`

```go
package main

import (
	"io"
	"log"
	"net/http"
	"os"
)

func main() {
	http.HandleFunc("/", func(writer http.ResponseWriter, request *http.Request) {
		io.Copy(os.Stdout, request.Body)
	})
	log.Fatalln(http.ListenAndServe("127.0.0.1:8080", nil))
}
```

输出结果

```bash
# 启动HTTP Server
D:\application\GoLand\example>go run server/main.go

# 发送日志
D:\application\GoLand\example>go run main.go
D:\application\GoLand\example>go run main.go
{"level":"info","ts":1674479622.3019233,"caller":"example/main.go:74","msg":"0"}
{"level":"info","ts":1674479623.6322286,"caller":"example/main.go:74","msg":"1"}
{"level":"info","ts":1674479624.6434062,"caller":"example/main.go:74","msg":"2"}
{"level":"info","ts":1674479625.6534476,"caller":"example/main.go:74","msg":"3"}
{"level":"info","ts":1674479626.6648703,"caller":"example/main.go:74","msg":"4"}
{"level":"info","ts":1674479627.6705728,"caller":"example/main.go:74","msg":"5"}
...

# 服务端日志
D:\application\GoLand\example>go run server/main.go
{"level":"info","ts":1674479622.3019233,"caller":"example/main.go:74","msg":"0"}
{"level":"info","ts":1674479623.6322286,"caller":"example/main.go:74","msg":"1"}
{"level":"info","ts":1674479624.6434062,"caller":"example/main.go:74","msg":"2"}
{"level":"info","ts":1674479625.6534476,"caller":"example/main.go:74","msg":"3"}
{"level":"info","ts":1674479626.6648703,"caller":"example/main.go:74","msg":"4"}
{"level":"info","ts":1674479627.6705728,"caller":"example/main.go:74","msg":"5"}
...

# 若服务端未启动则会报错,报错信息属于zap内部错误，会发送到 ErrorOutput(默认是stderr)
D:\application\GoLand\example>go run main.go
{"level":"info","ts":1674479822.3531852,"caller":"example/main.go:74","msg":"0"}
2023-01-23 21:17:02.3531852 +0800 CST m=+0.004605301 write error: Post "http://localhost:8080": dial tcp [::1]:8080: connectex: No connection could be made because the target machine actively refused it.
{"level":"info","ts":1674479825.7257688,"caller":"example/main.go:74","msg":"1"}
2023-01-23 21:17:05.7257687 +0800 CST m=+3.377188801 write error: Post "http://localhost:8080": dial tcp [::1]:8080: connectex: No connection could be made because the target machine actively refused it.
```

:::

::: details （6）日志输出到任意位置：使用Core对象

```go
package main

import (
	"bytes"
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
	"net/http"
	"os"
	"strconv"
	"time"
)

// HTTPWriter 通过HTTP POST请求发送日志
type HTTPWriter struct {
	url         string
	contentType string
}

// NewHTTPWriter 构造函数
func NewHTTPWriter(url string, contentType string) *HTTPWriter {
	return &HTTPWriter{url: url, contentType: contentType}
}

// Write 实现io.Writer
func (w *HTTPWriter) Write(b []byte) (n int, err error) {
	// 发送Post请求
	_, err = http.Post(w.url, w.contentType, bytes.NewReader(b))
	if err != nil {
		return 0, err
	}

	return len(b), nil
}

// NewZapLogger 创建zap logger
func NewZapLogger() (*zap.Logger, error) {
	// 实例化 Encoder
	encoderConfig := zap.NewProductionEncoderConfig()
	encoder := zapcore.NewJSONEncoder(encoderConfig)

	// 实例化 WriteSyncer
	var (
		url             = "http://localhost:8080/"
		contentType     = "application/json"
		httpWriteSyncer zapcore.WriteSyncer

		stdoutWriteSyncer zapcore.WriteSyncer
	)
	httpWriteSyncer = zapcore.Lock(zapcore.AddSync(NewHTTPWriter(url, contentType)))
	stdoutWriteSyncer = zapcore.AddSync(os.Stdout)
	writeSyncer := zapcore.NewMultiWriteSyncer(httpWriteSyncer, stdoutWriteSyncer)

	// 实例化 LevelEnabler
	level := zap.NewAtomicLevelAt(zapcore.InfoLevel)

	// 创建 Core
	core := zapcore.NewCore(encoder, writeSyncer, level)

	// 创建 *Logger
	logger := zap.New(core, zap.AddCaller(), zap.AddStacktrace(zapcore.ErrorLevel))

	return logger, nil
}

func main() {
	// 实例化Logger
	logger, err := NewZapLogger()
	if err != nil {
		panic(err)
	}
	defer logger.Sync()

	// 输出日志
	for i := 0; i < 10; i++ {
		logger.Info(strconv.Itoa(i))
		time.Sleep(time.Second)
	}
}
```

`server/main.go`

```go
package main

import (
	"io"
	"log"
	"net/http"
	"os"
)

func main() {
	http.HandleFunc("/", func(writer http.ResponseWriter, request *http.Request) {
		io.Copy(os.Stdout, request.Body)
	})
	log.Fatalln(http.ListenAndServe("127.0.0.1:8080", nil))
}
```

输出结果

```bash
# 启动HTTP Server
D:\application\GoLand\example>go run server/main.go

# 发送日志
D:\application\GoLand\example>go run main.go
{"level":"info","ts":1674478245.920576,"caller":"example/main.go:75","msg":"0"}
{"level":"info","ts":1674478247.2481759,"caller":"example/main.go:75","msg":"1"}
{"level":"info","ts":1674478248.2584329,"caller":"example/main.go:75","msg":"2"}
{"level":"info","ts":1674478249.2676933,"caller":"example/main.go:75","msg":"3"}
{"level":"info","ts":1674478250.2789872,"caller":"example/main.go:75","msg":"4"}
{"level":"info","ts":1674478251.290573,"caller":"example/main.go:75","msg":"5"}
...

# 服务端日志
D:\application\GoLand\example>go run server/main.go
{"level":"info","ts":1674478245.920576,"caller":"example/main.go:75","msg":"0"}
{"level":"info","ts":1674478247.2481759,"caller":"example/main.go:75","msg":"1"}
{"level":"info","ts":1674478248.2584329,"caller":"example/main.go:75","msg":"2"}
{"level":"info","ts":1674478249.2676933,"caller":"example/main.go:75","msg":"3"}
{"level":"info","ts":1674478250.2789872,"caller":"example/main.go:75","msg":"4"}
{"level":"info","ts":1674478251.290573,"caller":"example/main.go:75","msg":"5"}
...

# 若服务端未启动则会报错,报错信息属于zap内部错误，会发送到 ErrorOutput(默认是stderr)
D:\application\GoLand\example>go run main.go
{"level":"info","ts":1674478294.1663451,"caller":"example/main.go:75","msg":"0"}
2023-01-23 20:51:34.1663452 +0800 CST m=+0.004069101 write error: Post "http://localhost:8080/": dial tcp [::1]:8080: connectex: No connection could be made because the target machine actively refused it.
{"level":"info","ts":1674478297.5306103,"caller":"example/main.go:75","msg":"1"}
2023-01-23 20:51:37.5306104 +0800 CST m=+3.368334301 write error: Post "http://localhost:8080/": dial tcp [::1]:8080: connectex: No connection could be made because the target machine actively refused it.
...
```

:::

<br />

## 使用多个Core

使用多个Core，每个Core都可以有自己专属的配置，实现最大的灵活性

::: details （1）设置stdout日志级别为Error，设置文件的日志级别为Debug

```go
package main

import (
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
	"os"
)

// NewZapLogger 创建zap logger
func NewZapLogger() (*zap.Logger, error) {
	// 实例化 Encoder
	encoderConfig := zap.NewProductionEncoderConfig()
	encoder := zapcore.NewJSONEncoder(encoderConfig)

	// 实例化 Core: file WriteSyncer，日志级别为 Debug
	file, err := os.OpenFile("test.log",
		os.O_CREATE|os.O_APPEND|os.O_WRONLY, os.ModePerm,
	)
	if err != nil {
		return nil, err
	}
	fileWriteSyncer := zapcore.Lock(zapcore.AddSync(file)) // 根据Lock函数的注释,使用锁保护一下，但是一般情况下不加锁也不会有问题
	fileCore := zapcore.NewCore(encoder, fileWriteSyncer, zap.NewAtomicLevelAt(zapcore.DebugLevel))

	// 实例化 Core: stdout WriteSyncer,日志级别为 Error
	stdoutWriteSyncer := zapcore.AddSync(os.Stdout)
	stdoutCore := zapcore.NewCore(encoder, stdoutWriteSyncer, zap.NewAtomicLevelAt(zapcore.ErrorLevel))

	// 合并 Core
	core := zapcore.NewTee(fileCore, stdoutCore)

	// 创建 *Logger
	logger := zap.New(core, zap.AddCaller(), zap.AddStacktrace(zapcore.ErrorLevel))

	return logger, nil
}

func main() {
	// 实例化Logger
	logger, err := NewZapLogger()
	if err != nil {
		panic(err)
	}
    defer logger.Sync()

	// 输出日志
	logger.Debug("Hello World!")
	logger.Info("Hello World!")
	logger.Warn("Hello World!")
	logger.Error("Hello World!")
	logger.Fatal("Hello World!") // Fatal执行后会退出程序
}
```

输出结果

```bash
# 终端日志
D:\application\GoLand\example>go run main.go
{"level":"error","ts":1674393081.3178294,"caller":"example/main.go:49","msg":"Hello World!","stacktrace":"main.main\n\tD:/application/GoLand/example/main.go:49\nruntime.main\n\tC:/Users/Administrator/sdk/go1.19.2/src/runtime/proc.go
:250"}
{"level":"fatal","ts":1674393081.31836,"caller":"example/main.go:50","msg":"Hello World!","stacktrace":"main.main\n\tD:/application/GoLand/example/main.go:50\nruntime.main\n\tC:/Users/Administrator/sdk/go1.19.2/src/runtime/proc.go:2
50"}
exit status 1

# 文件日志 test.log
{"level":"debug","ts":1674393081.3178294,"caller":"example/main.go:46","msg":"Hello World!"}
{"level":"info","ts":1674393081.3178294,"caller":"example/main.go:47","msg":"Hello World!"}
{"level":"warn","ts":1674393081.3178294,"caller":"example/main.go:48","msg":"Hello World!"}
{"level":"error","ts":1674393081.3178294,"caller":"example/main.go:49","msg":"Hello World!","stacktrace":"main.main\n\tD:/application/GoLand/example/main.go:49\nruntime.main\n\tC:/Users/Administrator/sdk/go1.19.2/src/runtime/proc.go:250"}
{"level":"fatal","ts":1674393081.31836,"caller":"example/main.go:50","msg":"Hello World!","stacktrace":"main.main\n\tD:/application/GoLand/example/main.go:50\nruntime.main\n\tC:/Users/Administrator/sdk/go1.19.2/src/runtime/proc.go:250"}

```

:::

<br />

## 日志切割方案

lumberjack：[https://github.com/natefinch/lumberjack](https://github.com/natefinch/lumberjack)

::: details 点击查看完整代码

**安装**

```bash
go get gopkg.in/natefinch/lumberjack.v2
```

**示例**

```go
package main

import (
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
	"gopkg.in/natefinch/lumberjack.v2"
	"os"
	"strconv"
)

// NewZapLogger 创建zap logger
func NewZapLogger() (*zap.Logger, error) {
	// 实例化 Encoder
	encoderConfig := zap.NewProductionEncoderConfig()
	encoder := zapcore.NewJSONEncoder(encoderConfig)

	// 实例化 Core: file WriteSyncer，日志级别为 Debug
	lumberJackLogger := &lumberjack.Logger{
		Filename:   "test.log", // 日志文件
		MaxSize:    1,          // 日志文件的最大大小(单位为MB)
		MaxAge:     180,        // 保留旧文件的最大时长(单位为天)
		MaxBackups: 10,         // 保留旧文件的最大个数
		LocalTime:  true,       // 旧文件名使用本地时间,建议为true
		Compress:   true,       // 是否压缩旧文件
	}
	fileWriteSyncer := zapcore.Lock(zapcore.AddSync(lumberJackLogger)) // 根据Lock函数的注释,使用锁保护一下，但是一般情况下不加锁也不会有问题
	fileCore := zapcore.NewCore(encoder, fileWriteSyncer, zap.NewAtomicLevelAt(zapcore.DebugLevel))

	// 实例化 Core: stdout WriteSyncer,日志级别为 Error
	stdoutWriteSyncer := zapcore.AddSync(os.Stdout)
	stdoutCore := zapcore.NewCore(encoder, stdoutWriteSyncer, zap.NewAtomicLevelAt(zapcore.ErrorLevel))

	// 合并 Core
	core := zapcore.NewTee(fileCore, stdoutCore)

	// 创建 *Logger
	logger := zap.New(core, zap.AddCaller(), zap.AddStacktrace(zapcore.ErrorLevel))

	return logger, nil
}

func main() {
	// 实例化Logger
	logger, err := NewZapLogger()
	if err != nil {
		panic(err)
	}
    defer logger.Sync()

	// 输出日志
	for i := 0; i < 100000; i++ {
		logger.Info(strconv.Itoa(i))
	}
}
```

输出结果

![image-20230122213135390](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230122213135390.png)

未压缩情况下

![image-20230122213312312](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20230122213312312.png)

:::