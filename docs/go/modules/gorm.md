## Gorm

Github：[https://github.com/go-gorm/gorm](https://github.com/go-gorm/gorm)

文档：[https://gorm.io/zh_CN/docs/](https://gorm.io/zh_CN/docs/)

### 安装

```bash
go get -u gorm.io/gorm
go get -u gorm.io/driver/sqlite
go get -u gorm.io/driver/mysql
```

<br />

### 连接

DSN格式：[https://github.com/go-sql-driver/mysql#dsn-data-source-name](https://github.com/go-sql-driver/mysql#dsn-data-source-name)

::: details 连接MySQL

```go
package main

import (
	"fmt"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func NewGormDB() (*gorm.DB, error) {
	host := "192.168.48.151"
	port := 3306
	username := "root"
	password := "QiNqg[l.%;H>>rO9"
	dbname := "demo"
	charset := "utf8mb4"
	conntimeout := "5s"
	readtimeout := "10s"
	writetimeout := "10s"

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?parseTime=True&loc=Local&charset=%s&timeout=%s&readTimeout=%s&writeTimeout=%s",
		username, password, host, port, dbname, charset, conntimeout, readtimeout, writetimeout)

    // 这一步会发起数据库连接
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	return db, err
}

func main() {
    // 连接数据库
	db, err := NewGormDB()
	if err != nil {
		panic(err)
	}
	fmt.Printf("%T\n", db)
	fmt.Printf("%#v\n", db)
}
```

输出结果

```bash
*gorm.DB
&gorm.DB{Config:(*gorm.Config)(0xc0001c4240), Error:error(nil), RowsAffected:0, Statement:(*gorm.Statement)(0xc0001d0380), clone:1}
```

:::

<br />

### 原生SQL

::: details （1）查看数据库版本

```go
package main

import (
	"fmt"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func NewGormDB() (*gorm.DB, error) {
	host := "192.168.48.151"
	port := 3306
	username := "root"
	password := "QiNqg[l.%;H>>rO9"
	dbname := "demo"
	charset := "utf8mb4"
	conntimeout := "5s"
	readtimeout := "10s"
	writetimeout := "10s"

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?parseTime=True&loc=Local&charset=%s&timeout=%s&readTimeout=%s&writeTimeout=%s",
		username, password, host, port, dbname, charset, conntimeout, readtimeout, writetimeout)

	// 这一步会发起数据库连接
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	return db, err
}

func main() {
	// 连接数据库
	db, err := NewGormDB()
	if err != nil {
		panic(err)
	}

	// 查看版本
	var version string
	tx := db.Raw("SELECT VERSION();").Scan(&version)
	if tx.Error != nil {
		panic(tx.Error)
	}
	fmt.Println(version)
}
```

输出结果

```bash
8.0.30
```

:::

::: details （2）查看服务器信息

```go
package main

import (
	"fmt"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func NewGormDB() (*gorm.DB, error) {
	host := "192.168.48.151"
	port := 3306
	username := "root"
	password := "QiNqg[l.%;H>>rO9"
	dbname := "demo"
	charset := "utf8mb4"
	conntimeout := "5s"
	readtimeout := "10s"
	writetimeout := "10s"

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?parseTime=True&loc=Local&charset=%s&timeout=%s&readTimeout=%s&writeTimeout=%s",
		username, password, host, port, dbname, charset, conntimeout, readtimeout, writetimeout)

	// 这一步会发起数据库连接
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	return db, err
}

type Entry struct {
	Name  string `gorm:"column:Variable_name"`
	Value string
}

func main() {
	// 连接数据库
	db, err := NewGormDB()
	if err != nil {
		panic(err)
	}

	// 查看服务器信息
	var status []Entry
	tx := db.Raw("SHOW STATUS;").Scan(&status)
	if tx.Error != nil {
		panic(tx.Error)
	}
	for _, m := range status {
		fmt.Printf("%#v\n", m)
	}
}
```

输出结果

```bash
main.Entry{Name:"Aborted_clients", Value:"66"}
main.Entry{Name:"Aborted_connects", Value:"2"}
main.Entry{Name:"Acl_cache_items_count", Value:"0"}
main.Entry{Name:"Binlog_cache_disk_use", Value:"0"}
main.Entry{Name:"Binlog_cache_use", Value:"3"}
main.Entry{Name:"Binlog_stmt_cache_disk_use", Value:"0"}
main.Entry{Name:"Binlog_stmt_cache_use", Value:"0"}
main.Entry{Name:"Bytes_received", Value:"166"}
main.Entry{Name:"Bytes_sent", Value:"186"}
main.Entry{Name:"Caching_sha2_password_rsa_public_key", Value:"-----BEGIN PUBLIC
 KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvq+EXwmbHAygtVrvXcA4\n8Y9
1BmdfZNaTKCmh4eHY83c9oDiUVm8jZCSpJdFon3RwU5zJu5yAlNYHMVT/WSA0\nIKp+dkUG946p1zJ2Y
HOgFP4lH3b1LqML5vADIYAluqnSs6VkSdvr5ZEhNh4BAVvA\nMJ4efcPCc2JaAZJZ1+fiXIhphIHZoAj
UNT/xCBerwyVKeBVUKl0Bvi4SB1dDF+PX\n8RUcsVRsLpaGvSei/kMvImFgztlxSTnkUikCydM8psaDT
JC3q/aFPUwr7LAZC6+y\nKYJfyfVomMiIya57UHO3aNHsN2bezeUEncCX3k9JgRRNEUu0VFGcjkkMVCo
ohQT0\nOQIDAQAB\n-----END PUBLIC KEY-----\n"}
main.Entry{Name:"Com_admin_commands", Value:"1"}
main.Entry{Name:"Com_assign_to_keycache", Value:"0"}
main.Entry{Name:"Com_alter_db", Value:"0"}
...

# 说明：Scan后面要接一个什么样的对象?
# 解答：
# 1、MySQL客户端中执行SHOW STATUS;观察输出的数据类型
# 2、尝试定义一个 []map[string]any 结构作为Scan的参数，然后我们得到下面的输出
#   map[string]interface {}{"Value":"92306", "Variable_name":"Uptime"}
# 3、尝试定义结构体，就得到了我们上面所用的结构体 Entry
```

:::

::: details （3）模拟MySQL客户端内置命令status - 未完待续

```go
package main

import (
	"fmt"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func NewGormDB() (*gorm.DB, error) {
	host := "192.168.48.151"
	port := 3306
	username := "root"
	password := "QiNqg[l.%;H>>rO9"
	dbname := "demo"
	charset := "utf8mb4"
	conntimeout := "5s"
	readtimeout := "10s"
	writetimeout := "10s"

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?parseTime=True&loc=Local&charset=%s&timeout=%s&readTimeout=%s&writeTimeout=%s",
		username, password, host, port, dbname, charset, conntimeout, readtimeout, writetimeout)

	// 这一步会发起数据库连接
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	return db, err
}

func main() {
	// 连接数据库
	db, err := NewGormDB()
	if err != nil {
		panic(err)
	}

	var tx *gorm.DB

	// 获取连接ID
	var ConnectionID int64
	tx = db.Raw("SELECT CONNECTION_ID();").Scan(&ConnectionID)
	if tx.Error != nil {
		panic(tx.Error)
	}
	fmt.Printf("%-30s%d\n", "Connection id:", ConnectionID)

	// 获取当前数据库
	var CurrentDatabase string
	tx = db.Raw("SELECT DATABASE();").Scan(&CurrentDatabase)
	if tx.Error != nil {
		panic(tx.Error)
	}
	fmt.Printf("%-30s%s\n", "Current database:", CurrentDatabase)

	// 获取当前用户
	var CurrentUser string
	tx = db.Raw("SELECT USER();").Scan(&CurrentUser)
	if tx.Error != nil {
		panic(tx.Error)
	}
	fmt.Printf("%-30s%s\n", "Current user:", CurrentUser)
}
```

输出结果

```bash

```

:::

<br />

### 定义模型

文档：

* 定义模型：[https://gorm.io/zh_CN/docs/models.html](https://gorm.io/zh_CN/docs/models.html)
* 约定大于配置：[https://gorm.io/zh_CN/docs/conventions.html](https://gorm.io/zh_CN/docs/conventions.html)

::: details 嵌入gorm.Model和其他结构体

```go
type User1 struct {
	gorm.Model
	Name string
}

// 等效于
type User2 struct {
	ID        uint `gorm:"primaryKey"` // id为主键
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt gorm.DeletedAt `gorm:"index"` // 普通索引
	Name      string
}

// =============================================================

type Author struct {
    Name  string
    Email string
}
type Blog struct {
  ID      int
  Author  Author `gorm:"embedded"`
  Upvotes int32
}

// 等效于
type Blog struct {
  ID       int64
  Name     string
  Email    string
  Upvotes  int32
}
```

:::

<br />

### 自动建表

文档：[https://gorm.io/zh_CN/docs/migration.html](https://gorm.io/zh_CN/docs/migration.html)

::: details AutoMigrate简单示例

```go
package main

import (
	"fmt"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"log"
)

func getDB() (*gorm.DB, error) {
	username := "root"
	password := "QiNqg[l.%;H>>rO9"
	host := "192.168.48.133"
	port := 3306
	dbName := "demo"
	charSet := "utf8mb4"
	conntimeout := "5s"
	readTimeout := "10s"
	writeTimeout := "10s"

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?parseTime=True&loc=Local&charset=%s&timeout=%s&readTimeout=%s&writeTimeout=%s",
		username,
		password,
		host,
		port,
		dbName,
		charSet,
		conntimeout,
		readTimeout,
		writeTimeout,
	)

	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	return db, err
}

type User struct {
	gorm.Model
	Name string
}

type Role struct {
	Name string
}

func main() {
	// 连接数据库
	db, err := getDB()
	if err != nil {
		panic(err)
	}

	// 自动创建表
	//err = db.AutoMigrate(&User{}, &Role{})
	err = db.Set("gorm:table_options", "ENGINE=InnoDB").AutoMigrate(&User{}, &Role{})
	if err != nil {
		log.Fatalln(err)
	}
}
```

:::

<br />

### 输出SQL语句

文档：[https://gorm.io/zh_CN/docs/logger.html](https://gorm.io/zh_CN/docs/logger.html)

::: details 点击查看完整代码

```go
package main

import (
	"fmt"
	"log"
	"os"
	"time"

	"gorm.io/gorm/logger"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func getDB() (*gorm.DB, error) {
	username := "root"
	password := "QiNqg[l.%;H>>rO9"
	host := "43.154.36.151"
	port := 3306
	dbName := "demo"
	charSet := "utf8mb4"
	conntimeout := "5s"
	readTimeout := "10s"
	writeTimeout := "10s"

	// 初始化dsn
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?parseTime=True&loc=Local&charset=%s&timeout=%s&readTimeout=%s&writeTimeout=%s",
		username,
		password,
		host,
		port,
		dbName,
		charSet,
		conntimeout,
		readTimeout,
		writeTimeout,
	)

	// 初始化日志
	newLogger := logger.New(
		log.New(os.Stdout, "\r\n", log.LstdFlags), // io writer（日志输出的目标，前缀和日志包含的内容——译者注）
		logger.Config{
			SlowThreshold:             time.Second, // 慢SQL阈值
			LogLevel:                  logger.Info, // 日志级别
			IgnoreRecordNotFoundError: true,        // 忽略ErrRecordNotFound（记录未找到）错误
			Colorful:                  true,        // 是否彩色输出
		},
	)

	// 连接数据库
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{
		Logger: newLogger,
	})
	return db, err
}

type User struct {
	gorm.Model
	Name string
}

type Role struct {
	Name string
}

func main() {
	// 连接数据库
	db, err := getDB()
	if err != nil {
		panic(err)
	}

	// 自动创建表
	//err = db.AutoMigrate(&User{}, &Role{})
	err = db.Set("gorm:table_options", "ENGINE=InnoDB").AutoMigrate(&User{}, &Role{})
	if err != nil {
		log.Fatalln(err)
	}
    
    // 若只想单独对某一条或几条语句语句进行Debug，可以将日志级别调整为logger.Silent,
    // 然后使用db.Debug().xxx
}
```

输出结果

![image-20221127193655596](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20221127193655596.png)

:::

<br />

### 增加记录

文档：[https://gorm.io/zh_CN/docs/create.html](https://gorm.io/zh_CN/docs/create.html)

#### 增加单条记录

::: details 点击查看完整代码

```go
package main

import (
	"fmt"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"time"
)

func getDB() (*gorm.DB, error) {
	username := "root"
	password := "QiNqg[l.%;H>>rO9"
	host := "192.168.48.133"
	port := 3306
	dbName := "demo"
	charSet := "utf8mb4"
	conntimeout := "5s"
	readTimeout := "10s"
	writeTimeout := "10s"

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?parseTime=True&loc=Local&charset=%s&timeout=%s&readTimeout=%s&writeTimeout=%s",
		username,
		password,
		host,
		port,
		dbName,
		charSet,
		conntimeout,
		readTimeout,
		writeTimeout,
	)

	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	return db, err
}

type User struct {
	gorm.Model
	Name     string
	Age      int
	Birthday time.Time
}

func main() {
	// 连接数据库
	db, err := getDB()
	if err != nil {
		panic(err)
	}

	// 若表存在则删除
	//err = db.Migrator().DropTable(&User{})
	//if err != nil {
	//	panic(err)
	//}

	// 自动创建表
	err = db.AutoMigrate(&User{})
	if err != nil {
		panic(err)
	}

	// 添加单条记录
	user := User{Name: "Jinzhu", Age: 18, Birthday: time.Now()}
	result := db.Create(&user)

	// 检查错误
	if result.Error != nil {
		panic(err)
	}
    
    // 查看gorm.Model字段
	fmt.Println("ID       : ", user.ID)
	fmt.Println("CreatedAt: ", user.CreatedAt)
	fmt.Println("UpdatedAt: ", user.UpdatedAt)
	fmt.Println("DeletedAt: ", user.DeletedAt)
}
```

输出结果

```bash
ID       :  1
CreatedAt:  2022-09-18 13:35:27.769 +0800 CST    
UpdatedAt:  2022-09-18 13:35:27.769 +0800 CST    
DeletedAt:  {0001-01-01 00:00:00 +0000 UTC false}  // DeletedAt是一个结构体
```

:::

#### 批量插入记录

::: details 点击查看完整代码

```go
package main

import (
	"fmt"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"time"
)

func getDB() (*gorm.DB, error) {
	username := "root"
	password := "QiNqg[l.%;H>>rO9"
	host := "192.168.48.133"
	port := 3306
	dbName := "demo"
	charSet := "utf8mb4"
	conntimeout := "5s"
	readTimeout := "10s"
	writeTimeout := "10s"

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?parseTime=True&loc=Local&charset=%s&timeout=%s&readTimeout=%s&writeTimeout=%s",
		username,
		password,
		host,
		port,
		dbName,
		charSet,
		conntimeout,
		readTimeout,
		writeTimeout,
	)

	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	return db, err
}

type User struct {
	gorm.Model
	Name     string
	Age      int
	Birthday time.Time
}

func main() {
	// 连接数据库
	db, err := getDB()
	if err != nil {
		panic(err)
	}

	// 若表存在则删除
	err = db.Migrator().DropTable(&User{})
	if err != nil {
		panic(err)
	}

	// 自动创建表
	err = db.AutoMigrate(&User{})
	if err != nil {
		panic(err)
	}

	// 批量添加记录，只需要传递Slice即可
	var users = []User{
		{Name: "jinzhu1", Birthday: time.Now()},
		{Name: "jinzhu2", Birthday: time.Now()},
		{Name: "jinzhu3", Birthday: time.Now()},
	}
	result := db.Create(&users)

	// 检查错误
	if result.Error != nil {
		panic(err)
	}

	// 查看数据
	for _, user := range users {
		fmt.Println("ID       : ", user.ID)
		fmt.Println("CreatedAt: ", user.CreatedAt)
		fmt.Println("UpdatedAt: ", user.UpdatedAt)
		fmt.Println("DeletedAt: ", user.DeletedAt)
	}
}
```

输出结果

```bash
ID       :  1
CreatedAt:  2022-09-18 14:07:14.931 +0800 CST    
UpdatedAt:  2022-09-18 14:07:14.931 +0800 CST    
DeletedAt:  {0001-01-01 00:00:00 +0000 UTC false}
ID       :  2
CreatedAt:  2022-09-18 14:07:14.931 +0800 CST    
UpdatedAt:  2022-09-18 14:07:14.931 +0800 CST    
DeletedAt:  {0001-01-01 00:00:00 +0000 UTC false}
ID       :  3
CreatedAt:  2022-09-18 14:07:14.931 +0800 CST    
UpdatedAt:  2022-09-18 14:07:14.931 +0800 CST    
DeletedAt:  {0001-01-01 00:00:00 +0000 UTC false}
```

:::

#### 分批插入数据

::: details 点击查看完整代码

```go
package main

import (
	"fmt"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"strconv"
	"time"
)

func getDB() (*gorm.DB, error) {
	username := "root"
	password := "QiNqg[l.%;H>>rO9"
	host := "192.168.48.133"
	port := 3306
	dbName := "demo"
	charSet := "utf8mb4"
	conntimeout := "5s"
	readTimeout := "10s"
	writeTimeout := "10s"

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?parseTime=True&loc=Local&charset=%s&timeout=%s&readTimeout=%s&writeTimeout=%s",
		username,
		password,
		host,
		port,
		dbName,
		charSet,
		conntimeout,
		readTimeout,
		writeTimeout,
	)

	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	return db, err
}

type User struct {
	gorm.Model
	Name     string
	Age      int
	Birthday time.Time
}

func main() {
	// 连接数据库
	db, err := getDB()
	if err != nil {
		panic(err)
	}

	// 若表存在则删除
	err = db.Migrator().DropTable(&User{})
	if err != nil {
		panic(err)
	}

	// 自动创建表
	err = db.AutoMigrate(&User{})
	if err != nil {
		panic(err)
	}

	// 批量添加记录，只需要传递Slice即可
	var users = []User{}
	for i := 0; i < 100; i++ {
		user := User{Name: "jinzhu" + strconv.Itoa(i), Birthday: time.Now()}
		users = append(users, user)
	}
	result := db.CreateInBatches(&users, 10) // 每次插入10条数据

	// 检查错误
	if result.Error != nil {
		panic(err)
	}

	// 查看数据
	for _, user := range users {
		fmt.Println("ID       : ", user.ID)
		fmt.Println("CreatedAt: ", user.CreatedAt)
		fmt.Println("UpdatedAt: ", user.UpdatedAt)
		fmt.Println("DeletedAt: ", user.DeletedAt)
	}
}
```

:::

#### 使用部分字段

::: details 点击查看完整代码

```go
package main

import (
	"fmt"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"time"
)

func getDB() (*gorm.DB, error) {
	username := "root"
	password := "QiNqg[l.%;H>>rO9"
	host := "192.168.48.133"
	port := 3306
	dbName := "demo"
	charSet := "utf8mb4"
	conntimeout := "5s"
	readTimeout := "10s"
	writeTimeout := "10s"

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?parseTime=True&loc=Local&charset=%s&timeout=%s&readTimeout=%s&writeTimeout=%s",
		username,
		password,
		host,
		port,
		dbName,
		charSet,
		conntimeout,
		readTimeout,
		writeTimeout,
	)

	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	return db, err
}

type User struct {
	gorm.Model
	Name     string
	Age      int
	Birthday time.Time
}

func main() {
	// 连接数据库
	db, err := getDB()
	if err != nil {
		panic(err)
	}

	// 若表存在则删除
	err = db.Migrator().DropTable(&User{})
	if err != nil {
		panic(err)
	}

	// 自动创建表
	err = db.AutoMigrate(&User{})
	if err != nil {
		panic(err)
	}

	// 添加单条记录
	user := User{Name: "Jinzhu1", Age: 18}
	result := db.Select("Name", "CreatedAt").Create(&user) // 用指定的字段创建记录

	// 检查错误
	if result.Error != nil {
		panic(err)
	}

	// 查看gorm.Model字段
	fmt.Println("ID       : ", user.ID)
	fmt.Println("CreatedAt: ", user.CreatedAt)
	fmt.Println("UpdatedAt: ", user.UpdatedAt)
	fmt.Println("DeletedAt: ", user.DeletedAt)

	// ======================================================================================

	// 添加单条记录
	user = User{Name: "Jinzhu2", Age: 18}
	result = db.Omit("Age", "CreatedAt", "Birthday").Create(&user) // 忽略指定的字段

	// 检查错误
	if result.Error != nil {
		panic(err)
	}

	// 查看gorm.Model字段
	fmt.Println("ID       : ", user.ID)
	fmt.Println("CreatedAt: ", user.CreatedAt)
	fmt.Println("UpdatedAt: ", user.UpdatedAt)
	fmt.Println("DeletedAt: ", user.DeletedAt)
}
```

:::

#### time.Time类型

* 插入数据时若某个字段（基本数据类型）不传递值，会使用其零值
* time.Time类型若不传递值可能会报错

::: details 点击查看完整代码

```go
package main

import (
	"fmt"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"time"
)

func getDB() (*gorm.DB, error) {
	username := "root"
	password := "QiNqg[l.%;H>>rO9"
	host := "192.168.48.133"
	port := 3306
	dbName := "demo"
	charSet := "utf8mb4"
	conntimeout := "5s"
	readTimeout := "10s"
	writeTimeout := "10s"

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?parseTime=True&loc=Local&charset=%s&timeout=%s&readTimeout=%s&writeTimeout=%s",
		username,
		password,
		host,
		port,
		dbName,
		charSet,
		conntimeout,
		readTimeout,
		writeTimeout,
	)

	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	return db, err
}

type User struct {
	gorm.Model
	Name     string
	Age      int
	Birthday time.Time
}

func main() {
	// 连接数据库
	db, err := getDB()
	if err != nil {
		panic(err)
	}

	// 若表存在则删除
	err = db.Migrator().DropTable(&User{})
	if err != nil {
		panic(err)
	}

	// 自动创建表
	err = db.AutoMigrate(&User{})
	if err != nil {
		panic(err)
	}

	// 批量添加记录，Age和Birthday都没有传值，默认使用零值
	var users = []User{
		{Name: "jinzhu1"},
	}
	result := db.Create(&users)

	// 检查错误
	if result.Error != nil {
		panic(err)
	}

	// 查看数据
	for _, user := range users {
		fmt.Println("ID       : ", user.ID)
		fmt.Println("CreatedAt: ", user.CreatedAt)
		fmt.Println("UpdatedAt: ", user.UpdatedAt)
		fmt.Println("DeletedAt: ", user.DeletedAt)
	}
}
```

**Time.time类型插入时报错**

![image-20220918141751000](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220918141751000.png)

解决办法1：修改数据库

![image-20220918142825999](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220918142825999.png)

![image-20220918142843485](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220918142843485.png)

解决办法2：修改为*Time.time类型（推荐）

```go
type User struct {
	gorm.Model
	Name     string
	Age      int
	Birthday *time.Time
}

func getTimePtr(t time.Time) *time.Time {
	return &t
}


    // 批量添加记录，若要传递数据不能直接使用&time.Now()
	var users = []User{
		{Name: "jinzhu1"},
		{Name: "jinzhu1", Birthday: getTimePtr(time.Now())},
	}
	result := db.Create(&users)
```

![image-20220918141933930](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220918141933930.png)

:::

<br />

### 查询记录

文档：

* [https://gorm.io/zh_CN/docs/query.html](https://gorm.io/zh_CN/docs/query.html)
* [https://gorm.io/zh_CN/docs/advanced_query.html](https://gorm.io/zh_CN/docs/advanced_query.html)

#### 查询所有对象

::: details 点击查看完整代码

```go
package main

import (
	"fmt"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"strconv"
	"time"
)

func getDB() (*gorm.DB, error) {
	username := "root"
	password := "QiNqg[l.%;H>>rO9"
	host := "192.168.48.133"
	port := 3306
	dbName := "demo"
	charSet := "utf8mb4"
	conntimeout := "5s"
	readTimeout := "10s"
	writeTimeout := "10s"

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?parseTime=True&loc=Local&charset=%s&timeout=%s&readTimeout=%s&writeTimeout=%s",
		username,
		password,
		host,
		port,
		dbName,
		charSet,
		conntimeout,
		readTimeout,
		writeTimeout,
	)

	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	return db, err
}

type User struct {
	gorm.Model
	Name     string
	Age      int
	Birthday time.Time
}

func main() {
	// 连接数据库
	db, err := getDB()
	if err != nil {
		panic(err)
	}

	// 若表存在则删除
	err = db.Migrator().DropTable(&User{})
	if err != nil {
		panic(err)
	}

	// 自动创建表
	err = db.AutoMigrate(&User{})
	if err != nil {
		panic(err)
	}

	// 批量添加记录，只需要传递Slice即可
	var users []User
	for i := 0; i < 100; i++ {
		user := User{Name: "jinzhu" + strconv.Itoa(i), Birthday: time.Now()}
		users = append(users, user)
	}
	result := db.CreateInBatches(&users, 10) // 每次插入10条数据

	// 检查错误
	if result.Error != nil {
		panic(err)
	}

	// 查询所有记录
	var users2 []User
	result = db.Find(&users2) // select * from users;

	// 检查错误
	if result.Error != nil {
		panic(err)
	}

	// 查看信息
	fmt.Println("记录条数: ", result.RowsAffected) // 等同于len(users)
	for _, user := range users2 {
		fmt.Println("Name: ", user.Name)
	}
}
```

:::

#### 指定单条记录

* 查询时它自动添加 `LIMIT 1` 
* 没有找到记录时返回 `ErrRecordNotFound` 错误

```go
// 获取第一条记录（主键升序）
db.First(&user)  // SELECT * FROM users ORDER BY id LIMIT 1;

// 获取最后一条记录（主键降序）
db.Last(&user)   // SELECT * FROM users ORDER BY id DESC LIMIT 1;

// 获取一条记录，没有指定排序字段
db.Take(&user)  // SELECT * FROM users LIMIT 1;

// ------------------------------------------------------------

// 返回值
result.RowsAffected // 返回找到的记录数
result.Error        // returns error or nil

// ------------------------------------------------------------
// 未找到记录时

// First/Last/Take会返回ErrRecordNotFound错误，然后通过result.RowsAffected判断是否查询到记录
errors.Is(result.Error, gorm.ErrRecordNotFound)

// 若要避免ErrRecordNotFound错误可以使用Find
db.Limit(1).Find(&user)
```

#### 指定查询条件

```go
// ==
db.Where("name = ?", "jinzhu211").Find(&user)
// SELECT * FROM users WHERE name = 'jinzhu';

// != or <>
db.Where("name != ?", "jinzhu").Find(&users)
// SELECT * FROM users WHERE name != 'jinzhu';

// IN
db.Where("name IN ?", []string{"jinzhu", "jinzhu 2"}).Find(&users)
// SELECT * FROM users WHERE name IN ('jinzhu','jinzhu 2');

// LIKE
db.Where("name LIKE ?", "%jin%").Find(&users)
// SELECT * FROM users WHERE name LIKE '%jin%';

// AND
db.Where("name = ? AND age >= ?", "jinzhu", "22").Find(&users)
// SELECT * FROM users WHERE name = 'jinzhu' AND age >= 22;

// Time
db.Where("updated_at > ?", lastWeek).Find(&users)
// SELECT * FROM users WHERE updated_at > '2000-01-01 00:00:00';

// BETWEEN
db.Where("created_at BETWEEN ? AND ?", lastWeek, today).Find(&users)
// SELECT * FROM users WHERE created_at BETWEEN '2000-01-01 00:00:00' AND '2000-01-08 00:00:00';
```

<br />

### 更新记录

文档：[https://gorm.io/zh_CN/docs/update.html](https://gorm.io/zh_CN/docs/update.html)

#### 更新指定字段

* `Update`：只支持更新单个字段
* `Updates`：支持更新1个或多个字段

::: details 点击查看完整代码

```go
package main

import (
	"fmt"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"time"
)

func getDB() (*gorm.DB, error) {
	username := "root"
	password := "QiNqg[l.%;H>>rO9"
	host := "192.168.48.133"
	port := 3306
	dbName := "demo"
	charSet := "utf8mb4"
	conntimeout := "5s"
	readTimeout := "10s"
	writeTimeout := "10s"

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?parseTime=True&loc=Local&charset=%s&timeout=%s&readTimeout=%s&writeTimeout=%s",
		username,
		password,
		host,
		port,
		dbName,
		charSet,
		conntimeout,
		readTimeout,
		writeTimeout,
	)

	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	return db, err
}

type User struct {
	gorm.Model
	Name     string
	Age      int
	Birthday time.Time
}

func main() {
	// 连接数据库
	db, err := getDB()
	if err != nil {
		panic(err)
	}

	// 若表存在则删除
	err = db.Migrator().DropTable(&User{})
	if err != nil {
		panic(err)
	}

	// 自动创建表
	err = db.AutoMigrate(&User{})
	if err != nil {
		panic(err)
	}

	// 批量添加记录，只需要传递Slice即可
	var users = []User{
		{Name: "jinzhu1", Birthday: time.Now()},
		{Name: "jinzhu2", Birthday: time.Now()},
		{Name: "jinzhu3", Birthday: time.Now()},
	}
	result := db.Create(&users)

	// 检查错误
	if result.Error != nil {
		panic(err)
	}

	// 查询并更新，注意点：
	// (1) 若没有找到记录不会新增记录
	// (2) 若找到记录,Update只能更新单个字段(还会自动更新updated_at字段),Updates支持更新1个或多个字段
	// (3) 若旧纪录和新记录完全相同,那么只会更新updated_at字段
	var user []User
	result = db.Where("name LIKE ?", "%jinzhu%").Find(&user).Update("name", "2")
	//result = db.Where("name LIKE ?", "%jinzhu%").Find(&user).Updates(map[string]any{
	//	"name": "bob",
	//	"age":  18,
	//})

	if result.Error != nil {
		panic(err)
	}
	fmt.Println("更新记录数目: ", result.RowsAffected)
}
```

:::

#### 排除指定字段

```go
	// Omit忽略某些字段,在下面这个例子种,只会更新updated_at
	var user []User
	result = db.
		Where("name LIKE ?", "%jinzhu%").Find(&user).
		Omit("name", "age").
		Updates(map[string]any{
			"name": "bob2",
			"age":  20,
		})

	if result.Error != nil {
		panic(err)
	}
	fmt.Println("更新记录数目: ", result.RowsAffected)
```

#### 更新所有字段

::: details 点击查看完整代码

```go
package main

import (
	"fmt"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"time"
)

func getDB() (*gorm.DB, error) {
	username := "root"
	password := "QiNqg[l.%;H>>rO9"
	host := "192.168.48.133"
	port := 3306
	dbName := "demo"
	charSet := "utf8mb4"
	conntimeout := "5s"
	readTimeout := "10s"
	writeTimeout := "10s"

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?parseTime=True&loc=Local&charset=%s&timeout=%s&readTimeout=%s&writeTimeout=%s",
		username,
		password,
		host,
		port,
		dbName,
		charSet,
		conntimeout,
		readTimeout,
		writeTimeout,
	)

	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	return db, err
}

type User struct {
	gorm.Model
	Name     string
	Age      int
	Birthday time.Time
	Grade    int
}

func main() {
	// 连接数据库
	db, err := getDB()
	if err != nil {
		panic(err)
	}

	// 若表存在则删除
	err = db.Migrator().DropTable(&User{})
	if err != nil {
		panic(err)
	}

	// 自动创建表
	err = db.AutoMigrate(&User{})
	if err != nil {
		panic(err)
	}

	// 批量添加记录，只需要传递Slice即可
	var users = []User{
		{Name: "jinzhu1", Age: 18, Birthday: time.Now()},
		{Name: "jinzhu2", Age: 19, Birthday: time.Now()},
		{Name: "jinzhu3", Age: 20, Birthday: time.Now()},
	}
	result := db.Create(&users)

	// 检查错误
	if result.Error != nil {
		panic(err)
	}

	// 先查询一下
	var user User
	result = db.Where("name = ?", "jinzhu2").Find(&user)
	if result.Error != nil {
		panic(err)
	}

	// 更新所有字段 ( deleted_at字段除外 )
	user.Name = "example"
	result = db.Save(&user)

	if result.Error != nil {
		panic(err)
	}
	fmt.Println("更新记录数目: ", result.RowsAffected)
}
```

:::

#### 使用SQL表达式

::: details 点击查看完整代码

```go
package main

import (
	"fmt"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"time"
)

func getDB() (*gorm.DB, error) {
	username := "root"
	password := "QiNqg[l.%;H>>rO9"
	host := "192.168.48.133"
	port := 3306
	dbName := "demo"
	charSet := "utf8mb4"
	conntimeout := "5s"
	readTimeout := "10s"
	writeTimeout := "10s"

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?parseTime=True&loc=Local&charset=%s&timeout=%s&readTimeout=%s&writeTimeout=%s",
		username,
		password,
		host,
		port,
		dbName,
		charSet,
		conntimeout,
		readTimeout,
		writeTimeout,
	)

	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	return db, err
}

type User struct {
	gorm.Model
	Name     string
	Age      int
	Birthday time.Time
	Grade    int
}

func main() {
	// 连接数据库
	db, err := getDB()
	if err != nil {
		panic(err)
	}

	// 若表存在则删除
	err = db.Migrator().DropTable(&User{})
	if err != nil {
		panic(err)
	}

	// 自动创建表
	err = db.AutoMigrate(&User{})
	if err != nil {
		panic(err)
	}

	// 批量添加记录，只需要传递Slice即可
	var users = []User{
		{Name: "jinzhu1", Age: 18, Birthday: time.Now()},
		{Name: "jinzhu2", Age: 19, Birthday: time.Now()},
		{Name: "jinzhu3", Age: 20, Birthday: time.Now()},
	}
	result := db.Create(&users)

	// 检查错误
	if result.Error != nil {
		panic(err)
	}

	// 使用SQL表达式更新
	var user []User
	result = db.Where("name LIKE ?", "%jinzhu%").Find(&user).Updates(map[string]any{
		"age":   gorm.Expr("age * 0.5 + age * 0.5 + 10"),
		"grade": gorm.Expr("grade + ?", 60),
	})

	if result.Error != nil {
		panic(err)
	}
	fmt.Println("更新记录数目: ", result.RowsAffected)
}
```

:::

<br />

### 删除记录

#### 软删除

::: details 点击查看完整代码

```go
package main

import (
	"fmt"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"time"
)

func getDB() (*gorm.DB, error) {
	username := "root"
	password := "QiNqg[l.%;H>>rO9"
	host := "192.168.48.133"
	port := 3306
	dbName := "demo"
	charSet := "utf8mb4"
	conntimeout := "5s"
	readTimeout := "10s"
	writeTimeout := "10s"

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?parseTime=True&loc=Local&charset=%s&timeout=%s&readTimeout=%s&writeTimeout=%s",
		username,
		password,
		host,
		port,
		dbName,
		charSet,
		conntimeout,
		readTimeout,
		writeTimeout,
	)

	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	return db, err
}

type User struct {
	gorm.Model
	Name     string
	Age      int
	Birthday time.Time
}

func main() {
	// 连接数据库
	db, err := getDB()
	if err != nil {
		panic(err)
	}

	// 若表存在则删除
	err = db.Migrator().DropTable(&User{})
	if err != nil {
		panic(err)
	}

	// 自动创建表
	err = db.AutoMigrate(&User{})
	if err != nil {
		panic(err)
	}

	// 批量添加记录，只需要传递Slice即可
	var users = []User{
		{Name: "jinzhu1", Age: 18, Birthday: time.Now()},
		{Name: "jinzhu2", Age: 19, Birthday: time.Now()},
		{Name: "jinzhu3", Age: 20, Birthday: time.Now()},
		{Name: "1jinzhu", Age: 18, Birthday: time.Now()},
		{Name: "2jinzhu", Age: 19, Birthday: time.Now()},
		{Name: "3jinzhu", Age: 20, Birthday: time.Now()},
	}
	result := db.Create(&users)

	// 检查错误
	if result.Error != nil {
		panic(err)
	}

	// 查询并删除,默认是软删除,即更新deleted_at为当前时间
	var user []User
	result = db.Where("name LIKE ?", "jinzhu%").Find(&user).Delete(&user)
	if result.Error != nil {
		panic(err)
	}

	fmt.Println("删除记录数目: ", result.RowsAffected)
}
```

:::

#### 操作软删除

::: details 点击查看完整代码

```go
package main

import (
	"fmt"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"time"
)

func getDB() (*gorm.DB, error) {
	username := "root"
	password := "QiNqg[l.%;H>>rO9"
	host := "192.168.48.133"
	port := 3306
	dbName := "demo"
	charSet := "utf8mb4"
	conntimeout := "5s"
	readTimeout := "10s"
	writeTimeout := "10s"

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?parseTime=True&loc=Local&charset=%s&timeout=%s&readTimeout=%s&writeTimeout=%s",
		username,
		password,
		host,
		port,
		dbName,
		charSet,
		conntimeout,
		readTimeout,
		writeTimeout,
	)

	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	return db, err
}

type User struct {
	gorm.Model
	Name     string
	Age      int
	Birthday time.Time
}

func main() {
	// 连接数据库
	db, err := getDB()
	if err != nil {
		panic(err)
	}

	// 若表存在则删除
	err = db.Migrator().DropTable(&User{})
	if err != nil {
		panic(err)
	}

	// 自动创建表
	err = db.AutoMigrate(&User{})
	if err != nil {
		panic(err)
	}

	// 批量添加记录，只需要传递Slice即可
	var users = []User{
		{Name: "jinzhu1", Age: 18, Birthday: time.Now()},
		{Name: "jinzhu2", Age: 19, Birthday: time.Now()},
		{Name: "jinzhu3", Age: 20, Birthday: time.Now()},
		{Name: "1jinzhu", Age: 18, Birthday: time.Now()},
		{Name: "2jinzhu", Age: 19, Birthday: time.Now()},
		{Name: "3jinzhu", Age: 20, Birthday: time.Now()},
	}
	result := db.Create(&users)

	// 检查错误
	if result.Error != nil {
		panic(err)
	}

	// 查询并删除,默认是软删除,即更新deleted_at为当前时间
	var user []User
	result = db.Where("name LIKE ?", "jinzhu%").Find(&user).Delete(&user)
	if result.Error != nil {
		panic(err)
	}

	fmt.Println("删除记录数目: ", result.RowsAffected)

	// 查找软删除的记录
	// Unscoped()会操作所有记录,包括软删除的记录
	result = db.Unscoped().Where("deleted_at is not null").Find(&users)
	if result.Error != nil {
		panic(err)
	}
	fmt.Println("找到软删除记录数目: ", result.RowsAffected)

	for _, user := range users {
		fmt.Println(user.Name)
	}
}
```

:::

#### 硬删除

::: details 点击查看完整代码

```go
	// 硬删除
	var user []User
	result = db.Unscoped().Where("name LIKE ?", "jinzhu%").Find(&user).Delete(&user)
	if result.Error != nil {
		panic(err)
	}

	fmt.Println("硬删除记录数目: ", result.RowsAffected)
```

:::

<br />

### CURD总结

#### 钩子函数

文档：[https://gorm.io/zh_CN/docs/hooks.html](https://gorm.io/zh_CN/docs/hooks.html)

<br />

### 关系模型

#### 一对一



#### 一对多

一对多关系，通常在多的一方添加一个字段，用于存放主表主键的值，我们管这个字段叫**外键**



#### 多对多

多对多关系，需要创建第三张表，表中至少包含两个字段分别作为**外键**指向各自一方的主键

<br />