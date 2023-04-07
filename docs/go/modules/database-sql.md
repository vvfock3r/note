# database/sql

## 必读说明

数据库接口：

* `database/sql` 是 Go 语言标准库中的一个包，提供了一组通用的接口、类型和方法等

* `sqlx` 是一个在 `database/sql` 包的基础上封装的库，提供了一些更高级的功能和便利的接口

数据库驱动：

* `go-sql-driver/mysql` 是一个第三方的`MySQL`驱动程序，实现了 `database/sql` 包所定义的接口

<br />

## 参考资料

Go SQL接口说明：[https://github.com/golang/go/wiki/SQLInterface](https://github.com/golang/go/wiki/SQLInterface)

Go SQL驱动列表：[https://github.com/golang/go/wiki/SQLDrivers](https://github.com/golang/go/wiki/SQLDrivers)

**database/sql**

* 文档：[https://pkg.go.dev/database/sql](https://pkg.go.dev/database/sql)

**sqlx**

* 文档：[https://pkg.go.dev/github.com/jmoiron/sqlx](https://pkg.go.dev/github.com/jmoiron/sqlx)
* Github：[https://github.com/jmoiron/sqlx](https://github.com/jmoiron/sqlx)

**go-sql-driver/mysql**

* 文档：[https://pkg.go.dev/github.com/go-sql-driver/mysql](https://pkg.go.dev/github.com/go-sql-driver/mysql)
* Github：[https://github.com/go-sql-driver/mysql](https://github.com/go-sql-driver/mysql)

<br />

## 安装依赖

```bash
go get github.com/jmoiron/sqlx
go get github.com/go-sql-driver/mysql
```

<br />

## 连接

### 连接示例

::: details （1）database/sql连接MySQL

```go
package main

import (
	"database/sql"
	"fmt"
	"time"

	"github.com/go-sql-driver/mysql"
)

// ConnMySQL 连接数据库
func ConnMySQL() (*sql.DB, error) {
	// 定义MySQL配置
	mysqlConfig := mysql.Config{
		User:                 "root",
		Passwd:               "QiNqg[l.%;H>>rO9",
		Net:                  "tcp",
		Addr:                 "192.168.48.151:3306",
		DBName:               "demo",
		Collation:            "utf8mb4_general_ci", // 设置字符集和排序规则
		Loc:                  time.Local,           // 设置连接时使用的时区,默认为UTC时区
		ParseTime:            true,                 // 是否将数据库中的TIME或DATETIME字段解析为Go的时间类型（即time.Time)
		Timeout:              5 * time.Second,      // 连接超时时间
		ReadTimeout:          30 * time.Second,     // 读取超时时间
		WriteTimeout:         30 * time.Second,     // 写入超时时间
		CheckConnLiveness:    true,                 // 在使用连接之前检查其存活性
		AllowNativePasswords: true,                 // 允许MySQL身份认证插件mysql_native_password
        MaxAllowedPacket:     16 << 20,             // 控制客户端向MySQL服务器发送的最大数据包大小, 16 MiB
	}

	// 连接数据库
	db, err := sql.Open("mysql", mysqlConfig.FormatDSN())
	if err != nil {
		return nil, err
	}

	// 验证连接是否有效
	if err := db.Ping(); err != nil {
		return nil, err
	}

	return db, nil
}

func main() {
	// 连接数据库
	db, err := ConnMySQL()
	if err != nil {
		panic(err)
	}
	defer func() { _ = db.Close() }()

	// 查看数据库版本
	var version string
	err = db.QueryRow("SELECT CONCAT_WS(' ', @@version, @@version_comment)").Scan(&version)
	if err != nil {
		panic(err)
	}
	fmt.Println(version)
}
```

:::

::: details （2）sqlx连接MySQL

```go
package main

import (
	"fmt"
	"time"

	"github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
)

// ConnMySQL 连接数据库
func ConnMySQL() (*sqlx.DB, error) {
	// 定义MySQL配置
	mysqlConfig := mysql.Config{
		User:                 "root",
		Passwd:               "QiNqg[l.%;H>>rO9",
		Net:                  "tcp",
		Addr:                 "192.168.48.151:3306",
		DBName:               "demo",
		Collation:            "utf8mb4_general_ci", // 设置字符集和排序规则
		Loc:                  time.Local,           // 设置连接时使用的时区,默认为UTC时区
		ParseTime:            true,                 // 是否将数据库中的TIME或DATETIME字段解析为Go的时间类型（即time.Time)
		Timeout:              5 * time.Second,      // 连接超时时间
		ReadTimeout:          30 * time.Second,     // 读取超时时间
		WriteTimeout:         30 * time.Second,     // 写入超时时间
		CheckConnLiveness:    true,                 // 在使用连接之前检查其存活性
		AllowNativePasswords: true,                 // 允许MySQL身份认证插件mysql_native_password
        MaxAllowedPacket:     16 << 20,             // 控制客户端向MySQL服务器发送的最大数据包大小, 16 MiB
	}

	// 连接数据库
	// sqlx.Connect = sqlx.Open + db.Ping,也可以使用 sql.MustConnect, 连接不成功就panic
	return sqlx.Connect("mysql", mysqlConfig.FormatDSN())
}

func main() {
	// 连接数据库
	db, err := ConnMySQL()
	if err != nil {
		panic(err)
	}
	defer func() { _ = db.Close() }()

	// 查看数据库版本 - 兼容database/sql
	{
		var version string
		err = db.QueryRow("SELECT CONCAT_WS(' ', @@version, @@version_comment)").Scan(&version)
		if err != nil {
			panic(err)
		}
		fmt.Println(version)
	}

	// 查看数据库版本 - sqlx特有的查询方式,其内部本质也是 QueryRow + Scan 的方式
	{
		var version string
		err = db.Get(&version, "SELECT CONCAT_WS(' ', @@version, @@version_comment)")
		if err != nil {
			panic(err)
		}
		fmt.Println(version)
	}
}
```

输出结果

```bash
8.0.30 MySQL Community Server - GPL
8.0.30 MySQL Community Server - GPL
```

:::

<br />

### 简单分析

::: details （1）MySQL 驱动注册逻辑

```go
// github.com/go-sql-driver/mysql init方法用于注册驱动
func init() {
	sql.Register("mysql", &MySQLDriver{})
}

// database/sql包提供的注册逻辑
var (
	driversMu sync.RWMutex
	drivers   = make(map[string]driver.Driver)
)

func Register(name string, driver driver.Driver) {
	driversMu.Lock()
	defer driversMu.Unlock()
	if driver == nil {
		panic("sql: Register driver is nil")
	}
	if _, dup := drivers[name]; dup {
		panic("sql: Register called twice for driver " + name)
	}
	drivers[name] = driver
}

// driver.Driver接口, name就是注册时的name
type Driver interface {
	Open(name string) (Conn, error)
}
```

:::

::: details （2）sql.Open函数

```go
func Open(driverName, dataSourceName string) (*DB, error) {
    // 查找驱动
	driversMu.RLock()
	driveri, ok := drivers[driverName]
	driversMu.RUnlock()
	if !ok {
		return nil, fmt.Errorf("sql: unknown driver %q (forgotten import?)", driverName)
	}

    // 调用 OpenConnector，然后将返回值作为OpenDB的参数，最后返回一个*DB结构体
	if driverCtx, ok := driveri.(driver.DriverContext); ok {
		connector, err := driverCtx.OpenConnector(dataSourceName)
		if err != nil {
			return nil, err
		}
		return OpenDB(connector), nil
	}

	return OpenDB(dsnConnector{dsn: dataSourceName, driver: driveri}), nil
}
```

:::

::: details （3）sqlx.Connect函数

```go
// Connect内部调用了Open和Ping函数
// 注意这里的Open并不是sql.Open
func Connect(driverName, dataSourceName string) (*DB, error) {
	db, err := Open(driverName, dataSourceName)
	if err != nil {
		return nil, err
	}
	err = db.Ping()
	if err != nil {
		db.Close()
		return nil, err
	}
	return db, nil
}

// Open内部调用了sql.Open,然后对sql.DB做了一个简单的封装
// Open is the same as sql.Open, but returns an *sqlx.DB instead.
func Open(driverName, dataSourceName string) (*DB, error) {
	db, err := sql.Open(driverName, dataSourceName)
	if err != nil {
		return nil, err
	}
	return &DB{DB: db, driverName: driverName, Mapper: mapper()}, err
}
```

:::

<br />

### 连接池设置

::: details （1）设置最大打开的连接数：SetMaxOpenConns

```go
package main

import (
	"log"
	"sync"
	"time"

	"github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
)

// ConnMySQL 连接数据库
func ConnMySQL() (*sqlx.DB, error) {
	// 定义MySQL配置
	mysqlConfig := mysql.Config{
		User:                 "root",
		Passwd:               "QiNqg[l.%;H>>rO9",
		Net:                  "tcp",
		Addr:                 "192.168.48.151:3306",
		DBName:               "demo",
		Collation:            "utf8mb4_general_ci", // 设置字符集和排序规则
		Loc:                  time.Local,           // 设置连接时使用的时区,默认为UTC时区
		ParseTime:            true,                 // 是否将数据库中的TIME或DATETIME字段解析为Go的时间类型（即time.Time)
		Timeout:              5 * time.Second,      // 连接超时时间
		ReadTimeout:          30 * time.Second,     // 读取超时时间
		WriteTimeout:         30 * time.Second,     // 写入超时时间
		CheckConnLiveness:    true,                 // 在使用连接之前检查其存活性
		AllowNativePasswords: true,                 // 允许MySQL身份认证插件mysql_native_password
        MaxAllowedPacket:     16 << 20,             // 控制客户端向MySQL服务器发送的最大数据包大小, 16 MiB
	}

	// 连接数据库
	// sqlx.Connect = sqlx.Open + db.Ping,也可以使用 sql.MustConnect, 连接不成功就panic
	return sqlx.Connect("mysql", mysqlConfig.FormatDSN())
}

func main() {
	// 连接数据库
	db, err := ConnMySQL()
	if err != nil {
		panic(err)
	}
	defer func() { _ = db.Close() }()

	// 设置最大打开的连接数
	// 当 n <= 0时表示不限制打开的连接数,默认值为 0
	db.SetMaxOpenConns(2)

	// 当达到最大连接后，再去打开新连接，会阻塞，直到一段时间后仍旧获取不到连接则报超时错误
	var wg sync.WaitGroup
	for i := 0; i < 3; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			_, err := db.Exec("SELECT SLEEP(60);")
			if err != nil {
				log.Printf("Exec error: %#v\n", err)
			}
		}()
		time.Sleep(time.Second)
		log.Printf("%#v\n\n", db.Stats())
	}
	wg.Wait()
}
```

输出结果

```bash
2023/04/01 10:45:23 sql.DBStats{MaxOpenConnections:2, OpenConnections:1, InUse:1, Idle:0, WaitCount:0, WaitDuration:0, MaxIdleClosed:0, MaxIdleTimeClosed:0, MaxLifetimeClosed:0}

2023/04/01 10:45:24 sql.DBStats{MaxOpenConnections:2, OpenConnections:2, InUse:2, Idle:0, WaitCount:0, WaitDuration:0, MaxIdleClosed:0, MaxIdleTimeClosed:0, MaxLifetimeClosed:0}

2023/04/01 10:45:25 sql.DBStats{MaxOpenConnections:2, OpenConnections:2, InUse:2, Idle:0, WaitCount:1, WaitDuration:0, MaxIdleClosed:0, MaxIdleTimeClosed:0, MaxLifetimeClosed:0}

[mysql] 2023/04/01 10:45:52 packets.go:37: read tcp 192.168.48.1:55526->192.168.48.151:3306: i/o timeout
2023/04/01 10:45:52 Exec error: &errors.errorString{s:"invalid connection"}
[mysql] 2023/04/01 10:45:53 packets.go:37: read tcp 192.168.48.1:55527->192.168.48.151:3306: i/o timeout
2023/04/01 10:45:53 Exec error: &errors.errorString{s:"invalid connection"}
[mysql] 2023/04/01 10:46:22 packets.go:37: read tcp 192.168.48.1:55528->192.168.48.151:3306: i/o timeout
2023/04/01 10:46:22 Exec error: &errors.errorString{s:"invalid connection"}

# 分析
# 1、当达到最大连接后，再去打开新连接，会阻塞，直到一段时间后仍旧获取不到连接则报错 mysql.ErrInvalidConn
# 2、当我们将 SELECT SLEEP(60); 修改为 SELECT SLEEP(30); 甚至更低时，可以及时释放连接，不会报错
# 3、注意上面我们并没有考虑到MySQL可接收的最大连接数，可以通过 SHOW VARIABLES LIKE 'max_connections'; 查询
# 4、当达到MySQL最大连接数后会报错 &mysql.MySQLError{Number:0x410, SQLState:[5]uint8{0x0, 0x0, 0x0, 0x0, 0x0}, Message:"Too many connections"}

# 总结：为了提高性能，这个值应该尽量大一点，但并不是越大越好
```

:::

::: details （2）设置最大空闲的连接数：SetMaxIdleConns

```go
package main

import (
	"log"
	"sync"
	"time"

	"github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
)

// ConnMySQL 连接数据库
func ConnMySQL() (*sqlx.DB, error) {
	// 定义MySQL配置
	mysqlConfig := mysql.Config{
		User:                 "root",
		Passwd:               "QiNqg[l.%;H>>rO9",
		Net:                  "tcp",
		Addr:                 "192.168.48.151:3306",
		DBName:               "demo",
		Collation:            "utf8mb4_general_ci", // 设置字符集和排序规则
		Loc:                  time.Local,           // 设置连接时使用的时区,默认为UTC时区
		ParseTime:            true,                 // 是否将数据库中的TIME或DATETIME字段解析为Go的时间类型（即time.Time)
		Timeout:              5 * time.Second,      // 连接超时时间
		ReadTimeout:          30 * time.Second,     // 读取超时时间
		WriteTimeout:         30 * time.Second,     // 写入超时时间
		CheckConnLiveness:    true,                 // 在使用连接之前检查其存活性
		AllowNativePasswords: true,                 // 允许MySQL身份认证插件mysql_native_password
        MaxAllowedPacket:     16 << 20,             // 控制客户端向MySQL服务器发送的最大数据包大小, 16 MiB
	}

	// 连接数据库
	// sqlx.Connect = sqlx.Open + db.Ping,也可以使用 sql.MustConnect, 连接不成功就panic
	return sqlx.Connect("mysql", mysqlConfig.FormatDSN())
}

func main() {
	// 连接数据库
	db, err := ConnMySQL()
	if err != nil {
		panic(err)
	}
	defer func() { _ = db.Close() }()

	// 设置最大空闲的连接数
	// 如果 n <= 0，则不保留任何空闲连接
	// 如果 n >0，并且大于 MaxOpenConns，则 MaxIdleConns 减少到和MaxOpenConns一致
	// 默认值是2
	db.SetMaxIdleConns(10)

	// 开1000个连接，然后等待查询执行完成后，再查看剩余(空闲)的连接个数
	var wg sync.WaitGroup
	for i := 0; i < 1000; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			_, err := db.Exec("SELECT SLEEP(3)")
			if err != nil {
				log.Printf("Exec error: %#v\n", err)
			}
		}()
		log.Printf("%#v\n\n", db.Stats())
	}
	wg.Wait()
	log.Printf("%#v\n\n", db.Stats())
}
```

输出结果

```bash
# 重点看最后一行, OpenConnections:10, MaxIdleClosed:990
...
2023/04/01 11:29:33 sql.DBStats{MaxOpenConnections:0, OpenConnections:997, InUse:997, Idle:0, WaitCount:0, WaitDuration:0, MaxIdleClosed:0, MaxIdleTimeClosed:0, MaxLifetimeClosed:0}  

2023/04/01 11:29:33 sql.DBStats{MaxOpenConnections:0, OpenConnections:999, InUse:999, Idle:0, WaitCount:0, WaitDuration:0, MaxIdleClosed:0, MaxIdleTimeClosed:0, MaxLifetimeClosed:0}  

2023/04/01 11:29:33 sql.DBStats{MaxOpenConnections:0, OpenConnections:999, InUse:999, Idle:0, WaitCount:0, WaitDuration:0, MaxIdleClosed:0, MaxIdleTimeClosed:0, MaxLifetimeClosed:0}  

2023/04/01 11:29:37 sql.DBStats{MaxOpenConnections:0, OpenConnections:10, InUse:0, Idle:10, WaitCount:0, WaitDuration:0, MaxIdleClosed:990, MaxIdleTimeClosed:0, MaxLifetimeClosed:0}

# 总结：为了提高性能，这个值应该尽量大一点，但并不是越大越好
```

:::

::: details （3）设置连接最长的空闲时间：SetConnMaxIdleTime

```go
package main

import (
	"log"
	"sync"
	"time"

	"github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
)

// ConnMySQL 连接数据库
func ConnMySQL() (*sqlx.DB, error) {
	// 定义MySQL配置
	mysqlConfig := mysql.Config{
		User:                 "root",
		Passwd:               "QiNqg[l.%;H>>rO9",
		Net:                  "tcp",
		Addr:                 "192.168.48.151:3306",
		DBName:               "demo",
		Collation:            "utf8mb4_general_ci", // 设置字符集和排序规则
		Loc:                  time.Local,           // 设置连接时使用的时区,默认为UTC时区
		ParseTime:            true,                 // 是否将数据库中的TIME或DATETIME字段解析为Go的时间类型（即time.Time)
		Timeout:              5 * time.Second,      // 连接超时时间
		ReadTimeout:          30 * time.Second,     // 读取超时时间
		WriteTimeout:         30 * time.Second,     // 写入超时时间
		CheckConnLiveness:    true,                 // 在使用连接之前检查其存活性
		AllowNativePasswords: true,                 // 允许MySQL身份认证插件mysql_native_password
        MaxAllowedPacket:     16 << 20,             // 控制客户端向MySQL服务器发送的最大数据包大小, 16 MiB
	}

	// 连接数据库
	// sqlx.Connect = sqlx.Open + db.Ping,也可以使用 sql.MustConnect, 连接不成功就panic
	return sqlx.Connect("mysql", mysqlConfig.FormatDSN())
}

func main() {
	// 连接数据库
	db, err := ConnMySQL()
	if err != nil {
		panic(err)
	}
	defer func() { _ = db.Close() }()

	// 设置最大空闲的连接数
	db.SetMaxIdleConns(20)

	// 设置连接最长的空闲时间
	// 如果连接空闲达到该时长将会被关闭
    // 如果 d <= 0，则连接不会因连接空闲时间而关闭，默认为0
	db.SetConnMaxIdleTime(time.Second * 15)

	// 开100个连接，然后让他一直空闲
	var wg sync.WaitGroup
	for i := 0; i < 100; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			_, err := db.Exec("SELECT SLEEP(1)")
			if err != nil {
				log.Printf("Exec error: %#v\n", err)
			}
		}()
	}
	wg.Wait()

	// 实时查看连接状态
	for {
		time.Sleep(time.Second)
		log.Printf("%#v\n\n", db.Stats())
	}
}
```

输出结果

```bash
# 重点看 MaxIdleTimeClosed
...
2023/04/01 11:44:44 sql.DBStats{MaxOpenConnections:0, OpenConnections:0, InUse:0, Idle:0, WaitCount:0, WaitDuration:0, MaxIdleClosed:80, MaxIdleTimeClosed:20, MaxLifetimeClosed:0}
```

:::

::: details （4）设置连接的最大生命周期：SetConnMaxLifetime

```go
	// 设置连接的最大生命周期
	// SetConnMaxLifetime 方法接受一个 time.Duration 类型的参数，表示连接的最大生存时间
	// 如果一个连接的生存时间超过了该时间，那么该连接将被关闭并从连接池中移除
	// 在下次需要连接时，将会创建一个新的连接

	// 作用是
	// 当数据库连接被重复利用时，连接的状态可能会变得不可预测，例如会话状态可能会发生变化
	// 因此为了确保应用程序的稳定性和性能，建议对连接池中的连接进行适当地管理和维护，以确保连接的安全和有效性
	db.SetConnMaxLifetime(time.Hour * 6)
```

:::

<br />

### 身份认证插件

::: details （1）身份认证插件介绍

**身份认证插件介绍**

* mysql_native_password

  MySQL 8.0之前的默认身份插件，使用用户名和密码进行验证，使用SHA1算法进行密码加密，认证过程中不会缓存密码，不支持SSL/TLS

* caching_sha2_password

  MySQL 8.0之后的默认身份插件，使用用户名和密码进行验证，使用SHA256算法进行密码加密，在认证成功后将哈希值缓存到内存中，支持SSL/TLS

**go-sql-driver/mysql支持的身份认证插件**

* 默认情况下使用caching_sha2_password插件，不支持mysql_native_password插件
* 将AllowNativePasswords设置为true，可以同时支持caching_sha2_password和mysql_native_password

<br />

**查询当前数据库默认的身份认证插件**

```bash
mysql> SELECT @@default_authentication_plugin;
+---------------------------------+
| @@default_authentication_plugin |
+---------------------------------+
| caching_sha2_password           |
+---------------------------------+
1 row in set, 1 warning (0.00 sec)
```

**修改当前数据库默认的身份认证插件**

```bash
# 1、修改MySQL配置文件
[mysqld]
default_authentication_plugin = mysql_native_password

# 2、重启MySQL

# 3、查询验证
mysql> SELECT @@default_authentication_plugin;
+---------------------------------+
| @@default_authentication_plugin |
+---------------------------------+
| mysql_native_password           |
+---------------------------------+
1 row in set, 1 warning (0.00 sec)
```

:::

::: details （2）AllowNativePasswords测试

```bash
# 依据上面的文档和代码做一些简单的调整即可
#   1、修改MySQL默认的身份认证插件为 mysql_native_password
#   2、修改代码中的MySQL配置参数 AllowNativePasswords: false,

# 执行代码后会报错，设置AllowNativePasswords: true后就可以正常连接MySQL
[mysql] 2023/04/03 11:07:09 connector.go:95: could not use requested auth plugin 'mysql_native_password': this user requires mysql native password authentication.
panic: this user requires mysql native password authentication.
```

:::

<br />

### 其他参数简介

::: details 点击查看详情

```go
AllowOldPasswords
	早期版本的MySQL中，密码存储格式为旧版格式，此选项用于支持旧版密码存储格式

ClientFoundRows
	设置为true 时，在执行 UPDATE 或 DELETE 查询后，MySQL 服务器会返回匹配行的数量，而不是受影响的行数

MultiStatements
	控制是否允许在单个 SQL 语句中执行多个语句
```

:::

<br />

## 日志

### 使用 zap

::: details （1）使用zap.Logger替换go-sql-driver/mysql内部的Logger

```go
package main

import (
	"fmt"
	"sync"
	"time"

	"github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

// ConnMySQL 连接数据库
func ConnMySQL() (*sqlx.DB, error) {
	// 定义MySQL配置
	mysqlConfig := mysql.Config{
		User:                 "root",
		Passwd:               "QiNqg[l.%;H>>rO9",
		Net:                  "tcp",
		Addr:                 "192.168.48.151:3306",
		DBName:               "demo",
		Collation:            "utf8mb4_general_ci", // 设置字符集和排序规则
		Loc:                  time.Local,           // 设置连接时使用的时区,默认为UTC时区
		ParseTime:            true,                 // 是否将数据库中的TIME或DATETIME字段解析为Go的时间类型（即time.Time)
		Timeout:              5 * time.Second,      // 连接超时时间
		ReadTimeout:          30 * time.Second,     // 读取超时时间
		WriteTimeout:         30 * time.Second,     // 写入超时时间
		CheckConnLiveness:    true,                 // 在使用连接之前检查其存活性
		AllowNativePasswords: true,                 // 允许MySQL身份认证插件mysql_native_password
        MaxAllowedPacket:     16 << 20,             // 控制客户端向MySQL服务器发送的最大数据包大小, 16 MiB
	}

	// 连接数据库
	// sqlx.Connect = sqlx.Open + db.Ping,也可以使用 sql.MustConnect, 连接不成功就panic
	return sqlx.Connect("mysql", mysqlConfig.FormatDSN())
}

type mysqlLogger struct {
	logger *zap.Logger
}

func (l *mysqlLogger) Print(v ...any) {
	l.logger.Error(fmt.Sprint(v...))
}

func main() {
	// 连接数据库
	db, err := ConnMySQL()
	if err != nil {
		panic(err)
	}
	defer func() { _ = db.Close() }()

	// 初始化 zap.Logger
	logger, err := zap.NewProduction()
	if err != nil {
		panic(err)
	}
	logger = logger.
		WithOptions(zap.AddStacktrace(zapcore.FatalLevel)).
		WithOptions(zap.WithCaller(false)).
		With(zap.String("driver", "go-sql-driver/mysql"))

	// 使用zap.Logger替换go-sql-driver/mysql内部的Logger
	err = mysql.SetLogger(&mysqlLogger{logger: logger})
	if err != nil {
		panic(err)
	}

	// 人为制造一个go-sql-driver/mysql内部错误
	var wg sync.WaitGroup
	db.SetMaxOpenConns(2)
	for i := 0; i < 3; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			_, _ = db.Exec("SELECT sleep(60)")
		}()
	}
	wg.Wait()
}
```

输出结果

```bash
{"level":"error","ts":1680347876.7655728,"msg":"read tcp 192.168.48.1:59902->192.168.48.151:3306: i/o timeout","driver":"go-sql-driver/mysql"}
{"level":"error","ts":1680347876.7655728,"msg":"read tcp 192.168.48.1:59901->192.168.48.151:3306: i/o timeout","driver":"go-sql-driver/mysql"}
{"level":"error","ts":1680347906.7748804,"msg":"read tcp 192.168.48.1:59903->192.168.48.151:3306: i/o timeout","driver":"go-sql-driver/mysql"}

# 需要注意的是，我们给zap添加了一个固定字段，{"driver": "go-sql-driver/mysql"}，这样就能很方便的区分出该日志由MySQL驱动打印
```

:::

<br />

## 操作

### 对库操作

::: details 点击查看详情

```go
package main

import (
	"database/sql"
	"fmt"
	"time"

	"github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
)

// ConnMySQL 连接数据库
func ConnMySQL() (*sqlx.DB, error) {
	// 定义MySQL配置
	mysqlConfig := mysql.Config{
		User:                 "root",
		Passwd:               "QiNqg[l.%;H>>rO9",
		Net:                  "tcp",
		Addr:                 "192.168.48.151:3306",
		DBName:               "demo",
		Collation:            "utf8mb4_general_ci", // 设置字符集和排序规则
		Loc:                  time.Local,           // 设置连接时使用的时区,默认为UTC时区
		ParseTime:            true,                 // 是否将数据库中的TIME或DATETIME字段解析为Go的时间类型（即time.Time)
		Timeout:              5 * time.Second,      // 连接超时时间
		ReadTimeout:          30 * time.Second,     // 读取超时时间
		WriteTimeout:         30 * time.Second,     // 写入超时时间
		CheckConnLiveness:    true,                 // 在使用连接之前检查其存活性
		AllowNativePasswords: true,                 // 允许MySQL身份认证插件mysql_native_password
        MaxAllowedPacket:     16 << 20,             // 控制客户端向MySQL服务器发送的最大数据包大小, 16 MiB
	}

	// 连接数据库
	// sqlx.Connect = sqlx.Open + db.Ping,也可以使用 sql.MustConnect, 连接不成功就panic
	return sqlx.Connect("mysql", mysqlConfig.FormatDSN())
}

// ShowDatabase 查看当前使用的库
func ShowDatabase(db *sqlx.DB) {
	// 因为查询的值有可能是Null，所以这里必须使用 sql.NullString
	var database sql.NullString
	err := db.QueryRow("SELECT DATABASE()").Scan(&database)
	if err != nil {
		panic(err)
	}
	if database.Valid {
		fmt.Printf("%-20s%s\n", "Current Database:", database.String)
	} else {
		fmt.Printf("%-20s%s\n", "Current Database:", "未选择")
	}
}

func main() {
	// 连接数据库
	db, err := ConnMySQL()
	if err != nil {
		panic(err)
	}
	defer func() { _ = db.Close() }()

	// 1、连接数据库时可以不填写具体的库名
	// 2、可以通过执行SQL语句创建、切换和删除某个库
	// 3、若连接时指定库名 或 执行SQL切换到库，则要求库必须存在，则否会报错
	//    Error 1049 (42000): Unknown database 'demo123'

	// 查看当前使用的库
	ShowDatabase(db)

	// 若库不存在则创建库
	_, err = db.Exec("CREATE DATABASE IF NOT EXISTS demo")
	if err != nil {
		panic(err)
	}

	// 使用库
	_, err = db.Exec("USE demo")
	if err != nil {
		panic(err)
	}

	// 查看当前使用的库
	ShowDatabase(db)

	// 查看所有的库
	var databaseList []string
	err = db.Select(&databaseList, "SHOW DATABASES ;")
	if err != nil {
		panic(err)
	}
	fmt.Printf("%-20s%s\n", "Database List:", databaseList)
}
```

输出结果

```bash
Current Database:   未选择
Current Database:   demo
Database List:      [demo information_schema mysql performance_schema sys]
```

:::

<br />

### 对表操作

::: details （1）表操作

```go
package main

import (
	"database/sql"
	"fmt"
	"strings"
	"time"

	"github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
)

// DescStruct 表结构
type DescStruct struct {
	Field   string         `db:"Field"`
	Type    string         `db:"Type"`
	Null    string         `db:"Null"`
	Key     string         `db:"Key"`
	Default sql.NullString `db:"Default"`
	Extra   string         `db:"Extra"`
}

// ConnMySQL 连接数据库
func ConnMySQL() (*sqlx.DB, error) {
	// 定义MySQL配置
	mysqlConfig := mysql.Config{
		User:                 "root",
		Passwd:               "QiNqg[l.%;H>>rO9",
		Net:                  "tcp",
		Addr:                 "192.168.48.151:3306",
		DBName:               "demo",
		Collation:            "utf8mb4_general_ci", // 设置字符集和排序规则
		Loc:                  time.Local,           // 设置连接时使用的时区,默认为UTC时区
		ParseTime:            true,                 // 是否将数据库中的TIME或DATETIME字段解析为Go的时间类型（即time.Time)
		Timeout:              5 * time.Second,      // 连接超时时间
		ReadTimeout:          30 * time.Second,     // 读取超时时间
		WriteTimeout:         30 * time.Second,     // 写入超时时间
		CheckConnLiveness:    true,                 // 在使用连接之前检查其存活性
		AllowNativePasswords: true,                 // 允许MySQL身份认证插件mysql_native_password
        MaxAllowedPacket:     16 << 20,             // 控制客户端向MySQL服务器发送的最大数据包大小, 16 MiB
	}

	// 连接数据库
	// sqlx.Connect = sqlx.Open + db.Ping,也可以使用 sql.MustConnect, 连接不成功就panic
	return sqlx.Connect("mysql", mysqlConfig.FormatDSN())
}

func main() {
	// 连接数据库
	db, err := ConnMySQL()
	if err != nil {
		panic(err)
	}
	defer func() { _ = db.Close() }()

	// 若users表存在则删除
	{
		var sqlString = `DROP TABLE IF EXISTS users;`
		_, err := db.Exec(sqlString)
		if err != nil {
			panic(err)
		}
	}

	// 若users表不存在则创建
	{
		var sqlString = `
		CREATE TABLE IF NOT EXISTS users (
			·id·         int auto_increment,
			·username·   varchar(128) not null,
			·password·   varchar(255) not null,
			·email·      varchar(128) not null,
			·created_at· datetime(6) not null,
			·updated_at· datetime(6) not null,
			·deleted_at· datetime(6) null default null,
			PRIMARY KEY (·id·),
			UNIQUE (·username·),
  			UNIQUE (·email·)
		)`
		sqlString = strings.ReplaceAll(sqlString, "·", "`")
		_, err := db.Exec(sqlString)
		if err != nil {
			panic(err)
		}
	}

	// 查看users表结构
	{
		// 执行SQL语句
		var desc []DescStruct
		err := db.Select(&desc, "DESC users")
		if err != nil {
			panic(err)
		}

		// 表结构可视化
		format := "%-20s%-20s%-10s%-10s%-20v%-20s\n"
		fmt.Printf(format, "Field", "Type", "Null", "Key", "Default", "Extra")
		fmt.Printf("%s\n", strings.Repeat("_", 100))
		for _, row := range desc {
			// Default字段的值可能为NULL,所以需要特殊处理
			defaultString := ""
			if row.Default.Valid {
				defaultString = row.Default.String
			} else {
				defaultString = "NULL"
			}
			fmt.Printf(format, row.Field, row.Type, row.Null, row.Key, defaultString, row.Extra)
		}
	}
}
```

输出结果

```bash
Field               Type                Null      Key       Default             Extra
____________________________________________________________________________________________________
id                  int                 NO        PRI       NULL                auto_increment
username            varchar(128)        NO        UNI       NULL
password            varchar(255)        NO                  NULL
email               varchar(128)        NO        UNI       NULL
created_at          datetime(6)         NO                  NULL
updated_at          datetime(6)         NO                  NULL
deleted_at          datetime(6)         YES                 NULL
```

:::

::: details （2）建表时设置写入或更新数据时自动填充当前时间

```go
	// 若users表不存在则创建
	{
		var sqlString = `
		CREATE TABLE IF NOT EXISTS users (
			·id·         int auto_increment,
			·username·   varchar(128) not null,
			·password·   varchar(255) not null,
			·email·      varchar(128) not null,
			·created_at· datetime(6) not null default current_timestamp(6),
			·updated_at· datetime(6) not null default current_timestamp(6) on update current_timestamp(6),
			·deleted_at· datetime(6) null default null,
			PRIMARY KEY (·id·),
			UNIQUE (·username·),
  			UNIQUE (·email·)
		)`
		sqlString = strings.ReplaceAll(sqlString, "·", "`")
		_, err := db.Exec(sqlString)
		if err != nil {
			panic(err)
		}
	}

// 分析
// 1、如上建表SQL语句: 在以后写入数据或修改数据时可以不用指定 created_at 和 updated_at
// 2、这样Go代码写起来会清爽很多，不用显示传递 CreatedAt 和 UpdatedAt
// 3、但是可能会埋下一些隐患，比如
//    1) MySQL时区错误导致时间错误，这可以通过修改MySQL时区来解决
//    2) 将数据库从一个MySQL实例迁移到另一个MySQL实例，新实例时区设置有问题 且 有业务正在使用不能修改时区的情况下，就比较难办
```

:::

<br />

### 写入数据

::: details （1）写数据的几种方法

```go
package main

import (
	"fmt"
	"time"

	"github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
)

// User 定义结构体，DeletedAt在查询时有可能为Null值，所以定义为 sql.NullTime，也可以定义为 *time.Time
type User struct {
	ID        int          `db:"id"`
	Username  string       `db:"username"`
	Password  string       `db:"password"`
	Email     string       `db:"email"`
	CreatedAt time.Time    `db:"created_at"`
	UpdatedAt time.Time    `db:"updated_at"`
	DeletedAt sql.NullTime `db:"deleted_at"`
}

// ConnMySQL 连接数据库
func ConnMySQL() (*sqlx.DB, error) {
	// 定义MySQL配置
	mysqlConfig := mysql.Config{
		User:                 "root",
		Passwd:               "QiNqg[l.%;H>>rO9",
		Net:                  "tcp",
		Addr:                 "192.168.48.151:3306",
		DBName:               "demo",
		Collation:            "utf8mb4_general_ci", // 设置字符集和排序规则
		Loc:                  time.Local,           // 设置连接时使用的时区,默认为UTC时区
		ParseTime:            true,                 // 是否将数据库中的TIME或DATETIME字段解析为Go的时间类型（即time.Time)
		Timeout:              5 * time.Second,      // 连接超时时间
		ReadTimeout:          30 * time.Second,     // 读取超时时间
		WriteTimeout:         30 * time.Second,     // 写入超时时间
		CheckConnLiveness:    true,                 // 在使用连接之前检查其存活性
		AllowNativePasswords: true,                 // 允许MySQL身份认证插件mysql_native_password
        MaxAllowedPacket:     16 << 20,             // 控制客户端向MySQL服务器发送的最大数据包大小, 16 MiB
	}

	// 连接数据库: sqlx.Connect = sqlx.Open(不会真正连接数据库) + db.Ping(会真正连接数据库)
	return sqlx.Connect("mysql", mysqlConfig.FormatDSN())
}

func main() {
	// 连接数据库
	db, err := ConnMySQL()
	if err != nil {
		panic(err)
	}
	defer func() { _ = db.Close() }()

	// 写入单条数据 - 方式1，使用?占位
	{
		user := User{Username: "alice", Password: "123456", Email: "alice@example.com", CreatedAt: time.Now(), UpdatedAt: time.Now()}
		sqlString := `INSERT INTO users (username, password, email, created_at, updated_at) VALUES (?, ?, ?,?,?)`
		_, err := db.Exec(sqlString, user.Username, user.Password, user.Email, user.CreatedAt, user.UpdatedAt)
		if err != nil {
			panic(err)
		}
	}

	// 写入单条数据 - 方式2，:username等写法需要对应结构体的tag: db
	{
		user := User{Username: "john", Password: "123456", Email: "john@example.com", CreatedAt: time.Now(), UpdatedAt: time.Now()}
		sqlString := `INSERT INTO users (username, password, email, created_at, updated_at) VALUES
			(:username, :password, :email, :created_at, :updated_at)`
		_, err := db.NamedExec(sqlString, user)
		if err != nil {
			panic(err)
		}
	}

	// 批量写入数据
	{
		users := []User{
			{Username: "bob1", Password: "123456", Email: "bob1@example.com", CreatedAt: time.Now(), UpdatedAt: time.Now()},
			{Username: "bob2", Password: "123456", Email: "bob2@example.com", CreatedAt: time.Now(), UpdatedAt: time.Now()},
			{Username: "bob3", Password: "123456", Email: "bob3@example.com", CreatedAt: time.Now(), UpdatedAt: time.Now()},
			{Username: "bob4", Password: "123456", Email: "bob4@example.com", CreatedAt: time.Now(), UpdatedAt: time.Now()},
			{Username: "bob5", Password: "123456", Email: "bob5@example.com", CreatedAt: time.Now(), UpdatedAt: time.Now()},
		}
		sqlString := `INSERT INTO users (username, password, email, created_at, updated_at) VALUES
			(:username, :password, :email, :created_at, :updated_at)`

		result, err := db.NamedExec(sqlString, users)
		if err != nil {
			panic(err)
		}

		// 返回受update, insert, or delete操作影响的行数
		// 不是每个数据库或数据库驱动程序都支持这一点
		n, err := result.RowsAffected()
		if err != nil {
			panic(err)
		}
		fmt.Printf("RowsAffected: %d\n", n)

		// 返回上一次(本次)插入操作生成的自增ID
		// 不是每个数据库或数据库驱动程序都支持这一点
		m, err := result.LastInsertId()
		if err != nil {
			panic(err)
		}
		fmt.Printf("LastInsertId: %d\n", m)
	}

	// 写入Map结构的数据
	{
		user := []map[string]any{
			{
				"username":   "faker",
				"password":   "123456",
				"email":      "faker@example.com",
				"created_at": time.Now(),
				"updated_at": time.Now(),
			},
		}
		sqlString := `INSERT INTO users (username, password, email, created_at, updated_at) VALUES
			(:username, :password, :email, :created_at, :updated_at)`
		_, err := db.NamedExec(sqlString, user)
		if err != nil {
			panic(err)
		}
	}
}
```

输出结果

```bash
RowsAffected: 5    # 受影响的行数
LastInsertId: 3    # 上一次插入ID(这里的ID是自增主键)

# 我们来看一下数据库的信息
# 当插入多行数据时，LastInsertId是多行的第一行的ID
mysql> select * from users;
+----+----------+----------+-------------------+----------------------------+----------------------------+------------+
| id | username | password | email             | created_at                 | updated_at                 | deleted_at |
+----+----------+----------+-------------------+----------------------------+----------------------------+------------+
|  1 | alice    | 123456   | alice@example.com | 2023-04-03 18:00:37.703388 | 2023-04-03 18:00:37.703388 | NULL       |
|  2 | john     | 123456   | john@example.com  | 2023-04-03 18:00:37.710173 | 2023-04-03 18:00:37.710173 | NULL       |
|  3 | bob1     | 123456   | bob1@example.com  | 2023-04-03 18:00:37.713542 | 2023-04-03 18:00:37.713542 | NULL       |
|  4 | bob2     | 123456   | bob2@example.com  | 2023-04-03 18:00:37.713542 | 2023-04-03 18:00:37.713542 | NULL       |
|  5 | bob3     | 123456   | bob3@example.com  | 2023-04-03 18:00:37.713542 | 2023-04-03 18:00:37.713542 | NULL       |
|  6 | bob4     | 123456   | bob4@example.com  | 2023-04-03 18:00:37.713542 | 2023-04-03 18:00:37.713542 | NULL       |
|  7 | bob5     | 123456   | bob5@example.com  | 2023-04-03 18:00:37.713542 | 2023-04-03 18:00:37.713542 | NULL       |
|  8 | faker    | 123456   | faker@example.com | 2023-04-03 18:00:37.716145 | 2023-04-03 18:00:37.716145 | NULL       |
+----+----------+----------+-------------------+----------------------------+----------------------------+------------+
8 rows in set (0.00 sec)
```

:::

<br />

### 修改数据

::: details 点击查看详情

```go
package main

import (
	"fmt"
	"time"

	"github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
)

// ConnMySQL 连接数据库
func ConnMySQL() (*sqlx.DB, error) {
	// 定义MySQL配置
	mysqlConfig := mysql.Config{
		User:                 "root",
		Passwd:               "QiNqg[l.%;H>>rO9",
		Net:                  "tcp",
		Addr:                 "192.168.48.151:3306",
		DBName:               "demo",
		Collation:            "utf8mb4_general_ci", // 设置字符集和排序规则, 不区分大小写
		Loc:                  time.Local,           // 设置连接时使用的时区,默认为UTC时区
		ParseTime:            true,                 // 是否将数据库中的TIME或DATETIME字段解析为Go的时间类型（即time.Time)
		Timeout:              5 * time.Second,      // 连接超时时间
		ReadTimeout:          30 * time.Second,     // 读取超时时间
		WriteTimeout:         30 * time.Second,     // 写入超时时间
		CheckConnLiveness:    true,                 // 在使用连接之前检查其存活性
		AllowNativePasswords: true,                 // 允许MySQL身份认证插件mysql_native_password
        MaxAllowedPacket:     16 << 20,             // 控制客户端向MySQL服务器发送的最大数据包大小, 16 MiB
	}

	// 连接数据库: sqlx.Connect = sqlx.Open(不会真正连接数据库) + db.Ping(会真正连接数据库)
	return sqlx.Connect("mysql", mysqlConfig.FormatDSN())
}

func main() {
	// 连接数据库
	db, err := ConnMySQL()
	if err != nil {
		panic(err)
	}
	defer func() { _ = db.Close() }()

	// 总结
	// 1、在修改数据时候，时间最好不要使用数据库的now()函数 和 程序的now() 混合使用，这有可能会因为时区导致获取错误的时间
	// 2、SQL语句中的大小写是否敏感 和 排序规则有关

	// 修改数据: 将ID为8的用户名修改为 Alice
	{
		result, err := db.Exec("UPDATE users SET username=?, updated_at=? WHERE id = 8", "Alice", time.Now())
		if err != nil {
			panic(err)
		}
		n, err := result.RowsAffected()
		if err != nil {
			panic(err)
		}
		fmt.Printf("受影响的行数: %d\n", n)
	}

	// 修改数据1: utf8mb4_general_ci默认不区分大小写，所以这里的更改总会生效
	{
		result, err := db.Exec("UPDATE users SET username = ?, updated_at=? WHERE username = ?", "jack", time.Now(), "alice")
		if err != nil {
			panic(err)
		}
		n, err := result.RowsAffected()
		if err != nil {
			panic(err)
		}
		fmt.Printf("受影响的行数: %d\n", n)
	}

	// 修改数据2: 注释上面的代码，在不修改MySQL排序规则的情况下，添加 binary 关键字,这样就会区分大小写
	{
		result, err := db.Exec("UPDATE users SET username = ?, updated_at=? WHERE binary username = ?", "bob", time.Now(), "alice")
		if err != nil {
			panic(err)
		}
		n, err := result.RowsAffected()
		if err != nil {
			panic(err)
		}
		fmt.Printf("受影响的行数: %d\n", n)
	}

	// 修改数据3: 排除逻辑删除数据(deleted_at不是null的情况)
	{
		result, err := db.Exec("UPDATE users SET username=?, updated_at=? WHERE deleted_at is null and id = 9", "Alice", time.Now())
		if err != nil {
			panic(err)
		}
		n, err := result.RowsAffected()
		if err != nil {
			panic(err)
		}
		fmt.Printf("受影响的行数: %d\n", n)
	}
}
```

输出结果

```bash
受影响的行数: 1
受影响的行数: 1
受影响的行数: 0
受影响的行数: 1
```

:::

<br />

### 删除数据

::: details 点击查看详情

```go
package main

import (
	"fmt"
	"time"

	"github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
)

// ConnMySQL 连接数据库
func ConnMySQL() (*sqlx.DB, error) {
	// 定义MySQL配置
	mysqlConfig := mysql.Config{
		User:                 "root",
		Passwd:               "QiNqg[l.%;H>>rO9",
		Net:                  "tcp",
		Addr:                 "192.168.48.151:3306",
		DBName:               "demo",
		Collation:            "utf8mb4_general_ci", // 设置字符集和排序规则
		Loc:                  time.Local,           // 设置连接时使用的时区,默认为UTC时区
		ParseTime:            true,                 // 是否将数据库中的TIME或DATETIME字段解析为Go的时间类型（即time.Time)
		Timeout:              5 * time.Second,      // 连接超时时间
		ReadTimeout:          30 * time.Second,     // 读取超时时间
		WriteTimeout:         30 * time.Second,     // 写入超时时间
		CheckConnLiveness:    true,                 // 在使用连接之前检查其存活性
		AllowNativePasswords: true,                 // 允许MySQL身份认证插件mysql_native_password
        MaxAllowedPacket:     16 << 20,             // 控制客户端向MySQL服务器发送的最大数据包大小, 16 MiB
	}

	// 连接数据库: sqlx.Connect = sqlx.Open(不会真正连接数据库) + db.Ping(会真正连接数据库)
	return sqlx.Connect("mysql", mysqlConfig.FormatDSN())
}

func main() {
	// 连接数据库
	db, err := ConnMySQL()
	if err != nil {
		panic(err)
	}
	defer func() { _ = db.Close() }()

	// 删除数据：硬删除
	{
		result, err := db.Exec("DELETE FROM users WHERE id = ?", "8")
		if err != nil {
			panic(err)
		}
		n, err := result.RowsAffected()
		if err != nil {
			panic(err)
		}
		fmt.Printf("受影响的行数: %d\n", n)
	}

	// 删除数据：软删除
	{
		result, err := db.Exec("UPDATE users SET deleted_at = ? WHERE id = ?", time.Now(), "9")
		if err != nil {
			panic(err)
		}
		n, err := result.RowsAffected()
		if err != nil {
			panic(err)
		}
		fmt.Printf("受影响的行数: %d\n", n)
	}
}
```

输出结果

```bash
受影响的行数: 1
受影响的行数: 1
```

:::

<br />

### 查询数据

::: details （1）低级接口查询数据：QueryRow和QueryRowx查询单条数据

```go
package main

import (
	"database/sql"
	"fmt"
	"github.com/jmoiron/sqlx"
	"time"

	"github.com/go-sql-driver/mysql"
)

// User 定义结构体，DeletedAt在查询时有可能为Null值，所以定义为 sql.NullTime，也可以定义为 *time.Time
type User struct {
	ID        int          `db:"id"`
	Username  string       `db:"username"`
	Password  string       `db:"password"`
	Email     string       `db:"email"`
	CreatedAt time.Time    `db:"created_at"`
	UpdatedAt time.Time    `db:"updated_at"`
	DeletedAt sql.NullTime `db:"deleted_at"`
}

// ConnMySQL 连接数据库
func ConnMySQL() (*sqlx.DB, error) {
	// 定义MySQL配置
	mysqlConfig := mysql.Config{
		User:                 "root",
		Passwd:               "QiNqg[l.%;H>>rO9",
		Net:                  "tcp",
		Addr:                 "192.168.48.151:3306",
		DBName:               "demo",
		Collation:            "utf8mb4_general_ci", // 设置字符集和排序规则
		Loc:                  time.Local,           // 设置连接时使用的时区,默认为UTC时区
		ParseTime:            true,                 // 是否将数据库中的TIME或DATETIME字段解析为Go的时间类型（即time.Time)
		Timeout:              5 * time.Second,      // 连接超时时间
		ReadTimeout:          30 * time.Second,     // 读取超时时间
		WriteTimeout:         30 * time.Second,     // 写入超时时间
		CheckConnLiveness:    true,                 // 在使用连接之前检查其存活性
		AllowNativePasswords: true,                 // 允许MySQL身份认证插件mysql_native_password
        MaxAllowedPacket:     16 << 20,             // 控制客户端向MySQL服务器发送的最大数据包大小, 16 MiB
	}

	// 连接数据库
	// sqlx.Connect = sqlx.Open + db.Ping,也可以使用 sql.MustConnect, 连接不成功就panic
	return sqlx.Connect("mysql", mysqlConfig.FormatDSN())
}

func main() {
	// 连接数据库
	db, err := ConnMySQL()
	if err != nil {
		panic(err)
	}
	defer func() { _ = db.Close() }()

	// 注意事项：
	// 当查询没有结果时会返回sql.ErrNoRows错误，需要针对判断

	// 查询单条数据: 使用 QueryRow，兼容database/sql
	{
		user := User{}
		row := db.QueryRow("SELECT * FROM users WHERE id = ?", "1")
		err := row.Scan(
			&user.ID,
			&user.Username,
			&user.Password,
			&user.Email,
			&user.CreatedAt,
			&user.UpdatedAt,
			&user.DeletedAt,
		)
		if err != sql.ErrNoRows {
			if err != nil {
				panic(err)
			}
			fmt.Printf("%#v\n", user)
			fmt.Println()
		}
	}

	// 查询单条数据: 使用 QueryRowx, 可以直接解析到其他数据结构，比如StructScan、SliceScan、MapScan等，这是sqlx特有的方法
	{
		user := User{}
		row := db.QueryRowx("SELECT * FROM users WHERE id = ?", "2")
		err := row.StructScan(&user)
		if err != sql.ErrNoRows {
			if err != nil {
				panic(err)
			}
			fmt.Printf("%#v\n", user)
		}
	}
}
```

输出结果

```bash
main.User{ID:1, Username:"alice", Password:"123456", Email:"alice@example.com", CreatedAt:time.Date(2023, time.April, 4, 8, 13, 44, 445941000, time.Local), UpdatedAt:time.Date(2023, time
.April, 4, 8, 13, 44, 445941000, time.Local), DeletedAt:sql.NullTime{Time:time.Date(1, time.January, 1, 0, 0, 0, 0, time.UTC), Valid:false}}

main.User{ID:2, Username:"john", Password:"123456", Email:"john@example.com", CreatedAt:time.Date(2023, time.April, 4, 8, 13, 44, 455052000, time.Local), UpdatedAt:time.Date(2023, time.A
pril, 4, 8, 13, 44, 455052000, time.Local), DeletedAt:sql.NullTime{Time:time.Date(1, time.January, 1, 0, 0, 0, 0, time.UTC), Valid:false}}
```

:::

::: details （2）低级接口查询数据：Query和Queryx查询多条数据

```go
package main

import (
	"database/sql"
	"fmt"
	"github.com/jmoiron/sqlx"
	"time"

	"github.com/go-sql-driver/mysql"
)

// User 定义结构体，DeletedAt在查询时有可能为Null值，所以定义为 sql.NullTime，也可以定义为 *time.Time
type User struct {
	ID        int          `db:"id"`
	Username  string       `db:"username"`
	Password  string       `db:"password"`
	Email     string       `db:"email"`
	CreatedAt time.Time    `db:"created_at"`
	UpdatedAt time.Time    `db:"updated_at"`
	DeletedAt sql.NullTime `db:"deleted_at"`
}

// ConnMySQL 连接数据库
func ConnMySQL() (*sqlx.DB, error) {
	// 定义MySQL配置
	mysqlConfig := mysql.Config{
		User:                 "root",
		Passwd:               "QiNqg[l.%;H>>rO9",
		Net:                  "tcp",
		Addr:                 "192.168.48.151:3306",
		DBName:               "demo",
		Collation:            "utf8mb4_general_ci", // 设置字符集和排序规则
		Loc:                  time.Local,           // 设置连接时使用的时区,默认为UTC时区
		ParseTime:            true,                 // 是否将数据库中的TIME或DATETIME字段解析为Go的时间类型（即time.Time)
		Timeout:              5 * time.Second,      // 连接超时时间
		ReadTimeout:          30 * time.Second,     // 读取超时时间
		WriteTimeout:         30 * time.Second,     // 写入超时时间
		CheckConnLiveness:    true,                 // 在使用连接之前检查其存活性
		AllowNativePasswords: true,                 // 允许MySQL身份认证插件mysql_native_password
        MaxAllowedPacket:     16 << 20,             // 控制客户端向MySQL服务器发送的最大数据包大小, 16 MiB
	}

	// 连接数据库
	// sqlx.Connect = sqlx.Open + db.Ping,也可以使用 sql.MustConnect, 连接不成功就panic
	return sqlx.Connect("mysql", mysqlConfig.FormatDSN())
}

func main() {
	// 连接数据库
	db, err := ConnMySQL()
	if err != nil {
		panic(err)
	}
	defer func() { _ = db.Close() }()

	// 注意事项：
    // 1、不要忘记 rows.Close()， 对于单行查询QueryRow则没有Close()方法
	// 2、因为有了rows.Next()，所以不在不需要判断 if err != sql.ErrNoRows

	// 查询多条数据: 使用 Query，兼容database/sql
	{
		rows, err := db.Query("SELECT * FROM users WHERE id < ?", "2")
		if err != nil {
			panic(err)
		}
		defer func() { _ = rows.Close() }()
		for rows.Next() {
			user := User{}
			err := rows.Scan(
				&user.ID,
				&user.Username,
				&user.Password,
				&user.Email,
				&user.CreatedAt,
				&user.UpdatedAt,
				&user.DeletedAt,
			)
			if err != nil {
				panic(err)
			}
			fmt.Printf("%#v\n", user)
		}
	}

	fmt.Println()

	// 查询多条数据: 使用 Queryx，sqlx特有的方法
	{
		rows, err := db.Queryx("SELECT * FROM users WHERE id < ?", "2")
		if err != nil {
			panic(err)
		}
		defer func() { _ = rows.Close() }()
		for rows.Next() {
			user := User{}
			err := rows.StructScan(&user)
			if err != nil {
				panic(err)
			}
			fmt.Printf("%#v\n", user)
		}
	}
}
```

输出结果

```bash
main.User{ID:1, Username:"alice", Password:"123456", Email:"alice@example.com", CreatedAt:time.Date(2023, time.April, 4, 8, 13, 44, 445941000, time.Local), UpdatedAt:time.Date(2023, time
.April, 4, 8, 13, 44, 445941000, time.Local), DeletedAt:sql.NullTime{Time:time.Date(1, time.January, 1, 0, 0, 0, 0, time.UTC), Valid:false}}

main.User{ID:1, Username:"alice", Password:"123456", Email:"alice@example.com", CreatedAt:time.Date(2023, time.April, 4, 8, 13, 44, 445941000, time.Local), UpdatedAt:time.Date(2023, time
.April, 4, 8, 13, 44, 445941000, time.Local), DeletedAt:sql.NullTime{Time:time.Date(1, time.January, 1, 0, 0, 0, 0, time.UTC), Valid:false}}
```

:::

::: details （3）查询数据：高级接口：Get / Select

```go
package main

import (
	"database/sql"
	"fmt"
	"time"

	"github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
)

// User 定义结构体，DeletedAt在查询时有可能为Null值，所以定义为 sql.NullTime，也可以定义为 *time.Time
type User struct {
	ID        int          `db:"id"`
	Username  string       `db:"username"`
	Password  string       `db:"password"`
	Email     string       `db:"email"`
	CreatedAt time.Time    `db:"created_at"`
	UpdatedAt time.Time    `db:"updated_at"`
	DeletedAt sql.NullTime `db:"deleted_at"`
}

// ConnMySQL 连接数据库
func ConnMySQL() (*sqlx.DB, error) {
	// 定义MySQL配置
	mysqlConfig := mysql.Config{
		User:                 "root",
		Passwd:               "QiNqg[l.%;H>>rO9",
		Net:                  "tcp",
		Addr:                 "192.168.48.151:3306",
		DBName:               "demo",
		Collation:            "utf8mb4_general_ci", // 设置字符集和排序规则
		Loc:                  time.Local,           // 设置连接时使用的时区,默认为UTC时区
		ParseTime:            true,                 // 是否将数据库中的TIME或DATETIME字段解析为Go的时间类型（即time.Time)
		Timeout:              5 * time.Second,      // 连接超时时间
		ReadTimeout:          30 * time.Second,     // 读取超时时间
		WriteTimeout:         30 * time.Second,     // 写入超时时间
		CheckConnLiveness:    true,                 // 在使用连接之前检查其存活性
		AllowNativePasswords: true,                 // 允许MySQL身份认证插件mysql_native_password
        MaxAllowedPacket:     16 << 20,             // 控制客户端向MySQL服务器发送的最大数据包大小, 16 MiB
	}

	// 连接数据库: sqlx.Connect = sqlx.Open(不会真正连接数据库) + db.Ping(会真正连接数据库)
	return sqlx.Connect("mysql", mysqlConfig.FormatDSN())
}

func main() {
	// 连接数据库
	db, err := ConnMySQL()
	if err != nil {
		panic(err)
	}
	defer func() { _ = db.Close() }()

	// 说明
	// 1、Get时仍然需要判断未查询到结果的错误: if err != sql.ErrNoRows
	// 2、Select不需要判断未查询到结果的错误

	// 查询单条数据: Get，参数要求是一个结构体指针
	{
		user := User{}
		err := db.Get(&user, "SELECT * FROM users WHERE id=?", "1")
		if err != sql.ErrNoRows {
			if err != nil {
				panic(err)
			}
			fmt.Printf("%#v\n", user)
			fmt.Println()
		}
	}

	// 查询多条数据: Select，参数要求是一个 结构体切片的指针
	{
		users := []User{}
		err := db.Select(&users, "SELECT * FROM users WHERE id < ?", "2")
		if err != nil {
			panic(err)
		}
		for _, user := range users {
			fmt.Printf("%#v\n", user)
		}
		fmt.Println()
	}
}
```

输出结果

```bash
main.User{ID:1, Username:"alice", Password:"123456", Email:"alice@example.com", CreatedAt:time.Date(2023, time.April, 4, 8, 13, 44, 445941000, time.Local), UpdatedAt:time.Date(2023, time
.April, 4, 8, 13, 44, 445941000, time.Local), DeletedAt:sql.NullTime{Time:time.Date(1, time.January, 1, 0, 0, 0, 0, time.UTC), Valid:false}}

main.User{ID:1, Username:"alice", Password:"123456", Email:"alice@example.com", CreatedAt:time.Date(2023, time.April, 4, 8, 13, 44, 445941000, time.Local), UpdatedAt:time.Date(2023, time
.April, 4, 8, 13, 44, 445941000, time.Local), DeletedAt:sql.NullTime{Time:time.Date(1, time.January, 1, 0, 0, 0, 0, time.UTC), Valid:false}}
```

:::

::: details （3）注意事项：目标位置的类型必须与查询结果的结构相匹配，否则会导致运行时错误

```go
package main

import (
	"database/sql"
	"fmt"
	"time"

	"github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
)

// ConnMySQL 连接数据库
func ConnMySQL() (*sqlx.DB, error) {
	// 定义MySQL配置
	mysqlConfig := mysql.Config{
		User:                 "root",
		Passwd:               "QiNqg[l.%;H>>rO9",
		Net:                  "tcp",
		Addr:                 "192.168.48.151:3306",
		DBName:               "demo",
		Collation:            "utf8mb4_general_ci", // 设置字符集和排序规则
		Loc:                  time.Local,           // 设置连接时使用的时区,默认为UTC时区
		ParseTime:            true,                 // 是否将数据库中的TIME或DATETIME字段解析为Go的时间类型（即time.Time)
		Timeout:              5 * time.Second,      // 连接超时时间
		ReadTimeout:          30 * time.Second,     // 读取超时时间
		WriteTimeout:         30 * time.Second,     // 写入超时时间
		CheckConnLiveness:    true,                 // 在使用连接之前检查其存活性
		AllowNativePasswords: true,                 // 允许MySQL身份认证插件mysql_native_password
        MaxAllowedPacket:     16 << 20,             // 控制客户端向MySQL服务器发送的最大数据包大小, 16 MiB
	}

	// 连接数据库: sqlx.Connect = sqlx.Open(不会真正连接数据库) + db.Ping(会真正连接数据库)
	return sqlx.Connect("mysql", mysqlConfig.FormatDSN())
}

func main() {
	// 连接数据库
	db, err := ConnMySQL()
	if err != nil {
		panic(err)
	}
	defer func() { _ = db.Close() }()

	// 明确指定列，代码运行良好
	{
		type User struct {
			ID        int          `db:"id"`
			Username  string       `db:"username"`
			Password  string       `db:"password"`
			Email     string       `db:"email"`
			CreatedAt time.Time    `db:"created_at"`
			UpdatedAt time.Time    `db:"updated_at"`
			DeletedAt sql.NullTime `db:"deleted_at"`
			Sex       int          `db:"sex"`
		}

		user := User{}
		err := db.Get(&user, "SELECT id,username FROM users WHERE id=?", "1")
		if err != nil {
			panic(err)
		}
		fmt.Printf("%#v\n\n", user)
	}

	// 结构体列比数据库列多，查询使用*，代码运行良好
	{
		type User struct {
			ID        int          `db:"id"`
			Username  string       `db:"username"`
			Password  string       `db:"password"`
			Email     string       `db:"email"`
			CreatedAt time.Time    `db:"created_at"`
			UpdatedAt time.Time    `db:"updated_at"`
			DeletedAt sql.NullTime `db:"deleted_at"`
			Sex       int          `db:"sex"` // 数据库中没有这一列
		}

		user := User{}
		err := db.Get(&user, "SELECT * FROM users WHERE id=?", "1")
		if err != nil {
			panic(err)
		}
		fmt.Printf("%#v\n\n", user)
	}

	// 数据库列比结构体列多，查询使用*，代码报错: panic: missing destination name password in *main.User
	{
		type User struct {
			ID       int    `db:"id"`
			Username string `db:"username"`
		}

		user := User{}
		err := db.Get(&user, "SELECT * FROM users WHERE id=?", "1")
		if err != nil {
			panic(err)
		}
		fmt.Printf("%#v\n", user)
	}
}
```

输出结果

```bash
main.User{ID:1, Username:"alice", Password:"", Email:"", CreatedAt:time.Date(1, time.January, 1, 0, 0, 0, 0, time.UTC), UpdatedAt:time.Date(1, time.January, 1, 0, 0, 0, 0, time.UTC), Del
etedAt:sql.NullTime{Time:time.Date(1, time.January, 1, 0, 0, 0, 0, time.UTC), Valid:false}, Sex:0}

main.User{ID:1, Username:"alice", Password:"123456", Email:"alice@example.com", CreatedAt:time.Date(2023, time.April, 4, 8, 13, 44, 445941000, time.Local), UpdatedAt:time.Date(2023, time
.April, 4, 8, 13, 44, 445941000, time.Local), DeletedAt:sql.NullTime{Time:time.Date(1, time.January, 1, 0, 0, 0, 0, time.UTC), Valid:false}, Sex:0}

panic: missing destination name password in *main.User

# select查询时分析
# 1、明确指定列名，不会报错，但是这样代码写起来可能很麻烦
# 2、使用*时，一定要保证结构体字段 >= 数据库列的数量，且字段能对应的上号
```

:::

<br />

### 查询列名

::: details 点击查看详情

```go
package main

import (
	"database/sql"
	"fmt"
	"github.com/jmoiron/sqlx"
	"time"

	"github.com/go-sql-driver/mysql"
)

// User 定义结构体，DeletedAt在查询时有可能为Null值，所以定义为 sql.NullTime，也可以定义为 *time.Time
type User struct {
	ID        int          `db:"id"`
	Username  string       `db:"username"`
	Password  string       `db:"password"`
	Email     string       `db:"email"`
	CreatedAt time.Time    `db:"created_at"`
	UpdatedAt time.Time    `db:"updated_at"`
	DeletedAt sql.NullTime `db:"deleted_at"`
}

// ConnMySQL 连接数据库
func ConnMySQL() (*sqlx.DB, error) {
	// 定义MySQL配置
	mysqlConfig := mysql.Config{
		User:                 "root",
		Passwd:               "QiNqg[l.%;H>>rO9",
		Net:                  "tcp",
		Addr:                 "192.168.48.129:3306",
		DBName:               "demo",
		Collation:            "utf8mb4_general_ci", // 设置字符集和排序规则
		Loc:                  time.Local,           // 设置连接时使用的时区,默认为UTC时区
		ParseTime:            true,                 // 是否将数据库中的TIME或DATETIME字段解析为Go的时间类型（即time.Time)
		Timeout:              5 * time.Second,      // 连接超时时间
		ReadTimeout:          30 * time.Second,     // 读取超时时间
		WriteTimeout:         30 * time.Second,     // 写入超时时间
		CheckConnLiveness:    true,                 // 在使用连接之前检查其存活性
		AllowNativePasswords: true,                 // 允许MySQL身份认证插件mysql_native_password
		MaxAllowedPacket:     16 << 20,             // 控制客户端向MySQL服务器发送的最大数据包大小, 16 MiB
	}

	// 连接数据库
	// sqlx.Connect = sqlx.Open + db.Ping,也可以使用 sql.MustConnect, 连接不成功就panic
	return sqlx.Connect("mysql", mysqlConfig.FormatDSN())
}

func main() {
	// 连接数据库
	db, err := ConnMySQL()
	if err != nil {
		panic(err)
	}
	defer func() { _ = db.Close() }()

	// 注意事项
	// 这种查看方式与查看表结构有本质区别
    
	// 查询单条数据
	{
		row := db.QueryRowx("SELECT * FROM users WHERE id = ?", "1")

		// 查看列名
		columns, err := row.Columns()
		if err != nil {
			panic(err)
		}
		fmt.Printf("%#v\n\n", columns)

		// 查看列类型
		columnTypes, err := row.ColumnTypes()
		if err != nil {
			panic(err)
		}

		ctype := columnTypes[4]               // 查看第N个字段
		fmt.Println(ctype.Name())             // 列名称
		fmt.Println(ctype.DatabaseTypeName()) // 列的类型的名称
		fmt.Println(ctype.ScanType())         // 返回对应的Go类型
		fmt.Println(ctype.Nullable())         // 返回列的值是否可为空，如果驱动不支持此特性则ok返回false
		fmt.Println(ctype.DecimalSize())      // 返回小数类型的小数位数和精度，如果驱动不支持此特性则ok返回false
		fmt.Println(ctype.Length())           // 返回可变长度列类型的列类型长度，如果列类型不是可变长度的,例如int,或者驱动不支持此特特性则ok返回false
		fmt.Println()

		// 获取值
		// 调用row.Scan() 或 row.StructScan()等后会自动关闭row
		// 调用row.Columns() 或 row.ColumnTypes()等后不会自动资管row
		// 所以应该先调用 row.Columns()，然后再调用 row.Scan()
		var user User
		err = row.StructScan(&user)
		if err != nil {
			panic(err)
		}
		fmt.Printf("%#v\n\n", user)
	}

	// 自定义列名
	{
		row := db.QueryRowx(`
			SELECT id AS ID,username AS 用户名, password AS 密码,email AS 邮箱 
			FROM users WHERE id = ?`, "1",
		)

		// 查看列名
		columns, err := row.Columns()
		if err != nil {
			panic(err)
		}
		fmt.Printf("%#v\n\n", columns)
	}
}
```

输出结果

```bash
[]string{"id", "username", "password", "email", "created_at", "updated_at", "deleted_at"}

created_at
DATETIME
sql.NullTime
false true
6 6 true
0 false

main.User{ID:1, Username:"张三", Password:"KQzNiZxh1MMG", Email:"zhangsan@example.com", CreatedAt:time.Date(2023, time.April, 4, 23, 48, 38, 916301000, time.Local), UpdatedAt:time.Date(2
023, time.April, 4, 23, 48, 38, 916301000, time.Local), DeletedAt:sql.NullTime{Time:time.Date(1, time.January, 1, 0, 0, 0, 0, time.UTC), Valid:false}}

[]string{"ID", "用户名", "密码", "邮箱"}
```

:::

<br />

### 使用事物

::: details 点击查看详情

```go
package main

import (
	"database/sql"
	"fmt"
	"time"

	"github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
)

// User 定义结构体，DeletedAt在查询时有可能为Null值，所以定义为 sql.NullTime，也可以定义为 *time.Time
type User struct {
	ID        int          `db:"id"`
	Username  string       `db:"username"`
	Password  string       `db:"password"`
	Email     string       `db:"email"`
	CreatedAt time.Time    `db:"created_at"`
	UpdatedAt time.Time    `db:"updated_at"`
	DeletedAt sql.NullTime `db:"deleted_at"`
}

// ConnMySQL 连接数据库
func ConnMySQL() (*sqlx.DB, error) {
	// 定义MySQL配置
	mysqlConfig := mysql.Config{
		User:                 "root",
		Passwd:               "QiNqg[l.%;H>>rO9",
		Net:                  "tcp",
		Addr:                 "192.168.48.151:3306",
		DBName:               "demo",
		Collation:            "utf8mb4_general_ci", // 设置字符集和排序规则
		Loc:                  time.Local,           // 设置连接时使用的时区,默认为UTC时区
		ParseTime:            true,                 // 是否将数据库中的TIME或DATETIME字段解析为Go的时间类型（即time.Time)
		Timeout:              5 * time.Second,      // 连接超时时间
		ReadTimeout:          30 * time.Second,     // 读取超时时间
		WriteTimeout:         30 * time.Second,     // 写入超时时间
		CheckConnLiveness:    true,                 // 在使用连接之前检查其存活性
		AllowNativePasswords: true,                 // 允许MySQL身份认证插件mysql_native_password
        MaxAllowedPacket:     16 << 20,             // 控制客户端向MySQL服务器发送的最大数据包大小, 16 MiB
	}

	// 连接数据库: sqlx.Connect = sqlx.Open(不会真正连接数据库) + db.Ping(会真正连接数据库)
	return sqlx.Connect("mysql", mysqlConfig.FormatDSN())
}

func main() {
	// 连接数据库
	db, err := ConnMySQL()
	if err != nil {
		panic(err)
	}
	defer func() { _ = db.Close() }()

	// 注意事项
	// 1、在事物执行期间的插入等语句需要判断错误，如果发生错误则回滚事物
	// 2、事物相关的错误需要判断：sql.ErrTxDone

	// 开启事物
	// Begin开启事物 ：只能执行 Exec 和 Query 方法
	// Beginx开启事物: 支持Exec, Query, Get, Select 等方法
	tx, err := db.Beginx()
	if err != nil {
		panic(err)
	}

	// 执行操作1
	{
		user := User{Username: "john1", Password: "123456", Email: "john1@example.com", CreatedAt: time.Now(), UpdatedAt: time.Now()}
		sqlString := `INSERT INTO users (username, password, email, created_at, updated_at) VALUES
			(:username, :password, :email, :created_at, :updated_at)`
		_, err := tx.NamedExec(sqlString, user)
		if err != nil {
			fmt.Printf("插入数据报错: %v\n", err)
			err := tx.Rollback()
			if err != nil && err != sql.ErrTxDone {
				panic(err)
			}
			fmt.Println("事物回滚成功")
		}
	}

	// 执行操作2
	{
		user := User{Username: "john2", Password: "123456", Email: "john2@example.com", CreatedAt: time.Now(), UpdatedAt: time.Now()}
		sqlString := `INSERT INTO users (username, password, email, created_at, updated_at) VALUES
			(:username, :password, :email, :created_at, :updated_at)`
		_, err := tx.NamedExec(sqlString, user)
		if err != nil {
			fmt.Printf("插入数据报错: %v\n", err)
			err := tx.Rollback()
			if err != nil && err != sql.ErrTxDone {
				panic(err)
			}
			fmt.Println("事物回滚成功")
		}
	}

	// 提交事物
	err = tx.Commit()
	if err != nil {
		fmt.Printf("提交事物报错: %v\n", err)
		err := tx.Rollback()
		if err != nil && err != sql.ErrTxDone {
			panic(err)
		}
		fmt.Println("事物回滚成功")
	}
}
```

输出结果

```bash
插入数据报错: Error 1062 (23000): Duplicate entry 'john1' for key 'users.username'
事物回滚成功
插入数据报错: sql: transaction has already been committed or rolled back
事物回滚成功
提交事物报错: sql: transaction has already been committed or rolled back
事物回滚成功
```

:::

<br />

### 预处理

::: details （1）预处理示例

```go
package main

import (
	"database/sql"
	"fmt"
	"time"

	"github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
)

// User 定义结构体，DeletedAt在查询时有可能为Null值，所以定义为 sql.NullTime，也可以定义为 *time.Time
type User struct {
	ID        int          `db:"id"`
	Username  string       `db:"username"`
	Password  string       `db:"password"`
	Email     string       `db:"email"`
	CreatedAt time.Time    `db:"created_at"`
	UpdatedAt time.Time    `db:"updated_at"`
	DeletedAt sql.NullTime `db:"deleted_at"`
}

// ConnMySQL 连接数据库
func ConnMySQL() (*sqlx.DB, error) {
	// 定义MySQL配置
	mysqlConfig := mysql.Config{
		User:                 "root",
		Passwd:               "QiNqg[l.%;H>>rO9",
		Net:                  "tcp",
		Addr:                 "192.168.48.151:3306",
		DBName:               "demo",
		Collation:            "utf8mb4_general_ci", // 设置字符集和排序规则
		Loc:                  time.Local,           // 设置连接时使用的时区,默认为UTC时区
		ParseTime:            true,                 // 是否将数据库中的TIME或DATETIME字段解析为Go的时间类型（即time.Time)
		Timeout:              5 * time.Second,      // 连接超时时间
		ReadTimeout:          30 * time.Second,     // 读取超时时间
		WriteTimeout:         30 * time.Second,     // 写入超时时间
		CheckConnLiveness:    true,                 // 在使用连接之前检查其存活性
		AllowNativePasswords: true,                 // 允许MySQL身份认证插件mysql_native_password
        MaxAllowedPacket:     16 << 20,             // 控制客户端向MySQL服务器发送的最大数据包大小, 16 MiB
	}

	// 连接数据库: sqlx.Connect = sqlx.Open(不会真正连接数据库) + db.Ping(会真正连接数据库)
	return sqlx.Connect("mysql", mysqlConfig.FormatDSN())
}

func main() {
	// 连接数据库
	db, err := ConnMySQL()
	if err != nil {
		panic(err)
	}
	defer func() { _ = db.Close() }()

	// 注意事项：不要忘记 stmt.Close()

	// 定义预处理语句
	stmt, err := db.Preparex("SELECT * FROM users WHERE id = ?")
	if err != nil {
		panic(err)
	}
	defer func() { _ = stmt.Close() }()

	// 使用预处理语句
	{
		u := User{}
		err = stmt.Get(&u, "1")
		if err != sql.ErrNoRows {
			if err != nil {
				panic(err)
			}
			fmt.Printf("%#v\n\n", u)
		}
	}

	{
		u := User{}
		err = stmt.Get(&u, "2")
		if err != sql.ErrNoRows {
			if err != nil {
				panic(err)
			}
			fmt.Printf("%#v\n\n", u)
		}
	}
}
```

输出结果

```bash
main.User{ID:1, Username:"alice", Password:"123456", Email:"alice@example.com", CreatedAt:time.Date(2023, time.April, 4, 8, 13, 44, 445941000, time.Local), UpdatedAt:time.Date(2023, time
.April, 4, 8, 13, 44, 445941000, time.Local), DeletedAt:sql.NullTime{Time:time.Date(1, time.January, 1, 0, 0, 0, 0, time.UTC), Valid:false}}

main.User{ID:2, Username:"john", Password:"123456", Email:"john@example.com", CreatedAt:time.Date(2023, time.April, 4, 8, 13, 44, 455052000, time.Local), UpdatedAt:time.Date(2023, time.A
pril, 4, 8, 13, 44, 455052000, time.Local), DeletedAt:sql.NullTime{Time:time.Date(1, time.January, 1, 0, 0, 0, 0, time.UTC), Valid:false}}
```

:::

::: details （2）预处理不支持的操作

```go
package main

import (
	"database/sql"
	"time"

	"github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
)

// User 定义结构体，DeletedAt在查询时有可能为Null值，所以定义为 sql.NullTime，也可以定义为 *time.Time
type User struct {
	ID        int          `db:"id"`
	Username  string       `db:"username"`
	Password  string       `db:"password"`
	Email     string       `db:"email"`
	CreatedAt time.Time    `db:"created_at"`
	UpdatedAt time.Time    `db:"updated_at"`
	DeletedAt sql.NullTime `db:"deleted_at"`
}

// ConnMySQL 连接数据库
func ConnMySQL() (*sqlx.DB, error) {
	// 定义MySQL配置
	mysqlConfig := mysql.Config{
		User:                 "root",
		Passwd:               "QiNqg[l.%;H>>rO9",
		Net:                  "tcp",
		Addr:                 "192.168.48.129:3306",
		DBName:               "demo",
		Collation:            "utf8mb4_general_ci", // 设置字符集和排序规则
		Loc:                  time.Local,           // 设置连接时使用的时区,默认为UTC时区
		ParseTime:            true,                 // 是否将数据库中的TIME或DATETIME字段解析为Go的时间类型（即time.Time)
		Timeout:              5 * time.Second,      // 连接超时时间
		ReadTimeout:          30 * time.Second,     // 读取超时时间
		WriteTimeout:         30 * time.Second,     // 写入超时时间
		CheckConnLiveness:    true,                 // 在使用连接之前检查其存活性
		AllowNativePasswords: true,                 // 允许MySQL身份认证插件mysql_native_password
        MaxAllowedPacket:     16 << 20,             // 控制客户端向MySQL服务器发送的最大数据包大小, 16 MiB
	}

	// 连接数据库: sqlx.Connect = sqlx.Open(不会真正连接数据库) + db.Ping(会真正连接数据库)
	return sqlx.Connect("mysql", mysqlConfig.FormatDSN())
}

func main() {
	// 连接数据库
	db, err := ConnMySQL()
	if err != nil {
		panic(err)
	}
	defer func() { _ = db.Close() }()

	// 注意事项：不要忘记 stmt.Close()

	// 定义预处理语句
	stmt, err := db.Preparex("INSERT INTO users (username, password, email, created_at, updated_at) VALUES (?, ?, ?, ?, ?)")
	if err != nil {
		panic(err)
	}
	defer func() { _ = stmt.Close() }()

	// 使用预处理语句

	// 错误写法，不能传递切片
	//{
	//	users := []User{
	//		{Username: "bob1", Password: "123456", Email: "bob1@example.com", CreatedAt: time.Now(), UpdatedAt: time.Now()},
	//		{Username: "bob2", Password: "123456", Email: "bob2@example.com", CreatedAt: time.Now(), UpdatedAt: time.Now()},
	//		{Username: "bob3", Password: "123456", Email: "bob3@example.com", CreatedAt: time.Now(), UpdatedAt: time.Now()},
	//		{Username: "bob4", Password: "123456", Email: "bob4@example.com", CreatedAt: time.Now(), UpdatedAt: time.Now()},
	//		{Username: "bob5", Password: "123456", Email: "bob5@example.com", CreatedAt: time.Now(), UpdatedAt: time.Now()},
	//	}
	//	_, err = stmt.Exec(users)
	//	if err != nil {
	//		panic(err)
	//	}
	//}

	// 错误写法，不能传递结构体
	//{
	//	user := User{Username: "bob1", Password: "123456", Email: "bob1@example.com", CreatedAt: time.Now(), UpdatedAt: time.Now()}
	//	_, err = stmt.Exec(user)
	//	if err != nil {
	//		panic(err)
	//	}
	//}

	// 正确写法
	{
		user := User{Username: "bob1", Password: "123456", Email: "bob1@example.com", CreatedAt: time.Now(), UpdatedAt: time.Now()}
		_, err = stmt.Exec(user.Username, user.Password, user.Email, user.CreatedAt, user.UpdatedAt)
		if err != nil {
			panic(err)
		}
	}
}
```

:::

<br />

### 统计信息

::: details （1）模拟MySQL客户端内置命令status

```go
package main

import (
	"fmt"
	"time"

	"github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
)

// ConnMySQL 连接数据库
func ConnMySQL() (*sqlx.DB, error) {
	// 定义MySQL配置
	mysqlConfig := mysql.Config{
		User:                 "root",
		Passwd:               "QiNqg[l.%;H>>rO9",
		Net:                  "tcp",
		Addr:                 "192.168.48.151:3306",
		DBName:               "demo",
		Collation:            "utf8mb4_general_ci", // 设置字符集和排序规则
		Loc:                  time.Local,           // 设置连接时使用的时区,默认为UTC时区
		ParseTime:            true,                 // 是否将数据库中的TIME或DATETIME字段解析为Go的时间类型（即time.Time)
		Timeout:              5 * time.Second,      // 连接超时时间
		ReadTimeout:          30 * time.Second,     // 读取超时时间
		WriteTimeout:         30 * time.Second,     // 写入超时时间
		CheckConnLiveness:    true,                 // 在使用连接之前检查其存活性
		AllowNativePasswords: true,                 // 允许MySQL身份认证插件mysql_native_password
        MaxAllowedPacket:     16 << 20,             // 控制客户端向MySQL服务器发送的最大数据包大小, 16 MiB
	}

	// 连接数据库
	// sqlx.Connect = sqlx.Open + db.Ping,也可以使用 sql.MustConnect, 连接不成功就panic
	return sqlx.Connect("mysql", mysqlConfig.FormatDSN())
}

func main() {
	// 连接数据库
	db, err := ConnMySQL()
	if err != nil {
		panic(err)
	}
	defer func() { _ = db.Close() }()

	// 获取连接ID
	{
		var ConnectionID int64
		err := db.QueryRow("SELECT CONNECTION_ID()").Scan(&ConnectionID)
		if err != nil {
			panic(err)
		}
		fmt.Printf("%-30s%d\n", "Connection id:", ConnectionID)
	}

	// 获取当前数据库
	{
		var CurrentDatabase string
		err := db.QueryRow("SELECT DATABASE()").Scan(&CurrentDatabase)
		if err != nil {
			panic(err)
		}
		fmt.Printf("%-30s%s\n", "Current database:", CurrentDatabase)
	}

	// 获取当前用户, 还可以使用 SELECT CURRENT_USER(),返回值root@%,并不满足需求
	{
		var CurrentUser string
		err := db.QueryRow("SELECT USER();").Scan(&CurrentUser)
		if err != nil {
			panic(err)
		}
		fmt.Printf("%-30s%s\n", "Current user:", CurrentUser)
	}

	// 获取SSL
	{
		var SSL = make(map[string]any)
		err := db.QueryRowx("SHOW STATUS LIKE 'Ssl_cipher';").MapScan(SSL)
		if err != nil {
			panic(err)
		}
		v, ok := SSL["Value"]
		cipher := v.([]byte)
		if ok {
			if len(cipher) == 0 {
				fmt.Printf("%-30s%s\n", "SSL:", "Not in use")
			} else {
				fmt.Printf("%-30s%s\n", "SSL:", cipher) // 这里的输出并未和MySQL客户端验证
			}
		} else {
			fmt.Printf("%-30s%s\n", "SSL:", "Unknown")
		}
	}

	// 获取MySQL版本
	{
		var ServerVersion string
		sql := "SELECT CONCAT_WS(' ', @@version, @@version_comment) AS server_version;"
		err := db.QueryRow(sql).Scan(&ServerVersion)
		if err != nil {
			panic(err)
		}
		fmt.Printf("%-30s%s\n", "Server version:", ServerVersion)
	}

	// 获取协议版本
	{
		var ProtocolVersion string
		err := db.QueryRow("SELECT @@protocol_version;").Scan(&ProtocolVersion)
		if err != nil {
			panic(err)
		}
		fmt.Printf("%-30s%s\n", "Protocol version:", ProtocolVersion)
	}

	// 获取服务端字符集
	{
		var ServerCharacterset string
		err := db.QueryRow("SELECT @@character_set_server;").Scan(&ServerCharacterset)
		if err != nil {
			panic(err)
		}
		fmt.Printf("%-30s%s\n", "Server characterset:", ServerCharacterset)
	}

	// 获取数据库字符集
	{
		var DatabaseCharacterset string
		err := db.QueryRow("SELECT @@character_set_database;").Scan(&DatabaseCharacterset)
		if err != nil {
			panic(err)
		}
		fmt.Printf("%-30s%s\n", "Db     characterset:", DatabaseCharacterset)
	}

	// 获取客户端字符集
	{
		var ClientCharacterset string
		err := db.QueryRow("SELECT @@character_set_client;").Scan(&ClientCharacterset)
		if err != nil {
			panic(err)
		}
		fmt.Printf("%-30s%s\n", "Client characterset:", ClientCharacterset)
	}

	// 获取链接字符集
	{
		var ConnectionCharacterset string
		err := db.QueryRow("SELECT @@character_set_connection;").Scan(&ConnectionCharacterset)
		if err != nil {
			panic(err)
		}
		fmt.Printf("%-30s%s\n", "Conn.  characterset:", ConnectionCharacterset)
	}

	// 获取Socket
	{
		var Socket string
		err := db.QueryRow("SELECT @@socket;").Scan(&Socket)
		if err != nil {
			panic(err)
		}
		fmt.Printf("%-30s%s\n", "UNIX socket:", Socket)
	}

	// 获取二进制数据编码方式(我并不确认SQL一定是正确的)
	{
		var BinaryDataAs string
		sql := "SELECT CASE @@SESSION.binlog_format WHEN 'ROW' THEN 'Hexadecimal' WHEN 'MIXED' THEN 'Hexadecimal' ELSE 'Text' END AS `Binary data as`;"
		err := db.QueryRow(sql).Scan(&BinaryDataAs)
		if err != nil {
			panic(err)
		}
		fmt.Printf("%-30s%s\n", "Binary data as:", BinaryDataAs)
	}

	// 获取Uptime
	{
		// 获取秒数
		var UptimeSecond int64
		sql := "SELECT VARIABLE_VALUE FROM performance_schema.global_status WHERE VARIABLE_NAME='Uptime';"
		err := db.QueryRow(sql).Scan(&UptimeSecond)
		if err != nil {
			panic(err)
		}
		// 转为人类易读值, 略
		fmt.Printf("%-30s%d\n", "Uptime:", UptimeSecond)
	}
}
```

输出结果

```bash
Connection id:                154
Current database:             demo                               
Current user:                 root@192.168.48.1                  
SSL:                          Not in use                         
Server version:               8.0.30 MySQL Community Server - GPL
Protocol version:             10                                 
Server characterset:          utf8mb4                            
Db     characterset:          utf8mb4                            
Client characterset:          utf8mb4                            
Conn.  characterset:          utf8mb4                            
UNIX socket:                  /var/run/mysqld/mysqld.sock        
Binary data as:               Hexadecimal                        
Uptime:                       74528
```

:::

<br />

## 安全

### 预防注入

::: details 点击查看详情

SQL注入攻击原因：用户的输入可以被解释成SQL代码，从而引起注入攻击漏洞

SQL注入攻击预防：参数化查询将用户输入视为参数，而不是SQL代码，从而避免SQL注入攻击

```go
package main

import (
	"database/sql"
	"fmt"
	"time"

	"github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
)

type User struct {
	ID        int          `db:"id"`
	Username  string       `db:"username"`
	Password  string       `db:"password"`
	Email     string       `db:"email"`
	CreatedAt time.Time    `db:"created_at"`
	UpdatedAt time.Time    `db:"updated_at"`
	DeletedAt sql.NullTime `db:"deleted_at"`
}

// ConnMySQL 连接数据库
func ConnMySQL() (*sqlx.DB, error) {
	// 定义MySQL配置
	mysqlConfig := mysql.Config{
		User:                 "root",
		Passwd:               "QiNqg[l.%;H>>rO9",
		Net:                  "tcp",
		Addr:                 "192.168.48.151:3306",
		DBName:               "demo",
		Collation:            "utf8mb4_general_ci", // 设置字符集和排序规则
		Loc:                  time.Local,           // 设置连接时使用的时区,默认为UTC时区
		ParseTime:            true,                 // 是否将数据库中的TIME或DATETIME字段解析为Go的时间类型（即time.Time)
		Timeout:              5 * time.Second,      // 连接超时时间
		ReadTimeout:          30 * time.Second,     // 读取超时时间
		WriteTimeout:         30 * time.Second,     // 写入超时时间
		CheckConnLiveness:    true,                 // 在使用连接之前检查其存活性
		AllowNativePasswords: true,                 // 允许MySQL身份认证插件mysql_native_password
        MaxAllowedPacket:     16 << 20,             // 控制客户端向MySQL服务器发送的最大数据包大小, 16 MiB
	}

	// 连接数据库
	// sqlx.Connect = sqlx.Open + db.Ping,也可以使用 sql.MustConnect, 连接不成功就panic
	return sqlx.Connect("mysql", mysqlConfig.FormatDSN())
}

func main() {
	// 连接数据库
	db, err := ConnMySQL()
	if err != nil {
		panic(err)
	}
	defer func() { _ = db.Close() }()

	// 假设这是由用户传过来的参数
	// 正常情况下应该是一个数字(字符串类型)
	// 但是这是攻击者精心构造的代码(其实也不怎么精心..)
	var id = "9' or id='1"

	// 根据ID查询某个用户: 可以防止注入攻击的代码
	{
		user := User{}
		err = db.Get(&user, "SELECT * FROM users WHERE id = ?", id)
		if err != sql.ErrNoRows {
			if err != nil {
				panic(err)
			}
			fmt.Printf("Query1: %#v\n", user)
		}
	}

	// 根据ID查询某个用户: 具有注入攻击隐患的代码
	{
		user := User{}
		err = db.Get(&user, fmt.Sprintf("SELECT * FROM users WHERE id = '%s'", id))
		if err != sql.ErrNoRows {
			if err != nil {
				panic(err)
			}
			fmt.Printf("Query2: %#v\n", user)
		}
	}
}
```

输出结果

```bash
Query1: main.User{ID:9, Username:"89fde5d6-609e-4f75-8307-aab7b5d6dce0", Password:"EwOo0IaHi00j", Email:"af32734d-928b-4632-9ad5-84ca679fec30", CreatedAt:time.Date(2023, time.April, 4, 2
3, 48, 38, 916301000, time.Local), UpdatedAt:time.Date(2023, time.April, 4, 23, 48, 38, 916301000, time.Local), DeletedAt:sql.NullTime{Time:time.Date(1, time.January, 1, 0, 0, 0, 0, time
.UTC), Valid:false}}
Query2: main.User{ID:1, Username:"张三", Password:"KQzNiZxh1MMG", Email:"zhangsan@example.com", CreatedAt:time.Date(2023, time.April, 4, 23, 48, 38, 916301000, time.Local), UpdatedAt:tim
e.Date(2023, time.April, 4, 23, 48, 38, 916301000, time.Local), DeletedAt:sql.NullTime{Time:time.Date(1, time.January, 1, 0, 0, 0, 0, time.UTC), Valid:false}}
```

:::

<br />

### 字段加密

::: details （1）MySQL CLI使用MySQL自带的AES对称加密函数

```bash
# 加密
#   AES_ENCRYPT用于加密,返回二进制类型数据(BINARY类型)
#   HEX用于将二进制转为16进制
mysql> select HEX(AES_ENCRYPT("Hello World!", "mykey")) AS password;
+----------------------------------+
| password                         |
+----------------------------------+
| 87DA3B6CBF28C5F5CCF2BCA4D3EA90D6 |
+----------------------------------+
1 row in set (0.00 sec)

# 解密 - 方式1
#   UNHEX 将十六进制转为二进制
#   AES_DECRYPT解密,返回二进制类型数据(BINARY类型)
#   CONVERT用于将二进制转为字符串
mysql> SELECT CONVERT(AES_DECRYPT(UNHEX('87DA3B6CBF28C5F5CCF2BCA4D3EA90D6'), "mykey") USING utf8mb4) AS password;
+--------------+
| password     |
+--------------+
| Hello World! |
+--------------+
1 row in set (0.00 sec)

# 解密 - 方式2
#   CAST用于将二进制转为字符串
mysql> SELECT CAST(AES_DECRYPT(UNHEX('87DA3B6CBF28C5F5CCF2BCA4D3EA90D6'), 'mykey') AS CHAR(50)) AS password;
+--------------+
| password     |
+--------------+
| Hello World! |
+--------------+
1 row in set (0.00 sec)

# -----------------------------------------------------------------------------------------
# 备注
# MySQL二进制数据经常以十六进制格式表示
# 下面的返回值实际是二进制，只是用十六进制表示而已
mysql> select AES_ENCRYPT("12345", "mykey") AS password;
+------------------------------------+
| password                           |
+------------------------------------+
| 0x9F9EB20579D028126FF3AC332DA9CAFB |
+------------------------------------+
1 row in set (0.01 sec)

# -----------------------------------------------------------------------------------------
# 其他
# AES加解密最好通过程序来做，但在特殊情况下也可以直接直接使用MySQL的AES加解密
```

:::

::: details （2）代码中使用MySQL自带的AES对称加密函数

```go
package main

import (
	"database/sql"
	"fmt"
	"time"

	"github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
)

// User 定义结构体，DeletedAt在查询时有可能为Null值，所以定义为 sql.NullTime，也可以定义为 *time.Time
type User struct {
	ID        int          `db:"id"`
	Username  string       `db:"username"`
	Password  string       `db:"password"`
	Email     string       `db:"email"`
	CreatedAt time.Time    `db:"created_at"`
	UpdatedAt time.Time    `db:"updated_at"`
	DeletedAt sql.NullTime `db:"deleted_at"`
}

// ConnMySQL 连接数据库
func ConnMySQL() (*sqlx.DB, error) {
	// 定义MySQL配置
	mysqlConfig := mysql.Config{
		User:                 "root",
		Passwd:               "QiNqg[l.%;H>>rO9",
		Net:                  "tcp",
		Addr:                 "192.168.48.151:3306",
		DBName:               "demo",
		Collation:            "utf8mb4_general_ci", // 设置字符集和排序规则
		Loc:                  time.Local,           // 设置连接时使用的时区,默认为UTC时区
		ParseTime:            true,                 // 是否将数据库中的TIME或DATETIME字段解析为Go的时间类型（即time.Time)
		Timeout:              5 * time.Second,      // 连接超时时间
		ReadTimeout:          30 * time.Second,     // 读取超时时间
		WriteTimeout:         30 * time.Second,     // 写入超时时间
		CheckConnLiveness:    true,                 // 在使用连接之前检查其存活性
		AllowNativePasswords: true,                 // 允许MySQL身份认证插件mysql_native_password
		MaxAllowedPacket:     16 << 20,             // 控制客户端向MySQL服务器发送的最大数据包大小, 16 MiB
	}

	// 连接数据库: sqlx.Connect = sqlx.Open(不会真正连接数据库) + db.Ping(会真正连接数据库)
	return sqlx.Connect("mysql", mysqlConfig.FormatDSN())
}

func main() {
	// 连接数据库
	db, err := ConnMySQL()
	if err != nil {
		panic(err)
	}
	defer func() { _ = db.Close() }()

	// 定义密钥,加解密使用同一个密钥
	secretKey := "mykey"

	// 写入数据
	{
		user := User{
			Username:  "wangwu",
			Password:  "123456",
			Email:     "wangwu@example.com",
			CreatedAt: time.Now(),
			UpdatedAt: time.Now(),
		}
		sqlString := `INSERT INTO users (username, password, email, created_at, updated_at) 
						VALUES (?, HEX(AES_ENCRYPT(?, ?)), ?,?,?)`
		_, err = db.Exec(sqlString, user.Username, user.Password, secretKey, user.Email, user.CreatedAt, user.UpdatedAt)
		if err != nil {
			panic(err)
		}
	}

	// 查询数据,不能直接写*，要把所有字段都写上
	{
		var user User
		err := db.Get(&user, `
					SELECT id, username,
					    AES_DECRYPT(UNHEX(password), ?) AS password,
						email, created_at, updated_at, deleted_at
					FROM users
					WHERE username = ?`,
			secretKey, "wangwu")
		if err != nil {
			panic(err)
		}
		fmt.Printf("%#v\n", user)
	}
}
```

输出结果

```bash
main.User{ID:30000013, Username:"wangwu", Password:"123456", Email:"wangwu@example.com", CreatedAt:time.Date(2023, time.April, 7, 14, 51, 36, 10812000, time.Local), UpdatedAt:time.Date(2
023, time.April, 7, 14, 51, 36, 10812000, time.Local), DeletedAt:sql.NullTime{Time:time.Date(1, time.January, 1, 0, 0, 0, 0, time.UTC), Valid:false}}

# 在数据库中查询一下
mysql> select id,username,password,email from users where username = "wangwu";
+----------+----------+----------------------------------+--------------------+
| id       | username | password                         | email              |
+----------+----------+----------------------------------+--------------------+
| 30000013 | wangwu   | 7BB9FE4E6292A5D7CCD749755BC6B593 | wangwu@example.com |
+----------+----------+----------------------------------+--------------------+
1 row in set (0.00 sec)
```

:::

<br />

## 海量数据操作

### 生成数据

::: details 创建用户表

```sql
mysql> create database demo;

mysql> use demo;

mysql> CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(128) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(128) COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `deleted_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
```

:::

::: details （1）使用 mysql_random_data_load 写入数据

Github：[https://github.com/Percona-Lab/mysql_random_data_load](https://github.com/Percona-Lab/mysql_random_data_load)

```bash
# 安装mysql_random_data_load 
wget -c https://github.com/Percona-Lab/mysql_random_data_load/releases/download/v0.1.12/mysql_random_data_load_0.1.12_Linux_x86_64.tar.gz
tar zxf mysql_random_data_load_0.1.12_Linux_x86_64.tar.gz
mv mysql_random_data_load /usr/local/bin/
rm -f mysql_random_data_load_0.1.12_Linux_x86_64.tar.gz LICENSE README.md

# 生成500万条假数据，大约需要花费30分钟(此时间不具备参考性)
# 参数说明
#   demo     指定库名
#   users    指定表名
#   500_0000 指定插入多少行数据
mysql_random_data_load demo users 500_0000 --user=root --password="QiNqg[l.%;H>>rO9" --max-threads=10
```

:::

::: details （2）自己写代码写入数据

```go
package main

import (
	"database/sql"
	"fmt"
	"sync"
	"time"

	"github.com/brianvoe/gofakeit/v6"
	"github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
)

// User 定义结构体
type User struct {
	ID        int          `db:"id"`
	Username  string       `db:"username"`
	Password  string       `db:"password"`
	Email     string       `db:"email"`
	CreatedAt time.Time    `db:"created_at"`
	UpdatedAt time.Time    `db:"updated_at"`
	DeletedAt sql.NullTime `db:"deleted_at"`
}

// ConnMySQL 连接数据库
func ConnMySQL() (*sqlx.DB, error) {
	// 定义MySQL配置
	mysqlConfig := mysql.Config{
		User:                 "root",
		Passwd:               "QiNqg[l.%;H>>rO9",
		Net:                  "tcp",
		Addr:                 "192.168.48.151:3306",
		DBName:               "demo",
		Collation:            "utf8mb4_general_ci", // 设置字符集和排序规则
		Loc:                  time.Local,           // 设置连接时使用的时区,默认为UTC时区
		ParseTime:            true,                 // 是否将数据库中的TIME或DATETIME字段解析为Go的时间类型（即time.Time)
		Timeout:              5 * time.Second,      // 连接超时时间
		ReadTimeout:          30 * time.Second,     // 读取超时时间
		WriteTimeout:         30 * time.Second,     // 写入超时时间
		CheckConnLiveness:    true,                 // 在使用连接之前检查其存活性
		AllowNativePasswords: true,                 // 允许MySQL身份认证插件mysql_native_password
        MaxAllowedPacket:     16 << 20,             // 控制客户端向MySQL服务器发送的最大数据包大小, 16 MiB
	}

	return sqlx.Connect("mysql", mysqlConfig.FormatDSN())
}

func main() {
	// 统计时间
	start := time.Now()
	defer func() { fmt.Printf("Used %.0f seconds", time.Since(start).Seconds()) }()

	// 连接数据库
	db, err := ConnMySQL()
	if err != nil {
		panic(err)
	}
	defer func() { _ = db.Close() }()

	// 连接池设置
	db.SetMaxOpenConns(100)
	db.SetMaxIdleConns(100)

	// 生成大量数据
	var (
		totalRows = 1000 * 10000            // 总共生成多少条记录
		chunkSize = 1000                    // 每次写入多少条记录
		loopCount = totalRows / chunkSize   // 计算循环次数
		chunkCh   = make(chan []User, 1024) // 用于传递数据的channel
	)
	go func() {
		for i := 0; i < loopCount; i++ {
			var users []User
			for j := 0; j < chunkSize; j++ {
				user := User{
					Username:  gofakeit.UUID(),
					Password:  gofakeit.Password(true, true, true, false, false, 12),
					Email:     gofakeit.UUID(),
					CreatedAt: time.Now(),
					UpdatedAt: time.Now(),
				}
				users = append(users, user)
			}
			chunkCh <- users
		}
		close(chunkCh)
	}()

	// 并发写入数据库
	var (
		wg          = sync.WaitGroup{}
		concurrency = 10
	)

	for i := 0; i < concurrency; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			for {
				users, ok := <-chunkCh
				if !ok {
					break
				}
				sqlString := `INSERT INTO users (username, password, email, created_at, updated_at) VALUES
						(:username, :password, :email, :created_at, :updated_at)`
				_, err = db.NamedExec(sqlString, users)
				if err != nil {
					panic(err)
				}
			}
		}()
	}
	wg.Wait()
}
```

输出结果

```bash
# 写入1000W条数据大约花费10分钟(此时间不具备参考性)
Used 597 seconds

# 去数据库中查一下
mysql> select count(*) from users;
+----------+
| count(*) |
+----------+
| 10000000 |
+----------+
1 row in set (0.27 sec)
```

:::

<br />

### 查询数据

::: details （1）假设需要查询出一百万数据并写入到文件中：使用 mysql命令 + 重定向

```bash
# 第一个终端执行 docker stats 或 top 监控 MySQL Server CPU使用率
[root@localhost ~]# docker stats
CONTAINER ID   NAME                CPU %     MEM USAGE / LIMIT     MEM %     NET I/O           BLOCK I/O         PIDS
c600227c7470   demo-mysql-8.0.30   1.22%     2.459GiB / 3.682GiB   66.78%    34.1MB / 1.61GB   35.6GB / 69.6MB   44

# 第二个终端执行select语句
[root@localhost ~]# time docker container exec -it demo-mysql-8.0.30 mysql -uroot -P3306 -p"QiNqg[l.%;H>>rO9" -e "select * from demo.users where id <= 1000000 " > mysql_data.csv

real    0m12.219s
user    0m1.096s
sys     0m4.387s

# 观察第一个终端中MySQL使用率为100+，即占满一个核心
CONTAINER ID   NAME                CPU %     MEM USAGE / LIMIT     MEM %     NET I/O           BLOCK I/O         PIDS
c600227c7470   demo-mysql-8.0.30   118.89%   2.684GiB / 3.682GiB   72.88%    34.1MB / 1.61GB   35.6GB / 69.6MB   45

# 统计一下文件行数，多出来的5行是因为有表格、表头所占
[root@localhost ~]# wc -l mysql_data.csv 
1000005 mysql_data.csv

# 总结
# 使用MySQL客户端命令导出一百万行数据耗时12秒，CPU跑满一个核心
```

:::

::: details （2）假设需要查询出一百万数据并写入到文件中：使用 Go Select 一次性加载数据到内存中

```go
package main

import (
	"bufio"
	"database/sql"
	"fmt"
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
)

// User 定义结构体
type User struct {
	ID        int          `db:"id"`
	Username  string       `db:"username"`
	Password  string       `db:"password"`
	Email     string       `db:"email"`
	CreatedAt time.Time    `db:"created_at"`
	UpdatedAt time.Time    `db:"updated_at"`
	DeletedAt sql.NullTime `db:"deleted_at"`
}

// ConnMySQL 连接数据库
func ConnMySQL() (*sqlx.DB, error) {
	// 定义MySQL配置
	mysqlConfig := mysql.Config{
		User:                 "root",
		Passwd:               "QiNqg[l.%;H>>rO9",
		Net:                  "tcp",
		Addr:                 "192.168.48.129:3306",
		DBName:               "demo",
		Collation:            "utf8mb4_general_ci", // 设置字符集和排序规则
		Loc:                  time.Local,           // 设置连接时使用的时区,默认为UTC时区
		ParseTime:            true,                 // 是否将数据库中的TIME或DATETIME字段解析为Go的时间类型（即time.Time)
		Timeout:              5 * time.Second,      // 连接超时时间
		ReadTimeout:          30 * time.Second,     // 读取超时时间
		WriteTimeout:         30 * time.Second,     // 写入超时时间
		CheckConnLiveness:    true,                 // 在使用连接之前检查其存活性
		AllowNativePasswords: true,                 // 允许MySQL身份认证插件mysql_native_password
        MaxAllowedPacket:     16 << 20,             // 控制客户端向MySQL服务器发送的最大数据包大小, 16 MiB
	}

	return sqlx.Connect("mysql", mysqlConfig.FormatDSN())
}

func main() {
	// 统计时间
	start := time.Now()
	defer func() { fmt.Printf("Used %.0f seconds", time.Since(start).Seconds()) }()

	// 连接数据库
	db, err := ConnMySQL()
	if err != nil {
		panic(err)
	}
	defer func() { _ = db.Close() }()

	// 打开文件
	file, err := os.OpenFile("go_data.csv", os.O_RDWR|os.O_CREATE, 0644)
	if err != nil {
		panic(err)
	}
	defer func() { _ = file.Close() }()

	// 设置写缓冲区，大小写为 32KB
	buf := bufio.NewWriterSize(file, 32*1024)
	defer func() {
		err = buf.Flush()
		if err != nil {
			panic(err)
		}
	}()

	// 查询数据库
	var users []User
	err = db.Select(&users, "select * from users where id <= 10000000")
	if err != nil {
		panic(err)
	}

	for _, user := range users {
		// deleted_at 字段特殊处理
		var deleted_at string
		if user.DeletedAt.Valid {
			deleted_at = user.DeletedAt.Time.Format(time.DateTime)
		} else {
			deleted_at = "NULL"
		}

		// 转为字符串
		columns := []string{
			strconv.Itoa(user.ID),
			user.Username,
			user.Password,
			user.Email,
			user.CreatedAt.Format(time.DateTime),
			user.UpdatedAt.Format(time.DateTime),
			deleted_at,
		}
		row := strings.Join(columns, ",")

		// 写入buffer
		_, err = buf.WriteString(row + "\n")
		if err != nil {
			panic(err)
		}
	}
}
```

输出结果

```bash
[root@localhost ~]# time ./main
Used 5 seconds
real    0m4.709s
user    0m3.958s
sys     0m2.321s

# 分析
# Select可以很好地完成工作，但是Select会把数据全部写入切片中，随着数据量增大，很可能会导致OOM
# 所以此方案不在考虑范围内
```

:::

::: details （3）假设需要查询出一百万数据并写入到文件中：使用 Go Query 游标遍历

```go
package main

import (
	"bufio"
	"database/sql"
	"fmt"
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
)

// User 定义结构体
type User struct {
	ID        int          `db:"id"`
	Username  string       `db:"username"`
	Password  string       `db:"password"`
	Email     string       `db:"email"`
	CreatedAt time.Time    `db:"created_at"`
	UpdatedAt time.Time    `db:"updated_at"`
	DeletedAt sql.NullTime `db:"deleted_at"`
}

// ConnMySQL 连接数据库
func ConnMySQL() (*sqlx.DB, error) {
	// 定义MySQL配置
	mysqlConfig := mysql.Config{
		User:                 "root",
		Passwd:               "QiNqg[l.%;H>>rO9",
		Net:                  "tcp",
		Addr:                 "192.168.48.151:3306",
		DBName:               "demo",
		Collation:            "utf8mb4_general_ci", // 设置字符集和排序规则
		Loc:                  time.Local,           // 设置连接时使用的时区,默认为UTC时区
		ParseTime:            true,                 // 是否将数据库中的TIME或DATETIME字段解析为Go的时间类型（即time.Time)
		Timeout:              5 * time.Second,      // 连接超时时间
		ReadTimeout:          30 * time.Second,     // 读取超时时间
		WriteTimeout:         30 * time.Second,     // 写入超时时间
		CheckConnLiveness:    true,                 // 在使用连接之前检查其存活性
		AllowNativePasswords: true,                 // 允许MySQL身份认证插件mysql_native_password
        MaxAllowedPacket:     16 << 20,             // 控制客户端向MySQL服务器发送的最大数据包大小, 16 MiB
	}

	return sqlx.Connect("mysql", mysqlConfig.FormatDSN())
}

func main() {
	// 统计时间
	start := time.Now()
	defer func() { fmt.Printf("Used %.0f seconds", time.Since(start).Seconds()) }()

	// 连接数据库
	db, err := ConnMySQL()
	if err != nil {
		panic(err)
	}
	defer func() { _ = db.Close() }()

	// 打开文件
	file, err := os.OpenFile("go_data.csv", os.O_RDWR|os.O_CREATE, 0644)
	if err != nil {
		panic(err)
	}
	defer func() { _ = file.Close() }()

	// 设置写缓冲区，大小写为 32KB
	buf := bufio.NewWriterSize(file, 32*1024)
	defer func() {
		err = buf.Flush()
		if err != nil {
			panic(err)
		}
	}()

	// 查询数据库
	rows, err := db.Queryx("select * from users where id <= 1000000")
	if err != nil {
		panic(err)
	}
	defer func() { _ = rows.Close() }()

	// 遍历游标
	for rows.Next() {
		var user User
		err = rows.StructScan(&user)
		if err != nil {
			panic(err)
		}

		// deleted_at 字段特殊处理
		var deleted_at string
		if user.DeletedAt.Valid {
			deleted_at = user.DeletedAt.Time.Format(time.DateTime)
		} else {
			deleted_at = "NULL"
		}

		// 转为字符串
		columns := []string{
			strconv.Itoa(user.ID),
			user.Username,
			user.Password,
			user.Email,
			user.CreatedAt.Format(time.DateTime),
			user.UpdatedAt.Format(time.DateTime),
			deleted_at,
		}
		row := strings.Join(columns, ",")

		// 写入buffer
		_, err = buf.WriteString(row + "\n")
		if err != nil {
			panic(err)
		}
	}
}
```

输出结果

```bash
# 第一个终端执行 docker stats 或 top 监控 MySQL Server CPU使用率
[root@localhost ~]# docker stats
CONTAINER ID   NAME                CPU %     MEM USAGE / LIMIT     MEM %     NET I/O           BLOCK I/O         PIDS
c600227c7470   demo-mysql-8.0.30   1.22%     2.459GiB / 3.682GiB   66.78%    34.1MB / 1.61GB   35.6GB / 69.6MB   44

# 第二个终端执行Go编译好的二进制文件，或者直接在GoLand中执行
[root@localhost ~]# time ./main
Used 3 seconds
real    0m3.029s
user    0m2.951s
sys     0m0.576s

# 观察第一个终端中MySQL使用率最高为单核心的30%
CONTAINER ID   NAME                CPU %     MEM USAGE / LIMIT     MEM %     NET I/O           BLOCK I/O         PIDS
c600227c7470   demo-mysql-8.0.30   28.32%    2.459GiB / 3.682GiB   66.79%    34.5MB / 1.91GB   35.6GB / 69.6MB   44

# 统计一下文件行数
[root@localhost ~]# wc -l go_data.csv 
1000000 go_data.csv

# 总结
# 使用Go MySQL库导出一百万行数据耗时3秒，CPU占用单个核心的30%
```

:::

::: details （4）假设需要查询出一百万数据并写入到文件中：优化 Go代码

优化思路：适当的延长执行时间（假设每处理1W条数据休眠1秒），换取MySQL CPU低使用率

```go
	// 遍历游标
	var counter = 10000         // 添加此行
	for rows.Next() {
        // 添加以下几行代码
		counter--
		if counter == 0 {
			time.Sleep(time.Second)
			counter = 10000
		}
		...
```

输出结果

```bash
# 程序执行耗时, 总共100W数据，每处理1W条数据休眠1秒，总共103秒完成
Used 103 seconds

# MySQL CPU使用率最高4%，平均在2%左右，增加了1%的CPU使用率。优化后效果很可观
CONTAINER ID   NAME                CPU %     MEM USAGE / LIMIT     MEM %     NET I/O           BLOCK I/O         PIDS
c600227c7470   demo-mysql-8.0.30   1.99%     2.459GiB / 3.682GiB   66.79%    38.1MB / 2.09GB   35.6GB / 69.6MB   
```

:::
