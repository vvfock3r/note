# air

Github：[https://github.com/cosmtrek/air](https://github.com/cosmtrek/air)

<br />

## 安装

**方式一：使用go install安装**

```bash
# 直接使用go install安装后查看不了版本号，需要通过-ldflags注入
go install github.com/cosmtrek/air@v1.40.4

# 查看版本
air -v

  __    _   ___
 / /\  | | | |_)
/_/--\ |_| |_| \_ , built with Go
```

**方式二：直接下载二进制（推荐）**

```bash
# 推荐到Github下载编译好的二进制文件
air -v

  __    _   ___
 / /\  | | | |_)
/_/--\ |_| |_| \_ 1.40.4, built with Go 1.18.3
```

<br />

## 基础使用

直接执行`air`即可，它会监听当前目录下的文件，当文件发生改变后会重新编译代码并运行

这样使用虽然方便，但是定制性很差，更好的方式是：使用配置文件来控制`air`的各项参数

![image-20220925144449681](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220925144449681.png)

<br />

## 配置文件

::: details （1）生成默认的配置文件

```bash
D:\application\GoLand\demo>air init

  __    _   ___
 / /\  | | | |_)
/_/--\ |_| |_| \_ 1.40.4, built with Go 1.18.3

.air.toml file created to the current directory with the default settings
```

:::

::: details （2）默认配置文件 .air.toml 参数说明

```toml
# 工作目录设置（无须修改）
root = "."                # 根目录
testdata_dir = "testdata" # 测试数据目录
tmp_dir = "tmp"           # 临时目录

# 编译设置（根据实际情况修改）
[build]
  args_bin = []                                          # 二进制命令执行时跟的参数列表
  bin = "tmp\\main.exe"                                  # 编译出的二进制命令
  cmd = "go build -o ./tmp/main.exe ."                   # 编译
  delay = 1000                                           # 指定编译延迟时间(单位毫秒)，适用于文件频繁更改的情况（根据实际情况修改）
  exclude_dir = ["assets", "tmp", "vendor", "testdata"]  # 排除监听的目录
  exclude_file = []                                      # 排除监听的文件
  exclude_regex = ["_test.go"]                           # 排除监听的文件(使用正则表达式)
  exclude_unchanged = false                              # 排除未更改的文件
  follow_symlink = false                                 # 跟随符号连接
  full_bin = ""                                          #
  include_dir = []                                       # 监听的目录
  include_ext = ["go", "tpl", "tmpl", "html"]            # 监听的扩展名文件（根据实际情况修改）
  kill_delay = "0s"                                      #
  log = "build-errors.log"                               # 日志文件
  send_interrupt = false                                 #
  stop_on_error = true                                   # 编译错误时停止旧的二进制命令

# 颜色配置（根据个人喜好修改）
[color]
  app = ""
  build = "yellow"
  main = "magenta"
  runner = "green"
  watcher = "cyan"

[log]
  time = false              # 日志记录中输出时间（推荐开启）

[misc]
  clean_on_exit = false     # air退出时清理临时文件或目录（推荐开启）

[screen]
  clear_on_rebuild = false  # 重新构建前先清屏（根据个人喜好修改）
```

:::

::: details （3）自定义配置

```toml
# This is the default configuration file of air v1.40.4 and is modified
root = "."
testdata_dir = "testdata"
tmp_dir = "tmp"

[build]
  args_bin = []
  bin = "tmp\\main.exe"
  cmd = "go build -o ./tmp/main.exe ."
  delay = 0                                                 # modified
  exclude_dir = ["assets", "tmp", "vendor", "testdata"]
  exclude_file = []
  exclude_regex = ["_test.go"]
  exclude_unchanged = false
  follow_symlink = false
  full_bin = ""
  include_dir = []
  include_ext = ["go", "tpl", "tmpl", "html", "yaml", "yml"]  # modified
  kill_delay = "0s"
  log = "build-errors.log"
  send_interrupt = false
  stop_on_error = true

[color]
  app = ""
  build = "yellow"
  main = "magenta"
  runner = "green"
  watcher = "cyan"

[log]
  time = true                  # modified

[misc]
  clean_on_exit = true         # modified

[screen]
  clear_on_rebuild = false
```

:::