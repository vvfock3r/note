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

## 数据库连接

::: details （1）连接MySQL

```go
package main

import (
	"fmt"
	"time"

	"github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
)

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
	// sqlx.Connect = sqlx.Open(不会真正连接数据库) + db.Ping(会真正连接数据库)
    // 也可以使用 MustConnect, 连接不成功就panic
	db, err := sqlx.Connect("mysql", mysqlConfig.FormatDSN())
	if err != nil {
		panic(err)
	}
	defer func() { _ = db.Close() }()

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

## 数据库操作

::: details （1）写入数据

```go
package main

import (
	"fmt"
	"time"

	"github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
)

// User 定义结构体
type User struct {
	ID       int    `db:"id"`
	Name     string `db:"name"`
	Password string `db:"password"`
	Email    string `db:"email"`
}

// ConnMySQL 连接数据库
func ConnMySQL() (*sqlx.DB, error) {
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

	// 连接数据库: sqlx.Connect = sqlx.Open(不会真正连接数据库) + db.Ping(会真正连接数据库)
	return sqlx.Connect("mysql", mysqlConfig.FormatDSN())
}

func DropTableUser(db *sqlx.DB) error {
	// 创建users表
	var schema = `DROP TABLE IF EXISTS users;`
	_, err := db.Exec(schema)
	return err
}

func CreateTableUser(db *sqlx.DB) error {
	// 创建users表
	var schema = `
		CREATE TABLE IF NOT EXISTS users (
			id int primary key auto_increment,
			name varchar(50) not null unique,
			password varchar(128) not null,
			email varchar(100) not null unique,
			created_at timestamp not null default now(),
			updated_at timestamp,
			deleted_at timestamp
		);`
	_, err := db.Exec(schema)
	return err
}

func main() {
	// 连接数据库
	db, err := ConnMySQL()
	if err != nil {
		panic(err)
	}
	defer db.Close()

	// 删除users表
	err = DropTableUser(db)
	if err != nil {
		panic(err)
	}

	// 创建users表
	err = CreateTableUser(db)
	if err != nil {
		panic(err)
	}

	// 写入单条数据 - 方式1，使用?占位
	{
		user := User{Name: "Alice", Password: "123456", Email: "alice@example.com"}
		_, err := db.Exec("INSERT INTO users (name, password, email) VALUES (?, ?, ?)", user.Name, user.Password, user.Email)
		if err != nil {
			panic(err)
		}
	}

	// 写入单条数据 - 方式2，:username等写法需要对应结构体的tag: db
	{
		user := User{Name: "John", Password: "123456", Email: "john@example.com"}
		_, err := db.NamedExec("INSERT INTO users (name, password, email) VALUES (:name, :password, :email)", user)
		if err != nil {
			panic(err)
		}
	}

	// 批量写入数据
	{
		user := []User{
			{Name: "bob1", Password: "123456", Email: "bob1@example.com"},
			{Name: "bob2", Password: "123456", Email: "bob2@example.com", ID: 100},
			{Name: "bob3", Password: "123456", Email: "bob3@example.com"},
			{Name: "bob4", Password: "123456", Email: "bob4@example.com"},
			{Name: "bob5", Password: "123456", Email: "bob5@example.com"},
		}
		result, err := db.NamedExec("INSERT INTO users (name, password, email) VALUES (:name, :password, :email)", user)
		if err != nil {
			panic(err)
		}
		// 返回受update, insert, or delete操作影响的行数
		// 不是每个数据库或数据库驱动程序都支持这一点
		fmt.Println(result.RowsAffected())

		// 返回上一次插入操作生成的自增ID
		// 不是每个数据库或数据库驱动程序都支持这一点
		fmt.Println(result.LastInsertId())
	}
}
```

输出结果

```bash
5 <nil>
3 <nil>
```

:::

::: details （2）查询数据

```go

```

:::

<br />

## 服务器信息

::: details （1）模拟MySQL客户端内置命令status

```go

```

:::

