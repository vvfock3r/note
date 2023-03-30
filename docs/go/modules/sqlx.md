# sqlx

Github：[https://github.com/jmoiron/sqlx](https://github.com/jmoiron/sqlx)

文档：[https://pkg.go.dev/github.com/jmoiron/sqlx](https://pkg.go.dev/github.com/jmoiron/sqlx)

<br />

## 安装和说明

`database/sql` 是 Go 语言标准库中的一个包，提供了一组通用的接口和类型

`sqlx` 是一个在 `database/sql` 包的基础上封装的库，提供了一些更高级的功能和便利的接口

`go-sql-driver/mysql` 是一个第三方的 Go MySQL 驱动程序，实现了 `database/sql` 包所定义的接口

因此，`database/sql`和`sqlx`属于一类库，仅提供数据库操作接口，``go-sql-driver/mysql` 是一个 Go MySQL 驱动程序，用于实现接口

```bash
go get github.com/jmoiron/sqlx
go get github.com/go-sql-driver/mysql
```

<br />

## 连接数据库

::: details （1）连接MySQL

```go
package main

import (
	"fmt"
	"time"

	"github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
)

func ConnMySQL(config mysql.Config) (*sqlx.DB, error) {
	// 连接 MySQL 数据库
	db, err := sqlx.Open("mysql", config.FormatDSN())
	if err != nil {
		return nil, err
	}

	// 测试连接是否成功
	err = db.Ping()
	if err != nil {
		return nil, err
	}

	return db, nil
}

func main() {
	// 定义MySQL配置
	mysqlConfig := mysql.Config{
		User:              "root",
		Passwd:            "QiNqg[l.%;H>>rO9",
		Net:               "tcp",
		Addr:              "192.168.48.151:3306",
		DBName:            "demo",
		Collation:         "utf8mb4_general_ci", // 设置字符集和排序规则
		Loc:               time.Local,           // 设置连接时使用的时区,默认为UTC时区
		ParseTime:         true,                 // 是否将数据库中的TIME或DATETIME字段解析为Go的时间类型（即time.Time)
		Timeout:           5 * time.Second,      // 连接超时时间
		ReadTimeout:       30 * time.Second,     // 读取超时时间
		WriteTimeout:      30 * time.Second,     // 写入超时时间
		CheckConnLiveness: true,                 // 在使用连接之前检查其存活性
	}

	// 连接数据库
	db, err := ConnMySQL(mysqlConfig)
	if err != nil {
		panic(err)
	}
	defer db.Close()

	// 查看数据库版本
	var version string
	err = db.Get(&version, "SELECT CONCAT_WS(' ', @@version, @@version_comment) AS server_version;")
	if err != nil {
		panic(err)
	}
	fmt.Println(version)
}
```

输出结果

```bash
8.0.30 MySQL Community Server - GPL
```

:::

<br />

