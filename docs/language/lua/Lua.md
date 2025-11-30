# Lua

官网：[https://www.lua.org/](https://www.lua.org/)

编辑器：[https://studio.zerobrane.com/](https://studio.zerobrane.com/)

<br />

## 安装

**ZeroBrane Studio编辑器说明**

* 自带 Lua 解释器，所以可以不需要专门下载Lua就可以写代码，当然也可以设置使用自己下载的Lua

  Edit -> Preferences -> Settings: User -> 这会打开`user.lua`文件，填下如下配置：

  `path.lua = [[D:\software\lua-5.4.2_Win64_bin\lua54.exe]]`：**这个配置有问题，不生效**

* 打开编辑后，默认带了一堆示例代码，可以删掉，但推荐保留，可以切换项目到一个新目录来编写自己的代码

  `Project -> Project Directory -> 选择自己的目录`
  
* **F6执行当前Lua文件的代码**

* **Ctrl + I** 修正代码缩进

<br />

**下载预编译好的Lua到系统中**

Lua 官网不给 Windows 预编译版本，但社区长期提供稳定可用的发布：

1、[https://luabinaries.sourceforge.net/](https://luabinaries.sourceforge.net/)

2、选择版本，然后选择 Tools Executables

3、Windows系统下载 `lua-5.4.2_Win64_bin.zip`，其他系统下载对应系统的版本

4、解压后你会得到这些文件：

* `lua54.dll`：Lua 的动态库，给其他程序调用 Lua 使用的
* `lua54.exe`：标准的 Lua 解释器（命令行交互、运行 lua 脚本的主程序）
* `luac54.exe`：Lua 编译器（把 Lua 源码编译成字节码）
* `wlua54.exe`：Windows GUI 模式的 Lua 解释器（运行脚本时不会弹出命令行窗口）

5、将Lua目录加入到系统PATH环境变量中去

6、验证是否安装成功

```bash
C:\Users\VVFock3r> lua54 -v
Lua 5.4.2  Copyright (C) 1994-2020 Lua.org, PUC-Rio
```

**查看Lua版本和路径**

```lua
print(_VERSION)
```

<br />

## 注释语法

**基本语法**

* 单行注释以 `--` 开头
* 多行注释以`--[[`开头, 以 `]]`结尾

```lua
-- 1.这是单行注释
local a = 10  -- 代码后面也可以写注释

--[[
2.这是多行注释
x
y
z
]]
```

**注意事项**

在单行注释中，可以再写 单行注释，没问题；在多行注释中，就不能随便写内容了，准确的说是，默认情况下不能出现 结尾注释符 `]]`

```lua
--[[
  --[[
    这种写法会报语法错误, 遇到第一个 ]] 就代表整个多行注释结束了, 剩下的]]就报错了
  ]]
]]
```

**解决办法**

```lua
--[=[
  --[[
    这种写法没问题
    规则：
      必须以 --[ 开头
      中间可以有 0 个或多个 =
      结束必须是 ] + 相同数量的 = + ]
    
    不能替换为 @、*、# 等其他字符
    
    当然在注释里面也不能写 ]等号]
  ]]
]=]
```

<br />

## 定义变量

```lua
-- 直接赋值, 就是全局变量
 b = 20

-- 使用local定义局部变量
local a = 10

-- 引用变量
print(a, b)
```

<br />

## 变量作用域

```lua
-- do end用来创建一个局部作用域
-- 变量的作用域 
--      _ENV指向_G的情况下：取决于你是否使用了 local 关键字, 也就是说 在局部作用域中没有使用ocal定义变量, 那么这个变量就是全局的
--      _ENV = {} 的情况下, b = 20 不会改变_G的值, 也就不是全局变量了

do
    local a = 10  -- 局部变量
    b = 20        -- 全局变量
    print(a)      -- 10
end

print(a)          -- nil，局部变量在块外不可访问
print(b)          -- 20
```

<br />

## 内置变量

**基础**

```lua
-- _G 永远指向全局表, 可以通过 _G["变量名"] 访问或修改全局变量
-- _ENV 是当前作用域的环境表，可以局部覆盖，实现“局部全局变量”, Lua 5.2 及以上版本才有。
-- 如果_ENV被设置为空, 那么_G也是访问不了的, 解决办法是提前保存一份_G到一个变量中

-- _VERSION Lua版本信息
-- 基础全局函数: print, type, assert, pairs, ipairs 等
-- 标准库表: math, string, table, io, os, debug, coroutine

print("Lua版本:", _VERSION)
print()

-- 遍历_G, 打印出key和value
print("遍历_G:")
print(string.format("%-20s %s", "Key", "Value"))
for k, v in pairs(_G) do
    print(string.format("%-20s %s", k ,v))
end
```

**`_G`和`_ENV`的区别 **

```lua
-- 默认全局环境
print("=== 默认环境 ===")
a = 10            -- 写入全局环境 (_G)
print(a)          -- 10
print(_G.a)       -- 10
print(_ENV.a)     -- 10（默认 _ENV 指向 _G）

-- do end用来创建一个局部作用域
print("=== 局部作用域 ===")
local G = _G
do  
    local _ENV = {}     -- 创建一个新的空的局部环境并覆盖当前作用域
    print = G["print"]  -- 写入局部 _ENV, 注意要写入print, 不然下面使用print的时候会报错
    b = 20              -- 写入局部 _ENV, 注意这里没有用local, 但是也并不会改变_G的值, 也就是并不是全局
    print(b)
    print(a)            --- nil
end

-- 回到全局环境
print("=== 回到全局 ===")
print(a)          -- 10（全局值不受局部 _ENV 影响）
print(_G.a)       -- 10
print(b)          -- nil

-- 疑问：访问不了_G, 但是为什么可以访问G呢?
```

<br />

## 判断循环和控制语句

**if判断语句**

```lua
--[[
if语法: 
if 条件 then
    -- 条件为 true 执行的代码
else
    -- 条件为 false 执行的代码
end

--------------------------------
备注: 
1.else语句不是必须要写的
2.Lua 支持在一行写简单 if，比如 if x > 5 then print("x 大于 5") end
]]
local i = -1
if i > 0 then
    print("大于0")
else
    print("小于0")
end
```

**while循环语句**

```lua
-- while 循环
--[[
while 条件 do
    -- 循环体
end

备注: repeat … until 循环（do…while 类似）,这里不详细讲了
]]

local i = 1
while true do
  if i >= 5 then
    break
  end
  i = i + 1
  print("+1")
end
print(i)
```

**for循环语句**

```lua
-- for 循环
--[[
for 变量 = 起始值, 结束值, 步长 do
    -- 循环体
end

步长可以省略，默认 1
支持正向和负向循环
]]

for i=1, 5 do
  print(i)
end
```

**循环控制关键字**

```lua
--[[
循环控制关键字
  break	      立即退出循环
  return	    在函数中终止循环并返回
  goto label	跳转到指定标签（Lua 5.2+）

特别注意这里没有continue

]]

for i=1, 5 do
  -- 如果i==3的时候跳过, 因为没有continue, 所以下面的代码是错的
  -- if i == 3 then continue end
  print(i)
end
print()


-- 使用 if then模拟， ~=是不等于, 没有 != 这样的写法
for i=1, 5 do
  if i ~= 3 then
    print(i)
  end
end
print()

-- 使用 goto 跳转
for i=1, 5 do
  if i == 3 then goto continue end
  print(i)
  ::continue::
end
```

<br />

## 基本类型：初识

Lua 是一种 **动态类型语言**，变量没有固定类型，值才有类型。类型在运行时自动决定。

Lua 中有八种基本类型：

* nil类型：只有一个值，即*nil* ，表示一个空值，变量未赋值时默认是 `nil`
* boolean 类型：有两个值：**false**和**true**。只有 `nil` 和 `false` 视为假，其它都为真（包括 0）
* number：使用 **双精度浮点数**（和 Python 的 float 一样），表示整数、小数、科学计数都可以
* string：**既可以用单引号 `'`，也可以用双引号 `"`**，二者作用完全相同。字符串是 **不可变** 的
* function：函数是一等公民
* table（表）：**唯一的复合数据类型**，非常强大
* thread（协程）：Lua 的 “线程” 指的是 **协程 (coroutine)**，不是系统线程
* userdata（用户数据）：表示 **C/C++ 传递给 Lua 的原生数据结构**，本质上让 Lua 能操作外部对象

<br />

## 基本类型：string

**长字符串**

```lua
-- 如果字符串里既有单引号又有双引号，可以使用 长字符串 语法（[[ ... ]]）, 也支持多行字符串
-- 如果字符串内部需要 ]]，可以用带等号的长字符串 [=[  ......  ]=]
s = [[
第一行字符串
第二行字符串
单双引号都有 "I'm learning Lua"
]]
print(s)
```

**字符串拼接**

```lua
-- 字符串拼接, 使用 .. , 没有其他语言的+号
local a = "Hello"
local b = "World"

print(a .. b)  -- 输出 HelloWorld
print(a .. " " .. b)  -- 输出 Hello World
print()


-- 拼接时两边必须是字符串, 如果不是字符串会先转为字符串再拼接, 如果不能转为字符串会报错(比如布尔类型/nil等)
-- tostring() 会把任意类型安全转换为字符串：
--             数字 → 字符串
--            布尔 → "true" / "false"
--            nil → "nil"
local x = "Hello"
local y = false
print(x .. tostring(y))
```

<br />

## 基本类型：table

**创建table**

```lua
-- table 是 键值对集合
-- 所有键都可以是任意类型（除了 nil）
local t1 = {}  -- 创建一个空able
t1["name"] = "Bob"
t1[1] = 100
t1.x = 300
print(t1)


-- 数组形式，Lua 数组从 1 开始计数（不是 0！）
local t2 = {10, 20, 30}
print(t2[1])  -- 10

-- 键值形式（字典）
local t3 = {name="Alice", age=20}
print(t3.name, t3.age)

-- 混合形式, 500对应的索引是3
local t4 = {10, 20, x=100, y=200, 500}
print(t4[3])
```

**遍历table**

```lua
-- 混合形式, 500对应的索引是3
local t = {10, 20, x=100, y=200, 500}

-- 遍历table （无序）
-- pairs(t) 遍历所有键, 是无序的
for k, v in pairs(t) do
  print(k, v)
end
print()

-- 仅遍历数组部分（有序）
-- ipairs(t) 1 开始的连续数字索引, 注意是连续索引
for i, v in ipairs(t) do
  print(i, v)
end
print()


-- 注意看下面例子, 索引4不存在, 所以索引5不会被遍历到
local t2 = {}
t2[1] = 100
t2[2] = 200
t2[3] = 300
t2[5] = 500
for i, v in ipairs(t2) do
  print(i, v)
end
print()

-- #t是table的长度, 只关心索引, 也是遇到nil就不再计算, 在这里长度是3
print(#t)
print(#t2)
print()

-- 使用table长度遍历, 效果和ipairs一样
for i = 1, #t2 do
    print(i, t2[i])
end

-- pairs 和 ipairs 永远遍历不出 nil, Lua 的任何遍历都无法“看到 nil”
-- nil 表示“没有这个键”，Lua 的哈希结构里根本不会存储“键值为 nil 的项”
```

**插入和删除**

```lua
-- 插入到数组中
local t = {10, 20, 30}
table.insert(t, 40)
for i, v in ipairs(t) do
  print(v)
end
print()

-- 指定位置插入
table.insert(t, 2, 12)
for i, v in ipairs(t) do
  print(v)
end
print()

-- 删除第二个索引的值
table.remove(t, 2)
for k, v in pairs(t) do
  print(v)
end
print()
```

**排序**

```lua
-- 定义able
local t = {30, 20, 15, 10}

-- 默认排序
table.sort(t)
for _, v in ipairs(t) do
  print(v)
end
print()

-- 自定义排序: 按照从大到小排序
table.sort(t, function(a, b)
    return a > b
end)
for _, v in ipairs(t) do
  print(v)
end
```

**拼接**

```lua
local t = {"A", "B", "C"}
print(table.concat(t, ","))  --> A,B,C
```

**table 作为对象（OOP 雏形）**

```lua
-- table 作为对象（OOP 雏形）
local person = {}
person.name = "Bob"
person.say = function(self)
    print("Hi, I am", self.name)
end

print(person.name)  -- Bob
person:say()        -- Hi, I am Bob

-- 注意上面函数调用的方式 person:say()
-- person:say() 相当于 person.say(person), 冒号（:）会自动把“对象本身”作为第一个参数（self）传进去
-- 下面两种定义方式是相等的
function person:say2()
    print(self.name)
end

function person.say3(self)
    print(self.name)
end

person:say2()
person:say3()
```

**table当作 set（集合）**

```lua
local set = {}
set["apple"] = true
set["banana"] = true
if set["apple"] then print("存在") end
```

<br />

## 基本类型：thread
