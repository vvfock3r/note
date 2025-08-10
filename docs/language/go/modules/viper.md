# Viper

Github：[https://github.com/spf13/viper](https://github.com/spf13/viper)

## 安装

```bash
go get github.com/spf13/viper
```

<br />

## 从文件中读取配置

### 1）单路径搜索

:::tip

以下代码会从**当前目录**下读取`config.yaml`文件，当前目录指得是：

执行命令时所在的目录，而不是命令所在的目录，所以也就意味着当执行命令时，我们的配置文件是非固定的，随着执行目录变化而变化

:::

::: details 点击查看完整代码

`config.yaml`

```yaml
database:
  driver: mysql
  host: 127.0.0.1
  port: 3306
  username: blog
  dbname: blog
  password: 123456
```

`main.go`

```go
package main

import (
	"fmt"
	"github.com/spf13/viper"
	"log"
)

func main() {
	// 设置配置文件路径
	viper.SetConfigFile("config.yaml")

	// 读取配置文件
	if err := viper.ReadInConfig(); err != nil {
		log.Fatalln(err)
	}

	// 获取值
	fmt.Println(viper.Get("database.port"))
}
```

输出结果

```bash
3306
```

:::

<br />

### 2）多路径搜索

::: details 避坑指南

`config.json`（当前项目目录下）

```json
{
  "database": {
    "port": 3307
  }
}
```

`/etc/config.yaml`

```yaml
database:
  driver: mysql
  host: 127.0.0.1
  port: 3306
  username: blog
  dbname: blog
  password: 123456
```

`main.go`

```go
package main

import (
	"fmt"
	"github.com/spf13/viper"
	"log"
)

func main() {
	// 设置配置文件
	viper.SetConfigName("config")
	viper.SetConfigType("yaml")
    
	// 添加搜索路径，按添加顺序搜索
	viper.AddConfigPath(".")           // 首先添加当前目录，默认不会搜索当前目录
	viper.AddConfigPath("$HOME/.demo") // 其次添加家目录
	viper.AddConfigPath("/etc")        // 最后添加etc目录

	// 读取配置文件
	if err := viper.ReadInConfig(); err != nil {
		log.Fatalln(err)
	}

	// 获取值
	fmt.Println(viper.Get("database.port"))
	fmt.Println("当前正在使用的配置文件: ", viper.ConfigFileUsed())
}
```

**输出结果**

```bash
3307
当前正在使用的配置文件:  /root/demo/config.json
```

<br />

**发现问题**

我们指定了YAML格式的配置文件，怎么读取到`config.json`了？



**查看相关源码**

```go
// SetConfigType sets the type of the configuration returned by the
// remote source, e.g. "json".
// 上面的意思是：指定远程配置文件的类型，比如从etcd、consul等读取配置，而我们想当然的认为指定的是扩展名是错误的
func SetConfigType(in string) { v.SetConfigType(in) }

func (v *Viper) SetConfigType(in string) {
	if in != "" {
		v.configType = in
	}
}

// 查看路径搜索源码
var SupportedExts = []string{"json", "toml", "yaml", "yml", "properties", "props", "prop", "hcl", "tfvars", "dotenv", "env", "ini"}
var SupportedRemoteProviders = []string{"etcd", "etcd3", "consul", "firestore"}

func (v *Viper) searchInPath(in string) (filename string) {
	v.logger.Debug("searching for config in path", "path", in)
	for _, ext := range SupportedExts {
		v.logger.Debug("checking if file exists", "file", filepath.Join(in, v.configName+"."+ext))
        // 【 路径 + configName + "." + 扩展名 】 组成的配置文件，一旦找到便返回
		if b, _ := exists(v.fs, filepath.Join(in, v.configName+"."+ext)); b {
			v.logger.Debug("found file", "file", filepath.Join(in, v.configName+"."+ext))
			return filepath.Join(in, v.configName+"."+ext)
		}
	}

    // 当configType不为空时，且 【路径+configName】存在时，则返回【路径+configName】
	if v.configType != "" {
		if b, _ := exists(v.fs, filepath.Join(in, v.configName)); b {
			return filepath.Join(in, v.configName)
		}
	}

	return ""
}
```

**解决办法1**

```go
// 配置文件指定上扩展名，同时设置配置文件类型，这样就走上面的第二段代码，返回 【路径 + 配置文件】
viper.SetConfigName("config.yaml")
viper.SetConfigType("yaml")

// 这个代码看起来有点奇怪
```

**解决办法2**

```go
// 指定真正所使用的扩展名，可以写一个或多个，前面的扩展名优先被匹配
viper.SetConfigName("config")
viper.SupportedExts = []string{"yaml"}
```

**修正完以后查看输出结果**

```bash
3306
当前正在使用的配置文件:  /etc/config.yaml
```

:::

<br />

### 3）设置默认值

::: details 点击查看完整代码

```go
package main

import (
        "fmt"
        "github.com/spf13/viper"
        "log"
)

func main() {
        // 设置配置文件
        viper.SetConfigName("config")
        viper.SupportedExts = []string{"yaml"}

        // 添加搜索路径，按添加顺序搜索
        viper.AddConfigPath(".")
        viper.AddConfigPath("$HOME/.demo")
        viper.AddConfigPath("/etc")

        // 设置默认值, database.port1是一个不存在的key
        viper.SetDefault("database.port1", "12345")

        // 读取配置文件
        if err := viper.ReadInConfig(); err != nil {
                log.Fatalln(err)
        }

        // 获取值
        fmt.Println(viper.Get("database.port1"))
        fmt.Println("当前正在使用的配置文件: ", viper.ConfigFileUsed())
}
```

:::

输出结果

```bash
[root@localhost demo]# go run main.go
12345
当前正在使用的配置文件:  /etc/config.yaml
```

<br />

### 4）实时读取配置

::: details 点击查看完整代码

```go
package main

import (
        "fmt"
        "github.com/fsnotify/fsnotify"
        "github.com/spf13/viper"
        "log"
        "time"
)

func main() {
        // 设置配置文件
        viper.SetConfigName("config")
        viper.SupportedExts = []string{"yaml"}

        // 添加搜索路径，按添加顺序搜索
        viper.AddConfigPath(".")
        viper.AddConfigPath("$HOME/.demo")
        viper.AddConfigPath("/etc")

        // 读取配置文件
        if err := viper.ReadInConfig(); err != nil {
                log.Fatalln(err)
        }

        // 监听配置文件变化，需要注意的是：
        // 1）一旦找到某个配置文件，只会监听这一个配置文件，对它进行改名等也不会自动寻找其他配置文件
        // 2)对已经读取过的配置文件改名，不会影响到继续读取配置
        viper.OnConfigChange(func(e fsnotify.Event) {
                fmt.Println("Config file changed:", e.Name)
        })
        viper.WatchConfig()

        // 获取值
        for {
                fmt.Println(viper.Get("database.port"))
                time.Sleep(time.Second)
        }
}
```

:::

输出结果

```bash
[root@localhost demo]# go run main.go
3306
3306
3306
3306
Config file changed: /etc/config.yaml
Config file changed: /etc/config.yaml
3308
3308
3308
```

<br />

### 5）写入配置文件

::: details WriteConfigAs / SafeWriteConfigAs

```go
package main

import (
	"github.com/spf13/viper"
	"log"
)

var err error

func main() {
	viper.Set("Host", "127.0.0.1")
	viper.Set("Port", 80)
	viper.Set("UserName", "root")
	viper.Set("Password", "qaz.123")

	// 覆盖写入配置文件（若配置文件存在会覆盖）
	err = viper.WriteConfigAs("./a.yaml")
	if err != nil {
		log.Fatalln("[ 1 ] " + err.Error())
	}

	// 安全写入配置文件（若配置文件存在会报错）
	err = viper.SafeWriteConfigAs("./a.yaml")
	if err != nil {
		log.Fatalln("[ 2 ] " + err.Error())
	}
}
```

输出结果

```bash
2022/09/04 16:04:02 [ 2 ] Config File "./a.yaml" Already Exists
```

:::

::: details WriteConfig/ SafeWriteConfig

`config.yaml`

```yaml
database:
    dbname: blog
    host: 192.168.100.20
    password: qaz.123
    port: 3306
    username: root
```

`main.go`

```go
package main

import (
	"github.com/spf13/viper"
	"log"
)

var err error

func main() {
	// 设置配置文件
	viper.SetConfigName("config")
    viper.SupportedExts = []string{"yaml"}
	viper.AddConfigPath(".")
	viper.AddConfigPath("$HOME")

	// 读取配置文件
	if err := viper.ReadInConfig(); err != nil {
		log.Fatalln(err)
	}

	// 设置新的值
	viper.Set("database.port", 12345)

	// 覆盖写入配置文件
	err = viper.WriteConfig()
	if err != nil {
		log.Fatalln("[ 1 ] " + err.Error())
	}

	// 安全写入配置文件
	err = viper.SafeWriteConfig()
	if err != nil {
		log.Fatalln("[ 2 ] " + err.Error())
	}
}
```

输出结果

```bash
2022/09/04 16:09:04 [ 2 ] Config File "C:\\Users\\Administrator\\GolandProjects\\demo\\config.yaml" Already Exists
```

:::

<br />

## 从其他位置读取配置

### 1）io.Reader

::: details 点击查看完整代码

```go
package main

import (
	"bytes"
	"fmt"
	"github.com/spf13/viper"
	"log"
)

func main() {
	// 设置配置
	viper.SetConfigType("yaml")
	var yamlExample = []byte(`
Hacker: true
name: steve
hobbies:
- skateboarding
- snowboarding
- go
clothing:
  jacket: leather
  trousers: denim
age: 35
eyes : brown
beard: true
`)

	// 读取配置
	if err := viper.ReadConfig(bytes.NewBuffer(yamlExample)); err != nil {
		log.Fatalln(err)
	}

	// 获取值
	fmt.Println(viper.Get("name"))
}
```

输出结果

```bash
steve
```

:::

<br />

### 2）环境变量

说明：

* `viper`并不会直接读取环境变量，而是会用到一个中间变量，我们大多数都在操作这个中间变量
* 1个中间变量可以对应1个或多个环境变量
* 环境变量不区分大小写

::: details SetEnvPrefix 和 BindEnv

```go
package main

import (
	"fmt"
	"github.com/spf13/viper"
	"log"
	"os"
)

func main() {
	// 设置环境变量
	if err := os.Setenv("ID", "12"); err != nil {
		log.Fatalln(err)
	}
	if err := os.Setenv("SPF_ID", "13"); err != nil {
		log.Fatalln(err)
	}
	if err := os.Setenv("TEST_ID", "15"); err != nil {
		log.Fatalln(err)
	}

	// ------------------------------------------------------------------
	// 设置环境变量前缀,如果多次设置后面的会覆盖前面的
	viper.SetEnvPrefix("spf")

	// 提供了一个参数(中间变量)，这会组合出环境变量，格式是:
	//   设置了前缀的情况下: 前缀_中间变量,即 SPF_ID
	//   未设置前缀的情况下: 中间变量，即ID
	if err := viper.BindEnv("id"); err != nil {
		log.Fatalln(err)
	}

	// ------------------------------------------------------------------

	// 提供两个或多个参数，中间变量、环境变量...
	if err := viper.BindEnv("id", "TEST_ID"); err != nil {
		log.Fatalln(err)
	}

	// ------------------------------------------------------------------

	// 获取值（中间变量）
	fmt.Println(viper.Get("id"))
}
```

输出结果

```bash
13
```

:::

::: details SetEnvPrefix 和 AutomaticEnv

```go
package main

import (
	"fmt"
	"github.com/spf13/viper"
	"log"
	"os"
)

func main() {
	// 设置环境变量
	if err := os.Setenv("ID", "12"); err != nil {
		log.Fatalln(err)
	}
	if err := os.Setenv("SPF_ID", "13"); err != nil {
		log.Fatalln(err)
	}
	if err := os.Setenv("TEST_ID", "15"); err != nil {
		log.Fatalln(err)
	}

	// ------------------------------------------------------------------
	// 设置环境变量前缀,如果多次设置后面的会覆盖前面的
	viper.SetEnvPrefix("spf")

	// 自动匹配
	// 1) 若设置了前缀，匹配规则: 前缀_中间变量
	// 2) 若没有设置前缀，匹配规则：中间变量
	viper.AutomaticEnv()

	// ------------------------------------------------------------------

	// 获取值（中间变量）
	fmt.Println(viper.Get("id"))
}
```

输出结果

```bash
13
```

:::

<br />

### 3）命令行

::: details 点击查看完整代码

`main.go`

```go
package main

import (
	"demo/cmd"
	"fmt"
	"github.com/spf13/viper"
)

func main() {
	cmd.Execute()
	fmt.Println("[ Viper ] Host: ", viper.Get("host"))
	fmt.Println("[ Viper ] Port: ", viper.Get("port"))
}
```

`cmd/cobra.go`

```go
package cmd

import (
	"fmt"
	"github.com/spf13/cobra"
	"github.com/spf13/viper"
	"log"
	"os"
)

var (
	Host string
	Port string
)

var rootCmd = &cobra.Command{
	Use:   "demo",
	Short: "Short message",
	Long:  `Long message`,

	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("[ root ] Run")
		fmt.Println("[ root ] Host:", Host)
		fmt.Println("[ root ] Port:", Port)
	},
}

func init() {
	rootCmd.Flags().StringVarP(&Host, "host", "", "1.1.1.1", "host")
	rootCmd.Flags().StringVarP(&Port, "port", "", "80", "port")

	// 绑定配置
	if err := viper.BindPFlag("host", rootCmd.Flags().Lookup("host")); err != nil {
		log.Fatalln(err)
	}
	if err := viper.BindPFlag("port", rootCmd.Flags().Lookup("port")); err != nil {
		log.Fatalln(err)
	}
	viper.SetDefault("host", "127.0.0.1")
}

func Execute() {
	if err := rootCmd.Execute(); err != nil {
		fmt.Fprintf(os.Stderr, err.Error())
		os.Exit(1)
	}
}
```

:::

输出结果

```bash
C:\Users\Administrator\GolandProjects\demo>go run main.go --host 192.168.1.1 --port 12345
[ root ] Run
[ root ] Host: 192.168.1.1  
[ root ] Port: 12345        
[ Viper ] Host:  192.168.1.1
[ Viper ] Port:  12345

C:\Users\Administrator\GolandProjects\demo>go run main.go                   
[ root ] Run
[ root ] Host: 1.1.1.1
[ root ] Port: 80
[ Viper ] Host:  127.0.0.1
[ Viper ] Port:  80
```

<br />

## 优先级

按照优先级**从高到底**排序：

1. `viper.Set(key string, value interface{})`设置的值
2. **命令行**（`Flag`）中读取的值
3. **环境变量**中读取的值
4. **配置文件**中读取的值
5. **远程Key/Value存储**中读取的值
6. **默认值**

<br />

## 获取值

### 1）Get*系列函数

（1）自动转换类型

若key存在则返回value，自动转为合适的类型，比如值为80会转为int类型，true会转为bool类型

若key不存在则会返回nil，类型也为nil

- `Get(key string) : interface{}`

<br />

（2）返回指定的类型

若key存在，若value能转为对应类型则返回，若不能转为对应类型则返回零值

若key不存在则返回零值

- `GetBool(key string) : bool`
- `GetFloat64(key string) : float64`
- `GetInt(key string) : int`
- `GetIntSlice(key string) : []int`
- `GetString(key string) : string`
- `GetStringMap(key string) : map[string]interface{}`
- `GetStringMapString(key string) : map[string]string`
- `GetStringSlice(key string) : []string`
- `GetTime(key string) : time.Time`
- `GetDuration(key string) : time.Duration`

<br />

（3）`viper.IsSet`检查key是否存在，但是它并不会检查cobra设置的默认值，除非我们再使用`viper.SetDefault`显式设置一遍

- `IsSet(key string) : bool`

<br />

获取所有配置

- `AllSettings() : map[string]interface{}`

::: details 点击查看完整代码

`main.go`

```go
package main

import (
	"demo/cmd"
	"fmt"
	"github.com/spf13/viper"
)

func main() {
	cmd.Execute()

	// Get获取Key
	fmt.Println("Get | Key  存在:",
		fmt.Sprint(viper.Get("host")),
		fmt.Sprintf("%T", viper.Get("host")),
	)
	fmt.Println("Get | Key不存在:",
		fmt.Sprint(viper.Get("non-key")),
		fmt.Sprintf("%T", viper.Get("non-key")),
	)
	fmt.Println()

	// GetInt获取Key
	fmt.Println("GetInt | Key  存在 | Value为Int类型   :",
		fmt.Sprint(viper.GetInt("port")),
		fmt.Sprintf("%T", viper.GetInt("port")),
	)
	fmt.Println("GetInt | Key  存在 | Value为String类型:",
		fmt.Sprint(viper.GetInt("host")),
		fmt.Sprintf("%T", viper.GetInt("host")),
	)
	fmt.Println("GetInt | Key不存在                    :",
		fmt.Sprint(viper.GetInt("non-key")),
		fmt.Sprintf("%T", viper.GetInt("non-key")),
	)
	fmt.Println()

	// IsSet检测Key是否显示设置
	//   viper.Set/SetDefault设置的值	返回true
	//   通过命令行传递的值				返回true
	//   通过cobra设置的默认值				返回false
	fmt.Println("IsSet | Key  存在:", viper.IsSet("verbose"))
	fmt.Println("IsSet | Key不存在:", viper.IsSet("non-key"))
	fmt.Println()

	// 获取所有配置
	fmt.Println("AllSettings: ")
	for k, v := range viper.AllSettings() {
		fmt.Print(k, "  ==>  ", v)
		fmt.Println()
	}
}
```

`cmd/cobra.go`

```go
package cmd

import (
	"fmt"
	"github.com/spf13/cobra"
	"github.com/spf13/viper"
	"log"
	"os"
)

var (
	Host    string
	Port    int
	Verbose bool
)

var rootCmd = &cobra.Command{
	Use:   "demo",
	Short: "Short message",
	Long:  `Long message`,

	Run: func(cmd *cobra.Command, args []string) {
	},
}

func init() {
	rootCmd.Flags().StringVarP(&Host, "host", "", "127.0.0.1", "host")
	rootCmd.Flags().IntVarP(&Port, "port", "", 80, "port")
	rootCmd.Flags().BoolVarP(&Verbose, "verbose", "", true, "verbose")

	// 绑定配置（若未配置会自动使用上面的默认值）
	if err := viper.BindPFlag("host", rootCmd.Flags().Lookup("host")); err != nil {
		log.Fatalln(err)
	}
	if err := viper.BindPFlag("port", rootCmd.Flags().Lookup("port")); err != nil {
		log.Fatalln(err)
	}
	if err := viper.BindPFlag("verbose", rootCmd.Flags().Lookup("verbose")); err != nil {
		log.Fatalln(err)
	}

	// 这里设置与否，viper都能正确获取到值
	// 如果没有设置这里，并且命令行不传对应选项的话，使用viper.IsSet会返回false
	//viper.SetDefault("host", rootCmd.Flags().Lookup("host").Value)
	//viper.SetDefault("port", rootCmd.Flags().Lookup("port").Value)
	//viper.SetDefault("verbose", rootCmd.Flags().Lookup("verbose").Value)
}

func Execute() {
	if err := rootCmd.Execute(); err != nil {
		fmt.Fprintf(os.Stderr, err.Error())
		os.Exit(1)
	}
}
```

输出结果

```bash
# 直接执行
C:\Users\Administrator\GolandProjects\demo>go run main.go
Get | Key  存在: 127.0.0.1 string
Get | Key不存在: <nil> <nil>

GetInt | Key  存在 | Value为Int类型    : 80 int
GetInt | Key  存在 | Value为String类型 : 0 int   # !
GetInt | Key不存在                    : 0 int

IsSet | Key  存在: false # !
IsSet | Key不存在: false

AllSettings:
host  ==>  127.0.0.1
port  ==>  80
verbose  ==>  true

# 传递参数
C:\Users\Administrator\GolandProjects\demo>go run main.go --verbose       
Get | Key  存在: 127.0.0.1 string
Get | Key不存在: <nil> <nil>

GetInt | Key  存在 | Value为Int类型   : 80 int
GetInt | Key  存在 | Value为String类型: 0 int
GetInt | Key不存在                    : 0 int

IsSet | Key  存在: true  # !
IsSet | Key不存在: false

AllSettings:
verbose  ==>  true
host  ==>  127.0.0.1
port  ==>  80
```

:::

<br />

### 2）提取子树

::: details （1）从配置文件中读取的配置，提取子树非常流畅

`config.yaml`

```yaml
cache:
  cache1:
    max-items: 100
    item-size: 64
  cache2:
    max-items: 200
    item-size: 80
```

`main.go`

```go
package main

import (
	"fmt"
	"github.com/spf13/viper"
	"log"
)

func main() {
	// 设置配置文件
	viper.SetConfigFile("config.yaml")

	// 读取配置文件
	if err := viper.ReadInConfig(); err != nil {
		log.Fatalln(err)
	}

	// 提取子树
	vp := viper.Sub("cache.cache2")  // 返回*viper实例
	fmt.Println(vp.Get("max-items"))
}
```

输出结果

```bash
200
```

:::

::: details （2）从命令行读取的配置，不支持提取子树

举例待补充

:::

<br />

### 3）解码到结构体

:::tip

只会解码一致的部分

:::

::: details 点击查看详情

`config.yaml`

```yaml
database:
  host: 192.168.100.20
  port: 3306
  username: root
  password: qaz.123
  dbname: blog
```

`main.go`

```go
package main

import (
	"fmt"
	"github.com/spf13/viper"
	"log"
)

type Config struct {
	Host     string
	Port     int
	Username string
	Password string
	Dbname   string
}

func main() {
	// 设置配置文件
	viper.SetConfigFile("config.yaml")

	// 读取配置文件
	if err := viper.ReadInConfig(); err != nil {
		log.Fatalln(err)
	}

	// 映射到结构体，注意：结构体首字母需要大写
	var config Config
	if err := viper.Sub("database").Unmarshal(&config); err != nil {
		log.Fatalln(err)
	}
	fmt.Println(config.Host)
	fmt.Println(config.Port)
	fmt.Println(config.Username)
	fmt.Println(config.Password)
	fmt.Println(config.Dbname)
}
```

输出结果

```bash
192.168.100.20
3306   
root   
qaz.123
blog
```

:::

<br />

### 4）自定义解码

待补充