## 一、Python解释器

官方文档：[https://docs.python.org/zh-cn/3.9/tutorial/interpreter.html](https://docs.python.org/zh-cn/3.9/tutorial/interpreter.html)



### 解释器的多种实现

官方文档：[https://docs.python.org/zh-cn/3.9/reference/introduction.html#implementations](https://docs.python.org/zh-cn/3.9/reference/introduction.html#implementations)



CPython

这是最早出现并持续维护的 Python 实现，以 C 语言编写。新的语言特性通常在此率先添加。

平常使用的就是CPython

Jython

以 Java 语言编写的 Python 实现。此实现可以作为 Java 应用的一个脚本语言，或者可以用来创建需要 Java 类库支持的应用。想了解更多信息可访问 [Jython 网站](http://www.jython.org/)

Python for .NET

此实现实际上使用了 CPython 实现，但是属于 .NET 托管应用并且可以引入 .NET 类库。它的创造者是 Brian Lloyd。想了解详情可访问 [Python for .NET 主页](https://pythonnet.github.io/)

IronPython

另一个 .NET 的 Python 实现，与 Python.NET 不同点在于它是生成 IL 的完全 Python 实现，并且将 Python 代码直接编译为 .NET 程序集。它的创造者就是当初创造 Jython 的 Jim Hugunin。想了解详情可访问 [IronPython 网站](http://ironpython.net/)

PyPy

完全使用 Python 语言编写的 Python 实现。它支持多个其他实现所没有的高级特性，例如非栈式支持和 JIT 编译器等。此项目的目标之一是通过允许方便地修改解释器 (因为它是用 Python 编写的)，鼓励该对语言本身进行试验。想了解详情可访问 [PyPy 项目主页](http://pypy.org/)



总结

| 实现语言 | 解释器名称                  | 官网                                                         | 备注                             |
| -------- | --------------------------- | ------------------------------------------------------------ | -------------------------------- |
| C        | CPython                     | [https://www.python.org/](https://www.python.org/)           | 官方实现                         |
| Python   | PyPy                        | [https://www.pypy.org/](https://www.pypy.org/)               | Python实现                       |
| Java     | Jython                      | [https://www.jython.org/](https://www.jython.org/)           | Java实现                         |
| .Net     | Python for .NET和IronPython | [https://pythonnet.github.io/](https://pythonnet.github.io/)<br />[https://ironpython.net/](https://ironpython.net/) | .Net相关，但是并非完全由.Net实现 |

### 增强版交互式解释器（REPL）

#### IPython

官网地址：[https://ipython.org/](https://ipython.org/)

```bash
# 安装
pip install ipython

# 启动
ipython
```



#### Jupyter Notebook

官网地址：[https://jupyter.org/](https://jupyter.org/)

安装

```bash
# 安装 
pip install jupyter

# 设置密码(可选)
jupyter notebook password

# 启动
# 注意：--notebook-dir 指定文件目录，需提前创建；--allow-root 允许root用户运行此命令，默认不允许
jupyter notebook --ip=127.0.0.1 --port 8888 --notebook-dir=%USERPROFILE%/Desktop/jupyter  --allow-root
```

快捷键 

| 快捷键        | 说明                             |
| ------------- | -------------------------------- |
| Enter         | 进入编辑模式                     |
| Ctrl + Enter  | 执行语句，并保持在当前Cell（行） |
| Shift + Enter | 执行语句，并进入下一个Cell（行） |
| ↑↓            | 上/下一个Cell（行）              |



### 版本管理

主要用来再不改动代码的情况下，方便不同Python版本之间的切换

####　Pyenv

Pyenv（非Windows版本）项目地址：[https://github.com/pyenv/pyenv](https://github.com/pyenv/pyenv)

Pyenv-Win(Windows版本) 项目地址：[https://github.com/pyenv-win/pyenv-win](https://github.com/pyenv-win/pyenv-win)



Pyenv安装

```bash
# windows cmd命令行安装
1.cmd执行
pip install pyenv-win --target %USERPROFILE%\.pyenv  # %USERPROFILE%为用户配置文件目录，一般情况下和用户家目录相同

2.PowerShell执行
[System.Environment]::SetEnvironmentVariable('PYENV',$env:USERPROFILE + "\.pyenv\pyenv-win\","User")
[System.Environment]::SetEnvironmentVariable('PYENV_HOME',$env:USERPROFILE + "\.pyenv\pyenv-win\","User")

3.PowerShell执行
[System.Environment]::SetEnvironmentVariable('path', $HOME + "\.pyenv\pyenv-win\bin;" + $HOME + "\.pyenv\pyenv-win\shims;" + $env:Path,"User")

4.检查是否安装成功
C:\Users\VVFock3r>pyenv --version
pyenv 2.64.3
```



Pyenv命令

```bash
# 查看所有可安装版本
pyenv install --list

# 查看当前版本 
# 注：
# 	linux这里会显示system，方便以后我们切了版本之后想要再切回来
#	windows不知道是不是bug，这里什么也不显示，这样当我们以后想切回系统版本就很不好弄了
#	临时解决办法就是：用完了就卸载指定版本
pyenv version

# 安装指定版本
# 注：
#	(1) 带-win32的为32位版本，不带的为64位版本 
#	(2) 如果下载慢，用迅雷下载，然后放到指定目录，安装时各目录都有说明
#	(3) 安装过程较慢，请耐心等待
C:\Users\VVFock3r>pyenv install 3.9.0a4
:: [Info] ::  Mirror: https://www.python.org/ftp/python
:: [Downloading] ::  3.9.0a4 ...
:: [Downloading] ::  From https://www.python.org/ftp/python/3.9.0/python-3.9.0a4-amd64-webinstall.exe
:: [Downloading] ::  To   C:\Users\VVFock3r\.pyenv\pyenv-win\install_cache\python-3.9.0a4-amd64-webinstall.exe
^CTerminate batch job (Y/N)? y

C:\Users\VVFock3r>pyenv install 3.9.0a4
:: [Info] ::  Mirror: https://www.python.org/ftp/python
:: [Installing] ::  3.9.0a4 ...


# 切换到指定版本
pyenv global 3.9.0a4	# 全局python解释器切换
pyenv local  3.9.0a4	# 当前目录及子目录下的python解释器切换

# 查看所有已安装版本
pyenv versions

# 卸载指定版本 
pyenv uninstall 3.9.0a4
```



### 全局解释器锁GIL

#### GIL是什么？

GIL，全称为Global Interpreter Lock，中文翻译为全局解释器锁，属于互斥锁，

简单来说就是给Python解释器上了一把锁，同一时刻只允许同时一个线程执行代码，同一时刻只能利用单核CPU，

这就导致Python的多线程并非是真正的多线程



#### GIL的优点

CPython使用引用计数作为垃圾回收器的内存管理技术，工作原理如下：

1.每个对象都有一个引用计数，

2.当对象被赋给一个新的变量名或被添加到一个容器(如元组、列表等)时，引用计数会增加，

​    同样，当引用超出范围或调用del语句时，引用计数也会减少

3.当一个对象的引用计数达到0时，它将被垃圾回收，分配的内存将被释放



在多线程下引用计数变量需要被保护（因为赋值等操作是非原子的），此时有两种解决办法：

（1）给每个对象添加一个锁，这可能 增加死锁的可能性，并且性能开销较大

（2）添加全局解释器锁，只有一把锁，管理简单，且开销较小



#### GIL的缺点

GIL导致Python无法真正的使用多核CPU资源，无法真正并行



总结

CPU密集型任务不适合多线程，相比单线程反而会降低效率，此时可以使用多进程代替

IO密集型任务可以使用多线程



参考资料

官方Wiki：[https://wiki.python.org/moin/GlobalInterpreterLock](https://wiki.python.org/moin/GlobalInterpreterLock)



### 常用选项及环境变量

官方文档：[https://docs.python.org/zh-cn/3.9/using/cmdline.html#using-on-general](https://docs.python.org/zh-cn/3.9/using/cmdline.html#using-on-general)



#### -c	&lt;command&gt;	执行Python代码

```bash
python -c "import sys;print('.'.join([str(x) for x in sys.version_info[:3]]))"
3.9.2
```

#### -m &lt;module-name&gt;	执行模块代码	

执行模块中`if __name__ == '__main__':`下面的内容

```bash
# 示例1 - 开启http server
python -m http.server 80
Serving HTTP on :: port 80 (http://[::]:80/) ...

# 示例2 - 格式化JSON串，非JSON格式会报错
echo '{"name":"bob"}' | python -m json.tool
{
    "name": "bob"
}
```

#### -B  在导入模块时不生成.pyc文件

```python
# pyc_test.py
def add(x:int, y:int) -> int:
    return x + y

# test.py
import pyc_test

# 测试
python    test.py	# 默认会生成__pycache__/pyc_test.cpython-39.pyc文件
python -B test.py	# 不会生成pyc_test.pyc文件

# 环境变量参考
PYTHONDONTWRITEBYTECODE
此变量如果被设为一个非空字符串，Python 将不会尝试在导入源模块时写入 .pyc 文件。 这相当于指定 -B 选项。
```

#### -u 禁用缓冲区

```python
# test.py
import time

for i in range(10):
    time.sleep(1)
    print(i, end="")

# 测试-1
python    test.py	# 这将一次性输出内容:0123456789
python -u test.py	# 这将实时输出0123456789

# 环境变量参考
PYTHONUNBUFFERED
此变量如果被设为一个非空字符串，它就相当于指定 -u 选项。

# 总结
命令行中一般为行缓冲区，Jenkins中经过测试为全缓冲区，要达到实时输出，都可以使用python -u参数来达到效果
```



#### -w args 警告控制

```bash
# warn_test.py
import warnings
warnings.warn("this is warn message")

# 测试
python warn_test.py				# 这会输出警告信息
python -Wignore warn_test.py	# 不输出warn信息

# 环境变量参考 
PYTHONWARNINGS
此变量等价于 -W 选项。 如果被设为一个以逗号分隔的字符串，它就相当于多次指定 -W，列表中后出现的过滤器优先级会高于列表中先出现的。

更细致的控制请参考官方文档
```

#### -x 跳过第一行内容

```python
# test.py
fdafdref3fdfdfdafd
print("hello world!")

# 测试
python    test.py	# 这会报错
python -x test.py	# 因为跳过第一行了，不会报错
```

#### -E 忽略所有 `PYTHON*` 环境变量

#### -q 在交互模式下也不显示版权和版本信息

```bash
C:\Users\VVFock3r>python -q
>>> exit()
```

## 



## 二、函数

### 函数说明

使用`def`定义函数，`return`指定返回值，若没有指定返回值，会隐式返回`return None`，举例说明

```python
#!/usr/bin/env python
# --*-- coding:utf-8 --*--

def add(x, y):
    return x + y

print(add(1, 2))  # 3
```

### 函数参数

#### 常见形式和坑

```python
#!/usr/bin/env python
# --*-- coding:utf-8 --*--

# 定义一个无参函数
def show():
    return "hello world!"
# ----------------------------------------------
# 按位置传参和按关键字传参

# 定义一个普通函数
def add(x, y):
    return x + y

# 按位置传参,1对应形参x，2对应形参y；位置必须一一对应
print(add(1, 2))

# 按关键字传参,形参传递位置可以任意调换
print(add(y=3, x=4))

# ----------------------------------------------
# 默认参数，调用时如果该参数没有传则使用默认值,有默认值得参数一定是放到参数最后面的，否则会报错
def add(x, y=2):
    return x + y

# 注意：注意默认参数值不要用 引用类型，比如下面这种可能与你的预期并不一致:
def add(x=[]):
	x.append(100)
	return x
        
print(add())    # [100]
print(add())    # [100, 100]

# 这里涉及到两个知识点
# (1) 函数的默认参数存储在 .__defaults__属性中，它是一个元祖
#	  为什么是元祖呢？因为他相对列表和字典会更节省内存。
# 	  为什么会更节省内存呢？
#     因为元祖是不可变对象，列表和字典是可变对象，Python创建列表的时候会多分配一些内存，用于以后快速扩充，而元祖在定义时就确定内存大小了
#
# (2) 可变对象和不可变对象的区别
#	  对一个不可变对象变量有修改操作时，会重新开辟内存空间，复制变量值然后再操作
#	  对一个可变对象变量有修改操作时，直接在对象所在内存操作
#
# 所以说，函数默认参数为不可变对象时，函数内部对默认参数操作不会影响到.__defaults__中的值，但是如果是可变对象恰恰相反，
# 所以就有上面的结果了
#
# 常规的解决办法：
def add1(x=None):
    if x is None:
        x = [100]
    return x
print(add1()) # [100]
print(add1()) # [100]

# 另一种思路解决办法(这种方式有bug，杜绝使用，仅学习测试)
def add2(x=[]):
    # 重新拷贝一份，不然会导致外边的变量发生变化
    # 因为传递的是可变对象，修改的是同一份内存
    x = x.copy()
    x.append(100)
    add2.__defaults__ = ([],)  # 重新初始化默认参数
    return x
print(add2()) # [100]
print(add2()) # [100]

# 当然了，也不一定非要去解决，这种形式会让函数变得有状态，必要的时候也可以利用一下，
# 但是能不用尽量不用这种形式，很容易出错
# 让函数变得有状态也不是只有这一种形式，还可以利用闭包，后面会讲到
```

#### 可变参数和不可变参数

`*args`和`**kwargs`表示可变参数，在函数内部args是一个元祖，kwargs是一个字典

这两个参数不传递的话就使用默认值，即空元祖和空字典

```python
#!/usr/bin/env python
# --*-- coding:utf-8 --*--

def add(*args, **kwargs):
    print(args)
    print(kwargs)

add(1, 2, 3, 4)  # args = (1,2,3,4)
add(*(1, 2, 3, 4))  # 如果是直接传递一个元祖/列表等，需要使用*解构，就等同于上面传递的形式

add(name="VVFock3r", language="Python")  # {'name': 'VVFock3r', 'language': 'Python'}
add(**{"name": "VVFock3r", "language": "Python"})  # 同理，如果直接传递一个字段，使用**解构
```

#### 仅限位置形参(positional-only)和仅限关键字形参(keyword-only)

仅限位置形参就是说只能使用`add(1,2)`这种形式来传递参数，

仅限关键字形参就是只能使用`add(x=1, y=2)`来调用参数（顺序可任意调整）

```python
#!/usr/bin/env python
# --*-- coding:utf-8 --*--

# 在/前面的都是仅限位置形参，positional-only
def add1(x, y, /):
    return x + y

print(add1(1, 2))  # 符合语法要求，输出3
# print(add1(x=1, 2))  # 不符合语法要求，报错 SyntaxError: positional argument follows keyword argument


# 在*后面的都是仅限关键字形参，keyword-only
def add2(*, x, y):
    return x + y

print(add2(x=1, y=2))  # 符合语法要求，输出3
# print(add2(1, 2))  # 不符合语法要求，报错TypeError: add2() takes 0 positional arguments but 2 were given
```

#### 看一个比较复杂的函数定义

```python
#!/usr/bin/env python
# --*-- coding:utf-8 --*--

# 你能一眼看明白如何调用吗？
def login(host, user, password, /, *, ssl=False, **kwargs):
    print("host=", host)
    print("user=", user)
    print("password=", password)
    print("ssl=", ssl)
    print("kwargs=", kwargs)
  

login("127.0.0.1", "root", "123456", ssl=True, port=12345)
```

### 函数作用域和`LEGB`

#### 作用域

- 函数内部定义的变量为 局部变量，在函数外部不能直接使用

- 函数内部可以使用 全局变量，但是具有只读属性，如果需要修改 需要先使用`global 变量名`，否则会报错

  `UnboundLocalError: local variable 'x' referenced before assignment`

- 如果函数`fn1`内定义一个函数`fn2`，那么

  - `fn2`对全局变量和`fn1`中的变量具有只读属性
  - `f2`要修改全局变量使用`global 变量名`
  - `f2`要修改`f1`变量要使用`nonlocal 变量名`
  - 如果`f2`中继续嵌套函数，那么规则与上述类似

```python
#!/usr/bin/env python
# --*-- coding:utf-8 --*--

# 定义全局变量
x = 100


# 定义外层函数
def outer():
    # 直接定义的话没问题，这和全局变量x没关系
    # x = 1

    # 如果上面代码注释，函数内部没有定义x，直接修改全局变量x会报错，需要先global x
    # global x
    # x = x + 100
    print("outer: x=", x)

    a = 1

    # 定义内层函数
    def inner():
        # 修改全局变量
        # global x
        # x = x + 200

        # 读取全局变量
        print("inner: x=", x)

        # --------------------

        # 修改上层函数的变量
        # nonlocal a
        # a = a + 1

        # 读取上层函数的变量
        print("inner: a=", a)

    inner()


outer()
```

如果上面函数都看懂了的话，还有一个问题需要特别注意，为了方便起见写了一个最简单的形式，请看如下代码

```python
#!/usr/bin/env python
# --*-- coding:utf-8 --*--

# 定义全局变量
x = 100

def test():
    print(x)
    x = 100

test()
```

上面代码会报错`UnboundLocalError: local variable 'x' referenced before assignment`，这是什么鬼呢？

因为函数在定义之后，未调用之前，Python解释器就知道了`print(x)`中x用的是函数内部的x，因为第二行定义了`x=100`，

但是由于是先使用后定义，那就肯定会报错了，所以我们需要注意，如果函数内部要定义变量的话，一定要先定义再使用，当然了，函数外部也是先定义再使用

#### 思考题-加深理解

请思考这个是为什么？，如果不明白可以随时联系我

```python
#!/usr/bin/env python
# --*-- coding:utf-8 --*--

def outer():
    c = [100]

    def inner():
        c[0] += 100  # 可以
        #c.extend([1,2,3])  # 可以
        # c = c + [1,2,3]    # 不可以
        print(c)

    inner()

outer()
```

使用嵌套函数同样可以保存函数的状态，至此已经有两种方式可以保存函数状态，请看如下代码

```python
#!/usr/bin/env python
# --*-- coding:utf-8 --*--

# 方式一
def fn(x=[]):
    x.append(None)
    if len(x) >= 2:
        print('函数已经调用过了')
    else:
        print('函数第一次调用')

fn()  # 函数第一次调用
fn()  # 函数已经调用过了
fn()  # 函数已经调用过了

# 方式二(推荐)
def fn1():
    lock = False

    def fn2():
        nonlocal lock
        if lock is True:
            print('函数已经调用过了')
        else:
            lock = True
            print('函数第一次调用')

    return fn2


fn2 = fn1()
fn2() # 函数第一次调用
fn2() # 函数已经调用过了
fn2() # 函数已经调用过了
fn2() # 函数已经调用过了
```

#### 变量搜索顺序`LEGB`

- `Local` 本地作用域
- `Enclosing` 嵌套函数的外部函数的命名空间
- `Global` 全局作用域
- `Build-in` 内置模块命名空间

```python
#!/usr/bin/env python
# --*-- coding:utf-8 --*--
import builtins

c = 3

def fn1():
    b = 2
    def fn2():
        a = 1
        print("本地作用域    a=", a)
        print("上层函数作用域 b=", b)
        print("全局作用域    c=", c)
        print("内置模块命名空间 builtins.dir == dir --> ", builtins.dir == dir)
    fn2()

fn1()

'''
输出结果

本地作用域    a= 1
上层函数作用域 b= 2
全局作用域    c= 3
内置模块命名空间 builtins.dir == dir -->  True
'''
```

### 类型注解

类型注解，用来说明参数是何种类型的对象，这只是说明，目的是方便开发人员，并不是强制一定要传入指定类型的对象

函数注解信息保存在`__annotations__`字典中

```python
def add(x:int, y:int) -> int:
    return x + y

print(add.__annotations__)  #{'x': <class 'int'>, 'y': <class 'int'>, 'return': <class 'int'>}
print(add(1,2))     # 根据注解传入对应类型的参数，3
print(add('1','2')) # 传入不同类型参数也是可以的，非强制，12
```

### 函数签名

函数签名，说白了就是描述函数参数的东西，除了写框架、调试器等，基本上我们也用不到

```python
#!/usr/bin/env python
# --*-- coding:utf-8 --*--

from inspect import signature


def login(host: str, user: str, pwd: str, *, port=3306) -> str:
    """测试函数"""
    return "ok"


sig = signature(login)

for index, item in enumerate(sig.parameters.items()):
    name, param = item
    print("参数名称: {}".format(param.name))
    print("默认参数: {}".format(None if param.default is param.empty else str(param.default)))
    print("参数类型: {}".format(str(param.kind)))
    print("参数注解: {}".format(None if param.annotation is param.empty else str(param.annotation)))
    print()
    
'''
参数名称: host
默认参数: None
参数类型: POSITIONAL_OR_KEYWORD
参数注解: <class 'str'>

参数名称: user
默认参数: None
参数类型: POSITIONAL_OR_KEYWORD
参数注解: <class 'str'>

参数名称: pwd
默认参数: None
参数类型: POSITIONAL_OR_KEYWORD
参数注解: <class 'str'>

参数名称: port
默认参数: 3306
参数类型: KEYWORD_ONLY
参数注解: None
'''    
```

### 匿名函数

匿名函数，顾名思义，就是没有名字的函数，使用`lambda`定义

匿名函数通常和`filter`、`map`、`sorted`等高阶函数配合使用

匿名函数举例

```python
#!/usr/bin/env python
# --*-- coding:utf-8 --*--

x = lambda x: x * 2

print(x(10)) # 20
```

匿名函数注意事项

```python
#!/usr/bin/env python
# --*-- coding:utf-8 --*--

# 注意可能会遇到的问题
x = 10
a = lambda y: x + y
x = 20
print(a(0))  # 20，因为lambda中的x为自有变量，在运行时才会进行绑定

# 如果希望在定义的时候绑定，那么可以这样做
z = 10
b = lambda y, z=z: z + y
z = 20
print(b(0))  # 10
```

### 内置函数

参考 [https:`//docs`.python.org`/zh-cn/3/library/functions`.html](https://docs.python.org/zh-cn/3/library/functions.html)

### 内置函数库 `functools`

#### reduce

用传给 reduce 中的函数 function（有两个参数）先对集合中的第 1、2 个元素进行操作，

得到的结果再与第三个数据用 function 函数运算，最后得到一个结果

```python
#!/usr/bin/env python
# --*-- coding:utf-8 --*--

from functools import reduce

def add(x, y):
    return x + y

print(reduce(add, [x for x in range(101)])) # 5050
```

#### partial

```python
#!/usr/bin/env python
# --*-- coding:utf-8 --*--

from functools import partial


# @functools.wraps()              # 参考装饰器部分
# functools.update_wrapper()      # 参考装饰器部分

# partial 偏函数，输入一个函数和该函数的参数，并固定下来返回一个新函数; 和柯里化很相似，是不是

def add(x, y):
    return x + y


new1 = partial(add, y=1)  # 返回一个新函数
new2 = partial(add, x=1)  # 返回一个新函数

print(new1(2))  # 3
print(new2(y=2))  # 3
```

#### partialmethod

和partial类似，partial用于普通函数，`partialmethod`用于类方法

#### cached_property

计算过后便被缓存

```python
#!/usr/bin/env python
# --*-- coding:utf-8 --*--

from functools import cached_property
import random


class Test:

    @cached_property
    # @property
    def test(self):
        return random.random()


t = Test()
print(t.test)  # 0.0832563719467786
print(t.test)  # 0.0832563719467786
print(t.test == t.test)  # True
```

#### lru_cache

- lru是什么？LRU是Least Recently Used的缩写，即最近最少使用，是一种常用的页面置换算法
- 函数签名：lru_cache(maxsize=128, typed=False)
- maxsize代表最大可以缓存128个，如果设置为None代表禁用LRU功能，并且缓存可以无限增长，设置为2的幂时性能最好
- typed 如果设置为True，则不同类型的函数参数将单独缓存，比如f(3)和f(3.0)将被分别缓存

```python
#!/usr/bin/env python
# --*-- coding:utf-8 --*--

from functools import lru_cache

@lru_cache()
def fib(n):
    return 1 if n < 2 else fib(n - 1) + fib(n - 2)

print(fib(100))
```

#### cmp_to_key

比较函数，需传入两个值x，y，当x > y时返回1，等于时返回0，否则返回-1

```python
#!/usr/bin/env python
# --*-- coding:utf-8 --*--

from functools import cmp_to_key

nums = [3, 30, 34, 5, 9]
new_nums = sorted(nums, key=cmp_to_key(lambda x, y: y - x))
new_nums2 = sorted(nums, key=cmp_to_key(lambda x, y: x - y))
print(new_nums)
print(new_nums2)
# 结果:
# [34, 30, 9, 5, 3]
# [3, 5, 9, 30, 34]
```

#### total_ordering

类装饰器，实现其中一个： `__lt__()`, `__le__()`, `__gt__()`, `__ge__()`，自动实现剩余方法

要求此类需要实现`__eq__`

```python
#!/usr/bin/env python
# --*-- coding:utf-8 --*--

from functools import total_ordering


@total_ordering
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __eq__(self, other):
        return self.x == other.x and self.y == other.y

    def __lt__(self, other):
        return (self.x, self.y) < (other.x, other.y)

a = Point(0, 0)
b = Point(0, 1)
c = Point(0, 0)

print(a < b)  # True
print(b > c)  # True
print(c == a)  # True
```

### 递归函数

- Python对递归深度做了限制，以保护解释器，超过限制抛出`RecursionError:maxinum recursion depth exceeded`

- 使用`sys.getrecursionlimit()`获取递归深度，默认为`1000`；

- `使用sys.setrecursionlimit(n)设置递归深度`，注意不要设置的太大，否则会导致栈溢出，

  报错`OverflowError: signed integer ``is` `greater than maximum`

一个递归+缓存版的费布那切数列

```python
#!/usr/bin/env python
# --*-- coding:utf-8 --*--

def fib(n, cache=None):
    if cache is None:
        cache = {}
    if n in cache:
        return cache[n]

    if n < 2:
        return 1
    cache[n] = fib(n - 1, cache) + fib(n - 2, cache)
    return cache[n]

print(fib(998))
```

### 高阶函数

高阶函数指的是可以将一个函数作为一个形参传递给一个函数 或 返回值是一个函数，这个函数就称为高阶函数

#### sorted

sorted 排序函数，key指定自定义排序规则，reverse可以反转结果，返回列表

函数签名

```python
sorted(iterable, /, *, key=None, reverse=False)
```

示例

```python
#!/usr/bin/env python
# --*-- coding:utf-8 --*--

L = [('b', 2), ('a', 3), ('c', 3), ('d', 4)]

# 排序，默认情况下按照ASCII排序
print(sorted(L))  # [('a', 3), ('b', 2), ('c', 3), ('d', 4)]

# 自定义排序规则，根据元祖索引为1的排序，或者说根据字典(元祖转为字典)的value排序
print(sorted(L, key=lambda x: x[1]))  # [('b', 2), ('a', 3), ('c', 3), ('d', 4)]

# 如果第一次排序有相同的，即x[1]相同，那么按照x[0]排序
print(sorted(L, key=lambda x: (x[1], x[0])))  # [('b', 2), ('a', 3), ('c', 3), ('d', 4)]

# 如果x[0]我想按倒序排序，那么可以这样做
print(sorted(L, key=lambda x: (x[1], -ord(x[0]))))  # [('b', 2), ('c', 3), ('a', 3), ('d', 4)]
```

仿写sorted函数

```python
#!/usr/bin/env python
# --*-- coding:utf-8 --*--

def sorted(iterable, *, key=None, reverse=False):
    if key is None:
        key = lambda x: x

    # 保存排序好的数据
    ret = []

    # 迭代对象
    for z in iterable:

        # 迭代已排好序的数据
        for x, y in enumerate(ret):

            # 结果反转部分
            flag = key(z) > key(y) if reverse else key(z) < key(y)
            if flag:
                ret.insert(x, z)
                break
        else:
            ret.append(z)
    return ret
```

#### filter

filter 筛选指定元素，函数可以为None时代表从序列中筛选出为真的元素，返回一个filter对象

使用filter过滤后，返回新的元素个数可能会减少

函数签名

```python
filter(function or None, iterable) --> filter object
```

示例

```python
#!/usr/bin/env python
# --*-- coding:utf-8 --*--

print(list(filter(None, [0, 1, 2, 3, 4, 5, False, 6, 7, 8, None, 9, '', (), []])))
# [1, 2, 3, 4, 5, 6, 7, 8, 9]

print(list(filter(lambda x: x % 3 == 0, range(20))))
# [0, 3, 6, 9, 12, 15, 18]
```

仿写filter

```python
#!/usr/bin/env python
# --*-- coding:utf-8 --*--

def filter(fn, iterable):
    if fn is None:
        fn = bool
    for i in iterable:
        if fn(i):
            yield i
```

#### map

将序列的每个元素都作用在函数上，返回一个map object

使用map后，新对象的元素个数不会变，值一般都会变

函数签名

```python
map(func, *iterables) --> map object
```

举例

```python
#!/usr/bin/env python
# --*-- coding:utf-8 --*--

# 将列表中的数字都转为字符串
print(list(map(str, [1, 2, 3, 4, 5])))
# ['1', '2', '3', '4', '5']


# 小练习，使用map来求1-20之间的偶数？

# (1)正常来说，肯定是先想到使用filter，先写一下
print(list(filter(lambda x: x % 2 == 0, range(1, 21))))
# [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]

# (2) 使用map来写，总感觉哪里不对，元素个数多了~
print(list(map(lambda x: x if x % 2 == 1 else None, range(1, 21))))
# [1, None, 3, None, 5, None, 7, None, 9, None, 11, None, 13, None, 15, None, 17, None, 19, None]

# (3) 修改一下
print(list(map(lambda x: x * 2, range(1, 11))))

# ----------------------------------------------------------------------------------------------------

# map 可同时接收多个可迭代对象，有几个可迭代对象，那么函数的就该有几个参数
print(list(map(lambda x, y: {x: y}, range(1, 11), range(10, 15))))
# [{1: 10}, {2: 11}, {3: 12}, {4: 13}, {5: 14}]

# 如果两个序列的元素个数不一致，以最短序列为标准（2.x中会以最长序列为标准）
print(list(map(lambda x, y: {x: y}, range(1, 6), range(10, 21))))
# [{1: 10}, {2: 11}, {3: 12}, {4: 13}, {5: 14}]

# 如果要以最长序列为标准的话，自己实现了一个函数
from itertools import zip_longest


def map_longest(func, *iterables):
    ret = []
    iter_list = list(zip_longest(*iterables))

    # 获取可迭代对象的个数
    iter_number = max(list(map(len, iter_list)))

    # 遍历每个可迭代对象
    for i in range(iter_number):
        ret.append([x[i] for x in iter_list])
    return map(func, *ret)


print(list(map_longest(lambda x, y: {x: y}, range(1, 6), range(10, 21))))
# [{1: 10}, {2: 11}, {3: 12}, {4: 13}, {5: 14}, {None: 15}, {None: 16}, {None: 17}, {None: 18}, {None: 19}, {None: 20}]
```

仿写map

```python
#!/usr/bin/env python
# --*-- coding:utf-8 --*--

def map(fn, *iterable):
    for i in zip(*iterable):
        yield fn(*i)
starmap
```

`starmap`与map类似，不同的是对于多个可迭代对象的处理方式

```python
#!/usr/bin/env python
# --*-- coding:utf-8 --*--
from itertools import starmap

data = [(1, 2), (3, 4)]
print(list(map(lambda x, y: {x: y}, *data)))
# [{1: 3}, {2: 4}]   map将1,3和24分别传进去

print(list(starmap(lambda x, y: {x: y}, data)))
# [{1: 2}, {3: 4}]   start_map 将1,2和3,4分别传进去,start_map 只需要传递一个可迭代对象即可
```

### 装饰器

#### 柯里化(Currying)

将原来接受2个参数的函数变成新的接受一个参数的函数的过程。新的函数是接受原有函数第二个参数的函数，比如：

原函数为: `add(1, 2)`

柯里化后: `add(1)(2)`

柯里化简单举例

```python
#!/usr/bin/env python
# --*-- coding:utf-8 --*--

# 原函数
def add(x, y):
    return x + y

# 柯里化后
def add(x):
    def fn(y):
        return x + y
    
    return fn

print(add(1)(2)) # 3
```

#### 闭包(Closure)

闭包就是函数中再嵌套一个函数，内层函数中使用了外层函数的自有变量，就产生了闭包

外层函数`__closure__`属性是一个cell对象的元祖，每个cell对象的cell_contents属性对应产生闭包的自有变量的值

```python
#!/usr/bin/env python
# --*-- coding:utf-8 --*--

def add(x, y):
    count = 0

    def wrapper():
        return x, y

    return wrapper


for i in add(1, 2).__closure__:
    print(i.cell_contents)
    # 1
    # 2
```

#### 装饰器

无参装饰器

```python
#!/usr/bin/env python
# --*-- coding:utf-8 --*--

import time


# 无参装饰器
def timer(func):
    def wrapper(*args, **kwargs):
        start = time.time()
        f = func(*args, **kwargs)
        end = time.time()
        print('Runnint time: {time} seconds.'.format(time=(end - start)))
        return f

    return wrapper


@timer  # 等同于 timer(add)(a, b)
def add(a, b):
    time.sleep(1)
    return a + b


print(add(1, 2))
```

带参装饰器，需要再饰器函数的第一层再嵌套一个函数

```python
import time
 
def timer(start_time=3):
    def _timer(func):
        def wrapper(*args, **kwargs):
            start = time.time()
            f = func(*args, **kwargs)
            delta = time.time() - start
            if delta >= start_time:
                print('Runnint time: {time} seconds.'.format(time=delta))
            return f
        return wrapper
    return _timer
 
@timer(start_time=3)        # 等同于timer(start_time=3)(add)(a, b)
def add(a ,b):
    time.sleep(4)
    return a + b
 
print(add(1 ,2))
```

装饰器的副作用：部分属性会被覆盖,比如 `__name__`, `__doc__`

使用装饰器`functools.wraps(func)` 或 函数`functools.update_wrapper(wrapper, func)` 可以消除这种影响

```python
def timer(start_time=3):
    def _timer(func):
        # 方法1-推荐
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            start = time.time()
            f = func(*args, **kwargs)
            delta = time.time() - start
            if delta >= start_time:
                print('Runnint time: {time} seconds.'.format(time=delta))
            return f
        # 方法2
        # functools.update_wrapper(wrapper, func)
        return wrapper
    return _timer
```

## 

## 协程(补充中)

