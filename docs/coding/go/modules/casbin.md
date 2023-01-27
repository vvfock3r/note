## casbin

Github：[https://github.com/casbin/casbin](https://github.com/casbin/casbin)

文档：[https://casbin.io/zh/docs/overview](https://casbin.io/zh/docs/overview)

在线编辑器：[https://casbin.io/zh/editor](https://casbin.io/zh/editor)

### 在线调试

**（1）ACL示例**

![img](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//D1B8068391CF41F698965C29302C9C49.png)

<br />

**以上图的例子说明**

* 模型文件定义输入格式

  ```bash
  # 模型文件中定义的输入格式
  [request_definition]
  r = sub, obj, act
  
  # 和输入一一对应起来
  alice 对应 sub
  data1 对应 obj
  read  对应 act
  r 代表着这是一个变量，后面通过r.sbu可以调用到alice
  ```

* 模型文件定义规则格式

  ```bash
  # 模型文件中定义规则格式
  [policy_definition]
  p = sub, obj, act
  
  # 对于Policy文件中的第一条数据来说
  sub  对应 alice
  obj  对应 data1
  act  对应 read
  
  # 实际上还有一个字段 eft，他只有两个值 allow(允许,这是默认值)、deny(拒绝)
  ```

* 模型文件定义匹配规则

  ```bash
  # 这里的意思是：输入和定义必须完全匹配
  # 这里可以定义各种各样的规则，有可能会匹配到多条，所以到这里还不能最终确定是允许还是拒绝
  [matchers]
  m = r.sub == p.sub && r.obj == p.obj && r.act == p.act
  ```

* 模型文件定义最终允许还是拒绝；`policy_effect`总共就支持几种，挑选一种合适自己的即可

  参考文档：[https://casbin.io/zh/docs/syntax-for-models#policy-effect%E5%AE%9A%E4%B9%89](https://casbin.io/zh/docs/syntax-for-models#policy-effect%E5%AE%9A%E4%B9%89)

  ```bash
  # 这里的意思是：只要有一个是允许的最终就会允许
  [policy_effect]
  e = some(where (p.eft == allow))
  ```

  看下面的例子，虽然我们定义了deny，但policy_effect中定义**只要有一条允许最终就是允许**，所以返回结果是`true`

  ![image-20220919152946411](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220919152946411.png)

  修改一下`policy_effect`，需要满足两个条件才可以：（1）允许（2）不允许有拒绝

  所以这里返回了`false`

  ![image-20220919153045186](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220919153045186.png)

**（2）RBAC示例**

![image-20220919154506579](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220919154506579.png)

**在RBAC模型中**：

* 输入参数保持不变

* 模型文件中增加了角色定义

  ```bash
  [role_definition] # 定义角色
  g = _, _          # 这里的两个参数一般代表：用户, 角色，关系为：用户属于某个角色
  ```

* 匹配规则中也增加了角色处理

  ```bash
  [matchers]
  m = g(r.sub, p.sub) && r.obj == p.obj && r.act == p.act
  
  # g(r.sub, p.sub) 这一句比较难理解
  #  (1) g是一个函数,他会判断r.sub是否属于p.sub这个角色，返回true或false
  #  (2) 他会找到r.sub的角色，并根据规则文件中角色的权限来判断
  #  (3) 同时也会使用自己的权限来判断（规则文件中直接对用户进行做的授权）
  ```

<br />

### 模块安装

```bash
go get github.com/casbin/casbin/v2
```

<br />

### 适配器（Adapters）

文档

* [https://casbin.io/zh/docs/policy-storage](https://casbin.io/zh/docs/policy-storage)
* [https://casbin.io/zh/docs/adapters](https://casbin.io/zh/docs/adapters)

适配器（`Adapter`）就是定义如何存储和读写`Policy`

* 我们也可以不使用任何适配器，将模型和`Policy`全部在代码中写死，但是这不利于扩展
* 常用的适配器有：文件（内置）、数据库（需安装对应模块）

<br />

#### （1）仅使用代码

::: details 点击查看完整代码

```go
package main

import (
	"fmt"
	"github.com/casbin/casbin/v2"
	"github.com/casbin/casbin/v2/model"
	"log"
)

func main() {
	var (
		ok  bool
		err error
	)

	// 定义模型和规则
	modelString := `
		[request_definition]
		r = sub, obj, act
		
		[policy_definition]
		p = sub, obj, act
		
		[role_definition]
		g = _, _
		
		[policy_effect]
		e = some(where (p.eft == allow))
		
		[matchers]
		m = g(r.sub, p.sub) && r.obj == p.obj && r.act == p.act
	`
	policies := [][]string{
		{"p", "alice", "data3", "read"},
		{"p", "alice", "data4", "write"},

		{"p", "admin", "data1", "read"},
		{"p", "admin", "data1", "write"},

		{"p", "admin", "data2", "read"},
		{"p", "admin", "data2", "write"},

		{"g", "alice", "admin"},
	}

	// 初始化模型
	m, err := model.NewModelFromString(modelString)
	if err != nil {
		log.Fatalf("error: NewModelFromString: %s", err)
	}

	// 初始化Casbin
	e, err := casbin.NewEnforcer(m)
	if err != nil {
		log.Fatalf("error: NewEnforcer: %s", err)
	}

	// 动态添加规则
	// (1) 使用AddPolicy、AddRoleForUser等函数添加时，返回值第一个参数为布尔值，true代表添加成功，false代表对象已经存在，无需重复添加，
	//     根据实际情况选择是否使用这个值，如果不使用直接忽略掉即可，即使用_丢弃掉
	// (2) 若要一次性添加多条规则，可以使用AddPolicies，但是需要注意
	//     假如多条规则中任意一个规则若已经存在在当前的e对象中，那么所有的规则都不会被添加
	for _, policy := range policies {
		if policy[0] == "p" {
			_, err = e.AddPolicy(policy[1:])
			if err != nil {
				log.Fatalf("error: AddPolicy: %s", err)
			}
		} else if policy[0] == "g" {
			_, err = e.AddRoleForUser(policy[1], policy[2], policy[3:]...)
			if err != nil {
				log.Fatalf("error: AddRoleForUser: %s", err)
			}
		} else {
			log.Fatalf("error: Unknown ptype: %s", policy[0])
		}
	}

	// 获取所有的规则
	fmt.Println(e.GetPolicy()) // 只能获取p，不能获取g

	// 定义输入参数
	sub := "alice"
	obj := "data1"
	act := "read"

	// 校验输入是否有权限
	ok, err = e.Enforce(sub, obj, act)
	if err != nil {
		log.Fatalf("error: Enforce: %s", err)
	}

	// 校验结果
	if ok {
		fmt.Println("通过")
	} else {
		fmt.Println("拒绝")
	}
}
```

:::

#### （2）文件适配器

::: details 点击查看完整代码

`model.conf`

```ini
[request_definition]
r = sub, obj, act

[policy_definition]
p = sub, obj, act

[role_definition]
g = _, _

[policy_effect]
e = some(where (p.eft == allow))

[matchers]
m = g(r.sub, p.sub) && r.obj == p.obj && r.act == p.act
```

`policy.csv`

```
g, alice, admin

p, alice, data3, read
p, alice, data4, write

p, admin, data1, read
p, admin, data1, write
p, admin, data2, read
p, admin, data2, write
```

`main.go`

```go
package main

import (
	"fmt"
	"github.com/casbin/casbin/v2"
	fileadapter "github.com/casbin/casbin/v2/persist/file-adapter"
)

func main() {
	// 初始化Casbin
	//e, err := casbin.NewEnforcer("./model.conf", "./policy.csv")
	//if err != nil {
	//	panic(err)
	//}

	// 以上代码等同于如下代码
	a := fileadapter.NewAdapter("./policy.csv")
	e, err := casbin.NewEnforcer("./model.conf", a)
	if err != nil {
		panic(err)
	}

	// 定义输入参数
	sub := "alice"
	obj := "data2"
	act := "read"

	// 校验输入是否有权限
	ok, err := e.Enforce(sub, obj, act)
	if err != nil {
		panic(err)
	}

	// 校验结果
	if ok {
		fmt.Println("通过")
	} else {
		fmt.Println("拒绝")
	}
}
```

:::

#### （3）Gorm适配器

文档：[https://github.com/casbin/gorm-adapter](https://github.com/casbin/gorm-adapter)

安装

```bash
go get github.com/casbin/gorm-adapter/v3
```

::: details 点击查看完整代码

```go
package main

import (
	"fmt"
	"github.com/casbin/casbin/v2"
	"github.com/casbin/casbin/v2/model"
	gormadapter "github.com/casbin/gorm-adapter/v3"
	"log"
)

func main() {
	var (
		ok  bool
		err error
	)

	// 定义模型和规则
	modelString := `
		[request_definition]
		r = sub, obj, act
		
		[policy_definition]
		p = sub, obj, act
		
		[role_definition]
		g = _, _
		
		[policy_effect]
		e = some(where (p.eft == allow))
		
		[matchers]
		m = g(r.sub, p.sub) && r.obj == p.obj && r.act == p.act
	`
	policies := [][]string{
		{"p", "alice", "data3", "read"},
		{"p", "alice", "data4", "write"},

		{"p", "admin", "data1", "read"},
		{"p", "admin", "data1", "write"},

		{"p", "admin", "data2", "read"},
		{"p", "admin", "data2", "write"},

		{"g", "alice", "admin"},
	}

	// 初始化模型
	m, err := model.NewModelFromString(modelString)
	if err != nil {
		log.Fatalf("error: NewModelFromString: %s", err)
	}

	// 初始化Gorm适配器, 参数true会自动创建表 casbin_rule
	// 如果已经有一个Gorm实例，可以通过 gormadapter.NewAdapterByDB(gormInstance) 来实例适配器
	adapter, _ := gormadapter.NewAdapter("mysql", "root:QiNqg[l.%;H>>rO9@tcp(192.168.48.133:3306)/demo", true)

	// 初始化casbin
	e, err := casbin.NewEnforcer(m, adapter)
	if err != nil {
		log.Fatalf("error: NewEnforcer: %s", err)
	}

	// 从数据库中读取规则
	if err = e.LoadPolicy(); err != nil {
		log.Fatalf("error: read policy from adapter: %s", err)
	}

	// 动态添加规则
	for _, policy := range policies {
		if policy[0] == "p" {
			_, err = e.AddPolicy(policy[1:])
			if err != nil {
				log.Fatalf("error: AddPolicy: %s", err)
			}
		} else if policy[0] == "g" {
			_, err = e.AddRoleForUser(policy[1], policy[2], policy[3:]...)
			if err != nil {
				log.Fatalf("error: AddRoleForUser: %s", err)
			}
		} else {
			log.Fatalf("error: Unknown ptype: %s", policy[0])
		}
	}

	// 保存规则到数据库中
	//  (1) 这会删除所有存储中的policy规则并将当前规则保存到数据库中，当规则较多时会可能会引起性能问题
	//  (2) Gorm支持自动保存规则，所以下面的代码不会必须的
	//      自动保存：https://casbin.io/zh/docs/adapters#%E8%87%AA%E5%8A%A8%E4%BF%9D%E5%AD%98
	if err = e.SavePolicy(); err != nil {
		log.Fatalf("error: SavePolicy: %s", err)
	}

	// 定义输入参数
	sub := "alice"
	obj := "data1"
	act := "read"

	// 校验输入是否有权限
	ok, err = e.Enforce(sub, obj, act)
	if err != nil {
		log.Fatalf("error: Enforce: %s", err)
	}

	// 校验结果
	if ok {
		fmt.Println("通过")
	} else {
		fmt.Println("拒绝")
	}
}
```

输出结果

```bash
# 查看数据库
mysql> use demo;
Reading table information for completion of table and column names
You can turn off this feature to get a quicker startup with -A

Database changed
mysql> show tables;
+----------------+
| Tables_in_demo |
+----------------+
| casbin_rule    |
+----------------+
1 row in set (0.01 sec)

mysql> desc casbin_rule;
+-------+-----------------+------+-----+---------+----------------+
| Field | Type            | Null | Key | Default | Extra          |
+-------+-----------------+------+-----+---------+----------------+
| id    | bigint unsigned | NO   | PRI | NULL    | auto_increment |
| ptype | varchar(100)    | YES  | MUL | NULL    |                |
| v0    | varchar(100)    | YES  |     | NULL    |                |
| v1    | varchar(100)    | YES  |     | NULL    |                |
| v2    | varchar(100)    | YES  |     | NULL    |                |
| v3    | varchar(100)    | YES  |     | NULL    |                |
| v4    | varchar(100)    | YES  |     | NULL    |                |
| v5    | varchar(100)    | YES  |     | NULL    |                |
+-------+-----------------+------+-----+---------+----------------+
8 rows in set (0.00 sec)

mysql> select * from casbin_rule order by id;
+----+-------+-------+-------+-------+------+------+------+
| id | ptype | v0    | v1    | v2    | v3   | v4   | v5   |
+----+-------+-------+-------+-------+------+------+------+
|  1 | p     | alice | data3 | read  |      |      |      |
|  2 | p     | alice | data4 | write |      |      |      |
|  3 | p     | admin | data1 | read  |      |      |      |
|  4 | p     | admin | data1 | write |      |      |      |
|  5 | p     | admin | data2 | read  |      |      |      |
|  6 | p     | admin | data2 | write |      |      |      |
|  7 | g     | alice | admin |       |      |      |      |
+----+-------+-------+-------+-------+------+------+------+
7 rows in set (0.01 sec)
```

:::

<br />

### 匹配器（Matchers）

文档

* 基本介绍：[https://casbin.io/zh/docs/syntax-for-models#匹配器](https://casbin.io/zh/docs/syntax-for-models#匹配器)

* 内置函数：[https://casbin.io/zh/docs/function](https://casbin.io/zh/docs/function)
* 函数源码：[https://github.com/casbin/casbin/blob/master/util/builtin_operators.go](https://github.com/casbin/casbin/blob/master/util/builtin_operators.go)

<br />

#### keyMatch：仅支持*的URL匹配

![image-20220921104614645](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220921104614645.png)

<br />

#### keyMatch2：支持*和:的URL匹配

![image-20220921104534570](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220921104534570.png)

<br />

#### keyMatch3：支持*和{}的URL匹配

![image-20220921104449235](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220921104449235.png)

<br />

#### keyMatch4：严格模式的keyMatch3

如果Policy中出现两次`{id}`，那么

**（1）`keyMatch3`允许传递不同的值**

![image-20220921105333528](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220921105333528.png)

**（2）`keyMatch4`要求值必须相等**

![image-20220921105610083](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220921105610083.png)

<br />

#### regexMatch：正则表达式匹配

![image-20220921111238869](https://tuchuang-1257805459.cos.accelerate.myqcloud.com//image-20220921111238869.png)

<br />

#### 自定义比较函数

::: details 点击查看完整代码

```go
package main

import (
	"fmt"
	"github.com/casbin/casbin/v2"
	"github.com/casbin/casbin/v2/model"
	"log"
	"regexp"
)

// (1) 编写自定义函数，这里是把 RegexMatch代码拷出来了，并做了一些简单的修改，用来测试
func RegexMatch(key1 string, key2 string) bool {
	res, err := regexp.MatchString(key2, key1)
	if err != nil {
		panic(err)
	}
	return res
}

func RegexMatchFunc(args ...any) (any, error) {
	name1 := args[0].(string)
	name2 := args[1].(string)
	return bool(RegexMatch(name1, name2)), nil
}

func main() {
	var (
		ok  bool
		err error
	)

	// 定义模型和规则
	// (3) 模型中使用自定义函数
	modelString := `
		[request_definition]
		r = sub, obj, act
		
		[policy_definition]
		p = sub, obj, act
		
		[role_definition]
		g = _, _
		
		[policy_effect]
		e = some(where (p.eft == allow))
		
		[matchers]
		m = g(r.sub, p.sub) && ( r.obj == p.obj || my_func(r.obj, p.obj) ) && r.act == p.act
	`
	// (4) obj对应的位置我们可以写一些正则
	policies := [][]string{
		{"p", "alice", "data3", "read"},
		{"p", "alice", "data4", "write"},

		{"p", "admin", "(^data1$)|(^data2$)", "read"},
		{"p", "admin", "(^data1$)|(^data2$)", "write"},
		{"g", "alice", "admin"},
	}

	// 初始化模型
	m, err := model.NewModelFromString(modelString)
	if err != nil {
		log.Fatalf("error: NewModelFromString: %s", err)
	}

	// 初始化Casbin
	e, err := casbin.NewEnforcer(m)
	if err != nil {
		log.Fatalf("error: NewEnforcer: %s", err)
	}

	// (2) 注册自定义函数
	e.AddFunction("my_func", RegexMatchFunc)

	// 动态添加规则
	for _, policy := range policies {
		if policy[0] == "p" {
			_, err = e.AddPolicy(policy[1:])
			if err != nil {
				log.Fatalf("error: AddPolicy: %s", err)
			}
		} else if policy[0] == "g" {
			_, err = e.AddRoleForUser(policy[1], policy[2], policy[3:]...)
			if err != nil {
				log.Fatalf("error: AddRoleForUser: %s", err)
			}
		} else {
			log.Fatalf("error: Unknown ptype: %s", policy[0])
		}
	}

	// 定义输入参数
	sub := "alice"
	obj := "data1"
	act := "read"

	// 校验输入是否有权限
	ok, err = e.Enforce(sub, obj, act)
	if err != nil {
		log.Fatalf("error: Enforce: %s", err)
	}

	// 校验结果
	if ok {
		fmt.Println("通过")
	} else {
		fmt.Println("拒绝")
	}
}
```

:::

<br />

#### 超级管理员模式

文档：[https://casbin.io/zh/docs/supported-models](https://casbin.io/zh/docs/supported-models)

比如超级管理员设置为`root`，那么只需要更新`model`为

```bash
m = g(r.sub, p.sub) && r.obj == p.obj && r.act == p.act || r.sub == "root"
```

<br />