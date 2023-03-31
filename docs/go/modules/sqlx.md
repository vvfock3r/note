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

	// 连接数据库
	// sqlx.Connect = sqlx.Open(不会真正连接数据库) + db.Ping(会真正连接数据库)
	// 也可以使用 MustConnect, 连接不成功就panic
	return sqlx.Connect("mysql", mysqlConfig.FormatDSN())
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

### 修改数据

::: details （1）创建、删除表和查看表结构

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

	// 连接数据库
	// sqlx.Connect = sqlx.Open(不会真正连接数据库) + db.Ping(会真正连接数据库)
	// 也可以使用 MustConnect, 连接不成功就panic
	return sqlx.Connect("mysql", mysqlConfig.FormatDSN())
}

// CreateTableUser 若users表不存在则创建
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

// DropTableUser 若users表存在则删除
func DropTableUser(db *sqlx.DB) error {
	// 创建users表
	var schema = `DROP TABLE IF EXISTS users;`
	_, err := db.Exec(schema)
	return err
}

// DescStruct 表结构
type DescStruct struct {
	Field   string         `db:"Field"`
	Type    string         `db:"Type"`
	Null    string         `db:"Null"`
	Key     string         `db:"Key"`
	Default sql.NullString `db:"Default"`
	Extra   string         `db:"Extra"`
}

// DescTableUser 查看users表结构
func DescTableUser(db *sqlx.DB) ([]DescStruct, error) {
	var desc []DescStruct
	err := db.Select(&desc, "DESC users")
	return desc, err
}

func main() {
	// 连接数据库
	db, err := ConnMySQL()
	if err != nil {
		panic(err)
	}
	defer func() { _ = db.Close() }()

	// 若users表存在则删除
	err = DropTableUser(db)
	if err != nil {
		panic(err)
	}

	// 若users表不存在则创建
	err = CreateTableUser(db)
	if err != nil {
		panic(err)
	}

	// 查看users表结构
	descList, err := DescTableUser(db)
	if err != nil {
		panic(err)
	}

	// 表结构可视化
	format := "%-20s%-20s%-10s%-10s%-20v%-20s\n"
	fmt.Printf(format, "Field", "Type", "Null", "Key", "Default", "Extra")
	fmt.Printf("%s\n", strings.Repeat("_", 100))
	for _, desc := range descList {
		// Default字段需要特殊处理
		defaultString := ""
		if desc.Default.Valid {
			defaultString = desc.Default.String
		} else {
			defaultString = "NULL"
		}
		fmt.Printf(format, desc.Field, desc.Type, desc.Null, desc.Key, defaultString, desc.Extra)
	}
}
```

输出结果

```bash
Field               Type                Null      Key       Default             Extra
____________________________________________________________________________________________________
id                  int                 NO        PRI       NULL                auto_increment      
name                varchar(50)         NO        UNI       NULL
password            varchar(128)        NO                  NULL
email               varchar(100)        NO        UNI       NULL
created_at          timestamp           NO                  CURRENT_TIMESTAMP   DEFAULT_GENERATED   
updated_at          timestamp           YES                 NULL
deleted_at          timestamp           YES                 NULL

# 分析
# 这里需要注意Default的类型是sql.NullString，而不是普通的String
```

:::

::: details （2）新增数据

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

func main() {
	// 连接数据库
	db, err := ConnMySQL()
	if err != nil {
		panic(err)
	}
	defer func() { _ = db.Close() }()

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

		// 返回上一次(本次)插入操作生成的自增ID
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

::: details （3）修改和删除数据，与新增数据使用方式一致

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

func main() {
	// 连接数据库
	db, err := ConnMySQL()
	if err != nil {
		panic(err)
	}
	defer func() { _ = db.Close() }()

	// 修改数据: where字段默认不区分大小写，所以这里的更改总会生效
	result, err := db.Exec("UPDATE users SET name = ?, updated_at=? WHERE name = ?", "alice", time.Now(), "Alice")
	if err != nil {
		panic(err)
	}
	fmt.Println(result.RowsAffected())

	// 修改数据: 使用单引号包裹, 将Alice修改为'Alice',这样就会区分大小写
	result, err = db.Exec("UPDATE users SET name = ?, updated_at=? WHERE name = ?", "alice", time.Now(), "'Alice'")
	if err != nil {
		panic(err)
	}
	fmt.Println(result.RowsAffected())

	// 在修改数据时候，时间最好不要使用数据库的now()函数来获取，这有可能会因为时区导致获取错误的时间

	// 删除数据：硬删除
	result, err = db.Exec("DELETE FROM users WHERE name = ?", "bob5")
	if err != nil {
		panic(err)
	}
	fmt.Println(result.RowsAffected())

	// 删除数据：软删除
	result, err = db.Exec("UPDATE users SET deleted_at = ? WHERE name = ?", time.Now(), "bob4")
	if err != nil {
		panic(err)
	}
	fmt.Println(result.RowsAffected())
}
```

输出结果

```bash
1 <nil>
0 <nil>
1 <nil>
1 <nil>
```

:::

<br />

### 查询数据

::: details （1）查询数据：高级接口：Get / Select

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

func main() {
	// 连接数据库
	db, err := ConnMySQL()
	if err != nil {
		panic(err)
	}
	defer db.Close()

	// 注意事项：
	// 目标位置的类型必须与查询结果的结构相匹配，否则会导致运行时错误

	// 查询单条数据: Get，参数要求是一个结构体指针
	{
		user := User{}
		err := db.Get(&user, "SELECT id,name,password,email FROM users WHERE name=?", "bob4")
		if err != nil {
			panic(err)
		}
		fmt.Printf("%#v\n", user)
		fmt.Println()
	}

	// 查询多条数据: Select，参数要求是一个 结构体切片的指针
	{
		users := []User{}
		err := db.Select(&users, "SELECT id,name,password,email FROM users WHERE id > ?", "4")
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

:::

::: details （2）查询数据：低级接口：Query*

```go
package main

import (
	"database/sql"
	"fmt"
	"log"
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

func main() {
	// 连接数据库
	db, err := ConnMySQL()
	if err != nil {
		panic(err)
	}
	defer db.Close()

	// 注意事项：
	// 目标位置的类型必须与查询结果的结构相匹配，否则会导致运行时错误

	// 查询多条数据: 使用 Query
	{
		rows, err := db.Query("SELECT id,name,password,email FROM users WHERE id > ?", "42")
		if err != nil {
			panic(err)
		}
		for rows.Next() {
			user := User{}
			err := rows.Scan(&user.ID, &user.Name, &user.Password, &user.Email)
			if err != nil {
				panic(err)
			}
			fmt.Printf("%#v\n", user)
		}
		fmt.Println()
	}

	// 查询多条数据: 使用 Queryx, 可以使用 StructScan、SliceScan、MapScan映射到不同的对象中
	{
		rows, err := db.Queryx("SELECT id,name,password,email FROM users WHERE id > ?", "4")
		if err != nil {
			panic(err)
		}
		for rows.Next() {
			user := User{}
			err := rows.StructScan(&user)
			if err != nil {
				log.Fatalln(err)
			}
			fmt.Printf("%#v\n", user)
		}
		fmt.Println()
	}

	// 查询单条数据: 使用 QueryRow
	{
		user := User{}
		row := db.QueryRow("SELECT id,name,password,email FROM users WHERE name = ?", "bob5")
		err := row.Scan(&user.ID, &user.Name, &user.Password, &user.Email)
		if err != sql.ErrNoRows {
			if err != nil {
				panic(err)
			}
			fmt.Printf("%#v\n", user)
		}
		fmt.Println()
	}

	// 查询单条数据: 使用 QueryRowx
	{
		user := User{}
		row := db.QueryRowx("SELECT id,name,password,email FROM users WHERE name = ?", "bob5")
		err := row.StructScan(&user)
		if err != nil {
			panic(err)
		}
		fmt.Printf("%#v\n", user)
		fmt.Println()
	}
}
```

输出结果

```bash
main.User{ID:5, Name:"bob3", Password:"123456", Email:"bob3@example.com"}
main.User{ID:6, Name:"bob4", Password:"123456", Email:"bob4@example.com"}
```

:::

<br />

### 使用事物

::: details 点击查看详情

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

func Rollback(tx *sqlx.Tx) {
	err := tx.Rollback()
	if err != nil {
		fmt.Println("事物回滚失败")
	} else {
		fmt.Println("事物回滚成功")
	}
}

func main() {
	// 连接数据库
	db, err := ConnMySQL()
	if err != nil {
		panic(err)
	}
	defer func() { _ = db.Close() }()

	// 开启事物
	// Begin开启事物 ：只能执行 Exec 和 Query 方法
	// Beginx开启事物: 支持Exec, Query, Get, Select 等方法
	tx, err := db.Beginx()
	if err != nil {
		panic(err)
	}

	// 执行操作
	user1 := User{Name: "John1", Password: "123456", Email: "john3@example.com"}
	_, err = tx.NamedExec("INSERT INTO users (name, password, email) VALUES (:name, :password, :email)", user1)
	if err != nil {
		Rollback(tx)
	}

	user2 := User{Name: "John2", Password: "123456", Email: "john4@example.com"}
	_, err = tx.NamedExec("INSERT INTO users (name, password, email) VALUES (:name, :password, :email)", user2)
	if err != nil {
		Rollback(tx)
	}

	// 提交
	err = tx.Commit()
	if err != nil {
		Rollback(tx)
	}
}
```

:::

<br />

### 预处理

::: details 点击查看详情

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

func main() {
	// 连接数据库
	db, err := ConnMySQL()
	if err != nil {
		panic(err)
	}
	defer func() { _ = db.Close() }()

	// 定义预处理语句
	stmp, err := db.Preparex("SELECT id,name,password,email FROM users WHERE id = ?")
	if err != nil {
		panic(err)
	}

	// 使用预处理语句
	{
		u := User{}
		err = stmp.Get(&u, "1")
		if err != nil {
			panic(err)
		}
		fmt.Printf("%#v\n", u)
	}

	{
		u := User{}
		err = stmp.Get(&u, "2")
		if err != nil {
			panic(err)
		}
		fmt.Printf("%#v\n", u)
	}
}
```

:::

<br />

## 服务器信息

::: details （1）模拟MySQL客户端内置命令status

```go

```

:::

